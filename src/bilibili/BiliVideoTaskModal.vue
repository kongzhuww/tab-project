<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from "vue";
import { biliVideoTaskState as state, biliVideoTaskController as controller, type BiliVideoTaskTarget } from "./video-task-store";
import { todoistService, type TodoistRawProject, type TodoistRawSection, type TodoistRawTask, isTodoistTaskCompleted } from "../services/todoist.service";
import { withTodoistWrite, todoistModuleState } from "../todoist/module-state";
import { todoistTaskListController } from "../todoist/task-list-store";
import { openTodoistTask } from "../todoist/task-navigation";
import { notifications } from "../sdk/notifications";
import TodoistDatePickerPopover from "../todoist/TodoistDatePickerPopover.vue";
import CustomSelect, { type CustomSelectOption } from "../core/CustomSelect.vue";
import { attachBiliVideo } from "../todoist/bili-video-links";
import { t } from "../i18n";

const windowRef = ref<HTMLElement | null>(null);
const pos = ref<{ x: number; y: number } | null>(null);
let isDragging = false;
let startMouseX = 0;
let startMouseY = 0;
let startPosX = 0;
let startPosY = 0;

// 表单字段
const projects = ref<TodoistRawProject[]>([]);
const sections = ref<TodoistRawSection[]>([]);
const selectedProjectId = ref("");
const selectedSectionId = ref("");
const loadingProjects = ref(false);
const loadingSections = ref(false);

const content = ref("");
const description = ref("");
const dueDate = ref("");
const dueTime = ref("");
const dateAnchor = ref<HTMLElement | null>(null);
const dateOpen = ref(false);
const timeValid = ref(true);
const isSubmitting = ref(false);
const error = ref("");

// 关联任务读取
interface BiliLinkedTaskItem {
  id: string;
  task?: TodoistRawTask;
  error?: string;
}
const linkedTasks = ref<BiliLinkedTaskItem[]>([]);
const loadingLinkedTasks = ref(false);

const video = computed(() => state.video);
const videoKey = computed(() => {
  const v = video.value;
  if (!v) return "";
  return (v.bvid || v.aid || "").toString();
});

// 本地关联任务存储 Key 前缀: bili_video_tasks_v1:{bvid}
function getLocalTasksKey(id: string): string {
  return `bili_video_tasks_v1:${id}`;
}

function readStoredTaskIds(id: string): string[] {
  if (!id) return [];
  try {
    const raw = localStorage.getItem(getLocalTasksKey(id));
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter(i => typeof i === "string") : [];
  } catch {
    return [];
  }
}

function saveStoredTaskId(id: string, taskId: string) {
  if (!id || !taskId) return;
  const current = readStoredTaskIds(id);
  if (!current.includes(taskId)) {
    current.unshift(taskId);
    localStorage.setItem(getLocalTasksKey(id), JSON.stringify(current));
  }
}

async function loadLinkedTasks() {
  const vk = videoKey.value;
  if (!vk) {
    linkedTasks.value = [];
    return;
  }
  const taskIds = readStoredTaskIds(vk);
  if (!taskIds.length) {
    linkedTasks.value = [];
    return;
  }

  loadingLinkedTasks.value = true;
  linkedTasks.value = taskIds.map(id => ({ id }));

  try {
    const token = await todoistService.initToken();
    if (!token) {
      loadingLinkedTasks.value = false;
      return;
    }

    const worker = async (taskId: string, index: number) => {
      try {
        const value = await todoistService.api<any>(`/tasks/${encodeURIComponent(taskId)}`);
        if (value && typeof value === "object" && String(value.id) === taskId) {
          linkedTasks.value[index] = { id: taskId, task: value as TodoistRawTask };
        }
      } catch (err: any) {
        linkedTasks.value[index] = { id: taskId, error: err?.message || "读取失败" };
      }
    };

    await Promise.allSettled(taskIds.slice(0, 8).map((id, idx) => worker(id, idx)));
  } finally {
    loadingLinkedTasks.value = false;
  }
}

const visibleLinkedTasks = computed(() => {
  return linkedTasks.value.filter(item => !item.task || !isTodoistTaskCompleted(item.task));
});

