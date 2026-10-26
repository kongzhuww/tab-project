<template>
  <aside class="github-repository-tasks" aria-label="仓库关联任务与创建栏">
    <header><div><strong>仓库任务</strong><small>关联当前 GitHub 仓库</small></div><button type="button" :disabled="githubTaskCreation.saving" aria-label="收起任务栏" @click="emit('close')">×</button></header>
    <div class="task-pane-content">
      <GitHubRepositoryLinkedTasks :repository-name="repository.fullName" :disabled="githubTaskCreation.saving" @open-task="emit('openTask', $event)" />
      <h3 class="task-create-heading">创建任务</h3>
      <div class="repository-reference"><span>◇</span><div><strong>{{ repository.fullName }}</strong><small>{{ repository.description || '创建后自动关联此仓库' }}</small></div></div>
      <p v-if="!target" class="task-guide">请先打开 Todoist，在目标分组的“更多”菜单中选择“设为 GitHub 任务区”。设置后即可在此创建。</p>
      <p v-else class="task-destination">创建到 <strong>{{ target.title }}</strong><small>Todoist 分组 · 仅本机选择</small></p>
      <p v-if="error" class="task-feedback" role="alert">{{ error }}</p>
      <section v-if="attempt" class="task-receipt">
        <template v-if="attempt.taskId">
          <strong>任务已创建</strong><p>{{ attempt.content }}</p>
          <button type="button" class="task-open-link" :disabled="githubTaskCreation.saving" @click="emit('openTask', attempt.taskId)">在插件中打开任务 →</button>
          <TaskRepositoryLinks :task-id="attempt.taskId" />
          <button v-if="!linked" type="button" :disabled="githubTaskCreation.saving" @click="repairLink">仅重试仓库关联</button>
          <button v-else type="button" @click="startAnother">继续创建</button>
        </template>
        <template v-else>
          <strong>{{ githubTaskCreation.saving ? '正在创建任务…' : '上次提交结果未确认' }}</strong><p>{{ attempt.content }}</p>
          <small v-if="githubTaskCreation.saving">正在提交至“{{ attempt.target.title }}”，请稍候。</small>
          <template v-else>
            <small>请先在 Todoist 核对原分组“{{ attempt.target.title }}”。未自动重新提交，避免重复创建。</small>
            <button type="button" @click="acknowledge">我已核对，允许新建</button>
          </template>
        </template>
      </section>
      <form v-else-if="target" @submit.prevent="submit">
        <fieldset :disabled="githubTaskCreation.saving || unreadable">
          <label>任务名称<textarea v-model="content" rows="2" maxlength="500" placeholder="要在这个仓库上做什么？" required /></label>
          <label>描述<textarea v-model="description" rows="4" maxlength="16000" placeholder="记录目标、步骤或想法（可选）" /></label>
          <label>截止日期</label>
          <button ref="dateAnchor" type="button" class="task-date-button" @click="dateOpen = !dateOpen">▦ {{ dueDate ? dueDate + (dueTime ? ' ' + dueTime : '') : '添加日期与时间' }}</button>
          <TodoistDatePickerPopover v-if="dateOpen" v-model="dueDate" v-model:time-value="dueTime" :anchor-el="dateAnchor" @time-validity="timeValid = $event" @close="dateOpen = false; timeValid = true" />
          <p class="task-local-note">名称、描述和截止日期提交至 Todoist；仓库卡片只保存在本插件。</p>
          <button type="submit" class="create-task" :disabled="!content.trim() || !timeValid">{{ githubTaskCreation.saving ? '正在创建…' : '创建任务' }}</button>
        </fieldset>
      </form>
    </div>
  </aside>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { todoistService } from '../services/todoist.service';
