<template>
  <!-- 根 DOM 挂载点：保留 logicweaver-spa-root 内部 ID/类名以严格兼容全站 CSS 样式选择器；用户可见标题均已统一为 tab-project-next -->
  <div id="logicweaver-spa-root" class="logicweaver-spa-root" :data-active-workspace="activeWorkspaceId || ''">
    <!-- 纯血 SPA 统一单根声明式布局树 (Declarative Layout Architecture) -->
    <!-- 0. 新用户开箱视角预览全局悬浮条 -->
    <GuestPreviewBanner />

    <!-- 1. 顶部状态与工作区工具条 -->
    <AppTopBar />

    <!-- 2. 首屏启动器、时钟、搜索与常用分组架 -->
    <AppLauncher />

    <!-- 3. 工作区与内容卡片区 -->
    <AppWorkspaces />

    <!-- 4. 底部/多方位 Dock 快捷栏 -->
    <nav id="mac-dock" class="mac-dock" :class="'dock-' + macDockState.position" aria-label="快捷应用栏">
      <MacDock />
    </nav>

    <!-- 5. 全局通知、弹窗族与侧滑抽屉 -->
    <AppOverlays />

  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, watch } from "vue";
import GuestPreviewBanner from "./layout/GuestPreviewBanner.vue";
import AppTopBar from "./layout/AppTopBar.vue";
import AppLauncher from "./layout/AppLauncher.vue";
import AppWorkspaces from "./layout/AppWorkspaces.vue";
import MacDock from "./dock/MacDock.vue";
import { macDockState } from "./dock/store";
import AppOverlays from "./layout/AppOverlays.vue";
import { windowManagerController } from "./core/window-manager.store";
import { activeViewId } from "./core/navigation-state";
import { fullscreenCardState } from "./core/fullscreen-cards.store";
import { navWheelRuntime } from "./nav-wheel/runtime";
import { shortcutService } from "./services/shortcut.service";
import { launcherRuntime } from "./launcher/runtime";
import { homePrefsRuntime } from "./launcher/home-prefs.store";
import { homeMusicState } from "./music/store";
import { radioTapeState } from "./bilibili/radio-tape-store";

interface ViewMeta {
  title: string;
  icon: string;
  iconType: string;
}

const defaultDocTitle = typeof document === "undefined" ? "" : document.title;
const VIEW_METAS: Record<string, ViewMeta> = {
  "workbench": {
    title: "海狸工作台 · 聚焦",
    icon: "assets/nav-workbench.svg",
    iconType: "image/svg+xml"
  },
  "daily-bilibili": {
    title: "哔哩哔哩 · 收藏夹",
    icon: "assets/bilibili.svg",
    iconType: "image/svg+xml"
  },
  "card-github": {
    title: "GitHub · 工作区",
    icon: "assets/nav-github.svg",
    iconType: "image/svg+xml"
  },
  "daily-aihot": {
    title: "AI Hot · 今日热榜",
    icon: "assets/nav-aihot.svg",
    iconType: "image/svg+xml"
  },
  "daily-youtube": {
    title: "YouTube",
    icon: "assets/nav-youtube.svg",
    iconType: "image/svg+xml"
  },
  "daily-pricing": {
    title: "模型评测 · 价格排行",
    icon: "assets/nav-pricing.svg",
    iconType: "image/svg+xml"
  },
  "todoist": {
    title: "Todoist · 任务",
    icon: "assets/nav-todoist.svg",
    iconType: "image/svg+xml"
  },
  "wallpaper": {
    title: "壁纸工坊",
    icon: "assets/icon-32.png",
    iconType: "image/png"
  },
  "home": {
    title: "新标签页",
    icon: "assets/icon-32.png",
    iconType: "image/png"
  }
};

let currentFaviconHref = "";

function updateFavicon(iconPath: string, type = "image/svg+xml"): void {
  if (typeof document === "undefined") return;
  const fullUrl = (typeof chrome !== "undefined" && chrome.runtime?.getURL)
    ? chrome.runtime.getURL(iconPath)
    : iconPath;

  if (currentFaviconHref === fullUrl) return;
  currentFaviconHref = fullUrl;

  const links = document.querySelectorAll<HTMLLinkElement>("link[rel*='icon']");
  if (links.length > 0) {
    links.forEach((link) => {
      link.type = type;
      link.href = fullUrl;
    });
  } else {
    const link = document.createElement("link");
    link.rel = "icon";
    link.type = type;
    link.href = fullUrl;
    document.head.appendChild(link);
  }
}

function syncTitleAndFavicon(): void {
  if (typeof document === "undefined") return;

  const meta = VIEW_METAS[activeViewId.value] || VIEW_METAS["home"];

  // 2. 图标随当前模块无条件切换
  updateFavicon(meta.icon, meta.iconType);

  // 3. 标题：放歌时以歌曲为主；未放歌时展示当前模块名称
  if (homeMusicState.playing && homeMusicState.title) {
    const artist = homeMusicState.artist ? ` - ${homeMusicState.artist}` : "";
    document.title = `▶ ${homeMusicState.title}${artist}`;
    return;
  }

  if (radioTapeState.playing && radioTapeState.title) {
    document.title = `▶ ${radioTapeState.title} · 电台`;
    return;
  }

  document.title = meta.title;
}

watch(
  [
    () => activeViewId.value,
    () => homeMusicState.playing,
    () => homeMusicState.title,
    () => homeMusicState.artist,
    () => radioTapeState.playing,
    () => radioTapeState.title
  ],
  () => {
    syncTitleAndFavicon();
  },
  { immediate: true }
);

const activeWorkspaceId = computed(() => activeViewId.value === "home" ? "" : activeViewId.value);

watch(() => fullscreenCardState.activeId, (id) => {
  document.body.classList.toggle("has-card-fullscreen", Boolean(id));
}, { immediate: true, flush: "sync" });

onMounted(() => {
  if (typeof document !== "undefined") {
    document.body.dataset.spa = "1";
    document.body.classList.remove("is-starting");
    const loader = document.getElementById("endfield-loader");
    if (loader) loader.remove();
  }

  try {
    shortcutService.bindGlobalListener();
    void navWheelRuntime.start();
    homePrefsRuntime.start();
    void launcherRuntime.init().catch((error) => console.warn("[Launcher] 初始化失败", error));
    if (typeof chrome !== "undefined" && chrome?.runtime?.sendMessage) {
      setTimeout(() => {
        try {
          // 历史兼容命名 cleanupNativeTabs 指浏览器自带默认空白标签页（edge://newtab / chrome://newtab），不代表 Native Host 功能仍存在
          chrome.runtime.sendMessage({ type: "cleanupNativeTabs" }, () => {
            void chrome.runtime?.lastError;
          });
        } catch {}
      }, 400);
    }
  } catch (err) {
    console.warn("[App] Runtime start error:", err);
  }
});
onUnmounted(() => {
  navWheelRuntime.stop();
  launcherRuntime.stop();
  homePrefsRuntime.stop();
  document.body.classList.remove("has-card-fullscreen");
  if (typeof document !== "undefined" && defaultDocTitle) {
    document.title = defaultDocTitle;
  }
});

defineExpose({
  activeWorkspaceId,
  windowManagerController
});
</script>

<style scoped>
.logicweaver-spa-root {
  position: relative;
  width: 100%;
  min-height: 100%;
}
</style>
