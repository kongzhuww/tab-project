<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from "vue";
import {
  biliMiniPlayerState as state,
  biliMiniPlayerController as controller
} from "./mini-player-store";
import { getBiliQualityShortLabel, bilibiliService } from "../services/bilibili.service";
import { subtitleModalController } from "./subtitle-modal-store";
import { attachBiliPlaybackSync, detachBiliPlaybackSync } from "./playback-sync";
import { bilibiliChannelService } from "../services/bilibili-channel.service";
import { formatBiliCompactNumber } from "./channel-format";
import BiliRichText from "./BiliRichText.vue";
import { images } from "../sdk/images";
import { useVideoFailover } from "./use-video-failover";

const videoRef = ref<HTMLVideoElement | null>(null);
useVideoFailover(state, videoRef, () => {
  state.errorMsg = "视频源加载失败，备用地址已用尽，请重新获取视频流";
  state.isPlaying = false;
});
const playerRef = ref<HTMLElement | null>(null);

// UP 主粉丝数与关注状态管理
const upFansCount = ref<number | null>(null);
const upFansLoading = ref(false);
const upFollowConfirming = ref(false);
const upFollowBusy = ref(false);

const isUpFollowed = computed(() => {
  const mid = String(state.authorMid || "");
  if (!mid) return false;
  const followings = bilibiliChannelService.upGroupsState.followingsCache || [];
  return followings.some((f) => String(f.mid) === mid);
});

async function loadUpFans(mid: string | number) {
  const midStr = String(mid || "");
  if (!midStr) {
    upFansCount.value = null;
    return;
  }
  upFansLoading.value = true;
  try {
    const res = await bilibiliService.api<{ follower?: number }>(
      `https://api.bilibili.com/x/relation/stat?vmid=${midStr}`
    );
    if (res && typeof res.follower === "number") {
      upFansCount.value = res.follower;
    } else {
      upFansCount.value = null;
    }
  } catch {
    upFansCount.value = null;
  } finally {
    upFansLoading.value = false;
  }
}

watch(
  () => [state.descOpen, state.authorMid],
  ([isOpen, mid]) => {
    upFollowConfirming.value = false;
    if (isOpen && mid) {
      void loadUpFans(mid as string | number);
    } else if (!isOpen) {
      upFansCount.value = null;
    }
  },
  { immediate: true }
);

