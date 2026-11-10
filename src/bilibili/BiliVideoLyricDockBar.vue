<script setup lang="ts">
import { onMounted, onUnmounted, ref, computed, watch } from "vue";
import { biliFavoritesState } from "./bili-favorites-store";
import { biliMiniPlayerState } from "./mini-player-store";
import { t } from "../i18n";

const props = withDefaults(defineProps<{
  inlineHero?: boolean;
}>(), {
  inlineHero: false,
});

const barWidth = ref<number>(340);
const isResizing = ref(false);
const isCollapsed = ref(false);
const isDragging = ref(false);
const customPos = ref<{ x: number; y: number } | null>(null);
const barRef = ref<HTMLElement | null>(null);

// 🌟 严格联动播放器状态：播放器关闭或无视频时立刻隐去，绝不残留
const isVisible = computed(() => {
  if (!biliMiniPlayerState.isOpen || (!biliMiniPlayerState.bvid && !biliMiniPlayerState.videoSrc)) {
    return false;
  }
  return true;
});

// 监听播放器关闭，自动清洗台词文本
watch(() => biliMiniPlayerState.isOpen, (open) => {
  if (!open) {
    biliFavoritesState.organizer.heroLyricText = "";
  }
});

function handleHeroSeek(deltaSeconds: number) {
  const video = document.querySelector(".bili-mini-screen video, .bili-sub-screen video") as HTMLVideoElement | null;
  if (video) {
    video.currentTime = Math.max(0, video.currentTime + deltaSeconds);
  }
}

// 🌟 自由拖拽位置逻辑 (Drag Position)
function onPointerDown(e: PointerEvent) {
  const target = e.target as HTMLElement | null;
  // 点击快进/快退/收起按钮或边缘调节把手时不触发位置拖拽
  if (target?.closest("button, .lyric-resize-handle, input, a")) return;
  if (!barRef.value) return;

  isDragging.value = true;
  const rect = barRef.value.getBoundingClientRect();
  const currentLeft = customPos.value ? customPos.value.x : rect.left;
  const currentTop = customPos.value ? customPos.value.y : rect.top;

  const dragStartX = e.clientX;
  const dragStartY = e.clientY;
  let curX = currentLeft;
  let curY = currentTop;

  const onPointerMove = (ev: PointerEvent) => {
    if (!isDragging.value) return;
    const deltaX = ev.clientX - dragStartX;
    const deltaY = ev.clientY - dragStartY;

    const barW = barRef.value?.offsetWidth || barWidth.value;
    const barH = barRef.value?.offsetHeight || 32;

    const minX = 8;
    const maxX = Math.max(minX, window.innerWidth - barW - 8);
    const minY = 8;
    const maxY = Math.max(minY, window.innerHeight - barH - 8);

    curX = Math.min(maxX, Math.max(minX, currentLeft + deltaX));
    curY = Math.min(maxY, Math.max(minY, currentTop + deltaY));

    customPos.value = { x: curX, y: curY };
  };

  const onPointerUp = () => {
    isDragging.value = false;
    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("pointerup", onPointerUp);
    window.removeEventListener("pointercancel", onPointerUp);
    try {
      if (customPos.value) {
        localStorage.setItem("bili_hero_lyric_pos", JSON.stringify(customPos.value));
      }
    } catch {}
  };

  window.addEventListener("pointermove", onPointerMove);
  window.addEventListener("pointerup", onPointerUp);
  window.addEventListener("pointercancel", onPointerUp);
}

function handleDoubleClick() {
  // 双击还原到默认初始位置
  customPos.value = null;
  try {
    localStorage.removeItem("bili_hero_lyric_pos");
  } catch {}
}

const barStyle = computed(() => {
  const style: Record<string, string> = {};
  if (!isCollapsed.value) {
    style.width = `${barWidth.value}px`;
  }
  style.position = "fixed";
  style.zIndex = "1000";
  if (customPos.value) {
    style.left = `${customPos.value.x}px`;
    style.top = `${customPos.value.y}px`;
    style.margin = "0";
    style.transform = "none";
  } else {
    style.left = "50%";
    style.bottom = "24px";
    style.transform = "translateX(-50%)";
  }
  return style;
});

// 🌟 左右拉伸宽度逻辑 (Resize Bar Width)
let startX = 0;
let startWidth = 0;
let resizeDirection: "left" | "right" = "right";

