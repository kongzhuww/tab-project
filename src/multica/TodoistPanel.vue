<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { todoistService, type TodoistRawTask, type TodoistRawProject, type TodoistRawSection } from '../services/todoist.service';
import { tasksInBoard } from './board-filters';
import { todoistErrorText } from '../todoist/api-error';
import BoardSelector from './BoardSelector.vue';
import LoadingIndicator from './LoadingIndicator.vue';
declare const chrome: any;
const emit = defineEmits<{ close: [] }>();
type Option = { id: string; label: string; group?: string; projectId: string; sectionId: string | null };
const projects = ref<TodoistRawProject[]>([]), sections = ref<TodoistRawSection[]>([]), tasks = ref<TodoistRawTask[]>([]);
const projectId = ref(''), selectedId = ref('');
const loading = ref(false), error = ref(''), warning = ref('');
let controller: AbortController | null = null, generation = 0;
const options = computed<Option[]>(() => projects.value.flatMap(project => {
  const id = String(project.id), name = project.inbox_project || project.is_inbox_project ? '收件箱' : project.name;
  const result: Option[] = [{ id: `all|${id}`, label: name, group: '项目 · 全部任务', projectId: id, sectionId: null }];
  if (id === projectId.value) {
    result.push({ id:`default|${id}`, label:'默认板块', group:name, projectId:id, sectionId:'' });
    for (const section of sections.value) result.push({ id:`section|${id}|${section.id}`, label:section.name, group:name, projectId:id, sectionId:String(section.id) });
  }
  return result;
}));
const selected = computed(() => options.value.find(item => item.id === selectedId.value));
const displayed = computed(() => {
  const option = selected.value;
  if (!option || option.projectId !== projectId.value) return [];
  return tasksInBoard(tasks.value, option.sectionId);
});
async function loadProject(id: string, selection = `all|${id}`) {
  controller?.abort(); const current = new AbortController(); controller = current; const seq = ++generation;
  projectId.value = id; selectedId.value = selection; sections.value = []; tasks.value = []; loading.value = true; error.value = ''; warning.value = '';
  try {
    const [taskResult, sectionResult] = await Promise.allSettled([todoistService.getTasksByProject(id, current.signal), todoistService.getSections(id, current.signal)]);
    if (seq !== generation || current.signal.aborted) return;
    if (taskResult.status === 'fulfilled') tasks.value = taskResult.value; else error.value = todoistErrorText(taskResult.reason);
    if (sectionResult.status === 'fulfilled') sections.value = sectionResult.value; else warning.value = '项目板块读取失败，可刷新重试。';
  } finally { if (seq === generation) { loading.value = false; controller = null; } }
}
async function initialize() {
  controller?.abort(); const current = new AbortController(); controller = current; const seq = ++generation;
  loading.value = true; error.value = ''; warning.value = '';
  try {
    await todoistService.initToken();
    if (seq !== generation || current.signal.aborted) return;
    const list = await todoistService.getProjects(current.signal);
    if (seq !== generation || current.signal.aborted) return;
    projects.value = list.filter(p => !p.is_archived && !p.is_deleted);
    const first = projects.value.find(p => p.inbox_project || p.is_inbox_project) || projects.value[0];
    if (first) { await loadProject(String(first.id)); return; }
    selectedId.value = ''; projectId.value = ''; tasks.value = []; sections.value = [];
  } catch (e) { if (seq === generation && !current.signal.aborted) error.value = todoistErrorText(e); }
  finally { if (seq === generation) { loading.value = false; controller = null; } }
}
function selectBoard(id: string) {
  const item = options.value.find(option => option.id === id);
  if (!item) return;
  if (item.projectId !== projectId.value) void loadProject(item.projectId, item.id); else selectedId.value = item.id;
}
function onStorageChanged(changes: Record<string, unknown>, area: string) {
  if (area !== 'local' || !Object.prototype.hasOwnProperty.call(changes, 'todoistToken')) return;
  generation++; controller?.abort(); controller = null;
  projects.value = []; sections.value = []; tasks.value = []; projectId.value = ''; selectedId.value = '';
  void initialize();
}
onMounted(() => { if (typeof chrome !== 'undefined') chrome.storage?.onChanged?.addListener(onStorageChanged); void initialize(); });
onBeforeUnmount(() => { generation++; controller?.abort(); controller = null; if (typeof chrome !== 'undefined') chrome.storage?.onChanged?.removeListener(onStorageChanged); });
</script>
<template>
  <aside class="todo-panel" aria-label="Todoist 待办"><header><div><strong><span class="todo-logo">✓</span> Todoist 待办</strong><small>只读查看项目和板块</small></div><button type="button" class="close" aria-label="关闭侧栏" @click="emit('close')">✕</button></header>
    <div class="toolbar"><strong>{{ selected?.label || '选择板块' }}</strong><div class="toolbar-actions"><button type="button" class="refresh" :disabled="loading" title="刷新" @click="projectId ? loadProject(projectId, selectedId) : initialize()">↻</button><BoardSelector :options="options" :selected="selectedId" :disabled="!options.length" @select="selectBoard" /></div></div>
    <div class="task-list"><p v-if="loading" class="hint"><LoadingIndicator label="正在读取板块" /></p><p v-if="error" class="error" role="alert">{{ error }} <button type="button" @click="projectId ? loadProject(projectId, selectedId) : initialize()">重试</button></p><p v-if="warning" class="error" role="status">{{ warning }}</p><p v-if="!loading && !error && !displayed.length" class="hint">{{ projects.length ? '该板块暂无未完成任务。' : '暂无可用项目。' }}</p><article v-for="task in displayed" :key="task.id" class="task-card"><span class="task-circle" aria-hidden="true"></span><div class="task-body"><strong>{{ task.content }}</strong><p v-if="task.description">{{ task.description }}</p><div class="task-meta"><span v-if="task.due?.date">◷ {{ task.due.string || task.due.date }}</span><span v-for="label in (task.labels || []).slice(0,3)" :key="label">#{{ label }}</span></div></div></article></div>
    <footer>仅查看，不会修改 Todoist 或发送给助手。每个项目最多显示 200 条。</footer>
  </aside>
