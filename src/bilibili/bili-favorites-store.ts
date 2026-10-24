import { reactive } from "vue";
import { biliTheaterController } from "./theater-store";
import { biliMiniPlayerController } from "./mini-player-store";
import { biliRadioController } from "./radio-store";
import { subtitleModalController } from "./subtitle-modal-store";
import {
  bilibiliService,
  type BiliFolderData,
  type BiliVideoData,
  type BiliFavTreeNode,
  type BiliOrganizerFolderView
} from "../services/bilibili.service";
import { appDialog } from "../core/app-dialog.store";

export interface BiliVideoItem {
  bvid: string;
  title: string;
  cover: string;
  author: string;
  playCount: string;
  duration: string;
  url: string;
}

export interface BiliFolderItem {
  id: string;
  title: string;
  count: number;
  isCustom?: boolean;
}

export interface BiliTreeNode {
  id: string;
  name: string;
  type: "folder" | "fav";
  count?: number;
  depth?: number;
  collapsed?: boolean;
  children?: BiliTreeNode[];
}

export { type BiliOrganizerFolderView };

export interface BiliOrganizerVideoView {
  id: string;
  aid: string;
  bvid: string;
  title: string;
  cover: string;
  url: string;
  duration: string;
  playCount: string;
  author: string;
  authorMid: string;
  authorFace: string;
  favoriteDate: string;
  intro?: string;
  selected: boolean;
  writable: boolean;
}

export interface BiliCachedVideoView {
  id: string;
  bvid: string;
  aid: string;
  title: string;
  cover: string;
  fileName: string;
  directoryId?: string;
  sizeText: string;
  cachedDate: string;
}

export interface BiliFollowingGroupView {
  id: string;
  name: string;
  count: number;
  active: boolean;
  child: boolean;
}

export interface BiliFollowingMemberView {
  id: string;
  name: string;
  face: string;
  sign: string;
  active: boolean;
}

export interface BiliSubscriptionChannelView {
  id: string;
  name: string;
  active: boolean;
}

export interface BiliSubscriptionVideoView {
  bvid: string;
  title: string;
  duration: string;
  active: boolean;
}

export interface BiliSubscriptionChapterView {
  title: string;
  from: number;
  to: number;
  fromText: string;
  toText: string;
  paragraphs: string[];
  paragraphCues?: BiliSubscriptionCueView[][];
  cues?: BiliSubscriptionCueView[];
}

export interface BiliSubscriptionCueView {
  index: number;
  from: number;
  to: number;
  timeText: string;
  content: string;
}

export interface BiliOrganizerView {
  mode: "organizer" | "cache" | "recommendations" | "following" | "subscription" | "radio";
  loading: boolean;
  error: string;
  folderTitle: string;
  folderSubtitle: string;
  folderCover: string;
  heroTrackTitle: string;
  heroLyricText: string;
  heroLyricStatus: string;
  folders: BiliOrganizerFolderView[];
  videos: BiliOrganizerVideoView[];
  sort: "fav_time" | "view" | "pubtime";
  query: string;
  page: number;
  totalPages: number;
  totalItems: number;
  batchMode: boolean;
  selectedCount: number;
  isTargetPickMode?: boolean;
  movingVideoId?: string;
  cacheLoading: boolean;
  cachedVideos: BiliCachedVideoView[];
  specialLoading: boolean;
  specialError: string;
  specialTitle: string;
  specialSubtitle: string;
  specialBadge: string;
  specialPage: number;
  specialVideos: BiliOrganizerVideoView[];
  followingGroups: BiliFollowingGroupView[];
  followingMembers: BiliFollowingMemberView[];
  followingHasMore: boolean;
  subscriptionLoading: boolean;
  subscriptionError: string;
  subscriptionTitle: string;
  subscriptionSubtitle: string;
  subscriptionScriptMode: "newspaper" | "lyrics";
  subscriptionChannels: BiliSubscriptionChannelView[];
  subscriptionVideos: BiliSubscriptionVideoView[];
  subscriptionChapters: BiliSubscriptionChapterView[];
  subscriptionCues: BiliSubscriptionCueView[];
  subscriptionDescription: string[];
  showFullDescInRightPanel: boolean;
  subscriptionCurrent: {
    bvid: string;
    aid: string;
    title: string;
    author: string;
    cover: string;
    description: string;
    playCount: string;
    danmakuCount: string;
    duration: string;
  } | null;
}

