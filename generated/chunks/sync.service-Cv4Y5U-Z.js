class i extends Error {
}
const S = /* @__PURE__ */ new Set([
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
]), m = /* @__PURE__ */ new Set([
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
]), k = /* @__PURE__ */ new Set([
  "customShortcuts",
  "limbusLyricConfig",
  "launcherFolders",
  "quickLinkGroupSizes",
  "launcherPageLabels",
  "launcherFolderPositionV1",
  "foTree",
  "ghMap",
  "ghRepoRemarksV1"
]);
function c(r) {
  if (!r || typeof r != "object" || Array.isArray(r)) return !1;
  const e = Object.getPrototypeOf(r);
  return e === Object.prototype || e === null;
}
function w(r) {
  return /(?:token|password|passwd|secret|cookie|apikey|authorization|credentials?|signature|privatekey|secretkey|sessionid|jwt|bearer)$/.test(r.toLowerCase().replace(/[^a-z0-9]/g, ""));
}
function O(r) {
  if (!/^(?:https?|wss?):\/\//i.test(r.trim())) return;
  let e;
  try {
    e = new URL(r.trim());
  } catch {
    throw new i("备份包含无效链接，请先修正；没有删除或截断数据");
  }
  if (e.username || e.password || [...e.searchParams.keys()].some((t) => w(t) || ["key", "auth", "code", "sig", "sign", "session", "sessionid"].includes(t.toLowerCase())))
    throw new i("备份链接含内嵌认证信息，请先移除敏感链接；没有上传或写入");
  if ([...new URLSearchParams(e.hash.slice(1)).keys()].some((t) => w(t) || ["key", "auth", "code", "sig", "session", "sessionid"].includes(t.toLowerCase())))
    throw new i("备份链接片段含认证信息，操作已取消");
}
function g(r, e = 0) {
  if (e > 40) throw new i("备份数据嵌套过深或存在循环引用");
  if (typeof r == "string") {
    O(r);
    return;
  }
  if (!(r === null || typeof r == "boolean") && !(typeof r == "number" && Number.isFinite(r))) {
    if (Array.isArray(r)) {
      r.forEach((o) => g(o, e + 1));
      return;
    }
    if (c(r)) {
      for (const [o, t] of Object.entries(r)) {
        if (["__proto__", "prototype", "constructor"].includes(o))
          throw new i("备份包含不安全的对象字段");
        if (w(o)) throw new i("普通备份包含嵌套凭据字段，操作已取消；请在所属模块单独管理");
        g(t, e + 1);
      }
      return;
    }
    throw new i("备份包含无法完整保存为 JSON 的数据");
  }
}
function A(r, e) {
  const o = () => {
    throw new i(`配置项 ${r} 格式无效，操作已取消`);
  };
  if (["foGroups", "launcherGroups", "ghUsed"].includes(r) ? !Array.isArray(e) && !c(e) && o() : S.has(r) ? typeof e != "boolean" && o() : m.has(r) ? Array.isArray(e) || o() : k.has(r) ? c(e) || o() : typeof e != "string" && typeof e != "number" && typeof e != "boolean" && o(), r === "quickLinks" && Array.isArray(e))
    for (const t of e)
      (!c(t) || typeof t.url != "string" || !t.url.trim()) && o(), typeof t.title != "string" && (t.title = t.url);
  r === "launcherPages" && Array.isArray(e) && !e.every((t) => typeof t == "string") && o(), ["customShortcuts", "launcherPageLabels", "quickLinkGroupSizes"].includes(r) && c(e) && !Object.values(e).every((t) => typeof t == "string" || typeof t == "number" || typeof t == "boolean") && o(), g(e);
}
function y(r, e) {
  if (!c(r)) throw new i("备份配置必须是对象，操作已取消");
  const o = {};
  for (const s of e) {
    if (!Object.hasOwn(r, s) || r[s] === void 0) continue;
    g(r[s]);
    const n = JSON.parse(JSON.stringify(r[s]));
    A(s, n), o[s] = n;
  }
  const t = JSON.stringify(o);
  return {
    sanitized: JSON.parse(t),
    count: Object.keys(o).length,
    byteLength: new TextEncoder().encode(t).length
  };
}
function b(r, e) {
  if (!c(r)) throw new i("云端备份格式无效，未写入本地数据");
  if (Object.hasOwn(r, "formatVersion") && r.formatVersion !== 1 && r.formatVersion !== 2)
    throw new i("不支持此备份版本，请先更新插件；未写入本地数据");
  if (r.formatVersion === 2 && (r.backupKind !== "preferences" || r.credentialsIncluded !== !1 || !c(r.settings)))
    throw new i("备份范围标记无效，未写入本地数据");
  const o = y(Object.hasOwn(r, "settings") ? r.settings : r, e);
  if (!o.count) throw new i("云端备份中未包含有效的设置数据");
  return {
    ...o,
    clientDevice: ["Windows", "macOS", "PC"].includes(String(r.clientDevice)) ? String(r.clientDevice) : "其他设备"
  };
}
function E(r, e = 95e3) {
  return Promise.resolve({ ok: !1, error: "Native Messaging 已停用；扩展已升级为纯前端模式" });
}
function L(r) {
  return r !== null && typeof r == "object" && !Array.isArray(r) ? r : null;
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
  "singleNewTab",
  "showHomeMusicVisualizer",
  "showLimbusLyricEffect"
], R = "customShortcuts", _ = "searchIgnoredBookmarkFolders", C = "limbusLyricConfig", I = "customNewtabAvatar", K = "customAvatar", u = [
  ...N,
  R,
  _,
  C,
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
  "todoistActiveProjectIdV1",
  "launcherGroups",
  "launcherFolders",
  "quickLinks",
  "quickLinkGroupSizes",
  "launcherPages",
  "launcherPageLabels",
  "launcherActivePage",
  "launcherFolderPositionV1",
  I,
  K
];
function d(r) {
  return y(r, u);
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
    const e = await new Promise((o, t) => {
      chrome.storage.local.get(u, (s) => {
        const n = chrome.runtime.lastError;
        n ? t(new Error(n.message || "读取本地配置失败")) : o(s || {});
      });
    });
    if (typeof localStorage < "u")
      for (const o of h) {
        if (!u.includes(o)) continue;
        const t = e[o];
        if (t === void 0 || Array.isArray(t) && t.length === 0) {
          const n = localStorage.getItem(`logicweaver:${o}`) ?? localStorage.getItem(o);
          if (n)
            try {
              const a = JSON.parse(n);
              a !== void 0 && (!Array.isArray(a) || a.length > 0) && (e[o] = a);
            } catch {
            }
        }
      }
    return e;
  }
  if (typeof localStorage > "u") throw new Error("本地存储不可用");
  const r = {};
  for (const e of u) {
    const o = (h.has(e) ? localStorage.getItem(`logicweaver:${e}`) : null) ?? localStorage.getItem(e);
    if (o !== null)
      try {
        r[e] = JSON.parse(o);
      } catch {
        r[e] = o;
      }
  }
  return r;
}
async function P(r) {
  const e = b(r, u), o = { ...e.sanitized };
  if (Object.hasOwn(o, "quickLinks") && (o.quickLinksReady = !0), typeof chrome < "u" && chrome.storage?.local) {
    if (await new Promise((t, s) => {
      chrome.storage.local.set(o, () => {
        const n = chrome.runtime.lastError;
        n ? s(new Error(n.message || "写入本地配置失败")) : t();
      });
    }), typeof localStorage < "u")
      for (const [t, s] of Object.entries(o))
        try {
          const n = JSON.stringify(s);
          h.has(t) && localStorage.setItem(`logicweaver:${t}`, n), localStorage.setItem(t, n);
        } catch {
        }
  } else {
    if (typeof localStorage > "u") throw new Error("本地存储不可用");
    const t = Object.entries(o).flatMap(([n, a]) => {
      const l = JSON.stringify(a);
      return h.has(n) ? [[n, l], [`logicweaver:${n}`, l]] : [[n, l]];
    }), s = new Map(t.map(([n]) => [n, localStorage.getItem(n)]));
    try {
      for (const [n, a] of t) localStorage.setItem(n, a);
    } catch {
      let n = !0;
      for (const [a, l] of s)
        try {
          l === null ? localStorage.removeItem(a) : localStorage.setItem(a, l);
        } catch {
          n = !1;
        }
      throw new Error(n ? "恢复失败，已回滚本次写入；请检查本地存储空间" : "恢复失败且部分数据无法回滚，请勿继续编辑，先检查本地存储与备份");
    }
  }
  return { restoredCount: e.count, clientDevice: e.clientDevice };
}
function T(r) {
  const e = typeof navigator > "u" ? "" : navigator.userAgent;
  return {
    formatVersion: 2,
    clientDevice: /Macintosh|Mac OS X/i.test(e) ? "macOS" : /Windows/i.test(e) ? "Windows" : "PC",
    exportedAt: (/* @__PURE__ */ new Date()).toISOString(),
    backupKind: "preferences",
    credentialsIncluded: !1,
    settings: d(r).sanitized
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
    return e.command !== "logicweaver-sync-get" && e.command !== "logicweaver-sync-put" ? { ok: !1, error: "同步服务不允许此原生命令；未发送请求" } : E();
  }
  /** Compatibility entry point; now intentionally reads only whitelisted settings. */
  async getAllLocalStorage() {
    return p();
  }
  async pushConfig() {
    if (this.configOperationRunning) return { ok: !1, errorKind: "operation", error: "备份或恢复正在进行；未重复提交" };
    this.configOperationRunning = !0;
    try {
      const { sanitized: e, count: o } = d(await p());
      if (!o) return { ok: !1, errorKind: "policy", error: "未检测到有效的普通备份配置项" };
      const s = { command: "logicweaver-sync-put", key: "ui.settings", value: T(e) }, n = new TextEncoder().encode(JSON.stringify(s)).length;
      if (n > 59392)
        return { ok: !1, errorKind: "policy", byteLength: n, error: `完整备份为 ${(n / 1024).toFixed(1)} KB，超过原生云同步的 58 KB 安全预算。未上传、未截断数据；请改用 WebDAV 完整备份。` };
      const a = await this.callNativeHost(s);
      return a.ok === !0 && a.cloudSynced === !1 ? { ok: !1, errorKind: "operation", error: "宿主仅保存本地快照，云端备份未确认；未自动重试" } : a.ok === !0 ? { ok: !0, count: o, byteLength: n } : { ok: !1, errorKind: "operation", error: "备份结果未确认，请核对云端状态；未自动重试" };
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
      const o = L(e.data);
      return e.ok === !0 && o && Object.hasOwn(o, "value") ? { ok: !0, ...await P(o.value) } : { ok: !1, errorKind: "operation", error: "云端未返回有效配置" };
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
  P as a,
  u as b,
  T as c,
  E as d,
  d as e,
  b as p,
  p as r,
  V as s
};
