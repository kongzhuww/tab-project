<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from "vue";
import LauncherFolderSurface from "../launcher/LauncherFolderSurface.vue";
import { useWindowDraggable } from "../core/useWindowDraggable";
import type { BookmarkBoardFolder } from "./board-data";
const props = defineProps<{ folder: BookmarkBoardFolder; busy: boolean; status: string; filter?: string }>();
const emit = defineEmits<{ close: []; up: []; 'update:filter': [value: string] }>();
const surface = ref<{ element: HTMLDialogElement | null } | null>(null);
const { panelRef, headerRef, initialStyle, onHeaderPointerDown, stopInteractions, isDragging } = useWindowDraggable({
  windowId: "bookmark-folder", managed: false, defaultWidth: 440, defaultHeight: 340,
  minWidth: 280, minHeight: 200, resizable: false, active: () => !props.busy
});
watch(() => surface.value?.element, element => { panelRef.value = element || null; }, { flush: "post" });
watch(() => props.busy, busy => { if (busy) stopInteractions(); });
function close() { if (!props.busy) emit('close'); }
function keydown(event: KeyboardEvent) {
  if (event.key === 'Escape') { event.preventDefault(); event.stopPropagation(); close(); }
}
onMounted(() => window.addEventListener('keydown', keydown));
onUnmounted(() => window.removeEventListener('keydown', keydown));
</script>

<template>
  <Teleport to="body">
    <LauncherFolderSurface ref="surface" id="bookmark-folder-dialog" open :style="initialStyle" data-opened="active"
      :class="{ dragging: isDragging }" aria-label="书签文件夹" @pointerdown.stop @contextmenu.stop @wheel.stop>
      <header ref="headerRef" title="按住标题栏可拖动" @pointerdown="onHeaderPointerDown">
        <button type="button" :disabled="busy" title="返回上一级" @pointerdown.stop @click="emit('up')">‹</button>
        <div class="launcher-folder-title-box"><h2 :title="folder.path">{{ folder.title }}</h2></div>
        <div class="bookmark-folder-filter-wrap" @pointerdown.stop>
          <input
            :value="props.filter || ''"
            type="search"
            placeholder="搜索筛选..."
            class="bookmark-folder-filter-input"
            title="快速过滤当前文件夹内的书签"
            @input="emit('update:filter', ($event.target as HTMLInputElement).value)"
          />
        </div>
        <div class="launcher-folder-drag-spacer" aria-hidden="true"></div>
        <button type="button" :disabled="busy" title="关闭" aria-label="关闭书签文件夹" @pointerdown.stop @click="close">✕</button>
      </header>
      <span v-if="status" class="bookmark-folder-status" role="status">{{ status }}</span>
      <div class="launcher-folder-dialog-items bookmark-folder-content"><slot /></div>
    </LauncherFolderSurface>
  </Teleport>
</template>

<style scoped>
#bookmark-folder-dialog { overflow: hidden; }
/* The draggable dialog has a fixed height. Constrain its flex shell to that height,
   so excess tiles scroll inside the content instead of being clipped by the dialog. */
#bookmark-folder-dialog :deep(.launcher-folder-dialog-shell) {
  height: 100%;
  max-height: 100%;
  box-sizing: border-box;
}
.bookmark-folder-content { display: block; min-height: 0; flex: 1; overflow-y: auto; overscroll-behavior: contain; }
.bookmark-folder-filter-wrap { display: inline-flex; align-items: center; margin-left: 6px; }
.bookmark-folder-filter-input {
  width: 95px; height: 23px; padding: 0 7px; font-size: 11px;
  border: 1px solid var(--border); border-radius: 6px;
  background: var(--surface); color: var(--text); outline: none;
  transition: width 0.18s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.15s ease;
}
.bookmark-folder-filter-input:focus {
  width: 125px; border-color: var(--border-strong); background: var(--panel);
}
.bookmark-folder-status { color: var(--muted); font-size: 11px; padding-bottom: 6px; }
</style>
