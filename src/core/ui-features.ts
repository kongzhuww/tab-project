import { createApp, defineAsyncComponent, type Component } from "vue";
import App from "../App.vue";
import IntroAnimation from "../intro/IntroAnimation.vue";
import { introController } from "../intro/controller";
import NotificationHost from "../notifications/NotificationHost.vue";
import WeatherWidget from "../weather/WeatherWidget.vue";
import HeroClock from "../clock/HeroClock.vue";
import SearchBox from "../search/SearchBox.vue";
import HomeMusicCard from "../music/HomeMusicCard.vue";
import { homeMusicController } from "../music/store";
import FavoriteSites from "../launchers/FavoriteSites.vue";
import { launcherGroupsController } from "../launchers/store";
import ProfileMenu from "../profile/ProfileMenu.vue";
import { profileMenuController } from "../profile/store";
import WorkspaceLaunchers from "../workspaces/WorkspaceLaunchers.vue";
import { workspaceLaunchersController } from "../workspaces/store";
import MacDock from "../dock/MacDock.vue";
import { macDockController } from "../dock/store";
const GitHubWorkspaceCard = defineAsyncComponent(() => import("../github/GitHubWorkspaceCard.vue"));
import GitHubStatus from "../github/GitHubStatus.vue";
import { githubStatusController } from "../github/store";
import GitHubFolders from "../github/GitHubFolders.vue";
import { githubFolderController } from "../github/folders";
import GitHubHero from "../github/GitHubHero.vue";
import { githubHeroController } from "../github/hero";
import GitHubRepositories from "../github/GitHubRepositories.vue";
import { githubRepositoryController } from "../github/repositories";
import GitHubBatchBar from "../github/GitHubBatchBar.vue";
import { githubBatchBarController } from "../github/batch-bar";
const NotificationCenter = defineAsyncComponent(() => import("../notifications/NotificationCenter.vue"));
const TabManagerPanel = defineAsyncComponent(() => import("../profile/TabManagerPanel.vue"));
import { notificationHistoryController } from "../notifications/history-store";
import { tabManagerController } from "../profile/tab-manager-store";
const BookmarkNoteMenu = defineAsyncComponent(() => import("../bookmarks/BookmarkNoteMenu.vue"));
import { bookmarkMenuController } from "../bookmarks/menu-store";
const BookmarkPanel = defineAsyncComponent(() => import("../bookmarks/BookmarkPanel.vue"));
import { bookmarkPanelController } from "../bookmarks/panel-store";
import { bookmarkFolderStripController } from "../bookmarks/folder-strip-store";
const LauncherDialogs = defineAsyncComponent(() => import("../launcher/LauncherDialogs.vue"));
import { launcherDialogsController } from "../launcher/dialogs-store";
const SettingsDialog = defineAsyncComponent(() => import("../settings/SettingsDialog.vue"));
const SettingsView = defineAsyncComponent(() => import("../settings/SettingsView.vue"));
import { settingsController } from "../settings/store";
const ClockSettingsMenu = defineAsyncComponent(() => import("../clock/ClockSettingsMenu.vue"));
import { clockSettingsController } from "../clock/settings-store";
const BiliTheaterDialog = defineAsyncComponent(() => import("../bilibili/BiliTheaterDialog.vue"));
const BiliMiniPlayer = defineAsyncComponent(() => import("../bilibili/BiliMiniPlayer.vue"));
import { biliTheaterController } from "../bilibili/theater-store";
const BiliMessagePanel = defineAsyncComponent(() => import("../bilibili/BiliMessagePanel.vue"));
import { biliMessagePanelController } from "../bilibili/message-panel-store";
const ModelPricingCard = defineAsyncComponent(() => import("../pricing/ModelPricingCard.vue"));
import { pricingController } from "../pricing/pricing-store";
const BilibiliWorkspace = defineAsyncComponent(() => import("../bilibili/BilibiliWorkspace.vue"));
import { biliFavoritesController } from "../bilibili/bili-favorites-store";
const YouTubeCard = defineAsyncComponent(() => import("../youtube/YouTubeCard.vue"));
import { youTubeController } from "../youtube/youtube-store";
const AihotFeed = defineAsyncComponent(() => import("../aihot/AihotFeed.vue"));
import { aihotFeedController } from "../aihot/aihot-feed-store";
const GitHubTrending = defineAsyncComponent(() => import("../github/GitHubTrending.vue"));
import { gitHubTrendingController } from "../github/trending-store";
const AiDialog = defineAsyncComponent(() => import("../ai/AiDialog.vue"));
import { aiDialogController } from "../ai/store";
const AihotViewer = defineAsyncComponent(() => import("../viewers/AihotViewer.vue"));
import { aihotViewerController } from "../viewers/store";
const NavWheelOverlay = defineAsyncComponent(() => import("../nav-wheel/NavWheelOverlay.vue"));
const StandaloneHost = defineAsyncComponent(() => import("../modules/StandaloneHost.vue"));
import { navWheelController } from "../nav-wheel/store";
const LauncherFolderDialog = defineAsyncComponent(() => import("../launcher/LauncherFolderDialog.vue"));
import { launcherFolderController } from "../launcher/folder-store";
const LauncherMenus = defineAsyncComponent(() => import("../launcher/LauncherMenus.vue"));
import { launcherMenusController } from "../launcher/menus-store";
import type { FeatureRegistry } from "./features";

