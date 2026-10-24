import type { DockModuleDefinition } from "../modules/registry";
import { fullscreenCardState, openRegisteredCard, hideRegisteredCard } from "../core/fullscreen-card-state";

export const bilibiliDockModule = {
  schemaVersion: 1, id: "daily-bilibili", title: "b站插件", icon: "assets/bilibili.svg",
  presentation: "card", dockBefore: "card-github", rootId: "daily-bilibili",
  // Preserve the existing workspace-ready mount while shared playback/startup is audited.
  mountPolicy: "workspace-ready",
  // Cache directory handles remain in the existing IndexedDB service, not chrome settings.
  settingsKeys: [],
  capabilities: ["workspace:fullscreen", "view:retained", "bilibili:favorites"],
  loadView: () => import("./BilibiliWorkspace.vue").then(module => module.default),
  lifecycle: {
    isVisible: () => fullscreenCardState.activeId === "daily-bilibili",
    open: () => openRegisteredCard("daily-bilibili"),
    hide: () => hideRegisteredCard("daily-bilibili"),
    // Hide must not dispose shared radio/player state or interrupt folder/cache operations.
    canUnmount: () => false,
    unmountBlockedMessage: "B站收藏保留原有隐藏保活设计；尚未开放独立退出/重载，以免打断播放、收藏或缓存操作。"
  }
} satisfies DockModuleDefinition;
