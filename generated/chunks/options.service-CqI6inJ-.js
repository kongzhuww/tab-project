import { a3 as u, a4 as A, a5 as j } from "./search.service-CJV_B19X.js";
import { d as G, e as M, b as U } from "./sync.service-Cv4Y5U-Z.js";
const k = (t, e) => Object.prototype.hasOwnProperty.call(t, e), N = () => {
  throw new Error("其他页面已修改同一条配置，未覆盖；本页草稿保留。可重读设置后重新编辑。");
};
function v(t) {
  if (t === void 0) return {};
  if (!t || typeof t != "object" || Array.isArray(t))
    throw new Error("快捷键配置格式异常，未覆盖已有数据");
  return t;
}
function _(t, e, r) {
  return k(t, r) === k(e, r) && (!k(t, r) || u(t[r], e[r]));
}
function Y(t, e, r) {
  const s = v(t), a = v(e), f = v(r), c = Object.assign(/* @__PURE__ */ Object.create(null), f);
  for (const o of /* @__PURE__ */ new Set([...Object.keys(s), ...Object.keys(a)]))
    if (!_(s, a, o)) {
      if (k(a, o) && typeof a[o] != "string")
        throw new Error("待保存的快捷键格式异常，未提交修改");
      !_(f, s, o) && !_(f, a, o) && N(), k(a, o) ? c[o] = a[o] : delete c[o];
    }
  return c;
}
function F(t) {
  if (!t || typeof t != "object" || Array.isArray(t)) return;
  const e = t.id;
  if (typeof e == "string" && e.length) return e;
  if (typeof e == "number" && Number.isFinite(e)) return String(e);
}
function K(t) {
  if (t === void 0) return [];
  if (!Array.isArray(t)) throw new Error("书签过滤配置格式异常，未覆盖已有数据");
  return t;
}
function B(t) {
  const e = /* @__PURE__ */ new Map();
  for (const r of t) {
    const s = F(r);
    if (s !== void 0) {
      if (e.has(s)) throw new Error("书签过滤中存在重复 ID，未静默去重或覆盖；请先核对已有配置");
      e.set(s, r);
    }
  }
  return e;
}
function L(t, e, r) {
  return t.has(r) === e.has(r) && (!t.has(r) || u(t.get(r), e.get(r)));
}
function H(t, e, r) {
  const s = K(t), a = K(e), f = K(r), c = (d) => d.filter((n) => F(n) === void 0);
  if (!u(c(s), c(a)))
    throw new Error("本页不支持修改旧格式过滤规则，未覆盖已有数据");
  const o = B(s), l = B(a), g = B(f), h = [...f];
  for (const d of /* @__PURE__ */ new Set([...o.keys(), ...l.keys()])) {
    if (L(o, l, d)) continue;
    !L(g, o, d) && !L(g, l, d) && N();
    const n = h.findIndex((b) => F(b) === d);
    l.has(d) ? n !== -1 ? h[n] = l.get(d) : h.push(l.get(d)) : n !== -1 && h.splice(n, 1);
  }
  return h;
}
const y = (t, e) => Object.prototype.hasOwnProperty.call(t, e);
function O(t) {
  if (t === void 0) return {};
  if (!t || typeof t != "object" || Array.isArray(t))
    throw new Error("歌词配置格式异常，未覆盖已有数据");
  return t;
}
function W(t, e, r, s, a, f = []) {
  const c = O(t), o = O(e), l = O(r), g = O(s), h = Object.assign(/* @__PURE__ */ Object.create(null), g), d = new Set(f);
  if ([...d].some((n) => !y(a, n)))
    throw new Error("歌词字段修改范围无效，未提交修改");
  for (const n of /* @__PURE__ */ new Set([...Object.keys(o), ...Object.keys(l)]))
    if (!y(a, n) && (y(o, n) !== y(l, n) || !u(o[n], l[n])))
      throw new Error("未知歌词字段不由本面板编辑，未提交修改");
  for (const n of Object.keys(a)) {
    if (!y(o, n) || !y(l, n))
      throw new Error("歌词草稿基线不完整，未提交修改");
    if (u(o[n], l[n]) && !d.has(n)) continue;
    if (typeof l[n] != typeof a[n])
      throw new Error("待保存的歌词字段格式异常，草稿保留");
    const b = y(c, n) ? c[n] : a[n], S = y(g, n) ? g[n] : a[n];
    if (!u(S, b) && !u(S, l[n]))
      throw new Error("其他页面已修改同一歌词字段，未覆盖；本页草稿保留。可重读设置后重新编辑。");
    u(S, l[n]) || (h[n] = l[n]);
  }
  return h;
}
function z(t) {
  if (!t.ok) return { ok: !1, error: t.error };
  const e = { ok: !1, error: "Git 更新状态格式未确认；未应用更新" };
  if (typeof t.hasUpdate != "boolean") return e;
  for (const r of ["localCommit", "commitDesc", "latestCommitTitle", "log", "warning"])
    if (t[r] !== void 0 && typeof t[r] != "string") return e;
  for (const r of ["behindCount", "aheadCount", "commitsBehind"]) {
    const s = t[r];
    if (s !== void 0 && (typeof s != "number" || !Number.isSafeInteger(s) || s < 0)) return e;
  }
  return { ...t, hasUpdate: t.hasUpdate };
}
const P = [
  "displaySize",
  "city",
  "showWeather",
  "showSites",
  "showBili",
  "showYouTube",
  "showTodo",
  "showLeftNavigation",
  "showNavBall",
  "showBookmarkPanel",
  "showBookmarkFoldersTop",
  "showStartupAnimation",
  "startupAnimationStyle",
  "searchEngine",
  "singleNewTab",
  "showHomeMusicVisualizer",
  "showLimbusLyricEffect",
  "dockPosition",
  "deepseekApiKey",
  "deepseekBaseUrl",
  "deepseekModel"
], C = "customShortcuts", E = "limbusLyricConfig", R = "customNewtabAvatar", T = "searchIgnoredBookmarkFolders", D = {
  preset: "cover",
  coverAdaptive: !0,
  textColor: "#fffeef",
  strokeColor: "#d8a523",
  strokeWidth: "2.2",
  outlineEnabled: !0,
  glowColor: "#d8a523",
  glowEnabled: !0,
  shadowColor: "#000000",
  fontFamily: "'Cinzel', 'Source Han Serif SC', 'Noto Serif SC', 'Songti SC', 'SimSun', serif",
  fontSize: "36",
  fontWeight: "900",
  perspectiveStrength: "1.0",
  charSpeedMode: "adaptive",
  fadeDuration: "2.8"
}, V = {
  default: {
    textColor: "#fffeef",
    strokeColor: "#d8a523",
    glowColor: "#d8a523",
    shadowColor: "#000000",
    strokeWidth: "2.2",
    outlineEnabled: !0,
    glowEnabled: !0
  },
  heartbreak: {
    textColor: "#b223cb",
    strokeColor: "#991eaf",
    glowColor: "#b223cb",
    shadowColor: "#000000",
    strokeWidth: "2.2",
    outlineEnabled: !0,
    glowEnabled: !0
  },
  command: {
    textColor: "#00ffff",
    strokeColor: "#00aaff",
    glowColor: "#00aaff",
    shadowColor: "#000000",
    strokeWidth: "2.2",
    outlineEnabled: !0,
    glowEnabled: !0
  }
}, q = [
  { id: "nav-wheel", label: "🎯 轮盘快捷导航 (Fortnite风格)", defaultKey: "Alt+E" },
  { id: "toolbox", label: "🧰 常用工具轮盘", defaultKey: "Alt+Q" },
  { id: "todoist", label: "✅ Todoist 任务看板", defaultKey: "Alt+D" },
  { id: "bookmarks", label: "🔖 浏览器书签侧栏", defaultKey: "Alt+K" },
  { id: "wallpaper", label: "🖼 壁纸库", defaultKey: "" },
  { id: "stickers", label: "😺 本地表情包", defaultKey: "" },
  { id: "pricing", label: "💠 模型价格与排行", defaultKey: "" },
  { id: "settings", label: "⚙️ 新标签页设置", defaultKey: "Alt+," },
  { id: "search", label: "🔍 聚焦主搜索框", defaultKey: "/" },
  { id: "todoist-new-task", label: "➕ Todoist 快速新建任务", defaultKey: "Alt+A" }
];
class p {
  constructor() {
  }
  static getInstance() {
    return p.instance || (p.instance = new p()), p.instance;
  }
  /** Global settings are explicitly scoped; community sources can contain Tokens. */
  async loadGlobalSettings() {
    if (typeof chrome > "u" || !chrome.storage?.local) throw new Error("设置存储不可用，未读取配置");
    return chrome.storage.local.get([
      ...P,
      C,
      R,
      T,
      E
    ]);
  }
  /** Save only edited keys, rejecting stale drafts under a lock shared by new settings views. */
  async saveSettings(e, r, s, a = []) {
    if (typeof chrome > "u" || !chrome.storage?.local) throw new Error("设置存储不可用，未保存");
    const f = /* @__PURE__ */ new Set([
      ...P,
      C,
      R,
      T,
      E
    ]), c = Object.keys(e);
    if (c.some((w) => !f.has(w) || !Object.prototype.hasOwnProperty.call(r, w)))
      throw new Error("保存范围或草稿基线无效，未提交设置");
    if (!c.length) return {};
    if (c.includes(E) && (!s || !Object.prototype.hasOwnProperty.call(s, E)))
      throw new Error("歌词草稿基线缺失，未提交设置");
    if (typeof navigator > "u" || !navigator.locks?.request)
      throw new Error("当前环境不支持跨标签保存保护，未提交设置");
    const o = A(e), l = A(r), g = A(s || {}), h = [...a], d = new AbortController(), n = Date.now() + 1e4, b = setTimeout(() => d.abort(), 1e4);
    let S = !1;
    try {
      return await navigator.locks.request("logicweaver:global-settings", { signal: d.signal }, async () => {
        const w = await chrome.storage.local.get(c);
        if (d.signal.aborted || Date.now() >= n)
          throw new Error("等待设置保存超时，未提交本次修改");
        const m = {};
        for (const i of c)
          if (i === C)
            m[i] = Y(l[i], o[i], w[i]);
          else if (i === T)
            m[i] = H(l[i], o[i], w[i]);
          else if (i === E)
            m[i] = W(
              l[i],
              g[i],
              o[i],
              w[i],
              { ...D },
              h
            );
          else {
            if (!u(w[i], l[i]) && !u(w[i], o[i]))
              throw new Error("其他页面已修改同一项设置，未覆盖；本页草稿保留。可重读设置后重新编辑。");
            m[i] = o[i];
          }
        const I = {};
        for (const i of c)
          u(w[i], m[i]) || (I[i] = m[i]);
        if (Object.keys(I).length) {
          clearTimeout(b), S = !0, await chrome.storage.local.set(I);
          const i = await chrome.storage.local.get(c);
          if (c.some((x) => !u(i[x], m[x])))
            throw new Error("设置保存结果未确认，请重读核对；未自动重试");
        }
        try {
          Object.prototype.hasOwnProperty.call(o, "showStartupAnimation") && (localStorage.setItem("showStartupAnimation", o.showStartupAnimation ? "1" : "0"), localStorage.setItem("logicweaverEndfieldLoader", o.showStartupAnimation ? "1" : "0")), Object.prototype.hasOwnProperty.call(o, "startupAnimationStyle") && localStorage.setItem("startupAnimationStyle", o.startupAnimationStyle || "endfield"), Object.prototype.hasOwnProperty.call(o, "searchEngine") && (localStorage.setItem("searchEngine", o.searchEngine || "bing"), window.dispatchEvent(new CustomEvent("logicweaver:search-engine-updated", { detail: o.searchEngine })));
        } catch {
          throw new j("设置已保存，但开屏缓存未确认；请重读核对，未自动重试");
        }
        try {
          window.parent?.postMessage?.({ type: "newtab-options-saved" }, "*");
        } catch {
        }
        return A(m);
      });
    } catch (w) {
      throw w instanceof j ? w : S ? new j() : d.signal.aborted ? new Error("等待设置保存超时，未提交本次修改") : w;
    } finally {
      clearTimeout(b);
    }
  }
  /**
   * 收集书签树中的全部文件夹路径
   */
  collectBookmarkFolders(e, r = "", s = []) {
    if (!e) return s;
    const a = !e.parentId || e.id === "0";
    let f = e.title || "";
    f || (e.id === "1" ? f = "书签栏" : e.id === "2" ? f = "其他书签" : (e.id === "mobile" || e.id === "3") && (f = "移动设备书签"));
    const c = a ? r : r ? `${r} / ${f}` : f;
    !e.url && !a && s.push({
      id: String(e.id),
      title: f || "未命名文件夹",
      path: c || f || "书签文件夹"
    });
    for (const o of e.children || [])
      o.url || this.collectBookmarkFolders(o, c, s);
    return s;
  }
  /**
   * 调用 Native Messaging 桥接服务
   */
  async callNativeHost(e) {
    if (e.command !== "git-check-update" && e.command !== "git-apply-update")
      return { ok: !1, error: "设置服务不允许此原生命令；未发送请求" };
    const r = await G();
    return e.command === "git-check-update" ? z(r) : r;
  }
  /** Shared, lossless backup selection; transport limits are checked by the uploader. */
  extractSyncPayload(e) {
    return M(e);
  }
}
const $ = p.getInstance(), X = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  AVAILABLE_SHORTCUT_TOOLS: q,
  CUSTOM_AVATAR_STORAGE_KEY: R,
  DEFAULT_LIMBUS_CONFIG: D,
  GLOBAL_SETTINGS_KEYS: P,
  LIMBUS_PRESETS: V,
  LIMBUS_STORAGE_KEY: E,
  OptionsService: p,
  SEARCH_IGNORED_BOOKMARK_FOLDERS_STORAGE_KEY: T,
  SHORTCUT_STORAGE_KEY: C,
  SYNC_WHITELIST_KEYS: U,
  optionsService: $
}, Symbol.toStringTag, { value: "Module" }));
export {
  q as A,
  D,
  P as G,
  V as L,
  C as S,
  E as a,
  T as b,
  X as c,
  F as i,
  $ as o
};