async function completeLinkedTask(entry: BiliLinkedTaskItem) {
  if (!entry.task || isSubmitting.value) return;
  const taskId = entry.id;
  try {
    await withTodoistWrite(async () => {
      await todoistService.toggleTaskCompletion(taskId, true);
      todoistService.invalidateWorkspaceSnapshots();
      if (entry.task) {
        entry.task.checked = true;
        entry.task.is_completed = true;
      }
      notifications.show({
        appName: "Todoist",
        appType: "todoist",
        title: "任务已完成",
        message: entry.task?.content || taskId,
        level: "success",
        duration: 4000
      });
      if (todoistModuleState.active) {
        void todoistTaskListController.loadWorkspace(undefined, undefined, true);
      }
    });
  } catch (err: any) {
    notifications.fetch("Todoist", `标记完成失败: ${err?.message || "网络错误"}`);
  }
}

// 拖拽窗口
function onHeaderMouseDown(e: MouseEvent) {
  if ((e.target as HTMLElement).closest("button, a, input, select, textarea")) return;
  isDragging = true;
  const win = windowRef.value;
  if (!win) return;
  const rect = win.getBoundingClientRect();
  startPosX = rect.left;
  startPosY = rect.top;
  startMouseX = e.clientX;
  startMouseY = e.clientY;
  pos.value = { x: startPosX, y: startPosY };

  const onMouseMove = (ev: MouseEvent) => {
    if (!isDragging) return;
    const dx = ev.clientX - startMouseX;
    const dy = ev.clientY - startMouseY;
    pos.value = {
      x: Math.max(10, Math.min(window.innerWidth - 120, startPosX + dx)),
      y: Math.max(10, Math.min(window.innerHeight - 80, startPosY + dy))
    };
  };

  const onMouseUp = () => {
    isDragging = false;
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseup", onMouseUp);
  };

  window.addEventListener("mousemove", onMouseMove);
  window.addEventListener("mouseup", onMouseUp);
}

// 快捷键 Esc 与 点击外部退出（仅在非子弹出层点击时）
function handleKeydown(e: KeyboardEvent) {
  if (e.key === "Escape" && state.isOpen) {
    if (dateOpen.value) {
      dateOpen.value = false;
      return;
    }
    controller.close();
  }
}

function handleGlobalPointerDown(e: PointerEvent) {
  if (!state.isOpen || !windowRef.value || dateOpen.value) return;
  if (!windowRef.value.contains(e.target as Node)) {
    const targetEl = e.target as HTMLElement | null;
    if (targetEl?.closest(".fo-context-menu, .todoist-date-picker-popover")) return;
    controller.close();
  }
}

async function loadProjectsAndSections() {
  loadingProjects.value = true;
  try {
    const rawProjects = await todoistService.getProjects();
    projects.value = (rawProjects || []).filter(p => !p.is_deleted && !p.is_archived);

    const lastProjectId = localStorage.getItem("bili_task_last_project_id") || localStorage.getItem("github_task_last_project_id");
    if (lastProjectId && projects.value.some(p => String(p.id) === lastProjectId)) {
      selectedProjectId.value = lastProjectId;
    } else if (projects.value.length > 0) {
      const inbox = projects.value.find(p => p.inbox_project || p.is_inbox_project || /^(Inbox|收件箱)$/i.test(p.name));
      selectedProjectId.value = String(inbox ? inbox.id : projects.value[0].id);
    }

    if (selectedProjectId.value) {
      await loadSectionsForProject(selectedProjectId.value);
    }
  } catch (err: any) {
    error.value = "加载 Todoist 项目失败: " + (err?.message || "请检查登录状态");
  } finally {
    loadingProjects.value = false;
  }
}

async function loadSectionsForProject(projId: string) {
  loadingSections.value = true;
  try {
    const rawSections = await todoistService.getSections(projId);
    sections.value = (rawSections || []).filter(s => Boolean(s && s.id && s.name));

    const lastSectionId = localStorage.getItem("bili_task_last_section_id");
    if (lastSectionId && sections.value.some(s => String(s.id) === lastSectionId)) {
      selectedSectionId.value = lastSectionId;
    } else {
      selectedSectionId.value = "";
    }
  } catch {
    sections.value = [];
    selectedSectionId.value = "";
  } finally {
    loadingSections.value = false;
  }
}

