<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
import type { LauncherLink } from "./store";
import { launcherService } from "../services/launcher.service";

// 模块级单例内存缓存与持久化已解析有效源：跨组件实例、跨分区切换、跨刷新持久复用
// 只要加载成功过一次，下次 0ms 直出真正可用的那个最终源，杜绝 404 前置源超时导致的空白等待
import { memoryResolvedSources, memoryLoadedSources, rememberIconSource } from "./icon-source-cache";
const LOCAL_RESOLVED_KEY_PREFIX = "lw_resolved_icon:";

function getSavedResolvedSource(url: string): string {
  try {
    return localStorage.getItem(LOCAL_RESOLVED_KEY_PREFIX + url) || "";
  } catch {
    return "";
  }
}

function saveResolvedSource(url: string, src: string): void {
  try {
    localStorage.setItem(LOCAL_RESOLVED_KEY_PREFIX + url, src);
  } catch {}
}

function getSyncCachedDataUrl(url: string): string {
  try {
    return localStorage.getItem("lw_sync_dataurl:" + url) || "";
  } catch {
    return "";
  }
}

// Bitmap persistence is owned by launcherService (async extension storage).
// Existing localStorage bitmaps remain readable for backward compatibility.

const props = withDefaults(
  defineProps<{
    link: LauncherLink;
    mini?: boolean;
  }>(),
  {
    mini: false
  }
);

function hostOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url || "";
  }
}

function originOf(url: string): string {
  try {
    return new URL(url).origin;
  } catch {
    return "";
  }
}

// 纯前端直通 Chrome 官方扩展 Favicon 协议获取高清站点图标
function getChromeFaviconUrl(url: string): string {
  try {
    const win = window as any;
    const cr = typeof win.chrome !== "undefined" ? win.chrome : (globalThis as any).chrome;
    if (typeof cr?.runtime?.getURL === "function") {
      return cr.runtime.getURL("_favicon/?pageUrl=" + encodeURIComponent(url) + "&size=64");
    }
  } catch {}
  return "";
}

const fallbackChar = computed(() => {
  const link = props.link;
  const raw = (link.title || hostOf(link.url)).trim();
  return raw ? raw.slice(0, 1).toUpperCase() : "🔗";
});

const sources = ref<string[]>([]);
const sourceIndex = ref(0);
const isLoaded = ref(false);
const isFailed = ref(false);

const currentSource = computed(() => {
  if (isFailed.value || sourceIndex.value >= sources.value.length) {
    return "";
  }
  return sources.value[sourceIndex.value] || "";
});

function buildSources() {
  const link = props.link;
  if (!link?.url) {
    sources.value = [];
    isFailed.value = true;
    isLoaded.value = false;
    return;
  }

  const list: string[] = [];

  // 0. 离屏 Base64 极速同步秒显 (0ms 读取，彻底杜绝任何网络请求与白屏等待)
  const syncDataUrl = getSyncCachedDataUrl(link.url);
  if (syncDataUrl) {
    list.push(syncDataUrl);
  }

  // 0.1 优先使用已确认成功的有效源 (内存或本地持久化)
  const memorySource = memoryResolvedSources.get(link.url) || getSavedResolvedSource(link.url);
  if (memorySource && !list.includes(memorySource)) {
    list.push(memorySource);
  }

  const isBlockedForeignHost = (u?: string) => {
    if (!u) return false;
    return /google\.com\/s2\/favicons|icons\.duckduckgo\.com|unavatar\.io|icon\.horse/i.test(u);
  };

  // 1. 用户自定义配置图标 (排除已被历史污染的境外挂起死链源)
  if (link.customIcon && !isBlockedForeignHost(link.customIcon)) list.push(link.customIcon);
  if (link.icon && !isBlockedForeignHost(link.icon)) list.push(link.icon);

  // 2. Chrome 原生扩展 Favicon 协议 (零网络开销，本地极速读取)
  const chromeFavicon = getChromeFaviconUrl(link.url);
  if (chromeFavicon && !list.includes(chromeFavicon)) list.push(chromeFavicon);

  // 3. 本地持久化缓存快速秒显 (优先从 LauncherService 获取)
  const cachedData = launcherService.getCachedIcon(link.url);
  if (cachedData && !list.includes(cachedData)) list.push(cachedData);

  // 4. 站点自身域名协议源 (仅当有明确协议主站且非局域网IP时)
  const origin = originOf(link.url);
  if (origin && !origin.startsWith("http://1.") && !origin.startsWith("http://192.") && !origin.startsWith("http://127.")) {
    list.push(`${origin}/favicon.ico`);
  }

  // An explicit selection must win over older resolved/sync caches.
  if (link.customIcon && !isBlockedForeignHost(link.customIcon)) list.unshift(link.customIcon);
  const nextSources = [...new Set(list.filter(Boolean))];
  sources.value = nextSources;
  sourceIndex.value = 0;
  isFailed.value = nextSources.length === 0;

  // 立即检查首选源是否已经就绪：命中持久化 Base64 或已加载缓存，首帧直接 isLoaded = true
  const firstSrc = nextSources[0];
  if (firstSrc && (firstSrc.startsWith("data:") || memoryLoadedSources.has(firstSrc))) {
    isLoaded.value = true;
  }
}

