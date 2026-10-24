import { reactive, readonly, type DeepReadonly } from "vue";

export interface WorkspaceItem {
  id: string;
  title: string;
}

export interface WorkspaceLaunchersSnapshot {
  mounted: boolean;
  visible: boolean;
  items: WorkspaceItem[];
}

export interface WorkspaceLaunchersActions {
  open?: (id: string) => void;
}

export interface WorkspaceLaunchersController {
  getSnapshot(): DeepReadonly<WorkspaceLaunchersSnapshot>;
  update(partial: Partial<WorkspaceLaunchersSnapshot>): void;
  setMounted(mounted: boolean): void;
  openWorkspace(id: string, fromUserClick?: boolean): void;
  setActions(actions: Partial<WorkspaceLaunchersActions>): void;
}

const DEFAULT_WORKSPACES: WorkspaceItem[] = [
  { id: "ai", title: "AI 助手" },
  { id: "todoist", title: "Todoist" },
  { id: "stickers", title: "表情包" },
  { id: "calcom", title: "预约" },
  { id: "wallpaper", title: "壁纸库" }
];

const initialState = (): WorkspaceLaunchersSnapshot => ({
  mounted: false,
  visible: false,
  items: [...DEFAULT_WORKSPACES]
});

export const workspaceLaunchersState = reactive<WorkspaceLaunchersSnapshot>(initialState());

let boundActions: WorkspaceLaunchersActions = {};

export const workspaceLaunchersController: WorkspaceLaunchersController = {
  getSnapshot() {
    return readonly(workspaceLaunchersState);
  },
  update(partial) {
    Object.assign(workspaceLaunchersState, partial);
  },
  setMounted(mounted) {
    workspaceLaunchersState.mounted = mounted;
  },
  openWorkspace(id, fromUserClick = false) {
    if (boundActions.open) {
      boundActions.open(id);
      return;
    }
    const win = typeof window !== "undefined" ? (window as any) : {};
    if (id === "todoist") {
      win.LogicWeaverTodoistMainWorkspace?.open();
      win.LogicWeaverWindowTabs?.bringToFront("todoist");
      return;
    }
    if (id === "ai") {
      win.LogicWeaverAiDialog?.open();
      return;
    }
    const tabs = win.LogicWeaverWindowTabs;
    if (tabs?.open) {
      tabs.open(id);
      return;
    }
    const btn = document.getElementById(`${id}-top-open`);
    if (btn && !fromUserClick) {
      btn.click();
    } else {
      window.dispatchEvent(new CustomEvent("logicweaver:open-workspace", { detail: { id } }));
    }
  },
  setActions(actions) {
    boundActions = { ...boundActions, ...actions };
  }
};
