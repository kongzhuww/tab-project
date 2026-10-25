<template>
  <aside
    ref="panelRef"
    class="todoist-inspector-window"
    :style="initialStyle"
    aria-label="Todoist 任务属性独立窗口"
    v-show="state.isOpen"
    @paste="onDrawerGlobalPaste"
  >
    <header ref="headerRef" class="inspector-header" @pointerdown="onHeaderPointerDown($event)">
      <div class="inspector-title-row">
        <span class="inspector-badge">📋 任务属性</span>
        <div v-if="currentDraft" class="inspector-save-status no-drag" @pointerdown.stop>
          <span class="inspector-save-text" role="status" aria-live="polite"
            :title="draftStatusDetail" :aria-label="draftStatusDetail">{{ draftStatusText }}</span>
          <button v-if="currentDraft.status !== 'saving'" type="button"
            :disabled="state.saving || !editTitle.trim()" @click.stop="retryDraft"
          >{{ currentDraft.status === 'failed' ? '重试保存' : '保存草稿' }}</button>
        </div>
        <a
          v-if="state.url"
          :href="state.url"
          target="_blank"
          rel="noreferrer"
          class="inspector-external-link"
          title="在 Todoist 官方网页中打开"
        >在 Todoist 中打开 ↗</a>
      </div>
      <button
        type="button"
        class="inspector-close-btn no-drag"
        aria-label="收起拓展栏"
        title="关闭浮窗 (Esc)"
        @pointerdown.stop
        @click.stop="onClose"
      >×</button>
    </header>

    <TodoistInspectorBody
      v-if="state.isOpen"
      :key="state.taskId"
      :state="state"
      v-model:edit-title="editTitle"
      v-model:edit-description="editDescription"
      v-model:edit-start-date="editStartDate"
      v-model:edit-start-time="editStartTime"
      v-model:edit-due-date="editDueDate"
      v-model:edit-due-time="editDueTime"
      :is-uploading-img="isUploadingImg"
      :is-drag-over="isDragOver"
      :is-task-completed="isTaskCompleted"
      :subtasks="subtasks"
      :completed-subtasks-count="completedSubtasksCount"
      v-model:is-adding-subtask="isAddingSubtask"
      v-model:new-subtask-text="newSubtaskText"
      v-model:new-comment-text="newCommentText"
      :is-submitting-comment="isSubmittingComment"
      :attached-images="attachedImages"
      :available-labels="todoistTaskListState.availableLabels || []"
      @schedule-draft-save="scheduleDraftSave"
      @save-title-and-desc="saveTitleAndDesc"
      @toggle-complete="toggleTaskComplete"
      @trigger-file-input="triggerFileInput"
      @dragover="isDragOver = true"
      @dragleave="isDragOver = false"
      @drop-image="onDropImage"
      @desc-paste="onDescPaste"
      @remove-attached-image="removeAttachedImage"
      @toggle-subtask="toggleSubtask"
      @remove-subtask="removeSubtask"
      @confirm-add-subtask="confirmAddSubtask"
      @submit-comment="submitComment"
      @start-change="onStartChange"
      @clear-start-date="clearStartDate"
      @clear-start-time="clearStartTime"
      @due-change="onDueChange"
      @clear-due-date="clearDueDate"
      @clear-due-time="clearDueTime"
      @select-priority="selectPriority"
      @toggle-label-select="toggleLabelSelect"
      @remove-label="removeLabel"
      @create-label="createOrSelectLabel"
    />

    <input
      ref="fileInputRef"
      type="file"
      accept="image/*"
      style="display: none"
      @change="onFileInputChange"
    />

    <!-- 窗口四向缩放手柄 -->
    <i class="todoist-resize-handle todoist-resize-n" data-resize-edge="n" aria-hidden="true" @pointerdown="onResizePointerDown($event, 'n')"></i>
    <i class="todoist-resize-handle todoist-resize-e" data-resize-edge="e" aria-hidden="true" @pointerdown="onResizePointerDown($event, 'e')"></i>
    <i class="todoist-resize-handle todoist-resize-s" data-resize-edge="s" aria-hidden="true" @pointerdown="onResizePointerDown($event, 's')"></i>
    <i class="todoist-resize-handle todoist-resize-w" data-resize-edge="w" aria-hidden="true" @pointerdown="onResizePointerDown($event, 'w')"></i>
  </aside>
</template>

