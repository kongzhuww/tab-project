class i extends Error {
}
const d = /* @__PURE__ */ new Set([
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
]), S = /* @__PURE__ */ new Set([
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
]), m = /* @__PURE__ */ new Set([
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
function l(o) {
  if (!o || typeof o != "object" || Array.isArray(o)) return !1;
  const e = Object.getPrototypeOf(o);
  return e === Object.prototype || e === null;
}
function k(o) {
  if (/^(?:https?|wss?):\/\//i.test(o.trim()))
    try {
      new URL(o.trim());
    } catch {
      throw new i("备份包含无效链接，请先修正；没有删除或截断数据");
    }
}
function g(o, e = 0) {
  if (e > 40) throw new i("备份数据嵌套过深或存在循环引用");
  if (typeof o == "string") {
    k(o);
    return;
  }
  if (!(o === null || typeof o == "boolean") && !(typeof o == "number" && Number.isFinite(o))) {
    if (Array.isArray(o)) {
      o.forEach((r) => g(r, e + 1));
      return;
    }
    if (l(o)) {
      for (const [r, t] of Object.entries(o)) {
        if (["__proto__", "prototype", "constructor"].includes(r))
          throw new i("备份包含不安全的对象字段");
        g(t, e + 1);
      }
      return;
    }
    throw new i("备份包含无法完整保存为 JSON 的数据");
  }
}
function O(o, e) {
  const r = () => {
    throw new i(`配置项 ${o} 格式无效，操作已取消`);
  };
  if (["foGroups", "launcherGroups", "ghUsed"].includes(o) ? !Array.isArray(e) && !l(e) && r() : d.has(o) ? typeof e != "boolean" && r() : S.has(o) ? Array.isArray(e) || r() : m.has(o) ? l(e) || r() : typeof e != "string" && typeof e != "number" && typeof e != "boolean" && r(), o === "quickLinks" && Array.isArray(e))
    for (const t of e)
      (!l(t) || typeof t.url != "string" || !t.url.trim()) && r(), typeof t.title != "string" && (t.title = t.url);
  o === "launcherPages" && Array.isArray(e) && !e.every((t) => typeof t == "string") && r(), ["customShortcuts", "launcherPageLabels", "quickLinkGroupSizes"].includes(o) && l(e) && !Object.values(e).every((t) => typeof t == "string" || typeof t == "number" || typeof t == "boolean") && r(), g(e);
}
function w(o, e) {
  if (!l(o)) throw new i("备份配置必须是对象，操作已取消");
  const r = {};
  for (const s of e) {
    if (!Object.hasOwn(o, s) || o[s] === void 0) continue;
    g(o[s]);
    const n = JSON.parse(JSON.stringify(o[s]));
    O(s, n), r[s] = n;
  }
  const t = JSON.stringify(r);
  return {
    sanitized: JSON.parse(t),
    count: Object.keys(r).length,
    byteLength: new TextEncoder().encode(t).length
  };
}
function A(o, e) {
  if (!l(o)) throw new i("云端备份格式无效，未写入本地数据");
  if (Object.hasOwn(o, "formatVersion") && o.formatVersion !== 1 && o.formatVersion !== 2)
    throw new i("不支持此备份版本，请先更新插件；未写入本地数据");
  if (o.formatVersion === 2 && (o.backupKind !== "preferences" || o.credentialsIncluded !== !1 || !l(o.settings)))
    throw new i("备份范围标记无效，未写入本地数据");
  const r = w(Object.hasOwn(o, "settings") ? o.settings : o, e);
  if (!r.count) throw new i("云端备份中未包含有效的设置数据");
  return {
    ...r,
    clientDevice: ["Windows", "macOS", "PC"].includes(String(o.clientDevice)) ? String(o.clientDevice) : "其他设备"
  };
}
function b(o, e = 95e3) {
  return Promise.resolve({ ok: !1, error: "Native Messaging 已停用；扩展已升级为纯前端模式" });
}
function _(o) {
  return o !== null && typeof o == "object" && !Array.isArray(o) ? o : null;
}
const E = [
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
], N = "customShortcuts", L = "searchIgnoredBookmarkFolders", R = "limbusLyricConfig", T = "customNewtabAvatar", C = "customAvatar", u = [
  ...E,
  N,
  L,
  R,
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
  T,
  C
];
function y(o) {
  return w(o, u);
}
const h = /* @__PURE__ */ new Set([
  "quickLinks",
  "quickLinkGroupSizes",
  "launcherFolders",
  "launcherPages",
  "launcherPageLabels",
  "launcherActivePage",
  "quickLinksReady"
]);
async function p() {
  if (typeof chrome < "u" && chrome.storage?.local) {
    const e = await new Promise((r, t) => {
      chrome.storage.local.get(u, (s) => {
        const n = chrome.runtime.lastError;
        n ? t(new Error(n.message || "读取本地配置失败")) : r(s || {});
      });
    });
    if (typeof localStorage < "u") {
      const r = ["lw_private_chat_v1", "ghUser", "ghToken", "todoistToken", "googleCalendarSessionTokenV1", "lw_webdav_config"];
      for (const t of r)
        if (e[t] === void 0) {
          const s = localStorage.getItem(t);
          if (s !== null)
            try {
              e[t] = JSON.parse(s);
            } catch {
              e[t] = s;
            }
        }
      for (const t of h) {
        if (!u.includes(t)) continue;
        const s = e[t];
        if (s === void 0 || Array.isArray(s) && s.length === 0) {
          const a = localStorage.getItem(`logicweaver:${t}`) ?? localStorage.getItem(t);
          if (a)
            try {
              const c = JSON.parse(a);
              c !== void 0 && (!Array.isArray(c) || c.length > 0) && (e[t] = c);
            } catch {
            }
        }
      }
    }
    return e;
  }
  if (typeof localStorage > "u") throw new Error("本地存储不可用");
  const o = {};
  for (const e of u) {
    const r = (h.has(e) ? localStorage.getItem(`logicweaver:${e}`) : null) ?? localStorage.getItem(e);
    if (r !== null)
      try {
        o[e] = JSON.parse(r);
      } catch {
        o[e] = r;
      }
  }
  return o;
}
async function I(o) {
  const e = A(o, u), r = { ...e.sanitized };
  if (Object.hasOwn(r, "quickLinks") && (r.quickLinksReady = !0), typeof chrome < "u" && chrome.storage?.local) {
    if (await new Promise((t, s) => {
      chrome.storage.local.set(r, () => {
        const n = chrome.runtime.lastError;
        n ? s(new Error(n.message || "写入本地配置失败")) : t();
      });
    }), typeof localStorage < "u")
      for (const [t, s] of Object.entries(r))
        try {
          const n = JSON.stringify(s);
          h.has(t) && localStorage.setItem(`logicweaver:${t}`, n), localStorage.setItem(t, n);
        } catch {
        }
  } else {
    if (typeof localStorage > "u") throw new Error("本地存储不可用");
    const t = Object.entries(r).flatMap(([n, a]) => {
      const c = JSON.stringify(a);
      return h.has(n) ? [[n, c], [`logicweaver:${n}`, c]] : [[n, c]];
    }), s = new Map(t.map(([n]) => [n, localStorage.getItem(n)]));
    try {
      for (const [n, a] of t) localStorage.setItem(n, a);
    } catch {
      let n = !0;
      for (const [a, c] of s)
        try {
          c === null ? localStorage.removeItem(a) : localStorage.setItem(a, c);
        } catch {
          n = !1;
        }
      throw new Error(n ? "恢复失败，已回滚本次写入；请检查本地存储空间" : "恢复失败且部分数据无法回滚，请勿继续编辑，先检查本地存储与备份");
    }
  }
  return { restoredCount: e.count, clientDevice: e.clientDevice };
}
function v(o) {
  const e = typeof navigator > "u" ? "" : navigator.userAgent;
  return {
    formatVersion: 2,
    clientDevice: /Macintosh|Mac OS X/i.test(e) ? "macOS" : /Windows/i.test(e) ? "Windows" : "PC",
    exportedAt: (/* @__PURE__ */ new Date()).toISOString(),
    backupKind: "preferences",
    credentialsIncluded: !1,
    settings: y(o).sanitized
  };
}
class f {
  constructor() {
    this.configOperationRunning = !1;
  }
  static getInstance() {
    return f.instance || (f.instance = new f()), f.instance;
  }
  async callNativeHost(e) {
    return e.command !== "logicweaver-sync-get" && e.command !== "logicweaver-sync-put" ? { ok: !1, error: "同步服务不允许此原生命令；未发送请求" } : b();
  }
  /** Compatibility entry point; now intentionally reads only whitelisted settings. */
  async getAllLocalStorage() {
    return p();
  }
  async pushConfig() {
    if (this.configOperationRunning) return { ok: !1, errorKind: "operation", error: "备份或恢复正在进行；未重复提交" };
    this.configOperationRunning = !0;
    try {
      const { sanitized: e, count: r } = y(await p());
      if (!r) return { ok: !1, errorKind: "policy", error: "未检测到有效的普通备份配置项" };
      const s = { command: "logicweaver-sync-put", key: "ui.settings", value: v(e) }, n = new TextEncoder().encode(JSON.stringify(s)).length;
      if (n > 59392)
        return { ok: !1, errorKind: "policy", byteLength: n, error: `完整备份为 ${(n / 1024).toFixed(1)} KB，超过原生云同步的 58 KB 安全预算。未上传、未截断数据；请改用 WebDAV 完整备份。` };
      const a = await this.callNativeHost(s);
      return a.ok === !0 && a.cloudSynced === !1 ? { ok: !1, errorKind: "operation", error: "宿主仅保存本地快照，云端备份未确认；未自动重试" } : a.ok === !0 ? { ok: !0, count: r, byteLength: n } : { ok: !1, errorKind: "operation", error: "备份结果未确认，请核对云端状态；未自动重试" };
    } catch (e) {
      return { ok: !1, errorKind: e instanceof i ? "policy" : "operation", error: e instanceof i ? e.message : "备份过程中发生异常，结果未确认；未自动重试" };
    } finally {
      this.configOperationRunning = !1;
    }
  }
  async pullConfig() {
    if (this.configOperationRunning) return { ok: !1, errorKind: "operation", error: "备份或恢复正在进行；未重复提交" };
    this.configOperationRunning = !0;
    try {
      const e = await this.callNativeHost({ command: "logicweaver-sync-get", key: "ui.settings" });
      if (e?.ok && e.found === !1)
        return { ok: !1, found: !1, error: "云端暂无备份配置，请先在另一台电脑上备份" };
      const r = _(e.data);
      return e.ok === !0 && r && Object.hasOwn(r, "value") ? { ok: !0, ...await I(r.value) } : { ok: !1, errorKind: "operation", error: "云端未返回有效配置" };
    } catch (e) {
      return { ok: !1, errorKind: e instanceof i ? "policy" : "operation", error: e instanceof i ? e.message : "恢复过程中发生异常，请检查实际写入结果；未自动重试" };
    } finally {
      this.configOperationRunning = !1;
    }
  }
}
const V = f.getInstance();
export {
  i as S,
  I as a,
  u as b,
  v as c,
  b as d,
  y as e,
  A as p,
  p as r,
  V as s
};
