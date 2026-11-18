<script setup lang="ts">
import AppWindowFrame from '../core/AppWindowFrame.vue';
defineOptions({ inheritAttrs:false });
defineProps<{ embedded?:boolean; windowId:string; title:string }>();
const emit=defineEmits<{close:[];minimize:[]}>();
</script>
<template>
  <section v-if="embedded" class="backpack-embedded" aria-label="AI 工作区资料库">
    <header class="backpack-embedded-header">
      <div class="backpack-embedded-brand">
        <h2>资料库</h2>
        <slot name="header-tabs" />
      </div>
      <div class="backpack-embedded-actions"><slot name="header-actions" /></div>
    </header>
    <slot />
  </section>
  <AppWindowFrame v-else v-bind="$attrs" :window-id="windowId" :title="title" @close="emit('close')" @minimize="emit('minimize')">
    <template #header-actions><slot name="header-actions" /></template>
    <slot />
  </AppWindowFrame>
</template>
<style scoped>
.backpack-embedded{height:100%;min-height:0;display:flex;flex-direction:column;overflow:hidden;background:transparent;color:var(--text,#1e293b)}
.backpack-embedded-header{display:flex;align-items:center;justify-content:space-between;gap:14px;padding:18px 24px 14px;border-bottom:1px solid var(--border,#e5e8ef);flex-wrap:wrap;flex:none}
.backpack-embedded-brand{display:flex;align-items:center;gap:16px;flex-wrap:wrap;min-width:0}
.backpack-embedded-header h2{font-size:18px;font-weight:600;letter-spacing:-.01em;margin:0;color:var(--heading,#0f172a)}
.backpack-embedded-actions{display:flex;align-items:center;flex-wrap:wrap;gap:8px}
@media(max-width:760px){.backpack-embedded-header{padding:14px;gap:10px}.backpack-embedded-header h2{font-size:16px}}
</style>
