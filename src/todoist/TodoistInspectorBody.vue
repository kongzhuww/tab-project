<template>
  <div v-if="state.isOpen" class="inspector-body inspector-split-layout">
    <!-- ⬅️ 左侧主工作区：标题、极简折叠式描述、子任务、评论区 -->
    <main class="inspector-main-col">
      <p v-if="state.error" class="draft-status" role="alert">{{ state.error }}</p>

      <!-- 🐙 关联 GitHub 仓库 (在任务标题上方清晰展示) -->
      <div v-if="taskRepos.length" class="inspector-repo-badges">
        <button
          v-for="repo in taskRepos"
          :key="repo.fullName"
          type="button"
          class="inspector-repo-btn"
          :title="'关联 GitHub 仓库：' + repo.fullName + ' · 点击在插件内查看详情'"
          @click="openGitHubRepo(repo.fullName)"
        >
          <span class="repo-badge-icon">🐙</span>
          <span class="repo-badge-name">{{ repo.fullName }}</span>
          <span class="repo-badge-jump">↗</span>
        </button>
      </div>

      <!-- 1. 任务标题（带大圆圈完成状态复选框） -->
      <section class="inspector-section inspector-title-section">
        <div class="task-title-row">
          <button
            type="button"
            class="task-complete-circle-btn"
            :class="{ completed: isTaskCompleted }"
            title="标记完成/撤销"
            @click="emit('toggleComplete')"
          >
            <span v-if="isTaskCompleted" class="check-mark">✓</span>
          </button>
          <textarea
            :value="editTitle"
            rows="1"
            aria-label="任务标题"
            @vue:mounted="resizeTitle"
            @vue:updated="resizeTitle"
            :disabled="isUploadingImg"
            ref="titleTextareaRef"
            class="inspector-input-title"
            :class="{ 'title-done': isTaskCompleted }"
            placeholder="任务标题"
            @input="resizeText($event.target as HTMLTextAreaElement); emit('update:editTitle', ($event.target as HTMLTextAreaElement).value); emit('scheduleDraftSave', $event)"
            @compositionend="emit('scheduleDraftSave', $event)"
            @blur="emit('saveTitleAndDesc', $event)"
            @keydown.enter.prevent="emit('saveTitleAndDesc', $event)"
          />
        </div>
      </section>

      <section class="inspector-section inspector-desc-section" @dragover.prevent="emit('dragover')" @dragleave.prevent="emit('dragleave')" @drop.prevent="emit('dropImage', $event)">
        <textarea v-if="isDescEditing" ref="descTextareaRef" :value="editDescription"
          class="desc-inline-editor" rows="1" placeholder="描述" :disabled="isUploadingImg"
          @input="onDescInput" @compositionend="emit('scheduleDraftSave', $event)"
          @blur="finishDescEdit" @paste="emit('descPaste', $event)" />
        <div v-else class="desc-display-mode" role="button" tabindex="0" aria-label="编辑描述"
          @click="startDescEdit" @keydown.enter.prevent="startDescEdit">
          <span v-if="!editDescription" class="desc-placeholder-btn">≡ 描述</span>
          <div v-else class="rendered-markdown" v-html="renderedDescriptionHtml"></div>
        </div>
        <small v-if="isUploadingImg" role="status">图片上传中…</small>
        <div v-if="attachedImages.length" class="attached-img-grid">
          <div v-for="img in attachedImages" :key="img.url" class="attached-img-card">
            <button type="button" class="attached-img-link" @click="openImageViewer(img.url, img.name)">
              <img :src="img.url" :alt="img.name" loading="lazy" />
            </button>
            <div class="attached-img-info"><span>{{ img.name }}</span><button type="button" title="移除图片" @click="emit('removeAttachedImage', img.url)">×</button></div>
          </div>
        </div>
      </section>

      <!-- 3. 子任务列表与添加 -->
      <section class="inspector-section inspector-subtasks-section">
        <div v-if="subtasks.length > 0" class="subtasks-list">
          <div
            v-for="st in subtasks"
            :key="st.id"
            class="subtask-row-item"
            :class="{ done: st.completed }"
          >
            <button
              type="button"
              class="subtask-check-circle"
              :class="{ checked: st.completed }"
              @click="emit('toggleSubtask', st.id)"
            >
              <span v-if="st.completed" class="check-tick">✓</span>
            </button>
            <span class="subtask-content-text">{{ st.text }}</span>
            <button
              type="button"
              class="subtask-del-btn"
              title="删除子任务"
              @click="emit('removeSubtask', st.id)"
            >×</button>
          </div>
        </div>

        <div v-if="isAddingSubtask" class="subtask-inline-input-wrap">
          <input
            :value="newSubtaskText"
            type="text"
            class="subtask-input-field"
            placeholder="输入子任务并回车…"
            @input="emit('update:newSubtaskText', ($event.target as HTMLInputElement).value)"
            @keydown.enter.prevent="emit('confirmAddSubtask')"
            @keydown.esc="emit('update:isAddingSubtask', false)"
          />
          <div class="subtask-actions">
            <button type="button" class="btn-subtask-ok" @click="emit('confirmAddSubtask')">添加</button>
            <button type="button" class="btn-subtask-cancel" @click="emit('update:isAddingSubtask', false)">取消</button>
          </div>
        </div>
        <button
          v-else
          type="button"
          class="inspector-add-subtask-btn"
          @click="emit('update:isAddingSubtask', true)"
        >
          <span class="subtask-plus-icon">＋</span> 添加子任务
        </button>
      </section>

      <TaskRepositoryLinks :key="state.taskId" :task-id="state.taskId" />

      <!-- 4. 评论区 (Avatar + 快速输入 + 历史评论) -->
      <section class="inspector-section inspector-comments-section">
        <div class="comment-input-bar">
          <div class="comment-avatar">💬</div>
          <div class="comment-input-wrap">
            <input
              :value="newCommentText"
              type="text"
              class="comment-input-field"
              placeholder="评论…"
              :disabled="isSubmittingComment"
              @input="emit('update:newCommentText', ($event.target as HTMLInputElement).value)"
              @keydown.enter.prevent="emit('submitComment')"
            />
            <button
              type="button"
              class="comment-clip-btn"
              title="上传照片附件"
              @click.stop="emit('triggerFileInput')"
            >📎</button>
          </div>
          <button
            v-if="newCommentText.trim()"
            type="button"
            class="comment-submit-btn"
            :disabled="isSubmittingComment"
            @click="emit('submitComment')"
          >发送</button>
        </div>

        <div v-if="state.comments.length > 0" class="comments-list">
          <div v-for="c in state.comments" :key="c.id" class="comment-item">
            <div class="comment-item-avatar">👤</div>
            <div class="comment-item-content">
              <div class="comment-item-header">
                <span class="comment-author">我</span>
                <span class="comment-time">{{ formatCommentTime(c.postedAt) }}</span>
              </div>
              <div class="comment-text">{{ c.content }}</div>
              <div v-if="c.attachment?.url" class="comment-attached-thumb">
                <img
                  :src="c.attachment.url"
                  alt="评论图片"
                  class="comment-thumb-img"
                  @click="openImageViewer(c.attachment.url, c.attachment.name)"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- ➡️ 右侧属性栏：日期 / 截止 / 优先级 / 标签 / 提醒 (项目已彻底去掉) -->
    <aside class="inspector-side-col">
      <!-- 1. 日期安排 (对齐图 2 弹出快捷日历面板) -->
      <div class="side-prop-group date-picker-anchor">
        <div class="side-prop-header">
          <span class="side-prop-label">日期</span>
        </div>
        <button
          ref="startDateBtnRef"
          type="button"
          class="side-item-row click-row"
          :class="{ active: isStartDatePickerOpen, filled: !!editStartDate }"
          @click="isStartDatePickerOpen = !isStartDatePickerOpen"
        >
          <span class="row-icon">📅</span>
          <span class="row-text">{{ formatDisplayDate(editStartDate, editStartTime) || '安排日期' }}</span>
          <span
            v-if="editStartDate"
            class="row-clear-btn"
            title="清除日期"
            @click.stop="emit('clearStartDate')"
          >×</span>
        </button>

        <TodoistDatePickerPopover
          v-if="isStartDatePickerOpen"
          :model-value="editStartDate"
          :time-value="editStartTime"
          :anchor-el="startDateBtnRef"
          @update:model-value="emit('update:editStartDate', $event)"
          @update:time-value="emit('update:editStartTime', $event)"
          @change="emit('startChange')"
          @close="isStartDatePickerOpen = false"
        />
      </div>

      <!-- 2. 截止期限 (自研增强版日期弹窗，无需会员) -->
      <div class="side-prop-group date-picker-anchor">
        <div class="side-prop-header">
          <span class="side-prop-label">截止期限</span>
        </div>
        <button
          ref="dueDateBtnRef"
          type="button"
          class="side-item-row click-row"
          :class="{ active: isDueDatePickerOpen, filled: !!editDueDate }"
          @click="isDueDatePickerOpen = !isDueDatePickerOpen"
        >
          <span class="row-icon">▣</span>
          <span class="row-text">{{ formatDisplayDate(editDueDate, editDueTime) || '设定截止' }}</span>
          <span
            v-if="editDueDate"
            class="row-clear-btn"
            title="清除截止时间"
            @click.stop="emit('clearDueDate')"
          >×</span>
        </button>

        <TodoistDatePickerPopover
          v-if="isDueDatePickerOpen"
          :model-value="editDueDate"
          :time-value="editDueTime"
          :anchor-el="dueDateBtnRef"
          @update:model-value="emit('update:editDueDate', $event)"
          @update:time-value="emit('update:editDueTime', $event)"
          @change="emit('dueChange')"
          @close="isDueDatePickerOpen = false"
        />
      </div>

      <div class="side-prop-group">
        <span class="side-prop-label">优先级</span>
        <button ref="priorityBtnRef" type="button" class="side-item-row" @click="isPriorityMenuOpen = true"><span :style="{ color: priorityColor(state.priority) }">⚑</span><span class="row-text">P{{ 5 - state.priority }}</span><span>⌄</span></button>
        <InspectorPopover v-if="isPriorityMenuOpen" :anchor="priorityBtnRef" @close="isPriorityMenuOpen = false">
          <div class="inspector-menu"><button v-for="p in priorityOptions" :key="p.level" type="button" :disabled="!!todoistModuleState.pendingWrites" @click="selectPriority(p.level)"><span :style="{ color: p.color }">⚑</span> {{ p.name }} <span v-if="state.priority === p.level">✓</span></button></div>
        </InspectorPopover>
      </div>
      <div class="side-prop-group">
        <span class="side-prop-label">标签</span>
        <button ref="labelsBtnRef" type="button" class="side-item-row" @click="isLabelsMenuOpen = true"><span class="row-text">{{ state.labels.join('、') || '添加标签' }}</span><span>＋</span></button>
        <InspectorPopover v-if="isLabelsMenuOpen" :anchor="labelsBtnRef" @close="isLabelsMenuOpen = false">
          <div class="inspector-menu">
            <input v-model="labelSearchText" placeholder="搜索或新建标签" aria-label="搜索标签" @keydown.enter.prevent="createOrSelectLabel" />
            <small v-if="labelsLoading">读取标签中…</small><p v-if="labelsError" role="alert">{{ labelsError }}</p>
            <div class="label-options-list"><label v-for="opt in filteredLabels" :key="opt" class="label-option-row"><span>◇ {{ opt }}</span><input type="checkbox" :checked="state.labels.includes(opt)" :disabled="!!todoistModuleState.pendingWrites" @change="emit('toggleLabelSelect', opt)" /></label></div>
            <button v-if="labelSearchText.trim() && !allKnownLabels.includes(labelSearchText.trim())" type="button" :disabled="!!todoistModuleState.pendingWrites" @click="createOrSelectLabel">＋ 创建“{{ labelSearchText.trim() }}”</button>
            <small v-if="!labelsLoading && !filteredLabels.length && !labelSearchText">暂无标签</small>
          </div>
        </InspectorPopover>
      </div>
      <div class="side-prop-group">
        <span class="side-prop-label">提醒 <small>本机</small></span>
        <button ref="reminderBtnRef" type="button" class="side-item-row" @click="openReminder"><span class="row-text">{{ formatReminderDisplay(state.reminderTime) || '添加提醒' }}</span><span>＋</span></button>
        <ReminderPicker v-if="isReminderPickerOpen" :anchor="reminderBtnRef" :task-id="state.taskId"
          :value="state.reminderTime" :task-date="editStartDate || editDueDate" :task-time="editStartTime || editDueTime"
          @close="isReminderPickerOpen = false" />
      </div>
    </aside>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, watch, onMounted, onUnmounted } from "vue";
