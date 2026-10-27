<template>
  <div class="vue-youtube-wrapper" :inert="!active">
    <section
      id="daily-youtube"
      class="card wide daily-youtube"
      :class="{ 'card-fullscreen': fullscreenCardState.activeId === 'daily-youtube' }"
    >
      <!-- 极简头部：仅保留「✨ 个性推荐」与「❤️ 我的收藏」 -->
      <header class="card-head">
        <span class="bar youtube-red"></span>
        <h2>YouTube</h2>
        <div id="youtube-view-tabs" class="youtube-view-tabs" role="tablist" aria-label="YouTube 视图">
          <button
            type="button"
            role="tab"
            :class="{ on: state.currentView === 'favorites' }"
            :aria-selected="state.currentView === 'favorites'"
            @click="handleSwitchView('favorites')"
          >
            ❤️ 我的收藏 ({{ state.favorites.length }})
          </button>
          <button
            type="button"
            role="tab"
            :class="{ on: state.currentView === 'recommend' }"
            :aria-selected="state.currentView === 'recommend'"
            @click="handleSwitchView('recommend')"
          >
            ✨ 个性推荐
          </button>
        </div>
        <span id="youtube-user" class="muted small">{{ state.userName }}</span>
        <button
          id="youtube-refresh"
          class="youtube-refresh icon-btn"
          :class="{ spinning: state.isLoading }"
          type="button"
          :title="state.currentView === 'recommend' ? '换一批推荐 (18个)' : '刷新收藏'"
          @click="handleRefresh"
        >
          <span class="yt-refresh-icon">↻</span>
        </button>
        <div class="yt-settings-anchor">
          <button ref="settingsButton" type="button" class="icon-btn" title="YouTube 设置" aria-label="YouTube 设置" :aria-expanded="settingsOpen" @click="settingsOpen = !settingsOpen">⚙</button>
          <YouTubeSettingsPanel v-if="settingsMounted" :visible="active && settingsOpen" :anchor="settingsButton" @close="settingsOpen = false" />
        </div>
      </header>

      <!-- 左右双栏结构（B站收藏夹风格） -->
      <div class="yt-layout-body">
        <!-- 左侧边栏 -->
        <aside class="yt-sidebar">
          <!-- 导航模式卡片组 -->
          <div class="yt-sidebar-nav-group">
            <button
              type="button"
              class="yt-sidebar-nav-btn yt-nav-fav"
              :class="{ on: state.currentView === 'favorites' }"
              @click="handleSwitchView('favorites')"
            >
              <div class="yt-nav-btn-main">
                <span class="yt-nav-btn-icon">❤️</span>
                <div class="yt-nav-btn-text">
                  <strong>我的收藏</strong>
                  <small>{{ state.favorites.length }} 个收藏视频</small>
                </div>
              </div>
              <span class="yt-nav-btn-badge">FAV</span>
            </button>

            <button
              type="button"
              class="yt-sidebar-nav-btn yt-nav-rec"
              :class="{ on: state.currentView === 'recommend' }"
              @click="handleSwitchView('recommend')"
            >
              <div class="yt-nav-btn-main">
                <span class="yt-nav-btn-icon">✨</span>
                <div class="yt-nav-btn-text">
                  <strong>个性推荐</strong>
                  <small>猜你喜欢 · 每次刷新</small>
                </div>
              </div>
              <span class="yt-nav-btn-badge">FOR YOU</span>
            </button>
          </div>

          <!-- 分组 Hub 导航条 -->
          <div class="yt-sidebar-hub-head">
            <div class="yt-hub-title">
              <span class="yt-hub-icon">📁</span>
              <div class="yt-hub-text">
                <strong>收藏分组</strong>
                <small>按本地分类展示</small>
              </div>
            </div>
            <button
              class="yt-hub-add-btn"
              type="button"
              title="新建收藏分组"
              @click="handleCreateFavGroup"
            >
              ＋
            </button>
          </div>

          <!-- 收藏分组列表 -->
          <nav class="yt-sidebar-group-list" aria-label="收藏分组">
            <button
              type="button"
              class="yt-group-item"
              :class="{ on: state.currentView === 'favorites' && state.activeFavGroup === '全部' }"
              @click="handleSelectFavGroup('全部')"
            >
              <i class="yt-group-icon">📌</i>
              <span class="yt-group-name">全部视频</span>
              <small class="yt-group-count">{{ state.favorites.length }}</small>
            </button>

            <button
              type="button"
              class="yt-group-item"
              :class="{ on: state.currentView === 'favorites' && state.activeFavGroup === '稍后观看' }"
              @click="handleSelectFavGroup('稍后观看')"
            >
              <i class="yt-group-icon">⏳</i>
              <span class="yt-group-name">稍后观看</span>
              <small class="yt-group-count">{{ getGroupCount('稍后观看') }}</small>
            </button>

            <template v-for="grp in customFavGroups" :key="grp">
              <div
                class="yt-group-item yt-group-custom"
                :class="{ on: state.currentView === 'favorites' && state.activeFavGroup === grp }"
                @click="handleSelectFavGroup(grp)"
              >
                <i class="yt-group-icon">📂</i>
                <span class="yt-group-name">{{ grp }}</span>
                <small class="yt-group-count">{{ getGroupCount(grp) }}</small>
                <button
                  class="yt-group-del-btn"
                  type="button"
                  title="删除分组"
                  @click.stop="handleDeleteFavGroup(grp)"
                >
                  ✕
                </button>
              </div>
            </template>
          </nav>

          <!-- 侧边栏底部同步卡片 -->
          <div class="yt-sidebar-footer">
            <button
              class="yt-sidebar-sync-btn"
              type="button"
              title="自动读取 Edge 浏览器中已登录的 YouTube 账号，同步 Liked 视频"
              :disabled="state.favoritesBusy || state.favoritesLoading || state.favoritesNeedsReview"
              @click="handleSyncLiked"
            >
              <span class="yt-sync-icon">🔄</span>
              <span>同步账号 Liked 视频</span>
            </button>
          </div>
        </aside>

        <!-- 右侧主内容区 -->
        <main class="yt-main-content">
          <!-- 1. ✨ 个性推荐视图（纯粹算法推荐流，无冗余分类杂项） -->
          <div id="youtube-recommend-pane" v-show="state.currentView === 'recommend'">
            <div v-if="state.isLoading && state.exploreVideos.length === 0" class="muted small yt-loading-box">
              <i class="yt-spinner"></i>
              <span>正在生成专属个性推荐流…</span>
            </div>
            <div v-else-if="state.error && state.exploreVideos.length === 0" class="yt-error-box">
              <p>⚠️ {{ state.error }}</p>
              <button type="button" class="yt-retry-btn" @click="handleRefresh">↻ 重新拉取</button>
            </div>
            <div v-else-if="state.exploreVideos.length === 0" class="muted small yt-empty">
              <p>推荐流正在同步，点击换一批即可获取推荐</p>
              <button type="button" class="yt-retry-btn" style="margin-top: 8px;" @click="handleRefresh">↻ 换一批推荐</button>
            </div>
            <div v-else>
              <!-- 顶部提示条：说明当前18个，以及收藏操作指南 -->
              <div class="yt-rec-header-hint">
                <span class="yt-rec-counter">✨ 当前为您精选 18 个推荐视频</span>
                <span class="yt-rec-fav-tip">💡 悬浮封面点击 🤍 即可一键收藏</span>
              </div>

              <div class="yt-video-grid">
                <article
                  v-for="v in state.exploreVideos"
                  :key="'rec-' + v.id"
                  class="yt-card"
                  @click="handlePlayVideo(v)"
                  @contextmenu="handleOpenContextMenu($event, v)"
                >
                  <div class="yt-thumb-wrap">
                    <img :src="v.thumbnail" :alt="v.title" loading="lazy" @error="handleImgError" />
                    <button
                      class="yt-fav-badge"
                      type="button"
                      :class="{ 'is-fav': isFav(v.id) }"
                      :disabled="state.favoritesBusy || state.favoritesLoading || state.favoritesNeedsReview"
                      :title="isFav(v.id) ? '已收藏到本地（点击移出）' : '收藏到本地 YouTube 收藏夹'"
                      @click.stop="handleToggleFav(v)"
                    >
                      <span class="yt-fav-icon">{{ isFav(v.id) ? "❤️" : "🤍" }}</span>
                      <span class="yt-fav-text">{{ isFav(v.id) ? "已收藏" : "收藏" }}</span>
                    </button>
                    <span v-if="v.views" class="yt-badge">{{ v.views }}</span>
                  </div>
                  <div class="yt-info">
                    <!-- 第 1 & 2 行：恰好两行固定高度截断标题 -->
                    <h4 class="yt-title" :title="v.title">{{ v.title }}</h4>
                    <!-- 第 3 行：左边频道名称，右下角发布时间 -->
                    <div class="yt-meta-row">
                      <span class="yt-channel" :title="v.channelTitle">{{ v.channelTitle }}</span>
                      <span class="yt-time">{{ v.publishedAt }} ↗</span>
                    </div>
                  </div>
                </article>
              </div>

              <!-- 底部显眼的下一批/换一批操作栏 -->
              <div class="yt-next-batch-container">
                <button
                  type="button"
                  class="yt-next-batch-btn"
                  :class="{ spinning: state.isLoading }"
                  :disabled="state.isLoading"
                  @click="handleRefresh"
                >
                  <span class="yt-next-batch-icon">↻</span>
                  <span class="yt-next-batch-text">{{ state.isLoading ? "正在探索下一批推荐…" : "换一批推荐（再来 18 个）" }}</span>
                </button>
              </div>
            </div>
          </div>

          <!-- 2. ❤️ 我的收藏夹视图（默认视图） -->
          <div id="youtube-favorites-pane" v-show="state.currentView === 'favorites'">
            <div class="yt-fav-toolbar">
              <div class="yt-fav-hint">
                <strong class="yt-fav-cur-group">📁 {{ state.activeFavGroup }}</strong>
                <span class="muted small">（共 {{ currentFilteredFavorites.length }} 个收藏视频 · 每页 18 个）</span>
              </div>
              <div class="yt-sync-actions">
                <button
                  class="yt-sync-btn"
                  type="button"
                  title="自动读取 Edge 浏览器中登录的 YouTube 账号，同步 Liked 视频"
                  :disabled="state.favoritesBusy || state.favoritesLoading || state.favoritesNeedsReview"
                  @click="handleSyncLiked"
                >
                  🔄 同步账号 Liked 视频
                </button>
              </div>
            </div>

            <div v-if="state.favoritesLoading" class="muted small yt-loading-box">
              <i class="yt-spinner"></i>
              <span>正在更新收藏列表…</span>
            </div>
            <div v-else-if="currentFilteredFavorites.length === 0" class="muted small yt-empty yt-empty-fav">
              <span class="yt-empty-icon">📺</span>
              <p>当前分组「{{ state.activeFavGroup }}」暂无视频。</p>
              <p class="yt-empty-sub">若您在 YouTube 账号中有点赞或喜欢的视频，可直接一键同步到本地展示。</p>
              <button
                type="button"
                class="yt-sync-btn yt-empty-sync-btn"
                :disabled="state.favoritesBusy || state.favoritesLoading || state.favoritesNeedsReview"
                @click="handleSyncLiked"
              >
                🔄 立即同步 YouTube 账号喜欢的视频
              </button>
            </div>
            <div v-else class="yt-video-grid">
              <article
                v-for="v in paginatedFavorites"
                :key="'fav-' + v.id"
                class="yt-card"
                @click="handlePlayVideo(v)"
                @contextmenu="handleOpenContextMenu($event, v)"
              >
                <div class="yt-thumb-wrap">
                  <img :src="v.thumbnail" :alt="v.title" loading="lazy" @error="handleImgError" />
                  <button
                    class="yt-fav-badge is-fav"
                    type="button"
                    :disabled="state.favoritesBusy || state.favoritesLoading || state.favoritesNeedsReview"
                    title="从收藏中移出"
                    @click.stop="handleRemoveFavorite(v.id)"
                  >
                    <span class="yt-fav-icon">❤️</span>
                    <span class="yt-fav-text">移出</span>
                  </button>
                  <span v-if="v.views" class="yt-badge">{{ v.views }}</span>
                </div>
                <div class="yt-info">
                  <!-- 第 1 & 2 行：两行截断标题 -->
                  <h4 class="yt-title" :title="v.title">{{ v.title }}</h4>
                  <!-- 第 3 行：左边频道名称，右下角发布时间与操作 -->
                  <div class="yt-meta-row">
                    <span class="yt-channel" :title="v.channelTitle">{{ v.channelTitle }}</span>
                    <div class="yt-right-meta">
                      <span class="yt-time">{{ v.publishedAt || "已收藏" }}</span>
                      <button
                        class="yt-del-fav-btn"
                        type="button"
                        :disabled="state.favoritesBusy || state.favoritesLoading || state.favoritesNeedsReview"
                        title="从收藏中删除"
                        @click.stop="handleRemoveFavorite(v.id)"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            </div>

            <!-- 收藏分页器 -->
            <nav class="yt-pagination" v-if="favTotalPages > 1">
              <button type="button" :disabled="state.currentPage <= 1" @click="handlePrevPage">‹ 上一页</button>
              <span>第 {{ state.currentPage }} / {{ favTotalPages }} 页 (共 {{ currentFilteredFavorites.length }} 条)</span>
              <button type="button" :disabled="state.currentPage >= favTotalPages" @click="handleNextPage(favTotalPages)">下一页 ›</button>
            </nav>
          </div>
        </main>
      </div>
    </section>

    <!-- 极简轻量级操作反馈 Toast -->
    <transition name="yt-toast-fade">
      <div v-if="toastText" class="yt-toast">
        {{ toastText }}
      </div>
    </transition>

    <!-- YouTube 视频右键菜单 -->
    <Teleport to="body">
      <div
        v-if="ytContextMenu.visible"
        class="yt-context-menu"
        :style="{ left: `${Math.min(ytContextMenu.x, 600)}px`, top: `${Math.min(ytContextMenu.y, 400)}px` }"
        @click.stop
      >
        <div class="menu-head">{{ ytContextMenu.video?.title }}</div>
        <ChatShareMenu
          label="💬 发送到聊天室"
          :visible="ytContextMenu.visible"
          @select="handleShareToRoom"
        />
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { computed, watch, onMounted, onBeforeUnmount, ref, defineAsyncComponent } from "vue";
import { useCardActivity } from "../core/useCardActivity";
import { homePrefsState } from "../launcher/home-prefs.store";
const YouTubeSettingsPanel = defineAsyncComponent(() => import("./YouTubeSettingsPanel.vue"));
const settingsOpen = ref(false);
const settingsMounted = ref(false);
watch(settingsOpen, open => { if (open) settingsMounted.value = true; });
const settingsButton = ref<HTMLElement | null>(null);
import { fullscreenCardState } from "../core/fullscreen-card-state";
import { chatService } from "../chat/chat.service";
import ChatShareMenu from "../chat/ChatShareMenu.vue";
import type { ChatShareTarget } from "../chat/private-chat-client";
import { windowManagerController } from "../core/window-manager.store";

