import { reactive } from "vue";
import { todoistErrorText } from "./api-error";
import { todoistModuleState, withTodoistWrite } from "./module-state";
import { todoistService, isTodoistTaskCompleted } from "../services/todoist.service";
import { todoistTaskListState, todoistTaskListController } from "./task-list-store";
import { createTaskStartDateReader, parseDateAndTime } from "./task-date-helper";

export interface CalendarCellItem {
  date: string; dayNumber: number; isOutside: boolean; isToday: boolean;
  isSelected: boolean; itemCount: number; title: string; hasDot: boolean;
}
export interface CalendarTodoItem {
  id: string; content: string; completed: boolean; priority: number;
  completedAt?: string; dueText?: string; labels?: string[]; thumbUrl?: string;
  scheduledDate?: string; time?: string; raw?: any;
}
export interface TodoistCalendarSidebarState {
  collapsed: boolean; selectedDate: string; badgeText: string;
  monthLabel: string; yearLabel: string; cells: CalendarCellItem[];
  agendaTitle: string; todoItems: CalendarTodoItem[]; todoLoading: boolean; emptyText: string; writeError: string;
}
export function getLocalTodayDateStr(date = new Date()): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}
const LOCAL_COMPLETED_KEY = "todoist_local_completed_tasks_v1";
function getLocalCompletedMap(): Record<string, CalendarTodoItem> {
  try {
    const parsed = JSON.parse(localStorage.getItem(LOCAL_COMPLETED_KEY) || "{}");
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return {};
    return Object.fromEntries(Object.entries(parsed).filter(([, value]: [string, any]) =>
      value && typeof value === "object" && typeof value.id === "string" && typeof value.content === "string")) as Record<string, CalendarTodoItem>;
  } catch { return {}; }
}
function saveLocalCompletedMap(map: Record<string, CalendarTodoItem>) {
  localStorage.setItem(LOCAL_COMPLETED_KEY, JSON.stringify(map));
}
function completedDay(item: any): string {
  const raw = item.completedAt || item.completed_at || item.completed_date;
  const date = new Date(raw || "");
  return Number.isFinite(date.getTime()) ? getLocalTodayDateStr(date) : "";
}
function mapTask(task: any, readStart = createTaskStartDateReader()): CalendarTodoItem {
  const raw = task._taskRaw || task.raw || task;
  const id = String(task.task_id || task.id);
  const description = task.description || raw.description || "";
  const start = task.startDate || readStart(id, description);
  const due = raw.due?.datetime || raw.due?.date || task.dueDate || "";
  let scheduled = parseDateAndTime(start || due);
  if (!start && /T.*(?:Z|[+-]\d{2}:?\d{2})$/i.test(due)) {
    const local = new Date(due);
    if (Number.isFinite(local.getTime())) scheduled = {
      date: getLocalTodayDateStr(local),
      time: `${String(local.getHours()).padStart(2, "0")}:${String(local.getMinutes()).padStart(2, "0")}`
    };
  }
  return {
    id, content: task.content || "未命名任务", completed: typeof task.completed === "boolean" ? task.completed : isTodoistTaskCompleted(task),
    priority: task.priority || 1, labels: task.labels || [], raw,
    scheduledDate: scheduled.date, time: scheduled.time,
    dueText: raw.due?.string || raw.due?.date || "",
    thumbUrl: description.match(/!\[.*?\]\(((?:https?:\/\/|data:image\/)[^\s\)]+)\)/)?.[1]
  };
}
let activeTasks: any[] = [];
let savedAt = 0;
const history = new Map<string, { items: CalendarTodoItem[]; savedAt: number }>();
const reopenedIds = new Set<string>();
export const todoistCalendarSidebarState = reactive<TodoistCalendarSidebarState>({
  collapsed: false, selectedDate: getLocalTodayDateStr(), badgeText: "Todoist",
  monthLabel: "", yearLabel: "", cells: [], agendaTitle: "今日任务",
  todoItems: [], todoLoading: false, emptyText: "", writeError: ""
});
export type CalendarSidebarAction = "init" | "toggle-collapsed" | "today" | "prev-month" | "next-month" |
  "prev-year" | "next-year" | "select-date" | "context-date" | "drop-task" | "open-inspector";
