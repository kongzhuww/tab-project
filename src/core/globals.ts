declare const chrome: any;

import { introController } from "../intro/controller";
import { notificationController } from "../notifications/store";
import { safeTarget, biliVideoTargetFromUrl, biliVideoTargetFromText } from "../notifications/history-contract";
import { weatherController } from "../weather/store";
import { clockController } from "../clock/store";
import { searchController } from "../search/store";
import { homeMusicController, homeMusicState } from "../music/store";
import { launcherGroupsController } from "../launchers/store";
import { profileMenuController } from "../profile/store";
import { workspaceLaunchersController } from "../workspaces/store";
import { macDockController } from "../dock/store";
import { calendarViewController } from "../calendar/store";
import { githubStatusController } from "../github/store";
import { githubFolderController } from "../github/folders";
import { githubHeroController } from "../github/hero";
import { githubRepositoryController } from "../github/repositories";
import { githubBatchBarController } from "../github/batch-bar";
import { todoistLabelController } from "../todoist/labels";
import { todoistWorkspaceController } from "../todoist/workspace";
import { todoistCalendarSidebarController } from "../todoist/calendar-sidebar-store";
import { todoistTaskListController } from "../todoist/task-list-store";
import { wallpaperLibraryController } from "../wallpaper/store";
import { notificationHistoryController } from "../notifications/history-store";
import { bookmarkMenuController } from "../bookmarks/menu-store";
import { bookmarkPanelController } from "../bookmarks/panel-store";
import { bookmarkFolderStripController } from "../bookmarks/folder-strip-store";
import { launcherDialogsController } from "../launcher/dialogs-store";
import { settingsController } from "../settings/store";
import { clockSettingsController } from "../clock/settings-store";
import { biliTheaterController } from "../bilibili/theater-store";
import { bilibiliService } from "../services/bilibili.service";
import { biliMiniPlayerController } from "../bilibili/mini-player-store";
import { biliMessagePanelController } from "../bilibili/message-panel-store";
import { radioTapeController } from "../bilibili/radio-tape-store";
import { stickerBoardController } from "../stickers/sticker-board-store";
import { aiDialogController } from "../ai/store";
import { todoistMainWorkspaceController } from "../todoist/main-workspace-store";
import { todoistTaskDetailController } from "../todoist/task-detail-store";
import { aihotViewerController } from "../viewers/store";
import { stickersService, StickersService } from "../services/stickers.service";
import { profileService, ProfileService } from "../services/profile.service";
import { bookmarksService, BookmarksService } from "../services/bookmarks.service";
import { calendarService, CalendarService } from "../services/calendar.service";
import { pricingController } from "../pricing/pricing-store";
import { biliFavoritesController } from "../bilibili/bili-favorites-store";
import { biliOrganizerDialogController } from "../bilibili/organizer-dialog-store";
import { biliUpGroupManagerController } from "../bilibili/up-group-manager-store";
import { biliUpPreviewController } from "../bilibili/up-preview-store";
import { youTubeController } from "../youtube/youtube-store";
import { youTubeService, YouTubeService } from "../services/youtube.service";
import { aihotFeedController } from "../aihot/aihot-feed-store";
import { gitHubTrendingController } from "../github/trending-store";
import { shortcutService } from "../services/shortcut.service";
import { calendarWorkspaceController } from "../calendar/workspace-store";
import { pageVisibility } from "./page-visibility";
import { neteaseService } from "../services/netease.service";
import { kineticDragEngine } from "../utils/kinetic-drag";
import { markdownAstEngine } from "../utils/markdown-ast";
import { navWheelController } from "../nav-wheel/store";
import { navWheelRuntime } from "../nav-wheel/runtime";
import { launcherFolderController } from "../launcher/folder-store";
import { launcherMenusController } from "../launcher/menus-store";
import { windowManagerController, LogicWeaverDomFreezer } from "./window-manager.store";
import { fullscreenCardsController } from "./fullscreen-cards.store";
import { WallpaperService, backgroundDbClear } from "../services/wallpaper.service";
import { launcherService, LauncherService } from "../services/launcher.service";
import { launcherRuntime } from "../launcher/runtime";
import { weatherService } from "../services/weather.service";
import { searchService } from "../services/search.service";
import type { CommandRegistry } from "./commands";
import type { FeatureRegistry } from "./features";

