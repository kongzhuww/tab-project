import { reactive, readonly, type DeepReadonly } from "vue";
import { windowManagerController } from "../core/window-manager.store";
import { fullscreenCardState } from "../core/fullscreen-card-state";
import { getStandaloneCardId } from "../core/navigation-state";
import { mergeBuiltinDockTools, mergeBuiltinDockCards } from "../modules/builtins";
import { pluginMarketController } from "../modules/market-store";
import { getDockModule } from "../modules/registry";

export interface DockCardItem {
  id: string;
  title: string;
  icon: string;
}

export interface DockToolItem {
  id: string;
  title: string;
  icon?: string;
  emoji?: string;
}

export type DockPosition = "bottom" | "left" | "right" | "top";

export interface MacDockSnapshot {
  mounted: boolean;
  readonly activeTargetId: string;
  activeTools: string[];
  cards: DockCardItem[];
  tools: DockToolItem[];
  position: DockPosition;
}

export interface MacDockActions {
  onTargetClick?: (targetId: string) => void;
  onToolClick?: (toolId: string) => void;
  onHomeClick?: () => void;
}

export interface MacDockController {
  getSnapshot(): DeepReadonly<MacDockSnapshot>;
  update(partial: Partial<MacDockSnapshot>): void;
  setMounted(mounted: boolean): void;
  setActiveTools(tools: string[]): void;
  addActiveTool(toolId: string): void;
  removeActiveTool(toolId: string): void;
  triggerItem(type: "target" | "tool" | "home", id: string): void;
  reorderCards(newOrderIds: string[]): void;
  reorderTools(newOrderIds: string[]): void;
  setPosition(position: DockPosition): void;
  setActions(actions: Partial<MacDockActions>): void;
}

export const DOCK_CARDS: DockCardItem[] = mergeBuiltinDockCards([]);

export const DOCK_TOOLS: DockToolItem[] = mergeBuiltinDockTools([
]);

const DOCK_ORDER_KEY = "logicweaver_dock_custom_order";
const DOCK_POSITION_KEY = "logicweaver_dock_position";

export function isValidDockPosition(val: unknown): val is DockPosition {
  return val === "bottom" || val === "left" || val === "right" || val === "top";
}

export function loadDockPosition(): DockPosition {
  try {
    if (typeof localStorage !== "undefined") {
      const val = localStorage.getItem(DOCK_POSITION_KEY);
      if (isValidDockPosition(val)) return val;
    }
  } catch {}
  return "bottom";
}

export function saveDockPosition(position: DockPosition): void {
  try {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem(DOCK_POSITION_KEY, position);
    }
  } catch {}
}

function loadCustomOrder(): { cards?: string[]; tools?: string[] } {
  try {
    if (typeof localStorage !== "undefined") {
      const raw = localStorage.getItem(DOCK_ORDER_KEY);
      if (raw) return JSON.parse(raw) || {};
    }
  } catch {}
  return {};
}

function saveCustomOrder(order: { cards?: string[]; tools?: string[] }) {
  try {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem(DOCK_ORDER_KEY, JSON.stringify(order));
    }
  } catch {}
}

export function getVisibleDockTools(): DockToolItem[] {
  const visible = DOCK_TOOLS.filter(tool => pluginMarketController.isInstalled(tool.id));
  const saved = loadCustomOrder().tools;
  if (Array.isArray(saved) && saved.length > 0) {
    const map = new Map(visible.map(t => [t.id, t]));
    const reordered: DockToolItem[] = [];
    for (const id of saved) {
      const it = map.get(id);
      if (it) {
        reordered.push(it);
        map.delete(id);
      }
    }
    // 未排序列入末尾
    for (const remaining of map.values()) {
      reordered.push(remaining);
    }
    return reordered;
  }
  return visible;
}

export function getVisibleDockCards(): DockCardItem[] {
  const cards = DOCK_CARDS.filter(card => pluginMarketController.isInstalled(card.id));

  const saved = loadCustomOrder().cards;
  if (Array.isArray(saved) && saved.length > 0) {
    const map = new Map(cards.map(c => [c.id, c]));
    const reordered: DockCardItem[] = [];
    for (const id of saved) {
      const it = map.get(id);
      if (it) {
        reordered.push(it);
        map.delete(id);
      }
    }
    for (const remaining of map.values()) {
      reordered.push(remaining);
    }
    return reordered;
  }

  return cards;
}