</template>
<style scoped>
.todo-panel { position:absolute; right:0; top:0; bottom:0; z-index:30; width:min(380px,90vw); max-width:calc(100% - 12px); display:flex; flex-direction:column; min-height:0; background:var(--panel,#fff); border-left:1px solid var(--border,#e4e8ef); color:var(--text,#26334b); box-shadow:-10px 0 30px #15253a20; }.todo-panel * { box-sizing:border-box; }.todo-panel header { display:flex; justify-content:space-between; align-items:center; padding:16px; border-bottom:1px solid var(--border,#e8ebf1); }.todo-panel header strong,.todo-panel header small { display:block; }.todo-panel header strong { font-size:14px; }.todo-panel header small { color:#98a5b8; margin-top:4px; font-size:11px; }.todo-logo { display:inline-grid; place-items:center; width:21px; height:21px; margin-right:3px; border-radius:6px; color:#fff; background:#dc4c3e; }.close,.refresh { cursor:pointer; border:1px solid var(--border,#e4e8ef); border-radius:6px; background:var(--surface,#fff); color:var(--text,#52627a); padding:5px 8px; font:inherit; font-size:11px; }.refresh:disabled { opacity:.5; }.toolbar { display:flex; justify-content:space-between; align-items:center; gap:8px; padding:12px 14px 8px; font-size:12px; }.toolbar strong { overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }.toolbar-actions { display:flex; align-items:center; gap:6px; }.task-list { flex:1; overflow:auto; padding:2px 12px 16px; }.hint { color:#9ba8bc; font-size:11px; }.error { color:#b45309; font-size:11px; overflow-wrap:anywhere; }.error button { border:0; background:transparent; color:#7569ec; cursor:pointer; }.task-card { display:flex; gap:10px; margin-bottom:6px; padding:10px; border:1px solid var(--border,#e6eaf0); border-radius:7px; background:var(--surface,#fafbfc); }.task-circle { flex:none; width:15px; height:15px; margin-top:2px; border:1.5px solid #aebbd0; border-radius:4px; }.task-body { flex:1; min-width:0; }.task-body strong { font-size:12px; line-height:1.5; overflow-wrap:anywhere; }.task-body p { color:#9ba8bc; font-size:11px; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }.task-meta { display:flex; gap:8px; margin-top:4px; color:#cf756c; font-size:10px; flex-wrap:wrap; }footer { padding:11px 14px; border-top:1px solid var(--border,#e8ebf1); color:#9ba8bc; font-size:10px; }
</style>
