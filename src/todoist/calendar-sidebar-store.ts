import { reactive } from "vue";
import { todoistModuleState } from "./module-state";
import { todoistService } from "../services/todoist.service";
import { todoistTaskListState, todoistTaskListController } from "./task-list-store";

export interface CalendarCellItem {
  date: string;
  dayNumber: number;
  isOutside: boolean;
  isToday: boolean;
  isSelected: boolean;
  itemCount: number;
  title: string;
  hasDot: boolean;
}

export interface CalendarAgendaItem {
  id: string;
  time: string;
  summary: string;
  subtitle: string;
  htmlLink?: string;
  color?: string;
  raw?: any;
}

export type CalendarTabMode = "agenda" | "todo";

export interface CalendarTodoItem {
  id: string;
  content: string;
  completed: boolean;
  priority: number;
  completedAt?: string;
  dueText?: string;
  labels?: string[];
  thumbUrl?: string;
  raw?: any;
}

export interface TodoistCalendarSidebarState {
  collapsed: boolean;
  tabMode: CalendarTabMode;
  selectedDate: string;
  badgeText: string;
  monthLabel: string;
  yearLabel: string;
  cells: CalendarCellItem[];
  agendaTitle: string;
  agendaCount: string;
  agendaItems: CalendarAgendaItem[];
  todoItems: CalendarTodoItem[];
  todoLoading: boolean;
  emptyText: string;
}

