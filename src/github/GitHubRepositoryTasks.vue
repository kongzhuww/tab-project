<template>
  <aside class="github-repository-tasks" aria-label="仓库关联任务与创建栏">
    <header>
      <div>
        <strong>仓库任务</strong>
        <small>关联当前 GitHub 仓库</small>
      </div>
      <button
        type="button"
        :disabled="githubTaskCreation.saving"
        aria-label="收起任务栏"
        @click="emit('close')"
      >×</button>
    </header>

    <div class="task-pane-content">
      <!-- 已关联的任务列表 -->
      <GitHubRepositoryLinkedTasks
        :repository-name="repository.fullName"
        :disabled="githubTaskCreation.saving"
        @open-task="emit('openTask', $event)"
      />

      <h3 class="task-create-heading">创建任务</h3>

      <div class="repository-reference">
        <span>◇</span>
        <div>
          <strong>{{ repository.fullName }}</strong>
          <small>{{ repository.description || '创建后自动关联此仓库' }}</small>
        </div>
      </div>

      <!-- 项目与分组选择器 (自由选择目标 Project 与 Section) -->
      <div class="task-destination-selector">
        <div class="selector-field">
          <label class="selector-label" for="task-dest-project">
            <span class="selector-title">📁 目标项目</span>
          </label>
          <select
            id="task-dest-project"
            v-model="selectedProjectId"
            class="task-project-select"
            :disabled="githubTaskCreation.saving || loadingProjects"
            @change="onProjectChange"
          >
            <option v-if="loadingProjects" value="" disabled>正在加载 Todoist 项目…</option>
            <option v-else-if="!projects.length" value="" disabled>未找到可用项目，请检查登录</option>
            <option
              v-for="p in projects"
              :key="p.id"
              :value="String(p.id)"
            >
              {{ p.name }}
            </option>
          </select>
        </div>

        <div class="selector-field">
          <label class="selector-label" for="task-dest-section">
            <span class="selector-title">📑 目标分组 (板块)</span>
          </label>
          <select
            id="task-dest-section"
            v-model="selectedSectionId"
            class="task-section-select"
            :disabled="githubTaskCreation.saving || loadingSections"
            @change="onSectionChange"
          >
            <option value="">(无分组 / 默认项目根)</option>
            <option v-if="loadingSections" value="" disabled>正在加载板块分组…</option>
            <option
              v-for="s in sections"
              :key="s.id"
              :value="String(s.id)"
            >
              {{ s.name }}
            </option>
          </select>
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
            @click="emit('openTask', attempt.taskId)"
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
              rows="4"
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
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { todoistService, type TodoistRawProject, type TodoistRawSection } from '../services/todoist.service';
import { notifications } from '../sdk/notifications';
import { withTodoistWrite, todoistModuleState } from '../todoist/module-state';
import { todoistTaskListController } from '../todoist/task-list-store';
import { attachRepository, readRepositoryLinks, type RepositoryLink } from '../todoist/repository-links';
import { githubTaskCreation, type GitHubTaskTarget } from '../todoist/github-task-target';
import TaskRepositoryLinks from '../todoist/TaskRepositoryLinks.vue';
import TodoistDatePickerPopover from '../todoist/TodoistDatePickerPopover.vue';
import GitHubRepositoryLinkedTasks from './GitHubRepositoryLinkedTasks.vue';

const props = defineProps<{ repository: RepositoryLink }>();
const emit = defineEmits<{ close: []; openTask: [taskId: string] }>();

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
const key = 'github_task_attempt_v1:' + props.repository.fullName.toLowerCase();

const selectedProjectName = computed(() => {
  return projects.value.find(p => String(p.id) === selectedProjectId.value)?.name || '未命名项目';
});

const selectedSectionName = computed(() => {
  if (!selectedSectionId.value) return '';
  return sections.value.find(s => String(s.id) === selectedSectionId.value)?.name || '';
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

async function onProjectChange() {
  if (!selectedProjectId.value) return;
  localStorage.setItem('github_task_last_project_id', selectedProjectId.value);
  selectedSectionId.value = '';
  localStorage.removeItem('github_task_last_section_id');
  await loadSectionsForProject(selectedProjectId.value);
}

function onSectionChange() {
  if (selectedSectionId.value) {
    localStorage.setItem('github_task_last_section_id', selectedSectionId.value);
  } else {
    localStorage.removeItem('github_task_last_section_id');
  }
}

function restoreAttempt() {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed.requestId !== 'string' || typeof parsed.content !== 'string' || !parsed.target || typeof parsed.target.title !== 'string' || parsed.repository?.fullName !== props.repository.fullName || (parsed.taskId !== undefined && typeof parsed.taskId !== 'string')) throw new Error();
    attempt.value = parsed;
    if (parsed.taskId) linked.value = readRepositoryLinks(parsed.taskId).some(repo => repo.fullName.toLowerCase() === props.repository.fullName.toLowerCase());
  } catch {
    unreadable.value = true;
    error.value = '上次提交记录不可读，为避免重复创建已暂停。未覆盖记录。';
  }
}

onMounted(() => {
  restoreAttempt();
  void loadProjectsAndSections();
});

