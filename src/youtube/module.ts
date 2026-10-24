import type { DockModuleDefinition } from "../modules/registry";
import { fullscreenCardState, openRegisteredCard, hideRegisteredCard } from "../core/fullscreen-card-state";
import { homePrefsState } from "../launcher/home-prefs-state";

export const youtubeDockModule = {
  schemaVersion: 1, id: "daily-youtube", title: "youtube插件", icon: "assets/nav-youtube.svg",
  presentation: "card", dockBefore: "daily-pricing", rootId: "daily-youtube",
  showInDock: true,
  settingsKeys: ["youtubeModuleSettingsV1"],
  capabilities: ["workspace:fullscreen", "view:retained", "youtube:recommendations", "youtube:favorites"],
  loadView: () => import("./YouTubeCard.vue").then(module => module.default),
  lifecycle: {
    // Match the original retained-mount condition, including the shared homepage preference.
    isVisible: () => fullscreenCardState.activeId === "daily-youtube" && homePrefsState.showYouTube,
    open: () => openRegisteredCard("daily-youtube"),
    hide: () => hideRegisteredCard("daily-youtube"),
    // Preserve existing card menus. Settings drafts and shared writes are not yet
    // aggregated into a safe independent Quit/Reload guard.
    canUnmount: () => false,
    unmountBlockedMessage: "YouTube 工作区保留原有隐藏保活设计；尚未开放独立退出/重载，以免丢失设置草稿或打断收藏操作。"
  }
} satisfies DockModuleDefinition;
