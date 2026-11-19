import { r as L, a as B } from "./vendor-vue-BbmU9NUg.js";
const b = L({
  firecrawl: !1
});
function w(e) {
  return Object.prototype.hasOwnProperty.call(b, e);
}
const S = {
  get state() {
    return B(b);
  },
  open(e) {
    b[e] = !0, p.bringToFront(e), p.render();
  },
  close(e) {
    b[e] = !1, p.releaseFocus(e);
    const t = k.openOrder.indexOf(e);
    t >= 0 && k.openOrder.splice(t, 1);
    const n = k.activeTools.indexOf(e);
    n >= 0 && k.activeTools.splice(n, 1), p.render();
  },
  toggle(e) {
    b[e] ? this.close(e) : this.open(e);
  }
}, C = /* @__PURE__ */ new Map(), F = /* @__PURE__ */ new Map();
function I(e) {
  const t = (F.get(e) || 0) + 1;
  return F.set(e, t), t;
}
function R(e) {
  return F.get(e) || 0;
}
function U(e) {
  if (e.schemaVersion !== 1 || !/^[a-z][a-z0-9-]*$/.test(e.id) || !e.rootId || !e.title)
    throw new Error("Invalid built-in Dock module definition");
  if (e.presentation === "card" && !e.icon) throw new Error("Workspace card requires its original Dock icon");
  if (C.has(e.id)) throw new Error("Duplicate built-in Dock module ID");
  C.set(e.id, Object.freeze({
    ...e,
    settingsKeys: Object.freeze([...e.settingsKeys]),
    capabilities: Object.freeze([...e.capabilities]),
    lifecycle: Object.freeze({ ...e.lifecycle })
  }));
}
function y(e) {
  return C.get(e);
}
function j() {
  return [...C.values()];
}
function Q() {
  return j().map(({ schemaVersion: e, id: t, title: n, rootId: o, settingsKeys: s, capabilities: a, showInDock: u, presentation: h }) => ({
    schemaVersion: e,
    id: t,
    title: n,
    rootId: o,
    presentation: h || "window",
    showInDock: u !== !1,
    settingsKeys: [...s],
    capabilities: [...a]
  }));
}
const X = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getDockModule: y,
  getDockModuleTransition: R,
  listDockModuleMetadata: Q,
  listDockModules: j,
  registerDockModule: U,
  touchDockModuleTransition: I
}, Symbol.toStringTag, { value: "Module" })), O = [
  // ==================== 1. 独立模块区 (Modules) ====================
  {
    id: "multica",
    title: "AI 工作区",
    version: "v1.0.0",
    kind: "plugin",
    category: "productivity",
    categoryLabel: "全屏插件 · AI 助手",
    icon: "assets/nav-ai.svg",
    emoji: "✦",
    desc: "本机终端 Agent（Pi / Claude Code / Codex / ACP）与 DeepSeek 对话、定时自动化及资源库工作台。",
    author: "tab-project Lab",
    tags: ["本机 Agent", "DeepSeek", "自动化", "工作台"],
    builtIn: !0
  },
  {
    id: "todoist",
    title: "todoist",
    version: "v3.0.0",
    kind: "module",
    category: "productivity",
    categoryLabel: "独立模块 · 待办",
    icon: "assets/nav-todoist.svg",
    emoji: "✅",
    desc: "独立可拖动待办看板与项目协作工作台，支持日历联动、时间规划与云端标签管理。",
    author: "Doist / tab-project",
    tags: ["待办看板", "日程规划", "独立浮窗"],
    builtIn: !0
  },
  {
    id: "chat",
    title: "海狸聊天室",
    version: "v1.0.0",
    kind: "module",
    category: "communication",
    categoryLabel: "独立模块 · 实时交流",
    emoji: "💬",
    desc: "实验性自托管私有聊天室，默认关闭。需先手动启用，再配置自己的服务器和专属邀请；支持文字、受限图片与分享卡片。",
    author: "tab-project Lab",
    tags: ["实验性", "默认关闭", "自托管"],
    builtIn: !0,
    isDev: !0,
    devNotice: "实验性组件，仍需人工与双端验收；未启用时不自动连接，不读取房间或补发消息。"
  },
  {
    id: "music",
    title: "网易云模块",
    version: "v2.0.1",
    kind: "module",
    category: "media",
    categoryLabel: "独立模块 · 多媒体",
    icon: "assets/netease.svg",
    emoji: "🎵",
    desc: "网易云音乐在线搜索、扫码安全登录、同步个人歌单与每日推荐歌曲，独立小窗便捷操控。",
    author: "Netease Cloud",
    tags: ["网易云", "在线歌单", "扫码登录"],
    builtIn: !0
  },
  // ==================== 2. 全屏插件区 (Plugins) ====================
  {
    id: "daily-bilibili",
    title: "b站插件",
    version: "v2.8.0",
    kind: "plugin",
    category: "media",
    categoryLabel: "全屏插件 · 影院",
    icon: "assets/bilibili.svg",
    emoji: "📺",
    desc: "B站全屏双栏收藏夹知识库、小窗画中画影院、AI 字幕提取与原声电台一体化工作台。",
    author: "tab-project Lab",
    tags: ["核心常驻", "Bilibili", "视频整理"],
    builtIn: !0
  },
  {
    id: "card-github",
    title: "github插件",
    version: "v2.5.0",
    kind: "plugin",
    category: "productivity",
    categoryLabel: "全屏插件 · 开发",
    icon: "assets/nav-github.svg",
    emoji: "🐙",
    desc: "GitHub Star 知识库整理、本地多级分类文件夹、实时趋势发现与仓库 AI 智能分析。",
    author: "GitHub Community",
    tags: ["核心常驻", "代码仓库", "Star管理"],
    builtIn: !0
  },
  {
    id: "daily-aihot",
    title: "ai hot插件",
    version: "v1.8.0",
    kind: "plugin",
    category: "productivity",
    categoryLabel: "全屏插件 · 资讯",
    icon: "assets/nav-aihot.svg",
    emoji: "🔥",
    desc: "全网前沿 AI 科技头条、技术论文与开源爆点聚合情报站，内置沉浸式长文阅读器。",
    author: "tab-project Lab",
    tags: ["核心常驻", "AI资讯", "前沿技术"],
    builtIn: !0
  }
], E = [
  "todoist",
  "daily-bilibili",
  "card-github",
  "daily-aihot"
], T = "logicweaver_installed_dock_modules", $ = "logicweaver_dev_mode";
function W() {
  try {
    return localStorage.getItem($) === "true";
  } catch {
    return !1;
  }
}
let v = !1;
function D() {
  try {
    v = !1;
    const e = localStorage.getItem(T);
    if (e !== null) {
      const t = JSON.parse(e);
      if (!Array.isArray(t) || !t.every((n) => typeof n == "string"))
        throw new Error("Invalid enabled module preference");
      return Array.from(new Set(t)).filter((n) => n !== "daily-youtube");
    }
  } catch {
    v = !0;
  }
  return ["music"];
}
function Z(e) {
  try {
    const t = JSON.stringify(e);
    return localStorage.setItem(T, t), localStorage.getItem(T) === t;
  } catch {
    return !1;
  }
}
const i = L({
  isOpen: !1,
  isSaving: !1,
  searchQuery: "",
  selectedCategory: "all",
  kindFilter: "plugin",
  installedIds: D(),
  isDevMode: W(),
  errorMessage: v ? "启用状态读取失败，暂不允许覆盖；重新打开可重读。" : ""
});
async function M(e) {
  if (i.isSaving)
    return i.errorMessage = "启用状态正在保存，未重复提交。", !1;
  if (v)
    return i.errorMessage = "启用状态读取失败，未覆盖原数据。请重新打开商店重读。", !1;
  if (typeof navigator > "u" || !navigator.locks?.request)
    return i.errorMessage = "当前环境不支持跨标签写入保护，未保存启用状态。", !1;
  i.isSaving = !0, i.errorMessage = "";
  const t = new AbortController(), n = Date.now() + 1e4, o = setTimeout(() => t.abort(), 1e4);
  try {
    return await navigator.locks.request(
      `logicweaver:market:${T}`,
      { mode: "exclusive", signal: t.signal },
      () => {
        if (t.signal.aborted || Date.now() >= n)
          return i.errorMessage = "等待其他页面保存超时，未提交本次修改；请稍后再试。", !1;
        const s = D();
        if (v)
          return i.errorMessage = "最新启用状态读取失败，未覆盖其他页面的数据。", !1;
        const a = e(s);
        if (a === null) return !1;
        const u = Array.from(new Set(a));
        return Z(u) ? (i.installedIds = u, i.errorMessage = "", window.dispatchEvent(new CustomEvent("logicweaver:dock-modules-changed")), !0) : (v = !0, i.errorMessage = "启用状态保存结果未确认，当前 Dock 保留；请重新打开商店核对，未自动重试。", !1);
      }
    );
  } catch {
    return i.errorMessage = t.signal.aborted ? "等待其他页面保存超时，未提交本次修改；请稍后再试。" : "跨标签写入保护不可用，未自动重试；请重新打开商店核对。", !1;
  } finally {
    clearTimeout(o), i.isSaving = !1;
  }
}
typeof window < "u" && window.addEventListener("storage", (e) => {
  if (e.storageArea === localStorage) {
    if (e.key === T || e.key === null) {
      const t = D();
      v ? i.errorMessage = "其他页面的启用状态无法读取，当前入口保留，未覆盖数据。" : (i.installedIds = t, i.errorMessage = "", window.dispatchEvent(new CustomEvent("logicweaver:dock-modules-changed")));
    }
    (e.key === $ || e.key === null) && (i.isDevMode = W());
  }
});
const G = {
  get state() {
    return B(i);
  },
  isInstalled(e) {
    return E.includes(e) ? !i.installedIds.includes(`disabled:${e}`) : i.installedIds.includes(e);
  },
  isCorePlugin(e) {
    return E.includes(e);
  },
  open() {
    i.isOpen = !0, i.searchQuery = "";
    const e = D();
    v || (i.installedIds = e, window.dispatchEvent(new CustomEvent("logicweaver:dock-modules-changed"))), i.errorMessage = v ? "启用状态读取失败，暂不允许覆盖原数据。" : "";
  },
  close() {
    i.isOpen = !1;
  },
  setKindFilter(e) {
    i.kindFilter = e;
  },
  setCategory(e) {
    i.selectedCategory = e;
  },
  setSearchQuery(e) {
    i.searchQuery = e;
  },
  toggleDevMode() {
    return !1;
  },
  install(e) {
    return O.find((n) => n.id === e) ? M((n) => [...n.filter((o) => o !== `disabled:${e}`), e]) : (i.errorMessage = "该组件不可启用。", Promise.resolve(!1));
  },
  uninstall(e) {
    return O.some((t) => t.id === e) ? M((t) => E.includes(e) ? [...t.filter((n) => n !== e), `disabled:${e}`] : t.filter((n) => n !== e)) : (i.errorMessage = "该入口不由当前商店管理，未删除旧偏好。", Promise.resolve(!1));
  },
  toggle(e) {
    return O.find((n) => n.id === e) ? this.isInstalled(e) ? this.uninstall(e) : this.install(e) : Promise.resolve(!1);
  },
  installAll() {
    const e = O.filter((t) => !t.isDev && !this.isCorePlugin(t.id)).map((t) => t.id);
    return M((t) => [...t.filter((n) => !E.some((o) => n === `disabled:${o}`)), ...e]);
  },
  uninstallAll() {
    const e = new Set(O.map((t) => t.id));
    return M((t) => [...t.filter((n) => !e.has(n)), ...E.map((n) => `disabled:${n}`)]);
  }
}, N = [
  { id: "nav-wheel", label: "导航轮盘", defaultKey: "Alt+E", group: "navigation" },
  { id: "toolbox", label: "工具轮盘", defaultKey: "Alt+Q", group: "navigation" },
  { id: "bookmarks", label: "书签面板（新标签页内）", defaultKey: "Alt+K", group: "navigation" },
  { id: "settings", label: "设置", defaultKey: "Alt+,", group: "navigation" },
  { id: "search", label: "聚焦搜索栏", defaultKey: "/", group: "navigation" },
  { id: "todoist", label: "todoist 任务看板", defaultKey: "Alt+D", group: "components", moduleId: "todoist" },
  { id: "todoist-new-task", label: "todoist 新建任务", defaultKey: "Alt+A", group: "components", moduleId: "todoist" },
  { id: "music", label: "网易云模块", defaultKey: "", group: "components", moduleId: "music" },
  { id: "chat", label: "海狸聊天室（实验性）", defaultKey: "", group: "components", moduleId: "chat" },
  { id: "stickers", label: "表情库", defaultKey: "", group: "components", moduleId: "stickers", enabledBy: "chat" }
], ee = Object.fromEntries(
  N.map((e) => [e.id, e.defaultKey])
), q = L({ active: !1 });
function x(e) {
  const t = y(e);
  return !!t && t.showInDock !== !1 && G.isInstalled(e);
}
function te(e) {
  const t = N.find((n) => n.id === e);
  return t ? t.moduleId ? t.enabledBy ? !!y(t.moduleId) && G.isInstalled(t.enabledBy) : x(t.moduleId) : !0 : x(e);
}
function ne(e, t) {
  return Object.prototype.hasOwnProperty.call(e, t.id) && typeof e[t.id] == "string" ? e[t.id] : t.defaultKey;
}
function re(e) {
  const t = [];
  e.ctrlKey && t.push("Ctrl"), e.altKey && t.push("Alt"), e.shiftKey && t.push("Shift"), e.metaKey && t.push("Meta");
  const n = e.key;
  if (["Control", "Alt", "Shift", "Meta"].includes(n)) return null;
  let o = n.toUpperCase();
  return e.code.startsWith("Key") ? o = e.code.slice(3) : e.code.startsWith("Digit") ? o = e.code.slice(5) : n === " " ? o = "Space" : [",", ".", "/"].includes(n) && (o = n), t.push(o), t.join("+");
}
const m = {};
function H(e, t) {
  m[e] = t;
}
const _ = [
  { id: "calcom", title: "预约", icon: "📆", openId: "calcom-top-open" }
], k = L({
  activeId: "",
  openOrder: [],
  highestZ: 85,
  activeTools: [],
  frozenList: []
}), r = k, l = /* @__PURE__ */ new Map(), z = /* @__PURE__ */ new Map(), g = /* @__PURE__ */ new Set(), P = 15e3, K = /* @__PURE__ */ new Set(), A = [];
function Y() {
  const e = [...r.activeTools], t = r.activeId;
  for (const n of K)
    try {
      n(e, t);
    } catch (o) {
      console.warn("[WindowManager] subscriber error:", o);
    }
}
function f(e, t) {
  if (typeof document > "u") return null;
  if (!e && t)
    return t === "wallpaper" ? document.getElementById("wallpaper-workspace") : document.getElementById(`${t}-workspace`) || document.getElementById(`card-${t}`) || document.getElementById(t);
  if (!e) return null;
  if (typeof e.getElement == "function") {
    const n = e.getElement();
    return n && (e.element = n), n;
  }
  return !e.element && t && (t === "wallpaper" ? e.element = document.getElementById("wallpaper-workspace") : e.element = document.getElementById(`${t}-workspace`) || document.getElementById(`card-${t}`) || document.getElementById(t)), e.element || null;
}
function d(e) {
  if (typeof window > "u" || typeof document > "u") return !1;
  const t = y(e);
  if (t) return t.lifecycle.isVisible();
  if (w(e))
    return !!b[e];
  if (m[e]?.isOpen)
    return !!m[e].isOpen();
  const n = l.get(e), o = f(n, e);
  return o ? o.tagName === "DIALOG" ? o.open : !o.hidden && o.style.display !== "none" : !1;
}
const c = {
  freeze(e) {
    if (c.cancelFreeze(e), !e || g.has(e) || d(e)) return;
    const t = l.get(e), n = f(t, e);
    if (n) {
      g.add(e), r.frozenList = Array.from(g), n.classList.add("workspace-frozen"), n.setAttribute("data-frozen", "true");
      try {
        n.inert = !0;
      } catch {
      }
      if (typeof t?.onFreeze == "function")
        try {
          t.onFreeze();
        } catch (o) {
          console.warn(`[DomFreezer] onFreeze error on ${e}`, o);
        }
      if (typeof window < "u")
        try {
          window.dispatchEvent(new CustomEvent("logicweaver:dom-freeze", { detail: { id: e } }));
        } catch {
        }
    }
  },
  thaw(e) {
    if (c.cancelFreeze(e), !e) return;
    const t = g.has(e);
    g.delete(e), r.frozenList = Array.from(g);
    const n = l.get(e), o = f(n, e);
    if (o) {
      o.classList.remove("workspace-frozen"), o.removeAttribute("data-frozen");
      try {
        o.inert = !1;
      } catch {
      }
      if (t && typeof n?.onThaw == "function")
        try {
          n.onThaw();
        } catch (s) {
          console.warn(`[DomFreezer] onThaw error on ${e}`, s);
        }
      if (t && typeof window < "u")
        try {
          window.dispatchEvent(new CustomEvent("logicweaver:dom-thaw", { detail: { id: e } }));
        } catch {
        }
    }
  },
  scheduleFreeze(e, t = P) {
    if (!e || g.has(e)) return;
    c.cancelFreeze(e);
    const n = setTimeout(() => {
      z.delete(e), c.freeze(e);
    }, t);
    z.set(e, n);
  },
  cancelFreeze(e) {
    z.has(e) && (clearTimeout(z.get(e)), z.delete(e));
  },
  isFrozen(e) {
    return g.has(e);
  },
  getFrozenList() {
    return Array.from(g);
  },
  IDLE_FREEZE_DELAY: P
}, p = {
  pushModalCloser(e) {
    return A.push(e), () => {
      const t = A.indexOf(e);
      t !== -1 && A.splice(t, 1);
    };
  },
  popModalCloser() {
    for (; A.length > 0; ) {
      const e = A.pop();
      if (e && e() !== !1)
        return !0;
    }
    return !1;
  },
  getSnapshot() {
    return B(r);
  },
  register(e) {
    e?.id && (l.set(e.id, {
      title: e.title || e.id,
      icon: e.icon || "▣",
      element: e.element || null,
      getElement: typeof e.getElement == "function" ? e.getElement : null,
      onActivate: e.onActivate,
      onMinimize: e.onMinimize,
      onClose: e.onClose,
      onFreeze: e.onFreeze,
      onThaw: e.onThaw
    }), y(e.id)?.lifecycle.isVisible() && this.bringToFront(e.id), this.render());
  },
  unregister(e, t) {
    const n = l.get(e);
    !n || t && n.getElement !== t || (c.cancelFreeze(e), g.delete(e), r.frozenList = Array.from(g), l.delete(e), this.render());
  },
  render() {
    if (typeof document > "u") return;
    const e = document.getElementById("workspace-tabs");
    e && (e.replaceChildren(), e.hidden = !0), document.documentElement.classList.remove("has-workspace-tabs");
    const t = /* @__PURE__ */ new Set();
    for (const n of _)
      d(n.id) && t.add(n.id);
    for (const n of j())
      n.presentation !== "card" && n.lifecycle.isVisible() && t.add(n.id);
    for (const n of r.openOrder)
      d(n) && t.add(n);
    for (const [n] of l.entries())
      d(n) && t.add(n);
    r.activeTools = Array.from(t), Y();
  },
  releaseFocus(e) {
    r.activeId === e && (f(l.get(e), e)?.classList.remove("workspace-focused"), r.activeId = "", c.scheduleFreeze(e), this.render());
  },
  bringToFront(e) {
    if (y(e)?.presentation === "card") {
      d(e) && c.thaw(e);
      return;
    }
    const t = l.get(e), n = f(t, e);
    if (n && (n.hidden = !1, n.removeAttribute("hidden"), n.style.display === "none" && (n.style.display = ""), n.style.zIndex = String(++r.highestZ)), r.activeId !== e) {
      if (r.activeId) {
        const o = r.activeId;
        f(l.get(o), o)?.classList.remove("workspace-focused"), c.scheduleFreeze(o);
      }
      r.activeId = e, n?.classList.add("workspace-focused"), this.render();
    }
    c.thaw(e);
  },
  activate(e) {
    if (y(e)?.presentation === "card") {
      this.open(e);
      return;
    }
    const t = l.get(e);
    if (r.openOrder.includes(e) || r.openOrder.push(e), r.activeId && r.activeId !== e) {
      const o = r.activeId;
      f(l.get(o), o)?.classList.remove("workspace-focused"), c.scheduleFreeze(o);
    }
    r.activeId = e, c.thaw(e), t?.onActivate?.();
    const n = f(t, e);
    n && (n.hidden = !1, n.removeAttribute("hidden"), n.style.display === "none" && (n.style.display = ""), n.style.zIndex = String(++r.highestZ), n.classList.add("workspace-focused")), this.render(), setTimeout(() => this.render(), 80);
  },
  open(e) {
    const t = y(e);
    if (t) {
      if (t.lifecycle.canOpen && !t.lifecycle.canOpen() || (I(e), t.lifecycle.open(), !t.lifecycle.isVisible() || t.presentation === "card")) return;
      r.openOrder.includes(e) || r.openOrder.push(e), this.bringToFront(e), this.render();
      return;
    }
    if (w(e)) {
      S.open(e), r.openOrder.includes(e) || r.openOrder.push(e), r.activeTools.includes(e) || r.activeTools.push(e), r.activeId = e, this.bringToFront(e), this.render();
      return;
    }
    this.handleToolClick(e);
  },
  handleToolClick(e) {
    const t = d(e), n = r.activeId === e && t;
    if (y(e)) {
      n ? this.close(e) : this.open(e);
      return;
    }
    if (n) {
      if (w(e)) {
        S.close(e), r.activeId = "";
        const s = r.activeTools.indexOf(e);
        s >= 0 && r.activeTools.splice(s, 1), this.render();
        return;
      }
      if (m[e]?.close) {
        m[e].close();
        const s = document.getElementById(`${e}-workspace`) || document.getElementById(e);
        s && (s.style.display = "none"), r.activeId = "";
        const a = r.activeTools.indexOf(e);
        a >= 0 && r.activeTools.splice(a, 1), this.render();
        return;
      }
      const o = l.get(e);
      if (typeof o?.onMinimize == "function")
        this.minimize(e);
      else if (typeof o?.onClose == "function")
        this.close(e);
      else {
        const s = f(o, e);
        s && (s.tagName === "DIALOG" ? s.close() : s.hidden = !0), c.freeze(e), r.activeId = "", this.render();
      }
      return;
    }
    if (t) {
      this.bringToFront(e);
      return;
    }
    if (m[e]?.open) {
      const o = document.getElementById(`${e}-workspace`) || document.getElementById(e);
      o && (o.hidden = !1, o.style.display = ""), m[e].open(), r.openOrder.includes(e) || r.openOrder.push(e), r.activeTools.includes(e) || r.activeTools.push(e), r.activeId = e, this.bringToFront(e), this.render();
      return;
    }
    if (w(e)) {
      this.open(e);
      return;
    }
    if (l.has(e) && typeof l.get(e)?.onActivate == "function") {
      this.activate(e);
      return;
    }
    if (typeof document < "u") {
      const s = _.find((u) => u.id === e)?.openId || `${e}-top-open`, a = document.getElementById(s);
      if (a) {
        a.click(), setTimeout(() => {
          r.openOrder.includes(e) || r.openOrder.push(e), r.activeId = e, this.render();
        }, 50);
        return;
      }
    }
    l.has(e) && this.activate(e);
  },
  toggle(e) {
    this.handleToolClick(e);
  },
  minimize(e) {
    const t = y(e);
    if (t?.presentation === "card") {
      I(e), t.lifecycle.hide();
      return;
    }
    if (t && (I(e), t.lifecycle.hide()), m[e]?.minimize) {
      m[e].minimize();
      const s = document.getElementById(`${e}-workspace`) || document.getElementById(e);
      s && (s.style.display = "none");
    }
    w(e) && S.close(e);
    const n = l.get(e);
    t || n?.onMinimize?.();
    const o = f(n, e);
    if (o && (o.classList.remove("workspace-focused"), o.tagName === "DIALOG" ? o.open && o.close() : o.hidden = !0), c.freeze(e), r.activeId === e) {
      const s = r.openOrder.filter((a) => a !== e && d(a));
      if (r.activeId = s.length ? s[s.length - 1] : "", r.activeId) {
        const a = f(l.get(r.activeId), r.activeId);
        a && (a.style.zIndex = String(++r.highestZ), a.classList.add("workspace-focused"), c.thaw(r.activeId));
      }
    }
    this.render();
  },
  async close(e) {
    const t = y(e);
    if (t?.presentation === "card") {
      I(e), t.lifecycle.hide();
      return;
    }
    if (t && (I(e), t.lifecycle.hide()), m[e]?.close) {
      m[e].close();
      const h = document.getElementById(`${e}-workspace`) || document.getElementById(e);
      h && (h.style.display = "none");
    }
    w(e) && S.close(e);
    const n = r.openOrder.indexOf(e), o = l.get(e);
    let s = !0;
    try {
      !t && o?.onClose && (s = await o.onClose());
    } catch (h) {
      console.warn(`[WindowManager] Could not close ${e}`, h), s = !1;
    }
    if (s === !1) return;
    c.cancelFreeze(e), c.thaw(e);
    const a = r.activeId === e, u = f(o, e);
    if (u?.classList.remove("workspace-focused"), u && (u.tagName === "DIALOG" ? u.open && u.close() : u.hidden = !0), n >= 0 && r.openOrder.splice(n, 1), a) {
      r.activeId = "";
      const h = r.openOrder.filter((V) => d(V));
      h.length ? this.bringToFront(h[h.length - 1]) : this.render();
    } else
      this.render();
  },
  update(e, t = {}) {
    const n = l.get(e);
    n && (typeof t.title == "string" && t.title.trim() && (n.title = t.title.trim()), typeof t.icon == "string" && (n.icon = t.icon), this.render());
  },
  isOpen(e) {
    return d(e) || r.openOrder.includes(e);
  },
  isActive(e) {
    return r.activeId === e && d(e);
  },
  getActiveId() {
    return r.activeId;
  },
  getOpenOrder() {
    return [...r.openOrder];
  },
  onStateChange(e) {
    return K.add(e), e([...r.activeTools], r.activeId), () => {
      K.delete(e);
    };
  },
  freezer: c
};
typeof document < "u" && typeof window < "u" && (document.addEventListener("pointerdown", (e) => {
  const t = e.target;
  if (!(!t || t.closest("#workspace-tabs") || t.closest(".mac-dock-shelf")))
    for (const [n, o] of l.entries()) {
      const s = f(o, n);
      if (s && s.contains(t)) {
        d(n) && p.bringToFront(n);
        return;
      }
    }
}, !0), window.addEventListener("keydown", (e) => {
  if (q.active || e.defaultPrevented || e.isComposing) return;
  const t = String(e.key || "").toLowerCase(), n = t === "escape", o = (e.metaKey || e.ctrlKey) && t === "w";
  if (n) {
    if (p.popModalCloser()) {
      e.preventDefault(), e.stopPropagation();
      return;
    }
    const s = document.querySelectorAll(
      ".bili-profile-menu:not([hidden]), .bookmark-note-menu:not([hidden]), .todoist-label-popover:not([hidden])"
    );
    if (s.length > 0) {
      s[s.length - 1].hidden = !0, e.preventDefault(), e.stopPropagation();
      return;
    }
    if (r.activeId && d(r.activeId)) {
      e.preventDefault(), e.stopPropagation();
      const a = r.activeId;
      typeof l.get(a)?.onMinimize == "function" ? p.minimize(a) : p.close(a);
      return;
    }
    return;
  }
  if (o) {
    if (r.activeId && d(r.activeId)) {
      e.preventDefault(), e.stopPropagation();
      const s = r.activeId;
      typeof l.get(s)?.onMinimize == "function" ? p.minimize(s) : p.close(s);
      return;
    }
    for (let s = r.openOrder.length - 1; s >= 0; s--) {
      const a = r.openOrder[s];
      if (d(a)) {
        e.preventDefault(), e.stopPropagation(), typeof l.get(a)?.onMinimize == "function" ? p.minimize(a) : p.close(a);
        return;
      }
    }
  }
}, !0));
const oe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  DEFAULT_WORKSPACE_TOOLS: _,
  LogicWeaverDomFreezer: c,
  isWindowVisible: d,
  registerWindowActions: H,
  windowManagerController: p,
  windowManagerState: k
}, Symbol.toStringTag, { value: "Module" }));
export {
  N as A,
  ee as D,
  c as L,
  O as P,
  te as a,
  R as b,
  k as c,
  w as d,
  b as e,
  d as f,
  y as g,
  G as h,
  x as i,
  ne as j,
  I as k,
  j as l,
  X as m,
  oe as n,
  re as p,
  U as r,
  q as s,
  S as t,
  p as w
};
