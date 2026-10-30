import { navWheelController, navWheelState, type NavWheelSector } from "./store";
import { fullscreenCardsController } from "../core/fullscreen-cards.store";
import { launcherService } from "../services/launcher.service";
import { PLUGIN_CATALOG } from "../modules/market-store";
import { isEnabledDockEntry, shortcutCaptureState } from "../services/shortcut-catalog";

type WheelMode = "main" | "tools" | "shortcuts";
type WheelItem = { id: string; title: string; desc: string; icon: string; url?: string; tool?: string; mode?: WheelMode };
const MAIN: WheelItem[] = [
  { id: "daily-bilibili", title: "b站插件", desc: "B站收藏夹与追番视频", icon: "assets/bilibili.svg" },
  { id: "daily-pricing", title: "模型插件", desc: "AI 模型定价与排行榜", icon: "assets/nav-pricing.svg" },
  { id: "daily-aihot", title: "ai hot插件", desc: "全网 AI 与前沿科技资讯", icon: "assets/nav-aihot.svg" },
  { id: "folder", title: "常用网站", desc: "点击展开快捷网站子轮盘", icon: "assets/nav-folder.svg", mode: "shortcuts" },
  { id: "card-github", title: "github插件", desc: "GitHub 趋势与星标项目", icon: "assets/nav-github.svg" },
  { id: "launcher", title: "首页", desc: "返回主屏常用应用台", icon: "assets/nav-home.svg" }
];
function enabledMainItems(): WheelItem[] {
  return MAIN.filter(item => item.mode || item.id === "launcher" || isEnabledDockEntry(item.id));
}
function enabledToolItems(): WheelItem[] {
  return PLUGIN_CATALOG.filter(item => item.kind === "module" && isEnabledDockEntry(item.id))
    .map(item => ({ id: item.id, title: item.title, desc: item.isDev ? "已启用的实验性组件" : item.categoryLabel,
      icon: item.icon || item.emoji || "🧩", tool: item.id }));
}
function onModulesChanged(): void { if (navWheelState.isExpanded) publish(); }
let links: WheelItem[] = [];
let items: WheelItem[] = MAIN;
let lastMouse = { x: 400, y: 300 };
let showBall = false;
let initialized = false;
let storageListener: ((changes: Record<string, any>, area: string) => void) | null = null;

function storage(): any { return (globalThis as any).chrome?.storage; }
function setBall(x: number, y: number): void {
  const radius = navWheelState.isExpanded ? 160 : 24;
  navWheelController.setBallPosition(
    Math.max(radius + 8, Math.min(window.innerWidth - radius - 8, x)),
    Math.max(radius + 8, Math.min(window.innerHeight - radius - 8, y))
  );
}
function publish(): void {
  const mode = navWheelState.mode as WheelMode;
  items = mode === "tools" ? enabledToolItems() : mode === "shortcuts" ?
    [...(links.length ? links : [{ id: "shortcut-empty", title: "暂无快捷项", desc: "常用网站可放入快捷轮盘", icon: "📭" }]),
      { id: "back-to-main", title: "返回主轮盘", desc: "返回页面电梯导航", icon: "🔙", mode: "main" }] : enabledMainItems();
  const count = items.length;
  const orbit = count > 12 ? 118 : count > 9 ? 114 : 110;
  const size = count > 12 ? 46 : count > 9 ? 50 : 56;
  navWheelController.setSectors(items.map((item, index): NavWheelSector => {
    const angleDeg = -90 + 360 / count * index;
    const rad = angleDeg * Math.PI / 180;
    return { id: item.id, title: item.title, desc: item.desc, icon: item.icon,
      angleDeg, x: Math.round(160 + Math.cos(rad) * orbit), y: Math.round(160 + Math.sin(rad) * orbit),
      size, isShortcut: Boolean(item.url) };
  }));
  navWheelController.setWheelMode(mode);
  navWheelController.setActiveSector(null);
  navWheelController.setBeam(null, 0);
  navWheelController.setHub(mode === "shortcuts" ? { icon: "🔙", title: "快捷方式" } :
    mode === "tools" ? { icon: "🧰", title: "常用工具" } : null);
}

function setMode(mode: WheelMode): void {
  navWheelState.mode = mode;
  publish();
}
function close(): void {
  navWheelController.collapse();
  setBall(navWheelState.ballPosition.x, navWheelState.ballPosition.y);
  navWheelController.setVisibility(showBall);
}
function open(x = navWheelState.ballPosition.x, y = navWheelState.ballPosition.y, mode: WheelMode = "main"): void {
  navWheelController.expand(undefined, undefined, mode);
  setBall(x, y);
  publish();
  navWheelController.setVisibility(true);
}
function perform(item: WheelItem): void {
  if ((item.tool && !isEnabledDockEntry(item.tool)) || (!item.url && !item.mode && item.id !== "launcher" && !isEnabledDockEntry(item.id))) return;
  if (item.mode) { setMode(item.mode); return; }
  close();
  if (item.url) { window.open(item.url, "_blank"); return; }
  if (item.tool) { (window as any).triggerToolShortcut?.(item.tool); return; }
  if (item.id === "launcher") {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
    }
    fullscreenCardsController.exit();
    if (document.body) document.body.dataset.page = "home";
  } else fullscreenCardsController.enter(item.id);
}

