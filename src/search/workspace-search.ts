import { reactive } from "vue";

export type WorkspaceSearchTarget = "bilibili" | "github" | "netease";
export interface WorkspaceSearchRequest { id: number; keyword: string }

// Requests survive lazy component mounting, but are consumed only by their destination.
export const workspaceSearchRequests = reactive<Record<WorkspaceSearchTarget, WorkspaceSearchRequest | null>>({
  bilibili: null,
  github: null,
  netease: null
});
let nextId = 0;

export function requestWorkspaceSearch(target: WorkspaceSearchTarget, keyword: string): void {
  const query = keyword.trim();
  if (query) workspaceSearchRequests[target] = { id: ++nextId, keyword: query };
}

export function consumeWorkspaceSearch(target: WorkspaceSearchTarget): WorkspaceSearchRequest | null {
  const request = workspaceSearchRequests[target];
  workspaceSearchRequests[target] = null;
  return request;
}
