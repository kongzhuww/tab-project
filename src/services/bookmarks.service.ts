declare const chrome: any;

import { bookmarkFolderStripController } from "../bookmarks/folder-strip-store";
import { bookmarkPanelController, type BookmarkItem } from "../bookmarks/panel-store";
import { bookmarkMenuController } from "../bookmarks/menu-store";
import { launcherService } from "./launcher.service";

export interface ChromeBookmarkNode {
  id: string;
  parentId?: string;
  index?: number;
  url?: string;
  title?: string;
  children?: ChromeBookmarkNode[];
  dateAdded?: number;
  dateGroupModified?: number;
}

export interface FlattenedBookmarkItem {
  id: string;
  parentId?: string;
  index?: number;
  title: string;
  url: string;
  folder: string;
  folderIds: string[];
}

export interface BookmarkImportState {
  items: FlattenedBookmarkItem[];
  tree: ChromeBookmarkNode | null;
  loaded: boolean;
  remarks: Record<string, string>;
  expandedFolders: Set<string>;
  focusFolderId: string;
  panelPosition: number | null;
  panelPinned: boolean;
}

export const BOOKMARK_PANEL_POSITION_KEY = "bookmarkPanelPositionV1";
export const BOOKMARK_PANEL_PINNED_KEY = "bookmarkPanelPinnedV1";
export const BOOKMARK_NODE_DRAG_TYPE = "application/x-newtab-browser-bookmark-node";

function hostOf(url?: string): string {
  if (!url) return "";
  if (typeof (window as any).hostOf === "function") return (window as any).hostOf(url);
  try {
    return new URL(url).hostname;
  } catch {
    return url;
  }
}

function favi(url?: string): string {
  if (!url) return "";
  if (typeof (window as any).favi === "function") return (window as any).favi(url);
  return `chrome-extension://${chrome?.runtime?.id || ""}/_favicon/?pageUrl=${encodeURIComponent(url)}&size=32`;
}

function storageGetLocal(keys: string[]): Promise<Record<string, any>> {
  if (typeof (window as any).storageGet === "function") {
    return (window as any).storageGet(keys);
  }
  return new Promise((resolve) => {
    if (typeof chrome !== "undefined" && chrome?.storage?.local?.get) {
      chrome.storage.local.get(keys, resolve);
    } else {
      resolve({});
    }
  });
}

function storageSetLocal(items: Record<string, any>): Promise<void> {
  if (typeof (window as any).storageSet === "function") {
    return (window as any).storageSet(items);
  }
  return new Promise((resolve) => {
    if (typeof chrome !== "undefined" && chrome?.storage?.local?.set) {
      chrome.storage.local.set(items, () => resolve());
    } else {
      resolve();
    }
  });
}

async function fetchWithTimeout(resource: RequestInfo | URL, options: RequestInit = {}, timeout = 5000): Promise<Response> {
  if (typeof (window as any).fetchTimeout === "function") {
    return (window as any).fetchTimeout(resource, options, timeout);
  }
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    const res = await fetch(resource, { credentials: "omit", ...options, signal: controller.signal });
    return res;
  } finally {
    clearTimeout(id);
  }
}

export class BookmarksService {
  public importState: BookmarkImportState = {
    items: [],
    tree: null,
    loaded: false,
    remarks: {},
    expandedFolders: new Set(),
    focusFolderId: "",
    panelPosition: null,
    panelPinned: false
  };

  private worker: Worker | null = null;
  private workerSeq = 0;
  private workerReady: Promise<unknown> | null = null;
  private workerPending = new Map<number, { resolve: (val: any) => void; reject: (err: any) => void }>();
  private dataPromise: Promise<void> | null = null;
  private topBookmarkFoldersEnabled = false;
  private topBookmarkEventsBound = false;
  private editingItem: any = null;
  private initialized: boolean = false;

  constructor() {
    this.initWorker();
    this.wireListeners();
    void this.init();
  }