const ytContextMenu = ref<{
  visible: boolean;
  x: number;
  y: number;
  video: any;
}>({
  visible: false,
  x: 0,
  y: 0,
  video: null
});

function handleOpenContextMenu(e: MouseEvent, v: any) {
  e.preventDefault();
  e.stopPropagation();
  ytContextMenu.value = {
    visible: true,
    x: e.clientX,
    y: e.clientY,
    video: v
  };
}

import { chatModuleState } from "../chat/chat-state";

function handleShareToRoom(target: ChatShareTarget) {
  if (ytContextMenu.value.video) {
    chatService.sendYouTubeShare({
      id: ytContextMenu.value.video.id,
      title: ytContextMenu.value.video.title,
      cover: ytContextMenu.value.video.thumbnail,
      author: ytContextMenu.value.video.channelTitle,
      views: ytContextMenu.value.video.views,
      url: ytContextMenu.value.video.videoUrl
    }, target);
  }
  ytContextMenu.value.visible = false;
}

function onWindowClick() {
  ytContextMenu.value.visible = false;
}

onMounted(() => {
  window.addEventListener("click", onWindowClick);
});

import {
  youTubeState,
  youTubeController,
  type YouTubeVideoItem
} from "./youtube-store";
import { youTubeService } from "../services/youtube.service";


