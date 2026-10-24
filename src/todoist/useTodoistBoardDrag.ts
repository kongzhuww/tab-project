import { ref, shallowRef, watch, onUnmounted } from "vue";
import type { TodoistColumnItem, TodoistTaskItem, TodoistTaskListState } from "./task-list-store";

interface BoardDragOptions {
  state: TodoistTaskListState;
  isActive: () => boolean;
  editingTaskId: () => string | null;
  closePopovers: () => void;
  moveTask: (taskId: string, target: { projectId?: string; sectionId?: string; dueDate?: string }, beforeTaskId?: string) => Promise<boolean>;
  dropLabel: (task: TodoistTaskItem, label: string) => void;
}

/** UI gesture/slot ownership only. Persistence and label writes remain with the caller. */
export function useTodoistBoardDrag(options: BoardDragOptions) {
  const state = options.state;
  const draggingTaskId = ref<string | null>(null);
  const dragOverColIndex = ref<number | null>(null);
  const dragOverTaskId = ref<string | null>(null);
  const dragAfterTask = ref(false);
  const dragPreviewTask = shallowRef<TodoistTaskItem | null>(null);
  const previewBeforeId = ref<string | undefined>();
  // Snapshot logical slots before inserting any preview. Animated rows cannot move these boundaries.
  const dragHitLayouts = new Map<TodoistColumnItem, {
    list: HTMLElement; rows: Array<{ id: string; middle: number }>;
    read: () => Array<{ id: string; middle: number }>;
    snapshot: Array<{ id: string; middle: number }>;
  }>();
  function captureDragSlots(card: HTMLElement): void {
    dragHitLayouts.clear();
    const board = card.closest(".todoist-board");
    if (!board) return;
    for (const list of board.querySelectorAll<HTMLElement>(".todoist-board-list")) {
      const col = state.columns[Number(list.dataset.groupIndex)];
      if (!col) continue;
      const slots = (list as HTMLElement & { __todoistSlots?: () => Array<{ id: string; middle: number }> }).__todoistSlots;
      if (!slots) continue;
      const snapshot = slots();
      const rows = snapshot.filter(row => row.id !== dragSourceTask?.id);
      dragHitLayouts.set(col, { list, rows, read: slots, snapshot });
    }
  }
  let previewFrame = 0;
  let pendingPreview: { clientY: number; col: TodoistColumnItem } | undefined;
  function schedulePreview(event: DragEvent, col: TodoistColumnItem) {
    pendingPreview = { clientY: event.clientY, col };
    if (previewFrame) return;
    previewFrame = requestAnimationFrame(() => {
      previewFrame = 0;
      const pending = pendingPreview; pendingPreview = undefined;
      if (pending) updateDragPreview(pending, pending.col);
    });
  }
  function updateDragPreview(event: { clientY: number }, col: TodoistColumnItem): void {
    if (!dragSourceTask || state.movingTaskId) return;
    const layout = dragHitLayouts.get(col);
    if (!layout) return;
    const snapshot = layout.read();
    if (snapshot !== layout.snapshot) {
      layout.snapshot = snapshot;
      layout.rows = snapshot.filter(row => row.id !== dragSourceTask?.id);
    }
    const y = event.clientY - layout.list.getBoundingClientRect().top + layout.list.scrollTop;
    let lo = 0, hi = layout.rows.length;
    while (lo < hi) {
      const mid = (lo + hi) >>> 1;
      if (y < layout.rows[mid].middle) hi = mid; else lo = mid + 1;
    }
    let slot = lo;
    if (dragOverColIndex.value === state.columns.indexOf(col)) {
      const current = previewBeforeId.value
        ? layout.rows.findIndex(row => row.id === previewBeforeId.value) : layout.rows.length;
      // Small pointer noise near a boundary must not switch the preview back and forth.
      if (current >= 0 && slot > current && y < layout.rows[current].middle + 10) slot = current;
      if (current > 0 && slot < current && y > layout.rows[current - 1].middle - 10) slot = current;
    }
    const before = layout.rows[slot]?.id;
    previewAt(col, before);
    if (dragOverColIndex.value === state.columns.indexOf(col)) {
      dragOverTaskId.value = before || layout.rows[layout.rows.length - 1]?.id || null;
      dragAfterTask.value = !before;
    }
  }
  function isDragPreview(task: TodoistTaskItem): boolean { return task === dragPreviewTask.value; }
  function previewTasks(col: TodoistColumnItem, index: number): TodoistTaskItem[] {
    if (index !== dragOverColIndex.value || !dragPreviewTask.value) return col.tasks;
    const rows = [...col.tasks];
    const before = previewBeforeId.value ? rows.findIndex(task => task.id === previewBeforeId.value) : -1;
    rows.splice(before < 0 ? rows.length : before, 0, dragPreviewTask.value);
    return rows;
  }
  function previewAt(col: TodoistColumnItem, beforeId?: string): void {
    if (!dragSourceTask || !dragSourceCol) return;
    if (state.view === "today" && col.sectionId === "overdue" && dragSourceCol.sectionId !== "overdue") {
      dragOverColIndex.value = null; return;
    }
    const anchor = beforeId ? col.tasks.find(task => task.id === beforeId) : undefined;
    const parent = col === dragSourceCol ? String(dragSourceTask._taskRaw?.parent_id || "") : "";
    if (anchor && state.view !== "today" && String(anchor._taskRaw?.parent_id || "") !== parent) {
      dragOverColIndex.value = null; return;
    }
    const index = state.columns.indexOf(col);
    if (index < 0) return;
    previewBeforeId.value = beforeId;
    dragOverColIndex.value = index;
  }
  let dragSourceTask: TodoistTaskItem | null = null;
  let dragSourceCol: TodoistColumnItem | null = null;
  function onTaskDragStart(event: DragEvent, task: TodoistTaskItem, col: TodoistColumnItem, _index: number) {
    if (!options.isActive() || state.loading || state.movingTaskId || state.moveNeedsRefresh || task.completed ||
        task.id.startsWith("optimistic-") || options.editingTaskId() === task.id) {
      event.preventDefault(); return;
    }
    event.stopPropagation();
    options.closePopovers();
    draggingTaskId.value = task.id; dragSourceTask = task; dragSourceCol = col;
    dragPreviewTask.value = { ...task };
    captureDragSlots(event.currentTarget as HTMLElement);
    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = "move";
      const card = event.currentTarget as HTMLElement;
      const rect = card.getBoundingClientRect();
      // Keep the drag image grabbed at the exact pointer offset; the browser composites it.
      event.dataTransfer.setDragImage(card, Math.max(0, Math.min(rect.width, event.clientX - rect.left)),
        Math.max(0, Math.min(rect.height, event.clientY - rect.top)));
      event.dataTransfer.clearData();
      event.dataTransfer.setData("application/x-todoist-task-id", task.id);
      event.dataTransfer.setData("application/x-logicweaver-todoist-task", task.id);
      event.dataTransfer.setData("application/x-todoist-task", JSON.stringify({ taskId: task.id, sectionId: col.sectionId }));
    }
  }

  function onTaskDragEnd() {
    cancelAnimationFrame(previewFrame); previewFrame = 0; pendingPreview = undefined;
    draggingTaskId.value = null; dragOverColIndex.value = null;
    dragOverTaskId.value = null; dragAfterTask.value = false;
    dragSourceTask = null; dragSourceCol = null;
    dragPreviewTask.value = null; previewBeforeId.value = undefined;
    dragHitLayouts.clear();
  }

  function onColDragOver(event: DragEvent, colIndex: number) {
    if (!dragSourceTask || state.movingTaskId) return;
    event.preventDefault(); event.stopPropagation();
    if (event.dataTransfer) event.dataTransfer.dropEffect = "move";
    schedulePreview(event, state.columns[colIndex]);
  }

  function onColDragLeave(event: DragEvent, _colIndex: number) {
    if ((event.currentTarget as HTMLElement)?.contains(event.relatedTarget as Node | null)) return;
    // Keep the last valid slot until another column is entered or the gesture ends.
    // Layout-driven dragleave must not remove/reinsert the preview on a stationary pointer.
  }

  function onTaskDragOver(event: DragEvent, _task: TodoistTaskItem, col: TodoistColumnItem, _index: number) {
    if (event.dataTransfer) event.dataTransfer.dropEffect = "move";
    schedulePreview(event, col);
  }

  async function dropTask(targetCol: TodoistColumnItem, beforeTaskId?: string) {
    if (pendingPreview && pendingPreview.col === targetCol) {
      updateDragPreview(pendingPreview, pendingPreview.col);
      beforeTaskId = previewBeforeId.value;
    }
    const source = dragSourceTask, from = dragSourceCol;
    onTaskDragEnd();
    if (!source || !from || !options.isActive() || state.movingTaskId) return;
    if (state.view === "today") {
      if (targetCol.sectionId === "today" && from.sectionId !== "today") {
        await options.moveTask(source.id, { dueDate: new Date().toLocaleDateString("en-CA") }, beforeTaskId);
      } else {
        await options.moveTask(source.id, { sectionId: targetCol.sectionId }, beforeTaskId);
      }
    } else {
      await options.moveTask(source.id, {
        projectId: targetCol.projectId, sectionId: targetCol.sectionId
      }, beforeTaskId);
    }
  }

  async function onTaskDrop(event: DragEvent, targetTask: TodoistTaskItem, targetCol: TodoistColumnItem, _targetIndex: number) {
    event.preventDefault();
    // 1. 处理标签拖放到任务卡片
    const labelData = event.dataTransfer?.getData("application/x-todoist-label") ||
      (event.dataTransfer?.getData("text/plain")?.startsWith("label:") ? event.dataTransfer.getData("text/plain").slice(6) : "");
    if (labelData) {
      options.dropLabel(targetTask, labelData);
      return;
    }


    if (dragOverColIndex.value === state.columns.indexOf(targetCol)) {
      await dropTask(targetCol, previewBeforeId.value); return;
    }
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    const after = event.clientY >= rect.top + rect.height / 2;
    const remaining = targetCol.tasks.filter(task => task.id !== dragSourceTask?.id);
    const index = remaining.findIndex(task => task.id === targetTask.id);
    const before = targetTask.id === dragSourceTask?.id ? targetTask.id
      : after ? remaining[index + 1]?.id : targetTask.id;
    await dropTask(targetCol, before);
  }

  async function onColDrop(event: DragEvent, targetCol: TodoistColumnItem) {
    event.preventDefault(); event.stopPropagation();
    await dropTask(targetCol, dragOverColIndex.value === state.columns.indexOf(targetCol) ? previewBeforeId.value : undefined);
  }


  watch(() => [state.view, state.activeProjectId], () => onTaskDragEnd());
  watch(() => state.columns, columns => {
    if (dragSourceCol && !columns.includes(dragSourceCol)) onTaskDragEnd();
  });
  watch(options.isActive, active => {
    if (!active) onTaskDragEnd();
  }, { immediate: true, flush: "sync" });
  onUnmounted(onTaskDragEnd);

  return {
    draggingTaskId, dragOverColIndex, dragOverTaskId, dragAfterTask,
    isDragPreview, previewTasks, onTaskDragStart, onTaskDragEnd,
    onColDragOver, onColDragLeave, onTaskDragOver, onTaskDrop, onColDrop
  };
}