import InspectorPopover from "./InspectorPopover.vue";
import TaskRepositoryLinks from "./TaskRepositoryLinks.vue";
import ReminderPicker from "./ReminderPicker.vue";
import { getTaskRepositoryLinks, type RepositoryLink } from "./repository-links";
import { githubRepoDetailController } from "../github/repo-detail-store";
import { todoistService } from "../services/todoist.service";
import { todoistModuleState } from "./module-state";
import type { TodoistInspectorState } from "./inspector-store";
import { imageViewerController } from "../viewers/image-viewer-store";
import { markdownAstEngine } from "../utils/markdown-ast";
import TodoistDatePickerPopover from "./TodoistDatePickerPopover.vue";

const props = defineProps<{
  state: TodoistInspectorState;
  editTitle: string;
  editDescription: string;
  editStartDate: string;
  editStartTime: string;
  editDueDate: string;
  editDueTime: string;
  isUploadingImg: boolean;
  isDragOver: boolean;
  isTaskCompleted: boolean;
  subtasks: Array<{ id: string; text: string; completed: boolean }>;
  completedSubtasksCount: number;
  isAddingSubtask: boolean;
  newSubtaskText: string;
  newCommentText: string;
  isSubmittingComment: boolean;
  attachedImages: Array<{ url: string; name: string }>;
  availableLabels: string[];
}>();

