import type { DockModuleDefinition } from "../modules/registry";
import { fullscreenCardState, openRegisteredCard, hideRegisteredCard } from "../core/fullscreen-card-state";

export const aihotDockModule = {
  schemaVersion: 1, id: "daily-aihot", title: "ai hot插件", icon: "assets/nav-aihot.svg",
  presentation: "card", dockBefore: "daily-pricing", rootId: "daily-aihot",
  // Existing localStorage preferences; registration neither reads nor migrates them.
  settingsKeys: ["lw-info-feed-view", "lw-aihot-feed-cat", "lw-aihot-feed-window"],
  capabilities: ["workspace:fullscreen", "view:retained", "aihot:aggregate"],
  loadView: () => import("./AihotFeed.vue").then(module => module.default),
  lifecycle: {
    isVisible: () => fullscreenCardState.activeId === "daily-aihot",
    open: () => openRegisteredCard("daily-aihot"),
    hide: () => hideRegisteredCard("daily-aihot"),
    // Keep the original retained card. Its view owns list activity;
    // the separate article reader is not owned or closed by this module.
    canUnmount: () => false,
    unmountBlockedMessage: "AI HOT 保留原有隐藏保活设计；尚未开放独立退出/重载。"
  }
} satisfies DockModuleDefinition;
