<script setup lang="ts">
import { defineAsyncComponent } from "vue";
import { ensureViewStyles } from "../core/view-styles";
import { pluginMarketController } from "../modules/market-store";
import NotificationHost from "../notifications/NotificationHost.vue";
import DockModuleHost from "../modules/DockModuleHost.vue";
import { useRetainedMount } from "../core/useRetainedMount";
import { folderState } from "../launcher/folder-store";
import { notificationHistoryState } from "../notifications/history-store";
import { tabManagerState } from "../profile/tab-manager-store";
import { clockSettingsController } from "../clock/settings-store";
import { aihotViewerState } from "../viewers/store";
import { biliTheaterController } from "../bilibili/theater-store";
import { biliMiniPlayerState } from "../bilibili/mini-player-store";
import { biliMessagePanelState } from "../bilibili/message-panel-store";
import { aiDialogController } from "../ai/store";
import { commandPaletteState } from "../commands/command-palette-store";
import { bookmarkMenuController } from "../bookmarks/menu-store";
import { launcherDialogsState } from "../launcher/dialogs-store";
import { githubRepoDetailState } from "../github/repo-detail-store";
import BiliUpPreview from "../bilibili/BiliUpPreview.vue";

const mountMarket = useRetainedMount(() => pluginMarketController.state.isOpen);
const mountNotificationCenter = useRetainedMount(() => notificationHistoryState.isOpen);
const mountTabManager = useRetainedMount(() => tabManagerState.isOpen);
const mountClockSettings = useRetainedMount(() => clockSettingsController.state.isOpen);
const mountAihotViewer = useRetainedMount(() => aihotViewerState.open);

const mountBiliTheater = useRetainedMount(() => biliTheaterController.state.isOpen);
const mountBiliMiniPlayer = useRetainedMount(() => biliMiniPlayerState.isOpen);
const mountBiliMessagePanel = useRetainedMount(() => biliMessagePanelState.isOpen);
const mountAiDialog = useRetainedMount(() => aiDialogController.state.isOpen);
const mountGithubDetail = useRetainedMount(() => githubRepoDetailState.isOpen);
const mountCommandPalette = useRetainedMount(() => commandPaletteState.isOpen);
const mountBookmarkNoteMenu = useRetainedMount(() => bookmarkMenuController.state.isOpen);
const mountLauncherFolder = useRetainedMount(() => folderState.isOpen);
const mountLauncherDialogs = useRetainedMount(() => (
  launcherDialogsState.editDialog.isOpen ||
  launcherDialogsState.iconPicker.isOpen ||
  launcherDialogsState.linkMove.isOpen ||
  launcherDialogsState.folderMove.isOpen ||
  launcherDialogsState.groupMerge.isOpen ||
  launcherDialogsState.folderDelete.isOpen
));

const ProfileMenu = defineAsyncComponent(() => import("../profile/ProfileMenu.vue"));
const BookmarkNoteMenu = defineAsyncComponent(() => import("../bookmarks/BookmarkNoteMenu.vue"));
const BookmarkPanel = defineAsyncComponent(() => import("../bookmarks/BookmarkPanel.vue"));
const ClockSettingsMenu = defineAsyncComponent(() => import("../clock/ClockSettingsMenu.vue"));

const NotificationCenter = defineAsyncComponent(() => import("../notifications/NotificationCenter.vue"));
const TabManagerPanel = defineAsyncComponent(() => import("../profile/TabManagerPanel.vue"));
const LauncherDialogs = defineAsyncComponent(() => import("../launcher/LauncherDialogs.vue"));
const LauncherFolderDialog = defineAsyncComponent(() => import("../launcher/LauncherFolderDialog.vue"));
const LauncherMenus = defineAsyncComponent(() => import("../launcher/LauncherMenus.vue"));
const SettingsDialog = defineAsyncComponent(() => import("../settings/SettingsDialog.vue"));
const BiliMiniPlayer = defineAsyncComponent(() => import("../bilibili/BiliMiniPlayer.vue"));
const BiliTheaterDialog = defineAsyncComponent(() => import("../bilibili/BiliTheaterDialog.vue"));
const BiliMessagePanel = defineAsyncComponent(() => import("../bilibili/BiliMessagePanel.vue"));
const AiDialog = defineAsyncComponent(() => import("../ai/AiDialog.vue"));
const AihotViewer = defineAsyncComponent(() => import("../viewers/AihotViewer.vue"));
const NavWheelOverlay = defineAsyncComponent(() => import("../nav-wheel/NavWheelOverlay.vue"));
const GitHubRepoDetailDrawer = defineAsyncComponent(() => import("../github/GitHubRepoDetailDrawer.vue"));
const BiliSubtitleModal = defineAsyncComponent(() => import("../bilibili/BiliSubtitleModal.vue"));
const FirecrawlModal = defineAsyncComponent(() => import("../firecrawl/FirecrawlModal.vue"));
const FloatingImageViewer = defineAsyncComponent(() => import("../viewers/FloatingImageViewer.vue"));
const CommandPalette = defineAsyncComponent(() => import("../commands/CommandPalette.vue"));
const AppPromptModal = defineAsyncComponent(() => import("../core/AppPromptModal.vue"));
// Library mode does not automatically load split CSS. Load shop-only CSS text
// on first open before rendering, and retain it for subsequent openings.
const PluginMarketDialog = defineAsyncComponent(async () => {
  const [view, styles] = await Promise.all([
    import("../modules/PluginMarketDialog.vue"),
    import("../modules/plugin-market.css?inline")
  ]);
  ensureViewStyles("logicweaver-market-styles", styles.default);
  return view.default;
});
</script>

