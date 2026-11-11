import { P as v, T as x, Q as R } from "./search.service-B3RWjSnd.js";
import { A as X } from "./window-manager.store-BdI_8a-H.js";
const $ = (t, e) => Object.prototype.hasOwnProperty.call(t, e), Y = () => {
  throw new Error("其他页面已修改同一条配置，未覆盖；本页草稿保留。可重读设置后重新编辑。");
};
function P(t) {
  if (t === void 0) return {};
  if (!t || typeof t != "object" || Array.isArray(t))
    throw new Error("快捷键配置格式异常，未覆盖已有数据");
  return t;
}
function M(t, e, o) {
  return $(t, o) === $(e, o) && (!$(t, o) || v(t[o], e[o]));
}
function Z(t, e, o) {
  const r = P(t), s = P(e), n = P(o), c = Object.assign(/* @__PURE__ */ Object.create(null), n);
  for (const a of /* @__PURE__ */ new Set([...Object.keys(r), ...Object.keys(s)]))
    if (!M(r, s, a)) {
      if ($(s, a) && typeof s[a] != "string")
        throw new Error("待保存的快捷键格式异常，未提交修改");
      !M(n, r, a) && !M(n, s, a) && Y(), $(s, a) ? c[a] = s[a] : delete c[a];
    }
  return c;
}
function K(t) {
  if (!t || typeof t != "object" || Array.isArray(t)) return;
  const e = t.id;
  if (typeof e == "string" && e.length) return e;
  if (typeof e == "number" && Number.isFinite(e)) return String(e);
}
function B(t) {
  if (t === void 0) return [];
  if (!Array.isArray(t)) throw new Error("书签过滤配置格式异常，未覆盖已有数据");
  return t;
}
function C(t) {
  const e = /* @__PURE__ */ new Map();
  for (const o of t) {
    const r = K(o);
    if (r !== void 0) {
      if (e.has(r)) throw new Error("书签过滤中存在重复 ID，未静默去重或覆盖；请先核对已有配置");
      e.set(r, o);
    }
  }
  return e;
}
function D(t, e, o) {
  return t.has(o) === e.has(o) && (!t.has(o) || v(t.get(o), e.get(o)));
}
function ee(t, e, o) {
  const r = B(t), s = B(e), n = B(o), c = (u) => u.filter((d) => K(d) === void 0);
  if (!v(c(r), c(s)))
    throw new Error("本页不支持修改旧格式过滤规则，未覆盖已有数据");
  const a = C(r), h = C(s), g = C(n), p = [...n];
  for (const u of /* @__PURE__ */ new Set([...a.keys(), ...h.keys()])) {
    if (D(a, h, u)) continue;
    !D(g, a, u) && !D(g, h, u) && Y();
    const d = p.findIndex((m) => K(m) === u);
    h.has(u) ? d !== -1 ? p[d] = h.get(u) : p.push(h.get(u)) : d !== -1 && p.splice(d, 1);
  }
  return p;
}
function te(t, e = 95e3) {
  return Promise.resolve({ ok: !1, error: "Native Messaging 已停用；扩展已升级为纯前端模式" });
}
function oe(t) {
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
const U = 2;
class S extends Error {
}
const re = /* @__PURE__ */ new Set([
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
]), ne = /* @__PURE__ */ new Set([
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
  "gh_my_repo_groups_v2"
]), se = /* @__PURE__ */ new Set([
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
  "googleCalendarSessionTokenV1",
  "gh_my_repo_groups_map_v2"
]);
function b(t) {
  if (!t || typeof t != "object" || Array.isArray(t)) return !1;
  const e = Object.getPrototypeOf(t);
  return e === Object.prototype || e === null;
}
function ie(t) {
  if (/^(?:https?|wss?):\/\//i.test(t.trim()))
    try {
      new URL(t.trim());
    } catch {
      throw new S("备份包含无效链接，请先修正；没有删除或截断数据");
    }
}
function N(t, e = 0) {
  if (e > 40) throw new S("备份数据嵌套过深或存在循环引用");
  if (typeof t == "string") {
    ie(t);
    return;
  }
  if (!(t === null || typeof t == "boolean") && !(typeof t == "number" && Number.isFinite(t))) {
    if (Array.isArray(t)) {
      t.forEach((o) => N(o, e + 1));
      return;
    }
    if (b(t)) {
      for (const [o, r] of Object.entries(t)) {
        if (["__proto__", "prototype", "constructor"].includes(o))
          throw new S("备份包含不安全的对象字段");
        N(r, e + 1);
      }
      return;
    }
    throw new S("备份包含无法完整保存为 JSON 的数据");
  }
}
function ae(t, e) {
  const o = (r) => {
    throw new S(`配置项 ${t} 格式无效${r ? ` (${r})` : ""}，操作已取消`);
  };
  if (["foGroups", "launcherGroups"].includes(t) ? !Array.isArray(e) && !b(e) && o("非数组或字典") : re.has(t) ? typeof e != "boolean" && o("非布尔值") : ne.has(t) ? Array.isArray(e) || o("非数组") : se.has(t) ? b(e) || o("非对象") : typeof e != "string" && typeof e != "number" && typeof e != "boolean" && o("非基本类型"), t === "quickLinks" && Array.isArray(e))
    for (const r of e)
      (!b(r) || typeof r.url != "string" || !r.url.trim()) && o("网站链接为空"), typeof r.title != "string" && (r.title = r.url);
  t === "launcherPages" && Array.isArray(e) && !e.every((r) => typeof r == "string") && o("launcherPages元素非字符串"), ["customShortcuts", "launcherPageLabels", "quickLinkGroupSizes"].includes(t) && b(e) && !Object.values(e).every((r) => typeof r == "string" || typeof r == "number" || typeof r == "boolean") && o("字典属性值非基本类型"), N(e);
}
function z(t, e) {
  if (!b(t)) throw new S("备份配置必须是对象，操作已取消");
  const o = {};
  for (const s of e)
    if (!(!Object.hasOwn(t, s) || t[s] === void 0 || t[s] === null))
      try {
        N(t[s]);
        const n = JSON.parse(JSON.stringify(t[s]));
        ae(s, n), o[s] = n;
      } catch (n) {
        console.warn(`[SyncPayload] 跳过格式不匹配的配置项 "${s}":`, n);
      }
  const r = JSON.stringify(o);
  return {
    sanitized: JSON.parse(r),
    count: Object.keys(o).length,
    byteLength: new TextEncoder().encode(r).length
  };
}
function ce(t, e) {
  if (typeof t == "string")
    try {
      t = JSON.parse(t);
    } catch {
    }
  if (!b(t)) throw new S("云端备份格式无效，未写入本地数据");
  if (Object.hasOwn(t, "formatVersion") && t.formatVersion !== 1 && t.formatVersion !== U)
    throw new S("不支持此备份版本，请先更新插件；未写入本地数据");
  if (t.credentialsIncluded === !0)
    throw new S("备份中包含凭据信息，拒绝恢复到普通配置；未写入本地数据");
  const o = Object.hasOwn(t, "settings") && b(t.settings) ? t.settings : t, r = z(o, e);
  if (!r.count) throw new S("云端备份中未包含有效的设置数据");
  return {
    ...r,
    clientDevice: ["Windows", "macOS", "PC"].includes(String(t.clientDevice)) ? String(t.clientDevice) : "其他设备"
  };
}
const k = "lw_device_identity_v1";
function W() {
  if (typeof navigator > "u") return "Unknown";
  const t = navigator.userAgent;
  return /Macintosh|Mac OS X/i.test(t) ? "macOS" : /Windows/i.test(t) ? "Windows" : /Linux/i.test(t) ? "Linux" : "Unknown";
}
function le(t) {
  const e = Math.random().toString(36).substring(2, 6).toUpperCase();
  return t === "macOS" ? `MacBook · ${e}` : t === "Windows" ? `Windows PC · ${e}` : t === "Linux" ? `Linux · ${e}` : `Device · ${e}`;
}
async function fe() {
  const t = W();
  if (typeof chrome < "u" && chrome.storage?.local) {
    const o = await new Promise((r) => {
      chrome.storage.local.get([k], (s) => r(s || {}));
    });
    if (o[k]?.deviceId && o[k]?.deviceName)
      return o[k];
  }
  if (typeof localStorage < "u") {
    const o = localStorage.getItem(k);
    if (o)
      try {
        const r = JSON.parse(o);
        if (r.deviceId && r.deviceName) return r;
      } catch {
      }
  }
  const e = {
    deviceId: `dev_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
    deviceName: le(t),
    os: t
  };
  return await ue(e), e;
}
async function ue(t) {
  const e = {
    deviceId: t.deviceId || `dev_${Date.now()}`,
    deviceName: (t.deviceName || "").trim() || "我的设备",
    os: t.os || W()
  };
  if (typeof chrome < "u" && chrome.storage?.local && await new Promise((o) => {
    chrome.storage.local.set({ [k]: e }, () => o());
  }), typeof localStorage < "u")
    try {
      localStorage.setItem(k, JSON.stringify(e));
    } catch {
    }
}
const j = (t) => {
  if (!t || typeof t != "object") return [];
  const e = /* @__PURE__ */ new Set();
  for (const [o, r] of Object.entries(t))
    if (o.startsWith("ghLocalStarGroupsV1:") && r && typeof r == "object") {
      const s = r.groups;
      Array.isArray(s) && s.forEach((n) => {
        n?.name && e.add(n.name);
      });
    }
  return Array.from(e);
};
function ge(t, e) {
  const o = [];
  if (!e) return o;
  const r = t || {}, s = Array.isArray(r.quickLinks) ? r.quickLinks : [], n = Array.isArray(e.quickLinks) ? e.quickLinks : [], c = new Map(s.map((l) => [l.url || "", l.title || l.url || ""])), a = new Map(n.map((l) => [l.url || "", l.title || l.url || ""])), h = [], g = [];
  for (const [l, i] of a)
    l && !c.has(l) && h.push(i);
  for (const [l, i] of c)
    l && !a.has(l) && g.push(i);
  if (h.length > 0) {
    const l = h.slice(0, 3).join("、"), i = h.length > 3 ? ` 等共 ${h.length} 个` : "";
    o.push({
      category: "sites",
      categoryLabel: "常用网站",
      action: "added",
      badge: { text: `+${h.length}`, type: "plus" },
      text: `新增了常用网站: ${l}${i}`
    });
  }
  if (g.length > 0) {
    const l = g.slice(0, 3).join("、"), i = g.length > 3 ? ` 等共 ${g.length} 个` : "";
    o.push({
      category: "sites",
      categoryLabel: "常用网站",
      action: "removed",
      badge: { text: `-${g.length}`, type: "minus" },
      text: `移除了常用网站: ${l}${i}`
    });
  }
  const p = new Set(j(r.ghLocalStarGroupsV1)), u = new Set(j(e.ghLocalStarGroupsV1)), d = Array.from(u).filter((l) => !p.has(l)), m = Array.from(p).filter((l) => !u.has(l));
  d.length > 0 && o.push({
    category: "star-groups",
    categoryLabel: "GitHub 收藏",
    action: "added",
    badge: { text: `+${d.length}`, type: "plus" },
    text: `新建了本地分组: ${d.join("、")}`
  }), m.length > 0 && o.push({
    category: "star-groups",
    categoryLabel: "GitHub 收藏",
    action: "removed",
    badge: { text: `-${m.length}`, type: "minus" },
    text: `移除了本地分组: ${m.join("、")}`
  });
  const f = Array.isArray(r.gh_my_repo_groups_v2) ? r.gh_my_repo_groups_v2 : [], w = Array.isArray(e.gh_my_repo_groups_v2) ? e.gh_my_repo_groups_v2 : [], O = w.filter((l) => !f.includes(l)), _ = f.filter((l) => !w.includes(l));
  O.length > 0 && o.push({
    category: "my-repos",
    categoryLabel: "个人仓库",
    action: "added",
    badge: { text: `+${O.length}`, type: "plus" },
    text: `新建了个人仓库分组: ${O.join("、")}`
  }), _.length > 0 && o.push({
    category: "my-repos",
    categoryLabel: "个人仓库",
    action: "removed",
    badge: { text: `-${_.length}`, type: "minus" },
    text: `移除了个人仓库分组: ${_.join("、")}`
  });
  const I = {
    theme: "界面主题",
    showWeather: "天气挂件",
    showSites: "常用网站栏",
    showBili: "B站卡片",
    showYouTube: "YouTube卡片",
    showTodo: "待办卡片",
    showBookmarkPanel: "书签栏",
    singleNewTab: "单标签页模式",
    city: "天气城市",
    ghUser: "GitHub 账号",
    todoistToken: "Todoist 授权"
  }, L = [];
  for (const [l, i] of Object.entries(I))
    e[l] !== void 0 && r[l] !== void 0 && JSON.stringify(e[l]) !== JSON.stringify(r[l]) && L.push(i);
  if (L.length > 0 && o.push({
    category: "settings",
    categoryLabel: "系统设置",
    action: "modified",
    badge: { text: `±${L.length}`, type: "diff" },
    text: `修改了配置项: ${L.join("、")}`
  }), o.length === 0) {
    const l = [];
    (n.length > 0 || s.length > 0) && l.push(`常用网站 ${n.length} 个（原 ${s.length} 个）`);
    const i = u.size, y = p.size;
    (i > 0 || y > 0) && l.push(`Star 分组 ${i} 个（原 ${y} 个）`), (w.length > 0 || f.length > 0) && l.push(`个人仓库分组 ${w.length} 个（原 ${f.length} 个）`);
    const Q = l.length ? `数据概览: ${l.join("，")}` : "两端主要数据结构与配置已对齐";
    o.push({
      category: "other",
      categoryLabel: "对比概览",
      action: "modified",
      text: Q
    });
  }
  return o;
}
function _e(t, e) {
  const o = [], r = t || {}, s = e || {}, n = Array.isArray(r.quickLinks) ? r.quickLinks : [], c = Array.isArray(s.quickLinks) ? s.quickLinks : [], a = new Map(n.map((i) => [i.url || "", i.title || i.url || ""])), h = new Map(c.map((i) => [i.url || "", i.title || i.url || ""])), g = [], p = [];
  for (const [i, y] of h)
    i && !a.has(i) && g.push(y);
  for (const [i, y] of a)
    i && !h.has(i) && p.push(y);
  if (g.length > 0) {
    const i = g.slice(0, 3).join("、"), y = g.length > 3 ? ` 等共 ${g.length} 个` : "";
    o.push({
      category: "sites",
      categoryLabel: "常用网站",
      action: "added",
      badge: { text: `+${g.length} (云端可拉取)`, type: "plus" },
      text: `云端有新网站: ${i}${y}`
    });
  }
  if (p.length > 0) {
    const i = p.slice(0, 3).join("、"), y = p.length > 3 ? ` 等共 ${p.length} 个` : "";
    o.push({
      category: "sites",
      categoryLabel: "常用网站",
      action: "modified",
      badge: { text: `待上传 ${p.length} 项`, type: "minus" },
      text: `本地新加网站 (尚未同步云端): ${i}${y}`
    });
  }
  const u = new Set(j(r.ghLocalStarGroupsV1)), d = new Set(j(s.ghLocalStarGroupsV1)), m = Array.from(d).filter((i) => !u.has(i)), f = Array.from(u).filter((i) => !d.has(i));
  m.length > 0 && o.push({
    category: "star-groups",
    categoryLabel: "GitHub 收藏",
    action: "added",
    badge: { text: `+${m.length} (云端可拉取)`, type: "plus" },
    text: `云端有新分组: ${m.join("、")}`
  }), f.length > 0 && o.push({
    category: "star-groups",
    categoryLabel: "GitHub 收藏",
    action: "modified",
    badge: { text: `待上传 ${f.length} 项`, type: "minus" },
    text: `本地新加分组 (尚未同步云端): ${f.join("、")}`
  });
  const w = Array.isArray(r.gh_my_repo_groups_v2) ? r.gh_my_repo_groups_v2 : [], O = Array.isArray(s.gh_my_repo_groups_v2) ? s.gh_my_repo_groups_v2 : [], _ = O.filter((i) => !w.includes(i)), I = w.filter((i) => !O.includes(i));
  _.length > 0 && o.push({
    category: "my-repos",
    categoryLabel: "个人仓库",
    action: "added",
    badge: { text: `+${_.length} (云端可拉取)`, type: "plus" },
    text: `云端有新仓库分组: ${_.join("、")}`
  }), I.length > 0 && o.push({
    category: "my-repos",
    categoryLabel: "个人仓库",
    action: "modified",
    badge: { text: `待上传 ${I.length} 项`, type: "minus" },
    text: `本地新加仓库分组 (尚未同步云端): ${I.join("、")}`
  });
  const L = {
    theme: "界面主题",
    showWeather: "天气挂件",
    showSites: "常用网站栏",
    showBili: "B站卡片",
    showYouTube: "YouTube卡片",
    showTodo: "待办卡片",
    showBookmarkPanel: "书签栏",
    singleNewTab: "单标签页模式",
    city: "天气城市"
  }, l = [];
  for (const [i, y] of Object.entries(L))
    r[i] !== void 0 && s[i] !== void 0 && JSON.stringify(r[i]) !== JSON.stringify(s[i]) && l.push(`${y} (本地: ${JSON.stringify(r[i])} / 云端: ${JSON.stringify(s[i])})`);
  if (l.length > 0 && o.push({
    category: "settings",
    categoryLabel: "系统设置",
    action: "modified",
    badge: { text: `±${l.length}`, type: "diff" },
    text: `存在差异的配置项: ${l.join("；")}`
  }), o.length === 0) {
    const i = c.length, y = d.size;
    o.push({
      category: "other",
      categoryLabel: "对比结果",
      action: "modified",
      text: `本地与云端数据完全一致（常用网站 ${i} 个，Star 分组 ${y} 个）`
    });
  }
  return o;
}
const he = [
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
], pe = "customShortcuts", de = "searchIgnoredBookmarkFolders", ye = "customNewtabAvatar", me = "customAvatar", E = [
  ...he,
  pe,
  de,
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
  ye,
  me
];
function H(t) {
  return z(t, E);
}
const V = /* @__PURE__ */ new Set([
  "quickLinks",
  "quickLinkGroupSizes",
  "launcherFolders",
  "launcherPages",
  "launcherPageLabels",
  "launcherActivePage",
  "quickLinksReady"
]);
async function ke() {
  if (typeof chrome < "u" && chrome.storage?.local) {
    const e = await new Promise((o, r) => {
      chrome.storage.local.get(null, (s) => {
        const n = chrome.runtime.lastError;
        if (n) {
          r(new Error(n.message || "读取本地配置失败"));
          return;
        }
        const c = {}, a = s || {};
        for (const g of E)
          a[g] !== void 0 && (c[g] = a[g]);
        const h = Object.keys(a).filter((g) => g.startsWith("ghLocalStarGroupsV1:"));
        if (h.length) {
          const g = {};
          for (const p of h) g[p] = a[p];
          c.ghLocalStarGroupsV1 = g;
        }
        o(c);
      });
    });
    if (typeof localStorage < "u") {
      const o = ["lw_private_chat_v1", "ghUser", "ghToken", "todoistToken", "googleCalendarSessionTokenV1", "lw_webdav_config", "biliRadioSeriesV1", "gh_my_repo_groups_v2", "gh_my_repo_groups_map_v2"];
      for (const s of o)
        if (e[s] === void 0) {
          const n = localStorage.getItem(s) ?? (s === "biliRadioSeriesV1" ? localStorage.getItem("lw_backup_bili_radio_series") : null);
          if (n !== null)
            try {
              e[s] = JSON.parse(n);
            } catch {
              e[s] = n;
            }
        }
      const r = Object.keys(localStorage).filter((s) => s.startsWith("ghLocalStarGroupsV1:"));
      if (r.length && !e.ghLocalStarGroupsV1) {
        const s = {};
        for (const n of r) {
          const c = localStorage.getItem(n);
          if (c)
            try {
              s[n] = JSON.parse(c);
            } catch {
              s[n] = c;
            }
        }
        Object.keys(s).length && (e.ghLocalStarGroupsV1 = s);
      }
      for (const s of V) {
        if (!E.includes(s)) continue;
        const n = e[s];
        if (n === void 0 || Array.isArray(n) && n.length === 0) {
          const a = localStorage.getItem(`logicweaver:${s}`) ?? localStorage.getItem(s);
          if (a)
            try {
              const h = JSON.parse(a);
              h !== void 0 && (!Array.isArray(h) || h.length > 0) && (e[s] = h);
            } catch {
            }
        }
      }
    }
    return e;
  }
  if (typeof localStorage > "u") throw new Error("本地存储不可用");
  const t = {};
  for (const e of E) {
    const o = (V.has(e) ? localStorage.getItem(`logicweaver:${e}`) : null) ?? localStorage.getItem(e);
    if (o !== null)
      try {
        t[e] = JSON.parse(o);
      } catch {
        t[e] = o;
      }
  }
  return t;
}
async function ve(t) {
  const e = ce(t, E), o = { ...e.sanitized };
  if (Object.hasOwn(o, "quickLinks") && (o.quickLinksReady = !0), typeof chrome < "u" && chrome.storage?.local) {
    if (await new Promise((r, s) => {
      chrome.storage.local.set(o, () => {
        const n = chrome.runtime.lastError;
        n ? s(new Error(n.message || "写入本地配置失败")) : r();
      });
    }), o.ghLocalStarGroupsV1 && typeof o.ghLocalStarGroupsV1 == "object") {
      const r = o.ghLocalStarGroupsV1, s = {};
      for (const [n, c] of Object.entries(r))
        if (n.startsWith("ghLocalStarGroupsV1:") && (s[n] = c, typeof localStorage < "u"))
          try {
            localStorage.setItem(n, JSON.stringify(c));
          } catch {
          }
      if (typeof r.owner == "string" && r.owner) {
        const n = `ghLocalStarGroupsV1:${r.owner}`;
        if (s[n] = r, typeof localStorage < "u")
          try {
            localStorage.setItem(n, JSON.stringify(r));
          } catch {
          }
      }
      Object.keys(s).length && await new Promise((n) => {
        chrome.storage.local.set(s, () => n());
      });
    }
    if (typeof localStorage < "u")
      for (const [r, s] of Object.entries(o))
        try {
          const n = JSON.stringify(s);
          V.has(r) && localStorage.setItem(`logicweaver:${r}`, n), localStorage.setItem(r, n);
        } catch {
        }
  } else {
    if (typeof localStorage > "u") throw new Error("本地存储不可用");
    const r = Object.entries(o).flatMap(([n, c]) => {
      const a = JSON.stringify(c);
      return V.has(n) ? [[n, a], [`logicweaver:${n}`, a]] : [[n, a]];
    }), s = new Map(r.map(([n]) => [n, localStorage.getItem(n)]));
    try {
      for (const [n, c] of r) localStorage.setItem(n, c);
    } catch {
      let n = !0;
      for (const [c, a] of s)
        try {
          a === null ? localStorage.removeItem(c) : localStorage.setItem(c, a);
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
const q = "lw_last_synced_snapshot_v1";
async function Ae(t, e) {
  const o = e || await fe();
  let r = null;
  if (typeof localStorage < "u") {
    const c = localStorage.getItem(q);
    if (c)
      try {
        r = JSON.parse(c);
      } catch {
      }
  }
  const s = H(t).sanitized, n = ge(r, s);
  if (typeof localStorage < "u")
    try {
      localStorage.setItem(q, JSON.stringify(s));
    } catch {
    }
  return {
    formatVersion: U,
    clientDevice: o.os === "macOS" ? "macOS" : o.os === "Windows" ? "Windows" : "PC",
    deviceId: o.deviceId,
    deviceName: o.deviceName,
    exportedAt: (/* @__PURE__ */ new Date()).toISOString(),
    backupKind: "preferences",
    credentialsIncluded: !1,
    changeSummary: n,
    settings: s
  };
}
const J = [
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
], T = "customShortcuts", F = "customNewtabAvatar", G = "searchIgnoredBookmarkFolders";
class A {
  constructor() {
  }
  static getInstance() {
    return A.instance || (A.instance = new A()), A.instance;
  }
  /** Global settings are explicitly scoped; community sources can contain Tokens. */
  async loadGlobalSettings() {
    if (typeof chrome > "u" || !chrome.storage?.local) throw new Error("设置存储不可用，未读取配置");
    const e = await chrome.storage.local.get([
      ...J,
      T,
      F,
      G
    ]);
    return typeof localStorage < "u" && (e.showStartupAnimation !== void 0 && (localStorage.setItem("showStartupAnimation", e.showStartupAnimation ? "1" : "0"), localStorage.setItem("logicweaverEndfieldLoader", e.showStartupAnimation ? "1" : "0")), e.startupAnimationStyle && (localStorage.setItem("startupAnimationStyle", String(e.startupAnimationStyle)), localStorage.setItem("logicweaverStartupStyle", String(e.startupAnimationStyle)))), e;
  }
  /** Save only edited keys, rejecting stale drafts under a lock shared by new settings views. */
  async saveSettings(e, o) {
    if (typeof chrome > "u" || !chrome.storage?.local) throw new Error("设置存储不可用，未保存");
    const r = /* @__PURE__ */ new Set([
      ...J,
      T,
      F,
      G
    ]), s = Object.keys(e);
    if (s.some((u) => !r.has(u) || !Object.prototype.hasOwnProperty.call(o, u)))
      throw new Error("保存范围或草稿基线无效，未提交设置");
    if (!s.length) return {};
    if (typeof navigator > "u" || !navigator.locks?.request)
      throw new Error("当前环境不支持跨标签保存保护，未提交设置");
    const n = x(e), c = x(o), a = new AbortController(), h = Date.now() + 1e4, g = setTimeout(() => a.abort(), 1e4);
    let p = !1;
    try {
      return await navigator.locks.request("logicweaver:global-settings", { signal: a.signal }, async () => {
        const u = await chrome.storage.local.get(s);
        if (a.signal.aborted || Date.now() >= h)
          throw new Error("等待设置保存超时，未提交本次修改");
        const d = {};
        for (const f of s)
          if (f === T)
            d[f] = Z(c[f], n[f], u[f]);
          else if (f === G)
            d[f] = ee(c[f], n[f], u[f]);
          else {
            if (!v(u[f], c[f]) && !v(u[f], n[f]))
              throw new Error("其他页面已修改同一项设置，未覆盖；本页草稿保留。可重读设置后重新编辑。");
            d[f] = n[f];
          }
        const m = {};
        for (const f of s)
          v(u[f], d[f]) || (m[f] = d[f]);
        if (Object.keys(m).length) {
          clearTimeout(g), p = !0, await chrome.storage.local.set(m);
          const f = await chrome.storage.local.get(s);
          if (s.some((w) => !v(f[w], d[w])))
            throw new Error("设置保存结果未确认，请重读核对；未自动重试");
        }
        try {
          Object.prototype.hasOwnProperty.call(n, "showStartupAnimation") && (localStorage.setItem("showStartupAnimation", n.showStartupAnimation ? "1" : "0"), localStorage.setItem("logicweaverEndfieldLoader", n.showStartupAnimation ? "1" : "0")), Object.prototype.hasOwnProperty.call(n, "startupAnimationStyle") && localStorage.setItem("startupAnimationStyle", n.startupAnimationStyle || "endfield"), Object.prototype.hasOwnProperty.call(n, "searchEngine") && (localStorage.setItem("searchEngine", n.searchEngine || "bing"), window.dispatchEvent(new CustomEvent("logicweaver:search-engine-updated", { detail: n.searchEngine })));
        } catch {
          throw new R("设置已保存，但开屏缓存未确认；请重读核对，未自动重试");
        }
        try {
          window.parent?.postMessage?.({ type: "newtab-options-saved" }, "*");
        } catch {
        }
        return x(d);
      });
    } catch (u) {
      throw u instanceof R ? u : p ? new R() : a.signal.aborted ? new Error("等待设置保存超时，未提交本次修改") : u;
    } finally {
      clearTimeout(g);
    }
  }
  /**
   * 收集书签树中的全部文件夹路径
   */
  collectBookmarkFolders(e, o = "", r = []) {
    if (!e) return r;
    const s = !e.parentId || e.id === "0";
    let n = e.title || "";
    n || (e.id === "1" ? n = "书签栏" : e.id === "2" ? n = "其他书签" : (e.id === "mobile" || e.id === "3") && (n = "移动设备书签"));
    const c = s ? o : o ? `${o} / ${n}` : n;
    !e.url && !s && r.push({
      id: String(e.id),
      title: n || "未命名文件夹",
      path: c || n || "书签文件夹"
    });
    for (const a of e.children || [])
      a.url || this.collectBookmarkFolders(a, c, r);
    return r;
  }
  /**
   * 历史兼容存根：Native Host 已在 v1.0.2 彻底移除。
   * 此方法仅保留为类型安全存根，不再发起任何底层原生进程连接。
   */
  async callNativeHost(e) {
    if (e.command !== "git-check-update" && e.command !== "git-apply-update")
      return { ok: !1, error: "设置服务不允许此原生命令；未发送请求" };
    const o = await te();
    return e.command === "git-check-update" ? oe(o) : o;
  }
  /** Shared, lossless backup selection; transport limits are checked by the uploader. */
  extractSyncPayload(e) {
    return H(e);
  }
}
const we = A.getInstance(), Oe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  AVAILABLE_SHORTCUT_TOOLS: X,
  CUSTOM_AVATAR_STORAGE_KEY: F,
  GLOBAL_SETTINGS_KEYS: J,
  OptionsService: A,
  SEARCH_IGNORED_BOOKMARK_FOLDERS_STORAGE_KEY: G,
  SHORTCUT_STORAGE_KEY: T,
  SYNC_WHITELIST_KEYS: E,
  optionsService: we
}, Symbol.toStringTag, { value: "Module" }));
export {
  J as G,
  S,
  ve as a,
  _e as b,
  Ae as c,
  T as d,
  H as e,
  G as f,
  Oe as g,
  K as i,
  we as o,
  ke as r
};
