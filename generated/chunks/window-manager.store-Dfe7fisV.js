import { r as C, a as B } from "./vendor-vue-DokqDua_.js";
const b = C({
  firecrawl: !1
});
function w(e) {
  return Object.prototype.hasOwnProperty.call(b, e);
}
const T = {
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
    const r = k.activeTools.indexOf(e);
    r >= 0 && k.activeTools.splice(r, 1), p.render();
  },
  toggle(e) {
    b[e] ? this.close(e) : this.open(e);
  }
}, S = /* @__PURE__ */ new Map(), F = /* @__PURE__ */ new Map();
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
  if (S.has(e.id)) throw new Error("Duplicate built-in Dock module ID");
  S.set(e.id, Object.freeze({
    ...e,
    settingsKeys: Object.freeze([...e.settingsKeys]),
    capabilities: Object.freeze([...e.capabilities]),
    lifecycle: Object.freeze({ ...e.lifecycle })
  }));
}
function h(e) {
  return S.get(e);
}
function x() {
  return [...S.values()];
}
function Q() {
  return x().map(({ schemaVersion: e, id: t, title: r, rootId: o, settingsKeys: s, capabilities: i, showInDock: c, presentation: g }) => ({
    schemaVersion: e,
    id: t,
    title: r,
    rootId: o,
    presentation: g || "window",
    showInDock: c !== !1,
    settingsKeys: [...s],
    capabilities: [...i]
  }));
}
const X = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getDockModule: h,
  getDockModuleTransition: R,
  listDockModuleMetadata: Q,
  listDockModules: x,
  registerDockModule: U,
  touchDockModuleTransition: I
}, Symbol.toStringTag, { value: "Module" })), O = [
  // ==================== 1. 独立模块区 (Modules) ====================
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
    author: "Doist / LogicWeaver",
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
    author: "LogicWeaver Lab",
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
    author: "LogicWeaver Lab",
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
    author: "LogicWeaver Lab",
    tags: ["核心常驻", "AI资讯", "前沿技术"],
    builtIn: !0
  },
  {
    id: "daily-pricing",
    title: "模型插件",
    version: "v1.6.0",
    kind: "plugin",
    category: "productivity",
    categoryLabel: "全屏插件 · 算力实验",
    icon: "assets/nav-pricing.svg",
    emoji: "📐",
    desc: "全球主流 LLM 大语言模型价格性价比全景雷达、性能天梯排行榜与推理成本测算器；当前处于实验开发阶段。",
    author: "LogicWeaver Lab",
    tags: ["实验性", "LLM定价", "性能跑分"],
    builtIn: !0,
    isDev: !0,
    devNotice: "开发实验中，功能尚在完善中"
  },
  {
    id: "daily-youtube",
    title: "youtube插件",
    version: "v1.0.0",
    kind: "plugin",
    category: "media",
    categoryLabel: "全屏插件 · 视听",
    icon: "assets/nav-youtube.svg",
    emoji: "▶️",
    desc: "YouTube 官方流媒体插件。原生打通当前 Edge 登录账号，双栏 B 站收藏夹架构，18 个精准专属推荐换一批与点赞/收藏同步。",
    author: "LogicWeaver Lab",
    tags: ["核心常驻", "全屏插件", "算法推荐", "视频收藏"],
    builtIn: !0
  }
], M = [
  "todoist",
  "daily-bilibili",
  "card-github",
  "daily-youtube",
  "daily-aihot"
], A = "logicweaver_installed_dock_modules", j = "logicweaver_dev_mode";
function $() {
  try {
    return localStorage.getItem(j) === "true";
  } catch {
    return !1;
  }
}
let v = !1;
function D() {
  try {
    v = !1;
    const e = localStorage.getItem(A);
    if (e !== null) {
      const t = JSON.parse(e);
      if (!Array.isArray(t) || !t.every((r) => typeof r == "string"))
        throw new Error("Invalid enabled module preference");
      return Array.from(new Set(t));
    }
  } catch {
    v = !0;
  }
  return [];
}
function Z(e) {
  try {
    const t = JSON.stringify(e);
    return localStorage.setItem(A, t), localStorage.getItem(A) === t;
  } catch {
    return !1;
  }
}
const a = C({
  isOpen: !1,
  isSaving: !1,
  searchQuery: "",
  selectedCategory: "all",
  kindFilter: "plugin",
  installedIds: D(),
  isDevMode: $(),
  errorMessage: v ? "启用状态读取失败，暂不允许覆盖；重新打开可重读。" : ""
});
async function E(e) {
  if (a.isSaving)
    return a.errorMessage = "启用状态正在保存，未重复提交。", !1;
  if (v)
    return a.errorMessage = "启用状态读取失败，未覆盖原数据。请重新打开商店重读。", !1;
  if (typeof navigator > "u" || !navigator.locks?.request)
    return a.errorMessage = "当前环境不支持跨标签写入保护，未保存启用状态。", !1;
  a.isSaving = !0, a.errorMessage = "";
  const t = new AbortController(), r = Date.now() + 1e4, o = setTimeout(() => t.abort(), 1e4);
  try {
    return await navigator.locks.request(
      `logicweaver:market:${A}`,
      { mode: "exclusive", signal: t.signal },
      () => {
        if (t.signal.aborted || Date.now() >= r)
          return a.errorMessage = "等待其他页面保存超时，未提交本次修改；请稍后再试。", !1;
        const s = D();
        if (v)
          return a.errorMessage = "最新启用状态读取失败，未覆盖其他页面的数据。", !1;
        const i = e(s);
        if (i === null) return !1;
        const c = Array.from(new Set(i));
        return Z(c) ? (a.installedIds = c, a.errorMessage = "", window.dispatchEvent(new CustomEvent("logicweaver:dock-modules-changed")), !0) : (v = !0, a.errorMessage = "启用状态保存结果未确认，当前 Dock 保留；请重新打开商店核对，未自动重试。", !1);
      }
    );
  } catch {
    return a.errorMessage = t.signal.aborted ? "等待其他页面保存超时，未提交本次修改；请稍后再试。" : "跨标签写入保护不可用，未自动重试；请重新打开商店核对。", !1;
  } finally {
    clearTimeout(o), a.isSaving = !1;
  }
}
typeof window < "u" && window.addEventListener("storage", (e) => {
  if (e.storageArea === localStorage) {
    if (e.key === A || e.key === null) {
      const t = D();
      v ? a.errorMessage = "其他页面的启用状态无法读取，当前入口保留，未覆盖数据。" : (a.installedIds = t, a.errorMessage = "", window.dispatchEvent(new CustomEvent("logicweaver:dock-modules-changed")));
    }
    (e.key === j || e.key === null) && (a.isDevMode = $());
  }
});
const G = {
  get state() {
    return B(a);
  },
  isInstalled(e) {
    return M.includes(e) ? !0 : a.installedIds.includes(e);
  },
  isCorePlugin(e) {
    return M.includes(e);
  },
  open() {
    a.isOpen = !0, a.searchQuery = "";
    const e = D();
    v || (a.installedIds = e, window.dispatchEvent(new CustomEvent("logicweaver:dock-modules-changed"))), a.errorMessage = v ? "启用状态读取失败，暂不允许覆盖原数据。" : "";
  },
  close() {
    a.isOpen = !1;
  },
  setKindFilter(e) {
    a.kindFilter = e;
  },
  setCategory(e) {
    a.selectedCategory = e;
  },
  setSearchQuery(e) {
    a.searchQuery = e;
  },
  toggleDevMode() {
    return !1;
  },
  install(e) {
    return O.find((r) => r.id === e) ? M.includes(e) ? Promise.resolve(!0) : E((r) => [...r, e]) : (a.errorMessage = "该组件不可启用。", Promise.resolve(!1));
  },
  uninstall(e) {
    return this.isCorePlugin(e) ? (a.errorMessage = "核心入口默认可用，不支持在商店停用。", Promise.resolve(!1)) : O.some((t) => t.id === e) ? E((t) => t.filter((r) => r !== e)) : (a.errorMessage = "该入口不由当前商店管理，未删除旧偏好。", Promise.resolve(!1));
  },
  toggle(e) {
    return !O.find((r) => r.id === e) || M.includes(e) ? Promise.resolve(!1) : E((r) => r.includes(e) ? r.filter((o) => o !== e) : [...r, e]);
  },
  installAll() {
    const e = O.filter((t) => !t.isDev && !this.isCorePlugin(t.id)).map((t) => t.id);
    return E((t) => [...t, ...e]);
  },
  uninstallAll() {
    const e = new Set(O.filter((t) => !this.isCorePlugin(t.id)).map((t) => t.id));
    return E((t) => t.filter((r) => !e.has(r)));
  }
}, N = [
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
], ee = Object.fromEntries(
  N.map((e) => [e.id, e.defaultKey])
), q = C({ active: !1 });
function P(e) {
  const t = h(e);
  return !!t && t.showInDock !== !1 && G.isInstalled(e);
}
function te(e) {
  const t = N.find((r) => r.id === e);
  return t ? t.moduleId ? t.enabledBy ? !!h(t.moduleId) && G.isInstalled(t.enabledBy) : P(t.moduleId) : !0 : P(e);
}
function re(e, t) {
  return Object.prototype.hasOwnProperty.call(e, t.id) && typeof e[t.id] == "string" ? e[t.id] : t.defaultKey;
}
function ne(e) {
  const t = [];
  e.ctrlKey && t.push("Ctrl"), e.altKey && t.push("Alt"), e.shiftKey && t.push("Shift"), e.metaKey && t.push("Meta");
  const r = e.key;
  if (["Control", "Alt", "Shift", "Meta"].includes(r)) return null;
  let o = r.toUpperCase();
  return e.code.startsWith("Key") ? o = e.code.slice(3) : e.code.startsWith("Digit") ? o = e.code.slice(5) : r === " " ? o = "Space" : [",", ".", "/"].includes(r) && (o = r), t.push(o), t.join("+");
}
const y = {};
function H(e, t) {
  y[e] = t;
}
const _ = [
  { id: "calcom", title: "预约", icon: "📆", openId: "calcom-top-open" }
], k = C({
  activeId: "",
  openOrder: [],
  highestZ: 85,
  activeTools: [],
  frozenList: []
}), n = k, l = /* @__PURE__ */ new Map(), z = /* @__PURE__ */ new Map(), m = /* @__PURE__ */ new Set(), W = 15e3, K = /* @__PURE__ */ new Set(), L = [];
function Y() {
  const e = [...n.activeTools], t = n.activeId;
  for (const r of K)
    try {
      r(e, t);
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
    const r = e.getElement();
    return r && (e.element = r), r;
  }
  return !e.element && t && (t === "wallpaper" ? e.element = document.getElementById("wallpaper-workspace") : e.element = document.getElementById(`${t}-workspace`) || document.getElementById(`card-${t}`) || document.getElementById(t)), e.element || null;
}
function d(e) {
  if (typeof window > "u" || typeof document > "u") return !1;
  const t = h(e);
  if (t) return t.lifecycle.isVisible();
  if (w(e))
    return !!b[e];
  if (y[e]?.isOpen)
    return !!y[e].isOpen();
  const r = l.get(e), o = f(r, e);
  return o ? o.tagName === "DIALOG" ? o.open : !o.hidden && o.style.display !== "none" : !1;
}
const u = {
  freeze(e) {
    if (u.cancelFreeze(e), !e || m.has(e) || d(e)) return;
    const t = l.get(e), r = f(t, e);
    if (r) {
      m.add(e), n.frozenList = Array.from(m), r.classList.add("workspace-frozen"), r.setAttribute("data-frozen", "true");
      try {
        r.inert = !0;
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
    if (u.cancelFreeze(e), !e) return;
    const t = m.has(e);
    m.delete(e), n.frozenList = Array.from(m);
    const r = l.get(e), o = f(r, e);
    if (o) {
      o.classList.remove("workspace-frozen"), o.removeAttribute("data-frozen");
      try {
        o.inert = !1;
      } catch {
      }
      if (t && typeof r?.onThaw == "function")
        try {
          r.onThaw();
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
  scheduleFreeze(e, t = W) {
    if (!e || m.has(e)) return;
    u.cancelFreeze(e);
    const r = setTimeout(() => {
      z.delete(e), u.freeze(e);
    }, t);
    z.set(e, r);
  },
  cancelFreeze(e) {
    z.has(e) && (clearTimeout(z.get(e)), z.delete(e));
  },
  isFrozen(e) {
    return m.has(e);
  },
  getFrozenList() {
    return Array.from(m);
  },
  IDLE_FREEZE_DELAY: W
}, p = {
  pushModalCloser(e) {
    return L.push(e), () => {
      const t = L.indexOf(e);
      t !== -1 && L.splice(t, 1);
    };
  },
  popModalCloser() {
    for (; L.length > 0; ) {
      const e = L.pop();
      if (e && e() !== !1)
        return !0;
    }
    return !1;
  },
  getSnapshot() {
    return B(n);
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
    }), h(e.id)?.lifecycle.isVisible() && this.bringToFront(e.id), this.render());
  },
  unregister(e, t) {
    const r = l.get(e);
    !r || t && r.getElement !== t || (u.cancelFreeze(e), m.delete(e), n.frozenList = Array.from(m), l.delete(e), this.render());
  },
  render() {
    if (typeof document > "u") return;
    const e = document.getElementById("workspace-tabs");
    e && (e.replaceChildren(), e.hidden = !0), document.documentElement.classList.remove("has-workspace-tabs");
    const t = /* @__PURE__ */ new Set();
    for (const r of _)
      d(r.id) && t.add(r.id);
    for (const r of x())
      r.presentation !== "card" && r.lifecycle.isVisible() && t.add(r.id);
    for (const r of n.openOrder)
      d(r) && t.add(r);
    for (const [r] of l.entries())
      d(r) && t.add(r);
    n.activeTools = Array.from(t), Y();
  },
  releaseFocus(e) {
    n.activeId === e && (f(l.get(e), e)?.classList.remove("workspace-focused"), n.activeId = "", u.scheduleFreeze(e), this.render());
  },
  bringToFront(e) {
    if (h(e)?.presentation === "card") {
      d(e) && u.thaw(e);
      return;
    }
    const t = l.get(e), r = f(t, e);
    if (r && (r.hidden = !1, r.removeAttribute("hidden"), r.style.display === "none" && (r.style.display = ""), r.style.zIndex = String(++n.highestZ)), n.activeId !== e) {
      if (n.activeId) {
        const o = n.activeId;
        f(l.get(o), o)?.classList.remove("workspace-focused"), u.scheduleFreeze(o);
      }
      n.activeId = e, r?.classList.add("workspace-focused"), this.render();
    }
    u.thaw(e);
  },
  activate(e) {
    if (h(e)?.presentation === "card") {
      this.open(e);
      return;
    }
    const t = l.get(e);
    if (n.openOrder.includes(e) || n.openOrder.push(e), n.activeId && n.activeId !== e) {
      const o = n.activeId;
      f(l.get(o), o)?.classList.remove("workspace-focused"), u.scheduleFreeze(o);
    }
    n.activeId = e, u.thaw(e), t?.onActivate?.();
    const r = f(t, e);
    r && (r.hidden = !1, r.removeAttribute("hidden"), r.style.display === "none" && (r.style.display = ""), r.style.zIndex = String(++n.highestZ), r.classList.add("workspace-focused")), this.render(), setTimeout(() => this.render(), 80);
  },
  open(e) {
    const t = h(e);
    if (t) {
      if (t.lifecycle.canOpen && !t.lifecycle.canOpen() || (I(e), t.lifecycle.open(), !t.lifecycle.isVisible() || t.presentation === "card")) return;
      n.openOrder.includes(e) || n.openOrder.push(e), this.bringToFront(e), this.render();
      return;
    }
    if (w(e)) {
      T.open(e), n.openOrder.includes(e) || n.openOrder.push(e), n.activeTools.includes(e) || n.activeTools.push(e), n.activeId = e, this.bringToFront(e), this.render();
      return;
    }
    this.handleToolClick(e);
  },
  handleToolClick(e) {
    const t = d(e), r = n.activeId === e && t;
    if (h(e)) {
      r ? this.close(e) : this.open(e);
      return;
    }
    if (r) {
      if (w(e)) {
        T.close(e), n.activeId = "";
        const s = n.activeTools.indexOf(e);
        s >= 0 && n.activeTools.splice(s, 1), this.render();
        return;
      }
      if (y[e]?.close) {
        y[e].close();
        const s = document.getElementById(`${e}-workspace`) || document.getElementById(e);
        s && (s.style.display = "none"), n.activeId = "";
        const i = n.activeTools.indexOf(e);
        i >= 0 && n.activeTools.splice(i, 1), this.render();
        return;
      }
      const o = l.get(e);
      if (typeof o?.onMinimize == "function")
        this.minimize(e);
      else if (typeof o?.onClose == "function")
        this.close(e);
      else {
        const s = f(o, e);
        s && (s.tagName === "DIALOG" ? s.close() : s.hidden = !0), u.freeze(e), n.activeId = "", this.render();
      }
      return;
    }
    if (t) {
      this.bringToFront(e);
      return;
    }
    if (y[e]?.open) {
      const o = document.getElementById(`${e}-workspace`) || document.getElementById(e);
      o && (o.hidden = !1, o.style.display = ""), y[e].open(), n.openOrder.includes(e) || n.openOrder.push(e), n.activeTools.includes(e) || n.activeTools.push(e), n.activeId = e, this.bringToFront(e), this.render();
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
      const s = _.find((c) => c.id === e)?.openId || `${e}-top-open`, i = document.getElementById(s);
      if (i) {
        i.click(), setTimeout(() => {
          n.openOrder.includes(e) || n.openOrder.push(e), n.activeId = e, this.render();
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
    const t = h(e);
    if (t?.presentation === "card") {
      I(e), t.lifecycle.hide();
      return;
    }
    if (t && (I(e), t.lifecycle.hide()), y[e]?.minimize) {
      y[e].minimize();
      const s = document.getElementById(`${e}-workspace`) || document.getElementById(e);
      s && (s.style.display = "none");
    }
    w(e) && T.close(e);
    const r = l.get(e);
    t || r?.onMinimize?.();
    const o = f(r, e);
    if (o && (o.classList.remove("workspace-focused"), o.tagName === "DIALOG" ? o.open && o.close() : o.hidden = !0), u.freeze(e), n.activeId === e) {
      const s = n.openOrder.filter((i) => i !== e && d(i));
      if (n.activeId = s.length ? s[s.length - 1] : "", n.activeId) {
        const i = f(l.get(n.activeId), n.activeId);
        i && (i.style.zIndex = String(++n.highestZ), i.classList.add("workspace-focused"), u.thaw(n.activeId));
      }
    }
    this.render();
  },
  async close(e) {
    const t = h(e);
    if (t?.presentation === "card") {
      I(e), t.lifecycle.hide();
      return;
    }
    if (t && (I(e), t.lifecycle.hide()), y[e]?.close) {
      y[e].close();
      const g = document.getElementById(`${e}-workspace`) || document.getElementById(e);
      g && (g.style.display = "none");
    }
    w(e) && T.close(e);
    const r = n.openOrder.indexOf(e), o = l.get(e);
    let s = !0;
    try {
      !t && o?.onClose && (s = await o.onClose());
    } catch (g) {
      console.warn(`[WindowManager] Could not close ${e}`, g), s = !1;
    }
    if (s === !1) return;
    u.cancelFreeze(e), u.thaw(e);
    const i = n.activeId === e, c = f(o, e);
    if (c?.classList.remove("workspace-focused"), c && (c.tagName === "DIALOG" ? c.open && c.close() : c.hidden = !0), r >= 0 && n.openOrder.splice(r, 1), i) {
      n.activeId = "";
      const g = n.openOrder.filter((V) => d(V));
      g.length ? this.bringToFront(g[g.length - 1]) : this.render();
    } else
      this.render();
  },
  update(e, t = {}) {
    const r = l.get(e);
    r && (typeof t.title == "string" && t.title.trim() && (r.title = t.title.trim()), typeof t.icon == "string" && (r.icon = t.icon), this.render());
  },
  isOpen(e) {
    return d(e) || n.openOrder.includes(e);
  },
  isActive(e) {
    return n.activeId === e && d(e);
  },
  getActiveId() {
    return n.activeId;
  },
  getOpenOrder() {
    return [...n.openOrder];
  },
  onStateChange(e) {
    return K.add(e), e([...n.activeTools], n.activeId), () => {
      K.delete(e);
    };
  },
  freezer: u
};
typeof document < "u" && typeof window < "u" && (document.addEventListener("pointerdown", (e) => {
  const t = e.target;
  if (!(!t || t.closest("#workspace-tabs") || t.closest(".mac-dock-shelf")))
    for (const [r, o] of l.entries()) {
      const s = f(o, r);
      if (s && s.contains(t)) {
        d(r) && p.bringToFront(r);
        return;
      }
    }
}, !0), window.addEventListener("keydown", (e) => {
  if (q.active || e.defaultPrevented || e.isComposing) return;
  const t = String(e.key || "").toLowerCase(), r = t === "escape", o = e.altKey && t === "w", s = (e.metaKey || e.ctrlKey) && t === "w";
  if (r) {
    if (p.popModalCloser()) {
      e.preventDefault(), e.stopPropagation();
      return;
    }
    const i = document.querySelectorAll(
      ".bili-profile-menu:not([hidden]), .bookmark-note-menu:not([hidden]), .todoist-label-popover:not([hidden])"
    );
    if (i.length > 0) {
      i[i.length - 1].hidden = !0, e.preventDefault(), e.stopPropagation();
      return;
    }
    if (n.activeId && d(n.activeId)) {
      e.preventDefault(), e.stopPropagation();
      const c = n.activeId;
      typeof l.get(c)?.onMinimize == "function" ? p.minimize(c) : p.close(c);
      return;
    }
    return;
  }
  if (!(!o && !s)) {
    if (n.activeId && d(n.activeId)) {
      e.preventDefault(), e.stopPropagation();
      const i = n.activeId;
      typeof l.get(i)?.onMinimize == "function" ? p.minimize(i) : p.close(i);
      return;
    }
    for (let i = n.openOrder.length - 1; i >= 0; i--) {
      const c = n.openOrder[i];
      if (d(c)) {
        e.preventDefault(), e.stopPropagation(), typeof l.get(c)?.onMinimize == "function" ? p.minimize(c) : p.close(c);
        return;
      }
    }
  }
}, !0));
const oe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  DEFAULT_WORKSPACE_TOOLS: _,
  LogicWeaverDomFreezer: u,
  isWindowVisible: d,
  registerWindowActions: H,
  windowManagerController: p,
  windowManagerState: k
}, Symbol.toStringTag, { value: "Module" }));
export {
  N as A,
  ee as D,
  u as L,
  O as P,
  te as a,
  R as b,
  k as c,
  w as d,
  b as e,
  d as f,
  h as g,
  G as h,
  P as i,
  re as j,
  I as k,
  x as l,
  X as m,
  oe as n,
  ne as p,
  U as r,
  q as s,
  T as t,
  p as w
};
