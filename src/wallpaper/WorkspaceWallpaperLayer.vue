<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import type { useWorkspaceWallpaper } from './workspace-wallpaper';
const props = defineProps<{ media: ReturnType<typeof useWorkspaceWallpaper>['media']['value'] }>();
const frame = ref<HTMLIFrameElement | null>(null);
const sandboxUrl = typeof chrome !== 'undefined' && chrome.runtime?.getURL ? chrome.runtime.getURL('wallpaper-sandbox.html') : 'wallpaper-sandbox.html';
const pack = computed(() => props.media?.kind === 'web' ? props.media.pack : undefined);
let retry: ReturnType<typeof setInterval> | undefined;
function deliver() { if (pack.value && frame.value?.contentWindow) frame.value.contentWindow.postMessage(pack.value, '*'); }
function loaded() {
  if (retry) clearInterval(retry);
  deliver();
  let count = 0;
  retry = setInterval(() => { if (++count > 5) { clearInterval(retry); retry = undefined; } else deliver(); }, 80);
}
function onMessage(event: MessageEvent) {
  if (event.source !== frame.value?.contentWindow) return;
  if (event.data?.type === 'WE_SANDBOX_READY') deliver();
  if (event.data?.type === 'WE_SANDBOX_ACK' && retry) { clearInterval(retry); retry = undefined; }
}
watch(pack, () => { if (retry) clearInterval(retry); retry = undefined; deliver(); });
onMounted(() => window.addEventListener('message', onMessage));
onBeforeUnmount(() => { if (retry) clearInterval(retry); window.removeEventListener('message', onMessage); });
</script>
<template>
  <div v-if="media" class="workspace-wallpaper-layer" aria-hidden="true">
    <img v-if="media.kind === 'image'" :src="media.src" alt="">
    <video v-else-if="media.kind === 'video'" :src="media.src" autoplay loop muted playsinline></video>
    <iframe v-else-if="media.kind === 'web'" ref="frame" :src="sandboxUrl" title="工作区壁纸" allow="autoplay" tabindex="-1" @load="loaded"></iframe>
    <div v-else-if="media.kind === 'css'" class="workspace-wallpaper-fill" :style="{ background: media.background }"></div>
  </div>
</template>
<style scoped>
.workspace-wallpaper-layer { position:absolute; inset:0; z-index:0; overflow:hidden; pointer-events:none; }
.workspace-wallpaper-layer img,.workspace-wallpaper-layer video,.workspace-wallpaper-layer iframe,.workspace-wallpaper-fill { display:block; width:100%; height:100%; border:0; object-fit:cover; }
.workspace-wallpaper-layer::after { content:''; position:absolute; inset:0; background:color-mix(in srgb,var(--panel) 60%,transparent); }
</style>
