<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted, onBeforeUnmount, onUnmounted } from "vue";
import { groupSelectOptions, parseSelectMemory, restoredScrollTop } from "./select-memory";

export interface CustomSelectOption {
  value: string | number;
  label: string;
  icon?: string;
  disabled?: boolean;
  group?: string;
}

const props = withDefaults(
  defineProps<{
    modelValue: string | number;
    options: (CustomSelectOption | string)[];
    placeholder?: string;
    disabled?: boolean;
    size?: "sm" | "md" | "xs";
    grouped?: boolean;
    memoryKey?: string;
  }>(),
  {
    placeholder: "请选择…",
    disabled: false,
    size: "md"
  }
);

const emit = defineEmits<{
  "update:modelValue": [value: string | number];
  change: [value: string | number];
}>();

const isOpen = ref(false);
const containerRef = ref<HTMLElement | null>(null);
const listRef = ref<HTMLElement | null>(null);
const activeGroup = ref("");
let memory = parseSelectMemory(null);
let restored = false;

function loadMemory() {
  try {
    memory = parseSelectMemory(props.memoryKey ? localStorage.getItem(props.memoryKey) : null);
  } catch { memory = parseSelectMemory(null); }
  activeGroup.value = memory.group;
}
loadMemory();

function rememberPosition(key = props.memoryKey) {
  const list = listRef.value;
  if (!list || !restored) return;
  const rows = [...list.querySelectorAll<HTMLElement>("[data-select-value]")];
  const top = list.getBoundingClientRect().top;
  const anchor = rows.find(row => row.getBoundingClientRect().bottom > top);
  memory.group = activeGroup.value;
  memory.positions[activeGroup.value] = {
    top: list.scrollTop,
    anchor: anchor?.dataset.selectValue,
    offset: anchor ? anchor.getBoundingClientRect().top - top : undefined
  };
  if (key) {
    try { localStorage.setItem(key, JSON.stringify(memory)); } catch { /* Keep in-memory state. */ }
  }
}

async function restorePosition() {
  restored = false;
  await nextTick();
  const list = listRef.value;
  if (!isOpen.value || !list) return;
  const rows = [...list.querySelectorAll<HTMLElement>("[data-select-value]")];
  const position = memory.positions[activeGroup.value];
  const anchor = rows.find(row => row.dataset.selectValue === (position?.anchor ?? String(props.modelValue)));
  const anchorTop = anchor
    ? anchor.getBoundingClientRect().top - list.getBoundingClientRect().top + list.scrollTop
    : undefined;
  list.scrollTop = position
    ? restoredScrollTop(position, anchorTop)
    : Math.max(0, (anchorTop ?? 0) - list.clientHeight / 2);
  // Wait for asynchronous options before treating an empty list as a saved position.
  restored = visibleOptions.value.length > 0;
}

function closeDropdown() {
  rememberPosition();
  isOpen.value = false;
}

async function selectGroup(group: string) {
  if (group === activeGroup.value) return;
  rememberPosition();
  activeGroup.value = group;
  await restorePosition();
  rememberPosition();
}

const normalizedOptions = computed<CustomSelectOption[]>(() => {
  return props.options.map(opt => {
    if (typeof opt === "object" && opt !== null) {
      return opt;
    }
    return { value: opt, label: String(opt) };
  });
});

const groups = computed(() => props.grouped ? groupSelectOptions(normalizedOptions.value) : []);
const visibleOptions = computed(() => activeGroup.value && props.grouped
  ? normalizedOptions.value.filter(option => option.group === activeGroup.value)
  : normalizedOptions.value);

watch(() => props.memoryKey, (_key, previousKey) => {
  rememberPosition(previousKey);
  loadMemory();
  if (isOpen.value) void restorePosition();
});

watch(normalizedOptions, () => {
  if (activeGroup.value && groups.value.length && !groups.value.some(group => group.name === activeGroup.value)) {
    activeGroup.value = "";
  }
  if (isOpen.value) void restorePosition();
}, { flush: "post" });

