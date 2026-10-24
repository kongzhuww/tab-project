import type { DockModuleDefinition } from "../modules/registry";
import { fullscreenCardState, openRegisteredCard, hideRegisteredCard } from "../core/fullscreen-card-state";

export const githubDockModule = {
  schemaVersion: 1, id: "card-github", title: "github插件", icon: "assets/nav-github.svg",
  presentation: "card", dockBefore: "daily-aihot", rootId: "card-github",
  settingsKeys: ["ghUser", "ghToken", "ghAiServiceConfigV1", "ghArchifyWebhookUrl"],
  capabilities: ["workspace:fullscreen", "view:retained", "github:repositories"],
  loadView: () => import("./GitHubWorkspaceCard.vue").then(module => module.default),
  lifecycle: {
    isVisible: () => fullscreenCardState.activeId === "card-github",
    open: () => openRegisteredCard("card-github"),
    hide: () => hideRegisteredCard("card-github"),
    // Existing card menus do not expose Quit/Reload. Do not introduce a destructive new path
    // until settings drafts and every child editor provide an aggregate unmount guard.
    canUnmount: () => false,
    unmountBlockedMessage: "GitHub 工作区保留原有隐藏保活设计；尚未开放独立退出/重载，以免丢失草稿。"
  }
} satisfies DockModuleDefinition;
