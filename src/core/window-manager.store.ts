import { reactive, readonly, type DeepReadonly } from "vue";
import { toolModalsState, toolModalsController, isToolModalId, type ToolModalId } from "./tool-modals.store";
import { getDockModule, listDockModules, touchDockModuleTransition } from "../modules/registry";
import { shortcutCaptureState } from "../services/shortcut-catalog";

export interface RegisteredWindowActions {
  open?: () => void;
  close?: () => void;
  minimize?: () => void;
  isOpen?: () => boolean;
}

const windowCustomActions: Record<string, RegisteredWindowActions> = {};

export function registerWindowActions(id: string, actions: RegisteredWindowActions): void {
  windowCustomActions[id] = actions;
}

/**
 * 窗口条目配置模型
 */
export interface WindowRegistration {
  id: string;
  title?: string;
  icon?: string;
  element?: HTMLElement | null;
  getElement?: () => HTMLElement | null;
  onActivate?: () => void | Promise<void>;
  onMinimize?: () => void | Promise<void>;
  onClose?: () => boolean | Promise<boolean>;
  onFreeze?: () => void;
  onThaw?: () => void;
}

export interface WindowEntry {
  title: string;
  icon: string;
  element?: HTMLElement | null;
  getElement?: (() => HTMLElement | null) | null;
  onActivate?: (() => void | Promise<void>) | null;
  onMinimize?: (() => void | Promise<void>) | null;
  onClose?: (() => boolean | Promise<boolean>) | null;
  onFreeze?: (() => void) | null;
  onThaw?: (() => void) | null;
}

export interface WorkspaceToolDef {
  id: string;
  title: string;
  icon: string;
  openId: string;
}

export interface WindowManagerSnapshot {
  activeId: string;
  openOrder: string[];
  highestZ: number;
  activeTools: string[];
  frozenList: string[];
}

export const DEFAULT_WORKSPACE_TOOLS: WorkspaceToolDef[] = [
  { id: "calcom", title: "预约", icon: "📆", openId: "calcom-top-open" },
];

export const windowManagerState = reactive<WindowManagerSnapshot>({
  activeId: "",
  openOrder: [],
  highestZ: 85,
  activeTools: [],
  frozenList: []
});
const state = windowManagerState;

const registry = new Map<string, WindowEntry>();
const freezeTimers = new Map<string, ReturnType<typeof setTimeout>>();
const frozenSet = new Set<string>();
const IDLE_FREEZE_DELAY = 15000;

type StateChangeCallback = (activeTools: string[], activeId: string) => void;
const subscribers = new Set<StateChangeCallback>();
const modalStack: (() => boolean | void)[] = [];

function notifySubscribers(): void {
  const tools = [...state.activeTools];
  const activeId = state.activeId;
  for (const cb of subscribers) {
    try {
      cb(tools, activeId);
    } catch (err) {
      console.warn("[WindowManager] subscriber error:", err);
    }
  }
}

function getEntryElement(entry?: WindowEntry, id?: string): HTMLElement | null {
  if (typeof document === "undefined") return null;
  if (!entry && id) {
    if (id === "wallpaper") return document.getElementById("wallpaper-workspace");
    return document.getElementById(`${id}-workspace`) || document.getElementById(`card-${id}`) || document.getElementById(id);
  }
  if (!entry) return null;
  if (typeof entry.getElement === "function") {
    const el = entry.getElement();
    if (el) entry.element = el;
    return el;
  }
  if (!entry.element && id) {
    if (id === "wallpaper") entry.element = document.getElementById("wallpaper-workspace");
    else entry.element = document.getElementById(`${id}-workspace`) || document.getElementById(`card-${id}`) || document.getElementById(id);
  }
  return entry.element || null;
}

export function isWindowVisible(id: string): boolean {
  if (typeof window === "undefined" || typeof document === "undefined") return false;
  const module = getDockModule(id);
  if (module) return module.lifecycle.isVisible();
  if (isToolModalId(id)) {
    return Boolean(toolModalsState[id as ToolModalId]);
  }
  if (windowCustomActions[id]?.isOpen) {
    return Boolean(windowCustomActions[id].isOpen!());
  }
  const entry = registry.get(id);
  const el = getEntryElement(entry, id);
  if (!el) {
    return false;
  }
  if (el.tagName === "DIALOG") return (el as HTMLDialogElement).open;
  return !el.hidden && el.style.display !== "none";
}

