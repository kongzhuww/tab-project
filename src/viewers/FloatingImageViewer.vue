<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from "vue";
import { imageViewerState as state, imageViewerController as controller } from "./image-viewer-store";

const windowRef = ref<HTMLElement | null>(null);
const pos = ref<{ x: number; y: number }>({ x: 100, y: 100 });
const winSize = ref<{ width: number; height: number }>({ width: 400, height: 260 });

// 窗口顶栏拖拽平移整窗
let isWindowDragging = false;
let startMouseX = 0;
let startMouseY = 0;
let startPosX = 0;
let startPosY = 0;

// 照片画布平移 (Pan) 状态
const panX = ref(0);
const panY = ref(0);
const isPanning = ref(false);

let photoDragStartX = 0;
let photoDragStartY = 0;
let photoInitialPanX = 0;
let photoInitialPanY = 0;

// 自适应图片真实尺寸：图片多大就多大，完全紧凑包裹，告别多余黑边
function adaptWindowToImage(nw: number, nh: number) {
  if (!nw || !nh) return;
  const winW = typeof window !== "undefined" ? window.innerWidth : 1920;
  const winH = typeof window !== "undefined" ? window.innerHeight : 1080;
  const HEADER_H = 40;
  const MIN_W = 340; // 容纳标题和操作按钮的紧凑宽度
  const MAX_W = Math.max(MIN_W, winW - 80);
  const MAX_H = Math.max(160, winH - 80);

  let targetW = nw;
  let targetH = nh;

  // 如果原图超出屏幕允许的最大尺寸，等比缩减适应屏幕
  const maxContentH = MAX_H - HEADER_H;
  if (targetW > MAX_W || targetH > maxContentH) {
    const scale = Math.min(MAX_W / targetW, maxContentH / targetH);
    targetW = Math.round(targetW * scale);
    targetH = Math.round(targetH * scale);
  }

  // 最终窗口宽高：完全契合图片尺寸
  const finalW = Math.max(MIN_W, targetW);
  const finalH = targetH + HEADER_H;

  winSize.value = {
    width: finalW,
    height: finalH
  };

  pos.value = {
    x: Math.max(16, Math.round((winW - finalW) / 2)),
    y: Math.max(24, Math.round((winH - finalH) / 2))
  };

  resetPanAndZoom();
}

watch(
  () => state.isOpen,
  (open) => {
    if (open) {
      resetPanAndZoom();
      // 如果已有尺寸直接计算，否则等待图片加载事件
      if (state.naturalWidth && state.naturalHeight) {
        adaptWindowToImage(state.naturalWidth, state.naturalHeight);
      }
    }
  }
);

// 顶栏拖拽：移动整个窗口位置
function onHeaderPointerDown(e: PointerEvent) {
  if ((e.target as HTMLElement).closest("button, a, input")) return;
  const header = e.currentTarget as HTMLElement;
  try {
    header.setPointerCapture(e.pointerId);
  } catch (_) {}
  isWindowDragging = true;
  startMouseX = e.clientX;
  startMouseY = e.clientY;
  startPosX = pos.value.x;
  startPosY = pos.value.y;
}

function onHeaderPointerMove(e: PointerEvent) {
  if (!isWindowDragging) return;
  const dx = e.clientX - startMouseX;
  const dy = e.clientY - startMouseY;
  pos.value = {
    x: Math.max(10, Math.min(window.innerWidth - 80, startPosX + dx)),
    y: Math.max(10, Math.min(window.innerHeight - 60, startPosY + dy))
  };
}

