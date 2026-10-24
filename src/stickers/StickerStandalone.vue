<script setup lang="ts">
import { onMounted, onUnmounted, ref, defineAsyncComponent } from "vue";
const SettingsDialog = defineAsyncComponent(() => import("../settings/SettingsDialog.vue"));
const AppPromptModal = defineAsyncComponent(() => import("../core/AppPromptModal.vue"));
import StickerBoard from "./StickerBoard.vue";
import { stickersService } from "../services/stickers.service";
import { withStickersWrite } from "./module-state";
import { saveQuickLink, getActiveWebTab, isWebTab } from "../services/quick-links-export.service";

declare const chrome: any;
type PageImage = { url: string; width: number; height: number; alt: string };
const sidepanel = document.body.dataset.mode === "sidepanel";
const images = ref<PageImage[]>([]);
const scanStatus = ref("等待扫描");
const notice = ref("");
const noticeBad = ref(false);
let noticeTimer = 0;
function showNotice(text: string, bad = false): void {
  notice.value = text;
  noticeBad.value = bad;
  clearTimeout(noticeTimer);
  noticeTimer = window.setTimeout(() => { notice.value = ""; }, 2800);
}
onMounted(() => { stickersService.onToast = showNotice; });
onUnmounted(() => { stickersService.onToast = undefined; clearTimeout(noticeTimer); });
function openManager(): void { location.href = "stickers.html"; }
async function bookmarkPage(): Promise<void> {
  try {
    const tab = await getActiveWebTab();
    if (!isWebTab(tab)) throw new Error("当前标签页不是普通网页");
    const result = await saveQuickLink(tab!);
    showNotice(result.ok ? "已保存到常用网站" : result.error || "保存失败", !result.ok);
  } catch (error: any) { showNotice(error?.message || "保存失败", true); }
}
async function scanPage(): Promise<void> {
  scanStatus.value = "正在扫描…";
  images.value = [];
  try {
    const tab = await getActiveWebTab();
    if (!isWebTab(tab) || !tab?.id) throw new Error("当前标签页不是普通网页");
    const result = await chrome.scripting.executeScript({ target: { tabId: tab.id }, func: () =>
      [...document.images]
        .map((image) => ({ url: image.currentSrc || image.src,
          width: image.naturalWidth || image.width, height: image.naturalHeight || image.height, alt: image.alt || "" }))
        .filter((item) => item.url && !item.url.startsWith("blob:") && item.width >= 32 && item.height >= 32)
        .filter((item, index, all) => all.findIndex((other) => other.url === item.url) === index)
        .sort((a, b) => b.width * b.height - a.width * a.height).slice(0, 80)
    });
    images.value = result?.[0]?.result || [];
    scanStatus.value = `${images.value.length} 张 · 点击保存`;
  } catch (error: any) { scanStatus.value = "扫描失败"; showNotice(error?.message || "无法扫描当前页", true); }
}
async function saveImage(image: PageImage): Promise<void> {
  try {
    const result = await withStickersWrite(() => stickersService.saveImageToFavoritesAny({ url: image.url }));
    if (!result.ok) throw new Error(result.error);
    showNotice("图片已保存到当前图库");
  }
  catch (error: any) { showNotice(error?.message || "保存图片失败", true); }
}
</script>

<template>
  <main class="sticker-app">
    <nav v-if="sidepanel" class="sticker-side-nav"><a href="sidepanel.html">← 工具首页</a><span>表情包</span></nav>
    <StickerBoard />
    <div v-if="sidepanel" class="sticker-side-tools">
      <button type="button" @click="openManager">完整工具 ↗</button>
      <button type="button" @click="bookmarkPage">☆ 保存网页到常用网站</button>
    </div>
    <section v-if="sidepanel" class="sticker-page-section"><header><div><strong>当前网页图片</strong><span>{{ scanStatus }}</span></div><button type="button" @click="scanPage">扫描当前页</button></header>
      <div class="sticker-page-grid"><div v-if="scanStatus.endsWith('0 张 · 点击保存')" class="sticker-empty">当前页面没有可收集的图片</div>
        <button v-for="image in images" :key="image.url" type="button" class="sticker-page-image" :title="image.alt || image.url" @click="saveImage(image)"><img :src="image.url" loading="lazy" alt="" /><i>{{ image.width }}×{{ image.height }}</i></button>
      </div>
    </section>
  </main>
  <SettingsDialog />
  <AppPromptModal />
  <div id="sticker-toast" class="sticker-toast" :class="{ bad: noticeBad }" :hidden="!notice">{{ notice }}</div>
</template>

<style scoped>
.sticker-app {
  width: 100%;
  box-sizing: border-box;
  padding: 0;
}
.sticker-side-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  background: var(--panel, #111827);
  border-bottom: 1px solid var(--border, #334155);
  font-size: 11.5px;
  box-sizing: border-box;
}
.sticker-side-nav a {
  color: #38bdf8;
  text-decoration: none;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  transition: opacity 0.15s ease;
}
.sticker-side-nav a:hover {
  opacity: 0.85;
}
.sticker-side-nav span {
  color: var(--muted, #94a3b8);
  font-weight: 500;
  font-size: 10.5px;
}
.sticker-side-tools { display: flex; gap: 8px; padding: 10px; flex-wrap: wrap; }
.sticker-side-tools button { cursor: pointer; border: 1px solid var(--border, #334155); border-radius: 8px; background: var(--panel, #111827); color: var(--text, #e2e8f0); padding: 8px; font-size: 11px; }
</style>
