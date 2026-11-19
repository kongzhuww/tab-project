import { J as h, L as b, K as E } from "./search.service-B3Axreqn.js";
import { e as P, S as R } from "./sync.service-TpPdkSsm.js";
import { A as C } from "./window-manager.store-D9RSYghK.js";
const p = (e, t) => Object.prototype.hasOwnProperty.call(e, t), N = () => {
  throw new Error("其他页面已修改同一条配置，未覆盖；本页草稿保留。可重读设置后重新编辑。");
};
function A(e) {
  if (e === void 0) return {};
  if (!e || typeof e != "object" || Array.isArray(e))
    throw new Error("快捷键配置格式异常，未覆盖已有数据");
  return e;
}
function k(e, t, o) {
  return p(e, o) === p(t, o) && (!p(e, o) || h(e[o], t[o]));
}
function L(e, t, o) {
  const a = A(e), s = A(t), r = A(o), f = Object.assign(/* @__PURE__ */ Object.create(null), r);
  for (const c of /* @__PURE__ */ new Set([...Object.keys(a), ...Object.keys(s)]))
    if (!k(a, s, c)) {
      if (p(s, c) && typeof s[c] != "string")
        throw new Error("待保存的快捷键格式异常，未提交修改");
      !k(r, a, c) && !k(r, s, c) && N(), p(s, c) ? f[c] = s[c] : delete f[c];
    }
  return f;
}
function v(e) {
  if (!e || typeof e != "object" || Array.isArray(e)) return;
  const t = e.id;
  if (typeof t == "string" && t.length) return t;
  if (typeof t == "number" && Number.isFinite(t)) return String(t);
}
function O(e) {
  if (e === void 0) return [];
  if (!Array.isArray(e)) throw new Error("书签过滤配置格式异常，未覆盖已有数据");
  return e;
}
function T(e) {
  const t = /* @__PURE__ */ new Map();
  for (const o of e) {
    const a = v(o);
    if (a !== void 0) {
      if (t.has(a)) throw new Error("书签过滤中存在重复 ID，未静默去重或覆盖；请先核对已有配置");
      t.set(a, o);
    }
  }
  return t;
}
function I(e, t, o) {
  return e.has(o) === t.has(o) && (!e.has(o) || h(e.get(o), t.get(o)));
}
function F(e, t, o) {
  const a = O(e), s = O(t), r = O(o), f = (i) => i.filter((l) => v(l) === void 0);
  if (!h(f(a), f(s)))
    throw new Error("本页不支持修改旧格式过滤规则，未覆盖已有数据");
  const c = T(a), u = T(s), m = T(r), w = [...r];
  for (const i of /* @__PURE__ */ new Set([...c.keys(), ...u.keys()])) {
    if (I(c, u, i)) continue;
    !I(m, c, i) && !I(m, u, i) && N();
    const l = w.findIndex((g) => v(g) === i);
    u.has(i) ? l !== -1 ? w[l] = u.get(i) : w.push(u.get(i)) : l !== -1 && w.splice(l, 1);
  }
  return w;
}
function G(e, t = 95e3) {
  return Promise.resolve({ ok: !1, error: "Native Messaging 已停用；扩展已升级为纯前端模式" });
}
function M(e) {
  if (!e.ok) return { ok: !1, error: e.error };
  const t = { ok: !1, error: "Git 更新状态格式未确认；未应用更新" };
  if (typeof e.hasUpdate != "boolean") return t;
  for (const o of ["localCommit", "commitDesc", "latestCommitTitle", "log", "warning"])
    if (e[o] !== void 0 && typeof e[o] != "string") return t;
  for (const o of ["behindCount", "aheadCount", "commitsBehind"]) {
    const a = e[o];
    if (a !== void 0 && (typeof a != "number" || !Number.isSafeInteger(a) || a < 0)) return t;
  }
  return { ...e, hasUpdate: e.hasUpdate };
}
const _ = [
  "displaySize",
  "city",
  "showWeather",
  "showSites",
  "showHomeNews",
  "showHomePlayer",
  "showQuickSearchWallpaper",
  "defaultSitesView",
  "sitesTransparency",
  "weatherTransparency",
  "newsTransparency",
  "playerTransparency",
  "showBili",
  "showTodo",
  "showLeftNavigation",
  "showNavBall",
  "showBookmarkPanel",
  "showBookmarkFoldersTop",
  "showStartupAnimation",
  "startupAnimationStyle",
  "searchEngine",
  "singleNewTab",
  "enableQuickSearch",
  "showHomeMusicVisualizer",
  "dockPosition"
], S = "customShortcuts", j = "customNewtabAvatar", y = "searchIgnoredBookmarkFolders";
class d {
  constructor() {
  }
  static getInstance() {
    return d.instance || (d.instance = new d()), d.instance;
  }
  /** Global settings are explicitly scoped; community sources can contain Tokens. */
  async loadGlobalSettings() {
    if (typeof chrome > "u" || !chrome.storage?.local) throw new Error("设置存储不可用，未读取配置");
    const t = await chrome.storage.local.get([
      ..._,
      S,
      j,
      y
    ]);
    return typeof localStorage < "u" && (t.showStartupAnimation !== void 0 && (localStorage.setItem("showStartupAnimation", t.showStartupAnimation ? "1" : "0"), localStorage.setItem("logicweaverEndfieldLoader", t.showStartupAnimation ? "1" : "0")), t.startupAnimationStyle && (localStorage.setItem("startupAnimationStyle", String(t.startupAnimationStyle)), localStorage.setItem("logicweaverStartupStyle", String(t.startupAnimationStyle)))), t;
  }
  /** Save only edited keys, rejecting stale drafts under a lock shared by new settings views. */
  async saveSettings(t, o) {
    if (typeof chrome > "u" || !chrome.storage?.local) throw new Error("设置存储不可用，未保存");
    const a = /* @__PURE__ */ new Set([
      ..._,
      S,
      j,
      y
    ]), s = Object.keys(t);
    if (s.some((i) => !a.has(i) || !Object.prototype.hasOwnProperty.call(o, i)))
      throw new Error("保存范围或草稿基线无效，未提交设置");
    if (!s.length) return {};
    if (typeof navigator > "u" || !navigator.locks?.request)
      throw new Error("当前环境不支持跨标签保存保护，未提交设置");
    const r = b(t), f = b(o), c = new AbortController(), u = Date.now() + 1e4, m = setTimeout(() => c.abort(), 1e4);
    let w = !1;
    try {
      return await navigator.locks.request("logicweaver:global-settings", { signal: c.signal }, async () => {
        const i = await chrome.storage.local.get(s);
        if (c.signal.aborted || Date.now() >= u)
          throw new Error("等待设置保存超时，未提交本次修改");
        const l = {};
        for (const n of s)
          if (n === S)
            l[n] = L(f[n], r[n], i[n]);
          else if (n === y)
            l[n] = F(f[n], r[n], i[n]);
          else {
            if (!h(i[n], f[n]) && !h(i[n], r[n]))
              throw new Error("其他页面已修改同一项设置，未覆盖；本页草稿保留。可重读设置后重新编辑。");
            l[n] = r[n];
          }
        const g = {};
        for (const n of s)
          h(i[n], l[n]) || (g[n] = l[n]);
        if (Object.keys(g).length) {
          clearTimeout(m), w = !0, await chrome.storage.local.set(g);
          const n = await chrome.storage.local.get(s);
          if (s.some((B) => !h(n[B], l[B])))
            throw new Error("设置保存结果未确认，请重读核对；未自动重试");
        }
        try {
          Object.prototype.hasOwnProperty.call(r, "showStartupAnimation") && (localStorage.setItem("showStartupAnimation", r.showStartupAnimation ? "1" : "0"), localStorage.setItem("logicweaverEndfieldLoader", r.showStartupAnimation ? "1" : "0")), Object.prototype.hasOwnProperty.call(r, "startupAnimationStyle") && localStorage.setItem("startupAnimationStyle", r.startupAnimationStyle || "endfield"), Object.prototype.hasOwnProperty.call(r, "searchEngine") && (localStorage.setItem("searchEngine", r.searchEngine || "bing"), window.dispatchEvent(new CustomEvent("logicweaver:search-engine-updated", { detail: r.searchEngine })));
        } catch {
          throw new E("设置已保存，但开屏缓存未确认；请重读核对，未自动重试");
        }
        try {
          window.parent?.postMessage?.({ type: "newtab-options-saved" }, "*");
        } catch {
        }
        return b(l);
      });
    } catch (i) {
      throw i instanceof E ? i : w ? new E() : c.signal.aborted ? new Error("等待设置保存超时，未提交本次修改") : i;
    } finally {
      clearTimeout(m);
    }
  }
  /**
   * 收集书签树中的全部文件夹路径
   */
  collectBookmarkFolders(t, o = "", a = []) {
    if (!t) return a;
    const s = !t.parentId || t.id === "0";
    let r = t.title || "";
    r || (t.id === "1" ? r = "书签栏" : t.id === "2" ? r = "其他书签" : (t.id === "mobile" || t.id === "3") && (r = "移动设备书签"));
    const f = s ? o : o ? `${o} / ${r}` : r;
    !t.url && !s && a.push({
      id: String(t.id),
      title: r || "未命名文件夹",
      path: f || r || "书签文件夹"
    });
    for (const c of t.children || [])
      c.url || this.collectBookmarkFolders(c, f, a);
    return a;
  }
  /**
   * 历史兼容存根：Native Host 已在 v1.0.2 彻底移除。
   * 此方法仅保留为类型安全存根，不再发起任何底层原生进程连接。
   */
  async callNativeHost(t) {
    if (t.command !== "git-check-update" && t.command !== "git-apply-update")
      return { ok: !1, error: "设置服务不允许此原生命令；未发送请求" };
    const o = await G();
    return t.command === "git-check-update" ? M(o) : o;
  }
  /** Shared, lossless backup selection; transport limits are checked by the uploader. */
  extractSyncPayload(t) {
    return P(t);
  }
}
const D = d.getInstance(), U = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  AVAILABLE_SHORTCUT_TOOLS: C,
  CUSTOM_AVATAR_STORAGE_KEY: j,
  GLOBAL_SETTINGS_KEYS: _,
  OptionsService: d,
  SEARCH_IGNORED_BOOKMARK_FOLDERS_STORAGE_KEY: y,
  SHORTCUT_STORAGE_KEY: S,
  SYNC_WHITELIST_KEYS: R,
  optionsService: D
}, Symbol.toStringTag, { value: "Module" }));
export {
  _ as G,
  S,
  y as a,
  U as b,
  v as i,
  D as o
};
