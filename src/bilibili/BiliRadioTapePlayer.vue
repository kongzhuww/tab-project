<script setup lang="ts">
import { onMounted, onUnmounted, ref, computed } from "vue";
import { radioTapeState, radioTapeController } from "./radio-tape-store";
import { biliFavoritesState } from "./bili-favorites-store";
import { biliRadioController } from "./radio-store";

const props = withDefaults(defineProps<{
  dockSide?: boolean;
}>(), {
  dockSide: false,
});

// Pre-computed heights for 40 waveform bars
const waveformHeights = [
  3, 4, 3, 5, 4, 6, 8, 12, 16, 20, 22, 18, 14, 10, 8, 9, 13, 17, 21, 23, 19, 15,
  11, 9, 8, 12, 16, 20, 22, 17, 13, 9, 7, 6, 8, 11, 9, 6, 5, 4
];

const isDragging = ref(false);
const progressLineRef = ref<HTMLElement | null>(null);

const isDragOver = ref(false);
const isInserting = ref(false);
const insertedTitle = ref("");
const isCollapsed = ref(false);
const isSeriesPickerOpen = ref(false);

function toggleSeriesPicker(e: Event) {
  e.stopPropagation();
  isSeriesPickerOpen.value = !isSeriesPickerOpen.value;
  if (isSeriesPickerOpen.value) {
    void biliRadioController.init();
  }
}

async function selectAndPlaySeries(id: string) {
  isSeriesPickerOpen.value = false;
  await biliRadioController.playSeries(id, 0);
}

function onGlobalPointerDown(e: PointerEvent) {
  if (!isSeriesPickerOpen.value) return;
  const target = e.target as HTMLElement | null;
  if (!target?.closest(".tape-series-popover") && !target?.closest(".tape-cassette-wrap")) {
    isSeriesPickerOpen.value = false;
  }
}

function onGlobalKeyDown(e: KeyboardEvent) {
  if (e.key === "Escape" && isSeriesPickerOpen.value) {
    isSeriesPickerOpen.value = false;
  }
}

const modeTooltip = computed(() => {
  if (radioTapeState.mode === "one") return "单曲循环";
  if (radioTapeState.mode === "shuffle") return "乱序播放";
  return "顺序播放";
});

// 🌟 动态测量 Dock 真实边界：确保磁带机自适应铺展到右侧，但绝对不遮挡 Dock！
const safeMaxWidth = ref<number>(380);

function measureDock() {
  if (typeof document === "undefined" || !props.dockSide) return;
  const dock = document.querySelector(".mac-dock-shelf") || document.querySelector("#mac-dock") || document.querySelector(".mac-dock");
  const leftPadding = 20;
  const safeGap = 16; // 距 Dock 保留 16px 呼吸间距

  if (dock) {
    const dockRect = dock.getBoundingClientRect();
    if (dockRect.left > 80) {
      const available = Math.floor(dockRect.left - leftPadding - safeGap);
      if (available > 220) {
        safeMaxWidth.value = available;
        return;
      }
    }
  }

  const winW = typeof window !== "undefined" ? window.innerWidth : 1280;
  safeMaxWidth.value = Math.max(220, Math.floor(winW / 2 - 230));
}

let resizeTimer: any = null;
function onWindowResize() {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(measureDock, 60);
}

onMounted(() => {
  void biliRadioController.init();
  if (typeof window !== "undefined") {
    window.addEventListener("pointerdown", onGlobalPointerDown);
    window.addEventListener("keydown", onGlobalKeyDown);
  }
  if (props.dockSide) {
    measureDock();
    window.addEventListener("resize", onWindowResize);
    const dock = document.querySelector(".mac-dock-shelf") || document.querySelector("#mac-dock") || document.querySelector(".mac-dock");
    if (dock && typeof ResizeObserver !== "undefined") {
      const ro = new ResizeObserver(() => measureDock());
      ro.observe(dock);
      (dock as any).__bili_dock_ro = ro;
    }
  }
});