  public async init(): Promise<void> {
    if (this.initialized) return;
    this.initialized = true;

    try {
      const stored: any = await storageGetLocal(["showBookmarkFoldersTop", "showBookmarkPanel", "bookmarkRemarks"]).catch(() => ({}));
      this.importState.remarks = stored?.bookmarkRemarks || {};
      const showFoldersTop = stored?.showBookmarkFoldersTop === true;
      const showPanel = stored?.showBookmarkPanel !== false;

      await this.ensureBookmarkData();
      await this.renderTopBookmarkFolderStrip(showFoldersTop && showPanel);
    } catch (err) {
      console.warn("[BookmarksService] Failed to initialize bookmarks", err);
    }

    if (typeof chrome !== "undefined" && chrome?.storage?.onChanged) {
      chrome.storage.onChanged.addListener((changes: any, area: string) => {
        if (area === "local" && (changes.showBookmarkFoldersTop || changes.showBookmarkPanel)) {
          storageGetLocal(["showBookmarkFoldersTop", "showBookmarkPanel"]).then((res: any) => {
            const showFoldersTop = res?.showBookmarkFoldersTop === true;
            const showPanel = res?.showBookmarkPanel !== false;
            void this.renderTopBookmarkFolderStrip(showFoldersTop && showPanel);
          });
        }
      });
    }
  }

  public initWorker(): void {
    if (typeof Worker === "undefined") return;
    try {
      this.worker = new Worker("generated/bookmarks-worker.js");
      this.worker.onmessage = (event) => {
        const { id, type: _type, result, error } = event.data || {};
        if (!id || !this.workerPending.has(id)) return;
        const { resolve, reject } = this.workerPending.get(id)!;
        this.workerPending.delete(id);
        if (error) reject(new Error(error));
        else resolve(result);
      };
      this.worker.onerror = () => {
        for (const entry of [...this.workerPending.values()]) entry.reject(new Error("Bookmarks Worker failed"));
      };
      if (this.importState.loaded) {
        this.workerReady = this.callWorker("INDEX_BOOKMARKS", { tree: this.importState.tree ? [this.importState.tree] : [] });
        void this.workerReady.catch(() => {});
      }
    } catch (e) {
      console.warn("[BookmarksWorker] Failed to initialize Web Worker:", e);
      this.worker = null;
    }
  }

  public callWorker(type: string, payload: any, timeoutMs = 5000, signal?: AbortSignal): Promise<any> {
    if (signal?.aborted) return Promise.reject(new DOMException("Cancelled", "AbortError"));
    if (!this.worker) this.initWorker();
    if (!this.worker) return Promise.reject(new Error("Bookmarks Worker not available"));
    return new Promise((resolve, reject) => {
      const id = ++this.workerSeq;
      const cleanup = () => {
        clearTimeout(timer);
        signal?.removeEventListener("abort", abort);
        this.workerPending.delete(id);
      };
      const entry = {
        resolve: (value: any) => { cleanup(); resolve(value); },
        reject: (error: unknown) => { cleanup(); reject(error); }
      };
      const abort = () => entry.reject(new DOMException("Cancelled", "AbortError"));
      const timer = setTimeout(() => entry.reject(new Error(`Worker request timeout [${type}]`)), timeoutMs);
      this.workerPending.set(id, entry);
      signal?.addEventListener("abort", abort, { once: true });
      try { this.worker!.postMessage({ id, type, payload }); } catch (error) { entry.reject(error); }
    });
  }

  // null means unavailable/failed; [] is a successful search with no matches.
  public async searchBookmarksViaWorker(query: string, limit = 30, signal?: AbortSignal): Promise<any[] | null> {
    if (signal?.aborted) throw new DOMException("Cancelled", "AbortError");
    if (!this.worker) this.initWorker();
    if (!this.worker) return null;
    try {
      await this.ensureBookmarkData();
      if (signal?.aborted) throw new DOMException("Cancelled", "AbortError");
      if (this.workerReady) await this.workerReady;
      const res = await this.callWorker("SEARCH_BOOKMARKS", { query, limit }, 5000, signal);
      return Array.isArray(res) ? res : null;
    } catch {
      if (signal?.aborted) throw new DOMException("Cancelled", "AbortError");
      return null;
    }
  }

  public collectBookmarks(
    node: ChromeBookmarkNode,
    path: string[] = [],
    out: FlattenedBookmarkItem[] = [],
    pathIds: string[] = []
  ): FlattenedBookmarkItem[] {
    const nextPath = node.title ? [...path, node.title] : path;
    const nextPathIds = node.id && node.id !== "0" ? [...pathIds, String(node.id)] : pathIds;
    for (const child of node.children || []) {
      if (child.url) {
        out.push({
          id: child.id,
          parentId: child.parentId,
          index: child.index,
          title: child.title || hostOf(child.url),
          url: child.url,
          folder: nextPath.join(" / ") || "书签",
          folderIds: nextPathIds
        });
      } else {
        this.collectBookmarks(child, nextPath, out, nextPathIds);
      }
    }
    return out;
  }