onBeforeUnmount(() => rememberPosition());

const currentSelected = computed(() => {
  return normalizedOptions.value.find(opt => String(opt.value) === String(props.modelValue));
});

const displayText = computed(() => {
  return currentSelected.value?.label ?? props.placeholder;
});

function toggleDropdown() {
  if (props.disabled) return;
  if (isOpen.value) { closeDropdown(); return; }
  if (normalizedOptions.value.length && activeGroup.value && !groups.value.some(group => group.name === activeGroup.value)) {
    activeGroup.value = "";
  }
  isOpen.value = true;
  void restorePosition();
}

function selectOption(option: CustomSelectOption) {
  if (option.disabled || props.disabled) return;
  closeDropdown();
  if (String(option.value) !== String(props.modelValue)) {
    emit("update:modelValue", option.value);
    emit("change", option.value);
  }
}

function handlePointerDown(e: PointerEvent) {
  if (!isOpen.value || !containerRef.value) return;
  if (!containerRef.value.contains(e.target as Node)) {
    closeDropdown();
  }
}

function handleKeydown(e: KeyboardEvent) {
  if (!isOpen.value) return;
  if (e.key === "Escape") {
    closeDropdown();
  }
}

onMounted(() => {
  document.addEventListener("pointerdown", handlePointerDown, true);
  window.addEventListener("keydown", handleKeydown);
});

onUnmounted(() => {
  document.removeEventListener("pointerdown", handlePointerDown, true);
  window.removeEventListener("keydown", handleKeydown);
});
</script>

<template>
  <div
    ref="containerRef"
    class="lw-custom-select"
    :class="[`size-${size}`, { 'is-open': isOpen, 'is-disabled': disabled }]"
  >
    <button
      type="button"
      class="lw-select-trigger"
      :disabled="disabled"
      :aria-expanded="isOpen"
      @click="toggleDropdown"
    >
      <span v-if="currentSelected?.icon" class="lw-select-icon">{{ currentSelected.icon }}</span>
      <span class="lw-select-label" :class="{ 'is-placeholder': !currentSelected }">
        {{ displayText }}
      </span>
      <span class="lw-select-chevron" aria-hidden="true">▾</span>
    </button>

    <div v-if="isOpen" class="lw-select-dropdown" :class="{ 'is-grouped': grouped }">
      <div v-if="groups.length" class="lw-select-groups" role="group" aria-label="按厂商浏览">
        <button type="button" :aria-pressed="!activeGroup" @click="selectGroup('')">全部 · {{ normalizedOptions.length }}</button>
        <button v-for="group in groups" :key="group.name" type="button"
          :aria-pressed="activeGroup === group.name" @click="selectGroup(group.name)">
          {{ group.name }} · {{ group.count }}
        </button>
      </div>
      <div ref="listRef" class="lw-select-list" role="listbox" @scroll.passive="rememberPosition()">
      <div v-if="!visibleOptions.length" class="lw-select-empty">
        暂无可用选项
      </div>
      <button
        v-for="opt in visibleOptions"
        :key="String(opt.value)"
        type="button"
        class="lw-select-item"
        :class="{
          'is-active': String(opt.value) === String(modelValue),
          'is-disabled': opt.disabled
        }"
        :disabled="opt.disabled"
        :data-select-value="String(opt.value)"
        :title="opt.label"
        role="option"
        :aria-selected="String(opt.value) === String(modelValue)"
        @click="selectOption(opt)"
      >
        <span class="lw-item-content">
          <span v-if="opt.icon" class="lw-item-icon">{{ opt.icon }}</span>
          <span class="lw-item-text">{{ opt.label }}</span>
        </span>
        <span v-if="String(opt.value) === String(modelValue)" class="lw-item-check">✓</span>
      </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.lw-custom-select {
  position: relative;
  display: inline-flex;
  width: 100%;
  box-sizing: border-box;
  font-family: inherit;
}