onUnmounted(() => {
  if (typeof window !== "undefined") {
    window.removeEventListener("pointerdown", onGlobalPointerDown);
    window.removeEventListener("keydown", onGlobalKeyDown);
    window.removeEventListener("resize", onWindowResize);
  }
  const dock = document.querySelector(".mac-dock-shelf") || document.querySelector("#mac-dock") || document.querySelector(".mac-dock");
  if (dock && (dock as any).__bili_dock_ro) {
    (dock as any).__bili_dock_ro.disconnect();
    delete (dock as any).__bili_dock_ro;
  }
});

function handleDragEnter(e: DragEvent) {
  e.preventDefault();
  isDragOver.value = true;
}

function handleDragOver(e: DragEvent) {
  e.preventDefault();
  if (e.dataTransfer) {
    e.dataTransfer.dropEffect = "copy";
  }
  isDragOver.value = true;
}

function handleDragLeave(e: DragEvent) {
  const currentTarget = e.currentTarget as HTMLElement;
  const relatedTarget = e.relatedTarget as HTMLElement | null;
  if (!relatedTarget || !currentTarget.contains(relatedTarget)) {
    isDragOver.value = false;
  }
}

function handleDrop(e: DragEvent) {
  e.preventDefault();
  isDragOver.value = false;

  const dataTransfer = e.dataTransfer;
  if (!dataTransfer) return;

  let rawPayload =
    dataTransfer.getData("application/x-bili-cassette") ||
    dataTransfer.getData("application/json");
  let videoData: any = null;

  if (rawPayload) {
    try {
      videoData = JSON.parse(rawPayload);
    } catch (_) {}
  }

  // 兜底：从 URL 或纯文本中提取 BV 号
  if (!videoData?.bvid) {
    const text =
      dataTransfer.getData("text/plain") ||
      dataTransfer.getData("text/uri-list") ||
      dataTransfer.getData("application/x-logicweaver-video-url");
    const bvMatch = text?.match(/BV[0-9a-zA-Z]+/);
    if (bvMatch) {
      videoData = {
        bvid: bvMatch[0],
        title: "放入的单曲卡带",
        cover: "",
        author: "Bilibili",
        duration: 0
      };
    }
  }

  if (videoData?.bvid) {
    isInserting.value = true;
    insertedTitle.value = videoData.title || videoData.bvid;

    setTimeout(() => {
      radioTapeController.insertAndPlay(videoData);
    }, 280);

    setTimeout(() => {
      isInserting.value = false;
    }, 1500);
  }
}

function handlePointerDown(e: PointerEvent) {
  if (!progressLineRef.value) return;
  isDragging.value = true;
  try {
    (e.currentTarget as HTMLElement)?.setPointerCapture?.(e.pointerId);
  } catch {}
  updateSeekFromPointer(e);
}

function handlePointerMove(e: PointerEvent) {
  if (!isDragging.value) return;
  updateSeekFromPointer(e);
}

function handlePointerUp(e: PointerEvent) {
  if (isDragging.value) {
    updateSeekFromPointer(e);
    isDragging.value = false;
    try {
      (e.currentTarget as HTMLElement)?.releasePointerCapture?.(e.pointerId);
    } catch {}
  }
}

function updateSeekFromPointer(e: PointerEvent) {
  if (!progressLineRef.value) return;
  const rect = progressLineRef.value.getBoundingClientRect();
  if (rect.width <= 0) return;
  const clickX = e.clientX - rect.left;
  const percent = Math.max(0, Math.min(100, (clickX / rect.width) * 100));
  radioTapeController.seek(percent);
}
</script>

