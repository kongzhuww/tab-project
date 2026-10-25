import { reactive } from "vue";
import { rememberTitleDraft, todoistTitleDrafts } from "./title-drafts";
import { trackTodoistWrites } from "./module-state";
import { todoistService } from "../services/todoist.service";
import { todoistTaskListController, todoistTaskListState, cancelTodoistWorkspaceReads } from "./task-list-store";
import { todoistCalendarSidebarController } from "./calendar-sidebar-store";
import { getTaskStartDate, setTaskStartDate, parseDateAndTime, combineDateAndTime } from "./task-date-helper";

export interface TodoistInspectorState {
  isOpen: boolean;
  taskId: string;
  title: string;
  description: string;
  priority: number;
  startDate: string;
  startTime: string;
  dueDate: string;
  dueTime: string;
  labels: string[];
  loading: boolean;
  saving: boolean;
  error: string;
  url?: string;
  commentAttachments: Array<{ name: string; url: string }>;
}

export const todoistInspectorState = reactive<TodoistInspectorState>({
  isOpen: false,
  taskId: "",
  title: "",
  description: "",
  priority: 1,
  startDate: "",
  startTime: "",
  dueDate: "",
  dueTime: "",
  labels: [],
  loading: false,
  saving: false,
  error: "",
  url: "",
  commentAttachments: []
});

// Serialize title/description snapshots; a slow request must not discard a later edit.
let titleWriteQueue: Promise<void> = Promise.resolve();
let pendingTitleWrites = 0;
let dateWriteQueue: Promise<void> = Promise.resolve();
const dateRevisions = new Map<string, number>();
let selectionVersion = 0;
const readRequests = new Map<string, AbortController>();

function cancelReads(advanceSelection = true) {
  if (advanceSelection) selectionVersion++;
  for (const request of readRequests.values()) request.abort();
  readRequests.clear();
  todoistInspectorState.loading = false;
}
function beginRead(channel: string) {
  readRequests.get(channel)?.abort();
  const request = new AbortController();
  readRequests.set(channel, request);
  const version = selectionVersion;
  const taskId = todoistInspectorState.taskId;
  return {
    signal: request.signal,
    current: () => !request.signal.aborted && version === selectionVersion &&
      todoistInspectorState.isOpen && taskId === todoistInspectorState.taskId &&
      readRequests.get(channel) === request,
    finish: () => { if (readRequests.get(channel) === request) readRequests.delete(channel); }
  };
}
function writeTarget() {
  // A pending detail response must not overwrite a newly submitted edit.
  cancelReads(false);
  const taskId = todoistInspectorState.taskId;
  const version = selectionVersion;
  return { taskId, current: () => todoistInspectorState.isOpen &&
    version === selectionVersion && taskId === todoistInspectorState.taskId };
}

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve((reader.result as string) || "");
    reader.onerror = () => resolve("");
    reader.readAsDataURL(file);
  });
}

function previewTaskText(taskId: string, title: string, description?: string) {
  for (const col of todoistTaskListState.columns) {
    for (const task of col.tasks) {
      if (String(task.id) !== taskId) continue;
      task.content = title;
      if (description !== undefined) task.description = description;
      if (task._taskRaw) {
        task._taskRaw.content = title;
        if (description !== undefined) task._taskRaw.description = description;
      }
    }
  }
  todoistCalendarSidebarController.updateTaskTitle(taskId, title);
}

