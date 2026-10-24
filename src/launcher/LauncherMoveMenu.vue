<script setup lang="ts">
import { computed, onUnmounted, watch } from 'vue';
// Extracted from LauncherMenus: same wrapper, side flyout, skin and hover delay.
const props = withDefaults(defineProps<{
  open: boolean; visible: boolean; disabled?: boolean;
  items: { id: string; name: string; disabled?: boolean }[];
  x: number; y: number; verticalBudget?: number;
  buttonId?: string; submenuId?: string; label?: string; title?: string; emptyText?: string;
}>(), { disabled: false, verticalBudget: 240, label: '移动到', emptyText: '暂无其他分组' });
const emit = defineEmits<{ 'update:open': [open: boolean]; select: [id: string] }>();
let timer: ReturnType<typeof setTimeout> | undefined;
const flyoutClasses = computed(() => ({
  'open-left': props.x + 196 + 220 > window.innerWidth,
  'open-up': props.y + props.verticalBudget > window.innerHeight
}));
function clearTimer() { clearTimeout(timer); timer = undefined; }
function openFlyout() { clearTimer(); if (props.visible && !props.disabled) emit('update:open', true); }
function closeFlyout() { clearTimer(); timer = setTimeout(() => { emit('update:open', false); timer = undefined; }, 280); }
function toggle() { clearTimer(); if (!props.disabled) emit('update:open', !props.open); }
function select(id: string) { clearTimer(); emit('update:open', false); emit('select', id); }
watch(() => [props.open, props.visible, props.disabled], () => {
  if (!props.open || !props.visible || props.disabled) clearTimer();
  if ((!props.visible || props.disabled) && props.open) emit('update:open', false);
});
onUnmounted(clearTimer);
</script>

<template>
  <div class="folder-menu-sub-wrapper" :class="{ open }" @mouseenter="openFlyout" @mouseleave="closeFlyout">
    <button :id="buttonId" type="button" class="folder-menu-has-sub" :disabled="disabled" :title="title" @click.stop="toggle">
      <span>{{ label }}</span><span class="folder-menu-arrow">›</span>
    </button>
    <div :id="submenuId" class="folder-submenu" :class="flyoutClasses" role="menu" :hidden="!open" @mouseenter="openFlyout" @mouseleave="closeFlyout" @wheel.stop>
      <span v-if="!items.length" class="folder-submenu-empty">{{ emptyText }}</span>
      <button v-for="item in items" :key="item.id" class="folder-submenu-item" type="button" :disabled="item.disabled || disabled" :title="item.name" @click.stop="select(item.id)">
        <span class="folder-submenu-icon">📁</span><span class="folder-submenu-text">{{ item.name }}</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.folder-submenu-item { flex-shrink: 0; }
.folder-submenu-text { min-width: 0; }
.folder-submenu-empty { padding: 8px 10px; font-size: 11px; color: var(--dim, var(--muted)); text-align: center; }
</style>