<script setup lang="ts">
import { ref, computed, watch, onUnmounted } from "vue";
import { todoistModuleState } from "./module-state";
import { todoistInspectorState, todoistInspectorController } from "./inspector-store";
import { todoistTaskListController, todoistTaskListState } from "./task-list-store";
import { todoistService } from "../services/todoist.service";
import { todoistTitleDrafts } from "./title-drafts";
import { useWindowDraggable } from "../core/useWindowDraggable";
import TodoistInspectorBody from "./TodoistInspectorBody.vue";

const state = todoistInspectorState;
const currentDraft = computed(() => todoistTitleDrafts.get(state.taskId));
const draftStatusText = computed(() => {
  if (currentDraft.value?.status === "failed") return "保存未确认";
  if (currentDraft.value?.status === "saving") return "正在保存…";
  return editTitle.value.trim() ? "有未保存的修改" : "标题不能为空，尚未保存";
});
const draftStatusDetail = computed(() => [
  draftStatusText.value,
  currentDraft.value?.status === "failed" ? currentDraft.value.error : "",
  "刷新或关闭浏览器标签页会丢失未保存草稿。"
].filter(Boolean).join("；"));

const INSPECTOR_POSITION_KEY = "todoistInspectorPositionV2";

const {
  panelRef,
  headerRef,
  initialStyle,
  stopInteractions,
  onHeaderPointerDown,
  onResizePointerDown,
  bringToFront
} = useWindowDraggable({
  windowId: "todoist-inspector",
  storageKey: INSPECTOR_POSITION_KEY,
  defaultWidth: 720,
  defaultHeight: 480,
  defaultLeft: typeof window !== "undefined" ? Math.max(16, window.innerWidth - 760) : 700,
  defaultTop: 76,
  minWidth: 340,
  minHeight: 300,
  active: () => state.isOpen && todoistModuleState.active
});

const editTitle = ref("");
const editDescription = ref("");

// 时间规划状态 (日期 + 具体时间，如 12:00)
const editStartDate = ref("");
const editStartTime = ref("");
const editDueDate = ref("");
const editDueTime = ref("");

const isUploadingImg = ref(false);
const isDragOver = ref(false);
const fileInputRef = ref<HTMLInputElement | null>(null);

// 子任务管理 (存储在任务 description 中的 Markdown 检查清单 - [ ] / - [x])
interface LocalSubtask {
  id: string;
  text: string;
  completed: boolean;
}

const isAddingSubtask = ref(false);
const newSubtaskText = ref("");
const newCommentText = ref("");
const isSubmittingComment = ref(false);

const subtasks = computed<LocalSubtask[]>(() => {
  const raw = state.description || "";
  const list: LocalSubtask[] = [];
  const lines = raw.split("\n");
  let idx = 0;
  for (const line of lines) {
    const match = line.match(/^\s*-\s*\[([ xX])\]\s+(.+)$/);
    if (match) {
      list.push({
        id: `st_${idx++}`,
        completed: match[1].toLowerCase() === "x",
        text: match[2].trim()
      });
    }
  }
  return list;
});

const completedSubtasksCount = computed(() => subtasks.value.filter(s => s.completed).length);

function updateSubtasksInDescription(newSubtasks: LocalSubtask[]) {
  const raw = state.description || "";
  const lines = raw.split("\n");
  const nonSubtaskLines = lines.filter(l => !l.match(/^\s*-\s*\[([ xX])\]/));
  const subtaskLines = newSubtasks.map(s => `- [${s.completed ? 'x' : ' '}] ${s.text}`);
  const finalDesc = [...nonSubtaskLines, ...subtaskLines].join("\n").trim();
  editDescription.value = finalDesc.replace(/!\[.*?\]\((?:https?:\/\/|data:image\/)[^\s\)]+\)/g, "").trim();
  void todoistInspectorController.saveTitleAndDesc(editTitle.value, finalDesc);
}

function confirmAddSubtask() {
  if (!newSubtaskText.value.trim()) return;
  const list = [...subtasks.value, {
    id: `st_${Date.now()}`,
    text: newSubtaskText.value.trim(),
    completed: false
  }];
  newSubtaskText.value = "";
  isAddingSubtask.value = false;
  updateSubtasksInDescription(list);
}

function toggleSubtask(id: string) {
  const list = subtasks.value.map(s => s.id === id ? { ...s, completed: !s.completed } : s);
  updateSubtasksInDescription(list);
}

function removeSubtask(id: string) {
  const list = subtasks.value.filter(s => s.id !== id);
  updateSubtasksInDescription(list);
}

// 任务完成状态与看板联动
const isTaskCompleted = computed(() => {
  for (const col of todoistTaskListState.columns || []) {
    const t = col.tasks.find(item => item.id === state.taskId);
    if (t) return !!t.completed;
  }
  return false;
});