function onHeaderPointerUp(e: PointerEvent) {
  if (!isWindowDragging) return;
  isWindowDragging = false;
  try {
    (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
  } catch (_) {}
}

// 画面内按住拖动照片平移
function onViewportPointerDown(e: PointerEvent) {
  if ((e.target as HTMLElement).closest("button, a")) return;
  if (e.button !== 0) return;
  const vp = e.currentTarget as HTMLElement;
  try {
    vp.setPointerCapture(e.pointerId);
  } catch (_) {}
  isPanning.value = true;
  photoDragStartX = e.clientX;
  photoDragStartY = e.clientY;
  photoInitialPanX = panX.value;
  photoInitialPanY = panY.value;
}

function onViewportPointerMove(e: PointerEvent) {
  if (!isPanning.value) return;
  const dx = e.clientX - photoDragStartX;
  const dy = e.clientY - photoDragStartY;
  panX.value = photoInitialPanX + dx;
  panY.value = photoInitialPanY + dy;
}

function onViewportPointerUp(e: PointerEvent) {
  if (!isPanning.value) return;
  isPanning.value = false;
  try {
    (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
  } catch (_) {}
}

function resetPanAndZoom() {
  controller.resetZoom();
  panX.value = 0;
  panY.value = 0;
  isPanning.value = false;
}

const imageTransformStyle = computed(() => {
  return {
    transform: `translate3d(${panX.value}px, ${panY.value}px, 0px) scale(${state.zoom})`,
    transition: isPanning.value ? "none" : "transform 0.18s cubic-bezier(0.16, 1, 0.3, 1)"
  };
});

function handleImageLoad(e: Event) {
  const img = e.target as HTMLImageElement;
  if (!state.isOpen || img.getAttribute("src") !== state.src) return;
  const nw = img.naturalWidth || 400;
  const nh = img.naturalHeight || 300;
  controller.setDimensions(nw, nh);
  adaptWindowToImage(nw, nh);
}

function onWheel(e: WheelEvent) {
  e.preventDefault();
  const delta = e.deltaY < 0 ? 0.15 : -0.15;
  controller.setZoom(state.zoom + delta);
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === "Escape" && state.isOpen) {
    controller.close();
  }
}

onMounted(() => {
  window.addEventListener("keydown", handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeydown);
  controller.close();
});
</script>

<template>
  <Teleport to="body">
    <div v-if="state.isOpen" class="floating-img-overlay">
      <div
        ref="windowRef"
        class="floating-img-window"
        :style="{
          position: 'fixed',
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          width: `${winSize.width}px`,
          height: `${winSize.height}px`,
          margin: '0'
        }"
        role="dialog"
        aria-modal="false"
      >
        <!-- 紧凑悬浮标题栏 -->
        <header
          class="floating-img-header"
          @pointerdown="onHeaderPointerDown"
          @pointermove="onHeaderPointerMove"
          @pointerup="onHeaderPointerUp"
          @pointercancel="onHeaderPointerUp"
        >
          <div class="floating-img-title">
            <span class="floating-img-icon">🖼️</span>
            <span class="floating-img-name" :title="state.alt">{{ state.alt }}</span>
            <span v-if="state.naturalWidth" class="floating-img-dimen">
              {{ state.naturalWidth }} × {{ state.naturalHeight }}
            </span>
          </div>
          <div class="floating-img-actions">
            <!-- 缩放控制 -->
            <button type="button" class="floating-tool-btn" title="放大 (+)" @click="controller.zoomIn">+</button>
            <span class="floating-zoom-tag">{{ Math.round(state.zoom * 100) }}%</span>
            <button type="button" class="floating-tool-btn" title="缩小 (-)" @click="controller.zoomOut">-</button>
            <button type="button" class="floating-tool-btn reset" title="还原 1:1" @click="controller.resetZoom">1:1</button>
            <button type="button" class="floating-tool-btn reset" title="居中复位 (双击画面)" @click="resetPanAndZoom">🔄</button>

            <div class="floating-divider"></div>

            <button type="button" class="floating-action-btn" title="复制图片到剪贴板" @click="controller.copyImage">
              📋
            </button>
            <button type="button" class="floating-close-btn" title="关闭 (Esc)" @click="controller.close">
              ✕
            </button>
          </div>
        </header>

        <!-- 自适应视口：图片多大就多大，紧贴图片，告别多余黑色空旷区域 -->
        <div
          class="floating-img-viewport"
          :class="{ 'is-grabbing': isPanning }"
          @wheel="onWheel"
          @dblclick="resetPanAndZoom"
          @pointerdown="onViewportPointerDown"
          @pointermove="onViewportPointerMove"
          @pointerup="onViewportPointerUp"
          @pointercancel="onViewportPointerUp"
        >
          <div class="floating-img-canvas">
            <img
              :key="state.src"
              :src="state.src"
              :alt="state.alt"
              class="floating-render-img"
              :style="imageTransformStyle"
              @load="handleImageLoad"
            />
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
/* 全局透明零遮挡：背景不加全屏黑罩，不影响操作后方网页 */
.floating-img-overlay {
  position: fixed;
  inset: 0;
  z-index: 100000;
  background: transparent !important;
  pointer-events: none;
}

