<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { renderMessageMarkdown, safeMarkdownFragment } from './message-markdown';
import { imageViewerController } from '../viewers/image-viewer-store';
const props = defineProps<{ content: string }>();
const container = ref<HTMLElement | null>(null);
function render() {
  if (!container.value) return;
  try { container.value.replaceChildren(safeMarkdownFragment(renderMessageMarkdown(props.content || ''))); }
  catch { container.value.textContent = props.content || ''; }
}
function onMarkdownClick(e: MouseEvent) {
  const target = e.target;
  if (!(target instanceof HTMLImageElement)) return;
  if (target.closest('a[href]')) return;
  const src = target.currentSrc || target.getAttribute('src') || '';
  if (!src) return;
  e.preventDefault();
  e.stopPropagation();
  imageViewerController.open(src, target.alt || '图片预览');
}
onMounted(render);
watch(() => props.content, render, { flush: 'post' });
</script>
<template><div ref="container" class="message-markdown" @click="onMarkdownClick" /></template>
<style scoped>
.message-markdown { font-size:13.5px; line-height:1.72; letter-spacing:.005em; white-space:normal; overflow-wrap:anywhere; user-select:text; -webkit-user-select:text; }
.message-markdown :deep(p) { margin:.55em 0; white-space:pre-wrap; }
.message-markdown :deep(p:first-child),.message-markdown :deep(h1:first-child),.message-markdown :deep(h2:first-child),.message-markdown :deep(h3:first-child) { margin-top:0; }
.message-markdown :deep(p:last-child),.message-markdown :deep(ul:last-child),.message-markdown :deep(ol:last-child) { margin-bottom:0; }
.message-markdown :deep(h1),.message-markdown :deep(h2),.message-markdown :deep(h3),.message-markdown :deep(h4) { margin:1.15em 0 .45em; font-weight:650; line-height:1.38; color:inherit; }
.message-markdown :deep(h1) { font-size:1.25em; }.message-markdown :deep(h2) { font-size:1.15em; }.message-markdown :deep(h3),.message-markdown :deep(h4) { font-size:1.04em; }
.message-markdown :deep(ul),.message-markdown :deep(ol) { margin:.5em 0; padding-left:1.55em; }.message-markdown :deep(li) { margin:.25em 0; }
.message-markdown :deep(a) { color:#547cdb; text-decoration:underline; text-underline-offset:2px; }.message-markdown :deep(a:not([href])) { color:inherit; text-decoration:none; }
.message-markdown :deep(code) { padding:.14em .42em; border-radius:5px; border:1px solid var(--border, rgba(115,126,155,.18)); background:var(--surface, rgba(115,126,155,.1)); font: .88em/1.55 ui-monospace,SFMono-Regular,Menlo,monospace; }
.message-markdown :deep(pre) { overflow:auto; white-space:pre; margin:.8em 0; padding:12px 14px; border-radius:10px; border:1px solid var(--border, rgba(115,126,155,.16)); background:var(--surface, rgba(115,126,155,.09)); }.message-markdown :deep(pre code) { padding:0; border:0; background:none; font-size:12.5px; }
.message-markdown :deep(blockquote) { margin:.7em 0; padding:.1em .8em; border-left:3px solid #a9b7d5; color:var(--muted,#708099); }
.message-markdown :deep(table) { display:block; max-width:100%; overflow:auto; border-collapse:collapse; margin:.8em 0; }.message-markdown :deep(th),.message-markdown :deep(td) { padding:6px 10px; border:1px solid var(--border,#e4e8ef); text-align:left; }
.message-markdown :deep(.obs-math-block) { display:flex; justify-content:center; max-width:100%; overflow-x:auto; margin:1em 0; }
.message-markdown :deep(math) { font-family:"Latin Modern Math","Cambria Math","STIX Two Math","Noto Sans Math",serif; }
.message-markdown :deep(img) { max-width:100%; height:auto; border-radius:8px; cursor:zoom-in; transition:transform .15s ease, box-shadow .15s ease; }
.message-markdown :deep(img:hover) { box-shadow:0 4px 16px rgba(15, 23, 42, .16); }
</style>
