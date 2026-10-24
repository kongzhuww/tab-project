import type { DockModuleDefinition } from "../modules/registry";
import { fullscreenCardState, openRegisteredCard, hideRegisteredCard } from "../core/fullscreen-card-state";

export const workbenchDockModule = {
  schemaVersion: 1,
  id: "workbench",
  title: "工作台",
  icon: "assets/nav-workbench.svg",
  presentation: "card",
  dockBefore: "todoist",
  rootId: "workbench-workspace",
  mountPolicy: "workspace-ready",
  settingsKeys: [],
  capabilities: ["workspace:fullscreen", "view:retained"],
  loadView: () => import("./WorkbenchWorkspace.vue").then(m => m.default),
  lifecycle: {
    isVisible: () => fullscreenCardState.activeId === "workbench",
    open: () => openRegisteredCard("workbench"),
    hide: () => hideRegisteredCard("workbench"),
    canUnmount: () => false,
    unmountBlockedMessage: "工作台保持运行以随时切换焦点。"
  }
} satisfies DockModuleDefinition;
