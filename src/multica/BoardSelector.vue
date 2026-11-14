<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue';
export interface BoardOption { id: string; label: string; group?: string }
const props = defineProps<{ options: BoardOption[]; selected: string; disabled?: boolean }>();
const emit = defineEmits<{ select: [id: string] }>();
const open = ref(false);
const root = ref<HTMLElement | null>(null), trigger = ref<HTMLButtonElement | null>(null);
function close(focus = false) { open.value = false; if (focus) void nextTick(() => trigger.value?.focus()); }
function choose(id: string) { close(true); emit('select', id); }
function outside(event: PointerEvent) { if (root.value && !root.value.contains(event.target as Node)) close(); }
function focusout(event: FocusEvent) { if (root.value && !root.value.contains(event.relatedTarget as Node | null)) close(); }
function openKeyboard() { open.value = true; void nextTick(() => root.value?.querySelector<HTMLButtonElement>('[role="menuitemradio"]')?.focus()); }
function menuKey(event: KeyboardEvent) {
  if (!['ArrowDown','ArrowUp','Home','End'].includes(event.key)) return;
  event.preventDefault(); const items = Array.from(root.value?.querySelectorAll<HTMLButtonElement>('[role="menuitemradio"]') || []);
  if (!items.length) return; const i = items.indexOf(document.activeElement as HTMLButtonElement);
  items[event.key === 'Home' ? 0 : event.key === 'End' ? items.length - 1 : event.key === 'ArrowDown' ? (i + 1) % items.length : (i <= 0 ? items.length - 1 : i - 1)]?.focus();
}
onMounted(() => document.addEventListener('pointerdown', outside));
onBeforeUnmount(() => document.removeEventListener('pointerdown', outside));
</script>
<template>
  <div ref="root" class="board-selector" @focusout="focusout" @keydown.esc.stop.prevent="close(true)">
    <button ref="trigger" type="button" class="board-trigger" :disabled="disabled || !props.options.length" :aria-expanded="open" aria-haspopup="menu" @click="open=!open" @keydown.down.prevent="openKeyboard">⚙ 切换板块</button>
    <div v-if="open" role="menu" aria-label="选择板块" class="board-menu" @keydown="menuKey"><button v-for="option in options" :key="option.id" type="button" role="menuitemradio" :aria-checked="option.id === selected" :class="{chosen:option.id === selected}" @click="choose(option.id)"><span class="option-label">{{ option.label }}<small v-if="option.group">{{ option.group }}</small></span><span v-if="option.id === selected">✓</span></button></div>
  </div>
</template>
<style scoped>
.board-selector { position:relative; flex:none; }.board-trigger { border:1px solid var(--border,#e2e5eb); border-radius:6px; background:var(--panel,#fff); color:#b57135; padding:5px 8px; font:inherit; font-size:11px; cursor:pointer; }.board-trigger:disabled { opacity:.5; cursor:not-allowed; }.board-trigger:focus-visible,.board-menu button:focus-visible { outline:2px solid #80bbef; outline-offset:1px; }.board-menu { position:absolute; z-index:15; top:calc(100% + 6px); right:0; width:260px; max-width:75vw; max-height:310px; overflow:auto; padding:5px; border:1px solid var(--border,#e2e6ed); border-radius:9px; background:var(--panel,#fff); box-shadow:0 8px 24px #17243b24; }.board-menu button { display:flex; justify-content:space-between; align-items:center; gap:8px; width:100%; padding:8px 9px; text-align:left; color:var(--text,#26334b); background:transparent; border:0; border-radius:6px; font:inherit; font-size:12px; cursor:pointer; }.board-menu button:hover,.board-menu button.chosen { background:rgba(111,103,232,.09); }.option-label { min-width:0; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }.option-label small { display:block; color:#a0adbd; font-size:10px; }
</style>