export function getLocalTodayDateStr(): string {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

const LOCAL_COMPLETED_KEY = "todoist_local_completed_tasks_v1";

function getLocalCompletedMap(): Record<string, CalendarTodoItem> {
  try {
    const raw = localStorage.getItem(LOCAL_COMPLETED_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveLocalCompletedMap(map: Record<string, CalendarTodoItem>) {
  try {
    localStorage.setItem(LOCAL_COMPLETED_KEY, JSON.stringify(map));
  } catch {}
}

function extractThumbUrl(desc?: string): string | undefined {
  if (!desc) return undefined;
  const match = desc.match(/!\[.*?\]\(((?:https?:\/\/|data:image\/)[^\s\)]+)\)/);
  return match ? match[1] : undefined;
}

// 🗄️ 内存 SWR 高性能缓存：按日期缓存待办列表，保证 0 延迟秒开，彻底杜绝无休止刷新闪烁
const todosDateCache: Record<string, { items: CalendarTodoItem[]; timestamp: number }> = {};

export const todoistCalendarSidebarState = reactive<TodoistCalendarSidebarState>({
  collapsed: false,
  tabMode: "agenda",
  selectedDate: getLocalTodayDateStr(),
  badgeText: "在线",
  monthLabel: "",
  yearLabel: "",
  cells: [],
  agendaTitle: "今日日程",
  agendaCount: "",
  agendaItems: [],
  todoItems: [],
  todoLoading: false,
  emptyText: ""
});

export type CalendarSidebarAction =
  | "init"
  | "toggle-collapsed"
  | "today"
  | "prev-month"
  | "next-month"
  | "prev-year"
  | "next-year"
  | "select-date"
  | "context-date"
  | "drop-task"
  | "context-agenda"
  | "open-inspector";

export type CalendarSidebarActionHandler = (action: CalendarSidebarAction, payload?: any) => void;

const actionHandlers = new Set<CalendarSidebarActionHandler>();
let dateVersion = 0;
let dateAbort: AbortController | undefined;
export function cancelTodoistDateReads() {
  dateVersion++; dateAbort?.abort(); dateAbort = undefined;
  todoistCalendarSidebarState.todoLoading = false;
}

export const todoistCalendarSidebarController = {
  state: todoistCalendarSidebarState,

  setCollapsed(collapsed: boolean) {
    todoistCalendarSidebarState.collapsed = collapsed;
  },

  toggleCollapsed() {
    todoistCalendarSidebarState.collapsed = !todoistCalendarSidebarState.collapsed;
    this.dispatch("toggle-collapsed", todoistCalendarSidebarState.collapsed);
  },

  setTabMode(mode: CalendarTabMode) {
    cancelTodoistDateReads();
    todoistCalendarSidebarState.tabMode = mode;
    if (mode === "todo") {
      void this.loadTodosForDate(todoistCalendarSidebarState.selectedDate || getLocalTodayDateStr());
    }
  },

  /**
   * 记录本地任务完成/撤销，就地更新响应式列表，0 延迟秒开且杜绝刷新白屏
   */
  recordTaskCompletion(task: any, completed: boolean) {
    const id = String(task.id || task.task_id);
    const map = getLocalCompletedMap();
    if (completed) {
      const todayStr = getLocalTodayDateStr();
      const desc = task.description || task._taskRaw?.description || "";
      const completedItem: CalendarTodoItem = {
        id,
        content: task.content || "已完成任务",
        completed: true,
        priority: task.priority || 1,
        completedAt: new Date().toISOString(),
        dueText: todayStr,
        labels: task.labels || [],
        thumbUrl: extractThumbUrl(desc),
        raw: task
      };
      map[id] = completedItem;
      saveLocalCompletedMap(map);

      // 就地响应式更新：存在则打勾灰杠，不存在则追加到末尾
      const existingIdx = todoistCalendarSidebarState.todoItems.findIndex((t) => t.id === id);
      if (existingIdx >= 0) {
        todoistCalendarSidebarState.todoItems[existingIdx].completed = true;
      } else {
        todoistCalendarSidebarState.todoItems.push(completedItem);
      }
    } else {
      delete map[id];
      saveLocalCompletedMap(map);
      const existingIdx = todoistCalendarSidebarState.todoItems.findIndex((t) => t.id === id);
      if (existingIdx >= 0) {
        todoistCalendarSidebarState.todoItems[existingIdx].completed = false;
      }
    }

    // 同步更新缓存字典
    const curDate = todoistCalendarSidebarState.selectedDate || getLocalTodayDateStr();
    todosDateCache[curDate] = {
      items: [...todoistCalendarSidebarState.todoItems],
      timestamp: Date.now()
    };
  },

  /**
   * 严格缓存优先 (SWR) 读取待办列表，绝不反复清空或闪烁
   */
  async loadTodosForDate(dateStr: string) {
    if (!todoistModuleState.active) return;
    cancelTodoistDateReads();
    const request = new AbortController(); dateAbort = request;
    const version = dateVersion, session = todoistModuleState.session;
    const current = () => !request.signal.aborted && version === dateVersion &&
      session === todoistModuleState.session && todoistModuleState.active &&
      todoistCalendarSidebarState.tabMode === "todo";
    if (!dateStr) dateStr = getLocalTodayDateStr();
    todoistCalendarSidebarState.selectedDate = dateStr;

    const isToday = dateStr === getLocalTodayDateStr();

    // 1. 命中缓存：立即展示，绝不触发 loading 动画或白屏
    const cached = todosDateCache[dateStr];
    if (cached && cached.items && cached.items.length > 0) {
      todoistCalendarSidebarState.todoItems = cached.items;
      // 30 秒内的缓存视为新鲜，直接复用，不重复发起网络请求
      if (Date.now() - cached.timestamp < 30000) {
        return;
      }
    } else if (todoistCalendarSidebarState.todoItems.length === 0) {
      // 只有没有任何数据时才展示轻量 loading
      todoistCalendarSidebarState.todoLoading = true;
    }

    try {
      // 2. 静默拉取未完成任务（严格只筛选到期日属于该天的任务，分区独立性不受任何影响）
      const allTasks = await todoistService.getTasks(undefined, request.signal);
      if (!current()) return;
      const activeForDate = allTasks.filter((t) => {
        const d = t.due?.date || "";
        return d.startsWith(dateStr);
      });

      const mappedActive: CalendarTodoItem[] = activeForDate.map((t) => {
        const desc = t.description || "";
        return {
          id: String(t.id),
          content: t.content,
          completed: false,
          priority: t.priority || 1,
          dueText: t.due?.string || t.due?.date || "",
          labels: t.labels || [],
          thumbUrl: extractThumbUrl(desc),
          raw: t
        };
      });

      // 3. 汇聚已完成任务（三合一：本地看板即时状态 + 本地持久化记录 + Todoist 云端历史）
      const completedList: CalendarTodoItem[] = [];
      const seenIds = new Set<string>();

      // 3.1 本地看板即时已完成
      for (const col of todoistTaskListState.columns || []) {
        for (const t of col.tasks || []) {
          if (t.completed) {
            const id = String(t.id);
            if (!seenIds.has(id)) {
              seenIds.add(id);
              const desc = t.description || t._taskRaw?.description || "";
              completedList.push({
                id,
                content: t.content,
                completed: true,
                priority: t.priority || 1,
                completedAt: new Date().toISOString(),
                labels: t.labels || [],
                thumbUrl: extractThumbUrl(desc),
                raw: t
              });
            }
          }
        }
      }

      // 3.2 本地持久化完成记录
      const localMap = getLocalCompletedMap();
      for (const [id, item] of Object.entries(localMap)) {
        if (!seenIds.has(id)) {
          const cDate = item.completedAt ? new Date(item.completedAt).toLocaleDateString("en-CA") : "";
          if (cDate === dateStr || (isToday && !cDate)) {
            seenIds.add(id);
            completedList.push(item);
          }
        }
      }

      // 3.3 云端历史完成记录兜底
      const completedRes = await todoistService.getCompletedTasks({ limit: 50 }, request.signal);
      if (!current()) return;
      for (const t of completedRes.items || []) {
        const id = String(t.task_id || t.id);
        if (!seenIds.has(id)) {
          const rawDate = (t as any).completed_at || (t as any).completed_date || "";
          const cDate = rawDate ? new Date(rawDate).toLocaleDateString("en-CA") : "";
          if (cDate === dateStr || (isToday && !cDate)) {
            seenIds.add(id);
            completedList.push({
              id,
              content: t.content,
              completed: true,
              priority: 1,
              completedAt: rawDate,
              labels: [],
              thumbUrl: undefined,
              raw: t
            });
          }
        }
      }

      // 4. 合并并平滑写入
      const cleanActive = mappedActive.filter((t) => !seenIds.has(t.id));
      const finalList = [...cleanActive, ...completedList];

      // 更新内存缓存与界面
      todosDateCache[dateStr] = { items: finalList, timestamp: Date.now() };
      todoistCalendarSidebarState.todoItems = finalList;
    } catch {
      if (current()) todoistCalendarSidebarState.emptyText = "任务历史读取失败，保留已有数据。";
    } finally {
      if (current()) todoistCalendarSidebarState.todoLoading = false;
      if (dateAbort === request) dateAbort = undefined;
    }
  },

  async toggleTodoItem(item: CalendarTodoItem) {
    const nextCompleted = !item.completed;
    item.completed = nextCompleted;
    this.recordTaskCompletion(item, nextCompleted);

    try {
      if (nextCompleted) {
        await todoistService.toggleTaskCompletion(item.id, true);
        // 如果在日历里勾选完成，从右侧看板中移除
        for (const col of todoistTaskListState.columns || []) {
          const idx = col.tasks.findIndex((t) => String(t.id) === String(item.id));
          if (idx >= 0) col.tasks.splice(idx, 1);
        }
      } else {
        await todoistService.reopenTask(item.id);
        // Read the current view from Todoist instead of guessing a destination column.
        todoistService.invalidateWorkspaceSnapshots();
        if (todoistModuleState.active) await todoistTaskListController.loadWorkspace(undefined, undefined, true);
      }
    } catch (err) {
      item.completed = !nextCompleted; // 失败回滚
      this.recordTaskCompletion(item, !nextCompleted);
      console.error("[Todoist Calendar] Toggle todo completion failed:", err);
    }
  },

  updateTaskTitle(taskId: string, title: string) {
    const item = todoistCalendarSidebarState.todoItems.find(t => String(t.id) === String(taskId));
    if (item) item.content = title;
  },

  updateState(partial: Partial<TodoistCalendarSidebarState>) {
    const oldDate = todoistCalendarSidebarState.selectedDate;
    Object.assign(todoistCalendarSidebarState, partial);
    // 关键防抖保护：只有当用户真正切换了不同日期时，才去加载对应日期的待办；同一日期绝不重复重新拉取
    if (partial.selectedDate && partial.selectedDate !== oldDate && todoistCalendarSidebarState.tabMode === "todo") {
      void this.loadTodosForDate(partial.selectedDate);
    }
  },

  onAction(handler: CalendarSidebarActionHandler): () => void {
    actionHandlers.add(handler);
    return () => {
      actionHandlers.delete(handler);
    };
  },

  dispatch(action: CalendarSidebarAction, payload?: any) {
    for (const handler of actionHandlers) {
      try {
        handler(action, payload);
      } catch (err) {
        console.error(`[TodoistCalendarSidebar] Handler error for action ${action}:`, err);
      }
    }
  }
};