async function handleFollowClick() {
  const mid = String(state.authorMid || "");
  if (!mid || upFollowBusy.value) return;

  if (isUpFollowed.value) {
    if (!upFollowConfirming.value) {
      upFollowConfirming.value = true;
      return;
    }
    // 二次确认，执行取关
    upFollowBusy.value = true;
    try {
      const res = await bilibiliChannelService.unfollowBiliUp(mid);
      if (res.ok) {
        upFollowConfirming.value = false;
        const currentFollowings = bilibiliChannelService.upGroupsState.followingsCache || [];
        bilibiliChannelService.upGroupsState.followingsCache = currentFollowings.filter(
          (x) => String(x.mid) !== mid
        );
        if (upFansCount.value != null && upFansCount.value > 0) {
          upFansCount.value -= 1;
        }
      }
    } finally {
      upFollowBusy.value = false;
    }
  } else {
    // 执行关注
    upFollowBusy.value = true;
    try {
      const res = await bilibiliChannelService.followBiliUp(mid);
      if (res.ok) {
        upFollowConfirming.value = false;
        const currentFollowings = bilibiliChannelService.upGroupsState.followingsCache || [];
        if (!currentFollowings.some((x) => String(x.mid) === mid)) {
          currentFollowings.unshift({
            mid,
            name: state.author || "UP主",
            face: state.authorFace || "",
            sign: ""
          });
          bilibiliChannelService.upGroupsState.followingsCache = [...currentFollowings];
        }
        if (upFansCount.value != null) {
          upFansCount.value += 1;
        }
      }
    } finally {
      upFollowBusy.value = false;
    }
  }
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

function openSubtitleWindow() {
  if (!state.bvid) return;
  void subtitleModalController.open({
    bvid: state.bvid,
    cid: state.cid,
    title: state.title
  });
}

// 拖拽相关状态
const isDragging = ref(false);
const dragStartX = ref(0);
const dragStartY = ref(0);
const initialPosX = ref(0);
const initialPosY = ref(0);
const isResizing = ref(false);
let resizeStartX = 0;
let resizeStartY = 0;
let resizeStartWidth = 0;
let resizeStartHeight = 0;
let resizeDrawerWidth = 0;

const isAnyDrawerOpen = computed(() => {
  return state.episodesOpen || state.descOpen || state.commentsOpen;
});

interface FlyingDanmaku {
  id: string;
  text: string;
  color: string;
  top: number;
  duration: number;
  mode: number;
}

const activeDanmakus = ref<FlyingDanmaku[]>([]);
let danmakuIndex = 0;
let lastVideoTime = 0;
const trackOccupiedUntil = [0, 0, 0, 0, 0, 0, 0, 0];

function findDanmakuIndex(list: any[], time: number): number {
  let low = 0;
  let high = list.length - 1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (list[mid].time < time) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  return low;
}

function updateFlyingDanmakus() {
  if (!state.danmakuEnabled || !state.danmakuList?.length || !videoRef.value) return;
  const curTime = videoRef.value.currentTime;

  // 1. 快进 / 快退 (seek) 跳跃判断
  if (Math.abs(curTime - lastVideoTime) > 1.5) {
    activeDanmakus.value = [];
    danmakuIndex = findDanmakuIndex(state.danmakuList, curTime);
    lastVideoTime = curTime;
    return;
  }

  const now = performance.now();
  const screenEl = playerRef.value?.querySelector(".bili-mini-screen") as HTMLElement | null;
  const screenH = screenEl?.clientHeight || 240;
  const maxTracks = Math.max(3, Math.min(8, Math.floor((screenH - 45) / 26)));

  while (danmakuIndex < state.danmakuList.length) {
    const dm = state.danmakuList[danmakuIndex];
    if (dm.time > curTime) break;

    // 只有在当前播放时间窗口（前 1.2 秒内）的弹幕才发射
    if (curTime - dm.time <= 1.2) {
      let chosenTrack = 0;
      let minOccupied = Infinity;
      for (let t = 0; t < maxTracks; t++) {
        const until = trackOccupiedUntil[t] || 0;
        if (until <= now) {
          chosenTrack = t;
          break;
        }
        if (until < minOccupied) {
          minOccupied = until;
          chosenTrack = t;
        }
      }

      const charCount = dm.text.length;
      trackOccupiedUntil[chosenTrack] = now + Math.max(1000, charCount * 110);

      const flyItem: FlyingDanmaku = {
        id: `${dm.id}_${now}_${Math.random()}`,
        text: dm.text,
        color: dm.color,
        top: chosenTrack * 26 + 8,
        duration: 5.5,
        mode: dm.mode
      };

      activeDanmakus.value.push(flyItem);

      setTimeout(() => {
        const idx = activeDanmakus.value.findIndex((d) => d.id === flyItem.id);
        if (idx !== -1) {
          activeDanmakus.value.splice(idx, 1);
        }
      }, flyItem.duration * 1000);
    }

    danmakuIndex++;
  }

  lastVideoTime = curTime;
}

watch(
  () => [state.videoSrc, state.cid],
  () => {
    activeDanmakus.value = [];
    danmakuIndex = 0;
    lastVideoTime = 0;
  }
);

const currentQualityLabel = computed(() => {
  return getBiliQualityShortLabel(state.currentQuality);
});

// 左侧抽屉（选集或简介）展开时的总宽度
const leftDrawersWidth = computed(() => {
  if (state.collapsed) return 0;
  const isNarrow = typeof window !== "undefined" && window.innerWidth <= 900;
  let w = 0;
  if (state.episodesOpen) w += isNarrow ? 200 : 240;
  if (state.descOpen) w += isNarrow ? 220 : 280;
  return w;
});

// 计算播放器容器几何尺寸
const computedWidth = computed(() => {
  if (state.collapsed) return 250;
  const isNarrow = typeof window !== "undefined" && window.innerWidth <= 900;
  let totalW = state.baseWidth || (isNarrow ? 340 : 380);
  if (state.episodesOpen) totalW += isNarrow ? 200 : 240;
  if (state.descOpen) totalW += isNarrow ? 220 : 280;
  if (state.commentsOpen) totalW += isNarrow ? 260 : 330;
  return totalW;
});

const computedHeight = computed(() => {
  if (state.collapsed) return 34;
  return Math.max(isAnyDrawerOpen.value ? 380 : 254, state.height);
});

const playerStyle = computed(() => {
  // 折叠小窗模式：若页面存在「最近收藏」右侧的停靠锚点，自动精准吸附过去！
  if (state.collapsed && typeof document !== "undefined") {
    const anchor = document.querySelector(".fo-mini-dock-anchor");
    if (anchor && anchor.getBoundingClientRect) {
      const rect = anchor.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0 && rect.top > 0) {
        return {
          left: `${rect.left}px`,
          top: `${rect.top}px`,
          width: `${computedWidth.value}px`,
          height: `${computedHeight.value}px`,
          zIndex: state.zIndex
        };
      }
    }
  }

  // 关键：当左侧抽屉（选集或简介）展开时，窗口实际 left 向左伸展，保证中间的视频核心区在屏幕上的二维视口位置 100% 保持不动！
  const actualLeft = Math.max(8, state.x - leftDrawersWidth.value);

  return {
    left: `${actualLeft}px`,
    top: `${state.y}px`,
    width: `${computedWidth.value}px`,
    height: `${computedHeight.value}px`,
    zIndex: state.zIndex
  };
});

// 解析评论中的 B站表情包（如 [Neuro sama收藏集_比心]）
interface CommentToken {
  type: "text" | "emote";
  text: string;
  url?: string;
}

