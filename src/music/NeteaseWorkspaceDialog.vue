<template>
  <AppWindowFrame
    id="music-workspace"
    window-id="music"
    title="网易云模块"
    icon="🎵"
    :visible="musicModuleState.visible"
    :default-width="960"
    :default-height="640"
    :min-width="480"
    :min-height="360"
    custom-class="ms-panel ms-source-netease"
    @minimize="handleMinimize"
    @close="handleClose"
  >

    <!-- 网易云工作区内容 -->
    <div class="ms-source-pane ms-netease-source">
      <!-- 用户状态栏 -->
      <div class="ms-netease-user-bar">
        <div class="ms-netease-user-info">
          <template v-if="workspaceState.neteaseUser?.nickname">
            <img
              class="ms-netease-avatar"
              :src="workspaceState.neteaseUser.avatarUrl || DEFAULT_USER_AVATAR"
              alt="avatar"
            />
            <div class="ms-netease-meta">
              <span class="ms-netease-name">
                {{ workspaceState.neteaseUser.nickname }}
                <span v-if="workspaceState.neteaseUser.isVip" class="ms-netease-vip-badge">VIP</span>
              </span>
              <span class="ms-netease-status-text">已连接网易云音乐账户</span>
            </div>
          </template>
          <template v-else>
            <div class="ms-netease-meta">
              <span class="ms-netease-name">免登录模式</span>
              <span class="ms-netease-status-text">畅听精选榜单与全网搜索</span>
            </div>
          </template>
        </div>
        <div style="display: flex; gap: 8px; align-items: center;">
          <button type="button" class="ms-netease-logout-btn" :disabled="musicModuleState.pendingWrites > 0" @click="refreshNetease">⟳ 刷新列表</button>
          <button
            type="button"
            class="ms-netease-logout-btn"
            style="color: #f43f5e; border-color: rgba(244, 63, 94, 0.4); font-weight: 600;"
            @click="openOfficialWebsite"
          >
            官网登录
          </button>
          <button type="button" class="ms-netease-logout-btn" :disabled="websiteConnecting" @click="connectWebsite">{{ websiteConnecting ? "正在连接…" : "连接官网账户" }}</button>
          <button
            v-if="workspaceState.neteaseUser?.nickname"
            type="button"
            class="ms-netease-logout-btn"
            @click="logoutNetease"
          >
            退出登录
          </button>
        </div>
      </div>

      <!-- 歌单与歌曲双栏布局 -->
      <div class="ms-netease-body">
        <!-- 左侧歌单列表 -->
        <div class="ms-netease-playlists">
          <!-- 莱茵唱片专区 -->
          <div class="ms-netease-section-title">官方原声</div>
          <button
            type="button"
            class="ms-netease-pl-item ms-netease-pl-rhine"
            :class="{ active: isShowingRhine }"
            @click="selectRhine"
          >
            <div class="ms-netease-pl-icon-box" style="background: linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(234, 88, 12, 0.2)); color: #f59e0b;">💿</div>
            <div class="ms-netease-pl-info">
              <div class="ms-netease-pl-name">莱茵唱片</div>
              <div class="ms-netease-pl-count">{{ homeMusicState.albums?.length || 0 }} 张官方专辑</div>
            </div>
          </button>

          <div class="ms-netease-section-title">我的歌单 & 精选推荐</div>

          <!-- 1. 我喜欢的音乐专属置顶卡片 -->
          <button
            type="button"
            class="ms-netease-pl-item ms-netease-pl-favorites"
            :class="{ active: isShowingFavorites }"
            @click="selectFavoritesList"
          >
            <div class="ms-netease-pl-icon-box" style="background: rgba(244, 63, 94, 0.15); color: #f43f5e;">❤️</div>
            <div class="ms-netease-pl-info">
              <div class="ms-netease-pl-name">我喜欢的音乐</div>
              <div class="ms-netease-pl-count">{{ (favoritePlaylist?.trackCount ?? workspaceState.neteaseSongs.length) || 0 }} 首曲目</div>
            </div>
          </button>

          <!-- 2. 最近播放入口 -->
          <button
            type="button"
            class="ms-netease-pl-item ms-netease-pl-recent"
            :class="{ active: isShowingRecent }"
            @click="selectRecentList"
          >
            <div class="ms-netease-pl-icon-box">🕒</div>
            <div class="ms-netease-pl-info">
              <div class="ms-netease-pl-name">最近播放记录</div>
              <div class="ms-netease-pl-count">{{ workspaceState.neteaseRecentSongs.length }} 首曲目</div>
            </div>
          </button>

          <!-- 3. 用户其他歌单与精选推荐 -->
          <button
            v-for="pl in userOtherPlaylists"
            :key="pl.id"
            type="button"
            class="ms-netease-pl-item"
            :class="{ active: !isShowingRhine && !isShowingRecent && !isShowingFavorites && workspaceState.neteaseActivePlaylist?.id === pl.id }"
            @click="selectPlaylist(pl)"
          >
            <img class="ms-netease-pl-cover" :src="pl.coverImgUrl" alt="" loading="lazy" />
            <div class="ms-netease-pl-info">
              <div class="ms-netease-pl-name">{{ pl.name }}</div>
              <div class="ms-netease-pl-count">{{ pl.trackCount || 0 }} 首曲目</div>
            </div>
          </button>
        </div>

        <!-- 右侧曲目详情 -->
        <div class="ms-netease-tracks">
          <!-- 莱茵唱片专区 -->
          <template v-if="isShowingRhine">
            <div class="ms-netease-tracks-head">
              <div>
                <div class="ms-netease-tracks-title">莱茵唱片 · 官方原声曲库</div>
                <div class="ms-netease-tracks-sub">
                  塞壬唱片 MSR 出品 · 共 {{ homeMusicState.albums?.length || 0 }} 张官方专辑
                </div>
              </div>
              <div v-if="!selectedRhineAlbum" class="ms-rhine-search-wrap">
                <input
                  v-model="rhineSearchQuery"
                  type="text"
                  class="ms-rhine-search-input"
                  placeholder="搜索专辑或艺术家…"
                />
              </div>
            </div>

            <!-- 专辑下钻曲目详情 -->
            <div v-if="selectedRhineAlbum" class="ms-rhine-album-detail">
              <header class="ms-rhine-detail-banner">
                <button type="button" class="ms-rhine-back-btn" @click="selectedRhineAlbum = null">
                  ‹ 返回专辑列表
                </button>
                <img
                  :src="selectedRhineAlbum.coverUrl || DEFAULT_SIREN_COVER"
                  class="ms-rhine-detail-cover"
                  alt=""
                />
                <div class="ms-rhine-detail-info">
                  <span class="siren-badge">OFFICIAL ALBUM</span>
                  <h2 class="ms-rhine-detail-title">{{ selectedRhineAlbum.name }}</h2>
                  <p class="ms-rhine-detail-sub">塞壬唱片-MSR 出品 · 共 {{ selectedRhineAlbum._songs?.length || 0 }} 首曲目</p>
                  <button
                    type="button"
                    class="ms-rhine-play-album-btn"
                    @click="playWholeRhineAlbum(selectedRhineAlbum)"
                  >
                    ▶ 播放整张专辑
                  </button>
                </div>
              </header>

              <div v-if="rhineSongsLoading" class="ms-netease-loading-box">
                <div class="ms-netease-spinner"></div>
                <div class="ms-netease-loading-tip">正在调取专辑曲目列表…</div>
              </div>
              <div v-else class="ms-rhine-track-list">
                <button
                  v-for="(song, idx) in selectedRhineAlbum._songs || []"
                  :key="song.cid"
                  type="button"
                  class="ms-netease-track-row"
                  :class="{ playing: isCurrentRhineSong(song) }"
                  @click="playRhineSong(song)"
                >
                  <span class="ms-netease-track-idx">
                    <span v-if="isCurrentRhineSong(song)" style="color: #f59e0b;">▶</span>
                    <span v-else>{{ idx + 1 }}</span>
                  </span>
                  <div class="ms-netease-track-info">
                    <span class="ms-netease-track-name" :title="song.name">{{ song.name }}</span>
                    <span class="ms-netease-track-artist">{{ (song.artists || []).join(", ") || "塞壬唱片" }}</span>
                  </div>
                  <div class="ms-netease-track-dur" style="display: flex; align-items: center; gap: 8px;">
                    <button
                      type="button"
                      class="siren-btn-icon"
                      :class="{ liked: isRhineSongLiked(song) }"
                      :title="isRhineSongLiked(song) ? '取消收藏' : '收藏曲目'"
                      @click.stop="toggleRhineLike(song, $event)"
                    >
                      {{ isRhineSongLiked(song) ? "♥" : "♡" }}
                    </button>
                  </div>
                </button>
              </div>
            </div>

            <!-- 专辑网格一览 (适配右栏宽度，每页 8 张) -->
            <div v-else class="ms-rhine-grid-wrap">
              <div v-if="!filteredRhineAlbums.length" class="ms-dropdown-empty" style="padding: 40px 0;">
                正在加载专辑或未找到匹配项…
              </div>
              <template v-else>
                <div class="ms-rhine-album-grid">
                  <div
                    v-for="album in pagedRhineAlbums"
                    :key="album.cid"
                    class="ms-rhine-album-card"
                    @click="openRhineAlbum(album)"
                  >
                    <div class="ms-rhine-cover-wrap">
                      <img :src="album.coverUrl || DEFAULT_SIREN_COVER" class="ms-rhine-cover" alt="" loading="lazy" />
                      <div class="ms-rhine-hover-play">▶</div>
                    </div>
                    <div class="ms-rhine-meta">
                      <span class="ms-rhine-album-name" :title="album.name">{{ album.name }}</span>
                      <span class="ms-rhine-corp">塞壬唱片 MSR</span>
                    </div>
                  </div>
                </div>

                <!-- 8 专辑分页控制底栏 -->
                <div v-if="rhineTotalPages > 1" class="ms-netease-pagination-bar ms-rhine-pagination-bar">
                  <span class="ms-pagination-info">
                    第 {{ rhinePage }} / {{ rhineTotalPages }} 页 · 共 {{ filteredRhineAlbums.length }} 张专辑
                  </span>
                  <div class="ms-pagination-btns">
                    <button
                      type="button"
                      class="ms-page-btn"
                      :disabled="rhinePage <= 1"
                      title="首页"
                      @click="rhinePage = 1"
                    >
                      «
                    </button>
                    <button
                      type="button"
                      class="ms-page-btn"
                      :disabled="rhinePage <= 1"
                      title="上一页"
                      @click="rhinePage = Math.max(1, rhinePage - 1)"
                    >
                      ◀
                    </button>

                    <button
                      v-for="p in visibleRhinePages"
                      :key="'rpage-' + p"
                      type="button"
                      class="ms-page-btn"
                      :class="{ active: p === rhinePage }"
                      @click="rhinePage = p"
                    >
                      {{ p }}
                    </button>

                    <button
                      type="button"
                      class="ms-page-btn"
                      :disabled="rhinePage >= rhineTotalPages"
                      title="下一页"
                      @click="rhinePage = Math.min(rhineTotalPages, rhinePage + 1)"
                    >
                      ▶
                    </button>
                    <button
                      type="button"
                      class="ms-page-btn"
                      :disabled="rhinePage >= rhineTotalPages"
                      title="尾页"
                      @click="rhinePage = rhineTotalPages"
                    >
                      »
                    </button>
                  </div>
                </div>
              </template>
            </div>
          </template>

          <!-- 网易云常规曲目专区 -->
          <template v-else>
            <!-- 搜索条与最近听过快捷栏 -->
            <div class="ms-netease-search-wrap" ref="searchWrapRef">
            <input
              type="text"
              class="ms-netease-search-input"
              placeholder="全网搜索网易云单曲、歌手名或专辑…"
              v-model="searchQuery"
              @keydown.enter="onSearchEnter"
              @input="onSearchInput"
              @focus="isSearchFocused = true"
            />
            <!-- 聚焦时浮现的搜索历史与历史听歌面板 -->
            <div
              v-if="isSearchFocused && !searchQuery.trim()"
              class="ms-netease-search-dropdown"
              @mousedown.prevent
            >
              <!-- 搜索历史关键词 -->
              <div v-if="searchHistory.length > 0" class="ms-dropdown-section">
                <div class="ms-dropdown-head">
                  <span class="ms-dropdown-title">🔍 搜索历史</span>
                  <button type="button" class="ms-dropdown-clear" @click="clearSearchHistory">清空</button>
                </div>
                <div class="ms-search-history-tags">
                  <span
                    v-for="kw in searchHistory"
                    :key="'hist-' + kw"
                    class="ms-search-tag"
                    @click="applySearchHistory(kw)"
                  >
                    {{ kw }}
                    <b class="ms-tag-del" @click.stop="removeSearchHistory(kw)">×</b>
                  </span>
                </div>
              </div>

              <!-- 历史听歌记录 -->
              <div v-if="workspaceState.neteaseRecentSongs.length > 0" class="ms-dropdown-section">
                <div class="ms-dropdown-head">
                  <span class="ms-dropdown-title">🕒 历史听歌记录</span>
                  <button type="button" class="ms-dropdown-clear" @click="workspace.clearRecent()">清空</button>
                </div>
                <div class="ms-recent-dropdown-list">
                  <div
                    v-for="s in workspaceState.neteaseRecentSongs.slice(0, 8)"
                    :key="'drop-rec-' + s.id"
                    class="ms-recent-dropdown-item"
                    :class="{ playing: isCurrentSong(s) }"
                    @click="playNetease(s); isSearchFocused = false;"
                  >
                    <span class="ms-drop-play">{{ isCurrentSong(s) ? '▶' : '♫' }}</span>
                    <span class="ms-drop-title">{{ s.name }}</span>
                    <span class="ms-drop-artist">{{ getSongArtists(s) }}</span>
                    <span class="ms-drop-dur">{{ formatDuration(s) }}</span>
                  </div>
                </div>
              </div>

              <div v-if="!searchHistory.length && !workspaceState.neteaseRecentSongs.length" class="ms-dropdown-empty">
                暂无搜索与播放历史，输入歌名或歌手即可开始畅听
              </div>
            </div>
          </div>

          <!-- 提示横幅 -->
          <div v-if="workspaceState.message" class="ms-netease-msg-banner">
            <span>{{ workspaceState.message }}</span>
          </div>

          <div class="ms-netease-tracks-head">
            <div>
              <div class="ms-netease-tracks-title">
                {{ isSearching ? `搜索结果 (${workspaceState.neteaseSearchResults.length})` : isShowingRecent ? `最近播放记录 (${workspaceState.neteaseRecentSongs.length})` : isShowingFavorites ? `我喜欢的音乐 (${workspaceState.neteaseSongs.length})` : (workspaceState.neteaseActivePlaylist?.name || "我喜欢的音乐") }}
              </div>
              <div class="ms-netease-tracks-sub">
                {{ isSearching ? "网易云曲库实时检索" : isShowingRecent ? "近期点播收听的历史歌曲" : isShowingFavorites ? "个人云端红心曲库，点击即可一键开始高保真串流播放" : "点击歌曲即可一键开始高保真串流播放" }}
              </div>
            </div>
            <button v-if="isSearching" type="button" class="ms-netease-logout-btn" @click="clearSearch">清除搜索</button>
            <button v-else-if="isShowingRecent && workspaceState.neteaseRecentSongs.length > 0" type="button" class="ms-netease-logout-btn" @click="workspace.clearRecent()">清空记录</button>
          </div>

          <!-- 加载中 -->
          <div v-if="workspaceState.neteaseLoading" class="ms-netease-loading-box">
            <div class="ms-netease-spinner"></div>
            <div class="ms-netease-loading-tip">正在同步网易云音源与歌单…</div>
          </div>

          <!-- 歌曲列表 -->
          <template v-else>
            <div
              v-for="(song, idx) in pagedSongList"
              :key="song.id || idx"
              class="ms-netease-track-row"
              :class="{ playing: isCurrentSong(song) }"
              @click="playNetease(song)"
            >
              <span class="ms-netease-track-idx">{{ isCurrentSong(song) ? "▶" : ((page - 1) * pageSize + idx + 1) }}</span>
              <img class="ms-netease-track-cover" :src="getSongCover(song)" alt="" loading="lazy" />
              <div class="ms-netease-track-info">
                <div class="ms-netease-track-name">{{ song.name }}</div>
                <div class="ms-netease-track-artist">{{ getSongArtists(song) }}</div>
              </div>
              <span class="ms-netease-track-dur">{{ formatDuration(song) }}</span>
            </div>
            <div v-if="!currentSongList.length" style="padding: 30px; text-align: center; color: var(--muted); font-size: 13px;">
              未找到曲目，可尝试在上方搜索框输入关键词
            </div>

              <!-- 10 首分页控制底栏 -->
              <div v-if="totalPages > 1" class="ms-netease-pagination-bar">
                <span class="ms-pagination-info">
                  第 {{ page }} / {{ totalPages }} 页 · 共 {{ currentSongList.length }} 首
                </span>
                <div class="ms-pagination-btns">
                  <button
                    type="button"
                    class="ms-page-btn"
                    :disabled="page <= 1"
                    title="上一页"
                    @click="prevPage"
                  >
                    ◀ 上一页
                  </button>
                  <button
                    type="button"
                    class="ms-page-btn"
                    :disabled="page >= totalPages"
                    title="下一页"
                    @click="nextPage"
                  >
                    下一页 ▶
                  </button>
                </div>
              </div>
            </template>
          </template>
        </div>
      </div>
    </div>

    <!-- 底部常驻播放控制条 -->
    <footer style="display: flex; align-items: center; gap: 12px; padding: 10px 16px; border-top: 1px solid var(--border); background: var(--panel);">
      <img
        :src="homeMusicState.coverUrl || DEFAULT_SIREN_COVER"
        alt=""
        style="width: 42px; height: 42px; border-radius: 8px; object-fit: cover; flex-shrink: 0;"
      />
      <div style="flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 4px;">
        <div style="display: flex; justify-content: space-between; font-size: 12px;">
          <span style="font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; color: var(--heading);">{{ homeMusicState.title || "暂无播放曲目" }}</span>
          <span style="color: var(--muted); font-size: 11px;">{{ homeMusicState.formattedCurrent }} / {{ homeMusicState.formattedDuration }}</span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          step="0.1"
          :value="homeMusicState.progressPercent"
          @input="onSeek"
          style="width: 100%; height: 4px; accent-color: #f43f5e; cursor: pointer;"
        />
      </div>
      <div style="display: flex; align-items: center; gap: 6px;">
        <button type="button" class="ms-netease-logout-btn" @click="controller.prev()" title="上一首">⏮</button>
        <button
          type="button"
          class="ms-netease-logout-btn"
          style="background: #f43f5e; color: #fff; border-color: #f43f5e;"
          @click="controller.togglePlay()"
          :title="homeMusicState.playing ? '暂停' : '播放'"
        >
          {{ homeMusicState.playing ? "⏸" : "▶" }}
        </button>
        <button type="button" class="ms-netease-logout-btn" @click="controller.next()" title="下一首">⏭</button>
        <button type="button" class="ms-netease-logout-btn" @click="controller.cycleMode()" :title="homeMusicState.mode">
          {{ modeEmoji }}
        </button>
      </div>
    </footer>
  </AppWindowFrame>