const emit = defineEmits<{
  'update:editTitle': [val: string];
  'update:editDescription': [val: string];
  'update:editStartDate': [val: string];
  'update:editStartTime': [val: string];
  'update:editDueDate': [val: string];
  'update:editDueTime': [val: string];
  'update:isAddingSubtask': [val: boolean];
  'update:newSubtaskText': [val: string];
  'update:newCommentText': [val: string];
  'scheduleDraftSave': [e?: Event];
  'saveTitleAndDesc': [e?: Event];
  'toggleComplete': [];
  'triggerFileInput': [];
  'dragover': [];
  'dragleave': [];
  'dropImage': [e: DragEvent];
  'descPaste': [e: ClipboardEvent];
  'removeAttachedImage': [url: string];
  'toggleSubtask': [id: string];
  'removeSubtask': [id: string];
  'confirmAddSubtask': [];
  'submitComment': [];
  'startChange': [];
  'clearStartDate': [];
  'clearStartTime': [];
  'dueChange': [];
  'clearDueDate': [];
  'clearDueTime': [];
  'selectPriority': [level: number];
  'toggleLabelSelect': [label: string];
  'removeLabel': [label: string];
  'createLabel': [name: string];
}>();

// 控制描述展示态与编辑态
const isDescEditing = ref(false);
const descTextareaRef = ref<HTMLTextAreaElement | null>(null);
const titleTextareaRef = ref<HTMLTextAreaElement | null>(null);
let textResize: ResizeObserver | undefined;
onMounted(() => {
  let width = -1;
  textResize = new ResizeObserver(entries => {
    const current = entries[0]?.contentRect.width;
    if (current === width) return;
    width = current;
    resizeText(titleTextareaRef.value); resizeText(descTextareaRef.value);
  });
  if (titleTextareaRef.value?.parentElement) textResize.observe(titleTextareaRef.value.parentElement);
});
onUnmounted(() => textResize?.disconnect());

