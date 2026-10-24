/**
 * LauncherService — 现代化启动器与常用网站数据管理服务 (纯数据逻辑，无侵入式 DOM 操作)
 */

import { saveLauncherTitle, titleLinks, titleMap, cleanFolderTitle } from "../launcher/title-storage";
import { cloneSettingValue, sameSettingValue } from "../settings/draft-values";
import { folderParent, folderSubtree, type LauncherFolderMap } from "../launcher/folder-tree";

declare const chrome: any;

export interface LauncherLink {
  id: string;
  title: string;
  url: string;
  icon?: string;
  customIcon?: string;
  group?: string;
  page?: string;
  pinned?: boolean;
  note?: string;
}

export interface LauncherFolderItem {
  groupName: string;
  pageName: string;
  links: LauncherLink[];
}

export interface LauncherIconCacheEntry {
  dataUrl: string;
  savedAt: number;
}

export interface LauncherDataState {
  links: LauncherLink[];
  groupSizes: Record<string, "small" | "large">;
  folders: LauncherFolderMap;
  pages: string[];
  pageLabels: Record<string, string>;
  activePage: string;
}

export const LAUNCHER_LINKS_KEY = "quickLinks";
export const LAUNCHER_GROUP_SIZES_KEY = "quickLinkGroupSizes";
export const LAUNCHER_FOLDERS_KEY = "launcherFolders";
export const LAUNCHER_PAGES_KEY = "launcherPages";
export const LAUNCHER_PAGE_LABELS_KEY = "launcherPageLabels";
export const LAUNCHER_ACTIVE_PAGE_KEY = "launcherActivePage";
export const LAUNCHER_ICON_CACHE_KEY = "launcherIconCache";
export const LAUNCHER_ICON_CACHE_LIMIT = 480;
export const LAUNCHER_ICON_CACHE_MAX_CHARS = 1800000;
export const LAUNCHER_ICON_MAX_BYTES = 120 * 1024;

export const DEFAULT_PAGE = "常用网站";
export const DEFAULT_GROUP = "常用网站";

export class LauncherService {
  private static instance: LauncherService;

  private state: LauncherDataState = {
    links: [],
    groupSizes: {},
    folders: {},
    pages: [DEFAULT_PAGE],
    pageLabels: {},
    activePage: DEFAULT_PAGE
  };

  private iconCache: Record<string, LauncherIconCacheEntry> = {};
  private iconCachePending = new Set<string>();
  private iconCacheSaveTimer: any = null;
  private listeners: Array<(state: LauncherDataState) => void> = [];
  private isLoaded = false;

  public readonly ready: Promise<LauncherDataState>;

  private constructor() {
    this.ready = this.initFromWindowOrStorage();
    this.bindStorageChangeListener();
  }

  private bindStorageChangeListener(): void {
    if (typeof chrome !== "undefined" && chrome.storage?.onChanged) {
      chrome.storage.onChanged.addListener((changes: Record<string, { newValue?: any }>, areaName: string) => {
        if (areaName !== "local") return;
        let updated = false;
        if (changes[LAUNCHER_LINKS_KEY] && Array.isArray(changes[LAUNCHER_LINKS_KEY].newValue)) {
          this.state.links = [...changes[LAUNCHER_LINKS_KEY].newValue];
          updated = true;
        }
        if (changes[LAUNCHER_GROUP_SIZES_KEY] && changes[LAUNCHER_GROUP_SIZES_KEY].newValue) {
          this.state.groupSizes = { ...changes[LAUNCHER_GROUP_SIZES_KEY].newValue };
          updated = true;
        }
        if (changes[LAUNCHER_FOLDERS_KEY] && changes[LAUNCHER_FOLDERS_KEY].newValue) {
          this.state.folders = { ...changes[LAUNCHER_FOLDERS_KEY].newValue };
          updated = true;
        }
        if (changes[LAUNCHER_PAGES_KEY] && Array.isArray(changes[LAUNCHER_PAGES_KEY].newValue) && changes[LAUNCHER_PAGES_KEY].newValue.length > 0) {
          this.state.pages = [...changes[LAUNCHER_PAGES_KEY].newValue];
          updated = true;
        }
        if (changes[LAUNCHER_PAGE_LABELS_KEY] && changes[LAUNCHER_PAGE_LABELS_KEY].newValue) {
          this.state.pageLabels = { ...changes[LAUNCHER_PAGE_LABELS_KEY].newValue };
          updated = true;
        }
        if (changes[LAUNCHER_ACTIVE_PAGE_KEY] && typeof changes[LAUNCHER_ACTIVE_PAGE_KEY].newValue === "string") {
          this.state.activePage = changes[LAUNCHER_ACTIVE_PAGE_KEY].newValue;
          updated = true;
        }
        if (updated) {
          this.notify();
        }
      });
    }
  }

  public static getInstance(): LauncherService {
    if (!LauncherService.instance) {
      LauncherService.instance = new LauncherService();
    }
    return LauncherService.instance;
  }

  /**
   * 规范化网址格式
   */
  public normalizeUrl(url: string): string {
    const raw = String(url || "").trim();
    if (!raw) return "";
    if (/^[a-zA-Z][a-zA-Z\d+\-.]*?:/i.test(raw)) return raw;
    if (raw.startsWith("//")) return "https:" + raw;
    return "https://" + raw;
  }

  public hostOf(url: string): string {
    try {
      return new URL(this.normalizeUrl(url)).hostname.replace(/^www\./, "");
    } catch {
      return url || "";
    }
  }

  public getCacheKey(url: string): string {
    try {
      return new URL(this.normalizeUrl(url)).origin.toLowerCase();
    } catch {
      return String(url || "").trim().toLowerCase();
    }
  }

