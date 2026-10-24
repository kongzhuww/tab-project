import { reactive, readonly } from "vue";

export interface GitHubBatchBarSnapshot {
  active: boolean;
  selectedCount: number;
  allSelected: boolean;
}

export interface GitHubBatchBarActions {
  toggleSelectAll?(): void;
  toggleUsed?(): void;
  analyzeAi?(): void;
  unstar?(): void;
}

export interface GitHubBatchBarController {
  update(snapshot: Partial<GitHubBatchBarSnapshot>): void;
  setActions(actions: GitHubBatchBarActions): void;
  setMounted(mounted: boolean): void;
  toggleSelectAll(): void;
  toggleUsed(): void;
  analyzeAi(): void;
  unstar(): void;
  readonly active: boolean;
  readonly state: Readonly<GitHubBatchBarSnapshot>;
}

const state = reactive<GitHubBatchBarSnapshot>({
  active: false,
  selectedCount: 0,
  allSelected: false
});

let actions: GitHubBatchBarActions = {};
let mounted = false;

function update(snapshot: Partial<GitHubBatchBarSnapshot>): void {
  if (typeof snapshot.active === "boolean") state.active = snapshot.active;
  if (typeof snapshot.selectedCount === "number") state.selectedCount = snapshot.selectedCount;
  if (typeof snapshot.allSelected === "boolean") state.allSelected = snapshot.allSelected;

  const root = typeof document !== "undefined" ? document.getElementById("gh-batch-bar") : null;
  if (root && typeof snapshot.active === "boolean") {
    root.hidden = !snapshot.active;
  }
}

function setActions(nextActions: GitHubBatchBarActions): void {
  actions = Object.freeze({ ...nextActions });
}

function setMounted(isMounted: boolean): void {
  mounted = isMounted;
}

function toggleSelectAll(): void {
  actions.toggleSelectAll?.();
}

function toggleUsed(): void {
  actions.toggleUsed?.();
}

function analyzeAi(): void {
  actions.analyzeAi?.();
}

function unstar(): void {
  actions.unstar?.();
}

export const githubBatchBarState = readonly(state);
export const githubBatchBarController: GitHubBatchBarController = Object.freeze({
  update,
  setActions,
  setMounted,
  toggleSelectAll,
  toggleUsed,
  analyzeAi,
  unstar,
  get active() {
    return mounted;
  },
  get state() {
    return state;
  }
});