const state = youTubeState;
const { active: cardActive, standalone } = useCardActivity("daily-youtube", "/youtube.html");
const active = computed(() => cardActive.value && (standalone || homePrefsState.showYouTube));
let initialLoadRequested = false;
let resumeRead = false;
let readScope: AbortController | undefined;
let viewVersion = 0;
watch([active, () => state.currentView], ([visible, view], previous) => {
  ++viewVersion;
  if (readScope && !readScope.signal.aborted && state.isLoading) resumeRead = true;
  readScope?.abort();
  readScope = new AbortController();
  if (!visible || view !== "recommend") readScope.abort();
  youTubeService.setRecommendationViewSignal(readScope.signal);
  if (!visible) return;
  if (!initialLoadRequested) youTubeService.init();
  if (view === "favorites") {
    state.currentPage = Math.min(state.currentPage, Math.max(1, Math.ceil(currentFilteredFavorites.value.length / state.pageSize)));
    void youTubeService.loadFavorites();
  }
  if (view === "recommend" && (!initialLoadRequested || resumeRead || (previous?.[1] !== view && !state.exploreVideos.length))) {
    resumeRead = false;
    void youTubeService.loadRecommend();
  }
  initialLoadRequested = true;
}, { immediate: true, flush: "sync" });

// 收藏分组计算与切换
const currentFilteredFavorites = computed(() => {
  if (state.activeFavGroup === "全部") return state.favorites;
  return state.favorites.filter((v) => (v.group || "稍后观看") === state.activeFavGroup);
});

