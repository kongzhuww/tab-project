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

    <div v-if="state.isOpen" class="inspector-body">
      <div v-if="currentDraft" class="draft-status" role="status" aria-live="polite">
        <template v-if="currentDraft.status === 'failed'">
          <span>保存未确认，草稿保留在当前页面。{{ currentDraft.error }}</span>
          <button type="button" :disabled="state.saving || !editTitle.trim()" @click="retryDraft">重试保存</button>
        </template>
        <span v-else>{{ currentDraft.status === 'saving' ? '正在保存…' : (editTitle.trim() ? '有未保存的修改' : '标题不能为空，尚未保存') }}</span>
        <button v-if="currentDraft.status === 'editing'" type="button" :disabled="state.saving || !editTitle.trim()" @click="retryDraft">保存草稿</button>
        <small>刷新或关闭浏览器标签页会丢失未保存草稿。</small>
      </div>
      <p v-if="state.error" class="draft-status" role="alert">{{ state.error }}</p>

      <!-- 1. 任务标题 -->
      <section class="inspector-section">
        <label class="inspector-label">任务标题</label>
        <input
          v-model="editTitle"
          :disabled="isUploadingImg"
          type="text"
          class="inspector-input-title"
          placeholder="任务标题"
          @input="scheduleDraftSave"
          @compositionend="scheduleDraftSave"
          @blur="saveTitleAndDesc"
          @keydown.enter.prevent="saveTitleAndDesc"
        />
      </section>

      <!-- 2. 任务描述与照片一体区 (支持文本说明 + 拖入图片 + 文本框内 Ctrl+V 粘贴图片) -->
      <section class="inspector-section">
        <div class="section-head-row">
          <label class="inspector-label">
            任务描述
            <span v-if="attachedImages.length" style="font-weight: normal; opacity: 0.85;">
              · 包含 {{ attachedImages.length }} 张照片
            </span>
          </label>
          <button
            type="button"
            class="inspector-add-img-btn"
            title="选择本地图片文件上传至任务"
            @click="triggerFileInput"
          >＋ 上传照片</button>
        </div>

        <!-- 统一的图文一体卡片：支持拖拽图片进入、在文本框内直接 Ctrl+V 粘贴图片 -->
        <div
          class="inspector-desc-composite-box"
          :class="{ dragging: isDragOver, uploading: isUploadingImg }"
          @dragover.prevent="isDragOver = true"
          @dragleave.prevent="isDragOver = false"
          @drop.prevent="onDropImage"
        >
          <textarea
            v-model="editDescription"
            :disabled="isUploadingImg"
            rows="8"
            class="inspector-textarea-desc"
            placeholder="添加文字说明…（直接拖入照片，或在此 Ctrl+V 粘贴图片即可贴入）"
            @input="scheduleDraftSave"
            @compositionend="scheduleDraftSave"
            @blur="saveTitleAndDesc"
            @paste="onDescPaste"
          ></textarea>

          <!-- 已有关联照片网格：无缝贴合在描述框内部底端 -->
          <div v-if="attachedImages.length > 0" class="attached-img-grid in-desc">
            <div
              v-for="(img, idx) in attachedImages"
              :key="idx"
              class="attached-img-card"
            >
              <div
                class="attached-img-link"
                title="点击在小窗查看大图"
                @click="imageViewerController.open(img.url, img.name)"
              >
                <img :src="img.url" class="attached-preview-img" alt="任务照片" loading="lazy" />
              </div>
              <div class="attached-img-info">
                <span class="attached-img-name" :title="img.name">{{ img.name }}</span>
                <div class="attached-img-actions">
                  <button
                    type="button"
                    class="attached-open-btn"
                    title="点击在小窗查看大图"
                    @click="imageViewerController.open(img.url, img.name)"
                  >查看 ↗</button>
                  <button
                    type="button"
                    class="attached-del-btn"
                    title="从任务中移除此照片"
                    @click="removeAttachedImage(img.url)"
                  >×</button>
                </div>
              </div>
            </div>
          </div>

          <!-- 底部轻量提示条与回形针快捷上传 -->
          <div class="desc-composite-footer">
            <span v-if="isUploadingImg" class="composite-hint uploading">⏳ 照片上传同步中…</span>
            <span v-else-if="isDragOver" class="composite-hint dragging">📥 松开鼠标立即存入照片</span>
            <span v-else class="composite-hint">📷 拖入图片或按 Ctrl+V 粘贴照片</span>
            <button
              type="button"
              class="composite-attach-icon"
              title="选择本地照片"
              @click.stop="triggerFileInput"
            >📎</button>
          </div>
        </div>

        <!-- 隐藏的本地文件选择器 -->
        <input
          ref="fileInputRef"
          type="file"
          accept="image/*"
          style="display: none"
          @change="onFileInputChange"
        />
      </section>

      <!-- 3. 时间规划中心：支持具体时间 (如 12:00)，支持仅开始(绿)/仅截止(红)/区间段 -->
      <section class="inspector-section inspector-time-hub">
        <div class="section-head-row">
          <div class="hub-header-title">
            <label class="inspector-label">时间规划</label>
            <span v-if="timePlanSummaryText" class="time-plan-badge" :class="timePlanStatusClass">
              {{ timePlanSummaryText }}
            </span>
          </div>
          <button
            v-if="editStartDate || editDueDate"
            type="button"
            class="inspector-clear-all-dates-btn"
            title="清空全部时间设置"
            @click="clearAllDates"
          >
            清空时间
          </button>
        </div>

        <!-- 开始时间与截止时间并排卡片 -->
        <div class="time-hub-cards-row">
          <!-- 开始时间卡片 (左) -->
          <div class="time-hub-card start-card">
            <div class="time-card-head">
              <span class="time-card-label">🛫 开始时间</span>
              <button
                v-if="editStartDate || editStartTime"
                type="button"
                class="time-clear-btn"
                title="清除开始时间"
                @click="clearStartDate"
              >✕</button>
            </div>

            <div class="time-card-inputs">
              <input
                v-model="editStartDate"
                type="date"
                class="inspector-date-input"
                title="选择开始日期"
                @change="onStartChange"
              />
              <div class="time-input-wrap">
                <input
                  v-model="editStartTime"
                  type="time"
                  class="inspector-time-input"
                  placeholder="具体时间"
                  title="随时设置具体时间 (如 12:00)"
                  @change="onStartChange"
                />
                <button
                  v-if="editStartTime"
                  type="button"
                  class="time-sub-clear"
                  title="清除具体时间"
                  @click="clearStartTime"
                >×</button>
              </div>
            </div>
          </div>

          <!-- 中间连接箭头 -->
          <div class="time-hub-arrow">至</div>

          <!-- 截止时间卡片 (右) -->
          <div class="time-hub-card due-card">
            <div class="time-card-head">
              <span class="time-card-label">▣ 截止日期</span>
              <button
                v-if="editDueDate || editDueTime"
                type="button"
                class="time-clear-btn"
                title="清除截止时间"
                @click="clearDueDate"
              >✕</button>
            </div>

            <div class="time-card-inputs">
              <input
                v-model="editDueDate"
                type="date"
                class="inspector-date-input"
                title="选择截止日期"
                @change="onDueChange"
              />
              <div class="time-input-wrap">
                <input
                  v-model="editDueTime"
                  type="time"
                  class="inspector-time-input"
                  placeholder="具体时间"
                  title="随时设置具体时间 (如 12:00)"
                  @change="onDueChange"
                />
                <button
                  v-if="editDueTime"
                  type="button"
                  class="time-sub-clear"
                  title="清除具体时间"
                  @click="clearDueTime"
                >×</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

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
import { imageViewerController } from "../viewers/image-viewer-store";
import { todoistInspectorState, todoistInspectorController } from "./inspector-store";
import { todoistTitleDrafts } from "./title-drafts";
import { formatMonthDayTime } from "./task-date-helper";
import { useWindowDraggable } from "../core/useWindowDraggable";
import { windowManagerController } from "../core/window-manager.store";

