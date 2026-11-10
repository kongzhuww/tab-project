<template>
  <Teleport to="body">
    <div v-if="state.isOpen && repository" class="gh-task-modal-overlay">
      <aside
        ref="windowRef"
        class="gh-task-window"
        :style="pos ? { position: 'fixed', left: `${pos.x}px`, top: `${pos.y}px`, margin: '0' } : {}"
        role="dialog"
        aria-modal="false"
        aria-label="仓库关联任务与创建栏"
      >
        <header class="gh-task-header" @mousedown="onHeaderMouseDown">
          <div class="gh-task-header-title">
            <span class="gh-task-badge">🐙 仓库任务</span>
            <small>关联当前 GitHub 仓库</small>
          </div>
          <div class="gh-task-header-actions">
            <button
              type="button"
              class="gh-task-close-btn"
              :disabled="githubTaskCreation.saving"
              title="关闭 (Esc)"
              @click="controller.close"
            >
              ✕
            </button>
          </div>
        </header>

        <div class="gh-task-body">
          <div class="repository-reference">
            <span>◇</span>
            <div>
              <strong>{{ repository.fullName }}</strong>
              <small>{{ repository.description || '创建后自动关联此仓库' }}</small>
            </div>
          </div>

          <!-- 项目与分组选择器 (采用现代化自定义下拉菜单) -->
          <div class="task-destination-selector">
            <div class="selector-field">
              <span class="selector-title">📁 目标项目</span>
              <CustomSelect
                v-model="selectedProjectId"
                :options="projectOptions"
                :disabled="githubTaskCreation.saving || loadingProjects"
                :placeholder="loadingProjects ? '正在加载项目…' : '选择项目'"
                @change="onProjectChange"
              />
            </div>

            <div class="selector-field">
              <span class="selector-title">📑 目标分组 (板块)</span>
              <CustomSelect
                v-model="selectedSectionId"
                :options="sectionOptions"
                :disabled="githubTaskCreation.saving || loadingSections"
                :placeholder="loadingSections ? '正在加载板块…' : '(无分组 / 默认项目根)'"
                @change="onSectionChange"
              />
            </div>
          </div>

          <!-- 错误反馈 -->
          <p v-if="error" class="task-feedback" role="alert">{{ error }}</p>

          <!-- 创建回执与重试 -->
          <section v-if="attempt" class="task-receipt">
            <template v-if="attempt.taskId">
              <strong>任务已创建</strong>
              <p>{{ attempt.content }}</p>
              <button
                type="button"
                class="task-open-link"
                :disabled="githubTaskCreation.saving"
                @click="openCreatedTask(attempt.taskId!)"
              >在插件中打开任务 →</button>
              <TaskRepositoryLinks :task-id="attempt.taskId" />
              <button
                v-if="!linked"
                type="button"
                :disabled="githubTaskCreation.saving"
                @click="repairLink"
              >仅重试仓库关联</button>
              <button v-else type="button" @click="startAnother">继续创建</button>
            </template>
            <template v-else>
              <strong>{{ githubTaskCreation.saving ? '正在创建任务…' : '上次提交结果未确认' }}</strong>
              <p>{{ attempt.content }}</p>
              <small v-if="githubTaskCreation.saving">正在提交至“{{ attempt.target.title }}”，请稍候。</small>
              <template v-else>
                <small>请先在 Todoist 核对“{{ attempt.target.title }}”。未自动重新提交，避免重复创建。</small>
                <button type="button" @click="acknowledge">我已核对，允许新建</button>
              </template>
            </template>
          </section>

          <!-- 任务创建表单 -->
          <form v-else @submit.prevent="submit">
            <fieldset :disabled="githubTaskCreation.saving || unreadable">
              <label>
                任务名称
                <textarea
                  v-model="content"
                  rows="2"
                  maxlength="500"
                  placeholder="要在这个仓库上做什么？"
                  required
                />
              </label>
              <label>
                描述
                <textarea
                  v-model="description"
                  rows="3"
                  maxlength="16000"
                  placeholder="记录目标、步骤或想法（可选）"
                />
              </label>
              <label>截止日期</label>
              <button
                ref="dateAnchor"
                type="button"
                class="task-date-button"
                @click="dateOpen = !dateOpen"
              >▦ {{ dueDate ? dueDate + (dueTime ? ' ' + dueTime : '') : '添加日期与时间' }}</button>
              <TodoistDatePickerPopover
                v-if="dateOpen"
                v-model="dueDate"
                v-model:time-value="dueTime"
                :anchor-el="dateAnchor"
                @time-validity="timeValid = $event"
                @close="dateOpen = false; timeValid = true"
              />
              <p class="task-local-note">任务名称、描述和截止日期提交至 Todoist；关联仓库双向保存在本机。</p>
              <button
                type="submit"
                class="create-task"
                :disabled="!content.trim() || !selectedProjectId || !timeValid || loadingProjects"
              >{{ githubTaskCreation.saving ? '正在创建…' : '创建任务' }}</button>
            </fieldset>
          </form>
        </div>
      </aside>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import { githubTaskModalState as state, githubTaskModalController as controller } from './github-task-modal-store';
