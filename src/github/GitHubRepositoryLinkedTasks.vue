<script setup lang="ts">
import { computed, ref, watch, onMounted, onUnmounted } from 'vue';
import { ReadSessionSlot } from '../core/read-session';
import { todoistService, isTodoistTaskCompleted, TODOIST_TOKEN_KEY, type TodoistRawTask } from '../services/todoist.service';
import { findRepositoryTaskIds } from '../todoist/repository-links';
import { todoistModuleState, withTodoistWrite } from '../todoist/module-state';
import { todoistTaskListController } from '../todoist/task-list-store';

const props = defineProps<{ repositoryName: string; disabled?: boolean }>();
const emit = defineEmits<{ openTask: [taskId: string] }>();
interface LinkedTask { id: string; task?: TodoistRawTask; error?: string }
const tasks = ref<LinkedTask[]>([]);
const loading = ref(false), message = ref(''), linkWarning = ref('');
const completingId = ref(''), completionError = ref('');
const visibleTasks = computed(() => tasks.value.filter(entry => !entry.task || !isTodoistTaskCompleted(entry.task)));
const reads = new ReadSessionSlot();
let mounted = false, pagePresent = true, queued = false;
const visible = () => mounted && pagePresent && !document.hidden;

function scheduleReload() {
  if (queued || !visible()) return;
  queued = true;
  queueMicrotask(() => {
    queued = false;
    if (visible() && !todoistModuleState.pendingWrites) void reload();
  });
}

async function reload() {
  if (!visible() || todoistModuleState.pendingWrites) return;
  reads.cancel();
  message.value = ''; linkWarning.value = ''; tasks.value = [];
  let taskIds: string[];
  try {
    const result = findRepositoryTaskIds(props.repositoryName);
    taskIds = result.taskIds;
    if (result.unreadableCount) linkWarning.value = '部分本机关联记录无法读取，列表可能不完整；未修改记录。';
  } catch {
    message.value = '本机关联记录读取失败，请稍后刷新；未修改记录。';
    return;
  }
  if (!taskIds.length) return;
  tasks.value = taskIds.map(id => ({ id }));
  const repositoryName = props.repositoryName;
  let account: string | null = null;
  const session = reads.begin({
    timeoutMs: 30000,
    isCurrent: () => visible() && props.repositoryName === repositoryName &&
      (account === null || account === todoistService.getToken()),
    onStop: reason => {
      loading.value = false;
      if (reason === 'timeout') message.value = '关联任务读取超时，保留已读取结果，请手动刷新。';
    }
  });
  loading.value = true;
  try {
    account = await session.wait(() => todoistService.initToken());
    if (!session.current()) return;
    if (!account.trim()) {
      message.value = '请先配置 Todoist 账号，才能读取已关联的任务。';
      return;
    }
    let cursor = 0;
    const worker = async () => {
      while (session.current()) {
        const index = cursor++;
        if (index >= taskIds.length) return;
        const id = taskIds[index];
        try {
          // Read only known associated IDs, not the whole account or the currently selected board.
          const value = await session.wait(() => todoistService.api<unknown>('/tasks/' + encodeURIComponent(id), { signal: session.signal }));
          if (!session.current()) return;
          if (!value || typeof value !== 'object') throw new Error('Invalid task');
          const task = value as TodoistRawTask;
          if (String(task.id) !== id || typeof task.content !== 'string' || task.is_deleted ||
              (task.checked === undefined && task.is_completed === undefined) ||
              (task.checked !== undefined && typeof task.checked !== 'boolean') ||
              (task.is_completed !== undefined && typeof task.is_completed !== 'boolean')) throw new Error('Invalid task');
          tasks.value[index] = { id, task };
        } catch (error) {
          if (!session.current()) return;
          const denied = error instanceof Error && /\((401|403)\)/.test(error.message);
          tasks.value[index] = { id, error: denied ? '账号或权限不可用，请检查 Todoist 配置。' : '暂无法读取此任务，请刷新或在 Todoist 中核对。' };
        }
      }
    };
    await Promise.allSettled(Array.from({ length: Math.min(3, taskIds.length) }, worker));
  } catch {
    if (session.current()) message.value = 'Todoist 配置或任务读取失败，请手动刷新。';
  } finally {
    if (session.finish()) loading.value = false;
  }
}