function onResizeStart(direction: "left" | "right", e: PointerEvent) {
  e.preventDefault();
  e.stopPropagation();
  isResizing.value = true;
  resizeDirection = direction;
  startX = e.clientX;
  startWidth = barWidth.value;

  const onPointerMove = (moveEvt: PointerEvent) => {
    if (!isResizing.value) return;
    const deltaX = moveEvt.clientX - startX;
    // 右边手柄向右拉变宽，左边手柄向左拉变宽
    const newW = resizeDirection === "right" ? startWidth + deltaX : startWidth - deltaX;
    const clampW = Math.max(180, Math.min(720, newW));
    barWidth.value = clampW;
  };

  const onPointerUp = () => {
    isResizing.value = false;
    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("pointerup", onPointerUp);
    window.removeEventListener("pointercancel", onPointerUp);
    try {
      localStorage.setItem("bili_hero_lyric_width", String(barWidth.value));
    } catch {}
  };

  window.addEventListener("pointermove", onPointerMove);
  window.addEventListener("pointerup", onPointerUp);
  window.addEventListener("pointercancel", onPointerUp);
}

onMounted(() => {
  try {
    const saved = localStorage.getItem("bili_hero_lyric_width");
    if (saved) {
      const num = parseInt(saved, 10);
      if (Number.isFinite(num) && num >= 180 && num <= 720) {
        barWidth.value = num;
      }
    }
    const savedPos = localStorage.getItem("bili_hero_lyric_pos");
    if (savedPos) {
      const parsed = JSON.parse(savedPos);
      if (typeof parsed?.x === "number" && typeof parsed?.y === "number") {
        const clampX = Math.min(window.innerWidth - 100, Math.max(8, parsed.x));
        const clampY = Math.min(window.innerHeight - 40, Math.max(8, parsed.y));
        customPos.value = { x: clampX, y: clampY };
      }
    }
  } catch {}
});
</script>

<template>
  <aside
    v-if="isVisible"
    ref="barRef"
    class="bili-hero-lyric-bar"
    :class="{ 'is-collapsed': isCollapsed, 'is-resizing': isResizing, 'is-dragging': isDragging, 'is-floating': Boolean(customPos) }"
    :style="barStyle"
    :title="customPos ? '按住可拖动位置；双击还原到默认位置' : '按住可自由拖动位置'"
    aria-label="视频实时字幕与控制"
    @pointerdown="onPointerDown"
    @dblclick="handleDoubleClick"
  >
    <!-- 左边缘拉伸把手（静默隐形，悬停可用） -->
    <div
      v-if="!isCollapsed"
      class="lyric-resize-handle handle-left"
      title="按住向左拉伸宽度"
      @pointerdown="onResizeStart('left', $event)"
    ></div>

    <!-- 折叠小胶囊态 -->
    <div
      v-if="isCollapsed"
      class="hero-lyric-capsule"
      :title="`视频台词：${biliFavoritesState.organizer.heroLyricText || '暂无字幕'} (点击展开)`"
      @click="isCollapsed = false"
    >
      <span class="capsule-icon">💬</span>
      <span class="capsule-text">台词</span>
      <button
        type="button"
        class="capsule-expand-btn"
        title="展开台词栏"
        @click.stop="isCollapsed = false"
      >
        ↗
      </button>
    </div>

    <!-- 展开态主体：单层现代圆润流线胶囊 -->
    <div v-else class="hero-lyric-body">
      <button
        type="button"
        class="hero-lyric-seek-btn"
        title="当前视频后退 5 秒"
        aria-label="后退 5 秒"
        @click="handleHeroSeek(-5)"
      >
        ‹
      </button>
      <strong
        class="hero-lyric-current-text"
        :title="biliFavoritesState.organizer.heroLyricText || '点击视频播放，实时台词在此呈现'"
      >
        {{ biliFavoritesState.organizer.heroLyricText || '点击视频播放，实时台词在此呈现' }}
      </strong>
      <button
        type="button"
        class="hero-lyric-seek-btn"
        title="当前视频前进 5 秒"
        aria-label="前进 5 秒"
        @click="handleHeroSeek(5)"
      >
        ›
      </button>
      <span class="hero-lyric-divider"></span>
      <button
        type="button"
        class="hero-lyric-collapse-btn"
        title="收起台词栏"
        aria-label="收起台词栏"
        @click.stop="isCollapsed = true"
      >
        <svg viewBox="0 0 24 24" width="10" height="10" fill="currentColor">
          <path d="M19 13H5v-2h14v2z" />
        </svg>
      </button>
    </div>

    <!-- 右边缘拉伸把手（静默隐形，悬停可用） -->
    <div
      v-if="!isCollapsed"
      class="lyric-resize-handle handle-right"
      title="按住向右拉伸宽度"
      @pointerdown="onResizeStart('right', $event)"
    ></div>
  </aside>
