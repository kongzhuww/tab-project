import type { ResourceAttachment } from '../multica/resource-content';
import type { TodoistTaskItem } from './task-list-store';

export const TODOIST_RESOURCE_MIME = 'application/x-tab-project-todoist-resource';
const MAX_DESCRIPTION = 2000;
function bounded(value: string, limit: number) { return Array.from(value).slice(0, limit).join(''); }

/** A deliberately limited snapshot; no token, raw API object or other task metadata. */
export function makeTodoistResource(task: TodoistTaskItem): ResourceAttachment | null {
  if (!/^[a-z0-9_-]{1,128}$/i.test(task.id) || !task.content?.trim()) return null;
  const description = task.description || '';
  return { kind:'todoist', id:task.id, title:bounded(task.content.trim(), 300),
    url:`https://app.todoist.com/app/task/${encodeURIComponent(task.id)}`,
    description:bounded(description, MAX_DESCRIPTION),
    truncated:Array.from(description).length > MAX_DESCRIPTION,
    dueDate:bounded(task.dueDate || '', 40) };
}

/** Treat drag data as untrusted, and reconstruct URLs rather than accepting one. */
export function parseTodoistResource(raw: string): ResourceAttachment | null {
  if (!raw || raw.length > 16000) return null;
  try {
    const value = JSON.parse(raw);
    if (!value || value.kind !== 'todoist' || typeof value.id !== 'string' ||
        !/^[a-z0-9_-]{1,128}$/i.test(value.id) || typeof value.title !== 'string' ||
        !value.title.trim() || Array.from(value.title).length > 300 ||
        (value.description != null && (typeof value.description !== 'string' || Array.from(value.description).length > MAX_DESCRIPTION)) ||
        (value.dueDate != null && (typeof value.dueDate !== 'string' || Array.from(value.dueDate).length > 40))) return null;
    return {kind:'todoist', id:value.id, title:value.title.trim(),
      url:`https://app.todoist.com/app/task/${encodeURIComponent(value.id)}`,
      description:value.description || '', dueDate:value.dueDate || '', truncated:value.truncated === true};
  } catch { return null; }
}