async function completeTask(entry: LinkedTask) {
  if (!entry.task || props.disabled || completingId.value || todoistModuleState.pendingWrites || !visible()) return;
  const id = entry.id, repositoryName = props.repositoryName;
  const snapshot = entry.task, expectedAccount = todoistService.getToken();
  completingId.value = id; completionError.value = ''; reads.cancel();
  let sent = false, confirmed = false;
  try {
    await withTodoistWrite(async () => {
      const account = await todoistService.initToken();
      if (!account || account !== expectedAccount || !visible() || props.repositoryName !== repositoryName || props.disabled) throw new Error('Not submitted');
      sent = true;
      // A single user-authorized POST; read cancellation must not cancel or retry this write.
      await todoistService.toggleTaskCompletion(id, true);
      confirmed = true;
      todoistService.invalidateWorkspaceSnapshots();
      if (!mounted || account !== todoistService.getToken()) return;
      entry.task = { ...snapshot, checked: true, is_completed: true };
      const { todoistCalendarSidebarController } = await import('../todoist/calendar-sidebar-store');
      if (!mounted || account !== todoistService.getToken()) return;
      todoistCalendarSidebarController.recordTaskCompletion({
        id, content: snapshot.content, description: snapshot.description,
        completed: true, dueDate: snapshot.due?.date, _taskRaw: snapshot
      }, true);
    });
    if (todoistModuleState.active) void todoistTaskListController.loadWorkspace(undefined, undefined, true);
  } catch {
    if (mounted && props.repositoryName === repositoryName) completionError.value = confirmed
      ? '任务已完成，但本地显示更新失败，请刷新核对。'
      : sent ? '完成结果未确认，请刷新核对；未自动重试。' : '页面或账号状态已变化，尚未提交完成操作。';
  } finally {
    completingId.value = '';
    scheduleReload();
  }
}

function associationChanged(event: Event) {
  if (event instanceof StorageEvent && event.key !== null && !event.key.startsWith('todoist_repository_links_v1:')) return;
  scheduleReload();
}
function visibilityChanged() {
  if (visible()) scheduleReload();
  else reads.cancel();
}
function pageHide() { pagePresent = false; reads.cancel(); }
function pageShow() { pagePresent = true; visibilityChanged(); }
function accountChanged(changes: Record<string, unknown>, area: string) {
  if (area !== 'local' || !Object.prototype.hasOwnProperty.call(changes, TODOIST_TOKEN_KEY)) return;
  reads.cancel(); tasks.value = []; message.value = '';
  scheduleReload();
}
watch(() => props.repositoryName, () => { reads.cancel(); tasks.value = []; scheduleReload(); });
watch(() => todoistModuleState.pendingWrites, (pending, previous) => {
  if (pending) reads.cancel();
  else if (previous) scheduleReload();
});
onMounted(() => {
  mounted = true;
  window.addEventListener('storage', associationChanged);
  window.addEventListener('todoist-repository-links-changed', associationChanged);
  document.addEventListener('visibilitychange', visibilityChanged);
  window.addEventListener('pagehide', pageHide);
  window.addEventListener('pageshow', pageShow);
  if (typeof chrome !== 'undefined') chrome.storage?.onChanged?.addListener(accountChanged);
  scheduleReload();
});
onUnmounted(() => {
  mounted = false; reads.cancel();
  window.removeEventListener('storage', associationChanged);
  window.removeEventListener('todoist-repository-links-changed', associationChanged);
  document.removeEventListener('visibilitychange', visibilityChanged);
  window.removeEventListener('pagehide', pageHide);
  window.removeEventListener('pageshow', pageShow);
  if (typeof chrome !== 'undefined') chrome.storage?.onChanged?.removeListener(accountChanged);
});
</script>

