import { reactive } from "vue";
import { todoistModuleState, withTodoistWrite } from "./module-state";
import { createTaskStartDateReader } from "./task-date-helper";

export interface TodoistTaskItem {
  id: string;
  content: string;
  description?: string;
  completed: boolean;
  dueDate?: string;
  startDate?: string;
  dueText?: string;
  dueString?: string;
  isOverdue?: boolean;
  isDueToday?: boolean;
  isRecurring?: boolean;
  priority?: number;
  labels?: string[];
  customColorHex?: string;
  timedDeadlineText?: string;
  timedDurationMinutes?: number;
  extraCountText?: string;
  url?: string;
  _taskRaw?: any;
}

export interface TodoistColumnItem {
  projectId?: string;
  sectionId: string;
  title: string;
  tasks: TodoistTaskItem[];
  _groupRaw?: any;
}

export interface TodoistProjectOption {
  id: string;
  name: string;
  color?: string;
  colorHex?: string;
}

export interface TodoistTaskListState {
  accountConfigured: boolean | null;
  loading: boolean;
  movingTaskId: string | null;
  moveMessage: string;
  moveError: boolean;
  moveNeedsRefresh: boolean;
  emptyText: string;
  view: "inbox" | "today" | "projects";
  activeProjectId: string;
  activeProjectName: string;
  projects: TodoistProjectOption[];
  columns: TodoistColumnItem[];
  addingSection: boolean;
  activeComposerSectionId: string | null;
  availableLabels?: string[];
}

export const todoistTaskListState = reactive<TodoistTaskListState>({
  accountConfigured: null,
  loading: false,
  movingTaskId: null,
  moveMessage: "",
  moveError: false,
  moveNeedsRefresh: false,
  emptyText: "",
  view: "inbox",
  activeProjectId: "",
  activeProjectName: "",
  projects: [],
  columns: [],
  addingSection: false,
  activeComposerSectionId: null,
  availableLabels: []
});

export type TaskListAction =
  | "create-task"
  | "toggle-task"
  | "update-task-title"
  | "update-task-desc"
  | "update-task-due"
  | "update-task-labels"
  | "update-task-recurring"
  | "clear-task-recurring"
  | "update-task-color"
  | "move-task-to-project"
  | "delete-task-submit"
  | "open-task-detail"
  | "open-context-menu"
  | "add-task-submit"
  | "add-section-submit"
  | "rename-section"
  | "delete-section"
  | "move-section"
  | "section-menu"
  | "create-project"
  | "create-project-submit"
  | "switch-project"
  | "rename-project"
  | "rename-project-submit"
  | "delete-project"
  | "delete-project-submit"
  | "refresh";

export type TaskListActionHandler = (action: TaskListAction, payload?: any) => void;

import { todoistService } from "../services/todoist.service";

const actionHandlers = new Set<TaskListActionHandler>();
let loadWorkspaceSeq = 0;
let workspaceAbort: AbortController | undefined;
export function cancelTodoistWorkspaceReads() {
  loadWorkspaceSeq++; workspaceAbort?.abort(); workspaceAbort = undefined;
  todoistTaskListState.loading = false;
}


