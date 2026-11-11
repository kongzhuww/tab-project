import { c as Kn, w as Si, h as ie, r as Ne, l as zr } from "./window-manager.store-BdI_8a-H.js";
import { r as H, s as Ie, a as Ot, w as Pe, b as we, d as zn, K as Jn, B as Yn, x as Qn, o as ne, e as oe, A as Ft, i as xe, t as Le, f as ze, F as kr, g as Cr, D as Xn } from "./vendor-vue-9b0eS4bW.js";
import { b as Vt, S as Zn, p as eo } from "./stickers.service-Bdd21-le.js";
import { t as qt, p as to } from "./module-state-D4Dr89rP.js";
import { R as io } from "./InlineEditStatus.vue_vue_type_style_index_0_scoped_c63d0c6d_lang-9z3_WNrf.js";
import { V as N } from "./search.service-wriY3nvN.js";
import { _ as ro } from "./_plugin-vue_export-helper-BxikU0LD.js";
const bt = "notificationHistoryV1", Jr = 200, no = 30 * 864e5;
function ar(e) {
  if (e?.type === "todoist-task" && typeof e.taskId == "string" && /^[A-Za-z0-9_-]{1,100}$/.test(e.taskId)) return { type: e.type, taskId: e.taskId };
  if (e?.type === "module" && typeof e.moduleId == "string" && /^[a-z][a-z0-9-]{0,60}$/.test(e.moduleId)) return { type: e.type, moduleId: e.moduleId };
  if (e?.type === "bili-messages") return { type: e.type };
  if (e?.type === "bili-video") {
    if (typeof e.bvid == "string" && /^BV[A-Za-z0-9]{10}$/.test(e.bvid)) return { type: e.type, bvid: e.bvid };
    if (typeof e.aid == "string" && /^[1-9][0-9]{0,19}$/.test(e.aid)) return { type: e.type, aid: e.aid };
  }
  if (e?.type === "github-repository" && typeof e.fullName == "string" && e.fullName.length <= 240 && /^[\w.-]+\/[\w.-]+$/.test(e.fullName) && !e.fullName.split("/").some((t) => t === "." || t === "..")) return { type: e.type, fullName: e.fullName };
}
function oo(e) {
  if (typeof e == "string")
    try {
      const t = new URL(e);
      if (t.protocol !== "https:" || t.username || t.password || t.port || !["bilibili.com", "www.bilibili.com", "m.bilibili.com"].includes(t.hostname)) return;
      const i = /^\/video\/(BV[A-Za-z0-9]{10}|av[1-9][0-9]{0,19})\/?$/.exec(t.pathname);
      if (i) return i[1].startsWith("BV") ? { type: "bili-video", bvid: i[1] } : { type: "bili-video", aid: i[1].slice(2) };
    } catch {
    }
}
function Yr(e) {
  const t = /* @__PURE__ */ new Map();
  for (const i of e.matchAll(/https:\/\/[^\s<>"']+/g)) {
    const r = oo(i[0].replace(/[)）。，,;；]+$/, ""));
    r && t.set(JSON.stringify(r), r);
  }
  return t.size === 1 ? t.values().next().value : void 0;
}
function ut(e, t) {
  return typeof e != "string" ? "" : e.slice(0, 6e3).replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g, "").replace(/\bBearer\s+[A-Za-z0-9._~+\/-]+=*/gi, "Bearer [已隐藏]").replace(/\b(?:ghp_|github_pat_|sk-)[A-Za-z0-9_-]{8,}/g, "[已隐藏]").replace(/((?:token|password|passwd|secret|api[_-]?key|authorization|cookie)\s*[:=]\s*)[^\s,;]+/gi, "$1[已隐藏]").replace(/https?:\/\/[^\s<>"']+/gi, (i) => {
    try {
      const r = new URL(i);
      return r.username = "", r.password = "", r.search = "", r.hash = "", r.href;
    } catch {
      return "[链接]";
    }
  }).slice(0, t);
}
function Qr(e) {
  if (!e || typeof e.id != "string" || !/^[A-Za-z0-9_:-]{1,200}$/.test(e.id) || typeof e.title != "string" || !Number.isFinite(e.createdAt) || !["info", "success", "warning", "error"].includes(e.level)) throw new Error("Invalid notification record");
  let t = ar(e.target);
  return e.appType === "bili" && (!t || t.type === "bili-messages") && (t = Yr([e.title, e.subtitle, e.message].filter((i) => typeof i == "string").join(" ")) || t), { id: e.id, appType: ut(e.appType, 40), appName: ut(e.appName, 60), title: ut(e.title, 160), subtitle: ut(e.subtitle, 240), message: ut(e.message, 2e3), level: e.level, createdAt: e.createdAt, read: e.read === !0, target: t };
}
function Xr(e) {
  if (e == null) return { version: 0, items: [] };
  if (!e || !Number.isSafeInteger(e.version) || e.version < 0 || !Array.isArray(e.items) || e.items.length > Jr) throw new Error("Invalid notification history");
  const t = Date.now();
  return { version: e.version, items: e.items.map(Qr).filter((i) => i.createdAt >= t - no && i.createdAt <= t + 6e4).sort((i, r) => r.createdAt - i.createdAt) };
}
let _r = Promise.resolve();
function Je(e, t) {
  const i = _r.then(async () => {
    if (typeof chrome > "u" || !chrome.storage?.local)
      throw new Error("Chrome storage API unavailable");
    const r = await chrome.storage.local.get(bt), n = Xr(r[bt]);
    if (e === "list")
      return n;
    if (e === "append") {
      const o = Qr(t);
      o.createdAt = Date.now(), o.read = !1, n.items.some((s) => s.id === o.id) || n.items.unshift(o), n.items = n.items.slice(0, Jr);
    } else if (e === "read-all")
      n.items = n.items.map((o) => ({ ...o, read: !0 }));
    else if (e === "clear")
      n.items = [];
    else if (e === "read" || e === "remove") {
      if (typeof t != "string" || t.length > 200)
        throw new Error("Invalid notification id");
      e === "remove" ? n.items = n.items.filter((o) => o.id !== t) : n.items = n.items.map((o) => o.id === t ? { ...o, read: !0 } : o);
    } else
      throw new Error("Invalid history operation");
    return n.version++, await chrome.storage.local.set({ [bt]: n }), n;
  });
  return _r = i.catch(() => {
  }), i;
}
const I = H({
  isOpen: !1,
  loading: !1,
  saving: !1,
  error: "",
  version: -1,
  items: []
}), ja = Ie(() => I.items.filter((e) => !e.read).length);
let Ir = !1;
function Be(e) {
  e.version < I.version || (I.version = e.version, I.items = e.items);
}
const so = {
  state: I,
  start() {
    Ir || (Ir = !0, typeof chrome < "u" && chrome.storage?.onChanged && chrome.storage.onChanged.addListener((e, t) => {
      if (!(t !== "local" || !e[bt]))
        try {
          Be(Xr(e[bt].newValue));
        } catch {
          I.error = "通知历史格式异常，未覆盖当前记录。";
        }
    }), this.refresh());
  },
  async refresh() {
    I.loading = !0;
    try {
      const e = await Je("list");
      Be(e), I.error = "";
    } catch {
      I.error = "通知历史读取失败。请点击“重新读取”重试。";
    } finally {
      I.loading = !1;
    }
  },
  open() {
    this.start(), I.isOpen = !0, this.refresh();
  },
  close() {
    I.isOpen = !1;
  },
  toggle() {
    I.isOpen ? this.close() : this.open();
  },
  async markRead(e) {
    if (!I.saving) {
      I.saving = !0;
      try {
        const t = await Je("read", e);
        Be(t), I.error = "";
      } catch {
        I.error = "标记已读未确认，请重试。";
      } finally {
        I.saving = !1;
      }
    }
  },
  async markAllRead() {
    if (!I.saving) {
      I.saving = !0;
      try {
        const e = await Je("read-all");
        Be(e), I.error = "";
      } catch {
        I.error = "全部标记已读未确认，请重试。";
      } finally {
        I.saving = !1;
      }
    }
  },
  async remove(e) {
    if (!I.saving) {
      I.saving = !0;
      try {
        const t = await Je("remove", e);
        Be(t), I.error = "";
      } catch {
        I.error = "删除通知未确认，请重试。";
      } finally {
        I.saving = !1;
      }
    }
  },
  async clear() {
    if (!I.saving) {
      I.saving = !0;
      try {
        const e = await Je("clear");
        Be(e), I.error = "";
      } catch {
        I.error = "清空通知未确认，请重试。";
      } finally {
        I.saving = !1;
      }
    }
  },
  async activate(e) {
    await this.markRead(e.id), e.target && await this.openTarget(e.target);
  },
  async openTarget(e) {
    const t = ar(e);
    if (t)
      try {
        if (t.type === "todoist-task") {
          const { openTodoistTask: i } = await import("./task-navigation-CvM3gAxl.js");
          i(t.taskId);
        } else if (t.type === "github-repository") {
          const { githubRepoDetailController: i } = await import("./search.service-wriY3nvN.js").then((r) => r.a5);
          i.open(t.fullName);
        } else if (t.type === "bili-video") {
          const { biliMiniPlayerController: i } = await Promise.resolve().then(() => ms);
          await i.openVideo({ bvid: t.bvid, aid: t.aid });
        } else if (t.type === "bili-messages") {
          const { biliMessagePanelController: i } = await import("./message-panel-store-krCFilqR.js");
          i.openPanel();
        } else {
          const { getDockModule: i } = await import("./window-manager.store-BdI_8a-H.js").then((n) => n.m);
          if (!i(t.moduleId)) throw new Error();
          const { windowManagerController: r } = await import("./window-manager.store-BdI_8a-H.js").then((n) => n.n);
          r.open(t.moduleId);
        }
        this.close();
      } catch {
        I.error = "通知对应页面暂不能打开，记录已保留。";
      }
  }
};
function ao(e) {
  so.start(), Je("append", e).then((t) => Be(t)).catch(() => {
    I.error = "有一条通知未获持久保存确认。";
  });
}
const ve = H([]), Gt = /* @__PURE__ */ new Map();
function co(e, t) {
  return e.history !== void 0 ? e.history : e.level === "warning" || e.level === "error" || /失败|错误|异常|未确认|未获确认|未保存|无法|不可用|拒绝|超时|警告|到期|时间已到/.test(t) ? !0 : /复制成功|已复制|保存成功|已保存|设置成功|已更新设置|配置已更新|已设为|已取消|已切换/.test(t) || /^(正在|开始读取|加载中|同步中)/.test(t) ? !1 : e.appType === "chat" || e.appType === "bili" || /提醒|任务已创建|任务完成|已完成任务|任务结果|下载完成|新消息|新私信|新回复|新提及|有可用更新/.test(t);
}
const Tr = {
  chat: { name: "海狸聊天室", icon: "assets/icon-48.png", action: "查看消息" },
  bili: { name: "哔哩哔哩", icon: "assets/bilibili.svg", action: "查看消息" },
  phone: { name: "手机文件", icon: "assets/nav-traffic.svg", action: "复制文件" },
  fetch: { name: "LogicWeaver", icon: "assets/icon-48.png", action: "" }
};
function li(e) {
  const t = ve.find((i) => i.id === e);
  !t || t.closing || (t.closing = !0, window.setTimeout(() => {
    const i = ve.findIndex((r) => r.id === e);
    i >= 0 && ve.splice(i, 1);
  }, 260));
}
function lo() {
  for (const e of ve) li(e.id);
}
function Zr(e) {
  if (!e) return null;
  const t = e.appType || "fetch", i = Tr[t] || Tr.fetch, r = String(e.title || "新消息通知"), n = String(e.subtitle || ""), o = String(e.message || ""), s = ar(e.target) || (t === "bili" ? Yr(`${r} ${n} ${o}`) : void 0), a = Math.max(500, Number(e.duration) || 7e3), c = String(e.id || `${t}_${r}_${n}_${o}`).trim(), u = Date.now();
  for (const [S, y] of Gt)
    u - y > 3e4 && Gt.delete(S);
  const d = e.id ? 200 : a <= 4e3 ? 1200 : 3e3, h = Gt.get(c);
  if (h && u - h < d || ve.some((S) => S.fingerprint === c && !S.closing)) return null;
  Gt.set(c, u);
  const m = `toast_${crypto.randomUUID()}`, g = {
    id: m,
    fingerprint: c,
    appType: t,
    appName: String(e.appName || i.name),
    icon: String(e.icon || i.icon),
    title: r,
    subtitle: n,
    message: o,
    actionLabel: e.actionLabel === void 0 ? i.action : String(e.actionLabel || ""),
    showActions: e.showActions !== !1,
    duration: a,
    onClick: typeof e.onClick == "function" ? e.onClick : null,
    closing: !1,
    target: s
  };
  ve.push(g);
  const w = r + " " + n + " " + o;
  if (co(e, w)) {
    const S = e.level || (/失败|错误|异常|未确认|未获确认|无法|超时/.test(w) ? "error" : "info"), y = s || (t === "chat" ? { type: "module", moduleId: "chat" } : void 0);
    ao({ id: m, appType: t, appName: g.appName, title: r, subtitle: n, message: o, level: S, createdAt: u, read: !1, target: y });
  }
  const b = ve.filter((S) => !S.closing);
  return b.length > 5 && li(b[0].id), Object.freeze({ id: m, close: () => li(m) });
}
function uo(e, t, i = "", r = "assets/logo.png", n = 3200) {
  return Zr({ appType: "fetch", appName: e, title: t, subtitle: i, icon: r, duration: n, showActions: !1, actionLabel: "" });
}
const Fa = Ot(ve), pe = Object.freeze({
  show: Zr,
  fetch: uo,
  close: li,
  clear: lo,
  get size() {
    return ve.filter((e) => !e.closing).length;
  }
}), Ht = "https://monster-siren.hypergryph.com/api", Kt = "msFavoriteSongs";
class Qe {
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
    return Qe.instance || (Qe.instance = new Qe()), Qe.instance;
  }
  getAudioElement() {
    return this.audio;
  }
  async initStorage() {
    if (typeof chrome < "u" && chrome.storage?.local) {
      const t = await chrome.storage.local.get([Kt]);
      t[Kt] && (this.favorites = t[Kt]);
    }
  }
  bindAudioEvents() {
    if (!this.audio) return;
    let t = 0;
    this.audio.addEventListener("timeupdate", () => {
      if (!this.audio) return;
      const r = performance.now();
      r - t < 250 || (t = r, this.state.currentTime = this.audio.currentTime || 0, this.audio.duration && !Number.isNaN(this.audio.duration) && (this.state.duration = this.audio.duration), this.notify());
    });
    const i = () => {
      this.audio && this.audio.duration && !Number.isNaN(this.audio.duration) && (this.state.duration = this.audio.duration, this.notify());
    };
    this.audio.addEventListener("loadedmetadata", i), this.audio.addEventListener("durationchange", i), this.audio.addEventListener("canplay", i), this.audio.addEventListener("play", () => {
      this.state.playing = !0, this.notify();
    }), this.audio.addEventListener("pause", () => {
      this.state.playing = !1, this.notify();
    }), this.audio.addEventListener("ended", () => {
      this.handleSongEnded();
    }), this.audio.addEventListener("error", (r) => {
      console.warn("[MusicService] Audio playback error:", r), this.state.playing = !1, this.notify();
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
      this.listeners = this.listeners.filter((i) => i !== t);
    };
  }
  notify() {
    const t = { ...this.state };
    for (const i of this.listeners)
      try {
        i(t);
      } catch (r) {
        console.error("[MusicService] Listener error:", r);
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
    const i = await (await fetch(`${Ht}/songs`, { headers: { Accept: "application/json" } })).json();
    return (i.data?.list || i.data || []).map((n) => ({
      cid: n.cid,
      name: n.name,
      artists: n.artists || [],
      albumCid: n.albumCid,
      coverUrl: n.albumCid && this.albumCoverMap.get(String(n.albumCid)) || ""
    }));
  }
  async getSirenAlbums() {
    const n = ((await (await fetch(`${Ht}/albums`, { headers: { Accept: "application/json" } })).json()).data || []).map((o) => ({
      cid: o.cid,
      name: o.name,
      coverUrl: o.coverUrl
    }));
    for (const o of n)
      o.cid && o.coverUrl && this.albumCoverMap.set(String(o.cid), o.coverUrl);
    return n;
  }
  async getSirenAlbumDetail(t) {
    const i = String(t);
    if (this.albumDetailCache.has(i))
      return this.albumDetailCache.get(i);
    const n = await (await fetch(`${Ht}/album/${t}/detail`, { headers: { Accept: "application/json" } })).json(), o = n.data?.songs || [], s = n.data?.coverUrl || "", a = o.map((c) => ({
      cid: c.cid,
      name: c.name,
      artists: c.artists || c.artistes || [],
      albumCid: t,
      coverUrl: s
    }));
    return this.albumDetailCache.set(i, a), a;
  }
  async getSirenSongUrl(t) {
    const r = await (await fetch(`${Ht}/song/${t}`, { headers: { Accept: "application/json" } })).json();
    return {
      sourceUrl: r.data?.sourceUrl || "",
      lyricUrl: r.data?.lyricUrl
    };
  }
  // ==========================================================================
  // 回放控制
  // ==========================================================================
  async playSong(t, i = {}) {
    if (!this.audio || i.isCurrent?.() === !1) return !1;
    const r = ++this.playVersion, n = () => r === this.playVersion && i.isCurrent?.() !== !1;
    !t.coverUrl && t.albumCid && (t.coverUrl = this.albumCoverMap.get(String(t.albumCid)) || ""), this.state.currentSong = t, this.state.queue.some((o) => String(o.cid) === String(t.cid)) || this.state.queue.push(t), this.state.queueIndex = this.state.queue.findIndex((o) => String(o.cid) === String(t.cid));
    try {
      let o = "";
      if (t.isNetease && t.neteaseId ? o = await N.getSongAudioUrl(t.neteaseId) : o = (await this.getSirenSongUrl(t.cid)).sourceUrl, !n()) return !1;
      if (o)
        return this.audio.src = o, i.autoplay !== !1 && await this.audio.play(), n() ? (this.state.playing = !this.audio.paused, this.notify(), !0) : !1;
    } catch (o) {
      if (!n()) return !1;
      console.error("[MusicService] Play song failed:", o), this.state.playing = !1, this.notify();
    }
    return !1;
  }
  async playNeteaseSong(t, i = {}) {
    if (!t || i.isCurrent?.() === !1) return !1;
    N.addRecentSong(t);
    const r = (t.ar || t.artists || []).map((s) => typeof s == "string" ? s : s.name), n = t.al?.picUrl || t.album?.picUrl || t.picUrl || t.coverUrl || "", o = {
      cid: `ne_${t.id}`,
      name: t.name || "网易云音乐",
      artists: r.length ? r : ["网易云音乐"],
      coverUrl: n,
      isNetease: !0,
      neteaseId: t.id,
      rawSong: t
    };
    return this.playSong(o, i);
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
    const i = Math.max(0, Math.min(100, t)) / 100 * this.audio.duration;
    this.audio.currentTime = i;
  }
  setPlayMode(t) {
    this.state.mode = t, this.notify();
  }
  cyclePlayMode() {
    const t = ["list", "one", "shuffle"], i = t.indexOf(this.state.mode), r = t[(i + 1) % t.length];
    return this.setPlayMode(r), r;
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
  setQueue(t, i = -1, r = !1) {
    this.state.queue = [...t], this.state.queueIndex = i, i >= 0 && t[i] && (this.state.currentSong = t[i], this.notify(), r && this.playSong(t[i]));
  }
  // ==========================================================================
  // 收藏管理
  // ==========================================================================
  isLiked(t) {
    return !!this.favorites[String(t)];
  }
  toggleLike(t) {
    const i = String(t.cid), r = !this.favorites[i];
    return r ? this.favorites[i] = t : delete this.favorites[i], this.persistFavorites(), this.notify(), r;
  }
  getFavorites() {
    return Object.values(this.favorites);
  }
  persistFavorites() {
    typeof chrome < "u" && chrome.storage?.local && chrome.storage.local.set({ [Kt]: this.favorites });
  }
}
const x = Qe.getInstance(), be = H({ visible: !1, pendingWrites: 0 }), Yi = /* @__PURE__ */ new Set();
function Va(e) {
  return Yi.add(e), () => {
    Yi.delete(e);
  };
}
function fo() {
  for (const e of Yi) e();
}
async function qa(e) {
  be.pendingWrites++;
  try {
    return await e();
  } finally {
    be.pendingWrites--;
  }
}
const en = "netease_cached_playlists", tn = "netease_cached_favorites_songs", nt = /* @__PURE__ */ new Map(), ot = /* @__PURE__ */ new Map();
let ui;
function Ur(e) {
  const t = ot.get(e);
  if (t) return t;
  try {
    const i = localStorage.getItem(e), r = nt.get(e);
    if (r?.raw === i) return r.value;
    const n = i ? JSON.parse(i) : [], o = Array.isArray(n) ? n : [];
    return nt.set(e, { raw: i, value: o }), o;
  } catch {
    return [];
  }
}
function rn() {
  clearTimeout(ui), ui = void 0;
  for (const [e, t] of ot)
    try {
      const i = JSON.stringify(t);
      localStorage.getItem(e) !== i && localStorage.setItem(e, i), nt.set(e, { raw: i, value: t });
    } catch {
      nt.delete(e);
    }
  ot.clear();
}
function Ga(e, t) {
  ot.set(e, t), ui === void 0 && (ui = setTimeout(rn, 250));
}
function Ha(e) {
  ot.delete(e), nt.delete(e);
  try {
    localStorage.removeItem(e);
  } catch {
  }
}
typeof window < "u" && (window.addEventListener("pagehide", rn), window.addEventListener("storage", (e) => {
  if (e.storageArea === localStorage)
    for (const t of [en, tn])
      (e.key === null || e.key === t) && (nt.delete(t), ot.delete(t));
}));
function Xe(e) {
  return (!Number.isFinite(e) || e < 0) && (e = 0), Math.floor(e / 60) + ":" + String(Math.floor(e % 60)).padStart(2, "0");
}
const Ka = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Ccircle cx='32' cy='32' r='30' fill='%231e1e24'/%3E%3Ctext x='32' y='38' fill='%23ec4141' font-size='22' text-anchor='middle'%3E%E2%99%AC%3C/text%3E%3C/svg%3E", mo = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Cdefs%3E%3CradialGradient id='msrVinyl' cx='50%25' cy='50%25' r='50%25'%3E%3Cstop offset='0%25' stop-color='%2327272a'/%3E%3Cstop offset='70%25' stop-color='%2309090b'/%3E%3Cstop offset='100%25' stop-color='%23000000'/%3E%3C/radialGradient%3E%3C/defs%3E%3Ccircle cx='32' cy='32' r='31' fill='url(%23msrVinyl)' stroke='%233f3f46' stroke-width='1.5'/%3E%3Ccircle cx='32' cy='32' r='24' fill='none' stroke='%2327272a' stroke-width='1' stroke-dasharray='3 2'/%3E%3Ccircle cx='32' cy='32' r='18' fill='none' stroke='%2318181b' stroke-width='1'/%3E%3Ccircle cx='32' cy='32' r='11' fill='%23f59e0b' opacity='0.9'/%3E%3Ccircle cx='32' cy='32' r='4' fill='%2309090b'/%3E%3Ccircle cx='32' cy='32' r='1.5' fill='%23fafafa'/%3E%3C/svg%3E", po = () => ({
  mounted: !1,
  playing: !1,
  title: "点击播放",
  artist: "作者",
  coverUrl: mo,
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
  neteaseRecentSongs: N.getRecentSongs(),
  neteaseQrImg: "",
  neteaseQrStatus: "",
  neteaseLoading: !1
}), p = H(po());
let B = {};
const nn = {
  getSnapshot() {
    return Ot(p);
  },
  update(e) {
    Object.assign(p, e);
  },
  setMounted(e) {
    p.mounted = e;
  },
  setPlaying(e) {
    p.playing = e;
  },
  setTrack(e, t, i) {
    p.title = e || "点击播放", p.artist = t || "作者", p.coverUrl = i || "";
  },
  setProgress(e, t) {
    p.currentTime = e, p.duration = t, p.formattedCurrent = Xe(e), p.formattedDuration = Xe(t), t > 0 ? p.progressPercent = Math.min(100, Math.max(0, e / t * 100)) : p.progressPercent = 0;
  },
  setLiked(e) {
    p.liked = e;
  },
  setMode(e) {
    p.mode = e;
  },
  togglePicker(e) {
    e !== void 0 ? be.visible = e : be.visible = !be.visible;
  },
  setPickerTab(e) {
    p.pickerTab = e, p.activeAlbum = null;
  },
  setSearchQuery(e) {
    p.searchQuery = e;
  },
  setActiveAlbum(e) {
    p.activeAlbum = e;
  },
  setSongs(e) {
    p.songs = e;
  },
  setAlbums(e) {
    p.albums = e;
  },
  setFavorites(e) {
    p.favorites = e;
  },
  setActions(e) {
    B = { ...B, ...e };
  },
  playTrack(e) {
    p.isBiliRadio = !1;
    const t = window;
    if (t.LogicWeaverBiliRadioPlayer?.getState?.()?.playing && t.LogicWeaverBiliRadioPlayer.toggle(), B.playCid)
      B.playCid(e);
    else {
      const i = p.activeAlbum?._songs || [], n = [...p.songs, ...p.favorites, ...i].find((o) => String(o.cid) === String(e));
      n ? x.playSong(n) : x.playSong({ cid: e, name: "塞壬唱片", artists: ["塞壬唱片"] }), window.dispatchEvent(new CustomEvent("logicweaver:music-play-cid", { detail: { cid: e } }));
    }
  },
  togglePlay() {
    if (p.isBiliRadio) {
      const e = window;
      if (typeof e.LogicWeaverBiliRadioPlayer?.toggle == "function") {
        e.LogicWeaverBiliRadioPlayer.toggle();
        return;
      }
    }
    B.togglePlay ? B.togglePlay() : (x.togglePlay(), window.dispatchEvent(new CustomEvent("logicweaver:music-toggle-play")));
  },
  prev() {
    if (p.isBiliRadio) {
      const e = window;
      if (typeof e.LogicWeaverBiliRadioPlayer?.prev == "function") {
        e.LogicWeaverBiliRadioPlayer.prev();
        return;
      }
    }
    B.prev ? B.prev() : (x.prev(), window.dispatchEvent(new CustomEvent("logicweaver:music-prev")));
  },
  next() {
    if (p.isBiliRadio) {
      const e = window;
      if (typeof e.LogicWeaverBiliRadioPlayer?.next == "function") {
        e.LogicWeaverBiliRadioPlayer.next();
        return;
      }
    }
    B.next ? B.next() : (x.next(), window.dispatchEvent(new CustomEvent("logicweaver:music-next")));
  },
  toggleLike() {
    if (B.toggleLike)
      B.toggleLike();
    else {
      const e = x.getState().currentSong;
      e && (p.liked = x.toggleLike(e), p.favorites = x.getFavorites()), window.dispatchEvent(new CustomEvent("logicweaver:music-toggle-like"));
    }
  },
  cycleMode() {
    if (B.cycleMode)
      B.cycleMode();
    else {
      const e = x.cyclePlayMode();
      p.mode = e, window.dispatchEvent(new CustomEvent("logicweaver:music-cycle-mode"));
    }
  },
  seek(e) {
    if (p.isBiliRadio) {
      const t = window;
      if (typeof t.LogicWeaverBiliRadioPlayer?.seek == "function") {
        t.LogicWeaverBiliRadioPlayer.seek(e);
        return;
      }
    }
    B.seek ? B.seek(e) : (x.seek(e), window.dispatchEvent(new CustomEvent("logicweaver:music-seek", { detail: { percent: e } })));
  },
  openPanel() {
    B.openPanel ? B.openPanel() : (nn.togglePicker(!0), window.dispatchEvent(new CustomEvent("logicweaver:music-open-panel")));
  },
  openNetease() {
    p.pickerTab = "netease", p.pickerOpen = !0, p.activeAlbum = null, this.loadNeteaseData();
  },
  async loadNeteaseData() {
    p.neteaseUser = N.getUser(), p.neteaseRecentSongs = N.getRecentSongs(), p.neteaseLoading = !0;
    try {
      const [e] = await Promise.all([
        N.getPlaylists(),
        N.fetchAccountRecentSongs(60).catch(() => [])
      ]);
      if (p.neteasePlaylists = e, p.neteaseRecentSongs = N.getRecentSongs(), e.length > 0) {
        const t = e.find((i) => i.name.includes("喜欢的音乐") || i.name.includes("Favorite")) || e[0];
        (!p.neteaseActivePlaylist || p.neteaseActivePlaylist.id !== t.id) && await this.selectNeteasePlaylist(t);
      }
    } catch (e) {
      console.warn("[MusicStore] Load netease playlists error:", e);
    } finally {
      p.neteaseLoading = !1, p.neteaseRecentSongs = N.getRecentSongs();
    }
  },
  async selectNeteasePlaylist(e) {
    if (p.neteaseActivePlaylist = e, !e) {
      p.neteaseSongs = [];
      return;
    }
    p.neteaseLoading = !0;
    try {
      if (!p.neteaseSongs.length)
        try {
          const i = await N.getPlaylistTracks(e.id, 10, 0);
          p.neteaseActivePlaylist?.id === e.id && !p.neteaseSongs.length && (p.neteaseSongs = i, p.neteaseLoading = !1);
        } catch {
        }
      const t = await N.getPlaylistTracks(e.id, 500, 0);
      p.neteaseActivePlaylist?.id === e.id && (p.neteaseSongs = t);
    } catch (t) {
      console.warn("[MusicStore] Load playlist tracks error:", t);
    } finally {
      p.neteaseLoading = !1;
    }
  },
  async searchNetease(e) {
    const t = e.trim();
    if (!t) {
      p.neteaseSearchResults = [];
      return;
    }
    p.neteaseLoading = !0;
    try {
      const i = await N.searchSongs(t);
      p.neteaseSearchResults = i;
    } catch (i) {
      console.warn("[MusicStore] Search netease error:", i);
    } finally {
      p.neteaseLoading = !1;
    }
  },
  syncFromBiliRadio(e) {
    p.isBiliRadio = !0, p.isNetease = !1, p.playing = e.playing, p.title = e.title || "B站电台", p.artist = e.artist || e.seriesName || "哔哩哔哩", e.coverUrl && (p.coverUrl = e.coverUrl), p.currentTime = e.currentTime, p.duration = e.duration, p.formattedCurrent = Xe(e.currentTime), p.formattedDuration = Xe(e.duration), p.progressPercent = e.duration > 0 ? Math.min(100, Math.max(0, e.currentTime / e.duration * 100)) : 0, p.currentLyric = e.lyric || "", p.biliRadioSeriesName = e.seriesName || "";
    const t = x.getAudioElement();
    e.playing && t && !t.paused && t.pause();
  },
  playNeteaseTrack(e) {
    p.isBiliRadio = !1;
    const t = window;
    t.LogicWeaverBiliRadioPlayer?.getState?.()?.playing && t.LogicWeaverBiliRadioPlayer.toggle(), e && (N.recordRecentSong(e), p.neteaseRecentSongs = N.getRecentSongs()), x.playNeteaseSong(e);
  },
  clearNeteaseRecent() {
    N.clearRecentSongs().catch(() => console.warn("[MusicStore] Recent history removal failed; re-read before retry"));
  },
  refreshRecentSongs() {
    p.neteaseRecentSongs = N.getRecentSongs();
  },
  stopNeteaseQrLogin() {
  },
  async startNeteaseQrLogin() {
    this.stopNeteaseQrLogin();
    try {
      await N.connectWebsiteAccount(), p.neteaseQrStatus = "官网账户已连接", await this.loadNeteaseData();
    } catch (e) {
      p.neteaseQrStatus = e?.message || "请先在网易云官网登录。";
    }
  },
  async logoutNetease() {
    await N.logout(), p.neteaseUser = null, p.neteasePlaylists = [], p.neteaseActivePlaylist = null, p.neteaseSongs = [], p.neteaseSearchResults = [];
  }
};
typeof window < "u" && (window.addEventListener("netease:account-updated", () => {
  p.neteaseUser = N.getUser(), p.neteasePlaylists = [], p.neteaseSongs = [], p.neteaseSearchResults = [], p.neteaseActivePlaylist = null;
}), window.addEventListener("netease:recent-updated", (e) => {
  Array.isArray(e.detail) ? p.neteaseRecentSongs = e.detail : p.neteaseRecentSongs = N.getRecentSongs();
}), x.subscribe((e) => {
  p.playing = e.playing, p.currentTime = e.currentTime, p.duration = e.duration, p.formattedCurrent = Xe(e.currentTime), p.formattedDuration = Xe(e.duration), e.duration > 0 ? p.progressPercent = Math.min(100, Math.max(0, e.currentTime / e.duration * 100)) : p.progressPercent = 0, p.mode = e.mode, p.isNetease = !!e.currentSong?.isNetease, p.currentLyric = e.currentLyric || "", e.currentSong && (p.title = e.currentSong.name || "点击播放", p.artist = (e.currentSong.artists || []).join(", ") || "作者", p.coverUrl = e.currentSong.coverUrl || "", p.liked = x.isLiked(e.currentSong.cid));
}));
async function za() {
  try {
    if (p.favorites = x.getFavorites(), p.neteaseRecentSongs = N.getRecentSongs(), p.neteaseUser = N.getUser(), typeof localStorage < "u")
      try {
        const i = Ur(tn);
        if (i.length) {
          const n = i;
          Array.isArray(n) && n.length > 0 && p.neteaseSongs.length === 0 && (p.neteaseSongs = n);
        }
        const r = Ur(en);
        if (r.length) {
          const n = r;
          Array.isArray(n) && n.length > 0 && p.neteasePlaylists.length === 0 && (p.neteasePlaylists = n);
        }
      } catch {
      }
    const [e, t] = await Promise.all([
      x.getSirenSongs().catch(() => []),
      x.getSirenAlbums().catch(() => [])
    ]);
    e.length > 0 && p.songs.length === 0 && (p.songs = e, x.setQueue(e, -1, !1)), t.length > 0 && p.albums.length === 0 && (p.albums = t);
  } catch (e) {
    console.warn("[MusicStore] initHomeMusicService failed:", e);
  }
}
const ae = H({
  avatarUrl: "assets/bilibili.svg",
  userName: "哔哩哔哩用户",
  buttonTitle: "通知中心"
}), ho = () => ({
  mounted: !1,
  visible: !1,
  x: 0,
  y: 0,
  avatarUrl: "assets/bilibili.svg",
  userName: "用户"
}), De = H(ho());
let Z = {};
const go = {
  getSnapshot() {
    return Ot(De);
  },
  update(e) {
    Object.assign(De, e);
  },
  setMounted(e) {
    De.mounted = e;
  },
  open(e, t) {
    De.x = e, De.y = t, De.visible = !0;
    const i = document.getElementById("bili-profile-menu");
    i && (i.hidden = !1, i.style.left = `${Math.min(window.innerWidth - 205, e)}px`, i.style.top = `${Math.min(window.innerHeight - 150, t)}px`);
  },
  close() {
    De.visible = !1;
    const e = document.getElementById("bili-profile-menu");
    e && (e.hidden = !0);
  },
  trigger(e) {
    if (go.close(), Z.onAction) {
      Z.onAction(e);
      return;
    }
    e === "messages" && Z.showInfo ? Z.showInfo() : e === "refresh" && Z.refresh ? Z.refresh() : e === "switch" && Z.switchUser ? Z.switchUser() : e === "web" && Z.openWeb ? Z.openWeb() : window.dispatchEvent(new CustomEvent("logicweaver:profile-menu-action", { detail: { action: e } }));
  },
  setActions(e) {
    Z = { ...Z, ...e };
  }
}, Pr = [
  "todoist",
  "card-github",
  "daily-aihot",
  "daily-bilibili",
  "daily-youtube"
], di = "lw_active_card";
function yo() {
  try {
    if (typeof localStorage < "u" && localStorage.removeItem(di), typeof window < "u" && window.location?.hash) {
      const e = window.location.hash.replace(/^#/, "");
      if (Pr.includes(e))
        return e;
    }
    if (typeof sessionStorage < "u") {
      const e = sessionStorage.getItem(di);
      if (e && Pr.includes(e))
        return e;
    }
  } catch {
  }
  return null;
}
const ce = H({
  activeId: yo()
});
typeof window < "u" && Pe(
  () => ce.activeId,
  (e) => {
    try {
      e ? (sessionStorage.setItem(di, e), window.location.hash !== `#${e}` && history.replaceState(null, "", `#${e}`)) : (sessionStorage.removeItem(di), window.location.hash && history.replaceState(null, "", window.location.pathname + window.location.search));
    } catch {
    }
  },
  { immediate: !0 }
);
let fi;
function Ja(e) {
  fi = e;
}
function Ai(e) {
  if (!fi) throw new Error("Fullscreen card host not ready");
  fi.enter(e);
}
function Nt(e) {
  ce.activeId === e && fi?.exit();
}
function wo(e) {
  typeof document > "u" || (document.documentElement?.classList.remove("has-card-fullscreen"), document.body && (document.body.classList.toggle("has-card-fullscreen", !!e), document.body.dataset.page = e ? "daily" : "home"));
}
const bo = {
  "bilibili.html": "daily-bilibili",
  "github.html": "card-github",
  "aihot.html": "daily-aihot",
  "youtube.html": "daily-youtube"
};
function on() {
  return typeof location > "u" ? null : bo[location.pathname.split("/").pop() || ""] || null;
}
const Ya = Ie(() => {
  const e = on() || ce.activeId;
  if (e) return e;
  const t = Kn.activeId;
  return t && Si.isActive(t) ? t : "home";
}), vo = {
  schemaVersion: 1,
  id: "card-github",
  title: "github插件",
  icon: "assets/nav-github.svg",
  presentation: "card",
  dockBefore: "daily-aihot",
  rootId: "card-github",
  settingsKeys: ["ghUser", "ghToken", "ghAiServiceConfigV1", "ghArchifyWebhookUrl"],
  capabilities: ["workspace:fullscreen", "view:retained", "github:repositories"],
  loadView: () => import("./GitHubWorkspaceCard-B-6ScxxQ.js").then((e) => e.default),
  lifecycle: {
    isVisible: () => ce.activeId === "card-github",
    open: () => Ai("card-github"),
    hide: () => Nt("card-github"),
    // Existing card menus do not expose Quit/Reload. Do not introduce a destructive new path
    // until settings drafts and every child editor provide an aggregate unmount guard.
    canUnmount: () => !1,
    unmountBlockedMessage: "GitHub 工作区保留原有隐藏保活设计；尚未开放独立退出/重载，以免丢失草稿。"
  }
}, So = H({
  showWeather: !0,
  showSites: !0,
  showBili: !0,
  showYouTube: !0,
  showTodo: !0,
  showBookmarkPanel: !0
}), Ao = {
  schemaVersion: 1,
  id: "daily-youtube",
  title: "youtube插件",
  icon: "assets/nav-youtube.svg",
  presentation: "card",
  rootId: "daily-youtube",
  showInDock: !0,
  settingsKeys: ["youtubeModuleSettingsV1"],
  capabilities: ["workspace:fullscreen", "view:retained", "youtube:recommendations", "youtube:favorites"],
  loadView: () => import("./YouTubeCard-BzRjmO1L.js").then((e) => e.Y).then((e) => e.default),
  lifecycle: {
    // Match the original retained-mount condition, including the shared homepage preference.
    isVisible: () => ce.activeId === "daily-youtube" && So.showYouTube,
    open: () => Ai("daily-youtube"),
    hide: () => Nt("daily-youtube"),
    // Preserve existing card menus. Settings drafts and shared writes are not yet
    // aggregated into a safe independent Quit/Reload guard.
    canUnmount: () => !1,
    unmountBlockedMessage: "YouTube 工作区保留原有隐藏保活设计；尚未开放独立退出/重载，以免丢失设置草稿或打断收藏操作。"
  }
}, Eo = {
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
  loadView: () => import("./BilibiliWorkspace-MlMY40wX.js").then((e) => e.default),
  lifecycle: {
    isVisible: () => ce.activeId === "daily-bilibili",
    open: () => Ai("daily-bilibili"),
    hide: () => Nt("daily-bilibili"),
    // Hide must not dispose shared radio/player state or interrupt folder/cache operations.
    canUnmount: () => !1,
    unmountBlockedMessage: "B站收藏保留原有隐藏保活设计；尚未开放独立退出/重载，以免打断播放、收藏或缓存操作。"
  }
}, ko = {
  schemaVersion: 1,
  id: "daily-aihot",
  title: "ai hot插件",
  icon: "assets/nav-aihot.svg",
  presentation: "card",
  rootId: "daily-aihot",
  // Existing localStorage preferences; registration neither reads nor migrates them.
  settingsKeys: ["lw-info-feed-view", "lw-aihot-feed-cat", "lw-aihot-feed-window"],
  capabilities: ["workspace:fullscreen", "view:retained", "aihot:aggregate"],
  loadView: () => import("./AihotFeed-CKFu051c.js").then((e) => e.default),
  lifecycle: {
    isVisible: () => ce.activeId === "daily-aihot",
    open: () => Ai("daily-aihot"),
    hide: () => Nt("daily-aihot"),
    // Keep the original retained card. Its view owns list activity;
    // the separate article reader is not owned or closed by this module.
    canUnmount: () => !1,
    unmountBlockedMessage: "AI HOT 保留原有隐藏保活设计；尚未开放独立退出/重载。"
  }
}, Co = {
  schemaVersion: 1,
  id: "stickers",
  title: "表情包模块",
  emoji: "😺",
  // Keep the chat picker's library management window without a standalone Dock entry.
  showInDock: !1,
  rootId: "vue-stickers-dialog-root",
  settingsKeys: Zn,
  capabilities: ["folder:explicit-permission", "image:explicit-save-delete", "image:local-preview", "image:clipboard"],
  loadView: () => import("./StickersDialog-75iBZmAE.js").then((e) => e.default),
  lifecycle: {
    isVisible: () => Vt.visible,
    open: () => {
      Vt.visible = !0;
    },
    hide: () => {
      Vt.visible = !1, eo();
    },
    canUnmount: () => Vt.pendingWrites === 0,
    unmountBlockedMessage: "图片保存/删除、目录授权或偏好正在处理，暂不能退出/重载；可以先隐藏，已提交操作不会撤回。"
  }
}, _o = "neteaseApiUrl", Io = [_o], To = {
  schemaVersion: 1,
  id: "music",
  title: "网易云模块",
  icon: "assets/netease.svg",
  rootId: "vue-music-workspace-root",
  settingsKeys: Io,
  capabilities: ["catalog:read", "settings:endpoint", "account:explicit-login-logout", "playback:shared-home-controls"],
  loadView: () => import("./NeteaseWorkspaceDialog-de0PHyIx.js").then((e) => e.default),
  lifecycle: {
    isVisible: () => be.visible,
    open: () => {
      be.visible = !0;
    },
    hide: () => {
      be.visible = !1, fo();
    },
    canUnmount: () => be.pendingWrites === 0,
    unmountBlockedMessage: "节点保存、登录确认/退出或记录写入正在处理，暂不能退出/重载；可以隐藏。退出窗口不会停止首页播放。"
  }
}, Uo = Object.freeze([
  "todoistToken",
  "todoistActiveProjectIdV1"
]), Po = {
  schemaVersion: 1,
  id: "todoist",
  title: "todoist",
  icon: "assets/nav-todoist.svg",
  dockBefore: "stickers",
  rootId: "todoist",
  settingsKeys: Uo,
  capabilities: ["view:retained", "tasks:read-write", "attachments:explicit-upload", "settings:account-rules", "calendar:shared"],
  loadView: () => import("./TodoistWorkspace-DYLpC0UC.js").then((e) => e.default),
  lifecycle: {
    isVisible: () => qt.visible,
    open: () => {
      qt.visible = !0;
    },
    hide: () => {
      qt.visible = !1, to();
    },
    canUnmount: () => qt.pendingWrites === 0,
    unmountBlockedMessage: "任务、附件、评论或配置正在写入，暂不能退出/重载；可以隐藏。首页限时任务和独立日历不会随窗口退出停止。"
  }
}, Mo = 1, Ro = 1, Oo = { text: { legacy: !0 }, image: { legacy: !1 }, music: { legacy: !0 }, bilibili: { legacy: !0 }, github: { legacy: !0 }, bili_series: { legacy: !0 }, aihot: { legacy: !0 }, youtube: { legacy: !0 }, website: { legacy: !0 }, server_invite: { legacy: !0 }, music_party: { legacy: !0 } }, No = ["image/png", "image/jpeg", "image/gif", "image/webp"], xo = { messageBytes: 262144, imageMessageBytes: 2097152, imageBytes: 1048576, textChars: 8e3, imageMaxDimension: 8192, imageMaxPixels: 16777216 }, at = {
  schema: Mo,
  protocol: Ro,
  messageTypes: Oo,
  imageMimeTypes: No,
  limits: xo
};
function Lo(e) {
  try {
    if (e.length > Math.ceil(at.limits.imageBytes / 3) * 4 + 64) return;
    const t = e.indexOf(","), i = e.slice(5, e.indexOf(";")), r = Uint8Array.from(atob(e.slice(t + 1)), (s) => s.charCodeAt(0)), n = new DataView(r.buffer), o = (s, a) => String.fromCharCode(...r.slice(s, a));
    if (i === "image/png" && r.length >= 33 && o(0, 8) === `PNG\r

` && n.getUint32(8) === 13 && o(12, 16) === "IHDR") return [n.getUint32(16), n.getUint32(20)];
    if (i === "image/gif" && r.length >= 13 && ["GIF87a", "GIF89a"].includes(o(0, 6))) return [n.getUint16(6, !0), n.getUint16(8, !0)];
    if (i === "image/webp" && r.length >= 25 && o(0, 4) === "RIFF" && o(8, 12) === "WEBP" && n.getUint32(4, !0) + 8 === r.length) {
      const s = o(12, 16);
      if (s === "VP8X" && r.length >= 30) return [1 + r[24] + (r[25] << 8) + (r[26] << 16), 1 + r[27] + (r[28] << 8) + (r[29] << 16)];
      if (s === "VP8L" && r[20] === 47) {
        const a = n.getUint32(21, !0);
        return [1 + (a & 16383), 1 + (a >>> 14 & 16383)];
      }
      if (s === "VP8 " && r.length >= 30 && o(23, 26) === "*") return [n.getUint16(26, !0) & 16383, n.getUint16(28, !0) & 16383];
    }
    if (i === "image/jpeg" && r[0] === 255 && r[1] === 216) {
      let s = 2;
      for (; s + 4 <= r.length && r[s] === 255; ) {
        for (; s < r.length && r[s] === 255; ) s++;
        if (s >= r.length) break;
        const a = r[s++];
        if (a === 216 || a === 1 || a >= 208 && a <= 215) continue;
        if (a === 217 || a === 218 || s + 2 > r.length) break;
        const c = n.getUint16(s);
        if (c < 2 || s + c > r.length) break;
        if ([192, 193, 194, 195, 197, 198, 199, 201, 202, 203, 205, 206, 207].includes(a) && c >= 8) return [n.getUint16(s + 5), n.getUint16(s + 3)];
        s += c;
      }
    }
  } catch {
  }
}
const Do = at.protocol, Te = Object.freeze({ ...at.limits }), Qi = Object.freeze(Object.keys(at.messageTypes)), Xi = Object.freeze([...at.imageMimeTypes]), le = (e) => !!e && typeof e == "object" && !Array.isArray(e), Bi = (e) => typeof e == "number" && Number.isSafeInteger(e) && e > 0;
function Ei() {
  return { status: "unknown", reason: "请先完成当前服务器的身份同步，再发送消息。", messageTypes: [], imageMimeTypes: [], limits: { ...Te } };
}
function zt() {
  return { ...Ei(), status: "incompatible", reason: "服务端消息能力格式无效或协议版本不兼容，请服主核对前后端版本；待发内容已保留。" };
}
function $o(e) {
  if (e === void 0 || le(e) && !("schema" in e) && !("protocol" in e) && !("messageTypes" in e) && !("limits" in e)) {
    if (e !== void 0 && !le(e)) return zt();
    const n = le(e) && e.imageMessages === 1;
    return le(e) && e.maxImageBytes !== void 0 && !Bi(e.maxImageBytes) ? zt() : {
      status: "legacy",
      reason: n ? "" : "此旧版服务端未声明图片能力，请服主升级；待发图片已保留。",
      messageTypes: Qi.filter((o) => o === "image" ? n : at.messageTypes[o].legacy),
      imageMimeTypes: n ? [...Xi] : [],
      limits: { ...Te, imageBytes: n && le(e) && Bi(e.maxImageBytes) ? Math.min(e.maxImageBytes, Te.imageBytes) : Te.imageBytes }
    };
  }
  if (!le(e) || e.schema !== 1 || e.protocol !== Do || !le(e.limits) || !Array.isArray(e.messageTypes) || e.messageTypes.length > 64 || e.messageTypes.some((n) => typeof n != "string") || !Array.isArray(e.imageMimeTypes) || e.imageMimeTypes.length > 16 || e.imageMimeTypes.some((n) => typeof n != "string")) return zt();
  const t = { ...Te };
  for (const n of Object.keys(t)) {
    const o = e.limits[n];
    if (!Bi(o)) return zt();
    t[n] = Math.min(t[n], o);
  }
  const i = Xi.filter((n) => e.imageMimeTypes.includes(n)), r = Qi.filter((n) => e.messageTypes.includes(n) && (n !== "image" || e.imageMessages === 1 && i.length > 0));
  return { status: "supported", reason: r.includes("image") ? "" : "此服务端未启用兼容的图片消息，待发图片已保留。", messageTypes: r, imageMimeTypes: i, limits: t };
}
function Bo(e, t = Te, i = Xi) {
  if (typeof e != "string" || e.length > Math.ceil(t.imageBytes / 3) * 4 + 32) return !1;
  const r = /^data:(image\/[a-z0-9.+-]+);base64,([A-Za-z0-9+/]+={0,2})$/.exec(e);
  if (!r || !i.includes(r[1])) return !1;
  const n = r[2], o = n.length / 4 * 3 - (n.endsWith("==") ? 2 : n.endsWith("=") ? 1 : 0);
  return n.length % 4 === 0 && o > 0 && o <= t.imageBytes;
}
function Ct(e, t) {
  if (!le(t) || typeof t.type != "string" || typeof t.content != "string" || typeof t.id != "string" || !t.id || typeof t.timestamp != "number" || !Number.isFinite(t.timestamp) || !le(t.sender) || typeof t.sender.uid != "string" || typeof t.sender.name != "string" || typeof t.sender.avatar != "string") return "消息格式无效，原记录已保留，请核对后重新发送。";
  const i = le(t.meta) ? t.meta.imageUrl : void 0;
  if (e.status === "unknown" || e.status === "incompatible") return e.reason;
  if (!e.messageTypes.includes(t.type)) return t.type === "image" ? e.reason || "服务端未启用图片消息，待发图片已保留。" : "服务端不支持此消息类型，内容已保留。";
  if (t.content.length > e.limits.textChars) return "文字超过服务端声明的长度上限，请缩短后再发送。";
  if (t.type === "image" && !Bo(i, e.limits, e.imageMimeTypes)) return "图片格式或大小不符合服务端能力，请重新选择或压缩；原内容已保留。";
  if (t.type === "image") {
    const o = Lo(i);
    if (!o || o.some((s) => s < 1 || s > e.limits.imageMaxDimension) || o[0] * o[1] > e.limits.imageMaxPixels) return "图片文件头或像素尺寸不符合当前服务端限制，请重新选择；原内容已保留。";
  }
  let r;
  try {
    r = JSON.stringify({ message: t });
  } catch {
    return "消息不能安全编码，原记录已保留，请核对后重新发送。";
  }
  return new TextEncoder().encode(r).byteLength > (t.type === "image" ? e.limits.imageMessageBytes : e.limits.messageBytes) ? "消息超过服务端声明的JSON大小上限，内容已保留。" : "";
}
const sn = Te.imageMessageBytes, an = Te.textChars, _t = (e) => !!e && typeof e == "object" && !Array.isArray(e), se = (e, t) => typeof e == "string" && e.length <= t;
function xt(e) {
  if (!se(e, 4096)) return "";
  try {
    const t = new URL(e);
    return ["https:", "http:"].includes(t.protocol) && !t.username && !t.password ? t.href : "";
  } catch {
    return "";
  }
}
function ki(e) {
  return typeof e != "string" ? "" : e.length <= sn && /^data:image\/(?:png|jpeg|gif|webp);base64,[A-Za-z0-9+/=\r\n]+$/i.test(e) ? e : xt(e);
}
function Ci(e) {
  if (!se(e, 4096)) throw new Error("服务器地址过长");
  if (!e.trim()) return "";
  let t;
  try {
    t = new URL(e.trim());
  } catch {
    throw new Error("服务器地址格式不正确");
  }
  const i = t.hostname, r = i === "localhost" || i === "[::1]" || /^(127\.|10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.)/.test(i);
  if (t.protocol !== "wss:" && !(t.protocol === "ws:" && r) || t.username || t.password || t.hash)
    throw new Error("公网服务器须使用 WSS；WS 仅限本机或局域网，地址不能含用户信息或片段");
  return t.href;
}
function cn(e, t) {
  if (!(!_t(e) || !["bilibili", "github", "music", "aihot", "youtube", "idle"].includes(String(e.type)) || !se(e.title, 500)))
    return { type: e.type, title: e.title, url: xt(e.url) || void 0, updatedAt: t };
}
function ln(e, t = 0) {
  if (!_t(e) || t > 2) return;
  const i = /* @__PURE__ */ Object.create(null);
  for (const [r, n] of Object.entries(e).slice(0, 64))
    ["__proto__", "constructor", "prototype", "rawSong"].includes(r) || (typeof n == "string" && n.length <= (r === "imageUrl" ? sn : an) ? i[r] = /(?:cover|avatar|face|imageUrl)$/i.test(r) ? ki(n) : /url$/i.test(r) ? xt(n) : n : typeof n == "boolean" || typeof n == "number" && Number.isFinite(n) ? i[r] = n : r === "seriesItems" && Array.isArray(n) && (i[r] = n.slice(0, 100).map((o) => ln(o, t + 1)).filter(Boolean)));
  return i;
}
function Lt(e) {
  return un(e, Date.now());
}
function un(e, t) {
  if (!_t(e) || !_t(e.sender) || !se(e.id, 160) || !e.id || !se(e.sender.uid, 160) || !e.sender.uid || !se(e.sender.name, 100) || !se(e.content, an) || ![...Qi, "system"].includes(String(e.type)) || typeof e.timestamp != "number" || !Number.isFinite(e.timestamp)) return;
  const i = ki(e.sender.avatar) || (se(e.sender.avatar, 32) && !/[:/]/.test(e.sender.avatar) ? e.sender.avatar : "👤");
  return { id: e.id, sender: { uid: e.sender.uid, name: e.sender.name, avatar: i, activity: cn(e.sender.activity, t) }, type: e.type, content: e.content, timestamp: e.timestamp, meta: ln(e.meta) };
}
function Wo(e, t) {
  if (!_t(e) || !se(e.uid, 160) || !e.uid || !se(e.name, 100)) return;
  const i = ki(e.avatar) || (se(e.avatar, 32) && !/[:/]/.test(e.avatar) ? e.avatar : "👤");
  return { uid: e.uid, name: e.name, avatar: i, activity: cn(e.activity, t) };
}
const It = we(""), Qa = we(!1), cr = we(0);
let dt, Fe = Promise.resolve();
const he = /* @__PURE__ */ new Map();
function lr(e, t, i) {
  return JSON.stringify([e, t, i]);
}
function _i() {
  return dt || (dt = new Promise((e, t) => {
    const i = indexedDB.open("lw-chat-history", 2);
    i.onupgradeneeded = () => {
      i.result.objectStoreNames.contains("messages") || i.result.createObjectStore("messages", { keyPath: ["scope", "id"] }).createIndex("timeline", ["scope", "timestamp", "id"], { unique: !0 }), i.result.objectStoreNames.contains("relay-cursors") || i.result.createObjectStore("relay-cursors");
    }, i.onerror = () => t(i.error), i.onblocked = () => {
      It.value = "历史数据库升级被其他标签页阻塞，请关闭旧标签页后重试";
    }, i.onsuccess = () => {
      const r = i.result;
      r.onversionchange = () => {
        r.close(), dt = void 0;
      }, e(r);
    };
  }).catch((e) => {
    throw dt = void 0, e;
  })), dt;
}
function Ii(e, t) {
  for (const i of t) {
    const r = Lt(i);
    if (!r || r.id === "sys-welcome") continue;
    const n = { scope: e, id: r.id, timestamp: r.timestamp, message: JSON.parse(JSON.stringify(r)) };
    he.set(JSON.stringify([e, n.id]), n);
  }
  return cr.value = he.size, jo();
}
function jo() {
  return Fe = Fe.then(async () => {
    if (!he.size) return;
    const e = [...he.entries()];
    try {
      const t = await _i();
      await new Promise((i, r) => {
        const n = t.transaction("messages", "readwrite");
        n.oncomplete = () => i(), n.onabort = () => r(n.error), n.onerror = () => r(n.error);
        const o = n.objectStore("messages");
        for (const [, s] of e) o.put(s);
      });
      for (const [i, r] of e) he.get(i) === r && he.delete(i);
      cr.value = he.size, It.value = "";
    } catch {
      It.value = "历史未能写入磁盘（空间不足或数据库不可用）。待存消息保留在内存，请先导出备份，勿关闭或刷新。";
    }
  }), Fe;
}
async function Fo(e) {
  await Fe;
  const t = await _i();
  return new Promise((i, r) => {
    const n = t.transaction("relay-cursors", "readonly"), o = n.objectStore("relay-cursors").get(e);
    n.oncomplete = () => i(Number.isSafeInteger(o.result) ? o.result : 0), n.onabort = () => r(n.error), o.onerror = () => r(o.error);
  });
}
function Vo(e, t, i) {
  const r = Fe.then(async () => {
    const n = await _i();
    await new Promise((o, s) => {
      const a = n.transaction(["messages", "relay-cursors"], "readwrite"), c = a.objectStore("messages");
      for (const h of t) c.put({ scope: e, id: h.id, timestamp: h.timestamp, message: JSON.parse(JSON.stringify(h)) });
      const u = a.objectStore("relay-cursors"), d = u.get(e);
      d.onsuccess = () => u.put(Math.max(Number(d.result) || 0, i), e), a.oncomplete = () => o(), a.onabort = () => s(a.error), a.onerror = () => s(a.error);
    });
  });
  return Fe = r.catch(() => {
  }), r;
}
async function dn(e, t, i = 200) {
  await Fe;
  const r = await _i();
  return new Promise((n, o) => {
    const s = r.transaction("messages", "readonly"), a = [e, -Number.MAX_VALUE, ""], c = t ? [e, t.timestamp, t.id] : [e, Number.MAX_VALUE, "￿"], u = IDBKeyRange.bound(a, c, !1, !!t), d = s.objectStore("messages").index("timeline").openCursor(u, "prev"), h = [];
    d.onerror = () => o(d.error), s.onabort = () => o(s.error), d.onsuccess = () => {
      const m = d.result;
      if (!m || h.length >= i) {
        n(h.reverse());
        return;
      }
      const g = Lt(m.value.message);
      g && h.push(g), m.continue();
    };
  });
}
async function Xa(e) {
  const t = /* @__PURE__ */ new Map();
  let i;
  for (; ; ) {
    const r = await dn(e, i, 500);
    for (const n of r) t.set(n.id, n);
    if (r.length < 500) break;
    i = r[0];
  }
  for (const r of he.values()) r.scope === e && t.set(r.id, r.message);
  return [...t.values()].sort((r, n) => r.timestamp - n.timestamp || r.id.localeCompare(n.id));
}
function Za(e) {
  return [...he.values()].filter((t) => t.scope === e).map((t) => t.message);
}
function mi(e) {
  const t = xt(e);
  return t && t.length <= 1e3 && !/\/noface\.(jpg|png)(?:[?#]|$)/i.test(t) ? t : "";
}
function Ti(e, t = "") {
  const i = mi(e) || mi(t);
  return i || (e && e.length <= 8 && !/[:/]/.test(e) ? e : "🦫");
}
const Ui = "lw_chat_server_url", fn = "lw_chat_user_id", Pi = "lw_chat_user_name", Mi = "lw_chat_user_avatar", fe = "lw_chat_groups", mn = "lw_chat_current_group", qo = "lw_chat_rooms", Go = "lw_chat_friends", pn = "lw_chat_friend_requests_v1", ri = "lw_chat_current_room", hn = "";
function de(e, t) {
  try {
    if (typeof localStorage < "u") {
      const i = localStorage.getItem(e);
      if (e === Ui && i && localStorage.getItem("lw_chat_server_explicit") !== "true" && (i.includes("sslip.io") || i.includes("your-domain.com")))
        return localStorage.removeItem(e), t;
      if (i !== null) return i;
    }
  } catch {
  }
  return t;
}
function D(e, t) {
  try {
    typeof localStorage < "u" && localStorage.setItem(e, t);
  } catch {
  }
}
function yt(e, t) {
  try {
    if (typeof localStorage < "u") {
      const i = localStorage.getItem(e);
      if (i) return JSON.parse(i);
    }
  } catch {
  }
  return t;
}
const Ho = [
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
], Ko = [
  { id: "main", name: "自习室大厅", icon: "🏠" },
  { id: "dev", name: "代码与摸鱼", icon: "💻" },
  { id: "music", name: "音乐咖啡馆", icon: "🎵" }
];
function zo() {
  const e = ["摸鱼", "冲浪", "喝茶", "听歌", "看番", "敲代码", "发呆", "漫游"], t = ["海狸", "企鹅", "猫猫", "柴犬", "仓鼠", "水獭", "考拉", "熊猫"], i = e[Math.floor(Math.random() * e.length)], r = t[Math.floor(Math.random() * t.length)], n = Math.floor(1e3 + Math.random() * 9e3);
  return `${i}的${r}#${n}`;
}
function Jo() {
  const e = ["🦫", "🐧", "🐱", "🐶", "🐹", "🦦", "🐨", "🐼", "🦊", "🐰"];
  return e[Math.floor(Math.random() * e.length)];
}
const gn = de(fn, ""), ur = gn || `u_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`;
gn || D(fn, ur);
const pi = de(Pi, ""), Yo = !pi || pi.includes("#"), Mr = ae.userName && ae.userName !== "哔哩哔哩用户" && ae.userName !== "浏览器指纹与环境" ? ae.userName : "", yn = Yo && Mr ? Mr : pi || zo();
pi || D(Pi, yn);
const Ze = de(Mi, ""), Qo = !Ze || Ze.length <= 4 || Ze.startsWith("data:") || Ze.includes("/noface."), Rr = mi(ae.avatarUrl), wn = Qo && Rr ? Rr : Ze || Jo();
Ze || D(Mi, wn);
const f = H({
  visible: !1,
  shareActivity: de("lw_chat_share_activity", "true") !== "false",
  error: "",
  connected: !1,
  connecting: !1,
  onlineCount: 1,
  serverUrl: de(Ui, hn),
  currentGroupId: de(mn, "hub_main"),
  currentChannelId: "general",
  groups: yt(fe, Ho),
  groupMembers: [],
  currentRoomId: de(ri, "main"),
  rooms: yt(qo, Ko),
  friends: yt(Go, []),
  friendRequests: yt(pn, []),
  currentUser: {
    uid: ur,
    name: yn,
    avatar: wn
  },
  messages: Tt(de(ri, "main")).length > 0 ? Tt(de(ri, "main")) : [
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
es();
Pe(
  () => [ae.avatarUrl, ae.userName],
  ([e, t]) => {
    const i = f.currentUser.avatar;
    mi(e) && (!i || i.length <= 4 || i.startsWith("data:") || i.includes("/noface.") || /^https?:\/\/[^/]*hdslb\.com\//i.test(i)) && (f.currentUser.avatar = e, D(Mi, e)), t && t !== "哔哩哔哩用户" && t !== "浏览器指纹与环境" && (!f.currentUser.name || f.currentUser.name.includes("#") || f.currentUser.name.startsWith("摸鱼")) && (f.currentUser.name = t, D(Pi, t));
  },
  { immediate: !0 }
);
const Or = H({ scope: "", ready: !1 });
let Jt = 0;
Pe(
  () => lr(f.currentUser.uid, f.serverUrl, f.currentRoomId),
  async (e) => {
    const t = ++Jt;
    Object.assign(Or, { scope: e, ready: !1 });
    const { currentRoomId: i, serverUrl: r, currentUser: n } = f, o = Tt(i, r, n.uid);
    await Ii(e, o);
    try {
      const s = await dn(e);
      if (t !== Jt) return;
      const a = new Map(s.map((c) => [c.id, c]));
      for (const c of f.messages) c.id !== "sys-welcome" && a.set(c.id, c);
      f.messages = [...a.values()].sort((c, u) => c.timestamp - u.timestamp || c.id.localeCompare(u.id)).slice(-200);
    } catch {
      t === Jt && (It.value = "无法读取历史数据库，现有缓存未删除，请导出备份后检查浏览器存储。");
    } finally {
      t === Jt && (Or.ready = !0);
    }
  },
  { immediate: !0 }
);
function ec(e, t) {
  f.currentUser.name = e.trim() || f.currentUser.name, f.currentUser.avatar = t.trim() || f.currentUser.avatar, D(Pi, f.currentUser.name), D(Mi, f.currentUser.avatar);
}
function Xo(e, t, i) {
  return "lw_chat_history_v2_" + JSON.stringify([i, t, e]);
}
function Tt(e, t = de(Ui, hn), i = ur) {
  try {
    const r = localStorage.getItem(Xo(e, t, i));
    if (r) {
      const n = JSON.parse(r);
      if (Array.isArray(n)) return n.map(Lt).filter((o) => !!o).slice(-200);
    }
  } catch {
  }
  return [];
}
function Zo(e, t) {
  const i = lr(f.currentUser.uid, f.serverUrl, e);
  Ii(i, t);
}
function bn(e, t) {
  if (!e) return "";
  const i = new URL(Ci(e));
  return i.searchParams.set("room", t), i.href;
}
function Zi(e, t = !0, i = !1) {
  if (t && It.value && cr.value > 0)
    return f.error = "仍有未保存消息，请先重试保存或导出备份，暂不切换房间", !1;
  try {
    e.endpoint = Ci(e.endpoint), localStorage.setItem("lw_chat_session_v1", JSON.stringify(e));
  } catch {
    return f.error = "会话保存失败或地址无效，未切换房间", !1;
  }
  const r = e.endpoint !== f.serverUrl || e.roomId !== f.currentRoomId;
  return r && t && Zo(f.currentRoomId, f.messages), Object.assign(f, {
    currentGroupId: e.groupId,
    currentChannelId: e.channelId,
    currentRoomId: e.roomId,
    serverUrl: e.endpoint
  }), r && (f.messages = Tt(e.roomId, e.endpoint, f.currentUser.uid), f.userActivities = {}, f.unreadCount = 0, i || (f.connected = !1, f.connecting = !1), f.onlineCount = 0), D(Ui, e.endpoint), D(ri, e.roomId), D(mn, e.groupId), !0;
}
function Dt(e, t = "local", i = !1) {
  let r, n = t;
  try {
    if (r = Ci(e), r) {
      const a = new URL(r);
      if (n = a.searchParams.get("room") || "default", !n || n.length > 160) throw new Error();
      a.searchParams.set("room", n), r = a.href;
    }
  } catch {
    return f.error = "房间地址无效，未切换会话", !1;
  }
  for (const a of f.groups)
    for (const c of a.channels)
      if ((c.endpoint ?? bn(a.endpoint ?? "", `${a.id}__${c.id}`)) === r && (r || c.id === n))
        return Zi({ groupId: a.id, channelId: c.id, roomId: n, endpoint: r }, !0, i);
  const o = "joined_" + crypto.randomUUID(), s = {
    id: o,
    name: r ? "受邀房间" : "本地房间",
    icon: "💬",
    endpoint: r,
    isCustom: !0,
    channels: [{ id: n, name: n, icon: "💬", endpoint: r }]
  };
  return f.groups.push(s), Zi({ groupId: o, channelId: n, roomId: n, endpoint: r }, !0, i) ? (D(fe, JSON.stringify(f.groups)), !0) : (f.groups.pop(), !1);
}
function es() {
  for (const t of f.groups) t.endpoint ??= f.serverUrl;
  const e = yt("lw_chat_session_v1", null);
  if (e && typeof e.endpoint == "string" && typeof e.roomId == "string") {
    const t = f.groups.find((r) => r.id === e.groupId), i = t?.channels.find((r) => r.id === e.channelId);
    if (t && i)
      try {
        const r = Ci(e.endpoint), n = r ? new URL(r).searchParams.get("room") || "default" : e.roomId;
        i.endpoint = r, Object.assign(f, {
          currentGroupId: t.id,
          currentChannelId: i.id,
          currentRoomId: n,
          serverUrl: r,
          messages: Tt(n, r, f.currentUser.uid)
        }), D(fe, JSON.stringify(f.groups));
        return;
      } catch {
      }
  }
  Dt(f.serverUrl, f.currentRoomId), D(fe, JSON.stringify(f.groups));
}
function tc(e) {
  f.friendRequests = f.friendRequests.filter((t) => t.id !== e), D(pn, JSON.stringify(f.friendRequests));
}
function Ri(e, t) {
  const i = f.groups.find((s) => s.id === e), r = i?.channels.find((s) => s.id === t) || i?.channels[0];
  if (!i || !r) return !1;
  const n = r.endpoint !== void 0 ? r.endpoint ? new URL(r.endpoint).searchParams.get("room") || "default" : r.id : `${i.id}__${r.id}`, o = r.endpoint ?? bn(i.endpoint ?? "", n);
  return Zi({ groupId: i.id, channelId: r.id, roomId: n, endpoint: o });
}
function ic(e, t = "👥") {
  const i = e.trim() || "新群组", r = "group_" + Math.random().toString(36).slice(2, 8), n = {
    id: r,
    name: i,
    icon: t,
    channels: [
      { id: "general", name: "综合讨论", icon: "💬" },
      { id: "music", name: "音乐分享", icon: "🎵" },
      { id: "bili", name: "B站动态", icon: "📺" }
    ],
    endpoint: f.serverUrl,
    isCustom: !0
  };
  return f.groups.push(n), D(fe, JSON.stringify(f.groups)), Ri(r, "general"), n;
}
function rc(e) {
  if (f.groups.length <= 1) return;
  const t = f.groups.filter((i) => i.id !== e);
  if (f.currentGroupId === e) {
    const i = t[0];
    if (!i || !Ri(i.id, i.channels[0]?.id || "general")) return;
  }
  f.groups = t, D(fe, JSON.stringify(f.groups));
}
function nc(e, t = "💬") {
  const i = f.groups.find((n) => n.id === f.currentGroupId);
  if (!i) return;
  const r = "ch_" + Math.random().toString(36).slice(2, 6);
  i.channels.push({ id: r, name: e.trim() || "新频道", icon: t }), D(fe, JSON.stringify(f.groups)), Ri(i.id, r);
}
function oc(e, t, i) {
  const r = f.groups.find((n) => n.id === e);
  r && (r.name = t.trim() || r.name, i && (r.icon = i), D(fe, JSON.stringify(f.groups)));
}
function sc(e, t, i, r) {
  const n = f.groups.find((s) => s.id === e);
  if (!n) return;
  const o = n.channels.find((s) => s.id === t);
  o && (o.name = i.trim() || o.name, r && (o.icon = r), D(fe, JSON.stringify(f.groups)));
}
function ac(e, t) {
  const i = f.groups.find((n) => n.id === e);
  if (!i || i.channels.length <= 1) return;
  const r = i.channels.filter((n) => n.id !== t);
  f.currentGroupId === e && f.currentChannelId === t && (!r[0] || !Ri(e, r[0].id)) || (i.channels = r, D(fe, JSON.stringify(f.groups)));
}
const T = (e) => JSON.stringify([e.origin, e.room, e.uid]);
function Ut(e) {
  return typeof e == "string" && /^[A-Za-z0-9_-]{43}$/.test(e);
}
function $t(e) {
  try {
    if (!e || typeof e != "object") throw new Error();
    const t = e;
    if (typeof t.origin != "string" || typeof t.room != "string" || typeof t.uid != "string") throw new Error();
    const i = new URL(t.origin);
    if (!["http:", "https:"].includes(i.protocol) || i.username || i.password || i.pathname !== "/" || i.search || i.hash || !/^[A-Za-z0-9_-]{1,160}$/.test(t.room) || !/^[A-Za-z0-9_-]{1,160}$/.test(t.uid)) throw new Error();
    if (i.protocol === "http:" && !["localhost", "127.0.0.1", "[::1]"].includes(i.hostname)) throw new Error();
    return { origin: i.origin, room: t.room, uid: t.uid };
  } catch {
    throw new Error("聊天室配置无效：公网必须使用 HTTPS；HTTP 仅允许 localhost、127.0.0.1 或 ::1");
  }
}
const dr = "lw_private_chat_v1", v = H({ room: null, diagnostic: "" });
function fr() {
  let e = null, t = "";
  try {
    const i = localStorage.getItem(dr);
    if (i === null) t = "当前浏览器配置中没有保存聊天室连接。请确认使用的是原来的浏览器用户和插件，或重新导入自己的邀请。";
    else
      try {
        e = $t(JSON.parse(i));
      } catch {
        t = "已保存的聊天室配置无效或使用了公网 HTTP，原记录和凭证未删除。请先配置 HTTPS，再按部署指南重新导入匹配当前聊天 ID 的邀请。";
      }
  } catch {
    t = "无法读取本机存储，请检查浏览器是否限制存储访问。";
  }
  v.diagnostic = t, JSON.stringify(e) !== JSON.stringify(v.room) && (v.room = e);
}
fr();
window.addEventListener("storage", (e) => {
  (e.key === dr || e.key === null) && fr();
});
window.addEventListener("focus", fr);
const ts = Ie(() => !!v.room);
function vn(e) {
  return e.origin.replace(/^http:/, "ws:").replace(/^https:/, "wss:") + "/ws?room=" + encodeURIComponent(e.room);
}
function is(e) {
  const t = $t(e);
  localStorage.setItem(dr, JSON.stringify(t)), v.diagnostic = "", v.room = t;
}
const mr = we(0), Y = we(""), pr = /* @__PURE__ */ new Map();
let Wi;
function ct() {
  return Wi ||= new Promise((e, t) => {
    const i = indexedDB.open("lw-chat-delivery", 1);
    i.onupgradeneeded = () => {
      i.result.createObjectStore("deliveries", { keyPath: ["scope", "id", "uid"] }).createIndex("scope", "scope");
    }, i.onsuccess = () => {
      i.result.onversionchange = () => {
        i.result.close(), Wi = void 0;
      }, e(i.result);
    }, i.onerror = () => t(i.error), i.onblocked = () => {
      Y.value = "发送队列被旧窗口阻塞，请关闭旧窗口后重试。";
    };
  }).catch((e) => {
    throw Wi = void 0, e;
  });
}
async function rs(e) {
  const t = await ct();
  return new Promise((i, r) => {
    const n = t.transaction("deliveries", "readonly"), o = n.objectStore("deliveries").index("scope").getAll(e);
    n.oncomplete = () => i(o.result), n.onabort = () => r(n.error), o.onerror = () => r(o.error);
  });
}
let Nr = Promise.resolve();
function Bt(e) {
  const t = Nr.then(e);
  return Nr = t.catch(() => {
  }), t;
}
async function lt(e) {
  try {
    const t = /* @__PURE__ */ new Map();
    for (const i of await rs(e)) {
      const r = t.get(i.id) || [];
      r.push(i), t.set(i.id, r);
    }
    pr.set(e, t), mr.value++;
  } catch {
    Y.value = "无法读取发送确认记录，请检查浏览器存储。";
  }
}
function ns(e, t) {
  mr.value;
  const i = pr.get(e)?.get(t) || [];
  if (!i.length) return "none";
  const r = i.filter((n) => !n.received);
  return r.length ? r.some((n) => n.failure === "rejected" || n.failure === "paused" || n.attempts >= 5 && (n.failure === "unconfirmed" || Date.now() - n.lastAttempt > 15e3)) ? "failed" : "sending" : "stored";
}
function cc(e, t) {
  mr.value;
  const i = pr.get(e)?.get(t) || [];
  if (!i.length) return "无送达确认";
  const r = i.filter((o) => o.received).length;
  return r === i.length ? i.every((o) => o.uid === "private-relay-server") ? "服务器已保存（不代表对方已读）" : `对方已接收 ${r}/${i.length}（非已读）` : i.filter((o) => !o.received).some((o) => o.failure === "rejected") ? "服务器拒绝此次发送，可在消息详情中重试；不代表此前尝试一定未保存" : ns(e, t) === "failed" ? "尚未获得保存确认，自动补发已暂停；不代表一定未送达，可在消息详情中重试" : "正在发送／等待保存确认，将按原目标房间补发；请勿重复发送";
}
async function Sn(e, t, i) {
  await Bt(async () => {
    const r = await ct();
    await new Promise((n, o) => {
      const s = r.transaction("deliveries", "readwrite"), a = s.objectStore("deliveries");
      for (const c of new Set(i)) {
        const u = a.get([e, t.id, c]);
        u.onsuccess = () => {
          if (u.result?.received) return;
          const d = { scope: e, id: t.id, uid: c, message: JSON.parse(JSON.stringify(t)), attempts: 0, lastAttempt: 0, received: !1 };
          a.put(d);
        };
      }
      s.oncomplete = () => n(), s.onabort = () => o(s.error), s.onerror = () => o(s.error);
    }), await lt(e);
  });
}
async function lc(e, t) {
  try {
    await Bt(async () => {
      const i = await ct();
      await new Promise((r, n) => {
        const o = i.transaction("deliveries", "readwrite"), s = o.objectStore("deliveries").index("scope").openCursor(e);
        s.onsuccess = () => {
          const a = s.result;
          if (!a) return;
          const c = a.value;
          c.id === t && !c.received && a.update({ ...c, attempts: 5, failure: "paused" }), a.continue();
        }, o.oncomplete = () => r(), o.onabort = () => n(o.error), o.onerror = () => n(o.error);
      }), await lt(e);
    });
  } catch {
    Y.value = "暂停补发未能保存，请检查存储；已发出的消息无法撤回。";
  }
}
async function os(e, t, i) {
  return An(e, [t], i);
}
async function An(e, t, i) {
  t.length && await Bt(async () => {
    const r = await ct();
    await new Promise((n, o) => {
      const s = r.transaction("deliveries", "readwrite"), a = s.objectStore("deliveries");
      for (const c of new Set(t)) {
        const u = a.get([e, c, i]);
        u.onsuccess = () => {
          u.result && a.put({ ...u.result, received: !0, failure: void 0, message: void 0 });
        };
      }
      s.oncomplete = () => n(), s.onabort = () => o(s.error), s.onerror = () => o(s.error);
    }), await lt(e);
  });
}
async function xr(e, t, i, r = !1, n, o = !1) {
  await Bt(async () => {
    const s = await ct();
    await new Promise((a, c) => {
      const u = s.transaction("deliveries", "readwrite"), d = u.objectStore("deliveries"), h = d.get([e, t, i]);
      h.onsuccess = () => {
        const m = h.result;
        m && !m.received && (n === void 0 || m.lastAttempt === n) && d.put({
          ...m,
          attempts: r || o ? 5 : m.attempts,
          failure: o ? "paused" : r ? "rejected" : m.failure === "paused" ? "paused" : "unconfirmed"
        });
      }, u.oncomplete = () => a(), u.onerror = u.onabort = () => c(u.error);
    }), await lt(e);
  });
}
async function ss(e, t, i, r, n = 4, o = () => !0) {
  await Bt(async () => {
    const s = await ct(), a = [];
    await new Promise((c, u) => {
      const d = s.transaction("deliveries", "readwrite"), h = d.objectStore("deliveries").index("scope").openCursor(e);
      h.onsuccess = () => {
        const m = h.result;
        if (!m || a.length >= n || !i()) return;
        const g = m.value;
        if (!g.received && g.message && g.attempts < 5 && Date.now() - g.lastAttempt >= 1e4 && t.includes(g.uid)) {
          if (!o(g.message)) {
            m.update({ ...g, attempts: 5, failure: "paused" }), m.continue();
            return;
          }
          const w = { ...g, attempts: g.attempts + 1, lastAttempt: Date.now(), failure: void 0 };
          m.update(w), a.push(w);
        }
        m.continue();
      }, d.oncomplete = () => c(), d.onabort = () => u(d.error), d.onerror = () => u(d.error);
    });
    for (const c of a) i() && r(c.uid, c.message, c.lastAttempt);
    await lt(e);
  });
}
function ke(e, t) {
  const i = new AbortController(), r = () => i.abort(e?.reason);
  e?.aborted ? r() : e?.addEventListener("abort", r, { once: !0 });
  const n = setTimeout(() => i.abort(new DOMException("视频加载超时，请手动重试", "TimeoutError")), t);
  return { signal: i.signal, dispose() {
    clearTimeout(n), e?.removeEventListener("abort", r), i.abort();
  } };
}
class as {
  start() {
    return this.cancel(), this.controller = new AbortController(), this.controller.signal;
  }
  cancel() {
    this.controller?.abort();
  }
}
function ji(e) {
  return Array.isArray(e) ? e.flatMap((t) => {
    const i = typeof t == "string" ? t : t?.img_src;
    if (typeof i != "string" || !i.trim()) return [];
    try {
      const r = new URL(i.trim().replace(/^http:/i, "https:").replace(/^\/\//, "https://"));
      return r.protocol === "https:" && !r.username && !r.password ? [r.href] : [];
    } catch {
      return [];
    }
  }) : [];
}
function cs(e) {
  function t(g, w) {
    return g << w | g >>> 32 - w;
  }
  const i = [7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21], r = new Array(64).fill(0).map((g, w) => Math.floor(Math.abs(Math.sin(w + 1)) * 2 ** 32)), n = new TextEncoder().encode(e), o = n.length * 8, s = new Uint8Array((Math.floor((n.length + 8) / 64) + 1) * 64);
  s.set(n), s[n.length] = 128;
  const a = new DataView(s.buffer);
  a.setUint32(s.length - 8, o >>> 0, !0), a.setUint32(s.length - 4, Math.floor(o / 4294967296), !0);
  let c = 1732584193, u = 4023233417, d = 2562383102, h = 271733878;
  for (let g = 0; g < s.length; g += 64) {
    const w = new Array(16);
    for (let _ = 0; _ < 16; _++) w[_] = a.getUint32(g + _ * 4, !0);
    let b = c, S = u, y = d, k = h;
    for (let _ = 0; _ < 64; _++) {
      let K, O;
      _ < 16 ? (K = S & y | ~S & k, O = _) : _ < 32 ? (K = k & S | ~k & y, O = (5 * _ + 1) % 16) : _ < 48 ? (K = S ^ y ^ k, O = (3 * _ + 5) % 16) : (K = y ^ (S | ~k), O = 7 * _ % 16);
      const W = K + b + r[_] + w[O] >>> 0;
      b = k, k = y, y = S, S = S + t(W, i[_]) >>> 0;
    }
    c = c + b >>> 0, u = u + S >>> 0, d = d + y >>> 0, h = h + k >>> 0;
  }
  function m(g) {
    let w = "";
    for (let b = 0; b < 4; b++) w += (g >>> b * 8 & 255).toString(16).padStart(2, "0");
    return w;
  }
  return m(c) + m(u) + m(d) + m(h);
}
const ls = [
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
function Fi(e, t, i) {
  const r = ls.map((u) => (t + i)[u]).join("").slice(0, 32), n = Math.round(Date.now() / 1e3), o = { ...e, wts: n }, a = Object.keys(o).sort().map((u) => encodeURIComponent(u) + "=" + encodeURIComponent(String(o[u]).replace(/[!'()*]/g, ""))).join("&"), c = cs(a + r);
  return {
    signedQuery: `${a}&w_rid=${c}`,
    w_rid: c,
    wts: n
  };
}
function Lr(e) {
  const t = Number(e);
  return t >= 120 ? "4K" : t === 116 ? "1080P60" : t === 112 ? "1080P+" : t === 80 ? "1080P" : t === 74 ? "720P60" : t === 64 ? "720P" : t === 32 ? "480P" : t === 16 ? "360P" : t > 0 ? `${t}P` : "清晰度";
}
function uc(e, t = "") {
  if (t && typeof t == "string" && t.trim()) return t.trim();
  const i = Number(e);
  return i >= 120 ? "超清 4K" : i === 116 ? "高清 1080P 60帧" : i === 112 ? "高清 1080P+ 高码率" : i === 80 ? "高清 1080P" : i === 74 ? "高码率 720P 60帧" : i === 64 ? "高清 720P" : i === 32 ? "清晰 480P" : i === 16 ? "流畅 360P" : `${i}P`;
}
class We {
  constructor() {
  }
  static getInstance() {
    return We.instance || (We.instance = new We()), We.instance;
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
          const i = JSON.parse(t);
          if (i?.children) return i;
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
        const i = await chrome.storage.local.get("foCollapsedGroupsV1");
        Array.isArray(i?.foCollapsedGroupsV1) && (t = i.foCollapsedGroupsV1.map(String));
      } catch {
      }
    if (!t.length && typeof localStorage < "u")
      try {
        const i = localStorage.getItem("foCollapsedGroupsV1");
        if (i) {
          const r = JSON.parse(i);
          Array.isArray(r) && (t = r.map(String));
        }
      } catch {
      }
    return new Set(t);
  }
  async saveCollapsedGroups(t) {
    const i = Array.from(t);
    if (typeof chrome < "u" && chrome.storage?.local)
      try {
        await chrome.storage.local.set({ foCollapsedGroupsV1: i });
      } catch {
      }
    if (typeof localStorage < "u")
      try {
        localStorage.setItem("foCollapsedGroupsV1", JSON.stringify(i));
      } catch {
      }
  }
  findNode(t, i) {
    if (!t) return null;
    if (String(t.id) === String(i)) return t;
    for (const r of t.children || []) {
      const n = this.findNode(r, i);
      if (n) return n;
    }
    return null;
  }
  findParent(t, i) {
    if (!t) return null;
    for (const r of t.children || []) {
      if (String(r.id) === String(i)) return t;
      const n = this.findParent(r, i);
      if (n) return n;
    }
    return null;
  }
  removeNodeById(t, i) {
    if (!t?.children) return !1;
    const r = t.children.findIndex((n) => String(n.id) === String(i));
    if (r >= 0)
      return t.children.splice(r, 1), !0;
    for (const n of t.children)
      if (this.removeNodeById(n, i)) return !0;
    return !1;
  }
  isDescendant(t, i) {
    if (!t) return !1;
    if (String(t.id) === String(i)) return !0;
    for (const r of t.children || [])
      if (this.isDescendant(r, i)) return !0;
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
  unwrapGroup(t, i) {
    const r = this.findParent(t, i) || t, n = (r.children || []).findIndex((s) => String(s.id) === String(i));
    if (n < 0) return !1;
    const o = r.children[n];
    return r.children.splice(n, 1, ...o.children || []), !0;
  }
  moveNode(t, i, r, n, o) {
    let s = this.findNode(t, i);
    s || (s = { id: String(i), type: "fav", name: o || "收藏夹", children: [] });
    const a = String(r) === "root" ? t : this.findNode(t, r);
    if (!s || !a || s === a || s.type === "folder" && this.isDescendant(s, a.id))
      return !1;
    if (this.removeNodeById(t, s.id), a === t || n === "into" && a.type === "folder")
      Array.isArray(a.children) || (a.children = []), a.children.push(s);
    else {
      const c = this.findParent(t, a.id) || t;
      Array.isArray(c.children) || (c.children = []);
      const u = Math.max(0, c.children.findIndex((d) => String(d.id) === String(a.id)));
      c.children.splice(u + (n === "after" ? 1 : 0), 0, s);
    }
    return !0;
  }
  syncTreeWithFolders(t, i) {
    let r = !1;
    const n = /* @__PURE__ */ new Map();
    for (const c of i)
      n.set(String(c.id || c.fid), c);
    const o = (c) => {
      if (c.children)
        for (let u = c.children.length - 1; u >= 0; u--) {
          const d = c.children[u];
          if (d.type === "fav")
            if (!n.has(String(d.id)))
              c.children.splice(u, 1), r = !0;
            else {
              const h = n.get(String(d.id));
              h?.title && d.name !== h.title && (d.name = h.title, r = !0);
            }
          else
            o(d);
        }
    };
    o(t);
    const s = /* @__PURE__ */ new Set(), a = (c) => {
      for (const u of c.children || [])
        u.type === "fav" ? s.add(String(u.id)) : a(u);
    };
    a(t), t.children || (t.children = []);
    for (const c of i) {
      const u = String(c.id || c.fid);
      s.has(u) || (t.children.push({
        id: u,
        type: "fav",
        name: c.title || "未命名收藏夹",
        children: []
      }), r = !0);
    }
    return r;
  }
  flattenTree(t, i, r, n) {
    const o = new Map((i || []).map((d) => [String(d.id || d.fid), d])), s = [], a = /* @__PURE__ */ new Set(), c = (d) => (d.children || []).reduce(
      (h, m) => h + (m.type === "fav" ? 1 : c(m)),
      0
    ), u = (d, h = 0) => {
      for (const m of d.children || []) {
        const g = String(m.id), w = o.get(g), b = m.type === "folder";
        b || a.add(g);
        const S = b && r.has(g), y = !b && g === String(n);
        s.push({
          id: g,
          title: String(m.name || w?.title || "未命名收藏夹"),
          count: Number(b ? c(m) : w?.media_count || 0),
          kind: w?.isCollected ? "collected" : w?.isOther ? "other" : "created",
          depth: h,
          group: b,
          collapsed: S,
          selected: y,
          writable: !b && !w?.isCollected && !w?.isOther
        }), b && !S && u(m, h + 1);
      }
    };
    u(t, 0);
    for (const d of i || []) {
      const h = String(d.id || d.fid);
      s.some((m) => !m.group && m.id === h) || !d.isCollected && !d.isOther && a.has(h) || s.push({
        id: h,
        title: d.title || "未命名收藏",
        count: Number(d.media_count || 0),
        kind: d.isCollected ? "collected" : d.isOther ? "other" : "created",
        depth: 0,
        group: !1,
        collapsed: !1,
        selected: h === String(n),
        writable: !d.isCollected && !d.isOther
      });
    }
    return s;
  }
}
class et {
  constructor() {
    this.currentUser = null, this.writeQueue = Promise.resolve(), this.lastWriteTime = 0, this.wbiKeysCache = null, this.treeManager = We.getInstance();
  }
  static getInstance() {
    return et.instance || (et.instance = new et()), et.instance;
  }
  /**
   * 底层 B站 API 请求器 (携带凭据与跨域支持)
   */
  async api(t, i = {}) {
    const r = await fetch(t, {
      ...i,
      credentials: "include",
      headers: {
        Accept: "application/json",
        ...i.headers || {}
      }
    });
    if (!r.ok)
      throw Object.assign(new Error(`Bilibili API 请求失败 [${r.status}]: ${r.statusText}`), { status: r.status });
    const n = await r.json();
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
          const i = await chrome.cookies.get({ url: t, name: "bili_jct" });
          if (i?.value) return i.value;
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
  async enqueueWrite(t, i = 650) {
    const r = async () => {
      const o = Date.now() - this.lastWriteTime;
      o < i && await new Promise((s) => setTimeout(s, i - o));
      try {
        const s = await t();
        return this.lastWriteTime = Date.now(), s;
      } catch (s) {
        throw this.lastWriteTime = Date.now(), s;
      }
    }, n = this.writeQueue.then(r, r);
    return this.writeQueue = n.catch(() => {
    }), n;
  }
  formatBiliApiError(t, i) {
    return t === 11007 || t === -412 ? "操作过于频繁，请稍候再试" : t === -101 ? "账号未登录或登录态已失效" : t === 11002 ? "视频已存在于目标收藏夹" : t === 11003 ? "收藏夹不存在或已被删除" : i || `B站接口返回错误码 ${t}`;
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
    let i = t;
    if (i || (this.currentUser || await this.getUserNav(), i = this.currentUser?.mid), !i) throw new Error("无法获取 B 站用户 MID，请先登录");
    return (await this.api(
      `https://api.bilibili.com/x/v3/fav/folder/created/list-all?up_mid=${i}&type=0`
    ))?.list || [];
  }
  /**
   * 获取用户订阅/收藏的公开收藏夹及合集
   */
  async getCollectedFolders(t = 1, i = 50, r) {
    let n = r;
    n || (this.currentUser || await this.getUserNav(), n = this.currentUser?.mid);
    const o = await this.api(
      `https://api.bilibili.com/x/v3/fav/folder/collected/list?pn=${t}&ps=${i}&up_mid=${n || ""}&platform=web`
    ), a = (o?.list || []).map((c) => ({
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
      count: Number(o?.count || a.length),
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
  async getWatchHistory(t = 1, i = 24) {
    const r = await this.api(`https://api.bilibili.com/x/v2/history?pn=${t}&ps=${i}`), o = (Array.isArray(r) ? r : r?.list || []).map((s) => ({
      id: s.aid || s.history?.oid || s.id,
      type: 2,
      title: s.title || s.tag_name || "视频记录",
      cover: (s.pic || "").replace(/^http:/, "https:"),
      duration: s.duration || 0,
      upper: s.owner ? { mid: s.owner.mid, name: s.owner.name, face: s.owner.face } : s.author ? { mid: s.mid || 0, name: s.author, face: "" } : void 0,
      cnt_info: {
        play: s.stat?.view || 0,
        danmaku: s.stat?.danmaku || 0,
        collect: s.stat?.favorite || 0
      },
      bvid: s.bvid || s.history?.bvid || "",
      fav_time: s.view_at || s.progress
    }));
    return { medias: o, total: Number(r?.total || o.length) };
  }
  /**
   * 读取稍后再看列表
   */
  async getToViewVideos() {
    const t = await this.api("https://api.bilibili.com/x/v2/history/toview"), r = (t?.list || []).map((n) => ({
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
    return { medias: r, total: Number(t?.count || r.length) };
  }
  /**
   * 读取我的追番列表
   */
  async getBangumiFollows(t = 1, i = 24, r) {
    let n = r;
    n || (this.currentUser || await this.getUserNav(), n = this.currentUser?.mid);
    const o = await this.api(
      `https://api.bilibili.com/x/space/bangumi/follow/list?type=1&follow_status=0&pn=${t}&ps=${i}&vmid=${n || ""}`
    ), a = (o?.list || []).map((c) => ({
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
    return { medias: a, total: Number(o?.total || a.length) };
  }
  /**
   * 读取合集/系列视频
   */
  async getSeasonVideos(t, i = 1, r = 24) {
    const n = await this.api(
      `https://api.bilibili.com/x/space/fav/season/list?season_id=${t}&pn=${i}&ps=${r}&platform=web`
    ), o = n?.medias || [];
    return {
      medias: o,
      total: Number(n?.info?.media_count || o.length)
    };
  }
  /**
   * 统一分页获取视频资源列表 (自动适配自建/合集/稍后再看/追番)
   */
  async getFolderVideos(t, i = 1, r = 20, n = "mtime", o = "") {
    const s = String(t);
    if (s === "__history__") {
      const m = await this.getWatchHistory(i, r);
      let g = m.medias;
      if (o.trim()) {
        const w = o.toLowerCase();
        g = g.filter((b) => b.title.toLowerCase().includes(w) || b.upper?.name && b.upper.name.toLowerCase().includes(w));
      }
      return {
        info: { title: "播放历史", media_count: m.total },
        medias: g,
        hasMore: i * r < m.total,
        total: m.total
      };
    }
    if (s === "__toview__") {
      const m = await this.getToViewVideos();
      let g = m.medias;
      if (o.trim()) {
        const w = o.toLowerCase();
        g = g.filter((b) => b.title.toLowerCase().includes(w) || b.upper?.name && b.upper.name.toLowerCase().includes(w));
      }
      return {
        info: { title: "稍后再看", media_count: m.total },
        medias: g.slice((i - 1) * r, i * r),
        hasMore: i * r < g.length,
        total: g.length
      };
    }
    if (s === "__bangumi__") {
      const m = await this.getBangumiFollows(i, r);
      return {
        info: { title: "我的追番", media_count: m.total },
        medias: m.medias,
        hasMore: i * r < m.total,
        total: m.total
      };
    }
    if (s.startsWith("season:")) {
      const m = s.replace("season:", ""), g = await this.getSeasonVideos(m, i, r);
      return {
        info: { title: "合集内容", media_count: g.total },
        medias: g.medias,
        hasMore: i * r < g.total,
        total: g.total
      };
    }
    let a = `https://api.bilibili.com/x/v3/fav/resource/list?media_id=${t}&pn=${i}&ps=${r}&order=${n}&platform=web`;
    o.trim() && (a += `&keyword=${encodeURIComponent(o.trim())}`);
    const c = await this.api(a), u = c?.medias || [], d = !!c?.has_more, h = Number(c?.info?.media_count || u.length);
    return {
      info: c?.info,
      medias: u,
      hasMore: d,
      total: h
    };
  }
  /**
   * 在 B站 创建新的收藏夹
   */
  async createRemoteFolder(t, i = 0) {
    const r = await this.getBiliJct();
    if (!r) return { ok: !1, reason: "没有取得 B站 CSRF 登录凭据，请先重新登录 B站" };
    try {
      const n = new URLSearchParams({ title: t, intro: "", privacy: String(i === 0 ? 0 : 1), csrf: r }), o = await fetch("https://api.bilibili.com/x/v3/fav/folder/add", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        },
        body: n.toString()
      }), s = await o.json().catch(() => ({}));
      return s?.code === 0 && s.data ? { ok: !0, folder: s.data } : { ok: !1, reason: s?.message || `B站接口 ${s?.code ?? o.status}` };
    } catch (n) {
      return { ok: !1, reason: n?.message || "创建 B站收藏夹失败" };
    }
  }
  /**
   * 移动视频至其他收藏夹 (单项或批量)
   */
  async moveVideo(t, i, r, n) {
    return this.enqueueWrite(async () => {
      const o = await this.getBiliJct();
      if (!o) return { ok: !1, reason: "取不到 csrf（bili_jct）" };
      try {
        const s = Array.isArray(r) ? r.map((d) => String(d).includes(":") ? String(d) : `${d}:2`).join(",") : String(r).includes(":") ? String(r) : `${r}:2`, a = new URLSearchParams({
          src_media_id: String(t),
          tar_media_id: String(i),
          mid: String(n || this.currentUser?.mid || ""),
          resources: s,
          platform: "web",
          csrf: o
        }), u = await (await fetch("https://api.bilibili.com/x/v3/fav/resource/move", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json"
          },
          body: a.toString()
        })).json();
        return u.code === 0 ? { ok: !0 } : { ok: !1, code: u.code, reason: this.formatBiliApiError(u.code, u.message) };
      } catch (s) {
        return { ok: !1, reason: s.message || "移动视频失败" };
      }
    });
  }
  /**
   * 从收藏夹删除视频 (取消收藏)
   */
  async deleteVideo(t, i, r = 2) {
    return this.enqueueWrite(async () => {
      let n = 0;
      for (; ; ) {
        n++;
        const o = await this.getBiliJct();
        if (!o) return { ok: !1, reason: "取不到 csrf（bili_jct）" };
        try {
          const s = new URLSearchParams({
            csrf: o,
            rid: String(i),
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
            body: s.toString()
          })).json();
          if (c.code === 0) return { ok: !0 };
          if ((c.code === 11007 || c.code === -412 || /频繁|稍后|频率/.test(c.message || "")) && n <= r) {
            await new Promise((d) => setTimeout(d, 850 * n));
            continue;
          }
          return { ok: !1, code: c.code, reason: this.formatBiliApiError(c.code, c.message) };
        } catch (s) {
          if (n <= r) {
            await new Promise((a) => setTimeout(a, 600));
            continue;
          }
          return { ok: !1, reason: s.message };
        }
      }
    });
  }
  /**
   * 添加视频到收藏夹
   */
  async addVideoToFavorite(t, i) {
    return this.enqueueWrite(async () => {
      const r = await this.getBiliJct();
      if (!r) return { ok: !1, reason: "取不到 csrf（bili_jct）" };
      try {
        const n = new URLSearchParams({
          rid: String(i),
          type: "2",
          add_media_ids: String(t),
          del_media_ids: "",
          platform: "web",
          csrf: r
        }), s = await (await fetch("https://api.bilibili.com/x/v3/fav/resource/deal", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json"
          },
          body: n.toString()
        })).json();
        return s.code === 0 ? { ok: !0 } : { ok: !1, code: s.code, reason: this.formatBiliApiError(s.code, s.message) };
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
  async getPlayUrl(t, i) {
    return this.api(
      `https://api.bilibili.com/x/player/wbi/playurl?bvid=${encodeURIComponent(t)}&cid=${i}&qn=64&fnval=1`
    );
  }
  /**
   * 获取视频外挂字幕或 AI 智能字幕列表
   */
  async getVideoSubtitles(t, i) {
    return (await this.api(
      `https://api.bilibili.com/x/player/v2?bvid=${encodeURIComponent(t)}&cid=${i}`
    ))?.subtitle?.subtitles || [];
  }
  /**
   * 获取并缓存 Wbi 签名密钥
   */
  async getWbiKeys(t) {
    t?.throwIfAborted();
    const i = Date.now();
    if (this.wbiKeysCache && this.wbiKeysCache.expire > i)
      return { ik: this.wbiKeysCache.ik, sk: this.wbiKeysCache.sk };
    const r = await this.api("https://api.bilibili.com/x/web-interface/nav", { signal: t });
    t?.throwIfAborted();
    const n = r?.wbi_img?.img_url?.split("/").pop()?.split(".")[0] || "", o = r?.wbi_img?.sub_url?.split("/").pop()?.split(".")[0] || "";
    if (!n || !o)
      throw new Error("无法获取 B 站 WBI 鉴权密钥");
    return this.wbiKeysCache = { ik: n, sk: o, expire: i + 3600 * 1e3 }, { ik: n, sk: o };
  }
  /**
   * 获取指定清晰度的视频/音频直链播放流 (支持逐级清晰度自动降阶重试与 WBI 签名直链备用获取)
   */
  async fetchPlayStream(t, i, r = 64, n) {
    const o = ke(n, 18e3), s = o.signal, a = async (u) => {
      s.throwIfAborted();
      const d = ke(s, 5e3);
      try {
        return await this.api(u, { signal: d.signal });
      } finally {
        d.dispose();
      }
    }, c = (u) => {
      if (s.throwIfAborted(), [401, 403, 412, 429].includes(u?.status) || [-101, -111, -352, -412].includes(u?.code) || u?.name === "TimeoutError" || u?.name === "AbortError" || u instanceof TypeError) throw u;
    };
    try {
      s.throwIfAborted();
      const u = Array.from(/* @__PURE__ */ new Set([r, 64, 32, 16]));
      let d = null, h = [], m = r;
      const g = (w) => {
        if (!w) return [];
        const b = Array.isArray(w.durl) ? w.durl : Array.isArray(w.result?.durl) ? w.result.durl : [], S = [];
        for (const y of b.slice(0, 1))
          if (y?.url && S.push(String(y.url)), Array.isArray(y?.backup_url))
            for (const k of y.backup_url)
              k && S.push(String(k));
        return Array.from(new Set(S.filter(Boolean).map((y) => y.replace(/^http:/, "https:")))).filter((y) => {
          try {
            const k = new URL(y);
            return k.protocol === "https:" && !k.username && !k.password;
          } catch {
            return !1;
          }
        });
      };
      for (const w of u)
        try {
          const b = t ? `bvid=${encodeURIComponent(t)}` : "", S = await a(
            `https://api.bilibili.com/x/player/playurl?${b}&cid=${i}&qn=${w}&fnval=1&fourk=0&platform=html5&high_quality=1`
          ), y = g(S);
          if (y.length > 0) {
            d = S, h = y, m = Number(S?.quality || w);
            break;
          }
        } catch (b) {
          c(b);
        }
      if (!h.length)
        for (const w of Array.from(/* @__PURE__ */ new Set([r, 64, 32])))
          try {
            const b = ke(s, 5e3);
            let S;
            try {
              S = await this.getWbiKeys(b.signal);
            } finally {
              b.dispose();
            }
            const { ik: y, sk: k } = S, _ = { cid: i, qn: w, fnval: 1, fourk: 0 };
            t && (_.bvid = t);
            const { signedQuery: K } = Fi(_, y, k), O = await a(
              `https://api.bilibili.com/x/player/wbi/playurl?${K}`
            ), W = g(O);
            if (W.length > 0) {
              d = O, h = W, m = Number(O?.quality || w);
              break;
            }
          } catch (b) {
            c(b);
          }
      if (!h.length)
        throw new Error("未能获取到有效视频直链播放流");
      return {
        sources: h,
        quality: m,
        acceptQuality: d?.accept_quality || [80, 64, 32, 16],
        acceptDescription: d?.accept_description || ["1080P 高清", "720P 高清", "480P 清晰", "360P 流畅"]
      };
    } finally {
      o.dispose();
    }
  }
  /**
   * 获取音频流：优先提取 DASH 纯音频流 (M4A，体积仅 ~3MB，彻底消除视频冗余与限速)，若无纯音频则降级至 360P 流畅视频流 (极小体积保底)
   */
  async fetchAudioStream(t, i, r) {
    const n = ke(r, 18e3), o = n.signal, s = async (u) => {
      o.throwIfAborted();
      const d = ke(o, 5e3);
      try {
        return await this.api(u, { signal: d.signal });
      } finally {
        d.dispose();
      }
    }, a = (u) => {
      if (o.throwIfAborted(), [401, 403, 412, 429].includes(u?.status) || [-101, -111, -352, -412].includes(u?.code) || u?.name === "TimeoutError" || u?.name === "AbortError" || u instanceof TypeError) throw u;
    }, c = (u) => {
      const d = u?.dash || u?.result?.dash, h = Array.isArray(d?.audio) ? d.audio : [];
      if (!h.length) return [];
      const m = [...h].sort((w, b) => Number(b?.id || 0) - Number(w?.id || 0)), g = [];
      for (const w of m) {
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
      o.throwIfAborted();
      try {
        const d = t ? `bvid=${encodeURIComponent(t)}` : "", h = await s(
          `https://api.bilibili.com/x/player/playurl?${d}&cid=${i}&qn=16&fnval=16&fourk=0&platform=html5`
        ), m = c(h);
        if (m.length > 0)
          return { sources: m, isPureAudio: !0 };
      } catch (d) {
        a(d);
      }
      try {
        const d = ke(o, 5e3);
        let h;
        try {
          h = await this.getWbiKeys(d.signal);
        } finally {
          d.dispose();
        }
        const { ik: m, sk: g } = h, w = { cid: i, qn: 16, fnval: 16, fourk: 0 };
        t && (w.bvid = t);
        const { signedQuery: b } = Fi(w, m, g), S = await s(`https://api.bilibili.com/x/player/wbi/playurl?${b}`), y = c(S);
        if (y.length > 0)
          return { sources: y, isPureAudio: !0 };
      } catch (d) {
        a(d);
      }
      return { sources: (await this.fetchPlayStream(t, i, 16, o)).sources, isPureAudio: !1 };
    } finally {
      n.dispose();
    }
  }
  /**
   * 现代化多源视频流与分P信息自洽解析
   */
  async resolvePlayStream(t, i = 1, r) {
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
    const n = String(t.bvid || "").trim(), o = String(t.aid || "").trim(), s = n.startsWith("BV") ? n : "", a = o.replace(/^av/i, "") || (n.startsWith("BV") ? "" : n.replace(/^av/i, "")), c = s ? `bvid=${encodeURIComponent(s)}` : `aid=${encodeURIComponent(a)}`, u = ke(r, 2e4), d = u.signal;
    try {
      d.throwIfAborted();
      const h = t.cid && s && i === 1 ? this.fetchPlayStream(s, t.cid, Number(t.preferredQuality || 64), d).then((P) => ({ value: P, error: null }), (P) => ({ value: null, error: P })) : null;
      let m = null;
      try {
        const P = ke(d, 6e3);
        try {
          m = await this.api(`https://api.bilibili.com/x/web-interface/view?${c}`, { signal: P.signal });
        } finally {
          P.dispose();
        }
      } catch {
        d.throwIfAborted();
      }
      const g = m?.bvid || "", w = g.startsWith("BV") ? g : s || "", S = (Array.isArray(m?.pages) ? m.pages : []).map((P) => ({
        cid: P.cid,
        page: P.page,
        part: P.part || `第${P.page}集`,
        duration: P.duration || 0
      })), y = S.findIndex((P) => P.page === i), k = y >= 0 ? S[y] : S[0] || null, _ = k?.cid || m?.cid || t.cid;
      if (!_)
        throw new Error("无法获取视频 CID 标识");
      const K = Number(t.preferredQuality || 64), O = h && String(_) === String(t.cid) ? await h : null;
      d.throwIfAborted();
      const W = O && String(_) === String(t.cid) ? O.value || (() => {
        throw O.error;
      })() : await this.fetchPlayStream(w, _, K, d);
      return {
        title: m?.title || t.title || w,
        poster: String(m?.pic || t.cover || "").replace(/^http:/, "https:"),
        sources: W.sources,
        aid: m?.aid || t.aid || null,
        bvid: w,
        cid: _ || null,
        owner: m?.owner?.name || t.owner || t.author || "UP主",
        ownerFace: m?.owner?.face ? String(m.owner.face).replace(/^http:/, "https:") : t.ownerFace || t.face || "",
        ownerMid: m?.owner?.mid || null,
        pubdate: m?.pubdate || 0,
        desc: m?.desc || t.desc || "暂无简介",
        views: m?.stat?.view || t.views || 0,
        danmaku: m?.stat?.danmaku || t.danmaku || 0,
        likes: m?.stat?.like || t.likes || 0,
        currentQuality: W.quality,
        acceptQuality: W.acceptQuality,
        acceptDescription: W.acceptDescription,
        pages: S,
        currentPage: k?.page || 1,
        partTitle: k?.part || ""
      };
    } finally {
      u.dispose();
    }
  }
  /**
   * 纯数据拉取并深度解析视频字幕轨道 (支持 WBI 签名鉴权与多语言挑选)
   */
  async fetchVideoSubtitleDetails(t, i, r) {
    r?.throwIfAborted();
    const n = await this.api(`https://api.bilibili.com/x/web-interface/view?bvid=${encodeURIComponent(t)}`, { signal: r });
    if (r?.throwIfAborted(), r && !n?.cid) throw new Error("无法读取视频详情，请重试");
    if (!n?.cid) return { ok: !1, reason: "视频不存在或未登录", cues: [] };
    const o = Array.isArray(n?.pages) ? n.pages : [], s = i ? o.find((E) => E.cid === i) : null, a = i || n.cid, c = s?.part ? ` · P${s.page} ${s.part}` : "", { ik: u, sk: d } = await this.getWbiKeys(r);
    r?.throwIfAborted();
    const { signedQuery: h } = Fi({ bvid: t, cid: a }, u, d), m = await this.api(`https://api.bilibili.com/x/player/wbi/v2?${h}`, { signal: r });
    if (r?.throwIfAborted(), r && !Array.isArray(m?.subtitle?.subtitles)) throw new Error("字幕轨道返回异常或当前账号无权读取");
    const g = m?.subtitle?.subtitles || [];
    if (!g.length)
      return { ok: !1, reason: `该视频${c ? "（" + c.trim() + "）" : ""}没有可用字幕`, cues: [] };
    const w = g.find((E) => /zh|中文|汉语|漢語/i.test((E.lan || "") + " " + (E.lan_doc || ""))) || g[0], b = w.subtitle_url || "", S = b.startsWith("//") ? `https:${b}` : b.startsWith("http") ? b : `https://${b}`, y = await fetch(S, { signal: r, credentials: "include", headers: { Accept: "application/json" } });
    if (!y.ok) throw new Error(`字幕获取失败: ${y.status}`);
    const k = await y.arrayBuffer();
    r?.throwIfAborted();
    let _;
    try {
      _ = JSON.parse(new TextDecoder("utf-8", { fatal: !0 }).decode(k));
    } catch {
      try {
        _ = JSON.parse(new TextDecoder("gb18030").decode(k));
      } catch {
        _ = JSON.parse(new TextDecoder("big5").decode(k));
      }
    }
    if (r && !Array.isArray(_?.body)) throw new Error("字幕正文格式异常");
    const O = (_?.body || []).map((E, me) => ({
      id: `${E.from || 0}_${me}`,
      from: Number(E.from || 0),
      to: Number(E.to || E.from || 0),
      content: String(E.content || "").trim()
    })).filter((E) => E.content), W = (n.title || t) + c, P = [];
    if (P.push("标题：" + W), P.push("字幕轨道：" + g.map((E) => E.lan_doc || E.lan || "未知").join(" / ") + "（已选：" + (w.lan_doc || w.lan || "默认") + "）"), n.owner?.name && P.push("UP主：" + n.owner.name), n.pubdate) {
      const E = new Date(n.pubdate * 1e3);
      P.push(`发布时间：${E.getFullYear()}-${String(E.getMonth() + 1).padStart(2, "0")}-${String(E.getDate()).padStart(2, "0")}`);
    }
    P.push("链接：https://www.bilibili.com/video/" + t + (s?.page ? `?p=${s.page}` : ""));
    const C = O.map((E) => E.content).join(`\r
`), j = P.join(`\r
`) + `\r
\r
———— 字幕正文 ————\r
\r
`;
    return {
      ok: !0,
      title: W,
      bodyText: C,
      headText: j,
      lineCount: O.length,
      cues: O,
      aid: n.aid,
      desc: n.desc || "",
      viewPoints: Array.isArray(m?.view_points) ? m.view_points : []
    };
  }
  /**
   * 拉取并解析 B站 JSON 格式字幕流为标准化 Cue 列表
   */
  async fetchSubtitleCues(t) {
    if (!t) return [];
    const i = t.startsWith("//") ? `https:${t}` : t, r = await fetch(i);
    if (!r.ok) throw new Error(`字幕获取失败: ${r.statusText}`);
    return ((await r.json()).body || []).map((s) => ({
      from: Number(s.from || 0),
      to: Number(s.to || 0),
      content: String(s.content || "").trim()
    }));
  }
  /**
   * 分页获取视频评论区列表
   */
  async getVideoComments(t, i = 1, r = 20, n = 2) {
    const o = await this.api(
      `https://api.bilibili.com/x/v2/reply?type=1&oid=${t}&pn=${i}&ps=${r}&sort=${n}`
    ), s = o?.replies || [], a = o?.top || o?.upper?.top || null, c = o?.page || {}, u = Number(c.count || 0), d = (g, w = !1) => {
      const b = {};
      if (g.content?.emote && typeof g.content.emote == "object")
        for (const [y, k] of Object.entries(g.content.emote)) {
          const _ = k?.url;
          typeof _ == "string" && _ && (b[y] = _.replace(/^http:/, "https:"));
        }
      const S = Array.isArray(g.replies) ? g.replies.map((y) => ({
        rpid: y.rpid,
        mid: Number(y.mid || 0),
        uname: String(y.member?.uname || "B站用户"),
        avatar: String(y.member?.avatar || "").replace(/^http:/, "https:"),
        message: String(y.content?.message || ""),
        timeText: new Date(Number(y.ctime || 0) * 1e3).toLocaleString(),
        like: Number(y.like || 0),
        pictures: ji(y.content?.pictures)
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
        pictures: ji(g.content?.pictures),
        emotes: b,
        replies: S
      };
    }, h = [];
    i === 1 && a && typeof a == "object" && a.rpid && h.push(d(a, !0));
    const m = a?.rpid ? String(a.rpid) : "";
    for (const g of s)
      m && String(g.rpid) === m || h.push(d(g, !1));
    return {
      comments: h,
      total: u,
      hasMore: i * r < u
    };
  }
  /**
   * 分页获取某条根评论下的子回复（楼中楼）
   */
  async getSubReplies(t, i, r = 1, n = 10) {
    const o = await this.api(
      `https://api.bilibili.com/x/v2/reply/reply?type=1&oid=${t}&root=${i}&pn=${r}&ps=${n}`
    ), s = o?.replies || [], a = o?.page || {}, c = Number(a.count || 0);
    return {
      replies: s.map((d) => {
        const h = {};
        if (d.content?.emote && typeof d.content.emote == "object")
          for (const [m, g] of Object.entries(d.content.emote)) {
            const w = g?.url;
            typeof w == "string" && w && (h[m] = w.replace(/^http:/, "https:"));
          }
        return {
          rpid: d.rpid,
          mid: Number(d.mid || 0),
          uname: String(d.member?.uname || "B站用户"),
          avatar: String(d.member?.avatar || "").replace(/^http:/, "https:"),
          message: String(d.content?.message || ""),
          timeText: new Date(Number(d.ctime || 0) * 1e3).toLocaleString(),
          like: Number(d.like || 0),
          pictures: ji(d.content?.pictures),
          emotes: h
        };
      }),
      total: c,
      hasMore: r * n < c
    };
  }
  /**
   * 获取视频全量弹幕 XML 并解析为结构化列表
   */
  async getVideoDanmaku(t) {
    if (!t) return [];
    try {
      const i = [
        `https://comment.bilibili.com/${t}.xml`,
        `https://api.bilibili.com/x/v1/dm/list.so?oid=${t}`
      ];
      let r = "";
      for (const c of i)
        try {
          const u = await fetch(c);
          if (u.ok && (r = await u.text(), r && r.includes("<d p=")))
            break;
        } catch {
        }
      if (!r) return [];
      const s = new DOMParser().parseFromString(r, "text/xml").querySelectorAll("d"), a = [];
      return s.forEach((c, u) => {
        const h = (c.getAttribute("p") || "").split(","), m = parseFloat(h[0]) || 0, g = parseInt(h[1], 10) || 1, w = parseInt(h[2], 10) || 25, S = `#${(parseInt(h[3], 10) || 16777215).toString(16).padStart(6, "0")}`, y = parseInt(h[4], 10) || 0, k = parseInt(h[5], 10) || 0, _ = h[6] || "", K = h[7] || String(u), O = c.textContent?.trim() || "";
        if (O) {
          const W = Math.floor(m / 60), P = Math.floor(m % 60), C = `${String(W).padStart(2, "0")}:${String(P).padStart(2, "0")}`;
          a.push({
            id: K,
            time: m,
            timeStr: C,
            mode: g,
            size: w,
            color: S,
            timestamp: y,
            pool: k,
            userHash: _,
            text: O
          });
        }
      }), a.sort((c, u) => c.time - u.time), a;
    } catch (i) {
      return console.warn("[BiliService] 弹幕解析失败:", i), [];
    }
  }
  /**
   * 格式化毫秒或秒为 mm:ss
   */
  formatDuration(t) {
    if (!Number.isFinite(t) || t <= 0) return "0:00";
    const i = Math.floor(t / 60), r = Math.floor(t % 60);
    return `${i}:${String(r).padStart(2, "0")}`;
  }
}
const te = et.getInstance();
We.getInstance();
const Yt = new as(), us = {
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
}, l = H({ ...us });
let ds = 1e4;
function z(e, t = !1) {
  const i = globalThis;
  typeof i.showBiliToast == "function" ? i.showBiliToast(e, 3200, { isError: t, target: { type: "bili-video", bvid: l.bvid, aid: l.aid } }) : typeof i.showWindowsToast == "function" && i.showWindowsToast({
    id: `bili_mini_${Date.now()}`,
    appName: "哔哩哔哩",
    icon: "assets/bilibili.svg",
    title: "B站迷你播放器",
    appType: "bili",
    target: { type: "bili-video", bvid: l.bvid, aid: l.aid },
    message: e,
    duration: 3200
  });
}
let vt = "";
function Dr() {
  vt && URL.revokeObjectURL(vt), vt = "";
}
const fs = {
  get state() {
    return l;
  },
  bringToFront() {
    l.zIndex = ++ds;
  },
  /**
   * 打开并播放指定视频
   */
  async openVideo(e) {
    const t = e.bvid || "", i = e.aid ? String(e.aid) : "";
    if (!t && !i) {
      z("无法播放：缺少视频标识 (BV/AV号)", !0);
      return;
    }
    this.bringToFront();
    const r = !!t && l.bvid === t || !!i && l.aid === i;
    if (l.isOpen && r && !e.cachedSourceUrl && (l.videoSrc || l.iframeSrc) && !l.errorMsg) {
      l.collapsed = !1;
      return;
    }
    const n = Yt.start();
    if (Dr(), l.isOpen = !0, l.collapsed = !1, l.isLoading = !0, l.errorMsg = "", l.bvid = t, l.aid = i, l.cid = e.cid || "", l.title = e.title || t || "加载中…", l.cover = e.cover || "", l.author = e.author || "", l.authorMid = e.mid ? String(e.mid) : "", l.authorFace = e.authorFace || "", l.videoSrc = "", l.sourceUrls = [], l.iframeSrc = "", l.useIframe = !1, l.currentTime = 0, l.pages = [], l.currentPageIndex = 0, l.comments = [], l.commentsPage = 1, l.hasMoreComments = !1, l.totalComments = 0, l.danmakuList = [], l.danmakuLoading = !1, typeof window < "u" && (l.x = Math.max(20, Math.floor((window.innerWidth - 380) / 2)), l.y = Math.max(60, Math.min(100, Math.floor((window.innerHeight - 254) / 3)))), e.cachedSourceUrl) {
      vt = e.cachedSourceUrl, l.videoSrc = vt, l.isLoading = !1;
      return;
    }
    try {
      const o = await te.resolvePlayStream({
        bvid: t,
        aid: i,
        cid: e.cid,
        title: e.title,
        cover: e.cover,
        preferredQuality: l.currentQuality
      }, 1, n);
      if (n.throwIfAborted(), l.title = o.title || e.title || t, l.cover = o.poster || e.cover || "", l.author = o.owner || e.author || "UP主", l.authorFace = o.ownerFace || e.authorFace || "", o.ownerMid && (l.authorMid = String(o.ownerMid)), l.aid = o.aid ? String(o.aid) : i, l.bvid = o.bvid || t, l.cid = o.cid || "", l.description = o.desc || "", l.pubdate = o.pubdate ? new Date(o.pubdate * 1e3).toLocaleString() : "", l.pages = o.pages || [], l.currentPageIndex = Math.max(0, o.currentPage - 1), o.acceptQuality?.length && (l.qualities = o.acceptQuality.map((s, a) => ({
        qn: s,
        desc: o.acceptDescription?.[a] || Lr(s)
      }))), l.currentQuality = o.currentQuality || 64, o.sources && o.sources.length)
        l.sourceUrls = o.sources, l.videoSrc = o.sources[0], l.isPlaying = !0, l.danmakuEnabled && this.loadDanmaku();
      else
        throw new Error("未能获取到直链源");
    } catch (o) {
      if (n.aborted) return;
      l.errorMsg = o?.message || "未能获取到视频播放流", z(`视频加载未完成：${l.errorMsg}`, !0);
    } finally {
      n.aborted || (l.isLoading = !1);
    }
  },
  /**
   * 重新拉取当前视频
   */
  async retryCurrentVideo() {
    (l.bvid || l.aid) && await this.openVideo({
      bvid: l.bvid,
      aid: l.aid,
      cid: l.cid,
      title: l.title,
      cover: l.cover,
      author: l.author,
      authorFace: l.authorFace
    });
  },
  /**
   * 切换原生 HTML5 与官方 iframe 模式
   */
  togglePlayerMode() {
    if (!l.videoSrc && !l.useIframe) {
      z("当前视频未获取到原生流，保持内嵌模式");
      return;
    }
    l.useIframe = !l.useIframe, l.useIframe && !l.iframeSrc && (l.iframeSrc = `https://player.bilibili.com/player.html?bvid=${encodeURIComponent(l.bvid)}&autoplay=1&danmaku=0&high_quality=1`), z(l.useIframe ? "已切换至官方嵌入播放模式" : "已切换至原生播放模式");
  },
  /**
   * 切换选集（分P）
   */
  async switchEpisode(e) {
    if (e < 0 || e >= l.pages.length) return;
    const t = l.pages[e];
    if (!t) return;
    l.currentPageIndex = e, l.cid = t.cid, l.videoSrc = "", l.sourceUrls = [], l.isLoading = !0, l.errorMsg = "", l.danmakuList = [], l.danmakuLoading = !1;
    const i = Yt.start();
    try {
      const r = await te.fetchPlayStream(
        l.bvid,
        t.cid,
        l.currentQuality,
        i
      );
      if (i.throwIfAborted(), r.sources?.length)
        l.sourceUrls = r.sources, l.videoSrc = r.sources[0], l.currentTime = 0, l.isPlaying = !0, l.danmakuEnabled && this.loadDanmaku();
      else
        throw new Error("获取分P视频流失败");
    } catch (r) {
      if (i.aborted) return;
      l.errorMsg = r?.message || "切换选集失败", z(`分P切换失败：${l.errorMsg}`, !0);
    } finally {
      i.aborted || (l.isLoading = !1);
    }
  },
  /**
   * 切换清晰度
   */
  async switchQuality(e) {
    if (l.qualityMenuOpen = !1, e === l.currentQuality) return;
    l.isLoading = !0;
    const t = l.currentTime, i = Yt.start();
    try {
      const r = await te.fetchPlayStream(
        l.bvid,
        l.cid,
        e,
        i
      );
      i.throwIfAborted(), r.sources?.length && (l.sourceUrls = r.sources, l.videoSrc = r.sources[0], l.currentQuality = r.quality, l.currentTime = t, l.isPlaying = !0, z(`已切换清晰度为 ${Lr(e)}`));
    } catch (r) {
      if (i.aborted) return;
      z(`清晰度切换失败：${r?.message || "网络异常"}`, !0);
    } finally {
      i.aborted || (l.isLoading = !1);
    }
  },
  /**
   * 切换倍速
   */
  setPlaybackRate(e) {
    l.playbackRate = e, l.speedMenuOpen = !1;
  },
  /**
   * 折叠 / 展开
   */
  toggleCollapse() {
    l.collapsed = !l.collapsed, l.collapsed && (l.episodesOpen = !1, l.descOpen = !1, l.commentsOpen = !1);
  },
  /**
   * 关闭播放器
   */
  close() {
    Yt.cancel(), l.isLoading = !1, l.sourceUrls = [], Dr(), l.isOpen = !1, l.isPlaying = !1, l.videoSrc = "", l.episodesOpen = !1, l.descOpen = !1, l.commentsOpen = !1;
  },
  /**
   * 切换选集抽屉
   */
  toggleEpisodes(e) {
    l.episodesOpen = e !== void 0 ? e : !l.episodesOpen;
  },
  /**
   * 切换简介抽屉
   */
  toggleDesc(e) {
    l.descOpen = e !== void 0 ? e : !l.descOpen;
  },
  /**
   * 切换评论抽屉
   */
  toggleComments(e) {
    const t = e !== void 0 ? e : !l.commentsOpen;
    l.commentsOpen = t, t && (!l.comments.length || l.commentsLoading) && this.loadComments(!0);
  },
  /**
   * 切换弹幕飞屏开关（B站原版体验：点击就开，再点击就关）
   */
  toggleDanmakuEnabled(e) {
    const t = e !== void 0 ? e : !l.danmakuEnabled;
    l.danmakuEnabled = t, z(t ? "已开启弹幕" : "已关闭弹幕"), t && (!l.danmakuList.length || l.danmakuLoading) && this.loadDanmaku();
  },
  /**
   * 加载视频弹幕
   */
  async loadDanmaku(e = !1) {
    if (!(l.danmakuList.length > 0 && !e)) {
      l.danmakuLoading = !0;
      try {
        let t = l.cid;
        if (!t && l.bvid) {
          const r = await te.getVideoView(l.bvid);
          r?.cid && (t = r.cid, l.cid = t);
        }
        if (!t) {
          l.danmakuLoading = !1, z("未能获取到当前视频的 cid，暂无法拉取弹幕", !0);
          return;
        }
        const i = await te.getVideoDanmaku(t);
        l.danmakuList = i;
      } catch (t) {
        console.warn("[MiniPlayer] 获取弹幕失败:", t);
      } finally {
        l.danmakuLoading = !1;
      }
    }
  },
  /**
   * 复制简介
   */
  async copyDescription() {
    const e = [
      `标题：${l.title}`,
      l.author ? `UP主：${l.author}` : "",
      l.pubdate ? `发布时间：${l.pubdate}` : "",
      l.bvid ? `链接：https://www.bilibili.com/video/${l.bvid}` : "",
      "",
      l.description || "暂无简介"
    ].filter(Boolean);
    try {
      await navigator.clipboard.writeText(e.join(`
`)), z("已复制视频简介到剪贴板");
    } catch {
      z("复制简介失败", !0);
    }
  },
  /**
   * 加载视频评论
   */
  async loadComments(e = !1) {
    e && (l.commentsPage = 1, l.comments = []), l.commentsLoading = !0;
    try {
      let t = l.aid;
      if (!t && l.bvid) {
        const n = await te.getVideoView(l.bvid);
        n?.aid && (t = String(n.aid), l.aid = t);
      }
      if (!t) {
        l.commentsLoading = !1;
        return;
      }
      const i = await te.getVideoComments(
        t,
        l.commentsPage,
        20,
        l.commentsSort
      ), r = (i.comments || []).map((n) => {
        const o = n.mid ? String(n.mid) : "", s = String(n.uname || "").trim(), a = l.authorMid ? String(l.authorMid) : "", c = String(l.author || "").trim(), u = !!(a && o && a === o || c && s && c === s);
        return {
          id: String(n.rpid),
          mid: o,
          uname: n.uname,
          avatar: n.avatar,
          message: n.message,
          timeStr: n.timeText,
          likeCount: n.like || 0,
          replyCount: n.rcount || 0,
          emotes: n.emotes,
          pictures: n.pictures || [],
          isUp: u,
          isTop: !!n.isTop,
          replies: (n.replies || []).map((d) => ({
            id: String(d.rpid),
            userName: d.uname,
            message: d.message,
            pictures: d.pictures || [],
            emotes: d.emotes
          }))
        };
      });
      e ? l.comments = r : l.comments = [...l.comments, ...r], l.totalComments = i.total || l.comments.length, l.hasMoreComments = i.hasMore;
    } catch (t) {
      z(`评论加载失败：${t?.message || "网络异常"}`, !0);
    } finally {
      l.commentsLoading = !1;
    }
  },
  /**
   * 切换评论排序
   */
  setCommentsSort(e) {
    l.commentsSort !== e && (l.commentsSort = e, this.loadComments(!0));
  },
  /**
   * 原地展开或加载更多楼中楼子回复
   */
  async expandSubReplies(e) {
    const t = l.comments.find((i) => String(i.id) === String(e));
    if (!(!t || t.subRepliesLoading)) {
      t.subRepliesPage ? t.subRepliesPage++ : t.subRepliesPage = 1, t.subRepliesLoading = !0, t.subRepliesExpanded = !0;
      try {
        let i = l.aid;
        if (!i && l.bvid) {
          const a = await te.getVideoView(l.bvid);
          a?.aid && (i = String(a.aid), l.aid = i);
        }
        if (!i) {
          t.subRepliesLoading = !1;
          return;
        }
        const r = await te.getSubReplies(i, e, t.subRepliesPage, 10), n = (r.replies || []).map((a) => ({
          id: String(a.rpid),
          userName: a.uname,
          message: a.message,
          pictures: a.pictures || [],
          emotes: a.emotes
        })), o = new Set((t.replies || []).map((a) => String(a.id))), s = n.filter((a) => !o.has(String(a.id)));
        t.replies = [...t.replies || [], ...s], t.subRepliesHasMore = r.hasMore;
      } catch (i) {
        z(`子回复加载失败：${i?.message || "网络异常"}`, !0);
      } finally {
        t.subRepliesLoading = !1;
      }
    }
  },
  /**
   * 收起已展开的楼中楼子回复
   */
  collapseSubReplies(e) {
    const t = l.comments.find((i) => String(i.id) === String(e));
    t && (t.subRepliesExpanded = !1);
  },
  /**
   * 加载更多评论
   */
  loadMoreComments() {
    l.commentsLoading || !l.hasMoreComments || (l.commentsPage++, this.loadComments(!1));
  }
}, ms = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  biliMiniPlayerController: fs,
  biliMiniPlayerState: l
}, Symbol.toStringTag, { value: "Module" }));
function ps() {
  if (l.isOpen && l.title)
    return {
      type: "bilibili",
      title: l.title,
      url: l.bvid ? `https://www.bilibili.com/video/${l.bvid}` : void 0,
      updatedAt: Date.now()
    };
  if (p.playing && p.title)
    return {
      type: "music",
      title: `${p.title} - ${p.artist || "未知歌手"}`,
      updatedAt: Date.now()
    };
  const e = ce.activeId;
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
function hs(e) {
  switch (e.type) {
    case "music": {
      const t = e.meta?.musicTitle || "未知曲目", i = e.meta?.musicArtist ? ` - ${e.meta.musicArtist}` : "";
      return `🎵 音乐分享: 《${t}》${i}`;
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
function gs(e, t) {
  if (f.visible) return;
  const i = t || A.channel || "main", r = A.rooms.find((s) => s.id === i), n = r?.name ? `#${r.name}` : void 0;
  let o = "assets/icon-48.png";
  if (e.sender?.avatar && /^https?:\/\//i.test(e.sender.avatar)) {
    const s = ki(e.sender.avatar);
    s && (o = s);
  }
  pe.show({
    id: `chat_msg_${e.id}`,
    appType: "chat",
    appName: "海狸聊天室",
    icon: o,
    title: e.sender?.name || "新消息",
    subtitle: n,
    message: hs(e),
    duration: 6500,
    level: "info",
    history: !0,
    target: { type: "module", moduleId: "chat" },
    actionLabel: "查看消息",
    onClick: () => {
      Si.handleToolClick("chat");
    }
  });
}
class st extends Error {
  constructor(t) {
    super(`服务器响应 ${t}`), this.status = t, this.name = "PrivateChatHttpError";
  }
}
class qe extends Error {
  constructor() {
    super(...arguments), this.name = "ChatCapabilityError";
  }
}
function En(e, t, i) {
  return new Promise((r, n) => {
    const o = new AbortController(), s = () => o.abort(new DOMException("聊天室操作已停止等待", "AbortError")), a = () => {
      clearTimeout(u), i?.removeEventListener("abort", s), o.signal.removeEventListener("abort", c);
    }, c = () => {
      a(), n(o.signal.reason);
    }, u = setTimeout(() => o.abort(new DOMException("聊天室操作超时，结果可能尚未确认", "TimeoutError")), e);
    if (o.signal.addEventListener("abort", c, { once: !0 }), i?.addEventListener("abort", s, { once: !0 }), i?.aborted) {
      s();
      return;
    }
    Promise.resolve().then(() => (o.signal.throwIfAborted(), t(o.signal))).then(
      (d) => {
        a(), o.signal.aborted ? n(o.signal.reason) : r(d);
      },
      (d) => {
        a(), n(d);
      }
    );
  });
}
class ee extends Error {
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
class ys {
  constructor(t = () => {
  }) {
    this.onBlocked = t;
  }
  open() {
    if (this.database) return this.database;
    const t = new Promise((i, r) => {
      let n = !1;
      const o = (a) => {
        n || (n = !0, clearTimeout(s), r(a));
      }, s = setTimeout(() => o(new ee("timeout")), 8e3);
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
          n = !0, clearTimeout(s), c.onversionchange = () => {
            c.close(), this.database === t && (this.database = void 0);
          }, i(c);
        }, a.onerror = () => o(new ee("storage")), a.onblocked = () => {
          if (!n) {
            o(new ee("blocked"));
            try {
              this.onBlocked();
            } catch {
            }
          }
        };
      } catch {
        o(new ee("storage"));
      }
    });
    return this.database = t, t.catch(() => {
      this.database === t && (this.database = void 0);
    }), t;
  }
  read(t, i) {
    return this.access(t, void 0, i);
  }
  async write(t, i) {
    if (!Ut(i)) throw new ee("invalid");
    await this.access(t, i);
  }
  access(t, i, r) {
    const n = T(t);
    return En(8e3, async (o) => {
      try {
        const s = await this.open();
        return o.throwIfAborted(), await new Promise((a, c) => {
          const u = s.transaction("credentials", i === void 0 ? "readonly" : "readwrite"), d = u.objectStore("credentials"), h = i === void 0 ? d.get(n) : d.put(i, n), m = () => {
            try {
              u.abort();
            } catch {
            }
          }, g = () => o.removeEventListener("abort", m);
          i === void 0 && o.addEventListener("abort", m, { once: !0 }), u.oncomplete = () => {
            g();
            const w = i === void 0 ? h.result : i;
            w === void 0 || w === "" ? c(new ee("missing")) : Ut(w) ? a(w) : c(new ee("invalid"));
          }, u.onabort = u.onerror = h.onerror = () => {
            g(), c(new ee("storage"));
          };
        });
      } catch (s) {
        throw o.aborted ? o.reason : s instanceof ee ? s : new ee("storage");
      }
    }, r);
  }
}
class $e extends Error {
  constructor() {
    super(...arguments), this.name = "PrivateChatTransportError";
  }
}
class ws {
  constructor(t) {
    this.ports = t;
  }
  async request(t) {
    let i, r;
    try {
      if (i = Object.freeze({ ...$t(t.destination), channel: t.destination.channel }), r = new URL(t.path, i.origin), !t.path.startsWith("/api/v1/") || t.path.includes("\\") || r.origin !== i.origin || r.hash || r.username || r.password || !r.pathname.startsWith("/api/v1/")) throw new Error();
    } catch {
      throw new $e("聊天室请求目标无效");
    }
    const n = Object.freeze({ ...t, destination: i, path: r.pathname, method: (t.method || "GET").toUpperCase() });
    return r.searchParams.set("room", i.room), r.searchParams.delete("channel"), i.channel && i.channel !== "main" && r.searchParams.set("channel", i.channel), En(n.signal ? 3e4 : 15e3, async (o) => {
      try {
        const s = await this.ports.credential(i, o);
        if (o.throwIfAborted(), !Ut(s)) throw new ee("invalid");
        this.ports.beforeSend(n);
        let a;
        try {
          a = n.body === void 0 ? void 0 : JSON.stringify(n.body);
        } catch {
          throw new $e("聊天室请求内容格式无效");
        }
        const c = await fetch(r, {
          method: n.method,
          signal: o,
          body: a,
          headers: { Authorization: `Bearer ${s}`, "Content-Type": "application/json" },
          redirect: "error",
          credentials: "omit",
          cache: "no-store",
          referrerPolicy: "no-referrer"
        }), u = () => {
          c.body?.cancel().catch(() => {
          });
        };
        if (o.aborted && (u(), o.throwIfAborted()), !c.ok)
          throw u(), new st(c.status);
        const d = c.body?.getReader();
        if (!d) throw new $e("聊天室返回空响应");
        const h = () => {
          d.cancel().catch(() => {
          });
        };
        o.addEventListener("abort", h, { once: !0 });
        let m = 0, g = "";
        const w = new TextDecoder();
        try {
          for (; ; ) {
            const b = await d.read();
            if (o.throwIfAborted(), b.done) break;
            if (m += b.value.byteLength, m > 2 * 1024 * 1024)
              throw h(), new $e("聊天室响应超限");
            g += w.decode(b.value, { stream: !0 });
          }
          try {
            return JSON.parse(g + w.decode());
          } catch {
            throw new $e("聊天室响应格式无效");
          }
        } finally {
          o.removeEventListener("abort", h);
          try {
            d.releaseLock();
          } catch {
          }
        }
      } catch (s) {
        throw o.aborted ? o.reason : s instanceof st || s instanceof qe || s instanceof ee || s instanceof $e ? s : new $e("聊天室请求失败，请检查网络或服务配置");
      }
    }, n.signal);
  }
}
class bs {
  constructor(t) {
    this.ports = t, this.generation = 0, this.halted = !0, this.liveGeneration = -1, this.reads = new io();
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
    const i = Object.freeze({ ...t }), r = this.invalidate();
    r !== this.generation || !this.ports.active(i) || (this.halted = !1, this.ports.started(), this.tick(i, r, 0));
  }
  owns(t, i) {
    return this.generation === i && !this.halted && this.ports.active(t);
  }
  schedule(t, i, r) {
    clearTimeout(this.timer), this.timer = setTimeout(() => {
      this.timer = void 0, r === this.generation && t();
    }, i);
  }
  async tick(t, i, r) {
    if (!this.owns(t, i)) return;
    if (this.running) {
      this.schedule(() => {
        this.tick(t, i, r);
      }, 250, i);
      return;
    }
    const n = /* @__PURE__ */ Symbol("chat-sync");
    this.running = n;
    const o = this.ports.visible(), s = this.reads.begin({ timeoutMs: o ? 25e3 : 2e4, isCurrent: () => this.owns(t, i) });
    let a = o ? 2500 : 1e4, c = "读取本地历史";
    const u = {
      signal: s.signal,
      current: s.current,
      wait: s.wait,
      visible: o,
      phase: (d) => {
        c = d;
      },
      restoring: () => this.liveGeneration !== i,
      caughtUp: () => {
        s.current() && (this.liveGeneration = i);
      }
    };
    try {
      this.ports.started();
      const d = await s.wait(() => this.ports.poll(t, u));
      if (!s.current()) return;
      r = 0, d?.hasMore && (a = 250);
    } catch (d) {
      if (!this.owns(t, i)) return;
      const h = this.ports.classify(d, t);
      h === "retry" ? (++r, a = Math.min(6e4, 1500 * 2 ** Math.min(r, 4))) : this.halted = !0, this.ports.failed(h, c, r), h === "missing-room" && i === this.generation && this.halted && this.schedule(() => this.ports.restart(), 0, i);
    } finally {
      s.finish(), this.running === n && (this.running = void 0), i === this.generation && (this.ports.active(t) || (this.halted = !0), this.ports.idle()), this.owns(t, i) && this.schedule(() => {
        this.tick(t, i, r);
      }, a, i);
    }
  }
}
const Se = (e) => !!e && typeof e == "object" && !Array.isArray(e), Me = (e) => typeof e == "string" && /^[A-Za-z0-9_-]{1,160}$/.test(e), St = (e) => e == null, Pt = (e) => typeof e == "number" && Number.isFinite(e) && e >= 0;
function J() {
  throw new Error("同步页格式无效，未提交本页记录或推进游标");
}
function Oi(e) {
  if (!Array.isArray(e) || e.length > 32) throw new Error("房间列表格式无效");
  return e.map((t) => {
    if (!Se(t) || !Me(t.id) || typeof t.name != "string" || t.name.length > 80 || typeof t.icon != "string" || t.icon.length > 8 || typeof t.description != "string" || t.description.length > 500) throw new Error("房间格式无效");
    if (t.space !== void 0 && !Me(t.space)) throw new Error("空间格式无效");
    return { id: t.id, name: t.name, icon: t.icon, description: t.description, space: typeof t.space == "string" ? t.space : "hub_main" };
  });
}
function Ni(e) {
  if (!Array.isArray(e) || e.length > 16) throw new Error("空间列表格式无效");
  return e.map((t) => {
    if (!Se(t) || !Me(t.id) || typeof t.name != "string" || t.name.length > 80 || typeof t.icon != "string" || t.icon.length > 8) throw new Error("空间格式无效");
    return { id: t.id, name: t.name, icon: t.icon };
  });
}
function kn(e, t) {
  if (typeof e.name != "string" || e.name.length > 200) return;
  const i = Wo({ ...e, name: e.name.slice(0, 100) }, t);
  return i && { ...i, name: e.name };
}
function vs(e, t) {
  return St(e) ? [] : ((!Array.isArray(e) || e.length > 65) && J(), e.map((i) => {
    (!Se(i) || !Me(i.uid) || i.role !== void 0 && i.role !== "owner" && i.role !== "member") && J();
    const r = kn(i, t);
    return r || J(), r.activity && Se(i.activity) && Pt(i.activity.updatedAt) && (r.activity.updatedAt = i.activity.updatedAt), {
      ...r,
      role: i.role === "owner" ? "owner" : "member",
      online: typeof i.online == "boolean" ? i.online : void 0,
      lastSeen: Pt(i.lastSeen) ? i.lastSeen : void 0
    };
  }));
}
function Ss(e, t, i) {
  if (!St(e))
    return (!Array.isArray(e) || e.length > 200) && J(), e.map((r) => {
      (!Se(r) || !Me(r.id) || !Me(r.toUid) || !Se(r.from) || !Me(r.from.uid)) && J();
      const n = kn(r.from, i);
      return (!n || n.uid !== t && r.toUid !== t || !["pending", "accepted", "rejected"].includes(String(r.status))) && J(), r.createdAt !== void 0 && !Pt(r.createdAt) && J(), {
        id: r.id,
        from: n,
        toUid: r.toUid,
        status: r.status,
        createdAt: Pt(r.createdAt) ? r.createdAt : i,
        note: typeof r.note == "string" && r.note.length <= 200 ? r.note : void 0
      };
    });
}
function As(e, t, i, r) {
  (!Number.isSafeInteger(i) || i < 0 || !Pt(r) || !Se(e) || !Se(e.identity) || e.identity.uid !== t || e.identity.role !== "owner" && e.identity.role !== "member" || !Array.isArray(e.messages) || e.messages.length > 50) && J();
  let n = i;
  const o = [], s = [];
  for (const u of e.messages) {
    (!Se(u) || !Number.isSafeInteger(u.seq) || u.seq <= n) && J();
    const d = un(u.message, r);
    d || J(), o.push(d), s.push(u.seq), n = u.seq;
  }
  e.hasMore !== void 0 && typeof e.hasMore != "boolean" && J();
  const a = e.hasMore === !0;
  a && !o.length && J();
  let c;
  return St(e.friends) || ((!Array.isArray(e.friends) || e.friends.length > 4096 || !e.friends.every(Me)) && J(), c = [...new Set(e.friends)]), Object.freeze({
    uid: t,
    role: e.identity.role,
    messages: o,
    sequences: s,
    next: n,
    hasMore: a,
    capabilities: $o(e.capabilities),
    rooms: St(e.rooms) ? [{ id: "main", name: "综合讨论", icon: "💬", description: "" }] : Oi(e.rooms),
    spaces: St(e.spaces) ? [{ id: "hub_main", name: "聊天室", icon: "🏠" }] : Ni(e.spaces),
    roomsSupported: Array.isArray(e.rooms),
    spacesSupported: Array.isArray(e.spaces),
    members: vs(e.members, r),
    friends: c,
    friendRequests: Ss(e.friendRequests, t, r)
  });
}
function ft(e, t, i) {
  for (const r of Object.keys(t)) {
    if (!i()) return !1;
    e[r] = t[r];
  }
  return i();
}
function Es(e, t, i, r) {
  const { chat: n, service: o } = r, s = i.current;
  if (!s()) return !1;
  const a = i.restoring();
  for (let y = 0; y < e.messages.length; y++) {
    if (!s()) return !1;
    const k = e.messages[y];
    r.publish(k, Object.freeze({
      scope: t.scope,
      channel: t.channel,
      sequence: e.sequences[y],
      source: a ? "history" : k.sender.uid === e.uid ? "self" : "live"
    }), s);
  }
  if (!s()) return !1;
  const c = new Set(n.messages.map((y) => y.id)), u = e.messages.filter((y) => y.sender.uid !== e.uid && !y.meta?.silentPartySync && y.type !== "system" && !c.has(y.id)), d = n.visible ? [] : u.filter((y) => (t.cursor > 0 || t.now - y.timestamp < 3e4) && (y.type !== "music_party" || !a)).slice(-3), h = new Map(n.messages.map((y) => [y.id, y]));
  for (const y of e.messages) h.set(y.id, y);
  const m = Object.assign(/* @__PURE__ */ Object.create(null), n.userActivities);
  for (const y of e.members) y.activity && (m[y.uid] = y.activity);
  const g = [], w = new Set(n.friends.map((y) => y.uid)), b = new Map(e.members.map((y) => [y.uid, y]));
  for (const y of e.friends || []) {
    const k = b.get(y);
    k && !w.has(y) && (g.push({ uid: y, name: k.name, avatar: k.avatar, addedAt: t.now, status: "mutual" }), w.add(y));
  }
  if (!ft(n, {
    messages: [...h.values()].sort((y, k) => y.timestamp - k.timestamp || y.id.localeCompare(k.id)).slice(-200),
    unreadCount: u.length ? n.visible ? 0 : n.unreadCount + u.length : n.unreadCount
  }, s) || !ft(o, {
    capabilities: e.capabilities,
    imageMessagesSupported: e.capabilities.messageTypes.includes("image"),
    spacesSupported: e.spacesSupported,
    spaces: e.spaces,
    roomsSupported: e.roomsSupported,
    rooms: e.rooms
  }, s) || (r.authenticated(), !s()) || !ft(o, { role: e.role, members: e.members, ...e.friends === void 0 ? {} : { friends: e.friends } }, s)) return !1;
  for (const y of g) {
    if (!s()) return !1;
    n.friends.some((k) => k.uid === y.uid) || n.friends.push(y);
  }
  const S = e.members.some((y) => !!y.activity) || Object.getPrototypeOf(n.userActivities) !== null ? { userActivities: m } : {};
  if (!ft(n, {
    ...S,
    ...e.friendRequests === void 0 ? {} : { friendRequests: e.friendRequests },
    connected: !0,
    connecting: !1,
    error: ""
  }, s) || !ft(o, { status: "已连接私有服务器" }, s)) return !1;
  e.hasMore || i.caughtUp();
  for (const y of d) {
    if (!s()) return !1;
    if (n.visible) break;
    try {
      r.notify(y, t.channel);
    } catch {
      console.warn("[PrivateChat] notification failed");
    }
  }
  return s();
}
const je = "private-relay-server";
class ks {
  constructor(t) {
    this.ports = t, this.flushing = !1;
  }
  async postAndAcknowledge(t, i, r = 12e3) {
    const n = Object.freeze({ ...t }), o = Ct(this.ports.capabilities(n), i);
    if (o) throw new qe(o);
    const s = await this.ports.post(n, i, AbortSignal.timeout(r));
    if (!s || s.stored !== !0 || s.id !== i.id) throw new Error("未收到服务器落盘确认");
    await os(this.ports.scope(n), i.id, je);
  }
  async recordFailure(t, i, r, n) {
    try {
      if (r instanceof qe) {
        Y.value = r.message, await xr(this.ports.scope(t), i, je, !1, n, !0);
        return;
      }
      const o = r instanceof st && r.status >= 400 && r.status < 500 && ![408, 429].includes(r.status);
      await xr(this.ports.scope(t), i, je, o, n);
    } catch {
      Y.value = "无法保存消息的发送状态，请检查浏览器存储。";
    }
  }
  async flush(t) {
    if (this.flushing || !this.ports.active(t) || ["unknown", "incompatible"].includes(this.ports.capabilities(t).status)) return;
    this.flushing = !0;
    const i = [];
    try {
      const r = this.ports.destinations(t).map((o) => Object.freeze({ ...o }));
      let n = 8;
      for (const o of r) {
        if (!n || !this.ports.active(t)) break;
        await ss(this.ports.scope(o), [je], () => this.ports.active(t), (s, a, c) => {
          --n;
          const u = { ...a, sender: { ...a.sender, avatar: this.ports.avatar(a.sender.avatar) } };
          return i.push(this.postAndAcknowledge(o, u).catch((d) => this.recordFailure(o, a.id, d, c))), !0;
        }, n, (s) => !Ct(this.ports.capabilities(o), s));
      }
    } catch {
      Y.value = "待发队列处理未确认，请检查本地存储；未改投其他房间。";
    } finally {
      await Promise.allSettled(i), this.flushing = !1;
    }
  }
}
const ni = [];
function dc(e) {
  return ni.push(e), () => {
    const t = ni.indexOf(e);
    t >= 0 && ni.splice(t, 1);
  };
}
async function fc() {
  const e = v.room;
  if (!e || e.uid !== f.currentUser.uid) throw new Error("请先在聊天室设置中加入自己的聊天室");
  const t = { ...e }, i = await X(t, "/api/v1/rooms", "GET", void 0, AbortSignal.timeout(15e3));
  if (!v.room || T(t) !== T(v.room)) throw new Error("聊天室配置已改变，请重新选择");
  const r = i.spaces ? Ni(i.spaces) : [];
  return Oi(i.rooms).map((n) => ({ ...t, channel: n.id, name: `${r.find((o) => o.id === n.space)?.name || "聊天室"} / ${n.name}` }));
}
async function er(e, t) {
  const i = v.room;
  if (!i || T(i) !== T(t) || f.currentUser.uid !== t.uid) throw new Error("聊天室身份已改变，未发送，请重新选择房间");
  const r = Lt(e);
  if (!r || r.type === "system" || r.type === "image") throw new Error("分享内容无效或超出大小限制，未发送");
  const n = { ...t };
  r.sender = { ...r.sender, uid: n.uid, avatar: Ti(f.currentUser.avatar, ae.avatarUrl), name: f.currentUser.name };
  const o = Ct(Wt(n), r);
  if (o) throw new Error(o);
  await Ii(Re(n), [r]), await Sn(Re(n), r, [je]), Ae(n) && !f.messages.some((s) => s.id === r.id) && f.messages.push(r);
  try {
    await hi.postAndAcknowledge(n, r, 15e3);
  } catch (s) {
    throw await hi.recordFailure(n, r.id, s, 0), Li(), new Error(`未收到「${n.name}」的保存确认；已保留在该房间待发队列，请勿重复发送。`);
  }
}
const A = H({
  status: "未配置私有服务器",
  role: "",
  syncing: !1,
  channel: "main",
  rooms: [],
  spaces: [],
  spacesSupported: !1,
  imageMessagesSupported: !1,
  capabilities: Ei(),
  roomsSupported: !1,
  friends: [],
  members: []
});
function Wt(e) {
  return He === T(e) && v.room && T(v.room) === T(e) && f.currentUser.uid === e.uid ? A.capabilities : Ei();
}
function xi() {
  A.capabilities = Ei(), A.imageMessagesSupported = !1;
}
const hi = new ks({
  active: Ae,
  capabilities: Wt,
  scope: Re,
  avatar: (e) => Ti(e, ae.avatarUrl),
  destinations: (e) => [Ge(e), ...A.rooms.filter((t) => t.id !== A.channel).map((t) => ({ ...e, channel: t.id }))],
  post: (e, t, i) => X(e, "/api/v1/messages", "POST", { message: t }, i)
}), Cn = new ys(() => {
  A.status = "凭证数据库被旧标签页阻塞，请关闭旧页后重试";
}), Cs = new ws({
  credential: (e, t) => Cn.read(e, t),
  beforeSend: ({ destination: e, path: t, method: i, body: r }) => {
    if (!ie.isInstalled("chat")) throw new qe("聊天室实验组件已停用，未发起请求");
    const n = t === "/api/v1/members" || t.startsWith("/api/v1/members/"), o = i !== "GET" && ["/api/v1/spaces", "/api/v1/rooms"].some((s) => t === s || t.startsWith(s + "/"));
    if ((n || o) && (!f.connected || A.role !== "owner" || He !== T(e) || !v.room || T(v.room) !== T(e) || f.currentUser.uid !== e.uid))
      throw new st(403);
    if (i === "POST" && t === "/api/v1/messages") {
      const s = Ct(Wt(e), r.message);
      if (s) throw new qe(s);
    }
  }
});
function _s(e) {
  const t = "BEAVER-PRIVATE1:";
  if (!e.startsWith(t) || e.length > 8e3) throw new Error("请粘贴新版私有聊天室邀请");
  try {
    const i = JSON.parse(decodeURIComponent(atob(e.slice(t.length))));
    if (!i || !Ut(i.token)) throw new Error();
    return { ...$t(i), token: i.token };
  } catch {
    throw new Error("邀请格式无效");
  }
}
let tr = 0;
async function mc(e) {
  if (!ie.isInstalled("chat")) throw new qe("请先在商店手动启用聊天室实验组件");
  const t = _s(e);
  if (t.uid !== f.currentUser.uid) throw new Error("此邀请不属于当前 UID，请让服主为当前账号重新创建");
  const i = $t(t), r = v.room ? T(v.room) : null;
  Mt();
  const n = tr;
  if (await Cn.write(i, t.token), n !== tr || f.currentUser.uid !== t.uid || r !== (v.room ? T(v.room) : null))
    throw new Error("凭据已保存，但身份或连接选择已改变，未激活旧邀请；如需加入请重新确认。");
  Mt(), is(i), f.transportMode = "relay", Dt(vn(i), t.room), Oe();
}
function X(e, t, i = "GET", r, n) {
  return ie.isInstalled("chat") ? Cs.request({ destination: e, path: t, method: i, body: r, signal: n }) : Promise.reject(new qe("请先在商店手动启用聊天室实验组件"));
}
async function _n(e, t, i) {
  const r = v.room;
  if (!r) throw new Error("未配置私有服务器");
  return X({ ...r }, e, t, i, AbortSignal.timeout(15e3));
}
async function pc() {
  return (await _n("/api/v1/members", "GET")).members;
}
async function Is(e, t) {
  const i = v.room;
  if (!i) throw new Error("未配置私有服务器");
  const r = { ...i }, n = await X(r, "/api/v1/members", "POST", { uid: e, name: t }, AbortSignal.timeout(15e3));
  if (!Ut(n.token)) throw new Error("服务器返回无效，勿重复创建，请刷新成员列表");
  return "BEAVER-PRIVATE1:" + btoa(encodeURIComponent(JSON.stringify({ ...r, uid: e, token: n.token })));
}
async function hc(e) {
  const t = v.room;
  if (!t) throw new Error("未配置私有服务器，无法发送邀请");
  if (e.uid === f.currentUser.uid) throw new Error("不能邀请自己");
  const i = Wt(t);
  if (!i.messageTypes.includes("server_invite")) throw new Error(i.status === "unknown" || i.status === "incompatible" ? i.reason : "服务端未启用邀请卡消息，未创建新成员邀请。");
  const r = await Is(e.uid, e.name), n = A.spaces.find((h) => h.id === (A.rooms.find((m) => m.id === A.channel)?.space || "hub_main")), o = A.rooms.find((h) => h.id === A.channel) || A.rooms[0], s = n?.name || t.room || "海狸聊天室", a = o?.name || "综合讨论";
  let c = "";
  try {
    c = JSON.parse(decodeURIComponent(atob(r.replace(/^BEAVER-PRIVATE1:/, "")))).token || "";
  } catch {
  }
  const u = {
    id: `msg_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    sender: {
      uid: f.currentUser.uid,
      name: f.currentUser.name,
      avatar: f.currentUser.avatar
    },
    type: "server_invite",
    content: `邀请你加入【${s}】聊天室`,
    meta: {
      inviteOrigin: t.origin,
      inviteRoom: t.room,
      inviteRoomName: a,
      inviteServerName: s,
      inviteServerIcon: n?.icon || "🏠",
      inviteToken: c,
      inviteTargetUid: e.uid,
      inviteCode: r
    },
    timestamp: Date.now()
  }, d = In(e.uid);
  await er(u, {
    ...t,
    channel: d,
    name: `私聊 / ${e.name}`
  }), Ts(e.uid);
}
async function gc(e) {
  if (!/^[a-f0-9]{32}$/.test(e)) throw new Error("成员标识无效");
  await _n("/api/v1/members/" + e, "DELETE");
}
function Ge(e) {
  return { ...e, channel: A.channel };
}
function jt(e) {
  const t = new URL(vn(e)), i = e.channel || "main";
  return i !== "main" && t.searchParams.set("channel", i), t.href;
}
function Re(e) {
  return lr(e.uid, jt(e), e.room);
}
function Ae(e) {
  return ie.isInstalled("chat") && f.currentUser.uid === e.uid && f.serverUrl === jt(e) && (e.channel || "main") === A.channel && f.currentRoomId === e.room && v.room !== null && T(v.room) === T(e);
}
function yc() {
  const e = v.room && Ge(v.room);
  return e && Ae(e) ? { scope: Re(e), channel: e.channel } : null;
}
function In(e) {
  return "dm_" + [f.currentUser.uid, e].sort().join("__");
}
function wc(e) {
  if (!e.startsWith("dm_")) return;
  const t = e.slice(3).split("__");
  if (t.length === 2)
    return t.find((i) => i !== f.currentUser.uid);
}
function Ts(e) {
  const t = v.room;
  if (!t || !e || e === f.currentUser.uid) return;
  const i = In(e);
  i === A.channel && Ae(Ge(t)) || Dt(jt({ ...t, channel: i }), t.room, !0) && (A.channel = i, Oe());
}
async function Us(e) {
  const t = v.room;
  if (!t) throw new Error("未配置私有服务器");
  await X({ ...t }, "/api/v1/friends/request", "POST", { toUid: e }, AbortSignal.timeout(15e3));
}
async function Ps(e, t) {
  const i = v.room;
  if (!i) throw new Error("未配置私有服务器");
  await X({ ...i }, "/api/v1/friends/respond", "POST", { id: e, accept: t }, AbortSignal.timeout(15e3));
}
function Tn(e) {
  const t = v.room;
  if (!(!t || !A.rooms.some((i) => i.id === e))) {
    if (e === A.channel && Ae(Ge(t))) {
      Li();
      return;
    }
    Dt(jt({ ...t, channel: e }), t.room, He === T(t) && f.currentUser.uid === t.uid) && (A.channel = e, Oe());
  }
}
async function bc(e, t) {
  const i = v.room;
  if (!i) throw new Error("未配置");
  const r = T(i), n = { ...i };
  await X(n, t ? `/api/v1/rooms/${encodeURIComponent(t)}` : "/api/v1/rooms", "POST", e, AbortSignal.timeout(15e3));
  const o = await X(n, "/api/v1/rooms", "GET", void 0, AbortSignal.timeout(15e3));
  if (v.room && T(v.room) === r && f.currentUser.uid === i.uid) {
    const s = Oi(o.rooms), a = o.spaces ? Ni(o.spaces) : void 0;
    A.rooms = s, a && v.room && T(v.room) === r && f.currentUser.uid === i.uid && (A.spaces = a);
  }
}
async function vc(e) {
  if (e === "main") throw new Error("默认房间不可移除");
  const t = v.room;
  if (!t) throw new Error("未配置");
  const i = T(t);
  await X({ ...t }, `/api/v1/rooms/${encodeURIComponent(e)}`, "DELETE", void 0, AbortSignal.timeout(15e3)), !(!v.room || T(v.room) !== i) && (A.rooms = A.rooms.filter((r) => r.id !== e), A.channel === e && Tn("main"));
}
async function Sc(e, t) {
  const i = v.room;
  if (!i) throw new Error("未配置");
  const r = T(i);
  await X({ ...i }, t ? `/api/v1/spaces/${encodeURIComponent(t)}` : "/api/v1/spaces", "POST", e, AbortSignal.timeout(15e3)), v.room && T(v.room) === r && await Un(i);
}
async function Ac(e) {
  if (e === "hub_main") throw new Error("默认空间不可移除");
  const t = v.room;
  if (!t) throw new Error("未配置");
  const i = T(t), r = A.channel;
  await X({ ...t }, `/api/v1/spaces/${encodeURIComponent(e)}`, "DELETE", void 0, AbortSignal.timeout(15e3)), !(!v.room || T(v.room) !== i || f.currentUser.uid !== t.uid) && (await Un(t), !(!v.room || T(v.room) !== i || f.currentUser.uid !== t.uid) && A.channel === r && !A.rooms.some((n) => n.id === r) && Tn("main"));
}
async function Un(e) {
  const t = await X({ ...e }, "/api/v1/spaces", "GET", void 0, AbortSignal.timeout(15e3));
  if (!v.room || T(v.room) !== T(e) || f.currentUser.uid !== e.uid) return;
  const i = Ni(t.spaces), r = Oi(t.rooms);
  A.spaces = i, v.room && T(v.room) === T(e) && f.currentUser.uid === e.uid && (A.rooms = r);
}
let Pn = "", He = "";
const hr = new bs({
  active: Ae,
  visible: () => f.visible,
  poll: Ms,
  started: () => {
    f.connecting = !f.connected, A.syncing = !0;
  },
  idle: () => {
    A.syncing = !1;
  },
  classify: (e, t) => e instanceof st && e.status === 404 && (t.channel || "main") !== "main" ? "missing-room" : e instanceof st && [401, 403].includes(e.status) ? "auth" : "retry",
  failed: (e, t, i) => {
    e === "missing-room" ? (A.channel = "main", A.status = "房间已移除，正在返回综合讨论") : e === "auth" ? (He = "", xi(), A.role = "", f.error = "访问凭证已失效、过期或不属于此房间，请重新导入邀请", f.connected = !1, f.connecting = !1) : i >= 2 && (f.connected = !1, f.connecting = !1, f.error = `${t}失败或超时，记录与待发队列保留，将自动重试。若持续失败，请关闭旧标签页后重试，并检查服务配置。`, A.status = f.error);
  },
  restart: () => Oe()
});
function Li() {
  const e = v.room && Ge(v.room);
  e && !hr.stopped && Pn === T(e) && Ae(e) || Oe();
}
function Mn() {
  hr.cancel();
}
function Mt() {
  ++tr, Mn(), He = "", xi(), f.connected = !1, f.connecting = !1, A.role = "";
}
function Oe() {
  if (!ie.isInstalled("chat")) {
    Mt(), f.visible = !1, f.error = "", A.status = "实验性组件默认关闭，请先在商店手动启用";
    return;
  }
  const e = v.room && Ge(v.room), t = !!e && He === T(e) && f.currentUser.uid === e.uid;
  if (t ? Mn() : Mt(), !e) {
    A.status = "尚未读取到聊天室配置，请在此窗口设置中检查", f.error = "";
    return;
  }
  if (e.uid !== f.currentUser.uid) {
    f.error = A.status = "邀请 UID 与本机不一致，请重新导入属于本机的邀请";
    return;
  }
  f.transportMode = "relay", Dt(jt(e), e.room, t) && (Pn = T(e), f.connected || (A.status = "正在同步"), hr.start(e));
}
async function Ms(e, t) {
  const i = Re(e), r = e.channel || "main", n = await t.wait(() => Fo(i)), o = Ti(f.currentUser.avatar, ae.avatarUrl), s = f.currentUser.activity || ps(), a = f.shareActivity !== !1 && s?.title ? `&act_type=${encodeURIComponent(s.type || "")}&act_title=${encodeURIComponent(s.title || "")}&act_url=${encodeURIComponent(s.url || "")}` : "", c = t.visible ? "&wait=6" : "", u = `/api/v1/sync?after=${n}&avatar=${encodeURIComponent(o)}&name=${encodeURIComponent(f.currentUser.name.slice(0, 100))}${a}${c}`;
  t.phase("连接私有服务器");
  const d = await t.wait(() => X(e, u, "GET", void 0, t.signal));
  if (!t.current()) return;
  t.phase("校验同步页");
  let h;
  try {
    h = As(d, e.uid, n, Date.now());
  } catch (m) {
    throw t.current() && xi(), m;
  }
  if (t.current() && (t.phase("保存同步记录"), await t.wait(() => Vo(i, h.messages, h.next)), !!t.current())) {
    try {
      await t.wait(() => An(i, h.messages.filter((m) => m.sender.uid === e.uid).map((m) => m.id), je));
    } catch {
      t.current() && (Y.value = "无法保存消息的发送确认，请检查浏览器存储。");
    }
    if (t.current() && (t.phase("应用同步状态"), !!Es(h, { scope: i, channel: r, cursor: n, now: Date.now() }, t, {
      chat: f,
      service: A,
      authenticated: () => {
        He = T(e);
      },
      publish: (m, g, w) => {
        for (const b of [...ni]) {
          if (!w()) return;
          try {
            b(m, g);
          } catch {
            console.warn("[PrivateChat] message listener failed");
          }
        }
      },
      notify: gs
    }) && t.current()))
      return t.phase("处理待发消息"), hi.flush(e), { hasMore: h.hasMore };
  }
}
async function Qt(e) {
  const t = v.room && Ge(v.room);
  if (!t || !Ae(t))
    return Y.value = "未配置此房间的私有服务器，未发送", !1;
  e.sender && (e.sender.avatar = Ti(f.currentUser.avatar, ae.avatarUrl), f.currentUser.name && (e.sender.name = f.currentUser.name));
  const i = Lt(e);
  if (!i || i.type === "system")
    return Y.value = "消息格式无效，未发送", !1;
  const r = Ct(Wt(t), i);
  if (r)
    return Y.value = r, !1;
  const n = { ...t };
  try {
    return await Ii(Re(n), [i]), await Sn(Re(n), i, [je]), Ae(n) && !f.messages.some((o) => o.id === i.id) && f.messages.push(i), Y.value = "", hi.flush(n), !0;
  } catch {
    return Y.value = "消息未能保存到待发队列，请勿刷新，检查存储后重试", !1;
  }
}
let $r = !1;
function Rs() {
  $r || ($r = !0, Pe(() => [ie.isInstalled("chat"), JSON.stringify(v.room)], () => {
    const e = v.room;
    A.members = [], A.rooms = [], A.roomsSupported = !1, A.spaces = [], A.spacesSupported = !1, xi(), A.channel = "main", (!e || !ie.isInstalled("chat")) && (f.visible = !1, A.members = []), Oe();
  }, { immediate: !0, flush: "sync" }), Pe(() => f.visible, (e) => {
    e && Li();
  }), Pe(() => f.currentUser.uid, () => Oe()), ie.isInstalled("chat") && v.room && lt(Re(v.room)).catch(() => {
    Y.value = "待发队列读取失败，请关闭旧标签页后重试";
  }));
}
class Os {
  constructor() {
    Rs();
  }
  connect() {
    Li();
  }
  disconnect() {
    Mt();
  }
  resetReconnectAndConnect() {
    Oe();
  }
  async retryMessage(t) {
    await Qt(t);
  }
  dispatchOutgoing(t, i) {
    if (!i) {
      Qt(t);
      return;
    }
    er(t, i).then(() => {
      pe.fetch("海狸聊天室", `已发送到 ${i.name}`, "服务器已保存，不代表成员已读。");
    }).catch((r) => {
      pe.fetch("海狸聊天室", "分享未确认", r instanceof Error ? r.message : "未确认发送结果，请检查聊天室连接。");
    });
  }
  sendWebsiteShare(t, i) {
    const r = xt(t.url);
    if (!r) {
      pe.fetch("海狸聊天室", "未发送", "只支持分享有效的 HTTP(S) 网站地址。");
      return;
    }
    const n = (t.title || "网站").slice(0, 100), o = {
      id: `msg_${crypto.randomUUID()}`,
      sender: { ...f.currentUser, activity: f.shareActivity ? f.currentUser.activity : void 0 },
      type: "website",
      content: `分享了常用网站：${n}`,
      meta: {
        linkTitle: n,
        linkUrl: r,
        linkIcon: t.icon || "",
        linkNote: (t.note || "").slice(0, 200)
      },
      timestamp: Date.now()
    };
    this.dispatchOutgoing(o, i);
  }
  async sendTextMessage(t, i) {
    const r = t.trim();
    if (!r) return !1;
    const n = {
      id: `msg_${crypto.randomUUID()}`,
      sender: { ...f.currentUser, activity: f.shareActivity ? f.currentUser.activity : void 0 },
      type: "text",
      content: r,
      timestamp: Date.now()
    };
    if (!i) return Qt(n);
    try {
      return await er(n, i), !0;
    } catch (o) {
      return pe.fetch("海狸聊天室", "分享未确认", o instanceof Error ? o.message : "未确认发送结果，请检查聊天室连接。"), !1;
    }
  }
  sendMusicShare(t, i) {
    const r = {
      id: `msg_${crypto.randomUUID()}`,
      sender: { ...f.currentUser, activity: f.shareActivity ? f.currentUser.activity : void 0 },
      type: "music",
      content: `正在听：${t.musicTitle} - ${t.musicArtist}`,
      meta: t,
      timestamp: Date.now()
    };
    this.dispatchOutgoing(r, i);
  }
  sendBiliShare(t, i) {
    const r = {
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
      meta: r,
      timestamp: Date.now()
    };
    this.dispatchOutgoing(n, i);
  }
  sendGitHubShare(t, i) {
    const r = {
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
      meta: r,
      timestamp: Date.now()
    };
    this.dispatchOutgoing(n, i);
  }
  sendBiliSeriesShare(t, i) {
    const r = {
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
    }, n = {
      id: `msg_${crypto.randomUUID()}`,
      sender: { ...f.currentUser, activity: f.shareActivity ? f.currentUser.activity : void 0 },
      type: "bili_series",
      content: `分享了B站电台系列：${t.name} (${t.count}首)`,
      meta: r,
      timestamp: Date.now()
    };
    this.dispatchOutgoing(n, i);
  }
  async sendImageMessage(t) {
    if (!t) return !1;
    const i = {
      id: `msg_${crypto.randomUUID()}`,
      sender: { ...f.currentUser, activity: f.shareActivity ? f.currentUser.activity : void 0 },
      type: "image",
      content: "[图片]",
      meta: {
        imageUrl: t
      },
      timestamp: Date.now()
    };
    return Qt(i);
  }
  sendAiHotShare(t, i) {
    const r = {
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
      meta: r,
      timestamp: Date.now()
    };
    this.dispatchOutgoing(n, i);
  }
  sendYouTubeShare(t, i) {
    const r = {
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
      meta: r,
      timestamp: Date.now()
    };
    this.dispatchOutgoing(n, i);
  }
  sendActivity(t) {
  }
  sendFriendRequest(t, i) {
    !t.uid || t.uid === f.currentUser.uid || Us(t.uid).then(() => {
      pe.fetch("海狸聊天室", `已向【${t.name}】发送好友申请`, "对方可在聊天室右上角通知中确认。");
    }).catch((r) => {
      pe.fetch("海狸聊天室", "好友申请未发送", r instanceof Error ? r.message : "请检查聊天室连接。");
    });
  }
  respondFriendRequest(t, i) {
    t.id && Ps(t.id, i).then(() => {
      pe.fetch("海狸聊天室", i ? `已通过【${t.from.name}】的好友申请` : "已忽略该申请", i ? "双方已成为好友，可随时点击私聊。" : "");
    }).catch((r) => {
      pe.fetch("海狸聊天室", "操作未完成", r instanceof Error ? r.message : "请检查网络。");
    });
  }
}
const Rn = new Os(), Ec = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  chatService: Rn
}, Symbol.toStringTag, { value: "Module" })), Ns = {
  schemaVersion: 1,
  id: "chat",
  title: "海狸聊天室",
  emoji: "💬",
  rootId: "vue-chat-dialog-root",
  settingsKeys: ["lw_chat_server_url"],
  capabilities: ["chat:message-read", "chat:message-send"],
  badgeCount: () => f.unreadCount,
  loadView: () => import("./ChatDialog-C6YK4cpW.js").then((e) => e.default),
  lifecycle: {
    isVisible: () => f.visible,
    canOpen: () => ie.isInstalled("chat"),
    open: () => {
      ie.isInstalled("chat") && (f.visible = !0, f.unreadCount = 0, ts.value && Rn.connect());
    },
    hide: () => {
      f.visible = !1;
    },
    canUnmount: () => !0
  }
};
Ne(Ns);
Ne(Po);
Ne(Co);
Ne(To);
Ne(Ao);
Ne(ko);
Ne(vo);
Ne(Eo);
function xs(e) {
  const t = e.map((i) => ({ ...i }));
  for (const i of zr()) {
    if (i.presentation !== "card" || i.showInDock === !1) continue;
    if (t.some((o) => o.id === i.id)) throw new Error("Duplicate workspace card entry");
    const r = { id: i.id, title: i.title, icon: i.icon }, n = i.dockBefore ? t.findIndex((o) => o.id === i.dockBefore) : -1;
    t.splice(n < 0 ? t.length : n, 0, r);
  }
  return t;
}
function Ls(e) {
  const t = e.map((i) => ({ ...i }));
  for (const i of zr()) {
    if (i.showInDock === !1 || i.presentation === "card") continue;
    if (t.some((o) => o.id === i.id)) throw new Error("Dock module duplicated in legacy tools");
    const r = { id: i.id, title: i.title, icon: i.icon, emoji: i.emoji }, n = i.dockBefore ? t.findIndex((o) => o.id === i.dockBefore) : -1;
    t.splice(n < 0 ? t.length : n, 0, r);
  }
  return t;
}
function Ds(e) {
  const t = e.find((i) => i.id === "daily-bilibili");
  return t ? [t, ...e.filter((i) => i !== t)] : [...e];
}
const $s = Ds(xs([])), Bs = Ls([]), On = "logicweaver_dock_custom_order", gr = "logicweaver_dock_position";
function yr(e) {
  return e === "bottom" || e === "left" || e === "right" || e === "top";
}
function Ws() {
  try {
    if (typeof localStorage < "u") {
      const e = localStorage.getItem(gr);
      if (yr(e)) return e;
    }
  } catch {
  }
  return "bottom";
}
function js(e) {
  try {
    typeof localStorage < "u" && localStorage.setItem(gr, e);
  } catch {
  }
}
function gi() {
  try {
    if (typeof localStorage < "u") {
      const e = localStorage.getItem(On);
      if (e) return JSON.parse(e) || {};
    }
  } catch {
  }
  return {};
}
function Br(e) {
  try {
    typeof localStorage < "u" && localStorage.setItem(On, JSON.stringify(e));
  } catch {
  }
}
function Nn() {
  const e = Bs.filter((i) => ie.isInstalled(i.id)), t = gi().tools;
  if (Array.isArray(t) && t.length > 0) {
    const i = new Map(e.map((n) => [n.id, n])), r = [];
    for (const n of t) {
      const o = i.get(n);
      o && (r.push(o), i.delete(n));
    }
    for (const n of i.values())
      r.push(n);
    return r;
  }
  return e;
}
function xn() {
  const e = $s.filter((i) => ie.isInstalled(i.id)), t = gi().cards;
  if (Array.isArray(t) && t.length > 0) {
    const i = new Map(e.map((n) => [n.id, n])), r = [];
    for (const n of t) {
      const o = i.get(n);
      o && (r.push(o), i.delete(n));
    }
    for (const n of i.values())
      r.push(n);
    return r;
  }
  return e;
}
const Fs = () => ({
  mounted: !1,
  get activeTargetId() {
    return on() || ce.activeId || "";
  },
  activeTools: [],
  cards: xn(),
  tools: Nn(),
  position: Ws()
}), $ = H(Fs());
typeof window < "u" && (window.addEventListener("logicweaver:dock-modules-changed", () => {
  $.tools = Nn(), $.cards = xn();
}), window.addEventListener("storage", (e) => {
  e.key === gr && yr(e.newValue) && ($.position = e.newValue);
}));
Si.onStateChange((e) => {
  $.activeTools = [...e];
});
let Ce = {};
function Xt(e, t) {
  const i = window.chrome, r = i?.runtime?.getURL ? i.runtime.getURL(t) : t, n = e.includes("newtab") || t.includes("newtab");
  if (window.location.href.includes(e) || n && (window.location.pathname.endsWith("/newtab.html") || window.location.pathname === "/newtab.html"))
    return;
  const o = (a) => {
    const u = (a.url || a.pendingUrl || "").toLowerCase();
    return n ? u.includes("newtab.html") || u.startsWith("chrome://newtab") || u.startsWith("edge://newtab") || u.startsWith("chrome-search://local-ntp") || u.includes("chrome-extension://") && u.includes("newtab") || !!(a.title && (a.title.includes("LogicWeaver 新标签页") || a.title === "新标签页" || a.title === "New Tab")) : u.includes(e.toLowerCase());
  };
  if (i?.tabs?.query) {
    i.tabs.query({ currentWindow: !0 }, (a) => {
      const c = a.find(o);
      if (c && c.id != null) {
        if (i.tabs.update(c.id, { active: !0 }), c.windowId != null && i.windows?.update)
          try {
            i.windows.update(c.windowId, { focused: !0 });
          } catch {
          }
      } else
        i.tabs.create({ url: r });
    });
    return;
  }
  const s = document.createElement("a");
  s.href = r, s.target = "_blank", s.rel = "noreferrer", document.body.appendChild(s), s.click(), s.remove();
}
const kc = {
  getSnapshot() {
    return Ot($);
  },
  update(e) {
    const { activeTargetId: t, ...i } = e;
    Object.assign($, i);
  },
  setMounted(e) {
    $.mounted = e;
  },
  setActiveTools(e) {
    $.activeTools = [...e];
  },
  addActiveTool(e) {
    $.activeTools.includes(e) || $.activeTools.push(e);
  },
  removeActiveTool(e) {
    const t = $.activeTools.indexOf(e);
    t >= 0 && $.activeTools.splice(t, 1);
  },
  triggerItem(e, t) {
    const i = typeof window < "u" ? window.location.pathname + window.location.href : "", r = i.includes("bilibili.html") || i.includes("github.html") || i.includes("aihot.html") || i.includes("youtube.html");
    if (e === "home") {
      if (r) {
        Xt("newtab.html", "newtab.html");
        return;
      }
      if (Ce.onHomeClick) {
        Ce.onHomeClick();
        return;
      }
      const n = document.getElementById("daily-toggle");
      n && n.classList.contains("active") && n.classList.remove("active");
      const o = ce.activeId;
      o && Nt(o), wo(ce.activeId), typeof window < "u" && window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      return;
    }
    if (e === "target") {
      const n = {
        "daily-bilibili": "bilibili.html",
        "card-github": "github.html",
        "daily-aihot": "aihot.html",
        "daily-youtube": "youtube.html"
      };
      if (r) {
        const s = n[t];
        s ? Xt(s, s) : Xt("newtab.html", "newtab.html");
        return;
      }
      if (Ce.onTargetClick) {
        Ce.onTargetClick(t);
        return;
      }
      const o = window;
      $.activeTargetId === t ? typeof o.exitFullscreenCard == "function" && o.exitFullscreenCard() : typeof o.enterFullscreenCard == "function" && o.enterFullscreenCard(t);
      return;
    }
    if (e === "tool") {
      const n = !!document.getElementById("vue-bili-companions-root");
      if (r && !n) {
        Xt("newtab.html", "newtab.html");
        return;
      }
      if (!["todoist", "music", "siren", "wallpaper", "stickers", "sync", "chat"].includes(t) && typeof window < "u") {
        const s = window;
        typeof s.exitFullscreenCard == "function" && s.exitFullscreenCard();
      }
      if (Ce.onToolClick) {
        Ce.onToolClick(t);
        return;
      }
      Si.toggle(t);
      return;
    }
  },
  reorderCards(e) {
    const t = new Map($.cards.map((n) => [n.id, n])), i = [];
    for (const n of e) {
      const o = t.get(n);
      o && (i.push(o), t.delete(n));
    }
    for (const n of t.values()) i.push(n);
    $.cards = i;
    const r = gi();
    Br({ ...r, cards: i.map((n) => n.id) });
  },
  reorderTools(e) {
    const t = new Map($.tools.map((n) => [n.id, n])), i = [];
    for (const n of e) {
      const o = t.get(n);
      o && (i.push(o), t.delete(n));
    }
    for (const n of t.values()) i.push(n);
    $.tools = i;
    const r = gi();
    Br({ ...r, tools: i.map((n) => n.id) });
  },
  setPosition(e) {
    yr(e) && $.position !== e && ($.position = e, js(e), typeof window < "u" && window.dispatchEvent(new CustomEvent("logicweaver:dock-position-changed", { detail: e })));
  },
  setActions(e) {
    Ce = { ...Ce, ...e };
  }
}, Ln = "active_wallpaper", wr = "_manifest.json";
function Dn() {
  return typeof navigator < "u" && typeof navigator.storage?.getDirectory == "function";
}
async function Vs(e) {
  const t = [];
  for await (const [i, r] of e.entries())
    t.push(e.removeEntry(i, { recursive: r.kind === "directory" }));
  await Promise.all(t);
}
async function qs(e, t) {
  let i = e;
  for (const r of t)
    !r || r === "." || (i = await i.getDirectoryHandle(r, { create: !0 }));
  return i;
}
async function Gs(e) {
  if (!Dn()) return !1;
  try {
    const i = await (await navigator.storage.getDirectory()).getDirectoryHandle(Ln, { create: !0 });
    await Vs(i);
    const n = await (await i.getFileHandle(wr, { create: !0 })).createWritable(), o = {
      type: e.type,
      entry: e.entry || "",
      name: e.name || "Active Wallpaper",
      properties: e.properties || {},
      updatedAt: Date.now(),
      fileCount: e.files.length
    };
    await n.write(JSON.stringify(o)), await n.close();
    for (const s of e.files) {
      const a = String(s.path || "").replace(/\\/g, "/").replace(/^\/+/, "");
      if (!a) continue;
      const c = a.split("/"), u = c.pop(), m = await (await (await qs(i, c)).getFileHandle(u, { create: !0 })).createWritable();
      await m.write(s.file), await m.close();
    }
    return !0;
  } catch (t) {
    return console.warn("[OPFS Wallpaper] 写入活跃壁纸失败，回退至 IndexedDB:", t), !1;
  }
}
async function $n(e, t = "") {
  const i = [];
  for await (const [r, n] of e.entries()) {
    if (r === wr) continue;
    const o = t ? `${t}/${r}` : r;
    if (n.kind === "file") {
      const s = await n.getFile();
      i.push({
        path: o,
        file: s,
        mime: s.type || void 0
      });
    } else if (n.kind === "directory") {
      const s = await $n(n, o);
      i.push(...s);
    }
  }
  return i;
}
async function Wr() {
  if (!Dn()) return null;
  try {
    const e = await navigator.storage.getDirectory();
    let t;
    try {
      t = await e.getDirectoryHandle(Ln, { create: !1 });
    } catch {
      return null;
    }
    let i;
    try {
      i = await t.getFileHandle(wr, { create: !1 });
    } catch {
      return null;
    }
    const n = await (await i.getFile()).text(), o = JSON.parse(n), s = await $n(t);
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
function Zt(e) {
  (!Number.isFinite(e) || e < 0) && (e = 0);
  const t = Math.floor(e / 60), i = Math.floor(e % 60);
  return String(t).padStart(2, "0") + ":" + String(i).padStart(2, "0");
}
const ei = typeof localStorage < "u" ? localStorage.getItem("bili_radio_mode") : null, Hs = () => ({
  active: !1,
  loading: !1,
  playing: !1,
  mode: ei === "order" || ei === "one" || ei === "shuffle" ? ei : "order",
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
}), M = H(Hs()), Bn = {
  getSnapshot() {
    return Ot(M);
  },
  update(e) {
    for (const t of Object.keys(e))
      M[t] !== e[t] && (M[t] = e[t]);
    if (typeof e.currentTime == "number" || typeof e.duration == "number") {
      const t = e.currentTime ?? M.currentTime, i = e.duration ?? M.duration, r = Zt(t), n = Zt(i);
      if (M.formattedCurrent !== r && (M.formattedCurrent = r), M.formattedDuration !== n && (M.formattedDuration = n), i > 0) {
        const o = Math.round(Math.min(100, Math.max(0, t / i * 100)) * 10) / 10;
        Math.abs(M.progressPercent - o) >= 0.2 && (M.progressPercent = o);
      } else
        M.progressPercent = 0;
    }
  },
  setProgress(e, t) {
    M.currentTime = e, M.duration = t;
    const i = Zt(e), r = Zt(t);
    if (M.formattedCurrent !== i && (M.formattedCurrent = i), M.formattedDuration !== r && (M.formattedDuration = r), t > 0) {
      const n = Math.round(Math.min(100, Math.max(0, e / t * 100)) * 10) / 10;
      Math.abs(M.progressPercent - n) >= 0.2 && (M.progressPercent = n);
    } else
      M.progressPercent = 0;
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
    const e = M.mode || "order", i = {
      order: "one",
      one: "shuffle",
      shuffle: "order"
    }[e] || "order";
    M.mode = i;
    try {
      localStorage.setItem("bili_radio_mode", i);
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
typeof window < "u" && (window.LogicWeaverBiliRadioTape = Bn);
let U = null, re = !1, yi = !1, At = "B站电台", R = [], F = -1, V = null, ir, Wn = {}, mt = 0, Ee = "", oi = null, jn = [], si = /* @__PURE__ */ new Set(), it = null, ai = 0, wt = Date.now(), Vi = 0;
function br() {
  oi !== null && (clearInterval(oi), oi = null);
}
function Fn(e) {
  const t = U;
  if (!t || !re || !V) return;
  const i = jn.find((r) => !si.has(r) && /^https?:\/\//i.test(r));
  if (!i || si.size >= 3) {
    br(), Ee = "音频连接中断，已尝试所有备用线路", Q();
    return;
  }
  si.add(i), it = {
    time: Number.isFinite(t.currentTime) ? t.currentTime : 0,
    paused: t.paused
  }, Ee = "网络波动，正在切换备用线路…", Q(), t.src = i, t.load(), it.paused || t.play().catch(() => {
  });
}
function Ks() {
  br(), wt = Date.now(), ai = U?.currentTime || 0, Vi = U?.buffered.length ? U.buffered.end(U.buffered.length - 1) : 0, oi = setInterval(() => {
    const e = U;
    if (!e || !re || e.paused || e.ended) {
      wt = Date.now();
      return;
    }
    const t = e.currentTime, i = e.buffered.length ? e.buffered.end(e.buffered.length - 1) : 0;
    if (t !== ai || i > Vi) {
      wt = Date.now(), ai = t, Vi = i, Ee === "网络波动，正在切换备用线路…" && (Ee = "", Q());
      return;
    }
    Date.now() - wt >= 8e3 && e.readyState < 3 && Fn();
  }, 1e3);
}
function zs() {
  U && (wt = Date.now(), ai = U.currentTime, Ee === "网络波动，正在切换备用线路…" && (Ee = "")), Q();
}
function Js() {
  const e = U;
  if (e && it) {
    const t = it;
    if (it = null, t.time > 0 && t.time < (e.duration || 1 / 0))
      try {
        e.currentTime = t.time;
      } catch {
      }
    t.paused || e.play().catch(() => {
    });
  }
  Q();
}
function Ys() {
  re && U?.error && Fn(`音频解码或网络错误 [代码: ${U.error.code}]`);
}
function tt() {
  return U || (U = new Audio(), U.id = "bili-radio-audio", U.preload = "auto", U.addEventListener("ended", Qs), U.addEventListener("timeupdate", zs), U.addEventListener("play", Q), U.addEventListener("pause", Q), U.addEventListener("loadedmetadata", Js), U.addEventListener("error", Ys), U);
}
function Qs() {
  const e = M.mode || "order";
  if (e === "one")
    U && (U.currentTime = 0, U.play().catch(() => {
    }), Q());
  else if (e === "shuffle")
    if (R.length <= 1)
      ue(0);
    else {
      let t = Math.floor(Math.random() * R.length);
      t === F && R.length > 1 && (t = (F + 1) % R.length), ue(t);
    }
  else
    ue(F + 1);
}
function Q() {
  const e = U, t = !!(e && !e.paused && !e.ended && re), i = e?.duration && Number.isFinite(e.duration) ? e.duration : V?.duration || 0, r = V?.cues?.find((o) => (e?.currentTime || 0) >= o.from && (e?.currentTime || 0) < o.to), n = Ee || r?.content || (t ? "♪ 伴奏播放中…" : V ? `已暂停 · 《${V.title}》` : "点击磁带继续播放");
  Bn.update({
    active: re,
    loading: yi,
    playing: t,
    title: V?.title || "B站电台",
    coverUrl: V?.cover || "",
    seriesName: At,
    trackIndex: F >= 0 ? F + 1 : 1,
    totalTracks: R.length || 1,
    currentTime: e?.currentTime || 0,
    duration: i,
    lyric: n
  }), re && V && nn.syncFromBiliRadio({
    playing: t,
    title: V.title || "B站电台",
    artist: V.upper || V.author || At || "哔哩哔哩电台",
    coverUrl: V.cover || "",
    currentTime: e?.currentTime || 0,
    duration: i,
    lyric: n,
    seriesName: At
  });
}
async function Xs(e) {
  if (e.streamUrl || e.url) return e;
  const t = await te.getVideoView(e.bvid);
  if (!t?.cid) throw new Error("视频信息不可用");
  const i = await te.fetchAudioStream(e.bvid, t.cid);
  if (!i.sources.length) throw new Error("没有取得视频播放地址");
  return {
    ...e,
    title: t.title || e.title,
    cover: String(t.pic || e.cover || "").replace(/^http:/, "https:"),
    upper: t.owner?.name || e.upper || e.author || "Bilibili",
    duration: Number(t.duration || e.duration || 0),
    cid: t.cid,
    streamUrl: i.sources[0],
    streamUrls: i.sources
  };
}
async function ue(e) {
  const t = Wn;
  if (!R.length || t.isCurrent?.() === !1) return;
  const i = ++mt;
  F = (e % R.length + R.length) % R.length, yi = !0, re = !0, Ee = "", br(), it = null, tt().pause(), Q();
  try {
    const r = ir ? await ir(R[F]) : await Xs(R[F]);
    if (i !== mt || t.isCurrent?.() === !1) return;
    V = r;
    const n = r.streamUrls?.length ? r.streamUrls : r.streamUrl || r.url ? [r.streamUrl || r.url] : [], o = n[0];
    if (!o) throw new Error("没有取得视频播放地址");
    jn = n, si = /* @__PURE__ */ new Set([o]), tt().src = o, Ks(), t.onReady?.(tt()), t.autoplay !== !1 && tt().play().catch((s) => console.warn("[BiliRadio] 播放失败", s)), r.bvid && !r.cues?.length && te.fetchVideoSubtitleDetails(r.bvid, r.cid).then((s) => {
      i === mt && s.ok && V && (V.cues = s.cues);
    }).catch(() => {
    });
  } catch (r) {
    if (i !== mt || t.isCurrent?.() === !1) return;
    re = !1, console.warn("[BiliRadio] 解析音轨失败", r), Ee = r instanceof Error ? r.message : "播放失败";
  } finally {
    i === mt && (yi = !1, t.isCurrent?.() === !1 && (re = !1), Q());
  }
}
const vr = {
  playQueue(e) {
    At = e.name || "B站电台", R = Array.isArray(e.items) ? e.items.map((t) => ({ ...t })) : [], ir = e.resolveTrack, Wn = { isCurrent: e.isCurrent, autoplay: e.autoplay, onReady: e.onReady }, ue(e.startIndex || 0);
  },
  playAt(e) {
    R.length && ue(e);
  },
  next() {
    if ((M.mode || "order") === "shuffle" && R.length > 1) {
      let t = Math.floor(Math.random() * R.length);
      t === F && (t = (F + 1) % R.length), ue(t);
    } else
      ue(F + 1);
  },
  prev() {
    if ((M.mode || "order") === "shuffle" && R.length > 1) {
      let t = Math.floor(Math.random() * R.length);
      t === F && (t = ((F - 1) % R.length + R.length) % R.length), ue(t);
    } else
      ue(F - 1);
  },
  toggle() {
    const e = tt();
    if (!re && !e.src) {
      R.length > 0 && ue(F >= 0 ? F : 0);
      return;
    }
    e.paused ? e.play().catch(() => {
    }) : e.pause(), Q();
  },
  seek(e) {
    const t = tt();
    Number.isFinite(t.duration) && t.duration > 0 && (t.currentTime = Math.min(100, Math.max(0, e)) / 100 * t.duration, Q());
  },
  getAudioElement() {
    return U;
  },
  getState() {
    return {
      active: re,
      loading: yi,
      name: At,
      items: R,
      index: F,
      track: V,
      currentTime: U?.currentTime || 0,
      duration: U?.duration || 0,
      playing: !!(U && !U.paused && !U.ended && re)
    };
  },
  syncTape: Q
};
typeof window < "u" && (window.LogicWeaverBiliRadioPlayer = vr);
const rr = 1024, Et = rr / 2, Ye = 64;
let L = null, ge = null, ye = null;
const jr = /* @__PURE__ */ new WeakMap();
let Fr = null, G = null, Ue = null, Rt = !1, wi = 0, rt = 0, Vr = !1;
const qi = new Uint8Array(Et), Gi = new Uint8Array(Et), Hi = new Array(128).fill(0), kt = new Array(128).fill(0), Vn = [];
for (let e = 0; e < Ye; e++) {
  const t = Math.floor(e + Math.pow(e / Ye, 3.2) * (Et - Ye)), i = Math.min(
    Et - 1,
    Math.max(t, Math.floor(e + 1 + Math.pow((e + 1) / Ye, 3.2) * (Et - Ye) - 1))
  );
  Vn.push([t, i]);
}
function Zs() {
  if (L && ge && ye) return !0;
  try {
    const e = window.AudioContext || window.webkitAudioContext;
    if (!e) return !1;
    L = new e();
    const t = L.createChannelSplitter(2);
    return ge = L.createAnalyser(), ge.fftSize = rr, ge.smoothingTimeConstant = 0.82, ye = L.createAnalyser(), ye.fftSize = rr, ye.smoothingTimeConstant = 0.82, t.connect(ge, 0), t.connect(ye, 1), !0;
  } catch (e) {
    return console.warn("[WE AudioVisualizer] AudioContext init failed:", e), !1;
  }
}
function ea(e) {
  if (!e || !Zs() || !L) return !1;
  try {
    let t = jr.get(e);
    if (t || (t = L.createMediaElementSource(e), jr.set(e, t)), Fr !== e) {
      if (ge && ye) {
        try {
          t.disconnect();
        } catch {
        }
        t.connect(ge), t.connect(ye);
      }
      t.connect(L.destination), Fr = e;
    }
    return !0;
  } catch {
    return !1;
  }
}
function qn() {
  const e = x.getAudioElement(), t = vr.getAudioElement();
  return t && !t.paused && !t.ended && t.currentTime > 0 ? t : e && !e.paused && !e.ended && e.currentTime > 0 ? e : null;
}
function ta() {
  const e = qn();
  return e && ea(e), e;
}
function bi(e) {
  if (!Rt || !Ue) return;
  if (e - wi < 33) {
    G = requestAnimationFrame(bi);
    return;
  }
  wi = e;
  const t = ta();
  if (!t || t.paused || t.ended) {
    try {
      Ue.postMessage({
        type: "WE_AUDIO_DATA",
        audio: kt
      }, "*");
    } catch {
    }
    L && L.state === "running" && L.suspend().catch(() => {
    }), G !== null && (typeof cancelAnimationFrame == "function" && cancelAnimationFrame(G), G = null);
    return;
  }
  L && L.state === "suspended" && L.resume().catch(() => {
  });
  let i = !1;
  if (ge && ye) {
    ge.getByteFrequencyData(qi), ye.getByteFrequencyData(Gi);
    for (let r = 0; r < Ye; r++) {
      const [n, o] = Vn[r];
      let s = 0, a = 0;
      for (let d = n; d <= o; d++)
        qi[d] > s && (s = qi[d]), Gi[d] > a && (a = Gi[d]);
      const c = s / 255, u = a / 255;
      Hi[r] = c, Hi[r + 64] = u, (c > 0.015 || u > 0.015) && (i = !0);
    }
  }
  if (i)
    rt = 0;
  else if (rt++, rt >= 30) {
    try {
      Ue.postMessage({
        type: "WE_AUDIO_DATA",
        audio: kt
      }, "*");
    } catch {
    }
    L && L.state === "running" && L.suspend().catch(() => {
    }), G !== null && (typeof cancelAnimationFrame == "function" && cancelAnimationFrame(G), G = null);
    return;
  }
  try {
    Ue.postMessage({
      type: "WE_AUDIO_DATA",
      audio: i ? Hi : kt
    }, "*");
  } catch {
  }
  G = requestAnimationFrame(bi);
}
function ti() {
  Rt && G === null && (rt = 0, wi = 0, G = requestAnimationFrame(bi));
}
function ia() {
  if (Vr) return;
  Vr = !0;
  const e = x.getAudioElement(), t = vr.getAudioElement();
  e && (e.addEventListener("play", ti), e.addEventListener("playing", ti)), t && (t.addEventListener("play", ti), t.addEventListener("playing", ti));
}
function Gn(e) {
  if (Ue = e, ia(), Rt) return;
  if (Rt = !0, wi = 0, rt = 0, qn())
    G = requestAnimationFrame(bi);
  else
    try {
      Ue.postMessage({
        type: "WE_AUDIO_DATA",
        audio: kt
      }, "*");
    } catch {
    }
}
function Di() {
  if (Rt = !1, rt = 0, G !== null && (typeof cancelAnimationFrame == "function" && cancelAnimationFrame(G), clearTimeout(G), G = null), L && L.state === "running" && L.suspend().catch(() => {
  }), Ue)
    try {
      Ue.postMessage({
        type: "WE_AUDIO_DATA",
        audio: kt
      }, "*");
    } catch {
    }
}
const ra = "leaf-newtab-backgrounds", na = 1, Ve = "current-background", q = "heroBackgroundHistory", qr = 30, ii = "assets/newtab-mountains.png", Gr = 450, Ki = 180 * 1024 * 1024;
let nr = [], pt = 0, ci = null, ht = null, vi = null;
function Hr(e) {
  return nr.push(e), e;
}
function Hn() {
  if (ci) {
    try {
      ci();
    } catch {
    }
    ci = null;
  }
}
function oa(e) {
  Hn();
  let t = null, i = 0, r = 0, n = 0, o = -1, s = -1;
  const a = () => {
    if (t = null, i = performance.now(), r !== o || n !== s) {
      o = r, s = n;
      try {
        e.postMessage({
          type: "WE_MOUSE_MOVE",
          x: r,
          y: n
        }, "*");
      } catch {
      }
    }
  }, c = (g) => {
    r = g.clientX, n = g.clientY;
    const w = performance.now();
    w - i >= 33 ? (t && (clearTimeout(t), t = null), a()) : t || (t = setTimeout(a, 33 - (w - i)));
  }, u = (g) => {
    try {
      e.postMessage({
        type: "WE_MOUSE_DOWN",
        x: g.clientX,
        y: g.clientY
      }, "*"), e.postMessage({ type: "WE_USER_GESTURE_UNLOCK" }, "*");
    } catch {
    }
  }, d = (g) => {
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
  }, m = () => {
    const g = document.hidden;
    try {
      e.postMessage({
        type: "WE_SET_PAUSED",
        isPaused: g
      }, "*");
    } catch {
    }
    g ? Di() : Gn(e);
  };
  window.addEventListener("pointermove", c, { passive: !0 }), window.addEventListener("mousedown", u, { passive: !0 }), window.addEventListener("mouseup", d, { passive: !0 }), window.addEventListener("click", h, { passive: !0 }), window.addEventListener("keydown", h, { passive: !0 }), document.addEventListener("visibilitychange", m), ci = () => {
    t && clearTimeout(t), window.removeEventListener("pointermove", c), window.removeEventListener("mousedown", u), window.removeEventListener("mouseup", d), window.removeEventListener("click", h), window.removeEventListener("keydown", h), document.removeEventListener("visibilitychange", m);
  };
}
function sa() {
  Di(), Hn(), nr.forEach((e) => {
    try {
      URL.revokeObjectURL(e);
    } catch {
    }
  }), nr = [];
}
function Sr() {
  return new Promise((e, t) => {
    if (typeof indexedDB > "u") {
      t(new Error("IndexedDB is not supported in this environment"));
      return;
    }
    const i = indexedDB.open(ra, na);
    i.onupgradeneeded = () => {
      const r = i.result;
      r.objectStoreNames.contains("files") || r.createObjectStore("files");
    }, i.onsuccess = () => e(i.result), i.onerror = () => t(i.error);
  });
}
async function aa(e, t = Ve) {
  const i = await Sr();
  return new Promise((r, n) => {
    const o = i.transaction("files", "readwrite");
    o.objectStore("files").put(e, t), o.oncomplete = () => {
      i.close(), r();
    }, o.onerror = () => {
      i.close(), n(o.error);
    }, o.onabort = o.onerror;
  });
}
async function ca() {
  return new Promise((e, t) => {
    if (typeof indexedDB > "u") {
      t(new Error("IndexedDB is not supported"));
      return;
    }
    const i = indexedDB.open("my-newtab-background", 1);
    i.onupgradeneeded = () => {
      const r = i.result;
      r.objectStoreNames.contains("files") || r.createObjectStore("files");
    }, i.onsuccess = () => e(i.result), i.onerror = () => t(i.error);
  });
}
async function or(e = "hero") {
  try {
    const t = await ca();
    return new Promise((i) => {
      const r = t.transaction("files", "readonly"), n = r.objectStore("files").get(e);
      n.onsuccess = () => {
        t.close(), i(n.result || null);
      }, n.onerror = () => {
        t.close(), i(null);
      }, r.oncomplete = () => t.close();
    });
  } catch {
    return null;
  }
}
async function zi(e = Ve) {
  try {
    const i = await Sr(), r = await new Promise((n, o) => {
      const s = i.transaction("files", "readonly"), a = s.objectStore("files").get(e);
      a.onsuccess = () => n(a.result || null), s.oncomplete = () => i.close(), s.onerror = () => {
        i.close(), o(s.error);
      };
    });
    if (r) return r;
  } catch {
  }
  const t = await or(e);
  return t || (e === Ve ? or("hero") : null);
}
async function Kr(e = Ve) {
  const t = await Sr();
  return new Promise((i, r) => {
    const n = t.transaction("files", "readwrite");
    n.objectStore("files").delete(e), n.oncomplete = () => {
      t.close(), i();
    }, n.onerror = () => {
      t.close(), r(n.error);
    }, n.onabort = n.onerror;
  });
}
function gt(e) {
  return new Promise((t, i) => {
    if (typeof chrome > "u" || !chrome.storage?.local?.get) {
      i(new Error("壁纸存储不可用"));
      return;
    }
    chrome.storage.local.get(e, (r) => {
      chrome.runtime?.lastError ? i(new Error("壁纸配置读取失败")) : t(r || {});
    });
  });
}
function _e(e) {
  return new Promise((t, i) => {
    if (typeof chrome > "u" || !chrome.storage?.local?.set) {
      i(new Error("壁纸存储不可用"));
      return;
    }
    chrome.storage.local.set(e, () => {
      chrome.runtime?.lastError ? i(new Error("壁纸配置保存失败")) : t();
    });
  });
}
function Ar(e) {
  return !!(e && (/^image\//i.test(e.type || "") || /^video\//i.test(e.type || "") || /\.(png|jpe?g|webp|gif|mp4|webm)$/i.test(e.name || "")));
}
function Er(e) {
  return String(e || "").replace(/\\/g, "/").replace(/^\.\//, "").replace(/^\/+/, "");
}
function la(e, t) {
  const i = String(t || "").trim().replace(/^['"]|['"]$/g, "");
  if (!i || /^(?:[a-z][a-z0-9+.-]*:|#|data:|blob:)/i.test(i)) return "";
  const [r] = i.split(/[?#]/);
  if (!r) return "";
  const n = i.startsWith("/") ? "" : Er(e).split("/").slice(0, -1).join("/"), o = `${n ? n + "/" : ""}${r.replace(/^\/+/, "")}`.split("/"), s = [];
  return o.forEach((a) => {
    !a || a === "." || (a === ".." ? s.pop() : s.push(a));
  }), s.join("/").toLowerCase();
}
function ua(e, t) {
  return t.type ? t.type : /\.html?$/i.test(e) ? "text/html" : /\.css$/i.test(e) ? "text/css" : /\.m?js$/i.test(e) ? "text/javascript" : /\.png$/i.test(e) ? "image/png" : /\.jpe?g$/i.test(e) ? "image/jpeg" : /\.webp$/i.test(e) ? "image/webp" : /\.gif$/i.test(e) ? "image/gif" : /\.mp4$/i.test(e) ? "video/mp4" : /\.webm$/i.test(e) ? "video/webm" : "application/octet-stream";
}
async function da(e) {
  const t = [];
  let i = 0;
  async function r(n, o = "", s = 0) {
    if (!(s > 4 || t.length >= Gr || i >= Ki))
      for await (const a of n.values()) {
        if (t.length >= Gr || i >= Ki) break;
        const c = Er(o ? `${o}/${a.name}` : a.name);
        if (a.kind === "file") {
          const u = await a.getFile();
          i += u.size || 0, i <= Ki && t.push({ path: c, file: u });
        } else a.kind === "directory" && await r(a, c, s + 1);
      }
  }
  return await r(e), t;
}
function fa(e) {
  return e.filter((t) => /(^|\/)index\.html?$/i.test(t.path) || /\.html?$/i.test(t.path)).sort((t, i) => {
    const r = (n) => /^index\.html?$/i.test(n.path) ? 0 : /(^|\/)index\.html?$/i.test(n.path) ? 1 : 2;
    return r(t) - r(i) || t.path.length - i.path.length;
  })[0] || null;
}
function sr(e, t = []) {
  return typeof e == "string" ? /\.(png|jpe?g|webp|gif|mp4|webm|html?)($|[?#])/i.test(e) && t.push(e) : Array.isArray(e) ? e.forEach((i) => sr(i, t)) : e && typeof e == "object" && Object.values(e).forEach((i) => sr(i, t)), t;
}
async function ma(e) {
  const t = new Map(e.map((r) => [Er(r.path).toLowerCase(), r])), i = e.filter((r) => /(^|\/)project\.json$/i.test(r.path));
  for (const r of i)
    try {
      const n = JSON.parse(await r.file.text());
      for (const o of sr(n)) {
        const s = t.get(la(r.path, o));
        if (s && Ar(s.file)) return s.file;
      }
    } catch {
    }
  return null;
}
function pa(e, t, i) {
  const r = i.filter((n) => !/\.(pkg|mpkg)$/i.test(n.path)).map((n) => ({ path: n.path, file: n.file, mime: ua(n.path, n.file) }));
  return { type: "web", name: e || "Web Wallpaper", entry: t.path, files: r };
}
async function ha(e) {
  const t = await da(e), i = fa(t);
  if (i) return pa(e.name, i, t);
  const r = await ma(t);
  return r || t.map((o) => o.file).filter(Ar).sort((o, s) => {
    const a = (c) => /\.(mp4|webm)$/i.test(c.name) ? 0 : /\.gif$/i.test(c.name) ? 1 : /^preview\./i.test(c.name) ? 2 : /cover|thumb|poster/i.test(c.name) ? 3 : 4;
    return a(o) - a(s) || s.size - o.size;
  })[0] || null;
}
function ga(e) {
  return e ? typeof e == "string" ? "自定义图片" : e.name || (e.type === "web" ? "Web Wallpaper" : "自定义背景") : "默认背景";
}
function ya(e) {
  return typeof e == "string" ? "图片" : e?.type === "web" ? "Web Wallpaper" : e?.type === "db" ? /video/i.test(e.mediaType || "") ? "视频" : "图片/GIF" : "背景";
}
function wa(e, t) {
  if (!e || !t) return !1;
  const i = e.value || e, r = t.value || t;
  if (i.workshopId && r.workshopId && String(i.workshopId) === String(r.workshopId)) return !0;
  const n = e.title || i.name || i.title, o = t.title || r.name || r.title;
  if (n && o && n === o && i.type === r.type) return !0;
  const s = { ...i, storageKey: void 0 }, a = { ...r, storageKey: void 0 };
  return JSON.stringify(s) === JSON.stringify(a);
}
const ba = {
  pauseWallpaper(e) {
    if (typeof document > "u") return;
    const t = document.querySelector("#hero-background-media video");
    t && (e ? t.paused || t.pause() : t.paused && t.play().catch(() => {
    }));
    const i = document.querySelector("#hero-background-media iframe");
    if (i?.contentWindow)
      try {
        i.contentWindow.postMessage({
          type: "WE_SET_PAUSED",
          isPaused: e,
          paused: e
        }, "*");
      } catch {
      }
    e && Di();
  },
  async loadHistory() {
    const e = await gt([q, "heroBackground"]);
    let t = Array.isArray(e[q]) ? e[q] : [];
    const i = /* @__PURE__ */ new Set(), r = [];
    for (const n of t) {
      const o = n.value?.workshopId ? `ws-${n.value.workshopId}` : n.title ? `${n.kind || ""}-${n.title}` : JSON.stringify({ ...n.value, storageKey: void 0 });
      i.has(o) || (i.add(o), r.push(n));
    }
    return r.length !== t.length && (t = r, _e({ [q]: r })), { history: t, currentValue: e.heroBackground || null };
  },
  async addHistory(e, t = null, i) {
    const r = `bg-${Date.now()}-${Math.random().toString(16).slice(2)}`;
    let n = e;
    e && typeof e == "object" && (n = { ...e, storageKey: r }), t && await aa(t, r);
    const o = await gt([q, "heroBackground"]), s = Array.isArray(o[q]) ? o[q] : [], a = {
      id: r,
      title: ga(n),
      kind: ya(n),
      createdAt: Date.now(),
      previewUrl: i || n.previewUrl || n.previewBase64,
      value: n
    }, c = [a, ...s.filter((d) => !wa(d, a))].slice(
      0,
      qr
    ), u = s.slice(qr - 1).filter((d) => d.value?.storageKey && d.value.storageKey !== o.heroBackground?.storageKey);
    return await Promise.all(u.map((d) => Kr(d.value.storageKey))), await _e({ [q]: c }), n;
  },
  async deleteHistory(e) {
    const t = await gt([q, "heroBackground"]), i = (t[q] || []).filter((r) => r.id !== e.id);
    e.value?.storageKey && await Kr(e.value.storageKey), await _e({ [q]: i }), JSON.stringify(t.heroBackground) === JSON.stringify(e.value) && await this.clearWallpaper();
  },
  async clearWallpaper() {
    const e = { type: "none" };
    await _e({ heroBackground: e });
    try {
      localStorage.setItem("lw-current-wallpaper", JSON.stringify(e));
    } catch {
    }
    await this.applyWallpaper(null);
  },
  async setMountain() {
    await _e({ heroBackground: ii });
    try {
      localStorage.setItem("lw-current-wallpaper", JSON.stringify(ii));
    } catch {
    }
    await this.applyWallpaper(ii);
  },
  async setWallpaper(e, t = null) {
    t && (ht = t), vi = e, await _e({ heroBackground: e });
    try {
      localStorage.setItem("lw-current-wallpaper", JSON.stringify(e));
    } catch {
    }
    await this.applyWallpaper(e, t);
  },
  async chooseBackgroundFile(e = "all") {
    return typeof document > "u" ? [] : new Promise((t, i) => {
      const r = document.createElement("input");
      r.type = "file", r.hidden = !0, r.multiple = !0, r.accept = e === "image" ? "image/*,.jpg,.jpeg,.png,.webp,.gif" : e === "video" ? "video/mp4,video/webm,.mp4,.webm" : "image/*,video/mp4,video/webm";
      const n = (a) => {
        r.removeEventListener("change", o), r.removeEventListener("cancel", s), r.remove(), t(a);
      }, o = () => n(Array.from(r.files || [])), s = () => n([]);
      r.addEventListener("change", o), r.addEventListener("cancel", s), document.body.appendChild(r);
      try {
        r.click();
      } catch (a) {
        r.remove(), i(a);
      }
    });
  },
  async importBackgroundFile(e, { apply: t = !0 } = {}) {
    if (!e) return null;
    let i, r = null;
    if (e.type === "web")
      r = e, i = { type: "web", name: e.name, entry: e.entry };
    else if (Ar(e))
      r = e, i = { type: "db", name: e.name, mediaType: e.type || "application/octet-stream" };
    else
      throw new Error("请选择 JPG、PNG、WebP、GIF、MP4 或 WebM 壁纸。");
    return i = await this.addHistory(i, r), t && (await _e({ heroBackground: i }), await this.applyWallpaper(i)), i;
  },
  async importWallpaperDirectory() {
    const e = window;
    if (!e.showDirectoryPicker) throw new Error("当前浏览器不支持直接选择 Wallpaper 文件夹。");
    const t = await e.showDirectoryPicker(), i = await ha(t);
    if (!i) throw new Error("文件夹中没有找到可用的 Web Wallpaper、图片、GIF、MP4 或 WebM。");
    return this.importBackgroundFile(i);
  },
  async applyWallpaper(e, t = null) {
    const i = ++pt;
    if (typeof document > "u") return;
    const r = document.getElementById("launcher"), n = document.getElementById("hero-background-media");
    if (!(!r || !n) && (sa(), n.replaceChildren(), r.style.removeProperty("--launcher-image"), !!e)) {
      if (typeof e == "string") {
        const o = typeof chrome < "u" ? chrome : null, s = e.startsWith("chrome-extension://") || e.startsWith("http") || e.startsWith("data:") ? e : o?.runtime?.getURL ? o.runtime.getURL(e) : e, a = document.createElement("img");
        a.src = s, a.alt = "", a.decoding = "async", a.fetchPriority = "high", n.appendChild(a);
        return;
      }
      if (e.type === "style") {
        const o = document.createElement("div");
        o.style.cssText = e.style || "", o.style.position = "absolute", o.style.inset = "0", n.appendChild(o);
        return;
      }
      if (e.type === "video") {
        let o = null;
        if (t?.files ? o = (t.files.find((a) => a.path === t.entry) || t.files[0])?.file || null : t instanceof Blob && (o = t), !o) {
          const s = await Wr();
          s?.files?.length && (o = (s.files.find((c) => c.path === s.entry) || s.files[0])?.file || null);
        }
        if (o instanceof Blob && i === pt) {
          const s = Hr(URL.createObjectURL(o)), a = document.createElement("video");
          a.src = s, a.autoplay = !0, a.preload = "metadata", a.loop = !0, a.muted = !0, a.defaultMuted = !0, a.volume = 0, a.setAttribute("muted", ""), a.playsInline = !0, a.disablePictureInPicture = !0, a.setAttribute("disablepictureinpicture", ""), a.setAttribute("disableremoteplayback", ""), n.appendChild(a);
          return;
        }
      }
      if (vi = e, e.type === "web") {
        let o = t || ht;
        if ((!o || o.type !== "web") && (o = await Wr(), o && o.type === "web" ? ht = o : (o = await zi(e.storageKey || Ve), o && o.type === "web" && (ht = o, Gs(o)))), i !== pt) return;
        if (o?.type === "web") {
          ht = o;
          const s = document.createElement("iframe");
          s.title = o.name || "Web Wallpaper", s.setAttribute("allow", "autoplay *"), s.allow = "autoplay";
          const a = typeof chrome < "u" ? chrome : null;
          s.src = a?.runtime?.getURL ? a.runtime.getURL("wallpaper-sandbox.html") : "wallpaper-sandbox.html";
          let c = !1;
          const u = () => {
            c || s.contentWindow?.postMessage(o, "*");
          }, d = (h) => {
            h.source === s.contentWindow && (h.data?.type === "WE_SANDBOX_READY" ? u() : h.data?.type === "WE_SANDBOX_ACK" && (c = !0));
          };
          window.addEventListener("message", d), s.onload = () => {
            u();
            let h = 0;
            const m = setInterval(() => {
              if (h++, c || h > 5 || i !== pt) {
                clearInterval(m);
                return;
              }
              u();
            }, 80);
            s.contentWindow && (oa(s.contentWindow), Gn(s.contentWindow));
          }, n.appendChild(s);
        } else
          console.warn("[WallpaperService] Web wallpaper pack not found yet, keeping state without fallback");
        return;
      }
      if (e.type === "db") {
        const o = await zi(e.storageKey || Ve);
        if (i !== pt || !(o instanceof Blob)) return;
        const s = Hr(URL.createObjectURL(o));
        if (/^video\//i.test(o.type || "") || /\.(mp4|webm)$/i.test(o.name || "")) {
          const a = document.createElement("video");
          a.src = s, a.autoplay = !0, a.preload = "metadata", a.loop = !0, a.muted = !0, a.defaultMuted = !0, a.volume = 0, a.setAttribute("muted", ""), a.playsInline = !0, a.disablePictureInPicture = !0, a.setAttribute("disablepictureinpicture", ""), a.setAttribute("disableremoteplayback", ""), n.appendChild(a);
        } else {
          const a = document.createElement("img");
          a.src = s, a.alt = "", a.decoding = "async", a.fetchPriority = "high", n.appendChild(a);
        }
      }
    }
  },
  // Caller owns and revokes this URL; never put it in the current wallpaper URL pool.
  async createLibraryPreviewUrl(e, t) {
    t?.throwIfAborted();
    const i = await zi(e || Ve);
    return t?.throwIfAborted(), i instanceof Blob ? URL.createObjectURL(i) : null;
  },
  async updateHistoryTitle(e, t) {
    const i = await gt([q]), r = Array.isArray(i[q]) ? i[q] : [];
    if (!r.some((o) => o.id === e)) throw new Error("壁纸条目已变化，请刷新");
    const n = r.map((o) => o.id === e ? { ...o, title: t.trim() || o.title } : o);
    await _e({ [q]: n });
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
        const t = await gt(["heroBackground"]);
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
        const t = await or("hero");
        t && (e = {
          type: "db",
          name: t.name || "当前壁纸",
          mediaType: t.type || "application/octet-stream"
        });
      }
      e || (e = ii);
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
    const i = e.heroBackground.newValue;
    if (vi && i && JSON.stringify(vi) === JSON.stringify(i))
      return;
    ba.applyWallpaper(i);
  }
});
typeof document < "u" && document.addEventListener("visibilitychange", () => {
  const e = document.hidden, t = document.querySelector("#hero-background-media video");
  t && (e ? t.paused || t.pause() : t.paused && t.play().catch(() => {
  }));
  const i = document.querySelector("#hero-background-media iframe");
  if (i?.contentWindow)
    try {
      i.contentWindow.postMessage({
        type: "WE_SET_PAUSED",
        isPaused: e
      }, "*");
    } catch {
    }
  e && Di();
});
function Ji(e) {
  const t = { group: "", positions: /* @__PURE__ */ Object.create(null) };
  try {
    const i = JSON.parse(e || "null");
    if (!i || typeof i != "object") return t;
    typeof i.group == "string" && (t.group = i.group);
    for (const [r, n] of Object.entries(i.positions || {})) {
      const o = n;
      !o || !Number.isFinite(o.top) || o.top < 0 || (t.positions[r] = {
        top: o.top,
        ...typeof o.anchor == "string" ? { anchor: o.anchor } : {},
        ...Number.isFinite(o.offset) ? { offset: o.offset } : {}
      });
    }
  } catch {
  }
  return t;
}
function va(e) {
  const t = /* @__PURE__ */ new Map();
  for (const i of e)
    i.group && t.set(i.group, (t.get(i.group) || 0) + 1);
  return [...t].map(([i, r]) => ({ name: i, count: r }));
}
function Sa(e, t) {
  return Math.max(0, t !== void 0 && e.offset !== void 0 ? t - e.offset : e.top);
}
const Aa = ["disabled", "aria-expanded"], Ea = {
  key: 0,
  class: "lw-select-icon"
}, ka = {
  key: 0,
  class: "lw-select-groups",
  role: "group",
  "aria-label": "按厂商浏览"
}, Ca = ["aria-pressed"], _a = ["aria-pressed", "onClick"], Ia = {
  key: 0,
  class: "lw-select-empty"
}, Ta = ["disabled", "data-select-value", "title", "aria-selected", "onClick"], Ua = { class: "lw-item-content" }, Pa = {
  key: 0,
  class: "lw-item-icon"
}, Ma = { class: "lw-item-text" }, Ra = {
  key: 0,
  class: "lw-item-check"
}, Oa = /* @__PURE__ */ zn({
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
    const i = e, r = t, n = we(!1), o = we(null), s = we(null), a = we("");
    let c = Ji(null), u = !1;
    function d() {
      try {
        c = Ji(i.memoryKey ? localStorage.getItem(i.memoryKey) : null);
      } catch {
        c = Ji(null);
      }
      a.value = c.group;
    }
    d();
    function h(C = i.memoryKey) {
      const j = s.value;
      if (!j || !u) return;
      const E = [...j.querySelectorAll("[data-select-value]")], me = j.getBoundingClientRect().top, Ke = E.find(($i) => $i.getBoundingClientRect().bottom > me);
      if (c.group = a.value, c.positions[a.value] = {
        top: j.scrollTop,
        anchor: Ke?.dataset.selectValue,
        offset: Ke ? Ke.getBoundingClientRect().top - me : void 0
      }, C)
        try {
          localStorage.setItem(C, JSON.stringify(c));
        } catch {
        }
    }
    async function m() {
      u = !1, await Xn();
      const C = s.value;
      if (!n.value || !C) return;
      const j = [...C.querySelectorAll("[data-select-value]")], E = c.positions[a.value], me = j.find(($i) => $i.dataset.selectValue === (E?.anchor ?? String(i.modelValue))), Ke = me ? me.getBoundingClientRect().top - C.getBoundingClientRect().top + C.scrollTop : void 0;
      C.scrollTop = E ? Sa(E, Ke) : Math.max(0, (Ke ?? 0) - C.clientHeight / 2), u = y.value.length > 0;
    }
    function g() {
      h(), n.value = !1;
    }
    async function w(C) {
      C !== a.value && (h(), a.value = C, await m(), h());
    }
    const b = Ie(() => i.options.map((C) => typeof C == "object" && C !== null ? C : { value: C, label: String(C) })), S = Ie(() => i.grouped ? va(b.value) : []), y = Ie(() => a.value && i.grouped ? b.value.filter((C) => C.group === a.value) : b.value);
    Pe(() => i.memoryKey, (C, j) => {
      h(j), d(), n.value && m();
    }), Pe(b, () => {
      a.value && S.value.length && !S.value.some((C) => C.name === a.value) && (a.value = ""), n.value && m();
    }, { flush: "post" }), Jn(() => h());
    const k = Ie(() => b.value.find((C) => String(C.value) === String(i.modelValue))), _ = Ie(() => k.value?.label ?? i.placeholder);
    function K() {
      if (!i.disabled) {
        if (n.value) {
          g();
          return;
        }
        b.value.length && a.value && !S.value.some((C) => C.name === a.value) && (a.value = ""), n.value = !0, m();
      }
    }
    function O(C) {
      C.disabled || i.disabled || (g(), String(C.value) !== String(i.modelValue) && (r("update:modelValue", C.value), r("change", C.value)));
    }
    function W(C) {
      !n.value || !o.value || o.value.contains(C.target) || g();
    }
    function P(C) {
      n.value && C.key === "Escape" && g();
    }
    return Yn(() => {
      document.addEventListener("pointerdown", W, !0), window.addEventListener("keydown", P);
    }), Qn(() => {
      document.removeEventListener("pointerdown", W, !0), window.removeEventListener("keydown", P);
    }), (C, j) => (ne(), oe("div", {
      ref_key: "containerRef",
      ref: o,
      class: Ft(["lw-custom-select", [`size-${e.size}`, { "is-open": n.value, "is-disabled": e.disabled }]])
    }, [
      xe("button", {
        type: "button",
        class: "lw-select-trigger",
        disabled: e.disabled,
        "aria-expanded": n.value,
        onClick: K
      }, [
        k.value?.icon ? (ne(), oe("span", Ea, Le(k.value.icon), 1)) : ze("", !0),
        xe("span", {
          class: Ft(["lw-select-label", { "is-placeholder": !k.value }])
        }, Le(_.value), 3),
        j[2] || (j[2] = xe("span", {
          class: "lw-select-chevron",
          "aria-hidden": "true"
        }, "▾", -1))
      ], 8, Aa),
      n.value ? (ne(), oe("div", {
        key: 0,
        class: Ft(["lw-select-dropdown", { "is-grouped": e.grouped }])
      }, [
        S.value.length ? (ne(), oe("div", ka, [
          xe("button", {
            type: "button",
            "aria-pressed": !a.value,
            onClick: j[0] || (j[0] = (E) => w(""))
          }, "全部 · " + Le(b.value.length), 9, Ca),
          (ne(!0), oe(kr, null, Cr(S.value, (E) => (ne(), oe("button", {
            key: E.name,
            type: "button",
            "aria-pressed": a.value === E.name,
            onClick: (me) => w(E.name)
          }, Le(E.name) + " · " + Le(E.count), 9, _a))), 128))
        ])) : ze("", !0),
        xe("div", {
          ref_key: "listRef",
          ref: s,
          class: "lw-select-list",
          role: "listbox",
          onScrollPassive: j[1] || (j[1] = (E) => h())
        }, [
          y.value.length ? ze("", !0) : (ne(), oe("div", Ia, " 暂无可用选项 ")),
          (ne(!0), oe(kr, null, Cr(y.value, (E) => (ne(), oe("button", {
            key: String(E.value),
            type: "button",
            class: Ft(["lw-select-item", {
              "is-active": String(E.value) === String(e.modelValue),
              "is-disabled": E.disabled
            }]),
            disabled: E.disabled,
            "data-select-value": String(E.value),
            title: E.label,
            role: "option",
            "aria-selected": String(E.value) === String(e.modelValue),
            onClick: (me) => O(E)
          }, [
            xe("span", Ua, [
              E.icon ? (ne(), oe("span", Pa, Le(E.icon), 1)) : ze("", !0),
              xe("span", Ma, Le(E.label), 1)
            ]),
            String(E.value) === String(e.modelValue) ? (ne(), oe("span", Ra, "✓")) : ze("", !0)
          ], 10, Ta))), 128))
        ], 544)
      ], 2)) : ze("", !0)
    ], 2));
  }
}), Cc = /* @__PURE__ */ ro(Oa, [["__scopeId", "data-v-24f4c9d8"]]);
function _c(e, t) {
  if (document.getElementById(e)) return;
  const i = document.createElement("style");
  i.id = e, i.textContent = t, document.head.appendChild(i);
}
export {
  Ha as $,
  Ya as A,
  M as B,
  Cc as C,
  Rn as D,
  Sr as E,
  Gs as F,
  ii as G,
  yr as H,
  uc as I,
  Fi as J,
  di as K,
  Ja as L,
  fc as M,
  v as N,
  vr as O,
  as as P,
  x as Q,
  f as R,
  Qt as S,
  A as T,
  Or as U,
  yc as V,
  ba as W,
  dc as X,
  Ur as Y,
  en as Z,
  tn as _,
  go as a,
  qa as a0,
  Ga as a1,
  Va as a2,
  mo as a3,
  Ka as a4,
  In as a5,
  ki as a6,
  Tn as a7,
  Ts as a8,
  Sc as a9,
  sc as aA,
  ac as aB,
  rc as aC,
  tc as aD,
  ps as aE,
  wc as aF,
  st as aG,
  _s as aH,
  pc as aI,
  Is as aJ,
  gc as aK,
  Ec as aL,
  bc as aa,
  Ac as ab,
  vc as ac,
  cr as ad,
  It as ae,
  jo as af,
  Qa as ag,
  dn as ah,
  Xa as ai,
  Za as aj,
  lr as ak,
  Te as al,
  Xi as am,
  ts as an,
  cc as ao,
  lc as ap,
  ns as aq,
  Y as ar,
  an as as,
  ec as at,
  xt as au,
  ic as av,
  nc as aw,
  hc as ax,
  mc as ay,
  oc as az,
  so as b,
  te as c,
  fs as d,
  oo as e,
  Yr as f,
  Kr as g,
  nn as h,
  p as i,
  be as j,
  ja as k,
  I as l,
  kc as m,
  pe as n,
  ce as o,
  De as p,
  za as q,
  Bn as r,
  ar as s,
  ae as t,
  So as u,
  wo as v,
  $ as w,
  Fa as x,
  _c as y,
  l as z
};
