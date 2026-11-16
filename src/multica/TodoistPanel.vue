<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
const props=defineProps<{active:boolean}>();
const emit=defineEmits<{close:[]}>();
const frame=ref<HTMLIFrameElement|null>(null);
function syncVisibility(){frame.value?.contentWindow?.postMessage({type:'tab-todoist-embedded-visibility',visible:props.active},window.location.origin);}
watch(()=>props.active,syncVisibility);
onMounted(syncVisibility);
</script>
<template>
  <section class="todo-panel" aria-label="Todoist 工作区">
    <div class="panel-top"><span>Todoist 工作区 · 修改会同步到 Todoist</span><button type="button" aria-label="关闭 Todoist" @click="emit('close')">✕</button></div>
    <iframe ref="frame" src="todoist-embedded.html" title="Todoist 工作区" @load="syncVisibility"></iframe>
  </section>
</template>
<style scoped>
.todo-panel{display:flex;flex:1;min-height:260px;min-width:0;flex-direction:column;overflow:hidden;border:1px solid var(--border,#e2e8f0);border-radius:12px;background:var(--panel,#fff)}.panel-top{display:flex;justify-content:space-between;align-items:center;gap:10px;padding:7px 12px;border-bottom:1px solid var(--border,#e2e8f0);color:var(--muted,#64748b);font-size:10px}.panel-top button{border:1px solid var(--border,#e2e8f0);border-radius:6px;background:var(--surface,#f8fafc);color:var(--text,#334155);padding:4px 8px;cursor:pointer}.todo-panel iframe{flex:1;width:100%;min-height:0;border:0;background:var(--panel,#fff)}
</style>