  private folderMapCache: Map<string, { folder: string; folderIds: string[] }> | null = null;
  private ignoredFoldersCache: Array<{ id?: string; path?: string } | string> | null = null;

  public getBookmarkFolderMap(): Map<string, { folder: string; folderIds: string[] }> {
    if (this.folderMapCache && this.importState.loaded) {
      return this.folderMapCache;
    }
    const map = new Map<string, { folder: string; folderIds: string[] }>();
    for (const item of this.importState.items) {
      map.set(String(item.id), { folder: item.folder, folderIds: item.folderIds });
    }
    this.folderMapCache = map;
    return map;
  }

  public async getIgnoredFolders(): Promise<Array<{ id?: string; path?: string } | string>> {
    const stored: any = await storageGetLocal(["searchIgnoredBookmarkFolders"]).catch(() => ({}));
    const raw = stored?.searchIgnoredBookmarkFolders;
    this.ignoredFoldersCache = Array.isArray(raw) ? raw : [];
    return this.ignoredFoldersCache;
  }

  public isBookmarkIgnored(
    b: { id?: string | number; parentId?: string | number; url?: string; folder?: string; folderIds?: string[]; title?: string },
    ignoredFolders: Array<{ id?: string; path?: string } | string>,
    folderMap?: Map<string, { folder: string; folderIds: string[] }>
  ): boolean {
    if (!ignoredFolders || !ignoredFolders.length) return false;

    const ignoredIdSet = new Set<string>();
    const ignoredPathList: string[] = [];

    for (const item of ignoredFolders) {
      if (typeof item === "string") {
        ignoredIdSet.add(item);
        ignoredPathList.push(item.toLowerCase());
      } else if (item && typeof item === "object") {
        if (item.id) ignoredIdSet.add(String(item.id));
        if (item.path) ignoredPathList.push(item.path.trim().toLowerCase());
      }
    }

    const bId = String(b.id || "");
    const pId = String(b.parentId || "");

    // 1. 直接命中 ID 或 parentId
    if (bId && ignoredIdSet.has(bId)) return true;
    if (pId && ignoredIdSet.has(pId)) return true;

    // 2. 检查 folderIds 祖先
    if (b.folderIds && b.folderIds.some((id) => ignoredIdSet.has(String(id)))) {
      return true;
    }

    // 3. 检查从 folderMap 中查到的祖先
    const fMap = folderMap || (this.folderMapCache ?? undefined);
    if (fMap && bId && fMap.has(bId)) {
      const info = fMap.get(bId)!;
      if (info.folderIds && info.folderIds.some((id) => ignoredIdSet.has(String(id)))) {
        return true;
      }
      if (info.folder) {
        const fLower = info.folder.toLowerCase();
        if (ignoredPathList.some((p) => fLower === p || fLower.startsWith(p + " /") || fLower.includes(p))) {
          return true;
        }
      }
    }

    // 4. 检查路径文本匹配
    if (b.folder) {
      const fLower = b.folder.toLowerCase();
      if (ignoredPathList.some((p) => fLower === p || fLower.startsWith(p + " /") || fLower.includes(p))) {
        return true;
      }
    }

    return false;
  }

  public bookmarkBarRoot(root: ChromeBookmarkNode | null): ChromeBookmarkNode | null {
    if (!root) return null;
    return (root.children || []).find((node) => String(node.id) === "1")
      || (root.children || []).find((node) => /书签栏|收藏夹栏|bookmarks bar|favorites bar/i.test(node.title || ""))
      || root.children?.[0] || null;
  }

  public bookmarkNodeById(node: ChromeBookmarkNode | null, id: string | number): ChromeBookmarkNode | null {
    if (!node) return null;
    if (String(node.id) === String(id)) return node;
    for (const child of node.children || []) {
      const found = this.bookmarkNodeById(child, id);
      if (found) return found;
    }
    return null;
  }

  public bookmarkNodeContains(node: ChromeBookmarkNode | null, id: string | number): boolean {
    if (!node) return false;
    return (node.children || []).some(
      (child) => String(child.id) === String(id) || this.bookmarkNodeContains(child, id)
    );
  }