// 现代窗口休眠冻结器与响应式唤醒引擎
export const LogicWeaverDomFreezer = {
  freeze(id: string): void {
    LogicWeaverDomFreezer.cancelFreeze(id);
    if (!id || frozenSet.has(id)) return;
    if (isWindowVisible(id)) return;

    const entry = registry.get(id);
    const el = getEntryElement(entry, id);
    if (!el) return;

    frozenSet.add(id);
    state.frozenList = Array.from(frozenSet);
    el.classList.add("workspace-frozen");
    el.setAttribute("data-frozen", "true");
    try {
      (el as unknown as { inert: boolean }).inert = true;
    } catch (_) {}

    if (typeof entry?.onFreeze === "function") {
      try {
        entry.onFreeze();
      } catch (err) {
        console.warn(`[DomFreezer] onFreeze error on ${id}`, err);
      }
    }
    if (typeof window !== "undefined") {
      try {
        window.dispatchEvent(new CustomEvent("logicweaver:dom-freeze", { detail: { id } }));
      } catch (_) {}
    }
  },

  thaw(id: string): void {
    LogicWeaverDomFreezer.cancelFreeze(id);
    if (!id) return;
    const wasFrozen = frozenSet.has(id);
    frozenSet.delete(id);
    state.frozenList = Array.from(frozenSet);

    const entry = registry.get(id);
    const el = getEntryElement(entry, id);
    if (!el) return;

    el.classList.remove("workspace-frozen");
    el.removeAttribute("data-frozen");
    try {
      (el as unknown as { inert: boolean }).inert = false;
    } catch (_) {}

    if (wasFrozen && typeof entry?.onThaw === "function") {
      try {
        entry.onThaw();
      } catch (err) {
        console.warn(`[DomFreezer] onThaw error on ${id}`, err);
      }
    }
    if (wasFrozen && typeof window !== "undefined") {
      try {
        window.dispatchEvent(new CustomEvent("logicweaver:dom-thaw", { detail: { id } }));
      } catch (_) {}
    }
  },

  scheduleFreeze(id: string, delay = IDLE_FREEZE_DELAY): void {
    if (!id || frozenSet.has(id)) return;
    LogicWeaverDomFreezer.cancelFreeze(id);
    const timer = setTimeout(() => {
      freezeTimers.delete(id);
      LogicWeaverDomFreezer.freeze(id);
    }, delay);
    freezeTimers.set(id, timer);
  },

  cancelFreeze(id: string): void {
    if (freezeTimers.has(id)) {
      clearTimeout(freezeTimers.get(id));
      freezeTimers.delete(id);
    }
  },

  isFrozen(id: string): boolean {
    return frozenSet.has(id);
  },

  getFrozenList(): string[] {
    return Array.from(frozenSet);
  },

  IDLE_FREEZE_DELAY
};