</template>

<script setup lang="ts">
import { CACHED_FAVORITES_KEY, CACHED_PLAYLISTS_KEY, removePlaylistCache } from "./playlist-cache";
import { ref, computed, onMounted, onBeforeUnmount, watch } from "vue";
import { createMusicWorkspaceData } from "./workspace-data";
import { musicModuleState, onMusicPause } from "./module-state";
const pageVisible = ref(!document.hidden);
const active = computed(() => musicModuleState.visible && pageVisible.value);
const workspace = createMusicWorkspaceData(() => active.value);
const workspaceState = workspace.state;

const websiteConnecting = ref(false);
const websiteStatus = ref("先在同一浏览器的网易云官网登录，再点击「连接官网账户」。无需音乐节点；插件断开不会退出官网。");

function openOfficialWebsite() {
  if (typeof chrome !== "undefined" && chrome.tabs?.create) {
    void chrome.tabs.create({ url: "https://music.163.com/" });
  } else {
    window.open("https://music.163.com/", "_blank", "noopener,noreferrer");
  }
}
async function connectWebsite() {
  if (websiteConnecting.value) return;
  websiteConnecting.value = true;
  websiteStatus.value = "正在使用浏览器官网会话读取账户…";
  try {
    await workspace.connectWebsite();
    websiteStatus.value = "官网账户已连接。若歌单读取失败，请查看列表提示。";
  } catch (error: any) {
    websiteStatus.value = error?.message || "官网账户连接失败，请确认已登录。";
  } finally {
    websiteConnecting.value = false;
  }
}
async function logoutNetease() {
  await workspace.logout();
  homeMusicState.neteaseUser = null;
  homeMusicState.neteaseSongs = [];
  homeMusicState.neteasePlaylists = [];
  websiteStatus.value = "已断开插件账户，官网仍保持登录。";
}
import AppWindowFrame from "../core/AppWindowFrame.vue";
import {
  homeMusicState,
  homeMusicController as controller,
  DEFAULT_COVER,
  DEFAULT_SIREN_COVER,
  type MusicSong,
  type MusicAlbum
} from "./store";

