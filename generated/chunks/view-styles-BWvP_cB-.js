import { c as br, w as en, h as O, r as fe, l as Ci } from "./window-manager.store-CzUcQOW-.js";
import { f as le, h as yt, o as tn, s as Sr } from "./fullscreen-presentation-C5hJzUwf.js";
import { r as Q, a as nn, s as Te, b as se, w as Ue, d as Er, C as Ar, B as Cr, x as _r, o as H, e as J, A as _t, i as Ee, t as Ae, f as De, F as oi, g as si, E as Tr } from "./vendor-vue-C09jaOfK.js";
import { b as Tt, S as kr, p as Ur } from "./stickers.service-BVu9MhEk.js";
import { t as kt, p as Ir } from "./module-state-CdcYKCZG.js";
import { i as Ye, n as ne, j as ai, g as Mr, b as In } from "./mini-player-store-BZz5yLl2.js";
import { R as Pr } from "./read-session-D7iZUlf2.js";
import { z as _ } from "./search.service-Dzs18alc.js";
import { _ as Rr } from "./_plugin-vue_export-helper-BTb4PcVA.js";
const Ut = "https://monster-siren.hypergryph.com/api", It = "msFavoriteSongs";
class Le {
  constructor() {
    this.audio = null, this.playVersion = 0, this.state = {
      playing: !1,
      currentSong: null,
      currentTime: 0,
      duration: 0,
      mode: "shuffle",
      queue: [],
      queueIndex: -1
    }, this.listeners = [], this.favorites = {}, this.albumDetailCache = /* @__PURE__ */ new Map(), this.albumCoverMap = /* @__PURE__ */ new Map(), typeof window < "u" && typeof Audio < "u" && (this.audio = new Audio(), this.audio.crossOrigin = "anonymous", this.audio.preload = "none", this.bindAudioEvents()), this.initStorage();
  }
  static getInstance() {
    return Le.instance || (Le.instance = new Le()), Le.instance;
  }
  getAudioElement() {
    return this.audio;
  }
  async initStorage() {
    if (typeof chrome < "u" && chrome.storage?.local) {
      const t = await chrome.storage.local.get([It]);
      t[It] && (this.favorites = t[It]);
    }
  }
  bindAudioEvents() {
    if (!this.audio) return;
    let t = 0;
    this.audio.addEventListener("timeupdate", () => {
      if (!this.audio) return;
      const i = performance.now();
      i - t < 250 || (t = i, this.state.currentTime = this.audio.currentTime || 0, this.audio.duration && !Number.isNaN(this.audio.duration) && (this.state.duration = this.audio.duration), this.notify());
    });
    const n = () => {
      this.audio && this.audio.duration && !Number.isNaN(this.audio.duration) && (this.state.duration = this.audio.duration, this.notify());
    };
    this.audio.addEventListener("loadedmetadata", n), this.audio.addEventListener("durationchange", n), this.audio.addEventListener("canplay", n), this.audio.addEventListener("play", () => {
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
  subscribe(t) {
    return this.listeners.push(t), t({ ...this.state }), () => {
      this.listeners = this.listeners.filter((n) => n !== t);
    };
  }
  notify() {
    const t = { ...this.state };
    for (const n of this.listeners)
      try {
        n(t);
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
    const n = await (await fetch(`${Ut}/songs`, { headers: { Accept: "application/json" } })).json();
    return (n.data?.list || n.data || []).map((r) => ({
      cid: r.cid,
      name: r.name,
      artists: r.artists || [],
      albumCid: r.albumCid,
      coverUrl: r.albumCid && this.albumCoverMap.get(String(r.albumCid)) || ""
    }));
  }
  async getSirenAlbums() {
    const r = ((await (await fetch(`${Ut}/albums`, { headers: { Accept: "application/json" } })).json()).data || []).map((o) => ({
      cid: o.cid,
      name: o.name,
      coverUrl: o.coverUrl
    }));
    for (const o of r)
      o.cid && o.coverUrl && this.albumCoverMap.set(String(o.cid), o.coverUrl);
    return r;
  }
  async getSirenAlbumDetail(t) {
    const n = String(t);
    if (this.albumDetailCache.has(n))
      return this.albumDetailCache.get(n);
    const r = await (await fetch(`${Ut}/album/${t}/detail`, { headers: { Accept: "application/json" } })).json(), o = r.data?.songs || [], s = r.data?.coverUrl || "", a = o.map((u) => ({
      cid: u.cid,
      name: u.name,
      artists: u.artists || u.artistes || [],
      albumCid: t,
      coverUrl: s
    }));
    return this.albumDetailCache.set(n, a), a;
  }
  async getSirenSongUrl(t) {
    const i = await (await fetch(`${Ut}/song/${t}`, { headers: { Accept: "application/json" } })).json();
    return {
      sourceUrl: i.data?.sourceUrl || "",
      lyricUrl: i.data?.lyricUrl
    };
  }
  // ==========================================================================
  // 回放控制
  // ==========================================================================
  async playSong(t, n = {}) {
    if (!this.audio || n.isCurrent?.() === !1) return !1;
    const i = ++this.playVersion, r = () => i === this.playVersion && n.isCurrent?.() !== !1;
    !t.coverUrl && t.albumCid && (t.coverUrl = this.albumCoverMap.get(String(t.albumCid)) || ""), this.state.currentSong = t, this.state.queue.some((o) => String(o.cid) === String(t.cid)) || this.state.queue.push(t), this.state.queueIndex = this.state.queue.findIndex((o) => String(o.cid) === String(t.cid));
    try {
      let o = "";
      if (t.isNetease && t.neteaseId ? o = await _.getSongAudioUrl(t.neteaseId) : o = (await this.getSirenSongUrl(t.cid)).sourceUrl, !r()) return !1;
      if (o)
        return this.audio.src = o, n.autoplay !== !1 && await this.audio.play(), r() ? (this.state.playing = !this.audio.paused, this.notify(), !0) : !1;
    } catch (o) {
      if (!r()) return !1;
      console.error("[MusicService] Play song failed:", o), this.state.playing = !1, this.notify();
    }
    return !1;
  }
  async playNeteaseSong(t, n = {}) {
    if (!t || n.isCurrent?.() === !1) return !1;
    _.addRecentSong(t);
    const i = (t.ar || t.artists || []).map((s) => typeof s == "string" ? s : s.name), r = t.al?.picUrl || t.album?.picUrl || t.picUrl || t.coverUrl || "", o = {
      cid: `ne_${t.id}`,
      name: t.name || "网易云音乐",
      artists: i.length ? i : ["网易云音乐"],
      coverUrl: r,
      isNetease: !0,
      neteaseId: t.id,
      rawSong: t
    };
    return this.playSong(o, n);
  }
  togglePlay() {
    if (this.audio) {
      if (this.state.playing)
        this.audio.pause();
      else if (this.audio.src)
        this.audio.play();
      else if (this.state.queue.length > 0) {
        const t = this.state.queueIndex >= 0 ? this.state.queue[this.state.queueIndex] : this.state.queue[0];
        t && this.playSong(t);
      }
    }
  }
  seek(t) {
    if (!this.audio || !this.audio.duration) return;
    const n = Math.max(0, Math.min(100, t)) / 100 * this.audio.duration;
    this.audio.currentTime = n;
  }
  setPlayMode(t) {
    this.state.mode = t, this.notify();
  }
  cyclePlayMode() {
    const t = ["list", "one", "shuffle"], n = t.indexOf(this.state.mode), i = t[(n + 1) % t.length];
    return this.setPlayMode(i), i;
  }
  next() {
    if (this.state.queue.length)
      if (this.state.mode === "shuffle") {
        const t = Math.floor(Math.random() * this.state.queue.length);
        this.playSong(this.state.queue[t]);
      } else {
        const t = (this.state.queueIndex + 1) % this.state.queue.length;
        this.playSong(this.state.queue[t]);
      }
  }
  prev() {
    if (this.state.queue.length)
      if (this.state.mode === "shuffle") {
        const t = Math.floor(Math.random() * this.state.queue.length);
        this.playSong(this.state.queue[t]);
      } else {
        const t = (this.state.queueIndex - 1 + this.state.queue.length) % this.state.queue.length;
        this.playSong(this.state.queue[t]);
      }
  }
  setQueue(t, n = -1, i = !1) {
    this.state.queue = [...t], this.state.queueIndex = n, n >= 0 && t[n] && (this.state.currentSong = t[n], this.notify(), i && this.playSong(t[n]));
  }
  // ==========================================================================
  // 收藏管理
  // ==========================================================================
  isLiked(t) {
    return !!this.favorites[String(t)];
  }
  toggleLike(t) {
    const n = String(t.cid), i = !this.favorites[n];
    return i ? this.favorites[n] = t : delete this.favorites[n], this.persistFavorites(), this.notify(), i;
  }
  getFavorites() {
    return Object.values(this.favorites);
  }
  persistFavorites() {
    typeof chrome < "u" && chrome.storage?.local && chrome.storage.local.set({ [It]: this.favorites });
  }
}
const k = Le.getInstance(), ae = Q({ visible: !1, pendingWrites: 0 }), Mn = /* @__PURE__ */ new Set();
function ca(e) {
  return Mn.add(e), () => {
    Mn.delete(e);
  };
}
function Or() {
  for (const e of Mn) e();
}
async function la(e) {
  ae.pendingWrites++;
  try {
    return await e();
  } finally {
    ae.pendingWrites--;
  }
}
const _i = "netease_cached_playlists", Ti = "netease_cached_favorites_songs", qe = /* @__PURE__ */ new Map(), Ge = /* @__PURE__ */ new Map();
let Gt;
function ci(e) {
  const t = Ge.get(e);
  if (t) return t;
  try {
    const n = localStorage.getItem(e), i = qe.get(e);
    if (i?.raw === n) return i.value;
    const r = n ? JSON.parse(n) : [], o = Array.isArray(r) ? r : [];
    return qe.set(e, { raw: n, value: o }), o;
  } catch {
    return [];
  }
}
function ki() {
  clearTimeout(Gt), Gt = void 0;
  for (const [e, t] of Ge)
    try {
      const n = JSON.stringify(t);
      localStorage.getItem(e) !== n && localStorage.setItem(e, n), qe.set(e, { raw: n, value: t });
    } catch {
      qe.delete(e);
    }
  Ge.clear();
}
function ua(e, t) {
  Ge.set(e, t), Gt === void 0 && (Gt = setTimeout(ki, 250));
}
function da(e) {
  Ge.delete(e), qe.delete(e);
  try {
    localStorage.removeItem(e);
  } catch {
  }
}
typeof window < "u" && (window.addEventListener("pagehide", ki), window.addEventListener("storage", (e) => {
  if (e.storageArea === localStorage)
    for (const t of [_i, Ti])
      (e.key === null || e.key === t) && (qe.delete(t), Ge.delete(t));
}));
class Nr {
  constructor(t = null) {
    this._listeners = /* @__PURE__ */ new Set(), this._state = {
      phase: t ? "authenticated" : "unauthenticated",
      user: t,
      message: t ? "官网账户已连接" : ""
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
  subscribe(t) {
    return this._listeners.add(t), () => {
      this._listeners.delete(t);
    };
  }
  _setState(t) {
    this._state = t;
    for (const n of this._listeners)
      n(t);
  }
  send(t) {
    const n = this._state;
    switch (t.type) {
      case "START_CONNECT":
        return n.phase === "connecting" ? !1 : (this._setState({
          phase: "connecting",
          user: n.user,
          message: "正在连接官网账户…"
        }), !0);
      case "CONNECT_SUCCESS":
        return this._setState({
          phase: "authenticated",
          user: t.user,
          message: "官网账户已连接"
        }), !0;
      case "CONNECT_FAILURE":
        return this._setState({
          phase: "error",
          user: null,
          message: t.message
        }), !0;
      case "LOGOUT":
        return this._setState({
          phase: "unauthenticated",
          user: null,
          message: "已断开账户"
        }), !0;
      case "SYNC_USER":
        return this._setState({
          phase: t.user ? "authenticated" : "unauthenticated",
          user: t.user,
          message: t.user ? "官网账户已连接" : ""
        }), !0;
      default:
        return !1;
    }
  }
}
const Be = new Nr();
function We(e) {
  return (!Number.isFinite(e) || e < 0) && (e = 0), Math.floor(e / 60) + ":" + String(Math.floor(e % 60)).padStart(2, "0");
}
const fa = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Ccircle cx='32' cy='32' r='30' fill='%231e1e24'/%3E%3Ctext x='32' y='38' fill='%23ec4141' font-size='22' text-anchor='middle'%3E%E2%99%AC%3C/text%3E%3C/svg%3E", Dr = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Cdefs%3E%3CradialGradient id='msrVinyl' cx='50%25' cy='50%25' r='50%25'%3E%3Cstop offset='0%25' stop-color='%2327272a'/%3E%3Cstop offset='70%25' stop-color='%2309090b'/%3E%3Cstop offset='100%25' stop-color='%23000000'/%3E%3C/radialGradient%3E%3C/defs%3E%3Ccircle cx='32' cy='32' r='31' fill='url(%23msrVinyl)' stroke='%233f3f46' stroke-width='1.5'/%3E%3Ccircle cx='32' cy='32' r='24' fill='none' stroke='%2327272a' stroke-width='1' stroke-dasharray='3 2'/%3E%3Ccircle cx='32' cy='32' r='18' fill='none' stroke='%2318181b' stroke-width='1'/%3E%3Ccircle cx='32' cy='32' r='11' fill='%23f59e0b' opacity='0.9'/%3E%3Ccircle cx='32' cy='32' r='4' fill='%2309090b'/%3E%3Ccircle cx='32' cy='32' r='1.5' fill='%23fafafa'/%3E%3C/svg%3E", Br = () => ({
  mounted: !1,
  playing: !1,
  title: "点击播放",
  artist: "作者",
  coverUrl: Dr,
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
  neteaseRecentSongs: _.getRecentSongs(),
  neteaseQrImg: "",
  neteaseQrStatus: "",
  neteaseLoading: !1
}), l = Q(Br());
let P = {};
const Ui = {
  get authMachine() {
    return Be;
  },
  getSnapshot() {
    return nn(l);
  },
  update(e) {
    Object.assign(l, e);
  },
  setMounted(e) {
    l.mounted = e;
  },
  setPlaying(e) {
    l.playing = e;
  },
  setTrack(e, t, n) {
    l.title = e || "点击播放", l.artist = t || "作者", l.coverUrl = n || "";
  },
  setProgress(e, t) {
    l.currentTime = e, l.duration = t, l.formattedCurrent = We(e), l.formattedDuration = We(t), t > 0 ? l.progressPercent = Math.min(100, Math.max(0, e / t * 100)) : l.progressPercent = 0;
  },
  setLiked(e) {
    l.liked = e;
  },
  setMode(e) {
    l.mode = e;
  },
  togglePicker(e) {
    e !== void 0 ? ae.visible = e : ae.visible = !ae.visible;
  },
  setPickerTab(e) {
    l.pickerTab = e, l.activeAlbum = null;
  },
  setSearchQuery(e) {
    l.searchQuery = e;
  },
  setActiveAlbum(e) {
    l.activeAlbum = e;
  },
  setSongs(e) {
    l.songs = e;
  },
  setAlbums(e) {
    l.albums = e;
  },
  setFavorites(e) {
    l.favorites = e;
  },
  setActions(e) {
    P = { ...P, ...e };
  },
  playTrack(e) {
    l.isBiliRadio = !1;
    const t = window;
    if (t.LogicWeaverBiliRadioPlayer?.getState?.()?.playing && t.LogicWeaverBiliRadioPlayer.toggle(), P.playCid)
      P.playCid(e);
    else {
      const n = l.activeAlbum?._songs || [], r = [...l.songs, ...l.favorites, ...n].find((o) => String(o.cid) === String(e));
      r ? k.playSong(r) : k.playSong({ cid: e, name: "塞壬唱片", artists: ["塞壬唱片"] }), window.dispatchEvent(new CustomEvent("logicweaver:music-play-cid", { detail: { cid: e } }));
    }
  },
  togglePlay() {
    if (l.isBiliRadio) {
      const e = window;
      if (typeof e.LogicWeaverBiliRadioPlayer?.toggle == "function") {
        e.LogicWeaverBiliRadioPlayer.toggle();
        return;
      }
    }
    P.togglePlay ? P.togglePlay() : (k.togglePlay(), window.dispatchEvent(new CustomEvent("logicweaver:music-toggle-play")));
  },
  prev() {
    if (l.isBiliRadio) {
      const e = window;
      if (typeof e.LogicWeaverBiliRadioPlayer?.prev == "function") {
        e.LogicWeaverBiliRadioPlayer.prev();
        return;
      }
    }
    P.prev ? P.prev() : (k.prev(), window.dispatchEvent(new CustomEvent("logicweaver:music-prev")));
  },
  next() {
    if (l.isBiliRadio) {
      const e = window;
      if (typeof e.LogicWeaverBiliRadioPlayer?.next == "function") {
        e.LogicWeaverBiliRadioPlayer.next();
        return;
      }
    }
    P.next ? P.next() : (k.next(), window.dispatchEvent(new CustomEvent("logicweaver:music-next")));
  },
  toggleLike() {
    if (P.toggleLike)
      P.toggleLike();
    else {
      const e = k.getState().currentSong;
      e && (l.liked = k.toggleLike(e), l.favorites = k.getFavorites()), window.dispatchEvent(new CustomEvent("logicweaver:music-toggle-like"));
    }
  },
  cycleMode() {
    if (P.cycleMode)
      P.cycleMode();
    else {
      const e = k.cyclePlayMode();
      l.mode = e, window.dispatchEvent(new CustomEvent("logicweaver:music-cycle-mode"));
    }
  },
  seek(e) {
    if (l.isBiliRadio) {
      const t = window;
      if (typeof t.LogicWeaverBiliRadioPlayer?.seek == "function") {
        t.LogicWeaverBiliRadioPlayer.seek(e);
        return;
      }
    }
    P.seek ? P.seek(e) : (k.seek(e), window.dispatchEvent(new CustomEvent("logicweaver:music-seek", { detail: { percent: e } })));
  },
  openPanel() {
    P.openPanel ? P.openPanel() : (Ui.togglePicker(!0), window.dispatchEvent(new CustomEvent("logicweaver:music-open-panel")));
  },
  openNetease() {
    l.pickerTab = "netease", l.pickerOpen = !0, l.activeAlbum = null, this.loadNeteaseData();
  },
  async loadNeteaseData() {
    l.neteaseUser = _.getUser(), l.neteaseRecentSongs = _.getRecentSongs(), l.neteaseLoading = !0;
    try {
      const [e] = await Promise.all([
        _.getPlaylists(),
        _.fetchAccountRecentSongs(60).catch(() => [])
      ]);
      if (l.neteasePlaylists = e, l.neteaseRecentSongs = _.getRecentSongs(), e.length > 0) {
        const t = e.find((n) => n.name.includes("喜欢的音乐") || n.name.includes("Favorite")) || e[0];
        (!l.neteaseActivePlaylist || l.neteaseActivePlaylist.id !== t.id) && await this.selectNeteasePlaylist(t);
      }
    } catch (e) {
      console.warn("[MusicStore] Load netease playlists error:", e);
    } finally {
      l.neteaseLoading = !1, l.neteaseRecentSongs = _.getRecentSongs();
    }
  },
  async selectNeteasePlaylist(e) {
    if (l.neteaseActivePlaylist = e, !e) {
      l.neteaseSongs = [];
      return;
    }
    l.neteaseLoading = !0;
    try {
      if (!l.neteaseSongs.length)
        try {
          const n = await _.getPlaylistTracks(e.id, 10, 0);
          l.neteaseActivePlaylist?.id === e.id && !l.neteaseSongs.length && (l.neteaseSongs = n, l.neteaseLoading = !1);
        } catch {
        }
      const t = await _.getPlaylistTracks(e.id, 500, 0);
      l.neteaseActivePlaylist?.id === e.id && (l.neteaseSongs = t);
    } catch (t) {
      console.warn("[MusicStore] Load playlist tracks error:", t);
    } finally {
      l.neteaseLoading = !1;
    }
  },
  async searchNetease(e) {
    const t = e.trim();
    if (!t) {
      l.neteaseSearchResults = [];
      return;
    }
    l.neteaseLoading = !0;
    try {
      const n = await _.searchSongs(t);
      l.neteaseSearchResults = n;
    } catch (n) {
      console.warn("[MusicStore] Search netease error:", n);
    } finally {
      l.neteaseLoading = !1;
    }
  },
  syncFromBiliRadio(e) {
    l.isBiliRadio = !0, l.isNetease = !1, l.playing = e.playing, l.title = e.title || "B站电台", l.artist = e.artist || e.seriesName || "哔哩哔哩", e.coverUrl && (l.coverUrl = e.coverUrl), l.currentTime = e.currentTime, l.duration = e.duration, l.formattedCurrent = We(e.currentTime), l.formattedDuration = We(e.duration), l.progressPercent = e.duration > 0 ? Math.min(100, Math.max(0, e.currentTime / e.duration * 100)) : 0, l.currentLyric = e.lyric || "", l.biliRadioSeriesName = e.seriesName || "";
    const t = k.getAudioElement();
    e.playing && t && !t.paused && t.pause();
  },
  playNeteaseTrack(e) {
    l.isBiliRadio = !1;
    const t = window;
    t.LogicWeaverBiliRadioPlayer?.getState?.()?.playing && t.LogicWeaverBiliRadioPlayer.toggle(), e && (_.recordRecentSong(e), l.neteaseRecentSongs = _.getRecentSongs()), k.playNeteaseSong(e);
  },
  clearNeteaseRecent() {
    _.clearRecentSongs().catch(() => console.warn("[MusicStore] Recent history removal failed; re-read before retry"));
  },
  refreshRecentSongs() {
    l.neteaseRecentSongs = _.getRecentSongs();
  },
  stopNeteaseQrLogin() {
  },
  async startNeteaseQrLogin() {
    if (this.stopNeteaseQrLogin(), !!Be.send({ type: "START_CONNECT" }))
      try {
        await _.connectWebsiteAccount();
        const e = _.getUser();
        Be.send({ type: "CONNECT_SUCCESS", user: e }), l.neteaseQrStatus = "官网账户已连接", await this.loadNeteaseData();
      } catch (e) {
        const t = e?.message || "请先在网易云官网登录。";
        Be.send({ type: "CONNECT_FAILURE", message: t }), l.neteaseQrStatus = t;
      }
  },
  async logoutNetease() {
    await _.logout(), Be.send({ type: "LOGOUT" }), l.neteaseUser = null, l.neteasePlaylists = [], l.neteaseActivePlaylist = null, l.neteaseSongs = [], l.neteaseSearchResults = [];
  }
};
typeof window < "u" && (window.addEventListener("netease:account-updated", () => {
  l.neteaseUser = _.getUser(), Be.send({ type: "SYNC_USER", user: l.neteaseUser }), l.neteasePlaylists = [], l.neteaseSongs = [], l.neteaseSearchResults = [], l.neteaseActivePlaylist = null;
}), window.addEventListener("netease:recent-updated", (e) => {
  Array.isArray(e.detail) ? l.neteaseRecentSongs = e.detail : l.neteaseRecentSongs = _.getRecentSongs();
}), k.subscribe((e) => {
  l.playing = e.playing, l.currentTime = e.currentTime, l.duration = e.duration, l.formattedCurrent = We(e.currentTime), l.formattedDuration = We(e.duration), e.duration > 0 ? l.progressPercent = Math.min(100, Math.max(0, e.currentTime / e.duration * 100)) : l.progressPercent = 0, l.mode = e.mode, l.isNetease = !!e.currentSong?.isNetease, l.currentLyric = e.currentLyric || "", e.currentSong && (l.title = e.currentSong.name || "点击播放", l.artist = (e.currentSong.artists || []).join(", ") || "作者", l.coverUrl = e.currentSong.coverUrl || "", l.liked = k.isLiked(e.currentSong.cid));
}));
async function ma() {
  try {
    if (l.favorites = k.getFavorites(), l.neteaseRecentSongs = _.getRecentSongs(), l.neteaseUser = _.getUser(), typeof localStorage < "u")
      try {
        const n = ci(Ti);
        if (n.length) {
          const r = n;
          Array.isArray(r) && r.length > 0 && l.neteaseSongs.length === 0 && (l.neteaseSongs = r);
        }
        const i = ci(_i);
        if (i.length) {
          const r = i;
          Array.isArray(r) && r.length > 0 && l.neteasePlaylists.length === 0 && (l.neteasePlaylists = r);
        }
      } catch {
      }
    const [e, t] = await Promise.all([
      k.getSirenSongs().catch(() => []),
      k.getSirenAlbums().catch(() => [])
    ]);
    e.length > 0 && l.songs.length === 0 && (l.songs = e, k.setQueue(e, -1, !1)), t.length > 0 && l.albums.length === 0 && (l.albums = t);
  } catch (e) {
    console.warn("[MusicStore] initHomeMusicService failed:", e);
  }
}
const Y = Q({
  avatarUrl: "assets/bilibili.svg",
  userName: "哔哩哔哩用户",
  buttonTitle: "通知中心"
}), xr = () => ({
  mounted: !1,
  visible: !1,
  x: 0,
  y: 0,
  avatarUrl: "assets/bilibili.svg",
  userName: "用户"
}), Ce = Q(xr());
let q = {};
const Lr = {
  getSnapshot() {
    return nn(Ce);
  },
  update(e) {
    Object.assign(Ce, e);
  },
  setMounted(e) {
    Ce.mounted = e;
  },
  open(e, t) {
    Ce.x = e, Ce.y = t, Ce.visible = !0;
    const n = document.getElementById("bili-profile-menu");
    n && (n.hidden = !1, n.style.left = `${Math.min(window.innerWidth - 205, e)}px`, n.style.top = `${Math.min(window.innerHeight - 150, t)}px`);
  },
  close() {
    Ce.visible = !1;
    const e = document.getElementById("bili-profile-menu");
    e && (e.hidden = !0);
  },
  trigger(e) {
    if (Lr.close(), q.onAction) {
      q.onAction(e);
      return;
    }
    e === "messages" && q.showInfo ? q.showInfo() : e === "refresh" && q.refresh ? q.refresh() : e === "switch" && q.switchUser ? q.switchUser() : e === "web" && q.openWeb ? q.openWeb() : window.dispatchEvent(new CustomEvent("logicweaver:profile-menu-action", { detail: { action: e } }));
  },
  setActions(e) {
    q = { ...q, ...e };
  }
}, Wr = {
  "bilibili.html": "daily-bilibili",
  "github.html": "card-github",
  "aihot.html": "daily-aihot"
};
function Ii() {
  return typeof location > "u" ? null : Wr[location.pathname.split("/").pop() || ""] || null;
}
const pa = Te(() => {
  const e = Ii() || le.activeId;
  if (e) return e;
  const t = br.activeId;
  return t && en.isActive(t) ? t : "home";
}), $r = [
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
function jr() {
  if (!(typeof localStorage > "u"))
    for (const e of $r)
      localStorage.removeItem(e), localStorage.removeItem(`logicweaver:${e}`);
}
const Fr = {
  schemaVersion: 1,
  id: "card-github",
  title: "github插件",
  icon: "assets/nav-github.svg",
  presentation: "card",
  dockBefore: "daily-aihot",
  rootId: "card-github",
  settingsKeys: ["ghUser", "ghToken", "ghAiServiceConfigV1", "ghArchifyWebhookUrl"],
  capabilities: ["workspace:fullscreen", "view:retained", "github:repositories"],
  loadView: () => import("./GitHubWorkspaceCard-CyzGZg-T.js").then((e) => e.default),
  lifecycle: {
    isVisible: () => le.activeId === "card-github",
    open: () => tn("card-github"),
    hide: () => yt("card-github"),
    // Existing card menus do not expose Quit/Reload. Do not introduce a destructive new path
    // until settings drafts and every child editor provide an aggregate unmount guard.
    canUnmount: () => !1,
    unmountBlockedMessage: "GitHub 工作区保留原有隐藏保活设计；尚未开放独立退出/重载，以免丢失草稿。"
  }
}, Vr = {
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
  loadView: () => import("./BilibiliWorkspace-DPskTmew.js").then((e) => e.default),
  lifecycle: {
    isVisible: () => le.activeId === "daily-bilibili",
    open: () => tn("daily-bilibili"),
    hide: () => yt("daily-bilibili"),
    // Hide must not dispose shared radio/player state or interrupt folder/cache operations.
    canUnmount: () => !1,
    unmountBlockedMessage: "B站收藏保留原有隐藏保活设计；尚未开放独立退出/重载，以免打断播放、收藏或缓存操作。"
  }
}, qr = {
  schemaVersion: 1,
  id: "daily-aihot",
  title: "ai hot插件",
  icon: "assets/nav-aihot.svg",
  presentation: "card",
  rootId: "daily-aihot",
  // Existing localStorage preferences; registration neither reads nor migrates them.
  settingsKeys: ["lw-info-feed-view", "lw-aihot-feed-cat", "lw-aihot-feed-window"],
  capabilities: ["workspace:fullscreen", "view:retained", "aihot:aggregate"],
  loadView: () => import("./AihotFeed-DknCnPBW.js").then((e) => e.default),
  lifecycle: {
    isVisible: () => le.activeId === "daily-aihot",
    open: () => tn("daily-aihot"),
    hide: () => yt("daily-aihot"),
    // Keep the original retained card. Its view owns list activity;
    // the separate article reader is not owned or closed by this module.
    canUnmount: () => !1,
    unmountBlockedMessage: "AI HOT 保留原有隐藏保活设计；尚未开放独立退出/重载。"
  }
}, Gr = {
  schemaVersion: 1,
  id: "stickers",
  title: "表情包模块",
  emoji: "😺",
  // Keep the chat picker's library management window without a standalone Dock entry.
  showInDock: !1,
  rootId: "vue-stickers-dialog-root",
  settingsKeys: kr,
  capabilities: ["folder:explicit-permission", "image:explicit-save-delete", "image:local-preview", "image:clipboard"],
  loadView: () => import("./StickersDialog-D8JU05EB.js").then((e) => e.default),
  lifecycle: {
    isVisible: () => Tt.visible,
    open: () => {
      Tt.visible = !0;
    },
    hide: () => {
      Tt.visible = !1, Ur();
    },
    canUnmount: () => Tt.pendingWrites === 0,
    unmountBlockedMessage: "图片保存/删除、目录授权或偏好正在处理，暂不能退出/重载；可以先隐藏，已提交操作不会撤回。"
  }
}, Kr = "neteaseApiUrl", Hr = [Kr], Jr = {
  schemaVersion: 1,
  id: "music",
  title: "网易云模块",
  icon: "assets/netease.svg",
  rootId: "vue-music-workspace-root",
  settingsKeys: Hr,
  capabilities: ["catalog:read", "settings:endpoint", "account:explicit-login-logout", "playback:shared-home-controls"],
  loadView: () => import("./NeteaseWorkspaceDialog-CevCf7Um.js").then((e) => e.default),
  lifecycle: {
    isVisible: () => ae.visible,
    open: () => {
      ae.visible = !0;
    },
    hide: () => {
      ae.visible = !1, Or();
    },
    canUnmount: () => ae.pendingWrites === 0,
    unmountBlockedMessage: "节点保存、登录确认/退出或记录写入正在处理，暂不能退出/重载；可以隐藏。退出窗口不会停止首页播放。"
  }
}, zr = Object.freeze([
  "todoistToken",
  "todoistActiveProjectIdV1"
]), Yr = {
  schemaVersion: 1,
  id: "todoist",
  title: "todoist",
  icon: "assets/nav-todoist.svg",
  dockBefore: "stickers",
  rootId: "todoist",
  settingsKeys: zr,
  capabilities: ["view:retained", "tasks:read-write", "attachments:explicit-upload", "settings:account-rules", "calendar:shared"],
  loadView: () => import("./TodoistWorkspace-B-hEssfP.js").then((e) => e.default),
  lifecycle: {
    isVisible: () => kt.visible,
    open: () => {
      kt.visible = !0;
    },
    hide: () => {
      kt.visible = !1, Ir();
    },
    canUnmount: () => kt.pendingWrites === 0,
    unmountBlockedMessage: "任务、附件、评论或配置正在写入，暂不能退出/重载；可以隐藏。首页限时任务和独立日历不会随窗口退出停止。"
  }
}, Qr = 1, Xr = 1, Zr = { text: { legacy: !0 }, image: { legacy: !1 }, music: { legacy: !0 }, bilibili: { legacy: !0 }, github: { legacy: !0 }, bili_series: { legacy: !0 }, aihot: { legacy: !0 }, youtube: { legacy: !0 }, website: { legacy: !0 }, server_invite: { legacy: !0 }, music_party: { legacy: !0 } }, eo = ["image/png", "image/jpeg", "image/gif", "image/webp"], to = { messageBytes: 262144, imageMessageBytes: 2097152, imageBytes: 1048576, textChars: 8e3, imageMaxDimension: 8192, imageMaxPixels: 16777216 }, He = {
  schema: Qr,
  protocol: Xr,
  messageTypes: Zr,
  imageMimeTypes: eo,
  limits: to
};
function no(e) {
  try {
    if (e.length > Math.ceil(He.limits.imageBytes / 3) * 4 + 64) return;
    const t = e.indexOf(","), n = e.slice(5, e.indexOf(";")), i = Uint8Array.from(atob(e.slice(t + 1)), (s) => s.charCodeAt(0)), r = new DataView(i.buffer), o = (s, a) => String.fromCharCode(...i.slice(s, a));
    if (n === "image/png" && i.length >= 33 && o(0, 8) === `PNG\r

` && r.getUint32(8) === 13 && o(12, 16) === "IHDR") return [r.getUint32(16), r.getUint32(20)];
    if (n === "image/gif" && i.length >= 13 && ["GIF87a", "GIF89a"].includes(o(0, 6))) return [r.getUint16(6, !0), r.getUint16(8, !0)];
    if (n === "image/webp" && i.length >= 25 && o(0, 4) === "RIFF" && o(8, 12) === "WEBP" && r.getUint32(4, !0) + 8 === i.length) {
      const s = o(12, 16);
      if (s === "VP8X" && i.length >= 30) return [1 + i[24] + (i[25] << 8) + (i[26] << 16), 1 + i[27] + (i[28] << 8) + (i[29] << 16)];
      if (s === "VP8L" && i[20] === 47) {
        const a = r.getUint32(21, !0);
        return [1 + (a & 16383), 1 + (a >>> 14 & 16383)];
      }
      if (s === "VP8 " && i.length >= 30 && o(23, 26) === "*") return [r.getUint16(26, !0) & 16383, r.getUint16(28, !0) & 16383];
    }
    if (n === "image/jpeg" && i[0] === 255 && i[1] === 216) {
      let s = 2;
      for (; s + 4 <= i.length && i[s] === 255; ) {
        for (; s < i.length && i[s] === 255; ) s++;
        if (s >= i.length) break;
        const a = i[s++];
        if (a === 216 || a === 1 || a >= 208 && a <= 215) continue;
        if (a === 217 || a === 218 || s + 2 > i.length) break;
        const u = r.getUint16(s);
        if (u < 2 || s + u > i.length) break;
        if ([192, 193, 194, 195, 197, 198, 199, 201, 202, 203, 205, 206, 207].includes(a) && u >= 8) return [r.getUint16(s + 5), r.getUint16(s + 3)];
        s += u;
      }
    }
  } catch {
  }
}
const io = He.protocol, he = Object.freeze({ ...He.limits }), Pn = Object.freeze(Object.keys(He.messageTypes)), Rn = Object.freeze([...He.imageMimeTypes]), X = (e) => !!e && typeof e == "object" && !Array.isArray(e), bn = (e) => typeof e == "number" && Number.isSafeInteger(e) && e > 0;
function rn() {
  return { status: "unknown", reason: "请先完成当前服务器的身份同步，再发送消息。", messageTypes: [], imageMimeTypes: [], limits: { ...he } };
}
function Mt() {
  return { ...rn(), status: "incompatible", reason: "服务端消息能力格式无效或协议版本不兼容，请服主核对前后端版本；待发内容已保留。" };
}
function ro(e) {
  if (e === void 0 || X(e) && !("schema" in e) && !("protocol" in e) && !("messageTypes" in e) && !("limits" in e)) {
    if (e !== void 0 && !X(e)) return Mt();
    const r = X(e) && e.imageMessages === 1;
    return X(e) && e.maxImageBytes !== void 0 && !bn(e.maxImageBytes) ? Mt() : {
      status: "legacy",
      reason: r ? "" : "此旧版服务端未声明图片能力，请服主升级；待发图片已保留。",
      messageTypes: Pn.filter((o) => o === "image" ? r : He.messageTypes[o].legacy),
      imageMimeTypes: r ? [...Rn] : [],
      limits: { ...he, imageBytes: r && X(e) && bn(e.maxImageBytes) ? Math.min(e.maxImageBytes, he.imageBytes) : he.imageBytes }
    };
  }
  if (!X(e) || e.schema !== 1 || e.protocol !== io || !X(e.limits) || !Array.isArray(e.messageTypes) || e.messageTypes.length > 64 || e.messageTypes.some((r) => typeof r != "string") || !Array.isArray(e.imageMimeTypes) || e.imageMimeTypes.length > 16 || e.imageMimeTypes.some((r) => typeof r != "string")) return Mt();
  const t = { ...he };
  for (const r of Object.keys(t)) {
    const o = e.limits[r];
    if (!bn(o)) return Mt();
    t[r] = Math.min(t[r], o);
  }
  const n = Rn.filter((r) => e.imageMimeTypes.includes(r)), i = Pn.filter((r) => e.messageTypes.includes(r) && (r !== "image" || e.imageMessages === 1 && n.length > 0));
  return { status: "supported", reason: i.includes("image") ? "" : "此服务端未启用兼容的图片消息，待发图片已保留。", messageTypes: i, imageMimeTypes: n, limits: t };
}
function oo(e, t = he, n = Rn) {
  if (typeof e != "string" || e.length > Math.ceil(t.imageBytes / 3) * 4 + 32) return !1;
  const i = /^data:(image\/[a-z0-9.+-]+);base64,([A-Za-z0-9+/]+={0,2})$/.exec(e);
  if (!i || !n.includes(i[1])) return !1;
  const r = i[2], o = r.length / 4 * 3 - (r.endsWith("==") ? 2 : r.endsWith("=") ? 1 : 0);
  return r.length % 4 === 0 && o > 0 && o <= t.imageBytes;
}
function lt(e, t) {
  if (!X(t) || typeof t.type != "string" || typeof t.content != "string" || typeof t.id != "string" || !t.id || typeof t.timestamp != "number" || !Number.isFinite(t.timestamp) || !X(t.sender) || typeof t.sender.uid != "string" || typeof t.sender.name != "string" || typeof t.sender.avatar != "string") return "消息格式无效，原记录已保留，请核对后重新发送。";
  const n = X(t.meta) ? t.meta.imageUrl : void 0;
  if (e.status === "unknown" || e.status === "incompatible") return e.reason;
  if (!e.messageTypes.includes(t.type)) return t.type === "image" ? e.reason || "服务端未启用图片消息，待发图片已保留。" : "服务端不支持此消息类型，内容已保留。";
  if (t.content.length > e.limits.textChars) return "文字超过服务端声明的长度上限，请缩短后再发送。";
  if (t.type === "image" && !oo(n, e.limits, e.imageMimeTypes)) return "图片格式或大小不符合服务端能力，请重新选择或压缩；原内容已保留。";
  if (t.type === "image") {
    const o = no(n);
    if (!o || o.some((s) => s < 1 || s > e.limits.imageMaxDimension) || o[0] * o[1] > e.limits.imageMaxPixels) return "图片文件头或像素尺寸不符合当前服务端限制，请重新选择；原内容已保留。";
  }
  let i;
  try {
    i = JSON.stringify({ message: t });
  } catch {
    return "消息不能安全编码，原记录已保留，请核对后重新发送。";
  }
  return new TextEncoder().encode(i).byteLength > (t.type === "image" ? e.limits.imageMessageBytes : e.limits.messageBytes) ? "消息超过服务端声明的JSON大小上限，内容已保留。" : "";
}
const Mi = he.imageMessageBytes, Pi = he.textChars, ut = (e) => !!e && typeof e == "object" && !Array.isArray(e), z = (e, t) => typeof e == "string" && e.length <= t;
function wt(e) {
  if (!z(e, 4096)) return "";
  try {
    const t = new URL(e);
    return ["https:", "http:"].includes(t.protocol) && !t.username && !t.password ? t.href : "";
  } catch {
    return "";
  }
}
function on(e) {
  return typeof e != "string" ? "" : e.length <= Mi && /^data:image\/(?:png|jpeg|gif|webp);base64,[A-Za-z0-9+/=\r\n]+$/i.test(e) ? e : wt(e);
}
function sn(e) {
  if (!z(e, 4096)) throw new Error("服务器地址过长");
  if (!e.trim()) return "";
  let t;
  try {
    t = new URL(e.trim());
  } catch {
    throw new Error("服务器地址格式不正确");
  }
  const n = t.hostname, i = n === "localhost" || n === "[::1]" || /^(127\.|10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.)/.test(n);
  if (t.protocol !== "wss:" && !(t.protocol === "ws:" && i) || t.username || t.password || t.hash)
    throw new Error("公网服务器须使用 WSS；WS 仅限本机或局域网，地址不能含用户信息或片段");
  return t.href;
}
function Ri(e, t) {
  if (!(!ut(e) || !["bilibili", "github", "music", "aihot", "youtube", "idle"].includes(String(e.type)) || !z(e.title, 500)))
    return { type: e.type, title: e.title, url: wt(e.url) || void 0, updatedAt: t };
}
function Oi(e, t = 0) {
  if (!ut(e) || t > 2) return;
  const n = /* @__PURE__ */ Object.create(null);
  for (const [i, r] of Object.entries(e).slice(0, 64))
    ["__proto__", "constructor", "prototype", "rawSong"].includes(i) || (typeof r == "string" && r.length <= (i === "imageUrl" ? Mi : Pi) ? n[i] = /(?:cover|avatar|face|imageUrl)$/i.test(i) ? on(r) : /url$/i.test(i) ? wt(r) : r : typeof r == "boolean" || typeof r == "number" && Number.isFinite(r) ? n[i] = r : i === "seriesItems" && Array.isArray(r) && (n[i] = r.slice(0, 100).map((o) => Oi(o, t + 1)).filter(Boolean)));
  return n;
}
function vt(e) {
  return Ni(e, Date.now());
}
function Ni(e, t) {
  if (!ut(e) || !ut(e.sender) || !z(e.id, 160) || !e.id || !z(e.sender.uid, 160) || !e.sender.uid || !z(e.sender.name, 100) || !z(e.content, Pi) || ![...Pn, "system"].includes(String(e.type)) || typeof e.timestamp != "number" || !Number.isFinite(e.timestamp)) return;
  const n = on(e.sender.avatar) || (z(e.sender.avatar, 32) && !/[:/]/.test(e.sender.avatar) ? e.sender.avatar : "👤");
  return { id: e.id, sender: { uid: e.sender.uid, name: e.sender.name, avatar: n, activity: Ri(e.sender.activity, t) }, type: e.type, content: e.content, timestamp: e.timestamp, meta: Oi(e.meta) };
}
function so(e, t) {
  if (!ut(e) || !z(e.uid, 160) || !e.uid || !z(e.name, 100)) return;
  const n = on(e.avatar) || (z(e.avatar, 32) && !/[:/]/.test(e.avatar) ? e.avatar : "👤");
  return { uid: e.uid, name: e.name, avatar: n, activity: Ri(e.activity, t) };
}
const dt = se(""), ha = se(!1), jn = se(0);
let Qe, Ie = Promise.resolve();
const ie = /* @__PURE__ */ new Map();
function Fn(e, t, n) {
  return JSON.stringify([e, t, n]);
}
function an() {
  return Qe || (Qe = new Promise((e, t) => {
    const n = indexedDB.open("lw-chat-history", 2);
    n.onupgradeneeded = () => {
      n.result.objectStoreNames.contains("messages") || n.result.createObjectStore("messages", { keyPath: ["scope", "id"] }).createIndex("timeline", ["scope", "timestamp", "id"], { unique: !0 }), n.result.objectStoreNames.contains("relay-cursors") || n.result.createObjectStore("relay-cursors");
    }, n.onerror = () => t(n.error), n.onblocked = () => {
      dt.value = "历史数据库升级被其他标签页阻塞，请关闭旧标签页后重试";
    }, n.onsuccess = () => {
      const i = n.result;
      i.onversionchange = () => {
        i.close(), Qe = void 0;
      }, e(i);
    };
  }).catch((e) => {
    throw Qe = void 0, e;
  })), Qe;
}
function cn(e, t) {
  for (const n of t) {
    const i = vt(n);
    if (!i || i.id === "sys-welcome") continue;
    const r = { scope: e, id: i.id, timestamp: i.timestamp, message: JSON.parse(JSON.stringify(i)) };
    ie.set(JSON.stringify([e, r.id]), r);
  }
  return jn.value = ie.size, ao();
}
function ao() {
  return Ie = Ie.then(async () => {
    if (!ie.size) return;
    const e = [...ie.entries()];
    try {
      const t = await an();
      await new Promise((n, i) => {
        const r = t.transaction("messages", "readwrite");
        r.oncomplete = () => n(), r.onabort = () => i(r.error), r.onerror = () => i(r.error);
        const o = r.objectStore("messages");
        for (const [, s] of e) o.put(s);
      });
      for (const [n, i] of e) ie.get(n) === i && ie.delete(n);
      jn.value = ie.size, dt.value = "";
    } catch {
      dt.value = "历史未能写入磁盘（空间不足或数据库不可用）。待存消息保留在内存，请先导出备份，勿关闭或刷新。";
    }
  }), Ie;
}
async function co(e) {
  await Ie;
  const t = await an();
  return new Promise((n, i) => {
    const r = t.transaction("relay-cursors", "readonly"), o = r.objectStore("relay-cursors").get(e);
    r.oncomplete = () => n(Number.isSafeInteger(o.result) ? o.result : 0), r.onabort = () => i(r.error), o.onerror = () => i(o.error);
  });
}
function lo(e, t, n) {
  const i = Ie.then(async () => {
    const r = await an();
    await new Promise((o, s) => {
      const a = r.transaction(["messages", "relay-cursors"], "readwrite"), u = a.objectStore("messages");
      for (const m of t) u.put({ scope: e, id: m.id, timestamp: m.timestamp, message: JSON.parse(JSON.stringify(m)) });
      const d = a.objectStore("relay-cursors"), f = d.get(e);
      f.onsuccess = () => d.put(Math.max(Number(f.result) || 0, n), e), a.oncomplete = () => o(), a.onabort = () => s(a.error), a.onerror = () => s(a.error);
    });
  });
  return Ie = i.catch(() => {
  }), i;
}
async function Di(e, t, n = 200) {
  await Ie;
  const i = await an();
  return new Promise((r, o) => {
    const s = i.transaction("messages", "readonly"), a = [e, -Number.MAX_VALUE, ""], u = t ? [e, t.timestamp, t.id] : [e, Number.MAX_VALUE, "￿"], d = IDBKeyRange.bound(a, u, !1, !!t), f = s.objectStore("messages").index("timeline").openCursor(d, "prev"), m = [];
    f.onerror = () => o(f.error), s.onabort = () => o(s.error), f.onsuccess = () => {
      const g = f.result;
      if (!g || m.length >= n) {
        r(m.reverse());
        return;
      }
      const w = vt(g.value.message);
      w && m.push(w), g.continue();
    };
  });
}
async function ga(e) {
  const t = /* @__PURE__ */ new Map();
  let n;
  for (; ; ) {
    const i = await Di(e, n, 500);
    for (const r of i) t.set(r.id, r);
    if (i.length < 500) break;
    n = i[0];
  }
  for (const i of ie.values()) i.scope === e && t.set(i.id, i.message);
  return [...t.values()].sort((i, r) => i.timestamp - r.timestamp || i.id.localeCompare(r.id));
}
function ya(e) {
  return [...ie.values()].filter((t) => t.scope === e).map((t) => t.message);
}
function Kt(e) {
  const t = wt(e);
  return t && t.length <= 1e3 && !/\/noface\.(jpg|png)(?:[?#]|$)/i.test(t) ? t : "";
}
function ln(e, t = "") {
  const n = Kt(e) || Kt(t);
  return n || (e && e.length <= 8 && !/[:/]/.test(e) ? e : "🦫");
}
const un = "lw_chat_server_url", Bi = "lw_chat_user_id", dn = "lw_chat_user_name", fn = "lw_chat_user_avatar", te = "lw_chat_groups", xi = "lw_chat_current_group", uo = "lw_chat_rooms", fo = "lw_chat_friends", Li = "lw_chat_friend_requests_v1", Wt = "lw_chat_current_room", Wi = "";
function ee(e, t) {
  try {
    if (typeof localStorage < "u") {
      const n = localStorage.getItem(e);
      if (e === un && n && localStorage.getItem("lw_chat_server_explicit") !== "true" && (n.includes("sslip.io") || n.includes("your-domain.com")))
        return localStorage.removeItem(e), t;
      if (n !== null) return n;
    }
  } catch {
  }
  return t;
}
function I(e, t) {
  try {
    typeof localStorage < "u" && localStorage.setItem(e, t);
  } catch {
  }
}
function it(e, t) {
  try {
    if (typeof localStorage < "u") {
      const n = localStorage.getItem(e);
      if (n) return JSON.parse(n);
    }
  } catch {
  }
  return t;
}
const mo = [
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
], po = [
  { id: "main", name: "自习室大厅", icon: "🏠" },
  { id: "dev", name: "代码与摸鱼", icon: "💻" },
  { id: "music", name: "音乐咖啡馆", icon: "🎵" }
];
function ho() {
  const e = ["摸鱼", "冲浪", "喝茶", "听歌", "看番", "敲代码", "发呆", "漫游"], t = ["海狸", "企鹅", "猫猫", "柴犬", "仓鼠", "水獭", "考拉", "熊猫"], n = e[Math.floor(Math.random() * e.length)], i = t[Math.floor(Math.random() * t.length)], r = Math.floor(1e3 + Math.random() * 9e3);
  return `${n}的${i}#${r}`;
}
function go() {
  const e = ["🦫", "🐧", "🐱", "🐶", "🐹", "🦦", "🐨", "🐼", "🦊", "🐰"];
  return e[Math.floor(Math.random() * e.length)];
}
const $i = ee(Bi, ""), Vn = $i || `u_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`;
$i || I(Bi, Vn);
const Ht = ee(dn, ""), yo = !Ht || Ht.includes("#"), li = Y.userName && Y.userName !== "哔哩哔哩用户" && Y.userName !== "浏览器指纹与环境" ? Y.userName : "", ji = yo && li ? li : Ht || ho();
Ht || I(dn, ji);
const $e = ee(fn, ""), wo = !$e || $e.length <= 4 || $e.startsWith("data:") || $e.includes("/noface."), ui = Kt(Y.avatarUrl), Fi = wo && ui ? ui : $e || go();
$e || I(fn, Fi);
const c = Q({
  visible: !1,
  shareActivity: ee("lw_chat_share_activity", "true") !== "false",
  error: "",
  connected: !1,
  connecting: !1,
  onlineCount: 1,
  serverUrl: ee(un, Wi),
  currentGroupId: ee(xi, "hub_main"),
  currentChannelId: "general",
  groups: it(te, mo),
  groupMembers: [],
  currentRoomId: ee(Wt, "main"),
  rooms: it(uo, po),
  friends: it(fo, []),
  friendRequests: it(Li, []),
  currentUser: {
    uid: Vn,
    name: ji,
    avatar: Fi
  },
  messages: ft(ee(Wt, "main")).length > 0 ? ft(ee(Wt, "main")) : [
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
So();
Ue(
  () => [Y.avatarUrl, Y.userName],
  ([e, t]) => {
    const n = c.currentUser.avatar;
    Kt(e) && (!n || n.length <= 4 || n.startsWith("data:") || n.includes("/noface.") || /^https?:\/\/[^/]*hdslb\.com\//i.test(n)) && (c.currentUser.avatar = e, I(fn, e)), t && t !== "哔哩哔哩用户" && t !== "浏览器指纹与环境" && (!c.currentUser.name || c.currentUser.name.includes("#") || c.currentUser.name.startsWith("摸鱼")) && (c.currentUser.name = t, I(dn, t));
  },
  { immediate: !0 }
);
const di = Q({ scope: "", ready: !1 });
let Pt = 0;
Ue(
  () => Fn(c.currentUser.uid, c.serverUrl, c.currentRoomId),
  async (e) => {
    const t = ++Pt;
    Object.assign(di, { scope: e, ready: !1 });
    const { currentRoomId: n, serverUrl: i, currentUser: r } = c, o = ft(n, i, r.uid);
    await cn(e, o);
    try {
      const s = await Di(e);
      if (t !== Pt) return;
      const a = new Map(s.map((u) => [u.id, u]));
      for (const u of c.messages) u.id !== "sys-welcome" && a.set(u.id, u);
      c.messages = [...a.values()].sort((u, d) => u.timestamp - d.timestamp || u.id.localeCompare(d.id)).slice(-200);
    } catch {
      t === Pt && (dt.value = "无法读取历史数据库，现有缓存未删除，请导出备份后检查浏览器存储。");
    } finally {
      t === Pt && (di.ready = !0);
    }
  },
  { immediate: !0 }
);
function wa(e, t) {
  c.currentUser.name = e.trim() || c.currentUser.name, c.currentUser.avatar = t.trim() || c.currentUser.avatar, I(dn, c.currentUser.name), I(fn, c.currentUser.avatar);
}
function vo(e, t, n) {
  return "lw_chat_history_v2_" + JSON.stringify([n, t, e]);
}
function ft(e, t = ee(un, Wi), n = Vn) {
  try {
    const i = localStorage.getItem(vo(e, t, n));
    if (i) {
      const r = JSON.parse(i);
      if (Array.isArray(r)) return r.map(vt).filter((o) => !!o).slice(-200);
    }
  } catch {
  }
  return [];
}
function bo(e, t) {
  const n = Fn(c.currentUser.uid, c.serverUrl, e);
  cn(n, t);
}
function Vi(e, t) {
  if (!e) return "";
  const n = new URL(sn(e));
  return n.searchParams.set("room", t), n.href;
}
function On(e, t = !0, n = !1) {
  if (t && dt.value && jn.value > 0)
    return c.error = "仍有未保存消息，请先重试保存或导出备份，暂不切换房间", !1;
  try {
    e.endpoint = sn(e.endpoint), localStorage.setItem("lw_chat_session_v1", JSON.stringify(e));
  } catch {
    return c.error = "会话保存失败或地址无效，未切换房间", !1;
  }
  const i = e.endpoint !== c.serverUrl || e.roomId !== c.currentRoomId;
  return i && t && bo(c.currentRoomId, c.messages), Object.assign(c, {
    currentGroupId: e.groupId,
    currentChannelId: e.channelId,
    currentRoomId: e.roomId,
    serverUrl: e.endpoint
  }), i && (c.messages = ft(e.roomId, e.endpoint, c.currentUser.uid), c.userActivities = {}, c.unreadCount = 0, n || (c.connected = !1, c.connecting = !1), c.onlineCount = 0), I(un, e.endpoint), I(Wt, e.roomId), I(xi, e.groupId), !0;
}
function bt(e, t = "local", n = !1) {
  let i, r = t;
  try {
    if (i = sn(e), i) {
      const a = new URL(i);
      if (r = a.searchParams.get("room") || "default", !r || r.length > 160) throw new Error();
      a.searchParams.set("room", r), i = a.href;
    }
  } catch {
    return c.error = "房间地址无效，未切换会话", !1;
  }
  for (const a of c.groups)
    for (const u of a.channels)
      if ((u.endpoint ?? Vi(a.endpoint ?? "", `${a.id}__${u.id}`)) === i && (i || u.id === r))
        return On({ groupId: a.id, channelId: u.id, roomId: r, endpoint: i }, !0, n);
  const o = "joined_" + crypto.randomUUID(), s = {
    id: o,
    name: i ? "受邀房间" : "本地房间",
    icon: "💬",
    endpoint: i,
    isCustom: !0,
    channels: [{ id: r, name: r, icon: "💬", endpoint: i }]
  };
  return c.groups.push(s), On({ groupId: o, channelId: r, roomId: r, endpoint: i }, !0, n) ? (I(te, JSON.stringify(c.groups)), !0) : (c.groups.pop(), !1);
}
function So() {
  for (const t of c.groups) t.endpoint ??= c.serverUrl;
  const e = it("lw_chat_session_v1", null);
  if (e && typeof e.endpoint == "string" && typeof e.roomId == "string") {
    const t = c.groups.find((i) => i.id === e.groupId), n = t?.channels.find((i) => i.id === e.channelId);
    if (t && n)
      try {
        const i = sn(e.endpoint), r = i ? new URL(i).searchParams.get("room") || "default" : e.roomId;
        n.endpoint = i, Object.assign(c, {
          currentGroupId: t.id,
          currentChannelId: n.id,
          currentRoomId: r,
          serverUrl: i,
          messages: ft(r, i, c.currentUser.uid)
        }), I(te, JSON.stringify(c.groups));
        return;
      } catch {
      }
  }
  bt(c.serverUrl, c.currentRoomId), I(te, JSON.stringify(c.groups));
}
function va(e) {
  c.friendRequests = c.friendRequests.filter((t) => t.id !== e), I(Li, JSON.stringify(c.friendRequests));
}
function mn(e, t) {
  const n = c.groups.find((s) => s.id === e), i = n?.channels.find((s) => s.id === t) || n?.channels[0];
  if (!n || !i) return !1;
  const r = i.endpoint !== void 0 ? i.endpoint ? new URL(i.endpoint).searchParams.get("room") || "default" : i.id : `${n.id}__${i.id}`, o = i.endpoint ?? Vi(n.endpoint ?? "", r);
  return On({ groupId: n.id, channelId: i.id, roomId: r, endpoint: o });
}
function ba(e, t = "👥") {
  const n = e.trim() || "新群组", i = "group_" + Math.random().toString(36).slice(2, 8), r = {
    id: i,
    name: n,
    icon: t,
    channels: [
      { id: "general", name: "综合讨论", icon: "💬" },
      { id: "music", name: "音乐分享", icon: "🎵" },
      { id: "bili", name: "B站动态", icon: "📺" }
    ],
    endpoint: c.serverUrl,
    isCustom: !0
  };
  return c.groups.push(r), I(te, JSON.stringify(c.groups)), mn(i, "general"), r;
}
function Sa(e) {
  if (c.groups.length <= 1) return;
  const t = c.groups.filter((n) => n.id !== e);
  if (c.currentGroupId === e) {
    const n = t[0];
    if (!n || !mn(n.id, n.channels[0]?.id || "general")) return;
  }
  c.groups = t, I(te, JSON.stringify(c.groups));
}
function Ea(e, t = "💬") {
  const n = c.groups.find((r) => r.id === c.currentGroupId);
  if (!n) return;
  const i = "ch_" + Math.random().toString(36).slice(2, 6);
  n.channels.push({ id: i, name: e.trim() || "新频道", icon: t }), I(te, JSON.stringify(c.groups)), mn(n.id, i);
}
function Aa(e, t, n) {
  const i = c.groups.find((r) => r.id === e);
  i && (i.name = t.trim() || i.name, n && (i.icon = n), I(te, JSON.stringify(c.groups)));
}
function Ca(e, t, n, i) {
  const r = c.groups.find((s) => s.id === e);
  if (!r) return;
  const o = r.channels.find((s) => s.id === t);
  o && (o.name = n.trim() || o.name, i && (o.icon = i), I(te, JSON.stringify(c.groups)));
}
function _a(e, t) {
  const n = c.groups.find((r) => r.id === e);
  if (!n || n.channels.length <= 1) return;
  const i = n.channels.filter((r) => r.id !== t);
  c.currentGroupId === e && c.currentChannelId === t && (!i[0] || !mn(e, i[0].id)) || (n.channels = i, I(te, JSON.stringify(c.groups)));
}
const b = (e) => JSON.stringify([e.origin, e.room, e.uid]);
function mt(e) {
  return typeof e == "string" && /^[A-Za-z0-9_-]{43}$/.test(e);
}
function St(e) {
  try {
    if (!e || typeof e != "object") throw new Error();
    const t = e;
    if (typeof t.origin != "string" || typeof t.room != "string" || typeof t.uid != "string") throw new Error();
    const n = new URL(t.origin);
    if (!["http:", "https:"].includes(n.protocol) || n.username || n.password || n.pathname !== "/" || n.search || n.hash || !/^[A-Za-z0-9_-]{1,160}$/.test(t.room) || !/^[A-Za-z0-9_-]{1,160}$/.test(t.uid)) throw new Error();
    if (n.protocol === "http:" && !["localhost", "127.0.0.1", "[::1]"].includes(n.hostname)) throw new Error();
    return { origin: n.origin, room: t.room, uid: t.uid };
  } catch {
    throw new Error("聊天室配置无效：公网必须使用 HTTPS；HTTP 仅允许 localhost、127.0.0.1 或 ::1");
  }
}
const qn = "lw_private_chat_v1", p = Q({ room: null, diagnostic: "" });
function Gn() {
  let e = null, t = "";
  try {
    const n = localStorage.getItem(qn);
    if (n === null) t = "当前浏览器配置中没有保存聊天室连接。请确认使用的是原来的浏览器用户和插件，或重新导入自己的邀请。";
    else
      try {
        e = St(JSON.parse(n));
      } catch {
        t = "已保存的聊天室配置无效或使用了公网 HTTP，原记录和凭证未删除。请先配置 HTTPS，再按部署指南重新导入匹配当前聊天 ID 的邀请。";
      }
  } catch {
    t = "无法读取本机存储，请检查浏览器是否限制存储访问。";
  }
  p.diagnostic = t, JSON.stringify(e) !== JSON.stringify(p.room) && (p.room = e);
}
Gn();
window.addEventListener("storage", (e) => {
  (e.key === qn || e.key === null) && Gn();
});
window.addEventListener("focus", Gn);
const Eo = Te(() => !!p.room);
function qi(e) {
  return e.origin.replace(/^http:/, "ws:").replace(/^https:/, "wss:") + "/ws?room=" + encodeURIComponent(e.room);
}
function Ao(e) {
  const t = St(e);
  localStorage.setItem(qn, JSON.stringify(t)), p.diagnostic = "", p.room = t;
}
const Kn = se(0), j = se(""), Hn = /* @__PURE__ */ new Map();
let Sn;
function Je() {
  return Sn ||= new Promise((e, t) => {
    const n = indexedDB.open("lw-chat-delivery", 1);
    n.onupgradeneeded = () => {
      n.result.createObjectStore("deliveries", { keyPath: ["scope", "id", "uid"] }).createIndex("scope", "scope");
    }, n.onsuccess = () => {
      n.result.onversionchange = () => {
        n.result.close(), Sn = void 0;
      }, e(n.result);
    }, n.onerror = () => t(n.error), n.onblocked = () => {
      j.value = "发送队列被旧窗口阻塞，请关闭旧窗口后重试。";
    };
  }).catch((e) => {
    throw Sn = void 0, e;
  });
}
async function Co(e) {
  const t = await Je();
  return new Promise((n, i) => {
    const r = t.transaction("deliveries", "readonly"), o = r.objectStore("deliveries").index("scope").getAll(e);
    r.oncomplete = () => n(o.result), r.onabort = () => i(r.error), o.onerror = () => i(o.error);
  });
}
let fi = Promise.resolve();
function Et(e) {
  const t = fi.then(e);
  return fi = t.catch(() => {
  }), t;
}
async function ze(e) {
  try {
    const t = /* @__PURE__ */ new Map();
    for (const n of await Co(e)) {
      const i = t.get(n.id) || [];
      i.push(n), t.set(n.id, i);
    }
    Hn.set(e, t), Kn.value++;
  } catch {
    j.value = "无法读取发送确认记录，请检查浏览器存储。";
  }
}
function _o(e, t) {
  Kn.value;
  const n = Hn.get(e)?.get(t) || [];
  if (!n.length) return "none";
  const i = n.filter((r) => !r.received);
  return i.length ? i.some((r) => r.failure === "rejected" || r.failure === "paused" || r.attempts >= 5 && (r.failure === "unconfirmed" || Date.now() - r.lastAttempt > 15e3)) ? "failed" : "sending" : "stored";
}
function Ta(e, t) {
  Kn.value;
  const n = Hn.get(e)?.get(t) || [];
  if (!n.length) return "无送达确认";
  const i = n.filter((o) => o.received).length;
  return i === n.length ? n.every((o) => o.uid === "private-relay-server") ? "服务器已保存（不代表对方已读）" : `对方已接收 ${i}/${n.length}（非已读）` : n.filter((o) => !o.received).some((o) => o.failure === "rejected") ? "服务器拒绝此次发送，可在消息详情中重试；不代表此前尝试一定未保存" : _o(e, t) === "failed" ? "尚未获得保存确认，自动补发已暂停；不代表一定未送达，可在消息详情中重试" : "正在发送／等待保存确认，将按原目标房间补发；请勿重复发送";
}
async function Gi(e, t, n) {
  await Et(async () => {
    const i = await Je();
    await new Promise((r, o) => {
      const s = i.transaction("deliveries", "readwrite"), a = s.objectStore("deliveries");
      for (const u of new Set(n)) {
        const d = a.get([e, t.id, u]);
        d.onsuccess = () => {
          if (d.result?.received) return;
          const f = { scope: e, id: t.id, uid: u, message: JSON.parse(JSON.stringify(t)), attempts: 0, lastAttempt: 0, received: !1 };
          a.put(f);
        };
      }
      s.oncomplete = () => r(), s.onabort = () => o(s.error), s.onerror = () => o(s.error);
    }), await ze(e);
  });
}
async function ka(e, t) {
  try {
    await Et(async () => {
      const n = await Je();
      await new Promise((i, r) => {
        const o = n.transaction("deliveries", "readwrite"), s = o.objectStore("deliveries").index("scope").openCursor(e);
        s.onsuccess = () => {
          const a = s.result;
          if (!a) return;
          const u = a.value;
          u.id === t && !u.received && a.update({ ...u, attempts: 5, failure: "paused" }), a.continue();
        }, o.oncomplete = () => i(), o.onabort = () => r(o.error), o.onerror = () => r(o.error);
      }), await ze(e);
    });
  } catch {
    j.value = "暂停补发未能保存，请检查存储；已发出的消息无法撤回。";
  }
}
async function To(e, t, n) {
  return Ki(e, [t], n);
}
async function Ki(e, t, n) {
  t.length && await Et(async () => {
    const i = await Je();
    await new Promise((r, o) => {
      const s = i.transaction("deliveries", "readwrite"), a = s.objectStore("deliveries");
      for (const u of new Set(t)) {
        const d = a.get([e, u, n]);
        d.onsuccess = () => {
          d.result && a.put({ ...d.result, received: !0, failure: void 0, message: void 0 });
        };
      }
      s.oncomplete = () => r(), s.onabort = () => o(s.error), s.onerror = () => o(s.error);
    }), await ze(e);
  });
}
async function mi(e, t, n, i = !1, r, o = !1) {
  await Et(async () => {
    const s = await Je();
    await new Promise((a, u) => {
      const d = s.transaction("deliveries", "readwrite"), f = d.objectStore("deliveries"), m = f.get([e, t, n]);
      m.onsuccess = () => {
        const g = m.result;
        g && !g.received && (r === void 0 || g.lastAttempt === r) && f.put({
          ...g,
          attempts: i || o ? 5 : g.attempts,
          failure: o ? "paused" : i ? "rejected" : g.failure === "paused" ? "paused" : "unconfirmed"
        });
      }, d.oncomplete = () => a(), d.onerror = d.onabort = () => u(d.error);
    }), await ze(e);
  });
}
async function ko(e, t, n, i, r = 4, o = () => !0) {
  await Et(async () => {
    const s = await Je(), a = [];
    await new Promise((u, d) => {
      const f = s.transaction("deliveries", "readwrite"), m = f.objectStore("deliveries").index("scope").openCursor(e);
      m.onsuccess = () => {
        const g = m.result;
        if (!g || a.length >= r || !n()) return;
        const w = g.value;
        if (!w.received && w.message && w.attempts < 5 && Date.now() - w.lastAttempt >= 1e4 && t.includes(w.uid)) {
          if (!o(w.message)) {
            g.update({ ...w, attempts: 5, failure: "paused" }), g.continue();
            return;
          }
          const C = { ...w, attempts: w.attempts + 1, lastAttempt: Date.now(), failure: void 0 };
          g.update(C), a.push(C);
        }
        g.continue();
      }, f.oncomplete = () => u(), f.onabort = () => d(f.error), f.onerror = () => d(f.error);
    });
    for (const u of a) n() && i(u.uid, u.message, u.lastAttempt);
    await ze(e);
  });
}
function Uo() {
  if (Ye.isOpen && Ye.title)
    return {
      type: "bilibili",
      title: Ye.title,
      url: Ye.bvid ? `https://www.bilibili.com/video/${Ye.bvid}` : void 0,
      updatedAt: Date.now()
    };
  if (l.playing && l.title)
    return {
      type: "music",
      title: `${l.title} - ${l.artist || "未知歌手"}`,
      updatedAt: Date.now()
    };
  const e = le.activeId;
  if (e === "card-github")
    return { type: "github", title: "GitHub 热门开源仓库", updatedAt: Date.now() };
  if (e === "daily-bilibili")
    return { type: "bilibili", title: "Bilibili 视频工作区", updatedAt: Date.now() };
  if (e === "daily-aihot")
    return { type: "aihot", title: "AI HOT 热门前沿资讯", updatedAt: Date.now() };
  if (e === "todoist")
    return { type: "idle", title: "Todoist 待办任务清单", updatedAt: Date.now() };
}
function Io(e) {
  switch (e.type) {
    case "music": {
      const t = e.meta?.musicTitle || "未知曲目", n = e.meta?.musicArtist ? ` - ${e.meta.musicArtist}` : "";
      return `🎵 音乐分享: 《${t}》${n}`;
    }
    case "bilibili":
      return `📺 B站视频: ${e.meta?.videoTitle || "视频分享"}`;
    case "bili_series":
      return `📻 B站电台: ${e.meta?.seriesName || "系列分享"}`;
    case "github":
      return `🐙 GitHub仓库: ${e.meta?.repoOwner && e.meta?.repoName ? `${e.meta.repoOwner}/${e.meta.repoName}` : e.meta?.repoName || "GitHub仓库"}`;
    case "aihot":
      return `🔥 AI资讯: ${e.meta?.aihotTitle || "资讯分享"}`;
    case "youtube":
      return `▶️ YouTube: ${e.meta?.youtubeTitle || "视频分享"}`;
    case "image":
      return "🖼️ [图片]";
    case "website":
      return `🔗 网页分享: ${e.meta?.linkTitle || e.meta?.linkUrl || "网页"}`;
    case "music_party":
      return `🎧 一起听: 《${e.meta?.partyTitle || "音乐派对"}》`;
    case "server_invite":
      return `🏠 邀请加入: ${e.meta?.inviteServerName || e.meta?.inviteRoom || "聊天室"}`;
    default:
      return e.content || "收到一条新消息";
  }
}
function Mo(e, t) {
  if (c.visible) return;
  const n = t || h.channel || "main", i = h.rooms.find((s) => s.id === n), r = i?.name ? `#${i.name}` : void 0;
  let o = "assets/icon-48.png";
  if (e.sender?.avatar && /^https?:\/\//i.test(e.sender.avatar)) {
    const s = on(e.sender.avatar);
    s && (o = s);
  }
  ne.show({
    id: `chat_msg_${e.id}`,
    appType: "chat",
    appName: "海狸聊天室",
    icon: o,
    title: e.sender?.name || "新消息",
    subtitle: r,
    message: Io(e),
    duration: 6500,
    level: "info",
    history: !0,
    target: { type: "module", moduleId: "chat" },
    actionLabel: "查看消息",
    onClick: () => {
      en.handleToolClick("chat");
    }
  });
}
class Ke extends Error {
  constructor(t) {
    super(`服务器响应 ${t}`), this.status = t, this.name = "PrivateChatHttpError";
  }
}
class Pe extends Error {
  constructor() {
    super(...arguments), this.name = "ChatCapabilityError";
  }
}
function Hi(e, t, n) {
  return new Promise((i, r) => {
    const o = new AbortController(), s = () => o.abort(new DOMException("聊天室操作已停止等待", "AbortError")), a = () => {
      clearTimeout(d), n?.removeEventListener("abort", s), o.signal.removeEventListener("abort", u);
    }, u = () => {
      a(), r(o.signal.reason);
    }, d = setTimeout(() => o.abort(new DOMException("聊天室操作超时，结果可能尚未确认", "TimeoutError")), e);
    if (o.signal.addEventListener("abort", u, { once: !0 }), n?.addEventListener("abort", s, { once: !0 }), n?.aborted) {
      s();
      return;
    }
    Promise.resolve().then(() => (o.signal.throwIfAborted(), t(o.signal))).then(
      (f) => {
        a(), o.signal.aborted ? r(o.signal.reason) : i(f);
      },
      (f) => {
        a(), r(f);
      }
    );
  });
}
class G extends Error {
  constructor(t) {
    super({
      blocked: "凭证数据库被旧标签页阻塞，请关闭旧页后重试",
      storage: "无法读写聊天室凭证，请检查浏览器存储",
      timeout: "凭证存储超时，结果可能尚未确认，请勿重复导入",
      invalid: "凭证格式无效，请重新导入邀请",
      missing: "凭证不存在，请重新导入邀请"
    }[t]), this.code = t, this.name = "PrivateChatCredentialError";
  }
}
class Po {
  constructor(t = () => {
  }) {
    this.onBlocked = t;
  }
  open() {
    if (this.database) return this.database;
    const t = new Promise((n, i) => {
      let r = !1;
      const o = (a) => {
        r || (r = !0, clearTimeout(s), i(a));
      }, s = setTimeout(() => o(new G("timeout")), 8e3);
      try {
        const a = indexedDB.open("lw-private-chat-credentials", 1);
        a.onupgradeneeded = () => {
          if (r) {
            a.transaction?.abort();
            return;
          }
          a.result.createObjectStore("credentials");
        }, a.onsuccess = () => {
          const u = a.result;
          if (r) {
            u.close();
            return;
          }
          r = !0, clearTimeout(s), u.onversionchange = () => {
            u.close(), this.database === t && (this.database = void 0);
          }, n(u);
        }, a.onerror = () => o(new G("storage")), a.onblocked = () => {
          if (!r) {
            o(new G("blocked"));
            try {
              this.onBlocked();
            } catch {
            }
          }
        };
      } catch {
        o(new G("storage"));
      }
    });
    return this.database = t, t.catch(() => {
      this.database === t && (this.database = void 0);
    }), t;
  }
  read(t, n) {
    return this.access(t, void 0, n);
  }
  async write(t, n) {
    if (!mt(n)) throw new G("invalid");
    await this.access(t, n);
  }
  access(t, n, i) {
    const r = b(t);
    return Hi(8e3, async (o) => {
      try {
        const s = await this.open();
        return o.throwIfAborted(), await new Promise((a, u) => {
          const d = s.transaction("credentials", n === void 0 ? "readonly" : "readwrite"), f = d.objectStore("credentials"), m = n === void 0 ? f.get(r) : f.put(n, r), g = () => {
            try {
              d.abort();
            } catch {
            }
          }, w = () => o.removeEventListener("abort", g);
          n === void 0 && o.addEventListener("abort", g, { once: !0 }), d.oncomplete = () => {
            w();
            const C = n === void 0 ? m.result : n;
            C === void 0 || C === "" ? u(new G("missing")) : mt(C) ? a(C) : u(new G("invalid"));
          }, d.onabort = d.onerror = m.onerror = () => {
            w(), u(new G("storage"));
          };
        });
      } catch (s) {
        throw o.aborted ? o.reason : s instanceof G ? s : new G("storage");
      }
    }, i);
  }
}
class _e extends Error {
  constructor() {
    super(...arguments), this.name = "PrivateChatTransportError";
  }
}
class Ro {
  constructor(t) {
    this.ports = t;
  }
  async request(t) {
    let n, i;
    try {
      if (n = Object.freeze({ ...St(t.destination), channel: t.destination.channel }), i = new URL(t.path, n.origin), !t.path.startsWith("/api/v1/") || t.path.includes("\\") || i.origin !== n.origin || i.hash || i.username || i.password || !i.pathname.startsWith("/api/v1/")) throw new Error();
    } catch {
      throw new _e("聊天室请求目标无效");
    }
    const r = Object.freeze({ ...t, destination: n, path: i.pathname, method: (t.method || "GET").toUpperCase() });
    return i.searchParams.set("room", n.room), i.searchParams.delete("channel"), n.channel && n.channel !== "main" && i.searchParams.set("channel", n.channel), Hi(r.signal ? 3e4 : 15e3, async (o) => {
      try {
        const s = await this.ports.credential(n, o);
        if (o.throwIfAborted(), !mt(s)) throw new G("invalid");
        this.ports.beforeSend(r);
        let a;
        try {
          a = r.body === void 0 ? void 0 : JSON.stringify(r.body);
        } catch {
          throw new _e("聊天室请求内容格式无效");
        }
        const u = await fetch(i, {
          method: r.method,
          signal: o,
          body: a,
          headers: { Authorization: `Bearer ${s}`, "Content-Type": "application/json" },
          redirect: "error",
          credentials: "omit",
          cache: "no-store",
          referrerPolicy: "no-referrer"
        }), d = () => {
          u.body?.cancel().catch(() => {
          });
        };
        if (o.aborted && (d(), o.throwIfAborted()), !u.ok)
          throw d(), new Ke(u.status);
        const f = u.body?.getReader();
        if (!f) throw new _e("聊天室返回空响应");
        const m = () => {
          f.cancel().catch(() => {
          });
        };
        o.addEventListener("abort", m, { once: !0 });
        let g = 0, w = "";
        const C = new TextDecoder();
        try {
          for (; ; ) {
            const B = await f.read();
            if (o.throwIfAborted(), B.done) break;
            if (g += B.value.byteLength, g > 2 * 1024 * 1024)
              throw m(), new _e("聊天室响应超限");
            w += C.decode(B.value, { stream: !0 });
          }
          try {
            return JSON.parse(w + C.decode());
          } catch {
            throw new _e("聊天室响应格式无效");
          }
        } finally {
          o.removeEventListener("abort", m);
          try {
            f.releaseLock();
          } catch {
          }
        }
      } catch (s) {
        throw o.aborted ? o.reason : s instanceof Ke || s instanceof Pe || s instanceof G || s instanceof _e ? s : new _e("聊天室请求失败，请检查网络或服务配置");
      }
    }, r.signal);
  }
}
class Oo {
  constructor(t) {
    this.ports = t, this.generation = 0, this.halted = !0, this.liveGeneration = -1, this.reads = new Pr();
  }
  get stopped() {
    return this.halted;
  }
  cancel() {
    this.invalidate();
  }
  invalidate() {
    const t = ++this.generation;
    return this.halted = !0, clearTimeout(this.timer), this.timer = void 0, this.reads.cancel(), t === this.generation && this.halted && this.ports.idle(), t;
  }
  start(t) {
    const n = Object.freeze({ ...t }), i = this.invalidate();
    i !== this.generation || !this.ports.active(n) || (this.halted = !1, this.ports.started(), this.tick(n, i, 0));
  }
  owns(t, n) {
    return this.generation === n && !this.halted && this.ports.active(t);
  }
  schedule(t, n, i) {
    clearTimeout(this.timer), this.timer = setTimeout(() => {
      this.timer = void 0, i === this.generation && t();
    }, n);
  }
  async tick(t, n, i) {
    if (!this.owns(t, n)) return;
    if (this.running) {
      this.schedule(() => {
        this.tick(t, n, i);
      }, 250, n);
      return;
    }
    const r = /* @__PURE__ */ Symbol("chat-sync");
    this.running = r;
    const o = this.ports.visible(), s = this.reads.begin({ timeoutMs: o ? 25e3 : 2e4, isCurrent: () => this.owns(t, n) });
    let a = o ? 2500 : 1e4, u = "读取本地历史";
    const d = {
      signal: s.signal,
      current: s.current,
      wait: s.wait,
      visible: o,
      phase: (f) => {
        u = f;
      },
      restoring: () => this.liveGeneration !== n,
      caughtUp: () => {
        s.current() && (this.liveGeneration = n);
      }
    };
    try {
      this.ports.started();
      const f = await s.wait(() => this.ports.poll(t, d));
      if (!s.current()) return;
      i = 0, f?.hasMore && (a = 250);
    } catch (f) {
      if (!this.owns(t, n)) return;
      const m = this.ports.classify(f, t);
      m === "retry" ? (++i, a = Math.min(6e4, 1500 * 2 ** Math.min(i, 4))) : this.halted = !0, this.ports.failed(m, u, i), m === "missing-room" && n === this.generation && this.halted && this.schedule(() => this.ports.restart(), 0, n);
    } finally {
      s.finish(), this.running === r && (this.running = void 0), n === this.generation && (this.ports.active(t) || (this.halted = !0), this.ports.idle()), this.owns(t, n) && this.schedule(() => {
        this.tick(t, n, i);
      }, a, n);
    }
  }
}
const ce = (e) => !!e && typeof e == "object" && !Array.isArray(e), ye = (e) => typeof e == "string" && /^[A-Za-z0-9_-]{1,160}$/.test(e), ot = (e) => e == null, pt = (e) => typeof e == "number" && Number.isFinite(e) && e >= 0;
function $() {
  throw new Error("同步页格式无效，未提交本页记录或推进游标");
}
function pn(e) {
  if (!Array.isArray(e) || e.length > 32) throw new Error("房间列表格式无效");
  return e.map((t) => {
    if (!ce(t) || !ye(t.id) || typeof t.name != "string" || t.name.length > 80 || typeof t.icon != "string" || t.icon.length > 8 || typeof t.description != "string" || t.description.length > 500) throw new Error("房间格式无效");
    if (t.space !== void 0 && !ye(t.space)) throw new Error("空间格式无效");
    return { id: t.id, name: t.name, icon: t.icon, description: t.description, space: typeof t.space == "string" ? t.space : "hub_main" };
  });
}
function hn(e) {
  if (!Array.isArray(e) || e.length > 16) throw new Error("空间列表格式无效");
  return e.map((t) => {
    if (!ce(t) || !ye(t.id) || typeof t.name != "string" || t.name.length > 80 || typeof t.icon != "string" || t.icon.length > 8) throw new Error("空间格式无效");
    return { id: t.id, name: t.name, icon: t.icon };
  });
}
function Ji(e, t) {
  if (typeof e.name != "string" || e.name.length > 200) return;
  const n = so({ ...e, name: e.name.slice(0, 100) }, t);
  return n && { ...n, name: e.name };
}
function No(e, t) {
  return ot(e) ? [] : ((!Array.isArray(e) || e.length > 65) && $(), e.map((n) => {
    (!ce(n) || !ye(n.uid) || n.role !== void 0 && n.role !== "owner" && n.role !== "member") && $();
    const i = Ji(n, t);
    return i || $(), i.activity && ce(n.activity) && pt(n.activity.updatedAt) && (i.activity.updatedAt = n.activity.updatedAt), {
      ...i,
      role: n.role === "owner" ? "owner" : "member",
      online: typeof n.online == "boolean" ? n.online : void 0,
      lastSeen: pt(n.lastSeen) ? n.lastSeen : void 0
    };
  }));
}
function Do(e, t, n) {
  if (!ot(e))
    return (!Array.isArray(e) || e.length > 200) && $(), e.map((i) => {
      (!ce(i) || !ye(i.id) || !ye(i.toUid) || !ce(i.from) || !ye(i.from.uid)) && $();
      const r = Ji(i.from, n);
      return (!r || r.uid !== t && i.toUid !== t || !["pending", "accepted", "rejected"].includes(String(i.status))) && $(), i.createdAt !== void 0 && !pt(i.createdAt) && $(), {
        id: i.id,
        from: r,
        toUid: i.toUid,
        status: i.status,
        createdAt: pt(i.createdAt) ? i.createdAt : n,
        note: typeof i.note == "string" && i.note.length <= 200 ? i.note : void 0
      };
    });
}
function Bo(e, t, n, i) {
  (!Number.isSafeInteger(n) || n < 0 || !pt(i) || !ce(e) || !ce(e.identity) || e.identity.uid !== t || e.identity.role !== "owner" && e.identity.role !== "member" || !Array.isArray(e.messages) || e.messages.length > 50) && $();
  let r = n;
  const o = [], s = [];
  for (const d of e.messages) {
    (!ce(d) || !Number.isSafeInteger(d.seq) || d.seq <= r) && $();
    const f = Ni(d.message, i);
    f || $(), o.push(f), s.push(d.seq), r = d.seq;
  }
  e.hasMore !== void 0 && typeof e.hasMore != "boolean" && $();
  const a = e.hasMore === !0;
  a && !o.length && $();
  let u;
  return ot(e.friends) || ((!Array.isArray(e.friends) || e.friends.length > 4096 || !e.friends.every(ye)) && $(), u = [...new Set(e.friends)]), Object.freeze({
    uid: t,
    role: e.identity.role,
    messages: o,
    sequences: s,
    next: r,
    hasMore: a,
    capabilities: ro(e.capabilities),
    rooms: ot(e.rooms) ? [{ id: "main", name: "综合讨论", icon: "💬", description: "" }] : pn(e.rooms),
    spaces: ot(e.spaces) ? [{ id: "hub_main", name: "聊天室", icon: "🏠" }] : hn(e.spaces),
    roomsSupported: Array.isArray(e.rooms),
    spacesSupported: Array.isArray(e.spaces),
    members: No(e.members, i),
    friends: u,
    friendRequests: Do(e.friendRequests, t, i)
  });
}
function Xe(e, t, n) {
  for (const i of Object.keys(t)) {
    if (!n()) return !1;
    e[i] = t[i];
  }
  return n();
}
function xo(e, t, n, i) {
  const { chat: r, service: o } = i, s = n.current;
  if (!s()) return !1;
  const a = n.restoring();
  for (let y = 0; y < e.messages.length; y++) {
    if (!s()) return !1;
    const N = e.messages[y];
    i.publish(N, Object.freeze({
      scope: t.scope,
      channel: t.channel,
      sequence: e.sequences[y],
      source: a ? "history" : N.sender.uid === e.uid ? "self" : "live"
    }), s);
  }
  if (!s()) return !1;
  const u = new Set(r.messages.map((y) => y.id)), d = e.messages.filter((y) => y.sender.uid !== e.uid && !y.meta?.silentPartySync && y.type !== "system" && !u.has(y.id)), f = r.visible ? [] : d.filter((y) => (t.cursor > 0 || t.now - y.timestamp < 3e4) && (y.type !== "music_party" || !a)).slice(-3), m = new Map(r.messages.map((y) => [y.id, y]));
  for (const y of e.messages) m.set(y.id, y);
  const g = Object.assign(/* @__PURE__ */ Object.create(null), r.userActivities);
  for (const y of e.members) y.activity && (g[y.uid] = y.activity);
  const w = [], C = new Set(r.friends.map((y) => y.uid)), B = new Map(e.members.map((y) => [y.uid, y]));
  for (const y of e.friends || []) {
    const N = B.get(y);
    N && !C.has(y) && (w.push({ uid: y, name: N.name, avatar: N.avatar, addedAt: t.now, status: "mutual" }), C.add(y));
  }
  if (!Xe(r, {
    messages: [...m.values()].sort((y, N) => y.timestamp - N.timestamp || y.id.localeCompare(N.id)).slice(-200),
    unreadCount: d.length ? r.visible ? 0 : r.unreadCount + d.length : r.unreadCount
  }, s) || !Xe(o, {
    capabilities: e.capabilities,
    imageMessagesSupported: e.capabilities.messageTypes.includes("image"),
    spacesSupported: e.spacesSupported,
    spaces: e.spaces,
    roomsSupported: e.roomsSupported,
    rooms: e.rooms
  }, s) || (i.authenticated(), !s()) || !Xe(o, { role: e.role, members: e.members, ...e.friends === void 0 ? {} : { friends: e.friends } }, s)) return !1;
  for (const y of w) {
    if (!s()) return !1;
    r.friends.some((N) => N.uid === y.uid) || r.friends.push(y);
  }
  const be = e.members.some((y) => !!y.activity) || Object.getPrototypeOf(r.userActivities) !== null ? { userActivities: g } : {};
  if (!Xe(r, {
    ...be,
    ...e.friendRequests === void 0 ? {} : { friendRequests: e.friendRequests },
    connected: !0,
    connecting: !1,
    error: ""
  }, s) || !Xe(o, { status: "已连接私有服务器" }, s)) return !1;
  e.hasMore || n.caughtUp();
  for (const y of f) {
    if (!s()) return !1;
    if (r.visible) break;
    try {
      i.notify(y, t.channel);
    } catch {
      console.warn("[PrivateChat] notification failed");
    }
  }
  return s();
}
const ke = "private-relay-server";
class Lo {
  constructor(t) {
    this.ports = t, this.flushing = !1;
  }
  async postAndAcknowledge(t, n, i = 12e3) {
    const r = Object.freeze({ ...t }), o = lt(this.ports.capabilities(r), n);
    if (o) throw new Pe(o);
    const s = await this.ports.post(r, n, AbortSignal.timeout(i));
    if (!s || s.stored !== !0 || s.id !== n.id) throw new Error("未收到服务器落盘确认");
    await To(this.ports.scope(r), n.id, ke);
  }
  async recordFailure(t, n, i, r) {
    try {
      if (i instanceof Pe) {
        j.value = i.message, await mi(this.ports.scope(t), n, ke, !1, r, !0);
        return;
      }
      const o = i instanceof Ke && i.status >= 400 && i.status < 500 && ![408, 429].includes(i.status);
      await mi(this.ports.scope(t), n, ke, o, r);
    } catch {
      j.value = "无法保存消息的发送状态，请检查浏览器存储。";
    }
  }
  async flush(t) {
    if (this.flushing || !this.ports.active(t) || ["unknown", "incompatible"].includes(this.ports.capabilities(t).status)) return;
    this.flushing = !0;
    const n = [];
    try {
      const i = this.ports.destinations(t).map((o) => Object.freeze({ ...o }));
      let r = 8;
      for (const o of i) {
        if (!r || !this.ports.active(t)) break;
        await ko(this.ports.scope(o), [ke], () => this.ports.active(t), (s, a, u) => {
          --r;
          const d = { ...a, sender: { ...a.sender, avatar: this.ports.avatar(a.sender.avatar) } };
          return n.push(this.postAndAcknowledge(o, d).catch((f) => this.recordFailure(o, a.id, f, u))), !0;
        }, r, (s) => !lt(this.ports.capabilities(o), s));
      }
    } catch {
      j.value = "待发队列处理未确认，请检查本地存储；未改投其他房间。";
    } finally {
      await Promise.allSettled(n), this.flushing = !1;
    }
  }
}
const $t = [];
function Ua(e) {
  return $t.push(e), () => {
    const t = $t.indexOf(e);
    t >= 0 && $t.splice(t, 1);
  };
}
async function Ia() {
  const e = p.room;
  if (!e || e.uid !== c.currentUser.uid) throw new Error("请先在聊天室设置中加入自己的聊天室");
  const t = { ...e }, n = await V(t, "/api/v1/rooms", "GET", void 0, AbortSignal.timeout(15e3));
  if (!p.room || b(t) !== b(p.room)) throw new Error("聊天室配置已改变，请重新选择");
  const i = n.spaces ? hn(n.spaces) : [];
  return pn(n.rooms).map((r) => ({ ...t, channel: r.id, name: `${i.find((o) => o.id === r.space)?.name || "聊天室"} / ${r.name}` }));
}
async function Nn(e, t) {
  const n = p.room;
  if (!n || b(n) !== b(t) || c.currentUser.uid !== t.uid) throw new Error("聊天室身份已改变，未发送，请重新选择房间");
  const i = vt(e);
  if (!i || i.type === "system" || i.type === "image") throw new Error("分享内容无效或超出大小限制，未发送");
  const r = { ...t };
  i.sender = { ...i.sender, uid: r.uid, avatar: ln(c.currentUser.avatar, Y.avatarUrl), name: c.currentUser.name };
  const o = lt(At(r), i);
  if (o) throw new Error(o);
  await cn(we(r), [i]), await Gi(we(r), i, [ke]), ue(r) && !c.messages.some((s) => s.id === i.id) && c.messages.push(i);
  try {
    await Jt.postAndAcknowledge(r, i, 15e3);
  } catch (s) {
    throw await Jt.recordFailure(r, i.id, s, 0), yn(), new Error(`未收到「${r.name}」的保存确认；已保留在该房间待发队列，请勿重复发送。`);
  }
}
const h = Q({
  status: "未配置私有服务器",
  role: "",
  syncing: !1,
  channel: "main",
  rooms: [],
  spaces: [],
  spacesSupported: !1,
  imageMessagesSupported: !1,
  capabilities: rn(),
  roomsSupported: !1,
  friends: [],
  members: []
});
function At(e) {
  return Oe === b(e) && p.room && b(p.room) === b(e) && c.currentUser.uid === e.uid ? h.capabilities : rn();
}
function gn() {
  h.capabilities = rn(), h.imageMessagesSupported = !1;
}
const Jt = new Lo({
  active: ue,
  capabilities: At,
  scope: we,
  avatar: (e) => ln(e, Y.avatarUrl),
  destinations: (e) => [Re(e), ...h.rooms.filter((t) => t.id !== h.channel).map((t) => ({ ...e, channel: t.id }))],
  post: (e, t, n) => V(e, "/api/v1/messages", "POST", { message: t }, n)
}), zi = new Po(() => {
  h.status = "凭证数据库被旧标签页阻塞，请关闭旧页后重试";
}), Wo = new Ro({
  credential: (e, t) => zi.read(e, t),
  beforeSend: ({ destination: e, path: t, method: n, body: i }) => {
    if (!O.isInstalled("chat")) throw new Pe("聊天室实验组件已停用，未发起请求");
    const r = t === "/api/v1/members" || t.startsWith("/api/v1/members/"), o = n !== "GET" && ["/api/v1/spaces", "/api/v1/rooms"].some((s) => t === s || t.startsWith(s + "/"));
    if ((r || o) && (!c.connected || h.role !== "owner" || Oe !== b(e) || !p.room || b(p.room) !== b(e) || c.currentUser.uid !== e.uid))
      throw new Ke(403);
    if (n === "POST" && t === "/api/v1/messages") {
      const s = lt(At(e), i.message);
      if (s) throw new Pe(s);
    }
  }
});
function $o(e) {
  const t = "BEAVER-PRIVATE1:";
  if (!e.startsWith(t) || e.length > 8e3) throw new Error("请粘贴新版私有聊天室邀请");
  try {
    const n = JSON.parse(decodeURIComponent(atob(e.slice(t.length))));
    if (!n || !mt(n.token)) throw new Error();
    return { ...St(n), token: n.token };
  } catch {
    throw new Error("邀请格式无效");
  }
}
let Dn = 0;
async function Ma(e) {
  if (!O.isInstalled("chat")) throw new Pe("请先在商店手动启用聊天室实验组件");
  const t = $o(e);
  if (t.uid !== c.currentUser.uid) throw new Error("此邀请不属于当前 UID，请让服主为当前账号重新创建");
  const n = St(t), i = p.room ? b(p.room) : null;
  ht();
  const r = Dn;
  if (await zi.write(n, t.token), r !== Dn || c.currentUser.uid !== t.uid || i !== (p.room ? b(p.room) : null))
    throw new Error("凭据已保存，但身份或连接选择已改变，未激活旧邀请；如需加入请重新确认。");
  ht(), Ao(n), c.transportMode = "relay", bt(qi(n), t.room), ve();
}
function V(e, t, n = "GET", i, r) {
  return O.isInstalled("chat") ? Wo.request({ destination: e, path: t, method: n, body: i, signal: r }) : Promise.reject(new Pe("请先在商店手动启用聊天室实验组件"));
}
async function Yi(e, t, n) {
  const i = p.room;
  if (!i) throw new Error("未配置私有服务器");
  return V({ ...i }, e, t, n, AbortSignal.timeout(15e3));
}
async function Pa() {
  return (await Yi("/api/v1/members", "GET")).members;
}
async function jo(e, t) {
  const n = p.room;
  if (!n) throw new Error("未配置私有服务器");
  const i = { ...n }, r = await V(i, "/api/v1/members", "POST", { uid: e, name: t }, AbortSignal.timeout(15e3));
  if (!mt(r.token)) throw new Error("服务器返回无效，勿重复创建，请刷新成员列表");
  return "BEAVER-PRIVATE1:" + btoa(encodeURIComponent(JSON.stringify({ ...i, uid: e, token: r.token })));
}
async function Ra(e) {
  const t = p.room;
  if (!t) throw new Error("未配置私有服务器，无法发送邀请");
  if (e.uid === c.currentUser.uid) throw new Error("不能邀请自己");
  const n = At(t);
  if (!n.messageTypes.includes("server_invite")) throw new Error(n.status === "unknown" || n.status === "incompatible" ? n.reason : "服务端未启用邀请卡消息，未创建新成员邀请。");
  const i = await jo(e.uid, e.name), r = h.spaces.find((m) => m.id === (h.rooms.find((g) => g.id === h.channel)?.space || "hub_main")), o = h.rooms.find((m) => m.id === h.channel) || h.rooms[0], s = r?.name || t.room || "海狸聊天室", a = o?.name || "综合讨论";
  let u = "";
  try {
    u = JSON.parse(decodeURIComponent(atob(i.replace(/^BEAVER-PRIVATE1:/, "")))).token || "";
  } catch {
  }
  const d = {
    id: `msg_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    sender: {
      uid: c.currentUser.uid,
      name: c.currentUser.name,
      avatar: c.currentUser.avatar
    },
    type: "server_invite",
    content: `邀请你加入【${s}】聊天室`,
    meta: {
      inviteOrigin: t.origin,
      inviteRoom: t.room,
      inviteRoomName: a,
      inviteServerName: s,
      inviteServerIcon: r?.icon || "🏠",
      inviteToken: u,
      inviteTargetUid: e.uid,
      inviteCode: i
    },
    timestamp: Date.now()
  }, f = Qi(e.uid);
  await Nn(d, {
    ...t,
    channel: f,
    name: `私聊 / ${e.name}`
  }), Fo(e.uid);
}
async function Oa(e) {
  if (!/^[a-f0-9]{32}$/.test(e)) throw new Error("成员标识无效");
  await Yi("/api/v1/members/" + e, "DELETE");
}
function Re(e) {
  return { ...e, channel: h.channel };
}
function Ct(e) {
  const t = new URL(qi(e)), n = e.channel || "main";
  return n !== "main" && t.searchParams.set("channel", n), t.href;
}
function we(e) {
  return Fn(e.uid, Ct(e), e.room);
}
function ue(e) {
  return O.isInstalled("chat") && c.currentUser.uid === e.uid && c.serverUrl === Ct(e) && (e.channel || "main") === h.channel && c.currentRoomId === e.room && p.room !== null && b(p.room) === b(e);
}
function Na() {
  const e = p.room && Re(p.room);
  return e && ue(e) ? { scope: we(e), channel: e.channel } : null;
}
function Qi(e) {
  return "dm_" + [c.currentUser.uid, e].sort().join("__");
}
function Da(e) {
  if (!e.startsWith("dm_")) return;
  const t = e.slice(3).split("__");
  if (t.length === 2)
    return t.find((n) => n !== c.currentUser.uid);
}
function Fo(e) {
  const t = p.room;
  if (!t || !e || e === c.currentUser.uid) return;
  const n = Qi(e);
  n === h.channel && ue(Re(t)) || bt(Ct({ ...t, channel: n }), t.room, !0) && (h.channel = n, ve());
}
async function Vo(e) {
  const t = p.room;
  if (!t) throw new Error("未配置私有服务器");
  await V({ ...t }, "/api/v1/friends/request", "POST", { toUid: e }, AbortSignal.timeout(15e3));
}
async function qo(e, t) {
  const n = p.room;
  if (!n) throw new Error("未配置私有服务器");
  await V({ ...n }, "/api/v1/friends/respond", "POST", { id: e, accept: t }, AbortSignal.timeout(15e3));
}
function Xi(e) {
  const t = p.room;
  if (!(!t || !h.rooms.some((n) => n.id === e))) {
    if (e === h.channel && ue(Re(t))) {
      yn();
      return;
    }
    bt(Ct({ ...t, channel: e }), t.room, Oe === b(t) && c.currentUser.uid === t.uid) && (h.channel = e, ve());
  }
}
async function Ba(e, t) {
  const n = p.room;
  if (!n) throw new Error("未配置");
  const i = b(n), r = { ...n };
  await V(r, t ? `/api/v1/rooms/${encodeURIComponent(t)}` : "/api/v1/rooms", "POST", e, AbortSignal.timeout(15e3));
  const o = await V(r, "/api/v1/rooms", "GET", void 0, AbortSignal.timeout(15e3));
  if (p.room && b(p.room) === i && c.currentUser.uid === n.uid) {
    const s = pn(o.rooms), a = o.spaces ? hn(o.spaces) : void 0;
    h.rooms = s, a && p.room && b(p.room) === i && c.currentUser.uid === n.uid && (h.spaces = a);
  }
}
async function xa(e) {
  if (e === "main") throw new Error("默认房间不可移除");
  const t = p.room;
  if (!t) throw new Error("未配置");
  const n = b(t);
  await V({ ...t }, `/api/v1/rooms/${encodeURIComponent(e)}`, "DELETE", void 0, AbortSignal.timeout(15e3)), !(!p.room || b(p.room) !== n) && (h.rooms = h.rooms.filter((i) => i.id !== e), h.channel === e && Xi("main"));
}
async function La(e, t) {
  const n = p.room;
  if (!n) throw new Error("未配置");
  const i = b(n);
  await V({ ...n }, t ? `/api/v1/spaces/${encodeURIComponent(t)}` : "/api/v1/spaces", "POST", e, AbortSignal.timeout(15e3)), p.room && b(p.room) === i && await Zi(n);
}
async function Wa(e) {
  if (e === "hub_main") throw new Error("默认空间不可移除");
  const t = p.room;
  if (!t) throw new Error("未配置");
  const n = b(t), i = h.channel;
  await V({ ...t }, `/api/v1/spaces/${encodeURIComponent(e)}`, "DELETE", void 0, AbortSignal.timeout(15e3)), !(!p.room || b(p.room) !== n || c.currentUser.uid !== t.uid) && (await Zi(t), !(!p.room || b(p.room) !== n || c.currentUser.uid !== t.uid) && h.channel === i && !h.rooms.some((r) => r.id === i) && Xi("main"));
}
async function Zi(e) {
  const t = await V({ ...e }, "/api/v1/spaces", "GET", void 0, AbortSignal.timeout(15e3));
  if (!p.room || b(p.room) !== b(e) || c.currentUser.uid !== e.uid) return;
  const n = hn(t.spaces), i = pn(t.rooms);
  h.spaces = n, p.room && b(p.room) === b(e) && c.currentUser.uid === e.uid && (h.rooms = i);
}
let er = "", Oe = "";
const Jn = new Oo({
  active: ue,
  visible: () => c.visible,
  poll: Go,
  started: () => {
    c.connecting = !c.connected, h.syncing = !0;
  },
  idle: () => {
    h.syncing = !1;
  },
  classify: (e, t) => e instanceof Ke && e.status === 404 && (t.channel || "main") !== "main" ? "missing-room" : e instanceof Ke && [401, 403].includes(e.status) ? "auth" : "retry",
  failed: (e, t, n) => {
    e === "missing-room" ? (h.channel = "main", h.status = "房间已移除，正在返回综合讨论") : e === "auth" ? (Oe = "", gn(), h.role = "", c.error = "访问凭证已失效、过期或不属于此房间，请重新导入邀请", c.connected = !1, c.connecting = !1) : n >= 2 && (c.connected = !1, c.connecting = !1, c.error = `${t}失败或超时，记录与待发队列保留，将自动重试。若持续失败，请关闭旧标签页后重试，并检查服务配置。`, h.status = c.error);
  },
  restart: () => ve()
});
function yn() {
  const e = p.room && Re(p.room);
  e && !Jn.stopped && er === b(e) && ue(e) || ve();
}
function tr() {
  Jn.cancel();
}
function ht() {
  ++Dn, tr(), Oe = "", gn(), c.connected = !1, c.connecting = !1, h.role = "";
}
function ve() {
  if (!O.isInstalled("chat")) {
    ht(), c.visible = !1, c.error = "", h.status = "实验性组件默认关闭，请先在商店手动启用";
    return;
  }
  const e = p.room && Re(p.room), t = !!e && Oe === b(e) && c.currentUser.uid === e.uid;
  if (t ? tr() : ht(), !e) {
    h.status = "尚未读取到聊天室配置，请在此窗口设置中检查", c.error = "";
    return;
  }
  if (e.uid !== c.currentUser.uid) {
    c.error = h.status = "邀请 UID 与本机不一致，请重新导入属于本机的邀请";
    return;
  }
  c.transportMode = "relay", bt(Ct(e), e.room, t) && (er = b(e), c.connected || (h.status = "正在同步"), Jn.start(e));
}
async function Go(e, t) {
  const n = we(e), i = e.channel || "main", r = await t.wait(() => co(n)), o = ln(c.currentUser.avatar, Y.avatarUrl), s = c.currentUser.activity || Uo(), a = c.shareActivity !== !1 && s?.title ? `&act_type=${encodeURIComponent(s.type || "")}&act_title=${encodeURIComponent(s.title || "")}&act_url=${encodeURIComponent(s.url || "")}` : "", u = t.visible ? "&wait=6" : "", d = `/api/v1/sync?after=${r}&avatar=${encodeURIComponent(o)}&name=${encodeURIComponent(c.currentUser.name.slice(0, 100))}${a}${u}`;
  t.phase("连接私有服务器");
  const f = await t.wait(() => V(e, d, "GET", void 0, t.signal));
  if (!t.current()) return;
  t.phase("校验同步页");
  let m;
  try {
    m = Bo(f, e.uid, r, Date.now());
  } catch (g) {
    throw t.current() && gn(), g;
  }
  if (t.current() && (t.phase("保存同步记录"), await t.wait(() => lo(n, m.messages, m.next)), !!t.current())) {
    try {
      await t.wait(() => Ki(n, m.messages.filter((g) => g.sender.uid === e.uid).map((g) => g.id), ke));
    } catch {
      t.current() && (j.value = "无法保存消息的发送确认，请检查浏览器存储。");
    }
    if (t.current() && (t.phase("应用同步状态"), !!xo(m, { scope: n, channel: i, cursor: r, now: Date.now() }, t, {
      chat: c,
      service: h,
      authenticated: () => {
        Oe = b(e);
      },
      publish: (g, w, C) => {
        for (const B of [...$t]) {
          if (!C()) return;
          try {
            B(g, w);
          } catch {
            console.warn("[PrivateChat] message listener failed");
          }
        }
      },
      notify: Mo
    }) && t.current()))
      return t.phase("处理待发消息"), Jt.flush(e), { hasMore: m.hasMore };
  }
}
async function Rt(e) {
  const t = p.room && Re(p.room);
  if (!t || !ue(t))
    return j.value = "未配置此房间的私有服务器，未发送", !1;
  e.sender && (e.sender.avatar = ln(c.currentUser.avatar, Y.avatarUrl), c.currentUser.name && (e.sender.name = c.currentUser.name));
  const n = vt(e);
  if (!n || n.type === "system")
    return j.value = "消息格式无效，未发送", !1;
  const i = lt(At(t), n);
  if (i)
    return j.value = i, !1;
  const r = { ...t };
  try {
    return await cn(we(r), [n]), await Gi(we(r), n, [ke]), ue(r) && !c.messages.some((o) => o.id === n.id) && c.messages.push(n), j.value = "", Jt.flush(r), !0;
  } catch {
    return j.value = "消息未能保存到待发队列，请勿刷新，检查存储后重试", !1;
  }
}
let pi = !1;
function Ko() {
  pi || (pi = !0, Ue(() => [O.isInstalled("chat"), JSON.stringify(p.room)], () => {
    const e = p.room;
    h.members = [], h.rooms = [], h.roomsSupported = !1, h.spaces = [], h.spacesSupported = !1, gn(), h.channel = "main", (!e || !O.isInstalled("chat")) && (c.visible = !1, h.members = []), ve();
  }, { immediate: !0, flush: "sync" }), Ue(() => c.visible, (e) => {
    e && yn();
  }), Ue(() => c.currentUser.uid, () => ve()), O.isInstalled("chat") && p.room && ze(we(p.room)).catch(() => {
    j.value = "待发队列读取失败，请关闭旧标签页后重试";
  }));
}
class Ho {
  constructor() {
    Ko();
  }
  connect() {
    yn();
  }
  disconnect() {
    ht();
  }
  resetReconnectAndConnect() {
    ve();
  }
  async retryMessage(t) {
    await Rt(t);
  }
  dispatchOutgoing(t, n) {
    if (!n) {
      Rt(t);
      return;
    }
    Nn(t, n).then(() => {
      ne.fetch("海狸聊天室", `已发送到 ${n.name}`, "服务器已保存，不代表成员已读。");
    }).catch((i) => {
      ne.fetch("海狸聊天室", "分享未确认", i instanceof Error ? i.message : "未确认发送结果，请检查聊天室连接。");
    });
  }
  sendWebsiteShare(t, n) {
    const i = wt(t.url);
    if (!i) {
      ne.fetch("海狸聊天室", "未发送", "只支持分享有效的 HTTP(S) 网站地址。");
      return;
    }
    const r = (t.title || "网站").slice(0, 100), o = {
      id: `msg_${crypto.randomUUID()}`,
      sender: { ...c.currentUser, activity: c.shareActivity ? c.currentUser.activity : void 0 },
      type: "website",
      content: `分享了常用网站：${r}`,
      meta: {
        linkTitle: r,
        linkUrl: i,
        linkIcon: t.icon || "",
        linkNote: (t.note || "").slice(0, 200)
      },
      timestamp: Date.now()
    };
    this.dispatchOutgoing(o, n);
  }
  async sendTextMessage(t, n) {
    const i = t.trim();
    if (!i) return !1;
    const r = {
      id: `msg_${crypto.randomUUID()}`,
      sender: { ...c.currentUser, activity: c.shareActivity ? c.currentUser.activity : void 0 },
      type: "text",
      content: i,
      timestamp: Date.now()
    };
    if (!n) return Rt(r);
    try {
      return await Nn(r, n), !0;
    } catch (o) {
      return ne.fetch("海狸聊天室", "分享未确认", o instanceof Error ? o.message : "未确认发送结果，请检查聊天室连接。"), !1;
    }
  }
  sendMusicShare(t, n) {
    const i = {
      id: `msg_${crypto.randomUUID()}`,
      sender: { ...c.currentUser, activity: c.shareActivity ? c.currentUser.activity : void 0 },
      type: "music",
      content: `正在听：${t.musicTitle} - ${t.musicArtist}`,
      meta: t,
      timestamp: Date.now()
    };
    this.dispatchOutgoing(i, n);
  }
  sendBiliShare(t, n) {
    const i = {
      bvid: t.bvid || (t.aid ? `av${t.aid}` : ""),
      aid: t.aid,
      videoTitle: t.title,
      videoCover: t.cover,
      upName: t.upName || "UP主",
      upMid: t.upMid,
      upFace: t.upFace,
      upFans: t.upFans,
      playCount: t.play,
      likeCount: t.like,
      danmakuCount: t.danmaku,
      isHot: !0
    }, r = {
      id: `msg_${crypto.randomUUID()}`,
      sender: { ...c.currentUser, activity: c.shareActivity ? c.currentUser.activity : void 0 },
      type: "bilibili",
      content: `分享了B站视频：${t.title}`,
      meta: i,
      timestamp: Date.now()
    };
    this.dispatchOutgoing(r, n);
  }
  sendGitHubShare(t, n) {
    const i = {
      repoFullName: t.fullName,
      repoName: t.name || t.fullName.split("/")[1] || t.fullName,
      repoOwner: t.owner || t.fullName.split("/")[0] || "",
      repoOwnerAvatar: t.ownerAvatar,
      repoDesc: t.desc || "暂无描述",
      repoLanguage: t.language || "Plain Text",
      repoStars: t.stars || 0,
      repoCategory: t.category || "未分类",
      repoUrl: t.url || `https://github.com/${t.fullName}`,
      repoUpdatedAt: t.updatedAt || (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
    }, r = {
      id: `msg_${crypto.randomUUID()}`,
      sender: { ...c.currentUser, activity: c.shareActivity ? c.currentUser.activity : void 0 },
      type: "github",
      content: `分享了GitHub仓库：${t.fullName}`,
      meta: i,
      timestamp: Date.now()
    };
    this.dispatchOutgoing(r, n);
  }
  sendBiliSeriesShare(t, n) {
    const i = {
      seriesId: t.id,
      seriesName: t.name,
      seriesCount: t.count,
      seriesItems: t.items.map((o) => ({
        id: o.id,
        aid: o.aid,
        bvid: o.bvid,
        title: o.title,
        cover: o.cover,
        author: o.author,
        duration: o.duration != null ? String(o.duration) : void 0
      }))
    }, r = {
      id: `msg_${crypto.randomUUID()}`,
      sender: { ...c.currentUser, activity: c.shareActivity ? c.currentUser.activity : void 0 },
      type: "bili_series",
      content: `分享了B站电台系列：${t.name} (${t.count}首)`,
      meta: i,
      timestamp: Date.now()
    };
    this.dispatchOutgoing(r, n);
  }
  async sendImageMessage(t) {
    if (!t) return !1;
    const n = {
      id: `msg_${crypto.randomUUID()}`,
      sender: { ...c.currentUser, activity: c.shareActivity ? c.currentUser.activity : void 0 },
      type: "image",
      content: "[图片]",
      meta: {
        imageUrl: t
      },
      timestamp: Date.now()
    };
    return Rt(n);
  }
  sendAiHotShare(t, n) {
    const i = {
      aihotTitle: t.title,
      aihotSummary: t.summary,
      aihotSource: t.sourceName || "AI资讯",
      aihotCategory: t.category || "AI HOT",
      aihotUrl: t.url,
      aihotDate: t.published
    }, r = {
      id: `msg_${crypto.randomUUID()}`,
      sender: { ...c.currentUser, activity: c.shareActivity ? c.currentUser.activity : void 0 },
      type: "aihot",
      content: `分享了AI热点：${t.title}`,
      meta: i,
      timestamp: Date.now()
    };
    this.dispatchOutgoing(r, n);
  }
  sendYouTubeShare(t, n) {
    const i = {
      youtubeId: t.id,
      youtubeTitle: t.title,
      youtubeCover: t.cover,
      youtubeAuthor: t.author || "YouTube",
      youtubeViews: t.views,
      youtubeUrl: t.url || `https://www.youtube.com/watch?v=${t.id}`
    }, r = {
      id: `msg_${crypto.randomUUID()}`,
      sender: { ...c.currentUser, activity: c.shareActivity ? c.currentUser.activity : void 0 },
      type: "youtube",
      content: `分享了YouTube视频：${t.title}`,
      meta: i,
      timestamp: Date.now()
    };
    this.dispatchOutgoing(r, n);
  }
  sendActivity(t) {
  }
  sendFriendRequest(t, n) {
    !t.uid || t.uid === c.currentUser.uid || Vo(t.uid).then(() => {
      ne.fetch("海狸聊天室", `已向【${t.name}】发送好友申请`, "对方可在聊天室右上角通知中确认。");
    }).catch((i) => {
      ne.fetch("海狸聊天室", "好友申请未发送", i instanceof Error ? i.message : "请检查聊天室连接。");
    });
  }
  respondFriendRequest(t, n) {
    t.id && qo(t.id, n).then(() => {
      ne.fetch("海狸聊天室", n ? `已通过【${t.from.name}】的好友申请` : "已忽略该申请", n ? "双方已成为好友，可随时点击私聊。" : "");
    }).catch((i) => {
      ne.fetch("海狸聊天室", "操作未完成", i instanceof Error ? i.message : "请检查网络。");
    });
  }
}
const nr = new Ho(), $a = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  chatService: nr
}, Symbol.toStringTag, { value: "Module" })), Jo = {
  schemaVersion: 1,
  id: "chat",
  title: "海狸聊天室",
  emoji: "💬",
  rootId: "vue-chat-dialog-root",
  settingsKeys: ["lw_chat_server_url"],
  capabilities: ["chat:message-read", "chat:message-send"],
  badgeCount: () => c.unreadCount,
  loadView: () => import("./ChatDialog-Bncdqv4S.js").then((e) => e.default),
  lifecycle: {
    isVisible: () => c.visible,
    canOpen: () => O.isInstalled("chat"),
    open: () => {
      O.isInstalled("chat") && (c.visible = !0, c.unreadCount = 0, Eo.value && nr.connect());
    },
    hide: () => {
      c.visible = !1;
    },
    canUnmount: () => !0
  }
}, Ot = Q({
  visible: !1,
  pendingWrites: 0
}), zo = "logicweaver_prompt_backpack_v1", Yo = "logicweaver_prompt_backpack_categories_v1", ja = "logicweaver_saved_articles_v1", Fa = "logicweaver_saved_article_categories_v1", Va = [
  { id: "all", name: "全部", icon: "🎒", isBuiltin: !0 },
  { id: "starred", name: "星标置顶", icon: "⭐", isBuiltin: !0 },
  { id: "default", name: "默认分组", icon: "📁", isBuiltin: !1 }
], qa = [
  { id: "all", name: "全部", icon: "📑", isBuiltin: !0 },
  { id: "starred", name: "星标置顶", icon: "⭐", isBuiltin: !0 },
  { id: "default", name: "默认分组", icon: "📁", isBuiltin: !1 }
], Qo = {
  schemaVersion: 1,
  id: "backpack",
  title: "提示词背包",
  emoji: "🎒",
  rootId: "vue-backpack-dialog-root",
  settingsKeys: [zo, Yo],
  capabilities: ["prompt:read", "prompt:write", "prompt:clipboard"],
  loadView: () => import("./BackpackDialog-DZe7EZGF.js").then((e) => e.default),
  lifecycle: {
    isVisible: () => Ot.visible,
    canOpen: () => O.isInstalled("backpack"),
    open: () => {
      O.isInstalled("backpack") && (Ot.visible = !0);
    },
    hide: () => {
      Ot.visible = !1;
    },
    canUnmount: () => Ot.pendingWrites === 0
  }
};
function Xo(e) {
  return e.filter((t) => t.appType === "ai-workspace" && !t.read).length;
}
function Ga(e, t, n = Date.now()) {
  const i = new Set(ai(e).items.map((r) => r.id));
  return ai(t).items.filter((r) => r.appType === "ai-workspace" && !r.read && !i.has(r.id) && n - r.createdAt <= 6e4);
}
const Zo = {
  schemaVersion: 1,
  id: "multica",
  title: "AI 工作区",
  icon: "assets/nav-multica.png",
  emoji: "🤖",
  presentation: "card",
  rootId: "multica",
  settingsKeys: [],
  capabilities: ["workspace:fullscreen", "multica:tasks", "multica:runtimes"],
  badgeCount: () => Xo(Mr.items),
  loadView: () => import("./MulticaDialog-D9B6CCiy.js").then((e) => e.default),
  lifecycle: {
    isVisible: () => le.activeId === "multica",
    canOpen: () => O.isInstalled("multica"),
    open: () => {
      O.isInstalled("multica") && tn("multica");
    },
    hide: () => yt("multica")
  }
};
try {
  jr();
} catch (e) {
  console.warn("旧 YouTube 数据清理失败", e);
}
fe(Jo);
fe(Qo);
fe(Zo);
fe(Yr);
fe(Gr);
fe(Jr);
fe(qr);
fe(Fr);
fe(Vr);
function es(e) {
  const t = e.map((n) => ({ ...n }));
  for (const n of Ci()) {
    if (n.presentation !== "card" || n.showInDock === !1) continue;
    if (t.some((o) => o.id === n.id)) throw new Error("Duplicate workspace card entry");
    const i = { id: n.id, title: n.title, icon: n.icon }, r = n.dockBefore ? t.findIndex((o) => o.id === n.dockBefore) : -1;
    t.splice(r < 0 ? t.length : r, 0, i);
  }
  return t;
}
function ts(e) {
  const t = e.map((n) => ({ ...n }));
  for (const n of Ci()) {
    if (n.showInDock === !1 || n.presentation === "card") continue;
    if (t.some((o) => o.id === n.id)) throw new Error("Dock module duplicated in legacy tools");
    const i = { id: n.id, title: n.title, icon: n.icon, emoji: n.emoji }, r = n.dockBefore ? t.findIndex((o) => o.id === n.dockBefore) : -1;
    t.splice(r < 0 ? t.length : r, 0, i);
  }
  return t;
}
function ns(e) {
  const t = e.find((n) => n.id === "daily-bilibili");
  return t ? [t, ...e.filter((n) => n !== t)] : [...e];
}
const is = ns(es([])), rs = ts([]), ir = "logicweaver_dock_custom_order", zn = "logicweaver_dock_position";
function Yn(e) {
  return e === "bottom" || e === "left" || e === "right" || e === "top";
}
function os() {
  try {
    if (typeof localStorage < "u") {
      const e = localStorage.getItem(zn);
      if (Yn(e)) return e;
    }
  } catch {
  }
  return "bottom";
}
function ss(e) {
  try {
    typeof localStorage < "u" && localStorage.setItem(zn, e);
  } catch {
  }
}
function zt() {
  try {
    if (typeof localStorage < "u") {
      const e = localStorage.getItem(ir);
      if (e) return JSON.parse(e) || {};
    }
  } catch {
  }
  return {};
}
function hi(e) {
  try {
    typeof localStorage < "u" && localStorage.setItem(ir, JSON.stringify(e));
  } catch {
  }
}
function rr() {
  const e = rs.filter((n) => !(n.id === "backpack" && O.isInstalled("multica")) && O.isInstalled(n.id)), t = zt().tools;
  if (Array.isArray(t) && t.length > 0) {
    const n = new Map(e.map((r) => [r.id, r])), i = [];
    for (const r of t) {
      const o = n.get(r);
      o && (i.push(o), n.delete(r));
    }
    for (const r of n.values())
      i.push(r);
    return i;
  }
  return e;
}
function or() {
  const e = is.filter((n) => O.isInstalled(n.id)), t = zt().cards;
  if (Array.isArray(t) && t.length > 0) {
    const n = new Map(e.map((r) => [r.id, r])), i = [];
    for (const r of t) {
      const o = n.get(r);
      o && (i.push(o), n.delete(r));
    }
    for (const r of n.values())
      i.push(r);
    return i;
  }
  return e;
}
const as = () => ({
  mounted: !1,
  get activeTargetId() {
    return Ii() || le.activeId || "";
  },
  activeTools: [],
  cards: or(),
  tools: rr(),
  position: os()
}), M = Q(as());
typeof window < "u" && (window.addEventListener("logicweaver:dock-modules-changed", () => {
  M.tools = rr(), M.cards = or();
}), window.addEventListener("storage", (e) => {
  e.key === zn && Yn(e.newValue) && (M.position = e.newValue);
}));
en.onStateChange((e) => {
  M.activeTools = [...e];
});
let me = {};
function Nt(e, t) {
  const n = window.chrome, i = n?.runtime?.getURL ? n.runtime.getURL(t) : t, r = e.includes("newtab") || t.includes("newtab");
  if (window.location.href.includes(e) || r && (window.location.pathname.endsWith("/newtab.html") || window.location.pathname === "/newtab.html"))
    return;
  const o = (a) => {
    const d = (a.url || a.pendingUrl || "").toLowerCase();
    return r ? d.includes("newtab.html") || d.startsWith("chrome://newtab") || d.startsWith("edge://newtab") || d.startsWith("chrome-search://local-ntp") || d.includes("chrome-extension://") && d.includes("newtab") || !!(a.title && (a.title.includes("LogicWeaver 新标签页") || a.title === "新标签页" || a.title === "New Tab")) : d.includes(e.toLowerCase());
  };
  if (n?.tabs?.query) {
    n.tabs.query({ currentWindow: !0 }, (a) => {
      const u = a.find(o);
      if (u && u.id != null) {
        if (n.tabs.update(u.id, { active: !0 }), u.windowId != null && n.windows?.update)
          try {
            n.windows.update(u.windowId, { focused: !0 });
          } catch {
          }
      } else
        n.tabs.create({ url: i });
    });
    return;
  }
  const s = document.createElement("a");
  s.href = i, s.target = "_blank", s.rel = "noreferrer", document.body.appendChild(s), s.click(), s.remove();
}
const Ka = {
  getSnapshot() {
    return nn(M);
  },
  update(e) {
    const { activeTargetId: t, ...n } = e;
    Object.assign(M, n);
  },
  setMounted(e) {
    M.mounted = e;
  },
  setActiveTools(e) {
    M.activeTools = [...e];
  },
  addActiveTool(e) {
    M.activeTools.includes(e) || M.activeTools.push(e);
  },
  removeActiveTool(e) {
    const t = M.activeTools.indexOf(e);
    t >= 0 && M.activeTools.splice(t, 1);
  },
  triggerItem(e, t) {
    const n = typeof window < "u" ? window.location.pathname + window.location.href : "", i = n.includes("bilibili.html") || n.includes("github.html") || n.includes("aihot.html");
    if (e === "home") {
      if (i) {
        Nt("newtab.html", "newtab.html");
        return;
      }
      if (me.onHomeClick) {
        me.onHomeClick();
        return;
      }
      const r = document.getElementById("daily-toggle");
      r && r.classList.contains("active") && r.classList.remove("active");
      const o = le.activeId;
      o && yt(o), Sr(le.activeId), typeof window < "u" && window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      return;
    }
    if (e === "target") {
      const r = {
        "daily-bilibili": "bilibili.html",
        "card-github": "github.html",
        "daily-aihot": "aihot.html"
      };
      if (i) {
        const s = r[t];
        s ? Nt(s, s) : Nt("newtab.html", "newtab.html");
        return;
      }
      if (me.onTargetClick) {
        me.onTargetClick(t);
        return;
      }
      const o = window;
      M.activeTargetId === t ? typeof o.exitFullscreenCard == "function" && o.exitFullscreenCard() : typeof o.enterFullscreenCard == "function" && o.enterFullscreenCard(t);
      return;
    }
    if (e === "tool") {
      const r = !!document.getElementById("vue-bili-companions-root");
      if (i && !r) {
        Nt("newtab.html", "newtab.html");
        return;
      }
      if (!["todoist", "music", "siren", "wallpaper", "stickers", "sync", "chat", "backpack", "multica"].includes(t) && typeof window < "u") {
        const s = window;
        typeof s.exitFullscreenCard == "function" && s.exitFullscreenCard();
      }
      if (me.onToolClick) {
        me.onToolClick(t);
        return;
      }
      en.toggle(t);
      return;
    }
  },
  reorderCards(e) {
    const t = new Map(M.cards.map((r) => [r.id, r])), n = [];
    for (const r of e) {
      const o = t.get(r);
      o && (n.push(o), t.delete(r));
    }
    for (const r of t.values()) n.push(r);
    M.cards = n;
    const i = zt();
    hi({ ...i, cards: n.map((r) => r.id) });
  },
  reorderTools(e) {
    const t = new Map(M.tools.map((r) => [r.id, r])), n = [];
    for (const r of e) {
      const o = t.get(r);
      o && (n.push(o), t.delete(r));
    }
    for (const r of t.values()) n.push(r);
    M.tools = n;
    const i = zt();
    hi({ ...i, tools: n.map((r) => r.id) });
  },
  setPosition(e) {
    Yn(e) && M.position !== e && (M.position = e, ss(e), typeof window < "u" && window.dispatchEvent(new CustomEvent("logicweaver:dock-position-changed", { detail: e })));
  },
  setActions(e) {
    me = { ...me, ...e };
  }
}, sr = "active_wallpaper", Qn = "_manifest.json";
function ar() {
  return typeof navigator < "u" && typeof navigator.storage?.getDirectory == "function";
}
async function cs(e) {
  const t = [];
  for await (const [n, i] of e.entries())
    t.push(e.removeEntry(n, { recursive: i.kind === "directory" }));
  await Promise.all(t);
}
async function ls(e, t) {
  let n = e;
  for (const i of t)
    !i || i === "." || (n = await n.getDirectoryHandle(i, { create: !0 }));
  return n;
}
async function us(e) {
  if (!ar()) return !1;
  try {
    const n = await (await navigator.storage.getDirectory()).getDirectoryHandle(sr, { create: !0 });
    await cs(n);
    const r = await (await n.getFileHandle(Qn, { create: !0 })).createWritable(), o = {
      type: e.type,
      entry: e.entry || "",
      name: e.name || "Active Wallpaper",
      properties: e.properties || {},
      updatedAt: Date.now(),
      fileCount: e.files.length
    };
    await r.write(JSON.stringify(o)), await r.close();
    for (const s of e.files) {
      const a = String(s.path || "").replace(/\\/g, "/").replace(/^\/+/, "");
      if (!a) continue;
      const u = a.split("/"), d = u.pop(), g = await (await (await ls(n, u)).getFileHandle(d, { create: !0 })).createWritable();
      await g.write(s.file), await g.close();
    }
    return !0;
  } catch (t) {
    return console.warn("[OPFS Wallpaper] 写入活跃壁纸失败，回退至 IndexedDB:", t), !1;
  }
}
async function cr(e, t = "") {
  const n = [];
  for await (const [i, r] of e.entries()) {
    if (i === Qn) continue;
    const o = t ? `${t}/${i}` : i;
    if (r.kind === "file") {
      const s = await r.getFile();
      n.push({
        path: o,
        file: s,
        mime: s.type || void 0
      });
    } else if (r.kind === "directory") {
      const s = await cr(r, o);
      n.push(...s);
    }
  }
  return n;
}
async function gi() {
  if (!ar()) return null;
  try {
    const e = await navigator.storage.getDirectory();
    let t;
    try {
      t = await e.getDirectoryHandle(sr, { create: !1 });
    } catch {
      return null;
    }
    let n;
    try {
      n = await t.getFileHandle(Qn, { create: !1 });
    } catch {
      return null;
    }
    const r = await (await n.getFile()).text(), o = JSON.parse(r), s = await cr(t);
    return !s.length && o.type !== "image" ? null : {
      type: o.type || "web",
      entry: o.entry || "",
      name: o.name || "Active Wallpaper",
      properties: o.properties || {},
      updatedAt: o.updatedAt || 0,
      files: s
    };
  } catch (e) {
    return console.warn("[OPFS Wallpaper] 读取活跃壁纸失败:", e), null;
  }
}
function Dt(e) {
  (!Number.isFinite(e) || e < 0) && (e = 0);
  const t = Math.floor(e / 60), n = Math.floor(e % 60);
  return String(t).padStart(2, "0") + ":" + String(n).padStart(2, "0");
}
const Bt = typeof localStorage < "u" ? localStorage.getItem("bili_radio_mode") : null, ds = () => ({
  active: !1,
  loading: !1,
  playing: !1,
  mode: Bt === "order" || Bt === "one" || Bt === "shuffle" ? Bt : "order",
  title: "B站电台",
  coverUrl: "",
  seriesName: "SoundTrack",
  trackIndex: 1,
  totalTracks: 1,
  currentTime: 0,
  duration: 0,
  formattedCurrent: "00:00",
  formattedDuration: "00:00",
  progressPercent: 0,
  lyric: "B站电台 · 点击磁带或下方队列开始播放"
}), A = Q(ds()), lr = {
  getSnapshot() {
    return nn(A);
  },
  update(e) {
    for (const t of Object.keys(e))
      A[t] !== e[t] && (A[t] = e[t]);
    if (typeof e.currentTime == "number" || typeof e.duration == "number") {
      const t = e.currentTime ?? A.currentTime, n = e.duration ?? A.duration, i = Dt(t), r = Dt(n);
      if (A.formattedCurrent !== i && (A.formattedCurrent = i), A.formattedDuration !== r && (A.formattedDuration = r), n > 0) {
        const o = Math.round(Math.min(100, Math.max(0, t / n * 100)) * 10) / 10;
        Math.abs(A.progressPercent - o) >= 0.2 && (A.progressPercent = o);
      } else
        A.progressPercent = 0;
    }
  },
  setProgress(e, t) {
    A.currentTime = e, A.duration = t;
    const n = Dt(e), i = Dt(t);
    if (A.formattedCurrent !== n && (A.formattedCurrent = n), A.formattedDuration !== i && (A.formattedDuration = i), t > 0) {
      const r = Math.round(Math.min(100, Math.max(0, e / t * 100)) * 10) / 10;
      Math.abs(A.progressPercent - r) >= 0.2 && (A.progressPercent = r);
    } else
      A.progressPercent = 0;
  },
  togglePlay() {
    const e = window.LogicWeaverBiliRadioPlayer;
    if (e) {
      const t = typeof e.getState == "function" ? e.getState() : null;
      if (!t?.active && !t?.playing && typeof window.playBiliRadioQueue == "function") {
        window.playBiliRadioQueue(0);
        return;
      }
      if (typeof e.toggle == "function") {
        e.toggle();
        return;
      }
    }
    window.dispatchEvent(new CustomEvent("logicweaver:bili-radio-toggle"));
  },
  toggleMode() {
    const e = A.mode || "order", n = {
      order: "one",
      one: "shuffle",
      shuffle: "order"
    }[e] || "order";
    A.mode = n;
    try {
      localStorage.setItem("bili_radio_mode", n);
    } catch {
    }
  },
  seek(e) {
    const t = window.LogicWeaverBiliRadioPlayer;
    if (typeof t?.seek == "function") {
      t.seek(e);
      return;
    }
    window.dispatchEvent(new CustomEvent("logicweaver:bili-radio-seek", { detail: { percent: e } }));
  },
  prev() {
    if (typeof window.LogicWeaverBiliRadioPlayer?.prev == "function") {
      window.LogicWeaverBiliRadioPlayer.prev();
      return;
    }
    window.dispatchEvent(new CustomEvent("logicweaver:bili-radio-prev"));
  },
  next() {
    if (typeof window.LogicWeaverBiliRadioPlayer?.next == "function") {
      window.LogicWeaverBiliRadioPlayer.next();
      return;
    }
    window.dispatchEvent(new CustomEvent("logicweaver:bili-radio-next"));
  },
  insertAndPlay(e) {
    const t = window.LogicWeaverBiliRadioPlayer;
    if (t && typeof t.playQueue == "function") {
      t.playQueue({
        name: "📼 装填卡带",
        items: [{
          bvid: e.bvid,
          title: e.title,
          cover: e.cover,
          author: e.author,
          duration: e.duration
        }],
        startIndex: 0
      });
      return;
    }
    window.dispatchEvent(new CustomEvent("logicweaver:bili-radio-insert", { detail: e }));
  }
};
typeof window < "u" && (window.LogicWeaverBiliRadioTape = lr);
let S = null, K = !1, Yt = !1, st = "B站电台", T = [], R = -1, D = null, Bn, ur = {}, Ze = 0, de = "", jt = null, dr = [], Ft = /* @__PURE__ */ new Set(), Fe = null, Vt = 0, rt = Date.now(), En = 0;
function Xn() {
  jt !== null && (clearInterval(jt), jt = null);
}
function fr(e) {
  const t = S;
  if (!t || !K || !D) return;
  const n = dr.find((i) => !Ft.has(i) && /^https?:\/\//i.test(i));
  if (!n || Ft.size >= 3) {
    Xn(), de = "音频连接中断，已尝试所有备用线路", F();
    return;
  }
  Ft.add(n), Fe = {
    time: Number.isFinite(t.currentTime) ? t.currentTime : 0,
    paused: t.paused
  }, de = "网络波动，正在切换备用线路…", F(), t.src = n, t.load(), Fe.paused || t.play().catch(() => {
  });
}
function fs() {
  Xn(), rt = Date.now(), Vt = S?.currentTime || 0, En = S?.buffered.length ? S.buffered.end(S.buffered.length - 1) : 0, jt = setInterval(() => {
    const e = S;
    if (!e || !K || e.paused || e.ended) {
      rt = Date.now();
      return;
    }
    const t = e.currentTime, n = e.buffered.length ? e.buffered.end(e.buffered.length - 1) : 0;
    if (t !== Vt || n > En) {
      rt = Date.now(), Vt = t, En = n, de === "网络波动，正在切换备用线路…" && (de = "", F());
      return;
    }
    Date.now() - rt >= 8e3 && e.readyState < 3 && fr();
  }, 1e3);
}
function ms() {
  S && (rt = Date.now(), Vt = S.currentTime, de === "网络波动，正在切换备用线路…" && (de = "")), F();
}
function ps() {
  const e = S;
  if (e && Fe) {
    const t = Fe;
    if (Fe = null, t.time > 0 && t.time < (e.duration || 1 / 0))
      try {
        e.currentTime = t.time;
      } catch {
      }
    t.paused || e.play().catch(() => {
    });
  }
  F();
}
function hs() {
  K && S?.error && fr(`音频解码或网络错误 [代码: ${S.error.code}]`);
}
function je() {
  return S || (S = new Audio(), S.id = "bili-radio-audio", S.preload = "auto", S.addEventListener("ended", gs), S.addEventListener("timeupdate", ms), S.addEventListener("play", F), S.addEventListener("pause", F), S.addEventListener("loadedmetadata", ps), S.addEventListener("error", hs), S);
}
function gs() {
  const e = A.mode || "order";
  if (e === "one")
    S && (S.currentTime = 0, S.play().catch(() => {
    }), F());
  else if (e === "shuffle")
    if (T.length <= 1)
      Z(0);
    else {
      let t = Math.floor(Math.random() * T.length);
      t === R && T.length > 1 && (t = (R + 1) % T.length), Z(t);
    }
  else
    Z(R + 1);
}
function F() {
  const e = S, t = !!(e && !e.paused && !e.ended && K), n = e?.duration && Number.isFinite(e.duration) ? e.duration : D?.duration || 0, i = D?.cues?.find((o) => (e?.currentTime || 0) >= o.from && (e?.currentTime || 0) < o.to), r = de || i?.content || (t ? "♪ 伴奏播放中…" : D ? `已暂停 · 《${D.title}》` : "点击磁带继续播放");
  lr.update({
    active: K,
    loading: Yt,
    playing: t,
    title: D?.title || "B站电台",
    coverUrl: D?.cover || "",
    seriesName: st,
    trackIndex: R >= 0 ? R + 1 : 1,
    totalTracks: T.length || 1,
    currentTime: e?.currentTime || 0,
    duration: n,
    lyric: r
  }), K && D && Ui.syncFromBiliRadio({
    playing: t,
    title: D.title || "B站电台",
    artist: D.upper || D.author || st || "哔哩哔哩电台",
    coverUrl: D.cover || "",
    currentTime: e?.currentTime || 0,
    duration: n,
    lyric: r,
    seriesName: st
  });
}
async function ys(e) {
  if (e.streamUrl || e.url) return e;
  const t = await In.getVideoView(e.bvid);
  if (!t?.cid) throw new Error("视频信息不可用");
  const n = await In.fetchAudioStream(e.bvid, t.cid);
  if (!n.sources.length) throw new Error("没有取得视频播放地址");
  return {
    ...e,
    title: t.title || e.title,
    cover: String(t.pic || e.cover || "").replace(/^http:/, "https:"),
    upper: t.owner?.name || e.upper || e.author || "Bilibili",
    duration: Number(t.duration || e.duration || 0),
    cid: t.cid,
    streamUrl: n.sources[0],
    streamUrls: n.sources
  };
}
async function Z(e) {
  const t = ur;
  if (!T.length || t.isCurrent?.() === !1) return;
  const n = ++Ze;
  R = (e % T.length + T.length) % T.length, Yt = !0, K = !0, de = "", Xn(), Fe = null, je().pause(), F();
  try {
    const i = Bn ? await Bn(T[R]) : await ys(T[R]);
    if (n !== Ze || t.isCurrent?.() === !1) return;
    D = i;
    const r = i.streamUrls?.length ? i.streamUrls : i.streamUrl || i.url ? [i.streamUrl || i.url] : [], o = r[0];
    if (!o) throw new Error("没有取得视频播放地址");
    dr = r, Ft = /* @__PURE__ */ new Set([o]), je().src = o, fs(), t.onReady?.(je()), t.autoplay !== !1 && je().play().catch((s) => console.warn("[BiliRadio] 播放失败", s)), i.bvid && !i.cues?.length && In.fetchVideoSubtitleDetails(i.bvid, i.cid).then((s) => {
      n === Ze && s.ok && D && (D.cues = s.cues);
    }).catch(() => {
    });
  } catch (i) {
    if (n !== Ze || t.isCurrent?.() === !1) return;
    K = !1, console.warn("[BiliRadio] 解析音轨失败", i), de = i instanceof Error ? i.message : "播放失败";
  } finally {
    n === Ze && (Yt = !1, t.isCurrent?.() === !1 && (K = !1), F());
  }
}
const Zn = {
  playQueue(e) {
    st = e.name || "B站电台", T = Array.isArray(e.items) ? e.items.map((t) => ({ ...t })) : [], Bn = e.resolveTrack, ur = { isCurrent: e.isCurrent, autoplay: e.autoplay, onReady: e.onReady }, Z(e.startIndex || 0);
  },
  playAt(e) {
    T.length && Z(e);
  },
  next() {
    if ((A.mode || "order") === "shuffle" && T.length > 1) {
      let t = Math.floor(Math.random() * T.length);
      t === R && (t = (R + 1) % T.length), Z(t);
    } else
      Z(R + 1);
  },
  prev() {
    if ((A.mode || "order") === "shuffle" && T.length > 1) {
      let t = Math.floor(Math.random() * T.length);
      t === R && (t = ((R - 1) % T.length + T.length) % T.length), Z(t);
    } else
      Z(R - 1);
  },
  toggle() {
    const e = je();
    if (!K && !e.src) {
      T.length > 0 && Z(R >= 0 ? R : 0);
      return;
    }
    e.paused ? e.play().catch(() => {
    }) : e.pause(), F();
  },
  seek(e) {
    const t = je();
    Number.isFinite(t.duration) && t.duration > 0 && (t.currentTime = Math.min(100, Math.max(0, e)) / 100 * t.duration, F());
  },
  getAudioElement() {
    return S;
  },
  getState() {
    return {
      active: K,
      loading: Yt,
      name: st,
      items: T,
      index: R,
      track: D,
      currentTime: S?.currentTime || 0,
      duration: S?.duration || 0,
      playing: !!(S && !S.paused && !S.ended && K)
    };
  },
  syncTape: F
};
typeof window < "u" && (window.LogicWeaverBiliRadioPlayer = Zn);
const xn = 1024, at = xn / 2, xe = 64;
let U = null, re = null, oe = null;
const yi = /* @__PURE__ */ new WeakMap();
let wi = null, W = null, ge = null, gt = !1, Qt = 0, Ve = 0, vi = !1;
const An = new Uint8Array(at), Cn = new Uint8Array(at), _n = new Array(128).fill(0), ct = new Array(128).fill(0), mr = [];
for (let e = 0; e < xe; e++) {
  const t = Math.floor(e + Math.pow(e / xe, 3.2) * (at - xe)), n = Math.min(
    at - 1,
    Math.max(t, Math.floor(e + 1 + Math.pow((e + 1) / xe, 3.2) * (at - xe) - 1))
  );
  mr.push([t, n]);
}
function ws() {
  if (U && re && oe) return !0;
  try {
    const e = window.AudioContext || window.webkitAudioContext;
    if (!e) return !1;
    U = new e();
    const t = U.createChannelSplitter(2);
    return re = U.createAnalyser(), re.fftSize = xn, re.smoothingTimeConstant = 0.82, oe = U.createAnalyser(), oe.fftSize = xn, oe.smoothingTimeConstant = 0.82, t.connect(re, 0), t.connect(oe, 1), !0;
  } catch (e) {
    return console.warn("[WE AudioVisualizer] AudioContext init failed:", e), !1;
  }
}
function vs(e) {
  if (!e || !ws() || !U) return !1;
  try {
    let t = yi.get(e);
    if (t || (t = U.createMediaElementSource(e), yi.set(e, t)), wi !== e) {
      if (re && oe) {
        try {
          t.disconnect();
        } catch {
        }
        t.connect(re), t.connect(oe);
      }
      t.connect(U.destination), wi = e;
    }
    return !0;
  } catch {
    return !1;
  }
}
function pr() {
  const e = k.getAudioElement(), t = Zn.getAudioElement();
  return t && !t.paused && !t.ended && t.currentTime > 0 ? t : e && !e.paused && !e.ended && e.currentTime > 0 ? e : null;
}
function bs() {
  const e = pr();
  return e && vs(e), e;
}
function Xt(e) {
  if (!gt || !ge) return;
  if (e - Qt < 33) {
    W = requestAnimationFrame(Xt);
    return;
  }
  Qt = e;
  const t = bs();
  if (!t || t.paused || t.ended) {
    try {
      ge.postMessage({
        type: "WE_AUDIO_DATA",
        audio: ct
      }, "*");
    } catch {
    }
    U && U.state === "running" && U.suspend().catch(() => {
    }), W !== null && (typeof cancelAnimationFrame == "function" && cancelAnimationFrame(W), W = null);
    return;
  }
  U && U.state === "suspended" && U.resume().catch(() => {
  });
  let n = !1;
  if (re && oe) {
    re.getByteFrequencyData(An), oe.getByteFrequencyData(Cn);
    for (let i = 0; i < xe; i++) {
      const [r, o] = mr[i];
      let s = 0, a = 0;
      for (let f = r; f <= o; f++)
        An[f] > s && (s = An[f]), Cn[f] > a && (a = Cn[f]);
      const u = s / 255, d = a / 255;
      _n[i] = u, _n[i + 64] = d, (u > 0.015 || d > 0.015) && (n = !0);
    }
  }
  if (n)
    Ve = 0;
  else if (Ve++, Ve >= 30) {
    try {
      ge.postMessage({
        type: "WE_AUDIO_DATA",
        audio: ct
      }, "*");
    } catch {
    }
    U && U.state === "running" && U.suspend().catch(() => {
    }), W !== null && (typeof cancelAnimationFrame == "function" && cancelAnimationFrame(W), W = null);
    return;
  }
  try {
    ge.postMessage({
      type: "WE_AUDIO_DATA",
      audio: n ? _n : ct
    }, "*");
  } catch {
  }
  W = requestAnimationFrame(Xt);
}
function xt() {
  gt && W === null && (Ve = 0, Qt = 0, W = requestAnimationFrame(Xt));
}
function Ss() {
  if (vi) return;
  vi = !0;
  const e = k.getAudioElement(), t = Zn.getAudioElement();
  e && (e.addEventListener("play", xt), e.addEventListener("playing", xt)), t && (t.addEventListener("play", xt), t.addEventListener("playing", xt));
}
function hr(e) {
  if (ge = e, Ss(), gt) return;
  if (gt = !0, Qt = 0, Ve = 0, pr())
    W = requestAnimationFrame(Xt);
  else
    try {
      ge.postMessage({
        type: "WE_AUDIO_DATA",
        audio: ct
      }, "*");
    } catch {
    }
}
function wn() {
  if (gt = !1, Ve = 0, W !== null && (typeof cancelAnimationFrame == "function" && cancelAnimationFrame(W), clearTimeout(W), W = null), U && U.state === "running" && U.suspend().catch(() => {
  }), ge)
    try {
      ge.postMessage({
        type: "WE_AUDIO_DATA",
        audio: ct
      }, "*");
    } catch {
    }
}
const Es = "leaf-newtab-backgrounds", As = 1, Me = "current-background", L = "heroBackgroundHistory", bi = 30, Lt = "assets/newtab-mountains.png", Si = 450, Tn = 180 * 1024 * 1024;
let Ln = [], et = 0, qt = null, tt = null, Zt = null;
function Ei(e) {
  return Ln.push(e), e;
}
function gr() {
  if (qt) {
    try {
      qt();
    } catch {
    }
    qt = null;
  }
}
function Cs(e) {
  gr();
  let t = null, n = 0, i = 0, r = 0, o = -1, s = -1;
  const a = () => {
    if (t = null, n = performance.now(), i !== o || r !== s) {
      o = i, s = r;
      try {
        e.postMessage({
          type: "WE_MOUSE_MOVE",
          x: i,
          y: r
        }, "*");
      } catch {
      }
    }
  }, u = (w) => {
    i = w.clientX, r = w.clientY;
    const C = performance.now();
    C - n >= 33 ? (t && (clearTimeout(t), t = null), a()) : t || (t = setTimeout(a, 33 - (C - n)));
  }, d = (w) => {
    try {
      e.postMessage({
        type: "WE_MOUSE_DOWN",
        x: w.clientX,
        y: w.clientY
      }, "*"), e.postMessage({ type: "WE_USER_GESTURE_UNLOCK" }, "*");
    } catch {
    }
  }, f = (w) => {
    try {
      e.postMessage({
        type: "WE_MOUSE_UP",
        x: w.clientX,
        y: w.clientY
      }, "*");
    } catch {
    }
  }, m = () => {
    try {
      e.postMessage({ type: "WE_USER_GESTURE_UNLOCK" }, "*");
    } catch {
    }
  }, g = () => {
    const w = document.hidden;
    try {
      e.postMessage({
        type: "WE_SET_PAUSED",
        isPaused: w
      }, "*");
    } catch {
    }
    w ? wn() : hr(e);
  };
  window.addEventListener("pointermove", u, { passive: !0 }), window.addEventListener("mousedown", d, { passive: !0 }), window.addEventListener("mouseup", f, { passive: !0 }), window.addEventListener("click", m, { passive: !0 }), window.addEventListener("keydown", m, { passive: !0 }), document.addEventListener("visibilitychange", g), qt = () => {
    t && clearTimeout(t), window.removeEventListener("pointermove", u), window.removeEventListener("mousedown", d), window.removeEventListener("mouseup", f), window.removeEventListener("click", m), window.removeEventListener("keydown", m), document.removeEventListener("visibilitychange", g);
  };
}
function _s() {
  wn(), gr(), Ln.forEach((e) => {
    try {
      URL.revokeObjectURL(e);
    } catch {
    }
  }), Ln = [];
}
function ei() {
  return new Promise((e, t) => {
    if (typeof indexedDB > "u") {
      t(new Error("IndexedDB is not supported in this environment"));
      return;
    }
    const n = indexedDB.open(Es, As);
    n.onupgradeneeded = () => {
      const i = n.result;
      i.objectStoreNames.contains("files") || i.createObjectStore("files");
    }, n.onsuccess = () => e(n.result), n.onerror = () => t(n.error);
  });
}
async function Ts(e, t = Me) {
  const n = await ei();
  return new Promise((i, r) => {
    const o = n.transaction("files", "readwrite");
    o.objectStore("files").put(e, t), o.oncomplete = () => {
      n.close(), i();
    }, o.onerror = () => {
      n.close(), r(o.error);
    }, o.onabort = o.onerror;
  });
}
async function ks() {
  return new Promise((e, t) => {
    if (typeof indexedDB > "u") {
      t(new Error("IndexedDB is not supported"));
      return;
    }
    const n = indexedDB.open("my-newtab-background", 1);
    n.onupgradeneeded = () => {
      const i = n.result;
      i.objectStoreNames.contains("files") || i.createObjectStore("files");
    }, n.onsuccess = () => e(n.result), n.onerror = () => t(n.error);
  });
}
async function Wn(e = "hero") {
  try {
    const t = await ks();
    return new Promise((n) => {
      const i = t.transaction("files", "readonly"), r = i.objectStore("files").get(e);
      r.onsuccess = () => {
        t.close(), n(r.result || null);
      }, r.onerror = () => {
        t.close(), n(null);
      }, i.oncomplete = () => t.close();
    });
  } catch {
    return null;
  }
}
async function kn(e = Me) {
  try {
    const n = await ei(), i = await new Promise((r, o) => {
      const s = n.transaction("files", "readonly"), a = s.objectStore("files").get(e);
      a.onsuccess = () => r(a.result || null), s.oncomplete = () => n.close(), s.onerror = () => {
        n.close(), o(s.error);
      };
    });
    if (i) return i;
  } catch {
  }
  const t = await Wn(e);
  return t || (e === Me ? Wn("hero") : null);
}
async function Ai(e = Me) {
  const t = await ei();
  return new Promise((n, i) => {
    const r = t.transaction("files", "readwrite");
    r.objectStore("files").delete(e), r.oncomplete = () => {
      t.close(), n();
    }, r.onerror = () => {
      t.close(), i(r.error);
    }, r.onabort = r.onerror;
  });
}
function nt(e) {
  return new Promise((t, n) => {
    if (typeof chrome > "u" || !chrome.storage?.local?.get) {
      n(new Error("壁纸存储不可用"));
      return;
    }
    chrome.storage.local.get(e, (i) => {
      chrome.runtime?.lastError ? n(new Error("壁纸配置读取失败")) : t(i || {});
    });
  });
}
function pe(e) {
  return new Promise((t, n) => {
    if (typeof chrome > "u" || !chrome.storage?.local?.set) {
      n(new Error("壁纸存储不可用"));
      return;
    }
    chrome.storage.local.set(e, () => {
      chrome.runtime?.lastError ? n(new Error("壁纸配置保存失败")) : t();
    });
  });
}
function ti(e) {
  return !!(e && (/^image\//i.test(e.type || "") || /^video\//i.test(e.type || "") || /\.(png|jpe?g|webp|gif|mp4|webm)$/i.test(e.name || "")));
}
function ni(e) {
  return String(e || "").replace(/\\/g, "/").replace(/^\.\//, "").replace(/^\/+/, "");
}
function Us(e, t) {
  const n = String(t || "").trim().replace(/^['"]|['"]$/g, "");
  if (!n || /^(?:[a-z][a-z0-9+.-]*:|#|data:|blob:)/i.test(n)) return "";
  const [i] = n.split(/[?#]/);
  if (!i) return "";
  const r = n.startsWith("/") ? "" : ni(e).split("/").slice(0, -1).join("/"), o = `${r ? r + "/" : ""}${i.replace(/^\/+/, "")}`.split("/"), s = [];
  return o.forEach((a) => {
    !a || a === "." || (a === ".." ? s.pop() : s.push(a));
  }), s.join("/").toLowerCase();
}
function Is(e, t) {
  return t.type ? t.type : /\.html?$/i.test(e) ? "text/html" : /\.css$/i.test(e) ? "text/css" : /\.m?js$/i.test(e) ? "text/javascript" : /\.png$/i.test(e) ? "image/png" : /\.jpe?g$/i.test(e) ? "image/jpeg" : /\.webp$/i.test(e) ? "image/webp" : /\.gif$/i.test(e) ? "image/gif" : /\.mp4$/i.test(e) ? "video/mp4" : /\.webm$/i.test(e) ? "video/webm" : "application/octet-stream";
}
async function Ms(e) {
  const t = [];
  let n = 0;
  async function i(r, o = "", s = 0) {
    if (!(s > 4 || t.length >= Si || n >= Tn))
      for await (const a of r.values()) {
        if (t.length >= Si || n >= Tn) break;
        const u = ni(o ? `${o}/${a.name}` : a.name);
        if (a.kind === "file") {
          const d = await a.getFile();
          n += d.size || 0, n <= Tn && t.push({ path: u, file: d });
        } else a.kind === "directory" && await i(a, u, s + 1);
      }
  }
  return await i(e), t;
}
function Ps(e) {
  return e.filter((t) => /(^|\/)index\.html?$/i.test(t.path) || /\.html?$/i.test(t.path)).sort((t, n) => {
    const i = (r) => /^index\.html?$/i.test(r.path) ? 0 : /(^|\/)index\.html?$/i.test(r.path) ? 1 : 2;
    return i(t) - i(n) || t.path.length - n.path.length;
  })[0] || null;
}
function $n(e, t = []) {
  return typeof e == "string" ? /\.(png|jpe?g|webp|gif|mp4|webm|html?)($|[?#])/i.test(e) && t.push(e) : Array.isArray(e) ? e.forEach((n) => $n(n, t)) : e && typeof e == "object" && Object.values(e).forEach((n) => $n(n, t)), t;
}
async function Rs(e) {
  const t = new Map(e.map((i) => [ni(i.path).toLowerCase(), i])), n = e.filter((i) => /(^|\/)project\.json$/i.test(i.path));
  for (const i of n)
    try {
      const r = JSON.parse(await i.file.text());
      for (const o of $n(r)) {
        const s = t.get(Us(i.path, o));
        if (s && ti(s.file)) return s.file;
      }
    } catch {
    }
  return null;
}
function Os(e, t, n) {
  const i = n.filter((r) => !/\.(pkg|mpkg)$/i.test(r.path)).map((r) => ({ path: r.path, file: r.file, mime: Is(r.path, r.file) }));
  return { type: "web", name: e || "Web Wallpaper", entry: t.path, files: i };
}
async function Ns(e) {
  const t = await Ms(e), n = Ps(t);
  if (n) return Os(e.name, n, t);
  const i = await Rs(t);
  return i || t.map((o) => o.file).filter(ti).sort((o, s) => {
    const a = (u) => /\.(mp4|webm)$/i.test(u.name) ? 0 : /\.gif$/i.test(u.name) ? 1 : /^preview\./i.test(u.name) ? 2 : /cover|thumb|poster/i.test(u.name) ? 3 : 4;
    return a(o) - a(s) || s.size - o.size;
  })[0] || null;
}
function Ds(e) {
  return e ? typeof e == "string" ? "自定义图片" : e.name || (e.type === "web" ? "Web Wallpaper" : "自定义背景") : "默认背景";
}
function Bs(e) {
  return typeof e == "string" ? "图片" : e?.type === "web" ? "Web Wallpaper" : e?.type === "db" ? /video/i.test(e.mediaType || "") ? "视频" : "图片/GIF" : "背景";
}
function xs(e, t) {
  if (!e || !t) return !1;
  const n = e.value || e, i = t.value || t;
  if (n.workshopId && i.workshopId && String(n.workshopId) === String(i.workshopId)) return !0;
  const r = e.title || n.name || n.title, o = t.title || i.name || i.title;
  if (r && o && r === o && n.type === i.type) return !0;
  const s = { ...n, storageKey: void 0 }, a = { ...i, storageKey: void 0 };
  return JSON.stringify(s) === JSON.stringify(a);
}
const Ls = {
  pauseWallpaper(e) {
    if (typeof document > "u") return;
    const t = document.querySelector("#hero-background-media video");
    t && (e ? t.paused || t.pause() : t.paused && t.play().catch(() => {
    }));
    const n = document.querySelector("#hero-background-media iframe");
    if (n?.contentWindow)
      try {
        n.contentWindow.postMessage({
          type: "WE_SET_PAUSED",
          isPaused: e,
          paused: e
        }, "*");
      } catch {
      }
    e && wn();
  },
  async loadHistory() {
    const e = await nt([L, "heroBackground"]);
    let t = Array.isArray(e[L]) ? e[L] : [];
    const n = /* @__PURE__ */ new Set(), i = [];
    for (const r of t) {
      const o = r.value?.workshopId ? `ws-${r.value.workshopId}` : r.title ? `${r.kind || ""}-${r.title}` : JSON.stringify({ ...r.value, storageKey: void 0 });
      n.has(o) || (n.add(o), i.push(r));
    }
    return i.length !== t.length && (t = i, pe({ [L]: i })), { history: t, currentValue: e.heroBackground || null };
  },
  async addHistory(e, t = null, n) {
    const i = `bg-${Date.now()}-${Math.random().toString(16).slice(2)}`;
    let r = e;
    e && typeof e == "object" && (r = { ...e, storageKey: i }), t && await Ts(t, i);
    const o = await nt([L, "heroBackground"]), s = Array.isArray(o[L]) ? o[L] : [], a = {
      id: i,
      title: Ds(r),
      kind: Bs(r),
      createdAt: Date.now(),
      previewUrl: n || r.previewUrl || r.previewBase64,
      value: r
    }, u = [a, ...s.filter((f) => !xs(f, a))].slice(
      0,
      bi
    ), d = s.slice(bi - 1).filter((f) => f.value?.storageKey && f.value.storageKey !== o.heroBackground?.storageKey);
    return await Promise.all(d.map((f) => Ai(f.value.storageKey))), await pe({ [L]: u }), r;
  },
  async deleteHistory(e) {
    const t = await nt([L, "heroBackground"]), n = (t[L] || []).filter((i) => i.id !== e.id);
    e.value?.storageKey && await Ai(e.value.storageKey), await pe({ [L]: n }), JSON.stringify(t.heroBackground) === JSON.stringify(e.value) && await this.clearWallpaper();
  },
  async clearWallpaper() {
    const e = { type: "none" };
    await pe({ heroBackground: e });
    try {
      localStorage.setItem("lw-current-wallpaper", JSON.stringify(e));
    } catch {
    }
    await this.applyWallpaper(null);
  },
  async setMountain() {
    await pe({ heroBackground: Lt });
    try {
      localStorage.setItem("lw-current-wallpaper", JSON.stringify(Lt));
    } catch {
    }
    await this.applyWallpaper(Lt);
  },
  async setWallpaper(e, t = null) {
    t && (tt = t), Zt = e, await pe({ heroBackground: e });
    try {
      localStorage.setItem("lw-current-wallpaper", JSON.stringify(e));
    } catch {
    }
    await this.applyWallpaper(e, t);
  },
  async chooseBackgroundFile(e = "all") {
    return typeof document > "u" ? [] : new Promise((t, n) => {
      const i = document.createElement("input");
      i.type = "file", i.hidden = !0, i.multiple = !0, i.accept = e === "image" ? "image/*,.jpg,.jpeg,.png,.webp,.gif" : e === "video" ? "video/mp4,video/webm,.mp4,.webm" : "image/*,video/mp4,video/webm";
      const r = (a) => {
        i.removeEventListener("change", o), i.removeEventListener("cancel", s), i.remove(), t(a);
      }, o = () => r(Array.from(i.files || [])), s = () => r([]);
      i.addEventListener("change", o), i.addEventListener("cancel", s), document.body.appendChild(i);
      try {
        i.click();
      } catch (a) {
        i.remove(), n(a);
      }
    });
  },
  async importBackgroundFile(e, { apply: t = !0 } = {}) {
    if (!e) return null;
    let n, i = null;
    if (e.type === "web")
      i = e, n = { type: "web", name: e.name, entry: e.entry };
    else if (ti(e))
      i = e, n = { type: "db", name: e.name, mediaType: e.type || "application/octet-stream" };
    else
      throw new Error("请选择 JPG、PNG、WebP、GIF、MP4 或 WebM 壁纸。");
    return n = await this.addHistory(n, i), t && (await pe({ heroBackground: n }), await this.applyWallpaper(n)), n;
  },
  async importWallpaperDirectory() {
    const e = window;
    if (!e.showDirectoryPicker) throw new Error("当前浏览器不支持直接选择 Wallpaper 文件夹。");
    const t = await e.showDirectoryPicker(), n = await Ns(t);
    if (!n) throw new Error("文件夹中没有找到可用的 Web Wallpaper、图片、GIF、MP4 或 WebM。");
    return this.importBackgroundFile(n);
  },
  async applyWallpaper(e, t = null) {
    const n = ++et;
    if (typeof document > "u") return;
    const i = document.getElementById("launcher"), r = document.getElementById("hero-background-media");
    if (!(!i || !r) && (_s(), r.replaceChildren(), i.style.removeProperty("--launcher-image"), !!e)) {
      if (typeof e == "string") {
        const o = typeof chrome < "u" ? chrome : null, s = e.startsWith("chrome-extension://") || e.startsWith("http") || e.startsWith("data:") ? e : o?.runtime?.getURL ? o.runtime.getURL(e) : e, a = document.createElement("img");
        a.src = s, a.alt = "", a.decoding = "async", a.fetchPriority = "high", r.appendChild(a);
        return;
      }
      if (e.type === "style") {
        const o = document.createElement("div");
        o.style.cssText = e.style || "", o.style.position = "absolute", o.style.inset = "0", r.appendChild(o);
        return;
      }
      if (e.type === "video") {
        let o = null;
        if (t?.files ? o = (t.files.find((a) => a.path === t.entry) || t.files[0])?.file || null : t instanceof Blob && (o = t), !o) {
          const s = await gi();
          s?.files?.length && (o = (s.files.find((u) => u.path === s.entry) || s.files[0])?.file || null);
        }
        if (o instanceof Blob && n === et) {
          const s = Ei(URL.createObjectURL(o)), a = document.createElement("video");
          a.src = s, a.autoplay = !0, a.preload = "metadata", a.loop = !0, a.muted = !0, a.defaultMuted = !0, a.volume = 0, a.setAttribute("muted", ""), a.playsInline = !0, a.disablePictureInPicture = !0, a.setAttribute("disablepictureinpicture", ""), a.setAttribute("disableremoteplayback", ""), r.appendChild(a);
          return;
        }
      }
      if (Zt = e, e.type === "web") {
        let o = t || tt;
        if ((!o || o.type !== "web") && (o = await gi(), o && o.type === "web" ? tt = o : (o = await kn(e.storageKey || Me), o && o.type === "web" && (tt = o, us(o)))), n !== et) return;
        if (o?.type === "web") {
          tt = o;
          const s = document.createElement("iframe");
          s.title = o.name || "Web Wallpaper", s.setAttribute("allow", "autoplay *"), s.allow = "autoplay";
          const a = typeof chrome < "u" ? chrome : null;
          s.src = a?.runtime?.getURL ? a.runtime.getURL("wallpaper-sandbox.html") : "wallpaper-sandbox.html";
          let u = !1;
          const d = () => {
            u || s.contentWindow?.postMessage(o, "*");
          }, f = (m) => {
            m.source === s.contentWindow && (m.data?.type === "WE_SANDBOX_READY" ? d() : m.data?.type === "WE_SANDBOX_ACK" && (u = !0));
          };
          window.addEventListener("message", f), s.onload = () => {
            d();
            let m = 0;
            const g = setInterval(() => {
              if (m++, u || m > 5 || n !== et) {
                clearInterval(g);
                return;
              }
              d();
            }, 80);
            s.contentWindow && (Cs(s.contentWindow), hr(s.contentWindow));
          }, r.appendChild(s);
        } else
          console.warn("[WallpaperService] Web wallpaper pack not found yet, keeping state without fallback");
        return;
      }
      if (e.type === "db") {
        const o = await kn(e.storageKey || Me);
        if (n !== et || !(o instanceof Blob)) return;
        const s = Ei(URL.createObjectURL(o));
        if (/^video\//i.test(o.type || "") || /\.(mp4|webm)$/i.test(o.name || "")) {
          const a = document.createElement("video");
          a.src = s, a.autoplay = !0, a.preload = "metadata", a.loop = !0, a.muted = !0, a.defaultMuted = !0, a.volume = 0, a.setAttribute("muted", ""), a.playsInline = !0, a.disablePictureInPicture = !0, a.setAttribute("disablepictureinpicture", ""), a.setAttribute("disableremoteplayback", ""), r.appendChild(a);
        } else {
          const a = document.createElement("img");
          a.src = s, a.alt = "", a.decoding = "async", a.fetchPriority = "high", r.appendChild(a);
        }
      }
    }
  },
  // Caller owns and revokes this URL; never put it in the current wallpaper URL pool.
  async createLibraryPreviewUrl(e, t) {
    t?.throwIfAborted();
    const n = await kn(e || Me);
    return t?.throwIfAborted(), n instanceof Blob ? URL.createObjectURL(n) : null;
  },
  async updateHistoryTitle(e, t) {
    const n = await nt([L]), i = Array.isArray(n[L]) ? n[L] : [];
    if (!i.some((o) => o.id === e)) throw new Error("壁纸条目已变化，请刷新");
    const r = i.map((o) => o.id === e ? { ...o, title: t.trim() || o.title } : o);
    await pe({ [L]: r });
  },
  async initWallpaper() {
    try {
      let e = null;
      try {
        const t = localStorage.getItem("lw-current-wallpaper");
        t !== null && (e = JSON.parse(t));
      } catch {
      }
      if (e === null) {
        const t = await nt(["heroBackground"]);
        t.heroBackground !== void 0 && (e = t.heroBackground);
      }
      if (e && (e === "none" || e.type === "none")) {
        await this.applyWallpaper(null);
        return;
      }
      if (!e) {
        const t = await this.loadHistory();
        t.currentValue ? e = t.currentValue : t.history.length > 0 && (e = t.history[0].value);
      }
      if (!e) {
        const t = await Wn("hero");
        t && (e = {
          type: "db",
          name: t.name || "当前壁纸",
          mediaType: t.type || "application/octet-stream"
        });
      }
      e || (e = Lt);
      try {
        localStorage.setItem("lw-current-wallpaper", JSON.stringify(e));
      } catch {
      }
      await this.applyWallpaper(e);
    } catch (e) {
      console.warn("[WallpaperService] Failed to init wallpaper", e);
    }
  }
};
typeof chrome < "u" && chrome?.storage?.onChanged && chrome.storage.onChanged.addListener((e, t) => {
  if (t === "local" && e.heroBackground) {
    const n = e.heroBackground.newValue;
    if (Zt && n && JSON.stringify(Zt) === JSON.stringify(n))
      return;
    Ls.applyWallpaper(n);
  }
});
typeof document < "u" && document.addEventListener("visibilitychange", () => {
  const e = document.hidden, t = document.querySelector("#hero-background-media video");
  t && (e ? t.paused || t.pause() : t.paused && t.play().catch(() => {
  }));
  const n = document.querySelector("#hero-background-media iframe");
  if (n?.contentWindow)
    try {
      n.contentWindow.postMessage({
        type: "WE_SET_PAUSED",
        isPaused: e
      }, "*");
    } catch {
    }
  e && wn();
});
function Un(e) {
  const t = { group: "", positions: /* @__PURE__ */ Object.create(null) };
  try {
    const n = JSON.parse(e || "null");
    if (!n || typeof n != "object") return t;
    typeof n.group == "string" && (t.group = n.group);
    for (const [i, r] of Object.entries(n.positions || {})) {
      const o = r;
      !o || !Number.isFinite(o.top) || o.top < 0 || (t.positions[i] = {
        top: o.top,
        ...typeof o.anchor == "string" ? { anchor: o.anchor } : {},
        ...Number.isFinite(o.offset) ? { offset: o.offset } : {}
      });
    }
  } catch {
  }
  return t;
}
function Ws(e) {
  const t = /* @__PURE__ */ new Map();
  for (const n of e)
    n.group && t.set(n.group, (t.get(n.group) || 0) + 1);
  return [...t].map(([n, i]) => ({ name: n, count: i }));
}
function $s(e, t) {
  return Math.max(0, t !== void 0 && e.offset !== void 0 ? t - e.offset : e.top);
}
const js = ["disabled", "aria-expanded"], Fs = {
  key: 0,
  class: "lw-select-icon"
}, Vs = {
  key: 0,
  class: "lw-select-groups",
  role: "group",
  "aria-label": "按厂商浏览"
}, qs = ["aria-pressed"], Gs = ["aria-pressed", "onClick"], Ks = {
  key: 0,
  class: "lw-select-empty"
}, Hs = ["disabled", "data-select-value", "title", "aria-selected", "onClick"], Js = { class: "lw-item-content" }, zs = {
  key: 0,
  class: "lw-item-icon"
}, Ys = { class: "lw-item-text" }, Qs = {
  key: 0,
  class: "lw-item-check"
}, Xs = /* @__PURE__ */ Er({
  __name: "CustomSelect",
  props: {
    modelValue: {},
    options: {},
    placeholder: { default: "请选择…" },
    disabled: { type: Boolean, default: !1 },
    size: { default: "md" },
    grouped: { type: Boolean },
    memoryKey: {}
  },
  emits: ["update:modelValue", "change"],
  setup(e, { emit: t }) {
    const n = e, i = t, r = se(!1), o = se(null), s = se(null), a = se("");
    let u = Un(null), d = !1;
    function f() {
      try {
        u = Un(n.memoryKey ? localStorage.getItem(n.memoryKey) : null);
      } catch {
        u = Un(null);
      }
      a.value = u.group;
    }
    f();
    function m(v = n.memoryKey) {
      const x = s.value;
      if (!x || !d) return;
      const E = [...x.querySelectorAll("[data-select-value]")], Se = x.getBoundingClientRect().top, Ne = E.find((vn) => vn.getBoundingClientRect().bottom > Se);
      if (u.group = a.value, u.positions[a.value] = {
        top: x.scrollTop,
        anchor: Ne?.dataset.selectValue,
        offset: Ne ? Ne.getBoundingClientRect().top - Se : void 0
      }, v)
        try {
          localStorage.setItem(v, JSON.stringify(u));
        } catch {
        }
    }
    async function g() {
      d = !1, await Tr();
      const v = s.value;
      if (!r.value || !v) return;
      const x = [...v.querySelectorAll("[data-select-value]")], E = u.positions[a.value], Se = x.find((vn) => vn.dataset.selectValue === (E?.anchor ?? String(n.modelValue))), Ne = Se ? Se.getBoundingClientRect().top - v.getBoundingClientRect().top + v.scrollTop : void 0;
      v.scrollTop = E ? $s(E, Ne) : Math.max(0, (Ne ?? 0) - v.clientHeight / 2), d = y.value.length > 0;
    }
    function w() {
      m(), r.value = !1;
    }
    async function C(v) {
      v !== a.value && (m(), a.value = v, await g(), m());
    }
    const B = Te(() => n.options.map((v) => typeof v == "object" && v !== null ? v : { value: v, label: String(v) })), be = Te(() => n.grouped ? Ws(B.value) : []), y = Te(() => a.value && n.grouped ? B.value.filter((v) => v.group === a.value) : B.value);
    Ue(() => n.memoryKey, (v, x) => {
      m(x), f(), r.value && g();
    }), Ue(B, () => {
      a.value && be.value.length && !be.value.some((v) => v.name === a.value) && (a.value = ""), r.value && g();
    }, { flush: "post" }), Ar(() => m());
    const N = Te(() => B.value.find((v) => String(v.value) === String(n.modelValue))), yr = Te(() => N.value?.label ?? n.placeholder);
    function wr() {
      if (!n.disabled) {
        if (r.value) {
          w();
          return;
        }
        B.value.length && a.value && !be.value.some((v) => v.name === a.value) && (a.value = ""), r.value = !0, g();
      }
    }
    function vr(v) {
      v.disabled || n.disabled || (w(), String(v.value) !== String(n.modelValue) && (i("update:modelValue", v.value), i("change", v.value)));
    }
    function ii(v) {
      !r.value || !o.value || o.value.contains(v.target) || w();
    }
    function ri(v) {
      r.value && v.key === "Escape" && w();
    }
    return Cr(() => {
      document.addEventListener("pointerdown", ii, !0), window.addEventListener("keydown", ri);
    }), _r(() => {
      document.removeEventListener("pointerdown", ii, !0), window.removeEventListener("keydown", ri);
    }), (v, x) => (H(), J("div", {
      ref_key: "containerRef",
      ref: o,
      class: _t(["lw-custom-select", [`size-${e.size}`, { "is-open": r.value, "is-disabled": e.disabled }]])
    }, [
      Ee("button", {
        type: "button",
        class: "lw-select-trigger",
        disabled: e.disabled,
        "aria-expanded": r.value,
        onClick: wr
      }, [
        N.value?.icon ? (H(), J("span", Fs, Ae(N.value.icon), 1)) : De("", !0),
        Ee("span", {
          class: _t(["lw-select-label", { "is-placeholder": !N.value }])
        }, Ae(yr.value), 3),
        x[2] || (x[2] = Ee("span", {
          class: "lw-select-chevron",
          "aria-hidden": "true"
        }, "▾", -1))
      ], 8, js),
      r.value ? (H(), J("div", {
        key: 0,
        class: _t(["lw-select-dropdown", { "is-grouped": e.grouped }])
      }, [
        be.value.length ? (H(), J("div", Vs, [
          Ee("button", {
            type: "button",
            "aria-pressed": !a.value,
            onClick: x[0] || (x[0] = (E) => C(""))
          }, "全部 · " + Ae(B.value.length), 9, qs),
          (H(!0), J(oi, null, si(be.value, (E) => (H(), J("button", {
            key: E.name,
            type: "button",
            "aria-pressed": a.value === E.name,
            onClick: (Se) => C(E.name)
          }, Ae(E.name) + " · " + Ae(E.count), 9, Gs))), 128))
        ])) : De("", !0),
        Ee("div", {
          ref_key: "listRef",
          ref: s,
          class: "lw-select-list",
          role: "listbox",
          onScrollPassive: x[1] || (x[1] = (E) => m())
        }, [
          y.value.length ? De("", !0) : (H(), J("div", Ks, " 暂无可用选项 ")),
          (H(!0), J(oi, null, si(y.value, (E) => (H(), J("button", {
            key: String(E.value),
            type: "button",
            class: _t(["lw-select-item", {
              "is-active": String(E.value) === String(e.modelValue),
              "is-disabled": E.disabled
            }]),
            disabled: E.disabled,
            "data-select-value": String(E.value),
            title: E.label,
            role: "option",
            "aria-selected": String(E.value) === String(e.modelValue),
            onClick: (Se) => vr(E)
          }, [
            Ee("span", Js, [
              E.icon ? (H(), J("span", zs, Ae(E.icon), 1)) : De("", !0),
              Ee("span", Ys, Ae(E.label), 1)
            ]),
            String(E.value) === String(e.modelValue) ? (H(), J("span", Qs, "✓")) : De("", !0)
          ], 10, Hs))), 128))
        ], 544)
      ], 2)) : De("", !0)
    ], 2));
  }
}), Ha = /* @__PURE__ */ Rr(Xs, [["__scopeId", "data-v-24f4c9d8"]]);
function Ja(e, t) {
  if (document.getElementById(e)) return;
  const n = document.createElement("style");
  n.id = e, n.textContent = t, document.head.appendChild(n);
}
export {
  ha as $,
  di as A,
  Na as B,
  Ha as C,
  Lt as D,
  Ua as E,
  ci as F,
  _i as G,
  Ti as H,
  da as I,
  la as J,
  ua as K,
  ca as L,
  Be as M,
  Dr as N,
  fa as O,
  Qi as P,
  on as Q,
  Xi as R,
  Fo as S,
  La as T,
  Ba as U,
  Wa as V,
  Ls as W,
  xa as X,
  jn as Y,
  dt as Z,
  ao as _,
  Lr as a,
  Di as a0,
  ga as a1,
  ya as a2,
  Fn as a3,
  he as a4,
  Rn as a5,
  Eo as a6,
  Ta as a7,
  ka as a8,
  _o as a9,
  Ot as aA,
  $a as aB,
  j as aa,
  Pi as ab,
  wa as ac,
  wt as ad,
  ba as ae,
  Ea as af,
  Ra as ag,
  Ma as ah,
  Aa as ai,
  Ca as aj,
  _a as ak,
  Sa as al,
  va as am,
  Uo as an,
  Da as ao,
  Ke as ap,
  $o as aq,
  Pa as ar,
  jo as as,
  Oa as at,
  Yo as au,
  zo as av,
  Va as aw,
  Fa as ax,
  ja as ay,
  qa as az,
  Ai as b,
  l as c,
  ae as d,
  M as e,
  Ja as f,
  pa as g,
  Ui as h,
  ma as i,
  A as j,
  nr as k,
  Yn as l,
  Ka as m,
  Ga as n,
  ei as o,
  Ce as p,
  Ia as q,
  lr as r,
  us as s,
  Y as t,
  p as u,
  Zn as v,
  k as w,
  c as x,
  Rt as y,
  h as z
};
