import { reactive, readonly, type DeepReadonly } from "vue";
import type { LauncherFolderMap } from "../launcher/folder-tree";

declare const chrome: any;

export interface LauncherLink {
  id: string;
  title: string;
  url: string;
  icon?: string;
  customIcon?: string;
  note?: string;
  group?: string;
  page?: string;
  pinned?: boolean;
}

export interface LauncherFolderItem {
  groupName: string;
  pageName: string;
  links: LauncherLink[];
}

export interface LauncherGroupsSnapshot {
  mounted: boolean;
  activePage: string;
  pages: string[];
  pageLabels: Record<string, string>;
  links: LauncherLink[];
  groupSizes: Record<string, "small" | "large">;
  folders: LauncherFolderMap;
  showSites: boolean;
  hasTodo: boolean;
  hasBili: boolean;
}

export interface LauncherGroupsActions {
  openFolder?: (groupName: string, event?: MouseEvent) => void;
  deleteFolder?: (groupName: string) => void;
  openLink?: (link: LauncherLink, event?: MouseEvent) => void;
  openLinkMenu?: (link: LauncherLink, event: MouseEvent) => void;
  openFolderMenu?: (groupName: string, pageName: string, event: MouseEvent) => void;
  openPageMenu?: (pageName: string, event: MouseEvent) => void;
}

export interface LauncherExternalDragHover {
  link: LauncherLink;
  clientX: number;
  clientY: number;
}

export interface LauncherGroupsController {
  getSnapshot(): DeepReadonly<LauncherGroupsSnapshot>;
  update(partial: Partial<LauncherGroupsSnapshot>): void;
  setMounted(mounted: boolean): void;
  setActivePage(page: string): void;
  setPages(pages: string[]): void;
  setPageLabels(labels: Record<string, string>): void;
  setLinks(links: LauncherLink[]): void;
  setPrefs(showSites: boolean, hasTodo: boolean, hasBili: boolean): void;
  setActions(actions: Partial<LauncherGroupsActions>): void;
  setExternalDragHandler(handler: ((hover: LauncherExternalDragHover | null) => void) | null): void;
  setExternalDropHandler(handler: ((link: LauncherLink) => Promise<boolean>) | null): void;
  handleExternalDragHover(hover: LauncherExternalDragHover | null): void;
  handleExternalDrop(link: LauncherLink): Promise<boolean>;
  switchPage(page: string): void;
  nextPage(): void;
  prevPage(): void;
  addPage(name: string): void;
  openFolder(groupName: string, event?: MouseEvent): void;
  deleteFolder(groupName: string): void;
  openLink(link: LauncherLink, event?: MouseEvent): void;
  openLinkMenu(link: LauncherLink, event: MouseEvent): void;
  openFolderMenu(groupName: string, pageName: string, event: MouseEvent): void;
  openPageMenu(pageName: string, event: MouseEvent): void;
}

const initialState = (): LauncherGroupsSnapshot => ({
  mounted: false,
  activePage: "常用网站",
  pages: ["常用网站"],
  pageLabels: {},
  links: [],
  groupSizes: {},
  folders: {},
  showSites: true,
  hasTodo: true,
  hasBili: false
});

import { launcherService, type LauncherDataState } from "../services/launcher.service";
import { launcherFolderController } from "../launcher/folder-store";
import { launcherMenusController } from "../launcher/menus-store";

export const launcherGroupsState = reactive<LauncherGroupsSnapshot>(initialState());

// 订阅 LauncherService 变更，保持响应式同步
launcherService.subscribe((data: LauncherDataState) => {
  launcherGroupsState.links = [...data.links];
  launcherGroupsState.pages = [...data.pages];
  launcherGroupsState.pageLabels = { ...data.pageLabels };
  launcherGroupsState.groupSizes = { ...data.groupSizes };
  launcherGroupsState.folders = { ...data.folders };
  launcherGroupsState.activePage = data.activePage;
});

let boundActions: LauncherGroupsActions = {};
let externalDragHandler: ((hover: LauncherExternalDragHover | null) => void) | null = null;
let externalDropHandler: ((link: LauncherLink) => Promise<boolean>) | null = null;