import { notifications } from '../sdk/notifications';
import { withTodoistWrite, todoistModuleState } from '../todoist/module-state';
import { todoistTaskListController } from '../todoist/task-list-store';
import { attachRepository, readRepositoryLinks, type RepositoryLink } from '../todoist/repository-links';
import { useGitHubTaskTarget, refreshGitHubTaskTarget, githubTaskCreation, type GitHubTaskTarget } from '../todoist/github-task-target';
import TaskRepositoryLinks from '../todoist/TaskRepositoryLinks.vue';
import TodoistDatePickerPopover from '../todoist/TodoistDatePickerPopover.vue';
import GitHubRepositoryLinkedTasks from './GitHubRepositoryLinkedTasks.vue';
const props = defineProps<{ repository: RepositoryLink }>();
const emit = defineEmits<{ close: []; openTask: [taskId: string] }>();
const target = useGitHubTaskTarget();
const content = ref(''), description = ref(''), dueDate = ref(''), dueTime = ref('');
const dateAnchor = ref<HTMLElement | null>(null), dateOpen = ref(false), timeValid = ref(true), error = ref(''), unreadable = ref(false), linked = ref(false);
interface Attempt { requestId: string; repository: RepositoryLink; target: GitHubTaskTarget; content: string; taskId?: string }
const attempt = ref<Attempt | null>(null);
const key = 'github_task_attempt_v1:' + props.repository.fullName.toLowerCase();
function restoreAttempt() {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed.requestId !== 'string' || typeof parsed.content !== 'string' || !parsed.target || typeof parsed.target.title !== 'string' || parsed.repository?.fullName !== props.repository.fullName || (parsed.taskId !== undefined && typeof parsed.taskId !== 'string')) throw new Error();
    attempt.value = parsed;
    if (parsed.taskId) linked.value = readRepositoryLinks(parsed.taskId).some(repo => repo.fullName.toLowerCase() === props.repository.fullName.toLowerCase());
  } catch { unreadable.value = true; error.value = '上次提交记录不可读，为避免重复创建已暂停。未覆盖记录。'; }
}
onMounted(restoreAttempt);
async function submit() {
  if (githubTaskCreation.saving || attempt.value || unreadable.value || !content.value.trim() || !target.value || !timeValid.value) return;
  const destination = { ...target.value }, repository = { ...props.repository };
  const payload = { content: content.value.trim(), description: description.value.trim(), project_id: destination.projectId, section_id: destination.sectionId, due_string: dueDate.value ? dueDate.value + (dueTime.value ? ' ' + dueTime.value : '') : undefined };
  githubTaskCreation.saving = true; error.value = '';
  try {
    if (!navigator.locks) throw new Error('当前环境不支持跨标签页提交保护，尚未发送。');
    await navigator.locks.request(key, { ifAvailable: true }, async lock => {
      if (!lock) throw new Error('另一个标签页正在创建这个仓库的任务，请稍后核对。');
      restoreAttempt();
      if (attempt.value || unreadable.value) return;
      await withTodoistWrite(async () => {
      // Read-only preflight validates the captured real section; never guess a replacement destination.
      const token = await todoistService.initToken();
      const section = await todoistService.api<any>('/sections/' + encodeURIComponent(destination.sectionId));
      refreshGitHubTaskTarget();
      if (document.hidden || !token || token !== todoistService.getToken() || target.value?.sectionId !== destination.sectionId || target.value?.projectId !== destination.projectId) throw new Error('配置或页面状态已变化，尚未提交，请重新确认任务区。');
      if (!section || String(section.id) !== destination.sectionId || String(section.project_id) !== destination.projectId || section.is_deleted || section.is_archived) throw new Error('目标分组不存在、已归档或已移动，请在 Todoist 中重新指定任务区。');
      const record: Attempt = { requestId: crypto.randomUUID(), repository, target: { ...destination, title: section.name || destination.title }, content: payload.content };
      // Persist uncertainty before POST; a tab close/reload must not silently offer the same POST again.
      localStorage.setItem(key, JSON.stringify(record)); attempt.value = record;
      try {
        const created = await todoistService.createTask(payload, record.requestId);
        if (!created || typeof created.id !== 'string') throw new Error();
        record.taskId = created.id; attempt.value = { ...record };
        try { localStorage.setItem(key, JSON.stringify(record)); } catch { error.value = '任务已创建，但本机回执保存失败，请记录任务地址；不要重复创建。'; }
        todoistService.invalidateWorkspaceSnapshots();
        if (String(created.project_id) !== destination.projectId || String(created.section_id) !== destination.sectionId) error.value = '任务已创建，但返回的分组与目标不一致，请核对任务地址；未重新提交。';
        repairLink();
        notifications.show({
          appName: 'Todoist', appType: 'todoist', title: '任务已创建', message: record.content,
          level: 'success', history: true, target: { type: 'todoist-task', taskId: created.id },
          actionLabel: '打开任务', duration: 7000
        });
        if (todoistModuleState.active) void todoistTaskListController.loadWorkspace(undefined, undefined, true);
      } catch {
        error.value = attempt.value?.taskId ? '任务已创建，但后续界面更新未完成，请使用任务地址核对；不要重复创建。' : '创建结果未确认，请核对原 Todoist 分组。已保留提交记录，未自动重试。';
      }
      });
    });
  } catch (failure) {
    error.value = failure instanceof Error && !attempt.value ? failure.message : '本机提交记录保存失败，尚未发送创建请求。';
  } finally { githubTaskCreation.saving = false; }
}
function repairLink() {
  const record = attempt.value;
  if (!record?.taskId) return;
  try { attachRepository(record.taskId, record.repository); linked.value = true; if (error.value.startsWith('任务已创建，但仓库卡片保存失败')) error.value = ''; }
  catch { error.value = '任务已创建，但仓库卡片保存失败。可仅重试关联，不会再创建任务。'; }
}
async function acknowledge(): Promise<boolean> {
  if (githubTaskCreation.saving || !attempt.value) return false;
  const expectedId = attempt.value.requestId;
  githubTaskCreation.saving = true;
  try {
    if (!navigator.locks) throw new Error();
    return await navigator.locks.request(key, { ifAvailable: true }, async lock => {
      if (!lock) { error.value = '另一个标签页正在提交，请稍后核对。'; return false; }
      const raw = localStorage.getItem(key);
      const stored = raw ? JSON.parse(raw) : null;
      if (stored && stored.requestId !== expectedId) {
        restoreAttempt(); error.value = '其他标签页已更新提交记录，请先核对最新任务。'; return false;
      }
      localStorage.removeItem(key); attempt.value = null; error.value = ''; return true;
    });
  } catch { error.value = '本机提交记录无法更新，未解除保护。'; return false; }
  finally { githubTaskCreation.saving = false; }
}
async function startAnother() {
  if (await acknowledge()) {
    content.value = ''; description.value = ''; dueDate.value = ''; dueTime.value = '';
    linked.value = false; timeValid.value = true;
  }
}