const DEFAULT_USER_AVATAR =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Ccircle cx='32' cy='32' r='30' fill='%23334155'/%3E%3Ccircle cx='32' cy='24' r='10' fill='%2364748b'/%3E%3Cpath d='M16 52c0-8.8 7.2-16 16-16s16 7.2 16 16' fill='%2364748b'/%3E%3C/svg%3E";

import { type NeteasePlaylist, type NeteaseSong } from "../services/netease.service";
import { musicService } from "../services/music.service";
import { windowManagerController } from "../core/window-manager.store";

const searchWrapRef = ref<HTMLElement | null>(null);
const searchQuery = ref("");
const isSearchFocused = ref(false);
let searchTimer: ReturnType<typeof setTimeout> | null = null;

const searchHistory = ref<string[]>([]);
try {
  const rawHist = localStorage.getItem("netease_search_history");
  if (rawHist) {
    const parsed = JSON.parse(rawHist);
    if (Array.isArray(parsed)) searchHistory.value = parsed.slice(0, 15);
  }
} catch {}

function addSearchHistory(kw: string) {
  const clean = kw.trim();
  if (!clean) return;
  searchHistory.value = [clean, ...searchHistory.value.filter((k) => k !== clean)].slice(0, 15);
  try {
    localStorage.setItem("netease_search_history", JSON.stringify(searchHistory.value));
  } catch {}
}

