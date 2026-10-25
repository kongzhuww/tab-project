import { ref, readonly, reactive, onMounted, onUnmounted } from 'vue';
import type { TodoistColumnItem } from './task-list-store';
export interface GitHubTaskTarget { projectId: string; sectionId: string; title: string }
const KEY = 'todoist_github_task_target_v1';
const selected = ref<GitHubTaskTarget | null>(null);
export const githubTaskTarget = readonly(selected);
export const githubTaskCreation = reactive({ saving: false });
export function refreshGitHubTaskTarget() {
  const raw = localStorage.getItem(KEY);
  if (!raw) { selected.value = null; return; }
  const value = JSON.parse(raw);
  if (!value || typeof value.projectId !== 'string' || !value.projectId || typeof value.sectionId !== 'string' || !value.sectionId || typeof value.title !== 'string') throw new Error('GitHub任务区配置无效');
  selected.value = value;
}
export function useGitHubTaskTarget() {
  function refresh() { try { refreshGitHubTaskTarget(); } catch { selected.value = null; } }
  function changed(event: StorageEvent) { if (event.key === KEY || event.key === null) refresh(); }
  refresh();
  onMounted(() => window.addEventListener('storage', changed));
  onUnmounted(() => window.removeEventListener('storage', changed));
  return githubTaskTarget;
}
export function isGitHubTaskTarget(col: TodoistColumnItem) {
  return !!selected.value && selected.value.projectId === col.projectId && selected.value.sectionId === col.sectionId;
}
export function selectGitHubTaskTarget(col: TodoistColumnItem) {
  if (githubTaskCreation.saving) throw new Error('任务正在创建，暂不能切换任务区。');
  if (!col.projectId || !col.sectionId) throw new Error('请选择实际的Todoist分组。');
  const next = isGitHubTaskTarget(col) ? null : { projectId: col.projectId, sectionId: col.sectionId, title: col.title };
  if (next) localStorage.setItem(KEY, JSON.stringify(next)); else localStorage.removeItem(KEY);
  selected.value = next;
}
