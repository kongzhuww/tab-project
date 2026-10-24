declare const chrome: any;

import {
  stickerBoardController,
  StickerFolderNode,
  StickerCardItem,
  StickerSubnavPill,
  type StickerBoardController
} from "../stickers/sticker-board-store";

import { STICKER_ROOT_NAME_KEY, STICKER_PATH_KEY, STICKER_ACTIVE_PATH_KEY, STICKER_EXPANDED_PATHS_KEY, STICKER_ROOT_REVISION_KEY } from "../stickers/settings-keys";
export { STICKER_DB_NAME, STICKER_ROOT_NAME_KEY, STICKER_PATH_KEY, STICKER_ACTIVE_PATH_KEY, STICKER_EXPANDED_PATHS_KEY, STICKER_ROOT_REVISION_KEY } from "../stickers/settings-keys";
export const MAX_IMAGE_BYTES = 25 * 1024 * 1024;
import type { StickerFileItem, StickerDirectoryNode } from "../stickers/sticker-types";
export type { StickerFileItem, StickerDirectoryNode } from "../stickers/sticker-types";
import { StickerPreviewResources } from "../stickers/preview-resources";
import { StickerLibraryRepository } from "../stickers/library-repository";
import { scanStickerDirectory, supportedStickerFileName, findStickerNode, collectStickerFiles, countStickerFolders } from "../stickers/directory-reader";
import { hasStickerReadPermission, requestStickerWritePermission, readStickerOriginal, writeStickerOriginal, deleteStickerOriginal } from "../stickers/original-files";
import { withStickersWrite } from "../stickers/module-state";
import { ReadSessionSlot } from "../core/read-session";
import { appDialog, appDialogState } from "../core/app-dialog.store";
import { LIBRARY_CHANGE_KEY, projectLibraryTree,
  cloneLibraryIndex, addVirtualGroup, editVirtualGroup, assignLibraryImage,
  groupIdAtPath, exportLibraryIndex, restoreLibraryIndex, type LibraryIndex } from "../stickers/library-index";

import {
  getStickerRecord, readStickerPage,
  getStickerGroups,
  createStickerGroup,
  deleteStickerGroup,
  renameStickerGroup,
  reorderStickerGroups,
  saveSticker,
  deleteStickerRecord,
  getStickersCountSummary,
  formatBytes
} from "../stickers/sticker-db";

export class StickersService {
  private root: FileSystemDirectoryHandle | null = null;
  private tree: StickerDirectoryNode | null = null;
  private sourceTree: StickerDirectoryNode | null = null;
  private editingFolders = false;
  private libraryIndex: LibraryIndex | null = null;
  private readonly ownerId = crypto.randomUUID();
  private readonly repository = new StickerLibraryRepository(this.ownerId);
  private activePath: string = "";
  private filterSubPath: string = "";
  private expandedPaths: Set<string> = new Set();
  private loading: boolean = false;
  private deletingImage = false;
  private scanOmissions = 0;
  private readonly previews = new StickerPreviewResources();
  private initialized: boolean = false;
  private disposed = false;
  private readVersion = 0;
  private readonly libraryReads = new ReadSessionSlot();
  private thumbnailVersion = 0;
  private readWorkers = new Set<AbortController>();
  private storageListener?: (changes: Record<string, unknown>, area: string) => void;
  public isUsingIndexedDb = false;
  public isBoardPaging = true;
  public currentPage = 1;
  public readonly pageSize = 12;
  public totalPages = 1;
  constructor(
    private readonly board: StickerBoardController = stickerBoardController,
    private readonly canRead: () => boolean = () => !document.hidden,
    private readonly mutation: <T>(operation: () => Promise<T>) => Promise<T> = operation => operation(),
    private displayLimit = Infinity
  ) {}
  private beginLibraryRead(version: number) {
    return this.libraryReads.begin({
      timeoutMs: 60000,
      isCurrent: () => !this.disposed && this.canRead() && version === this.readVersion,
      onStop: reason => {
        this.loading = false; this.previews.cancelPending();
        this.board.updateState({ loading: false });
        if (reason === "timeout" && !this.disposed && this.canRead()) this.toast("图库读取超过60秒，已停止等待；请重读。原文件和已提交索引不会回滚。", true);
      }
    });
  }
  public pauseReads(): void {
    this.readVersion++; this.thumbnailVersion++;
    this.libraryReads.cancel();
    this.previews.cancelPending();
    for (const worker of this.readWorkers) worker.abort();
    this.readWorkers.clear(); this.loading = false;
    this.board.updateState({ loading: false });
  }
  public dispose(): void {
    this.disposed = true; this.pauseReads();
    this.unsubscribeAction?.(); this.unsubscribeAction = undefined;
    if (this.storageListener && typeof chrome !== "undefined") chrome.storage?.onChanged?.removeListener(this.storageListener);
    this.storageListener = undefined;
    clearTimeout(this.toastTimer); this.onToast = undefined;
    this.clearBlobUrlCache(); this.tree = null; this.sourceTree = null; this.root = null;
    this.libraryIndex = null;
    this.board.reset();
  }
  private toastTimer: number = 0;
  private unsubscribeAction?: () => void;
  public onToast?: (message: string, bad: boolean) => void;

  public get activeFolderPath(): string { return this.activePath; }
  public getDirectoryTree(): StickerDirectoryNode | null { return this.tree; }
  public getCachedFileUrl(path: string): string { return this.previews.get(path); }

  public formatSize(bytes: number): string {
    const value = Number(bytes || 0);
    if (value < 1024) return `${value} B`;
    if (value < 1024 * 1024) return `${Math.round(value / 1024)} KB`;
    return `${(value / 1024 / 1024).toFixed(1)} MB`;
  }

  public toast(message: string, bad = false): void {
    if (this.disposed) return;
    if (this.onToast) { this.onToast(message, bad); return; }
    const node = document.getElementById("sticker-toast");
    if (!node) {
      if (bad) {
        console.warn(`[StickersService] ${message}`);
      }
      return;
    }
    window.clearTimeout(this.toastTimer);
    node.textContent = message;
    node.classList.toggle("bad", bad);
    node.hidden = false;
    this.toastTimer = window.setTimeout(() => {
      node.hidden = true;
    }, 3200);
  }

  public clearBlobUrlCache(): void { this.previews.clear(); }
  public openHandleDb(): Promise<IDBDatabase> { return this.repository.open(); }
  public readSavedRoot(): Promise<FileSystemDirectoryHandle | null> { return this.repository.readRoot(); }
  public saveRootHandle(handle: FileSystemDirectoryHandle): Promise<void> { return this.repository.saveRoot(handle); }
  public hasPermission(handle: FileSystemHandle | null): Promise<boolean> { return hasStickerReadPermission(handle); }

  public async usableRoot(): Promise<FileSystemDirectoryHandle | null> {
    const version = this.readVersion;
    const root = await this.readSavedRoot();
    if (this.disposed || version !== this.readVersion) return null;
    this.root = root;
    if (root && await this.hasPermission(root)) return root;
    return null;
  }

