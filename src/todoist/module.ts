import type { DockModuleDefinition } from "../modules/registry";
import { fullscreenCardState, openRegisteredCard, hideRegisteredCard } from "../core/fullscreen-card-state";
import { todoistModuleState, pauseTodoistReads } from "./module-state";
import { TODOIST_SETTINGS_KEYS } from "./settings-keys";

export const todoistDockModule = {
  schemaVersion: 1, id: "todoist", title: "todoist", icon: "assets/nav-todoist.svg",
  dockBefore: "stickers", rootId: "todoist",
  settingsKeys: TODOIST_SETTINGS_KEYS,
  capabilities: ["view:retained", "tasks:read-write", "attachments:explicit-upload", "settings:account-rules", "calendar:shared"],
  loadView: () => import("./TodoistWorkspace.vue").then(module => module.default),
  lifecycle: {
    isVisible: () => todoistModuleState.visible,
    open: () => { todoistModuleState.visible = true; },
    hide: () => {
      todoistModuleState.visible = false;
      pauseTodoistReads();
    },
    canUnmount: () => todoistModuleState.pendingWrites === 0,
    unmountBlockedMessage: "任务、附件、评论或配置正在写入，暂不能退出/重载；可以隐藏。首页限时任务和独立日历不会随窗口退出停止。"
  }
} satisfies DockModuleDefinition;
