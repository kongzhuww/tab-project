<script setup lang="ts">
import { ref, watch, onBeforeUnmount, onMounted } from "vue";
import { getConfiguredCacheDirectory, saveConfiguredCacheDirectory, type CacheDirectoryHandle } from "./cache-directory";

const props = defineProps<{ active: boolean }>();
const busy = ref(false);
const loading = ref(false);
const message = ref("");
const isError = ref(false);
const directory = ref<CacheDirectoryHandle | null>(null);
const directoryName = ref("尚未选择缓存目录");
let alive = true;
let readVersion = 0;

async function readDirectory() {
  if (!props.active || busy.value) return;
  const version = ++readVersion;
  loading.value = true;
  try {
    const handle = await getConfiguredCacheDirectory();
    if (!alive || version !== readVersion) return;
    directory.value = handle;
    directoryName.value = handle?.name || "尚未选择缓存目录";
  } catch {
    if (alive && version === readVersion) {
      directory.value = null;
      directoryName.value = "缓存目录读取失败，请重试";
    }
  } finally {
    if (alive && version === readVersion) loading.value = false;
  }
}

async function chooseDirectory() {
  if (busy.value || !props.active) return;
  const picker = (window as any).showDirectoryPicker;
  if (typeof picker !== "function") {
    message.value = "当前浏览器不支持目录选择，请使用支持此功能的 Edge 或 Chrome。";
    isError.value = true;
    return;
  }
  ++readVersion;
  loading.value = false;
  busy.value = true;
  message.value = "";
  try {
    // Invoke directly from the click: do not spend the user gesture on an async read first.
    const handle: CacheDirectoryHandle = await picker.call(window, {
      id: "logicweaver-bili-cache", mode: "readwrite", startIn: directory.value || "videos"
    });
    await saveConfiguredCacheDirectory(handle);
    if (!alive) return;
    directory.value = handle;
    directoryName.value = handle.name;
    isError.value = false;
    message.value = "目录已保存，新缓存将存入这里；已有视频不会移动或删除。";
  } catch (error: any) {
    if (alive && error?.name !== "AbortError") {
      isError.value = true;
      message.value = "目录选择或保存未确认，请重读目录核对后再试。";
    }
  } finally { if (alive) busy.value = false; }
}

watch(() => props.active, active => {
  if (active) void readDirectory();
  else ++readVersion;
}, { immediate: true });
onMounted(() => window.addEventListener("focus", readDirectory));
onBeforeUnmount(() => {
  alive = false;
  ++readVersion;
  window.removeEventListener("focus", readDirectory);
});
</script>

<template>
  <div class="settings-subgroup bili-cache-settings" :aria-busy="busy || loading">
    <div class="field full-width">
      <p class="cache-directory-name">{{ loading ? '正在读取缓存目录…' : directoryName }}</p>
      <div class="cache-directory-actions">
        <button type="button" class="btn-secondary" :disabled="!props.active || busy || loading" @click="chooseDirectory">{{ busy ? '正在保存…' : '选择或重新授权目录' }}</button>
        <button type="button" class="btn-secondary" :disabled="!props.active || busy || loading" @click="readDirectory">重读目录</button>
      </div>
      <p class="hint">仅更改之后的缓存位置；新缓存保留原目录关联，旧版记录需选择其实际所在目录后播放。不会自动扫描或搬移已有文件。</p>
      <p v-if="message" class="hint cache-directory-message" :class="{ 'is-error': isError }" role="status">{{ message }}</p>
    </div>
  </div>
</template>

<style scoped>
.cache-directory-name { margin:8px 0 12px; color:var(--text); overflow-wrap:anywhere; }
.cache-directory-actions { display:flex; flex-wrap:wrap; gap:8px; }
.cache-directory-message.is-error { color:var(--danger, var(--text)); }
</style>
