import { reactive, readonly, type DeepReadonly } from "vue";

export type ProfileAction = "messages" | "tabs" | "refresh" | "switch" | "web";

export interface ProfileMenuSnapshot {
  mounted: boolean;
  visible: boolean;
  x: number;
  y: number;
  avatarUrl: string;
  userName: string;
  mid?: string | number;
}

export interface ProfileMenuActions {
  onAction?: (action: ProfileAction) => void;
  showInfo?: () => void;
  refresh?: () => Promise<void> | void;
  switchUser?: () => void;
  openWeb?: () => void;
}

export interface ProfileMenuController {
  getSnapshot(): DeepReadonly<ProfileMenuSnapshot>;
  update(partial: Partial<ProfileMenuSnapshot>): void;
  setMounted(mounted: boolean): void;
  open(x: number, y: number): void;
  close(): void;
  trigger(action: ProfileAction): void;
  setActions(actions: Partial<ProfileMenuActions>): void;
}

export interface TopProfileState {
  avatarUrl: string;
  userName: string;
  buttonTitle: string;
}

export const topProfileState = reactive<TopProfileState>({
  avatarUrl: "assets/bilibili.svg",
  userName: "哔哩哔哩用户",
  buttonTitle: "通知中心"
});

const initialState = (): ProfileMenuSnapshot => ({
  mounted: false,
  visible: false,
  x: 0,
  y: 0,
  avatarUrl: "assets/bilibili.svg",
  userName: "用户"
});

export const profileMenuState = reactive<ProfileMenuSnapshot>(initialState());

let boundActions: ProfileMenuActions = {};

export const profileMenuController: ProfileMenuController = {
  getSnapshot() {
    return readonly(profileMenuState);
  },
  update(partial) {
    Object.assign(profileMenuState, partial);
  },
  setMounted(mounted) {
    profileMenuState.mounted = mounted;
  },
  open(x, y) {
    profileMenuState.x = x;
    profileMenuState.y = y;
    profileMenuState.visible = true;
    const menuEl = document.getElementById("bili-profile-menu");
    if (menuEl) {
      menuEl.hidden = false;
      menuEl.style.left = `${Math.min(window.innerWidth - 205, x)}px`;
      menuEl.style.top = `${Math.min(window.innerHeight - 150, y)}px`;
    }
  },
  close() {
    profileMenuState.visible = false;
    const menuEl = document.getElementById("bili-profile-menu");
    if (menuEl) menuEl.hidden = true;
  },
  trigger(action) {
    profileMenuController.close();
    if (boundActions.onAction) {
      boundActions.onAction(action);
      return;
    }
    if (action === "messages" && boundActions.showInfo) {
      boundActions.showInfo();
    } else if (action === "refresh" && boundActions.refresh) {
      void boundActions.refresh();
    } else if (action === "switch" && boundActions.switchUser) {
      boundActions.switchUser();
    } else if (action === "web" && boundActions.openWeb) {
      boundActions.openWeb();
    } else {
      window.dispatchEvent(new CustomEvent("logicweaver:profile-menu-action", { detail: { action } }));
    }
  },
  setActions(actions) {
    boundActions = { ...boundActions, ...actions };
  }
};