.lw-select-trigger {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  box-sizing: border-box;
  background: var(--panel, #ffffff);
  border: 1px solid var(--border, rgba(0, 0, 0, 0.12));
  color: var(--heading, #0f172a);
  border-radius: 6px;
  cursor: pointer;
  outline: none;
  font-family: inherit;
  transition: all 0.15s ease;
  user-select: none;
  text-align: left;
}

.size-sm .lw-select-trigger {
  padding: 4px 8px;
  font-size: 11.5px;
  min-height: 28px;
}

.size-md .lw-select-trigger {
  padding: 6px 10px;
  font-size: 12px;
  min-height: 32px;
}

.size-xs .lw-select-trigger {
  padding: 2px 6px;
  font-size: 10.5px;
  min-height: 24px;
}

.lw-select-trigger:hover:not(:disabled) {
  border-color: #0284c7;
}

.lw-custom-select.is-open .lw-select-trigger {
  border-color: #0284c7;
  box-shadow: 0 0 0 2px rgba(2, 132, 199, 0.15);
}

.lw-custom-select.is-disabled .lw-select-trigger {
  opacity: 0.55;
  cursor: not-allowed;
}

.lw-select-icon {
  flex-shrink: 0;
  display: inline-flex;
  font-size: 13px;
}

.lw-select-label {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.lw-select-label.is-placeholder {
  color: var(--muted, #94a3b8);
}

.lw-select-chevron {
  flex-shrink: 0;
  font-size: 10px;
  color: var(--muted, #64748b);
  transition: transform 0.18s ease;
}

.lw-custom-select.is-open .lw-select-chevron {
  transform: rotate(180deg);
}

/* 弹出菜单本体：完全脱离操作系统原生灰框，融入主题 */
.lw-select-dropdown {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  z-index: 1000;
  overflow: hidden;
  background: var(--panel, #ffffff);
  border: 1px solid var(--border, rgba(0, 0, 0, 0.14));
  border-radius: 8px;
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.16), 0 0 0 1px var(--border, rgba(0, 0, 0, 0.04));
  padding: 4px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  box-sizing: border-box;
}

.lw-select-dropdown.is-grouped {
  min-width: min(380px, calc(100vw - 32px));
  max-width: calc(100vw - 32px);
}

.lw-select-list {
  position: relative;
  max-height: 220px;
  overflow-y: auto;
  overscroll-behavior: contain;
  overflow-anchor: none;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.lw-select-item { flex-shrink: 0; }

.lw-select-groups {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  padding: 6px;
  max-height: 112px;
  overflow-y: auto;
  border-bottom: 1px solid var(--border);
}

.lw-select-groups button {
  padding: 4px 7px;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: var(--panel, #ffffff);
  color: var(--text);
  font: inherit;
  font-size: 11px;
  cursor: pointer;
}

.lw-select-groups button[aria-pressed="true"] {
  border-color: var(--accent, #0284c7);
  color: var(--accent, #0284c7);
  font-weight: 600;
}

.lw-select-empty {
  padding: 10px 8px;
  font-size: 11.5px;
  color: var(--muted, #94a3b8);
  text-align: center;
}

.lw-select-item {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 6px 8px;
  border: none;
  background: transparent;
  color: var(--text, #1e293b);
  font-size: 12px;
  font-family: inherit;
  border-radius: 5px;
  cursor: pointer;
  text-align: left;
  outline: none;
  transition: background-color 0.12s ease, color 0.12s ease;
  box-sizing: border-box;
}

.lw-select-item:hover:not(:disabled) {
  background: var(--surface-hover, rgba(0, 0, 0, 0.05));
  color: var(--heading, #0f172a);
}

.lw-select-item.is-active {
  background: rgba(2, 132, 199, 0.08);
  color: #0284c7;
  font-weight: 600;
}

.lw-select-item.is-disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.lw-item-content {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-width: 0;
  overflow: hidden;
}

.lw-item-icon {
  flex-shrink: 0;
}

.lw-item-text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.lw-item-check {
  flex-shrink: 0;
  font-size: 11px;
  font-weight: bold;
  color: #0284c7;
}
</style>
