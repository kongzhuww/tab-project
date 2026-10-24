<script setup lang="ts">
import { CACHED_FAVORITES_KEY, readPlaylistCache, writePlaylistCache } from "../music/playlist-cache";
import { ref, computed, watch, onMounted, onUnmounted } from "vue";
import {
  togetherPartyState as party,
  isPartyHost,
  transferDjRole,
  claimDjRole,
  startPartyTrack,
  broadcastPartyTrack,
  stopParty,
  closeDjModal,
  type ListenTogetherTrack
} from "./together-listen.store";
import { chatModuleState as state } from "./chat-state";
import { privateChatState } from "./private-chat-client";
import { notifications } from "../sdk/notifications";
import { homeMusicState, homeMusicController } from "../music/store";
import { musicService } from "../services/music.service";
import { neteaseService, type NeteaseSong } from "../services/netease.service";
import { biliFavoritesState } from "../bilibili/bili-favorites-store";
import { biliRadioController } from "../bilibili/radio-store";
import { windowManagerController } from "../core/window-manager.store";
import { safeImageUrl } from "./chat-security";

const activeSource = ref<"siren" | "netease" | "bilibili">("siren");
const customBvidInput = ref("");
const customNeteaseInput = ref("");
const isBroadcasting = ref(false);

// ----------------------------------------------------
// 1. 塞壬唱片热门精选原声 (永久有效 CDN 实链 + 在线动态拓展)
// ----------------------------------------------------
const sirenTracks = ref<ListenTogetherTrack[]>([
  {
    source: "siren",
    trackId: "514584",
    title: "Renegade",
    artist: "Substantial / X.Aratone",
    cover: "https://web.hycdn.cn/siren/pic/20210322/40a13076601806e37c5394049cebc5b1.jpg"
  },
  {
    source: "siren",
    trackId: "880374",
    title: "Speed of Light",
    artist: "DJ Okawari / 二宫爱",
    cover: "https://web.hycdn.cn/siren/pic/20210322/56cbcd1d0093d8ee8ee22bf6d68ab4a6.jpg"
  },
  {
    source: "siren",
    trackId: "306858",
    title: "Boiling Blood",
    artist: "Jason Walsh",
    cover: "https://web.hycdn.cn/siren/pic/20210322/dfe97934b38b1b93ee72e0c5601a79b7.jpg"
  },
  {
    source: "siren",
    trackId: "779437",
    title: "Zone 10⁻⁸",
    artist: "Monster Siren Records",
    cover: "https://web.hycdn.cn/siren/pic/20210322/12b2b9570bb07ffeaff2379660da7711.jpg"
  },
  {
    source: "siren",
    trackId: "514583",
    title: "Sparkling Hydraulics",
    artist: "Monster Siren Records",
    cover: "https://web.hycdn.cn/siren/pic/20210322/18f80a3290a3f0c892c806156066bf46.jpg"
  },
  {
    source: "siren",
    trackId: "125018",
    title: "Requiem",
    artist: "Monster Siren Records",
    cover: "https://web.hycdn.cn/siren/pic/20210322/14db9942c28a5abba48b9dfe2d99e39a.jpg"
  }
]);

// 塞壬唱片分页控制（每页10首）
const sirenPage = ref(1);
const sirenPageSize = 10;
const totalSirenPages = computed(() => Math.max(1, Math.ceil(sirenTracks.value.length / sirenPageSize)));
const pagedSirenSongs = computed(() => {
  const start = (sirenPage.value - 1) * sirenPageSize;
  return sirenTracks.value.slice(start, start + sirenPageSize);
});

watch(totalSirenPages, (maxPages) => {
  if (sirenPage.value > maxPages) {
    sirenPage.value = Math.max(1, maxPages);
  }
});

function prevSirenPage() {
  if (sirenPage.value > 1) sirenPage.value--;
}

function nextSirenPage() {
  if (sirenPage.value < totalSirenPages.value) sirenPage.value++;
}

// ----------------------------------------------------
// 2. 网易云音乐状态与「我喜欢的音乐」
// ----------------------------------------------------
const neteaseUser = computed(() => homeMusicState.neteaseUser || neteaseService.getUser());
const neteaseLoading = ref(false);
const localCachedSongs = ref<NeteaseSong[]>([]);

function syncLocalLikedSongs() {
  if (typeof localStorage === "undefined") return;
  try {
    const parsed = readPlaylistCache<NeteaseSong>(CACHED_FAVORITES_KEY);
    if (parsed.length) {
      if (Array.isArray(parsed) && parsed.length) {
        localCachedSongs.value = parsed;
        if (!homeMusicState.neteaseSongs.length) {
          homeMusicState.neteaseSongs = parsed;
        }
      }
    }
  } catch {}
}

// 立即在初始化时读取离线持久化数据
syncLocalLikedSongs();

// 全量喜欢曲目（直接连接全局响应式仓库 + 本地离线持久化兜底，包含149首全部曲目）
const allLikedSongs = computed<NeteaseSong[]>(() => {
  if (homeMusicState.neteaseSongs && homeMusicState.neteaseSongs.length > 0) {
    return homeMusicState.neteaseSongs;
  }
  return localCachedSongs.value;
});

// 分页逻辑：每页最多显示 10 首
const neteasePage = ref(1);
const neteasePageSize = 10;
const totalNeteasePages = computed(() => Math.max(1, Math.ceil(allLikedSongs.value.length / neteasePageSize)));
const pagedNeteaseSongs = computed(() => {
  const start = (neteasePage.value - 1) * neteasePageSize;
  return allLikedSongs.value.slice(start, start + neteasePageSize);
});

watch(totalNeteasePages, (maxPages) => {
  if (neteasePage.value > maxPages) {
    neteasePage.value = Math.max(1, maxPages);
  }
});

function prevNeteasePage() {
  if (neteasePage.value > 1) {
    neteasePage.value--;
  }
}

function nextNeteasePage() {
  if (neteasePage.value < totalNeteasePages.value) {
    neteasePage.value++;
  }
}

