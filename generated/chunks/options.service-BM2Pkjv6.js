import { P as d, T as E, Q as v } from "./search.service-DtP_26rI.js";
import { A as M } from "./window-manager.store-BTl-n_d_.js";
const b = (t, e) => Object.prototype.hasOwnProperty.call(t, e), C = () => {
  throw new Error("其他页面已修改同一条配置，未覆盖；本页草稿保留。可重读设置后重新编辑。");
};
function I(t) {
  if (t === void 0) return {};
  if (!t || typeof t != "object" || Array.isArray(t))
    throw new Error("快捷键配置格式异常，未覆盖已有数据");
  return t;
}
function T(t, e, o) {
  return b(t, o) === b(e, o) && (!b(t, o) || d(t[o], e[o]));
}
function D(t, e, o) {
  const n = I(t), s = I(e), r = I(o), a = Object.assign(/* @__PURE__ */ Object.create(null), r);
  for (const i of /* @__PURE__ */ new Set([...Object.keys(n), ...Object.keys(s)]))
    if (!T(n, s, i)) {
      if (b(s, i) && typeof s[i] != "string")
        throw new Error("待保存的快捷键格式异常，未提交修改");
      !T(r, n, i) && !T(r, s, i) && C(), b(s, i) ? a[i] = s[i] : delete a[i];
    }
  return a;
}
function G(t) {
  if (!t || typeof t != "object" || Array.isArray(t)) return;
  const e = t.id;
  if (typeof e == "string" && e.length) return e;
  if (typeof e == "number" && Number.isFinite(e)) return String(e);
}
function V(t) {
  if (t === void 0) return [];
  if (!Array.isArray(t)) throw new Error("书签过滤配置格式异常，未覆盖已有数据");
  return t;
}
function L(t) {
  const e = /* @__PURE__ */ new Map();
  for (const o of t) {
    const n = G(o);
    if (n !== void 0) {
      if (e.has(n)) throw new Error("书签过滤中存在重复 ID，未静默去重或覆盖；请先核对已有配置");
      e.set(n, o);
    }
  }
  return e;
}
function j(t, e, o) {
  return t.has(o) === e.has(o) && (!t.has(o) || d(t.get(o), e.get(o)));
}
function Y(t, e, o) {
  const n = V(t), s = V(e), r = V(o), a = (l) => l.filter((g) => G(g) === void 0);
  if (!d(a(n), a(s)))
    throw new Error("本页不支持修改旧格式过滤规则，未覆盖已有数据");
  const i = L(n), f = L(s), u = L(r), h = [...r];
  for (const l of /* @__PURE__ */ new Set([...i.keys(), ...f.keys()])) {
    if (j(i, f, l)) continue;
    !j(u, i, l) && !j(u, f, l) && C();
    const g = h.findIndex((y) => G(y) === l);
    f.has(l) ? g !== -1 ? h[g] = f.get(l) : h.push(f.get(l)) : g !== -1 && h.splice(g, 1);
  }
  return h;
}
function q(t, e = 95e3) {
  return Promise.resolve({ ok: !1, error: "Native Messaging 已停用；扩展已升级为纯前端模式" });
}
function J(t) {
  if (!t.ok) return { ok: !1, error: t.error };
  const e = { ok: !1, error: "Git 更新状态格式未确认；未应用更新" };
  if (typeof t.hasUpdate != "boolean") return e;
  for (const o of ["localCommit", "commitDesc", "latestCommitTitle", "log", "warning"])
    if (t[o] !== void 0 && typeof t[o] != "string") return e;
  for (const o of ["behindCount", "aheadCount", "commitsBehind"]) {
    const n = t[o];
    if (n !== void 0 && (typeof n != "number" || !Number.isSafeInteger(n) || n < 0)) return e;
  }
  return { ...t, hasUpdate: t.hasUpdate };
}
const R = 2;
class w extends Error {
}
const z = /* @__PURE__ */ new Set([
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
  "singleNewTab",
  "showHomeMusicVisualizer"
]), U = /* @__PURE__ */ new Set([
  "searchIgnoredBookmarkFolders",
  "wereadSortIds",
  "foGroups",
  "launcherGroups",
  "quickLinks",
  "launcherPages",
  "foCollapsedGroupsV1",
  "biliFollowingGroupsV1",
  "biliSubCustomChannelsV1",
  "biliRadioSeriesV1"
]), x = /* @__PURE__ */ new Set([
  "customShortcuts",
  "launcherFolders",
  "quickLinkGroupSizes",
  "launcherPageLabels",
  "launcherFolderPositionV1",
  "foTree",
  "ghRepoRemarksV1",
  "ghLocalStarGroupsV1",
  "lw_private_chat_v1",
  "lw_webdav_config",
  "googleCalendarSessionTokenV1"
]);
function p(t) {
  if (!t || typeof t != "object" || Array.isArray(t)) return !1;
  const e = Object.getPrototypeOf(t);
  return e === Object.prototype || e === null;
}
function H(t) {
  if (/^(?:https?|wss?):\/\//i.test(t.trim()))
    try {
      new URL(t.trim());
    } catch {
      throw new w("备份包含无效链接，请先修正；没有删除或截断数据");
    }
}
function O(t, e = 0) {
  if (e > 40) throw new w("备份数据嵌套过深或存在循环引用");
  if (typeof t == "string") {
    H(t);
    return;
  }
  if (!(t === null || typeof t == "boolean") && !(typeof t == "number" && Number.isFinite(t))) {
    if (Array.isArray(t)) {
      t.forEach((o) => O(o, e + 1));
      return;
    }
    if (p(t)) {
      for (const [o, n] of Object.entries(t)) {
        if (["__proto__", "prototype", "constructor"].includes(o))
          throw new w("备份包含不安全的对象字段");
        O(n, e + 1);
      }
      return;
    }
    throw new w("备份包含无法完整保存为 JSON 的数据");
  }
}
function W(t, e) {
  const o = () => {
    throw new w(`配置项 ${t} 格式无效，操作已取消`);
  };
  if (["foGroups", "launcherGroups"].includes(t) ? !Array.isArray(e) && !p(e) && o() : z.has(t) ? typeof e != "boolean" && o() : U.has(t) ? Array.isArray(e) || o() : x.has(t) ? p(e) || o() : typeof e != "string" && typeof e != "number" && typeof e != "boolean" && o(), t === "quickLinks" && Array.isArray(e))
    for (const n of e)
      (!p(n) || typeof n.url != "string" || !n.url.trim()) && o(), typeof n.title != "string" && (n.title = n.url);
  t === "launcherPages" && Array.isArray(e) && !e.every((n) => typeof n == "string") && o(), ["customShortcuts", "launcherPageLabels", "quickLinkGroupSizes"].includes(t) && p(e) && !Object.values(e).every((n) => typeof n == "string" || typeof n == "number" || typeof n == "boolean") && o(), O(e);
}
function F(t, e) {
  if (!p(t)) throw new w("备份配置必须是对象，操作已取消");
  const o = {};
  for (const s of e) {
    if (!Object.hasOwn(t, s) || t[s] === void 0) continue;
    O(t[s]);
    const r = JSON.parse(JSON.stringify(t[s]));
    W(s, r), o[s] = r;
  }
  const n = JSON.stringify(o);
  return {
    sanitized: JSON.parse(n),
    count: Object.keys(o).length,
    byteLength: new TextEncoder().encode(n).length
  };
}
function $(t, e) {
  if (!p(t)) throw new w("云端备份格式无效，未写入本地数据");
  if (Object.hasOwn(t, "formatVersion") && t.formatVersion !== 1 && t.formatVersion !== R)
    throw new w("不支持此备份版本，请先更新插件；未写入本地数据");
  if (t.formatVersion === R && (t.backupKind !== "preferences" || t.credentialsIncluded !== !1 || !p(t.settings)))
    throw new w("备份范围标记无效，未写入本地数据");
  const o = F(Object.hasOwn(t, "settings") ? t.settings : t, e);
  if (!o.count) throw new w("云端备份中未包含有效的设置数据");
  return {
    ...o,
    clientDevice: ["Windows", "macOS", "PC"].includes(String(t.clientDevice)) ? String(t.clientDevice) : "其他设备"
  };
}
const Q = [
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
  "singleNewTab",
  "showHomeMusicVisualizer"
], X = "customShortcuts", Z = "searchIgnoredBookmarkFolders", ee = "customNewtabAvatar", te = "customAvatar", m = [
  ...Q,
  X,
  Z,
  "wereadSortIds",
  "foGroups",
  "foTree",
  "foCollapsedGroupsV1",
  "biliFollowingGroupsV1",
  "biliSubCustomChannelsV1",
  "biliRadioSeriesV1",
  "ghRepoRemarksV1",
  "ghLocalStarGroupsV1",
  "gh_my_repo_groups_v2",
  "gh_my_repo_groups_map_v2",
  "ghUser",
  "ghToken",
  "todoistToken",
  "todoistActiveProjectIdV1",
  "lw_private_chat_v1",
  "googleCalendarSessionTokenV1",
  "lw_webdav_config",
  "launcherGroups",
  "launcherFolders",
  "quickLinks",
  "quickLinkGroupSizes",
  "launcherPages",
  "launcherPageLabels",
  "launcherActivePage",
  "launcherFolderPositionV1",
  ee,
  te
];
function K(t) {
  return F(t, m);
}
const _ = /* @__PURE__ */ new Set([
  "quickLinks",
  "quickLinkGroupSizes",
  "launcherFolders",
  "launcherPages",
  "launcherPageLabels",
  "launcherActivePage",
  "quickLinksReady"
]);
async function se() {
  if (typeof chrome < "u" && chrome.storage?.local) {
    const e = await new Promise((o, n) => {
      chrome.storage.local.get(null, (s) => {
        const r = chrome.runtime.lastError;
        if (r) {
          n(new Error(r.message || "读取本地配置失败"));
          return;
        }
        const a = {}, i = s || {};
        for (const u of m)
          i[u] !== void 0 && (a[u] = i[u]);
        const f = Object.keys(i).filter((u) => u.startsWith("ghLocalStarGroupsV1:"));
        if (f.length) {
          const u = {};
          for (const h of f) u[h] = i[h];
          a.ghLocalStarGroupsV1 = u;
        }
        o(a);
      });
    });
    if (typeof localStorage < "u") {
      const o = ["lw_private_chat_v1", "ghUser", "ghToken", "todoistToken", "googleCalendarSessionTokenV1", "lw_webdav_config", "biliRadioSeriesV1", "gh_my_repo_groups_v2", "gh_my_repo_groups_map_v2"];
      for (const s of o)
        if (e[s] === void 0) {
          const r = localStorage.getItem(s) ?? (s === "biliRadioSeriesV1" ? localStorage.getItem("lw_backup_bili_radio_series") : null);
          if (r !== null)
            try {
              e[s] = JSON.parse(r);
            } catch {
              e[s] = r;
            }
        }
      const n = Object.keys(localStorage).filter((s) => s.startsWith("ghLocalStarGroupsV1:"));
      if (n.length && !e.ghLocalStarGroupsV1) {
        const s = {};
        for (const r of n) {
          const a = localStorage.getItem(r);
          if (a)
            try {
              s[r] = JSON.parse(a);
            } catch {
              s[r] = a;
            }
        }
        Object.keys(s).length && (e.ghLocalStarGroupsV1 = s);
      }
      for (const s of _) {
        if (!m.includes(s)) continue;
        const r = e[s];
        if (r === void 0 || Array.isArray(r) && r.length === 0) {
          const i = localStorage.getItem(`logicweaver:${s}`) ?? localStorage.getItem(s);
          if (i)
            try {
              const f = JSON.parse(i);
              f !== void 0 && (!Array.isArray(f) || f.length > 0) && (e[s] = f);
            } catch {
            }
        }
      }
    }
    return e;
  }
  if (typeof localStorage > "u") throw new Error("本地存储不可用");
  const t = {};
  for (const e of m) {
    const o = (_.has(e) ? localStorage.getItem(`logicweaver:${e}`) : null) ?? localStorage.getItem(e);
    if (o !== null)
      try {
        t[e] = JSON.parse(o);
      } catch {
        t[e] = o;
      }
  }
  return t;
}
async function ie(t) {
  const e = $(t, m), o = { ...e.sanitized };
  if (Object.hasOwn(o, "quickLinks") && (o.quickLinksReady = !0), typeof chrome < "u" && chrome.storage?.local) {
    if (await new Promise((n, s) => {
      chrome.storage.local.set(o, () => {
        const r = chrome.runtime.lastError;
        r ? s(new Error(r.message || "写入本地配置失败")) : n();
      });
    }), o.ghLocalStarGroupsV1 && typeof o.ghLocalStarGroupsV1 == "object") {
      const n = o.ghLocalStarGroupsV1, s = {};
      for (const [r, a] of Object.entries(n))
        if (r.startsWith("ghLocalStarGroupsV1:") && (s[r] = a, typeof localStorage < "u"))
          try {
            localStorage.setItem(r, JSON.stringify(a));
          } catch {
          }
      Object.keys(s).length && await new Promise((r) => {
        chrome.storage.local.set(s, () => r());
      });
    }
    if (typeof localStorage < "u")
      for (const [n, s] of Object.entries(o))
        try {
          const r = JSON.stringify(s);
          _.has(n) && localStorage.setItem(`logicweaver:${n}`, r), localStorage.setItem(n, r);
        } catch {
        }
  } else {
    if (typeof localStorage > "u") throw new Error("本地存储不可用");
    const n = Object.entries(o).flatMap(([r, a]) => {
      const i = JSON.stringify(a);
      return _.has(r) ? [[r, i], [`logicweaver:${r}`, i]] : [[r, i]];
    }), s = new Map(n.map(([r]) => [r, localStorage.getItem(r)]));
    try {
      for (const [r, a] of n) localStorage.setItem(r, a);
    } catch {
      let r = !0;
      for (const [a, i] of s)
        try {
          i === null ? localStorage.removeItem(a) : localStorage.setItem(a, i);
        } catch {
          r = !1;
        }
      throw new Error(r ? "恢复失败，已回滚本次写入；请检查本地存储空间" : "恢复失败且部分数据无法回滚，请勿继续编辑，先检查本地存储与备份");
    }
  }
  if (typeof localStorage < "u" && Object.hasOwn(o, "biliRadioSeriesV1"))
    try {
      const n = JSON.stringify(o.biliRadioSeriesV1);
      localStorage.setItem("biliRadioSeriesV1", n), localStorage.setItem("lw_backup_bili_radio_series", n);
    } catch {
    }
  if (typeof window < "u")
    try {
      window.dispatchEvent(new CustomEvent("logicweaver:sync-restored", { detail: o }));
    } catch {
    }
  return { restoredCount: e.count, clientDevice: e.clientDevice };
}
function ae(t) {
  const e = typeof navigator > "u" ? "" : navigator.userAgent;
  return {
    formatVersion: R,
    clientDevice: /Macintosh|Mac OS X/i.test(e) ? "macOS" : /Windows/i.test(e) ? "Windows" : "PC",
    exportedAt: (/* @__PURE__ */ new Date()).toISOString(),
    backupKind: "preferences",
    credentialsIncluded: !1,
    settings: K(t).sanitized
  };
}
const N = [
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
  "dockPosition"
], k = "customShortcuts", P = "customNewtabAvatar", A = "searchIgnoredBookmarkFolders";
class S {
  constructor() {
  }
  static getInstance() {
    return S.instance || (S.instance = new S()), S.instance;
  }
  /** Global settings are explicitly scoped; community sources can contain Tokens. */
  async loadGlobalSettings() {
    if (typeof chrome > "u" || !chrome.storage?.local) throw new Error("设置存储不可用，未读取配置");
    const e = await chrome.storage.local.get([
      ...N,
      k,
      P,
      A
    ]);
    return typeof localStorage < "u" && (e.showStartupAnimation !== void 0 && (localStorage.setItem("showStartupAnimation", e.showStartupAnimation ? "1" : "0"), localStorage.setItem("logicweaverEndfieldLoader", e.showStartupAnimation ? "1" : "0")), e.startupAnimationStyle && (localStorage.setItem("startupAnimationStyle", String(e.startupAnimationStyle)), localStorage.setItem("logicweaverStartupStyle", String(e.startupAnimationStyle)))), e;
  }
  /** Save only edited keys, rejecting stale drafts under a lock shared by new settings views. */
  async saveSettings(e, o) {
    if (typeof chrome > "u" || !chrome.storage?.local) throw new Error("设置存储不可用，未保存");
    const n = /* @__PURE__ */ new Set([
      ...N,
      k,
      P,
      A
    ]), s = Object.keys(e);
    if (s.some((l) => !n.has(l) || !Object.prototype.hasOwnProperty.call(o, l)))
      throw new Error("保存范围或草稿基线无效，未提交设置");
    if (!s.length) return {};
    if (typeof navigator > "u" || !navigator.locks?.request)
      throw new Error("当前环境不支持跨标签保存保护，未提交设置");
    const r = E(e), a = E(o), i = new AbortController(), f = Date.now() + 1e4, u = setTimeout(() => i.abort(), 1e4);
    let h = !1;
    try {
      return await navigator.locks.request("logicweaver:global-settings", { signal: i.signal }, async () => {
        const l = await chrome.storage.local.get(s);
        if (i.signal.aborted || Date.now() >= f)
          throw new Error("等待设置保存超时，未提交本次修改");
        const g = {};
        for (const c of s)
          if (c === k)
            g[c] = D(a[c], r[c], l[c]);
          else if (c === A)
            g[c] = Y(a[c], r[c], l[c]);
          else {
            if (!d(l[c], a[c]) && !d(l[c], r[c]))
              throw new Error("其他页面已修改同一项设置，未覆盖；本页草稿保留。可重读设置后重新编辑。");
            g[c] = r[c];
          }
        const y = {};
        for (const c of s)
          d(l[c], g[c]) || (y[c] = g[c]);
        if (Object.keys(y).length) {
          clearTimeout(u), h = !0, await chrome.storage.local.set(y);
          const c = await chrome.storage.local.get(s);
          if (s.some((B) => !d(c[B], g[B])))
            throw new Error("设置保存结果未确认，请重读核对；未自动重试");
        }
        try {
          Object.prototype.hasOwnProperty.call(r, "showStartupAnimation") && (localStorage.setItem("showStartupAnimation", r.showStartupAnimation ? "1" : "0"), localStorage.setItem("logicweaverEndfieldLoader", r.showStartupAnimation ? "1" : "0")), Object.prototype.hasOwnProperty.call(r, "startupAnimationStyle") && localStorage.setItem("startupAnimationStyle", r.startupAnimationStyle || "endfield"), Object.prototype.hasOwnProperty.call(r, "searchEngine") && (localStorage.setItem("searchEngine", r.searchEngine || "bing"), window.dispatchEvent(new CustomEvent("logicweaver:search-engine-updated", { detail: r.searchEngine })));
        } catch {
          throw new v("设置已保存，但开屏缓存未确认；请重读核对，未自动重试");
        }
        try {
          window.parent?.postMessage?.({ type: "newtab-options-saved" }, "*");
        } catch {
        }
        return E(g);
      });
    } catch (l) {
      throw l instanceof v ? l : h ? new v() : i.signal.aborted ? new Error("等待设置保存超时，未提交本次修改") : l;
    } finally {
      clearTimeout(u);
    }
  }
  /**
   * 收集书签树中的全部文件夹路径
   */
  collectBookmarkFolders(e, o = "", n = []) {
    if (!e) return n;
    const s = !e.parentId || e.id === "0";
    let r = e.title || "";
    r || (e.id === "1" ? r = "书签栏" : e.id === "2" ? r = "其他书签" : (e.id === "mobile" || e.id === "3") && (r = "移动设备书签"));
    const a = s ? o : o ? `${o} / ${r}` : r;
    !e.url && !s && n.push({
      id: String(e.id),
      title: r || "未命名文件夹",
      path: a || r || "书签文件夹"
    });
    for (const i of e.children || [])
      i.url || this.collectBookmarkFolders(i, a, n);
    return n;
  }
  /**
   * 历史兼容存根：Native Host 已在 v1.0.2 彻底移除。
   * 此方法仅保留为类型安全存根，不再发起任何底层原生进程连接。
   */
  async callNativeHost(e) {
    if (e.command !== "git-check-update" && e.command !== "git-apply-update")
      return { ok: !1, error: "设置服务不允许此原生命令；未发送请求" };
    const o = await q();
    return e.command === "git-check-update" ? J(o) : o;
  }
  /** Shared, lossless backup selection; transport limits are checked by the uploader. */
  extractSyncPayload(e) {
    return K(e);
  }
}
const oe = S.getInstance(), ce = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  AVAILABLE_SHORTCUT_TOOLS: M,
  CUSTOM_AVATAR_STORAGE_KEY: P,
  GLOBAL_SETTINGS_KEYS: N,
  OptionsService: S,
  SEARCH_IGNORED_BOOKMARK_FOLDERS_STORAGE_KEY: A,
  SHORTCUT_STORAGE_KEY: k,
  SYNC_WHITELIST_KEYS: m,
  optionsService: oe
}, Symbol.toStringTag, { value: "Module" }));
export {
  N as G,
  w as S,
  ie as a,
  m as b,
  ae as c,
  k as d,
  K as e,
  A as f,
  ce as g,
  G as i,
  oe as o,
  $ as p,
  se as r
};