async function toggleTaskComplete() {
  for (const col of todoistTaskListState.columns || []) {
    const t = col.tasks.find(item => item.id === state.taskId);
    if (t) {
      const nextCompleted = !t.completed;
      t.completed = nextCompleted;
      if (t._taskRaw) t._taskRaw.checked = nextCompleted;
      try {
        await todoistService.toggleTaskCompletion(t.id, nextCompleted);

      } catch {
        t.completed = !nextCompleted;
        if (t._taskRaw) t._taskRaw.checked = !nextCompleted;
        state.error = "完成状态保存未确认，请刷新核对。";
      }
      break;
    }
  }
}

// 优先级
function selectPriority(level: number) {
  void todoistInspectorController.setPriority(level);
}

// 标签
function toggleLabelSelect(label: string) {
  void todoistInspectorController.toggleLabel(label);
}

function removeLabel(label: string) {
  void todoistInspectorController.toggleLabel(label);
}

async function createOrSelectLabel(name: string) {
  if (!name.trim()) return;
  if (!state.labels.includes(name.trim())) {
    await todoistInspectorController.createAndAttachLabel(name.trim());
  }
}

// 评论提交
async function submitComment() {
  if (!newCommentText.value.trim() || isSubmittingComment.value) return;
  const content = newCommentText.value.trim();
  isSubmittingComment.value = true;
  try {
    await todoistInspectorController.addComment(content);
    newCommentText.value = "";
  } finally {
    isSubmittingComment.value = false;
  }
}

// Updating a title must not reset an independently edited description.
watch(() => state.title, title => { editTitle.value = title || ""; }, { immediate: true });
watch(() => state.description, description => {
  editDescription.value = (description || "").replace(/!\[.*?\]\((?:https?:\/\/|data:image\/)[^\s\)]+\)/g, "").trim();
}, { immediate: true });

watch(() => state.startDate, d => { editStartDate.value = d || ""; }, { immediate: true });
watch(() => state.startTime, t => { editStartTime.value = t || ""; }, { immediate: true });
watch(() => state.dueDate, d => { editDueDate.value = d || ""; }, { immediate: true });
watch(() => state.dueTime, t => { editDueTime.value = t || ""; }, { immediate: true });

function getTodayDateStr(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}

function onStartChange() {
  if (editStartTime.value && !editStartDate.value) {
    editStartDate.value = getTodayDateStr();
  }
  void todoistInspectorController.setStartDateAndTime(editStartDate.value, editStartTime.value);
}

function clearStartTime() {
  editStartTime.value = "";
  onStartChange();
}

function clearStartDate() {
  editStartDate.value = "";
  editStartTime.value = "";
  onStartChange();
}

function onDueChange() {
  if (editDueTime.value && !editDueDate.value) {
    editDueDate.value = getTodayDateStr();
  }
  void todoistInspectorController.setDueDateAndTime(editDueDate.value, editDueTime.value);
}

function clearDueTime() {
  editDueTime.value = "";
  onDueChange();
}

function clearDueDate() {
  editDueDate.value = "";
  editDueTime.value = "";
  onDueChange();
}

// 提取当前任务中所有关联的图片
const attachedImages = computed(() => {
  const list: Array<{ url: string; name: string }> = [];
  const seenUrls = new Set<string>();
  const raw = state.description || "";
  const regex = /!\[([^\]]*)\]\(((?:https?:\/\/|data:image\/)[^\s\)]+)\)/g;
  let match;
  while ((match = regex.exec(raw)) !== null) {
    const url = match[2];
    seenUrls.add(url);
    list.push({
      name: match[1] || "任务照片",
      url
    });
  }
  for (const ca of state.commentAttachments || []) {
    if (!seenUrls.has(ca.url)) {
      seenUrls.add(ca.url);
      list.push(ca);
    }
  }
  return list;
});

let titleDebounceTimer: ReturnType<typeof setTimeout> | undefined;
let pendingDraft: { taskId: string; title: string; description: string } | undefined;

function captureDraft() {
  const imgMarkdown = (state.description.match(/!\[.*?\]\((?:https?:\/\/|data:image\/)[^\s\)]+\)/g) || []).join("\n\n");
  const parts = [editDescription.value.trim(), imgMarkdown].filter(Boolean);
  return {
    taskId: state.taskId,
    title: editTitle.value,
    description: parts.join("\n\n")
  };
}

