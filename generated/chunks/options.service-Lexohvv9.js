import { Y as h, Z as O, _ as j } from "./search.service-CipPV7Bz.js";
import { d as M, e as U, b as Y } from "./sync.service-DTh6oAhK.js";
import { A as K } from "./read-session-BWENvNUM.js";
const k = (t, e) => Object.prototype.hasOwnProperty.call(t, e), G = () => {
  throw new Error("其他页面已修改同一条配置，未覆盖；本页草稿保留。可重读设置后重新编辑。");
};
function _(t) {
  if (t === void 0) return {};
  if (!t || typeof t != "object" || Array.isArray(t))
    throw new Error("快捷键配置格式异常，未覆盖已有数据");
  return t;
}
function v(t, e, r) {
  return k(t, r) === k(e, r) && (!k(t, r) || h(t[r], e[r]));
}
function H(t, e, r) {
  const s = _(t), a = _(e), f = _(r), c = Object.assign(/* @__PURE__ */ Object.create(null), f);
  for (const o of /* @__PURE__ */ new Set([...Object.keys(s), ...Object.keys(a)]))
    if (!v(s, a, o)) {
      if (k(a, o) && typeof a[o] != "string")
        throw new Error("待保存的快捷键格式异常，未提交修改");
      !v(f, s, o) && !v(f, a, o) && G(), k(a, o) ? c[o] = a[o] : delete c[o];
    }
  return c;
}
function P(t) {
  if (!t || typeof t != "object" || Array.isArray(t)) return;
  const e = t.id;
  if (typeof e == "string" && e.length) return e;
  if (typeof e == "number" && Number.isFinite(e)) return String(e);
}
function L(t) {
  if (t === void 0) return [];
  if (!Array.isArray(t)) throw new Error("书签过滤配置格式异常，未覆盖已有数据");
  return t;
}
function B(t) {
  const e = /* @__PURE__ */ new Map();
  for (const r of t) {
    const s = P(r);
    if (s !== void 0) {
      if (e.has(s)) throw new Error("书签过滤中存在重复 ID，未静默去重或覆盖；请先核对已有配置");
      e.set(s, r);
    }
  }
  return e;
}
function F(t, e, r) {
  return t.has(r) === e.has(r) && (!t.has(r) || h(t.get(r), e.get(r)));
}
function W(t, e, r) {
  const s = L(t), a = L(e), f = L(r), c = (d) => d.filter((n) => P(n) === void 0);
  if (!h(c(s), c(a)))
    throw new Error("本页不支持修改旧格式过滤规则，未覆盖已有数据");
  const o = B(s), l = B(a), g = B(f), u = [...f];
  for (const d of /* @__PURE__ */ new Set([...o.keys(), ...l.keys()])) {
    if (F(o, l, d)) continue;
    !F(g, o, d) && !F(g, l, d) && G();
    const n = u.findIndex((S) => P(S) === d);
    l.has(d) ? n !== -1 ? u[n] = l.get(d) : u.push(l.get(d)) : n !== -1 && u.splice(n, 1);
  }
  return u;
}
const p = (t, e) => Object.prototype.hasOwnProperty.call(t, e);
function A(t) {
  if (t === void 0) return {};
  if (!t || typeof t != "object" || Array.isArray(t))
    throw new Error("歌词配置格式异常，未覆盖已有数据");
  return t;
}
function z(t, e, r, s, a, f = []) {
  const c = A(t), o = A(e), l = A(r), g = A(s), u = Object.assign(/* @__PURE__ */ Object.create(null), g), d = new Set(f);
  if ([...d].some((n) => !p(a, n)))
    throw new Error("歌词字段修改范围无效，未提交修改");
  for (const n of /* @__PURE__ */ new Set([...Object.keys(o), ...Object.keys(l)]))
    if (!p(a, n) && (p(o, n) !== p(l, n) || !h(o[n], l[n])))
      throw new Error("未知歌词字段不由本面板编辑，未提交修改");
  for (const n of Object.keys(a)) {
    if (!p(o, n) || !p(l, n))
      throw new Error("歌词草稿基线不完整，未提交修改");
    if (h(o[n], l[n]) && !d.has(n)) continue;
    if (typeof l[n] != typeof a[n])
      throw new Error("待保存的歌词字段格式异常，草稿保留");
    const S = p(c, n) ? c[n] : a[n], b = p(g, n) ? g[n] : a[n];
    if (!h(b, S) && !h(b, l[n]))
      throw new Error("其他页面已修改同一歌词字段，未覆盖；本页草稿保留。可重读设置后重新编辑。");
    h(b, l[n]) || (u[n] = l[n]);
  }
  return u;
}
function V(t) {
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
const R = [
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
  "dockPosition"
], C = "customShortcuts", E = "limbusLyricConfig", N = "customNewtabAvatar", T = "searchIgnoredBookmarkFolders", D = {
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
}, q = {
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
};
class y {
  constructor() {
  }
  static getInstance() {
    return y.instance || (y.instance = new y()), y.instance;
  }
  /** Global settings are explicitly scoped; community sources can contain Tokens. */
  async loadGlobalSettings() {
    if (typeof chrome > "u" || !chrome.storage?.local) throw new Error("设置存储不可用，未读取配置");
    return chrome.storage.local.get([
      ...R,
      C,
      N,
      T,
      E
    ]);
  }
  /** Save only edited keys, rejecting stale drafts under a lock shared by new settings views. */
  async saveSettings(e, r, s, a = []) {
    if (typeof chrome > "u" || !chrome.storage?.local) throw new Error("设置存储不可用，未保存");
    const f = /* @__PURE__ */ new Set([
      ...R,
      C,
      N,
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
    const o = O(e), l = O(r), g = O(s || {}), u = [...a], d = new AbortController(), n = Date.now() + 1e4, S = setTimeout(() => d.abort(), 1e4);
    let b = !1;
    try {
      return await navigator.locks.request("logicweaver:global-settings", { signal: d.signal }, async () => {
        const w = await chrome.storage.local.get(c);
        if (d.signal.aborted || Date.now() >= n)
          throw new Error("等待设置保存超时，未提交本次修改");
        const m = {};
        for (const i of c)
          if (i === C)
            m[i] = H(l[i], o[i], w[i]);
          else if (i === T)
            m[i] = W(l[i], o[i], w[i]);
          else if (i === E)
            m[i] = z(
              l[i],
              g[i],
              o[i],
              w[i],
              { ...D },
              u
            );
          else {
            if (!h(w[i], l[i]) && !h(w[i], o[i]))
              throw new Error("其他页面已修改同一项设置，未覆盖；本页草稿保留。可重读设置后重新编辑。");
            m[i] = o[i];
          }
        const I = {};
        for (const i of c)
          h(w[i], m[i]) || (I[i] = m[i]);
        if (Object.keys(I).length) {
          clearTimeout(S), b = !0, await chrome.storage.local.set(I);
          const i = await chrome.storage.local.get(c);
          if (c.some((x) => !h(i[x], m[x])))
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
        return O(m);
      });
    } catch (w) {
      throw w instanceof j ? w : b ? new j() : d.signal.aborted ? new Error("等待设置保存超时，未提交本次修改") : w;
    } finally {
      clearTimeout(S);
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
    const r = await M();
    return e.command === "git-check-update" ? V(r) : r;
  }
  /** Shared, lossless backup selection; transport limits are checked by the uploader. */
  extractSyncPayload(e) {
    return U(e);
  }
}
const $ = y.getInstance(), X = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  AVAILABLE_SHORTCUT_TOOLS: K,
  CUSTOM_AVATAR_STORAGE_KEY: N,
  DEFAULT_LIMBUS_CONFIG: D,
  GLOBAL_SETTINGS_KEYS: R,
  LIMBUS_PRESETS: q,
  LIMBUS_STORAGE_KEY: E,
  OptionsService: y,
  SEARCH_IGNORED_BOOKMARK_FOLDERS_STORAGE_KEY: T,
  SHORTCUT_STORAGE_KEY: C,
  SYNC_WHITELIST_KEYS: Y,
  optionsService: $
}, Symbol.toStringTag, { value: "Module" }));
export {
  D,
  R as G,
  q as L,
  C as S,
  E as a,
  T as b,
  X as c,
  P as i,
  $ as o
};