function parseCommentTokens(message: string, emotes?: Record<string, string>): CommentToken[] {
  if (!message) return [];
  if (!emotes || Object.keys(emotes).length === 0) {
    return [{ type: "text", text: message }];
  }

  const tokens: CommentToken[] = [];
  const regex = /\[[^\]]+\]/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(message)) !== null) {
    if (match.index > lastIndex) {
      tokens.push({ type: "text", text: message.slice(lastIndex, match.index) });
    }
    const emoteKey = match[0];
    const emoteUrl = emotes[emoteKey];
    if (emoteUrl) {
      tokens.push({ type: "emote", text: emoteKey, url: emoteUrl });
    } else {
      tokens.push({ type: "text", text: emoteKey });
    }
    lastIndex = match.index + emoteKey.length;
  }
  if (lastIndex < message.length) {
    tokens.push({ type: "text", text: message.slice(lastIndex) });
  }
  return tokens;
}

// 监听播放倍速同步到 video 元素
watch(
  () => state.playbackRate,
  (rate) => {
    if (videoRef.value) {
      videoRef.value.playbackRate = rate;
    }
  }
);

// 监听 videoSrc / bvid 变更，自动播放并设置倍速，同时将台词实时同步到底部台词栏
watch(
  () => [state.videoSrc, state.bvid],
  async ([newSrc, bvid]) => {
    if (newSrc && bvid) {
      await nextTick();
      if (!videoRef.value || state.videoSrc !== newSrc || state.bvid !== bvid) return;
      videoRef.value.playbackRate = state.playbackRate;
      videoRef.value.play().catch(() => {});
      void attachBiliPlaybackSync({ bvid: state.bvid, title: state.title, cover: state.cover }, videoRef.value);
    }
  }
);

// 拖拽与缩放高性能调度 (rAF 节流 + 零 VNode Diff 架构)
let dragRafId = 0;
let currentLeft = 0;
let currentTop = 0;
let resizeRafId = 0;
let currentWidth = 0;
let currentHeight = 0;
let finishDrag: (() => void) | null = null;
let finishResize: (() => void) | null = null;

function onPointerDown(e: PointerEvent) {
  // 如果点击的是按钮、链接或者菜单项，不触发窗口拖拽
  const target = e.target as HTMLElement | null;
  if (
    target?.closest(
      "button, a, input, textarea, select, .bili-mini-quality-menu, .bili-mini-speed-menu, .bili-mini-tab-btn, .no-drag"
    )
  ) {
    return;
  }
  if (!playerRef.value) return;
  finishDrag?.(); finishResize?.();

  isDragging.value = true;
  dragStartX.value = e.clientX;
  dragStartY.value = e.clientY;
  initialPosX.value = state.x;
  initialPosY.value = state.y;

  controller.bringToFront();

  // 开启 GPU 硬件合成层并锁定指针，防止划过 video/iframe 时丢帧卡顿
  playerRef.value.style.willChange = "left, top";
  playerRef.value.classList.add("is-dragging");

  const headEl = e.currentTarget as HTMLElement | null;
  try {
    headEl?.setPointerCapture(e.pointerId);
  } catch {}

  const minX = leftDrawersWidth.value + 8;
  const maxX = Math.max(minX, window.innerWidth - (computedWidth.value - leftDrawersWidth.value) - 8);
  const maxY = Math.max(0, window.innerHeight - computedHeight.value - 8);

  let curX = state.x;
  let curY = state.y;

  const renderPosition = () => {
    dragRafId = 0;
    // 关键：必须每帧同步写回响应式 state.x 和 state.y，防止视频播放中的 timeupdate 触发 Vue re-render 时拉扯回到旧坐标产生抽动！
    state.x = curX;
    state.y = curY;
    if (playerRef.value) {
      playerRef.value.style.left = `${currentLeft}px`;
      playerRef.value.style.top = `${currentTop}px`;
    }
  };

  const onPointerMove = (ev: PointerEvent) => {
    if (!isDragging.value) return;
    const deltaX = ev.clientX - dragStartX.value;
    const deltaY = ev.clientY - dragStartY.value;

    curX = Math.min(maxX, Math.max(minX, initialPosX.value + deltaX));
    curY = Math.min(maxY, Math.max(8, initialPosY.value + deltaY));

    // 计算实际宿主 left 需抵消左侧抽屉
    currentLeft = Math.max(8, curX - leftDrawersWidth.value);
    currentTop = curY;

    if (!dragRafId) {
      dragRafId = requestAnimationFrame(renderPosition);
    }
  };

  const onPointerUp = () => {
    finishDrag = null;
    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("pointerup", onPointerUp);
    window.removeEventListener("pointercancel", onPointerUp);

    if (dragRafId) {
      cancelAnimationFrame(dragRafId);
      dragRafId = 0;
    }

    if (headEl) {
      try {
        headEl.releasePointerCapture(e.pointerId);
      } catch {}
    }

    if (playerRef.value) {
      playerRef.value.style.willChange = "auto";
      playerRef.value.classList.remove("is-dragging");
    }

    isDragging.value = false;

    // 仅在松开鼠标的这一刻，将最终坐标一次性持久化写回 Vue 响应式状态
    state.x = curX;
    state.y = curY;
  };

  finishDrag = onPointerUp;
  window.addEventListener("pointermove", onPointerMove, { passive: true });
  window.addEventListener("pointerup", onPointerUp, { once: true });
  window.addEventListener("pointercancel", onPointerUp, { once: true });
}