export interface BiliFavoritesState {
  mounted: boolean;
  currentTab: "organizer" | "sub-video" | "radio";
  searchQuery: string;
  sortMode: "recent" | "play" | "pub";
  folders: BiliFolderItem[];
  treeNodes: BiliTreeNode[];
  collapsedGroups: string[];
  activeFolderId: string;
  videos: BiliVideoItem[];
  radioQueue: Array<{ bvid: string; title: string; author: string; cover?: string; duration?: number }>;
  radioFolders: Array<{ id: number; title: string; count: number }>;
  radioVideos: BiliFavoritesState["radioQueue"];
  radioActiveFolderId: number;
  radioError: string;
  radioLoading: boolean;
  radioSeries: Array<{ id: string; name: string; count: number; items: BiliFavoritesState["radioQueue"] }>;
  radioSeriesName: string;
  isLoading: boolean;
  organizer: BiliOrganizerView;
}

export const biliFavoritesState = reactive<BiliFavoritesState>({
  mounted: false,
  currentTab: "organizer",
  searchQuery: "",
  sortMode: "recent",
  folders: [],
  treeNodes: [],
  collapsedGroups: [],
  activeFolderId: "",
  videos: [],
  radioQueue: [],
  radioFolders: [],
  radioVideos: [],
  radioActiveFolderId: 0,
  radioError: "",
  radioLoading: false,
  radioSeries: [],
  radioSeriesName: "",
  isLoading: false,
  organizer: {
    mode: "organizer",
    loading: false,
    error: "",
    folderTitle: "收藏夹",
    folderSubtitle: "选择左侧收藏夹以浏览内容",
    folderCover: "",
    heroTrackTitle: "暂无播放视频",
    heroLyricText: "点击视频播放，实时台词在此居中呈现",
    heroLyricStatus: "支持 B站 收藏夹与订阅视频",
    folders: [],
    videos: [],
    sort: "fav_time",
    query: "",
    page: 1,
    totalPages: 1,
    totalItems: 0,
    batchMode: false,
    selectedCount: 0,
    isTargetPickMode: false,
    movingVideoId: "",
    cacheLoading: false,
    cachedVideos: [],
    specialLoading: false,
    specialError: "",
    specialTitle: "",
    specialSubtitle: "",
    specialBadge: "",
    specialPage: 1,
    specialVideos: [],
    followingGroups: [],
    followingMembers: [],
    followingHasMore: false,
    subscriptionLoading: false,
    subscriptionError: "",
    subscriptionTitle: "订阅视频",
    subscriptionSubtitle: "AI 逐字字幕稿 · 点击台词即刻跳转播放",
    subscriptionScriptMode: "newspaper",
    subscriptionChannels: [],
    subscriptionVideos: [],
    subscriptionChapters: [],
    subscriptionCues: [],
    subscriptionDescription: [],
    showFullDescInRightPanel: false,
    subscriptionCurrent: null
  }
});

export type BiliFavoritesAction =
  | "switch-tab"
  | "select-folder"
  | "play-video"
  | "open-up-manager"
  | "sort-change"
  | "search"
  | "radio-play"
  | "radio-shuffle"
  | "radio-add"
  | "radio-remove"
  | "radio-clear"
  | "radio-save"
  | "toggle-tree-group"
  | "toggle-folder-group"
  | "move-folder-node"
  | "create-bili-folder"
  | "create-local-group"
  | "open-sub-video"
  | "open-cache"
  | "open-following"
  | "open-recommendations"
  | "open-radio"
  | "radio-refresh"
  | "radio-select-folder"
  | "radio-load-series"
  | "radio-play-series"
  | "radio-delete-series"
  | "radio-rename-series"
  | "radio-share-series"
  | "radio-new-series"
  | "radio-play-index"
  | "manage-up-groups"
  | "organizer-refresh"
  | "subscription-toggle-desc-panel"
  | "organizer-hero-seek"
  | "organizer-sort"
  | "organizer-search"
  | "organizer-page"
  | "organizer-batch-toggle"
  | "organizer-batch-select"
  | "organizer-batch-all"
  | "organizer-batch-move"
  | "organizer-batch-cache"
  | "organizer-batch-unfavorite"
  | "organizer-play-video"
  | "organizer-video-action"
  | "organizer-open"
  | "cache-open-settings"
  | "cache-play"
  | "cache-open-web"
  | "cache-delete"
  | "recommendations-refresh"
  | "recommendations-page"
  | "special-play-page"
  | "special-play-video"
  | "special-video-action"
  | "following-refresh"
  | "following-group"
  | "following-member"
  | "following-page"
  | "following-manage-groups"
  | "following-preview-member"
  | "subscription-channel"
  | "subscription-video"
  | "subscription-add-channel"
  | "subscription-load-more"
  | "subscription-copy-script"
  | "subscription-refresh"
  | "subscription-script-mode"
  | "subscription-seek"
  | "subscription-copy-description"
  | "subscription-open-player"
  | "undo-delete"
  | "organizer-cancel-move-target"
  | "organizer-folder-drop";