/* 浮动图片自适应小窗：尺寸紧跟图片，圆角精美，无多余空旷区域 */
.floating-img-window {
  pointer-events: auto;
  position: fixed;
  background: var(--panel, #ffffff);
  border-radius: 10px;
  border: 1px solid var(--border-strong, rgba(0, 0, 0, 0.15));
  box-shadow: 0 18px 48px -8px rgba(0, 0, 0, 0.32), 0 0 0 1px var(--border, rgba(0, 0, 0, 0.08));
  display: flex;
  flex-direction: column;
  overflow: hidden;
  user-select: none;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
  color: var(--heading, #1e293b);
  animation: viewer-pop 0.18s cubic-bezier(0.16, 1, 0.3, 1);
  transition: width 0.18s cubic-bezier(0.16, 1, 0.3, 1), height 0.18s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes viewer-pop {
  from {
    opacity: 0;
    transform: scale(0.96);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

:root[data-theme="lonetrail"] .floating-img-window {
  background: rgba(246, 243, 238, 0.98);
  border-color: rgba(138, 126, 114, 0.3);
  color: #2b231d;
  box-shadow: 0 18px 48px rgba(78, 62, 46, 0.22);
}

/* 顶部紧凑标题栏 */
.floating-img-header {
  height: 40px;
  padding: 0 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--panel-hover, rgba(0, 0, 0, 0.03));
  border-bottom: 1px solid var(--border, rgba(0, 0, 0, 0.08));
  cursor: grab;
  user-select: none;
  flex-shrink: 0;
  z-index: 5;
}

.floating-img-header:active {
  cursor: grabbing;
}

:root[data-theme="lonetrail"] .floating-img-header {
  background: rgba(238, 233, 226, 0.9);
  border-bottom-color: rgba(138, 126, 114, 0.2);
}

.floating-img-title {
  display: flex;
  align-items: center;
  gap: 6px;
  min-width: 0;
  flex: 1;
}

.floating-img-icon {
  font-size: 14px;
}

.floating-img-name {
  font-size: 12px;
  font-weight: 600;
  color: var(--heading, #1e293b);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 140px;
}

:root[data-theme="lonetrail"] .floating-img-name {
  color: #2b231d;
}

.floating-img-dimen {
  font-size: 10px;
  color: var(--muted, #64748b);
  background: var(--panel, rgba(0, 0, 0, 0.04));
  padding: 1px 5px;
  border-radius: 3px;
  white-space: nowrap;
}

.floating-img-actions {
  display: flex;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
}

.floating-tool-btn {
  height: 22px;
  min-width: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--border, rgba(0, 0, 0, 0.1));
  background: var(--panel, #ffffff);
  color: var(--text, #334155);
  border-radius: 4px;
  font-size: 11px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.15s ease;
}

.floating-tool-btn:hover {
  background: var(--panel-hover, rgba(0, 0, 0, 0.06));
}

.floating-tool-btn.reset {
  padding: 0 5px;
  font-size: 10px;
}

.floating-zoom-tag {
  font-size: 10px;
  font-weight: 600;
  color: var(--muted, #64748b);
  min-width: 32px;
  text-align: center;
}

.floating-divider {
  width: 1px;
  height: 12px;
  background: var(--border, rgba(0, 0, 0, 0.12));
  margin: 0 2px;
}

.floating-action-btn {
  height: 22px;
  padding: 0 6px;
  border: 1px solid var(--border, rgba(0, 0, 0, 0.1));
  border-radius: 4px;
  background: var(--panel, #ffffff);
  color: var(--text, #334155);
  font-size: 11px;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.15s ease;
}

.floating-action-btn:hover {
  background: var(--panel-hover, rgba(0, 0, 0, 0.06));
}

.floating-close-btn {
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  color: var(--muted, #64748b);
  font-size: 13px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.15s ease;
}

.floating-close-btn:hover {
  background: rgba(239, 68, 68, 0.15);
  color: #dc2626;
}

/* 视口：紧密贴合图片尺寸，背景与窗口一致，彻底消灭黑色大平原 */
.floating-img-viewport {
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: var(--panel, #ffffff);
  cursor: grab;
}

.floating-img-viewport.is-grabbing,
.floating-img-viewport:active {
  cursor: grabbing;
}

:root[data-theme="lonetrail"] .floating-img-viewport {
  background: rgba(246, 243, 238, 0.98);
}

.floating-img-canvas {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}

.floating-render-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  transform-origin: center center;
  will-change: transform;
  user-select: none;
  -webkit-user-drag: none;
  pointer-events: auto;
}
</style>
