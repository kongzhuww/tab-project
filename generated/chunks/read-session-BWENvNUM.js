import { r as S, e as q } from "./vendor-vue-BUkfvXUI.js";
const i = S({
  isOpen: !1,
  type: "confirm",
  title: "",
  message: "",
  value: "",
  placeholder: "",
  inputType: "text",
  confirmText: "确定",
  cancelText: "取消",
  danger: !1,
  resolve: void 0
}), ce = {
  prompt(e) {
    return new Promise((t) => {
      i.isOpen = !0, i.type = "prompt", i.title = e.title || "请输入", i.message = e.message || "", i.value = e.defaultValue || "", i.placeholder = e.placeholder || "", i.inputType = e.inputType || "text", i.confirmText = e.confirmText || "确定", i.cancelText = e.cancelText || "取消", i.danger = !1, i.resolve = t;
    });
  },
  confirm(e) {
    return new Promise((t) => {
      i.isOpen = !0, i.type = "confirm", i.title = e.title || "请确认", i.message = e.message || "", i.value = "", i.confirmText = e.confirmText || "确定", i.cancelText = e.cancelText || "取消", i.danger = e.danger ?? !0, i.resolve = t;
    });
  },
  alert(e) {
    return new Promise((t) => {
      i.isOpen = !0, i.type = "alert", i.title = e.title || "提示", i.message = e.message || "", i.value = "", i.confirmText = e.confirmText || "我知道了", i.cancelText = "", i.danger = !1, i.resolve = () => t();
    });
  },
  handleConfirm() {
    const e = i.resolve, t = i.type, r = i.value;
    i.isOpen = !1, i.resolve = void 0, e && e(t === "prompt" ? r : t === "confirm" ? !0 : void 0);
  },
  handleCancel() {
    const e = i.resolve, t = i.type;
    i.isOpen = !1, i.resolve = void 0, e && e(t === "prompt" ? null : t === "confirm" ? !1 : void 0);
  }
};
typeof window < "u" && (window.appDialog = ce);
const k = S({
  firecrawl: !1
});
function T(e) {
  return Object.prototype.hasOwnProperty.call(k, e);
}
const R = {
  get state() {
    return q(k);
  },
  open(e) {
    k[e] = !0, m.bringToFront(e), m.render();
  },
  close(e) {
    k[e] = !1, m.releaseFocus(e);
    const t = O.openOrder.indexOf(e);
    t >= 0 && O.openOrder.splice(t, 1);
    const r = O.activeTools.indexOf(e);
    r >= 0 && O.activeTools.splice(r, 1), m.render();
  },
  toggle(e) {
    k[e] ? this.close(e) : this.open(e);
  }
}, W = /* @__PURE__ */ new Map(), $ = /* @__PURE__ */ new Map();
function z(e) {
  const t = ($.get(e) || 0) + 1;
  return $.set(e, t), t;
}
function Ie(e) {
  return $.get(e) || 0;
}
function be(e) {
  if (e.schemaVersion !== 1 || !/^[a-z][a-z0-9-]*$/.test(e.id) || !e.rootId || !e.title)
    throw new Error("Invalid built-in Dock module definition");
  if (e.presentation === "card" && !e.icon) throw new Error("Workspace card requires its original Dock icon");
  if (W.has(e.id)) throw new Error("Duplicate built-in Dock module ID");
  W.set(e.id, Object.freeze({
    ...e,
    settingsKeys: Object.freeze([...e.settingsKeys]),
    capabilities: Object.freeze([...e.capabilities]),
    lifecycle: Object.freeze({ ...e.lifecycle })
  }));
}
function v(e) {
  return W.get(e);
}
function te() {
  return [...W.values()];
}
function Ee() {
  return te().map(({ schemaVersion: e, id: t, title: r, rootId: o, settingsKeys: s, capabilities: a, showInDock: c, presentation: d }) => ({
    schemaVersion: e,
    id: t,
    title: r,
    rootId: o,
    presentation: d || "window",
    showInDock: c !== !1,
    settingsKeys: [...s],
    capabilities: [...a]
  }));
}
const M = [
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
], B = [
  "todoist",
  "daily-bilibili",
  "card-github",
  "daily-youtube",
  "daily-aihot"
], F = "logicweaver_installed_dock_modules", re = "logicweaver_dev_mode";
function ne() {
  try {
    return localStorage.getItem(re) === "true";
  } catch {
    return !1;
  }
}
let w = !1;
function N() {
  try {
    w = !1;
    const e = localStorage.getItem(F);
    if (e !== null) {
      const t = JSON.parse(e);
      if (!Array.isArray(t) || !t.every((r) => typeof r == "string"))
        throw new Error("Invalid enabled module preference");
      return Array.from(new Set(t));
    }
  } catch {
    w = !0;
  }
  return [];
}
function ue(e) {
  try {
    const t = JSON.stringify(e);
    return localStorage.setItem(F, t), localStorage.getItem(F) === t;
  } catch {
    return !1;
  }
}
const l = S({
  isOpen: !1,
  isSaving: !1,
  searchQuery: "",
  selectedCategory: "all",
  kindFilter: "plugin",
  installedIds: N(),
  isDevMode: ne(),
  errorMessage: w ? "启用状态读取失败，暂不允许覆盖；重新打开可重读。" : ""
});
async function C(e) {
  if (l.isSaving)
    return l.errorMessage = "启用状态正在保存，未重复提交。", !1;
  if (w)
    return l.errorMessage = "启用状态读取失败，未覆盖原数据。请重新打开商店重读。", !1;
  if (typeof navigator > "u" || !navigator.locks?.request)
    return l.errorMessage = "当前环境不支持跨标签写入保护，未保存启用状态。", !1;
  l.isSaving = !0, l.errorMessage = "";
  const t = new AbortController(), r = Date.now() + 1e4, o = setTimeout(() => t.abort(), 1e4);
  try {
    return await navigator.locks.request(
      `logicweaver:market:${F}`,
      { mode: "exclusive", signal: t.signal },
      () => {
        if (t.signal.aborted || Date.now() >= r)
          return l.errorMessage = "等待其他页面保存超时，未提交本次修改；请稍后再试。", !1;
        const s = N();
        if (w)
          return l.errorMessage = "最新启用状态读取失败，未覆盖其他页面的数据。", !1;
        const a = e(s);
        if (a === null) return !1;
        const c = Array.from(new Set(a));
        return ue(c) ? (l.installedIds = c, l.errorMessage = "", window.dispatchEvent(new CustomEvent("logicweaver:dock-modules-changed")), !0) : (w = !0, l.errorMessage = "启用状态保存结果未确认，当前 Dock 保留；请重新打开商店核对，未自动重试。", !1);
      }
    );
  } catch {
    return l.errorMessage = t.signal.aborted ? "等待其他页面保存超时，未提交本次修改；请稍后再试。" : "跨标签写入保护不可用，未自动重试；请重新打开商店核对。", !1;
  } finally {
    clearTimeout(o), l.isSaving = !1;
  }
}
typeof window < "u" && window.addEventListener("storage", (e) => {
  if (e.storageArea === localStorage) {
    if (e.key === F || e.key === null) {
      const t = N();
      w ? l.errorMessage = "其他页面的启用状态无法读取，当前入口保留，未覆盖数据。" : (l.installedIds = t, l.errorMessage = "", window.dispatchEvent(new CustomEvent("logicweaver:dock-modules-changed")));
    }
    (e.key === re || e.key === null) && (l.isDevMode = ne());
  }
});
const oe = {
  get state() {
    return q(l);
  },
  isInstalled(e) {
    return B.includes(e) ? !0 : l.installedIds.includes(e);
  },
  isCorePlugin(e) {
    return B.includes(e);
  },
  open() {
    l.isOpen = !0, l.searchQuery = "";
    const e = N();
    w || (l.installedIds = e, window.dispatchEvent(new CustomEvent("logicweaver:dock-modules-changed"))), l.errorMessage = w ? "启用状态读取失败，暂不允许覆盖原数据。" : "";
  },
  close() {
    l.isOpen = !1;
  },
  setKindFilter(e) {
    l.kindFilter = e;
  },
  setCategory(e) {
    l.selectedCategory = e;
  },
  setSearchQuery(e) {
    l.searchQuery = e;
  },
  toggleDevMode() {
    return !1;
  },
  install(e) {
    return M.find((r) => r.id === e) ? B.includes(e) ? Promise.resolve(!0) : C((r) => [...r, e]) : (l.errorMessage = "该组件不可启用。", Promise.resolve(!1));
  },
  uninstall(e) {
    return this.isCorePlugin(e) ? (l.errorMessage = "核心入口默认可用，不支持在商店停用。", Promise.resolve(!1)) : M.some((t) => t.id === e) ? C((t) => t.filter((r) => r !== e)) : (l.errorMessage = "该入口不由当前商店管理，未删除旧偏好。", Promise.resolve(!1));
  },
  toggle(e) {
    return !M.find((r) => r.id === e) || B.includes(e) ? Promise.resolve(!1) : C((r) => r.includes(e) ? r.filter((o) => o !== e) : [...r, e]);
  },
  installAll() {
    const e = M.filter((t) => !t.isDev && !this.isCorePlugin(t.id)).map((t) => t.id);
    return C((t) => [...t, ...e]);
  },
  uninstallAll() {
    const e = new Set(M.filter((t) => !this.isCorePlugin(t.id)).map((t) => t.id));
    return C((t) => t.filter((r) => !e.has(r)));
  }
}, se = [
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
], Te = Object.fromEntries(
  se.map((e) => [e.id, e.defaultKey])
), de = S({ active: !1 });
function J(e) {
  const t = v(e);
  return !!t && t.showInDock !== !1 && oe.isInstalled(e);
}
function ke(e) {
  const t = se.find((r) => r.id === e);
  return t ? t.moduleId ? t.enabledBy ? !!v(t.moduleId) && oe.isInstalled(t.enabledBy) : J(t.moduleId) : !0 : J(e);
}
function Oe(e, t) {
  return Object.prototype.hasOwnProperty.call(e, t.id) && typeof e[t.id] == "string" ? e[t.id] : t.defaultKey;
}
function Se(e) {
  const t = [];
  e.ctrlKey && t.push("Ctrl"), e.altKey && t.push("Alt"), e.shiftKey && t.push("Shift"), e.metaKey && t.push("Meta");
  const r = e.key;
  if (["Control", "Alt", "Shift", "Meta"].includes(r)) return null;
  let o = r.toUpperCase();
  return e.code.startsWith("Key") ? o = e.code.slice(3) : e.code.startsWith("Digit") ? o = e.code.slice(5) : r === " " ? o = "Space" : [",", ".", "/"].includes(r) && (o = r), t.push(o), t.join("+");
}
const h = {};
function fe(e, t) {
  h[e] = t;
}
const G = [
  { id: "calcom", title: "预约", icon: "📆", openId: "calcom-top-open" }
], O = S({
  activeId: "",
  openOrder: [],
  highestZ: 85,
  activeTools: [],
  frozenList: []
}), n = O, u = /* @__PURE__ */ new Map(), D = /* @__PURE__ */ new Map(), y = /* @__PURE__ */ new Set(), X = 15e3, V = /* @__PURE__ */ new Set(), _ = [];
function pe() {
  const e = [...n.activeTools], t = n.activeId;
  for (const r of V)
    try {
      r(e, t);
    } catch (o) {
      console.warn("[WindowManager] subscriber error:", o);
    }
}
function g(e, t) {
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
function p(e) {
  if (typeof window > "u" || typeof document > "u") return !1;
  const t = v(e);
  if (t) return t.lifecycle.isVisible();
  if (T(e))
    return !!k[e];
  if (h[e]?.isOpen)
    return !!h[e].isOpen();
  const r = u.get(e), o = g(r, e);
  return o ? o.tagName === "DIALOG" ? o.open : !o.hidden && o.style.display !== "none" : !1;
}
const f = {
  freeze(e) {
    if (f.cancelFreeze(e), !e || y.has(e) || p(e)) return;
    const t = u.get(e), r = g(t, e);
    if (r) {
      y.add(e), n.frozenList = Array.from(y), r.classList.add("workspace-frozen"), r.setAttribute("data-frozen", "true");
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
    if (f.cancelFreeze(e), !e) return;
    const t = y.has(e);
    y.delete(e), n.frozenList = Array.from(y);
    const r = u.get(e), o = g(r, e);
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
  scheduleFreeze(e, t = X) {
    if (!e || y.has(e)) return;
    f.cancelFreeze(e);
    const r = setTimeout(() => {
      D.delete(e), f.freeze(e);
    }, t);
    D.set(e, r);
  },
  cancelFreeze(e) {
    D.has(e) && (clearTimeout(D.get(e)), D.delete(e));
  },
  isFrozen(e) {
    return y.has(e);
  },
  getFrozenList() {
    return Array.from(y);
  },
  IDLE_FREEZE_DELAY: X
}, m = {
  pushModalCloser(e) {
    return _.push(e), () => {
      const t = _.indexOf(e);
      t !== -1 && _.splice(t, 1);
    };
  },
  popModalCloser() {
    for (; _.length > 0; ) {
      const e = _.pop();
      if (e && e() !== !1)
        return !0;
    }
    return !1;
  },
  getSnapshot() {
    return q(n);
  },
  register(e) {
    e?.id && (u.set(e.id, {
      title: e.title || e.id,
      icon: e.icon || "▣",
      element: e.element || null,
      getElement: typeof e.getElement == "function" ? e.getElement : null,
      onActivate: e.onActivate,
      onMinimize: e.onMinimize,
      onClose: e.onClose,
      onFreeze: e.onFreeze,
      onThaw: e.onThaw
    }), v(e.id)?.lifecycle.isVisible() && this.bringToFront(e.id), this.render());
  },
  unregister(e, t) {
    const r = u.get(e);
    !r || t && r.getElement !== t || (f.cancelFreeze(e), y.delete(e), n.frozenList = Array.from(y), u.delete(e), this.render());
  },
  render() {
    if (typeof document > "u") return;
    const e = document.getElementById("workspace-tabs");
    e && (e.replaceChildren(), e.hidden = !0), document.documentElement.classList.remove("has-workspace-tabs");
    const t = /* @__PURE__ */ new Set();
    for (const r of G)
      p(r.id) && t.add(r.id);
    for (const r of te())
      r.presentation !== "card" && r.lifecycle.isVisible() && t.add(r.id);
    for (const r of n.openOrder)
      p(r) && t.add(r);
    for (const [r] of u.entries())
      p(r) && t.add(r);
    n.activeTools = Array.from(t), pe();
  },
  releaseFocus(e) {
    n.activeId === e && (g(u.get(e), e)?.classList.remove("workspace-focused"), n.activeId = "", f.scheduleFreeze(e), this.render());
  },
  bringToFront(e) {
    if (v(e)?.presentation === "card") {
      p(e) && f.thaw(e);
      return;
    }
    const t = u.get(e), r = g(t, e);
    if (r && (r.hidden = !1, r.removeAttribute("hidden"), r.style.display === "none" && (r.style.display = ""), r.style.zIndex = String(++n.highestZ)), n.activeId !== e) {
      if (n.activeId) {
        const o = n.activeId;
        g(u.get(o), o)?.classList.remove("workspace-focused"), f.scheduleFreeze(o);
      }
      n.activeId = e, r?.classList.add("workspace-focused"), this.render();
    }
    f.thaw(e);
  },
  activate(e) {
    if (v(e)?.presentation === "card") {
      this.open(e);
      return;
    }
    const t = u.get(e);
    if (n.openOrder.includes(e) || n.openOrder.push(e), n.activeId && n.activeId !== e) {
      const o = n.activeId;
      g(u.get(o), o)?.classList.remove("workspace-focused"), f.scheduleFreeze(o);
    }
    n.activeId = e, f.thaw(e), t?.onActivate?.();
    const r = g(t, e);
    r && (r.hidden = !1, r.removeAttribute("hidden"), r.style.display === "none" && (r.style.display = ""), r.style.zIndex = String(++n.highestZ), r.classList.add("workspace-focused")), this.render(), setTimeout(() => this.render(), 80);
  },
  open(e) {
    const t = v(e);
    if (t) {
      if (t.lifecycle.canOpen && !t.lifecycle.canOpen() || (z(e), t.lifecycle.open(), !t.lifecycle.isVisible() || t.presentation === "card")) return;
      n.openOrder.includes(e) || n.openOrder.push(e), this.bringToFront(e), this.render();
      return;
    }
    if (T(e)) {
      R.open(e), n.openOrder.includes(e) || n.openOrder.push(e), n.activeTools.includes(e) || n.activeTools.push(e), n.activeId = e, this.bringToFront(e), this.render();
      return;
    }
    this.handleToolClick(e);
  },
  handleToolClick(e) {
    const t = p(e), r = n.activeId === e && t;
    if (v(e)) {
      r ? this.close(e) : this.open(e);
      return;
    }
    if (r) {
      if (T(e)) {
        R.close(e), n.activeId = "";
        const s = n.activeTools.indexOf(e);
        s >= 0 && n.activeTools.splice(s, 1), this.render();
        return;
      }
      if (h[e]?.close) {
        h[e].close();
        const s = document.getElementById(`${e}-workspace`) || document.getElementById(e);
        s && (s.style.display = "none"), n.activeId = "";
        const a = n.activeTools.indexOf(e);
        a >= 0 && n.activeTools.splice(a, 1), this.render();
        return;
      }
      const o = u.get(e);
      if (typeof o?.onMinimize == "function")
        this.minimize(e);
      else if (typeof o?.onClose == "function")
        this.close(e);
      else {
        const s = g(o, e);
        s && (s.tagName === "DIALOG" ? s.close() : s.hidden = !0), f.freeze(e), n.activeId = "", this.render();
      }
      return;
    }
    if (t) {
      this.bringToFront(e);
      return;
    }
    if (h[e]?.open) {
      const o = document.getElementById(`${e}-workspace`) || document.getElementById(e);
      o && (o.hidden = !1, o.style.display = ""), h[e].open(), n.openOrder.includes(e) || n.openOrder.push(e), n.activeTools.includes(e) || n.activeTools.push(e), n.activeId = e, this.bringToFront(e), this.render();
      return;
    }
    if (T(e)) {
      this.open(e);
      return;
    }
    if (u.has(e) && typeof u.get(e)?.onActivate == "function") {
      this.activate(e);
      return;
    }
    if (typeof document < "u") {
      const s = G.find((c) => c.id === e)?.openId || `${e}-top-open`, a = document.getElementById(s);
      if (a) {
        a.click(), setTimeout(() => {
          n.openOrder.includes(e) || n.openOrder.push(e), n.activeId = e, this.render();
        }, 50);
        return;
      }
    }
    u.has(e) && this.activate(e);
  },
  toggle(e) {
    this.handleToolClick(e);
  },
  minimize(e) {
    const t = v(e);
    if (t?.presentation === "card") {
      z(e), t.lifecycle.hide();
      return;
    }
    if (t && (z(e), t.lifecycle.hide()), h[e]?.minimize) {
      h[e].minimize();
      const s = document.getElementById(`${e}-workspace`) || document.getElementById(e);
      s && (s.style.display = "none");
    }
    T(e) && R.close(e);
    const r = u.get(e);
    t || r?.onMinimize?.();
    const o = g(r, e);
    if (o && (o.classList.remove("workspace-focused"), o.tagName === "DIALOG" ? o.open && o.close() : o.hidden = !0), f.freeze(e), n.activeId === e) {
      const s = n.openOrder.filter((a) => a !== e && p(a));
      if (n.activeId = s.length ? s[s.length - 1] : "", n.activeId) {
        const a = g(u.get(n.activeId), n.activeId);
        a && (a.style.zIndex = String(++n.highestZ), a.classList.add("workspace-focused"), f.thaw(n.activeId));
      }
    }
    this.render();
  },
  async close(e) {
    const t = v(e);
    if (t?.presentation === "card") {
      z(e), t.lifecycle.hide();
      return;
    }
    if (t && (z(e), t.lifecycle.hide()), h[e]?.close) {
      h[e].close();
      const d = document.getElementById(`${e}-workspace`) || document.getElementById(e);
      d && (d.style.display = "none");
    }
    T(e) && R.close(e);
    const r = n.openOrder.indexOf(e), o = u.get(e);
    let s = !0;
    try {
      !t && o?.onClose && (s = await o.onClose());
    } catch (d) {
      console.warn(`[WindowManager] Could not close ${e}`, d), s = !1;
    }
    if (s === !1) return;
    f.cancelFreeze(e), f.thaw(e);
    const a = n.activeId === e, c = g(o, e);
    if (c?.classList.remove("workspace-focused"), c && (c.tagName === "DIALOG" ? c.open && c.close() : c.hidden = !0), r >= 0 && n.openOrder.splice(r, 1), a) {
      n.activeId = "";
      const d = n.openOrder.filter((A) => p(A));
      d.length ? this.bringToFront(d[d.length - 1]) : this.render();
    } else
      this.render();
  },
  update(e, t = {}) {
    const r = u.get(e);
    r && (typeof t.title == "string" && t.title.trim() && (r.title = t.title.trim()), typeof t.icon == "string" && (r.icon = t.icon), this.render());
  },
  isOpen(e) {
    return p(e) || n.openOrder.includes(e);
  },
  isActive(e) {
    return n.activeId === e && p(e);
  },
  getActiveId() {
    return n.activeId;
  },
  getOpenOrder() {
    return [...n.openOrder];
  },
  onStateChange(e) {
    return V.add(e), e([...n.activeTools], n.activeId), () => {
      V.delete(e);
    };
  },
  freezer: f
};
typeof document < "u" && typeof window < "u" && (document.addEventListener("pointerdown", (e) => {
  const t = e.target;
  if (!(!t || t.closest("#workspace-tabs") || t.closest(".mac-dock-shelf")))
    for (const [r, o] of u.entries()) {
      const s = g(o, r);
      if (s && s.contains(t)) {
        p(r) && m.bringToFront(r);
        return;
      }
    }
}, !0), window.addEventListener("keydown", (e) => {
  if (de.active || e.defaultPrevented || e.isComposing) return;
  const t = String(e.key || "").toLowerCase(), r = t === "escape", o = e.altKey && t === "w", s = (e.metaKey || e.ctrlKey) && t === "w";
  if (r) {
    if (m.popModalCloser()) {
      e.preventDefault(), e.stopPropagation();
      return;
    }
    const a = document.querySelectorAll(
      ".bili-profile-menu:not([hidden]), .bookmark-note-menu:not([hidden]), .todoist-label-popover:not([hidden])"
    );
    if (a.length > 0) {
      a[a.length - 1].hidden = !0, e.preventDefault(), e.stopPropagation();
      return;
    }
    if (n.activeId && p(n.activeId)) {
      e.preventDefault(), e.stopPropagation();
      const c = n.activeId;
      typeof u.get(c)?.onMinimize == "function" ? m.minimize(c) : m.close(c);
      return;
    }
    return;
  }
  if (!(!o && !s)) {
    if (n.activeId && p(n.activeId)) {
      e.preventDefault(), e.stopPropagation();
      const a = n.activeId;
      typeof u.get(a)?.onMinimize == "function" ? m.minimize(a) : m.close(a);
      return;
    }
    for (let a = n.openOrder.length - 1; a >= 0; a--) {
      const c = n.openOrder[a];
      if (p(c)) {
        e.preventDefault(), e.stopPropagation(), typeof u.get(c)?.onMinimize == "function" ? m.minimize(c) : m.close(c);
        return;
      }
    }
  }
}, !0));
const Ae = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  DEFAULT_WORKSPACE_TOOLS: G,
  LogicWeaverDomFreezer: f,
  isWindowVisible: p,
  registerWindowActions: fe,
  windowManagerController: m,
  windowManagerState: O
}, Symbol.toStringTag, { value: "Module" })), Le = "logicweaver-sticker-files-v1", ge = "stickerRootFolderName", me = "stickerFolderPath", ye = "stickerActiveFolderRelPath", he = "stickerExpandedFolderPaths", ve = "stickerRootHandleRevision", ze = [ge, me, ye, he, ve], ee = S({ visible: !1, pendingWrites: 0 }), Y = /* @__PURE__ */ new Set();
function Me(e) {
  return Y.add(e), () => {
    Y.delete(e);
  };
}
function Ce() {
  for (const e of Y) e();
}
async function De(e) {
  ee.pendingWrites++;
  try {
    return await e();
  } finally {
    ee.pendingWrites--;
  }
}
class _e {
  constructor() {
    this.sequence = 0;
  }
  get pending() {
    return !!this.active;
  }
  cancel() {
    this.active?.stop("cancelled");
  }
  begin(t = {}) {
    const { timeoutMs: r, signal: o, isCurrent: s, onStop: a } = t;
    if (r !== void 0 && (!Number.isInteger(r) || r < 1 || r > 3e5))
      throw new RangeError("Read timeout must be between 1 and 300000 milliseconds");
    const c = ++this.sequence, d = new AbortController();
    let A = !1, H;
    const x = () => !A && this.active === b, j = () => x() && !d.signal.aborted && (s?.() ?? !0), U = () => {
      b.stop("parent");
    }, Q = (E) => {
      if (A) return !1;
      const K = x();
      A = !0, K && (this.active = void 0), clearTimeout(H), o?.removeEventListener("abort", U), d.abort(new DOMException(E === "timeout" ? "Read session timed out" : "Read session ended", E === "timeout" ? "TimeoutError" : "AbortError"));
      const I = K && this.sequence === c && !this.active;
      if (E && I)
        try {
          a?.(E);
        } catch {
        }
      return I;
    }, ie = (E) => j() ? new Promise((K, I) => {
      const Z = () => {
        P(), I(d.signal.reason);
      }, P = () => d.signal.removeEventListener("abort", Z);
      d.signal.addEventListener("abort", Z, { once: !0 });
      try {
        Promise.resolve(E()).then((L) => {
          P();
          try {
            j() ? K(L) : I(d.signal.reason || new DOMException("Read session is no longer current", "AbortError"));
          } catch (le) {
            I(le);
          }
        }, (L) => {
          P(), I(L);
        });
      } catch (L) {
        P(), I(L);
      }
    }) : Promise.reject(d.signal.reason || new DOMException("Read session is no longer current", "AbortError")), b = { signal: d.signal, owns: x, current: j, wait: ie, finish: () => Q(), stop: Q }, ae = this.active;
    return this.active = b, ae?.stop("replaced"), x() && (o?.aborted ? b.stop("parent") : (o?.addEventListener("abort", U, { once: !0 }), r !== void 0 && (H = setTimeout(() => b.stop("timeout"), r)))), b;
  }
}
export {
  se as A,
  ze as B,
  be as C,
  te as D,
  J as E,
  Te as F,
  Ae as G,
  f as L,
  M as P,
  _e as R,
  Le as S,
  O as a,
  Ie as b,
  i as c,
  ce as d,
  Ce as e,
  R as f,
  v as g,
  k as h,
  T as i,
  p as j,
  De as k,
  Ee as l,
  de as m,
  Oe as n,
  ke as o,
  oe as p,
  Se as q,
  Me as r,
  ee as s,
  z as t,
  ve as u,
  me as v,
  m as w,
  ge as x,
  ye as y,
  he as z
};