export const todoistTaskListController = {
  updateState(partial: Partial<TodoistTaskListState>) {
    Object.assign(todoistTaskListState, partial);
  },
  setLoading(loading: boolean) {
    todoistTaskListState.loading = loading;
    if (loading) {
      todoistTaskListState.emptyText = "";
    }
  },
  setColumns(columns: TodoistColumnItem[]) {
    todoistTaskListState.columns = [...columns];
    if (columns.length > 0) {
      todoistTaskListState.emptyText = "";
    }
  },
  onAction(handler: TaskListActionHandler): () => void {
    actionHandlers.add(handler);
    return () => {
      actionHandlers.delete(handler);
    };
  },
  async loadWorkspace(view?: "inbox" | "today" | "projects", projectId?: string, force = false) {
    if (!todoistModuleState.active) return;
    if (todoistTaskListState.movingTaskId) {
      todoistTaskListState.moveMessage = "位置已在本页移动，正在后台保存；完成后可刷新看板。";
      return;
    }
    cancelTodoistWorkspaceReads();
    const request = new AbortController(); workspaceAbort = request;
    const session = todoistModuleState.session, sequence = loadWorkspaceSeq;
    const current = () => !request.signal.aborted && todoistModuleState.active &&
      session === todoistModuleState.session && sequence === loadWorkspaceSeq;
    const targetView = view || todoistTaskListState.view || "inbox";
    const targetProjectId = projectId || (targetView === "projects"
      ? (todoistTaskListState.activeProjectId || todoistService.getActiveProjectId()) : undefined);
    const changed = targetView !== todoistTaskListState.view ||
      (targetView === "projects" && targetProjectId !== todoistTaskListState.activeProjectId);
    todoistTaskListState.view = targetView;
    if (changed) this.updateState({ columns: [], emptyText: "", activeProjectId: targetProjectId || "" });
    const apply = (data: any) => {
      if (!current()) return;
      // Mutating a window card must not mutate a shared service/cache object.
      // Copy editable projection fields, not a stringify/parse of the entire graph.
      const readStartDate = createTaskStartDateReader();
      const copy = {
        ...data,
        projects: data.projects.map((project: TodoistProjectOption) => ({ ...project })),
        availableLabels: [...(data.availableLabels || [])],
        columns: data.columns.map((col: TodoistColumnItem) => ({
          ...col,
          _groupRaw: col._groupRaw ? { ...col._groupRaw } : undefined,
          tasks: col.tasks.map(task => ({
            ...task, startDate: readStartDate(task.id, task.description),
            labels: task.labels ? [...task.labels] : undefined,
            _taskRaw: task._taskRaw ? {
              ...task._taskRaw,
              labels: [...(task._taskRaw.labels || [])],
              due: task._taskRaw.due ? { ...task._taskRaw.due } : null
            } : undefined
          }))
        }))
      };
      todoistTaskListState.moveNeedsRefresh = false;
      if (!todoistTaskListState.movingTaskId && todoistTaskListState.moveError) {
        todoistTaskListState.moveMessage = "";
        todoistTaskListState.moveError = false;
      }
      this.updateState({ ...copy, view: targetView, loading: false,
        emptyText: copy.columns.length ? "" : "暂无待办任务" });
      (window as any).LogicWeaverTodoistMainWorkspace?.updateState?.({
        title: targetView === "projects" ? "项目" :
          (targetView === "today" ? "今天" : "收件箱")
      });
    };
    this.setLoading(todoistTaskListState.columns.length === 0);
    try {
      // Distinguish missing configuration from storage, authentication and network failures.
      await todoistService.initToken();
      if (!current()) return;
      todoistTaskListState.accountConfigured = Boolean(todoistService.getToken().trim());
      if (!todoistTaskListState.accountConfigured) {
        this.updateState({ loading: false, columns: [], projects: [], availableLabels: [], emptyText: "" });
        return;
      }
      if (!force) {
        const cached = await todoistService.getCachedWorkspaceData(targetView, targetProjectId);
        if (!current()) return;
        if (cached) apply(cached);
      }
      const data = await todoistService.loadWorkspaceData(targetView, targetProjectId, force, request.signal);
      apply(data);
    } catch {
      if (current()) this.updateState({ loading: false,
        emptyText: todoistTaskListState.columns.length ? "刷新未完成，保留已有数据。" : "待办读取失败，请手动刷新。" });
    } finally {
      if (workspaceAbort === request) workspaceAbort = undefined;
    }
  },
  async moveTask(taskId: string, target: { projectId?: string; sectionId?: string; dueDate?: string },
    beforeTaskId?: string): Promise<boolean> {
    const state = todoistTaskListState;
    const fail = (message: string) => { state.moveMessage = message; state.moveError = true; return false; };
    if (!todoistModuleState.active || state.movingTaskId) return false;
    if (state.moveNeedsRefresh) return fail("上次保存结果未确认，请先刷新看板核对；未重复提交。");
    const source = state.columns.find(col => col.tasks.some(task => task.id === taskId));
    const task = source?.tasks.find(task => task.id === taskId);
    if (!source || !task || task.completed || taskId.startsWith("optimistic-")) return fail("任务尚未保存或已完成，不能移动。");
    if (beforeTaskId === taskId) return true;
    const view = state.view, project = state.activeProjectId, columns = state.columns;
    const sourceIndex = source.tasks.indexOf(task);
    const nextId = source.tasks[sourceIndex + 1]?.id, previousId = source.tasks[sourceIndex - 1]?.id;
    const oldDue = { dueDate: task.dueDate, dueText: task.dueText, dueString: task.dueString,
      isDueToday: task.isDueToday, isOverdue: task.isOverdue };
    const todayView = view === "today";
    const virtualTarget = todayView && !target.projectId;
    if (target.dueDate && (!todayView || target.dueDate !== new Date().toLocaleDateString("en-CA"))) {
      return fail("这里只支持将逾期任务拖到今天；其他日期请使用日期设置。");
    }
    if (!target.dueDate && target.sectionId === undefined) return fail("目标板块未就绪，未提交移动。");
    if (!target.dueDate && !target.projectId && !virtualTarget) return fail("目标项目未就绪，未提交移动。");
    const destination = target.dueDate
      ? state.columns.find(col => col.sectionId === "today")
      : virtualTarget ? state.columns.find(col => col.sectionId === target.sectionId)
      : state.columns.find(col => col.projectId === target.projectId && col.sectionId === target.sectionId);
    const relocation = target.dueDate ? source.sectionId !== "today" :
      !virtualTarget && (String(task._taskRaw?.project_id || source.projectId || "") !== target.projectId ||
        String(task._taskRaw?.section_id || source.sectionId || "") !== target.sectionId);
    if (!relocation && source === destination && beforeTaskId === undefined &&
        source.tasks[source.tasks.length - 1]?.id === taskId) return true;
    if (virtualTarget && target.sectionId === "overdue" && source.sectionId !== "overdue") {
      return fail("逾期是日期汇总，不是板块，不能把未逾期任务拖成逾期。");
    }
    const anchor = beforeTaskId ? destination?.tasks.find(item => item.id === beforeTaskId) : undefined;
    if ((virtualTarget && !destination) || (beforeTaskId && !anchor)) {
      return fail("目标板块或任务已改变，请重新拖动。");
    }
    const parent = relocation && !virtualTarget ? "" : String(task._taskRaw?.parent_id || "");
    const expectedProject = target.projectId || String(task._taskRaw?.project_id || source.projectId || "");
    const expectedSection = target.projectId ? target.sectionId! : String(task._taskRaw?.section_id || "");
    if (anchor && !todayView && String(anchor._taskRaw?.parent_id || "") !== parent) {
      return fail("不能通过平面看板改变任务的父子关系，请在 Todoist 中调整。");
    }
    const siblings = (destination?.tasks || []).filter(item => item.id !== taskId &&
      (todayView || String(item._taskRaw?.parent_id || "") === parent));
    const order = anchor ? siblings.findIndex(item => item.id === anchor.id) + 1 : siblings.length + 1;
    if (destination && order < 1) return fail("目标任务位置已改变，请重试拖动。");
    state.movingTaskId = taskId; state.moveMessage = "位置已在本页移动，正在后台保存…"; state.moveError = false;
    cancelTodoistWorkspaceReads();
    todoistService.invalidateWorkspaceSnapshots();
    let locationConfirmed = false;
    let updated: any;
    let previewApplied = false, removedFromView = false;
    // Settle the owned retained board even when hidden; never modify a replacement board.
    const ownsBoard = () => columns === state.columns && view === state.view && project === state.activeProjectId;
    const applyPlacement = (ordered: boolean): boolean => {
      if (!ownsBoard()) return false;
      const liveSource = state.columns.find(col => col.tasks.some(item => item.id === taskId));
      const liveTask = liveSource?.tasks.find(item => item.id === taskId) ||
        (previewApplied && removedFromView ? task : undefined);
      if (!liveTask) return false;
      let liveTarget = target.dueDate ? state.columns.find(col => col.sectionId === "today")
        : virtualTarget ? state.columns.find(col => col.sectionId === target.sectionId)
        : state.columns.find(col => col.projectId === target.projectId && col.sectionId === target.sectionId);
      const keepTodayPosition = !liveTarget && todayView && !virtualTarget;
      if (keepTodayPosition) liveTarget = source;
      if (!liveTarget && virtualTarget) return false;
      if (liveSource) liveSource.tasks.splice(liveSource.tasks.indexOf(liveTask), 1);
      if (updated) {
        const raw = { ...liveTask._taskRaw };
        for (const key of ["project_id", "section_id", "parent_id", "child_order", "day_order", "due"]) {
          if (Object.prototype.hasOwnProperty.call(updated, key)) raw[key] = updated[key];
        }
        liveTask._taskRaw = raw;
      }
      if (target.dueDate) {
        liveTask.dueDate = updated?.due?.date || target.dueDate;
        liveTask.dueText = "今天"; liveTask.dueString = updated?.due?.string || target.dueDate;
        liveTask.isDueToday = true; liveTask.isOverdue = false;
      }
      if (liveTarget) {
        const index = keepTodayPosition ? Math.min(sourceIndex, liveTarget.tasks.length)
          : ordered && beforeTaskId ? liveTarget.tasks.findIndex(item => item.id === beforeTaskId) : -1;
        liveTarget.tasks.splice(index < 0 ? liveTarget.tasks.length : index, 0, liveTask);
      }
      removedFromView = !liveTarget;
      return true;
    };
    const restorePreview = (): boolean => {
      if (!previewApplied || !ownsBoard() || !state.columns.includes(source)) return false;
      const currentColumn = state.columns.find(col => col.tasks.some(item => item.id === taskId));
      const currentTask = currentColumn?.tasks.find(item => item.id === taskId) || (removedFromView ? task : undefined);
      if (!currentTask) return false;
      if (currentColumn) currentColumn.tasks.splice(currentColumn.tasks.indexOf(currentTask), 1);
      // Restore only this row, preserving other edits and using surviving neighbours.
      const next = nextId ? source.tasks.findIndex(item => item.id === nextId) : -1;
      const previous = previousId ? source.tasks.findIndex(item => item.id === previousId) : -1;
      const index = next >= 0 ? next : previous >= 0 ? previous + 1 : Math.min(sourceIndex, source.tasks.length);
      source.tasks.splice(index, 0, currentTask);
      if (target.dueDate && currentTask.dueDate === target.dueDate && currentTask.dueText === "今天" &&
          currentTask.dueString === target.dueDate && currentTask.isDueToday && !currentTask.isOverdue) {
        Object.assign(currentTask, oldDue);
      }
      removedFromView = false;
      return true;
    };
    try {
      return await withTodoistWrite(async () => {
        try {
          previewApplied = applyPlacement(true);
          if (!previewApplied) throw new Error("看板已改变");
          if (relocation) {
            updated = target.dueDate
              ? await todoistService.setTaskDueDate(taskId, target.dueDate)
              : await todoistService.moveTask(taskId, { projectId: target.projectId!, sectionId: target.sectionId! });
            if (target.dueDate && String(updated?.due?.date || "").slice(0, 10) !== target.dueDate) {
              throw new Error("截止日期回复未确认");
            }
            locationConfirmed = true;
          }
          if (destination && (!relocation || beforeTaskId)) {
            const positioned = await todoistService.reorderTask(taskId, order, todayView);
            if ((expectedProject && String(positioned.project_id) !== expectedProject) ||
                String(positioned.section_id || "") !== expectedSection || String(positioned.parent_id || "") !== parent) {
              locationConfirmed = false;
              throw new Error("任务位置在保存期间发生变化，请刷新核对");
            }
            updated = { ...updated, ...positioned };
          }
          const applied = applyPlacement(true);
          state.moveMessage = applied ? "" : "任务位置已保存；看板已切换，请手动刷新核对。";
          return true;
        } catch {
          state.moveNeedsRefresh = true;
          if (locationConfirmed) {
            applyPlacement(false);
            return fail("板块移动已确认，但排序未确认；保留已确认板块，请刷新核对，未自动重试。");
          }
          const restored = restorePreview();
          return fail(restored
            ? "本页显示已恢复到拖动前；云端保存结果未确认，请刷新核对，未自动重试。"
            : "云端保存结果未确认；看板已改变，请刷新核对，未自动重试。");
        }
      });
    } finally {
      todoistService.invalidateWorkspaceSnapshots();
      state.movingTaskId = null;
    }
  },
  dispatch(action: TaskListAction, payload?: any) {
    const taskId = String(payload?.taskId || payload?.task?.id || payload?.id || (typeof payload === "string" ? payload : ""));
    if (todoistTaskListState.movingTaskId === taskId &&
        (action.startsWith("update-task-") || action === "toggle-task" || action === "delete-task-submit")) {
      return false;
    }
    if (action === "move-task-to-project") {
      return this.moveTask(String(payload?.taskId || ""), {
        projectId: String(payload?.targetProjectId || ""), sectionId: ""
      });
    }
    // 乐观响应式就地更新与直接服务调用
    if (action === "create-task") {
      todoistTaskListState.activeComposerSectionId = todoistTaskListState.columns[0]?.sectionId ?? "";
    } else if (action === "refresh") {
      void this.loadWorkspace(todoistTaskListState.view, todoistTaskListState.activeProjectId, true);
    } else if (action === "switch-project") {
      const projId = String(payload?.id || payload || "");
      void this.loadWorkspace("projects", projId);
    } else if (action === "create-project-submit") {
      const name = String(payload || "").trim();
      if (name) {
        void todoistService.createProject(name).then((newProj) => {
          void this.loadWorkspace("projects", newProj?.id ? String(newProj.id) : undefined);
        }).catch((err) => console.error("[Todoist] Create project error:", err));
      }
    } else if (action === "rename-project-submit") {
      const projId = String(payload?.projectId || "");
      const newName = String(payload?.newName || "").trim();
      if (projId && newName) {
        void todoistService.renameProject(projId, newName).then(() => {
          void this.loadWorkspace("projects", projId);
        }).catch((err) => console.error("[Todoist] Rename project error:", err));
      }
    } else if (action === "delete-project-submit") {
      const projId = String(payload?.projectId || payload || "");
      if (projId) {
        void todoistService.deleteProject(projId).then(() => {
          void this.loadWorkspace("projects");
        }).catch((err) => console.error("[Todoist] Delete project error:", err));
      }
    } else if (action === "add-section-submit") {
      const name = String(typeof payload === "string" ? payload : payload?.name || "").trim();
      const projId = String(
        (typeof payload === "object" && payload?.projectId ? payload.projectId : "") ||
        todoistTaskListState.activeProjectId ||
        todoistTaskListState.columns.find((c) => c.projectId)?.projectId ||
        todoistService.getActiveProjectId() ||
        ""
      );
      if (name && projId) {
        void todoistService.createSection(name, projId).then(() => {
          void this.loadWorkspace(todoistTaskListState.view, projId, true);
        }).catch((err) => console.error("[Todoist] Create section error:", err));
      }
    } else if (action === "rename-section") {
      const secId = String(payload?.sectionId || "");
      const newName = String(payload?.newName || "").trim();
      if (newName) {
        if (secId) {
          void todoistService.renameSection(secId, newName).then(() => {
            void this.loadWorkspace(todoistTaskListState.view, todoistTaskListState.activeProjectId, true);
          }).catch((err) => console.error("[Todoist] Rename section error:", err));
        } else {
          todoistService.setDefaultSectionName(newName);
          const defaultCol = todoistTaskListState.columns.find((c) => !c.sectionId);
          if (defaultCol) defaultCol.title = newName;
          void this.loadWorkspace(todoistTaskListState.view, todoistTaskListState.activeProjectId, true);
        }
      }
    } else if (action === "delete-section") {
      const secId = String(payload?.sectionId || payload || "");
      if (secId) {
        // 乐观移除界面上的列
        const targetIdx = todoistTaskListState.columns.findIndex(c => String(c.sectionId) === secId);
        let removedCol: TodoistColumnItem | undefined = undefined;
        if (targetIdx !== -1) {
          removedCol = todoistTaskListState.columns[targetIdx];
          todoistTaskListState.columns.splice(targetIdx, 1);
        }

        void todoistService.deleteSection(secId).then(() => {
          void this.loadWorkspace(todoistTaskListState.view, todoistTaskListState.activeProjectId, true);
        }).catch((err: any) => {
          console.error("[Todoist] Delete section error:", err);
          // 若失败则回滚并提示
          if (removedCol && targetIdx !== -1) {
            todoistTaskListState.columns.splice(targetIdx, 0, removedCol);
          }
          todoistTaskListState.moveError = true;
          todoistTaskListState.moveMessage = `删除板块失败: ${err?.message || "网络请求异常"}`;
          if (typeof window !== "undefined") {
            const win = window as any;
            win.LogicWeaverNotifications?.error?.("Todoist", `删除板块失败: ${err?.message || "网络或权限错误"}`);
          }
        });
      }
    } else if (action === "add-task-submit") {
      const content = String(payload?.content || "").trim();
      const currentView = payload?.view || todoistTaskListState.view || "inbox";
      let projectId: string | undefined = payload?.projectId || payload?.group?.projectId || undefined;
      let sectionId: string | undefined = payload?.sectionId !== undefined ? payload.sectionId : payload?.group?.sectionId;
      let dueString: string | undefined = undefined;

      if (currentView === "projects") {
        if (!projectId) projectId = todoistTaskListState.activeProjectId || undefined;
      } else if (currentView === "today") {
        dueString = "today";
      }

      // API 只接受真实 sectionId，空字符串表示无板块
      const apiSectionId = sectionId ? sectionId : undefined;

      if (content) {
        // 1. 瞬间乐观更新（0ms 即刻插入对应分栏）
        const tempId = `optimistic-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
        const optimisticTask: TodoistTaskItem = {
          id: tempId,
          content,
          completed: false,
          priority: 1,
          labels: [],
          dueText: dueString ? "今天" : "",
          isOverdue: false
        };

        // 精确放入用户点击添加的分栏，不按分组名称猜测目标。
        let targetCol = todoistTaskListState.columns.find((col) => {
          if (payload?.group && col === payload.group) return true;
          if (sectionId !== undefined && col.sectionId === sectionId) return true;
          return false;
        });
        if (!targetCol && todoistTaskListState.columns.length > 0) {
          targetCol = todoistTaskListState.columns[0];
        }
        if (targetCol) {
          targetCol.tasks.push(optimisticTask);
        }

        const attachments = Array.isArray(payload?.attachments) ? payload.attachments : [];
        if (attachments.length > 0) {
          optimisticTask.description = attachments.map((a: any) => `![${a.file_name}](${a.file_url})`).join("\n\n");
        }

        const taskPromise = attachments.length > 0
          ? todoistService.createTaskWithAttachments({
              content,
              project_id: projectId,
              section_id: apiSectionId,
              due_string: dueString,
              attachments
            })
          : todoistService.createTask({
              content,
              project_id: projectId,
              section_id: apiSectionId,
              due_string: dueString
            });

        return taskPromise.then((realTask) => {
          if (realTask && realTask.id) {
            optimisticTask.id = String(realTask.id);
            optimisticTask._taskRaw = realTask;
            if (realTask.url) optimisticTask.url = realTask.url;
            try {
              todoistService.updateLocalCacheOnTaskCreated(realTask, currentView, projectId, targetCol?.sectionId);
            } catch {}
          }
          return true;
        }).catch((err) => {
          console.error("[Todoist] Create task error:", err);
          if (targetCol) {
            const idx = targetCol.tasks.findIndex((t) => t.id === tempId);
            if (idx >= 0) targetCol.tasks.splice(idx, 1);
          }
          if (typeof window !== "undefined") {
            const win = window as any;
            win.LogicWeaverNotifications?.fetch?.("Todoist", "任务创建未确认，请核对；没有自动重试。");
          }
          return false;
        });
      }
    } else if (action === "toggle-task") {
      const taskId = String(payload?.taskId || payload?.task?.id || payload?.id || payload || "");
      for (const col of todoistTaskListState.columns) {
        const foundIndex = col.tasks.findIndex((t) => String(t.id) === taskId);
        if (foundIndex >= 0) {
          const found = col.tasks[foundIndex];
          const nextCompleted = !found.completed;
          found.completed = nextCompleted;

          if (todoistService.getToken()) {
            void todoistService.toggleTaskCompletion(taskId, nextCompleted);
          }
          // 0ms 联动日历待办完成状态与历史记录
          void withTodoistWrite(async () => {
            const { todoistCalendarSidebarController } = await import("./calendar-sidebar-store");
            todoistCalendarSidebarController.recordTaskCompletion(found, nextCompleted);
          }).catch(() => { todoistTaskListState.emptyText = "本地完成记录未确认，请核对；没有自动重试。"; });

          // 完成后看板不再留存占位：立即从看板列表中移除，交由左侧日历作为历史流兜底
          if (nextCompleted) {
            col.tasks.splice(foundIndex, 1);
          }
          break;
        }
      }
    } else if (action === "update-task-title") {
      const taskId = String(payload?.taskId || payload?.task?.id || payload?.id || "");
      const newContent = String(payload?.content !== undefined ? payload.content : (payload?.newContent || ""));
      for (const col of todoistTaskListState.columns) {
        const found = col.tasks.find((t) => String(t.id) === taskId);
        if (found && newContent) {
          found.content = newContent;
          if (todoistService.getToken()) {
            void todoistService.updateTask(taskId, { content: newContent });
          }
          break;
        }
      }
    } else if (action === "update-task-desc") {
      const taskId = String(payload?.taskId || "");
      const desc = String(payload?.description || "");
      for (const col of todoistTaskListState.columns) {
        const found = col.tasks.find((t) => String(t.id) === taskId);
        if (found) {
          found.description = desc;
          if (todoistService.getToken()) {
            void todoistService.updateTask(taskId, { description: desc });
          }
          break;
        }
      }
    } else if (action === "delete-task-submit") {
      const taskId = String(payload?.taskId || payload || "");
      for (const col of todoistTaskListState.columns) {
        const idx = col.tasks.findIndex((t) => String(t.id) === taskId);
        if (idx !== -1) {
          col.tasks.splice(idx, 1);
          if (todoistService.getToken()) {
            void todoistService.deleteTask(taskId);
          }
          break;
        }
      }
    }

    // 广播通知注册的外部处理程序
    for (const handler of actionHandlers) {
      try {
        handler(action, payload);
      } catch (err) {
        console.error(`[TodoistTaskList] Handler error for action ${action}:`, err);
      }
    }
  }
};
