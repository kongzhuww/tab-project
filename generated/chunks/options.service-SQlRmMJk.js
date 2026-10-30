import { N as d, P as _, O as I } from "./search.service-BaF_8M5R.js";
import { A as M } from "./window-manager.store-DgNn9Rtk.js";
const b = (t, e) => Object.prototype.hasOwnProperty.call(t, e), G = () => {
  throw new Error("其他页面已修改同一条配置，未覆盖；本页草稿保留。可重读设置后重新编辑。");
};
function T(t) {
  if (t === void 0) return {};
  if (!t || typeof t != "object" || Array.isArray(t))
    throw new Error("快捷键配置格式异常，未覆盖已有数据");
  return t;
}
function v(t, e, o) {
  return b(t, o) === b(e, o) && (!b(t, o) || d(t[o], e[o]));
}
function D(t, e, o) {
  const r = T(t), i = T(e), n = T(o), a = Object.assign(/* @__PURE__ */ Object.create(null), n);
  for (const s of /* @__PURE__ */ new Set([...Object.keys(r), ...Object.keys(i)]))
    if (!v(r, i, s)) {
      if (b(i, s) && typeof i[s] != "string")
        throw new Error("待保存的快捷键格式异常，未提交修改");
      !v(n, r, s) && !v(n, i, s) && G(), b(i, s) ? a[s] = i[s] : delete a[s];
    }
  return a;
}
function j(t) {
  if (!t || typeof t != "object" || Array.isArray(t)) return;
  const e = t.id;
  if (typeof e == "string" && e.length) return e;
  if (typeof e == "number" && Number.isFinite(e)) return String(e);
}
function R(t) {
  if (t === void 0) return [];
  if (!Array.isArray(t)) throw new Error("书签过滤配置格式异常，未覆盖已有数据");
  return t;
}
function V(t) {
  const e = /* @__PURE__ */ new Map();
  for (const o of t) {
    const r = j(o);
    if (r !== void 0) {
      if (e.has(r)) throw new Error("书签过滤中存在重复 ID，未静默去重或覆盖；请先核对已有配置");
      e.set(r, o);
    }
  }
  return e;
}
function N(t, e, o) {
  return t.has(o) === e.has(o) && (!t.has(o) || d(t.get(o), e.get(o)));
}
function Y(t, e, o) {
  const r = R(t), i = R(e), n = R(o), a = (l) => l.filter((f) => j(f) === void 0);
  if (!d(a(r), a(i)))
    throw new Error("本页不支持修改旧格式过滤规则，未覆盖已有数据");
  const s = V(r), h = V(i), S = V(n), g = [...n];
  for (const l of /* @__PURE__ */ new Set([...s.keys(), ...h.keys()])) {
    if (N(s, h, l)) continue;
    !N(S, s, l) && !N(S, h, l) && G();
    const f = g.findIndex((y) => j(y) === l);
    h.has(l) ? f !== -1 ? g[f] = h.get(l) : g.push(h.get(l)) : f !== -1 && g.splice(f, 1);
  }
  return g;
}
function q(t, e = 95e3) {
  return Promise.resolve({ ok: !1, error: "Native Messaging 已停用；扩展已升级为纯前端模式" });
}
function U(t) {
  if (!t.ok) return { ok: !1, error: t.error };
  const e = { ok: !1, error: "Git 更新状态格式未确认；未应用更新" };
  if (typeof t.hasUpdate != "boolean") return e;
  for (const o of ["localCommit", "commitDesc", "latestCommitTitle", "log", "warning"])
    if (t[o] !== void 0 && typeof t[o] != "string") return e;
  for (const o of ["behindCount", "aheadCount", "commitsBehind"]) {
    const r = t[o];
    if (r !== void 0 && (typeof r != "number" || !Number.isSafeInteger(r) || r < 0)) return e;
  }
  return { ...t, hasUpdate: t.hasUpdate };
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
function w(t) {
  if (!t || typeof t != "object" || Array.isArray(t)) return !1;
  const e = Object.getPrototypeOf(t);
  return e === Object.prototype || e === null;
}
function H(t) {
  if (/^(?:https?|wss?):\/\//i.test(t.trim()))
    try {
      new URL(t.trim());
    } catch {
      throw new u("备份包含无效链接，请先修正；没有删除或截断数据");
    }
}
function O(t, e = 0) {
  if (e > 40) throw new u("备份数据嵌套过深或存在循环引用");
  if (typeof t == "string") {
    H(t);
    return;
  }
  if (!(t === null || typeof t == "boolean") && !(typeof t == "number" && Number.isFinite(t))) {
    if (Array.isArray(t)) {
      t.forEach((o) => O(o, e + 1));
      return;
    }
    if (w(t)) {
      for (const [o, r] of Object.entries(t)) {
        if (["__proto__", "prototype", "constructor"].includes(o))
          throw new u("备份包含不安全的对象字段");
        O(r, e + 1);
      }
      return;
    }
    throw new u("备份包含无法完整保存为 JSON 的数据");
  }
}
function W(t, e) {
  const o = () => {
    throw new u(`配置项 ${t} 格式无效，操作已取消`);
  };
  if (["foGroups", "launcherGroups", "ghUsed"].includes(t) ? !Array.isArray(e) && !w(e) && o() : z.has(t) ? typeof e != "boolean" && o() : J.has(t) ? Array.isArray(e) || o() : x.has(t) ? w(e) || o() : typeof e != "string" && typeof e != "number" && typeof e != "boolean" && o(), t === "quickLinks" && Array.isArray(e))
    for (const r of e)
      (!w(r) || typeof r.url != "string" || !r.url.trim()) && o(), typeof r.title != "string" && (r.title = r.url);
  t === "launcherPages" && Array.isArray(e) && !e.every((r) => typeof r == "string") && o(), ["customShortcuts", "launcherPageLabels", "quickLinkGroupSizes"].includes(t) && w(e) && !Object.values(e).every((r) => typeof r == "string" || typeof r == "number" || typeof r == "boolean") && o(), O(e);
}
function F(t, e) {
  if (!w(t)) throw new u("备份配置必须是对象，操作已取消");
  const o = {};
  for (const i of e) {
    if (!Object.hasOwn(t, i) || t[i] === void 0) continue;
    O(t[i]);
    const n = JSON.parse(JSON.stringify(t[i]));
    W(i, n), o[i] = n;
  }
  const r = JSON.stringify(o);
  return {
    sanitized: JSON.parse(r),
    count: Object.keys(o).length,
    byteLength: new TextEncoder().encode(r).length
  };
}
function $(t, e) {
  if (!w(t)) throw new u("云端备份格式无效，未写入本地数据");
  if (Object.hasOwn(t, "formatVersion") && t.formatVersion !== 1 && t.formatVersion !== P)
    throw new u("不支持此备份版本，请先更新插件；未写入本地数据");
  if (t.formatVersion === P && (t.backupKind !== "preferences" || t.credentialsIncluded !== !1 || !w(t.settings)))
    throw new u("备份范围标记无效，未写入本地数据");
  const o = F(Object.hasOwn(t, "settings") ? t.settings : t, e);
  if (!o.count) throw new u("云端备份中未包含有效的设置数据");
  return {
    ...o,
    clientDevice: ["Windows", "macOS", "PC"].includes(String(t.clientDevice)) ? String(t.clientDevice) : "其他设备"
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
function K(t) {
  return F(t, m);
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
async function ie() {
  if (typeof chrome < "u" && chrome.storage?.local) {
    const e = await new Promise((o, r) => {
      chrome.storage.local.get(m, (i) => {
        const n = chrome.runtime.lastError;
        n ? r(new Error(n.message || "读取本地配置失败")) : o(i || {});
      });
    });
    if (typeof localStorage < "u") {
      const o = ["lw_private_chat_v1", "ghUser", "ghToken", "todoistToken", "googleCalendarSessionTokenV1", "lw_webdav_config", "biliRadioSeriesV1"];
      for (const r of o)
        if (e[r] === void 0) {
          const i = localStorage.getItem(r) ?? (r === "biliRadioSeriesV1" ? localStorage.getItem("lw_backup_bili_radio_series") : null);
          if (i !== null)
            try {
              e[r] = JSON.parse(i);
            } catch {
              e[r] = i;
            }
        }
      for (const r of E) {
        if (!m.includes(r)) continue;
        const i = e[r];
        if (i === void 0 || Array.isArray(i) && i.length === 0) {
          const a = localStorage.getItem(`logicweaver:${r}`) ?? localStorage.getItem(r);
          if (a)
            try {
              const s = JSON.parse(a);
              s !== void 0 && (!Array.isArray(s) || s.length > 0) && (e[r] = s);
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
    const o = (E.has(e) ? localStorage.getItem(`logicweaver:${e}`) : null) ?? localStorage.getItem(e);
    if (o !== null)
      try {
        t[e] = JSON.parse(o);
      } catch {
        t[e] = o;
      }
  }
  return t;
}
async function se(t) {
  const e = $(t, m), o = { ...e.sanitized };
  if (Object.hasOwn(o, "quickLinks") && (o.quickLinksReady = !0), typeof chrome < "u" && chrome.storage?.local) {
    if (await new Promise((r, i) => {
      chrome.storage.local.set(o, () => {
        const n = chrome.runtime.lastError;
        n ? i(new Error(n.message || "写入本地配置失败")) : r();
      });
    }), typeof localStorage < "u")
      for (const [r, i] of Object.entries(o))
        try {
          const n = JSON.stringify(i);
          E.has(r) && localStorage.setItem(`logicweaver:${r}`, n), localStorage.setItem(r, n);
        } catch {
        }
  } else {
    if (typeof localStorage > "u") throw new Error("本地存储不可用");
    const r = Object.entries(o).flatMap(([n, a]) => {
      const s = JSON.stringify(a);
      return E.has(n) ? [[n, s], [`logicweaver:${n}`, s]] : [[n, s]];
    }), i = new Map(r.map(([n]) => [n, localStorage.getItem(n)]));
    try {
      for (const [n, a] of r) localStorage.setItem(n, a);
    } catch {
      let n = !0;
      for (const [a, s] of i)
        try {
          s === null ? localStorage.removeItem(a) : localStorage.setItem(a, s);
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
  return { restoredCount: e.count, clientDevice: e.clientDevice };
}
function ae(t) {
  const e = typeof navigator > "u" ? "" : navigator.userAgent;
  return {
    formatVersion: P,
    clientDevice: /Macintosh|Mac OS X/i.test(e) ? "macOS" : /Windows/i.test(e) ? "Windows" : "PC",
    exportedAt: (/* @__PURE__ */ new Date()).toISOString(),
    backupKind: "preferences",
    credentialsIncluded: !1,
    settings: K(t).sanitized
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
], k = "customShortcuts", C = "customNewtabAvatar", A = "searchIgnoredBookmarkFolders";
class p {
  constructor() {
  }
  static getInstance() {
    return p.instance || (p.instance = new p()), p.instance;
  }
  /** Global settings are explicitly scoped; community sources can contain Tokens. */
  async loadGlobalSettings() {
    if (typeof chrome > "u" || !chrome.storage?.local) throw new Error("设置存储不可用，未读取配置");
    const e = await chrome.storage.local.get([
      ...B,
      k,
      C,
      A
    ]);
    return typeof localStorage < "u" && (e.showStartupAnimation !== void 0 && (localStorage.setItem("showStartupAnimation", e.showStartupAnimation ? "1" : "0"), localStorage.setItem("logicweaverEndfieldLoader", e.showStartupAnimation ? "1" : "0")), e.startupAnimationStyle && (localStorage.setItem("startupAnimationStyle", String(e.startupAnimationStyle)), localStorage.setItem("logicweaverStartupStyle", String(e.startupAnimationStyle)))), e;
  }
  /** Save only edited keys, rejecting stale drafts under a lock shared by new settings views. */
  async saveSettings(e, o) {
    if (typeof chrome > "u" || !chrome.storage?.local) throw new Error("设置存储不可用，未保存");
    const r = /* @__PURE__ */ new Set([
      ...B,
      k,
      C,
      A
    ]), i = Object.keys(e);
    if (i.some((l) => !r.has(l) || !Object.prototype.hasOwnProperty.call(o, l)))
      throw new Error("保存范围或草稿基线无效，未提交设置");
    if (!i.length) return {};
    if (typeof navigator > "u" || !navigator.locks?.request)
      throw new Error("当前环境不支持跨标签保存保护，未提交设置");
    const n = _(e), a = _(o), s = new AbortController(), h = Date.now() + 1e4, S = setTimeout(() => s.abort(), 1e4);
    let g = !1;
    try {
      return await navigator.locks.request("logicweaver:global-settings", { signal: s.signal }, async () => {
        const l = await chrome.storage.local.get(i);
        if (s.signal.aborted || Date.now() >= h)
          throw new Error("等待设置保存超时，未提交本次修改");
        const f = {};
        for (const c of i)
          if (c === k)
            f[c] = D(a[c], n[c], l[c]);
          else if (c === A)
            f[c] = Y(a[c], n[c], l[c]);
          else {
            if (!d(l[c], a[c]) && !d(l[c], n[c]))
              throw new Error("其他页面已修改同一项设置，未覆盖；本页草稿保留。可重读设置后重新编辑。");
            f[c] = n[c];
          }
        const y = {};
        for (const c of i)
          d(l[c], f[c]) || (y[c] = f[c]);
        if (Object.keys(y).length) {
          clearTimeout(S), g = !0, await chrome.storage.local.set(y);
          const c = await chrome.storage.local.get(i);
          if (i.some((L) => !d(c[L], f[L])))
            throw new Error("设置保存结果未确认，请重读核对；未自动重试");
        }
        try {
          Object.prototype.hasOwnProperty.call(n, "showStartupAnimation") && (localStorage.setItem("showStartupAnimation", n.showStartupAnimation ? "1" : "0"), localStorage.setItem("logicweaverEndfieldLoader", n.showStartupAnimation ? "1" : "0")), Object.prototype.hasOwnProperty.call(n, "startupAnimationStyle") && localStorage.setItem("startupAnimationStyle", n.startupAnimationStyle || "endfield"), Object.prototype.hasOwnProperty.call(n, "searchEngine") && (localStorage.setItem("searchEngine", n.searchEngine || "bing"), window.dispatchEvent(new CustomEvent("logicweaver:search-engine-updated", { detail: n.searchEngine })));
        } catch {
          throw new I("设置已保存，但开屏缓存未确认；请重读核对，未自动重试");
        }
        try {
          window.parent?.postMessage?.({ type: "newtab-options-saved" }, "*");
        } catch {
        }
        return _(f);
      });
    } catch (l) {
      throw l instanceof I ? l : g ? new I() : s.signal.aborted ? new Error("等待设置保存超时，未提交本次修改") : l;
    } finally {
      clearTimeout(S);
    }
  }
  /**
   * 收集书签树中的全部文件夹路径
   */
  collectBookmarkFolders(e, o = "", r = []) {
    if (!e) return r;
    const i = !e.parentId || e.id === "0";
    let n = e.title || "";
    n || (e.id === "1" ? n = "书签栏" : e.id === "2" ? n = "其他书签" : (e.id === "mobile" || e.id === "3") && (n = "移动设备书签"));
    const a = i ? o : o ? `${o} / ${n}` : n;
    !e.url && !i && r.push({
      id: String(e.id),
      title: n || "未命名文件夹",
      path: a || n || "书签文件夹"
    });
    for (const s of e.children || [])
      s.url || this.collectBookmarkFolders(s, a, r);
    return r;
  }
  /**
   * 历史兼容存根：Native Host 已在 v1.0.2 彻底移除。
   * 此方法仅保留为类型安全存根，不再发起任何底层原生进程连接。
   */
  async callNativeHost(e) {
    if (e.command !== "git-check-update" && e.command !== "git-apply-update")
      return { ok: !1, error: "设置服务不允许此原生命令；未发送请求" };
    const o = await q();
    return e.command === "git-check-update" ? U(o) : o;
  }
  /** Shared, lossless backup selection; transport limits are checked by the uploader. */
  extractSyncPayload(e) {
    return K(e);
  }
}
const oe = p.getInstance(), ce = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  AVAILABLE_SHORTCUT_TOOLS: M,
  CUSTOM_AVATAR_STORAGE_KEY: C,
  GLOBAL_SETTINGS_KEYS: B,
  OptionsService: p,
  SEARCH_IGNORED_BOOKMARK_FOLDERS_STORAGE_KEY: A,
  SHORTCUT_STORAGE_KEY: k,
  SYNC_WHITELIST_KEYS: m,
  optionsService: oe
}, Symbol.toStringTag, { value: "Module" }));
export {
  B as G,
  u as S,
  se as a,
  m as b,
  ae as c,
  k as d,
  K as e,
  A as f,
  ce as g,
  j as i,
  oe as o,
  $ as p,
  ie as r
};
