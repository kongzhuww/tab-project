import type { DockModuleDefinition } from "../modules/registry";
import { WEBDAV_SETTINGS_KEYS } from "./settings";
import { syncModuleState } from "./module-state";

export const syncDockModule = {
  schemaVersion: 1,
  id: "sync",
  title: "同步模块",
  emoji: "☁️",
  dockBefore: "qq",
  rootId: "vue-sync-workspace-root",
  settingsKeys: WEBDAV_SETTINGS_KEYS,
  capabilities: ["settings:local", "backup:webdav", "backup:native"],
  loadView: () => import("./SyncWorkspaceDialog.vue").then(module => module.default),
  lifecycle: {
    isVisible: () => syncModuleState.visible,
    open: () => { syncModuleState.visible = true; },
    hide: () => { syncModuleState.visible = false; },
    canUnmount: () => !syncModuleState.busy,
    unmountBlockedMessage: "同步模块正在保存、测试或传输，不能退出或重载；可先隐藏窗口。关闭窗口不会撤销已发送的任务。"
  }
} satisfies DockModuleDefinition;
