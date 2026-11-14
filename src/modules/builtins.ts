import { registerDockModule } from "../sdk/modules";
import { removeRetiredYouTubePageStorage } from "../core/removed-youtube";

try { removeRetiredYouTubePageStorage(); } catch (error) { console.warn("旧 YouTube 数据清理失败", error); }
import { listDockModules } from "./registry";
import { githubDockModule } from "../github/module";
import { bilibiliDockModule } from "../bilibili/module";
import { aihotDockModule } from "../aihot/module";
import { stickersDockModule } from "../stickers/module";
import { musicDockModule } from "../music/module";
import { todoistDockModule } from "../todoist/module";
import { chatDockModule } from "../chat/module";
import { backpackDockModule } from "../backpack/module";
import { multicaDockModule } from "../multica/module";

// Registration imports only lightweight state/settings declarations, not the Vue view.
registerDockModule(chatDockModule);
registerDockModule(backpackDockModule);
registerDockModule(multicaDockModule);
// Register card insertion targets before their dependents to preserve the original Dock order.
registerDockModule(todoistDockModule);
registerDockModule(stickersDockModule);
registerDockModule(musicDockModule);
registerDockModule(aihotDockModule);
registerDockModule(githubDockModule);
registerDockModule(bilibiliDockModule);

export function mergeBuiltinDockCards(legacy: readonly { id: string; title: string; icon: string }[]) {
  const result = legacy.map(entry => ({ ...entry }));
  for (const module of listDockModules()) {
    if (module.presentation !== "card" || module.showInDock === false) continue;
    if (result.some(entry => entry.id === module.id)) throw new Error("Duplicate workspace card entry");
    const entry = { id: module.id, title: module.title, icon: module.icon! };
    const index = module.dockBefore ? result.findIndex(item => item.id === module.dockBefore) : -1;
    result.splice(index < 0 ? result.length : index, 0, entry);
  }
  return result;
}

interface DockMenuEntry { id: string; title: string; icon?: string; emoji?: string }
export function mergeBuiltinDockTools(legacy: readonly DockMenuEntry[]): DockMenuEntry[] {
  const result = legacy.map(entry => ({ ...entry }));
  for (const module of listDockModules()) {
    if (module.showInDock === false || module.presentation === "card") continue;
    if (result.some(entry => entry.id === module.id)) throw new Error("Dock module duplicated in legacy tools");
    const entry: DockMenuEntry = { id: module.id, title: module.title, icon: module.icon, emoji: module.emoji };
    const index = module.dockBefore ? result.findIndex(item => item.id === module.dockBefore) : -1;
    result.splice(index < 0 ? result.length : index, 0, entry);
  }
  return result;
}
