<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";

export interface CustomSelectOption {
  value: string | number;
  label: string;
  icon?: string;
  disabled?: boolean;
}

const props = withDefaults(
  defineProps<{
    modelValue: string | number;
    options: (CustomSelectOption | string)[];
    placeholder?: string;
    disabled?: boolean;
    size?: "sm" | "md" | "xs";
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

const normalizedOptions = computed<CustomSelectOption[]>(() => {
  return props.options.map(opt => {
    if (typeof opt === "object" && opt !== null) {
      return opt;
    }
    return { value: opt, label: String(opt) };
  });
});

const currentSelected = computed(() => {
  return normalizedOptions.value.find(opt => String(opt.value) === String(props.modelValue));
});

const displayText = computed(() => {
  return currentSelected.value?.label ?? props.placeholder;
});

function toggleDropdown() {
  if (props.disabled) return;
  isOpen.value = !isOpen.value;
}

function selectOption(option: CustomSelectOption) {
  if (option.disabled || props.disabled) return;
  isOpen.value = false;
  if (String(option.value) !== String(props.modelValue)) {
    emit("update:modelValue", option.value);
    emit("change", option.value);
  }
}

function handlePointerDown(e: PointerEvent) {
  if (!isOpen.value || !containerRef.value) return;
  if (!containerRef.value.contains(e.target as Node)) {
    isOpen.value = false;
  }
}

function handleKeydown(e: KeyboardEvent) {
  if (!isOpen.value) return;
  if (e.key === "Escape") {
    isOpen.value = false;
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

    <div v-if="isOpen" class="lw-select-dropdown" role="listbox">
      <div v-if="!normalizedOptions.length" class="lw-select-empty">
        暂无可用选项
      </div>
      <button
        v-for="opt in normalizedOptions"
        :key="String(opt.value)"
        type="button"
        class="lw-select-item"
        :class="{
          'is-active': String(opt.value) === String(modelValue),
          'is-disabled': opt.disabled
        }"
        :disabled="opt.disabled"
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
  max-height: 220px;
  overflow-y: auto;
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