<template>
  <div class="logicweaver-overlays-layer">
    <!-- 通知中心 -->
    <div id="vue-notification-root">
      <NotificationHost />
    </div>

    <!-- 头像右键菜单 -->
    <div id="bili-profile-menu" class="bili-profile-menu" hidden>
      <ProfileMenu />
    </div>

    <!-- B站互动通知与消息中心 -->
    <div id="vue-bili-message-panel-root">
      <BiliMessagePanel v-if="mountBiliMessagePanel" />
    </div>

    <!-- 顶栏通知历史与独立标签页管理 -->
    <div id="vue-notification-center-root"><NotificationCenter v-if="mountNotificationCenter" /></div>
    <div id="vue-tab-manager-root"><TabManagerPanel v-if="mountTabManager" /></div>

    <!-- 书签上下文操作与备注菜单 -->
    <div id="vue-bookmark-menu-root">
      <BookmarkNoteMenu v-if="mountBookmarkNoteMenu" />
    </div>

    <!-- 浏览器书签侧边滑动视窗 -->
    <div id="vue-bookmark-panel-root">
      <BookmarkPanel />
    </div>

    <!-- 快捷启动器管理弹窗族 -->
    <div id="vue-launcher-dialogs-root">
      <LauncherDialogs v-if="mountLauncherDialogs" />
    </div>

    <!-- 大文件夹展开视窗 -->
    <div id="vue-launcher-folder-root">
      <LauncherFolderDialog v-if="mountLauncherFolder" />
    </div>

    <!-- 启动器快捷上下文菜单族 -->
    <div id="vue-launcher-menus-root">
      <LauncherMenus />
    </div>

    <!-- 全局设置中心视窗 -->
    <div id="vue-settings-dialog-root">
      <SettingsDialog />
    </div>

    <!-- 随身 WiFi 流量卡额度调整弹窗 -->

    <!-- 中央时钟偏好配置菜单 -->
    <div id="vue-clock-settings-root">
      <ClockSettingsMenu v-if="mountClockSettings" />
    </div>

    <!-- Bilibili 沉浸剧场与评论区弹窗 -->
    <div id="vue-bili-theater-root">
      <BiliTheaterDialog v-if="mountBiliTheater" />
    </div>

    <!-- Bilibili 悬浮迷你播放器 (多P选集/简介/评论抽屉/画质倍速) -->
    <div id="vue-bili-mini-player-root">
      <BiliMiniPlayer v-if="mountBiliMiniPlayer" />
    </div>

    <!-- AI 助手对话框与知识点抽屉 -->
    <div id="vue-ai-dialog-root">
      <AiDialog v-if="mountAiDialog" />
    </div>


    <!-- AI HOT 资讯文章阅读器 -->
    <div id="vue-aihot-viewer-root">
      <AihotViewer v-if="mountAihotViewer" />
    </div>

    <!-- 辐射状快捷动作轮盘与悬浮球 -->
    <div id="vue-nav-wheel-root">
      <NavWheelOverlay />
    </div>

    <!-- 🎵 网易云音乐专属工作区视窗 -->


    <!-- Compiled-in module views mount on first request; no account/network actions here. -->
    <DockModuleHost />

    <!-- 🐙 GitHub 仓库 README 预览抽屉 -->
    <div id="vue-github-detail-root">
      <GitHubRepoDetailDrawer v-if="mountGithubDetail" />
    </div>

    <!-- 📝 B站纯文本白底黑字字幕独立视窗 -->
    <div id="vue-bili-subtitle-modal-root">
      <BiliSubtitleModal />
    </div>

    <!-- ⚡ Firecrawl 网页纯净提炼便签视窗 -->
    <div id="vue-firecrawl-modal-root">
      <FirecrawlModal />
    </div>

    <!-- 🖼️ 非模态浮动图片轻量小窗 (0 模糊遮罩，支持自由拖拽与滚轮缩放) -->
    <div id="vue-floating-image-viewer-root">
      <FloatingImageViewer />
    </div>

    <!-- ⚡ 全局快捷命令中心 (Ctrl+K / Cmd+K) -->
    <div id="vue-command-palette-root">
      <CommandPalette v-if="mountCommandPalette" />
    </div>

    <!-- 👤 UP主/作者近期投稿与详情浮层预览 -->
    <BiliUpPreview />

    <!-- 💬 全局自研交互弹窗 (完全替代原生 window.prompt / confirm / alert) -->
    <AppPromptModal />

    <!-- 🧩 模块商店弹窗 -->
    <PluginMarketDialog v-if="mountMarket" />
  </div>
</template>