function removeSearchHistory(kw: string) {
  searchHistory.value = searchHistory.value.filter((k) => k !== kw);
  try {
    localStorage.setItem("netease_search_history", JSON.stringify(searchHistory.value));
  } catch {}
}

function clearSearchHistory() {
  searchHistory.value = [];
  try {
    localStorage.removeItem("netease_search_history");
  } catch {}
}

function applySearchHistory(kw: string) {
  searchQuery.value = kw;
  isSearchFocused.value = false;
  void workspace.search(kw);
}

function onDocumentClick(e: MouseEvent) {
  const target = e.target as HTMLElement | null;
  if (!target?.closest(".ms-netease-search-wrap")) {
    isSearchFocused.value = false;
  }
}

const isShowingRecent = ref(false);
const isShowingRhine = ref(false);
const selectedRhineAlbum = ref<MusicAlbum | null>(null);
const rhineSongsLoading = ref(false);
const rhineSearchQuery = ref("");
const rhinePage = ref(1);
const rhinePageSize = 8;

const filteredRhineAlbums = computed(() => {
  const list = homeMusicState.albums || [];
  const q = rhineSearchQuery.value.trim().toLowerCase();
  if (!q) return list;
  return list.filter((a) => (a.name || "").toLowerCase().includes(q));
});

