<script setup lang="ts">
import { ref, watch, onBeforeUnmount } from "vue";
import { REPOSITORY_DRAG_TYPE, readRepositoryDrag } from "./repository-drag";
import { categoryFeedback } from "./category-storage";
import { githubFolderController as controller, githubFolderState as state } from "./folders";

const props = withDefaults(defineProps<{ active?: boolean }>(), { active: true });
const dropTarget = ref("");
const clearDrop = () => { dropTarget.value = ""; };
function canDrop(title: string): boolean {
  return props.active && !categoryFeedback.busy && state.folders.some(folder => folder.title === title && (folder.kind === "custom" || folder.kind === "uncategorized"));
}
watch(() => props.active, active => {
  clearDrop();
  window.removeEventListener("dragend", clearDrop);
  window.removeEventListener("drop", clearDrop);
  if (active) {
    window.addEventListener("dragend", clearDrop);
    window.addEventListener("drop", clearDrop);
  }
}, { immediate: true });
onBeforeUnmount(() => {
  window.removeEventListener("dragend", clearDrop);
  window.removeEventListener("drop", clearDrop);
});

function onDelete(event: MouseEvent, title: string): void {
  event.stopPropagation();
  controller.delete(title);
}

function onDragOver(event: DragEvent, title: string): void {
  if (!canDrop(title) || !Array.from(event.dataTransfer?.types || []).includes(REPOSITORY_DRAG_TYPE)) { clearDrop(); return; }
  event.preventDefault();
  if (event.dataTransfer) event.dataTransfer.dropEffect = "move";
  dropTarget.value = title;
}

function onDragLeave(event: DragEvent, title: string): void {
  const current = event.currentTarget;
  if (current instanceof Node && event.relatedTarget instanceof Node && current.contains(event.relatedTarget)) return;
  if (dropTarget.value === title) dropTarget.value = "";
}

function onDrop(event: DragEvent, title: string): void {
  clearDrop();
  if (!canDrop(title)) return;
  const fullName = readRepositoryDrag(event.dataTransfer);
  if (!fullName) return;
  event.preventDefault();
  event.stopPropagation();
  controller.dropRepository(fullName, title);
}
</script>

<template>
  <p v-if="categoryFeedback.message" role="status" style="font-size:12px;color:var(--danger,#ef4444);padding:4px 8px;margin:0 0 6px 0;border-radius:6px;background:var(--surface)">{{ categoryFeedback.message }}</p>
  <template v-for="(folder, index) in state.folders" :key="folder.title">
    <div v-if="folder.kind === 'custom' && state.folders[index - 1]?.kind !== 'custom'" class="gh-sidebar-divider"></div>
    <div v-if="folder.kind === 'custom' && state.folders[index - 1]?.kind !== 'custom'" class="gh-sidebar-caption">我的文件夹</div>
    <button
      type="button"
      class="gh-bili-folder"
      :class="{ on: folder.active, 'drag-into': dropTarget === folder.title }"
      :data-folder="folder.title"
      @click="controller.select(folder.title)"
      @dragover="onDragOver($event, folder.title)"
      @dragleave="onDragLeave($event, folder.title)"
      @drop="onDrop($event, folder.title)"
    >
      <span class="gh-folder-icon-wrap" style="font-size:13px;display:grid;place-items:center">
        <span v-if="folder.kind === 'all'">⭐</span>
        <span v-else-if="folder.kind === 'used'">⚡</span>
        <span v-else-if="folder.kind === 'uncategorized'">📄</span>
        <i v-else class="fo-folder-icon" style="color:currentColor"></i>
      </span>
      <span class="gh-folder-name" :title="folder.title">{{ folder.title }}</span>
      <small class="gh-folder-count">{{ folder.count }}</small>
      <span
        v-if="folder.kind === 'custom'"
        class="gh-folder-delete"
        title="删除文件夹"
        :data-del="folder.title"
        role="button"
        tabindex="0"
        @click="onDelete($event, folder.title)"
        @keydown.enter.prevent.stop="controller.delete(folder.title)"
        @keydown.space.prevent.stop="controller.delete(folder.title)"
      >✕</span>
    </button>
  </template>
</template>
