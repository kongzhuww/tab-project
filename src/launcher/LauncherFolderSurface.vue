<script setup lang="ts">
import { ref } from "vue";
// Shared shell only. Bookmark API and quickLinks mutations stay in their owners.
const element = ref<HTMLDialogElement | null>(null);
defineExpose({ element });
</script>

<template>
  <dialog ref="element" class="launcher-dialog launcher-folder-dialog">
    <div class="launcher-folder-dialog-shell"><slot /></div>
  </dialog>
</template>

<style scoped>
.launcher-folder-dialog { background: var(--panel) !important; color: var(--text) !important; border-color: var(--border) !important; }
.launcher-folder-dialog-shell :deep(h2) { color: var(--heading) !important; }
.launcher-folder-dialog-shell :deep(header) { border-color: var(--border); }
</style>
