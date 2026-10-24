import type { DockModuleDefinition } from "../modules/registry";
import { MUSIC_SETTINGS_KEYS } from "./settings-keys";
import { musicModuleState, sirenModuleState, pauseMusicReads } from "./module-state";

export const musicDockModule = {
  schemaVersion: 1, id: "music", title: "网易云模块", icon: "assets/netease.svg", dockBefore: "qq",
  rootId: "vue-music-workspace-root", settingsKeys: MUSIC_SETTINGS_KEYS,
  capabilities: ["catalog:read", "settings:endpoint", "account:explicit-login-logout", "playback:shared-home-controls"],
  loadView: () => import("./NeteaseWorkspaceDialog.vue").then(module => module.default),
  lifecycle: {
    isVisible: () => musicModuleState.visible,
    open: () => { musicModuleState.visible = true; },
    hide: () => { musicModuleState.visible = false; pauseMusicReads(); },
    canUnmount: () => musicModuleState.pendingWrites === 0,
    unmountBlockedMessage: "节点保存、登录确认/退出或记录写入正在处理，暂不能退出/重载；可以隐藏。退出窗口不会停止首页播放。"
  }
} satisfies DockModuleDefinition;

export const sirenDockModule = {
  schemaVersion: 1,
  id: "siren",
  title: "塞壬唱片模块",
  emoji: "💿",
  showInDock: false,
  rootId: "vue-siren-workspace-root",
  settingsKeys: [],
  capabilities: ["playback:siren", "catalog:read"],
  loadView: () => import("./SirenWorkspaceDialog.vue").then(module => module.default),
  lifecycle: {
    isVisible: () => sirenModuleState.visible,
    open: () => { sirenModuleState.visible = true; },
    hide: () => { sirenModuleState.visible = false; }
  }
} satisfies DockModuleDefinition;