declare global {
  interface Window {
    LogicWeaverWeatherService?: typeof weatherService;
    LogicWeaverSearchService?: typeof searchService;
    LogicWeaverAiHotService?: any;
    LogicWeaverIntro?: typeof introController;
    LogicWeaverNotifications?: typeof notificationController;
    LogicWeaverWindowManager?: typeof windowManagerController;
    LogicWeaverWindowTabs?: typeof windowManagerController;
    LogicWeaverDomFreezer?: typeof LogicWeaverDomFreezer;
    LogicWeaverWallpaperService?: typeof WallpaperService;
    LogicWeaverLauncherService?: typeof launcherService;
    LogicWeaverWeather?: typeof weatherController;
    LogicWeaverClock?: typeof clockController;
    LogicWeaverSearch?: typeof searchController;
    LogicWeaverHomeMusic?: typeof homeMusicController;
    LogicWeaverLauncherGroups?: typeof launcherGroupsController;
    LogicWeaverProfileMenu?: typeof profileMenuController;
    LogicWeaverWorkspaceLaunchers?: typeof workspaceLaunchersController;
    LogicWeaverMacDock?: typeof macDockController;
    LogicWeaverBackgroundLibrary?: typeof wallpaperLibraryController;
    LogicWeaverNotificationCenter?: typeof notificationHistoryController;
    LogicWeaverBookmarkMenu?: typeof bookmarkMenuController;
    LogicWeaverBookmarkPanel?: typeof bookmarkPanelController;
    LogicWeaverBookmarkFolderStrip?: typeof bookmarkFolderStripController;
    LogicWeaverLauncherDialogs?: typeof launcherDialogsController;
    LogicWeaverLauncherFolder?: typeof launcherFolderController;
    LogicWeaverLauncherMenus?: typeof launcherMenusController;
    LogicWeaverSettings?: typeof settingsController;
    LogicWeaverClockSettings?: typeof clockSettingsController;
    LogicWeaverBiliTheater?: typeof biliTheaterController;
    LogicWeaverBilibiliService?: typeof bilibiliService;
    LogicWeaverBiliMiniPlayer?: typeof biliMiniPlayerController;
    LogicWeaverAiDialog?: typeof aiDialogController;
    LogicWeaverAihotViewer?: typeof aihotViewerController;
    LogicWeaverNavWheel?: typeof navWheelController;
    LogicWeaverShortcuts?: typeof shortcutService;
    LogicWeaverCommands?: CommandRegistry;
    LogicWeaverFeatures?: FeatureRegistry;
    LogicWeaverCalendarView?: typeof calendarViewController;
    LogicWeaverCalendar?: { open(): void; refresh(): Promise<unknown>; goToday(): void };
    LogicWeaverGitHubStatus?: typeof githubStatusController;
    LogicWeaverGitHubFolders?: typeof githubFolderController;
    LogicWeaverGitHubHero?: typeof githubHeroController;
    LogicWeaverGitHubRepositories?: typeof githubRepositoryController;
    LogicWeaverGitHubBatchBar?: typeof githubBatchBarController;
    LogicWeaverGitHub?: { refresh(): Promise<unknown> | void };
    LogicWeaverTodoistLabels?: typeof todoistLabelController;
    LogicWeaverTodoistWorkspace?: typeof todoistWorkspaceController;
    LogicWeaverTodoistCalendarSidebar?: typeof todoistCalendarSidebarController;
    LogicWeaverTodoistTaskList?: typeof todoistTaskListController;
    LogicWeaverBiliMessagePanel?: typeof biliMessagePanelController;
    LogicWeaverStickerBoard?: typeof stickerBoardController;
    LogicWeaverPricing?: typeof pricingController;
    LogicWeaverBiliFavorites?: typeof biliFavoritesController;
    LogicWeaverBiliRadioTape?: typeof radioTapeController;
    LogicWeaverBiliOrganizerDialogs?: typeof biliOrganizerDialogController;
    LogicWeaverBiliUpGroupManager?: typeof biliUpGroupManagerController;
    LogicWeaverBiliUpPreview?: typeof biliUpPreviewController;
    LogicWeaverYouTube?: typeof youTubeController;
    LogicWeaverYouTubeService?: typeof youTubeService;
    LogicWeaverAihotFeed?: typeof aihotFeedController;
    LogicWeaverGitHubTrending?: typeof gitHubTrendingController;
    LogicWeaverCalendarWorkspace?: typeof calendarWorkspaceController;
    LogicWeaverTodoistMainWorkspace?: typeof todoistMainWorkspaceController;
    LogicWeaverTodoistTaskDetail?: typeof todoistTaskDetailController;
    LogicWeaverTodoist?: { open(): void; refresh(): Promise<unknown> | void; quickAdd(): void };
    LogicWeaverStickersService?: StickersService;
    LogicWeaverProfileService?: ProfileService;
    LogicWeaverBookmarksService?: BookmarksService;
    LogicWeaverCalendarService?: CalendarService;
  }
}