export const launcherGroupsController: LauncherGroupsController = {
  getSnapshot() {
    return readonly(launcherGroupsState);
  },
  setExternalDragHandler(handler) {
    externalDragHandler = handler;
  },
  setExternalDropHandler(handler) {
    externalDropHandler = handler;
  },
  handleExternalDragHover(hover) {
    externalDragHandler?.(hover);
  },
  async handleExternalDrop(link) {
    if (externalDropHandler) return externalDropHandler(link);
    return false;
  },
  update(partial) {
    if (partial.folders) launcherGroupsState.folders = { ...partial.folders };
    if (partial.links) {
      launcherGroupsState.links = [...partial.links];
    }
    if (partial.pages) {
      launcherGroupsState.pages = [...partial.pages];
    }
    if (partial.pageLabels) {
      launcherGroupsState.pageLabels = { ...partial.pageLabels };
    }
    if (partial.groupSizes) {
      launcherGroupsState.groupSizes = { ...partial.groupSizes };
    }
    Object.assign(launcherGroupsState, partial);
    launcherService.updateState(partial);
  },
  setMounted(mounted) {
    launcherGroupsState.mounted = mounted;
  },
  setActivePage(page) {
    launcherGroupsState.activePage = page;
    void launcherService.setPage(page);
  },
  setPages(pages) {
    launcherGroupsState.pages = [...pages];
  },
  setPageLabels(labels) {
    launcherGroupsState.pageLabels = { ...labels };
  },
  setLinks(links) {
    launcherGroupsState.links = [...links];
  },
  setPrefs(showSites, hasTodo, hasBili) {
    launcherGroupsState.showSites = showSites;
    launcherGroupsState.hasTodo = hasTodo;
    launcherGroupsState.hasBili = hasBili;
  },
  setActions(actions) {
    boundActions = { ...boundActions, ...actions };
  },
  switchPage(page) {
    launcherGroupsState.activePage = page;
    void launcherService.setPage(page);
    window.dispatchEvent(new CustomEvent("logicweaver:launcher-switch-page", { detail: { page } }));
  },
  nextPage() {
    void launcherService.stepPage(1);
    window.dispatchEvent(new CustomEvent("logicweaver:launcher-next-page"));
  },
  prevPage() {
    void launcherService.stepPage(-1);
    window.dispatchEvent(new CustomEvent("logicweaver:launcher-prev-page"));
  },
  addPage(name) {
    void launcherService.addPage(name);
    window.dispatchEvent(new CustomEvent("logicweaver:launcher-add-page", { detail: { name } }));
  },
  openFolder(groupName, event) {
    if (boundActions.openFolder) {
      boundActions.openFolder(groupName, event);
      return;
    }
    const links = launcherGroupsState.links.filter((l) => (l.group || "常用网站") === groupName);
    launcherFolderController.openFolder(groupName, links);
    window.dispatchEvent(new CustomEvent("logicweaver:launcher-open-folder", { detail: { groupName } }));
  },
  deleteFolder(groupName: string) {
    if (boundActions.deleteFolder) {
      boundActions.deleteFolder(groupName);
      return;
    }
    void launcherService.deleteGroup(groupName, "release");
    window.dispatchEvent(new CustomEvent("logicweaver:launcher-delete-folder", { detail: { groupName } }));
  },
  openLink(link, event) {
    if (event && typeof event.preventDefault === "function") {
      event.preventDefault();
    }
    if (boundActions.openLink) {
      boundActions.openLink(link, event);
      return;
    }
    if (link?.url) {
      const inBackground = Boolean(event && (event.ctrlKey || event.metaKey || event.button === 1));
      if (typeof chrome !== "undefined" && chrome.tabs?.create) {
        chrome.tabs.create({ url: link.url, active: !inBackground });
      } else {
        window.open(link.url, "_blank", "noopener,noreferrer");
      }
    }
  },
  openLinkMenu(link, event) {
    if (boundActions.openLinkMenu) {
      boundActions.openLinkMenu(link, event);
      return;
    }
    const x = event?.clientX || 0;
    const y = event?.clientY || 0;
    const pages = launcherGroupsState.pages.map((p) => ({ id: p, name: launcherGroupsState.pageLabels[p] || p }));
    launcherMenusController.openLinkMenu(link, pages, x, y);
  },
  openFolderMenu(groupName, pageName, event) {
    if (boundActions.openFolderMenu) {
      boundActions.openFolderMenu(groupName, pageName, event);
      return;
    }
    const x = event?.clientX || 0;
    const y = event?.clientY || 0;
    const isLarge = launcherGroupsState.groupSizes[groupName] === "large";
    const sizeText = isLarge ? "缩小为普通文件夹" : "扩大为大文件夹";
    const pages = launcherGroupsState.pages.map((p) => ({ id: p, name: launcherGroupsState.pageLabels[p] || p }));
    launcherMenusController.openFolderMenu(groupName, sizeText, pages, x, y);
  },
  openPageMenu(pageName, event) {
    if (boundActions.openPageMenu) {
      boundActions.openPageMenu(pageName, event);
      return;
    }
    const x = event?.clientX || 0;
    const y = event?.clientY || 0;
    const label = launcherGroupsState.pageLabels[pageName] || pageName;
    const canDelete = launcherGroupsState.pages.length > 1;
    launcherMenusController.openPageMenu(pageName, label, canDelete, x, y);
  }
};