const renderedDescriptionHtml = computed(() => {
  if (!props.editDescription) return "";
  // 过滤掉照片 Markdown 标记，图片在专门的缩略图区渲染
  const textOnly = props.editDescription.replace(/!\[.*?\]\((?:https?:\/\/|data:image\/)[^\s\)]+\)/g, "").trim();
  const fragment = document.createElement("template");
  fragment.innerHTML = markdownAstEngine.renderMarkdown(textOnly);
  const allowed = new Set(["P", "BR", "UL", "OL", "LI", "STRONG", "B", "EM", "I", "DEL", "S", "CODE", "PRE", "BLOCKQUOTE", "A", "SPAN", "DIV", "H1", "H2", "H3", "H4", "HR"]);
  for (const el of Array.from(fragment.content.querySelectorAll("*"))) {
    if (!allowed.has(el.tagName)) { el.replaceWith(document.createTextNode(el.textContent || "")); continue; }
    const href = el.tagName === "A" ? el.getAttribute("href") : null;
    for (const attr of Array.from(el.attributes)) el.removeAttribute(attr.name);
    if (href && /^(https?:\/\/|mailto:)/i.test(href)) {
      el.setAttribute("href", href); el.setAttribute("target", "_blank"); el.setAttribute("rel", "noopener noreferrer");
    }
  }
  return fragment.innerHTML;
});

function startDescEdit() {
  isDescEditing.value = true;
  nextTick(() => {
    resizeText(descTextareaRef.value); descTextareaRef.value?.focus();
  });
}

function resizeText(el: HTMLTextAreaElement | null) {
  if (!el) return;
  el.style.height = "auto"; el.style.height = el.scrollHeight + "px";
}
function resizeTitle(node: any) { resizeText(node.el as HTMLTextAreaElement); }
function onDescInput(event: Event) {
  const el = event.target as HTMLTextAreaElement;
  resizeText(el);
  emit('update:editDescription', el.value); emit('scheduleDraftSave', event);
}
function finishDescEdit() { emit('saveTitleAndDesc'); isDescEditing.value = false; }

