import { reactive } from "vue";

export interface BiliUpGroupView {
  id: string;
  name: string;
  parentId: string;
  upMids: string[];
  depth: number;
}

export interface BiliFollowingView {
  mid: string;
  name: string;
  face: string;
  sign: string;
  groupIds: string[];
  groupName: string;
}

export interface BiliUpGroupManagerState {
  open: boolean;
  loading: boolean;
  refreshing: boolean;
  error: string;
  groups: BiliUpGroupView[];
  followings: BiliFollowingView[];
  activeGroupId: string;
  query: string;
  filter: "all" | "ingroup";
  onlyUngrouped: boolean;
  page: number;
  pageSize: number;
  busyMid: string;
}

export type BiliUpGroupManagerAction =
  | "close"
  | "refresh"
  | "create-group"
  | "rename-group"
  | "delete-group"
  | "move-group"
  | "toggle-member"
  | "preview-up";

export const biliUpGroupManagerState = reactive<BiliUpGroupManagerState>({
  open: false,
  loading: false,
  refreshing: false,
  error: "",
  groups: [],
  followings: [],
  activeGroupId: "",
  query: "",
  filter: "all",
  onlyUngrouped: true,
  page: 1,
  pageSize: 24,
  busyMid: ""
});

let actionHandler: ((action: BiliUpGroupManagerAction, payload?: unknown) => Promise<void> | void) | null = null;

export const biliUpGroupManagerController = {
  state: biliUpGroupManagerState,
  setActionHandler(handler: typeof actionHandler): void { actionHandler = handler; },
  open(partial: Partial<BiliUpGroupManagerState> = {}): void {
    Object.assign(biliUpGroupManagerState, { open: true, loading: true, refreshing: false, error: "", groups: [], followings: [], activeGroupId: "", query: "", filter: "all", page: 1, busyMid: "" }, partial);
  },
  update(partial: Partial<BiliUpGroupManagerState>): void { Object.assign(biliUpGroupManagerState, partial); },
  async dispatch(action: BiliUpGroupManagerAction, payload?: unknown): Promise<void> { await actionHandler?.(action, payload); },
  close(): void {
    if (biliUpGroupManagerState.busyMid || biliUpGroupManagerState.refreshing) return;
    biliUpGroupManagerState.open = false;
    void actionHandler?.("close");
  }
};

if (typeof window !== "undefined") {
  (window as unknown as { LogicWeaverBiliUpGroupManager?: typeof biliUpGroupManagerController }).LogicWeaverBiliUpGroupManager = biliUpGroupManagerController;
}