</script>
<style scoped>
.github-repository-tasks { width: 300px; min-width: 0; flex-shrink: 0; display: flex; flex-direction: column; border-left: 1px solid var(--border); background: var(--surface); color: var(--text); font-size: 12px; }
header { display: flex; align-items: center; justify-content: space-between; padding: 13px 14px; border-bottom: 1px solid var(--border); }
header strong { color: var(--heading); font-size: 13px; }
header small, .task-destination small { display: block; color: var(--muted); margin-top: 3px; font-size: 10px; }
button { color: var(--text); font: inherit; cursor: pointer; border: 1px solid var(--border); background: var(--panel); border-radius: 6px; padding: 6px 9px; }
button:disabled { opacity: .5; cursor: default; }
header button { border: 0; background: transparent; font-size: 18px; padding: 0 3px; }
.task-pane-content { flex: 1; min-height: 0; overflow: auto; padding: 13px; }
.task-create-heading { margin: 0 0 10px; color: var(--heading); font-size: 12px; font-weight: 600; }
.repository-reference { display: flex; gap: 8px; padding: 10px; background: var(--panel); border: 1px solid var(--border); border-radius: 8px; }
.repository-reference div { min-width: 0; }
.repository-reference strong { display: block; overflow-wrap: anywhere; color: var(--heading); }
.repository-reference small { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; margin-top: 4px; line-height: 1.5; color: var(--muted); }
.task-destination, .task-guide, .task-feedback { font-size: 12px; line-height: 1.6; overflow-wrap: anywhere; }
.task-guide, .task-feedback { padding: 9px; border: 1px solid var(--border); border-radius: 6px; background: var(--panel); }
fieldset { padding: 0; border: 0; margin: 12px 0 0; min-width: 0; }
label { display: block; color: var(--muted); margin: 0 0 10px; }
textarea { display: block; box-sizing: border-box; width: 100%; resize: vertical; margin-top: 5px; padding: 8px; border: 1px solid var(--border); border-radius: 6px; background: var(--panel); color: var(--text); font: inherit; line-height: 1.5; }
textarea:focus { outline: 1px solid var(--accent); }
.task-date-button { width: 100%; text-align: left; }
.task-local-note { font-size: 10px; line-height: 1.6; color: var(--muted); }
.create-task { width: 100%; color: var(--accent); font-weight: 600; padding: 8px; }
.task-receipt { line-height: 1.6; overflow-wrap: anywhere; }
.task-open-link { padding: 0; border: 0; background: transparent; color: var(--accent); text-decoration: underline; text-underline-offset: 3px; }
.task-receipt small { display: block; color: var(--muted); margin: 8px 0; }
</style>