  /**
   * 存储读写封装
   */
  private async storageGet(keys: string[]): Promise<Record<string, any>> {
    const result: Record<string, any> = {};
    if (typeof chrome !== "undefined" && chrome.storage && chrome.storage.local) {
      return new Promise((resolve) => {
        chrome.storage.local.get(keys, (res: Record<string, any>) => resolve(res || {}));
      });
    }
    if (typeof localStorage !== "undefined") {
      keys.forEach((k) => {
        const item = localStorage.getItem(`logicweaver:${k}`);
        if (item) {
          try {
            result[k] = JSON.parse(item);
          } catch {
            result[k] = item;
          }
        }
      });
    }
    return result;
  }

  private async storageSet(items: Record<string, any>): Promise<void> {
    if (typeof chrome !== "undefined" && chrome.storage && chrome.storage.local) {
      await new Promise<void>((resolve) => {
        chrome.storage.local.set(items, () => resolve());
      });
    }
    if (typeof localStorage !== "undefined") {
      Object.entries(items).forEach(([k, v]) => {
        try {
          localStorage.setItem(`logicweaver:${k}`, JSON.stringify(v));
        } catch (_) {}
      });
    }
  }

  /**
   * 初始化数据
   */
  public async initFromWindowOrStorage(): Promise<LauncherDataState> {
    const win = typeof window !== "undefined" ? (window as any) : null;
    if (win && win.launcherState) {
      this.state.links = Array.isArray(win.launcherState.links) ? [...win.launcherState.links] : [];
      this.state.groupSizes = { ...(win.launcherState.groupSizes || {}) };
      this.state.folders = { ...(win.launcherState.folders || {}) };
      this.state.pages = Array.isArray(win.launcherState.pages) ? [...win.launcherState.pages] : [DEFAULT_PAGE];
      this.state.pageLabels = { ...(win.launcherState.pageLabels || {}) };
      this.state.activePage = win.launcherState.activePage || DEFAULT_PAGE;
    }

    if (win && win.launcherIconCache) {
      this.iconCache = { ...win.launcherIconCache };
    }

    // 从 chrome.storage.local 异步校准
    const keys = [
      LAUNCHER_LINKS_KEY,
      LAUNCHER_GROUP_SIZES_KEY,
      LAUNCHER_FOLDERS_KEY,
      LAUNCHER_PAGES_KEY,
      LAUNCHER_PAGE_LABELS_KEY,
      LAUNCHER_ACTIVE_PAGE_KEY,
      LAUNCHER_ICON_CACHE_KEY
    ];
    try {
      const data = await this.storageGet(keys);
      if (Array.isArray(data[LAUNCHER_LINKS_KEY])) {
        this.state.links = [...data[LAUNCHER_LINKS_KEY]];
      }
      if (data[LAUNCHER_GROUP_SIZES_KEY]) {
        this.state.groupSizes = { ...data[LAUNCHER_GROUP_SIZES_KEY] };
      }
      if (data[LAUNCHER_FOLDERS_KEY]) {
        this.state.folders = { ...data[LAUNCHER_FOLDERS_KEY] };
      }
      if (Array.isArray(data[LAUNCHER_PAGES_KEY]) && data[LAUNCHER_PAGES_KEY].length > 0) {
        this.state.pages = [...data[LAUNCHER_PAGES_KEY]];
      }
      if (data[LAUNCHER_PAGE_LABELS_KEY]) {
        this.state.pageLabels = { ...data[LAUNCHER_PAGE_LABELS_KEY] };
      }
      if (data[LAUNCHER_ACTIVE_PAGE_KEY]) {
        this.state.activePage = data[LAUNCHER_ACTIVE_PAGE_KEY];
      }
      if (data[LAUNCHER_ICON_CACHE_KEY]) {
        this.iconCache = { ...data[LAUNCHER_ICON_CACHE_KEY] };
      }
    } catch (_) {}

    this.isLoaded = true;
    this.syncToWindow();
    this.notify();
    return this.getState();
  }

  /**
   * 同步到全局 window，保证老旧模块与测试完全兼容
   */
  private syncToWindow(): void {
    if (typeof window === "undefined") return;
    const win = window as any;
    if (!win.launcherState) {
      win.launcherState = {};
    }
    win.launcherState.links = this.state.links;
    win.launcherState.groupSizes = this.state.groupSizes;
    win.launcherState.folders = this.state.folders;
    win.launcherState.pages = this.state.pages;
    win.launcherState.pageLabels = this.state.pageLabels;
    win.launcherState.activePage = this.state.activePage;

    if (!win.launcherIconCache) {
      win.launcherIconCache = this.iconCache;
    }
  }

  /**
   * 同步更新内部状态快照
   */
  public updateState(partial: Partial<LauncherDataState>): void {
    if (partial.links) this.state.links = [...partial.links];
    if (partial.pages) this.state.pages = [...partial.pages];
    if (partial.pageLabels) this.state.pageLabels = { ...partial.pageLabels };
    if (partial.groupSizes) this.state.groupSizes = { ...partial.groupSizes };
    if (partial.folders) this.state.folders = { ...partial.folders };
    if (partial.activePage) this.state.activePage = partial.activePage;
    this.syncToWindow();
  }

  public getState(): LauncherDataState {
    return {
      links: [...this.state.links],
      groupSizes: { ...this.state.groupSizes },
      folders: { ...this.state.folders },
      pages: [...this.state.pages],
      pageLabels: { ...this.state.pageLabels },
      activePage: this.state.activePage
    };
  }

