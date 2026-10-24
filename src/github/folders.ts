import { reactive, readonly } from "vue";

export type GitHubFolderKind = "all" | "used" | "uncategorized" | "custom";

export interface GitHubFolderView {
  title: string;
  count: number;
  kind: GitHubFolderKind;
  active: boolean;
}

export interface GitHubFolderActions {
  select?(title: string): void;
  delete?(title: string): void;
  dropRepository?(fullName: string, title: string): void;
}

export interface GitHubFolderController {
  update(folders: readonly GitHubFolderView[]): void;
  setActions(actions: GitHubFolderActions): void;
  setMounted(mounted: boolean): void;
  select(title: string): void;
  delete(title: string): void;
  dropRepository(fullName: string, title: string): void;
  readonly active: boolean;
}

const state = reactive<{ folders: GitHubFolderView[] }>({ folders: [] });
let actions: GitHubFolderActions = {};
let active = false;

function update(folders: readonly GitHubFolderView[]): void {
  state.folders = folders.map((folder) => ({ ...folder }));
}

function setActions(nextActions: GitHubFolderActions): void {
  actions = Object.freeze({ ...nextActions });
}

function setMounted(mounted: boolean): void {
  active = mounted;
}

function select(title: string): void {
  actions.select?.(title);
}

function deleteFolder(title: string): void {
  actions.delete?.(title);
}

function dropRepository(fullName: string, title: string): void {
  actions.dropRepository?.(fullName, title);
}

export const githubFolderState = readonly(state);
export const githubFolderController: GitHubFolderController = Object.freeze({
  update,
  setActions,
  setMounted,
  select,
  delete: deleteFolder,
  dropRepository,
  get active() { return active; }
});