<template>
  <div
    class="bili-tape-deck"
    :class="{
      'is-playing': radioTapeState.playing,
      'is-drag-over': isDragOver,
      'is-inserting': isInserting,
      'dock-side-mode': props.dockSide,
      'dock-side-collapsed': props.dockSide && isCollapsed
    }"
    :style="props.dockSide && !isCollapsed ? { maxWidth: `${safeMaxWidth}px` } : undefined"
    @dragenter="handleDragEnter"
    @dragover="handleDragOver"
    @dragleave="handleDragLeave"
    @drop="handleDrop"
  >
    <!-- 极简折叠胶囊态展示 (Collapsed Capsule) -->
    <div
      v-if="props.dockSide && isCollapsed"
      class="tape-collapsed-capsule"
      :title="`电台：${radioTapeState.title || '哔哩哔哩电台'}`"
    >
      <div class="tape-capsule-spool" :class="{ spinning: radioTapeState.playing }">
        <div class="spool-center-dot"></div>
      </div>
      <div class="tape-capsule-text">
        <strong class="capsule-title">{{ radioTapeState.title || 'B站电台' }}</strong>
        <small class="capsule-sub">{{ radioTapeState.playing ? '♪ 播放中' : '已暂停' }}</small>
      </div>
      <button
        type="button"
        class="tape-capsule-play-btn"
        :title="radioTapeState.playing ? '暂停' : '播放'"
        @click.stop="radioTapeController.togglePlay()"
      >
        {{ radioTapeState.playing ? '⏸' : '▶' }}
      </button>
      <button
        type="button"
        class="tape-capsule-expand-btn"
        title="展开完整磁带播放条"
        @click.stop="isCollapsed = false"
      >
        ↗
      </button>
    </div>

    <!-- 拖拽装填卡槽提示遮罩 -->
    <div v-show="isDragOver" class="tape-deck-drop-slot">
      <div class="slot-visual-frame">
        <span class="slot-icon-tape">📼</span>
        <div class="slot-text-col">
          <strong class="slot-headline">释放鼠标装填卡带</strong>
          <small class="slot-subline">拖入视频封面 · 立即播放音乐</small>
        </div>
      </div>
    </div>

    <!-- 装填反馈提示 -->
    <div v-if="isInserting" class="tape-insert-feedback-chip">
      <span class="tape-click-sound">✓ 已装填</span>
      <span class="tape-loaded-title">《{{ insertedTitle }}》</span>
    </div>

    <!-- 磁带播放机主体 -->
    <div v-show="!props.dockSide || !isCollapsed" class="tape-body-content">
      <!-- 1. 实体磁带图形 (双旋转轮轴、透明带窗、微缩封面贴纸、SIDE A 标) -->
      <div
        class="tape-cassette-wrap"
        role="button"
        tabindex="0"
        :title="`点击选择电台系列 (已建 ${biliFavoritesState.radioSeries.length} 个系列 · 也可直接拖拽视频封面至此装填)`"
        @click="toggleSeriesPicker"
        @keydown.enter.space.prevent="toggleSeriesPicker"
      >
        <div class="tape-cassette">
          <!-- 左磁带转轮 (播放时匀速平滑转动) -->
          <div class="tape-spool tape-spool-left">
            <div class="tape-spool-teeth">
              <span></span><span></span><span></span>
            </div>
            <div class="tape-spool-center"></div>
          </div>

          <!-- 磁带贴纸核心区 -->
          <div class="tape-center-label">
            <div class="tape-sticker-head">
              <div v-if="radioTapeState.coverUrl" class="tape-cover-sticker" :title="radioTapeState.title">
                <img :src="radioTapeState.coverUrl" alt="Cover" referrerpolicy="no-referrer" />
              </div>
              <div class="tape-badge-row">
                <span class="side-letter">A</span>
                <span class="tape-brand-text">{{ radioTapeState.seriesName || 'CASSETTE' }}</span>
              </div>
            </div>

            <!-- 透明磁带亚克力窗与 Ribbon 磁带 -->
            <div class="tape-acrylic-window">
              <div class="tape-ribbon-bar"></div>
              <div class="tape-scale-marks">
                <span>100</span><span>50</span><span>0</span>
              </div>
            </div>
          </div>

          <!-- 右磁带转轮 (播放时匀速平滑转动) -->
          <div class="tape-spool tape-spool-right">
            <div class="tape-spool-teeth">
              <span></span><span></span><span></span>
            </div>
            <div class="tape-spool-center"></div>
          </div>
        </div>

        <!-- 🌟 电台自建系列弹窗：点击磁带时向上弹出 -->
        <div
          v-if="isSeriesPickerOpen"
          class="tape-series-popover"
          @click.stop
        >
          <div class="tape-series-header">
            <div class="tape-series-title-group">
              <span class="tape-series-icon">📻</span>
              <span class="tape-series-title">自建电台系列</span>
              <span class="tape-series-count-pill">{{ biliFavoritesState.radioSeries.length }}</span>
            </div>
            <button
              type="button"
              class="tape-series-close-btn"
              title="关闭"
              aria-label="关闭"
              @click.stop="isSeriesPickerOpen = false"
            >
              ✕
            </button>
          </div>

          <div class="tape-series-list-scroll">
            <div
              v-for="series in biliFavoritesState.radioSeries"
              :key="series.id"
              class="tape-series-item"
              :class="{ 'is-active': radioTapeState.seriesName === series.name }"
              @click.stop="selectAndPlaySeries(series.id)"
            >
              <div class="tape-series-item-left">
                <span class="tape-series-item-bullet">📼</span>
                <div class="tape-series-item-info">
                  <span class="tape-series-item-name" :title="series.name">{{ series.name }}</span>
                  <span class="tape-series-item-count">{{ series.count }} 首曲目 · 顺序连播</span>
                </div>
              </div>
              <span v-if="radioTapeState.seriesName === series.name && radioTapeState.playing" class="tape-series-playing-tag">
                播放中
              </span>
              <span v-else class="tape-series-play-action">
                ▶
              </span>
            </div>

            <div v-if="!biliFavoritesState.radioSeries.length" class="tape-series-empty">
              <span class="empty-icon">📂</span>
              <span class="empty-text">暂无保存的电台系列</span>
              <span class="empty-tip">可在 B站工作区 → 电台 中添加曲目并保存为系列</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 3. 播放控制键 (上一曲 / 播放暂停 / 下一曲) -->
      <div class="tape-transport-controls" role="group" aria-label="电台播放控制">
        <button
          type="button"
          class="tape-ctrl-btn"
          title="上一首"
          aria-label="上一首"
          @click="radioTapeController.prev()"
        >
          <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor">
            <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z" />
          </svg>
        </button>
        <button
          type="button"
          class="tape-ctrl-btn tape-ctrl-play"
          :class="{ playing: radioTapeState.playing }"
          :title="radioTapeState.playing ? '暂停播放' : '开始播放'"
          :aria-label="radioTapeState.playing ? '暂停' : '播放'"
          @click="radioTapeController.togglePlay()"
        >
          <svg v-if="radioTapeState.playing" viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
          </svg>
          <svg v-else viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        </button>
        <button
          type="button"
          class="tape-ctrl-btn"
          title="下一首"
          aria-label="下一首"
          @click="radioTapeController.next()"
        >
          <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor">
            <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
          </svg>
        </button>
      </div>

      <!-- 4. 进度条、歌词与音浪波形 -->
      <div class="tape-playback-section">
        <div class="tape-time-lyric-row">
          <span class="tape-timestamp">{{ radioTapeState.formattedCurrent }} / {{ radioTapeState.formattedDuration }}</span>
          <div class="tape-lyric-container">
            <span class="tape-lyric-text" :title="radioTapeState.lyric">
              {{ radioTapeState.lyric || '♪ 纯音乐 / 伴奏' }}
            </span>
          </div>

          <!-- 🎵 播放模式切换 (顺序 / 单曲循环 / 随机乱序) 纯 SVG 矢量图标，无文字 -->
          <button
            type="button"
            class="tape-mode-btn"
            :title="modeTooltip"
            :aria-label="modeTooltip"
            @click="radioTapeController.toggleMode()"
          >
            <!-- 顺序播放 (列表循环) -->
            <svg
              v-if="radioTapeState.mode === 'order'"
              viewBox="0 0 24 24"
              width="13"
              height="13"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="17 1 21 5 17 9" />
              <path d="M3 11V9a4 4 0 0 1 4-4h14" />
              <polyline points="7 23 3 19 7 15" />
              <path d="M21 13v2a4 4 0 0 1-4 4H3" />
            </svg>

            <!-- 单曲循环 -->
            <svg
              v-else-if="radioTapeState.mode === 'one'"
              viewBox="0 0 24 24"
              width="13"
              height="13"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="17 1 21 5 17 9" />
              <path d="M3 11V9a4 4 0 0 1 4-4h14" />
              <polyline points="7 23 3 19 7 15" />
              <path d="M21 13v2a4 4 0 0 1-4 4H3" />
              <text x="12" y="14.5" font-size="7.5" font-weight="900" font-family="system-ui, -apple-system, sans-serif" fill="currentColor" stroke="none" text-anchor="middle">1</text>
            </svg>

            <!-- 乱序播放 (随机播放) -->
            <svg
              v-else-if="radioTapeState.mode === 'shuffle'"
              viewBox="0 0 24 24"
              width="13"
              height="13"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="16 3 21 3 21 8" />
              <line x1="4" y1="20" x2="21" y2="3" />
              <polyline points="21 16 21 21 16 21" />
              <line x1="15" y1="15" x2="21" y2="21" />
              <line x1="4" y1="4" x2="9" y2="9" />
            </svg>
          </button>
        </div>

        <div
          ref="progressLineRef"
          class="tape-progress-rail"
          role="slider"
          :aria-valuenow="radioTapeState.progressPercent"
          aria-valuemin="0"
          aria-valuemax="100"
          aria-label="电台播放进度"
          @pointerdown="handlePointerDown"
          @pointermove="handlePointerMove"
          @pointerup="handlePointerUp"
          @pointercancel="handlePointerUp"
        >
          <div class="tape-progress-fill" :style="{ width: `${radioTapeState.progressPercent}%` }"></div>
          <div class="tape-progress-handle" :style="{ left: `${radioTapeState.progressPercent}%` }"></div>
        </div>

        <div class="tape-waveform-row" aria-hidden="true">
          <svg class="tape-waveform-svg" viewBox="0 0 160 16" preserveAspectRatio="none">
            <rect
              v-for="(h, idx) in waveformHeights"
              :key="idx"
              class="wave-bar"
              :x="idx * 4"
              :y="16 - h * 0.7"
              width="1.8"
              :height="h * 0.7"
              rx="0.9"
              :style="{ animationDelay: `${(idx % 8) * 0.12}s` }"
            />
          </svg>
        </div>
      </div>

      <!-- 5. 独立停靠在最右侧的收起小按钮 (内联 flex 排布，绝不遮挡任何文字) -->
      <button
        v-if="props.dockSide"
        type="button"
        class="tape-dock-collapse-btn"
        title="收起至左下角小胶囊"
        aria-label="收起磁带机"
        @click.stop="isCollapsed = true"
      >
        <svg viewBox="0 0 24 24" width="11" height="11" fill="currentColor">
          <path d="M19 13H5v-2h14v2z" />
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped>
/* 磁带播放机根容器：契合系统主题变量，自然柔和，非刺眼黑黄色 */
.bili-tape-deck {
  position: relative;
  width: 100%;
  margin-top: 14px;
  background: var(--surface, #ffffff);
  border: 1px solid var(--border, rgba(0, 0, 0, 0.08));
  border-radius: 12px;
  box-sizing: border-box;
  overflow: visible;
  user-select: none;
  font-family: inherit;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.05);
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

/* Dock 左侧停靠模式 (全屏插件左下角) */
.bili-tape-deck.dock-side-mode {
  position: fixed;
  left: 20px;
  bottom: 12px;
  z-index: 1002;
  width: auto;
  min-width: 260px;
  max-width: 400px; /* 默认最大值，由 safeMaxWidth 动态实时精确计算 */
  margin-top: 0;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12), 0 2px 6px rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(14px);
  background: color-mix(in srgb, var(--surface, #ffffff) 94%, transparent);
  border-color: var(--border-strong, var(--border));
  overflow: visible;
}

.tape-body-content {
  display: flex;
  align-items: center;
  padding: 8px 10px 8px 10px;
  gap: 10px;
  min-height: 54px;
  box-sizing: border-box;
  width: 100%;
  overflow: visible;
}

/* 独立在最右侧的折叠控制按钮 (自然参与 flex 布局，绝不覆盖上方时间) */
.tape-dock-collapse-btn {
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
  margin-left: 2px;
  transition: all 0.15s ease;
  line-height: 1;
  padding: 0;
}
.tape-dock-collapse-btn:hover {
  background: var(--surface-hover);
  color: #00aeec;
  border-color: #00aeec;
}

/* 折叠胶囊态 */
.bili-tape-deck.dock-side-collapsed {
  width: auto;
  min-width: 150px;
  max-width: 210px;
  border-radius: 999px;
}
.tape-collapsed-capsule {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 5px 8px 5px 8px;
  min-height: 38px;
  box-sizing: border-box;
}
.tape-capsule-spool {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: 1.5px solid var(--border-strong, #94a3b8);
  background: var(--panel, #fff);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.tape-capsule-spool.spinning {
  animation: spoolSpin 2.5s linear infinite;
}
.spool-center-dot {
  width: 6px;
  height: 6px;
  background: #00aeec;
  border-radius: 50%;
}
.tape-capsule-text {
  display: flex;
  flex-direction: column;
  min-width: 0;
  flex: 1;
}
.capsule-title {
  font-size: 11px;
  font-weight: 700;
  color: var(--heading);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.2;
}
.capsule-sub {
  font-size: 8.5px;
  color: var(--dim);
}
.tape-capsule-play-btn {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: 1px solid var(--border);
  background: var(--panel, #fff);
  color: #00aeec;
  font-size: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
  padding: 0;
  transition: transform 0.1s ease;
}
.tape-capsule-expand-btn {
  width: 18px;
  height: 18px;
  border-radius: 4px;
  border: 0;
  background: transparent;
  color: var(--dim);
  font-size: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
  padding: 0;
  transition: color 0.15s ease;
}
.tape-capsule-expand-btn:hover {
  color: #00aeec;
}

/* 磁带实体图形 (现代卡带拟物) */
.tape-cassette-wrap {
  position: relative;
  flex-shrink: 0;
  cursor: pointer;
  outline: none;
}
.tape-cassette-wrap:hover .tape-cassette {
  transform: translateY(-1px);
}

/* 🌟 电台系列选择器弹窗 (向上弹出，纯实色面板，绝不透底背景文字) */
.tape-series-popover {
  position: absolute;
  bottom: calc(100% + 12px);
  left: 0;
  width: 240px;
  max-width: calc(100vw - 32px);
  background: var(--panel, #ffffff) !important;
  background-color: var(--panel, #ffffff) !important;
  border: 1px solid var(--border-strong, var(--border, rgba(0, 0, 0, 0.15)));
  border-radius: 10px;
  box-shadow: 0 14px 35px rgba(0, 0, 0, 0.25), 0 2px 8px rgba(0, 0, 0, 0.08);
  z-index: 1005;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: tapePopoverFadeIn 0.18s cubic-bezier(0.16, 1, 0.3, 1);
  cursor: default;
}

@keyframes tapePopoverFadeIn {
  from {
    opacity: 0;
    transform: translateY(6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.tape-series-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 10px;
  border-bottom: 1px solid var(--border, rgba(0, 0, 0, 0.08));
  background: color-mix(in srgb, var(--panel, #ffffff) 92%, var(--text, #000000) 8%);
}

.tape-series-title-group {
  display: flex;
  align-items: center;
  gap: 5px;
}

.tape-series-icon {
  font-size: 13px;
}

.tape-series-title {
  font-size: 12px;
  font-weight: 600;
  color: var(--heading, #0f172a);
}

.tape-series-count-pill {
  font-size: 10px;
  font-weight: 600;
  padding: 1px 5px;
  border-radius: 10px;
  background: rgba(2, 132, 199, 0.12);
  color: #0284c7;
}

.tape-series-close-btn {
  background: transparent;
  border: none;
  font-size: 11px;
  color: var(--muted, #64748b);
  cursor: pointer;
  padding: 2px 5px;
  border-radius: 4px;
  transition: all 0.15s ease;
}

.tape-series-close-btn:hover {
  background: var(--panel-hover, rgba(0, 0, 0, 0.05));
  color: var(--heading, #0f172a);
}

.tape-series-list-scroll {
  max-height: 200px;
  overflow-y: auto;
  padding: 4px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  background: var(--panel, #ffffff);
}

.tape-series-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 8px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s ease;
  user-select: none;
}

.tape-series-item:hover {
  background: var(--panel-hover, rgba(0, 0, 0, 0.04));
}

.tape-series-item.is-active {
  background: rgba(2, 132, 199, 0.1);
}

.tape-series-item-left {
  display: flex;
  align-items: center;
  gap: 6px;
  min-width: 0;
  flex: 1;
}

.tape-series-item-bullet {
  font-size: 12px;
  flex-shrink: 0;
}

.tape-series-item-info {
  display: flex;
  flex-direction: column;
  min-width: 0;
  flex: 1;
}

.tape-series-item-name {
  font-size: 12px;
  font-weight: 500;
  color: var(--text, #334155);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.tape-series-item.is-active .tape-series-item-name {
  color: #0284c7;
  font-weight: 600;
}

.tape-series-item-count {
  font-size: 10px;
  color: var(--muted, #64748b);
}

.tape-series-playing-tag {
  font-size: 10px;
  font-weight: 600;
  color: #0284c7;
  padding: 1px 4px;
  background: rgba(2, 132, 199, 0.15);
  border-radius: 4px;
  flex-shrink: 0;
}

.tape-series-play-action {
  font-size: 10px;
  color: var(--muted, #94a3b8);
  opacity: 0;
  transition: opacity 0.15s ease;
  flex-shrink: 0;
}

.tape-series-item:hover .tape-series-play-action {
  opacity: 1;
  color: #0284c7;
}

.tape-series-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 10px;
  text-align: center;
  gap: 4px;
}

.tape-series-empty .empty-icon {
  font-size: 18px;
  opacity: 0.7;
}

.tape-series-empty .empty-text {
  font-size: 12px;
  font-weight: 500;
  color: var(--text, #475569);
}

.tape-series-empty .empty-tip {
  font-size: 10px;
  color: var(--muted, #94a3b8);
  line-height: 1.4;
}

.tape-cassette {
  position: relative;
  width: 106px;
  height: 42px;
  border: 1.5px solid var(--border-strong, #cbd5e1);
  border-radius: 6px;
  background: var(--panel, #f8fafc);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 5px;
  box-sizing: border-box;
  overflow: hidden;
}

/* 双旋转齿轮 (Reel) */
.tape-spool {
  position: relative;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: var(--surface, #ffffff);
  border: 1.5px solid var(--border-strong, #94a3b8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.08);
}
.tape-spool-center {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--heading, #334155);
}
.tape-spool-teeth {
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
.tape-spool-teeth span {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 1.5px;
  background: var(--border-strong, #94a3b8);
  transform-origin: center;
  margin-top: -0.75px;
  margin-left: -50%;
}
.tape-spool-teeth span:nth-child(1) { transform: rotate(0deg); }
.tape-spool-teeth span:nth-child(2) { transform: rotate(60deg); }
.tape-spool-teeth span:nth-child(3) { transform: rotate(120deg); }

.is-playing .tape-spool {
  animation: spoolSpin 2.6s linear infinite;
}
@keyframes spoolSpin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* 磁带中心贴纸与亚克力窗 */
.tape-center-label {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 4px;
  min-width: 0;
  z-index: 1;
}
.tape-sticker-head {
  display: flex;
  align-items: center;
  gap: 3px;
  margin-bottom: 2px;
}
.tape-cover-sticker {
  width: 16px;
  height: 12px;
  border-radius: 2px;
  overflow: hidden;
  border: 1px solid var(--border);
  flex-shrink: 0;
}
.tape-cover-sticker img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.tape-badge-row {
  display: flex;
  align-items: center;
  gap: 2px;
  min-width: 0;
}
.side-letter {
  font-size: 8px;
  font-weight: 800;
  color: #00aeec;
  line-height: 1;
}
.tape-brand-text {
  font-size: 7.5px;
  font-weight: 700;
  color: var(--muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  letter-spacing: 0.2px;
}
.tape-acrylic-window {
  position: relative;
  width: 100%;
  height: 9px;
  background: color-mix(in srgb, var(--surface) 60%, rgba(0, 0, 0, 0.08));
  border-radius: 2px;
  border: 1px solid var(--border);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
.tape-ribbon-bar {
  position: absolute;
  left: 0;
  right: 0;
  height: 4px;
  background: color-mix(in srgb, #00aeec 35%, #475569);
  opacity: 0.7;
}
.tape-scale-marks {
  position: relative;
  z-index: 1;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 2px;
  box-sizing: border-box;
}
.tape-scale-marks span {
  font-size: 5px;
  color: var(--dim);
  font-weight: 700;
  line-height: 1;
}

/* 控制按钮组 */
.tape-transport-controls {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
}
.tape-ctrl-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;
  padding: 0;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: var(--panel, #ffffff);
  color: var(--text);
  cursor: pointer;
  transition: all 0.15s ease;
}
.tape-ctrl-btn:hover {
  background: var(--surface-hover);
  color: #00aeec;
  border-color: #00aeec;
}
.tape-ctrl-play {
  width: 29px;
  height: 27px;
  background: #00aeec;
  border-color: #00aeec;
  color: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 174, 236, 0.28);
}
.tape-ctrl-play:hover {
  background: #009cd3;
  border-color: #009cd3;
  color: #ffffff;
}

/* 进度、台词与波形区 */
.tape-playback-section {
  flex: 1.2 1 110px;
  min-width: 90px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2px;
  overflow: hidden;
}
.tape-time-lyric-row {
  display: flex;
  align-items: center;
  gap: 6px;
  min-width: 0;
  overflow: hidden;
}

/* 🎵 播放模式切换按钮 (纯 SVG 图标，无文字) */
.tape-mode-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  padding: 0;
  border: none;
  background: transparent;
  color: var(--muted, #64748b);
  border-radius: 4px;
  cursor: pointer;
  flex-shrink: 0;
  transition: all 0.15s ease;
  margin-left: 2px;
}

.tape-mode-btn:hover {
  background: var(--panel-hover, rgba(0, 0, 0, 0.05));
  color: #0284c7;
}

.tape-mode-btn:active {
  transform: scale(0.92);
}
.tape-timestamp {
  font-family: ui-monospace, monospace;
  font-size: 9px;
  font-weight: 600;
  color: var(--dim);
  flex-shrink: 0;
  white-space: nowrap;
}
.tape-lyric-container {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  white-space: nowrap;
}
.tape-lyric-text {
  font-size: 10px;
  font-weight: 600;
  color: var(--text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
}

/* 进度轨 */
.tape-progress-rail {
  position: relative;
  height: 3px;
  background: color-mix(in srgb, var(--border) 80%, transparent);
  border-radius: 1.5px;
  cursor: pointer;
  margin: 2px 0 3px 0;
  touch-action: none;
}
.tape-progress-fill {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  background: #00aeec;
  border-radius: 1.5px;
  pointer-events: none;
}
.tape-progress-handle {
  position: absolute;
  top: 50%;
  width: 5px;
  height: 10px;
  background: #00aeec;
  border-radius: 1px;
  transform: translate(-50%, -50%);
  pointer-events: none;
  box-shadow: 0 1px 3px rgba(0, 174, 236, 0.4);
}

/* 波形动画 */
.tape-waveform-row {
  display: flex;
  align-items: flex-end;
  height: 12px;
  overflow: hidden;
}
.tape-waveform-svg {
  width: 100%;
  height: 12px;
  overflow: visible;
}
.wave-bar {
  fill: color-mix(in srgb, var(--border-strong, #94a3b8) 60%, transparent);
  transition: fill 0.2s ease;
}
.is-playing .wave-bar {
  fill: #00aeec;
  transform-box: fill-box;
  transform-origin: bottom;
  animation: wavePulse 1.3s ease-in-out infinite alternate;
}
@keyframes wavePulse {
  0% { transform: scaleY(0.65); }
  50% { transform: scaleY(1.3); }
  100% { transform: scaleY(0.8); }
}

/* 拖拽装填提示 */
.tape-deck-drop-slot {
  position: absolute;
  inset: 3px;
  background: rgba(0, 174, 236, 0.12);
  backdrop-filter: blur(4px);
  border: 1.5px dashed #00aeec;
  border-radius: 8px;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}
.slot-visual-frame {
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--surface, #ffffff);
  padding: 6px 12px;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}
.slot-icon-tape {
  font-size: 18px;
}
.slot-text-col {
  display: flex;
  flex-direction: column;
}
.slot-headline {
  font-size: 11.5px;
  font-weight: 700;
  color: var(--heading);
}
.slot-subline {
  font-size: 9px;
  color: var(--dim);
}

.tape-insert-feedback-chip {
  position: absolute;
  top: 6px;
  right: 32px;
  background: #00aeec;
  color: #ffffff;
  padding: 2px 7px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 10px;
  font-weight: 700;
  z-index: 8;
}
.tape-click-sound {
  font-size: 9px;
}
.tape-loaded-title {
  max-width: 160px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
