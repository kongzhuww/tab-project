<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import AppWindowFrame from "../core/AppWindowFrame.vue";
import StickerBoard from "./StickerBoard.vue";
import { windowManagerController } from "../core/window-manager.store";
import { stickersModuleState, pauseStickersReads } from "./module-state";
const pageVisible = ref(!document.hidden);
const active = computed(() => stickersModuleState.visible && pageVisible.value);
function visibility() { pageVisible.value = !document.hidden; if (document.hidden) pauseStickersReads(); }
onMounted(() => document.addEventListener("visibilitychange", visibility));
onBeforeUnmount(() => { pauseStickersReads(); document.removeEventListener("visibilitychange", visibility); });
function handleClose() { void windowManagerController.close("stickers"); }
function handleMinimize() { windowManagerController.minimize("stickers"); }
</script>

<template>
  <AppWindowFrame
    id="stickers-workspace-dialog"
    window-id="stickers"
    title="表情包模块"
    icon="🐱"
    :visible="stickersModuleState.visible"
    :default-width="820"
    :default-height="520"
    :min-width="480"
    :min-height="360"
    custom-class="lw-stickers-window"
    @close="handleClose"
    @minimize="handleMinimize"
  >
    <div class="stickers-dialog-scroll-box">
      <StickerBoard dock-owned :active="active" />
    </div>
  </AppWindowFrame>
</template>

<style scoped>
/* Saved window heights must not add space below the gallery. */
.lw-stickers-window:not(.is-maximized) {
  /* Add the sidebar's extra 40px even when the saved window was 780px wide. */
  width: min(820px, calc(100vw - 16px)) !important;
  max-width: calc(100vw - 16px);
  height: auto !important;
  min-height: 0 !important;
  max-height: calc(100dvh - 16px);
}
:deep(.lw-window-body) {
  flex: 0 1 auto;
}
.stickers-dialog-scroll-box {
  height: auto;
  min-height: 0;
  flex: 0 1 auto;
  overflow: auto;
  padding: 4px 6px;
  box-sizing: border-box;
}
:deep(#card-stickers) {
  display: block !important;
  border: none !important;
  background: transparent !important;
  box-shadow: none !important;
  padding: 0 !important;
  margin: 0 !important;
  height: auto !important;
}
:deep(.vue-sticker-board-wrapper) {
  height: auto !important;
}
/* Only the right pane contributes to the desktop grid's intrinsic height. */
:deep(#card-stickers .sticker-layout:not(.is-narrow-layout)) {
  display: grid !important;
  grid-template-columns: 205px minmax(0, 1fr) !important;
  height: auto !important;
  flex: none !important;
  align-items: stretch;
}
:deep(#card-stickers .sticker-layout:not(.is-narrow-layout) > .sticker-sidebar) {
  contain: size;
  height: auto !important;
  max-height: none !important;
  min-width: 0;
}
:deep(#card-stickers .sidebar-folder-card) {
  min-height: 48px;
  padding: 9px 10px;
  box-sizing: border-box;
}
:deep(#card-stickers .sticker-main-pane),
:deep(#card-stickers .sticker-library) {
  height: auto !important;
  flex: none !important;
}
:deep(#card-stickers .sticker-grid) {
  flex: none !important;
  /* On short screens scroll images, not the pagination out of view. */
  max-height: calc(100dvh - 190px);
}
/* Empty/loading galleries still reserve room for the navigation card plus two folders. */
:deep(#card-stickers .sticker-layout:not(.is-narrow-layout) .sticker-grid:has(> .sticker-empty)) {
  min-height: min(244px, calc(100dvh - 190px)) !important;
  grid-auto-rows: 1fr !important;
  align-content: stretch !important;
}
:deep(.sticker-pagination) {
  flex-wrap: wrap;
}
/* Maximizing may add surrounding space, but never stretches the image rows. */
.lw-stickers-window.is-maximized :deep(.lw-window-body) {
  flex: 1;
}
</style>