  public subscribe(listener: (state: LauncherDataState) => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notify(): void {
    this.syncToWindow();
    const snap = this.getState();
    this.listeners.forEach((l) => {
      try {
        l(snap);
      } catch (_) {}
    });
  }

  /**
   * 持久化启动器状态
   */
  public async save(): Promise<void> {
    await this.storageSet({
      [LAUNCHER_LINKS_KEY]: this.state.links,
      [LAUNCHER_GROUP_SIZES_KEY]: this.state.groupSizes,
      [LAUNCHER_FOLDERS_KEY]: this.state.folders,
      [LAUNCHER_PAGES_KEY]: this.state.pages,
      [LAUNCHER_PAGE_LABELS_KEY]: this.state.pageLabels,
      [LAUNCHER_ACTIVE_PAGE_KEY]: this.state.activePage,
      quickLinksReady: true
    });
    this.notify();
  }

  public async saveLink(input: { id?: string; title: string; url: string; group?: string; note?: string; page?: string }): Promise<void> {
    const url = new URL(this.normalizeUrl(input.url));
    if (url.protocol !== "https:" && url.protocol !== "http:") throw new Error("仅支持 HTTP/HTTPS 网站");
    const index = this.state.links.findIndex((link) => String(link.id) === String(input.id));
    const existing = index >= 0 ? this.state.links[index] : undefined;

    let targetPage = input.page ? input.page.trim() : (existing?.page || (existing ? DEFAULT_PAGE : this.state.activePage));
    if (targetPage && !this.state.pages.includes(targetPage)) {
      this.state.pages.push(targetPage);
    }

    const link: LauncherLink = {
      ...existing,
      id: existing?.id || crypto.randomUUID(),
      title: input.title.trim(),
      url: url.href,
      group: input.group?.trim() || DEFAULT_GROUP,
      page: targetPage,
      note: input.note !== undefined ? input.note.trim() : existing?.note
    };
    if (index >= 0) this.state.links[index] = link;
    else this.state.links.push(link);
    await this.save();
  }

  /** Title-only intent: do not resubmit a stale URL, note, group, or entire launcher snapshot. */
  public async renameLinkTitle(id: string, expected: string, value: string): Promise<string> {
    const clean = value.trim();
    if (!clean) throw new Error("网站名称不能为空。");
    if (clean.length > 50) throw new Error("网站名称最多50个字符。");
    return this.saveLinkTextField(id, "title", expected, clean);
  }

  public async editLinkUrl(id: string, expected: string, value: string): Promise<string> {
    if (!value.trim()) throw new Error("网址不能为空。");
    let url: URL;
    try { url = new URL(this.normalizeUrl(value)); }
    catch { throw new Error("网址格式不正确，请检查后再保存。"); }
    if (url.protocol !== "https:" && url.protocol !== "http:") throw new Error("仅支持 HTTP/HTTPS 网站。");
    if (url.username || url.password) throw new Error("请勿在网址中保存用户名或密码。");
    return this.saveLinkTextField(id, "url", expected, url.href);
  }

  public async editLinkNote(id: string, expected: string, value: string): Promise<string> {
    const clean = value.trim();
    if (clean.length > 200) throw new Error("网站备注最多200个字符。");
    return this.saveLinkTextField(id, "note", expected, clean);
  }

  private async saveLinkTextField(id: string, field: "title" | "url" | "note", expected: string, clean: string): Promise<string> {
    await this.ready;
    const accepted = await saveLauncherTitle([LAUNCHER_LINKS_KEY], latest => {
      const links = titleLinks(latest[LAUNCHER_LINKS_KEY]);
      const matches = links.filter(link => String(link.id) === String(id));
      if (matches.length !== 1) throw new Error("网站已删除或标识重复，未提交；请重新打开菜单核对。");
      const current = matches[0];
      const actualCurrent = current[field] || "";
      const expectedNormalized = expected || "";
      if (actualCurrent !== expectedNormalized && actualCurrent !== clean) {
        throw new Error("这一字段已被其他操作修改，未覆盖。请复制草稿，重新打开菜单核对。");
      }
      return { [LAUNCHER_LINKS_KEY]: links.map(link => link === current ? { ...link, [field]: clean } : link) };
    });
    this.state.links = accepted[LAUNCHER_LINKS_KEY];
    this.notify();
    return clean;
  }

  public async saveLinkNote(id: string, note: string): Promise<void> {
    const link = this.state.links.find((item) => String(item.id) === String(id));
    if (!link) return;
    link.note = note.trim();
    await this.save();
  }

  public async setLinkIcon(id: string, icon: string): Promise<void> {
    const link = this.state.links.find((item) => String(item.id) === String(id));
    if (!link || !icon) return;
    link.customIcon = icon;
    await this.save();
  }

  // ==================== 图标离屏缓存逻辑 ====================

  public getCachedIcon(url: string): string | null {
    const key = this.getCacheKey(url);
    return this.iconCache[key]?.dataUrl || null;
  }

  public evictCachedIcon(url: string): void {
    const key = this.getCacheKey(url);
    if (this.iconCache[key]) {
      delete this.iconCache[key];
      this.scheduleIconCacheSave();
    }
  }

  public scheduleIconCacheSave(): void {
    if (this.iconCacheSaveTimer) clearTimeout(this.iconCacheSaveTimer);
    this.iconCacheSaveTimer = setTimeout(async () => {
      let totalChars = 0;
      const entries = Object.entries(this.iconCache)
        .sort((a, b) => Number(b[1]?.savedAt || 0) - Number(a[1]?.savedAt || 0))
        .filter(([, value]) => {
          const size = String(value?.dataUrl || "").length;
          if (!size || totalChars + size > LAUNCHER_ICON_CACHE_MAX_CHARS) return false;
          totalChars += size;
          return true;
        })
        .slice(0, LAUNCHER_ICON_CACHE_LIMIT);

      const nextCache: Record<string, LauncherIconCacheEntry> = {};
      entries.forEach(([key, value]) => {
        nextCache[key] = value;
      });
      this.iconCache = nextCache;
      if (typeof window !== "undefined") {
        (window as any).launcherIconCache = nextCache;
      }
      try {
        await this.storageSet({ [LAUNCHER_ICON_CACHE_KEY]: this.iconCache });
      } catch (_) {}
    }, 1200);
  }

  public async cacheIcon(url: string, source: string, imgElement?: HTMLImageElement | null): Promise<void> {
    const cacheId = this.getCacheKey(url);
    if (!cacheId || !source || source.startsWith("data:") || this.iconCachePending.has(cacheId)) return;
    this.iconCachePending.add(cacheId);

    try {
      // 方案 1：离屏 Canvas 抓取 Base64（无跨域阻碍）
      let dataUrl = "";
      if (imgElement && imgElement.naturalWidth && imgElement.naturalHeight) {
        try {
          const canvas = document.createElement("canvas");
          const w = Math.min(64, imgElement.naturalWidth);
          const h = Math.min(64, imgElement.naturalHeight);
          canvas.width = w;
          canvas.height = h;
          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.drawImage(imgElement, 0, 0, w, h);
            dataUrl = canvas.toDataURL("image/png");
          }
        } catch (_) {}
      }

      if (dataUrl && dataUrl.startsWith("data:image/")) {
        this.iconCache[cacheId] = { dataUrl, savedAt: Date.now() };
        this.scheduleIconCacheSave();
        return;
      }

      // 方案 2：如果是同源或 CORS 允许的图片，尝试 fetch blob
      if (!source.startsWith("chrome-extension:")) {
        try {
          const response = await fetch(source, { credentials: "omit", cache: "force-cache" });
          if (response.ok) {
            const blob = await response.blob();
            if (blob.size && blob.size <= LAUNCHER_ICON_MAX_BYTES && /^image\//i.test(blob.type || "")) {
              const readerData = await new Promise<string>((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve(String(reader.result || ""));
                reader.onerror = () => reject(reader.error);
                reader.readAsDataURL(blob);
              });
              if (readerData && readerData.startsWith("data:image/")) {
                this.iconCache[cacheId] = { dataUrl: readerData, savedAt: Date.now() };
                this.scheduleIconCacheSave();
                return;
              }
            }
          }
        } catch (_) {}
      }

      // 方案 3：已成功渲染的公网高可用 URL 本身作为持久缓存
      if (/^https?:\/\//i.test(source)) {
        this.iconCache[cacheId] = { dataUrl: source, savedAt: Date.now() };
        this.scheduleIconCacheSave();
      }
    } catch (_) {
    } finally {
      this.iconCachePending.delete(cacheId);
    }
  }

