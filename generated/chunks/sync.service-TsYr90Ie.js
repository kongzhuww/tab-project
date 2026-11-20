import { p as P, P as C, A as B } from "./revision-guard-5IS-EcTI.js";
const T = 2;
class d extends Error {
}
const M = /* @__PURE__ */ new Set([
  "showWeather",
  "showSites",
  "showHomeNews",
  "showHomePlayer",
  "showQuickSearchWallpaper",
  "showBili",
  "showTodo",
  "showLeftNavigation",
  "showNavBall",
  "showBookmarkPanel",
  "showBookmarkFoldersTop",
  "showStartupAnimation",
  "singleNewTab",
  "enableQuickSearch",
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
  "gh_my_repo_groups_v2",
  "heroBackgroundHistory",
  "logicweaver_prompt_backpack_v1",
  "logicweaver_prompt_backpack_categories_v1",
  "logicweaver_saved_articles_v1",
  "logicweaver_saved_article_categories_v1",
  "lw-rss-channels-v1",
  "digitalEmployeesV1"
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
  "gh_my_repo_groups_map_v2",
  "msFavoriteSongs"
]);
function m(e) {
  if (!e || typeof e != "object" || Array.isArray(e)) return !1;
  const t = Object.getPrototypeOf(e);
  return t === Object.prototype || t === null;
}
function H(e) {
  if (/^(?:https?|wss?):\/\//i.test(e.trim()))
    try {
      new URL(e.trim());
    } catch {
      throw new d("备份包含无效链接，请先修正；没有删除或截断数据");
    }
}
function V(e, t = 0) {
  if (t > 40) throw new d("备份数据嵌套过深或存在循环引用");
  if (typeof e == "string") {
    H(e);
    return;
  }
  if (!(e === null || typeof e == "boolean") && !(typeof e == "number" && Number.isFinite(e))) {
    if (Array.isArray(e)) {
      e.forEach((r) => V(r, t + 1));
      return;
    }
    if (m(e)) {
      for (const [r, o] of Object.entries(e)) {
        if (["__proto__", "prototype", "constructor"].includes(r))
          throw new d("备份包含不安全的对象字段");
        V(o, t + 1);
      }
      return;
    }
    throw new d("备份包含无法完整保存为 JSON 的数据");
  }
}
function q(e, t) {
  const r = (o) => {
    throw new d(`配置项 ${e} 格式无效${o ? ` (${o})` : ""}，操作已取消`);
  };
  if (e === "heroBackground" ? typeof t != "string" && !m(t) && r("非字符串或对象") : ["foGroups", "launcherGroups"].includes(e) ? !Array.isArray(t) && !m(t) && r("非数组或字典") : M.has(e) ? typeof t != "boolean" && r("非布尔值") : J.has(e) ? Array.isArray(t) || r("非数组") : K.has(e) ? m(t) || r("非对象") : typeof t != "string" && typeof t != "number" && typeof t != "boolean" && r("非基本类型"), e === "quickLinks" && Array.isArray(t))
    for (const o of t)
      (!m(o) || typeof o.url != "string" || !o.url.trim()) && r("网站链接为空"), typeof o.title != "string" && (o.title = o.url);
  e === "launcherPages" && Array.isArray(t) && !t.every((o) => typeof o == "string") && r("launcherPages元素非字符串"), ["customShortcuts", "launcherPageLabels", "quickLinkGroupSizes"].includes(e) && m(t) && !Object.values(t).every((o) => typeof o == "string" || typeof o == "number" || typeof o == "boolean") && r("字典属性值非基本类型"), V(t);
}
function j(e, t) {
  if (!m(e)) throw new d("备份配置必须是对象，操作已取消");
  const r = {};
  for (const s of t)
    if (!(!Object.hasOwn(e, s) || e[s] === void 0 || e[s] === null))
      try {
        V(e[s]);
        const c = JSON.parse(JSON.stringify(e[s]));
        q(s, c), r[s] = c;
      } catch (c) {
        if (["logicweaver_prompt_backpack_v1", "logicweaver_prompt_backpack_categories_v1", "logicweaver_saved_articles_v1", "logicweaver_saved_article_categories_v1", "lw-rss-channels-v1", "msFavoriteSongs", "digitalEmployeesV1"].includes(s))
          throw new d(`收藏或背包数据 ${s} 格式无效；未生成不完整的备份`);
        console.warn(`[SyncPayload] 跳过格式不匹配的配置项 "${s}":`, c);
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
  if (!m(e)) throw new d("云端备份格式无效，未写入本地数据");
  if (Object.hasOwn(e, "formatVersion") && e.formatVersion !== 1 && e.formatVersion !== T)
    throw new d("不支持此备份版本，请先更新插件；未写入本地数据");
  if (e.credentialsIncluded === !0 && !r.allowCredentials)
    throw new d("备份中包含凭据信息，拒绝恢复到普通配置；未写入本地数据");
  const o = Object.hasOwn(e, "settings") && m(e.settings) ? e.settings : e, s = j(o, t);
  if (!s.count) throw new d("云端备份中未包含有效的设置数据");
  return {
    ...s,
    clientDevice: ["Windows", "macOS", "PC"].includes(String(e.clientDevice)) ? String(e.clientDevice) : "其他设备"
  };
}
const b = "lw_device_identity_v1";
function x() {
  if (typeof navigator > "u") return "Unknown";
  const e = navigator.userAgent;
  return /Macintosh|Mac OS X/i.test(e) ? "macOS" : /Windows/i.test(e) ? "Windows" : /Linux/i.test(e) ? "Linux" : "Unknown";
}
function Y(e) {
  const t = Math.random().toString(36).substring(2, 6).toUpperCase();
  return e === "macOS" ? `MacBook · ${t}` : e === "Windows" ? `Windows PC · ${t}` : e === "Linux" ? `Linux · ${t}` : `Device · ${t}`;
}
async function F() {
  const e = x();
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
  return await W(t), t;
}
async function W(e) {
  const t = {
    deviceId: e.deviceId || `dev_${Date.now()}`,
    deviceName: (e.deviceName || "").trim() || "我的设备",
    os: e.os || x()
  };
  if (typeof chrome < "u" && chrome.storage?.local && await new Promise((r) => {
    chrome.storage.local.set({ [b]: t }, () => r());
  }), typeof localStorage < "u")
    try {
      localStorage.setItem(b, JSON.stringify(t));
    } catch {
    }
}
const $ = (e) => {
  if (!e || typeof e != "object") return [];
  const t = /* @__PURE__ */ new Set();
  for (const [r, o] of Object.entries(e))
    if (r.startsWith("ghLocalStarGroupsV1:") && o && typeof o == "object") {
      const s = o.groups;
      Array.isArray(s) && s.forEach((c) => {
        c?.name && t.add(c.name);
      });
    }
  return Array.from(t);
};
function z(e, t) {
  const r = [];
  if (!t) return r;
  const o = e || {}, s = Array.isArray(o.quickLinks) ? o.quickLinks : [], c = Array.isArray(t.quickLinks) ? t.quickLinks : [], u = new Map(s.map((l) => [l.url || "", l.title || l.url || ""])), h = new Map(c.map((l) => [l.url || "", l.title || l.url || ""])), f = [], n = [];
  for (const [l, a] of h)
    l && !u.has(l) && f.push(a);
  for (const [l, a] of u)
    l && !h.has(l) && n.push(a);
  if (f.length > 0) {
    const l = f.slice(0, 3).join("、"), a = f.length > 3 ? ` 等共 ${f.length} 个` : "";
    r.push({
      category: "sites",
      categoryLabel: "常用网站",
      action: "added",
      badge: { text: `+${f.length}`, type: "plus" },
      text: `新增了常用网站: ${l}${a}`
    });
  }
  if (n.length > 0) {
    const l = n.slice(0, 3).join("、"), a = n.length > 3 ? ` 等共 ${n.length} 个` : "";
    r.push({
      category: "sites",
      categoryLabel: "常用网站",
      action: "removed",
      badge: { text: `-${n.length}`, type: "minus" },
      text: `移除了常用网站: ${l}${a}`
    });
  }
  const i = new Set($(o.ghLocalStarGroupsV1)), g = new Set($(t.ghLocalStarGroupsV1)), p = Array.from(g).filter((l) => !i.has(l)), S = Array.from(i).filter((l) => !g.has(l));
  p.length > 0 && r.push({
    category: "star-groups",
    categoryLabel: "GitHub 收藏",
    action: "added",
    badge: { text: `+${p.length}`, type: "plus" },
    text: `新建了本地分组: ${p.join("、")}`
  }), S.length > 0 && r.push({
    category: "star-groups",
    categoryLabel: "GitHub 收藏",
    action: "removed",
    badge: { text: `-${S.length}`, type: "minus" },
    text: `移除了本地分组: ${S.join("、")}`
  });
  const w = Array.isArray(o.gh_my_repo_groups_v2) ? o.gh_my_repo_groups_v2 : [], _ = Array.isArray(t.gh_my_repo_groups_v2) ? t.gh_my_repo_groups_v2 : [], k = _.filter((l) => !w.includes(l)), v = w.filter((l) => !_.includes(l));
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
  const L = {
    enableQuickSearch: "极速搜索",
    theme: "界面主题",
    showWeather: "天气挂件",
    showSites: "常用网站和书签",
    showHomeNews: "AI HOT 资讯",
    showHomePlayer: "音乐播放器",
    showBili: "B站卡片",
    showYouTube: "YouTube卡片",
    showTodo: "待办卡片",
    showBookmarkPanel: "书签栏",
    singleNewTab: "极速搜索（旧设置）",
    city: "天气城市",
    ghUser: "GitHub 账号",
    todoistToken: "Todoist 授权"
  }, O = [];
  for (const [l, a] of Object.entries(L))
    t[l] !== void 0 && o[l] !== void 0 && JSON.stringify(t[l]) !== JSON.stringify(o[l]) && O.push(a);
  if (O.length > 0 && r.push({
    category: "settings",
    categoryLabel: "系统设置",
    action: "modified",
    badge: { text: `±${O.length}`, type: "diff" },
    text: `修改了配置项: ${O.join("、")}`
  }), r.length === 0) {
    const l = [];
    (c.length > 0 || s.length > 0) && l.push(`常用网站 ${c.length} 个（原 ${s.length} 个）`);
    const a = g.size, y = i.size;
    (a > 0 || y > 0) && l.push(`Star 分组 ${a} 个（原 ${y} 个）`), (_.length > 0 || w.length > 0) && l.push(`个人仓库分组 ${_.length} 个（原 ${w.length} 个）`);
    const R = l.length ? `数据概览: ${l.join("，")}` : "两端主要数据结构与配置已对齐";
    r.push({
      category: "other",
      categoryLabel: "对比概览",
      action: "modified",
      text: R
    });
  }
  return r;
}
function se(e, t) {
  const r = [], o = e || {}, s = t || {}, c = Array.isArray(o.quickLinks) ? o.quickLinks : [], u = Array.isArray(s.quickLinks) ? s.quickLinks : [], h = new Map(c.map((a) => [a.url || "", a.title || a.url || ""])), f = new Map(u.map((a) => [a.url || "", a.title || a.url || ""])), n = [], i = [];
  for (const [a, y] of f)
    a && !h.has(a) && n.push(y);
  for (const [a, y] of h)
    a && !f.has(a) && i.push(y);
  if (n.length > 0) {
    const a = n.slice(0, 3).join("、"), y = n.length > 3 ? ` 等共 ${n.length} 个` : "";
    r.push({
      category: "sites",
      categoryLabel: "常用网站",
      action: "added",
      badge: { text: `+${n.length} (云端可拉取)`, type: "plus" },
      text: `云端有新网站: ${a}${y}`
    });
  }
  if (i.length > 0) {
    const a = i.slice(0, 3).join("、"), y = i.length > 3 ? ` 等共 ${i.length} 个` : "";
    r.push({
      category: "sites",
      categoryLabel: "常用网站",
      action: "modified",
      badge: { text: `待上传 ${i.length} 项`, type: "minus" },
      text: `本地新加网站 (尚未同步云端): ${a}${y}`
    });
  }
  const g = new Set($(o.ghLocalStarGroupsV1)), p = new Set($(s.ghLocalStarGroupsV1)), S = Array.from(p).filter((a) => !g.has(a)), w = Array.from(g).filter((a) => !p.has(a));
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
  const _ = Array.isArray(o.gh_my_repo_groups_v2) ? o.gh_my_repo_groups_v2 : [], k = Array.isArray(s.gh_my_repo_groups_v2) ? s.gh_my_repo_groups_v2 : [], v = k.filter((a) => !_.includes(a)), L = _.filter((a) => !k.includes(a));
  v.length > 0 && r.push({
    category: "my-repos",
    categoryLabel: "个人仓库",
    action: "added",
    badge: { text: `+${v.length} (云端可拉取)`, type: "plus" },
    text: `云端有新仓库分组: ${v.join("、")}`
  }), L.length > 0 && r.push({
    category: "my-repos",
    categoryLabel: "个人仓库",
    action: "modified",
    badge: { text: `待上传 ${L.length} 项`, type: "minus" },
    text: `本地新加仓库分组 (尚未同步云端): ${L.join("、")}`
  });
  const O = {
    enableQuickSearch: "极速搜索",
    theme: "界面主题",
    showWeather: "天气挂件",
    showSites: "常用网站和书签",
    showHomeNews: "AI HOT 资讯",
    showHomePlayer: "音乐播放器",
    showBili: "B站卡片",
    showYouTube: "YouTube卡片",
    showTodo: "待办卡片",
    showBookmarkPanel: "书签栏",
    singleNewTab: "极速搜索（旧设置）",
    city: "天气城市"
  }, l = [];
  for (const [a, y] of Object.entries(O))
    o[a] !== void 0 && s[a] !== void 0 && JSON.stringify(o[a]) !== JSON.stringify(s[a]) && l.push(`${y} (本地: ${JSON.stringify(o[a])} / 云端: ${JSON.stringify(s[a])})`);
  if (l.length > 0 && r.push({
    category: "settings",
    categoryLabel: "系统设置",
    action: "modified",
    badge: { text: `±${l.length}`, type: "diff" },
    text: `存在差异的配置项: ${l.join("；")}`
  }), r.length === 0) {
    const a = u.length, y = p.size;
    r.push({
      category: "other",
      categoryLabel: "对比结果",
      action: "modified",
      text: `本地与云端数据完全一致（常用网站 ${a} 个，Star 分组 ${y} 个）`
    });
  }
  return r;
}
function N(e) {
  if (!Array.isArray(e) || e.some((t) => !m(t) || typeof t.id != "string"))
    throw new d("数字员工配置格式无效，未生成不完整的备份");
  return e.map((t) => {
    const { lastRunAt: r, nextEligibleAt: o, lastError: s, ...c } = t;
    return { ...c, enabled: !1 };
  });
}
function U(e, t) {
  const r = N(e), o = new Map((Array.isArray(t) ? t : []).filter(m).map((s) => [s.id, s]));
  return r.map((s) => {
    const c = o.get(s.id);
    if (!c) return s;
    const u = { ...s, enabled: c.enabled === !0 };
    for (const h of ["lastRunAt", "nextEligibleAt", "lastError"])
      Object.hasOwn(c, h) && (u[h] = c[h]);
    return u;
  });
}
const Q = [
  "displaySize",
  "city",
  "showWeather",
  "showSites",
  "showHomeNews",
  "showHomePlayer",
  "showQuickSearchWallpaper",
  "showBili",
  "showTodo",
  "showLeftNavigation",
  "showNavBall",
  "showBookmarkPanel",
  "showBookmarkFoldersTop",
  "showStartupAnimation",
  "startupAnimationStyle",
  "singleNewTab",
  "enableQuickSearch",
  "showHomeMusicVisualizer",
  "defaultSitesView",
  "sitesTransparency",
  "weatherTransparency",
  "newsTransparency",
  "playerTransparency",
  "searchEngine",
  "dockPosition",
  "theme"
], X = "customShortcuts", Z = "searchIgnoredBookmarkFolders", ee = "customNewtabAvatar", te = "customAvatar", A = [
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
  "heroBackground",
  "heroBackgroundHistory",
  "lw-rss-channels-v1",
  "lw-rss-selected-v1",
  "msFavoriteSongs",
  "digitalEmployeesV1",
  "logicweaver_prompt_backpack_v1",
  "logicweaver_prompt_backpack_categories_v1",
  "logicweaver_saved_articles_v1",
  "logicweaver_saved_article_categories_v1",
  ee,
  te
];
function oe(e) {
  return j(e, A);
}
const G = [
  "logicweaver_prompt_backpack_v1",
  "logicweaver_prompt_backpack_categories_v1",
  "logicweaver_saved_articles_v1",
  "logicweaver_saved_article_categories_v1"
], E = /* @__PURE__ */ new Set([
  "quickLinks",
  "quickLinkGroupSizes",
  "launcherFolders",
  "launcherPages",
  "launcherPageLabels",
  "launcherActivePage",
  "quickLinksReady"
]);
async function ne() {
  if (typeof chrome < "u" && chrome.storage?.local) {
    const t = await new Promise((r, o) => {
      chrome.storage.local.get(null, (s) => {
        const c = chrome.runtime.lastError;
        if (c) {
          o(new Error(c.message || "读取本地配置失败"));
          return;
        }
        const u = {}, h = s || {};
        for (const n of A)
          h[n] !== void 0 && (u[n] = h[n]);
        const f = Object.keys(h).filter((n) => n.startsWith("ghLocalStarGroupsV1:"));
        if (f.length) {
          const n = {};
          for (const i of f) n[i] = h[i];
          u.ghLocalStarGroupsV1 = n;
        }
        r(u);
      });
    });
    if (t.digitalEmployeesV1 !== void 0 && (t.digitalEmployeesV1 = N(t.digitalEmployeesV1)), typeof localStorage < "u") {
      const r = ["lw_private_chat_v1", "ghUser", "ghToken", "todoistToken", "googleCalendarSessionTokenV1", "lw_webdav_config", "biliRadioSeriesV1", "gh_my_repo_groups_v2", "gh_my_repo_groups_map_v2", ...G];
      for (const s of r)
        if (t[s] === void 0) {
          const c = localStorage.getItem(s) ?? (s === "biliRadioSeriesV1" ? localStorage.getItem("lw_backup_bili_radio_series") : null);
          if (c !== null)
            try {
              t[s] = JSON.parse(c);
            } catch {
              t[s] = c;
            }
        }
      const o = Object.keys(localStorage).filter((s) => s.startsWith("ghLocalStarGroupsV1:"));
      if (o.length && !t.ghLocalStarGroupsV1) {
        const s = {};
        for (const c of o) {
          const u = localStorage.getItem(c);
          if (u)
            try {
              s[c] = JSON.parse(u);
            } catch {
              s[c] = u;
            }
        }
        Object.keys(s).length && (t.ghLocalStarGroupsV1 = s);
      }
      for (const s of ["lw-rss-channels-v1", "lw-rss-selected-v1"]) {
        const c = localStorage.getItem(s);
        if (c === null) {
          delete t[s];
          continue;
        }
        if (s === "lw-rss-selected-v1") t[s] = c;
        else
          try {
            t[s] = JSON.parse(c);
          } catch {
            throw new d("RSS 订阅数据格式无效，未生成备份");
          }
      }
      for (const s of E) {
        if (!A.includes(s)) continue;
        if (t[s] === void 0) {
          const u = localStorage.getItem(`logicweaver:${s}`) ?? localStorage.getItem(s);
          if (u)
            try {
              const h = JSON.parse(u);
              h !== void 0 && (!Array.isArray(h) || h.length > 0) && (t[s] = h);
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
    const r = (E.has(t) ? localStorage.getItem(`logicweaver:${t}`) : null) ?? localStorage.getItem(t);
    if (r !== null)
      try {
        e[t] = JSON.parse(r);
      } catch {
        e[t] = r;
      }
  }
  return e.digitalEmployeesV1 !== void 0 && (e.digitalEmployeesV1 = N(e.digitalEmployeesV1)), e;
}
async function ie(e, t = {}) {
  const r = D(e, A, t), o = { ...r.sanitized }, s = G.slice(0, 2).some((f) => Object.hasOwn(o, f)), c = G.slice(2).some((f) => Object.hasOwn(o, f)), u = [s && C, c && B].filter((f) => !!f), h = u.map((f) => `tab-project:backpack:${f}`);
  if (Object.hasOwn(o, "quickLinks") && (o.quickLinksReady = !0), typeof chrome < "u" && chrome.storage?.local) {
    const f = async () => {
      t.beforeCommit && await t.beforeCommit();
      const n = { ...o };
      if (Object.hasOwn(o, "digitalEmployeesV1")) {
        const i = await chrome.storage.local.get("digitalEmployeesV1");
        n.digitalEmployeesV1 = U(o.digitalEmployeesV1, i.digitalEmployeesV1), n.digitalEmployeeOrganizerSeededV1 = !0;
      }
      if (u.length) {
        const i = await chrome.storage.local.get(u);
        for (const g of u) {
          const p = P(i[g]);
          if (p >= Number.MAX_SAFE_INTEGER) throw new d("背包版本号已耗尽，未恢复数据");
          n[g] = p + 1;
        }
      }
      await new Promise((i, g) => {
        chrome.storage.local.set(n, () => {
          const p = chrome.runtime.lastError;
          p ? g(new Error(p.message || "写入本地配置失败")) : i();
        });
      });
    };
    if (h.length) {
      if (typeof navigator > "u" || !navigator.locks) throw new d("浏览器缺少背包写入锁或收藏写入锁，未恢复任何数据");
      const n = async (i) => {
        if (i >= h.length) return f();
        await navigator.locks.request(h[i], () => n(i + 1));
      };
      await n(0);
    } else await f();
    if (o.ghLocalStarGroupsV1 && typeof o.ghLocalStarGroupsV1 == "object") {
      const n = o.ghLocalStarGroupsV1, i = {};
      for (const [g, p] of Object.entries(n))
        if (g.startsWith("ghLocalStarGroupsV1:") && (i[g] = p, typeof localStorage < "u"))
          try {
            localStorage.setItem(g, JSON.stringify(p));
          } catch {
          }
      if (typeof n.owner == "string" && n.owner) {
        const g = `ghLocalStarGroupsV1:${n.owner}`;
        if (i[g] = n, typeof localStorage < "u")
          try {
            localStorage.setItem(g, JSON.stringify(n));
          } catch {
          }
      }
      Object.keys(i).length && await new Promise((g) => {
        chrome.storage.local.set(i, () => g());
      });
    }
    if (typeof localStorage < "u")
      for (const [n, i] of Object.entries(o))
        try {
          const g = JSON.stringify(i);
          E.has(n) && localStorage.setItem(`logicweaver:${n}`, g), localStorage.setItem(n, (n === "theme" || n === "lw-rss-selected-v1") && typeof i == "string" ? i : g);
        } catch {
        }
  } else {
    if (h.length) throw new d("当前环境无法安全恢复背包，未修改数据");
    if (t.beforeCommit && await t.beforeCommit(), typeof localStorage > "u") throw new Error("本地存储不可用");
    const f = Object.entries(o).flatMap(([i, g]) => {
      const p = (i === "theme" || i === "lw-rss-selected-v1") && typeof g == "string" ? g : JSON.stringify(g);
      return E.has(i) ? [[i, p], [`logicweaver:${i}`, p]] : [[i, p]];
    }), n = new Map(f.map(([i]) => [i, localStorage.getItem(i)]));
    try {
      for (const [i, g] of f) localStorage.setItem(i, g);
    } catch {
      let i = !0;
      for (const [g, p] of n)
        try {
          p === null ? localStorage.removeItem(g) : localStorage.setItem(g, p);
        } catch {
          i = !1;
        }
      throw new Error(i ? "恢复失败，已回滚本次写入；请检查本地存储空间" : "恢复失败且部分数据无法回滚，请勿继续编辑，先检查本地存储与备份");
    }
  }
  if (typeof localStorage < "u" && Object.hasOwn(o, "biliRadioSeriesV1"))
    try {
      const f = JSON.stringify(o.biliRadioSeriesV1);
      localStorage.setItem("biliRadioSeriesV1", f), localStorage.setItem("lw_backup_bili_radio_series", f);
    } catch {
    }
  if (typeof window < "u")
    try {
      window.dispatchEvent(new CustomEvent("logicweaver:sync-restored", { detail: o }));
    } catch {
    }
  return { restoredCount: r.count, clientDevice: r.clientDevice };
}
const I = "lw_last_synced_snapshot_v1";
async function ae(e, t) {
  const r = t || await F();
  let o = null;
  if (typeof localStorage < "u") {
    const n = localStorage.getItem(I);
    if (n)
      try {
        o = JSON.parse(n);
      } catch {
      }
  }
  const s = oe(e).sanitized, c = /* @__PURE__ */ new Set(["ghToken", "todoistToken", "lw_private_chat_v1", "googleCalendarSessionTokenV1", "lw_webdav_config"]), u = Object.fromEntries(Object.entries(s).filter(([n]) => !c.has(n))), h = o && Object.fromEntries(Object.entries(o).filter(([n]) => !c.has(n))), f = z(h, u);
  if (typeof localStorage < "u")
    try {
      localStorage.setItem(I, JSON.stringify(u));
    } catch {
    }
  return {
    formatVersion: T,
    clientDevice: r.os === "macOS" ? "macOS" : r.os === "Windows" ? "Windows" : "PC",
    deviceId: r.deviceId,
    deviceName: r.deviceName,
    exportedAt: (/* @__PURE__ */ new Date()).toISOString(),
    backupKind: "preferences",
    credentialsIncluded: !1,
    changeSummary: f,
    settings: s
  };
}
export {
  G as B,
  A as S,
  ae as a,
  ie as b,
  se as c,
  d,
  oe as e,
  m as i,
  D as p,
  ne as r
};