export type CalendarSidebarActionHandler = (action: CalendarSidebarAction, payload?: any) => void;
const actionHandlers = new Set<CalendarSidebarActionHandler>();
let dateVersion = 0;
let dateAbort: AbortController | undefined;
export function cancelTodoistDateReads() {
  dateVersion++; dateAbort?.abort(); dateAbort = undefined;
  todoistCalendarSidebarState.todoLoading = false;
}
function projectTasks() {
  const state = todoistCalendarSidebarState;
  const readStart = createTaskStartDateReader();
  const active = activeTasks.filter(t => !isTodoistTaskCompleted(t)).map(t => mapTask(t, readStart));
  const selected = state.selectedDate;
  const local = Object.values(getLocalCompletedMap()).filter(item => !reopenedIds.has(item.id));
  const merged = new Map<string, CalendarTodoItem>();
  for (const item of [...(history.get(selected)?.items || []), ...local]) {
    if (!reopenedIds.has(item.id) && (item.scheduledDate || completedDay(item)) === selected) merged.set(item.id, item);
  }
  for (const item of active) if (item.scheduledDate === selected) merged.set(item.id, item);
  state.todoItems = [...merged.values()].sort((a, b) => Number(a.completed) - Number(b.completed) || (a.time || "").localeCompare(b.time || ""));
  state.agendaTitle = selected === getLocalTodayDateStr() ? "今日任务" : `${selected.slice(5).replace("-", "月")}日任务`;
  const counts = new Map<string, Set<string>>();
  for (const item of [...Array.from(history.values()).flatMap(entry => entry.items), ...local, ...active]) {
    const date = item.scheduledDate || completedDay(item);
    if (!date) continue;
    if (!counts.has(date)) counts.set(date, new Set());
    counts.get(date)!.add(item.id);
  }
  for (const cell of state.cells) {
    cell.itemCount = counts.get(cell.date)?.size || 0;
    cell.hasDot = cell.itemCount > 0;
    cell.title = `${cell.date}${cell.itemCount ? ` · ${cell.itemCount} 个任务` : ""}`;
  }
}
export const todoistCalendarSidebarController = {
  state: todoistCalendarSidebarState,
  cancelReads: cancelTodoistDateReads,
  invalidateReads() { cancelTodoistDateReads(); savedAt = 0; history.clear(); reopenedIds.clear(); },
  setCollapsed(collapsed: boolean) { todoistCalendarSidebarState.collapsed = collapsed; },
  toggleCollapsed() {
    this.setCollapsed(!todoistCalendarSidebarState.collapsed);
    this.dispatch("toggle-collapsed", todoistCalendarSidebarState.collapsed);
  },
  recordTaskCompletion(task: any, completed: boolean) {
    cancelTodoistDateReads(); savedAt = 0;
    const id = String(task.task_id || task.id);
    const map = getLocalCompletedMap();
    if (completed) {
      reopenedIds.delete(id);
      const item = mapTask(task);
      map[id] = { ...item, scheduledDate: task.scheduledDate || item.scheduledDate, completed: true, completedAt: new Date().toISOString() };
      activeTasks = activeTasks.filter(t => String(t.id) !== id);
    } else {
      reopenedIds.add(id); delete map[id];
      if (!activeTasks.some(t => String(t.id) === id)) activeTasks.push({ ...(task.raw || task._taskRaw || task), id, checked: false, is_completed: false, completed: false });
    }
    try { saveLocalCompletedMap(map); } catch { todoistCalendarSidebarState.writeError = "完成状态的本机记录未保存，请核对。"; }
    history.clear(); projectTasks();
  },
  async loadTodosForDate(dateStr: string, force = false) {
    if (!todoistModuleState.active || todoistModuleState.pendingWrites) return;
    cancelTodoistDateReads();
    const request = new AbortController(); dateAbort = request;
    const version = dateVersion, session = todoistModuleState.session;
    dateStr ||= getLocalTodayDateStr();
    const current = () => !request.signal.aborted && version === dateVersion && session === todoistModuleState.session &&
      todoistModuleState.active && todoistCalendarSidebarState.selectedDate === dateStr && !todoistModuleState.pendingWrites;
    todoistCalendarSidebarState.selectedDate = dateStr;
    todoistCalendarSidebarState.emptyText = "";
    projectTasks();
    todoistCalendarSidebarState.todoLoading = true;
    try {
      if (force || !savedAt || Date.now() - savedAt > 30000) {
        const tasks = await todoistService.listCalendarTasks(request.signal);
        if (!current()) return;
        activeTasks = tasks; savedAt = Date.now(); projectTasks();
      }
      const cached = history.get(dateStr);
      if (force || !cached || Date.now() - cached.savedAt > 30000) {
        const nextDay = new Date(`${dateStr}T00:00:00`); nextDay.setDate(nextDay.getDate() + 1);
        try {
          const response = await todoistService.getCompletedTasks({ since: new Date(`${dateStr}T00:00:00`).toISOString(), until: nextDay.toISOString(), limit: 200 }, request.signal);
          if (!current()) return;
          const items = response.items.filter(t => completedDay(t) === dateStr).map(t => ({
            ...mapTask(t), completed: true, completedAt: t.completed_at
          }));
          history.set(dateStr, { items, savedAt: Date.now() });
          if (history.size > 42) history.delete(history.keys().next().value!);
        } catch (error) {
          if (current()) {
            todoistCalendarSidebarState.emptyText = "完成历史：" + todoistErrorText(error) + " 现有任务保留。";
          }
        }
      }
      if (current()) projectTasks();
    } catch (error) {
      if (current()) todoistCalendarSidebarState.emptyText = todoistErrorText(error) + " 当前日期的已有数据保留。";
    } finally {
      if (current()) todoistCalendarSidebarState.todoLoading = false;
      if (dateAbort === request) dateAbort = undefined;
    }
  },
  async toggleTodoItem(item: CalendarTodoItem) {
    if (todoistModuleState.pendingWrites) return;
    const next = !item.completed;
    todoistCalendarSidebarState.writeError = "";
    await withTodoistWrite(async () => {
      cancelTodoistDateReads();
      try {
        await todoistService.toggleTaskCompletion(item.id, next);
        this.recordTaskCompletion(item, next);
        todoistService.invalidateWorkspaceSnapshots();
        if (next) {
          for (const col of todoistTaskListState.columns) col.tasks = col.tasks.filter(t => String(t.id) !== item.id);
        } else if (todoistModuleState.active) await todoistTaskListController.loadWorkspace(undefined, undefined, true);
      } catch {
        todoistCalendarSidebarState.writeError = "完成状态保存未确认，请刷新核对；未自动重试。";
      }
    });
  },
  updateTaskTitle(taskId: string, title: string) {
    const task = activeTasks.find(t => String(t.id) === String(taskId));
    if (task) task.content = title;
    const item = todoistCalendarSidebarState.todoItems.find(t => t.id === String(taskId));
    if (item) item.content = title;
  },
  updateState(partial: Partial<TodoistCalendarSidebarState>) {
    const oldDate = todoistCalendarSidebarState.selectedDate;
    Object.assign(todoistCalendarSidebarState, partial);
    projectTasks();
    if (partial.selectedDate && partial.selectedDate !== oldDate) void this.loadTodosForDate(partial.selectedDate);
  },
  onAction(handler: CalendarSidebarActionHandler): () => void {
    actionHandlers.add(handler); return () => { actionHandlers.delete(handler); };
  },
  dispatch(action: CalendarSidebarAction, payload?: any) {
    for (const handler of actionHandlers) {
      try { handler(action, payload); } catch { todoistCalendarSidebarState.emptyText = "日历操作未完成，请重新打开。"; }
    }
  }
};
