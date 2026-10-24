<script setup lang="ts">
import { TransitionGroup } from "vue";
import LauncherTileContent from "../launchers/LauncherTileContent.vue";
import type { BookmarkBoardItem } from "./board-data";
withDefaults(defineProps<{ items: BookmarkBoardItem[]; folderId: string; busy: boolean; draggedId: string; overFolder: string; sizes: Record<string, 'small' | 'large'>; ghost?: boolean }>(), { ghost: false });
const emit = defineEmits<{
  pointerDown: [item: BookmarkBoardItem, event: PointerEvent];
  activate: [item: BookmarkBoardItem, event: MouseEvent | KeyboardEvent];
  menu: [item: BookmarkBoardItem, event: MouseEvent];
}>();
function safeUrl(url: string): string | undefined {
  try { const parsed = new URL(url); return ["http:", "https:", "ftp:", "file:"].includes(parsed.protocol) ? url : undefined; }
  catch { return undefined; }
}
</script>

<template>
  <!-- Match FavoriteSites: replace the grid per directory, animate only drag reordering. -->
  <TransitionGroup :key="folderId" tag="div" class="launcher-items launcher-site-items bookmark-tiles" :data-bookmark-grid="folderId"
    :name="draggedId ? 'launcher-grid' : ''" :css="Boolean(draggedId)">
    <template v-for="item in items" :key="item.id">
      <a v-if="item.kind === 'link'" class="launcher-link" :class="{ 'is-dragging': !ghost && draggedId === item.id }"
        :href="safeUrl(item.url)" :title="`${item.title}\n${item.url}`" target="_blank" rel="noopener noreferrer" :data-bookmark-node="item.id"
        draggable="false" @dragstart.prevent @pointerdown="emit('pointerDown', item, $event)"
        @click="emit('activate', item, $event)" @contextmenu.prevent.stop="emit('menu', item, $event)">
        <LauncherTileContent :link="item" />
      </a>
      <div v-else role="button" tabindex="0" class="launcher-folder" :data-bookmark-node="item.id"
        :class="[`size-${sizes[item.id] || 'small'}`, { 'is-dragging': !ghost && draggedId === item.id, 'drop-target': overFolder === item.id }]"
        :title="`${item.path}\n${item.count} 个书签；拖动排序，右键管理`" draggable="false" @dragstart.prevent
        @pointerdown="emit('pointerDown', item, $event)" @click="emit('activate', item, $event)"
        @keydown.enter.prevent="emit('activate', item, $event)" @keydown.space.prevent="emit('activate', item, $event)"
        @contextmenu.prevent.stop="emit('menu', item, $event)">
        <LauncherTileContent :folder="item" :size="sizes[item.id] || 'small'" />
      </div>
    </template>
  </TransitionGroup>
</template>

<style scoped>
.bookmark-tiles { width: 100%; }
.launcher-link, .launcher-folder { touch-action: none; user-select: none; -webkit-user-drag: none; }
</style>
