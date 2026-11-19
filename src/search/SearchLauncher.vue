<script setup lang="ts">
import { computed, defineAsyncComponent, nextTick, onMounted, onUnmounted, ref, watch } from "vue";
import SearchBox from "./SearchBox.vue";
import { searchController } from "./store";
import { bindSideDrawerMessages, sideDrawerController, sideDrawerState } from "../sidepanel/drawer-store";
import { useRetainedMount } from "../core/useRetainedMount";

const InPageSideDrawer = defineAsyncComponent(() => import("../sidepanel/InPageSideDrawer.vue"));
const mountSideDrawer = useRetainedMount(() => sideDrawerState.isOpen);
let unbindSideDrawer: (() => void) | undefined;

const now = ref(new Date());
let clockTimer = 0;
const showWallpaper = ref(true);
let mounted = false;
let wallpaperVersion = 0;
async function updateWallpaper(show: boolean) {
  const version = ++wallpaperVersion;
  if (!show) return;
  await nextTick();
  const { WallpaperService } = await import('../services/wallpaper.service');
  if (mounted && showWallpaper.value && version === wallpaperVersion) await WallpaperService.initWallpaper({ fallbackWhenNone: true });
}
function onStorageChanged(changes: Record<string, { newValue?: unknown }>, area: string) {
  if (area !== 'local') return;
  if (changes.showQuickSearchWallpaper) showWallpaper.value = changes.showQuickSearchWallpaper.newValue !== false;
  const background = changes.heroBackground?.newValue as any;
  if (showWallpaper.value && (background === 'none' || background?.type === 'none')) void updateWallpaper(true);
}
watch(showWallpaper, show => { if (mounted) void updateWallpaper(show); });

const greeting = computed(() => {
  const h = now.value.getHours();
  return h >= 5 && h < 9 ? "早上好" : h >= 9 && h < 12 ? "上午好" : h >= 12 && h < 14 ? "中午好"
    : h >= 14 && h < 18 ? "下午好" : h >= 18 && h < 23 ? "晚上好" : h >= 23 || h < 5 ? "夜深了" : "你好";
});
const clock = computed(() => `${String(now.value.getHours()).padStart(2, "0")}:${String(now.value.getMinutes()).padStart(2, "0")}`);
const seconds = computed(() => `:${String(now.value.getSeconds()).padStart(2, "0")}`);
const dateText = computed(() => `${now.value.getFullYear()}年${now.value.getMonth() + 1}月${now.value.getDate()}日 · ${["周日", "周一", "周二", "周三", "周四", "周五", "周六"][now.value.getDay()]}`);

function tick(): void {
  if (!document.hidden) now.value = new Date();
}

function onKeyDown(event: KeyboardEvent): void {
  if (event.altKey && event.key.toLowerCase() === "h") {
    event.preventDefault();
    location.href = "newtab.html";
  }
}

onMounted(() => {
  mounted = true;
  unbindSideDrawer = bindSideDrawerMessages();
  if (typeof chrome !== 'undefined' && chrome.storage?.local) {
    chrome.storage.onChanged.addListener(onStorageChanged);
    void chrome.storage.local.get('showQuickSearchWallpaper').then((values: Record<string, unknown>) => {
      if (!mounted) return;
      showWallpaper.value = values.showQuickSearchWallpaper !== false;
      if (showWallpaper.value) void updateWallpaper(true);
    });
  } else void updateWallpaper(true);
  clockTimer = window.setInterval(tick, 1000);
  document.addEventListener("visibilitychange", tick);
  window.addEventListener("keydown", onKeyDown);
  void nextTick(() => {
    searchController.focus();
  });
});

onUnmounted(() => {
  mounted = false;
  unbindSideDrawer?.();
  sideDrawerController.close();
  wallpaperVersion++;
  if (typeof chrome !== 'undefined' && chrome.storage?.onChanged) chrome.storage.onChanged.removeListener(onStorageChanged);
  clearInterval(clockTimer);
  document.removeEventListener("visibilitychange", tick);
  window.removeEventListener("keydown", onKeyDown);
});
</script>

<template>
  <div v-if="showWallpaper" id="hero-background-media" class="quick-wallpaper" aria-hidden="true"></div>
  <div class="sub-newtab-center">
    <div class="hero-clock">
      <p id="greeting">{{ greeting }}</p>
      <p id="clock" class="clock">{{ clock }}<span id="secs">{{ seconds }}</span></p>
      <p id="date" class="date">{{ dateText }}</p>
    </div>

    <form id="search" class="search" @submit.prevent>
      <SearchBox />
    </form>
  </div>
  <InPageSideDrawer v-if="mountSideDrawer" />
</template>