const customFavGroups = computed(() => {
  return state.favGroups.filter((g) => g !== "全部" && g !== "稍后观看");
});

function getGroupCount(grp: string): number {
  if (grp === "全部") return state.favorites.length;
  return state.favorites.filter((v) => (v.group || "稍后观看") === grp).length;
}

function handleSelectFavGroup(grp: string) {
  state.activeFavGroup = grp;
  state.currentPage = 1;
  if (state.currentView !== "favorites") {
    handleSwitchView("favorites");
  }
}

async function handleCreateFavGroup() {
  const name = window.prompt("请输入新收藏分组名称：");
  if (!name || !name.trim()) return;
  await youTubeService.addFavGroup(name.trim());
  state.activeFavGroup = name.trim();
  state.currentPage = 1;
}

async function handleDeleteFavGroup(grp: string) {
  if (!window.confirm(`确定要删除分组「${grp}」吗？分组内的视频会保留在「稍后观看」中。`)) return;
  await youTubeService.deleteFavGroup(grp);
  if (state.activeFavGroup === grp) state.activeFavGroup = "全部";
}

// 收藏视频分页 (收藏夹保留翻页查阅)
const favTotalPages = computed(() =>
  Math.max(1, Math.ceil(currentFilteredFavorites.value.length / state.pageSize))
);
watch(() => currentFilteredFavorites.value.length, () => {
  if (active.value && state.currentView === "favorites") state.currentPage = Math.min(state.currentPage, favTotalPages.value);
});
const paginatedFavorites = computed(() => {
  const start = (state.currentPage - 1) * state.pageSize;
  return currentFilteredFavorites.value.slice(start, start + state.pageSize);
});

function isFav(videoId: string): boolean {
  return state.favorites.some((v) => v.id === videoId);
}

function handleSwitchView(view: "recommend" | "favorites") {
  if (!active.value) return;
  ++viewVersion;
  state.currentPage = 1;
  youTubeController.switchView(view);
}

function handleRefresh() {
  if (!active.value) return;
  ++viewVersion;
  state.currentPage = 1;
  youTubeController.dispatch("refresh");
  scrollToCardTop();
}

const toastText = ref("");
let toastTimer: any = null;
function showToast(msg: string) {
  toastText.value = msg;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toastText.value = "";
  }, 2200);
}

