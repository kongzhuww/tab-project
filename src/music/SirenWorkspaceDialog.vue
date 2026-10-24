<script setup lang="ts">
import { computed, ref, onMounted } from "vue";
import AppWindowFrame from "../core/AppWindowFrame.vue";
import { sirenModuleState } from "./module-state";
import { homeMusicState, homeMusicController, DEFAULT_COVER, type MusicSong, type MusicAlbum } from "./store";
import { musicService } from "../services/music.service";

type SirenTab = "songs" | "albums" | "favorites" | "lyrics";

const activeTab = ref<SirenTab>("songs");
const searchQuery = ref("");
const selectedAlbum = ref<MusicAlbum | null>(null);
const albumSongsLoading = ref(false);

const DEFAULT_SIREN_COVER = DEFAULT_COVER || "assets/vinyl.svg";

onMounted(async () => {
  if (!homeMusicState.songs || homeMusicState.songs.length === 0) {
    try {
      const songs = await musicService.getSirenSongs();
      if (songs?.length) homeMusicState.songs = songs;
    } catch {}
  }
  if (!homeMusicState.albums || homeMusicState.albums.length === 0) {
    try {
      const albums = await musicService.getSirenAlbums();
      if (albums?.length) homeMusicState.albums = albums;
    } catch {}
  }
});

function close() {
  sirenModuleState.visible = false;
}

const filteredSongs = computed(() => {
  const list = homeMusicState.songs || [];
  const q = searchQuery.value.trim().toLowerCase();
  if (!q) return list;
  return list.filter((s) => {
    const nameMatch = (s.name || "").toLowerCase().includes(q);
    const artistMatch = (s.artists || []).some((a) => a.toLowerCase().includes(q));
    return nameMatch || artistMatch;
  });
});

const filteredAlbums = computed(() => {
  const list = homeMusicState.albums || [];
  const q = searchQuery.value.trim().toLowerCase();
  if (!q) return list;
  return list.filter((a) => (a.name || "").toLowerCase().includes(q));
});

const favoriteSongs = computed(() => {
  const favs = homeMusicState.favorites || [];
  const q = searchQuery.value.trim().toLowerCase();
  if (!q) return favs;
  return favs.filter((s) => {
    const nameMatch = (s.name || "").toLowerCase().includes(q);
    const artistMatch = (s.artists || []).some((a) => a.toLowerCase().includes(q));
    return nameMatch || artistMatch;
  });
});

function isCurrentSong(song: MusicSong): boolean {
  if (!homeMusicState.playing) return false;
  const curr = musicService.getState().currentSong;
  return Boolean(curr && String(curr.cid) === String(song.cid));
}

function playSong(song: MusicSong) {
  homeMusicController.playTrack(song.cid);
}

async function openAlbum(album: MusicAlbum) {
  selectedAlbum.value = album;
  if (!album._songs || !album._songs.length) {
    albumSongsLoading.value = true;
    try {
      const songs = await musicService.getSirenAlbumDetail(album.cid);
      album._songs = songs;
    } catch (e) {
      console.warn("加载专辑曲目失败", e);
    } finally {
      albumSongsLoading.value = false;
    }
  }
}

function backToAlbums() {
  selectedAlbum.value = null;
}

function playWholeAlbum(album: MusicAlbum) {
  const songs = album._songs || [];
  if (songs.length > 0) {
    musicService.setQueue(songs, 0, true);
    homeMusicState.activeAlbum = album;
  }
}

function toggleSongLike(song: MusicSong, e?: Event) {
  e?.stopPropagation();
  const liked = musicService.toggleLike(song);
  if (isCurrentSong(song)) {
    homeMusicState.liked = liked;
  }
}

function isSongLiked(song: MusicSong): boolean {
  return musicService.isLiked(song.cid);
}

function getSongCover(song: MusicSong): string {
  if (song.coverUrl) return song.coverUrl;
  if (song.albumCid) {
    const alb = homeMusicState.albums?.find((a) => String(a.cid) === String(song.albumCid));
    if (alb?.coverUrl) return alb.coverUrl;
  }
  return DEFAULT_SIREN_COVER;
}

function onSeek(e: Event) {
  const val = Number((e.target as HTMLInputElement).value);
  homeMusicController.seek(val);
}

const modeEmoji = computed(() => {
  if (homeMusicState.mode === "shuffle") return "🔀";
  if (homeMusicState.mode === "one") return "🔂";
  return "🔁";
});
</script>