  public countBookmarkLinks(node: ChromeBookmarkNode | null): number {
    if (!node) return 0;
    return (node.children || []).reduce(
      (sum, child) => sum + (child.url ? 1 : this.countBookmarkLinks(child)),
      0
    );
  }

  public getChildrenOfFolder(folderId: string): BookmarkItem[] {
    const node = this.bookmarkNodeById(this.importState.tree, folderId);
    if (!node || !Array.isArray(node.children)) return [];
    return node.children.map((c) => ({
      id: String(c.id),
      title: c.title || c.url || "未命名",
      url: c.url,
      isFolder: !c.url,
      parentId: c.parentId
    }));
  }

  public async loadBookmarks(): Promise<void> {
    await this.ensureBookmarkData();
  }

  public async ensureBookmarkData(): Promise<void> {
    if (this.importState.loaded) return;
    if (!this.dataPromise) {
      this.dataPromise = (async () => {
        const stored: any = await storageGetLocal(["bookmarkRemarks"]).catch(() => ({}));
        this.importState.remarks = stored?.bookmarkRemarks || {};
        let tree: ChromeBookmarkNode[] = [];
        if (typeof chrome !== "undefined" && chrome?.bookmarks?.getTree) {
          tree = await new Promise((resolve) => chrome.bookmarks.getTree(resolve));
        }
        this.importState.tree = tree?.[0] || null;
        if (this.importState.tree) {
          this.importState.items = this.collectBookmarks(this.importState.tree, [], []).sort((a, b) =>
            a.folder.localeCompare(b.folder, "zh") || a.title.localeCompare(b.title, "zh")
          );
        } else {
          this.importState.items = [];
        }
        this.importState.loaded = true;
        if (this.worker) {
          this.workerReady = this.callWorker("INDEX_BOOKMARKS", { tree: tree || [] });
          void this.workerReady.catch(() => {});
        }
      })().finally(() => {
        this.dataPromise = null;
      });
    }
    await this.dataPromise;
  }

  public async reloadBookmarkTree(): Promise<void> {
    let tree: ChromeBookmarkNode[] = [];
    if (typeof chrome !== "undefined" && chrome?.bookmarks?.getTree) {
      tree = await new Promise((resolve) => chrome.bookmarks.getTree(resolve));
    }
    this.importState.tree = tree?.[0] || null;
    if (this.importState.tree) {
      this.importState.items = this.collectBookmarks(this.importState.tree, [], []).sort((a, b) =>
        a.folder.localeCompare(b.folder, "zh") || a.title.localeCompare(b.title, "zh")
      );
    } else {
      this.importState.items = [];
    }
    this.importState.loaded = true;
    this.folderMapCache = null;
    if (this.worker) {
      this.workerReady = this.callWorker("INDEX_BOOKMARKS", { tree: tree || [] });
      void this.workerReady.catch(() => {});
    }
    void this.renderBookmarkImports();
    if (this.topBookmarkFoldersEnabled) {
      await this.renderTopBookmarkFolderStrip(true);
    }
  }

  public async renderTopBookmarkFolderStrip(enabled: boolean = this.topBookmarkFoldersEnabled): Promise<void> {
    this.topBookmarkFoldersEnabled = !!enabled;
    bookmarkFolderStripController.setEnabled(this.topBookmarkFoldersEnabled);

    const strip = document.getElementById("bookmark-folder-strip");
    const handle = document.getElementById("bookmark-handle");
    const topbar = document.querySelector(".topbar");
    if (handle) handle.hidden = this.topBookmarkFoldersEnabled;
    if (strip) strip.hidden = !this.topBookmarkFoldersEnabled;
    topbar?.classList.toggle("bookmark-folders-mode", this.topBookmarkFoldersEnabled);

    if (!this.topBookmarkFoldersEnabled) {
      bookmarkFolderStripController.setFolders([]);
      return;
    }

    let tree: ChromeBookmarkNode[] = [];
    if (typeof chrome !== "undefined" && chrome?.bookmarks?.getTree) {
      tree = await new Promise((resolve) => chrome.bookmarks.getTree(resolve));
    }
    const bar = this.bookmarkBarRoot(tree?.[0] || null);
    const ignored = await this.getIgnoredFolders();
    const folderMap = this.getBookmarkFolderMap();

    const folders = (bar?.children || []).filter((node) => {
      if (node.url) return false;
      if (this.isBookmarkIgnored(node, ignored, folderMap)) return false;
      return true;
    });

    bookmarkFolderStripController.setFolders(
      folders.map((f) => ({ id: String(f.id), title: f.title || "未命名", parentId: f.parentId }))
    );

    if (!this.topBookmarkEventsBound && typeof chrome !== "undefined" && chrome?.bookmarks) {
      this.topBookmarkEventsBound = true;
      const refresh = () => {
        this.importState.loaded = false;
        if (this.topBookmarkFoldersEnabled) this.renderTopBookmarkFolderStrip(true);
      };
      chrome.bookmarks.onCreated?.addListener(refresh);
      chrome.bookmarks.onRemoved?.addListener(refresh);
      chrome.bookmarks.onMoved?.addListener(refresh);
      chrome.bookmarks.onChildrenReordered?.addListener(refresh);
    }
  }

