import { p as C, P as R, A as P } from "./revision-guard-5IS-EcTI.js";
const j = 2;
class y extends Error {
}
const B = /* @__PURE__ */ new Set([
  "showWeather",
  "showSites",
  "showBili",
  "showTodo",
  "showLeftNavigation",
  "showNavBall",
  "showBookmarkPanel",
  "showBookmarkFoldersTop",
  "showStartupAnimation",
  "singleNewTab",
  "showHomeMusicVisualizer"
]), M = /* @__PURE__ */ new Set([
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
  "gh_my_repo_groups_v2",
  "heroBackgroundHistory",
  "logicweaver_prompt_backpack_v1",
  "logicweaver_prompt_backpack_categories_v1",
  "logicweaver_saved_articles_v1",
  "logicweaver_saved_article_categories_v1"
]), K = /* @__PURE__ */ new Set([
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
function m(e) {
  if (!e || typeof e != "object" || Array.isArray(e)) return !1;
  const t = Object.getPrototypeOf(e);
  return t === Object.prototype || t === null;
}
function J(e) {
  if (/^(?:https?|wss?):\/\//i.test(e.trim()))
    try {
      new URL(e.trim());
    } catch {
      throw new y("备份包含无效链接，请先修正；没有删除或截断数据");
    }
}
function $(e, t = 0) {
  if (t > 40) throw new y("备份数据嵌套过深或存在循环引用");
  if (typeof e == "string") {
    J(e);
    return;
  }
  if (!(e === null || typeof e == "boolean") && !(typeof e == "number" && Number.isFinite(e))) {
    if (Array.isArray(e)) {
      e.forEach((r) => $(r, t + 1));
      return;
    }
    if (m(e)) {
      for (const [r, o] of Object.entries(e)) {
        if (["__proto__", "prototype", "constructor"].includes(r))
          throw new y("备份包含不安全的对象字段");
        $(o, t + 1);
      }
      return;
    }
    throw new y("备份包含无法完整保存为 JSON 的数据");
  }
}
function q(e, t) {
  const r = (o) => {
    throw new y(`配置项 ${e} 格式无效${o ? ` (${o})` : ""}，操作已取消`);
  };
  if (e === "heroBackground" ? typeof t != "string" && !m(t) && r("非字符串或对象") : ["foGroups", "launcherGroups"].includes(e) ? !Array.isArray(t) && !m(t) && r("非数组或字典") : B.has(e) ? typeof t != "boolean" && r("非布尔值") : M.has(e) ? Array.isArray(t) || r("非数组") : K.has(e) ? m(t) || r("非对象") : typeof t != "string" && typeof t != "number" && typeof t != "boolean" && r("非基本类型"), e === "quickLinks" && Array.isArray(t))
    for (const o of t)
      (!m(o) || typeof o.url != "string" || !o.url.trim()) && r("网站链接为空"), typeof o.title != "string" && (o.title = o.url);
  e === "launcherPages" && Array.isArray(t) && !t.every((o) => typeof o == "string") && r("launcherPages元素非字符串"), ["customShortcuts", "launcherPageLabels", "quickLinkGroupSizes"].includes(e) && m(t) && !Object.values(t).every((o) => typeof o == "string" || typeof o == "number" || typeof o == "boolean") && r("字典属性值非基本类型"), $(t);
}
function T(e, t) {
  if (!m(e)) throw new y("备份配置必须是对象，操作已取消");
  const r = {};
  for (const s of t)
    if (!(!Object.hasOwn(e, s) || e[s] === void 0 || e[s] === null))
      try {
        $(e[s]);
        const g = JSON.parse(JSON.stringify(e[s]));
        q(s, g), r[s] = g;
      } catch (g) {
        if (["logicweaver_prompt_backpack_v1", "logicweaver_prompt_backpack_categories_v1", "logicweaver_saved_articles_v1", "logicweaver_saved_article_categories_v1"].includes(s))
          throw new y(`收藏或背包数据 ${s} 格式无效；未生成不完整的备份`);
        console.warn(`[SyncPayload] 跳过格式不匹配的配置项 "${s}":`, g);
      }
  const o = JSON.stringify(r);
  return {
    sanitized: JSON.parse(o),
    count: Object.keys(r).length,
    byteLength: new TextEncoder().encode(o).length
  };
}
function D(e, t, r = {}) {
  if (typeof e == "string")
    try {
      e = JSON.parse(e);
    } catch {
    }
  if (!m(e)) throw new y("云端备份格式无效，未写入本地数据");
  if (Object.hasOwn(e, "formatVersion") && e.formatVersion !== 1 && e.formatVersion !== j)
    throw new y("不支持此备份版本，请先更新插件；未写入本地数据");
  if (e.credentialsIncluded === !0 && !r.allowCredentials)
    throw new y("备份中包含凭据信息，拒绝恢复到普通配置；未写入本地数据");
  const o = Object.hasOwn(e, "settings") && m(e.settings) ? e.settings : e, s = T(o, t);
  if (!s.count) throw new y("云端备份中未包含有效的设置数据");
  return {
    ...s,
    clientDevice: ["Windows", "macOS", "PC"].includes(String(e.clientDevice)) ? String(e.clientDevice) : "其他设备"
  };
}
const b = "lw_device_identity_v1";
function E() {
  if (typeof navigator > "u") return "Unknown";
  const e = navigator.userAgent;
  return /Macintosh|Mac OS X/i.test(e) ? "macOS" : /Windows/i.test(e) ? "Windows" : /Linux/i.test(e) ? "Linux" : "Unknown";
}
function Y(e) {
  const t = Math.random().toString(36).substring(2, 6).toUpperCase();
  return e === "macOS" ? `MacBook · ${t}` : e === "Windows" ? `Windows PC · ${t}` : e === "Linux" ? `Linux · ${t}` : `Device · ${t}`;
}
async function W() {
  const e = E();
  if (typeof chrome < "u" && chrome.storage?.local) {
    const r = await new Promise((o) => {
      chrome.storage.local.get([b], (s) => o(s || {}));
    });
    if (r[b]?.deviceId && r[b]?.deviceName)
      return r[b];
  }
  if (typeof localStorage < "u") {
    const r = localStorage.getItem(b);
    if (r)
      try {
        const o = JSON.parse(r);
        if (o.deviceId && o.deviceName) return o;
      } catch {
      }
  }
  const t = {
    deviceId: `dev_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
    deviceName: Y(e),
    os: e
  };
  return await F(t), t;
}
async function F(e) {
  const t = {
    deviceId: e.deviceId || `dev_${Date.now()}`,
    deviceName: (e.deviceName || "").trim() || "我的设备",
    os: e.os || E()
  };
  if (typeof chrome < "u" && chrome.storage?.local && await new Promise((r) => {
    chrome.storage.local.set({ [b]: t }, () => r());
  }), typeof localStorage < "u")
    try {
      localStorage.setItem(b, JSON.stringify(t));
    } catch {
    }
}
const N = (e) => {
  if (!e || typeof e != "object") return [];
  const t = /* @__PURE__ */ new Set();
  for (const [r, o] of Object.entries(e))
    if (r.startsWith("ghLocalStarGroupsV1:") && o && typeof o == "object") {
      const s = o.groups;
      Array.isArray(s) && s.forEach((g) => {
        g?.name && t.add(g.name);
      });
    }
  return Array.from(t);
};
function z(e, t) {
  const r = [];
  if (!t) return r;
  const o = e || {}, s = Array.isArray(o.quickLinks) ? o.quickLinks : [], g = Array.isArray(t.quickLinks) ? t.quickLinks : [], u = new Map(s.map((c) => [c.url || "", c.title || c.url || ""])), p = new Map(g.map((c) => [c.url || "", c.title || c.url || ""])), l = [], n = [];
  for (const [c, i] of p)
    c && !u.has(c) && l.push(i);
  for (const [c, i] of u)
    c && !p.has(c) && n.push(i);
  if (l.length > 0) {
    const c = l.slice(0, 3).join("、"), i = l.length > 3 ? ` 等共 ${l.length} 个` : "";
    r.push({
      category: "sites",
      categoryLabel: "常用网站",
      action: "added",
      badge: { text: `+${l.length}`, type: "plus" },
      text: `新增了常用网站: ${c}${i}`
    });
  }
  if (n.length > 0) {
    const c = n.slice(0, 3).join("、"), i = n.length > 3 ? ` 等共 ${n.length} 个` : "";
    r.push({
      category: "sites",
      categoryLabel: "常用网站",
      action: "removed",
      badge: { text: `-${n.length}`, type: "minus" },
      text: `移除了常用网站: ${c}${i}`
    });
  }
  const a = new Set(N(o.ghLocalStarGroupsV1)), f = new Set(N(t.ghLocalStarGroupsV1)), h = Array.from(f).filter((c) => !a.has(c)), S = Array.from(a).filter((c) => !f.has(c));
  h.length > 0 && r.push({
    category: "star-groups",
    categoryLabel: "GitHub 收藏",
    action: "added",
    badge: { text: `+${h.length}`, type: "plus" },
    text: `新建了本地分组: ${h.join("、")}`
  }), S.length > 0 && r.push({
    category: "star-groups",
    categoryLabel: "GitHub 收藏",
    action: "removed",
    badge: { text: `-${S.length}`, type: "minus" },
    text: `移除了本地分组: ${S.join("、")}`
  });
  const w = Array.isArray(o.gh_my_repo_groups_v2) ? o.gh_my_repo_groups_v2 : [], _ = Array.isArray(t.gh_my_repo_groups_v2) ? t.gh_my_repo_groups_v2 : [], k = _.filter((c) => !w.includes(c)), v = w.filter((c) => !_.includes(c));
  k.length > 0 && r.push({
    category: "my-repos",
    categoryLabel: "个人仓库",
    action: "added",
    badge: { text: `+${k.length}`, type: "plus" },
    text: `新建了个人仓库分组: ${k.join("、")}`
  }), v.length > 0 && r.push({
    category: "my-repos",
    categoryLabel: "个人仓库",
    action: "removed",
    badge: { text: `-${v.length}`, type: "minus" },
    text: `移除了个人仓库分组: ${v.join("、")}`
  });
  const O = {
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
  for (const [c, i] of Object.entries(O))
    t[c] !== void 0 && o[c] !== void 0 && JSON.stringify(t[c]) !== JSON.stringify(o[c]) && L.push(i);
  if (L.length > 0 && r.push({
    category: "settings",
    categoryLabel: "系统设置",
    action: "modified",
    badge: { text: `±${L.length}`, type: "diff" },
    text: `修改了配置项: ${L.join("、")}`
  }), r.length === 0) {
    const c = [];
    (g.length > 0 || s.length > 0) && c.push(`常用网站 ${g.length} 个（原 ${s.length} 个）`);
    const i = f.size, d = a.size;
    (i > 0 || d > 0) && c.push(`Star 分组 ${i} 个（原 ${d} 个）`), (_.length > 0 || w.length > 0) && c.push(`个人仓库分组 ${_.length} 个（原 ${w.length} 个）`);
    const x = c.length ? `数据概览: ${c.join("，")}` : "两端主要数据结构与配置已对齐";
    r.push({
      category: "other",
      categoryLabel: "对比概览",
      action: "modified",
      text: x
    });
  }
  return r;
}
function oe(e, t) {
  const r = [], o = e || {}, s = t || {}, g = Array.isArray(o.quickLinks) ? o.quickLinks : [], u = Array.isArray(s.quickLinks) ? s.quickLinks : [], p = new Map(g.map((i) => [i.url || "", i.title || i.url || ""])), l = new Map(u.map((i) => [i.url || "", i.title || i.url || ""])), n = [], a = [];
  for (const [i, d] of l)
    i && !p.has(i) && n.push(d);
  for (const [i, d] of p)
    i && !l.has(i) && a.push(d);
  if (n.length > 0) {
    const i = n.slice(0, 3).join("、"), d = n.length > 3 ? ` 等共 ${n.length} 个` : "";
    r.push({
      category: "sites",
      categoryLabel: "常用网站",
      action: "added",
      badge: { text: `+${n.length} (云端可拉取)`, type: "plus" },
      text: `云端有新网站: ${i}${d}`
    });
  }
  if (a.length > 0) {
    const i = a.slice(0, 3).join("、"), d = a.length > 3 ? ` 等共 ${a.length} 个` : "";
    r.push({
      category: "sites",
      categoryLabel: "常用网站",
      action: "modified",
      badge: { text: `待上传 ${a.length} 项`, type: "minus" },
      text: `本地新加网站 (尚未同步云端): ${i}${d}`
    });
  }
  const f = new Set(N(o.ghLocalStarGroupsV1)), h = new Set(N(s.ghLocalStarGroupsV1)), S = Array.from(h).filter((i) => !f.has(i)), w = Array.from(f).filter((i) => !h.has(i));
  S.length > 0 && r.push({
    category: "star-groups",
    categoryLabel: "GitHub 收藏",
    action: "added",
    badge: { text: `+${S.length} (云端可拉取)`, type: "plus" },
    text: `云端有新分组: ${S.join("、")}`
  }), w.length > 0 && r.push({
    category: "star-groups",
    categoryLabel: "GitHub 收藏",
    action: "modified",
    badge: { text: `待上传 ${w.length} 项`, type: "minus" },
    text: `本地新加分组 (尚未同步云端): ${w.join("、")}`
  });
  const _ = Array.isArray(o.gh_my_repo_groups_v2) ? o.gh_my_repo_groups_v2 : [], k = Array.isArray(s.gh_my_repo_groups_v2) ? s.gh_my_repo_groups_v2 : [], v = k.filter((i) => !_.includes(i)), O = _.filter((i) => !k.includes(i));
  v.length > 0 && r.push({
    category: "my-repos",
    categoryLabel: "个人仓库",
    action: "added",
    badge: { text: `+${v.length} (云端可拉取)`, type: "plus" },
    text: `云端有新仓库分组: ${v.join("、")}`
  }), O.length > 0 && r.push({
    category: "my-repos",
    categoryLabel: "个人仓库",
    action: "modified",
    badge: { text: `待上传 ${O.length} 项`, type: "minus" },
    text: `本地新加仓库分组 (尚未同步云端): ${O.join("、")}`
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
  }, c = [];
  for (const [i, d] of Object.entries(L))
    o[i] !== void 0 && s[i] !== void 0 && JSON.stringify(o[i]) !== JSON.stringify(s[i]) && c.push(`${d} (本地: ${JSON.stringify(o[i])} / 云端: ${JSON.stringify(s[i])})`);
  if (c.length > 0 && r.push({
    category: "settings",
    categoryLabel: "系统设置",
    action: "modified",
    badge: { text: `±${c.length}`, type: "diff" },
    text: `存在差异的配置项: ${c.join("；")}`
  }), r.length === 0) {
    const i = u.length, d = h.size;
    r.push({
      category: "other",
      categoryLabel: "对比结果",
      action: "modified",
      text: `本地与云端数据完全一致（常用网站 ${i} 个，Star 分组 ${d} 个）`
    });
  }
  return r;
}
const H = [
  "displaySize",
  "city",
  "showWeather",
  "showSites",
  "showBili",
  "showTodo",
  "showLeftNavigation",
  "showNavBall",
  "showBookmarkPanel",
  "showBookmarkFoldersTop",
  "showStartupAnimation",
  "startupAnimationStyle",
  "singleNewTab",
  "showHomeMusicVisualizer"
], U = "customShortcuts", X = "searchIgnoredBookmarkFolders", Q = "customNewtabAvatar", Z = "customAvatar", A = [
  ...H,
  U,
  X,
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
  "heroBackground",
  "heroBackgroundHistory",
  "logicweaver_prompt_backpack_v1",
  "logicweaver_prompt_backpack_categories_v1",
  "logicweaver_saved_articles_v1",
  "logicweaver_saved_article_categories_v1",
  Q,
  Z
];
function ee(e) {
  return T(e, A);
}
const I = [
  "logicweaver_prompt_backpack_v1",
  "logicweaver_prompt_backpack_categories_v1",
  "logicweaver_saved_articles_v1",
  "logicweaver_saved_article_categories_v1"
], G = /* @__PURE__ */ new Set([
  "quickLinks",
  "quickLinkGroupSizes",
  "launcherFolders",
  "launcherPages",
  "launcherPageLabels",
  "launcherActivePage",
  "quickLinksReady"
]);
async function re() {
  if (typeof chrome < "u" && chrome.storage?.local) {
    const t = await new Promise((r, o) => {
      chrome.storage.local.get(null, (s) => {
        const g = chrome.runtime.lastError;
        if (g) {
          o(new Error(g.message || "读取本地配置失败"));
          return;
        }
        const u = {}, p = s || {};
        for (const n of A)
          p[n] !== void 0 && (u[n] = p[n]);
        const l = Object.keys(p).filter((n) => n.startsWith("ghLocalStarGroupsV1:"));
        if (l.length) {
          const n = {};
          for (const a of l) n[a] = p[a];
          u.ghLocalStarGroupsV1 = n;
        }
        r(u);
      });
    });
    if (typeof localStorage < "u") {
      const r = ["lw_private_chat_v1", "ghUser", "ghToken", "todoistToken", "googleCalendarSessionTokenV1", "lw_webdav_config", "biliRadioSeriesV1", "gh_my_repo_groups_v2", "gh_my_repo_groups_map_v2", ...I];
      for (const s of r)
        if (t[s] === void 0) {
          const g = localStorage.getItem(s) ?? (s === "biliRadioSeriesV1" ? localStorage.getItem("lw_backup_bili_radio_series") : null);
          if (g !== null)
            try {
              t[s] = JSON.parse(g);
            } catch {
              t[s] = g;
            }
        }
      const o = Object.keys(localStorage).filter((s) => s.startsWith("ghLocalStarGroupsV1:"));
      if (o.length && !t.ghLocalStarGroupsV1) {
        const s = {};
        for (const g of o) {
          const u = localStorage.getItem(g);
          if (u)
            try {
              s[g] = JSON.parse(u);
            } catch {
              s[g] = u;
            }
        }
        Object.keys(s).length && (t.ghLocalStarGroupsV1 = s);
      }
      for (const s of G) {
        if (!A.includes(s)) continue;
        if (t[s] === void 0) {
          const u = localStorage.getItem(`logicweaver:${s}`) ?? localStorage.getItem(s);
          if (u)
            try {
              const p = JSON.parse(u);
              p !== void 0 && (!Array.isArray(p) || p.length > 0) && (t[s] = p);
            } catch {
            }
        }
      }
    }
    return t;
  }
  if (typeof localStorage > "u") throw new Error("本地存储不可用");
  const e = {};
  for (const t of A) {
    const r = (G.has(t) ? localStorage.getItem(`logicweaver:${t}`) : null) ?? localStorage.getItem(t);
    if (r !== null)
      try {
        e[t] = JSON.parse(r);
      } catch {
        e[t] = r;
      }
  }
  return e;
}
async function se(e, t = {}) {
  const r = D(e, A, t), o = { ...r.sanitized }, s = I.slice(0, 2).some((l) => Object.hasOwn(o, l)), g = I.slice(2).some((l) => Object.hasOwn(o, l)), u = [s && R, g && P].filter((l) => !!l), p = u.map((l) => `tab-project:backpack:${l}`);
  if (Object.hasOwn(o, "quickLinks") && (o.quickLinksReady = !0), typeof chrome < "u" && chrome.storage?.local) {
    const l = async () => {
      t.beforeCommit && await t.beforeCommit();
      const n = { ...o };
      if (u.length) {
        const a = await chrome.storage.local.get(u);
        for (const f of u) {
          const h = C(a[f]);
          if (h >= Number.MAX_SAFE_INTEGER) throw new y("背包版本号已耗尽，未恢复数据");
          n[f] = h + 1;
        }
      }
      await new Promise((a, f) => {
        chrome.storage.local.set(n, () => {
          const h = chrome.runtime.lastError;
          h ? f(new Error(h.message || "写入本地配置失败")) : a();
        });
      });
    };
    if (p.length) {
      if (typeof navigator > "u" || !navigator.locks) throw new y("浏览器缺少背包写入锁或收藏写入锁，未恢复任何数据");
      const n = async (a) => {
        if (a >= p.length) return l();
        await navigator.locks.request(p[a], () => n(a + 1));
      };
      await n(0);
    } else await l();
    if (o.ghLocalStarGroupsV1 && typeof o.ghLocalStarGroupsV1 == "object") {
      const n = o.ghLocalStarGroupsV1, a = {};
      for (const [f, h] of Object.entries(n))
        if (f.startsWith("ghLocalStarGroupsV1:") && (a[f] = h, typeof localStorage < "u"))
          try {
            localStorage.setItem(f, JSON.stringify(h));
          } catch {
          }
      if (typeof n.owner == "string" && n.owner) {
        const f = `ghLocalStarGroupsV1:${n.owner}`;
        if (a[f] = n, typeof localStorage < "u")
          try {
            localStorage.setItem(f, JSON.stringify(n));
          } catch {
          }
      }
      Object.keys(a).length && await new Promise((f) => {
        chrome.storage.local.set(a, () => f());
      });
    }
    if (typeof localStorage < "u")
      for (const [n, a] of Object.entries(o))
        try {
          const f = JSON.stringify(a);
          G.has(n) && localStorage.setItem(`logicweaver:${n}`, f), localStorage.setItem(n, f);
        } catch {
        }
  } else {
    if (p.length) throw new y("当前环境无法安全恢复背包，未修改数据");
    if (t.beforeCommit && await t.beforeCommit(), typeof localStorage > "u") throw new Error("本地存储不可用");
    const l = Object.entries(o).flatMap(([a, f]) => {
      const h = JSON.stringify(f);
      return G.has(a) ? [[a, h], [`logicweaver:${a}`, h]] : [[a, h]];
    }), n = new Map(l.map(([a]) => [a, localStorage.getItem(a)]));
    try {
      for (const [a, f] of l) localStorage.setItem(a, f);
    } catch {
      let a = !0;
      for (const [f, h] of n)
        try {
          h === null ? localStorage.removeItem(f) : localStorage.setItem(f, h);
        } catch {
          a = !1;
        }
      throw new Error(a ? "恢复失败，已回滚本次写入；请检查本地存储空间" : "恢复失败且部分数据无法回滚，请勿继续编辑，先检查本地存储与备份");
    }
  }
  if (typeof localStorage < "u" && Object.hasOwn(o, "biliRadioSeriesV1"))
    try {
      const l = JSON.stringify(o.biliRadioSeriesV1);
      localStorage.setItem("biliRadioSeriesV1", l), localStorage.setItem("lw_backup_bili_radio_series", l);
    } catch {
    }
  if (typeof window < "u")
    try {
      window.dispatchEvent(new CustomEvent("logicweaver:sync-restored", { detail: o }));
    } catch {
    }
  return { restoredCount: r.count, clientDevice: r.clientDevice };
}
const V = "lw_last_synced_snapshot_v1";
async function ne(e, t) {
  const r = t || await W();
  let o = null;
  if (typeof localStorage < "u") {
    const n = localStorage.getItem(V);
    if (n)
      try {
        o = JSON.parse(n);
      } catch {
      }
  }
  const s = ee(e).sanitized, g = /* @__PURE__ */ new Set(["ghToken", "todoistToken", "lw_private_chat_v1", "googleCalendarSessionTokenV1", "lw_webdav_config"]), u = Object.fromEntries(Object.entries(s).filter(([n]) => !g.has(n))), p = o && Object.fromEntries(Object.entries(o).filter(([n]) => !g.has(n))), l = z(p, u);
  if (typeof localStorage < "u")
    try {
      localStorage.setItem(V, JSON.stringify(u));
    } catch {
    }
  return {
    formatVersion: j,
    clientDevice: r.os === "macOS" ? "macOS" : r.os === "Windows" ? "Windows" : "PC",
    deviceId: r.deviceId,
    deviceName: r.deviceName,
    exportedAt: (/* @__PURE__ */ new Date()).toISOString(),
    backupKind: "preferences",
    credentialsIncluded: !1,
    changeSummary: l,
    settings: s
  };
}
export {
  I as B,
  A as S,
  ne as a,
  se as b,
  oe as c,
  y as d,
  ee as e,
  m as i,
  D as p,
  re as r
};
