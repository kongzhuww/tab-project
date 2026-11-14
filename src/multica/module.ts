import type { DockModuleDefinition } from "../modules/registry";
import { pluginMarketController } from "../modules/market-store";
import { fullscreenCardState, openRegisteredCard, hideRegisteredCard } from "../core/fullscreen-card-state";

export const multicaDockModule = {
  schemaVersion: 1,
  id: "multica",
  title: "Agent 工作台",
  icon: "assets/nav-multica.png",
  emoji: "🤖",
  presentation: "card",
  rootId: "multica",
  settingsKeys: [],
  capabilities: ["workspace:fullscreen", "multica:tasks", "multica:runtimes"],
  loadView: () => import("./MulticaDialog.vue").then(m => m.default),
  lifecycle: {
    isVisible: () => fullscreenCardState.activeId === "multica",
    canOpen: () => pluginMarketController.isInstalled("multica"),
    open: () => { if (pluginMarketController.isInstalled("multica")) openRegisteredCard("multica"); },
    hide: () => hideRegisteredCard("multica")
  }
} satisfies DockModuleDefinition;