  public async chooseRootFolder(): Promise<void> {
    if (typeof (window as any).showDirectoryPicker !== "function") {
      throw new Error("当前浏览器不支持文件夹授权，请使用最新版 Edge / Chrome");
    }
    const selected = await (window as any).showDirectoryPicker({
      id: "logicweaver-stickers",
      mode: "read",
      startIn: "pictures"
    });
    this.clearBlobUrlCache();
    await this.saveRootHandle(selected);
    this.root = selected;
    let customPath = selected.name;
    if (typeof chrome !== "undefined" && chrome?.storage?.local) {
      const stored = await chrome.storage.local.get([STICKER_PATH_KEY]);
      customPath = selected.name;
      await chrome.storage.local.set({
        [STICKER_ROOT_NAME_KEY]: selected.name,
        [STICKER_PATH_KEY]: customPath
      });
    }
    this.toast(`已关联本地文件夹「${customPath}」`);
    await this.loadLibrary();
  }

  public async authorizeOrChooseRoot(): Promise<void> {
    if (this.root) {
      const hasPerm = await this.hasPermission(this.root);
      if (!hasPerm) {
        try {
          // @ts-ignore
          const permission = await (this.root as any).requestPermission({ mode: "read" });
          if (permission === "granted") {
            this.toast(`已恢复「${this.root.name}」读取授权`);
            await this.loadLibrary(this.activePath);
            return;
          }
        } catch {}
      }
    }
    await this.chooseRootFolder();
  }

  public supportedFileName(name: string): boolean {
    return supportedStickerFileName(name);
  }

