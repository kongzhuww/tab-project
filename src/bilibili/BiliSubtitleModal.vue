<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { subtitleModalState as state, subtitleModalController as controller } from "./subtitle-modal-store";

const windowRef = ref<HTMLElement | null>(null);
const pos = ref<{ x: number; y: number } | null>(null);
let isDragging = false;
let startMouseX = 0;
let startMouseY = 0;
let startPosX = 0;
let startPosY = 0;

function onHeaderMouseDown(e: MouseEvent) {
  if ((e.target as HTMLElement).closest("button, a, input")) return;
  isDragging = true;
  const win = windowRef.value;
  if (!win) return;
  const rect = win.getBoundingClientRect();
  startPosX = rect.left;
  startPosY = rect.top;
  startMouseX = e.clientX;
  startMouseY = e.clientY;
  pos.value = { x: startPosX, y: startPosY };

  const onMouseMove = (ev: MouseEvent) => {
    if (!isDragging) return;
    const dx = ev.clientX - startMouseX;
    const dy = ev.clientY - startMouseY;
    pos.value = {
      x: Math.max(10, Math.min(window.innerWidth - 100, startPosX + dx)),
      y: Math.max(10, Math.min(window.innerHeight - 80, startPosY + dy))
    };
  };

  const onMouseUp = () => {
    isDragging = false;
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseup", onMouseUp);
  };

  window.addEventListener("mousemove", onMouseMove);
  window.addEventListener("mouseup", onMouseUp);
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === "Escape" && state.isOpen) {
    controller.close();
  }
}

function handleGlobalPointerDown(e: PointerEvent) {
  if (!state.isOpen || !windowRef.value) return;
  if (!windowRef.value.contains(e.target as Node)) {
    const targetEl = e.target as HTMLElement | null;
    if (targetEl?.closest(".bili-mini-sub-btn, .fo-card-menu, #bili-subtitle-modal-root")) return;
    controller.close();
  }
}

onMounted(() => {
  window.addEventListener("keydown", handleKeydown);
  window.addEventListener("pointerdown", handleGlobalPointerDown, true);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeydown);
  window.removeEventListener("pointerdown", handleGlobalPointerDown, true);
});
</script>

<template>
  <Teleport to="body">
    <div v-if="state.isOpen" class="bili-sub-modal-overlay">
      <!-- 🌟 纯正实体「白底黑字」小巧精致独立视窗 (400px)，支持拖拽，周围毫无遮蔽 -->
      <div
        ref="windowRef"
        class="bili-sub-modal-window"
        :style="pos ? { position: 'fixed', left: `${pos.x}px`, top: `${pos.y}px`, margin: '0' } : {}"
        role="dialog"
        aria-modal="false"
      >
        <header class="bili-sub-modal-header" @mousedown="onHeaderMouseDown">
          <div class="bili-sub-modal-title">
            <span class="bili-sub-title-text" :title="state.title">{{ state.title }} · 完整字幕 TXT</span>
            <span v-if="state.charCount" class="bili-sub-count">({{ state.charCount }} 字)</span>
          </div>
          <div class="bili-sub-modal-actions">
            <button
              v-if="state.fullText"
              type="button"
              class="bili-sub-action-btn"
              title="复制全部字幕纯文本"
              @click="controller.copy"
            >
              {{ state.copied ? "✓ 已复制" : "📋 复制全部" }}
            </button>
            <button
              v-if="state.fullText"
              type="button"
              class="bili-sub-action-btn"
              title="下载为 .txt 纯文本文件"
              @click="controller.downloadTxt"
            >
              💾 下载 TXT
            </button>
            <button
              type="button"
              class="bili-sub-close-btn"
              title="关闭字幕视窗 (Esc)"
              @click="controller.close"
            >
              ✕
            </button>
          </div>
        </header>

        <div class="bili-sub-modal-body">
          <div v-if="state.loading" class="bili-sub-loading">
            <div class="bili-sub-spinner"></div>
            <span>正在提取并解析完整字幕流…</span>
          </div>
          <div v-else-if="state.error" class="bili-sub-error">
            <span style="font-size: 24px;">⚠️</span>
            <p>{{ state.error }}</p>
          </div>
          <textarea
            v-else
            readonly
            class="bili-sub-textarea"
            :value="state.fullText"
            placeholder="暂无字幕内容"
          ></textarea>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
/* 独立纯文本字幕浮窗：桌面级轻量视窗，完全透明穿透，绝不遮蔽旁边内容，支持自由拖拽 */
.bili-sub-modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 100000;
  background: transparent !important;
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  box-sizing: border-box;
}