<template>
  <section class="repository-linked-tasks" aria-label="当前仓库关联的 Todoist 任务" :aria-busy="loading">
    <div class="linked-tasks-heading">
      <h3>关联任务 <small v-if="visibleTasks.length">{{ visibleTasks.length }}</small></h3>
      <button type="button" class="linked-tasks-refresh" :disabled="loading || disabled || !!todoistModuleState.pendingWrites" @click="reload">{{ loading ? '读取中…' : '刷新' }}</button>
    </div>
    <p v-if="message" class="linked-tasks-message" role="status">{{ message }}</p>
    <p v-if="linkWarning" class="linked-tasks-message" role="status">{{ linkWarning }}</p>
    <p v-if="completionError" class="linked-tasks-message" role="alert">{{ completionError }}</p>
    <p v-if="!visibleTasks.length && !message" class="linked-tasks-empty">暂无未完成的关联任务</p>
    <div v-if="visibleTasks.length" class="linked-tasks-list" tabindex="0" aria-label="关联任务列表，可滚动">
      <template v-for="entry in visibleTasks" :key="entry.id">
        <article v-if="entry.task" class="linked-task-card">
          <button type="button" class="linked-task-check" :class="{ pending: completingId === entry.id }" :disabled="disabled || !!completingId || !!todoistModuleState.pendingWrites" :aria-label="'完成任务：' + entry.task.content" :title="completingId === entry.id ? '正在提交完成…' : '完成任务'" @click.stop="completeTask(entry)">{{ completingId === entry.id ? '…' : '' }}</button>
          <button type="button" class="linked-task-body" :disabled="disabled || !!completingId" :aria-label="'在插件中打开任务：' + entry.task.content" @click="emit('openTask', entry.id)">
            <strong>{{ entry.task.content || '未命名任务' }}</strong>
            <span v-if="entry.task.description" class="linked-task-description">{{ entry.task.description }}</span>
            <span v-if="entry.task.due?.date || entry.task.labels?.length" class="linked-task-meta">
              <span v-if="entry.task.due?.date" :title="entry.task.due.date">▦ {{ entry.task.due.date }}</span>
              <span v-for="label in (entry.task.labels || []).slice(0, 3)" :key="label">◇ {{ label }}</span>
            </span>
          </button>
        </article>
        <p v-else class="linked-task-unavailable" role="status">{{ entry.error || (loading ? '正在读取关联任务…' : '任务尚未读取，请刷新核对。') }}</p>
      </template>
    </div>
  </section>
</template>

<style scoped>
.repository-linked-tasks { margin-bottom: 15px; padding-bottom: 14px; border-bottom: 1px solid var(--border); }
.linked-tasks-heading { display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 8px; }
h3 { margin: 0; color: var(--heading); font-size: 12px; font-weight: 600; }
h3 small { color: var(--muted); font-size: 10px; margin-left: 5px; font-weight: 400; }
.linked-tasks-refresh { padding: 3px 5px; border: 0; border-radius: 4px; background: transparent; color: var(--muted); font: inherit; font-size: 10px; cursor: pointer; }
.linked-tasks-refresh:hover { color: var(--heading); background: var(--panel); }
.linked-tasks-refresh:disabled { opacity: .5; cursor: default; }
.linked-tasks-list { display: flex; flex-direction: column; gap: 8px; max-height: min(260px, 35vh); overflow-y: auto; overscroll-behavior-y: contain; padding: 2px; }
.linked-task-card { display: flex; align-items: flex-start; gap: 8px; flex-shrink: 0; width: 100%; box-sizing: border-box; padding: 10px; border: 1px solid var(--border); border-radius: 9px; background: var(--panel); color: var(--text); text-align: left; font: inherit; cursor: pointer; }
.linked-task-card:hover { border-color: var(--accent, var(--primary)); background: var(--surface-hover, var(--panel)); }
.linked-task-body:disabled, .linked-task-check:disabled { opacity: .6; cursor: default; }
.linked-task-body:focus-visible, .linked-task-check:focus-visible, .linked-tasks-list:focus-visible { outline: 2px solid var(--accent, var(--primary)); outline-offset: 1px; }
.linked-task-check { display: grid; place-items: center; width: 16px; height: 16px; flex-shrink: 0; margin-top: 2px; padding: 0; border: 1px solid var(--border-strong, var(--border)); border-radius: 50%; background: var(--panel); color: var(--muted); font-size: 10px; cursor: pointer; }
.linked-task-check:hover:not(:disabled) { border-color: var(--accent, var(--primary)); color: var(--accent, var(--primary)); }
.linked-task-check:hover:not(:disabled)::before { content: "✓"; }
.linked-task-body { display: flex; flex: 1; flex-direction: column; gap: 5px; min-width: 0; padding: 0; border: 0; background: transparent; color: inherit; text-align: left; font: inherit; cursor: pointer; }
.linked-task-body strong { color: var(--heading); font-size: 12px; line-height: 1.5; font-weight: 500; white-space: pre-wrap; overflow-wrap: anywhere; }
.linked-task-description { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; color: var(--muted); font-size: 11px; line-height: 1.5; white-space: pre-wrap; overflow-wrap: anywhere; }
.linked-task-meta { display: flex; flex-wrap: wrap; gap: 4px 8px; color: var(--muted); font-size: 10px; line-height: 1.5; overflow-wrap: anywhere; }
.linked-tasks-message, .linked-tasks-empty, .linked-task-unavailable { margin: 6px 0; color: var(--muted); font-size: 11px; line-height: 1.6; overflow-wrap: anywhere; }
.linked-task-unavailable { padding: 8px; border: 1px solid var(--border); border-radius: 6px; background: var(--panel); }
</style>