// 弹出浮层开关
const isStartDatePickerOpen = ref(false);
const isDueDatePickerOpen = ref(false);
const startDateBtnRef = ref<HTMLElement | null>(null);
const dueDateBtnRef = ref<HTMLElement | null>(null);
const isPriorityMenuOpen = ref(false);
const isLabelsMenuOpen = ref(false);
const isReminderPickerOpen = ref(false);
const labelSearchText = ref("");
const labelsBtnRef = ref<HTMLElement | null>(null), reminderBtnRef = ref<HTMLElement | null>(null), priorityBtnRef = ref<HTMLElement | null>(null);
const cloudLabels = ref<string[]>([]), labelsLoading = ref(false), labelsError = ref("");
let labelRead: AbortController | undefined;
watch(() => [props.state.taskId, isLabelsMenuOpen.value], async (_value, _old, cleanup) => {
  labelRead?.abort();
  if (!isLabelsMenuOpen.value) return;
  const request = new AbortController(); labelRead = request; cleanup(() => request.abort());
  cloudLabels.value = []; labelsLoading.value = true; labelsError.value = "";
  try {
    const labels = await todoistService.getLabels(request.signal);
    if (!request.signal.aborted) cloudLabels.value = labels.map(l => l.name);
  } catch { if (!request.signal.aborted) labelsError.value = "标签库读取失败，仍可查看本页标签。"; }
  finally { if (!request.signal.aborted) labelsLoading.value = false; }
});
function openReminder() { isReminderPickerOpen.value = true; }

const priorityOptions = [
  { level: 4, name: "优先级 1", color: "#d1453b" },
  { level: 3, name: "优先级 2", color: "#eb8909" },
  { level: 2, name: "优先级 3", color: "#246fe0" },
  { level: 1, name: "优先级 4", color: "#808080" }
];

function priorityColor(level: number): string {
  switch (level) {
    case 4: return "#d1453b";
    case 3: return "#eb8909";
    case 2: return "#246fe0";
    default: return "#808080";
  }
}

function selectPriority(level: number) {
  isPriorityMenuOpen.value = false;
  emit('selectPriority', level);
}

const allKnownLabels = computed(() => {
  const set = new Set<string>([...cloudLabels.value, ...(props.availableLabels || [])]);
  for (const lbl of props.state.labels || []) set.add(lbl);
  return Array.from(set);
});

const filteredLabels = computed(() => {
  const q = labelSearchText.value.trim().toLowerCase();
  if (!q) return allKnownLabels.value;
  return allKnownLabels.value.filter(l => l.toLowerCase().includes(q));
});

function createOrSelectLabel() {
  const name = labelSearchText.value.trim();
  if (!name) return;
  emit('createLabel', name);
  labelSearchText.value = "";
}

function openImageViewer(url: string, name: string) {
  imageViewerController.open(url, name);
}

const repoLinksVersion = ref(0);
function onRepoLinksChanged() {
  repoLinksVersion.value++;
}
onMounted(() => {
  window.addEventListener('storage', onRepoLinksChanged);
  window.addEventListener('todoist-repository-links-changed', onRepoLinksChanged);
});
onUnmounted(() => {
  window.removeEventListener('storage', onRepoLinksChanged);
  window.removeEventListener('todoist-repository-links-changed', onRepoLinksChanged);
});

const taskRepos = computed<RepositoryLink[]>(() => {
  void repoLinksVersion.value;
  return getTaskRepositoryLinks(props.state.taskId, props.editDescription);
});

function openGitHubRepo(fullName: string) {
  githubRepoDetailController.open(fullName);
}

function formatDisplayDate(dateStr?: string, timeStr?: string): string {
  if (!dateStr) return "";
  try {
    const parts = dateStr.split("-");
    const m = parseInt(parts[1], 10);
    const d = parseInt(parts[2], 10);
    const time = timeStr ? ` ${timeStr}` : "";
    return `${m}月${d}日${time}`;
  } catch {
    return dateStr;
  }
}

function formatReminderDisplay(dt?: string): string {
  if (!dt) return "";
  try {
    const d = new Date(dt);
    return `${d.getMonth() + 1}月${d.getDate()}日 ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
  } catch {
    return dt;
  }
}

function formatCommentTime(isoStr?: string): string {
  if (!isoStr) return "刚刚";
  try {
    const d = new Date(isoStr);
    return `${d.getMonth() + 1}月${d.getDate()}日 ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
  } catch {
    return isoStr;
  }
}
</script>

<style scoped src="./todoist-inspector.css"></style>