const rhineTotalPages = computed(() => Math.max(1, Math.ceil(filteredRhineAlbums.value.length / rhinePageSize)));

const pagedRhineAlbums = computed(() => {
  const start = (rhinePage.value - 1) * rhinePageSize;
  return filteredRhineAlbums.value.slice(start, start + rhinePageSize);
});

const visibleRhinePages = computed(() => {
  const total = rhineTotalPages.value;
  const cur = rhinePage.value;
  const pages: number[] = [];
  const start = Math.max(1, cur - 2);
  const end = Math.min(total, cur + 2);
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  return pages;
});

watch(rhineSearchQuery, () => {
  rhinePage.value = 1;
});

function selectRhine() {
  workspace.pause();
  isShowingRhine.value = true;
  isShowingRecent.value = false;
  selectedRhineAlbum.value = null;
  if (!homeMusicState.albums || homeMusicState.albums.length === 0) {
    void musicService.getSirenAlbums().then((albums) => {
      if (albums?.length) homeMusicState.albums = albums;
    });
  }
}

async function openRhineAlbum(album: MusicAlbum) {
  selectedRhineAlbum.value = album;
  if (!album._songs || !album._songs.length) {
    rhineSongsLoading.value = true;
    try {
      const songs = await musicService.getSirenAlbumDetail(album.cid);
      album._songs = songs;
      selectedRhineAlbum.value = { ...album, _songs: songs };
    } catch (e) {
      console.warn("加载专辑曲目失败", e);
    } finally {
      rhineSongsLoading.value = false;
    }
  }
}

function playRhineSong(song: MusicSong) {
  if (selectedRhineAlbum.value?._songs?.length) {
    const songs = selectedRhineAlbum.value._songs;
    const idx = songs.findIndex((s) => String(s.cid) === String(song.cid));
    musicService.setQueue(songs, idx >= 0 ? idx : 0, true);
    homeMusicState.activeAlbum = selectedRhineAlbum.value;
  } else {
    void musicService.playSong(song);
  }
}

function playWholeRhineAlbum(album: MusicAlbum) {
  const songs = album._songs || [];
  if (songs.length > 0) {
    musicService.setQueue(songs, 0, true);
    homeMusicState.activeAlbum = album;
  }
}

function isCurrentRhineSong(song: MusicSong): boolean {
  if (!homeMusicState.playing) return false;
  const curr = musicService.getState().currentSong;
  return Boolean(curr && String(curr.cid) === String(song.cid));
}

function isRhineSongLiked(song: MusicSong): boolean {
  return musicService.isLiked(song.cid);
}

function toggleRhineLike(song: MusicSong, e?: Event) {
  e?.stopPropagation();
  const liked = musicService.toggleLike(song);
  if (isCurrentRhineSong(song)) {
    homeMusicState.liked = liked;
  }
}

const favoritePlaylist = computed(() => {
  return workspaceState.neteasePlaylists.find(p => p.name?.includes("喜欢的音乐") || p.specialType === 5);
});

const userOtherPlaylists = computed(() => {
  const fav = favoritePlaylist.value;
  if (!fav) return workspaceState.neteasePlaylists;
  return workspaceState.neteasePlaylists.filter(p => p.id !== fav.id);
});

const isShowingFavorites = computed(() => {
  if (isShowingRhine.value || isShowingRecent.value || isSearching.value) return false;
  return favoritePlaylist.value && workspaceState.neteaseActivePlaylist?.id === favoritePlaylist.value.id;
});