export type BiliFavoritesActionHandler = (action: BiliFavoritesAction, payload?: any) => void;

const actionHandlers = new Set<BiliFavoritesActionHandler>();

let cachedRawFolders: BiliFolderData[] = [];
let currentTree: BiliFavTreeNode = { id: "root", type: "folder", children: [] };
let cachedCollapsedGroups = new Set<string>();

function notifyToast(text: string, opts?: any): void {
  const g = globalThis as any;
  if (typeof g.showBiliToast === "function") {
    g.showBiliToast(text, 3200, opts);
  } else if (typeof g.showWindowsToast === "function") {
    g.showWindowsToast({
      id: `bili_${Date.now()}`,
      appName: "哔哩哔哩",
      icon: "assets/bilibili.svg",
      title: "哔哩哔哩",
      message: text,
      duration: 3200
    });
  } else {
    console.log(`[BiliFavorites] ${text}`);
  }
}

export function resolveBiliVideoFullUrl(video: any): string {
  if (!video) return "https://www.bilibili.com";

  // 1. 如果已包含合法的完整 http/https 链接
  if (typeof video.url === "string" && /^https?:\/\//i.test(video.url.trim())) {
    return video.url.trim();
  }
  if (typeof video.link === "string" && /^https?:\/\//i.test(video.link.trim())) {
    return video.link.trim();
  }

  // 2. 提取 BV 号
  let bvid = "";
  if (typeof video.bvid === "string" && video.bvid.startsWith("BV")) {
    bvid = video.bvid;
  } else if (typeof video.id === "string" && video.id.startsWith("BV")) {
    bvid = video.id;
  } else if (typeof video.url === "string" && video.url.includes("BV")) {
    const match = video.url.match(/BV[a-zA-Z0-9]+/);
    if (match) bvid = match[0];
  }

  if (bvid) {
    return `https://www.bilibili.com/video/${bvid}`;
  }

  // 3. 提取 AV 号 (aid / id)
  const rawId = String(video.aid || video.id || "");
  const numId = rawId.replace(/\D/g, "");
  if (numId) {
    return `https://www.bilibili.com/video/av${numId}`;
  }

  return "https://www.bilibili.com";
}

function mapBiliVideoToView(item: BiliVideoData): BiliOrganizerVideoView {
  const durSec = item.duration || 0;
  const m = Math.floor(durSec / 60);
  const s = String(durSec % 60).padStart(2, "0");
  const durStr = `${m}:${s}`;
  const playCount = item.cnt_info?.play
    ? item.cnt_info.play > 10000
      ? `${(item.cnt_info.play / 10000).toFixed(1)}万`
      : String(item.cnt_info.play)
    : "0";

  const videoUrl = item.bvid
    ? `https://www.bilibili.com/video/${item.bvid}`
    : (item.id ? `https://www.bilibili.com/video/av${item.id}` : (item.link || "#"));

  return {
    id: String(item.id || item.bvid),
    aid: String(item.id || ""),
    bvid: item.bvid,
    title: item.title,
    cover: item.cover,
    url: videoUrl,
    duration: durStr,
    playCount,
    author: item.upper?.name || "UP主",
    authorMid: String(item.upper?.mid || ""),
    authorFace: item.upper?.face || "",
    favoriteDate: item.fav_time ? new Date(item.fav_time * 1000).toLocaleDateString() : "",
    intro: item.intro || "",
    selected: false,
    writable: true
  };
}

