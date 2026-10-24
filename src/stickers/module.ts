import type { DockModuleDefinition } from "../modules/registry";
import { STICKER_SETTINGS_KEYS } from "./settings-keys";
import { stickersModuleState, pauseStickersReads } from "./module-state";
export const stickersDockModule = {
  schemaVersion: 1,
  id: "stickers", title: "表情包模块", emoji: "😺",
  // Keep the chat picker's library management window without a standalone Dock entry.
  showInDock: false,
  rootId: "vue-stickers-dialog-root",
  settingsKeys: STICKER_SETTINGS_KEYS,
  capabilities: ["folder:explicit-permission", "image:explicit-save-delete", "image:local-preview", "image:clipboard", "qq:explicit-send"],
  loadView: () => import("./StickersDialog.vue").then(module => module.default),
  lifecycle: {
    isVisible: () => stickersModuleState.visible,
    open: () => { stickersModuleState.visible = true; },
    hide: () => { stickersModuleState.visible = false; pauseStickersReads(); },
    canUnmount: () => stickersModuleState.pendingWrites === 0,
    unmountBlockedMessage: "图片保存/删除、目录授权/偏好或QQ发送正在处理，暂不能退出/重载；可以先隐藏，已提交操作不会撤回。"
  }
} satisfies DockModuleDefinition;