function onResizePointerDown(e: PointerEvent) {
  if (!playerRef.value) return;
  finishDrag?.(); finishResize?.();
  e.preventDefault();
  e.stopPropagation();

  isResizing.value = true;
  resizeStartX = e.clientX;
  resizeStartY = e.clientY;
  resizeStartWidth = computedWidth.value;
  resizeStartHeight = computedHeight.value;
  resizeDrawerWidth = resizeStartWidth - (state.baseWidth || (window.innerWidth <= 900 ? 340 : 380));

  controller.bringToFront();

  playerRef.value.style.willChange = "width, height";
  playerRef.value.classList.add("is-dragging");

  const handleEl = e.currentTarget as HTMLElement | null;
  try {
    handleEl?.setPointerCapture(e.pointerId);
  } catch {}

  const maxWidth = Math.max(resizeStartWidth, window.innerWidth - state.x - 10);
  const maxHeight = Math.max(resizeStartHeight, window.innerHeight - state.y - 10);

  let finalBaseW = state.baseWidth || 380;
  let finalH = state.height || 254;

  const renderResize = () => {
    resizeRafId = 0;
    state.baseWidth = finalBaseW;
    state.height = finalH;
    if (playerRef.value) {
      playerRef.value.style.width = `${currentWidth}px`;
      playerRef.value.style.height = `${currentHeight}px`;
    }
  };

  const onResizePointerMove = (ev: PointerEvent) => {
    if (!isResizing.value) return;
    const nextWidth = Math.min(
      maxWidth,
      Math.max(resizeDrawerWidth + 280, resizeStartWidth + ev.clientX - resizeStartX)
    );
    currentWidth = nextWidth;
    finalBaseW = Math.round(nextWidth - resizeDrawerWidth);

    const nextHeight = Math.round(
      Math.min(maxHeight, Math.max(254, resizeStartHeight + ev.clientY - resizeStartY))
    );
    currentHeight = nextHeight;
    finalH = nextHeight;

    if (!resizeRafId) {
      resizeRafId = requestAnimationFrame(renderResize);
    }
  };

  const onResizePointerUp = () => {
    finishResize = null;
    window.removeEventListener("pointermove", onResizePointerMove);
    window.removeEventListener("pointerup", onResizePointerUp);
    window.removeEventListener("pointercancel", onResizePointerUp);

    if (resizeRafId) {
      cancelAnimationFrame(resizeRafId);
      resizeRafId = 0;
    }

    if (handleEl) {
      try {
        handleEl.releasePointerCapture(e.pointerId);
      } catch {}
    }

    if (playerRef.value) {
      playerRef.value.style.willChange = "auto";
      playerRef.value.classList.remove("is-dragging");
    }

    isResizing.value = false;
    state.baseWidth = finalBaseW;
    state.height = finalH;
  };

  finishResize = onResizePointerUp;
  window.addEventListener("pointermove", onResizePointerMove, { passive: true });
  window.addEventListener("pointerup", onResizePointerUp, { once: true });
  window.addEventListener("pointercancel", onResizePointerUp, { once: true });
}

// 播放控制
function togglePlay() {
  if (!videoRef.value) return;
  if (videoRef.value.paused) {
    videoRef.value.play().catch(() => {});
  } else {
    videoRef.value.pause();
  }
}

function onTimeUpdate() {
  if (videoRef.value) {
    state.currentTime = videoRef.value.currentTime;
    state.duration = videoRef.value.duration || 0;
    updateFlyingDanmakus();
  }
}

function onPlay() {
  state.isPlaying = true;
  if (videoRef.value && state.bvid) {
    void attachBiliPlaybackSync({ bvid: state.bvid, title: state.title, cover: state.cover }, videoRef.value);
  }
}

function onPause() {
  state.isPlaying = false;
}

function onEnded() {
  // 自动连播下一P
  if (state.currentPageIndex < state.pages.length - 1) {
    void controller.switchEpisode(state.currentPageIndex + 1);
  }
}

function prevEpisode() {
  if (state.currentPageIndex > 0) {
    void controller.switchEpisode(state.currentPageIndex - 1);
  }
}

function nextEpisode() {
  if (state.currentPageIndex < state.pages.length - 1) {
    void controller.switchEpisode(state.currentPageIndex + 1);
  }
}

function toggleQualityMenu() {
  state.qualityMenuOpen = !state.qualityMenuOpen;
  if (state.qualityMenuOpen) {
    state.speedMenuOpen = false;
  }
}

function toggleSpeedMenu() {
  state.speedMenuOpen = !state.speedMenuOpen;
  if (state.speedMenuOpen) {
    state.qualityMenuOpen = false;
  }
}