watch(
  () => [props.link?.url, props.link?.icon, props.link?.customIcon],
  (newVal, oldVal) => {
    if (oldVal && newVal[0] === oldVal[0] && newVal[1] === oldVal[1] && newVal[2] === oldVal[2]) {
      return;
    }
    buildSources();
  },
  { immediate: true }
);

onMounted(() => {
  if (sources.value.length === 0) {
    buildSources();
  }
});

function onImageLoad(event: Event) {
  isLoaded.value = true;
  isFailed.value = false;

  const src = currentSource.value;
  if (src) {
    const alreadyLoaded = memoryLoadedSources.has(src);
    const previous = memoryResolvedSources.get(props.link.url);
    rememberIconSource(props.link.url, src);
    if (previous !== src && getSavedResolvedSource(props.link.url) !== src) {
      saveResolvedSource(props.link.url, src);
    }
    const img = event.target as HTMLImageElement | null;
    if (!alreadyLoaded && !src.startsWith("data:")) {
      // Yield the load handler before converting pixels. Only one cache path,
      // not two independent Canvas conversions and storage writes per load.
      const url = props.link.url;
      setTimeout(() => {
        void launcherService.cacheIcon(url, src, img?.getAttribute("src") === src ? img : null);
      }, 0);
    }
  }
}

function onImageError() {
  const failedSrc = currentSource.value;
  if (failedSrc) {
    memoryLoadedSources.delete(failedSrc);
    if (memoryResolvedSources.get(props.link.url) === failedSrc) {
      memoryResolvedSources.delete(props.link.url);
    }
    try {
      localStorage.removeItem(LOCAL_RESOLVED_KEY_PREFIX + props.link.url);
      localStorage.removeItem("lw_sync_dataurl:" + props.link.url);
    } catch {}
  }
  if (failedSrc && launcherService.getCachedIcon(props.link.url) === failedSrc) {
    launcherService.evictCachedIcon(props.link.url);
  }

  if (sourceIndex.value + 1 < sources.value.length) {
    sourceIndex.value += 1;
    const nextSrc = sources.value[sourceIndex.value];
    if (nextSrc && (nextSrc.startsWith("data:") || memoryLoadedSources.has(nextSrc))) {
      isLoaded.value = true;
    }
  } else {
    isFailed.value = true;
    isLoaded.value = false;
  }
}
</script>

<template>
  <span :class="mini ? 'launcher-folder-mini' : 'launcher-favicon'">
    <!-- 仅当全部图片源均尝试失败，或无可用源时，才展示首字母兜底 -->
    <span v-if="isFailed || !currentSource" class="launcher-fallback">
      {{ fallbackChar }}
    </span>
    <!-- 图片始终常态渲染，不挂 opacity:0；命中本地缓存或已解析源时第 0 帧直接呈现，彻底杜绝字母与图像切换闪烁 -->
    <img
      v-else
      :src="currentSource"
      alt=""
      draggable="false"
      referrerpolicy="no-referrer"
      decoding="async"
      style="pointer-events: none; user-select: none;"
      @load="onImageLoad"
      @error="onImageError"
    />
  </span>
</template>

<style scoped>
.launcher-favicon {
  position: relative;
  width: 48px;
  height: 48px;
  display: grid;
  place-items: center;
  overflow: hidden;
  border-radius: 13px;
  background: #ffffff !important;
}
.launcher-favicon img {
  width: 30px !important;
  height: 30px !important;
  object-fit: contain !important;
}
.launcher-folder-mini {
  position: relative;
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  overflow: hidden;
  border-radius: 7px;
  background: #ffffff !important;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08) !important;
}
.launcher-folder-mini img {
  width: 72% !important;
  height: 72% !important;
  max-width: 25px !important;
  max-height: 25px !important;
  object-fit: contain !important;
}
.launcher-folder-mini .launcher-fallback {
  font-size: 11px;
  font-weight: 600;
  color: #334155;
}
</style>
