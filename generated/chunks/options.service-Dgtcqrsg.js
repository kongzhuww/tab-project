import { N as d, P as _, O as T } from "./search.service-DGqXHLyU.js";
import { A as M } from "./window-manager.store-D_Nuf9-p.js";
const b = (e, t) => Object.prototype.hasOwnProperty.call(e, t), G = () => {
  throw new Error("其他页面已修改同一条配置，未覆盖；本页草稿保留。可重读设置后重新编辑。");
};
function I(e) {
  if (e === void 0) return {};
  if (!e || typeof e != "object" || Array.isArray(e))
    throw new Error("快捷键配置格式异常，未覆盖已有数据");
  return e;
}
function v(e, t, o) {
  return b(e, o) === b(t, o) && (!b(e, o) || d(e[o], t[o]));
}
function D(e, t, o) {
  const r = I(e), s = I(t), n = I(o), a = Object.assign(/* @__PURE__ */ Object.create(null), n);
  for (const i of /* @__PURE__ */ new Set([...Object.keys(r), ...Object.keys(s)]))
    if (!v(r, s, i)) {
      if (b(s, i) && typeof s[i] != "string")
        throw new Error("待保存的快捷键格式异常，未提交修改");
      !v(n, r, i) && !v(n, s, i) && G(), b(s, i) ? a[i] = s[i] : delete a[i];
    }
  return a;
}
function j(e) {
  if (!e || typeof e != "object" || Array.isArray(e)) return;
  const t = e.id;
  if (typeof t == "string" && t.length) return t;
  if (typeof t == "number" && Number.isFinite(t)) return String(t);
}
function R(e) {
  if (e === void 0) return [];
  if (!Array.isArray(e)) throw new Error("书签过滤配置格式异常，未覆盖已有数据");
  return e;
}
function V(e) {
  const t = /* @__PURE__ */ new Map();
  for (const o of e) {
    const r = j(o);
    if (r !== void 0) {
      if (t.has(r)) throw new Error("书签过滤中存在重复 ID，未静默去重或覆盖；请先核对已有配置");
      t.set(r, o);
    }
  }
  return t;
}
function N(e, t, o) {
  return e.has(o) === t.has(o) && (!e.has(o) || d(e.get(o), t.get(o)));
}
function Y(e, t, o) {
  const r = R(e), s = R(t), n = R(o), a = (l) => l.filter((f) => j(f) === void 0);
  if (!d(a(r), a(s)))
    throw new Error("本页不支持修改旧格式过滤规则，未覆盖已有数据");
  const i = V(r), h = V(s), S = V(n), g = [...n];
  for (const l of /* @__PURE__ */ new Set([...i.keys(), ...h.keys()])) {
    if (N(i, h, l)) continue;
    !N(S, i, l) && !N(S, h, l) && G();
    const f = g.findIndex((y) => j(y) === l);
    h.has(l) ? f !== -1 ? g[f] = h.get(l) : g.push(h.get(l)) : f !== -1 && g.splice(f, 1);
  }
  return g;
}
function q(e, t = 95e3) {
  return Promise.resolve({ ok: !1, error: "Native Messaging 已停用；扩展已升级为纯前端模式" });
}
function U(e) {
  if (!e.ok) return { ok: !1, error: e.error };
  const t = { ok: !1, error: "Git 更新状态格式未确认；未应用更新" };
  if (typeof e.hasUpdate != "boolean") return t;
  for (const o of ["localCommit", "commitDesc", "latestCommitTitle", "log", "warning"])
    if (e[o] !== void 0 && typeof e[o] != "string") return t;
  for (const o of ["behindCount", "aheadCount", "commitsBehind"]) {
    const r = e[o];
    if (r !== void 0 && (typeof r != "number" || !Number.isSafeInteger(r) || r < 0)) return t;
  }
  return { ...e, hasUpdate: e.hasUpdate };
}
const P = 2;
class u extends Error {
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
]), J = /* @__PURE__ */ new Set([
  "searchIgnoredBookmarkFolders",
  "wereadSortIds",
  "foGroups",
  "launcherGroups",
  "quickLinks",
  "launcherPages",
  "foCollapsedGroupsV1",
  "biliFollowingGroupsV1",
  "biliSubCustomChannelsV1",
  "biliRadioSeriesV1",
  "ghCats",
  "ghUsed"
]), x = /* @__PURE__ */ new Set([
  "customShortcuts",
  "launcherFolders",
  "quickLinkGroupSizes",
  "launcherPageLabels",
  "launcherFolderPositionV1",
  "foTree",
  "ghMap",
  "ghRepoRemarksV1",
  "lw_private_chat_v1",
  "lw_webdav_config",
  "googleCalendarSessionTokenV1"
]);
function w(e) {
  if (!e || typeof e != "object" || Array.isArray(e)) return !1;
  const t = Object.getPrototypeOf(e);
  return t === Object.prototype || t === null;
}
function H(e) {
  if (/^(?:https?|wss?):\/\//i.test(e.trim()))
    try {
      new URL(e.trim());
    } catch {
      throw new u("备份包含无效链接，请先修正；没有删除或截断数据");
    }
}
function A(e, t = 0) {
  if (t > 40) throw new u("备份数据嵌套过深或存在循环引用");
  if (typeof e == "string") {
    H(e);
    return;
  }
  if (!(e === null || typeof e == "boolean") && !(typeof e == "number" && Number.isFinite(e))) {
    if (Array.isArray(e)) {
      e.forEach((o) => A(o, t + 1));
      return;
    }
    if (w(e)) {
      for (const [o, r] of Object.entries(e)) {
        if (["__proto__", "prototype", "constructor"].includes(o))
          throw new u("备份包含不安全的对象字段");
        A(r, t + 1);
      }
      return;
    }
    throw new u("备份包含无法完整保存为 JSON 的数据");
  }
}
function W(e, t) {
  const o = () => {
    throw new u(`配置项 ${e} 格式无效，操作已取消`);
  };
  if (["foGroups", "launcherGroups", "ghUsed"].includes(e) ? !Array.isArray(t) && !w(t) && o() : z.has(e) ? typeof t != "boolean" && o() : J.has(e) ? Array.isArray(t) || o() : x.has(e) ? w(t) || o() : typeof t != "string" && typeof t != "number" && typeof t != "boolean" && o(), e === "quickLinks" && Array.isArray(t))
    for (const r of t)
      (!w(r) || typeof r.url != "string" || !r.url.trim()) && o(), typeof r.title != "string" && (r.title = r.url);
  e === "launcherPages" && Array.isArray(t) && !t.every((r) => typeof r == "string") && o(), ["customShortcuts", "launcherPageLabels", "quickLinkGroupSizes"].includes(e) && w(t) && !Object.values(t).every((r) => typeof r == "string" || typeof r == "number" || typeof r == "boolean") && o(), A(t);
}
function F(e, t) {
  if (!w(e)) throw new u("备份配置必须是对象，操作已取消");
  const o = {};
  for (const s of t) {
    if (!Object.hasOwn(e, s) || e[s] === void 0) continue;
    A(e[s]);
    const n = JSON.parse(JSON.stringify(e[s]));
    W(s, n), o[s] = n;
  }
  const r = JSON.stringify(o);
  return {
    sanitized: JSON.parse(r),
    count: Object.keys(o).length,
    byteLength: new TextEncoder().encode(r).length
  };
}
function $(e, t) {
  if (!w(e)) throw new u("云端备份格式无效，未写入本地数据");
  if (Object.hasOwn(e, "formatVersion") && e.formatVersion !== 1 && e.formatVersion !== P)
    throw new u("不支持此备份版本，请先更新插件；未写入本地数据");
  if (e.formatVersion === P && (e.backupKind !== "preferences" || e.credentialsIncluded !== !1 || !w(e.settings)))
    throw new u("备份范围标记无效，未写入本地数据");
  const o = F(Object.hasOwn(e, "settings") ? e.settings : e, t);
  if (!o.count) throw new u("云端备份中未包含有效的设置数据");
  return {
    ...o,
    clientDevice: ["Windows", "macOS", "PC"].includes(String(e.clientDevice)) ? String(e.clientDevice) : "其他设备"
  };
}
const X = [
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
], Q = "customShortcuts", Z = "searchIgnoredBookmarkFolders", ee = "customNewtabAvatar", te = "customAvatar", m = [
  ...X,
  Q,
  Z,
  "wereadSortIds",
  "foGroups",
  "foTree",
  "foCollapsedGroupsV1",
  "biliFollowingGroupsV1",
  "biliSubCustomChannelsV1",
  "biliRadioSeriesV1",
  "ghCats",
  "ghMap",
  "ghUsed",
  "ghRepoRemarksV1",
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
function K(e) {
  return F(e, m);
}
const E = /* @__PURE__ */ new Set([
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
    const t = await new Promise((o, r) => {
      chrome.storage.local.get(m, (s) => {
        const n = chrome.runtime.lastError;
        n ? r(new Error(n.message || "读取本地配置失败")) : o(s || {});
      });
    });
    if (typeof localStorage < "u") {
      const o = ["lw_private_chat_v1", "ghUser", "ghToken", "todoistToken", "googleCalendarSessionTokenV1", "lw_webdav_config", "biliRadioSeriesV1"];
      for (const r of o)
        if (t[r] === void 0) {
          const s = localStorage.getItem(r) ?? (r === "biliRadioSeriesV1" ? localStorage.getItem("lw_backup_bili_radio_series") : null);
          if (s !== null)
            try {
              t[r] = JSON.parse(s);
            } catch {
              t[r] = s;
            }
        }
      for (const r of E) {
        if (!m.includes(r)) continue;
        const s = t[r];
        if (s === void 0 || Array.isArray(s) && s.length === 0) {
          const a = localStorage.getItem(`logicweaver:${r}`) ?? localStorage.getItem(r);
          if (a)
            try {
              const i = JSON.parse(a);
              i !== void 0 && (!Array.isArray(i) || i.length > 0) && (t[r] = i);
            } catch {
            }
        }
      }
    }
    return t;
  }
  if (typeof localStorage > "u") throw new Error("本地存储不可用");
  const e = {};
  for (const t of m) {
    const o = (E.has(t) ? localStorage.getItem(`logicweaver:${t}`) : null) ?? localStorage.getItem(t);
    if (o !== null)
      try {
        e[t] = JSON.parse(o);
      } catch {
        e[t] = o;
      }
  }
  return e;
}
async function ie(e) {
  const t = $(e, m), o = { ...t.sanitized };
  if (Object.hasOwn(o, "quickLinks") && (o.quickLinksReady = !0), typeof chrome < "u" && chrome.storage?.local) {
    if (await new Promise((r, s) => {
      chrome.storage.local.set(o, () => {
        const n = chrome.runtime.lastError;
        n ? s(new Error(n.message || "写入本地配置失败")) : r();
      });
    }), typeof localStorage < "u")
      for (const [r, s] of Object.entries(o))
        try {
          const n = JSON.stringify(s);
          E.has(r) && localStorage.setItem(`logicweaver:${r}`, n), localStorage.setItem(r, n);
        } catch {
        }
  } else {
    if (typeof localStorage > "u") throw new Error("本地存储不可用");
    const r = Object.entries(o).flatMap(([n, a]) => {
      const i = JSON.stringify(a);
      return E.has(n) ? [[n, i], [`logicweaver:${n}`, i]] : [[n, i]];
    }), s = new Map(r.map(([n]) => [n, localStorage.getItem(n)]));
    try {
      for (const [n, a] of r) localStorage.setItem(n, a);
    } catch {
      let n = !0;
      for (const [a, i] of s)
        try {
          i === null ? localStorage.removeItem(a) : localStorage.setItem(a, i);
        } catch {
          n = !1;
        }
      throw new Error(n ? "恢复失败，已回滚本次写入；请检查本地存储空间" : "恢复失败且部分数据无法回滚，请勿继续编辑，先检查本地存储与备份");
    }
  }
  if (typeof localStorage < "u" && Object.hasOwn(o, "biliRadioSeriesV1"))
    try {
      const r = JSON.stringify(o.biliRadioSeriesV1);
      localStorage.setItem("biliRadioSeriesV1", r), localStorage.setItem("lw_backup_bili_radio_series", r);
    } catch {
    }
  if (typeof window < "u")
    try {
      window.dispatchEvent(new CustomEvent("logicweaver:sync-restored", { detail: o }));
    } catch {
    }
  return { restoredCount: t.count, clientDevice: t.clientDevice };
}
function ae(e) {
  const t = typeof navigator > "u" ? "" : navigator.userAgent;
  return {
    formatVersion: P,
    clientDevice: /Macintosh|Mac OS X/i.test(t) ? "macOS" : /Windows/i.test(t) ? "Windows" : "PC",
    exportedAt: (/* @__PURE__ */ new Date()).toISOString(),
    backupKind: "preferences",
    credentialsIncluded: !1,
    settings: K(e).sanitized
  };
}
const B = [
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
], k = "customShortcuts", C = "customNewtabAvatar", O = "searchIgnoredBookmarkFolders";
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
      ...B,
      k,
      C,
      O
    ]);
  }
  /** Save only edited keys, rejecting stale drafts under a lock shared by new settings views. */
  async saveSettings(t, o) {
    if (typeof chrome > "u" || !chrome.storage?.local) throw new Error("设置存储不可用，未保存");
    const r = /* @__PURE__ */ new Set([
      ...B,
      k,
      C,
      O
    ]), s = Object.keys(t);
    if (s.some((l) => !r.has(l) || !Object.prototype.hasOwnProperty.call(o, l)))
      throw new Error("保存范围或草稿基线无效，未提交设置");
    if (!s.length) return {};
    if (typeof navigator > "u" || !navigator.locks?.request)
      throw new Error("当前环境不支持跨标签保存保护，未提交设置");
    const n = _(t), a = _(o), i = new AbortController(), h = Date.now() + 1e4, S = setTimeout(() => i.abort(), 1e4);
    let g = !1;
    try {
      return await navigator.locks.request("logicweaver:global-settings", { signal: i.signal }, async () => {
        const l = await chrome.storage.local.get(s);
        if (i.signal.aborted || Date.now() >= h)
          throw new Error("等待设置保存超时，未提交本次修改");
        const f = {};
        for (const c of s)
          if (c === k)
            f[c] = D(a[c], n[c], l[c]);
          else if (c === O)
            f[c] = Y(a[c], n[c], l[c]);
          else {
            if (!d(l[c], a[c]) && !d(l[c], n[c]))
              throw new Error("其他页面已修改同一项设置，未覆盖；本页草稿保留。可重读设置后重新编辑。");
            f[c] = n[c];
          }
        const y = {};
        for (const c of s)
          d(l[c], f[c]) || (y[c] = f[c]);
        if (Object.keys(y).length) {
          clearTimeout(S), g = !0, await chrome.storage.local.set(y);
          const c = await chrome.storage.local.get(s);
          if (s.some((L) => !d(c[L], f[L])))
            throw new Error("设置保存结果未确认，请重读核对；未自动重试");
        }
        try {
          Object.prototype.hasOwnProperty.call(n, "showStartupAnimation") && (localStorage.setItem("showStartupAnimation", n.showStartupAnimation ? "1" : "0"), localStorage.setItem("logicweaverEndfieldLoader", n.showStartupAnimation ? "1" : "0")), Object.prototype.hasOwnProperty.call(n, "startupAnimationStyle") && localStorage.setItem("startupAnimationStyle", n.startupAnimationStyle || "endfield"), Object.prototype.hasOwnProperty.call(n, "searchEngine") && (localStorage.setItem("searchEngine", n.searchEngine || "bing"), window.dispatchEvent(new CustomEvent("logicweaver:search-engine-updated", { detail: n.searchEngine })));
        } catch {
          throw new T("设置已保存，但开屏缓存未确认；请重读核对，未自动重试");
        }
        try {
          window.parent?.postMessage?.({ type: "newtab-options-saved" }, "*");
        } catch {
        }
        return _(f);
      });
    } catch (l) {
      throw l instanceof T ? l : g ? new T() : i.signal.aborted ? new Error("等待设置保存超时，未提交本次修改") : l;
    } finally {
      clearTimeout(S);
    }
  }
  /**
   * 收集书签树中的全部文件夹路径
   */
  collectBookmarkFolders(t, o = "", r = []) {
    if (!t) return r;
    const s = !t.parentId || t.id === "0";
    let n = t.title || "";
    n || (t.id === "1" ? n = "书签栏" : t.id === "2" ? n = "其他书签" : (t.id === "mobile" || t.id === "3") && (n = "移动设备书签"));
    const a = s ? o : o ? `${o} / ${n}` : n;
    !t.url && !s && r.push({
      id: String(t.id),
      title: n || "未命名文件夹",
      path: a || n || "书签文件夹"
    });
    for (const i of t.children || [])
      i.url || this.collectBookmarkFolders(i, a, r);
    return r;
  }
  /**
   * 历史兼容存根：Native Host 已在 v1.0.2 彻底移除。
   * 此方法仅保留为类型安全存根，不再发起任何底层原生进程连接。
   */
  async callNativeHost(t) {
    if (t.command !== "git-check-update" && t.command !== "git-apply-update")
      return { ok: !1, error: "设置服务不允许此原生命令；未发送请求" };
    const o = await q();
    return t.command === "git-check-update" ? U(o) : o;
  }
  /** Shared, lossless backup selection; transport limits are checked by the uploader. */
  extractSyncPayload(t) {
    return K(t);
  }
}
const oe = p.getInstance(), ce = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  AVAILABLE_SHORTCUT_TOOLS: M,
  CUSTOM_AVATAR_STORAGE_KEY: C,
  GLOBAL_SETTINGS_KEYS: B,
  OptionsService: p,
  SEARCH_IGNORED_BOOKMARK_FOLDERS_STORAGE_KEY: O,
  SHORTCUT_STORAGE_KEY: k,
  SYNC_WHITELIST_KEYS: m,
  optionsService: oe
}, Symbol.toStringTag, { value: "Module" }));
export {
  B as G,
  u as S,
  ie as a,
  m as b,
  ae as c,
  k as d,
  K as e,
  O as f,
  ce as g,
  j as i,
  oe as o,
  $ as p,
  se as r
};