async function submit() {
  if (githubTaskCreation.saving || attempt.value || unreadable.value || !content.value.trim() || !selectedProjectId.value || !timeValid.value) return;

  const projId = selectedProjectId.value;
  const secId = selectedSectionId.value || undefined;
  const repository = { ...props.repository };
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
    await navigator.locks.request(key, { ifAvailable: true }, async lock => {
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
          repository,
          target: { projectId: projId, sectionId: secId || '', title: targetTitle },
          content: payload.content
        };

        localStorage.setItem(key, JSON.stringify(record));
        attempt.value = record;

        try {
          const created = await todoistService.createTask(payload, record.requestId);
          if (!created || typeof created.id !== 'string') throw new Error('创建任务返回数据异常');
          record.taskId = created.id;
          attempt.value = { ...record };
          try {
            localStorage.setItem(key, JSON.stringify(record));
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
    if (error.value.startsWith('任务已创建，但仓库卡片保存失败')) error.value = '';
  } catch {
    error.value = '任务已创建，但仓库卡片保存失败。可仅重试关联，不会再创建任务。';
  }
}

function startAnother() {
  attempt.value = null;
  content.value = '';
  description.value = '';
  dueDate.value = '';
  dueTime.value = '';
  linked.value = false;
  localStorage.removeItem(key);
}

function acknowledge() {
  attempt.value = null;
  localStorage.removeItem(key);
}
</script>

<style scoped>
.github-repository-tasks {
  display: flex;
  flex-direction: column;
  width: min(340px, 92vw);
  background: var(--surface, #ffffff);
  border-left: 1px solid var(--border, rgba(0, 0, 0, 0.12));
  color: var(--text, #334155);
}

header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 14px;
  border-bottom: 1px solid var(--border, rgba(0, 0, 0, 0.08));
}

header strong {
  display: block;
  font-size: 13px;
  color: var(--heading, #0f172a);
}

header small {
  font-size: 11px;
  color: var(--muted, #64748b);
}

header button {
  width: 24px;
  height: 24px;
  border: 0;
  background: transparent;
  color: var(--muted, #64748b);
  font-size: 16px;
  cursor: pointer;
  border-radius: 4px;
}

header button:hover {
  background: var(--surface-hover, rgba(0, 0, 0, 0.05));
  color: var(--heading, #0f172a);
}

.task-pane-content {
  flex: 1;
  overflow-y: auto;
  padding: 14px;
}

.task-create-heading {
  margin: 14px 0 8px;
  font-size: 13px;
  font-weight: 700;
  color: var(--heading, #0f172a);
}

.repository-reference {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 8px 10px;
  background: var(--panel, #f8fafc);
  border: 1px solid var(--border, rgba(0, 0, 0, 0.08));
  border-radius: 6px;
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
  font-size: 12.5px;
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
  margin: 10px 0 12px;
  padding: 10px 12px;
  background: var(--panel, #f8fafc);
  border: 1px solid var(--border, rgba(0, 0, 0, 0.08));
  border-radius: 6px;
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

.task-project-select,
.task-section-select {
  width: 100%;
  box-sizing: border-box;
  padding: 6px 8px;
  border-radius: 5px;
  border: 1px solid var(--border, rgba(0, 0, 0, 0.12));
  background: var(--surface, #ffffff);
  color: var(--heading, #0f172a);
  font-size: 12px;
  outline: none;
  cursor: pointer;
  transition: border-color 0.15s;
}

.task-project-select:focus,
.task-section-select:focus {
  border-color: #0284c7;
}

.task-feedback {
  font-size: 12px;
  line-height: 1.5;
  padding: 8px;
  border: 1px solid var(--border, rgba(0, 0, 0, 0.1));
  border-radius: 6px;
  background: var(--panel, #f8fafc);
  color: #ef4444;
  margin: 8px 0;
}

fieldset {
  padding: 0;
  border: 0;
  margin: 10px 0 0;
  min-width: 0;
}

label {
  display: block;
  color: var(--muted, #64748b);
  font-size: 11.5px;
  margin: 0 0 10px;
}

textarea {
  display: block;
  box-sizing: border-box;
  width: 100%;
  resize: vertical;
  margin-top: 4px;
  padding: 8px;
  border: 1px solid var(--border, rgba(0, 0, 0, 0.12));
  border-radius: 6px;
  background: var(--surface, #ffffff);
  color: var(--heading, #0f172a);
  font: inherit;
  font-size: 12.5px;
  line-height: 1.5;
}

textarea:focus {
  outline: 1px solid #0284c7;
}

.task-date-button {
  width: 100%;
  text-align: left;
  padding: 7px 10px;
  background: var(--surface, #ffffff);
  border: 1px solid var(--border, rgba(0, 0, 0, 0.12));
  border-radius: 6px;
  color: var(--heading, #0f172a);
  font-size: 12px;
  cursor: pointer;
  margin-top: 4px;
}

.task-local-note {
  font-size: 10.5px;
  line-height: 1.5;
  color: var(--muted, #94a3b8);
  margin: 8px 0 12px;
}

.create-task {
  width: 100%;
  background: #0284c7;
  color: #ffffff;
  border: 0;
  border-radius: 6px;
  font-weight: 600;
  padding: 8px;
  font-size: 12.5px;
  cursor: pointer;
  transition: opacity 0.15s;
}

.create-task:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.create-task:not(:disabled):hover {
  opacity: 0.9;
}

.task-receipt {
  line-height: 1.6;
  overflow-wrap: anywhere;
  padding: 10px;
  background: var(--panel, #f8fafc);
  border: 1px solid var(--border, rgba(0, 0, 0, 0.08));
  border-radius: 6px;
  margin-top: 10px;
}

.task-open-link {
  padding: 0;
  border: 0;
  background: transparent;
  color: #0284c7;
  text-decoration: underline;
  text-underline-offset: 3px;
  cursor: pointer;
  font-size: 12px;
  margin: 6px 0;
  display: block;
}

.task-receipt small {
  display: block;
  color: var(--muted, #64748b);
  margin: 6px 0;
}
</style>