</template>

<style scoped>
/* 紧贴在收藏夹 Header (收集箱) 右侧的现代单层胶囊卡片 */
.bili-hero-lyric-bar {
  position: relative;
  display: inline-flex;
  align-items: center;
  min-width: 180px;
  max-width: min(720px, calc(100vw - 360px));
  height: 32px;
  padding: 0 4px 0 6px;
  border-radius: 999px;
  background: var(--panel, #ffffff);
  border: 1px solid var(--border);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
  box-sizing: border-box;
  user-select: none;
  flex-shrink: 1;
  cursor: grab;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

.bili-hero-lyric-bar.is-dragging {
  cursor: grabbing !important;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18), 0 2px 8px rgba(0, 174, 236, 0.28) !important;
  border-color: #00aeec !important;
  user-select: none;
}

.bili-hero-lyric-bar.is-floating {
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.12);
}

.bili-hero-lyric-bar:hover,
.bili-hero-lyric-bar.is-resizing {
  border-color: var(--border-strong, #94a3b8);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
}

.hero-lyric-body {
  display: flex;
  align-items: center;
  gap: 4px;
  width: 100%;
  height: 100%;
  padding: 0;
  box-sizing: border-box;
  min-width: 0;
  overflow: hidden;
}

.hero-lyric-seek-btn {
  display: grid;
  place-items: center;
  width: 22px;
  height: 22px;
  flex: none;
  padding: 0;
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: var(--muted);
  cursor: pointer;
  font-size: 13px;
  line-height: 1;
  transition: all 0.15s ease;
}
.hero-lyric-seek-btn:hover {
  background: var(--surface-hover);
  color: #00aeec;
}

.hero-lyric-current-text {
  flex: 1;
  min-width: 0;
  font-size: 12px;
  font-weight: 600;
  line-height: 1.3;
  color: var(--heading);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
  padding: 0 4px;
}

.hero-lyric-divider {
  width: 1px;
  height: 12px;
  background: var(--border);
  flex: none;
  margin: 0 1px;
  opacity: 0.8;
}

/* 收起按钮 */
.hero-lyric-collapse-btn {
  width: 22px;
  height: 22px;
  border-radius: 999px;
  border: 0;
  background: transparent;
  color: var(--muted);
  font-size: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
  transition: all 0.15s ease;
  line-height: 1;
  padding: 0;
}
.hero-lyric-collapse-btn:hover {
  background: var(--surface-hover);
  color: #00aeec;
}

/* 左右拉伸把手：平时隐形，hover 或拖拽时柔和微显 */
.lyric-resize-handle {
  position: absolute;
  top: 4px;
  bottom: 4px;
  width: 8px;
  cursor: col-resize;
  z-index: 5;
  border-radius: 4px;
  transition: background 0.15s ease;
}
.lyric-resize-handle:hover,
.bili-hero-lyric-bar.is-resizing .lyric-resize-handle {
  background: rgba(0, 174, 236, 0.25);
}
.handle-left {
  left: 0;
}
.handle-right {
  right: 0;
}

/* 折叠小胶囊 */
.bili-hero-lyric-bar.is-collapsed {
  width: auto !important;
  min-width: 76px;
  max-width: 110px;
  height: 28px;
  border-radius: 999px;
  cursor: pointer;
}
.hero-lyric-capsule {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 0 6px;
  height: 100%;
  box-sizing: border-box;
}
.capsule-icon {
  font-size: 11px;
  flex-shrink: 0;
}
.capsule-text {
  font-size: 11px;
  font-weight: 700;
  color: var(--heading);
  white-space: nowrap;
}
.capsule-expand-btn {
  width: 16px;
  height: 16px;
  border-radius: 4px;
  border: 0;
  background: transparent;
  color: var(--dim);
  font-size: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
  padding: 0;
}
.capsule-expand-btn:hover {
  color: #00aeec;
}
</style>