/* 🌟 100% 实体纯正「白底黑字」卡片：白纸黑字、极度清晰、彻底不透字、绝不黑底 */
.bili-sub-modal-window {
  pointer-events: auto;
  width: min(400px, 92vw);
  height: min(490px, 75vh);
  background-color: #ffffff !important;
  border: 1px solid rgba(0, 0, 0, 0.15) !important;
  border-radius: 12px;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.22), 0 0 0 1px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  color: #111827 !important;
  contain: paint;
  will-change: transform;
}

/* 顶栏：浅灰白清爽底座，纯黑标题，整行不可复制 */
.bili-sub-modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  background-color: #f8fafc !important;
  border-bottom: 1px solid #e2e8f0 !important;
  gap: 6px;
  flex-shrink: 0;
  cursor: grab;
  user-select: none !important;
  -webkit-user-select: none !important;
  color: #0f172a !important;
}

.bili-sub-modal-header:active {
  cursor: grabbing;
}

.bili-sub-modal-title {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  font-weight: 600;
  min-width: 0;
  overflow: hidden;
  user-select: none !important;
  -webkit-user-select: none !important;
  color: #0f172a !important;
}

.bili-sub-title-text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #0f172a !important;
}

.bili-sub-count {
  font-size: 11px;
  color: #64748b !important;
  flex-shrink: 0;
}

.bili-sub-modal-actions {
  display: flex;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
  user-select: none !important;
  -webkit-user-select: none !important;
}

.bili-sub-action-btn {
  padding: 3px 7px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
  border: 1px solid #cbd5e1 !important;
  background-color: #ffffff !important;
  color: #1e293b !important;
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s, color 0.15s;
  user-select: none !important;
  -webkit-user-select: none !important;
}

.bili-sub-action-btn:hover {
  background-color: #f1f5f9 !important;
  border-color: #0284c7 !important;
  color: #0284c7 !important;
}

.bili-sub-close-btn {
  width: 22px;
  height: 22px;
  border-radius: 4px;
  border: 0;
  background: transparent;
  color: #64748b !important;
  font-size: 13px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none !important;
  -webkit-user-select: none !important;
}

.bili-sub-close-btn:hover {
  background-color: #fee2e2 !important;
  color: #ef4444 !important;
}

.bili-sub-modal-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 10px;
  overflow: hidden;
  background-color: #ffffff !important;
}

/* 🌟 正文文案区：纯正白底黑字、100% 实体绝不透光、极度清晰舒适 */
.bili-sub-textarea {
  flex: 1;
  width: 100%;
  box-sizing: border-box;
  background-color: #ffffff !important;
  color: #0f172a !important;
  border: 1px solid #cbd5e1 !important;
  border-radius: 8px;
  padding: 10px 12px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "PingFang SC", "Microsoft YaHei", sans-serif;
  font-size: 13px;
  line-height: 1.8;
  resize: none;
  outline: none;
  overflow-y: auto;
  user-select: text !important;
  -webkit-user-select: text !important;
}

.bili-sub-textarea:focus {
  border-color: #0284c7 !important;
  box-shadow: 0 0 0 2px rgba(2, 132, 199, 0.15) !important;
}

/* 适配莱茵生命等浅色主题：实体米白温暖底座 + 实体纯白文案框 + 纯黑清晰字，同样 100% 实体白底黑字！ */
:global(html[data-theme="lonetrail"]) .bili-sub-modal-window {
  background-color: #fcfaf7 !important;
  border-color: rgba(38, 34, 26, 0.28) !important;
  color: #18181b !important;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.25) !important;
}
:global(html[data-theme="lonetrail"]) .bili-sub-modal-header {
  background-color: #f4efe4 !important;
  border-bottom-color: rgba(38, 34, 26, 0.2) !important;
  color: #18181b !important;
}
:global(html[data-theme="lonetrail"]) .bili-sub-modal-body {
  background-color: #fcfaf7 !important;
}
:global(html[data-theme="lonetrail"]) .bili-sub-textarea {
  background-color: #ffffff !important;
  color: #111827 !important;
  border-color: rgba(38, 34, 26, 0.22) !important;
}
:global(html[data-theme="lonetrail"]) .bili-sub-action-btn {
  background-color: #f4efe4 !important;
  color: #27272a !important;
  border-color: rgba(38, 34, 26, 0.25) !important;
}
:global(html[data-theme="lonetrail"]) .bili-sub-action-btn:hover {
  background-color: rgba(201, 153, 63, 0.25) !important;
  border-color: #c9993f !important;
  color: #78520d !important;
}

.bili-sub-loading,
.bili-sub-error {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  color: #475569 !important;
  font-size: 12px;
  text-align: center;
}

.bili-sub-spinner {
  width: 24px;
  height: 24px;
  border: 2px solid rgba(56, 189, 248, 0.2);
  border-top-color: #38bdf8;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
