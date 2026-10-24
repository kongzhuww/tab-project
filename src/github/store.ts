import { reactive, readonly } from "vue";

export interface GitHubStatusSnapshot {
  accountConfigured: boolean | null;
  actionText: string;
  actionError: boolean;
}

export interface GitHubStatusController {
  update(snapshot: Partial<GitHubStatusSnapshot>): void;
  setMounted(mounted: boolean): void;
  readonly active: boolean;
  readonly snapshot: Readonly<GitHubStatusSnapshot>;
}

let active = false;

const state = reactive<GitHubStatusSnapshot>({
  accountConfigured: null,
  actionText: "",
  actionError: false
});

function update(snapshot: Partial<GitHubStatusSnapshot>): void {
  Object.assign(state, snapshot);
}

export const githubStatusState = readonly(state);
function setMounted(mounted: boolean): void {
  active = mounted;
}

export const githubStatusController: GitHubStatusController = Object.freeze({
  update,
  setMounted,
  get active() { return active; },
  get snapshot() { return state; }
});
