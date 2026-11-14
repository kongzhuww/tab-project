<script setup lang="ts">
import { defineAsyncComponent, ref, onMounted } from "vue";
import BookmarkFolderStrip from "../bookmarks/BookmarkFolderStrip.vue";
import TopInfoCube from "./TopInfoCube.vue";
import { fullscreenCardState } from "../core/fullscreen-card-state";
import { settingsController } from "../settings/store";
import { windowManagerController } from "../core/window-manager.store";
import { topProfileState, profileMenuController } from "../profile/store";
import { notificationHistoryController, notificationHistoryState, notificationUnreadCount } from "../notifications/history-store";
import { bookmarkFolderStripState } from "../bookmarks/folder-strip-store";
import { bookmarksService } from "../services/bookmarks.service";
import { sideDrawerState, sideDrawerController } from "../sidepanel/drawer-store";
import { t } from "../i18n";
import { normalizeSystemTheme } from "../theme/system-theme";

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
  notificationHistoryController.toggle();
}

function handleContextMenuProfile(event: MouseEvent) {
  event.preventDefault();
  profileMenuController.open(event.clientX, event.clientY);
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
  notificationHistoryController.start();
  const saved = normalizeSystemTheme(localStorage.getItem("theme"));
  document.documentElement.dataset.theme = saved;
  document.documentElement.setAttribute("data-theme", saved);
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
        :title="t('topbar.notifications')"
        aria-controls="notification-center"
        :aria-expanded="notificationHistoryState.isOpen"
        :aria-label="notificationUnreadCount ? t('topbar.notificationsUnread', { count: notificationUnreadCount }) : t('topbar.notifications')"
        @click="handleOpenProfile"
        @contextmenu.prevent="handleContextMenuProfile($event)"
      >
        <img
          id="bili-profile-avatar"
          :src="topProfileState.avatarUrl || 'assets/bilibili.svg'"
          :alt="topProfileState.userName || t('topbar.notifications')"
        />
        <span
          id="bili-profile-badge"
          class="bili-profile-badge"
          :hidden="notificationUnreadCount <= 0"
        >{{ notificationUnreadCount > 99 ? '99+' : notificationUnreadCount }}</span>
      </button>
      <button
        id="bookmark-handle"
        class="bookmark-handle"
        type="button"
        aria-expanded="false"
        :title="t('topbar.bookmarks')"
        :hidden="bookmarkFolderStripState.enabled"
        @click="handleToggleBookmark"
      >
        <span id="bookmark-handle-icon">📁</span><span>{{ t('topbar.bookmarks') }}</span>
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
      <button
        id="side-drawer-toggle"
        class="tb-btn"
        type="button"
        :title="t('topbar.sidebar')"
        aria-controls="in-page-side-drawer"
        :aria-expanded="sideDrawerState.isOpen"
        :class="{ active: sideDrawerState.isOpen }"
        @click="sideDrawerController.toggle()"
      >
        📑
      </button>
      <button id="settings-open" class="tb-btn" :title="t('topbar.settings')" @click="handleOpenSettings">⚙</button>
    </div>
  </header>
</template>