  // ==================== 分区 (Pages) 业务逻辑 ====================

  public getPageNames(): string[] {
    const list = new Set([
      DEFAULT_PAGE,
      ...this.state.pages,
      ...this.state.links.map((link) => link.page || DEFAULT_PAGE)
    ]);
    return Array.from(list).map((n) => String(n || "").trim()).filter(Boolean);
  }

  public getPageLabel(pageName: string): string {
    return String(this.state.pageLabels[pageName] || (pageName === DEFAULT_PAGE ? "默认" : pageName));
  }

  public async setPage(pageName: string, persist = true): Promise<void> {
    const pages = this.getPageNames();
    const next = pages.includes(pageName) ? pageName : pages[0] || DEFAULT_PAGE;
    this.state.activePage = next;
    if (persist) {
      await this.storageSet({ [LAUNCHER_ACTIVE_PAGE_KEY]: next }).catch(() => {});
    }
    this.notify();
  }

  public async stepPage(direction: 1 | -1): Promise<void> {
    const pages = this.getPageNames();
    if (pages.length < 2) return;
    const index = Math.max(0, pages.indexOf(this.state.activePage));
    const next = pages[(index + direction + pages.length) % pages.length];
    await this.setPage(next);
  }

  public async addPage(name: string): Promise<boolean> {
    const clean = String(name || "").trim().replace(/\s+/g, " ").slice(0, 12);
    if (!clean) return false;
    const existing = this.getPageNames().find((p) => this.getPageLabel(p).toLowerCase() === clean.toLowerCase());
    if (existing) {
      await this.setPage(existing);
      return false;
    }
    let pageId = clean;
    while (this.getPageNames().includes(pageId)) {
      pageId = `${clean}-${crypto.randomUUID().slice(0, 4)}`;
    }
    this.state.pages.push(pageId);
    this.state.pageLabels[pageId] = clean;
    this.state.activePage = pageId;
    await this.save();
    return true;
  }

  public async renamePage(pageName: string, newLabel: string): Promise<boolean> {
    const next = String(newLabel || "").trim().replace(/\s+/g, " ").slice(0, 12);
    if (!next) return false;
    const duplicate = this.getPageNames().some((p) => p !== pageName && this.getPageLabel(p).toLowerCase() === next.toLowerCase());
    if (duplicate) return false;
    this.state.pageLabels[pageName] = next;
    await this.save();
    return true;
  }

  public async deletePage(pageName: string): Promise<boolean> {
    const pages = this.getPageNames();
    if (pages.length <= 1) return false;

    const fallbackPage = pages.find((p) => p !== pageName) || DEFAULT_PAGE;
    this.state.links.forEach((link) => {
      if ((link.page || DEFAULT_PAGE) === pageName) {
        link.page = fallbackPage;
      }
    });

    for (const [name, info] of Object.entries(this.state.folders)) if ((info.page || DEFAULT_PAGE) === pageName) this.state.folders[name] = { ...info, page: fallbackPage };
    this.state.pages = this.state.pages.filter((p) => p !== pageName);
    delete this.state.pageLabels[pageName];
    if (this.state.activePage === pageName) {
      this.state.activePage = fallbackPage;
    }
    await this.save();
    return true;
  }

