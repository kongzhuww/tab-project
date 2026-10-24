<script setup lang="ts">
import { nextTick, onBeforeUnmount, ref, watch } from "vue";
import StickerLibrarySettings from "../stickers/StickerLibrarySettings.vue";
import BiliSettingsPanel from "../bilibili/BiliSettingsPanel.vue";
import type { StorageSettingsTarget } from "./store";

const props = defineProps<{ active: boolean; target: StorageSettingsTarget | null; request: number }>();
const root = ref<HTMLElement | null>(null);
let alive = true;
let focusVersion = 0;
watch(() => [props.active, props.target, props.request], async () => {
  const version = ++focusVersion;
  if (!props.active || !props.target) return;
  const target = props.target;
  await nextTick();
  if (!alive || !props.active || version !== focusVersion) return;
  const heading = root.value?.querySelector<HTMLElement>(`[data-storage-target="${target}"]`);
  heading?.scrollIntoView({ block: "nearest" });
  heading?.focus({ preventScroll: true });
}, { immediate: true, flush: "post" });
onBeforeUnmount(() => { alive = false; ++focusVersion; });
</script>

<template>
  <div ref="root" class="storage-settings">
    <p class="hint storage-note">目录选择立即生效，不用再点底部保存。浏览器只提供文件夹名称，不提供完整磁盘路径。</p>
    <section class="storage-group" aria-labelledby="storage-stickers-title">
      <h3 id="storage-stickers-title" data-storage-target="stickers" tabindex="-1">表情包图片文件夹</h3>
      <StickerLibrarySettings :active="props.active" />
    </section>
    <section class="storage-group" aria-labelledby="storage-bili-title">
      <h3 id="storage-bili-title" data-storage-target="bili-cache" tabindex="-1">B站视频缓存目录</h3>
      <BiliSettingsPanel :active="props.active" />
    </section>
  </div>
</template>

<style scoped>
.storage-note { margin:0 0 18px; }
.storage-group + .storage-group { margin-top:22px; }
.storage-group h3 { margin:0 0 10px; color:var(--heading); font-size:14px; font-weight:600; scroll-margin-block:12px; }
.storage-group h3:focus-visible { outline:2px solid var(--accent, var(--text)); outline-offset:4px; }
.storage-knowledge .hint { margin:10px 0 0; }
</style>
