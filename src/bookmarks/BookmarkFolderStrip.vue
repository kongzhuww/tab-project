<template>
  <nav
    id="bookmark-folder-strip"
    ref="stripRef"
    class="bookmark-folder-strip"
    aria-label="书签栏文件夹"
    :hidden="!state.enabled"
    @wheel="handleWheel"
  >
    <span
      v-if="!state.folders.length"
      class="bookmark-folder-strip-empty"
    >
      {{ state.emptyMessage || "书签栏没有文件夹" }}
    </span>

    <button
      v-for="folder in state.folders"
      :key="folder.id"
      class="bookmark-folder-chip"
      type="button"
      :title="`打开书签文件夹：${folder.title || '未命名'}`"
      :data-bookmark-folder-id="folder.id"
      @click="handleClick(folder)"
      @contextmenu.prevent="handleContextMenu($event, folder)"
    >
      <span aria-hidden="true">📁</span>
      <span>{{ folder.title || "未命名" }}</span>
    </button>
  </nav>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
  bookmarkFolderStripState as state,
  bookmarkFolderStripController,
  type BookmarkFolderChip
} from "./folder-strip-store";

const stripRef = ref<HTMLElement | null>(null);

function handleWheel(event: WheelEvent) {
  const el = stripRef.value;
  if (!el || el.scrollWidth <= el.clientWidth || !event.deltaY) return;
  event.preventDefault();
  el.scrollLeft += event.deltaY;
}

function handleClick(folder: BookmarkFolderChip) {
  bookmarkFolderStripController.openFolder(folder.id);
}

function handleContextMenu(event: MouseEvent, folder: BookmarkFolderChip) {
  bookmarkFolderStripController.openContextMenu(folder, event.clientX, event.clientY);
}
</script>

<style scoped>
.bookmark-folder-chip {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI Variable Text", "Segoe UI", Roboto, "PingFang SC", "Microsoft YaHei", sans-serif;
  letter-spacing: 0.01em;
}
</style>
