import { N as o, g as A } from "./search.service-I5ZPPxGy.js";
import { r as k, a as T } from "./vendor-vue-_upDT3S_.js";
function d() {
  return !(typeof chrome > "u" || !chrome.runtime?.id || chrome.runtime.id === "fixture" || typeof chrome.runtime?.sendMessage != "function" || typeof location < "u" && location.pathname.endsWith("/offscreen-audio.html"));
}
let C = null;
function P() {
  if (!(C || !d() || typeof chrome.runtime?.connect != "function"))
    try {
      const e = chrome.runtime.connect({ name: "offscreen-audio-keepalive" });
      C = e, e?.onDisconnect?.addListener?.(() => {
        C === e && (C = null);
      });
    } catch {
      C = null;
    }
}
async function g(e, t, s) {
  if (!d()) return null;
  P();
  try {
    return await new Promise((a) => {
      chrome.runtime.sendMessage(
        { type: "audio-bg:command", target: e, action: t, payload: s },
        (n) => {
          if (chrome.runtime?.lastError) {
            a(null);
            return;
          }
          a(n ?? null);
        }
      );
    });
  } catch {
    return null;
  }
}
async function q() {
  if (!d()) return null;
  P();
  try {
    return await new Promise((e) => {
      chrome.runtime.sendMessage({ type: "audio-bg:get-state" }, (t) => {
        if (chrome.runtime?.lastError || !t?.ok) {
          e(null);
          return;
        }
        e({
          music: t.music ?? null,
          bili: t.bili ?? null
        });
      });
    });
  } catch {
    return null;
  }
}
const L = /* @__PURE__ */ new Set();
let R = !1;
function I() {
  R || !d() || !chrome.runtime?.onMessage?.addListener || (R = !0, chrome.runtime.onMessage.addListener((e) => {
    if (e?.type === "offscreen-audio:state" && !(e.source !== "music" && e.source !== "bili") && e.state)
      for (const t of L)
        try {
          t(e.source, e.state);
        } catch {
        }
  }));
}
function B(e) {
  return I(), P(), L.add(e), () => {
    L.delete(e);
  };
}
const E = "https://monster-siren.hypergryph.com/api", y = "msFavoriteSongs";
function M(e) {
  const t = (e.ar || e.artists || []).map((s) => typeof s == "string" ? s : s.name);
  return {
    cid: `ne_${e.id}`,
    name: e.name || "网易云音乐",
    artists: t.length ? t : ["网易云音乐"],
    coverUrl: e.al?.picUrl || e.album?.picUrl || e.picUrl || e.coverUrl || "",
    isNetease: !0,
    neteaseId: e.id,
    rawSong: e
  };
}
class p {
  constructor() {
    this.audio = null, this.playVersion = 0, this.lyrics = [], this.state = {
      playing: !1,
      currentSong: null,
      currentTime: 0,
      duration: 0,
      mode: "shuffle",
      queue: [],
      queueIndex: -1
    }, this.listeners = [], this.favorites = {}, this.albumDetailCache = /* @__PURE__ */ new Map(), this.albumCoverMap = /* @__PURE__ */ new Map(), d() ? (B((t, s) => {
      t === "music" && this.applyOffscreenState(s);
    }), q().then((t) => {
      t?.music && this.applyOffscreenState(t.music);
    })) : typeof window < "u" && typeof Audio < "u" && (this.audio = new Audio(), this.audio.crossOrigin = "anonymous", this.audio.preload = "none", this.bindAudioEvents()), this.initStorage(), typeof chrome < "u" && chrome.storage?.onChanged && chrome.storage.onChanged.addListener((t, s) => {
      if (s !== "local" || !t[y]) return;
      const a = t[y].newValue;
      this.favorites = a && typeof a == "object" && !Array.isArray(a) ? a : {}, this.notify();
    });
  }
  setLyrics(t) {
    this.lyrics = t.split(/\r?\n/).flatMap((s) => {
      const a = [...s.matchAll(/\[(\d+):(\d+(?:\.\d+)?)\]/g)], n = s.replace(/\[[^\]]*\]/g, "").trim();
      return n ? a.map((r) => ({ time: Number(r[1]) * 60 + Number(r[2]), text: n })) : [];
    }).sort((s, a) => s.time - a.time), this.updateLyric();
  }
  updateLyric() {
    let t = "";
    for (const s of this.lyrics) {
      if (s.time > this.state.currentTime) break;
      t = s.text;
    }
    this.state.currentLyric = t;
  }
  static getInstance() {
    return p.instance || (p.instance = new p()), p.instance;
  }
  getAudioElement() {
    return this.audio;
  }
  async initStorage() {
    if (typeof chrome < "u" && chrome.storage?.local) {
      const t = await chrome.storage.local.get([y]);
      t[y] && (this.favorites = t[y]);
    }
  }
  bindAudioEvents() {
    if (!this.audio) return;
    let t = 0;
    this.audio.addEventListener("timeupdate", () => {
      if (!this.audio) return;
      const a = performance.now();
      a - t < 250 || (t = a, this.state.currentTime = this.audio.currentTime || 0, this.updateLyric(), this.audio.duration && !Number.isNaN(this.audio.duration) && (this.state.duration = this.audio.duration), this.notify());
    });
    const s = () => {
      this.audio && this.audio.duration && !Number.isNaN(this.audio.duration) && (this.state.duration = this.audio.duration, this.notify());
    };
    this.audio.addEventListener("loadedmetadata", s), this.audio.addEventListener("durationchange", s), this.audio.addEventListener("canplay", s), this.audio.addEventListener("play", () => {
      this.state.playing = !0, this.notify();
    }), this.audio.addEventListener("pause", () => {
      this.state.playing = !1, this.notify();
    }), this.audio.addEventListener("ended", () => {
      this.handleSongEnded();
    }), this.audio.addEventListener("error", (a) => {
      console.warn("[MusicService] Audio playback error:", a), this.state.playing = !1, this.notify();
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
      this.listeners = this.listeners.filter((s) => s !== t);
    };
  }
  notify() {
    const t = { ...this.state };
    for (const s of this.listeners)
      try {
        s(t);
      } catch (a) {
        console.error("[MusicService] Listener error:", a);
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
    const s = await (await fetch(`${E}/songs`, { headers: { Accept: "application/json" } })).json();
    return (s.data?.list || s.data || []).map((n) => ({
      cid: n.cid,
      name: n.name,
      artists: n.artists || [],
      albumCid: n.albumCid,
      coverUrl: n.albumCid && this.albumCoverMap.get(String(n.albumCid)) || ""
    }));
  }
  async getSirenAlbums() {
    const n = ((await (await fetch(`${E}/albums`, { headers: { Accept: "application/json" } })).json()).data || []).map((r) => ({
      cid: r.cid,
      name: r.name,
      coverUrl: r.coverUrl
    }));
    for (const r of n)
      r.cid && r.coverUrl && this.albumCoverMap.set(String(r.cid), r.coverUrl);
    return n;
  }
  async getSirenAlbumDetail(t) {
    const s = String(t);
    if (this.albumDetailCache.has(s))
      return this.albumDetailCache.get(s);
    const n = await (await fetch(`${E}/album/${t}/detail`, { headers: { Accept: "application/json" } })).json(), r = n.data?.songs || [], u = n.data?.coverUrl || "", f = r.map((h) => ({
      cid: h.cid,
      name: h.name,
      artists: h.artists || h.artistes || [],
      albumCid: t,
      coverUrl: u
    }));
    return this.albumDetailCache.set(s, f), f;
  }
  async getSirenSongUrl(t) {
    const a = await (await fetch(`${E}/song/${t}`, { headers: { Accept: "application/json" } })).json();
    return {
      sourceUrl: a.data?.sourceUrl || "",
      lyricUrl: a.data?.lyricUrl
    };
  }
  // ==========================================================================
  // 回放控制
  // ==========================================================================
  applyOffscreenState(t) {
    this.state.playing = !!t.playing, this.state.currentSong = t.currentSong, this.state.currentTime = Number(t.currentTime) || 0, this.state.duration = Number(t.duration) || 0, this.state.mode = t.mode || this.state.mode, this.state.queue = Array.isArray(t.queue) ? t.queue : [], this.state.queueIndex = typeof t.queueIndex == "number" ? t.queueIndex : -1, this.state.currentLyric = t.currentLyric || "", this.notify();
  }
  async playSong(t, s = {}) {
    const a = d();
    if (!a && !this.audio || s.isCurrent?.() === !1) return !1;
    const n = ++this.playVersion, r = () => n === this.playVersion && s.isCurrent?.() !== !1;
    !t.coverUrl && t.albumCid && (t.coverUrl = this.albumCoverMap.get(String(t.albumCid)) || ""), this.state.currentSong = t, this.state.currentTime = 0, this.lyrics = [], this.state.currentLyric = "", this.state.queue.some((u) => !!u.isNetease != !!t.isNetease) && (this.state.queue = []), this.state.queue.some((u) => String(u.cid) === String(t.cid)) || this.state.queue.push(t), this.state.queueIndex = this.state.queue.findIndex((u) => String(u.cid) === String(t.cid));
    try {
      let u = "";
      if (t.isNetease && t.neteaseId)
        o.getSongLyric(t.neteaseId).then((f) => {
          r() && (this.setLyrics(f), this.notify(), a && g("music", "set-lyrics", { lyrics: this.lyrics }));
        }), u = await o.getSongAudioUrl(t.neteaseId);
      else {
        const f = await this.getSirenSongUrl(t.cid);
        f.lyricUrl && fetch(f.lyricUrl).then((h) => h.ok ? h.text() : "").then((h) => {
          r() && (this.setLyrics(h), this.notify(), a && g("music", "set-lyrics", { lyrics: this.lyrics }));
        }).catch(() => {
        }), u = f.sourceUrl;
      }
      if (!r()) return !1;
      if (u)
        return a ? (await g("music", "play-url", {
          song: t,
          url: u,
          lyrics: this.lyrics,
          queue: this.state.queue,
          queueIndex: this.state.queueIndex,
          mode: this.state.mode,
          autoplay: s.autoplay !== !1
        }), r() ? (this.state.playing = s.autoplay !== !1, this.notify(), !0) : !1) : (this.audio.src = u, s.autoplay !== !1 && await this.audio.play(), r() ? (this.state.playing = !this.audio.paused, this.notify(), !0) : !1);
    } catch (u) {
      if (!r()) return !1;
      console.error("[MusicService] Play song failed:", u), this.state.playing = !1, this.notify();
    }
    return !1;
  }
  async playNeteaseSong(t, s = {}) {
    return !t || s.isCurrent?.() === !1 ? !1 : (o.addRecentSong(t), this.playSong(M(t), s));
  }
  togglePlay() {
    if (d()) {
      g("music", "toggle");
      return;
    }
    this.audio && (this.state.playing ? this.audio.pause() : this.audio.src && this.audio.play());
  }
  seek(t) {
    if (d()) {
      g("music", "seek", { percent: t });
      return;
    }
    if (!this.audio || !this.audio.duration) return;
    const s = Math.max(0, Math.min(100, t)) / 100 * this.audio.duration;
    this.audio.currentTime = s;
  }
  setPlayMode(t) {
    this.state.mode = t, d() && g("music", "set-mode", { mode: t }), this.notify();
  }
  cyclePlayMode() {
    const t = ["list", "one", "shuffle"], s = t.indexOf(this.state.mode), a = t[(s + 1) % t.length];
    return this.setPlayMode(a), a;
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
  setQueue(t, s = -1, a = !1) {
    this.state.queue = [...t], this.state.queueIndex = s, d() && g("music", "set-queue", { queue: this.state.queue, queueIndex: s }), s >= 0 && t[s] && (this.state.currentSong = t[s], this.notify(), a && this.playSong(t[s]));
  }
  // ==========================================================================
  // 收藏管理
  // ==========================================================================
  isLiked(t) {
    return !!this.favorites[String(t)];
  }
  toggleLike(t) {
    const s = String(t.cid), a = !this.favorites[s];
    return a ? this.favorites[s] = t : delete this.favorites[s], this.persistFavorites(), this.notify(), a;
  }
  getFavorites() {
    return Object.values(this.favorites);
  }
  persistFavorites() {
    typeof chrome < "u" && chrome.storage?.local && chrome.storage.local.set({ [y]: this.favorites });
  }
}
const l = p.getInstance(), _ = "netease_cached_playlists", U = "netease_cached_favorites_songs", S = /* @__PURE__ */ new Map(), w = /* @__PURE__ */ new Map();
let b;
function N(e) {
  const t = w.get(e);
  if (t) return t;
  try {
    const s = localStorage.getItem(e), a = S.get(e);
    if (a?.raw === s) return a.value;
    const n = s ? JSON.parse(s) : [], r = Array.isArray(n) ? n : [];
    return S.set(e, { raw: s, value: r }), r;
  } catch {
    return [];
  }
}
function x() {
  clearTimeout(b), b = void 0;
  for (const [e, t] of w)
    try {
      const s = JSON.stringify(t);
      localStorage.getItem(e) !== s && localStorage.setItem(e, s), S.set(e, { raw: s, value: t });
    } catch {
      S.delete(e);
    }
  w.clear();
}
function V(e, t) {
  w.set(e, t), b === void 0 && (b = setTimeout(x, 250));
}
function H(e) {
  w.delete(e), S.delete(e);
  try {
    localStorage.removeItem(e);
  } catch {
  }
}
typeof window < "u" && (window.addEventListener("pagehide", x), window.addEventListener("storage", (e) => {
  if (e.storageArea === localStorage)
    for (const t of [_, U])
      (e.key === null || e.key === t) && (S.delete(t), w.delete(t));
}));
class O {
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
    for (const s of this._listeners)
      s(t);
  }
  send(t) {
    const s = this._state;
    switch (t.type) {
      case "START_CONNECT":
        return s.phase === "connecting" ? !1 : (this._setState({
          phase: "connecting",
          user: s.user,
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
const m = new O();
function v(e) {
  return (!Number.isFinite(e) || e < 0) && (e = 0), Math.floor(e / 60) + ":" + String(Math.floor(e % 60)).padStart(2, "0");
}
const $ = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Ccircle cx='32' cy='32' r='30' fill='%231e1e24'/%3E%3Ctext x='32' y='38' fill='%23ec4141' font-size='22' text-anchor='middle'%3E%E2%99%AC%3C/text%3E%3C/svg%3E", D = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Cdefs%3E%3CradialGradient id='msrVinyl' cx='50%25' cy='50%25' r='50%25'%3E%3Cstop offset='0%25' stop-color='%2327272a'/%3E%3Cstop offset='70%25' stop-color='%2309090b'/%3E%3Cstop offset='100%25' stop-color='%23000000'/%3E%3C/radialGradient%3E%3C/defs%3E%3Ccircle cx='32' cy='32' r='31' fill='url(%23msrVinyl)' stroke='%233f3f46' stroke-width='1.5'/%3E%3Ccircle cx='32' cy='32' r='24' fill='none' stroke='%2327272a' stroke-width='1' stroke-dasharray='3 2'/%3E%3Ccircle cx='32' cy='32' r='18' fill='none' stroke='%2318181b' stroke-width='1'/%3E%3Ccircle cx='32' cy='32' r='11' fill='%23f59e0b' opacity='0.9'/%3E%3Ccircle cx='32' cy='32' r='4' fill='%2309090b'/%3E%3Ccircle cx='32' cy='32' r='1.5' fill='%23fafafa'/%3E%3C/svg%3E", j = () => ({
  mounted: !1,
  playing: !1,
  title: "点击播放",
  artist: "作者",
  coverUrl: D,
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
  neteaseRecentSongs: o.getRecentSongs(),
  neteaseQrImg: "",
  neteaseQrStatus: "",
  neteaseLoading: !1
}), i = k(j());
let c = {};
const F = {
  get authMachine() {
    return m;
  },
  getSnapshot() {
    return T(i);
  },
  update(e) {
    Object.assign(i, e);
  },
  setMounted(e) {
    i.mounted = e;
  },
  setPlaying(e) {
    i.playing = e;
  },
  setTrack(e, t, s) {
    i.title = e || "点击播放", i.artist = t || "作者", i.coverUrl = s || "";
  },
  setProgress(e, t) {
    i.currentTime = e, i.duration = t, i.formattedCurrent = v(e), i.formattedDuration = v(t), t > 0 ? i.progressPercent = Math.min(100, Math.max(0, e / t * 100)) : i.progressPercent = 0;
  },
  setLiked(e) {
    i.liked = e;
  },
  setMode(e) {
    i.mode = e;
  },
  togglePicker(e) {
    e !== void 0 ? A.visible = e : A.visible = !A.visible;
  },
  setPickerTab(e) {
    i.pickerTab = e, i.activeAlbum = null;
  },
  setSearchQuery(e) {
    i.searchQuery = e;
  },
  setActiveAlbum(e) {
    i.activeAlbum = e;
  },
  setSongs(e) {
    i.songs = e;
  },
  setAlbums(e) {
    i.albums = e;
  },
  setFavorites(e) {
    i.favorites = e;
  },
  setActions(e) {
    c = { ...c, ...e };
  },
  playTrack(e) {
    i.isBiliRadio = !1;
    const t = window;
    if (t.LogicWeaverBiliRadioPlayer?.getState?.()?.playing && t.LogicWeaverBiliRadioPlayer.toggle(), c.playCid)
      c.playCid(e);
    else {
      const s = i.activeAlbum?._songs || [], n = [...i.songs, ...i.favorites, ...s].find((r) => String(r.cid) === String(e));
      n ? l.playSong(n) : l.playSong({ cid: e, name: "塞壬唱片", artists: ["塞壬唱片"] }), window.dispatchEvent(new CustomEvent("logicweaver:music-play-cid", { detail: { cid: e } }));
    }
  },
  togglePlay() {
    if (i.isBiliRadio) {
      const e = window;
      if (typeof e.LogicWeaverBiliRadioPlayer?.toggle == "function") {
        e.LogicWeaverBiliRadioPlayer.toggle();
        return;
      }
    }
    c.togglePlay ? c.togglePlay() : (l.togglePlay(), window.dispatchEvent(new CustomEvent("logicweaver:music-toggle-play")));
  },
  prev() {
    if (i.isBiliRadio) {
      const e = window;
      if (typeof e.LogicWeaverBiliRadioPlayer?.prev == "function") {
        e.LogicWeaverBiliRadioPlayer.prev();
        return;
      }
    }
    c.prev ? c.prev() : (l.prev(), window.dispatchEvent(new CustomEvent("logicweaver:music-prev")));
  },
  next() {
    if (i.isBiliRadio) {
      const e = window;
      if (typeof e.LogicWeaverBiliRadioPlayer?.next == "function") {
        e.LogicWeaverBiliRadioPlayer.next();
        return;
      }
    }
    c.next ? c.next() : (l.next(), window.dispatchEvent(new CustomEvent("logicweaver:music-next")));
  },
  toggleLike() {
    if (c.toggleLike)
      c.toggleLike();
    else {
      const e = l.getState().currentSong;
      e && (i.liked = l.toggleLike(e), i.favorites = l.getFavorites()), window.dispatchEvent(new CustomEvent("logicweaver:music-toggle-like"));
    }
  },
  cycleMode() {
    if (c.cycleMode)
      c.cycleMode();
    else {
      const e = l.cyclePlayMode();
      i.mode = e, window.dispatchEvent(new CustomEvent("logicweaver:music-cycle-mode"));
    }
  },
  seek(e) {
    if (i.isBiliRadio) {
      const t = window;
      if (typeof t.LogicWeaverBiliRadioPlayer?.seek == "function") {
        t.LogicWeaverBiliRadioPlayer.seek(e);
        return;
      }
    }
    c.seek ? c.seek(e) : (l.seek(e), window.dispatchEvent(new CustomEvent("logicweaver:music-seek", { detail: { percent: e } })));
  },
  openPanel() {
    c.openPanel ? c.openPanel() : (F.togglePicker(!0), window.dispatchEvent(new CustomEvent("logicweaver:music-open-panel")));
  },
  openNetease() {
    i.pickerTab = "netease", i.pickerOpen = !0, i.activeAlbum = null, this.loadNeteaseData();
  },
  async loadNeteaseData() {
    i.neteaseUser = o.getUser(), i.neteaseRecentSongs = o.getRecentSongs(), i.neteaseLoading = !0;
    try {
      const [e] = await Promise.all([
        o.getPlaylists(),
        o.fetchAccountRecentSongs(60).catch(() => [])
      ]);
      if (i.neteasePlaylists = e, i.neteaseRecentSongs = o.getRecentSongs(), e.length > 0) {
        const t = e.find((s) => s.name.includes("喜欢的音乐") || s.name.includes("Favorite")) || e[0];
        (!i.neteaseActivePlaylist || i.neteaseActivePlaylist.id !== t.id) && await this.selectNeteasePlaylist(t);
      }
    } catch (e) {
      console.warn("[MusicStore] Load netease playlists error:", e);
    } finally {
      i.neteaseLoading = !1, i.neteaseRecentSongs = o.getRecentSongs();
    }
  },
  async selectNeteasePlaylist(e) {
    if (i.neteaseActivePlaylist = e, !e) {
      i.neteaseSongs = [];
      return;
    }
    i.neteaseLoading = !0;
    try {
      if (!i.neteaseSongs.length)
        try {
          const s = await o.getPlaylistTracks(e.id, 10, 0);
          i.neteaseActivePlaylist?.id === e.id && !i.neteaseSongs.length && (i.neteaseSongs = s, i.neteaseLoading = !1);
        } catch {
        }
      const t = await o.getPlaylistTracks(e.id, 500, 0);
      i.neteaseActivePlaylist?.id === e.id && (i.neteaseSongs = t);
    } catch (t) {
      console.warn("[MusicStore] Load playlist tracks error:", t);
    } finally {
      i.neteaseLoading = !1;
    }
  },
  async searchNetease(e) {
    const t = e.trim();
    if (!t) {
      i.neteaseSearchResults = [];
      return;
    }
    i.neteaseLoading = !0;
    try {
      const s = await o.searchSongs(t);
      i.neteaseSearchResults = s;
    } catch (s) {
      console.warn("[MusicStore] Search netease error:", s);
    } finally {
      i.neteaseLoading = !1;
    }
  },
  syncFromBiliRadio(e) {
    i.isBiliRadio = !0, i.isNetease = !1, i.playing = e.playing, i.title = e.title || "B站电台", i.artist = e.artist || e.seriesName || "哔哩哔哩", e.coverUrl && (i.coverUrl = e.coverUrl), i.currentTime = e.currentTime, i.duration = e.duration, i.formattedCurrent = v(e.currentTime), i.formattedDuration = v(e.duration), i.progressPercent = e.duration > 0 ? Math.min(100, Math.max(0, e.currentTime / e.duration * 100)) : 0, i.currentLyric = e.lyric || "", i.biliRadioSeriesName = e.seriesName || "";
    const t = l.getAudioElement();
    e.playing && t && !t.paused && t.pause();
  },
  playNeteaseTrack(e, t) {
    i.isBiliRadio = !1;
    const s = window;
    s.LogicWeaverBiliRadioPlayer?.getState?.()?.playing && s.LogicWeaverBiliRadioPlayer.toggle(), e && (o.recordRecentSong(e), i.neteaseRecentSongs = o.getRecentSongs()), t?.length && l.setQueue(t.map(M), -1, !1), l.playNeteaseSong(e);
  },
  clearNeteaseRecent() {
    o.clearRecentSongs().catch(() => console.warn("[MusicStore] Recent history removal failed; re-read before retry"));
  },
  refreshRecentSongs() {
    i.neteaseRecentSongs = o.getRecentSongs();
  },
  stopNeteaseQrLogin() {
  },
  async startNeteaseQrLogin() {
    if (this.stopNeteaseQrLogin(), !!m.send({ type: "START_CONNECT" }))
      try {
        await o.connectWebsiteAccount();
        const e = o.getUser();
        m.send({ type: "CONNECT_SUCCESS", user: e }), i.neteaseQrStatus = "官网账户已连接", await this.loadNeteaseData();
      } catch (e) {
        const t = e?.message || "请先在网易云官网登录。";
        m.send({ type: "CONNECT_FAILURE", message: t }), i.neteaseQrStatus = t;
      }
  },
  async logoutNetease() {
    await o.logout(), m.send({ type: "LOGOUT" }), i.neteaseUser = null, i.neteasePlaylists = [], i.neteaseActivePlaylist = null, i.neteaseSongs = [], i.neteaseSearchResults = [];
  }
};
typeof window < "u" && (window.addEventListener("netease:account-updated", () => {
  i.neteaseUser = o.getUser(), m.send({ type: "SYNC_USER", user: i.neteaseUser }), i.neteasePlaylists = [], i.neteaseSongs = [], i.neteaseSearchResults = [], i.neteaseActivePlaylist = null;
}), window.addEventListener("netease:recent-updated", (e) => {
  Array.isArray(e.detail) ? i.neteaseRecentSongs = e.detail : i.neteaseRecentSongs = o.getRecentSongs();
}), l.subscribe((e) => {
  i.playing = e.playing, i.currentTime = e.currentTime, i.duration = e.duration, i.formattedCurrent = v(e.currentTime), i.formattedDuration = v(e.duration), e.duration > 0 ? i.progressPercent = Math.min(100, Math.max(0, e.currentTime / e.duration * 100)) : i.progressPercent = 0, i.mode = e.mode, i.isNetease = !!e.currentSong?.isNetease, i.currentLyric = e.currentLyric || "", e.currentSong && (i.title = e.currentSong.name || "点击播放", i.artist = (e.currentSong.artists || []).join(", ") || "作者", i.coverUrl = e.currentSong.coverUrl || "", i.liked = l.isLiked(e.currentSong.cid));
}));
async function Y() {
  try {
    if (i.favorites = l.getFavorites(), i.neteaseRecentSongs = o.getRecentSongs(), i.neteaseUser = o.getUser(), typeof localStorage < "u")
      try {
        const s = N(U);
        if (s.length) {
          const n = s;
          Array.isArray(n) && n.length > 0 && i.neteaseSongs.length === 0 && (i.neteaseSongs = n);
        }
        const a = N(_);
        if (a.length) {
          const n = a;
          Array.isArray(n) && n.length > 0 && i.neteasePlaylists.length === 0 && (i.neteasePlaylists = n);
        }
      } catch {
      }
    const [e, t] = await Promise.all([
      l.getSirenSongs().catch(() => []),
      l.getSirenAlbums().catch(() => [])
    ]);
    e.length > 0 && i.songs.length === 0 && (i.songs = e), t.length > 0 && i.albums.length === 0 && (i.albums = t);
  } catch (e) {
    console.warn("[MusicStore] initHomeMusicService failed:", e);
  }
}
export {
  _ as C,
  D,
  i as a,
  B as b,
  d as c,
  U as d,
  H as e,
  q as f,
  $ as g,
  F as h,
  Y as i,
  l as m,
  m as n,
  N as r,
  g as s,
  V as w
};