  // ==================== 快捷链接 (Links) 业务逻辑 ====================

  public getLinks(page?: string): LauncherLink[] {
    if (!page) return [...this.state.links];
    return this.state.links.filter((l) => (l.page || DEFAULT_PAGE) === page);
  }

  public async addLink(item: { title: string; url: string; group?: string; page?: string; icon?: string; customIcon?: string }): Promise<LauncherLink> {
    const url = this.normalizeUrl(item.url);
    const existing = this.state.links.find((link) => this.normalizeUrl(link.url) === url);
    const targetGroup = item.group || DEFAULT_GROUP;
    const targetPage = item.page || this.state.activePage;

    if (existing) {
      existing.group = targetGroup;
      existing.page = targetPage;
      if (!existing.title && item.title) existing.title = item.title;
      if (item.customIcon) existing.customIcon = item.customIcon;
      if (item.icon) existing.icon = item.icon;
      await this.save();
      return existing;
    }

    const newLink: LauncherLink = {
      id: crypto.randomUUID(),
      title: item.title || this.hostOf(url),
      url,
      group: targetGroup,
      page: targetPage,
      icon: item.icon,
      customIcon: item.customIcon
    };
    this.state.links.push(newLink);
    await this.save();
    return newLink;
  }

  public async updateLink(linkId: string, patch: Partial<LauncherLink>): Promise<boolean> {
    const link = this.state.links.find((l) => l.id === linkId);
    if (!link) return false;
    Object.assign(link, patch);
    if (patch.url) {
      link.url = this.normalizeUrl(patch.url);
    }
    await this.save();
    return true;
  }

  public async deleteLink(linkId: string): Promise<boolean> {
    const initialLen = this.state.links.length;
    const removed = this.state.links.find((l) => l.id === linkId);
    this.state.links = this.state.links.filter((l) => l.id !== linkId);
    if (this.state.links.length === initialLen) return false;
    if (removed?.group) {
      this.cleanUnusedGroups([removed.group]);
    }
    await this.save();
    return true;
  }

  public async moveLinkTo(linkId: string, targetPage?: string, targetGroup?: string): Promise<boolean> {
    const link = this.state.links.find((l) => l.id === linkId);
    if (!link) return false;
    const oldGroup = link.group || DEFAULT_GROUP;
    link.group = targetGroup || DEFAULT_GROUP;
    link.page = link.group !== DEFAULT_GROUP ? this.getFolderPage(link.group) : (targetPage || this.state.activePage);
    this.cleanUnusedGroups([oldGroup]);
    await this.save();
    if (targetPage && targetPage !== this.state.activePage) {
      await this.setPage(targetPage);
    }
    return true;
  }

  // ==================== 分组/文件夹 (Folders / Groups) 业务逻辑 ====================

  public getGroupNames(): string[] {
    return Array.from(new Set([...this.state.links.map(link => link.group || DEFAULT_GROUP), ...Object.keys(this.state.folders)]));
  }

  public getFolderParent(name: string): string | undefined { return folderParent(this.state.folders, name); }

  public getFolderPage(name: string): string {
    let root = name;
    for (let parent = this.getFolderParent(root); parent; parent = this.getFolderParent(root)) root = parent;
    return this.state.folders[root]?.page || this.state.links.find(link => link.group === root)?.page || this.state.activePage || DEFAULT_PAGE;
  }

  public async moveFolderInto(source: string, target?: string, page?: string): Promise<boolean> {
    if (!source || source === DEFAULT_GROUP) throw new Error("不能移动默认分组。");
    await this.ready;
    const keys = [LAUNCHER_LINKS_KEY, LAUNCHER_FOLDERS_KEY];
    const fallbackPage = page || this.getFolderPage(source);
    const accepted = await saveLauncherTitle(keys, latest => {
      const links = titleLinks(latest[LAUNCHER_LINKS_KEY]);
      const folders = titleMap(latest[LAUNCHER_FOLDERS_KEY]) as LauncherFolderMap;
      const names = new Set([...Object.keys(folders), ...links.map(link => link.group || DEFAULT_GROUP)]);
      if (!names.has(source) || (target && (!names.has(target) || target === DEFAULT_GROUP))) throw new Error("文件夹已变化，请重新打开后再移动。");
      cleanFolderTitle(source); if (target) cleanFolderTitle(target);
      const ancestors = new Set<string>();
      for (let current = target; current; current = Object.prototype.hasOwnProperty.call(folders, current) ? folders[current]?.parent : undefined) {
        if (current === source || ancestors.has(current)) throw new Error("不能移入自身、后代或层级异常的文件夹。");
        ancestors.add(current);
      }
      const subtree = folderSubtree(folders, source);
      if (target && subtree.has(target)) throw new Error("不能把文件夹放入自身或自己的子文件夹。");
      let root = target;
      while (root && folderParent(folders, root)) root = folderParent(folders, root);
      const targetPage = target ? (folders[root!]?.page || links.find(link => link.group === root)?.page || fallbackPage) : fallbackPage;
      const moved = { ...folders };
      if (target && !Object.prototype.hasOwnProperty.call(moved, target)) moved[target] = { name: target, page: targetPage };
      for (const name of subtree) moved[name] = { ...moved[name], name, page: targetPage };
      if (target) moved[source] = { ...moved[source], parent: target };
      else delete moved[source].parent;
      return { ...latest, [LAUNCHER_FOLDERS_KEY]: moved,
        [LAUNCHER_LINKS_KEY]: links.map(link => subtree.has(link.group || DEFAULT_GROUP) ? { ...link, page: targetPage } : link) };
    });
    this.state.links = accepted[LAUNCHER_LINKS_KEY];
    this.state.folders = accepted[LAUNCHER_FOLDERS_KEY];
    this.notify(); return true;
  }

