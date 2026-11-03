<template>
  <Teleport to="body">
    <div v-if="state.isOpen && target" class="web-task-modal-overlay">
      <aside
        ref="windowRef"
        class="web-task-window"
        :style="pos ? { position: 'fixed', left: `${pos.x}px`, top: `${pos.y}px`, margin: '0' } : {}"
        role="dialog"
        aria-modal="false"
        :aria-label="'网站创建任务 - ' + target.title"
      >
        <!-- 1. 顶部标题栏（纯实体白底、可拖拽、带关闭按钮） -->
        <header class="web-task-header" @mousedown="onHeaderMouseDown">
          <div class="web-task-header-title">
            <span class="web-task-badge">{{ target.source === 'bookmark' ? '🔖 书签任务' : '🌐 网站任务' }}</span>
            <small>关联当前网页链接</small>
          </div>
          <div class="web-task-header-actions">
            <button
              type="button"
              class="web-task-close-btn"
              :disabled="isSubmitting"
              title="关闭视窗 (Esc)"
              @click="controller.close"
            >
              ✕
            </button>
          </div>
        </header>

        <!-- 2. 主体内容区 -->
        <div class="web-task-body">
          <!-- 网站信息预览卡片 -->
          <div class="website-preview-card">
            <img
              v-if="target.icon"
              :src="target.icon"
              alt=""
              class="website-preview-icon"
              @error="handleIconError"
            />
            <span v-else class="website-preview-fallback">🌐</span>
            <div class="website-preview-info">
              <strong class="website-preview-title" :title="target.title">{{ target.title || target.url }}</strong>
              <small class="website-preview-url" :title="target.url">{{ target.url }}</small>
              <div v-if="target.note" class="website-preview-note">备注: {{ target.note }}</div>
            </div>
          </div>

          <!-- 目标项目与分组选择器 (与 GitHub/B站 保持完全一致的现代化设计) -->
          <div class="task-destination-selector">
            <div class="selector-field">
              <span class="selector-title">📁 目标项目</span>
              <CustomSelect
                v-model="selectedProjectId"
                :options="projectOptions"
                :disabled="isSubmitting || loadingProjects"
                :placeholder="loadingProjects ? '正在加载项目…' : '选择项目'"
                @change="onProjectChange"
              />
            </div>

            <div class="selector-field">
              <span class="selector-title">📑 目标分组 (板块)</span>
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
          <p v-if="error" class="task-feedback" role="alert">{{ error }}</p>

          <!-- 创建表单 -->
          <form @submit.prevent="submit">
            <fieldset :disabled="isSubmitting">
              <label>
                任务名称
                <textarea
                  v-model="content"
                  rows="2"
                  maxlength="500"
                  placeholder="关于这个网站需要做什么？"
                  required
                />
              </label>

              <label>
                描述
                <textarea
                  v-model="description"
                  rows="3"
                  maxlength="16000"
                  placeholder="记录网页内容、目标或备注（可选）"
                />
              </label>

              <label>截止日期</label>
              <button
                ref="dateAnchor"
                type="button"
                class="task-date-button"
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

              <p class="task-local-note">
                任务提交至 Todoist，网站链接与标题将写入任务描述，便于在看板和详情中直接点击访问。
              </p>

              <button
                type="submit"
                class="create-task"
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

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from "vue";
import { webSiteTaskState as state, webSiteTaskController as controller } from "./web-task-store";
import { todoistService, type TodoistRawProject, type TodoistRawSection } from "../services/todoist.service";
import { notifications } from "../sdk/notifications";
import { withTodoistWrite, todoistModuleState } from "../todoist/module-state";
import { todoistTaskListController } from "../todoist/task-list-store";
import CustomSelect, { type CustomSelectOption } from "../core/CustomSelect.vue";
import TodoistDatePickerPopover from "../todoist/TodoistDatePickerPopover.vue";

const target = computed(() => state.target);

const windowRef = ref<HTMLElement | null>(null);
const pos = ref<{ x: number; y: number } | null>(null);
let isDragging = false;
let startMouseX = 0;
let startMouseY = 0;
let startPosX = 0;
let startPosY = 0;

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

