<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import { sideDrawerState, sideDrawerController } from "./drawer-store";
import SidePanelApp from "./SidePanelApp.vue";

function handleKeyDown(e: KeyboardEvent) {
  if (e.key === "Escape" && sideDrawerState.isOpen) {
    sideDrawerController.close();
  }
}

onMounted(() => {
  window.addEventListener("keydown", handleKeyDown);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeyDown);
});
</script>

<template>
  <Teleport to="body">
  <aside
    id="in-page-side-drawer"
    class="in-page-side-drawer"
    :class="{ 'is-open': sideDrawerState.isOpen }"
    :inert="!sideDrawerState.isOpen"
    :aria-hidden="!sideDrawerState.isOpen"
    aria-label="网页工具与收集箱侧栏抽屉"
  >
    <SidePanelApp in-drawer @close="sideDrawerController.close()" />
  </aside>
  </Teleport>
</template>

<style scoped>
.in-page-side-drawer {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 380px;
  max-width: 85vw;
  z-index: 10000;
  background: var(--panel);
  box-shadow: -10px 0 36px rgba(0, 0, 0, 0.12);
  border-left: 1px solid var(--border);
  transform: translateX(100%);
  transition: transform 0.24s cubic-bezier(0.16, 1, 0.3, 1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  user-select: none;
  pointer-events: none;
}

.in-page-side-drawer.is-open {
  transform: translateX(0);
  pointer-events: auto;
}

.in-page-side-drawer :deep(.sp-app-root) {
  height: 100%;
  min-height: 0;
  background: var(--panel);
}

@media (prefers-reduced-motion: reduce) {
  .in-page-side-drawer { transition: none; }
}
</style>
