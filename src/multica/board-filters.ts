import type { TodoistRawTask } from '../services/todoist.service';
import type { MyRepoItem } from '../github/my-repos-store';

export function tasksInBoard(tasks: TodoistRawTask[], sectionId: string | null): TodoistRawTask[] {
  return tasks.filter(task => !(typeof task.checked === 'boolean' ? task.checked : task.is_completed === true) && (sectionId === null || String(task.section_id || '') === sectionId));
}
export function repositoryGroups(repo: MyRepoItem, mapping: Record<string, string[]>): string[] {
  const groups = mapping[repo.fullName] || mapping[repo.fullName.toLowerCase()] || mapping[repo.name] || mapping[repo.name.toLowerCase()] || repo.localGroups || [];
  return Array.isArray(groups) ? groups : [];
}
export function repositoriesInBoard(repos: MyRepoItem[], mapping: Record<string, string[]>, board: string): MyRepoItem[] {
  return repos.filter(repo => board === 'all' || (board === 'ungrouped' ? !repositoryGroups(repo, mapping).length : board.startsWith('group:') && repositoryGroups(repo, mapping).includes(board.slice(6))));
}
