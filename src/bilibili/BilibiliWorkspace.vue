<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { biliFavoritesController, biliFavoritesState, favoriteGridColumns, type BiliOrganizerFolderView, type BiliOrganizerVideoView } from "./bili-favorites-store";
import { biliMiniPlayerController, biliMiniPlayerState } from "./mini-player-store";
import { subtitleModalController } from "./subtitle-modal-store";
import { fullscreenCardState } from "../core/fullscreen-cards.store";
import { useCardActivity } from "../core/useCardActivity";
import BiliSubscriptionPlayer from "./BiliSubscriptionPlayer.vue";
import BiliOrganizerDialogs from "./BiliOrganizerDialogs.vue";
import BiliCacheSettingsView from "./BiliCacheSettingsView.vue";
import BiliUpGroupManager from "./BiliUpGroupManager.vue";
import { radioTapeController, radioTapeState } from "./radio-tape-store";
import { biliRadioPlayer } from "./radio-player";
import { biliRadioController, LIKED_SERIES_ID, LIKED_SERIES_NAME } from "./radio-store";
import { parseDurationToSeconds } from "./channel-format";
import { onFollowingGroupsWheel } from "./horizontal-wheel";
import { biliMessagePanelController, biliMessagePanelState } from "./message-panel-store";
import { bilibiliChannelService } from "../services/bilibili-channel.service";
import { useContextMenu } from "../sdk/interactions";
import { notifications } from "../sdk/notifications";
import { appDialog } from "../core/app-dialog.store";
import { t } from "../i18n";
import { workspaceSearchRequests, consumeWorkspaceSearch } from "../search/workspace-search";
import { useWorkspaceWallpaper } from "../wallpaper/workspace-wallpaper";
import WorkspaceWallpaperLayer from "../wallpaper/WorkspaceWallpaperLayer.vue";

const { style: biliWallpaperStyle, media: biliWallpaperMedia } = useWorkspaceWallpaper('bilibili');

function openUpPreview(
  event: MouseEvent,
  up: { mid?: string | number; name?: string; face?: string; sign?: string }
) {
  if (!up.mid && !up.name) return;
  bilibiliChannelService.showUpRecentVideosPreview(
    {
      preventDefault: () => event.preventDefault(),
      stopPropagation: () => event.stopPropagation(),
      clientX: event.clientX,
      clientY: event.clientY
    },
    {
      mid: up.mid || "",
      name: up.name || "UP主",
      face: up.face || "",
      sign: up.sign || ""
    }
  );
}

const unreadMsgCount = computed(() => {
  const c = biliMessagePanelState.unreadCounts;
  return (c.reply || 0) + (c.at || 0) + (c.like || 0) + (c.system || 0) + (c.private || 0);
});

function toggleMessagePanel() {
  biliMessagePanelController.togglePanel();
}

const organizer = computed(() => biliFavoritesState.organizer);
const cacheSettingsOpen = ref(false);
const { active: recommendationHostActive } = useCardActivity("daily-bilibili", "/bilibili.html");
watch(() => recommendationHostActive.value && organizer.value.mode === "recommendations", active => {
  bilibiliChannelService.setRecommendationsActive(active);
}, { immediate: true, flush: "sync" });
watch(() => recommendationHostActive.value && organizer.value.mode === "following", active => {
  bilibiliChannelService.setFollowingActive(active);
}, { immediate: true, flush: "sync" });
watch(() => recommendationHostActive.value && organizer.value.mode === "subscription", active => {
  bilibiliChannelService.setSubscriptionActive(active);
}, { immediate: true, flush: "sync" });
watch(() => recommendationHostActive.value && organizer.value.mode === "cache", active => {
  if (!active) cacheSettingsOpen.value = false;
});
const searchQuery = ref(organizer.value.query);
const organizerMain = ref<HTMLElement | null>(null);
const gridColumns = ref(7);
const cachePage = ref(1);
const gridPageSize = computed(() => gridColumns.value * 3);
const cacheTotalPages = computed(() => Math.max(1, Math.ceil(organizer.value.cachedVideos.length / gridPageSize.value)));
const pagedCachedVideos = computed(() => organizer.value.cachedVideos.slice((cachePage.value - 1) * gridPageSize.value, cachePage.value * gridPageSize.value));
watch(cacheTotalPages, total => { cachePage.value = Math.min(cachePage.value, total); });
const hasCurrentFolderPage = computed(() => Boolean(organizer.value.loadedFolderId) && organizer.value.loadedFolderId === biliFavoritesState.activeFolderId);
const openMenuId = ref("");
const contextMenu = ref<{
  visible: boolean; x: number; y: number;
  video: BiliOrganizerVideoView | null;
  folder: { id: string; title: string } | null;
}>({ visible: false, x: 0, y: 0, video: null, folder: null });
const { menuRef: videoMenuRef, style: videoMenuStyle } = useContextMenu({
  visible: () => contextMenu.value.visible,
  anchor: () => contextMenu.value,
  dismiss: () => { contextMenu.value.visible = false; }
});

const isFeaturesCollapsed = ref<boolean>(
  typeof localStorage !== "undefined" && localStorage.getItem("bili_sidebar_features_collapsed") === "true"
);

function toggleFeatures(): void {
  isFeaturesCollapsed.value = !isFeaturesCollapsed.value;
  try {
    localStorage.setItem("bili_sidebar_features_collapsed", String(isFeaturesCollapsed.value));
  } catch {}
}

function handleTabOpenSubtitle(): void {
  if (biliMiniPlayerState.bvid) {
    void subtitleModalController.open({
      bvid: biliMiniPlayerState.bvid,
      cid: biliMiniPlayerState.cid,
      title: biliMiniPlayerState.title
    });
  }
}

function handleTabToggleExpand(): void {
  if (biliMiniPlayerState.collapsed) {
    biliMiniPlayerController.toggleCollapse();
  }
  biliMiniPlayerController.bringToFront();
}

function handleTabCloseVideo(): void {
  biliMiniPlayerController.close();
}

watch(() => organizer.value.query, (query) => { searchQuery.value = query; });
watch(searchQuery, (newVal) => {
  if (!newVal || !newVal.trim()) {
    if (organizer.value.query) {
      dispatch("organizer-search", "");
    }
  }
});

function dispatch(action: Parameters<typeof biliFavoritesController.dispatch>[0], payload?: unknown): void {
  biliFavoritesController.dispatch(action, payload);
}

function selectFolder(folder: BiliOrganizerFolderView): void {
  if (!folder.group) closeSearchPage();
  dispatch(folder.group ? "toggle-folder-group" : "select-folder", { id: folder.id, kind: folder.kind });
}

const draggingFolderId = ref<string>("");
const dragOverFolderId = ref<string>("");
const dragOverMode = ref<"before" | "after" | "into">("before");
const dragOverRoot = ref<boolean>(false);

function beginFolderDrag(event: DragEvent, folder: BiliOrganizerFolderView): void {
  if (folder.kind !== "created") return;
  draggingFolderId.value = folder.id;
  event.dataTransfer?.setData("application/x-logicweaver-favorite-node", folder.id);
  event.dataTransfer?.setData("text/plain", folder.id);
  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = "move";
  }
}

function onFolderDragOver(event: DragEvent, folder: BiliOrganizerFolderView): void {
  if (folder.kind !== "created") return;
  if (!draggingFolderId.value || draggingFolderId.value === folder.id) return;
  event.preventDefault();
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = "move";
  }
  const target = event.currentTarget as HTMLElement | null;
  if (!target) return;
  const bounds = target.getBoundingClientRect();
  const ratio = (event.clientY - bounds.top) / Math.max(1, bounds.height);
  const mode = folder.group && ratio > 0.25 && ratio < 0.75 ? "into" : (ratio >= 0.5 ? "after" : "before");
  dragOverFolderId.value = folder.id;
  dragOverMode.value = mode;
}

function onFolderDragLeave(event: DragEvent, folder: BiliOrganizerFolderView): void {
  const related = event.relatedTarget as HTMLElement | null;
  const current = event.currentTarget as HTMLElement | null;
  if (current && related && current.contains(related)) return;
  if (dragOverFolderId.value === folder.id) {
    dragOverFolderId.value = "";
  }
}

function endFolderDrag(): void {
  draggingFolderId.value = "";
  dragOverFolderId.value = "";
  dragOverRoot.value = false;
}

function dropOnFolder(event: DragEvent, folder: BiliOrganizerFolderView): void {
  event.preventDefault();
  const sourceId = draggingFolderId.value || event.dataTransfer?.getData("application/x-logicweaver-favorite-node") || "";
  const mode = dragOverMode.value || (folder.group ? "into" : "after");
  endFolderDrag();
  if (!sourceId || sourceId === folder.id || folder.kind !== "created") return;
  dispatch("move-folder-node", { sourceId, targetId: folder.id, mode });
}

function onRootDragOver(event: DragEvent): void {
  if (!draggingFolderId.value) return;
  event.preventDefault();
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = "move";
  }
  dragOverRoot.value = true;
}

function onRootDragLeave(event: DragEvent): void {
  const related = event.relatedTarget as HTMLElement | null;
  const current = event.currentTarget as HTMLElement | null;
  if (current && related && current.contains(related)) return;
  dragOverRoot.value = false;
}

function dropOnRoot(event: DragEvent): void {
  event.preventDefault();
  const sourceId = draggingFolderId.value || event.dataTransfer?.getData("application/x-logicweaver-favorite-node") || "";
  endFolderDrag();
  if (!sourceId) return;
  dispatch("move-folder-node", { sourceId, targetId: "root", mode: "into" });
}

function submitSearch(): void {
  const q = searchQuery.value.trim();
  dispatch("organizer-search", q);
}

function onSearchInput(): void {
  const q = searchQuery.value.trim();
  if (!q && organizer.value.query) {
    dispatch("organizer-search", "");
  }
}

// 头部高级搜索（移至右侧，具备热搜推荐与实时视频联想下拉浮层）
const biliSearchQuery = ref("");
const isSearchSuggestVisible = ref(false);
const isSearchLoading = ref(false);
const searchSuggestMode = ref<"hot" | "live">("hot");
const searchSuggestKeyword = ref("");
const searchSuggestHeadTitle = computed(() => {
  return searchSuggestMode.value === "live"
    ? t("bili.searchLiveTitle", { keyword: searchSuggestKeyword.value })
    : t("bili.searchSuggestTitle");
});
const searchSuggestHeadSubtitle = computed(() => {
  return searchSuggestMode.value === "live"
    ? t("bili.searchLiveSubtitle")
    : t("bili.searchSuggestSubtitle");
});
const searchSuggestResults = ref<any[]>([]);
const searchHostRef = ref<HTMLElement | null>(null);
const searchPageOpen = ref(false);
const searchPageKeyword = ref("");
const searchPageNumber = ref(1);
const searchPageTotal = ref(0);
const searchPageHasNext = ref(false);
const searchPageLoading = ref(false);
const searchPageError = ref("");
const searchPageResults = ref<any[]>([]);
let searchPageRequestId = 0;
let suggestRequestId = 0;