const initialState = (): MacDockSnapshot => ({
  mounted: false,
  get activeTargetId() { return getStandaloneCardId() || fullscreenCardState.activeId || ""; },
  activeTools: [],
  cards: getVisibleDockCards(),
  tools: getVisibleDockTools(),
  position: loadDockPosition()
});

export const macDockState = reactive<MacDockSnapshot>(initialState());

if (typeof window !== "undefined") {
  window.addEventListener("logicweaver:dock-modules-changed", () => {
    macDockState.tools = getVisibleDockTools();
    macDockState.cards = getVisibleDockCards();
  });
  window.addEventListener("storage", (e) => {
    if (e.key === DOCK_POSITION_KEY && isValidDockPosition(e.newValue)) {
      macDockState.position = e.newValue;
    }
  });
}

// 响应式监听全局 Window Manager 的激活工具列表，单一真相源驱动 Dock 栏指示灯
windowManagerController.onStateChange((tools) => {
  macDockState.activeTools = [...tools];
});

let boundActions: MacDockActions = {};

function activateOrCreateTab(urlKeyword: string, targetFile: string): void {
  const chromeApi = (window as unknown as {
    chrome?: {
      tabs?: {
        query: (queryInfo: object, callback: (tabs: Array<{ id?: number; url?: string; pendingUrl?: string; windowId?: number; active?: boolean; title?: string }>) => void) => void;
        update: (tabId: number, updateProperties: object) => void;
        create: (createProperties: object) => void;
      };
      windows?: {
        update: (windowId: number, updateProperties: object) => void;
      };
      runtime?: {
        getURL?: (path: string) => string;
      };
    };
  }).chrome;

  const fullUrl = chromeApi?.runtime?.getURL ? chromeApi.runtime.getURL(targetFile) : targetFile;
  const isHome = urlKeyword.includes("newtab") || targetFile.includes("newtab");

  if (window.location.href.includes(urlKeyword) || (isHome && (window.location.pathname.endsWith("/newtab.html") || window.location.pathname === "/newtab.html"))) {
    return;
  }

  const matchTab = (t: { url?: string; pendingUrl?: string; title?: string }) => {
    const rawUrl = t.url || t.pendingUrl || "";
    const lowerUrl = rawUrl.toLowerCase();
    if (isHome) {
      return (
        lowerUrl.includes("newtab.html") ||
        lowerUrl.startsWith("chrome://newtab") ||
        lowerUrl.startsWith("edge://newtab") ||
        lowerUrl.startsWith("chrome-search://local-ntp") ||
        (lowerUrl.includes("chrome-extension://") && lowerUrl.includes("newtab")) ||
        Boolean(t.title && (t.title.includes("LogicWeaver 新标签页") || t.title === "新标签页" || t.title === "New Tab"))
      );
    }
    return lowerUrl.includes(urlKeyword.toLowerCase());
  };

  if (chromeApi?.tabs?.query) {
    chromeApi.tabs.query({ currentWindow: true }, (tabs) => {
      const existing = tabs.find(matchTab);

      if (existing && existing.id != null) {
        // 找到已有标签页，直接切换跳回去
        chromeApi.tabs!.update(existing.id, { active: true });
        if (existing.windowId != null && chromeApi.windows?.update) {
          try {
            chromeApi.windows.update(existing.windowId, { focused: true });
          } catch (_) {}
        }
      } else {
        // 确实不存在已有标签页时才新建
        chromeApi.tabs!.create({ url: fullUrl });
      }
    });
    return;
  }

  const a = document.createElement("a");
  a.href = fullUrl;
  a.target = "_blank";
  a.rel = "noreferrer";
  document.body.appendChild(a);
  a.click();
  a.remove();
}