function isInboxProject(p: TodoistRawProject): boolean {
  return Boolean(p.inbox_project || p.is_inbox_project || /^(Inbox|收件箱)$/i.test(p.name.trim()));
}

function getProjectDisplayName(p: TodoistRawProject): string {
  if (isInboxProject(p)) {
    return t("todoist.inbox") || "收件箱";
  }
  return p.name;
}

const projectOptions = computed<CustomSelectOption[]>(() => {
  return projects.value.map(p => ({
    value: String(p.id),
    label: getProjectDisplayName(p),
    icon: isInboxProject(p) ? "📥" : "📁"
  }));
});

const sectionOptions = computed<CustomSelectOption[]>(() => {
  const list: CustomSelectOption[] = [
    { value: "", label: "(无分组 / 默认项目根)", icon: "📑" }
  ];
  sections.value.forEach(s => {
    list.push({
      value: String(s.id),
      label: s.name,
      icon: "📑"
    });
  });
  return list;
});

async function onProjectChange(id: string | number) {
  selectedProjectId.value = String(id);
  localStorage.setItem("bili_task_last_project_id", selectedProjectId.value);
  selectedSectionId.value = "";
  localStorage.removeItem("bili_task_last_section_id");
  await loadSectionsForProject(selectedProjectId.value);
}

function onSectionChange(id: string | number) {
  selectedSectionId.value = String(id);
  if (selectedSectionId.value) {
    localStorage.setItem("bili_task_last_section_id", selectedSectionId.value);
  } else {
    localStorage.removeItem("bili_task_last_section_id");
  }
}

// 监听弹窗打开与视频变化
watch(() => [state.isOpen, state.video], ([open, v]) => {
  if (open && v) {
    error.value = "";
    const targetVideo = v as BiliVideoTaskTarget;
    content.value = `观看看视频: ${targetVideo.title}`;
    const authorLine = targetVideo.author ? `UP主: ${targetVideo.author}\n` : "";
    const urlLine = targetVideo.url ? `视频地址: ${targetVideo.url}\n` : "";
    description.value = `${authorLine}${urlLine}`.trim();
    dueDate.value = "";
    dueTime.value = "";
    void loadProjectsAndSections();
    void loadLinkedTasks();
  }
}, { immediate: true });

async function submit() {
  if (isSubmitting.value || !content.value.trim() || !selectedProjectId.value || !timeValid.value) return;

  const projId = selectedProjectId.value;
  const secId = selectedSectionId.value || undefined;
  const vk = videoKey.value;
  const targetVideo = video.value;

  const payload = {
    content: content.value.trim(),
    description: description.value.trim(),
    project_id: projId,
    section_id: secId,
    due_string: dueDate.value ? dueDate.value + (dueTime.value ? " " + dueTime.value : "") : undefined
  };

  isSubmitting.value = true;
  error.value = "";

  try {
    await withTodoistWrite(async () => {
      const token = await todoistService.initToken();
      if (!token) {
        throw new Error("请先登录 Todoist");
      }

      const created = await todoistService.createTask(payload);
      if (!created || typeof created.id !== "string") {
        throw new Error("创建任务返回异常");
      }

      if (vk) {
        saveStoredTaskId(vk, created.id);
      }

      // 双向绑定任务与该 B站 视频
      if (targetVideo) {
        attachBiliVideo(created.id, {
          bvid: targetVideo.bvid || (vk.startsWith('BV') ? vk : ''),
          aid: targetVideo.aid,
          title: targetVideo.title,
          cover: targetVideo.cover,
          author: targetVideo.author,
          url: targetVideo.url || (targetVideo.bvid ? `https://www.bilibili.com/video/${targetVideo.bvid}` : '')
        });
      }

      todoistService.invalidateWorkspaceSnapshots();
      notifications.show({
        appName: "Todoist",
        appType: "todoist",
        title: "B站视频任务已创建",
        message: payload.content,
        level: "success",
        target: { type: "todoist-task", taskId: created.id },
        actionLabel: "查看任务",
        duration: 7000
      });

      if (todoistModuleState.active) {
        void todoistTaskListController.loadWorkspace(undefined, undefined, true);
      }

      void loadLinkedTasks();
      controller.close();
    });
  } catch (err: any) {
    error.value = err?.message || "创建任务失败，请检查网络或配置";
  } finally {
    isSubmitting.value = false;
  }
}

