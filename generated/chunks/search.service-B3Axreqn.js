import { c as ss, w as Wt, h as D, r as pe, l as bi, g as ns } from "./window-manager.store-D9RSYghK.js";
import { r as F, a as Kt, w as qe, x as jr, b as Ge, O as _r } from "./vendor-vue-BbmU9NUg.js";
import { s as Ct, S as os, p as as } from "./InlineEditStatus.vue_vue_type_style_index_0_scoped_c63d0c6d_lang-DwclBqWw.js";
import { t as Et, p as cs } from "./module-state-C_zTFjJe.js";
import { k as Je, n as ne, N as nt, H as Si, I as ls, J as us, s as ds, K as hs, m as Ye, E as fs, C as ms, D as gs, G as Zr } from "./github.service-DdJVB3Fj.js";
import { R as ps } from "./read-session-B_uIJVOk.js";
const it = {
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
}, vi = "web", Qe = it[vi], ys = () => ({
  mode: vi,
  query: "",
  hasQuery: !1,
  placeholder: Qe.placeholder,
  toggleTitle: Qe.title,
  toggleAriaLabel: Qe.title,
  modeIconSrc: Qe.iconSrc,
  modeIconText: Qe.iconText,
  modeColor: "#38bdf8",
  modeName: "网页",
  suggestions: [],
  isSuggestionsVisible: !1,
  updatedAt: null
}), p = F(ys());
let ur = null, dr = null, hr = null, fr = null, mr = null, gr = null;
const v = {
  get snapshot() {
    return Kt(p);
  },
  update(t) {
    Object.assign(p, t), t.query !== void 0 && (p.hasQuery = !!t.query.trim());
  },
  setMode(t) {
    Promise.resolve().then(() => yo).then(({ searchSlots: e }) => {
      const r = e.value.find((s) => s.id === t);
      if (r) {
        p.mode = r.id, p.placeholder = r.placeholder, p.toggleTitle = `当前为 ${r.name} 搜索，点击切换下一个模式`, p.toggleAriaLabel = `切换搜索模式（当前：${r.name}）`, p.modeIconSrc = r.iconType === "svg" ? r.iconValue : "", p.modeIconText = r.iconType !== "svg" ? r.iconValue : "", p.modeColor = r.themeColor || "#38bdf8", p.modeName = r.name, p.updatedAt = Date.now();
        return;
      }
      const i = it[t] || it.web;
      p.mode = t, p.placeholder = i.placeholder, p.toggleTitle = i.title, p.toggleAriaLabel = i.title, p.modeIconSrc = i.iconSrc, p.modeIconText = i.iconText, p.modeColor = "#38bdf8", p.modeName = t, p.updatedAt = Date.now();
    }).catch(() => {
      const e = it[t] || it.web;
      p.mode = t, p.placeholder = e.placeholder, p.toggleTitle = e.title, p.toggleAriaLabel = e.title, p.modeIconSrc = e.iconSrc, p.modeIconText = e.iconText, p.updatedAt = Date.now();
    });
  },
  setQuery(t) {
    p.query = t, p.hasQuery = !!t.trim(), p.updatedAt = Date.now(), gr && gr(t), typeof window < "u" && window.dispatchEvent(new CustomEvent("logicweaver:search-query", { detail: { query: t } }));
  },
  setQueryAction(t) {
    gr = t;
  },
  setSuggestions(t) {
    p.suggestions = Array.isArray(t) ? [...t] : [], p.isSuggestionsVisible = p.suggestions.length > 0, p.updatedAt = Date.now();
  },
  setSuggestionsVisible(t) {
    p.isSuggestionsVisible = !!t, p.updatedAt = Date.now();
  },
  onSuggestionClick(t) {
    p.isSuggestionsVisible = !1, mr ? mr(t) : t.url ? window.open(t.url, "_blank") : v.submit(t.title);
  },
  setSuggestionClickAction(t) {
    mr = t;
  },
  clear() {
    p.query = "", p.hasQuery = !1, p.suggestions = [], p.isSuggestionsVisible = !1, p.updatedAt = Date.now(), dr ? dr() : window.dispatchEvent(new CustomEvent("logicweaver:search-clear"));
  },
  submit(t) {
    const e = t !== void 0 ? t : p.query;
    p.isSuggestionsVisible = !1, hr ? hr(e) : window.dispatchEvent(new CustomEvent("logicweaver:search-submit", { detail: { query: e } }));
  },
  cycleMode() {
    ur ? ur() : window.dispatchEvent(new CustomEvent("logicweaver:search-cycle-mode"));
  },
  focus() {
    fr ? fr() : window.dispatchEvent(new CustomEvent("logicweaver:search-focus"));
  },
  setCycleModeAction(t) {
    ur = t;
  },
  setClearAction(t) {
    dr = t;
  },
  setSubmitAction(t) {
    hr = t;
  },
  setFocusAction(t) {
    fr = t;
  }
}, ws = "https://music.163.com";
async function ei(t, e = {}, r) {
  r?.throwIfAborted();
  let i, s;
  switch (t) {
    case "/login/status":
    case "/user/account":
      i = "/api/nuser/account/get", s = {};
      break;
    case "/user/detail":
      i = `/api/v1/user/detail/${encodeURIComponent(String(e.uid))}`, s = {};
      break;
    case "/user/playlist":
      i = "/api/user/playlist", s = { uid: e.uid, limit: e.limit ?? 100, offset: 0 };
      break;
    case "/playlist/detail":
    case "/playlist/track/all":
      i = "/api/playlist/detail", s = { id: e.id, n: 1e3, s: 0 };
      break;
    case "/likelist":
      i = "/api/song/like/get", s = { uid: e.uid };
      break;
    case "/cloudsearch":
    case "/search":
      i = "/api/search/get/web", s = { s: e.keywords, type: 1, limit: e.limit ?? 60, offset: 0 };
      break;
    case "/lyric":
      i = "/api/song/lyric", s = { id: e.id, lv: -1, kv: -1, tv: -1 };
      break;
    case "/song/url":
    case "/song/url/v1":
      i = "/api/song/enhance/player/url", s = { ids: JSON.stringify([e.id]), br: 32e4 };
      break;
    default:
      throw new Error("此功能暂未接入官网会话，不会回退到第三方音乐节点。");
  }
  const n = new URLSearchParams();
  for (const [c, l] of Object.entries(s))
    l != null && n.set(c, String(l));
  let o;
  try {
    const c = new URL(ws + i);
    c.search = n.toString(), o = await fetch(c, {
      method: "GET",
      credentials: "include",
      redirect: "error",
      cache: "no-store",
      headers: { Accept: "application/json" },
      signal: r ? AbortSignal.any([r, AbortSignal.timeout(15e3)]) : AbortSignal.timeout(15e3)
    });
  } catch {
    throw r?.throwIfAborted(), new Error("网易云官网请求失败或超时，请确认官网可以访问，并检查扩展的网站访问权限。");
  }
  if (!o.ok) throw new Error(`网易云官网返回 HTTP ${o.status}，请稍后重试。`);
  let a;
  try {
    a = await o.json();
  } catch {
    throw new Error("网易云官网未返回有效数据，请在官网确认登录状态。");
  }
  if (r?.throwIfAborted(), !a || typeof a != "object") throw new Error("网易云官网响应格式无效。");
  if (Number(a.code) === 301 || Number(a.code) === 401)
    throw new Error("官网会话未登录或已失效，请先在同一浏览器的网易云官网登录。");
  if (a.code !== void 0 && Number(a.code) !== 200)
    throw new Error(`网易云官网未接受请求（状态 ${Number(a.code) || "未知"}），可能需要重新登录或遇到接口限制。`);
  if ((t === "/playlist/detail" || t === "/playlist/track/all") && !a.playlist && a.result && (a.playlist = a.result), t === "/playlist/track/all") {
    const c = a.playlist?.tracks || [], l = Number(e.offset) || 0;
    return { ...a, songs: c.slice(l, l + (Number(e.limit) || 500)) };
  }
  return a;
}
const bs = "neteaseCookie", Pe = "neteaseUserInfo", _e = "neteaseLikedSongIds", ee = "neteaseRecentPlayedSongs";
class Oe {
  constructor() {
    this.user = null, this.likedSongIds = /* @__PURE__ */ new Set(), this.recentSongs = [], this.playlistCache = /* @__PURE__ */ new Map(), this.pendingRequests = /* @__PURE__ */ new Map(), this.storageReady = this.initStorage();
  }
  whenReady() {
    return this.storageReady;
  }
  static getInstance() {
    return Oe.instance || (Oe.instance = new Oe()), Oe.instance;
  }
  async initStorage() {
    if (typeof chrome < "u" && chrome.storage?.local)
      try {
        const e = await chrome.storage.local.get([
          Pe,
          _e,
          ee
        ]);
        e[Pe] && (this.user = e[Pe]), Array.isArray(e[_e]) && (this.likedSongIds = new Set(e[_e])), Array.isArray(e[ee]) && (this.recentSongs = e[ee]);
      } catch (e) {
        console.warn("[NeteaseService] Init storage error:", e);
      }
    if (!this.recentSongs.length && typeof localStorage < "u")
      try {
        const e = localStorage.getItem(ee);
        if (e) {
          const r = JSON.parse(e);
          Array.isArray(r) && r.length && (this.recentSongs = r);
        }
      } catch {
      }
    typeof window < "u" && window.dispatchEvent(new CustomEvent("netease:recent-updated", { detail: this.recentSongs }));
  }
  // ==========================================================================
  // HTTP 底层通用请求封装 (带时间戳、Cookie、超时防抖)
  // ==========================================================================
  async request(e, r = {}, i) {
    return ei(e, r, i);
  }
  // ==========================================================================
  // 用户鉴权与状态
  // ==========================================================================
  getUser() {
    return this.user;
  }
  async connectWebsiteAccount() {
    await this.whenReady();
    const e = await ei("/user/account"), r = e.profile || e.data?.profile, i = r?.userId;
    if (!i || typeof r?.nickname != "string")
      throw new Error("未读到官网账户，请先在同一浏览器、同一资料的网易云官网登录，再点击连接；无痕窗口的登录不会自动共用。");
    const s = {
      uid: i,
      nickname: r.nickname,
      avatarUrl: r.avatarUrl || "",
      vipType: Number(r.vipType) || 0,
      isVip: Number(r.vipType) > 0,
      loggedIn: !0
    };
    return typeof chrome < "u" && chrome.storage?.local && await chrome.storage.local.set({ [Pe]: s }), this.user = s, this.playlistCache.clear(), this.likedSongIds.clear(), typeof localStorage < "u" && localStorage.removeItem("netease_explicit_logout"), window.dispatchEvent(new Event("netease:account-updated")), s;
  }
  async fetchUserProfile() {
    try {
      let e = null, r = "网易云用户", i = "", s = 0;
      try {
        const n = await this.request("/login/status"), o = n?.data?.profile || n?.profile, a = n?.data?.account || n?.account;
        e = o?.userId || o?.id || a?.id || a?.userId || null, r = o?.nickname || a?.userName || "网易云用户", i = o?.avatarUrl || "", s = o?.vipType || a?.vipType || 0;
      } catch (n) {
        console.warn("[NeteaseService] /login/status warning:", n);
      }
      if (!e)
        try {
          const n = await this.request("/user/account"), o = n?.profile, a = n?.account;
          e = o?.userId || o?.id || a?.id || a?.userId || null, o?.nickname && (r = o.nickname), o?.avatarUrl && (i = o.avatarUrl), (o?.vipType || a?.vipType) && (s = o?.vipType || a?.vipType || 0);
        } catch (n) {
          console.warn("[NeteaseService] /user/account warning:", n);
        }
      if (e && (!i || r === "网易云用户"))
        try {
          const n = await this.request("/user/detail", { uid: e });
          n?.profile && (r = n.profile.nickname || r, i = n.profile.avatarUrl || i, s = n.profile.vipType || s);
        } catch {
        }
      if (e)
        return this.user = {
          uid: e,
          nickname: r,
          avatarUrl: i,
          vipType: s,
          isVip: Number(s) > 0,
          loggedIn: !0
        }, typeof chrome < "u" && chrome.storage?.local && await chrome.storage.local.set({ [Pe]: this.user }), await this.fetchLikedSongs(), this.user;
    } catch (e) {
      console.warn("[NeteaseService] fetchUserProfile failed:", e);
    }
    return null;
  }
  // ==========================================================================
  // Cookie 自动嗅探与应用登录
  // ==========================================================================
  async logout() {
    this.user = null, this.playlistCache.clear(), this.pendingRequests.clear(), this.likedSongIds.clear(), typeof chrome < "u" && chrome.storage?.local && await chrome.storage.local.remove([bs, Pe, _e]), window.dispatchEvent(new Event("netease:account-updated"));
  }
  // ==========================================================================
  // 喜欢歌曲管理
  // ==========================================================================
  async fetchLikedSongs() {
    if (!this.user?.uid) return Array.from(this.likedSongIds);
    try {
      const r = (await this.request("/likelist", { uid: this.user.uid }))?.ids || [];
      return r.length && (this.likedSongIds = new Set(r.map(Number)), typeof chrome < "u" && chrome.storage?.local && await chrome.storage.local.set({ [_e]: Array.from(this.likedSongIds) })), Array.from(this.likedSongIds);
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
  async toggleLikeSong(e, r) {
    const i = Number(e);
    if (!i) return !1;
    const s = r !== void 0 ? r : !this.likedSongIds.has(i);
    try {
      return await this.request("/like", { id: i, like: s }), s ? this.likedSongIds.add(i) : this.likedSongIds.delete(i), typeof chrome < "u" && chrome.storage?.local && await chrome.storage.local.set({ [_e]: Array.from(this.likedSongIds) }), !0;
    } catch (n) {
      return console.warn("[NeteaseService] toggleLikeSong failed:", n), !1;
    }
  }
  // ==========================================================================
  // 歌单与歌曲检索
  // ==========================================================================
  async getUserPlaylists(e) {
    const r = e || this.user?.uid;
    if (!r) return [];
    try {
      return (await this.request("/user/playlist", { uid: r, limit: 100 }))?.playlist || [];
    } catch (i) {
      return console.warn("[NeteaseService] getUserPlaylists failed:", i), [];
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
      const r = await this.getUserPlaylists();
      if (r && r.length) return r;
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
  async getPlaylistTracks(e, r = 500, i = 0) {
    if (!e) return [];
    if (this.playlistCache.has(e) && r >= 500 && i === 0) {
      const o = this.playlistCache.get(e);
      if (Date.now() - o.at < 600 * 1e3 && o.songs && o.songs.length)
        return o.songs;
    }
    const s = `${e}_${r}_${i}`;
    if (this.pendingRequests.has(s))
      return await this.pendingRequests.get(s);
    const n = (async () => {
      let o = [];
      try {
        try {
          o = (await this.request("/playlist/track/all", {
            id: e,
            limit: r,
            offset: i
          }))?.songs || [];
        } catch (a) {
          console.warn("[NeteaseService] /playlist/track/all error, fallback to detail:", a);
        }
        !o.length && i === 0 && (o = (await this.request("/playlist/detail", { id: e }))?.playlist?.tracks || []), o.length && r >= 500 && i === 0 && this.playlistCache.set(e, { songs: o, at: Date.now() });
      } finally {
        this.pendingRequests.delete(s);
      }
      return o;
    })();
    return this.pendingRequests.set(s, n), await n;
  }
  async searchSongs(e, r = 60) {
    const i = e.trim();
    if (!i) return [];
    let s = [];
    try {
      s = (await this.request("/cloudsearch", { keywords: i, type: 1, limit: r }))?.result?.songs || [];
    } catch (n) {
      console.warn("[NeteaseService] /cloudsearch failed, fallback to /search:", n);
    }
    if (!s.length)
      try {
        s = (await this.request("/search", { keywords: i, limit: r }))?.result?.songs || [];
      } catch (n) {
        console.warn("[NeteaseService] /search failed:", n);
      }
    return s;
  }
  // ==========================================================================
  // 音源 URL 与 歌词获取
  // ==========================================================================
  async getSongAudioUrl(e, r = "standard") {
    let i = "";
    try {
      i = (await this.request("/song/url/v1", { id: e, level: r }))?.data?.[0]?.url || "";
    } catch {
    }
    if (!i)
      try {
        i = (await this.request("/song/url", { id: e }))?.data?.[0]?.url || "";
      } catch {
      }
    return i || (i = `https://music.163.com/song/media/outer/url?id=${e}.mp3`), i;
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
      if (this.recentSongs = this.recentSongs.filter((r) => String(r.id) !== String(e.id)), this.recentSongs.unshift(e), this.recentSongs.length > 50 && (this.recentSongs = this.recentSongs.slice(0, 50)), typeof chrome < "u" && chrome.storage?.local && chrome.storage.local.set({ [ee]: this.recentSongs }), typeof localStorage < "u")
        try {
          localStorage.setItem(ee, JSON.stringify(this.recentSongs));
        } catch {
        }
      typeof window < "u" && window.dispatchEvent(new CustomEvent("netease:recent-updated", { detail: this.recentSongs }));
    }
  }
  async clearRecentSongs() {
    if (await this.whenReady(), this.recentSongs = [], typeof chrome < "u" && chrome.storage?.local && await chrome.storage.local.remove(ee), typeof localStorage < "u")
      try {
        localStorage.removeItem(ee);
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
      let r = [];
      try {
        const i = await this.request("/record/recent/song", { limit: e });
        Array.isArray(i?.data?.list) && i.data.list.length > 0 && (r = i.data.list);
      } catch {
      }
      if (!r.length && this.user?.uid)
        try {
          const i = await this.request("/user/record", { uid: this.user.uid, type: 1 });
          Array.isArray(i?.weekData) && i.weekData.length > 0 ? r = i.weekData : Array.isArray(i?.allData) && i.allData.length > 0 && (r = i.allData);
        } catch {
        }
      if (r.length > 0) {
        const i = r.map((s) => {
          const n = s.data || s.song || s;
          return !n || !n.id ? null : {
            id: n.id,
            name: n.name || n.title || "未知曲目",
            artists: n.ar || n.artists || [],
            ar: n.ar || n.artists || [],
            album: n.al || n.album || {},
            al: n.al || n.album || {},
            dt: n.dt || n.duration || 0,
            duration: n.dt || n.duration || 0,
            picUrl: n.al?.picUrl || n.album?.picUrl || n.picUrl || "",
            coverUrl: n.al?.picUrl || n.album?.picUrl || n.picUrl || "",
            playTime: s.playTime || 0
          };
        }).filter(Boolean);
        if (i.length > 0) {
          const s = new Set(i.map((o) => String(o.id))), n = this.recentSongs.filter((o) => !s.has(String(o.id)));
          if (this.recentSongs = [...i, ...n].slice(0, 60), typeof chrome < "u" && chrome.storage?.local && await chrome.storage.local.set({ [ee]: this.recentSongs }), typeof localStorage < "u")
            try {
              localStorage.setItem(ee, JSON.stringify(this.recentSongs));
            } catch {
            }
          typeof window < "u" && window.dispatchEvent(new CustomEvent("netease:recent-updated", { detail: this.recentSongs }));
        }
      }
    } catch (r) {
      console.warn("[NeteaseService] fetchAccountRecentSongs failed:", r);
    }
    return this.recentSongs;
  }
}
const U = Oe.getInstance();
typeof window < "u" && (window.LogicWeaverNeteaseService = U);
const It = "https://monster-siren.hypergryph.com/api", At = "msFavoriteSongs";
function ki(t) {
  const e = (t.ar || t.artists || []).map((r) => typeof r == "string" ? r : r.name);
  return {
    cid: `ne_${t.id}`,
    name: t.name || "网易云音乐",
    artists: e.length ? e : ["网易云音乐"],
    coverUrl: t.al?.picUrl || t.album?.picUrl || t.picUrl || t.coverUrl || "",
    isNetease: !0,
    neteaseId: t.id,
    rawSong: t
  };
}
class xe {
  constructor() {
    this.audio = null, this.playVersion = 0, this.lyrics = [], this.state = {
      playing: !1,
      currentSong: null,
      currentTime: 0,
      duration: 0,
      mode: "shuffle",
      queue: [],
      queueIndex: -1
    }, this.listeners = [], this.favorites = {}, this.albumDetailCache = /* @__PURE__ */ new Map(), this.albumCoverMap = /* @__PURE__ */ new Map(), typeof window < "u" && typeof Audio < "u" && (this.audio = new Audio(), this.audio.crossOrigin = "anonymous", this.audio.preload = "none", this.bindAudioEvents()), this.initStorage();
  }
  setLyrics(e) {
    this.lyrics = e.split(/\r?\n/).flatMap((r) => {
      const i = [...r.matchAll(/\[(\d+):(\d+(?:\.\d+)?)\]/g)], s = r.replace(/\[[^\]]*\]/g, "").trim();
      return s ? i.map((n) => ({ time: Number(n[1]) * 60 + Number(n[2]), text: s })) : [];
    }).sort((r, i) => r.time - i.time), this.updateLyric();
  }
  updateLyric() {
    let e = "";
    for (const r of this.lyrics) {
      if (r.time > this.state.currentTime) break;
      e = r.text;
    }
    this.state.currentLyric = e;
  }
  static getInstance() {
    return xe.instance || (xe.instance = new xe()), xe.instance;
  }
  getAudioElement() {
    return this.audio;
  }
  async initStorage() {
    if (typeof chrome < "u" && chrome.storage?.local) {
      const e = await chrome.storage.local.get([At]);
      e[At] && (this.favorites = e[At]);
    }
  }
  bindAudioEvents() {
    if (!this.audio) return;
    let e = 0;
    this.audio.addEventListener("timeupdate", () => {
      if (!this.audio) return;
      const i = performance.now();
      i - e < 250 || (e = i, this.state.currentTime = this.audio.currentTime || 0, this.updateLyric(), this.audio.duration && !Number.isNaN(this.audio.duration) && (this.state.duration = this.audio.duration), this.notify());
    });
    const r = () => {
      this.audio && this.audio.duration && !Number.isNaN(this.audio.duration) && (this.state.duration = this.audio.duration, this.notify());
    };
    this.audio.addEventListener("loadedmetadata", r), this.audio.addEventListener("durationchange", r), this.audio.addEventListener("canplay", r), this.audio.addEventListener("play", () => {
      this.state.playing = !0, this.notify();
    }), this.audio.addEventListener("pause", () => {
      this.state.playing = !1, this.notify();
    }), this.audio.addEventListener("ended", () => {
      this.handleSongEnded();
    }), this.audio.addEventListener("error", (i) => {
      console.warn("[MusicService] Audio playback error:", i), this.state.playing = !1, this.notify();
    });
  }
  handleSongEnded() {
    if (this.state.mode === "one") {
      this.audio && (this.audio.currentTime = 0, this.audio.play());
      return;
    }
    this.next();
  }
  subscribe(e) {
    return this.listeners.push(e), e({ ...this.state }), () => {
      this.listeners = this.listeners.filter((r) => r !== e);
    };
  }
  notify() {
    const e = { ...this.state };
    for (const r of this.listeners)
      try {
        r(e);
      } catch (i) {
        console.error("[MusicService] Listener error:", i);
      }
  }
  getState() {
    return { ...this.state };
  }
  // ==========================================================================
  // 塞壬唱片 (Monster Siren) API
  // ==========================================================================
  async getSirenSongs() {
    if (this.albumCoverMap.size === 0)
      try {
        await this.getSirenAlbums();
      } catch {
      }
    const r = await (await fetch(`${It}/songs`, { headers: { Accept: "application/json" } })).json();
    return (r.data?.list || r.data || []).map((s) => ({
      cid: s.cid,
      name: s.name,
      artists: s.artists || [],
      albumCid: s.albumCid,
      coverUrl: s.albumCid && this.albumCoverMap.get(String(s.albumCid)) || ""
    }));
  }
  async getSirenAlbums() {
    const s = ((await (await fetch(`${It}/albums`, { headers: { Accept: "application/json" } })).json()).data || []).map((n) => ({
      cid: n.cid,
      name: n.name,
      coverUrl: n.coverUrl
    }));
    for (const n of s)
      n.cid && n.coverUrl && this.albumCoverMap.set(String(n.cid), n.coverUrl);
    return s;
  }
  async getSirenAlbumDetail(e) {
    const r = String(e);
    if (this.albumDetailCache.has(r))
      return this.albumDetailCache.get(r);
    const s = await (await fetch(`${It}/album/${e}/detail`, { headers: { Accept: "application/json" } })).json(), n = s.data?.songs || [], o = s.data?.coverUrl || "", a = n.map((c) => ({
      cid: c.cid,
      name: c.name,
      artists: c.artists || c.artistes || [],
      albumCid: e,
      coverUrl: o
    }));
    return this.albumDetailCache.set(r, a), a;
  }
  async getSirenSongUrl(e) {
    const i = await (await fetch(`${It}/song/${e}`, { headers: { Accept: "application/json" } })).json();
    return {
      sourceUrl: i.data?.sourceUrl || "",
      lyricUrl: i.data?.lyricUrl
    };
  }
  // ==========================================================================
  // 回放控制
  // ==========================================================================
  async playSong(e, r = {}) {
    if (!this.audio || r.isCurrent?.() === !1) return !1;
    const i = ++this.playVersion, s = () => i === this.playVersion && r.isCurrent?.() !== !1;
    !e.coverUrl && e.albumCid && (e.coverUrl = this.albumCoverMap.get(String(e.albumCid)) || ""), this.state.currentSong = e, this.state.currentTime = 0, this.lyrics = [], this.state.currentLyric = "", this.state.queue.some((n) => !!n.isNetease != !!e.isNetease) && (this.state.queue = []), this.state.queue.some((n) => String(n.cid) === String(e.cid)) || this.state.queue.push(e), this.state.queueIndex = this.state.queue.findIndex((n) => String(n.cid) === String(e.cid));
    try {
      let n = "";
      if (e.isNetease && e.neteaseId)
        U.getSongLyric(e.neteaseId).then((o) => {
          s() && (this.setLyrics(o), this.notify());
        }), n = await U.getSongAudioUrl(e.neteaseId);
      else {
        const o = await this.getSirenSongUrl(e.cid);
        o.lyricUrl && fetch(o.lyricUrl).then((a) => a.ok ? a.text() : "").then((a) => {
          s() && (this.setLyrics(a), this.notify());
        }).catch(() => {
        }), n = o.sourceUrl;
      }
      if (!s()) return !1;
      if (n)
        return this.audio.src = n, r.autoplay !== !1 && await this.audio.play(), s() ? (this.state.playing = !this.audio.paused, this.notify(), !0) : !1;
    } catch (n) {
      if (!s()) return !1;
      console.error("[MusicService] Play song failed:", n), this.state.playing = !1, this.notify();
    }
    return !1;
  }
  async playNeteaseSong(e, r = {}) {
    return !e || r.isCurrent?.() === !1 ? !1 : (U.addRecentSong(e), this.playSong(ki(e), r));
  }
  togglePlay() {
    this.audio && (this.state.playing ? this.audio.pause() : this.audio.src && this.audio.play());
  }
  seek(e) {
    if (!this.audio || !this.audio.duration) return;
    const r = Math.max(0, Math.min(100, e)) / 100 * this.audio.duration;
    this.audio.currentTime = r;
  }
  setPlayMode(e) {
    this.state.mode = e, this.notify();
  }
  cyclePlayMode() {
    const e = ["list", "one", "shuffle"], r = e.indexOf(this.state.mode), i = e[(r + 1) % e.length];
    return this.setPlayMode(i), i;
  }
  next() {
    if (this.state.queue.length)
      if (this.state.mode === "shuffle") {
        const e = Math.floor(Math.random() * this.state.queue.length);
        this.playSong(this.state.queue[e]);
      } else {
        const e = (this.state.queueIndex + 1) % this.state.queue.length;
        this.playSong(this.state.queue[e]);
      }
  }
  prev() {
    if (this.state.queue.length)
      if (this.state.mode === "shuffle") {
        const e = Math.floor(Math.random() * this.state.queue.length);
        this.playSong(this.state.queue[e]);
      } else {
        const e = (this.state.queueIndex - 1 + this.state.queue.length) % this.state.queue.length;
        this.playSong(this.state.queue[e]);
      }
  }
  setQueue(e, r = -1, i = !1) {
    this.state.queue = [...e], this.state.queueIndex = r, r >= 0 && e[r] && (this.state.currentSong = e[r], this.notify(), i && this.playSong(e[r]));
  }
  // ==========================================================================
  // 收藏管理
  // ==========================================================================
  isLiked(e) {
    return !!this.favorites[String(e)];
  }
  toggleLike(e) {
    const r = String(e.cid), i = !this.favorites[r];
    return i ? this.favorites[r] = e : delete this.favorites[r], this.persistFavorites(), this.notify(), i;
  }
  getFavorites() {
    return Object.values(this.favorites);
  }
  persistFavorites() {
    typeof chrome < "u" && chrome.storage?.local && chrome.storage.local.set({ [At]: this.favorites });
  }
}
const O = xe.getInstance(), ae = F({ visible: !1, pendingWrites: 0 }), Rr = /* @__PURE__ */ new Set();
function Eo(t) {
  return Rr.add(t), () => {
    Rr.delete(t);
  };
}
function Ss() {
  for (const t of Rr) t();
}
async function Io(t) {
  ae.pendingWrites++;
  try {
    return await t();
  } finally {
    ae.pendingWrites--;
  }
}
const Ci = "netease_cached_playlists", Ei = "netease_cached_favorites_songs", je = /* @__PURE__ */ new Map(), Ve = /* @__PURE__ */ new Map();
let Ft;
function ti(t) {
  const e = Ve.get(t);
  if (e) return e;
  try {
    const r = localStorage.getItem(t), i = je.get(t);
    if (i?.raw === r) return i.value;
    const s = r ? JSON.parse(r) : [], n = Array.isArray(s) ? s : [];
    return je.set(t, { raw: r, value: n }), n;
  } catch {
    return [];
  }
}
function Ii() {
  clearTimeout(Ft), Ft = void 0;
  for (const [t, e] of Ve)
    try {
      const r = JSON.stringify(e);
      localStorage.getItem(t) !== r && localStorage.setItem(t, r), je.set(t, { raw: r, value: e });
    } catch {
      je.delete(t);
    }
  Ve.clear();
}
function Ao(t, e) {
  Ve.set(t, e), Ft === void 0 && (Ft = setTimeout(Ii, 250));
}
function To(t) {
  Ve.delete(t), je.delete(t);
  try {
    localStorage.removeItem(t);
  } catch {
  }
}
typeof window < "u" && (window.addEventListener("pagehide", Ii), window.addEventListener("storage", (t) => {
  if (t.storageArea === localStorage)
    for (const e of [Ci, Ei])
      (t.key === null || t.key === e) && (je.delete(e), Ve.delete(e));
}));
class vs {
  constructor(e = null) {
    this._listeners = /* @__PURE__ */ new Set(), this._state = {
      phase: e ? "authenticated" : "unauthenticated",
      user: e,
      message: e ? "官网账户已连接" : ""
    }, typeof window < "u" && (window.__TAB_MACHINES__ = window.__TAB_MACHINES__ || {}, window.__TAB_MACHINES__.neteaseAuth = this);
  }
  get state() {
    return this._state;
  }
  get phase() {
    return this._state.phase;
  }
  get isConnecting() {
    return this._state.phase === "connecting";
  }
  get isAuthenticated() {
    return this._state.phase === "authenticated";
  }
  subscribe(e) {
    return this._listeners.add(e), () => {
      this._listeners.delete(e);
    };
  }
  _setState(e) {
    this._state = e;
    for (const r of this._listeners)
      r(e);
  }
  send(e) {
    const r = this._state;
    switch (e.type) {
      case "START_CONNECT":
        return r.phase === "connecting" ? !1 : (this._setState({
          phase: "connecting",
          user: r.user,
          message: "正在连接官网账户…"
        }), !0);
      case "CONNECT_SUCCESS":
        return this._setState({
          phase: "authenticated",
          user: e.user,
          message: "官网账户已连接"
        }), !0;
      case "CONNECT_FAILURE":
        return this._setState({
          phase: "error",
          user: null,
          message: e.message
        }), !0;
      case "LOGOUT":
        return this._setState({
          phase: "unauthenticated",
          user: null,
          message: "已断开账户"
        }), !0;
      case "SYNC_USER":
        return this._setState({
          phase: e.user ? "authenticated" : "unauthenticated",
          user: e.user,
          message: e.user ? "官网账户已连接" : ""
        }), !0;
      default:
        return !1;
    }
  }
}
const Ne = new vs();
function Be(t) {
  return (!Number.isFinite(t) || t < 0) && (t = 0), Math.floor(t / 60) + ":" + String(Math.floor(t % 60)).padStart(2, "0");
}
const Uo = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Ccircle cx='32' cy='32' r='30' fill='%231e1e24'/%3E%3Ctext x='32' y='38' fill='%23ec4141' font-size='22' text-anchor='middle'%3E%E2%99%AC%3C/text%3E%3C/svg%3E", ks = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Cdefs%3E%3CradialGradient id='msrVinyl' cx='50%25' cy='50%25' r='50%25'%3E%3Cstop offset='0%25' stop-color='%2327272a'/%3E%3Cstop offset='70%25' stop-color='%2309090b'/%3E%3Cstop offset='100%25' stop-color='%23000000'/%3E%3C/radialGradient%3E%3C/defs%3E%3Ccircle cx='32' cy='32' r='31' fill='url(%23msrVinyl)' stroke='%233f3f46' stroke-width='1.5'/%3E%3Ccircle cx='32' cy='32' r='24' fill='none' stroke='%2327272a' stroke-width='1' stroke-dasharray='3 2'/%3E%3Ccircle cx='32' cy='32' r='18' fill='none' stroke='%2318181b' stroke-width='1'/%3E%3Ccircle cx='32' cy='32' r='11' fill='%23f59e0b' opacity='0.9'/%3E%3Ccircle cx='32' cy='32' r='4' fill='%2309090b'/%3E%3Ccircle cx='32' cy='32' r='1.5' fill='%23fafafa'/%3E%3C/svg%3E", Cs = () => ({
  mounted: !1,
  playing: !1,
  title: "点击播放",
  artist: "作者",
  coverUrl: ks,
  currentTime: 0,
  duration: 0,
  formattedCurrent: "0:00",
  formattedDuration: "0:00",
  progressPercent: 0,
  liked: !1,
  mode: "shuffle",
  pickerOpen: !1,
  pickerTab: "songs",
  searchQuery: "",
  activeAlbum: null,
  songs: [],
  albums: [],
  favorites: [],
  loadingAlbums: !1,
  isNetease: !1,
  isBiliRadio: !1,
  biliRadioSeriesName: "",
  currentLyric: "",
  neteaseUser: null,
  neteasePlaylists: [],
  neteaseActivePlaylist: null,
  neteaseSongs: [],
  neteaseSearchResults: [],
  neteaseRecentSongs: U.getRecentSongs(),
  neteaseQrImg: "",
  neteaseQrStatus: "",
  neteaseLoading: !1
}), f = F(Cs());
let N = {};
const Es = {
  get authMachine() {
    return Ne;
  },
  getSnapshot() {
    return Kt(f);
  },
  update(t) {
    Object.assign(f, t);
  },
  setMounted(t) {
    f.mounted = t;
  },
  setPlaying(t) {
    f.playing = t;
  },
  setTrack(t, e, r) {
    f.title = t || "点击播放", f.artist = e || "作者", f.coverUrl = r || "";
  },
  setProgress(t, e) {
    f.currentTime = t, f.duration = e, f.formattedCurrent = Be(t), f.formattedDuration = Be(e), e > 0 ? f.progressPercent = Math.min(100, Math.max(0, t / e * 100)) : f.progressPercent = 0;
  },
  setLiked(t) {
    f.liked = t;
  },
  setMode(t) {
    f.mode = t;
  },
  togglePicker(t) {
    t !== void 0 ? ae.visible = t : ae.visible = !ae.visible;
  },
  setPickerTab(t) {
    f.pickerTab = t, f.activeAlbum = null;
  },
  setSearchQuery(t) {
    f.searchQuery = t;
  },
  setActiveAlbum(t) {
    f.activeAlbum = t;
  },
  setSongs(t) {
    f.songs = t;
  },
  setAlbums(t) {
    f.albums = t;
  },
  setFavorites(t) {
    f.favorites = t;
  },
  setActions(t) {
    N = { ...N, ...t };
  },
  playTrack(t) {
    f.isBiliRadio = !1;
    const e = window;
    if (e.LogicWeaverBiliRadioPlayer?.getState?.()?.playing && e.LogicWeaverBiliRadioPlayer.toggle(), N.playCid)
      N.playCid(t);
    else {
      const r = f.activeAlbum?._songs || [], s = [...f.songs, ...f.favorites, ...r].find((n) => String(n.cid) === String(t));
      s ? O.playSong(s) : O.playSong({ cid: t, name: "塞壬唱片", artists: ["塞壬唱片"] }), window.dispatchEvent(new CustomEvent("logicweaver:music-play-cid", { detail: { cid: t } }));
    }
  },
  togglePlay() {
    if (f.isBiliRadio) {
      const t = window;
      if (typeof t.LogicWeaverBiliRadioPlayer?.toggle == "function") {
        t.LogicWeaverBiliRadioPlayer.toggle();
        return;
      }
    }
    N.togglePlay ? N.togglePlay() : (O.togglePlay(), window.dispatchEvent(new CustomEvent("logicweaver:music-toggle-play")));
  },
  prev() {
    if (f.isBiliRadio) {
      const t = window;
      if (typeof t.LogicWeaverBiliRadioPlayer?.prev == "function") {
        t.LogicWeaverBiliRadioPlayer.prev();
        return;
      }
    }
    N.prev ? N.prev() : (O.prev(), window.dispatchEvent(new CustomEvent("logicweaver:music-prev")));
  },
  next() {
    if (f.isBiliRadio) {
      const t = window;
      if (typeof t.LogicWeaverBiliRadioPlayer?.next == "function") {
        t.LogicWeaverBiliRadioPlayer.next();
        return;
      }
    }
    N.next ? N.next() : (O.next(), window.dispatchEvent(new CustomEvent("logicweaver:music-next")));
  },
  toggleLike() {
    if (N.toggleLike)
      N.toggleLike();
    else {
      const t = O.getState().currentSong;
      t && (f.liked = O.toggleLike(t), f.favorites = O.getFavorites()), window.dispatchEvent(new CustomEvent("logicweaver:music-toggle-like"));
    }
  },
  cycleMode() {
    if (N.cycleMode)
      N.cycleMode();
    else {
      const t = O.cyclePlayMode();
      f.mode = t, window.dispatchEvent(new CustomEvent("logicweaver:music-cycle-mode"));
    }
  },
  seek(t) {
    if (f.isBiliRadio) {
      const e = window;
      if (typeof e.LogicWeaverBiliRadioPlayer?.seek == "function") {
        e.LogicWeaverBiliRadioPlayer.seek(t);
        return;
      }
    }
    N.seek ? N.seek(t) : (O.seek(t), window.dispatchEvent(new CustomEvent("logicweaver:music-seek", { detail: { percent: t } })));
  },
  openPanel() {
    N.openPanel ? N.openPanel() : (Es.togglePicker(!0), window.dispatchEvent(new CustomEvent("logicweaver:music-open-panel")));
  },
  openNetease() {
    f.pickerTab = "netease", f.pickerOpen = !0, f.activeAlbum = null, this.loadNeteaseData();
  },
  async loadNeteaseData() {
    f.neteaseUser = U.getUser(), f.neteaseRecentSongs = U.getRecentSongs(), f.neteaseLoading = !0;
    try {
      const [t] = await Promise.all([
        U.getPlaylists(),
        U.fetchAccountRecentSongs(60).catch(() => [])
      ]);
      if (f.neteasePlaylists = t, f.neteaseRecentSongs = U.getRecentSongs(), t.length > 0) {
        const e = t.find((r) => r.name.includes("喜欢的音乐") || r.name.includes("Favorite")) || t[0];
        (!f.neteaseActivePlaylist || f.neteaseActivePlaylist.id !== e.id) && await this.selectNeteasePlaylist(e);
      }
    } catch (t) {
      console.warn("[MusicStore] Load netease playlists error:", t);
    } finally {
      f.neteaseLoading = !1, f.neteaseRecentSongs = U.getRecentSongs();
    }
  },
  async selectNeteasePlaylist(t) {
    if (f.neteaseActivePlaylist = t, !t) {
      f.neteaseSongs = [];
      return;
    }
    f.neteaseLoading = !0;
    try {
      if (!f.neteaseSongs.length)
        try {
          const r = await U.getPlaylistTracks(t.id, 10, 0);
          f.neteaseActivePlaylist?.id === t.id && !f.neteaseSongs.length && (f.neteaseSongs = r, f.neteaseLoading = !1);
        } catch {
        }
      const e = await U.getPlaylistTracks(t.id, 500, 0);
      f.neteaseActivePlaylist?.id === t.id && (f.neteaseSongs = e);
    } catch (e) {
      console.warn("[MusicStore] Load playlist tracks error:", e);
    } finally {
      f.neteaseLoading = !1;
    }
  },
  async searchNetease(t) {
    const e = t.trim();
    if (!e) {
      f.neteaseSearchResults = [];
      return;
    }
    f.neteaseLoading = !0;
    try {
      const r = await U.searchSongs(e);
      f.neteaseSearchResults = r;
    } catch (r) {
      console.warn("[MusicStore] Search netease error:", r);
    } finally {
      f.neteaseLoading = !1;
    }
  },
  syncFromBiliRadio(t) {
    f.isBiliRadio = !0, f.isNetease = !1, f.playing = t.playing, f.title = t.title || "B站电台", f.artist = t.artist || t.seriesName || "哔哩哔哩", t.coverUrl && (f.coverUrl = t.coverUrl), f.currentTime = t.currentTime, f.duration = t.duration, f.formattedCurrent = Be(t.currentTime), f.formattedDuration = Be(t.duration), f.progressPercent = t.duration > 0 ? Math.min(100, Math.max(0, t.currentTime / t.duration * 100)) : 0, f.currentLyric = t.lyric || "", f.biliRadioSeriesName = t.seriesName || "";
    const e = O.getAudioElement();
    t.playing && e && !e.paused && e.pause();
  },
  playNeteaseTrack(t, e) {
    f.isBiliRadio = !1;
    const r = window;
    r.LogicWeaverBiliRadioPlayer?.getState?.()?.playing && r.LogicWeaverBiliRadioPlayer.toggle(), t && (U.recordRecentSong(t), f.neteaseRecentSongs = U.getRecentSongs()), e?.length && O.setQueue(e.map(ki), -1, !1), O.playNeteaseSong(t);
  },
  clearNeteaseRecent() {
    U.clearRecentSongs().catch(() => console.warn("[MusicStore] Recent history removal failed; re-read before retry"));
  },
  refreshRecentSongs() {
    f.neteaseRecentSongs = U.getRecentSongs();
  },
  stopNeteaseQrLogin() {
  },
  async startNeteaseQrLogin() {
    if (this.stopNeteaseQrLogin(), !!Ne.send({ type: "START_CONNECT" }))
      try {
        await U.connectWebsiteAccount();
        const t = U.getUser();
        Ne.send({ type: "CONNECT_SUCCESS", user: t }), f.neteaseQrStatus = "官网账户已连接", await this.loadNeteaseData();
      } catch (t) {
        const e = t?.message || "请先在网易云官网登录。";
        Ne.send({ type: "CONNECT_FAILURE", message: e }), f.neteaseQrStatus = e;
      }
  },
  async logoutNetease() {
    await U.logout(), Ne.send({ type: "LOGOUT" }), f.neteaseUser = null, f.neteasePlaylists = [], f.neteaseActivePlaylist = null, f.neteaseSongs = [], f.neteaseSearchResults = [];
  }
};
typeof window < "u" && (window.addEventListener("netease:account-updated", () => {
  f.neteaseUser = U.getUser(), Ne.send({ type: "SYNC_USER", user: f.neteaseUser }), f.neteasePlaylists = [], f.neteaseSongs = [], f.neteaseSearchResults = [], f.neteaseActivePlaylist = null;
}), window.addEventListener("netease:recent-updated", (t) => {
  Array.isArray(t.detail) ? f.neteaseRecentSongs = t.detail : f.neteaseRecentSongs = U.getRecentSongs();
}), O.subscribe((t) => {
  f.playing = t.playing, f.currentTime = t.currentTime, f.duration = t.duration, f.formattedCurrent = Be(t.currentTime), f.formattedDuration = Be(t.duration), t.duration > 0 ? f.progressPercent = Math.min(100, Math.max(0, t.currentTime / t.duration * 100)) : f.progressPercent = 0, f.mode = t.mode, f.isNetease = !!t.currentSong?.isNetease, f.currentLyric = t.currentLyric || "", t.currentSong && (f.title = t.currentSong.name || "点击播放", f.artist = (t.currentSong.artists || []).join(", ") || "作者", f.coverUrl = t.currentSong.coverUrl || "", f.liked = O.isLiked(t.currentSong.cid));
}));
async function Po() {
  try {
    if (f.favorites = O.getFavorites(), f.neteaseRecentSongs = U.getRecentSongs(), f.neteaseUser = U.getUser(), typeof localStorage < "u")
      try {
        const r = ti(Ei);
        if (r.length) {
          const s = r;
          Array.isArray(s) && s.length > 0 && f.neteaseSongs.length === 0 && (f.neteaseSongs = s);
        }
        const i = ti(Ci);
        if (i.length) {
          const s = i;
          Array.isArray(s) && s.length > 0 && f.neteasePlaylists.length === 0 && (f.neteasePlaylists = s);
        }
      } catch {
      }
    const [t, e] = await Promise.all([
      O.getSirenSongs().catch(() => []),
      O.getSirenAlbums().catch(() => [])
    ]);
    t.length > 0 && f.songs.length === 0 && (f.songs = t), e.length > 0 && f.albums.length === 0 && (f.albums = e);
  } catch (t) {
    console.warn("[MusicStore] initHomeMusicService failed:", t);
  }
}
class _o extends Error {
  constructor(e = "设置保存结果未确认，请重读核对；未自动重试") {
    super(e), this.name = "SettingsSaveUnconfirmedError";
  }
}
function Ee(t, e) {
  if (Object.is(t, e)) return !0;
  if (t === null || e === null || typeof t != "object" || typeof e != "object") return !1;
  if (Array.isArray(t) || Array.isArray(e))
    return Array.isArray(t) && Array.isArray(e) && t.length === e.length && t.every((n, o) => Ee(n, e[o]));
  const r = t, i = e, s = Object.keys(r);
  return s.length === Object.keys(i).length && s.every((n) => Object.prototype.hasOwnProperty.call(i, n) && Ee(r[n], i[n]));
}
function Is(t) {
  return t === void 0 ? t : JSON.parse(JSON.stringify(t));
}
class Re extends Error {
  constructor() {
    super("保存结果未确认，未自动重试。请复制草稿后刷新页面核对，再决定是否修改。");
  }
}
let pr = !1;
async function ri(t) {
  return new Promise((e, r) => {
    chrome.storage.local.get(t, (i) => {
      chrome.runtime.lastError ? r(new Error("无法读取网站数据，本次未提交；请稍后再试。")) : e(i);
    });
  });
}
async function yr(t, e) {
  if (pr) throw new Re();
  if (typeof chrome > "u" || !chrome.storage?.local)
    throw new Error("浏览器存储不可用，未保存；请在扩展页面操作。");
  if (typeof navigator > "u" || !navigator.locks?.request)
    throw new Error("当前环境不支持标题保存保护，未提交修改。");
  const r = new AbortController(), i = setTimeout(() => r.abort(), 1e4);
  let s = !1;
  try {
    return await navigator.locks.request("logicweaver:launcher-titles", { signal: r.signal }, async () => {
      if (pr) throw new Re();
      const n = await ri(t);
      if (r.signal.aborted) throw new Error("等待保存超时，本次未提交。");
      const o = e(n), a = Object.fromEntries(t.filter((c) => !Ee(n[c], o[c])).map((c) => [c, o[c]]));
      if (Object.keys(a).length) {
        clearTimeout(i), s = !0, await new Promise((l, d) => {
          chrome.storage.local.set(a, () => {
            chrome.runtime.lastError ? d(new Re()) : l();
          });
        });
        const c = await ri(t);
        if (t.some((l) => !Ee(c[l], o[l])))
          throw new Re();
      }
      try {
        for (const c of t) o[c] !== void 0 && localStorage.setItem(`logicweaver:${c}`, JSON.stringify(o[c]));
      } catch {
      }
      return o;
    });
  } catch (n) {
    throw s || n instanceof Re ? (pr = !0, new Re()) : r.signal.aborted ? new Error("等待保存超时，本次未提交。") : n;
  } finally {
    clearTimeout(i);
  }
}
function wr(t) {
  if (!Array.isArray(t) || t.some((e) => !e || typeof e != "object" || Array.isArray(e)))
    throw new Error("网站数据格式异常，未覆盖已有数据。");
  return t;
}
function br(t) {
  if (t === void 0) return {};
  if (!t || typeof t != "object" || Array.isArray(t))
    throw new Error("文件夹数据格式异常，未覆盖已有数据。");
  return t;
}
function Tt(t) {
  const e = t.trim().replace(/\s+/g, " ");
  if (!e) throw new Error("文件夹名称不能为空。");
  if (e.length > 20) throw new Error("文件夹名称最多20个字符，请缩短后再保存。");
  if (["__proto__", "constructor", "prototype"].includes(e)) throw new Error("这个名称不可用，请换一个名称。");
  return e;
}
const Sr = (t, e) => Object.prototype.hasOwnProperty.call(t, e);
function Ot(t, e) {
  if (!Sr(t, e)) return;
  const r = t[e]?.parent;
  if (!r || typeof r != "string" || !Sr(t, r)) return;
  const i = /* @__PURE__ */ new Set([e]);
  let s = r;
  for (; s; ) {
    if (i.has(s)) return;
    i.add(s), s = Sr(t, s) ? t[s]?.parent : void 0;
  }
  return r;
}
function ii(t, e) {
  const r = /* @__PURE__ */ new Set([e]), i = /* @__PURE__ */ new Map();
  for (const n of Object.keys(t)) {
    const o = Ot(t, n);
    o && i.set(o, [...i.get(o) || [], n]);
  }
  const s = [e];
  for (let n = 0; n < s.length; n++) for (const o of i.get(s[n]) || [])
    r.has(o) || (r.add(o), s.push(o));
  return r;
}
const L = "quickLinks", J = "quickLinkGroupSizes", $ = "launcherFolders", se = "launcherPages", ye = "launcherPageLabels", ue = "launcherActivePage", Ut = "launcherIconCache", As = 480, Ts = 18e5, Us = 120 * 1024, R = "常用网站", C = "常用网站";
class $e {
  constructor() {
    this.state = {
      links: [],
      groupSizes: {},
      folders: {},
      pages: [R],
      pageLabels: {},
      activePage: R
    }, this.iconCache = {}, this.iconCachePending = /* @__PURE__ */ new Set(), this.iconCacheSaveTimer = null, this.listeners = [], this.isLoaded = !1, this.ready = this.initFromWindowOrStorage(), this.bindStorageChangeListener();
  }
  bindStorageChangeListener() {
    typeof chrome < "u" && chrome.storage?.onChanged && chrome.storage.onChanged.addListener((e, r) => {
      if (r !== "local") return;
      let i = !1;
      e[L] && Array.isArray(e[L].newValue) && (this.state.links = [...e[L].newValue], i = !0), e[J] && e[J].newValue && (this.state.groupSizes = { ...e[J].newValue }, i = !0), e[$] && e[$].newValue && (this.state.folders = { ...e[$].newValue }, i = !0), e[se] && Array.isArray(e[se].newValue) && e[se].newValue.length > 0 && (this.state.pages = [...e[se].newValue], i = !0), e[ye] && e[ye].newValue && (this.state.pageLabels = { ...e[ye].newValue }, i = !0), e[ue] && typeof e[ue].newValue == "string" && (this.state.activePage = e[ue].newValue, i = !0), i && this.notify();
    });
  }
  static getInstance() {
    return $e.instance || ($e.instance = new $e()), $e.instance;
  }
  /**
   * 规范化网址格式
   */
  normalizeUrl(e) {
    const r = String(e || "").trim();
    return r ? /^[a-zA-Z][a-zA-Z\d+\-.]*?:/i.test(r) ? r : r.startsWith("//") ? "https:" + r : "https://" + r : "";
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
    const r = {};
    return typeof chrome < "u" && chrome.storage && chrome.storage.local ? new Promise((i) => {
      chrome.storage.local.get(e, (s) => i(s || {}));
    }) : (typeof localStorage < "u" && e.forEach((i) => {
      const s = localStorage.getItem(`logicweaver:${i}`);
      if (s)
        try {
          r[i] = JSON.parse(s);
        } catch {
          r[i] = s;
        }
    }), r);
  }
  async storageSet(e) {
    typeof chrome < "u" && chrome.storage && chrome.storage.local && await new Promise((r) => {
      chrome.storage.local.set(e, () => r());
    }), typeof localStorage < "u" && Object.entries(e).forEach(([r, i]) => {
      try {
        localStorage.setItem(`logicweaver:${r}`, JSON.stringify(i));
      } catch {
      }
    });
  }
  /**
   * 初始化数据
   */
  async initFromWindowOrStorage() {
    const e = typeof window < "u" ? window : null;
    e && e.launcherState && (this.state.links = Array.isArray(e.launcherState.links) ? [...e.launcherState.links] : [], this.state.groupSizes = { ...e.launcherState.groupSizes || {} }, this.state.folders = { ...e.launcherState.folders || {} }, this.state.pages = Array.isArray(e.launcherState.pages) ? [...e.launcherState.pages] : [R], this.state.pageLabels = { ...e.launcherState.pageLabels || {} }, this.state.activePage = e.launcherState.activePage || R), e && e.launcherIconCache && (this.iconCache = { ...e.launcherIconCache });
    const r = [
      L,
      J,
      $,
      se,
      ye,
      ue,
      Ut
    ];
    try {
      const i = await this.storageGet(r);
      Array.isArray(i[L]) && (this.state.links = [...i[L]]), i[J] && (this.state.groupSizes = { ...i[J] }), i[$] && (this.state.folders = { ...i[$] }), Array.isArray(i[se]) && i[se].length > 0 && (this.state.pages = [...i[se]]), i[ye] && (this.state.pageLabels = { ...i[ye] }), i[ue] && (this.state.activePage = i[ue]), i[Ut] && (this.iconCache = { ...i[Ut] });
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
      this.listeners = this.listeners.filter((r) => r !== e);
    };
  }
  notify() {
    this.syncToWindow();
    const e = this.getState();
    this.listeners.forEach((r) => {
      try {
        r(e);
      } catch {
      }
    });
  }
  /**
   * 持久化启动器状态
   */
  async save() {
    await this.storageSet({
      [L]: this.state.links,
      [J]: this.state.groupSizes,
      [$]: this.state.folders,
      [se]: this.state.pages,
      [ye]: this.state.pageLabels,
      [ue]: this.state.activePage,
      quickLinksReady: !0
    }), this.notify();
  }
  async saveLink(e) {
    const r = new URL(this.normalizeUrl(e.url));
    if (r.protocol !== "https:" && r.protocol !== "http:") throw new Error("仅支持 HTTP/HTTPS 网站");
    const i = this.state.links.findIndex((a) => String(a.id) === String(e.id)), s = i >= 0 ? this.state.links[i] : void 0;
    let n = e.page ? e.page.trim() : s?.page || (s ? R : this.state.activePage);
    n && !this.state.pages.includes(n) && this.state.pages.push(n);
    const o = {
      ...s,
      id: s?.id || crypto.randomUUID(),
      title: e.title.trim(),
      url: r.href,
      group: e.group?.trim() || C,
      page: n,
      note: e.note !== void 0 ? e.note.trim() : s?.note
    };
    i >= 0 ? this.state.links[i] = o : this.state.links.push(o), await this.save();
  }
  /** Title-only intent: do not resubmit a stale URL, note, group, or entire launcher snapshot. */
  async renameLinkTitle(e, r, i) {
    const s = i.trim();
    if (!s) throw new Error("网站名称不能为空。");
    if (s.length > 50) throw new Error("网站名称最多50个字符。");
    return this.saveLinkTextField(e, "title", r, s);
  }
  async editLinkUrl(e, r, i) {
    if (!i.trim()) throw new Error("网址不能为空。");
    let s;
    try {
      s = new URL(this.normalizeUrl(i));
    } catch {
      throw new Error("网址格式不正确，请检查后再保存。");
    }
    if (s.protocol !== "https:" && s.protocol !== "http:") throw new Error("仅支持 HTTP/HTTPS 网站。");
    if (s.username || s.password) throw new Error("请勿在网址中保存用户名或密码。");
    return this.saveLinkTextField(e, "url", r, s.href);
  }
  async editLinkNote(e, r, i) {
    const s = i.trim();
    if (s.length > 200) throw new Error("网站备注最多200个字符。");
    return this.saveLinkTextField(e, "note", r, s);
  }
  async saveLinkTextField(e, r, i, s) {
    await this.ready;
    const n = await yr([L], (o) => {
      const a = wr(o[L]), c = a.filter((h) => String(h.id) === String(e));
      if (c.length !== 1) throw new Error("网站已删除或标识重复，未提交；请重新打开菜单核对。");
      const l = c[0], d = l[r] || "";
      if (d !== (i || "") && d !== s)
        throw new Error("这一字段已被其他操作修改，未覆盖。请复制草稿，重新打开菜单核对。");
      return { [L]: a.map((h) => h === l ? { ...h, [r]: s } : h) };
    });
    return this.state.links = n[L], this.notify(), s;
  }
  async saveLinkNote(e, r) {
    const i = this.state.links.find((s) => String(s.id) === String(e));
    i && (i.note = r.trim(), await this.save());
  }
  async setLinkIcon(e, r) {
    const i = this.state.links.find((s) => String(s.id) === String(e));
    !i || !r || (i.customIcon = r, await this.save());
  }
  // ==================== 图标离屏缓存逻辑 ====================
  getCachedIcon(e) {
    const r = this.getCacheKey(e);
    return this.iconCache[r]?.dataUrl || null;
  }
  evictCachedIcon(e) {
    const r = this.getCacheKey(e);
    this.iconCache[r] && (delete this.iconCache[r], this.scheduleIconCacheSave());
  }
  scheduleIconCacheSave() {
    this.iconCacheSaveTimer && clearTimeout(this.iconCacheSaveTimer), this.iconCacheSaveTimer = setTimeout(async () => {
      let e = 0;
      const r = Object.entries(this.iconCache).sort((s, n) => Number(n[1]?.savedAt || 0) - Number(s[1]?.savedAt || 0)).filter(([, s]) => {
        const n = String(s?.dataUrl || "").length;
        return !n || e + n > Ts ? !1 : (e += n, !0);
      }).slice(0, As), i = {};
      r.forEach(([s, n]) => {
        i[s] = n;
      }), this.iconCache = i, typeof window < "u" && (window.launcherIconCache = i);
      try {
        await this.storageSet({ [Ut]: this.iconCache });
      } catch {
      }
    }, 1200);
  }
  async cacheIcon(e, r, i) {
    const s = this.getCacheKey(e);
    if (!(!s || !r || r.startsWith("data:") || this.iconCachePending.has(s))) {
      this.iconCachePending.add(s);
      try {
        let n = "";
        if (i && i.naturalWidth && i.naturalHeight)
          try {
            const o = document.createElement("canvas"), a = Math.min(64, i.naturalWidth), c = Math.min(64, i.naturalHeight);
            o.width = a, o.height = c;
            const l = o.getContext("2d");
            l && (l.drawImage(i, 0, 0, a, c), n = o.toDataURL("image/png"));
          } catch {
          }
        if (n && n.startsWith("data:image/")) {
          this.iconCache[s] = { dataUrl: n, savedAt: Date.now() }, this.scheduleIconCacheSave();
          return;
        }
        if (!r.startsWith("chrome-extension:"))
          try {
            const o = await fetch(r, { credentials: "omit", cache: "force-cache" });
            if (o.ok) {
              const a = await o.blob();
              if (a.size && a.size <= Us && /^image\//i.test(a.type || "")) {
                const c = await new Promise((l, d) => {
                  const m = new FileReader();
                  m.onload = () => l(String(m.result || "")), m.onerror = () => d(m.error), m.readAsDataURL(a);
                });
                if (c && c.startsWith("data:image/")) {
                  this.iconCache[s] = { dataUrl: c, savedAt: Date.now() }, this.scheduleIconCacheSave();
                  return;
                }
              }
            }
          } catch {
          }
        /^https?:\/\//i.test(r) && (this.iconCache[s] = { dataUrl: r, savedAt: Date.now() }, this.scheduleIconCacheSave());
      } catch {
      } finally {
        this.iconCachePending.delete(s);
      }
    }
  }
  // ==================== 分区 (Pages) 业务逻辑 ====================
  getPageNames() {
    const e = /* @__PURE__ */ new Set([
      R,
      ...this.state.pages,
      ...this.state.links.map((r) => r.page || R)
    ]);
    return Array.from(e).map((r) => String(r || "").trim()).filter(Boolean);
  }
  getPageLabel(e) {
    return String(this.state.pageLabels[e] || (e === R ? "默认" : e));
  }
  async setPage(e, r = !0) {
    const i = this.getPageNames(), s = i.includes(e) ? e : i[0] || R;
    this.state.activePage = s, r && await this.storageSet({ [ue]: s }).catch(() => {
    }), this.notify();
  }
  async stepPage(e) {
    const r = this.getPageNames();
    if (r.length < 2) return;
    const i = Math.max(0, r.indexOf(this.state.activePage)), s = r[(i + e + r.length) % r.length];
    await this.setPage(s);
  }
  async addPage(e) {
    const r = String(e || "").trim().replace(/\s+/g, " ").slice(0, 12);
    if (!r) return !1;
    const i = this.getPageNames().find((n) => this.getPageLabel(n).toLowerCase() === r.toLowerCase());
    if (i)
      return await this.setPage(i), !1;
    let s = r;
    for (; this.getPageNames().includes(s); )
      s = `${r}-${crypto.randomUUID().slice(0, 4)}`;
    return this.state.pages.push(s), this.state.pageLabels[s] = r, this.state.activePage = s, await this.save(), !0;
  }
  async renamePage(e, r) {
    const i = String(r || "").trim().replace(/\s+/g, " ").slice(0, 12);
    return !i || this.getPageNames().some((n) => n !== e && this.getPageLabel(n).toLowerCase() === i.toLowerCase()) ? !1 : (this.state.pageLabels[e] = i, await this.save(), !0);
  }
  async deletePage(e) {
    const r = this.getPageNames();
    if (r.length <= 1) return !1;
    const i = r.find((s) => s !== e) || R;
    this.state.links.forEach((s) => {
      (s.page || R) === e && (s.page = i);
    });
    for (const [s, n] of Object.entries(this.state.folders)) (n.page || R) === e && (this.state.folders[s] = { ...n, page: i });
    return this.state.pages = this.state.pages.filter((s) => s !== e), delete this.state.pageLabels[e], this.state.activePage === e && (this.state.activePage = i), await this.save(), !0;
  }
  // ==================== 快捷链接 (Links) 业务逻辑 ====================
  getLinks(e) {
    return e ? this.state.links.filter((r) => (r.page || R) === e) : [...this.state.links];
  }
  async addLink(e) {
    const r = this.normalizeUrl(e.url), i = this.state.links.find((a) => this.normalizeUrl(a.url) === r), s = e.group || C, n = e.page || this.state.activePage;
    if (i)
      return i.group = s, i.page = n, !i.title && e.title && (i.title = e.title), e.customIcon && (i.customIcon = e.customIcon), e.icon && (i.icon = e.icon), await this.save(), i;
    const o = {
      id: crypto.randomUUID(),
      title: e.title || this.hostOf(r),
      url: r,
      group: s,
      page: n,
      icon: e.icon,
      customIcon: e.customIcon
    };
    return this.state.links.push(o), await this.save(), o;
  }
  async updateLink(e, r) {
    const i = this.state.links.find((s) => s.id === e);
    return i ? (Object.assign(i, r), r.url && (i.url = this.normalizeUrl(r.url)), await this.save(), !0) : !1;
  }
  async deleteLink(e) {
    const r = this.state.links.length, i = this.state.links.find((s) => s.id === e);
    return this.state.links = this.state.links.filter((s) => s.id !== e), this.state.links.length === r ? !1 : (i?.group && this.cleanUnusedGroups([i.group]), await this.save(), !0);
  }
  async moveLinkTo(e, r, i) {
    const s = this.state.links.find((o) => o.id === e);
    if (!s) return !1;
    const n = s.group || C;
    return s.group = i || C, s.page = s.group !== C ? this.getFolderPage(s.group) : r || this.state.activePage, this.cleanUnusedGroups([n]), await this.save(), r && r !== this.state.activePage && await this.setPage(r), !0;
  }
  // ==================== 分组/文件夹 (Folders / Groups) 业务逻辑 ====================
  getGroupNames() {
    return Array.from(/* @__PURE__ */ new Set([...this.state.links.map((e) => e.group || C), ...Object.keys(this.state.folders)]));
  }
  getFolderParent(e) {
    return Ot(this.state.folders, e);
  }
  getFolderPage(e) {
    let r = e;
    for (let i = this.getFolderParent(r); i; i = this.getFolderParent(r)) r = i;
    return this.state.folders[r]?.page || this.state.links.find((i) => i.group === r)?.page || this.state.activePage || R;
  }
  async moveFolderInto(e, r, i) {
    if (!e || e === C) throw new Error("不能移动默认分组。");
    await this.ready;
    const s = [L, $], n = i || this.getFolderPage(e), o = await yr(s, (a) => {
      const c = wr(a[L]), l = br(a[$]), d = /* @__PURE__ */ new Set([...Object.keys(l), ...c.map((I) => I.group || C)]);
      if (!d.has(e) || r && (!d.has(r) || r === C)) throw new Error("文件夹已变化，请重新打开后再移动。");
      Tt(e), r && Tt(r);
      const m = /* @__PURE__ */ new Set();
      for (let I = r; I; I = Object.prototype.hasOwnProperty.call(l, I) ? l[I]?.parent : void 0) {
        if (I === e || m.has(I)) throw new Error("不能移入自身、后代或层级异常的文件夹。");
        m.add(I);
      }
      const h = ii(l, e);
      if (r && h.has(r)) throw new Error("不能把文件夹放入自身或自己的子文件夹。");
      let g = r;
      for (; g && Ot(l, g); ) g = Ot(l, g);
      const k = r && (l[g]?.page || c.find((I) => I.group === g)?.page) || n, b = { ...l };
      r && !Object.prototype.hasOwnProperty.call(b, r) && (b[r] = { name: r, page: k });
      for (const I of h) b[I] = { ...b[I], name: I, page: k };
      return r ? b[e] = { ...b[e], parent: r } : delete b[e].parent, {
        ...a,
        [$]: b,
        [L]: c.map((I) => h.has(I.group || C) ? { ...I, page: k } : I)
      };
    });
    return this.state.links = o[L], this.state.folders = o[$], this.notify(), !0;
  }
  getGroupSize(e) {
    return this.state.groupSizes[e] === "small" ? "small" : this.state.groupSizes[e] === "large" || e === C ? "large" : "small";
  }
  async toggleGroupSize(e) {
    const r = this.getGroupSize(e) === "large" ? "small" : "large";
    return this.state.groupSizes[e] = r, await this.save(), r;
  }
  async renameGroup(e, r) {
    const i = Tt(r);
    if (i === e) return !1;
    if (!e || e === C) throw new Error("默认分组不能通过文件夹重命名。");
    await this.ready;
    const s = Is(this.state), n = (l, d) => Object.prototype.hasOwnProperty.call(l, d), o = (l) => l.filter((d) => (d.group || C) === e).map((d) => String(d.id)).sort(), c = await yr([L, J, $], (l) => {
      const d = wr(l[L]), m = br(l[J]), h = br(l[$]), g = /* @__PURE__ */ new Set([
        C,
        ...d.map((b) => b.group || C),
        ...Object.keys(m),
        ...Object.keys(h)
      ]);
      if (!g.has(e)) throw new Error("文件夹已被修改或删除，请重新打开后核对。");
      if ([...g].some((b) => typeof b == "string" && b !== e && b.toLowerCase() === i.toLowerCase()))
        throw new Error("已有同名文件夹，请换一个名称；原文件夹未修改。");
      if (!Ee(o(d), o(s.links)) || !Ee(m[e], s.groupSizes[e]) || !Ee(h[e], s.folders[e]))
        throw new Error("文件夹内容已被其他操作修改，未覆盖；请复制草稿，重新打开后核对。");
      const k = { ...l, [L]: d.map((b) => (b.group || C) === e ? { ...b, group: i } : b) };
      if (n(m, e)) {
        const b = { ...m, [i]: m[e] };
        delete b[e], k[J] = b;
      }
      if (n(h, e)) {
        const b = h[e];
        if (!b || typeof b != "object" || Array.isArray(b)) throw new Error("文件夹记录格式异常，未提交修改。");
        const I = { ...h, [i]: { ...b, name: i } };
        delete I[e];
        for (const y of Object.keys(I)) I[y]?.parent === e && (I[y] = { ...I[y], parent: i });
        k[$] = I;
      }
      return k;
    });
    return this.state.links = c[L], this.state.groupSizes = c[J] || {}, this.state.folders = c[$] || {}, this.notify(), !0;
  }
  async moveFolderToPage(e, r) {
    return !e || !r ? !1 : (await this.moveFolderInto(e, void 0, r), await this.setPage(r), !0);
  }
  async deleteGroup(e, r) {
    if (!e || e === C) return !1;
    const i = this.getFolderParent(e);
    for (const [s, n] of Object.entries(this.state.folders)) n.parent === e && (this.state.folders[s] = { ...n, parent: i });
    return r === "release" ? this.state.links.forEach((s) => {
      (s.group || C) === e && (s.group = i || C);
    }) : this.state.links = this.state.links.filter((s) => (s.group || C) !== e), delete this.state.groupSizes[e], this.state.folders && delete this.state.folders[e], await this.save(), !0;
  }
  async mergeGroups(e, r) {
    if (!e || !r || e === r) return !1;
    if (ii(this.state.folders, e).has(r)) throw new Error("不能合并到自己的子文件夹。");
    for (const [s, n] of Object.entries(this.state.folders)) n.parent === e && (this.state.folders[s] = { ...n, parent: r === C ? void 0 : r });
    const i = /* @__PURE__ */ new Set();
    return this.state.links.filter((s) => (s.group || C) === r).forEach((s) => {
      try {
        i.add(this.normalizeUrl(s.url));
      } catch {
      }
    }), this.state.links = this.state.links.filter((s) => {
      if ((s.group || C) !== e) return !0;
      let n = s.url;
      try {
        n = this.normalizeUrl(s.url);
      } catch {
      }
      return i.has(n) ? !1 : (i.add(n), s.group = r, !0);
    }), delete this.state.groupSizes[e], this.state.folders && delete this.state.folders[e], await this.save(), !0;
  }
  async stackLinks(e, r) {
    if (!e || e === r) return;
    const i = this.state.links.find((c) => c.id === e), s = this.state.links.find((c) => c.id === r);
    if (!i || !s) return;
    const n = i.group || C, o = s.group || C;
    i.page = s.page || R;
    const a = this.state.links.filter((c) => (c.group || C) === o).length;
    if (n !== o && o !== C && a > 1)
      i.group = o, this.state.groupSizes[o] = "large", this.cleanUnusedGroups([n]);
    else if (n !== o || o === C) {
      const c = this.uniqueGroupName(s.title);
      i.group = c, s.group = c, this.state.groupSizes[c] = "small", this.cleanUnusedGroups([n, o]);
    } else
      return;
    await this.save();
  }
  async createFolder(e = "large", r, i, s) {
    const n = /* @__PURE__ */ new Set([C, ...this.getGroupNames()]);
    this.state.folders && Object.keys(this.state.folders).forEach((l) => n.add(l));
    const o = e === "large" ? "新建大文件夹" : "新建中文件夹";
    let a = (r || o).trim();
    if (n.has(a)) {
      let l = 2;
      for (; n.has(`${o} ${l}`); ) l += 1;
      a = `${o} ${l}`;
    }
    if (a = Tt(a), s && !this.getGroupNames().includes(s)) throw new Error("上级文件夹不存在。");
    const c = s ? this.getFolderPage(s) : i || this.state.activePage || R;
    return this.state.folders || (this.state.folders = {}), s && !Object.prototype.hasOwnProperty.call(this.state.folders, s) && (this.state.folders[s] = { name: s, page: c }), this.state.folders[a] = { name: a, page: c, ...s ? { parent: s } : {} }, this.state.groupSizes[a] = e, await this.save(), a;
  }
  async createLargeFolder(e, r) {
    return this.createFolder("large", e, r);
  }
  async createMediumFolder(e, r) {
    return this.createFolder("small", e, r);
  }
  async createLargeFolderFromLink(e, r) {
    const i = this.state.links.find((o) => String(o.id) === String(e));
    if (!i) return "";
    const s = r?.trim() || this.uniqueGroupName(i.title), n = i.group || C;
    return i.group = s, this.state.groupSizes[s] = "large", this.cleanUnusedGroups([n]), await this.save(), s;
  }
  uniqueGroupName(e) {
    const r = new Set(this.getGroupNames()), i = `${(e || "新").trim().slice(0, 14)}收藏夹`;
    if (!r.has(i)) return i;
    let s = 2;
    for (; r.has(`${i} ${s}`); ) s += 1;
    return `${i} ${s}`;
  }
  cleanUnusedGroups(e) {
    e.forEach((r) => {
      if (!this.state.links.some((i) => (i.group || C) === r)) {
        if (this.state.folders && this.state.folders[r])
          return;
        delete this.state.groupSizes[r], this.state.folders && delete this.state.folders[r];
      }
    });
  }
  // ==================== 排序与拖拽 (Tile Reorder) ====================
  async moveFolderToEnd(e) {
    const r = this.state.links.filter((i) => (i.group || C) === e);
    r.length && (this.state.links = this.state.links.filter((i) => (i.group || C) !== e).concat(r), await this.save());
  }
  async reorderLinks(e, r, i = "after") {
    const s = [...this.state.links], n = s.findIndex((d) => String(d.id) === String(e));
    if (n < 0) return !1;
    const o = s[n];
    s.splice(n, 1);
    const a = s.findIndex((d) => String(d.id) === String(r));
    if (a < 0) return !1;
    const c = s[a];
    o.page = c.page || R, o.group = c.group || C;
    const l = i === "before" ? a : a + 1;
    return s.splice(l, 0, o), this.state.links = s, await this.save(), this.notify(), !0;
  }
  async reorderFolderLinks(e, r) {
    const i = e || C, s = this.state.links.findIndex((d) => (d.group || C) === i);
    if (s < 0) return !1;
    const n = this.state.links.filter((d) => (d.group || C) === i), o = this.state.links.filter((d) => (d.group || C) !== i), a = new Map(n.map((d) => [String(d.id), d])), c = [];
    for (const d of r) {
      const m = a.get(String(d));
      m && (c.push(m), a.delete(String(d)));
    }
    for (const d of a.values())
      c.push(d);
    const l = [...o];
    return l.splice(Math.min(s, l.length), 0, ...c), this.state.links = l, await this.save(), this.notify(), !0;
  }
  async reorderTile(e, r, i = "after") {
    if (!e || !r) return;
    if (e.kind === "link" && r.kind === "link" && e.id && r.id) {
      await this.reorderLinks(e.id, r.id, i);
      return;
    }
    const s = e.kind === "folder" ? this.state.links.filter((g) => (g.group || C) === e.group) : this.state.links.filter((g) => String(g.id) === String(e.id));
    if (!s.length) return;
    if (r.kind === "folder" && r.group) {
      const k = (this.state.folders ? this.state.folders[r.group] : void 0)?.page || this.state.activePage || R;
      s.forEach((b) => {
        b.group = r.group, b.page = k;
      }), await this.save(), this.notify();
      return;
    }
    const n = new Set(s.map((g) => String(g.id))), o = this.state.links.filter((g) => String(g.id) === String(r.id));
    if (!o.length || o.some((g) => n.has(String(g.id)))) return;
    const a = o[0].page || R, c = o[0].group || C;
    s.forEach((g) => {
      g.page = a, g.group = c;
    });
    const l = new Set(o.map((g) => String(g.id))), d = this.state.links.filter((g) => !n.has(String(g.id))), m = d.map((g, k) => l.has(String(g.id)) ? k : -1).filter((g) => g >= 0);
    if (!m.length) return;
    const h = i === "before" ? Math.min(...m) : Math.max(...m) + 1;
    d.splice(h, 0, ...s), this.state.links = d, await this.save(), this.notify();
  }
  async reorderPageItems(e, r) {
    const i = String(e || R).trim(), s = !i || i === "常用网站" || i === "默认", n = this.state.pageLabels || {}, o = (m) => {
      const h = String(m.page || "").trim(), g = !h || h === "常用网站" || h === "默认";
      if (s) return g;
      if (g) return !1;
      if (h === i) return !0;
      const k = n[h] || h, b = n[i] || i;
      return k === b || h === b || k === i;
    }, a = this.state.links.filter(o), c = this.state.links.filter((m) => !o(m)), l = [], d = /* @__PURE__ */ new Set();
    for (const m of r)
      if (m.type === "link" && m.id) {
        const h = a.find((g) => String(g.id) === String(m.id));
        h && !d.has(String(h.id)) && (d.add(String(h.id)), l.push(h));
      } else if (m.type === "folder" && m.groupName) {
        const h = a.filter(
          (g) => (g.group || C) === m.groupName
        );
        for (const g of h)
          d.has(String(g.id)) || (d.add(String(g.id)), l.push(g));
      }
    for (const m of a)
      d.has(String(m.id)) || l.push(m);
    this.state.links = [...c, ...l], await this.save(), this.notify();
  }
}
const ve = $e.getInstance(), X = F({
  avatarUrl: "assets/bilibili.svg",
  userName: "哔哩哔哩用户",
  buttonTitle: "通知中心"
}), Ps = () => ({
  mounted: !1,
  visible: !1,
  x: 0,
  y: 0,
  avatarUrl: "assets/bilibili.svg",
  userName: "用户"
}), we = F(Ps());
let H = {};
const _s = {
  getSnapshot() {
    return Kt(we);
  },
  update(t) {
    Object.assign(we, t);
  },
  setMounted(t) {
    we.mounted = t;
  },
  open(t, e) {
    we.x = t, we.y = e, we.visible = !0;
    const r = document.getElementById("bili-profile-menu");
    r && (r.hidden = !1, r.style.left = `${Math.min(window.innerWidth - 205, t)}px`, r.style.top = `${Math.min(window.innerHeight - 150, e)}px`);
  },
  close() {
    we.visible = !1;
    const t = document.getElementById("bili-profile-menu");
    t && (t.hidden = !0);
  },
  trigger(t) {
    if (_s.close(), H.onAction) {
      H.onAction(t);
      return;
    }
    t === "messages" && H.showInfo ? H.showInfo() : t === "refresh" && H.refresh ? H.refresh() : t === "switch" && H.switchUser ? H.switchUser() : t === "web" && H.openWeb ? H.openWeb() : window.dispatchEvent(new CustomEvent("logicweaver:profile-menu-action", { detail: { action: t } }));
  },
  setActions(t) {
    H = { ...H, ...t };
  }
}, si = [
  "todoist",
  "card-github",
  "daily-aihot",
  "daily-bilibili",
  "multica"
], qt = "lw_active_card";
function Rs() {
  try {
    if (typeof localStorage < "u" && localStorage.removeItem(qt), typeof window < "u" && window.location?.hash) {
      const t = window.location.hash.replace(/^#/, "");
      if (si.includes(t))
        return t;
    }
    if (typeof sessionStorage < "u") {
      const t = sessionStorage.getItem(qt);
      if (t && si.includes(t))
        return t;
    }
  } catch {
  }
  return null;
}
const Z = F({
  activeId: Rs()
});
typeof window < "u" && qe(
  () => Z.activeId,
  (t) => {
    try {
      t ? (sessionStorage.setItem(qt, t), window.location.hash !== `#${t}` && history.replaceState(null, "", `#${t}`)) : (sessionStorage.removeItem(qt), window.location.hash && history.replaceState(null, "", window.location.pathname + window.location.search));
    } catch {
    }
  },
  { immediate: !0 }
);
let jt;
function Ro(t) {
  jt = t;
}
function Jt(t) {
  if (!jt) throw new Error("Fullscreen card host not ready");
  jt.enter(t);
}
function mt(t) {
  Z.activeId === t && jt?.exit();
}
function Ms(t) {
  typeof document > "u" || (document.documentElement?.classList.remove("has-card-fullscreen"), document.body && (document.body.classList.toggle("has-card-fullscreen", !!t), document.body.dataset.page = t ? "daily" : "home"));
}
const Ls = {
  "bilibili.html": "daily-bilibili",
  "github.html": "card-github",
  "aihot.html": "daily-aihot"
};
function Ai() {
  return typeof location > "u" ? null : Ls[location.pathname.split("/").pop() || ""] || null;
}
const Mo = jr(() => {
  const t = Ai() || Z.activeId;
  if (t) return t;
  const e = ss.activeId;
  return e && Wt.isActive(e) ? e : "home";
}), Ns = [
  "youtubeFavoritesV1",
  "youtubeFavGroupsV1",
  "youtubeModuleSettingsV1",
  "youtubeRssChannelsV1",
  "youtubeCustomGroupsV1",
  "youtubeRssVideosCacheV1",
  "youtubePlaylistsV1",
  "youtubeRecommendBatchV1",
  "logicweaver_youtube_explore_cache",
  "showYouTube"
];
function Os() {
  if (!(typeof localStorage > "u"))
    for (const t of Ns)
      localStorage.removeItem(t), localStorage.removeItem(`logicweaver:${t}`);
}
const xs = {
  schemaVersion: 1,
  id: "card-github",
  title: "github插件",
  icon: "assets/nav-github.svg",
  presentation: "card",
  dockBefore: "daily-aihot",
  rootId: "card-github",
  settingsKeys: ["ghUser", "ghToken", "ghAiServiceConfigV1", "ghArchifyWebhookUrl"],
  capabilities: ["workspace:fullscreen", "view:retained", "github:repositories"],
  loadView: () => import("./GitHubWorkspaceCard-G_d6PE5G.js").then((t) => t.default),
  lifecycle: {
    isVisible: () => Z.activeId === "card-github",
    open: () => Jt("card-github"),
    hide: () => mt("card-github"),
    // Existing card menus do not expose Quit/Reload. Do not introduce a destructive new path
    // until settings drafts and every child editor provide an aggregate unmount guard.
    canUnmount: () => !1,
    unmountBlockedMessage: "GitHub 工作区保留原有隐藏保活设计；尚未开放独立退出/重载，以免丢失草稿。"
  }
}, Bs = {
  schemaVersion: 1,
  id: "daily-bilibili",
  title: "b站插件",
  icon: "assets/bilibili.svg",
  presentation: "card",
  dockBefore: "card-github",
  rootId: "daily-bilibili",
  // Preserve the existing workspace-ready mount while shared playback/startup is audited.
  mountPolicy: "workspace-ready",
  // Cache directory handles remain in the existing IndexedDB service, not chrome settings.
  settingsKeys: [],
  capabilities: ["workspace:fullscreen", "view:retained", "bilibili:favorites"],
  loadView: () => import("./BilibiliWorkspace-BYO-jwdY.js").then((t) => t.default),
  lifecycle: {
    isVisible: () => Z.activeId === "daily-bilibili",
    open: () => Jt("daily-bilibili"),
    hide: () => mt("daily-bilibili"),
    // Hide must not dispose shared radio/player state or interrupt folder/cache operations.
    canUnmount: () => !1,
    unmountBlockedMessage: "B站收藏保留原有隐藏保活设计；尚未开放独立退出/重载，以免打断播放、收藏或缓存操作。"
  }
}, $s = {
  schemaVersion: 1,
  id: "daily-aihot",
  title: "ai hot插件",
  icon: "assets/nav-aihot.svg",
  presentation: "card",
  rootId: "daily-aihot",
  // Existing localStorage preferences; registration neither reads nor migrates them.
  settingsKeys: ["lw-info-feed-view", "lw-aihot-feed-cat", "lw-aihot-feed-window"],
  capabilities: ["workspace:fullscreen", "view:retained", "aihot:aggregate"],
  loadView: () => import("./AihotFeed-Ctm_OT9W.js").then((t) => t.default),
  lifecycle: {
    isVisible: () => Z.activeId === "daily-aihot",
    open: () => Jt("daily-aihot"),
    hide: () => mt("daily-aihot"),
    // Keep the original retained card. Its view owns list activity;
    // the separate article reader is not owned or closed by this module.
    canUnmount: () => !1,
    unmountBlockedMessage: "AI HOT 保留原有隐藏保活设计；尚未开放独立退出/重载。"
  }
}, Ds = {
  schemaVersion: 1,
  id: "stickers",
  title: "表情包模块",
  emoji: "😺",
  // Keep the chat picker's library management window without a standalone Dock entry.
  showInDock: !1,
  rootId: "vue-stickers-dialog-root",
  settingsKeys: os,
  capabilities: ["folder:explicit-permission", "image:explicit-save-delete", "image:local-preview", "image:clipboard"],
  loadView: () => import("./StickersDialog-KmUvCq4s.js").then((t) => t.default),
  lifecycle: {
    isVisible: () => Ct.visible,
    open: () => {
      Ct.visible = !0;
    },
    hide: () => {
      Ct.visible = !1, as();
    },
    canUnmount: () => Ct.pendingWrites === 0,
    unmountBlockedMessage: "图片保存/删除、目录授权或偏好正在处理，暂不能退出/重载；可以先隐藏，已提交操作不会撤回。"
  }
}, Fs = "neteaseApiUrl", qs = [Fs], js = {
  schemaVersion: 1,
  id: "music",
  title: "网易云模块",
  icon: "assets/netease.svg",
  rootId: "vue-music-workspace-root",
  settingsKeys: qs,
  capabilities: ["catalog:read", "settings:endpoint", "account:explicit-login-logout", "playback:shared-home-controls"],
  loadView: () => import("./NeteaseWorkspaceDialog-CUAF7A-X.js").then((t) => t.default),
  lifecycle: {
    isVisible: () => ae.visible,
    open: () => {
      ae.visible = !0;
    },
    hide: () => {
      ae.visible = !1, Ss();
    },
    canUnmount: () => ae.pendingWrites === 0,
    unmountBlockedMessage: "节点保存、登录确认/退出或记录写入正在处理，暂不能退出/重载；可以隐藏。退出窗口不会停止首页播放。"
  }
}, Vs = Object.freeze([
  "todoistToken",
  "todoistActiveProjectIdV1"
]), Hs = {
  schemaVersion: 1,
  id: "todoist",
  title: "todoist",
  icon: "assets/nav-todoist.svg",
  dockBefore: "stickers",
  rootId: "todoist",
  settingsKeys: Vs,
  capabilities: ["view:retained", "tasks:read-write", "attachments:explicit-upload", "settings:account-rules", "calendar:shared"],
  loadView: () => import("./TodoistWorkspace-CGYDU2-I.js").then((t) => t.default),
  lifecycle: {
    isVisible: () => Et.visible,
    open: () => {
      Et.visible = !0;
    },
    hide: () => {
      Et.visible = !1, cs();
    },
    canUnmount: () => Et.pendingWrites === 0,
    unmountBlockedMessage: "任务、附件、评论或配置正在写入，暂不能退出/重载；可以隐藏。首页限时任务和独立日历不会随窗口退出停止。"
  }
}, Gs = 1, zs = 1, Ws = { text: { legacy: !0 }, image: { legacy: !1 }, music: { legacy: !0 }, bilibili: { legacy: !0 }, github: { legacy: !0 }, bili_series: { legacy: !0 }, aihot: { legacy: !0 }, youtube: { legacy: !0 }, website: { legacy: !0 }, server_invite: { legacy: !0 }, music_party: { legacy: !0 } }, Ks = ["image/png", "image/jpeg", "image/gif", "image/webp"], Js = { messageBytes: 262144, imageMessageBytes: 2097152, imageBytes: 1048576, textChars: 8e3, imageMaxDimension: 8192, imageMaxPixels: 16777216 }, ze = {
  schema: Gs,
  protocol: zs,
  messageTypes: Ws,
  imageMimeTypes: Ks,
  limits: Js
};
function Ys(t) {
  try {
    if (t.length > Math.ceil(ze.limits.imageBytes / 3) * 4 + 64) return;
    const e = t.indexOf(","), r = t.slice(5, t.indexOf(";")), i = Uint8Array.from(atob(t.slice(e + 1)), (o) => o.charCodeAt(0)), s = new DataView(i.buffer), n = (o, a) => String.fromCharCode(...i.slice(o, a));
    if (r === "image/png" && i.length >= 33 && n(0, 8) === `PNG\r

` && s.getUint32(8) === 13 && n(12, 16) === "IHDR") return [s.getUint32(16), s.getUint32(20)];
    if (r === "image/gif" && i.length >= 13 && ["GIF87a", "GIF89a"].includes(n(0, 6))) return [s.getUint16(6, !0), s.getUint16(8, !0)];
    if (r === "image/webp" && i.length >= 25 && n(0, 4) === "RIFF" && n(8, 12) === "WEBP" && s.getUint32(4, !0) + 8 === i.length) {
      const o = n(12, 16);
      if (o === "VP8X" && i.length >= 30) return [1 + i[24] + (i[25] << 8) + (i[26] << 16), 1 + i[27] + (i[28] << 8) + (i[29] << 16)];
      if (o === "VP8L" && i[20] === 47) {
        const a = s.getUint32(21, !0);
        return [1 + (a & 16383), 1 + (a >>> 14 & 16383)];
      }
      if (o === "VP8 " && i.length >= 30 && n(23, 26) === "*") return [s.getUint16(26, !0) & 16383, s.getUint16(28, !0) & 16383];
    }
    if (r === "image/jpeg" && i[0] === 255 && i[1] === 216) {
      let o = 2;
      for (; o + 4 <= i.length && i[o] === 255; ) {
        for (; o < i.length && i[o] === 255; ) o++;
        if (o >= i.length) break;
        const a = i[o++];
        if (a === 216 || a === 1 || a >= 208 && a <= 215) continue;
        if (a === 217 || a === 218 || o + 2 > i.length) break;
        const c = s.getUint16(o);
        if (c < 2 || o + c > i.length) break;
        if ([192, 193, 194, 195, 197, 198, 199, 201, 202, 203, 205, 206, 207].includes(a) && c >= 8) return [s.getUint16(o + 5), s.getUint16(o + 3)];
        o += c;
      }
    }
  } catch {
  }
}
const Qs = ze.protocol, he = Object.freeze({ ...ze.limits }), Mr = Object.freeze(Object.keys(ze.messageTypes)), Lr = Object.freeze([...ze.imageMimeTypes]), te = (t) => !!t && typeof t == "object" && !Array.isArray(t), vr = (t) => typeof t == "number" && Number.isSafeInteger(t) && t > 0;
function Yt() {
  return { status: "unknown", reason: "请先完成当前服务器的身份同步，再发送消息。", messageTypes: [], imageMimeTypes: [], limits: { ...he } };
}
function Pt() {
  return { ...Yt(), status: "incompatible", reason: "服务端消息能力格式无效或协议版本不兼容，请服主核对前后端版本；待发内容已保留。" };
}
function Xs(t) {
  if (t === void 0 || te(t) && !("schema" in t) && !("protocol" in t) && !("messageTypes" in t) && !("limits" in t)) {
    if (t !== void 0 && !te(t)) return Pt();
    const s = te(t) && t.imageMessages === 1;
    return te(t) && t.maxImageBytes !== void 0 && !vr(t.maxImageBytes) ? Pt() : {
      status: "legacy",
      reason: s ? "" : "此旧版服务端未声明图片能力，请服主升级；待发图片已保留。",
      messageTypes: Mr.filter((n) => n === "image" ? s : ze.messageTypes[n].legacy),
      imageMimeTypes: s ? [...Lr] : [],
      limits: { ...he, imageBytes: s && te(t) && vr(t.maxImageBytes) ? Math.min(t.maxImageBytes, he.imageBytes) : he.imageBytes }
    };
  }
  if (!te(t) || t.schema !== 1 || t.protocol !== Qs || !te(t.limits) || !Array.isArray(t.messageTypes) || t.messageTypes.length > 64 || t.messageTypes.some((s) => typeof s != "string") || !Array.isArray(t.imageMimeTypes) || t.imageMimeTypes.length > 16 || t.imageMimeTypes.some((s) => typeof s != "string")) return Pt();
  const e = { ...he };
  for (const s of Object.keys(e)) {
    const n = t.limits[s];
    if (!vr(n)) return Pt();
    e[s] = Math.min(e[s], n);
  }
  const r = Lr.filter((s) => t.imageMimeTypes.includes(s)), i = Mr.filter((s) => t.messageTypes.includes(s) && (s !== "image" || t.imageMessages === 1 && r.length > 0));
  return { status: "supported", reason: i.includes("image") ? "" : "此服务端未启用兼容的图片消息，待发图片已保留。", messageTypes: i, imageMimeTypes: r, limits: e };
}
function Zs(t, e = he, r = Lr) {
  if (typeof t != "string" || t.length > Math.ceil(e.imageBytes / 3) * 4 + 32) return !1;
  const i = /^data:(image\/[a-z0-9.+-]+);base64,([A-Za-z0-9+/]+={0,2})$/.exec(t);
  if (!i || !r.includes(i[1])) return !1;
  const s = i[2], n = s.length / 4 * 3 - (s.endsWith("==") ? 2 : s.endsWith("=") ? 1 : 0);
  return s.length % 4 === 0 && n > 0 && n <= e.imageBytes;
}
function at(t, e) {
  if (!te(e) || typeof e.type != "string" || typeof e.content != "string" || typeof e.id != "string" || !e.id || typeof e.timestamp != "number" || !Number.isFinite(e.timestamp) || !te(e.sender) || typeof e.sender.uid != "string" || typeof e.sender.name != "string" || typeof e.sender.avatar != "string") return "消息格式无效，原记录已保留，请核对后重新发送。";
  const r = te(e.meta) ? e.meta.imageUrl : void 0;
  if (t.status === "unknown" || t.status === "incompatible") return t.reason;
  if (!t.messageTypes.includes(e.type)) return e.type === "image" ? t.reason || "服务端未启用图片消息，待发图片已保留。" : "服务端不支持此消息类型，内容已保留。";
  if (e.content.length > t.limits.textChars) return "文字超过服务端声明的长度上限，请缩短后再发送。";
  if (e.type === "image" && !Zs(r, t.limits, t.imageMimeTypes)) return "图片格式或大小不符合服务端能力，请重新选择或压缩；原内容已保留。";
  if (e.type === "image") {
    const n = Ys(r);
    if (!n || n.some((o) => o < 1 || o > t.limits.imageMaxDimension) || n[0] * n[1] > t.limits.imageMaxPixels) return "图片文件头或像素尺寸不符合当前服务端限制，请重新选择；原内容已保留。";
  }
  let i;
  try {
    i = JSON.stringify({ message: e });
  } catch {
    return "消息不能安全编码，原记录已保留，请核对后重新发送。";
  }
  return new TextEncoder().encode(i).byteLength > (e.type === "image" ? t.limits.imageMessageBytes : t.limits.messageBytes) ? "消息超过服务端声明的JSON大小上限，内容已保留。" : "";
}
const Ti = he.imageMessageBytes, Ui = he.textChars, ct = (t) => !!t && typeof t == "object" && !Array.isArray(t), Y = (t, e) => typeof t == "string" && t.length <= e;
function gt(t) {
  if (!Y(t, 4096)) return "";
  try {
    const e = new URL(t);
    return ["https:", "http:"].includes(e.protocol) && !e.username && !e.password ? e.href : "";
  } catch {
    return "";
  }
}
function Qt(t) {
  return typeof t != "string" ? "" : t.length <= Ti && /^data:image\/(?:png|jpeg|gif|webp);base64,[A-Za-z0-9+/=\r\n]+$/i.test(t) ? t : gt(t);
}
function Xt(t) {
  if (!Y(t, 4096)) throw new Error("服务器地址过长");
  if (!t.trim()) return "";
  let e;
  try {
    e = new URL(t.trim());
  } catch {
    throw new Error("服务器地址格式不正确");
  }
  const r = e.hostname, i = r === "localhost" || r === "[::1]" || /^(127\.|10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.)/.test(r);
  if (e.protocol !== "wss:" && !(e.protocol === "ws:" && i) || e.username || e.password || e.hash)
    throw new Error("公网服务器须使用 WSS；WS 仅限本机或局域网，地址不能含用户信息或片段");
  return e.href;
}
function Pi(t, e) {
  if (!(!ct(t) || !["bilibili", "github", "music", "aihot", "youtube", "idle"].includes(String(t.type)) || !Y(t.title, 500)))
    return { type: t.type, title: t.title, url: gt(t.url) || void 0, updatedAt: e };
}
function _i(t, e = 0) {
  if (!ct(t) || e > 2) return;
  const r = /* @__PURE__ */ Object.create(null);
  for (const [i, s] of Object.entries(t).slice(0, 64))
    ["__proto__", "constructor", "prototype", "rawSong"].includes(i) || (typeof s == "string" && s.length <= (i === "imageUrl" ? Ti : Ui) ? r[i] = /(?:cover|avatar|face|imageUrl)$/i.test(i) ? Qt(s) : /url$/i.test(i) ? gt(s) : s : typeof s == "boolean" || typeof s == "number" && Number.isFinite(s) ? r[i] = s : i === "seriesItems" && Array.isArray(s) && (r[i] = s.slice(0, 100).map((n) => _i(n, e + 1)).filter(Boolean)));
  return r;
}
function pt(t) {
  return Ri(t, Date.now());
}
function Ri(t, e) {
  if (!ct(t) || !ct(t.sender) || !Y(t.id, 160) || !t.id || !Y(t.sender.uid, 160) || !t.sender.uid || !Y(t.sender.name, 100) || !Y(t.content, Ui) || ![...Mr, "system"].includes(String(t.type)) || typeof t.timestamp != "number" || !Number.isFinite(t.timestamp)) return;
  const r = Qt(t.sender.avatar) || (Y(t.sender.avatar, 32) && !/[:/]/.test(t.sender.avatar) ? t.sender.avatar : "👤");
  return { id: t.id, sender: { uid: t.sender.uid, name: t.sender.name, avatar: r, activity: Pi(t.sender.activity, e) }, type: t.type, content: t.content, timestamp: t.timestamp, meta: _i(t.meta) };
}
function en(t, e) {
  if (!ct(t) || !Y(t.uid, 160) || !t.uid || !Y(t.name, 100)) return;
  const r = Qt(t.avatar) || (Y(t.avatar, 32) && !/[:/]/.test(t.avatar) ? t.avatar : "👤");
  return { uid: t.uid, name: t.name, avatar: r, activity: Pi(t.activity, e) };
}
const lt = Ge(""), Lo = Ge(!1), Vr = Ge(0);
let Xe, Ie = Promise.resolve();
const oe = /* @__PURE__ */ new Map();
function Hr(t, e, r) {
  return JSON.stringify([t, e, r]);
}
function Zt() {
  return Xe || (Xe = new Promise((t, e) => {
    const r = indexedDB.open("lw-chat-history", 2);
    r.onupgradeneeded = () => {
      r.result.objectStoreNames.contains("messages") || r.result.createObjectStore("messages", { keyPath: ["scope", "id"] }).createIndex("timeline", ["scope", "timestamp", "id"], { unique: !0 }), r.result.objectStoreNames.contains("relay-cursors") || r.result.createObjectStore("relay-cursors");
    }, r.onerror = () => e(r.error), r.onblocked = () => {
      lt.value = "历史数据库升级被其他标签页阻塞，请关闭旧标签页后重试";
    }, r.onsuccess = () => {
      const i = r.result;
      i.onversionchange = () => {
        i.close(), Xe = void 0;
      }, t(i);
    };
  }).catch((t) => {
    throw Xe = void 0, t;
  })), Xe;
}
function er(t, e) {
  for (const r of e) {
    const i = pt(r);
    if (!i || i.id === "sys-welcome") continue;
    const s = { scope: t, id: i.id, timestamp: i.timestamp, message: JSON.parse(JSON.stringify(i)) };
    oe.set(JSON.stringify([t, s.id]), s);
  }
  return Vr.value = oe.size, tn();
}
function tn() {
  return Ie = Ie.then(async () => {
    if (!oe.size) return;
    const t = [...oe.entries()];
    try {
      const e = await Zt();
      await new Promise((r, i) => {
        const s = e.transaction("messages", "readwrite");
        s.oncomplete = () => r(), s.onabort = () => i(s.error), s.onerror = () => i(s.error);
        const n = s.objectStore("messages");
        for (const [, o] of t) n.put(o);
      });
      for (const [r, i] of t) oe.get(r) === i && oe.delete(r);
      Vr.value = oe.size, lt.value = "";
    } catch {
      lt.value = "历史未能写入磁盘（空间不足或数据库不可用）。待存消息保留在内存，请先导出备份，勿关闭或刷新。";
    }
  }), Ie;
}
async function rn(t) {
  await Ie;
  const e = await Zt();
  return new Promise((r, i) => {
    const s = e.transaction("relay-cursors", "readonly"), n = s.objectStore("relay-cursors").get(t);
    s.oncomplete = () => r(Number.isSafeInteger(n.result) ? n.result : 0), s.onabort = () => i(s.error), n.onerror = () => i(n.error);
  });
}
function sn(t, e, r) {
  const i = Ie.then(async () => {
    const s = await Zt();
    await new Promise((n, o) => {
      const a = s.transaction(["messages", "relay-cursors"], "readwrite"), c = a.objectStore("messages");
      for (const m of e) c.put({ scope: t, id: m.id, timestamp: m.timestamp, message: JSON.parse(JSON.stringify(m)) });
      const l = a.objectStore("relay-cursors"), d = l.get(t);
      d.onsuccess = () => l.put(Math.max(Number(d.result) || 0, r), t), a.oncomplete = () => n(), a.onabort = () => o(a.error), a.onerror = () => o(a.error);
    });
  });
  return Ie = i.catch(() => {
  }), i;
}
async function Mi(t, e, r = 200) {
  await Ie;
  const i = await Zt();
  return new Promise((s, n) => {
    const o = i.transaction("messages", "readonly"), a = [t, -Number.MAX_VALUE, ""], c = e ? [t, e.timestamp, e.id] : [t, Number.MAX_VALUE, "￿"], l = IDBKeyRange.bound(a, c, !1, !!e), d = o.objectStore("messages").index("timeline").openCursor(l, "prev"), m = [];
    d.onerror = () => n(d.error), o.onabort = () => n(o.error), d.onsuccess = () => {
      const h = d.result;
      if (!h || m.length >= r) {
        s(m.reverse());
        return;
      }
      const g = pt(h.value.message);
      g && m.push(g), h.continue();
    };
  });
}
async function No(t) {
  const e = /* @__PURE__ */ new Map();
  let r;
  for (; ; ) {
    const i = await Mi(t, r, 500);
    for (const s of i) e.set(s.id, s);
    if (i.length < 500) break;
    r = i[0];
  }
  for (const i of oe.values()) i.scope === t && e.set(i.id, i.message);
  return [...e.values()].sort((i, s) => i.timestamp - s.timestamp || i.id.localeCompare(s.id));
}
function Oo(t) {
  return [...oe.values()].filter((e) => e.scope === t).map((e) => e.message);
}
function Vt(t) {
  const e = gt(t);
  return e && e.length <= 1e3 && !/\/noface\.(jpg|png)(?:[?#]|$)/i.test(e) ? e : "";
}
function tr(t, e = "") {
  const r = Vt(t) || Vt(e);
  return r || (t && t.length <= 8 && !/[:/]/.test(t) ? t : "🦫");
}
const rr = "lw_chat_server_url", Li = "lw_chat_user_id", ir = "lw_chat_user_name", sr = "lw_chat_user_avatar", ie = "lw_chat_groups", Ni = "lw_chat_current_group", nn = "lw_chat_rooms", on = "lw_chat_friends", Oi = "lw_chat_friend_requests_v1", xt = "lw_chat_current_room", xi = "";
function re(t, e) {
  try {
    if (typeof localStorage < "u") {
      const r = localStorage.getItem(t);
      if (t === rr && r && localStorage.getItem("lw_chat_server_explicit") !== "true" && (r.includes("sslip.io") || r.includes("your-domain.com")))
        return localStorage.removeItem(t), e;
      if (r !== null) return r;
    }
  } catch {
  }
  return e;
}
function M(t, e) {
  try {
    typeof localStorage < "u" && localStorage.setItem(t, e);
  } catch {
  }
}
function st(t, e) {
  try {
    if (typeof localStorage < "u") {
      const r = localStorage.getItem(t);
      if (r) return JSON.parse(r);
    }
  } catch {
  }
  return e;
}
const an = [
  {
    id: "hub_main",
    name: "公共自习室",
    icon: "🏠",
    channels: [
      { id: "general", name: "综合闲聊", icon: "💬" },
      { id: "music", name: "音乐分享", icon: "🎵" },
      { id: "bili", name: "B站放映厅", icon: "📺" },
      { id: "dev", name: "开源与代码", icon: "🐙" }
    ]
  },
  {
    id: "hub_gaming",
    name: "宿舍开黑组",
    icon: "🎮",
    channels: [
      { id: "general", name: "开黑集合", icon: "💬" },
      { id: "music", name: "战歌分享", icon: "🎵" },
      { id: "meme", name: "搞笑动态", icon: "⚡" }
    ]
  }
], cn = [
  { id: "main", name: "自习室大厅", icon: "🏠" },
  { id: "dev", name: "代码与摸鱼", icon: "💻" },
  { id: "music", name: "音乐咖啡馆", icon: "🎵" }
];
function ln() {
  const t = ["摸鱼", "冲浪", "喝茶", "听歌", "看番", "敲代码", "发呆", "漫游"], e = ["海狸", "企鹅", "猫猫", "柴犬", "仓鼠", "水獭", "考拉", "熊猫"], r = t[Math.floor(Math.random() * t.length)], i = e[Math.floor(Math.random() * e.length)], s = Math.floor(1e3 + Math.random() * 9e3);
  return `${r}的${i}#${s}`;
}
function un() {
  const t = ["🦫", "🐧", "🐱", "🐶", "🐹", "🦦", "🐨", "🐼", "🦊", "🐰"];
  return t[Math.floor(Math.random() * t.length)];
}
const Bi = re(Li, ""), Gr = Bi || `u_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`;
Bi || M(Li, Gr);
const Ht = re(ir, ""), dn = !Ht || Ht.includes("#"), ni = X.userName && X.userName !== "哔哩哔哩用户" && X.userName !== "浏览器指纹与环境" ? X.userName : "", $i = dn && ni ? ni : Ht || ln();
Ht || M(ir, $i);
const De = re(sr, ""), hn = !De || De.length <= 4 || De.startsWith("data:") || De.includes("/noface."), oi = Vt(X.avatarUrl), Di = hn && oi ? oi : De || un();
De || M(sr, Di);
const u = F({
  visible: !1,
  shareActivity: re("lw_chat_share_activity", "true") !== "false",
  error: "",
  connected: !1,
  connecting: !1,
  onlineCount: 1,
  serverUrl: re(rr, xi),
  currentGroupId: re(Ni, "hub_main"),
  currentChannelId: "general",
  groups: st(ie, an),
  groupMembers: [],
  currentRoomId: re(xt, "main"),
  rooms: st(nn, cn),
  friends: st(on, []),
  friendRequests: st(Oi, []),
  currentUser: {
    uid: Gr,
    name: $i,
    avatar: Di
  },
  messages: ut(re(xt, "main")).length > 0 ? ut(re(xt, "main")) : [
    {
      id: "sys-welcome",
      sender: { uid: "system", name: "系统通知", avatar: "🤖" },
      type: "system",
      content: "欢迎来到聊天室！这里是大家的专属自习室与分享空间，点击顶部「🔗 邀请好友进房间」即可拉同学一起连线～",
      timestamp: Date.now() - 6e4
    }
  ],
  unreadCount: 0,
  showProfileEdit: !1,
  transportMode: "relay",
  p2pPeers: [],
  userActivities: {}
});
gn();
qe(
  () => [X.avatarUrl, X.userName],
  ([t, e]) => {
    const r = u.currentUser.avatar;
    Vt(t) && (!r || r.length <= 4 || r.startsWith("data:") || r.includes("/noface.") || /^https?:\/\/[^/]*hdslb\.com\//i.test(r)) && (u.currentUser.avatar = t, M(sr, t)), e && e !== "哔哩哔哩用户" && e !== "浏览器指纹与环境" && (!u.currentUser.name || u.currentUser.name.includes("#") || u.currentUser.name.startsWith("摸鱼")) && (u.currentUser.name = e, M(ir, e));
  },
  { immediate: !0 }
);
const ai = F({ scope: "", ready: !1 });
let _t = 0;
qe(
  () => Hr(u.currentUser.uid, u.serverUrl, u.currentRoomId),
  async (t) => {
    const e = ++_t;
    Object.assign(ai, { scope: t, ready: !1 });
    const { currentRoomId: r, serverUrl: i, currentUser: s } = u, n = ut(r, i, s.uid);
    await er(t, n);
    try {
      const o = await Mi(t);
      if (e !== _t) return;
      const a = new Map(o.map((c) => [c.id, c]));
      for (const c of u.messages) c.id !== "sys-welcome" && a.set(c.id, c);
      u.messages = [...a.values()].sort((c, l) => c.timestamp - l.timestamp || c.id.localeCompare(l.id)).slice(-200);
    } catch {
      e === _t && (lt.value = "无法读取历史数据库，现有缓存未删除，请导出备份后检查浏览器存储。");
    } finally {
      e === _t && (ai.ready = !0);
    }
  },
  { immediate: !0 }
);
function xo(t, e) {
  u.currentUser.name = t.trim() || u.currentUser.name, u.currentUser.avatar = e.trim() || u.currentUser.avatar, M(ir, u.currentUser.name), M(sr, u.currentUser.avatar);
}
function fn(t, e, r) {
  return "lw_chat_history_v2_" + JSON.stringify([r, e, t]);
}
function ut(t, e = re(rr, xi), r = Gr) {
  try {
    const i = localStorage.getItem(fn(t, e, r));
    if (i) {
      const s = JSON.parse(i);
      if (Array.isArray(s)) return s.map(pt).filter((n) => !!n).slice(-200);
    }
  } catch {
  }
  return [];
}
function mn(t, e) {
  const r = Hr(u.currentUser.uid, u.serverUrl, t);
  er(r, e);
}
function Fi(t, e) {
  if (!t) return "";
  const r = new URL(Xt(t));
  return r.searchParams.set("room", e), r.href;
}
function Nr(t, e = !0, r = !1) {
  if (e && lt.value && Vr.value > 0)
    return u.error = "仍有未保存消息，请先重试保存或导出备份，暂不切换房间", !1;
  try {
    t.endpoint = Xt(t.endpoint), localStorage.setItem("lw_chat_session_v1", JSON.stringify(t));
  } catch {
    return u.error = "会话保存失败或地址无效，未切换房间", !1;
  }
  const i = t.endpoint !== u.serverUrl || t.roomId !== u.currentRoomId;
  return i && e && mn(u.currentRoomId, u.messages), Object.assign(u, {
    currentGroupId: t.groupId,
    currentChannelId: t.channelId,
    currentRoomId: t.roomId,
    serverUrl: t.endpoint
  }), i && (u.messages = ut(t.roomId, t.endpoint, u.currentUser.uid), u.userActivities = {}, u.unreadCount = 0, r || (u.connected = !1, u.connecting = !1), u.onlineCount = 0), M(rr, t.endpoint), M(xt, t.roomId), M(Ni, t.groupId), !0;
}
function yt(t, e = "local", r = !1) {
  let i, s = e;
  try {
    if (i = Xt(t), i) {
      const a = new URL(i);
      if (s = a.searchParams.get("room") || "default", !s || s.length > 160) throw new Error();
      a.searchParams.set("room", s), i = a.href;
    }
  } catch {
    return u.error = "房间地址无效，未切换会话", !1;
  }
  for (const a of u.groups)
    for (const c of a.channels)
      if ((c.endpoint ?? Fi(a.endpoint ?? "", `${a.id}__${c.id}`)) === i && (i || c.id === s))
        return Nr({ groupId: a.id, channelId: c.id, roomId: s, endpoint: i }, !0, r);
  const n = "joined_" + crypto.randomUUID(), o = {
    id: n,
    name: i ? "受邀房间" : "本地房间",
    icon: "💬",
    endpoint: i,
    isCustom: !0,
    channels: [{ id: s, name: s, icon: "💬", endpoint: i }]
  };
  return u.groups.push(o), Nr({ groupId: n, channelId: s, roomId: s, endpoint: i }, !0, r) ? (M(ie, JSON.stringify(u.groups)), !0) : (u.groups.pop(), !1);
}
function gn() {
  for (const e of u.groups) e.endpoint ??= u.serverUrl;
  const t = st("lw_chat_session_v1", null);
  if (t && typeof t.endpoint == "string" && typeof t.roomId == "string") {
    const e = u.groups.find((i) => i.id === t.groupId), r = e?.channels.find((i) => i.id === t.channelId);
    if (e && r)
      try {
        const i = Xt(t.endpoint), s = i ? new URL(i).searchParams.get("room") || "default" : t.roomId;
        r.endpoint = i, Object.assign(u, {
          currentGroupId: e.id,
          currentChannelId: r.id,
          currentRoomId: s,
          serverUrl: i,
          messages: ut(s, i, u.currentUser.uid)
        }), M(ie, JSON.stringify(u.groups));
        return;
      } catch {
      }
  }
  yt(u.serverUrl, u.currentRoomId), M(ie, JSON.stringify(u.groups));
}
function Bo(t) {
  u.friendRequests = u.friendRequests.filter((e) => e.id !== t), M(Oi, JSON.stringify(u.friendRequests));
}
function nr(t, e) {
  const r = u.groups.find((o) => o.id === t), i = r?.channels.find((o) => o.id === e) || r?.channels[0];
  if (!r || !i) return !1;
  const s = i.endpoint !== void 0 ? i.endpoint ? new URL(i.endpoint).searchParams.get("room") || "default" : i.id : `${r.id}__${i.id}`, n = i.endpoint ?? Fi(r.endpoint ?? "", s);
  return Nr({ groupId: r.id, channelId: i.id, roomId: s, endpoint: n });
}
function $o(t, e = "👥") {
  const r = t.trim() || "新群组", i = "group_" + Math.random().toString(36).slice(2, 8), s = {
    id: i,
    name: r,
    icon: e,
    channels: [
      { id: "general", name: "综合讨论", icon: "💬" },
      { id: "music", name: "音乐分享", icon: "🎵" },
      { id: "bili", name: "B站动态", icon: "📺" }
    ],
    endpoint: u.serverUrl,
    isCustom: !0
  };
  return u.groups.push(s), M(ie, JSON.stringify(u.groups)), nr(i, "general"), s;
}
function Do(t) {
  if (u.groups.length <= 1) return;
  const e = u.groups.filter((r) => r.id !== t);
  if (u.currentGroupId === t) {
    const r = e[0];
    if (!r || !nr(r.id, r.channels[0]?.id || "general")) return;
  }
  u.groups = e, M(ie, JSON.stringify(u.groups));
}
function Fo(t, e = "💬") {
  const r = u.groups.find((s) => s.id === u.currentGroupId);
  if (!r) return;
  const i = "ch_" + Math.random().toString(36).slice(2, 6);
  r.channels.push({ id: i, name: t.trim() || "新频道", icon: e }), M(ie, JSON.stringify(u.groups)), nr(r.id, i);
}
function qo(t, e, r) {
  const i = u.groups.find((s) => s.id === t);
  i && (i.name = e.trim() || i.name, r && (i.icon = r), M(ie, JSON.stringify(u.groups)));
}
function jo(t, e, r, i) {
  const s = u.groups.find((o) => o.id === t);
  if (!s) return;
  const n = s.channels.find((o) => o.id === e);
  n && (n.name = r.trim() || n.name, i && (n.icon = i), M(ie, JSON.stringify(u.groups)));
}
function Vo(t, e) {
  const r = u.groups.find((s) => s.id === t);
  if (!r || r.channels.length <= 1) return;
  const i = r.channels.filter((s) => s.id !== e);
  u.currentGroupId === t && u.currentChannelId === e && (!i[0] || !nr(t, i[0].id)) || (r.channels = i, M(ie, JSON.stringify(u.groups)));
}
const T = (t) => JSON.stringify([t.origin, t.room, t.uid]);
function dt(t) {
  return typeof t == "string" && /^[A-Za-z0-9_-]{43}$/.test(t);
}
function wt(t) {
  try {
    if (!t || typeof t != "object") throw new Error();
    const e = t;
    if (typeof e.origin != "string" || typeof e.room != "string" || typeof e.uid != "string") throw new Error();
    const r = new URL(e.origin);
    if (!["http:", "https:"].includes(r.protocol) || r.username || r.password || r.pathname !== "/" || r.search || r.hash || !/^[A-Za-z0-9_-]{1,160}$/.test(e.room) || !/^[A-Za-z0-9_-]{1,160}$/.test(e.uid)) throw new Error();
    if (r.protocol === "http:" && !["localhost", "127.0.0.1", "[::1]"].includes(r.hostname)) throw new Error();
    return { origin: r.origin, room: e.room, uid: e.uid };
  } catch {
    throw new Error("聊天室配置无效：公网必须使用 HTTPS；HTTP 仅允许 localhost、127.0.0.1 或 ::1");
  }
}
const zr = "lw_private_chat_v1", w = F({ room: null, diagnostic: "" });
function Wr() {
  let t = null, e = "";
  try {
    const r = localStorage.getItem(zr);
    if (r === null) e = "当前浏览器配置中没有保存聊天室连接。请确认使用的是原来的浏览器用户和插件，或重新导入自己的邀请。";
    else
      try {
        t = wt(JSON.parse(r));
      } catch {
        e = "已保存的聊天室配置无效或使用了公网 HTTP，原记录和凭证未删除。请先配置 HTTPS，再按部署指南重新导入匹配当前聊天 ID 的邀请。";
      }
  } catch {
    e = "无法读取本机存储，请检查浏览器是否限制存储访问。";
  }
  w.diagnostic = e, JSON.stringify(t) !== JSON.stringify(w.room) && (w.room = t);
}
Wr();
window.addEventListener("storage", (t) => {
  (t.key === zr || t.key === null) && Wr();
});
window.addEventListener("focus", Wr);
const pn = jr(() => !!w.room);
function qi(t) {
  return t.origin.replace(/^http:/, "ws:").replace(/^https:/, "wss:") + "/ws?room=" + encodeURIComponent(t.room);
}
function yn(t) {
  const e = wt(t);
  localStorage.setItem(zr, JSON.stringify(e)), w.diagnostic = "", w.room = e;
}
const Kr = Ge(0), j = Ge(""), Jr = /* @__PURE__ */ new Map();
let kr;
function We() {
  return kr ||= new Promise((t, e) => {
    const r = indexedDB.open("lw-chat-delivery", 1);
    r.onupgradeneeded = () => {
      r.result.createObjectStore("deliveries", { keyPath: ["scope", "id", "uid"] }).createIndex("scope", "scope");
    }, r.onsuccess = () => {
      r.result.onversionchange = () => {
        r.result.close(), kr = void 0;
      }, t(r.result);
    }, r.onerror = () => e(r.error), r.onblocked = () => {
      j.value = "发送队列被旧窗口阻塞，请关闭旧窗口后重试。";
    };
  }).catch((t) => {
    throw kr = void 0, t;
  });
}
async function wn(t) {
  const e = await We();
  return new Promise((r, i) => {
    const s = e.transaction("deliveries", "readonly"), n = s.objectStore("deliveries").index("scope").getAll(t);
    s.oncomplete = () => r(n.result), s.onabort = () => i(s.error), n.onerror = () => i(n.error);
  });
}
let ci = Promise.resolve();
function bt(t) {
  const e = ci.then(t);
  return ci = e.catch(() => {
  }), e;
}
async function Ke(t) {
  try {
    const e = /* @__PURE__ */ new Map();
    for (const r of await wn(t)) {
      const i = e.get(r.id) || [];
      i.push(r), e.set(r.id, i);
    }
    Jr.set(t, e), Kr.value++;
  } catch {
    j.value = "无法读取发送确认记录，请检查浏览器存储。";
  }
}
function bn(t, e) {
  Kr.value;
  const r = Jr.get(t)?.get(e) || [];
  if (!r.length) return "none";
  const i = r.filter((s) => !s.received);
  return i.length ? i.some((s) => s.failure === "rejected" || s.failure === "paused" || s.attempts >= 5 && (s.failure === "unconfirmed" || Date.now() - s.lastAttempt > 15e3)) ? "failed" : "sending" : "stored";
}
function Ho(t, e) {
  Kr.value;
  const r = Jr.get(t)?.get(e) || [];
  if (!r.length) return "无送达确认";
  const i = r.filter((n) => n.received).length;
  return i === r.length ? r.every((n) => n.uid === "private-relay-server") ? "服务器已保存（不代表对方已读）" : `对方已接收 ${i}/${r.length}（非已读）` : r.filter((n) => !n.received).some((n) => n.failure === "rejected") ? "服务器拒绝此次发送，可在消息详情中重试；不代表此前尝试一定未保存" : bn(t, e) === "failed" ? "尚未获得保存确认，自动补发已暂停；不代表一定未送达，可在消息详情中重试" : "正在发送／等待保存确认，将按原目标房间补发；请勿重复发送";
}
async function ji(t, e, r) {
  await bt(async () => {
    const i = await We();
    await new Promise((s, n) => {
      const o = i.transaction("deliveries", "readwrite"), a = o.objectStore("deliveries");
      for (const c of new Set(r)) {
        const l = a.get([t, e.id, c]);
        l.onsuccess = () => {
          if (l.result?.received) return;
          const d = { scope: t, id: e.id, uid: c, message: JSON.parse(JSON.stringify(e)), attempts: 0, lastAttempt: 0, received: !1 };
          a.put(d);
        };
      }
      o.oncomplete = () => s(), o.onabort = () => n(o.error), o.onerror = () => n(o.error);
    }), await Ke(t);
  });
}
async function Go(t, e) {
  try {
    await bt(async () => {
      const r = await We();
      await new Promise((i, s) => {
        const n = r.transaction("deliveries", "readwrite"), o = n.objectStore("deliveries").index("scope").openCursor(t);
        o.onsuccess = () => {
          const a = o.result;
          if (!a) return;
          const c = a.value;
          c.id === e && !c.received && a.update({ ...c, attempts: 5, failure: "paused" }), a.continue();
        }, n.oncomplete = () => i(), n.onabort = () => s(n.error), n.onerror = () => s(n.error);
      }), await Ke(t);
    });
  } catch {
    j.value = "暂停补发未能保存，请检查存储；已发出的消息无法撤回。";
  }
}
async function Sn(t, e, r) {
  return Vi(t, [e], r);
}
async function Vi(t, e, r) {
  e.length && await bt(async () => {
    const i = await We();
    await new Promise((s, n) => {
      const o = i.transaction("deliveries", "readwrite"), a = o.objectStore("deliveries");
      for (const c of new Set(e)) {
        const l = a.get([t, c, r]);
        l.onsuccess = () => {
          l.result && a.put({ ...l.result, received: !0, failure: void 0, message: void 0 });
        };
      }
      o.oncomplete = () => s(), o.onabort = () => n(o.error), o.onerror = () => n(o.error);
    }), await Ke(t);
  });
}
async function li(t, e, r, i = !1, s, n = !1) {
  await bt(async () => {
    const o = await We();
    await new Promise((a, c) => {
      const l = o.transaction("deliveries", "readwrite"), d = l.objectStore("deliveries"), m = d.get([t, e, r]);
      m.onsuccess = () => {
        const h = m.result;
        h && !h.received && (s === void 0 || h.lastAttempt === s) && d.put({
          ...h,
          attempts: i || n ? 5 : h.attempts,
          failure: n ? "paused" : i ? "rejected" : h.failure === "paused" ? "paused" : "unconfirmed"
        });
      }, l.oncomplete = () => a(), l.onerror = l.onabort = () => c(l.error);
    }), await Ke(t);
  });
}
async function vn(t, e, r, i, s = 4, n = () => !0) {
  await bt(async () => {
    const o = await We(), a = [];
    await new Promise((c, l) => {
      const d = o.transaction("deliveries", "readwrite"), m = d.objectStore("deliveries").index("scope").openCursor(t);
      m.onsuccess = () => {
        const h = m.result;
        if (!h || a.length >= s || !r()) return;
        const g = h.value;
        if (!g.received && g.message && g.attempts < 5 && Date.now() - g.lastAttempt >= 1e4 && e.includes(g.uid)) {
          if (!n(g.message)) {
            h.update({ ...g, attempts: 5, failure: "paused" }), h.continue();
            return;
          }
          const k = { ...g, attempts: g.attempts + 1, lastAttempt: Date.now(), failure: void 0 };
          h.update(k), a.push(k);
        }
        h.continue();
      }, d.oncomplete = () => c(), d.onabort = () => l(d.error), d.onerror = () => l(d.error);
    });
    for (const c of a) r() && i(c.uid, c.message, c.lastAttempt);
    await Ke(t);
  });
}
function kn() {
  if (Je.isOpen && Je.title)
    return {
      type: "bilibili",
      title: Je.title,
      url: Je.bvid ? `https://www.bilibili.com/video/${Je.bvid}` : void 0,
      updatedAt: Date.now()
    };
  if (f.playing && f.title)
    return {
      type: "music",
      title: `${f.title} - ${f.artist || "未知歌手"}`,
      updatedAt: Date.now()
    };
  const t = Z.activeId;
  if (t === "card-github")
    return { type: "github", title: "GitHub 热门开源仓库", updatedAt: Date.now() };
  if (t === "daily-bilibili")
    return { type: "bilibili", title: "Bilibili 视频工作区", updatedAt: Date.now() };
  if (t === "daily-aihot")
    return { type: "aihot", title: "AI HOT 热门前沿资讯", updatedAt: Date.now() };
  if (t === "todoist")
    return { type: "idle", title: "Todoist 待办任务清单", updatedAt: Date.now() };
}
function Cn(t) {
  switch (t.type) {
    case "music": {
      const e = t.meta?.musicTitle || "未知曲目", r = t.meta?.musicArtist ? ` - ${t.meta.musicArtist}` : "";
      return `🎵 音乐分享: 《${e}》${r}`;
    }
    case "bilibili":
      return `📺 B站视频: ${t.meta?.videoTitle || "视频分享"}`;
    case "bili_series":
      return `📻 B站电台: ${t.meta?.seriesName || "系列分享"}`;
    case "github":
      return `🐙 GitHub仓库: ${t.meta?.repoOwner && t.meta?.repoName ? `${t.meta.repoOwner}/${t.meta.repoName}` : t.meta?.repoName || "GitHub仓库"}`;
    case "aihot":
      return `🔥 AI资讯: ${t.meta?.aihotTitle || "资讯分享"}`;
    case "youtube":
      return `▶️ YouTube: ${t.meta?.youtubeTitle || "视频分享"}`;
    case "image":
      return "🖼️ [图片]";
    case "website":
      return `🔗 网页分享: ${t.meta?.linkTitle || t.meta?.linkUrl || "网页"}`;
    case "music_party":
      return `🎧 一起听: 《${t.meta?.partyTitle || "音乐派对"}》`;
    case "server_invite":
      return `🏠 邀请加入: ${t.meta?.inviteServerName || t.meta?.inviteRoom || "聊天室"}`;
    default:
      return t.content || "收到一条新消息";
  }
}
function En(t, e) {
  if (u.visible) return;
  const r = e || S.channel || "main", i = S.rooms.find((o) => o.id === r), s = i?.name ? `#${i.name}` : void 0;
  let n = "assets/icon-48.png";
  if (t.sender?.avatar && /^https?:\/\//i.test(t.sender.avatar)) {
    const o = Qt(t.sender.avatar);
    o && (n = o);
  }
  ne.show({
    id: `chat_msg_${t.id}`,
    appType: "chat",
    appName: "海狸聊天室",
    icon: n,
    title: t.sender?.name || "新消息",
    subtitle: s,
    message: Cn(t),
    duration: 6500,
    level: "info",
    history: !0,
    target: { type: "module", moduleId: "chat" },
    actionLabel: "查看消息",
    onClick: () => {
      Wt.handleToolClick("chat");
    }
  });
}
class He extends Error {
  constructor(e) {
    super(`服务器响应 ${e}`), this.status = e, this.name = "PrivateChatHttpError";
  }
}
class Ae extends Error {
  constructor() {
    super(...arguments), this.name = "ChatCapabilityError";
  }
}
function Hi(t, e, r) {
  return new Promise((i, s) => {
    const n = new AbortController(), o = () => n.abort(new DOMException("聊天室操作已停止等待", "AbortError")), a = () => {
      clearTimeout(l), r?.removeEventListener("abort", o), n.signal.removeEventListener("abort", c);
    }, c = () => {
      a(), s(n.signal.reason);
    }, l = setTimeout(() => n.abort(new DOMException("聊天室操作超时，结果可能尚未确认", "TimeoutError")), t);
    if (n.signal.addEventListener("abort", c, { once: !0 }), r?.addEventListener("abort", o, { once: !0 }), r?.aborted) {
      o();
      return;
    }
    Promise.resolve().then(() => (n.signal.throwIfAborted(), e(n.signal))).then(
      (d) => {
        a(), n.signal.aborted ? s(n.signal.reason) : i(d);
      },
      (d) => {
        a(), s(d);
      }
    );
  });
}
class W extends Error {
  constructor(e) {
    super({
      blocked: "凭证数据库被旧标签页阻塞，请关闭旧页后重试",
      storage: "无法读写聊天室凭证，请检查浏览器存储",
      timeout: "凭证存储超时，结果可能尚未确认，请勿重复导入",
      invalid: "凭证格式无效，请重新导入邀请",
      missing: "凭证不存在，请重新导入邀请"
    }[e]), this.code = e, this.name = "PrivateChatCredentialError";
  }
}
class In {
  constructor(e = () => {
  }) {
    this.onBlocked = e;
  }
  open() {
    if (this.database) return this.database;
    const e = new Promise((r, i) => {
      let s = !1;
      const n = (a) => {
        s || (s = !0, clearTimeout(o), i(a));
      }, o = setTimeout(() => n(new W("timeout")), 8e3);
      try {
        const a = indexedDB.open("lw-private-chat-credentials", 1);
        a.onupgradeneeded = () => {
          if (s) {
            a.transaction?.abort();
            return;
          }
          a.result.createObjectStore("credentials");
        }, a.onsuccess = () => {
          const c = a.result;
          if (s) {
            c.close();
            return;
          }
          s = !0, clearTimeout(o), c.onversionchange = () => {
            c.close(), this.database === e && (this.database = void 0);
          }, r(c);
        }, a.onerror = () => n(new W("storage")), a.onblocked = () => {
          if (!s) {
            n(new W("blocked"));
            try {
              this.onBlocked();
            } catch {
            }
          }
        };
      } catch {
        n(new W("storage"));
      }
    });
    return this.database = e, e.catch(() => {
      this.database === e && (this.database = void 0);
    }), e;
  }
  read(e, r) {
    return this.access(e, void 0, r);
  }
  async write(e, r) {
    if (!dt(r)) throw new W("invalid");
    await this.access(e, r);
  }
  access(e, r, i) {
    const s = T(e);
    return Hi(8e3, async (n) => {
      try {
        const o = await this.open();
        return n.throwIfAborted(), await new Promise((a, c) => {
          const l = o.transaction("credentials", r === void 0 ? "readonly" : "readwrite"), d = l.objectStore("credentials"), m = r === void 0 ? d.get(s) : d.put(r, s), h = () => {
            try {
              l.abort();
            } catch {
            }
          }, g = () => n.removeEventListener("abort", h);
          r === void 0 && n.addEventListener("abort", h, { once: !0 }), l.oncomplete = () => {
            g();
            const k = r === void 0 ? m.result : r;
            k === void 0 || k === "" ? c(new W("missing")) : dt(k) ? a(k) : c(new W("invalid"));
          }, l.onabort = l.onerror = m.onerror = () => {
            g(), c(new W("storage"));
          };
        });
      } catch (o) {
        throw n.aborted ? n.reason : o instanceof W ? o : new W("storage");
      }
    }, i);
  }
}
class be extends Error {
  constructor() {
    super(...arguments), this.name = "PrivateChatTransportError";
  }
}
class An {
  constructor(e) {
    this.ports = e;
  }
  async request(e) {
    let r, i;
    try {
      if (r = Object.freeze({ ...wt(e.destination), channel: e.destination.channel }), i = new URL(e.path, r.origin), !e.path.startsWith("/api/v1/") || e.path.includes("\\") || i.origin !== r.origin || i.hash || i.username || i.password || !i.pathname.startsWith("/api/v1/")) throw new Error();
    } catch {
      throw new be("聊天室请求目标无效");
    }
    const s = Object.freeze({ ...e, destination: r, path: i.pathname, method: (e.method || "GET").toUpperCase() });
    return i.searchParams.set("room", r.room), i.searchParams.delete("channel"), r.channel && r.channel !== "main" && i.searchParams.set("channel", r.channel), Hi(s.signal ? 3e4 : 15e3, async (n) => {
      try {
        const o = await this.ports.credential(r, n);
        if (n.throwIfAborted(), !dt(o)) throw new W("invalid");
        this.ports.beforeSend(s);
        let a;
        try {
          a = s.body === void 0 ? void 0 : JSON.stringify(s.body);
        } catch {
          throw new be("聊天室请求内容格式无效");
        }
        const c = await fetch(i, {
          method: s.method,
          signal: n,
          body: a,
          headers: { Authorization: `Bearer ${o}`, "Content-Type": "application/json" },
          redirect: "error",
          credentials: "omit",
          cache: "no-store",
          referrerPolicy: "no-referrer"
        }), l = () => {
          c.body?.cancel().catch(() => {
          });
        };
        if (n.aborted && (l(), n.throwIfAborted()), !c.ok)
          throw l(), new He(c.status);
        const d = c.body?.getReader();
        if (!d) throw new be("聊天室返回空响应");
        const m = () => {
          d.cancel().catch(() => {
          });
        };
        n.addEventListener("abort", m, { once: !0 });
        let h = 0, g = "";
        const k = new TextDecoder();
        try {
          for (; ; ) {
            const b = await d.read();
            if (n.throwIfAborted(), b.done) break;
            if (h += b.value.byteLength, h > 2 * 1024 * 1024)
              throw m(), new be("聊天室响应超限");
            g += k.decode(b.value, { stream: !0 });
          }
          try {
            return JSON.parse(g + k.decode());
          } catch {
            throw new be("聊天室响应格式无效");
          }
        } finally {
          n.removeEventListener("abort", m);
          try {
            d.releaseLock();
          } catch {
          }
        }
      } catch (o) {
        throw n.aborted ? n.reason : o instanceof He || o instanceof Ae || o instanceof W || o instanceof be ? o : new be("聊天室请求失败，请检查网络或服务配置");
      }
    }, s.signal);
  }
}
class Tn {
  constructor(e) {
    this.ports = e, this.generation = 0, this.halted = !0, this.liveGeneration = -1, this.reads = new ps();
  }
  get stopped() {
    return this.halted;
  }
  cancel() {
    this.invalidate();
  }
  invalidate() {
    const e = ++this.generation;
    return this.halted = !0, clearTimeout(this.timer), this.timer = void 0, this.reads.cancel(), e === this.generation && this.halted && this.ports.idle(), e;
  }
  start(e) {
    const r = Object.freeze({ ...e }), i = this.invalidate();
    i !== this.generation || !this.ports.active(r) || (this.halted = !1, this.ports.started(), this.tick(r, i, 0));
  }
  owns(e, r) {
    return this.generation === r && !this.halted && this.ports.active(e);
  }
  schedule(e, r, i) {
    clearTimeout(this.timer), this.timer = setTimeout(() => {
      this.timer = void 0, i === this.generation && e();
    }, r);
  }
  async tick(e, r, i) {
    if (!this.owns(e, r)) return;
    if (this.running) {
      this.schedule(() => {
        this.tick(e, r, i);
      }, 250, r);
      return;
    }
    const s = /* @__PURE__ */ Symbol("chat-sync");
    this.running = s;
    const n = this.ports.visible(), o = this.reads.begin({ timeoutMs: n ? 25e3 : 2e4, isCurrent: () => this.owns(e, r) });
    let a = n ? 2500 : 1e4, c = "读取本地历史";
    const l = {
      signal: o.signal,
      current: o.current,
      wait: o.wait,
      visible: n,
      phase: (d) => {
        c = d;
      },
      restoring: () => this.liveGeneration !== r,
      caughtUp: () => {
        o.current() && (this.liveGeneration = r);
      }
    };
    try {
      this.ports.started();
      const d = await o.wait(() => this.ports.poll(e, l));
      if (!o.current()) return;
      i = 0, d?.hasMore && (a = 250);
    } catch (d) {
      if (!this.owns(e, r)) return;
      const m = this.ports.classify(d, e);
      m === "retry" ? (++i, a = Math.min(6e4, 1500 * 2 ** Math.min(i, 4))) : this.halted = !0, this.ports.failed(m, c, i), m === "missing-room" && r === this.generation && this.halted && this.schedule(() => this.ports.restart(), 0, r);
    } finally {
      o.finish(), this.running === s && (this.running = void 0), r === this.generation && (this.ports.active(e) || (this.halted = !0), this.ports.idle()), this.owns(e, r) && this.schedule(() => {
        this.tick(e, r, i);
      }, a, r);
    }
  }
}
const ce = (t) => !!t && typeof t == "object" && !Array.isArray(t), fe = (t) => typeof t == "string" && /^[A-Za-z0-9_-]{1,160}$/.test(t), ot = (t) => t == null, ht = (t) => typeof t == "number" && Number.isFinite(t) && t >= 0;
function q() {
  throw new Error("同步页格式无效，未提交本页记录或推进游标");
}
function or(t) {
  if (!Array.isArray(t) || t.length > 32) throw new Error("房间列表格式无效");
  return t.map((e) => {
    if (!ce(e) || !fe(e.id) || typeof e.name != "string" || e.name.length > 80 || typeof e.icon != "string" || e.icon.length > 8 || typeof e.description != "string" || e.description.length > 500) throw new Error("房间格式无效");
    if (e.space !== void 0 && !fe(e.space)) throw new Error("空间格式无效");
    return { id: e.id, name: e.name, icon: e.icon, description: e.description, space: typeof e.space == "string" ? e.space : "hub_main" };
  });
}
function ar(t) {
  if (!Array.isArray(t) || t.length > 16) throw new Error("空间列表格式无效");
  return t.map((e) => {
    if (!ce(e) || !fe(e.id) || typeof e.name != "string" || e.name.length > 80 || typeof e.icon != "string" || e.icon.length > 8) throw new Error("空间格式无效");
    return { id: e.id, name: e.name, icon: e.icon };
  });
}
function Gi(t, e) {
  if (typeof t.name != "string" || t.name.length > 200) return;
  const r = en({ ...t, name: t.name.slice(0, 100) }, e);
  return r && { ...r, name: t.name };
}
function Un(t, e) {
  return ot(t) ? [] : ((!Array.isArray(t) || t.length > 65) && q(), t.map((r) => {
    (!ce(r) || !fe(r.uid) || r.role !== void 0 && r.role !== "owner" && r.role !== "member") && q();
    const i = Gi(r, e);
    return i || q(), i.activity && ce(r.activity) && ht(r.activity.updatedAt) && (i.activity.updatedAt = r.activity.updatedAt), {
      ...i,
      role: r.role === "owner" ? "owner" : "member",
      online: typeof r.online == "boolean" ? r.online : void 0,
      lastSeen: ht(r.lastSeen) ? r.lastSeen : void 0
    };
  }));
}
function Pn(t, e, r) {
  if (!ot(t))
    return (!Array.isArray(t) || t.length > 200) && q(), t.map((i) => {
      (!ce(i) || !fe(i.id) || !fe(i.toUid) || !ce(i.from) || !fe(i.from.uid)) && q();
      const s = Gi(i.from, r);
      return (!s || s.uid !== e && i.toUid !== e || !["pending", "accepted", "rejected"].includes(String(i.status))) && q(), i.createdAt !== void 0 && !ht(i.createdAt) && q(), {
        id: i.id,
        from: s,
        toUid: i.toUid,
        status: i.status,
        createdAt: ht(i.createdAt) ? i.createdAt : r,
        note: typeof i.note == "string" && i.note.length <= 200 ? i.note : void 0
      };
    });
}
function _n(t, e, r, i) {
  (!Number.isSafeInteger(r) || r < 0 || !ht(i) || !ce(t) || !ce(t.identity) || t.identity.uid !== e || t.identity.role !== "owner" && t.identity.role !== "member" || !Array.isArray(t.messages) || t.messages.length > 50) && q();
  let s = r;
  const n = [], o = [];
  for (const l of t.messages) {
    (!ce(l) || !Number.isSafeInteger(l.seq) || l.seq <= s) && q();
    const d = Ri(l.message, i);
    d || q(), n.push(d), o.push(l.seq), s = l.seq;
  }
  t.hasMore !== void 0 && typeof t.hasMore != "boolean" && q();
  const a = t.hasMore === !0;
  a && !n.length && q();
  let c;
  return ot(t.friends) || ((!Array.isArray(t.friends) || t.friends.length > 4096 || !t.friends.every(fe)) && q(), c = [...new Set(t.friends)]), Object.freeze({
    uid: e,
    role: t.identity.role,
    messages: n,
    sequences: o,
    next: s,
    hasMore: a,
    capabilities: Xs(t.capabilities),
    rooms: ot(t.rooms) ? [{ id: "main", name: "综合讨论", icon: "💬", description: "" }] : or(t.rooms),
    spaces: ot(t.spaces) ? [{ id: "hub_main", name: "聊天室", icon: "🏠" }] : ar(t.spaces),
    roomsSupported: Array.isArray(t.rooms),
    spacesSupported: Array.isArray(t.spaces),
    members: Un(t.members, i),
    friends: c,
    friendRequests: Pn(t.friendRequests, e, i)
  });
}
function Ze(t, e, r) {
  for (const i of Object.keys(e)) {
    if (!r()) return !1;
    t[i] = e[i];
  }
  return r();
}
function Rn(t, e, r, i) {
  const { chat: s, service: n } = i, o = r.current;
  if (!o()) return !1;
  const a = r.restoring();
  for (let y = 0; y < t.messages.length; y++) {
    if (!o()) return !1;
    const K = t.messages[y];
    i.publish(K, Object.freeze({
      scope: e.scope,
      channel: e.channel,
      sequence: t.sequences[y],
      source: a ? "history" : K.sender.uid === t.uid ? "self" : "live"
    }), o);
  }
  if (!o()) return !1;
  const c = new Set(s.messages.map((y) => y.id)), l = t.messages.filter((y) => y.sender.uid !== t.uid && !y.meta?.silentPartySync && y.type !== "system" && !c.has(y.id)), d = s.visible ? [] : l.filter((y) => (e.cursor > 0 || e.now - y.timestamp < 3e4) && (y.type !== "music_party" || !a)).slice(-3), m = new Map(s.messages.map((y) => [y.id, y]));
  for (const y of t.messages) m.set(y.id, y);
  const h = Object.assign(/* @__PURE__ */ Object.create(null), s.userActivities);
  for (const y of t.members) y.activity && (h[y.uid] = y.activity);
  const g = [], k = new Set(s.friends.map((y) => y.uid)), b = new Map(t.members.map((y) => [y.uid, y]));
  for (const y of t.friends || []) {
    const K = b.get(y);
    K && !k.has(y) && (g.push({ uid: y, name: K.name, avatar: K.avatar, addedAt: e.now, status: "mutual" }), k.add(y));
  }
  if (!Ze(s, {
    messages: [...m.values()].sort((y, K) => y.timestamp - K.timestamp || y.id.localeCompare(K.id)).slice(-200),
    unreadCount: l.length ? s.visible ? 0 : s.unreadCount + l.length : s.unreadCount
  }, o) || !Ze(n, {
    capabilities: t.capabilities,
    imageMessagesSupported: t.capabilities.messageTypes.includes("image"),
    spacesSupported: t.spacesSupported,
    spaces: t.spaces,
    roomsSupported: t.roomsSupported,
    rooms: t.rooms
  }, o) || (i.authenticated(), !o()) || !Ze(n, { role: t.role, members: t.members, ...t.friends === void 0 ? {} : { friends: t.friends } }, o)) return !1;
  for (const y of g) {
    if (!o()) return !1;
    s.friends.some((K) => K.uid === y.uid) || s.friends.push(y);
  }
  const I = t.members.some((y) => !!y.activity) || Object.getPrototypeOf(s.userActivities) !== null ? { userActivities: h } : {};
  if (!Ze(s, {
    ...I,
    ...t.friendRequests === void 0 ? {} : { friendRequests: t.friendRequests },
    connected: !0,
    connecting: !1,
    error: ""
  }, o) || !Ze(n, { status: "已连接私有服务器" }, o)) return !1;
  t.hasMore || r.caughtUp();
  for (const y of d) {
    if (!o()) return !1;
    if (s.visible) break;
    try {
      i.notify(y, e.channel);
    } catch {
      console.warn("[PrivateChat] notification failed");
    }
  }
  return o();
}
const ke = "private-relay-server";
class Mn {
  constructor(e) {
    this.ports = e, this.flushing = !1;
  }
  async postAndAcknowledge(e, r, i = 12e3) {
    const s = Object.freeze({ ...e }), n = at(this.ports.capabilities(s), r);
    if (n) throw new Ae(n);
    const o = await this.ports.post(s, r, AbortSignal.timeout(i));
    if (!o || o.stored !== !0 || o.id !== r.id) throw new Error("未收到服务器落盘确认");
    await Sn(this.ports.scope(s), r.id, ke);
  }
  async recordFailure(e, r, i, s) {
    try {
      if (i instanceof Ae) {
        j.value = i.message, await li(this.ports.scope(e), r, ke, !1, s, !0);
        return;
      }
      const n = i instanceof He && i.status >= 400 && i.status < 500 && ![408, 429].includes(i.status);
      await li(this.ports.scope(e), r, ke, n, s);
    } catch {
      j.value = "无法保存消息的发送状态，请检查浏览器存储。";
    }
  }
  async flush(e) {
    if (this.flushing || !this.ports.active(e) || ["unknown", "incompatible"].includes(this.ports.capabilities(e).status)) return;
    this.flushing = !0;
    const r = [];
    try {
      const i = this.ports.destinations(e).map((n) => Object.freeze({ ...n }));
      let s = 8;
      for (const n of i) {
        if (!s || !this.ports.active(e)) break;
        await vn(this.ports.scope(n), [ke], () => this.ports.active(e), (o, a, c) => {
          --s;
          const l = { ...a, sender: { ...a.sender, avatar: this.ports.avatar(a.sender.avatar) } };
          return r.push(this.postAndAcknowledge(n, l).catch((d) => this.recordFailure(n, a.id, d, c))), !0;
        }, s, (o) => !at(this.ports.capabilities(n), o));
      }
    } catch {
      j.value = "待发队列处理未确认，请检查本地存储；未改投其他房间。";
    } finally {
      await Promise.allSettled(r), this.flushing = !1;
    }
  }
}
const Bt = [];
function zo(t) {
  return Bt.push(t), () => {
    const e = Bt.indexOf(t);
    e >= 0 && Bt.splice(e, 1);
  };
}
async function Wo() {
  const t = w.room;
  if (!t || t.uid !== u.currentUser.uid) throw new Error("请先在聊天室设置中加入自己的聊天室");
  const e = { ...t }, r = await V(e, "/api/v1/rooms", "GET", void 0, AbortSignal.timeout(15e3));
  if (!w.room || T(e) !== T(w.room)) throw new Error("聊天室配置已改变，请重新选择");
  const i = r.spaces ? ar(r.spaces) : [];
  return or(r.rooms).map((s) => ({ ...e, channel: s.id, name: `${i.find((n) => n.id === s.space)?.name || "聊天室"} / ${s.name}` }));
}
async function Or(t, e) {
  const r = w.room;
  if (!r || T(r) !== T(e) || u.currentUser.uid !== e.uid) throw new Error("聊天室身份已改变，未发送，请重新选择房间");
  const i = pt(t);
  if (!i || i.type === "system" || i.type === "image") throw new Error("分享内容无效或超出大小限制，未发送");
  const s = { ...e };
  i.sender = { ...i.sender, uid: s.uid, avatar: tr(u.currentUser.avatar, X.avatarUrl), name: u.currentUser.name };
  const n = at(St(s), i);
  if (n) throw new Error(n);
  await er(me(s), [i]), await ji(me(s), i, [ke]), le(s) && !u.messages.some((o) => o.id === i.id) && u.messages.push(i);
  try {
    await Gt.postAndAcknowledge(s, i, 15e3);
  } catch (o) {
    throw await Gt.recordFailure(s, i.id, o, 0), lr(), new Error(`未收到「${s.name}」的保存确认；已保留在该房间待发队列，请勿重复发送。`);
  }
}
const S = F({
  status: "未配置私有服务器",
  role: "",
  syncing: !1,
  channel: "main",
  rooms: [],
  spaces: [],
  spacesSupported: !1,
  imageMessagesSupported: !1,
  capabilities: Yt(),
  roomsSupported: !1,
  friends: [],
  members: []
});
function St(t) {
  return Ue === T(t) && w.room && T(w.room) === T(t) && u.currentUser.uid === t.uid ? S.capabilities : Yt();
}
function cr() {
  S.capabilities = Yt(), S.imageMessagesSupported = !1;
}
const Gt = new Mn({
  active: le,
  capabilities: St,
  scope: me,
  avatar: (t) => tr(t, X.avatarUrl),
  destinations: (t) => [Te(t), ...S.rooms.filter((e) => e.id !== S.channel).map((e) => ({ ...t, channel: e.id }))],
  post: (t, e, r) => V(t, "/api/v1/messages", "POST", { message: e }, r)
}), zi = new In(() => {
  S.status = "凭证数据库被旧标签页阻塞，请关闭旧页后重试";
}), Ln = new An({
  credential: (t, e) => zi.read(t, e),
  beforeSend: ({ destination: t, path: e, method: r, body: i }) => {
    if (!D.isInstalled("chat")) throw new Ae("聊天室实验组件已停用，未发起请求");
    const s = e === "/api/v1/members" || e.startsWith("/api/v1/members/"), n = r !== "GET" && ["/api/v1/spaces", "/api/v1/rooms"].some((o) => e === o || e.startsWith(o + "/"));
    if ((s || n) && (!u.connected || S.role !== "owner" || Ue !== T(t) || !w.room || T(w.room) !== T(t) || u.currentUser.uid !== t.uid))
      throw new He(403);
    if (r === "POST" && e === "/api/v1/messages") {
      const o = at(St(t), i.message);
      if (o) throw new Ae(o);
    }
  }
});
function Nn(t) {
  const e = "BEAVER-PRIVATE1:";
  if (!t.startsWith(e) || t.length > 8e3) throw new Error("请粘贴新版私有聊天室邀请");
  try {
    const r = JSON.parse(decodeURIComponent(atob(t.slice(e.length))));
    if (!r || !dt(r.token)) throw new Error();
    return { ...wt(r), token: r.token };
  } catch {
    throw new Error("邀请格式无效");
  }
}
let xr = 0;
async function Ko(t) {
  if (!D.isInstalled("chat")) throw new Ae("请先在商店手动启用聊天室实验组件");
  const e = Nn(t);
  if (e.uid !== u.currentUser.uid) throw new Error("此邀请不属于当前 UID，请让服主为当前账号重新创建");
  const r = wt(e), i = w.room ? T(w.room) : null;
  ft();
  const s = xr;
  if (await zi.write(r, e.token), s !== xr || u.currentUser.uid !== e.uid || i !== (w.room ? T(w.room) : null))
    throw new Error("凭据已保存，但身份或连接选择已改变，未激活旧邀请；如需加入请重新确认。");
  ft(), yn(r), u.transportMode = "relay", yt(qi(r), e.room), ge();
}
function V(t, e, r = "GET", i, s) {
  return D.isInstalled("chat") ? Ln.request({ destination: t, path: e, method: r, body: i, signal: s }) : Promise.reject(new Ae("请先在商店手动启用聊天室实验组件"));
}
async function Wi(t, e, r) {
  const i = w.room;
  if (!i) throw new Error("未配置私有服务器");
  return V({ ...i }, t, e, r, AbortSignal.timeout(15e3));
}
async function Jo() {
  return (await Wi("/api/v1/members", "GET")).members;
}
async function On(t, e) {
  const r = w.room;
  if (!r) throw new Error("未配置私有服务器");
  const i = { ...r }, s = await V(i, "/api/v1/members", "POST", { uid: t, name: e }, AbortSignal.timeout(15e3));
  if (!dt(s.token)) throw new Error("服务器返回无效，勿重复创建，请刷新成员列表");
  return "BEAVER-PRIVATE1:" + btoa(encodeURIComponent(JSON.stringify({ ...i, uid: t, token: s.token })));
}
async function Yo(t) {
  const e = w.room;
  if (!e) throw new Error("未配置私有服务器，无法发送邀请");
  if (t.uid === u.currentUser.uid) throw new Error("不能邀请自己");
  const r = St(e);
  if (!r.messageTypes.includes("server_invite")) throw new Error(r.status === "unknown" || r.status === "incompatible" ? r.reason : "服务端未启用邀请卡消息，未创建新成员邀请。");
  const i = await On(t.uid, t.name), s = S.spaces.find((m) => m.id === (S.rooms.find((h) => h.id === S.channel)?.space || "hub_main")), n = S.rooms.find((m) => m.id === S.channel) || S.rooms[0], o = s?.name || e.room || "海狸聊天室", a = n?.name || "综合讨论";
  let c = "";
  try {
    c = JSON.parse(decodeURIComponent(atob(i.replace(/^BEAVER-PRIVATE1:/, "")))).token || "";
  } catch {
  }
  const l = {
    id: `msg_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    sender: {
      uid: u.currentUser.uid,
      name: u.currentUser.name,
      avatar: u.currentUser.avatar
    },
    type: "server_invite",
    content: `邀请你加入【${o}】聊天室`,
    meta: {
      inviteOrigin: e.origin,
      inviteRoom: e.room,
      inviteRoomName: a,
      inviteServerName: o,
      inviteServerIcon: s?.icon || "🏠",
      inviteToken: c,
      inviteTargetUid: t.uid,
      inviteCode: i
    },
    timestamp: Date.now()
  }, d = Ki(t.uid);
  await Or(l, {
    ...e,
    channel: d,
    name: `私聊 / ${t.name}`
  }), xn(t.uid);
}
async function Qo(t) {
  if (!/^[a-f0-9]{32}$/.test(t)) throw new Error("成员标识无效");
  await Wi("/api/v1/members/" + t, "DELETE");
}
function Te(t) {
  return { ...t, channel: S.channel };
}
function vt(t) {
  const e = new URL(qi(t)), r = t.channel || "main";
  return r !== "main" && e.searchParams.set("channel", r), e.href;
}
function me(t) {
  return Hr(t.uid, vt(t), t.room);
}
function le(t) {
  return D.isInstalled("chat") && u.currentUser.uid === t.uid && u.serverUrl === vt(t) && (t.channel || "main") === S.channel && u.currentRoomId === t.room && w.room !== null && T(w.room) === T(t);
}
function Xo() {
  const t = w.room && Te(w.room);
  return t && le(t) ? { scope: me(t), channel: t.channel } : null;
}
function Ki(t) {
  return "dm_" + [u.currentUser.uid, t].sort().join("__");
}
function Zo(t) {
  if (!t.startsWith("dm_")) return;
  const e = t.slice(3).split("__");
  if (e.length === 2)
    return e.find((r) => r !== u.currentUser.uid);
}
function xn(t) {
  const e = w.room;
  if (!e || !t || t === u.currentUser.uid) return;
  const r = Ki(t);
  r === S.channel && le(Te(e)) || yt(vt({ ...e, channel: r }), e.room, !0) && (S.channel = r, ge());
}
async function Bn(t) {
  const e = w.room;
  if (!e) throw new Error("未配置私有服务器");
  await V({ ...e }, "/api/v1/friends/request", "POST", { toUid: t }, AbortSignal.timeout(15e3));
}
async function $n(t, e) {
  const r = w.room;
  if (!r) throw new Error("未配置私有服务器");
  await V({ ...r }, "/api/v1/friends/respond", "POST", { id: t, accept: e }, AbortSignal.timeout(15e3));
}
function Ji(t) {
  const e = w.room;
  if (!(!e || !S.rooms.some((r) => r.id === t))) {
    if (t === S.channel && le(Te(e))) {
      lr();
      return;
    }
    yt(vt({ ...e, channel: t }), e.room, Ue === T(e) && u.currentUser.uid === e.uid) && (S.channel = t, ge());
  }
}
async function ea(t, e) {
  const r = w.room;
  if (!r) throw new Error("未配置");
  const i = T(r), s = { ...r };
  await V(s, e ? `/api/v1/rooms/${encodeURIComponent(e)}` : "/api/v1/rooms", "POST", t, AbortSignal.timeout(15e3));
  const n = await V(s, "/api/v1/rooms", "GET", void 0, AbortSignal.timeout(15e3));
  if (w.room && T(w.room) === i && u.currentUser.uid === r.uid) {
    const o = or(n.rooms), a = n.spaces ? ar(n.spaces) : void 0;
    S.rooms = o, a && w.room && T(w.room) === i && u.currentUser.uid === r.uid && (S.spaces = a);
  }
}
async function ta(t) {
  if (t === "main") throw new Error("默认房间不可移除");
  const e = w.room;
  if (!e) throw new Error("未配置");
  const r = T(e);
  await V({ ...e }, `/api/v1/rooms/${encodeURIComponent(t)}`, "DELETE", void 0, AbortSignal.timeout(15e3)), !(!w.room || T(w.room) !== r) && (S.rooms = S.rooms.filter((i) => i.id !== t), S.channel === t && Ji("main"));
}
async function ra(t, e) {
  const r = w.room;
  if (!r) throw new Error("未配置");
  const i = T(r);
  await V({ ...r }, e ? `/api/v1/spaces/${encodeURIComponent(e)}` : "/api/v1/spaces", "POST", t, AbortSignal.timeout(15e3)), w.room && T(w.room) === i && await Yi(r);
}
async function ia(t) {
  if (t === "hub_main") throw new Error("默认空间不可移除");
  const e = w.room;
  if (!e) throw new Error("未配置");
  const r = T(e), i = S.channel;
  await V({ ...e }, `/api/v1/spaces/${encodeURIComponent(t)}`, "DELETE", void 0, AbortSignal.timeout(15e3)), !(!w.room || T(w.room) !== r || u.currentUser.uid !== e.uid) && (await Yi(e), !(!w.room || T(w.room) !== r || u.currentUser.uid !== e.uid) && S.channel === i && !S.rooms.some((s) => s.id === i) && Ji("main"));
}
async function Yi(t) {
  const e = await V({ ...t }, "/api/v1/spaces", "GET", void 0, AbortSignal.timeout(15e3));
  if (!w.room || T(w.room) !== T(t) || u.currentUser.uid !== t.uid) return;
  const r = ar(e.spaces), i = or(e.rooms);
  S.spaces = r, w.room && T(w.room) === T(t) && u.currentUser.uid === t.uid && (S.rooms = i);
}
let Qi = "", Ue = "";
const Yr = new Tn({
  active: le,
  visible: () => u.visible,
  poll: Dn,
  started: () => {
    u.connecting = !u.connected, S.syncing = !0;
  },
  idle: () => {
    S.syncing = !1;
  },
  classify: (t, e) => t instanceof He && t.status === 404 && (e.channel || "main") !== "main" ? "missing-room" : t instanceof He && [401, 403].includes(t.status) ? "auth" : "retry",
  failed: (t, e, r) => {
    t === "missing-room" ? (S.channel = "main", S.status = "房间已移除，正在返回综合讨论") : t === "auth" ? (Ue = "", cr(), S.role = "", u.error = "访问凭证已失效、过期或不属于此房间，请重新导入邀请", u.connected = !1, u.connecting = !1) : r >= 2 && (u.connected = !1, u.connecting = !1, u.error = `${e}失败或超时，记录与待发队列保留，将自动重试。若持续失败，请关闭旧标签页后重试，并检查服务配置。`, S.status = u.error);
  },
  restart: () => ge()
});
function lr() {
  const t = w.room && Te(w.room);
  t && !Yr.stopped && Qi === T(t) && le(t) || ge();
}
function Xi() {
  Yr.cancel();
}
function ft() {
  ++xr, Xi(), Ue = "", cr(), u.connected = !1, u.connecting = !1, S.role = "";
}
function ge() {
  if (!D.isInstalled("chat")) {
    ft(), u.visible = !1, u.error = "", S.status = "实验性组件默认关闭，请先在商店手动启用";
    return;
  }
  const t = w.room && Te(w.room), e = !!t && Ue === T(t) && u.currentUser.uid === t.uid;
  if (e ? Xi() : ft(), !t) {
    S.status = "尚未读取到聊天室配置，请在此窗口设置中检查", u.error = "";
    return;
  }
  if (t.uid !== u.currentUser.uid) {
    u.error = S.status = "邀请 UID 与本机不一致，请重新导入属于本机的邀请";
    return;
  }
  u.transportMode = "relay", yt(vt(t), t.room, e) && (Qi = T(t), u.connected || (S.status = "正在同步"), Yr.start(t));
}
async function Dn(t, e) {
  const r = me(t), i = t.channel || "main", s = await e.wait(() => rn(r)), n = tr(u.currentUser.avatar, X.avatarUrl), o = u.currentUser.activity || kn(), a = u.shareActivity !== !1 && o?.title ? `&act_type=${encodeURIComponent(o.type || "")}&act_title=${encodeURIComponent(o.title || "")}&act_url=${encodeURIComponent(o.url || "")}` : "", c = e.visible ? "&wait=6" : "", l = `/api/v1/sync?after=${s}&avatar=${encodeURIComponent(n)}&name=${encodeURIComponent(u.currentUser.name.slice(0, 100))}${a}${c}`;
  e.phase("连接私有服务器");
  const d = await e.wait(() => V(t, l, "GET", void 0, e.signal));
  if (!e.current()) return;
  e.phase("校验同步页");
  let m;
  try {
    m = _n(d, t.uid, s, Date.now());
  } catch (h) {
    throw e.current() && cr(), h;
  }
  if (e.current() && (e.phase("保存同步记录"), await e.wait(() => sn(r, m.messages, m.next)), !!e.current())) {
    try {
      await e.wait(() => Vi(r, m.messages.filter((h) => h.sender.uid === t.uid).map((h) => h.id), ke));
    } catch {
      e.current() && (j.value = "无法保存消息的发送确认，请检查浏览器存储。");
    }
    if (e.current() && (e.phase("应用同步状态"), !!Rn(m, { scope: r, channel: i, cursor: s, now: Date.now() }, e, {
      chat: u,
      service: S,
      authenticated: () => {
        Ue = T(t);
      },
      publish: (h, g, k) => {
        for (const b of [...Bt]) {
          if (!k()) return;
          try {
            b(h, g);
          } catch {
            console.warn("[PrivateChat] message listener failed");
          }
        }
      },
      notify: En
    }) && e.current()))
      return e.phase("处理待发消息"), Gt.flush(t), { hasMore: m.hasMore };
  }
}
async function Rt(t) {
  const e = w.room && Te(w.room);
  if (!e || !le(e))
    return j.value = "未配置此房间的私有服务器，未发送", !1;
  t.sender && (t.sender.avatar = tr(u.currentUser.avatar, X.avatarUrl), u.currentUser.name && (t.sender.name = u.currentUser.name));
  const r = pt(t);
  if (!r || r.type === "system")
    return j.value = "消息格式无效，未发送", !1;
  const i = at(St(e), r);
  if (i)
    return j.value = i, !1;
  const s = { ...e };
  try {
    return await er(me(s), [r]), await ji(me(s), r, [ke]), le(s) && !u.messages.some((n) => n.id === r.id) && u.messages.push(r), j.value = "", Gt.flush(s), !0;
  } catch {
    return j.value = "消息未能保存到待发队列，请勿刷新，检查存储后重试", !1;
  }
}
let ui = !1;
function Fn() {
  ui || (ui = !0, qe(() => [D.isInstalled("chat"), JSON.stringify(w.room)], () => {
    const t = w.room;
    S.members = [], S.rooms = [], S.roomsSupported = !1, S.spaces = [], S.spacesSupported = !1, cr(), S.channel = "main", (!t || !D.isInstalled("chat")) && (u.visible = !1, S.members = []), ge();
  }, { immediate: !0, flush: "sync" }), qe(() => u.visible, (t) => {
    t && lr();
  }), qe(() => u.currentUser.uid, () => ge()), D.isInstalled("chat") && w.room && Ke(me(w.room)).catch(() => {
    j.value = "待发队列读取失败，请关闭旧标签页后重试";
  }));
}
class qn {
  constructor() {
    Fn();
  }
  connect() {
    lr();
  }
  disconnect() {
    ft();
  }
  resetReconnectAndConnect() {
    ge();
  }
  async retryMessage(e) {
    await Rt(e);
  }
  dispatchOutgoing(e, r) {
    if (!r) {
      Rt(e);
      return;
    }
    Or(e, r).then(() => {
      ne.fetch("海狸聊天室", `已发送到 ${r.name}`, "服务器已保存，不代表成员已读。");
    }).catch((i) => {
      ne.fetch("海狸聊天室", "分享未确认", i instanceof Error ? i.message : "未确认发送结果，请检查聊天室连接。");
    });
  }
  sendWebsiteShare(e, r) {
    const i = gt(e.url);
    if (!i) {
      ne.fetch("海狸聊天室", "未发送", "只支持分享有效的 HTTP(S) 网站地址。");
      return;
    }
    const s = (e.title || "网站").slice(0, 100), n = {
      id: `msg_${crypto.randomUUID()}`,
      sender: { ...u.currentUser, activity: u.shareActivity ? u.currentUser.activity : void 0 },
      type: "website",
      content: `分享了常用网站：${s}`,
      meta: {
        linkTitle: s,
        linkUrl: i,
        linkIcon: e.icon || "",
        linkNote: (e.note || "").slice(0, 200)
      },
      timestamp: Date.now()
    };
    this.dispatchOutgoing(n, r);
  }
  async sendTextMessage(e, r) {
    const i = e.trim();
    if (!i) return !1;
    const s = {
      id: `msg_${crypto.randomUUID()}`,
      sender: { ...u.currentUser, activity: u.shareActivity ? u.currentUser.activity : void 0 },
      type: "text",
      content: i,
      timestamp: Date.now()
    };
    if (!r) return Rt(s);
    try {
      return await Or(s, r), !0;
    } catch (n) {
      return ne.fetch("海狸聊天室", "分享未确认", n instanceof Error ? n.message : "未确认发送结果，请检查聊天室连接。"), !1;
    }
  }
  sendMusicShare(e, r) {
    const i = {
      id: `msg_${crypto.randomUUID()}`,
      sender: { ...u.currentUser, activity: u.shareActivity ? u.currentUser.activity : void 0 },
      type: "music",
      content: `正在听：${e.musicTitle} - ${e.musicArtist}`,
      meta: e,
      timestamp: Date.now()
    };
    this.dispatchOutgoing(i, r);
  }
  sendBiliShare(e, r) {
    const i = {
      bvid: e.bvid || (e.aid ? `av${e.aid}` : ""),
      aid: e.aid,
      videoTitle: e.title,
      videoCover: e.cover,
      upName: e.upName || "UP主",
      upMid: e.upMid,
      upFace: e.upFace,
      upFans: e.upFans,
      playCount: e.play,
      likeCount: e.like,
      danmakuCount: e.danmaku,
      isHot: !0
    }, s = {
      id: `msg_${crypto.randomUUID()}`,
      sender: { ...u.currentUser, activity: u.shareActivity ? u.currentUser.activity : void 0 },
      type: "bilibili",
      content: `分享了B站视频：${e.title}`,
      meta: i,
      timestamp: Date.now()
    };
    this.dispatchOutgoing(s, r);
  }
  sendGitHubShare(e, r) {
    const i = {
      repoFullName: e.fullName,
      repoName: e.name || e.fullName.split("/")[1] || e.fullName,
      repoOwner: e.owner || e.fullName.split("/")[0] || "",
      repoOwnerAvatar: e.ownerAvatar,
      repoDesc: e.desc || "暂无描述",
      repoLanguage: e.language || "Plain Text",
      repoStars: e.stars || 0,
      repoCategory: e.category || "未分类",
      repoUrl: e.url || `https://github.com/${e.fullName}`,
      repoUpdatedAt: e.updatedAt || (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
    }, s = {
      id: `msg_${crypto.randomUUID()}`,
      sender: { ...u.currentUser, activity: u.shareActivity ? u.currentUser.activity : void 0 },
      type: "github",
      content: `分享了GitHub仓库：${e.fullName}`,
      meta: i,
      timestamp: Date.now()
    };
    this.dispatchOutgoing(s, r);
  }
  sendBiliSeriesShare(e, r) {
    const i = {
      seriesId: e.id,
      seriesName: e.name,
      seriesCount: e.count,
      seriesItems: e.items.map((n) => ({
        id: n.id,
        aid: n.aid,
        bvid: n.bvid,
        title: n.title,
        cover: n.cover,
        author: n.author,
        duration: n.duration != null ? String(n.duration) : void 0
      }))
    }, s = {
      id: `msg_${crypto.randomUUID()}`,
      sender: { ...u.currentUser, activity: u.shareActivity ? u.currentUser.activity : void 0 },
      type: "bili_series",
      content: `分享了B站电台系列：${e.name} (${e.count}首)`,
      meta: i,
      timestamp: Date.now()
    };
    this.dispatchOutgoing(s, r);
  }
  async sendImageMessage(e) {
    if (!e) return !1;
    const r = {
      id: `msg_${crypto.randomUUID()}`,
      sender: { ...u.currentUser, activity: u.shareActivity ? u.currentUser.activity : void 0 },
      type: "image",
      content: "[图片]",
      meta: {
        imageUrl: e
      },
      timestamp: Date.now()
    };
    return Rt(r);
  }
  sendAiHotShare(e, r) {
    const i = {
      aihotTitle: e.title,
      aihotSummary: e.summary,
      aihotSource: e.sourceName || "AI资讯",
      aihotCategory: e.category || "AI HOT",
      aihotUrl: e.url,
      aihotDate: e.published
    }, s = {
      id: `msg_${crypto.randomUUID()}`,
      sender: { ...u.currentUser, activity: u.shareActivity ? u.currentUser.activity : void 0 },
      type: "aihot",
      content: `分享了AI热点：${e.title}`,
      meta: i,
      timestamp: Date.now()
    };
    this.dispatchOutgoing(s, r);
  }
  sendYouTubeShare(e, r) {
    const i = {
      youtubeId: e.id,
      youtubeTitle: e.title,
      youtubeCover: e.cover,
      youtubeAuthor: e.author || "YouTube",
      youtubeViews: e.views,
      youtubeUrl: e.url || `https://www.youtube.com/watch?v=${e.id}`
    }, s = {
      id: `msg_${crypto.randomUUID()}`,
      sender: { ...u.currentUser, activity: u.shareActivity ? u.currentUser.activity : void 0 },
      type: "youtube",
      content: `分享了YouTube视频：${e.title}`,
      meta: i,
      timestamp: Date.now()
    };
    this.dispatchOutgoing(s, r);
  }
  sendActivity(e) {
  }
  sendFriendRequest(e, r) {
    !e.uid || e.uid === u.currentUser.uid || Bn(e.uid).then(() => {
      ne.fetch("海狸聊天室", `已向【${e.name}】发送好友申请`, "对方可在聊天室右上角通知中确认。");
    }).catch((i) => {
      ne.fetch("海狸聊天室", "好友申请未发送", i instanceof Error ? i.message : "请检查聊天室连接。");
    });
  }
  respondFriendRequest(e, r) {
    e.id && $n(e.id, r).then(() => {
      ne.fetch("海狸聊天室", r ? `已通过【${e.from.name}】的好友申请` : "已忽略该申请", r ? "双方已成为好友，可随时点击私聊。" : "");
    }).catch((i) => {
      ne.fetch("海狸聊天室", "操作未完成", i instanceof Error ? i.message : "请检查网络。");
    });
  }
}
const Zi = new qn(), sa = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  chatService: Zi
}, Symbol.toStringTag, { value: "Module" })), jn = {
  schemaVersion: 1,
  id: "chat",
  title: "海狸聊天室",
  emoji: "💬",
  rootId: "vue-chat-dialog-root",
  settingsKeys: ["lw_chat_server_url"],
  capabilities: ["chat:message-read", "chat:message-send"],
  badgeCount: () => u.unreadCount,
  loadView: () => import("./ChatDialog-Cdf4Di6G.js").then((t) => t.default),
  lifecycle: {
    isVisible: () => u.visible,
    canOpen: () => D.isInstalled("chat"),
    open: () => {
      D.isInstalled("chat") && (u.visible = !0, u.unreadCount = 0, pn.value && Zi.connect());
    },
    hide: () => {
      u.visible = !1;
    },
    canUnmount: () => !0
  }
};
let di = Promise.resolve();
function et(t, e) {
  const r = async () => {
    if (typeof chrome > "u" || !chrome.storage?.local)
      throw new Error("Chrome storage API unavailable");
    const s = await chrome.storage.local.get(nt), n = Si(s[nt]);
    if (t === "list")
      return n;
    if (t === "append") {
      const o = ls(e);
      o.createdAt = Date.now(), o.read = !1, n.items.some((a) => a.id === o.id) || n.items.unshift(o), n.items = n.items.slice(0, us);
    } else if (t === "read-all")
      n.items = n.items.map((o) => ({ ...o, read: !0 }));
    else if (t === "clear")
      n.items = [];
    else if (t === "read" || t === "remove") {
      if (typeof e != "string" || e.length > 200)
        throw new Error("Invalid notification id");
      t === "remove" ? n.items = n.items.filter((o) => o.id !== e) : n.items = n.items.map((o) => o.id === e ? { ...o, read: !0 } : o);
    } else
      throw new Error("Invalid history operation");
    return n.version++, await chrome.storage.local.set({ [nt]: n }), n;
  }, i = di.then(async () => typeof navigator < "u" && navigator.locks ? await navigator.locks.request("tab-project:notification-history", async () => await r()) : await r());
  return di = i.catch(() => {
  }), i;
}
const A = F({
  isOpen: !1,
  loading: !1,
  saving: !1,
  error: "",
  version: -1,
  items: []
});
let hi = !1;
function Me(t) {
  t.version < A.version || (A.version = t.version, A.items = t.items);
}
const na = {
  state: A,
  start() {
    hi || (hi = !0, typeof chrome < "u" && chrome.storage?.onChanged && chrome.storage.onChanged.addListener((t, e) => {
      if (!(e !== "local" || !t[nt]))
        try {
          Me(Si(t[nt].newValue));
        } catch {
          A.error = "通知历史格式异常，未覆盖当前记录。";
        }
    }), this.refresh());
  },
  async refresh() {
    A.loading = !0;
    try {
      const t = await et("list");
      Me(t), A.error = "";
    } catch {
      A.error = "通知历史读取失败。请点击“重新读取”重试。";
    } finally {
      A.loading = !1;
    }
  },
  open() {
    this.start(), A.isOpen = !0, this.refresh();
  },
  close() {
    A.isOpen = !1;
  },
  toggle() {
    A.isOpen ? this.close() : this.open();
  },
  async markRead(t) {
    if (!A.saving) {
      A.saving = !0;
      try {
        const e = await et("read", t);
        Me(e), A.error = "";
      } catch {
        A.error = "标记已读未确认，请重试。";
      } finally {
        A.saving = !1;
      }
    }
  },
  async markAllRead() {
    if (!A.saving) {
      A.saving = !0;
      try {
        const t = await et("read-all");
        Me(t), A.error = "";
      } catch {
        A.error = "全部标记已读未确认，请重试。";
      } finally {
        A.saving = !1;
      }
    }
  },
  async remove(t) {
    if (!A.saving) {
      A.saving = !0;
      try {
        const e = await et("remove", t);
        Me(e), A.error = "";
      } catch {
        A.error = "删除通知未确认，请重试。";
      } finally {
        A.saving = !1;
      }
    }
  },
  async clear() {
    if (!A.saving) {
      A.saving = !0;
      try {
        const t = await et("clear");
        Me(t), A.error = "";
      } catch {
        A.error = "清空通知未确认，请重试。";
      } finally {
        A.saving = !1;
      }
    }
  },
  async activate(t) {
    await this.markRead(t.id), t.target && await this.openTarget(t.target);
  },
  async openTarget(t) {
    const e = ds(t);
    if (e)
      try {
        if (e.type === "todoist-task") {
          const { openTodoistTask: r } = await import("./task-navigation-CdFHuF0W.js");
          r(e.taskId);
        } else if (e.type === "github-repository") {
          const { githubRepoDetailController: r } = await import("./github.service-DdJVB3Fj.js").then((i) => i.Z);
          r.open(e.fullName);
        } else if (e.type === "bili-video") {
          const { biliMiniPlayerController: r } = await import("./github.service-DdJVB3Fj.js").then((i) => i.X);
          await r.openVideo({ bvid: e.bvid, aid: e.aid });
        } else if (e.type === "bili-messages") {
          const { biliMessagePanelController: r } = await import("./message-panel-store-XVs-rbT6.js");
          r.openPanel();
        } else {
          const { getDockModule: r } = await import("./window-manager.store-D9RSYghK.js").then((s) => s.m);
          if (!r(e.moduleId)) throw new Error();
          const { windowManagerController: i } = await import("./window-manager.store-D9RSYghK.js").then((s) => s.n);
          i.open(e.moduleId);
        }
        this.close();
      } catch {
        A.error = "通知对应页面暂不能打开，记录已保留。";
      }
  }
};
function Vn(t) {
  return t.filter((e) => e.appType === "ai-workspace" && !e.read).length;
}
const Hn = {
  schemaVersion: 1,
  id: "multica",
  title: "AI 工作区",
  icon: "assets/nav-ai.svg",
  emoji: "✦",
  presentation: "card",
  rootId: "multica",
  settingsKeys: [],
  capabilities: ["workspace:fullscreen", "ai:native", "ai:byok"],
  badgeCount: () => Vn(A.items),
  loadView: () => import("./MulticaDialog-UuyW6LJm.js").then((t) => t.M).then((t) => t.default),
  lifecycle: {
    isVisible: () => Z.activeId === "multica",
    canOpen: () => D.isInstalled("multica"),
    open: () => {
      D.isInstalled("multica") && Jt("multica");
    },
    hide: () => mt("multica")
  }
};
try {
  Os();
} catch (t) {
  console.warn("旧 YouTube 数据清理失败", t);
}
pe(jn);
pe(Hn);
pe(Hs);
pe(Ds);
pe(js);
pe($s);
pe(xs);
pe(Bs);
function Gn(t) {
  const e = t.map((r) => ({ ...r }));
  for (const r of bi()) {
    if (r.presentation !== "card" || r.showInDock === !1) continue;
    if (e.some((n) => n.id === r.id)) throw new Error("Duplicate workspace card entry");
    const i = { id: r.id, title: r.title, icon: r.icon }, s = r.dockBefore ? e.findIndex((n) => n.id === r.dockBefore) : -1;
    e.splice(s < 0 ? e.length : s, 0, i);
  }
  return e;
}
function zn(t) {
  const e = t.map((r) => ({ ...r }));
  for (const r of bi()) {
    if (r.showInDock === !1 || r.presentation === "card") continue;
    if (e.some((n) => n.id === r.id)) throw new Error("Dock module duplicated in legacy tools");
    const i = { id: r.id, title: r.title, icon: r.icon, emoji: r.emoji }, s = r.dockBefore ? e.findIndex((n) => n.id === r.dockBefore) : -1;
    e.splice(s < 0 ? e.length : s, 0, i);
  }
  return e;
}
function Wn(t) {
  const e = t.find((r) => r.id === "daily-bilibili");
  return e ? [e, ...t.filter((r) => r !== e)] : [...t];
}
const Kn = Wn(Gn([])), Jn = zn([]), es = "logicweaver_dock_custom_order", Qr = "logicweaver_dock_position";
function Xr(t) {
  return t === "bottom" || t === "left" || t === "right" || t === "top";
}
function Yn() {
  try {
    if (typeof localStorage < "u") {
      const t = localStorage.getItem(Qr);
      if (Xr(t)) return t;
    }
  } catch {
  }
  return "bottom";
}
function Qn(t) {
  try {
    typeof localStorage < "u" && localStorage.setItem(Qr, t);
  } catch {
  }
}
function zt() {
  try {
    if (typeof localStorage < "u") {
      const t = localStorage.getItem(es);
      if (t) return JSON.parse(t) || {};
    }
  } catch {
  }
  return {};
}
function fi(t) {
  try {
    typeof localStorage < "u" && localStorage.setItem(es, JSON.stringify(t));
  } catch {
  }
}
function ts() {
  const t = Jn.filter((r) => D.isInstalled(r.id)), e = zt().tools;
  if (Array.isArray(e) && e.length > 0) {
    const r = new Map(t.map((s) => [s.id, s])), i = [];
    for (const s of e) {
      const n = r.get(s);
      n && (i.push(n), r.delete(s));
    }
    for (const s of r.values())
      i.push(s);
    return i;
  }
  return t;
}
function rs() {
  const t = Kn.filter((r) => D.isInstalled(r.id)), e = zt().cards;
  if (Array.isArray(e) && e.length > 0) {
    const r = new Map(t.map((s) => [s.id, s])), i = [];
    for (const s of e) {
      const n = r.get(s);
      n && (i.push(n), r.delete(s));
    }
    for (const s of r.values())
      i.push(s);
    return i;
  }
  return t;
}
const Xn = () => ({
  mounted: !1,
  get activeTargetId() {
    return Ai() || Z.activeId || "";
  },
  activeTools: [],
  cards: rs(),
  tools: ts(),
  position: Yn()
}), _ = F(Xn());
typeof window < "u" && (window.addEventListener("logicweaver:dock-modules-changed", () => {
  for (const t of [..._.tools, ..._.cards])
    D.isInstalled(t.id) || ns(t.id)?.lifecycle.hide();
  _.tools = ts(), _.cards = rs();
}), window.addEventListener("storage", (t) => {
  t.key === Qr && Xr(t.newValue) && (_.position = t.newValue);
}));
Wt.onStateChange((t) => {
  _.activeTools = [...t];
});
let de = {};
function Mt(t, e) {
  const r = window.chrome, i = r?.runtime?.getURL ? r.runtime.getURL(e) : e, s = t.includes("newtab") || e.includes("newtab");
  if (window.location.href.includes(t) || s && (window.location.pathname.endsWith("/newtab.html") || window.location.pathname === "/newtab.html"))
    return;
  const n = (a) => {
    const l = (a.url || a.pendingUrl || "").toLowerCase();
    return s ? l.includes("newtab.html") || l.startsWith("chrome://newtab") || l.startsWith("edge://newtab") || l.startsWith("chrome-search://local-ntp") || l.includes("chrome-extension://") && l.includes("newtab") || !!(a.title && (a.title.includes("LogicWeaver 新标签页") || a.title === "新标签页" || a.title === "New Tab")) : l.includes(t.toLowerCase());
  };
  if (r?.tabs?.query) {
    r.tabs.query({ currentWindow: !0 }, (a) => {
      const c = a.find(n);
      if (c && c.id != null) {
        if (r.tabs.update(c.id, { active: !0 }), c.windowId != null && r.windows?.update)
          try {
            r.windows.update(c.windowId, { focused: !0 });
          } catch {
          }
      } else
        r.tabs.create({ url: i });
    });
    return;
  }
  const o = document.createElement("a");
  o.href = i, o.target = "_blank", o.rel = "noreferrer", document.body.appendChild(o), o.click(), o.remove();
}
const oa = {
  getSnapshot() {
    return Kt(_);
  },
  update(t) {
    const { activeTargetId: e, ...r } = t;
    Object.assign(_, r);
  },
  setMounted(t) {
    _.mounted = t;
  },
  setActiveTools(t) {
    _.activeTools = [...t];
  },
  addActiveTool(t) {
    _.activeTools.includes(t) || _.activeTools.push(t);
  },
  removeActiveTool(t) {
    const e = _.activeTools.indexOf(t);
    e >= 0 && _.activeTools.splice(e, 1);
  },
  triggerItem(t, e) {
    const r = typeof window < "u" ? window.location.pathname + window.location.href : "", i = r.includes("bilibili.html") || r.includes("github.html") || r.includes("aihot.html");
    if (t === "home") {
      if (i) {
        Mt("newtab.html", "newtab.html");
        return;
      }
      if (de.onHomeClick) {
        de.onHomeClick();
        return;
      }
      const s = document.getElementById("daily-toggle");
      s && s.classList.contains("active") && s.classList.remove("active");
      const n = Z.activeId;
      n && mt(n), Ms(Z.activeId), typeof window < "u" && window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      return;
    }
    if (t === "target") {
      const s = {
        "daily-bilibili": "bilibili.html",
        "card-github": "github.html",
        "daily-aihot": "aihot.html"
      };
      if (i) {
        const o = s[e];
        o ? Mt(o, o) : Mt("newtab.html", "newtab.html");
        return;
      }
      if (de.onTargetClick) {
        de.onTargetClick(e);
        return;
      }
      const n = window;
      _.activeTargetId === e ? typeof n.exitFullscreenCard == "function" && n.exitFullscreenCard() : typeof n.enterFullscreenCard == "function" && n.enterFullscreenCard(e);
      return;
    }
    if (t === "tool") {
      const s = !!document.getElementById("vue-bili-companions-root");
      if (i && !s) {
        Mt("newtab.html", "newtab.html");
        return;
      }
      if (!["todoist", "music", "siren", "wallpaper", "stickers", "sync", "chat", "multica"].includes(e) && typeof window < "u") {
        const o = window;
        typeof o.exitFullscreenCard == "function" && o.exitFullscreenCard();
      }
      if (de.onToolClick) {
        de.onToolClick(e);
        return;
      }
      Wt.toggle(e);
      return;
    }
  },
  reorderCards(t) {
    const e = new Map(_.cards.map((s) => [s.id, s])), r = [];
    for (const s of t) {
      const n = e.get(s);
      n && (r.push(n), e.delete(s));
    }
    for (const s of e.values()) r.push(s);
    _.cards = r;
    const i = zt();
    fi({ ...i, cards: r.map((s) => s.id) });
  },
  reorderTools(t) {
    const e = new Map(_.tools.map((s) => [s.id, s])), r = [];
    for (const s of t) {
      const n = e.get(s);
      n && (r.push(n), e.delete(s));
    }
    for (const s of e.values()) r.push(s);
    _.tools = r;
    const i = zt();
    fi({ ...i, tools: r.map((s) => s.id) });
  },
  setPosition(t) {
    Xr(t) && _.position !== t && (_.position = t, Qn(t), typeof window < "u" && window.dispatchEvent(new CustomEvent("logicweaver:dock-position-changed", { detail: t })));
  },
  setActions(t) {
    de = { ...de, ...t };
  }
}, E = F({
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
let Cr = null;
const G = {
  state: E,
  setMounted(t) {
    E.mounted = t;
  },
  onAction(t) {
    Cr = t;
  },
  dispatch(t, e) {
    if (Cr)
      return Cr(t, e);
  },
  openMenu(t, e, r, i) {
    E.item = t, E.isFolder = t.isFolder === !0 || !t.url, E.title = t.title || (E.isFolder ? "未命名文件夹" : t.url || ""), E.hostOrCount = i?.hostOrCount || (E.isFolder ? "浏览器文件夹" : t.url || ""), E.iconUrl = i?.iconUrl || "", E.mode = "actions", E.renameValue = t.title || "", E.noteValue = i?.note || "", i?.launcherGroups?.length && (E.launcherGroups = [...i.launcherGroups], E.selectedLauncherGroup = i.launcherGroups[0]), E.statusVisible = !1, E.statusText = "";
    const s = Math.max(10, Math.min(e, window.innerWidth - 300)), n = Math.max(10, Math.min(r, window.innerHeight - 350));
    E.left = s, E.top = n, E.isOpen = !0, this.dispatch("open", { item: t, clientX: e, clientY: r });
  },
  closeMenu() {
    E.isOpen = !1, E.mode = "actions", E.item = null, this.dispatch("close");
  },
  setMode(t) {
    E.mode = t, E.statusVisible = !1, E.statusText = "", this.dispatch("set-mode", t);
  },
  setStatus(t) {
    E.statusText = t, E.statusVisible = !!t;
  },
  openBookmark() {
    this.dispatch("open-bookmark", E.item);
  },
  newSubFolder() {
    this.dispatch("new-folder", E.item);
  },
  saveToLauncher() {
    this.dispatch("save-launcher", {
      item: E.item,
      group: E.selectedLauncherGroup
    });
  },
  saveRename() {
    if (!E.renameValue.trim()) {
      this.setStatus("名称不能为空");
      return;
    }
    this.dispatch("save-rename", {
      item: E.item,
      newTitle: E.renameValue.trim()
    });
  },
  saveNote() {
    this.dispatch("save-note", {
      item: E.item,
      note: E.noteValue.trim()
    });
  },
  confirmDelete() {
    this.dispatch("delete-bookmark", E.item);
  }
}, P = _r({
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
}), Er = /* @__PURE__ */ new Set();
let Se = null;
const x = {
  state: P,
  open(t) {
    P.open = !0, t && (P.title = t);
  },
  close() {
    P.open = !1;
  },
  toggle() {
    P.open = !P.open;
  },
  setPinned(t) {
    P.pinned = !!t;
  },
  setTitle(t) {
    P.title = t;
  },
  setPosition(t) {
    P.positionLeft = t;
  },
  showFeedback(t, e = !1) {
    Se && (clearTimeout(Se), Se = null), P.feedbackText = t, P.feedbackError = e, P.feedbackVisible = !0, Se = setTimeout(() => {
      P.feedbackVisible = !1, P.feedbackText = "", P.feedbackError = !1;
    }, 2600);
  },
  hideFeedback() {
    Se && (clearTimeout(Se), Se = null), P.feedbackVisible = !1, P.feedbackText = "", P.feedbackError = !1;
  },
  setBookmarks(t, e) {
    P.items = Array.isArray(t) ? [...t] : [], e !== void 0 && (P.emptyText = e);
  },
  setSearchQuery(t) {
    P.searchQuery = t;
  },
  openBookmark(t) {
    this.dispatch("open-bookmark", t);
  },
  openContextMenu(t, e, r) {
    this.dispatch("context-menu", { item: t, clientX: e, clientY: r });
  },
  updateState(t) {
    Object.assign(P, t);
  },
  onAction(t) {
    return Er.add(t), () => {
      Er.delete(t);
    };
  },
  dispatch(t, e) {
    for (const r of Er)
      try {
        r(t, e);
      } catch (i) {
        console.error(`[BookmarkPanel] Handler error for action ${t}:`, i);
      }
  }
}, Zn = F({
  mounted: !1,
  enabled: !1,
  folders: [],
  emptyMessage: "书签栏没有文件夹"
}), tt = Zn;
let Ir = null;
const Lt = {
  state: tt,
  setMounted(t) {
    tt.mounted = t;
  },
  updateState(t) {
    Object.assign(tt, t);
  },
  setEnabled(t) {
    tt.enabled = t;
  },
  setFolders(t) {
    tt.folders = Array.isArray(t) ? [...t] : [];
  },
  onAction(t) {
    Ir = t;
  },
  dispatch(t, e) {
    if (Ir)
      return Ir(t, e);
  },
  openFolder(t) {
    this.dispatch("open-folder", { id: t });
  },
  openContextMenu(t, e, r) {
    this.dispatch("context-menu", { folder: t, clientX: e, clientY: r });
  }
}, eo = "bookmarkPanelPinnedV1";
function Le(t) {
  if (!t) return "";
  if (typeof window.hostOf == "function") return window.hostOf(t);
  try {
    return new URL(t).hostname;
  } catch {
    return t;
  }
}
function to(t) {
  return t ? typeof window.favi == "function" ? window.favi(t) : `chrome-extension://${chrome?.runtime?.id || ""}/_favicon/?pageUrl=${encodeURIComponent(t)}&size=32` : "";
}
function Nt(t) {
  return typeof window.storageGet == "function" ? window.storageGet(t) : new Promise((e) => {
    typeof chrome < "u" && chrome?.storage?.local?.get ? chrome.storage.local.get(t, e) : e({});
  });
}
function Ar(t) {
  return typeof window.storageSet == "function" ? window.storageSet(t) : new Promise((e) => {
    typeof chrome < "u" && chrome?.storage?.local?.set ? chrome.storage.local.set(t, () => e()) : e();
  });
}
async function mi(t, e = {}, r = 5e3) {
  if (typeof window.fetchTimeout == "function")
    return window.fetchTimeout(t, e, r);
  const i = new AbortController(), s = setTimeout(() => i.abort(), r);
  try {
    return await fetch(t, { credentials: "omit", ...e, signal: i.signal });
  } finally {
    clearTimeout(s);
  }
}
class ro {
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
        const e = await Nt(["showBookmarkFoldersTop", "showBookmarkPanel", "bookmarkRemarks"]).catch(() => ({}));
        this.importState.remarks = e?.bookmarkRemarks || {};
        const r = e?.showBookmarkFoldersTop === !0, i = e?.showBookmarkPanel !== !1;
        await this.ensureBookmarkData(), await this.renderTopBookmarkFolderStrip(r && i);
      } catch (e) {
        console.warn("[BookmarksService] Failed to initialize bookmarks", e);
      }
      typeof chrome < "u" && chrome?.storage?.onChanged && chrome.storage.onChanged.addListener((e, r) => {
        r === "local" && (e.showBookmarkFoldersTop || e.showBookmarkPanel) && Nt(["showBookmarkFoldersTop", "showBookmarkPanel"]).then((i) => {
          const s = i?.showBookmarkFoldersTop === !0, n = i?.showBookmarkPanel !== !1;
          this.renderTopBookmarkFolderStrip(s && n);
        });
      });
    }
  }
  initWorker() {
    if (!(typeof Worker > "u"))
      try {
        this.worker = new Worker("generated/bookmarks-worker.js"), this.worker.onmessage = (e) => {
          const { id: r, type: i, result: s, error: n } = e.data || {};
          if (!r || !this.workerPending.has(r)) return;
          const { resolve: o, reject: a } = this.workerPending.get(r);
          this.workerPending.delete(r), n ? a(new Error(n)) : o(s);
        }, this.worker.onerror = () => {
          for (const e of [...this.workerPending.values()]) e.reject(new Error("Bookmarks Worker failed"));
        }, this.importState.loaded && (this.workerReady = this.callWorker("INDEX_BOOKMARKS", { tree: this.importState.tree ? [this.importState.tree] : [] }), this.workerReady.catch(() => {
        }));
      } catch (e) {
        console.warn("[BookmarksWorker] Failed to initialize Web Worker:", e), this.worker = null;
      }
  }
  callWorker(e, r, i = 5e3, s) {
    return s?.aborted ? Promise.reject(new DOMException("Cancelled", "AbortError")) : (this.worker || this.initWorker(), this.worker ? new Promise((n, o) => {
      const a = ++this.workerSeq, c = () => {
        clearTimeout(m), s?.removeEventListener("abort", d), this.workerPending.delete(a);
      }, l = {
        resolve: (h) => {
          c(), n(h);
        },
        reject: (h) => {
          c(), o(h);
        }
      }, d = () => l.reject(new DOMException("Cancelled", "AbortError")), m = setTimeout(() => l.reject(new Error(`Worker request timeout [${e}]`)), i);
      this.workerPending.set(a, l), s?.addEventListener("abort", d, { once: !0 });
      try {
        this.worker.postMessage({ id: a, type: e, payload: r });
      } catch (h) {
        l.reject(h);
      }
    }) : Promise.reject(new Error("Bookmarks Worker not available")));
  }
  // null means unavailable/failed; [] is a successful search with no matches.
  async searchBookmarksViaWorker(e, r = 30, i) {
    if (i?.aborted) throw new DOMException("Cancelled", "AbortError");
    if (this.worker || this.initWorker(), !this.worker) return null;
    try {
      if (await this.ensureBookmarkData(), i?.aborted) throw new DOMException("Cancelled", "AbortError");
      this.workerReady && await this.workerReady;
      const s = await this.callWorker("SEARCH_BOOKMARKS", { query: e, limit: r }, 5e3, i);
      return Array.isArray(s) ? s : null;
    } catch {
      if (i?.aborted) throw new DOMException("Cancelled", "AbortError");
      return null;
    }
  }
  collectBookmarks(e, r = [], i = [], s = []) {
    let n = e.title || "";
    !n && (e.id === "1" || e.id === "2" || e.id === "3") && (n = e.id === "1" ? "书签栏" : e.id === "2" ? "其他书签" : "移动设备书签");
    const o = n ? [...r, n] : r, a = e.id && e.id !== "0" ? [...s, String(e.id)] : s;
    for (const c of e.children || [])
      c.url ? i.push({
        id: c.id,
        parentId: c.parentId,
        index: c.index,
        title: c.title || Le(c.url),
        url: c.url,
        folder: o.join(" / ") || "书签",
        folderIds: a
      }) : this.collectBookmarks(c, o, i, a);
    return i;
  }
  getBookmarkFolderMap() {
    if (this.folderMapCache && this.importState.loaded)
      return this.folderMapCache;
    const e = /* @__PURE__ */ new Map();
    for (const r of this.importState.items)
      e.set(String(r.id), { folder: r.folder, folderIds: r.folderIds });
    return this.folderMapCache = e, e;
  }
  async getIgnoredFolders() {
    const r = (await Nt(["searchIgnoredBookmarkFolders"]).catch(() => ({})))?.searchIgnoredBookmarkFolders;
    return this.ignoredFoldersCache = Array.isArray(r) ? r : [], this.ignoredFoldersCache;
  }
  isBookmarkIgnored(e, r, i) {
    if (!r || !r.length) return !1;
    const s = /* @__PURE__ */ new Set(), n = [], o = [], a = (h) => h ? h.toLowerCase().trim().replace(/\s*[/／]\s*/g, "/").replace(/^(书签栏|收藏夹栏|bookmarks bar|favorites bar|书签|bookmarks|其他书签|other bookmarks|移动设备书签|mobile bookmarks)\//i, "").trim() : "";
    for (const h of r)
      if (typeof h == "string") {
        s.add(h);
        const g = h.toLowerCase().trim();
        n.push(g), o.push(a(g));
      } else if (h && typeof h == "object" && (h.id && s.add(String(h.id)), h.path)) {
        const g = h.path.trim().toLowerCase();
        n.push(g), o.push(a(g));
      }
    const c = String(e.id || ""), l = String(e.parentId || "");
    if (c && s.has(c) || l && s.has(l) || e.folderIds && e.folderIds.some((h) => s.has(String(h))))
      return !0;
    const d = (h) => {
      if (!h) return !1;
      const g = h.toLowerCase().trim(), k = a(g);
      if (n.some((b) => g === b || g.startsWith(b + " /") || g.startsWith(b + "/")) || o.some((b) => b && (k === b || k.startsWith(b + "/"))))
        return !0;
      for (const b of o) {
        if (!b) continue;
        const I = b.split("/").pop();
        if (I && (k === I || k.endsWith("/" + I) || k.includes("/" + I + "/")))
          return !0;
      }
      return !1;
    }, m = i || (this.folderMapCache ?? void 0);
    if (m && c && m.has(c)) {
      const h = m.get(c);
      if (h.folderIds && h.folderIds.some((g) => s.has(String(g))) || h.folder && d(h.folder))
        return !0;
    }
    return !!(e.folder && d(e.folder));
  }
  bookmarkBarRoot(e) {
    return e && ((e.children || []).find((r) => String(r.id) === "1") || (e.children || []).find((r) => /书签栏|收藏夹栏|bookmarks bar|favorites bar/i.test(r.title || "")) || e.children?.[0]) || null;
  }
  bookmarkNodeById(e, r) {
    if (!e) return null;
    if (String(e.id) === String(r)) return e;
    for (const i of e.children || []) {
      const s = this.bookmarkNodeById(i, r);
      if (s) return s;
    }
    return null;
  }
  bookmarkNodeContains(e, r) {
    return e ? (e.children || []).some(
      (i) => String(i.id) === String(r) || this.bookmarkNodeContains(i, r)
    ) : !1;
  }
  countBookmarkLinks(e) {
    return e ? (e.children || []).reduce(
      (r, i) => r + (i.url ? 1 : this.countBookmarkLinks(i)),
      0
    ) : 0;
  }
  getChildrenOfFolder(e) {
    const r = this.bookmarkNodeById(this.importState.tree, e);
    return !r || !Array.isArray(r.children) ? [] : r.children.map((i) => ({
      id: String(i.id),
      title: i.title || i.url || "未命名",
      url: i.url,
      isFolder: !i.url,
      parentId: i.parentId
    }));
  }
  async loadBookmarks() {
    await this.ensureBookmarkData();
  }
  async ensureBookmarkData() {
    this.importState.loaded || (this.dataPromise || (this.dataPromise = (async () => {
      const e = await Nt(["bookmarkRemarks"]).catch(() => ({}));
      this.importState.remarks = e?.bookmarkRemarks || {};
      let r = [];
      typeof chrome < "u" && chrome?.bookmarks?.getTree && (r = await new Promise((i) => chrome.bookmarks.getTree(i))), this.importState.tree = r?.[0] || null, this.importState.tree ? this.importState.items = this.collectBookmarks(this.importState.tree, [], []).sort(
        (i, s) => i.folder.localeCompare(s.folder, "zh") || i.title.localeCompare(s.title, "zh")
      ) : this.importState.items = [], this.importState.loaded = !0, this.worker && (this.workerReady = this.callWorker("INDEX_BOOKMARKS", { tree: r || [] }), this.workerReady.catch(() => {
      }));
    })().finally(() => {
      this.dataPromise = null;
    })), await this.dataPromise);
  }
  async reloadBookmarkTree() {
    let e = [];
    typeof chrome < "u" && chrome?.bookmarks?.getTree && (e = await new Promise((r) => chrome.bookmarks.getTree(r))), this.importState.tree = e?.[0] || null, this.importState.tree ? this.importState.items = this.collectBookmarks(this.importState.tree, [], []).sort(
      (r, i) => r.folder.localeCompare(i.folder, "zh") || r.title.localeCompare(i.title, "zh")
    ) : this.importState.items = [], this.importState.loaded = !0, this.folderMapCache = null, this.worker && (this.workerReady = this.callWorker("INDEX_BOOKMARKS", { tree: e || [] }), this.workerReady.catch(() => {
    })), this.renderBookmarkImports(), this.topBookmarkFoldersEnabled && await this.renderTopBookmarkFolderStrip(!0);
  }
  async renderTopBookmarkFolderStrip(e = this.topBookmarkFoldersEnabled) {
    this.topBookmarkFoldersEnabled = !!e, Lt.setEnabled(this.topBookmarkFoldersEnabled);
    const r = document.getElementById("bookmark-folder-strip"), i = document.getElementById("bookmark-handle"), s = document.querySelector(".topbar");
    if (i && (i.hidden = this.topBookmarkFoldersEnabled), r && (r.hidden = !this.topBookmarkFoldersEnabled), s?.classList.toggle("bookmark-folders-mode", this.topBookmarkFoldersEnabled), !this.topBookmarkFoldersEnabled) {
      Lt.setFolders([]);
      return;
    }
    let n = [];
    typeof chrome < "u" && chrome?.bookmarks?.getTree && (n = await new Promise((d) => chrome.bookmarks.getTree(d)));
    const o = this.bookmarkBarRoot(n?.[0] || null), a = await this.getIgnoredFolders(), c = this.getBookmarkFolderMap(), l = (o?.children || []).filter((d) => !(d.url || this.isBookmarkIgnored(d, a, c)));
    if (Lt.setFolders(
      l.map((d) => ({ id: String(d.id), title: d.title || "未命名", parentId: d.parentId }))
    ), !this.topBookmarkEventsBound && typeof chrome < "u" && chrome?.bookmarks) {
      this.topBookmarkEventsBound = !0;
      const d = () => {
        this.importState.loaded = !1, this.topBookmarkFoldersEnabled && this.renderTopBookmarkFolderStrip(!0);
      };
      chrome.bookmarks.onCreated?.addListener(d), chrome.bookmarks.onRemoved?.addListener(d), chrome.bookmarks.onMoved?.addListener(d), chrome.bookmarks.onChildrenReordered?.addListener(d);
    }
  }
  toggleFolderExpand(e) {
    const r = String(e || "");
    this.importState.expandedFolders.has(r) ? this.importState.expandedFolders.delete(r) : this.importState.expandedFolders.add(r), this.renderBookmarkImports();
  }
  async renderBookmarkImports(e = "") {
    const r = e.trim().toLowerCase(), i = await this.getIgnoredFolders(), s = this.getBookmarkFolderMap(), n = this.importState.items.filter(
      (o) => !this.isBookmarkIgnored(o, i, s)
    );
    if (!n.length)
      x.setBookmarks([], "书签栏为空");
    else if (r) {
      const o = n.filter(
        (a) => `${a.title} ${a.url} ${a.folder}`.toLowerCase().includes(r)
      );
      x.setBookmarks(
        o.slice(0, 80).map((a) => ({
          id: String(a.id),
          title: a.title || a.url,
          url: a.url,
          folder: a.folder,
          isFolder: !1
        })),
        o.length ? "" : "没有匹配的书签"
      );
    } else {
      const a = (this.importState.focusFolderId ? this.bookmarkNodeById(this.importState.tree, this.importState.focusFolderId) : null)?.children || this.importState.tree?.children || [], c = (l, d = 0) => {
        const m = [];
        for (const h of l) {
          if (this.isBookmarkIgnored(h, i, s)) continue;
          const g = !h.url, k = g && this.importState.expandedFolders.has(String(h.id));
          m.push({
            id: String(h.id),
            title: h.title || h.url || "未命名",
            url: h.url,
            isFolder: g,
            level: d,
            expanded: k,
            parentId: h.parentId
          }), g && k && Array.isArray(h.children) && m.push(...c(h.children, d + 1));
        }
        return m;
      };
      x.setBookmarks(c(a));
    }
  }
  async openBookmarkFolderWindow(e) {
    await this.ensureBookmarkData();
    const r = String(e || ""), i = this.bookmarkNodeById(this.importState.tree, r);
    if (!i || i.url) {
      x.showFeedback("这个书签页不存在", !0);
      return;
    }
    if (this.importState.focusFolderId === r && x.state.open) {
      this.closeBookmarkPanel();
      return;
    }
    await this.openBookmarkPanel(r);
  }
  async openBookmarkPanel(e = "", r = null) {
    this.importState.focusFolderId = String(e || ""), this.importState.expandedFolders.clear(), this.applyBookmarkPanelPosition(this.importState.focusFolderId, r);
    const i = document.getElementById("bookmark-handle");
    i?.setAttribute("aria-expanded", "true"), i && (i.title = "收起浏览器书签");
    const s = document.getElementById("bookmark-handle-icon");
    s && (s.textContent = "📂"), await this.ensureBookmarkData();
    const n = this.importState.focusFolderId ? this.bookmarkNodeById(this.importState.tree, this.importState.focusFolderId) : null;
    this.importState.focusFolderId && !n && (this.importState.focusFolderId = "");
    const o = n ? `书签 · ${n.title || "文件夹"}` : "浏览器书签";
    x.open(o), x.setPinned(this.importState.panelPinned), this.renderBookmarkImports();
  }
  closeBookmarkPanel() {
    this.importState.expandedFolders.clear();
    const e = document.getElementById("bookmark-handle");
    e?.setAttribute("aria-expanded", "false"), e && (e.title = "展开浏览器书签");
    const r = document.getElementById("bookmark-handle-icon");
    r && (r.textContent = "📁"), x.close();
  }
  toggleBookmarkPanel() {
    x.state.open ? this.closeBookmarkPanel() : this.openBookmarkPanel();
  }
  setBookmarkPanelPinned(e, r = !0) {
    this.importState.panelPinned = !!e, r && Ar({ [eo]: this.importState.panelPinned }), x.setPinned(this.importState.panelPinned);
  }
  applyBookmarkPanelPosition(e = null, r = null) {
    const i = String(e ?? this.importState.focusFolderId ?? ""), s = r || (i ? document.querySelector(`.bookmark-folder-chip[data-bookmark-folder-id="${i}"]`) : null) || document.getElementById("bookmark-handle");
    if (s && s.offsetParent !== null) {
      const n = s.getBoundingClientRect(), a = Math.max(8, Math.min(window.innerWidth - 310 - 8, Math.round(n.left)));
      x.setPosition(a);
    } else
      x.setPosition(null);
  }
  openBookmarkNoteMenu(e, r, i) {
    if (!e) return;
    const s = e.isFolder === !0 || !e.url;
    this.editingItem = { ...e, isFolder: s }, G.setMode("actions");
    const n = ve.getPageNames().map((l) => ({
      id: l,
      name: ve.getPageLabel(l)
    })), o = s ? `${this.countBookmarkLinks(this.bookmarkNodeById(this.importState.tree, e.id))} 个书签 · 浏览器文件夹` : Le(e.url), a = s ? "" : to(e.url), c = s ? "" : this.importState.remarks?.[e.url] || "";
    G.openMenu(e, r, i, {
      hostOrCount: o,
      iconUrl: a,
      note: c,
      launcherGroups: n.map((l) => l.name)
    });
  }
  async saveBookmarkRename(e) {
    const r = this.editingItem;
    if (!r) return;
    const i = (e ?? "").trim();
    if (!i) {
      G.setStatus("名称不能为空");
      return;
    }
    if (i === (r.title || "").trim()) {
      G.closeMenu();
      return;
    }
    try {
      await this.bookmarkApiUpdate(r.id, { title: i }), G.closeMenu(), await this.reloadBookmarkTree(), x.showFeedback(`已将${r.isFolder ? "文件夹" : "书签"}重命名为「${i}」`);
    } catch (s) {
      G.setStatus(s.message || `重命名${r.isFolder ? "文件夹" : "书签"}失败`);
    }
  }
  async saveBookmarkNote(e) {
    const r = this.editingItem;
    if (!r || !r.url) return;
    const i = String(e ?? "").trim();
    i ? this.importState.remarks[r.url] = i : delete this.importState.remarks[r.url], await Ar({ bookmarkRemarks: this.importState.remarks }), G.closeMenu(), this.renderBookmarkImports();
  }
  async deleteBookmarkFromContextMenu() {
    const e = this.editingItem;
    if (e)
      try {
        await this.bookmarkApiRemove(e.id, e.isFolder), !e.isFolder && e.url && (delete this.importState.remarks[e.url], await Ar({ bookmarkRemarks: this.importState.remarks })), G.closeMenu(), await this.reloadBookmarkTree(), x.showFeedback(`已删除${e.isFolder ? "文件夹" : "书签"}「${e.title || Le(e.url)}」`);
      } catch (r) {
        G.setStatus(r.message || `删除${e.isFolder ? "文件夹" : "书签"}失败`);
      }
  }
  async saveBookmarkToLauncher(e) {
    const r = this.editingItem;
    if (!r || !r.url) return;
    const i = e || "常用网站";
    try {
      await ve.ready;
      const s = new URL(ve.normalizeUrl(r.url));
      if (s.protocol !== "http:" && s.protocol !== "https:") throw new Error("仅支持 HTTP/HTTPS 网站");
      await ve.addLink({ title: r.title, url: s.href, group: "常用网站", page: i }), G.closeMenu(), x.showFeedback(`已将「${r.title || r.url}」添加到常用网站`);
    } catch (s) {
      x.showFeedback(s.message || "添加到常用网站失败", !0);
    }
  }
  bookmarkApiMove(e, r) {
    return new Promise((i, s) => {
      if (typeof chrome > "u" || !chrome.bookmarks?.move)
        return i(null);
      chrome.bookmarks.move(String(e), r, (n) => {
        const o = chrome.runtime.lastError;
        o ? s(new Error(o.message)) : i(n);
      });
    });
  }
  bookmarkApiCreate(e) {
    return new Promise((r, i) => {
      if (typeof chrome > "u" || !chrome.bookmarks?.create)
        return r(null);
      chrome.bookmarks.create(e, (s) => {
        const n = chrome.runtime.lastError;
        n ? i(new Error(n.message)) : r(s);
      });
    });
  }
  bookmarkApiUpdate(e, r) {
    return new Promise((i, s) => {
      if (typeof chrome > "u" || !chrome.bookmarks?.update)
        return i(null);
      chrome.bookmarks.update(String(e), r, (n) => {
        const o = chrome.runtime.lastError;
        o ? s(new Error(o.message)) : i(n);
      });
    });
  }
  bookmarkApiRemove(e, r = !1) {
    return new Promise((i, s) => {
      if (typeof chrome > "u" || !chrome.bookmarks?.remove)
        return i();
      chrome.bookmarks[r ? "removeTree" : "remove"](String(e), () => {
        const n = chrome.runtime.lastError;
        n ? s(new Error(n.message)) : i();
      });
    });
  }
  compactBookmarkRemark(e, r) {
    e = String(e || "").replace(/\s+/g, " ").trim();
    const i = r.title || Le(r.url), s = Le(r.url), n = [], o = e.match(/^Title:\s*(.+)$/im);
    o && n.push(o[1]);
    const a = e.match(/(?:Description|摘要|简介)[:：]\s*(.{8,120})/i);
    a && n.push(a[1]);
    const c = e.split(/[。.!?\n]/).map((d) => d.trim()).filter((d) => d.length >= 8 && d.length <= 120);
    n.push(...c.slice(0, 4));
    let l = n.find((d) => !/cookie|privacy|登录|验证码|javascript|enable/i.test(d)) || `${i}：${s}`;
    return l = l.replace(/^Title:\s*/i, "").replace(/\s+/g, " ").trim(), !l.includes("：") && !l.includes(":") && (l = `${i}：${l}`), l.length > 42 ? l.slice(0, 41) + "…" : l;
  }
  async callAiForBookmarkRemark(e, r) {
    const i = e.title || Le(e.url), s = String(r || "").replace(/\s+/g, " ").slice(0, 1e3), n = ["http://127.0.0.1:11434/v1/chat/completions"], o = `请为书签【${i}】（网址: ${e.url}，网页内容摘要: ${s || "无"}）写一句简明扼要的中文备注。
要求：仅用一句话概括其核心用途与特色，严格控制在 25 字以内，不要任何多余废话或引号，直接输出一句话备注。`;
    for (const a of n)
      try {
        const c = await mi(a, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            model: "deepseek-chat",
            messages: [{ role: "user", content: o }],
            temperature: 0.3,
            max_tokens: 60
          })
        }, 3500);
        if (c.ok) {
          const d = (await c.json()).choices?.[0]?.message?.content?.trim();
          if (d && d.length >= 2 && d.length <= 45)
            return d.replace(/^["'“”‘’]|["'“”‘’]$/g, "").trim();
        }
      } catch {
      }
    return this.compactBookmarkRemark(r, e);
  }
  async analyzeBookmarkRemark(e) {
    const r = `https://r.jina.ai/${e.url}`;
    try {
      const i = await mi(r, { headers: { Accept: "text/plain" } }, 15e3), s = i.ok ? await i.text() : "";
      return await this.callAiForBookmarkRemark(e, s.slice(0, 2500));
    } catch {
      return await this.callAiForBookmarkRemark(e, "");
    }
  }
  wireListeners() {
    Lt.onAction((e, r) => {
      e === "open-folder" && r?.id ? this.openBookmarkFolderWindow(r.id) : e === "context-menu" && r?.folder && this.openBookmarkNoteMenu(
        {
          id: r.folder.id,
          parentId: r.folder.parentId,
          title: r.folder.title || "未命名",
          isFolder: !0
        },
        r.clientX,
        r.clientY
      );
    }), x.onAction((e, r) => {
      e === "toggle-pin" ? this.setBookmarkPanelPinned(r) : e === "close" ? this.closeBookmarkPanel() : e === "open-bookmark" && r ? r.isFolder ? this.toggleFolderExpand(r.id) : r.url && (typeof chrome < "u" && chrome.tabs?.create ? chrome.tabs.create({ url: r.url, active: !0 }) : window.open(r.url, "_blank")) : e === "context-menu" && r?.item && this.openBookmarkNoteMenu(r.item, r.clientX, r.clientY);
    }), G.onAction(async (e, r) => {
      if (e === "open-bookmark") {
        const i = r || this.editingItem;
        if (!i) return;
        i.isFolder ? this.openBookmarkPanel(i.id) : i.url && (typeof chrome < "u" && chrome.tabs?.create ? chrome.tabs.create({ url: i.url, active: !0 }) : window.open(i.url, "_blank")), G.closeMenu();
      } else e === "save-launcher" ? await this.saveBookmarkToLauncher(r?.group) : e === "save-rename" ? await this.saveBookmarkRename(r?.newTitle) : e === "save-note" ? await this.saveBookmarkNote(r?.note) : e === "delete-bookmark" && await this.deleteBookmarkFromContextMenu();
    });
  }
}
const rt = new ro(), z = {
  searchProviders: _r(/* @__PURE__ */ new Map()),
  menuProviders: _r(/* @__PURE__ */ new Map())
};
function io(t, e, r) {
  return new Promise((i) => {
    const s = new AbortController();
    let n = !1, o;
    const a = (l = []) => {
      n || (n = !0, clearTimeout(o), r?.removeEventListener("abort", c), i(l), s.abort());
    }, c = () => a();
    if (r?.aborted) {
      a();
      return;
    }
    r?.addEventListener("abort", c, { once: !0 }), o = setTimeout(c, 1500), Promise.resolve().then(() => n ? [] : t.provideSuggestions(e, s.signal)).then((l) => {
      if (n) return;
      const d = [];
      for (const m of Array.isArray(l) ? l.slice(0, 10) : [])
        if (!(!m || typeof m.title != "string" || typeof m.url != "string"))
          try {
            const h = new URL(m.url);
            if (!["http:", "https:"].includes(h.protocol) || h.username || h.password) continue;
            d.push({
              id: JSON.stringify(["plugin", t.id, d.length]),
              title: m.title.slice(0, 200),
              url: h.href,
              meta: typeof m.meta == "string" ? m.meta.slice(0, 300) : t.name,
              badge: { text: t.name }
            });
          } catch {
          }
      a(d);
    }).catch(() => a());
  });
}
const so = {
  // --- A. 搜索挂载槽 (Search Slot) ---
  registerSearchProvider(t) {
    if (!t.id.trim() || typeof t.provideSuggestions != "function") throw new Error("搜索提供者 ID 和函数不能为空");
    const e = { ...t };
    return z.searchProviders.set(t.id, e), () => {
      z.searchProviders.get(t.id) === e && z.searchProviders.delete(t.id);
    };
  },
  unregisterSearchProvider(t) {
    z.searchProviders.delete(t);
  },
  /** 聚合调用所有插件注册的搜索建议提供者 */
  async querySearchProviders(t, e) {
    const r = t.trim();
    if (!r) return [];
    const i = [...z.searchProviders.values()].sort((n, o) => (n.priority ?? 100) - (o.priority ?? 100)), s = await Promise.all(i.map(
      (n) => io(n, r, e)
    ));
    return e?.aborted ? [] : s.flatMap(
      (n, o) => z.searchProviders.get(i[o].id) === i[o] ? n : []
    ).slice(0, 40);
  },
  // --- B. 右键菜单挂载槽 (Context Menu Slot) ---
  registerMenuProvider(t) {
    if (!t.id.trim()) throw new Error("菜单提供者 ID 不能为空");
    const e = /* @__PURE__ */ new Set();
    for (const i of t.actions) {
      if (!i.id.trim() || e.has(i.id) || typeof i.execute != "function") throw new Error("菜单动作 ID 不能为空或重复，且须提供执行函数");
      e.add(i.id);
    }
    const r = { ...t, actions: t.actions.map((i) => ({ ...i })) };
    return z.menuProviders.set(t.id, r), () => {
      z.menuProviders.get(t.id) === r && z.menuProviders.delete(t.id);
    };
  },
  unregisterMenuProvider(t) {
    z.menuProviders.delete(t);
  },
  /** 获取适用于指定目标的插件右键菜单动作 */
  getMenuActionsForTarget(t) {
    const e = [];
    for (const r of z.menuProviders.values())
      for (const i of r.actions) {
        const s = i.targetKind || "all";
        if (s === "all" || s === t.kind) {
          const n = () => z.menuProviders.get(r.id) === r;
          e.push({
            ...i,
            id: JSON.stringify([r.id, i.id]),
            disabled: (o) => {
              if (!n()) return !0;
              try {
                return !!i.disabled?.({ ...o, source: t.source });
              } catch {
                return !0;
              }
            },
            execute: (o) => {
              const a = { ...o, source: t.source };
              if (!(!n() || i.disabled?.(a)))
                return i.execute(a);
            }
          });
        }
      }
    return e;
  }
};
function $t(t) {
  try {
    const e = new URL(t.trim());
    return !["http:", "https:", "ftp:", "file:", "chrome:", "edge:", "about:"].includes(e.protocol) || e.username || e.password ? "" : e.href;
  } catch {
    return "";
  }
}
function no(t, e, r) {
  const i = hs(t, e, r);
  if (typeof i == "number" && i > 0) return i;
  const s = (h) => h.normalize("NFKC").toLowerCase().trim(), n = s(t), o = s(e), a = s(r);
  if (!n) return 0;
  const c = o === n ? 100 : o.startsWith(n) ? 85 : o.includes(n) ? 70 : 0;
  let l = "";
  try {
    l = new URL(r).hostname.replace(/^www\./, "").toLowerCase();
  } catch {
  }
  const d = l === n ? 95 : l.startsWith(n) ? 80 : a.includes(n) ? 60 : 0;
  if (c || d) return Math.max(c, d);
  const m = n.split(/\s+/).filter(Boolean);
  return m.length > 1 && m.every((h) => o.includes(h)) ? 55 : m.length > 1 && m.every((h) => (o + " " + a).includes(h)) ? 45 : 0;
}
function oo(t, e, r = 40) {
  const i = /* @__PURE__ */ new Map();
  for (const s of e) {
    const { item: n } = s, o = n.url ? $t(n.url) : s.source === "plugin" ? "plugin:" + n.id : "";
    if (!o) continue;
    const a = no(t, n.title || "", n.url || "") || (s.fuzzyMatch ? 15 : 0);
    if (!a) continue;
    const c = i.get(o);
    c ? (c.sources.add(s.source), c.visitedAt = Math.max(c.visitedAt, s.visitedAt || 0), c.score = Math.max(c.score, a), c.candidate.source === "history" && s.source !== "history" && (c.candidate = s), s.item.launcherLinkId && !c.candidate.item.launcherLinkId && (c.candidate.item.launcherLinkId = s.item.launcherLinkId), s.item.bookmarkId && !c.candidate.item.bookmarkId && (c.candidate.item.bookmarkId = s.item.bookmarkId)) : i.set(o, { candidate: s, score: a, visitedAt: s.visitedAt || 0, sources: /* @__PURE__ */ new Set([s.source]), order: i.size });
  }
  return [...i.values()].sort((s, n) => n.score - s.score || n.visitedAt - s.visitedAt || s.order - n.order).slice(0, r).map(({ candidate: s, sources: n }) => {
    const o = [n.has("launcher") ? "常用网站" : "", n.has("bookmark") ? "书签" : "", n.has("history") ? "历史" : ""].filter(Boolean);
    return {
      ...s.item,
      badge: o.length ? { ...s.item.badge, text: o.join(" · ") } : s.item.badge,
      sources: Array.from(n),
      launcherLinkId: s.item.launcherLinkId,
      bookmarkId: s.item.bookmarkId
    };
  });
}
function aa(t) {
  const e = Math.max(0, Math.floor(t || 0)), r = Math.floor(e / 60), i = e % 60;
  return `${r}:${String(i).padStart(2, "0")}`;
}
function Tr(t) {
  const e = Number(t || 0);
  return !Number.isFinite(e) || e <= 0 ? "0" : e >= 1e8 ? `${(e / 1e8).toFixed(1).replace(/\.0$/, "")}亿` : e >= 1e4 ? `${(e / 1e4).toFixed(1).replace(/\.0$/, "")}万` : String(e);
}
function ca(t) {
  const e = Math.max(0, Math.floor(t || 0)), r = Math.floor(e / 60), i = e % 60, s = (n) => String(n).padStart(2, "0");
  if (r >= 60) {
    const n = Math.floor(r / 60), o = r % 60;
    return `${s(n)}:${s(o)}:${s(i)}`;
  }
  return `${s(r)}:${s(i)}`;
}
function la(t) {
  if (!t) return 0;
  const e = String(t).split(":").map(Number);
  return e.length === 2 ? (e[0] || 0) * 60 + (e[1] || 0) : e.length === 3 ? (e[0] || 0) * 3600 + (e[1] || 0) * 60 + (e[2] || 0) : Number(t) || 0;
}
function ua(t) {
  const e = String(t || "").split(/\r?\r\n/).map((n) => n.replace(/\s+/g, " ").trim()).filter(Boolean), r = e.filter((n, o) => o === 0 || n !== e[o - 1]).map((n) => /[。！？!?；;：:，,、…”’）》】）]$/.test(n) ? n : /^(为什么|为何|怎么|如何|什么|是否|谁|哪[个里])/.test(n) || /(吗|么|呢|为何|为什么|怎么|如何|多少|什么|哪[个里]|是否)$/.test(n) ? `${n}？` : `${n}。`), i = [];
  let s = "";
  return r.forEach((n) => {
    s += n, s.length >= 450 && (i.push(s), s = "");
  }), s && i.push(s), i;
}
const Br = F({
  bilibili: null,
  github: null,
  netease: null
});
let ao = 0;
function co(t, e) {
  const r = e.trim();
  r && (Br[t] = { id: ++ao, keyword: r });
}
function da(t) {
  const e = Br[t];
  return Br[t] = null, e;
}
const is = "tab-project:quick-workspace-search", $r = "tab-project:quick-workspace-search:v1";
function Dr(t) {
  if (!t || !["bilibili", "github", "netease"].includes(t.target) || typeof t.keyword != "string") return null;
  const e = t.keyword.trim();
  if (!e || e.length > 1024) return null;
  const r = { target: t.target, keyword: e };
  return t.target === "github" && ["exact", "fuzzy", "topic", "smart"].includes(t.githubRule) && (r.githubRule = t.githubRule), r;
}
function gi() {
  return typeof location < "u" && location.pathname.endsWith("/newtab-search.html");
}
async function lo(t) {
  const e = Dr(t);
  if (!e) throw new Error("搜索内容无效或过长。");
  const r = chrome.runtime.getURL("newtab.html");
  let i = [];
  try {
    i = await chrome.tabs.query({});
  } catch {
  }
  const s = i.filter((n) => Number.isInteger(n.id) && typeof n.url == "string" && n.url.split(/[?#]/, 1)[0] === r).sort((n, o) => (o.lastAccessed || 0) - (n.lastAccessed || 0));
  for (const n of s) {
    const o = Date.now() + 1500;
    let a;
    try {
      a = await Promise.race([
        chrome.runtime.sendMessage({ type: is, targetTabId: n.id, expires: o, request: e }),
        new Promise((c) => setTimeout(() => c(null), 1500))
      ]);
    } catch {
    }
    if (a?.ok === !0) {
      try {
        n.windowId != null && await chrome.windows.update(n.windowId, { focused: !0 }), await chrome.tabs.update(n.id, { active: !0 });
      } catch {
        throw new Error("搜索已发送到主标签页，但未能切换过去；请手动打开主标签页查看。");
      }
      return;
    }
  }
  try {
    sessionStorage.setItem($r, JSON.stringify({ request: e, expires: Date.now() + 6e4 }));
  } catch {
    throw new Error("无法保存搜索请求，请先打开主标签页重试。");
  }
  location.assign(r);
}
function ha(t) {
  let e = !0;
  const r = (i, s, n) => {
    if (i?.type !== is || s?.id !== chrome.runtime.id || typeof s?.url != "string" || s.url.split(/[?#]/, 1)[0] !== chrome.runtime.getURL("newtab-search.html")) return;
    const o = Dr(i.request);
    if (!(!o || !Number.isInteger(i.targetTabId) || typeof i.expires != "number" || i.expires <= Date.now() || i.expires > Date.now() + 5e3))
      return chrome.tabs.getCurrent().then((a) => {
        !e || a?.id !== i.targetTabId || Date.now() >= i.expires || (t(o), n({ ok: !0 }));
      }).catch(() => {
      }), !0;
  };
  chrome.runtime.onMessage.addListener(r);
  try {
    const i = sessionStorage.getItem($r);
    if (i) {
      sessionStorage.removeItem($r);
      const s = JSON.parse(i), n = Dr(s?.request);
      n && typeof s.expires == "number" && s.expires > Date.now() && s.expires <= Date.now() + 6e4 && t(n);
    }
  } catch {
  }
  return () => {
    e = !1, chrome.runtime.onMessage.removeListener(r);
  };
}
const uo = [
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
], Q = [
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
], Ce = "tab_project_search_slots", B = Ge(ho());
function ho() {
  if (typeof localStorage > "u")
    return JSON.parse(JSON.stringify(Q));
  try {
    const t = localStorage.getItem(Ce);
    if (t) {
      const e = JSON.parse(t);
      if (Array.isArray(e) && e.length > 0) {
        const r = e.map((i) => {
          const s = Q.find((n) => n.id === i.id);
          return s ? {
            ...s,
            ...i,
            isBuiltin: !0
          } : {
            ...i,
            isBuiltin: !1
          };
        });
        if (!r.some((i) => i.enabled))
          for (const i of r)
            i.isBuiltin && (i.enabled = !0);
        return r.some((i) => i.id === "netease") || r.push({ ...Q.find((i) => i.id === "netease") }), r.length ? r : JSON.parse(JSON.stringify(Q));
      }
    }
  } catch (t) {
    console.warn("[SearchSlots] Failed to parse stored slots:", t);
  }
  return JSON.parse(JSON.stringify(Q));
}
typeof chrome < "u" && chrome.storage?.local && chrome.storage.local.get([Ce], (t) => {
  if (t?.[Ce] && Array.isArray(t[Ce])) {
    const e = t[Ce];
    if (e.length > 0) {
      const r = e.map((i) => {
        const s = Q.find((n) => n.id === i.id);
        return s ? {
          ...s,
          ...i,
          isBuiltin: !0
        } : {
          ...i,
          isBuiltin: !1
        };
      });
      if (!r.some((i) => i.enabled))
        for (const i of r)
          i.isBuiltin && (i.enabled = !0);
      r.some((i) => i.id === "netease") || r.push({ ...Q.find((i) => i.id === "netease") }), B.value = r.length ? r : JSON.parse(JSON.stringify(Q));
    }
  }
});
const Fr = jr(() => {
  const t = B.value.filter((e) => e.enabled);
  return t.length > 0 ? t : Q.slice(0, 1);
});
function kt() {
  const t = JSON.parse(JSON.stringify(B.value)), e = JSON.stringify(t);
  try {
    typeof localStorage < "u" && localStorage.setItem(Ce, e);
  } catch {
  }
  if (typeof chrome < "u" && chrome.storage?.local)
    try {
      chrome.storage.local.set({ [Ce]: t });
    } catch {
    }
  typeof window < "u" && window.dispatchEvent(new CustomEvent("tab-project:search-slots-updated", {
    detail: t
  }));
}
function fo(t) {
  const e = `custom_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`, r = {
    ...t,
    id: e,
    enabled: !0,
    isBuiltin: !1
  };
  return B.value.push(r), kt(), r;
}
function mo(t) {
  const e = B.value.findIndex((r) => r.id === t);
  e !== -1 && (B.value[e].isBuiltin ? B.value[e].enabled = !1 : B.value.splice(e, 1), kt());
}
function go(t, e) {
  const r = B.value.findIndex((n) => n.id === t);
  if (r === -1) return;
  const i = e === "up" ? r - 1 : r + 1;
  if (i < 0 || i >= B.value.length) return;
  const [s] = B.value.splice(r, 1);
  B.value.splice(i, 0, s), kt();
}
function po() {
  B.value = JSON.parse(JSON.stringify(Q)), kt();
}
function Dt(t, e) {
  if (t.id === "web")
    return qr().buildUrl(e);
  const r = t.searchUrl || "https://www.bing.com/search?q={query}", i = encodeURIComponent(e.trim());
  return r.includes("{query}") ? r.replace(/\{query\}/g, i) : r.includes("%s") ? r.replace(/%s/g, i) : `${r}${r.includes("?") ? "&" : "?"}q=${i}`;
}
const yo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  DEFAULT_BUILTIN_SLOTS: Q,
  SEARCH_SLOT_TEMPLATES: uo,
  addSearchSlot: fo,
  buildSlotSearchUrl: Dt,
  deleteSearchSlot: mo,
  enabledSearchSlots: Fr,
  moveSearchSlot: go,
  persistSlots: kt,
  resetSearchSlotsToDefault: po,
  searchSlots: B
}, Symbol.toStringTag, { value: "Module" })), pi = "logicweaverLauncherSearchMode", yi = ["web", "bilibili", "github", "netease", "qcc"], wi = [
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
], Ur = {
  bing: {
    id: "bing",
    name: "Bing 必应",
    shortName: "Bing",
    badgeClass: "badge-bing",
    buildUrl: (t) => `https://www.bing.com/search?q=${encodeURIComponent(t)}`
  },
  google: {
    id: "google",
    name: "Google 谷歌",
    shortName: "Google",
    badgeClass: "badge-google",
    buildUrl: (t) => `https://www.google.com/search?q=${encodeURIComponent(t)}`
  },
  baidu: {
    id: "baidu",
    name: "Baidu 百度",
    shortName: "百度",
    badgeClass: "badge-baidu",
    buildUrl: (t) => `https://www.baidu.com/s?wd=${encodeURIComponent(t)}`
  },
  duckduckgo: {
    id: "duckduckgo",
    name: "DuckDuckGo",
    shortName: "DDG",
    badgeClass: "badge-ddg",
    buildUrl: (t) => `https://duckduckgo.com/?q=${encodeURIComponent(t)}`
  }
};
function qr() {
  try {
    const t = (typeof localStorage < "u" ? localStorage.getItem("searchEngine") : null) || "bing";
    if (t && Ur[t]) return Ur[t];
  } catch {
  }
  return Ur.bing;
}
typeof window < "u" && window.addEventListener("logicweaver:search-engine-updated", (t) => {
  if (t?.detail && typeof localStorage < "u")
    try {
      localStorage.setItem("searchEngine", t.detail);
    } catch {
    }
});
const Pr = "logicweaver_search_click_history";
class Fe {
  constructor() {
    this.currentMode = "web", this.suggestionEpoch = 0, this.suggestTimer = 0, this.abortController = null, this.biliRecCache = [], this.clickHistory = [], this.initHistory(), this.initMode(), this.bindController();
  }
  get webScope() {
    const e = p.query.trim();
    return /^\/bm[\s:]/i.test(e) ? "bookmarks" : /^\/sites[\s:]/i.test(e) ? "launcher" : "all";
  }
  static getInstance() {
    return Fe.instance || (Fe.instance = new Fe()), Fe.instance;
  }
  isSearchQueryUrl(e, r) {
    if (!e) return !1;
    try {
      const i = new URL(e), s = i.hostname.toLowerCase(), n = i.pathname.toLowerCase();
      if (s.includes("qcc.com") && n.includes("/search") || s.includes("bing.com") && n.includes("/search") || s.includes("google.com") && n.includes("/search") || s.includes("baidu.com") && (n.includes("/s") || n.includes("/search")) || s.includes("tianyancha.com") && n.includes("/search") || s.includes("aiqicha.baidu.com") && n.includes("/s"))
        return !0;
    } catch {
    }
    return !!(r && (/^在\s*(企查查|天眼查|爱企查|Bing|百度|Google)\s*搜索/i.test(r) || /^Bing\s*搜索/i.test(r)));
  }
  initHistory() {
    if (typeof localStorage < "u")
      try {
        const e = localStorage.getItem(Pr);
        if (e) {
          const r = JSON.parse(e);
          Array.isArray(r) && (this.clickHistory = r.filter((i) => i && typeof i.url == "string" && typeof i.title == "string" && $t(i.url) && Number.isFinite(i.visitedAt) && !this.isSearchQueryUrl(i.url, i.title)).sort((i, s) => s.visitedAt - i.visitedAt).slice(0, 30), this.clickHistory.length !== r.length && localStorage.setItem(Pr, JSON.stringify(this.clickHistory)));
        }
      } catch {
      }
  }
  recordSearchClick(e) {
    if (!e.url || !$t(e.url)) return;
    const r = e.url.trim();
    if (this.isSearchQueryUrl(r, e.title))
      return;
    this.clickHistory = this.clickHistory.filter((n) => n.url !== r);
    let i = "web";
    const s = e.badge?.text || "";
    if (s.includes("常用网站") ? i = "launcher" : s.includes("书签") ? i = "bookmark" : s.includes("提炼") && (i = "history"), this.clickHistory.unshift({
      url: r,
      title: e.title || r,
      iconSrc: e.iconSrc,
      sourceType: i,
      visitedAt: Date.now()
    }), this.clickHistory.length > 30 && (this.clickHistory = this.clickHistory.slice(0, 30)), typeof localStorage < "u")
      try {
        localStorage.setItem(Pr, JSON.stringify(this.clickHistory));
      } catch {
      }
  }
  initMode() {
    if (typeof localStorage < "u") {
      const e = localStorage.getItem(pi);
      e && yi.includes(e) && (this.currentMode = e);
    }
    v.setMode(this.currentMode);
  }
  bindController() {
    v.setCycleModeAction(() => this.cycleMode()), v.setQueryAction((e) => this.scheduleSuggestions(e)), v.setClearAction(() => this.clearSuggestions()), v.setSubmitAction((e) => this.submit(e)), v.setFocusAction(() => this.handleFocus()), v.setSuggestionClickAction((e) => this.handleSuggestionClick(e));
  }
  getMode() {
    return this.currentMode;
  }
  setMode(e) {
    !B.value.find((i) => i.id === e && i.enabled) && !yi.includes(e) && (e = Fr.value[0]?.id || "web"), this.currentMode = e, typeof localStorage < "u" && localStorage.setItem(pi, e), v.setMode(e), p.query.trim() ? this.scheduleSuggestions(p.query) : this.clearSuggestions();
  }
  cycleMode() {
    const e = Fr.value;
    if (!e || e.length === 0) return;
    const r = e.findIndex((s) => s.id === this.currentMode), i = e[(r + 1) % e.length] || e[0];
    this.setMode(i.id);
  }
  scheduleSuggestions(e) {
    clearTimeout(this.suggestTimer), this.abortController?.abort(), ++this.suggestionEpoch;
    const r = e.trim();
    if (!r) {
      this.clearSuggestions(), this.currentMode === "web" && this.loadWebRecentRecommendations();
      return;
    }
    v.setSuggestions([]), this.suggestTimer = window.setTimeout(() => {
      this.fetchSuggestions(r);
    }, 180);
  }
  handleFocus() {
    if (p.query.trim()) {
      this.currentMode === "web" && this.scheduleSuggestions(p.query);
      return;
    }
    p.query.trim() || (this.currentMode === "web" ? this.loadWebRecentRecommendations(!0) : this.currentMode === "bilibili" ? this.loadBilibiliRecommendations(!0) : this.currentMode === "github" ? this.loadGithubRecentRecommendations(!0) : this.currentMode === "netease" ? this.loadNeteaseRecentRecommendations(!0) : this.currentMode === "qcc" && this.loadQccRecommendations(!0));
  }
  clearSuggestions() {
    clearTimeout(this.suggestTimer), ++this.suggestionEpoch, this.abortController?.abort(), v.setSuggestions([]);
  }
  async loadWebRecentRecommendations(e = !1) {
    if (this.currentMode !== "web" || p.query.trim()) return;
    this.initHistory();
    const r = /* @__PURE__ */ new Set(), i = this.clickHistory.flatMap((s) => {
      const n = $t(s.url);
      return !n || r.has(n) ? [] : (r.add(n), [{
        id: `hist_${encodeURIComponent(n)}`,
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
    v.setSuggestions(i);
  }
  async loadNeteaseRecentRecommendations(e = !1) {
    const r = this.suggestionEpoch;
    let i = U.getRecentSongs();
    if (!i.length)
      try {
        i = await U.fetchAccountRecentSongs(10);
      } catch {
      }
    if (r !== this.suggestionEpoch || this.currentMode !== "netease" || p.query.trim()) return;
    if (!i.length) {
      this.clearSuggestions();
      return;
    }
    const s = i.slice(0, 10).map((n) => {
      const o = (n.artists || n.ar || []).map((a) => a.name).join(" / ") || "网易云音乐";
      return {
        id: `recent_${n.id}`,
        title: n.name,
        meta: o,
        iconSrc: n.al?.picUrl || n.album?.picUrl || "assets/netease.svg",
        url: `https://music.163.com/#/song?id=${n.id}`,
        type: "netease-play",
        rawSong: n,
        badge: { className: "badge-netease", text: "最近听过", icon: "🎵" }
      };
    });
    r === this.suggestionEpoch && !p.query.trim() && this.currentMode === "netease" && (v.setSuggestions(s), v.setSuggestionsVisible(!0));
  }
  async fetchSuggestions(e) {
    clearTimeout(this.suggestTimer), ++this.suggestionEpoch, this.abortController?.abort(), this.abortController = new AbortController();
    const r = this.abortController.signal;
    try {
      const i = e.trim();
      if (i.startsWith("/") && !i.includes(" ")) {
        const s = i.toLowerCase(), n = wi.filter((o) => o.rawCommand?.toLowerCase().startsWith(s) || o.title.toLowerCase().startsWith(s));
        v.setSuggestions(n.length > 0 ? n : wi), v.setSuggestionsVisible(!0);
        return;
      }
      if (i.startsWith("/bm ") || i.startsWith("/bm:")) {
        const s = i.replace(/^\/bm[\s:]*/i, "");
        await this.fetchWebSuggestions(s, r, "bookmarks");
      } else if (i.startsWith("/sites ") || i.startsWith("/sites:")) {
        const s = i.replace(/^\/sites[\s:]*/i, "");
        await this.fetchWebSuggestions(s, r, "launcher");
      } else this.currentMode === "bilibili" ? await this.fetchBilibiliSuggestions(e, r) : this.currentMode === "github" ? await this.fetchGithubSuggestions(e, r) : this.currentMode === "netease" ? await this.fetchNeteaseSuggestions(e, r) : this.currentMode === "qcc" ? await this.fetchQccSuggestions(e) : this.currentMode === "web" ? await this.fetchWebSuggestions(e, r) : await this.fetchCustomSlotSuggestions(e, r);
    } catch (i) {
      i.name !== "AbortError" && console.warn("[SearchService] Fetch suggestions error:", i);
    }
  }
  async fetchBilibiliSuggestions(e, r) {
    const i = `https://api.bilibili.com/x/web-interface/search/type?search_type=video&keyword=${encodeURIComponent(e)}&page=1&page_size=10`, n = await (await fetch(i, { signal: r })).json();
    if (r.aborted) return;
    const a = (Array.isArray(n?.data?.result) ? n.data.result : []).slice(0, 8).map((c) => {
      const l = c.bvid || (c.param && String(c.param).startsWith("BV") ? c.param : ""), d = (c.title || "").replace(/<[^>]+>/g, ""), m = String(c.pic || "").replace(/^http:/, "https:"), h = m.startsWith("//") ? `https:${m}` : m;
      return {
        id: l,
        title: d,
        meta: `${c.author || ""} · ${c.play ? c.play + "播放" : ""}`,
        iconSrc: h,
        url: `https://www.bilibili.com/video/${l}`,
        badge: { className: "badge-bilibili", text: "B站", icon: "📺" }
      };
    });
    a.unshift({
      id: `search-${e}`,
      title: `在 B站 搜索 “${e}”`,
      meta: "按 Enter 或点击在插件内搜索视频",
      iconSrc: "assets/bilibili.svg",
      type: "bilibili-search-trigger",
      rawQuery: e
    }), v.setSuggestions(a);
  }
  async loadBilibiliRecommendations(e = !1) {
    const r = this.suggestionEpoch;
    if (this.biliRecCache.length) {
      r === this.suggestionEpoch && !p.query.trim() && this.currentMode === "bilibili" && (v.setSuggestions(this.biliRecCache), v.setSuggestionsVisible(!0));
      return;
    }
    try {
      const s = await (await fetch("https://api.bilibili.com/x/web-interface/index/top/rcmd?fresh_type=3&feed_version=V8&fresh_idx_1h=1&fetch_row=1&fresh_idx=1&brush=1")).json();
      if (s?.code === 0 && Array.isArray(s?.data?.item)) {
        const n = s.data.item.slice(0, 6).map((o) => {
          const a = o.bvid || "", c = String(o.pic || "").replace(/^http:/, "https:"), l = c.startsWith("//") ? `https:${c}` : c, d = o.owner?.name || "";
          return {
            id: a,
            title: o.title || "",
            meta: `${d} · 推荐视频`,
            iconSrc: l,
            url: `https://www.bilibili.com/video/${a}`,
            badge: { className: "badge-bilibili", text: "B站", icon: "📺" }
          };
        });
        this.biliRecCache = n, r === this.suggestionEpoch && !p.query.trim() && this.currentMode === "bilibili" && (v.setSuggestions(n), v.setSuggestionsVisible(!0));
      }
    } catch {
    }
  }
  async getLocalGithubRepos() {
    if (Ye.repos.length > 0) return Ye.repos;
    if (typeof chrome < "u" && chrome.storage?.local)
      try {
        const r = (await chrome.storage.local.get(["ghStarredCache"]))?.ghStarredCache;
        if (r?.pages && typeof r.pages == "object") {
          const i = [];
          return Object.values(r.pages).forEach((s) => {
            Array.isArray(s) && i.push(...s);
          }), i;
        }
      } catch {
      }
    return [];
  }
  async loadGithubRecentRecommendations(e = !1) {
    const r = this.suggestionEpoch, i = await this.getLocalGithubRepos();
    if (r !== this.suggestionEpoch || this.currentMode !== "github" || p.query.trim()) return;
    if (!i.length) {
      this.clearSuggestions();
      return;
    }
    const s = i.slice(0, 8).map((n) => ({
      id: `gh-rec-${n.id || n.name}`,
      title: n.full_name || n.name,
      meta: `${n.description || "已星标仓库"} · ⭐ ${Tr(n.stargazers_count || 0)}${n.language ? " · " + n.language : ""}`,
      iconSrc: n.owner?.avatar_url || "assets/nav-github.svg",
      url: n.html_url || `https://github.com/${n.full_name || n.name}`,
      badge: { className: "badge-github", text: "星标项目", icon: "★" }
    }));
    v.setSuggestions(s), v.setSuggestionsVisible(!0);
  }
  async fetchGithubSuggestions(e, r) {
    const i = await this.getLocalGithubRepos();
    if (r.aborted) return;
    const s = e.trim().toLowerCase(), o = i.filter((h) => (h.name || h.full_name || "").toLowerCase().includes(s) || (h.description || "").toLowerCase().includes(s)).slice(0, 6).map((h) => ({
      id: String(h.id || h.name),
      title: h.full_name || h.name,
      meta: `${h.description || "已星标仓库"} · ⭐ ${Tr(h.stargazers_count || 0)}`,
      iconSrc: h.owner?.avatar_url || "assets/nav-github.svg",
      url: h.html_url || `https://github.com/${h.full_name || h.name}`,
      badge: { className: "badge-github", text: "已星标", icon: "★" }
    })), a = Ye.searchRule || "exact", c = { exact: "精确", fuzzy: "模糊", topic: "标签", smart: "智能" }, l = { exact: "🎯", fuzzy: "🌊", topic: "🏷️", smart: "✨" }, d = c[a] || "精确", m = l[a] || "🎯";
    o.unshift({
      id: `gh-search-${e}`,
      title: `在 GitHub 搜索 “${e}”`,
      meta: "按 Enter 或点击在插件内搜索仓库",
      iconSrc: "assets/nav-github.svg",
      type: "github-search-trigger",
      rawQuery: e,
      badge: { className: "badge-github", text: d, icon: m }
    }), r.aborted || v.setSuggestions(o);
  }
  async searchGithubOnline(e) {
    const r = e.trim();
    if (!r) return;
    this.abortController?.abort();
    const i = new AbortController();
    this.abortController = i;
    const s = ++this.suggestionEpoch, n = this.currentMode, o = () => !i.signal.aborted && this.abortController === i && s === this.suggestionEpoch && n === this.currentMode && p.query.trim() === r, a = Ye.searchRule || "exact", c = { exact: "精确", fuzzy: "模糊", topic: "标签", smart: "智能" }, l = { exact: "🎯", fuzzy: "🌊", topic: "🏷️", smart: "✨" }, d = c[a] || "精确", m = l[a] || "🎯";
    v.setSuggestions([
      {
        id: "gh-search-loading",
        title: `正在以「${d}」模式搜索 GitHub 仓库…`,
        meta: `关键词：“${r}”，请稍候…`,
        iconSrc: "assets/nav-github.svg",
        badge: { className: "badge-github", text: "搜索中", icon: "⏳" }
      }
    ]), v.setSuggestionsVisible(!0);
    let h = r;
    if (a === "exact")
      h = `"${r}" in:name,description`;
    else if (a === "topic")
      h = `topic:${r.replace(/\s+/g, "-")}`;
    else if (a === "smart") {
      const g = fs[r.toLowerCase()] || [];
      g.length > 0 && (h = `${r} ${g.slice(0, 3).join(" OR ")}`);
    }
    try {
      const g = await ms(i.signal);
      if (!o()) return;
      const { data: k } = await gs(`/search/repositories?q=${encodeURIComponent(h)}&sort=stars&order=desc&per_page=10`, { headers: g, signal: i.signal, maxBytes: 1024 * 1024 });
      if (!o()) return;
      if (!Array.isArray(k?.items)) throw new Zr("format", "GitHub 搜索响应格式异常，没有当作空结果。");
      const b = k.items;
      if (!b.length) {
        v.setSuggestions([
          {
            id: `gh-empty-${r}`,
            title: `未找到与 “${r}” 相关的 GitHub 仓库`,
            meta: "可点击切换右侧规则（精确/模糊/标签/智能）或按 Enter 网页直达",
            iconSrc: "assets/nav-github.svg",
            url: `https://github.com/search?q=${encodeURIComponent(r)}`,
            badge: { className: "badge-github", text: "无结果", icon: "∅" }
          }
        ]);
        return;
      }
      const I = b.map((y) => ({
        id: `gh-online-${y.id}`,
        title: y.full_name || y.name,
        meta: `${y.description || "暂无描述"} · ⭐ ${Tr(y.stargazers_count || 0)}${y.language ? " · " + y.language : ""}`,
        iconSrc: y.owner?.avatar_url || "assets/nav-github.svg",
        url: y.html_url || `https://github.com/${y.full_name || y.name}`,
        badge: { className: "badge-github", text: d, icon: m }
      }));
      I.unshift({
        id: `gh-header-${r}`,
        title: `GitHub「${d}」搜索结果 (${b.length} 个)`,
        meta: "点击仓库条目直接访问 · 回车可在 GitHub 网页完整查看",
        iconSrc: "assets/nav-github.svg",
        url: `https://github.com/search?q=${encodeURIComponent(r)}`,
        badge: { className: "badge-github", text: "回车直达", icon: "↵" }
      }), v.setSuggestions(I), v.setSuggestionsVisible(!0);
    } catch (g) {
      if (!o()) return;
      v.setSuggestions([
        {
          id: `gh-error-${r}`,
          title: `GitHub 检索失败：${g instanceof Zr ? g.message : "响应处理异常"}`,
          meta: "请按具体错误检查账号、权限或网络；按 Enter 可直接跳转网页版搜索",
          iconSrc: "assets/nav-github.svg",
          url: `https://github.com/search?q=${encodeURIComponent(r)}`,
          badge: { className: "badge-github", text: "网页重试", icon: "⚠" }
        }
      ]), v.setSuggestionsVisible(!0);
    }
  }
  async fetchNeteaseSuggestions(e, r) {
    try {
      const i = `https://music.163.com/api/search/get/web?csrf_token=&hlpretag=&hlposttag=&s=${encodeURIComponent(e)}&type=1&offset=0&total=true&limit=8`, n = await (await fetch(i, { signal: r })).json();
      if (r.aborted) return;
      const a = (n.result?.songs || []).map((c) => ({
        id: `ne_${c.id}`,
        title: c.name,
        meta: (c.artists || []).map((l) => l.name).join(" / ") || "网易云音乐",
        iconSrc: "assets/netease.svg",
        type: "netease-search-trigger",
        rawQuery: c.name,
        badge: { className: "badge-netease", text: "网易云", icon: "🎵" }
      }));
      a.unshift({
        id: `ne-search-${e}`,
        title: `在 网易云音乐 搜索 “${e}”`,
        meta: "按 Enter 或点击在网易云插件内搜索",
        iconSrc: "assets/netease.svg",
        type: "netease-search-trigger",
        rawQuery: e
      }), v.setSuggestions(a);
    } catch {
    }
  }
  async fetchWebSuggestions(e, r, i = "all") {
    if (!e.trim() || r.aborted) return;
    const s = [], n = (c) => {
      try {
        return chrome.runtime.getURL(`_favicon/?pageUrl=${encodeURIComponent(c)}&size=32`);
      } catch {
        return;
      }
    }, o = () => {
      if (r.aborted) return;
      const c = oo(e, s);
      if (i === "all") {
        const l = qr();
        c.push({
          id: `${l.id}-${e}`,
          title: `${l.shortName} 搜索 “${e}”`,
          meta: `按 Enter 默认使用 ${l.name} 检索`,
          url: l.buildUrl(e),
          badge: { className: l.badgeClass, text: l.shortName, icon: "⌕" }
        });
      }
      v.setSuggestions(c);
    };
    if (i === "all") {
      this.initHistory();
      for (const c of this.clickHistory) s.push({
        source: "history",
        visitedAt: c.visitedAt,
        item: {
          id: `hist_${encodeURIComponent(c.url)}`,
          title: c.title,
          meta: c.url,
          url: c.url,
          iconSrc: typeof c.iconSrc == "string" ? c.iconSrc : n(c.url),
          badge: { className: "badge-bing", text: "历史", icon: "🕒" }
        }
      });
    }
    if (i === "all" || i === "launcher")
      for (const c of ve.getState().links || [])
        c.url && s.push({ source: "launcher", item: {
          id: `launcher_${c.id}`,
          title: c.title || c.url,
          meta: c.url,
          url: c.url,
          launcherLinkId: String(c.id),
          iconSrc: ve.getCachedIcon(c.url) || c.customIcon || c.icon || n(c.url),
          badge: { className: "badge-launcher", text: "常用网站", icon: "⭐" }
        } });
    if (o(), (i === "all" || i === "bookmarks") && typeof chrome < "u" && chrome.bookmarks?.search)
      try {
        let c = await rt.searchBookmarksViaWorker(e, 100, r);
        if (r.aborted || (c === null && (c = await chrome.bookmarks.search(e)), r.aborted)) return;
        const l = await rt.getIgnoredFolders();
        if (await rt.ensureBookmarkData(), r.aborted) return;
        const d = rt.getBookmarkFolderMap();
        for (const m of c || [])
          !m.url || rt.isBookmarkIgnored(m, l, d) || s.push({ source: "bookmark", fuzzyMatch: !0, item: {
            id: `bm_${m.id}`,
            title: m.title || m.url,
            meta: m.url,
            url: m.url,
            bookmarkId: String(m.id),
            iconSrc: n(m.url),
            badge: { className: "badge-bookmark", text: "书签", icon: "🔖" }
          } });
      } catch {
      }
    if (r.aborted || (o(), i !== "all")) return;
    const a = await so.querySearchProviders(e, r);
    if (!r.aborted) {
      for (const c of a) s.push({ item: c, source: "plugin", fuzzyMatch: !0 });
      a.length && o();
    }
  }
  async loadQccRecommendations(e = !1) {
    const r = [
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
    (e || !p.query.trim() && this.currentMode === "qcc") && (v.setSuggestions(r), v.setSuggestionsVisible(!0));
  }
  async fetchQccSuggestions(e) {
    const r = e.trim();
    if (!r) {
      v.setSuggestions([]);
      return;
    }
    const i = [
      {
        id: `qcc-${r}`,
        title: `在 企查查 搜索 “${r}”`,
        meta: "按 Enter 或点击直达企查查企业结果",
        url: `https://www.qcc.com/web/search?key=${encodeURIComponent(r)}`,
        badge: { className: "badge-qcc", text: "企查查", icon: "🏢" }
      },
      {
        id: `tyc-${r}`,
        title: `在 天眼查 搜索 “${r}”`,
        meta: "天眼查企业商业征信与工商档案",
        url: `https://www.tianyancha.com/search?key=${encodeURIComponent(r)}`,
        badge: { className: "badge-tyc", text: "天眼查", icon: "👁️" }
      },
      {
        id: `aqc-${r}`,
        title: `在 爱企查 搜索 “${r}”`,
        meta: "百度爱企查免费基础工商信息查询",
        url: `https://aiqicha.baidu.com/s?q=${encodeURIComponent(r)}`,
        badge: { className: "badge-aqc", text: "爱企查", icon: "🔍" }
      }
    ];
    v.setSuggestions(i);
  }
  async fetchCustomSlotSuggestions(e, r) {
    const i = e.trim();
    if (!i) {
      v.setSuggestions([]);
      return;
    }
    const s = B.value.find((o) => o.id === this.currentMode);
    if (!s) {
      await this.fetchWebSuggestions(e, r);
      return;
    }
    const n = [];
    if (n.push({
      id: `${s.id}-${i}`,
      title: `在 ${s.name} 搜索 “${i}”`,
      meta: "按 Enter 或点击在新标签页立即检索",
      iconSrc: s.iconType === "svg" ? s.iconValue : void 0,
      url: Dt(s, i),
      badge: {
        className: "badge-custom",
        text: s.name,
        icon: s.iconType !== "svg" ? s.iconValue : "⌕"
      }
    }), s.suggestUrl)
      try {
        const o = s.suggestUrl.replace(/\{query\}/g, encodeURIComponent(i)), c = await (await fetch(o, { signal: r })).json();
        if (Array.isArray(c) && Array.isArray(c[1]))
          for (const l of c[1].slice(0, 6))
            typeof l == "string" && l.trim() && n.push({
              id: `${s.id}-sug-${l}`,
              title: l,
              meta: `${s.name} 联想词`,
              url: Dt(s, l),
              badge: {
                className: "badge-custom",
                text: s.name,
                icon: "⌕"
              }
            });
      } catch {
      }
    r.aborted || v.setSuggestions(n);
  }
  submit(e) {
    const r = (e !== void 0 ? e : p.query).trim();
    if (r) {
      if (p.suggestions.length > 0 && p.suggestions[0]?.type === "slash-command") {
        this.handleSuggestionClick(p.suggestions[0]);
        return;
      }
      if (this.currentMode === "bilibili" || this.currentMode === "github" || this.currentMode === "netease")
        this.openWorkspaceSearch(this.currentMode, r);
      else if (this.currentMode === "qcc")
        this.openUrl(`https://www.qcc.com/web/search?key=${encodeURIComponent(r)}`);
      else {
        const i = B.value.find((s) => s.id === this.currentMode);
        if (i && !i.isBuiltin) {
          this.openUrl(Dt(i, r));
          return;
        }
        if (this.webScope !== "all" && p.suggestions.length > 0 && p.suggestions[0]?.url) {
          this.openUrl(p.suggestions[0].url);
          return;
        }
        if (/^(https?:\/\/|[a-z0-9-]+\.[a-z]{2,})/i.test(r)) {
          const s = /^https?:\/\//i.test(r) ? r : `https://${r}`;
          this.openUrl(s);
        } else {
          const s = qr();
          this.openUrl(s.buildUrl(r));
        }
      }
    }
  }
  handleSuggestionClick(e) {
    if (e.type === "slash-command" && e.rawCommand) {
      v.setQuery(e.rawCommand), v.focus(), this.fetchSuggestions(e.rawCommand);
      return;
    }
    if (e.type === "open-settings") {
      import("./window-manager.store-D9RSYghK.js").then((r) => r.n).then(({ windowManagerController: r }) => {
        r.open("settings");
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
      if (gi()) {
        this.openWorkspaceSearch("netease", e.title);
        return;
      }
      const r = typeof window < "u" ? window : null;
      if (r?.LogicWeaverHomeMusic?.playNetease) {
        r.LogicWeaverHomeMusic.playNetease(e.rawSong);
        return;
      }
    }
    e.url ? (this.recordSearchClick(e), this.openUrl(e.url)) : this.submit(e.title);
  }
  async openWorkspaceSearch(e, r) {
    if (this.abortController?.abort(), v.setSuggestionsVisible(!1), gi()) {
      try {
        await lo({ target: e, keyword: r, githubRule: e === "github" ? Ye.searchRule : void 0 });
      } catch (s) {
        v.setSuggestions([{ id: "workspace-search-error", title: s instanceof Error ? s.message : "打开插件搜索失败", meta: "请稍后重试", badge: { className: "badge-qcc", text: "提示", icon: "⚠" } }]);
      }
      return;
    }
    if (co(e, r), e === "netease") {
      const { windowManagerController: s } = await import("./window-manager.store-D9RSYghK.js").then((n) => n.n);
      s.open("music");
      return;
    }
    const { fullscreenCardsController: i } = await import("./fullscreen-cards.store-DUhgMhfT.js");
    i.enter(e === "github" ? "card-github" : "daily-bilibili");
  }
  openUrl(e) {
    typeof chrome < "u" && chrome.tabs?.create ? chrome.tabs.create({ url: e, active: !0 }) : window.open(e, "_blank");
  }
}
const fa = Fe.getInstance();
export {
  Rt as $,
  da as A,
  Br as B,
  P as C,
  go as D,
  B as E,
  mo as F,
  fo as G,
  kt as H,
  po as I,
  Ee as J,
  _o as K,
  Is as L,
  Xr as M,
  Tr as N,
  la as O,
  w as P,
  Wo as Q,
  aa as R,
  uo as S,
  ua as T,
  ca as U,
  Tt as V,
  so as W,
  qt as X,
  Ro as Y,
  O as Z,
  u as _,
  _s as a,
  S as a0,
  ai as a1,
  Xo as a2,
  zo as a3,
  U as a4,
  ti as a5,
  Ci as a6,
  Ei as a7,
  To as a8,
  Io as a9,
  bn as aA,
  j as aB,
  Ui as aC,
  kn as aD,
  xo as aE,
  gt as aF,
  $o as aG,
  Fo as aH,
  Yo as aI,
  Ko as aJ,
  qo as aK,
  jo as aL,
  Vo as aM,
  Do as aN,
  Zo as aO,
  Bo as aP,
  He as aQ,
  Nn as aR,
  Jo as aS,
  On as aT,
  Qo as aU,
  et as aV,
  sa as aW,
  Ao as aa,
  Ne as ab,
  Eo as ac,
  ks as ad,
  Uo as ae,
  Ki as af,
  Qt as ag,
  Ji as ah,
  xn as ai,
  ra as aj,
  ea as ak,
  ia as al,
  ta as am,
  Lo as an,
  Vr as ao,
  lt as ap,
  tn as aq,
  Hr as ar,
  Mi as as,
  No as at,
  Oo as au,
  he as av,
  Lr as aw,
  pn as ax,
  Ho as ay,
  Go as az,
  x as b,
  rt as c,
  fa as d,
  G as e,
  Lt as f,
  Z as g,
  Es as h,
  Po as i,
  f as j,
  ae as k,
  ve as l,
  oa as m,
  na as n,
  Ot as o,
  we as p,
  Ms as q,
  _ as r,
  v as s,
  X as t,
  Mo as u,
  ha as v,
  co as w,
  Zi as x,
  p as y,
  Jt as z
};