  public toggleFolderExpand(folderId: string): void {
    const id = String(folderId || "");
    if (this.importState.expandedFolders.has(id)) {
      this.importState.expandedFolders.delete(id);
    } else {
      this.importState.expandedFolders.add(id);
    }
    this.renderBookmarkImports();
  }

  public async renderBookmarkImports(query: string = ""): Promise<void> {
    const keyword = query.trim().toLowerCase();
    const ignored = await this.getIgnoredFolders();
    const folderMap = this.getBookmarkFolderMap();

    // 过滤掉被忽略的书签项
    const unignoredItems = this.importState.items.filter(
      (item) => !this.isBookmarkIgnored(item, ignored, folderMap)
    );

    if (!unignoredItems.length) {
      bookmarkPanelController.setBookmarks([], "书签栏为空");
    } else if (keyword) {
      const allMatches = unignoredItems.filter((item) =>
        `${item.title} ${item.url} ${item.folder}`.toLowerCase().includes(keyword)
      );
      bookmarkPanelController.setBookmarks(
        allMatches.slice(0, 80).map((m) => ({
          id: String(m.id),
          title: m.title || m.url,
          url: m.url,
          folder: m.folder,
          isFolder: false
        })),
        allMatches.length ? "" : "没有匹配的书签"
      );
    } else {
      const focusFolder = this.importState.focusFolderId
        ? this.bookmarkNodeById(this.importState.tree, this.importState.focusFolderId)
        : null;
      const rootChildren = focusFolder?.children || this.importState.tree?.children || [];

      // 树形递归展开：支持二级及深层文件夹就地展开与折叠，杜绝替换父级
      const buildDisplayList = (nodes: ChromeBookmarkNode[], level = 0): any[] => {
        const result: any[] = [];
        for (const c of nodes) {
          if (this.isBookmarkIgnored(c, ignored, folderMap)) continue;
          const isFolder = !c.url;
          const isExpanded = isFolder && this.importState.expandedFolders.has(String(c.id));
          result.push({
            id: String(c.id),
            title: c.title || c.url || "未命名",
            url: c.url,
            isFolder,
            level,
            expanded: isExpanded,
            parentId: c.parentId
          });
          if (isFolder && isExpanded && Array.isArray(c.children)) {
            result.push(...buildDisplayList(c.children, level + 1));
          }
        }
        return result;
      };

      bookmarkPanelController.setBookmarks(buildDisplayList(rootChildren));
    }
  }

  public async openBookmarkFolderWindow(folderId: string): Promise<void> {
    await this.ensureBookmarkData();
    const id = String(folderId || "");
    const folder = this.bookmarkNodeById(this.importState.tree, id);
    if (!folder || folder.url) {
      bookmarkPanelController.showFeedback("这个书签页不存在", true);
      return;
    }
    if (this.importState.focusFolderId === id && bookmarkPanelController.state.open) {
      this.closeBookmarkPanel();
      return;
    }
    await this.openBookmarkPanel(id);
  }

  public async openBookmarkPanel(folderId: string = "", anchorEl: HTMLElement | null = null): Promise<void> {
    this.importState.focusFolderId = String(folderId || "");
    this.importState.expandedFolders.clear();
    this.applyBookmarkPanelPosition(this.importState.focusFolderId, anchorEl);

    const handle = document.getElementById("bookmark-handle");
    handle?.setAttribute("aria-expanded", "true");
    if (handle) handle.title = "收起浏览器书签";
    const handleIcon = document.getElementById("bookmark-handle-icon");
    if (handleIcon) handleIcon.textContent = "📂";

    await this.ensureBookmarkData();
    const focusFolder = this.importState.focusFolderId
      ? this.bookmarkNodeById(this.importState.tree, this.importState.focusFolderId)
      : null;
    if (this.importState.focusFolderId && !focusFolder) this.importState.focusFolderId = "";

    const titleText = focusFolder ? `书签 · ${focusFolder.title || "文件夹"}` : "浏览器书签";
    bookmarkPanelController.open(titleText);
    bookmarkPanelController.setPinned(this.importState.panelPinned);
    this.renderBookmarkImports();
  }