export function installGlobalControllers(commands: CommandRegistry, features: FeatureRegistry): void {
  window.LogicWeaverIntro = introController;
  window.LogicWeaverNotifications = notificationController;
  window.LogicWeaverWindowManager = windowManagerController;
  window.LogicWeaverWindowTabs = windowManagerController as unknown as typeof window.LogicWeaverWindowTabs;
  window.LogicWeaverDomFreezer = LogicWeaverDomFreezer as unknown as typeof window.LogicWeaverDomFreezer;
  window.LogicWeaverWallpaperService = WallpaperService;
  window.LogicWeaverLauncherService = launcherService;
  (window as any).LogicWeaverLauncherRuntime = launcherRuntime;
  window.LogicWeaverProfileService = profileService;
  try { profileService.init(); } catch (err) { console.error("[ProfileService] init failed:", err); }
  window.LogicWeaverBookmarksService = bookmarksService;
  window.LogicWeaverCalendarService = calendarService;
  window.LogicWeaverWeather = weatherController;
  window.LogicWeaverWeatherService = weatherService;
  window.LogicWeaverClock = clockController;
  window.LogicWeaverSearch = searchController;
  window.LogicWeaverSearchService = searchService;
  Object.defineProperty(window, "LogicWeaverAiHotService", {
    configurable: true,
    get: () => {
      void import("../services/aihot.service").then(({ aiHotService }) => {
        (window as any).LogicWeaverAiHotService = aiHotService;
      });
      return undefined;
    }
  });
  window.LogicWeaverHomeMusic = homeMusicController;
  window.LogicWeaverLauncherGroups = launcherGroupsController;
  window.LogicWeaverProfileMenu = profileMenuController;
  window.LogicWeaverWorkspaceLaunchers = workspaceLaunchersController;
  window.LogicWeaverMacDock = macDockController;
  (window as any).LogicWeaverFullscreen = fullscreenCardsController;
  (window as any).enterFullscreenCard = (id: string) => fullscreenCardsController.enter(id);
  (window as any).exitFullscreenCard = () => fullscreenCardsController.exit();
  (window as any).cycleFullscreenCard = () => fullscreenCardsController.cycle();
  (window as any).LogicWeaverPageVisibility = pageVisibility;
  window.LogicWeaverBackgroundLibrary = wallpaperLibraryController;
  window.LogicWeaverNotificationCenter = notificationHistoryController;
  window.LogicWeaverBookmarkMenu = bookmarkMenuController;
  window.LogicWeaverBookmarkPanel = bookmarkPanelController;
  window.LogicWeaverBookmarkFolderStrip = bookmarkFolderStripController;
  window.LogicWeaverLauncherDialogs = launcherDialogsController;
  window.LogicWeaverLauncherFolder = launcherFolderController;
  window.LogicWeaverLauncherMenus = launcherMenusController;
  window.LogicWeaverSettings = settingsController;
  window.LogicWeaverClockSettings = clockSettingsController;
  window.LogicWeaverBiliTheater = biliTheaterController;
  window.LogicWeaverBilibiliService = bilibiliService;
  (window as any).getBiliJct = () => bilibiliService.getBiliJct();
  window.LogicWeaverBiliMiniPlayer = biliMiniPlayerController;
  (window as any).openBiliMiniPlayer = (video: any) => biliMiniPlayerController.openVideo(video);
  window.LogicWeaverAiDialog = aiDialogController;
  window.LogicWeaverAihotViewer = aihotViewerController;
  window.LogicWeaverNavWheel = navWheelController;
  (window as any).openNavWheel = (x?: number, y?: number) => navWheelRuntime.open(x, y);
  (window as any).closeNavWheel = () => navWheelRuntime.close();
  (window as any).toggleNavWheel = (atMouse?: boolean) => navWheelRuntime.toggle(atMouse);
  (window as any).toggleToolWheel = (atMouse?: boolean) => navWheelRuntime.toggleTools(atMouse);
  (window as any).setNavWheelMode = (mode: "main" | "tools" | "shortcuts") => navWheelRuntime.setMode(mode);
  window.LogicWeaverShortcuts = shortcutService;
  (window as any).triggerToolShortcut = (id: string) => shortcutService.triggerToolShortcut(id);
  window.LogicWeaverCommands = commands;
  window.LogicWeaverFeatures = features;
  window.LogicWeaverCalendarView = calendarViewController;
  window.LogicWeaverGitHubStatus = githubStatusController;
  window.LogicWeaverGitHubFolders = githubFolderController;
  window.LogicWeaverGitHubHero = githubHeroController;
  window.LogicWeaverGitHubRepositories = githubRepositoryController;
  window.LogicWeaverGitHubBatchBar = githubBatchBarController;
  window.LogicWeaverTodoistLabels = todoistLabelController;
  window.LogicWeaverTodoistWorkspace = todoistWorkspaceController;
  window.LogicWeaverTodoistCalendarSidebar = todoistCalendarSidebarController;
  window.LogicWeaverTodoistTaskList = todoistTaskListController;
  window.LogicWeaverBiliMessagePanel = biliMessagePanelController;
  window.LogicWeaverStickerBoard = stickerBoardController;
  window.LogicWeaverStickersService = stickersService;
  // Shared QQ/standalone data only; each mounted board owns its Vue action subscription.
  window.LogicWeaverPricing = pricingController;
  window.LogicWeaverBiliFavorites = biliFavoritesController;
  window.LogicWeaverBiliRadioTape = radioTapeController;
  window.LogicWeaverBiliOrganizerDialogs = biliOrganizerDialogController;
  window.LogicWeaverBiliUpGroupManager = biliUpGroupManagerController;
  window.LogicWeaverBiliUpPreview = biliUpPreviewController;
  window.LogicWeaverYouTube = youTubeController;
  window.LogicWeaverAihotFeed = aihotFeedController;
  window.LogicWeaverGitHubTrending = gitHubTrendingController;
  window.LogicWeaverCalendarWorkspace = calendarWorkspaceController;
  window.LogicWeaverCalendar = calendarWorkspaceController;
  window.LogicWeaverTodoistMainWorkspace = todoistMainWorkspaceController;
  window.LogicWeaverTodoistTaskDetail = todoistTaskDetailController;
  (window as any).openBiliTheater = (video: any) => biliTheaterController.openVideo(video);
  (window as any).closeBiliTheater = () => biliTheaterController.close();

  // 1. 全局 Windows 10/11 亚克力浮窗通知门面
  (window as any).showWindowsToast = (opts: any) => {
    if (!opts) return null;
    const target = safeTarget(opts.target) || biliVideoTargetFromUrl(opts.url) ||
      (opts.appType === "bili" ? biliVideoTargetFromText([opts.title, opts.subtitle, opts.message].filter(value => typeof value === "string").join(" ")) : undefined);
    return notificationController.show({
      ...opts,
      target,
      onClick: () => {
        if (typeof opts?.onClick === "function") return opts.onClick();
        if (target) return notificationHistoryController.openTarget(target);
        if (opts?.url) {
          window.open(opts.url, "_blank");
          return;
        }
      }
    });
  };

  // 2. 快捷系统通用 Toast
  (window as any).showToast = (text: string, isError = false, duration = 3200) => {
    return (window as any).showWindowsToast({
      appName: "系统提醒",
      icon: isError ? "assets/error.svg" : "assets/logo.png",
      title: isError ? "操作提醒" : "系统提醒",
      subtitle: text,
      duration
    });
  };

  // 3. 全局统一 B站专属 Toast
  (window as any).showBiliToast = (text: string, durationOrOptions: number | Record<string, any> = 3200, extraOptions: any = {}) => {
    const opts = typeof durationOrOptions === "object" && durationOrOptions ? durationOrOptions : extraOptions;
    const duration = typeof durationOrOptions === "number" ? durationOrOptions : 3200;
    const isError = opts.isError || /失败|错误|异常|未获取|未找到/i.test(text);
    const title = opts.title || (isError ? "B站操作未完成" : "哔哩哔哩");
    const subtitle = opts.subtitle || (text.length > 36 ? "" : text);
    const message = opts.message || (opts.subtitle ? text : (text.length > 36 ? text : ""));
    const toastData = {
      id: opts.id || `bili_toast_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      appType: "bili",
      appName: "哔哩哔哩",
      icon: "assets/bilibili.svg",
      title,
      subtitle: subtitle || text,
      message: message && message !== subtitle ? message : "",
      showActions: Boolean(opts.showActions || opts.actionLabel),
      actionLabel: opts.actionLabel || "",
      onClick: opts.onClick || null,
      target: safeTarget(opts.target) || biliVideoTargetFromUrl(opts.url) || safeTarget({ type: "bili-video", bvid: opts.bvid, aid: opts.aid ? String(opts.aid) : undefined }),
      url: opts.url,
      duration: Math.max(3000, duration)
    };
    return (window as any).showWindowsToast(toastData);
  };

  // 4. 抓取与资讯 Toast
  (window as any).showFetchToast = (appName: string, title: string, subtitle = "", icon = "assets/logo.png", duration = 3200) => {
    return (window as any).showWindowsToast({
      appName,
      title,
      subtitle,
      icon: icon || "assets/logo.png",
      duration,
      showActions: false,
      actionLabel: "",
      appType: "fetch"
    });
  };
  (window as any).LogicWeaverKineticDrag = kineticDragEngine;
  (window as any).LogicWeaverMarkdownAst = markdownAstEngine;
  (window as any).setLauncherBackground = (val: any) => WallpaperService.setWallpaper(val);
  (window as any).backgroundDbClear = (key?: string) => backgroundDbClear(key);
  (window as any).openBackgroundHistory = () => wallpaperLibraryController.openDialog();
}
