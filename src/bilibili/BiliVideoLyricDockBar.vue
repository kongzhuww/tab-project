<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { biliFavoritesState } from "./bili-favorites-store";

const props = withDefaults(defineProps<{
  inlineHero?: boolean;
}>(), {
  inlineHero: false,
});

const barWidth = ref<number>(340);
const isResizing = ref(false);
const isCollapsed = ref(false);
const barRef = ref<HTMLElement | null>(null);

function handleHeroSeek(deltaSeconds: number) {
  const video = document.querySelector(".bili-mini-screen video, .bili-sub-screen video") as HTMLVideoElement | null;
  if (video) {
    video.currentTime = Math.max(0, video.currentTime + deltaSeconds);
  }
}

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
  } catch {}
});
</script>

<template>
  <aside
    ref="barRef"
    class="bili-hero-lyric-bar"
    :class="{ 'is-collapsed': isCollapsed, 'is-resizing': isResizing }"
    :style="!isCollapsed ? { width: `${barWidth}px` } : undefined"
    aria-label="视频实时字幕与控制"
  >
    <!-- 左边缘拉伸把手 -->
    <div
      v-if="!isCollapsed"
      class="lyric-resize-handle handle-left"
      title="按住向左拉伸宽度"
      @pointerdown="onResizeStart('left', $event)"
    >
      <span class="resize-line"></span>
    </div>

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

    <!-- 展开态主体：图 1 收集箱右侧标准字幕盒 -->
    <div v-else class="hero-lyric-body">
      <div class="hero-lyric-stage">
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
      </div>

      <!-- 收起按钮 -->
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

    <!-- 右边缘拉伸把手 -->
    <div
      v-if="!isCollapsed"
      class="lyric-resize-handle handle-right"
      title="按住向右拉伸宽度"
      @pointerdown="onResizeStart('right', $event)"
    >
      <span class="resize-line"></span>
    </div>
  </aside>
</template>

<style scoped>
/* 紧贴在收藏夹 Header (收集箱) 右侧的现代胶囊卡片 */
.bili-hero-lyric-bar {
  position: relative;
  display: inline-flex;
  align-items: center;
  min-width: 180px;
  max-width: min(720px, calc(100vw - 360px));
  height: 44px;
  padding: 0 4px;
  border-radius: 10px;
  background: var(--surface, #ffffff);
  border: 1px solid var(--border);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  box-sizing: border-box;
  user-select: none;
  flex-shrink: 1;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

.bili-hero-lyric-bar:hover,
.bili-hero-lyric-bar.is-resizing {
  border-color: var(--border-strong, #94a3b8);
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
}

.hero-lyric-body {
  display: flex;
  align-items: center;
  gap: 6px;
  width: 100%;
  height: 100%;
  padding: 0 4px;
  box-sizing: border-box;
  min-width: 0;
  overflow: hidden;
}

/* 核心台词舞台 (图 1 风格：带浅边框背景胶囊) */
.hero-lyric-stage {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  min-width: 0;
  height: 32px;
  padding: 0 6px;
  border-radius: 8px;
  background: var(--panel, #ffffff);
  border: 1px solid var(--border);
  box-sizing: border-box;
  overflow: hidden;
}

.hero-lyric-seek-btn {
  display: grid;
  place-items: center;
  width: 20px;
  height: 20px;
  flex: none;
  padding: 0;
  border: 1px solid var(--border);
  border-radius: 5px;
  background: var(--surface, #ffffff);
  color: var(--muted);
  cursor: pointer;
  font-size: 13px;
  line-height: 1;
  transition: all 0.15s ease;
}
.hero-lyric-seek-btn:hover {
  border-color: #00aeec;
  background: var(--surface-hover);
  color: #00aeec;
}

.hero-lyric-current-text {
  flex: 1;
  min-width: 0;
  font-size: 12.5px;
  font-weight: 600;
  line-height: 1.35;
  color: var(--heading);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
}

/* 收起按钮 */
.hero-lyric-collapse-btn {
  width: 22px;
  height: 22px;
  border-radius: 6px;
  border: 1px solid var(--border);
  background: var(--panel, #ffffff);
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
  border-color: #00aeec;
}

/* 左右拉伸把手 (Resize Handles) */
.lyric-resize-handle {
  position: absolute;
  top: 6px;
  bottom: 6px;
  width: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: col-resize;
  z-index: 4;
  opacity: 0.35;
  transition: opacity 0.15s ease;
}
.lyric-resize-handle:hover,
.bili-hero-lyric-bar.is-resizing .lyric-resize-handle {
  opacity: 1;
}
.handle-left {
  left: 0;
}
.handle-right {
  right: 0;
}
.resize-line {
  width: 2px;
  height: 16px;
  border-radius: 1px;
  background: var(--border-strong, #94a3b8);
}
.lyric-resize-handle:hover .resize-line {
  background: #00aeec;
}

/* 折叠小胶囊 */
.bili-hero-lyric-bar.is-collapsed {
  width: auto !important;
  min-width: 80px;
  max-width: 120px;
  border-radius: 999px;
  cursor: pointer;
}
.hero-lyric-capsule {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 0 8px;
  height: 100%;
  box-sizing: border-box;
}
.capsule-icon {
  font-size: 12px;
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