function selectFavoritesList() {
  workspace.pause();
  isShowingRhine.value = false;
  selectedRhineAlbum.value = null;
  isShowingRecent.value = false;
  const fav = favoritePlaylist.value;
  if (fav) {
    void workspace.selectPlaylist(fav);
  } else if (workspaceState.neteasePlaylists[0]) {
    void workspace.selectPlaylist(workspaceState.neteasePlaylists[0]);
  }
}

const isSearching = computed(() => {
  return searchQuery.value.trim().length > 0 && workspaceState.neteaseSearchResults.length > 0;
});

const currentSongList = computed<NeteaseSong[]>(() => {
  if (isSearching.value) {
    return workspaceState.neteaseSearchResults;
  }
  if (isShowingRecent.value) {
    return workspaceState.neteaseRecentSongs;
  }
  return workspaceState.neteaseSongs;
});

// 10 首歌分页逻辑
const page = ref(1);
const pageSize = 10;
const totalPages = computed(() => Math.max(1, Math.ceil(currentSongList.value.length / pageSize)));

const pagedSongList = computed(() => {
  const start = (page.value - 1) * pageSize;
  return currentSongList.value.slice(start, start + pageSize);
});

watch(
  () => [workspaceState.neteaseActivePlaylist?.id, isSearching.value, isShowingRecent.value],
  () => {
    page.value = 1;
  }
);

watch(totalPages, (max) => {
  if (page.value > max) {
    page.value = Math.max(1, max);
  }
});

function prevPage() {
  if (page.value > 1) page.value--;
}

function nextPage() {
  if (page.value < totalPages.value) page.value++;
}

const modeEmoji = computed(() => {
  if (homeMusicState.mode === "shuffle") return "🔀";
  if (homeMusicState.mode === "one") return "🔂";
  return "🔁";
});

function handleMinimize() { windowManagerController.minimize("music"); }

function handleClose() {
  void windowManagerController.close("music");
}

function selectRecentList() {
  workspace.pause();
  isShowingRhine.value = false;
  selectedRhineAlbum.value = null;
  isShowingRecent.value = true;
  workspaceState.neteaseActivePlaylist = null;
}

function selectPlaylist(pl: NeteasePlaylist) {
  isShowingRhine.value = false;
  selectedRhineAlbum.value = null;
  isShowingRecent.value = false;
  void workspace.selectPlaylist(pl);
}

function onSearchInput() {
  workspace.pause();
  if (searchTimer) clearTimeout(searchTimer);
  searchTimer = setTimeout(() => {
    if (!active.value) return;
    const q = searchQuery.value.trim();
    if (q) addSearchHistory(q);
    void workspace.search(searchQuery.value);
  }, 400);
}

function onSearchEnter() {
  if (searchTimer) clearTimeout(searchTimer);
  const q = searchQuery.value.trim();
  if (q) addSearchHistory(q);
  isSearchFocused.value = false;
  void workspace.search(searchQuery.value);
}

function clearSearch() {
  workspace.pause();
  searchQuery.value = "";
  workspaceState.neteaseSearchResults = [];
}

function playNetease(song: NeteaseSong) {
  controller.playNeteaseTrack(song);
}

function isCurrentSong(song: any): boolean {
  if (song.id && String(song.id) === String(musicService.getState().currentSong?.neteaseId)) {
    return true;
  }
  if (song.cid && String(song.cid) === String(musicService.getState().currentSong?.cid)) {
    return true;
  }
  return false;
}

function getSongCover(song: NeteaseSong): string {
  return song.picUrl || song.coverUrl || song.al?.picUrl || song.album?.picUrl || DEFAULT_COVER;
}

function getSongArtists(song: NeteaseSong): string {
  const list = song.ar || song.artists;
  if (Array.isArray(list) && list.length) {
    return list.map((a: any) => a.name).join(", ");
  }
  return "未知歌手";
}