  public closeBookmarkPanel(): void {
    this.importState.expandedFolders.clear();
    const handle = document.getElementById("bookmark-handle");
    handle?.setAttribute("aria-expanded", "false");
    if (handle) handle.title = "展开浏览器书签";
    const handleIcon = document.getElementById("bookmark-handle-icon");
    if (handleIcon) handleIcon.textContent = "📁";
    bookmarkPanelController.close();
  }

  public toggleBookmarkPanel(): void {
    if (bookmarkPanelController.state.open) {
      this.closeBookmarkPanel();
    } else {
      this.openBookmarkPanel();
    }
  }

  public setBookmarkPanelPinned(pinned: boolean, persist = true): void {
    this.importState.panelPinned = !!pinned;
    if (persist) {
      storageSetLocal({ [BOOKMARK_PANEL_PINNED_KEY]: this.importState.panelPinned });
    }
    bookmarkPanelController.setPinned(this.importState.panelPinned);
  }

  public applyBookmarkPanelPosition(folderId: string | null = null, anchorEl: HTMLElement | null = null): void {
    const id = String(folderId ?? this.importState.focusFolderId ?? "");
    const targetEl =
      anchorEl ||
      (id ? document.querySelector(`.bookmark-folder-chip[data-bookmark-folder-id="${id}"]`) as HTMLElement : null) ||
      document.getElementById("bookmark-handle");

    if (targetEl && targetEl.offsetParent !== null) {
      const rect = targetEl.getBoundingClientRect();
      const width = 310;
      const left = Math.max(8, Math.min(window.innerWidth - width - 8, Math.round(rect.left)));
      bookmarkPanelController.setPosition(left);
    } else {
      bookmarkPanelController.setPosition(null);
    }
  }

  public openBookmarkNoteMenu(item: any, clientX: number, clientY: number): void {
    if (!item) return;
    const isFolder = item.isFolder === true || !item.url;
    this.editingItem = { ...item, isFolder };
    bookmarkMenuController.setMode("actions");

    const launcherGroups = (window as any).launcherState?.groups;
    const launcherGroupNames = Array.isArray(launcherGroups)
      ? launcherGroups.map((g: any) => g.name || g)
      : ["常用网站"];

    const hostOrCount = isFolder
      ? `${this.countBookmarkLinks(this.bookmarkNodeById(this.importState.tree, item.id))} 个书签 · 浏览器文件夹`
      : hostOf(item.url);
    const iconUrl = isFolder ? "" : favi(item.url);
    const note = isFolder ? "" : (this.importState.remarks?.[item.url] || "");

    bookmarkMenuController.openMenu(item, clientX, clientY, {
      hostOrCount,
      iconUrl,
      note,
      launcherGroups: launcherGroupNames
    });
  }

  public async saveBookmarkRename(requestedTitle?: string): Promise<void> {
    const item = this.editingItem;
    if (!item) return;
    const newTitle = (requestedTitle ?? "").trim();
    if (!newTitle) {
      bookmarkMenuController.setStatus("名称不能为空");
      return;
    }
    if (newTitle === (item.title || "").trim()) {
      bookmarkMenuController.closeMenu();
      return;
    }
    try {
      await this.bookmarkApiUpdate(item.id, { title: newTitle });
      bookmarkMenuController.closeMenu();
      await this.reloadBookmarkTree();
      bookmarkPanelController.showFeedback(`已将${item.isFolder ? "文件夹" : "书签"}重命名为「${newTitle}」`);
    } catch (error: any) {
      bookmarkMenuController.setStatus(error.message || `重命名${item.isFolder ? "文件夹" : "书签"}失败`);
    }
  }

