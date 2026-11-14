import type { DockModuleDefinition } from "../modules/registry";
import { backpackModuleState } from "./module-state";
import { pluginMarketController } from "../modules/market-store";
import { BACKPACK_STORAGE_KEY, BACKPACK_CATEGORIES_KEY } from "./constants";

export const backpackDockModule = {
  schemaVersion: 1,
  id: "backpack",
  title: "提示词背包",
  emoji: "🎒",
  rootId: "vue-backpack-dialog-root",
  settingsKeys: [BACKPACK_STORAGE_KEY, BACKPACK_CATEGORIES_KEY],
  capabilities: ["prompt:read", "prompt:write", "prompt:clipboard"],
  loadView: () => import("./BackpackDialog.vue").then((m) => m.default),
  lifecycle: {
    isVisible: () => backpackModuleState.visible,
    canOpen: () => pluginMarketController.isInstalled("backpack"),
    open: () => {
      if (!pluginMarketController.isInstalled("backpack")) return;
      backpackModuleState.visible = true;
    },
    hide: () => {
      backpackModuleState.visible = false;
    },
    canUnmount: () => backpackModuleState.pendingWrites === 0
  }
} satisfies DockModuleDefinition;
