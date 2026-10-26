import { M as w, O as C, N } from "./search.service-Du6XfCKa.js";
import { A as H } from "./window-manager.store-Dfe7fisV.js";
const _ = (e, o) => Object.prototype.hasOwnProperty.call(e, o), x = () => {
  throw new Error("其他页面已修改同一条配置，未覆盖；本页草稿保留。可重读设置后重新编辑。");
};
function P(e) {
  if (e === void 0) return {};
  if (!e || typeof e != "object" || Array.isArray(e))
    throw new Error("快捷键配置格式异常，未覆盖已有数据");
  return e;
}
function R(e, o, t) {
  return _(e, t) === _(o, t) && (!_(e, t) || w(e[t], o[t]));
}
function J(e, o, t) {
  const r = P(e), s = P(o), i = P(t), a = Object.assign(/* @__PURE__ */ Object.create(null), i);
  for (const n of /* @__PURE__ */ new Set([...Object.keys(r), ...Object.keys(s)]))
    if (!R(r, s, n)) {
      if (_(s, n) && typeof s[n] != "string")
        throw new Error("待保存的快捷键格式异常，未提交修改");
      !R(i, r, n) && !R(i, s, n) && x(), _(s, n) ? a[n] = s[n] : delete a[n];
    }
  return a;
}
function M(e) {
  if (!e || typeof e != "object" || Array.isArray(e)) return;
  const o = e.id;
  if (typeof o == "string" && o.length) return o;
  if (typeof o == "number" && Number.isFinite(o)) return String(o);
}
function F(e) {
  if (e === void 0) return [];
  if (!Array.isArray(e)) throw new Error("书签过滤配置格式异常，未覆盖已有数据");
  return e;
}
function G(e) {
  const o = /* @__PURE__ */ new Map();
  for (const t of e) {
    const r = M(t);
    if (r !== void 0) {
      if (o.has(r)) throw new Error("书签过滤中存在重复 ID，未静默去重或覆盖；请先核对已有配置");
      o.set(r, t);
    }
  }
  return o;
}
function V(e, o, t) {
  return e.has(t) === o.has(t) && (!e.has(t) || w(e.get(t), o.get(t)));
}
function $(e, o, t) {
  const r = F(e), s = F(o), i = F(t), a = (u) => u.filter((c) => M(c) === void 0);
  if (!w(a(r), a(s)))
    throw new Error("本页不支持修改旧格式过滤规则，未覆盖已有数据");
  const n = G(r), f = G(s), p = G(i), g = [...i];
  for (const u of /* @__PURE__ */ new Set([...n.keys(), ...f.keys()])) {
    if (V(n, f, u)) continue;
    !V(p, n, u) && !V(p, f, u) && x();
    const c = g.findIndex((k) => M(k) === u);
    f.has(u) ? c !== -1 ? g[c] = f.get(u) : g.push(f.get(u)) : c !== -1 && g.splice(c, 1);
  }
  return g;
}
const y = (e, o) => Object.prototype.hasOwnProperty.call(e, o);
function T(e) {
  if (e === void 0) return {};
  if (!e || typeof e != "object" || Array.isArray(e))
    throw new Error("歌词配置格式异常，未覆盖已有数据");
  return e;
}
function X(e, o, t, r, s, i = []) {
  const a = T(e), n = T(o), f = T(t), p = T(r), g = Object.assign(/* @__PURE__ */ Object.create(null), p), u = new Set(i);
  if ([...u].some((c) => !y(s, c)))
    throw new Error("歌词字段修改范围无效，未提交修改");
  for (const c of /* @__PURE__ */ new Set([...Object.keys(n), ...Object.keys(f)]))
    if (!y(s, c) && (y(n, c) !== y(f, c) || !w(n[c], f[c])))
      throw new Error("未知歌词字段不由本面板编辑，未提交修改");
  for (const c of Object.keys(s)) {
    if (!y(n, c) || !y(f, c))
      throw new Error("歌词草稿基线不完整，未提交修改");
    if (w(n[c], f[c]) && !u.has(c)) continue;
    if (typeof f[c] != typeof s[c])
      throw new Error("待保存的歌词字段格式异常，草稿保留");
    const k = y(a, c) ? a[c] : s[c], E = y(p, c) ? p[c] : s[c];
    if (!w(E, k) && !w(E, f[c]))
      throw new Error("其他页面已修改同一歌词字段，未覆盖；本页草稿保留。可重读设置后重新编辑。");
    w(E, f[c]) || (g[c] = f[c]);
  }
  return g;
}
function Q(e, o = 95e3) {
  return Promise.resolve({ ok: !1, error: "Native Messaging 已停用；扩展已升级为纯前端模式" });
}
function Z(e) {
  if (!e.ok) return { ok: !1, error: e.error };
  const o = { ok: !1, error: "Git 更新状态格式未确认；未应用更新" };
  if (typeof e.hasUpdate != "boolean") return o;
  for (const t of ["localCommit", "commitDesc", "latestCommitTitle", "log", "warning"])
    if (e[t] !== void 0 && typeof e[t] != "string") return o;
  for (const t of ["behindCount", "aheadCount", "commitsBehind"]) {
    const r = e[t];
    if (r !== void 0 && (typeof r != "number" || !Number.isSafeInteger(r) || r < 0)) return o;
  }
  return { ...e, hasUpdate: e.hasUpdate };
}
const K = 2;
class d extends Error {
}
const ee = /* @__PURE__ */ new Set([
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
  "showHomeMusicVisualizer",
  "showLimbusLyricEffect"
]), oe = /* @__PURE__ */ new Set([
  "searchIgnoredBookmarkFolders",
  "wereadSortIds",
  "foGroups",
  "launcherGroups",
  "quickLinks",
  "launcherPages",
  "foCollapsedGroupsV1",
  "biliFollowingGroupsV1",
  "biliSubCustomChannelsV1",
  "ghCats",
  "ghUsed"
]), te = /* @__PURE__ */ new Set([
  "customShortcuts",
  "limbusLyricConfig",
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
function S(e) {
  if (!e || typeof e != "object" || Array.isArray(e)) return !1;
  const o = Object.getPrototypeOf(e);
  return o === Object.prototype || o === null;
}
function re(e) {
  if (/^(?:https?|wss?):\/\//i.test(e.trim()))
    try {
      new URL(e.trim());
    } catch {
      throw new d("备份包含无效链接，请先修正；没有删除或截断数据");
    }
}
function v(e, o = 0) {
  if (o > 40) throw new d("备份数据嵌套过深或存在循环引用");
  if (typeof e == "string") {
    re(e);
    return;
  }
  if (!(e === null || typeof e == "boolean") && !(typeof e == "number" && Number.isFinite(e))) {
    if (Array.isArray(e)) {
      e.forEach((t) => v(t, o + 1));
      return;
    }
    if (S(e)) {
      for (const [t, r] of Object.entries(e)) {
        if (["__proto__", "prototype", "constructor"].includes(t))
          throw new d("备份包含不安全的对象字段");
        v(r, o + 1);
      }
      return;
    }
    throw new d("备份包含无法完整保存为 JSON 的数据");
  }
}
function ne(e, o) {
  const t = () => {
    throw new d(`配置项 ${e} 格式无效，操作已取消`);
  };
  if (["foGroups", "launcherGroups", "ghUsed"].includes(e) ? !Array.isArray(o) && !S(o) && t() : ee.has(e) ? typeof o != "boolean" && t() : oe.has(e) ? Array.isArray(o) || t() : te.has(e) ? S(o) || t() : typeof o != "string" && typeof o != "number" && typeof o != "boolean" && t(), e === "quickLinks" && Array.isArray(o))
    for (const r of o)
      (!S(r) || typeof r.url != "string" || !r.url.trim()) && t(), typeof r.title != "string" && (r.title = r.url);
  e === "launcherPages" && Array.isArray(o) && !o.every((r) => typeof r == "string") && t(), ["customShortcuts", "launcherPageLabels", "quickLinkGroupSizes"].includes(e) && S(o) && !Object.values(o).every((r) => typeof r == "string" || typeof r == "number" || typeof r == "boolean") && t(), v(o);
}
function q(e, o) {
  if (!S(e)) throw new d("备份配置必须是对象，操作已取消");
  const t = {};
  for (const s of o) {
    if (!Object.hasOwn(e, s) || e[s] === void 0) continue;
    v(e[s]);
    const i = JSON.parse(JSON.stringify(e[s]));
    ne(s, i), t[s] = i;
  }
  const r = JSON.stringify(t);
  return {
    sanitized: JSON.parse(r),
    count: Object.keys(t).length,
    byteLength: new TextEncoder().encode(r).length
  };
}
function se(e, o) {
  if (!S(e)) throw new d("云端备份格式无效，未写入本地数据");
  if (Object.hasOwn(e, "formatVersion") && e.formatVersion !== 1 && e.formatVersion !== K)
    throw new d("不支持此备份版本，请先更新插件；未写入本地数据");
  if (e.formatVersion === K && (e.backupKind !== "preferences" || e.credentialsIncluded !== !1 || !S(e.settings)))
    throw new d("备份范围标记无效，未写入本地数据");
  const t = q(Object.hasOwn(e, "settings") ? e.settings : e, o);
  if (!t.count) throw new d("云端备份中未包含有效的设置数据");
  return {
    ...t,
    clientDevice: ["Windows", "macOS", "PC"].includes(String(e.clientDevice)) ? String(e.clientDevice) : "其他设备"
  };
}
const ie = [
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
  "showHomeMusicVisualizer",
  "showLimbusLyricEffect"
], ce = "customShortcuts", ae = "searchIgnoredBookmarkFolders", le = "limbusLyricConfig", fe = "customNewtabAvatar", ue = "customAvatar", A = [
  ...ie,
  ce,
  ae,
  le,
  "wereadSortIds",
  "foGroups",
  "foTree",
  "foCollapsedGroupsV1",
  "biliFollowingGroupsV1",
  "biliSubCustomChannelsV1",
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
  fe,
  ue
];
function z(e) {
  return q(e, A);
}
const j = /* @__PURE__ */ new Set([
  "quickLinks",
  "quickLinkGroupSizes",
  "launcherFolders",
  "launcherPages",
  "launcherPageLabels",
  "launcherActivePage",
  "quickLinksReady"
]);
async function pe() {
  if (typeof chrome < "u" && chrome.storage?.local) {
    const o = await new Promise((t, r) => {
      chrome.storage.local.get(A, (s) => {
        const i = chrome.runtime.lastError;
        i ? r(new Error(i.message || "读取本地配置失败")) : t(s || {});
      });
    });
    if (typeof localStorage < "u") {
      const t = ["lw_private_chat_v1", "ghUser", "ghToken", "todoistToken", "googleCalendarSessionTokenV1", "lw_webdav_config"];
      for (const r of t)
        if (o[r] === void 0) {
          const s = localStorage.getItem(r);
          if (s !== null)
            try {
              o[r] = JSON.parse(s);
            } catch {
              o[r] = s;
            }
        }
      for (const r of j) {
        if (!A.includes(r)) continue;
        const s = o[r];
        if (s === void 0 || Array.isArray(s) && s.length === 0) {
          const a = localStorage.getItem(`logicweaver:${r}`) ?? localStorage.getItem(r);
          if (a)
            try {
              const n = JSON.parse(a);
              n !== void 0 && (!Array.isArray(n) || n.length > 0) && (o[r] = n);
            } catch {
            }
        }
      }
    }
    return o;
  }
  if (typeof localStorage > "u") throw new Error("本地存储不可用");
  const e = {};
  for (const o of A) {
    const t = (j.has(o) ? localStorage.getItem(`logicweaver:${o}`) : null) ?? localStorage.getItem(o);
    if (t !== null)
      try {
        e[o] = JSON.parse(t);
      } catch {
        e[o] = t;
      }
  }
  return e;
}
async function me(e) {
  const o = se(e, A), t = { ...o.sanitized };
  if (Object.hasOwn(t, "quickLinks") && (t.quickLinksReady = !0), typeof chrome < "u" && chrome.storage?.local) {
    if (await new Promise((r, s) => {
      chrome.storage.local.set(t, () => {
        const i = chrome.runtime.lastError;
        i ? s(new Error(i.message || "写入本地配置失败")) : r();
      });
    }), typeof localStorage < "u")
      for (const [r, s] of Object.entries(t))
        try {
          const i = JSON.stringify(s);
          j.has(r) && localStorage.setItem(`logicweaver:${r}`, i), localStorage.setItem(r, i);
        } catch {
        }
  } else {
    if (typeof localStorage > "u") throw new Error("本地存储不可用");
    const r = Object.entries(t).flatMap(([i, a]) => {
      const n = JSON.stringify(a);
      return j.has(i) ? [[i, n], [`logicweaver:${i}`, n]] : [[i, n]];
    }), s = new Map(r.map(([i]) => [i, localStorage.getItem(i)]));
    try {
      for (const [i, a] of r) localStorage.setItem(i, a);
    } catch {
      let i = !0;
      for (const [a, n] of s)
        try {
          n === null ? localStorage.removeItem(a) : localStorage.setItem(a, n);
        } catch {
          i = !1;
        }
      throw new Error(i ? "恢复失败，已回滚本次写入；请检查本地存储空间" : "恢复失败且部分数据无法回滚，请勿继续编辑，先检查本地存储与备份");
    }
  }
  return { restoredCount: o.count, clientDevice: o.clientDevice };
}
function ye(e) {
  const o = typeof navigator > "u" ? "" : navigator.userAgent;
  return {
    formatVersion: K,
    clientDevice: /Macintosh|Mac OS X/i.test(o) ? "macOS" : /Windows/i.test(o) ? "Windows" : "PC",
    exportedAt: (/* @__PURE__ */ new Date()).toISOString(),
    backupKind: "preferences",
    credentialsIncluded: !1,
    settings: z(e).sanitized
  };
}
const D = [
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
], I = "customShortcuts", O = "limbusLyricConfig", U = "customNewtabAvatar", L = "searchIgnoredBookmarkFolders", W = {
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
}, he = {
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
class b {
  constructor() {
  }
  static getInstance() {
    return b.instance || (b.instance = new b()), b.instance;
  }
  /** Global settings are explicitly scoped; community sources can contain Tokens. */
  async loadGlobalSettings() {
    if (typeof chrome > "u" || !chrome.storage?.local) throw new Error("设置存储不可用，未读取配置");
    return chrome.storage.local.get([
      ...D,
      I,
      U,
      L,
      O
    ]);
  }
  /** Save only edited keys, rejecting stale drafts under a lock shared by new settings views. */
  async saveSettings(o, t, r, s = []) {
    if (typeof chrome > "u" || !chrome.storage?.local) throw new Error("设置存储不可用，未保存");
    const i = /* @__PURE__ */ new Set([
      ...D,
      I,
      U,
      L,
      O
    ]), a = Object.keys(o);
    if (a.some((h) => !i.has(h) || !Object.prototype.hasOwnProperty.call(t, h)))
      throw new Error("保存范围或草稿基线无效，未提交设置");
    if (!a.length) return {};
    if (a.includes(O) && (!r || !Object.prototype.hasOwnProperty.call(r, O)))
      throw new Error("歌词草稿基线缺失，未提交设置");
    if (typeof navigator > "u" || !navigator.locks?.request)
      throw new Error("当前环境不支持跨标签保存保护，未提交设置");
    const n = C(o), f = C(t), p = C(r || {}), g = [...s], u = new AbortController(), c = Date.now() + 1e4, k = setTimeout(() => u.abort(), 1e4);
    let E = !1;
    try {
      return await navigator.locks.request("logicweaver:global-settings", { signal: u.signal }, async () => {
        const h = await chrome.storage.local.get(a);
        if (u.signal.aborted || Date.now() >= c)
          throw new Error("等待设置保存超时，未提交本次修改");
        const m = {};
        for (const l of a)
          if (l === I)
            m[l] = J(f[l], n[l], h[l]);
          else if (l === L)
            m[l] = $(f[l], n[l], h[l]);
          else if (l === O)
            m[l] = X(
              f[l],
              p[l],
              n[l],
              h[l],
              { ...W },
              g
            );
          else {
            if (!w(h[l], f[l]) && !w(h[l], n[l]))
              throw new Error("其他页面已修改同一项设置，未覆盖；本页草稿保留。可重读设置后重新编辑。");
            m[l] = n[l];
          }
        const B = {};
        for (const l of a)
          w(h[l], m[l]) || (B[l] = m[l]);
        if (Object.keys(B).length) {
          clearTimeout(k), E = !0, await chrome.storage.local.set(B);
          const l = await chrome.storage.local.get(a);
          if (a.some((Y) => !w(l[Y], m[Y])))
            throw new Error("设置保存结果未确认，请重读核对；未自动重试");
        }
        try {
          Object.prototype.hasOwnProperty.call(n, "showStartupAnimation") && (localStorage.setItem("showStartupAnimation", n.showStartupAnimation ? "1" : "0"), localStorage.setItem("logicweaverEndfieldLoader", n.showStartupAnimation ? "1" : "0")), Object.prototype.hasOwnProperty.call(n, "startupAnimationStyle") && localStorage.setItem("startupAnimationStyle", n.startupAnimationStyle || "endfield"), Object.prototype.hasOwnProperty.call(n, "searchEngine") && (localStorage.setItem("searchEngine", n.searchEngine || "bing"), window.dispatchEvent(new CustomEvent("logicweaver:search-engine-updated", { detail: n.searchEngine })));
        } catch {
          throw new N("设置已保存，但开屏缓存未确认；请重读核对，未自动重试");
        }
        try {
          window.parent?.postMessage?.({ type: "newtab-options-saved" }, "*");
        } catch {
        }
        return C(m);
      });
    } catch (h) {
      throw h instanceof N ? h : E ? new N() : u.signal.aborted ? new Error("等待设置保存超时，未提交本次修改") : h;
    } finally {
      clearTimeout(k);
    }
  }
  /**
   * 收集书签树中的全部文件夹路径
   */
  collectBookmarkFolders(o, t = "", r = []) {
    if (!o) return r;
    const s = !o.parentId || o.id === "0";
    let i = o.title || "";
    i || (o.id === "1" ? i = "书签栏" : o.id === "2" ? i = "其他书签" : (o.id === "mobile" || o.id === "3") && (i = "移动设备书签"));
    const a = s ? t : t ? `${t} / ${i}` : i;
    !o.url && !s && r.push({
      id: String(o.id),
      title: i || "未命名文件夹",
      path: a || i || "书签文件夹"
    });
    for (const n of o.children || [])
      n.url || this.collectBookmarkFolders(n, a, r);
    return r;
  }
  /**
   * 调用 Native Messaging 桥接服务
   */
  async callNativeHost(o) {
    if (o.command !== "git-check-update" && o.command !== "git-apply-update")
      return { ok: !1, error: "设置服务不允许此原生命令；未发送请求" };
    const t = await Q();
    return o.command === "git-check-update" ? Z(t) : t;
  }
  /** Shared, lossless backup selection; transport limits are checked by the uploader. */
  extractSyncPayload(o) {
    return z(o);
  }
}
const we = b.getInstance(), Se = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  AVAILABLE_SHORTCUT_TOOLS: H,
  CUSTOM_AVATAR_STORAGE_KEY: U,
  DEFAULT_LIMBUS_CONFIG: W,
  GLOBAL_SETTINGS_KEYS: D,
  LIMBUS_PRESETS: he,
  LIMBUS_STORAGE_KEY: O,
  OptionsService: b,
  SEARCH_IGNORED_BOOKMARK_FOLDERS_STORAGE_KEY: L,
  SHORTCUT_STORAGE_KEY: I,
  SYNC_WHITELIST_KEYS: A,
  optionsService: we
}, Symbol.toStringTag, { value: "Module" }));
export {
  W as D,
  D as G,
  he as L,
  d as S,
  me as a,
  A as b,
  ye as c,
  O as d,
  z as e,
  I as f,
  L as g,
  Se as h,
  M as i,
  we as o,
  se as p,
  pe as r
};
