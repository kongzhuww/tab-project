<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from "vue";
const props = withDefaults(defineProps<{ anchor: HTMLElement | null; label: string; visible?: boolean }>(), { visible: true });
const emit = defineEmits<{ close: [] }>();
const position = ref({ top: "0px", left: "0px", maxHeight: "70vh", visibility: "hidden" as "hidden" | "visible" });
const panel = ref<HTMLElement | null>(null);
function place() {
  if (!props.visible || !props.anchor || !panel.value) return;
  const rect = props.anchor.getBoundingClientRect();
  const width = panel.value.offsetWidth;
  const height = panel.value.offsetHeight;
  const margin = 8;
  const below = window.innerHeight - rect.bottom - margin * 2;
  const above = rect.top - margin * 2;
  const useBelow = below >= Math.min(height, 280) || below >= above;
  const maxHeight = Math.max(60, useBelow ? below : above);
  position.value = {
    left: `${Math.max(margin, Math.min(rect.right - width, window.innerWidth - width - margin))}px`,
    top: `${Math.max(margin, useBelow ? rect.bottom + margin : rect.top - Math.min(height, maxHeight) - margin)}px`,
    maxHeight: `${maxHeight}px`, visibility: "visible"
  };
}
function onKey(event: KeyboardEvent) {
  if (props.visible && event.key === "Escape" && panel.value?.contains(event.target as Node)) {
    event.stopPropagation();
    emit("close");
    props.anchor?.focus();
  }
}
let observer: ResizeObserver | undefined;
let mounted = false;
function stopTracking() {
  observer?.disconnect();
  observer = undefined;
  window.removeEventListener("resize", place);
  window.removeEventListener("scroll", place, true);
}
function startTracking() {
  stopTracking();
  if (!mounted || !props.visible) return;
  place();
  observer = new ResizeObserver(place);
  if (panel.value) observer.observe(panel.value);
  if (props.anchor) observer.observe(props.anchor);
  window.addEventListener("resize", place);
  window.addEventListener("scroll", place, true);
}
watch(() => props.visible, () => startTracking(), { flush: "post" });
onMounted(() => { mounted = true; startTracking(); });
onBeforeUnmount(() => { mounted = false; stopTracking(); });
</script>
<template>
  <Teleport to="body">
    <aside v-show="visible" ref="panel" class="module-settings-panel" :style="position" :aria-label="label" @keydown="onKey">
      <slot />
    </aside>
  </Teleport>
</template>
<style scoped>
.module-settings-panel { position:fixed; z-index:10050; width:360px; max-width:calc(100vw - 16px); overflow:auto; box-sizing:border-box; border:1px solid var(--border, #ddd); border-radius:10px; background:var(--panel, #fff); color:var(--text, #222); box-shadow:0 4px 14px #0002; }
</style>