onMounted(() => {
  window.addEventListener("keydown", handleKeydown);
  window.addEventListener("pointerdown", handleGlobalPointerDown, true);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeydown);
  window.removeEventListener("pointerdown", handleGlobalPointerDown, true);
});
</script>

<template>
  <Teleport to="body">
    <div v-if="state.isOpen && video" class="bili-task-modal-overlay">
      <aside
        ref="windowRef"
        class="bili-task-window"
        :style="pos ? { position: 'fixed', left: `${pos.x}px`, top: `${pos.y}px`, margin: '0' } : {}"
        role="dialog"
        aria-modal="false"
        aria-label="创建 B站 视频任务"
      >
        <!-- 顶栏标题栏 -->
        <header class="bili-task-header" @mousedown="onHeaderMouseDown">
          <div class="bili-task-header-title">
            <span class="bili-task-badge">📺 视频任务</span>
            <small>关联当前 B站 视频</small>
          </div>
          <div class="bili-task-header-actions">
            <button
              type="button"
              class="bili-task-close-btn"
              title="关闭 (Esc)"
              :disabled="isSubmitting"
              @click="controller.close"
            >
              ✕
            </button>
          </div>
        </header>

        <!-- 主内容滚动区 -->
        <div class="bili-task-body">
          <!-- 已关联的任务 -->
          <section v-if="loadingLinkedTasks || visibleLinkedTasks.length > 0" class="bili-linked-tasks-section">
            <div class="bili-linked-header">
              <strong>关联任务</strong>
              <button
                type="button"
                class="bili-refresh-link-btn"
                :disabled="loadingLinkedTasks"
                @click="loadLinkedTasks"
              >
                {{ loadingLinkedTasks ? "读取中…" : "刷新" }}
              </button>
            </div>
            <ul v-if="visibleLinkedTasks.length" class="bili-linked-list">
              <li v-for="entry in visibleLinkedTasks" :key="entry.id" class="bili-linked-item">
                <button
                  type="button"
                  class="bili-complete-circle-btn"
                  title="标记为完成"
                  @click="completeLinkedTask(entry)"
                >
                  ○
                </button>
                <div class="bili-linked-meta">
                  <span
                    class="bili-linked-name"
                    :title="entry.task?.content || entry.id"
                    @click="openTodoistTask(entry.id)"
                  >
                    {{ entry.task?.content || `任务 #${entry.id}` }}
                  </span>
                  <small v-if="entry.task?.due?.date" class="bili-linked-due">
                    📅 {{ entry.task.due.date }}
                  </small>
                </div>
              </li>
            </ul>
            <p v-else-if="!loadingLinkedTasks" class="bili-no-linked">暂无未完成的关联任务</p>
          </section>

          <h3 class="bili-create-heading">创建任务</h3>

          <!-- 当前视频卡片信息引用 -->
          <div class="bili-video-reference">
            <img
              v-if="video.cover"
              :src="video.cover.replace(/^http:/, 'https:')"
              class="bili-ref-cover"
              alt=""
              referrerpolicy="no-referrer"
            />
            <div class="bili-ref-info">
              <strong :title="video.title">{{ video.title }}</strong>
              <small>{{ video.author ? `UP主: ${video.author}` : '' }} {{ video.bvid || '' }}</small>
            </div>
          </div>

          <!-- 目标项目与分组选择器 (统一采用现代弹出菜单) -->
          <div class="bili-destination-selector">
            <div class="bili-selector-field">
              <span class="bili-selector-title">📁 目标项目</span>
              <CustomSelect
                v-model="selectedProjectId"
                :options="projectOptions"
                :disabled="isSubmitting || loadingProjects"
                :placeholder="loadingProjects ? '正在加载项目…' : '选择项目'"
                @change="onProjectChange"
              />
            </div>

            <div class="bili-selector-field">
              <span class="bili-selector-title">📑 目标分组 (板块)</span>
              <CustomSelect
                v-model="selectedSectionId"
                :options="sectionOptions"
                :disabled="isSubmitting || loadingSections"
                :placeholder="loadingSections ? '正在加载板块…' : '(无分组 / 默认项目根)'"
                @change="onSectionChange"
              />
            </div>
          </div>

          <!-- 错误提示 -->
          <p v-if="error" class="bili-task-feedback" role="alert">{{ error }}</p>

          <!-- 任务表单 -->
          <form class="bili-task-form" @submit.prevent="submit">
            <fieldset :disabled="isSubmitting">
              <div class="bili-field-group">
                <label for="bili-task-title-input" class="bili-field-label">任务名称</label>
                <textarea
                  id="bili-task-title-input"
                  v-model="content"
                  rows="2"
                  maxlength="500"
                  class="bili-task-input"
                  placeholder="要针对这个视频做什么？"
                  required
                />
              </div>

              <div class="bili-field-group">
                <label for="bili-task-desc-input" class="bili-field-label">描述</label>
                <textarea
                  id="bili-task-desc-input"
                  v-model="description"
                  rows="3"
                  maxlength="16000"
                  class="bili-task-input"
                  placeholder="记录目标、笔记或备忘（可选）"
                />
              </div>

              <div class="bili-field-group">
                <label class="bili-field-label">截止日期</label>
                <button
                  ref="dateAnchor"
                  type="button"
                  class="bili-task-date-button"
                  @click="dateOpen = !dateOpen"
                >
                  ▦ {{ dueDate ? dueDate + (dueTime ? ' ' + dueTime : '') : '添加日期与时间' }}
                </button>
                <TodoistDatePickerPopover
                  v-if="dateOpen"
                  v-model="dueDate"
                  v-model:time-value="dueTime"
                  :anchor-el="dateAnchor"
                  @time-validity="timeValid = $event"
                  @close="dateOpen = false; timeValid = true"
                />
              </div>

              <p class="bili-task-local-note">任务名称、描述和截止日期将同步提交至 Todoist，并在本地与该视频绑定。</p>

              <button
                type="submit"
                class="bili-task-submit-btn"
                :disabled="!content.trim() || !selectedProjectId || !timeValid || loadingProjects || isSubmitting"
              >
                {{ isSubmitting ? '正在创建…' : '创建任务' }}
              </button>
            </fieldset>
          </form>
        </div>
      </aside>
    </div>
  </Teleport>
