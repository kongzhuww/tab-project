/**
 * ShortcutService — 全局快捷键调度与管理纯数据服务
 * 统一管理 LogicWeaver 全局快捷键、输入框拦截保护、与 windowManagerController 及各大工作区的直接联动
 */

import { windowManagerController } from "../core/window-manager.store";
import { bookmarkPanelController } from "../bookmarks/panel-store";
import { settingsController } from "../settings/store";
import { navWheelRuntime } from "../nav-wheel/runtime";
import { fullscreenCardsController } from "../core/fullscreen-cards.store";

import { getDockModule } from "../modules/registry";
import { DEFAULT_TOOL_SHORTCUTS, isShortcutToolAvailable, parseShortcutEvent, shortcutCaptureState } from "./shortcut-catalog";
export { DEFAULT_TOOL_SHORTCUTS, parseShortcutEvent } from "./shortcut-catalog";

declare const chrome: any;

export class ShortcutService {
  private static instance: ShortcutService;
  private activeShortcuts: Record<string, string> = { ...DEFAULT_TOOL_SHORTCUTS };
  private isListenerBound = false;
  private storageListenerBound = false;
  private shortcutReadVersion = 0;

  private constructor() {
    this.initShortcuts();
  }

  public static getInstance(): ShortcutService {
    if (!ShortcutService.instance) {
      ShortcutService.instance = new ShortcutService();
    }
    return ShortcutService.instance;
  }

  public getShortcuts(): Record<string, string> {
    return { ...this.activeShortcuts };
  }

  public async setShortcut(toolId: string, shortcut: string): Promise<void> {
    if (typeof toolId !== "string" || !toolId || typeof shortcut !== "string") {
      throw new Error("快捷键参数无效，未保存");
    }
    if (typeof chrome === "undefined" || !chrome.storage?.local) {
      throw new Error("快捷键存储不可用，未保存");
    }
    // Public legacy API stays available, without adding the settings domain to startup imports.
    const { optionsService, SHORTCUT_STORAGE_KEY } = await import("./options.service");
    const stored = await chrome.storage.local.get(SHORTCUT_STORAGE_KEY);
    const baseline = stored[SHORTCUT_STORAGE_KEY];
    const desired = { ...(baseline || {}), [toolId]: shortcut };
    const version = this.shortcutReadVersion;
    const accepted = await optionsService.saveSettings(
      { [SHORTCUT_STORAGE_KEY]: desired }, { [SHORTCUT_STORAGE_KEY]: baseline });
    // Do not overwrite a newer storage event/read with this request's completion.
    // Errors propagate; there is no optimistic runtime update or fallback-default write.
    if (version === this.shortcutReadVersion) {
      ++this.shortcutReadVersion;
      this.applyShortcutOverrides(accepted[SHORTCUT_STORAGE_KEY]);
    }
  }

  private applyShortcutOverrides(value: unknown): void {
    const entries = value && typeof value === "object" && !Array.isArray(value)
      ? Object.entries(value).filter((entry): entry is [string, string] =>
        Object.prototype.hasOwnProperty.call(DEFAULT_TOOL_SHORTCUTS, entry[0]) && typeof entry[1] === "string") : [];
    this.activeShortcuts = { ...DEFAULT_TOOL_SHORTCUTS, ...Object.fromEntries(entries) };
  }

  public async initShortcuts(): Promise<void> {
    if (typeof chrome === "undefined" || !chrome.storage?.local) return;
    try {
      if (!this.storageListenerBound && chrome.storage?.onChanged?.addListener) {
        chrome.storage.onChanged.addListener((changes: any, area: string) => {
          if (area === "local" && Object.prototype.hasOwnProperty.call(changes, "customShortcuts")) {
            ++this.shortcutReadVersion;
            this.applyShortcutOverrides(changes.customShortcuts.newValue);
          }
        });
        this.storageListenerBound = true;
      }
      const version = ++this.shortcutReadVersion;
      const stored = await chrome.storage.local.get("customShortcuts");
      if (version === this.shortcutReadVersion) this.applyShortcutOverrides(stored?.customShortcuts);
    } catch {
      // Preserve current runtime dispatch when a read fails; never persist fallback defaults.
    }
  }

  /**
   * 分发触发指定工具的快捷动作
   */
  public triggerToolShortcut(toolId: string): boolean {
    if (!toolId || !isShortcutToolAvailable(toolId)) return false;

    // Only registered, enabled modules can be dispatched as module shortcuts.
    if (getDockModule(toolId)) {
      windowManagerController.handleToolClick(toolId);
      return true;
    }

    // 2. 独立面板与覆盖层
    switch (toolId) {
      case "bookmarks": {
        bookmarkPanelController.toggle();
        return true;
      }
      case "settings": {
        settingsController.open();
        return true;
      }
      case "nav-wheel": {
        navWheelRuntime.toggle(true);
        return true;
      }
      case "toolbox": {
        navWheelRuntime.toggleTools(true);
        return true;
      }
      case "pricing": {
        fullscreenCardsController.enter("daily-pricing");
        return true;
      }
      case "search": {
        if (typeof document !== "undefined") {
          const input = document.getElementById("search-input") as HTMLInputElement | null;
          if (input) {
            input.focus();
            input.select();
            return true;
          }
        }
        return false;
      }
      case "todoist-new-task": {
        if (typeof window !== "undefined" && typeof (window as any).triggerTodoistQuickAdd === "function") {
          (window as any).triggerTodoistQuickAdd();
        } else {
          windowManagerController.handleToolClick("todoist");
        }
        return true;
      }
      default: {
        const tabs = (window as any).LogicWeaverWindowTabs;
        if (tabs?.isOpen?.(toolId)) {
          if (tabs.isActive?.(toolId)) tabs.minimize(toolId);
          else tabs.activate(toolId);
          return true;
        }
        if (tabs?.open) {
          tabs.open(toolId);
          return true;
        }
        return false;
      }
    }
  }

  /**
   * 绑定全局键盘监听器
   */
  public bindGlobalListener(): void {
    if (this.isListenerBound || typeof window === "undefined") return;
    this.isListenerBound = true;

    window.addEventListener(
      "keydown",
      (event: KeyboardEvent) => {
        if (shortcutCaptureState.active || event.defaultPrevented || event.isComposing || event.repeat) return;
        // 如果正在输入文字且未按功能组合键（Alt/Ctrl/Meta），不拦截日常打字（例如输入 "/"）
        const inInput =
          event.target &&
          ((event.target as HTMLElement).matches("input, textarea, select") ||
            (event.target as HTMLElement).isContentEditable);

        if (inInput && !event.altKey && !event.ctrlKey && !event.metaKey) {
          return;
        }

        const pressed = parseShortcutEvent(event);
        if (!pressed) return;

        const pressedLower = pressed.toLowerCase();
        for (const [toolId, shortcut] of Object.entries(this.activeShortcuts)) {
          if (!shortcut || !isShortcutToolAvailable(toolId)) continue;
          if (shortcut.toLowerCase().replace(/^cmd\+/, "meta+") === pressedLower) {
            event.preventDefault();
            event.stopPropagation();
            this.triggerToolShortcut(toolId);
            break;
          }
        }
      },
      true
    );
  }
}

export const shortcutService = ShortcutService.getInstance();
