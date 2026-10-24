<script setup lang="ts" generic="T extends { id: string }">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
const props = withDefaults(defineProps<{
  items: readonly T[];
  scrollHost: HTMLElement | null;
  active?: boolean;
  estimate?: number;
  gap?: number;
  resetKey?: string;
}>(), { active: true, estimate: 100, gap: 0, resetKey: "" });
defineSlots<{ default(props: { item: T; index: number }): any }>();
const canvas = ref<HTMLElement | null>(null);
const revision = ref(0), viewTop = ref(0), viewHeight = ref(600);
const focusId = ref<string | null>(null), dragId = ref<string | null>(null);
const heights = new Map<string, number>();
const nodes = new Map<string, HTMLElement>();
let rowObserver: ResizeObserver | undefined, hostObserver: ResizeObserver | undefined;
let frame = 0, scrollSerial = 0, alive = true, binding = 0;
let attached: HTMLElement | null = null;
const offsets = computed(() => {
  void revision.value;
  const result = [0];
  for (const item of props.items) result.push(result[result.length - 1] + (heights.get(item.id) ?? props.estimate));
  return result;
});
const indices = computed(() => new Map(props.items.map((item, index) => [item.id, index])));
function indexAt(y: number) {
  const values = offsets.value;
  let low = 0, high = props.items.length;
  while (low < high) {
    const mid = (low + high) >>> 1;
    if (values[mid + 1] <= y) low = mid + 1; else high = mid;
  }
  return Math.min(low, Math.max(0, props.items.length - 1));
}
const visible = computed(() => {
  const start = indexAt(Math.max(0, viewTop.value - 400));
  const end = Math.min(props.items.length, indexAt(viewTop.value + viewHeight.value + 400) + 1);
  const selected = new Set<number>();
  for (let index = start; index < end; index++) selected.add(index);
  for (const id of [focusId.value, dragId.value]) {
    const index = id === null ? undefined : indices.value.get(id);
    if (index !== undefined) selected.add(index);
  }
  return [...selected].sort((a, b) => a - b).map(index => ({ item: props.items[index], index }));
});
function updateViewport() {
  frame = 0;
  if (!alive || !props.active || document.hidden || !canvas.value || !attached) return;
  // Two reads per frame, never a geometry scan over all rows.
  viewTop.value = Math.max(0, attached.getBoundingClientRect().top - canvas.value.getBoundingClientRect().top);
  viewHeight.value = attached.clientHeight || 600;
}
function schedule() { if (!frame && alive && props.active && !document.hidden) frame = requestAnimationFrame(updateViewport); }
function onScroll() { ++scrollSerial; schedule(); }
function setRow(id: string, value: unknown) {
  const old = nodes.get(id);
  if (old === value) return;
  if (old) rowObserver?.unobserve(old);
  if (value instanceof HTMLElement) {
    nodes.set(id, value);
    if (props.active && !document.hidden) rowObserver?.observe(value);
  } else nodes.delete(id);
}
function measured(entries: ResizeObserverEntry[]) {
  if (!attached || !props.active || !alive || document.hidden) return;
  const host = attached, serial = scrollSerial, epoch = binding, items = props.items;
  const anchorIndex = indexAt(viewTop.value), anchorId = items[anchorIndex]?.id;
  const oldOffset = offsets.value[anchorIndex] || 0;
  const bottom = host.scrollHeight - host.scrollTop - host.clientHeight <= 3;
  let changed = false;
  for (const entry of entries) {
    const element = entry.target as HTMLElement;
    const id = element.dataset.virtualId;
    const height = entry.borderBoxSize?.[0]?.blockSize ?? entry.contentRect.height;
    if (!id || height < 1 || !indices.value.has(id)) continue;
    if (Math.abs((heights.get(id) ?? props.estimate) - height) > 0.5) {
      heights.set(id, height); changed = true;
    }
  }
  if (!changed) return;
  ++revision.value;
  void nextTick(() => {
    if (!alive || epoch !== binding || attached !== host || serial !== scrollSerial || items !== props.items) return;
    if (bottom) host.scrollTop = host.scrollHeight;
    else if (anchorId !== undefined) {
      const index = indices.value.get(anchorId);
      if (index !== undefined) host.scrollTop += offsets.value[index] - oldOffset;
    }
    schedule();
  });
}
function rowId(event: Event): string | null {
  return event.target instanceof Element
    ? event.target.closest<HTMLElement>("[data-virtual-id]")?.dataset.virtualId ?? null : null;
}
function onFocus(event: FocusEvent) { focusId.value = rowId(event); }
function onBlur() {
  void nextTick(() => {
    if (!alive) return;
    const focused = document.activeElement as HTMLElement | null;
    focusId.value = focused && canvas.value?.contains(focused)
      ? focused.closest<HTMLElement>("[data-virtual-id]")?.dataset.virtualId ?? null : null;
  });
}
function onDrag(event: DragEvent) { dragId.value = rowId(event); }
function endDrag() { dragId.value = null; }
function detach() {
  ++binding;
  attached?.removeEventListener("scroll", onScroll);
  hostObserver?.disconnect(); rowObserver?.disconnect();
  cancelAnimationFrame(frame); frame = 0; attached = null;
}
function attach() {
  detach();
  if (!alive || !props.active || document.hidden || !props.scrollHost) return;
  attached = props.scrollHost;
  attached.addEventListener("scroll", onScroll, { passive: true });
  hostObserver?.observe(attached);
  for (const element of nodes.values()) rowObserver?.observe(element);
  schedule();
}
watch(() => [props.scrollHost, props.active] as const, attach, { flush: "post" });
watch(() => props.items, () => {
  const valid = new Set(props.items.map(item => item.id));
  for (const key of heights.keys()) if (!valid.has(key)) heights.delete(key);
  if (focusId.value && !valid.has(focusId.value)) focusId.value = null;
  if (dragId.value && !valid.has(dragId.value)) dragId.value = null;
  ++revision.value; schedule();
}, { flush: "pre" });
watch(() => props.resetKey, () => {
  ++binding; heights.clear(); ++revision.value;
  focusId.value = null; dragId.value = null; viewTop.value = 0; schedule();
});
onMounted(() => {
  rowObserver = new ResizeObserver(measured);
  hostObserver = new ResizeObserver(schedule);
  document.addEventListener("visibilitychange", attach);
  attach();
});
onBeforeUnmount(() => {
  alive = false; detach(); nodes.clear(); heights.clear();
  document.removeEventListener("visibilitychange", attach);
});
</script>

<template>
  <div ref="canvas" class="measured-virtual-canvas" :style="{ height: `${offsets[items.length]}px` }"
    @focusin="onFocus" @focusout="onBlur" @dragstart="onDrag" @dragend="endDrag">
    <div v-for="row in visible" :key="row.item.id" :ref="el => setRow(row.item.id, el)"
      class="measured-virtual-row" :data-virtual-id="row.item.id"
      :style="{ transform: `translateY(${offsets[row.index]}px)`, paddingBottom: row.index === items.length - 1 ? '0px' : `${gap}px` }">
      <slot :item="row.item" :index="row.index" />
    </div>
  </div>
</template>

<style scoped>
.measured-virtual-canvas { position: relative; flex: 0 0 auto; width: 100%; min-width: 0; overflow-anchor: none; }
.measured-virtual-row { position: absolute; inset: 0 0 auto; display: flow-root; box-sizing: border-box; }
</style>
