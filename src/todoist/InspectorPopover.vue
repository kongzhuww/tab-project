<template>
  <div ref="panel" popover="auto" class="inspector-popover" :style="position" @toggle="onToggle"><slot /></div>
</template>
<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick, watch } from 'vue';
import { todoistModuleState } from './module-state';
const props = defineProps<{ anchor: HTMLElement | null }>();
const emit = defineEmits<{ close: [] }>();
const panel = ref<HTMLElement | null>(null);
watch(() => todoistModuleState.active, active => { if (!active) { panel.value?.hidePopover(); emit('close'); } });
const position = ref<Record<string, string>>({ visibility: 'hidden' });
function place() {
  const el = panel.value, anchor = props.anchor;
  if (!el || !anchor?.isConnected) { emit('close'); return; }
  const r = anchor.getBoundingClientRect();
  const w = Math.min(280, window.innerWidth - 24);
  const h = Math.min(el.scrollHeight + 2, window.innerHeight - 24);
  const left = r.right + w + 8 <= window.innerWidth - 12 ? r.right + 8 : Math.max(12, r.left - w - 8);
  position.value = { position: 'fixed', margin: '0', inset: 'auto', left: `${left}px`, top: `${Math.max(12, Math.min(r.top, window.innerHeight - h - 12))}px`, width: `${w}px`, maxHeight: `${window.innerHeight - 24}px`, visibility: 'visible' };
}
function onToggle(e: Event) { if ((e as ToggleEvent).newState === 'closed') emit('close'); }
onMounted(async () => {
  await nextTick(); panel.value?.showPopover(); place();
  window.addEventListener('resize', place); window.addEventListener('scroll', place, true);
});
onUnmounted(() => { window.removeEventListener('resize', place); window.removeEventListener('scroll', place, true); });
</script>
<style scoped>
.inspector-popover { box-sizing: border-box; padding: 8px; border: 1px solid var(--border); border-radius: 10px; background: var(--panel); color: var(--text); box-shadow: 0 8px 28px #0002; overflow: auto; font: 13px/1.5 var(--font-family, 'Segoe UI', sans-serif); }
.inspector-popover::backdrop { background: transparent; pointer-events: none; }
</style>
