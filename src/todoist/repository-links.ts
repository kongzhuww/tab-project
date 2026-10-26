export interface RepositoryLink {
  fullName: string; description: string; stars?: number; language?: string; updated?: string;
}
export function validRepositoryName(name: unknown): name is string {
  return typeof name === 'string' && name.length <= 240 && /^[\w.-]+\/[\w.-]+$/.test(name) && !name.split('/').some(part => part === '.' || part === '..');
}
const KEY_PREFIX = 'todoist_repository_links_v1:';
const key = (taskId: string) => KEY_PREFIX + taskId;
/** Reverse lookup existing local associations; no second index or name-based guessing. */
export function findRepositoryTaskIds(fullName: string): { taskIds: string[]; unreadableCount: number } {
  if (!validRepositoryName(fullName)) throw new Error('仓库名称无效');
  const keys: string[] = [];
  for (let index = 0; index < localStorage.length; index++) {
    const storedKey = localStorage.key(index);
    if (storedKey?.startsWith(KEY_PREFIX)) keys.push(storedKey);
  }
  const taskIds: string[] = [];
  let unreadableCount = 0;
  for (const storedKey of keys) {
    const taskId = storedKey.slice(KEY_PREFIX.length);
    if (!taskId) continue;
    try {
      if (readRepositoryLinks(taskId).some(link => link.fullName.toLowerCase() === fullName.toLowerCase())) taskIds.push(taskId);
    } catch { unreadableCount++; }
  }
  return { taskIds, unreadableCount };
}
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
