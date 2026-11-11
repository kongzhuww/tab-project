import { c as Yn, w as Er, h as ie, r as Le, l as Yi } from "./window-manager.store-BdI_8a-H.js";
import { r as K, s as Ie, a as Lt, w as Pe, b as be, d as Qn, K as Xn, B as Zn, x as es, o as se, e as oe, A as qt, i as De, t as xe, f as Je, F as Ti, g as ki, D as ts } from "./vendor-vue-9b0eS4bW.js";
import { b as Gt, S as rs, p as is } from "./stickers.service-Bdd21-le.js";
import { t as Ht, p as ns } from "./module-state-D4Dr89rP.js";
import { R as ss } from "./InlineEditStatus.vue_vue_type_style_index_0_scoped_c63d0c6d_lang-9z3_WNrf.js";
import { V as O } from "./search.service-wriY3nvN.js";
import { _ as os } from "./_plugin-vue_export-helper-BxikU0LD.js";
const St = "notificationHistoryV1", Qi = 200, as = 30 * 864e5;
function li(e) {
  if (e?.type === "todoist-task" && typeof e.taskId == "string" && /^[A-Za-z0-9_-]{1,100}$/.test(e.taskId)) return { type: e.type, taskId: e.taskId };
  if (e?.type === "module" && typeof e.moduleId == "string" && /^[a-z][a-z0-9-]{0,60}$/.test(e.moduleId)) return { type: e.type, moduleId: e.moduleId };
  if (e?.type === "bili-messages") return { type: e.type };
  if (e?.type === "bili-video") {
    if (typeof e.bvid == "string" && /^BV[A-Za-z0-9]{10}$/.test(e.bvid)) return { type: e.type, bvid: e.bvid };
    if (typeof e.aid == "string" && /^[1-9][0-9]{0,19}$/.test(e.aid)) return { type: e.type, aid: e.aid };
  }
  if (e?.type === "github-repository" && typeof e.fullName == "string" && e.fullName.length <= 240 && /^[\w.-]+\/[\w.-]+$/.test(e.fullName) && !e.fullName.split("/").some((t) => t === "." || t === "..")) return { type: e.type, fullName: e.fullName };
}
function cs(e) {
  if (typeof e == "string")
    try {
      const t = new URL(e);
      if (t.protocol !== "https:" || t.username || t.password || t.port || !["bilibili.com", "www.bilibili.com", "m.bilibili.com"].includes(t.hostname)) return;
      const r = /^\/video\/(BV[A-Za-z0-9]{10}|av[1-9][0-9]{0,19})\/?$/.exec(t.pathname);
      if (r) return r[1].startsWith("BV") ? { type: "bili-video", bvid: r[1] } : { type: "bili-video", aid: r[1].slice(2) };
    } catch {
    }
}
function Xi(e) {
  const t = /* @__PURE__ */ new Map();
  for (const r of e.matchAll(/https:\/\/[^\s<>"']+/g)) {
    const i = cs(r[0].replace(/[)）。，,;；]+$/, ""));
    i && t.set(JSON.stringify(i), i);
  }
  return t.size === 1 ? t.values().next().value : void 0;
}
function ft(e, t) {
  return typeof e != "string" ? "" : e.slice(0, 6e3).replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g, "").replace(/\bBearer\s+[A-Za-z0-9._~+\/-]+=*/gi, "Bearer [已隐藏]").replace(/\b(?:ghp_|github_pat_|sk-)[A-Za-z0-9_-]{8,}/g, "[已隐藏]").replace(/((?:token|password|passwd|secret|api[_-]?key|authorization|cookie)\s*[:=]\s*)[^\s,;]+/gi, "$1[已隐藏]").replace(/https?:\/\/[^\s<>"']+/gi, (r) => {
    try {
      const i = new URL(r);
      return i.username = "", i.password = "", i.search = "", i.hash = "", i.href;
    } catch {
      return "[链接]";
    }
  }).slice(0, t);
}
function Zi(e) {
  if (!e || typeof e.id != "string" || !/^[A-Za-z0-9_:-]{1,200}$/.test(e.id) || typeof e.title != "string" || !Number.isFinite(e.createdAt) || !["info", "success", "warning", "error"].includes(e.level)) throw new Error("Invalid notification record");
  let t = li(e.target);
  return e.appType === "bili" && (!t || t.type === "bili-messages") && (t = Xi([e.title, e.subtitle, e.message].filter((r) => typeof r == "string").join(" ")) || t), { id: e.id, appType: ft(e.appType, 40), appName: ft(e.appName, 60), title: ft(e.title, 160), subtitle: ft(e.subtitle, 240), message: ft(e.message, 2e3), level: e.level, createdAt: e.createdAt, read: e.read === !0, target: t };
}
function en(e) {
  if (e == null) return { version: 0, items: [] };
  if (!e || !Number.isSafeInteger(e.version) || e.version < 0 || !Array.isArray(e.items) || e.items.length > Qi) throw new Error("Invalid notification history");
  const t = Date.now();
  return { version: e.version, items: e.items.map(Zi).filter((r) => r.createdAt >= t - as && r.createdAt <= t + 6e4).sort((r, i) => i.createdAt - r.createdAt) };
}
let Ii = Promise.resolve();
function Ye(e, t) {
  const r = Ii.then(async () => {
    if (typeof chrome > "u" || !chrome.storage?.local)
      throw new Error("Chrome storage API unavailable");
    const i = await chrome.storage.local.get(St), n = en(i[St]);
    if (e === "list")
      return n;
    if (e === "append") {
      const s = Zi(t);
      s.createdAt = Date.now(), s.read = !1, n.items.some((o) => o.id === s.id) || n.items.unshift(s), n.items = n.items.slice(0, Qi);
    } else if (e === "read-all")
      n.items = n.items.map((s) => ({ ...s, read: !0 }));
    else if (e === "clear")
      n.items = [];
    else if (e === "read" || e === "remove") {
      if (typeof t != "string" || t.length > 200)
        throw new Error("Invalid notification id");
      e === "remove" ? n.items = n.items.filter((s) => s.id !== t) : n.items = n.items.map((s) => s.id === t ? { ...s, read: !0 } : s);
    } else
      throw new Error("Invalid history operation");
    return n.version++, await chrome.storage.local.set({ [St]: n }), n;
  });
  return Ii = r.catch(() => {
  }), r;
}
const k = K({
  isOpen: !1,
  loading: !1,
  saving: !1,
  error: "",
  version: -1,
  items: []
}), Ha = Ie(() => k.items.filter((e) => !e.read).length);
let Ui = !1;
function We(e) {
  e.version < k.version || (k.version = e.version, k.items = e.items);
}
const ls = {
  state: k,
  start() {
    Ui || (Ui = !0, typeof chrome < "u" && chrome.storage?.onChanged && chrome.storage.onChanged.addListener((e, t) => {
      if (!(t !== "local" || !e[St]))
        try {
          We(en(e[St].newValue));
        } catch {
          k.error = "通知历史格式异常，未覆盖当前记录。";
        }
    }), this.refresh());
  },
  async refresh() {
    k.loading = !0;
    try {
      const e = await Ye("list");
      We(e), k.error = "";
    } catch {
      k.error = "通知历史读取失败。请点击“重新读取”重试。";
    } finally {
      k.loading = !1;
    }
  },
  open() {
    this.start(), k.isOpen = !0, this.refresh();
  },
  close() {
    k.isOpen = !1;
  },
  toggle() {
    k.isOpen ? this.close() : this.open();
  },
  async markRead(e) {
    if (!k.saving) {
      k.saving = !0;
      try {
        const t = await Ye("read", e);
        We(t), k.error = "";
      } catch {
        k.error = "标记已读未确认，请重试。";
      } finally {
        k.saving = !1;
      }
    }
  },
  async markAllRead() {
    if (!k.saving) {
      k.saving = !0;
      try {
        const e = await Ye("read-all");
        We(e), k.error = "";
      } catch {
        k.error = "全部标记已读未确认，请重试。";
      } finally {
        k.saving = !1;
      }
    }
  },
  async remove(e) {
    if (!k.saving) {
      k.saving = !0;
      try {
        const t = await Ye("remove", e);
        We(t), k.error = "";
      } catch {
        k.error = "删除通知未确认，请重试。";
      } finally {
        k.saving = !1;
      }
    }
  },
  async clear() {
    if (!k.saving) {
      k.saving = !0;
      try {
        const e = await Ye("clear");
        We(e), k.error = "";
      } catch {
        k.error = "清空通知未确认，请重试。";
      } finally {
        k.saving = !1;
      }
    }
  },
  async activate(e) {
    await this.markRead(e.id), e.target && await this.openTarget(e.target);
  },
  async openTarget(e) {
    const t = li(e);
    if (t)
      try {
        if (t.type === "todoist-task") {
          const { openTodoistTask: r } = await import("./task-navigation-CvM3gAxl.js");
          r(t.taskId);
        } else if (t.type === "github-repository") {
          const { githubRepoDetailController: r } = await import("./search.service-wriY3nvN.js").then((i) => i.a5);
          r.open(t.fullName);
        } else if (t.type === "bili-video") {
          const { biliMiniPlayerController: r } = await Promise.resolve().then(() => wo);
          await r.openVideo({ bvid: t.bvid, aid: t.aid });
        } else if (t.type === "bili-messages") {
          const { biliMessagePanelController: r } = await import("./message-panel-store-DCJuUdyJ.js");
          r.openPanel();
        } else {
          const { getDockModule: r } = await import("./window-manager.store-BdI_8a-H.js").then((n) => n.m);
          if (!r(t.moduleId)) throw new Error();
          const { windowManagerController: i } = await import("./window-manager.store-BdI_8a-H.js").then((n) => n.n);
          i.open(t.moduleId);
        }
        this.close();
      } catch {
        k.error = "通知对应页面暂不能打开，记录已保留。";
      }
  }
};
function us(e) {
  ls.start(), Ye("append", e).then((t) => We(t)).catch(() => {
    k.error = "有一条通知未获持久保存确认。";
  });
}
const Se = K([]), Kt = /* @__PURE__ */ new Map();
function ds(e, t) {
  return e.history !== void 0 ? e.history : e.level === "warning" || e.level === "error" || /失败|错误|异常|未确认|未获确认|未保存|无法|不可用|拒绝|超时|警告|到期|时间已到/.test(t) ? !0 : /复制成功|已复制|保存成功|已保存|设置成功|已更新设置|配置已更新|已设为|已取消|已切换/.test(t) || /^(正在|开始读取|加载中|同步中)/.test(t) ? !1 : e.appType === "chat" || e.appType === "bili" || /提醒|任务已创建|任务完成|已完成任务|任务结果|下载完成|新消息|新私信|新回复|新提及|有可用更新/.test(t);
}
const Mi = {
  chat: { name: "海狸聊天室", icon: "assets/icon-48.png", action: "查看消息" },
  bili: { name: "哔哩哔哩", icon: "assets/bilibili.svg", action: "查看消息" },
  phone: { name: "手机文件", icon: "assets/nav-traffic.svg", action: "复制文件" },
  fetch: { name: "LogicWeaver", icon: "assets/icon-48.png", action: "" }
};
function dr(e) {
  const t = Se.find((r) => r.id === e);
  !t || t.closing || (t.closing = !0, window.setTimeout(() => {
    const r = Se.findIndex((i) => i.id === e);
    r >= 0 && Se.splice(r, 1);
  }, 260));
}
function fs() {
  for (const e of Se) dr(e.id);
}
function tn(e) {
  if (!e) return null;
  const t = e.appType || "fetch", r = Mi[t] || Mi.fetch, i = String(e.title || "新消息通知"), n = String(e.subtitle || ""), s = String(e.message || ""), o = li(e.target) || (t === "bili" ? Xi(`${i} ${n} ${s}`) : void 0), a = Math.max(500, Number(e.duration) || 7e3), c = String(e.id || `${t}_${i}_${n}_${s}`).trim(), l = Date.now();
  for (const [S, y] of Kt)
    l - y > 3e4 && Kt.delete(S);
  const u = e.id ? 200 : a <= 4e3 ? 1200 : 3e3, h = Kt.get(c);
  if (h && l - h < u || Se.some((S) => S.fingerprint === c && !S.closing)) return null;
  Kt.set(c, l);
  const p = `toast_${crypto.randomUUID()}`, g = {
    id: p,
    fingerprint: c,
    appType: t,
    appName: String(e.appName || r.name),
    icon: String(e.icon || r.icon),
    title: i,
    subtitle: n,
    message: s,
    actionLabel: e.actionLabel === void 0 ? r.action : String(e.actionLabel || ""),
    showActions: e.showActions !== !1,
    duration: a,
    onClick: typeof e.onClick == "function" ? e.onClick : null,
    closing: !1,
    target: o
  };
  Se.push(g);
  const w = i + " " + n + " " + s;
  if (ds(e, w)) {
    const S = e.level || (/失败|错误|异常|未确认|未获确认|无法|超时/.test(w) ? "error" : "info"), y = o || (t === "chat" ? { type: "module", moduleId: "chat" } : void 0);
    us({ id: p, appType: t, appName: g.appName, title: i, subtitle: n, message: s, level: S, createdAt: l, read: !1, target: y });
  }
  const b = Se.filter((S) => !S.closing);
  return b.length > 5 && dr(b[0].id), Object.freeze({ id: p, close: () => dr(p) });
}
function ps(e, t, r = "", i = "assets/logo.png", n = 3200) {
  return tn({ appType: "fetch", appName: e, title: t, subtitle: r, icon: i, duration: n, showActions: !1, actionLabel: "" });
}
const Ka = Lt(Se), he = Object.freeze({
  show: tn,
  fetch: ps,
  close: dr,
  clear: fs,
  get size() {
    return Se.filter((e) => !e.closing).length;
  }
}), zt = "https://monster-siren.hypergryph.com/api", Jt = "msFavoriteSongs";
class Ze {
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
    return Ze.instance || (Ze.instance = new Ze()), Ze.instance;
  }
  getAudioElement() {
    return this.audio;
  }
  async initStorage() {
    if (typeof chrome < "u" && chrome.storage?.local) {
      const t = await chrome.storage.local.get([Jt]);
      t[Jt] && (this.favorites = t[Jt]);
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
  subscribe(t) {
    return this.listeners.push(t), t({ ...this.state }), () => {
      this.listeners = this.listeners.filter((r) => r !== t);
    };
  }
  notify() {
    const t = { ...this.state };
    for (const r of this.listeners)
      try {
        r(t);
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
    const r = await (await fetch(`${zt}/songs`, { headers: { Accept: "application/json" } })).json();
    return (r.data?.list || r.data || []).map((n) => ({
      cid: n.cid,
      name: n.name,
      artists: n.artists || [],
      albumCid: n.albumCid,
      coverUrl: n.albumCid && this.albumCoverMap.get(String(n.albumCid)) || ""
    }));
  }
  async getSirenAlbums() {
    const n = ((await (await fetch(`${zt}/albums`, { headers: { Accept: "application/json" } })).json()).data || []).map((s) => ({
      cid: s.cid,
      name: s.name,
      coverUrl: s.coverUrl
    }));
    for (const s of n)
      s.cid && s.coverUrl && this.albumCoverMap.set(String(s.cid), s.coverUrl);
    return n;
  }
  async getSirenAlbumDetail(t) {
    const r = String(t);
    if (this.albumDetailCache.has(r))
      return this.albumDetailCache.get(r);
    const n = await (await fetch(`${zt}/album/${t}/detail`, { headers: { Accept: "application/json" } })).json(), s = n.data?.songs || [], o = n.data?.coverUrl || "", a = s.map((c) => ({
      cid: c.cid,
      name: c.name,
      artists: c.artists || c.artistes || [],
      albumCid: t,
      coverUrl: o
    }));
    return this.albumDetailCache.set(r, a), a;
  }
  async getSirenSongUrl(t) {
    const i = await (await fetch(`${zt}/song/${t}`, { headers: { Accept: "application/json" } })).json();
    return {
      sourceUrl: i.data?.sourceUrl || "",
      lyricUrl: i.data?.lyricUrl
    };
  }
  // ==========================================================================
  // 回放控制
  // ==========================================================================
  async playSong(t, r = {}) {
    if (!this.audio || r.isCurrent?.() === !1) return !1;
    const i = ++this.playVersion, n = () => i === this.playVersion && r.isCurrent?.() !== !1;
    !t.coverUrl && t.albumCid && (t.coverUrl = this.albumCoverMap.get(String(t.albumCid)) || ""), this.state.currentSong = t, this.state.queue.some((s) => String(s.cid) === String(t.cid)) || this.state.queue.push(t), this.state.queueIndex = this.state.queue.findIndex((s) => String(s.cid) === String(t.cid));
    try {
      let s = "";
      if (t.isNetease && t.neteaseId ? s = await O.getSongAudioUrl(t.neteaseId) : s = (await this.getSirenSongUrl(t.cid)).sourceUrl, !n()) return !1;
      if (s)
        return this.audio.src = s, r.autoplay !== !1 && await this.audio.play(), n() ? (this.state.playing = !this.audio.paused, this.notify(), !0) : !1;
    } catch (s) {
      if (!n()) return !1;
      console.error("[MusicService] Play song failed:", s), this.state.playing = !1, this.notify();
    }
    return !1;
  }
  async playNeteaseSong(t, r = {}) {
    if (!t || r.isCurrent?.() === !1) return !1;
    O.addRecentSong(t);
    const i = (t.ar || t.artists || []).map((o) => typeof o == "string" ? o : o.name), n = t.al?.picUrl || t.album?.picUrl || t.picUrl || t.coverUrl || "", s = {
      cid: `ne_${t.id}`,
      name: t.name || "网易云音乐",
      artists: i.length ? i : ["网易云音乐"],
      coverUrl: n,
      isNetease: !0,
      neteaseId: t.id,
      rawSong: t
    };
    return this.playSong(s, r);
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
    const r = Math.max(0, Math.min(100, t)) / 100 * this.audio.duration;
    this.audio.currentTime = r;
  }
  setPlayMode(t) {
    this.state.mode = t, this.notify();
  }
  cyclePlayMode() {
    const t = ["list", "one", "shuffle"], r = t.indexOf(this.state.mode), i = t[(r + 1) % t.length];
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
  setQueue(t, r = -1, i = !1) {
    this.state.queue = [...t], this.state.queueIndex = r, r >= 0 && t[r] && (this.state.currentSong = t[r], this.notify(), i && this.playSong(t[r]));
  }
  // ==========================================================================
  // 收藏管理
  // ==========================================================================
  isLiked(t) {
    return !!this.favorites[String(t)];
  }
  toggleLike(t) {
    const r = String(t.cid), i = !this.favorites[r];
    return i ? this.favorites[r] = t : delete this.favorites[r], this.persistFavorites(), this.notify(), i;
  }
  getFavorites() {
    return Object.values(this.favorites);
  }
  persistFavorites() {
    typeof chrome < "u" && chrome.storage?.local && chrome.storage.local.set({ [Jt]: this.favorites });
  }
}
const D = Ze.getInstance(), ve = K({ visible: !1, pendingWrites: 0 }), Xr = /* @__PURE__ */ new Set();
function za(e) {
  return Xr.add(e), () => {
    Xr.delete(e);
  };
}
function ms() {
  for (const e of Xr) e();
}
async function Ja(e) {
  ve.pendingWrites++;
  try {
    return await e();
  } finally {
    ve.pendingWrites--;
  }
}
const rn = "netease_cached_playlists", nn = "netease_cached_favorites_songs", ot = /* @__PURE__ */ new Map(), at = /* @__PURE__ */ new Map();
let fr;
function Pi(e) {
  const t = at.get(e);
  if (t) return t;
  try {
    const r = localStorage.getItem(e), i = ot.get(e);
    if (i?.raw === r) return i.value;
    const n = r ? JSON.parse(r) : [], s = Array.isArray(n) ? n : [];
    return ot.set(e, { raw: r, value: s }), s;
  } catch {
    return [];
  }
}
function sn() {
  clearTimeout(fr), fr = void 0;
  for (const [e, t] of at)
    try {
      const r = JSON.stringify(t);
      localStorage.getItem(e) !== r && localStorage.setItem(e, r), ot.set(e, { raw: r, value: t });
    } catch {
      ot.delete(e);
    }
  at.clear();
}
function Ya(e, t) {
  at.set(e, t), fr === void 0 && (fr = setTimeout(sn, 250));
}
function Qa(e) {
  at.delete(e), ot.delete(e);
  try {
    localStorage.removeItem(e);
  } catch {
  }
}
typeof window < "u" && (window.addEventListener("pagehide", sn), window.addEventListener("storage", (e) => {
  if (e.storageArea === localStorage)
    for (const t of [rn, nn])
      (e.key === null || e.key === t) && (ot.delete(t), at.delete(t));
}));
class hs {
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
    for (const r of this._listeners)
      r(t);
  }
  send(t) {
    const r = this._state;
    switch (t.type) {
      case "START_CONNECT":
        return r.phase === "connecting" ? !1 : (this._setState({
          phase: "connecting",
          user: r.user,
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
const Qe = new hs();
function et(e) {
  return (!Number.isFinite(e) || e < 0) && (e = 0), Math.floor(e / 60) + ":" + String(Math.floor(e % 60)).padStart(2, "0");
}
const Xa = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Ccircle cx='32' cy='32' r='30' fill='%231e1e24'/%3E%3Ctext x='32' y='38' fill='%23ec4141' font-size='22' text-anchor='middle'%3E%E2%99%AC%3C/text%3E%3C/svg%3E", gs = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Cdefs%3E%3CradialGradient id='msrVinyl' cx='50%25' cy='50%25' r='50%25'%3E%3Cstop offset='0%25' stop-color='%2327272a'/%3E%3Cstop offset='70%25' stop-color='%2309090b'/%3E%3Cstop offset='100%25' stop-color='%23000000'/%3E%3C/radialGradient%3E%3C/defs%3E%3Ccircle cx='32' cy='32' r='31' fill='url(%23msrVinyl)' stroke='%233f3f46' stroke-width='1.5'/%3E%3Ccircle cx='32' cy='32' r='24' fill='none' stroke='%2327272a' stroke-width='1' stroke-dasharray='3 2'/%3E%3Ccircle cx='32' cy='32' r='18' fill='none' stroke='%2318181b' stroke-width='1'/%3E%3Ccircle cx='32' cy='32' r='11' fill='%23f59e0b' opacity='0.9'/%3E%3Ccircle cx='32' cy='32' r='4' fill='%2309090b'/%3E%3Ccircle cx='32' cy='32' r='1.5' fill='%23fafafa'/%3E%3C/svg%3E", ys = () => ({
  mounted: !1,
  playing: !1,
  title: "点击播放",
  artist: "作者",
  coverUrl: gs,
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
  neteaseRecentSongs: O.getRecentSongs(),
  neteaseQrImg: "",
  neteaseQrStatus: "",
  neteaseLoading: !1
}), m = K(ys());
let W = {};
const on = {
  get authMachine() {
    return Qe;
  },
  getSnapshot() {
    return Lt(m);
  },
  update(e) {
    Object.assign(m, e);
  },
  setMounted(e) {
    m.mounted = e;
  },
  setPlaying(e) {
    m.playing = e;
  },
  setTrack(e, t, r) {
    m.title = e || "点击播放", m.artist = t || "作者", m.coverUrl = r || "";
  },
  setProgress(e, t) {
    m.currentTime = e, m.duration = t, m.formattedCurrent = et(e), m.formattedDuration = et(t), t > 0 ? m.progressPercent = Math.min(100, Math.max(0, e / t * 100)) : m.progressPercent = 0;
  },
  setLiked(e) {
    m.liked = e;
  },
  setMode(e) {
    m.mode = e;
  },
  togglePicker(e) {
    e !== void 0 ? ve.visible = e : ve.visible = !ve.visible;
  },
  setPickerTab(e) {
    m.pickerTab = e, m.activeAlbum = null;
  },
  setSearchQuery(e) {
    m.searchQuery = e;
  },
  setActiveAlbum(e) {
    m.activeAlbum = e;
  },
  setSongs(e) {
    m.songs = e;
  },
  setAlbums(e) {
    m.albums = e;
  },
  setFavorites(e) {
    m.favorites = e;
  },
  setActions(e) {
    W = { ...W, ...e };
  },
  playTrack(e) {
    m.isBiliRadio = !1;
    const t = window;
    if (t.LogicWeaverBiliRadioPlayer?.getState?.()?.playing && t.LogicWeaverBiliRadioPlayer.toggle(), W.playCid)
      W.playCid(e);
    else {
      const r = m.activeAlbum?._songs || [], n = [...m.songs, ...m.favorites, ...r].find((s) => String(s.cid) === String(e));
      n ? D.playSong(n) : D.playSong({ cid: e, name: "塞壬唱片", artists: ["塞壬唱片"] }), window.dispatchEvent(new CustomEvent("logicweaver:music-play-cid", { detail: { cid: e } }));
    }
  },
  togglePlay() {
    if (m.isBiliRadio) {
      const e = window;
      if (typeof e.LogicWeaverBiliRadioPlayer?.toggle == "function") {
        e.LogicWeaverBiliRadioPlayer.toggle();
        return;
      }
    }
    W.togglePlay ? W.togglePlay() : (D.togglePlay(), window.dispatchEvent(new CustomEvent("logicweaver:music-toggle-play")));
  },
  prev() {
    if (m.isBiliRadio) {
      const e = window;
      if (typeof e.LogicWeaverBiliRadioPlayer?.prev == "function") {
        e.LogicWeaverBiliRadioPlayer.prev();
        return;
      }
    }
    W.prev ? W.prev() : (D.prev(), window.dispatchEvent(new CustomEvent("logicweaver:music-prev")));
  },
  next() {
    if (m.isBiliRadio) {
      const e = window;
      if (typeof e.LogicWeaverBiliRadioPlayer?.next == "function") {
        e.LogicWeaverBiliRadioPlayer.next();
        return;
      }
    }
    W.next ? W.next() : (D.next(), window.dispatchEvent(new CustomEvent("logicweaver:music-next")));
  },
  toggleLike() {
    if (W.toggleLike)
      W.toggleLike();
    else {
      const e = D.getState().currentSong;
      e && (m.liked = D.toggleLike(e), m.favorites = D.getFavorites()), window.dispatchEvent(new CustomEvent("logicweaver:music-toggle-like"));
    }
  },
  cycleMode() {
    if (W.cycleMode)
      W.cycleMode();
    else {
      const e = D.cyclePlayMode();
      m.mode = e, window.dispatchEvent(new CustomEvent("logicweaver:music-cycle-mode"));
    }
  },
  seek(e) {
    if (m.isBiliRadio) {
      const t = window;
      if (typeof t.LogicWeaverBiliRadioPlayer?.seek == "function") {
        t.LogicWeaverBiliRadioPlayer.seek(e);
        return;
      }
    }
    W.seek ? W.seek(e) : (D.seek(e), window.dispatchEvent(new CustomEvent("logicweaver:music-seek", { detail: { percent: e } })));
  },
  openPanel() {
    W.openPanel ? W.openPanel() : (on.togglePicker(!0), window.dispatchEvent(new CustomEvent("logicweaver:music-open-panel")));
  },
  openNetease() {
    m.pickerTab = "netease", m.pickerOpen = !0, m.activeAlbum = null, this.loadNeteaseData();
  },
  async loadNeteaseData() {
    m.neteaseUser = O.getUser(), m.neteaseRecentSongs = O.getRecentSongs(), m.neteaseLoading = !0;
    try {
      const [e] = await Promise.all([
        O.getPlaylists(),
        O.fetchAccountRecentSongs(60).catch(() => [])
      ]);
      if (m.neteasePlaylists = e, m.neteaseRecentSongs = O.getRecentSongs(), e.length > 0) {
        const t = e.find((r) => r.name.includes("喜欢的音乐") || r.name.includes("Favorite")) || e[0];
        (!m.neteaseActivePlaylist || m.neteaseActivePlaylist.id !== t.id) && await this.selectNeteasePlaylist(t);
      }
    } catch (e) {
      console.warn("[MusicStore] Load netease playlists error:", e);
    } finally {
      m.neteaseLoading = !1, m.neteaseRecentSongs = O.getRecentSongs();
    }
  },
  async selectNeteasePlaylist(e) {
    if (m.neteaseActivePlaylist = e, !e) {
      m.neteaseSongs = [];
      return;
    }
    m.neteaseLoading = !0;
    try {
      if (!m.neteaseSongs.length)
        try {
          const r = await O.getPlaylistTracks(e.id, 10, 0);
          m.neteaseActivePlaylist?.id === e.id && !m.neteaseSongs.length && (m.neteaseSongs = r, m.neteaseLoading = !1);
        } catch {
        }
      const t = await O.getPlaylistTracks(e.id, 500, 0);
      m.neteaseActivePlaylist?.id === e.id && (m.neteaseSongs = t);
    } catch (t) {
      console.warn("[MusicStore] Load playlist tracks error:", t);
    } finally {
      m.neteaseLoading = !1;
    }
  },
  async searchNetease(e) {
    const t = e.trim();
    if (!t) {
      m.neteaseSearchResults = [];
      return;
    }
    m.neteaseLoading = !0;
    try {
      const r = await O.searchSongs(t);
      m.neteaseSearchResults = r;
    } catch (r) {
      console.warn("[MusicStore] Search netease error:", r);
    } finally {
      m.neteaseLoading = !1;
    }
  },
  syncFromBiliRadio(e) {
    m.isBiliRadio = !0, m.isNetease = !1, m.playing = e.playing, m.title = e.title || "B站电台", m.artist = e.artist || e.seriesName || "哔哩哔哩", e.coverUrl && (m.coverUrl = e.coverUrl), m.currentTime = e.currentTime, m.duration = e.duration, m.formattedCurrent = et(e.currentTime), m.formattedDuration = et(e.duration), m.progressPercent = e.duration > 0 ? Math.min(100, Math.max(0, e.currentTime / e.duration * 100)) : 0, m.currentLyric = e.lyric || "", m.biliRadioSeriesName = e.seriesName || "";
    const t = D.getAudioElement();
    e.playing && t && !t.paused && t.pause();
  },
  playNeteaseTrack(e) {
    m.isBiliRadio = !1;
    const t = window;
    t.LogicWeaverBiliRadioPlayer?.getState?.()?.playing && t.LogicWeaverBiliRadioPlayer.toggle(), e && (O.recordRecentSong(e), m.neteaseRecentSongs = O.getRecentSongs()), D.playNeteaseSong(e);
  },
  clearNeteaseRecent() {
    O.clearRecentSongs().catch(() => console.warn("[MusicStore] Recent history removal failed; re-read before retry"));
  },
  refreshRecentSongs() {
    m.neteaseRecentSongs = O.getRecentSongs();
  },
  stopNeteaseQrLogin() {
  },
  async startNeteaseQrLogin() {
    if (this.stopNeteaseQrLogin(), !!Qe.send({ type: "START_CONNECT" }))
      try {
        await O.connectWebsiteAccount();
        const e = O.getUser();
        Qe.send({ type: "CONNECT_SUCCESS", user: e }), m.neteaseQrStatus = "官网账户已连接", await this.loadNeteaseData();
      } catch (e) {
        const t = e?.message || "请先在网易云官网登录。";
        Qe.send({ type: "CONNECT_FAILURE", message: t }), m.neteaseQrStatus = t;
      }
  },
  async logoutNetease() {
    await O.logout(), Qe.send({ type: "LOGOUT" }), m.neteaseUser = null, m.neteasePlaylists = [], m.neteaseActivePlaylist = null, m.neteaseSongs = [], m.neteaseSearchResults = [];
  }
};
typeof window < "u" && (window.addEventListener("netease:account-updated", () => {
  m.neteaseUser = O.getUser(), Qe.send({ type: "SYNC_USER", user: m.neteaseUser }), m.neteasePlaylists = [], m.neteaseSongs = [], m.neteaseSearchResults = [], m.neteaseActivePlaylist = null;
}), window.addEventListener("netease:recent-updated", (e) => {
  Array.isArray(e.detail) ? m.neteaseRecentSongs = e.detail : m.neteaseRecentSongs = O.getRecentSongs();
}), D.subscribe((e) => {
  m.playing = e.playing, m.currentTime = e.currentTime, m.duration = e.duration, m.formattedCurrent = et(e.currentTime), m.formattedDuration = et(e.duration), e.duration > 0 ? m.progressPercent = Math.min(100, Math.max(0, e.currentTime / e.duration * 100)) : m.progressPercent = 0, m.mode = e.mode, m.isNetease = !!e.currentSong?.isNetease, m.currentLyric = e.currentLyric || "", e.currentSong && (m.title = e.currentSong.name || "点击播放", m.artist = (e.currentSong.artists || []).join(", ") || "作者", m.coverUrl = e.currentSong.coverUrl || "", m.liked = D.isLiked(e.currentSong.cid));
}));
async function Za() {
  try {
    if (m.favorites = D.getFavorites(), m.neteaseRecentSongs = O.getRecentSongs(), m.neteaseUser = O.getUser(), typeof localStorage < "u")
      try {
        const r = Pi(nn);
        if (r.length) {
          const n = r;
          Array.isArray(n) && n.length > 0 && m.neteaseSongs.length === 0 && (m.neteaseSongs = n);
        }
        const i = Pi(rn);
        if (i.length) {
          const n = i;
          Array.isArray(n) && n.length > 0 && m.neteasePlaylists.length === 0 && (m.neteasePlaylists = n);
        }
      } catch {
      }
    const [e, t] = await Promise.all([
      D.getSirenSongs().catch(() => []),
      D.getSirenAlbums().catch(() => [])
    ]);
    e.length > 0 && m.songs.length === 0 && (m.songs = e, D.setQueue(e, -1, !1)), t.length > 0 && m.albums.length === 0 && (m.albums = t);
  } catch (e) {
    console.warn("[MusicStore] initHomeMusicService failed:", e);
  }
}
const ce = K({
  avatarUrl: "assets/bilibili.svg",
  userName: "哔哩哔哩用户",
  buttonTitle: "通知中心"
}), ws = () => ({
  mounted: !1,
  visible: !1,
  x: 0,
  y: 0,
  avatarUrl: "assets/bilibili.svg",
  userName: "用户"
}), $e = K(ws());
let ee = {};
const bs = {
  getSnapshot() {
    return Lt($e);
  },
  update(e) {
    Object.assign($e, e);
  },
  setMounted(e) {
    $e.mounted = e;
  },
  open(e, t) {
    $e.x = e, $e.y = t, $e.visible = !0;
    const r = document.getElementById("bili-profile-menu");
    r && (r.hidden = !1, r.style.left = `${Math.min(window.innerWidth - 205, e)}px`, r.style.top = `${Math.min(window.innerHeight - 150, t)}px`);
  },
  close() {
    $e.visible = !1;
    const e = document.getElementById("bili-profile-menu");
    e && (e.hidden = !0);
  },
  trigger(e) {
    if (bs.close(), ee.onAction) {
      ee.onAction(e);
      return;
    }
    e === "messages" && ee.showInfo ? ee.showInfo() : e === "refresh" && ee.refresh ? ee.refresh() : e === "switch" && ee.switchUser ? ee.switchUser() : e === "web" && ee.openWeb ? ee.openWeb() : window.dispatchEvent(new CustomEvent("logicweaver:profile-menu-action", { detail: { action: e } }));
  },
  setActions(e) {
    ee = { ...ee, ...e };
  }
}, Ri = [
  "todoist",
  "card-github",
  "daily-aihot",
  "daily-bilibili",
  "daily-youtube"
], pr = "lw_active_card";
function vs() {
  try {
    if (typeof localStorage < "u" && localStorage.removeItem(pr), typeof window < "u" && window.location?.hash) {
      const e = window.location.hash.replace(/^#/, "");
      if (Ri.includes(e))
        return e;
    }
    if (typeof sessionStorage < "u") {
      const e = sessionStorage.getItem(pr);
      if (e && Ri.includes(e))
        return e;
    }
  } catch {
  }
  return null;
}
const le = K({
  activeId: vs()
});
typeof window < "u" && Pe(
  () => le.activeId,
  (e) => {
    try {
      e ? (sessionStorage.setItem(pr, e), window.location.hash !== `#${e}` && history.replaceState(null, "", `#${e}`)) : (sessionStorage.removeItem(pr), window.location.hash && history.replaceState(null, "", window.location.pathname + window.location.search));
    } catch {
    }
  },
  { immediate: !0 }
);
let mr;
function ec(e) {
  mr = e;
}
function _r(e) {
  if (!mr) throw new Error("Fullscreen card host not ready");
  mr.enter(e);
}
function Dt(e) {
  le.activeId === e && mr?.exit();
}
function Ss(e) {
  typeof document > "u" || (document.documentElement?.classList.remove("has-card-fullscreen"), document.body && (document.body.classList.toggle("has-card-fullscreen", !!e), document.body.dataset.page = e ? "daily" : "home"));
}
const As = {
  "bilibili.html": "daily-bilibili",
  "github.html": "card-github",
  "aihot.html": "daily-aihot",
  "youtube.html": "daily-youtube"
};
function an() {
  return typeof location > "u" ? null : As[location.pathname.split("/").pop() || ""] || null;
}
const tc = Ie(() => {
  const e = an() || le.activeId;
  if (e) return e;
  const t = Yn.activeId;
  return t && Er.isActive(t) ? t : "home";
}), Es = {
  schemaVersion: 1,
  id: "card-github",
  title: "github插件",
  icon: "assets/nav-github.svg",
  presentation: "card",
  dockBefore: "daily-aihot",
  rootId: "card-github",
  settingsKeys: ["ghUser", "ghToken", "ghAiServiceConfigV1", "ghArchifyWebhookUrl"],
  capabilities: ["workspace:fullscreen", "view:retained", "github:repositories"],
  loadView: () => import("./GitHubWorkspaceCard-NVFgwitw.js").then((e) => e.default),
  lifecycle: {
    isVisible: () => le.activeId === "card-github",
    open: () => _r("card-github"),
    hide: () => Dt("card-github"),
    // Existing card menus do not expose Quit/Reload. Do not introduce a destructive new path
    // until settings drafts and every child editor provide an aggregate unmount guard.
    canUnmount: () => !1,
    unmountBlockedMessage: "GitHub 工作区保留原有隐藏保活设计；尚未开放独立退出/重载，以免丢失草稿。"
  }
}, _s = K({
  showWeather: !0,
  showSites: !0,
  showBili: !0,
  showYouTube: !0,
  showTodo: !0,
  showBookmarkPanel: !0
}), Cs = {
  schemaVersion: 1,
  id: "daily-youtube",
  title: "youtube插件",
  icon: "assets/nav-youtube.svg",
  presentation: "card",
  rootId: "daily-youtube",
  showInDock: !0,
  settingsKeys: ["youtubeModuleSettingsV1"],
  capabilities: ["workspace:fullscreen", "view:retained", "youtube:recommendations", "youtube:favorites"],
  loadView: () => import("./YouTubeCard-D7Cq5B65.js").then((e) => e.Y).then((e) => e.default),
  lifecycle: {
    // Match the original retained-mount condition, including the shared homepage preference.
    isVisible: () => le.activeId === "daily-youtube" && _s.showYouTube,
    open: () => _r("daily-youtube"),
    hide: () => Dt("daily-youtube"),
    // Preserve existing card menus. Settings drafts and shared writes are not yet
    // aggregated into a safe independent Quit/Reload guard.
    canUnmount: () => !1,
    unmountBlockedMessage: "YouTube 工作区保留原有隐藏保活设计；尚未开放独立退出/重载，以免丢失设置草稿或打断收藏操作。"
  }
}, Ts = {
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
  loadView: () => import("./BilibiliWorkspace-B_giV28C.js").then((e) => e.default),
  lifecycle: {
    isVisible: () => le.activeId === "daily-bilibili",
    open: () => _r("daily-bilibili"),
    hide: () => Dt("daily-bilibili"),
    // Hide must not dispose shared radio/player state or interrupt folder/cache operations.
    canUnmount: () => !1,
    unmountBlockedMessage: "B站收藏保留原有隐藏保活设计；尚未开放独立退出/重载，以免打断播放、收藏或缓存操作。"
  }
}, ks = {
  schemaVersion: 1,
  id: "daily-aihot",
  title: "ai hot插件",
  icon: "assets/nav-aihot.svg",
  presentation: "card",
  rootId: "daily-aihot",
  // Existing localStorage preferences; registration neither reads nor migrates them.
  settingsKeys: ["lw-info-feed-view", "lw-aihot-feed-cat", "lw-aihot-feed-window"],
  capabilities: ["workspace:fullscreen", "view:retained", "aihot:aggregate"],
  loadView: () => import("./AihotFeed-CfoE6dHk.js").then((e) => e.default),
  lifecycle: {
    isVisible: () => le.activeId === "daily-aihot",
    open: () => _r("daily-aihot"),
    hide: () => Dt("daily-aihot"),
    // Keep the original retained card. Its view owns list activity;
    // the separate article reader is not owned or closed by this module.
    canUnmount: () => !1,
    unmountBlockedMessage: "AI HOT 保留原有隐藏保活设计；尚未开放独立退出/重载。"
  }
}, Is = {
  schemaVersion: 1,
  id: "stickers",
  title: "表情包模块",
  emoji: "😺",
  // Keep the chat picker's library management window without a standalone Dock entry.
  showInDock: !1,
  rootId: "vue-stickers-dialog-root",
  settingsKeys: rs,
  capabilities: ["folder:explicit-permission", "image:explicit-save-delete", "image:local-preview", "image:clipboard"],
  loadView: () => import("./StickersDialog-DkCsTFTJ.js").then((e) => e.default),
  lifecycle: {
    isVisible: () => Gt.visible,
    open: () => {
      Gt.visible = !0;
    },
    hide: () => {
      Gt.visible = !1, is();
    },
    canUnmount: () => Gt.pendingWrites === 0,
    unmountBlockedMessage: "图片保存/删除、目录授权或偏好正在处理，暂不能退出/重载；可以先隐藏，已提交操作不会撤回。"
  }
}, Us = "neteaseApiUrl", Ms = [Us], Ps = {
  schemaVersion: 1,
  id: "music",
  title: "网易云模块",
  icon: "assets/netease.svg",
  rootId: "vue-music-workspace-root",
  settingsKeys: Ms,
  capabilities: ["catalog:read", "settings:endpoint", "account:explicit-login-logout", "playback:shared-home-controls"],
  loadView: () => import("./NeteaseWorkspaceDialog-BCrSRuOA.js").then((e) => e.default),
  lifecycle: {
    isVisible: () => ve.visible,
    open: () => {
      ve.visible = !0;
    },
    hide: () => {
      ve.visible = !1, ms();
    },
    canUnmount: () => ve.pendingWrites === 0,
    unmountBlockedMessage: "节点保存、登录确认/退出或记录写入正在处理，暂不能退出/重载；可以隐藏。退出窗口不会停止首页播放。"
  }
}, Rs = Object.freeze([
  "todoistToken",
  "todoistActiveProjectIdV1"
]), Os = {
  schemaVersion: 1,
  id: "todoist",
  title: "todoist",
  icon: "assets/nav-todoist.svg",
  dockBefore: "stickers",
  rootId: "todoist",
  settingsKeys: Rs,
  capabilities: ["view:retained", "tasks:read-write", "attachments:explicit-upload", "settings:account-rules", "calendar:shared"],
  loadView: () => import("./TodoistWorkspace-BBvcHwl2.js").then((e) => e.default),
  lifecycle: {
    isVisible: () => Ht.visible,
    open: () => {
      Ht.visible = !0;
    },
    hide: () => {
      Ht.visible = !1, ns();
    },
    canUnmount: () => Ht.pendingWrites === 0,
    unmountBlockedMessage: "任务、附件、评论或配置正在写入，暂不能退出/重载；可以隐藏。首页限时任务和独立日历不会随窗口退出停止。"
  }
}, Ns = 1, Ls = 1, Ds = { text: { legacy: !0 }, image: { legacy: !1 }, music: { legacy: !0 }, bilibili: { legacy: !0 }, github: { legacy: !0 }, bili_series: { legacy: !0 }, aihot: { legacy: !0 }, youtube: { legacy: !0 }, website: { legacy: !0 }, server_invite: { legacy: !0 }, music_party: { legacy: !0 } }, xs = ["image/png", "image/jpeg", "image/gif", "image/webp"], $s = { messageBytes: 262144, imageMessageBytes: 2097152, imageBytes: 1048576, textChars: 8e3, imageMaxDimension: 8192, imageMaxPixels: 16777216 }, lt = {
  schema: Ns,
  protocol: Ls,
  messageTypes: Ds,
  imageMimeTypes: xs,
  limits: $s
};
function Bs(e) {
  try {
    if (e.length > Math.ceil(lt.limits.imageBytes / 3) * 4 + 64) return;
    const t = e.indexOf(","), r = e.slice(5, e.indexOf(";")), i = Uint8Array.from(atob(e.slice(t + 1)), (o) => o.charCodeAt(0)), n = new DataView(i.buffer), s = (o, a) => String.fromCharCode(...i.slice(o, a));
    if (r === "image/png" && i.length >= 33 && s(0, 8) === `PNG\r

` && n.getUint32(8) === 13 && s(12, 16) === "IHDR") return [n.getUint32(16), n.getUint32(20)];
    if (r === "image/gif" && i.length >= 13 && ["GIF87a", "GIF89a"].includes(s(0, 6))) return [n.getUint16(6, !0), n.getUint16(8, !0)];
    if (r === "image/webp" && i.length >= 25 && s(0, 4) === "RIFF" && s(8, 12) === "WEBP" && n.getUint32(4, !0) + 8 === i.length) {
      const o = s(12, 16);
      if (o === "VP8X" && i.length >= 30) return [1 + i[24] + (i[25] << 8) + (i[26] << 16), 1 + i[27] + (i[28] << 8) + (i[29] << 16)];
      if (o === "VP8L" && i[20] === 47) {
        const a = n.getUint32(21, !0);
        return [1 + (a & 16383), 1 + (a >>> 14 & 16383)];
      }
      if (o === "VP8 " && i.length >= 30 && s(23, 26) === "*") return [n.getUint16(26, !0) & 16383, n.getUint16(28, !0) & 16383];
    }
    if (r === "image/jpeg" && i[0] === 255 && i[1] === 216) {
      let o = 2;
      for (; o + 4 <= i.length && i[o] === 255; ) {
        for (; o < i.length && i[o] === 255; ) o++;
        if (o >= i.length) break;
        const a = i[o++];
        if (a === 216 || a === 1 || a >= 208 && a <= 215) continue;
        if (a === 217 || a === 218 || o + 2 > i.length) break;
        const c = n.getUint16(o);
        if (c < 2 || o + c > i.length) break;
        if ([192, 193, 194, 195, 197, 198, 199, 201, 202, 203, 205, 206, 207].includes(a) && c >= 8) return [n.getUint16(o + 5), n.getUint16(o + 3)];
        o += c;
      }
    }
  } catch {
  }
}
const Ws = lt.protocol, Ue = Object.freeze({ ...lt.limits }), Zr = Object.freeze(Object.keys(lt.messageTypes)), ei = Object.freeze([...lt.imageMimeTypes]), ue = (e) => !!e && typeof e == "object" && !Array.isArray(e), jr = (e) => typeof e == "number" && Number.isSafeInteger(e) && e > 0;
function Cr() {
  return { status: "unknown", reason: "请先完成当前服务器的身份同步，再发送消息。", messageTypes: [], imageMimeTypes: [], limits: { ...Ue } };
}
function Yt() {
  return { ...Cr(), status: "incompatible", reason: "服务端消息能力格式无效或协议版本不兼容，请服主核对前后端版本；待发内容已保留。" };
}
function js(e) {
  if (e === void 0 || ue(e) && !("schema" in e) && !("protocol" in e) && !("messageTypes" in e) && !("limits" in e)) {
    if (e !== void 0 && !ue(e)) return Yt();
    const n = ue(e) && e.imageMessages === 1;
    return ue(e) && e.maxImageBytes !== void 0 && !jr(e.maxImageBytes) ? Yt() : {
      status: "legacy",
      reason: n ? "" : "此旧版服务端未声明图片能力，请服主升级；待发图片已保留。",
      messageTypes: Zr.filter((s) => s === "image" ? n : lt.messageTypes[s].legacy),
      imageMimeTypes: n ? [...ei] : [],
      limits: { ...Ue, imageBytes: n && ue(e) && jr(e.maxImageBytes) ? Math.min(e.maxImageBytes, Ue.imageBytes) : Ue.imageBytes }
    };
  }
  if (!ue(e) || e.schema !== 1 || e.protocol !== Ws || !ue(e.limits) || !Array.isArray(e.messageTypes) || e.messageTypes.length > 64 || e.messageTypes.some((n) => typeof n != "string") || !Array.isArray(e.imageMimeTypes) || e.imageMimeTypes.length > 16 || e.imageMimeTypes.some((n) => typeof n != "string")) return Yt();
  const t = { ...Ue };
  for (const n of Object.keys(t)) {
    const s = e.limits[n];
    if (!jr(s)) return Yt();
    t[n] = Math.min(t[n], s);
  }
  const r = ei.filter((n) => e.imageMimeTypes.includes(n)), i = Zr.filter((n) => e.messageTypes.includes(n) && (n !== "image" || e.imageMessages === 1 && r.length > 0));
  return { status: "supported", reason: i.includes("image") ? "" : "此服务端未启用兼容的图片消息，待发图片已保留。", messageTypes: i, imageMimeTypes: r, limits: t };
}
function Vs(e, t = Ue, r = ei) {
  if (typeof e != "string" || e.length > Math.ceil(t.imageBytes / 3) * 4 + 32) return !1;
  const i = /^data:(image\/[a-z0-9.+-]+);base64,([A-Za-z0-9+/]+={0,2})$/.exec(e);
  if (!i || !r.includes(i[1])) return !1;
  const n = i[2], s = n.length / 4 * 3 - (n.endsWith("==") ? 2 : n.endsWith("=") ? 1 : 0);
  return n.length % 4 === 0 && s > 0 && s <= t.imageBytes;
}
function kt(e, t) {
  if (!ue(t) || typeof t.type != "string" || typeof t.content != "string" || typeof t.id != "string" || !t.id || typeof t.timestamp != "number" || !Number.isFinite(t.timestamp) || !ue(t.sender) || typeof t.sender.uid != "string" || typeof t.sender.name != "string" || typeof t.sender.avatar != "string") return "消息格式无效，原记录已保留，请核对后重新发送。";
  const r = ue(t.meta) ? t.meta.imageUrl : void 0;
  if (e.status === "unknown" || e.status === "incompatible") return e.reason;
  if (!e.messageTypes.includes(t.type)) return t.type === "image" ? e.reason || "服务端未启用图片消息，待发图片已保留。" : "服务端不支持此消息类型，内容已保留。";
  if (t.content.length > e.limits.textChars) return "文字超过服务端声明的长度上限，请缩短后再发送。";
  if (t.type === "image" && !Vs(r, e.limits, e.imageMimeTypes)) return "图片格式或大小不符合服务端能力，请重新选择或压缩；原内容已保留。";
  if (t.type === "image") {
    const s = Bs(r);
    if (!s || s.some((o) => o < 1 || o > e.limits.imageMaxDimension) || s[0] * s[1] > e.limits.imageMaxPixels) return "图片文件头或像素尺寸不符合当前服务端限制，请重新选择；原内容已保留。";
  }
  let i;
  try {
    i = JSON.stringify({ message: t });
  } catch {
    return "消息不能安全编码，原记录已保留，请核对后重新发送。";
  }
  return new TextEncoder().encode(i).byteLength > (t.type === "image" ? e.limits.imageMessageBytes : e.limits.messageBytes) ? "消息超过服务端声明的JSON大小上限，内容已保留。" : "";
}
const cn = Ue.imageMessageBytes, ln = Ue.textChars, It = (e) => !!e && typeof e == "object" && !Array.isArray(e), ae = (e, t) => typeof e == "string" && e.length <= t;
function xt(e) {
  if (!ae(e, 4096)) return "";
  try {
    const t = new URL(e);
    return ["https:", "http:"].includes(t.protocol) && !t.username && !t.password ? t.href : "";
  } catch {
    return "";
  }
}
function Tr(e) {
  return typeof e != "string" ? "" : e.length <= cn && /^data:image\/(?:png|jpeg|gif|webp);base64,[A-Za-z0-9+/=\r\n]+$/i.test(e) ? e : xt(e);
}
function kr(e) {
  if (!ae(e, 4096)) throw new Error("服务器地址过长");
  if (!e.trim()) return "";
  let t;
  try {
    t = new URL(e.trim());
  } catch {
    throw new Error("服务器地址格式不正确");
  }
  const r = t.hostname, i = r === "localhost" || r === "[::1]" || /^(127\.|10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.)/.test(r);
  if (t.protocol !== "wss:" && !(t.protocol === "ws:" && i) || t.username || t.password || t.hash)
    throw new Error("公网服务器须使用 WSS；WS 仅限本机或局域网，地址不能含用户信息或片段");
  return t.href;
}
function un(e, t) {
  if (!(!It(e) || !["bilibili", "github", "music", "aihot", "youtube", "idle"].includes(String(e.type)) || !ae(e.title, 500)))
    return { type: e.type, title: e.title, url: xt(e.url) || void 0, updatedAt: t };
}
function dn(e, t = 0) {
  if (!It(e) || t > 2) return;
  const r = /* @__PURE__ */ Object.create(null);
  for (const [i, n] of Object.entries(e).slice(0, 64))
    ["__proto__", "constructor", "prototype", "rawSong"].includes(i) || (typeof n == "string" && n.length <= (i === "imageUrl" ? cn : ln) ? r[i] = /(?:cover|avatar|face|imageUrl)$/i.test(i) ? Tr(n) : /url$/i.test(i) ? xt(n) : n : typeof n == "boolean" || typeof n == "number" && Number.isFinite(n) ? r[i] = n : i === "seriesItems" && Array.isArray(n) && (r[i] = n.slice(0, 100).map((s) => dn(s, t + 1)).filter(Boolean)));
  return r;
}
function $t(e) {
  return fn(e, Date.now());
}
function fn(e, t) {
  if (!It(e) || !It(e.sender) || !ae(e.id, 160) || !e.id || !ae(e.sender.uid, 160) || !e.sender.uid || !ae(e.sender.name, 100) || !ae(e.content, ln) || ![...Zr, "system"].includes(String(e.type)) || typeof e.timestamp != "number" || !Number.isFinite(e.timestamp)) return;
  const r = Tr(e.sender.avatar) || (ae(e.sender.avatar, 32) && !/[:/]/.test(e.sender.avatar) ? e.sender.avatar : "👤");
  return { id: e.id, sender: { uid: e.sender.uid, name: e.sender.name, avatar: r, activity: un(e.sender.activity, t) }, type: e.type, content: e.content, timestamp: e.timestamp, meta: dn(e.meta) };
}
function Fs(e, t) {
  if (!It(e) || !ae(e.uid, 160) || !e.uid || !ae(e.name, 100)) return;
  const r = Tr(e.avatar) || (ae(e.avatar, 32) && !/[:/]/.test(e.avatar) ? e.avatar : "👤");
  return { uid: e.uid, name: e.name, avatar: r, activity: un(e.activity, t) };
}
const Ut = be(""), rc = be(!1), ui = be(0);
let pt, Fe = Promise.resolve();
const ge = /* @__PURE__ */ new Map();
function di(e, t, r) {
  return JSON.stringify([e, t, r]);
}
function Ir() {
  return pt || (pt = new Promise((e, t) => {
    const r = indexedDB.open("lw-chat-history", 2);
    r.onupgradeneeded = () => {
      r.result.objectStoreNames.contains("messages") || r.result.createObjectStore("messages", { keyPath: ["scope", "id"] }).createIndex("timeline", ["scope", "timestamp", "id"], { unique: !0 }), r.result.objectStoreNames.contains("relay-cursors") || r.result.createObjectStore("relay-cursors");
    }, r.onerror = () => t(r.error), r.onblocked = () => {
      Ut.value = "历史数据库升级被其他标签页阻塞，请关闭旧标签页后重试";
    }, r.onsuccess = () => {
      const i = r.result;
      i.onversionchange = () => {
        i.close(), pt = void 0;
      }, e(i);
    };
  }).catch((e) => {
    throw pt = void 0, e;
  })), pt;
}
function Ur(e, t) {
  for (const r of t) {
    const i = $t(r);
    if (!i || i.id === "sys-welcome") continue;
    const n = { scope: e, id: i.id, timestamp: i.timestamp, message: JSON.parse(JSON.stringify(i)) };
    ge.set(JSON.stringify([e, n.id]), n);
  }
  return ui.value = ge.size, qs();
}
function qs() {
  return Fe = Fe.then(async () => {
    if (!ge.size) return;
    const e = [...ge.entries()];
    try {
      const t = await Ir();
      await new Promise((r, i) => {
        const n = t.transaction("messages", "readwrite");
        n.oncomplete = () => r(), n.onabort = () => i(n.error), n.onerror = () => i(n.error);
        const s = n.objectStore("messages");
        for (const [, o] of e) s.put(o);
      });
      for (const [r, i] of e) ge.get(r) === i && ge.delete(r);
      ui.value = ge.size, Ut.value = "";
    } catch {
      Ut.value = "历史未能写入磁盘（空间不足或数据库不可用）。待存消息保留在内存，请先导出备份，勿关闭或刷新。";
    }
  }), Fe;
}
async function Gs(e) {
  await Fe;
  const t = await Ir();
  return new Promise((r, i) => {
    const n = t.transaction("relay-cursors", "readonly"), s = n.objectStore("relay-cursors").get(e);
    n.oncomplete = () => r(Number.isSafeInteger(s.result) ? s.result : 0), n.onabort = () => i(n.error), s.onerror = () => i(s.error);
  });
}
function Hs(e, t, r) {
  const i = Fe.then(async () => {
    const n = await Ir();
    await new Promise((s, o) => {
      const a = n.transaction(["messages", "relay-cursors"], "readwrite"), c = a.objectStore("messages");
      for (const h of t) c.put({ scope: e, id: h.id, timestamp: h.timestamp, message: JSON.parse(JSON.stringify(h)) });
      const l = a.objectStore("relay-cursors"), u = l.get(e);
      u.onsuccess = () => l.put(Math.max(Number(u.result) || 0, r), e), a.oncomplete = () => s(), a.onabort = () => o(a.error), a.onerror = () => o(a.error);
    });
  });
  return Fe = i.catch(() => {
  }), i;
}
async function pn(e, t, r = 200) {
  await Fe;
  const i = await Ir();
  return new Promise((n, s) => {
    const o = i.transaction("messages", "readonly"), a = [e, -Number.MAX_VALUE, ""], c = t ? [e, t.timestamp, t.id] : [e, Number.MAX_VALUE, "￿"], l = IDBKeyRange.bound(a, c, !1, !!t), u = o.objectStore("messages").index("timeline").openCursor(l, "prev"), h = [];
    u.onerror = () => s(u.error), o.onabort = () => s(o.error), u.onsuccess = () => {
      const p = u.result;
      if (!p || h.length >= r) {
        n(h.reverse());
        return;
      }
      const g = $t(p.value.message);
      g && h.push(g), p.continue();
    };
  });
}
async function ic(e) {
  const t = /* @__PURE__ */ new Map();
  let r;
  for (; ; ) {
    const i = await pn(e, r, 500);
    for (const n of i) t.set(n.id, n);
    if (i.length < 500) break;
    r = i[0];
  }
  for (const i of ge.values()) i.scope === e && t.set(i.id, i.message);
  return [...t.values()].sort((i, n) => i.timestamp - n.timestamp || i.id.localeCompare(n.id));
}
function nc(e) {
  return [...ge.values()].filter((t) => t.scope === e).map((t) => t.message);
}
function hr(e) {
  const t = xt(e);
  return t && t.length <= 1e3 && !/\/noface\.(jpg|png)(?:[?#]|$)/i.test(t) ? t : "";
}
function Mr(e, t = "") {
  const r = hr(e) || hr(t);
  return r || (e && e.length <= 8 && !/[:/]/.test(e) ? e : "🦫");
}
const Pr = "lw_chat_server_url", mn = "lw_chat_user_id", Rr = "lw_chat_user_name", Or = "lw_chat_user_avatar", pe = "lw_chat_groups", hn = "lw_chat_current_group", Ks = "lw_chat_rooms", zs = "lw_chat_friends", gn = "lw_chat_friend_requests_v1", sr = "lw_chat_current_room", yn = "";
function fe(e, t) {
  try {
    if (typeof localStorage < "u") {
      const r = localStorage.getItem(e);
      if (e === Pr && r && localStorage.getItem("lw_chat_server_explicit") !== "true" && (r.includes("sslip.io") || r.includes("your-domain.com")))
        return localStorage.removeItem(e), t;
      if (r !== null) return r;
    }
  } catch {
  }
  return t;
}
function $(e, t) {
  try {
    typeof localStorage < "u" && localStorage.setItem(e, t);
  } catch {
  }
}
function bt(e, t) {
  try {
    if (typeof localStorage < "u") {
      const r = localStorage.getItem(e);
      if (r) return JSON.parse(r);
    }
  } catch {
  }
  return t;
}
const Js = [
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
], Ys = [
  { id: "main", name: "自习室大厅", icon: "🏠" },
  { id: "dev", name: "代码与摸鱼", icon: "💻" },
  { id: "music", name: "音乐咖啡馆", icon: "🎵" }
];
function Qs() {
  const e = ["摸鱼", "冲浪", "喝茶", "听歌", "看番", "敲代码", "发呆", "漫游"], t = ["海狸", "企鹅", "猫猫", "柴犬", "仓鼠", "水獭", "考拉", "熊猫"], r = e[Math.floor(Math.random() * e.length)], i = t[Math.floor(Math.random() * t.length)], n = Math.floor(1e3 + Math.random() * 9e3);
  return `${r}的${i}#${n}`;
}
function Xs() {
  const e = ["🦫", "🐧", "🐱", "🐶", "🐹", "🦦", "🐨", "🐼", "🦊", "🐰"];
  return e[Math.floor(Math.random() * e.length)];
}
const wn = fe(mn, ""), fi = wn || `u_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`;
wn || $(mn, fi);
const gr = fe(Rr, ""), Zs = !gr || gr.includes("#"), Oi = ce.userName && ce.userName !== "哔哩哔哩用户" && ce.userName !== "浏览器指纹与环境" ? ce.userName : "", bn = Zs && Oi ? Oi : gr || Qs();
gr || $(Rr, bn);
const tt = fe(Or, ""), eo = !tt || tt.length <= 4 || tt.startsWith("data:") || tt.includes("/noface."), Ni = hr(ce.avatarUrl), vn = eo && Ni ? Ni : tt || Xs();
tt || $(Or, vn);
const f = K({
  visible: !1,
  shareActivity: fe("lw_chat_share_activity", "true") !== "false",
  error: "",
  connected: !1,
  connecting: !1,
  onlineCount: 1,
  serverUrl: fe(Pr, yn),
  currentGroupId: fe(hn, "hub_main"),
  currentChannelId: "general",
  groups: bt(pe, Js),
  groupMembers: [],
  currentRoomId: fe(sr, "main"),
  rooms: bt(Ks, Ys),
  friends: bt(zs, []),
  friendRequests: bt(gn, []),
  currentUser: {
    uid: fi,
    name: bn,
    avatar: vn
  },
  messages: Mt(fe(sr, "main")).length > 0 ? Mt(fe(sr, "main")) : [
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
io();
Pe(
  () => [ce.avatarUrl, ce.userName],
  ([e, t]) => {
    const r = f.currentUser.avatar;
    hr(e) && (!r || r.length <= 4 || r.startsWith("data:") || r.includes("/noface.") || /^https?:\/\/[^/]*hdslb\.com\//i.test(r)) && (f.currentUser.avatar = e, $(Or, e)), t && t !== "哔哩哔哩用户" && t !== "浏览器指纹与环境" && (!f.currentUser.name || f.currentUser.name.includes("#") || f.currentUser.name.startsWith("摸鱼")) && (f.currentUser.name = t, $(Rr, t));
  },
  { immediate: !0 }
);
const Li = K({ scope: "", ready: !1 });
let Qt = 0;
Pe(
  () => di(f.currentUser.uid, f.serverUrl, f.currentRoomId),
  async (e) => {
    const t = ++Qt;
    Object.assign(Li, { scope: e, ready: !1 });
    const { currentRoomId: r, serverUrl: i, currentUser: n } = f, s = Mt(r, i, n.uid);
    await Ur(e, s);
    try {
      const o = await pn(e);
      if (t !== Qt) return;
      const a = new Map(o.map((c) => [c.id, c]));
      for (const c of f.messages) c.id !== "sys-welcome" && a.set(c.id, c);
      f.messages = [...a.values()].sort((c, l) => c.timestamp - l.timestamp || c.id.localeCompare(l.id)).slice(-200);
    } catch {
      t === Qt && (Ut.value = "无法读取历史数据库，现有缓存未删除，请导出备份后检查浏览器存储。");
    } finally {
      t === Qt && (Li.ready = !0);
    }
  },
  { immediate: !0 }
);
function sc(e, t) {
  f.currentUser.name = e.trim() || f.currentUser.name, f.currentUser.avatar = t.trim() || f.currentUser.avatar, $(Rr, f.currentUser.name), $(Or, f.currentUser.avatar);
}
function to(e, t, r) {
  return "lw_chat_history_v2_" + JSON.stringify([r, t, e]);
}
function Mt(e, t = fe(Pr, yn), r = fi) {
  try {
    const i = localStorage.getItem(to(e, t, r));
    if (i) {
      const n = JSON.parse(i);
      if (Array.isArray(n)) return n.map($t).filter((s) => !!s).slice(-200);
    }
  } catch {
  }
  return [];
}
function ro(e, t) {
  const r = di(f.currentUser.uid, f.serverUrl, e);
  Ur(r, t);
}
function Sn(e, t) {
  if (!e) return "";
  const r = new URL(kr(e));
  return r.searchParams.set("room", t), r.href;
}
function ti(e, t = !0, r = !1) {
  if (t && Ut.value && ui.value > 0)
    return f.error = "仍有未保存消息，请先重试保存或导出备份，暂不切换房间", !1;
  try {
    e.endpoint = kr(e.endpoint), localStorage.setItem("lw_chat_session_v1", JSON.stringify(e));
  } catch {
    return f.error = "会话保存失败或地址无效，未切换房间", !1;
  }
  const i = e.endpoint !== f.serverUrl || e.roomId !== f.currentRoomId;
  return i && t && ro(f.currentRoomId, f.messages), Object.assign(f, {
    currentGroupId: e.groupId,
    currentChannelId: e.channelId,
    currentRoomId: e.roomId,
    serverUrl: e.endpoint
  }), i && (f.messages = Mt(e.roomId, e.endpoint, f.currentUser.uid), f.userActivities = {}, f.unreadCount = 0, r || (f.connected = !1, f.connecting = !1), f.onlineCount = 0), $(Pr, e.endpoint), $(sr, e.roomId), $(hn, e.groupId), !0;
}
function Bt(e, t = "local", r = !1) {
  let i, n = t;
  try {
    if (i = kr(e), i) {
      const a = new URL(i);
      if (n = a.searchParams.get("room") || "default", !n || n.length > 160) throw new Error();
      a.searchParams.set("room", n), i = a.href;
    }
  } catch {
    return f.error = "房间地址无效，未切换会话", !1;
  }
  for (const a of f.groups)
    for (const c of a.channels)
      if ((c.endpoint ?? Sn(a.endpoint ?? "", `${a.id}__${c.id}`)) === i && (i || c.id === n))
        return ti({ groupId: a.id, channelId: c.id, roomId: n, endpoint: i }, !0, r);
  const s = "joined_" + crypto.randomUUID(), o = {
    id: s,
    name: i ? "受邀房间" : "本地房间",
    icon: "💬",
    endpoint: i,
    isCustom: !0,
    channels: [{ id: n, name: n, icon: "💬", endpoint: i }]
  };
  return f.groups.push(o), ti({ groupId: s, channelId: n, roomId: n, endpoint: i }, !0, r) ? ($(pe, JSON.stringify(f.groups)), !0) : (f.groups.pop(), !1);
}
function io() {
  for (const t of f.groups) t.endpoint ??= f.serverUrl;
  const e = bt("lw_chat_session_v1", null);
  if (e && typeof e.endpoint == "string" && typeof e.roomId == "string") {
    const t = f.groups.find((i) => i.id === e.groupId), r = t?.channels.find((i) => i.id === e.channelId);
    if (t && r)
      try {
        const i = kr(e.endpoint), n = i ? new URL(i).searchParams.get("room") || "default" : e.roomId;
        r.endpoint = i, Object.assign(f, {
          currentGroupId: t.id,
          currentChannelId: r.id,
          currentRoomId: n,
          serverUrl: i,
          messages: Mt(n, i, f.currentUser.uid)
        }), $(pe, JSON.stringify(f.groups));
        return;
      } catch {
      }
  }
  Bt(f.serverUrl, f.currentRoomId), $(pe, JSON.stringify(f.groups));
}
function oc(e) {
  f.friendRequests = f.friendRequests.filter((t) => t.id !== e), $(gn, JSON.stringify(f.friendRequests));
}
function Nr(e, t) {
  const r = f.groups.find((o) => o.id === e), i = r?.channels.find((o) => o.id === t) || r?.channels[0];
  if (!r || !i) return !1;
  const n = i.endpoint !== void 0 ? i.endpoint ? new URL(i.endpoint).searchParams.get("room") || "default" : i.id : `${r.id}__${i.id}`, s = i.endpoint ?? Sn(r.endpoint ?? "", n);
  return ti({ groupId: r.id, channelId: i.id, roomId: n, endpoint: s });
}
function ac(e, t = "👥") {
  const r = e.trim() || "新群组", i = "group_" + Math.random().toString(36).slice(2, 8), n = {
    id: i,
    name: r,
    icon: t,
    channels: [
      { id: "general", name: "综合讨论", icon: "💬" },
      { id: "music", name: "音乐分享", icon: "🎵" },
      { id: "bili", name: "B站动态", icon: "📺" }
    ],
    endpoint: f.serverUrl,
    isCustom: !0
  };
  return f.groups.push(n), $(pe, JSON.stringify(f.groups)), Nr(i, "general"), n;
}
function cc(e) {
  if (f.groups.length <= 1) return;
  const t = f.groups.filter((r) => r.id !== e);
  if (f.currentGroupId === e) {
    const r = t[0];
    if (!r || !Nr(r.id, r.channels[0]?.id || "general")) return;
  }
  f.groups = t, $(pe, JSON.stringify(f.groups));
}
function lc(e, t = "💬") {
  const r = f.groups.find((n) => n.id === f.currentGroupId);
  if (!r) return;
  const i = "ch_" + Math.random().toString(36).slice(2, 6);
  r.channels.push({ id: i, name: e.trim() || "新频道", icon: t }), $(pe, JSON.stringify(f.groups)), Nr(r.id, i);
}
function uc(e, t, r) {
  const i = f.groups.find((n) => n.id === e);
  i && (i.name = t.trim() || i.name, r && (i.icon = r), $(pe, JSON.stringify(f.groups)));
}
function dc(e, t, r, i) {
  const n = f.groups.find((o) => o.id === e);
  if (!n) return;
  const s = n.channels.find((o) => o.id === t);
  s && (s.name = r.trim() || s.name, i && (s.icon = i), $(pe, JSON.stringify(f.groups)));
}
function fc(e, t) {
  const r = f.groups.find((n) => n.id === e);
  if (!r || r.channels.length <= 1) return;
  const i = r.channels.filter((n) => n.id !== t);
  f.currentGroupId === e && f.currentChannelId === t && (!i[0] || !Nr(e, i[0].id)) || (r.channels = i, $(pe, JSON.stringify(f.groups)));
}
const I = (e) => JSON.stringify([e.origin, e.room, e.uid]);
function Pt(e) {
  return typeof e == "string" && /^[A-Za-z0-9_-]{43}$/.test(e);
}
function Wt(e) {
  try {
    if (!e || typeof e != "object") throw new Error();
    const t = e;
    if (typeof t.origin != "string" || typeof t.room != "string" || typeof t.uid != "string") throw new Error();
    const r = new URL(t.origin);
    if (!["http:", "https:"].includes(r.protocol) || r.username || r.password || r.pathname !== "/" || r.search || r.hash || !/^[A-Za-z0-9_-]{1,160}$/.test(t.room) || !/^[A-Za-z0-9_-]{1,160}$/.test(t.uid)) throw new Error();
    if (r.protocol === "http:" && !["localhost", "127.0.0.1", "[::1]"].includes(r.hostname)) throw new Error();
    return { origin: r.origin, room: t.room, uid: t.uid };
  } catch {
    throw new Error("聊天室配置无效：公网必须使用 HTTPS；HTTP 仅允许 localhost、127.0.0.1 或 ::1");
  }
}
const pi = "lw_private_chat_v1", v = K({ room: null, diagnostic: "" });
function mi() {
  let e = null, t = "";
  try {
    const r = localStorage.getItem(pi);
    if (r === null) t = "当前浏览器配置中没有保存聊天室连接。请确认使用的是原来的浏览器用户和插件，或重新导入自己的邀请。";
    else
      try {
        e = Wt(JSON.parse(r));
      } catch {
        t = "已保存的聊天室配置无效或使用了公网 HTTP，原记录和凭证未删除。请先配置 HTTPS，再按部署指南重新导入匹配当前聊天 ID 的邀请。";
      }
  } catch {
    t = "无法读取本机存储，请检查浏览器是否限制存储访问。";
  }
  v.diagnostic = t, JSON.stringify(e) !== JSON.stringify(v.room) && (v.room = e);
}
mi();
window.addEventListener("storage", (e) => {
  (e.key === pi || e.key === null) && mi();
});
window.addEventListener("focus", mi);
const no = Ie(() => !!v.room);
function An(e) {
  return e.origin.replace(/^http:/, "ws:").replace(/^https:/, "wss:") + "/ws?room=" + encodeURIComponent(e.room);
}
function so(e) {
  const t = Wt(e);
  localStorage.setItem(pi, JSON.stringify(t)), v.diagnostic = "", v.room = t;
}
const hi = be(0), Q = be(""), gi = /* @__PURE__ */ new Map();
let Vr;
function ut() {
  return Vr ||= new Promise((e, t) => {
    const r = indexedDB.open("lw-chat-delivery", 1);
    r.onupgradeneeded = () => {
      r.result.createObjectStore("deliveries", { keyPath: ["scope", "id", "uid"] }).createIndex("scope", "scope");
    }, r.onsuccess = () => {
      r.result.onversionchange = () => {
        r.result.close(), Vr = void 0;
      }, e(r.result);
    }, r.onerror = () => t(r.error), r.onblocked = () => {
      Q.value = "发送队列被旧窗口阻塞，请关闭旧窗口后重试。";
    };
  }).catch((e) => {
    throw Vr = void 0, e;
  });
}
async function oo(e) {
  const t = await ut();
  return new Promise((r, i) => {
    const n = t.transaction("deliveries", "readonly"), s = n.objectStore("deliveries").index("scope").getAll(e);
    n.oncomplete = () => r(s.result), n.onabort = () => i(n.error), s.onerror = () => i(s.error);
  });
}
let Di = Promise.resolve();
function jt(e) {
  const t = Di.then(e);
  return Di = t.catch(() => {
  }), t;
}
async function dt(e) {
  try {
    const t = /* @__PURE__ */ new Map();
    for (const r of await oo(e)) {
      const i = t.get(r.id) || [];
      i.push(r), t.set(r.id, i);
    }
    gi.set(e, t), hi.value++;
  } catch {
    Q.value = "无法读取发送确认记录，请检查浏览器存储。";
  }
}
function ao(e, t) {
  hi.value;
  const r = gi.get(e)?.get(t) || [];
  if (!r.length) return "none";
  const i = r.filter((n) => !n.received);
  return i.length ? i.some((n) => n.failure === "rejected" || n.failure === "paused" || n.attempts >= 5 && (n.failure === "unconfirmed" || Date.now() - n.lastAttempt > 15e3)) ? "failed" : "sending" : "stored";
}
function pc(e, t) {
  hi.value;
  const r = gi.get(e)?.get(t) || [];
  if (!r.length) return "无送达确认";
  const i = r.filter((s) => s.received).length;
  return i === r.length ? r.every((s) => s.uid === "private-relay-server") ? "服务器已保存（不代表对方已读）" : `对方已接收 ${i}/${r.length}（非已读）` : r.filter((s) => !s.received).some((s) => s.failure === "rejected") ? "服务器拒绝此次发送，可在消息详情中重试；不代表此前尝试一定未保存" : ao(e, t) === "failed" ? "尚未获得保存确认，自动补发已暂停；不代表一定未送达，可在消息详情中重试" : "正在发送／等待保存确认，将按原目标房间补发；请勿重复发送";
}
async function En(e, t, r) {
  await jt(async () => {
    const i = await ut();
    await new Promise((n, s) => {
      const o = i.transaction("deliveries", "readwrite"), a = o.objectStore("deliveries");
      for (const c of new Set(r)) {
        const l = a.get([e, t.id, c]);
        l.onsuccess = () => {
          if (l.result?.received) return;
          const u = { scope: e, id: t.id, uid: c, message: JSON.parse(JSON.stringify(t)), attempts: 0, lastAttempt: 0, received: !1 };
          a.put(u);
        };
      }
      o.oncomplete = () => n(), o.onabort = () => s(o.error), o.onerror = () => s(o.error);
    }), await dt(e);
  });
}
async function mc(e, t) {
  try {
    await jt(async () => {
      const r = await ut();
      await new Promise((i, n) => {
        const s = r.transaction("deliveries", "readwrite"), o = s.objectStore("deliveries").index("scope").openCursor(e);
        o.onsuccess = () => {
          const a = o.result;
          if (!a) return;
          const c = a.value;
          c.id === t && !c.received && a.update({ ...c, attempts: 5, failure: "paused" }), a.continue();
        }, s.oncomplete = () => i(), s.onabort = () => n(s.error), s.onerror = () => n(s.error);
      }), await dt(e);
    });
  } catch {
    Q.value = "暂停补发未能保存，请检查存储；已发出的消息无法撤回。";
  }
}
async function co(e, t, r) {
  return _n(e, [t], r);
}
async function _n(e, t, r) {
  t.length && await jt(async () => {
    const i = await ut();
    await new Promise((n, s) => {
      const o = i.transaction("deliveries", "readwrite"), a = o.objectStore("deliveries");
      for (const c of new Set(t)) {
        const l = a.get([e, c, r]);
        l.onsuccess = () => {
          l.result && a.put({ ...l.result, received: !0, failure: void 0, message: void 0 });
        };
      }
      o.oncomplete = () => n(), o.onabort = () => s(o.error), o.onerror = () => s(o.error);
    }), await dt(e);
  });
}
async function xi(e, t, r, i = !1, n, s = !1) {
  await jt(async () => {
    const o = await ut();
    await new Promise((a, c) => {
      const l = o.transaction("deliveries", "readwrite"), u = l.objectStore("deliveries"), h = u.get([e, t, r]);
      h.onsuccess = () => {
        const p = h.result;
        p && !p.received && (n === void 0 || p.lastAttempt === n) && u.put({
          ...p,
          attempts: i || s ? 5 : p.attempts,
          failure: s ? "paused" : i ? "rejected" : p.failure === "paused" ? "paused" : "unconfirmed"
        });
      }, l.oncomplete = () => a(), l.onerror = l.onabort = () => c(l.error);
    }), await dt(e);
  });
}
async function lo(e, t, r, i, n = 4, s = () => !0) {
  await jt(async () => {
    const o = await ut(), a = [];
    await new Promise((c, l) => {
      const u = o.transaction("deliveries", "readwrite"), h = u.objectStore("deliveries").index("scope").openCursor(e);
      h.onsuccess = () => {
        const p = h.result;
        if (!p || a.length >= n || !r()) return;
        const g = p.value;
        if (!g.received && g.message && g.attempts < 5 && Date.now() - g.lastAttempt >= 1e4 && t.includes(g.uid)) {
          if (!s(g.message)) {
            p.update({ ...g, attempts: 5, failure: "paused" }), p.continue();
            return;
          }
          const w = { ...g, attempts: g.attempts + 1, lastAttempt: Date.now(), failure: void 0 };
          p.update(w), a.push(w);
        }
        p.continue();
      }, u.oncomplete = () => c(), u.onabort = () => l(u.error), u.onerror = () => l(u.error);
    });
    for (const c of a) r() && i(c.uid, c.message, c.lastAttempt);
    await dt(e);
  });
}
function Ce(e, t) {
  const r = new AbortController(), i = () => r.abort(e?.reason);
  e?.aborted ? i() : e?.addEventListener("abort", i, { once: !0 });
  const n = setTimeout(() => r.abort(new DOMException("视频加载超时，请手动重试", "TimeoutError")), t);
  return { signal: r.signal, dispose() {
    clearTimeout(n), e?.removeEventListener("abort", i), r.abort();
  } };
}
class uo {
  start() {
    return this.cancel(), this.controller = new AbortController(), this.controller.signal;
  }
  cancel() {
    this.controller?.abort();
  }
}
function Fr(e) {
  return Array.isArray(e) ? e.flatMap((t) => {
    const r = typeof t == "string" ? t : t?.img_src;
    if (typeof r != "string" || !r.trim()) return [];
    try {
      const i = new URL(r.trim().replace(/^http:/i, "https:").replace(/^\/\//, "https://"));
      return i.protocol === "https:" && !i.username && !i.password ? [i.href] : [];
    } catch {
      return [];
    }
  }) : [];
}
function fo(e) {
  function t(g, w) {
    return g << w | g >>> 32 - w;
  }
  const r = [7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21], i = new Array(64).fill(0).map((g, w) => Math.floor(Math.abs(Math.sin(w + 1)) * 2 ** 32)), n = new TextEncoder().encode(e), s = n.length * 8, o = new Uint8Array((Math.floor((n.length + 8) / 64) + 1) * 64);
  o.set(n), o[n.length] = 128;
  const a = new DataView(o.buffer);
  a.setUint32(o.length - 8, s >>> 0, !0), a.setUint32(o.length - 4, Math.floor(s / 4294967296), !0);
  let c = 1732584193, l = 4023233417, u = 2562383102, h = 271733878;
  for (let g = 0; g < o.length; g += 64) {
    const w = new Array(16);
    for (let T = 0; T < 16; T++) w[T] = a.getUint32(g + T * 4, !0);
    let b = c, S = l, y = u, _ = h;
    for (let T = 0; T < 64; T++) {
      let z, L;
      T < 16 ? (z = S & y | ~S & _, L = T) : T < 32 ? (z = _ & S | ~_ & y, L = (5 * T + 1) % 16) : T < 48 ? (z = S ^ y ^ _, L = (3 * T + 5) % 16) : (z = y ^ (S | ~_), L = 7 * T % 16);
      const j = z + b + i[T] + w[L] >>> 0;
      b = _, _ = y, y = S, S = S + t(j, r[T]) >>> 0;
    }
    c = c + b >>> 0, l = l + S >>> 0, u = u + y >>> 0, h = h + _ >>> 0;
  }
  function p(g) {
    let w = "";
    for (let b = 0; b < 4; b++) w += (g >>> b * 8 & 255).toString(16).padStart(2, "0");
    return w;
  }
  return p(c) + p(l) + p(u) + p(h);
}
const po = [
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
function qr(e, t, r) {
  const i = po.map((l) => (t + r)[l]).join("").slice(0, 32), n = Math.round(Date.now() / 1e3), s = { ...e, wts: n }, a = Object.keys(s).sort().map((l) => encodeURIComponent(l) + "=" + encodeURIComponent(String(s[l]).replace(/[!'()*]/g, ""))).join("&"), c = fo(a + i);
  return {
    signedQuery: `${a}&w_rid=${c}`,
    w_rid: c,
    wts: n
  };
}
function $i(e) {
  const t = Number(e);
  return t >= 120 ? "4K" : t === 116 ? "1080P60" : t === 112 ? "1080P+" : t === 80 ? "1080P" : t === 74 ? "720P60" : t === 64 ? "720P" : t === 32 ? "480P" : t === 16 ? "360P" : t > 0 ? `${t}P` : "清晰度";
}
function hc(e, t = "") {
  if (t && typeof t == "string" && t.trim()) return t.trim();
  const r = Number(e);
  return r >= 120 ? "超清 4K" : r === 116 ? "高清 1080P 60帧" : r === 112 ? "高清 1080P+ 高码率" : r === 80 ? "高清 1080P" : r === 74 ? "高码率 720P 60帧" : r === 64 ? "高清 720P" : r === 32 ? "清晰 480P" : r === 16 ? "流畅 360P" : `${r}P`;
}
class je {
  constructor() {
  }
  static getInstance() {
    return je.instance || (je.instance = new je()), je.instance;
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
          const i = JSON.parse(r);
          Array.isArray(i) && (t = i.map(String));
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
    for (const i of t.children || []) {
      const n = this.findNode(i, r);
      if (n) return n;
    }
    return null;
  }
  findParent(t, r) {
    if (!t) return null;
    for (const i of t.children || []) {
      if (String(i.id) === String(r)) return t;
      const n = this.findParent(i, r);
      if (n) return n;
    }
    return null;
  }
  removeNodeById(t, r) {
    if (!t?.children) return !1;
    const i = t.children.findIndex((n) => String(n.id) === String(r));
    if (i >= 0)
      return t.children.splice(i, 1), !0;
    for (const n of t.children)
      if (this.removeNodeById(n, r)) return !0;
    return !1;
  }
  isDescendant(t, r) {
    if (!t) return !1;
    if (String(t.id) === String(r)) return !0;
    for (const i of t.children || [])
      if (this.isDescendant(i, r)) return !0;
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
    const i = this.findParent(t, r) || t, n = (i.children || []).findIndex((o) => String(o.id) === String(r));
    if (n < 0) return !1;
    const s = i.children[n];
    return i.children.splice(n, 1, ...s.children || []), !0;
  }
  moveNode(t, r, i, n, s) {
    let o = this.findNode(t, r);
    o || (o = { id: String(r), type: "fav", name: s || "收藏夹", children: [] });
    const a = String(i) === "root" ? t : this.findNode(t, i);
    if (!o || !a || o === a || o.type === "folder" && this.isDescendant(o, a.id))
      return !1;
    if (this.removeNodeById(t, o.id), a === t || n === "into" && a.type === "folder")
      Array.isArray(a.children) || (a.children = []), a.children.push(o);
    else {
      const c = this.findParent(t, a.id) || t;
      Array.isArray(c.children) || (c.children = []);
      const l = Math.max(0, c.children.findIndex((u) => String(u.id) === String(a.id)));
      c.children.splice(l + (n === "after" ? 1 : 0), 0, o);
    }
    return !0;
  }
  syncTreeWithFolders(t, r) {
    let i = !1;
    const n = /* @__PURE__ */ new Map();
    for (const c of r)
      n.set(String(c.id || c.fid), c);
    const s = (c) => {
      if (c.children)
        for (let l = c.children.length - 1; l >= 0; l--) {
          const u = c.children[l];
          if (u.type === "fav")
            if (!n.has(String(u.id)))
              c.children.splice(l, 1), i = !0;
            else {
              const h = n.get(String(u.id));
              h?.title && u.name !== h.title && (u.name = h.title, i = !0);
            }
          else
            s(u);
        }
    };
    s(t);
    const o = /* @__PURE__ */ new Set(), a = (c) => {
      for (const l of c.children || [])
        l.type === "fav" ? o.add(String(l.id)) : a(l);
    };
    a(t), t.children || (t.children = []);
    for (const c of r) {
      const l = String(c.id || c.fid);
      o.has(l) || (t.children.push({
        id: l,
        type: "fav",
        name: c.title || "未命名收藏夹",
        children: []
      }), i = !0);
    }
    return i;
  }
  flattenTree(t, r, i, n) {
    const s = new Map((r || []).map((u) => [String(u.id || u.fid), u])), o = [], a = /* @__PURE__ */ new Set(), c = (u) => (u.children || []).reduce(
      (h, p) => h + (p.type === "fav" ? 1 : c(p)),
      0
    ), l = (u, h = 0) => {
      for (const p of u.children || []) {
        const g = String(p.id), w = s.get(g), b = p.type === "folder";
        b || a.add(g);
        const S = b && i.has(g), y = !b && g === String(n);
        o.push({
          id: g,
          title: String(p.name || w?.title || "未命名收藏夹"),
          count: Number(b ? c(p) : w?.media_count || 0),
          kind: w?.isCollected ? "collected" : w?.isOther ? "other" : "created",
          depth: h,
          group: b,
          collapsed: S,
          selected: y,
          writable: !b && !w?.isCollected && !w?.isOther
        }), b && !S && l(p, h + 1);
      }
    };
    l(t, 0);
    for (const u of r || []) {
      const h = String(u.id || u.fid);
      o.some((p) => !p.group && p.id === h) || !u.isCollected && !u.isOther && a.has(h) || o.push({
        id: h,
        title: u.title || "未命名收藏",
        count: Number(u.media_count || 0),
        kind: u.isCollected ? "collected" : u.isOther ? "other" : "created",
        depth: 0,
        group: !1,
        collapsed: !1,
        selected: h === String(n),
        writable: !u.isCollected && !u.isOther
      });
    }
    return o;
  }
}
class rt {
  constructor() {
    this.currentUser = null, this.writeQueue = Promise.resolve(), this.lastWriteTime = 0, this.wbiKeysCache = null, this.treeManager = je.getInstance();
  }
  static getInstance() {
    return rt.instance || (rt.instance = new rt()), rt.instance;
  }
  /**
   * 底层 B站 API 请求器 (携带凭据与跨域支持)
   */
  async api(t, r = {}) {
    const i = await fetch(t, {
      ...r,
      credentials: "include",
      headers: {
        Accept: "application/json",
        ...r.headers || {}
      }
    });
    if (!i.ok)
      throw Object.assign(new Error(`Bilibili API 请求失败 [${i.status}]: ${i.statusText}`), { status: i.status });
    const n = await i.json();
    if (n.code !== 0 && n.code !== void 0)
      throw Object.assign(new Error(n.message || n.msg || `Bilibili 接口返回错误码 ${n.code}`), { code: n.code });
    return n.data !== void 0 ? n.data : n;
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
    const i = async () => {
      const s = Date.now() - this.lastWriteTime;
      s < r && await new Promise((o) => setTimeout(o, r - s));
      try {
        const o = await t();
        return this.lastWriteTime = Date.now(), o;
      } catch (o) {
        throw this.lastWriteTime = Date.now(), o;
      }
    }, n = this.writeQueue.then(i, i);
    return this.writeQueue = n.catch(() => {
    }), n;
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
  async getCollectedFolders(t = 1, r = 50, i) {
    let n = i;
    n || (this.currentUser || await this.getUserNav(), n = this.currentUser?.mid);
    const s = await this.api(
      `https://api.bilibili.com/x/v3/fav/folder/collected/list?pn=${t}&ps=${r}&up_mid=${n || ""}&platform=web`
    ), a = (s?.list || []).map((c) => ({
      id: c.id,
      fid: c.fid || c.id,
      title: c.title,
      media_count: Number(c.media_count || 0),
      cover: (c.cover || "").replace(/^http:/, "https:"),
      upper: c.upper || { name: c.owner?.name || "UP主", mid: c.mid },
      isCollected: !0,
      isSeason: c.type === 21 || !!c.season,
      type: c.type
    }));
    return {
      count: Number(s?.count || a.length),
      list: a
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
    const i = await this.api(`https://api.bilibili.com/x/v2/history?pn=${t}&ps=${r}`), s = (Array.isArray(i) ? i : i?.list || []).map((o) => ({
      id: o.aid || o.history?.oid || o.id,
      type: 2,
      title: o.title || o.tag_name || "视频记录",
      cover: (o.pic || "").replace(/^http:/, "https:"),
      duration: o.duration || 0,
      upper: o.owner ? { mid: o.owner.mid, name: o.owner.name, face: o.owner.face } : o.author ? { mid: o.mid || 0, name: o.author, face: "" } : void 0,
      cnt_info: {
        play: o.stat?.view || 0,
        danmaku: o.stat?.danmaku || 0,
        collect: o.stat?.favorite || 0
      },
      bvid: o.bvid || o.history?.bvid || "",
      fav_time: o.view_at || o.progress
    }));
    return { medias: s, total: Number(i?.total || s.length) };
  }
  /**
   * 读取稍后再看列表
   */
  async getToViewVideos() {
    const t = await this.api("https://api.bilibili.com/x/v2/history/toview"), i = (t?.list || []).map((n) => ({
      id: n.aid || n.id,
      type: 2,
      title: n.title,
      cover: (n.pic || "").replace(/^http:/, "https:"),
      duration: n.duration || 0,
      upper: n.owner ? { mid: n.owner.mid, name: n.owner.name, face: n.owner.face } : void 0,
      cnt_info: {
        play: n.stat?.view || 0,
        danmaku: n.stat?.danmaku || 0,
        collect: n.stat?.favorite || 0
      },
      bvid: n.bvid,
      fav_time: n.add_at || n.progress
    }));
    return { medias: i, total: Number(t?.count || i.length) };
  }
  /**
   * 读取我的追番列表
   */
  async getBangumiFollows(t = 1, r = 24, i) {
    let n = i;
    n || (this.currentUser || await this.getUserNav(), n = this.currentUser?.mid);
    const s = await this.api(
      `https://api.bilibili.com/x/space/bangumi/follow/list?type=1&follow_status=0&pn=${t}&ps=${r}&vmid=${n || ""}`
    ), a = (s?.list || []).map((c) => ({
      id: c.season_id,
      type: 21,
      title: c.title,
      cover: (c.cover || "").replace(/^http:/, "https:"),
      duration: 0,
      upper: { mid: 0, name: c.season_type_name || "番剧", face: "" },
      cnt_info: {
        play: c.stat?.view || 0,
        danmaku: c.stat?.danmaku || 0,
        collect: c.stat?.follow || 0
      },
      link: c.url,
      bvid: c.new_ep?.bvid || "",
      intro: c.evaluate
    }));
    return { medias: a, total: Number(s?.total || a.length) };
  }
  /**
   * 读取合集/系列视频
   */
  async getSeasonVideos(t, r = 1, i = 24) {
    const n = await this.api(
      `https://api.bilibili.com/x/space/fav/season/list?season_id=${t}&pn=${r}&ps=${i}&platform=web`
    ), s = n?.medias || [];
    return {
      medias: s,
      total: Number(n?.info?.media_count || s.length)
    };
  }
  /**
   * 统一分页获取视频资源列表 (自动适配自建/合集/稍后再看/追番)
   */
  async getFolderVideos(t, r = 1, i = 20, n = "mtime", s = "") {
    const o = String(t);
    if (o === "__history__") {
      const p = await this.getWatchHistory(r, i);
      let g = p.medias;
      if (s.trim()) {
        const w = s.toLowerCase();
        g = g.filter((b) => b.title.toLowerCase().includes(w) || b.upper?.name && b.upper.name.toLowerCase().includes(w));
      }
      return {
        info: { title: "播放历史", media_count: p.total },
        medias: g,
        hasMore: r * i < p.total,
        total: p.total
      };
    }
    if (o === "__toview__") {
      const p = await this.getToViewVideos();
      let g = p.medias;
      if (s.trim()) {
        const w = s.toLowerCase();
        g = g.filter((b) => b.title.toLowerCase().includes(w) || b.upper?.name && b.upper.name.toLowerCase().includes(w));
      }
      return {
        info: { title: "稍后再看", media_count: p.total },
        medias: g.slice((r - 1) * i, r * i),
        hasMore: r * i < g.length,
        total: g.length
      };
    }
    if (o === "__bangumi__") {
      const p = await this.getBangumiFollows(r, i);
      return {
        info: { title: "我的追番", media_count: p.total },
        medias: p.medias,
        hasMore: r * i < p.total,
        total: p.total
      };
    }
    if (o.startsWith("season:")) {
      const p = o.replace("season:", ""), g = await this.getSeasonVideos(p, r, i);
      return {
        info: { title: "合集内容", media_count: g.total },
        medias: g.medias,
        hasMore: r * i < g.total,
        total: g.total
      };
    }
    let a = `https://api.bilibili.com/x/v3/fav/resource/list?media_id=${t}&pn=${r}&ps=${i}&order=${n}&platform=web`;
    s.trim() && (a += `&keyword=${encodeURIComponent(s.trim())}`);
    const c = await this.api(a), l = c?.medias || [], u = !!c?.has_more, h = Number(c?.info?.media_count || l.length);
    return {
      info: c?.info,
      medias: l,
      hasMore: u,
      total: h
    };
  }
  /**
   * 在 B站 创建新的收藏夹
   */
  async createRemoteFolder(t, r = 0) {
    const i = await this.getBiliJct();
    if (!i) return { ok: !1, reason: "没有取得 B站 CSRF 登录凭据，请先重新登录 B站" };
    try {
      const n = new URLSearchParams({ title: t, intro: "", privacy: String(r === 0 ? 0 : 1), csrf: i }), s = await fetch("https://api.bilibili.com/x/v3/fav/folder/add", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        },
        body: n.toString()
      }), o = await s.json().catch(() => ({}));
      return o?.code === 0 && o.data ? { ok: !0, folder: o.data } : { ok: !1, reason: o?.message || `B站接口 ${o?.code ?? s.status}` };
    } catch (n) {
      return { ok: !1, reason: n?.message || "创建 B站收藏夹失败" };
    }
  }
  /**
   * 移动视频至其他收藏夹 (单项或批量)
   */
  async moveVideo(t, r, i, n) {
    return this.enqueueWrite(async () => {
      const s = await this.getBiliJct();
      if (!s) return { ok: !1, reason: "取不到 csrf（bili_jct）" };
      try {
        const o = Array.isArray(i) ? i.map((u) => String(u).includes(":") ? String(u) : `${u}:2`).join(",") : String(i).includes(":") ? String(i) : `${i}:2`, a = new URLSearchParams({
          src_media_id: String(t),
          tar_media_id: String(r),
          mid: String(n || this.currentUser?.mid || ""),
          resources: o,
          platform: "web",
          csrf: s
        }), l = await (await fetch("https://api.bilibili.com/x/v3/fav/resource/move", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json"
          },
          body: a.toString()
        })).json();
        return l.code === 0 ? { ok: !0 } : { ok: !1, code: l.code, reason: this.formatBiliApiError(l.code, l.message) };
      } catch (o) {
        return { ok: !1, reason: o.message || "移动视频失败" };
      }
    });
  }
  /**
   * 从收藏夹删除视频 (取消收藏)
   */
  async deleteVideo(t, r, i = 2) {
    return this.enqueueWrite(async () => {
      let n = 0;
      for (; ; ) {
        n++;
        const s = await this.getBiliJct();
        if (!s) return { ok: !1, reason: "取不到 csrf（bili_jct）" };
        try {
          const o = new URLSearchParams({
            csrf: s,
            rid: String(r),
            type: "2",
            add_media_ids: "",
            del_media_ids: String(t),
            platform: "web"
          }), c = await (await fetch("https://api.bilibili.com/x/v3/fav/resource/deal", {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Accept: "application/json"
            },
            body: o.toString()
          })).json();
          if (c.code === 0) return { ok: !0 };
          if ((c.code === 11007 || c.code === -412 || /频繁|稍后|频率/.test(c.message || "")) && n <= i) {
            await new Promise((u) => setTimeout(u, 850 * n));
            continue;
          }
          return { ok: !1, code: c.code, reason: this.formatBiliApiError(c.code, c.message) };
        } catch (o) {
          if (n <= i) {
            await new Promise((a) => setTimeout(a, 600));
            continue;
          }
          return { ok: !1, reason: o.message };
        }
      }
    });
  }
  /**
   * 添加视频到收藏夹
   */
  async addVideoToFavorite(t, r) {
    return this.enqueueWrite(async () => {
      const i = await this.getBiliJct();
      if (!i) return { ok: !1, reason: "取不到 csrf（bili_jct）" };
      try {
        const n = new URLSearchParams({
          rid: String(r),
          type: "2",
          add_media_ids: String(t),
          del_media_ids: "",
          platform: "web",
          csrf: i
        }), o = await (await fetch("https://api.bilibili.com/x/v3/fav/resource/deal", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json"
          },
          body: n.toString()
        })).json();
        return o.code === 0 ? { ok: !0 } : { ok: !1, code: o.code, reason: this.formatBiliApiError(o.code, o.message) };
      } catch (n) {
        return { ok: !1, reason: n.message };
      }
    });
  }
  /**
   * 获取视频详情与分P信息
   */
  async getVideoView(t) {
    return this.api(`https://api.bilibili.com/x/web-interface/view?bvid=${encodeURIComponent(t)}`);
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
    const i = await this.api("https://api.bilibili.com/x/web-interface/nav", { signal: t });
    t?.throwIfAborted();
    const n = i?.wbi_img?.img_url?.split("/").pop()?.split(".")[0] || "", s = i?.wbi_img?.sub_url?.split("/").pop()?.split(".")[0] || "";
    if (!n || !s)
      throw new Error("无法获取 B 站 WBI 鉴权密钥");
    return this.wbiKeysCache = { ik: n, sk: s, expire: r + 3600 * 1e3 }, { ik: n, sk: s };
  }
  /**
   * 获取指定清晰度的视频/音频直链播放流 (支持逐级清晰度自动降阶重试与 WBI 签名直链备用获取)
   */
  async fetchPlayStream(t, r, i = 64, n) {
    const s = Ce(n, 18e3), o = s.signal, a = async (l) => {
      o.throwIfAborted();
      const u = Ce(o, 5e3);
      try {
        return await this.api(l, { signal: u.signal });
      } finally {
        u.dispose();
      }
    }, c = (l) => {
      if (o.throwIfAborted(), [401, 403, 412, 429].includes(l?.status) || [-101, -111, -352, -412].includes(l?.code) || l?.name === "TimeoutError" || l?.name === "AbortError" || l instanceof TypeError) throw l;
    };
    try {
      o.throwIfAborted();
      const l = Array.from(/* @__PURE__ */ new Set([i, 64, 32, 16]));
      let u = null, h = [], p = i;
      const g = (w) => {
        if (!w) return [];
        const b = Array.isArray(w.durl) ? w.durl : Array.isArray(w.result?.durl) ? w.result.durl : [], S = [];
        for (const y of b.slice(0, 1))
          if (y?.url && S.push(String(y.url)), Array.isArray(y?.backup_url))
            for (const _ of y.backup_url)
              _ && S.push(String(_));
        return Array.from(new Set(S.filter(Boolean).map((y) => y.replace(/^http:/, "https:")))).filter((y) => {
          try {
            const _ = new URL(y);
            return _.protocol === "https:" && !_.username && !_.password;
          } catch {
            return !1;
          }
        });
      };
      for (const w of l)
        try {
          const b = t ? `bvid=${encodeURIComponent(t)}` : "", S = await a(
            `https://api.bilibili.com/x/player/playurl?${b}&cid=${r}&qn=${w}&fnval=1&fourk=0&platform=html5&high_quality=1`
          ), y = g(S);
          if (y.length > 0) {
            u = S, h = y, p = Number(S?.quality || w);
            break;
          }
        } catch (b) {
          c(b);
        }
      if (!h.length)
        for (const w of Array.from(/* @__PURE__ */ new Set([i, 64, 32])))
          try {
            const b = Ce(o, 5e3);
            let S;
            try {
              S = await this.getWbiKeys(b.signal);
            } finally {
              b.dispose();
            }
            const { ik: y, sk: _ } = S, T = { cid: r, qn: w, fnval: 1, fourk: 0 };
            t && (T.bvid = t);
            const { signedQuery: z } = qr(T, y, _), L = await a(
              `https://api.bilibili.com/x/player/wbi/playurl?${z}`
            ), j = g(L);
            if (j.length > 0) {
              u = L, h = j, p = Number(L?.quality || w);
              break;
            }
          } catch (b) {
            c(b);
          }
      if (!h.length)
        throw new Error("未能获取到有效视频直链播放流");
      return {
        sources: h,
        quality: p,
        acceptQuality: u?.accept_quality || [80, 64, 32, 16],
        acceptDescription: u?.accept_description || ["1080P 高清", "720P 高清", "480P 清晰", "360P 流畅"]
      };
    } finally {
      s.dispose();
    }
  }
  /**
   * 获取音频流：优先提取 DASH 纯音频流 (M4A，体积仅 ~3MB，彻底消除视频冗余与限速)，若无纯音频则降级至 360P 流畅视频流 (极小体积保底)
   */
  async fetchAudioStream(t, r, i) {
    const n = Ce(i, 18e3), s = n.signal, o = async (l) => {
      s.throwIfAborted();
      const u = Ce(s, 5e3);
      try {
        return await this.api(l, { signal: u.signal });
      } finally {
        u.dispose();
      }
    }, a = (l) => {
      if (s.throwIfAborted(), [401, 403, 412, 429].includes(l?.status) || [-101, -111, -352, -412].includes(l?.code) || l?.name === "TimeoutError" || l?.name === "AbortError" || l instanceof TypeError) throw l;
    }, c = (l) => {
      const u = l?.dash || l?.result?.dash, h = Array.isArray(u?.audio) ? u.audio : [];
      if (!h.length) return [];
      const p = [...h].sort((w, b) => Number(b?.id || 0) - Number(w?.id || 0)), g = [];
      for (const w of p) {
        if (w?.baseUrl && g.push(String(w.baseUrl)), w?.base_url && g.push(String(w.base_url)), Array.isArray(w?.backupUrl))
          for (const b of w.backupUrl) b && g.push(String(b));
        if (Array.isArray(w?.backup_url))
          for (const b of w.backup_url) b && g.push(String(b));
      }
      return Array.from(new Set(g.filter(Boolean).map((w) => w.replace(/^http:/, "https:")))).filter((w) => {
        try {
          const b = new URL(w);
          return b.protocol === "https:" && !b.username && !b.password;
        } catch {
          return !1;
        }
      });
    };
    try {
      s.throwIfAborted();
      try {
        const u = t ? `bvid=${encodeURIComponent(t)}` : "", h = await o(
          `https://api.bilibili.com/x/player/playurl?${u}&cid=${r}&qn=16&fnval=16&fourk=0&platform=html5`
        ), p = c(h);
        if (p.length > 0)
          return { sources: p, isPureAudio: !0 };
      } catch (u) {
        a(u);
      }
      try {
        const u = Ce(s, 5e3);
        let h;
        try {
          h = await this.getWbiKeys(u.signal);
        } finally {
          u.dispose();
        }
        const { ik: p, sk: g } = h, w = { cid: r, qn: 16, fnval: 16, fourk: 0 };
        t && (w.bvid = t);
        const { signedQuery: b } = qr(w, p, g), S = await o(`https://api.bilibili.com/x/player/wbi/playurl?${b}`), y = c(S);
        if (y.length > 0)
          return { sources: y, isPureAudio: !0 };
      } catch (u) {
        a(u);
      }
      return { sources: (await this.fetchPlayStream(t, r, 16, s)).sources, isPureAudio: !1 };
    } finally {
      n.dispose();
    }
  }
  /**
   * 现代化多源视频流与分P信息自洽解析
   */
  async resolvePlayStream(t, r = 1, i) {
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
    const n = String(t.bvid || "").trim(), s = String(t.aid || "").trim(), o = n.startsWith("BV") ? n : "", a = s.replace(/^av/i, "") || (n.startsWith("BV") ? "" : n.replace(/^av/i, "")), c = o ? `bvid=${encodeURIComponent(o)}` : `aid=${encodeURIComponent(a)}`, l = Ce(i, 2e4), u = l.signal;
    try {
      u.throwIfAborted();
      const h = t.cid && o && r === 1 ? this.fetchPlayStream(o, t.cid, Number(t.preferredQuality || 64), u).then((P) => ({ value: P, error: null }), (P) => ({ value: null, error: P })) : null;
      let p = null;
      try {
        const P = Ce(u, 6e3);
        try {
          p = await this.api(`https://api.bilibili.com/x/web-interface/view?${c}`, { signal: P.signal });
        } finally {
          P.dispose();
        }
      } catch {
        u.throwIfAborted();
      }
      const g = p?.bvid || "", w = g.startsWith("BV") ? g : o || "", S = (Array.isArray(p?.pages) ? p.pages : []).map((P) => ({
        cid: P.cid,
        page: P.page,
        part: P.part || `第${P.page}集`,
        duration: P.duration || 0
      })), y = S.findIndex((P) => P.page === r), _ = y >= 0 ? S[y] : S[0] || null, T = _?.cid || p?.cid || t.cid;
      if (!T)
        throw new Error("无法获取视频 CID 标识");
      const z = Number(t.preferredQuality || 64), L = h && String(T) === String(t.cid) ? await h : null;
      u.throwIfAborted();
      const j = L && String(T) === String(t.cid) ? L.value || (() => {
        throw L.error;
      })() : await this.fetchPlayStream(w, T, z, u);
      return {
        title: p?.title || t.title || w,
        poster: String(p?.pic || t.cover || "").replace(/^http:/, "https:"),
        sources: j.sources,
        aid: p?.aid || t.aid || null,
        bvid: w,
        cid: T || null,
        owner: p?.owner?.name || t.owner || t.author || "UP主",
        ownerFace: p?.owner?.face ? String(p.owner.face).replace(/^http:/, "https:") : t.ownerFace || t.face || "",
        ownerMid: p?.owner?.mid || null,
        pubdate: p?.pubdate || 0,
        desc: p?.desc || t.desc || "暂无简介",
        views: p?.stat?.view || t.views || 0,
        danmaku: p?.stat?.danmaku || t.danmaku || 0,
        likes: p?.stat?.like || t.likes || 0,
        currentQuality: j.quality,
        acceptQuality: j.acceptQuality,
        acceptDescription: j.acceptDescription,
        pages: S,
        currentPage: _?.page || 1,
        partTitle: _?.part || ""
      };
    } finally {
      l.dispose();
    }
  }
  /**
   * 纯数据拉取并深度解析视频字幕轨道 (支持 WBI 签名鉴权与多语言挑选)
   */
  async fetchVideoSubtitleDetails(t, r, i) {
    i?.throwIfAborted();
    const n = await this.api(`https://api.bilibili.com/x/web-interface/view?bvid=${encodeURIComponent(t)}`, { signal: i });
    if (i?.throwIfAborted(), i && !n?.cid) throw new Error("无法读取视频详情，请重试");
    if (!n?.cid) return { ok: !1, reason: "视频不存在或未登录", cues: [] };
    const s = Array.isArray(n?.pages) ? n.pages : [], o = r ? s.find((E) => E.cid === r) : null, a = r || n.cid, c = o?.part ? ` · P${o.page} ${o.part}` : "", { ik: l, sk: u } = await this.getWbiKeys(i);
    i?.throwIfAborted();
    const { signedQuery: h } = qr({ bvid: t, cid: a }, l, u), p = await this.api(`https://api.bilibili.com/x/player/wbi/v2?${h}`, { signal: i });
    if (i?.throwIfAborted(), i && !Array.isArray(p?.subtitle?.subtitles)) throw new Error("字幕轨道返回异常或当前账号无权读取");
    const g = p?.subtitle?.subtitles || [];
    if (!g.length)
      return { ok: !1, reason: `该视频${c ? "（" + c.trim() + "）" : ""}没有可用字幕`, cues: [] };
    const w = g.find((E) => /zh|中文|汉语|漢語/i.test((E.lan || "") + " " + (E.lan_doc || ""))) || g[0], b = w.subtitle_url || "", S = b.startsWith("//") ? `https:${b}` : b.startsWith("http") ? b : `https://${b}`, y = await fetch(S, { signal: i, credentials: "include", headers: { Accept: "application/json" } });
    if (!y.ok) throw new Error(`字幕获取失败: ${y.status}`);
    const _ = await y.arrayBuffer();
    i?.throwIfAborted();
    let T;
    try {
      T = JSON.parse(new TextDecoder("utf-8", { fatal: !0 }).decode(_));
    } catch {
      try {
        T = JSON.parse(new TextDecoder("gb18030").decode(_));
      } catch {
        T = JSON.parse(new TextDecoder("big5").decode(_));
      }
    }
    if (i && !Array.isArray(T?.body)) throw new Error("字幕正文格式异常");
    const L = (T?.body || []).map((E, me) => ({
      id: `${E.from || 0}_${me}`,
      from: Number(E.from || 0),
      to: Number(E.to || E.from || 0),
      content: String(E.content || "").trim()
    })).filter((E) => E.content), j = (n.title || t) + c, P = [];
    if (P.push("标题：" + j), P.push("字幕轨道：" + g.map((E) => E.lan_doc || E.lan || "未知").join(" / ") + "（已选：" + (w.lan_doc || w.lan || "默认") + "）"), n.owner?.name && P.push("UP主：" + n.owner.name), n.pubdate) {
      const E = new Date(n.pubdate * 1e3);
      P.push(`发布时间：${E.getFullYear()}-${String(E.getMonth() + 1).padStart(2, "0")}-${String(E.getDate()).padStart(2, "0")}`);
    }
    P.push("链接：https://www.bilibili.com/video/" + t + (o?.page ? `?p=${o.page}` : ""));
    const C = L.map((E) => E.content).join(`\r
`), V = P.join(`\r
`) + `\r
\r
———— 字幕正文 ————\r
\r
`;
    return {
      ok: !0,
      title: j,
      bodyText: C,
      headText: V,
      lineCount: L.length,
      cues: L,
      aid: n.aid,
      desc: n.desc || "",
      viewPoints: Array.isArray(p?.view_points) ? p.view_points : []
    };
  }
  /**
   * 拉取并解析 B站 JSON 格式字幕流为标准化 Cue 列表
   */
  async fetchSubtitleCues(t) {
    if (!t) return [];
    const r = t.startsWith("//") ? `https:${t}` : t, i = await fetch(r);
    if (!i.ok) throw new Error(`字幕获取失败: ${i.statusText}`);
    return ((await i.json()).body || []).map((o) => ({
      from: Number(o.from || 0),
      to: Number(o.to || 0),
      content: String(o.content || "").trim()
    }));
  }
  /**
   * 分页获取视频评论区列表
   */
  async getVideoComments(t, r = 1, i = 20, n = 2) {
    const s = await this.api(
      `https://api.bilibili.com/x/v2/reply?type=1&oid=${t}&pn=${r}&ps=${i}&sort=${n}`
    ), o = s?.replies || [], a = s?.top || s?.upper?.top || null, c = s?.page || {}, l = Number(c.count || 0), u = (g, w = !1) => {
      const b = {};
      if (g.content?.emote && typeof g.content.emote == "object")
        for (const [y, _] of Object.entries(g.content.emote)) {
          const T = _?.url;
          typeof T == "string" && T && (b[y] = T.replace(/^http:/, "https:"));
        }
      const S = Array.isArray(g.replies) ? g.replies.map((y) => ({
        rpid: y.rpid,
        mid: Number(y.mid || 0),
        uname: String(y.member?.uname || "B站用户"),
        avatar: String(y.member?.avatar || "").replace(/^http:/, "https:"),
        message: String(y.content?.message || ""),
        timeText: new Date(Number(y.ctime || 0) * 1e3).toLocaleString(),
        like: Number(y.like || 0),
        pictures: Fr(y.content?.pictures)
      })) : [];
      return {
        rpid: g.rpid,
        mid: Number(g.mid || 0),
        uname: String(g.member?.uname || "匿名用户"),
        avatar: String(g.member?.avatar || "").replace(/^http:/, "https:"),
        message: String(g.content?.message || ""),
        timeText: new Date(Number(g.ctime || 0) * 1e3).toLocaleString(),
        like: Number(g.like || 0),
        rcount: Number(g.rcount || 0),
        isTop: w,
        pictures: Fr(g.content?.pictures),
        emotes: b,
        replies: S
      };
    }, h = [];
    r === 1 && a && typeof a == "object" && a.rpid && h.push(u(a, !0));
    const p = a?.rpid ? String(a.rpid) : "";
    for (const g of o)
      p && String(g.rpid) === p || h.push(u(g, !1));
    return {
      comments: h,
      total: l,
      hasMore: r * i < l
    };
  }
  /**
   * 分页获取某条根评论下的子回复（楼中楼）
   */
  async getSubReplies(t, r, i = 1, n = 10) {
    const s = await this.api(
      `https://api.bilibili.com/x/v2/reply/reply?type=1&oid=${t}&root=${r}&pn=${i}&ps=${n}`
    ), o = s?.replies || [], a = s?.page || {}, c = Number(a.count || 0);
    return {
      replies: o.map((u) => {
        const h = {};
        if (u.content?.emote && typeof u.content.emote == "object")
          for (const [p, g] of Object.entries(u.content.emote)) {
            const w = g?.url;
            typeof w == "string" && w && (h[p] = w.replace(/^http:/, "https:"));
          }
        return {
          rpid: u.rpid,
          mid: Number(u.mid || 0),
          uname: String(u.member?.uname || "B站用户"),
          avatar: String(u.member?.avatar || "").replace(/^http:/, "https:"),
          message: String(u.content?.message || ""),
          timeText: new Date(Number(u.ctime || 0) * 1e3).toLocaleString(),
          like: Number(u.like || 0),
          pictures: Fr(u.content?.pictures),
          emotes: h
        };
      }),
      total: c,
      hasMore: i * n < c
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
      let i = "";
      for (const c of r)
        try {
          const l = await fetch(c);
          if (l.ok && (i = await l.text(), i && i.includes("<d p=")))
            break;
        } catch {
        }
      if (!i) return [];
      const o = new DOMParser().parseFromString(i, "text/xml").querySelectorAll("d"), a = [];
      return o.forEach((c, l) => {
        const h = (c.getAttribute("p") || "").split(","), p = parseFloat(h[0]) || 0, g = parseInt(h[1], 10) || 1, w = parseInt(h[2], 10) || 25, S = `#${(parseInt(h[3], 10) || 16777215).toString(16).padStart(6, "0")}`, y = parseInt(h[4], 10) || 0, _ = parseInt(h[5], 10) || 0, T = h[6] || "", z = h[7] || String(l), L = c.textContent?.trim() || "";
        if (L) {
          const j = Math.floor(p / 60), P = Math.floor(p % 60), C = `${String(j).padStart(2, "0")}:${String(P).padStart(2, "0")}`;
          a.push({
            id: z,
            time: p,
            timeStr: C,
            mode: g,
            size: w,
            color: S,
            timestamp: y,
            pool: _,
            userHash: T,
            text: L
          });
        }
      }), a.sort((c, l) => c.time - l.time), a;
    } catch (r) {
      return console.warn("[BiliService] 弹幕解析失败:", r), [];
    }
  }
  /**
   * 格式化毫秒或秒为 mm:ss
   */
  formatDuration(t) {
    if (!Number.isFinite(t) || t <= 0) return "0:00";
    const r = Math.floor(t / 60), i = Math.floor(t % 60);
    return `${r}:${String(i).padStart(2, "0")}`;
  }
}
const re = rt.getInstance();
je.getInstance();
const mo = {
  phase: "closed",
  isCollapsed: !1,
  openDrawers: /* @__PURE__ */ new Set(),
  qualityMenuOpen: !1,
  speedMenuOpen: !1,
  error: ""
};
class Cn {
  constructor() {
    this._state = { ...mo }, this._listeners = /* @__PURE__ */ new Set(), typeof window < "u" && (window.__TAB_MACHINES__ = window.__TAB_MACHINES__ || {}, window.__TAB_MACHINES__.biliMiniPlayer = this);
  }
  get state() {
    return this._state;
  }
  get phase() {
    return this._state.phase;
  }
  get isOpen() {
    return this._state.phase !== "closed";
  }
  get isLoading() {
    return this._state.phase === "loading";
  }
  get isPlaying() {
    return this._state.phase === "playing";
  }
  get isCollapsed() {
    return this._state.isCollapsed;
  }
  get error() {
    return this._state.error;
  }
  get qualityMenuOpen() {
    return this._state.qualityMenuOpen;
  }
  get speedMenuOpen() {
    return this._state.speedMenuOpen;
  }
  isDrawerOpen(t) {
    return this._state.openDrawers.has(t);
  }
  subscribe(t) {
    return this._listeners.add(t), () => {
      this._listeners.delete(t);
    };
  }
  _setState(t) {
    this._state = t;
    for (const r of this._listeners)
      r(t);
  }
  send(t) {
    const r = this._state;
    switch (t.type) {
      case "OPEN_START":
        return this._setState({
          phase: "loading",
          isCollapsed: !1,
          openDrawers: /* @__PURE__ */ new Set(),
          qualityMenuOpen: !1,
          speedMenuOpen: !1,
          error: ""
        }), !0;
      case "STREAM_RESOLVED": {
        if (r.phase === "closed") return !1;
        const i = t.isPlaying !== !1;
        return this._setState({
          ...r,
          phase: i ? "playing" : "ready",
          error: ""
        }), !0;
      }
      case "PLAY":
        return r.phase === "closed" || r.phase === "loading" ? !1 : (this._setState({
          ...r,
          phase: "playing"
        }), !0);
      case "PAUSE":
        return r.phase === "playing" ? (this._setState({
          ...r,
          phase: "paused"
        }), !0) : !1;
      case "RELOAD_START":
        return r.phase === "closed" ? !1 : (this._setState({
          ...r,
          phase: "loading",
          error: ""
        }), !0);
      case "ERROR":
        return r.phase === "closed" ? !1 : (this._setState({
          ...r,
          phase: "error",
          error: t.message
        }), !0);
      case "TOGGLE_COLLAPSE": {
        if (r.phase === "closed") return !1;
        const i = t.collapsed !== void 0 ? t.collapsed : !r.isCollapsed;
        return this._setState({
          ...r,
          isCollapsed: i,
          openDrawers: i ? /* @__PURE__ */ new Set() : r.openDrawers,
          qualityMenuOpen: i ? !1 : r.qualityMenuOpen,
          speedMenuOpen: i ? !1 : r.speedMenuOpen
        }), !0;
      }
      case "TOGGLE_DRAWER": {
        if (r.phase === "closed" || r.isCollapsed) return !1;
        const i = new Set(r.openDrawers), n = i.has(t.drawer);
        return (t.open !== void 0 ? t.open : !n) ? i.add(t.drawer) : i.delete(t.drawer), this._setState({
          ...r,
          openDrawers: i
        }), !0;
      }
      case "SET_QUALITY_MENU":
        return r.phase === "closed" || r.isCollapsed ? !1 : (this._setState({
          ...r,
          qualityMenuOpen: t.open,
          speedMenuOpen: t.open ? !1 : r.speedMenuOpen
        }), !0);
      case "SET_SPEED_MENU":
        return r.phase === "closed" || r.isCollapsed ? !1 : (this._setState({
          ...r,
          speedMenuOpen: t.open,
          qualityMenuOpen: t.open ? !1 : r.qualityMenuOpen
        }), !0);
      case "CLOSE":
        return this._setState({
          phase: "closed",
          isCollapsed: !1,
          openDrawers: /* @__PURE__ */ new Set(),
          qualityMenuOpen: !1,
          speedMenuOpen: !1,
          error: ""
        }), !0;
      default:
        return !1;
    }
  }
}
const Xt = new uo(), ho = {
  isOpen: !1,
  collapsed: !1,
  isLoading: !1,
  errorMsg: "",
  bvid: "",
  aid: "",
  cid: "",
  title: "",
  cover: "",
  author: "",
  authorMid: "",
  authorFace: "",
  pubdate: "",
  description: "",
  videoSrc: "",
  sourceUrls: [],
  iframeSrc: "",
  useIframe: !1,
  isPlaying: !1,
  currentTime: 0,
  duration: 0,
  playbackRate: 1,
  currentQuality: 64,
  qualities: [
    { qn: 80, desc: "1080P 高清" },
    { qn: 64, desc: "720P 高清" },
    { qn: 32, desc: "480P 清晰" },
    { qn: 16, desc: "360P 流畅" }
  ],
  qualityMenuOpen: !1,
  speedMenuOpen: !1,
  pages: [],
  currentPageIndex: 0,
  episodesOpen: !1,
  descOpen: !1,
  commentsOpen: !1,
  commentsSort: 2,
  commentsPage: 1,
  comments: [],
  totalComments: 0,
  commentsLoading: !1,
  hasMoreComments: !1,
  danmakuEnabled: !0,
  danmakuList: [],
  danmakuLoading: !1,
  x: typeof window < "u" ? Math.max(16, window.innerWidth - 420) : 100,
  y: typeof window < "u" ? Math.max(76, window.innerHeight - 300) : 100,
  baseWidth: 0,
  height: 0,
  zIndex: 1e4
}, d = K({ ...ho }), M = new Cn();
M.subscribe((e) => {
  d.isOpen = e.phase !== "closed", d.isLoading = e.phase === "loading", d.isPlaying = e.phase === "playing", d.errorMsg = e.error, d.collapsed = e.isCollapsed, d.episodesOpen = e.openDrawers.has("episodes"), d.descOpen = e.openDrawers.has("desc"), d.commentsOpen = e.openDrawers.has("comments"), d.qualityMenuOpen = e.qualityMenuOpen, d.speedMenuOpen = e.speedMenuOpen;
});
let go = 1e4;
function J(e, t = !1) {
  const r = globalThis;
  typeof r.showBiliToast == "function" ? r.showBiliToast(e, 3200, { isError: t, target: { type: "bili-video", bvid: d.bvid, aid: d.aid } }) : typeof r.showWindowsToast == "function" && r.showWindowsToast({
    id: `bili_mini_${Date.now()}`,
    appName: "哔哩哔哩",
    icon: "assets/bilibili.svg",
    title: "B站迷你播放器",
    appType: "bili",
    target: { type: "bili-video", bvid: d.bvid, aid: d.aid },
    message: e,
    duration: 3200
  });
}
let At = "";
function Bi() {
  At && URL.revokeObjectURL(At), At = "";
}
const yo = {
  get state() {
    return d;
  },
  get machine() {
    return M;
  },
  play() {
    M.send({ type: "PLAY" });
  },
  pause() {
    M.send({ type: "PAUSE" });
  },
  bringToFront() {
    d.zIndex = ++go;
  },
  /**
   * 打开并播放指定视频
   */
  async openVideo(e) {
    const t = e.bvid || "", r = e.aid ? String(e.aid) : "";
    if (!t && !r) {
      J("无法播放：缺少视频标识 (BV/AV号)", !0);
      return;
    }
    this.bringToFront();
    const i = !!t && d.bvid === t || !!r && d.aid === r;
    if (d.isOpen && i && !e.cachedSourceUrl && (d.videoSrc || d.iframeSrc) && !d.errorMsg) {
      M.send({ type: "TOGGLE_COLLAPSE", collapsed: !1 });
      return;
    }
    const n = Xt.start();
    if (Bi(), M.send({ type: "OPEN_START" }), d.bvid = t, d.aid = r, d.cid = e.cid || "", d.title = e.title || t || "加载中…", d.cover = e.cover || "", d.author = e.author || "", d.authorMid = e.mid ? String(e.mid) : "", d.authorFace = e.authorFace || "", d.videoSrc = "", d.sourceUrls = [], d.iframeSrc = "", d.useIframe = !1, d.currentTime = 0, d.pages = [], d.currentPageIndex = 0, d.comments = [], d.commentsPage = 1, d.hasMoreComments = !1, d.totalComments = 0, d.danmakuList = [], d.danmakuLoading = !1, typeof window < "u" && (d.x = Math.max(20, Math.floor((window.innerWidth - 380) / 2)), d.y = Math.max(60, Math.min(100, Math.floor((window.innerHeight - 254) / 3)))), e.cachedSourceUrl) {
      At = e.cachedSourceUrl, d.videoSrc = At, M.send({ type: "STREAM_RESOLVED", isPlaying: !0 });
      return;
    }
    try {
      const s = await re.resolvePlayStream({
        bvid: t,
        aid: r,
        cid: e.cid,
        title: e.title,
        cover: e.cover,
        preferredQuality: d.currentQuality
      }, 1, n);
      if (n.throwIfAborted(), d.title = s.title || e.title || t, d.cover = s.poster || e.cover || "", d.author = s.owner || e.author || "UP主", d.authorFace = s.ownerFace || e.authorFace || "", s.ownerMid && (d.authorMid = String(s.ownerMid)), d.aid = s.aid ? String(s.aid) : r, d.bvid = s.bvid || t, d.cid = s.cid || "", d.description = s.desc || "", d.pubdate = s.pubdate ? new Date(s.pubdate * 1e3).toLocaleString() : "", d.pages = s.pages || [], d.currentPageIndex = Math.max(0, s.currentPage - 1), s.acceptQuality?.length && (d.qualities = s.acceptQuality.map((o, a) => ({
        qn: o,
        desc: s.acceptDescription?.[a] || $i(o)
      }))), d.currentQuality = s.currentQuality || 64, s.sources && s.sources.length)
        d.sourceUrls = s.sources, d.videoSrc = s.sources[0], M.send({ type: "STREAM_RESOLVED", isPlaying: !0 }), d.danmakuEnabled && this.loadDanmaku();
      else
        throw new Error("未能获取到直链源");
    } catch (s) {
      if (n.aborted) return;
      const o = s?.message || "未能获取到视频播放流";
      M.send({ type: "ERROR", message: o }), J(`视频加载未完成：${o}`, !0);
    } finally {
      !n.aborted && M.isLoading && M.send({ type: "STREAM_RESOLVED", isPlaying: !1 });
    }
  },
  /**
   * 重新拉取当前视频
   */
  async retryCurrentVideo() {
    (d.bvid || d.aid) && await this.openVideo({
      bvid: d.bvid,
      aid: d.aid,
      cid: d.cid,
      title: d.title,
      cover: d.cover,
      author: d.author,
      authorFace: d.authorFace
    });
  },
  /**
   * 切换原生 HTML5 与官方 iframe 模式
   */
  togglePlayerMode() {
    if (!d.videoSrc && !d.useIframe) {
      J("当前视频未获取到原生流，保持内嵌模式");
      return;
    }
    d.useIframe = !d.useIframe, d.useIframe && !d.iframeSrc && (d.iframeSrc = `https://player.bilibili.com/player.html?bvid=${encodeURIComponent(d.bvid)}&autoplay=1&danmaku=0&high_quality=1`), J(d.useIframe ? "已切换至官方嵌入播放模式" : "已切换至原生播放模式");
  },
  /**
   * 切换选集（分P）
   */
  async switchEpisode(e) {
    if (e < 0 || e >= d.pages.length) return;
    const t = d.pages[e];
    if (!t) return;
    d.currentPageIndex = e, d.cid = t.cid, d.videoSrc = "", d.sourceUrls = [], M.send({ type: "RELOAD_START" }), d.danmakuList = [], d.danmakuLoading = !1;
    const r = Xt.start();
    try {
      const i = await re.fetchPlayStream(
        d.bvid,
        t.cid,
        d.currentQuality,
        r
      );
      if (r.throwIfAborted(), i.sources?.length)
        d.sourceUrls = i.sources, d.videoSrc = i.sources[0], d.currentTime = 0, M.send({ type: "STREAM_RESOLVED", isPlaying: !0 }), d.danmakuEnabled && this.loadDanmaku();
      else
        throw new Error("获取分P视频流失败");
    } catch (i) {
      if (r.aborted) return;
      const n = i?.message || "切换选集失败";
      M.send({ type: "ERROR", message: n }), J(`分P切换失败：${n}`, !0);
    } finally {
      !r.aborted && M.isLoading && M.send({ type: "STREAM_RESOLVED", isPlaying: !1 });
    }
  },
  /**
   * 切换清晰度
   */
  async switchQuality(e) {
    if (M.send({ type: "SET_QUALITY_MENU", open: !1 }), e === d.currentQuality) return;
    M.send({ type: "RELOAD_START" });
    const t = d.currentTime, r = Xt.start();
    try {
      const i = await re.fetchPlayStream(
        d.bvid,
        d.cid,
        e,
        r
      );
      r.throwIfAborted(), i.sources?.length && (d.sourceUrls = i.sources, d.videoSrc = i.sources[0], d.currentQuality = i.quality, d.currentTime = t, M.send({ type: "STREAM_RESOLVED", isPlaying: !0 }), J(`已切换清晰度为 ${$i(e)}`));
    } catch (i) {
      if (r.aborted) return;
      J(`清晰度切换失败：${i?.message || "网络异常"}`, !0);
    } finally {
      !r.aborted && M.isLoading && M.send({ type: "STREAM_RESOLVED", isPlaying: !1 });
    }
  },
  /**
   * 切换倍速
   */
  setPlaybackRate(e) {
    d.playbackRate = e, M.send({ type: "SET_SPEED_MENU", open: !1 });
  },
  /**
   * 折叠 / 展开
   */
  toggleCollapse(e) {
    M.send({ type: "TOGGLE_COLLAPSE", collapsed: e });
  },
  /**
   * 关闭播放器
   */
  close() {
    Xt.cancel(), Bi(), d.sourceUrls = [], d.videoSrc = "", M.send({ type: "CLOSE" });
  },
  /**
   * 切换选集抽屉
   */
  toggleEpisodes(e) {
    M.send({ type: "TOGGLE_DRAWER", drawer: "episodes", open: e });
  },
  /**
   * 切换简介抽屉
   */
  toggleDesc(e) {
    M.send({ type: "TOGGLE_DRAWER", drawer: "desc", open: e });
  },
  /**
   * 切换评论抽屉
   */
  toggleComments(e) {
    const t = e !== void 0 ? e : !M.isDrawerOpen("comments");
    M.send({ type: "TOGGLE_DRAWER", drawer: "comments", open: t }), t && (!d.comments.length || d.commentsLoading) && this.loadComments(!0);
  },
  /**
   * 切换弹幕飞屏开关（B站原版体验：点击就开，再点击就关）
   */
  toggleDanmakuEnabled(e) {
    const t = e !== void 0 ? e : !d.danmakuEnabled;
    d.danmakuEnabled = t, J(t ? "已开启弹幕" : "已关闭弹幕"), t && (!d.danmakuList.length || d.danmakuLoading) && this.loadDanmaku();
  },
  /**
   * 加载视频弹幕
   */
  async loadDanmaku(e = !1) {
    if (!(d.danmakuList.length > 0 && !e)) {
      d.danmakuLoading = !0;
      try {
        let t = d.cid;
        if (!t && d.bvid) {
          const i = await re.getVideoView(d.bvid);
          i?.cid && (t = i.cid, d.cid = t);
        }
        if (!t) {
          d.danmakuLoading = !1, J("未能获取到当前视频的 cid，暂无法拉取弹幕", !0);
          return;
        }
        const r = await re.getVideoDanmaku(t);
        d.danmakuList = r;
      } catch (t) {
        console.warn("[MiniPlayer] 获取弹幕失败:", t);
      } finally {
        d.danmakuLoading = !1;
      }
    }
  },
  /**
   * 复制简介
   */
  async copyDescription() {
    const e = [
      `标题：${d.title}`,
      d.author ? `UP主：${d.author}` : "",
      d.pubdate ? `发布时间：${d.pubdate}` : "",
      d.bvid ? `链接：https://www.bilibili.com/video/${d.bvid}` : "",
      "",
      d.description || "暂无简介"
    ].filter(Boolean);
    try {
      await navigator.clipboard.writeText(e.join(`
`)), J("已复制视频简介到剪贴板");
    } catch {
      J("复制简介失败", !0);
    }
  },
  /**
   * 加载视频评论
   */
  async loadComments(e = !1) {
    e && (d.commentsPage = 1, d.comments = []), d.commentsLoading = !0;
    try {
      let t = d.aid;
      if (!t && d.bvid) {
        const n = await re.getVideoView(d.bvid);
        n?.aid && (t = String(n.aid), d.aid = t);
      }
      if (!t) {
        d.commentsLoading = !1;
        return;
      }
      const r = await re.getVideoComments(
        t,
        d.commentsPage,
        20,
        d.commentsSort
      ), i = (r.comments || []).map((n) => {
        const s = n.mid ? String(n.mid) : "", o = String(n.uname || "").trim(), a = d.authorMid ? String(d.authorMid) : "", c = String(d.author || "").trim(), l = !!(a && s && a === s || c && o && c === o);
        return {
          id: String(n.rpid),
          mid: s,
          uname: n.uname,
          avatar: n.avatar,
          message: n.message,
          timeStr: n.timeText,
          likeCount: n.like || 0,
          replyCount: n.rcount || 0,
          emotes: n.emotes,
          pictures: n.pictures || [],
          isUp: l,
          isTop: !!n.isTop,
          replies: (n.replies || []).map((u) => ({
            id: String(u.rpid),
            userName: u.uname,
            message: u.message,
            pictures: u.pictures || [],
            emotes: u.emotes
          }))
        };
      });
      e ? d.comments = i : d.comments = [...d.comments, ...i], d.totalComments = r.total || d.comments.length, d.hasMoreComments = r.hasMore;
    } catch (t) {
      J(`评论加载失败：${t?.message || "网络异常"}`, !0);
    } finally {
      d.commentsLoading = !1;
    }
  },
  /**
   * 切换评论排序
   */
  setCommentsSort(e) {
    d.commentsSort !== e && (d.commentsSort = e, this.loadComments(!0));
  },
  /**
   * 原地展开或加载更多楼中楼子回复
   */
  async expandSubReplies(e) {
    const t = d.comments.find((r) => String(r.id) === String(e));
    if (!(!t || t.subRepliesLoading)) {
      t.subRepliesPage ? t.subRepliesPage++ : t.subRepliesPage = 1, t.subRepliesLoading = !0, t.subRepliesExpanded = !0;
      try {
        let r = d.aid;
        if (!r && d.bvid) {
          const a = await re.getVideoView(d.bvid);
          a?.aid && (r = String(a.aid), d.aid = r);
        }
        if (!r) {
          t.subRepliesLoading = !1;
          return;
        }
        const i = await re.getSubReplies(r, e, t.subRepliesPage, 10), n = (i.replies || []).map((a) => ({
          id: String(a.rpid),
          userName: a.uname,
          message: a.message,
          pictures: a.pictures || [],
          emotes: a.emotes
        })), s = new Set((t.replies || []).map((a) => String(a.id))), o = n.filter((a) => !s.has(String(a.id)));
        t.replies = [...t.replies || [], ...o], t.subRepliesHasMore = i.hasMore;
      } catch (r) {
        J(`子回复加载失败：${r?.message || "网络异常"}`, !0);
      } finally {
        t.subRepliesLoading = !1;
      }
    }
  },
  /**
   * 收起已展开的楼中楼子回复
   */
  collapseSubReplies(e) {
    const t = d.comments.find((r) => String(r.id) === String(e));
    t && (t.subRepliesExpanded = !1);
  },
  /**
   * 加载更多评论
   */
  loadMoreComments() {
    d.commentsLoading || !d.hasMoreComments || (d.commentsPage++, this.loadComments(!1));
  }
}, wo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  MiniPlayerMachine: Cn,
  biliMiniPlayerController: yo,
  biliMiniPlayerState: d,
  miniPlayerMachine: M
}, Symbol.toStringTag, { value: "Module" }));
function bo() {
  if (d.isOpen && d.title)
    return {
      type: "bilibili",
      title: d.title,
      url: d.bvid ? `https://www.bilibili.com/video/${d.bvid}` : void 0,
      updatedAt: Date.now()
    };
  if (m.playing && m.title)
    return {
      type: "music",
      title: `${m.title} - ${m.artist || "未知歌手"}`,
      updatedAt: Date.now()
    };
  const e = le.activeId;
  if (e === "card-github")
    return { type: "github", title: "GitHub 热门开源仓库", updatedAt: Date.now() };
  if (e === "daily-bilibili")
    return { type: "bilibili", title: "Bilibili 视频工作区", updatedAt: Date.now() };
  if (e === "daily-aihot")
    return { type: "aihot", title: "AI HOT 热门前沿资讯", updatedAt: Date.now() };
  if (e === "daily-youtube")
    return { type: "youtube", title: "YouTube 精选视频流", updatedAt: Date.now() };
  if (e === "todoist")
    return { type: "idle", title: "Todoist 待办任务清单", updatedAt: Date.now() };
}
function vo(e) {
  switch (e.type) {
    case "music": {
      const t = e.meta?.musicTitle || "未知曲目", r = e.meta?.musicArtist ? ` - ${e.meta.musicArtist}` : "";
      return `🎵 音乐分享: 《${t}》${r}`;
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
function So(e, t) {
  if (f.visible) return;
  const r = t || A.channel || "main", i = A.rooms.find((o) => o.id === r), n = i?.name ? `#${i.name}` : void 0;
  let s = "assets/icon-48.png";
  if (e.sender?.avatar && /^https?:\/\//i.test(e.sender.avatar)) {
    const o = Tr(e.sender.avatar);
    o && (s = o);
  }
  he.show({
    id: `chat_msg_${e.id}`,
    appType: "chat",
    appName: "海狸聊天室",
    icon: s,
    title: e.sender?.name || "新消息",
    subtitle: n,
    message: vo(e),
    duration: 6500,
    level: "info",
    history: !0,
    target: { type: "module", moduleId: "chat" },
    actionLabel: "查看消息",
    onClick: () => {
      Er.handleToolClick("chat");
    }
  });
}
class ct extends Error {
  constructor(t) {
    super(`服务器响应 ${t}`), this.status = t, this.name = "PrivateChatHttpError";
  }
}
class Ge extends Error {
  constructor() {
    super(...arguments), this.name = "ChatCapabilityError";
  }
}
function Tn(e, t, r) {
  return new Promise((i, n) => {
    const s = new AbortController(), o = () => s.abort(new DOMException("聊天室操作已停止等待", "AbortError")), a = () => {
      clearTimeout(l), r?.removeEventListener("abort", o), s.signal.removeEventListener("abort", c);
    }, c = () => {
      a(), n(s.signal.reason);
    }, l = setTimeout(() => s.abort(new DOMException("聊天室操作超时，结果可能尚未确认", "TimeoutError")), e);
    if (s.signal.addEventListener("abort", c, { once: !0 }), r?.addEventListener("abort", o, { once: !0 }), r?.aborted) {
      o();
      return;
    }
    Promise.resolve().then(() => (s.signal.throwIfAborted(), t(s.signal))).then(
      (u) => {
        a(), s.signal.aborted ? n(s.signal.reason) : i(u);
      },
      (u) => {
        a(), n(u);
      }
    );
  });
}
class te extends Error {
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
class Ao {
  constructor(t = () => {
  }) {
    this.onBlocked = t;
  }
  open() {
    if (this.database) return this.database;
    const t = new Promise((r, i) => {
      let n = !1;
      const s = (a) => {
        n || (n = !0, clearTimeout(o), i(a));
      }, o = setTimeout(() => s(new te("timeout")), 8e3);
      try {
        const a = indexedDB.open("lw-private-chat-credentials", 1);
        a.onupgradeneeded = () => {
          if (n) {
            a.transaction?.abort();
            return;
          }
          a.result.createObjectStore("credentials");
        }, a.onsuccess = () => {
          const c = a.result;
          if (n) {
            c.close();
            return;
          }
          n = !0, clearTimeout(o), c.onversionchange = () => {
            c.close(), this.database === t && (this.database = void 0);
          }, r(c);
        }, a.onerror = () => s(new te("storage")), a.onblocked = () => {
          if (!n) {
            s(new te("blocked"));
            try {
              this.onBlocked();
            } catch {
            }
          }
        };
      } catch {
        s(new te("storage"));
      }
    });
    return this.database = t, t.catch(() => {
      this.database === t && (this.database = void 0);
    }), t;
  }
  read(t, r) {
    return this.access(t, void 0, r);
  }
  async write(t, r) {
    if (!Pt(r)) throw new te("invalid");
    await this.access(t, r);
  }
  access(t, r, i) {
    const n = I(t);
    return Tn(8e3, async (s) => {
      try {
        const o = await this.open();
        return s.throwIfAborted(), await new Promise((a, c) => {
          const l = o.transaction("credentials", r === void 0 ? "readonly" : "readwrite"), u = l.objectStore("credentials"), h = r === void 0 ? u.get(n) : u.put(r, n), p = () => {
            try {
              l.abort();
            } catch {
            }
          }, g = () => s.removeEventListener("abort", p);
          r === void 0 && s.addEventListener("abort", p, { once: !0 }), l.oncomplete = () => {
            g();
            const w = r === void 0 ? h.result : r;
            w === void 0 || w === "" ? c(new te("missing")) : Pt(w) ? a(w) : c(new te("invalid"));
          }, l.onabort = l.onerror = h.onerror = () => {
            g(), c(new te("storage"));
          };
        });
      } catch (o) {
        throw s.aborted ? s.reason : o instanceof te ? o : new te("storage");
      }
    }, i);
  }
}
class Be extends Error {
  constructor() {
    super(...arguments), this.name = "PrivateChatTransportError";
  }
}
class Eo {
  constructor(t) {
    this.ports = t;
  }
  async request(t) {
    let r, i;
    try {
      if (r = Object.freeze({ ...Wt(t.destination), channel: t.destination.channel }), i = new URL(t.path, r.origin), !t.path.startsWith("/api/v1/") || t.path.includes("\\") || i.origin !== r.origin || i.hash || i.username || i.password || !i.pathname.startsWith("/api/v1/")) throw new Error();
    } catch {
      throw new Be("聊天室请求目标无效");
    }
    const n = Object.freeze({ ...t, destination: r, path: i.pathname, method: (t.method || "GET").toUpperCase() });
    return i.searchParams.set("room", r.room), i.searchParams.delete("channel"), r.channel && r.channel !== "main" && i.searchParams.set("channel", r.channel), Tn(n.signal ? 3e4 : 15e3, async (s) => {
      try {
        const o = await this.ports.credential(r, s);
        if (s.throwIfAborted(), !Pt(o)) throw new te("invalid");
        this.ports.beforeSend(n);
        let a;
        try {
          a = n.body === void 0 ? void 0 : JSON.stringify(n.body);
        } catch {
          throw new Be("聊天室请求内容格式无效");
        }
        const c = await fetch(i, {
          method: n.method,
          signal: s,
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
        if (s.aborted && (l(), s.throwIfAborted()), !c.ok)
          throw l(), new ct(c.status);
        const u = c.body?.getReader();
        if (!u) throw new Be("聊天室返回空响应");
        const h = () => {
          u.cancel().catch(() => {
          });
        };
        s.addEventListener("abort", h, { once: !0 });
        let p = 0, g = "";
        const w = new TextDecoder();
        try {
          for (; ; ) {
            const b = await u.read();
            if (s.throwIfAborted(), b.done) break;
            if (p += b.value.byteLength, p > 2 * 1024 * 1024)
              throw h(), new Be("聊天室响应超限");
            g += w.decode(b.value, { stream: !0 });
          }
          try {
            return JSON.parse(g + w.decode());
          } catch {
            throw new Be("聊天室响应格式无效");
          }
        } finally {
          s.removeEventListener("abort", h);
          try {
            u.releaseLock();
          } catch {
          }
        }
      } catch (o) {
        throw s.aborted ? s.reason : o instanceof ct || o instanceof Ge || o instanceof te || o instanceof Be ? o : new Be("聊天室请求失败，请检查网络或服务配置");
      }
    }, n.signal);
  }
}
class _o {
  constructor(t) {
    this.ports = t, this.generation = 0, this.halted = !0, this.liveGeneration = -1, this.reads = new ss();
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
    const r = Object.freeze({ ...t }), i = this.invalidate();
    i !== this.generation || !this.ports.active(r) || (this.halted = !1, this.ports.started(), this.tick(r, i, 0));
  }
  owns(t, r) {
    return this.generation === r && !this.halted && this.ports.active(t);
  }
  schedule(t, r, i) {
    clearTimeout(this.timer), this.timer = setTimeout(() => {
      this.timer = void 0, i === this.generation && t();
    }, r);
  }
  async tick(t, r, i) {
    if (!this.owns(t, r)) return;
    if (this.running) {
      this.schedule(() => {
        this.tick(t, r, i);
      }, 250, r);
      return;
    }
    const n = /* @__PURE__ */ Symbol("chat-sync");
    this.running = n;
    const s = this.ports.visible(), o = this.reads.begin({ timeoutMs: s ? 25e3 : 2e4, isCurrent: () => this.owns(t, r) });
    let a = s ? 2500 : 1e4, c = "读取本地历史";
    const l = {
      signal: o.signal,
      current: o.current,
      wait: o.wait,
      visible: s,
      phase: (u) => {
        c = u;
      },
      restoring: () => this.liveGeneration !== r,
      caughtUp: () => {
        o.current() && (this.liveGeneration = r);
      }
    };
    try {
      this.ports.started();
      const u = await o.wait(() => this.ports.poll(t, l));
      if (!o.current()) return;
      i = 0, u?.hasMore && (a = 250);
    } catch (u) {
      if (!this.owns(t, r)) return;
      const h = this.ports.classify(u, t);
      h === "retry" ? (++i, a = Math.min(6e4, 1500 * 2 ** Math.min(i, 4))) : this.halted = !0, this.ports.failed(h, c, i), h === "missing-room" && r === this.generation && this.halted && this.schedule(() => this.ports.restart(), 0, r);
    } finally {
      o.finish(), this.running === n && (this.running = void 0), r === this.generation && (this.ports.active(t) || (this.halted = !0), this.ports.idle()), this.owns(t, r) && this.schedule(() => {
        this.tick(t, r, i);
      }, a, r);
    }
  }
}
const Ae = (e) => !!e && typeof e == "object" && !Array.isArray(e), Re = (e) => typeof e == "string" && /^[A-Za-z0-9_-]{1,160}$/.test(e), Et = (e) => e == null, Rt = (e) => typeof e == "number" && Number.isFinite(e) && e >= 0;
function Y() {
  throw new Error("同步页格式无效，未提交本页记录或推进游标");
}
function Lr(e) {
  if (!Array.isArray(e) || e.length > 32) throw new Error("房间列表格式无效");
  return e.map((t) => {
    if (!Ae(t) || !Re(t.id) || typeof t.name != "string" || t.name.length > 80 || typeof t.icon != "string" || t.icon.length > 8 || typeof t.description != "string" || t.description.length > 500) throw new Error("房间格式无效");
    if (t.space !== void 0 && !Re(t.space)) throw new Error("空间格式无效");
    return { id: t.id, name: t.name, icon: t.icon, description: t.description, space: typeof t.space == "string" ? t.space : "hub_main" };
  });
}
function Dr(e) {
  if (!Array.isArray(e) || e.length > 16) throw new Error("空间列表格式无效");
  return e.map((t) => {
    if (!Ae(t) || !Re(t.id) || typeof t.name != "string" || t.name.length > 80 || typeof t.icon != "string" || t.icon.length > 8) throw new Error("空间格式无效");
    return { id: t.id, name: t.name, icon: t.icon };
  });
}
function kn(e, t) {
  if (typeof e.name != "string" || e.name.length > 200) return;
  const r = Fs({ ...e, name: e.name.slice(0, 100) }, t);
  return r && { ...r, name: e.name };
}
function Co(e, t) {
  return Et(e) ? [] : ((!Array.isArray(e) || e.length > 65) && Y(), e.map((r) => {
    (!Ae(r) || !Re(r.uid) || r.role !== void 0 && r.role !== "owner" && r.role !== "member") && Y();
    const i = kn(r, t);
    return i || Y(), i.activity && Ae(r.activity) && Rt(r.activity.updatedAt) && (i.activity.updatedAt = r.activity.updatedAt), {
      ...i,
      role: r.role === "owner" ? "owner" : "member",
      online: typeof r.online == "boolean" ? r.online : void 0,
      lastSeen: Rt(r.lastSeen) ? r.lastSeen : void 0
    };
  }));
}
function To(e, t, r) {
  if (!Et(e))
    return (!Array.isArray(e) || e.length > 200) && Y(), e.map((i) => {
      (!Ae(i) || !Re(i.id) || !Re(i.toUid) || !Ae(i.from) || !Re(i.from.uid)) && Y();
      const n = kn(i.from, r);
      return (!n || n.uid !== t && i.toUid !== t || !["pending", "accepted", "rejected"].includes(String(i.status))) && Y(), i.createdAt !== void 0 && !Rt(i.createdAt) && Y(), {
        id: i.id,
        from: n,
        toUid: i.toUid,
        status: i.status,
        createdAt: Rt(i.createdAt) ? i.createdAt : r,
        note: typeof i.note == "string" && i.note.length <= 200 ? i.note : void 0
      };
    });
}
function ko(e, t, r, i) {
  (!Number.isSafeInteger(r) || r < 0 || !Rt(i) || !Ae(e) || !Ae(e.identity) || e.identity.uid !== t || e.identity.role !== "owner" && e.identity.role !== "member" || !Array.isArray(e.messages) || e.messages.length > 50) && Y();
  let n = r;
  const s = [], o = [];
  for (const l of e.messages) {
    (!Ae(l) || !Number.isSafeInteger(l.seq) || l.seq <= n) && Y();
    const u = fn(l.message, i);
    u || Y(), s.push(u), o.push(l.seq), n = l.seq;
  }
  e.hasMore !== void 0 && typeof e.hasMore != "boolean" && Y();
  const a = e.hasMore === !0;
  a && !s.length && Y();
  let c;
  return Et(e.friends) || ((!Array.isArray(e.friends) || e.friends.length > 4096 || !e.friends.every(Re)) && Y(), c = [...new Set(e.friends)]), Object.freeze({
    uid: t,
    role: e.identity.role,
    messages: s,
    sequences: o,
    next: n,
    hasMore: a,
    capabilities: js(e.capabilities),
    rooms: Et(e.rooms) ? [{ id: "main", name: "综合讨论", icon: "💬", description: "" }] : Lr(e.rooms),
    spaces: Et(e.spaces) ? [{ id: "hub_main", name: "聊天室", icon: "🏠" }] : Dr(e.spaces),
    roomsSupported: Array.isArray(e.rooms),
    spacesSupported: Array.isArray(e.spaces),
    members: Co(e.members, i),
    friends: c,
    friendRequests: To(e.friendRequests, t, i)
  });
}
function mt(e, t, r) {
  for (const i of Object.keys(t)) {
    if (!r()) return !1;
    e[i] = t[i];
  }
  return r();
}
function Io(e, t, r, i) {
  const { chat: n, service: s } = i, o = r.current;
  if (!o()) return !1;
  const a = r.restoring();
  for (let y = 0; y < e.messages.length; y++) {
    if (!o()) return !1;
    const _ = e.messages[y];
    i.publish(_, Object.freeze({
      scope: t.scope,
      channel: t.channel,
      sequence: e.sequences[y],
      source: a ? "history" : _.sender.uid === e.uid ? "self" : "live"
    }), o);
  }
  if (!o()) return !1;
  const c = new Set(n.messages.map((y) => y.id)), l = e.messages.filter((y) => y.sender.uid !== e.uid && !y.meta?.silentPartySync && y.type !== "system" && !c.has(y.id)), u = n.visible ? [] : l.filter((y) => (t.cursor > 0 || t.now - y.timestamp < 3e4) && (y.type !== "music_party" || !a)).slice(-3), h = new Map(n.messages.map((y) => [y.id, y]));
  for (const y of e.messages) h.set(y.id, y);
  const p = Object.assign(/* @__PURE__ */ Object.create(null), n.userActivities);
  for (const y of e.members) y.activity && (p[y.uid] = y.activity);
  const g = [], w = new Set(n.friends.map((y) => y.uid)), b = new Map(e.members.map((y) => [y.uid, y]));
  for (const y of e.friends || []) {
    const _ = b.get(y);
    _ && !w.has(y) && (g.push({ uid: y, name: _.name, avatar: _.avatar, addedAt: t.now, status: "mutual" }), w.add(y));
  }
  if (!mt(n, {
    messages: [...h.values()].sort((y, _) => y.timestamp - _.timestamp || y.id.localeCompare(_.id)).slice(-200),
    unreadCount: l.length ? n.visible ? 0 : n.unreadCount + l.length : n.unreadCount
  }, o) || !mt(s, {
    capabilities: e.capabilities,
    imageMessagesSupported: e.capabilities.messageTypes.includes("image"),
    spacesSupported: e.spacesSupported,
    spaces: e.spaces,
    roomsSupported: e.roomsSupported,
    rooms: e.rooms
  }, o) || (i.authenticated(), !o()) || !mt(s, { role: e.role, members: e.members, ...e.friends === void 0 ? {} : { friends: e.friends } }, o)) return !1;
  for (const y of g) {
    if (!o()) return !1;
    n.friends.some((_) => _.uid === y.uid) || n.friends.push(y);
  }
  const S = e.members.some((y) => !!y.activity) || Object.getPrototypeOf(n.userActivities) !== null ? { userActivities: p } : {};
  if (!mt(n, {
    ...S,
    ...e.friendRequests === void 0 ? {} : { friendRequests: e.friendRequests },
    connected: !0,
    connecting: !1,
    error: ""
  }, o) || !mt(s, { status: "已连接私有服务器" }, o)) return !1;
  e.hasMore || r.caughtUp();
  for (const y of u) {
    if (!o()) return !1;
    if (n.visible) break;
    try {
      i.notify(y, t.channel);
    } catch {
      console.warn("[PrivateChat] notification failed");
    }
  }
  return o();
}
const Ve = "private-relay-server";
class Uo {
  constructor(t) {
    this.ports = t, this.flushing = !1;
  }
  async postAndAcknowledge(t, r, i = 12e3) {
    const n = Object.freeze({ ...t }), s = kt(this.ports.capabilities(n), r);
    if (s) throw new Ge(s);
    const o = await this.ports.post(n, r, AbortSignal.timeout(i));
    if (!o || o.stored !== !0 || o.id !== r.id) throw new Error("未收到服务器落盘确认");
    await co(this.ports.scope(n), r.id, Ve);
  }
  async recordFailure(t, r, i, n) {
    try {
      if (i instanceof Ge) {
        Q.value = i.message, await xi(this.ports.scope(t), r, Ve, !1, n, !0);
        return;
      }
      const s = i instanceof ct && i.status >= 400 && i.status < 500 && ![408, 429].includes(i.status);
      await xi(this.ports.scope(t), r, Ve, s, n);
    } catch {
      Q.value = "无法保存消息的发送状态，请检查浏览器存储。";
    }
  }
  async flush(t) {
    if (this.flushing || !this.ports.active(t) || ["unknown", "incompatible"].includes(this.ports.capabilities(t).status)) return;
    this.flushing = !0;
    const r = [];
    try {
      const i = this.ports.destinations(t).map((s) => Object.freeze({ ...s }));
      let n = 8;
      for (const s of i) {
        if (!n || !this.ports.active(t)) break;
        await lo(this.ports.scope(s), [Ve], () => this.ports.active(t), (o, a, c) => {
          --n;
          const l = { ...a, sender: { ...a.sender, avatar: this.ports.avatar(a.sender.avatar) } };
          return r.push(this.postAndAcknowledge(s, l).catch((u) => this.recordFailure(s, a.id, u, c))), !0;
        }, n, (o) => !kt(this.ports.capabilities(s), o));
      }
    } catch {
      Q.value = "待发队列处理未确认，请检查本地存储；未改投其他房间。";
    } finally {
      await Promise.allSettled(r), this.flushing = !1;
    }
  }
}
const or = [];
function gc(e) {
  return or.push(e), () => {
    const t = or.indexOf(e);
    t >= 0 && or.splice(t, 1);
  };
}
async function yc() {
  const e = v.room;
  if (!e || e.uid !== f.currentUser.uid) throw new Error("请先在聊天室设置中加入自己的聊天室");
  const t = { ...e }, r = await Z(t, "/api/v1/rooms", "GET", void 0, AbortSignal.timeout(15e3));
  if (!v.room || I(t) !== I(v.room)) throw new Error("聊天室配置已改变，请重新选择");
  const i = r.spaces ? Dr(r.spaces) : [];
  return Lr(r.rooms).map((n) => ({ ...t, channel: n.id, name: `${i.find((s) => s.id === n.space)?.name || "聊天室"} / ${n.name}` }));
}
async function ri(e, t) {
  const r = v.room;
  if (!r || I(r) !== I(t) || f.currentUser.uid !== t.uid) throw new Error("聊天室身份已改变，未发送，请重新选择房间");
  const i = $t(e);
  if (!i || i.type === "system" || i.type === "image") throw new Error("分享内容无效或超出大小限制，未发送");
  const n = { ...t };
  i.sender = { ...i.sender, uid: n.uid, avatar: Mr(f.currentUser.avatar, ce.avatarUrl), name: f.currentUser.name };
  const s = kt(Vt(n), i);
  if (s) throw new Error(s);
  await Ur(Oe(n), [i]), await En(Oe(n), i, [Ve]), Ee(n) && !f.messages.some((o) => o.id === i.id) && f.messages.push(i);
  try {
    await yr.postAndAcknowledge(n, i, 15e3);
  } catch (o) {
    throw await yr.recordFailure(n, i.id, o, 0), $r(), new Error(`未收到「${n.name}」的保存确认；已保留在该房间待发队列，请勿重复发送。`);
  }
}
const A = K({
  status: "未配置私有服务器",
  role: "",
  syncing: !1,
  channel: "main",
  rooms: [],
  spaces: [],
  spacesSupported: !1,
  imageMessagesSupported: !1,
  capabilities: Cr(),
  roomsSupported: !1,
  friends: [],
  members: []
});
function Vt(e) {
  return Ke === I(e) && v.room && I(v.room) === I(e) && f.currentUser.uid === e.uid ? A.capabilities : Cr();
}
function xr() {
  A.capabilities = Cr(), A.imageMessagesSupported = !1;
}
const yr = new Uo({
  active: Ee,
  capabilities: Vt,
  scope: Oe,
  avatar: (e) => Mr(e, ce.avatarUrl),
  destinations: (e) => [He(e), ...A.rooms.filter((t) => t.id !== A.channel).map((t) => ({ ...e, channel: t.id }))],
  post: (e, t, r) => Z(e, "/api/v1/messages", "POST", { message: t }, r)
}), In = new Ao(() => {
  A.status = "凭证数据库被旧标签页阻塞，请关闭旧页后重试";
}), Mo = new Eo({
  credential: (e, t) => In.read(e, t),
  beforeSend: ({ destination: e, path: t, method: r, body: i }) => {
    if (!ie.isInstalled("chat")) throw new Ge("聊天室实验组件已停用，未发起请求");
    const n = t === "/api/v1/members" || t.startsWith("/api/v1/members/"), s = r !== "GET" && ["/api/v1/spaces", "/api/v1/rooms"].some((o) => t === o || t.startsWith(o + "/"));
    if ((n || s) && (!f.connected || A.role !== "owner" || Ke !== I(e) || !v.room || I(v.room) !== I(e) || f.currentUser.uid !== e.uid))
      throw new ct(403);
    if (r === "POST" && t === "/api/v1/messages") {
      const o = kt(Vt(e), i.message);
      if (o) throw new Ge(o);
    }
  }
});
function Po(e) {
  const t = "BEAVER-PRIVATE1:";
  if (!e.startsWith(t) || e.length > 8e3) throw new Error("请粘贴新版私有聊天室邀请");
  try {
    const r = JSON.parse(decodeURIComponent(atob(e.slice(t.length))));
    if (!r || !Pt(r.token)) throw new Error();
    return { ...Wt(r), token: r.token };
  } catch {
    throw new Error("邀请格式无效");
  }
}
let ii = 0;
async function wc(e) {
  if (!ie.isInstalled("chat")) throw new Ge("请先在商店手动启用聊天室实验组件");
  const t = Po(e);
  if (t.uid !== f.currentUser.uid) throw new Error("此邀请不属于当前 UID，请让服主为当前账号重新创建");
  const r = Wt(t), i = v.room ? I(v.room) : null;
  Ot();
  const n = ii;
  if (await In.write(r, t.token), n !== ii || f.currentUser.uid !== t.uid || i !== (v.room ? I(v.room) : null))
    throw new Error("凭据已保存，但身份或连接选择已改变，未激活旧邀请；如需加入请重新确认。");
  Ot(), so(r), f.transportMode = "relay", Bt(An(r), t.room), Ne();
}
function Z(e, t, r = "GET", i, n) {
  return ie.isInstalled("chat") ? Mo.request({ destination: e, path: t, method: r, body: i, signal: n }) : Promise.reject(new Ge("请先在商店手动启用聊天室实验组件"));
}
async function Un(e, t, r) {
  const i = v.room;
  if (!i) throw new Error("未配置私有服务器");
  return Z({ ...i }, e, t, r, AbortSignal.timeout(15e3));
}
async function bc() {
  return (await Un("/api/v1/members", "GET")).members;
}
async function Ro(e, t) {
  const r = v.room;
  if (!r) throw new Error("未配置私有服务器");
  const i = { ...r }, n = await Z(i, "/api/v1/members", "POST", { uid: e, name: t }, AbortSignal.timeout(15e3));
  if (!Pt(n.token)) throw new Error("服务器返回无效，勿重复创建，请刷新成员列表");
  return "BEAVER-PRIVATE1:" + btoa(encodeURIComponent(JSON.stringify({ ...i, uid: e, token: n.token })));
}
async function vc(e) {
  const t = v.room;
  if (!t) throw new Error("未配置私有服务器，无法发送邀请");
  if (e.uid === f.currentUser.uid) throw new Error("不能邀请自己");
  const r = Vt(t);
  if (!r.messageTypes.includes("server_invite")) throw new Error(r.status === "unknown" || r.status === "incompatible" ? r.reason : "服务端未启用邀请卡消息，未创建新成员邀请。");
  const i = await Ro(e.uid, e.name), n = A.spaces.find((h) => h.id === (A.rooms.find((p) => p.id === A.channel)?.space || "hub_main")), s = A.rooms.find((h) => h.id === A.channel) || A.rooms[0], o = n?.name || t.room || "海狸聊天室", a = s?.name || "综合讨论";
  let c = "";
  try {
    c = JSON.parse(decodeURIComponent(atob(i.replace(/^BEAVER-PRIVATE1:/, "")))).token || "";
  } catch {
  }
  const l = {
    id: `msg_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    sender: {
      uid: f.currentUser.uid,
      name: f.currentUser.name,
      avatar: f.currentUser.avatar
    },
    type: "server_invite",
    content: `邀请你加入【${o}】聊天室`,
    meta: {
      inviteOrigin: t.origin,
      inviteRoom: t.room,
      inviteRoomName: a,
      inviteServerName: o,
      inviteServerIcon: n?.icon || "🏠",
      inviteToken: c,
      inviteTargetUid: e.uid,
      inviteCode: i
    },
    timestamp: Date.now()
  }, u = Mn(e.uid);
  await ri(l, {
    ...t,
    channel: u,
    name: `私聊 / ${e.name}`
  }), Oo(e.uid);
}
async function Sc(e) {
  if (!/^[a-f0-9]{32}$/.test(e)) throw new Error("成员标识无效");
  await Un("/api/v1/members/" + e, "DELETE");
}
function He(e) {
  return { ...e, channel: A.channel };
}
function Ft(e) {
  const t = new URL(An(e)), r = e.channel || "main";
  return r !== "main" && t.searchParams.set("channel", r), t.href;
}
function Oe(e) {
  return di(e.uid, Ft(e), e.room);
}
function Ee(e) {
  return ie.isInstalled("chat") && f.currentUser.uid === e.uid && f.serverUrl === Ft(e) && (e.channel || "main") === A.channel && f.currentRoomId === e.room && v.room !== null && I(v.room) === I(e);
}
function Ac() {
  const e = v.room && He(v.room);
  return e && Ee(e) ? { scope: Oe(e), channel: e.channel } : null;
}
function Mn(e) {
  return "dm_" + [f.currentUser.uid, e].sort().join("__");
}
function Ec(e) {
  if (!e.startsWith("dm_")) return;
  const t = e.slice(3).split("__");
  if (t.length === 2)
    return t.find((r) => r !== f.currentUser.uid);
}
function Oo(e) {
  const t = v.room;
  if (!t || !e || e === f.currentUser.uid) return;
  const r = Mn(e);
  r === A.channel && Ee(He(t)) || Bt(Ft({ ...t, channel: r }), t.room, !0) && (A.channel = r, Ne());
}
async function No(e) {
  const t = v.room;
  if (!t) throw new Error("未配置私有服务器");
  await Z({ ...t }, "/api/v1/friends/request", "POST", { toUid: e }, AbortSignal.timeout(15e3));
}
async function Lo(e, t) {
  const r = v.room;
  if (!r) throw new Error("未配置私有服务器");
  await Z({ ...r }, "/api/v1/friends/respond", "POST", { id: e, accept: t }, AbortSignal.timeout(15e3));
}
function Pn(e) {
  const t = v.room;
  if (!(!t || !A.rooms.some((r) => r.id === e))) {
    if (e === A.channel && Ee(He(t))) {
      $r();
      return;
    }
    Bt(Ft({ ...t, channel: e }), t.room, Ke === I(t) && f.currentUser.uid === t.uid) && (A.channel = e, Ne());
  }
}
async function _c(e, t) {
  const r = v.room;
  if (!r) throw new Error("未配置");
  const i = I(r), n = { ...r };
  await Z(n, t ? `/api/v1/rooms/${encodeURIComponent(t)}` : "/api/v1/rooms", "POST", e, AbortSignal.timeout(15e3));
  const s = await Z(n, "/api/v1/rooms", "GET", void 0, AbortSignal.timeout(15e3));
  if (v.room && I(v.room) === i && f.currentUser.uid === r.uid) {
    const o = Lr(s.rooms), a = s.spaces ? Dr(s.spaces) : void 0;
    A.rooms = o, a && v.room && I(v.room) === i && f.currentUser.uid === r.uid && (A.spaces = a);
  }
}
async function Cc(e) {
  if (e === "main") throw new Error("默认房间不可移除");
  const t = v.room;
  if (!t) throw new Error("未配置");
  const r = I(t);
  await Z({ ...t }, `/api/v1/rooms/${encodeURIComponent(e)}`, "DELETE", void 0, AbortSignal.timeout(15e3)), !(!v.room || I(v.room) !== r) && (A.rooms = A.rooms.filter((i) => i.id !== e), A.channel === e && Pn("main"));
}
async function Tc(e, t) {
  const r = v.room;
  if (!r) throw new Error("未配置");
  const i = I(r);
  await Z({ ...r }, t ? `/api/v1/spaces/${encodeURIComponent(t)}` : "/api/v1/spaces", "POST", e, AbortSignal.timeout(15e3)), v.room && I(v.room) === i && await Rn(r);
}
async function kc(e) {
  if (e === "hub_main") throw new Error("默认空间不可移除");
  const t = v.room;
  if (!t) throw new Error("未配置");
  const r = I(t), i = A.channel;
  await Z({ ...t }, `/api/v1/spaces/${encodeURIComponent(e)}`, "DELETE", void 0, AbortSignal.timeout(15e3)), !(!v.room || I(v.room) !== r || f.currentUser.uid !== t.uid) && (await Rn(t), !(!v.room || I(v.room) !== r || f.currentUser.uid !== t.uid) && A.channel === i && !A.rooms.some((n) => n.id === i) && Pn("main"));
}
async function Rn(e) {
  const t = await Z({ ...e }, "/api/v1/spaces", "GET", void 0, AbortSignal.timeout(15e3));
  if (!v.room || I(v.room) !== I(e) || f.currentUser.uid !== e.uid) return;
  const r = Dr(t.spaces), i = Lr(t.rooms);
  A.spaces = r, v.room && I(v.room) === I(e) && f.currentUser.uid === e.uid && (A.rooms = i);
}
let On = "", Ke = "";
const yi = new _o({
  active: Ee,
  visible: () => f.visible,
  poll: Do,
  started: () => {
    f.connecting = !f.connected, A.syncing = !0;
  },
  idle: () => {
    A.syncing = !1;
  },
  classify: (e, t) => e instanceof ct && e.status === 404 && (t.channel || "main") !== "main" ? "missing-room" : e instanceof ct && [401, 403].includes(e.status) ? "auth" : "retry",
  failed: (e, t, r) => {
    e === "missing-room" ? (A.channel = "main", A.status = "房间已移除，正在返回综合讨论") : e === "auth" ? (Ke = "", xr(), A.role = "", f.error = "访问凭证已失效、过期或不属于此房间，请重新导入邀请", f.connected = !1, f.connecting = !1) : r >= 2 && (f.connected = !1, f.connecting = !1, f.error = `${t}失败或超时，记录与待发队列保留，将自动重试。若持续失败，请关闭旧标签页后重试，并检查服务配置。`, A.status = f.error);
  },
  restart: () => Ne()
});
function $r() {
  const e = v.room && He(v.room);
  e && !yi.stopped && On === I(e) && Ee(e) || Ne();
}
function Nn() {
  yi.cancel();
}
function Ot() {
  ++ii, Nn(), Ke = "", xr(), f.connected = !1, f.connecting = !1, A.role = "";
}
function Ne() {
  if (!ie.isInstalled("chat")) {
    Ot(), f.visible = !1, f.error = "", A.status = "实验性组件默认关闭，请先在商店手动启用";
    return;
  }
  const e = v.room && He(v.room), t = !!e && Ke === I(e) && f.currentUser.uid === e.uid;
  if (t ? Nn() : Ot(), !e) {
    A.status = "尚未读取到聊天室配置，请在此窗口设置中检查", f.error = "";
    return;
  }
  if (e.uid !== f.currentUser.uid) {
    f.error = A.status = "邀请 UID 与本机不一致，请重新导入属于本机的邀请";
    return;
  }
  f.transportMode = "relay", Bt(Ft(e), e.room, t) && (On = I(e), f.connected || (A.status = "正在同步"), yi.start(e));
}
async function Do(e, t) {
  const r = Oe(e), i = e.channel || "main", n = await t.wait(() => Gs(r)), s = Mr(f.currentUser.avatar, ce.avatarUrl), o = f.currentUser.activity || bo(), a = f.shareActivity !== !1 && o?.title ? `&act_type=${encodeURIComponent(o.type || "")}&act_title=${encodeURIComponent(o.title || "")}&act_url=${encodeURIComponent(o.url || "")}` : "", c = t.visible ? "&wait=6" : "", l = `/api/v1/sync?after=${n}&avatar=${encodeURIComponent(s)}&name=${encodeURIComponent(f.currentUser.name.slice(0, 100))}${a}${c}`;
  t.phase("连接私有服务器");
  const u = await t.wait(() => Z(e, l, "GET", void 0, t.signal));
  if (!t.current()) return;
  t.phase("校验同步页");
  let h;
  try {
    h = ko(u, e.uid, n, Date.now());
  } catch (p) {
    throw t.current() && xr(), p;
  }
  if (t.current() && (t.phase("保存同步记录"), await t.wait(() => Hs(r, h.messages, h.next)), !!t.current())) {
    try {
      await t.wait(() => _n(r, h.messages.filter((p) => p.sender.uid === e.uid).map((p) => p.id), Ve));
    } catch {
      t.current() && (Q.value = "无法保存消息的发送确认，请检查浏览器存储。");
    }
    if (t.current() && (t.phase("应用同步状态"), !!Io(h, { scope: r, channel: i, cursor: n, now: Date.now() }, t, {
      chat: f,
      service: A,
      authenticated: () => {
        Ke = I(e);
      },
      publish: (p, g, w) => {
        for (const b of [...or]) {
          if (!w()) return;
          try {
            b(p, g);
          } catch {
            console.warn("[PrivateChat] message listener failed");
          }
        }
      },
      notify: So
    }) && t.current()))
      return t.phase("处理待发消息"), yr.flush(e), { hasMore: h.hasMore };
  }
}
async function Zt(e) {
  const t = v.room && He(v.room);
  if (!t || !Ee(t))
    return Q.value = "未配置此房间的私有服务器，未发送", !1;
  e.sender && (e.sender.avatar = Mr(f.currentUser.avatar, ce.avatarUrl), f.currentUser.name && (e.sender.name = f.currentUser.name));
  const r = $t(e);
  if (!r || r.type === "system")
    return Q.value = "消息格式无效，未发送", !1;
  const i = kt(Vt(t), r);
  if (i)
    return Q.value = i, !1;
  const n = { ...t };
  try {
    return await Ur(Oe(n), [r]), await En(Oe(n), r, [Ve]), Ee(n) && !f.messages.some((s) => s.id === r.id) && f.messages.push(r), Q.value = "", yr.flush(n), !0;
  } catch {
    return Q.value = "消息未能保存到待发队列，请勿刷新，检查存储后重试", !1;
  }
}
let Wi = !1;
function xo() {
  Wi || (Wi = !0, Pe(() => [ie.isInstalled("chat"), JSON.stringify(v.room)], () => {
    const e = v.room;
    A.members = [], A.rooms = [], A.roomsSupported = !1, A.spaces = [], A.spacesSupported = !1, xr(), A.channel = "main", (!e || !ie.isInstalled("chat")) && (f.visible = !1, A.members = []), Ne();
  }, { immediate: !0, flush: "sync" }), Pe(() => f.visible, (e) => {
    e && $r();
  }), Pe(() => f.currentUser.uid, () => Ne()), ie.isInstalled("chat") && v.room && dt(Oe(v.room)).catch(() => {
    Q.value = "待发队列读取失败，请关闭旧标签页后重试";
  }));
}
class $o {
  constructor() {
    xo();
  }
  connect() {
    $r();
  }
  disconnect() {
    Ot();
  }
  resetReconnectAndConnect() {
    Ne();
  }
  async retryMessage(t) {
    await Zt(t);
  }
  dispatchOutgoing(t, r) {
    if (!r) {
      Zt(t);
      return;
    }
    ri(t, r).then(() => {
      he.fetch("海狸聊天室", `已发送到 ${r.name}`, "服务器已保存，不代表成员已读。");
    }).catch((i) => {
      he.fetch("海狸聊天室", "分享未确认", i instanceof Error ? i.message : "未确认发送结果，请检查聊天室连接。");
    });
  }
  sendWebsiteShare(t, r) {
    const i = xt(t.url);
    if (!i) {
      he.fetch("海狸聊天室", "未发送", "只支持分享有效的 HTTP(S) 网站地址。");
      return;
    }
    const n = (t.title || "网站").slice(0, 100), s = {
      id: `msg_${crypto.randomUUID()}`,
      sender: { ...f.currentUser, activity: f.shareActivity ? f.currentUser.activity : void 0 },
      type: "website",
      content: `分享了常用网站：${n}`,
      meta: {
        linkTitle: n,
        linkUrl: i,
        linkIcon: t.icon || "",
        linkNote: (t.note || "").slice(0, 200)
      },
      timestamp: Date.now()
    };
    this.dispatchOutgoing(s, r);
  }
  async sendTextMessage(t, r) {
    const i = t.trim();
    if (!i) return !1;
    const n = {
      id: `msg_${crypto.randomUUID()}`,
      sender: { ...f.currentUser, activity: f.shareActivity ? f.currentUser.activity : void 0 },
      type: "text",
      content: i,
      timestamp: Date.now()
    };
    if (!r) return Zt(n);
    try {
      return await ri(n, r), !0;
    } catch (s) {
      return he.fetch("海狸聊天室", "分享未确认", s instanceof Error ? s.message : "未确认发送结果，请检查聊天室连接。"), !1;
    }
  }
  sendMusicShare(t, r) {
    const i = {
      id: `msg_${crypto.randomUUID()}`,
      sender: { ...f.currentUser, activity: f.shareActivity ? f.currentUser.activity : void 0 },
      type: "music",
      content: `正在听：${t.musicTitle} - ${t.musicArtist}`,
      meta: t,
      timestamp: Date.now()
    };
    this.dispatchOutgoing(i, r);
  }
  sendBiliShare(t, r) {
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
    }, n = {
      id: `msg_${crypto.randomUUID()}`,
      sender: { ...f.currentUser, activity: f.shareActivity ? f.currentUser.activity : void 0 },
      type: "bilibili",
      content: `分享了B站视频：${t.title}`,
      meta: i,
      timestamp: Date.now()
    };
    this.dispatchOutgoing(n, r);
  }
  sendGitHubShare(t, r) {
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
    }, n = {
      id: `msg_${crypto.randomUUID()}`,
      sender: { ...f.currentUser, activity: f.shareActivity ? f.currentUser.activity : void 0 },
      type: "github",
      content: `分享了GitHub仓库：${t.fullName}`,
      meta: i,
      timestamp: Date.now()
    };
    this.dispatchOutgoing(n, r);
  }
  sendBiliSeriesShare(t, r) {
    const i = {
      seriesId: t.id,
      seriesName: t.name,
      seriesCount: t.count,
      seriesItems: t.items.map((s) => ({
        id: s.id,
        aid: s.aid,
        bvid: s.bvid,
        title: s.title,
        cover: s.cover,
        author: s.author,
        duration: s.duration != null ? String(s.duration) : void 0
      }))
    }, n = {
      id: `msg_${crypto.randomUUID()}`,
      sender: { ...f.currentUser, activity: f.shareActivity ? f.currentUser.activity : void 0 },
      type: "bili_series",
      content: `分享了B站电台系列：${t.name} (${t.count}首)`,
      meta: i,
      timestamp: Date.now()
    };
    this.dispatchOutgoing(n, r);
  }
  async sendImageMessage(t) {
    if (!t) return !1;
    const r = {
      id: `msg_${crypto.randomUUID()}`,
      sender: { ...f.currentUser, activity: f.shareActivity ? f.currentUser.activity : void 0 },
      type: "image",
      content: "[图片]",
      meta: {
        imageUrl: t
      },
      timestamp: Date.now()
    };
    return Zt(r);
  }
  sendAiHotShare(t, r) {
    const i = {
      aihotTitle: t.title,
      aihotSummary: t.summary,
      aihotSource: t.sourceName || "AI资讯",
      aihotCategory: t.category || "AI HOT",
      aihotUrl: t.url,
      aihotDate: t.published
    }, n = {
      id: `msg_${crypto.randomUUID()}`,
      sender: { ...f.currentUser, activity: f.shareActivity ? f.currentUser.activity : void 0 },
      type: "aihot",
      content: `分享了AI热点：${t.title}`,
      meta: i,
      timestamp: Date.now()
    };
    this.dispatchOutgoing(n, r);
  }
  sendYouTubeShare(t, r) {
    const i = {
      youtubeId: t.id,
      youtubeTitle: t.title,
      youtubeCover: t.cover,
      youtubeAuthor: t.author || "YouTube",
      youtubeViews: t.views,
      youtubeUrl: t.url || `https://www.youtube.com/watch?v=${t.id}`
    }, n = {
      id: `msg_${crypto.randomUUID()}`,
      sender: { ...f.currentUser, activity: f.shareActivity ? f.currentUser.activity : void 0 },
      type: "youtube",
      content: `分享了YouTube视频：${t.title}`,
      meta: i,
      timestamp: Date.now()
    };
    this.dispatchOutgoing(n, r);
  }
  sendActivity(t) {
  }
  sendFriendRequest(t, r) {
    !t.uid || t.uid === f.currentUser.uid || No(t.uid).then(() => {
      he.fetch("海狸聊天室", `已向【${t.name}】发送好友申请`, "对方可在聊天室右上角通知中确认。");
    }).catch((i) => {
      he.fetch("海狸聊天室", "好友申请未发送", i instanceof Error ? i.message : "请检查聊天室连接。");
    });
  }
  respondFriendRequest(t, r) {
    t.id && Lo(t.id, r).then(() => {
      he.fetch("海狸聊天室", r ? `已通过【${t.from.name}】的好友申请` : "已忽略该申请", r ? "双方已成为好友，可随时点击私聊。" : "");
    }).catch((i) => {
      he.fetch("海狸聊天室", "操作未完成", i instanceof Error ? i.message : "请检查网络。");
    });
  }
}
const Ln = new $o(), Ic = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  chatService: Ln
}, Symbol.toStringTag, { value: "Module" })), Bo = {
  schemaVersion: 1,
  id: "chat",
  title: "海狸聊天室",
  emoji: "💬",
  rootId: "vue-chat-dialog-root",
  settingsKeys: ["lw_chat_server_url"],
  capabilities: ["chat:message-read", "chat:message-send"],
  badgeCount: () => f.unreadCount,
  loadView: () => import("./ChatDialog-D5B8_HRI.js").then((e) => e.default),
  lifecycle: {
    isVisible: () => f.visible,
    canOpen: () => ie.isInstalled("chat"),
    open: () => {
      ie.isInstalled("chat") && (f.visible = !0, f.unreadCount = 0, no.value && Ln.connect());
    },
    hide: () => {
      f.visible = !1;
    },
    canUnmount: () => !0
  }
};
Le(Bo);
Le(Os);
Le(Is);
Le(Ps);
Le(Cs);
Le(ks);
Le(Es);
Le(Ts);
function Wo(e) {
  const t = e.map((r) => ({ ...r }));
  for (const r of Yi()) {
    if (r.presentation !== "card" || r.showInDock === !1) continue;
    if (t.some((s) => s.id === r.id)) throw new Error("Duplicate workspace card entry");
    const i = { id: r.id, title: r.title, icon: r.icon }, n = r.dockBefore ? t.findIndex((s) => s.id === r.dockBefore) : -1;
    t.splice(n < 0 ? t.length : n, 0, i);
  }
  return t;
}
function jo(e) {
  const t = e.map((r) => ({ ...r }));
  for (const r of Yi()) {
    if (r.showInDock === !1 || r.presentation === "card") continue;
    if (t.some((s) => s.id === r.id)) throw new Error("Dock module duplicated in legacy tools");
    const i = { id: r.id, title: r.title, icon: r.icon, emoji: r.emoji }, n = r.dockBefore ? t.findIndex((s) => s.id === r.dockBefore) : -1;
    t.splice(n < 0 ? t.length : n, 0, i);
  }
  return t;
}
function Vo(e) {
  const t = e.find((r) => r.id === "daily-bilibili");
  return t ? [t, ...e.filter((r) => r !== t)] : [...e];
}
const Fo = Vo(Wo([])), qo = jo([]), Dn = "logicweaver_dock_custom_order", wi = "logicweaver_dock_position";
function bi(e) {
  return e === "bottom" || e === "left" || e === "right" || e === "top";
}
function Go() {
  try {
    if (typeof localStorage < "u") {
      const e = localStorage.getItem(wi);
      if (bi(e)) return e;
    }
  } catch {
  }
  return "bottom";
}
function Ho(e) {
  try {
    typeof localStorage < "u" && localStorage.setItem(wi, e);
  } catch {
  }
}
function wr() {
  try {
    if (typeof localStorage < "u") {
      const e = localStorage.getItem(Dn);
      if (e) return JSON.parse(e) || {};
    }
  } catch {
  }
  return {};
}
function ji(e) {
  try {
    typeof localStorage < "u" && localStorage.setItem(Dn, JSON.stringify(e));
  } catch {
  }
}
function xn() {
  const e = qo.filter((r) => ie.isInstalled(r.id)), t = wr().tools;
  if (Array.isArray(t) && t.length > 0) {
    const r = new Map(e.map((n) => [n.id, n])), i = [];
    for (const n of t) {
      const s = r.get(n);
      s && (i.push(s), r.delete(n));
    }
    for (const n of r.values())
      i.push(n);
    return i;
  }
  return e;
}
function $n() {
  const e = Fo.filter((r) => ie.isInstalled(r.id)), t = wr().cards;
  if (Array.isArray(t) && t.length > 0) {
    const r = new Map(e.map((n) => [n.id, n])), i = [];
    for (const n of t) {
      const s = r.get(n);
      s && (i.push(s), r.delete(n));
    }
    for (const n of r.values())
      i.push(n);
    return i;
  }
  return e;
}
const Ko = () => ({
  mounted: !1,
  get activeTargetId() {
    return an() || le.activeId || "";
  },
  activeTools: [],
  cards: $n(),
  tools: xn(),
  position: Go()
}), B = K(Ko());
typeof window < "u" && (window.addEventListener("logicweaver:dock-modules-changed", () => {
  B.tools = xn(), B.cards = $n();
}), window.addEventListener("storage", (e) => {
  e.key === wi && bi(e.newValue) && (B.position = e.newValue);
}));
Er.onStateChange((e) => {
  B.activeTools = [...e];
});
let Te = {};
function er(e, t) {
  const r = window.chrome, i = r?.runtime?.getURL ? r.runtime.getURL(t) : t, n = e.includes("newtab") || t.includes("newtab");
  if (window.location.href.includes(e) || n && (window.location.pathname.endsWith("/newtab.html") || window.location.pathname === "/newtab.html"))
    return;
  const s = (a) => {
    const l = (a.url || a.pendingUrl || "").toLowerCase();
    return n ? l.includes("newtab.html") || l.startsWith("chrome://newtab") || l.startsWith("edge://newtab") || l.startsWith("chrome-search://local-ntp") || l.includes("chrome-extension://") && l.includes("newtab") || !!(a.title && (a.title.includes("LogicWeaver 新标签页") || a.title === "新标签页" || a.title === "New Tab")) : l.includes(e.toLowerCase());
  };
  if (r?.tabs?.query) {
    r.tabs.query({ currentWindow: !0 }, (a) => {
      const c = a.find(s);
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
const Uc = {
  getSnapshot() {
    return Lt(B);
  },
  update(e) {
    const { activeTargetId: t, ...r } = e;
    Object.assign(B, r);
  },
  setMounted(e) {
    B.mounted = e;
  },
  setActiveTools(e) {
    B.activeTools = [...e];
  },
  addActiveTool(e) {
    B.activeTools.includes(e) || B.activeTools.push(e);
  },
  removeActiveTool(e) {
    const t = B.activeTools.indexOf(e);
    t >= 0 && B.activeTools.splice(t, 1);
  },
  triggerItem(e, t) {
    const r = typeof window < "u" ? window.location.pathname + window.location.href : "", i = r.includes("bilibili.html") || r.includes("github.html") || r.includes("aihot.html") || r.includes("youtube.html");
    if (e === "home") {
      if (i) {
        er("newtab.html", "newtab.html");
        return;
      }
      if (Te.onHomeClick) {
        Te.onHomeClick();
        return;
      }
      const n = document.getElementById("daily-toggle");
      n && n.classList.contains("active") && n.classList.remove("active");
      const s = le.activeId;
      s && Dt(s), Ss(le.activeId), typeof window < "u" && window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      return;
    }
    if (e === "target") {
      const n = {
        "daily-bilibili": "bilibili.html",
        "card-github": "github.html",
        "daily-aihot": "aihot.html",
        "daily-youtube": "youtube.html"
      };
      if (i) {
        const o = n[t];
        o ? er(o, o) : er("newtab.html", "newtab.html");
        return;
      }
      if (Te.onTargetClick) {
        Te.onTargetClick(t);
        return;
      }
      const s = window;
      B.activeTargetId === t ? typeof s.exitFullscreenCard == "function" && s.exitFullscreenCard() : typeof s.enterFullscreenCard == "function" && s.enterFullscreenCard(t);
      return;
    }
    if (e === "tool") {
      const n = !!document.getElementById("vue-bili-companions-root");
      if (i && !n) {
        er("newtab.html", "newtab.html");
        return;
      }
      if (!["todoist", "music", "siren", "wallpaper", "stickers", "sync", "chat"].includes(t) && typeof window < "u") {
        const o = window;
        typeof o.exitFullscreenCard == "function" && o.exitFullscreenCard();
      }
      if (Te.onToolClick) {
        Te.onToolClick(t);
        return;
      }
      Er.toggle(t);
      return;
    }
  },
  reorderCards(e) {
    const t = new Map(B.cards.map((n) => [n.id, n])), r = [];
    for (const n of e) {
      const s = t.get(n);
      s && (r.push(s), t.delete(n));
    }
    for (const n of t.values()) r.push(n);
    B.cards = r;
    const i = wr();
    ji({ ...i, cards: r.map((n) => n.id) });
  },
  reorderTools(e) {
    const t = new Map(B.tools.map((n) => [n.id, n])), r = [];
    for (const n of e) {
      const s = t.get(n);
      s && (r.push(s), t.delete(n));
    }
    for (const n of t.values()) r.push(n);
    B.tools = r;
    const i = wr();
    ji({ ...i, tools: r.map((n) => n.id) });
  },
  setPosition(e) {
    bi(e) && B.position !== e && (B.position = e, Ho(e), typeof window < "u" && window.dispatchEvent(new CustomEvent("logicweaver:dock-position-changed", { detail: e })));
  },
  setActions(e) {
    Te = { ...Te, ...e };
  }
}, Bn = "active_wallpaper", vi = "_manifest.json";
function Wn() {
  return typeof navigator < "u" && typeof navigator.storage?.getDirectory == "function";
}
async function zo(e) {
  const t = [];
  for await (const [r, i] of e.entries())
    t.push(e.removeEntry(r, { recursive: i.kind === "directory" }));
  await Promise.all(t);
}
async function Jo(e, t) {
  let r = e;
  for (const i of t)
    !i || i === "." || (r = await r.getDirectoryHandle(i, { create: !0 }));
  return r;
}
async function Yo(e) {
  if (!Wn()) return !1;
  try {
    const r = await (await navigator.storage.getDirectory()).getDirectoryHandle(Bn, { create: !0 });
    await zo(r);
    const n = await (await r.getFileHandle(vi, { create: !0 })).createWritable(), s = {
      type: e.type,
      entry: e.entry || "",
      name: e.name || "Active Wallpaper",
      properties: e.properties || {},
      updatedAt: Date.now(),
      fileCount: e.files.length
    };
    await n.write(JSON.stringify(s)), await n.close();
    for (const o of e.files) {
      const a = String(o.path || "").replace(/\\/g, "/").replace(/^\/+/, "");
      if (!a) continue;
      const c = a.split("/"), l = c.pop(), p = await (await (await Jo(r, c)).getFileHandle(l, { create: !0 })).createWritable();
      await p.write(o.file), await p.close();
    }
    return !0;
  } catch (t) {
    return console.warn("[OPFS Wallpaper] 写入活跃壁纸失败，回退至 IndexedDB:", t), !1;
  }
}
async function jn(e, t = "") {
  const r = [];
  for await (const [i, n] of e.entries()) {
    if (i === vi) continue;
    const s = t ? `${t}/${i}` : i;
    if (n.kind === "file") {
      const o = await n.getFile();
      r.push({
        path: s,
        file: o,
        mime: o.type || void 0
      });
    } else if (n.kind === "directory") {
      const o = await jn(n, s);
      r.push(...o);
    }
  }
  return r;
}
async function Vi() {
  if (!Wn()) return null;
  try {
    const e = await navigator.storage.getDirectory();
    let t;
    try {
      t = await e.getDirectoryHandle(Bn, { create: !1 });
    } catch {
      return null;
    }
    let r;
    try {
      r = await t.getFileHandle(vi, { create: !1 });
    } catch {
      return null;
    }
    const n = await (await r.getFile()).text(), s = JSON.parse(n), o = await jn(t);
    return !o.length && s.type !== "image" ? null : {
      type: s.type || "web",
      entry: s.entry || "",
      name: s.name || "Active Wallpaper",
      properties: s.properties || {},
      updatedAt: s.updatedAt || 0,
      files: o
    };
  } catch (e) {
    return console.warn("[OPFS Wallpaper] 读取活跃壁纸失败:", e), null;
  }
}
function tr(e) {
  (!Number.isFinite(e) || e < 0) && (e = 0);
  const t = Math.floor(e / 60), r = Math.floor(e % 60);
  return String(t).padStart(2, "0") + ":" + String(r).padStart(2, "0");
}
const rr = typeof localStorage < "u" ? localStorage.getItem("bili_radio_mode") : null, Qo = () => ({
  active: !1,
  loading: !1,
  playing: !1,
  mode: rr === "order" || rr === "one" || rr === "shuffle" ? rr : "order",
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
}), R = K(Qo()), Vn = {
  getSnapshot() {
    return Lt(R);
  },
  update(e) {
    for (const t of Object.keys(e))
      R[t] !== e[t] && (R[t] = e[t]);
    if (typeof e.currentTime == "number" || typeof e.duration == "number") {
      const t = e.currentTime ?? R.currentTime, r = e.duration ?? R.duration, i = tr(t), n = tr(r);
      if (R.formattedCurrent !== i && (R.formattedCurrent = i), R.formattedDuration !== n && (R.formattedDuration = n), r > 0) {
        const s = Math.round(Math.min(100, Math.max(0, t / r * 100)) * 10) / 10;
        Math.abs(R.progressPercent - s) >= 0.2 && (R.progressPercent = s);
      } else
        R.progressPercent = 0;
    }
  },
  setProgress(e, t) {
    R.currentTime = e, R.duration = t;
    const r = tr(e), i = tr(t);
    if (R.formattedCurrent !== r && (R.formattedCurrent = r), R.formattedDuration !== i && (R.formattedDuration = i), t > 0) {
      const n = Math.round(Math.min(100, Math.max(0, e / t * 100)) * 10) / 10;
      Math.abs(R.progressPercent - n) >= 0.2 && (R.progressPercent = n);
    } else
      R.progressPercent = 0;
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
    const e = R.mode || "order", r = {
      order: "one",
      one: "shuffle",
      shuffle: "order"
    }[e] || "order";
    R.mode = r;
    try {
      localStorage.setItem("bili_radio_mode", r);
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
typeof window < "u" && (window.LogicWeaverBiliRadioTape = Vn);
let U = null, ne = !1, br = !1, _t = "B站电台", N = [], F = -1, q = null, ni, Fn = {}, ht = 0, _e = "", ar = null, qn = [], cr = /* @__PURE__ */ new Set(), nt = null, lr = 0, vt = Date.now(), Gr = 0;
function Si() {
  ar !== null && (clearInterval(ar), ar = null);
}
function Gn(e) {
  const t = U;
  if (!t || !ne || !q) return;
  const r = qn.find((i) => !cr.has(i) && /^https?:\/\//i.test(i));
  if (!r || cr.size >= 3) {
    Si(), _e = "音频连接中断，已尝试所有备用线路", X();
    return;
  }
  cr.add(r), nt = {
    time: Number.isFinite(t.currentTime) ? t.currentTime : 0,
    paused: t.paused
  }, _e = "网络波动，正在切换备用线路…", X(), t.src = r, t.load(), nt.paused || t.play().catch(() => {
  });
}
function Xo() {
  Si(), vt = Date.now(), lr = U?.currentTime || 0, Gr = U?.buffered.length ? U.buffered.end(U.buffered.length - 1) : 0, ar = setInterval(() => {
    const e = U;
    if (!e || !ne || e.paused || e.ended) {
      vt = Date.now();
      return;
    }
    const t = e.currentTime, r = e.buffered.length ? e.buffered.end(e.buffered.length - 1) : 0;
    if (t !== lr || r > Gr) {
      vt = Date.now(), lr = t, Gr = r, _e === "网络波动，正在切换备用线路…" && (_e = "", X());
      return;
    }
    Date.now() - vt >= 8e3 && e.readyState < 3 && Gn();
  }, 1e3);
}
function Zo() {
  U && (vt = Date.now(), lr = U.currentTime, _e === "网络波动，正在切换备用线路…" && (_e = "")), X();
}
function ea() {
  const e = U;
  if (e && nt) {
    const t = nt;
    if (nt = null, t.time > 0 && t.time < (e.duration || 1 / 0))
      try {
        e.currentTime = t.time;
      } catch {
      }
    t.paused || e.play().catch(() => {
    });
  }
  X();
}
function ta() {
  ne && U?.error && Gn(`音频解码或网络错误 [代码: ${U.error.code}]`);
}
function it() {
  return U || (U = new Audio(), U.id = "bili-radio-audio", U.preload = "auto", U.addEventListener("ended", ra), U.addEventListener("timeupdate", Zo), U.addEventListener("play", X), U.addEventListener("pause", X), U.addEventListener("loadedmetadata", ea), U.addEventListener("error", ta), U);
}
function ra() {
  const e = R.mode || "order";
  if (e === "one")
    U && (U.currentTime = 0, U.play().catch(() => {
    }), X());
  else if (e === "shuffle")
    if (N.length <= 1)
      de(0);
    else {
      let t = Math.floor(Math.random() * N.length);
      t === F && N.length > 1 && (t = (F + 1) % N.length), de(t);
    }
  else
    de(F + 1);
}
function X() {
  const e = U, t = !!(e && !e.paused && !e.ended && ne), r = e?.duration && Number.isFinite(e.duration) ? e.duration : q?.duration || 0, i = q?.cues?.find((s) => (e?.currentTime || 0) >= s.from && (e?.currentTime || 0) < s.to), n = _e || i?.content || (t ? "♪ 伴奏播放中…" : q ? `已暂停 · 《${q.title}》` : "点击磁带继续播放");
  Vn.update({
    active: ne,
    loading: br,
    playing: t,
    title: q?.title || "B站电台",
    coverUrl: q?.cover || "",
    seriesName: _t,
    trackIndex: F >= 0 ? F + 1 : 1,
    totalTracks: N.length || 1,
    currentTime: e?.currentTime || 0,
    duration: r,
    lyric: n
  }), ne && q && on.syncFromBiliRadio({
    playing: t,
    title: q.title || "B站电台",
    artist: q.upper || q.author || _t || "哔哩哔哩电台",
    coverUrl: q.cover || "",
    currentTime: e?.currentTime || 0,
    duration: r,
    lyric: n,
    seriesName: _t
  });
}
async function ia(e) {
  if (e.streamUrl || e.url) return e;
  const t = await re.getVideoView(e.bvid);
  if (!t?.cid) throw new Error("视频信息不可用");
  const r = await re.fetchAudioStream(e.bvid, t.cid);
  if (!r.sources.length) throw new Error("没有取得视频播放地址");
  return {
    ...e,
    title: t.title || e.title,
    cover: String(t.pic || e.cover || "").replace(/^http:/, "https:"),
    upper: t.owner?.name || e.upper || e.author || "Bilibili",
    duration: Number(t.duration || e.duration || 0),
    cid: t.cid,
    streamUrl: r.sources[0],
    streamUrls: r.sources
  };
}
async function de(e) {
  const t = Fn;
  if (!N.length || t.isCurrent?.() === !1) return;
  const r = ++ht;
  F = (e % N.length + N.length) % N.length, br = !0, ne = !0, _e = "", Si(), nt = null, it().pause(), X();
  try {
    const i = ni ? await ni(N[F]) : await ia(N[F]);
    if (r !== ht || t.isCurrent?.() === !1) return;
    q = i;
    const n = i.streamUrls?.length ? i.streamUrls : i.streamUrl || i.url ? [i.streamUrl || i.url] : [], s = n[0];
    if (!s) throw new Error("没有取得视频播放地址");
    qn = n, cr = /* @__PURE__ */ new Set([s]), it().src = s, Xo(), t.onReady?.(it()), t.autoplay !== !1 && it().play().catch((o) => console.warn("[BiliRadio] 播放失败", o)), i.bvid && !i.cues?.length && re.fetchVideoSubtitleDetails(i.bvid, i.cid).then((o) => {
      r === ht && o.ok && q && (q.cues = o.cues);
    }).catch(() => {
    });
  } catch (i) {
    if (r !== ht || t.isCurrent?.() === !1) return;
    ne = !1, console.warn("[BiliRadio] 解析音轨失败", i), _e = i instanceof Error ? i.message : "播放失败";
  } finally {
    r === ht && (br = !1, t.isCurrent?.() === !1 && (ne = !1), X());
  }
}
const Ai = {
  playQueue(e) {
    _t = e.name || "B站电台", N = Array.isArray(e.items) ? e.items.map((t) => ({ ...t })) : [], ni = e.resolveTrack, Fn = { isCurrent: e.isCurrent, autoplay: e.autoplay, onReady: e.onReady }, de(e.startIndex || 0);
  },
  playAt(e) {
    N.length && de(e);
  },
  next() {
    if ((R.mode || "order") === "shuffle" && N.length > 1) {
      let t = Math.floor(Math.random() * N.length);
      t === F && (t = (F + 1) % N.length), de(t);
    } else
      de(F + 1);
  },
  prev() {
    if ((R.mode || "order") === "shuffle" && N.length > 1) {
      let t = Math.floor(Math.random() * N.length);
      t === F && (t = ((F - 1) % N.length + N.length) % N.length), de(t);
    } else
      de(F - 1);
  },
  toggle() {
    const e = it();
    if (!ne && !e.src) {
      N.length > 0 && de(F >= 0 ? F : 0);
      return;
    }
    e.paused ? e.play().catch(() => {
    }) : e.pause(), X();
  },
  seek(e) {
    const t = it();
    Number.isFinite(t.duration) && t.duration > 0 && (t.currentTime = Math.min(100, Math.max(0, e)) / 100 * t.duration, X());
  },
  getAudioElement() {
    return U;
  },
  getState() {
    return {
      active: ne,
      loading: br,
      name: _t,
      items: N,
      index: F,
      track: q,
      currentTime: U?.currentTime || 0,
      duration: U?.duration || 0,
      playing: !!(U && !U.paused && !U.ended && ne)
    };
  },
  syncTape: X
};
typeof window < "u" && (window.LogicWeaverBiliRadioPlayer = Ai);
const si = 1024, Ct = si / 2, Xe = 64;
let x = null, ye = null, we = null;
const Fi = /* @__PURE__ */ new WeakMap();
let qi = null, H = null, Me = null, Nt = !1, vr = 0, st = 0, Gi = !1;
const Hr = new Uint8Array(Ct), Kr = new Uint8Array(Ct), zr = new Array(128).fill(0), Tt = new Array(128).fill(0), Hn = [];
for (let e = 0; e < Xe; e++) {
  const t = Math.floor(e + Math.pow(e / Xe, 3.2) * (Ct - Xe)), r = Math.min(
    Ct - 1,
    Math.max(t, Math.floor(e + 1 + Math.pow((e + 1) / Xe, 3.2) * (Ct - Xe) - 1))
  );
  Hn.push([t, r]);
}
function na() {
  if (x && ye && we) return !0;
  try {
    const e = window.AudioContext || window.webkitAudioContext;
    if (!e) return !1;
    x = new e();
    const t = x.createChannelSplitter(2);
    return ye = x.createAnalyser(), ye.fftSize = si, ye.smoothingTimeConstant = 0.82, we = x.createAnalyser(), we.fftSize = si, we.smoothingTimeConstant = 0.82, t.connect(ye, 0), t.connect(we, 1), !0;
  } catch (e) {
    return console.warn("[WE AudioVisualizer] AudioContext init failed:", e), !1;
  }
}
function sa(e) {
  if (!e || !na() || !x) return !1;
  try {
    let t = Fi.get(e);
    if (t || (t = x.createMediaElementSource(e), Fi.set(e, t)), qi !== e) {
      if (ye && we) {
        try {
          t.disconnect();
        } catch {
        }
        t.connect(ye), t.connect(we);
      }
      t.connect(x.destination), qi = e;
    }
    return !0;
  } catch {
    return !1;
  }
}
function Kn() {
  const e = D.getAudioElement(), t = Ai.getAudioElement();
  return t && !t.paused && !t.ended && t.currentTime > 0 ? t : e && !e.paused && !e.ended && e.currentTime > 0 ? e : null;
}
function oa() {
  const e = Kn();
  return e && sa(e), e;
}
function Sr(e) {
  if (!Nt || !Me) return;
  if (e - vr < 33) {
    H = requestAnimationFrame(Sr);
    return;
  }
  vr = e;
  const t = oa();
  if (!t || t.paused || t.ended) {
    try {
      Me.postMessage({
        type: "WE_AUDIO_DATA",
        audio: Tt
      }, "*");
    } catch {
    }
    x && x.state === "running" && x.suspend().catch(() => {
    }), H !== null && (typeof cancelAnimationFrame == "function" && cancelAnimationFrame(H), H = null);
    return;
  }
  x && x.state === "suspended" && x.resume().catch(() => {
  });
  let r = !1;
  if (ye && we) {
    ye.getByteFrequencyData(Hr), we.getByteFrequencyData(Kr);
    for (let i = 0; i < Xe; i++) {
      const [n, s] = Hn[i];
      let o = 0, a = 0;
      for (let u = n; u <= s; u++)
        Hr[u] > o && (o = Hr[u]), Kr[u] > a && (a = Kr[u]);
      const c = o / 255, l = a / 255;
      zr[i] = c, zr[i + 64] = l, (c > 0.015 || l > 0.015) && (r = !0);
    }
  }
  if (r)
    st = 0;
  else if (st++, st >= 30) {
    try {
      Me.postMessage({
        type: "WE_AUDIO_DATA",
        audio: Tt
      }, "*");
    } catch {
    }
    x && x.state === "running" && x.suspend().catch(() => {
    }), H !== null && (typeof cancelAnimationFrame == "function" && cancelAnimationFrame(H), H = null);
    return;
  }
  try {
    Me.postMessage({
      type: "WE_AUDIO_DATA",
      audio: r ? zr : Tt
    }, "*");
  } catch {
  }
  H = requestAnimationFrame(Sr);
}
function ir() {
  Nt && H === null && (st = 0, vr = 0, H = requestAnimationFrame(Sr));
}
function aa() {
  if (Gi) return;
  Gi = !0;
  const e = D.getAudioElement(), t = Ai.getAudioElement();
  e && (e.addEventListener("play", ir), e.addEventListener("playing", ir)), t && (t.addEventListener("play", ir), t.addEventListener("playing", ir));
}
function zn(e) {
  if (Me = e, aa(), Nt) return;
  if (Nt = !0, vr = 0, st = 0, Kn())
    H = requestAnimationFrame(Sr);
  else
    try {
      Me.postMessage({
        type: "WE_AUDIO_DATA",
        audio: Tt
      }, "*");
    } catch {
    }
}
function Br() {
  if (Nt = !1, st = 0, H !== null && (typeof cancelAnimationFrame == "function" && cancelAnimationFrame(H), clearTimeout(H), H = null), x && x.state === "running" && x.suspend().catch(() => {
  }), Me)
    try {
      Me.postMessage({
        type: "WE_AUDIO_DATA",
        audio: Tt
      }, "*");
    } catch {
    }
}
const ca = "leaf-newtab-backgrounds", la = 1, qe = "current-background", G = "heroBackgroundHistory", Hi = 30, nr = "assets/newtab-mountains.png", Ki = 450, Jr = 180 * 1024 * 1024;
let oi = [], gt = 0, ur = null, yt = null, Ar = null;
function zi(e) {
  return oi.push(e), e;
}
function Jn() {
  if (ur) {
    try {
      ur();
    } catch {
    }
    ur = null;
  }
}
function ua(e) {
  Jn();
  let t = null, r = 0, i = 0, n = 0, s = -1, o = -1;
  const a = () => {
    if (t = null, r = performance.now(), i !== s || n !== o) {
      s = i, o = n;
      try {
        e.postMessage({
          type: "WE_MOUSE_MOVE",
          x: i,
          y: n
        }, "*");
      } catch {
      }
    }
  }, c = (g) => {
    i = g.clientX, n = g.clientY;
    const w = performance.now();
    w - r >= 33 ? (t && (clearTimeout(t), t = null), a()) : t || (t = setTimeout(a, 33 - (w - r)));
  }, l = (g) => {
    try {
      e.postMessage({
        type: "WE_MOUSE_DOWN",
        x: g.clientX,
        y: g.clientY
      }, "*"), e.postMessage({ type: "WE_USER_GESTURE_UNLOCK" }, "*");
    } catch {
    }
  }, u = (g) => {
    try {
      e.postMessage({
        type: "WE_MOUSE_UP",
        x: g.clientX,
        y: g.clientY
      }, "*");
    } catch {
    }
  }, h = () => {
    try {
      e.postMessage({ type: "WE_USER_GESTURE_UNLOCK" }, "*");
    } catch {
    }
  }, p = () => {
    const g = document.hidden;
    try {
      e.postMessage({
        type: "WE_SET_PAUSED",
        isPaused: g
      }, "*");
    } catch {
    }
    g ? Br() : zn(e);
  };
  window.addEventListener("pointermove", c, { passive: !0 }), window.addEventListener("mousedown", l, { passive: !0 }), window.addEventListener("mouseup", u, { passive: !0 }), window.addEventListener("click", h, { passive: !0 }), window.addEventListener("keydown", h, { passive: !0 }), document.addEventListener("visibilitychange", p), ur = () => {
    t && clearTimeout(t), window.removeEventListener("pointermove", c), window.removeEventListener("mousedown", l), window.removeEventListener("mouseup", u), window.removeEventListener("click", h), window.removeEventListener("keydown", h), document.removeEventListener("visibilitychange", p);
  };
}
function da() {
  Br(), Jn(), oi.forEach((e) => {
    try {
      URL.revokeObjectURL(e);
    } catch {
    }
  }), oi = [];
}
function Ei() {
  return new Promise((e, t) => {
    if (typeof indexedDB > "u") {
      t(new Error("IndexedDB is not supported in this environment"));
      return;
    }
    const r = indexedDB.open(ca, la);
    r.onupgradeneeded = () => {
      const i = r.result;
      i.objectStoreNames.contains("files") || i.createObjectStore("files");
    }, r.onsuccess = () => e(r.result), r.onerror = () => t(r.error);
  });
}
async function fa(e, t = qe) {
  const r = await Ei();
  return new Promise((i, n) => {
    const s = r.transaction("files", "readwrite");
    s.objectStore("files").put(e, t), s.oncomplete = () => {
      r.close(), i();
    }, s.onerror = () => {
      r.close(), n(s.error);
    }, s.onabort = s.onerror;
  });
}
async function pa() {
  return new Promise((e, t) => {
    if (typeof indexedDB > "u") {
      t(new Error("IndexedDB is not supported"));
      return;
    }
    const r = indexedDB.open("my-newtab-background", 1);
    r.onupgradeneeded = () => {
      const i = r.result;
      i.objectStoreNames.contains("files") || i.createObjectStore("files");
    }, r.onsuccess = () => e(r.result), r.onerror = () => t(r.error);
  });
}
async function ai(e = "hero") {
  try {
    const t = await pa();
    return new Promise((r) => {
      const i = t.transaction("files", "readonly"), n = i.objectStore("files").get(e);
      n.onsuccess = () => {
        t.close(), r(n.result || null);
      }, n.onerror = () => {
        t.close(), r(null);
      }, i.oncomplete = () => t.close();
    });
  } catch {
    return null;
  }
}
async function Yr(e = qe) {
  try {
    const r = await Ei(), i = await new Promise((n, s) => {
      const o = r.transaction("files", "readonly"), a = o.objectStore("files").get(e);
      a.onsuccess = () => n(a.result || null), o.oncomplete = () => r.close(), o.onerror = () => {
        r.close(), s(o.error);
      };
    });
    if (i) return i;
  } catch {
  }
  const t = await ai(e);
  return t || (e === qe ? ai("hero") : null);
}
async function Ji(e = qe) {
  const t = await Ei();
  return new Promise((r, i) => {
    const n = t.transaction("files", "readwrite");
    n.objectStore("files").delete(e), n.oncomplete = () => {
      t.close(), r();
    }, n.onerror = () => {
      t.close(), i(n.error);
    }, n.onabort = n.onerror;
  });
}
function wt(e) {
  return new Promise((t, r) => {
    if (typeof chrome > "u" || !chrome.storage?.local?.get) {
      r(new Error("壁纸存储不可用"));
      return;
    }
    chrome.storage.local.get(e, (i) => {
      chrome.runtime?.lastError ? r(new Error("壁纸配置读取失败")) : t(i || {});
    });
  });
}
function ke(e) {
  return new Promise((t, r) => {
    if (typeof chrome > "u" || !chrome.storage?.local?.set) {
      r(new Error("壁纸存储不可用"));
      return;
    }
    chrome.storage.local.set(e, () => {
      chrome.runtime?.lastError ? r(new Error("壁纸配置保存失败")) : t();
    });
  });
}
function _i(e) {
  return !!(e && (/^image\//i.test(e.type || "") || /^video\//i.test(e.type || "") || /\.(png|jpe?g|webp|gif|mp4|webm)$/i.test(e.name || "")));
}
function Ci(e) {
  return String(e || "").replace(/\\/g, "/").replace(/^\.\//, "").replace(/^\/+/, "");
}
function ma(e, t) {
  const r = String(t || "").trim().replace(/^['"]|['"]$/g, "");
  if (!r || /^(?:[a-z][a-z0-9+.-]*:|#|data:|blob:)/i.test(r)) return "";
  const [i] = r.split(/[?#]/);
  if (!i) return "";
  const n = r.startsWith("/") ? "" : Ci(e).split("/").slice(0, -1).join("/"), s = `${n ? n + "/" : ""}${i.replace(/^\/+/, "")}`.split("/"), o = [];
  return s.forEach((a) => {
    !a || a === "." || (a === ".." ? o.pop() : o.push(a));
  }), o.join("/").toLowerCase();
}
function ha(e, t) {
  return t.type ? t.type : /\.html?$/i.test(e) ? "text/html" : /\.css$/i.test(e) ? "text/css" : /\.m?js$/i.test(e) ? "text/javascript" : /\.png$/i.test(e) ? "image/png" : /\.jpe?g$/i.test(e) ? "image/jpeg" : /\.webp$/i.test(e) ? "image/webp" : /\.gif$/i.test(e) ? "image/gif" : /\.mp4$/i.test(e) ? "video/mp4" : /\.webm$/i.test(e) ? "video/webm" : "application/octet-stream";
}
async function ga(e) {
  const t = [];
  let r = 0;
  async function i(n, s = "", o = 0) {
    if (!(o > 4 || t.length >= Ki || r >= Jr))
      for await (const a of n.values()) {
        if (t.length >= Ki || r >= Jr) break;
        const c = Ci(s ? `${s}/${a.name}` : a.name);
        if (a.kind === "file") {
          const l = await a.getFile();
          r += l.size || 0, r <= Jr && t.push({ path: c, file: l });
        } else a.kind === "directory" && await i(a, c, o + 1);
      }
  }
  return await i(e), t;
}
function ya(e) {
  return e.filter((t) => /(^|\/)index\.html?$/i.test(t.path) || /\.html?$/i.test(t.path)).sort((t, r) => {
    const i = (n) => /^index\.html?$/i.test(n.path) ? 0 : /(^|\/)index\.html?$/i.test(n.path) ? 1 : 2;
    return i(t) - i(r) || t.path.length - r.path.length;
  })[0] || null;
}
function ci(e, t = []) {
  return typeof e == "string" ? /\.(png|jpe?g|webp|gif|mp4|webm|html?)($|[?#])/i.test(e) && t.push(e) : Array.isArray(e) ? e.forEach((r) => ci(r, t)) : e && typeof e == "object" && Object.values(e).forEach((r) => ci(r, t)), t;
}
async function wa(e) {
  const t = new Map(e.map((i) => [Ci(i.path).toLowerCase(), i])), r = e.filter((i) => /(^|\/)project\.json$/i.test(i.path));
  for (const i of r)
    try {
      const n = JSON.parse(await i.file.text());
      for (const s of ci(n)) {
        const o = t.get(ma(i.path, s));
        if (o && _i(o.file)) return o.file;
      }
    } catch {
    }
  return null;
}
function ba(e, t, r) {
  const i = r.filter((n) => !/\.(pkg|mpkg)$/i.test(n.path)).map((n) => ({ path: n.path, file: n.file, mime: ha(n.path, n.file) }));
  return { type: "web", name: e || "Web Wallpaper", entry: t.path, files: i };
}
async function va(e) {
  const t = await ga(e), r = ya(t);
  if (r) return ba(e.name, r, t);
  const i = await wa(t);
  return i || t.map((s) => s.file).filter(_i).sort((s, o) => {
    const a = (c) => /\.(mp4|webm)$/i.test(c.name) ? 0 : /\.gif$/i.test(c.name) ? 1 : /^preview\./i.test(c.name) ? 2 : /cover|thumb|poster/i.test(c.name) ? 3 : 4;
    return a(s) - a(o) || o.size - s.size;
  })[0] || null;
}
function Sa(e) {
  return e ? typeof e == "string" ? "自定义图片" : e.name || (e.type === "web" ? "Web Wallpaper" : "自定义背景") : "默认背景";
}
function Aa(e) {
  return typeof e == "string" ? "图片" : e?.type === "web" ? "Web Wallpaper" : e?.type === "db" ? /video/i.test(e.mediaType || "") ? "视频" : "图片/GIF" : "背景";
}
function Ea(e, t) {
  if (!e || !t) return !1;
  const r = e.value || e, i = t.value || t;
  if (r.workshopId && i.workshopId && String(r.workshopId) === String(i.workshopId)) return !0;
  const n = e.title || r.name || r.title, s = t.title || i.name || i.title;
  if (n && s && n === s && r.type === i.type) return !0;
  const o = { ...r, storageKey: void 0 }, a = { ...i, storageKey: void 0 };
  return JSON.stringify(o) === JSON.stringify(a);
}
const _a = {
  pauseWallpaper(e) {
    if (typeof document > "u") return;
    const t = document.querySelector("#hero-background-media video");
    t && (e ? t.paused || t.pause() : t.paused && t.play().catch(() => {
    }));
    const r = document.querySelector("#hero-background-media iframe");
    if (r?.contentWindow)
      try {
        r.contentWindow.postMessage({
          type: "WE_SET_PAUSED",
          isPaused: e,
          paused: e
        }, "*");
      } catch {
      }
    e && Br();
  },
  async loadHistory() {
    const e = await wt([G, "heroBackground"]);
    let t = Array.isArray(e[G]) ? e[G] : [];
    const r = /* @__PURE__ */ new Set(), i = [];
    for (const n of t) {
      const s = n.value?.workshopId ? `ws-${n.value.workshopId}` : n.title ? `${n.kind || ""}-${n.title}` : JSON.stringify({ ...n.value, storageKey: void 0 });
      r.has(s) || (r.add(s), i.push(n));
    }
    return i.length !== t.length && (t = i, ke({ [G]: i })), { history: t, currentValue: e.heroBackground || null };
  },
  async addHistory(e, t = null, r) {
    const i = `bg-${Date.now()}-${Math.random().toString(16).slice(2)}`;
    let n = e;
    e && typeof e == "object" && (n = { ...e, storageKey: i }), t && await fa(t, i);
    const s = await wt([G, "heroBackground"]), o = Array.isArray(s[G]) ? s[G] : [], a = {
      id: i,
      title: Sa(n),
      kind: Aa(n),
      createdAt: Date.now(),
      previewUrl: r || n.previewUrl || n.previewBase64,
      value: n
    }, c = [a, ...o.filter((u) => !Ea(u, a))].slice(
      0,
      Hi
    ), l = o.slice(Hi - 1).filter((u) => u.value?.storageKey && u.value.storageKey !== s.heroBackground?.storageKey);
    return await Promise.all(l.map((u) => Ji(u.value.storageKey))), await ke({ [G]: c }), n;
  },
  async deleteHistory(e) {
    const t = await wt([G, "heroBackground"]), r = (t[G] || []).filter((i) => i.id !== e.id);
    e.value?.storageKey && await Ji(e.value.storageKey), await ke({ [G]: r }), JSON.stringify(t.heroBackground) === JSON.stringify(e.value) && await this.clearWallpaper();
  },
  async clearWallpaper() {
    const e = { type: "none" };
    await ke({ heroBackground: e });
    try {
      localStorage.setItem("lw-current-wallpaper", JSON.stringify(e));
    } catch {
    }
    await this.applyWallpaper(null);
  },
  async setMountain() {
    await ke({ heroBackground: nr });
    try {
      localStorage.setItem("lw-current-wallpaper", JSON.stringify(nr));
    } catch {
    }
    await this.applyWallpaper(nr);
  },
  async setWallpaper(e, t = null) {
    t && (yt = t), Ar = e, await ke({ heroBackground: e });
    try {
      localStorage.setItem("lw-current-wallpaper", JSON.stringify(e));
    } catch {
    }
    await this.applyWallpaper(e, t);
  },
  async chooseBackgroundFile(e = "all") {
    return typeof document > "u" ? [] : new Promise((t, r) => {
      const i = document.createElement("input");
      i.type = "file", i.hidden = !0, i.multiple = !0, i.accept = e === "image" ? "image/*,.jpg,.jpeg,.png,.webp,.gif" : e === "video" ? "video/mp4,video/webm,.mp4,.webm" : "image/*,video/mp4,video/webm";
      const n = (a) => {
        i.removeEventListener("change", s), i.removeEventListener("cancel", o), i.remove(), t(a);
      }, s = () => n(Array.from(i.files || [])), o = () => n([]);
      i.addEventListener("change", s), i.addEventListener("cancel", o), document.body.appendChild(i);
      try {
        i.click();
      } catch (a) {
        i.remove(), r(a);
      }
    });
  },
  async importBackgroundFile(e, { apply: t = !0 } = {}) {
    if (!e) return null;
    let r, i = null;
    if (e.type === "web")
      i = e, r = { type: "web", name: e.name, entry: e.entry };
    else if (_i(e))
      i = e, r = { type: "db", name: e.name, mediaType: e.type || "application/octet-stream" };
    else
      throw new Error("请选择 JPG、PNG、WebP、GIF、MP4 或 WebM 壁纸。");
    return r = await this.addHistory(r, i), t && (await ke({ heroBackground: r }), await this.applyWallpaper(r)), r;
  },
  async importWallpaperDirectory() {
    const e = window;
    if (!e.showDirectoryPicker) throw new Error("当前浏览器不支持直接选择 Wallpaper 文件夹。");
    const t = await e.showDirectoryPicker(), r = await va(t);
    if (!r) throw new Error("文件夹中没有找到可用的 Web Wallpaper、图片、GIF、MP4 或 WebM。");
    return this.importBackgroundFile(r);
  },
  async applyWallpaper(e, t = null) {
    const r = ++gt;
    if (typeof document > "u") return;
    const i = document.getElementById("launcher"), n = document.getElementById("hero-background-media");
    if (!(!i || !n) && (da(), n.replaceChildren(), i.style.removeProperty("--launcher-image"), !!e)) {
      if (typeof e == "string") {
        const s = typeof chrome < "u" ? chrome : null, o = e.startsWith("chrome-extension://") || e.startsWith("http") || e.startsWith("data:") ? e : s?.runtime?.getURL ? s.runtime.getURL(e) : e, a = document.createElement("img");
        a.src = o, a.alt = "", a.decoding = "async", a.fetchPriority = "high", n.appendChild(a);
        return;
      }
      if (e.type === "style") {
        const s = document.createElement("div");
        s.style.cssText = e.style || "", s.style.position = "absolute", s.style.inset = "0", n.appendChild(s);
        return;
      }
      if (e.type === "video") {
        let s = null;
        if (t?.files ? s = (t.files.find((a) => a.path === t.entry) || t.files[0])?.file || null : t instanceof Blob && (s = t), !s) {
          const o = await Vi();
          o?.files?.length && (s = (o.files.find((c) => c.path === o.entry) || o.files[0])?.file || null);
        }
        if (s instanceof Blob && r === gt) {
          const o = zi(URL.createObjectURL(s)), a = document.createElement("video");
          a.src = o, a.autoplay = !0, a.preload = "metadata", a.loop = !0, a.muted = !0, a.defaultMuted = !0, a.volume = 0, a.setAttribute("muted", ""), a.playsInline = !0, a.disablePictureInPicture = !0, a.setAttribute("disablepictureinpicture", ""), a.setAttribute("disableremoteplayback", ""), n.appendChild(a);
          return;
        }
      }
      if (Ar = e, e.type === "web") {
        let s = t || yt;
        if ((!s || s.type !== "web") && (s = await Vi(), s && s.type === "web" ? yt = s : (s = await Yr(e.storageKey || qe), s && s.type === "web" && (yt = s, Yo(s)))), r !== gt) return;
        if (s?.type === "web") {
          yt = s;
          const o = document.createElement("iframe");
          o.title = s.name || "Web Wallpaper", o.setAttribute("allow", "autoplay *"), o.allow = "autoplay";
          const a = typeof chrome < "u" ? chrome : null;
          o.src = a?.runtime?.getURL ? a.runtime.getURL("wallpaper-sandbox.html") : "wallpaper-sandbox.html";
          let c = !1;
          const l = () => {
            c || o.contentWindow?.postMessage(s, "*");
          }, u = (h) => {
            h.source === o.contentWindow && (h.data?.type === "WE_SANDBOX_READY" ? l() : h.data?.type === "WE_SANDBOX_ACK" && (c = !0));
          };
          window.addEventListener("message", u), o.onload = () => {
            l();
            let h = 0;
            const p = setInterval(() => {
              if (h++, c || h > 5 || r !== gt) {
                clearInterval(p);
                return;
              }
              l();
            }, 80);
            o.contentWindow && (ua(o.contentWindow), zn(o.contentWindow));
          }, n.appendChild(o);
        } else
          console.warn("[WallpaperService] Web wallpaper pack not found yet, keeping state without fallback");
        return;
      }
      if (e.type === "db") {
        const s = await Yr(e.storageKey || qe);
        if (r !== gt || !(s instanceof Blob)) return;
        const o = zi(URL.createObjectURL(s));
        if (/^video\//i.test(s.type || "") || /\.(mp4|webm)$/i.test(s.name || "")) {
          const a = document.createElement("video");
          a.src = o, a.autoplay = !0, a.preload = "metadata", a.loop = !0, a.muted = !0, a.defaultMuted = !0, a.volume = 0, a.setAttribute("muted", ""), a.playsInline = !0, a.disablePictureInPicture = !0, a.setAttribute("disablepictureinpicture", ""), a.setAttribute("disableremoteplayback", ""), n.appendChild(a);
        } else {
          const a = document.createElement("img");
          a.src = o, a.alt = "", a.decoding = "async", a.fetchPriority = "high", n.appendChild(a);
        }
      }
    }
  },
  // Caller owns and revokes this URL; never put it in the current wallpaper URL pool.
  async createLibraryPreviewUrl(e, t) {
    t?.throwIfAborted();
    const r = await Yr(e || qe);
    return t?.throwIfAborted(), r instanceof Blob ? URL.createObjectURL(r) : null;
  },
  async updateHistoryTitle(e, t) {
    const r = await wt([G]), i = Array.isArray(r[G]) ? r[G] : [];
    if (!i.some((s) => s.id === e)) throw new Error("壁纸条目已变化，请刷新");
    const n = i.map((s) => s.id === e ? { ...s, title: t.trim() || s.title } : s);
    await ke({ [G]: n });
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
        const t = await wt(["heroBackground"]);
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
        const t = await ai("hero");
        t && (e = {
          type: "db",
          name: t.name || "当前壁纸",
          mediaType: t.type || "application/octet-stream"
        });
      }
      e || (e = nr);
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
    const r = e.heroBackground.newValue;
    if (Ar && r && JSON.stringify(Ar) === JSON.stringify(r))
      return;
    _a.applyWallpaper(r);
  }
});
typeof document < "u" && document.addEventListener("visibilitychange", () => {
  const e = document.hidden, t = document.querySelector("#hero-background-media video");
  t && (e ? t.paused || t.pause() : t.paused && t.play().catch(() => {
  }));
  const r = document.querySelector("#hero-background-media iframe");
  if (r?.contentWindow)
    try {
      r.contentWindow.postMessage({
        type: "WE_SET_PAUSED",
        isPaused: e
      }, "*");
    } catch {
    }
  e && Br();
});
function Qr(e) {
  const t = { group: "", positions: /* @__PURE__ */ Object.create(null) };
  try {
    const r = JSON.parse(e || "null");
    if (!r || typeof r != "object") return t;
    typeof r.group == "string" && (t.group = r.group);
    for (const [i, n] of Object.entries(r.positions || {})) {
      const s = n;
      !s || !Number.isFinite(s.top) || s.top < 0 || (t.positions[i] = {
        top: s.top,
        ...typeof s.anchor == "string" ? { anchor: s.anchor } : {},
        ...Number.isFinite(s.offset) ? { offset: s.offset } : {}
      });
    }
  } catch {
  }
  return t;
}
function Ca(e) {
  const t = /* @__PURE__ */ new Map();
  for (const r of e)
    r.group && t.set(r.group, (t.get(r.group) || 0) + 1);
  return [...t].map(([r, i]) => ({ name: r, count: i }));
}
function Ta(e, t) {
  return Math.max(0, t !== void 0 && e.offset !== void 0 ? t - e.offset : e.top);
}
const ka = ["disabled", "aria-expanded"], Ia = {
  key: 0,
  class: "lw-select-icon"
}, Ua = {
  key: 0,
  class: "lw-select-groups",
  role: "group",
  "aria-label": "按厂商浏览"
}, Ma = ["aria-pressed"], Pa = ["aria-pressed", "onClick"], Ra = {
  key: 0,
  class: "lw-select-empty"
}, Oa = ["disabled", "data-select-value", "title", "aria-selected", "onClick"], Na = { class: "lw-item-content" }, La = {
  key: 0,
  class: "lw-item-icon"
}, Da = { class: "lw-item-text" }, xa = {
  key: 0,
  class: "lw-item-check"
}, $a = /* @__PURE__ */ Qn({
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
    const r = e, i = t, n = be(!1), s = be(null), o = be(null), a = be("");
    let c = Qr(null), l = !1;
    function u() {
      try {
        c = Qr(r.memoryKey ? localStorage.getItem(r.memoryKey) : null);
      } catch {
        c = Qr(null);
      }
      a.value = c.group;
    }
    u();
    function h(C = r.memoryKey) {
      const V = o.value;
      if (!V || !l) return;
      const E = [...V.querySelectorAll("[data-select-value]")], me = V.getBoundingClientRect().top, ze = E.find((Wr) => Wr.getBoundingClientRect().bottom > me);
      if (c.group = a.value, c.positions[a.value] = {
        top: V.scrollTop,
        anchor: ze?.dataset.selectValue,
        offset: ze ? ze.getBoundingClientRect().top - me : void 0
      }, C)
        try {
          localStorage.setItem(C, JSON.stringify(c));
        } catch {
        }
    }
    async function p() {
      l = !1, await ts();
      const C = o.value;
      if (!n.value || !C) return;
      const V = [...C.querySelectorAll("[data-select-value]")], E = c.positions[a.value], me = V.find((Wr) => Wr.dataset.selectValue === (E?.anchor ?? String(r.modelValue))), ze = me ? me.getBoundingClientRect().top - C.getBoundingClientRect().top + C.scrollTop : void 0;
      C.scrollTop = E ? Ta(E, ze) : Math.max(0, (ze ?? 0) - C.clientHeight / 2), l = y.value.length > 0;
    }
    function g() {
      h(), n.value = !1;
    }
    async function w(C) {
      C !== a.value && (h(), a.value = C, await p(), h());
    }
    const b = Ie(() => r.options.map((C) => typeof C == "object" && C !== null ? C : { value: C, label: String(C) })), S = Ie(() => r.grouped ? Ca(b.value) : []), y = Ie(() => a.value && r.grouped ? b.value.filter((C) => C.group === a.value) : b.value);
    Pe(() => r.memoryKey, (C, V) => {
      h(V), u(), n.value && p();
    }), Pe(b, () => {
      a.value && S.value.length && !S.value.some((C) => C.name === a.value) && (a.value = ""), n.value && p();
    }, { flush: "post" }), Xn(() => h());
    const _ = Ie(() => b.value.find((C) => String(C.value) === String(r.modelValue))), T = Ie(() => _.value?.label ?? r.placeholder);
    function z() {
      if (!r.disabled) {
        if (n.value) {
          g();
          return;
        }
        b.value.length && a.value && !S.value.some((C) => C.name === a.value) && (a.value = ""), n.value = !0, p();
      }
    }
    function L(C) {
      C.disabled || r.disabled || (g(), String(C.value) !== String(r.modelValue) && (i("update:modelValue", C.value), i("change", C.value)));
    }
    function j(C) {
      !n.value || !s.value || s.value.contains(C.target) || g();
    }
    function P(C) {
      n.value && C.key === "Escape" && g();
    }
    return Zn(() => {
      document.addEventListener("pointerdown", j, !0), window.addEventListener("keydown", P);
    }), es(() => {
      document.removeEventListener("pointerdown", j, !0), window.removeEventListener("keydown", P);
    }), (C, V) => (se(), oe("div", {
      ref_key: "containerRef",
      ref: s,
      class: qt(["lw-custom-select", [`size-${e.size}`, { "is-open": n.value, "is-disabled": e.disabled }]])
    }, [
      De("button", {
        type: "button",
        class: "lw-select-trigger",
        disabled: e.disabled,
        "aria-expanded": n.value,
        onClick: z
      }, [
        _.value?.icon ? (se(), oe("span", Ia, xe(_.value.icon), 1)) : Je("", !0),
        De("span", {
          class: qt(["lw-select-label", { "is-placeholder": !_.value }])
        }, xe(T.value), 3),
        V[2] || (V[2] = De("span", {
          class: "lw-select-chevron",
          "aria-hidden": "true"
        }, "▾", -1))
      ], 8, ka),
      n.value ? (se(), oe("div", {
        key: 0,
        class: qt(["lw-select-dropdown", { "is-grouped": e.grouped }])
      }, [
        S.value.length ? (se(), oe("div", Ua, [
          De("button", {
            type: "button",
            "aria-pressed": !a.value,
            onClick: V[0] || (V[0] = (E) => w(""))
          }, "全部 · " + xe(b.value.length), 9, Ma),
          (se(!0), oe(Ti, null, ki(S.value, (E) => (se(), oe("button", {
            key: E.name,
            type: "button",
            "aria-pressed": a.value === E.name,
            onClick: (me) => w(E.name)
          }, xe(E.name) + " · " + xe(E.count), 9, Pa))), 128))
        ])) : Je("", !0),
        De("div", {
          ref_key: "listRef",
          ref: o,
          class: "lw-select-list",
          role: "listbox",
          onScrollPassive: V[1] || (V[1] = (E) => h())
        }, [
          y.value.length ? Je("", !0) : (se(), oe("div", Ra, " 暂无可用选项 ")),
          (se(!0), oe(Ti, null, ki(y.value, (E) => (se(), oe("button", {
            key: String(E.value),
            type: "button",
            class: qt(["lw-select-item", {
              "is-active": String(E.value) === String(e.modelValue),
              "is-disabled": E.disabled
            }]),
            disabled: E.disabled,
            "data-select-value": String(E.value),
            title: E.label,
            role: "option",
            "aria-selected": String(E.value) === String(e.modelValue),
            onClick: (me) => L(E)
          }, [
            De("span", Na, [
              E.icon ? (se(), oe("span", La, xe(E.icon), 1)) : Je("", !0),
              De("span", Da, xe(E.label), 1)
            ]),
            String(E.value) === String(e.modelValue) ? (se(), oe("span", xa, "✓")) : Je("", !0)
          ], 10, Oa))), 128))
        ], 544)
      ], 2)) : Je("", !0)
    ], 2));
  }
}), Mc = /* @__PURE__ */ os($a, [["__scopeId", "data-v-24f4c9d8"]]);
function Pc(e, t) {
  if (document.getElementById(e)) return;
  const r = document.createElement("style");
  r.id = e, r.textContent = t, document.head.appendChild(r);
}
export {
  Qa as $,
  tc as A,
  R as B,
  Mc as C,
  Ln as D,
  Ei as E,
  Yo as F,
  nr as G,
  bi as H,
  hc as I,
  qr as J,
  pr as K,
  ec as L,
  yc as M,
  v as N,
  Ai as O,
  uo as P,
  D as Q,
  f as R,
  Zt as S,
  A as T,
  Li as U,
  Ac as V,
  _a as W,
  gc as X,
  Pi as Y,
  rn as Z,
  nn as _,
  bs as a,
  Ja as a0,
  Ya as a1,
  za as a2,
  gs as a3,
  Qe as a4,
  Xa as a5,
  Mn as a6,
  Tr as a7,
  Pn as a8,
  Oo as a9,
  uc as aA,
  dc as aB,
  fc as aC,
  cc as aD,
  oc as aE,
  bo as aF,
  Ec as aG,
  ct as aH,
  Po as aI,
  bc as aJ,
  Ro as aK,
  Sc as aL,
  Ic as aM,
  Tc as aa,
  _c as ab,
  kc as ac,
  Cc as ad,
  ui as ae,
  Ut as af,
  qs as ag,
  rc as ah,
  pn as ai,
  ic as aj,
  nc as ak,
  di as al,
  Ue as am,
  ei as an,
  no as ao,
  pc as ap,
  mc as aq,
  ao as ar,
  Q as as,
  ln as at,
  sc as au,
  xt as av,
  ac as aw,
  lc as ax,
  vc as ay,
  wc as az,
  ls as b,
  re as c,
  yo as d,
  cs as e,
  Xi as f,
  Ji as g,
  on as h,
  m as i,
  ve as j,
  Ha as k,
  k as l,
  Uc as m,
  he as n,
  le as o,
  $e as p,
  Za as q,
  Vn as r,
  li as s,
  ce as t,
  _s as u,
  Ss as v,
  B as w,
  Ka as x,
  Pc as y,
  d as z
};