async function runFavoriteAction(action: () => Promise<unknown>) {
  if (!active.value || state.favoritesBusy || state.favoritesLoading || state.favoritesNeedsReview) return;
  try { await action(); } catch { /* The service retains a non-modal result for this card. */ }
}
async function handleToggleFav(v: YouTubeVideoItem) {
  const willBeFav = !isFav(v.id);
  await runFavoriteAction(() => youTubeService.toggleFavorite(v));
  showToast(willBeFav ? `已收藏：${v.title.slice(0, 18)}…` : "已移出收藏夹");
}
async function handleRemoveFavorite(id: string) {
  await runFavoriteAction(() => youTubeService.removeFavorite(id));
  showToast("已移出收藏夹");
}
async function handleSyncLiked() {
  await runFavoriteAction(() => youTubeService.syncYouTubeLikedVideos());
}
async function handleReloadFavorites() {
  if (!active.value || state.favoritesBusy || state.favoritesLoading) return;
  try { await youTubeService.loadFavorites(true); } catch { /* Keep the read failure visible. */ }
}

function handlePlayVideo(v: YouTubeVideoItem) {
  const url = v.videoUrl || `https://www.youtube.com/watch?v=${v.id}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

function scrollToCardTop() {
  const el = document.querySelector(".daily-youtube");
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function handlePrevPage() {
  ++viewVersion;
  if (state.currentPage > 1) {
    state.currentPage--;
    youTubeController.dispatch("page-prev", state.currentPage);
    scrollToCardTop();
  }
}

function handleNextPage(max: number) {
  if (!active.value || state.isLoadingMore || state.isLoading) return;
  if (state.currentPage < max) {
    state.currentPage++;
    youTubeController.dispatch("page-next", state.currentPage);
    scrollToCardTop();
  }
}

function handleImgError(e: Event) {
  const target = e.target as HTMLImageElement;
  target.src = "assets/nav-youtube.svg";
}

onBeforeUnmount(() => {
  window.removeEventListener("click", onWindowClick);
  ++viewVersion;
  readScope?.abort();
});
</script>

<style scoped>
.yt-settings-anchor { position: relative; display: flex; align-items: center; flex-shrink: 0; }
.vue-youtube-wrapper {
  width: 100%;
}

.daily-youtube {
  background: var(--card-bg, rgba(255, 255, 255, 0.05));
  border: 1px solid var(--border, rgba(255, 255, 255, 0.1));
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  margin-bottom: 16px;
  transition: all 0.25s ease;
  display: flex;
  flex-direction: column;
}

/* 左右双栏结构布局（B站收藏夹风格） */
.yt-layout-body {
  display: flex;
  flex: 1;
  min-height: 520px;
  overflow: hidden;
  position: relative;
}

/* 左侧边栏 */
.yt-sidebar {
  width: 220px;
  flex-shrink: 0;
  border-right: 1px solid var(--border, rgba(0, 0, 0, 0.08));
  background: var(--surface, #ffffff);
  display: flex;
  flex-direction: column;
  padding: 12px 10px;
  box-sizing: border-box;
  overflow-y: auto;
  gap: 12px;
}

/* 顶部功能导航卡片组 */
.yt-sidebar-nav-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.yt-sidebar-nav-btn {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 12px;
  border-radius: 12px;
  border: 1px solid var(--border, rgba(0, 0, 0, 0.08));
  background: var(--panel, #f8fafc);
  color: var(--text, #1e293b);
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.2, 0.8, 0.2, 1);
  text-align: left;
}

.yt-sidebar-nav-btn.yt-nav-fav:hover {
  transform: translateY(-1px);
  border-color: #e11d48;
  box-shadow: 0 4px 12px rgba(225, 29, 72, 0.12);
}

.yt-sidebar-nav-btn.yt-nav-rec:hover {
  transform: translateY(-1px);
  border-color: #8b5cf6;
  box-shadow: 0 4px 12px rgba(139, 92, 246, 0.16);
}

.yt-nav-fav.on {
  border-color: #e11d48 !important;
  background: linear-gradient(135deg, rgba(225, 29, 72, 0.12), rgba(225, 29, 72, 0.04)) !important;
  box-shadow: 0 4px 14px rgba(225, 29, 72, 0.18) !important;
}

.yt-nav-rec {
  border-color: rgba(139, 92, 246, 0.28);
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.08), rgba(139, 92, 246, 0.02));
}

.yt-nav-rec.on {
  border-color: #8b5cf6 !important;
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.18), rgba(139, 92, 246, 0.06)) !important;
  box-shadow: 0 4px 14px rgba(139, 92, 246, 0.22) !important;
}

.yt-nav-btn-main {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
}

.yt-nav-btn-icon {
  font-size: 18px;
  line-height: 1;
}

.yt-nav-btn-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.yt-nav-btn-text strong {
  font-size: 12.5px;
  font-weight: 650;
  color: var(--heading, #0f172a);
}

.yt-nav-btn-text small {
  font-size: 10px;
  color: var(--muted, #64748b);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.yt-nav-btn-badge {
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 0.5px;
  padding: 2.5px 8px;
  border-radius: 9999px;
  background: var(--border, rgba(0, 0, 0, 0.1));
  color: var(--muted, #64748b);
  white-space: nowrap;
  flex-shrink: 0;
  line-height: 1.2;
}

.yt-nav-fav.on .yt-nav-btn-badge {
  background: #e11d48;
  color: #ffffff;
}

.yt-nav-rec .yt-nav-btn-badge {
  background: #8b5cf6;
  color: #ffffff;
  font-size: 9.5px;
  padding: 3px 9px;
  box-shadow: 0 2px 6px rgba(139, 92, 246, 0.35);
}

.yt-nav-rec.on .yt-nav-btn-badge {
  background: linear-gradient(135deg, #8b5cf6, #7c3aed);
  color: #ffffff;
  box-shadow: 0 2px 8px rgba(124, 58, 237, 0.45);
}

/* 分组 Hub 导航条 (B站收藏夹风格) */
.yt-sidebar-hub-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 10px;
  border-radius: 9px;
  border: 1px solid rgba(245, 158, 11, 0.3);
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.12), rgba(245, 158, 11, 0.03));
  box-sizing: border-box;
}

.yt-hub-title {
  display: flex;
  align-items: center;
  gap: 8px;
}

.yt-hub-icon {
  font-size: 16px;
  line-height: 1;
}

.yt-hub-text {
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.yt-hub-text strong {
  font-size: 12px;
  font-weight: 650;
  color: var(--heading, #0f172a);
}

.yt-hub-text small {
  font-size: 9.5px;
  color: var(--muted, #64748b);
}

.yt-hub-add-btn {
  display: grid;
  place-items: center;
  width: 22px;
  height: 22px;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: #f59e0b;
  color: #ffffff;
  cursor: pointer;
  font-size: 14px;
  line-height: 1;
  transition: transform 0.15s ease, background 0.15s ease;
  box-shadow: 0 2px 6px rgba(245, 158, 11, 0.3);
}

.yt-hub-add-btn:hover {
  background: #d97706;
  transform: translateY(-1px);
}

/* 收藏分组列表 */
.yt-sidebar-group-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
  overflow-y: auto;
}

.yt-group-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 7px 10px;
  border-radius: 7px;
  border: 1px solid transparent;
  background: transparent;
  color: var(--text, #1e293b);
  cursor: pointer;
  font-size: 12px;
  transition: all 0.15s ease;
  width: 100%;
  box-sizing: border-box;
  text-align: left;
}

.yt-group-item:hover {
  background: var(--surface-hover, rgba(0, 0, 0, 0.04));
}

.yt-group-item.on {
  background: var(--panel, #ffffff);
  border-color: var(--border, rgba(0, 0, 0, 0.12));
  font-weight: 650;
  color: #e11d48;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
}

.yt-group-icon {
  font-style: normal;
  font-size: 13px;
  line-height: 1;
}

.yt-group-name {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.yt-group-count {
  font-size: 10px;
  color: var(--muted, #64748b);
  padding: 1px 5px;
  border-radius: 4px;
  background: var(--border, rgba(0, 0, 0, 0.06));
}

.yt-group-custom .yt-group-del-btn {
  display: none;
  border: none;
  background: transparent;
  color: var(--muted, #94a3b8);
  font-size: 11px;
  cursor: pointer;
  padding: 2px 4px;
  border-radius: 4px;
}

.yt-group-custom:hover .yt-group-del-btn {
  display: block;
}

.yt-group-custom .yt-group-del-btn:hover {
  color: #ef4444;
  background: rgba(239, 68, 68, 0.1);
}

/* 侧边栏底部同步账号操作 */
.yt-sidebar-footer {
  padding-top: 8px;
  border-top: 1px solid var(--border, rgba(0, 0, 0, 0.08));
}

.yt-sidebar-sync-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 8px 10px;
  border-radius: 8px;
  border: 1px solid var(--border, rgba(0, 0, 0, 0.1));
  background: var(--panel, #ffffff);
  color: var(--text, #1e293b);
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.2, 0.8, 0.2, 1);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.03);
}

.yt-sidebar-sync-btn:hover:not(:disabled) {
  border-color: #ff0000;
  color: #ff0000;
  box-shadow: 0 3px 10px rgba(255, 0, 0, 0.12);
  transform: translateY(-1px);
}

.yt-sidebar-sync-btn:disabled {
  opacity: 0.6;
  cursor: wait;
}

/* 右侧主内容区 */
.yt-main-content {
  flex: 1;
  min-width: 0;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.youtube-red {
  background: #ff0000;
}

.card-head {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 16px;
  border-bottom: 1px solid var(--border, rgba(255, 255, 255, 0.08));
}

.card-head h2 {
  font-size: 14px;
  font-weight: 700;
  margin: 0;
  color: var(--text, #0f172a);
}

html[data-theme="dark"] .card-head h2 {
  color: #f8fafc;
}

/* 顶部纯粹双 Tab */
.youtube-view-tabs {
  display: flex;
  gap: 6px;
  background: rgba(0, 0, 0, 0.04);
  padding: 3px;
  border-radius: 8px;
}

html[data-theme="dark"] .youtube-view-tabs {
  background: rgba(255, 255, 255, 0.06);
}

.youtube-view-tabs button {
  background: transparent;
  border: none;
  font-size: 11.5px;
  padding: 4px 12px;
  border-radius: 6px;
  cursor: pointer;
  color: var(--muted, #64748b);
  transition: all 0.15s ease;
  font-weight: 500;
}

.youtube-view-tabs button:hover {
  background: rgba(0, 0, 0, 0.06);
  color: var(--text, #0f172a);
}

html[data-theme="dark"] .youtube-view-tabs button:hover {
  background: rgba(255, 255, 255, 0.08);
  color: #ffffff;
}

.youtube-view-tabs button.on {
  background: #ff0000 !important;
  color: #ffffff !important;
  font-weight: 650;
  box-shadow: 0 2px 8px rgba(255, 0, 0, 0.35);
}

/* 视频网格：大气饱满，铺满视口 */
.yt-video-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 16px;
  padding: 16px 20px;
}

.yt-card {
  background: var(--card-bg, rgba(255, 255, 255, 0.03));
  border: 1px solid var(--border, rgba(255, 255, 255, 0.08));
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.2, 0.8, 0.2, 1);
  display: flex;
  flex-direction: column;
}

.yt-card:hover {
  transform: translateY(-2px);
  border-color: rgba(255, 0, 0, 0.5);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.2);
}

.yt-thumb-wrap {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  background: rgba(0, 0, 0, 0.2);
  overflow: hidden;
}

.yt-thumb-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.25s ease;
}

.yt-card:hover .yt-thumb-wrap img {
  transform: scale(1.03);
}

/* 封面右下角播放量 */
.yt-badge {
  position: absolute;
  bottom: 4px;
  right: 5px;
  background: rgba(0, 0, 0, 0.78);
  color: #f8fafc;
  font-size: 10px;
  padding: 1.5px 5px;
  border-radius: 4px;
  backdrop-filter: blur(4px);
}

/* 封面右上角爱心收藏胶囊 */
.yt-fav-badge {
  position: absolute;
  top: 6px;
  right: 6px;
  background: rgba(15, 23, 42, 0.65);
  border: 1px solid rgba(255, 255, 255, 0.2);
  font-size: 11px;
  height: 24px;
  padding: 0 8px;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  color: #fff;
  transition: all 0.2s cubic-bezier(0.2, 0.8, 0.2, 1);
  backdrop-filter: blur(8px);
  z-index: 2;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
}

.yt-fav-badge:hover {
  transform: scale(1.08);
  background: rgba(15, 23, 42, 0.88);
  border-color: rgba(255, 255, 255, 0.4);
}

.yt-fav-badge.is-fav {
  background: rgba(225, 29, 72, 0.88);
  border-color: rgba(255, 255, 255, 0.3);
  color: #fff;
  box-shadow: 0 2px 8px rgba(225, 29, 72, 0.4);
}

.yt-fav-badge.is-fav:hover {
  background: rgba(225, 29, 72, 1);
  transform: scale(1.08);
}

.yt-fav-icon {
  font-size: 12px;
  line-height: 1;
}

.yt-fav-text {
  font-size: 10px;
  font-weight: 550;
  letter-spacing: 0.2px;
}

/* 核心：刚好 3 行文字区，高度像素级统一（绝不长短脚） */
.yt-info {
  padding: 6px 9px 7px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 64px;
  box-sizing: border-box;
}

/* 第 1 & 2 行：固定两行高度标题（即使一行标题也不塌陷） */
.yt-title {
  font-size: 11px;
  font-weight: 550;
  line-height: 1.35;
  margin: 0;
  color: var(--text, #0f172a);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  height: 2.7em;
}

html[data-theme="dark"] .yt-title {
  color: #f1f5f9;
}

/* 第 3 行：左边 UP 主，右下角发布时间 */
.yt-meta-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  font-size: 10px;
  line-height: 1.2;
}

.yt-channel {
  color: var(--muted, #64748b);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
}

.yt-time {
  color: var(--muted, #94a3b8);
  white-space: nowrap;
  font-size: 9.5px;
}

.yt-right-meta {
  display: flex;
  align-items: center;
  gap: 6px;
}

.yt-del-fav-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 11px;
  opacity: 0.6;
  padding: 0;
}

.yt-del-fav-btn:hover {
  opacity: 1;
}

/* 收藏工具栏 */
.yt-fav-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px 2px;
}

.yt-sync-btn {
  background: rgba(255, 0, 0, 0.08);
  border: 1px solid rgba(255, 0, 0, 0.25);
  color: #ff0000;
  font-size: 11px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s ease;
}

.yt-fav-cur-group {
  font-size: 13px;
  font-weight: 700;
  color: var(--heading, #0f172a);
}

/* 分页器 */
.yt-pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 12px 16px 16px;
  font-size: 11.5px;
  color: var(--muted, #64748b);
}

.yt-pagination button {
  background: var(--card-bg, rgba(255, 255, 255, 0.06));
  border: 1px solid var(--border, rgba(255, 255, 255, 0.1));
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  color: var(--text, #0f172a);
  cursor: pointer;
  transition: all 0.15s ease;
}

html[data-theme="dark"] .yt-pagination button {
  color: #f1f5f9;
}

.yt-pagination button:hover:not(:disabled) {
  background: #ff0000;
  color: #fff;
  border-color: #ff0000;
}

.yt-pagination button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

/* 加载与空状态 */
.yt-loading-box,
.yt-empty,
.yt-error-box {
  padding: 40px 16px;
  text-align: center;
  font-size: 12px;
  color: var(--muted, #64748b);
}

.yt-empty-fav {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 50px 20px;
}

.yt-empty-icon {
  font-size: 36px;
  line-height: 1;
}

.yt-empty-sub {
  color: var(--muted, #64748b);
  font-size: 11.5px;
  margin: 0;
}

.yt-empty-sync-btn {
  margin-top: 10px;
  padding: 8px 22px !important;
  font-size: 12.5px !important;
  border-radius: 20px !important;
}

.yt-spinner {
  display: inline-block;
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255, 0, 0, 0.2);
  border-top-color: #ff0000;
  border-radius: 50%;
  animation: yt-spin 0.7s linear infinite;
  margin-right: 8px;
  vertical-align: middle;
}

@keyframes yt-spin {
  to {
    transform: rotate(360deg);
  }
}

/* 流式触底加载更多条 */
.yt-loadmore-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px 20px 24px;
}

.yt-loadmore-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: var(--card-bg, rgba(255, 255, 255, 0.05));
  border: 1px solid var(--border, rgba(255, 255, 255, 0.12));
  color: var(--text, #0f172a);
  font-size: 12px;
  font-weight: 550;
  padding: 8px 24px;
  border-radius: 999px;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.2, 0.8, 0.2, 1);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

html[data-theme="dark"] .yt-loadmore-btn {
  color: #f1f5f9;
}

.yt-loadmore-btn:hover:not(:disabled) {
  background: #ff0000;
  color: #ffffff;
  border-color: #ff0000;
  box-shadow: 0 4px 16px rgba(255, 0, 0, 0.35);
  transform: translateY(-1px);
}

.yt-loadmore-btn:disabled {
  opacity: 0.6;
  cursor: wait;
}

.yt-spinner-sm {
  display: inline-block;
  width: 14px;
  height: 14px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: currentColor;
  border-radius: 50%;
  animation: yt-spin 0.7s linear infinite;
}

.yt-retry-btn {
  background: #ff0000;
  color: #fff;
  border: none;
  font-size: 11px;
  padding: 4px 12px;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 6px;
}

.youtube-refresh.spinning {
  pointer-events: none;
  opacity: 0.7;
}

.youtube-refresh.spinning .yt-refresh-icon {
  display: inline-block;
  animation: yt-spin 0.8s linear infinite;
}

/* 推荐流头部提示 */
.yt-rec-header-hint {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 24px 0;
  font-size: 11px;
  color: var(--muted, #64748b);
}

.yt-rec-counter {
  font-weight: 600;
}

.yt-rec-fav-tip {
  opacity: 0.85;
}

/* 底部大号换一批操作栏 */
.yt-next-batch-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px 20px 24px;
}

.yt-next-batch-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 40px;
  padding: 0 28px;
  border-radius: 20px;
  background: var(--surface, #ffffff);
  border: 1px solid var(--border, rgba(0, 0, 0, 0.12));
  color: var(--text, #1e293b);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
  transition: all 0.22s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.yt-next-batch-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  border-color: #ff0000;
  color: #ff0000;
  box-shadow: 0 6px 18px rgba(255, 0, 0, 0.15);
}

.yt-next-batch-btn:active:not(:disabled) {
  transform: translateY(0);
}

.yt-next-batch-btn.spinning .yt-next-batch-icon {
  animation: yt-spin 1s linear infinite;
}

.yt-next-batch-icon {
  font-size: 16px;
  line-height: 1;
}

/* 极简 Toast 提示 */
.yt-toast {
  position: absolute;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(15, 23, 42, 0.9);
  color: #f8fafc;
  font-size: 12px;
  font-weight: 500;
  padding: 8px 18px;
  border-radius: 20px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(10px);
  z-index: 100;
  pointer-events: none;
}

.yt-toast-fade-enter-active,
.yt-toast-fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.yt-toast-fade-enter-from,
.yt-toast-fade-leave-to {
  opacity: 0;
  transform: translate(-50%, 10px);
}

/* YouTube 右键菜单 */
.yt-context-menu {
  position: fixed;
  z-index: 99999;
  min-width: 180px;
  max-width: 260px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 6px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}
.yt-context-menu .menu-head {
  font-size: 11px;
  font-weight: 600;
  color: var(--muted);
  padding: 4px 6px 6px;
  border-bottom: 1px solid var(--border);
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.yt-context-menu .menu-item {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 6px;
  background: transparent;
  border: none;
  border-radius: 4px;
  padding: 6px 8px;
  font-size: 12px;
  color: var(--text);
  cursor: pointer;
  text-align: left;
}
.yt-context-menu .menu-item:hover {
  background: var(--surface-hover);
  color: #ff0000;
}
</style>