interface MountStateController { setMounted(mounted: boolean): void }

function registerIsland(
  features: FeatureRegistry,
  definition: { id: string; title: string; order: number; root: string; capabilities: readonly string[]; spaOwned?: boolean },
  component: Component,
  controller?: MountStateController
): void {
  // These components are owned by conditional SPA layouts, not the legacy registry.
  // Keep standalone-page islands, but never mark an unloaded SPA view as mounted.
  if (definition.spaOwned && document.getElementById("vue-spa-root")) return;
  // The standalone GitHub card already owns its nested Vue widgets; never mount them a second time.
  if (definition.id !== "github-workspace" && definition.id.startsWith("github-") && document.getElementById("vue-github-workspace-root")) return;
  features.register({
    id: definition.id,
    title: definition.title,
    order: definition.order,
    eager: true,
    roots: [definition.root],
    capabilities: definition.capabilities,
    mount: ({ getRoot }) => {
      const root = getRoot(definition.root);
      if (!root) return;

      // 若单根 SPA 调度容器存在，核心布局组件已由 <App.vue> 及其布局子树声明式挂载，直接驱动控制器生命周期
      if (document.getElementById("vue-spa-root") && definition.id !== "spa-app") {
        controller?.setMounted?.(true);
        return () => {
          controller?.setMounted?.(false);
        };
      }

      // 降级兜底：在极端微型孤岛测试环境（如无 SPA 根容器时）保留独立挂载
      const fallback = root.innerHTML;
      const app = createApp(component);
      app.config.errorHandler = (error, _instance, info) => {
        console.error(`LogicWeaver Vue feature failed: ${definition.id} (${info})`, error);
        root.dataset.vueError = "1";
      };
      try {
        app.mount(root);
        controller?.setMounted?.(true);
      } catch (error) {
        controller?.setMounted?.(false);
        root.innerHTML = fallback;
        throw error;
      }
      return () => {
        controller?.setMounted?.(false);
        app.unmount();
      };
    }
  });
}

