import { reactive, readonly, type DeepReadonly } from "vue";
import { runLauncherMenuAction } from "./menu-actions";
import { appDialog } from "../core/app-dialog.store";

export interface LauncherMenuItem {
  id: string;
  title: string;
  url?: string;
  note?: string;
  group?: string;
  page?: string;
}

export interface PageSubmenuItem {
  id: string;
  name: string;
}

export interface LauncherMenusState {
  mounted: boolean;
  folderMenu: {
    isOpen: boolean;
    groupName: string;
    sizeText: string;
    canMove: boolean;
    pages: PageSubmenuItem[];
    x: number;
    y: number;
    flyoutOpen: boolean;
  };
  linkMenu: {
    isOpen: boolean;
    link: LauncherMenuItem | null;
    pages: PageSubmenuItem[];
    x: number;
    y: number;
    flyoutOpen: boolean;
  };
  pageMenu: {
    isOpen: boolean;
    pageName: string;
    pageLabel: string;
    canDelete: boolean;
    x: number;
    y: number;
  };
  blankMenu: {
    isOpen: boolean;
    page: string;
    x: number;
    y: number;
  };
}

export const menusState = reactive<LauncherMenusState>({
  mounted: false,
  folderMenu: {
    isOpen: false,
    groupName: "",
    sizeText: "扩大为大收藏夹",
    canMove: true,
    pages: [],
    x: 0,
    y: 0,
    flyoutOpen: false
  },
  linkMenu: {
    isOpen: false,
    link: null,
    pages: [],
    x: 0,
    y: 0,
    flyoutOpen: false
  },
  pageMenu: {
    isOpen: false,
    pageName: "",
    pageLabel: "",
    canDelete: true,
    x: 0,
    y: 0
  },
  blankMenu: {
    isOpen: false,
    page: "",
    x: 0,
    y: 0
  }
});

export const launcherMenusController = {
  get state() {
    return menusState;
  },

  getSnapshot(): DeepReadonly<LauncherMenusState> {
    return readonly(menusState);
  },

  setMounted(mounted: boolean) {
    menusState.mounted = mounted;
  },

  closeAll() {
    this.closeFolderMenu();
    this.closeLinkMenu();
    this.closePageMenu();
    this.closeBlankMenu();
  },

  openFolderMenu(groupName: string, sizeText: string, pages: PageSubmenuItem[], x: number, y: number) {
    this.closeAll();
    menusState.folderMenu = {
      isOpen: true,
      groupName,
      sizeText,
      canMove: pages.length > 0,
      pages: [...pages],
      x: Math.max(8, Math.min(window.innerWidth - 220, x)),
      y: Math.max(8, Math.min(window.innerHeight - 240, y)),
      flyoutOpen: false
    };
  },

  closeFolderMenu() {
    menusState.folderMenu.isOpen = false;
    menusState.folderMenu.flyoutOpen = false;
  },

  setFolderFlyoutOpen(open: boolean) {
    menusState.folderMenu.flyoutOpen = open;
  },

  openLinkMenu(link: LauncherMenuItem, pages: PageSubmenuItem[], x: number, y: number) {
    this.closeAll();
    menusState.linkMenu = {
      isOpen: true,
      link: { ...link },
      pages: [...pages],
      x: Math.max(8, Math.min(window.innerWidth - 220, x)),
      y: Math.max(8, Math.min(window.innerHeight - 280, y)),
      flyoutOpen: false
    };
  },

  closeLinkMenu() {
    menusState.linkMenu.isOpen = false;
    menusState.linkMenu.link = null;
    menusState.linkMenu.flyoutOpen = false;
  },

  setLinkFlyoutOpen(open: boolean) {
    menusState.linkMenu.flyoutOpen = open;
  },

  openPageMenu(pageName: string, pageLabel: string, canDelete: boolean, x: number, y: number) {
    this.closeAll();
    menusState.pageMenu = {
      isOpen: true,
      pageName,
      pageLabel,
      canDelete,
      x: Math.max(8, Math.min(window.innerWidth - 200, x)),
      y: Math.max(8, Math.min(window.innerHeight - 150, y))
    };
  },

  closePageMenu() {
    menusState.pageMenu.isOpen = false;
  },

  openBlankMenu(page: string, x: number, y: number) {
    this.closeAll();
    menusState.blankMenu = {
      isOpen: true,
      page,
      x: Math.max(8, Math.min(window.innerWidth - 200, x)),
      y: Math.max(8, Math.min(window.innerHeight - 150, y))
    };
  },

  closeBlankMenu() {
    menusState.blankMenu.isOpen = false;
  },

  dispatch(action: string, payload?: any) {
    void runLauncherMenuAction(action, payload).catch((error) => {
      console.warn("[Launcher] 菜单操作失败", error);
      void appDialog.alert({ title: "操作失败", message: "操作失败，请重试。" });
    });
  }
};