watch(() => organizer.value.mode, mode => {
  if (mode !== "recommendations") closeSearchPage();
});

const cachedRecommendations = ref<any[]>([]);
let cachedRecTime = 0;
let searchDebounceTimer: any = null;

function formatBiliRawVideo(item: any) {
  if (!item) return null;
  const bvid = item.bvid || (String(item.param || "").startsWith("BV") ? item.param : "");
  if (!bvid && !item.aid && !item.id) return null;
  const rawCover = String(item.pic || item.cover || "").replace(/^http:/, "https:");
  const cover = rawCover.startsWith("//") ? `https:${rawCover}` : rawCover;
  const plainTitle = String(item.title || "").replace(/<[^>]+>/g, "");
  const numDuration = Number(item.duration || 0);
  const durationText = numDuration > 0
    ? `${Math.floor(numDuration / 60)}:${String(numDuration % 60).padStart(2, "0")}`
    : String(item.duration || "");
  const playNum = item.stat?.view || item.play || 0;
  const playText = Number(playNum) >= 10000 ? `${(Number(playNum) / 10000).toFixed(1)}万` : String(Number(playNum || 0));
  const upper = item.owner?.name || item.name || item.author || t("bili.upDefault");

  return {
    bvid,
    aid: String(item.aid || item.id || ""),
    title: plainTitle,
    cover,
    durationText,
    playText,
    upper
  };
}

async function loadRecommendations(): Promise<void> {
  searchSuggestMode.value = "hot";
  isSearchSuggestVisible.value = true;
  if (cachedRecommendations.value.length && Date.now() - cachedRecTime < 90000) {
    searchSuggestResults.value = cachedRecommendations.value;
    return;
  }
  isSearchLoading.value = true;
  try {
    const res = await fetch("https://api.bilibili.com/x/web-interface/index/top/feed/rcmd?ps=8&fresh_idx=1", { credentials: "include" });
    const json = await res.json();
    let rawList = Array.isArray(json.data?.item) ? json.data.item : [];
    if (!rawList.length) {
      const popRes = await fetch("https://api.bilibili.com/x/web-interface/popular?ps=8&pn=1", { credentials: "include" });
      const popJson = await popRes.json();
      rawList = Array.isArray(popJson.data?.list) ? popJson.data.list : [];
    }
    const mapped = rawList.map(formatBiliRawVideo).filter(Boolean);
    cachedRecommendations.value = mapped;
    cachedRecTime = Date.now();
    if (!biliSearchQuery.value.trim()) {
      searchSuggestResults.value = mapped;
    }
  } catch {
    searchSuggestResults.value = [];
  } finally {
    isSearchLoading.value = false;
  }
}

function onSearchFocus(): void {
  if (biliSearchQuery.value.trim()) {
    executeBiliLiveSearch(biliSearchQuery.value.trim());
  } else {
    loadRecommendations();
  }
}

function onSearchInputChange(): void {
  const q = biliSearchQuery.value.trim();
  clearTimeout(searchDebounceTimer);
  if (!q) {
    loadRecommendations();
    return;
  }
  searchDebounceTimer = setTimeout(() => {
    executeBiliLiveSearch(q);
  }, 320);
}

async function executeBiliLiveSearch(keyword: string): Promise<void> {
  const requestId = ++suggestRequestId;
  isSearchSuggestVisible.value = true;
  searchSuggestMode.value = "live";
  searchSuggestKeyword.value = keyword;
  isSearchLoading.value = true;
  try {
    let data: any = null;
    if ((window as any).LogicWeaverBiliSearchActions?.search) {
      try {
        data = await (window as any).LogicWeaverBiliSearchActions.search(keyword);
      } catch {}
    }
    if (!data || data.code !== 0) {
      const query = `search_type=video&keyword=${encodeURIComponent(keyword)}&page=1&page_size=12`;
      const response = await fetch(`https://api.bilibili.com/x/web-interface/search/type?${query}`, { credentials: "include" });
      data = await response.json();
    }
    if (requestId !== suggestRequestId || biliSearchQuery.value.trim() !== keyword) return;
    const rawVideos = Array.isArray(data?.data?.result) ? data.data.result : [];
    searchSuggestResults.value = rawVideos.slice(0, 10).map(formatBiliRawVideo).filter(Boolean);
  } catch {
    if (requestId === suggestRequestId) searchSuggestResults.value = [];
  } finally {
    if (requestId === suggestRequestId) isSearchLoading.value = false;
  }
}

function openVideoItem(item: any): void {
  isSearchSuggestVisible.value = false;
  const bvid = item.bvid || (String(item.param || item.id || "").startsWith("BV") ? (item.param || item.id) : "");
  if (bvid || item.aid) {
    biliMiniPlayerController.openVideo({
      bvid,
      aid: item.aid,
      title: item.title,
      cover: item.cover,
      author: item.upper
    });
  } else if ((window as any).LogicWeaverBiliSearchActions?.local) {
    (window as any).LogicWeaverBiliSearchActions.local(item);
  } else {
    window.open(`https://www.bilibili.com/video/${bvid || item.bvid || item.id}`, "_blank");
  }
}

function openSuggestContextMenu(event: MouseEvent, item: any): void {
  openVideoContextMenu(event, {
    id: item.bvid || item.aid,
    aid: item.aid,
    bvid: item.bvid,
    title: item.title,
    cover: item.cover,
    url: item.bvid ? `https://www.bilibili.com/video/${item.bvid}` : "#",
    duration: item.durationText,
    playCount: item.playText,
    author: item.upper,
    authorMid: "",
    authorFace: "",
    favoriteDate: "搜索结果",
    selected: false,
    writable: false
  }, false);
}

function closeSearchPage(): void {
  searchPageOpen.value = false;
  searchPageRequestId++;
  searchPageLoading.value = false;
}

async function loadSearchPage(keyword: string, page: number): Promise<void> {
  const requestId = ++searchPageRequestId;
  searchPageOpen.value = true;
  searchPageKeyword.value = keyword;
  searchPageNumber.value = page;
  searchPageLoading.value = true;
  searchPageError.value = "";
  searchPageResults.value = [];
  searchPageTotal.value = 0;
  searchPageHasNext.value = false;
  try {
    let data: any;
    try {
      data = await bilibiliChannelService.searchActions.search(keyword, page, 20);
    } catch { /* 签名接口不可用时尝试普通搜索接口 */ }
    if (!data || data.code !== 0) {
      const params = new URLSearchParams({ search_type: "video", keyword, page: String(page), page_size: "20" });
      const response = await fetch(`https://api.bilibili.com/x/web-interface/search/type?${params}`, { credentials: "include" });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      data = await response.json();
    }
    if (data?.code !== 0 || !Array.isArray(data?.data?.result)) {
      throw new Error(data?.message || "B站没有返回有效的搜索结果");
    }
    if (requestId !== searchPageRequestId) return;
    const raw = data.data.result;
    searchPageResults.value = raw.map(formatBiliRawVideo).filter(Boolean);
    const totalPages = Number(data.data.numPages || data.data.num_pages || 0);
    searchPageTotal.value = Number.isFinite(totalPages) && totalPages > 0 ? Math.floor(totalPages) : 0;
    searchPageHasNext.value = searchPageTotal.value ? page < searchPageTotal.value : raw.length >= 20;
  } catch (error) {
    if (requestId === searchPageRequestId) {
      searchPageError.value = `搜索失败：${error instanceof Error ? error.message : "请稍后重试"}`;
    }
  } finally {
    if (requestId === searchPageRequestId) searchPageLoading.value = false;
  }
}

function onSearchSubmit(): void {
  const q = biliSearchQuery.value.trim();
  clearTimeout(searchDebounceTimer);
  suggestRequestId++;
  isSearchLoading.value = false;
  isSearchSuggestVisible.value = false;
  if (!q) {
    loadRecommendations();
    return;
  }
  void loadSearchPage(q, 1);
}

watch(() => [recommendationHostActive.value, workspaceSearchRequests.bilibili?.id] as const, ([active, id]) => {
  if (!active || !id) return;
  const request = consumeWorkspaceSearch("bilibili");
  if (!request) return;
  dispatch("open-recommendations");
  biliSearchQuery.value = request.keyword;
  onSearchSubmit();
}, { immediate: true });

function handleGlobalPointer(event: PointerEvent): void {
  if (searchHostRef.value && !searchHostRef.value.contains(event.target as Node)) {
    isSearchSuggestVisible.value = false;
  }
}

function toggleVideoMenu(id: string): void {
  contextMenu.value.visible = false;
  openMenuId.value = openMenuId.value === id ? "" : id;
}

function openVideoContextMenu(event: MouseEvent, video: BiliOrganizerVideoView, fromFolder = true): void {
  openMenuId.value = "";
  contextMenu.value = {
    visible: true,
    x: event.clientX,
    y: event.clientY,
    video,
    folder: fromFolder && biliFavoritesState.activeFolderId
      ? { id: String(biliFavoritesState.activeFolderId), title: organizer.value.folderTitle }
      : null
  };
}

function closeVideoMenu(event: PointerEvent | KeyboardEvent): void {
  if (event instanceof KeyboardEvent) {
    if (event.key === "Escape") {
      openMenuId.value = "";
      contextMenu.value.visible = false;
      if (organizer.value.isTargetPickMode) {
        dispatch("organizer-cancel-move-target");
      }
    }
    return;
  }
  const target = event.target as Element | null;
  if (!target?.closest(".fo-card-menu, .fo-card-more")) {
    openMenuId.value = "";
  }
  if (!target?.closest(".fo-context-menu")) {
    contextMenu.value.visible = false;
  }
}

const isStandalone = typeof document !== "undefined" && document.body.classList.contains("bili-standalone-body");

function updateFavoriteColumns() {
  const main = organizerMain.value;
  if (!main || !main.clientWidth) return;
  const style = getComputedStyle(main);
  const width = main.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
  const minWidth = parseFloat(style.getPropertyValue('--favorite-card-min')) || 168;
  const columns = favoriteGridColumns(width, minWidth);
  if (columns !== gridColumns.value) {
    const firstCachedIndex = (cachePage.value - 1) * gridPageSize.value;
    gridColumns.value = columns;
    cachePage.value = Math.floor(firstCachedIndex / gridPageSize.value) + 1;
  }
  if (organizer.value.mode === 'organizer') biliFavoritesController.setOrganizerColumns(columns);
  const size = columns * 3;
  if (organizer.value.mode === 'recommendations' && bilibiliChannelService.rcmdState.pageSize !== size) {
    bilibiliChannelService.rcmdState.pageSize = size;
    void bilibiliChannelService.loadRecommendations(true);
  }
  if (organizer.value.mode === 'following' && bilibiliChannelService.feedState.pageSize !== size) {
    bilibiliChannelService.feedState.pageSize = size;
    void bilibiliChannelService.loadFollowing(true);
  }
}