import { todoistService, type TodoistRawProject, type TodoistRawSection } from '../services/todoist.service';
import { notifications } from '../sdk/notifications';
import { withTodoistWrite, todoistModuleState } from '../todoist/module-state';
import { todoistTaskListController } from '../todoist/task-list-store';
import { attachRepository, readRepositoryLinks, type RepositoryLink } from '../todoist/repository-links';
import { githubTaskCreation, type GitHubTaskTarget } from '../todoist/github-task-target';
import { openTodoistTask } from '../todoist/task-navigation';
import TaskRepositoryLinks from '../todoist/TaskRepositoryLinks.vue';
import TodoistDatePickerPopover from '../todoist/TodoistDatePickerPopover.vue';
import CustomSelect, { type CustomSelectOption } from '../core/CustomSelect.vue';
import { t } from '../i18n';

const repository = computed(() => state.repository);

const windowRef = ref<HTMLElement | null>(null);
const pos = ref<{ x: number; y: number } | null>(null);
let isDragging = false;
let startMouseX = 0;
let startMouseY = 0;
let startPosX = 0;
let startPosY = 0;

const projects = ref<TodoistRawProject[]>([]);
const sections = ref<TodoistRawSection[]>([]);
const selectedProjectId = ref('');
const selectedSectionId = ref('');
const loadingProjects = ref(false);
const loadingSections = ref(false);

const content = ref('');
const description = ref('');
const dueDate = ref('');
const dueTime = ref('');
const dateAnchor = ref<HTMLElement | null>(null);
const dateOpen = ref(false);
const timeValid = ref(true);
const error = ref('');
const unreadable = ref(false);
const linked = ref(false);

interface Attempt {
  requestId: string;
  repository: RepositoryLink;
  target: GitHubTaskTarget;
  content: string;
  taskId?: string;
}

const attempt = ref<Attempt | null>(null);
const key = computed(() => 'github_task_attempt_v1:' + (repository.value?.fullName.toLowerCase() || ''));

function isInboxProject(p: TodoistRawProject): boolean {
  return Boolean(p.inbox_project || p.is_inbox_project || /^(Inbox|收件箱)$/i.test(p.name.trim()));
}

function getProjectDisplayName(p: TodoistRawProject): string {
  if (isInboxProject(p)) {
    return t('todoist.inbox') || '收件箱';
  }
  return p.name;
}

const selectedProjectName = computed(() => {
  const p = projects.value.find(p => String(p.id) === selectedProjectId.value);
  return p ? getProjectDisplayName(p) : '未命名项目';
});

const selectedSectionName = computed(() => {
  if (!selectedSectionId.value) return '';
  return sections.value.find(s => String(s.id) === selectedSectionId.value)?.name || '';
});

const projectOptions = computed<CustomSelectOption[]>(() => {
  return projects.value.map(p => ({
    value: String(p.id),
    label: getProjectDisplayName(p),
    icon: isInboxProject(p) ? '📥' : '📁'
  }));
});

const sectionOptions = computed<CustomSelectOption[]>(() => {
  const list: CustomSelectOption[] = [
    { value: '', label: '(无分组 / 默认项目根)', icon: '📑' }
  ];
  sections.value.forEach(s => {
    list.push({
      value: String(s.id),
      label: s.name,
      icon: '📑'
    });
  });
  return list;
});

async function loadProjectsAndSections() {
  loadingProjects.value = true;
  try {
    const rawProjects = await todoistService.getProjects();
    projects.value = (rawProjects || []).filter(p => !p.is_deleted && !p.is_archived);

    const lastProjectId = localStorage.getItem('github_task_last_project_id');
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
    error.value = '加载 Todoist 项目失败: ' + (err?.message || '请检查登录状态');
  } finally {
    loadingProjects.value = false;
  }
}

