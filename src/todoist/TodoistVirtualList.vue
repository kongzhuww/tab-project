<script setup lang="ts">
import { computed, ref, shallowRef, watch, onMounted, onUnmounted, nextTick } from "vue";
import type { TodoistTaskItem } from "./task-list-store";

const props = defineProps<{
  tasks: TodoistTaskItem[]; pinnedId?: string | null; hiddenId?: string | null;
  isPreview: (task: TodoistTaskItem) => boolean;
}>();
const root = ref<HTMLElement | null>(null);
const heights = new Map<string, number>();
const layoutVersion = ref(0);
const viewport = shallowRef({ top: 0, height: 600 });
const key = (task: TodoistTaskItem) => props.isPreview(task) ? `preview:${task.id}` : task.id;
const offsets = computed(() => {
  void layoutVersion.value;
  const result = [0];
  for (const task of props.tasks) {
    const height = task.id === props.hiddenId && !props.isPreview(task) ? 0
      : (heights.get(key(task)) || heights.get(task.id) || 110);
    result.push(result[result.length - 1] + height);
  }
  return result;
});
const dragSlots = computed(() => {
  void layoutVersion.value;
  let top = 0;
  return props.tasks.filter(task => !props.isPreview(task)).map(task => {
    const height = heights.get(task.id) || 110;
    const row = { id: task.id, middle: top + height / 2 };
    top += height;
    return row;
  });
});
function lowerBound(value: number) {
  const positions = offsets.value;
  let lo = 0, hi = props.tasks.length;
  while (lo < hi) {
    const mid = (lo + hi) >>> 1;
    if (positions[mid + 1] < value) lo = mid + 1; else hi = mid;
  }
  return lo;
}
const rows = computed(() => {
  const from = Math.max(0, lowerBound(viewport.value.top) - 5);
  const to = Math.min(props.tasks.length, lowerBound(viewport.value.top + viewport.value.height) + 6);
  const indexes = new Set<number>();
  for (let index = from; index < to; index++) indexes.add(index);
  // Keep the actual native drag source and focused editor mounted while scrolling.
  if (props.pinnedId) {
    const pinned = props.tasks.findIndex(task => task.id === props.pinnedId && !props.isPreview(task));
    if (pinned >= 0) indexes.add(pinned);
  }
  return [...indexes].sort((a, b) => a - b).map(index => ({ task: props.tasks[index], index, top: offsets.value[index] }));
});
let frame = 0;
function updateViewport() {
  if (frame) return;
  frame = requestAnimationFrame(() => {
    frame = 0;
    if (root.value) viewport.value = { top: root.value.scrollTop, height: root.value.clientHeight };
  });
}
let observer: ResizeObserver | undefined;
const elements = new Map<string, HTMLElement>();
function setRow(el: unknown, id: string) {
  const previous = elements.get(id);
  if (previous === el) return;
  if (previous) observer?.unobserve(previous);
  if (el instanceof HTMLElement) {
    elements.set(id, el);
    observer?.observe(el);
  } else elements.delete(id);
}
watch(() => props.tasks, () => {
  const ids = new Set(props.tasks.map(key));
  for (const id of heights.keys()) if (!ids.has(id)) heights.delete(id);
  nextTick(updateViewport);
});
onMounted(() => {
  observer = new ResizeObserver(entries => {
    let changed = false;
    const anchorIndex = lowerBound(root.value?.scrollTop || 0);
    const anchorTop = offsets.value[anchorIndex] || 0;
    for (const entry of entries) {
      const element = entry.target as HTMLElement;
      if (element === root.value) { updateViewport(); continue; }
      const id = element.dataset.rowKey;
      const height = entry.borderBoxSize?.[0]?.blockSize || entry.contentRect.height;
      if (id && height > 0 && Math.abs((heights.get(id) || 0) - height) > 0.5) {
        heights.set(id, height); changed = true;
      }
    }
    if (changed) {
      layoutVersion.value++;
      const delta = (offsets.value[anchorIndex] || 0) - anchorTop;
      if (root.value && delta && !props.pinnedId) root.value.scrollTop += delta;
      updateViewport();
    }
  });
  if (root.value) {
    observer.observe(root.value);
    // Logical geometry is available for every task, including unmounted rows.
    (root.value as any).__todoistSlots = () => dragSlots.value;
  }
  for (const el of elements.values()) observer.observe(el);
  updateViewport();
});
onUnmounted(() => {
  observer?.disconnect();
  cancelAnimationFrame(frame);
  if (root.value) delete (root.value as any).__todoistSlots;
  elements.clear(); heights.clear();
});
</script>

<template>
  <div ref="root" @scroll.passive="updateViewport">
    <slot v-if="!tasks.length" name="empty" />
    <div v-else class="virtual-task-canvas" :style="{ height: `${offsets[offsets.length - 1]}px` }">
      <div
        v-for="row in rows"
        :key="key(row.task)"
        :ref="el => setRow(el, key(row.task))"
        :data-row-key="key(row.task)"
        class="virtual-task-row"
        :style="{ transform: `translateY(${row.top}px)` }"
      >
        <slot :task="row.task" :index="row.index" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.virtual-task-canvas { position: relative; width: 100%; overflow-anchor: none; }
.virtual-task-row { position: absolute; top: 0; left: 0; width: 100%; display: flow-root; }
.virtual-task-row :deep(.todoist-board-task) { content-visibility: visible; }
.drag-over .virtual-task-row { transition: transform .14s ease-out; }
@media (prefers-reduced-motion: reduce) {
  .drag-over .virtual-task-row { transition: none; }
}
</style>
