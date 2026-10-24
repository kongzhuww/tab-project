<script setup lang="ts">
import { nextTick, onMounted, onBeforeUnmount, ref, watch } from "vue";

// Behaviour only: caller retains its existing class, dimensions and persistence logic.
const props = defineProps<{ modelValue: string; busy?: boolean; revision?: number }>();
const emit = defineEmits<{
  "update:modelValue": [value: string];
  commit: [];
  cancel: [];
}>();
const input = ref<HTMLInputElement | null>(null);
let composing = false;
let settled = false;
let disposed = false;
watch(() => props.revision, () => { settled = false; });

function update(event: Event) {
  emit("update:modelValue", (event.target as HTMLInputElement).value);
}
function commit() {
  if (settled || composing || disposed || props.busy) return;
  settled = true;
  emit("commit");
}
function onKey(event: KeyboardEvent) {
  // Enter/Escape belongs to the IME while its candidate list is open.
  if (composing || event.isComposing || event.keyCode === 229) return;
  if (props.busy) {
    if (event.key === "Enter" || event.key === "Escape") { event.preventDefault(); event.stopPropagation(); }
    return;
  }
  if (event.key === "Enter") {
    event.preventDefault(); event.stopPropagation(); commit();
  } else if (event.key === "Escape") {
    event.preventDefault(); event.stopPropagation();
    settled = true;
    emit("cancel");
  }
}
function startComposition() { composing = true; }
function endComposition() {
  composing = false;
  // Some engines deliver the final input after compositionend.
  void nextTick(() => {
    if (!disposed && input.value && document.activeElement !== input.value) commit();
  });
}
onMounted(() => {
  input.value?.focus();
  input.value?.select();
});
onBeforeUnmount(() => { disposed = true; });
</script>

<template>
  <input
    ref="input"
    type="text"
    :value="props.modelValue"
    :readonly="props.busy"
    :aria-busy="props.busy || undefined"
    @input="update"
    @compositionstart="startComposition"
    @compositionend="endComposition"
    @keydown="onKey"
    @blur="commit"
  />
</template>
