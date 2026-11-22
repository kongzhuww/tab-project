import { c as It, w as Qe, h as ce, r as W, l as ft, g as Ct } from "./window-manager.store-D2fEf4ic.js";
import { r as $, a as gt, w as Et, s as mt, N as He, b as At } from "./vendor-vue-_upDT3S_.js";
import { s as de, S as Tt, p as Pt } from "./InlineEditStatus.vue_vue_type_style_index_0_scoped_c63d0c6d_lang-D41c1nko.js";
import { t as he, p as Lt } from "./module-state-BGAOq8La.js";
import { N as ae, B as pt, C as _t, H as Mt, s as Bt, D as xt, i as te, z as Rt, x as Ut, y as Nt, G as et } from "./github.service-CyBcxOSX.js";
const ne = {
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
}, wt = "web", re = ne[wt], Ot = () => ({
  mode: wt,
  query: "",
  hasQuery: !1,
  placeholder: re.placeholder,
  toggleTitle: re.title,
  toggleAriaLabel: re.title,
  modeIconSrc: re.iconSrc,
  modeIconText: re.iconText,
  modeColor: "#38bdf8",
  modeName: "网页",
  suggestions: [],
  isSuggestionsVisible: !1,
  updatedAt: null
}), g = $(Ot());
let Ee = null, Ae = null, Te = null, Pe = null, Le = null, _e = null;
const p = {
  get snapshot() {
    return gt(g);
  },
  update(s) {
    Object.assign(g, s), s.query !== void 0 && (g.hasQuery = !!s.query.trim());
  },
  setMode(s) {
    Promise.resolve().then(() => Rr).then(({ searchSlots: e }) => {
      const t = e.value.find((i) => i.id === s);
      if (t) {
        g.mode = t.id, g.placeholder = t.placeholder, g.toggleTitle = `当前为 ${t.name} 搜索，点击切换下一个模式`, g.toggleAriaLabel = `切换搜索模式（当前：${t.name}）`, g.modeIconSrc = t.iconType === "svg" ? t.iconValue : "", g.modeIconText = t.iconType !== "svg" ? t.iconValue : "", g.modeColor = t.themeColor || "#38bdf8", g.modeName = t.name, g.updatedAt = Date.now();
        return;
      }
      const r = ne[s] || ne.web;
      g.mode = s, g.placeholder = r.placeholder, g.toggleTitle = r.title, g.toggleAriaLabel = r.title, g.modeIconSrc = r.iconSrc, g.modeIconText = r.iconText, g.modeColor = "#38bdf8", g.modeName = s, g.updatedAt = Date.now();
    }).catch(() => {
      const e = ne[s] || ne.web;
      g.mode = s, g.placeholder = e.placeholder, g.toggleTitle = e.title, g.toggleAriaLabel = e.title, g.modeIconSrc = e.iconSrc, g.modeIconText = e.iconText, g.updatedAt = Date.now();
    });
  },
  setQuery(s) {
    g.query = s, g.hasQuery = !!s.trim(), g.updatedAt = Date.now(), _e && _e(s), typeof window < "u" && window.dispatchEvent(new CustomEvent("logicweaver:search-query", { detail: { query: s } }));
  },
  setQueryAction(s) {
    _e = s;
  },
  setSuggestions(s) {
    g.suggestions = Array.isArray(s) ? [...s] : [], g.isSuggestionsVisible = g.suggestions.length > 0, g.updatedAt = Date.now();
  },
  setSuggestionsVisible(s) {
    g.isSuggestionsVisible = !!s, g.updatedAt = Date.now();
  },
  onSuggestionClick(s) {
    g.isSuggestionsVisible = !1, Le ? Le(s) : s.url ? window.open(s.url, "_blank") : p.submit(s.title);
  },
  setSuggestionClickAction(s) {
    Le = s;
  },
  clear() {
    g.query = "", g.hasQuery = !1, g.suggestions = [], g.isSuggestionsVisible = !1, g.updatedAt = Date.now(), Ae ? Ae() : window.dispatchEvent(new CustomEvent("logicweaver:search-clear"));
  },
  submit(s) {
    const e = s !== void 0 ? s : g.query;
    g.isSuggestionsVisible = !1, Te ? Te(e) : window.dispatchEvent(new CustomEvent("logicweaver:search-submit", { detail: { query: e } }));
  },
  cycleMode() {
    Ee ? Ee() : window.dispatchEvent(new CustomEvent("logicweaver:search-cycle-mode"));
  },
  focus() {
    Pe ? Pe() : window.dispatchEvent(new CustomEvent("logicweaver:search-focus"));
  },
  setCycleModeAction(s) {
    Ee = s;
  },
  setClearAction(s) {
    Ae = s;
  },
  setSubmitAction(s) {
    Te = s;
  },
  setFocusAction(s) {
    Pe = s;
  }
}, Ft = "https://music.163.com";
async function tt(s, e = {}, t) {
  t?.throwIfAborted();
  let r, i;
  switch (s) {
    case "/login/status":
    case "/user/account":
      r = "/api/nuser/account/get", i = {};
      break;
    case "/user/detail":
      r = `/api/v1/user/detail/${encodeURIComponent(String(e.uid))}`, i = {};
      break;
    case "/user/playlist":
      r = "/api/user/playlist", i = { uid: e.uid, limit: e.limit ?? 100, offset: 0 };
      break;
    case "/playlist/detail":
    case "/playlist/track/all":
      r = "/api/playlist/detail", i = { id: e.id, n: 1e3, s: 0 };
      break;
    case "/likelist":
      r = "/api/song/like/get", i = { uid: e.uid };
      break;
    case "/cloudsearch":
    case "/search":
      r = "/api/search/get/web", i = { s: e.keywords, type: 1, limit: e.limit ?? 60, offset: 0 };
      break;
    case "/lyric":
      r = "/api/song/lyric", i = { id: e.id, lv: -1, kv: -1, tv: -1 };
      break;
    case "/song/url":
    case "/song/url/v1":
      r = "/api/song/enhance/player/url", i = { ids: JSON.stringify([e.id]), br: 32e4 };
      break;
    default:
      throw new Error("此功能暂未接入官网会话，不会回退到第三方音乐节点。");
  }
  const o = new URLSearchParams();
  for (const [a, l] of Object.entries(i))
    l != null && o.set(a, String(l));
  let n;
  try {
    const a = new URL(Ft + r);
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
  if ((s === "/playlist/detail" || s === "/playlist/track/all") && !c.playlist && c.result && (c.playlist = c.result), s === "/playlist/track/all") {
    const a = c.playlist?.tracks || [], l = Number(e.offset) || 0;
    return { ...c, songs: a.slice(l, l + (Number(e.limit) || 500)) };
  }
  return c;
}
const $t = "neteaseCookie", j = "neteaseUserInfo", G = "neteaseLikedSongIds", R = "neteaseRecentPlayedSongs";
class Q {
  constructor() {
    this.user = null, this.likedSongIds = /* @__PURE__ */ new Set(), this.recentSongs = [], this.playlistCache = /* @__PURE__ */ new Map(), this.pendingRequests = /* @__PURE__ */ new Map(), this.storageReady = this.initStorage();
  }
  whenReady() {
    return this.storageReady;
  }
  static getInstance() {
    return Q.instance || (Q.instance = new Q()), Q.instance;
  }
  async initStorage() {
    if (typeof chrome < "u" && chrome.storage?.local)
      try {
        const e = await chrome.storage.local.get([
          j,
          G,
          R
        ]);
        e[j] && (this.user = e[j]), Array.isArray(e[G]) && (this.likedSongIds = new Set(e[G])), Array.isArray(e[R]) && (this.recentSongs = e[R]);
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
    return tt(e, t, r);
  }
  // ==========================================================================
  // 用户鉴权与状态
  // ==========================================================================
  getUser() {
    return this.user;
  }
  async connectWebsiteAccount() {
    await this.whenReady();
    const e = await tt("/user/account"), t = e.profile || e.data?.profile, r = t?.userId;
    if (!r || typeof t?.nickname != "string")
      throw new Error("未读到官网账户，请先在同一浏览器、同一资料的网易云官网登录，再点击连接；无痕窗口的登录不会自动共用。");
    const i = {
      uid: r,
      nickname: t.nickname,
      avatarUrl: t.avatarUrl || "",
      vipType: Number(t.vipType) || 0,
      isVip: Number(t.vipType) > 0,
      loggedIn: !0
    };
    return typeof chrome < "u" && chrome.storage?.local && await chrome.storage.local.set({ [j]: i }), this.user = i, this.playlistCache.clear(), this.likedSongIds.clear(), typeof localStorage < "u" && localStorage.removeItem("netease_explicit_logout"), window.dispatchEvent(new Event("netease:account-updated")), i;
  }
  async fetchUserProfile() {
    try {
      let e = null, t = "网易云用户", r = "", i = 0;
      try {
        const o = await this.request("/login/status"), n = o?.data?.profile || o?.profile, c = o?.data?.account || o?.account;
        e = n?.userId || n?.id || c?.id || c?.userId || null, t = n?.nickname || c?.userName || "网易云用户", r = n?.avatarUrl || "", i = n?.vipType || c?.vipType || 0;
      } catch (o) {
        console.warn("[NeteaseService] /login/status warning:", o);
      }
      if (!e)
        try {
          const o = await this.request("/user/account"), n = o?.profile, c = o?.account;
          e = n?.userId || n?.id || c?.id || c?.userId || null, n?.nickname && (t = n.nickname), n?.avatarUrl && (r = n.avatarUrl), (n?.vipType || c?.vipType) && (i = n?.vipType || c?.vipType || 0);
        } catch (o) {
          console.warn("[NeteaseService] /user/account warning:", o);
        }
      if (e && (!r || t === "网易云用户"))
        try {
          const o = await this.request("/user/detail", { uid: e });
          o?.profile && (t = o.profile.nickname || t, r = o.profile.avatarUrl || r, i = o.profile.vipType || i);
        } catch {
        }
      if (e)
        return this.user = {
          uid: e,
          nickname: t,
          avatarUrl: r,
          vipType: i,
          isVip: Number(i) > 0,
          loggedIn: !0
        }, typeof chrome < "u" && chrome.storage?.local && await chrome.storage.local.set({ [j]: this.user }), await this.fetchLikedSongs(), this.user;
    } catch (e) {
      console.warn("[NeteaseService] fetchUserProfile failed:", e);
    }
    return null;
  }
  // ==========================================================================
  // Cookie 自动嗅探与应用登录
  // ==========================================================================
  async logout() {
    this.user = null, this.playlistCache.clear(), this.pendingRequests.clear(), this.likedSongIds.clear(), typeof chrome < "u" && chrome.storage?.local && await chrome.storage.local.remove([$t, j, G]), window.dispatchEvent(new Event("netease:account-updated"));
  }
  // ==========================================================================
  // 喜欢歌曲管理
  // ==========================================================================
  async fetchLikedSongs() {
    if (!this.user?.uid) return Array.from(this.likedSongIds);
    try {
      const t = (await this.request("/likelist", { uid: this.user.uid }))?.ids || [];
      return t.length && (this.likedSongIds = new Set(t.map(Number)), typeof chrome < "u" && chrome.storage?.local && await chrome.storage.local.set({ [G]: Array.from(this.likedSongIds) })), Array.from(this.likedSongIds);
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
    const i = t !== void 0 ? t : !this.likedSongIds.has(r);
    try {
      return await this.request("/like", { id: r, like: i }), i ? this.likedSongIds.add(r) : this.likedSongIds.delete(r), typeof chrome < "u" && chrome.storage?.local && await chrome.storage.local.set({ [G]: Array.from(this.likedSongIds) }), !0;
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
    const i = `${e}_${t}_${r}`;
    if (this.pendingRequests.has(i))
      return await this.pendingRequests.get(i);
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
        this.pendingRequests.delete(i);
      }
      return n;
    })();
    return this.pendingRequests.set(i, o), await o;
  }
  async searchSongs(e, t = 60) {
    const r = e.trim();
    if (!r) return [];
    let i = [];
    try {
      i = (await this.request("/cloudsearch", { keywords: r, type: 1, limit: t }))?.result?.songs || [];
    } catch (o) {
      console.warn("[NeteaseService] /cloudsearch failed, fallback to /search:", o);
    }
    if (!i.length)
      try {
        i = (await this.request("/search", { keywords: r, limit: t }))?.result?.songs || [];
      } catch (o) {
        console.warn("[NeteaseService] /search failed:", o);
      }
    return i;
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
        const r = t.map((i) => {
          const o = i.data || i.song || i;
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
            playTime: i.playTime || 0
          };
        }).filter(Boolean);
        if (r.length > 0) {
          const i = new Set(r.map((n) => String(n.id))), o = this.recentSongs.filter((n) => !i.has(String(n.id)));
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
const ze = Q.getInstance();
typeof window < "u" && (window.LogicWeaverNeteaseService = ze);
const X = $({ visible: !1, pendingWrites: 0 }), We = /* @__PURE__ */ new Set();
function qr(s) {
  return We.add(s), () => {
    We.delete(s);
  };
}
function qt() {
  for (const s of We) s();
}
async function Dr(s) {
  X.pendingWrites++;
  try {
    return await s();
  } finally {
    X.pendingWrites--;
  }
}
class Vr extends Error {
  constructor(e = "设置保存结果未确认，请重读核对；未自动重试") {
    super(e), this.name = "SettingsSaveUnconfirmedError";
  }
}
function z(s, e) {
  if (Object.is(s, e)) return !0;
  if (s === null || e === null || typeof s != "object" || typeof e != "object") return !1;
  if (Array.isArray(s) || Array.isArray(e))
    return Array.isArray(s) && Array.isArray(e) && s.length === e.length && s.every((o, n) => z(o, e[n]));
  const t = s, r = e, i = Object.keys(t);
  return i.length === Object.keys(r).length && i.every((o) => Object.prototype.hasOwnProperty.call(r, o) && z(t[o], r[o]));
}
function Dt(s) {
  return s === void 0 ? s : JSON.parse(JSON.stringify(s));
}
class K extends Error {
  constructor() {
    super("保存结果未确认，未自动重试。请复制草稿后刷新页面核对，再决定是否修改。");
  }
}
let Me = !1;
async function rt(s) {
  return new Promise((e, t) => {
    chrome.storage.local.get(s, (r) => {
      chrome.runtime.lastError ? t(new Error("无法读取网站数据，本次未提交；请稍后再试。")) : e(r);
    });
  });
}
async function Be(s, e) {
  if (Me) throw new K();
  if (typeof chrome > "u" || !chrome.storage?.local)
    throw new Error("浏览器存储不可用，未保存；请在扩展页面操作。");
  if (typeof navigator > "u" || !navigator.locks?.request)
    throw new Error("当前环境不支持标题保存保护，未提交修改。");
  const t = new AbortController(), r = setTimeout(() => t.abort(), 1e4);
  let i = !1;
  try {
    return await navigator.locks.request("logicweaver:launcher-titles", { signal: t.signal }, async () => {
      if (Me) throw new K();
      const o = await rt(s);
      if (t.signal.aborted) throw new Error("等待保存超时，本次未提交。");
      const n = e(o), c = Object.fromEntries(s.filter((a) => !z(o[a], n[a])).map((a) => [a, n[a]]));
      if (Object.keys(c).length) {
        clearTimeout(r), i = !0, await new Promise((l, d) => {
          chrome.storage.local.set(c, () => {
            chrome.runtime.lastError ? d(new K()) : l();
          });
        });
        const a = await rt(s);
        if (s.some((l) => !z(a[l], n[l])))
          throw new K();
      }
      try {
        for (const a of s) n[a] !== void 0 && localStorage.setItem(`logicweaver:${a}`, JSON.stringify(n[a]));
      } catch {
      }
      return n;
    });
  } catch (o) {
    throw i || o instanceof K ? (Me = !0, new K()) : t.signal.aborted ? new Error("等待保存超时，本次未提交。") : o;
  } finally {
    clearTimeout(r);
  }
}
function xe(s) {
  if (!Array.isArray(s) || s.some((e) => !e || typeof e != "object" || Array.isArray(e)))
    throw new Error("网站数据格式异常，未覆盖已有数据。");
  return s;
}
function Re(s) {
  if (s === void 0) return {};
  if (!s || typeof s != "object" || Array.isArray(s))
    throw new Error("文件夹数据格式异常，未覆盖已有数据。");
  return s;
}
function fe(s) {
  const e = s.trim().replace(/\s+/g, " ");
  if (!e) throw new Error("文件夹名称不能为空。");
  if (e.length > 20) throw new Error("文件夹名称最多20个字符，请缩短后再保存。");
  if (["__proto__", "constructor", "prototype"].includes(e)) throw new Error("这个名称不可用，请换一个名称。");
  return e;
}
const Ue = (s, e) => Object.prototype.hasOwnProperty.call(s, e);
function ke(s, e) {
  if (!Ue(s, e)) return;
  const t = s[e]?.parent;
  if (!t || typeof t != "string" || !Ue(s, t)) return;
  const r = /* @__PURE__ */ new Set([e]);
  let i = t;
  for (; i; ) {
    if (r.has(i)) return;
    r.add(i), i = Ue(s, i) ? s[i]?.parent : void 0;
  }
  return t;
}
function it(s, e) {
  const t = /* @__PURE__ */ new Set([e]), r = /* @__PURE__ */ new Map();
  for (const o of Object.keys(s)) {
    const n = ke(s, o);
    n && r.set(n, [...r.get(n) || [], o]);
  }
  const i = [e];
  for (let o = 0; o < i.length; o++) for (const n of r.get(i[o]) || [])
    t.has(n) || (t.add(n), i.push(n));
  return t;
}
const E = "quickLinks", B = "quickLinkGroupSizes", L = "launcherFolders", N = "launcherPages", q = "launcherPageLabels", O = "launcherActivePage", ge = "launcherIconCache", Vt = 480, Ht = 18e5, zt = 120 * 1024, C = "常用网站", w = "常用网站";
class Z {
  constructor() {
    this.state = {
      links: [],
      groupSizes: {},
      folders: {},
      pages: [C],
      pageLabels: {},
      activePage: C
    }, this.iconCache = {}, this.iconCachePending = /* @__PURE__ */ new Set(), this.iconCacheSaveTimer = null, this.listeners = [], this.isLoaded = !1, this.ready = this.initFromWindowOrStorage(), this.bindStorageChangeListener();
  }
  bindStorageChangeListener() {
    typeof chrome < "u" && chrome.storage?.onChanged && chrome.storage.onChanged.addListener((e, t) => {
      if (t !== "local") return;
      let r = !1;
      e[E] && Array.isArray(e[E].newValue) && (this.state.links = [...e[E].newValue], r = !0), e[B] && e[B].newValue && (this.state.groupSizes = { ...e[B].newValue }, r = !0), e[L] && e[L].newValue && (this.state.folders = { ...e[L].newValue }, r = !0), e[N] && Array.isArray(e[N].newValue) && e[N].newValue.length > 0 && (this.state.pages = [...e[N].newValue], r = !0), e[q] && e[q].newValue && (this.state.pageLabels = { ...e[q].newValue }, r = !0), e[O] && typeof e[O].newValue == "string" && (this.state.activePage = e[O].newValue, r = !0), r && this.notify();
    });
  }
  static getInstance() {
    return Z.instance || (Z.instance = new Z()), Z.instance;
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
      chrome.storage.local.get(e, (i) => r(i || {}));
    }) : (typeof localStorage < "u" && e.forEach((r) => {
      const i = localStorage.getItem(`logicweaver:${r}`);
      if (i)
        try {
          t[r] = JSON.parse(i);
        } catch {
          t[r] = i;
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
    e && e.launcherState && (this.state.links = Array.isArray(e.launcherState.links) ? [...e.launcherState.links] : [], this.state.groupSizes = { ...e.launcherState.groupSizes || {} }, this.state.folders = { ...e.launcherState.folders || {} }, this.state.pages = Array.isArray(e.launcherState.pages) ? [...e.launcherState.pages] : [C], this.state.pageLabels = { ...e.launcherState.pageLabels || {} }, this.state.activePage = e.launcherState.activePage || C), e && e.launcherIconCache && (this.iconCache = { ...e.launcherIconCache });
    const t = [
      E,
      B,
      L,
      N,
      q,
      O,
      ge
    ];
    try {
      const r = await this.storageGet(t);
      Array.isArray(r[E]) && (this.state.links = [...r[E]]), r[B] && (this.state.groupSizes = { ...r[B] }), r[L] && (this.state.folders = { ...r[L] }), Array.isArray(r[N]) && r[N].length > 0 && (this.state.pages = [...r[N]]), r[q] && (this.state.pageLabels = { ...r[q] }), r[O] && (this.state.activePage = r[O]), r[ge] && (this.iconCache = { ...r[ge] });
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
      [E]: this.state.links,
      [B]: this.state.groupSizes,
      [L]: this.state.folders,
      [N]: this.state.pages,
      [q]: this.state.pageLabels,
      [O]: this.state.activePage,
      quickLinksReady: !0
    }), this.notify();
  }
  async saveLink(e) {
    const t = new URL(this.normalizeUrl(e.url));
    if (t.protocol !== "https:" && t.protocol !== "http:") throw new Error("仅支持 HTTP/HTTPS 网站");
    const r = this.state.links.findIndex((c) => String(c.id) === String(e.id)), i = r >= 0 ? this.state.links[r] : void 0;
    let o = e.page ? e.page.trim() : i?.page || (i ? C : this.state.activePage);
    o && !this.state.pages.includes(o) && this.state.pages.push(o);
    const n = {
      ...i,
      id: i?.id || crypto.randomUUID(),
      title: e.title.trim(),
      url: t.href,
      group: e.group?.trim() || w,
      page: o,
      note: e.note !== void 0 ? e.note.trim() : i?.note
    };
    r >= 0 ? this.state.links[r] = n : this.state.links.push(n), await this.save();
  }
  /** Title-only intent: do not resubmit a stale URL, note, group, or entire launcher snapshot. */
  async renameLinkTitle(e, t, r) {
    const i = r.trim();
    if (!i) throw new Error("网站名称不能为空。");
    if (i.length > 50) throw new Error("网站名称最多50个字符。");
    return this.saveLinkTextField(e, "title", t, i);
  }
  async editLinkUrl(e, t, r) {
    if (!r.trim()) throw new Error("网址不能为空。");
    let i;
    try {
      i = new URL(this.normalizeUrl(r));
    } catch {
      throw new Error("网址格式不正确，请检查后再保存。");
    }
    if (i.protocol !== "https:" && i.protocol !== "http:") throw new Error("仅支持 HTTP/HTTPS 网站。");
    if (i.username || i.password) throw new Error("请勿在网址中保存用户名或密码。");
    return this.saveLinkTextField(e, "url", t, i.href);
  }
  async editLinkNote(e, t, r) {
    const i = r.trim();
    if (i.length > 200) throw new Error("网站备注最多200个字符。");
    return this.saveLinkTextField(e, "note", t, i);
  }
  async saveLinkTextField(e, t, r, i) {
    await this.ready;
    const o = await Be([E], (n) => {
      const c = xe(n[E]), a = c.filter((u) => String(u.id) === String(e));
      if (a.length !== 1) throw new Error("网站已删除或标识重复，未提交；请重新打开菜单核对。");
      const l = a[0], d = l[t] || "";
      if (d !== (r || "") && d !== i)
        throw new Error("这一字段已被其他操作修改，未覆盖。请复制草稿，重新打开菜单核对。");
      return { [E]: c.map((u) => u === l ? { ...u, [t]: i } : u) };
    });
    return this.state.links = o[E], this.notify(), i;
  }
  async saveLinkNote(e, t) {
    const r = this.state.links.find((i) => String(i.id) === String(e));
    r && (r.note = t.trim(), await this.save());
  }
  async setLinkIcon(e, t) {
    const r = this.state.links.find((i) => String(i.id) === String(e));
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
      const t = Object.entries(this.iconCache).sort((i, o) => Number(o[1]?.savedAt || 0) - Number(i[1]?.savedAt || 0)).filter(([, i]) => {
        const o = String(i?.dataUrl || "").length;
        return !o || e + o > Ht ? !1 : (e += o, !0);
      }).slice(0, Vt), r = {};
      t.forEach(([i, o]) => {
        r[i] = o;
      }), this.iconCache = r, typeof window < "u" && (window.launcherIconCache = r);
      try {
        await this.storageSet({ [ge]: this.iconCache });
      } catch {
      }
    }, 1200);
  }
  async cacheIcon(e, t, r) {
    const i = this.getCacheKey(e);
    if (!(!i || !t || t.startsWith("data:") || this.iconCachePending.has(i))) {
      this.iconCachePending.add(i);
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
          this.iconCache[i] = { dataUrl: o, savedAt: Date.now() }, this.scheduleIconCacheSave();
          return;
        }
        if (!t.startsWith("chrome-extension:"))
          try {
            const n = await fetch(t, { credentials: "omit", cache: "force-cache" });
            if (n.ok) {
              const c = await n.blob();
              if (c.size && c.size <= zt && /^image\//i.test(c.type || "")) {
                const a = await new Promise((l, d) => {
                  const h = new FileReader();
                  h.onload = () => l(String(h.result || "")), h.onerror = () => d(h.error), h.readAsDataURL(c);
                });
                if (a && a.startsWith("data:image/")) {
                  this.iconCache[i] = { dataUrl: a, savedAt: Date.now() }, this.scheduleIconCacheSave();
                  return;
                }
              }
            }
          } catch {
          }
        /^https?:\/\//i.test(t) && (this.iconCache[i] = { dataUrl: t, savedAt: Date.now() }, this.scheduleIconCacheSave());
      } catch {
      } finally {
        this.iconCachePending.delete(i);
      }
    }
  }
  // ==================== 分区 (Pages) 业务逻辑 ====================
  getPageNames() {
    const e = /* @__PURE__ */ new Set([
      C,
      ...this.state.pages,
      ...this.state.links.map((t) => t.page || C)
    ]);
    return Array.from(e).map((t) => String(t || "").trim()).filter(Boolean);
  }
  getPageLabel(e) {
    return String(this.state.pageLabels[e] || (e === C ? "默认" : e));
  }
  async setPage(e, t = !0) {
    const r = this.getPageNames(), i = r.includes(e) ? e : r[0] || C;
    this.state.activePage = i, t && await this.storageSet({ [O]: i }).catch(() => {
    }), this.notify();
  }
  async stepPage(e) {
    const t = this.getPageNames();
    if (t.length < 2) return;
    const r = Math.max(0, t.indexOf(this.state.activePage)), i = t[(r + e + t.length) % t.length];
    await this.setPage(i);
  }
  async addPage(e) {
    const t = String(e || "").trim().replace(/\s+/g, " ").slice(0, 12);
    if (!t) return !1;
    const r = this.getPageNames().find((o) => this.getPageLabel(o).toLowerCase() === t.toLowerCase());
    if (r)
      return await this.setPage(r), !1;
    let i = t;
    for (; this.getPageNames().includes(i); )
      i = `${t}-${crypto.randomUUID().slice(0, 4)}`;
    return this.state.pages.push(i), this.state.pageLabels[i] = t, this.state.activePage = i, await this.save(), !0;
  }
  async renamePage(e, t) {
    const r = String(t || "").trim().replace(/\s+/g, " ").slice(0, 12);
    return !r || this.getPageNames().some((o) => o !== e && this.getPageLabel(o).toLowerCase() === r.toLowerCase()) ? !1 : (this.state.pageLabels[e] = r, await this.save(), !0);
  }
  async deletePage(e) {
    const t = this.getPageNames();
    if (t.length <= 1) return !1;
    const r = t.find((i) => i !== e) || C;
    this.state.links.forEach((i) => {
      (i.page || C) === e && (i.page = r);
    });
    for (const [i, o] of Object.entries(this.state.folders)) (o.page || C) === e && (this.state.folders[i] = { ...o, page: r });
    return this.state.pages = this.state.pages.filter((i) => i !== e), delete this.state.pageLabels[e], this.state.activePage === e && (this.state.activePage = r), await this.save(), !0;
  }
  // ==================== 快捷链接 (Links) 业务逻辑 ====================
  getLinks(e) {
    return e ? this.state.links.filter((t) => (t.page || C) === e) : [...this.state.links];
  }
  async addLink(e) {
    const t = this.normalizeUrl(e.url), r = this.state.links.find((c) => this.normalizeUrl(c.url) === t), i = e.group || w, o = e.page || this.state.activePage;
    if (r)
      return r.group = i, r.page = o, !r.title && e.title && (r.title = e.title), e.customIcon && (r.customIcon = e.customIcon), e.icon && (r.icon = e.icon), await this.save(), r;
    const n = {
      id: crypto.randomUUID(),
      title: e.title || this.hostOf(t),
      url: t,
      group: i,
      page: o,
      icon: e.icon,
      customIcon: e.customIcon
    };
    return this.state.links.push(n), await this.save(), n;
  }
  async updateLink(e, t) {
    const r = this.state.links.find((i) => i.id === e);
    return r ? (Object.assign(r, t), t.url && (r.url = this.normalizeUrl(t.url)), await this.save(), !0) : !1;
  }
  async deleteLink(e) {
    const t = this.state.links.length, r = this.state.links.find((i) => i.id === e);
    return this.state.links = this.state.links.filter((i) => i.id !== e), this.state.links.length === t ? !1 : (r?.group && this.cleanUnusedGroups([r.group]), await this.save(), !0);
  }
  async moveLinkTo(e, t, r) {
    const i = this.state.links.find((n) => n.id === e);
    if (!i) return !1;
    const o = i.group || w;
    return i.group = r || w, i.page = i.group !== w ? this.getFolderPage(i.group) : t || this.state.activePage, this.cleanUnusedGroups([o]), await this.save(), t && t !== this.state.activePage && await this.setPage(t), !0;
  }
  // ==================== 分组/文件夹 (Folders / Groups) 业务逻辑 ====================
  getGroupNames() {
    return Array.from(/* @__PURE__ */ new Set([...this.state.links.map((e) => e.group || w), ...Object.keys(this.state.folders)]));
  }
  getFolderParent(e) {
    return ke(this.state.folders, e);
  }
  getFolderPage(e) {
    let t = e;
    for (let r = this.getFolderParent(t); r; r = this.getFolderParent(t)) t = r;
    return this.state.folders[t]?.page || this.state.links.find((r) => r.group === t)?.page || this.state.activePage || C;
  }
  async moveFolderInto(e, t, r) {
    if (!e || e === w) throw new Error("不能移动默认分组。");
    await this.ready;
    const i = [E, L], o = r || this.getFolderPage(e), n = await Be(i, (c) => {
      const a = xe(c[E]), l = Re(c[L]), d = /* @__PURE__ */ new Set([...Object.keys(l), ...a.map((b) => b.group || w)]);
      if (!d.has(e) || t && (!d.has(t) || t === w)) throw new Error("文件夹已变化，请重新打开后再移动。");
      fe(e), t && fe(t);
      const h = /* @__PURE__ */ new Set();
      for (let b = t; b; b = Object.prototype.hasOwnProperty.call(l, b) ? l[b]?.parent : void 0) {
        if (b === e || h.has(b)) throw new Error("不能移入自身、后代或层级异常的文件夹。");
        h.add(b);
      }
      const u = it(l, e);
      if (t && u.has(t)) throw new Error("不能把文件夹放入自身或自己的子文件夹。");
      let f = t;
      for (; f && ke(l, f); ) f = ke(l, f);
      const S = t && (l[f]?.page || a.find((b) => b.group === f)?.page) || o, m = { ...l };
      t && !Object.prototype.hasOwnProperty.call(m, t) && (m[t] = { name: t, page: S });
      for (const b of u) m[b] = { ...m[b], name: b, page: S };
      return t ? m[e] = { ...m[e], parent: t } : delete m[e].parent, {
        ...c,
        [L]: m,
        [E]: a.map((b) => u.has(b.group || w) ? { ...b, page: S } : b)
      };
    });
    return this.state.links = n[E], this.state.folders = n[L], this.notify(), !0;
  }
  getGroupSize(e) {
    return this.state.groupSizes[e] === "small" ? "small" : this.state.groupSizes[e] === "large" || e === w ? "large" : "small";
  }
  async toggleGroupSize(e) {
    const t = this.getGroupSize(e) === "large" ? "small" : "large";
    return this.state.groupSizes[e] = t, await this.save(), t;
  }
  async renameGroup(e, t) {
    const r = fe(t);
    if (r === e) return !1;
    if (!e || e === w) throw new Error("默认分组不能通过文件夹重命名。");
    await this.ready;
    const i = Dt(this.state), o = (l, d) => Object.prototype.hasOwnProperty.call(l, d), n = (l) => l.filter((d) => (d.group || w) === e).map((d) => String(d.id)).sort(), a = await Be([E, B, L], (l) => {
      const d = xe(l[E]), h = Re(l[B]), u = Re(l[L]), f = /* @__PURE__ */ new Set([
        w,
        ...d.map((m) => m.group || w),
        ...Object.keys(h),
        ...Object.keys(u)
      ]);
      if (!f.has(e)) throw new Error("文件夹已被修改或删除，请重新打开后核对。");
      if ([...f].some((m) => typeof m == "string" && m !== e && m.toLowerCase() === r.toLowerCase()))
        throw new Error("已有同名文件夹，请换一个名称；原文件夹未修改。");
      if (!z(n(d), n(i.links)) || !z(h[e], i.groupSizes[e]) || !z(u[e], i.folders[e]))
        throw new Error("文件夹内容已被其他操作修改，未覆盖；请复制草稿，重新打开后核对。");
      const S = { ...l, [E]: d.map((m) => (m.group || w) === e ? { ...m, group: r } : m) };
      if (o(h, e)) {
        const m = { ...h, [r]: h[e] };
        delete m[e], S[B] = m;
      }
      if (o(u, e)) {
        const m = u[e];
        if (!m || typeof m != "object" || Array.isArray(m)) throw new Error("文件夹记录格式异常，未提交修改。");
        const b = { ...u, [r]: { ...m, name: r } };
        delete b[e];
        for (const P of Object.keys(b)) b[P]?.parent === e && (b[P] = { ...b[P], parent: r });
        S[L] = b;
      }
      return S;
    });
    return this.state.links = a[E], this.state.groupSizes = a[B] || {}, this.state.folders = a[L] || {}, this.notify(), !0;
  }
  async moveFolderToPage(e, t) {
    return !e || !t ? !1 : (await this.moveFolderInto(e, void 0, t), await this.setPage(t), !0);
  }
  async deleteGroup(e, t) {
    if (!e || e === w) return !1;
    const r = this.getFolderParent(e);
    for (const [i, o] of Object.entries(this.state.folders)) o.parent === e && (this.state.folders[i] = { ...o, parent: r });
    return t === "release" ? this.state.links.forEach((i) => {
      (i.group || w) === e && (i.group = r || w);
    }) : this.state.links = this.state.links.filter((i) => (i.group || w) !== e), delete this.state.groupSizes[e], this.state.folders && delete this.state.folders[e], await this.save(), !0;
  }
  async mergeGroups(e, t) {
    if (!e || !t || e === t) return !1;
    if (it(this.state.folders, e).has(t)) throw new Error("不能合并到自己的子文件夹。");
    for (const [i, o] of Object.entries(this.state.folders)) o.parent === e && (this.state.folders[i] = { ...o, parent: t === w ? void 0 : t });
    const r = /* @__PURE__ */ new Set();
    return this.state.links.filter((i) => (i.group || w) === t).forEach((i) => {
      try {
        r.add(this.normalizeUrl(i.url));
      } catch {
      }
    }), this.state.links = this.state.links.filter((i) => {
      if ((i.group || w) !== e) return !0;
      let o = i.url;
      try {
        o = this.normalizeUrl(i.url);
      } catch {
      }
      return r.has(o) ? !1 : (r.add(o), i.group = t, !0);
    }), delete this.state.groupSizes[e], this.state.folders && delete this.state.folders[e], await this.save(), !0;
  }
  async stackLinks(e, t) {
    if (!e || e === t) return;
    const r = this.state.links.find((a) => a.id === e), i = this.state.links.find((a) => a.id === t);
    if (!r || !i) return;
    const o = r.group || w, n = i.group || w;
    r.page = i.page || C;
    const c = this.state.links.filter((a) => (a.group || w) === n).length;
    if (o !== n && n !== w && c > 1)
      r.group = n, this.state.groupSizes[n] = "large", this.cleanUnusedGroups([o]);
    else if (o !== n || n === w) {
      const a = this.uniqueGroupName(i.title);
      r.group = a, i.group = a, this.state.groupSizes[a] = "small", this.cleanUnusedGroups([o, n]);
    } else
      return;
    await this.save();
  }
  async createFolder(e = "large", t, r, i) {
    const o = /* @__PURE__ */ new Set([w, ...this.getGroupNames()]);
    this.state.folders && Object.keys(this.state.folders).forEach((l) => o.add(l));
    const n = e === "large" ? "新建大文件夹" : "新建中文件夹";
    let c = (t || n).trim();
    if (o.has(c)) {
      let l = 2;
      for (; o.has(`${n} ${l}`); ) l += 1;
      c = `${n} ${l}`;
    }
    if (c = fe(c), i && !this.getGroupNames().includes(i)) throw new Error("上级文件夹不存在。");
    const a = i ? this.getFolderPage(i) : r || this.state.activePage || C;
    return this.state.folders || (this.state.folders = {}), i && !Object.prototype.hasOwnProperty.call(this.state.folders, i) && (this.state.folders[i] = { name: i, page: a }), this.state.folders[c] = { name: c, page: a, ...i ? { parent: i } : {} }, this.state.groupSizes[c] = e, await this.save(), c;
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
    const i = t?.trim() || this.uniqueGroupName(r.title), o = r.group || w;
    return r.group = i, this.state.groupSizes[i] = "large", this.cleanUnusedGroups([o]), await this.save(), i;
  }
  uniqueGroupName(e) {
    const t = new Set(this.getGroupNames()), r = `${(e || "新").trim().slice(0, 14)}收藏夹`;
    if (!t.has(r)) return r;
    let i = 2;
    for (; t.has(`${r} ${i}`); ) i += 1;
    return `${r} ${i}`;
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
    const i = [...this.state.links], o = i.findIndex((d) => String(d.id) === String(e));
    if (o < 0) return !1;
    const n = i[o];
    i.splice(o, 1);
    const c = i.findIndex((d) => String(d.id) === String(t));
    if (c < 0) return !1;
    const a = i[c];
    n.page = a.page || C, n.group = a.group || w;
    const l = r === "before" ? c : c + 1;
    return i.splice(l, 0, n), this.state.links = i, await this.save(), this.notify(), !0;
  }
  async reorderFolderLinks(e, t) {
    const r = e || w, i = this.state.links.findIndex((d) => (d.group || w) === r);
    if (i < 0) return !1;
    const o = this.state.links.filter((d) => (d.group || w) === r), n = this.state.links.filter((d) => (d.group || w) !== r), c = new Map(o.map((d) => [String(d.id), d])), a = [];
    for (const d of t) {
      const h = c.get(String(d));
      h && (a.push(h), c.delete(String(d)));
    }
    for (const d of c.values())
      a.push(d);
    const l = [...n];
    return l.splice(Math.min(i, l.length), 0, ...a), this.state.links = l, await this.save(), this.notify(), !0;
  }
  async reorderTile(e, t, r = "after") {
    if (!e || !t) return;
    if (e.kind === "link" && t.kind === "link" && e.id && t.id) {
      await this.reorderLinks(e.id, t.id, r);
      return;
    }
    const i = e.kind === "folder" ? this.state.links.filter((f) => (f.group || w) === e.group) : this.state.links.filter((f) => String(f.id) === String(e.id));
    if (!i.length) return;
    if (t.kind === "folder" && t.group) {
      const S = (this.state.folders ? this.state.folders[t.group] : void 0)?.page || this.state.activePage || C;
      i.forEach((m) => {
        m.group = t.group, m.page = S;
      }), await this.save(), this.notify();
      return;
    }
    const o = new Set(i.map((f) => String(f.id))), n = this.state.links.filter((f) => String(f.id) === String(t.id));
    if (!n.length || n.some((f) => o.has(String(f.id)))) return;
    const c = n[0].page || C, a = n[0].group || w;
    i.forEach((f) => {
      f.page = c, f.group = a;
    });
    const l = new Set(n.map((f) => String(f.id))), d = this.state.links.filter((f) => !o.has(String(f.id))), h = d.map((f, S) => l.has(String(f.id)) ? S : -1).filter((f) => f >= 0);
    if (!h.length) return;
    const u = r === "before" ? Math.min(...h) : Math.max(...h) + 1;
    d.splice(u, 0, ...i), this.state.links = d, await this.save(), this.notify();
  }
  async reorderPageItems(e, t) {
    const r = String(e || C).trim(), i = !r || r === "常用网站" || r === "默认", o = this.state.pageLabels || {}, n = (h) => {
      const u = String(h.page || "").trim(), f = !u || u === "常用网站" || u === "默认";
      if (i) return f;
      if (f) return !1;
      if (u === r) return !0;
      const S = o[u] || u, m = o[r] || r;
      return S === m || u === m || S === r;
    }, c = this.state.links.filter(n), a = this.state.links.filter((h) => !n(h)), l = [], d = /* @__PURE__ */ new Set();
    for (const h of t)
      if (h.type === "link" && h.id) {
        const u = c.find((f) => String(f.id) === String(h.id));
        u && !d.has(String(u.id)) && (d.add(String(u.id)), l.push(u));
      } else if (h.type === "folder" && h.groupName) {
        const u = c.filter(
          (f) => (f.group || w) === h.groupName
        );
        for (const f of u)
          d.has(String(f.id)) || (d.add(String(f.id)), l.push(f));
      }
    for (const h of c)
      d.has(String(h.id)) || l.push(h);
    this.state.links = [...a, ...l], await this.save(), this.notify();
  }
}
const V = Z.getInstance(), st = [
  "todoist",
  "card-github",
  "daily-aihot",
  "daily-bilibili",
  "multica"
], Se = "lw_active_card";
function Wt() {
  try {
    if (typeof localStorage < "u" && localStorage.removeItem(Se), typeof window < "u" && window.location?.hash) {
      const s = window.location.hash.replace(/^#/, "");
      if (st.includes(s))
        return s;
    }
    if (typeof sessionStorage < "u") {
      const s = sessionStorage.getItem(Se);
      if (s && st.includes(s))
        return s;
    }
  } catch {
  }
  return null;
}
const U = $({
  activeId: Wt()
});
typeof window < "u" && Et(
  () => U.activeId,
  (s) => {
    try {
      s ? (sessionStorage.setItem(Se, s), window.location.hash !== `#${s}` && history.replaceState(null, "", `#${s}`)) : (sessionStorage.removeItem(Se), window.location.hash && history.replaceState(null, "", window.location.pathname + window.location.search));
    } catch {
    }
  },
  { immediate: !0 }
);
let ve;
function Hr(s) {
  ve = s;
}
function Ce(s) {
  if (!ve) throw new Error("Fullscreen card host not ready");
  ve.enter(s);
}
function le(s) {
  U.activeId === s && ve?.exit();
}
function jt(s) {
  typeof document > "u" || (document.documentElement?.classList.remove("has-card-fullscreen"), document.body && (document.body.classList.toggle("has-card-fullscreen", !!s), document.body.dataset.page = s ? "daily" : "home"));
}
const Gt = {
  "bilibili.html": "daily-bilibili",
  "github.html": "card-github",
  "aihot.html": "daily-aihot"
};
function kt() {
  return typeof location > "u" ? null : Gt[location.pathname.split("/").pop() || ""] || null;
}
const zr = mt(() => {
  const s = kt() || U.activeId;
  if (s) return s;
  const e = It.activeId;
  return e && Qe.isActive(e) ? e : "home";
}), Kt = [
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
function Yt() {
  if (!(typeof localStorage > "u"))
    for (const s of Kt)
      localStorage.removeItem(s), localStorage.removeItem(`logicweaver:${s}`);
}
const Jt = [
  "lw_private_chat_v1",
  "lw_chat_session_v1",
  "lw_chat_server_url",
  "lw_chat_server_explicit",
  "lw_chat_user_id",
  "lw_chat_user_name",
  "lw_chat_user_avatar",
  "lw_chat_groups",
  "lw_chat_current_group",
  "lw_chat_rooms",
  "lw_chat_friends",
  "lw_chat_friend_requests_v1",
  "lw_chat_transport_mode",
  "lw_chat_current_room"
];
function Qt() {
  if (typeof localStorage > "u") return;
  for (const t of Jt)
    localStorage.removeItem(t), localStorage.removeItem(`logicweaver:${t}`);
  const s = ["lw_chat_room_history:", "lw_chat_peer_roster:"], e = [];
  for (let t = 0; t < localStorage.length; t += 1) {
    const r = localStorage.key(t);
    r && s.some((i) => r.startsWith(i)) && e.push(r);
  }
  for (const t of e)
    localStorage.removeItem(t);
}
const Xt = {
  schemaVersion: 1,
  id: "card-github",
  title: "github插件",
  icon: "assets/nav-github.svg",
  presentation: "card",
  dockBefore: "daily-aihot",
  rootId: "card-github",
  settingsKeys: ["ghUser", "ghToken", "ghAiServiceConfigV1", "ghArchifyWebhookUrl"],
  capabilities: ["workspace:fullscreen", "view:retained", "github:repositories"],
  loadView: () => import("./GitHubWorkspaceCard-BtqC41Ng.js").then((s) => s.default),
  lifecycle: {
    isVisible: () => U.activeId === "card-github",
    open: () => Ce("card-github"),
    hide: () => le("card-github"),
    // Existing card menus do not expose Quit/Reload. Do not introduce a destructive new path
    // until settings drafts and every child editor provide an aggregate unmount guard.
    canUnmount: () => !1,
    unmountBlockedMessage: "GitHub 工作区保留原有隐藏保活设计；尚未开放独立退出/重载，以免丢失草稿。"
  }
}, Zt = {
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
  loadView: () => import("./BilibiliWorkspace-DW9eR0xd.js").then((s) => s.default),
  lifecycle: {
    isVisible: () => U.activeId === "daily-bilibili",
    open: () => Ce("daily-bilibili"),
    hide: () => le("daily-bilibili"),
    // Hide must not dispose shared radio/player state or interrupt folder/cache operations.
    canUnmount: () => !1,
    unmountBlockedMessage: "B站收藏保留原有隐藏保活设计；尚未开放独立退出/重载，以免打断播放、收藏或缓存操作。"
  }
}, er = {
  schemaVersion: 1,
  id: "daily-aihot",
  title: "ai hot插件",
  icon: "assets/nav-aihot.svg",
  presentation: "card",
  rootId: "daily-aihot",
  // Existing localStorage preferences; registration neither reads nor migrates them.
  settingsKeys: ["lw-info-feed-view", "lw-aihot-feed-cat", "lw-aihot-feed-window"],
  capabilities: ["workspace:fullscreen", "view:retained", "aihot:aggregate"],
  loadView: () => import("./AihotFeed-vnntMQQ2.js").then((s) => s.default),
  lifecycle: {
    isVisible: () => U.activeId === "daily-aihot",
    open: () => Ce("daily-aihot"),
    hide: () => le("daily-aihot"),
    // Keep the original retained card. Its view owns list activity;
    // the separate article reader is not owned or closed by this module.
    canUnmount: () => !1,
    unmountBlockedMessage: "AI HOT 保留原有隐藏保活设计；尚未开放独立退出/重载。"
  }
}, tr = {
  schemaVersion: 1,
  id: "stickers",
  title: "表情包模块",
  emoji: "😺",
  // Keep the chat picker's library management window without a standalone Dock entry.
  showInDock: !1,
  rootId: "vue-stickers-dialog-root",
  settingsKeys: Tt,
  capabilities: ["folder:explicit-permission", "image:explicit-save-delete", "image:local-preview", "image:clipboard"],
  loadView: () => import("./StickersDialog-DiGmYJXK.js").then((s) => s.default),
  lifecycle: {
    isVisible: () => de.visible,
    open: () => {
      de.visible = !0;
    },
    hide: () => {
      de.visible = !1, Pt();
    },
    canUnmount: () => de.pendingWrites === 0,
    unmountBlockedMessage: "图片保存/删除、目录授权或偏好正在处理，暂不能退出/重载；可以先隐藏，已提交操作不会撤回。"
  }
}, rr = "neteaseApiUrl", ir = [rr], sr = {
  schemaVersion: 1,
  id: "music",
  title: "网易云模块",
  icon: "assets/netease.svg",
  rootId: "vue-music-workspace-root",
  settingsKeys: ir,
  capabilities: ["catalog:read", "settings:endpoint", "account:explicit-login-logout", "playback:shared-home-controls"],
  loadView: () => import("./NeteaseWorkspaceDialog-CQfsU7s3.js").then((s) => s.default),
  lifecycle: {
    isVisible: () => X.visible,
    open: () => {
      X.visible = !0;
    },
    hide: () => {
      X.visible = !1, qt();
    },
    canUnmount: () => X.pendingWrites === 0,
    unmountBlockedMessage: "节点保存、登录确认/退出或记录写入正在处理，暂不能退出/重载；可以隐藏。退出窗口不会停止首页播放。"
  }
}, or = Object.freeze([
  "todoistToken",
  "todoistActiveProjectIdV1"
]), nr = {
  schemaVersion: 1,
  id: "todoist",
  title: "todoist",
  icon: "assets/nav-todoist.svg",
  dockBefore: "stickers",
  rootId: "todoist",
  settingsKeys: or,
  capabilities: ["view:retained", "tasks:read-write", "attachments:explicit-upload", "settings:account-rules", "calendar:shared"],
  loadView: () => import("./TodoistWorkspace-BhLMJyB9.js").then((s) => s.default),
  lifecycle: {
    isVisible: () => he.visible,
    open: () => {
      he.visible = !0;
    },
    hide: () => {
      he.visible = !1, Lt();
    },
    canUnmount: () => he.pendingWrites === 0,
    unmountBlockedMessage: "任务、附件、评论或配置正在写入，暂不能退出/重载；可以隐藏。首页限时任务和独立日历不会随窗口退出停止。"
  }
};
let ot = Promise.resolve();
function ie(s, e) {
  const t = async () => {
    if (typeof chrome > "u" || !chrome.storage?.local)
      throw new Error("Chrome storage API unavailable");
    const i = await chrome.storage.local.get(ae), o = pt(i[ae]);
    if (s === "list")
      return o;
    if (s === "append") {
      const n = _t(e);
      n.createdAt = Date.now(), n.read = !1, o.items.some((c) => c.id === n.id) || o.items.unshift(n), o.items = o.items.slice(0, Mt);
    } else if (s === "read-all")
      o.items = o.items.map((n) => ({ ...n, read: !0 }));
    else if (s === "clear")
      o.items = [];
    else if (s === "read" || s === "remove") {
      if (typeof e != "string" || e.length > 200)
        throw new Error("Invalid notification id");
      s === "remove" ? o.items = o.items.filter((n) => n.id !== e) : o.items = o.items.map((n) => n.id === e ? { ...n, read: !0 } : n);
    } else
      throw new Error("Invalid history operation");
    return o.version++, await chrome.storage.local.set({ [ae]: o }), o;
  }, r = ot.then(async () => typeof navigator < "u" && navigator.locks ? await navigator.locks.request("tab-project:notification-history", async () => await t()) : await t());
  return ot = r.catch(() => {
  }), r;
}
const y = $({
  isOpen: !1,
  loading: !1,
  saving: !1,
  error: "",
  version: -1,
  items: []
});
let nt = !1;
function Y(s) {
  s.version < y.version || (y.version = s.version, y.items = s.items);
}
const Wr = {
  state: y,
  start() {
    nt || (nt = !0, typeof chrome < "u" && chrome.storage?.onChanged && chrome.storage.onChanged.addListener((s, e) => {
      if (!(e !== "local" || !s[ae]))
        try {
          Y(pt(s[ae].newValue));
        } catch {
          y.error = "通知历史格式异常，未覆盖当前记录。";
        }
    }), this.refresh());
  },
  async refresh() {
    y.loading = !0;
    try {
      const s = await ie("list");
      Y(s), y.error = "";
    } catch {
      y.error = "通知历史读取失败。请点击“重新读取”重试。";
    } finally {
      y.loading = !1;
    }
  },
  open() {
    this.start(), y.isOpen = !0, this.refresh();
  },
  close() {
    y.isOpen = !1;
  },
  toggle() {
    y.isOpen ? this.close() : this.open();
  },
  async markRead(s) {
    if (!y.saving) {
      y.saving = !0;
      try {
        const e = await ie("read", s);
        Y(e), y.error = "";
      } catch {
        y.error = "标记已读未确认，请重试。";
      } finally {
        y.saving = !1;
      }
    }
  },
  async markAllRead() {
    if (!y.saving) {
      y.saving = !0;
      try {
        const s = await ie("read-all");
        Y(s), y.error = "";
      } catch {
        y.error = "全部标记已读未确认，请重试。";
      } finally {
        y.saving = !1;
      }
    }
  },
  async remove(s) {
    if (!y.saving) {
      y.saving = !0;
      try {
        const e = await ie("remove", s);
        Y(e), y.error = "";
      } catch {
        y.error = "删除通知未确认，请重试。";
      } finally {
        y.saving = !1;
      }
    }
  },
  async clear() {
    if (!y.saving) {
      y.saving = !0;
      try {
        const s = await ie("clear");
        Y(s), y.error = "";
      } catch {
        y.error = "清空通知未确认，请重试。";
      } finally {
        y.saving = !1;
      }
    }
  },
  async activate(s) {
    await this.markRead(s.id), s.target && await this.openTarget(s.target);
  },
  async openTarget(s) {
    const e = Bt(s);
    if (e)
      try {
        if (e.type === "todoist-task") {
          const { openTodoistTask: t } = await import("./task-navigation-Bdn-hP0e.js");
          t(e.taskId);
        } else if (e.type === "github-repository") {
          const { githubRepoDetailController: t } = await import("./github.service-CyBcxOSX.js").then((r) => r.O);
          t.open(e.fullName);
        } else if (e.type === "bili-video") {
          const { biliMiniPlayerController: t } = await import("./mini-player-store-mh4dZhnt.js");
          await t.openVideo({ bvid: e.bvid, aid: e.aid });
        } else if (e.type === "bili-messages") {
          const { biliMessagePanelController: t } = await import("./message-panel-store-B5uQTbg4.js");
          t.openPanel();
        } else {
          const { getDockModule: t } = await import("./window-manager.store-D2fEf4ic.js").then((i) => i.m);
          if (!t(e.moduleId)) throw new Error();
          const { windowManagerController: r } = await import("./window-manager.store-D2fEf4ic.js").then((i) => i.n);
          r.open(e.moduleId);
        }
        this.close();
      } catch {
        y.error = "通知对应页面暂不能打开，记录已保留。";
      }
  }
};
function ar(s) {
  return s.filter((e) => e.appType === "ai-workspace" && !e.read).length;
}
const cr = {
  schemaVersion: 1,
  id: "multica",
  title: "AI 工作区",
  icon: "assets/nav-ai.svg",
  emoji: "✦",
  presentation: "card",
  rootId: "multica",
  settingsKeys: [],
  capabilities: ["workspace:fullscreen", "ai:native", "ai:byok"],
  badgeCount: () => ar(y.items),
  loadView: () => import("./MulticaDialog-Bla6jmIP.js").then((s) => s.M).then((s) => s.default),
  lifecycle: {
    isVisible: () => U.activeId === "multica",
    canOpen: () => ce.isInstalled("multica"),
    open: () => {
      ce.isInstalled("multica") && Ce("multica");
    },
    hide: () => le("multica")
  }
};
try {
  Yt();
} catch (s) {
  console.warn("旧 YouTube 数据清理失败", s);
}
try {
  Qt();
} catch (s) {
  console.warn("旧聊天室数据清理失败", s);
}
W(cr);
W(nr);
W(tr);
W(sr);
W(er);
W(Xt);
W(Zt);
function lr(s) {
  const e = s.map((t) => ({ ...t }));
  for (const t of ft()) {
    if (t.presentation !== "card" || t.showInDock === !1) continue;
    if (e.some((o) => o.id === t.id)) throw new Error("Duplicate workspace card entry");
    const r = { id: t.id, title: t.title, icon: t.icon }, i = t.dockBefore ? e.findIndex((o) => o.id === t.dockBefore) : -1;
    e.splice(i < 0 ? e.length : i, 0, r);
  }
  return e;
}
function ur(s) {
  const e = s.map((t) => ({ ...t }));
  for (const t of ft()) {
    if (t.showInDock === !1 || t.presentation === "card") continue;
    if (e.some((o) => o.id === t.id)) throw new Error("Dock module duplicated in legacy tools");
    const r = { id: t.id, title: t.title, icon: t.icon, emoji: t.emoji }, i = t.dockBefore ? e.findIndex((o) => o.id === t.dockBefore) : -1;
    e.splice(i < 0 ? e.length : i, 0, r);
  }
  return e;
}
function dr(s) {
  const e = s.find((t) => t.id === "daily-bilibili");
  return e ? [e, ...s.filter((t) => t !== e)] : [...s];
}
const hr = dr(lr([])), fr = ur([]), bt = "logicweaver_dock_custom_order", Xe = "logicweaver_dock_position";
function Ze(s) {
  return s === "bottom" || s === "left" || s === "right" || s === "top";
}
function gr() {
  try {
    if (typeof localStorage < "u") {
      const s = localStorage.getItem(Xe);
      if (Ze(s)) return s;
    }
  } catch {
  }
  return "bottom";
}
function mr(s) {
  try {
    typeof localStorage < "u" && localStorage.setItem(Xe, s);
  } catch {
  }
}
function Ie() {
  try {
    if (typeof localStorage < "u") {
      const s = localStorage.getItem(bt);
      if (s) return JSON.parse(s) || {};
    }
  } catch {
  }
  return {};
}
function at(s) {
  try {
    typeof localStorage < "u" && localStorage.setItem(bt, JSON.stringify(s));
  } catch {
  }
}
function yt() {
  const s = fr.filter((t) => ce.isInstalled(t.id)), e = Ie().tools;
  if (Array.isArray(e) && e.length > 0) {
    const t = new Map(s.map((i) => [i.id, i])), r = [];
    for (const i of e) {
      const o = t.get(i);
      o && (r.push(o), t.delete(i));
    }
    for (const i of t.values())
      r.push(i);
    return r;
  }
  return s;
}
function St() {
  const s = hr.filter((t) => ce.isInstalled(t.id)), e = Ie().cards;
  if (Array.isArray(e) && e.length > 0) {
    const t = new Map(s.map((i) => [i.id, i])), r = [];
    for (const i of e) {
      const o = t.get(i);
      o && (r.push(o), t.delete(i));
    }
    for (const i of t.values())
      r.push(i);
    return r;
  }
  return s;
}
const pr = () => ({
  mounted: !1,
  get activeTargetId() {
    return kt() || U.activeId || "";
  },
  activeTools: [],
  cards: St(),
  tools: yt(),
  position: gr()
}), I = $(pr());
typeof window < "u" && (window.addEventListener("logicweaver:dock-modules-changed", () => {
  for (const s of [...I.tools, ...I.cards])
    ce.isInstalled(s.id) || Ct(s.id)?.lifecycle.hide();
  I.tools = yt(), I.cards = St();
}), window.addEventListener("storage", (s) => {
  s.key === Xe && Ze(s.newValue) && (I.position = s.newValue);
}));
Qe.onStateChange((s) => {
  I.activeTools = [...s];
});
let F = {};
function me(s, e) {
  const t = window.chrome, r = t?.runtime?.getURL ? t.runtime.getURL(e) : e, i = s.includes("newtab") || e.includes("newtab");
  if (window.location.href.includes(s) || i && (window.location.pathname.endsWith("/newtab.html") || window.location.pathname === "/newtab.html"))
    return;
  const o = (c) => {
    const l = (c.url || c.pendingUrl || "").toLowerCase();
    return i ? l.includes("newtab.html") || l.startsWith("chrome://newtab") || l.startsWith("edge://newtab") || l.startsWith("chrome-search://local-ntp") || l.includes("chrome-extension://") && l.includes("newtab") || !!(c.title && (c.title.includes("LogicWeaver 新标签页") || c.title === "新标签页" || c.title === "New Tab")) : l.includes(s.toLowerCase());
  };
  if (t?.tabs?.query) {
    t.tabs.query({ currentWindow: !0 }, (c) => {
      const a = c.find(o);
      if (a && a.id != null) {
        if (t.tabs.update(a.id, { active: !0 }), a.windowId != null && t.windows?.update)
          try {
            t.windows.update(a.windowId, { focused: !0 });
          } catch {
          }
      } else
        t.tabs.create({ url: r });
    });
    return;
  }
  const n = document.createElement("a");
  n.href = r, n.target = "_blank", n.rel = "noreferrer", document.body.appendChild(n), n.click(), n.remove();
}
const jr = {
  getSnapshot() {
    return gt(I);
  },
  update(s) {
    const { activeTargetId: e, ...t } = s;
    Object.assign(I, t);
  },
  setMounted(s) {
    I.mounted = s;
  },
  setActiveTools(s) {
    I.activeTools = [...s];
  },
  addActiveTool(s) {
    I.activeTools.includes(s) || I.activeTools.push(s);
  },
  removeActiveTool(s) {
    const e = I.activeTools.indexOf(s);
    e >= 0 && I.activeTools.splice(e, 1);
  },
  triggerItem(s, e) {
    const t = typeof window < "u" ? window.location.pathname + window.location.href : "", r = t.includes("bilibili.html") || t.includes("github.html") || t.includes("aihot.html");
    if (s === "home") {
      if (r) {
        me("newtab.html", "newtab.html");
        return;
      }
      if (F.onHomeClick) {
        F.onHomeClick();
        return;
      }
      const i = document.getElementById("daily-toggle");
      i && i.classList.contains("active") && i.classList.remove("active");
      const o = U.activeId;
      o && le(o), jt(U.activeId), typeof window < "u" && window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      return;
    }
    if (s === "target") {
      const i = {
        "daily-bilibili": "bilibili.html",
        "card-github": "github.html",
        "daily-aihot": "aihot.html"
      };
      if (r) {
        const n = i[e];
        n ? me(n, n) : me("newtab.html", "newtab.html");
        return;
      }
      if (F.onTargetClick) {
        F.onTargetClick(e);
        return;
      }
      const o = window;
      I.activeTargetId === e ? typeof o.exitFullscreenCard == "function" && o.exitFullscreenCard() : typeof o.enterFullscreenCard == "function" && o.enterFullscreenCard(e);
      return;
    }
    if (s === "tool") {
      const i = !!document.getElementById("vue-bili-companions-root");
      if (r && !i) {
        me("newtab.html", "newtab.html");
        return;
      }
      if (!["todoist", "music", "siren", "wallpaper", "stickers", "sync", "multica"].includes(e) && typeof window < "u") {
        const n = window;
        typeof n.exitFullscreenCard == "function" && n.exitFullscreenCard();
      }
      if (F.onToolClick) {
        F.onToolClick(e);
        return;
      }
      Qe.toggle(e);
      return;
    }
  },
  reorderCards(s) {
    const e = new Map(I.cards.map((i) => [i.id, i])), t = [];
    for (const i of s) {
      const o = e.get(i);
      o && (t.push(o), e.delete(i));
    }
    for (const i of e.values()) t.push(i);
    I.cards = t;
    const r = Ie();
    at({ ...r, cards: t.map((i) => i.id) });
  },
  reorderTools(s) {
    const e = new Map(I.tools.map((i) => [i.id, i])), t = [];
    for (const i of s) {
      const o = e.get(i);
      o && (t.push(o), e.delete(i));
    }
    for (const i of e.values()) t.push(i);
    I.tools = t;
    const r = Ie();
    at({ ...r, tools: t.map((i) => i.id) });
  },
  setPosition(s) {
    Ze(s) && I.position !== s && (I.position = s, mr(s), typeof window < "u" && window.dispatchEvent(new CustomEvent("logicweaver:dock-position-changed", { detail: s })));
  },
  setActions(s) {
    F = { ...F, ...s };
  }
}, k = $({
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
let Ne = null;
const _ = {
  state: k,
  setMounted(s) {
    k.mounted = s;
  },
  onAction(s) {
    Ne = s;
  },
  dispatch(s, e) {
    if (Ne)
      return Ne(s, e);
  },
  openMenu(s, e, t, r) {
    k.item = s, k.isFolder = s.isFolder === !0 || !s.url, k.title = s.title || (k.isFolder ? "未命名文件夹" : s.url || ""), k.hostOrCount = r?.hostOrCount || (k.isFolder ? "浏览器文件夹" : s.url || ""), k.iconUrl = r?.iconUrl || "", k.mode = "actions", k.renameValue = s.title || "", k.noteValue = r?.note || "", r?.launcherGroups?.length && (k.launcherGroups = [...r.launcherGroups], k.selectedLauncherGroup = r.launcherGroups[0]), k.statusVisible = !1, k.statusText = "";
    const i = Math.max(10, Math.min(e, window.innerWidth - 300)), o = Math.max(10, Math.min(t, window.innerHeight - 350));
    k.left = i, k.top = o, k.isOpen = !0, this.dispatch("open", { item: s, clientX: e, clientY: t });
  },
  closeMenu() {
    k.isOpen = !1, k.mode = "actions", k.item = null, this.dispatch("close");
  },
  setMode(s) {
    k.mode = s, k.statusVisible = !1, k.statusText = "", this.dispatch("set-mode", s);
  },
  setStatus(s) {
    k.statusText = s, k.statusVisible = !!s;
  },
  openBookmark() {
    this.dispatch("open-bookmark", k.item);
  },
  newSubFolder() {
    this.dispatch("new-folder", k.item);
  },
  saveToLauncher() {
    this.dispatch("save-launcher", {
      item: k.item,
      group: k.selectedLauncherGroup
    });
  },
  saveRename() {
    if (!k.renameValue.trim()) {
      this.setStatus("名称不能为空");
      return;
    }
    this.dispatch("save-rename", {
      item: k.item,
      newTitle: k.renameValue.trim()
    });
  },
  saveNote() {
    this.dispatch("save-note", {
      item: k.item,
      note: k.noteValue.trim()
    });
  },
  confirmDelete() {
    this.dispatch("delete-bookmark", k.item);
  }
}, v = He({
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
}), Oe = /* @__PURE__ */ new Set();
let D = null;
const A = {
  state: v,
  open(s) {
    v.open = !0, s && (v.title = s);
  },
  close() {
    v.open = !1;
  },
  toggle() {
    v.open = !v.open;
  },
  setPinned(s) {
    v.pinned = !!s;
  },
  setTitle(s) {
    v.title = s;
  },
  setPosition(s) {
    v.positionLeft = s;
  },
  showFeedback(s, e = !1) {
    D && (clearTimeout(D), D = null), v.feedbackText = s, v.feedbackError = e, v.feedbackVisible = !0, D = setTimeout(() => {
      v.feedbackVisible = !1, v.feedbackText = "", v.feedbackError = !1;
    }, 2600);
  },
  hideFeedback() {
    D && (clearTimeout(D), D = null), v.feedbackVisible = !1, v.feedbackText = "", v.feedbackError = !1;
  },
  setBookmarks(s, e) {
    v.items = Array.isArray(s) ? [...s] : [], e !== void 0 && (v.emptyText = e);
  },
  setSearchQuery(s) {
    v.searchQuery = s;
  },
  openBookmark(s) {
    this.dispatch("open-bookmark", s);
  },
  openContextMenu(s, e, t) {
    this.dispatch("context-menu", { item: s, clientX: e, clientY: t });
  },
  updateState(s) {
    Object.assign(v, s);
  },
  onAction(s) {
    return Oe.add(s), () => {
      Oe.delete(s);
    };
  },
  dispatch(s, e) {
    for (const t of Oe)
      try {
        t(s, e);
      } catch (r) {
        console.error(`[BookmarkPanel] Handler error for action ${s}:`, r);
      }
  }
}, wr = $({
  mounted: !1,
  enabled: !1,
  folders: [],
  emptyMessage: "书签栏没有文件夹"
}), se = wr;
let Fe = null;
const pe = {
  state: se,
  setMounted(s) {
    se.mounted = s;
  },
  updateState(s) {
    Object.assign(se, s);
  },
  setEnabled(s) {
    se.enabled = s;
  },
  setFolders(s) {
    se.folders = Array.isArray(s) ? [...s] : [];
  },
  onAction(s) {
    Fe = s;
  },
  dispatch(s, e) {
    if (Fe)
      return Fe(s, e);
  },
  openFolder(s) {
    this.dispatch("open-folder", { id: s });
  },
  openContextMenu(s, e, t) {
    this.dispatch("context-menu", { folder: s, clientX: e, clientY: t });
  }
}, kr = "bookmarkPanelPinnedV1";
function J(s) {
  if (!s) return "";
  if (typeof window.hostOf == "function") return window.hostOf(s);
  try {
    return new URL(s).hostname;
  } catch {
    return s;
  }
}
function br(s) {
  return s ? typeof window.favi == "function" ? window.favi(s) : `chrome-extension://${chrome?.runtime?.id || ""}/_favicon/?pageUrl=${encodeURIComponent(s)}&size=32` : "";
}
function we(s) {
  return typeof window.storageGet == "function" ? window.storageGet(s) : new Promise((e) => {
    typeof chrome < "u" && chrome?.storage?.local?.get ? chrome.storage.local.get(s, e) : e({});
  });
}
function $e(s) {
  return typeof window.storageSet == "function" ? window.storageSet(s) : new Promise((e) => {
    typeof chrome < "u" && chrome?.storage?.local?.set ? chrome.storage.local.set(s, () => e()) : e();
  });
}
async function ct(s, e = {}, t = 5e3) {
  if (typeof window.fetchTimeout == "function")
    return window.fetchTimeout(s, e, t);
  const r = new AbortController(), i = setTimeout(() => r.abort(), t);
  try {
    return await fetch(s, { credentials: "omit", ...e, signal: r.signal });
  } finally {
    clearTimeout(i);
  }
}
class yr {
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
        const e = await we(["showBookmarkFoldersTop", "showBookmarkPanel", "bookmarkRemarks"]).catch(() => ({}));
        this.importState.remarks = e?.bookmarkRemarks || {};
        const t = e?.showBookmarkFoldersTop === !0, r = e?.showBookmarkPanel !== !1;
        await this.ensureBookmarkData(), await this.renderTopBookmarkFolderStrip(t && r);
      } catch (e) {
        console.warn("[BookmarksService] Failed to initialize bookmarks", e);
      }
      typeof chrome < "u" && chrome?.storage?.onChanged && chrome.storage.onChanged.addListener((e, t) => {
        t === "local" && (e.showBookmarkFoldersTop || e.showBookmarkPanel) && we(["showBookmarkFoldersTop", "showBookmarkPanel"]).then((r) => {
          const i = r?.showBookmarkFoldersTop === !0, o = r?.showBookmarkPanel !== !1;
          this.renderTopBookmarkFolderStrip(i && o);
        });
      });
    }
  }
  initWorker() {
    if (!(typeof Worker > "u"))
      try {
        this.worker = new Worker("generated/bookmarks-worker.js"), this.worker.onmessage = (e) => {
          const { id: t, type: r, result: i, error: o } = e.data || {};
          if (!t || !this.workerPending.has(t)) return;
          const { resolve: n, reject: c } = this.workerPending.get(t);
          this.workerPending.delete(t), o ? c(new Error(o)) : n(i);
        }, this.worker.onerror = () => {
          for (const e of [...this.workerPending.values()]) e.reject(new Error("Bookmarks Worker failed"));
        }, this.importState.loaded && (this.workerReady = this.callWorker("INDEX_BOOKMARKS", { tree: this.importState.tree ? [this.importState.tree] : [] }), this.workerReady.catch(() => {
        }));
      } catch (e) {
        console.warn("[BookmarksWorker] Failed to initialize Web Worker:", e), this.worker = null;
      }
  }
  callWorker(e, t, r = 5e3, i) {
    return i?.aborted ? Promise.reject(new DOMException("Cancelled", "AbortError")) : (this.worker || this.initWorker(), this.worker ? new Promise((o, n) => {
      const c = ++this.workerSeq, a = () => {
        clearTimeout(h), i?.removeEventListener("abort", d), this.workerPending.delete(c);
      }, l = {
        resolve: (u) => {
          a(), o(u);
        },
        reject: (u) => {
          a(), n(u);
        }
      }, d = () => l.reject(new DOMException("Cancelled", "AbortError")), h = setTimeout(() => l.reject(new Error(`Worker request timeout [${e}]`)), r);
      this.workerPending.set(c, l), i?.addEventListener("abort", d, { once: !0 });
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
      const i = await this.callWorker("SEARCH_BOOKMARKS", { query: e, limit: t }, 5e3, r);
      return Array.isArray(i) ? i : null;
    } catch {
      if (r?.aborted) throw new DOMException("Cancelled", "AbortError");
      return null;
    }
  }
  collectBookmarks(e, t = [], r = [], i = []) {
    let o = e.title || "";
    !o && (e.id === "1" || e.id === "2" || e.id === "3") && (o = e.id === "1" ? "书签栏" : e.id === "2" ? "其他书签" : "移动设备书签");
    const n = o ? [...t, o] : t, c = e.id && e.id !== "0" ? [...i, String(e.id)] : i;
    for (const a of e.children || [])
      a.url ? r.push({
        id: a.id,
        parentId: a.parentId,
        index: a.index,
        title: a.title || J(a.url),
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
    const t = (await we(["searchIgnoredBookmarkFolders"]).catch(() => ({})))?.searchIgnoredBookmarkFolders;
    return this.ignoredFoldersCache = Array.isArray(t) ? t : [], this.ignoredFoldersCache;
  }
  isBookmarkIgnored(e, t, r) {
    if (!t || !t.length) return !1;
    const i = /* @__PURE__ */ new Set(), o = [], n = [], c = (u) => u ? u.toLowerCase().trim().replace(/\s*[/／]\s*/g, "/").replace(/^(书签栏|收藏夹栏|bookmarks bar|favorites bar|书签|bookmarks|其他书签|other bookmarks|移动设备书签|mobile bookmarks)\//i, "").trim() : "";
    for (const u of t)
      if (typeof u == "string") {
        i.add(u);
        const f = u.toLowerCase().trim();
        o.push(f), n.push(c(f));
      } else if (u && typeof u == "object" && (u.id && i.add(String(u.id)), u.path)) {
        const f = u.path.trim().toLowerCase();
        o.push(f), n.push(c(f));
      }
    const a = String(e.id || ""), l = String(e.parentId || "");
    if (a && i.has(a) || l && i.has(l) || e.folderIds && e.folderIds.some((u) => i.has(String(u))))
      return !0;
    const d = (u) => {
      if (!u) return !1;
      const f = u.toLowerCase().trim(), S = c(f);
      if (o.some((m) => f === m || f.startsWith(m + " /") || f.startsWith(m + "/")) || n.some((m) => m && (S === m || S.startsWith(m + "/"))))
        return !0;
      for (const m of n) {
        if (!m) continue;
        const b = m.split("/").pop();
        if (b && (S === b || S.endsWith("/" + b) || S.includes("/" + b + "/")))
          return !0;
      }
      return !1;
    }, h = r || (this.folderMapCache ?? void 0);
    if (h && a && h.has(a)) {
      const u = h.get(a);
      if (u.folderIds && u.folderIds.some((f) => i.has(String(f))) || u.folder && d(u.folder))
        return !0;
    }
    return !!(e.folder && d(e.folder));
  }
  bookmarkBarRoot(e) {
    return e && ((e.children || []).find((t) => String(t.id) === "1") || (e.children || []).find((t) => /书签栏|收藏夹栏|bookmarks bar|favorites bar/i.test(t.title || "")) || e.children?.[0]) || null;
  }
  bookmarkNodeById(e, t) {
    if (!e) return null;
    if (String(e.id) === String(t)) return e;
    for (const r of e.children || []) {
      const i = this.bookmarkNodeById(r, t);
      if (i) return i;
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
      const e = await we(["bookmarkRemarks"]).catch(() => ({}));
      this.importState.remarks = e?.bookmarkRemarks || {};
      let t = [];
      typeof chrome < "u" && chrome?.bookmarks?.getTree && (t = await new Promise((r) => chrome.bookmarks.getTree(r))), this.importState.tree = t?.[0] || null, this.importState.tree ? this.importState.items = this.collectBookmarks(this.importState.tree, [], []).sort(
        (r, i) => r.folder.localeCompare(i.folder, "zh") || r.title.localeCompare(i.title, "zh")
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
    this.topBookmarkFoldersEnabled = !!e, pe.setEnabled(this.topBookmarkFoldersEnabled);
    const t = document.getElementById("bookmark-folder-strip"), r = document.getElementById("bookmark-handle"), i = document.querySelector(".topbar");
    if (r && (r.hidden = this.topBookmarkFoldersEnabled), t && (t.hidden = !this.topBookmarkFoldersEnabled), i?.classList.toggle("bookmark-folders-mode", this.topBookmarkFoldersEnabled), !this.topBookmarkFoldersEnabled) {
      pe.setFolders([]);
      return;
    }
    let o = [];
    typeof chrome < "u" && chrome?.bookmarks?.getTree && (o = await new Promise((d) => chrome.bookmarks.getTree(d)));
    const n = this.bookmarkBarRoot(o?.[0] || null), c = await this.getIgnoredFolders(), a = this.getBookmarkFolderMap(), l = (n?.children || []).filter((d) => !(d.url || this.isBookmarkIgnored(d, c, a)));
    if (pe.setFolders(
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
    const t = String(e || "");
    this.importState.expandedFolders.has(t) ? this.importState.expandedFolders.delete(t) : this.importState.expandedFolders.add(t), this.renderBookmarkImports();
  }
  async renderBookmarkImports(e = "") {
    const t = e.trim().toLowerCase(), r = await this.getIgnoredFolders(), i = this.getBookmarkFolderMap(), o = this.importState.items.filter(
      (n) => !this.isBookmarkIgnored(n, r, i)
    );
    if (!o.length)
      A.setBookmarks([], "书签栏为空");
    else if (t) {
      const n = o.filter(
        (c) => `${c.title} ${c.url} ${c.folder}`.toLowerCase().includes(t)
      );
      A.setBookmarks(
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
      const c = (this.importState.focusFolderId ? this.bookmarkNodeById(this.importState.tree, this.importState.focusFolderId) : null)?.children || this.importState.tree?.children || [], a = (l, d = 0) => {
        const h = [];
        for (const u of l) {
          if (this.isBookmarkIgnored(u, r, i)) continue;
          const f = !u.url, S = f && this.importState.expandedFolders.has(String(u.id));
          h.push({
            id: String(u.id),
            title: u.title || u.url || "未命名",
            url: u.url,
            isFolder: f,
            level: d,
            expanded: S,
            parentId: u.parentId
          }), f && S && Array.isArray(u.children) && h.push(...a(u.children, d + 1));
        }
        return h;
      };
      A.setBookmarks(a(c));
    }
  }
  async openBookmarkFolderWindow(e) {
    await this.ensureBookmarkData();
    const t = String(e || ""), r = this.bookmarkNodeById(this.importState.tree, t);
    if (!r || r.url) {
      A.showFeedback("这个书签页不存在", !0);
      return;
    }
    if (this.importState.focusFolderId === t && A.state.open) {
      this.closeBookmarkPanel();
      return;
    }
    await this.openBookmarkPanel(t);
  }
  async openBookmarkPanel(e = "", t = null) {
    this.importState.focusFolderId = String(e || ""), this.importState.expandedFolders.clear(), this.applyBookmarkPanelPosition(this.importState.focusFolderId, t);
    const r = document.getElementById("bookmark-handle");
    r?.setAttribute("aria-expanded", "true"), r && (r.title = "收起浏览器书签");
    const i = document.getElementById("bookmark-handle-icon");
    i && (i.textContent = "📂"), await this.ensureBookmarkData();
    const o = this.importState.focusFolderId ? this.bookmarkNodeById(this.importState.tree, this.importState.focusFolderId) : null;
    this.importState.focusFolderId && !o && (this.importState.focusFolderId = "");
    const n = o ? `书签 · ${o.title || "文件夹"}` : "浏览器书签";
    A.open(n), A.setPinned(this.importState.panelPinned), this.renderBookmarkImports();
  }
  closeBookmarkPanel() {
    this.importState.expandedFolders.clear();
    const e = document.getElementById("bookmark-handle");
    e?.setAttribute("aria-expanded", "false"), e && (e.title = "展开浏览器书签");
    const t = document.getElementById("bookmark-handle-icon");
    t && (t.textContent = "📁"), A.close();
  }
  toggleBookmarkPanel() {
    A.state.open ? this.closeBookmarkPanel() : this.openBookmarkPanel();
  }
  setBookmarkPanelPinned(e, t = !0) {
    this.importState.panelPinned = !!e, t && $e({ [kr]: this.importState.panelPinned }), A.setPinned(this.importState.panelPinned);
  }
  applyBookmarkPanelPosition(e = null, t = null) {
    const r = String(e ?? this.importState.focusFolderId ?? ""), i = t || (r ? document.querySelector(`.bookmark-folder-chip[data-bookmark-folder-id="${r}"]`) : null) || document.getElementById("bookmark-handle");
    if (i && i.offsetParent !== null) {
      const o = i.getBoundingClientRect(), c = Math.max(8, Math.min(window.innerWidth - 310 - 8, Math.round(o.left)));
      A.setPosition(c);
    } else
      A.setPosition(null);
  }
  openBookmarkNoteMenu(e, t, r) {
    if (!e) return;
    const i = e.isFolder === !0 || !e.url;
    this.editingItem = { ...e, isFolder: i }, _.setMode("actions");
    const o = V.getPageNames().map((l) => ({
      id: l,
      name: V.getPageLabel(l)
    })), n = i ? `${this.countBookmarkLinks(this.bookmarkNodeById(this.importState.tree, e.id))} 个书签 · 浏览器文件夹` : J(e.url), c = i ? "" : br(e.url), a = i ? "" : this.importState.remarks?.[e.url] || "";
    _.openMenu(e, t, r, {
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
      _.setStatus("名称不能为空");
      return;
    }
    if (r === (t.title || "").trim()) {
      _.closeMenu();
      return;
    }
    try {
      await this.bookmarkApiUpdate(t.id, { title: r }), _.closeMenu(), await this.reloadBookmarkTree(), A.showFeedback(`已将${t.isFolder ? "文件夹" : "书签"}重命名为「${r}」`);
    } catch (i) {
      _.setStatus(i.message || `重命名${t.isFolder ? "文件夹" : "书签"}失败`);
    }
  }
  async saveBookmarkNote(e) {
    const t = this.editingItem;
    if (!t || !t.url) return;
    const r = String(e ?? "").trim();
    r ? this.importState.remarks[t.url] = r : delete this.importState.remarks[t.url], await $e({ bookmarkRemarks: this.importState.remarks }), _.closeMenu(), this.renderBookmarkImports();
  }
  async deleteBookmarkFromContextMenu() {
    const e = this.editingItem;
    if (e)
      try {
        await this.bookmarkApiRemove(e.id, e.isFolder), !e.isFolder && e.url && (delete this.importState.remarks[e.url], await $e({ bookmarkRemarks: this.importState.remarks })), _.closeMenu(), await this.reloadBookmarkTree(), A.showFeedback(`已删除${e.isFolder ? "文件夹" : "书签"}「${e.title || J(e.url)}」`);
      } catch (t) {
        _.setStatus(t.message || `删除${e.isFolder ? "文件夹" : "书签"}失败`);
      }
  }
  async saveBookmarkToLauncher(e) {
    const t = this.editingItem;
    if (!t || !t.url) return;
    const r = e || "常用网站";
    try {
      await V.ready;
      const i = new URL(V.normalizeUrl(t.url));
      if (i.protocol !== "http:" && i.protocol !== "https:") throw new Error("仅支持 HTTP/HTTPS 网站");
      await V.addLink({ title: t.title, url: i.href, group: "常用网站", page: r }), _.closeMenu(), A.showFeedback(`已将「${t.title || t.url}」添加到常用网站`);
    } catch (i) {
      A.showFeedback(i.message || "添加到常用网站失败", !0);
    }
  }
  bookmarkApiMove(e, t) {
    return new Promise((r, i) => {
      if (typeof chrome > "u" || !chrome.bookmarks?.move)
        return r(null);
      chrome.bookmarks.move(String(e), t, (o) => {
        const n = chrome.runtime.lastError;
        n ? i(new Error(n.message)) : r(o);
      });
    });
  }
  bookmarkApiCreate(e) {
    return new Promise((t, r) => {
      if (typeof chrome > "u" || !chrome.bookmarks?.create)
        return t(null);
      chrome.bookmarks.create(e, (i) => {
        const o = chrome.runtime.lastError;
        o ? r(new Error(o.message)) : t(i);
      });
    });
  }
  bookmarkApiUpdate(e, t) {
    return new Promise((r, i) => {
      if (typeof chrome > "u" || !chrome.bookmarks?.update)
        return r(null);
      chrome.bookmarks.update(String(e), t, (o) => {
        const n = chrome.runtime.lastError;
        n ? i(new Error(n.message)) : r(o);
      });
    });
  }
  bookmarkApiRemove(e, t = !1) {
    return new Promise((r, i) => {
      if (typeof chrome > "u" || !chrome.bookmarks?.remove)
        return r();
      chrome.bookmarks[t ? "removeTree" : "remove"](String(e), () => {
        const o = chrome.runtime.lastError;
        o ? i(new Error(o.message)) : r();
      });
    });
  }
  compactBookmarkRemark(e, t) {
    e = String(e || "").replace(/\s+/g, " ").trim();
    const r = t.title || J(t.url), i = J(t.url), o = [], n = e.match(/^Title:\s*(.+)$/im);
    n && o.push(n[1]);
    const c = e.match(/(?:Description|摘要|简介)[:：]\s*(.{8,120})/i);
    c && o.push(c[1]);
    const a = e.split(/[。.!?\n]/).map((d) => d.trim()).filter((d) => d.length >= 8 && d.length <= 120);
    o.push(...a.slice(0, 4));
    let l = o.find((d) => !/cookie|privacy|登录|验证码|javascript|enable/i.test(d)) || `${r}：${i}`;
    return l = l.replace(/^Title:\s*/i, "").replace(/\s+/g, " ").trim(), !l.includes("：") && !l.includes(":") && (l = `${r}：${l}`), l.length > 42 ? l.slice(0, 41) + "…" : l;
  }
  async callAiForBookmarkRemark(e, t) {
    const r = e.title || J(e.url), i = String(t || "").replace(/\s+/g, " ").slice(0, 1e3), o = ["http://127.0.0.1:11434/v1/chat/completions"], n = `请为书签【${r}】（网址: ${e.url}，网页内容摘要: ${i || "无"}）写一句简明扼要的中文备注。
要求：仅用一句话概括其核心用途与特色，严格控制在 25 字以内，不要任何多余废话或引号，直接输出一句话备注。`;
    for (const c of o)
      try {
        const a = await ct(c, {
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
          const d = (await a.json()).choices?.[0]?.message?.content?.trim();
          if (d && d.length >= 2 && d.length <= 45)
            return d.replace(/^["'“”‘’]|["'“”‘’]$/g, "").trim();
        }
      } catch {
      }
    return this.compactBookmarkRemark(t, e);
  }
  async analyzeBookmarkRemark(e) {
    const t = `https://r.jina.ai/${e.url}`;
    try {
      const r = await ct(t, { headers: { Accept: "text/plain" } }, 15e3), i = r.ok ? await r.text() : "";
      return await this.callAiForBookmarkRemark(e, i.slice(0, 2500));
    } catch {
      return await this.callAiForBookmarkRemark(e, "");
    }
  }
  wireListeners() {
    pe.onAction((e, t) => {
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
    }), A.onAction((e, t) => {
      e === "toggle-pin" ? this.setBookmarkPanelPinned(t) : e === "close" ? this.closeBookmarkPanel() : e === "open-bookmark" && t ? t.isFolder ? this.toggleFolderExpand(t.id) : t.url && (typeof chrome < "u" && chrome.tabs?.create ? chrome.tabs.create({ url: t.url, active: !0 }) : window.open(t.url, "_blank")) : e === "context-menu" && t?.item && this.openBookmarkNoteMenu(t.item, t.clientX, t.clientY);
    }), _.onAction(async (e, t) => {
      if (e === "open-bookmark") {
        const r = t || this.editingItem;
        if (!r) return;
        r.isFolder ? this.openBookmarkPanel(r.id) : r.url && (typeof chrome < "u" && chrome.tabs?.create ? chrome.tabs.create({ url: r.url, active: !0 }) : window.open(r.url, "_blank")), _.closeMenu();
      } else e === "save-launcher" ? await this.saveBookmarkToLauncher(t?.group) : e === "save-rename" ? await this.saveBookmarkRename(t?.newTitle) : e === "save-note" ? await this.saveBookmarkNote(t?.note) : e === "delete-bookmark" && await this.deleteBookmarkFromContextMenu();
    });
  }
}
const oe = new yr(), M = {
  searchProviders: He(/* @__PURE__ */ new Map()),
  menuProviders: He(/* @__PURE__ */ new Map())
};
function Sr(s, e, t) {
  return new Promise((r) => {
    const i = new AbortController();
    let o = !1, n;
    const c = (l = []) => {
      o || (o = !0, clearTimeout(n), t?.removeEventListener("abort", a), r(l), i.abort());
    }, a = () => c();
    if (t?.aborted) {
      c();
      return;
    }
    t?.addEventListener("abort", a, { once: !0 }), n = setTimeout(a, 1500), Promise.resolve().then(() => o ? [] : s.provideSuggestions(e, i.signal)).then((l) => {
      if (o) return;
      const d = [];
      for (const h of Array.isArray(l) ? l.slice(0, 10) : [])
        if (!(!h || typeof h.title != "string" || typeof h.url != "string"))
          try {
            const u = new URL(h.url);
            if (!["http:", "https:"].includes(u.protocol) || u.username || u.password) continue;
            d.push({
              id: JSON.stringify(["plugin", s.id, d.length]),
              title: h.title.slice(0, 200),
              url: u.href,
              meta: typeof h.meta == "string" ? h.meta.slice(0, 300) : s.name,
              badge: { text: s.name }
            });
          } catch {
          }
      c(d);
    }).catch(() => c());
  });
}
const vr = {
  // --- A. 搜索挂载槽 (Search Slot) ---
  registerSearchProvider(s) {
    if (!s.id.trim() || typeof s.provideSuggestions != "function") throw new Error("搜索提供者 ID 和函数不能为空");
    const e = { ...s };
    return M.searchProviders.set(s.id, e), () => {
      M.searchProviders.get(s.id) === e && M.searchProviders.delete(s.id);
    };
  },
  unregisterSearchProvider(s) {
    M.searchProviders.delete(s);
  },
  /** 聚合调用所有插件注册的搜索建议提供者 */
  async querySearchProviders(s, e) {
    const t = s.trim();
    if (!t) return [];
    const r = [...M.searchProviders.values()].sort((o, n) => (o.priority ?? 100) - (n.priority ?? 100)), i = await Promise.all(r.map(
      (o) => Sr(o, t, e)
    ));
    return e?.aborted ? [] : i.flatMap(
      (o, n) => M.searchProviders.get(r[n].id) === r[n] ? o : []
    ).slice(0, 40);
  },
  // --- B. 右键菜单挂载槽 (Context Menu Slot) ---
  registerMenuProvider(s) {
    if (!s.id.trim()) throw new Error("菜单提供者 ID 不能为空");
    const e = /* @__PURE__ */ new Set();
    for (const r of s.actions) {
      if (!r.id.trim() || e.has(r.id) || typeof r.execute != "function") throw new Error("菜单动作 ID 不能为空或重复，且须提供执行函数");
      e.add(r.id);
    }
    const t = { ...s, actions: s.actions.map((r) => ({ ...r })) };
    return M.menuProviders.set(s.id, t), () => {
      M.menuProviders.get(s.id) === t && M.menuProviders.delete(s.id);
    };
  },
  unregisterMenuProvider(s) {
    M.menuProviders.delete(s);
  },
  /** 获取适用于指定目标的插件右键菜单动作 */
  getMenuActionsForTarget(s) {
    const e = [];
    for (const t of M.menuProviders.values())
      for (const r of t.actions) {
        const i = r.targetKind || "all";
        if (i === "all" || i === s.kind) {
          const o = () => M.menuProviders.get(t.id) === t;
          e.push({
            ...r,
            id: JSON.stringify([t.id, r.id]),
            disabled: (n) => {
              if (!o()) return !0;
              try {
                return !!r.disabled?.({ ...n, source: s.source });
              } catch {
                return !0;
              }
            },
            execute: (n) => {
              const c = { ...n, source: s.source };
              if (!(!o() || r.disabled?.(c)))
                return r.execute(c);
            }
          });
        }
      }
    return e;
  }
};
function be(s) {
  try {
    const e = new URL(s.trim());
    return !["http:", "https:", "ftp:", "file:", "chrome:", "edge:", "about:"].includes(e.protocol) || e.username || e.password ? "" : e.href;
  } catch {
    return "";
  }
}
function Ir(s, e, t) {
  const r = xt(s, e, t);
  if (typeof r == "number" && r > 0) return r;
  const i = (u) => u.normalize("NFKC").toLowerCase().trim(), o = i(s), n = i(e), c = i(t);
  if (!o) return 0;
  const a = n === o ? 100 : n.startsWith(o) ? 85 : n.includes(o) ? 70 : 0;
  let l = "";
  try {
    l = new URL(t).hostname.replace(/^www\./, "").toLowerCase();
  } catch {
  }
  const d = l === o ? 95 : l.startsWith(o) ? 80 : c.includes(o) ? 60 : 0;
  if (a || d) return Math.max(a, d);
  const h = o.split(/\s+/).filter(Boolean);
  return h.length > 1 && h.every((u) => n.includes(u)) ? 55 : h.length > 1 && h.every((u) => (n + " " + c).includes(u)) ? 45 : 0;
}
function Cr(s, e, t = 40) {
  const r = /* @__PURE__ */ new Map();
  for (const i of e) {
    const { item: o } = i, n = o.url ? be(o.url) : i.source === "plugin" ? "plugin:" + o.id : "";
    if (!n) continue;
    const c = Ir(s, o.title || "", o.url || "") || (i.fuzzyMatch ? 15 : 0);
    if (!c) continue;
    const a = r.get(n);
    a ? (a.sources.add(i.source), a.visitedAt = Math.max(a.visitedAt, i.visitedAt || 0), a.score = Math.max(a.score, c), a.candidate.source === "history" && i.source !== "history" && (a.candidate = i), i.item.launcherLinkId && !a.candidate.item.launcherLinkId && (a.candidate.item.launcherLinkId = i.item.launcherLinkId), i.item.bookmarkId && !a.candidate.item.bookmarkId && (a.candidate.item.bookmarkId = i.item.bookmarkId)) : r.set(n, { candidate: i, score: c, visitedAt: i.visitedAt || 0, sources: /* @__PURE__ */ new Set([i.source]), order: r.size });
  }
  return [...r.values()].sort((i, o) => o.score - i.score || o.visitedAt - i.visitedAt || i.order - o.order).slice(0, t).map(({ candidate: i, sources: o }) => {
    const n = [o.has("launcher") ? "常用网站" : "", o.has("bookmark") ? "书签" : "", o.has("history") ? "历史" : ""].filter(Boolean);
    return {
      ...i.item,
      badge: n.length ? { ...i.item.badge, text: n.join(" · ") } : i.item.badge,
      sources: Array.from(o),
      launcherLinkId: i.item.launcherLinkId,
      bookmarkId: i.item.bookmarkId
    };
  });
}
function Gr(s) {
  const e = Math.max(0, Math.floor(s || 0)), t = Math.floor(e / 60), r = e % 60;
  return `${t}:${String(r).padStart(2, "0")}`;
}
function qe(s) {
  const e = Number(s || 0);
  return !Number.isFinite(e) || e <= 0 ? "0" : e >= 1e8 ? `${(e / 1e8).toFixed(1).replace(/\.0$/, "")}亿` : e >= 1e4 ? `${(e / 1e4).toFixed(1).replace(/\.0$/, "")}万` : String(e);
}
function Kr(s) {
  const e = Math.max(0, Math.floor(s || 0)), t = Math.floor(e / 60), r = e % 60, i = (o) => String(o).padStart(2, "0");
  if (t >= 60) {
    const o = Math.floor(t / 60), n = t % 60;
    return `${i(o)}:${i(n)}:${i(r)}`;
  }
  return `${i(t)}:${i(r)}`;
}
function Yr(s) {
  if (!s) return 0;
  const e = String(s).split(":").map(Number);
  return e.length === 2 ? (e[0] || 0) * 60 + (e[1] || 0) : e.length === 3 ? (e[0] || 0) * 3600 + (e[1] || 0) * 60 + (e[2] || 0) : Number(s) || 0;
}
function Jr(s) {
  const e = String(s || "").split(/\r?\r\n/).map((o) => o.replace(/\s+/g, " ").trim()).filter(Boolean), t = e.filter((o, n) => n === 0 || o !== e[n - 1]).map((o) => /[。！？!?；;：:，,、…”’）》】）]$/.test(o) ? o : /^(为什么|为何|怎么|如何|什么|是否|谁|哪[个里])/.test(o) || /(吗|么|呢|为何|为什么|怎么|如何|多少|什么|哪[个里]|是否)$/.test(o) ? `${o}？` : `${o}。`), r = [];
  let i = "";
  return t.forEach((o) => {
    i += o, i.length >= 450 && (r.push(i), i = "");
  }), i && r.push(i), r;
}
const je = $({
  bilibili: null,
  github: null,
  netease: null
});
let Er = 0;
function Ar(s, e) {
  const t = e.trim();
  t && (je[s] = { id: ++Er, keyword: t });
}
function Qr(s) {
  const e = je[s];
  return je[s] = null, e;
}
const vt = "tab-project:quick-workspace-search", Ge = "tab-project:quick-workspace-search:v1";
function Ke(s) {
  if (!s || !["bilibili", "github", "netease"].includes(s.target) || typeof s.keyword != "string") return null;
  const e = s.keyword.trim();
  if (!e || e.length > 1024) return null;
  const t = { target: s.target, keyword: e };
  return s.target === "github" && ["exact", "fuzzy", "topic", "smart"].includes(s.githubRule) && (t.githubRule = s.githubRule), t;
}
function lt() {
  return typeof location < "u" && location.pathname.endsWith("/newtab-search.html");
}
async function Tr(s) {
  const e = Ke(s);
  if (!e) throw new Error("搜索内容无效或过长。");
  const t = chrome.runtime.getURL("newtab.html");
  let r = [];
  try {
    r = await chrome.tabs.query({});
  } catch {
  }
  const i = r.filter((o) => Number.isInteger(o.id) && typeof o.url == "string" && o.url.split(/[?#]/, 1)[0] === t).sort((o, n) => (n.lastAccessed || 0) - (o.lastAccessed || 0));
  for (const o of i) {
    const n = Date.now() + 1500;
    let c;
    try {
      c = await Promise.race([
        chrome.runtime.sendMessage({ type: vt, targetTabId: o.id, expires: n, request: e }),
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
    sessionStorage.setItem(Ge, JSON.stringify({ request: e, expires: Date.now() + 6e4 }));
  } catch {
    throw new Error("无法保存搜索请求，请先打开主标签页重试。");
  }
  location.assign(t);
}
function Xr(s) {
  let e = !0;
  const t = (r, i, o) => {
    if (r?.type !== vt || i?.id !== chrome.runtime.id || typeof i?.url != "string" || i.url.split(/[?#]/, 1)[0] !== chrome.runtime.getURL("newtab-search.html")) return;
    const n = Ke(r.request);
    if (!(!n || !Number.isInteger(r.targetTabId) || typeof r.expires != "number" || r.expires <= Date.now() || r.expires > Date.now() + 5e3))
      return chrome.tabs.getCurrent().then((c) => {
        !e || c?.id !== r.targetTabId || Date.now() >= r.expires || (s(n), o({ ok: !0 }));
      }).catch(() => {
      }), !0;
  };
  chrome.runtime.onMessage.addListener(t);
  try {
    const r = sessionStorage.getItem(Ge);
    if (r) {
      sessionStorage.removeItem(Ge);
      const i = JSON.parse(r), o = Ke(i?.request);
      o && typeof i.expires == "number" && i.expires > Date.now() && i.expires <= Date.now() + 6e4 && s(o);
    }
  } catch {
  }
  return () => {
    e = !1, chrome.runtime.onMessage.removeListener(t);
  };
}
const Pr = [
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
], x = [
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
], H = "tab_project_search_slots", T = At(Lr());
function Lr() {
  if (typeof localStorage > "u")
    return JSON.parse(JSON.stringify(x));
  try {
    const s = localStorage.getItem(H);
    if (s) {
      const e = JSON.parse(s);
      if (Array.isArray(e) && e.length > 0) {
        const t = e.map((r) => {
          const i = x.find((o) => o.id === r.id);
          return i ? {
            ...i,
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
        return t.some((r) => r.id === "netease") || t.push({ ...x.find((r) => r.id === "netease") }), t.length ? t : JSON.parse(JSON.stringify(x));
      }
    }
  } catch (s) {
    console.warn("[SearchSlots] Failed to parse stored slots:", s);
  }
  return JSON.parse(JSON.stringify(x));
}
typeof chrome < "u" && chrome.storage?.local && chrome.storage.local.get([H], (s) => {
  if (s?.[H] && Array.isArray(s[H])) {
    const e = s[H];
    if (e.length > 0) {
      const t = e.map((r) => {
        const i = x.find((o) => o.id === r.id);
        return i ? {
          ...i,
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
      t.some((r) => r.id === "netease") || t.push({ ...x.find((r) => r.id === "netease") }), T.value = t.length ? t : JSON.parse(JSON.stringify(x));
    }
  }
});
const Ye = mt(() => {
  const s = T.value.filter((e) => e.enabled);
  return s.length > 0 ? s : x.slice(0, 1);
});
function ue() {
  const s = JSON.parse(JSON.stringify(T.value)), e = JSON.stringify(s);
  try {
    typeof localStorage < "u" && localStorage.setItem(H, e);
  } catch {
  }
  if (typeof chrome < "u" && chrome.storage?.local)
    try {
      chrome.storage.local.set({ [H]: s });
    } catch {
    }
  typeof window < "u" && window.dispatchEvent(new CustomEvent("tab-project:search-slots-updated", {
    detail: s
  }));
}
function _r(s) {
  const e = `custom_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`, t = {
    ...s,
    id: e,
    enabled: !0,
    isBuiltin: !1
  };
  return T.value.push(t), ue(), t;
}
function Mr(s) {
  const e = T.value.findIndex((t) => t.id === s);
  e !== -1 && (T.value[e].isBuiltin ? T.value[e].enabled = !1 : T.value.splice(e, 1), ue());
}
function Br(s, e) {
  const t = T.value.findIndex((o) => o.id === s);
  if (t === -1) return;
  const r = e === "up" ? t - 1 : t + 1;
  if (r < 0 || r >= T.value.length) return;
  const [i] = T.value.splice(t, 1);
  T.value.splice(r, 0, i), ue();
}
function xr() {
  T.value = JSON.parse(JSON.stringify(x)), ue();
}
function ye(s, e) {
  if (s.id === "web")
    return Je().buildUrl(e);
  const t = s.searchUrl || "https://www.bing.com/search?q={query}", r = encodeURIComponent(e.trim());
  return t.includes("{query}") ? t.replace(/\{query\}/g, r) : t.includes("%s") ? t.replace(/%s/g, r) : `${t}${t.includes("?") ? "&" : "?"}q=${r}`;
}
const Rr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  DEFAULT_BUILTIN_SLOTS: x,
  SEARCH_SLOT_TEMPLATES: Pr,
  addSearchSlot: _r,
  buildSlotSearchUrl: ye,
  deleteSearchSlot: Mr,
  enabledSearchSlots: Ye,
  moveSearchSlot: Br,
  persistSlots: ue,
  resetSearchSlotsToDefault: xr,
  searchSlots: T
}, Symbol.toStringTag, { value: "Module" })), ut = "logicweaverLauncherSearchMode", dt = ["web", "bilibili", "github", "netease", "qcc"], ht = [
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
], De = {
  bing: {
    id: "bing",
    name: "Bing 必应",
    shortName: "Bing",
    badgeClass: "badge-bing",
    buildUrl: (s) => `https://www.bing.com/search?q=${encodeURIComponent(s)}`
  },
  google: {
    id: "google",
    name: "Google 谷歌",
    shortName: "Google",
    badgeClass: "badge-google",
    buildUrl: (s) => `https://www.google.com/search?q=${encodeURIComponent(s)}`
  },
  baidu: {
    id: "baidu",
    name: "Baidu 百度",
    shortName: "百度",
    badgeClass: "badge-baidu",
    buildUrl: (s) => `https://www.baidu.com/s?wd=${encodeURIComponent(s)}`
  },
  duckduckgo: {
    id: "duckduckgo",
    name: "DuckDuckGo",
    shortName: "DDG",
    badgeClass: "badge-ddg",
    buildUrl: (s) => `https://duckduckgo.com/?q=${encodeURIComponent(s)}`
  }
};
function Je() {
  try {
    const s = (typeof localStorage < "u" ? localStorage.getItem("searchEngine") : null) || "bing";
    if (s && De[s]) return De[s];
  } catch {
  }
  return De.bing;
}
typeof window < "u" && window.addEventListener("logicweaver:search-engine-updated", (s) => {
  if (s?.detail && typeof localStorage < "u")
    try {
      localStorage.setItem("searchEngine", s.detail);
    } catch {
    }
});
const Ve = "logicweaver_search_click_history";
class ee {
  constructor() {
    this.currentMode = "web", this.suggestionEpoch = 0, this.suggestTimer = 0, this.abortController = null, this.biliRecCache = [], this.clickHistory = [], this.initHistory(), this.initMode(), this.bindController();
  }
  get webScope() {
    const e = g.query.trim();
    return /^\/bm[\s:]/i.test(e) ? "bookmarks" : /^\/sites[\s:]/i.test(e) ? "launcher" : "all";
  }
  static getInstance() {
    return ee.instance || (ee.instance = new ee()), ee.instance;
  }
  isSearchQueryUrl(e, t) {
    if (!e) return !1;
    try {
      const r = new URL(e), i = r.hostname.toLowerCase(), o = r.pathname.toLowerCase();
      if (i.includes("qcc.com") && o.includes("/search") || i.includes("bing.com") && o.includes("/search") || i.includes("google.com") && o.includes("/search") || i.includes("baidu.com") && (o.includes("/s") || o.includes("/search")) || i.includes("tianyancha.com") && o.includes("/search") || i.includes("aiqicha.baidu.com") && o.includes("/s"))
        return !0;
    } catch {
    }
    return !!(t && (/^在\s*(企查查|天眼查|爱企查|Bing|百度|Google)\s*搜索/i.test(t) || /^Bing\s*搜索/i.test(t)));
  }
  initHistory() {
    if (typeof localStorage < "u")
      try {
        const e = localStorage.getItem(Ve);
        if (e) {
          const t = JSON.parse(e);
          Array.isArray(t) && (this.clickHistory = t.filter((r) => r && typeof r.url == "string" && typeof r.title == "string" && be(r.url) && Number.isFinite(r.visitedAt) && !this.isSearchQueryUrl(r.url, r.title)).sort((r, i) => i.visitedAt - r.visitedAt).slice(0, 30), this.clickHistory.length !== t.length && localStorage.setItem(Ve, JSON.stringify(this.clickHistory)));
        }
      } catch {
      }
  }
  recordSearchClick(e) {
    if (!e.url || !be(e.url)) return;
    const t = e.url.trim();
    if (this.isSearchQueryUrl(t, e.title))
      return;
    this.clickHistory = this.clickHistory.filter((o) => o.url !== t);
    let r = "web";
    const i = e.badge?.text || "";
    if (i.includes("常用网站") ? r = "launcher" : i.includes("书签") ? r = "bookmark" : i.includes("提炼") && (r = "history"), this.clickHistory.unshift({
      url: t,
      title: e.title || t,
      iconSrc: e.iconSrc,
      sourceType: r,
      visitedAt: Date.now()
    }), this.clickHistory.length > 30 && (this.clickHistory = this.clickHistory.slice(0, 30)), typeof localStorage < "u")
      try {
        localStorage.setItem(Ve, JSON.stringify(this.clickHistory));
      } catch {
      }
  }
  initMode() {
    if (typeof localStorage < "u") {
      const e = localStorage.getItem(ut);
      e && dt.includes(e) && (this.currentMode = e);
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
    !T.value.find((r) => r.id === e && r.enabled) && !dt.includes(e) && (e = Ye.value[0]?.id || "web"), this.currentMode = e, typeof localStorage < "u" && localStorage.setItem(ut, e), p.setMode(e), g.query.trim() ? this.scheduleSuggestions(g.query) : this.clearSuggestions();
  }
  cycleMode() {
    const e = Ye.value;
    if (!e || e.length === 0) return;
    const t = e.findIndex((i) => i.id === this.currentMode), r = e[(t + 1) % e.length] || e[0];
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
    const t = /* @__PURE__ */ new Set(), r = this.clickHistory.flatMap((i) => {
      const o = be(i.url);
      return !o || t.has(o) ? [] : (t.add(o), [{
        id: `hist_${encodeURIComponent(o)}`,
        title: i.title,
        meta: i.url,
        url: i.url,
        iconSrc: typeof i.iconSrc == "string" ? i.iconSrc : void 0,
        badge: {
          className: i.sourceType === "bookmark" ? "badge-bookmark" : i.sourceType === "launcher" ? "badge-launcher" : "badge-bing",
          text: i.sourceType === "bookmark" ? "历史书签" : i.sourceType === "launcher" ? "历史网站" : "历史访问",
          icon: "🕒"
        }
      }]);
    }).slice(0, 10);
    p.setSuggestions(r);
  }
  async loadNeteaseRecentRecommendations(e = !1) {
    const t = this.suggestionEpoch;
    let r = ze.getRecentSongs();
    if (!r.length)
      try {
        r = await ze.fetchAccountRecentSongs(10);
      } catch {
      }
    if (t !== this.suggestionEpoch || this.currentMode !== "netease" || g.query.trim()) return;
    if (!r.length) {
      this.clearSuggestions();
      return;
    }
    const i = r.slice(0, 10).map((o) => {
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
    t === this.suggestionEpoch && !g.query.trim() && this.currentMode === "netease" && (p.setSuggestions(i), p.setSuggestionsVisible(!0));
  }
  async fetchSuggestions(e) {
    clearTimeout(this.suggestTimer), ++this.suggestionEpoch, this.abortController?.abort(), this.abortController = new AbortController();
    const t = this.abortController.signal;
    try {
      const r = e.trim();
      if (r.startsWith("/") && !r.includes(" ")) {
        const i = r.toLowerCase(), o = ht.filter((n) => n.rawCommand?.toLowerCase().startsWith(i) || n.title.toLowerCase().startsWith(i));
        p.setSuggestions(o.length > 0 ? o : ht), p.setSuggestionsVisible(!0);
        return;
      }
      if (r.startsWith("/bm ") || r.startsWith("/bm:")) {
        const i = r.replace(/^\/bm[\s:]*/i, "");
        await this.fetchWebSuggestions(i, t, "bookmarks");
      } else if (r.startsWith("/sites ") || r.startsWith("/sites:")) {
        const i = r.replace(/^\/sites[\s:]*/i, "");
        await this.fetchWebSuggestions(i, t, "launcher");
      } else this.currentMode === "bilibili" ? await this.fetchBilibiliSuggestions(e, t) : this.currentMode === "github" ? await this.fetchGithubSuggestions(e, t) : this.currentMode === "netease" ? await this.fetchNeteaseSuggestions(e, t) : this.currentMode === "qcc" ? await this.fetchQccSuggestions(e) : this.currentMode === "web" ? await this.fetchWebSuggestions(e, t) : await this.fetchCustomSlotSuggestions(e, t);
    } catch (r) {
      r.name !== "AbortError" && console.warn("[SearchService] Fetch suggestions error:", r);
    }
  }
  async fetchBilibiliSuggestions(e, t) {
    const r = `https://api.bilibili.com/x/web-interface/search/type?search_type=video&keyword=${encodeURIComponent(e)}&page=1&page_size=10`, o = await (await fetch(r, { signal: t })).json();
    if (t.aborted) return;
    const c = (Array.isArray(o?.data?.result) ? o.data.result : []).slice(0, 8).map((a) => {
      const l = a.bvid || (a.param && String(a.param).startsWith("BV") ? a.param : ""), d = (a.title || "").replace(/<[^>]+>/g, ""), h = String(a.pic || "").replace(/^http:/, "https:"), u = h.startsWith("//") ? `https:${h}` : h;
      return {
        id: l,
        title: d,
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
      const i = await (await fetch("https://api.bilibili.com/x/web-interface/index/top/rcmd?fresh_type=3&feed_version=V8&fresh_idx_1h=1&fetch_row=1&fresh_idx=1&brush=1")).json();
      if (i?.code === 0 && Array.isArray(i?.data?.item)) {
        const o = i.data.item.slice(0, 6).map((n) => {
          const c = n.bvid || "", a = String(n.pic || "").replace(/^http:/, "https:"), l = a.startsWith("//") ? `https:${a}` : a, d = n.owner?.name || "";
          return {
            id: c,
            title: n.title || "",
            meta: `${d} · 推荐视频`,
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
    if (te.repos.length > 0) return te.repos;
    if (typeof chrome < "u" && chrome.storage?.local)
      try {
        const t = (await chrome.storage.local.get(["ghStarredCache"]))?.ghStarredCache;
        if (t?.pages && typeof t.pages == "object") {
          const r = [];
          return Object.values(t.pages).forEach((i) => {
            Array.isArray(i) && r.push(...i);
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
    const i = r.slice(0, 8).map((o) => ({
      id: `gh-rec-${o.id || o.name}`,
      title: o.full_name || o.name,
      meta: `${o.description || "已星标仓库"} · ⭐ ${qe(o.stargazers_count || 0)}${o.language ? " · " + o.language : ""}`,
      iconSrc: o.owner?.avatar_url || "assets/nav-github.svg",
      url: o.html_url || `https://github.com/${o.full_name || o.name}`,
      badge: { className: "badge-github", text: "星标项目", icon: "★" }
    }));
    p.setSuggestions(i), p.setSuggestionsVisible(!0);
  }
  async fetchGithubSuggestions(e, t) {
    const r = await this.getLocalGithubRepos();
    if (t.aborted) return;
    const i = e.trim().toLowerCase(), n = r.filter((u) => (u.name || u.full_name || "").toLowerCase().includes(i) || (u.description || "").toLowerCase().includes(i)).slice(0, 6).map((u) => ({
      id: String(u.id || u.name),
      title: u.full_name || u.name,
      meta: `${u.description || "已星标仓库"} · ⭐ ${qe(u.stargazers_count || 0)}`,
      iconSrc: u.owner?.avatar_url || "assets/nav-github.svg",
      url: u.html_url || `https://github.com/${u.full_name || u.name}`,
      badge: { className: "badge-github", text: "已星标", icon: "★" }
    })), c = te.searchRule || "exact", a = { exact: "精确", fuzzy: "模糊", topic: "标签", smart: "智能" }, l = { exact: "🎯", fuzzy: "🌊", topic: "🏷️", smart: "✨" }, d = a[c] || "精确", h = l[c] || "🎯";
    n.unshift({
      id: `gh-search-${e}`,
      title: `在 GitHub 搜索 “${e}”`,
      meta: "按 Enter 或点击在插件内搜索仓库",
      iconSrc: "assets/nav-github.svg",
      type: "github-search-trigger",
      rawQuery: e,
      badge: { className: "badge-github", text: d, icon: h }
    }), t.aborted || p.setSuggestions(n);
  }
  async searchGithubOnline(e) {
    const t = e.trim();
    if (!t) return;
    this.abortController?.abort();
    const r = new AbortController();
    this.abortController = r;
    const i = ++this.suggestionEpoch, o = this.currentMode, n = () => !r.signal.aborted && this.abortController === r && i === this.suggestionEpoch && o === this.currentMode && g.query.trim() === t, c = te.searchRule || "exact", a = { exact: "精确", fuzzy: "模糊", topic: "标签", smart: "智能" }, l = { exact: "🎯", fuzzy: "🌊", topic: "🏷️", smart: "✨" }, d = a[c] || "精确", h = l[c] || "🎯";
    p.setSuggestions([
      {
        id: "gh-search-loading",
        title: `正在以「${d}」模式搜索 GitHub 仓库…`,
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
      const f = Rt[t.toLowerCase()] || [];
      f.length > 0 && (u = `${t} ${f.slice(0, 3).join(" OR ")}`);
    }
    try {
      const f = await Ut(r.signal);
      if (!n()) return;
      const { data: S } = await Nt(`/search/repositories?q=${encodeURIComponent(u)}&sort=stars&order=desc&per_page=10`, { headers: f, signal: r.signal, maxBytes: 1024 * 1024 });
      if (!n()) return;
      if (!Array.isArray(S?.items)) throw new et("format", "GitHub 搜索响应格式异常，没有当作空结果。");
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
      const b = m.map((P) => ({
        id: `gh-online-${P.id}`,
        title: P.full_name || P.name,
        meta: `${P.description || "暂无描述"} · ⭐ ${qe(P.stargazers_count || 0)}${P.language ? " · " + P.language : ""}`,
        iconSrc: P.owner?.avatar_url || "assets/nav-github.svg",
        url: P.html_url || `https://github.com/${P.full_name || P.name}`,
        badge: { className: "badge-github", text: d, icon: h }
      }));
      b.unshift({
        id: `gh-header-${t}`,
        title: `GitHub「${d}」搜索结果 (${m.length} 个)`,
        meta: "点击仓库条目直接访问 · 回车可在 GitHub 网页完整查看",
        iconSrc: "assets/nav-github.svg",
        url: `https://github.com/search?q=${encodeURIComponent(t)}`,
        badge: { className: "badge-github", text: "回车直达", icon: "↵" }
      }), p.setSuggestions(b), p.setSuggestionsVisible(!0);
    } catch (f) {
      if (!n()) return;
      p.setSuggestions([
        {
          id: `gh-error-${t}`,
          title: `GitHub 检索失败：${f instanceof et ? f.message : "响应处理异常"}`,
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
    const i = [], o = (a) => {
      try {
        return chrome.runtime.getURL(`_favicon/?pageUrl=${encodeURIComponent(a)}&size=32`);
      } catch {
        return;
      }
    }, n = () => {
      if (t.aborted) return;
      const a = Cr(e, i);
      if (r === "all") {
        const l = Je();
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
      for (const a of this.clickHistory) i.push({
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
      for (const a of V.getState().links || [])
        a.url && i.push({ source: "launcher", item: {
          id: `launcher_${a.id}`,
          title: a.title || a.url,
          meta: a.url,
          url: a.url,
          launcherLinkId: String(a.id),
          iconSrc: V.getCachedIcon(a.url) || a.customIcon || a.icon || o(a.url),
          badge: { className: "badge-launcher", text: "常用网站", icon: "⭐" }
        } });
    if (n(), (r === "all" || r === "bookmarks") && typeof chrome < "u" && chrome.bookmarks?.search)
      try {
        let a = await oe.searchBookmarksViaWorker(e, 100, t);
        if (t.aborted || (a === null && (a = await chrome.bookmarks.search(e)), t.aborted)) return;
        const l = await oe.getIgnoredFolders();
        if (await oe.ensureBookmarkData(), t.aborted) return;
        const d = oe.getBookmarkFolderMap();
        for (const h of a || [])
          !h.url || oe.isBookmarkIgnored(h, l, d) || i.push({ source: "bookmark", fuzzyMatch: !0, item: {
            id: `bm_${h.id}`,
            title: h.title || h.url,
            meta: h.url,
            url: h.url,
            bookmarkId: String(h.id),
            iconSrc: o(h.url),
            badge: { className: "badge-bookmark", text: "书签", icon: "🔖" }
          } });
      } catch {
      }
    if (t.aborted || (n(), r !== "all")) return;
    const c = await vr.querySearchProviders(e, t);
    if (!t.aborted) {
      for (const a of c) i.push({ item: a, source: "plugin", fuzzyMatch: !0 });
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
    const i = T.value.find((n) => n.id === this.currentMode);
    if (!i) {
      await this.fetchWebSuggestions(e, t);
      return;
    }
    const o = [];
    if (o.push({
      id: `${i.id}-${r}`,
      title: `在 ${i.name} 搜索 “${r}”`,
      meta: "按 Enter 或点击在新标签页立即检索",
      iconSrc: i.iconType === "svg" ? i.iconValue : void 0,
      url: ye(i, r),
      badge: {
        className: "badge-custom",
        text: i.name,
        icon: i.iconType !== "svg" ? i.iconValue : "⌕"
      }
    }), i.suggestUrl)
      try {
        const n = i.suggestUrl.replace(/\{query\}/g, encodeURIComponent(r)), a = await (await fetch(n, { signal: t })).json();
        if (Array.isArray(a) && Array.isArray(a[1]))
          for (const l of a[1].slice(0, 6))
            typeof l == "string" && l.trim() && o.push({
              id: `${i.id}-sug-${l}`,
              title: l,
              meta: `${i.name} 联想词`,
              url: ye(i, l),
              badge: {
                className: "badge-custom",
                text: i.name,
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
        const r = T.value.find((i) => i.id === this.currentMode);
        if (r && !r.isBuiltin) {
          this.openUrl(ye(r, t));
          return;
        }
        if (this.webScope !== "all" && g.suggestions.length > 0 && g.suggestions[0]?.url) {
          this.openUrl(g.suggestions[0].url);
          return;
        }
        if (/^(https?:\/\/|[a-z0-9-]+\.[a-z]{2,})/i.test(t)) {
          const i = /^https?:\/\//i.test(t) ? t : `https://${t}`;
          this.openUrl(i);
        } else {
          const i = Je();
          this.openUrl(i.buildUrl(t));
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
      import("./window-manager.store-D2fEf4ic.js").then((t) => t.n).then(({ windowManagerController: t }) => {
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
      if (lt()) {
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
    if (this.abortController?.abort(), p.setSuggestionsVisible(!1), lt()) {
      try {
        await Tr({ target: e, keyword: t, githubRule: e === "github" ? te.searchRule : void 0 });
      } catch (i) {
        p.setSuggestions([{ id: "workspace-search-error", title: i instanceof Error ? i.message : "打开插件搜索失败", meta: "请稍后重试", badge: { className: "badge-qcc", text: "提示", icon: "⚠" } }]);
      }
      return;
    }
    if (Ar(e, t), e === "netease") {
      const { windowManagerController: i } = await import("./window-manager.store-D2fEf4ic.js").then((o) => o.n);
      i.open("music");
      return;
    }
    const { fullscreenCardsController: r } = await import("./fullscreen-cards.store-CjKJLz-g.js");
    r.enter(e === "github" ? "card-github" : "daily-bilibili");
  }
  openUrl(e) {
    typeof chrome < "u" && chrome.tabs?.create ? chrome.tabs.create({ url: e, active: !0 }) : window.open(e, "_blank");
  }
}
const Zr = ee.getInstance();
export {
  ue as A,
  xr as B,
  z as C,
  Vr as D,
  Dt as E,
  Ze as F,
  qe as G,
  Yr as H,
  Gr as I,
  Jr as J,
  Kr as K,
  fe as L,
  vr as M,
  ze as N,
  Se as O,
  Hr as P,
  Dr as Q,
  qr as R,
  Pr as S,
  ie as T,
  oe as a,
  A as b,
  Zr as c,
  _ as d,
  pe as e,
  U as f,
  X as g,
  ke as h,
  jt as i,
  I as j,
  zr as k,
  V as l,
  jr as m,
  Wr as n,
  Xr as o,
  g as p,
  Ce as q,
  Ar as r,
  p as s,
  Qr as t,
  v as u,
  Br as v,
  je as w,
  T as x,
  Mr as y,
  _r as z
};