watch(organizerMain, (main, _old, cleanup) => {
  if (!main) return;
  let timer: ReturnType<typeof setTimeout>;
  const observer = new ResizeObserver(() => {
    clearTimeout(timer);
    timer = setTimeout(updateFavoriteColumns, 180);
  });
  observer.observe(main);
  cleanup(() => { clearTimeout(timer); observer.disconnect(); });
}, { flush: 'post' });
watch(() => organizer.value.loading, loading => { if (!loading) updateFavoriteColumns(); });

const BILI_MODE_SESSION_KEY = "lw-bili-active-mode";
type BiliMode = typeof organizer.value.mode;
const RESTORABLE_BILI_MODES: ReadonlyArray<BiliMode> = ["organizer", "cache", "recommendations", "following", "radio"];
let biliModeRestored = false;

function readSavedBiliMode(): BiliMode {
  try {
    const saved = sessionStorage.getItem(BILI_MODE_SESSION_KEY) as BiliMode | null;
    return saved && RESTORABLE_BILI_MODES.includes(saved) ? saved : "organizer";
  } catch {
    return "organizer";
  }
}

function restoreSavedBiliModeIfActive(): void {
  if (biliModeRestored || !recommendationHostActive.value) return;
  biliModeRestored = true;
  const saved = readSavedBiliMode();
  if (saved === "recommendations") dispatch("open-recommendations");
  else if (saved === "following") dispatch("open-following");
  else if (saved === "subscription") dispatch("open-sub-video");
  else if (saved === "cache") dispatch("open-cache");
  else if (saved === "radio") dispatch("open-radio");
}

watch(() => organizer.value.mode, mode => {
  if (!biliModeRestored && !recommendationHostActive.value) return;
  try { sessionStorage.setItem(BILI_MODE_SESSION_KEY, mode); } catch {}
});

watch(recommendationHostActive, visible => {
  if (visible) restoreSavedBiliModeIfActive();
});

onMounted(() => {
  void import("../services/bilibili-channel.service").catch((error) =>
    console.error("[Bilibili] 频道动作服务加载失败", error));
  updateFavoriteColumns();
  void biliFavoritesController.loadOrganizer();
  restoreSavedBiliModeIfActive();
  document.addEventListener("pointerdown", closeVideoMenu, true);
  document.addEventListener("pointerdown", handleGlobalPointer);
  window.addEventListener("keydown", closeVideoMenu);
  (window as any).setBiliMiniDockVisible?.(true);
  requestAnimationFrame(() => {
    (window as any).positionBiliMiniDock?.();
  });
});

watch(() => [organizer.value.videos, organizer.value.mode], () => {
  requestAnimationFrame(() => {
    (window as any).positionBiliMiniDock?.();
  });
}, { flush: "post" });

onBeforeUnmount(() => {
  bilibiliChannelService.setRecommendationsActive(false);
  bilibiliChannelService.setFollowingActive(false);
  bilibiliChannelService.setSubscriptionActive(false);
  document.removeEventListener("pointerdown", closeVideoMenu, true);
  document.removeEventListener("pointerdown", handleGlobalPointer);
  window.removeEventListener("keydown", closeVideoMenu);
});

function runVideoAction(idOrVideo: any, action: string): void {
  openMenuId.value = "";
  contextMenu.value.visible = false;
  const id = typeof idOrVideo === "object" ? String(idOrVideo.id || idOrVideo.bvid || idOrVideo.aid || "") : String(idOrVideo);
  const video = typeof idOrVideo === "object" ? idOrVideo : organizer.value.videos.find((v) => String(v.id) === id);
  dispatch("organizer-video-action", { id, video, action });
}

async function runContextMenuAction(action: string): Promise<void> {
  const { video, folder } = contextMenu.value;
  contextMenu.value.visible = false;
  if (action === 'add-radio' && video) {
    try {
      const added = await biliRadioController.addToDefaultSeries({
        bvid: video.bvid || (video.id.startsWith('BV') ? video.id : ''),
        title: video.title, author: video.author, cover: video.cover,
        duration: parseDurationToSeconds(video.duration)
      });
      notifications.fetch('B站电台', added ? '已添加到默认系列' : '已在默认系列中');
    } catch {
      notifications.fetch('B站电台', '添加失败，请重试');
    }
    return;
  }
  if (video) dispatch("organizer-video-action", { id: video.id || "", video, action });
}

function onLayoutWheel(event: WheelEvent): void {
  if (!organizer.value.isTargetPickMode) return;
  const target = event.target as HTMLElement | null;
  if (target?.closest(".bili-sub-transcript-body, .bili-sub-scroll-stage")) return;
  if (!target?.closest(".fo-bili-folder-list")) {
    const folderList = document.querySelector(".fo-bili-folder-list");
    if (folderList) {
      event.preventDefault();
      folderList.scrollTop += event.deltaY;
    }
  }
}

function createCassetteDragGhost(_title: string): HTMLElement {
  const ghost = document.createElement("div");
  ghost.style.position = "fixed";
  ghost.style.top = "-9999px";
  ghost.style.left = "-9999px";
  ghost.style.width = "76px";
  ghost.style.height = "26px";
  ghost.style.display = "flex";
  ghost.style.alignItems = "center";
  ghost.style.justifyContent = "center";
  ghost.style.background = "transparent";
  ghost.style.zIndex = "999999";
  ghost.style.pointerEvents = "none";
  ghost.innerHTML = `
    <svg width="76" height="26" viewBox="0 0 76 26" fill="none" xmlns="http://www.w3.org/2000/svg" style="filter:drop-shadow(0 1px 2px rgba(0,0,0,0.45));">
      <line x1="6" y1="13" x2="64" y2="13" stroke="#00aeec" stroke-width="2.5" stroke-dasharray="5 3" stroke-linecap="round" />
      <polyline points="56,6 66,13 56,20" stroke="#00aeec" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none" />
    </svg>
  `;
  document.body.appendChild(ghost);
  return ghost;
}

function onRadioVideoDragStart(event: DragEvent, video: { bvid: string; title: string; cover?: string; author?: string; duration?: number }): void {
  if (!event.dataTransfer) return;
  event.dataTransfer.effectAllowed = "copyMove";
  const cassettePayload = JSON.stringify({
    type: "bili-cassette-tape",
    bvid: video.bvid,
    title: video.title,
    cover: video.cover,
    author: video.author,
    duration: video.duration
  });
  event.dataTransfer.setData("application/x-bili-cassette", cassettePayload);
  event.dataTransfer.setData("application/json", cassettePayload);
  event.dataTransfer.setData("text/plain", `https://www.bilibili.com/video/${video.bvid}`);

  const ghost = createCassetteDragGhost(video.title);
  event.dataTransfer.setDragImage(ghost, 66, 13);
  setTimeout(() => {
    if (ghost.parentNode) ghost.parentNode.removeChild(ghost);
  }, 0);
}
const RADIO_PAGE_SIZE = 14;
const radioLibraryPage = ref(1);
const selectedRadioStageBvid = ref("");
const activeRadioSourceMode = ref<"folder" | "liked">("folder");

const radioTotalPages = computed(() =>
  Math.max(1, Math.ceil(biliFavoritesState.radioVideos.length / RADIO_PAGE_SIZE))
);
const pagedRadioVideos = computed(() => {
  const safePage = Math.min(radioLibraryPage.value, radioTotalPages.value);
  const start = (safePage - 1) * RADIO_PAGE_SIZE;
  return biliFavoritesState.radioVideos.slice(start, start + RADIO_PAGE_SIZE);
});

const likedRadioItems = computed(() => {
  const liked = biliFavoritesState.radioSeries.find(
    (s) => s.id === LIKED_SERIES_ID || s.name === LIKED_SERIES_NAME
  );
  return liked?.items || [];
});

const likedRadioCount = computed(() => likedRadioItems.value.length);

const activeRadioFolderName = computed(() => {
  const folder = biliFavoritesState.radioFolders.find(
    (f) => Number(f.id) === Number(biliFavoritesState.radioActiveFolderId)
  );
  return folder?.title || "当前收藏夹";
});

const activeRadioSourceLabel = computed(() =>
  activeRadioSourceMode.value === "liked" ? LIKED_SERIES_NAME : activeRadioFolderName.value
);

const radioCoverTrackList = computed(() => {
  if (activeRadioSourceMode.value === "liked" && likedRadioItems.value.length > 0) {
    return likedRadioItems.value;
  }
  return biliFavoritesState.radioVideos;
});

const featuredRadioTrack = computed(() => {
  const list = radioCoverTrackList.value;
  if (radioTapeState.active && radioTapeState.bvid) {
    const matched = list.find((item) => item.bvid === radioTapeState.bvid)
      || biliFavoritesState.radioVideos.find((item) => item.bvid === radioTapeState.bvid);
    if (matched) return matched;
    return {
      bvid: radioTapeState.bvid,
      title: radioTapeState.title || "B站电台",
      cover: radioTapeState.coverUrl || "",
      author: radioTapeState.author || radioTapeState.seriesName || "Bilibili",
      duration: Number(radioTapeState.duration || 0),
    };
  }
  if (selectedRadioStageBvid.value) {
    const selected = list.find((item) => item.bvid === selectedRadioStageBvid.value);
    if (selected) return selected;
  }
  return list[0] || null;
});

const isFeaturedTrackCurrent = computed(() =>
  Boolean(radioTapeState.active && featuredRadioTrack.value?.bvid && radioTapeState.bvid === featuredRadioTrack.value.bvid)
);

const isFeaturedTrackPlaying = computed(() =>
  Boolean(isFeaturedTrackCurrent.value && radioTapeState.playing)
);

const featuredFolderIndex = computed(() => {
  const current = featuredRadioTrack.value;
  if (!current) return -1;
  return radioCoverTrackList.value.findIndex((item) => item.bvid === current.bvid);
});

const featuredTrackPositionText = computed(() => {
  const total = radioCoverTrackList.value.length;
  if (!total) return "";
  const idx = featuredFolderIndex.value;
  return idx >= 0 ? `${idx + 1} / ${total}` : `${total} 首`;
});

function playFromList(list: typeof biliFavoritesState.radioVideos, startIndex: number, shuffle = false, seriesTitle?: string): void {
  if (!list.length) return;
  const normalized = list.map((item) => ({ ...item, upper: item.author }));
  let idx = Math.max(0, Math.min(normalized.length - 1, startIndex));
  if (shuffle) {
    for (let i = normalized.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [normalized[i], normalized[j]] = [normalized[j], normalized[i]];
    }
    idx = 0;
  }
  selectedRadioStageBvid.value = normalized[idx]?.bvid || "";
  biliRadioPlayer.playQueue({
    name: seriesTitle || activeRadioSourceLabel.value || "B站电台",
    items: normalized,
    startIndex: idx,
  });
}

function selectRadioFolder(folderId: number): void {
  activeRadioSourceMode.value = "folder";
  selectedRadioStageBvid.value = "";
  dispatch("radio-select-folder", folderId);
}

