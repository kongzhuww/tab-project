import { reactive, readonly } from "vue";

export type GitHubDescriptionKind = "plain" | "ai" | "analyzing" | "empty";
export type GitHubReleaseKind = "update" | "latest" | "none";

export interface GitHubRepositoryCardView {
  fullName: string;
  name: string;
  owner: string;
  avatarUrl: string;
  url: string;
  folder: string;
  used: boolean;
  showUsedStatus: boolean;
  selected: boolean;
  stars: string;
  language: string;
  updated: string;
  description: string;
  descriptionKind: GitHubDescriptionKind;
  tags: readonly string[];
  platforms: readonly string[];
  releaseKind: GitHubReleaseKind;
  releaseText: string;
  releaseUrl: string;
  customRemark?: string;
}

export interface GitHubRepositoryViewSnapshot {
  cards: readonly GitHubRepositoryCardView[];
  batchMode: boolean;
  emptyMessage: string;
  searchMessage: string;
  page: number;
  totalPages: number;
  totalItems: number;
  loadedItems: number;
  serverPaged: boolean;
}

export interface GitHubRepositoryActions {
  openDetail?(fullName: string): void;
  removeUsed?(fullName: string): void;
  toggleSelection?(fullName: string): void;
  setSelection?(fullName: string, selected: boolean): void;
  resetSearch?(): void;
  changePage?(page: number): void | Promise<void>;
  startDrag?(fullName: string, event: DragEvent): void;
}

export interface GitHubRepositoryController {
  update(snapshot: GitHubRepositoryViewSnapshot): void;
  setActions(actions: GitHubRepositoryActions): void;
  setMounted(mounted: boolean): void;
  openDetail(fullName: string): void;
  removeUsed(fullName: string): void;
  toggleSelection(fullName: string): void;
  setSelection(fullName: string, selected: boolean): void;
  resetSearch(): void;
  changePage(page: number): Promise<void>;
  startDrag(fullName: string, event: DragEvent): void;
  readonly active: boolean;
}

const state = reactive<GitHubRepositoryViewSnapshot>({
  cards: [], batchMode: false, emptyMessage: "", searchMessage: "", page: 1,
  totalPages: 1, totalItems: 0, loadedItems: 0, serverPaged: false
});
let actions: GitHubRepositoryActions = {};
let active = false;

function update(snapshot: GitHubRepositoryViewSnapshot): void {
  const cards = Array.isArray(snapshot?.cards)
    ? snapshot.cards.map((card) => ({
        ...card,
        tags: Array.isArray(card.tags) ? [...card.tags] : [],
        platforms: Array.isArray(card.platforms) ? [...card.platforms] : []
      }))
    : [];
  Object.assign(state, snapshot, { cards });
}
function setActions(nextActions: GitHubRepositoryActions): void { actions = Object.freeze({ ...nextActions }); }
function setMounted(mounted: boolean): void { active = mounted; }
function openDetail(fullName: string): void { actions.openDetail?.(fullName); }
function removeUsed(fullName: string): void { actions.removeUsed?.(fullName); }
function toggleSelection(fullName: string): void { actions.toggleSelection?.(fullName); }
function setSelection(fullName: string, selected: boolean): void { actions.setSelection?.(fullName, selected); }
function resetSearch(): void { actions.resetSearch?.(); }
async function changePage(page: number): Promise<void> { await actions.changePage?.(page); }
function startDrag(fullName: string, event: DragEvent): void { actions.startDrag?.(fullName, event); }

export const githubRepositoryState = readonly(state);
export const githubRepositoryController: GitHubRepositoryController = Object.freeze({
  update, setActions, setMounted, openDetail, removeUsed,
  toggleSelection, setSelection, resetSearch, changePage, startDrag,
  get active() { return active; }
});
