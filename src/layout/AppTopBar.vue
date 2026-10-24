<script setup lang="ts">
import { defineAsyncComponent, ref, onMounted } from "vue";
import BookmarkFolderStrip from "../bookmarks/BookmarkFolderStrip.vue";
import TopInfoCube from "./TopInfoCube.vue";
import { fullscreenCardState } from "../core/fullscreen-card-state";
import { settingsController } from "../settings/store";
import { windowManagerController } from "../core/window-manager.store";
import { topProfileState, profileMenuController } from "../profile/store";
import { bookmarkFolderStripState } from "../bookmarks/folder-strip-store";
import { bookmarksService } from "../services/bookmarks.service";

const WorkspaceLaunchers = defineAsyncComponent(() => import("../workspaces/WorkspaceLaunchers.vue"));

function handleOpenSettings(event: MouseEvent) {
  event.preventDefault();
  event.stopPropagation();
  const win = typeof window !== "undefined" ? (window as any) : null;
  if (win?.LogicWeaverWindowManager?.open) {
    win.LogicWeaverWindowManager.open("settings");
  } else if (win?.LogicWeaverWindowTabs?.open) {
    win.LogicWeaverWindowTabs.open("settings");
  } else {
    settingsController.open();
  }
}

function handleToggleBookmark(event: MouseEvent) {
  event.preventDefault();
  const win = typeof window !== "undefined" ? (window as any) : null;
  if (typeof win?.toggleBookmarkPanel === "function") {
    win.toggleBookmarkPanel();
  } else if (win?.LogicWeaverBookmarkPanel?.toggle) {
    win.LogicWeaverBookmarkPanel.toggle();
  } else {
    bookmarksService.toggleBookmarkPanel();
  }
}

function handleOpenProfile(event: MouseEvent) {
  event.preventDefault();
  const win = typeof window !== "undefined" ? (window as any) : null;
  if (win?.LogicWeaverProfilePanel?.open) {
    win.LogicWeaverProfilePanel.open();
  }
}

function handleContextMenuProfile(event: MouseEvent) {
  event.preventDefault();
  profileMenuController.open(event.clientX, event.clientY);
}

const THEMES = [
  { id: "light", icon: "☀️", label: "白天模式" },
  { id: "dark", icon: "🌙", label: "夜晚模式" },
  { id: "endfield", icon: "⚡", label: "终末地风格" },
  { id: "lonetrail", icon: "🌌", label: "孤星风格" }
];

const currentThemeIcon = ref("☀️");
const currentThemeLabel = ref("切换主题");

function updateThemeDisplay() {
  if (typeof document === "undefined") return;
  const cur = document.documentElement.dataset.theme || "light";
  const meta = THEMES.find((x) => x.id === cur) || THEMES.find((x) => x.id === "light") || THEMES[0];
  currentThemeIcon.value = meta.icon;
  currentThemeLabel.value = `主题：${meta.label}（点击更换）`;
}

function handleToggleTheme(event: MouseEvent) {
  event.preventDefault();
  if (typeof document === "undefined") return;
  const cur = document.documentElement.dataset.theme || "light";
  const curIdx = THEMES.findIndex((x) => x.id === cur);
  const nextTheme = THEMES[(curIdx + 1) % THEMES.length];
  document.documentElement.dataset.theme = nextTheme.id;
  try {
    localStorage.setItem("theme", nextTheme.id);
  } catch {}
  if (typeof chrome !== "undefined" && chrome?.storage?.local) {
    void chrome.storage.local.set({ theme: nextTheme.id });
  }
  updateThemeDisplay();
  document.querySelectorAll("iframe").forEach((f) => {
    try {
      f.contentWindow?.postMessage({ type: "theme-change", theme: nextTheme.id }, "*");
    } catch {}
  });
}

function handleTopBarCopy(e: ClipboardEvent) {
  const target = e.target as HTMLElement | null;
  if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable)) {
    return;
  }
  e.preventDefault();
  e.stopPropagation();
}

function handleTopBarSelectStart(e: Event) {
  const target = e.target as HTMLElement | null;
  if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable)) {
    return;
  }
  e.preventDefault();
}

onMounted(() => {
  const saved = localStorage.getItem("theme") || "light";
  document.documentElement.dataset.theme = saved;
  document.documentElement.setAttribute("data-theme", saved);
  updateThemeDisplay();
});
</script>

<template>
  <header
    class="topbar"
    :class="{ 'bookmark-folders-mode': bookmarkFolderStripState.enabled }"
    @copy="handleTopBarCopy"
    @selectstart="handleTopBarSelectStart"
  >
    <div class="tb-brand">
      <button
        id="bili-profile-button"
        class="bili-profile-button"
        type="button"
        title="头像 · 个人与浏览器信息"
        @click="handleOpenProfile"
        @contextmenu.prevent="handleContextMenuProfile($event)"
      >
        <img
          id="bili-profile-avatar"
          :src="topProfileState.avatarUrl || 'assets/bilibili.svg'"
          :alt="topProfileState.userName || '信息中心头像'"
        />
        <span
          id="bili-profile-badge"
          class="bili-profile-badge"
          :hidden="topProfileState.unreadCount <= 0"
        >{{ topProfileState.unreadCount }}</span>
      </button>
      <button
        id="bookmark-handle"
        class="bookmark-handle"
        type="button"
        aria-expanded="false"
        title="书签"
        :hidden="bookmarkFolderStripState.enabled"
        @click="handleToggleBookmark"
      >
        <span id="bookmark-handle-icon">📁</span><span>书签</span>
      </button>
      <div id="vue-bookmark-folder-strip-root">
        <BookmarkFolderStrip />
      </div>
    </div>
    <TopInfoCube :active="!fullscreenCardState.activeId" />
    <div class="tb-actions">
      <button id="daily-toggle" class="tb-pill" type="button" hidden title="查看日报">📰 日报</button>
      <span id="workspace-launchers" hidden>
        <WorkspaceLaunchers />
      </span>
      <button id="settings-open" class="tb-btn" title="设置" @click="handleOpenSettings">⚙</button>
      <button
        id="theme-toggle"
        class="tb-btn"
        type="button"
        title="主题 · 切换风格"
        @click="handleToggleTheme"
      >
        {{ currentThemeIcon }}
      </button>
    </div>
  </header>
</template>