function playFolderTrack(video: { bvid: string; title: string; cover?: string; author?: string; duration?: number }): void {
  activeRadioSourceMode.value = "folder";
  selectedRadioStageBvid.value = video.bvid;
  const idx = biliFavoritesState.radioVideos.findIndex((item) => item.bvid === video.bvid);
  playFromList(biliFavoritesState.radioVideos, idx >= 0 ? idx : 0, false, activeRadioFolderName.value);
}

function openLikedRadioCollection(): void {
  if (!likedRadioItems.value.length) {
    notifications.fetch("哔哩哔哩电台", "还没有喜欢的曲目，点击视频旁的 ♡ 即可收藏");
    return;
  }
  activeRadioSourceMode.value = "liked";
  playFromList(likedRadioItems.value, 0, false, LIKED_SERIES_NAME);
}

function stepRadioFolderTrack(delta: -1 | 1): void {
  const list = radioCoverTrackList.value;
  if (!list.length) return;
  const idx = featuredFolderIndex.value;
  const nextIdx = idx >= 0 ? (idx + delta + list.length) % list.length : (delta > 0 ? 0 : list.length - 1);
  playFromList(list, nextIdx, false, activeRadioSourceLabel.value);
}

function togglePlayFeaturedRadioTrack(): void {
  const target = featuredRadioTrack.value;
  if (!target) return;
  if (isFeaturedTrackCurrent.value) {
    radioTapeController.togglePlay();
    return;
  }
  const list = radioCoverTrackList.value;
  const idx = list.findIndex((item) => item.bvid === target.bvid);
  if (idx >= 0) {
    playFromList(list, idx, false, activeRadioSourceLabel.value);
    return;
  }
  playFromList([target], 0, false, activeRadioSourceLabel.value);
}

function handleRadioPlayAction(shuffle = false): void {
  const list = radioCoverTrackList.value;
  if (!list.length) return;
  const idx = featuredFolderIndex.value >= 0 ? featuredFolderIndex.value : 0;
  playFromList(list, idx, shuffle, shuffle ? `${activeRadioSourceLabel.value} · 随机` : activeRadioSourceLabel.value);
}