function formatDuration(song: NeteaseSong): string {
  const ms = song.dt || song.duration || 0;
  const sec = Math.floor(ms > 1000 ? ms / 1000 : ms);
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

function onSeek(e: Event) {
  const val = Number((e.target as HTMLInputElement).value);
  controller.seek(val);
}

function refreshNetease() {
  void workspace.refresh();
}

function pauseView() {
  workspace.pause();
  if (searchTimer) clearTimeout(searchTimer);
  searchTimer = null; isSearchFocused.value = false;
  document.removeEventListener("click", onDocumentClick);
}
const detachPause = onMusicPause(pauseView);
let initialRequested = false;
function initialRead() { if (!initialRequested && active.value) { initialRequested = true; void workspace.refresh(); } }
function visibility() { pageVisible.value = !document.hidden; }
function recentUpdated() { workspace.syncLocal(); }
function accountUpdated() { workspace.accountChanged(); }
watch(active, visible => {
  if (!visible) pauseView();
  else { workspace.syncLocal(); document.addEventListener("click", onDocumentClick); initialRead(); }
}, { flush: "sync" });
onMounted(() => {
  document.addEventListener("visibilitychange", visibility);
  window.addEventListener("netease:recent-updated", recentUpdated);
  window.addEventListener("netease:account-updated", accountUpdated);
  workspace.syncLocal();
  if (active.value) { document.addEventListener("click", onDocumentClick); initialRead(); }
});
onBeforeUnmount(() => {
  pauseView(); detachPause(); workspace.dispose();
  document.removeEventListener("visibilitychange", visibility);
  window.removeEventListener("netease:recent-updated", recentUpdated);
  window.removeEventListener("netease:account-updated", accountUpdated);
});
</script>

<style scoped>
.ms-netease-search-wrap {
  position: relative;
}

.ms-netease-search-dropdown {
  position: absolute;
  top: 100%;
  left: 4px;
  right: 4px;
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: 10px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  padding: 12px;
  margin-top: 6px;
  z-index: 100;
  max-height: 380px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.ms-dropdown-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.ms-dropdown-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.ms-dropdown-title {
  font-size: 11.5px;
  font-weight: 600;
  color: var(--muted, #94a3b8);
}

.ms-dropdown-clear {
  background: transparent;
  border: none;
  font-size: 11px;
  color: var(--muted, #94a3b8);
  cursor: pointer;
  padding: 2px 4px;
  border-radius: 4px;
  transition: color 0.15s ease;
}

.ms-dropdown-clear:hover {
  color: #f43f5e;
}

.ms-search-history-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.ms-search-tag {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 8px;
  border-radius: 6px;
  background: var(--surface, #272730);
  border: 1px solid var(--border, rgba(255, 255, 255, 0.08));
  font-size: 11.5px;
  color: var(--text, #f1f5f9);
  cursor: pointer;
  transition: all 0.15s ease;
}

.ms-search-tag:hover {
  border-color: #f43f5e;
  color: #f43f5e;
}

.ms-tag-del {
  font-weight: normal;
  font-size: 12px;
  line-height: 1;
  color: var(--muted, #94a3b8);
  padding: 0 2px;
  border-radius: 50%;
}

.ms-tag-del:hover {
  color: #ef4444;
}

.ms-recent-dropdown-list {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.ms-recent-dropdown-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 8px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 12px;
  transition: background 0.15s ease;
}

.ms-recent-dropdown-item:hover {
  background: var(--surface-hover, rgba(255, 255, 255, 0.06));
}

.ms-recent-dropdown-item.playing {
  color: #f43f5e;
  background: rgba(244, 63, 94, 0.1);
  font-weight: 600;
}

.ms-drop-play {
  font-size: 11px;
  width: 14px;
  text-align: center;
  color: #f43f5e;
  flex-shrink: 0;
}

.ms-drop-title {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: var(--text, #f1f5f9);
}

.ms-recent-dropdown-item.playing .ms-drop-title {
  color: #f43f5e;
}

.ms-drop-artist {
  max-width: 130px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 11px;
  color: var(--muted, #94a3b8);
}

.ms-drop-dur {
  font-size: 11px;
  color: var(--dim, #64748b);
  font-family: monospace;
  margin-left: 4px;
  flex-shrink: 0;
}

.ms-dropdown-empty {
  font-size: 11.5px;
  color: var(--muted, #94a3b8);
  text-align: center;
  padding: 12px 6px;
}

.ms-netease-recent-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
  padding: 4px 8px;
  background: var(--surface);
  border-radius: 8px;
  border: 1px solid var(--border);
  overflow: hidden;
}
.ms-netease-recent-label {
  font-size: 11.5px;
  font-weight: 600;
  color: var(--muted);
  white-space: nowrap;
  flex-shrink: 0;
}
.ms-netease-recent-chips {
  display: flex;
  align-items: center;
  gap: 6px;
  overflow-x: auto;
  scrollbar-width: none;
  flex: 1;
  min-width: 0;
}
.ms-netease-recent-chips::-webkit-scrollbar {
  display: none;
}
.ms-netease-recent-chip {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 8px;
  border-radius: 6px;
  background: var(--panel);
  border: 1px solid var(--border);
  font-size: 11.5px;
  color: var(--text);
  white-space: nowrap;
  cursor: pointer;
  transition: all 0.15s ease;
  max-width: 140px;
}
.ms-netease-recent-chip:hover {
  background: var(--surface-hover, rgba(255, 255, 255, 0.08));
  border-color: #f43f5e;
  color: #f43f5e;
}
.ms-netease-recent-chip.playing {
  background: rgba(244, 63, 94, 0.15);
  border-color: #f43f5e;
  color: #f43f5e;
  font-weight: 600;
}
.ms-chip-icon {
  font-size: 10px;
  color: #f43f5e;
}
.ms-chip-text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.ms-netease-recent-clear-btn {
  font-size: 11px;
  color: var(--muted);
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 2px 6px;
  border-radius: 4px;
  flex-shrink: 0;
  transition: color 0.15s ease;
}
.ms-netease-recent-clear-btn:hover {
  color: #f43f5e;
}
.ms-netease-pl-icon-box {
  width: 44px;
  height: 44px;
  border-radius: 8px;
  background: rgba(244, 63, 94, 0.12);
  color: #f43f5e;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  flex-shrink: 0;
}
.ms-netease-msg-banner {
  margin: 6px 14px;
  padding: 7px 12px;
  background: color-mix(in srgb, var(--panel) 92%, var(--text) 8%);
  border: 1px solid var(--border);
  border-radius: 8px;
  font-size: 11px;
  color: var(--text);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}
.ms-msg-action {
  background: #f43f5e;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 3px 8px;
  font-size: 10.5px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
}
.ms-msg-action:hover {
  background: #e11d48;
}

/* 翻页底栏 */
.ms-netease-pagination-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 14px 4px;
  border-top: 1px solid var(--border);
  margin-top: 8px;
  flex-shrink: 0;
}
.ms-pagination-info {
  font-size: 11.5px;
  color: var(--muted);
  font-variant-numeric: tabular-nums;
  font-weight: 500;
}
.ms-pagination-btns {
  display: flex;
  align-items: center;
  gap: 6px;
}
.ms-page-btn {
  background: var(--surface);
  color: var(--heading);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 4px 10px;
  font-size: 11.5px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.12s ease;
}
.ms-page-btn:hover:not(:disabled) {
  background: rgba(244, 63, 94, 0.12);
  border-color: #f43f5e;
  color: #f43f5e;
}
.ms-page-btn:disabled {
  opacity: 0.38;
  cursor: not-allowed;
}

/* 官方扫码登录独立浮层 */
.ms-netease-qr-modal-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: qrFadeIn 0.2s ease;
}
@keyframes qrFadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
.ms-netease-qr-card {
  width: 320px;
  background: var(--panel);
  border: 1px solid var(--border);
  border-radius: 14px;
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.ms-qr-card-header {
  height: 44px;
  padding: 0 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--border);
  background: var(--surface);
}
.ms-qr-card-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: var(--heading);
  font-weight: 700;
}
.ms-qr-close-btn {
  background: transparent;
  border: 0;
  color: var(--muted);
  font-size: 14px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
}
.ms-qr-close-btn:hover {
  background: var(--surface);
  color: var(--heading);
}
.ms-qr-card-body {
  padding: 20px 16px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}
.ms-netease-qr-wrap {
  width: 170px;
  height: 170px;
  background: #fff;
  border-radius: 10px;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
}
.ms-netease-qr-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.ms-qr-loading-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  color: #64748b;
}
.ms-qr-instruction {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  text-align: center;
}
.ms-qr-status-pill {
  font-size: 12.5px;
  color: #f43f5e;
}
.ms-qr-instruction small {
  font-size: 11.5px;
  color: var(--muted);
}
.ms-qr-actions {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 4px;
}

/* 莱茵唱片专区样式适配（契合网易云工作区尺寸与主题） */
.ms-netease-pl-rhine.active {
  background: rgba(245, 158, 11, 0.12);
  border-color: rgba(245, 158, 11, 0.4);
}
.ms-netease-pl-rhine.active .ms-netease-pl-name {
  color: #f59e0b;
  font-weight: 700;
}

.ms-rhine-search-wrap {
  width: 200px;
}
.ms-rhine-search-input {
  width: 100%;
  padding: 5px 10px;
  border-radius: 6px;
  background: var(--surface);
  border: 1px solid var(--border);
  font-size: 11.5px;
  color: var(--text);
  outline: none;
  box-sizing: border-box;
}
.ms-rhine-search-input:focus {
  border-color: #f59e0b;
}

.ms-rhine-grid-wrap {
  flex: 1;
  overflow-y: auto;
  padding: 4px 2px 20px;
}

.ms-rhine-album-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  gap: 12px;
}

.ms-rhine-album-card {
  display: flex;
  flex-direction: column;
  gap: 6px;
  cursor: pointer;
  border-radius: 8px;
  padding: 6px;
  background: var(--surface);
  border: 1px solid var(--border);
  transition: transform 0.16s ease, border-color 0.16s ease, box-shadow 0.16s ease;
}

.ms-rhine-album-card:hover {
  transform: translateY(-2px);
  border-color: #f59e0b;
  box-shadow: 0 4px 12px rgba(245, 158, 11, 0.15);
}

.ms-rhine-cover-wrap {
  position: relative;
  aspect-ratio: 1;
  border-radius: 6px;
  overflow: hidden;
  background: var(--panel);
}

.ms-rhine-cover {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.ms-rhine-hover-play {
  position: absolute;
  right: 6px;
  bottom: 6px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #f59e0b;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  opacity: 0;
  transform: scale(0.85);
  transition: all 0.18s ease;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
}

.ms-rhine-album-card:hover .ms-rhine-hover-play {
  opacity: 1;
  transform: scale(1);
}

.ms-rhine-meta {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.ms-rhine-album-name {
  font-size: 11.5px;
  font-weight: 600;
  color: var(--heading);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ms-rhine-corp {
  font-size: 10px;
  color: var(--muted);
}

/* 专辑下钻详情头 */
.ms-rhine-detail-banner {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px 14px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 10px;
  margin-bottom: 12px;
  position: relative;
}

.ms-rhine-back-btn {
  position: absolute;
  top: 10px;
  right: 12px;
  background: var(--surface);
  border: 1px solid var(--border);
  color: var(--muted);
  padding: 3px 8px;
  border-radius: 5px;
  font-size: 11px;
  cursor: pointer;
  transition: all 0.15s ease;
}
.ms-rhine-back-btn:hover {
  color: var(--heading);
  border-color: #f59e0b;
}

.ms-rhine-detail-cover {
  width: 80px;
  height: 80px;
  border-radius: 6px;
  object-fit: cover;
  border: 1px solid var(--border);
  flex-shrink: 0;
}

.ms-rhine-detail-info {
  display: flex;
  flex-direction: column;
  gap: 3px;
  min-width: 0;
  flex: 1;
}

.ms-rhine-detail-title {
  font-size: 15px;
  font-weight: 700;
  color: var(--heading);
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ms-rhine-detail-sub {
  font-size: 11px;
  color: var(--muted);
  margin: 0;
}

.ms-rhine-play-album-btn {
  margin-top: 6px;
  align-self: flex-start;
  padding: 4px 12px;
  background: linear-gradient(135deg, #f59e0b, #ea580c);
  border: none;
  border-radius: 6px;
  color: #fff;
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.15s ease;
}
.ms-rhine-play-album-btn:hover {
  opacity: 0.9;
}

.ms-rhine-track-list {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.siren-badge {
  font-size: 9.5px;
  font-weight: 700;
  letter-spacing: 0.5px;
  color: #f59e0b;
}

.siren-btn-icon {
  background: transparent;
  border: none;
  font-size: 14px;
  color: var(--muted);
  cursor: pointer;
  padding: 2px 6px;
  border-radius: 4px;
  transition: color 0.15s ease;
}
.siren-btn-icon:hover {
  color: #f43f5e;
}
.siren-btn-icon.liked {
  color: #f43f5e;
}
</style>