  public validPackName(value: string): string {
    const name = String(value || "").trim();
    if (
      !name ||
      name.length > 50 ||
      /[<>:"/\\|?*\u0000-\u001f]/.test(name) ||
      /[. ]$/.test(name) ||
      name === "." ||
      name === ".."
    ) {
      return "";
    }
    if (/^(con|prn|aux|nul|com[1-9]|lpt[1-9])$/i.test(name)) return "";
    return name;
  }

  /**
   * 递归遍历多层子文件夹并并发解析文件属性
   */
  public async scanDirectoryTree(dirHandle: FileSystemDirectoryHandle, path = "", depth = 0, signal?: AbortSignal): Promise<StickerDirectoryNode | null> {
    const result = await scanStickerDirectory(dirHandle, path, depth, signal);
    this.scanOmissions = result.omissions;
    return result.tree;
  }
  public findNodeByPath(root: StickerDirectoryNode | null, path: string): StickerDirectoryNode | null { return findStickerNode(root, path); }
  public collectAllItems(node: StickerDirectoryNode | null): StickerFileItem[] { return collectStickerFiles(node); }
  public countTotalFolders(node: StickerDirectoryNode | null): number { return countStickerFolders(node); }

  public async loadLibrary(preferredPath = ""): Promise<void> {
    if (this.disposed || !this.canRead()) return;
    this.pauseReads();
    const request = this.beginLibraryRead(this.readVersion);
    if (!request.current()) return;
    this.loading = true;
    this.libraryIndex = null; this.tree = null; this.sourceTree = null; this.clearBlobUrlCache();
    this.board.updateState({ loading: true, items: [], libraryImageCount: null, needsReadPermission: false });
    const current = request.current;
    try {
      const stored = await request.wait<Record<string, any>>(() => typeof chrome !== "undefined" && chrome?.storage?.local
        ? chrome.storage.local.get([STICKER_ROOT_NAME_KEY, STICKER_PATH_KEY, STICKER_ACTIVE_PATH_KEY, STICKER_EXPANDED_PATHS_KEY]) : Promise.resolve({}));
      if (!current()) return;
      const root = await request.wait(() => this.readSavedRoot());
      if (!current()) return;
      this.root = root;
      this.board.updateState({
        storageKind: root || stored[STICKER_ROOT_NAME_KEY] ? "directory" : null,
        rootName: root?.name || String(stored[STICKER_ROOT_NAME_KEY] || "")
      });
      const readable = root ? await request.wait(() => this.hasPermission(root)) : false;
      if (!current()) return;
      if ((root && !readable) || (!root && stored[STICKER_ROOT_NAME_KEY])) {
        this.isUsingIndexedDb = false;
        this.tree = null; this.libraryIndex = null; this.clearBlobUrlCache();
        this.board.updateState({ storageKind: "directory", hasFolder: false, needsReadPermission: true, libraryImageCount: null, items: [], folders: [], subFolders: [],
          folderPath: "图库目录需要重新授权", emptyText: "本地图库未获读取授权，请在设置 → 本地图库中授权；没有切换到内置库。" });
        return;
      }
      if (!root) {
        this.isUsingIndexedDb = true;
        await this.loadIndexedDbLibrary(preferredPath || this.activePath || "");
        return;
      }
      this.isUsingIndexedDb = false;
      const sourceTree = await request.wait(() => this.scanDirectoryTree(root, "", 0, request.signal));
      if (!current()) return;
      if (!sourceTree) throw new Error("图库目录无法扫描");
      const index = await request.wait(() => this.repository.load(root, sourceTree, request.signal));
      if (!current()) return;
      this.clearBlobUrlCache();
      this.libraryIndex = index;
      this.sourceTree = sourceTree;
      const tree = projectLibraryTree(index, sourceTree);
      this.tree = tree;
      if (Array.isArray(stored[STICKER_EXPANDED_PATHS_KEY])) this.expandedPaths = new Set(stored[STICKER_EXPANDED_PATHS_KEY]);
      if (this.expandedPaths.size === 0 && tree) this.expandedPaths.add("");
      let candidate = preferredPath || this.activePath || stored[STICKER_ACTIVE_PATH_KEY] || "";
      while (candidate && !this.findNodeByPath(tree, candidate)) {
        candidate = candidate.includes("/") ? candidate.slice(0, candidate.lastIndexOf("/")) : "";
      }
      this.activePath = candidate;
      this.filterSubPath = "";
      this.currentPage = 1;
      const configuredPath = stored[STICKER_PATH_KEY] || root?.name || "";
      const dirs = this.countTotalFolders(tree);
      this.board.updateState({
        storageKind: "directory",
        hasFolder: Boolean(root),
        folderPath: root && tree ? `已挂载本地目录：${configuredPath}（${dirs} 个虚拟分类 · ${tree.totalCount} 张图片）`
          : configuredPath ? `已配置路径「${configuredPath}」，请显式授权访问` : "尚未选择本地文件夹",
        folderSummary: `${dirs} 个虚拟分类 · ${tree?.totalCount || 0} 张图片`
      });
      this.renderTree(); this.renderItems();
      if (this.scanOmissions) this.toast(`有 ${this.scanOmissions} 个文件或过深目录未能读取，扫描限6层；原文件与旧索引保留。`, true);
    } catch {
      if (current()) this.toast("目录读取失败，请重载表情包模块后重试；若仍失败，请检查浏览器目录访问授权。", true);
    } finally {
      if (request.finish()) { this.loading = false; this.board.updateState({ loading: false }); }
    }
  }

  public renderTree(): void {
    this.syncStickerTreeToVue();
  }

  public syncStickerTreeToVue(): void {
    if (!this.tree) {
      this.board.updateState({
        hasFolder: false,
        libraryImageCount: null,
        folderSummary: "0 个分类",
        folders: []
      });
      return;
    }
    const folderList: StickerFolderNode[] = [];
    folderList.push({
      name: `全部 / 根目录 (${this.tree.name})`,
      path: "",
      depth: 0,
      itemCount: this.tree.totalCount || 0,
      subDirs: (this.tree.subDirs as any) || [],
      isExpanded: true
    });

    const collectNodes = (nodes: StickerDirectoryNode[], depth: number) => {
      nodes.forEach((n) => {
        const isExpanded = this.expandedPaths.has(n.path);
        folderList.push({
          name: n.name,
          path: n.path,
          depth,
          itemCount: n.totalCount || (n.directItems ? n.directItems.length : 0),
          subDirs: (n.subDirs as any) || [],
          isExpanded
        });
        if (n.subDirs?.length > 0) {
          collectNodes(n.subDirs, depth + 1);
        }
      });
    };
    collectNodes(this.tree.subDirs, 1);
    this.board.updateState({
      hasFolder: true,
      libraryImageCount: this.tree.totalCount,
      folderSummary: `${Math.max(0, folderList.length - 1)} 个分类 · ${this.tree.totalCount} 张图片`,
      activePath: this.activePath,
      folders: folderList
    });
  }

  public renderItems(): void {
    if (this.disposed || !this.canRead()) return;
    if (!this.tree) {
      this.syncStickerItemsToVue([], null);
      return;
    }
    const activeNode = this.findNodeByPath(this.tree, this.activePath) || this.tree;
    let displayItems = activeNode?.path === "" ? this.collectAllItems(activeNode) : activeNode?.directItems || [];
    if (activeNode && displayItems.length === 0 && (activeNode.totalCount || 0) > 0) {
      displayItems = this.collectAllItems(activeNode);
    }
    this.syncStickerItemsToVue(displayItems, activeNode);
  }

  public syncStickerItemsToVue(
    displayItems: StickerFileItem[] = [],
    activeNode: StickerDirectoryNode | null = null
  ): void {
    if (!activeNode) {
      this.board.updateState({
        displayTitle: "请选择文件夹",
        breadcrumb: "",
        totalCountText: "0 张",
        subnavPills: [],
        items: [], hasMore: false,
        emptyText: this.root
          ? "未找到该分类，请在左侧重新选择"
          : "图片库尚未就绪，请重新加载页面或重载表情包模块后重试"
      });
      return;
    }
    const displayTitle = activeNode.path ? activeNode.name : "全部 / 根目录";
    const breadcrumb = activeNode.path ? `(${activeNode.path.replace(/\//g, " > ")})` : "";
    const dropPrompt = `明确导入才写入原图库，并归入「${displayTitle}」虚拟分类`;
    const total = displayItems.length;

    let totalPages = 1;
    if (this.isBoardPaging) {
      totalPages = Math.max(1, Math.ceil(total / this.pageSize));
      if (this.currentPage > totalPages) this.currentPage = totalPages;
      if (this.currentPage < 1) this.currentPage = 1;
      const start = (this.currentPage - 1) * this.pageSize;
      displayItems = displayItems.slice(start, start + this.pageSize);
    } else {
      displayItems = displayItems.slice(0, this.displayLimit);
    }
    this.totalPages = totalPages;

    const totalCountText = this.isBoardPaging
      ? (total > this.pageSize ? `${total} 张 · 第 ${this.currentPage} / ${totalPages} 页` : `${total} 张`)
      : (total > displayItems.length ? `${total} 张 · 已显示 ${displayItems.length} 张` : `${total} 张`);
    this.previews.retain(new Set(displayItems.map(item => item.relPath)));

    // 构造类似 Windows / macOS 文件资源管理器的面包屑与层级关系
    const breadcrumbs: { name: string; path: string }[] = [{ name: "根目录", path: "" }];
    let parentPath: string | null = null;
    if (activeNode.path) {
      const parts = activeNode.path.split("/");
      let accum = "";
      parts.forEach((p, idx) => {
        accum = accum ? `${accum}/${p}` : p;
        breadcrumbs.push({ name: p, path: accum });
        if (idx === parts.length - 2) {
          parentPath = accum;
        }
      });
      if (parts.length === 1) {
        parentPath = "";
      }
    }

    const subFolders: { name: string; path: string; count: number }[] = [];
    if (activeNode.subDirs && activeNode.subDirs.length > 0) {
      activeNode.subDirs.forEach((sub) => {
        subFolders.push({
          name: sub.name,
          path: sub.path,
          count: sub.totalCount || (sub.directItems || []).length
        });
      });
    }

    const subnavPills: StickerSubnavPill[] = [];
    if (activeNode.subDirs && activeNode.subDirs.length > 0) {
      subnavPills.push({
        name: "当前文件夹",
        path: activeNode.path,
        count: (activeNode.directItems || []).length,
        isActive: this.filterSubPath === ""
      });
      activeNode.subDirs.forEach((sub) => {
        subnavPills.push({
          name: sub.name,
          path: sub.path,
          count: (sub.directItems || []).length,
          isActive: this.filterSubPath === sub.path
        });
      });
    }

    const items: StickerCardItem[] = displayItems.map((item) => {
      const url = this.previews.get(item.relPath);
      return {
        id: item.id || item.relPath || item.file,
        file: item.file,
        relPath: item.relPath,
        folderName: item.folderName && item.folderName !== activeNode.name ? item.folderName : "",
        size: item.size || 0,
        sizeText: this.formatSize(item.size),
        url
      };
    });

    this.board.updateState({
      hasFolder: Boolean(this.root),
      activePath: this.activePath,
      displayTitle,
      breadcrumb,
      breadcrumbs,
      parentPath,
      subFolders,
      dropPrompt,
      totalCountText,
      hasMore: this.isBoardPaging ? this.currentPage < totalPages : total > displayItems.length,
      currentPage: this.currentPage,
      pageSize: this.pageSize,
      totalPages,
      totalCount: total,
      subnavPills,
      items,
      emptyText: items.length || subFolders.length
        ? ""
        : this.root
          ? "当前文件夹暂无图片 · 可直接拖入"
          : "图片库尚未就绪，请重新加载页面或重载表情包模块后重试"
    });

    const missing = displayItems.filter(item => !this.previews.has(item.relPath));
    const generation = ++this.thumbnailVersion;
    void (async () => {
      for (let offset = 0; offset < missing.length; offset += 2) {
        if (this.disposed || !this.canRead() || generation !== this.thumbnailVersion) return;
        await Promise.all(missing.slice(offset, offset + 2).map(async item => {
          try {
            const url = await this.previews.prepare(item.relPath, () => readStickerOriginal(item.handle),
              () => !this.disposed && this.canRead() && generation === this.thumbnailVersion);
            if (!url || this.disposed || !this.canRead() || generation !== this.thumbnailVersion) return;
            const target = this.board.state.items.find(row => row.id === (item.id || item.relPath || item.file));
            if (target) target.url = url;
          } catch {}
        }));
        if (this.disposed || !this.canRead() || generation !== this.thumbnailVersion) return;
        this.board.updateState({ items: [...this.board.state.items] });
      }
    })();
  }

  /** Deletes only the confirmed disk image, never a category directory. */
  public async deleteStickerFile(relPathOrFileName: string, exactPath = false): Promise<boolean> {
    const matches = this.collectAllItems(this.tree).filter(item => item.relPath === relPathOrFileName || (!exactPath && item.file === relPathOrFileName));
    if (matches.length !== 1 || !matches[0].id || !this.libraryIndex) return false;
    return this.mutation(() => this.deleteDirectoryImage(matches[0].id!));
  }

  private async deleteDirectoryImage(id: string): Promise<boolean> {
    if (this.deletingImage || appDialogState.isOpen) throw new Error("请先完成当前操作");
    const root = this.root, index = this.libraryIndex, version = this.readVersion;
    const target = this.collectAllItems(this.tree).find(file => file.id === id);
    if (!root || !index || !target || this.isUsingIndexedDb) throw new Error("图库已变化，请刷新后重试");
    const originalPath = target.relPath, originalSize = target.size, originalModified = target.modified;
    const current = () => !this.disposed && this.canRead() && this.root === root &&
      this.libraryIndex?.id === index.id && this.readVersion === version;
    this.deletingImage = true;
    let removed = false;
    try {
      if (!await appDialog.confirm({ title: "删除磁盘原图", danger: true, confirmText: "永久删除原图",
        message: `将真正删除图库中的「${originalPath}」。通常不进入系统回收站，无法通过分类索引备份或“恢复显示”找回。其他分类操作不会删除原图。确定删除这一张图片？` })) return false;
      if (!current()) throw new Error("图库或页面状态已变化，未删除原图");
      if (!await this.ensureHandlePermission(root)) throw new Error("未获得写入权限，未删除原图");
      if (!current()) throw new Error("图库或页面状态已变化，未删除原图");
      const selected = await this.readSavedRoot();
      await deleteStickerOriginal(root, selected, { relPath: originalPath, size: originalSize, modified: originalModified, handle: target.handle }, current);
      removed = true;
      await this.repository.forgetDeletedImage(root, index.id, id);
      this.toast("已删除磁盘原图，分类索引备份不能恢复此文件");
      return true;
    } catch (error: any) {
      if (removed) throw new Error("磁盘原图已删除，但索引清理未确认；请刷新图库核对，不要重复删除");
      throw new Error(error?.message || "删除未确认，请刷新核对；未自动重试");
    } finally {
      this.deletingImage = false;
      if (removed) {
        // Notify even if metadata cleanup failed; other views must stop showing stale previews.
        try { await chrome.storage.local.set({ [LIBRARY_CHANGE_KEY]: `${this.ownerId}:${crypto.randomUUID()}` }); } catch {}
        if (!this.disposed && this.canRead()) await this.loadLibrary();
      }
    }
  }

  private async copyBlob(blob: Blob, version: number): Promise<boolean> {
    if (this.disposed || !this.canRead() || version !== this.readVersion) return false;
    if (blob.type !== "image/png") {
      const bitmap = await createImageBitmap(blob);
      try {
        const canvas = document.createElement("canvas"); canvas.width = bitmap.width; canvas.height = bitmap.height;
        canvas.getContext("2d")?.drawImage(bitmap, 0, 0);
        blob = await new Promise<Blob>((resolve, reject) => canvas.toBlob(value => value ? resolve(value) : reject(new Error("图片转换失败")), "image/png"));
      } finally { bitmap.close(); }
    }
    if (this.disposed || !this.canRead() || version !== this.readVersion) return false;
    await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
    return !this.disposed && this.canRead() && version === this.readVersion;
  }
  public async copySticker(handle: FileSystemFileHandle): Promise<boolean> {
    const version = this.readVersion;
    try {
      const file = await readStickerOriginal(handle);
      if (this.disposed || !this.canRead() || version !== this.readVersion) return false;
      return await this.copyBlob(file, version);
    } catch { if (!this.disposed && this.canRead() && version === this.readVersion) this.toast("复制失败，请检查图片和剪贴板权限。", true); return false; }
  }
  public async copyStickerFromUrl(url: string): Promise<boolean> {
    const version = this.readVersion, request = new AbortController(); this.readWorkers.add(request);
    try {
      const response = await fetch(url, { signal: AbortSignal.any([request.signal, AbortSignal.timeout(15000)]), credentials: "omit", redirect: "error" });
      if (!response.ok) throw new Error("图片读取失败");
      return await this.copyBlob(await response.blob(), version);
    } catch { if (!this.disposed && this.canRead() && version === this.readVersion) this.toast("图片读取或复制失败。", true); return false; }
    finally { this.readWorkers.delete(request); }
  }
  public async readItemBlob(item: StickerCardItem): Promise<Blob> {
    const version = this.readVersion;
    let file: Blob | undefined;
    if (this.isUsingIndexedDb) file = (await getStickerRecord(item.id))?.blob;
    else {
      const target = this.collectAllItems(this.tree).find(file => file.id === item.id);
      if (target) file = await readStickerOriginal(target.handle);
    }
    if (!file || !file.size || file.size > MAX_IMAGE_BYTES || this.disposed || !this.canRead() || version !== this.readVersion) throw new Error("图片已变化或目录不可读，请刷新图库");
    return file;
  }
  public async copyItem(item: StickerCardItem): Promise<boolean> {
    const version = this.readVersion;
    try { return await this.copyBlob(await this.readItemBlob(item), version); }
    catch { this.toast("原图读取或复制失败，请检查目录与剪贴板权限。", true); return false; }
  }
  public enableBoardPaging(): void {
    this.isBoardPaging = true;
    this.displayLimit = 12;
    this.currentPage = 1;
  }
  public prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      if (this.isUsingIndexedDb) {
        void this.loadIndexedDbLibrary(this.activePath);
      } else {
        this.renderItems();
      }
    }
  }
  public nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      if (this.isUsingIndexedDb) {
        void this.loadIndexedDbLibrary(this.activePath);
      } else {
        this.renderItems();
      }
    }
  }
  public goToPage(page: number): void {
    const target = Math.max(1, Math.min(page, this.totalPages));
    if (target !== this.currentPage) {
      this.currentPage = target;
      if (this.isUsingIndexedDb) {
        void this.loadIndexedDbLibrary(this.activePath);
      } else {
        this.renderItems();
      }
    }
  }
  public showMore(): void {
    this.nextPage();
  }

  public async saveBlobToDir(
    dirHandle: FileSystemDirectoryHandle,
    blob: Blob,
    folderLabel: string
  ): Promise<void> {
    const indexSnapshot = this.libraryIndex;
    if (!indexSnapshot || !await indexSnapshot.root.isSameEntry(dirHandle)) throw new Error("图库索引尚未就绪或目录已切换，未写入原图");
    if (indexSnapshot.images.length >= 20000) throw new Error("图库索引达到两万条，未写入新文件，请先分库管理");
    const targetGroup = groupIdAtPath(indexSnapshot, this.activePath);
    try {
      if (!await this.ensureHandlePermission(dirHandle)) throw new Error("未获得用户授予的写入权限");
      const [extension, mime] = await this.detectImage(blob);
      const { fileName, handle: fileHandle } = await writeStickerOriginal(dirHandle, blob, extension, mime,
        () => this.libraryIndex?.id === indexSnapshot.id);
      if (indexSnapshot && await indexSnapshot.root.isSameEntry(dirHandle)) {
        const info = await readStickerOriginal(fileHandle);
        const next = cloneLibraryIndex(indexSnapshot);
        next.images.push({ id: `image_${crypto.randomUUID()}`, path: fileName, name: fileName,
          size: info.size, modified: info.lastModified, groupId: targetGroup, hidden: false, handle: fileHandle });
        await this.commitIndex(next);
      }
      this.toast(`已保存图片到原图库并加入「${folderLabel}」分类`);
    } catch (error: any) {
      this.toast("图片保存失败，可能已有部分文件完成，请核对后再操作。", true);
      throw error;
    }
  }

  public async saveFilesToDir(
    dirHandle: FileSystemDirectoryHandle,
    files: FileList | File[],
    folderLabel: string
  ): Promise<void> {
    if (files.length > 50) throw new Error("一次最多导入50张，请分批选择");
    for (const file of [...files]) {
      await this.saveBlobToDir(dirHandle, file, folderLabel);
    }
    await this.loadLibrary(this.activePath);
  }

  public async saveUrlToDir(
    dirHandle: FileSystemDirectoryHandle,
    rawUrl: string,
    folderLabel: string
  ): Promise<void> {
    try {
      if (!await this.ensureHandlePermission(dirHandle)) throw new Error("未获得图库写入授权");
      if (String(rawUrl).startsWith("data:image/")) {
        await this.saveBlobToDir(dirHandle, await (await fetch(rawUrl)).blob(), folderLabel);
        await this.loadLibrary(this.activePath);
        return;
      }
      const url = this.assertPublicHttps(rawUrl);
      this.toast("正在读取图片…");
      const response = await fetch(url, { credentials: "omit", cache: "no-store", redirect: "error", signal: AbortSignal.timeout(15000) });
      if (!response.ok) throw new Error(`图片请求失败（HTTP ${response.status}）`);
      await this.saveBlobToDir(dirHandle, await response.blob(), folderLabel);
      await this.loadLibrary(this.activePath);
    } catch (error: any) {
      this.toast("图片读取或保存失败，未自动重试。", true);
      throw error;
    }
  }

  public getActiveTargetHandle(): { handle: FileSystemDirectoryHandle; name: string } | null {
    if (!this.tree) return null;
    if (this.filterSubPath) {
      const sub = this.findNodeByPath(this.tree, this.filterSubPath);
      if (sub) return { handle: sub.handle, name: sub.name };
    }
    const active = this.findNodeByPath(this.tree, this.activePath);
    if (active) return { handle: active.handle, name: active.name };
    return this.root ? { handle: this.root, name: this.tree.name } : null;
  }

  public ensureHandlePermission(handle: FileSystemHandle): Promise<boolean> { return requestStickerWritePermission(handle); }

  public async getFavoritesDirectoryHandle(): Promise<FileSystemDirectoryHandle | null> {
    if (!this.root) {
      this.root = await this.readSavedRoot();
    }
    if (!this.root) return null;
    try {
      return this.root;
    } catch {
      return this.root;
    }
  }

  public extractImageUrlFromTransfer(dataTransfer: DataTransfer): string | null {
    const html = dataTransfer.getData("text/html") || "";
    const rawText = (dataTransfer.getData("text/uri-list") || dataTransfer.getData("text/plain") || "").trim();
    const combined = html + "\n" + rawText;

    // 0. 动图超级优先级：只要拖拽内容中包含任意 .gif 资源，100% 优先提取原版 GIF 动图
    const gifMatch = combined.match(/(?:https?:)?\/\/[^\s"'()<>&;]+\.gif(?:@[^\s"'()<>&;]*)?/i);
    if (gifMatch) {
      let u = gifMatch[0];
      if (u.startsWith("//")) u = "https:" + u;
      return u.replace(/@[^/?#]+$/i, "");
    }

    // 1. 如果有 HTML 内容，利用 DOMParser 进行深度树状解析 (优先取原始 img，绝不取 avif 压缩源)
    if (html) {
      try {
        const doc = new DOMParser().parseFromString(html, "text/html");
        // 优先查找普通的 img (避免被 picture 的 avif source 截胡)
        const img = doc.querySelector("img[src], img[data-src]");
        if (img) {
          let src = img.getAttribute("src") || img.getAttribute("data-src") || "";
          if (src) {
            if (src.startsWith("//")) src = "https:" + src;
            if (src.includes("hdslb.com/bfs/")) return src.replace(/@[^/?#]+$/i, "");
            return src;
          }
        }
        // 查找非 avif 的 source 标签 (如 webp/png)
        const nonAvifSource = doc.querySelector("source:not([type*='avif'])[srcset]");
        if (nonAvifSource) {
          const srcset = nonAvifSource.getAttribute("srcset") || "";
          let firstSrc = srcset.split(",")[0].trim().split(" ")[0];
          if (firstSrc.startsWith("//")) firstSrc = "https:" + firstSrc;
          if (firstSrc.includes("hdslb.com/bfs/")) return firstSrc.replace(/@[^/?#]+$/i, "");
          return firstSrc;
        }
        // 查找带背景图的容器
        const bgEl = doc.querySelector("[style*='background-image'], [style*='url']");
        if (bgEl) {
          const style = bgEl.getAttribute("style") || "";
          const match = style.match(/url\(["']?([^"')]+)["']?\)/i);
          if (match) {
            let u = match[1];
            if (u.startsWith("//")) u = "https:" + u;
            if (u.includes("hdslb.com/bfs/")) return u.replace(/@[^/?#]+$/i, "");
            return u;
          }
        }
      } catch (_) {}
    }

    // 2. 匹配 B 站专用静态 CDN 资源 (包含 hdslb.com/bfs/)
    const biliMatch = combined.match(/(?:https?:)?\/\/[a-zA-Z0-9.-]*hdslb\.com\/bfs\/[^\s"'()<>&;]+/i);
    if (biliMatch) {
      let u = biliMatch[0];
      if (u.startsWith("//")) u = "https:" + u;
      return u.replace(/@[^/?#]+$/i, "");
    }

    // 3. 匹配常见通用图片扩展名 URL (png, jpg, jpeg, gif, webp, bmp)
    const imgUrlMatch = combined.match(/(?:https?:)?\/\/[^\s"'()<>&;]+\.(?:png|jpe?g|gif|webp|bmp)(?:@[^\s"'()<>&;]*)?/i);
    if (imgUrlMatch) {
      let u = imgUrlMatch[0];
      if (u.startsWith("//")) u = "https:" + u;
      return u.replace(/@[^/?#]+$/i, "");
    }

    // 4. 纯文本本身就是有效 http(s) URL
    if (/^https?:\/\/[^\s]+$/i.test(rawText)) {
      return rawText.includes("hdslb.com/bfs/") ? rawText.replace(/@[^/?#]+$/i, "") : rawText;
    }

    // 5. 匹配 base64 内联图片
    const dataMatch = combined.match(/data:image\/[a-zA-Z0-9+.-]+;base64,[a-zA-Z0-9+/=]+/i);
    if (dataMatch) {
      return dataMatch[0];
    }

    return null;
  }

  /**
   * 极速直落「新标签页/收藏夹」引擎
   * 通过后台 Junction 物理直写（0 弹窗、0 交互门槛、100% 成功落盘）
   */
  public async saveImageToDiskSafe(param: {
    file?: File;
    blob?: Blob;
    url?: string;
    dataUrl?: string;
  }): Promise<{ ok: boolean; error?: string }> {
    let finalDataUrl = param.dataUrl;

    if (!finalDataUrl && param.file) {
      finalDataUrl = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result || ""));
        reader.readAsDataURL(param.file!);
      });
    } else if (!finalDataUrl && param.blob) {
      finalDataUrl = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result || ""));
        reader.readAsDataURL(param.blob!);
      });
    }

    if (typeof chrome !== "undefined" && chrome?.runtime?.sendMessage) {
      try {
        const res = await new Promise<any>((resolve) => {
          chrome.runtime.sendMessage(
            {
              type: "saveToFavorites",
              url: param.url,
              dataUrl: finalDataUrl
            },
            (reply: { ok?: boolean; error?: string } | undefined) => resolve(reply)
          );
        });
        return { ok: Boolean(res?.ok), error: res?.error };
      } catch (err: any) {
        console.warn("[saveImageToDiskSafe] 写入异常:", err);
        return { ok: false, error: err?.message };
      }
    }

    return { ok: false, error: "环境不支持" };
  }

  public async saveImageToFavoritesAny(param: {
    file?: File;
    blob?: Blob;
    url?: string;
    dataUrl?: string;
    strictLocal?: boolean;
  }): Promise<{ ok: boolean; error?: string }> {
    // A configured directory is authoritative. Never silently fall back to a download.
    if (!this.tree || !this.libraryIndex) await this.loadLibrary(this.activePath);
    if (!this.isUsingIndexedDb && (!this.root || !this.libraryIndex || !this.tree)) return { ok: false, error: "请先在设置中授权并读取本地图库；未写入图片或切换存储位置" };
    if (!this.isUsingIndexedDb && this.root && !await this.ensureHandlePermission(this.root)) return { ok: false, error: "需要用户明确授予图库写入权限" };
    try {
      let blob: Blob | undefined = param.blob || param.file;
      if (!blob && (param.url || param.dataUrl)) {
        const source = param.dataUrl || this.assertPublicHttps(param.url!);
        const response = await fetch(source, { credentials: "omit", redirect: "error", signal: AbortSignal.timeout(15000) });
        if (!response.ok) throw new Error("图片读取失败");
        blob = await response.blob();
      }
      if (!blob) throw new Error("未提供图片");
      await this.detectImage(blob);
      if (this.isUsingIndexedDb) {
        await saveSticker(blob, param.file?.name || "收藏图片", this.activePath || "默认", this.ownerId);
        await this.loadIndexedDbLibrary(this.activePath);
      } else {
        await this.saveBlobToDir(this.root!, blob, this.tree?.name || "本地图库");
        await this.loadLibrary(this.activePath);
      }
      return { ok: true };
    } catch { return { ok: false, error: "图片读取或保存未确认，请核对图库；未自动重试或回退其他目录" }; }
  }

  public async handleDropToFavorites(
    dataTransfer: DataTransfer
  ): Promise<{ ok: boolean; count: number; message: string }> {
    let savedCount = 0;

    // 🌟 第一优先级：如果从网页拖入，必须 100% 优先提取原图/动图 URL！
    // 严禁优先使用 items.getAsFile()，因为浏览器跨窗口拖拽会把动态 GIF 强行转成单帧静态 PNG 快照！
    const candidateUrl = this.extractImageUrlFromTransfer(dataTransfer);
    if (candidateUrl) {
      const res = await this.saveImageToFavoritesAny({ url: candidateUrl });
      if (res.ok) {
        savedCount++;
      } else {
        throw new Error(res.error || "图片下载并写入磁盘失败，请重试");
      }
    }

    // 🌟 第二优先级：只有在没有提取到网页链接时（如从本地电脑桌面/文件夹拖入真实文件），才读取本地 File
    if (savedCount === 0 && dataTransfer.files && dataTransfer.files.length > 0) {
      for (const file of [...dataTransfer.files]) {
        if (file.type.startsWith("image/") || /\.(png|jpe?g|gif|webp|bmp|svg|avif)$/i.test(file.name)) {
          const res = await this.saveImageToFavoritesAny({ file });
          if (res.ok) savedCount++;
        }
      }
    }

    // 🌟 第三优先级：兜底读取 items
    if (savedCount === 0 && dataTransfer.items && dataTransfer.items.length > 0) {
      for (const item of [...dataTransfer.items]) {
        if (item.kind === "file" && item.type.startsWith("image/")) {
          const file = item.getAsFile();
          if (file) {
            const res = await this.saveImageToFavoritesAny({ file });
            if (res.ok) savedCount++;
          }
        }
      }
    }

    if (savedCount > 0) {
      const msg = `✓ 已成功存入当前图库 (${savedCount} 张)`;
      this.toast(msg);
      return { ok: true, count: savedCount, message: msg };
    } else {
      throw new Error("未能识别到有效图片内容，请直接从网页按住图片拖过来");
    }
  }

  /**
   * 支持通过剪贴板 Ctrl+V 粘贴直接存入收藏夹
   */
  public async handlePasteToFavorites(
    clipboardData: DataTransfer
  ): Promise<{ ok: boolean; count: number; message: string }> {
    return this.handleDropToFavorites(clipboardData);
  }

  public async detectImage(blob: Blob): Promise<[string, string]> {
    if (blob.size <= 0 || blob.size > MAX_IMAGE_BYTES) throw new Error("图片大小须在 25MB 以内");
    const bytes = new Uint8Array(await blob.slice(0, 16).arrayBuffer());
    let ascii = "";
    for (let i = 0; i < bytes.length; i++) {
      ascii += String.fromCharCode(bytes[i]);
    }
    if (bytes[0] === 0x89 && ascii.slice(1, 4) === "PNG") return ["png", "image/png"];
    if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return ["jpg", "image/jpeg"];
    if (ascii.startsWith("GIF87a") || ascii.startsWith("GIF89a")) return ["gif", "image/gif"];
    if (ascii.startsWith("RIFF") && ascii.slice(8, 12) === "WEBP") return ["webp", "image/webp"];
    if (ascii.startsWith("BM")) return ["bmp", "image/bmp"];
    throw new Error("文件不是受支持的 PNG/JPEG/GIF/WebP/BMP 图片");
  }

  public assertPublicHttps(raw: string): string {
    const url = new URL(raw);
    if (url.protocol !== "https:" || url.username || url.password) throw new Error("只支持不带账号密码的 HTTPS 图片链接");
    const host = url.hostname.toLowerCase();
    if (
      host === "localhost" ||
      host === "0.0.0.0" ||
      host === "::1" ||
      /^127\./.test(host) ||
      /^10\./.test(host) ||
      /^192\.168\./.test(host) ||
      /^169\.254\./.test(host) ||
      /^172\.(1[6-9]|2\d|3[01])\./.test(host)
    ) {
      throw new Error("不允许访问本机或内网地址");
    }
    return url.href;
  }

  public droppedUrl(transfer: DataTransfer): string {
    const uri = String(transfer.getData("text/uri-list") || "")
      .split(/\r?\n/)
      .find((line) => line && !line.startsWith("#"));
    if (uri) return uri;
    const html = transfer.getData("text/html");
    if (html) {
      const src = new DOMParser().parseFromString(html, "text/html").querySelector("img")?.src;
      if (src) return src;
    }
    const plain = String(transfer.getData("text/plain") || "").trim();
    return /^https:\/\//i.test(plain) || plain.startsWith("data:image/") ? plain : "";
  }

  public attachBoard(): () => void {
    // Only a mounted view subscribes; data-only consumers never bind board controls.
    if (!this.unsubscribeAction) {
      this.unsubscribeAction = this.board.onAction((action, payload) => {
        const operation = async () => {
        if (action === "choose-folder") {
          await this.authorizeOrChooseRoot();
        } else if (action === "load-more") {
          this.showMore();
        } else if (action === "prev-page") {
          this.prevPage();
        } else if (action === "next-page") {
          this.nextPage();
        } else if (action === "go-page") {
          this.goToPage(Number(payload) || 1);
        } else if (action === "refresh") {
          void this.loadLibrary(this.activePath);
        } else if (action === "rename-folder" || action === "delete-folder" || action === "reorder-folders") {
          await this.editFolder(action, payload);
        } else if (action === "create-folder") {
          if (this.isUsingIndexedDb) {
            const name = String(payload || "").trim();
            if (!this.validPackName(name) || name === "全部") throw new Error("分类名称无效，不能使用保留名称“全部”。");
            if ((await getStickerGroups()).includes(name)) throw new Error("已有同名分类");
            await createStickerGroup(name, this.ownerId);
            this.toast(`已创建分类「${name}」`);
            await this.loadIndexedDbLibrary(name);
            return;
          }
          const name = this.validPackName(payload);
          if (!name || name === "全部") throw new Error("分类名称无效");
          if (!this.libraryIndex) throw new Error("请先授权并读取图库");
          const next = addVirtualGroup(this.libraryIndex, this.activePath, name);
          const group = next.groups[next.groups.length - 1];
          const targetPath = this.activePath ? `${this.activePath}/${group.id}` : group.id;
          await this.commitIndex(next, targetPath);
        } else if (action === "select-folder" || action === "select-pill") {
          this.currentPage = 1;
          if (this.isUsingIndexedDb) {
            const groupName = String(payload ?? "");
            await this.loadIndexedDbLibrary(groupName);
            return;
          }
          const path = String(payload || "");
          if (typeof chrome !== "undefined" && chrome?.storage?.local) await chrome.storage.local.set({ [STICKER_ACTIVE_PATH_KEY]: path });
          if (Number.isFinite(this.displayLimit)) this.displayLimit = 12;
          this.activePath = path; this.filterSubPath = "";
          this.renderTree(); this.renderItems();
        } else if (action === "toggle-expand") {
          const path = String(payload || ""), next = new Set(this.expandedPaths);
          if (next.has(path)) next.delete(path); else next.add(path);
          if (typeof chrome !== "undefined" && chrome?.storage?.local) await chrome.storage.local.set({ [STICKER_EXPANDED_PATHS_KEY]: [...next] });
          this.expandedPaths = next; this.renderTree();
        } else if (action === "pick-files") {
          document.getElementById("sticker-file-input")?.click();
        } else if (action === "copy-item") {
          if (payload) await this.copyItem(payload);
        } else if (action === "assign-item") {
          const item = payload?.item;
          if (!this.libraryIndex || !item?.id || this.isUsingIndexedDb) throw new Error("该操作需要已授权的本地图库");
          await this.commitIndex(assignLibraryImage(this.libraryIndex, item.id, String(payload?.path || "")));
        } else if (action === "delete-item") {
          const item = payload;
          if (this.isUsingIndexedDb) {
            if (item?.id) {
              await deleteStickerRecord(item.id, this.ownerId);
              this.previews.delete(item.id);
              this.toast("已删除表情");
              await this.loadIndexedDbLibrary(this.activePath);
            }
            return;
          }
          if (!this.libraryIndex || !item?.id) throw new Error("图库索引尚未就绪");
          await this.deleteDirectoryImage(item.id);
        }
        };
        return ["refresh", "load-more", "prev-page", "next-page", "go-page", "copy-item", "pick-files"].includes(action) ? operation() : this.mutation(operation);
      });
    }
    return () => { this.unsubscribeAction?.(); this.unsubscribeAction = undefined; };
  }

  public init(): void {
    if (this.initialized || this.disposed) return;
    this.initialized = true;
    this.storageListener = (changes, area) => {
      if (area !== "local") return;
      const indexChange = (changes[LIBRARY_CHANGE_KEY] as any)?.newValue;
      if (typeof indexChange === "string" && indexChange.startsWith(`${this.ownerId}:`)) return;
      if (!(STICKER_ROOT_NAME_KEY in changes || STICKER_PATH_KEY in changes || STICKER_ROOT_REVISION_KEY in changes || LIBRARY_CHANGE_KEY in changes)) return;
      this.pauseReads(); this.clearBlobUrlCache(); this.root = null; this.tree = null;
      this.board.updateState({ hasFolder: false, rootName: "", libraryImageCount: null, needsReadPermission: false, items: [], folders: [], folderPath: "目录配置已变更，旧列表已失效" });
      // Hidden views defer reads until their next explicit activation.
      if (this.canRead()) void this.loadLibrary(this.activePath);
    };
    if (typeof chrome !== "undefined") chrome.storage?.onChanged?.addListener(this.storageListener);
    void this.loadLibrary();
  }

  public activate(): void {
    if (this.disposed || !this.canRead()) return;
    if (!this.tree) { void this.loadLibrary(this.activePath); return; }
    if (this.isUsingIndexedDb) { void this.loadIndexedDbLibrary(this.activePath); return; }
    this.renderTree(); this.renderItems();
  }

  public async loadIndexedDbLibrary(activeGroup = ""): Promise<void> {
    if (this.disposed || !this.canRead()) return;
    const request = this.beginLibraryRead(++this.readVersion);
    const current = request.current;
    if (!current()) return;
    this.loading = true;
    this.previews.cancelPending();
    this.board.updateState({ loading: true });

    try {
      const groups = await request.wait(() => getStickerGroups());
      if (!current()) return;
      const summary = await request.wait(() => getStickersCountSummary());
      if (!current()) return;
      const currentGroup = groups.includes(activeGroup) ? activeGroup : "";
      this.activePath = currentGroup;

      const folders: StickerFolderNode[] = groups.map((g) => ({
        name: g,
        path: g,
        depth: 0,
        itemCount: summary.groupCounts[g] || 0,
        subDirs: [],
        isExpanded: false
      }));

      const totalRecords = currentGroup ? summary.groupCounts[currentGroup] || 0 : summary.total;
      const pageLimit = this.isBoardPaging ? this.pageSize : Math.min(this.displayLimit, 120);
      this.currentPage = Math.max(1, Math.min(this.currentPage, Math.max(1, Math.ceil(totalRecords / this.pageSize))));
      const records = await request.wait(() => readStickerPage(currentGroup || undefined, this.isBoardPaging ? (this.currentPage - 1) * this.pageSize : 0, pageLimit));
      if (!current()) return;

      const total = totalRecords;
      let pagedRecords = records;
      let totalPages = 1;
      if (this.isBoardPaging) {
        totalPages = Math.max(1, Math.ceil(total / this.pageSize));
        if (this.currentPage > totalPages) this.currentPage = totalPages;
        if (this.currentPage < 1) this.currentPage = 1;
        // readStickerPage already returned only this page, not every original Blob.
      }
      this.totalPages = totalPages;

      this.previews.retain(new Set(pagedRecords.map(record => record.id)));

      const items: StickerCardItem[] = [];
      for (let offset = 0; offset < pagedRecords.length; offset += 2) {
        const rows = await request.wait(() => Promise.all(pagedRecords.slice(offset, offset + 2).map(async rec => {
          let url = "";
          try {
            url = await this.previews.prepare(rec.id, async () => rec.blob,
              current);
          } catch { /* Preserve the index row even when its preview cannot decode. */ }
          return { id: rec.id, file: rec.name, relPath: `${rec.group}/${rec.name}`, folderName: rec.group,
            size: rec.size, sizeText: formatBytes(rec.size), url } as StickerCardItem;
        })));
        if (!current()) return;
        items.push(...rows.filter((row): row is StickerCardItem => !!row));
      }

      if (!current()) return;
      const totalCountText = this.isBoardPaging
        ? (total > this.pageSize ? `${total} 张 · 第 ${this.currentPage} / ${totalPages} 页` : `${total} 张`)
        : `${total} 张`;

      this.board.updateState({
        storageKind: "indexeddb",
        hasFolder: true,
        rootName: "",
        libraryImageCount: summary.total,
        needsReadPermission: false,
        folderPath: "内置本地沙箱 (免文件夹授权)",
        folderSummary: `${groups.length} 个分类 · ${summary.total} 张表情`,
        activePath: currentGroup,
        displayTitle: currentGroup ? `分类：${currentGroup}` : "全部表情",
        breadcrumb: currentGroup,
        breadcrumbs: [{ name: "表情包库", path: "默认" }, { name: currentGroup, path: currentGroup }],
        parentPath: null,
        subFolders: folders.map(folder => ({ name: folder.name, path: folder.path, count: folder.itemCount })),
        dropPrompt: `拖入图片直接保存到「${currentGroup || "默认"}」分类`,
        totalCountText,
        folders: [{ name: "全部表情", path: "", depth: 0, itemCount: summary.total, subDirs: [] }, ...folders],
        subnavPills: [],
        items,
        emptyText: items.length === 0 ? "暂无表情包，可直接从网页或电脑拖入图片保存" : "",
        loading: false,
        hasMore: this.isBoardPaging ? this.currentPage < totalPages : false,
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        totalPages,
        totalCount: total
      });
    } catch {
      if (!current()) return;
      this.board.updateState({ loading: false, emptyText: "读取表情包数据库失败" });
    } finally {
      if (request.finish()) { this.loading = false; this.board.updateState({ loading: false }); }
    }
  }

  private async commitIndex(next: LibraryIndex, selectedPath = this.activePath): Promise<void> {
    const saved = await this.repository.save(next);
    if (this.disposed || this.libraryIndex?.id !== saved.id) return;
    this.libraryIndex = saved;
    if (this.sourceTree) this.tree = projectLibraryTree(saved, this.sourceTree);
    this.board.updateState({ folderSummary: `${saved.groups.length} 个分类 · ${this.tree?.totalCount || 0} 张图片` });
    this.activePath = selectedPath;
    this.currentPage = 1;
    this.clearBlobUrlCache();
    if (this.canRead()) { this.renderTree(); this.renderItems(); }
  }

  public async revealHiddenImages(): Promise<void> {
    if (!this.libraryIndex) throw new Error("请先读取本地图库");
    const next = cloneLibraryIndex(this.libraryIndex);
    next.images.forEach(image => { image.hidden = false; });
    await this.commitIndex(next);
  }

  public async exportIndexBackup(): Promise<string> {
    if (this.libraryIndex) return exportLibraryIndex(this.libraryIndex);
    const root = await this.readSavedRoot();
    if (!root) throw new Error("没有已关联的目录句柄，未猜测其他图库");
    const saved = await this.repository.find(root);
    if (!saved) throw new Error("此目录尚未建立分类索引，请先授权读取");
    return exportLibraryIndex(saved);
  }

  public async restoreIndexBackup(input: string): Promise<{ matched: number; unmatched: number }> {
    if (!this.libraryIndex) throw new Error("请先读取已授权的本地图库");
    if (!this.sourceTree) throw new Error("请先刷新图库再恢复索引");
    const present = new Set(this.collectAllItems(this.sourceTree).map(file => file.id || ""));
    const restored = restoreLibraryIndex(this.libraryIndex, input, present);
    await this.commitIndex(restored.index, "");
    return { matched: restored.matched, unmatched: restored.unmatched };
  }

  /** Virtual classification edits never touch disk directories or originals. */
  private async editFolder(action: "rename-folder" | "delete-folder" | "reorder-folders", payload: any): Promise<void> {
    if (this.disposed || !this.canRead() || this.editingFolders || this.loading) throw new Error("目录正在读取或保存，请稍候再操作。");
    this.editingFolders = true;
    const selectedPath = this.activePath;
    try {
      const path = String(payload?.path || "");
      const name = action === "rename-folder" ? this.validPackName(payload?.name) : "";
      if (action === "rename-folder" && !name) throw new Error("名称不能为空，最长50字，且不能包含路径或特殊字符。");
      if (this.isUsingIndexedDb) {
        if (action === "rename-folder" && name === "全部") throw new Error("“全部”为保留名称，请换一个分类名称。");
        if (action === "reorder-folders") {
          if (!Array.isArray(payload?.paths) || payload.parentPath !== "") throw new Error("只能调整同级分类顺序");
          await reorderStickerGroups(payload.paths, this.ownerId);
        } else {
          if (!path || path === "默认") throw new Error("全部表情和默认分类不能删除或重命名");
          if (!(await getStickerGroups()).includes(path)) throw new Error("分类已不存在，请重新打开模块核对。");
          if (action === "rename-folder") await renameStickerGroup(path, name, this.ownerId);
          else await deleteStickerGroup(path, this.ownerId);
        }
        if (this.disposed) return;
        const nextPath = action !== "reorder-folders" && selectedPath === path
          ? (action === "rename-folder" ? name : "默认") : selectedPath;
        if (this.canRead()) await this.loadIndexedDbLibrary(nextPath);
        return;
      }
      if (!this.libraryIndex) throw new Error("图库索引尚未读取，请重新打开模块。");
      const normalized = action === "rename-folder" ? { ...payload, name } : payload;
      const next = editVirtualGroup(this.libraryIndex, action, normalized);
      let nextPath = selectedPath;
      if (action === "delete-folder" && (selectedPath === path || selectedPath.startsWith(`${path}/`))) {
        nextPath = path.includes("/") ? path.slice(0, path.lastIndexOf("/")) : "";
      }
      await this.commitIndex(next, nextPath);
    } finally { this.editingFolders = false; }
  }

  public async saveFilesToIndexedDb(files: File[]): Promise<void> {
    const group = this.activePath || "默认";
    if (!this.isUsingIndexedDb) throw new Error("已配置本地图库，未转存到内置库");
    if (files.length > 50) throw new Error("一次最多导入50张，请分批选择");
    for (const f of files) {
      await this.detectImage(f);
      await saveSticker(f, f.name, group, this.ownerId);
    }
    await this.loadIndexedDbLibrary(group);
  }

  public async saveUrlToIndexedDb(url: string): Promise<void> {
    if (!this.isUsingIndexedDb) throw new Error("已配置本地图库，未转存到内置库");
    const res = await fetch(url.startsWith("data:image/") ? url : this.assertPublicHttps(url), { credentials: "omit", redirect: "error", signal: AbortSignal.timeout(15000) });
    if (!res.ok) throw new Error("图片读取失败");
    const blob = await res.blob();
    await this.detectImage(blob);
    const group = this.activePath || "默认";
    const ext = blob.type.split("/")[1] || "png";
    const name = `web_${Date.now()}.${ext}`;
    await saveSticker(blob, name, group, this.ownerId);
    await this.loadIndexedDbLibrary(group);
  }
}

export const stickersService = new StickersService(stickerBoardController, () => !document.hidden, withStickersWrite, 120);
