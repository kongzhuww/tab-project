import { h as x, r as j, a as ee, w as K, b as te } from "./storage-repo-CeKQXDMh.js";
import { p as oe, P as re, A as se } from "./revision-guard-5IS-EcTI.js";
const U = 2;
class w extends Error {
}
const ne = /* @__PURE__ */ new Set([
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
]), ie = /* @__PURE__ */ new Set([
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
]), ae = /* @__PURE__ */ new Set([
  "customShortcuts",
  "launcherFolders",
  "quickLinkGroupSizes",
  "launcherPageLabels",
  "launcherFolderPositionV1",
  "foTree",
  "ghRepoRemarksV1",
  "ghLocalStarGroupsV1",
  "lw_webdav_config",
  "googleCalendarSessionTokenV1",
  "gh_my_repo_groups_map_v2",
  "msFavoriteSongs"
]);
function S(e) {
  if (!e || typeof e != "object" || Array.isArray(e)) return !1;
  const t = Object.getPrototypeOf(e);
  return t === Object.prototype || t === null;
}
function ce(e) {
  if (/^(?:https?|wss?):\/\//i.test(e.trim()))
    try {
      new URL(e.trim());
    } catch {
      throw new w("备份包含无效链接，请先修正；没有删除或截断数据");
    }
}
function I(e, t = 0) {
  if (t > 40) throw new w("备份数据嵌套过深或存在循环引用");
  if (typeof e == "string") {
    ce(e);
    return;
  }
  if (!(e === null || typeof e == "boolean") && !(typeof e == "number" && Number.isFinite(e))) {
    if (Array.isArray(e)) {
      e.forEach((o) => I(o, t + 1));
      return;
    }
    if (S(e)) {
      for (const [o, r] of Object.entries(e)) {
        if (["__proto__", "prototype", "constructor"].includes(o))
          throw new w("备份包含不安全的对象字段");
        I(r, t + 1);
      }
      return;
    }
    throw new w("备份包含无法完整保存为 JSON 的数据");
  }
}
function le(e, t) {
  const o = (r) => {
    throw new w(`配置项 ${e} 格式无效${r ? ` (${r})` : ""}，操作已取消`);
  };
  if (e === "heroBackground" ? typeof t != "string" && !S(t) && o("非字符串或对象") : ["foGroups", "launcherGroups"].includes(e) ? !Array.isArray(t) && !S(t) && o("非数组或字典") : ne.has(e) ? typeof t != "boolean" && o("非布尔值") : ie.has(e) ? Array.isArray(t) || o("非数组") : ae.has(e) ? S(t) || o("非对象") : typeof t != "string" && typeof t != "number" && typeof t != "boolean" && o("非基本类型"), e === "quickLinks" && Array.isArray(t))
    for (const r of t)
      (!S(r) || typeof r.url != "string" || !r.url.trim()) && o("网站链接为空"), typeof r.title != "string" && (r.title = r.url);
  e === "launcherPages" && Array.isArray(t) && !t.every((r) => typeof r == "string") && o("launcherPages元素非字符串"), ["customShortcuts", "launcherPageLabels", "quickLinkGroupSizes"].includes(e) && S(t) && !Object.values(t).every((r) => typeof r == "string" || typeof r == "number" || typeof r == "boolean") && o("字典属性值非基本类型"), I(t);
}
function Q(e, t) {
  if (!S(e)) throw new w("备份配置必须是对象，操作已取消");
  const o = {};
  for (const s of t)
    if (!(!Object.hasOwn(e, s) || e[s] === void 0 || e[s] === null))
      try {
        I(e[s]);
        const f = JSON.parse(JSON.stringify(e[s]));
        le(s, f), o[s] = f;
      } catch (f) {
        if (["logicweaver_prompt_backpack_v1", "logicweaver_prompt_backpack_categories_v1", "logicweaver_saved_articles_v1", "logicweaver_saved_article_categories_v1", "lw-rss-channels-v1", "msFavoriteSongs", "digitalEmployeesV1"].includes(s))
          throw new w(`收藏或背包数据 ${s} 格式无效；未生成不完整的备份`);
        console.warn(`[SyncPayload] 跳过格式不匹配的配置项 "${s}":`, f);
      }
  const r = JSON.stringify(o);
  return {
    sanitized: JSON.parse(r),
    count: Object.keys(o).length,
    byteLength: new TextEncoder().encode(r).length
  };
}
function ge(e, t, o = {}) {
  if (typeof e == "string")
    try {
      e = JSON.parse(e);
    } catch {
    }
  if (!S(e)) throw new w("云端备份格式无效，未写入本地数据");
  if (Object.hasOwn(e, "formatVersion") && e.formatVersion !== 1 && e.formatVersion !== U)
    throw new w("不支持此备份版本，请先更新插件；未写入本地数据");
  if (e.credentialsIncluded === !0 && !o.allowCredentials)
    throw new w("备份中包含凭据信息，拒绝恢复到普通配置；未写入本地数据");
  const r = Object.hasOwn(e, "settings") && S(e.settings) ? e.settings : e, s = Q(r, t);
  if (!s.count) throw new w("云端备份中未包含有效的设置数据");
  return {
    ...s,
    clientDevice: ["Windows", "macOS", "PC"].includes(String(e.clientDevice)) ? String(e.clientDevice) : "其他设备"
  };
}
const V = "lw_device_identity_v1";
function X() {
  if (typeof navigator > "u") return "Unknown";
  const e = navigator.userAgent;
  return /Macintosh|Mac OS X/i.test(e) ? "macOS" : /Windows/i.test(e) ? "Windows" : /Linux/i.test(e) ? "Linux" : "Unknown";
}
function fe(e) {
  const t = Math.random().toString(36).substring(2, 6).toUpperCase();
  return e === "macOS" ? `MacBook · ${t}` : e === "Windows" ? `Windows PC · ${t}` : e === "Linux" ? `Linux · ${t}` : `Device · ${t}`;
}
async function pe() {
  const e = X();
  if (x())
    try {
      const s = (await j([V]))[V];
      if (s?.deviceId && s?.deviceName) return s;
    } catch {
    }
  const t = ee(V);
  if (t && typeof t == "object" && t.deviceId && t.deviceName)
    return t;
  const o = {
    deviceId: `dev_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
    deviceName: fe(e),
    os: e
  };
  return await ue(o), o;
}
async function ue(e) {
  const t = {
    deviceId: e.deviceId || `dev_${Date.now()}`,
    deviceName: (e.deviceName || "").trim() || "我的设备",
    os: e.os || X()
  };
  if (x())
    try {
      await K({ [V]: t });
    } catch {
    }
  te(V, t);
}
const Oe = [
  ["ghUser", "ghToken"],
  ["todoistToken", "todoistActiveProjectIdV1"],
  ["googleCalendarSessionTokenV1"],
  ["lw_webdav_config"]
], Y = /* @__PURE__ */ new Set([
  "ghToken",
  "todoistToken",
  "googleCalendarSessionTokenV1",
  "lw_webdav_config"
]), Z = {
  enableQuickSearch: "极速搜索",
  theme: "界面主题",
  showWeather: "天气挂件",
  showSites: "常用网站和书签",
  showHomeNews: "AI HOT 资讯",
  showHomePlayer: "音乐播放器",
  showBili: "B站卡片",
  showTodo: "待办卡片",
  showBookmarkPanel: "书签栏",
  singleNewTab: "极速搜索（旧设置）",
  city: "天气城市"
};
function W(e, t = 0) {
  if (t > 64 || e === null || typeof e != "object") return JSON.stringify(e) ?? "null";
  if (Array.isArray(e)) return `[${e.map((r) => W(r, t + 1)).join(",")}]`;
  const o = e;
  return `{${Object.keys(o).sort().filter((r) => o[r] !== void 0).map((r) => `${JSON.stringify(r)}:${W(o[r], t + 1)}`).join(",")}}`;
}
const G = (e) => {
  if (!e || typeof e != "object") return [];
  const t = /* @__PURE__ */ new Set();
  for (const [o, r] of Object.entries(e))
    if (o.startsWith("ghLocalStarGroupsV1:") && r && typeof r == "object") {
      const s = r.groups;
      Array.isArray(s) && s.forEach((f) => {
        f?.name && t.add(f.name);
      });
    }
  return Array.from(t);
};
function he(e, t) {
  const o = [];
  if (!t) return o;
  const r = e || {}, s = Array.isArray(r.quickLinks) ? r.quickLinks : [], f = Array.isArray(t.quickLinks) ? t.quickLinks : [], c = new Map(s.map((g) => [g.url || "", g.title || g.url || ""])), p = new Map(f.map((g) => [g.url || "", g.title || g.url || ""])), l = [], a = [];
  for (const [g, n] of p)
    g && !c.has(g) && l.push(n);
  for (const [g, n] of c)
    g && !p.has(g) && a.push(n);
  if (l.length > 0) {
    const g = l.slice(0, 3).join("、"), n = l.length > 3 ? ` 等共 ${l.length} 个` : "";
    o.push({
      category: "sites",
      categoryLabel: "常用网站",
      action: "added",
      badge: { text: `+${l.length}`, type: "plus" },
      text: `新增了常用网站: ${g}${n}`
    });
  }
  if (a.length > 0) {
    const g = a.slice(0, 3).join("、"), n = a.length > 3 ? ` 等共 ${a.length} 个` : "";
    o.push({
      category: "sites",
      categoryLabel: "常用网站",
      action: "removed",
      badge: { text: `-${a.length}`, type: "minus" },
      text: `移除了常用网站: ${g}${n}`
    });
  }
  const i = new Set(G(r.ghLocalStarGroupsV1)), u = new Set(G(t.ghLocalStarGroupsV1)), h = Array.from(u).filter((g) => !i.has(g)), b = Array.from(i).filter((g) => !u.has(g));
  h.length > 0 && o.push({
    category: "star-groups",
    categoryLabel: "GitHub 收藏",
    action: "added",
    badge: { text: `+${h.length}`, type: "plus" },
    text: `新建了本地分组: ${h.join("、")}`
  }), b.length > 0 && o.push({
    category: "star-groups",
    categoryLabel: "GitHub 收藏",
    action: "removed",
    badge: { text: `-${b.length}`, type: "minus" },
    text: `移除了本地分组: ${b.join("、")}`
  });
  const _ = Array.isArray(r.gh_my_repo_groups_v2) ? r.gh_my_repo_groups_v2 : [], v = Array.isArray(t.gh_my_repo_groups_v2) ? t.gh_my_repo_groups_v2 : [], L = v.filter((g) => !_.includes(g)), k = _.filter((g) => !v.includes(g));
  L.length > 0 && o.push({
    category: "my-repos",
    categoryLabel: "个人仓库",
    action: "added",
    badge: { text: `+${L.length}`, type: "plus" },
    text: `新建了个人仓库分组: ${L.join("、")}`
  }), k.length > 0 && o.push({
    category: "my-repos",
    categoryLabel: "个人仓库",
    action: "removed",
    badge: { text: `-${k.length}`, type: "minus" },
    text: `移除了个人仓库分组: ${k.join("、")}`
  });
  const $ = {
    ...Z,
    ghUser: "GitHub 账号",
    todoistToken: "Todoist 授权"
  }, m = [];
  for (const [g, n] of Object.entries($))
    t[g] !== void 0 && r[g] !== void 0 && JSON.stringify(t[g]) !== JSON.stringify(r[g]) && m.push(n);
  if (m.length > 0 && o.push({
    category: "settings",
    categoryLabel: "系统设置",
    action: "modified",
    badge: { text: `±${m.length}`, type: "diff" },
    text: `修改了配置项: ${m.join("、")}`
  }), o.length === 0) {
    const g = [];
    (f.length > 0 || s.length > 0) && g.push(`常用网站 ${f.length} 个（原 ${s.length} 个）`);
    const n = u.size, y = i.size;
    (n > 0 || y > 0) && g.push(`Star 分组 ${n} 个（原 ${y} 个）`), (v.length > 0 || _.length > 0) && g.push(`个人仓库分组 ${v.length} 个（原 ${_.length} 个）`);
    const N = g.length ? `数据概览: ${g.join("，")}` : "两端主要数据结构与配置已对齐";
    o.push({
      category: "other",
      categoryLabel: "对比概览",
      action: "modified",
      text: N
    });
  }
  return o;
}
function Le(e, t) {
  const o = [], r = e || {}, s = t || {}, f = Array.isArray(r.quickLinks) ? r.quickLinks : [], c = Array.isArray(s.quickLinks) ? s.quickLinks : [], p = new Map(f.map((n) => [n.url || "", n.title || n.url || ""])), l = new Map(c.map((n) => [n.url || "", n.title || n.url || ""])), a = [], i = [];
  for (const [n, y] of l)
    n && !p.has(n) && a.push(y);
  for (const [n, y] of p)
    n && !l.has(n) && i.push(y);
  if (a.length > 0) {
    const n = a.slice(0, 3).join("、"), y = a.length > 3 ? ` 等共 ${a.length} 个` : "";
    o.push({
      category: "sites",
      categoryLabel: "常用网站",
      action: "added",
      badge: { text: `+${a.length} (云端可拉取)`, type: "plus" },
      text: `云端有新网站: ${n}${y}`
    });
  }
  if (i.length > 0) {
    const n = i.slice(0, 3).join("、"), y = i.length > 3 ? ` 等共 ${i.length} 个` : "";
    o.push({
      category: "sites",
      categoryLabel: "常用网站",
      action: "modified",
      badge: { text: `待上传 ${i.length} 项`, type: "minus" },
      text: `本地新加网站 (尚未同步云端): ${n}${y}`
    });
  }
  const u = new Set(G(r.ghLocalStarGroupsV1)), h = new Set(G(s.ghLocalStarGroupsV1)), b = Array.from(h).filter((n) => !u.has(n)), _ = Array.from(u).filter((n) => !h.has(n));
  b.length > 0 && o.push({
    category: "star-groups",
    categoryLabel: "GitHub 收藏",
    action: "added",
    badge: { text: `+${b.length} (云端可拉取)`, type: "plus" },
    text: `云端有新分组: ${b.join("、")}`
  }), _.length > 0 && o.push({
    category: "star-groups",
    categoryLabel: "GitHub 收藏",
    action: "modified",
    badge: { text: `待上传 ${_.length} 项`, type: "minus" },
    text: `本地新加分组 (尚未同步云端): ${_.join("、")}`
  });
  const v = Array.isArray(r.gh_my_repo_groups_v2) ? r.gh_my_repo_groups_v2 : [], L = Array.isArray(s.gh_my_repo_groups_v2) ? s.gh_my_repo_groups_v2 : [], k = L.filter((n) => !v.includes(n)), $ = v.filter((n) => !L.includes(n));
  k.length > 0 && o.push({
    category: "my-repos",
    categoryLabel: "个人仓库",
    action: "added",
    badge: { text: `+${k.length} (云端可拉取)`, type: "plus" },
    text: `云端有新仓库分组: ${k.join("、")}`
  }), $.length > 0 && o.push({
    category: "my-repos",
    categoryLabel: "个人仓库",
    action: "modified",
    badge: { text: `待上传 ${$.length} 项`, type: "minus" },
    text: `本地新加仓库分组 (尚未同步云端): ${$.join("、")}`
  });
  const m = [];
  for (const [n, y] of Object.entries(Z))
    r[n] !== void 0 && s[n] !== void 0 && JSON.stringify(r[n]) !== JSON.stringify(s[n]) && m.push(`${y} (本地: ${JSON.stringify(r[n])} / 云端: ${JSON.stringify(s[n])})`);
  m.length > 0 && o.push({
    category: "settings",
    categoryLabel: "系统设置",
    action: "modified",
    badge: { text: `±${m.length}`, type: "diff" },
    text: `存在差异的配置项: ${m.join("；")}`
  });
  const g = (n, y, N) => {
    const C = Array.isArray(r[n]) ? r[n] : [], R = Array.isArray(s[n]) ? s[n] : [];
    if (JSON.stringify(C) === JSON.stringify(R)) return;
    const q = (d, O) => d && typeof d == "object" && d.id != null ? String(d.id) : `#${O}:${JSON.stringify(d)}`, M = new Map(C.map((d, O) => [q(d, O), JSON.stringify(d)])), H = new Map(R.map((d, O) => [q(d, O), JSON.stringify(d)]));
    let J = 0, P = 0, B = 0;
    for (const [d, O] of H)
      M.has(d) ? M.get(d) !== O && B++ : J++;
    for (const d of M.keys())
      H.has(d) || P++;
    const A = [];
    J && A.push(`仅云端 ${J} ${N}`), P && A.push(`仅本地 ${P} ${N}`), B && A.push(`内容差异 ${B} ${N}`), A.length || A.push("排序或格式存在差异"), o.push({
      category: "backpack",
      categoryLabel: y,
      action: "modified",
      badge: { text: `本地 ${C.length} / 云端 ${R.length}`, type: "diff" },
      text: `${y}不一致（${A.join("，")}）`
    });
  };
  if (g("logicweaver_prompt_backpack_v1", "提示词背包", "条"), g("logicweaver_saved_articles_v1", "收藏文章", "篇"), o.length === 0) {
    const n = c.length, y = h.size;
    o.push({
      category: "other",
      categoryLabel: "对比结果",
      action: "modified",
      text: `本地与云端数据完全一致（常用网站 ${n} 个，Star 分组 ${y} 个）`
    });
  }
  return o;
}
function D(e) {
  if (!Array.isArray(e) || e.some((t) => !S(t) || typeof t.id != "string"))
    throw new w("数字员工配置格式无效，未生成不完整的备份");
  return e.map((t) => {
    const { lastRunAt: o, nextEligibleAt: r, lastError: s, ...f } = t;
    return { ...f, enabled: !1 };
  });
}
function ye(e, t) {
  const o = D(e), r = new Map((Array.isArray(t) ? t : []).filter(S).map((s) => [s.id, s]));
  return o.map((s) => {
    const f = r.get(s.id);
    if (!f) return s;
    const c = { ...s, enabled: f.enabled === !0 };
    for (const p of ["lastRunAt", "nextEligibleAt", "lastError"])
      Object.hasOwn(f, p) && (c[p] = f[p]);
    return c;
  });
}
const de = [
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
], we = "customShortcuts", Se = "searchIgnoredBookmarkFolders", me = "customNewtabAvatar", _e = "customAvatar", E = [
  ...de,
  we,
  Se,
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
  me,
  _e
];
function be(e) {
  return Q(e, E);
}
const F = [
  "logicweaver_prompt_backpack_v1",
  "logicweaver_prompt_backpack_categories_v1",
  "logicweaver_saved_articles_v1",
  "logicweaver_saved_article_categories_v1"
], T = /* @__PURE__ */ new Set([
  "quickLinks",
  "quickLinkGroupSizes",
  "launcherFolders",
  "launcherPages",
  "launcherPageLabels",
  "launcherActivePage",
  "quickLinksReady"
]);
async function Ae() {
  if (x()) {
    const t = await j(null), o = {};
    for (const s of E)
      t[s] !== void 0 && (o[s] = t[s]);
    const r = Object.keys(t).filter((s) => s.startsWith("ghLocalStarGroupsV1:"));
    if (r.length) {
      const s = {};
      for (const f of r) s[f] = t[f];
      o.ghLocalStarGroupsV1 = s;
    }
    if (o.digitalEmployeesV1 !== void 0 && (o.digitalEmployeesV1 = D(o.digitalEmployeesV1)), typeof localStorage < "u") {
      const s = ["ghUser", "ghToken", "todoistToken", "googleCalendarSessionTokenV1", "lw_webdav_config", "biliRadioSeriesV1", "gh_my_repo_groups_v2", "gh_my_repo_groups_map_v2", ...F];
      for (const c of s)
        if (o[c] === void 0) {
          const p = localStorage.getItem(c) ?? (c === "biliRadioSeriesV1" ? localStorage.getItem("lw_backup_bili_radio_series") : null);
          if (p !== null)
            try {
              o[c] = JSON.parse(p);
            } catch {
              o[c] = p;
            }
        }
      const f = Object.keys(localStorage).filter((c) => c.startsWith("ghLocalStarGroupsV1:"));
      if (f.length && !o.ghLocalStarGroupsV1) {
        const c = {};
        for (const p of f) {
          const l = localStorage.getItem(p);
          if (l)
            try {
              c[p] = JSON.parse(l);
            } catch {
              c[p] = l;
            }
        }
        Object.keys(c).length && (o.ghLocalStarGroupsV1 = c);
      }
      for (const c of ["lw-rss-channels-v1", "lw-rss-selected-v1"]) {
        const p = localStorage.getItem(c);
        if (p === null) {
          delete o[c];
          continue;
        }
        if (c === "lw-rss-selected-v1") o[c] = p;
        else
          try {
            o[c] = JSON.parse(p);
          } catch {
            throw new w("RSS 订阅数据格式无效，未生成备份");
          }
      }
      for (const c of T) {
        if (!E.includes(c)) continue;
        if (o[c] === void 0) {
          const l = localStorage.getItem(`logicweaver:${c}`) ?? localStorage.getItem(c);
          if (l)
            try {
              const a = JSON.parse(l);
              a !== void 0 && (!Array.isArray(a) || a.length > 0) && (o[c] = a);
            } catch {
            }
        }
      }
    }
    return o;
  }
  if (typeof localStorage > "u") throw new Error("本地存储不可用");
  const e = {};
  for (const t of E) {
    const o = (T.has(t) ? localStorage.getItem(`logicweaver:${t}`) : null) ?? localStorage.getItem(t);
    if (o !== null)
      try {
        e[t] = JSON.parse(o);
      } catch {
        e[t] = o;
      }
  }
  return e.digitalEmployeesV1 !== void 0 && (e.digitalEmployeesV1 = D(e.digitalEmployeesV1)), e;
}
async function $e(e, t = {}) {
  const o = ge(e, E, t), r = { ...o.sanitized }, s = F.slice(0, 2).some((l) => Object.hasOwn(r, l)), f = F.slice(2).some((l) => Object.hasOwn(r, l)), c = [s && re, f && se].filter((l) => !!l), p = c.map((l) => `tab-project:backpack:${l}`);
  if (Object.hasOwn(r, "quickLinks") && (r.quickLinksReady = !0), x()) {
    const l = async () => {
      t.beforeCommit && await t.beforeCommit();
      const a = { ...r };
      if (Object.hasOwn(r, "digitalEmployeesV1")) {
        const i = await j("digitalEmployeesV1");
        a.digitalEmployeesV1 = ye(r.digitalEmployeesV1, i.digitalEmployeesV1), a.digitalEmployeeOrganizerSeededV1 = !0;
      }
      if (c.length) {
        const i = await j(c);
        for (const u of c) {
          const h = oe(i[u]);
          if (h >= Number.MAX_SAFE_INTEGER) throw new w("背包版本号已耗尽，未恢复数据");
          a[u] = h + 1;
        }
      }
      await K(a);
    };
    if (p.length) {
      if (typeof navigator > "u" || !navigator.locks) throw new w("浏览器缺少背包写入锁或收藏写入锁，未恢复任何数据");
      const a = async (i) => {
        if (i >= p.length) return l();
        await navigator.locks.request(p[i], () => a(i + 1));
      };
      await a(0);
    } else await l();
    if (r.ghLocalStarGroupsV1 && typeof r.ghLocalStarGroupsV1 == "object") {
      const a = r.ghLocalStarGroupsV1, i = {};
      for (const [u, h] of Object.entries(a))
        if (u.startsWith("ghLocalStarGroupsV1:") && (i[u] = h, typeof localStorage < "u"))
          try {
            localStorage.setItem(u, JSON.stringify(h));
          } catch {
          }
      if (typeof a.owner == "string" && a.owner) {
        const u = `ghLocalStarGroupsV1:${a.owner}`;
        if (i[u] = a, typeof localStorage < "u")
          try {
            localStorage.setItem(u, JSON.stringify(a));
          } catch {
          }
      }
      Object.keys(i).length && await K(i).catch(() => {
      });
    }
    if (typeof localStorage < "u")
      for (const [a, i] of Object.entries(r))
        try {
          const u = JSON.stringify(i);
          T.has(a) && localStorage.setItem(`logicweaver:${a}`, u), localStorage.setItem(a, (a === "theme" || a === "lw-rss-selected-v1") && typeof i == "string" ? i : u);
        } catch {
        }
  } else {
    if (p.length) throw new w("当前环境无法安全恢复背包，未修改数据");
    if (t.beforeCommit && await t.beforeCommit(), typeof localStorage > "u") throw new Error("本地存储不可用");
    const l = Object.entries(r).flatMap(([i, u]) => {
      const h = (i === "theme" || i === "lw-rss-selected-v1") && typeof u == "string" ? u : JSON.stringify(u);
      return T.has(i) ? [[i, h], [`logicweaver:${i}`, h]] : [[i, h]];
    }), a = new Map(l.map(([i]) => [i, localStorage.getItem(i)]));
    try {
      for (const [i, u] of l) localStorage.setItem(i, u);
    } catch {
      let i = !0;
      for (const [u, h] of a)
        try {
          h === null ? localStorage.removeItem(u) : localStorage.setItem(u, h);
        } catch {
          i = !1;
        }
      throw new Error(i ? "恢复失败，已回滚本次写入；请检查本地存储空间" : "恢复失败且部分数据无法回滚，请勿继续编辑，先检查本地存储与备份");
    }
  }
  if (typeof localStorage < "u" && Object.hasOwn(r, "biliRadioSeriesV1"))
    try {
      const l = JSON.stringify(r.biliRadioSeriesV1);
      localStorage.setItem("biliRadioSeriesV1", l), localStorage.setItem("lw_backup_bili_radio_series", l);
    } catch {
    }
  if (typeof window < "u")
    try {
      window.dispatchEvent(new CustomEvent("logicweaver:sync-restored", { detail: r }));
    } catch {
    }
  return { restoredCount: o.count, clientDevice: o.clientDevice };
}
const z = "lw_last_synced_snapshot_v1";
async function Ne(e, t) {
  const o = t || await pe();
  let r = null;
  if (typeof localStorage < "u") {
    const l = localStorage.getItem(z);
    if (l)
      try {
        r = JSON.parse(l);
      } catch {
      }
  }
  const s = be(e).sanitized, f = Object.fromEntries(Object.entries(s).filter(([l]) => !Y.has(l))), c = r && Object.fromEntries(Object.entries(r).filter(([l]) => !Y.has(l))), p = he(c, f);
  if (typeof localStorage < "u")
    try {
      localStorage.setItem(z, JSON.stringify(f));
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
    changeSummary: p,
    settings: s
  };
}
export {
  F as B,
  E as S,
  Oe as a,
  Ne as b,
  W as c,
  w as d,
  be as e,
  $e as f,
  Le as g,
  S as i,
  ge as p,
  Ae as r
};
