import { reactive } from "vue";
import { pluginMarketController } from "../modules/market-store";
import { getDockModule } from "../modules/registry";

export interface ShortcutTool {
  id: string;
  label: string;
  defaultKey: string;
  group: "navigation" | "components";
  moduleId?: string;
  enabledBy?: string;
}

// One catalog for settings and dispatch. Retired tool preferences remain stored,
// but are not presented or executed as live shortcuts.
export const AVAILABLE_SHORTCUT_TOOLS: readonly ShortcutTool[] = [
  { id: "nav-wheel", label: "导航轮盘", defaultKey: "Alt+E", group: "navigation" },
  { id: "toolbox", label: "工具轮盘", defaultKey: "Alt+Q", group: "navigation" },
  { id: "bookmarks", label: "书签侧栏", defaultKey: "Alt+K", group: "navigation" },
  { id: "settings", label: "设置", defaultKey: "Alt+,", group: "navigation" },
  { id: "search", label: "聚焦搜索栏", defaultKey: "/", group: "navigation" },
  { id: "todoist", label: "todoist 任务看板", defaultKey: "Alt+D", group: "components", moduleId: "todoist" },
  { id: "todoist-new-task", label: "todoist 新建任务", defaultKey: "Alt+A", group: "components", moduleId: "todoist" },
  { id: "music", label: "网易云模块", defaultKey: "", group: "components", moduleId: "music" },
  { id: "chat", label: "海狸聊天室（实验性）", defaultKey: "", group: "components", moduleId: "chat" },
  { id: "stickers", label: "表情库", defaultKey: "", group: "components", moduleId: "stickers", enabledBy: "chat" },
  { id: "pricing", label: "模型插件", defaultKey: "", group: "components", moduleId: "daily-pricing" }
];

export const DEFAULT_TOOL_SHORTCUTS: Record<string, string> = Object.fromEntries(
  AVAILABLE_SHORTCUT_TOOLS.map(tool => [tool.id, tool.defaultKey])
);
export const shortcutCaptureState = reactive({ active: false });

export function isEnabledDockEntry(id: string): boolean {
  const definition = getDockModule(id);
  return !!definition && definition.showInDock !== false && pluginMarketController.isInstalled(id);
}

export function isShortcutToolAvailable(id: string): boolean {
  const tool = AVAILABLE_SHORTCUT_TOOLS.find(entry => entry.id === id);
  if (!tool) return isEnabledDockEntry(id);
  if (!tool.moduleId) return true;
  if (tool.enabledBy) return !!getDockModule(tool.moduleId) && pluginMarketController.isInstalled(tool.enabledBy);
  return isEnabledDockEntry(tool.moduleId);
}

export function effectiveShortcut(overrides: Record<string, string>, tool: ShortcutTool): string {
  return Object.prototype.hasOwnProperty.call(overrides, tool.id) && typeof overrides[tool.id] === "string"
    ? overrides[tool.id] : tool.defaultKey;
}

export function parseShortcutEvent(event: KeyboardEvent): string | null {
  const parts: string[] = [];
  if (event.ctrlKey) parts.push("Ctrl");
  if (event.altKey) parts.push("Alt");
  if (event.shiftKey) parts.push("Shift");
  if (event.metaKey) parts.push("Meta");
  const key = event.key;
  if (["Control", "Alt", "Shift", "Meta"].includes(key)) return null;
  let mainKey = key.toUpperCase();
  if (event.code.startsWith("Key")) mainKey = event.code.slice(3);
  else if (event.code.startsWith("Digit")) mainKey = event.code.slice(5);
  else if (key === " ") mainKey = "Space";
  else if ([",", ".", "/"].includes(key)) mainKey = key;
  parts.push(mainKey);
  return parts.join("+");
}
