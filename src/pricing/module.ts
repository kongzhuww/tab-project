import type { DockModuleDefinition } from "../modules/registry";
import { fullscreenCardState, openRegisteredCard, hideRegisteredCard } from "../core/fullscreen-card-state";
import { PRICING_SETTINGS_KEYS } from "./settings";

export const pricingDockModule = {
  schemaVersion: 1, id: "daily-pricing", title: "模型插件", icon: "assets/nav-pricing.svg",
  presentation: "card", rootId: "daily-pricing",
  settingsKeys: PRICING_SETTINGS_KEYS,
  capabilities: ["workspace:fullscreen", "view:retained", "pricing:bundled-data"],
  loadView: () => import("./ModelPricingCard.vue").then(module => module.default),
  lifecycle: {
    isVisible: () => fullscreenCardState.activeId === "daily-pricing",
    open: () => openRegisteredCard("daily-pricing"),
    hide: () => hideRegisteredCard("daily-pricing"),
    // Keep settings drafts, filters and in-memory favorites across Hide.
    // Registration does not add live data fetching or independent Quit/Reload.
    canUnmount: () => false,
    unmountBlockedMessage: "模型价格保留原有隐藏保活设计；尚未开放独立退出/重载，以免丢失设置草稿与本页关注。"
  }
} satisfies DockModuleDefinition;
