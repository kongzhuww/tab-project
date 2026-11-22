function $(g, t) {
  const r = new AbortController(), e = () => r.abort(g?.reason);
  g?.aborted ? e() : g?.addEventListener("abort", e, { once: !0 });
  const i = setTimeout(() => r.abort(new DOMException("视频加载超时，请手动重试", "TimeoutError")), t);
  return { signal: r.signal, dispose() {
    clearTimeout(i), g?.removeEventListener("abort", e), r.abort();
  } };
}
class F {
  start() {
    return this.cancel(), this.controller = new AbortController(), this.controller.signal;
  }
  cancel() {
    this.controller?.abort();
  }
}
function N(g) {
  const t = {};
  if (g?.emote && typeof g.emote == "object")
    for (const [r, e] of Object.entries(g.emote)) {
      const i = e?.url || e?.gif_url;
      typeof i == "string" && i && (t[r] = i.replace(/^http:/i, "https:"));
    }
  return t;
}
function T(g) {
  const t = {};
  if (g?.at_name_to_mid && typeof g.at_name_to_mid == "object")
    for (const [r, e] of Object.entries(g.at_name_to_mid)) {
      const i = String(r || "").trim(), a = e != null ? String(e).trim() : "";
      i && /^\d+$/.test(a) && (t[i] = a);
    }
  if (Array.isArray(g?.members))
    for (const r of g.members) {
      const e = String(r?.uname || "").trim(), i = r?.mid !== void 0 && r?.mid !== null ? String(r.mid).trim() : "";
      e && /^\d+$/.test(i) && !t[e] && (t[e] = i);
    }
  return t;
}
function j(g) {
  return Array.isArray(g) ? g.flatMap((t) => {
    const r = typeof t == "string" ? t : t?.img_src;
    if (typeof r != "string" || !r.trim()) return [];
    try {
      const e = new URL(r.trim().replace(/^http:/i, "https:").replace(/^\/\//, "https://"));
      return e.protocol === "https:" && !e.username && !e.password ? [e.href] : [];
    } catch {
      return [];
    }
  }) : [];
}
function U(g) {
  function t(u, d) {
    return u << d | u >>> 32 - d;
  }
  const r = [7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21], e = new Array(64).fill(0).map((u, d) => Math.floor(Math.abs(Math.sin(d + 1)) * 2 ** 32)), i = new TextEncoder().encode(g), a = i.length * 8, n = new Uint8Array((Math.floor((i.length + 8) / 64) + 1) * 64);
  n.set(i), n[i.length] = 128;
  const p = new DataView(n.buffer);
  p.setUint32(n.length - 8, a >>> 0, !0), p.setUint32(n.length - 4, Math.floor(a / 4294967296), !0);
  let o = 1732584193, l = 4023233417, s = 2562383102, f = 271733878;
  for (let u = 0; u < n.length; u += 64) {
    const d = new Array(16);
    for (let b = 0; b < 16; b++) d[b] = p.getUint32(u + b * 4, !0);
    let h = o, w = l, y = s, m = f;
    for (let b = 0; b < 64; b++) {
      let k, v;
      b < 16 ? (k = w & y | ~w & m, v = b) : b < 32 ? (k = m & w | ~m & y, v = (5 * b + 1) % 16) : b < 48 ? (k = w ^ y ^ m, v = (3 * b + 5) % 16) : (k = y ^ (w | ~m), v = 7 * b % 16);
      const A = k + h + e[b] + d[v] >>> 0;
      h = m, m = y, y = w, w = w + t(A, r[b]) >>> 0;
    }
    o = o + h >>> 0, l = l + w >>> 0, s = s + y >>> 0, f = f + m >>> 0;
  }
  function c(u) {
    let d = "";
    for (let h = 0; h < 4; h++) d += (u >>> h * 8 & 255).toString(16).padStart(2, "0");
    return d;
  }
  return c(o) + c(l) + c(s) + c(f);
}
const B = [
  46,
  47,
  18,
  2,
  53,
  8,
  23,
  32,
  15,
  50,
  10,
  31,
  58,
  3,
  45,
  35,
  27,
  43,
  5,
  49,
  33,
  9,
  42,
  19,
  29,
  28,
  14,
  39,
  12,
  38,
  41,
  13,
  37,
  48,
  7,
  16,
  24,
  55,
  40,
  61,
  26,
  17,
  0,
  1,
  60,
  51,
  30,
  4,
  22,
  25,
  54,
  21,
  56,
  59,
  6,
  63,
  57,
  62,
  11,
  36,
  20,
  34,
  44,
  52
];
function C(g, t, r) {
  const e = B.map((l) => (t + r)[l]).join("").slice(0, 32), i = Math.round(Date.now() / 1e3), a = { ...g, wts: i }, p = Object.keys(a).sort().map((l) => encodeURIComponent(l) + "=" + encodeURIComponent(String(a[l]).replace(/[!'()*]/g, ""))).join("&"), o = U(p + e);
  return {
    signedQuery: `${p}&w_rid=${o}`,
    w_rid: o,
    wts: i
  };
}
function M(g) {
  const t = g.replace(/^\uFEFF/, "").split(/\r?\n/), r = [];
  let e = [];
  const i = () => {
    const a = e.filter((n) => !/^\d+$/.test(n) && !n.includes("-->") && !/^(WEBVTT|Kind:|Language:)/i.test(n)).join(`\r
`).trim();
    a && r.push(a), e = [];
  };
  for (const a of t) {
    const n = a.trim();
    n === "" ? i() : e.push(n);
  }
  return i(), r.join(`\r
`);
}
function L(g, t = "") {
  if ((t || "").split(".").pop()?.toLowerCase() === "json" || /^\s*[\[{]/.test(g))
    try {
      const e = JSON.parse(g), i = e?.body || e?.data?.body || (Array.isArray(e) ? e : null);
      if (Array.isArray(i) && i.length) {
        const a = i.map((n) => n && typeof n == "object" ? n.content : String(n)).filter((n) => n && String(n).trim());
        if (a.length) return a.join(`\r
`);
      }
    } catch {
    }
  if (g.includes("[Events]")) {
    const e = g.split(/\r?\n/).filter((i) => /^Dialogue:/i.test(i));
    if (e.length) {
      const i = e.map((a) => a.split(",").slice(9).join(",").replace(/\{[^}]*\}/g, "").replace(/\\N/g, `\r
`).trim()).filter(Boolean);
      if (i.length) return i.join(`\r
`);
    }
  }
  return M(g);
}
function E(g) {
  const t = Number(g);
  return t >= 120 ? "4K" : t === 116 ? "1080P60" : t === 112 ? "1080P+" : t === 80 ? "1080P" : t === 74 ? "720P60" : t === 64 ? "720P" : t === 32 ? "480P" : t === 16 ? "360P" : t > 0 ? `${t}P` : "清晰度";
}
function R(g, t = "") {
  if (t && typeof t == "string" && t.trim()) return t.trim();
  const r = Number(g);
  return r >= 120 ? "超清 4K" : r === 116 ? "高清 1080P 60帧" : r === 112 ? "高清 1080P+ 高码率" : r === 80 ? "高清 1080P" : r === 74 ? "高码率 720P 60帧" : r === 64 ? "高清 720P" : r === 32 ? "清晰 480P" : r === 16 ? "流畅 360P" : `${r}P`;
}
class P {
  constructor() {
  }
  static getInstance() {
    return P.instance || (P.instance = new P()), P.instance;
  }
  async loadTree() {
    if (typeof chrome < "u" && chrome.storage?.local)
      try {
        const t = await chrome.storage.local.get("foTree");
        if (t?.foTree?.children) return t.foTree;
      } catch {
      }
    if (typeof localStorage < "u")
      try {
        const t = localStorage.getItem("foTree");
        if (t) {
          const r = JSON.parse(t);
          if (r?.children) return r;
        }
      } catch {
      }
    return { id: "root", type: "folder", children: [] };
  }
  async saveTree(t) {
    if (typeof chrome < "u" && chrome.storage?.local)
      try {
        await chrome.storage.local.set({ foTree: t });
      } catch {
      }
    if (typeof localStorage < "u")
      try {
        localStorage.setItem("foTree", JSON.stringify(t));
      } catch {
      }
  }
  async loadCollapsedGroups() {
    let t = [];
    if (typeof chrome < "u" && chrome.storage?.local)
      try {
        const r = await chrome.storage.local.get("foCollapsedGroupsV1");
        Array.isArray(r?.foCollapsedGroupsV1) && (t = r.foCollapsedGroupsV1.map(String));
      } catch {
      }
    if (!t.length && typeof localStorage < "u")
      try {
        const r = localStorage.getItem("foCollapsedGroupsV1");
        if (r) {
          const e = JSON.parse(r);
          Array.isArray(e) && (t = e.map(String));
        }
      } catch {
      }
    return new Set(t);
  }
  async saveCollapsedGroups(t) {
    const r = Array.from(t);
    if (typeof chrome < "u" && chrome.storage?.local)
      try {
        await chrome.storage.local.set({ foCollapsedGroupsV1: r });
      } catch {
      }
    if (typeof localStorage < "u")
      try {
        localStorage.setItem("foCollapsedGroupsV1", JSON.stringify(r));
      } catch {
      }
  }
  findNode(t, r) {
    if (!t) return null;
    if (String(t.id) === String(r)) return t;
    for (const e of t.children || []) {
      const i = this.findNode(e, r);
      if (i) return i;
    }
    return null;
  }
  findParent(t, r) {
    if (!t) return null;
    for (const e of t.children || []) {
      if (String(e.id) === String(r)) return t;
      const i = this.findParent(e, r);
      if (i) return i;
    }
    return null;
  }
  removeNodeById(t, r) {
    if (!t?.children) return !1;
    const e = t.children.findIndex((i) => String(i.id) === String(r));
    if (e >= 0)
      return t.children.splice(e, 1), !0;
    for (const i of t.children)
      if (this.removeNodeById(i, r)) return !0;
    return !1;
  }
  isDescendant(t, r) {
    if (!t) return !1;
    if (String(t.id) === String(r)) return !0;
    for (const e of t.children || [])
      if (this.isDescendant(e, r)) return !0;
    return !1;
  }
  createGroupNode(t) {
    return {
      id: "f" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      type: "folder",
      name: t,
      children: []
    };
  }
  unwrapGroup(t, r) {
    const e = this.findParent(t, r) || t, i = (e.children || []).findIndex((n) => String(n.id) === String(r));
    if (i < 0) return !1;
    const a = e.children[i];
    return e.children.splice(i, 1, ...a.children || []), !0;
  }
  moveNode(t, r, e, i, a) {
    let n = this.findNode(t, r);
    n || (n = { id: String(r), type: "fav", name: a || "收藏夹", children: [] });
    const p = String(e) === "root" ? t : this.findNode(t, e);
    if (!n || !p || n === p || n.type === "folder" && this.isDescendant(n, p.id))
      return !1;
    if (this.removeNodeById(t, n.id), p === t || i === "into" && p.type === "folder")
      Array.isArray(p.children) || (p.children = []), p.children.push(n);
    else {
      const o = this.findParent(t, p.id) || t;
      Array.isArray(o.children) || (o.children = []);
      const l = Math.max(0, o.children.findIndex((s) => String(s.id) === String(p.id)));
      o.children.splice(l + (i === "after" ? 1 : 0), 0, n);
    }
    return !0;
  }
  syncTreeWithFolders(t, r) {
    let e = !1;
    const i = /* @__PURE__ */ new Map();
    for (const o of r)
      i.set(String(o.id || o.fid), o);
    const a = (o) => {
      if (o.children)
        for (let l = o.children.length - 1; l >= 0; l--) {
          const s = o.children[l];
          if (s.type === "fav")
            if (!i.has(String(s.id)))
              o.children.splice(l, 1), e = !0;
            else {
              const f = i.get(String(s.id));
              f?.title && s.name !== f.title && (s.name = f.title, e = !0);
            }
          else
            a(s);
        }
    };
    a(t);
    const n = /* @__PURE__ */ new Set(), p = (o) => {
      for (const l of o.children || [])
        l.type === "fav" ? n.add(String(l.id)) : p(l);
    };
    p(t), t.children || (t.children = []);
    for (const o of r) {
      const l = String(o.id || o.fid);
      n.has(l) || (t.children.push({
        id: l,
        type: "fav",
        name: o.title || "未命名收藏夹",
        children: []
      }), e = !0);
    }
    return e;
  }
  flattenTree(t, r, e, i) {
    const a = new Map((r || []).map((s) => [String(s.id || s.fid), s])), n = [], p = /* @__PURE__ */ new Set(), o = (s) => (s.children || []).reduce(
      (f, c) => f + (c.type === "fav" ? 1 : o(c)),
      0
    ), l = (s, f = 0) => {
      for (const c of s.children || []) {
        const u = String(c.id), d = a.get(u), h = c.type === "folder";
        h || p.add(u);
        const w = h && e.has(u), y = !h && u === String(i);
        n.push({
          id: u,
          title: String(c.name || d?.title || "未命名收藏夹"),
          count: Number(h ? o(c) : d?.media_count || 0),
          kind: d?.isCollected ? "collected" : d?.isOther ? "other" : "created",
          depth: f,
          group: h,
          collapsed: w,
          selected: y,
          writable: !h && !d?.isCollected && !d?.isOther
        }), h && !w && l(c, f + 1);
      }
    };
    l(t, 0);
    for (const s of r || []) {
      const f = String(s.id || s.fid);
      n.some((c) => !c.group && c.id === f) || !s.isCollected && !s.isOther && p.has(f) || n.push({
        id: f,
        title: s.title || "未命名收藏",
        count: Number(s.media_count || 0),
        kind: s.isCollected ? "collected" : s.isOther ? "other" : "created",
        depth: 0,
        group: !1,
        collapsed: !1,
        selected: f === String(i),
        writable: !s.isCollected && !s.isOther
      });
    }
    return n;
  }
}
class x {
  constructor() {
    this.currentUser = null, this.writeQueue = Promise.resolve(), this.lastWriteTime = 0, this.wbiKeysCache = null, this.treeManager = P.getInstance();
  }
  static getInstance() {
    return x.instance || (x.instance = new x()), x.instance;
  }
  /**
   * 底层 B站 API 请求器 (携带凭据与跨域支持)
   */
  async api(t, r = {}) {
    const e = await fetch(t, {
      ...r,
      credentials: "include",
      headers: {
        Accept: "application/json",
        ...r.headers || {}
      }
    });
    if (!e.ok)
      throw Object.assign(new Error(`Bilibili API 请求失败 [${e.status}]: ${e.statusText}`), { status: e.status });
    const i = await e.json();
    if (i.code !== 0 && i.code !== void 0)
      throw Object.assign(new Error(i.message || i.msg || `Bilibili 接口返回错误码 ${i.code}`), { code: i.code });
    return i.data !== void 0 ? i.data : i;
  }
  /**
   * 从 Chrome Cookies 或 document.cookie 中提取 bili_jct (CSRF)
   */
  async getBiliJct() {
    if (typeof chrome < "u" && chrome.cookies?.get)
      try {
        for (const t of ["https://bilibili.com", "https://www.bilibili.com", "https://api.bilibili.com"]) {
          const r = await chrome.cookies.get({ url: t, name: "bili_jct" });
          if (r?.value) return r.value;
        }
      } catch {
      }
    if (typeof document < "u") {
      const t = document.cookie.match(/(?:^|;\s*)bili_jct=([^;]+)/);
      if (t) return decodeURIComponent(t[1]);
    }
    return "";
  }
  /**
   * 写入限频队列 (默认 650ms 保护间隔)
   */
  async enqueueWrite(t, r = 650) {
    const e = async () => {
      const a = Date.now() - this.lastWriteTime;
      a < r && await new Promise((n) => setTimeout(n, r - a));
      try {
        const n = await t();
        return this.lastWriteTime = Date.now(), n;
      } catch (n) {
        throw this.lastWriteTime = Date.now(), n;
      }
    }, i = this.writeQueue.then(e, e);
    return this.writeQueue = i.catch(() => {
    }), i;
  }
  formatBiliApiError(t, r) {
    return t === 11007 || t === -412 ? "操作过于频繁，请稍候再试" : t === -101 ? "账号未登录或登录态已失效" : t === 11002 ? "视频已存在于目标收藏夹" : t === 11003 ? "收藏夹不存在或已被删除" : r || `B站接口返回错误码 ${t}`;
  }
  /**
   * 获取当前登录用户信息
   */
  async getUserNav() {
    const t = await this.api("https://api.bilibili.com/x/web-interface/nav");
    return this.currentUser = {
      isLogin: !!t?.isLogin,
      mid: Number(t?.mid || 0),
      uname: String(t?.uname || ""),
      face: String(t?.face || ""),
      level: Number(t?.level_info?.current_level || 0)
    }, this.currentUser;
  }
  getCachedUser() {
    return this.currentUser;
  }
  /**
   * 获取用户创建的所有收藏夹
   */
  async getCreatedFolders(t) {
    let r = t;
    if (r || (this.currentUser || await this.getUserNav(), r = this.currentUser?.mid), !r) throw new Error("无法获取 B 站用户 MID，请先登录");
    return (await this.api(
      `https://api.bilibili.com/x/v3/fav/folder/created/list-all?up_mid=${r}&type=0`
    ))?.list || [];
  }
  /**
   * 获取用户订阅/收藏的公开收藏夹及合集
   */
  async getCollectedFolders(t = 1, r = 50, e) {
    let i = e;
    i || (this.currentUser || await this.getUserNav(), i = this.currentUser?.mid);
    const a = await this.api(
      `https://api.bilibili.com/x/v3/fav/folder/collected/list?pn=${t}&ps=${r}&up_mid=${i || ""}&platform=web`
    ), p = (a?.list || []).map((o) => ({
      id: o.id,
      fid: o.fid || o.id,
      title: o.title,
      media_count: Number(o.media_count || 0),
      cover: (o.cover || "").replace(/^http:/, "https:"),
      upper: o.upper || { name: o.owner?.name || "UP主", mid: o.mid },
      isCollected: !0,
      isSeason: o.type === 21 || !!o.season,
      type: o.type
    }));
    return {
      count: Number(a?.count || p.length),
      list: p
    };
  }
  /**
   * 获取系统虚拟收藏夹 (稍后再看、我的追番、播放历史)
   */
  getOtherFolders() {
    return [
      {
        id: "__history__",
        fid: "__history__",
        title: "播放历史",
        media_count: 0,
        icon: "📜",
        isOther: !0,
        otherType: "history"
      },
      {
        id: "__toview__",
        fid: "__toview__",
        title: "稍后再看",
        media_count: 0,
        icon: "⏱️",
        isOther: !0,
        otherType: "toview"
      },
      {
        id: "__bangumi__",
        fid: "__bangumi__",
        title: "我的追番",
        media_count: 0,
        icon: "🎬",
        isOther: !0,
        otherType: "bangumi"
      }
    ];
  }
  /**
   * 读取用户最近观看的历史记录
   */
  async getWatchHistory(t = 1, r = 24) {
    const e = await this.api(`https://api.bilibili.com/x/v2/history?pn=${t}&ps=${r}`), a = (Array.isArray(e) ? e : e?.list || []).map((n) => ({
      id: n.aid || n.history?.oid || n.id,
      type: 2,
      title: n.title || n.tag_name || "视频记录",
      cover: (n.pic || "").replace(/^http:/, "https:"),
      duration: n.duration || 0,
      upper: n.owner ? { mid: n.owner.mid, name: n.owner.name, face: n.owner.face } : n.author ? { mid: n.mid || 0, name: n.author, face: "" } : void 0,
      cnt_info: {
        play: n.stat?.view || 0,
        danmaku: n.stat?.danmaku || 0,
        collect: n.stat?.favorite || 0
      },
      bvid: n.bvid || n.history?.bvid || "",
      fav_time: n.view_at || n.progress
    }));
    return { medias: a, total: Number(e?.total || a.length) };
  }
  /**
   * 读取稍后再看列表
   */
  async getToViewVideos() {
    const t = await this.api("https://api.bilibili.com/x/v2/history/toview"), e = (t?.list || []).map((i) => ({
      id: i.aid || i.id,
      type: 2,
      title: i.title,
      cover: (i.pic || "").replace(/^http:/, "https:"),
      duration: i.duration || 0,
      upper: i.owner ? { mid: i.owner.mid, name: i.owner.name, face: i.owner.face } : void 0,
      cnt_info: {
        play: i.stat?.view || 0,
        danmaku: i.stat?.danmaku || 0,
        collect: i.stat?.favorite || 0
      },
      bvid: i.bvid,
      fav_time: i.add_at || i.progress
    }));
    return { medias: e, total: Number(t?.count || e.length) };
  }
  /**
   * 读取我的追番列表
   */
  async getBangumiFollows(t = 1, r = 24, e) {
    let i = e;
    i || (this.currentUser || await this.getUserNav(), i = this.currentUser?.mid);
    const a = await this.api(
      `https://api.bilibili.com/x/space/bangumi/follow/list?type=1&follow_status=0&pn=${t}&ps=${r}&vmid=${i || ""}`
    ), p = (a?.list || []).map((o) => ({
      id: o.season_id,
      type: 21,
      title: o.title,
      cover: (o.cover || "").replace(/^http:/, "https:"),
      duration: 0,
      upper: { mid: 0, name: o.season_type_name || "番剧", face: "" },
      cnt_info: {
        play: o.stat?.view || 0,
        danmaku: o.stat?.danmaku || 0,
        collect: o.stat?.follow || 0
      },
      link: o.url,
      bvid: o.new_ep?.bvid || "",
      intro: o.evaluate
    }));
    return { medias: p, total: Number(a?.total || p.length) };
  }
  /**
   * 读取合集/系列视频
   */
  async getSeasonVideos(t, r = 1, e = 24) {
    const i = await this.api(
      `https://api.bilibili.com/x/space/fav/season/list?season_id=${t}&pn=${r}&ps=${e}&platform=web`
    ), a = i?.medias || [];
    return {
      medias: a,
      total: Number(i?.info?.media_count || a.length)
    };
  }
  /**
   * 统一分页获取视频资源列表 (自动适配自建/合集/稍后再看/追番)
   */
  async getFolderVideos(t, r = 1, e = 20, i = "mtime", a = "") {
    const n = String(t);
    if (n === "__history__") {
      const c = await this.getWatchHistory(r, e);
      let u = c.medias;
      if (a.trim()) {
        const d = a.toLowerCase();
        u = u.filter((h) => h.title.toLowerCase().includes(d) || h.upper?.name && h.upper.name.toLowerCase().includes(d));
      }
      return {
        info: { title: "播放历史", media_count: c.total },
        medias: u,
        hasMore: r * e < c.total,
        total: c.total
      };
    }
    if (n === "__toview__") {
      const c = await this.getToViewVideos();
      let u = c.medias;
      if (a.trim()) {
        const d = a.toLowerCase();
        u = u.filter((h) => h.title.toLowerCase().includes(d) || h.upper?.name && h.upper.name.toLowerCase().includes(d));
      }
      return {
        info: { title: "稍后再看", media_count: c.total },
        medias: u.slice((r - 1) * e, r * e),
        hasMore: r * e < u.length,
        total: u.length
      };
    }
    if (n === "__bangumi__") {
      const c = await this.getBangumiFollows(r, e);
      return {
        info: { title: "我的追番", media_count: c.total },
        medias: c.medias,
        hasMore: r * e < c.total,
        total: c.total
      };
    }
    if (n.startsWith("season:")) {
      const c = n.replace("season:", ""), u = await this.getSeasonVideos(c, r, e);
      return {
        info: { title: "合集内容", media_count: u.total },
        medias: u.medias,
        hasMore: r * e < u.total,
        total: u.total
      };
    }
    let p = `https://api.bilibili.com/x/v3/fav/resource/list?media_id=${t}&pn=${r}&ps=${e}&order=${i}&platform=web`;
    a.trim() && (p += `&keyword=${encodeURIComponent(a.trim())}`);
    const o = await this.api(p), l = o?.medias || [], s = !!o?.has_more, f = Number(o?.info?.media_count || l.length);
    return {
      info: o?.info,
      medias: l,
      hasMore: s,
      total: f
    };
  }
  /**
   * 在 B站 创建新的收藏夹
   */
  async createRemoteFolder(t, r = 0) {
    const e = await this.getBiliJct();
    if (!e) return { ok: !1, reason: "没有取得 B站 CSRF 登录凭据，请先重新登录 B站" };
    try {
      const i = new URLSearchParams({ title: t, intro: "", privacy: String(r === 0 ? 0 : 1), csrf: e }), a = await fetch("https://api.bilibili.com/x/v3/fav/folder/add", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        },
        body: i.toString()
      }), n = await a.json().catch(() => ({}));
      return n?.code === 0 && n.data ? { ok: !0, folder: n.data } : { ok: !1, reason: n?.message || `B站接口 ${n?.code ?? a.status}` };
    } catch (i) {
      return { ok: !1, reason: i?.message || "创建 B站收藏夹失败" };
    }
  }
  /**
   * 移动视频至其他收藏夹 (单项或批量)
   */
  async moveVideo(t, r, e, i) {
    return this.enqueueWrite(async () => {
      const a = await this.getBiliJct();
      if (!a) return { ok: !1, reason: "取不到 csrf（bili_jct）" };
      try {
        const n = Array.isArray(e) ? e.map((s) => String(s).includes(":") ? String(s) : `${s}:2`).join(",") : String(e).includes(":") ? String(e) : `${e}:2`, p = new URLSearchParams({
          src_media_id: String(t),
          tar_media_id: String(r),
          mid: String(i || this.currentUser?.mid || ""),
          resources: n,
          platform: "web",
          csrf: a
        }), l = await (await fetch("https://api.bilibili.com/x/v3/fav/resource/move", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json"
          },
          body: p.toString()
        })).json();
        return l.code === 0 ? { ok: !0 } : { ok: !1, code: l.code, reason: this.formatBiliApiError(l.code, l.message) };
      } catch (n) {
        return { ok: !1, reason: n.message || "移动视频失败" };
      }
    });
  }
  /**
   * 从收藏夹删除视频 (取消收藏)
   */
  async deleteVideo(t, r, e = 2) {
    return this.enqueueWrite(async () => {
      let i = 0;
      for (; ; ) {
        i++;
        const a = await this.getBiliJct();
        if (!a) return { ok: !1, reason: "取不到 csrf（bili_jct）" };
        try {
          const n = new URLSearchParams({
            csrf: a,
            rid: String(r),
            type: "2",
            add_media_ids: "",
            del_media_ids: String(t),
            platform: "web"
          }), o = await (await fetch("https://api.bilibili.com/x/v3/fav/resource/deal", {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Accept: "application/json"
            },
            body: n.toString()
          })).json();
          if (o.code === 0) return { ok: !0 };
          if ((o.code === 11007 || o.code === -412 || /频繁|稍后|频率/.test(o.message || "")) && i <= e) {
            await new Promise((s) => setTimeout(s, 850 * i));
            continue;
          }
          return { ok: !1, code: o.code, reason: this.formatBiliApiError(o.code, o.message) };
        } catch (n) {
          if (i <= e) {
            await new Promise((p) => setTimeout(p, 600));
            continue;
          }
          return { ok: !1, reason: n.message };
        }
      }
    });
  }
  /**
   * 添加视频到收藏夹
   */
  async addVideoToFavorite(t, r) {
    return this.enqueueWrite(async () => {
      const e = await this.getBiliJct();
      if (!e) return { ok: !1, reason: "取不到 csrf（bili_jct）" };
      try {
        const i = new URLSearchParams({
          rid: String(r),
          type: "2",
          add_media_ids: String(t),
          del_media_ids: "",
          platform: "web",
          csrf: e
        }), n = await (await fetch("https://api.bilibili.com/x/v3/fav/resource/deal", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json"
          },
          body: i.toString()
        })).json();
        return n.code === 0 ? { ok: !0 } : { ok: !1, code: n.code, reason: this.formatBiliApiError(n.code, n.message) };
      } catch (i) {
        return { ok: !1, reason: i.message };
      }
    });
  }
  /**
   * 获取视频详情与分P信息
   */
  async getVideoView(t, r) {
    return this.api(`https://api.bilibili.com/x/web-interface/view?bvid=${encodeURIComponent(t)}`, { signal: r });
  }
  /**
   * 获取视频播放流与音频流地址
   */
  async getPlayUrl(t, r) {
    return this.api(
      `https://api.bilibili.com/x/player/wbi/playurl?bvid=${encodeURIComponent(t)}&cid=${r}&qn=64&fnval=1`
    );
  }
  /**
   * 获取视频外挂字幕或 AI 智能字幕列表
   */
  async getVideoSubtitles(t, r) {
    return (await this.api(
      `https://api.bilibili.com/x/player/v2?bvid=${encodeURIComponent(t)}&cid=${r}`
    ))?.subtitle?.subtitles || [];
  }
  /**
   * 获取并缓存 Wbi 签名密钥
   */
  async getWbiKeys(t) {
    t?.throwIfAborted();
    const r = Date.now();
    if (this.wbiKeysCache && this.wbiKeysCache.expire > r)
      return { ik: this.wbiKeysCache.ik, sk: this.wbiKeysCache.sk };
    const e = await this.api("https://api.bilibili.com/x/web-interface/nav", { signal: t });
    t?.throwIfAborted();
    const i = e?.wbi_img?.img_url?.split("/").pop()?.split(".")[0] || "", a = e?.wbi_img?.sub_url?.split("/").pop()?.split(".")[0] || "";
    if (!i || !a)
      throw new Error("无法获取 B 站 WBI 鉴权密钥");
    return this.wbiKeysCache = { ik: i, sk: a, expire: r + 3600 * 1e3 }, { ik: i, sk: a };
  }
  /**
   * 获取指定清晰度的视频/音频直链播放流 (支持逐级清晰度自动降阶重试与 WBI 签名直链备用获取)
   */
  async fetchPlayStream(t, r, e = 64, i) {
    const a = $(i, 18e3), n = a.signal, p = async (l) => {
      for (let s = 0; s < 2; s++) {
        n.throwIfAborted();
        const f = $(n, 6e3);
        try {
          return await this.api(l, { signal: f.signal });
        } catch (c) {
          if (n.throwIfAborted(), !(c?.name === "TimeoutError" || c instanceof TypeError) || s === 1)
            throw ([-352, -403, -101, -111].includes(c?.code) || [403, 412].includes(c?.status)) && (this.wbiKeysCache = null), c;
        } finally {
          f.dispose();
        }
      }
    }, o = (l) => {
      if (n.throwIfAborted(), [401, 403, 412, 429].includes(l?.status) || [-101, -111, -352, -412].includes(l?.code))
        throw this.wbiKeysCache = null, l;
      if (l?.name === "AbortError") throw l;
    };
    try {
      n.throwIfAborted();
      const l = Array.from(/* @__PURE__ */ new Set([e, 64, 32, 16]));
      let s = null, f = [], c = e;
      const u = (d) => {
        if (!d) return [];
        const h = Array.isArray(d.durl) ? d.durl : Array.isArray(d.result?.durl) ? d.result.durl : [], w = [];
        for (const y of h.slice(0, 1))
          if (y?.url && w.push(String(y.url)), Array.isArray(y?.backup_url))
            for (const m of y.backup_url)
              m && w.push(String(m));
        return Array.from(new Set(w.filter(Boolean).map((y) => y.replace(/^http:/, "https:")))).filter((y) => {
          try {
            const m = new URL(y);
            return m.protocol === "https:" && !m.username && !m.password;
          } catch {
            return !1;
          }
        });
      };
      for (const d of l)
        try {
          const h = t ? `bvid=${encodeURIComponent(t)}` : "", w = await p(
            `https://api.bilibili.com/x/player/playurl?${h}&cid=${r}&qn=${d}&fnval=1&fourk=0&platform=html5&high_quality=1`
          ), y = u(w);
          if (y.length > 0) {
            s = w, f = y, c = Number(w?.quality || d);
            break;
          }
        } catch (h) {
          o(h);
        }
      if (!f.length)
        for (const d of Array.from(/* @__PURE__ */ new Set([e, 64, 32])))
          try {
            const h = $(n, 5e3);
            let w;
            try {
              w = await this.getWbiKeys(h.signal);
            } finally {
              h.dispose();
            }
            const { ik: y, sk: m } = w, b = { cid: r, qn: d, fnval: 1, fourk: 0 };
            t && (b.bvid = t);
            const { signedQuery: k } = C(b, y, m), v = await p(
              `https://api.bilibili.com/x/player/wbi/playurl?${k}`
            ), A = u(v);
            if (A.length > 0) {
              s = v, f = A, c = Number(v?.quality || d);
              break;
            }
          } catch (h) {
            o(h);
          }
      if (!f.length)
        throw new Error("未能获取到有效视频直链播放流");
      return {
        sources: f,
        quality: c,
        acceptQuality: s?.accept_quality || [80, 64, 32, 16],
        acceptDescription: s?.accept_description || ["1080P 高清", "720P 高清", "480P 清晰", "360P 流畅"]
      };
    } finally {
      a.dispose();
    }
  }
  /**
   * 获取音频流：优先提取 DASH 纯音频流 (M4A，体积仅 ~3MB，彻底消除视频冗余与限速)，若无纯音频则降级至 360P 流畅视频流 (极小体积保底)
   */
  async fetchAudioStream(t, r, e) {
    const i = $(e, 18e3), a = i.signal, n = async (l) => {
      for (let s = 0; s < 2; s++) {
        a.throwIfAborted();
        const f = $(a, 6e3);
        try {
          return await this.api(l, { signal: f.signal });
        } catch (c) {
          if (a.throwIfAborted(), !(c?.name === "TimeoutError" || c instanceof TypeError) || s === 1)
            throw ([-352, -403, -101, -111].includes(c?.code) || [403, 412].includes(c?.status)) && (this.wbiKeysCache = null), c;
        } finally {
          f.dispose();
        }
      }
    }, p = (l) => {
      if (a.throwIfAborted(), [401, 403, 412, 429].includes(l?.status) || [-101, -111, -352, -412].includes(l?.code))
        throw this.wbiKeysCache = null, l;
      if (l?.name === "AbortError") throw l;
    }, o = (l) => {
      const s = l?.dash || l?.result?.dash, f = Array.isArray(s?.audio) ? s.audio : [];
      if (!f.length) return [];
      const c = [...f].sort((d, h) => Number(h?.id || 0) - Number(d?.id || 0)), u = [];
      for (const d of c) {
        if (d?.baseUrl && u.push(String(d.baseUrl)), d?.base_url && u.push(String(d.base_url)), Array.isArray(d?.backupUrl))
          for (const h of d.backupUrl) h && u.push(String(h));
        if (Array.isArray(d?.backup_url))
          for (const h of d.backup_url) h && u.push(String(h));
      }
      return Array.from(new Set(u.filter(Boolean).map((d) => d.replace(/^http:/, "https:")))).filter((d) => {
        try {
          const h = new URL(d);
          return h.protocol === "https:" && !h.username && !h.password;
        } catch {
          return !1;
        }
      });
    };
    try {
      a.throwIfAborted();
      try {
        const s = t ? `bvid=${encodeURIComponent(t)}` : "", f = await n(
          `https://api.bilibili.com/x/player/playurl?${s}&cid=${r}&qn=16&fnval=16&fourk=0&platform=html5`
        ), c = o(f);
        if (c.length > 0)
          return { sources: c, isPureAudio: !0 };
      } catch (s) {
        p(s);
      }
      try {
        const s = $(a, 5e3);
        let f;
        try {
          f = await this.getWbiKeys(s.signal);
        } finally {
          s.dispose();
        }
        const { ik: c, sk: u } = f, d = { cid: r, qn: 16, fnval: 16, fourk: 0 };
        t && (d.bvid = t);
        const { signedQuery: h } = C(d, c, u), w = await n(`https://api.bilibili.com/x/player/wbi/playurl?${h}`), y = o(w);
        if (y.length > 0)
          return { sources: y, isPureAudio: !0 };
      } catch (s) {
        p(s);
      }
      return { sources: (await this.fetchPlayStream(t, r, 16, a)).sources, isPureAudio: !1 };
    } finally {
      i.dispose();
    }
  }
  /**
   * 现代化多源视频流与分P信息自洽解析
   */
  async resolvePlayStream(t, r = 1, e) {
    if (t.cachedSourceUrl)
      return {
        title: t.title || t.bvid || "本地缓存视频",
        poster: t.cover || "",
        sources: [t.cachedSourceUrl],
        aid: t.aid || null,
        bvid: t.bvid || "",
        cid: null,
        cached: !0,
        owner: t.owner || t.author || "UP主",
        ownerFace: t.ownerFace || t.face || "",
        ownerMid: null,
        pubdate: 0,
        desc: t.desc || "本地缓存视频",
        views: t.views || 0,
        danmaku: t.danmaku || 0,
        likes: t.likes || 0,
        currentQuality: 0,
        acceptQuality: [],
        acceptDescription: [],
        pages: [],
        currentPage: 1,
        partTitle: ""
      };
    const i = String(t.bvid || "").trim(), a = String(t.aid || "").trim(), n = i.startsWith("BV") ? i : "", p = a.replace(/^av/i, "") || (i.startsWith("BV") ? "" : i.replace(/^av/i, "")), o = n ? `bvid=${encodeURIComponent(n)}` : `aid=${encodeURIComponent(p)}`, l = $(e, 2e4), s = l.signal;
    try {
      s.throwIfAborted();
      const f = t.cid && n && r === 1 ? this.fetchPlayStream(n, t.cid, Number(t.preferredQuality || 64), s).then((S) => ({ value: S, error: null }), (S) => ({ value: null, error: S })) : null;
      let c = null;
      try {
        const S = $(s, 6e3);
        try {
          c = await this.api(`https://api.bilibili.com/x/web-interface/view?${o}`, { signal: S.signal });
        } finally {
          S.dispose();
        }
      } catch {
        s.throwIfAborted();
      }
      const u = c?.bvid || "", d = u.startsWith("BV") ? u : n || "", w = (Array.isArray(c?.pages) ? c.pages : []).map((S) => ({
        cid: S.cid,
        page: S.page,
        part: S.part || `第${S.page}集`,
        duration: S.duration || 0
      })), y = w.findIndex((S) => S.page === r), m = y >= 0 ? w[y] : w[0] || null, b = m?.cid || c?.cid || t.cid;
      if (!b)
        throw new Error("无法获取视频 CID 标识");
      const k = Number(t.preferredQuality || 64), v = f && String(b) === String(t.cid) ? await f : null;
      s.throwIfAborted();
      const A = v && String(b) === String(t.cid) ? v.value || (() => {
        throw v.error;
      })() : await this.fetchPlayStream(d, b, k, s);
      return {
        title: c?.title || t.title || d,
        poster: String(c?.pic || t.cover || "").replace(/^http:/, "https:"),
        sources: A.sources,
        aid: c?.aid || t.aid || null,
        bvid: d,
        cid: b || null,
        owner: c?.owner?.name || t.owner || t.author || "UP主",
        ownerFace: c?.owner?.face ? String(c.owner.face).replace(/^http:/, "https:") : t.ownerFace || t.face || "",
        ownerMid: c?.owner?.mid || null,
        pubdate: c?.pubdate || 0,
        desc: c?.desc || t.desc || "暂无简介",
        views: c?.stat?.view || t.views || 0,
        danmaku: c?.stat?.danmaku || t.danmaku || 0,
        likes: c?.stat?.like || t.likes || 0,
        currentQuality: A.quality,
        acceptQuality: A.acceptQuality,
        acceptDescription: A.acceptDescription,
        pages: w,
        currentPage: m?.page || 1,
        partTitle: m?.part || ""
      };
    } finally {
      l.dispose();
    }
  }
  /**
   * 纯数据拉取并深度解析视频字幕轨道 (支持 WBI 签名鉴权与多语言挑选)
   */
  async fetchVideoSubtitleDetails(t, r, e) {
    e?.throwIfAborted();
    const i = await this.api(`https://api.bilibili.com/x/web-interface/view?bvid=${encodeURIComponent(t)}`, { signal: e });
    if (e?.throwIfAborted(), e && !i?.cid) throw new Error("无法读取视频详情，请重试");
    if (!i?.cid) return { ok: !1, reason: "视频不存在或未登录", cues: [] };
    const a = Array.isArray(i?.pages) ? i.pages : [], n = r ? a.find((_) => _.cid === r) : null, p = r || i.cid, o = n?.part ? ` · P${n.page} ${n.part}` : "", { ik: l, sk: s } = await this.getWbiKeys(e);
    e?.throwIfAborted();
    const { signedQuery: f } = C({ bvid: t, cid: p }, l, s), c = await this.api(`https://api.bilibili.com/x/player/wbi/v2?${f}`, { signal: e });
    if (e?.throwIfAborted(), e && !Array.isArray(c?.subtitle?.subtitles)) throw new Error("字幕轨道返回异常或当前账号无权读取");
    const u = c?.subtitle?.subtitles || [];
    if (!u.length)
      return { ok: !1, reason: `该视频${o ? "（" + o.trim() + "）" : ""}没有可用字幕`, cues: [] };
    const d = u.find((_) => /zh|中文|汉语|漢語/i.test((_.lan || "") + " " + (_.lan_doc || ""))) || u[0], h = d.subtitle_url || "", w = h.startsWith("//") ? `https:${h}` : h.startsWith("http") ? h : `https://${h}`, y = await fetch(w, { signal: e, credentials: "include", headers: { Accept: "application/json" } });
    if (!y.ok) throw new Error(`字幕获取失败: ${y.status}`);
    const m = await y.arrayBuffer();
    e?.throwIfAborted();
    let b;
    try {
      b = JSON.parse(new TextDecoder("utf-8", { fatal: !0 }).decode(m));
    } catch {
      try {
        b = JSON.parse(new TextDecoder("gb18030").decode(m));
      } catch {
        b = JSON.parse(new TextDecoder("big5").decode(m));
      }
    }
    if (e && !Array.isArray(b?.body)) throw new Error("字幕正文格式异常");
    const v = (b?.body || []).map((_, D) => ({
      id: `${_.from || 0}_${D}`,
      from: Number(_.from || 0),
      to: Number(_.to || _.from || 0),
      content: String(_.content || "").trim()
    })).filter((_) => _.content), A = (i.title || t) + o, S = [];
    if (S.push("标题：" + A), S.push("字幕轨道：" + u.map((_) => _.lan_doc || _.lan || "未知").join(" / ") + "（已选：" + (d.lan_doc || d.lan || "默认") + "）"), i.owner?.name && S.push("UP主：" + i.owner.name), i.pubdate) {
      const _ = new Date(i.pubdate * 1e3);
      S.push(`发布时间：${_.getFullYear()}-${String(_.getMonth() + 1).padStart(2, "0")}-${String(_.getDate()).padStart(2, "0")}`);
    }
    S.push("链接：https://www.bilibili.com/video/" + t + (n?.page ? `?p=${n.page}` : ""));
    const I = v.map((_) => _.content).join(`\r
`), O = S.join(`\r
`) + `\r
\r
———— 字幕正文 ————\r
\r
`;
    return {
      ok: !0,
      title: A,
      bodyText: I,
      headText: O,
      lineCount: v.length,
      cues: v,
      aid: i.aid,
      desc: i.desc || "",
      viewPoints: Array.isArray(c?.view_points) ? c.view_points : []
    };
  }
  /**
   * 拉取并解析 B站 JSON 格式字幕流为标准化 Cue 列表
   */
  async fetchSubtitleCues(t) {
    if (!t) return [];
    const r = t.startsWith("//") ? `https:${t}` : t, e = await fetch(r);
    if (!e.ok) throw new Error(`字幕获取失败: ${e.statusText}`);
    return ((await e.json()).body || []).map((n) => ({
      from: Number(n.from || 0),
      to: Number(n.to || 0),
      content: String(n.content || "").trim()
    }));
  }
  /**
   * 分页获取视频评论区列表
   */
  async getVideoComments(t, r = 1, e = 20, i = 2) {
    const a = await this.api(
      `https://api.bilibili.com/x/v2/reply?type=1&oid=${t}&pn=${r}&ps=${e}&sort=${i}`
    ), n = a?.replies || [], p = a?.top || a?.upper?.top || null, o = a?.page || {}, l = Number(o.count || 0), s = (u, d = !1) => {
      const h = N(u.content), w = T(u.content), y = Array.isArray(u.replies) ? u.replies.map((m) => ({
        rpid: m.rpid,
        mid: Number(m.mid || 0),
        uname: String(m.member?.uname || "B站用户"),
        avatar: String(m.member?.avatar || "").replace(/^http:/, "https:"),
        message: String(m.content?.message || ""),
        timeText: new Date(Number(m.ctime || 0) * 1e3).toLocaleString(),
        like: Number(m.like || 0),
        pictures: j(m.content?.pictures),
        emotes: N(m.content),
        mentions: T(m.content)
      })) : [];
      return {
        rpid: u.rpid,
        mid: Number(u.mid || 0),
        uname: String(u.member?.uname || "匿名用户"),
        avatar: String(u.member?.avatar || "").replace(/^http:/, "https:"),
        message: String(u.content?.message || ""),
        timeText: new Date(Number(u.ctime || 0) * 1e3).toLocaleString(),
        like: Number(u.like || 0),
        rcount: Number(u.rcount || 0),
        isTop: d,
        pictures: j(u.content?.pictures),
        emotes: h,
        mentions: w,
        replies: y
      };
    }, f = [];
    r === 1 && p && typeof p == "object" && p.rpid && f.push(s(p, !0));
    const c = p?.rpid ? String(p.rpid) : "";
    for (const u of n)
      c && String(u.rpid) === c || f.push(s(u, !1));
    return {
      comments: f,
      total: l,
      hasMore: r * e < l
    };
  }
  /**
   * 分页获取某条根评论下的子回复（楼中楼）
   */
  async getSubReplies(t, r, e = 1, i = 10) {
    const a = await this.api(
      `https://api.bilibili.com/x/v2/reply/reply?type=1&oid=${t}&root=${r}&pn=${e}&ps=${i}`
    ), n = a?.replies || [], p = a?.page || {}, o = Number(p.count || 0);
    return {
      replies: n.map((s) => ({
        rpid: s.rpid,
        mid: Number(s.mid || 0),
        uname: String(s.member?.uname || "B站用户"),
        avatar: String(s.member?.avatar || "").replace(/^http:/, "https:"),
        message: String(s.content?.message || ""),
        timeText: new Date(Number(s.ctime || 0) * 1e3).toLocaleString(),
        like: Number(s.like || 0),
        pictures: j(s.content?.pictures),
        emotes: N(s.content),
        mentions: T(s.content)
      })),
      total: o,
      hasMore: e * i < o
    };
  }
  /**
   * 获取视频全量弹幕 XML 并解析为结构化列表
   */
  async getVideoDanmaku(t) {
    if (!t) return [];
    try {
      const r = [
        `https://comment.bilibili.com/${t}.xml`,
        `https://api.bilibili.com/x/v1/dm/list.so?oid=${t}`
      ];
      let e = "";
      for (const o of r)
        try {
          const l = await fetch(o);
          if (l.ok && (e = await l.text(), e && e.includes("<d p=")))
            break;
        } catch {
        }
      if (!e) return [];
      const n = new DOMParser().parseFromString(e, "text/xml").querySelectorAll("d"), p = [];
      return n.forEach((o, l) => {
        const f = (o.getAttribute("p") || "").split(","), c = parseFloat(f[0]) || 0, u = parseInt(f[1], 10) || 1, d = parseInt(f[2], 10) || 25, w = `#${(parseInt(f[3], 10) || 16777215).toString(16).padStart(6, "0")}`, y = parseInt(f[4], 10) || 0, m = parseInt(f[5], 10) || 0, b = f[6] || "", k = f[7] || String(l), v = o.textContent?.trim() || "";
        if (v) {
          const A = Math.floor(c / 60), S = Math.floor(c % 60), I = `${String(A).padStart(2, "0")}:${String(S).padStart(2, "0")}`;
          p.push({
            id: k,
            time: c,
            timeStr: I,
            mode: u,
            size: d,
            color: w,
            timestamp: y,
            pool: m,
            userHash: b,
            text: v
          });
        }
      }), p.sort((o, l) => o.time - l.time), p;
    } catch (r) {
      return console.warn("[BiliService] 弹幕解析失败:", r), [];
    }
  }
  /**
   * 格式化毫秒或秒为 mm:ss
   */
  formatDuration(t) {
    if (!Number.isFinite(t) || t <= 0) return "0:00";
    const r = Math.floor(t / 60), e = Math.floor(t % 60);
    return `${r}:${String(e).padStart(2, "0")}`;
  }
}
const V = x.getInstance(), q = P.getInstance(), W = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  BilibiliFavoritesTreeManager: P,
  BilibiliService: x,
  WBI_MIXIN_TAB: B,
  biliMd5: U,
  bilibiliFavoritesManager: q,
  bilibiliService: V,
  calculateWbiSign: C,
  extractSubtitlesFromText: L,
  getBiliQualityFullLabel: R,
  getBiliQualityShortLabel: E,
  parseSrtToPlainText: M
}, Symbol.toStringTag, { value: "Module" }));
export {
  F as P,
  E as a,
  V as b,
  C as c,
  W as d,
  R as g
};
