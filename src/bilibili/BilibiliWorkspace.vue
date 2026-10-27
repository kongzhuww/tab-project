<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { biliFavoritesController, biliFavoritesState, type BiliOrganizerFolderView, type BiliOrganizerVideoView } from "./bili-favorites-store";
import { biliMiniPlayerController, biliMiniPlayerState } from "./mini-player-store";
import { subtitleModalController } from "./subtitle-modal-store";
import { fullscreenCardState } from "../core/fullscreen-cards.store";
import { useCardActivity } from "../core/useCardActivity";
import BiliSubscriptionHeader from "./BiliSubscriptionHeader.vue";
import BiliSubscriptionTranscript from "./BiliSubscriptionTranscript.vue";
import BiliSubscriptionPlayer from "./BiliSubscriptionPlayer.vue";
import BiliOrganizerDialogs from "./BiliOrganizerDialogs.vue";
import BiliUpGroupManager from "./BiliUpGroupManager.vue";
import BiliRadioTapePlayer from "./BiliRadioTapePlayer.vue";
import BiliVideoLyricDockBar from "./BiliVideoLyricDockBar.vue";
import { radioTapeState } from "./radio-tape-store";
import { biliMessagePanelController, biliMessagePanelState } from "./message-panel-store";
import { bilibiliChannelService } from "../services/bilibili-channel.service";
import { useContextMenu } from "../sdk/interactions";
import { notifications } from "../sdk/notifications";
import { appDialog } from "../core/app-dialog.store";
import { chatService } from "../chat/chat.service";
import ChatShareMenu from "../chat/ChatShareMenu.vue";
import type { ChatShareTarget } from "../chat/private-chat-client";
import { chatModuleState } from "../chat/chat-state";

const isSeriesNameError = ref(false);

function handleSaveSeries() {
  const name = biliFavoritesState.radioSeriesName?.trim();
  if (!name) {
    isSeriesNameError.value = true;
    const seriesInput = document.getElementById("bili-radio-name") as HTMLInputElement | null;
    if (seriesInput) {
      seriesInput.focus();
    }
    notifications.fetch("哔哩哔哩电台", "请先在输入框中填写系列名称后再保存");
    return;
  }
  isSeriesNameError.value = false;
  dispatch("radio-save", { name });
}

async function handleRenameCurrentSeries() {
  const seriesInput = document.getElementById("bili-radio-name") as HTMLInputElement | null;
  if (seriesInput) {
    seriesInput.focus();
    seriesInput.select();
    notifications.fetch("哔哩哔哩电台", "已聚焦系列名称输入框，直接修改后点击“💾 保存系列”即可");
  }
}

function handleShareCurrentSeries() {
  const currentName = biliFavoritesState.radioSeriesName?.trim();
  let series = biliFavoritesState.radioSeries.find((s) => s.name === currentName);
  if (!series && biliFavoritesState.radioQueue.length) {
    series = {
      id: `series_${Date.now()}`,
      name: currentName || "未命名电台系列",
      count: biliFavoritesState.radioQueue.length,
      items: biliFavoritesState.radioQueue
    };
  }
  if (!series || !series.items?.length) {
    notifications.fetch("哔哩哔哩电台", "当前没有可分享的系列曲目，请先添加曲目");
    return;
  }
  chatService.sendBiliSeriesShare(series);
  chatModuleState.visible = true;
  notifications.fetch("哔哩哔哩电台", `已将系列「${series.name}」分享至海狸聊天室！`);
}

function handleSeriesDropdownChange(e: Event) {
  const target = e.target as HTMLSelectElement;
  const val = target.value;
  if (!val) return;
  if (val === "__create_new__") {
    dispatch("radio-clear");
    biliFavoritesState.radioSeriesName = "";
    notifications.fetch("哔哩哔哩电台", "已开启新系列创作，请从左侧添加视频");
    target.value = "";
    return;
  }
  dispatch("radio-load-series", val);
}

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
const searchQuery = ref(organizer.value.query);
const initialOrganizerRetryDone = ref(false);
const vueOrganizerMounted = ref(false);
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

function dispatch(action: Parameters<typeof biliFavoritesController.dispatch>[0], payload?: unknown): void {
  biliFavoritesController.dispatch(action, payload);
}

function selectFolder(folder: BiliOrganizerFolderView): void {
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
  if (organizer.value.mode === "organizer") {
    dispatch("organizer-search", searchQuery.value.trim());
  }
}