<template>
  <AppWindowFrame
    window-id="siren"
    title="塞壬唱片模块"
    icon="💿"
    :visible="sirenModuleState.visible"
    :default-width="880"
    :default-height="620"
    :min-width="600"
    :min-height="450"
    custom-class="siren-workspace"
    @close="close"
    @minimize="close"
  >
    <div class="siren-container">
      <!-- 顶部控制与检索栏 -->
      <header class="siren-top-bar">
        <!-- 标签页导航 -->
        <nav class="siren-nav-tabs">
          <button
            type="button"
            class="siren-nav-btn"
            :class="{ active: activeTab === 'songs' }"
            @click="activeTab = 'songs'"
          >
            🎵 单曲曲库
          </button>
          <button
            type="button"
            class="siren-nav-btn"
            :class="{ active: activeTab === 'albums' }"
            @click="activeTab = 'albums'"
          >
            💿 官方专辑
          </button>
          <button
            type="button"
            class="siren-nav-btn"
            :class="{ active: activeTab === 'favorites' }"
            @click="activeTab = 'favorites'"
          >
            ♥️ 我的收藏 ({{ homeMusicState.favorites?.length || 0 }})
          </button>
          <button
            type="button"
            class="siren-nav-btn"
            :class="{ active: activeTab === 'lyrics' }"
            @click="activeTab = 'lyrics'"
          >
            📜 沉浸歌词
          </button>
        </nav>

        <!-- 搜索过滤框 -->
        <div class="siren-search-box">
          <span class="siren-search-icon">🔍</span>
          <input
            v-model="searchQuery"
            type="text"
            class="siren-search-input"
            placeholder="搜索塞壬原声、专辑或艺术家…"
          />
          <button
            v-if="searchQuery"
            type="button"
            class="siren-search-clear"
            @click="searchQuery = ''"
          >
            ✕
          </button>
        </div>

        <div class="siren-stats-chip">
          {{ homeMusicState.songs?.length || 0 }} 首原声 · {{ homeMusicState.albums?.length || 0 }} 张专辑
        </div>
      </header>

      <!-- 主视图区 -->
      <main class="siren-body">
        <!-- 1. 全部歌曲 -->
        <section v-show="activeTab === 'songs'" class="siren-pane">
          <div v-if="!filteredSongs.length" class="siren-empty">
            {{ searchQuery ? "未找到符合条件的塞壬曲目" : "正在加载塞壬曲库…" }}
          </div>
          <div v-else class="siren-track-table">
            <div class="siren-track-head">
              <span class="col-num">#</span>
              <span class="col-title">曲名</span>
              <span class="col-artist">艺术家</span>
              <span class="col-act">操作</span>
            </div>
            <div class="siren-track-rows">
              <div
                v-for="(song, idx) in filteredSongs"
                :key="song.cid"
                class="siren-track-row"
                :class="{ playing: isCurrentSong(song) }"
                @click="playSong(song)"
              >
                <span class="col-num">
                  <span v-if="isCurrentSong(song)" class="siren-playing-wave">▶</span>
                  <span v-else>{{ idx + 1 }}</span>
                </span>
                <div class="col-title">
                  <img :src="getSongCover(song)" class="siren-track-thumb" alt="" loading="lazy" />
                  <span class="siren-track-name" :title="song.name">{{ song.name }}</span>
                </div>
                <div class="col-artist" :title="(song.artists || []).join(', ') || '塞壬唱片'">
                  {{ (song.artists || []).join(", ") || "塞壬唱片" }}
                </div>
                <div class="col-act" @click.stop>
                  <button
                    type="button"
                    class="siren-btn-icon"
                    :class="{ liked: isSongLiked(song) }"
                    :title="isSongLiked(song) ? '取消收藏' : '收藏曲目'"
                    @click="toggleSongLike(song, $event)"
                  >
                    {{ isSongLiked(song) ? "♥" : "♡" }}
                  </button>
                  <button
                    type="button"
                    class="siren-btn-icon play"
                    :title="isCurrentSong(song) ? '正在播放' : '播放'"
                    @click="playSong(song)"
                  >
                    {{ isCurrentSong(song) ? "⏸" : "▶" }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 2. 官方专辑 -->
        <section v-show="activeTab === 'albums'" class="siren-pane">
          <!-- 专辑下钻曲目详情 -->
          <div v-if="selectedAlbum" class="siren-album-detail">
            <header class="siren-album-detail-banner">
              <button type="button" class="siren-back-btn" @click="backToAlbums">
                ‹ 返回专辑列表
              </button>
              <img :src="selectedAlbum.coverUrl || DEFAULT_SIREN_COVER" class="siren-album-detail-cover" alt="" />
              <div class="siren-album-detail-info">
                <span class="siren-badge">OFFICIAL ALBUM</span>
                <h2 class="siren-album-detail-title">{{ selectedAlbum.name }}</h2>
                <p class="siren-album-detail-sub">塞壬唱片-MSR 出品 · 共 {{ selectedAlbum._songs?.length || 0 }} 首曲目</p>
                <button
                  type="button"
                  class="siren-play-album-btn"
                  @click="playWholeAlbum(selectedAlbum)"
                >
                  ▶ 播放整张专辑
                </button>
              </div>
            </header>

            <div v-if="albumSongsLoading" class="siren-empty">正在调取专辑曲目列表…</div>
            <div v-else class="siren-track-rows">
              <div
                v-for="(song, idx) in selectedAlbum._songs || []"
                :key="song.cid"
                class="siren-track-row"
                :class="{ playing: isCurrentSong(song) }"
                @click="playSong(song)"
              >
                <span class="col-num">{{ idx + 1 }}</span>
                <div class="col-title">
                  <span class="siren-track-name">{{ song.name }}</span>
                </div>
                <div class="col-artist">
                  {{ (song.artists || []).join(", ") || "塞壬唱片" }}
                </div>
                <div class="col-act" @click.stop>
                  <button
                    type="button"
                    class="siren-btn-icon"
                    :class="{ liked: isSongLiked(song) }"
                    @click="toggleSongLike(song, $event)"
                  >
                    {{ isSongLiked(song) ? "♥" : "♡" }}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- 专辑网格一览 -->
          <div v-else class="siren-album-grid">
            <div
              v-for="album in filteredAlbums"
              :key="album.cid"
              class="siren-album-card"
              @click="openAlbum(album)"
            >
              <div class="siren-album-cover-wrap">
                <img :src="album.coverUrl || DEFAULT_SIREN_COVER" class="siren-album-cover" alt="" loading="lazy" />
                <div class="siren-album-hover-play">▶</div>
              </div>
              <div class="siren-album-meta">
                <span class="siren-album-name" :title="album.name">{{ album.name }}</span>
                <span class="siren-album-corp">塞壬唱片 MSR</span>
              </div>
            </div>
          </div>
        </section>

        <!-- 3. 我的收藏 -->
        <section v-show="activeTab === 'favorites'" class="siren-pane">
          <div v-if="!favoriteSongs.length" class="siren-empty">
            <span style="font-size: 24px; margin-bottom: 6px;">♥️</span>
            <span>暂无收藏的塞壬歌曲</span>
            <small style="color: var(--muted); margin-top: 4px;">在单曲列表或播放条中点击 ♥ 即可加入心动收藏</small>
          </div>
          <div v-else class="siren-track-rows">
            <div
              v-for="(song, idx) in favoriteSongs"
              :key="song.cid"
              class="siren-track-row"
              :class="{ playing: isCurrentSong(song) }"
              @click="playSong(song)"
            >
              <span class="col-num">{{ idx + 1 }}</span>
              <div class="col-title">
                <img :src="getSongCover(song)" class="siren-track-thumb" alt="" loading="lazy" />
                <span class="siren-track-name">{{ song.name }}</span>
              </div>
              <div class="col-artist">
                {{ (song.artists || []).join(", ") || "塞壬唱片" }}
              </div>
              <div class="col-act" @click.stop>
                <button
                  type="button"
                  class="siren-btn-icon liked"
                  title="取消收藏"
                  @click="toggleSongLike(song, $event)"
                >
                  ♥
                </button>
              </div>
            </div>
          </div>
        </section>

        <!-- 4. 沉浸歌词 -->
        <section v-show="activeTab === 'lyrics'" class="siren-pane siren-lyrics-pane">
          <div class="siren-lyrics-wrap">
            <div class="siren-lyrics-header">
              <img :src="homeMusicState.coverUrl || DEFAULT_SIREN_COVER" class="siren-lyrics-disc" alt="" />
              <div class="siren-lyrics-track-info">
                <h3 class="siren-lyrics-title">{{ homeMusicState.title || "未在播放" }}</h3>
                <p class="siren-lyrics-artist">{{ homeMusicState.artist || "塞壬唱片-MSR" }}</p>
              </div>
            </div>
            <div class="siren-lyrics-body">
              <div v-if="homeMusicState.currentLyric" class="siren-lyrics-active-line">
                {{ homeMusicState.currentLyric }}
              </div>
              <div v-else class="siren-lyrics-empty">
                {{ homeMusicState.playing ? "♪ 伴奏演播中…" : "未在播放塞壬歌曲" }}
              </div>
            </div>
          </div>
        </section>
      </main>

      <!-- 底部常驻高保真播放控制条 -->
      <footer class="siren-player-bar">
        <div class="siren-pb-info">
          <img
            :src="homeMusicState.coverUrl || DEFAULT_SIREN_COVER"
            class="siren-pb-cover"
            :class="{ spinning: homeMusicState.playing }"
            alt=""
          />
          <div class="siren-pb-meta">
            <span class="siren-pb-title" :title="homeMusicState.title">{{ homeMusicState.title || "点击曲目开始播放" }}</span>
            <span class="siren-pb-artist" :title="homeMusicState.artist">{{ homeMusicState.artist || "塞壬唱片" }}</span>
          </div>
          <button
            type="button"
            class="siren-btn-icon"
            :class="{ liked: homeMusicState.liked }"
            title="收藏"
            @click="homeMusicController.toggleLike()"
          >
            {{ homeMusicState.liked ? "♥" : "♡" }}
          </button>
        </div>

        <div class="siren-pb-controls">
          <div class="siren-pb-btns">
            <button type="button" class="siren-ctrl-btn" title="播放模式" @click="homeMusicController.cycleMode()">
              {{ modeEmoji }}
            </button>
            <button type="button" class="siren-ctrl-btn" title="上一首" @click="homeMusicController.prev()">
              ⏮
            </button>
            <button
              type="button"
              class="siren-ctrl-btn play"
              :title="homeMusicState.playing ? '暂停' : '播放'"
              @click="homeMusicController.togglePlay()"
            >
              {{ homeMusicState.playing ? "⏸" : "▶" }}
            </button>
            <button type="button" class="siren-ctrl-btn" title="下一首" @click="homeMusicController.next()">
              ⏭
            </button>
          </div>

          <div class="siren-pb-progress-row">
            <span class="siren-time">{{ homeMusicState.formattedCurrent }}</span>
            <input
              type="range"
              class="siren-progress-bar"
              min="0"
              max="100"
              :value="homeMusicState.progressPercent"
              @input="onSeek"
            />
            <span class="siren-time">{{ homeMusicState.formattedDuration }}</span>
          </div>
        </div>

        <div class="siren-pb-lyric-preview" :title="homeMusicState.currentLyric || '塞壬官方原声无损音源'">
          <span class="siren-lyric-dot">♪</span>
          <span class="siren-lyric-snip">{{ homeMusicState.currentLyric || "塞壬唱片 MSR 官方原声" }}</span>
        </div>
      </footer>
    </div>
  </AppWindowFrame>
</template>

<style scoped>
.siren-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background: var(--panel, #ffffff);
  color: var(--text, #1e293b);
  overflow: hidden;
  user-select: none;
}

.siren-top-bar {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 16px;
  background: var(--surface, rgba(0, 0, 0, 0.02));
  border-bottom: 1px solid var(--border, rgba(0, 0, 0, 0.08));
}

.siren-nav-tabs {
  display: flex;
  gap: 4px;
}

.siren-nav-btn {
  padding: 6px 12px;
  border-radius: 8px;
  border: none;
  background: transparent;
  color: var(--muted, #64748b);
  font-size: 12.5px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s ease;
}

.siren-nav-btn:hover {
  background: var(--surface-hover, rgba(0, 0, 0, 0.05));
  color: var(--heading, #0f172a);
}

.siren-nav-btn.active {
  background: color-mix(in srgb, var(--primary, #3b82f6) 15%, transparent);
  color: var(--primary, #2563eb);
  font-weight: 600;
}

.siren-search-box {
  display: flex;
  align-items: center;
  gap: 6px;
  flex: 1;
  max-width: 320px;
  padding: 5px 10px;
  background: var(--surface, rgba(0, 0, 0, 0.04));
  border: 1px solid var(--border, rgba(0, 0, 0, 0.1));
  border-radius: 8px;
  font-size: 12px;
}

.siren-search-icon {
  font-size: 11px;
  opacity: 0.6;
}

.siren-search-input {
  flex: 1;
  background: transparent;
  border: none;
  color: var(--text, #1e293b);
  font-size: 12px;
  outline: none;
}

.siren-search-input::placeholder {
  color: var(--dim, #94a3b8);
}

.siren-search-clear {
  background: transparent;
  border: none;
  color: var(--muted, #64748b);
  cursor: pointer;
  padding: 0 2px;
}

.siren-stats-chip {
  font-size: 11px;
  color: var(--muted, #64748b);
  margin-left: auto;
}

.siren-body {
  flex: 1;
  overflow: hidden;
  position: relative;
}

.siren-pane {
  height: 100%;
  overflow-y: auto;
  padding: 12px 16px;
}

.siren-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 240px;
  color: var(--muted, #64748b);
  font-size: 13px;
}

/* 曲目列表样式 */
.siren-track-table {
  display: flex;
  flex-direction: column;
}

.siren-track-head {
  display: flex;
  align-items: center;
  padding: 6px 12px;
  font-size: 11px;
  font-weight: 600;
  color: var(--muted, #64748b);
  border-bottom: 1px solid var(--border, rgba(0, 0, 0, 0.08));
}

.col-num { width: 36px; text-align: center; flex-shrink: 0; }
.col-title { flex: 2; display: flex; align-items: center; gap: 10px; min-width: 0; }
.col-artist { flex: 1; color: var(--muted, #64748b); font-size: 12px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.col-act { width: 80px; display: flex; align-items: center; justify-content: flex-end; gap: 6px; flex-shrink: 0; }

.siren-track-row {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.15s ease;
  font-size: 13px;
  color: var(--text, #1e293b);
}

.siren-track-row:hover {
  background: var(--surface-hover, rgba(0, 0, 0, 0.04));
}

.siren-track-row.playing {
  background: color-mix(in srgb, var(--primary, #3b82f6) 12%, transparent);
  color: var(--primary, #2563eb);
  font-weight: 600;
}

.siren-playing-wave {
  color: var(--primary, #2563eb);
  font-size: 12px;
}

.siren-track-thumb {
  width: 32px;
  height: 32px;
  border-radius: 4px;
  object-fit: cover;
  flex-shrink: 0;
  background: var(--surface);
  border: 1px solid var(--border);
}

.siren-track-name {
  color: var(--heading, #0f172a);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.siren-btn-icon {
  background: transparent;
  border: none;
  font-size: 14px;
  color: var(--muted, #64748b);
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.15s ease;
}

.siren-btn-icon:hover {
  color: var(--heading, #0f172a);
  background: var(--surface-hover, rgba(0, 0, 0, 0.06));
}

.siren-btn-icon.liked {
  color: #f43f5e;
}

/* 专辑网格 */
.siren-album-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 16px;
  padding-bottom: 24px;
}

.siren-album-card {
  display: flex;
  flex-direction: column;
  gap: 8px;
  cursor: pointer;
  border-radius: 10px;
  padding: 8px;
  background: var(--surface, rgba(0, 0, 0, 0.02));
  border: 1px solid var(--border, rgba(0, 0, 0, 0.08));
  transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
}

.siren-album-card:hover {
  transform: translateY(-2px);
  border-color: var(--border-strong, rgba(0, 0, 0, 0.18));
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.06);
}

.siren-album-cover-wrap {
  position: relative;
  aspect-ratio: 1;
  border-radius: 8px;
  overflow: hidden;
  background: var(--surface);
  border: 1px solid var(--border);
}

.siren-album-cover {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.siren-album-hover-play {
  position: absolute;
  right: 8px;
  bottom: 8px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--primary, #3b82f6);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  opacity: 0;
  transform: scale(0.8);
  transition: all 0.2s ease;
}

.siren-album-card:hover .siren-album-hover-play {
  opacity: 1;
  transform: scale(1);
}

.siren-album-meta {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.siren-album-name {
  font-size: 12.5px;
  font-weight: 600;
  color: var(--heading, #0f172a);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.siren-album-corp {
  font-size: 10.5px;
  color: var(--muted, #64748b);
}

/* 专辑详情页 */
.siren-album-detail-banner {
  display: flex;
  align-items: flex-end;
  gap: 16px;
  padding: 16px;
  background: var(--surface, rgba(0, 0, 0, 0.03));
  border: 1px solid var(--border, rgba(0, 0, 0, 0.08));
  border-radius: 12px;
  margin-bottom: 12px;
  position: relative;
}

.siren-back-btn {
  position: absolute;
  top: 12px;
  left: 12px;
  background: var(--surface-hover, rgba(0, 0, 0, 0.06));
  border: 1px solid var(--border, rgba(0, 0, 0, 0.12));
  color: var(--heading, #0f172a);
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 500;
  cursor: pointer;
}

.siren-album-detail-cover {
  width: 120px;
  height: 120px;
  border-radius: 8px;
  object-fit: cover;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
  border: 1px solid var(--border);
}

.siren-album-detail-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.siren-badge {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.5px;
  color: var(--primary, #2563eb);
}

.siren-album-detail-title {
  font-size: 18px;
  font-weight: 700;
  color: var(--heading, #0f172a);
  margin: 0;
}

.siren-album-detail-sub {
  font-size: 12px;
  color: var(--muted, #64748b);
  margin: 0;
}

.siren-play-album-btn {
  margin-top: 8px;
  align-self: flex-start;
  padding: 6px 14px;
  background: var(--primary, #3b82f6);
  border: none;
  border-radius: 6px;
  color: #fff;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.15s ease;
}

.siren-play-album-btn:hover {
  opacity: 0.9;
}

/* 沉浸歌词页 */
.siren-lyrics-pane {
  display: flex;
  align-items: center;
  justify-content: center;
}

.siren-lyrics-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  text-align: center;
  max-width: 500px;
}

.siren-lyrics-disc {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid var(--border);
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.14);
}

.siren-lyrics-title {
  font-size: 18px;
  font-weight: 700;
  color: var(--heading, #0f172a);
  margin: 0;
}

.siren-lyrics-artist {
  font-size: 13px;
  color: var(--muted, #64748b);
  margin: 4px 0 0;
}

.siren-lyrics-active-line {
  font-size: 20px;
  font-weight: 600;
  color: var(--primary, #2563eb);
  line-height: 1.5;
  padding: 12px 24px;
  border-radius: 12px;
  background: color-mix(in srgb, var(--primary, #3b82f6) 12%, transparent);
}

.siren-lyrics-empty {
  font-size: 14px;
  color: var(--muted, #64748b);
}

/* 底部播放条 */
.siren-player-bar {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 8px 16px;
  background: var(--surface, rgba(0, 0, 0, 0.02));
  border-top: 1px solid var(--border, rgba(0, 0, 0, 0.08));
  color: var(--text, #1e293b);
}

.siren-pb-info {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 240px;
  min-width: 0;
}

.siren-pb-cover {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
  border: 1px solid var(--border);
}

.siren-pb-cover.spinning {
  animation: siren-spin 18s linear infinite;
}

@keyframes siren-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.siren-pb-meta {
  display: flex;
  flex-direction: column;
  min-width: 0;
  flex: 1;
}

.siren-pb-title {
  font-size: 12.5px;
  font-weight: 600;
  color: var(--heading, #0f172a);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.siren-pb-artist {
  font-size: 11px;
  color: var(--muted, #64748b);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.siren-pb-controls {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.siren-pb-btns {
  display: flex;
  align-items: center;
  gap: 12px;
}

.siren-ctrl-btn {
  background: transparent;
  border: none;
  font-size: 13px;
  color: var(--muted, #64748b);
  cursor: pointer;
  padding: 4px 6px;
  border-radius: 6px;
  transition: all 0.15s ease;
}

.siren-ctrl-btn:hover {
  color: var(--heading, #0f172a);
  background: var(--surface-hover, rgba(0, 0, 0, 0.06));
}

.siren-ctrl-btn.play {
  font-size: 16px;
  color: #fff;
  background: var(--primary, #3b82f6);
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.siren-ctrl-btn.play:hover {
  opacity: 0.9;
}

.siren-pb-progress-row {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  max-width: 420px;
}

.siren-time {
  font-size: 10.5px;
  color: var(--muted, #64748b);
  width: 32px;
  text-align: center;
}

.siren-progress-bar {
  flex: 1;
  accent-color: var(--primary, #3b82f6);
  height: 3px;
  cursor: pointer;
}

.siren-pb-lyric-preview {
  display: flex;
  align-items: center;
  gap: 6px;
  width: 200px;
  font-size: 11px;
  color: var(--muted, #64748b);
  overflow: hidden;
}

.siren-lyric-dot {
  color: var(--primary, #3b82f6);
  font-size: 10px;
  flex-shrink: 0;
}

.siren-lyric-snip {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
