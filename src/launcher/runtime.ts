import { launcherService, type LauncherLink } from "../services/launcher.service";
import { launcherGroupsController } from "../launchers/store";
import { launcherFolderController, folderState } from "./folder-store";
import { launcherMenusController } from "./menus-store";
import { launcherDialogsController } from "./dialogs-store";
import { promptLauncherFolderDelete } from "./menu-actions";
import { folderParent } from "./folder-tree";

type MenuEvent = Pick<MouseEvent, "clientX" | "clientY"> & { preventDefault?: () => void };
const win = () => window as any;
let started = false;
let initialization: Promise<void> | undefined;
let unsubscribe: (() => void) | undefined;
let storageListener: ((changes: Record<string, any>, area: string) => void) | undefined;

function otherPages(current: string) {
  return launcherService.getPageNames().filter((id) => id !== current)
    .map((id) => ({ id, name: launcherService.getPageLabel(id) }));
}
function refreshFolder(): void {
  if (!folderState.isOpen || !folderState.activeFolder) return;
  const data = launcherService.getState();
  // 文件夹内容归属于该文件夹本身，切换外部标签分区时保持文件夹内网站正常显示，绝不变空
  const active = folderState.activeFolder;
  launcherFolderController.setLinks(data.links.filter(link => (link.group || "常用网站") === active));
  const linksByGroup = new Map<string, LauncherLink[]>();
  for (const link of data.links) {
    const group = link.group || "常用网站";
    if (!linksByGroup.has(group)) linksByGroup.set(group, []);
    linksByGroup.get(group)!.push(link);
  }
  const parents = new Map(Object.keys(data.folders).map(name => [name, folderParent(data.folders, name)]));
  const childCounts = new Map<string, number>();
  for (const parent of parents.values()) if (parent) childCounts.set(parent, (childCounts.get(parent) || 0) + 1);
  launcherFolderController.setFolders([...parents].filter(([, parent]) => parent === active).map(([groupName]) => ({
    groupName, links: linksByGroup.get(groupName) || [],
    count: (linksByGroup.get(groupName)?.length || 0) + (childCounts.get(groupName) || 0)
  })), folderParent(data.folders, active));
}

export const launcherRuntime = {
  openEditor(link?: LauncherLink): void {
    launcherDialogsController.openEditDialog(link || {});
  },
  openFolder(group: string = folderState.activeFolder): void {
    if (!group) return;
    const data = launcherService.getState();
    const links = data.links.filter((link) => (link.group || "常用网站") === group);
    launcherFolderController.openFolder(group, links);
    refreshFolder();
  },
  openLinkMenu(link: LauncherLink, event?: MenuEvent): void {
    event?.preventDefault?.();
    launcherMenusController.openLinkMenu(link, otherPages(link.page || "常用网站"), event?.clientX || 0, event?.clientY || 0);
  },
  openFolderMenu(group: string, event?: MenuEvent, page?: string): void {
    event?.preventDefault?.();
    const data = launcherService.getState();
    const current = page || data.activePage;
    launcherMenusController.openFolderMenu(group,
      launcherService.getGroupSize(group) === "small" ? "扩大为大收藏夹" : "缩小为小收藏夹",
      otherPages(current), event?.clientX || 0, event?.clientY || 0);
  },
  openPageMenu(page: string, event?: MenuEvent): void {
    event?.preventDefault?.();
    launcherMenusController.openPageMenu(page, launcherService.getPageLabel(page),
      launcherService.getPageNames().length > 1, event?.clientX || 0, event?.clientY || 0);
  },
  openIconPicker(link: LauncherLink): void {
    if (!link) return;
    const query = link.title || launcherService.hostOf(link.url);
    launcherDialogsController.openIconPicker(link.title || "网站", query, link.url, String(link.id));
    void launcherDialogsController.searchIcons(query);
  },
  render(): void {
    const data = launcherService.getState();
    const pages = launcherService.getPageNames();
    launcherGroupsController.update({ ...data, pages,
      activePage: pages.includes(data.activePage) ? data.activePage : pages[0] });
    refreshFolder();
  },
  start(): void {
    if (started) return;
    started = true;
    launcherGroupsController.setActions({
      openFolder: (group) => this.openFolder(group),
      deleteFolder: promptLauncherFolderDelete,
      openLinkMenu: (link, event) => this.openLinkMenu(link, event),
      openFolderMenu: (group, page, event) => this.openFolderMenu(group, event, page),
      openPageMenu: (page, event) => this.openPageMenu(page, event)
    });
    launcherFolderController.setActionHandler((action, payload) => {
      if (action === "close") launcherFolderController.closeFolder();
      else if (action === "folder:open" && typeof payload === "string") this.openFolder(payload);
      else if (action === "link:contextmenu" && payload?.link) this.openLinkMenu(payload.link, payload);
    });
    unsubscribe = launcherService.subscribe(() => {
      this.render();
    });
    storageListener = (changes, area) => {
      if (area !== "local") return;
      const map = { quickLinks: "links", quickLinkGroupSizes: "groupSizes", launcherFolders: "folders",
        launcherPages: "pages", launcherPageLabels: "pageLabels", launcherActivePage: "activePage" } as const;
      const patch: Record<string, any> = {};
      for (const [key, field] of Object.entries(map)) {
        if (!(key in changes)) continue;
        const value = changes[key].newValue;
        patch[field] = field === "links" ? (Array.isArray(value) ? value : []) :
          field === "pages" ? (Array.isArray(value) && value.length ? value : ["常用网站"]) :
          field === "activePage" ? (value || "常用网站") : (value || {});
      }
      if (Object.keys(patch).length) {
        launcherService.updateState(patch);
        this.render();
      }
    };
    win().chrome?.storage?.onChanged?.addListener(storageListener);
  },
  init(): Promise<void> {
    this.start();
    if (initialization) return initialization;
    initialization = (async () => {
      await launcherService.ready;
      const chrome = win().chrome;
      if (!started) return;
      const stored = await chrome?.storage?.local?.get("quickLinksReady") || {};
      if (!started) return;
      if (!launcherService.getState().links.length && !stored.quickLinksReady && chrome?.topSites) {
        const sites = await new Promise<Array<{ title: string; url: string }>>((resolve) => chrome.topSites.get((items: any) => resolve(items || [])));
        if (!started) return;
        if (!launcherService.getState().links.length) {
          launcherService.updateState({ links: sites.slice(0, 14).map((site) => ({
            id: crypto.randomUUID(), title: site.title || launcherService.hostOf(site.url), url: site.url, group: "常用网站"
          })) });
          await launcherService.save();
        }
      }
      if (started) this.render();
    })().catch((error) => { initialization = undefined; throw error; });
    return initialization;
  },
  stop(): void {
    started = false;
    unsubscribe?.();
    unsubscribe = undefined;
    if (storageListener) win().chrome?.storage?.onChanged?.removeListener(storageListener);
    storageListener = undefined;
    launcherFolderController.setActionHandler(null);
    launcherGroupsController.setActions({ openFolder: undefined, deleteFolder: undefined,
      openLinkMenu: undefined, openFolderMenu: undefined, openPageMenu: undefined });
  }
};
