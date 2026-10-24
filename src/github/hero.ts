import { reactive, readonly } from "vue";

export type GitHubHeroKind = "all" | "used" | "uncategorized" | "custom";

export interface GitHubHeroSnapshot {
  title: string;
  description: string;
  kind: GitHubHeroKind;
  batchMode?: boolean;
}

export interface GitHubHeroActions {
  createFolder?(): void;
  refresh?(): void | Promise<void>;
  analyzeAll?(): void | Promise<void>;
  toggleBatch?(): void;
}

export interface GitHubHeroController {
  update(snapshot: GitHubHeroSnapshot): void;
  setActions(actions: GitHubHeroActions): void;
  setMounted(mounted: boolean): void;
  createFolder(): void;
  refresh(): Promise<void>;
  analyzeAll(): Promise<void>;
  toggleBatch(): void;
  readonly active: boolean;
}

const state = reactive<GitHubHeroSnapshot>({
  title: "全部",
  description: "0 个 Star 仓库 · 可右键仓库卡片移动或添加到正在使用",
  kind: "all",
  batchMode: false
});

let actions: GitHubHeroActions = {};
let active = false;

function update(snapshot: GitHubHeroSnapshot): void {
  Object.assign(state, snapshot);
}

function setActions(nextActions: GitHubHeroActions): void {
  actions = Object.freeze({ ...nextActions });
}

function setMounted(mounted: boolean): void {
  active = mounted;
}

function createFolder(): void {
  actions.createFolder?.();
}

async function refresh(): Promise<void> {
  await actions.refresh?.();
}

async function analyzeAll(): Promise<void> {
  await actions.analyzeAll?.();
}

function toggleBatch(): void {
  actions.toggleBatch?.();
}

export const githubHeroState = readonly(state);
export const githubHeroController: GitHubHeroController = Object.freeze({
  update,
  setActions,
  setMounted,
  createFolder,
  refresh,
  analyzeAll,
  toggleBatch,
  get active() { return active; }
});
