<script setup lang="ts">
import { computed } from "vue";
import { navWheelState, navWheelController, type NavWheelSector } from "./store";

const state = navWheelState;

const containerStyle = computed(() => {
  if (!state.ballPosition.x && !state.ballPosition.y) return {};
  return {
    left: `${state.ballPosition.x}px`,
    top: `${state.ballPosition.y}px`
  };
});

function isImageIcon(icon: string | undefined): boolean {
  if (!icon) return false;
  return (
    icon.endsWith(".svg") ||
    icon.endsWith(".png") ||
    icon.endsWith(".ico") ||
    icon.endsWith(".webp") ||
    icon.endsWith(".jpg") ||
    icon.endsWith(".jpeg") ||
    icon.startsWith("assets/") ||
    icon.startsWith("http://") ||
    icon.startsWith("https://") ||
    icon.startsWith("data:") ||
    icon.startsWith("blob:") ||
    icon.startsWith("chrome://") ||
    icon.startsWith("chrome-extension://") ||
    icon.includes("/_favicon/")
  );
}

function handleIconError(e: Event, sector: NavWheelSector) {
  const img = e.target as HTMLImageElement | null;
  if (!img) return;
  if (sector.desc && sector.desc.startsWith("http")) {
    try {
      const origin = new URL(sector.desc).origin;
      if (!img.src.includes(origin)) {
        img.src = `${origin}/favicon.ico`;
        return;
      }
    } catch {}
  }
  img.style.display = "none";
}

function handleHubClick(e: MouseEvent) {
  e.stopPropagation();
  navWheelController.dispatch("hub:click");
}

function handleContainerClick(e: MouseEvent) {
  if (!state.isExpanded) return;
  const target = e.target as HTMLElement | null;
  if (target?.closest("#nav-wheel-hub, #nav-wheel-context-menu, .nav-wheel-sector")) return;
  navWheelController.dispatch("container:click");
}

function handleSectorHover(sector: NavWheelSector) {
  navWheelController.dispatch("sector:hover", sector);
}

function handleSectorLeave(sector: NavWheelSector) {
  navWheelController.dispatch("sector:leave", sector);
}

function handleSectorClick(sector: NavWheelSector, e: MouseEvent) {
  e.stopPropagation();
  navWheelController.dispatch("sector:click", sector);
}

function handleContextMenu(sector: NavWheelSector, e: MouseEvent) {
  e.preventDefault();
  e.stopPropagation();
  navWheelController.dispatch("sector:contextmenu", { sector, clientX: e.clientX, clientY: e.clientY });
}
</script>

<template>
  <div
    id="nav-wheel-overlay"
    class="nav-wheel-overlay"
    :hidden="!state.isOpen"
    aria-label="页面导航悬浮球与轮盘"
  >
    <div id="nav-wheel-center-dot" class="nav-wheel-center-dot"></div>

    <div
      id="nav-wheel-container"
      class="nav-wheel-container"
      :class="{ expanded: state.isExpanded }"
      :style="containerStyle"
      @click="handleContainerClick"
    >
      <!-- SVG 激光扫描扇形波束背景 -->
      <svg
        id="nav-wheel-beam-svg"
        class="nav-wheel-beam-svg"
        viewBox="0 0 320 320"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="navWheelBeamGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="rgba(255, 255, 255, 0.28)" />
            <stop offset="50%" stop-color="rgba(255, 255, 255, 0.16)" />
            <stop offset="85%" stop-color="rgba(255, 255, 255, 0.06)" />
            <stop offset="100%" stop-color="rgba(255, 255, 255, 0.01)" />
          </radialGradient>
        </defs>
        <g
          id="nav-wheel-beam-group"
          class="nav-wheel-beam-group"
          :style="{ opacity: state.beam.visible ? '1' : '0' }"
        >
          <path
            id="nav-wheel-beam-wedge"
            class="nav-wheel-beam-wedge"
            fill="url(#navWheelBeamGrad)"
            :d="state.beam.wedgePath"
          />
          <line
            id="nav-wheel-beam-line1"
            class="nav-wheel-beam-line"
            :x1="state.beam.line1.x1"
            :y1="state.beam.line1.y1"
            :x2="state.beam.line1.x2"
            :y2="state.beam.line1.y2"
          />
          <line
            id="nav-wheel-beam-line2"
            class="nav-wheel-beam-line"
            :x1="state.beam.line2.x1"
            :y1="state.beam.line2.y1"
            :x2="state.beam.line2.x2"
            :y2="state.beam.line2.y2"
          />
          <path
            id="nav-wheel-beam-arc"
            class="nav-wheel-beam-arc"
            :d="state.beam.arcPath"
          />
        </g>
      </svg>

      <!-- 中心导航悬浮球与详情 Hub -->
      <div
        id="nav-wheel-hub"
        class="nav-wheel-hub"
        :class="{ active: state.hub.active }"
        role="button"
        tabindex="0"
        title="导航悬浮球 (点击展开/收起轮盘，快捷键可移至当前鼠标)"
        @click="handleHubClick"
      >
        <div id="nav-wheel-hub-icon" class="nav-wheel-hub-icon">
          <img
            v-if="isImageIcon(state.hub.icon)"
            :src="state.hub.icon"
            alt=""
            referrerpolicy="no-referrer"
          />
          <template v-else>{{ state.hub.icon }}</template>
        </div>
        <div id="nav-wheel-hub-title" class="nav-wheel-hub-title">{{ state.hub.title }}</div>
        <div id="nav-wheel-hub-desc" class="nav-wheel-hub-desc">{{ state.hub.desc }}</div>
      </div>

      <!-- 辐射状环绕功能扇区按钮群 -->
      <div id="nav-wheel-sectors" class="nav-wheel-sectors">
        <button
          v-for="sector in state.sectors"
          :key="sector.id"
          type="button"
          class="nav-wheel-sector"
          :class="{ active: sector.id === state.activeSectorId }"
          :data-id="sector.id"
          :style="{
            left: `${sector.x}px`,
            top: `${sector.y}px`,
            width: sector.size && sector.size !== 56 ? `${sector.size}px` : undefined,
            height: sector.size && sector.size !== 56 ? `${sector.size}px` : undefined
          }"
          :title="`${sector.title} - ${sector.desc || ''}`"
          :aria-label="sector.title"
          @mouseenter="handleSectorHover(sector)"
          @mouseleave="handleSectorLeave(sector)"
          @click="(e) => handleSectorClick(sector, e)"
          @contextmenu="(e) => handleContextMenu(sector, e)"
        >
          <span class="nav-wheel-sector-icon">
            <img
              v-if="isImageIcon(sector.icon)"
              :src="sector.icon"
              alt=""
              referrerpolicy="no-referrer"
              @error="handleIconError($event, sector)"
            />
            <template v-else>{{ sector.icon || '🔗' }}</template>
          </span>
          <span
            class="nav-wheel-sector-label"
            :style="sector.size && sector.size < 50 ? { fontSize: '8px', maxWidth: '40px' } : undefined"
          >
            {{ sector.title }}
          </span>
        </button>
      </div>
    </div>
  </div>
</template>