export const windowManagerController = {
  pushModalCloser(closer: () => boolean | void): () => void {
    modalStack.push(closer);
    return () => {
      const idx = modalStack.indexOf(closer);
      if (idx !== -1) modalStack.splice(idx, 1);
    };
  },

  popModalCloser(): boolean {
    while (modalStack.length > 0) {
      const closer = modalStack.pop();
      if (closer) {
        const res = closer();
        if (res !== false) return true;
      }
    }
    return false;
  },

  getSnapshot(): DeepReadonly<WindowManagerSnapshot> {
    return readonly(state);
  },

  register(config: WindowRegistration): void {
    if (!config?.id) return;
    registry.set(config.id, {
      title: config.title || config.id,
      icon: config.icon || "▣",
      element: config.element || null,
      getElement: typeof config.getElement === "function" ? config.getElement : null,
      onActivate: config.onActivate,
      onMinimize: config.onMinimize,
      onClose: config.onClose,
      onFreeze: config.onFreeze,
      onThaw: config.onThaw
    });
    if (getDockModule(config.id)?.lifecycle.isVisible()) this.bringToFront(config.id);
    this.render();
  },

  unregister(id: string, owner?: () => HTMLElement | null): void {
    const entry = registry.get(id);
    if (!entry || (owner && entry.getElement !== owner)) return;
    LogicWeaverDomFreezer.cancelFreeze(id);
    frozenSet.delete(id);
    state.frozenList = Array.from(frozenSet);
    registry.delete(id);
    this.render();
  },

  render(): void {
    if (typeof document === "undefined") return;
    const host = document.getElementById("workspace-tabs");
    if (host) {
      host.replaceChildren();
      host.hidden = true;
    }
    document.documentElement.classList.remove("has-workspace-tabs");

    // 计算当前所有处于打开/可见状态的工具
    const activeToolSet = new Set<string>();
    for (const tool of DEFAULT_WORKSPACE_TOOLS) {
      if (isWindowVisible(tool.id)) {
        activeToolSet.add(tool.id);
      }
    }
    for (const module of listDockModules()) {
      if (module.presentation !== "card" && module.lifecycle.isVisible()) activeToolSet.add(module.id);
    }
    for (const id of state.openOrder) {
      if (isWindowVisible(id)) {
        activeToolSet.add(id);
      }
    }
    for (const [id] of registry.entries()) {
      if (isWindowVisible(id)) {
        activeToolSet.add(id);
      }
    }

    state.activeTools = Array.from(activeToolSet);
    notifySubscribers();
  },

  releaseFocus(id: string): void {
    if (state.activeId !== id) return;
    getEntryElement(registry.get(id), id)?.classList.remove("workspace-focused");
    state.activeId = "";
    LogicWeaverDomFreezer.scheduleFreeze(id);
    this.render();
  },

  bringToFront(id: string): void {
    // Fullscreen cards do not own floating-window focus or z-order.
    if (getDockModule(id)?.presentation === "card") {
      if (isWindowVisible(id)) LogicWeaverDomFreezer.thaw(id);
      return;
    }
    const entry = registry.get(id);
    const win = getEntryElement(entry, id);
    if (win) {
      win.hidden = false;
      win.removeAttribute("hidden");
      if (win.style.display === "none") win.style.display = "";
      win.style.zIndex = String(++state.highestZ);
    }
    if (state.activeId !== id) {
      if (state.activeId) {
        const prevId = state.activeId;
        const prevWin = getEntryElement(registry.get(prevId), prevId);
        prevWin?.classList.remove("workspace-focused");
        LogicWeaverDomFreezer.scheduleFreeze(prevId);
      }
      state.activeId = id;
      win?.classList.add("workspace-focused");
      this.render();
    }
    LogicWeaverDomFreezer.thaw(id);
  },

  activate(id: string): void {
    if (getDockModule(id)?.presentation === "card") {
      this.open(id);
      return;
    }
    const entry = registry.get(id);
    if (!state.openOrder.includes(id)) state.openOrder.push(id);
    if (state.activeId && state.activeId !== id) {
      const prevId = state.activeId;
      const prevWin = getEntryElement(registry.get(prevId), prevId);
      prevWin?.classList.remove("workspace-focused");
      LogicWeaverDomFreezer.scheduleFreeze(prevId);
    }
    state.activeId = id;
    LogicWeaverDomFreezer.thaw(id);
    entry?.onActivate?.();
    const win = getEntryElement(entry, id);
    if (win) {
      win.hidden = false;
      win.removeAttribute("hidden");
      if (win.style.display === "none") win.style.display = "";
      win.style.zIndex = String(++state.highestZ);
      win.classList.add("workspace-focused");
    }
    this.render();
    setTimeout(() => this.render(), 80);
  },

  open(id: string): void {
    const module = getDockModule(id);
    if (module) {
      if (module.lifecycle.canOpen && !module.lifecycle.canOpen()) return;
      touchDockModuleTransition(id);
      module.lifecycle.open();
      if (!module.lifecycle.isVisible() || module.presentation === "card") return;
      if (!state.openOrder.includes(id)) state.openOrder.push(id);
      this.bringToFront(id);
      this.render();
      return;
    }
    if (isToolModalId(id)) {
      toolModalsController.open(id as ToolModalId);
      if (!state.openOrder.includes(id)) state.openOrder.push(id);
      if (!state.activeTools.includes(id)) state.activeTools.push(id);
      state.activeId = id;
      this.bringToFront(id);
      this.render();
      return;
    }
    this.handleToolClick(id);
  },

  handleToolClick(id: string): void {
    const isCurrentlyVisible = isWindowVisible(id);
    const isCurrentlyFocused = state.activeId === id && isCurrentlyVisible;
    if (getDockModule(id)) {
      if (isCurrentlyFocused) void this.close(id);
      else this.open(id);
      return;
    }

    // 1. 若当前已打开且在最顶层，再次点击收起/最小化
    if (isCurrentlyFocused) {
      if (isToolModalId(id)) {
        toolModalsController.close(id as ToolModalId);
        state.activeId = "";
        const idx = state.activeTools.indexOf(id);
        if (idx >= 0) state.activeTools.splice(idx, 1);
        this.render();
        return;
      }
      if (windowCustomActions[id]?.close) {
        windowCustomActions[id].close!();
        const el = document.getElementById(`${id}-workspace`) || document.getElementById(id);
        if (el) el.style.display = "none";
        state.activeId = "";
        const idx = state.activeTools.indexOf(id);
        if (idx >= 0) state.activeTools.splice(idx, 1);
        this.render();
        return;
      }
      const entry = registry.get(id);
      if (typeof entry?.onMinimize === "function") {
        this.minimize(id);
      } else if (typeof entry?.onClose === "function") {
        void this.close(id);
      } else {
        const el = getEntryElement(entry, id);
        if (el) {
          if (el.tagName === "DIALOG") (el as HTMLDialogElement).close();
          else el.hidden = true;
        }
        LogicWeaverDomFreezer.freeze(id);
        state.activeId = "";
        this.render();
      }
      return;
    }

    // 2. 若在屏幕底层，置顶并获取焦点
    if (isCurrentlyVisible) {
      this.bringToFront(id);
      return;
    }

    // 3. Legacy workspace activation

    if (windowCustomActions[id]?.open) {
      const el = document.getElementById(`${id}-workspace`) || document.getElementById(id);
      if (el) {
        el.hidden = false;
        el.style.display = "";
      }
      windowCustomActions[id].open!();
      if (!state.openOrder.includes(id)) state.openOrder.push(id);
      if (!state.activeTools.includes(id)) state.activeTools.push(id);
      state.activeId = id;
      this.bringToFront(id);
      this.render();
      return;
    }

    // 4. 尚未打开，执行注册项激活
    if (isToolModalId(id)) {
      this.open(id);
      return;
    }
    if (registry.has(id) && typeof registry.get(id)?.onActivate === "function") {
      this.activate(id);
      return;
    }

    // 触发顶栏或原生 trigger 按钮按需懒加载
    if (typeof document !== "undefined") {
      const tool = DEFAULT_WORKSPACE_TOOLS.find((t) => t.id === id);
      const openId = tool?.openId || `${id}-top-open`;
      const trigger = document.getElementById(openId);
      if (trigger) {
        trigger.click();
        setTimeout(() => {
          if (!state.openOrder.includes(id)) state.openOrder.push(id);
          state.activeId = id;
          this.render();
        }, 50);
        return;
      }
    }

    if (registry.has(id)) {
      this.activate(id);
    }
  },

  toggle(id: string): void {
    this.handleToolClick(id);
  },

  minimize(id: string): void {
    const module = getDockModule(id);
    if (module?.presentation === "card") { touchDockModuleTransition(id); module.lifecycle.hide(); return; }
    if (module) { touchDockModuleTransition(id); module.lifecycle.hide(); }
    if (windowCustomActions[id]?.minimize) {
      windowCustomActions[id].minimize!();
      const el = document.getElementById(`${id}-workspace`) || document.getElementById(id);
      if (el) el.style.display = "none";
    }
    if (isToolModalId(id)) {
      toolModalsController.close(id as ToolModalId);
    }
    const entry = registry.get(id);
    if (!module) entry?.onMinimize?.();
    const win = getEntryElement(entry, id);
    if (win) {
      win.classList.remove("workspace-focused");
      if (win.tagName === "DIALOG") {
        if ((win as HTMLDialogElement).open) (win as HTMLDialogElement).close();
      } else {
        win.hidden = true;
      }
    }
    LogicWeaverDomFreezer.freeze(id);
    if (state.activeId === id) {
      const remaining = state.openOrder.filter((item) => item !== id && isWindowVisible(item));
      state.activeId = remaining.length ? remaining[remaining.length - 1] : "";
      if (state.activeId) {
        const nextWin = getEntryElement(registry.get(state.activeId), state.activeId);
        if (nextWin) {
          nextWin.style.zIndex = String(++state.highestZ);
          nextWin.classList.add("workspace-focused");
          LogicWeaverDomFreezer.thaw(state.activeId);
        }
      }
    }
    this.render();
  },

  async close(id: string): Promise<void> {
    const module = getDockModule(id);
    if (module?.presentation === "card") { touchDockModuleTransition(id); module.lifecycle.hide(); return; }
    if (module) { touchDockModuleTransition(id); module.lifecycle.hide(); }
    if (windowCustomActions[id]?.close) {
      windowCustomActions[id].close!();
      const el = document.getElementById(`${id}-workspace`) || document.getElementById(id);
      if (el) el.style.display = "none";
    }
    if (isToolModalId(id)) {
      toolModalsController.close(id as ToolModalId);
    }
    const index = state.openOrder.indexOf(id);
    const entry = registry.get(id);
    let allowed = true;
    try {
      if (!module && entry?.onClose) {
        allowed = await entry.onClose();
      }
    } catch (error) {
      console.warn(`[WindowManager] Could not close ${id}`, error);
      allowed = false;
    }
    if (allowed === false) return;

    LogicWeaverDomFreezer.cancelFreeze(id);
    LogicWeaverDomFreezer.thaw(id);
    const wasActive = state.activeId === id;
    const win = getEntryElement(entry, id);
    win?.classList.remove("workspace-focused");
    if (win) {
      if (win.tagName === "DIALOG") {
        if ((win as HTMLDialogElement).open) (win as HTMLDialogElement).close();
      } else {
        win.hidden = true;
      }
    }
    if (index >= 0) state.openOrder.splice(index, 1);
    if (wasActive) {
      state.activeId = "";
      const remaining = state.openOrder.filter((item) => isWindowVisible(item));
      if (remaining.length) {
        this.bringToFront(remaining[remaining.length - 1]);
      } else {
        this.render();
      }
    } else {
      this.render();
    }
  },

  update(id: string, changes: { title?: string; icon?: string } = {}): void {
    const entry = registry.get(id);
    if (!entry) return;
    if (typeof changes.title === "string" && changes.title.trim()) entry.title = changes.title.trim();
    if (typeof changes.icon === "string") entry.icon = changes.icon;
    this.render();
  },

  isOpen(id: string): boolean {
    return isWindowVisible(id) || state.openOrder.includes(id);
  },

  isActive(id: string): boolean {
    return state.activeId === id && isWindowVisible(id);
  },

  getActiveId(): string {
    return state.activeId;
  },

  getOpenOrder(): string[] {
    return [...state.openOrder];
  },

  onStateChange(callback: StateChangeCallback): () => void {
    subscribers.add(callback);
    callback([...state.activeTools], state.activeId);
    return () => {
      subscribers.delete(callback);
    };
  },

  freezer: LogicWeaverDomFreezer
};