function formatRadioDuration(sec?: number): string {
  const total = Math.max(0, Math.floor(Number(sec) || 0));
  if (!total) return "";
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

watch(
  () => biliFavoritesState.radioActiveFolderId,
  (folderId, prevFolderId) => {
    if (folderId !== prevFolderId) radioLibraryPage.value = 1;
    else if (radioLibraryPage.value > radioTotalPages.value) radioLibraryPage.value = radioTotalPages.value;
  }
);
</script>

<template>
  <section id="daily-bilibili" class="card wide" :class="{ 'card-fullscreen': isStandalone || fullscreenCardState.activeId === 'daily-bilibili' }">
    <div class="fm-pane" id="pane-organizer">
      <div id="fo-body">
        <div class="fo-bili-layout" :style="biliWallpaperStyle" :class="{ 'fo-picking-move-target': organizer.isTargetPickMode, 'has-workspace-wallpaper': !!biliWallpaperStyle }" data-vue-organizer-shell="true" @wheel="onLayoutWheel">
          <WorkspaceWallpaperLayer :media="biliWallpaperMedia" />
          <aside class="fo-bili-sidebar">
            <div
              class="fo-sidebar-toggle-bar"
              :class="{ 'is-collapsed': isFeaturesCollapsed }"
              :title="isFeaturesCollapsed ? t('bili.channel.expandTip') : t('bili.channel.collapseTip')"
              @click="toggleFeatures"
            >
              <div class="fo-sidebar-toggle-title">
                <span class="fo-sidebar-toggle-icon">⚡</span>
                <span>{{ t('bili.channel.title') }}</span>
                <span v-if="isFeaturesCollapsed" class="fo-sidebar-toggle-pill">5</span>
              </div>
              <button
                type="button"
                class="fo-sidebar-toggle-action"
                :aria-expanded="!isFeaturesCollapsed"
                :title="isFeaturesCollapsed ? t('bili.channel.expand') : t('bili.channel.collapse')"
              >
                <span>{{ isFeaturesCollapsed ? t('bili.channel.expand') : t('bili.channel.collapse') }}</span>
                <span class="fo-sidebar-toggle-chevron">{{ isFeaturesCollapsed ? '▾' : '▴' }}</span>
              </button>
            </div>

            <div v-show="!isFeaturesCollapsed" class="fo-sidebar-features-wrap">
              <div class="fo-sidebar-sub-wrap fo-sidebar-cache-wrap">
                <button id="fo-sidebar-cache-btn" type="button" class="fo-sidebar-sub-btn" :class="{ on: organizer.mode === 'cache' }" :title="t('bili.channel.cacheVideoTip')" @click="dispatch('open-cache')">
                  <div class="fo-sidebar-sub-main"><span class="fo-sidebar-sub-icon">💾</span><div class="fo-sidebar-sub-text"><strong>{{ t('bili.channel.cacheVideo') }}</strong><small>{{ t('bili.channel.cacheVideoSub') }}</small></div></div>
                  <span class="fo-sidebar-sub-badge">LOCAL</span>
                </button>
              </div>
              <div class="fo-sidebar-sub-wrap fo-sidebar-following-wrap">
                <button id="fo-sidebar-following-btn" type="button" class="fo-sidebar-sub-btn" :class="{ on: organizer.mode === 'following' }" :title="t('bili.channel.followingTip')" @click="dispatch('open-following')">
                  <div class="fo-sidebar-sub-main"><span class="fo-sidebar-sub-icon">📺</span><div class="fo-sidebar-sub-text"><strong>{{ t('bili.channel.following') }}</strong><small>{{ t('bili.channel.followingSub') }}</small></div></div>
                  <span class="fo-sidebar-sub-badge">FEED</span>
                </button>
              </div>
              <div class="fo-sidebar-sub-wrap fo-sidebar-recommend-wrap">
                <button id="fo-sidebar-recommend-btn" type="button" class="fo-sidebar-sub-btn" :class="{ on: organizer.mode === 'recommendations' }" :title="t('bili.channel.forYouTip')" @click="dispatch('open-recommendations')">
                  <div class="fo-sidebar-sub-main"><span class="fo-sidebar-sub-icon">✨</span><div class="fo-sidebar-sub-text"><strong>{{ t('bili.channel.forYou') }}</strong><small>{{ t('bili.channel.forYouSub') }}</small></div></div>
                  <span class="fo-sidebar-sub-badge">FOR YOU</span>
                </button>
              </div>
              <div class="fo-sidebar-sub-wrap fo-sidebar-radio-wrap">
                <button id="fo-sidebar-radio-btn" type="button" class="fo-sidebar-sub-btn" :class="{ on: organizer.mode === 'radio' }" :title="t('bili.channel.radioTip')" @click="dispatch('open-radio')">
                  <div class="fo-sidebar-sub-main"><span class="fo-sidebar-sub-icon">📻</span><div class="fo-sidebar-sub-text"><strong>{{ t('bili.channel.radio') }}</strong><small>{{ t('bili.channel.radioSub') }}</small></div></div>
                  <span class="fo-sidebar-sub-badge">RADIO</span>
                </button>
              </div>
            </div>

            <div class="fo-sidebar-favorite-hub">
              <div class="fo-sidebar-sub-main"><span class="fo-sidebar-sub-icon">📁</span><div class="fo-sidebar-sub-text"><strong>{{ t('bili.channel.foldersHub') }}</strong><small>{{ t('bili.channel.foldersHubSub') }}</small></div></div>
              <button class="fo-sidebar-hub-add" type="button" :title="t('bili.channel.createFolderTip')" :aria-label="t('bili.channel.createFolderTip')" @click="dispatch('create-bili-folder')">＋</button>
            </div>

            <!-- 目标选择模式下的顶部取消与操作提示横幅 -->
            <div v-if="organizer.isTargetPickMode" class="fo-move-target-banner">
              <div class="fo-move-target-tip">
                <span class="fo-move-target-dot"></span>
                <span>请点击<strong>自建收藏夹</strong>移入</span>
              </div>
              <button
                type="button"
                class="fo-move-target-cancel"
                title="取消移动 (按 Esc 也可取消)"
                @click="dispatch('organizer-cancel-move-target')"
              >
                ✕ 取消
              </button>
            </div>

            <nav class="fo-bili-folder-list" aria-label="B站收藏夹">
              <template v-for="(folder, index) in organizer.folders" :key="`${folder.group ? 'group' : 'folder'}:${folder.id}`">
                <div v-if="index > 0 && organizer.folders[index - 1]?.kind !== folder.kind" class="fo-bili-section-divider"></div>
                <div
                  v-if="index === 0 || organizer.folders[index - 1]?.kind !== folder.kind"
                  class="fo-bili-section-head fo-vue-section-head"
                  :class="{ 'drag-into': folder.kind === 'created' && dragOverRoot }"
                  @dragover="folder.kind === 'created' ? onRootDragOver($event) : undefined"
                  @dragleave="folder.kind === 'created' ? onRootDragLeave($event) : undefined"
                  @drop="folder.kind === 'created' ? dropOnRoot($event) : undefined"
                >
                  <span class="fo-bili-section-title"><b>{{ folder.kind === 'collected' ? '我追的合集/收藏夹' : folder.kind === 'other' ? '其他收藏' : '我创建的收藏夹' }}</b></span>
                  <button
                    v-if="folder.kind === 'created'"
                    class="fo-bili-section-add-btn"
                    type="button"
                    title="新建插件分组"
                    aria-label="新建插件分组"
                    @click.stop="dispatch('create-local-group')"
                  >＋</button>
                </div>
                <div
                  v-if="!folder.group"
                  role="button"
                  tabindex="0"
                  class="fo-bili-folder"
                  :class="{
                    on: folder.selected,
                    dragging: draggingFolderId === folder.id,
                    'drag-before': dragOverFolderId === folder.id && dragOverMode === 'before',
                    'drag-after': dragOverFolderId === folder.id && dragOverMode === 'after',
                    'drag-into': dragOverFolderId === folder.id && dragOverMode === 'into',
                    'target-candidate': organizer.isTargetPickMode && folder.kind === 'created' && !folder.selected
                  }"
                  :data-folder-id="folder.id"
                  :data-folder-kind="folder.kind"
                  :style="{ '--fo-depth': folder.depth }"
                  :draggable="folder.kind === 'created'"
                  @click="selectFolder(folder)"
                  @keydown.enter.prevent="selectFolder(folder)"
                  @keydown.space.prevent="selectFolder(folder)"
                  @dragstart="beginFolderDrag($event, folder)"
                  @dragover="onFolderDragOver($event, folder)"
                  @dragleave="onFolderDragLeave($event, folder)"
                  @drop="dropOnFolder($event, folder)"
                  @dragend="endFolderDrag"
                >
                  <i class="fo-folder-icon" aria-hidden="true"></i><span>{{ folder.title }}</span><small>{{ folder.count }}</small>
                </div>
                <div
                  v-else
                  class="fo-bili-group-label"
                  :class="{
                    collapsed: folder.collapsed,
                    dragging: draggingFolderId === folder.id,
                    'drag-before': dragOverFolderId === folder.id && dragOverMode === 'before',
                    'drag-after': dragOverFolderId === folder.id && dragOverMode === 'after',
                    'drag-into': dragOverFolderId === folder.id && dragOverMode === 'into'
                  }"
                  :style="{ '--fo-depth': folder.depth }"
                  role="button"
                  tabindex="0"
                  :aria-expanded="!folder.collapsed"
                  :draggable="true"
                  @click="selectFolder(folder)"
                  @keydown.enter.prevent="selectFolder(folder)"
                  @keydown.space.prevent="selectFolder(folder)"
                  @dragstart="beginFolderDrag($event, folder)"
                  @dragover="onFolderDragOver($event, folder)"
                  @dragleave="onFolderDragLeave($event, folder)"
                  @drop="dropOnFolder($event, folder)"
                  @dragend="endFolderDrag"
                >
                  <i class="fo-group-caret" aria-hidden="true">{{ folder.collapsed ? '›' : '⌄' }}</i><i class="fo-folder-icon" aria-hidden="true"></i><span>{{ folder.title }}</span><small>{{ folder.count }}</small>
                </div>
              </template>
              <p v-if="!organizer.loading && !organizer.error && !organizer.folders.length" class="muted small">暂无可用收藏夹。</p>
            </nav>
          </aside>

          <section v-if="organizer.mode === 'organizer'" id="fo-vue-main" ref="organizerMain" class="fo-bili-main">
            <div v-if="organizer.loading && !searchPageOpen && !hasCurrentFolderPage" class="fo-bili-loading"><i></i><span>正在读取 B站收藏内容…</span></div>
            <div v-else-if="!searchPageOpen && organizer.error && organizer.error.includes('未登录')" class="fo-bili-empty fo-bili-login-guide">
              <div class="fo-bili-login-card">
                <span class="fo-bili-login-icon">📺</span>
                <h3>未检测到哔哩哔哩登录状态</h3>
                <p>tab-Project 直接复用当前浏览器的 B站 网页会话，无需输入账号密码或扫码授权。</p>
                <div class="fo-bili-login-actions">
                  <a class="fo-bili-btn-login" href="https://passport.bilibili.com/login" target="_blank" rel="noreferrer">前往 bilibili.com 登录 ↗</a>
                  <button type="button" class="fo-bili-btn-refresh" @click="dispatch('organizer-refresh')">已登录，点击刷新 ↻</button>
                </div>
              </div>
            </div>
            <p v-else-if="!searchPageOpen && organizer.error && !hasCurrentFolderPage" class="fo-bili-empty">{{ organizer.error }}</p>
            <template v-else>
              <header class="fo-bili-hero fo-hero-persistent">
                <div class="fo-hero-left">
                  <div class="fo-bili-cover" :class="{ 'fo-vue-cover-image': organizer.folderCover }">
                    <img v-if="organizer.folderCover" :src="organizer.folderCover" alt="" referrerpolicy="no-referrer" />
                    <i v-else class="fo-folder-icon"></i>
                  </div>
                  <div class="fo-hero-folder-info"><h3>{{ organizer.folderTitle }}</h3><p>{{ organizer.folderSubtitle }}</p></div>
                </div>

                <!-- 收藏夹顶部同样提供 B站全站搜索框（与个性推荐一致） -->
                <div class="card-fullscreen-bili-search fo-hero-bili-search" ref="searchHostRef">
                  <form class="card-fullscreen-bili-searchbar" role="search" @submit.prevent="onSearchSubmit">
                    <input
                      v-model="biliSearchQuery"
                      type="search"
                      autocomplete="off"
                      :placeholder="t('bili.workspace.searchPlaceholder')"
                      :aria-label="t('bili.workspace.searchAria')"
                      @focus="onSearchFocus"
                      @input="onSearchInputChange"
                    />
                    <button type="submit" :title="t('bili.workspace.searchBtnTip')">⌕</button>
                  </form>

                  <div
                    v-if="isSearchSuggestVisible"
                    class="card-fullscreen-bili-suggestions"
                    role="listbox"
                  >
                    <div class="card-fullscreen-bili-suggest-head">
                      <span>{{ searchSuggestHeadTitle }}</span>
                      <small>{{ searchSuggestHeadSubtitle }}</small>
                    </div>
                    <p v-if="isSearchLoading" class="card-fullscreen-bili-suggest-status">正在获取推荐 / 搜索中…</p>
                    <p v-else-if="!searchSuggestResults.length && !isSearchLoading" class="card-fullscreen-bili-suggest-status">暂无联想结果，按回车在插件内搜索</p>
                    <template v-else>
                      <button
                        v-for="item in searchSuggestResults"
                        :key="item.bvid || item.aid"
                        type="button"
                        class="card-fullscreen-bili-video-row"
                        role="option"
                        @click="openVideoItem(item)"
                        @contextmenu.prevent="openSuggestContextMenu($event, item)"
                      >
                        <span class="card-fullscreen-bili-thumb">
                          <img :src="item.cover" alt="" referrerpolicy="no-referrer" loading="lazy" />
                          <i v-if="item.durationText">{{ item.durationText }}</i>
                        </span>
                        <span class="card-fullscreen-bili-video-copy">
                          <strong>{{ item.title }}</strong>
                          <small>{{ item.upper }} · {{ item.playText }}播放</small>
                        </span>
                      </button>
                    </template>
                  </div>
                </div>

                <div class="fo-bili-actions">
                  <!-- B站互动消息按钮 -->
                  <button
                    id="bili-header-msg-center-btn"
                    class="fm-tab bili-header-msg-btn hero-action-btn"
                    type="button"
                    :class="{ 'is-active': biliMessagePanelState.isOpen }"
                    :title="t('bili.workspace.msgCenterTip')"
                    @click="toggleMessagePanel"
                  >
                    <span class="bili-header-msg-icon">🔔</span>
                    <span class="bili-header-msg-label">{{ t('bili.workspace.msgBtn') }}</span>
                  </button>

                  <button type="button" class="primary hero-action-btn" :disabled="!organizer.videos.length" @click="dispatch('organizer-batch-toggle')">{{ organizer.batchMode ? t('bili.workspace.batchBack') : t('bili.workspace.batch') }}</button>
                </div>
              </header>

              <div class="fo-bili-toolbar">
                <div v-if="!organizer.batchMode" class="fo-bili-sort">
                  <button v-for="item in [{ id: 'fav_time', text: t('bili.sort.favTime') }, { id: 'view', text: t('bili.sort.view') }, { id: 'pubtime', text: t('bili.sort.pubTime') }]" :key="item.id" type="button" :class="{ on: organizer.sort === item.id }" @click="dispatch('organizer-sort', item.id)">{{ item.text }}</button>
                </div>
                <div class="fo-mini-dock-anchor" aria-label="视频标签页">
                  <div
                    v-if="biliMiniPlayerState.isOpen && biliMiniPlayerState.bvid"
                    class="fo-video-tab-item"
                    :class="{ 'is-collapsed': biliMiniPlayerState.collapsed }"
                    :title="biliMiniPlayerState.title"
                  >
                    <div class="fo-video-tab-meta" @click="handleTabToggleExpand">
                      <span class="fo-video-tab-pulse" :class="{ playing: biliMiniPlayerState.isPlaying }"></span>
                      <span class="fo-video-tab-title">{{ biliMiniPlayerState.title }}</span>
                    </div>
                    <div class="fo-video-tab-actions">
                      <button
                        type="button"
                        class="fo-vtab-btn fo-vtab-close"
                        title="关闭视频"
                        @click.stop="handleTabCloseVideo"
                      >
                        ✕
                      </button>
                      <button
                        type="button"
                        class="fo-vtab-btn fo-vtab-sub"
                        title="查看该视频完整纯文本字幕"
                        @click.stop="handleTabOpenSubtitle"
                      >
                        字幕
                      </button>
                      <button
                        type="button"
                        class="fo-vtab-btn fo-vtab-expand"
                        :title="biliMiniPlayerState.collapsed ? '放大恢复视频小窗' : '聚焦视频小窗'"
                        @click.stop="handleTabToggleExpand"
                      >
                        放大
                      </button>
                    </div>
                  </div>
                </div>
                <form v-if="!organizer.batchMode" class="fo-bili-search" @submit.prevent="submitSearch">
                  <input
                    v-model="searchQuery"
                    type="search"
                    placeholder="请输入关键词"
                    aria-label="搜索当前收藏夹"
                    @input="onSearchInput"
                    @search="onSearchInput"
                  /><button type="submit" title="搜索">⌕</button>
                </form>
                <div v-else class="fo-bili-batch-actions">
                  <span class="fo-batch-count">已选择 {{ organizer.selectedCount }} 项</span>
                  <button type="button" @click="dispatch('organizer-batch-all')">全选/取消全选</button>
                  <button
                    type="button"
                    :class="{ 'picking-target': organizer.isTargetPickMode }"
                    @click="organizer.isTargetPickMode ? dispatch('organizer-cancel-move-target') : dispatch('organizer-batch-move')"
                  >
                    {{ organizer.isTargetPickMode ? '✕ 取消移动' : '移动到' }}
                  </button>
                  <button type="button" @click="dispatch('organizer-batch-cache')">缓存所选</button>
                  <button type="button" @click="dispatch('organizer-batch-unfavorite')">取消收藏</button>
                </div>
              </div>

              <p v-if="organizer.error" class="muted small" role="status">{{ organizer.error }}</p>
              <div class="fo-bili-grid fo-favorites-grid" :style="{ '--favorite-columns': organizer.pageSize / 3 }" :aria-busy="organizer.loading">
                <p v-if="!organizer.videos.length" class="fo-bili-empty">{{ organizer.query ? '没有找到匹配的视频。' : '这个收藏夹是空的。' }}</p>
                <article v-for="video in organizer.videos" :key="video.id" class="fo-bili-card" :class="{ 'batch-selected': video.selected, 'fo-single-moving': organizer.movingVideoId === video.id }" :data-batch-id="video.id" @contextmenu.prevent.stop="openVideoContextMenu($event, video)">
                  <div class="fo-bili-thumb">
                    <label v-if="organizer.batchMode" class="fo-batch-check" title="选择此视频"><input type="checkbox" :checked="video.selected" @change="dispatch('organizer-batch-select', video.id)" /><span>✓</span></label>
                    <a class="fo-cover-link" draggable="false" :href="video.url" target="_blank" rel="noreferrer" @click.prevent="dispatch('organizer-play-video', video)"><img draggable="false" loading="lazy" decoding="async" referrerpolicy="no-referrer" :src="video.cover ? video.cover.replace(/^http:/, 'https:') : ''" alt="" /></a>
                    <span class="fo-bili-count">▣ {{ video.playCount }}</span><span class="fo-bili-duration">{{ video.duration }}</span>
                  </div>
                  <div class="fo-bili-title-row">
                    <a class="fo-title-link fo-bili-title" :href="video.url" target="_blank" rel="noreferrer" @click.prevent="dispatch('organizer-play-video', video)">{{ video.title }}</a>
                    <button class="fo-card-more" type="button" aria-label="更多操作" :aria-expanded="openMenuId === video.id" @click.stop="toggleVideoMenu(video.id)">⋮</button>
                    <div v-if="openMenuId === video.id" class="fo-card-menu">
                      <button v-if="video.writable" type="button" class="danger" @click="runVideoAction(video.id, 'delete')">取消收藏</button>
                      <button v-if="video.writable" type="button" @click="runVideoAction(video.id, 'move')">移动到</button>
                      <button type="button" @click="runVideoAction(video.id, 'subtitle')">字幕</button>
                    </div>
                  </div>
                  <div class="fo-bili-meta">
                    <span
                      class="fo-bili-author clickable"
                      title="点击查看 UP 主详情与近期投稿"
                      @click.stop.prevent="openUpPreview($event, { mid: video.authorMid, name: video.author, face: video.authorFace })"
                    >{{ video.author }}</span>
                    <span>收藏于 {{ video.favoriteDate }}</span>
                  </div>
                </article>
              </div>

              <!-- 底部纯净居中翻页器 (图 2 标准样式，居中纯净排布) -->
              <div v-if="organizer.totalPages > 1" class="fo-pager">
                <button type="button" class="fo-btn" :disabled="organizer.loading || organizer.page <= 1" @click="dispatch('organizer-page', organizer.page - 1)">‹ 上一页</button>
                <span class="fo-page-num">{{ organizer.page }} / {{ organizer.totalPages }}</span>
                <button type="button" class="fo-btn" :disabled="organizer.loading || organizer.page >= organizer.totalPages" @click="dispatch('organizer-page', organizer.page + 1)">下一页 ›</button>
              </div>
            </template>
          </section>
          <section v-else-if="organizer.mode === 'cache'" id="fo-vue-cache-main" ref="organizerMain" class="fo-bili-main">
            <BiliCacheSettingsView v-if="cacheSettingsOpen" :active="recommendationHostActive" @back="cacheSettingsOpen = false" />
            <template v-else>
            <header class="fo-bili-hero fo-hero-persistent fo-cached-hero">
              <div class="fo-hero-left"><div class="fo-bili-cover">💾</div><div class="fo-hero-folder-info"><h3>缓存视频</h3><p>{{ organizer.cachedVideos.length }} 个缓存记录 · 点击缓存设置管理存放目录</p></div></div>
              <div class="fo-bili-actions"><button type="button" class="primary" @click="dispatch('organizer-open')">返回收藏夹</button><button type="button" @click="cacheSettingsOpen = true">缓存设置</button></div>
            </header>
            <div v-if="organizer.cacheLoading" class="fo-bili-loading"><i></i><span>正在读取本地缓存…</span></div>
            <div v-else class="fo-bili-grid fo-favorites-grid fo-cached-video-grid" :style="{ '--favorite-columns': gridColumns }">
              <p v-if="!organizer.cachedVideos.length" class="fo-bili-empty">还没有缓存视频。可从视频卡片的“更多操作”中选择“缓存视频”。</p>
              <article v-for="item in pagedCachedVideos" :key="item.id" class="fo-bili-card fo-cached-video-card">
                <div class="fo-bili-thumb"><button class="fo-cached-play" type="button" @click="dispatch('cache-play', item.id)"><img loading="lazy" referrerpolicy="no-referrer" :src="item.cover" alt="" /><span class="fo-cached-local-badge">LOCAL</span></button></div>
                <div class="fo-bili-title-row"><button class="fo-title-link fo-bili-title fo-cached-title" type="button" @click="dispatch('cache-play', item.id)">{{ item.title }}</button><button class="fo-card-more" type="button" aria-label="删除缓存" @click="dispatch('cache-delete', item.id)">×</button></div>
                <div class="fo-bili-meta"><span>{{ item.sizeText }}</span><span>缓存于 {{ item.cachedDate }}</span></div>
              </article>
            </div>
            <div v-if="cacheTotalPages > 1" class="fo-pager"><button type="button" class="fo-btn" :disabled="cachePage <= 1" @click="cachePage--">‹ 上一页</button><span class="fo-page-num">{{ cachePage }} / {{ cacheTotalPages }}</span><button type="button" class="fo-btn" :disabled="cachePage >= cacheTotalPages" @click="cachePage++">下一页 ›</button></div>
            </template>
          </section>
          <section v-else-if="organizer.mode === 'recommendations'" id="fo-vue-recommend-main" ref="organizerMain" class="fo-bili-main">
            <header class="fo-bili-hero">
              <div class="fo-bili-cover fo-vue-recommend-cover"><span>✨</span></div>
              <div class="fo-bili-heading"><div class="fo-feed-hero-title"><h3>{{ organizer.specialTitle }}</h3></div><p>{{ organizer.specialSubtitle }}</p></div>
                <!-- 🌟 居中放置的 B站搜索（带热门推荐与实时视频联想下拉浮层） -->
                <div class="card-fullscreen-bili-search fo-hero-bili-search" ref="searchHostRef">
                  <form class="card-fullscreen-bili-searchbar" role="search" @submit.prevent="onSearchSubmit">
                    <input
                      v-model="biliSearchQuery"
                      type="search"
                      autocomplete="off"
                      :placeholder="t('bili.workspace.searchPlaceholder')"
                      :aria-label="t('bili.workspace.searchAria')"
                      @focus="onSearchFocus"
                      @input="onSearchInputChange"
                    />
                    <button type="submit" :title="t('bili.workspace.searchBtnTip')">⌕</button>
                  </form>

                  <div
                    v-if="isSearchSuggestVisible"
                    class="card-fullscreen-bili-suggestions"
                    role="listbox"
                  >
                    <div class="card-fullscreen-bili-suggest-head">
                      <span>{{ searchSuggestHeadTitle }}</span>
                      <small>{{ searchSuggestHeadSubtitle }}</small>
                    </div>
                    <p v-if="isSearchLoading" class="card-fullscreen-bili-suggest-status">正在获取推荐 / 搜索中…</p>
                    <p v-else-if="!searchSuggestResults.length && !isSearchLoading" class="card-fullscreen-bili-suggest-status">暂无联想结果，按回车在插件内搜索</p>
                    <template v-else>
                      <button
                        v-for="item in searchSuggestResults"
                        :key="item.bvid || item.aid"
                        type="button"
                        class="card-fullscreen-bili-video-row"
                        role="option"
                        @click="openVideoItem(item)"
                        @contextmenu.prevent="openSuggestContextMenu($event, item)"
                      >
                        <span class="card-fullscreen-bili-thumb">
                          <img :src="item.cover" alt="" referrerpolicy="no-referrer" loading="lazy" />
                          <i v-if="item.durationText">{{ item.durationText }}</i>
                        </span>
                        <span class="card-fullscreen-bili-video-copy">
                          <strong>{{ item.title }}</strong>
                          <small>{{ item.upper }} · {{ item.playText }}播放</small>
                        </span>
                      </button>
                    </template>
                  </div>
                </div>

              <div class="fo-bili-actions"><button type="button" @click="dispatch('organizer-open')">返回收藏夹</button></div>
            </header>
              <template v-if="searchPageOpen">
                <div class="fo-bili-toolbar">
                  <div class="fo-bili-sort"><span class="fo-vue-feed-label">搜索结果：{{ searchPageKeyword }}</span></div>
                  <div class="fo-bili-actions"><button type="button" @click="closeSearchPage">返回个性推荐</button></div>
                </div>
                <div v-if="searchPageLoading" class="fo-bili-loading" role="status"><i></i><span>正在搜索 B站视频…</span></div>
                <div v-else-if="searchPageError" class="fo-bili-empty" role="alert">
                  <p>{{ searchPageError }}</p>
                  <button type="button" class="fo-btn" @click="loadSearchPage(searchPageKeyword, searchPageNumber)">重试</button>
                </div>
                <template v-else>
                  <div class="fo-bili-grid">
                    <p v-if="!searchPageResults.length" class="fo-bili-empty">没有找到相关视频，换个关键词试试。</p>
                    <article v-for="item in searchPageResults" :key="item.bvid || item.aid" class="fo-bili-card" @contextmenu.prevent.stop="openSuggestContextMenu($event, item)">
                      <div class="fo-bili-thumb">
                        <a class="fo-cover-link" :href="`https://www.bilibili.com/video/${item.bvid || `av${item.aid}`}`" @click.prevent="openVideoItem(item)"><img loading="lazy" decoding="async" referrerpolicy="no-referrer" :src="item.cover" alt="" /></a>
                        <span class="fo-bili-count">▣ {{ item.playText }}</span><span class="fo-bili-duration">{{ item.durationText }}</span>
                      </div>
                      <div class="fo-bili-title-row"><a class="fo-title-link fo-bili-title" :href="`https://www.bilibili.com/video/${item.bvid || `av${item.aid}`}`" @click.prevent="openVideoItem(item)">{{ item.title }}</a></div>
                      <div class="fo-bili-meta"><span>{{ item.upper }}</span></div>
                    </article>
                  </div>
                  <div v-if="searchPageNumber > 1 || searchPageHasNext" class="fo-pager">
                    <button type="button" class="fo-btn" :disabled="searchPageNumber <= 1" @click="loadSearchPage(searchPageKeyword, searchPageNumber - 1)">‹ 上一页</button>
                    <span class="fo-page-num">{{ searchPageNumber }}{{ searchPageTotal ? ` / ${searchPageTotal}` : '' }}</span>
                    <button type="button" class="fo-btn" :disabled="!searchPageHasNext" @click="loadSearchPage(searchPageKeyword, searchPageNumber + 1)">下一页 ›</button>
                  </div>
                </template>
              </template>
              <template v-else>
            <div class="fo-bili-toolbar"><div class="fo-bili-sort"><span class="fo-vue-feed-label">🔥 猜你喜欢与热门精选</span></div><div class="fo-feed-count-tag">本页共 {{ organizer.specialVideos.length }} 个视频</div></div>
            <div v-if="organizer.specialLoading" class="fo-bili-loading"><i></i><span>正在加载个性化推荐视频…</span></div>
            <p v-else-if="organizer.specialError" class="fo-bili-empty">{{ organizer.specialError }}</p>
            <div v-else class="fo-bili-grid fo-favorites-grid" :style="{ '--favorite-columns': gridColumns }">
              <p v-if="!organizer.specialVideos.length" class="fo-bili-empty">暂无推荐视频。</p>
              <article v-for="video in organizer.specialVideos" :key="video.id" class="fo-bili-card">
                <div class="fo-bili-thumb"><a class="fo-cover-link" draggable="false" :href="video.url" target="_blank" rel="noreferrer" @click.prevent="dispatch('special-play-video', video)"><img draggable="false" loading="lazy" decoding="async" referrerpolicy="no-referrer" :src="video.cover ? video.cover.replace(/^http:/, 'https:') : ''" alt="" /></a><span class="fo-bili-count">▣ {{ video.playCount }}</span><span class="fo-bili-duration">{{ video.duration }}</span></div>
                <div class="fo-bili-title-row"><a class="fo-title-link fo-bili-title" :href="video.url" target="_blank" rel="noreferrer" @click.prevent="dispatch('special-play-video', video)">{{ video.title }}</a><button class="fo-card-more" type="button" aria-label="更多操作" :aria-expanded="openMenuId === video.id" @click.stop="toggleVideoMenu(video.id)">⋮</button><div v-if="openMenuId === video.id" class="fo-card-menu">
                      <button type="button" @click="dispatch('special-video-action', { video, id: video.id, action: 'collect-inbox' }); openMenuId = ''">📥 添加到收集箱</button>
                      <button type="button" @click="dispatch('special-video-action', { id: video.id, action: 'play' }); openMenuId = ''">本地播放与评论</button>
                      <button type="button" @click="dispatch('special-video-action', { id: video.id, action: 'subtitle' }); openMenuId = ''">字幕提取</button>
                      <button type="button" @click="dispatch('special-video-action', { id: video.id, action: 'cache' }); openMenuId = ''">缓存视频</button>
                      <button type="button" @click="dispatch('special-video-action', { id: video.id, action: 'open' }); openMenuId = ''">打开网页</button>
                    </div></div>
                <div class="fo-bili-meta">
                  <span
                    class="fo-bili-author clickable"
                    title="点击查看 UP 主详情与近期投稿"
                    @click.stop.prevent="openUpPreview($event, { mid: video.authorMid, name: video.author, face: video.authorFace })"
                  >{{ video.author }}</span>
                  <span>{{ video.favoriteDate }}</span>
                </div>
              </article>
            </div>
            <div class="fo-pager"><button type="button" class="fo-btn" :disabled="organizer.specialLoading || organizer.specialPage <= 1" @click="dispatch('recommendations-page', organizer.specialPage - 1)">‹ 上一页</button><span class="fo-page-num">第 {{ organizer.specialPage }} 页</span><button type="button" class="fo-btn" :disabled="organizer.specialLoading" @click="dispatch('recommendations-page', organizer.specialPage + 1)">下一页 ›</button></div>
            </template>
          </section>
          <section v-else-if="organizer.mode === 'following'" id="fo-vue-following-main" ref="organizerMain" class="fo-bili-main">
            <header class="fo-bili-hero fo-following-hero">
              <div class="fo-bili-cover fo-vue-following-cover"><span>📺</span></div>
              <div class="fo-bili-heading"><div class="fo-feed-hero-title"><h3>{{ organizer.specialTitle }}</h3><span v-if="organizer.specialBadge !== `第 ${organizer.specialPage} 页`" class="fo-feed-badge">{{ organizer.specialBadge }}</span></div><p>{{ organizer.specialSubtitle }}</p></div>
              <div class="fo-up-groups-bar">
                <div class="fo-up-groups-list" @wheel="onFollowingGroupsWheel"><button v-for="group in organizer.followingGroups" :key="group.id" type="button" class="fo-up-group-chip" :class="{ active: group.active }" @click="dispatch('following-group', group.id)">{{ group.child ? '↳ ' : '' }}{{ group.name }} <small class="count">{{ group.count }}</small></button></div>
                <div class="fo-up-groups-actions"><button id="bili-following-up-group-manager" type="button" :title="t('bili.workspace.upGroupManagerTip')" @click="dispatch('manage-up-groups')">{{ t('bili.workspace.upGroupManager') }}</button></div>
              </div>
              <div class="fo-bili-actions"><button type="button" @click="dispatch('organizer-open')">返回收藏夹</button></div>
            </header>
            <div v-if="organizer.followingMembers.length" class="fo-up-members-strip">
              <div class="fo-up-members-label"><b>{{ organizer.specialBadge }}</b><small>共 {{ organizer.followingMembers.length }} 位 UP 主</small></div>
              <div class="fo-up-members-list"><button type="button" class="fo-up-member-chip" :class="{ active: !organizer.followingMembers.some(item => item.active) }" @click="dispatch('following-member', '')">全部UP</button><button v-for="member in organizer.followingMembers" :key="member.id" type="button" class="fo-up-member-chip" :class="{ active: member.active }" :title="`左键筛选「${member.name}」，右键预览近期投稿`" @click="dispatch('following-member', member.id)" @contextmenu.prevent="dispatch('following-preview-member', { id: member.id, clientX: $event.clientX, clientY: $event.clientY })"><img v-if="member.face" loading="lazy" referrerpolicy="no-referrer" :src="member.face" alt="" /><span>{{ member.name }}</span></button></div>
              <button type="button" class="fo-btn-manage-members" @click="dispatch('following-manage-groups', 'members')">＋ 管理成员</button>
            </div>
            <div class="fo-bili-toolbar"><div class="fo-bili-sort"><span class="fo-vue-feed-label">⚡ UP 主最新投稿动态</span></div><div class="fo-feed-count-tag">本页共 {{ organizer.specialVideos.length }} 个视频</div></div>
            <div v-if="organizer.specialLoading" class="fo-bili-loading"><i></i><span>正在读取关注 UP 主更新…</span></div>
            <p v-else-if="organizer.specialError" class="fo-bili-empty">{{ organizer.specialError }}</p>
            <div v-else class="fo-bili-grid fo-favorites-grid" :style="{ '--favorite-columns': gridColumns }">
              <p v-if="!organizer.specialVideos.length" class="fo-bili-empty">暂无最新关注视频动态。</p>
              <article v-for="video in organizer.specialVideos" :key="video.id" class="fo-bili-card">
                <div class="fo-bili-thumb"><a class="fo-cover-link" draggable="false" :href="video.url" target="_blank" rel="noreferrer" @click.prevent="dispatch('special-play-video', video)"><img draggable="false" loading="lazy" decoding="async" referrerpolicy="no-referrer" :src="video.cover" alt="" /></a><span class="fo-bili-count">▣ {{ video.playCount }}</span><span class="fo-bili-duration">{{ video.duration }}</span></div>
                <div class="fo-bili-title-row"><a class="fo-title-link fo-bili-title" :href="video.url" target="_blank" rel="noreferrer" @click.prevent="dispatch('special-play-video', video)">{{ video.title }}</a><button class="fo-card-more" type="button" aria-label="更多操作" :aria-expanded="openMenuId === video.id" @click.stop="toggleVideoMenu(video.id)">⋮</button><div v-if="openMenuId === video.id" class="fo-card-menu"><button type="button" @click="dispatch('special-video-action', { video, id: video.id, action: 'play' }); openMenuId = ''">本地播放与评论</button><button type="button" @click="dispatch('special-video-action', { video, id: video.id, action: 'subtitle' }); openMenuId = ''">字幕提取</button><button type="button" @click="dispatch('special-video-action', { video, id: video.id, action: 'cache' }); openMenuId = ''">缓存视频</button><button type="button" @click="dispatch('special-video-action', { video, id: video.id, action: 'open' }); openMenuId = ''">打开网页</button></div></div>
                <div class="fo-bili-meta">
                  <span
                    class="fo-bili-author clickable"
                    title="点击查看 UP 主详情与近期投稿"
                    @click.stop.prevent="openUpPreview($event, { mid: video.authorMid, name: video.author, face: video.authorFace })"
                  >{{ video.author }}</span>
                  <span>{{ video.favoriteDate }}</span>
                </div>
              </article>
            </div>
            <div class="fo-pager"><button type="button" class="fo-btn" :disabled="organizer.specialLoading || organizer.specialPage <= 1" @click="dispatch('following-page', organizer.specialPage - 1)">‹ 上一页</button><span class="fo-page-num">第 {{ organizer.specialPage }} 页</span><button type="button" class="fo-btn" :disabled="organizer.specialLoading || !organizer.followingHasMore" @click="dispatch('following-page', organizer.specialPage + 1)">下一页 ›</button></div>
          </section>
          <section v-else-if="organizer.mode === 'subscription'" id="fo-vue-subscription-main" class="fo-bili-main fo-vue-subscription-main">
            <div class="bili-sub-vue-shell">
              <div v-if="organizer.subscriptionLoading" class="fo-bili-loading"><i></i><span>正在读取视频与 AI 字幕稿…</span></div>
              <p v-else-if="organizer.subscriptionError" class="fo-bili-empty">读取失败：{{ organizer.subscriptionError }}</p>
              <div v-else-if="!organizer.subscriptionCurrent && !organizer.subscriptionChannels.length" class="fo-bili-empty">暂无正在播放的视频。</div>
              <BiliSubscriptionPlayer v-else />
            </div>
          </section>
          <section v-else-if="organizer.mode === 'radio'" id="fo-vue-radio-main" class="fo-bili-main fo-vue-radio-main">
            <header class="fo-bili-hero fo-radio-hero">
              <div class="fo-hero-left">
                <div class="fo-bili-cover fo-vue-radio-cover" :class="{ spinning: radioTapeState.playing }"><span>📻</span></div>
                <div class="fo-hero-folder-info">
                  <div class="fo-radio-title-line">
                    <h3>B站电台</h3>
                    <span v-if="radioTapeState.active" class="fo-radio-live-pill" :class="{ playing: radioTapeState.playing }">
                      <i class="eq-bars" aria-hidden="true"><b /><b /><b /></i>
                      <span>{{ radioTapeState.playing ? '正在播' : '已暂停' }} · {{ radioTapeState.title }}</span>
                    </span>
                  </div>
                  <p>直接选择左侧 B 站收藏夹与视频播放音频，支持封面舞台上下曲切换与跨刷新不断声</p>
                </div>
              </div>
              <div class="fo-bili-actions">
                <button type="button" @click="dispatch('organizer-open')">← 返回收藏夹</button>
              </div>
            </header>
            <div class="bili-radio-layout fo-vue-radio-layout">
              <aside class="bili-radio-folders">
                <p class="sw-title">收藏夹</p>
                <div id="bili-radio-folders">
                  <button
                    v-for="folder in biliFavoritesState.radioFolders"
                    :key="folder.id"
                    type="button"
                    class="bili-radio-folder"
                    :class="{ on: activeRadioSourceMode === 'folder' && folder.id === biliFavoritesState.radioActiveFolderId }"
                    @click="selectRadioFolder(folder.id)"
                  >
                    <span>{{ folder.title }}</span>
                    <span>{{ folder.count }}</span>
                  </button>
                  <p v-if="!biliFavoritesState.radioFolders.length" class="muted small">{{ biliFavoritesState.radioLoading ? '加载中…' : '暂无收藏夹' }}</p>
                </div>
              </aside>
              <section class="bili-radio-library">
                <div class="bili-radio-library-head">
                  <p id="bili-radio-library-title" class="sw-title">收藏夹视频</p>
                  <div v-if="radioTotalPages > 1" class="bili-radio-lib-pager">
                    <button type="button" :disabled="radioLibraryPage <= 1" aria-label="上一页" @click="radioLibraryPage--">‹</button>
                    <span>{{ radioLibraryPage }} / {{ radioTotalPages }}</span>
                    <button type="button" :disabled="radioLibraryPage >= radioTotalPages" aria-label="下一页" @click="radioLibraryPage++">›</button>
                  </div>
                </div>
                <p v-if="biliFavoritesState.radioError" role="alert" class="muted small">{{ biliFavoritesState.radioError }}</p>
                <div id="bili-radio-videos" class="bili-radio-videos two-col bili-radio-card-grid">
                  <article
                    v-for="video in pagedRadioVideos"
                    :key="video.bvid"
                    class="fo-bili-card bili-radio-card"
                    :class="{ 'is-playing': featuredRadioTrack?.bvid === video.bvid && isFeaturedTrackCurrent }"
                    :title="`${video.title} (点击直接播放，点击 ♥ 喜欢)`"
                    @click="playFolderTrack(video)"
                  >
                    <div class="fo-bili-thumb">
                      <img v-if="video.cover" :src="video.cover" alt="" loading="lazy" referrerpolicy="no-referrer" />
                      <span v-else class="bili-radio-cover-ph"></span>
                      <span v-if="formatRadioDuration(video.duration)" class="fo-bili-duration">{{ formatRadioDuration(video.duration) }}</span>
                    </div>
                    <div class="bili-radio-card-body">
                      <div class="fo-bili-title-row">
                        <span class="fo-title-link fo-bili-title">{{ video.title }}</span>
                        <button
                          type="button"
                          class="fo-card-more bili-radio-like-btn"
                          :class="{ liked: biliRadioController.isLiked(video.bvid) }"
                          :title="biliRadioController.isLiked(video.bvid) ? '取消喜欢' : '添加到我喜欢的电台'"
                          :aria-label="biliRadioController.isLiked(video.bvid) ? '取消喜欢' : '喜欢'"
                          @click.stop="void biliRadioController.toggleLike(video)"
                        >
                          {{ biliRadioController.isLiked(video.bvid) ? '♥' : '♡' }}
                        </button>
                      </div>
                      <div class="fo-bili-meta">
                        <span>{{ video.author || 'Bilibili' }}</span>
                        <span v-if="featuredRadioTrack?.bvid === video.bvid && isFeaturedTrackCurrent" class="bili-radio-in-queue-tag">♪ 播放中</span>
                        <span v-else class="bili-radio-hint-add">▶ 播放</span>
                      </div>
                    </div>
                  </article>
                  <p v-if="!biliFavoritesState.radioVideos.length" class="muted small">{{ biliFavoritesState.radioLoading ? '读取视频中…' : '此收藏夹暂无可播放视频' }}</p>
                </div>
              </section>
              <section class="bili-radio-editor">
                <div class="bili-radio-name-row">
                  <button
                    type="button"
                    class="bili-radio-liked-pill"
                    :class="{ active: activeRadioSourceMode === 'liked' }"
                    title="播放「我喜欢的电台」中收藏的视频"
                    @click="openLikedRadioCollection"
                  >
                    <span class="heart">♥</span>
                    <span>我喜欢的电台</span>
                    <small>{{ likedRadioCount }}</small>
                  </button>
                  <span class="bili-radio-folder-chip" :title="activeRadioSourceLabel">
                    📂 {{ activeRadioSourceLabel }}（{{ radioCoverTrackList.length }}）
                  </span>
                </div>
                <div class="bili-radio-cover-stage" aria-label="电台封面播放器">
                  <template v-if="featuredRadioTrack">
                    <div
                      v-if="featuredRadioTrack.cover"
                      class="bili-radio-stage-backdrop"
                      :style="{ backgroundImage: `url('${featuredRadioTrack.cover}')` }"
                    />
                    <div class="bili-radio-stage-body">
                      <button
                        type="button"
                        class="bili-radio-stage-cover-btn"
                        :class="{ playing: isFeaturedTrackPlaying }"
                        :title="isFeaturedTrackPlaying ? '暂停播放' : '点击播放当前封面曲目'"
                        @click="togglePlayFeaturedRadioTrack"
                      >
                        <img
                          v-if="featuredRadioTrack.cover"
                          :src="featuredRadioTrack.cover"
                          :alt="featuredRadioTrack.title"
                          referrerpolicy="no-referrer"
                        />
                        <span v-else class="bili-radio-cover-ph bili-radio-stage-ph">📻</span>
                        <span class="bili-radio-stage-cover-overlay">
                          <span class="bili-radio-stage-play-pill">
                            {{ isFeaturedTrackCurrent && radioTapeState.loading ? '读取音轨…' : isFeaturedTrackPlaying ? '⏸ 暂停' : '▶ 播放' }}
                          </span>
                        </span>
                        <span v-if="isFeaturedTrackPlaying" class="bili-radio-stage-live-badge">♪ 播放中</span>
                        <span v-else-if="formatRadioDuration(featuredRadioTrack.duration)" class="fo-bili-duration">{{ formatRadioDuration(featuredRadioTrack.duration) }}</span>
                      </button>

                      <div class="bili-radio-stage-meta">
                        <h4 class="bili-radio-stage-title" :title="featuredRadioTrack.title">{{ featuredRadioTrack.title }}</h4>
                        <div class="bili-radio-stage-sub">
                          <span>{{ featuredRadioTrack.author || 'Bilibili' }}</span>
                          <span class="dot">·</span>
                          <span>{{ activeRadioSourceLabel }}</span>
                          <span v-if="featuredTrackPositionText" class="count-pill">{{ featuredTrackPositionText }}</span>
                        </div>
                        <div v-if="isFeaturedTrackCurrent" class="bili-radio-stage-progress">
                          <div class="bili-radio-stage-bar">
                            <span :style="{ width: `${radioTapeState.progressPercent || 0}%` }" />
                          </div>
                          <div class="bili-radio-stage-time">
                            <span>{{ radioTapeState.formattedCurrent }}</span>
                            <span>{{ radioTapeState.formattedDuration }}</span>
                          </div>
                        </div>
                      </div>

                      <div class="bili-radio-stage-controls" role="group" aria-label="封面播放器控制">
                        <button
                          type="button"
                          class="bili-radio-ctrl-btn"
                          :disabled="radioCoverTrackList.length <= 1"
                          title="文件夹上一首"
                          aria-label="文件夹上一首"
                          @click="stepRadioFolderTrack(-1)"
                        >
                          ⏮
                        </button>
                        <button
                          type="button"
                          class="bili-radio-ctrl-btn primary"
                          :title="isFeaturedTrackPlaying ? '暂停' : '播放'"
                          :aria-label="isFeaturedTrackPlaying ? '暂停' : '播放'"
                          @click="togglePlayFeaturedRadioTrack"
                        >
                          {{ isFeaturedTrackPlaying ? '⏸' : '▶' }}
                        </button>
                        <button
                          type="button"
                          class="bili-radio-ctrl-btn"
                          :disabled="radioCoverTrackList.length <= 1"
                          title="文件夹下一首"
                          aria-label="文件夹下一首"
                          @click="stepRadioFolderTrack(1)"
                        >
                          ⏭
                        </button>
                        <button
                          type="button"
                          class="bili-radio-ctrl-btn like"
                          :class="{ liked: biliRadioController.isLiked(featuredRadioTrack.bvid) }"
                          :title="biliRadioController.isLiked(featuredRadioTrack.bvid) ? '取消喜欢' : '添加到我喜欢的电台'"
                          :aria-label="biliRadioController.isLiked(featuredRadioTrack.bvid) ? '取消喜欢' : '喜欢'"
                          @click="void biliRadioController.toggleLike(featuredRadioTrack)"
                        >
                          {{ biliRadioController.isLiked(featuredRadioTrack.bvid) ? '♥' : '♡' }}
                        </button>
                      </div>
                    </div>
                  </template>
                  <p v-else class="muted small bili-radio-queue-empty">
                    {{ biliFavoritesState.radioLoading ? '正在读取收藏夹封面…' : '选择左侧 B 站收藏夹，即可显示封面并直接连播。' }}
                  </p>
                </div>
                <div class="bili-radio-actions">
                  <button id="bili-radio-play" type="button" :disabled="!radioCoverTrackList.length" @click="handleRadioPlayAction(false)">▶ 顺序播放</button>
                  <button id="bili-radio-shuffle" type="button" :disabled="!radioCoverTrackList.length" @click="handleRadioPlayAction(true)">🔀 随机播放</button>
                </div>
              </section>
            </div>
          </section>
        </div>
      </div>
    </div>

    <!-- 兼容性保留占位节点，避免第三方脚本找不到 ID，内部不再重复实例化 BiliSubscriptionPlayer -->
    <div class="fm-pane" id="pane-sub-video" hidden style="display:none !important;"></div>

    <BiliOrganizerDialogs />
    <BiliUpGroupManager />

    <!-- 独立的卡片右键菜单 -->
    <div
      v-if="contextMenu.visible && contextMenu.video"
      ref="videoMenuRef"
      class="fo-context-menu"
      role="menu"
      :style="videoMenuStyle"
      @click.stop
    >
      <div class="fo-context-header" :title="contextMenu.video.title">{{ contextMenu.video.title }}</div>
      <div class="fo-context-divider"></div>
      <button type="button" class="fo-context-item" @click="runContextMenuAction('play')">
        <span class="fo-context-icon">▶</span> 小窗播放视频
      </button>
      <div class="fo-context-divider"></div>
      <button v-if="contextMenu.video.writable" type="button" class="fo-context-item danger" @click="runContextMenuAction('delete')">
        <span class="fo-context-icon">🗑</span> 取消收藏
      </button>
      <button v-if="contextMenu.video.writable" type="button" class="fo-context-item" @click="runContextMenuAction('move')">
        <span class="fo-context-icon">📁</span> 移动到…
      </button>
      <div v-if="contextMenu.video.writable" class="fo-context-divider"></div>
      <button type="button" class="fo-context-item" @click="runContextMenuAction('open')">
        <span class="fo-context-icon">↗</span> 跳转到 B站
      </button>
      <button type="button" class="fo-context-item" @click="runContextMenuAction('copy-link')">
        <span class="fo-context-icon">📋</span> 复制链接
      </button>
      <button type="button" class="fo-context-item" @click="runContextMenuAction('cache')">
        <span class="fo-context-icon">💾</span> 缓存视频
      </button>
      <button type="button" class="fo-context-item" @click="runContextMenuAction('add-radio')">
        <span class="fo-context-icon">📻</span> 添加到电台
      </button>
      <div class="fo-context-divider"></div>
      <button type="button" class="fo-context-item" @click="runContextMenuAction('create-task')">
        <span class="fo-context-icon">📋</span> 创建任务
      </button>
      <button type="button" class="fo-context-item" @click="runContextMenuAction('subtitle')">
        <span class="fo-context-icon">▤</span> 字幕转文本
      </button>
    </div>


  </section>
</template>

<style scoped src="./BiliFavorites.css"></style>