</template>

<style scoped>
/* 无模态纯净浮动视窗：0 遮罩背景，穿透底座，支持自由拖动 */
.bili-task-modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 99999;
  background: transparent !important;
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  box-sizing: border-box;
}

.bili-task-window {
  pointer-events: auto;
  width: min(380px, 92vw);
  max-height: min(680px, 88vh);
  background: var(--panel, #ffffff);
  border: 1px solid var(--border, rgba(0, 0, 0, 0.12));
  border-radius: 12px;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.22), 0 0 0 1px var(--border, rgba(0, 0, 0, 0.05));
  display: flex;
  flex-direction: column;
  overflow: hidden;
  color: var(--text, #1e293b);
  box-sizing: border-box;
  contain: paint;
}

.bili-task-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 14px;
  background: var(--panel, #f8fafc);
  border-bottom: 1px solid var(--border, rgba(0, 0, 0, 0.08));
  cursor: grab;
  user-select: none;
  flex-shrink: 0;
}

.bili-task-header:active {
  cursor: grabbing;
}

.bili-task-header-title {
  display: flex;
  align-items: center;
  gap: 8px;
}

.bili-task-badge {
  font-size: 13px;
  font-weight: 600;
  color: var(--heading, #0f172a);
}

.bili-task-header-title small {
  font-size: 11px;
  color: var(--muted, #64748b);
}

.bili-task-close-btn {
  border: none;
  background: transparent;
  color: var(--muted, #64748b);
  font-size: 15px;
  width: 26px;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s;
}

.bili-task-close-btn:hover {
  background: var(--surface-hover, rgba(0, 0, 0, 0.06));
  color: var(--heading, #0f172a);
}

.bili-task-body {
  padding: 14px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: var(--panel, #ffffff);
}

/* 已关联任务 */
.bili-linked-tasks-section {
  padding-bottom: 10px;
  border-bottom: 1px solid var(--border, rgba(0, 0, 0, 0.08));
}

.bili-linked-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
  margin-bottom: 6px;
}

.bili-refresh-link-btn {
  background: transparent;
  border: none;
  color: var(--link, #0284c7);
  font-size: 11px;
  cursor: pointer;
  padding: 2px 4px;
}

.bili-linked-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.bili-linked-item {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 6px 8px;
  background: var(--surface, rgba(0, 0, 0, 0.03));
  border: 1px solid var(--border, rgba(0, 0, 0, 0.06));
  border-radius: 6px;
}

.bili-complete-circle-btn {
  background: transparent;
  border: none;
  color: var(--muted, #64748b);
  cursor: pointer;
  font-size: 13px;
  padding: 0 2px;
  line-height: 1;
}

.bili-complete-circle-btn:hover {
  color: #10b981;
}

.bili-linked-meta {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.bili-linked-name {
  font-size: 12px;
  color: var(--heading, #0f172a);
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.bili-linked-name:hover {
  color: var(--link, #0284c7);
  text-decoration: underline;
}

.bili-linked-due {
  font-size: 10.5px;
  color: var(--muted, #64748b);
}

.bili-no-linked {
  font-size: 11.5px;
  color: var(--muted, #64748b);
  margin: 0;
}

.bili-create-heading {
  font-size: 12.5px;
  font-weight: 600;
  color: var(--heading, #0f172a);
  margin: 0;
}

/* 视频引用展示 */
.bili-video-reference {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 10px;
  background: var(--surface, rgba(0, 0, 0, 0.03));
  border: 1px solid var(--border, rgba(0, 0, 0, 0.08));
  border-radius: 8px;
}

.bili-ref-cover {
  width: 58px;
  height: 36px;
  object-fit: cover;
  border-radius: 4px;
  flex-shrink: 0;
}

.bili-ref-info {
  display: flex;
  flex-direction: column;
  min-width: 0;
  overflow: hidden;
}

.bili-ref-info strong {
  font-size: 12px;
  line-height: 1.35;
  color: var(--heading, #0f172a);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.bili-ref-info small {
  font-size: 11px;
  color: var(--muted, #64748b);
  margin-top: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 项目与分组选择器 */
.bili-destination-selector {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px 10px;
  background: var(--surface, rgba(0, 0, 0, 0.03));
  border: 1px solid var(--border, rgba(0, 0, 0, 0.08));
  border-radius: 8px;
}

.bili-selector-field {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.bili-selector-title {
  font-size: 11px;
  font-weight: 600;
  color: var(--muted, #64748b);
}

/* 方案 B：现代自定义弹出菜单 */
.bili-custom-select-wrapper {
  position: relative;
  width: 100%;
}

.bili-custom-select-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 6px 10px;
  border-radius: 6px;
  border: 1px solid var(--border, rgba(0, 0, 0, 0.12));
  background: var(--panel, #ffffff);
  color: var(--heading, #0f172a);
  font-size: 12px;
  cursor: pointer;
  outline: none;
  transition: all 0.15s;
}

.bili-custom-select-btn:hover:not(:disabled) {
  border-color: #0284c7;
}

.bili-custom-select-btn.is-open {
  border-color: #0284c7;
  box-shadow: 0 0 0 2px rgba(2, 132, 199, 0.15);
}

.bili-select-text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.bili-select-arrow {
  font-size: 10px;
  color: var(--muted, #64748b);
  transition: transform 0.15s;
}

.bili-custom-select-btn.is-open .bili-select-arrow {
  transform: rotate(180deg);
}

.bili-custom-popover-menu {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  z-index: 10;
  max-height: 180px;
  overflow-y: auto;
  background: var(--panel, #ffffff);
  border: 1px solid var(--border, rgba(0, 0, 0, 0.12));
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  padding: 4px;
  gap: 2px;
}

.bili-popover-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 8px;
  border: none;
  background: transparent;
  color: var(--text, #1e293b);
  font-size: 12px;
  border-radius: 4px;
  cursor: pointer;
  text-align: left;
  transition: background 0.12s;
}

.bili-popover-item:hover {
  background: var(--surface-hover, rgba(0, 0, 0, 0.05));
  color: var(--heading, #0f172a);
}

.bili-popover-item.is-active {
  background: rgba(2, 132, 199, 0.08);
  color: #0284c7;
  font-weight: 600;
}

.bili-popover-check {
  font-size: 11px;
}

.bili-popover-empty {
  padding: 8px;
  font-size: 11px;
  color: var(--muted, #64748b);
  text-align: center;
}

/* 方案 A：药丸胶囊平铺 */
.bili-pills-loading {
  font-size: 11px;
  color: var(--muted, #64748b);
  padding: 4px 0;
}

.bili-pills-container {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  max-height: 110px;
  overflow-y: auto;
  padding: 2px 0;
}

.bili-pill-chip {
  padding: 4px 10px;
  border-radius: 999px;
  border: 1px solid var(--border, rgba(0, 0, 0, 0.12));
  background: var(--panel, #ffffff);
  color: var(--muted, #64748b);
  font-size: 11px;
  cursor: pointer;
  transition: all 0.15s;
  white-space: nowrap;
}

.bili-pill-chip:hover:not(:disabled) {
  border-color: #0284c7;
  color: var(--heading, #0f172a);
}

.bili-pill-chip.is-active {
  background: #0284c7;
  border-color: #0284c7;
  color: #ffffff;
  font-weight: 600;
  box-shadow: 0 1px 3px rgba(2, 132, 199, 0.3);
}

.bili-task-feedback {
  font-size: 12px;
  line-height: 1.4;
  padding: 8px 10px;
  border-radius: 6px;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.25);
  color: #ef4444;
  margin: 0;
}

/* 表单主体 */
.bili-task-form fieldset {
  padding: 0;
  margin: 0;
  border: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.bili-field-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.bili-field-label {
  font-size: 11.5px;
  color: var(--muted, #64748b);
}

.bili-task-input {
  width: 100%;
  box-sizing: border-box;
  padding: 8px 10px;
  border: 1px solid var(--border, rgba(0, 0, 0, 0.12));
  background: var(--panel, #ffffff);
  color: var(--heading, #0f172a);
  border-radius: 6px;
  font-family: inherit;
  font-size: 12.5px;
  line-height: 1.45;
  resize: vertical;
  outline: none;
  transition: border-color 0.15s;
}

.bili-task-input:focus {
  border-color: #0284c7;
}

.bili-task-date-button {
  box-sizing: border-box;
  padding: 7px 10px;
  border: 1px solid var(--border, rgba(0, 0, 0, 0.12));
  background: var(--panel, #ffffff);
  color: var(--heading, #0f172a);
  border-radius: 6px;
  font-size: 12px;
  text-align: left;
  cursor: pointer;
  transition: all 0.15s;
}

.bili-task-date-button:hover {
  background: var(--surface-hover, rgba(0, 0, 0, 0.04));
  border-color: var(--border, rgba(0, 0, 0, 0.2));
}

.bili-task-local-note {
  font-size: 11px;
  color: var(--muted, #64748b);
  line-height: 1.4;
  margin: 0;
}

.bili-task-submit-btn {
  padding: 8px 12px;
  border-radius: 6px;
  border: none;
  background: #0284c7;
  color: #ffffff;
  font-size: 12.5px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.15s;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.bili-task-submit-btn:hover:not(:disabled) {
  background: #0369a1;
}

.bili-task-submit-btn:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}
</style>