const projectOptions = computed<CustomSelectOption[]>(() => {
  return projects.value.map(p => ({
    value: String(p.id),
    label: p.name,
    icon: "📁"
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

async function loadProjectsAndSections() {
  loadingProjects.value = true;
  try {
    const rawProjects = await todoistService.getProjects();
    projects.value = (rawProjects || []).filter(p => !p.is_deleted && !p.is_archived);

    const lastProjectId = localStorage.getItem("web_task_last_project_id") || localStorage.getItem("github_task_last_project_id");
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

    const lastSectionId = localStorage.getItem("web_task_last_section_id");
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

async function onProjectChange(id: string | number) {
  selectedProjectId.value = String(id);
  localStorage.setItem("web_task_last_project_id", selectedProjectId.value);
  selectedSectionId.value = "";
  localStorage.removeItem("web_task_last_section_id");
  await loadSectionsForProject(selectedProjectId.value);
}

function onSectionChange(id: string | number) {
  selectedSectionId.value = String(id);
  if (selectedSectionId.value) {
    localStorage.setItem("web_task_last_section_id", selectedSectionId.value);
  } else {
    localStorage.removeItem("web_task_last_section_id");
  }
}

function handleIconError(event: Event) {
  const targetEl = event.target as HTMLImageElement;
  if (targetEl) targetEl.style.display = "none";
}

watch(() => [state.isOpen, state.target], ([open, item]) => {
  if (open && item) {
    const t = item as any;
    content.value = t.title ? `浏览: ${t.title}` : `访问: ${t.url}`;
    const descParts: string[] = [];
    if (t.url) descParts.push(`网址: ${t.url}`);
    if (t.note) descParts.push(`备注: ${t.note}`);
    if (t.category) descParts.push(`分类: ${t.category}`);
    description.value = descParts.join("\n").trim();

    dueDate.value = "";
    dueTime.value = "";
    error.value = "";
    void loadProjectsAndSections();
  }
}, { immediate: true });

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
    if (targetEl?.closest(".folder-menu, .bookmark-note-menu, .todoist-date-picker-popover")) return;
    controller.close();
  }
}

async function submit() {
  if (isSubmitting.value || !content.value.trim() || !selectedProjectId.value || !timeValid.value || !target.value) return;

  const projId = selectedProjectId.value;
  const secId = selectedSectionId.value || undefined;
  const taskContent = content.value.trim();
  const taskDescription = description.value.trim();

  isSubmitting.value = true;
  error.value = "";

  try {
    await withTodoistWrite(async () => {
      const token = await todoistService.initToken();
      if (!token) {
        throw new Error("Todoist 未登录，请先在设置中绑定或登录 Todoist。");
      }

      const payload = {
        content: taskContent,
        description: taskDescription,
        project_id: projId,
        section_id: secId,
        due_string: dueDate.value ? dueDate.value + (dueTime.value ? " " + dueTime.value : "") : undefined
      };

      const created = await todoistService.createTask(payload);
      if (!created || typeof created.id !== "string") {
        throw new Error("创建任务返回数据异常");
      }

      todoistService.invalidateWorkspaceSnapshots();
      notifications.show({
        appName: "Todoist",
        appType: "todoist",
        title: "任务已创建",
        message: taskContent,
        level: "success",
        history: true,
        target: { type: "todoist-task", taskId: created.id },
        actionLabel: "打开任务",
        duration: 7000
      });

      if (todoistModuleState.active) {
        void todoistTaskListController.loadWorkspace(undefined, undefined, true);
      }

      controller.close();
    });
  } catch (err: any) {
    error.value = err?.message || "创建任务失败，请重试";
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

<style scoped>
/* 无模态纯净浮动视窗：0 遮罩背景，穿透底座，支持自由拖动 */
.web-task-modal-overlay {
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

.web-task-window {
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

.web-task-header {
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

.web-task-header:active {
  cursor: grabbing;
}

.web-task-header-title {
  display: flex;
  align-items: center;
  gap: 8px;
}

.web-task-badge {
  font-size: 13px;
  font-weight: 600;
  color: var(--heading, #0f172a);
}

.web-task-header-title small {
  font-size: 11px;
  color: var(--muted, #64748b);
}

.web-task-close-btn {
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

.web-task-close-btn:hover {
  background: var(--surface-hover, rgba(0, 0, 0, 0.06));
  color: var(--heading, #0f172a);
}

.web-task-body {
  padding: 14px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: var(--panel, #ffffff);
}

/* 网站信息卡片 */
.website-preview-card {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 10px;
  background: var(--surface, rgba(0, 0, 0, 0.03));
  border: 1px solid var(--border, rgba(0, 0, 0, 0.08));
  border-radius: 8px;
}

.website-preview-icon {
  width: 28px;
  height: 28px;
  border-radius: 6px;
  flex-shrink: 0;
  object-fit: contain;
}

.website-preview-fallback {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  flex-shrink: 0;
}

.website-preview-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
  flex: 1;
}

.website-preview-title {
  font-size: 13px;
  font-weight: 600;
  color: var(--heading, #0f172a);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.website-preview-url {
  font-size: 11px;
  color: var(--muted, #64748b);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.website-preview-note {
  font-size: 11px;
  color: #0284c7;
  margin-top: 2px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* 目标项目与分组选择器 */
.task-destination-selector {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px 10px;
  background: var(--surface, rgba(0, 0, 0, 0.03));
  border: 1px solid var(--border, rgba(0, 0, 0, 0.08));
  border-radius: 8px;
}

.selector-field {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.selector-title {
  font-size: 11px;
  font-weight: 600;
  color: var(--muted, #64748b);
}

.task-feedback {
  font-size: 12px;
  line-height: 1.5;
  padding: 8px 10px;
  border-radius: 6px;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.25);
  color: #ef4444;
  margin: 0;
}

fieldset {
  padding: 0;
  border: 0;
  margin: 0;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

label {
  display: block;
  color: var(--muted, #64748b);
  font-size: 11.5px;
}

textarea {
  display: block;
  box-sizing: border-box;
  width: 100%;
  resize: vertical;
  margin-top: 4px;
  padding: 8px 10px;
  border: 1px solid var(--border, rgba(0, 0, 0, 0.12));
  border-radius: 6px;
  background: var(--panel, #ffffff);
  color: var(--heading, #0f172a);
  font: inherit;
  font-size: 12.5px;
  line-height: 1.45;
  outline: none;
  transition: border-color 0.15s;
}

textarea:focus {
  border-color: #0284c7;
}

.task-date-button {
  width: 100%;
  text-align: left;
  padding: 7px 10px;
  background: var(--panel, #ffffff);
  border: 1px solid var(--border, rgba(0, 0, 0, 0.12));
  border-radius: 6px;
  color: var(--heading, #0f172a);
  font-size: 12px;
  cursor: pointer;
  margin-top: 4px;
  transition: all 0.15s;
}

.task-date-button:hover {
  background: var(--surface-hover, rgba(0, 0, 0, 0.04));
  border-color: var(--border, rgba(0, 0, 0, 0.2));
}

.task-local-note {
  font-size: 11px;
  line-height: 1.4;
  color: var(--muted, #64748b);
  margin: 0;
}

.create-task {
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

.create-task:hover:not(:disabled) {
  background: #0369a1;
}

.create-task:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}
</style>