export async function loadFolderVideos(
  folderId: string | number,
  page = 1,
  sort: "fav_time" | "view" | "pubtime" = "fav_time",
  query = ""
): Promise<void> {
  const org = biliFavoritesState.organizer;
  org.loading = true;
  org.error = "";

  const orderMap: Record<string, string> = {
    fav_time: "mtime",
    view: "click",
    pubtime: "pubtime"
  };
  const order = orderMap[sort] || "mtime";

  try {
    const res = await bilibiliService.getFolderVideos(folderId, page, 24, order, query);
    org.videos = res.medias.map(mapBiliVideoToView);
    org.page = page;
    org.totalItems = res.total;
    org.totalPages = Math.max(1, Math.ceil(res.total / 24));
    org.sort = sort;
    org.query = query;

    const matchedFolder = cachedRawFolders.find((f) => String(f.id || f.fid) === String(folderId));
    org.folderTitle = matchedFolder?.title || res.info?.title || "收藏夹";
    org.folderSubtitle = `共 ${res.total} 个内容`;
  } catch (err: any) {
    org.error = err.message || "加载视频列表失败";
    org.folderSubtitle = "加载失败，请重试";
  } finally {
    org.loading = false;
  }
}

export async function loadOrganizer(forceReload = false): Promise<void> {
  const org = biliFavoritesState.organizer;
  org.loading = true;
  org.error = "";

  try {
    const user = await bilibiliService.getUserNav();
    if (!user.isLogin) {
      org.error = "未登录 B站";
      org.folderSubtitle = "未登录 B站，请先登录";
      org.loading = false;
      return;
    }

    const [created, collectedRes] = await Promise.all([
      bilibiliService.getCreatedFolders(user.mid),
      bilibiliService.getCollectedFolders(1, 50, user.mid).catch(() => ({ count: 0, list: [] }))
    ]);
    const collected = collectedRes.list || [];
    const others = bilibiliService.getOtherFolders();

    cachedRawFolders = [...created, ...collected, ...others];

    const tree = await bilibiliService.treeManager.loadTree();
    const changed = bilibiliService.treeManager.syncTreeWithFolders(tree, created);
    if (changed || forceReload) {
      await bilibiliService.treeManager.saveTree(tree);
    }
    currentTree = tree;

    cachedCollapsedGroups = await bilibiliService.treeManager.loadCollapsedGroups();
    biliFavoritesState.collapsedGroups = Array.from(cachedCollapsedGroups);

    // 默认高亮文件夹选择
    let activeId = biliFavoritesState.activeFolderId;
    if (!activeId || !cachedRawFolders.some((f) => String(f.id || f.fid) === String(activeId))) {
      const defaultFolder = created.find((f) => /默认/.test(f.title)) || created[0] || cachedRawFolders[0];
      activeId = defaultFolder ? String(defaultFolder.id || defaultFolder.fid) : "";
      biliFavoritesState.activeFolderId = activeId;
    }

    org.folders = bilibiliService.treeManager.flattenTree(
      currentTree,
      cachedRawFolders,
      cachedCollapsedGroups,
      activeId
    );

    if (activeId) {
      await loadFolderVideos(activeId, 1, org.sort, org.query);
    } else {
      org.folderSubtitle = "暂无可用收藏夹";
    }
  } catch (err: any) {
    org.error = err.message || "读取 B站 收藏夹失败";
    org.folderSubtitle = "读取失败，请检查网络或重试";
  } finally {
    org.loading = false;
  }
}

