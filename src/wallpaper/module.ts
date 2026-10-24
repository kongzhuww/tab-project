import type { DockModuleDefinition } from "../modules/registry";
import { WALLPAPER_SETTINGS_KEYS } from "./settings-keys";
import { wallpaperModuleState, pauseWallpaperReads } from "./module-state";
export const wallpaperDockModule = {
  schemaVersion: 1, id: "wallpaper", title: "壁纸模块", emoji: "🖼️",
  rootId: "vue-wallpaper-workspace-root", settingsKeys: WALLPAPER_SETTINGS_KEYS,
  capabilities: ["library:local-media", "wallpaper:explicit-apply", "library:explicit-import-rename-delete"],
  loadView: () => import("./WallpaperWorkspace.vue").then(module => module.default),
  lifecycle: {
    isVisible: () => wallpaperModuleState.visible,
    open: () => { wallpaperModuleState.visible = true; },
    hide: () => { wallpaperModuleState.visible = false; pauseWallpaperReads(); },
    canUnmount: () => wallpaperModuleState.pendingWrites === 0,
    unmountBlockedMessage: "壁纸导入/保存/删除/应用正在处理，暂不能退出或重载；可以隐藏。退出管理窗口不会停止当前壁纸。"
  }
} satisfies DockModuleDefinition;
