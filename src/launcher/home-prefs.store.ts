import { watch, type WatchStopHandle } from "vue";
import { homePrefsState } from "./home-prefs-state";
export { homePrefsState } from "./home-prefs-state";
import { launcherGroupsController } from "../launchers/store";
import { bookmarkPanelController } from "../bookmarks/panel-store";

type Key = keyof typeof homePrefsState;
const keys = Object.keys(homePrefsState) as Key[];
let started = false;
let generation = 0;
let listener: ((changes: Record<string, { newValue: unknown }>, area: string) => void) | undefined;
let stopWatch: WatchStopHandle | undefined;

function applyPrefs(values: Record<string, unknown>): void {
  for (const key of keys) {
    if (Object.prototype.hasOwnProperty.call(values, key)) homePrefsState[key] = values[key] !== false;
  }
}
function syncView(): void {
  const prefs = homePrefsState;
  launcherGroupsController.setPrefs(prefs.showSites, prefs.showTodo, !prefs.showTodo && prefs.showBili);
  document.body.classList.toggle("hide-weather", !prefs.showWeather);
  document.body.classList.toggle("hide-sites", !prefs.showSites);
  document.body.classList.toggle("hide-bili", !prefs.showBili);
  document.body.classList.toggle("hide-youtube", !prefs.showYouTube);
  document.body.classList.toggle("hide-todo", !prefs.showTodo);
  document.body.classList.toggle("hide-bookmarks", !prefs.showBookmarkPanel);
  if (!prefs.showBookmarkPanel) bookmarkPanelController.close();
}

export const homePrefsRuntime = {
  start(): void {
    if (started) return;
    started = true;
    const currentGeneration = ++generation;
    stopWatch = watch(() => keys.map((key) => homePrefsState[key]), syncView, { immediate: true, flush: "sync" });
    const chrome = (globalThis as any).chrome;
    listener = (changes, area) => {
      if (area !== "local") return;
      const updates: Record<string, unknown> = {};
      for (const key of keys) if (changes[key]) updates[key] = changes[key].newValue;
      applyPrefs(updates);
    };
    chrome?.storage?.onChanged?.addListener(listener);
    if (chrome?.storage?.local) {
      void chrome.storage.local.get(keys).then((stored: Record<string, unknown>) => {
        if (started && generation === currentGeneration) applyPrefs(stored || {});
      }).catch((error: unknown) => console.warn("[HomePrefs] 读取首页设置失败", error));
    }
  },
  stop(): void {
    started = false;
    generation++;
    stopWatch?.();
    stopWatch = undefined;
    if (listener) (globalThis as any).chrome?.storage?.onChanged?.removeListener(listener);
    listener = undefined;
  }
};