  public async saveBookmarkNote(requestedNote?: string): Promise<void> {
    const item = this.editingItem;
    if (!item || !item.url) return;
    const value = String(requestedNote ?? "").trim();
    if (value) {
      this.importState.remarks[item.url] = value;
    } else {
      delete this.importState.remarks[item.url];
    }
    await storageSetLocal({ bookmarkRemarks: this.importState.remarks });
    bookmarkMenuController.closeMenu();
    this.renderBookmarkImports();
  }

  public async deleteBookmarkFromContextMenu(): Promise<void> {
    const item = this.editingItem;
    if (!item) return;
    try {
      await this.bookmarkApiRemove(item.id, item.isFolder);
      if (!item.isFolder && item.url) {
        delete this.importState.remarks[item.url];
        await storageSetLocal({ bookmarkRemarks: this.importState.remarks });
      }
      bookmarkMenuController.closeMenu();
      await this.reloadBookmarkTree();
      bookmarkPanelController.showFeedback(`已删除${item.isFolder ? "文件夹" : "书签"}「${item.title || hostOf(item.url)}」`);
    } catch (error: any) {
      bookmarkMenuController.setStatus(error.message || `删除${item.isFolder ? "文件夹" : "书签"}失败`);
    }
  }

  public async saveBookmarkToLauncher(requestedTargetPage?: string): Promise<void> {
    const item = this.editingItem;
    if (!item || !item.url) return;
    const targetPage = requestedTargetPage || "常用网站";
    try {
      await launcherService.ready;
      const url = new URL(launcherService.normalizeUrl(item.url));
      if (url.protocol !== "http:" && url.protocol !== "https:") throw new Error("仅支持 HTTP/HTTPS 网站");
      await launcherService.addLink({ title: item.title, url: url.href, group: "常用网站", page: targetPage });
      bookmarkMenuController.closeMenu();
      bookmarkPanelController.showFeedback(`已将「${item.title || item.url}」添加到常用网站`);
    } catch (error: any) {
      bookmarkPanelController.showFeedback(error.message || "添加到常用网站失败", true);
    }
  }

  public bookmarkApiMove(id: string | number, destination: { parentId?: string; index?: number }): Promise<any> {
    return new Promise((resolve, reject) => {
      if (typeof chrome === "undefined" || !chrome.bookmarks?.move) {
        return resolve(null);
      }
      chrome.bookmarks.move(String(id), destination, (node: any) => {
        const error = chrome.runtime.lastError;
        if (error) reject(new Error(error.message));
        else resolve(node);
      });
    });
  }

  public bookmarkApiCreate(details: { parentId: string; title: string; url?: string }): Promise<any> {
    return new Promise((resolve, reject) => {
      if (typeof chrome === "undefined" || !chrome.bookmarks?.create) {
        return resolve(null);
      }
      chrome.bookmarks.create(details, (node: any) => {
        const error = chrome.runtime.lastError;
        if (error) reject(new Error(error.message));
        else resolve(node);
      });
    });
  }

  public bookmarkApiUpdate(id: string | number, changes: { title?: string; url?: string }): Promise<any> {
    return new Promise((resolve, reject) => {
      if (typeof chrome === "undefined" || !chrome.bookmarks?.update) {
        return resolve(null);
      }
      chrome.bookmarks.update(String(id), changes, (node: any) => {
        const error = chrome.runtime.lastError;
        if (error) reject(new Error(error.message));
        else resolve(node);
      });
    });
  }

  public bookmarkApiRemove(id: string | number, recursive = false): Promise<void> {
    return new Promise((resolve, reject) => {
      if (typeof chrome === "undefined" || !chrome.bookmarks?.remove) {
        return resolve();
      }
      chrome.bookmarks[recursive ? "removeTree" : "remove"](String(id), () => {
        const error = chrome.runtime.lastError;
        if (error) reject(new Error(error.message));
        else resolve();
      });
    });
  }

  public compactBookmarkRemark(text: string, item: any): string {
    text = String(text || "").replace(/\s+/g, " ").trim();
    const title = item.title || hostOf(item.url);
    const host = hostOf(item.url);
    const candidates: string[] = [];
    const titleMatch = text.match(/^Title:\s*(.+)$/im);
    if (titleMatch) candidates.push(titleMatch[1]);
    const descMatch = text.match(/(?:Description|摘要|简介)[:：]\s*(.{8,120})/i);
    if (descMatch) candidates.push(descMatch[1]);
    const lines = text.split(/[。.!?\n]/).map((x) => x.trim()).filter((x) => x.length >= 8 && x.length <= 120);
    candidates.push(...lines.slice(0, 4));
    let best = candidates.find((x) => !/cookie|privacy|登录|验证码|javascript|enable/i.test(x)) || `${title}：${host}`;
    best = best.replace(/^Title:\s*/i, "").replace(/\s+/g, " ").trim();
    if (!best.includes("：") && !best.includes(":")) best = `${title}：${best}`;
    return best.length > 42 ? best.slice(0, 41) + "…" : best;
  }