export const biliFavoritesController = {
  get active() {
    return biliFavoritesState.mounted;
  },
  get state() {
    return biliFavoritesState;
  },
  updateState(partial: Partial<BiliFavoritesState>) {
    Object.assign(biliFavoritesState, partial);
  },
  updateOrganizer(partial: Partial<BiliOrganizerView>) {
    Object.assign(biliFavoritesState.organizer, partial);
  },
  setMounted(mounted: boolean) {
    biliFavoritesState.mounted = mounted;
    if (mounted) {
      void loadOrganizer();
    }
  },
  loadOrganizer,
  loadFolderVideos,

  switchTab(tab: BiliFavoritesState["currentTab"]) {
    biliFavoritesState.currentTab = tab;
    this.dispatch("switch-tab", tab);
  },

  async selectFolder(id: string | number) {
    const idStr = String(id);
    const org = biliFavoritesState.organizer;

    // 目标选择模式处理 (移动单个视频或批量移动)
    if (org.isTargetPickMode) {
      const targetFolder = cachedRawFolders.find((f) => String(f.id || f.fid) === idStr);
      if (!targetFolder || targetFolder.isCollected || targetFolder.isOther) {
        notifyToast("无法移动到该分类，请选择您自建的有效收藏夹", { isError: true });
        return;
      }
      if (idStr === biliFavoritesState.activeFolderId) {
        notifyToast("所选视频已在当前收藏夹中，请选择其他收藏夹", { isError: true });
        return;
      }

      org.isTargetPickMode = false;
      const movingId = org.movingVideoId;
      org.movingVideoId = "";

      if (movingId) {
        // 单个移动
        notifyToast(`正在移动视频至「${targetFolder.title}」…`);
        const res = await bilibiliService.moveVideo(biliFavoritesState.activeFolderId, idStr, movingId);
        if (res.ok) {
          notifyToast(`已移动至「${targetFolder.title}」`);
          await loadFolderVideos(biliFavoritesState.activeFolderId, org.page, org.sort, org.query);
        } else {
          notifyToast(`移动失败：${res.reason || "未知错误"}`, { isError: true });
        }
      } else if (org.batchMode) {
        // 批量移动
        const selected = org.videos.filter((v) => v.selected);
        if (!selected.length) return;
        const aids = selected.map((v) => v.aid || v.id);
        notifyToast(`正在批量移动 ${aids.length} 个视频至「${targetFolder.title}」…`);
        const res = await bilibiliService.moveVideo(biliFavoritesState.activeFolderId, idStr, aids);
        if (res.ok) {
          notifyToast(`已将 ${aids.length} 个视频移动至「${targetFolder.title}」`);
          org.videos.forEach((v) => (v.selected = false));
          org.selectedCount = 0;
          await loadFolderVideos(biliFavoritesState.activeFolderId, 1, org.sort, org.query);
        } else {
          notifyToast(`批量移动失败：${res.reason || "未知错误"}`, { isError: true });
        }
      }
      return;
    }

    biliFavoritesState.activeFolderId = idStr;
    org.folders.forEach((f) => {
      f.selected = f.id === idStr;
    });
    org.mode = "organizer";
    await loadFolderVideos(idStr, 1, org.sort, "");
  },

  async toggleFolderGroup(groupId: string) {
    const id = String(groupId);
    if (cachedCollapsedGroups.has(id)) {
      cachedCollapsedGroups.delete(id);
    } else {
      cachedCollapsedGroups.add(id);
    }
    biliFavoritesState.collapsedGroups = Array.from(cachedCollapsedGroups);
    await bilibiliService.treeManager.saveCollapsedGroups(cachedCollapsedGroups);
    biliFavoritesState.organizer.folders = bilibiliService.treeManager.flattenTree(
      currentTree,
      cachedRawFolders,
      cachedCollapsedGroups,
      biliFavoritesState.activeFolderId
    );
  },

  async moveFolderNode(sourceId: string, targetId: string, mode: "before" | "after" | "into") {
    const ok = bilibiliService.treeManager.moveNode(currentTree, sourceId, targetId, mode);
    if (ok) {
      await bilibiliService.treeManager.saveTree(currentTree);
      biliFavoritesState.organizer.folders = bilibiliService.treeManager.flattenTree(
        currentTree,
        cachedRawFolders,
        cachedCollapsedGroups,
        biliFavoritesState.activeFolderId
      );
      notifyToast("已更新收藏夹排序");
    }
  },

  async openCreateDialog(kind: "bili" | "plugin") {
    const g = globalThis as any;
    const dialogController = g.LogicWeaverBiliOrganizerDialogs;
    if (dialogController?.openCreate) {
      dialogController.openCreate(kind, async ({ name, privacy }: { name: string; privacy: number }) => {
        dialogController.updateCreate({ status: kind === "bili" ? "正在连接 B站…" : "正在建立本地分组…", error: false });
        if (kind === "bili") {
          const res = await bilibiliService.createRemoteFolder(name, Number(privacy || 0));
          if (!res.ok) {
            dialogController.updateCreate({ status: res.reason || "创建失败", error: true });
            return;
          }
          dialogController.closeCreate();
          await loadOrganizer(true);
          notifyToast(`已成功创建 B站收藏夹「${name}」`);
        } else {
          const group = bilibiliService.treeManager.createGroupNode(name);
          currentTree.children = currentTree.children || [];
          currentTree.children.push(group);
          await bilibiliService.treeManager.saveTree(currentTree);
          dialogController.closeCreate();
          biliFavoritesState.organizer.folders = bilibiliService.treeManager.flattenTree(
            currentTree,
            cachedRawFolders,
            cachedCollapsedGroups,
            biliFavoritesState.activeFolderId
          );
          notifyToast(`已建立本地分组「${name}」`);
        }
      });
    } else {
      const name = (await appDialog.prompt({
        title: kind === "bili" ? "新建 B站收藏夹" : "新建本地分组",
        message: kind === "bili" ? "请输入新 B站收藏夹名称：" : "请输入新本地分组名称：",
        placeholder: "名称…"
      }))?.trim();
      if (!name) return;
      if (kind === "bili") {
        const res = await bilibiliService.createRemoteFolder(name);
        if (res.ok) {
          await loadOrganizer(true);
          notifyToast(`已成功创建「${name}」`);
        } else {
          notifyToast(`创建失败：${res.reason}`, { isError: true });
        }
      } else {
        const group = bilibiliService.treeManager.createGroupNode(name);
        currentTree.children = currentTree.children || [];
        currentTree.children.push(group);
        await bilibiliService.treeManager.saveTree(currentTree);
        biliFavoritesState.organizer.folders = bilibiliService.treeManager.flattenTree(
          currentTree,
          cachedRawFolders,
          cachedCollapsedGroups,
          biliFavoritesState.activeFolderId
        );
        notifyToast(`已建立本地分组「${name}」`);
      }
    }
  },

  async handleVideoAction(target: any, action: string) {
    const org = biliFavoritesState.organizer;
    let video: any = null;

    if (target && typeof target === "object" && (target.bvid || target.aid || target.id)) {
      video = target;
    } else {
      const id = String(target || "");
      video = org.videos.find((v) => String(v.id) === id || String(v.bvid) === id || String(v.aid) === id)
        || org.specialVideos.find((v) => String(v.id) === id || String(v.bvid) === id || String(v.aid) === id)
        || org.cachedVideos.find((v) => String(v.id) === id || String(v.bvid) === id || String(v.aid) === id);

      if (!video && (id.startsWith("BV") || /^\d+$/.test(id))) {
        video = {
          id,
          bvid: id.startsWith("BV") ? id : "",
          aid: /^\d+$/.test(id) ? id : "",
          title: id,
          url: `https://www.bilibili.com/video/${id}`
        };
      }
    }
    if (!video) return;

    const bvid = video.bvid || (String(video.id || "").startsWith("BV") ? video.id : "");
    const aid = video.aid || video.id;
    const fullVideoUrl = resolveBiliVideoFullUrl(video);
    const targetUrl = fullVideoUrl || video.url;
    const g = globalThis as any;

    if (action === "play") {
      // 唤起精致原生的 B站迷你播放器 (BiliMiniPlayer)
      if (bvid || video.aid) {
        biliMiniPlayerController.openVideo({
          bvid,
          aid: String(aid || ""),
          title: video.title || bvid,
          author: video.author ? `${video.author}` : "",
          url: targetUrl,
          cover: video.cover
        });
      } else if (targetUrl) {
        if (typeof chrome !== "undefined" && chrome?.tabs?.create) {
          chrome.tabs.create({ url: targetUrl, active: true });
        } else {
          window.open(targetUrl, "_blank");
        }
      }
    } else if (action === "open") {
      // 准确跳转到 B站视频真实网页，绝不触发极速搜索
      if (typeof chrome !== "undefined" && chrome?.tabs?.create) {
        chrome.tabs.create({ url: fullVideoUrl, active: true });
      } else {
        window.open(fullVideoUrl, "_blank");
      }
    } else if (action === "copy-link") {
      try {
        await navigator.clipboard.writeText(fullVideoUrl);
        notifyToast(`已复制视频链接: ${fullVideoUrl}`);
      } catch {
        notifyToast("复制链接失败", { isError: true });
      }
    } else if (action === "move") {
      if (org.isTargetPickMode && org.movingVideoId === video.aid) {
        org.isTargetPickMode = false;
        org.movingVideoId = "";
        notifyToast("已取消选择目标收藏夹");
      } else {
        org.isTargetPickMode = true;
        org.movingVideoId = video.aid;
        notifyToast(`请点击左侧收藏夹，将《${video.title}》移动过去（按 Esc 取消）`, {
          title: "选择目标收藏夹",
          subtitle: `点击左侧目标以移动《${video.title}》`
        });
      }
    } else if (action === "delete") {
      const aid = video.aid || video.id;
      const fid = biliFavoritesState.activeFolderId;
      const res = await bilibiliService.deleteVideo(fid, aid);
      if (res.ok) {
        notifyToast(`已取消收藏《${video.title}》`, {
          title: "已取消收藏",
          actionLabel: "撤销还原",
          onClick: async () => {
            notifyToast(`正在还原《${video.title}》…`);
            const restore = await bilibiliService.addVideoToFavorite(fid, aid);
            if (restore.ok) {
              notifyToast(`已还原《${video.title}》`);
              await loadFolderVideos(fid, org.page, org.sort, org.query);
            } else {
              notifyToast(`还原失败：${restore.reason || "未知错误"}`, { isError: true });
            }
          }
        });
        await loadFolderVideos(fid, org.page, org.sort, org.query);
      } else {
        notifyToast(`取消收藏失败：${res.reason || "未知错误"}`, { isError: true });
      }
    } else if (action === "subtitle") {
      const realBvid = bvid || (String(video.id || "").startsWith("BV") ? video.id : "");
      if (realBvid || video.aid) {
        void subtitleModalController.open({
          bvid: realBvid || String(video.aid || video.id || ""),
          cid: video.cid,
          title: video.title || realBvid
        });
      } else {
        notifyToast("该视频暂无字幕信息", { isError: true });
      }
    } else if (action === "cache") {
      const { cacheBiliVideo } = await import("./cache.service");
      await cacheBiliVideo({ bvid: video.bvid, aid: video.aid, title: video.title, cover: video.cover });
    } else if (action === "collect-inbox") {
      const inboxFolder = cachedRawFolders.find((f) => /收集箱|默认|Inbox/i.test(f.title)) ||
        cachedRawFolders.find((f) => !f.isCollected && !f.isOther) ||
        cachedRawFolders[0];
      if (!inboxFolder) {
        notifyToast("未找到可用的收藏夹/收集箱", { isError: true });
        return;
      }
      const targetAid = video.aid || video.id;
      notifyToast(`正在将《${video.title}》添加到「${inboxFolder.title}」…`);
      const res = await bilibiliService.addVideoToFavorite(inboxFolder.id, targetAid);
      if (res.ok) {
        notifyToast(`✓ 已成功添加到「${inboxFolder.title}」`);
      } else {
        notifyToast(`添加失败：${res.reason || "未知错误"}`, { isError: true });
      }
    }
  },

  onAction(handler: BiliFavoritesActionHandler): () => void {
    actionHandlers.add(handler);
    return () => {
      actionHandlers.delete(handler);
    };
  },

  dispatch(action: BiliFavoritesAction, payload?: any) {
    const org = biliFavoritesState.organizer;

    // 内部 TypeScript 直连派发
    switch (action) {
      case "select-folder":
        void this.selectFolder(payload?.id ?? payload);
        break;
      case "toggle-folder-group":
        void this.toggleFolderGroup(payload?.id ?? payload);
        break;
      case "move-folder-node":
        if (payload?.sourceId && payload?.targetId) {
          void this.moveFolderNode(payload.sourceId, payload.targetId, payload.mode || "before");
        }
        break;
      case "create-bili-folder":
        void this.openCreateDialog("bili");
        break;
      case "create-local-group":
        void this.openCreateDialog("plugin");
        break;
      case "organizer-refresh":
        void loadOrganizer(true);
        break;
      case "subscription-toggle-desc-panel":
        org.showFullDescInRightPanel = !org.showFullDescInRightPanel;
        break;
      case "organizer-open":
        org.mode = "organizer";
        org.isTargetPickMode = false;
        org.movingVideoId = "";
        org.batchMode = false;
        if (!org.folders.length) void loadOrganizer();
        break;
      case "open-radio":
        org.mode = "radio";
        org.isTargetPickMode = false;
        org.movingVideoId = "";
        org.batchMode = false;
        void biliRadioController.init();
        break;
      case "radio-refresh":
        void biliRadioController.refresh();
        break;
      case "radio-select-folder":
        void biliRadioController.selectFolder(Number(payload));
        break;
      case "radio-add":
        biliRadioController.add(payload);
        break;
      case "radio-remove":
        biliRadioController.remove(Number(payload?.index));
        break;
      case "radio-clear":
        biliRadioController.clear();
        break;
      case "radio-save":
        void biliRadioController.save(String(payload?.name || ""));
        break;
      case "radio-load-series":
        void biliRadioController.loadSeries(String(payload?.id ?? payload));
        break;
      case "radio-play-series":
        if (typeof payload === "object" && payload !== null) {
          void biliRadioController.playSeries(String(payload.id || ""), Number(payload.startIndex || 0));
        } else {
          void biliRadioController.playSeries(String(payload));
        }
        break;
      case "radio-delete-series":
        void biliRadioController.deleteSeries(String(payload));
        break;
      case "radio-rename-series": {
        const p = payload as { id: string; name: string };
        if (p?.id && p?.name) {
          void biliRadioController.renameSeries(p.id, p.name);
        }
        break;
      }
      case "radio-play-index":
        biliRadioController.playAt(Number(payload));
        break;
      case "radio-play":
        biliRadioController.play(false, typeof payload === "number" ? payload : 0);
        break;
      case "radio-shuffle":
        biliRadioController.play(true);
        break;
      case "organizer-sort":
        if (["fav_time", "view", "pubtime"].includes(payload)) {
          void loadFolderVideos(biliFavoritesState.activeFolderId, 1, payload, org.query);
        }
        break;
      case "organizer-search":
        void loadFolderVideos(biliFavoritesState.activeFolderId, 1, org.sort, String(payload || "").trim());
        break;
      case "organizer-page": {
        const p = Number(payload);
        if (Number.isFinite(p) && p >= 1) {
          void loadFolderVideos(biliFavoritesState.activeFolderId, p, org.sort, org.query);
        }
        break;
      }
      case "organizer-batch-toggle":
        org.batchMode = !org.batchMode;
        if (!org.batchMode) {
          org.videos.forEach((v) => (v.selected = false));
          org.selectedCount = 0;
        }
        break;
      case "organizer-batch-select": {
        const vid = String(payload || "");
        const v = org.videos.find((item) => item.id === vid || item.bvid === vid);
        if (v) {
          v.selected = !v.selected;
          org.selectedCount = org.videos.filter((item) => item.selected).length;
        }
        break;
      }
      case "organizer-batch-all": {
        const allSel = org.videos.length > 0 && org.videos.every((item) => item.selected);
        org.videos.forEach((item) => (item.selected = !allSel));
        org.selectedCount = allSel ? 0 : org.videos.length;
        break;
      }
      case "organizer-batch-move": {
        const count = org.videos.filter((v) => v.selected).length;
        if (!count) {
          notifyToast("请先选择要移动的视频", { isError: true });
          return;
        }
        org.isTargetPickMode = true;
        notifyToast(`请点击左侧目标收藏夹，将 ${count} 个视频移动过去`);
        break;
      }
      case "organizer-batch-unfavorite": {
        const selected = org.videos.filter((v) => v.selected);
        if (!selected.length) {
          notifyToast("请先选择要取消收藏的视频", { isError: true });
          return;
        }
        void (async () => {
          const ok = await appDialog.confirm({
            title: "批量取消收藏",
            message: `确定从当前收藏夹移除选中的 ${selected.length} 个视频吗？`,
            danger: true
          });
          if (ok) {
            const fid = biliFavoritesState.activeFolderId;
            const aids = selected.map((v) => v.aid || v.id);
            notifyToast(`正在批量移除 ${aids.length} 个视频…`);
            let success = 0;
            for (const aid of aids) {
              const r = await bilibiliService.deleteVideo(fid, aid);
              if (r.ok) success++;
            }
            notifyToast(`已移除 ${success}/${aids.length} 个视频`);
            org.batchMode = false;
            org.selectedCount = 0;
            await loadFolderVideos(fid, org.page, org.sort, org.query);
          }
        })();
        break;
      }
      case "organizer-play-video":
      case "special-play-video": {
        void this.handleVideoAction(payload, "play");
        break;
      }
      case "organizer-video-action":
      case "special-video-action":
        if (payload?.action) {
          void this.handleVideoAction(payload.video || payload.id, payload.action);
        }
        break;
      case "organizer-cancel-move-target":
        org.isTargetPickMode = false;
        org.movingVideoId = "";
        notifyToast("已取消选择目标收藏夹");
        break;
      case "open-up-manager":
      case "manage-up-groups": {
        const g = globalThis as any;
        if (typeof g.openBiliUpGroupManagerDialog === "function") {
          g.openBiliUpGroupManagerDialog();
        } else if (g.LogicWeaverBiliUpGroupManager?.open) {
          g.LogicWeaverBiliUpGroupManager.open();
        }
        break;
      }
      default:
        break;
    }

    // 广播通知注册的监听器 (如电台、订阅面板等外部组件)
    for (const handler of actionHandlers) {
      try {
        handler(action, payload);
      } catch (err) {
        console.error(`[BiliFavorites] Action error:`, err);
      }
    }
  }
};

export const initBiliFavoritesService = loadOrganizer;
