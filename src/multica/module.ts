import type { DockModuleDefinition } from "../modules/registry";
import { pluginMarketController } from "../modules/market-store";
import { fullscreenCardState, openRegisteredCard, hideRegisteredCard } from "../core/fullscreen-card-state";
import { notificationHistoryState } from "../notifications/history-store";
import { unreadAiCount } from "./notification-filter";

export const multicaDockModule = {
  schemaVersion: 1,
  id: "multica",
  title: "AI 工作区",
  icon: "assets/nav-ai.svg",
  emoji: "✦",
  presentation: "card",
  rootId: "multica",
  settingsKeys: [],
  capabilities: ["workspace:fullscreen", "ai:native", "ai:byok"],
  badgeCount: () => unreadAiCount(notificationHistoryState.items),
  loadView: () => import("./MulticaDialog.vue").then(m => m.default),
  lifecycle: {
    isVisible: () => fullscreenCardState.activeId === "multica",
    canOpen: () => pluginMarketController.isInstalled("multica"),
    open: () => { if (pluginMarketController.isInstalled("multica")) openRegisteredCard("multica"); },
    hide: () => hideRegisteredCard("multica")
  }
} satisfies DockModuleDefinition;
