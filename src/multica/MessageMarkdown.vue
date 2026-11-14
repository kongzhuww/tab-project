<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { renderMessageMarkdown, safeMarkdownFragment } from './message-markdown';
const props = defineProps<{ content: string }>();
const container = ref<HTMLElement | null>(null);
function render() {
  if (!container.value) return;
  try { container.value.replaceChildren(safeMarkdownFragment(renderMessageMarkdown(props.content || ''))); }
  catch { container.value.textContent = props.content || ''; }
}
onMounted(render);
watch(() => props.content, render, { flush: 'post' });
</script>
<template><div ref="container" class="message-markdown" /></template>
<style scoped>
.message-markdown { line-height:1.75; white-space:normal; overflow-wrap:anywhere; user-select:text; -webkit-user-select:text; }
.message-markdown :deep(p) { margin:.55em 0; white-space:pre-wrap; }
.message-markdown :deep(p:first-child),.message-markdown :deep(h1:first-child),.message-markdown :deep(h2:first-child),.message-markdown :deep(h3:first-child) { margin-top:0; }
.message-markdown :deep(p:last-child),.message-markdown :deep(ul:last-child),.message-markdown :deep(ol:last-child) { margin-bottom:0; }
.message-markdown :deep(h1),.message-markdown :deep(h2),.message-markdown :deep(h3),.message-markdown :deep(h4) { margin:1.1em 0 .45em; line-height:1.4; color:inherit; }
.message-markdown :deep(h1) { font-size:1.3em; }.message-markdown :deep(h2) { font-size:1.2em; }.message-markdown :deep(h3),.message-markdown :deep(h4) { font-size:1.08em; }
.message-markdown :deep(ul),.message-markdown :deep(ol) { margin:.5em 0; padding-left:1.7em; }.message-markdown :deep(li) { margin:.2em 0; }
.message-markdown :deep(a) { color:#547cdb; text-decoration:underline; text-underline-offset:2px; }.message-markdown :deep(a:not([href])) { color:inherit; text-decoration:none; }
.message-markdown :deep(code) { padding:.12em .35em; border-radius:4px; background:rgba(115,126,155,.12); font: .92em/1.6 ui-monospace,SFMono-Regular,Menlo,monospace; }
.message-markdown :deep(pre) { overflow:auto; white-space:pre; margin:.8em 0; padding:12px; border-radius:8px; background:rgba(115,126,155,.1); }.message-markdown :deep(pre code) { padding:0; background:none; }
.message-markdown :deep(blockquote) { margin:.7em 0; padding:.1em .8em; border-left:3px solid #a9b7d5; color:var(--muted,#708099); }
.message-markdown :deep(table) { display:block; max-width:100%; overflow:auto; border-collapse:collapse; margin:.8em 0; }.message-markdown :deep(th),.message-markdown :deep(td) { padding:6px 10px; border:1px solid var(--border,#e4e8ef); text-align:left; }
.message-markdown :deep(math[display="block"]) { display:block; max-width:100%; overflow-x:auto; margin:1em 0; }
</style>