const state = todoistInspectorState;
const currentDraft = computed(() => todoistTitleDrafts.get(state.taskId));

const INSPECTOR_POSITION_KEY = "todoistInspectorPosition";

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
  defaultWidth: 400,
  defaultHeight: 620,
  defaultLeft: typeof window !== "undefined" ? Math.max(16, window.innerWidth - 440) : 960,
  defaultTop: 76,
  minWidth: 320,
  minHeight: 360,
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

// Updating a title must not reset an independently edited description.
watch(() => state.title, title => { editTitle.value = title || ""; }, { immediate: true });
watch(() => state.description, description => {
  editDescription.value = (description || "").replace(/!\[.*?\]\((?:https?:\/\/|data:image\/)[^\s\)]+\)/g, "").trim();
}, { immediate: true });

watch(() => state.startDate, d => { editStartDate.value = d || ""; }, { immediate: true });
watch(() => state.startTime, t => { editStartTime.value = t || ""; }, { immediate: true });
watch(() => state.dueDate, d => { editDueDate.value = d || ""; }, { immediate: true });
watch(() => state.dueTime, t => { editDueTime.value = t || ""; }, { immediate: true });

// 状态总结徽标（仅开始/仅截止/区间段）
const timePlanSummaryText = computed(() => {
  const start = editStartDate.value;
  const startTime = editStartTime.value;
  const due = editDueDate.value;
  const dueTime = editDueTime.value;

  if (start && due) {
    const sText = formatMonthDayTime(start, startTime);
    const dText = formatMonthDayTime(due, dueTime);
    return `${sText} ~ ${dText}`;
  }
  if (start && !due) {
    const sText = formatMonthDayTime(start, startTime);
    return `自 ${sText} 起 (无截止)`;
  }
  if (!start && due) {
    const dText = formatMonthDayTime(due, dueTime);
    return `截止 ${dText}`;
  }
  return "";
});

const timePlanStatusClass = computed(() => {
  const start = editStartDate.value;
  const due = editDueDate.value;
  if (start && due) return "status-range";
  if (start && !due) return "status-start-only";
  if (!start && due) return "status-due-only";
  return "";
});

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

function clearAllDates() {
  clearStartDate();
  clearDueDate();
}

// 提取当前任务中所有关联的图片（从原始描述 Markdown 中解析，支持 http 与 data:image）
const attachedImages = computed(() => {
  const list: Array<{ url: string; name: string }> = [];
  const raw = state.description || "";
  const regex = /!\[([^\]]*)\]\(((?:https?:\/\/|data:image\/)[^\s\)]+)\)/g;
  let match;
  while ((match = regex.exec(raw)) !== null) {
    list.push({
      name: match[1] || "任务照片",
      url: match[2]
    });
  }
  return list;
});

let titleDebounceTimer: ReturnType<typeof setTimeout> | undefined;
let pendingDraft: { taskId: string; title: string; description: string } | undefined;

function captureDraft() {
  const imgMarkdown = (state.description.match(/!\[.*?\]\((?:https?:\/\/|data:image\/)[^\s\)]+\)/g) || []).join("\n\n");
  return {
    taskId: state.taskId,
    title: editTitle.value,
    description: [editDescription.value.trim(), imgMarkdown].filter(Boolean).join("\n\n")
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

<style scoped src="./todoist-inspector.css"></style>