function formatSongDuration(dt?: number): string {
  if (!dt || !Number.isFinite(dt)) return "";
  const sec = Math.floor(dt / 1000);
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

async function loadNeteaseLikedData() {
  syncLocalLikedSongs();
  neteaseLoading.value = true;
  try {
    await homeMusicController.loadNeteaseData();
    const fav = (homeMusicState.neteasePlaylists || []).find(
      (p: any) => p.name?.includes("喜欢的音乐") || p.specialType === 5
    ) || homeMusicState.neteasePlaylists[0];
    if (fav) {
      await homeMusicController.selectNeteasePlaylist(fav);
    }
    if (homeMusicState.neteaseSongs && homeMusicState.neteaseSongs.length > 0) {
      localCachedSongs.value = homeMusicState.neteaseSongs;
      try {
        writePlaylistCache(CACHED_FAVORITES_KEY, homeMusicState.neteaseSongs);
      } catch {}
    } else if (localCachedSongs.value.length > 0) {
      homeMusicState.neteaseSongs = localCachedSongs.value;
    }
  } catch (err) {
    console.warn("[DJ] 加载网易云喜欢的音乐失败，使用本地缓存:", err);
    syncLocalLikedSongs();
    if (localCachedSongs.value.length > 0) {
      homeMusicState.neteaseSongs = localCachedSongs.value;
    }
  } finally {
    neteaseLoading.value = false;
  }
}

function openNeteaseModule() {
  windowManagerController.open("music");
}

// ----------------------------------------------------
// 3. B站电台歌单与系列
// ----------------------------------------------------
const selectedBiliSeriesId = ref<string>("all");
const biliLoading = ref(false);

async function loadBiliRadioData() {
  biliLoading.value = true;
  try {
    await biliRadioController.init();
  } catch (err) {
    console.warn("[DJ] 初始化B站电台失败:", err);
  } finally {
    biliLoading.value = false;
  }
}

// 汇聚当前选中的 B站电台曲目列表
const currentBiliRadioTracks = computed(() => {
  if (selectedBiliSeriesId.value === "all") {
    // 合并所有系列的曲目以及当前电台队列
    const map = new Map<string, { bvid: string; title: string; author: string; cover?: string; duration?: number }>();
    for (const s of biliFavoritesState.radioSeries) {
      for (const item of s.items || []) {
        if (item.bvid && !map.has(item.bvid)) {
          map.set(item.bvid, item);
        }
      }
    }
    for (const q of biliFavoritesState.radioQueue || []) {
      if (q.bvid && !map.has(q.bvid)) {
        map.set(q.bvid, q);
      }
    }
    return Array.from(map.values());
  }

  if (selectedBiliSeriesId.value === "queue") {
    return biliFavoritesState.radioQueue || [];
  }

  const found = biliFavoritesState.radioSeries.find(s => s.id === selectedBiliSeriesId.value);
  return found?.items || [];
});

function openBiliWorkspace() {
  windowManagerController.open("bilibili");
}

// ----------------------------------------------------
// 当前选中的播放碟片状态
// ----------------------------------------------------
const selectedTrack = ref<ListenTogetherTrack>(
  party.track || sirenTracks.value[0]
);

// 保持当前界面的选曲与全员一起听派对状态实时响应同步
watch(
  () => party.track,
  (newTrack) => {
    if (newTrack) {
      selectedTrack.value = { ...newTrack };
    }
  },
  { immediate: true, deep: true }
);

// ----------------------------------------------------
// 控制权互斥与移交逻辑
// ----------------------------------------------------
const showTransferMenu = ref(false);
const candidatePeers = computed(() => {
  return (privateChatState.members || []).filter((p) => p.uid !== state.currentUser.uid);
});

async function handleDoTransfer(uid: string, name: string) {
  showTransferMenu.value = false;
  await transferDjRole(uid, name);
}

async function handleClaimDj() {
  await claimDjRole();
}

async function selectTrack(track: ListenTogetherTrack) {
  if (!isPartyHost.value) {
    notifications.fetch("海狸调音台", "播控已锁定", `当前由【${party.hostName}】主持点播，点击上方「接管 DJ」即可交换控制权。`);
    return;
  }
  selectedTrack.value = { ...track };
  // 选曲直接起播并静默同频同步给群友，绝不刷屏发卡片
  await broadcastPartyTrack(track, "switch", false);
}

async function selectNeteaseTrack(song: NeteaseSong) {
  if (!isPartyHost.value) {
    notifications.fetch("海狸调音台", "播控已锁定", `当前由【${party.hostName}】主持点播，点击上方「接管 DJ」即可交换控制权。`);
    return;
  }
  const artists = (song.ar || song.artists || []).map(a => typeof a === "string" ? a : a.name).join(" / ") || "网易云歌手";
  const cover = song.al?.picUrl || song.album?.picUrl || song.picUrl || song.coverUrl || "";
  const track: ListenTogetherTrack = {
    source: "netease",
    trackId: String(song.id),
    title: song.name,
    artist: artists,
    cover
  };
  selectedTrack.value = track;
  await broadcastPartyTrack(track, "switch", false);
}

async function selectBiliTrack(track: { bvid: string; title: string; author?: string; cover?: string }) {
  if (!isPartyHost.value) {
    notifications.fetch("海狸调音台", "播控已锁定", `当前由【${party.hostName}】主持点播，点击上方「接管 DJ」即可交换控制权。`);
    return;
  }
  const item: ListenTogetherTrack = {
    source: "bilibili",
    trackId: track.bvid,
    title: track.title,
    artist: track.author || "B站UP主",
    cover: track.cover || ""
  };
  selectedTrack.value = item;
  await broadcastPartyTrack(item, "switch", false);
}

// 播放 / 暂停切换（同频全员同步，受控保护）
async function togglePlayDj() {
  if (!isPartyHost.value) {
    // 如果当前是收听者，且本机音频处于暂停态，允许其点击本按钮立即唤醒/继续收听派对当前曲目！
    const audio = musicService.getAudioElement();
    if (audio && (audio.paused || !homeMusicState.playing)) {
      try {
        await audio.play();
        notifications.fetch("海狸同频", "已恢复本地播放", `正在与【${party.hostName}】同步收听《${selectedTrack.value.title}》`);
        return;
      } catch (err) {
        console.warn("[DJ] 本地恢复播放失败:", err);
      }
    }
    notifications.fetch("海狸调音台", "播控已锁定", `当前由【${party.hostName}】主持点播，点击上方「接管 DJ」即可交换控制权。`);
    return;
  }
  const willPlay = !homeMusicState.playing;
  homeMusicController.togglePlay();
  if (party.isActive && selectedTrack.value) {
    await broadcastPartyTrack(selectedTrack.value, willPlay ? "play" : "pause", false);
  }
}

// 拖动进度条
function onSeekSlider(e: Event) {
  const val = Number((e.target as HTMLInputElement).value);
  homeMusicController.seek(val);
}

// 结束当前一起听派对
async function handleEndParty() {
  await stopParty(true);
  closeDjModal();
}

// 主动发送一张拉人卡片到群聊
async function handleSendInviteCard() {
  if (!selectedTrack.value) return;
  isBroadcasting.value = true;
  try {
    await broadcastPartyTrack(selectedTrack.value, "switch", true);
  } finally {
    isBroadcasting.value = false;
  }
}

function handleAddCustomBvid() {
  const val = customBvidInput.value.trim();
  if (!val) return;
  const match = val.match(/BV[a-zA-Z0-9]+/i);
  const bvid = match ? match[0] : val;
  selectedTrack.value = {
    source: "bilibili",
    trackId: bvid,
    title: `B站点播 (${bvid})`,
    artist: "哔哩哔哩视频音频",
    cover: ""
  };
  customBvidInput.value = "";
}

function handleAddCustomNetease() {
  const val = customNeteaseInput.value.trim();
  if (!val) return;
  const match = val.match(/id=(\d+)/i);
  const songId = match ? match[1] : val;
  selectedTrack.value = {
    source: "netease",
    trackId: songId,
    title: `网易云单曲 (ID: ${songId})`,
    artist: "网易云音乐",
    cover: ""
  };
  customNeteaseInput.value = "";
}

function onImgError(e: Event) {
  const img = e.target as HTMLImageElement | null;
  if (img) img.style.display = "none";
}

// ----------------------------------------------------
// 无模态浮窗：自由拖拽与初始自适应定位逻辑
// ----------------------------------------------------
const posX = ref(60);
const posY = ref(60);
const isDragging = ref(false);
let startClientX = 0;
let startClientY = 0;
let startPosX = 0;
let startPosY = 0;
let dragRafId = 0;

function handleAccountUpdated() {
  void loadNeteaseLikedData();
}

onMounted(async () => {
  if (typeof window !== "undefined") {
    const dialogW = 560;
    const dialogH = 600;
    posX.value = Math.max(20, window.innerWidth - dialogW - 30);
    posY.value = Math.max(30, Math.floor((window.innerHeight - dialogH) / 2));
    window.addEventListener("netease:account-updated", handleAccountUpdated);
  }

  // 1. 初始化塞壬在线曲库
  try {
    const list = await musicService.getSirenSongs();
    if (list && list.length) {
      const valid = list
        .filter(s => s.coverUrl && s.coverUrl.startsWith("http"))
        .map(s => ({
          source: "siren" as const,
          trackId: String(s.cid),
          title: s.name,
          artist: (s.artists || []).join(" / ") || "塞壬唱片-MSR",
          cover: s.coverUrl || ""
        }));
      if (valid.length) {
        sirenTracks.value = valid;
        if (selectedTrack.value.source === "siren" && !selectedTrack.value.cover) {
          selectedTrack.value = valid[0];
        }
      }
    }
  } catch {}

  // 2. 初始化网易云与B站电台
  void loadNeteaseLikedData();
  void loadBiliRadioData();
});

onUnmounted(() => {
  if (typeof window !== "undefined") {
    window.removeEventListener("netease:account-updated", handleAccountUpdated);
  }
});

function onHeaderPointerDown(e: PointerEvent) {
  const target = e.target as HTMLElement | null;
  if (target?.closest("button, input, a, select, [role='tab']")) return;

  isDragging.value = true;
  startClientX = e.clientX;
  startClientY = e.clientY;
  startPosX = posX.value;
  startPosY = posY.value;

  const headerEl = e.currentTarget as HTMLElement | null;
  try {
    headerEl?.setPointerCapture(e.pointerId);
  } catch {}

  const onPointerMove = (ev: PointerEvent) => {
    if (!isDragging.value) return;
    const dx = ev.clientX - startClientX;
    const dy = ev.clientY - startClientY;
    if (dragRafId) cancelAnimationFrame(dragRafId);
    dragRafId = requestAnimationFrame(() => {
      const maxX = Math.max(10, window.innerWidth - 200);
      const maxY = Math.max(10, window.innerHeight - 150);
      posX.value = Math.min(maxX, Math.max(10, startPosX + dx));
      posY.value = Math.min(maxY, Math.max(10, startPosY + dy));
    });
  };

  const onPointerUp = (ev: PointerEvent) => {
    isDragging.value = false;
    if (dragRafId) {
      cancelAnimationFrame(dragRafId);
      dragRafId = 0;
    }
    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("pointerup", onPointerUp);
    window.removeEventListener("pointercancel", onPointerUp);
    try {
      headerEl?.releasePointerCapture(ev.pointerId);
    } catch {}
  };

  window.addEventListener("pointermove", onPointerMove, { passive: true });
  window.addEventListener("pointerup", onPointerUp, { once: true });
  window.addEventListener("pointercancel", onPointerUp, { once: true });
}
</script>

<template>
  <!-- 无模态浮动容器：全屏 pointer-events: none，底下的聊天/点击/输入完全可用 -->
  <aside class="dj-modeless-layer" aria-label="海狸 DJ 音乐播控台">
    <div
      class="dj-deck-dialog"
      :style="{ left: `${posX}px`, top: `${posY}px` }"
    >
      <!-- 调音台顶栏 (支持无模态按住直接拖动) -->
      <header
        class="dj-deck-header"
        title="按住此处可自由拖动调音台窗口"
        @pointerdown="onHeaderPointerDown"
      >
        <div class="dj-title-group">
          <span class="dj-console-icon" aria-hidden="true">🎛️</span>
          <div>
            <strong class="dj-main-title">海狸 DJ 音乐播控台</strong>
            <small class="dj-sub-title">多人同步收听 · 塞壬唱片 / 网易云喜欢的音乐 / B站电台歌单</small>
          </div>
        </div>
        <div class="dj-head-actions">
          <span class="dj-live-status-pill" :class="{ live: party.isActive }">
            {{ party.isActive ? '🔴 正在广播中' : '⚪ 待机就绪' }}
          </span>
          <button
            type="button"
            class="dj-close-btn"
            title="关闭调音台"
            @click="closeDjModal"
          >
            ✕
          </button>
        </div>
      </header>

      <!-- 三大音源切换琴键 -->
      <nav class="dj-source-tabs" role="tablist">
        <button
          type="button"
          class="dj-source-tab"
          :class="{ active: activeSource === 'siren' }"
          @click="activeSource = 'siren'"
        >
          <span class="tab-icon">💿</span>
          <span class="tab-text">塞壬唱片 (Monster Siren)</span>
        </button>
        <button
          type="button"
          class="dj-source-tab"
          :class="{ active: activeSource === 'netease' }"
          @click="activeSource = 'netease'"
        >
          <span class="tab-icon">🎵</span>
          <span class="tab-text">网易云音乐 (NetEase)</span>
        </button>
        <button
          type="button"
          class="dj-source-tab"
          :class="{ active: activeSource === 'bilibili' }"
          @click="activeSource = 'bilibili'"
        >
          <span class="tab-icon">📻</span>
          <span class="tab-text">B站电台歌单 (Bilibili Radio)</span>
        </button>
      </nav>

      <!-- DJ 控制权归属条（保证互斥，仅限一人操控） -->
      <div class="dj-ownership-bar" :class="{ 'is-host': isPartyHost, 'is-listener': !isPartyHost }">
        <div class="ownership-left">
          <span class="ownership-icon">{{ isPartyHost ? '👑' : '🎧' }}</span>
          <div class="ownership-text">
            <strong v-if="isPartyHost">你是当前 DJ（独家播控权）</strong>
            <strong v-else>听众同频中 · 当前主持：【{{ party.hostName || '房主' }}】</strong>
            <small v-if="isPartyHost">你拥有播控权限，切歌与暂停将全员同步</small>
            <small v-else>播控已被锁定，交换权力后即可自由切歌</small>
          </div>
        </div>
        <div class="ownership-right">
          <!-- 房主可移交控制权 -->
          <div v-if="isPartyHost" class="transfer-btn-wrapper">
            <button
              type="button"
              class="btn-transfer-control"
              title="将 DJ 操控权移交给其他听友"
              @click="showTransferMenu = !showTransferMenu"
            >
              🤝 移交控制权 ▾
            </button>
            <div v-if="showTransferMenu" class="transfer-dropdown-menu">
              <div class="transfer-menu-title">移交打碟机给：</div>
              <button
                v-for="p in candidatePeers"
                :key="p.uid"
                type="button"
                class="transfer-peer-item"
                @click="handleDoTransfer(p.uid, p.name)"
              >
                <span>{{ p.name }}</span>
                <small>{{ p.uid.slice(0, 8) }}</small>
              </button>
              <div v-if="!candidatePeers.length" class="transfer-empty-tip">暂无其他在线群友</div>
            </div>
          </div>
          <!-- 听众可申请接管控制权 -->
          <button
            v-else
            type="button"
            class="btn-claim-control"
            title="申请接管打碟机成为 DJ"
            @click="handleClaimDj"
          >
            ⚡ 接管 DJ 操控权
          </button>
        </div>
      </div>

      <!-- DJ 唱机主控核心区 (黑胶唱盘 + 播控参数) -->
      <section class="dj-turntable-zone">
        <!-- 旋转黑胶唱盘 -->
        <div class="dj-vinyl-disc" :class="{ spinning: party.isActive && party.isPlaying }">
          <div class="vinyl-outer-groove">
            <div class="vinyl-inner-label">
              <img
                v-if="selectedTrack.cover"
                :src="safeImageUrl(selectedTrack.cover)"
                class="vinyl-cover-img"
                referrerpolicy="no-referrer"
                alt=""
                @error="onImgError"
              />
              <span class="vinyl-fallback-icon">
                {{ selectedTrack.source === 'bilibili' ? '📻' : selectedTrack.source === 'netease' ? '🎵' : '💿' }}
              </span>
              <div class="vinyl-center-hole"></div>
            </div>
          </div>
        </div>

        <!-- 唱盘右侧：当前曲目信息、进度条与播放/暂停控制 -->
        <div class="dj-track-cues">
          <div class="cue-top-meta">
            <div class="cue-source-tag">
              {{ selectedTrack.source === 'siren' ? '💿 塞壬官方原声' : selectedTrack.source === 'netease' ? '🎵 网易云音乐' : '📻 B站电台音频' }}
            </div>
            <button
              type="button"
              class="btn-send-invite-card"
              title="在群聊中发送一张一起听邀请卡片，拉好友加入"
              :disabled="isBroadcasting"
              @click="handleSendInviteCard"
            >
              <span>✉️ 邀请群友</span>
            </button>
          </div>
          <strong class="cue-track-title" :title="selectedTrack.title">{{ selectedTrack.title }}</strong>
          <span class="cue-track-artist">{{ selectedTrack.artist }}</span>

          <!-- 实时进度条与时间指示 -->
          <div class="dj-seek-bar-row">
            <span class="dj-time-cur">{{ homeMusicState.formattedCurrent || '0:00' }}</span>
            <input
              type="range"
              class="dj-seek-slider"
              min="0"
              max="100"
              :value="homeMusicState.progressPercent"
              @input="onSeekSlider"
            />
            <span class="dj-time-dur">{{ homeMusicState.formattedDuration || '0:00' }}</span>
          </div>

          <!-- 播控操作区（播放/暂停与同频状态） -->
          <div class="dj-ctrl-row">
            <button
              type="button"
              class="dj-play-btn"
              :title="homeMusicState.playing ? '暂停' : '播放'"
              @click="togglePlayDj"
            >
              {{ homeMusicState.playing ? '⏸ 暂停' : '▶ 播放' }}
            </button>
            <button
              v-if="party.isActive"
              type="button"
              class="dj-stop-btn"
              title="结束当前一起听派对并关闭顶栏"
              @click="handleEndParty"
            >
              ⏹ 结束派对
            </button>
            <span v-if="party.isActive" class="dj-sync-indicator">
              🟢 同频中（{{ party.listenersCount }}人收听 · 切歌自动同步）
            </span>
          </div>
        </div>
      </section>

      <!-- 底部曲目列表与点播选择器 -->
      <main class="dj-playlist-section">
        <!-- A. 塞壬唱片曲库 -->
        <div v-if="activeSource === 'siren'" class="source-panel-box">
          <div class="dj-tracks-grid">
            <div
              v-for="(t, idx) in pagedSirenSongs"
              :key="t.trackId"
              class="dj-track-item-card"
              :class="{ selected: selectedTrack.trackId === t.trackId }"
              @click="selectTrack(t)"
            >
              <span class="track-seq-num">{{ (sirenPage - 1) * sirenPageSize + idx + 1 }}</span>
              <div class="track-thumb-wrap">
                <img
                  v-if="t.cover"
                  :src="safeImageUrl(t.cover)"
                  class="track-thumb"
                  referrerpolicy="no-referrer"
                  alt=""
                  @error="onImgError"
                />
                <span class="track-thumb-fallback">💿</span>
              </div>
              <div class="track-meta">
                <strong class="track-name" :title="t.title">{{ t.title }}</strong>
                <small class="track-sub" :title="t.artist">{{ t.artist }}</small>
              </div>
              <span class="track-cue-btn">{{ selectedTrack.trackId === t.trackId ? '已装载' : '选曲' }}</span>
            </div>
          </div>

          <!-- 塞壬唱片专属翻页底栏 -->
          <footer v-if="totalSirenPages > 1" class="dj-pagination-footer">
            <span class="dj-page-count-badge">
              第 {{ sirenPage }} / {{ totalSirenPages }} 页 · 共 {{ sirenTracks.length }} 首
            </span>
            <div class="dj-page-btn-group">
              <button
                type="button"
                class="btn-page-step"
                :disabled="sirenPage <= 1"
                title="上一页"
                @click="prevSirenPage"
              >
                ◀ 上一页
              </button>
              <button
                type="button"
                class="btn-page-step"
                :disabled="sirenPage >= totalSirenPages"
                title="下一页"
                @click="nextSirenPage"
              >
                下一页 ▶
              </button>
            </div>
          </footer>
        </div>

        <!-- B. 网易云音乐：展示我喜欢的歌曲 + 未绑定提醒 -->
        <div v-else-if="activeSource === 'netease'" class="source-panel-box">
          <!-- 未绑定网易云账号时的醒目横幅 -->
          <div v-if="!neteaseUser?.nickname" class="netease-bind-banner">
            <div class="bind-banner-left">
              <span class="bind-banner-icon">⚠️</span>
              <div class="bind-banner-text">
                <strong>未绑定网易云音乐账户</strong>
                <small>绑定后将在此直接同步展示你的「我喜欢的音乐」私人歌单</small>
              </div>
            </div>
            <button
              type="button"
              class="btn-bind-action"
              @click="openNeteaseModule"
            >
              🔗 立即绑定 / 扫码登录
            </button>
          </div>

          <!-- 已绑定网易云账号时的状态展示 -->
          <div v-else class="netease-user-badge-bar">
            <div class="user-meta-left">
              <img
                v-if="neteaseUser?.avatarUrl"
                :src="neteaseUser.avatarUrl"
                class="netease-user-avatar"
                alt=""
                referrerpolicy="no-referrer"
                @error="onImgError"
              />
              <span v-else class="netease-user-avatar-fallback">🎵</span>
              <div>
                <strong class="netease-user-name">
                  {{ neteaseUser?.nickname || '网易云音乐用户' }}
                  <span v-if="neteaseUser?.isVip" class="vip-badge">VIP</span>
                </strong>
                <small class="netease-user-stat">已载入「我喜欢的音乐」({{ allLikedSongs.length }} 首)</small>
              </div>
            </div>
            <div class="user-meta-right">
              <button
                type="button"
                class="btn-refresh-fav"
                :title="neteaseLoading ? '正在刷新…' : '刷新我喜欢的音乐'"
                :disabled="neteaseLoading"
                @click="loadNeteaseLikedData"
              >
                {{ neteaseLoading ? '⏳' : '🔄 刷新' }}
              </button>
            </div>
          </div>

          <!-- 我喜欢的歌曲列表（每次最多展示 10 首，带序号与时长） -->
          <div v-if="pagedNeteaseSongs.length > 0" class="dj-tracks-grid">
            <div
              v-for="(s, idx) in pagedNeteaseSongs"
              :key="s.id"
              class="dj-track-item-card"
              :class="{ selected: selectedTrack.trackId === String(s.id) }"
              @click="selectNeteaseTrack(s)"
            >
              <span class="track-seq-num">{{ (neteasePage - 1) * neteasePageSize + idx + 1 }}</span>
              <div class="track-thumb-wrap">
                <img
                  v-if="s.al?.picUrl || s.album?.picUrl || s.picUrl"
                  :src="safeImageUrl(s.al?.picUrl || s.album?.picUrl || s.picUrl)"
                  class="track-thumb"
                  referrerpolicy="no-referrer"
                  alt=""
                  @error="onImgError"
                />
                <span class="track-thumb-fallback">🎵</span>
              </div>
              <div class="track-meta">
                <strong class="track-name" :title="s.name">{{ s.name }}</strong>
                <small class="track-sub" :title="(s.ar || s.artists || []).map(a => typeof a === 'string' ? a : a.name).join(' / ')">
                  {{ (s.ar || s.artists || []).map(a => typeof a === "string" ? a : a.name).join(" / ") || "网易云歌手" }}
                </small>
              </div>
              <span v-if="s.dt" class="track-duration">{{ formatSongDuration(s.dt) }}</span>
              <span class="track-cue-btn">{{ selectedTrack.trackId === String(s.id) ? '已装载' : '选曲' }}</span>
            </div>
          </div>

          <!-- 底部专属翻页工具条 -->
          <footer v-if="totalNeteasePages > 1" class="dj-pagination-footer">
            <span class="dj-page-count-badge">
              第 {{ neteasePage }} / {{ totalNeteasePages }} 页 · 共 {{ allLikedSongs.length }} 首
            </span>
            <div class="dj-page-btn-group">
              <button
                type="button"
                class="btn-page-step"
                :disabled="neteasePage <= 1"
                title="上一页"
                @click="prevNeteasePage"
              >
                ◀ 上一页
              </button>
              <button
                type="button"
                class="btn-page-step"
                :disabled="neteasePage >= totalNeteasePages"
                title="下一页"
                @click="nextNeteasePage"
              >
                下一页 ▶
              </button>
            </div>
          </footer>

          <!-- 若未绑定且无本地缓存歌曲时呈现友好引导 -->
          <div v-else-if="!pagedNeteaseSongs.length" class="empty-placeholder-box">
            <span class="placeholder-icon">🎵</span>
            <p v-if="neteaseLoading">正在从网易云加载「我喜欢的音乐」149 首曲库…</p>
            <p v-else>暂无我喜欢的歌曲，点击上方「刷新」或打开网易云模块同步红心曲库</p>
          </div>
        </div>

        <!-- C. B站电台：列举我的B站电台歌单与系列曲目 -->
        <div v-else class="source-panel-box">
          <!-- B站电台快捷导航与系列切换 -->
          <div class="bili-radio-nav-row">
            <div class="series-chips-wrap">
              <button
                type="button"
                class="series-chip"
                :class="{ active: selectedBiliSeriesId === 'all' }"
                @click="selectedBiliSeriesId = 'all'"
              >
                🌟 全部曲目 ({{ currentBiliRadioTracks.length }})
              </button>
              <button
                v-if="biliFavoritesState.radioQueue?.length"
                type="button"
                class="series-chip"
                :class="{ active: selectedBiliSeriesId === 'queue' }"
                @click="selectedBiliSeriesId = 'queue'"
              >
                📻 当前队列 ({{ biliFavoritesState.radioQueue.length }})
              </button>
              <button
                v-for="series in biliFavoritesState.radioSeries"
                :key="series.id"
                type="button"
                class="series-chip"
                :class="{ active: selectedBiliSeriesId === series.id }"
                @click="selectedBiliSeriesId = series.id"
              >
                📑 {{ series.name }} ({{ series.items?.length || 0 }})
              </button>
            </div>
            <button
              type="button"
              class="btn-open-workspace"
              title="打开B站收藏夹与电台管理"
              @click="openBiliWorkspace"
            >
              📺 电台管理
            </button>
          </div>

          <!-- 标题与手动点播输入 -->
          <div class="source-panel-head">
            <span>B站电台歌单曲目（音频格式同频收听）</span>
            <div class="custom-id-input-wrap">
              <input
                v-model="customBvidInput"
                placeholder="输入 BV号 点播音频"
                class="custom-input"
                @keydown.enter="handleAddCustomBvid"
              />
              <button
                type="button"
                class="custom-add-btn"
                :disabled="!customBvidInput.trim()"
                @click="handleAddCustomBvid"
              >
                装载
              </button>
            </div>
          </div>

          <!-- B站电台曲目列表 -->
          <div v-if="currentBiliRadioTracks.length > 0" class="dj-tracks-grid">
            <div
              v-for="t in currentBiliRadioTracks"
              :key="t.bvid"
              class="dj-track-item-card"
              :class="{ selected: selectedTrack.trackId === t.bvid }"
              @click="selectBiliTrack(t)"
            >
              <div class="track-thumb-wrap">
                <img
                  v-if="t.cover"
                  :src="safeImageUrl(t.cover)"
                  class="track-thumb"
                  referrerpolicy="no-referrer"
                  alt=""
                  @error="onImgError"
                />
                <span class="track-thumb-fallback">📻</span>
              </div>
              <div class="track-meta">
                <strong class="track-name">{{ t.title }}</strong>
                <small class="track-sub">{{ t.author || 'B站UP主' }} · {{ t.bvid }}</small>
              </div>
              <span class="track-cue-btn">{{ selectedTrack.trackId === t.bvid ? '已装载' : '选曲' }}</span>
            </div>
          </div>

          <!-- 若电台暂无曲目时引导 -->
          <div v-else class="empty-placeholder-box">
            <span class="placeholder-icon">📻</span>
            <p>你的B站电台暂无已保存的歌单曲目</p>
            <button type="button" class="btn-bind-action" @click="openBiliWorkspace">
              📺 前往B站模块将收藏夹加入电台
            </button>
          </div>
        </div>
      </main>
    </div>
  </aside>
</template>

<style scoped>
/* 无模态层：全透明且 pointer-events: none，不遮挡屏幕下方的任何操作 */
.dj-modeless-layer {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 100060;
}

/* 调音台独立浮动窗口：严禁硬编码深黑，完全契合主题系统变量 */
.dj-deck-dialog {
  pointer-events: auto;
  position: fixed;
  width: 560px;
  max-width: calc(100vw - 32px);
  max-height: calc(100vh - 40px);
  background: var(--panel, #ffffff);
  border: 1px solid var(--border, rgba(0, 0, 0, 0.15));
  border-radius: 16px;
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.22);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  color: var(--text, #1e293b);
  animation: dj-pop 0.18s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes dj-pop {
  from {
    opacity: 0;
    transform: scale(0.96);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.dj-deck-header {
  padding: 12px 18px;
  background: var(--surface, #f8fafc);
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: grab;
  user-select: none;
  touch-action: none;
}
.dj-deck-header:active {
  cursor: grabbing;
}
.dj-title-group {
  display: flex;
  align-items: center;
  gap: 10px;
}
.dj-console-icon {
  font-size: 22px;
}
.dj-main-title {
  font-size: 14.5px;
  font-weight: 700;
  color: var(--heading, #0f172a);
  display: block;
}
.dj-sub-title {
  font-size: 11px;
  color: var(--muted, #64748b);
}
.dj-head-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}
.dj-live-status-pill {
  font-size: 11px;
  padding: 3px 8px;
  border-radius: 12px;
  background: var(--panel);
  border: 1px solid var(--border);
  color: var(--muted);
}
.dj-live-status-pill.live {
  border-color: #10b981;
  color: #10b981;
  background: rgba(16, 185, 129, 0.12);
  font-weight: 600;
}
.dj-close-btn {
  background: transparent;
  border: 0;
  color: var(--muted);
  cursor: pointer;
  font-size: 16px;
  padding: 4px 6px;
  border-radius: 6px;
  transition: all 0.12s ease;
}
.dj-close-btn:hover {
  color: var(--heading);
  background: color-mix(in srgb, var(--border) 40%, transparent);
}

/* 音源琴键切换 */
.dj-source-tabs {
  display: flex;
  background: var(--surface);
  border-bottom: 1px solid var(--border);
  padding: 0 8px;
}
.dj-source-tab {
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 10px 8px;
  background: transparent;
  border: 0;
  border-bottom: 2px solid transparent;
  color: var(--muted);
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.12s ease;
}
.dj-source-tab:hover {
  color: var(--heading);
}
.dj-source-tab.active {
  color: #10b981;
  border-bottom-color: #10b981;
  background: color-mix(in srgb, #10b981 8%, transparent);
}
/* 控制权状态条 */
.dj-ownership-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 16px;
  border-bottom: 1px solid var(--border);
  gap: 12px;
  position: relative;
}
.dj-ownership-bar.is-host {
  background: color-mix(in srgb, #10b981 10%, var(--panel));
}
.dj-ownership-bar.is-listener {
  background: color-mix(in srgb, #6366f1 10%, var(--panel));
}
.ownership-left {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
}
.ownership-icon {
  font-size: 16px;
}
.ownership-text {
  display: flex;
  flex-direction: column;
}
.ownership-text strong {
  font-size: 11.5px;
  color: var(--heading);
}
.ownership-text small {
  font-size: 10px;
  color: var(--muted);
}
.ownership-right {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}
.btn-transfer-control {
  background: var(--surface);
  color: #10b981;
  border: 1px solid color-mix(in srgb, #10b981 30%, transparent);
  border-radius: 6px;
  padding: 4px 10px;
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.12s ease;
}
.btn-transfer-control:hover {
  background: #10b981;
  color: #fff;
}
.btn-claim-control {
  background: #6366f1;
  color: #fff;
  border: 0;
  border-radius: 6px;
  padding: 4px 10px;
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(99, 102, 241, 0.3);
  transition: all 0.12s ease;
}
.btn-claim-control:hover {
  background: #4f46e5;
  transform: translateY(-1px);
}
.transfer-btn-wrapper {
  position: relative;
}
.transfer-dropdown-menu {
  position: absolute;
  top: calc(100% + 4px);
  right: 0;
  min-width: 150px;
  background: var(--panel, #ffffff);
  border: 1px solid var(--border);
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  padding: 6px;
  z-index: 100;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.transfer-menu-title {
  font-size: 10.5px;
  font-weight: 700;
  color: var(--muted);
  padding: 4px 6px;
}
.transfer-peer-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 8px;
  border-radius: 6px;
  background: transparent;
  border: 0;
  cursor: pointer;
  font-size: 11.5px;
  color: var(--heading);
  text-align: left;
  transition: background 0.1s ease;
}
.transfer-peer-item:hover {
  background: color-mix(in srgb, #10b981 12%, var(--panel));
  color: #10b981;
}
.transfer-peer-item small {
  font-size: 9.5px;
  color: var(--muted);
}
.transfer-empty-tip {
  font-size: 10.5px;
  color: var(--muted);
  padding: 6px 8px;
}
.tab-icon {
  font-size: 14px;
}

/* 核心唱机区 */
.dj-turntable-zone {
  padding: 14px 18px;
  display: flex;
  align-items: center;
  gap: 16px;
  background: color-mix(in srgb, var(--surface) 60%, var(--panel));
  border-bottom: 1px solid var(--border);
}

.dj-vinyl-disc {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  background: radial-gradient(circle, #27272a 0%, #18181b 75%, #09090b 100%);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.dj-vinyl-disc.spinning {
  animation: vinyl-spin 7s linear infinite;
}
@keyframes vinyl-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.vinyl-outer-groove {
  width: 82px;
  height: 82px;
  border-radius: 50%;
  border: 1px dashed rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
}
.vinyl-inner-label {
  position: relative;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  overflow: hidden;
  background: #38bdf8;
  display: flex;
  align-items: center;
  justify-content: center;
}
.vinyl-cover-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.vinyl-fallback-icon {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}
.vinyl-center-hole {
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #09090b;
  border: 1.5px solid #fff;
  z-index: 2;
}

.dj-track-cues {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 3px;
}
.cue-source-tag {
  align-self: flex-start;
  font-size: 10px;
  font-weight: 700;
  padding: 2px 7px;
  border-radius: 4px;
  background: rgba(16, 185, 129, 0.12);
  color: #10b981;
}
.cue-top-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}
.btn-send-invite-card {
  background: color-mix(in srgb, #10b981 12%, var(--panel));
  color: #10b981;
  border: 1px solid color-mix(in srgb, #10b981 30%, transparent);
  border-radius: 6px;
  padding: 3px 8px;
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.12s ease;
}
.btn-send-invite-card:hover:not(:disabled) {
  background: #10b981;
  color: #fff;
}
.dj-seek-bar-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 6px;
}
.dj-time-cur, .dj-time-dur {
  font-size: 10.5px;
  color: var(--muted);
  font-variant-numeric: tabular-nums;
  min-width: 28px;
}
.dj-time-dur {
  text-align: right;
}
.dj-seek-slider {
  flex: 1;
  height: 4px;
  -webkit-appearance: none;
  appearance: none;
  background: var(--border);
  border-radius: 2px;
  outline: none;
  cursor: pointer;
}
.dj-seek-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #10b981;
  cursor: pointer;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
}
.dj-ctrl-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 6px;
}
.dj-play-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #10b981;
  color: #fff;
  border: 0;
  border-radius: 7px;
  padding: 5px 14px;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(16, 185, 129, 0.25);
  transition: all 0.15s ease;
}
.dj-play-btn:hover {
  background: #059669;
  transform: translateY(-1px);
}
.dj-stop-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: rgba(244, 63, 94, 0.12);
  border: 1px solid rgba(244, 63, 94, 0.35);
  color: #f43f5e;
  border-radius: 7px;
  padding: 5px 12px;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.15s ease;
}
.dj-stop-btn:hover {
  background: #f43f5e;
  color: #fff;
  transform: translateY(-1px);
}
.dj-sync-indicator {
  font-size: 11px;
  color: #10b981;
  font-weight: 500;
}
.cue-track-title {
  font-size: 15px;
  font-weight: 700;
  color: var(--heading, #0f172a);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.cue-track-artist {
  font-size: 11.5px;
  color: var(--muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.cue-action-row {
  margin-top: 8px;
}
.dj-btn-broadcast {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #10b981;
  color: #fff;
  border: 0;
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 12.5px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(16, 185, 129, 0.35);
  transition: all 0.15s ease;
}
.dj-btn-broadcast:hover {
  background: #059669;
  transform: translateY(-1px);
}
.dj-btn-broadcast:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* 底部曲库列表 */
.dj-playlist-section {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding: 12px 18px 16px;
}
.source-panel-box {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.source-panel-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 11.5px;
  font-weight: 700;
  color: var(--muted);
  gap: 8px;
}
.panel-head-left-group {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
}
.panel-head-page-badge {
  font-size: 10.5px;
  color: #10b981;
  background: rgba(16, 185, 129, 0.12);
  border: 1px solid color-mix(in srgb, #10b981 30%, transparent);
  padding: 1px 6px;
  border-radius: 4px;
  font-weight: 600;
  white-space: nowrap;
}
.panel-head-right-group {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}
.dj-page-btn-group {
  display: flex;
  align-items: center;
  gap: 4px;
}
.btn-page-step {
  background: var(--surface);
  color: var(--heading);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 3px 8px;
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.12s ease;
}
.btn-page-step:hover:not(:disabled) {
  background: color-mix(in srgb, var(--surface) 70%, #10b981 30%);
  border-color: #10b981;
  color: #10b981;
}
.btn-page-step:disabled {
  opacity: 0.38;
  cursor: not-allowed;
}
.netease-filter-toolbar {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 2px;
}
.netease-filter-toolbar .custom-input {
  width: 220px;
}

.dj-pagination-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 4px 2px;
  border-top: 1px solid var(--border);
  margin-top: 4px;
}
.dj-page-count-badge {
  font-size: 11px;
  color: #10b981;
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid color-mix(in srgb, #10b981 25%, transparent);
  padding: 2px 8px;
  border-radius: 4px;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
}

.custom-id-input-wrap {
  display: flex;
  align-items: center;
  gap: 6px;
}
.custom-input {
  width: 170px;
  padding: 4px 8px;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: var(--surface);
  color: var(--text);
  font-size: 11px;
}
.custom-input:focus {
  outline: none;
  border-color: #10b981;
}
.custom-add-btn {
  background: var(--surface);
  color: var(--heading);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 4px 8px;
  font-size: 11px;
  cursor: pointer;
}
.custom-add-btn:hover:not(:disabled) {
  border-color: #10b981;
  color: #10b981;
}
.dj-tracks-grid {
  display: flex;
  flex-direction: column;
  gap: 6px;
  max-height: 270px;
  overflow-y: auto;
}
.dj-track-item-card {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 6px 10px;
  border-radius: 8px;
  background: var(--surface);
  border: 1px solid var(--border);
  cursor: pointer;
  transition: all 0.12s ease;
}
.dj-track-item-card:hover {
  background: color-mix(in srgb, var(--panel) 75%, #10b981 25%);
  border-color: #10b981;
}
.dj-track-item-card.selected {
  border-color: #10b981;
  background: rgba(16, 185, 129, 0.12);
}

.track-seq-num {
  font-size: 11px;
  font-weight: 700;
  color: var(--muted);
  font-variant-numeric: tabular-nums;
  width: 22px;
  text-align: center;
  flex-shrink: 0;
}
.track-thumb-wrap {
  position: relative;
  width: 36px;
  height: 36px;
  border-radius: 6px;
  overflow: hidden;
  background: var(--panel);
  border: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.track-thumb {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.track-thumb-fallback {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  background: color-mix(in srgb, var(--surface) 80%, var(--panel));
}

.track-meta {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
}
.track-name {
  font-size: 12px;
  font-weight: 600;
  color: var(--heading);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.track-sub {
  font-size: 10px;
  color: var(--muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.track-duration {
  font-size: 10.5px;
  color: var(--muted);
  font-variant-numeric: tabular-nums;
  margin-right: 4px;
  flex-shrink: 0;
}
.track-cue-btn {
  font-size: 11px;
  font-weight: 600;
  padding: 3px 8px;
  border-radius: 4px;
  background: var(--panel);
  border: 1px solid var(--border);
  color: var(--muted);
}
.dj-track-item-card.selected .track-cue-btn {
  background: #10b981;
  color: #fff;
  border-color: #10b981;
}

/* 网易云：未绑定提醒横幅 */
.netease-bind-banner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  border-radius: 8px;
  background: color-mix(in srgb, #f59e0b 14%, var(--panel));
  border: 1px solid color-mix(in srgb, #f59e0b 35%, transparent);
  gap: 10px;
}
.bind-banner-left {
  display: flex;
  align-items: center;
  gap: 8px;
}
.bind-banner-icon {
  font-size: 18px;
}
.bind-banner-text {
  display: flex;
  flex-direction: column;
}
.bind-banner-text strong {
  font-size: 12px;
  color: var(--heading);
}
.bind-banner-text small {
  font-size: 10.5px;
  color: var(--muted);
}
.btn-bind-action {
  background: #f59e0b;
  color: #fff;
  border: 0;
  border-radius: 6px;
  padding: 5px 10px;
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.12s ease;
}
.btn-bind-action:hover {
  background: #d97706;
}

/* 网易云：已绑定用户栏 */
.netease-user-badge-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  border-radius: 8px;
  background: var(--surface);
  border: 1px solid var(--border);
}
.user-meta-left {
  display: flex;
  align-items: center;
  gap: 10px;
}
.netease-user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid var(--border);
}
.netease-user-avatar-fallback {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--panel);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
}
.netease-user-name {
  font-size: 12px;
  color: var(--heading);
  display: flex;
  align-items: center;
  gap: 6px;
}
.vip-badge {
  font-size: 9px;
  padding: 1px 4px;
  border-radius: 3px;
  background: #ef4444;
  color: #fff;
  font-weight: 700;
}
.netease-user-stat {
  font-size: 10.5px;
  color: var(--muted);
  display: block;
}
.btn-refresh-fav {
  background: var(--panel);
  color: var(--text);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 3px 8px;
  font-size: 11px;
  cursor: pointer;
}
.btn-refresh-fav:hover:not(:disabled) {
  border-color: #10b981;
  color: #10b981;
}

/* B站电台：歌单系列导航栏 */
.bili-radio-nav-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}
.series-chips-wrap {
  display: flex;
  align-items: center;
  gap: 6px;
  overflow-x: auto;
  flex: 1;
  padding-bottom: 2px;
}
.series-chip {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 3px 10px;
  font-size: 11px;
  color: var(--muted);
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.12s ease;
}
.series-chip:hover {
  color: var(--heading);
  border-color: #10b981;
}
.series-chip.active {
  background: #10b981;
  color: #fff;
  border-color: #10b981;
  font-weight: 600;
}
.btn-open-workspace {
  background: var(--surface);
  color: var(--text);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 3px 8px;
  font-size: 11px;
  cursor: pointer;
  white-space: nowrap;
}
.btn-open-workspace:hover {
  border-color: #10b981;
  color: #10b981;
}

/* 空状态占位提示框 */
.empty-placeholder-box {
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 8px;
  background: var(--surface);
  border: 1px dashed var(--border);
  border-radius: 8px;
}
.placeholder-icon {
  font-size: 28px;
}
.empty-placeholder-box p {
  margin: 0;
  font-size: 11.5px;
  color: var(--muted);
}
</style>