// 点击空白关闭下拉菜单
function handleOutsideClick(e: MouseEvent) {
  const target = e.target as HTMLElement | null;
  if (!target?.closest(".bili-mini-quality-wrap")) {
    state.qualityMenuOpen = false;
  }
  if (!target?.closest(".bili-mini-speed-wrap")) {
    state.speedMenuOpen = false;
  }
}

onMounted(() => {
  window.addEventListener("click", handleOutsideClick);
});

onUnmounted(() => {
  if (videoRef.value) {
    detachBiliPlaybackSync(videoRef.value);
  }
  window.removeEventListener("click", handleOutsideClick);
  finishDrag?.();
  finishResize?.();
});
</script>

<template>
  <Teleport to="body">
    <section
      v-if="state.isOpen"
      v-show="!state.collapsed"
      ref="playerRef"
      class="bili-mini-player"
      :class="{
        collapsed: state.collapsed,
        'subscription-comments-view': isAnyDrawerOpen,
        'episodes-expanded': state.episodesOpen,
        'desc-expanded': state.descOpen,
        'comments-expanded': state.commentsOpen
      }"
      :style="playerStyle"
      @mousedown="controller.bringToFront"
    >
      <!-- 主体横向多栏容器：每一栏各自拥有专属 34px 顶栏，高度水平完全对齐，按钮永远固定在视频上方！ -->
      <div class="bili-mini-main-body">
        <!-- 1. 左侧选集抽屉 -->
        <div v-if="state.episodesOpen" class="bili-mini-episodes-drawer">
          <div class="bili-mini-episodes-head" @pointerdown="onPointerDown">
            <div class="bili-mini-episodes-meta">
              <span>📑 视频选集</span>
              <span class="bili-mini-episodes-count">({{ state.pages.length }}P)</span>
            </div>
            <button
              type="button"
              class="bili-mini-tab-btn"
              title="收起选集"
              @click.stop="controller.toggleEpisodes(false)"
            >
              ✕
            </button>
          </div>
          <div class="bili-mini-episodes-body">
            <button
              v-for="(ep, idx) in state.pages"
              :key="ep.cid"
              type="button"
              class="bili-mini-ep-item"
              :class="{ active: idx === state.currentPageIndex }"
              @click.stop="controller.switchEpisode(idx)"
            >
              <span class="bili-mini-ep-badge">P{{ ep.page || idx + 1 }}</span>
              <span class="bili-mini-ep-part" :title="ep.part">{{ ep.part || `第 ${idx + 1} 集` }}</span>
            </button>
          </div>
        </div>

        <!-- 2. 左侧/中间视频简介抽屉 -->
        <div v-if="state.descOpen" class="bili-mini-desc-drawer">
          <div class="bili-mini-desc-head" @pointerdown="onPointerDown">
            <div class="bili-mini-desc-meta">
              <span>📋 视频简介</span>
            </div>
            <div style="display: flex; align-items: center; gap: 4px;">
              <button
                type="button"
                class="bili-copy-desc-btn"
                title="复制完整视频简介"
                @click.stop="controller.copyDescription()"
              >
                复制简介
              </button>
              <button
                type="button"
                class="bili-mini-tab-btn"
                title="收起简介"
                @click.stop="controller.toggleDesc(false)"
              >
                ✕
              </button>
            </div>
          </div>
          <div class="bili-mini-desc-body">
            <div class="bili-mini-desc-up">
              <img
                v-if="state.authorFace"
                :src="state.authorFace"
                class="bili-mini-desc-avatar clickable"
                alt=""
                loading="lazy"
                title="点击查看 UP 主详情与近期投稿"
                @click.stop="openUpPreview($event, { mid: state.authorMid, name: state.author, face: state.authorFace })"
              />
              <div class="bili-mini-desc-up-info">
                <div class="bili-mini-desc-up-top">
                  <span
                    class="bili-mini-desc-up-name clickable"
                    title="点击查看 UP 主详情与近期投稿"
                    @click.stop="openUpPreview($event, { mid: state.authorMid, name: state.author, face: state.authorFace })"
                  >{{ state.author || "UP主" }}</span>
                </div>
                <div class="bili-mini-desc-up-sub">
                  <span v-if="upFansCount != null" class="bili-mini-desc-fans">
                    {{ formatBiliCompactNumber(upFansCount) }}粉丝
                  </span>
                  <span v-else-if="upFansLoading" class="bili-mini-desc-fans loading">粉丝加载中…</span>
                  <span v-if="state.pubdate" class="bili-mini-desc-pubdate">{{ state.pubdate }}</span>
                </div>
              </div>
              <div v-if="state.authorMid" class="bili-mini-desc-follow-wrap">
                <button
                  type="button"
                  class="bili-mini-desc-follow-btn"
                  :class="{
                    followed: isUpFollowed && !upFollowConfirming,
                    confirming: upFollowConfirming,
                    busy: upFollowBusy
                  }"
                  :disabled="upFollowBusy"
                  :title="isUpFollowed ? (upFollowConfirming ? '点击确认取消关注' : '已关注，点击取关') : '关注该 UP 主'"
                  @click.stop="handleFollowClick"
                  @mouseleave="upFollowConfirming = false"
                >
                  <template v-if="upFollowBusy">...</template>
                  <template v-else-if="!isUpFollowed">+ 关注</template>
                  <template v-else-if="upFollowConfirming">确定取消？</template>
                  <template v-else>已关注</template>
                </button>
              </div>
            </div>
            <div class="bili-mini-desc-title">{{ state.title }}</div>
            <div class="bili-mini-desc-divider"></div>
            <div class="bili-mini-desc-text"><BiliRichText :text="state.description || '暂无简介'" /></div>
          </div>
        </div>

        <!-- 3. 核心视频播放视窗（头部严格锁定在视频正上方，按钮位置绝对不随评论抽屉展开而偏移！） -->
        <div class="bili-mini-player-pane">
          <!-- 视频专属顶部操作栏 -->
          <header class="bili-mini-head" @pointerdown="onPointerDown">
            <span class="bili-mini-title" :title="state.title">
              {{ state.title || "正在加载…" }}
            </span>

            <!-- 选集导航 (多P时展示) -->
            <div v-if="state.pages.length > 1" class="bili-mini-episodes-wrap">
              <button
                class="bili-mini-ep-btn prev"
                type="button"
                title="上一集"
                :disabled="state.currentPageIndex <= 0"
                @click.stop="prevEpisode"
              >‹</button>
              <button
                class="bili-mini-ep-label"
                :class="{ active: state.episodesOpen }"
                type="button"
                title="展开/收起选集列表"
                @click.stop="controller.toggleEpisodes()"
              >
                P{{ state.currentPageIndex + 1 }}
              </button>
              <button
                class="bili-mini-ep-btn next"
                type="button"
                title="下一集"
                :disabled="state.currentPageIndex >= state.pages.length - 1"
                @click.stop="nextEpisode"
              >›</button>
            </div>

            <!-- 字幕纯文本提取按钮 -->
            <button
              class="bili-mini-speed-btn bili-mini-sub-btn"
              type="button"
              title="提取当前视频全部字幕 TXT"
              @click.stop="openSubtitleWindow"
            >
              字幕
            </button>

            <!-- 倍速切换 -->
            <div class="bili-mini-speed-wrap">
              <button
                class="bili-mini-speed-btn"
                :class="{ active: state.speedMenuOpen }"
                type="button"
                title="点击切换播放倍速"
                @click.stop="toggleSpeedMenu"
              >
                {{ state.playbackRate }}x
              </button>
              <div v-if="state.speedMenuOpen" class="bili-mini-speed-menu">
                <button
                  v-for="s in [0.5, 0.75, 1.0, 1.25, 1.5, 2.0]"
                  :key="s"
                  type="button"
                  class="bili-mini-speed-item"
                  :class="{ active: s === state.playbackRate }"
                  @click.stop="controller.setPlaybackRate(s)"
                >
                  <span>{{ s }}x</span>
                </button>
              </div>
            </div>

            <!-- 简介抽屉开关 -->
            <button
              class="bili-mini-desc-toggle"
              :class="{ active: state.descOpen }"
              type="button"
              title="展开/收起视频简介"
              @click.stop="controller.toggleDesc()"
            >
              📋 简介
            </button>

            <!-- 评论抽屉开关 -->
            <button
              class="bili-mini-comments-toggle"
              :class="{ active: state.commentsOpen }"
              type="button"
              title="展开/收起评论区"
              @click.stop="controller.toggleComments()"
            >
              💬 评论
            </button>

            <!-- 最小化 & 关闭 (始终固定在中间视频顶栏右侧，绝对不乱跳) -->
            <button
              class="bili-mini-collapse"
              type="button"
              title="收起"
              @click.stop="controller.toggleCollapse()"
            >
              —
            </button>
            <button
              class="bili-mini-close"
              type="button"
              title="关闭并释放播放器"
              @click.stop="controller.close()"
            >
              ✕
            </button>
          </header>

          <div class="bili-mini-screen">
            <iframe
              v-if="state.useIframe && state.iframeSrc"
              :src="state.iframeSrc"
              class="bili-mini-iframe"
              frameborder="0"
              allow="autoplay; fullscreen"
              allowfullscreen
              referrerpolicy="no-referrer"
              style="width: 100%; height: 100%; border: 0; display: block;"
            ></iframe>
            <video
              v-else-if="state.videoSrc"
              ref="videoRef"
              :src="state.videoSrc"
              :poster="state.cover || undefined"
              controls
              autoplay
              playsinline
              preload="metadata"
              referrerpolicy="no-referrer"
              style="width: 100%; height: 100%; object-fit: contain; background: #000; display: block;"
              @timeupdate="onTimeUpdate"
              @play="onPlay"
              @pause="onPause"
              @ended="onEnded"
            ></video>

            <!-- 原版飞屏弹幕层 (覆盖在视频上，pointer-events: none) -->
            <div
              v-if="state.videoSrc"
              v-show="state.danmakuEnabled"
              class="bili-danmaku-stage"
              :class="{ 'is-paused': !state.isPlaying }"
            >
              <div
                v-for="dm in activeDanmakus"
                :key="dm.id"
                class="bili-danmaku-bullet"
                :class="{ 'is-top': dm.mode === 5, 'is-bottom': dm.mode === 4 }"
                :style="{
                  top: `${dm.top}px`,
                  color: dm.color,
                  animationDuration: `${dm.duration}s`
                }"
              >
                {{ dm.text }}
              </div>
            </div>

            <!-- 下方原版弹幕控制开关 (半透明发光胶囊，点击就开，再点击就关) -->
            <div v-if="state.videoSrc" class="bili-danmaku-bar-bottom" @click.stop>
              <button
                type="button"
                class="bili-danmaku-toggle-btn"
                :class="{ active: state.danmakuEnabled }"
                :title="state.danmakuEnabled ? '点击关闭弹幕' : '点击开启弹幕'"
                @click.stop="controller.toggleDanmakuEnabled()"
              >
                <span class="bili-dm-btn-icon">{{ state.danmakuEnabled ? '💬' : '🔲' }}</span>
                <span class="bili-dm-btn-label">弹幕</span>
                <span class="bili-dm-btn-state">{{ state.danmakuEnabled ? '开' : '关' }}</span>
              </button>
            </div>
            <div v-if="state.isLoading" class="bili-mini-status">
              <span>正在取得原生视频流…</span>
            </div>
            <div v-else-if="state.errorMsg" class="bili-mini-status error" style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; padding: 12px; text-align: center;">
              <span>{{ state.errorMsg }}</span>
              <button type="button" style="padding: 5px 14px; background: #00aeec; color: #fff; border: 0; border-radius: 5px; cursor: pointer; font-size: 12px; font-weight: 600;" @click.stop="controller.retryCurrentVideo()">重新获取视频流</button>
            </div>
          </div>
        </div>

        <!-- 4. 右侧评论区抽屉 (其顶部控制栏与视频顶部高度完全对齐，评论内容在正下方) -->
        <div v-if="state.commentsOpen" class="bili-mini-comments-drawer">
          <div class="bili-mini-comments-head" @pointerdown="onPointerDown">
            <div class="bili-mini-comments-meta">
              <span>💬 视频评论</span>
              <span class="bili-mini-comments-count">({{ state.totalComments || 0 }})</span>
            </div>
            <div class="bili-mini-comments-right">
              <div class="bili-mini-comments-sort">
                <button
                  type="button"
                  class="bili-mini-sort-btn"
                  :class="{ active: state.commentsSort === 2 }"
                  @click.stop="controller.setCommentsSort(2)"
                >
                  按热度
                </button>
                <button
                  type="button"
                  class="bili-mini-sort-btn"
                  :class="{ active: state.commentsSort === 0 }"
                  @click.stop="controller.setCommentsSort(0)"
                >
                  按时间
                </button>
              </div>
              <button
                type="button"
                class="bili-mini-tab-btn"
                title="收起评论"
                @click.stop="controller.toggleComments(false)"
              >
                ✕
              </button>
            </div>
          </div>
          <div class="bili-mini-comments-body">
          <template v-if="state.comments.length">
            <div
              v-for="c in state.comments"
              :key="c.id"
              class="bili-comment-item"
            >
              <img
                :src="c.avatar || 'assets/default-avatar.svg'"
                class="bili-comment-avatar clickable"
                alt=""
                loading="lazy"
                title="点击查看 UP 主/作者详情与近期投稿"
                @click.stop="openUpPreview($event, { mid: c.mid, name: c.uname, face: c.avatar })"
              />
              <div class="bili-comment-main">
                <div class="bili-comment-user-row">
                  <span
                    class="bili-comment-uname clickable"
                    title="点击查看 UP 主/作者详情与近期投稿"
                    @click.stop="openUpPreview($event, { mid: c.mid, name: c.uname, face: c.avatar })"
                  >{{ c.uname }}</span>
                  <span
                    v-if="c.isUp || c.uname === state.author || (state.authorMid && String(c.mid) === String(state.authorMid))"
                    class="bili-comment-up-badge"
                    title="视频作者"
                  >UP主</span>
                  <span class="bili-comment-time">{{ c.timeStr }}</span>
                </div>
                <div class="bili-comment-text">
                  <BiliRichText :text="c.message" :emotes="c.emotes" />
                </div>
                <div v-if="c.pictures.length" class="bili-mini-comment-pictures">
                  <button
                    v-for="(picture, index) in c.pictures"
                    :key="`${picture}-${index}`"
                    type="button"
                    class="bili-mini-comment-picture"
                    :aria-label="`查看 ${c.uname} 的评论图片 ${index + 1}`"
                    @click.stop="images.open({ source: picture, title: `${c.uname} 的评论图片` })"
                  >
                    <img :src="picture" alt="评论图片" loading="lazy" referrerpolicy="no-referrer" />
                  </button>
                </div>
                <div class="bili-comment-actions">
                  <span>👍 {{ c.likeCount }}</span>
                  <span v-if="c.replyCount">💬 {{ c.replyCount }}</span>
                </div>
                <div v-if="c.replies?.length" class="bili-comment-sub-list">
                  <div v-for="sub in c.replies" :key="sub.id" class="bili-comment-sub-item">
                    <strong class="bili-comment-sub-uname">{{ sub.userName }}:</strong>
                    <BiliRichText :text="sub.message" :emotes="sub.emotes" />
                    <div v-if="sub.pictures.length" class="bili-mini-comment-pictures">
                      <button
                        v-for="(picture, index) in sub.pictures"
                        :key="`${picture}-${index}`"
                        type="button"
                        class="bili-mini-comment-picture"
                        :aria-label="`查看 ${sub.userName} 的回复图片 ${index + 1}`"
                        @click.stop="images.open({ source: picture, title: `${sub.userName} 的回复图片` })"
                      >
                        <img :src="picture" alt="回复图片" loading="lazy" referrerpolicy="no-referrer" />
                      </button>
                    </div>
                  </div>
                  <!-- 原地展开 / 点击查看楼中楼控制条 -->
                  <div class="bili-comment-sub-more">
                    <template v-if="!c.subRepliesExpanded && (c.replyCount || 0) > c.replies.length">
                      <span>共 {{ c.replyCount }} 条回复，</span>
                      <button
                        type="button"
                        class="bili-comment-sub-expand-btn"
                        :disabled="c.subRepliesLoading"
                        @click.stop="controller.expandSubReplies(c.id)"
                      >
                        {{ c.subRepliesLoading ? '正在加载回复…' : '点击查看 ›' }}
                      </button>
                    </template>
                    <template v-else-if="c.subRepliesExpanded">
                      <button
                        v-if="c.subRepliesHasMore"
                        type="button"
                        class="bili-comment-sub-expand-btn"
                        :disabled="c.subRepliesLoading"
                        @click.stop="controller.expandSubReplies(c.id)"
                      >
                        {{ c.subRepliesLoading ? '正在加载更多…' : '加载更多回复 ›' }}
                      </button>
                      <button
                        type="button"
                        class="bili-comment-sub-collapse-btn"
                        @click.stop="controller.collapseSubReplies(c.id)"
                      >
                        收起 ▴
                      </button>
                    </template>
                  </div>
                </div>
              </div>
            </div>
          </template>
          <p
            v-else-if="state.commentsLoading"
            class="muted small"
            style="text-align: center; padding: 20px 0;"
          >
            正在加载评论…
          </p>
          <p
            v-else
            class="muted small"
            style="text-align: center; padding: 20px 0;"
          >
            暂无评论
          </p>
        </div>
        <div v-if="state.hasMoreComments" class="bili-mini-comments-foot">
          <button
            type="button"
            class="bili-mini-comments-more-btn"
            :disabled="state.commentsLoading"
            @click.stop="controller.loadMoreComments()"
          >
            {{ state.commentsLoading ? "加载中…" : "加载更多评论" }}
          </button>
        </div>
      </div>
    </div>
    <div v-if="!state.collapsed" class="bili-mini-resize-handle" role="separator" aria-label="调整播放器大小" @pointerdown="onResizePointerDown"></div>
  </section>
  </Teleport>