async function loadSectionsForProject(projId: string) {
  loadingSections.value = true;
  try {
    const rawSections = await todoistService.getSections(projId);
    sections.value = (rawSections || []).filter(s => Boolean(s && s.id && s.name));

    const lastSectionId = localStorage.getItem('github_task_last_section_id');
    if (lastSectionId && sections.value.some(s => String(s.id) === lastSectionId)) {
      selectedSectionId.value = lastSectionId;
    } else {
      selectedSectionId.value = '';
    }
  } catch {
    sections.value = [];
    selectedSectionId.value = '';
  } finally {
    loadingSections.value = false;
  }
}

async function onProjectChange(id: string | number) {
  selectedProjectId.value = String(id);
  localStorage.setItem('github_task_last_project_id', selectedProjectId.value);
  selectedSectionId.value = '';
  localStorage.removeItem('github_task_last_section_id');
  await loadSectionsForProject(selectedProjectId.value);
}

function onSectionChange(id: string | number) {
  selectedSectionId.value = String(id);
  if (selectedSectionId.value) {
    localStorage.setItem('github_task_last_section_id', selectedSectionId.value);
  } else {
    localStorage.removeItem('github_task_last_section_id');
  }
}

function restoreAttempt() {
  if (!key.value) return;
  try {
    const raw = localStorage.getItem(key.value);
    if (!raw) return;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed.requestId !== 'string' || typeof parsed.content !== 'string' || !parsed.target || typeof parsed.target.title !== 'string' || parsed.repository?.fullName !== repository.value?.fullName || (parsed.taskId !== undefined && typeof parsed.taskId !== 'string')) throw new Error();
    attempt.value = parsed;
    if (parsed.taskId && repository.value) linked.value = readRepositoryLinks(parsed.taskId).some(repo => repo.fullName.toLowerCase() === repository.value!.fullName.toLowerCase());
  } catch {
    unreadable.value = true;
    error.value = '上次提交记录不可读，为避免重复创建已暂停。未覆盖记录。';
  }
}