  public async callAiForBookmarkRemark(item: any, rawSnippet: string): Promise<string> {
    const title = item.title || hostOf(item.url);
    const cleanSnippet = String(rawSnippet || "").replace(/\s+/g, " ").slice(0, 1000);
    const localAiEndpoints = ["http://127.0.0.1:11434/v1/chat/completions"];
    const prompt = `请为书签【${title}】（网址: ${item.url}，网页内容摘要: ${cleanSnippet || "无"}）写一句简明扼要的中文备注。\n要求：仅用一句话概括其核心用途与特色，严格控制在 25 字以内，不要任何多余废话或引号，直接输出一句话备注。`;

    for (const ep of localAiEndpoints) {
      try {
        const res = await fetchWithTimeout(ep, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            model: "deepseek-chat",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.3,
            max_tokens: 60
          })
        }, 3500);
        if (res.ok) {
          const j = await res.json();
          const ans = j.choices?.[0]?.message?.content?.trim();
          if (ans && ans.length >= 2 && ans.length <= 45) {
            return ans.replace(/^["'“”‘’]|["'“”‘’]$/g, "").trim();
          }
        }
      } catch {}
    }
    return this.compactBookmarkRemark(rawSnippet, item);
  }

  public async analyzeBookmarkRemark(item: any): Promise<string> {
    const url = `https://r.jina.ai/${item.url}`;
    try {
      const r = await fetchWithTimeout(url, { headers: { Accept: "text/plain" } }, 15000);
      const text = r.ok ? await r.text() : "";
      return await this.callAiForBookmarkRemark(item, text.slice(0, 2500));
    } catch {
      return await this.callAiForBookmarkRemark(item, "");
    }
  }

  private wireListeners(): void {
    bookmarkFolderStripController.onAction((action, payload) => {
      if (action === "open-folder" && payload?.id) {
        this.openBookmarkFolderWindow(payload.id);
      } else if (action === "context-menu" && payload?.folder) {
        this.openBookmarkNoteMenu(
          {
            id: payload.folder.id,
            parentId: payload.folder.parentId,
            title: payload.folder.title || "未命名",
            isFolder: true
          },
          payload.clientX,
          payload.clientY
        );
      }
    });

    bookmarkPanelController.onAction((action, payload) => {
      if (action === "toggle-pin") {
        this.setBookmarkPanelPinned(payload);
      } else if (action === "close") {
        this.closeBookmarkPanel();

      } else if (action === "open-bookmark" && payload) {
        if (payload.isFolder) {
          this.toggleFolderExpand(payload.id);
        } else if (payload.url) {
          if (typeof chrome !== "undefined" && chrome.tabs?.create) {
            chrome.tabs.create({ url: payload.url, active: true });
          } else {
            window.open(payload.url, "_blank");
          }
        }
      } else if (action === "context-menu" && payload?.item) {
        this.openBookmarkNoteMenu(payload.item, payload.clientX, payload.clientY);
      }
    });

    bookmarkMenuController.onAction(async (action, payload) => {
      if (action === "open-bookmark") {
        const target = payload || this.editingItem;
        if (!target) return;
        if (target.isFolder) {
          this.openBookmarkPanel(target.id);
        } else if (target.url) {
          if (typeof chrome !== "undefined" && chrome.tabs?.create) {
            chrome.tabs.create({ url: target.url, active: true });
          } else {
            window.open(target.url, "_blank");
          }
        }
        bookmarkMenuController.closeMenu();
      } else if (action === "save-launcher") {
        await this.saveBookmarkToLauncher(payload?.group);
      } else if (action === "save-rename") {
        await this.saveBookmarkRename(payload?.newTitle);
      } else if (action === "save-note") {
        await this.saveBookmarkNote(payload?.note);
      } else if (action === "delete-bookmark") {
        await this.deleteBookmarkFromContextMenu();
      }
    });
  }
}

export const bookmarksService = new BookmarksService();