  public getGroupSize(groupName: string): "small" | "large" {
    if (this.state.groupSizes[groupName] === "small") return "small";
    if (this.state.groupSizes[groupName] === "large") return "large";
    return groupName === DEFAULT_GROUP ? "large" : "small";
  }

  public async toggleGroupSize(groupName: string): Promise<"small" | "large"> {
    const next = this.getGroupSize(groupName) === "large" ? "small" : "large";
    this.state.groupSizes[groupName] = next;
    await this.save();
    return next;
  }

  public async renameGroup(oldName: string, newName: string): Promise<boolean> {
    const clean = cleanFolderTitle(newName);
    if (clean === oldName) return false;
    if (!oldName || oldName === DEFAULT_GROUP) throw new Error("默认分组不能通过文件夹重命名。");
    await this.ready;
    const baseline = cloneSettingValue(this.state);
    const owns = (object: object, key: string) => Object.prototype.hasOwnProperty.call(object, key);
    const members = (links: Record<string, any>[]) => links
      .filter(link => (link.group || DEFAULT_GROUP) === oldName).map(link => String(link.id)).sort();
    const keys = [LAUNCHER_LINKS_KEY, LAUNCHER_GROUP_SIZES_KEY, LAUNCHER_FOLDERS_KEY];
    const accepted = await saveLauncherTitle(keys, latest => {
      const links = titleLinks(latest[LAUNCHER_LINKS_KEY]);
      const sizes = titleMap(latest[LAUNCHER_GROUP_SIZES_KEY]);
      const folders = titleMap(latest[LAUNCHER_FOLDERS_KEY]);
      const names = new Set([DEFAULT_GROUP, ...links.map(link => link.group || DEFAULT_GROUP),
        ...Object.keys(sizes), ...Object.keys(folders)]);
      if (!names.has(oldName)) throw new Error("文件夹已被修改或删除，请重新打开后核对。");
      if ([...names].some(name => typeof name === "string" && name !== oldName && name.toLowerCase() === clean.toLowerCase())) {
        throw new Error("已有同名文件夹，请换一个名称；原文件夹未修改。");
      }
      if (!sameSettingValue(members(links), members(baseline.links)) ||
          !sameSettingValue(sizes[oldName], baseline.groupSizes[oldName]) ||
          !sameSettingValue(folders[oldName], baseline.folders[oldName])) {
        throw new Error("文件夹内容已被其他操作修改，未覆盖；请复制草稿，重新打开后核对。");
      }
      const desired: Record<string, any> = { ...latest, [LAUNCHER_LINKS_KEY]: links.map(link =>
        (link.group || DEFAULT_GROUP) === oldName ? { ...link, group: clean } : link) };
      if (owns(sizes, oldName)) {
        const moved = { ...sizes, [clean]: sizes[oldName] };
        delete moved[oldName]; desired[LAUNCHER_GROUP_SIZES_KEY] = moved;
      }
      if (owns(folders, oldName)) {
        const folder = folders[oldName];
        if (!folder || typeof folder !== "object" || Array.isArray(folder)) throw new Error("文件夹记录格式异常，未提交修改。");
        const moved = { ...folders, [clean]: { ...folder, name: clean } };
        delete moved[oldName];
        for (const key of Object.keys(moved)) if (moved[key]?.parent === oldName) moved[key] = { ...moved[key], parent: clean };
        desired[LAUNCHER_FOLDERS_KEY] = moved;
      }
      return desired;
    });
    this.state.links = accepted[LAUNCHER_LINKS_KEY];
    this.state.groupSizes = accepted[LAUNCHER_GROUP_SIZES_KEY] || {};
    this.state.folders = accepted[LAUNCHER_FOLDERS_KEY] || {};
    this.notify();
    return true;
  }

  public async moveFolderToPage(groupName: string, targetPage: string): Promise<boolean> {
    if (!groupName || !targetPage) return false;
    await this.moveFolderInto(groupName, undefined, targetPage);
    await this.setPage(targetPage);
    return true;
  }

  public async deleteGroup(groupName: string, mode: "release" | "purge"): Promise<boolean> {
    if (!groupName || groupName === DEFAULT_GROUP) return false;
    const parent = this.getFolderParent(groupName);
    for (const [name, info] of Object.entries(this.state.folders)) if (info.parent === groupName) {
      this.state.folders[name] = { ...info, parent };
    }
    if (mode === "release") {
      this.state.links.forEach((link) => {
        if ((link.group || DEFAULT_GROUP) === groupName) {
          link.group = parent || DEFAULT_GROUP;
        }
      });
    } else {
      this.state.links = this.state.links.filter((link) => (link.group || DEFAULT_GROUP) !== groupName);
    }
    delete this.state.groupSizes[groupName];
    if (this.state.folders) delete this.state.folders[groupName];
    await this.save();
    return true;
  }

