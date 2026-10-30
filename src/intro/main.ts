import "../assets/tokens.css";
import { installPageCopyPolicy } from "../core/page-copy-policy";
installPageCopyPolicy();
import "../assets/styles.css";
import { commandRegistry } from "../core/commands";
import { createFeatureRegistry } from "../core/features";
import { installGlobalControllers } from "../core/globals";
import { registerUiCommands } from "../core/ui-commands";
import { registerUiFeatures } from "../core/ui-features";
import { bookmarksService } from "../services/bookmarks.service";
import { introController } from "./controller";

const featureRegistry = createFeatureRegistry(commandRegistry);

installGlobalControllers(commandRegistry, featureRegistry);
registerUiCommands(commandRegistry);
registerUiFeatures(featureRegistry);
void bookmarksService.loadBookmarks();

void (async () => {
  // Standalone Bilibili actions must be bound before its Vue controls become interactive.
  if (document.getElementById("vue-bili-favorites-root") && !document.getElementById("vue-spa-root")) {
    await import("../services/bilibili-channel.service");
  }
  await featureRegistry.startEager();
  introController.notifyBootReady();
})().catch((error) => console.error("[LogicWeaver] 页面启动失败", error));
window.addEventListener("pagehide", () => { void featureRegistry.stopAll(); }, { once: true });