export function registerUiFeatures(features: FeatureRegistry): void {
  features.register({
    id: "intro", title: "启动动画", order: 10, eager: true, roots: ["endfield-loader"], capabilities: ["ui:intro", "boot:progress"],
    mount: () => {
      const mountElement = document.getElementById("endfield-loader");
      if (!introController.enabled) {
        mountElement?.remove();
        document.body.classList.remove("is-starting");
        return;
      }
      if (!mountElement) return;
      const app = createApp(IntroAnimation);
      let disposed = false;
      const removeIntro = () => { void features.stop("intro"); };
      window.addEventListener("logicweaver:intro-complete", removeIntro, { once: true });
      app.mount(mountElement);
      const watchdog = window.setTimeout(() => {
        introController.finish("基础界面已就绪，在线服务继续后台加载", true);
        window.setTimeout(() => {
          if (!disposed) {
            removeIntro();
            mountElement?.remove();
            document.body.classList.remove("is-starting");
          }
        }, 600);
      }, 8000);
      return () => {
        if (disposed) return;
        disposed = true;
        clearTimeout(watchdog);
        window.removeEventListener("logicweaver:intro-complete", removeIntro);
        app.unmount();
        mountElement.remove();
        document.body.classList.remove("is-starting");
      };
    }
  });

  registerIsland(features, { id: "spa-app", title: "纯血 SPA 单根调度器", order: 15, root: "vue-spa-root", capabilities: ["ui:spa-root", "workspace:keepalive"] }, App);
  // The standalone Bilibili page needs a local window and confirmation host, not a new homepage tab.
  if (!document.getElementById("vue-spa-root")) {
    registerIsland(features, { id: "bili-companions", title: "b站伴随窗口", order: 19, root: "vue-bili-companions-root", capabilities: ["ui:dock-companion"] }, StandaloneHost);
  }
  registerIsland(features, { id: "notifications", title: "通知中心", order: 20, root: "vue-notification-root", capabilities: ["ui:toast", "notification:dedupe"] }, NotificationHost);
  registerIsland(features, { id: "profile-menu", title: "头像右键菜单", order: 21, root: "bili-profile-menu", capabilities: ["ui:profile-menu", "profile:actions"] }, ProfileMenu, profileMenuController);
  registerIsland(features, { id: "workspace-launchers", title: "常用工作区启动项", order: 22, root: "workspace-launchers", capabilities: ["ui:workspace-launchers", "workspace:launch"] }, WorkspaceLaunchers, workspaceLaunchersController);
  registerIsland(features, { id: "mac-dock", title: "底部快捷应用 Dock 栏", order: 23, root: "mac-dock", capabilities: ["ui:mac-dock", "dock:navigate"] }, MacDock, macDockController);
  registerIsland(features, { id: "hero-clock", title: "首屏中央时钟", order: 26, root: "hero-clock", capabilities: ["ui:hero-clock", "clock:read"] }, HeroClock);
  registerIsland(features, { id: "search-box", title: "首屏搜索框", order: 27, root: "search", capabilities: ["ui:search-box", "search:actions"] }, SearchBox);
  registerIsland(features, { id: "home-music", title: "首屏音乐播放器", order: 28, root: "task-thread-home", capabilities: ["ui:home-music", "music:playback"] }, HomeMusicCard, homeMusicController);
  registerIsland(features, { id: "launcher-groups", title: "常用网站分组架", order: 29, root: "launcher-groups", capabilities: ["ui:launcher-groups", "launcher:navigate"] }, FavoriteSites, launcherGroupsController);
  registerIsland(features, { id: "weather-widget", title: "首屏天气小部件", order: 39, root: "weather-body", capabilities: ["ui:weather-widget", "weather:read"] }, WeatherWidget);
  registerIsland(features, { id: "github-workspace", title: "GitHub 独立页 Vue 工作台", order: 49, root: "vue-github-workspace-root", capabilities: ["ui:github-workspace"] }, GitHubWorkspaceCard);
  registerIsland(features, { id: "github-status", title: "GitHub 同步状态", order: 50, root: "vue-github-status-root", capabilities: ["ui:github-status", "github:sync-read"] }, GitHubStatus, githubStatusController);
  registerIsland(features, { id: "github-folders", title: "GitHub 文件夹导航", order: 55, root: "gh-folder-list", capabilities: ["ui:github-folders", "github:categorize-drop"] }, GitHubFolders, githubFolderController);
  registerIsland(features, { id: "github-hero", title: "GitHub 分类摘要", order: 56, root: "gh-hero", capabilities: ["ui:github-summary", "github:actions"] }, GitHubHero, githubHeroController);
  registerIsland(features, { id: "github-repositories", title: "GitHub 仓库列表", order: 57, root: "vue-github-repositories-root", capabilities: ["ui:github-repositories", "github:repository-actions", "github:paging"] }, GitHubRepositories, githubRepositoryController);
  registerIsland(features, { id: "github-batch-bar", title: "GitHub Star 批量操作工具栏", order: 58, root: "gh-batch-bar", capabilities: ["ui:github-batch-bar", "github:batch-actions"] }, GitHubBatchBar, githubBatchBarController);
  registerIsland(features, { id: "notification-center", spaOwned: true, title: "持久通知中心", order: 71, root: "vue-notification-center-root", capabilities: ["ui:notification-history", "notification:read"] }, NotificationCenter, notificationHistoryController as any);
  registerIsland(features, { id: "tab-manager", spaOwned: true, title: "独立标签页管理", order: 71, root: "vue-tab-manager-root", capabilities: ["ui:tab-manager", "tabs:explicit"] }, TabManagerPanel, tabManagerController as any);
  registerIsland(features, { id: "bookmark-menu", title: "书签上下文操作与备注菜单", order: 72, root: "vue-bookmark-menu-root", capabilities: ["ui:bookmark-menu", "bookmark:edit"] }, BookmarkNoteMenu, bookmarkMenuController as any);
  registerIsland(features, { id: "launcher-dialogs", title: "快捷启动器管理弹窗族", order: 73, root: "vue-launcher-dialogs-root", capabilities: ["ui:launcher-dialogs", "launcher:manage"] }, LauncherDialogs, launcherDialogsController as any);
  registerIsland(features, { id: "launcher-folder-dialog", title: "大文件夹展开视窗", order: 74, root: "vue-launcher-folder-root", capabilities: ["ui:launcher-folder", "launcher:folder-dialog"] }, LauncherFolderDialog, launcherFolderController as any);
  registerIsland(features, { id: "launcher-menus", title: "启动器快捷上下文菜单族", order: 76, root: "vue-launcher-menus-root", capabilities: ["ui:launcher-menus", "launcher:context-menu"] }, LauncherMenus, launcherMenusController as any);
  registerIsland(features, { id: "bookmark-panel", title: "浏览器书签侧边滑动视窗", order: 77, root: "vue-bookmark-panel-root", capabilities: ["ui:bookmark-panel", "bookmarks:panel"] }, BookmarkPanel, bookmarkPanelController as any);
  registerIsland(features, { id: "bookmark-folder-strip", spaOwned: true, title: "顶栏书签快捷文件夹横条", order: 78, root: "vue-bookmark-folder-strip-root", capabilities: ["ui:bookmark-folder-strip", "bookmarks:strip"] }, null as any, bookmarkFolderStripController as any);
  registerIsland(features, { id: "settings-page", title: "独立设置页 Vue 工作台", order: 79, root: "vue-options-root", capabilities: ["ui:settings-page"] }, SettingsView);
  registerIsland(features, { id: "settings-dialog", title: "全局设置中心视窗", order: 80, root: "vue-settings-dialog-root", capabilities: ["ui:settings-dialog", "settings:manage"] }, SettingsDialog, settingsController as any);
  registerIsland(features, { id: "clock-settings-menu", spaOwned: true, title: "中央时钟偏好配置菜单", order: 82, root: "vue-clock-settings-root", capabilities: ["ui:clock-settings", "clock:preference-edit"] }, ClockSettingsMenu, clockSettingsController as any);
  registerIsland(features, { id: "bili-theater-dialog", title: "Bilibili 沉浸剧场与评论区弹窗", order: 85, root: "vue-bili-theater-root", capabilities: ["ui:bili-theater", "bili:playback"] }, BiliTheaterDialog, biliTheaterController as any);
  registerIsland(features, { id: "bili-mini-player", title: "Bilibili 悬浮迷你播放器", order: 85, root: "vue-bili-mini-player-root", capabilities: ["ui:bili-mini-player", "bili:playback"] }, BiliMiniPlayer);
  registerIsland(features, { id: "ai-dialog", title: "AI 助手对话框与知识点抽屉", order: 86, root: "vue-ai-dialog-root", capabilities: ["ui:ai-dialog", "ai:chat"] }, AiDialog, aiDialogController as any);
  registerIsland(features, { id: "aihot-viewer", spaOwned: true, title: "AI HOT 资讯文章阅读器", order: 88, root: "vue-aihot-viewer-root", capabilities: ["ui:aihot-viewer", "viewer:aihot"] }, AihotViewer, aihotViewerController as any);
  registerIsland(features, { id: "nav-wheel", title: "辐射状快捷动作轮盘与悬浮球", order: 95, root: "vue-nav-wheel-root", capabilities: ["ui:nav-wheel", "nav:radial-menu"] }, NavWheelOverlay, navWheelController as any);
  registerIsland(features, { id: "bili-message-panel", spaOwned: true, title: "Bilibili 消息与互动通知中心", order: 102, root: "vue-bili-message-panel-root", capabilities: ["ui:bili-message-panel", "bili:messages"] }, BiliMessagePanel, biliMessagePanelController as any);
  registerIsland(features, { id: "pricing-radar", spaOwned: true, title: "模型插件 (AI 定价与排行榜)", order: 108, root: "vue-pricing-root", capabilities: ["ui:pricing-radar", "pricing:read"] }, ModelPricingCard, pricingController as any);
  registerIsland(features, { id: "bili-favorites", spaOwned: true, title: "b站插件 Vue 外壳", order: 110, root: "vue-bili-favorites-root", capabilities: ["ui:bili-favorites-shell", "bilibili:favorites"] }, BilibiliWorkspace, biliFavoritesController as any);
  registerIsland(features, { id: "youtube-card", spaOwned: true, title: "YouTube 订阅与探索工作台", order: 111, root: "vue-youtube-root", capabilities: ["ui:youtube-card", "youtube:updates"] }, YouTubeCard, youTubeController as any);
  registerIsland(features, { id: "aihot-feed", spaOwned: true, title: "AI HOT 资讯流全功能聚合看板", order: 112, root: "vue-aihot-root", capabilities: ["ui:aihot-feed", "aihot:aggregate"] }, AihotFeed, aihotFeedController as any);
  registerIsland(features, { id: "github-trending", spaOwned: true, title: "GitHub 趋势榜与热门流", order: 114, root: "vue-github-trending-root", capabilities: ["ui:github-trending", "github:trending"] }, GitHubTrending, gitHubTrendingController as any);
}