export const macDockController: MacDockController = {
  getSnapshot() {
    return readonly(macDockState);
  },
  update(partial) {
    const { activeTargetId: _derivedTarget, ...mutable } = partial;
    Object.assign(macDockState, mutable);
  },
  setMounted(mounted) {
    macDockState.mounted = mounted;
  },
  setActiveTools(tools) {
    macDockState.activeTools = [...tools];
  },
  addActiveTool(toolId) {
    if (!macDockState.activeTools.includes(toolId)) {
      macDockState.activeTools.push(toolId);
    }
  },
  removeActiveTool(toolId) {
    const idx = macDockState.activeTools.indexOf(toolId);
    if (idx >= 0) {
      macDockState.activeTools.splice(idx, 1);
    }
  },
  triggerItem(type, id) {
    const currentHref = typeof window !== "undefined" ? (window.location.pathname + window.location.href) : "";
    const isStandalonePage = currentHref.includes("bilibili.html") ||
      currentHref.includes("github.html") ||
      currentHref.includes("aihot.html") ||
      currentHref.includes("youtube.html") ||
      currentHref.includes("pricing.html");

    if (type === "home") {
      if (isStandalonePage) {
        activateOrCreateTab("newtab.html", "newtab.html");
        return;
      }

      if (boundActions.onHomeClick) {
        boundActions.onHomeClick();
        return;
      }
      if (document.body) {
        document.body.dataset.page = "home";
      }
      const dailyBtn = document.getElementById("daily-toggle");
      if (dailyBtn && dailyBtn.classList.contains("active")) {
        dailyBtn.classList.remove("active");
      }

      (window as any).exitFullscreenCard?.();

      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
      }
      return;
    }

    if (type === "target") {
      const targetTabMap: Record<string, string> = {
        "daily-bilibili": "bilibili.html",
        "card-github": "github.html",
        "daily-aihot": "aihot.html",
        "daily-youtube": "youtube.html",
        "daily-pricing": "pricing.html"
      };

      // 如果在独立子页面点击了其它卡片，切换对应独立页面或切回主页
      if (isStandalonePage) {
        const targetFile = targetTabMap[id];
        if (targetFile) {
          activateOrCreateTab(targetFile, targetFile);
        } else {
          activateOrCreateTab("newtab.html", "newtab.html");
        }
        return;
      }

      if (boundActions.onTargetClick) {
        boundActions.onTargetClick(id);
        return;
      }

      const win = window as unknown as {
        enterFullscreenCard?: (id: string) => void;
        exitFullscreenCard?: () => void;
      };
      if (macDockState.activeTargetId === id) {
        if (typeof win.exitFullscreenCard === "function") win.exitFullscreenCard();
      } else {
        if (typeof win.enterFullscreenCard === "function") win.enterFullscreenCard(id);
      }
      return;
    }

    if (type === "tool") {
      const hasLocalHost = Boolean(document.getElementById("vue-bili-companions-root"));
      if (isStandalonePage && !hasLocalHost) {
        activateOrCreateTab("newtab.html", "newtab.html");
        return;
      }

      // 桌面级轻量浮层工具窗口，绝不退出当前全屏卡片，允许在 B站收藏夹、GitHub 等任意视图中就地打开伴随！
      const keepCurrentViewTools = ["todoist", "music", "siren", "wallpaper", "stickers", "sync", "chat"];
      if (!keepCurrentViewTools.includes(id) && typeof window !== "undefined") {
        const win = window as any;
        if (typeof win.exitFullscreenCard === "function") {
          win.exitFullscreenCard();
        }
      }

      if (boundActions.onToolClick) {
        boundActions.onToolClick(id);
        return;
      }

      windowManagerController.toggle(id);
      return;
    }
  },
  reorderCards(newOrderIds: string[]) {
    const map = new Map(macDockState.cards.map(c => [c.id, c]));
    const next: DockCardItem[] = [];
    for (const id of newOrderIds) {
      const it = map.get(id);
      if (it) {
        next.push(it);
        map.delete(id);
      }
    }
    for (const it of map.values()) next.push(it);
    macDockState.cards = next;
    const current = loadCustomOrder();
    saveCustomOrder({ ...current, cards: next.map(c => c.id) });
  },
  reorderTools(newOrderIds: string[]) {
    const map = new Map(macDockState.tools.map(t => [t.id, t]));
    const next: DockToolItem[] = [];
    for (const id of newOrderIds) {
      const it = map.get(id);
      if (it) {
        next.push(it);
        map.delete(id);
      }
    }
    for (const it of map.values()) next.push(it);
    macDockState.tools = next;
    const current = loadCustomOrder();
    saveCustomOrder({ ...current, tools: next.map(t => t.id) });
  },
  setPosition(position) {
    if (!isValidDockPosition(position)) return;
    if (macDockState.position !== position) {
      macDockState.position = position;
      saveDockPosition(position);
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("logicweaver:dock-position-changed", { detail: position }));
      }
    }
  },
  setActions(actions) {
    boundActions = { ...boundActions, ...actions };
  }
};
