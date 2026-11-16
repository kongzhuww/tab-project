<script setup lang="ts">
import AppWindowFrame from '../core/AppWindowFrame.vue';
defineOptions({ inheritAttrs:false });
defineProps<{ embedded?:boolean; windowId:string; title:string }>();
const emit=defineEmits<{close:[];minimize:[]}>();
</script>
<template>
  <section v-if="embedded" class="backpack-embedded" aria-label="AI 工作区资料库">
    <header class="backpack-embedded-header"><div><small>LIBRARY</small><h2>资料库</h2><p>集中管理提示词、文章与表情包。</p></div><div class="backpack-embedded-actions"><slot name="header-actions" /></div></header>
    <slot />
  </section>
  <AppWindowFrame v-else v-bind="$attrs" :window-id="windowId" :title="title" @close="emit('close')" @minimize="emit('minimize')">
    <template #header-actions><slot name="header-actions" /></template>
    <slot />
  </AppWindowFrame>
</template>
<style scoped>
.backpack-embedded{height:100%;min-height:0;display:flex;flex-direction:column;overflow:hidden;background:var(--panel,#fff);color:var(--text,#1e293b)}.backpack-embedded-header{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:22px 24px 18px;border-bottom:1px solid var(--border,#e5e7eb);flex-wrap:wrap}.backpack-embedded-header small{color:var(--muted,#94a3b8);font-size:10px;font-weight:700;letter-spacing:.12em}.backpack-embedded-header h2{font-size:20px;margin:3px 0}.backpack-embedded-header p{font-size:12px;color:var(--muted,#94a3b8);margin:0}.backpack-embedded-actions{display:flex;flex-wrap:wrap;gap:8px}@media(max-width:760px){.backpack-embedded-header{padding:14px;gap:8px}.backpack-embedded-header h2{font-size:17px}}
</style>