function flushDraft() {
  clearTimeout(titleDebounceTimer);
  titleDebounceTimer = undefined;
  const draft = pendingDraft;
  pendingDraft = undefined;
  if (draft?.taskId && draft.title.trim()) {
    return todoistInspectorController.saveTitleAndDesc(draft.title, draft.description, draft.taskId);
  }
}

function scheduleDraftSave(event?: Event) {
  if (event && 'isComposing' in event && event.isComposing) return;
  pendingDraft = captureDraft();
  todoistInspectorController.stageTitleDraft(pendingDraft.taskId, pendingDraft.title, pendingDraft.description);
  clearTimeout(titleDebounceTimer);
  titleDebounceTimer = setTimeout(flushDraft, 800);
}

watch(() => state.taskId, () => flushDraft(), { flush: "sync" });

function onClose() {
  flushDraft();
  todoistInspectorController.close();
}

function saveTitleAndDesc(event?: Event) {
  if (event && 'isComposing' in event && event.isComposing) return;
  flushDraft();
}

function retryDraft() {
  pendingDraft = captureDraft();
  flushDraft();
}

function onDescPaste(e: ClipboardEvent) {
  const file = extractImageFromClipboard(e);
  if (file) {
    e.preventDefault();
    e.stopPropagation();
    void handlePastedImage(file);
  }
}

function triggerFileInput() {
  if (!todoistModuleState.active) return;
  fileInputRef.value?.click();
}

async function onFileInputChange(e: Event) {
  const target = e.target as HTMLInputElement;
  if (!todoistModuleState.active) { target.value = ""; return; }
  const file = target.files?.[0];
  if (file) await handlePastedImage(file);
  target.value = "";
}

async function onDropImage(e: DragEvent) {
  isDragOver.value = false;
  const file = e.dataTransfer?.files?.[0];
  if (file && (file.type.startsWith("image/") || /\.(png|jpe?g|gif|webp|bmp)$/i.test(file.name))) {
    await handlePastedImage(file);
  }
}

function extractImageFromClipboard(e: ClipboardEvent): File | null {
  const dt = e.clipboardData;
  if (!dt) return null;

  if (dt.files && dt.files.length > 0) {
    for (let i = 0; i < dt.files.length; i++) {
      const f = dt.files[i];
      if (f.type.startsWith("image/") || /\.(png|jpe?g|gif|webp|bmp|svg)$/i.test(f.name)) {
        return f;
      }
    }
  }

  if (dt.items && dt.items.length > 0) {
    for (let i = 0; i < dt.items.length; i++) {
      const item = dt.items[i];
      if (item.type.includes("image")) {
        const file = item.getAsFile();
        if (file) return file;
      }
    }
  }

  return null;
}

async function handlePastedImage(file: File) {
  if (isUploadingImg.value || !todoistModuleState.active || !state.taskId) return;
  const taskId = state.taskId;
  isUploadingImg.value = true;
  try {
    await flushDraft();
    if (state.taskId !== taskId || !state.isOpen || !todoistModuleState.active) return;
    await todoistInspectorController.attachImageToTask(file);
  } catch (error: unknown) {
    if (state.taskId === taskId) state.error = error instanceof Error ? error.message : "上传失败";
  } finally {
    isUploadingImg.value = false;
  }
}

function onDrawerGlobalPaste(e: ClipboardEvent) {
  const file = extractImageFromClipboard(e);
  if (file) {
    e.preventDefault();
    void handlePastedImage(file);
  }
}

function onGlobalWindowPaste(e: ClipboardEvent) {
  if (!state.isOpen || !todoistModuleState.active) return;
  const file = extractImageFromClipboard(e);
  if (file) {
    e.preventDefault();
    e.stopPropagation();
    void handlePastedImage(file);
  }
}

watch(() => todoistModuleState.active, active => {
  window.removeEventListener("paste", onGlobalWindowPaste, { capture: true });
  if (active) window.addEventListener("paste", onGlobalWindowPaste, { capture: true });
}, { immediate: true, flush: "sync" });

onUnmounted(() => {
  flushDraft();
  window.removeEventListener("paste", onGlobalWindowPaste, { capture: true });
});

async function removeAttachedImage(url: string) {
  const raw = state.description || "";
  const escapedUrl = url.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const nextDesc = raw
    .replace(new RegExp(`!\\[[^\\]]*\\]\\(${escapedUrl}\\)`, "g"), "")
    .trim();
  await todoistInspectorController.saveTitleAndDesc(state.title, nextDesc);
}
</script>

<style scoped src="./inspector-window.css"></style>