// 头部高级搜索（移至右侧，具备热搜推荐与实时视频联想下拉浮层）
const biliSearchQuery = ref("");
const isSearchSuggestVisible = ref(false);
const isSearchLoading = ref(false);
const searchSuggestHeadTitle = ref("📺 B站 热门视频推荐");
const searchSuggestHeadSubtitle = ref("回车可在 B站 全网搜索");
const searchSuggestResults = ref<any[]>([]);
const searchHostRef = ref<HTMLElement | null>(null);

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
  const upper = item.owner?.name || item.name || item.author || "UP主";

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
  searchSuggestHeadTitle.value = "📺 B站 热门视频推荐";
  searchSuggestHeadSubtitle.value = "回车可在 B站 全网搜索";
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
  isSearchSuggestVisible.value = true;
  searchSuggestHeadTitle.value = `🔍 “${keyword}” 的视频`;
  searchSuggestHeadSubtitle.value = "右键可收藏、缓存或本地播放";
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
    if (biliSearchQuery.value.trim() !== keyword) return;
    const rawVideos = Array.isArray(data?.data?.result) ? data.data.result : [];
    searchSuggestResults.value = rawVideos.slice(0, 10).map(formatBiliRawVideo).filter(Boolean);
  } catch {
    searchSuggestResults.value = [];
  } finally {
    isSearchLoading.value = false;
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

function onSearchSubmit(): void {
  const q = biliSearchQuery.value.trim();
  isSearchSuggestVisible.value = false;
  if (!q) {
    loadRecommendations();
    return;
  }
  window.open(`https://search.bilibili.com/video?keyword=${encodeURIComponent(q)}`, "_blank");
}

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

function retryOrganizerAfterMount(): void {
  if (!vueOrganizerMounted.value || initialOrganizerRetryDone.value || organizer.value.loading) return;
  // 确保在主页挂载后直接加载收藏夹数据
  initialOrganizerRetryDone.value = true;
  dispatch("organizer-open");
}

watch(() => organizer.value.loading, (loading) => {
  if (!loading && !organizer.value.folders.length) retryOrganizerAfterMount();
});

onMounted(() => {
  void import("../services/bilibili-channel.service").catch((error) =>
    console.error("[Bilibili] 频道动作服务加载失败", error));
  vueOrganizerMounted.value = true;
  void biliFavoritesController.loadOrganizer();
  retryOrganizerAfterMount();
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
  vueOrganizerMounted.value = false;
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
  if (action === "share-chat") {
    if (!video) return;
    try {
      const { chatService } = await import("../chat/chat.service");
      const { windowManagerController } = await import("../core/window-manager.store");
      chatService.sendBiliShare({
        bvid: video.bvid || (video.aid ? `av${video.aid}` : ""),
        aid: video.aid,
        title: video.title,
        cover: video.cover,
        upName: video.author,
        upMid: video.authorMid,
        upFace: video.authorFace,
        play: video.playCount
      });
      windowManagerController.open("chat");
    } catch (e) {
      console.warn("分享到聊天室失败", e);
    }
    return;
  }
  if (video) dispatch("organizer-video-action", { id: video.id || "", video, action });
}

function handleShareSeriesToRoom(target: ChatShareTarget) {
  const currentName = biliFavoritesState.radioSeriesName?.trim();
  let series = biliFavoritesState.radioSeries.find((s) => s.name === currentName);
  if (!series && biliFavoritesState.radioQueue.length) {
    series = {
      id: `series_${Date.now()}`,
      name: currentName || "未命名电台系列",
      count: biliFavoritesState.radioQueue.length,
      items: biliFavoritesState.radioQueue
    };
  }
  if (!series || !series.items?.length) {
    notifications.fetch("哔哩哔哩电台", "当前没有可分享的系列曲目，请先添加曲目");
    return;
  }
  chatService.sendBiliSeriesShare(series, target);
}

function handleShareVideoToRoom(target: ChatShareTarget) {
  const { video } = contextMenu.value;
  contextMenu.value.visible = false;
  if (!video) return;
  chatService.sendBiliShare({
    bvid: video.bvid || (video.aid ? `av${video.aid}` : ""),
    aid: video.aid,
    title: video.title,
    cover: video.cover,
    upName: video.author,
    upMid: video.authorMid,
    upFace: video.authorFace,
    play: video.playCount
  }, target);
}

function onLayoutWheel(event: WheelEvent): void {
  if (!organizer.value.isTargetPickMode) return;
  const target = event.target as HTMLElement | null;
  if (!target?.closest(".fo-bili-folder-list")) {
    const folderList = document.querySelector(".fo-bili-folder-list");
    if (folderList) {
      event.preventDefault();
      folderList.scrollTop += event.deltaY;
    }
  }
}

function createCassetteDragGhost(title: string): HTMLElement {
  const ghost = document.createElement("div");
  ghost.style.position = "fixed";
  ghost.style.top = "-9999px";
  ghost.style.left = "-9999px";
  ghost.style.width = "144px";
  ghost.style.height = "50px";
  ghost.style.borderRadius = "6px";
  ghost.style.backgroundColor = "#1e1e24";
  ghost.style.border = "2px solid #eab308";
  ghost.style.boxShadow = "0 8px 24px rgba(0,0,0,0.6), inset 0 0 12px rgba(234,179,8,0.25)";
  ghost.style.display = "flex";
  ghost.style.alignItems = "center";
  ghost.style.padding = "4px 8px";
  ghost.style.gap = "8px";
  ghost.style.color = "#fff";
  ghost.style.fontFamily = "sans-serif";
  ghost.style.zIndex = "999999";
  ghost.style.pointerEvents = "none";
  ghost.innerHTML = `
    <div style="width:26px;height:26px;border-radius:50%;border:1.5px solid #d4d4d8;display:flex;align-items:center;justify-content:center;background:#09090b;box-shadow:inset 0 1px 3px rgba(0,0,0,0.5);">
      <span style="display:block;width:7px;height:7px;background:#eab308;border-radius:50%;"></span>
    </div>
    <div style="flex:1;min-width:0;overflow:hidden;line-height:1.2;">
      <div style="font-size:7.5px;font-weight:900;color:#eab308;letter-spacing:1px;">CASSETTE TAPE</div>
      <div style="font-size:10px;font-weight:700;color:#f4f4f5;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${title || 'B站音乐卡带'}</div>
    </div>
    <div style="width:26px;height:26px;border-radius:50%;border:1.5px solid #d4d4d8;display:flex;align-items:center;justify-content:center;background:#09090b;box-shadow:inset 0 1px 3px rgba(0,0,0,0.5);">
      <span style="display:block;width:7px;height:7px;background:#eab308;border-radius:50%;"></span>
    </div>
  `;
  document.body.appendChild(ghost);
  return ghost;
}

function beginVideoDrag(event: DragEvent, video: BiliOrganizerVideoView): void {
  if (!event.dataTransfer) return;
  event.dataTransfer.effectAllowed = "copyMove";
  event.dataTransfer.setData("text/uri-list", video.url);
  event.dataTransfer.setData("text/plain", video.url);
  event.dataTransfer.setData("application/x-logicweaver-video-url", video.url);
  event.dataTransfer.setData("application/x-logicweaver-task", JSON.stringify({ type: "material", title: video.title, url: video.url, source: "B站收藏" }));

  // 🌟 卡带拖拽专属载荷 (Cassette Payload)
  const bvid = video.bvid || (video.url?.match(/video\/(BV[0-9a-zA-Z]+)/)?.[1]) || video.id;
  const cassettePayload = JSON.stringify({
    type: "bili-cassette-tape",
    bvid,
    title: video.title,
    cover: video.cover,
    author: video.author,
    duration: video.duration
  });
  event.dataTransfer.setData("application/x-bili-cassette", cassettePayload);
  event.dataTransfer.setData("application/json", cassettePayload);

  // 实体卡带幽灵图
  const ghost = createCassetteDragGhost(video.title);
  event.dataTransfer.setDragImage(ghost, 72, 25);
  setTimeout(() => {
    if (ghost.parentNode) ghost.parentNode.removeChild(ghost);
  }, 0);
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

  // 实体卡带幽灵图
  const ghost = createCassetteDragGhost(video.title);
  event.dataTransfer.setDragImage(ghost, 72, 25);
  setTimeout(() => {
    if (ghost.parentNode) ghost.parentNode.removeChild(ghost);
  }, 0);
}
</script>

<template>
  <section id="daily-bilibili" class="card wide" :class="{ 'card-fullscreen': isStandalone || fullscreenCardState.activeId === 'daily-bilibili' }">
    <header class="card-head bili-header-unified-row">
      <div class="bili-header-left">
        <span class="bar" style="background: linear-gradient(180deg,#818cf8,#f472b6)"></span>
        <h2>B站收藏夹</h2>
      </div>


      <div class="bili-header-right">
        <!-- B站互动消息按钮（位于搜索栏左侧） -->
        <button
          id="bili-header-msg-center-btn"
          class="fm-tab bili-header-msg-btn"
          type="button"
          :class="{ 'has-unread': unreadMsgCount > 0, 'is-active': biliMessagePanelState.isOpen }"
          :title="unreadMsgCount > 0 ? `B站互动消息 (${unreadMsgCount} 条未读)` : 'B站互动消息中心'"
          @click="toggleMessagePanel"
        >
          <span class="bili-header-msg-icon">🔔</span>
          <span class="bili-header-msg-label">消息</span>
          <span v-if="unreadMsgCount > 0" class="bili-header-msg-badge">{{ unreadMsgCount > 99 ? '99+' : unreadMsgCount }}</span>
        </button>

        <!-- 移到右侧的高级 B站搜索（带热门推荐与实时视频联想下拉浮层） -->
        <div class="card-fullscreen-bili-search" ref="searchHostRef">
          <form class="card-fullscreen-bili-searchbar" role="search" @submit.prevent="onSearchSubmit">
            <input
              v-model="biliSearchQuery"
              type="search"
              autocomplete="off"
              placeholder="搜索 B站 视频…"
              aria-label="搜索 B站 视频"
              @focus="onSearchFocus"
              @input="onSearchInputChange"
            />
            <button type="submit" title="搜索视频">⌕</button>
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
            <p v-else-if="!searchSuggestResults.length && !isSearchLoading" class="card-fullscreen-bili-suggest-status">没有找到相关视频，回车可在 B站 全网搜索</p>
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

        <!-- 关注分组管理按钮移到右侧，与搜索框在同一行 -->
        <button
          id="bili-up-group-manager-top"
          class="fm-tab bili-header-up-group-btn"
          type="button"
          title="管理正在关注的 UP 主分组"
          @click="dispatch('manage-up-groups')"
        >
          ⚙ 关注分组管理
        </button>
      </div>
    </header>

    <div class="fm-pane" id="pane-organizer">
      <div id="fo-body">
        <div class="fo-bili-layout" :class="{ 'fo-picking-move-target': organizer.isTargetPickMode }" data-vue-organizer-shell="true" @wheel="onLayoutWheel">
          <aside class="fo-bili-sidebar">
            <div
              class="fo-sidebar-toggle-bar"
              :class="{ 'is-collapsed': isFeaturesCollapsed }"
              :title="isFeaturesCollapsed ? '点击展开快捷功能' : '点击收起快捷功能'"
              @click="toggleFeatures"
            >
              <div class="fo-sidebar-toggle-title">
                <span class="fo-sidebar-toggle-icon">⚡</span>
                <span>快捷频道</span>
                <span v-if="isFeaturesCollapsed" class="fo-sidebar-toggle-pill">5</span>
              </div>
              <button
                type="button"
                class="fo-sidebar-toggle-action"
                :aria-expanded="!isFeaturesCollapsed"
                :title="isFeaturesCollapsed ? '展开' : '收起'"
              >
                <span>{{ isFeaturesCollapsed ? '展开' : '收起' }}</span>
                <span class="fo-sidebar-toggle-chevron">{{ isFeaturesCollapsed ? '▾' : '▴' }}</span>
              </button>
            </div>

            <div v-show="!isFeaturesCollapsed" class="fo-sidebar-features-wrap">
              <div class="fo-sidebar-sub-wrap">
                <button id="fo-sidebar-sub-btn" type="button" class="fo-sidebar-sub-btn" :class="{ on: organizer.mode === 'subscription' }" title="查看订阅视频（刹那观察室 · AI字幕与高清播放）" @click="dispatch('open-sub-video')">
                  <div class="fo-sidebar-sub-main"><span class="fo-sidebar-sub-icon">🎬</span><div class="fo-sidebar-sub-text"><strong>订阅视频</strong><small>刹那观察室 · AI字幕</small></div></div>
                  <span class="fo-sidebar-sub-badge">NEW</span>
                </button>
              </div>
              <div class="fo-sidebar-sub-wrap fo-sidebar-cache-wrap">
                <button id="fo-sidebar-cache-btn" type="button" class="fo-sidebar-sub-btn" :class="{ on: organizer.mode === 'cache' }" title="查看已经下载到本地文件夹的视频" @click="dispatch('open-cache')">
                  <div class="fo-sidebar-sub-main"><span class="fo-sidebar-sub-icon">💾</span><div class="fo-sidebar-sub-text"><strong>缓存视频</strong><small>本地文件夹 · 离线观看</small></div></div>
                  <span class="fo-sidebar-sub-badge">LOCAL</span>
                </button>
              </div>
              <div class="fo-sidebar-sub-wrap fo-sidebar-following-wrap">
                <button id="fo-sidebar-following-btn" type="button" class="fo-sidebar-sub-btn" :class="{ on: organizer.mode === 'following' }" title="查看正在关注的 UP 主及分组视频" @click="dispatch('open-following')">
                  <div class="fo-sidebar-sub-main"><span class="fo-sidebar-sub-icon">📺</span><div class="fo-sidebar-sub-text"><strong>正在关注</strong><small>UP 主分组 · 最新投稿</small></div></div>
                  <span class="fo-sidebar-sub-badge">FEED</span>
                </button>
              </div>
              <div class="fo-sidebar-sub-wrap fo-sidebar-recommend-wrap">
                <button id="fo-sidebar-recommend-btn" type="button" class="fo-sidebar-sub-btn" :class="{ on: organizer.mode === 'recommendations' }" title="打开 B站个性推荐" @click="dispatch('open-recommendations')">
                  <div class="fo-sidebar-sub-main"><span class="fo-sidebar-sub-icon">✨</span><div class="fo-sidebar-sub-text"><strong>个性推荐</strong><small>猜你喜欢 · 每次刷新</small></div></div>
                  <span class="fo-sidebar-sub-badge">FOR YOU</span>
                </button>
              </div>
              <div class="fo-sidebar-sub-wrap fo-sidebar-radio-wrap">
                <button id="fo-sidebar-radio-btn" type="button" class="fo-sidebar-sub-btn" :class="{ on: organizer.mode === 'radio' }" title="打开 B站电台（按收藏夹与系列自由编排连播）" @click="dispatch('open-radio')">
                  <div class="fo-sidebar-sub-main"><span class="fo-sidebar-sub-icon">📻</span><div class="fo-sidebar-sub-text"><strong>B站电台</strong><small>连播系列 · 自由编排</small></div></div>
                  <span class="fo-sidebar-sub-badge">RADIO</span>
                </button>
              </div>
            </div>

            <div class="fo-sidebar-favorite-hub">
              <div class="fo-sidebar-sub-main"><span class="fo-sidebar-sub-icon">📁</span><div class="fo-sidebar-sub-text"><strong>收藏夹</strong><small>按本地分组展示</small></div></div>
              <button class="fo-sidebar-hub-add" type="button" title="新建 B站真实收藏夹" aria-label="新建 B站真实收藏夹" @click="dispatch('create-bili-folder')">＋</button>
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

          <section v-if="organizer.mode === 'organizer'" id="fo-vue-main" class="fo-bili-main">
            <div v-if="organizer.loading" class="fo-bili-loading"><i></i><span>正在读取 B站收藏内容…</span></div>
            <div v-else-if="organizer.error && organizer.error.includes('未登录')" class="fo-bili-empty fo-bili-login-guide">
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
            <p v-else-if="organizer.error" class="fo-bili-empty">{{ organizer.error }}</p>
            <template v-else>
              <header class="fo-bili-hero fo-hero-persistent">
                <div class="fo-hero-left">
                  <div class="fo-bili-cover" :class="{ 'fo-vue-cover-image': organizer.folderCover }">
                    <img v-if="organizer.folderCover" :src="organizer.folderCover" alt="" referrerpolicy="no-referrer" />
                    <i v-else class="fo-folder-icon"></i>
                  </div>
                  <div class="fo-hero-folder-info"><h3>{{ organizer.folderTitle }}</h3><p>{{ organizer.folderSubtitle }}</p></div>
                </div>

                <!-- 🌟 放置在收集箱右侧的实时字幕条 (图 1 标准，支持左右拉伸调节宽度) -->
                <BiliVideoLyricDockBar inline-hero />

                <div class="fo-bili-actions">
                  <button type="button" class="primary" :disabled="!organizer.videos.length" @click="dispatch('organizer-batch-toggle')">{{ organizer.batchMode ? '返回' : '批量操作' }}</button>
                  <button type="button" title="刷新收藏夹" @click="dispatch('organizer-refresh')">↻</button>
                </div>
              </header>

              <div class="fo-bili-toolbar">
                <div v-if="!organizer.batchMode" class="fo-bili-sort">
                  <button v-for="item in [{ id: 'fav_time', text: '最近收藏' }, { id: 'view', text: '最多播放' }, { id: 'pubtime', text: '最近投稿' }]" :key="item.id" type="button" :class="{ on: organizer.sort === item.id }" @click="dispatch('organizer-sort', item.id)">{{ item.text }}</button>
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
                  <input v-model="searchQuery" type="search" placeholder="请输入关键词" aria-label="搜索当前收藏夹" /><button type="submit" title="搜索">⌕</button>
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

              <div class="fo-bili-grid">
                <p v-if="!organizer.videos.length" class="fo-bili-empty">{{ organizer.query ? '没有找到匹配的视频。' : '这个收藏夹是空的。' }}</p>
                <article v-for="video in organizer.videos" :key="video.id" class="fo-bili-card" :class="{ 'batch-selected': video.selected, 'fo-single-moving': organizer.movingVideoId === video.id }" :data-batch-id="video.id" draggable="true" @dragstart="beginVideoDrag($event, video)" @contextmenu.prevent.stop="openVideoContextMenu($event, video)">
                  <div class="fo-bili-thumb">
                    <label v-if="organizer.batchMode" class="fo-batch-check" title="选择此视频"><input type="checkbox" :checked="video.selected" @change="dispatch('organizer-batch-select', video.id)" /><span>✓</span></label>
                    <a class="fo-cover-link" :href="video.url" target="_blank" rel="noreferrer" @click.prevent="dispatch('organizer-play-video', video)"><img loading="lazy" decoding="async" referrerpolicy="no-referrer" :src="video.cover ? video.cover.replace(/^http:/, 'https:') : ''" alt="" /></a>
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
                <button type="button" class="fo-btn" :disabled="organizer.page <= 1" @click="dispatch('organizer-page', organizer.page - 1)">‹ 上一页</button>
                <span class="fo-page-num">{{ organizer.page }} / {{ organizer.totalPages }}</span>
                <button type="button" class="fo-btn" :disabled="organizer.page >= organizer.totalPages" @click="dispatch('organizer-page', organizer.page + 1)">下一页 ›</button>
              </div>
            </template>
          </section>
          <section v-else-if="organizer.mode === 'cache'" id="fo-vue-cache-main" class="fo-bili-main">
            <header class="fo-bili-hero fo-hero-persistent fo-cached-hero">
              <div class="fo-hero-left"><div class="fo-bili-cover">💾</div><div class="fo-hero-folder-info"><h3>缓存视频</h3><p>{{ organizer.cachedVideos.length }} 个缓存记录 · 存放目录可在设置中选择</p></div></div>
              <div class="fo-bili-actions"><button type="button" class="primary" @click="dispatch('organizer-open')">返回收藏夹</button><button type="button" @click="dispatch('cache-open-settings')">缓存设置</button></div>
            </header>
            <div v-if="organizer.cacheLoading" class="fo-bili-loading"><i></i><span>正在读取本地缓存…</span></div>
            <div v-else class="fo-bili-grid fo-cached-video-grid">
              <p v-if="!organizer.cachedVideos.length" class="fo-bili-empty">还没有缓存视频。可从视频卡片的“更多操作”中选择“缓存视频”。</p>
              <article v-for="item in organizer.cachedVideos" :key="item.id" class="fo-bili-card fo-cached-video-card">
                <div class="fo-bili-thumb"><button class="fo-cached-play" type="button" @click="dispatch('cache-play', item.id)"><img loading="lazy" referrerpolicy="no-referrer" :src="item.cover" alt="" /><span class="fo-cached-local-badge">LOCAL</span></button></div>
                <div class="fo-bili-title-row"><button class="fo-title-link fo-bili-title fo-cached-title" type="button" @click="dispatch('cache-play', item.id)">{{ item.title }}</button><button class="fo-card-more" type="button" aria-label="删除缓存" @click="dispatch('cache-delete', item.id)">×</button></div>
                <div class="fo-bili-meta"><span>{{ item.sizeText }}</span><span>缓存于 {{ item.cachedDate }}</span></div>
              </article>
            </div>
          </section>
          <section v-else-if="organizer.mode === 'recommendations'" id="fo-vue-recommend-main" class="fo-bili-main">
            <header class="fo-bili-hero">
              <div class="fo-bili-cover fo-vue-recommend-cover"><span>✨</span></div>
              <div class="fo-bili-heading"><div class="fo-feed-hero-title"><h3>{{ organizer.specialTitle }}</h3><span class="fo-feed-badge">{{ organizer.specialBadge }}</span></div><p>{{ organizer.specialSubtitle }}</p></div>
              <div class="fo-bili-actions"><button type="button" class="primary" :disabled="!organizer.specialVideos.length" @click="dispatch('special-play-page')">▶ 播放本页</button><button type="button" @click="dispatch('recommendations-refresh')">↻ 换一批</button><button type="button" @click="dispatch('organizer-open')">返回收藏夹</button></div>
            </header>
            <div class="fo-bili-toolbar"><div class="fo-bili-sort"><span class="fo-vue-feed-label">🔥 猜你喜欢与热门精选</span></div><div class="fo-feed-count-tag">本页共 {{ organizer.specialVideos.length }} 个视频</div></div>
            <div v-if="organizer.specialLoading" class="fo-bili-loading"><i></i><span>正在加载个性化推荐视频…</span></div>
            <p v-else-if="organizer.specialError" class="fo-bili-empty">{{ organizer.specialError }}</p>
            <div v-else class="fo-bili-grid">
              <p v-if="!organizer.specialVideos.length" class="fo-bili-empty">暂无推荐视频。</p>
              <article v-for="video in organizer.specialVideos" :key="video.id" class="fo-bili-card" draggable="true" @dragstart="beginVideoDrag($event, video)">
                <div class="fo-bili-thumb"><a class="fo-cover-link" :href="video.url" target="_blank" rel="noreferrer" @click.prevent="dispatch('special-play-video', video)"><img loading="lazy" decoding="async" referrerpolicy="no-referrer" :src="video.cover ? video.cover.replace(/^http:/, 'https:') : ''" alt="" /></a><span class="fo-bili-count">▣ {{ video.playCount }}</span><span class="fo-bili-duration">{{ video.duration }}</span></div>
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
          </section>
          <section v-else-if="organizer.mode === 'following'" id="fo-vue-following-main" class="fo-bili-main">
            <header class="fo-bili-hero">
              <div class="fo-bili-cover fo-vue-following-cover"><span>📺</span></div>
              <div class="fo-bili-heading"><div class="fo-feed-hero-title"><h3>{{ organizer.specialTitle }}</h3><span class="fo-feed-badge">{{ organizer.specialBadge }}</span></div><p>{{ organizer.specialSubtitle }}</p></div>
              <div class="fo-bili-actions"><button type="button" class="primary" :disabled="!organizer.specialVideos.length" @click="dispatch('special-play-page')">▶ 播放本页</button><button type="button" @click="dispatch('following-refresh')">↻</button><button type="button" @click="dispatch('organizer-open')">返回收藏夹</button></div>
            </header>
            <div class="fo-up-groups-bar">
              <div class="fo-up-groups-list"><button v-for="group in organizer.followingGroups" :key="group.id" type="button" class="fo-up-group-chip" :class="{ active: group.active }" @click="dispatch('following-group', group.id)">{{ group.child ? '↳ ' : '' }}{{ group.name }} <small class="count">{{ group.count }}</small></button></div>
              <div class="fo-up-groups-actions"><button type="button" @click="dispatch('following-manage-groups', 'create')">＋ 新建分组</button><button type="button" @click="dispatch('following-manage-groups', 'manage')">⚙️ 管理分组</button></div>
            </div>
            <div v-if="organizer.followingMembers.length" class="fo-up-members-strip">
              <div class="fo-up-members-label"><b>{{ organizer.specialBadge }}</b><small>共 {{ organizer.followingMembers.length }} 位 UP 主</small></div>
              <div class="fo-up-members-list"><button type="button" class="fo-up-member-chip" :class="{ active: !organizer.followingMembers.some(item => item.active) }" @click="dispatch('following-member', '')">全部UP</button><button v-for="member in organizer.followingMembers" :key="member.id" type="button" class="fo-up-member-chip" :class="{ active: member.active }" :title="`左键筛选「${member.name}」，右键预览近期投稿`" @click="dispatch('following-member', member.id)" @contextmenu.prevent="dispatch('following-preview-member', { id: member.id, clientX: $event.clientX, clientY: $event.clientY })"><img v-if="member.face" loading="lazy" referrerpolicy="no-referrer" :src="member.face" alt="" /><span>{{ member.name }}</span></button></div>
              <button type="button" class="fo-btn-manage-members" @click="dispatch('following-manage-groups', 'members')">＋ 管理成员</button>
            </div>
            <div class="fo-bili-toolbar"><div class="fo-bili-sort"><span class="fo-vue-feed-label">⚡ UP 主最新投稿动态</span></div><div class="fo-feed-count-tag">本页共 {{ organizer.specialVideos.length }} 个视频</div></div>
            <div v-if="organizer.specialLoading" class="fo-bili-loading"><i></i><span>正在读取关注 UP 主更新…</span></div>
            <p v-else-if="organizer.specialError" class="fo-bili-empty">{{ organizer.specialError }}</p>
            <div v-else class="fo-bili-grid">
              <p v-if="!organizer.specialVideos.length" class="fo-bili-empty">暂无最新关注视频动态。</p>
              <article v-for="video in organizer.specialVideos" :key="video.id" class="fo-bili-card" draggable="true" @dragstart="beginVideoDrag($event, video)">
                <div class="fo-bili-thumb"><a class="fo-cover-link" :href="video.url" target="_blank" rel="noreferrer" @click.prevent="dispatch('special-play-video', video)"><img loading="lazy" decoding="async" referrerpolicy="no-referrer" :src="video.cover" alt="" /></a><span class="fo-bili-count">▣ {{ video.playCount }}</span><span class="fo-bili-duration">{{ video.duration }}</span></div>
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
              <BiliSubscriptionHeader show-back />
              <div v-if="organizer.subscriptionLoading" class="fo-bili-loading"><i></i><span>正在读取订阅视频与 AI 字幕稿…</span></div>
              <p v-else-if="organizer.subscriptionError" class="fo-bili-empty">读取失败：{{ organizer.subscriptionError }}</p>
              <div v-else class="bili-sub-layout bili-sub-vue-layout">
                <BiliSubscriptionPlayer />
                <BiliSubscriptionTranscript />
              </div>
            </div>
          </section>
          <section v-else-if="organizer.mode === 'radio'" id="fo-vue-radio-main" class="fo-bili-main fo-vue-radio-main">
            <header class="fo-bili-hero fo-radio-hero">
              <div class="fo-hero-left">
                <div class="fo-bili-cover fo-vue-radio-cover"><span>📻</span></div>
                <div class="fo-hero-folder-info">
                  <h3>B站电台</h3>
                  <p>从左侧选择收藏夹，将视频拖拽或添加到连播队列，自由编排系列随心听</p>
                </div>
              </div>
              <div class="fo-bili-actions">
                <button type="button" class="primary" @click="dispatch('radio-refresh')">↻ 刷新电台</button>
                <button type="button" @click="dispatch('organizer-open')">返回收藏夹</button>
              </div>
            </header>
            <div class="bili-radio-layout fo-vue-radio-layout">
              <aside class="bili-radio-folders">
                <p class="sw-title">收藏夹</p>
                <div id="bili-radio-folders">
                  <button v-for="folder in biliFavoritesState.radioFolders" :key="folder.id" type="button" class="bili-radio-folder" :class="{ on: folder.id === biliFavoritesState.radioActiveFolderId }" @click="dispatch('radio-select-folder', folder.id)"><span>{{ folder.title }}</span><span>{{ folder.count }}</span></button>
                  <p v-if="!biliFavoritesState.radioFolders.length" class="muted small">{{ biliFavoritesState.radioLoading ? '加载中…' : '暂无收藏夹' }}</p>
                </div>
              </aside>
              <section class="bili-radio-library">
                <p id="bili-radio-library-title" class="sw-title">收藏夹视频</p>
                <p v-if="biliFavoritesState.radioError" role="alert" class="muted small">{{ biliFavoritesState.radioError }}</p>
                <div id="bili-radio-videos" class="bili-radio-videos">
                  <button
                    v-for="video in biliFavoritesState.radioVideos"
                    :key="video.bvid"
                    type="button"
                    class="bili-radio-video"
                    :title="`${video.title} (点击加入连播队列，或按住拖拽封面到下方卡带机直接播放)`"
                    draggable="true"
                    @dragstart="onRadioVideoDragStart($event, video)"
                    @click="dispatch('radio-add', { bvid: video.bvid, title: video.title, cover: video.cover, author: video.author, duration: video.duration })"
                  >
                    <img v-if="video.cover" :src="video.cover" alt="" loading="lazy" referrerpolicy="no-referrer" />
                    <span v-else></span>
                    <p>{{ video.title }}</p>
                    <span>＋</span>
                  </button>
                  <p v-if="!biliFavoritesState.radioVideos.length" class="muted small">{{ biliFavoritesState.radioLoading ? '读取视频中…' : '此收藏夹暂无可播放视频' }}</p>
                </div>
              </section>
              <section class="bili-radio-editor">
                <div class="bili-radio-name-row">
                  <input
                    id="bili-radio-name"
                    v-model="biliFavoritesState.radioSeriesName"
                    maxlength="48"
                    :class="{ 'has-error': isSeriesNameError }"
                    :placeholder="isSeriesNameError ? '⚠️ 请在此输入系列名称后再保存！' : '请输入系列名称（必填）'"
                    autocomplete="off"
                    @input="isSeriesNameError = false"
                    @keydown.enter.prevent="handleSaveSeries"
                  />
                  <!-- 操作按钮组：保存系列、重命名、分享到海狸聊天室 -->
                  <div class="bili-radio-btn-group">
                    <button
                      id="bili-radio-save"
                      type="button"
                      title="保存当前队列为系列"
                      @click="handleSaveSeries"
                    >
                      💾 保存系列
                    </button>
                    <button
                      id="bili-radio-rename"
                      type="button"
                      title="重命名当前系列"
                      @click="handleRenameCurrentSeries"
                    >
                      ✏️ 重命名
                    </button>
                    <ChatShareMenu
                      id="bili-radio-share"
                      compact
                      label="🚀 分享"
                      :visible="true"
                      @select="handleShareSeriesToRoom"
                    />
                  </div>
                  <!-- 系列下拉快速切换选择框 (移动至最右侧，并在底部包含创建系列) -->
                  <div class="bili-radio-series-dropdown-wrap">
                    <select
                      class="bili-radio-series-select"
                      title="快速切换已保存的系列"
                      @change="handleSeriesDropdownChange"
                    >
                      <option value="" disabled selected>
                        {{ biliFavoritesState.radioSeries.length ? `📚 已保存系列 (${biliFavoritesState.radioSeries.length})` : '📚 暂无保存系列' }}
                      </option>
                      <option
                        v-for="series in biliFavoritesState.radioSeries"
                        :key="series.id"
                        :value="series.id"
                      >
                        {{ series.name }} ({{ series.count }}首)
                      </option>
                      <option value="__create_new__" class="bili-radio-create-opt">
                        ＋ 创建系列
                      </option>
                    </select>
                  </div>
                </div>
                <div id="bili-radio-queue" class="bili-radio-queue" aria-label="电台播放队列">
                  <div
                    v-for="(item, index) in biliFavoritesState.radioQueue"
                    :key="`${item.bvid}-${index}`"
                    class="bili-radio-queue-item"
                    :class="{ 'is-playing': radioTapeState.active && radioTapeState.trackIndex === index + 1 }"
                    title="点击立即从该曲目开始播放"
                    @click="dispatch('radio-play-index', index)"
                  >
                    <span class="bili-radio-queue-no">{{ radioTapeState.active && radioTapeState.trackIndex === index + 1 ? '♪' : index + 1 }}</span>
                    <img v-if="item.cover" :src="item.cover" alt="" loading="lazy" referrerpolicy="no-referrer" />
                    <span v-else></span>
                    <p>{{ item.title }}</p>
                    <button type="button" class="bili-radio-remove" :aria-label="`移除 ${item.title}`" @click.stop="dispatch('radio-remove', { index })">×</button>
                  </div>
                  <p v-if="!biliFavoritesState.radioQueue.length" class="muted small">点击左侧视频加入连播队列。</p>
                </div>
                <div class="bili-radio-actions">
                  <button id="bili-radio-play" type="button" :disabled="!biliFavoritesState.radioQueue.length" @click="dispatch('radio-play')">▶ 按顺序播放</button>
                  <button id="bili-radio-shuffle" type="button" :disabled="!biliFavoritesState.radioQueue.length" @click="dispatch('radio-shuffle')">🔀 随机播放</button>
                  <button id="bili-radio-clear" type="button" @click="dispatch('radio-clear')">清空编辑区</button>
                </div>
              </section>
            </div>
            <!-- 非全屏卡片时保留在电台编辑区下方 -->
            <BiliRadioTapePlayer v-if="!(isStandalone || fullscreenCardState.activeId === 'daily-bilibili')" />
          </section>
        </div>
      </div>
    </div>

    <!-- 🌟 B站全屏插件左下角常驻磁带机（停靠在底部 Mac Dock 的左侧，图 2 样式保持稳定） -->
    <BiliRadioTapePlayer
      v-if="isStandalone || fullscreenCardState.activeId === 'daily-bilibili'"
      dock-side
    />

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
      <ChatShareMenu
        label="💬 发送到聊天室"
        match-menu-item
        :visible="contextMenu.visible"
        @select="handleShareVideoToRoom"
      />
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
      <div class="fo-context-divider"></div>
      <button type="button" class="fo-context-item" @click="runContextMenuAction('subtitle')">
        <span class="fo-context-icon">▤</span> 字幕转文本
      </button>
    </div>
  </section>
</template>

<style scoped src="./BiliFavorites.css"></style>
