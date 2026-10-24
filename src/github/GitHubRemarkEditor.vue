<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue";
import { remarkEditor as draft, saveRemark, cancelRemark, inspectSavedRemark } from "./remark-editor";
const props = defineProps<{ active: boolean }>();
const input = ref<HTMLInputElement | null>(null);
onMounted(() => { void nextTick(() => { if (props.active && !draft.busy) input.value?.focus(); }); });
</script>

<template>
  <div class="gh-inline-remark-box" style="flex-wrap:wrap;max-width:100%" @click.stop>
    <input ref="input" v-model="draft.text" class="gh-inline-remark-input" type="text" maxlength="100"
      aria-label="手写仓库备注" placeholder="备注说明…" :disabled="draft.busy || !active"
      @keydown.enter.prevent="!$event.isComposing && active && saveRemark()"
      @keydown.esc.prevent.stop="!$event.isComposing && active && cancelRemark()">
    <button type="button" class="gh-inline-remark-btn save" title="保存备注" :disabled="draft.busy || !active" @click="saveRemark">✓</button>
    <button type="button" class="gh-inline-remark-btn cancel" title="取消草稿" :disabled="draft.busy || !active" @click="cancelRemark">✕</button>
    <button type="button" :disabled="draft.busy || !active" @click="inspectSavedRemark">读取已保存值</button>
    <p v-if="draft.storedValue !== null" style="width:100%;white-space:pre-wrap;overflow-wrap:anywhere">已保存值：{{ draft.storedValue || "（空）" }}</p>
  </div>
</template>