function onPointerMove(event: PointerEvent): void { lastMouse = { x: event.clientX, y: event.clientY }; }
function onMouseDown(event: MouseEvent): void {
  if (event.button !== 1) return;
  event.preventDefault();
  event.stopPropagation();
  lastMouse = { x: event.clientX, y: event.clientY };
  if (navWheelState.isExpanded) close();
  else open(event.clientX, event.clientY);
}
function onAuxClick(event: MouseEvent): void { if (event.button === 1) event.preventDefault(); }
function onKeyDown(event: KeyboardEvent): void {
  if (!navWheelState.isExpanded || shortcutCaptureState.active) return;
  if (event.key === "Escape") {
    event.preventDefault(); event.stopPropagation();
    if (navWheelState.mode === "shortcuts") setMode("main");
    else close();
  }
}

function getChromeFaviconUrl(url: string): string {
  try {
    const cr = (globalThis as any).chrome;
    if (typeof cr?.runtime?.getURL === "function") {
      return cr.runtime.getURL("_favicon/?pageUrl=" + encodeURIComponent(url) + "&size=64");
    }
  } catch {}
  return "";
}

function resolveShortcutIcon(link: any): string {
  const custom = link.customIcon || link.icon;
  if (custom && typeof custom === "string" && !/google\.com\/s2\/favicons|icons\.duckduckgo/i.test(custom)) {
    return custom;
  }
  if (link.url) {
    const cached = launcherService.getCachedIcon(link.url);
    if (cached) return cached;

    const chromeFavicon = getChromeFaviconUrl(link.url);
    if (chromeFavicon) return chromeFavicon;
  }
  return link.icon || "🔗";
}

export const navWheelRuntime = {
  async start(): Promise<void> {
    if (initialized) return;
    initialized = true;
    lastMouse = { x: Math.round(window.innerWidth / 2), y: Math.round(window.innerHeight / 2) };
    navWheelController.setActionHandler((action, payload) => {
      if (action === "hub:click") {
        if (navWheelState.isExpanded) {
          if (navWheelState.mode === "shortcuts") setMode("main");
          else close();
        } else open();
      } else if (action === "sector:click" || action === "container:click") {
        const item = items.find((entry) => entry.id === payload?.id ||
          (action === "container:click" && entry.id === navWheelState.activeSectorId));
        if (item) perform(item);
      } else if (action === "sector:hover") {
        const sector = navWheelState.sectors.find((entry) => entry.id === payload?.id);
        if (sector) {
          navWheelController.setHub({ icon: sector.icon, title: sector.title, desc: sector.desc, active: true });
          navWheelController.setActiveSector(sector.id);
          navWheelController.setBeam(sector.angleDeg, items.length);
        }
      } else if (action === "sector:leave") {
        navWheelController.setActiveSector(null);
        navWheelController.setBeam(null, 0);
        navWheelController.setHub(navWheelState.mode === "shortcuts" ? { icon: "🔙", title: "快捷方式" } :
          navWheelState.mode === "tools" ? { icon: "🧰", title: "常用工具" } : null);
      }
    });
    window.addEventListener("logicweaver:dock-modules-changed", onModulesChanged);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown, true);
    window.addEventListener("auxclick", onAuxClick, true);
    window.addEventListener("keydown", onKeyDown, true);
    storageListener = (changes, area) => {
      if (area !== "local") return;
      if (changes.siteShelfLinks || changes.logicweaverNavWheelShortcutsV1) void this.loadShortcuts();
    };
    storage()?.onChanged?.addListener(storageListener);
    try {
      if (!initialized) return;
      // 常驻导航悬浮球已彻底停用，不在页面边缘挂载悬浮小球
      showBall = false;
      navWheelController.setVisibility(false);
    } catch { /* Optional preferences must not block the wheel. */ }
    await this.loadShortcuts();
    publish();
  },
  stop(): void {
    initialized = false;
    navWheelController.setActionHandler(null);
    window.removeEventListener("logicweaver:dock-modules-changed", onModulesChanged);
    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("mousedown", onMouseDown, true);
    window.removeEventListener("auxclick", onAuxClick, true);
    window.removeEventListener("keydown", onKeyDown, true);
    if (storageListener) storage()?.onChanged?.removeListener(storageListener);
    storageListener = null;
  },
  async loadShortcuts(): Promise<void> {
    try {
      const saved = await storage()?.local?.get(["siteShelfLinks", "logicweaverNavWheelShortcutsV1"]);
      if (!initialized) return;
      const source = saved?.siteShelfLinks?.length ? saved.siteShelfLinks : saved?.logicweaverNavWheelShortcutsV1;
      links = (Array.isArray(source) ? source : []).map((link: any, index: number): WheelItem => ({
        id: String(link.id || `wheel-${index}`),
        title: String(link.title || link.url || "快捷网站"),
        desc: String(link.url || ""),
        url: String(link.url || ""),
        icon: resolveShortcutIcon(link)
      }));
      if (navWheelState.mode === "shortcuts") publish();
    } catch (error) { console.warn("[NavWheel] 读取快捷方式失败", error); }
  },
  open(x?: number, y?: number): void { open(x ?? lastMouse.x, y ?? lastMouse.y); },
  close,
  toggle(atMouse = false): void {
    if (navWheelState.isExpanded) close();
    else if (atMouse) open(lastMouse.x, lastMouse.y);
    else open();
  },
  toggleTools(atMouse = true): void {
    if (navWheelState.isExpanded && navWheelState.mode === "tools") close();
    else open(atMouse ? lastMouse.x : navWheelState.ballPosition.x,
      atMouse ? lastMouse.y : navWheelState.ballPosition.y, "tools");
  },
  setMode(mode: WheelMode): void { setMode(mode); }
};