const inspectorController = {
  state: todoistInspectorState,
  cancelReads,

  stageTitleDraft(taskId: string, title: string, description: string) {
    if (!taskId) return;
    rememberTitleDraft(taskId, title, description);
    cancelReads(false);
    if (todoistInspectorState.taskId === taskId) todoistInspectorState.title = title;
    previewTaskText(taskId, title, description);
  },

  async openTask(taskId: string, initialData?: any) {
    if (!taskId) return;
    cancelReads();
    todoistInspectorState.taskId = taskId;
    todoistInspectorState.isOpen = true;
    todoistInspectorState.error = "";
    Object.assign(todoistInspectorState, {
      title: "", description: "", priority: 1,
      startDate: "", startTime: "", dueDate: "", dueTime: "",
      labels: [], url: "", commentAttachments: []
    });

    if (initialData) {
      todoistInspectorState.title = initialData.content || initialData.title || "";
      todoistInspectorState.description = initialData.description || initialData.raw?.description || "";
      todoistInspectorState.priority = initialData.priority || 1;

      const parsedDue = parseDateAndTime(initialData.due?.datetime || initialData.due?.date || initialData.dueDate || "");
      todoistInspectorState.dueDate = parsedDue.date;
      todoistInspectorState.dueTime = parsedDue.time;

      const rawStart = initialData.startDate || getTaskStartDate(taskId, todoistInspectorState.description);
      const parsedStart = parseDateAndTime(rawStart);
      todoistInspectorState.startDate = parsedStart.date;
      todoistInspectorState.startTime = parsedStart.time;

      todoistInspectorState.labels = [...(initialData.labels || [])];
      todoistInspectorState.url = initialData.url || "";
    }

    const retainedDraft = todoistTitleDrafts.get(taskId);
    if (retainedDraft) {
      todoistInspectorState.title = retainedDraft.title;
      todoistInspectorState.description = retainedDraft.description;
    }

    // 异步拉取该任务最新完整详情
    const read = beginRead("detail");
    todoistInspectorState.loading = true;
    try {
      const task = await todoistService.api<any>(`/tasks/${encodeURIComponent(taskId)}`, { signal: read.signal });
      if (task && read.current()) {
        const draft = todoistTitleDrafts.get(taskId);
        todoistInspectorState.title = draft?.title ?? task.content ?? "";
        todoistInspectorState.description = draft?.description ?? task.description ?? "";
        todoistInspectorState.priority = task.priority || 1;

        const parsedDue = parseDateAndTime(task.due?.datetime || task.due?.date || "");
        todoistInspectorState.dueDate = parsedDue.date;
        todoistInspectorState.dueTime = parsedDue.time;

        const rawStart = getTaskStartDate(taskId, task.description || todoistInspectorState.description);
        const parsedStart = parseDateAndTime(rawStart);
        todoistInspectorState.startDate = parsedStart.date;
        todoistInspectorState.startTime = parsedStart.time;

        todoistInspectorState.labels = [...(task.labels || [])];
        todoistInspectorState.url = task.url || "";

        // 异步并发拉取评论区附件（获取 Todoist 重新签发的新鲜防过期云端直链）
        try {
          const comments = await todoistService.getComments(taskId, read.signal);
          if (comments && read.current()) {
            const freshAtts: Array<{ name: string; url: string }> = [];
            for (const c of comments) {
              if (c?.attachment?.file_url) {
                const name = c.attachment.file_name || "附件图片";
                freshAtts.push({ name, url: c.attachment.file_url });
              }
            }
            todoistInspectorState.commentAttachments = freshAtts;

            // 如果任务描述里有旧的过期 CloudFront 链接，用最新签名链接无缝替换刷新
            if (freshAtts.length > 0 && todoistInspectorState.description) {
              let updatedDesc = todoistInspectorState.description;
              let hasReplaced = false;
              for (const att of freshAtts) {
                // 匹配带签名的同名附件或者 cloudfront 链接
                const reg = new RegExp(`(!\\[.*?\\]\\()https?://[^\\s\\)]*cloudfront\\.net[^\\s\\)]*(\\))`, "g");
                if (reg.test(updatedDesc)) {
                  updatedDesc = updatedDesc.replace(reg, `$1${att.url}$2`);
                  hasReplaced = true;
                }
              }
              if (hasReplaced && !todoistTitleDrafts.has(taskId)) {
                todoistInspectorState.description = updatedDesc;
                for (const col of todoistTaskListState.columns) {
                  const found = col.tasks.find((t) => String(t.id) === taskId);
                  if (found) {
                    found.description = updatedDesc;
                    if (found._taskRaw) found._taskRaw.description = updatedDesc;
                    break;
                  }
                }
              }
            }
          }
        } catch {}
      }
    } catch {
      if (read.current()) todoistInspectorState.error = "任务详情读取失败，请重新打开重试。";
    } finally {
      if (read.current()) todoistInspectorState.loading = false;
      read.finish();
    }
  },

  close() {
    cancelReads();
    todoistInspectorState.isOpen = false;
    todoistInspectorState.taskId = "";
  },

  async setStartDateAndTime(startDate: string, startTime: string) {
    if (!todoistInspectorState.taskId) return;
    const target = writeTarget();
    const d = startDate.trim();
    const t = d ? startTime.trim() : "";
    todoistInspectorState.startDate = d;
    todoistInspectorState.startTime = t;
    cancelTodoistWorkspaceReads();
    const start = combineDateAndTime(d, t);
    setTaskStartDate(target.taskId, start);
    todoistService.invalidateWorkspaceSnapshots();
    for (const col of todoistTaskListState.columns) {
      const task = col.tasks.find(item => item.id === target.taskId);
      if (task) task.startDate = start;
    }
  },

  async setDueDateAndTime(dueDate: string, dueTime: string) {
    if (!todoistInspectorState.taskId) return;
    const target = writeTarget();
    const d = dueDate.trim();
    const t = d ? dueTime.trim() : "";
    todoistInspectorState.dueDate = d;
    todoistInspectorState.dueTime = t;

    cancelTodoistWorkspaceReads();
    todoistService.invalidateWorkspaceSnapshots();
    const revision = (dateRevisions.get(target.taskId) || 0) + 1;
    dateRevisions.set(target.taskId, revision);
    const operation = dateWriteQueue.then(async () => {
      try {
        const updated = await todoistService.updateTask(target.taskId, {
          due_string: d ? (t ? `${d} ${t}` : d) : "no date"
        });
        if (dateRevisions.get(target.taskId) !== revision) return;
        const mapped = todoistService.mapTasks([updated], new Date().toLocaleDateString("en-CA"))[0];
        for (const col of todoistTaskListState.columns) {
          const index = col.tasks.findIndex(task => task.id === target.taskId);
          if (index < 0) continue;
          const task = col.tasks[index];
          Object.assign(task, {
            dueDate: mapped.dueDate, dueText: mapped.dueText, dueString: mapped.dueString,
            isDueToday: mapped.isDueToday, isOverdue: mapped.isOverdue, isRecurring: mapped.isRecurring
          });
          if (task._taskRaw) task._taskRaw.due = updated.due;
          if (todoistTaskListState.view === "today") {
            const destination = mapped.isOverdue ? "overdue" : mapped.isDueToday ? "today" : "";
            if (destination !== col.sectionId) {
              col.tasks.splice(index, 1);
              todoistTaskListState.columns.find(item => item.sectionId === destination)?.tasks.push(task);
            }
          }
        }
        if (target.current()) todoistInspectorState.error = "";
      } catch {
        if (target.current() && dateRevisions.get(target.taskId) === revision) {
          todoistInspectorState.error = "时间保存未确认，请刷新核对；未自动重试。";
        }
      }
    });
    dateWriteQueue = operation.catch(() => {});
    await operation;
  },

  async saveTitleAndDesc(title: string, description: string, taskId = todoistInspectorState.taskId) {
    const target = taskId === todoistInspectorState.taskId
      ? writeTarget()
      : { taskId, current: () => false };
    if (!target.taskId || !title.trim()) return;

    const trimmedTitle = title.trim();
    const trimmedDesc = description.trim();
    const revision = rememberTitleDraft(taskId, trimmedTitle, trimmedDesc, "saving");

    // 立即乐观更新 (Optimistic UI Update) — 0延迟实时同步任务卡片内容与标题
    if (target.current()) {
      todoistInspectorState.title = trimmedTitle;
      todoistInspectorState.description = trimmedDesc;
    }
    previewTaskText(target.taskId, trimmedTitle, trimmedDesc);

    pendingTitleWrites++;
    todoistInspectorState.saving = true;
    const operation = titleWriteQueue.then(async () => {
      try {
        await todoistService.updateTask(target.taskId, {
          content: trimmedTitle,
          description: trimmedDesc
        });
        if (todoistTitleDrafts.get(taskId)?.revision === revision) {
          todoistTitleDrafts.delete(taskId);
        }
        // An older response must not clear a newer draft or refresh over unsaved text.
        if (pendingTitleWrites === 1 && todoistTitleDrafts.size === 0) {
          todoistTaskListController.dispatch("refresh");
        }
      } catch (err: unknown) {
        const draft = todoistTitleDrafts.get(taskId);
        if (draft?.revision === revision) {
          draft.status = "failed";
          draft.error = err instanceof Error ? err.message : "保存未确认";
        }
      } finally {
        pendingTitleWrites--;
        todoistInspectorState.saving = pendingTitleWrites > 0;
      }
    });
    titleWriteQueue = operation.catch(() => {});
    await operation;
  },

  async attachImageToTask(file: File) {
    const target = writeTarget();
    await titleWriteQueue;
    if (!target.current()) return;
    if (todoistTitleDrafts.has(target.taskId)) throw new Error("请先保存标题和描述草稿，再添加图片。");
    const originalDescription = todoistInspectorState.description || "";
    if (!target.taskId || todoistInspectorState.saving) throw new Error("任务未选中或正在保存，请稍后重试。");
    todoistInspectorState.saving = true;
    try {
      const fileName = file.name || `截图_${Date.now()}.png`;
      let finalUrl = "";

      try {
        const uploaded = await todoistService.uploadFile(file, fileName);
        if (uploaded && uploaded.file_url) {
          finalUrl = uploaded.file_url;
        }
      } catch (uploadErr: any) {
        console.warn("[Todoist Inspector] Cloud upload failed, falling back to local base64:", uploadErr);
        // 如果文件小于 2.5MB，转为 Data URL 存储，保证绝对可用
        if (file.size <= 2.5 * 1024 * 1024) {
          finalUrl = await fileToDataUrl(file);
        } else {
          throw new Error(uploadErr?.message || "云端上传失败且文件超过2.5MB");
        }
      }

      if (finalUrl) {
        const nextDesc = originalDescription ? `${originalDescription}\n\n![${fileName}](${finalUrl})` : `![${fileName}](${finalUrl})`;
        await todoistService.updateTask(target.taskId, {
          description: nextDesc
        });
        if (target.current()) todoistInspectorState.description = nextDesc;
        // 同步更新提交时的看板卡片。
        for (const col of todoistTaskListState.columns) {
          const found = col.tasks.find((t) => String(t.id) === target.taskId);
          if (found) {
            found.description = nextDesc;
            if (found._taskRaw) found._taskRaw.description = nextDesc;
            break;
          }
        }
        todoistTaskListController.dispatch("refresh");
      }
    } catch (err: any) {
      if (target.current()) todoistInspectorState.error = err.message || "上传图片失败";
      if (typeof window !== "undefined") {
        const win = window as any;
        win.LogicWeaverNotifications?.fetch?.("Todoist", `添加图片失败: ${err.message}`);
      }
    } finally {
      todoistInspectorState.saving = false;
    }
  }
};

export const todoistInspectorController = trackTodoistWrites(inspectorController, [
  "saveTitleAndDesc", "attachImageToTask", "setStartDateAndTime", "setDueDateAndTime"
]);