// 全局事件监听：点击置顶与快捷键关闭
if (typeof document !== "undefined" && typeof window !== "undefined") {
  document.addEventListener("pointerdown", (event) => {
    const target = event.target as HTMLElement | null;
    if (!target || target.closest("#workspace-tabs") || target.closest(".mac-dock-shelf")) return;
    for (const [id, entry] of registry.entries()) {
      const win = getEntryElement(entry, id);
      if (win && win.contains(target)) {
        if (isWindowVisible(id)) {
          windowManagerController.bringToFront(id);
        }
        return;
      }
    }
  }, true);

  window.addEventListener("keydown", (event) => {
    if (shortcutCaptureState.active || event.defaultPrevented || event.isComposing) return;
    const key = String(event.key || "").toLowerCase();
    const isEsc = key === "escape";
    const isCmdW = (event.metaKey || event.ctrlKey) && key === "w";

    if (isEsc) {
      // 1. 优先关闭注册到栈顶的临时浮层或自定义弹窗
      if (windowManagerController.popModalCloser()) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }

      // 2. 检查是否有顶层右键菜单或气泡面板处于展开状态
      const contextMenus = document.querySelectorAll(
        ".bili-profile-menu:not([hidden]), .bookmark-note-menu:not([hidden]), .todoist-label-popover:not([hidden])"
      );
      if (contextMenus.length > 0) {
        (contextMenus[contextMenus.length - 1] as HTMLElement).hidden = true;
        event.preventDefault();
        event.stopPropagation();
        return;
      }

      // 3. 关闭或最小化当前激活的最上层主窗口
      if (state.activeId && isWindowVisible(state.activeId)) {
        event.preventDefault();
        event.stopPropagation();
        const targetId = state.activeId;
        const entry = registry.get(targetId);
        if (typeof entry?.onMinimize === "function") windowManagerController.minimize(targetId);
        else void windowManagerController.close(targetId);
        return;
      }
      return;
    }

    if (!isCmdW) return;

    if (state.activeId && isWindowVisible(state.activeId)) {
      event.preventDefault();
      event.stopPropagation();
      const targetId = state.activeId;
      const entry = registry.get(targetId);
      if (typeof entry?.onMinimize === "function") windowManagerController.minimize(targetId);
      else void windowManagerController.close(targetId);
      return;
    }

    for (let i = state.openOrder.length - 1; i >= 0; i--) {
      const id = state.openOrder[i];
      if (isWindowVisible(id)) {
        event.preventDefault();
        event.stopPropagation();
        const entry = registry.get(id);
        if (typeof entry?.onMinimize === "function") windowManagerController.minimize(id);
        else void windowManagerController.close(id);
        return;
      }
    }
  }, true);
}