  public async mergeGroups(sourceGroup: string, targetGroup: string): Promise<boolean> {
    if (!sourceGroup || !targetGroup || sourceGroup === targetGroup) return false;
    if (folderSubtree(this.state.folders, sourceGroup).has(targetGroup)) throw new Error("不能合并到自己的子文件夹。");
    for (const [name, info] of Object.entries(this.state.folders)) if (info.parent === sourceGroup) this.state.folders[name] = { ...info, parent: targetGroup === DEFAULT_GROUP ? undefined : targetGroup };
    const targetUrls = new Set<string>();
    this.state.links
      .filter((link) => (link.group || DEFAULT_GROUP) === targetGroup)
      .forEach((link) => {
        try {
          targetUrls.add(this.normalizeUrl(link.url));
        } catch (_) {}
      });

    this.state.links = this.state.links.filter((link) => {
      if ((link.group || DEFAULT_GROUP) !== sourceGroup) return true;
      let u = link.url;
      try {
        u = this.normalizeUrl(link.url);
      } catch (_) {}
      if (targetUrls.has(u)) return false; // 重复网址去重
      targetUrls.add(u);
      link.group = targetGroup;
      return true;
    });

    delete this.state.groupSizes[sourceGroup];
    if (this.state.folders) delete this.state.folders[sourceGroup];
    await this.save();
    return true;
  }

  public async stackLinks(sourceId: string, targetId: string): Promise<void> {
    if (!sourceId || sourceId === targetId) return;
    const source = this.state.links.find((l) => l.id === sourceId);
    const target = this.state.links.find((l) => l.id === targetId);
    if (!source || !target) return;

    const sourceGroup = source.group || DEFAULT_GROUP;
    const targetGroup = target.group || DEFAULT_GROUP;
    source.page = target.page || DEFAULT_PAGE;
    const targetGroupCount = this.state.links.filter((link) => (link.group || DEFAULT_GROUP) === targetGroup).length;

    if (sourceGroup !== targetGroup && targetGroup !== DEFAULT_GROUP && targetGroupCount > 1) {
      source.group = targetGroup;
      this.state.groupSizes[targetGroup] = "large";
      this.cleanUnusedGroups([sourceGroup]);
    } else if (sourceGroup !== targetGroup || targetGroup === DEFAULT_GROUP) {
      const groupName = this.uniqueGroupName(target.title);
      source.group = groupName;
      target.group = groupName;
      this.state.groupSizes[groupName] = "small";
      this.cleanUnusedGroups([sourceGroup, targetGroup]);
    } else {
      return;
    }
    await this.save();
  }

  public async createFolder(size: "small" | "large" = "large", customName?: string, pageName?: string, parent?: string): Promise<string> {
    const existingNames = new Set([DEFAULT_GROUP, ...this.getGroupNames()]);
    if (this.state.folders) {
      Object.keys(this.state.folders).forEach((n) => existingNames.add(n));
    }
    const defaultBase = size === "large" ? "新建大文件夹" : "新建中文件夹";
    let name = (customName || defaultBase).trim();
    if (existingNames.has(name)) {
      let suffix = 2;
      while (existingNames.has(`${defaultBase} ${suffix}`)) suffix += 1;
      name = `${defaultBase} ${suffix}`;
    }
    name = cleanFolderTitle(name);
    if (parent && !this.getGroupNames().includes(parent)) throw new Error("上级文件夹不存在。");
    const page = parent ? this.getFolderPage(parent) : (pageName || this.state.activePage || DEFAULT_PAGE);
    if (!this.state.folders) this.state.folders = {};
    if (parent && !Object.prototype.hasOwnProperty.call(this.state.folders, parent)) this.state.folders[parent] = { name: parent, page };
    this.state.folders[name] = { name, page, ...(parent ? { parent } : {}) };
    this.state.groupSizes[name] = size;
    await this.save();
    return name;
  }

  public async createLargeFolder(folderName?: string, pageName?: string): Promise<string> {
    return this.createFolder("large", folderName, pageName);
  }

  public async createMediumFolder(folderName?: string, pageName?: string): Promise<string> {
    return this.createFolder("small", folderName, pageName);
  }

  public async createLargeFolderFromLink(linkId: string, folderName?: string): Promise<string> {
    const link = this.state.links.find((l) => String(l.id) === String(linkId));
    if (!link) return "";
    const name = folderName?.trim() || this.uniqueGroupName(link.title);
    const oldGroup = link.group || DEFAULT_GROUP;
    link.group = name;
    this.state.groupSizes[name] = "large";
    this.cleanUnusedGroups([oldGroup]);
    await this.save();
    return name;
  }

  private uniqueGroupName(title: string): string {
    const names = new Set(this.getGroupNames());
    const base = `${(title || "新").trim().slice(0, 14)}收藏夹`;
    if (!names.has(base)) return base;
    let suffix = 2;
    while (names.has(`${base} ${suffix}`)) suffix += 1;
    return `${base} ${suffix}`;
  }

  private cleanUnusedGroups(groupNames: string[]): void {
    groupNames.forEach((groupName) => {
      if (!this.state.links.some((link) => (link.group || DEFAULT_GROUP) === groupName)) {
        if (this.state.folders && this.state.folders[groupName]) {
          return;
        }
        delete this.state.groupSizes[groupName];
        if (this.state.folders) delete this.state.folders[groupName];
      }
    });
  }

  // ==================== 排序与拖拽 (Tile Reorder) ====================

  public async moveFolderToEnd(groupName: string): Promise<void> {
    const moved = this.state.links.filter((l) => (l.group || DEFAULT_GROUP) === groupName);
    if (!moved.length) return;
    this.state.links = this.state.links.filter((l) => (l.group || DEFAULT_GROUP) !== groupName).concat(moved);
    await this.save();
  }

  public async reorderLinks(sourceId: string, targetId: string, placement: "before" | "after" = "after"): Promise<boolean> {
    const list = [...this.state.links];
    const fromIdx = list.findIndex((l) => String(l.id) === String(sourceId));
    if (fromIdx < 0) return false;
    const sourceLink = list[fromIdx];

    list.splice(fromIdx, 1);

    const toIdx = list.findIndex((l) => String(l.id) === String(targetId));
    if (toIdx < 0) return false;
    const targetLink = list[toIdx];

    sourceLink.page = targetLink.page || DEFAULT_PAGE;
    sourceLink.group = targetLink.group || DEFAULT_GROUP;

    const insertIdx = placement === "before" ? toIdx : toIdx + 1;
    list.splice(insertIdx, 0, sourceLink);
    this.state.links = list;
    await this.save();
    this.notify();
    return true;
  }

