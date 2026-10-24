import { reactive } from "vue";

export interface TodoistTitleDraft {
  revision: number;
  title: string;
  description: string;
  status: "editing" | "saving" | "failed";
  error: string;
}

// Session-only: task text is not copied to browser storage. Retained across drawer
// close/reopen, not across page reload. Never automatically retry an uncertain write.
export const todoistTitleDrafts = reactive(new Map<string, TodoistTitleDraft>());
let revision = 0;
export function rememberTitleDraft(taskId: string, title: string, description: string,
  status: TodoistTitleDraft["status"] = "editing"): number {
  const next = ++revision;
  todoistTitleDrafts.set(taskId, { revision: next, title, description, status, error: "" });
  return next;
}
