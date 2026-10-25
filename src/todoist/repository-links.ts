export interface RepositoryLink {
  fullName: string; description: string; stars?: number; language?: string; updated?: string;
}
export function validRepositoryName(name: unknown): name is string {
  return typeof name === 'string' && name.length <= 240 && /^[\w.-]+\/[\w.-]+$/.test(name) && !name.split('/').some(part => part === '.' || part === '..');
}
const key = (taskId: string) => 'todoist_repository_links_v1:' + taskId;
export function readRepositoryLinks(taskId: string): RepositoryLink[] {
  if (!taskId) return [];
  const raw = JSON.parse(localStorage.getItem(key(taskId)) || '[]');
  if (!Array.isArray(raw)) throw new Error('关联记录格式无效');
  return raw.filter(item => item && validRepositoryName(item.fullName)).map(item => ({
    fullName: item.fullName, description: typeof item.description === 'string' ? item.description : '',
    stars: typeof item.stars === 'number' && Number.isFinite(item.stars) ? item.stars : undefined,
    language: typeof item.language === 'string' ? item.language : undefined,
    updated: typeof item.updated === 'string' ? item.updated : undefined
  }));
}
export function writeRepositoryLinks(taskId: string, links: RepositoryLink[]) {
  if (!taskId || links.some(link => !validRepositoryName(link.fullName))) throw new Error('任务或仓库无效');
  localStorage.setItem(key(taskId), JSON.stringify(links));
  window.dispatchEvent(new CustomEvent('todoist-repository-links-changed', { detail: taskId }));
}
export function attachRepository(taskId: string, repo: RepositoryLink) {
  const links = readRepositoryLinks(taskId);
  if (links.some(link => link.fullName.toLowerCase() === repo.fullName.toLowerCase())) return;
  writeRepositoryLinks(taskId, [...links, repo]);
}