watch(() => [state.isOpen, state.repository], ([open, repo]) => {
  if (open && repo) {
    const r = repo as RepositoryLink;
    content.value = '';
    description.value = `GitHub 仓库: https://github.com/${r.fullName}\n${r.description || ''}`.trim();
    dueDate.value = '';
    dueTime.value = '';
    error.value = '';
    attempt.value = null;
    restoreAttempt();
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
    if (targetEl?.closest(".fo-cover-context-menu, .todoist-date-picker-popover")) return;
    controller.close();
  }
}

async function submit() {
  if (githubTaskCreation.saving || attempt.value || unreadable.value || !content.value.trim() || !selectedProjectId.value || !timeValid.value || !repository.value) return;

  const projId = selectedProjectId.value;
  const secId = selectedSectionId.value || undefined;
  const currentRepo = { ...repository.value };
  const targetTitle = selectedProjectName.value + (selectedSectionName.value ? ' / ' + selectedSectionName.value : '');

  const payload = {
    content: content.value.trim(),
    description: description.value.trim(),
    project_id: projId,
    section_id: secId,
    due_string: dueDate.value ? dueDate.value + (dueTime.value ? ' ' + dueTime.value : '') : undefined
  };

  githubTaskCreation.saving = true;
  error.value = '';

  try {
    if (!navigator.locks) throw new Error('当前环境不支持跨标签页提交保护，尚未发送。');
    await navigator.locks.request(key.value, { ifAvailable: true }, async lock => {
      if (!lock) throw new Error('另一个标签页正在创建这个仓库的任务，请稍后核对。');
      restoreAttempt();
      if (attempt.value || unreadable.value) return;

      await withTodoistWrite(async () => {
        const token = await todoistService.initToken();
        if (document.hidden || !token || token !== todoistService.getToken()) {
          throw new Error('Todoist 未登录或 Token 已变更，请检查账号设置。');
        }

        const record: Attempt = {
          requestId: crypto.randomUUID(),
          repository: currentRepo,
          target: { projectId: projId, sectionId: secId || '', title: targetTitle },
          content: payload.content
        };

        localStorage.setItem(key.value, JSON.stringify(record));
        attempt.value = record;

        try {
          const created = await todoistService.createTask(payload, record.requestId);
          if (!created || typeof created.id !== 'string') throw new Error('创建任务返回数据异常');
          record.taskId = created.id;
          attempt.value = { ...record };
          try {
            localStorage.setItem(key.value, JSON.stringify(record));
          } catch {
            error.value = '任务已创建，但本机回执保存失败；不要重复创建。';
          }
          todoistService.invalidateWorkspaceSnapshots();
          repairLink();
          notifications.show({
            appName: 'Todoist',
            appType: 'todoist',
            title: '任务已创建',
            message: record.content,
            level: 'success',
            history: true,
            target: { type: 'todoist-task', taskId: created.id },
            actionLabel: '打开任务',
            duration: 7000
          });
          if (todoistModuleState.active) {
            void todoistTaskListController.loadWorkspace(undefined, undefined, true);
          }
        } catch {
          error.value = attempt.value?.taskId
            ? '任务已创建，但后续界面更新未完成；不要重复创建。'
            : '创建结果未确认，请核对 Todoist。已保留提交记录，未自动重试。';
        }
      });
    });
  } catch (failure) {
    error.value = failure instanceof Error && !attempt.value ? failure.message : '提交记录保存失败，尚未发送创建请求。';
  } finally {
    githubTaskCreation.saving = false;
  }
}

function repairLink() {
  const record = attempt.value;
  if (!record?.taskId) return;
  try {
    attachRepository(record.taskId, record.repository);
    linked.value = true;
  } catch {
    linked.value = false;
    error.value = '任务已创建，但关联仓库本地保存失败；可稍后在任务中手动添加。';
  }
}

function acknowledge() {
  if (githubTaskCreation.saving || !attempt.value) return;
  try {
    localStorage.removeItem(key.value);
    attempt.value = null;
    error.value = '';
    content.value = '';
    description.value = '';
  } catch {
    error.value = '确认记录移除失败，请检查浏览器存储；已保留记录。';
  }
}

function startAnother() {
  acknowledge();
}

function openCreatedTask(taskId: string) {
  openTodoistTask(taskId);
  controller.close();
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
.gh-task-modal-overlay {
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

.gh-task-window {
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

.gh-task-header {
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

.gh-task-header:active {
  cursor: grabbing;
}

.gh-task-header-title {
  display: flex;
  align-items: center;
  gap: 8px;
}

.gh-task-badge {
  font-size: 13px;
  font-weight: 600;
  color: var(--heading, #0f172a);
}

.gh-task-header-title small {
  font-size: 11px;
  color: var(--muted, #64748b);
}

.gh-task-close-btn {
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

.gh-task-close-btn:hover {
  background: var(--surface-hover, rgba(0, 0, 0, 0.06));
  color: var(--heading, #0f172a);
}

.gh-task-body {
  padding: 14px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: var(--panel, #ffffff);
}

.task-create-heading {
  margin: 6px 0 0;
  font-size: 12.5px;
  font-weight: 600;
  color: var(--heading, #0f172a);
}

.repository-reference {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 8px 10px;
  background: var(--surface, rgba(0, 0, 0, 0.03));
  border: 1px solid var(--border, rgba(0, 0, 0, 0.08));
  border-radius: 8px;
  font-size: 12px;
}

.repository-reference span {
  color: #0284c7;
  font-weight: bold;
}

.repository-reference strong {
  display: block;
  overflow-wrap: anywhere;
  color: var(--heading, #0f172a);
  font-size: 12px;
}

.repository-reference small {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-top: 2px;
  line-height: 1.45;
  color: var(--muted, #64748b);
  font-size: 11px;
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

.task-receipt {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 10px;
  border-radius: 8px;
  background: var(--surface, rgba(0, 0, 0, 0.03));
  border: 1px solid var(--border, rgba(0, 0, 0, 0.08));
}

.task-receipt strong {
  font-size: 12.5px;
  color: var(--heading, #0f172a);
}

.task-receipt p {
  margin: 0;
  font-size: 12px;
  color: var(--text, #1e293b);
}

.task-receipt button {
  padding: 6px 10px;
  border-radius: 6px;
  border: 1px solid var(--border);
  background: var(--panel);
  color: var(--heading);
  cursor: pointer;
  font-size: 11.5px;
}
</style>