  public async reorderFolderLinks(folderName: string, orderedIds: string[]): Promise<boolean> {
    const groupName = folderName || DEFAULT_GROUP;
    const firstIdx = this.state.links.findIndex((l) => (l.group || DEFAULT_GROUP) === groupName);
    if (firstIdx < 0) return false;
    const folderLinks = this.state.links.filter((l) => (l.group || DEFAULT_GROUP) === groupName);
    const otherLinks = this.state.links.filter((l) => (l.group || DEFAULT_GROUP) !== groupName);
    const map = new Map(folderLinks.map((l) => [String(l.id), l]));
    const reordered: LauncherLink[] = [];
    for (const id of orderedIds) {
      const link = map.get(String(id));
      if (link) {
        reordered.push(link);
        map.delete(String(id));
      }
    }
    for (const remaining of map.values()) {
      reordered.push(remaining);
    }
    const result = [...otherLinks];
    result.splice(Math.min(firstIdx, result.length), 0, ...reordered);
    this.state.links = result;
    await this.save();
    this.notify();
    return true;
  }

  public async reorderTile(
    source: { kind: "link" | "folder"; id?: string; group?: string },
    target: { kind: "link" | "folder"; id?: string; group?: string },
    placement: "before" | "after" = "after"
  ): Promise<void> {
    if (!source || !target) return;
    if (source.kind === "link" && target.kind === "link" && source.id && target.id) {
      await this.reorderLinks(source.id, target.id, placement);
      return;
    }
    const sourceLinks = source.kind === "folder"
      ? this.state.links.filter((l) => (l.group || DEFAULT_GROUP) === source.group)
      : this.state.links.filter((l) => String(l.id) === String(source.id));
    if (!sourceLinks.length) return;

    if (target.kind === "folder" && target.group) {
      const folderInfo = this.state.folders ? this.state.folders[target.group] : undefined;
      const targetPage = folderInfo?.page || this.state.activePage || DEFAULT_PAGE;
      sourceLinks.forEach((l) => {
        l.group = target.group;
        l.page = targetPage;
      });
      await this.save();
      this.notify();
      return;
    }

    const sourceIds = new Set(sourceLinks.map((l) => String(l.id)));
    const targetLinks = this.state.links.filter((l) => String(l.id) === String(target.id));
    if (!targetLinks.length || targetLinks.some((l) => sourceIds.has(String(l.id)))) return;

    const targetPage = targetLinks[0].page || DEFAULT_PAGE;
    const targetGroup = targetLinks[0].group || DEFAULT_GROUP;
    sourceLinks.forEach((l) => {
      l.page = targetPage;
      l.group = targetGroup;
    });

    const targetIds = new Set(targetLinks.map((l) => String(l.id)));
    const remaining = this.state.links.filter((l) => !sourceIds.has(String(l.id)));
    const indexes = remaining
      .map((link, index) => (targetIds.has(String(link.id)) ? index : -1))
      .filter((index) => index >= 0);
    if (!indexes.length) return;

    const insertAt = placement === "before" ? Math.min(...indexes) : Math.max(...indexes) + 1;
    remaining.splice(insertAt, 0, ...sourceLinks);
    this.state.links = remaining;
    await this.save();
    this.notify();
  }

  public async reorderPageItems(
    page: string,
    orderedItems: Array<{ type: "link" | "folder"; id?: string; groupName?: string }>
  ): Promise<void> {
    const curPage = String(page || DEFAULT_PAGE).trim();
    const isDefaultPage = !curPage || curPage === "常用网站" || curPage === "默认";
    const labels = this.state.pageLabels || {};

    const isLinkInCurrentPage = (link: LauncherLink) => {
      const linkPage = String(link.page || "").trim();
      const isDefaultLink = !linkPage || linkPage === "常用网站" || linkPage === "默认";
      if (isDefaultPage) return isDefaultLink;
      if (isDefaultLink) return false;
      if (linkPage === curPage) return true;
      const linkLabel = labels[linkPage] || linkPage;
      const curLabel = labels[curPage] || curPage;
      return linkLabel === curLabel || linkPage === curLabel || linkLabel === curPage;
    };

    const pageLinks = this.state.links.filter(isLinkInCurrentPage);
    const otherLinks = this.state.links.filter((l) => !isLinkInCurrentPage(l));

    const newPageLinks: LauncherLink[] = [];
    const usedLinkIds = new Set<string>();

    for (const item of orderedItems) {
      if (item.type === "link" && item.id) {
        const link = pageLinks.find((l) => String(l.id) === String(item.id));
        if (link && !usedLinkIds.has(String(link.id))) {
          usedLinkIds.add(String(link.id));
          newPageLinks.push(link);
        }
      } else if (item.type === "folder" && item.groupName) {
        const groupLinks = pageLinks.filter(
          (l) => (l.group || DEFAULT_GROUP) === item.groupName
        );
        for (const link of groupLinks) {
          if (!usedLinkIds.has(String(link.id))) {
            usedLinkIds.add(String(link.id));
            newPageLinks.push(link);
          }
        }
      }
    }

    for (const link of pageLinks) {
      if (!usedLinkIds.has(String(link.id))) {
        newPageLinks.push(link);
      }
    }

    this.state.links = [...otherLinks, ...newPageLinks];
    await this.save();
    this.notify();
  }
}

export const launcherService = LauncherService.getInstance();