</template>

<style scoped>
.bili-mini-comment-pictures {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 6px;
}
.bili-mini-comment-picture {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  max-width: 100%;
  padding: 0;
  overflow: hidden;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: var(--panel);
  color: var(--text);
  cursor: zoom-in;
}
.bili-mini-comment-picture:hover,
.bili-mini-comment-picture:focus-visible {
  border-color: var(--accent, #00aeec);
}
.bili-mini-comment-picture img {
  display: block;
  width: 100%;
  max-height: 120px;
  object-fit: contain;
}

.bili-comment-emote {
  display: inline-block;
  vertical-align: text-bottom;
  width: 22px;
  height: 22px;
  object-fit: contain;
  margin: 0 1px;
}

.bili-comment-avatar.clickable,
.bili-mini-desc-avatar.clickable {
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}
.bili-comment-avatar.clickable:hover,
.bili-mini-desc-avatar.clickable:hover {
  transform: scale(1.08);
  box-shadow: 0 2px 8px rgba(0, 174, 236, 0.35);
}

.bili-comment-uname.clickable,
.bili-mini-desc-up-name.clickable {
  cursor: pointer;
  transition: color 0.15s ease;
}
.bili-comment-uname.clickable:hover,
.bili-mini-desc-up-name.clickable:hover {
  color: #00aeec !important;
  text-decoration: underline;
}

.bili-comment-up-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 8.5px;
  line-height: 1;
  padding: 1.5px 5px;
  border-radius: 4px;
  background: linear-gradient(135deg, #fb7299, #f43f5e);
  color: #ffffff !important;
  font-weight: 700;
  letter-spacing: 0.3px;
  box-shadow: 0 1px 4px rgba(251, 114, 153, 0.3);
  vertical-align: middle;
  flex-shrink: 0;
  user-select: none;
}
</style>
