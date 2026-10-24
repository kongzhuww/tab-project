<script setup lang="ts">
import { computed } from "vue";
import LauncherFavicon from "./LauncherFavicon.vue";
import type { LauncherLink } from "./store";
const props = withDefaults(defineProps<{ link?: LauncherLink; folder?: { title: string; preview: LauncherLink[]; count: number }; size?: 'small' | 'large' }>(), { size: 'small' });
const capacity = computed(() => props.size === 'large' ? 9 : 4);
const preview = computed(() => props.folder?.preview.slice(0, (props.folder.count > capacity.value ? capacity.value - 1 : capacity.value)) || []);
</script>

<template>
  <template v-if="link">
    <LauncherFavicon :link="link" />
    <span class="launcher-label launcher-title">{{ link.title }}</span>
  </template>
  <template v-else-if="folder">
    <div class="launcher-folder-preview" :title="`打开${folder.title}`">
      <LauncherFavicon v-for="item in preview" :key="item.id" :link="item" :mini="true" />
      <span v-if="folder.count > capacity" class="launcher-folder-more">+{{ folder.count - (capacity - 1) }}</span>
      <span v-if="!preview.length" class="empty-folder" aria-hidden="true">📁</span>
      <slot />
    </div>
    <span class="launcher-folder-label launcher-title">{{ folder.title }}</span>
  </template>
</template>

<style scoped>
.launcher-title { color: var(--text); }
.launcher-folder-preview { background: var(--surface) !important; border-color: var(--border) !important; }
.launcher-folder-more { background: var(--muted) !important; color: var(--panel); }
.empty-folder { grid-column: 1 / -1; grid-row: 1 / span 2; align-self: center; text-align: center; font-size: 24px; }
</style>
