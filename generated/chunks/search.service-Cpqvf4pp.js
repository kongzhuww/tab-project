import { r as ee, a as We, N as Te, P as Ye, b as Xe, s as Ze } from "./vendor-vue-BrDsOMg2.js";
import { y as et, f as J, x as tt, l as rt, r as st, G as Ne } from "./github.service-CDL2AZ5t.js";
const Z = {
  web: {
    placeholder: "搜索，或输入网址直接打开",
    title: "当前为网页搜索，点击切换为 B站 搜索",
    iconSrc: "",
    iconText: "⌕"
  },
  bilibili: {
    placeholder: "搜索 B站视频…（回车在插件内查看）",
    title: "当前为 B站 搜索，点击切换为 GitHub 仓库搜索",
    iconSrc: "assets/bilibili.svg",
    iconText: ""
  },
  github: {
    placeholder: "精准搜索 GitHub 仓库…",
    title: "当前为 GitHub 仓库搜索，点击切换为网易云音乐搜索",
    iconSrc: "assets/nav-github.svg",
    iconText: ""
  },
  netease: {
    placeholder: "搜索网易云音乐歌曲、歌手…（回车在插件内搜索）",
    title: "当前为网易云音乐搜索，点击切换为企查查企业搜索",
    iconSrc: "assets/netease.svg",
    iconText: ""
  },
  qcc: {
    placeholder: "搜索企业、法定代表人、统一信用代码…（回车企查查直达）",
    title: "当前为企查查企业搜索，点击切换为网页搜索",
    iconSrc: "",
    iconText: "🏢"
  }
}, je = "web", Q = Z[je], it = () => ({
  mode: je,
  query: "",
  hasQuery: !1,
  placeholder: Q.placeholder,
  toggleTitle: Q.title,
  toggleAriaLabel: Q.title,
  modeIconSrc: Q.iconSrc,
  modeIconText: Q.iconText,
  modeColor: "#38bdf8",
  modeName: "网页",
  suggestions: [],
  isSuggestionsVisible: !1,
  updatedAt: null
}), g = ee(it());
let ue = null, he = null, de = null, fe = null, ge = null, me = null;
const p = {
  get snapshot() {
    return We(g);
  },
  update(i) {
    Object.assign(g, i), i.query !== void 0 && (g.hasQuery = !!i.query.trim());
  },
  setMode(i) {
    Promise.resolve().then(() => Rt).then(({ searchSlots: e }) => {
      const t = e.value.find((s) => s.id === i);
      if (t) {
        g.mode = t.id, g.placeholder = t.placeholder, g.toggleTitle = `当前为 ${t.name} 搜索，点击切换下一个模式`, g.toggleAriaLabel = `切换搜索模式（当前：${t.name}）`, g.modeIconSrc = t.iconType === "svg" ? t.iconValue : "", g.modeIconText = t.iconType !== "svg" ? t.iconValue : "", g.modeColor = t.themeColor || "#38bdf8", g.modeName = t.name, g.updatedAt = Date.now();
        return;
      }
      const r = Z[i] || Z.web;
      g.mode = i, g.placeholder = r.placeholder, g.toggleTitle = r.title, g.toggleAriaLabel = r.title, g.modeIconSrc = r.iconSrc, g.modeIconText = r.iconText, g.modeColor = "#38bdf8", g.modeName = i, g.updatedAt = Date.now();
    }).catch(() => {
      const e = Z[i] || Z.web;
      g.mode = i, g.placeholder = e.placeholder, g.toggleTitle = e.title, g.toggleAriaLabel = e.title, g.modeIconSrc = e.iconSrc, g.modeIconText = e.iconText, g.updatedAt = Date.now();
    });
  },
  setQuery(i) {
    g.query = i, g.hasQuery = !!i.trim(), g.updatedAt = Date.now(), me && me(i), typeof window < "u" && window.dispatchEvent(new CustomEvent("logicweaver:search-query", { detail: { query: i } }));
  },
  setQueryAction(i) {
    me = i;
  },
  setSuggestions(i) {
    g.suggestions = Array.isArray(i) ? [...i] : [], g.isSuggestionsVisible = g.suggestions.length > 0, g.updatedAt = Date.now();
  },
  setSuggestionsVisible(i) {
    g.isSuggestionsVisible = !!i, g.updatedAt = Date.now();
  },
  onSuggestionClick(i) {
    g.isSuggestionsVisible = !1, ge ? ge(i) : i.url ? window.open(i.url, "_blank") : p.submit(i.title);
  },
  setSuggestionClickAction(i) {
    ge = i;
  },
  clear() {
    g.query = "", g.hasQuery = !1, g.suggestions = [], g.isSuggestionsVisible = !1, g.updatedAt = Date.now(), he ? he() : window.dispatchEvent(new CustomEvent("logicweaver:search-clear"));
  },
  submit(i) {
    const e = i !== void 0 ? i : g.query;
    g.isSuggestionsVisible = !1, de ? de(e) : window.dispatchEvent(new CustomEvent("logicweaver:search-submit", { detail: { query: e } }));
  },
  cycleMode() {
    ue ? ue() : window.dispatchEvent(new CustomEvent("logicweaver:search-cycle-mode"));
  },
  focus() {
    fe ? fe() : window.dispatchEvent(new CustomEvent("logicweaver:search-focus"));
  },
  setCycleModeAction(i) {
    ue = i;
  },
  setClearAction(i) {
    he = i;
  },
  setSubmitAction(i) {
    de = i;
  },
  setFocusAction(i) {
    fe = i;
  }
}, ot = "https://music.163.com";
async function $e(i, e = {}, t) {
  t?.throwIfAborted();
  let r, s;
  switch (i) {
    case "/login/status":
    case "/user/account":
      r = "/api/nuser/account/get", s = {};
      break;
    case "/user/detail":
      r = `/api/v1/user/detail/${encodeURIComponent(String(e.uid))}`, s = {};
      break;
    case "/user/playlist":
      r = "/api/user/playlist", s = { uid: e.uid, limit: e.limit ?? 100, offset: 0 };
      break;
    case "/playlist/detail":
    case "/playlist/track/all":
      r = "/api/playlist/detail", s = { id: e.id, n: 1e3, s: 0 };
      break;
    case "/likelist":
      r = "/api/song/like/get", s = { uid: e.uid };
      break;
    case "/cloudsearch":
    case "/search":
      r = "/api/search/get/web", s = { s: e.keywords, type: 1, limit: e.limit ?? 60, offset: 0 };
      break;
    case "/lyric":
      r = "/api/song/lyric", s = { id: e.id, lv: -1, kv: -1, tv: -1 };
      break;
    case "/song/url":
    case "/song/url/v1":
      r = "/api/song/enhance/player/url", s = { ids: JSON.stringify([e.id]), br: 32e4 };
      break;
    default:
      throw new Error("此功能暂未接入官网会话，不会回退到第三方音乐节点。");
  }
  const o = new URLSearchParams();
  for (const [a, l] of Object.entries(s))
    l != null && o.set(a, String(l));
  let n;
  try {
    const a = new URL(ot + r);
    a.search = o.toString(), n = await fetch(a, {
      method: "GET",
      credentials: "include",
      redirect: "error",
      cache: "no-store",
      headers: { Accept: "application/json" },
      signal: t ? AbortSignal.any([t, AbortSignal.timeout(15e3)]) : AbortSignal.timeout(15e3)
    });
  } catch {
    throw t?.throwIfAborted(), new Error("网易云官网请求失败或超时，请确认官网可以访问，并检查扩展的网站访问权限。");
  }
  if (!n.ok) throw new Error(`网易云官网返回 HTTP ${n.status}，请稍后重试。`);
  let c;
  try {
    c = await n.json();
  } catch {
    throw new Error("网易云官网未返回有效数据，请在官网确认登录状态。");
  }
  if (t?.throwIfAborted(), !c || typeof c != "object") throw new Error("网易云官网响应格式无效。");
  if (Number(c.code) === 301 || Number(c.code) === 401)
    throw new Error("官网会话未登录或已失效，请先在同一浏览器的网易云官网登录。");
  if (c.code !== void 0 && Number(c.code) !== 200)
    throw new Error(`网易云官网未接受请求（状态 ${Number(c.code) || "未知"}），可能需要重新登录或遇到接口限制。`);
  if ((i === "/playlist/detail" || i === "/playlist/track/all") && !c.playlist && c.result && (c.playlist = c.result), i === "/playlist/track/all") {
    const a = c.playlist?.tracks || [], l = Number(e.offset) || 0;
    return { ...c, songs: a.slice(l, l + (Number(e.limit) || 500)) };
  }
  return c;
}
const nt = "neteaseCookie", z = "neteaseUserInfo", H = "neteaseLikedSongIds", R = "neteaseRecentPlayedSongs";
class j {
  constructor() {
    this.user = null, this.likedSongIds = /* @__PURE__ */ new Set(), this.recentSongs = [], this.playlistCache = /* @__PURE__ */ new Map(), this.pendingRequests = /* @__PURE__ */ new Map(), this.storageReady = this.initStorage();
  }
  whenReady() {
    return this.storageReady;
  }
  static getInstance() {
    return j.instance || (j.instance = new j()), j.instance;
  }
  async initStorage() {
    if (typeof chrome < "u" && chrome.storage?.local)
      try {
        const e = await chrome.storage.local.get([
          z,
          H,
          R
        ]);
        e[z] && (this.user = e[z]), Array.isArray(e[H]) && (this.likedSongIds = new Set(e[H])), Array.isArray(e[R]) && (this.recentSongs = e[R]);
      } catch (e) {
        console.warn("[NeteaseService] Init storage error:", e);
      }
    if (!this.recentSongs.length && typeof localStorage < "u")
      try {
        const e = localStorage.getItem(R);
        if (e) {
          const t = JSON.parse(e);
          Array.isArray(t) && t.length && (this.recentSongs = t);
        }
      } catch {
      }
    typeof window < "u" && window.dispatchEvent(new CustomEvent("netease:recent-updated", { detail: this.recentSongs }));
  }
  // ==========================================================================
  // HTTP 底层通用请求封装 (带时间戳、Cookie、超时防抖)
  // ==========================================================================
  async request(e, t = {}, r) {
    return $e(e, t, r);
  }
  // ==========================================================================
  // 用户鉴权与状态
  // ==========================================================================
  getUser() {
    return this.user;
  }
  async connectWebsiteAccount() {
    await this.whenReady();
    const e = await $e("/user/account"), t = e.profile || e.data?.profile, r = t?.userId;
    if (!r || typeof t?.nickname != "string")
      throw new Error("未读到官网账户，请先在同一浏览器、同一资料的网易云官网登录，再点击连接；无痕窗口的登录不会自动共用。");
    const s = {
      uid: r,
      nickname: t.nickname,
      avatarUrl: t.avatarUrl || "",
      vipType: Number(t.vipType) || 0,
      isVip: Number(t.vipType) > 0,
      loggedIn: !0
    };
    return typeof chrome < "u" && chrome.storage?.local && await chrome.storage.local.set({ [z]: s }), this.user = s, this.playlistCache.clear(), this.likedSongIds.clear(), typeof localStorage < "u" && localStorage.removeItem("netease_explicit_logout"), window.dispatchEvent(new Event("netease:account-updated")), s;
  }
  async fetchUserProfile() {
    try {
      let e = null, t = "网易云用户", r = "", s = 0;
      try {
        const o = await this.request("/login/status"), n = o?.data?.profile || o?.profile, c = o?.data?.account || o?.account;
        e = n?.userId || n?.id || c?.id || c?.userId || null, t = n?.nickname || c?.userName || "网易云用户", r = n?.avatarUrl || "", s = n?.vipType || c?.vipType || 0;
      } catch (o) {
        console.warn("[NeteaseService] /login/status warning:", o);
      }
      if (!e)
        try {
          const o = await this.request("/user/account"), n = o?.profile, c = o?.account;
          e = n?.userId || n?.id || c?.id || c?.userId || null, n?.nickname && (t = n.nickname), n?.avatarUrl && (r = n.avatarUrl), (n?.vipType || c?.vipType) && (s = n?.vipType || c?.vipType || 0);
        } catch (o) {
          console.warn("[NeteaseService] /user/account warning:", o);
        }
      if (e && (!r || t === "网易云用户"))
        try {
          const o = await this.request("/user/detail", { uid: e });
          o?.profile && (t = o.profile.nickname || t, r = o.profile.avatarUrl || r, s = o.profile.vipType || s);
        } catch {
        }
      if (e)
        return this.user = {
          uid: e,
          nickname: t,
          avatarUrl: r,
          vipType: s,
          isVip: Number(s) > 0,
          loggedIn: !0
        }, typeof chrome < "u" && chrome.storage?.local && await chrome.storage.local.set({ [z]: this.user }), await this.fetchLikedSongs(), this.user;
    } catch (e) {
      console.warn("[NeteaseService] fetchUserProfile failed:", e);
    }
    return null;
  }
  // ==========================================================================
  // Cookie 自动嗅探与应用登录
  // ==========================================================================
  async logout() {
    this.user = null, this.playlistCache.clear(), this.pendingRequests.clear(), this.likedSongIds.clear(), typeof chrome < "u" && chrome.storage?.local && await chrome.storage.local.remove([nt, z, H]), window.dispatchEvent(new Event("netease:account-updated"));
  }
  // ==========================================================================
  // 喜欢歌曲管理
  // ==========================================================================
  async fetchLikedSongs() {
    if (!this.user?.uid) return Array.from(this.likedSongIds);
    try {
      const t = (await this.request("/likelist", { uid: this.user.uid }))?.ids || [];
      return t.length && (this.likedSongIds = new Set(t.map(Number)), typeof chrome < "u" && chrome.storage?.local && await chrome.storage.local.set({ [H]: Array.from(this.likedSongIds) })), Array.from(this.likedSongIds);
    } catch (e) {
      return console.warn("[NeteaseService] fetchLikedSongs failed:", e), Array.from(this.likedSongIds);
    }
  }
  getLikedSongIds() {
    return this.likedSongIds;
  }
  isLiked(e) {
    return this.likedSongIds.has(Number(e));
  }
  async toggleLikeSong(e, t) {
    const r = Number(e);
    if (!r) return !1;
    const s = t !== void 0 ? t : !this.likedSongIds.has(r);
    try {
      return await this.request("/like", { id: r, like: s }), s ? this.likedSongIds.add(r) : this.likedSongIds.delete(r), typeof chrome < "u" && chrome.storage?.local && await chrome.storage.local.set({ [H]: Array.from(this.likedSongIds) }), !0;
    } catch (o) {
      return console.warn("[NeteaseService] toggleLikeSong failed:", o), !1;
    }
  }
  // ==========================================================================
  // 歌单与歌曲检索
  // ==========================================================================
  async getUserPlaylists(e) {
    const t = e || this.user?.uid;
    if (!t) return [];
    try {
      return (await this.request("/user/playlist", { uid: t, limit: 100 }))?.playlist || [];
    } catch (r) {
      return console.warn("[NeteaseService] getUserPlaylists failed:", r), [];
    }
  }
  async getToplists() {
    try {
      return (await this.request("/toplist"))?.list || [];
    } catch (e) {
      return console.warn("[NeteaseService] getToplists failed:", e), [];
    }
  }
  /**
   * 综合歌单获取（自动识别用户状态，登录时返回用户歌单，未登录或为空时返回官方热门榜单）
   */
  async getPlaylists() {
    if (this.user?.loggedIn) {
      const t = await this.getUserPlaylists();
      if (t && t.length) return t;
    }
    const e = await this.getToplists();
    return e && e.length ? e : [
      { id: 3778678, name: "云音乐热歌榜", trackCount: 200, coverImgUrl: "https://p1.music.126.net/Gh3G65F3eJ9vP_aQc6t2YQ==/109951165682855118.jpg" },
      { id: 3779629, name: "云音乐新歌榜", trackCount: 100, coverImgUrl: "https://p1.music.126.net/N2HO5xfYEqyvgnqfMrrKPA==/109951165682845667.jpg" },
      { id: 19723756, name: "云音乐飙升榜", trackCount: 100, coverImgUrl: "https://p1.music.126.net/sBzD11nforcuh1urispgOQ==/109951165682860472.jpg" },
      { id: 2884035, name: "网易原创歌曲榜", trackCount: 100, coverImgUrl: "https://p1.music.126.net/H4a8b79k8O9Zl_Kx_Yn16Q==/109951165682859758.jpg" }
    ];
  }
  addRecentSong(e) {
    this.recordRecentSong(e);
  }
  async autoDetectAndLogin() {
    if (this.user?.loggedIn) return this.user;
    if (typeof localStorage < "u" && localStorage.getItem("netease_explicit_logout") === "true")
      return null;
    try {
      return await this.connectWebsiteAccount();
    } catch (e) {
      console.warn("[NeteaseService] autoDetectAndLogin failed:", e);
    }
    return null;
  }
  async getPlaylistTracks(e, t = 500, r = 0) {
    if (!e) return [];
    if (this.playlistCache.has(e) && t >= 500 && r === 0) {
      const n = this.playlistCache.get(e);
      if (Date.now() - n.at < 600 * 1e3 && n.songs && n.songs.length)
        return n.songs;
    }
    const s = `${e}_${t}_${r}`;
    if (this.pendingRequests.has(s))
      return await this.pendingRequests.get(s);
    const o = (async () => {
      let n = [];
      try {
        try {
          n = (await this.request("/playlist/track/all", {
            id: e,
            limit: t,
            offset: r
          }))?.songs || [];
        } catch (c) {
          console.warn("[NeteaseService] /playlist/track/all error, fallback to detail:", c);
        }
        !n.length && r === 0 && (n = (await this.request("/playlist/detail", { id: e }))?.playlist?.tracks || []), n.length && t >= 500 && r === 0 && this.playlistCache.set(e, { songs: n, at: Date.now() });
      } finally {
        this.pendingRequests.delete(s);
      }
      return n;
    })();
    return this.pendingRequests.set(s, o), await o;
  }
  async searchSongs(e, t = 60) {
    const r = e.trim();
    if (!r) return [];
    let s = [];
    try {
      s = (await this.request("/cloudsearch", { keywords: r, type: 1, limit: t }))?.result?.songs || [];
    } catch (o) {
      console.warn("[NeteaseService] /cloudsearch failed, fallback to /search:", o);
    }
    if (!s.length)
      try {
        s = (await this.request("/search", { keywords: r, limit: t }))?.result?.songs || [];
      } catch (o) {
        console.warn("[NeteaseService] /search failed:", o);
      }
    return s;
  }
  // ==========================================================================
  // 音源 URL 与 歌词获取
  // ==========================================================================
  async getSongAudioUrl(e, t = "standard") {
    let r = "";
    try {
      r = (await this.request("/song/url/v1", { id: e, level: t }))?.data?.[0]?.url || "";
    } catch {
    }
    if (!r)
      try {
        r = (await this.request("/song/url", { id: e }))?.data?.[0]?.url || "";
      } catch {
      }
    return r || (r = `https://music.163.com/song/media/outer/url?id=${e}.mp3`), r;
  }
  async getSongLyric(e) {
    try {
      return (await this.request("/lyric", { id: e }))?.lrc?.lyric || "";
    } catch {
      return "";
    }
  }
  // ==========================================================================
  // 最近播放记录
  // ==========================================================================
  recordRecentSong(e) {
    if (!(!e || !e.id)) {
      if (this.recentSongs = this.recentSongs.filter((t) => String(t.id) !== String(e.id)), this.recentSongs.unshift(e), this.recentSongs.length > 50 && (this.recentSongs = this.recentSongs.slice(0, 50)), typeof chrome < "u" && chrome.storage?.local && chrome.storage.local.set({ [R]: this.recentSongs }), typeof localStorage < "u")
        try {
          localStorage.setItem(R, JSON.stringify(this.recentSongs));
        } catch {
        }
      typeof window < "u" && window.dispatchEvent(new CustomEvent("netease:recent-updated", { detail: this.recentSongs }));
    }
  }
  async clearRecentSongs() {
    if (await this.whenReady(), this.recentSongs = [], typeof chrome < "u" && chrome.storage?.local && await chrome.storage.local.remove(R), typeof localStorage < "u")
      try {
        localStorage.removeItem(R);
      } catch {
      }
    typeof window < "u" && window.dispatchEvent(new CustomEvent("netease:recent-updated", { detail: [] }));
  }
  getRecentSongs() {
    return [...this.recentSongs];
  }
  /**
   * 从网易云官方账户拉取真实的云端最近播放 / 听歌历史记录
   */
  async fetchAccountRecentSongs(e = 60) {
    try {
      let t = [];
      try {
        const r = await this.request("/record/recent/song", { limit: e });
        Array.isArray(r?.data?.list) && r.data.list.length > 0 && (t = r.data.list);
      } catch {
      }
      if (!t.length && this.user?.uid)
        try {
          const r = await this.request("/user/record", { uid: this.user.uid, type: 1 });
          Array.isArray(r?.weekData) && r.weekData.length > 0 ? t = r.weekData : Array.isArray(r?.allData) && r.allData.length > 0 && (t = r.allData);
        } catch {
        }
      if (t.length > 0) {
        const r = t.map((s) => {
          const o = s.data || s.song || s;
          return !o || !o.id ? null : {
            id: o.id,
            name: o.name || o.title || "未知曲目",
            artists: o.ar || o.artists || [],
            ar: o.ar || o.artists || [],
            album: o.al || o.album || {},
            al: o.al || o.album || {},
            dt: o.dt || o.duration || 0,
            duration: o.dt || o.duration || 0,
            picUrl: o.al?.picUrl || o.album?.picUrl || o.picUrl || "",
            coverUrl: o.al?.picUrl || o.album?.picUrl || o.picUrl || "",
            playTime: s.playTime || 0
          };
        }).filter(Boolean);
        if (r.length > 0) {
          const s = new Set(r.map((n) => String(n.id))), o = this.recentSongs.filter((n) => !s.has(String(n.id)));
          if (this.recentSongs = [...r, ...o].slice(0, 60), typeof chrome < "u" && chrome.storage?.local && await chrome.storage.local.set({ [R]: this.recentSongs }), typeof localStorage < "u")
            try {
              localStorage.setItem(R, JSON.stringify(this.recentSongs));
            } catch {
            }
          typeof window < "u" && window.dispatchEvent(new CustomEvent("netease:recent-updated", { detail: this.recentSongs }));
        }
      }
    } catch (t) {
      console.warn("[NeteaseService] fetchAccountRecentSongs failed:", t);
    }
    return this.recentSongs;
  }
}
const Fe = j.getInstance();
typeof window < "u" && (window.LogicWeaverNeteaseService = Fe);
class Nt extends Error {
  constructor(e = "设置保存结果未确认，请重读核对；未自动重试") {
    super(e), this.name = "SettingsSaveUnconfirmedError";
  }
}
function D(i, e) {
  if (Object.is(i, e)) return !0;
  if (i === null || e === null || typeof i != "object" || typeof e != "object") return !1;
  if (Array.isArray(i) || Array.isArray(e))
    return Array.isArray(i) && Array.isArray(e) && i.length === e.length && i.every((o, n) => D(o, e[n]));
  const t = i, r = e, s = Object.keys(t);
  return s.length === Object.keys(r).length && s.every((o) => Object.prototype.hasOwnProperty.call(r, o) && D(t[o], r[o]));
}
function at(i) {
  return i === void 0 ? i : JSON.parse(JSON.stringify(i));
}
class G extends Error {
  constructor() {
    super("保存结果未确认，未自动重试。请复制草稿后刷新页面核对，再决定是否修改。");
  }
}
let pe = !1;
async function _e(i) {
  return new Promise((e, t) => {
    chrome.storage.local.get(i, (r) => {
      chrome.runtime.lastError ? t(new Error("无法读取网站数据，本次未提交；请稍后再试。")) : e(r);
    });
  });
}
async function we(i, e) {
  if (pe) throw new G();
  if (typeof chrome > "u" || !chrome.storage?.local)
    throw new Error("浏览器存储不可用，未保存；请在扩展页面操作。");
  if (typeof navigator > "u" || !navigator.locks?.request)
    throw new Error("当前环境不支持标题保存保护，未提交修改。");
  const t = new AbortController(), r = setTimeout(() => t.abort(), 1e4);
  let s = !1;
  try {
    return await navigator.locks.request("logicweaver:launcher-titles", { signal: t.signal }, async () => {
      if (pe) throw new G();
      const o = await _e(i);
      if (t.signal.aborted) throw new Error("等待保存超时，本次未提交。");
      const n = e(o), c = Object.fromEntries(i.filter((a) => !D(o[a], n[a])).map((a) => [a, n[a]]));
      if (Object.keys(c).length) {
        clearTimeout(r), s = !0, await new Promise((l, h) => {
          chrome.storage.local.set(c, () => {
            chrome.runtime.lastError ? h(new G()) : l();
          });
        });
        const a = await _e(i);
        if (i.some((l) => !D(a[l], n[l])))
          throw new G();
      }
      try {
        for (const a of i) n[a] !== void 0 && localStorage.setItem(`logicweaver:${a}`, JSON.stringify(n[a]));
      } catch {
      }
      return n;
    });
  } catch (o) {
    throw s || o instanceof G ? (pe = !0, new G()) : t.signal.aborted ? new Error("等待保存超时，本次未提交。") : o;
  } finally {
    clearTimeout(r);
  }
}
function ke(i) {
  if (!Array.isArray(i) || i.some((e) => !e || typeof e != "object" || Array.isArray(e)))
    throw new Error("网站数据格式异常，未覆盖已有数据。");
  return i;
}
function be(i) {
  if (i === void 0) return {};
  if (!i || typeof i != "object" || Array.isArray(i))
    throw new Error("文件夹数据格式异常，未覆盖已有数据。");
  return i;
}
function re(i) {
  const e = i.trim().replace(/\s+/g, " ");
  if (!e) throw new Error("文件夹名称不能为空。");
  if (e.length > 20) throw new Error("文件夹名称最多20个字符，请缩短后再保存。");
  if (["__proto__", "constructor", "prototype"].includes(e)) throw new Error("这个名称不可用，请换一个名称。");
  return e;
}
const ye = (i, e) => Object.prototype.hasOwnProperty.call(i, e);
function ne(i, e) {
  if (!ye(i, e)) return;
  const t = i[e]?.parent;
  if (!t || typeof t != "string" || !ye(i, t)) return;
  const r = /* @__PURE__ */ new Set([e]);
  let s = t;
  for (; s; ) {
    if (r.has(s)) return;
    r.add(s), s = ye(i, s) ? i[s]?.parent : void 0;
  }
  return t;
}
function Oe(i, e) {
  const t = /* @__PURE__ */ new Set([e]), r = /* @__PURE__ */ new Map();
  for (const o of Object.keys(i)) {
    const n = ne(i, o);
    n && r.set(n, [...r.get(n) || [], o]);
  }
  const s = [e];
  for (let o = 0; o < s.length; o++) for (const n of r.get(s[o]) || [])
    t.has(n) || (t.add(n), s.push(n));
  return t;
}
const C = "quickLinks", x = "quickLinkGroupSizes", T = "launcherFolders", M = "launcherPages", N = "launcherPageLabels", U = "launcherActivePage", se = "launcherIconCache", ct = 480, lt = 18e5, ut = 120 * 1024, I = "常用网站", w = "常用网站";
class V {
  constructor() {
    this.state = {
      links: [],
      groupSizes: {},
      folders: {},
      pages: [I],
      pageLabels: {},
      activePage: I
    }, this.iconCache = {}, this.iconCachePending = /* @__PURE__ */ new Set(), this.iconCacheSaveTimer = null, this.listeners = [], this.isLoaded = !1, this.ready = this.initFromWindowOrStorage(), this.bindStorageChangeListener();
  }
  bindStorageChangeListener() {
    typeof chrome < "u" && chrome.storage?.onChanged && chrome.storage.onChanged.addListener((e, t) => {
      if (t !== "local") return;
      let r = !1;
      e[C] && Array.isArray(e[C].newValue) && (this.state.links = [...e[C].newValue], r = !0), e[x] && e[x].newValue && (this.state.groupSizes = { ...e[x].newValue }, r = !0), e[T] && e[T].newValue && (this.state.folders = { ...e[T].newValue }, r = !0), e[M] && Array.isArray(e[M].newValue) && e[M].newValue.length > 0 && (this.state.pages = [...e[M].newValue], r = !0), e[N] && e[N].newValue && (this.state.pageLabels = { ...e[N].newValue }, r = !0), e[U] && typeof e[U].newValue == "string" && (this.state.activePage = e[U].newValue, r = !0), r && this.notify();
    });
  }
  static getInstance() {
    return V.instance || (V.instance = new V()), V.instance;
  }
  /**
   * 规范化网址格式
   */
  normalizeUrl(e) {
    const t = String(e || "").trim();
    return t ? /^[a-zA-Z][a-zA-Z\d+\-.]*?:/i.test(t) ? t : t.startsWith("//") ? "https:" + t : "https://" + t : "";
  }
  hostOf(e) {
    try {
      return new URL(this.normalizeUrl(e)).hostname.replace(/^www\./, "");
    } catch {
      return e || "";
    }
  }
  getCacheKey(e) {
    try {
      return new URL(this.normalizeUrl(e)).origin.toLowerCase();
    } catch {
      return String(e || "").trim().toLowerCase();
    }
  }
  /**
   * 存储读写封装
   */
  async storageGet(e) {
    const t = {};
    return typeof chrome < "u" && chrome.storage && chrome.storage.local ? new Promise((r) => {
      chrome.storage.local.get(e, (s) => r(s || {}));
    }) : (typeof localStorage < "u" && e.forEach((r) => {
      const s = localStorage.getItem(`logicweaver:${r}`);
      if (s)
        try {
          t[r] = JSON.parse(s);
        } catch {
          t[r] = s;
        }
    }), t);
  }
  async storageSet(e) {
    typeof chrome < "u" && chrome.storage && chrome.storage.local && await new Promise((t) => {
      chrome.storage.local.set(e, () => t());
    }), typeof localStorage < "u" && Object.entries(e).forEach(([t, r]) => {
      try {
        localStorage.setItem(`logicweaver:${t}`, JSON.stringify(r));
      } catch {
      }
    });
  }
  /**
   * 初始化数据
   */
  async initFromWindowOrStorage() {
    const e = typeof window < "u" ? window : null;
    e && e.launcherState && (this.state.links = Array.isArray(e.launcherState.links) ? [...e.launcherState.links] : [], this.state.groupSizes = { ...e.launcherState.groupSizes || {} }, this.state.folders = { ...e.launcherState.folders || {} }, this.state.pages = Array.isArray(e.launcherState.pages) ? [...e.launcherState.pages] : [I], this.state.pageLabels = { ...e.launcherState.pageLabels || {} }, this.state.activePage = e.launcherState.activePage || I), e && e.launcherIconCache && (this.iconCache = { ...e.launcherIconCache });
    const t = [
      C,
      x,
      T,
      M,
      N,
      U,
      se
    ];
    try {
      const r = await this.storageGet(t);
      Array.isArray(r[C]) && (this.state.links = [...r[C]]), r[x] && (this.state.groupSizes = { ...r[x] }), r[T] && (this.state.folders = { ...r[T] }), Array.isArray(r[M]) && r[M].length > 0 && (this.state.pages = [...r[M]]), r[N] && (this.state.pageLabels = { ...r[N] }), r[U] && (this.state.activePage = r[U]), r[se] && (this.iconCache = { ...r[se] });
    } catch {
    }
    return this.isLoaded = !0, this.syncToWindow(), this.notify(), this.getState();
  }
  /**
   * 同步到全局 window，保证老旧模块与测试完全兼容
   */
  syncToWindow() {
    if (typeof window > "u") return;
    const e = window;
    e.launcherState || (e.launcherState = {}), e.launcherState.links = this.state.links, e.launcherState.groupSizes = this.state.groupSizes, e.launcherState.folders = this.state.folders, e.launcherState.pages = this.state.pages, e.launcherState.pageLabels = this.state.pageLabels, e.launcherState.activePage = this.state.activePage, e.launcherIconCache || (e.launcherIconCache = this.iconCache);
  }
  /**
   * 同步更新内部状态快照
   */
  updateState(e) {
    e.links && (this.state.links = [...e.links]), e.pages && (this.state.pages = [...e.pages]), e.pageLabels && (this.state.pageLabels = { ...e.pageLabels }), e.groupSizes && (this.state.groupSizes = { ...e.groupSizes }), e.folders && (this.state.folders = { ...e.folders }), e.activePage && (this.state.activePage = e.activePage), this.syncToWindow();
  }
  getState() {
    return {
      links: [...this.state.links],
      groupSizes: { ...this.state.groupSizes },
      folders: { ...this.state.folders },
      pages: [...this.state.pages],
      pageLabels: { ...this.state.pageLabels },
      activePage: this.state.activePage
    };
  }
  subscribe(e) {
    return this.listeners.push(e), () => {
      this.listeners = this.listeners.filter((t) => t !== e);
    };
  }
  notify() {
    this.syncToWindow();
    const e = this.getState();
    this.listeners.forEach((t) => {
      try {
        t(e);
      } catch {
      }
    });
  }
  /**
   * 持久化启动器状态
   */
  async save() {
    await this.storageSet({
      [C]: this.state.links,
      [x]: this.state.groupSizes,
      [T]: this.state.folders,
      [M]: this.state.pages,
      [N]: this.state.pageLabels,
      [U]: this.state.activePage,
      quickLinksReady: !0
    }), this.notify();
  }
  async saveLink(e) {
    const t = new URL(this.normalizeUrl(e.url));
    if (t.protocol !== "https:" && t.protocol !== "http:") throw new Error("仅支持 HTTP/HTTPS 网站");
    const r = this.state.links.findIndex((c) => String(c.id) === String(e.id)), s = r >= 0 ? this.state.links[r] : void 0;
    let o = e.page ? e.page.trim() : s?.page || (s ? I : this.state.activePage);
    o && !this.state.pages.includes(o) && this.state.pages.push(o);
    const n = {
      ...s,
      id: s?.id || crypto.randomUUID(),
      title: e.title.trim(),
      url: t.href,
      group: e.group?.trim() || w,
      page: o,
      note: e.note !== void 0 ? e.note.trim() : s?.note
    };
    r >= 0 ? this.state.links[r] = n : this.state.links.push(n), await this.save();
  }
  /** Title-only intent: do not resubmit a stale URL, note, group, or entire launcher snapshot. */
  async renameLinkTitle(e, t, r) {
    const s = r.trim();
    if (!s) throw new Error("网站名称不能为空。");
    if (s.length > 50) throw new Error("网站名称最多50个字符。");
    return this.saveLinkTextField(e, "title", t, s);
  }
  async editLinkUrl(e, t, r) {
    if (!r.trim()) throw new Error("网址不能为空。");
    let s;
    try {
      s = new URL(this.normalizeUrl(r));
    } catch {
      throw new Error("网址格式不正确，请检查后再保存。");
    }
    if (s.protocol !== "https:" && s.protocol !== "http:") throw new Error("仅支持 HTTP/HTTPS 网站。");
    if (s.username || s.password) throw new Error("请勿在网址中保存用户名或密码。");
    return this.saveLinkTextField(e, "url", t, s.href);
  }
  async editLinkNote(e, t, r) {
    const s = r.trim();
    if (s.length > 200) throw new Error("网站备注最多200个字符。");
    return this.saveLinkTextField(e, "note", t, s);
  }
  async saveLinkTextField(e, t, r, s) {
    await this.ready;
    const o = await we([C], (n) => {
      const c = ke(n[C]), a = c.filter((u) => String(u.id) === String(e));
      if (a.length !== 1) throw new Error("网站已删除或标识重复，未提交；请重新打开菜单核对。");
      const l = a[0], h = l[t] || "";
      if (h !== (r || "") && h !== s)
        throw new Error("这一字段已被其他操作修改，未覆盖。请复制草稿，重新打开菜单核对。");
      return { [C]: c.map((u) => u === l ? { ...u, [t]: s } : u) };
    });
    return this.state.links = o[C], this.notify(), s;
  }
  async saveLinkNote(e, t) {
    const r = this.state.links.find((s) => String(s.id) === String(e));
    r && (r.note = t.trim(), await this.save());
  }
  async setLinkIcon(e, t) {
    const r = this.state.links.find((s) => String(s.id) === String(e));
    !r || !t || (r.customIcon = t, await this.save());
  }
  // ==================== 图标离屏缓存逻辑 ====================
  getCachedIcon(e) {
    const t = this.getCacheKey(e);
    return this.iconCache[t]?.dataUrl || null;
  }
  evictCachedIcon(e) {
    const t = this.getCacheKey(e);
    this.iconCache[t] && (delete this.iconCache[t], this.scheduleIconCacheSave());
  }
  scheduleIconCacheSave() {
    this.iconCacheSaveTimer && clearTimeout(this.iconCacheSaveTimer), this.iconCacheSaveTimer = setTimeout(async () => {
      let e = 0;
      const t = Object.entries(this.iconCache).sort((s, o) => Number(o[1]?.savedAt || 0) - Number(s[1]?.savedAt || 0)).filter(([, s]) => {
        const o = String(s?.dataUrl || "").length;
        return !o || e + o > lt ? !1 : (e += o, !0);
      }).slice(0, ct), r = {};
      t.forEach(([s, o]) => {
        r[s] = o;
      }), this.iconCache = r, typeof window < "u" && (window.launcherIconCache = r);
      try {
        await this.storageSet({ [se]: this.iconCache });
      } catch {
      }
    }, 1200);
  }
  async cacheIcon(e, t, r) {
    const s = this.getCacheKey(e);
    if (!(!s || !t || t.startsWith("data:") || this.iconCachePending.has(s))) {
      this.iconCachePending.add(s);
      try {
        let o = "";
        if (r && r.naturalWidth && r.naturalHeight)
          try {
            const n = document.createElement("canvas"), c = Math.min(64, r.naturalWidth), a = Math.min(64, r.naturalHeight);
            n.width = c, n.height = a;
            const l = n.getContext("2d");
            l && (l.drawImage(r, 0, 0, c, a), o = n.toDataURL("image/png"));
          } catch {
          }
        if (o && o.startsWith("data:image/")) {
          this.iconCache[s] = { dataUrl: o, savedAt: Date.now() }, this.scheduleIconCacheSave();
          return;
        }
        if (!t.startsWith("chrome-extension:"))
          try {
            const n = await fetch(t, { credentials: "omit", cache: "force-cache" });
            if (n.ok) {
              const c = await n.blob();
              if (c.size && c.size <= ut && /^image\//i.test(c.type || "")) {
                const a = await new Promise((l, h) => {
                  const d = new FileReader();
                  d.onload = () => l(String(d.result || "")), d.onerror = () => h(d.error), d.readAsDataURL(c);
                });
                if (a && a.startsWith("data:image/")) {
                  this.iconCache[s] = { dataUrl: a, savedAt: Date.now() }, this.scheduleIconCacheSave();
                  return;
                }
              }
            }
          } catch {
          }
        /^https?:\/\//i.test(t) && (this.iconCache[s] = { dataUrl: t, savedAt: Date.now() }, this.scheduleIconCacheSave());
      } catch {
      } finally {
        this.iconCachePending.delete(s);
      }
    }
  }
  // ==================== 分区 (Pages) 业务逻辑 ====================
  getPageNames() {
    const e = /* @__PURE__ */ new Set([
      I,
      ...this.state.pages,
      ...this.state.links.map((t) => t.page || I)
    ]);
    return Array.from(e).map((t) => String(t || "").trim()).filter(Boolean);
  }
  getPageLabel(e) {
    return String(this.state.pageLabels[e] || (e === I ? "默认" : e));
  }
  async setPage(e, t = !0) {
    const r = this.getPageNames(), s = r.includes(e) ? e : r[0] || I;
    this.state.activePage = s, t && await this.storageSet({ [U]: s }).catch(() => {
    }), this.notify();
  }
  async stepPage(e) {
    const t = this.getPageNames();
    if (t.length < 2) return;
    const r = Math.max(0, t.indexOf(this.state.activePage)), s = t[(r + e + t.length) % t.length];
    await this.setPage(s);
  }
  async addPage(e) {
    const t = String(e || "").trim().replace(/\s+/g, " ").slice(0, 12);
    if (!t) return !1;
    const r = this.getPageNames().find((o) => this.getPageLabel(o).toLowerCase() === t.toLowerCase());
    if (r)
      return await this.setPage(r), !1;
    let s = t;
    for (; this.getPageNames().includes(s); )
      s = `${t}-${crypto.randomUUID().slice(0, 4)}`;
    return this.state.pages.push(s), this.state.pageLabels[s] = t, this.state.activePage = s, await this.save(), !0;
  }
  async renamePage(e, t) {
    const r = String(t || "").trim().replace(/\s+/g, " ").slice(0, 12);
    return !r || this.getPageNames().some((o) => o !== e && this.getPageLabel(o).toLowerCase() === r.toLowerCase()) ? !1 : (this.state.pageLabels[e] = r, await this.save(), !0);
  }
  async deletePage(e) {
    const t = this.getPageNames();
    if (t.length <= 1) return !1;
    const r = t.find((s) => s !== e) || I;
    this.state.links.forEach((s) => {
      (s.page || I) === e && (s.page = r);
    });
    for (const [s, o] of Object.entries(this.state.folders)) (o.page || I) === e && (this.state.folders[s] = { ...o, page: r });
    return this.state.pages = this.state.pages.filter((s) => s !== e), delete this.state.pageLabels[e], this.state.activePage === e && (this.state.activePage = r), await this.save(), !0;
  }
  // ==================== 快捷链接 (Links) 业务逻辑 ====================
  getLinks(e) {
    return e ? this.state.links.filter((t) => (t.page || I) === e) : [...this.state.links];
  }
  async addLink(e) {
    const t = this.normalizeUrl(e.url), r = this.state.links.find((c) => this.normalizeUrl(c.url) === t), s = e.group || w, o = e.page || this.state.activePage;
    if (r)
      return r.group = s, r.page = o, !r.title && e.title && (r.title = e.title), e.customIcon && (r.customIcon = e.customIcon), e.icon && (r.icon = e.icon), await this.save(), r;
    const n = {
      id: crypto.randomUUID(),
      title: e.title || this.hostOf(t),
      url: t,
      group: s,
      page: o,
      icon: e.icon,
      customIcon: e.customIcon
    };
    return this.state.links.push(n), await this.save(), n;
  }
  async updateLink(e, t) {
    const r = this.state.links.find((s) => s.id === e);
    return r ? (Object.assign(r, t), t.url && (r.url = this.normalizeUrl(t.url)), await this.save(), !0) : !1;
  }
  async deleteLink(e) {
    const t = this.state.links.length, r = this.state.links.find((s) => s.id === e);
    return this.state.links = this.state.links.filter((s) => s.id !== e), this.state.links.length === t ? !1 : (r?.group && this.cleanUnusedGroups([r.group]), await this.save(), !0);
  }
  async moveLinkTo(e, t, r) {
    const s = this.state.links.find((n) => n.id === e);
    if (!s) return !1;
    const o = s.group || w;
    return s.group = r || w, s.page = s.group !== w ? this.getFolderPage(s.group) : t || this.state.activePage, this.cleanUnusedGroups([o]), await this.save(), t && t !== this.state.activePage && await this.setPage(t), !0;
  }
  // ==================== 分组/文件夹 (Folders / Groups) 业务逻辑 ====================
  getGroupNames() {
    return Array.from(/* @__PURE__ */ new Set([...this.state.links.map((e) => e.group || w), ...Object.keys(this.state.folders)]));
  }
  getFolderParent(e) {
    return ne(this.state.folders, e);
  }
  getFolderPage(e) {
    let t = e;
    for (let r = this.getFolderParent(t); r; r = this.getFolderParent(t)) t = r;
    return this.state.folders[t]?.page || this.state.links.find((r) => r.group === t)?.page || this.state.activePage || I;
  }
  async moveFolderInto(e, t, r) {
    if (!e || e === w) throw new Error("不能移动默认分组。");
    await this.ready;
    const s = [C, T], o = r || this.getFolderPage(e), n = await we(s, (c) => {
      const a = ke(c[C]), l = be(c[T]), h = /* @__PURE__ */ new Set([...Object.keys(l), ...a.map((y) => y.group || w)]);
      if (!h.has(e) || t && (!h.has(t) || t === w)) throw new Error("文件夹已变化，请重新打开后再移动。");
      re(e), t && re(t);
      const d = /* @__PURE__ */ new Set();
      for (let y = t; y; y = Object.prototype.hasOwnProperty.call(l, y) ? l[y]?.parent : void 0) {
        if (y === e || d.has(y)) throw new Error("不能移入自身、后代或层级异常的文件夹。");
        d.add(y);
      }
      const u = Oe(l, e);
      if (t && u.has(t)) throw new Error("不能把文件夹放入自身或自己的子文件夹。");
      let f = t;
      for (; f && ne(l, f); ) f = ne(l, f);
      const S = t && (l[f]?.page || a.find((y) => y.group === f)?.page) || o, m = { ...l };
      t && !Object.prototype.hasOwnProperty.call(m, t) && (m[t] = { name: t, page: S });
      for (const y of u) m[y] = { ...m[y], name: y, page: S };
      return t ? m[e] = { ...m[e], parent: t } : delete m[e].parent, {
        ...c,
        [T]: m,
        [C]: a.map((y) => u.has(y.group || w) ? { ...y, page: S } : y)
      };
    });
    return this.state.links = n[C], this.state.folders = n[T], this.notify(), !0;
  }
  getGroupSize(e) {
    return this.state.groupSizes[e] === "small" ? "small" : this.state.groupSizes[e] === "large" || e === w ? "large" : "small";
  }
  async toggleGroupSize(e) {
    const t = this.getGroupSize(e) === "large" ? "small" : "large";
    return this.state.groupSizes[e] = t, await this.save(), t;
  }
  async renameGroup(e, t) {
    const r = re(t);
    if (r === e) return !1;
    if (!e || e === w) throw new Error("默认分组不能通过文件夹重命名。");
    await this.ready;
    const s = at(this.state), o = (l, h) => Object.prototype.hasOwnProperty.call(l, h), n = (l) => l.filter((h) => (h.group || w) === e).map((h) => String(h.id)).sort(), a = await we([C, x, T], (l) => {
      const h = ke(l[C]), d = be(l[x]), u = be(l[T]), f = /* @__PURE__ */ new Set([
        w,
        ...h.map((m) => m.group || w),
        ...Object.keys(d),
        ...Object.keys(u)
      ]);
      if (!f.has(e)) throw new Error("文件夹已被修改或删除，请重新打开后核对。");
      if ([...f].some((m) => typeof m == "string" && m !== e && m.toLowerCase() === r.toLowerCase()))
        throw new Error("已有同名文件夹，请换一个名称；原文件夹未修改。");
      if (!D(n(h), n(s.links)) || !D(d[e], s.groupSizes[e]) || !D(u[e], s.folders[e]))
        throw new Error("文件夹内容已被其他操作修改，未覆盖；请复制草稿，重新打开后核对。");
      const S = { ...l, [C]: h.map((m) => (m.group || w) === e ? { ...m, group: r } : m) };
      if (o(d, e)) {
        const m = { ...d, [r]: d[e] };
        delete m[e], S[x] = m;
      }
      if (o(u, e)) {
        const m = u[e];
        if (!m || typeof m != "object" || Array.isArray(m)) throw new Error("文件夹记录格式异常，未提交修改。");
        const y = { ...u, [r]: { ...m, name: r } };
        delete y[e];
        for (const P of Object.keys(y)) y[P]?.parent === e && (y[P] = { ...y[P], parent: r });
        S[T] = y;
      }
      return S;
    });
    return this.state.links = a[C], this.state.groupSizes = a[x] || {}, this.state.folders = a[T] || {}, this.notify(), !0;
  }
  async moveFolderToPage(e, t) {
    return !e || !t ? !1 : (await this.moveFolderInto(e, void 0, t), await this.setPage(t), !0);
  }
  async deleteGroup(e, t) {
    if (!e || e === w) return !1;
    const r = this.getFolderParent(e);
    for (const [s, o] of Object.entries(this.state.folders)) o.parent === e && (this.state.folders[s] = { ...o, parent: r });
    return t === "release" ? this.state.links.forEach((s) => {
      (s.group || w) === e && (s.group = r || w);
    }) : this.state.links = this.state.links.filter((s) => (s.group || w) !== e), delete this.state.groupSizes[e], this.state.folders && delete this.state.folders[e], await this.save(), !0;
  }
  async mergeGroups(e, t) {
    if (!e || !t || e === t) return !1;
    if (Oe(this.state.folders, e).has(t)) throw new Error("不能合并到自己的子文件夹。");
    for (const [s, o] of Object.entries(this.state.folders)) o.parent === e && (this.state.folders[s] = { ...o, parent: t === w ? void 0 : t });
    const r = /* @__PURE__ */ new Set();
    return this.state.links.filter((s) => (s.group || w) === t).forEach((s) => {
      try {
        r.add(this.normalizeUrl(s.url));
      } catch {
      }
    }), this.state.links = this.state.links.filter((s) => {
      if ((s.group || w) !== e) return !0;
      let o = s.url;
      try {
        o = this.normalizeUrl(s.url);
      } catch {
      }
      return r.has(o) ? !1 : (r.add(o), s.group = t, !0);
    }), delete this.state.groupSizes[e], this.state.folders && delete this.state.folders[e], await this.save(), !0;
  }
  async stackLinks(e, t) {
    if (!e || e === t) return;
    const r = this.state.links.find((a) => a.id === e), s = this.state.links.find((a) => a.id === t);
    if (!r || !s) return;
    const o = r.group || w, n = s.group || w;
    r.page = s.page || I;
    const c = this.state.links.filter((a) => (a.group || w) === n).length;
    if (o !== n && n !== w && c > 1)
      r.group = n, this.state.groupSizes[n] = "large", this.cleanUnusedGroups([o]);
    else if (o !== n || n === w) {
      const a = this.uniqueGroupName(s.title);
      r.group = a, s.group = a, this.state.groupSizes[a] = "small", this.cleanUnusedGroups([o, n]);
    } else
      return;
    await this.save();
  }
  async createFolder(e = "large", t, r, s) {
    const o = /* @__PURE__ */ new Set([w, ...this.getGroupNames()]);
    this.state.folders && Object.keys(this.state.folders).forEach((l) => o.add(l));
    const n = e === "large" ? "新建大文件夹" : "新建中文件夹";
    let c = (t || n).trim();
    if (o.has(c)) {
      let l = 2;
      for (; o.has(`${n} ${l}`); ) l += 1;
      c = `${n} ${l}`;
    }
    if (c = re(c), s && !this.getGroupNames().includes(s)) throw new Error("上级文件夹不存在。");
    const a = s ? this.getFolderPage(s) : r || this.state.activePage || I;
    return this.state.folders || (this.state.folders = {}), s && !Object.prototype.hasOwnProperty.call(this.state.folders, s) && (this.state.folders[s] = { name: s, page: a }), this.state.folders[c] = { name: c, page: a, ...s ? { parent: s } : {} }, this.state.groupSizes[c] = e, await this.save(), c;
  }
  async createLargeFolder(e, t) {
    return this.createFolder("large", e, t);
  }
  async createMediumFolder(e, t) {
    return this.createFolder("small", e, t);
  }
  async createLargeFolderFromLink(e, t) {
    const r = this.state.links.find((n) => String(n.id) === String(e));
    if (!r) return "";
    const s = t?.trim() || this.uniqueGroupName(r.title), o = r.group || w;
    return r.group = s, this.state.groupSizes[s] = "large", this.cleanUnusedGroups([o]), await this.save(), s;
  }
  uniqueGroupName(e) {
    const t = new Set(this.getGroupNames()), r = `${(e || "新").trim().slice(0, 14)}收藏夹`;
    if (!t.has(r)) return r;
    let s = 2;
    for (; t.has(`${r} ${s}`); ) s += 1;
    return `${r} ${s}`;
  }
  cleanUnusedGroups(e) {
    e.forEach((t) => {
      if (!this.state.links.some((r) => (r.group || w) === t)) {
        if (this.state.folders && this.state.folders[t])
          return;
        delete this.state.groupSizes[t], this.state.folders && delete this.state.folders[t];
      }
    });
  }
  // ==================== 排序与拖拽 (Tile Reorder) ====================
  async moveFolderToEnd(e) {
    const t = this.state.links.filter((r) => (r.group || w) === e);
    t.length && (this.state.links = this.state.links.filter((r) => (r.group || w) !== e).concat(t), await this.save());
  }
  async reorderLinks(e, t, r = "after") {
    const s = [...this.state.links], o = s.findIndex((h) => String(h.id) === String(e));
    if (o < 0) return !1;
    const n = s[o];
    s.splice(o, 1);
    const c = s.findIndex((h) => String(h.id) === String(t));
    if (c < 0) return !1;
    const a = s[c];
    n.page = a.page || I, n.group = a.group || w;
    const l = r === "before" ? c : c + 1;
    return s.splice(l, 0, n), this.state.links = s, await this.save(), this.notify(), !0;
  }
  async reorderFolderLinks(e, t) {
    const r = e || w, s = this.state.links.findIndex((h) => (h.group || w) === r);
    if (s < 0) return !1;
    const o = this.state.links.filter((h) => (h.group || w) === r), n = this.state.links.filter((h) => (h.group || w) !== r), c = new Map(o.map((h) => [String(h.id), h])), a = [];
    for (const h of t) {
      const d = c.get(String(h));
      d && (a.push(d), c.delete(String(h)));
    }
    for (const h of c.values())
      a.push(h);
    const l = [...n];
    return l.splice(Math.min(s, l.length), 0, ...a), this.state.links = l, await this.save(), this.notify(), !0;
  }
  async reorderTile(e, t, r = "after") {
    if (!e || !t) return;
    if (e.kind === "link" && t.kind === "link" && e.id && t.id) {
      await this.reorderLinks(e.id, t.id, r);
      return;
    }
    const s = e.kind === "folder" ? this.state.links.filter((f) => (f.group || w) === e.group) : this.state.links.filter((f) => String(f.id) === String(e.id));
    if (!s.length) return;
    if (t.kind === "folder" && t.group) {
      const S = (this.state.folders ? this.state.folders[t.group] : void 0)?.page || this.state.activePage || I;
      s.forEach((m) => {
        m.group = t.group, m.page = S;
      }), await this.save(), this.notify();
      return;
    }
    const o = new Set(s.map((f) => String(f.id))), n = this.state.links.filter((f) => String(f.id) === String(t.id));
    if (!n.length || n.some((f) => o.has(String(f.id)))) return;
    const c = n[0].page || I, a = n[0].group || w;
    s.forEach((f) => {
      f.page = c, f.group = a;
    });
    const l = new Set(n.map((f) => String(f.id))), h = this.state.links.filter((f) => !o.has(String(f.id))), d = h.map((f, S) => l.has(String(f.id)) ? S : -1).filter((f) => f >= 0);
    if (!d.length) return;
    const u = r === "before" ? Math.min(...d) : Math.max(...d) + 1;
    h.splice(u, 0, ...s), this.state.links = h, await this.save(), this.notify();
  }
  async reorderPageItems(e, t) {
    const r = String(e || I).trim(), s = !r || r === "常用网站" || r === "默认", o = this.state.pageLabels || {}, n = (d) => {
      const u = String(d.page || "").trim(), f = !u || u === "常用网站" || u === "默认";
      if (s) return f;
      if (f) return !1;
      if (u === r) return !0;
      const S = o[u] || u, m = o[r] || r;
      return S === m || u === m || S === r;
    }, c = this.state.links.filter(n), a = this.state.links.filter((d) => !n(d)), l = [], h = /* @__PURE__ */ new Set();
    for (const d of t)
      if (d.type === "link" && d.id) {
        const u = c.find((f) => String(f.id) === String(d.id));
        u && !h.has(String(u.id)) && (h.add(String(u.id)), l.push(u));
      } else if (d.type === "folder" && d.groupName) {
        const u = c.filter(
          (f) => (f.group || w) === d.groupName
        );
        for (const f of u)
          h.has(String(f.id)) || (h.add(String(f.id)), l.push(f));
      }
    for (const d of c)
      h.has(String(d.id)) || l.push(d);
    this.state.links = [...a, ...l], await this.save(), this.notify();
  }
}
const _ = V.getInstance(), b = ee({
  mounted: !1,
  isOpen: !1,
  left: 0,
  top: 0,
  item: null,
  isFolder: !1,
  title: "",
  hostOrCount: "",
  iconUrl: "",
  mode: "actions",
  renameValue: "",
  noteValue: "",
  launcherGroups: ["常用网站"],
  selectedLauncherGroup: "常用网站",
  statusText: "",
  statusVisible: !1
});
let Se = null;
const F = {
  state: b,
  setMounted(i) {
    b.mounted = i;
  },
  onAction(i) {
    Se = i;
  },
  dispatch(i, e) {
    if (Se)
      return Se(i, e);
  },
  openMenu(i, e, t, r) {
    b.item = i, b.isFolder = i.isFolder === !0 || !i.url, b.title = i.title || (b.isFolder ? "未命名文件夹" : i.url || ""), b.hostOrCount = r?.hostOrCount || (b.isFolder ? "浏览器文件夹" : i.url || ""), b.iconUrl = r?.iconUrl || "", b.mode = "actions", b.renameValue = i.title || "", b.noteValue = r?.note || "", r?.launcherGroups?.length && (b.launcherGroups = [...r.launcherGroups], b.selectedLauncherGroup = r.launcherGroups[0]), b.statusVisible = !1, b.statusText = "";
    const s = Math.max(10, Math.min(e, window.innerWidth - 300)), o = Math.max(10, Math.min(t, window.innerHeight - 350));
    b.left = s, b.top = o, b.isOpen = !0, this.dispatch("open", { item: i, clientX: e, clientY: t });
  },
  closeMenu() {
    b.isOpen = !1, b.mode = "actions", b.item = null, this.dispatch("close");
  },
  setMode(i) {
    b.mode = i, b.statusVisible = !1, b.statusText = "", this.dispatch("set-mode", i);
  },
  setStatus(i) {
    b.statusText = i, b.statusVisible = !!i;
  },
  openBookmark() {
    this.dispatch("open-bookmark", b.item);
  },
  newSubFolder() {
    this.dispatch("new-folder", b.item);
  },
  saveToLauncher() {
    this.dispatch("save-launcher", {
      item: b.item,
      group: b.selectedLauncherGroup
    });
  },
  saveRename() {
    if (!b.renameValue.trim()) {
      this.setStatus("名称不能为空");
      return;
    }
    this.dispatch("save-rename", {
      item: b.item,
      newTitle: b.renameValue.trim()
    });
  },
  saveNote() {
    this.dispatch("save-note", {
      item: b.item,
      note: b.noteValue.trim()
    });
  },
  confirmDelete() {
    this.dispatch("delete-bookmark", b.item);
  }
}, v = Te({
  open: !1,
  pinned: !1,
  title: "浏览器书签",
  feedbackText: "",
  feedbackError: !1,
  feedbackVisible: !1,
  positionLeft: null,
  items: [],
  searchQuery: "",
  emptyText: "书签栏为空"
}), ve = /* @__PURE__ */ new Set();
let $ = null;
const E = {
  state: v,
  open(i) {
    v.open = !0, i && (v.title = i);
  },
  close() {
    v.open = !1;
  },
  toggle() {
    v.open = !v.open;
  },
  setPinned(i) {
    v.pinned = !!i;
  },
  setTitle(i) {
    v.title = i;
  },
  setPosition(i) {
    v.positionLeft = i;
  },
  showFeedback(i, e = !1) {
    $ && (clearTimeout($), $ = null), v.feedbackText = i, v.feedbackError = e, v.feedbackVisible = !0, $ = setTimeout(() => {
      v.feedbackVisible = !1, v.feedbackText = "", v.feedbackError = !1;
    }, 2600);
  },
  hideFeedback() {
    $ && (clearTimeout($), $ = null), v.feedbackVisible = !1, v.feedbackText = "", v.feedbackError = !1;
  },
  setBookmarks(i, e) {
    v.items = Array.isArray(i) ? [...i] : [], e !== void 0 && (v.emptyText = e);
  },
  setSearchQuery(i) {
    v.searchQuery = i;
  },
  openBookmark(i) {
    this.dispatch("open-bookmark", i);
  },
  openContextMenu(i, e, t) {
    this.dispatch("context-menu", { item: i, clientX: e, clientY: t });
  },
  updateState(i) {
    Object.assign(v, i);
  },
  onAction(i) {
    return ve.add(i), () => {
      ve.delete(i);
    };
  },
  dispatch(i, e) {
    for (const t of ve)
      try {
        t(i, e);
      } catch (r) {
        console.error(`[BookmarkPanel] Handler error for action ${i}:`, r);
      }
  }
}, ht = ee({
  mounted: !1,
  enabled: !1,
  folders: [],
  emptyMessage: "书签栏没有文件夹"
}), Y = ht;
let Ie = null;
const ie = {
  state: Y,
  setMounted(i) {
    Y.mounted = i;
  },
  updateState(i) {
    Object.assign(Y, i);
  },
  setEnabled(i) {
    Y.enabled = i;
  },
  setFolders(i) {
    Y.folders = Array.isArray(i) ? [...i] : [];
  },
  onAction(i) {
    Ie = i;
  },
  dispatch(i, e) {
    if (Ie)
      return Ie(i, e);
  },
  openFolder(i) {
    this.dispatch("open-folder", { id: i });
  },
  openContextMenu(i, e, t) {
    this.dispatch("context-menu", { folder: i, clientX: e, clientY: t });
  }
}, dt = "bookmarkPanelPinnedV1";
function W(i) {
  if (!i) return "";
  if (typeof window.hostOf == "function") return window.hostOf(i);
  try {
    return new URL(i).hostname;
  } catch {
    return i;
  }
}
function ft(i) {
  return i ? typeof window.favi == "function" ? window.favi(i) : `chrome-extension://${chrome?.runtime?.id || ""}/_favicon/?pageUrl=${encodeURIComponent(i)}&size=32` : "";
}
function oe(i) {
  return typeof window.storageGet == "function" ? window.storageGet(i) : new Promise((e) => {
    typeof chrome < "u" && chrome?.storage?.local?.get ? chrome.storage.local.get(i, e) : e({});
  });
}
function Ce(i) {
  return typeof window.storageSet == "function" ? window.storageSet(i) : new Promise((e) => {
    typeof chrome < "u" && chrome?.storage?.local?.set ? chrome.storage.local.set(i, () => e()) : e();
  });
}
async function qe(i, e = {}, t = 5e3) {
  if (typeof window.fetchTimeout == "function")
    return window.fetchTimeout(i, e, t);
  const r = new AbortController(), s = setTimeout(() => r.abort(), t);
  try {
    return await fetch(i, { credentials: "omit", ...e, signal: r.signal });
  } finally {
    clearTimeout(s);
  }
}
class gt {
  constructor() {
    this.importState = {
      items: [],
      tree: null,
      loaded: !1,
      remarks: {},
      expandedFolders: /* @__PURE__ */ new Set(),
      focusFolderId: "",
      panelPosition: null,
      panelPinned: !1
    }, this.worker = null, this.workerSeq = 0, this.workerReady = null, this.workerPending = /* @__PURE__ */ new Map(), this.dataPromise = null, this.topBookmarkFoldersEnabled = !1, this.topBookmarkEventsBound = !1, this.editingItem = null, this.initialized = !1, this.folderMapCache = null, this.ignoredFoldersCache = null, this.initWorker(), this.wireListeners(), this.init();
  }
  async init() {
    if (!this.initialized) {
      this.initialized = !0;
      try {
        const e = await oe(["showBookmarkFoldersTop", "showBookmarkPanel", "bookmarkRemarks"]).catch(() => ({}));
        this.importState.remarks = e?.bookmarkRemarks || {};
        const t = e?.showBookmarkFoldersTop === !0, r = e?.showBookmarkPanel !== !1;
        await this.ensureBookmarkData(), await this.renderTopBookmarkFolderStrip(t && r);
      } catch (e) {
        console.warn("[BookmarksService] Failed to initialize bookmarks", e);
      }
      typeof chrome < "u" && chrome?.storage?.onChanged && chrome.storage.onChanged.addListener((e, t) => {
        t === "local" && (e.showBookmarkFoldersTop || e.showBookmarkPanel) && oe(["showBookmarkFoldersTop", "showBookmarkPanel"]).then((r) => {
          const s = r?.showBookmarkFoldersTop === !0, o = r?.showBookmarkPanel !== !1;
          this.renderTopBookmarkFolderStrip(s && o);
        });
      });
    }
  }
  initWorker() {
    if (!(typeof Worker > "u"))
      try {
        this.worker = new Worker("generated/bookmarks-worker.js"), this.worker.onmessage = (e) => {
          const { id: t, type: r, result: s, error: o } = e.data || {};
          if (!t || !this.workerPending.has(t)) return;
          const { resolve: n, reject: c } = this.workerPending.get(t);
          this.workerPending.delete(t), o ? c(new Error(o)) : n(s);
        }, this.worker.onerror = () => {
          for (const e of [...this.workerPending.values()]) e.reject(new Error("Bookmarks Worker failed"));
        }, this.importState.loaded && (this.workerReady = this.callWorker("INDEX_BOOKMARKS", { tree: this.importState.tree ? [this.importState.tree] : [] }), this.workerReady.catch(() => {
        }));
      } catch (e) {
        console.warn("[BookmarksWorker] Failed to initialize Web Worker:", e), this.worker = null;
      }
  }
  callWorker(e, t, r = 5e3, s) {
    return s?.aborted ? Promise.reject(new DOMException("Cancelled", "AbortError")) : (this.worker || this.initWorker(), this.worker ? new Promise((o, n) => {
      const c = ++this.workerSeq, a = () => {
        clearTimeout(d), s?.removeEventListener("abort", h), this.workerPending.delete(c);
      }, l = {
        resolve: (u) => {
          a(), o(u);
        },
        reject: (u) => {
          a(), n(u);
        }
      }, h = () => l.reject(new DOMException("Cancelled", "AbortError")), d = setTimeout(() => l.reject(new Error(`Worker request timeout [${e}]`)), r);
      this.workerPending.set(c, l), s?.addEventListener("abort", h, { once: !0 });
      try {
        this.worker.postMessage({ id: c, type: e, payload: t });
      } catch (u) {
        l.reject(u);
      }
    }) : Promise.reject(new Error("Bookmarks Worker not available")));
  }
  // null means unavailable/failed; [] is a successful search with no matches.
  async searchBookmarksViaWorker(e, t = 30, r) {
    if (r?.aborted) throw new DOMException("Cancelled", "AbortError");
    if (this.worker || this.initWorker(), !this.worker) return null;
    try {
      if (await this.ensureBookmarkData(), r?.aborted) throw new DOMException("Cancelled", "AbortError");
      this.workerReady && await this.workerReady;
      const s = await this.callWorker("SEARCH_BOOKMARKS", { query: e, limit: t }, 5e3, r);
      return Array.isArray(s) ? s : null;
    } catch {
      if (r?.aborted) throw new DOMException("Cancelled", "AbortError");
      return null;
    }
  }
  collectBookmarks(e, t = [], r = [], s = []) {
    let o = e.title || "";
    !o && (e.id === "1" || e.id === "2" || e.id === "3") && (o = e.id === "1" ? "书签栏" : e.id === "2" ? "其他书签" : "移动设备书签");
    const n = o ? [...t, o] : t, c = e.id && e.id !== "0" ? [...s, String(e.id)] : s;
    for (const a of e.children || [])
      a.url ? r.push({
        id: a.id,
        parentId: a.parentId,
        index: a.index,
        title: a.title || W(a.url),
        url: a.url,
        folder: n.join(" / ") || "书签",
        folderIds: c
      }) : this.collectBookmarks(a, n, r, c);
    return r;
  }
  getBookmarkFolderMap() {
    if (this.folderMapCache && this.importState.loaded)
      return this.folderMapCache;
    const e = /* @__PURE__ */ new Map();
    for (const t of this.importState.items)
      e.set(String(t.id), { folder: t.folder, folderIds: t.folderIds });
    return this.folderMapCache = e, e;
  }
  async getIgnoredFolders() {
    const t = (await oe(["searchIgnoredBookmarkFolders"]).catch(() => ({})))?.searchIgnoredBookmarkFolders;
    return this.ignoredFoldersCache = Array.isArray(t) ? t : [], this.ignoredFoldersCache;
  }
  isBookmarkIgnored(e, t, r) {
    if (!t || !t.length) return !1;
    const s = /* @__PURE__ */ new Set(), o = [], n = [], c = (u) => u ? u.toLowerCase().trim().replace(/\s*[/／]\s*/g, "/").replace(/^(书签栏|收藏夹栏|bookmarks bar|favorites bar|书签|bookmarks|其他书签|other bookmarks|移动设备书签|mobile bookmarks)\//i, "").trim() : "";
    for (const u of t)
      if (typeof u == "string") {
        s.add(u);
        const f = u.toLowerCase().trim();
        o.push(f), n.push(c(f));
      } else if (u && typeof u == "object" && (u.id && s.add(String(u.id)), u.path)) {
        const f = u.path.trim().toLowerCase();
        o.push(f), n.push(c(f));
      }
    const a = String(e.id || ""), l = String(e.parentId || "");
    if (a && s.has(a) || l && s.has(l) || e.folderIds && e.folderIds.some((u) => s.has(String(u))))
      return !0;
    const h = (u) => {
      if (!u) return !1;
      const f = u.toLowerCase().trim(), S = c(f);
      if (o.some((m) => f === m || f.startsWith(m + " /") || f.startsWith(m + "/")) || n.some((m) => m && (S === m || S.startsWith(m + "/"))))
        return !0;
      for (const m of n) {
        if (!m) continue;
        const y = m.split("/").pop();
        if (y && (S === y || S.endsWith("/" + y) || S.includes("/" + y + "/")))
          return !0;
      }
      return !1;
    }, d = r || (this.folderMapCache ?? void 0);
    if (d && a && d.has(a)) {
      const u = d.get(a);
      if (u.folderIds && u.folderIds.some((f) => s.has(String(f))) || u.folder && h(u.folder))
        return !0;
    }
    return !!(e.folder && h(e.folder));
  }
  bookmarkBarRoot(e) {
    return e && ((e.children || []).find((t) => String(t.id) === "1") || (e.children || []).find((t) => /书签栏|收藏夹栏|bookmarks bar|favorites bar/i.test(t.title || "")) || e.children?.[0]) || null;
  }
  bookmarkNodeById(e, t) {
    if (!e) return null;
    if (String(e.id) === String(t)) return e;
    for (const r of e.children || []) {
      const s = this.bookmarkNodeById(r, t);
      if (s) return s;
    }
    return null;
  }
  bookmarkNodeContains(e, t) {
    return e ? (e.children || []).some(
      (r) => String(r.id) === String(t) || this.bookmarkNodeContains(r, t)
    ) : !1;
  }
  countBookmarkLinks(e) {
    return e ? (e.children || []).reduce(
      (t, r) => t + (r.url ? 1 : this.countBookmarkLinks(r)),
      0
    ) : 0;
  }
  getChildrenOfFolder(e) {
    const t = this.bookmarkNodeById(this.importState.tree, e);
    return !t || !Array.isArray(t.children) ? [] : t.children.map((r) => ({
      id: String(r.id),
      title: r.title || r.url || "未命名",
      url: r.url,
      isFolder: !r.url,
      parentId: r.parentId
    }));
  }
  async loadBookmarks() {
    await this.ensureBookmarkData();
  }
  async ensureBookmarkData() {
    this.importState.loaded || (this.dataPromise || (this.dataPromise = (async () => {
      const e = await oe(["bookmarkRemarks"]).catch(() => ({}));
      this.importState.remarks = e?.bookmarkRemarks || {};
      let t = [];
      typeof chrome < "u" && chrome?.bookmarks?.getTree && (t = await new Promise((r) => chrome.bookmarks.getTree(r))), this.importState.tree = t?.[0] || null, this.importState.tree ? this.importState.items = this.collectBookmarks(this.importState.tree, [], []).sort(
        (r, s) => r.folder.localeCompare(s.folder, "zh") || r.title.localeCompare(s.title, "zh")
      ) : this.importState.items = [], this.importState.loaded = !0, this.worker && (this.workerReady = this.callWorker("INDEX_BOOKMARKS", { tree: t || [] }), this.workerReady.catch(() => {
      }));
    })().finally(() => {
      this.dataPromise = null;
    })), await this.dataPromise);
  }
  async reloadBookmarkTree() {
    let e = [];
    typeof chrome < "u" && chrome?.bookmarks?.getTree && (e = await new Promise((t) => chrome.bookmarks.getTree(t))), this.importState.tree = e?.[0] || null, this.importState.tree ? this.importState.items = this.collectBookmarks(this.importState.tree, [], []).sort(
      (t, r) => t.folder.localeCompare(r.folder, "zh") || t.title.localeCompare(r.title, "zh")
    ) : this.importState.items = [], this.importState.loaded = !0, this.folderMapCache = null, this.worker && (this.workerReady = this.callWorker("INDEX_BOOKMARKS", { tree: e || [] }), this.workerReady.catch(() => {
    })), this.renderBookmarkImports(), this.topBookmarkFoldersEnabled && await this.renderTopBookmarkFolderStrip(!0);
  }
  async renderTopBookmarkFolderStrip(e = this.topBookmarkFoldersEnabled) {
    this.topBookmarkFoldersEnabled = !!e, ie.setEnabled(this.topBookmarkFoldersEnabled);
    const t = document.getElementById("bookmark-folder-strip"), r = document.getElementById("bookmark-handle"), s = document.querySelector(".topbar");
    if (r && (r.hidden = this.topBookmarkFoldersEnabled), t && (t.hidden = !this.topBookmarkFoldersEnabled), s?.classList.toggle("bookmark-folders-mode", this.topBookmarkFoldersEnabled), !this.topBookmarkFoldersEnabled) {
      ie.setFolders([]);
      return;
    }
    let o = [];
    typeof chrome < "u" && chrome?.bookmarks?.getTree && (o = await new Promise((h) => chrome.bookmarks.getTree(h)));
    const n = this.bookmarkBarRoot(o?.[0] || null), c = await this.getIgnoredFolders(), a = this.getBookmarkFolderMap(), l = (n?.children || []).filter((h) => !(h.url || this.isBookmarkIgnored(h, c, a)));
    if (ie.setFolders(
      l.map((h) => ({ id: String(h.id), title: h.title || "未命名", parentId: h.parentId }))
    ), !this.topBookmarkEventsBound && typeof chrome < "u" && chrome?.bookmarks) {
      this.topBookmarkEventsBound = !0;
      const h = () => {
        this.importState.loaded = !1, this.topBookmarkFoldersEnabled && this.renderTopBookmarkFolderStrip(!0);
      };
      chrome.bookmarks.onCreated?.addListener(h), chrome.bookmarks.onRemoved?.addListener(h), chrome.bookmarks.onMoved?.addListener(h), chrome.bookmarks.onChildrenReordered?.addListener(h);
    }
  }
  toggleFolderExpand(e) {
    const t = String(e || "");
    this.importState.expandedFolders.has(t) ? this.importState.expandedFolders.delete(t) : this.importState.expandedFolders.add(t), this.renderBookmarkImports();
  }
  async renderBookmarkImports(e = "") {
    const t = e.trim().toLowerCase(), r = await this.getIgnoredFolders(), s = this.getBookmarkFolderMap(), o = this.importState.items.filter(
      (n) => !this.isBookmarkIgnored(n, r, s)
    );
    if (!o.length)
      E.setBookmarks([], "书签栏为空");
    else if (t) {
      const n = o.filter(
        (c) => `${c.title} ${c.url} ${c.folder}`.toLowerCase().includes(t)
      );
      E.setBookmarks(
        n.slice(0, 80).map((c) => ({
          id: String(c.id),
          title: c.title || c.url,
          url: c.url,
          folder: c.folder,
          isFolder: !1
        })),
        n.length ? "" : "没有匹配的书签"
      );
    } else {
      const c = (this.importState.focusFolderId ? this.bookmarkNodeById(this.importState.tree, this.importState.focusFolderId) : null)?.children || this.importState.tree?.children || [], a = (l, h = 0) => {
        const d = [];
        for (const u of l) {
          if (this.isBookmarkIgnored(u, r, s)) continue;
          const f = !u.url, S = f && this.importState.expandedFolders.has(String(u.id));
          d.push({
            id: String(u.id),
            title: u.title || u.url || "未命名",
            url: u.url,
            isFolder: f,
            level: h,
            expanded: S,
            parentId: u.parentId
          }), f && S && Array.isArray(u.children) && d.push(...a(u.children, h + 1));
        }
        return d;
      };
      E.setBookmarks(a(c));
    }
  }
  async openBookmarkFolderWindow(e) {
    await this.ensureBookmarkData();
    const t = String(e || ""), r = this.bookmarkNodeById(this.importState.tree, t);
    if (!r || r.url) {
      E.showFeedback("这个书签页不存在", !0);
      return;
    }
    if (this.importState.focusFolderId === t && E.state.open) {
      this.closeBookmarkPanel();
      return;
    }
    await this.openBookmarkPanel(t);
  }
  async openBookmarkPanel(e = "", t = null) {
    this.importState.focusFolderId = String(e || ""), this.importState.expandedFolders.clear(), this.applyBookmarkPanelPosition(this.importState.focusFolderId, t);
    const r = document.getElementById("bookmark-handle");
    r?.setAttribute("aria-expanded", "true"), r && (r.title = "收起浏览器书签");
    const s = document.getElementById("bookmark-handle-icon");
    s && (s.textContent = "📂"), await this.ensureBookmarkData();
    const o = this.importState.focusFolderId ? this.bookmarkNodeById(this.importState.tree, this.importState.focusFolderId) : null;
    this.importState.focusFolderId && !o && (this.importState.focusFolderId = "");
    const n = o ? `书签 · ${o.title || "文件夹"}` : "浏览器书签";
    E.open(n), E.setPinned(this.importState.panelPinned), this.renderBookmarkImports();
  }
  closeBookmarkPanel() {
    this.importState.expandedFolders.clear();
    const e = document.getElementById("bookmark-handle");
    e?.setAttribute("aria-expanded", "false"), e && (e.title = "展开浏览器书签");
    const t = document.getElementById("bookmark-handle-icon");
    t && (t.textContent = "📁"), E.close();
  }
  toggleBookmarkPanel() {
    E.state.open ? this.closeBookmarkPanel() : this.openBookmarkPanel();
  }
  setBookmarkPanelPinned(e, t = !0) {
    this.importState.panelPinned = !!e, t && Ce({ [dt]: this.importState.panelPinned }), E.setPinned(this.importState.panelPinned);
  }
  applyBookmarkPanelPosition(e = null, t = null) {
    const r = String(e ?? this.importState.focusFolderId ?? ""), s = t || (r ? document.querySelector(`.bookmark-folder-chip[data-bookmark-folder-id="${r}"]`) : null) || document.getElementById("bookmark-handle");
    if (s && s.offsetParent !== null) {
      const o = s.getBoundingClientRect(), c = Math.max(8, Math.min(window.innerWidth - 310 - 8, Math.round(o.left)));
      E.setPosition(c);
    } else
      E.setPosition(null);
  }
  openBookmarkNoteMenu(e, t, r) {
    if (!e) return;
    const s = e.isFolder === !0 || !e.url;
    this.editingItem = { ...e, isFolder: s }, F.setMode("actions");
    const o = _.getPageNames().map((l) => ({
      id: l,
      name: _.getPageLabel(l)
    })), n = s ? `${this.countBookmarkLinks(this.bookmarkNodeById(this.importState.tree, e.id))} 个书签 · 浏览器文件夹` : W(e.url), c = s ? "" : ft(e.url), a = s ? "" : this.importState.remarks?.[e.url] || "";
    F.openMenu(e, t, r, {
      hostOrCount: n,
      iconUrl: c,
      note: a,
      launcherGroups: o.map((l) => l.name)
    });
  }
  async saveBookmarkRename(e) {
    const t = this.editingItem;
    if (!t) return;
    const r = (e ?? "").trim();
    if (!r) {
      F.setStatus("名称不能为空");
      return;
    }
    if (r === (t.title || "").trim()) {
      F.closeMenu();
      return;
    }
    try {
      await this.bookmarkApiUpdate(t.id, { title: r }), F.closeMenu(), await this.reloadBookmarkTree(), E.showFeedback(`已将${t.isFolder ? "文件夹" : "书签"}重命名为「${r}」`);
    } catch (s) {
      F.setStatus(s.message || `重命名${t.isFolder ? "文件夹" : "书签"}失败`);
    }
  }
  async saveBookmarkNote(e) {
    const t = this.editingItem;
    if (!t || !t.url) return;
    const r = String(e ?? "").trim();
    r ? this.importState.remarks[t.url] = r : delete this.importState.remarks[t.url], await Ce({ bookmarkRemarks: this.importState.remarks }), F.closeMenu(), this.renderBookmarkImports();
  }
  async deleteBookmarkFromContextMenu() {
    const e = this.editingItem;
    if (e)
      try {
        await this.bookmarkApiRemove(e.id, e.isFolder), !e.isFolder && e.url && (delete this.importState.remarks[e.url], await Ce({ bookmarkRemarks: this.importState.remarks })), F.closeMenu(), await this.reloadBookmarkTree(), E.showFeedback(`已删除${e.isFolder ? "文件夹" : "书签"}「${e.title || W(e.url)}」`);
      } catch (t) {
        F.setStatus(t.message || `删除${e.isFolder ? "文件夹" : "书签"}失败`);
      }
  }
  async saveBookmarkToLauncher(e) {
    const t = this.editingItem;
    if (!t || !t.url) return;
    const r = e || "常用网站";
    try {
      await _.ready;
      const s = new URL(_.normalizeUrl(t.url));
      if (s.protocol !== "http:" && s.protocol !== "https:") throw new Error("仅支持 HTTP/HTTPS 网站");
      await _.addLink({ title: t.title, url: s.href, group: "常用网站", page: r }), F.closeMenu(), E.showFeedback(`已将「${t.title || t.url}」添加到常用网站`);
    } catch (s) {
      E.showFeedback(s.message || "添加到常用网站失败", !0);
    }
  }
  bookmarkApiMove(e, t) {
    return new Promise((r, s) => {
      if (typeof chrome > "u" || !chrome.bookmarks?.move)
        return r(null);
      chrome.bookmarks.move(String(e), t, (o) => {
        const n = chrome.runtime.lastError;
        n ? s(new Error(n.message)) : r(o);
      });
    });
  }
  bookmarkApiCreate(e) {
    return new Promise((t, r) => {
      if (typeof chrome > "u" || !chrome.bookmarks?.create)
        return t(null);
      chrome.bookmarks.create(e, (s) => {
        const o = chrome.runtime.lastError;
        o ? r(new Error(o.message)) : t(s);
      });
    });
  }
  bookmarkApiUpdate(e, t) {
    return new Promise((r, s) => {
      if (typeof chrome > "u" || !chrome.bookmarks?.update)
        return r(null);
      chrome.bookmarks.update(String(e), t, (o) => {
        const n = chrome.runtime.lastError;
        n ? s(new Error(n.message)) : r(o);
      });
    });
  }
  bookmarkApiRemove(e, t = !1) {
    return new Promise((r, s) => {
      if (typeof chrome > "u" || !chrome.bookmarks?.remove)
        return r();
      chrome.bookmarks[t ? "removeTree" : "remove"](String(e), () => {
        const o = chrome.runtime.lastError;
        o ? s(new Error(o.message)) : r();
      });
    });
  }
  compactBookmarkRemark(e, t) {
    e = String(e || "").replace(/\s+/g, " ").trim();
    const r = t.title || W(t.url), s = W(t.url), o = [], n = e.match(/^Title:\s*(.+)$/im);
    n && o.push(n[1]);
    const c = e.match(/(?:Description|摘要|简介)[:：]\s*(.{8,120})/i);
    c && o.push(c[1]);
    const a = e.split(/[。.!?\n]/).map((h) => h.trim()).filter((h) => h.length >= 8 && h.length <= 120);
    o.push(...a.slice(0, 4));
    let l = o.find((h) => !/cookie|privacy|登录|验证码|javascript|enable/i.test(h)) || `${r}：${s}`;
    return l = l.replace(/^Title:\s*/i, "").replace(/\s+/g, " ").trim(), !l.includes("：") && !l.includes(":") && (l = `${r}：${l}`), l.length > 42 ? l.slice(0, 41) + "…" : l;
  }
  async callAiForBookmarkRemark(e, t) {
    const r = e.title || W(e.url), s = String(t || "").replace(/\s+/g, " ").slice(0, 1e3), o = ["http://127.0.0.1:11434/v1/chat/completions"], n = `请为书签【${r}】（网址: ${e.url}，网页内容摘要: ${s || "无"}）写一句简明扼要的中文备注。
要求：仅用一句话概括其核心用途与特色，严格控制在 25 字以内，不要任何多余废话或引号，直接输出一句话备注。`;
    for (const c of o)
      try {
        const a = await qe(c, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            model: "deepseek-chat",
            messages: [{ role: "user", content: n }],
            temperature: 0.3,
            max_tokens: 60
          })
        }, 3500);
        if (a.ok) {
          const h = (await a.json()).choices?.[0]?.message?.content?.trim();
          if (h && h.length >= 2 && h.length <= 45)
            return h.replace(/^["'“”‘’]|["'“”‘’]$/g, "").trim();
        }
      } catch {
      }
    return this.compactBookmarkRemark(t, e);
  }
  async analyzeBookmarkRemark(e) {
    const t = `https://r.jina.ai/${e.url}`;
    try {
      const r = await qe(t, { headers: { Accept: "text/plain" } }, 15e3), s = r.ok ? await r.text() : "";
      return await this.callAiForBookmarkRemark(e, s.slice(0, 2500));
    } catch {
      return await this.callAiForBookmarkRemark(e, "");
    }
  }
  wireListeners() {
    ie.onAction((e, t) => {
      e === "open-folder" && t?.id ? this.openBookmarkFolderWindow(t.id) : e === "context-menu" && t?.folder && this.openBookmarkNoteMenu(
        {
          id: t.folder.id,
          parentId: t.folder.parentId,
          title: t.folder.title || "未命名",
          isFolder: !0
        },
        t.clientX,
        t.clientY
      );
    }), E.onAction((e, t) => {
      e === "toggle-pin" ? this.setBookmarkPanelPinned(t) : e === "close" ? this.closeBookmarkPanel() : e === "open-bookmark" && t ? t.isFolder ? this.toggleFolderExpand(t.id) : t.url && (typeof chrome < "u" && chrome.tabs?.create ? chrome.tabs.create({ url: t.url, active: !0 }) : window.open(t.url, "_blank")) : e === "context-menu" && t?.item && this.openBookmarkNoteMenu(t.item, t.clientX, t.clientY);
    }), F.onAction(async (e, t) => {
      if (e === "open-bookmark") {
        const r = t || this.editingItem;
        if (!r) return;
        r.isFolder ? this.openBookmarkPanel(r.id) : r.url && (typeof chrome < "u" && chrome.tabs?.create ? chrome.tabs.create({ url: r.url, active: !0 }) : window.open(r.url, "_blank")), F.closeMenu();
      } else e === "save-launcher" ? await this.saveBookmarkToLauncher(t?.group) : e === "save-rename" ? await this.saveBookmarkRename(t?.newTitle) : e === "save-note" ? await this.saveBookmarkNote(t?.note) : e === "delete-bookmark" && await this.deleteBookmarkFromContextMenu();
    });
  }
}
const X = new gt(), le = [
  {
    id: "music",
    title: "音乐与歌词",
    icon: "🎵",
    desc: "聚合网易云、塞壬唱片与B站电台的播放控制及同步歌词流",
    builtIn: !0
  }
];
function Le(i) {
  if (!i || typeof i.title != "string" || !i.title.trim()) throw new Error("请填写面标题");
  if (!["memo", "countdown", "link"].includes(i.customType)) throw new Error("类型仅支持 memo、countdown、link");
  const e = i.customData || {}, t = {};
  if (i.customType === "memo") {
    if (typeof e.text != "string" || !e.text.trim()) throw new Error("请填写文本");
    t.text = e.text.slice(0, 500);
  } else if (i.customType === "countdown") {
    if (typeof e.targetDate != "string" || !/^\d{4}-\d{2}-\d{2}$/.test(e.targetDate) || !Number.isFinite(Date.parse(e.targetDate))) throw new Error("日期格式须为 YYYY-MM-DD");
    t.targetDate = e.targetDate;
  } else {
    const r = new URL(e.url);
    if (!["https:", "http:"].includes(r.protocol) || r.username || r.password) throw new Error("仅支持无账号密码的 HTTP(S) 链接");
    t.url = r.href;
  }
  return { title: i.title.trim().slice(0, 60), icon: typeof i.icon == "string" ? i.icon.slice(0, 16) : "◇", desc: typeof i.desc == "string" ? i.desc.slice(0, 200) : "", customType: i.customType, customData: t };
}
const Ve = "logicweaver_cube_active_face_ids", Ke = "logicweaver_cube_custom_faces";
function mt() {
  try {
    const i = localStorage.getItem(Ke);
    if (i) {
      const e = JSON.parse(i);
      if (Array.isArray(e)) {
        const t = /* @__PURE__ */ new Set();
        return e.flatMap((r) => {
          try {
            if (!r || typeof r.id != "string" || r.builtIn || ["music", "traffic", "timer", "github", "schedule"].includes(r.id) || t.has(r.id)) return [];
            const s = { ...Le(r), id: r.id, builtIn: !1 };
            return t.add(r.id), [s];
          } catch {
            return [];
          }
        });
      }
    }
  } catch {
  }
  return [];
}
function pt(i) {
  try {
    const e = localStorage.getItem(Ve);
    if (e) {
      const t = JSON.parse(e);
      if (Array.isArray(t)) {
        const r = t.filter((s) => typeof s == "string" && i.includes(s));
        if (r.length || t.length === 0) return Array.from(new Set(r));
      }
    }
  } catch {
  }
  return le.map((e) => e.id);
}
function wt(i, e) {
  try {
    localStorage.setItem(Ve, JSON.stringify(i)), localStorage.setItem(Ke, JSON.stringify(e));
  } catch {
    throw new Error("立方体配置保存失败；本页已变化，刷新后可能恢复，请检查浏览器存储空间。");
  }
}
const kt = mt(), Je = [...le, ...kt], bt = pt(Je.map((i) => i.id)), k = ee({
  registeredFaces: Je,
  activeFaceIds: bt,
  isConfigDialogOpen: !1
}), O = {
  get state() {
    return We(k);
  },
  /** 当前所有启用的面列表（按用户配置的旋转顺序排列） */
  getActiveFaces() {
    const i = /* @__PURE__ */ new Map();
    for (const t of k.registeredFaces)
      i.set(t.id, t);
    const e = [];
    for (const t of k.activeFaceIds) {
      const r = i.get(t);
      r && e.push(r);
    }
    return e;
  },
  /** 判断某个面当前是否处于启用轮播状态 */
  isActive(i) {
    return k.activeFaceIds.includes(i);
  },
  /** 动态注册一个新面（供模块、插件或自定义脚本注册） */
  registerFace(i, e = !0) {
    if (!i.id || ["music", "traffic", "timer", "github", "schedule"].includes(i.id)) throw new Error("此面 ID 为系统保留");
    i = { ...Le(i), id: i.id, builtIn: !1 };
    const t = k.registeredFaces.findIndex((s) => s.id === i.id);
    t >= 0 ? k.registeredFaces[t] = i : k.registeredFaces.push(i), e && !k.activeFaceIds.includes(i.id) && k.activeFaceIds.push(i.id), this.save();
    const r = i;
    return () => {
      const s = k.registeredFaces.find((o) => o.id === r.id);
      s && Ye(s) === r && O.unregisterFace(r.id);
    };
  },
  /** 注销一个非内置面 */
  unregisterFace(i) {
    k.registeredFaces = k.registeredFaces.filter((e) => e.id !== i || e.builtIn), k.activeFaceIds = k.activeFaceIds.filter((e) => e !== i), this.save();
  },
  /** 开启或关闭某个面的轮播显示 */
  toggleActive(i, e) {
    if (e !== void 0 ? e : !k.activeFaceIds.includes(i)) {
      if (!k.registeredFaces.some((r) => r.id === i)) return;
      k.activeFaceIds.includes(i) || k.activeFaceIds.push(i);
    } else
      k.activeFaceIds = k.activeFaceIds.filter((r) => r !== i);
    this.save();
  },
  /** 向上移动某个面的轮播次序 */
  moveUp(i) {
    const e = k.activeFaceIds.indexOf(i);
    if (e <= 0) return;
    const t = k.activeFaceIds[e - 1];
    k.activeFaceIds[e - 1] = i, k.activeFaceIds[e] = t, this.save();
  },
  /** 向下移动某个面的轮播次序 */
  moveDown(i) {
    const e = k.activeFaceIds.indexOf(i);
    if (e < 0 || e >= k.activeFaceIds.length - 1) return;
    const t = k.activeFaceIds[e + 1];
    k.activeFaceIds[e + 1] = i, k.activeFaceIds[e] = t, this.save();
  },
  /** 添加用户自定义面 */
  addCustomFace(i) {
    i = Le(i);
    const e = `custom-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`, t = {
      id: e,
      title: i.title.trim() || "未命名自定义面",
      icon: i.icon?.trim() || (i.customType === "memo" ? "📝" : i.customType === "countdown" ? "⏳" : "🔗"),
      desc: i.desc?.trim() || "用户自定义立方体面",
      builtIn: !1,
      customType: i.customType,
      customData: i.customData
    };
    return k.registeredFaces.push(t), k.activeFaceIds.push(e), this.save(), e;
  },
  /** 删除面；音乐只移出轮播，可再次添加或恢复默认。 */
  removeCustomFace(i) {
    k.registeredFaces.find((t) => t.id === i) && this.unregisterFace(i);
  },
  /** 恢复仅音乐；保留自定义定义但移出轮播。 */
  resetDefaults() {
    k.registeredFaces = [...le, ...k.registeredFaces.filter((i) => !i.builtIn)], k.activeFaceIds = le.map((i) => i.id), this.save();
  },
  openConfigDialog() {
    k.isConfigDialogOpen = !0;
  },
  closeConfigDialog() {
    k.isConfigDialogOpen = !1;
  },
  save() {
    const i = k.registeredFaces.filter((e) => !e.builtIn);
    wt(k.activeFaceIds, i);
  }
};
typeof window < "u" && (window.LogicWeaverCube = {
  registerFace: (i, e = !0) => O.registerFace(i, e),
  unregisterFace: (i) => O.unregisterFace(i),
  openConfig: () => O.openConfigDialog(),
  getActiveFaces: () => O.getActiveFaces()
});
const L = {
  searchProviders: Te(/* @__PURE__ */ new Map()),
  menuProviders: Te(/* @__PURE__ */ new Map())
};
function yt(i, e, t) {
  return new Promise((r) => {
    const s = new AbortController();
    let o = !1, n;
    const c = (l = []) => {
      o || (o = !0, clearTimeout(n), t?.removeEventListener("abort", a), r(l), s.abort());
    }, a = () => c();
    if (t?.aborted) {
      c();
      return;
    }
    t?.addEventListener("abort", a, { once: !0 }), n = setTimeout(a, 1500), Promise.resolve().then(() => o ? [] : i.provideSuggestions(e, s.signal)).then((l) => {
      if (o) return;
      const h = [];
      for (const d of Array.isArray(l) ? l.slice(0, 10) : [])
        if (!(!d || typeof d.title != "string" || typeof d.url != "string"))
          try {
            const u = new URL(d.url);
            if (!["http:", "https:"].includes(u.protocol) || u.username || u.password) continue;
            h.push({
              id: JSON.stringify(["plugin", i.id, h.length]),
              title: d.title.slice(0, 200),
              url: u.href,
              meta: typeof d.meta == "string" ? d.meta.slice(0, 300) : i.name,
              badge: { text: i.name }
            });
          } catch {
          }
      c(h);
    }).catch(() => c());
  });
}
const St = {
  // --- A. 搜索挂载槽 (Search Slot) ---
  registerSearchProvider(i) {
    if (!i.id.trim() || typeof i.provideSuggestions != "function") throw new Error("搜索提供者 ID 和函数不能为空");
    const e = { ...i };
    return L.searchProviders.set(i.id, e), () => {
      L.searchProviders.get(i.id) === e && L.searchProviders.delete(i.id);
    };
  },
  unregisterSearchProvider(i) {
    L.searchProviders.delete(i);
  },
  /** 聚合调用所有插件注册的搜索建议提供者 */
  async querySearchProviders(i, e) {
    const t = i.trim();
    if (!t) return [];
    const r = [...L.searchProviders.values()].sort((o, n) => (o.priority ?? 100) - (n.priority ?? 100)), s = await Promise.all(r.map(
      (o) => yt(o, t, e)
    ));
    return e?.aborted ? [] : s.flatMap(
      (o, n) => L.searchProviders.get(r[n].id) === r[n] ? o : []
    ).slice(0, 40);
  },
  // --- B. 右键菜单挂载槽 (Context Menu Slot) ---
  registerMenuProvider(i) {
    if (!i.id.trim()) throw new Error("菜单提供者 ID 不能为空");
    const e = /* @__PURE__ */ new Set();
    for (const r of i.actions) {
      if (!r.id.trim() || e.has(r.id) || typeof r.execute != "function") throw new Error("菜单动作 ID 不能为空或重复，且须提供执行函数");
      e.add(r.id);
    }
    const t = { ...i, actions: i.actions.map((r) => ({ ...r })) };
    return L.menuProviders.set(i.id, t), () => {
      L.menuProviders.get(i.id) === t && L.menuProviders.delete(i.id);
    };
  },
  unregisterMenuProvider(i) {
    L.menuProviders.delete(i);
  },
  /** 获取适用于指定目标的插件右键菜单动作 */
  getMenuActionsForTarget(i) {
    const e = [];
    for (const t of L.menuProviders.values())
      for (const r of t.actions) {
        const s = r.targetKind || "all";
        if (s === "all" || s === i.kind) {
          const o = () => L.menuProviders.get(t.id) === t;
          e.push({
            ...r,
            id: JSON.stringify([t.id, r.id]),
            disabled: (n) => {
              if (!o()) return !0;
              try {
                return !!r.disabled?.({ ...n, source: i.source });
              } catch {
                return !0;
              }
            },
            execute: (n) => {
              const c = { ...n, source: i.source };
              if (!(!o() || r.disabled?.(c)))
                return r.execute(c);
            }
          });
        }
      }
    return e;
  },
  // --- C. 顶栏信息立方体挂载槽 (Cube Face Slot) ---
  registerCubeFace(i, e = !0) {
    return O.registerFace(i, e);
  },
  unregisterCubeFace(i) {
    O.unregisterFace(i);
  }
};
function ae(i) {
  try {
    const e = new URL(i.trim());
    return !["http:", "https:", "ftp:", "file:", "chrome:", "edge:", "about:"].includes(e.protocol) || e.username || e.password ? "" : e.href;
  } catch {
    return "";
  }
}
function vt(i, e, t) {
  const r = et(i, e, t);
  if (typeof r == "number" && r > 0) return r;
  const s = (u) => u.normalize("NFKC").toLowerCase().trim(), o = s(i), n = s(e), c = s(t);
  if (!o) return 0;
  const a = n === o ? 100 : n.startsWith(o) ? 85 : n.includes(o) ? 70 : 0;
  let l = "";
  try {
    l = new URL(t).hostname.replace(/^www\./, "").toLowerCase();
  } catch {
  }
  const h = l === o ? 95 : l.startsWith(o) ? 80 : c.includes(o) ? 60 : 0;
  if (a || h) return Math.max(a, h);
  const d = o.split(/\s+/).filter(Boolean);
  return d.length > 1 && d.every((u) => n.includes(u)) ? 55 : d.length > 1 && d.every((u) => (n + " " + c).includes(u)) ? 45 : 0;
}
function It(i, e, t = 40) {
  const r = /* @__PURE__ */ new Map();
  for (const s of e) {
    const { item: o } = s, n = o.url ? ae(o.url) : s.source === "plugin" ? "plugin:" + o.id : "";
    if (!n) continue;
    const c = vt(i, o.title || "", o.url || "") || (s.fuzzyMatch ? 15 : 0);
    if (!c) continue;
    const a = r.get(n);
    a ? (a.sources.add(s.source), a.visitedAt = Math.max(a.visitedAt, s.visitedAt || 0), a.score = Math.max(a.score, c), a.candidate.source === "history" && s.source !== "history" && (a.candidate = s), s.item.launcherLinkId && !a.candidate.item.launcherLinkId && (a.candidate.item.launcherLinkId = s.item.launcherLinkId), s.item.bookmarkId && !a.candidate.item.bookmarkId && (a.candidate.item.bookmarkId = s.item.bookmarkId)) : r.set(n, { candidate: s, score: c, visitedAt: s.visitedAt || 0, sources: /* @__PURE__ */ new Set([s.source]), order: r.size });
  }
  return [...r.values()].sort((s, o) => o.score - s.score || o.visitedAt - s.visitedAt || s.order - o.order).slice(0, t).map(({ candidate: s, sources: o }) => {
    const n = [o.has("launcher") ? "常用网站" : "", o.has("bookmark") ? "书签" : "", o.has("history") ? "历史" : ""].filter(Boolean);
    return {
      ...s.item,
      badge: n.length ? { ...s.item.badge, text: n.join(" · ") } : s.item.badge,
      sources: Array.from(o),
      launcherLinkId: s.item.launcherLinkId,
      bookmarkId: s.item.bookmarkId
    };
  });
}
function $t(i) {
  const e = Math.max(0, Math.floor(i || 0)), t = Math.floor(e / 60), r = e % 60;
  return `${t}:${String(r).padStart(2, "0")}`;
}
function Ee(i) {
  const e = Number(i || 0);
  return !Number.isFinite(e) || e <= 0 ? "0" : e >= 1e8 ? `${(e / 1e8).toFixed(1).replace(/\.0$/, "")}亿` : e >= 1e4 ? `${(e / 1e4).toFixed(1).replace(/\.0$/, "")}万` : String(e);
}
function _t(i) {
  const e = Math.max(0, Math.floor(i || 0)), t = Math.floor(e / 60), r = e % 60, s = (o) => String(o).padStart(2, "0");
  if (t >= 60) {
    const o = Math.floor(t / 60), n = t % 60;
    return `${s(o)}:${s(n)}:${s(r)}`;
  }
  return `${s(t)}:${s(r)}`;
}
function Ot(i) {
  if (!i) return 0;
  const e = String(i).split(":").map(Number);
  return e.length === 2 ? (e[0] || 0) * 60 + (e[1] || 0) : e.length === 3 ? (e[0] || 0) * 3600 + (e[1] || 0) * 60 + (e[2] || 0) : Number(i) || 0;
}
function qt(i) {
  const e = String(i || "").split(/\r?\r\n/).map((o) => o.replace(/\s+/g, " ").trim()).filter(Boolean), t = e.filter((o, n) => n === 0 || o !== e[n - 1]).map((o) => /[。！？!?；;：:，,、…”’）》】）]$/.test(o) ? o : /^(为什么|为何|怎么|如何|什么|是否|谁|哪[个里])/.test(o) || /(吗|么|呢|为何|为什么|怎么|如何|多少|什么|哪[个里]|是否)$/.test(o) ? `${o}？` : `${o}。`), r = [];
  let s = "";
  return t.forEach((o) => {
    s += o, s.length >= 450 && (r.push(s), s = "");
  }), s && r.push(s), r;
}
const xe = ee({
  bilibili: null,
  github: null,
  netease: null
});
let Ct = 0;
function Et(i, e) {
  const t = e.trim();
  t && (xe[i] = { id: ++Ct, keyword: t });
}
function Dt(i) {
  const e = xe[i];
  return xe[i] = null, e;
}
const Qe = "tab-project:quick-workspace-search", Be = "tab-project:quick-workspace-search:v1";
function Re(i) {
  if (!i || !["bilibili", "github", "netease"].includes(i.target) || typeof i.keyword != "string") return null;
  const e = i.keyword.trim();
  if (!e || e.length > 1024) return null;
  const t = { target: i.target, keyword: e };
  return i.target === "github" && ["exact", "fuzzy", "topic", "smart"].includes(i.githubRule) && (t.githubRule = i.githubRule), t;
}
function De() {
  return typeof location < "u" && location.pathname.endsWith("/newtab-search.html");
}
async function At(i) {
  const e = Re(i);
  if (!e) throw new Error("搜索内容无效或过长。");
  const t = chrome.runtime.getURL("newtab.html");
  let r = [];
  try {
    r = await chrome.tabs.query({});
  } catch {
  }
  const s = r.filter((o) => Number.isInteger(o.id) && typeof o.url == "string" && o.url.split(/[?#]/, 1)[0] === t).sort((o, n) => (n.lastAccessed || 0) - (o.lastAccessed || 0));
  for (const o of s) {
    const n = Date.now() + 1500;
    let c;
    try {
      c = await Promise.race([
        chrome.runtime.sendMessage({ type: Qe, targetTabId: o.id, expires: n, request: e }),
        new Promise((a) => setTimeout(() => a(null), 1500))
      ]);
    } catch {
    }
    if (c?.ok === !0) {
      try {
        o.windowId != null && await chrome.windows.update(o.windowId, { focused: !0 }), await chrome.tabs.update(o.id, { active: !0 });
      } catch {
        throw new Error("搜索已发送到主标签页，但未能切换过去；请手动打开主标签页查看。");
      }
      return;
    }
  }
  try {
    sessionStorage.setItem(Be, JSON.stringify({ request: e, expires: Date.now() + 6e4 }));
  } catch {
    throw new Error("无法保存搜索请求，请先打开主标签页重试。");
  }
  location.assign(t);
}
function zt(i) {
  let e = !0;
  const t = (r, s, o) => {
    if (r?.type !== Qe || s?.id !== chrome.runtime.id || typeof s?.url != "string" || s.url.split(/[?#]/, 1)[0] !== chrome.runtime.getURL("newtab-search.html")) return;
    const n = Re(r.request);
    if (!(!n || !Number.isInteger(r.targetTabId) || typeof r.expires != "number" || r.expires <= Date.now() || r.expires > Date.now() + 5e3))
      return chrome.tabs.getCurrent().then((c) => {
        !e || c?.id !== r.targetTabId || Date.now() >= r.expires || (i(n), o({ ok: !0 }));
      }).catch(() => {
      }), !0;
  };
  chrome.runtime.onMessage.addListener(t);
  try {
    const r = sessionStorage.getItem(Be);
    if (r) {
      sessionStorage.removeItem(Be);
      const s = JSON.parse(r), o = Re(s?.request);
      o && typeof s.expires == "number" && s.expires > Date.now() && s.expires <= Date.now() + 6e4 && i(o);
    }
  } catch {
  }
  return () => {
    e = !1, chrome.runtime.onMessage.removeListener(t);
  };
}
const Pt = [
  {
    name: "YouTube",
    placeholder: "搜索 YouTube 精彩视频与博主…",
    iconType: "text",
    iconValue: "🎬",
    themeColor: "#f43f5e",
    searchUrl: "https://www.youtube.com/results?search_query={query}"
  },
  {
    name: "小红书",
    placeholder: "在小红书搜索生活笔记、经验与灵感…",
    iconType: "text",
    iconValue: "📕",
    themeColor: "#ff2442",
    searchUrl: "https://www.xiaohongshu.com/search_result?keyword={query}"
  },
  {
    name: "知乎",
    placeholder: "在知乎搜索精彩问答与深度讨论…",
    iconType: "text",
    iconValue: "💡",
    themeColor: "#0084ff",
    searchUrl: "https://www.zhihu.com/search?q={query}"
  },
  {
    name: "Google 学术",
    placeholder: "检索学术论文、期刊文献与引用…",
    iconType: "text",
    iconValue: "🎓",
    themeColor: "#4285f4",
    searchUrl: "https://scholar.google.com/scholar?q={query}"
  },
  {
    name: "DeepSeek 对话",
    placeholder: "输入 Prompt，直达 DeepSeek 开启智能对话…",
    iconType: "text",
    iconValue: "🤖",
    themeColor: "#0066ff",
    searchUrl: "https://chat.deepseek.com/?q={query}"
  },
  {
    name: "淘宝",
    placeholder: "在淘宝搜索心仪好物与好价…",
    iconType: "text",
    iconValue: "🛍️",
    themeColor: "#ff5000",
    searchUrl: "https://s.taobao.com/search?q={query}"
  }
], B = [
  {
    id: "web",
    name: "网页综合",
    placeholder: "搜索，或输入网址直接打开",
    iconType: "text",
    iconValue: "⌕",
    themeColor: "#38bdf8",
    searchUrl: "https://www.bing.com/search?q={query}",
    enabled: !0,
    isBuiltin: !0
  },
  {
    id: "bilibili",
    name: "哔哩哔哩",
    placeholder: "搜索 B站 视频、UP主、番剧…（回车在 B站 打开）",
    iconType: "svg",
    iconValue: "assets/bilibili.svg",
    themeColor: "#fb7299",
    searchUrl: "https://search.bilibili.com/all?keyword={query}",
    enabled: !0,
    isBuiltin: !0
  },
  {
    id: "github",
    name: "GitHub",
    placeholder: "精准搜索 GitHub 仓库…",
    iconType: "svg",
    iconValue: "assets/nav-github.svg",
    themeColor: "#a855f7",
    searchUrl: "https://github.com/search?q={query}",
    enabled: !0,
    isBuiltin: !0
  },
  {
    id: "netease",
    name: "网易云音乐",
    placeholder: "搜索网易云音乐歌曲、歌手…（回车在插件内搜索）",
    iconType: "svg",
    iconValue: "assets/netease.svg",
    themeColor: "#ef4444",
    searchUrl: "https://music.163.com/#/search/m/?s={query}",
    enabled: !0,
    isBuiltin: !0
  },
  {
    id: "qcc",
    name: "企查查",
    placeholder: "搜索企业、法定代表人、统一信用代码…（回车企查查直达）",
    iconType: "text",
    iconValue: "🏢",
    themeColor: "#0284c7",
    searchUrl: "https://www.qcc.com/web/search?key={query}",
    enabled: !0,
    isBuiltin: !0
  }
], q = "tab_project_search_slots", A = Xe(Tt());
function Tt() {
  if (typeof localStorage > "u")
    return JSON.parse(JSON.stringify(B));
  try {
    const i = localStorage.getItem(q);
    if (i) {
      const e = JSON.parse(i);
      if (Array.isArray(e) && e.length > 0) {
        const t = e.map((r) => {
          const s = B.find((o) => o.id === r.id);
          return s ? {
            ...s,
            ...r,
            isBuiltin: !0
          } : {
            ...r,
            isBuiltin: !1
          };
        });
        if (!t.some((r) => r.enabled))
          for (const r of t)
            r.isBuiltin && (r.enabled = !0);
        return t.some((r) => r.id === "netease") || t.push({ ...B.find((r) => r.id === "netease") }), t.length ? t : JSON.parse(JSON.stringify(B));
      }
    }
  } catch (i) {
    console.warn("[SearchSlots] Failed to parse stored slots:", i);
  }
  return JSON.parse(JSON.stringify(B));
}
typeof chrome < "u" && chrome.storage?.local && chrome.storage.local.get([q], (i) => {
  if (i?.[q] && Array.isArray(i[q])) {
    const e = i[q];
    if (e.length > 0) {
      const t = e.map((r) => {
        const s = B.find((o) => o.id === r.id);
        return s ? {
          ...s,
          ...r,
          isBuiltin: !0
        } : {
          ...r,
          isBuiltin: !1
        };
      });
      if (!t.some((r) => r.enabled))
        for (const r of t)
          r.isBuiltin && (r.enabled = !0);
      t.some((r) => r.id === "netease") || t.push({ ...B.find((r) => r.id === "netease") }), A.value = t.length ? t : JSON.parse(JSON.stringify(B));
    }
  }
});
const Me = Ze(() => {
  const i = A.value.filter((e) => e.enabled);
  return i.length > 0 ? i : B.slice(0, 1);
});
function te() {
  const i = JSON.parse(JSON.stringify(A.value)), e = JSON.stringify(i);
  try {
    typeof localStorage < "u" && localStorage.setItem(q, e);
  } catch {
  }
  if (typeof chrome < "u" && chrome.storage?.local)
    try {
      chrome.storage.local.set({ [q]: i });
    } catch {
    }
  typeof window < "u" && window.dispatchEvent(new CustomEvent("tab-project:search-slots-updated", {
    detail: i
  }));
}
function Ft(i) {
  const e = `custom_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`, t = {
    ...i,
    id: e,
    enabled: !0,
    isBuiltin: !1
  };
  return A.value.push(t), te(), t;
}
function Lt(i) {
  const e = A.value.findIndex((t) => t.id === i);
  e !== -1 && (A.value[e].isBuiltin ? A.value[e].enabled = !1 : A.value.splice(e, 1), te());
}
function xt(i, e) {
  const t = A.value.findIndex((o) => o.id === i);
  if (t === -1) return;
  const r = e === "up" ? t - 1 : t + 1;
  if (r < 0 || r >= A.value.length) return;
  const [s] = A.value.splice(t, 1);
  A.value.splice(r, 0, s), te();
}
function Bt() {
  A.value = JSON.parse(JSON.stringify(B)), te();
}
function ce(i, e) {
  if (i.id === "web")
    return Ue().buildUrl(e);
  const t = i.searchUrl || "https://www.bing.com/search?q={query}", r = encodeURIComponent(e.trim());
  return t.includes("{query}") ? t.replace(/\{query\}/g, r) : t.includes("%s") ? t.replace(/%s/g, r) : `${t}${t.includes("?") ? "&" : "?"}q=${r}`;
}
const Rt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  DEFAULT_BUILTIN_SLOTS: B,
  SEARCH_SLOT_TEMPLATES: Pt,
  addSearchSlot: Ft,
  buildSlotSearchUrl: ce,
  deleteSearchSlot: Lt,
  enabledSearchSlots: Me,
  moveSearchSlot: xt,
  persistSlots: te,
  resetSearchSlotsToDefault: Bt,
  searchSlots: A
}, Symbol.toStringTag, { value: "Module" })), ze = "logicweaverLauncherSearchMode", He = ["web", "bilibili", "github", "netease", "qcc"], Ge = [
  {
    id: "slash_bm",
    title: "/bm [关键词]",
    meta: "限定范围：仅在浏览器书签中快速查找",
    type: "slash-command",
    rawCommand: "/bm ",
    badge: { className: "badge-bookmark", text: "书签限定", icon: "🔖" }
  },
  {
    id: "slash_sites",
    title: "/sites [关键词]",
    meta: "限定范围：仅在首页常用网站与分类中快速查找",
    type: "slash-command",
    rawCommand: "/sites ",
    badge: { className: "badge-launcher", text: "常用网站", icon: "⭐" }
  }
], Ae = {
  bing: {
    id: "bing",
    name: "Bing 必应",
    shortName: "Bing",
    badgeClass: "badge-bing",
    buildUrl: (i) => `https://www.bing.com/search?q=${encodeURIComponent(i)}`
  },
  google: {
    id: "google",
    name: "Google 谷歌",
    shortName: "Google",
    badgeClass: "badge-google",
    buildUrl: (i) => `https://www.google.com/search?q=${encodeURIComponent(i)}`
  },
  baidu: {
    id: "baidu",
    name: "Baidu 百度",
    shortName: "百度",
    badgeClass: "badge-baidu",
    buildUrl: (i) => `https://www.baidu.com/s?wd=${encodeURIComponent(i)}`
  },
  duckduckgo: {
    id: "duckduckgo",
    name: "DuckDuckGo",
    shortName: "DDG",
    badgeClass: "badge-ddg",
    buildUrl: (i) => `https://duckduckgo.com/?q=${encodeURIComponent(i)}`
  }
};
function Ue() {
  try {
    const i = (typeof localStorage < "u" ? localStorage.getItem("searchEngine") : null) || "bing";
    if (i && Ae[i]) return Ae[i];
  } catch {
  }
  return Ae.bing;
}
typeof window < "u" && window.addEventListener("logicweaver:search-engine-updated", (i) => {
  if (i?.detail && typeof localStorage < "u")
    try {
      localStorage.setItem("searchEngine", i.detail);
    } catch {
    }
});
const Pe = "logicweaver_search_click_history";
class K {
  constructor() {
    this.currentMode = "web", this.suggestionEpoch = 0, this.suggestTimer = 0, this.abortController = null, this.biliRecCache = [], this.clickHistory = [], this.initHistory(), this.initMode(), this.bindController();
  }
  get webScope() {
    const e = g.query.trim();
    return /^\/bm[\s:]/i.test(e) ? "bookmarks" : /^\/sites[\s:]/i.test(e) ? "launcher" : "all";
  }
  static getInstance() {
    return K.instance || (K.instance = new K()), K.instance;
  }
  isSearchQueryUrl(e, t) {
    if (!e) return !1;
    try {
      const r = new URL(e), s = r.hostname.toLowerCase(), o = r.pathname.toLowerCase();
      if (s.includes("qcc.com") && o.includes("/search") || s.includes("bing.com") && o.includes("/search") || s.includes("google.com") && o.includes("/search") || s.includes("baidu.com") && (o.includes("/s") || o.includes("/search")) || s.includes("tianyancha.com") && o.includes("/search") || s.includes("aiqicha.baidu.com") && o.includes("/s"))
        return !0;
    } catch {
    }
    return !!(t && (/^在\s*(企查查|天眼查|爱企查|Bing|百度|Google)\s*搜索/i.test(t) || /^Bing\s*搜索/i.test(t)));
  }
  initHistory() {
    if (typeof localStorage < "u")
      try {
        const e = localStorage.getItem(Pe);
        if (e) {
          const t = JSON.parse(e);
          Array.isArray(t) && (this.clickHistory = t.filter((r) => r && typeof r.url == "string" && typeof r.title == "string" && ae(r.url) && Number.isFinite(r.visitedAt) && !this.isSearchQueryUrl(r.url, r.title)).sort((r, s) => s.visitedAt - r.visitedAt).slice(0, 30), this.clickHistory.length !== t.length && localStorage.setItem(Pe, JSON.stringify(this.clickHistory)));
        }
      } catch {
      }
  }
  recordSearchClick(e) {
    if (!e.url || !ae(e.url)) return;
    const t = e.url.trim();
    if (this.isSearchQueryUrl(t, e.title))
      return;
    this.clickHistory = this.clickHistory.filter((o) => o.url !== t);
    let r = "web";
    const s = e.badge?.text || "";
    if (s.includes("常用网站") ? r = "launcher" : s.includes("书签") ? r = "bookmark" : s.includes("提炼") && (r = "history"), this.clickHistory.unshift({
      url: t,
      title: e.title || t,
      iconSrc: e.iconSrc,
      sourceType: r,
      visitedAt: Date.now()
    }), this.clickHistory.length > 30 && (this.clickHistory = this.clickHistory.slice(0, 30)), typeof localStorage < "u")
      try {
        localStorage.setItem(Pe, JSON.stringify(this.clickHistory));
      } catch {
      }
  }
  initMode() {
    if (typeof localStorage < "u") {
      const e = localStorage.getItem(ze);
      e && He.includes(e) && (this.currentMode = e);
    }
    p.setMode(this.currentMode);
  }
  bindController() {
    p.setCycleModeAction(() => this.cycleMode()), p.setQueryAction((e) => this.scheduleSuggestions(e)), p.setClearAction(() => this.clearSuggestions()), p.setSubmitAction((e) => this.submit(e)), p.setFocusAction(() => this.handleFocus()), p.setSuggestionClickAction((e) => this.handleSuggestionClick(e));
  }
  getMode() {
    return this.currentMode;
  }
  setMode(e) {
    !A.value.find((r) => r.id === e && r.enabled) && !He.includes(e) && (e = Me.value[0]?.id || "web"), this.currentMode = e, typeof localStorage < "u" && localStorage.setItem(ze, e), p.setMode(e), g.query.trim() ? this.scheduleSuggestions(g.query) : this.clearSuggestions();
  }
  cycleMode() {
    const e = Me.value;
    if (!e || e.length === 0) return;
    const t = e.findIndex((s) => s.id === this.currentMode), r = e[(t + 1) % e.length] || e[0];
    this.setMode(r.id);
  }
  scheduleSuggestions(e) {
    clearTimeout(this.suggestTimer), this.abortController?.abort(), ++this.suggestionEpoch;
    const t = e.trim();
    if (!t) {
      this.clearSuggestions(), this.currentMode === "web" && this.loadWebRecentRecommendations();
      return;
    }
    p.setSuggestions([]), this.suggestTimer = window.setTimeout(() => {
      this.fetchSuggestions(t);
    }, 180);
  }
  handleFocus() {
    if (g.query.trim()) {
      this.currentMode === "web" && this.scheduleSuggestions(g.query);
      return;
    }
    g.query.trim() || (this.currentMode === "web" ? this.loadWebRecentRecommendations(!0) : this.currentMode === "bilibili" ? this.loadBilibiliRecommendations(!0) : this.currentMode === "github" ? this.loadGithubRecentRecommendations(!0) : this.currentMode === "netease" ? this.loadNeteaseRecentRecommendations(!0) : this.currentMode === "qcc" && this.loadQccRecommendations(!0));
  }
  clearSuggestions() {
    clearTimeout(this.suggestTimer), ++this.suggestionEpoch, this.abortController?.abort(), p.setSuggestions([]);
  }
  async loadWebRecentRecommendations(e = !1) {
    if (this.currentMode !== "web" || g.query.trim()) return;
    this.initHistory();
    const t = /* @__PURE__ */ new Set(), r = this.clickHistory.flatMap((s) => {
      const o = ae(s.url);
      return !o || t.has(o) ? [] : (t.add(o), [{
        id: `hist_${encodeURIComponent(o)}`,
        title: s.title,
        meta: s.url,
        url: s.url,
        iconSrc: typeof s.iconSrc == "string" ? s.iconSrc : void 0,
        badge: {
          className: s.sourceType === "bookmark" ? "badge-bookmark" : s.sourceType === "launcher" ? "badge-launcher" : "badge-bing",
          text: s.sourceType === "bookmark" ? "历史书签" : s.sourceType === "launcher" ? "历史网站" : "历史访问",
          icon: "🕒"
        }
      }]);
    }).slice(0, 10);
    p.setSuggestions(r);
  }
  async loadNeteaseRecentRecommendations(e = !1) {
    const t = this.suggestionEpoch;
    let r = Fe.getRecentSongs();
    if (!r.length)
      try {
        r = await Fe.fetchAccountRecentSongs(10);
      } catch {
      }
    if (t !== this.suggestionEpoch || this.currentMode !== "netease" || g.query.trim()) return;
    if (!r.length) {
      this.clearSuggestions();
      return;
    }
    const s = r.slice(0, 10).map((o) => {
      const n = (o.artists || o.ar || []).map((c) => c.name).join(" / ") || "网易云音乐";
      return {
        id: `recent_${o.id}`,
        title: o.name,
        meta: n,
        iconSrc: o.al?.picUrl || o.album?.picUrl || "assets/netease.svg",
        url: `https://music.163.com/#/song?id=${o.id}`,
        type: "netease-play",
        rawSong: o,
        badge: { className: "badge-netease", text: "最近听过", icon: "🎵" }
      };
    });
    t === this.suggestionEpoch && !g.query.trim() && this.currentMode === "netease" && (p.setSuggestions(s), p.setSuggestionsVisible(!0));
  }
  async fetchSuggestions(e) {
    clearTimeout(this.suggestTimer), ++this.suggestionEpoch, this.abortController?.abort(), this.abortController = new AbortController();
    const t = this.abortController.signal;
    try {
      const r = e.trim();
      if (r.startsWith("/") && !r.includes(" ")) {
        const s = r.toLowerCase(), o = Ge.filter((n) => n.rawCommand?.toLowerCase().startsWith(s) || n.title.toLowerCase().startsWith(s));
        p.setSuggestions(o.length > 0 ? o : Ge), p.setSuggestionsVisible(!0);
        return;
      }
      if (r.startsWith("/bm ") || r.startsWith("/bm:")) {
        const s = r.replace(/^\/bm[\s:]*/i, "");
        await this.fetchWebSuggestions(s, t, "bookmarks");
      } else if (r.startsWith("/sites ") || r.startsWith("/sites:")) {
        const s = r.replace(/^\/sites[\s:]*/i, "");
        await this.fetchWebSuggestions(s, t, "launcher");
      } else this.currentMode === "bilibili" ? await this.fetchBilibiliSuggestions(e, t) : this.currentMode === "github" ? await this.fetchGithubSuggestions(e, t) : this.currentMode === "netease" ? await this.fetchNeteaseSuggestions(e, t) : this.currentMode === "qcc" ? await this.fetchQccSuggestions(e) : this.currentMode === "web" ? await this.fetchWebSuggestions(e, t) : await this.fetchCustomSlotSuggestions(e, t);
    } catch (r) {
      r.name !== "AbortError" && console.warn("[SearchService] Fetch suggestions error:", r);
    }
  }
  async fetchBilibiliSuggestions(e, t) {
    const r = `https://api.bilibili.com/x/web-interface/search/type?search_type=video&keyword=${encodeURIComponent(e)}&page=1&page_size=10`, o = await (await fetch(r, { signal: t })).json();
    if (t.aborted) return;
    const c = (Array.isArray(o?.data?.result) ? o.data.result : []).slice(0, 8).map((a) => {
      const l = a.bvid || (a.param && String(a.param).startsWith("BV") ? a.param : ""), h = (a.title || "").replace(/<[^>]+>/g, ""), d = String(a.pic || "").replace(/^http:/, "https:"), u = d.startsWith("//") ? `https:${d}` : d;
      return {
        id: l,
        title: h,
        meta: `${a.author || ""} · ${a.play ? a.play + "播放" : ""}`,
        iconSrc: u,
        url: `https://www.bilibili.com/video/${l}`,
        badge: { className: "badge-bilibili", text: "B站", icon: "📺" }
      };
    });
    c.unshift({
      id: `search-${e}`,
      title: `在 B站 搜索 “${e}”`,
      meta: "按 Enter 或点击在插件内搜索视频",
      iconSrc: "assets/bilibili.svg",
      type: "bilibili-search-trigger",
      rawQuery: e
    }), p.setSuggestions(c);
  }
  async loadBilibiliRecommendations(e = !1) {
    const t = this.suggestionEpoch;
    if (this.biliRecCache.length) {
      t === this.suggestionEpoch && !g.query.trim() && this.currentMode === "bilibili" && (p.setSuggestions(this.biliRecCache), p.setSuggestionsVisible(!0));
      return;
    }
    try {
      const s = await (await fetch("https://api.bilibili.com/x/web-interface/index/top/rcmd?fresh_type=3&feed_version=V8&fresh_idx_1h=1&fetch_row=1&fresh_idx=1&brush=1")).json();
      if (s?.code === 0 && Array.isArray(s?.data?.item)) {
        const o = s.data.item.slice(0, 6).map((n) => {
          const c = n.bvid || "", a = String(n.pic || "").replace(/^http:/, "https:"), l = a.startsWith("//") ? `https:${a}` : a, h = n.owner?.name || "";
          return {
            id: c,
            title: n.title || "",
            meta: `${h} · 推荐视频`,
            iconSrc: l,
            url: `https://www.bilibili.com/video/${c}`,
            badge: { className: "badge-bilibili", text: "B站", icon: "📺" }
          };
        });
        this.biliRecCache = o, t === this.suggestionEpoch && !g.query.trim() && this.currentMode === "bilibili" && (p.setSuggestions(o), p.setSuggestionsVisible(!0));
      }
    } catch {
    }
  }
  async getLocalGithubRepos() {
    if (J.repos.length > 0) return J.repos;
    if (typeof chrome < "u" && chrome.storage?.local)
      try {
        const t = (await chrome.storage.local.get(["ghStarredCache"]))?.ghStarredCache;
        if (t?.pages && typeof t.pages == "object") {
          const r = [];
          return Object.values(t.pages).forEach((s) => {
            Array.isArray(s) && r.push(...s);
          }), r;
        }
      } catch {
      }
    return [];
  }
  async loadGithubRecentRecommendations(e = !1) {
    const t = this.suggestionEpoch, r = await this.getLocalGithubRepos();
    if (t !== this.suggestionEpoch || this.currentMode !== "github" || g.query.trim()) return;
    if (!r.length) {
      this.clearSuggestions();
      return;
    }
    const s = r.slice(0, 8).map((o) => ({
      id: `gh-rec-${o.id || o.name}`,
      title: o.full_name || o.name,
      meta: `${o.description || "已星标仓库"} · ⭐ ${Ee(o.stargazers_count || 0)}${o.language ? " · " + o.language : ""}`,
      iconSrc: o.owner?.avatar_url || "assets/nav-github.svg",
      url: o.html_url || `https://github.com/${o.full_name || o.name}`,
      badge: { className: "badge-github", text: "星标项目", icon: "★" }
    }));
    p.setSuggestions(s), p.setSuggestionsVisible(!0);
  }
  async fetchGithubSuggestions(e, t) {
    const r = await this.getLocalGithubRepos();
    if (t.aborted) return;
    const s = e.trim().toLowerCase(), n = r.filter((u) => (u.name || u.full_name || "").toLowerCase().includes(s) || (u.description || "").toLowerCase().includes(s)).slice(0, 6).map((u) => ({
      id: String(u.id || u.name),
      title: u.full_name || u.name,
      meta: `${u.description || "已星标仓库"} · ⭐ ${Ee(u.stargazers_count || 0)}`,
      iconSrc: u.owner?.avatar_url || "assets/nav-github.svg",
      url: u.html_url || `https://github.com/${u.full_name || u.name}`,
      badge: { className: "badge-github", text: "已星标", icon: "★" }
    })), c = J.searchRule || "exact", a = { exact: "精确", fuzzy: "模糊", topic: "标签", smart: "智能" }, l = { exact: "🎯", fuzzy: "🌊", topic: "🏷️", smart: "✨" }, h = a[c] || "精确", d = l[c] || "🎯";
    n.unshift({
      id: `gh-search-${e}`,
      title: `在 GitHub 搜索 “${e}”`,
      meta: "按 Enter 或点击在插件内搜索仓库",
      iconSrc: "assets/nav-github.svg",
      type: "github-search-trigger",
      rawQuery: e,
      badge: { className: "badge-github", text: h, icon: d }
    }), t.aborted || p.setSuggestions(n);
  }
  async searchGithubOnline(e) {
    const t = e.trim();
    if (!t) return;
    this.abortController?.abort();
    const r = new AbortController();
    this.abortController = r;
    const s = ++this.suggestionEpoch, o = this.currentMode, n = () => !r.signal.aborted && this.abortController === r && s === this.suggestionEpoch && o === this.currentMode && g.query.trim() === t, c = J.searchRule || "exact", a = { exact: "精确", fuzzy: "模糊", topic: "标签", smart: "智能" }, l = { exact: "🎯", fuzzy: "🌊", topic: "🏷️", smart: "✨" }, h = a[c] || "精确", d = l[c] || "🎯";
    p.setSuggestions([
      {
        id: "gh-search-loading",
        title: `正在以「${h}」模式搜索 GitHub 仓库…`,
        meta: `关键词：“${t}”，请稍候…`,
        iconSrc: "assets/nav-github.svg",
        badge: { className: "badge-github", text: "搜索中", icon: "⏳" }
      }
    ]), p.setSuggestionsVisible(!0);
    let u = t;
    if (c === "exact")
      u = `"${t}" in:name,description`;
    else if (c === "topic")
      u = `topic:${t.replace(/\s+/g, "-")}`;
    else if (c === "smart") {
      const f = tt[t.toLowerCase()] || [];
      f.length > 0 && (u = `${t} ${f.slice(0, 3).join(" OR ")}`);
    }
    try {
      const f = await rt(r.signal);
      if (!n()) return;
      const { data: S } = await st(`/search/repositories?q=${encodeURIComponent(u)}&sort=stars&order=desc&per_page=10`, { headers: f, signal: r.signal, maxBytes: 1024 * 1024 });
      if (!n()) return;
      if (!Array.isArray(S?.items)) throw new Ne("format", "GitHub 搜索响应格式异常，没有当作空结果。");
      const m = S.items;
      if (!m.length) {
        p.setSuggestions([
          {
            id: `gh-empty-${t}`,
            title: `未找到与 “${t}” 相关的 GitHub 仓库`,
            meta: "可点击切换右侧规则（精确/模糊/标签/智能）或按 Enter 网页直达",
            iconSrc: "assets/nav-github.svg",
            url: `https://github.com/search?q=${encodeURIComponent(t)}`,
            badge: { className: "badge-github", text: "无结果", icon: "∅" }
          }
        ]);
        return;
      }
      const y = m.map((P) => ({
        id: `gh-online-${P.id}`,
        title: P.full_name || P.name,
        meta: `${P.description || "暂无描述"} · ⭐ ${Ee(P.stargazers_count || 0)}${P.language ? " · " + P.language : ""}`,
        iconSrc: P.owner?.avatar_url || "assets/nav-github.svg",
        url: P.html_url || `https://github.com/${P.full_name || P.name}`,
        badge: { className: "badge-github", text: h, icon: d }
      }));
      y.unshift({
        id: `gh-header-${t}`,
        title: `GitHub「${h}」搜索结果 (${m.length} 个)`,
        meta: "点击仓库条目直接访问 · 回车可在 GitHub 网页完整查看",
        iconSrc: "assets/nav-github.svg",
        url: `https://github.com/search?q=${encodeURIComponent(t)}`,
        badge: { className: "badge-github", text: "回车直达", icon: "↵" }
      }), p.setSuggestions(y), p.setSuggestionsVisible(!0);
    } catch (f) {
      if (!n()) return;
      p.setSuggestions([
        {
          id: `gh-error-${t}`,
          title: `GitHub 检索失败：${f instanceof Ne ? f.message : "响应处理异常"}`,
          meta: "请按具体错误检查账号、权限或网络；按 Enter 可直接跳转网页版搜索",
          iconSrc: "assets/nav-github.svg",
          url: `https://github.com/search?q=${encodeURIComponent(t)}`,
          badge: { className: "badge-github", text: "网页重试", icon: "⚠" }
        }
      ]), p.setSuggestionsVisible(!0);
    }
  }
  async fetchNeteaseSuggestions(e, t) {
    try {
      const r = `https://music.163.com/api/search/get/web?csrf_token=&hlpretag=&hlposttag=&s=${encodeURIComponent(e)}&type=1&offset=0&total=true&limit=8`, o = await (await fetch(r, { signal: t })).json();
      if (t.aborted) return;
      const c = (o.result?.songs || []).map((a) => ({
        id: `ne_${a.id}`,
        title: a.name,
        meta: (a.artists || []).map((l) => l.name).join(" / ") || "网易云音乐",
        iconSrc: "assets/netease.svg",
        type: "netease-search-trigger",
        rawQuery: a.name,
        badge: { className: "badge-netease", text: "网易云", icon: "🎵" }
      }));
      c.unshift({
        id: `ne-search-${e}`,
        title: `在 网易云音乐 搜索 “${e}”`,
        meta: "按 Enter 或点击在网易云插件内搜索",
        iconSrc: "assets/netease.svg",
        type: "netease-search-trigger",
        rawQuery: e
      }), p.setSuggestions(c);
    } catch {
    }
  }
  async fetchWebSuggestions(e, t, r = "all") {
    if (!e.trim() || t.aborted) return;
    const s = [], o = (a) => {
      try {
        return chrome.runtime.getURL(`_favicon/?pageUrl=${encodeURIComponent(a)}&size=32`);
      } catch {
        return;
      }
    }, n = () => {
      if (t.aborted) return;
      const a = It(e, s);
      if (r === "all") {
        const l = Ue();
        a.push({
          id: `${l.id}-${e}`,
          title: `${l.shortName} 搜索 “${e}”`,
          meta: `按 Enter 默认使用 ${l.name} 检索`,
          url: l.buildUrl(e),
          badge: { className: l.badgeClass, text: l.shortName, icon: "⌕" }
        });
      }
      p.setSuggestions(a);
    };
    if (r === "all") {
      this.initHistory();
      for (const a of this.clickHistory) s.push({
        source: "history",
        visitedAt: a.visitedAt,
        item: {
          id: `hist_${encodeURIComponent(a.url)}`,
          title: a.title,
          meta: a.url,
          url: a.url,
          iconSrc: typeof a.iconSrc == "string" ? a.iconSrc : o(a.url),
          badge: { className: "badge-bing", text: "历史", icon: "🕒" }
        }
      });
    }
    if (r === "all" || r === "launcher")
      for (const a of _.getState().links || [])
        a.url && s.push({ source: "launcher", item: {
          id: `launcher_${a.id}`,
          title: a.title || a.url,
          meta: a.url,
          url: a.url,
          launcherLinkId: String(a.id),
          iconSrc: _.getCachedIcon(a.url) || a.customIcon || a.icon || o(a.url),
          badge: { className: "badge-launcher", text: "常用网站", icon: "⭐" }
        } });
    if (n(), (r === "all" || r === "bookmarks") && typeof chrome < "u" && chrome.bookmarks?.search)
      try {
        let a = await X.searchBookmarksViaWorker(e, 100, t);
        if (t.aborted || (a === null && (a = await chrome.bookmarks.search(e)), t.aborted)) return;
        const l = await X.getIgnoredFolders();
        if (await X.ensureBookmarkData(), t.aborted) return;
        const h = X.getBookmarkFolderMap();
        for (const d of a || [])
          !d.url || X.isBookmarkIgnored(d, l, h) || s.push({ source: "bookmark", fuzzyMatch: !0, item: {
            id: `bm_${d.id}`,
            title: d.title || d.url,
            meta: d.url,
            url: d.url,
            bookmarkId: String(d.id),
            iconSrc: o(d.url),
            badge: { className: "badge-bookmark", text: "书签", icon: "🔖" }
          } });
      } catch {
      }
    if (t.aborted || (n(), r !== "all")) return;
    const c = await St.querySearchProviders(e, t);
    if (!t.aborted) {
      for (const a of c) s.push({ item: a, source: "plugin", fuzzyMatch: !0 });
      c.length && n();
    }
  }
  async loadQccRecommendations(e = !1) {
    const t = [
      {
        id: "qcc-hot-1",
        title: "查知名科技企业（腾讯、阿里、字节…）",
        meta: "输入企业名称按回车直接进入企查查",
        iconSrc: "",
        url: "https://www.qcc.com/",
        badge: { className: "badge-qcc", text: "企查查", icon: "🏢" }
      },
      {
        id: "qcc-hot-2",
        title: "查法定代表人 / 股东高管",
        meta: "直接输入人名 + 公司名组合查询",
        iconSrc: "",
        url: "https://www.qcc.com/",
        badge: { className: "badge-qcc", text: "查老板", icon: "👤" }
      },
      {
        id: "qcc-hot-3",
        title: "查企业统一社会信用代码 / 税号",
        meta: "输入 18 位信用代码精准验真",
        iconSrc: "",
        url: "https://www.qcc.com/",
        badge: { className: "badge-qcc", text: "查税号", icon: "📄" }
      }
    ];
    (e || !g.query.trim() && this.currentMode === "qcc") && (p.setSuggestions(t), p.setSuggestionsVisible(!0));
  }
  async fetchQccSuggestions(e) {
    const t = e.trim();
    if (!t) {
      p.setSuggestions([]);
      return;
    }
    const r = [
      {
        id: `qcc-${t}`,
        title: `在 企查查 搜索 “${t}”`,
        meta: "按 Enter 或点击直达企查查企业结果",
        url: `https://www.qcc.com/web/search?key=${encodeURIComponent(t)}`,
        badge: { className: "badge-qcc", text: "企查查", icon: "🏢" }
      },
      {
        id: `tyc-${t}`,
        title: `在 天眼查 搜索 “${t}”`,
        meta: "天眼查企业商业征信与工商档案",
        url: `https://www.tianyancha.com/search?key=${encodeURIComponent(t)}`,
        badge: { className: "badge-tyc", text: "天眼查", icon: "👁️" }
      },
      {
        id: `aqc-${t}`,
        title: `在 爱企查 搜索 “${t}”`,
        meta: "百度爱企查免费基础工商信息查询",
        url: `https://aiqicha.baidu.com/s?q=${encodeURIComponent(t)}`,
        badge: { className: "badge-aqc", text: "爱企查", icon: "🔍" }
      }
    ];
    p.setSuggestions(r);
  }
  async fetchCustomSlotSuggestions(e, t) {
    const r = e.trim();
    if (!r) {
      p.setSuggestions([]);
      return;
    }
    const s = A.value.find((n) => n.id === this.currentMode);
    if (!s) {
      await this.fetchWebSuggestions(e, t);
      return;
    }
    const o = [];
    if (o.push({
      id: `${s.id}-${r}`,
      title: `在 ${s.name} 搜索 “${r}”`,
      meta: "按 Enter 或点击在新标签页立即检索",
      iconSrc: s.iconType === "svg" ? s.iconValue : void 0,
      url: ce(s, r),
      badge: {
        className: "badge-custom",
        text: s.name,
        icon: s.iconType !== "svg" ? s.iconValue : "⌕"
      }
    }), s.suggestUrl)
      try {
        const n = s.suggestUrl.replace(/\{query\}/g, encodeURIComponent(r)), a = await (await fetch(n, { signal: t })).json();
        if (Array.isArray(a) && Array.isArray(a[1]))
          for (const l of a[1].slice(0, 6))
            typeof l == "string" && l.trim() && o.push({
              id: `${s.id}-sug-${l}`,
              title: l,
              meta: `${s.name} 联想词`,
              url: ce(s, l),
              badge: {
                className: "badge-custom",
                text: s.name,
                icon: "⌕"
              }
            });
      } catch {
      }
    t.aborted || p.setSuggestions(o);
  }
  submit(e) {
    const t = (e !== void 0 ? e : g.query).trim();
    if (t) {
      if (g.suggestions.length > 0 && g.suggestions[0]?.type === "slash-command") {
        this.handleSuggestionClick(g.suggestions[0]);
        return;
      }
      if (this.currentMode === "bilibili" || this.currentMode === "github" || this.currentMode === "netease")
        this.openWorkspaceSearch(this.currentMode, t);
      else if (this.currentMode === "qcc")
        this.openUrl(`https://www.qcc.com/web/search?key=${encodeURIComponent(t)}`);
      else {
        const r = A.value.find((s) => s.id === this.currentMode);
        if (r && !r.isBuiltin) {
          this.openUrl(ce(r, t));
          return;
        }
        if (this.webScope !== "all" && g.suggestions.length > 0 && g.suggestions[0]?.url) {
          this.openUrl(g.suggestions[0].url);
          return;
        }
        if (/^(https?:\/\/|[a-z0-9-]+\.[a-z]{2,})/i.test(t)) {
          const s = /^https?:\/\//i.test(t) ? t : `https://${t}`;
          this.openUrl(s);
        } else {
          const s = Ue();
          this.openUrl(s.buildUrl(t));
        }
      }
    }
  }
  handleSuggestionClick(e) {
    if (e.type === "slash-command" && e.rawCommand) {
      p.setQuery(e.rawCommand), p.focus(), this.fetchSuggestions(e.rawCommand);
      return;
    }
    if (e.type === "open-settings") {
      import("./window-manager.store-DE8sG7Nf.js").then((t) => t.n).then(({ windowManagerController: t }) => {
        t.open("settings");
      });
      return;
    }
    if ((e.type === "github-search-trigger" || e.type === "bilibili-search-trigger") && e.rawQuery) {
      this.openWorkspaceSearch(e.type === "github-search-trigger" ? "github" : "bilibili", e.rawQuery);
      return;
    }
    if (e.type === "netease-search-trigger" && e.rawQuery) {
      this.openWorkspaceSearch("netease", e.rawQuery);
      return;
    }
    if (e.type === "netease-play" && e.rawSong) {
      if (De()) {
        this.openWorkspaceSearch("netease", e.title);
        return;
      }
      const t = typeof window < "u" ? window : null;
      if (t?.LogicWeaverHomeMusic?.playNetease) {
        t.LogicWeaverHomeMusic.playNetease(e.rawSong);
        return;
      }
    }
    e.url ? (this.recordSearchClick(e), this.openUrl(e.url)) : this.submit(e.title);
  }
  async openWorkspaceSearch(e, t) {
    if (this.abortController?.abort(), p.setSuggestionsVisible(!1), De()) {
      try {
        await At({ target: e, keyword: t, githubRule: e === "github" ? J.searchRule : void 0 });
      } catch (s) {
        p.setSuggestions([{ id: "workspace-search-error", title: s instanceof Error ? s.message : "打开插件搜索失败", meta: "请稍后重试", badge: { className: "badge-qcc", text: "提示", icon: "⚠" } }]);
      }
      return;
    }
    if (Et(e, t), e === "netease") {
      const { windowManagerController: s } = await import("./window-manager.store-DE8sG7Nf.js").then((o) => o.n);
      s.open("music");
      return;
    }
    const { fullscreenCardsController: r } = await import("./fullscreen-cards.store-CBVQa-Eg.js");
    r.enter(e === "github" ? "card-github" : "daily-bilibili");
  }
  openUrl(e) {
    typeof chrome < "u" && chrome.tabs?.create ? chrome.tabs.create({ url: e, active: !0 }) : window.open(e, "_blank");
  }
}
const Ht = K.getInstance();
export {
  Ee as A,
  $t as B,
  Ot as C,
  qt as D,
  _t as E,
  re as F,
  St as G,
  Pt as S,
  X as a,
  E as b,
  Ht as c,
  F as d,
  ie as e,
  ht as f,
  O as g,
  ne as h,
  zt as i,
  g as j,
  Dt as k,
  _ as l,
  v as m,
  xt as n,
  A as o,
  Lt as p,
  Ft as q,
  Et as r,
  p as s,
  te as t,
  Bt as u,
  D as v,
  xe as w,
  Nt as x,
  at as y,
  Fe as z
};
