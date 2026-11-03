import { c as Or, w as Mt, h as G, r as se, l as qi } from "./window-manager.store-DgNn9Rtk.js";
import { r as L, x as ui, a as Rt, y as _e, b as Se } from "./vendor-vue-wIH4jcna.js";
import { c as ct, S as Dr, p as $r } from "./InlineEditStatus.vue_vue_type_style_index_0_scoped_28642927_lang-BiNio4cP.js";
import { t as lt, p as xr } from "./module-state-BmW4SrQd.js";
import { Q as P, a as Ht } from "./search.service-B8FaDQLd.js";
import { R as Lr } from "./read-session-DQk1qcgF.js";
const Ve = "notificationHistoryV1", Gi = 200, Br = 30 * 864e5;
function fi(e) {
  if (e?.type === "todoist-task" && typeof e.taskId == "string" && /^[A-Za-z0-9_-]{1,100}$/.test(e.taskId)) return { type: e.type, taskId: e.taskId };
  if (e?.type === "module" && typeof e.moduleId == "string" && /^[a-z][a-z0-9-]{0,60}$/.test(e.moduleId)) return { type: e.type, moduleId: e.moduleId };
  if (e?.type === "bili-messages") return { type: e.type };
  if (e?.type === "bili-video") {
    if (typeof e.bvid == "string" && /^BV[A-Za-z0-9]{10}$/.test(e.bvid)) return { type: e.type, bvid: e.bvid };
    if (typeof e.aid == "string" && /^[1-9][0-9]{0,19}$/.test(e.aid)) return { type: e.type, aid: e.aid };
  }
  if (e?.type === "github-repository" && typeof e.fullName == "string" && e.fullName.length <= 240 && /^[\w.-]+\/[\w.-]+$/.test(e.fullName) && !e.fullName.split("/").some((t) => t === "." || t === "..")) return { type: e.type, fullName: e.fullName };
}
function jr(e) {
  if (typeof e == "string")
    try {
      const t = new URL(e);
      if (t.protocol !== "https:" || t.username || t.password || t.port || !["bilibili.com", "www.bilibili.com", "m.bilibili.com"].includes(t.hostname)) return;
      const i = /^\/video\/(BV[A-Za-z0-9]{10}|av[1-9][0-9]{0,19})\/?$/.exec(t.pathname);
      if (i) return i[1].startsWith("BV") ? { type: "bili-video", bvid: i[1] } : { type: "bili-video", aid: i[1].slice(2) };
    } catch {
    }
}
function Ki(e) {
  const t = /* @__PURE__ */ new Map();
  for (const i of e.matchAll(/https:\/\/[^\s<>"']+/g)) {
    const r = jr(i[0].replace(/[)）。，,;；]+$/, ""));
    r && t.set(JSON.stringify(r), r);
  }
  return t.size === 1 ? t.values().next().value : void 0;
}
function xe(e, t) {
  return typeof e != "string" ? "" : e.slice(0, 6e3).replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g, "").replace(/\bBearer\s+[A-Za-z0-9._~+\/-]+=*/gi, "Bearer [已隐藏]").replace(/\b(?:ghp_|github_pat_|sk-)[A-Za-z0-9_-]{8,}/g, "[已隐藏]").replace(/((?:token|password|passwd|secret|api[_-]?key|authorization|cookie)\s*[:=]\s*)[^\s,;]+/gi, "$1[已隐藏]").replace(/https?:\/\/[^\s<>"']+/gi, (i) => {
    try {
      const r = new URL(i);
      return r.username = "", r.password = "", r.search = "", r.hash = "", r.href;
    } catch {
      return "[链接]";
    }
  }).slice(0, t);
}
function zi(e) {
  if (!e || typeof e.id != "string" || !/^[A-Za-z0-9_:-]{1,200}$/.test(e.id) || typeof e.title != "string" || !Number.isFinite(e.createdAt) || !["info", "success", "warning", "error"].includes(e.level)) throw new Error("Invalid notification record");
  let t = fi(e.target);
  return e.appType === "bili" && (!t || t.type === "bili-messages") && (t = Ki([e.title, e.subtitle, e.message].filter((i) => typeof i == "string").join(" ")) || t), { id: e.id, appType: xe(e.appType, 40), appName: xe(e.appName, 60), title: xe(e.title, 160), subtitle: xe(e.subtitle, 240), message: xe(e.message, 2e3), level: e.level, createdAt: e.createdAt, read: e.read === !0, target: t };
}
function Hi(e) {
  if (e == null) return { version: 0, items: [] };
  if (!e || !Number.isSafeInteger(e.version) || e.version < 0 || !Array.isArray(e.items) || e.items.length > Gi) throw new Error("Invalid notification history");
  const t = Date.now();
  return { version: e.version, items: e.items.map(zi).filter((i) => i.createdAt >= t - Br && i.createdAt <= t + 6e4).sort((i, r) => r.createdAt - i.createdAt) };
}
let Ii = Promise.resolve();
function Ce(e, t) {
  const i = Ii.then(async () => {
    if (typeof chrome > "u" || !chrome.storage?.local)
      throw new Error("Chrome storage API unavailable");
    const r = await chrome.storage.local.get(Ve), n = Hi(r[Ve]);
    if (e === "list")
      return n;
    if (e === "append") {
      const s = zi(t);
      s.createdAt = Date.now(), s.read = !1, n.items.some((o) => o.id === s.id) || n.items.unshift(s), n.items = n.items.slice(0, Gi);
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
    return n.version++, await chrome.storage.local.set({ [Ve]: n }), n;
  });
  return Ii = i.catch(() => {
  }), i;
}
const E = L({
  isOpen: !1,
  loading: !1,
  saving: !1,
  error: "",
  version: -1,
  items: []
}), zs = ui(() => E.items.filter((e) => !e.read).length);
let Ti = !1;
function pe(e) {
  e.version < E.version || (E.version = e.version, E.items = e.items);
}
const Wr = {
  state: E,
  start() {
    Ti || (Ti = !0, typeof chrome < "u" && chrome.storage?.onChanged && chrome.storage.onChanged.addListener((e, t) => {
      if (!(t !== "local" || !e[Ve]))
        try {
          pe(Hi(e[Ve].newValue));
        } catch {
          E.error = "通知历史格式异常，未覆盖当前记录。";
        }
    }), this.refresh());
  },
  async refresh() {
    E.loading = !0;
    try {
      const e = await Ce("list");
      pe(e), E.error = "";
    } catch {
      E.error = "通知历史读取失败。请点击“重新读取”重试。";
    } finally {
      E.loading = !1;
    }
  },
  open() {
    this.start(), E.isOpen = !0, this.refresh();
  },
  close() {
    E.isOpen = !1;
  },
  toggle() {
    E.isOpen ? this.close() : this.open();
  },
  async markRead(e) {
    if (!E.saving) {
      E.saving = !0;
      try {
        const t = await Ce("read", e);
        pe(t), E.error = "";
      } catch {
        E.error = "标记已读未确认，请重试。";
      } finally {
        E.saving = !1;
      }
    }
  },
  async markAllRead() {
    if (!E.saving) {
      E.saving = !0;
      try {
        const e = await Ce("read-all");
        pe(e), E.error = "";
      } catch {
        E.error = "全部标记已读未确认，请重试。";
      } finally {
        E.saving = !1;
      }
    }
  },
  async remove(e) {
    if (!E.saving) {
      E.saving = !0;
      try {
        const t = await Ce("remove", e);
        pe(t), E.error = "";
      } catch {
        E.error = "删除通知未确认，请重试。";
      } finally {
        E.saving = !1;
      }
    }
  },
  async clear() {
    if (!E.saving) {
      E.saving = !0;
      try {
        const e = await Ce("clear");
        pe(e), E.error = "";
      } catch {
        E.error = "清空通知未确认，请重试。";
      } finally {
        E.saving = !1;
      }
    }
  },
  async activate(e) {
    await this.markRead(e.id), e.target && await this.openTarget(e.target);
  },
  async openTarget(e) {
    const t = fi(e);
    if (t)
      try {
        if (t.type === "todoist-task") {
          const { openTodoistTask: i } = await import("./task-navigation-CFuqS02f.js");
          i(t.taskId);
        } else if (t.type === "github-repository") {
          const { githubRepoDetailController: i } = await import("./search.service-B8FaDQLd.js").then((r) => r.a2);
          i.open(t.fullName);
        } else if (t.type === "bili-video") {
          const { biliMiniPlayerController: i } = await Promise.resolve().then(() => Jn);
          await i.openVideo({ bvid: t.bvid, aid: t.aid });
        } else if (t.type === "bili-messages") {
          const { biliMessagePanelController: i } = await import("./message-panel-store-DZYtL4Vj.js");
          i.openPanel();
        } else {
          const { getDockModule: i } = await import("./window-manager.store-DgNn9Rtk.js").then((n) => n.m);
          if (!i(t.moduleId)) throw new Error();
          const { windowManagerController: r } = await import("./window-manager.store-DgNn9Rtk.js").then((n) => n.n);
          r.open(t.moduleId);
        }
        this.close();
      } catch {
        E.error = "通知对应页面暂不能打开，记录已保留。";
      }
  }
};
function Vr(e) {
  Wr.start(), Ce("append", e).then((t) => pe(t)).catch(() => {
    E.error = "有一条通知未获持久保存确认。";
  });
}
const ie = L([]), dt = /* @__PURE__ */ new Map();
function Fr(e, t) {
  return e.history !== void 0 ? e.history : e.level === "warning" || e.level === "error" || /失败|错误|异常|未确认|未获确认|未保存|无法|不可用|拒绝|超时|警告|到期|时间已到/.test(t) ? !0 : /复制成功|已复制|保存成功|已保存|设置成功|已更新设置|配置已更新|已设为|已取消|已切换/.test(t) || /^(正在|开始读取|加载中|同步中)/.test(t) ? !1 : e.appType === "chat" || e.appType === "bili" || /提醒|任务已创建|任务完成|已完成任务|任务结果|下载完成|新消息|新私信|新回复|新提及|有可用更新/.test(t);
}
const Pi = {
  chat: { name: "海狸聊天室", icon: "assets/icon-48.png", action: "查看消息" },
  bili: { name: "哔哩哔哩", icon: "assets/bilibili.svg", action: "查看消息" },
  phone: { name: "手机文件", icon: "assets/nav-traffic.svg", action: "复制文件" },
  fetch: { name: "LogicWeaver", icon: "assets/icon-48.png", action: "" }
};
function kt(e) {
  const t = ie.find((i) => i.id === e);
  !t || t.closing || (t.closing = !0, window.setTimeout(() => {
    const i = ie.findIndex((r) => r.id === e);
    i >= 0 && ie.splice(i, 1);
  }, 260));
}
function qr() {
  for (const e of ie) kt(e.id);
}
function Ji(e) {
  if (!e) return null;
  const t = e.appType || "fetch", i = Pi[t] || Pi.fetch, r = String(e.title || "新消息通知"), n = String(e.subtitle || ""), s = String(e.message || ""), o = fi(e.target) || (t === "bili" ? Ki(`${r} ${n} ${s}`) : void 0), a = Math.max(500, Number(e.duration) || 7e3), c = String(e.id || `${t}_${r}_${n}_${s}`).trim(), u = Date.now();
  for (const [A, w] of dt)
    u - w > 3e4 && dt.delete(A);
  const f = e.id ? 200 : a <= 4e3 ? 1200 : 3e3, p = dt.get(c);
  if (p && u - p < f || ie.some((A) => A.fingerprint === c && !A.closing)) return null;
  dt.set(c, u);
  const h = `toast_${crypto.randomUUID()}`, g = {
    id: h,
    fingerprint: c,
    appType: t,
    appName: String(e.appName || i.name),
    icon: String(e.icon || i.icon),
    title: r,
    subtitle: n,
    message: s,
    actionLabel: e.actionLabel === void 0 ? i.action : String(e.actionLabel || ""),
    showActions: e.showActions !== !1,
    duration: a,
    onClick: typeof e.onClick == "function" ? e.onClick : null,
    closing: !1,
    target: o
  };
  ie.push(g);
  const y = r + " " + n + " " + s;
  if (Fr(e, y)) {
    const A = e.level || (/失败|错误|异常|未确认|未获确认|无法|超时/.test(y) ? "error" : "info"), w = o || (t === "chat" ? { type: "module", moduleId: "chat" } : void 0);
    Vr({ id: h, appType: t, appName: g.appName, title: r, subtitle: n, message: s, level: A, createdAt: u, read: !1, target: w });
  }
  const b = ie.filter((A) => !A.closing);
  return b.length > 5 && kt(b[0].id), Object.freeze({ id: h, close: () => kt(h) });
}
function Gr(e, t, i = "", r = "assets/logo.png", n = 3200) {
  return Ji({ appType: "fetch", appName: e, title: t, subtitle: i, icon: r, duration: n, showActions: !1, actionLabel: "" });
}
const Hs = Rt(ie), X = Object.freeze({
  show: Ji,
  fetch: Gr,
  close: kt,
  clear: qr,
  get size() {
    return ie.filter((e) => !e.closing).length;
  }
}), ut = "https://monster-siren.hypergryph.com/api", ft = "msFavoriteSongs";
class Ie {
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
    return Ie.instance || (Ie.instance = new Ie()), Ie.instance;
  }
  getAudioElement() {
    return this.audio;
  }
  async initStorage() {
    if (typeof chrome < "u" && chrome.storage?.local) {
      const t = await chrome.storage.local.get([ft]);
      t[ft] && (this.favorites = t[ft]);
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
    const i = await (await fetch(`${ut}/songs`, { headers: { Accept: "application/json" } })).json();
    return (i.data?.list || i.data || []).map((n) => ({
      cid: n.cid,
      name: n.name,
      artists: n.artists || [],
      albumCid: n.albumCid,
      coverUrl: n.albumCid && this.albumCoverMap.get(String(n.albumCid)) || ""
    }));
  }
  async getSirenAlbums() {
    const n = ((await (await fetch(`${ut}/albums`, { headers: { Accept: "application/json" } })).json()).data || []).map((s) => ({
      cid: s.cid,
      name: s.name,
      coverUrl: s.coverUrl
    }));
    for (const s of n)
      s.cid && s.coverUrl && this.albumCoverMap.set(String(s.cid), s.coverUrl);
    return n;
  }
  async getSirenAlbumDetail(t) {
    const i = String(t);
    if (this.albumDetailCache.has(i))
      return this.albumDetailCache.get(i);
    const n = await (await fetch(`${ut}/album/${t}/detail`, { headers: { Accept: "application/json" } })).json(), s = n.data?.songs || [], o = n.data?.coverUrl || "", a = s.map((c) => ({
      cid: c.cid,
      name: c.name,
      artists: c.artists || c.artistes || [],
      albumCid: t,
      coverUrl: o
    }));
    return this.albumDetailCache.set(i, a), a;
  }
  async getSirenSongUrl(t) {
    const r = await (await fetch(`${ut}/song/${t}`, { headers: { Accept: "application/json" } })).json();
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
    !t.coverUrl && t.albumCid && (t.coverUrl = this.albumCoverMap.get(String(t.albumCid)) || ""), this.state.currentSong = t, this.state.queue.some((s) => String(s.cid) === String(t.cid)) || this.state.queue.push(t), this.state.queueIndex = this.state.queue.findIndex((s) => String(s.cid) === String(t.cid));
    try {
      let s = "";
      if (t.isNetease && t.neteaseId ? s = await P.getSongAudioUrl(t.neteaseId) : s = (await this.getSirenSongUrl(t.cid)).sourceUrl, !n()) return !1;
      if (s)
        return this.audio.src = s, i.autoplay !== !1 && await this.audio.play(), n() ? (this.state.playing = !this.audio.paused, this.notify(), !0) : !1;
    } catch (s) {
      if (!n()) return !1;
      console.error("[MusicService] Play song failed:", s), this.state.playing = !1, this.notify();
    }
    return !1;
  }
  async playNeteaseSong(t, i = {}) {
    if (!t || i.isCurrent?.() === !1) return !1;
    P.addRecentSong(t);
    const r = (t.ar || t.artists || []).map((o) => typeof o == "string" ? o : o.name), n = t.al?.picUrl || t.album?.picUrl || t.picUrl || t.coverUrl || "", s = {
      cid: `ne_${t.id}`,
      name: t.name || "网易云音乐",
      artists: r.length ? r : ["网易云音乐"],
      coverUrl: n,
      isNetease: !0,
      neteaseId: t.id,
      rawSong: t
    };
    return this.playSong(s, i);
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
    typeof chrome < "u" && chrome.storage?.local && chrome.storage.local.set({ [ft]: this.favorites });
  }
}
const O = Ie.getInstance(), te = L({ visible: !1, pendingWrites: 0 }), ti = /* @__PURE__ */ new Set();
function Js(e) {
  return ti.add(e), () => {
    ti.delete(e);
  };
}
function Kr() {
  for (const e of ti) e();
}
async function Qs(e) {
  te.pendingWrites++;
  try {
    return await e();
  } finally {
    te.pendingWrites--;
  }
}
const Qi = "netease_cached_playlists", Yi = "netease_cached_favorites_songs", Me = /* @__PURE__ */ new Map(), Re = /* @__PURE__ */ new Map();
let Et;
function Ui(e) {
  const t = Re.get(e);
  if (t) return t;
  try {
    const i = localStorage.getItem(e), r = Me.get(e);
    if (r?.raw === i) return r.value;
    const n = i ? JSON.parse(i) : [], s = Array.isArray(n) ? n : [];
    return Me.set(e, { raw: i, value: s }), s;
  } catch {
    return [];
  }
}
function Zi() {
  clearTimeout(Et), Et = void 0;
  for (const [e, t] of Re)
    try {
      const i = JSON.stringify(t);
      localStorage.getItem(e) !== i && localStorage.setItem(e, i), Me.set(e, { raw: i, value: t });
    } catch {
      Me.delete(e);
    }
  Re.clear();
}
function Ys(e, t) {
  Re.set(e, t), Et === void 0 && (Et = setTimeout(Zi, 250));
}
function Zs(e) {
  Re.delete(e), Me.delete(e);
  try {
    localStorage.removeItem(e);
  } catch {
  }
}
typeof window < "u" && (window.addEventListener("pagehide", Zi), window.addEventListener("storage", (e) => {
  if (e.storageArea === localStorage)
    for (const t of [Qi, Yi])
      (e.key === null || e.key === t) && (Me.delete(t), Re.delete(t));
}));
function Te(e) {
  return (!Number.isFinite(e) || e < 0) && (e = 0), Math.floor(e / 60) + ":" + String(Math.floor(e % 60)).padStart(2, "0");
}
const Xs = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Ccircle cx='32' cy='32' r='30' fill='%231e1e24'/%3E%3Ctext x='32' y='38' fill='%23ec4141' font-size='22' text-anchor='middle'%3E%E2%99%AC%3C/text%3E%3C/svg%3E", zr = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Cdefs%3E%3CradialGradient id='msrVinyl' cx='50%25' cy='50%25' r='50%25'%3E%3Cstop offset='0%25' stop-color='%2327272a'/%3E%3Cstop offset='70%25' stop-color='%2309090b'/%3E%3Cstop offset='100%25' stop-color='%23000000'/%3E%3C/radialGradient%3E%3C/defs%3E%3Ccircle cx='32' cy='32' r='31' fill='url(%23msrVinyl)' stroke='%233f3f46' stroke-width='1.5'/%3E%3Ccircle cx='32' cy='32' r='24' fill='none' stroke='%2327272a' stroke-width='1' stroke-dasharray='3 2'/%3E%3Ccircle cx='32' cy='32' r='18' fill='none' stroke='%2318181b' stroke-width='1'/%3E%3Ccircle cx='32' cy='32' r='11' fill='%23f59e0b' opacity='0.9'/%3E%3Ccircle cx='32' cy='32' r='4' fill='%2309090b'/%3E%3Ccircle cx='32' cy='32' r='1.5' fill='%23fafafa'/%3E%3C/svg%3E", Hr = () => ({
  mounted: !1,
  playing: !1,
  title: "点击播放",
  artist: "作者",
  coverUrl: zr,
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
  neteaseRecentSongs: P.getRecentSongs(),
  neteaseQrImg: "",
  neteaseQrStatus: "",
  neteaseLoading: !1
}), m = L(Hr());
let N = {};
const Jr = {
  getSnapshot() {
    return Rt(m);
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
  setTrack(e, t, i) {
    m.title = e || "点击播放", m.artist = t || "作者", m.coverUrl = i || "";
  },
  setProgress(e, t) {
    m.currentTime = e, m.duration = t, m.formattedCurrent = Te(e), m.formattedDuration = Te(t), t > 0 ? m.progressPercent = Math.min(100, Math.max(0, e / t * 100)) : m.progressPercent = 0;
  },
  setLiked(e) {
    m.liked = e;
  },
  setMode(e) {
    m.mode = e;
  },
  togglePicker(e) {
    e !== void 0 ? te.visible = e : te.visible = !te.visible;
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
    N = { ...N, ...e };
  },
  playTrack(e) {
    m.isBiliRadio = !1;
    const t = window;
    if (t.LogicWeaverBiliRadioPlayer?.getState?.()?.playing && t.LogicWeaverBiliRadioPlayer.toggle(), N.playCid)
      N.playCid(e);
    else {
      const i = m.activeAlbum?._songs || [], n = [...m.songs, ...m.favorites, ...i].find((s) => String(s.cid) === String(e));
      n ? O.playSong(n) : O.playSong({ cid: e, name: "塞壬唱片", artists: ["塞壬唱片"] }), window.dispatchEvent(new CustomEvent("logicweaver:music-play-cid", { detail: { cid: e } }));
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
    N.togglePlay ? N.togglePlay() : (O.togglePlay(), window.dispatchEvent(new CustomEvent("logicweaver:music-toggle-play")));
  },
  prev() {
    if (m.isBiliRadio) {
      const e = window;
      if (typeof e.LogicWeaverBiliRadioPlayer?.prev == "function") {
        e.LogicWeaverBiliRadioPlayer.prev();
        return;
      }
    }
    N.prev ? N.prev() : (O.prev(), window.dispatchEvent(new CustomEvent("logicweaver:music-prev")));
  },
  next() {
    if (m.isBiliRadio) {
      const e = window;
      if (typeof e.LogicWeaverBiliRadioPlayer?.next == "function") {
        e.LogicWeaverBiliRadioPlayer.next();
        return;
      }
    }
    N.next ? N.next() : (O.next(), window.dispatchEvent(new CustomEvent("logicweaver:music-next")));
  },
  toggleLike() {
    if (N.toggleLike)
      N.toggleLike();
    else {
      const e = O.getState().currentSong;
      e && (m.liked = O.toggleLike(e), m.favorites = O.getFavorites()), window.dispatchEvent(new CustomEvent("logicweaver:music-toggle-like"));
    }
  },
  cycleMode() {
    if (N.cycleMode)
      N.cycleMode();
    else {
      const e = O.cyclePlayMode();
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
    N.seek ? N.seek(e) : (O.seek(e), window.dispatchEvent(new CustomEvent("logicweaver:music-seek", { detail: { percent: e } })));
  },
  openPanel() {
    N.openPanel ? N.openPanel() : (Jr.togglePicker(!0), window.dispatchEvent(new CustomEvent("logicweaver:music-open-panel")));
  },
  openNetease() {
    m.pickerTab = "netease", m.pickerOpen = !0, m.activeAlbum = null, this.loadNeteaseData();
  },
  async loadNeteaseData() {
    m.neteaseUser = P.getUser(), m.neteaseRecentSongs = P.getRecentSongs(), m.neteaseLoading = !0;
    try {
      const [e] = await Promise.all([
        P.getPlaylists(),
        P.fetchAccountRecentSongs(60).catch(() => [])
      ]);
      if (m.neteasePlaylists = e, m.neteaseRecentSongs = P.getRecentSongs(), e.length > 0) {
        const t = e.find((i) => i.name.includes("喜欢的音乐") || i.name.includes("Favorite")) || e[0];
        (!m.neteaseActivePlaylist || m.neteaseActivePlaylist.id !== t.id) && await this.selectNeteasePlaylist(t);
      }
    } catch (e) {
      console.warn("[MusicStore] Load netease playlists error:", e);
    } finally {
      m.neteaseLoading = !1, m.neteaseRecentSongs = P.getRecentSongs();
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
          const i = await P.getPlaylistTracks(e.id, 10, 0);
          m.neteaseActivePlaylist?.id === e.id && !m.neteaseSongs.length && (m.neteaseSongs = i, m.neteaseLoading = !1);
        } catch {
        }
      const t = await P.getPlaylistTracks(e.id, 500, 0);
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
      const i = await P.searchSongs(t);
      m.neteaseSearchResults = i;
    } catch (i) {
      console.warn("[MusicStore] Search netease error:", i);
    } finally {
      m.neteaseLoading = !1;
    }
  },
  syncFromBiliRadio(e) {
    m.isBiliRadio = !0, m.isNetease = !1, m.playing = e.playing, m.title = e.title || "B站电台", m.artist = e.artist || e.seriesName || "哔哩哔哩", e.coverUrl && (m.coverUrl = e.coverUrl), m.currentTime = e.currentTime, m.duration = e.duration, m.formattedCurrent = Te(e.currentTime), m.formattedDuration = Te(e.duration), m.progressPercent = e.duration > 0 ? Math.min(100, Math.max(0, e.currentTime / e.duration * 100)) : 0, m.currentLyric = e.lyric || "", m.biliRadioSeriesName = e.seriesName || "";
    const t = O.getAudioElement();
    e.playing && t && !t.paused && t.pause();
  },
  playNeteaseTrack(e) {
    m.isBiliRadio = !1;
    const t = window;
    t.LogicWeaverBiliRadioPlayer?.getState?.()?.playing && t.LogicWeaverBiliRadioPlayer.toggle(), e && (P.recordRecentSong(e), m.neteaseRecentSongs = P.getRecentSongs()), O.playNeteaseSong(e);
  },
  clearNeteaseRecent() {
    P.clearRecentSongs().catch(() => console.warn("[MusicStore] Recent history removal failed; re-read before retry"));
  },
  refreshRecentSongs() {
    m.neteaseRecentSongs = P.getRecentSongs();
  },
  stopNeteaseQrLogin() {
  },
  async startNeteaseQrLogin() {
    this.stopNeteaseQrLogin();
    try {
      await P.connectWebsiteAccount(), m.neteaseQrStatus = "官网账户已连接", await this.loadNeteaseData();
    } catch (e) {
      m.neteaseQrStatus = e?.message || "请先在网易云官网登录。";
    }
  },
  async logoutNetease() {
    await P.logout(), m.neteaseUser = null, m.neteasePlaylists = [], m.neteaseActivePlaylist = null, m.neteaseSongs = [], m.neteaseSearchResults = [];
  }
};
typeof window < "u" && (window.addEventListener("netease:account-updated", () => {
  m.neteaseUser = P.getUser(), m.neteasePlaylists = [], m.neteaseSongs = [], m.neteaseSearchResults = [], m.neteaseActivePlaylist = null;
}), window.addEventListener("netease:recent-updated", (e) => {
  Array.isArray(e.detail) ? m.neteaseRecentSongs = e.detail : m.neteaseRecentSongs = P.getRecentSongs();
}), O.subscribe((e) => {
  m.playing = e.playing, m.currentTime = e.currentTime, m.duration = e.duration, m.formattedCurrent = Te(e.currentTime), m.formattedDuration = Te(e.duration), e.duration > 0 ? m.progressPercent = Math.min(100, Math.max(0, e.currentTime / e.duration * 100)) : m.progressPercent = 0, m.mode = e.mode, m.isNetease = !!e.currentSong?.isNetease, m.currentLyric = e.currentLyric || "", e.currentSong && (m.title = e.currentSong.name || "点击播放", m.artist = (e.currentSong.artists || []).join(", ") || "作者", m.coverUrl = e.currentSong.coverUrl || "", m.liked = O.isLiked(e.currentSong.cid));
}));
async function eo() {
  try {
    if (m.favorites = O.getFavorites(), m.neteaseRecentSongs = P.getRecentSongs(), m.neteaseUser = P.getUser(), typeof localStorage < "u")
      try {
        const i = Ui(Yi);
        if (i.length) {
          const n = i;
          Array.isArray(n) && n.length > 0 && m.neteaseSongs.length === 0 && (m.neteaseSongs = n);
        }
        const r = Ui(Qi);
        if (r.length) {
          const n = r;
          Array.isArray(n) && n.length > 0 && m.neteasePlaylists.length === 0 && (m.neteasePlaylists = n);
        }
      } catch {
      }
    const [e, t] = await Promise.all([
      O.getSirenSongs().catch(() => []),
      O.getSirenAlbums().catch(() => [])
    ]);
    e.length > 0 && m.songs.length === 0 && (m.songs = e, O.setQueue(e, -1, !1)), t.length > 0 && m.albums.length === 0 && (m.albums = t);
  } catch (e) {
    console.warn("[MusicStore] initHomeMusicService failed:", e);
  }
}
const z = L({
  avatarUrl: "assets/bilibili.svg",
  userName: "哔哩哔哩用户",
  buttonTitle: "通知中心"
}), Qr = () => ({
  mounted: !1,
  visible: !1,
  x: 0,
  y: 0,
  avatarUrl: "assets/bilibili.svg",
  userName: "用户"
}), fe = L(Qr());
let F = {};
const Yr = {
  getSnapshot() {
    return Rt(fe);
  },
  update(e) {
    Object.assign(fe, e);
  },
  setMounted(e) {
    fe.mounted = e;
  },
  open(e, t) {
    fe.x = e, fe.y = t, fe.visible = !0;
    const i = document.getElementById("bili-profile-menu");
    i && (i.hidden = !1, i.style.left = `${Math.min(window.innerWidth - 205, e)}px`, i.style.top = `${Math.min(window.innerHeight - 150, t)}px`);
  },
  close() {
    fe.visible = !1;
    const e = document.getElementById("bili-profile-menu");
    e && (e.hidden = !0);
  },
  trigger(e) {
    if (Yr.close(), F.onAction) {
      F.onAction(e);
      return;
    }
    e === "messages" && F.showInfo ? F.showInfo() : e === "refresh" && F.refresh ? F.refresh() : e === "switch" && F.switchUser ? F.switchUser() : e === "web" && F.openWeb ? F.openWeb() : window.dispatchEvent(new CustomEvent("logicweaver:profile-menu-action", { detail: { action: e } }));
  },
  setActions(e) {
    F = { ...F, ...e };
  }
}, _i = [
  "todoist",
  "card-github",
  "daily-aihot",
  "daily-bilibili",
  "daily-youtube",
  "daily-pricing"
], Ct = "lw_active_card";
function Zr() {
  try {
    if (typeof localStorage < "u" && localStorage.removeItem(Ct), typeof window < "u" && window.location?.hash) {
      const e = window.location.hash.replace(/^#/, "");
      if (_i.includes(e))
        return e;
    }
    if (typeof sessionStorage < "u") {
      const e = sessionStorage.getItem(Ct);
      if (e && _i.includes(e))
        return e;
    }
  } catch {
  }
  return null;
}
const Y = L({
  activeId: Zr()
});
typeof window < "u" && _e(
  () => Y.activeId,
  (e) => {
    try {
      e ? (sessionStorage.setItem(Ct, e), window.location.hash !== `#${e}` && history.replaceState(null, "", `#${e}`)) : (sessionStorage.removeItem(Ct), window.location.hash && history.replaceState(null, "", window.location.pathname + window.location.search));
    } catch {
    }
  },
  { immediate: !0 }
);
let It;
function to(e) {
  It = e;
}
function Xe(e) {
  if (!It) throw new Error("Fullscreen card host not ready");
  It.enter(e);
}
function et(e) {
  Y.activeId === e && It?.exit();
}
const Xr = {
  "bilibili.html": "daily-bilibili",
  "github.html": "card-github",
  "aihot.html": "daily-aihot",
  "youtube.html": "daily-youtube",
  "pricing.html": "daily-pricing"
};
function Xi() {
  return typeof location > "u" ? null : Xr[location.pathname.split("/").pop() || ""] || null;
}
const io = ui(() => {
  const e = Xi() || Y.activeId;
  if (e) return e;
  const t = Or.activeId;
  return t && Mt.isActive(t) ? t : "home";
}), en = {
  schemaVersion: 1,
  id: "card-github",
  title: "github插件",
  icon: "assets/nav-github.svg",
  presentation: "card",
  dockBefore: "daily-aihot",
  rootId: "card-github",
  settingsKeys: ["ghUser", "ghToken", "ghAiServiceConfigV1", "ghArchifyWebhookUrl"],
  capabilities: ["workspace:fullscreen", "view:retained", "github:repositories"],
  loadView: () => import("./GitHubWorkspaceCard-Cq_3q__2.js").then((e) => e.default),
  lifecycle: {
    isVisible: () => Y.activeId === "card-github",
    open: () => Xe("card-github"),
    hide: () => et("card-github"),
    // Existing card menus do not expose Quit/Reload. Do not introduce a destructive new path
    // until settings drafts and every child editor provide an aggregate unmount guard.
    canUnmount: () => !1,
    unmountBlockedMessage: "GitHub 工作区保留原有隐藏保活设计；尚未开放独立退出/重载，以免丢失草稿。"
  }
}, tn = L({
  showWeather: !0,
  showSites: !0,
  showBili: !0,
  showYouTube: !0,
  showTodo: !0,
  showBookmarkPanel: !0
}), rn = {
  schemaVersion: 1,
  id: "daily-youtube",
  title: "youtube插件",
  icon: "assets/nav-youtube.svg",
  presentation: "card",
  dockBefore: "daily-pricing",
  rootId: "daily-youtube",
  showInDock: !0,
  settingsKeys: ["youtubeModuleSettingsV1"],
  capabilities: ["workspace:fullscreen", "view:retained", "youtube:recommendations", "youtube:favorites"],
  loadView: () => import("./YouTubeCard-Dxxp4usR.js").then((e) => e.Y).then((e) => e.default),
  lifecycle: {
    // Match the original retained-mount condition, including the shared homepage preference.
    isVisible: () => Y.activeId === "daily-youtube" && tn.showYouTube,
    open: () => Xe("daily-youtube"),
    hide: () => et("daily-youtube"),
    // Preserve existing card menus. Settings drafts and shared writes are not yet
    // aggregated into a safe independent Quit/Reload guard.
    canUnmount: () => !1,
    unmountBlockedMessage: "YouTube 工作区保留原有隐藏保活设计；尚未开放独立退出/重载，以免丢失设置草稿或打断收藏操作。"
  }
}, nn = {
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
  loadView: () => import("./BilibiliWorkspace-CHICZpJY.js").then((e) => e.default),
  lifecycle: {
    isVisible: () => Y.activeId === "daily-bilibili",
    open: () => Xe("daily-bilibili"),
    hide: () => et("daily-bilibili"),
    // Hide must not dispose shared radio/player state or interrupt folder/cache operations.
    canUnmount: () => !1,
    unmountBlockedMessage: "B站收藏保留原有隐藏保活设计；尚未开放独立退出/重载，以免打断播放、收藏或缓存操作。"
  }
}, sn = {
  schemaVersion: 1,
  id: "daily-aihot",
  title: "ai hot插件",
  icon: "assets/nav-aihot.svg",
  presentation: "card",
  dockBefore: "daily-pricing",
  rootId: "daily-aihot",
  // Existing localStorage preferences; registration neither reads nor migrates them.
  settingsKeys: ["lw-info-feed-view", "lw-aihot-feed-cat", "lw-aihot-feed-window"],
  capabilities: ["workspace:fullscreen", "view:retained", "aihot:aggregate"],
  loadView: () => import("./AihotFeed-jGi8MuZd.js").then((e) => e.default),
  lifecycle: {
    isVisible: () => Y.activeId === "daily-aihot",
    open: () => Xe("daily-aihot"),
    hide: () => et("daily-aihot"),
    // Keep the original retained card. Its view owns list activity;
    // the separate article reader is not owned or closed by this module.
    canUnmount: () => !1,
    unmountBlockedMessage: "AI HOT 保留原有隐藏保活设计；尚未开放独立退出/重载。"
  }
}, Fe = ["artificialAnalysisApiKey", "openRouterApiKey"];
async function er() {
  const e = typeof chrome < "u" && chrome.storage?.local ? await chrome.storage.local.get([...Fe]) : Object.fromEntries(Fe.map((t) => [t, localStorage.getItem(t)]));
  return Object.fromEntries(Fe.map((t) => [t, typeof e[t] == "string" ? e[t] : ""]));
}
async function ro() {
  const e = await er();
  return {
    hasOpenRouterKey: !!e.openRouterApiKey.trim(),
    hasAaApiKey: !!e.artificialAnalysisApiKey.trim()
  };
}
async function no(e, t) {
  const i = {};
  for (const r of Fe) e[r] !== t[r] && (i[r] = e[r].trim());
  if (Object.keys(i).length)
    if (typeof chrome < "u" && chrome.storage?.local) await chrome.storage.local.set(i);
    else for (const [r, n] of Object.entries(i)) localStorage.setItem(r, n);
  return er();
}
const on = {
  schemaVersion: 1,
  id: "daily-pricing",
  title: "模型插件",
  icon: "assets/nav-pricing.svg",
  presentation: "card",
  rootId: "daily-pricing",
  settingsKeys: Fe,
  capabilities: ["workspace:fullscreen", "view:retained", "pricing:bundled-data"],
  loadView: () => import("./ModelPricingCard-CBWxCtRv.js").then((e) => e.default),
  lifecycle: {
    isVisible: () => Y.activeId === "daily-pricing",
    open: () => Xe("daily-pricing"),
    hide: () => et("daily-pricing"),
    // Keep settings drafts, filters and in-memory favorites across Hide.
    // Registration does not add live data fetching or independent Quit/Reload.
    canUnmount: () => !1,
    unmountBlockedMessage: "模型价格保留原有隐藏保活设计；尚未开放独立退出/重载，以免丢失设置草稿与本页关注。"
  }
}, an = {
  schemaVersion: 1,
  id: "stickers",
  title: "表情包模块",
  emoji: "😺",
  // Keep the chat picker's library management window without a standalone Dock entry.
  showInDock: !1,
  rootId: "vue-stickers-dialog-root",
  settingsKeys: Dr,
  capabilities: ["folder:explicit-permission", "image:explicit-save-delete", "image:local-preview", "image:clipboard"],
  loadView: () => import("./StickersDialog-BBhmfuk6.js").then((e) => e.default),
  lifecycle: {
    isVisible: () => ct.visible,
    open: () => {
      ct.visible = !0;
    },
    hide: () => {
      ct.visible = !1, $r();
    },
    canUnmount: () => ct.pendingWrites === 0,
    unmountBlockedMessage: "图片保存/删除、目录授权或偏好正在处理，暂不能退出/重载；可以先隐藏，已提交操作不会撤回。"
  }
}, cn = "neteaseApiUrl", ln = [cn], dn = {
  schemaVersion: 1,
  id: "music",
  title: "网易云模块",
  icon: "assets/netease.svg",
  rootId: "vue-music-workspace-root",
  settingsKeys: ln,
  capabilities: ["catalog:read", "settings:endpoint", "account:explicit-login-logout", "playback:shared-home-controls"],
  loadView: () => import("./NeteaseWorkspaceDialog-CWDpPJd8.js").then((e) => e.default),
  lifecycle: {
    isVisible: () => te.visible,
    open: () => {
      te.visible = !0;
    },
    hide: () => {
      te.visible = !1, Kr();
    },
    canUnmount: () => te.pendingWrites === 0,
    unmountBlockedMessage: "节点保存、登录确认/退出或记录写入正在处理，暂不能退出/重载；可以隐藏。退出窗口不会停止首页播放。"
  }
}, un = Object.freeze([
  "todoistToken",
  "todoistActiveProjectIdV1"
]), fn = {
  schemaVersion: 1,
  id: "todoist",
  title: "todoist",
  icon: "assets/nav-todoist.svg",
  dockBefore: "stickers",
  rootId: "todoist",
  settingsKeys: un,
  capabilities: ["view:retained", "tasks:read-write", "attachments:explicit-upload", "settings:account-rules", "calendar:shared"],
  loadView: () => import("./TodoistWorkspace-Bg8cFtEs.js").then((e) => e.default),
  lifecycle: {
    isVisible: () => lt.visible,
    open: () => {
      lt.visible = !0;
    },
    hide: () => {
      lt.visible = !1, xr();
    },
    canUnmount: () => lt.pendingWrites === 0,
    unmountBlockedMessage: "任务、附件、评论或配置正在写入，暂不能退出/重载；可以隐藏。首页限时任务和独立日历不会随窗口退出停止。"
  }
}, mn = 1, hn = 1, pn = { text: { legacy: !0 }, image: { legacy: !1 }, music: { legacy: !0 }, bilibili: { legacy: !0 }, github: { legacy: !0 }, bili_series: { legacy: !0 }, aihot: { legacy: !0 }, youtube: { legacy: !0 }, website: { legacy: !0 }, server_invite: { legacy: !0 }, music_party: { legacy: !0 } }, gn = ["image/png", "image/jpeg", "image/gif", "image/webp"], yn = { messageBytes: 262144, imageMessageBytes: 2097152, imageBytes: 1048576, textChars: 8e3, imageMaxDimension: 8192, imageMaxPixels: 16777216 }, Oe = {
  schema: mn,
  protocol: hn,
  messageTypes: pn,
  imageMimeTypes: gn,
  limits: yn
};
function wn(e) {
  try {
    if (e.length > Math.ceil(Oe.limits.imageBytes / 3) * 4 + 64) return;
    const t = e.indexOf(","), i = e.slice(5, e.indexOf(";")), r = Uint8Array.from(atob(e.slice(t + 1)), (o) => o.charCodeAt(0)), n = new DataView(r.buffer), s = (o, a) => String.fromCharCode(...r.slice(o, a));
    if (i === "image/png" && r.length >= 33 && s(0, 8) === `PNG\r

` && n.getUint32(8) === 13 && s(12, 16) === "IHDR") return [n.getUint32(16), n.getUint32(20)];
    if (i === "image/gif" && r.length >= 13 && ["GIF87a", "GIF89a"].includes(s(0, 6))) return [n.getUint16(6, !0), n.getUint16(8, !0)];
    if (i === "image/webp" && r.length >= 25 && s(0, 4) === "RIFF" && s(8, 12) === "WEBP" && n.getUint32(4, !0) + 8 === r.length) {
      const o = s(12, 16);
      if (o === "VP8X" && r.length >= 30) return [1 + r[24] + (r[25] << 8) + (r[26] << 16), 1 + r[27] + (r[28] << 8) + (r[29] << 16)];
      if (o === "VP8L" && r[20] === 47) {
        const a = n.getUint32(21, !0);
        return [1 + (a & 16383), 1 + (a >>> 14 & 16383)];
      }
      if (o === "VP8 " && r.length >= 30 && s(23, 26) === "*") return [n.getUint16(26, !0) & 16383, n.getUint16(28, !0) & 16383];
    }
    if (i === "image/jpeg" && r[0] === 255 && r[1] === 216) {
      let o = 2;
      for (; o + 4 <= r.length && r[o] === 255; ) {
        for (; o < r.length && r[o] === 255; ) o++;
        if (o >= r.length) break;
        const a = r[o++];
        if (a === 216 || a === 1 || a >= 208 && a <= 215) continue;
        if (a === 217 || a === 218 || o + 2 > r.length) break;
        const c = n.getUint16(o);
        if (c < 2 || o + c > r.length) break;
        if ([192, 193, 194, 195, 197, 198, 199, 201, 202, 203, 205, 206, 207].includes(a) && c >= 8) return [n.getUint16(o + 5), n.getUint16(o + 3)];
        o += c;
      }
    }
  } catch {
  }
}
const bn = Oe.protocol, ce = Object.freeze({ ...Oe.limits }), ii = Object.freeze(Object.keys(Oe.messageTypes)), ri = Object.freeze([...Oe.imageMimeTypes]), H = (e) => !!e && typeof e == "object" && !Array.isArray(e), Jt = (e) => typeof e == "number" && Number.isSafeInteger(e) && e > 0;
function Nt() {
  return { status: "unknown", reason: "请先完成当前服务器的身份同步，再发送消息。", messageTypes: [], imageMimeTypes: [], limits: { ...ce } };
}
function mt() {
  return { ...Nt(), status: "incompatible", reason: "服务端消息能力格式无效或协议版本不兼容，请服主核对前后端版本；待发内容已保留。" };
}
function vn(e) {
  if (e === void 0 || H(e) && !("schema" in e) && !("protocol" in e) && !("messageTypes" in e) && !("limits" in e)) {
    if (e !== void 0 && !H(e)) return mt();
    const n = H(e) && e.imageMessages === 1;
    return H(e) && e.maxImageBytes !== void 0 && !Jt(e.maxImageBytes) ? mt() : {
      status: "legacy",
      reason: n ? "" : "此旧版服务端未声明图片能力，请服主升级；待发图片已保留。",
      messageTypes: ii.filter((s) => s === "image" ? n : Oe.messageTypes[s].legacy),
      imageMimeTypes: n ? [...ri] : [],
      limits: { ...ce, imageBytes: n && H(e) && Jt(e.maxImageBytes) ? Math.min(e.maxImageBytes, ce.imageBytes) : ce.imageBytes }
    };
  }
  if (!H(e) || e.schema !== 1 || e.protocol !== bn || !H(e.limits) || !Array.isArray(e.messageTypes) || e.messageTypes.length > 64 || e.messageTypes.some((n) => typeof n != "string") || !Array.isArray(e.imageMimeTypes) || e.imageMimeTypes.length > 16 || e.imageMimeTypes.some((n) => typeof n != "string")) return mt();
  const t = { ...ce };
  for (const n of Object.keys(t)) {
    const s = e.limits[n];
    if (!Jt(s)) return mt();
    t[n] = Math.min(t[n], s);
  }
  const i = ri.filter((n) => e.imageMimeTypes.includes(n)), r = ii.filter((n) => e.messageTypes.includes(n) && (n !== "image" || e.imageMessages === 1 && i.length > 0));
  return { status: "supported", reason: r.includes("image") ? "" : "此服务端未启用兼容的图片消息，待发图片已保留。", messageTypes: r, imageMimeTypes: i, limits: t };
}
function Sn(e, t = ce, i = ri) {
  if (typeof e != "string" || e.length > Math.ceil(t.imageBytes / 3) * 4 + 32) return !1;
  const r = /^data:(image\/[a-z0-9.+-]+);base64,([A-Za-z0-9+/]+={0,2})$/.exec(e);
  if (!r || !i.includes(r[1])) return !1;
  const n = r[2], s = n.length / 4 * 3 - (n.endsWith("==") ? 2 : n.endsWith("=") ? 1 : 0);
  return n.length % 4 === 0 && s > 0 && s <= t.imageBytes;
}
function Ke(e, t) {
  if (!H(t) || typeof t.type != "string" || typeof t.content != "string" || typeof t.id != "string" || !t.id || typeof t.timestamp != "number" || !Number.isFinite(t.timestamp) || !H(t.sender) || typeof t.sender.uid != "string" || typeof t.sender.name != "string" || typeof t.sender.avatar != "string") return "消息格式无效，原记录已保留，请核对后重新发送。";
  const i = H(t.meta) ? t.meta.imageUrl : void 0;
  if (e.status === "unknown" || e.status === "incompatible") return e.reason;
  if (!e.messageTypes.includes(t.type)) return t.type === "image" ? e.reason || "服务端未启用图片消息，待发图片已保留。" : "服务端不支持此消息类型，内容已保留。";
  if (t.content.length > e.limits.textChars) return "文字超过服务端声明的长度上限，请缩短后再发送。";
  if (t.type === "image" && !Sn(i, e.limits, e.imageMimeTypes)) return "图片格式或大小不符合服务端能力，请重新选择或压缩；原内容已保留。";
  if (t.type === "image") {
    const s = wn(i);
    if (!s || s.some((o) => o < 1 || o > e.limits.imageMaxDimension) || s[0] * s[1] > e.limits.imageMaxPixels) return "图片文件头或像素尺寸不符合当前服务端限制，请重新选择；原内容已保留。";
  }
  let r;
  try {
    r = JSON.stringify({ message: t });
  } catch {
    return "消息不能安全编码，原记录已保留，请核对后重新发送。";
  }
  return new TextEncoder().encode(r).byteLength > (t.type === "image" ? e.limits.imageMessageBytes : e.limits.messageBytes) ? "消息超过服务端声明的JSON大小上限，内容已保留。" : "";
}
const tr = ce.imageMessageBytes, ir = ce.textChars, ze = (e) => !!e && typeof e == "object" && !Array.isArray(e), K = (e, t) => typeof e == "string" && e.length <= t;
function tt(e) {
  if (!K(e, 4096)) return "";
  try {
    const t = new URL(e);
    return ["https:", "http:"].includes(t.protocol) && !t.username && !t.password ? t.href : "";
  } catch {
    return "";
  }
}
function Ot(e) {
  return typeof e != "string" ? "" : e.length <= tr && /^data:image\/(?:png|jpeg|gif|webp);base64,[A-Za-z0-9+/=\r\n]+$/i.test(e) ? e : tt(e);
}
function Dt(e) {
  if (!K(e, 4096)) throw new Error("服务器地址过长");
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
function rr(e, t) {
  if (!(!ze(e) || !["bilibili", "github", "music", "aihot", "youtube", "idle"].includes(String(e.type)) || !K(e.title, 500)))
    return { type: e.type, title: e.title, url: tt(e.url) || void 0, updatedAt: t };
}
function nr(e, t = 0) {
  if (!ze(e) || t > 2) return;
  const i = /* @__PURE__ */ Object.create(null);
  for (const [r, n] of Object.entries(e).slice(0, 64))
    ["__proto__", "constructor", "prototype", "rawSong"].includes(r) || (typeof n == "string" && n.length <= (r === "imageUrl" ? tr : ir) ? i[r] = /(?:cover|avatar|face|imageUrl)$/i.test(r) ? Ot(n) : /url$/i.test(r) ? tt(n) : n : typeof n == "boolean" || typeof n == "number" && Number.isFinite(n) ? i[r] = n : r === "seriesItems" && Array.isArray(n) && (i[r] = n.slice(0, 100).map((s) => nr(s, t + 1)).filter(Boolean)));
  return i;
}
function it(e) {
  return sr(e, Date.now());
}
function sr(e, t) {
  if (!ze(e) || !ze(e.sender) || !K(e.id, 160) || !e.id || !K(e.sender.uid, 160) || !e.sender.uid || !K(e.sender.name, 100) || !K(e.content, ir) || ![...ii, "system"].includes(String(e.type)) || typeof e.timestamp != "number" || !Number.isFinite(e.timestamp)) return;
  const i = Ot(e.sender.avatar) || (K(e.sender.avatar, 32) && !/[:/]/.test(e.sender.avatar) ? e.sender.avatar : "👤");
  return { id: e.id, sender: { uid: e.sender.uid, name: e.sender.name, avatar: i, activity: rr(e.sender.activity, t) }, type: e.type, content: e.content, timestamp: e.timestamp, meta: nr(e.meta) };
}
function An(e, t) {
  if (!ze(e) || !K(e.uid, 160) || !e.uid || !K(e.name, 100)) return;
  const i = Ot(e.avatar) || (K(e.avatar, 32) && !/[:/]/.test(e.avatar) ? e.avatar : "👤");
  return { uid: e.uid, name: e.name, avatar: i, activity: rr(e.activity, t) };
}
const He = Se(""), so = Se(!1), mi = Se(0);
let Le, we = Promise.resolve();
const ee = /* @__PURE__ */ new Map();
function hi(e, t, i) {
  return JSON.stringify([e, t, i]);
}
function $t() {
  return Le || (Le = new Promise((e, t) => {
    const i = indexedDB.open("lw-chat-history", 2);
    i.onupgradeneeded = () => {
      i.result.objectStoreNames.contains("messages") || i.result.createObjectStore("messages", { keyPath: ["scope", "id"] }).createIndex("timeline", ["scope", "timestamp", "id"], { unique: !0 }), i.result.objectStoreNames.contains("relay-cursors") || i.result.createObjectStore("relay-cursors");
    }, i.onerror = () => t(i.error), i.onblocked = () => {
      He.value = "历史数据库升级被其他标签页阻塞，请关闭旧标签页后重试";
    }, i.onsuccess = () => {
      const r = i.result;
      r.onversionchange = () => {
        r.close(), Le = void 0;
      }, e(r);
    };
  }).catch((e) => {
    throw Le = void 0, e;
  })), Le;
}
function xt(e, t) {
  for (const i of t) {
    const r = it(i);
    if (!r || r.id === "sys-welcome") continue;
    const n = { scope: e, id: r.id, timestamp: r.timestamp, message: JSON.parse(JSON.stringify(r)) };
    ee.set(JSON.stringify([e, n.id]), n);
  }
  return mi.value = ee.size, kn();
}
function kn() {
  return we = we.then(async () => {
    if (!ee.size) return;
    const e = [...ee.entries()];
    try {
      const t = await $t();
      await new Promise((i, r) => {
        const n = t.transaction("messages", "readwrite");
        n.oncomplete = () => i(), n.onabort = () => r(n.error), n.onerror = () => r(n.error);
        const s = n.objectStore("messages");
        for (const [, o] of e) s.put(o);
      });
      for (const [i, r] of e) ee.get(i) === r && ee.delete(i);
      mi.value = ee.size, He.value = "";
    } catch {
      He.value = "历史未能写入磁盘（空间不足或数据库不可用）。待存消息保留在内存，请先导出备份，勿关闭或刷新。";
    }
  }), we;
}
async function En(e) {
  await we;
  const t = await $t();
  return new Promise((i, r) => {
    const n = t.transaction("relay-cursors", "readonly"), s = n.objectStore("relay-cursors").get(e);
    n.oncomplete = () => i(Number.isSafeInteger(s.result) ? s.result : 0), n.onabort = () => r(n.error), s.onerror = () => r(s.error);
  });
}
function Cn(e, t, i) {
  const r = we.then(async () => {
    const n = await $t();
    await new Promise((s, o) => {
      const a = n.transaction(["messages", "relay-cursors"], "readwrite"), c = a.objectStore("messages");
      for (const p of t) c.put({ scope: e, id: p.id, timestamp: p.timestamp, message: JSON.parse(JSON.stringify(p)) });
      const u = a.objectStore("relay-cursors"), f = u.get(e);
      f.onsuccess = () => u.put(Math.max(Number(f.result) || 0, i), e), a.oncomplete = () => s(), a.onabort = () => o(a.error), a.onerror = () => o(a.error);
    });
  });
  return we = r.catch(() => {
  }), r;
}
async function or(e, t, i = 200) {
  await we;
  const r = await $t();
  return new Promise((n, s) => {
    const o = r.transaction("messages", "readonly"), a = [e, -Number.MAX_VALUE, ""], c = t ? [e, t.timestamp, t.id] : [e, Number.MAX_VALUE, "￿"], u = IDBKeyRange.bound(a, c, !1, !!t), f = o.objectStore("messages").index("timeline").openCursor(u, "prev"), p = [];
    f.onerror = () => s(f.error), o.onabort = () => s(o.error), f.onsuccess = () => {
      const h = f.result;
      if (!h || p.length >= i) {
        n(p.reverse());
        return;
      }
      const g = it(h.value.message);
      g && p.push(g), h.continue();
    };
  });
}
async function oo(e) {
  const t = /* @__PURE__ */ new Map();
  let i;
  for (; ; ) {
    const r = await or(e, i, 500);
    for (const n of r) t.set(n.id, n);
    if (r.length < 500) break;
    i = r[0];
  }
  for (const r of ee.values()) r.scope === e && t.set(r.id, r.message);
  return [...t.values()].sort((r, n) => r.timestamp - n.timestamp || r.id.localeCompare(n.id));
}
function ao(e) {
  return [...ee.values()].filter((t) => t.scope === e).map((t) => t.message);
}
function Tt(e) {
  const t = tt(e);
  return t && t.length <= 1e3 && !/\/noface\.(jpg|png)(?:[?#]|$)/i.test(t) ? t : "";
}
function Lt(e, t = "") {
  const i = Tt(e) || Tt(t);
  return i || (e && e.length <= 8 && !/[:/]/.test(e) ? e : "🦫");
}
const Bt = "lw_chat_server_url", ar = "lw_chat_user_id", jt = "lw_chat_user_name", Wt = "lw_chat_user_avatar", Q = "lw_chat_groups", cr = "lw_chat_current_group", In = "lw_chat_rooms", Tn = "lw_chat_friends", lr = "lw_chat_friend_requests_v1", St = "lw_chat_current_room", dr = "";
function J(e, t) {
  try {
    if (typeof localStorage < "u") {
      const i = localStorage.getItem(e);
      if (e === Bt && i && localStorage.getItem("lw_chat_server_explicit") !== "true" && (i.includes("sslip.io") || i.includes("your-domain.com")))
        return localStorage.removeItem(e), t;
      if (i !== null) return i;
    }
  } catch {
  }
  return t;
}
function M(e, t) {
  try {
    typeof localStorage < "u" && localStorage.setItem(e, t);
  } catch {
  }
}
function We(e, t) {
  try {
    if (typeof localStorage < "u") {
      const i = localStorage.getItem(e);
      if (i) return JSON.parse(i);
    }
  } catch {
  }
  return t;
}
const Pn = [
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
], Un = [
  { id: "main", name: "自习室大厅", icon: "🏠" },
  { id: "dev", name: "代码与摸鱼", icon: "💻" },
  { id: "music", name: "音乐咖啡馆", icon: "🎵" }
];
function _n() {
  const e = ["摸鱼", "冲浪", "喝茶", "听歌", "看番", "敲代码", "发呆", "漫游"], t = ["海狸", "企鹅", "猫猫", "柴犬", "仓鼠", "水獭", "考拉", "熊猫"], i = e[Math.floor(Math.random() * e.length)], r = t[Math.floor(Math.random() * t.length)], n = Math.floor(1e3 + Math.random() * 9e3);
  return `${i}的${r}#${n}`;
}
function Mn() {
  const e = ["🦫", "🐧", "🐱", "🐶", "🐹", "🦦", "🐨", "🐼", "🦊", "🐰"];
  return e[Math.floor(Math.random() * e.length)];
}
const ur = J(ar, ""), pi = ur || `u_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`;
ur || M(ar, pi);
const Pt = J(jt, ""), Rn = !Pt || Pt.includes("#"), Mi = z.userName && z.userName !== "哔哩哔哩用户" && z.userName !== "浏览器指纹与环境" ? z.userName : "", fr = Rn && Mi ? Mi : Pt || _n();
Pt || M(jt, fr);
const Pe = J(Wt, ""), Nn = !Pe || Pe.length <= 4 || Pe.startsWith("data:") || Pe.includes("/noface."), Ri = Tt(z.avatarUrl), mr = Nn && Ri ? Ri : Pe || Mn();
Pe || M(Wt, mr);
const d = L({
  visible: !1,
  shareActivity: J("lw_chat_share_activity", "true") !== "false",
  error: "",
  connected: !1,
  connecting: !1,
  onlineCount: 1,
  serverUrl: J(Bt, dr),
  currentGroupId: J(cr, "hub_main"),
  currentChannelId: "general",
  groups: We(Q, Pn),
  groupMembers: [],
  currentRoomId: J(St, "main"),
  rooms: We(In, Un),
  friends: We(Tn, []),
  friendRequests: We(lr, []),
  currentUser: {
    uid: pi,
    name: fr,
    avatar: mr
  },
  messages: Je(J(St, "main")).length > 0 ? Je(J(St, "main")) : [
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
$n();
_e(
  () => [z.avatarUrl, z.userName],
  ([e, t]) => {
    const i = d.currentUser.avatar;
    Tt(e) && (!i || i.length <= 4 || i.startsWith("data:") || i.includes("/noface.") || /^https?:\/\/[^/]*hdslb\.com\//i.test(i)) && (d.currentUser.avatar = e, M(Wt, e)), t && t !== "哔哩哔哩用户" && t !== "浏览器指纹与环境" && (!d.currentUser.name || d.currentUser.name.includes("#") || d.currentUser.name.startsWith("摸鱼")) && (d.currentUser.name = t, M(jt, t));
  },
  { immediate: !0 }
);
const Ni = L({ scope: "", ready: !1 });
let ht = 0;
_e(
  () => hi(d.currentUser.uid, d.serverUrl, d.currentRoomId),
  async (e) => {
    const t = ++ht;
    Object.assign(Ni, { scope: e, ready: !1 });
    const { currentRoomId: i, serverUrl: r, currentUser: n } = d, s = Je(i, r, n.uid);
    await xt(e, s);
    try {
      const o = await or(e);
      if (t !== ht) return;
      const a = new Map(o.map((c) => [c.id, c]));
      for (const c of d.messages) c.id !== "sys-welcome" && a.set(c.id, c);
      d.messages = [...a.values()].sort((c, u) => c.timestamp - u.timestamp || c.id.localeCompare(u.id)).slice(-200);
    } catch {
      t === ht && (He.value = "无法读取历史数据库，现有缓存未删除，请导出备份后检查浏览器存储。");
    } finally {
      t === ht && (Ni.ready = !0);
    }
  },
  { immediate: !0 }
);
function co(e, t) {
  d.currentUser.name = e.trim() || d.currentUser.name, d.currentUser.avatar = t.trim() || d.currentUser.avatar, M(jt, d.currentUser.name), M(Wt, d.currentUser.avatar);
}
function On(e, t, i) {
  return "lw_chat_history_v2_" + JSON.stringify([i, t, e]);
}
function Je(e, t = J(Bt, dr), i = pi) {
  try {
    const r = localStorage.getItem(On(e, t, i));
    if (r) {
      const n = JSON.parse(r);
      if (Array.isArray(n)) return n.map(it).filter((s) => !!s).slice(-200);
    }
  } catch {
  }
  return [];
}
function Dn(e, t) {
  const i = hi(d.currentUser.uid, d.serverUrl, e);
  xt(i, t);
}
function hr(e, t) {
  if (!e) return "";
  const i = new URL(Dt(e));
  return i.searchParams.set("room", t), i.href;
}
function ni(e, t = !0, i = !1) {
  if (t && He.value && mi.value > 0)
    return d.error = "仍有未保存消息，请先重试保存或导出备份，暂不切换房间", !1;
  try {
    e.endpoint = Dt(e.endpoint), localStorage.setItem("lw_chat_session_v1", JSON.stringify(e));
  } catch {
    return d.error = "会话保存失败或地址无效，未切换房间", !1;
  }
  const r = e.endpoint !== d.serverUrl || e.roomId !== d.currentRoomId;
  return r && t && Dn(d.currentRoomId, d.messages), Object.assign(d, {
    currentGroupId: e.groupId,
    currentChannelId: e.channelId,
    currentRoomId: e.roomId,
    serverUrl: e.endpoint
  }), r && (d.messages = Je(e.roomId, e.endpoint, d.currentUser.uid), d.userActivities = {}, d.unreadCount = 0, i || (d.connected = !1, d.connecting = !1), d.onlineCount = 0), M(Bt, e.endpoint), M(St, e.roomId), M(cr, e.groupId), !0;
}
function rt(e, t = "local", i = !1) {
  let r, n = t;
  try {
    if (r = Dt(e), r) {
      const a = new URL(r);
      if (n = a.searchParams.get("room") || "default", !n || n.length > 160) throw new Error();
      a.searchParams.set("room", n), r = a.href;
    }
  } catch {
    return d.error = "房间地址无效，未切换会话", !1;
  }
  for (const a of d.groups)
    for (const c of a.channels)
      if ((c.endpoint ?? hr(a.endpoint ?? "", `${a.id}__${c.id}`)) === r && (r || c.id === n))
        return ni({ groupId: a.id, channelId: c.id, roomId: n, endpoint: r }, !0, i);
  const s = "joined_" + crypto.randomUUID(), o = {
    id: s,
    name: r ? "受邀房间" : "本地房间",
    icon: "💬",
    endpoint: r,
    isCustom: !0,
    channels: [{ id: n, name: n, icon: "💬", endpoint: r }]
  };
  return d.groups.push(o), ni({ groupId: s, channelId: n, roomId: n, endpoint: r }, !0, i) ? (M(Q, JSON.stringify(d.groups)), !0) : (d.groups.pop(), !1);
}
function $n() {
  for (const t of d.groups) t.endpoint ??= d.serverUrl;
  const e = We("lw_chat_session_v1", null);
  if (e && typeof e.endpoint == "string" && typeof e.roomId == "string") {
    const t = d.groups.find((r) => r.id === e.groupId), i = t?.channels.find((r) => r.id === e.channelId);
    if (t && i)
      try {
        const r = Dt(e.endpoint), n = r ? new URL(r).searchParams.get("room") || "default" : e.roomId;
        i.endpoint = r, Object.assign(d, {
          currentGroupId: t.id,
          currentChannelId: i.id,
          currentRoomId: n,
          serverUrl: r,
          messages: Je(n, r, d.currentUser.uid)
        }), M(Q, JSON.stringify(d.groups));
        return;
      } catch {
      }
  }
  rt(d.serverUrl, d.currentRoomId), M(Q, JSON.stringify(d.groups));
}
function lo(e) {
  d.friendRequests = d.friendRequests.filter((t) => t.id !== e), M(lr, JSON.stringify(d.friendRequests));
}
function Vt(e, t) {
  const i = d.groups.find((o) => o.id === e), r = i?.channels.find((o) => o.id === t) || i?.channels[0];
  if (!i || !r) return !1;
  const n = r.endpoint !== void 0 ? r.endpoint ? new URL(r.endpoint).searchParams.get("room") || "default" : r.id : `${i.id}__${r.id}`, s = r.endpoint ?? hr(i.endpoint ?? "", n);
  return ni({ groupId: i.id, channelId: r.id, roomId: n, endpoint: s });
}
function uo(e, t = "👥") {
  const i = e.trim() || "新群组", r = "group_" + Math.random().toString(36).slice(2, 8), n = {
    id: r,
    name: i,
    icon: t,
    channels: [
      { id: "general", name: "综合讨论", icon: "💬" },
      { id: "music", name: "音乐分享", icon: "🎵" },
      { id: "bili", name: "B站动态", icon: "📺" }
    ],
    endpoint: d.serverUrl,
    isCustom: !0
  };
  return d.groups.push(n), M(Q, JSON.stringify(d.groups)), Vt(r, "general"), n;
}
function fo(e) {
  if (d.groups.length <= 1) return;
  const t = d.groups.filter((i) => i.id !== e);
  if (d.currentGroupId === e) {
    const i = t[0];
    if (!i || !Vt(i.id, i.channels[0]?.id || "general")) return;
  }
  d.groups = t, M(Q, JSON.stringify(d.groups));
}
function mo(e, t = "💬") {
  const i = d.groups.find((n) => n.id === d.currentGroupId);
  if (!i) return;
  const r = "ch_" + Math.random().toString(36).slice(2, 6);
  i.channels.push({ id: r, name: e.trim() || "新频道", icon: t }), M(Q, JSON.stringify(d.groups)), Vt(i.id, r);
}
function ho(e, t, i) {
  const r = d.groups.find((n) => n.id === e);
  r && (r.name = t.trim() || r.name, i && (r.icon = i), M(Q, JSON.stringify(d.groups)));
}
function po(e, t, i, r) {
  const n = d.groups.find((o) => o.id === e);
  if (!n) return;
  const s = n.channels.find((o) => o.id === t);
  s && (s.name = i.trim() || s.name, r && (s.icon = r), M(Q, JSON.stringify(d.groups)));
}
function go(e, t) {
  const i = d.groups.find((n) => n.id === e);
  if (!i || i.channels.length <= 1) return;
  const r = i.channels.filter((n) => n.id !== t);
  d.currentGroupId === e && d.currentChannelId === t && (!r[0] || !Vt(e, r[0].id)) || (i.channels = r, M(Q, JSON.stringify(d.groups)));
}
const C = (e) => JSON.stringify([e.origin, e.room, e.uid]);
function Qe(e) {
  return typeof e == "string" && /^[A-Za-z0-9_-]{43}$/.test(e);
}
function nt(e) {
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
const gi = "lw_private_chat_v1", v = L({ room: null, diagnostic: "" });
function yi() {
  let e = null, t = "";
  try {
    const i = localStorage.getItem(gi);
    if (i === null) t = "当前浏览器配置中没有保存聊天室连接。请确认使用的是原来的浏览器用户和插件，或重新导入自己的邀请。";
    else
      try {
        e = nt(JSON.parse(i));
      } catch {
        t = "已保存的聊天室配置无效或使用了公网 HTTP，原记录和凭证未删除。请先配置 HTTPS，再按部署指南重新导入匹配当前聊天 ID 的邀请。";
      }
  } catch {
    t = "无法读取本机存储，请检查浏览器是否限制存储访问。";
  }
  v.diagnostic = t, JSON.stringify(e) !== JSON.stringify(v.room) && (v.room = e);
}
yi();
window.addEventListener("storage", (e) => {
  (e.key === gi || e.key === null) && yi();
});
window.addEventListener("focus", yi);
const xn = ui(() => !!v.room);
function pr(e) {
  return e.origin.replace(/^http:/, "ws:").replace(/^https:/, "wss:") + "/ws?room=" + encodeURIComponent(e.room);
}
function Ln(e) {
  const t = nt(e);
  localStorage.setItem(gi, JSON.stringify(t)), v.diagnostic = "", v.room = t;
}
const wi = Se(0), j = Se(""), bi = /* @__PURE__ */ new Map();
let Qt;
function De() {
  return Qt ||= new Promise((e, t) => {
    const i = indexedDB.open("lw-chat-delivery", 1);
    i.onupgradeneeded = () => {
      i.result.createObjectStore("deliveries", { keyPath: ["scope", "id", "uid"] }).createIndex("scope", "scope");
    }, i.onsuccess = () => {
      i.result.onversionchange = () => {
        i.result.close(), Qt = void 0;
      }, e(i.result);
    }, i.onerror = () => t(i.error), i.onblocked = () => {
      j.value = "发送队列被旧窗口阻塞，请关闭旧窗口后重试。";
    };
  }).catch((e) => {
    throw Qt = void 0, e;
  });
}
async function Bn(e) {
  const t = await De();
  return new Promise((i, r) => {
    const n = t.transaction("deliveries", "readonly"), s = n.objectStore("deliveries").index("scope").getAll(e);
    n.oncomplete = () => i(s.result), n.onabort = () => r(n.error), s.onerror = () => r(s.error);
  });
}
let Oi = Promise.resolve();
function st(e) {
  const t = Oi.then(e);
  return Oi = t.catch(() => {
  }), t;
}
async function $e(e) {
  try {
    const t = /* @__PURE__ */ new Map();
    for (const i of await Bn(e)) {
      const r = t.get(i.id) || [];
      r.push(i), t.set(i.id, r);
    }
    bi.set(e, t), wi.value++;
  } catch {
    j.value = "无法读取发送确认记录，请检查浏览器存储。";
  }
}
function jn(e, t) {
  wi.value;
  const i = bi.get(e)?.get(t) || [];
  if (!i.length) return "none";
  const r = i.filter((n) => !n.received);
  return r.length ? r.some((n) => n.failure === "rejected" || n.failure === "paused" || n.attempts >= 5 && (n.failure === "unconfirmed" || Date.now() - n.lastAttempt > 15e3)) ? "failed" : "sending" : "stored";
}
function yo(e, t) {
  wi.value;
  const i = bi.get(e)?.get(t) || [];
  if (!i.length) return "无送达确认";
  const r = i.filter((s) => s.received).length;
  return r === i.length ? i.every((s) => s.uid === "private-relay-server") ? "服务器已保存（不代表对方已读）" : `对方已接收 ${r}/${i.length}（非已读）` : i.filter((s) => !s.received).some((s) => s.failure === "rejected") ? "服务器拒绝此次发送，可在消息详情中重试；不代表此前尝试一定未保存" : jn(e, t) === "failed" ? "尚未获得保存确认，自动补发已暂停；不代表一定未送达，可在消息详情中重试" : "正在发送／等待保存确认，将按原目标房间补发；请勿重复发送";
}
async function gr(e, t, i) {
  await st(async () => {
    const r = await De();
    await new Promise((n, s) => {
      const o = r.transaction("deliveries", "readwrite"), a = o.objectStore("deliveries");
      for (const c of new Set(i)) {
        const u = a.get([e, t.id, c]);
        u.onsuccess = () => {
          if (u.result?.received) return;
          const f = { scope: e, id: t.id, uid: c, message: JSON.parse(JSON.stringify(t)), attempts: 0, lastAttempt: 0, received: !1 };
          a.put(f);
        };
      }
      o.oncomplete = () => n(), o.onabort = () => s(o.error), o.onerror = () => s(o.error);
    }), await $e(e);
  });
}
async function wo(e, t) {
  try {
    await st(async () => {
      const i = await De();
      await new Promise((r, n) => {
        const s = i.transaction("deliveries", "readwrite"), o = s.objectStore("deliveries").index("scope").openCursor(e);
        o.onsuccess = () => {
          const a = o.result;
          if (!a) return;
          const c = a.value;
          c.id === t && !c.received && a.update({ ...c, attempts: 5, failure: "paused" }), a.continue();
        }, s.oncomplete = () => r(), s.onabort = () => n(s.error), s.onerror = () => n(s.error);
      }), await $e(e);
    });
  } catch {
    j.value = "暂停补发未能保存，请检查存储；已发出的消息无法撤回。";
  }
}
async function Wn(e, t, i) {
  return yr(e, [t], i);
}
async function yr(e, t, i) {
  t.length && await st(async () => {
    const r = await De();
    await new Promise((n, s) => {
      const o = r.transaction("deliveries", "readwrite"), a = o.objectStore("deliveries");
      for (const c of new Set(t)) {
        const u = a.get([e, c, i]);
        u.onsuccess = () => {
          u.result && a.put({ ...u.result, received: !0, failure: void 0, message: void 0 });
        };
      }
      o.oncomplete = () => n(), o.onabort = () => s(o.error), o.onerror = () => s(o.error);
    }), await $e(e);
  });
}
async function Di(e, t, i, r = !1, n, s = !1) {
  await st(async () => {
    const o = await De();
    await new Promise((a, c) => {
      const u = o.transaction("deliveries", "readwrite"), f = u.objectStore("deliveries"), p = f.get([e, t, i]);
      p.onsuccess = () => {
        const h = p.result;
        h && !h.received && (n === void 0 || h.lastAttempt === n) && f.put({
          ...h,
          attempts: r || s ? 5 : h.attempts,
          failure: s ? "paused" : r ? "rejected" : h.failure === "paused" ? "paused" : "unconfirmed"
        });
      }, u.oncomplete = () => a(), u.onerror = u.onabort = () => c(u.error);
    }), await $e(e);
  });
}
async function Vn(e, t, i, r, n = 4, s = () => !0) {
  await st(async () => {
    const o = await De(), a = [];
    await new Promise((c, u) => {
      const f = o.transaction("deliveries", "readwrite"), p = f.objectStore("deliveries").index("scope").openCursor(e);
      p.onsuccess = () => {
        const h = p.result;
        if (!h || a.length >= n || !i()) return;
        const g = h.value;
        if (!g.received && g.message && g.attempts < 5 && Date.now() - g.lastAttempt >= 1e4 && t.includes(g.uid)) {
          if (!s(g.message)) {
            h.update({ ...g, attempts: 5, failure: "paused" }), h.continue();
            return;
          }
          const y = { ...g, attempts: g.attempts + 1, lastAttempt: Date.now(), failure: void 0 };
          h.update(y), a.push(y);
        }
        h.continue();
      }, f.oncomplete = () => c(), f.onabort = () => u(f.error), f.onerror = () => u(f.error);
    });
    for (const c of a) i() && r(c.uid, c.message, c.lastAttempt);
    await $e(e);
  });
}
function oe(e, t) {
  const i = new AbortController(), r = () => i.abort(e?.reason);
  e?.aborted ? r() : e?.addEventListener("abort", r, { once: !0 });
  const n = setTimeout(() => i.abort(new DOMException("视频加载超时，请手动重试", "TimeoutError")), t);
  return { signal: i.signal, dispose() {
    clearTimeout(n), e?.removeEventListener("abort", r), i.abort();
  } };
}
class Fn {
  start() {
    return this.cancel(), this.controller = new AbortController(), this.controller.signal;
  }
  cancel() {
    this.controller?.abort();
  }
}
function Yt(e) {
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
function qn(e) {
  function t(g, y) {
    return g << y | g >>> 32 - y;
  }
  const i = [7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21], r = new Array(64).fill(0).map((g, y) => Math.floor(Math.abs(Math.sin(y + 1)) * 2 ** 32)), n = new TextEncoder().encode(e), s = n.length * 8, o = new Uint8Array((Math.floor((n.length + 8) / 64) + 1) * 64);
  o.set(n), o[n.length] = 128;
  const a = new DataView(o.buffer);
  a.setUint32(o.length - 8, s >>> 0, !0), a.setUint32(o.length - 4, Math.floor(s / 4294967296), !0);
  let c = 1732584193, u = 4023233417, f = 2562383102, p = 271733878;
  for (let g = 0; g < o.length; g += 64) {
    const y = new Array(16);
    for (let I = 0; I < 16; I++) y[I] = a.getUint32(g + I * 4, !0);
    let b = c, A = u, w = f, k = p;
    for (let I = 0; I < 64; I++) {
      let V, _;
      I < 16 ? (V = A & w | ~A & k, _ = I) : I < 32 ? (V = k & A | ~k & w, _ = (5 * I + 1) % 16) : I < 48 ? (V = A ^ w ^ k, _ = (3 * I + 5) % 16) : (V = w ^ (A | ~k), _ = 7 * I % 16);
      const $ = V + b + r[I] + y[_] >>> 0;
      b = k, k = w, w = A, A = A + t($, i[I]) >>> 0;
    }
    c = c + b >>> 0, u = u + A >>> 0, f = f + w >>> 0, p = p + k >>> 0;
  }
  function h(g) {
    let y = "";
    for (let b = 0; b < 4; b++) y += (g >>> b * 8 & 255).toString(16).padStart(2, "0");
    return y;
  }
  return h(c) + h(u) + h(f) + h(p);
}
const Gn = [
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
function Zt(e, t, i) {
  const r = Gn.map((u) => (t + i)[u]).join("").slice(0, 32), n = Math.round(Date.now() / 1e3), s = { ...e, wts: n }, a = Object.keys(s).sort().map((u) => encodeURIComponent(u) + "=" + encodeURIComponent(String(s[u]).replace(/[!'()*]/g, ""))).join("&"), c = qn(a + r);
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
function bo(e, t = "") {
  if (t && typeof t == "string" && t.trim()) return t.trim();
  const i = Number(e);
  return i >= 120 ? "超清 4K" : i === 116 ? "高清 1080P 60帧" : i === 112 ? "高清 1080P+ 高码率" : i === 80 ? "高清 1080P" : i === 74 ? "高码率 720P 60帧" : i === 64 ? "高清 720P" : i === 32 ? "清晰 480P" : i === 16 ? "流畅 360P" : `${i}P`;
}
class ge {
  constructor() {
  }
  static getInstance() {
    return ge.instance || (ge.instance = new ge()), ge.instance;
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
    const r = this.findParent(t, i) || t, n = (r.children || []).findIndex((o) => String(o.id) === String(i));
    if (n < 0) return !1;
    const s = r.children[n];
    return r.children.splice(n, 1, ...s.children || []), !0;
  }
  moveNode(t, i, r, n, s) {
    let o = this.findNode(t, i);
    o || (o = { id: String(i), type: "fav", name: s || "收藏夹", children: [] });
    const a = String(r) === "root" ? t : this.findNode(t, r);
    if (!o || !a || o === a || o.type === "folder" && this.isDescendant(o, a.id))
      return !1;
    if (this.removeNodeById(t, o.id), a === t || n === "into" && a.type === "folder")
      Array.isArray(a.children) || (a.children = []), a.children.push(o);
    else {
      const c = this.findParent(t, a.id) || t;
      Array.isArray(c.children) || (c.children = []);
      const u = Math.max(0, c.children.findIndex((f) => String(f.id) === String(a.id)));
      c.children.splice(u + (n === "after" ? 1 : 0), 0, o);
    }
    return !0;
  }
  syncTreeWithFolders(t, i) {
    let r = !1;
    const n = /* @__PURE__ */ new Map();
    for (const c of i)
      n.set(String(c.id || c.fid), c);
    const s = (c) => {
      if (c.children)
        for (let u = c.children.length - 1; u >= 0; u--) {
          const f = c.children[u];
          if (f.type === "fav")
            if (!n.has(String(f.id)))
              c.children.splice(u, 1), r = !0;
            else {
              const p = n.get(String(f.id));
              p?.title && f.name !== p.title && (f.name = p.title, r = !0);
            }
          else
            s(f);
        }
    };
    s(t);
    const o = /* @__PURE__ */ new Set(), a = (c) => {
      for (const u of c.children || [])
        u.type === "fav" ? o.add(String(u.id)) : a(u);
    };
    a(t), t.children || (t.children = []);
    for (const c of i) {
      const u = String(c.id || c.fid);
      o.has(u) || (t.children.push({
        id: u,
        type: "fav",
        name: c.title || "未命名收藏夹",
        children: []
      }), r = !0);
    }
    return r;
  }
  flattenTree(t, i, r, n) {
    const s = new Map((i || []).map((f) => [String(f.id || f.fid), f])), o = [], a = /* @__PURE__ */ new Set(), c = (f) => (f.children || []).reduce(
      (p, h) => p + (h.type === "fav" ? 1 : c(h)),
      0
    ), u = (f, p = 0) => {
      for (const h of f.children || []) {
        const g = String(h.id), y = s.get(g), b = h.type === "folder";
        b || a.add(g);
        const A = b && r.has(g), w = !b && g === String(n);
        o.push({
          id: g,
          title: String(h.name || y?.title || "未命名收藏夹"),
          count: Number(b ? c(h) : y?.media_count || 0),
          kind: y?.isCollected ? "collected" : y?.isOther ? "other" : "created",
          depth: p,
          group: b,
          collapsed: A,
          selected: w,
          writable: !b && !y?.isCollected && !y?.isOther
        }), b && !A && u(h, p + 1);
      }
    };
    u(t, 0);
    for (const f of i || []) {
      const p = String(f.id || f.fid);
      o.some((h) => !h.group && h.id === p) || !f.isCollected && !f.isOther && a.has(p) || o.push({
        id: p,
        title: f.title || "未命名收藏",
        count: Number(f.media_count || 0),
        kind: f.isCollected ? "collected" : f.isOther ? "other" : "created",
        depth: 0,
        group: !1,
        collapsed: !1,
        selected: p === String(n),
        writable: !f.isCollected && !f.isOther
      });
    }
    return o;
  }
}
class Ue {
  constructor() {
    this.currentUser = null, this.writeQueue = Promise.resolve(), this.lastWriteTime = 0, this.wbiKeysCache = null, this.treeManager = ge.getInstance();
  }
  static getInstance() {
    return Ue.instance || (Ue.instance = new Ue()), Ue.instance;
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
      const s = Date.now() - this.lastWriteTime;
      s < i && await new Promise((o) => setTimeout(o, i - s));
      try {
        const o = await t();
        return this.lastWriteTime = Date.now(), o;
      } catch (o) {
        throw this.lastWriteTime = Date.now(), o;
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
    const s = await this.api(
      `https://api.bilibili.com/x/v3/fav/folder/collected/list?pn=${t}&ps=${i}&up_mid=${n || ""}&platform=web`
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
   * 获取系统虚拟收藏夹 (稍后再看、我的追番)
   */
  getOtherFolders() {
    return [
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
    const s = await this.api(
      `https://api.bilibili.com/x/space/bangumi/follow/list?type=1&follow_status=0&pn=${t}&ps=${i}&vmid=${n || ""}`
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
  async getSeasonVideos(t, i = 1, r = 24) {
    const n = await this.api(
      `https://api.bilibili.com/x/space/fav/season/list?season_id=${t}&pn=${i}&ps=${r}&platform=web`
    ), s = n?.medias || [];
    return {
      medias: s,
      total: Number(n?.info?.media_count || s.length)
    };
  }
  /**
   * 统一分页获取视频资源列表 (自动适配自建/合集/稍后再看/追番)
   */
  async getFolderVideos(t, i = 1, r = 20, n = "mtime", s = "") {
    const o = String(t);
    if (o === "__toview__") {
      const h = await this.getToViewVideos();
      let g = h.medias;
      if (s.trim()) {
        const y = s.toLowerCase();
        g = g.filter((b) => b.title.toLowerCase().includes(y) || b.upper?.name && b.upper.name.toLowerCase().includes(y));
      }
      return {
        info: { title: "稍后再看", media_count: h.total },
        medias: g.slice((i - 1) * r, i * r),
        hasMore: i * r < g.length,
        total: g.length
      };
    }
    if (o === "__bangumi__") {
      const h = await this.getBangumiFollows(i, r);
      return {
        info: { title: "我的追番", media_count: h.total },
        medias: h.medias,
        hasMore: i * r < h.total,
        total: h.total
      };
    }
    if (o.startsWith("season:")) {
      const h = o.replace("season:", ""), g = await this.getSeasonVideos(h, i, r);
      return {
        info: { title: "合集内容", media_count: g.total },
        medias: g.medias,
        hasMore: i * r < g.total,
        total: g.total
      };
    }
    let a = `https://api.bilibili.com/x/v3/fav/resource/list?media_id=${t}&pn=${i}&ps=${r}&order=${n}&platform=web`;
    s.trim() && (a += `&keyword=${encodeURIComponent(s.trim())}`);
    const c = await this.api(a), u = c?.medias || [], f = !!c?.has_more, p = Number(c?.info?.media_count || u.length);
    return {
      info: c?.info,
      medias: u,
      hasMore: f,
      total: p
    };
  }
  /**
   * 在 B站 创建新的收藏夹
   */
  async createRemoteFolder(t, i = 0) {
    const r = await this.getBiliJct();
    if (!r) return { ok: !1, reason: "没有取得 B站 CSRF 登录凭据，请先重新登录 B站" };
    try {
      const n = new URLSearchParams({ title: t, intro: "", privacy: String(i === 0 ? 0 : 1), csrf: r }), s = await fetch("https://api.bilibili.com/x/v3/fav/folder/add", {
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
  async moveVideo(t, i, r, n) {
    return this.enqueueWrite(async () => {
      const s = await this.getBiliJct();
      if (!s) return { ok: !1, reason: "取不到 csrf（bili_jct）" };
      try {
        const o = Array.isArray(r) ? r.map((f) => String(f).includes(":") ? String(f) : `${f}:2`).join(",") : String(r).includes(":") ? String(r) : `${r}:2`, a = new URLSearchParams({
          src_media_id: String(t),
          tar_media_id: String(i),
          mid: String(n || this.currentUser?.mid || ""),
          resources: o,
          platform: "web",
          csrf: s
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
      } catch (o) {
        return { ok: !1, reason: o.message || "移动视频失败" };
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
        const s = await this.getBiliJct();
        if (!s) return { ok: !1, reason: "取不到 csrf（bili_jct）" };
        try {
          const o = new URLSearchParams({
            csrf: s,
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
            body: o.toString()
          })).json();
          if (c.code === 0) return { ok: !0 };
          if ((c.code === 11007 || c.code === -412 || /频繁|稍后|频率/.test(c.message || "")) && n <= r) {
            await new Promise((f) => setTimeout(f, 850 * n));
            continue;
          }
          return { ok: !1, code: c.code, reason: this.formatBiliApiError(c.code, c.message) };
        } catch (o) {
          if (n <= r) {
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
    const n = r?.wbi_img?.img_url?.split("/").pop()?.split(".")[0] || "", s = r?.wbi_img?.sub_url?.split("/").pop()?.split(".")[0] || "";
    if (!n || !s)
      throw new Error("无法获取 B 站 WBI 鉴权密钥");
    return this.wbiKeysCache = { ik: n, sk: s, expire: i + 3600 * 1e3 }, { ik: n, sk: s };
  }
  /**
   * 获取指定清晰度的视频/音频直链播放流 (支持逐级清晰度自动降阶重试与 WBI 签名直链备用获取)
   */
  async fetchPlayStream(t, i, r = 64, n) {
    const s = oe(n, 18e3), o = s.signal, a = async (u) => {
      o.throwIfAborted();
      const f = oe(o, 5e3);
      try {
        return await this.api(u, { signal: f.signal });
      } finally {
        f.dispose();
      }
    }, c = (u) => {
      if (o.throwIfAborted(), [401, 403, 412, 429].includes(u?.status) || [-101, -111, -352, -412].includes(u?.code) || u?.name === "TimeoutError" || u?.name === "AbortError" || u instanceof TypeError) throw u;
    };
    try {
      o.throwIfAborted();
      const u = Array.from(/* @__PURE__ */ new Set([r, 64, 32, 16]));
      let f = null, p = [], h = r;
      const g = (y) => {
        if (!y) return [];
        const b = Array.isArray(y.durl) ? y.durl : Array.isArray(y.result?.durl) ? y.result.durl : [], A = [];
        for (const w of b.slice(0, 1))
          if (w?.url && A.push(String(w.url)), Array.isArray(w?.backup_url))
            for (const k of w.backup_url)
              k && A.push(String(k));
        return Array.from(new Set(A.filter(Boolean).map((w) => w.replace(/^http:/, "https:")))).filter((w) => {
          try {
            const k = new URL(w);
            return k.protocol === "https:" && !k.username && !k.password;
          } catch {
            return !1;
          }
        });
      };
      for (const y of u)
        try {
          const b = t ? `bvid=${encodeURIComponent(t)}` : "", A = await a(
            `https://api.bilibili.com/x/player/playurl?${b}&cid=${i}&qn=${y}&fnval=1&fourk=0&platform=html5&high_quality=1`
          ), w = g(A);
          if (w.length > 0) {
            f = A, p = w, h = Number(A?.quality || y);
            break;
          }
        } catch (b) {
          c(b);
        }
      if (!p.length)
        for (const y of Array.from(/* @__PURE__ */ new Set([r, 64, 32])))
          try {
            const b = oe(o, 5e3);
            let A;
            try {
              A = await this.getWbiKeys(b.signal);
            } finally {
              b.dispose();
            }
            const { ik: w, sk: k } = A, I = { cid: i, qn: y, fnval: 1, fourk: 0 };
            t && (I.bvid = t);
            const { signedQuery: V } = Zt(I, w, k), _ = await a(
              `https://api.bilibili.com/x/player/wbi/playurl?${V}`
            ), $ = g(_);
            if ($.length > 0) {
              f = _, p = $, h = Number(_?.quality || y);
              break;
            }
          } catch (b) {
            c(b);
          }
      if (!p.length)
        throw new Error("未能获取到有效视频直链播放流");
      return {
        sources: p,
        quality: h,
        acceptQuality: f?.accept_quality || [80, 64, 32, 16],
        acceptDescription: f?.accept_description || ["1080P 高清", "720P 高清", "480P 清晰", "360P 流畅"]
      };
    } finally {
      s.dispose();
    }
  }
  /**
   * 获取音频流：优先提取 DASH 纯音频流 (M4A，体积仅 ~3MB，彻底消除视频冗余与限速)，若无纯音频则降级至 360P 流畅视频流 (极小体积保底)
   */
  async fetchAudioStream(t, i, r) {
    const n = oe(r, 18e3), s = n.signal, o = async (u) => {
      s.throwIfAborted();
      const f = oe(s, 5e3);
      try {
        return await this.api(u, { signal: f.signal });
      } finally {
        f.dispose();
      }
    }, a = (u) => {
      if (s.throwIfAborted(), [401, 403, 412, 429].includes(u?.status) || [-101, -111, -352, -412].includes(u?.code) || u?.name === "TimeoutError" || u?.name === "AbortError" || u instanceof TypeError) throw u;
    }, c = (u) => {
      const f = u?.dash || u?.result?.dash, p = Array.isArray(f?.audio) ? f.audio : [];
      if (!p.length) return [];
      const h = [...p].sort((y, b) => Number(b?.id || 0) - Number(y?.id || 0)), g = [];
      for (const y of h) {
        if (y?.baseUrl && g.push(String(y.baseUrl)), y?.base_url && g.push(String(y.base_url)), Array.isArray(y?.backupUrl))
          for (const b of y.backupUrl) b && g.push(String(b));
        if (Array.isArray(y?.backup_url))
          for (const b of y.backup_url) b && g.push(String(b));
      }
      return Array.from(new Set(g.filter(Boolean).map((y) => y.replace(/^http:/, "https:")))).filter((y) => {
        try {
          const b = new URL(y);
          return b.protocol === "https:" && !b.username && !b.password;
        } catch {
          return !1;
        }
      });
    };
    try {
      s.throwIfAborted();
      try {
        const f = t ? `bvid=${encodeURIComponent(t)}` : "", p = await o(
          `https://api.bilibili.com/x/player/playurl?${f}&cid=${i}&qn=16&fnval=16&fourk=0&platform=html5`
        ), h = c(p);
        if (h.length > 0)
          return { sources: h, isPureAudio: !0 };
      } catch (f) {
        a(f);
      }
      try {
        const f = oe(s, 5e3);
        let p;
        try {
          p = await this.getWbiKeys(f.signal);
        } finally {
          f.dispose();
        }
        const { ik: h, sk: g } = p, y = { cid: i, qn: 16, fnval: 16, fourk: 0 };
        t && (y.bvid = t);
        const { signedQuery: b } = Zt(y, h, g), A = await o(`https://api.bilibili.com/x/player/wbi/playurl?${b}`), w = c(A);
        if (w.length > 0)
          return { sources: w, isPureAudio: !0 };
      } catch (f) {
        a(f);
      }
      return { sources: (await this.fetchPlayStream(t, i, 16, s)).sources, isPureAudio: !1 };
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
    const n = String(t.bvid || "").trim(), s = String(t.aid || "").trim(), o = n.startsWith("BV") ? n : "", a = s.replace(/^av/i, "") || (n.startsWith("BV") ? "" : n.replace(/^av/i, "")), c = o ? `bvid=${encodeURIComponent(o)}` : `aid=${encodeURIComponent(a)}`, u = oe(r, 2e4), f = u.signal;
    try {
      f.throwIfAborted();
      const p = t.cid && o && i === 1 ? this.fetchPlayStream(o, t.cid, Number(t.preferredQuality || 64), f).then((T) => ({ value: T, error: null }), (T) => ({ value: null, error: T })) : null;
      let h = null;
      try {
        const T = oe(f, 6e3);
        try {
          h = await this.api(`https://api.bilibili.com/x/web-interface/view?${c}`, { signal: T.signal });
        } finally {
          T.dispose();
        }
      } catch {
        f.throwIfAborted();
      }
      const g = h?.bvid || "", y = g.startsWith("BV") ? g : o || "", A = (Array.isArray(h?.pages) ? h.pages : []).map((T) => ({
        cid: T.cid,
        page: T.page,
        part: T.part || `第${T.page}集`,
        duration: T.duration || 0
      })), w = A.findIndex((T) => T.page === i), k = w >= 0 ? A[w] : A[0] || null, I = k?.cid || h?.cid || t.cid;
      if (!I)
        throw new Error("无法获取视频 CID 标识");
      const V = Number(t.preferredQuality || 64), _ = p && String(I) === String(t.cid) ? await p : null;
      f.throwIfAborted();
      const $ = _ && String(I) === String(t.cid) ? _.value || (() => {
        throw _.error;
      })() : await this.fetchPlayStream(y, I, V, f);
      return {
        title: h?.title || t.title || y,
        poster: String(h?.pic || t.cover || "").replace(/^http:/, "https:"),
        sources: $.sources,
        aid: h?.aid || t.aid || null,
        bvid: y,
        cid: I || null,
        owner: h?.owner?.name || t.owner || t.author || "UP主",
        ownerFace: h?.owner?.face ? String(h.owner.face).replace(/^http:/, "https:") : t.ownerFace || t.face || "",
        ownerMid: h?.owner?.mid || null,
        pubdate: h?.pubdate || 0,
        desc: h?.desc || t.desc || "暂无简介",
        views: h?.stat?.view || t.views || 0,
        danmaku: h?.stat?.danmaku || t.danmaku || 0,
        likes: h?.stat?.like || t.likes || 0,
        currentQuality: $.quality,
        acceptQuality: $.acceptQuality,
        acceptDescription: $.acceptDescription,
        pages: A,
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
    const s = Array.isArray(n?.pages) ? n.pages : [], o = i ? s.find((U) => U.cid === i) : null, a = i || n.cid, c = o?.part ? ` · P${o.page} ${o.part}` : "", { ik: u, sk: f } = await this.getWbiKeys(r);
    r?.throwIfAborted();
    const { signedQuery: p } = Zt({ bvid: t, cid: a }, u, f), h = await this.api(`https://api.bilibili.com/x/player/wbi/v2?${p}`, { signal: r });
    if (r?.throwIfAborted(), r && !Array.isArray(h?.subtitle?.subtitles)) throw new Error("字幕轨道返回异常或当前账号无权读取");
    const g = h?.subtitle?.subtitles || [];
    if (!g.length)
      return { ok: !1, reason: `该视频${c ? "（" + c.trim() + "）" : ""}没有可用字幕`, cues: [] };
    const y = g.find((U) => /zh|中文|汉语|漢語/i.test((U.lan || "") + " " + (U.lan_doc || ""))) || g[0], b = y.subtitle_url || "", A = b.startsWith("//") ? `https:${b}` : b.startsWith("http") ? b : `https://${b}`, w = await fetch(A, { signal: r, credentials: "include", headers: { Accept: "application/json" } });
    if (!w.ok) throw new Error(`字幕获取失败: ${w.status}`);
    const k = await w.arrayBuffer();
    r?.throwIfAborted();
    let I;
    try {
      I = JSON.parse(new TextDecoder("utf-8", { fatal: !0 }).decode(k));
    } catch {
      try {
        I = JSON.parse(new TextDecoder("gb18030").decode(k));
      } catch {
        I = JSON.parse(new TextDecoder("big5").decode(k));
      }
    }
    if (r && !Array.isArray(I?.body)) throw new Error("字幕正文格式异常");
    const _ = (I?.body || []).map((U, Nr) => ({
      id: `${U.from || 0}_${Nr}`,
      from: Number(U.from || 0),
      to: Number(U.to || U.from || 0),
      content: String(U.content || "").trim()
    })).filter((U) => U.content), $ = (n.title || t) + c, T = [];
    if (T.push("标题：" + $), T.push("字幕轨道：" + g.map((U) => U.lan_doc || U.lan || "未知").join(" / ") + "（已选：" + (y.lan_doc || y.lan || "默认") + "）"), n.owner?.name && T.push("UP主：" + n.owner.name), n.pubdate) {
      const U = new Date(n.pubdate * 1e3);
      T.push(`发布时间：${U.getFullYear()}-${String(U.getMonth() + 1).padStart(2, "0")}-${String(U.getDate()).padStart(2, "0")}`);
    }
    T.push("链接：https://www.bilibili.com/video/" + t + (o?.page ? `?p=${o.page}` : ""));
    const zt = _.map((U) => U.content).join(`\r
`), Rr = T.join(`\r
`) + `\r
\r
———— 字幕正文 ————\r
\r
`;
    return {
      ok: !0,
      title: $,
      bodyText: zt,
      headText: Rr,
      lineCount: _.length,
      cues: _,
      aid: n.aid,
      desc: n.desc || "",
      viewPoints: Array.isArray(h?.view_points) ? h.view_points : []
    };
  }
  /**
   * 拉取并解析 B站 JSON 格式字幕流为标准化 Cue 列表
   */
  async fetchSubtitleCues(t) {
    if (!t) return [];
    const i = t.startsWith("//") ? `https:${t}` : t, r = await fetch(i);
    if (!r.ok) throw new Error(`字幕获取失败: ${r.statusText}`);
    return ((await r.json()).body || []).map((o) => ({
      from: Number(o.from || 0),
      to: Number(o.to || 0),
      content: String(o.content || "").trim()
    }));
  }
  /**
   * 分页获取视频评论区列表
   */
  async getVideoComments(t, i = 1, r = 20, n = 2) {
    const s = await this.api(
      `https://api.bilibili.com/x/v2/reply?type=1&oid=${t}&pn=${i}&ps=${r}&sort=${n}`
    ), o = s?.replies || [], a = s?.page || {}, c = Number(a.count || 0);
    return {
      comments: o.map((f) => {
        const p = {};
        if (f.content?.emote && typeof f.content.emote == "object")
          for (const [g, y] of Object.entries(f.content.emote)) {
            const b = y?.url;
            typeof b == "string" && b && (p[g] = b.replace(/^http:/, "https:"));
          }
        const h = Array.isArray(f.replies) ? f.replies.map((g) => ({
          rpid: g.rpid,
          mid: Number(g.mid || 0),
          uname: String(g.member?.uname || "B站用户"),
          avatar: String(g.member?.avatar || "").replace(/^http:/, "https:"),
          message: String(g.content?.message || ""),
          timeText: new Date(Number(g.ctime || 0) * 1e3).toLocaleString(),
          like: Number(g.like || 0),
          pictures: Yt(g.content?.pictures)
        })) : [];
        return {
          rpid: f.rpid,
          mid: Number(f.mid || 0),
          uname: String(f.member?.uname || "匿名用户"),
          avatar: String(f.member?.avatar || "").replace(/^http:/, "https:"),
          message: String(f.content?.message || ""),
          timeText: new Date(Number(f.ctime || 0) * 1e3).toLocaleString(),
          like: Number(f.like || 0),
          rcount: Number(f.rcount || 0),
          pictures: Yt(f.content?.pictures),
          emotes: p,
          replies: h
        };
      }),
      total: c,
      hasMore: i * r < c
    };
  }
  /**
   * 分页获取某条根评论下的子回复（楼中楼）
   */
  async getSubReplies(t, i, r = 1, n = 10) {
    const s = await this.api(
      `https://api.bilibili.com/x/v2/reply/reply?type=1&oid=${t}&root=${i}&pn=${r}&ps=${n}`
    ), o = s?.replies || [], a = s?.page || {}, c = Number(a.count || 0);
    return {
      replies: o.map((f) => {
        const p = {};
        if (f.content?.emote && typeof f.content.emote == "object")
          for (const [h, g] of Object.entries(f.content.emote)) {
            const y = g?.url;
            typeof y == "string" && y && (p[h] = y.replace(/^http:/, "https:"));
          }
        return {
          rpid: f.rpid,
          mid: Number(f.mid || 0),
          uname: String(f.member?.uname || "B站用户"),
          avatar: String(f.member?.avatar || "").replace(/^http:/, "https:"),
          message: String(f.content?.message || ""),
          timeText: new Date(Number(f.ctime || 0) * 1e3).toLocaleString(),
          like: Number(f.like || 0),
          pictures: Yt(f.content?.pictures),
          emotes: p
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
      const o = new DOMParser().parseFromString(r, "text/xml").querySelectorAll("d"), a = [];
      return o.forEach((c, u) => {
        const p = (c.getAttribute("p") || "").split(","), h = parseFloat(p[0]) || 0, g = parseInt(p[1], 10) || 1, y = parseInt(p[2], 10) || 25, A = `#${(parseInt(p[3], 10) || 16777215).toString(16).padStart(6, "0")}`, w = parseInt(p[4], 10) || 0, k = parseInt(p[5], 10) || 0, I = p[6] || "", V = p[7] || String(u), _ = c.textContent?.trim() || "";
        if (_) {
          const $ = Math.floor(h / 60), T = Math.floor(h % 60), zt = `${String($).padStart(2, "0")}:${String(T).padStart(2, "0")}`;
          a.push({
            id: V,
            time: h,
            timeStr: zt,
            mode: g,
            size: y,
            color: A,
            timestamp: w,
            pool: k,
            userHash: I,
            text: _
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
const Z = Ue.getInstance();
ge.getInstance();
const pt = new Fn(), Kn = {
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
}, l = L({ ...Kn });
let zn = 1e4;
function D(e, t = !1) {
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
let qe = "";
function xi() {
  qe && URL.revokeObjectURL(qe), qe = "";
}
const Hn = {
  get state() {
    return l;
  },
  bringToFront() {
    l.zIndex = ++zn;
  },
  /**
   * 打开并播放指定视频
   */
  async openVideo(e) {
    const t = e.bvid || "", i = e.aid ? String(e.aid) : "";
    if (!t && !i) {
      D("无法播放：缺少视频标识 (BV/AV号)", !0);
      return;
    }
    this.bringToFront();
    const r = !!t && l.bvid === t || !!i && l.aid === i;
    if (l.isOpen && r && !e.cachedSourceUrl && (l.videoSrc || l.iframeSrc) && !l.errorMsg) {
      l.collapsed = !1;
      return;
    }
    const n = pt.start();
    if (xi(), l.isOpen = !0, l.collapsed = !1, l.isLoading = !0, l.errorMsg = "", l.bvid = t, l.aid = i, l.cid = e.cid || "", l.title = e.title || t || "加载中…", l.cover = e.cover || "", l.author = e.author || "", l.authorMid = e.mid ? String(e.mid) : "", l.authorFace = e.authorFace || "", l.videoSrc = "", l.sourceUrls = [], l.iframeSrc = "", l.useIframe = !1, l.currentTime = 0, l.pages = [], l.currentPageIndex = 0, l.comments = [], l.commentsPage = 1, l.hasMoreComments = !1, l.totalComments = 0, l.danmakuList = [], l.danmakuLoading = !1, typeof window < "u" && (l.x = Math.max(20, Math.floor((window.innerWidth - 380) / 2)), l.y = Math.max(60, Math.min(100, Math.floor((window.innerHeight - 254) / 3)))), e.cachedSourceUrl) {
      qe = e.cachedSourceUrl, l.videoSrc = qe, l.isLoading = !1;
      return;
    }
    try {
      const s = await Z.resolvePlayStream({
        bvid: t,
        aid: i,
        cid: e.cid,
        title: e.title,
        cover: e.cover,
        preferredQuality: l.currentQuality
      }, 1, n);
      if (n.throwIfAborted(), l.title = s.title || e.title || t, l.cover = s.poster || e.cover || "", l.author = s.owner || e.author || "UP主", l.authorFace = s.ownerFace || e.authorFace || "", s.ownerMid && (l.authorMid = String(s.ownerMid)), l.aid = s.aid ? String(s.aid) : i, l.bvid = s.bvid || t, l.cid = s.cid || "", l.description = s.desc || "", l.pubdate = s.pubdate ? new Date(s.pubdate * 1e3).toLocaleString() : "", l.pages = s.pages || [], l.currentPageIndex = Math.max(0, s.currentPage - 1), s.acceptQuality?.length && (l.qualities = s.acceptQuality.map((o, a) => ({
        qn: o,
        desc: s.acceptDescription?.[a] || $i(o)
      }))), l.currentQuality = s.currentQuality || 64, s.sources && s.sources.length)
        l.sourceUrls = s.sources, l.videoSrc = s.sources[0], l.isPlaying = !0, l.danmakuEnabled && this.loadDanmaku();
      else
        throw new Error("未能获取到直链源");
    } catch (s) {
      if (n.aborted) return;
      l.errorMsg = s?.message || "未能获取到视频播放流", D(`视频加载未完成：${l.errorMsg}`, !0);
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
      D("当前视频未获取到原生流，保持内嵌模式");
      return;
    }
    l.useIframe = !l.useIframe, l.useIframe && !l.iframeSrc && (l.iframeSrc = `https://player.bilibili.com/player.html?bvid=${encodeURIComponent(l.bvid)}&autoplay=1&danmaku=0&high_quality=1`), D(l.useIframe ? "已切换至官方嵌入播放模式" : "已切换至原生播放模式");
  },
  /**
   * 切换选集（分P）
   */
  async switchEpisode(e) {
    if (e < 0 || e >= l.pages.length) return;
    const t = l.pages[e];
    if (!t) return;
    l.currentPageIndex = e, l.cid = t.cid, l.videoSrc = "", l.sourceUrls = [], l.isLoading = !0, l.errorMsg = "", l.danmakuList = [], l.danmakuLoading = !1;
    const i = pt.start();
    try {
      const r = await Z.fetchPlayStream(
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
      l.errorMsg = r?.message || "切换选集失败", D(`分P切换失败：${l.errorMsg}`, !0);
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
    const t = l.currentTime, i = pt.start();
    try {
      const r = await Z.fetchPlayStream(
        l.bvid,
        l.cid,
        e,
        i
      );
      i.throwIfAborted(), r.sources?.length && (l.sourceUrls = r.sources, l.videoSrc = r.sources[0], l.currentQuality = r.quality, l.currentTime = t, l.isPlaying = !0, D(`已切换清晰度为 ${$i(e)}`));
    } catch (r) {
      if (i.aborted) return;
      D(`清晰度切换失败：${r?.message || "网络异常"}`, !0);
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
    pt.cancel(), l.isLoading = !1, l.sourceUrls = [], xi(), l.isOpen = !1, l.isPlaying = !1, l.videoSrc = "", l.episodesOpen = !1, l.descOpen = !1, l.commentsOpen = !1;
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
    l.danmakuEnabled = t, D(t ? "已开启弹幕" : "已关闭弹幕"), t && (!l.danmakuList.length || l.danmakuLoading) && this.loadDanmaku();
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
          const r = await Z.getVideoView(l.bvid);
          r?.cid && (t = r.cid, l.cid = t);
        }
        if (!t) {
          l.danmakuLoading = !1, D("未能获取到当前视频的 cid，暂无法拉取弹幕", !0);
          return;
        }
        const i = await Z.getVideoDanmaku(t);
        l.danmakuList = i, i.length > 0 ? D(`✓ 已成功获取 ${i.length} 条弹幕`) : D("当前视频暂无弹幕或弹幕列表为空");
      } catch (t) {
        console.warn("[MiniPlayer] 获取弹幕失败:", t), D(`获取弹幕失败: ${t?.message || "网络异常"}`, !0);
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
`)), D("已复制视频简介到剪贴板");
    } catch {
      D("复制简介失败", !0);
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
        const n = await Z.getVideoView(l.bvid);
        n?.aid && (t = String(n.aid), l.aid = t);
      }
      if (!t) {
        l.commentsLoading = !1;
        return;
      }
      const i = await Z.getVideoComments(
        t,
        l.commentsPage,
        20,
        l.commentsSort
      ), r = (i.comments || []).map((n) => {
        const s = n.mid ? String(n.mid) : "", o = String(n.uname || "").trim(), a = l.authorMid ? String(l.authorMid) : "", c = String(l.author || "").trim(), u = !!(a && s && a === s || c && o && c === o);
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
          isUp: u,
          replies: (n.replies || []).map((f) => ({
            id: String(f.rpid),
            userName: f.uname,
            message: f.message,
            pictures: f.pictures || [],
            emotes: f.emotes
          }))
        };
      });
      e ? l.comments = r : l.comments = [...l.comments, ...r], l.totalComments = i.total || l.comments.length, l.hasMoreComments = i.hasMore;
    } catch (t) {
      D(`评论加载失败：${t?.message || "网络异常"}`, !0);
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
          const a = await Z.getVideoView(l.bvid);
          a?.aid && (i = String(a.aid), l.aid = i);
        }
        if (!i) {
          t.subRepliesLoading = !1;
          return;
        }
        const r = await Z.getSubReplies(i, e, t.subRepliesPage, 10), n = (r.replies || []).map((a) => ({
          id: String(a.rpid),
          userName: a.uname,
          message: a.message,
          pictures: a.pictures || [],
          emotes: a.emotes
        })), s = new Set((t.replies || []).map((a) => String(a.id))), o = n.filter((a) => !s.has(String(a.id)));
        t.replies = [...t.replies || [], ...o], t.subRepliesHasMore = r.hasMore;
      } catch (i) {
        D(`子回复加载失败：${i?.message || "网络异常"}`, !0);
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
}, Jn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  biliMiniPlayerController: Hn,
  biliMiniPlayerState: l
}, Symbol.toStringTag, { value: "Module" }));
function Qn() {
  if (l.isOpen && l.title)
    return {
      type: "bilibili",
      title: l.title,
      url: l.bvid ? `https://www.bilibili.com/video/${l.bvid}` : void 0,
      updatedAt: Date.now()
    };
  if (m.playing && m.title)
    return {
      type: "music",
      title: `${m.title} - ${m.artist || "未知歌手"}`,
      updatedAt: Date.now()
    };
  const e = Y.activeId;
  if (e === "card-github")
    return { type: "github", title: "GitHub 热门开源仓库", updatedAt: Date.now() };
  if (e === "daily-bilibili")
    return { type: "bilibili", title: "Bilibili 视频工作区", updatedAt: Date.now() };
  if (e === "daily-aihot")
    return { type: "aihot", title: "AI HOT 热门前沿资讯", updatedAt: Date.now() };
  if (e === "daily-youtube")
    return { type: "youtube", title: "YouTube 精选视频流", updatedAt: Date.now() };
  if (e === "daily-pricing")
    return { type: "idle", title: "大模型 API 定价与算力比对", updatedAt: Date.now() };
  if (e === "todoist")
    return { type: "idle", title: "Todoist 待办任务清单", updatedAt: Date.now() };
}
function Yn(e) {
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
function Zn(e, t) {
  if (d.visible) return;
  const i = t || S.channel || "main", r = S.rooms.find((o) => o.id === i), n = r?.name ? `#${r.name}` : void 0;
  let s = "assets/icon-48.png";
  if (e.sender?.avatar && /^https?:\/\//i.test(e.sender.avatar)) {
    const o = Ot(e.sender.avatar);
    o && (s = o);
  }
  X.show({
    id: `chat_msg_${e.id}`,
    appType: "chat",
    appName: "海狸聊天室",
    icon: s,
    title: e.sender?.name || "新消息",
    subtitle: n,
    message: Yn(e),
    duration: 6500,
    level: "info",
    history: !0,
    target: { type: "module", moduleId: "chat" },
    actionLabel: "查看消息",
    onClick: () => {
      Mt.handleToolClick("chat");
    }
  });
}
class Ne extends Error {
  constructor(t) {
    super(`服务器响应 ${t}`), this.status = t, this.name = "PrivateChatHttpError";
  }
}
class ve extends Error {
  constructor() {
    super(...arguments), this.name = "ChatCapabilityError";
  }
}
function wr(e, t, i) {
  return new Promise((r, n) => {
    const s = new AbortController(), o = () => s.abort(new DOMException("聊天室操作已停止等待", "AbortError")), a = () => {
      clearTimeout(u), i?.removeEventListener("abort", o), s.signal.removeEventListener("abort", c);
    }, c = () => {
      a(), n(s.signal.reason);
    }, u = setTimeout(() => s.abort(new DOMException("聊天室操作超时，结果可能尚未确认", "TimeoutError")), e);
    if (s.signal.addEventListener("abort", c, { once: !0 }), i?.addEventListener("abort", o, { once: !0 }), i?.aborted) {
      o();
      return;
    }
    Promise.resolve().then(() => (s.signal.throwIfAborted(), t(s.signal))).then(
      (f) => {
        a(), s.signal.aborted ? n(s.signal.reason) : r(f);
      },
      (f) => {
        a(), n(f);
      }
    );
  });
}
class q extends Error {
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
class Xn {
  constructor(t = () => {
  }) {
    this.onBlocked = t;
  }
  open() {
    if (this.database) return this.database;
    const t = new Promise((i, r) => {
      let n = !1;
      const s = (a) => {
        n || (n = !0, clearTimeout(o), r(a));
      }, o = setTimeout(() => s(new q("timeout")), 8e3);
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
          }, i(c);
        }, a.onerror = () => s(new q("storage")), a.onblocked = () => {
          if (!n) {
            s(new q("blocked"));
            try {
              this.onBlocked();
            } catch {
            }
          }
        };
      } catch {
        s(new q("storage"));
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
    if (!Qe(i)) throw new q("invalid");
    await this.access(t, i);
  }
  access(t, i, r) {
    const n = C(t);
    return wr(8e3, async (s) => {
      try {
        const o = await this.open();
        return s.throwIfAborted(), await new Promise((a, c) => {
          const u = o.transaction("credentials", i === void 0 ? "readonly" : "readwrite"), f = u.objectStore("credentials"), p = i === void 0 ? f.get(n) : f.put(i, n), h = () => {
            try {
              u.abort();
            } catch {
            }
          }, g = () => s.removeEventListener("abort", h);
          i === void 0 && s.addEventListener("abort", h, { once: !0 }), u.oncomplete = () => {
            g();
            const y = i === void 0 ? p.result : i;
            y === void 0 || y === "" ? c(new q("missing")) : Qe(y) ? a(y) : c(new q("invalid"));
          }, u.onabort = u.onerror = p.onerror = () => {
            g(), c(new q("storage"));
          };
        });
      } catch (o) {
        throw s.aborted ? s.reason : o instanceof q ? o : new q("storage");
      }
    }, r);
  }
}
class me extends Error {
  constructor() {
    super(...arguments), this.name = "PrivateChatTransportError";
  }
}
class es {
  constructor(t) {
    this.ports = t;
  }
  async request(t) {
    let i, r;
    try {
      if (i = Object.freeze({ ...nt(t.destination), channel: t.destination.channel }), r = new URL(t.path, i.origin), !t.path.startsWith("/api/v1/") || t.path.includes("\\") || r.origin !== i.origin || r.hash || r.username || r.password || !r.pathname.startsWith("/api/v1/")) throw new Error();
    } catch {
      throw new me("聊天室请求目标无效");
    }
    const n = Object.freeze({ ...t, destination: i, path: r.pathname, method: (t.method || "GET").toUpperCase() });
    return r.searchParams.set("room", i.room), r.searchParams.delete("channel"), i.channel && i.channel !== "main" && r.searchParams.set("channel", i.channel), wr(n.signal ? 3e4 : 15e3, async (s) => {
      try {
        const o = await this.ports.credential(i, s);
        if (s.throwIfAborted(), !Qe(o)) throw new q("invalid");
        this.ports.beforeSend(n);
        let a;
        try {
          a = n.body === void 0 ? void 0 : JSON.stringify(n.body);
        } catch {
          throw new me("聊天室请求内容格式无效");
        }
        const c = await fetch(r, {
          method: n.method,
          signal: s,
          body: a,
          headers: { Authorization: `Bearer ${o}`, "Content-Type": "application/json" },
          redirect: "error",
          credentials: "omit",
          cache: "no-store",
          referrerPolicy: "no-referrer"
        }), u = () => {
          c.body?.cancel().catch(() => {
          });
        };
        if (s.aborted && (u(), s.throwIfAborted()), !c.ok)
          throw u(), new Ne(c.status);
        const f = c.body?.getReader();
        if (!f) throw new me("聊天室返回空响应");
        const p = () => {
          f.cancel().catch(() => {
          });
        };
        s.addEventListener("abort", p, { once: !0 });
        let h = 0, g = "";
        const y = new TextDecoder();
        try {
          for (; ; ) {
            const b = await f.read();
            if (s.throwIfAborted(), b.done) break;
            if (h += b.value.byteLength, h > 2 * 1024 * 1024)
              throw p(), new me("聊天室响应超限");
            g += y.decode(b.value, { stream: !0 });
          }
          try {
            return JSON.parse(g + y.decode());
          } catch {
            throw new me("聊天室响应格式无效");
          }
        } finally {
          s.removeEventListener("abort", p);
          try {
            f.releaseLock();
          } catch {
          }
        }
      } catch (o) {
        throw s.aborted ? s.reason : o instanceof Ne || o instanceof ve || o instanceof q || o instanceof me ? o : new me("聊天室请求失败，请检查网络或服务配置");
      }
    }, n.signal);
  }
}
class ts {
  constructor(t) {
    this.ports = t, this.generation = 0, this.halted = !0, this.liveGeneration = -1, this.reads = new Lr();
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
    const s = this.ports.visible(), o = this.reads.begin({ timeoutMs: s ? 25e3 : 2e4, isCurrent: () => this.owns(t, i) });
    let a = s ? 2500 : 1e4, c = "读取本地历史";
    const u = {
      signal: o.signal,
      current: o.current,
      wait: o.wait,
      visible: s,
      phase: (f) => {
        c = f;
      },
      restoring: () => this.liveGeneration !== i,
      caughtUp: () => {
        o.current() && (this.liveGeneration = i);
      }
    };
    try {
      this.ports.started();
      const f = await o.wait(() => this.ports.poll(t, u));
      if (!o.current()) return;
      r = 0, f?.hasMore && (a = 250);
    } catch (f) {
      if (!this.owns(t, i)) return;
      const p = this.ports.classify(f, t);
      p === "retry" ? (++r, a = Math.min(6e4, 1500 * 2 ** Math.min(r, 4))) : this.halted = !0, this.ports.failed(p, c, r), p === "missing-room" && i === this.generation && this.halted && this.schedule(() => this.ports.restart(), 0, i);
    } finally {
      o.finish(), this.running === n && (this.running = void 0), i === this.generation && (this.ports.active(t) || (this.halted = !0), this.ports.idle()), this.owns(t, i) && this.schedule(() => {
        this.tick(t, i, r);
      }, a, i);
    }
  }
}
const re = (e) => !!e && typeof e == "object" && !Array.isArray(e), le = (e) => typeof e == "string" && /^[A-Za-z0-9_-]{1,160}$/.test(e), Ge = (e) => e == null, Ye = (e) => typeof e == "number" && Number.isFinite(e) && e >= 0;
function B() {
  throw new Error("同步页格式无效，未提交本页记录或推进游标");
}
function Ft(e) {
  if (!Array.isArray(e) || e.length > 32) throw new Error("房间列表格式无效");
  return e.map((t) => {
    if (!re(t) || !le(t.id) || typeof t.name != "string" || t.name.length > 80 || typeof t.icon != "string" || t.icon.length > 8 || typeof t.description != "string" || t.description.length > 500) throw new Error("房间格式无效");
    if (t.space !== void 0 && !le(t.space)) throw new Error("空间格式无效");
    return { id: t.id, name: t.name, icon: t.icon, description: t.description, space: typeof t.space == "string" ? t.space : "hub_main" };
  });
}
function qt(e) {
  if (!Array.isArray(e) || e.length > 16) throw new Error("空间列表格式无效");
  return e.map((t) => {
    if (!re(t) || !le(t.id) || typeof t.name != "string" || t.name.length > 80 || typeof t.icon != "string" || t.icon.length > 8) throw new Error("空间格式无效");
    return { id: t.id, name: t.name, icon: t.icon };
  });
}
function br(e, t) {
  if (typeof e.name != "string" || e.name.length > 200) return;
  const i = An({ ...e, name: e.name.slice(0, 100) }, t);
  return i && { ...i, name: e.name };
}
function is(e, t) {
  return Ge(e) ? [] : ((!Array.isArray(e) || e.length > 65) && B(), e.map((i) => {
    (!re(i) || !le(i.uid) || i.role !== void 0 && i.role !== "owner" && i.role !== "member") && B();
    const r = br(i, t);
    return r || B(), r.activity && re(i.activity) && Ye(i.activity.updatedAt) && (r.activity.updatedAt = i.activity.updatedAt), {
      ...r,
      role: i.role === "owner" ? "owner" : "member",
      online: typeof i.online == "boolean" ? i.online : void 0,
      lastSeen: Ye(i.lastSeen) ? i.lastSeen : void 0
    };
  }));
}
function rs(e, t, i) {
  if (!Ge(e))
    return (!Array.isArray(e) || e.length > 200) && B(), e.map((r) => {
      (!re(r) || !le(r.id) || !le(r.toUid) || !re(r.from) || !le(r.from.uid)) && B();
      const n = br(r.from, i);
      return (!n || n.uid !== t && r.toUid !== t || !["pending", "accepted", "rejected"].includes(String(r.status))) && B(), r.createdAt !== void 0 && !Ye(r.createdAt) && B(), {
        id: r.id,
        from: n,
        toUid: r.toUid,
        status: r.status,
        createdAt: Ye(r.createdAt) ? r.createdAt : i,
        note: typeof r.note == "string" && r.note.length <= 200 ? r.note : void 0
      };
    });
}
function ns(e, t, i, r) {
  (!Number.isSafeInteger(i) || i < 0 || !Ye(r) || !re(e) || !re(e.identity) || e.identity.uid !== t || e.identity.role !== "owner" && e.identity.role !== "member" || !Array.isArray(e.messages) || e.messages.length > 50) && B();
  let n = i;
  const s = [], o = [];
  for (const u of e.messages) {
    (!re(u) || !Number.isSafeInteger(u.seq) || u.seq <= n) && B();
    const f = sr(u.message, r);
    f || B(), s.push(f), o.push(u.seq), n = u.seq;
  }
  e.hasMore !== void 0 && typeof e.hasMore != "boolean" && B();
  const a = e.hasMore === !0;
  a && !s.length && B();
  let c;
  return Ge(e.friends) || ((!Array.isArray(e.friends) || e.friends.length > 4096 || !e.friends.every(le)) && B(), c = [...new Set(e.friends)]), Object.freeze({
    uid: t,
    role: e.identity.role,
    messages: s,
    sequences: o,
    next: n,
    hasMore: a,
    capabilities: vn(e.capabilities),
    rooms: Ge(e.rooms) ? [{ id: "main", name: "综合讨论", icon: "💬", description: "" }] : Ft(e.rooms),
    spaces: Ge(e.spaces) ? [{ id: "hub_main", name: "聊天室", icon: "🏠" }] : qt(e.spaces),
    roomsSupported: Array.isArray(e.rooms),
    spacesSupported: Array.isArray(e.spaces),
    members: is(e.members, r),
    friends: c,
    friendRequests: rs(e.friendRequests, t, r)
  });
}
function Be(e, t, i) {
  for (const r of Object.keys(t)) {
    if (!i()) return !1;
    e[r] = t[r];
  }
  return i();
}
function ss(e, t, i, r) {
  const { chat: n, service: s } = r, o = i.current;
  if (!o()) return !1;
  const a = i.restoring();
  for (let w = 0; w < e.messages.length; w++) {
    if (!o()) return !1;
    const k = e.messages[w];
    r.publish(k, Object.freeze({
      scope: t.scope,
      channel: t.channel,
      sequence: e.sequences[w],
      source: a ? "history" : k.sender.uid === e.uid ? "self" : "live"
    }), o);
  }
  if (!o()) return !1;
  const c = new Set(n.messages.map((w) => w.id)), u = e.messages.filter((w) => w.sender.uid !== e.uid && !w.meta?.silentPartySync && w.type !== "system" && !c.has(w.id)), f = n.visible ? [] : u.filter((w) => (t.cursor > 0 || t.now - w.timestamp < 3e4) && (w.type !== "music_party" || !a)).slice(-3), p = new Map(n.messages.map((w) => [w.id, w]));
  for (const w of e.messages) p.set(w.id, w);
  const h = Object.assign(/* @__PURE__ */ Object.create(null), n.userActivities);
  for (const w of e.members) w.activity && (h[w.uid] = w.activity);
  const g = [], y = new Set(n.friends.map((w) => w.uid)), b = new Map(e.members.map((w) => [w.uid, w]));
  for (const w of e.friends || []) {
    const k = b.get(w);
    k && !y.has(w) && (g.push({ uid: w, name: k.name, avatar: k.avatar, addedAt: t.now, status: "mutual" }), y.add(w));
  }
  if (!Be(n, {
    messages: [...p.values()].sort((w, k) => w.timestamp - k.timestamp || w.id.localeCompare(k.id)).slice(-200),
    unreadCount: u.length ? n.visible ? 0 : n.unreadCount + u.length : n.unreadCount
  }, o) || !Be(s, {
    capabilities: e.capabilities,
    imageMessagesSupported: e.capabilities.messageTypes.includes("image"),
    spacesSupported: e.spacesSupported,
    spaces: e.spaces,
    roomsSupported: e.roomsSupported,
    rooms: e.rooms
  }, o) || (r.authenticated(), !o()) || !Be(s, { role: e.role, members: e.members, ...e.friends === void 0 ? {} : { friends: e.friends } }, o)) return !1;
  for (const w of g) {
    if (!o()) return !1;
    n.friends.some((k) => k.uid === w.uid) || n.friends.push(w);
  }
  const A = e.members.some((w) => !!w.activity) || Object.getPrototypeOf(n.userActivities) !== null ? { userActivities: h } : {};
  if (!Be(n, {
    ...A,
    ...e.friendRequests === void 0 ? {} : { friendRequests: e.friendRequests },
    connected: !0,
    connecting: !1,
    error: ""
  }, o) || !Be(s, { status: "已连接私有服务器" }, o)) return !1;
  e.hasMore || i.caughtUp();
  for (const w of f) {
    if (!o()) return !1;
    if (n.visible) break;
    try {
      r.notify(w, t.channel);
    } catch {
      console.warn("[PrivateChat] notification failed");
    }
  }
  return o();
}
const ye = "private-relay-server";
class os {
  constructor(t) {
    this.ports = t, this.flushing = !1;
  }
  async postAndAcknowledge(t, i, r = 12e3) {
    const n = Object.freeze({ ...t }), s = Ke(this.ports.capabilities(n), i);
    if (s) throw new ve(s);
    const o = await this.ports.post(n, i, AbortSignal.timeout(r));
    if (!o || o.stored !== !0 || o.id !== i.id) throw new Error("未收到服务器落盘确认");
    await Wn(this.ports.scope(n), i.id, ye);
  }
  async recordFailure(t, i, r, n) {
    try {
      if (r instanceof ve) {
        j.value = r.message, await Di(this.ports.scope(t), i, ye, !1, n, !0);
        return;
      }
      const s = r instanceof Ne && r.status >= 400 && r.status < 500 && ![408, 429].includes(r.status);
      await Di(this.ports.scope(t), i, ye, s, n);
    } catch {
      j.value = "无法保存消息的发送状态，请检查浏览器存储。";
    }
  }
  async flush(t) {
    if (this.flushing || !this.ports.active(t) || ["unknown", "incompatible"].includes(this.ports.capabilities(t).status)) return;
    this.flushing = !0;
    const i = [];
    try {
      const r = this.ports.destinations(t).map((s) => Object.freeze({ ...s }));
      let n = 8;
      for (const s of r) {
        if (!n || !this.ports.active(t)) break;
        await Vn(this.ports.scope(s), [ye], () => this.ports.active(t), (o, a, c) => {
          --n;
          const u = { ...a, sender: { ...a.sender, avatar: this.ports.avatar(a.sender.avatar) } };
          return i.push(this.postAndAcknowledge(s, u).catch((f) => this.recordFailure(s, a.id, f, c))), !0;
        }, n, (o) => !Ke(this.ports.capabilities(s), o));
      }
    } catch {
      j.value = "待发队列处理未确认，请检查本地存储；未改投其他房间。";
    } finally {
      await Promise.allSettled(i), this.flushing = !1;
    }
  }
}
const At = [];
function vo(e) {
  return At.push(e), () => {
    const t = At.indexOf(e);
    t >= 0 && At.splice(t, 1);
  };
}
async function So() {
  const e = v.room;
  if (!e || e.uid !== d.currentUser.uid) throw new Error("请先在聊天室设置中加入自己的聊天室");
  const t = { ...e }, i = await W(t, "/api/v1/rooms", "GET", void 0, AbortSignal.timeout(15e3));
  if (!v.room || C(t) !== C(v.room)) throw new Error("聊天室配置已改变，请重新选择");
  const r = i.spaces ? qt(i.spaces) : [];
  return Ft(i.rooms).map((n) => ({ ...t, channel: n.id, name: `${r.find((s) => s.id === n.space)?.name || "聊天室"} / ${n.name}` }));
}
async function si(e, t) {
  const i = v.room;
  if (!i || C(i) !== C(t) || d.currentUser.uid !== t.uid) throw new Error("聊天室身份已改变，未发送，请重新选择房间");
  const r = it(e);
  if (!r || r.type === "system" || r.type === "image") throw new Error("分享内容无效或超出大小限制，未发送");
  const n = { ...t };
  r.sender = { ...r.sender, uid: n.uid, avatar: Lt(d.currentUser.avatar, z.avatarUrl), name: d.currentUser.name };
  const s = Ke(ot(n), r);
  if (s) throw new Error(s);
  await xt(de(n), [r]), await gr(de(n), r, [ye]), ne(n) && !d.messages.some((o) => o.id === r.id) && d.messages.push(r);
  try {
    await Ut.postAndAcknowledge(n, r, 15e3);
  } catch (o) {
    throw await Ut.recordFailure(n, r.id, o, 0), Kt(), new Error(`未收到「${n.name}」的保存确认；已保留在该房间待发队列，请勿重复发送。`);
  }
}
const S = L({
  status: "未配置私有服务器",
  role: "",
  syncing: !1,
  channel: "main",
  rooms: [],
  spaces: [],
  spacesSupported: !1,
  imageMessagesSupported: !1,
  capabilities: Nt(),
  roomsSupported: !1,
  friends: [],
  members: []
});
function ot(e) {
  return ke === C(e) && v.room && C(v.room) === C(e) && d.currentUser.uid === e.uid ? S.capabilities : Nt();
}
function Gt() {
  S.capabilities = Nt(), S.imageMessagesSupported = !1;
}
const Ut = new os({
  active: ne,
  capabilities: ot,
  scope: de,
  avatar: (e) => Lt(e, z.avatarUrl),
  destinations: (e) => [Ae(e), ...S.rooms.filter((t) => t.id !== S.channel).map((t) => ({ ...e, channel: t.id }))],
  post: (e, t, i) => W(e, "/api/v1/messages", "POST", { message: t }, i)
}), vr = new Xn(() => {
  S.status = "凭证数据库被旧标签页阻塞，请关闭旧页后重试";
}), as = new es({
  credential: (e, t) => vr.read(e, t),
  beforeSend: ({ destination: e, path: t, method: i, body: r }) => {
    if (!G.isInstalled("chat")) throw new ve("聊天室实验组件已停用，未发起请求");
    const n = t === "/api/v1/members" || t.startsWith("/api/v1/members/"), s = i !== "GET" && ["/api/v1/spaces", "/api/v1/rooms"].some((o) => t === o || t.startsWith(o + "/"));
    if ((n || s) && (!d.connected || S.role !== "owner" || ke !== C(e) || !v.room || C(v.room) !== C(e) || d.currentUser.uid !== e.uid))
      throw new Ne(403);
    if (i === "POST" && t === "/api/v1/messages") {
      const o = Ke(ot(e), r.message);
      if (o) throw new ve(o);
    }
  }
});
function cs(e) {
  const t = "BEAVER-PRIVATE1:";
  if (!e.startsWith(t) || e.length > 8e3) throw new Error("请粘贴新版私有聊天室邀请");
  try {
    const i = JSON.parse(decodeURIComponent(atob(e.slice(t.length))));
    if (!i || !Qe(i.token)) throw new Error();
    return { ...nt(i), token: i.token };
  } catch {
    throw new Error("邀请格式无效");
  }
}
let oi = 0;
async function Ao(e) {
  if (!G.isInstalled("chat")) throw new ve("请先在商店手动启用聊天室实验组件");
  const t = cs(e);
  if (t.uid !== d.currentUser.uid) throw new Error("此邀请不属于当前 UID，请让服主为当前账号重新创建");
  const i = nt(t), r = v.room ? C(v.room) : null;
  Ze();
  const n = oi;
  if (await vr.write(i, t.token), n !== oi || d.currentUser.uid !== t.uid || r !== (v.room ? C(v.room) : null))
    throw new Error("凭据已保存，但身份或连接选择已改变，未激活旧邀请；如需加入请重新确认。");
  Ze(), Ln(i), d.transportMode = "relay", rt(pr(i), t.room), ue();
}
function W(e, t, i = "GET", r, n) {
  return G.isInstalled("chat") ? as.request({ destination: e, path: t, method: i, body: r, signal: n }) : Promise.reject(new ve("请先在商店手动启用聊天室实验组件"));
}
async function Sr(e, t, i) {
  const r = v.room;
  if (!r) throw new Error("未配置私有服务器");
  return W({ ...r }, e, t, i, AbortSignal.timeout(15e3));
}
async function ko() {
  return (await Sr("/api/v1/members", "GET")).members;
}
async function ls(e, t) {
  const i = v.room;
  if (!i) throw new Error("未配置私有服务器");
  const r = { ...i }, n = await W(r, "/api/v1/members", "POST", { uid: e, name: t }, AbortSignal.timeout(15e3));
  if (!Qe(n.token)) throw new Error("服务器返回无效，勿重复创建，请刷新成员列表");
  return "BEAVER-PRIVATE1:" + btoa(encodeURIComponent(JSON.stringify({ ...r, uid: e, token: n.token })));
}
async function Eo(e) {
  const t = v.room;
  if (!t) throw new Error("未配置私有服务器，无法发送邀请");
  if (e.uid === d.currentUser.uid) throw new Error("不能邀请自己");
  const i = ot(t);
  if (!i.messageTypes.includes("server_invite")) throw new Error(i.status === "unknown" || i.status === "incompatible" ? i.reason : "服务端未启用邀请卡消息，未创建新成员邀请。");
  const r = await ls(e.uid, e.name), n = S.spaces.find((p) => p.id === (S.rooms.find((h) => h.id === S.channel)?.space || "hub_main")), s = S.rooms.find((p) => p.id === S.channel) || S.rooms[0], o = n?.name || t.room || "海狸聊天室", a = s?.name || "综合讨论";
  let c = "";
  try {
    c = JSON.parse(decodeURIComponent(atob(r.replace(/^BEAVER-PRIVATE1:/, "")))).token || "";
  } catch {
  }
  const u = {
    id: `msg_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    sender: {
      uid: d.currentUser.uid,
      name: d.currentUser.name,
      avatar: d.currentUser.avatar
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
      inviteCode: r
    },
    timestamp: Date.now()
  }, f = Ar(e.uid);
  await si(u, {
    ...t,
    channel: f,
    name: `私聊 / ${e.name}`
  }), ds(e.uid);
}
async function Co(e) {
  if (!/^[a-f0-9]{32}$/.test(e)) throw new Error("成员标识无效");
  await Sr("/api/v1/members/" + e, "DELETE");
}
function Ae(e) {
  return { ...e, channel: S.channel };
}
function at(e) {
  const t = new URL(pr(e)), i = e.channel || "main";
  return i !== "main" && t.searchParams.set("channel", i), t.href;
}
function de(e) {
  return hi(e.uid, at(e), e.room);
}
function ne(e) {
  return G.isInstalled("chat") && d.currentUser.uid === e.uid && d.serverUrl === at(e) && (e.channel || "main") === S.channel && d.currentRoomId === e.room && v.room !== null && C(v.room) === C(e);
}
function Io() {
  const e = v.room && Ae(v.room);
  return e && ne(e) ? { scope: de(e), channel: e.channel } : null;
}
function Ar(e) {
  return "dm_" + [d.currentUser.uid, e].sort().join("__");
}
function To(e) {
  if (!e.startsWith("dm_")) return;
  const t = e.slice(3).split("__");
  if (t.length === 2)
    return t.find((i) => i !== d.currentUser.uid);
}
function ds(e) {
  const t = v.room;
  if (!t || !e || e === d.currentUser.uid) return;
  const i = Ar(e);
  i === S.channel && ne(Ae(t)) || rt(at({ ...t, channel: i }), t.room, !0) && (S.channel = i, ue());
}
async function us(e) {
  const t = v.room;
  if (!t) throw new Error("未配置私有服务器");
  await W({ ...t }, "/api/v1/friends/request", "POST", { toUid: e }, AbortSignal.timeout(15e3));
}
async function fs(e, t) {
  const i = v.room;
  if (!i) throw new Error("未配置私有服务器");
  await W({ ...i }, "/api/v1/friends/respond", "POST", { id: e, accept: t }, AbortSignal.timeout(15e3));
}
function kr(e) {
  const t = v.room;
  if (!(!t || !S.rooms.some((i) => i.id === e))) {
    if (e === S.channel && ne(Ae(t))) {
      Kt();
      return;
    }
    rt(at({ ...t, channel: e }), t.room, ke === C(t) && d.currentUser.uid === t.uid) && (S.channel = e, ue());
  }
}
async function Po(e, t) {
  const i = v.room;
  if (!i) throw new Error("未配置");
  const r = C(i), n = { ...i };
  await W(n, t ? `/api/v1/rooms/${encodeURIComponent(t)}` : "/api/v1/rooms", "POST", e, AbortSignal.timeout(15e3));
  const s = await W(n, "/api/v1/rooms", "GET", void 0, AbortSignal.timeout(15e3));
  if (v.room && C(v.room) === r && d.currentUser.uid === i.uid) {
    const o = Ft(s.rooms), a = s.spaces ? qt(s.spaces) : void 0;
    S.rooms = o, a && v.room && C(v.room) === r && d.currentUser.uid === i.uid && (S.spaces = a);
  }
}
async function Uo(e) {
  if (e === "main") throw new Error("默认房间不可移除");
  const t = v.room;
  if (!t) throw new Error("未配置");
  const i = C(t);
  await W({ ...t }, `/api/v1/rooms/${encodeURIComponent(e)}`, "DELETE", void 0, AbortSignal.timeout(15e3)), !(!v.room || C(v.room) !== i) && (S.rooms = S.rooms.filter((r) => r.id !== e), S.channel === e && kr("main"));
}
async function _o(e, t) {
  const i = v.room;
  if (!i) throw new Error("未配置");
  const r = C(i);
  await W({ ...i }, t ? `/api/v1/spaces/${encodeURIComponent(t)}` : "/api/v1/spaces", "POST", e, AbortSignal.timeout(15e3)), v.room && C(v.room) === r && await Er(i);
}
async function Mo(e) {
  if (e === "hub_main") throw new Error("默认空间不可移除");
  const t = v.room;
  if (!t) throw new Error("未配置");
  const i = C(t), r = S.channel;
  await W({ ...t }, `/api/v1/spaces/${encodeURIComponent(e)}`, "DELETE", void 0, AbortSignal.timeout(15e3)), !(!v.room || C(v.room) !== i || d.currentUser.uid !== t.uid) && (await Er(t), !(!v.room || C(v.room) !== i || d.currentUser.uid !== t.uid) && S.channel === r && !S.rooms.some((n) => n.id === r) && kr("main"));
}
async function Er(e) {
  const t = await W({ ...e }, "/api/v1/spaces", "GET", void 0, AbortSignal.timeout(15e3));
  if (!v.room || C(v.room) !== C(e) || d.currentUser.uid !== e.uid) return;
  const i = qt(t.spaces), r = Ft(t.rooms);
  S.spaces = i, v.room && C(v.room) === C(e) && d.currentUser.uid === e.uid && (S.rooms = r);
}
let Cr = "", ke = "";
const vi = new ts({
  active: ne,
  visible: () => d.visible,
  poll: ms,
  started: () => {
    d.connecting = !d.connected, S.syncing = !0;
  },
  idle: () => {
    S.syncing = !1;
  },
  classify: (e, t) => e instanceof Ne && e.status === 404 && (t.channel || "main") !== "main" ? "missing-room" : e instanceof Ne && [401, 403].includes(e.status) ? "auth" : "retry",
  failed: (e, t, i) => {
    e === "missing-room" ? (S.channel = "main", S.status = "房间已移除，正在返回综合讨论") : e === "auth" ? (ke = "", Gt(), S.role = "", d.error = "访问凭证已失效、过期或不属于此房间，请重新导入邀请", d.connected = !1, d.connecting = !1) : i >= 2 && (d.connected = !1, d.connecting = !1, d.error = `${t}失败或超时，记录与待发队列保留，将自动重试。若持续失败，请关闭旧标签页后重试，并检查服务配置。`, S.status = d.error);
  },
  restart: () => ue()
});
function Kt() {
  const e = v.room && Ae(v.room);
  e && !vi.stopped && Cr === C(e) && ne(e) || ue();
}
function Ir() {
  vi.cancel();
}
function Ze() {
  ++oi, Ir(), ke = "", Gt(), d.connected = !1, d.connecting = !1, S.role = "";
}
function ue() {
  if (!G.isInstalled("chat")) {
    Ze(), d.visible = !1, d.error = "", S.status = "实验性组件默认关闭，请先在商店手动启用";
    return;
  }
  const e = v.room && Ae(v.room), t = !!e && ke === C(e) && d.currentUser.uid === e.uid;
  if (t ? Ir() : Ze(), !e) {
    S.status = "尚未读取到聊天室配置，请在此窗口设置中检查", d.error = "";
    return;
  }
  if (e.uid !== d.currentUser.uid) {
    d.error = S.status = "邀请 UID 与本机不一致，请重新导入属于本机的邀请";
    return;
  }
  d.transportMode = "relay", rt(at(e), e.room, t) && (Cr = C(e), d.connected || (S.status = "正在同步"), vi.start(e));
}
async function ms(e, t) {
  const i = de(e), r = e.channel || "main", n = await t.wait(() => En(i)), s = Lt(d.currentUser.avatar, z.avatarUrl), o = d.currentUser.activity || Qn(), a = d.shareActivity !== !1 && o?.title ? `&act_type=${encodeURIComponent(o.type || "")}&act_title=${encodeURIComponent(o.title || "")}&act_url=${encodeURIComponent(o.url || "")}` : "", c = t.visible ? "&wait=6" : "", u = `/api/v1/sync?after=${n}&avatar=${encodeURIComponent(s)}&name=${encodeURIComponent(d.currentUser.name.slice(0, 100))}${a}${c}`;
  t.phase("连接私有服务器");
  const f = await t.wait(() => W(e, u, "GET", void 0, t.signal));
  if (!t.current()) return;
  t.phase("校验同步页");
  let p;
  try {
    p = ns(f, e.uid, n, Date.now());
  } catch (h) {
    throw t.current() && Gt(), h;
  }
  if (t.current() && (t.phase("保存同步记录"), await t.wait(() => Cn(i, p.messages, p.next)), !!t.current())) {
    try {
      await t.wait(() => yr(i, p.messages.filter((h) => h.sender.uid === e.uid).map((h) => h.id), ye));
    } catch {
      t.current() && (j.value = "无法保存消息的发送确认，请检查浏览器存储。");
    }
    if (t.current() && (t.phase("应用同步状态"), !!ss(p, { scope: i, channel: r, cursor: n, now: Date.now() }, t, {
      chat: d,
      service: S,
      authenticated: () => {
        ke = C(e);
      },
      publish: (h, g, y) => {
        for (const b of [...At]) {
          if (!y()) return;
          try {
            b(h, g);
          } catch {
            console.warn("[PrivateChat] message listener failed");
          }
        }
      },
      notify: Zn
    }) && t.current()))
      return t.phase("处理待发消息"), Ut.flush(e), { hasMore: p.hasMore };
  }
}
async function gt(e) {
  const t = v.room && Ae(v.room);
  if (!t || !ne(t))
    return j.value = "未配置此房间的私有服务器，未发送", !1;
  e.sender && (e.sender.avatar = Lt(d.currentUser.avatar, z.avatarUrl), d.currentUser.name && (e.sender.name = d.currentUser.name));
  const i = it(e);
  if (!i || i.type === "system")
    return j.value = "消息格式无效，未发送", !1;
  const r = Ke(ot(t), i);
  if (r)
    return j.value = r, !1;
  const n = { ...t };
  try {
    return await xt(de(n), [i]), await gr(de(n), i, [ye]), ne(n) && !d.messages.some((s) => s.id === i.id) && d.messages.push(i), j.value = "", Ut.flush(n), !0;
  } catch {
    return j.value = "消息未能保存到待发队列，请勿刷新，检查存储后重试", !1;
  }
}
let Li = !1;
function hs() {
  Li || (Li = !0, _e(() => [G.isInstalled("chat"), JSON.stringify(v.room)], () => {
    const e = v.room;
    S.members = [], S.rooms = [], S.roomsSupported = !1, S.spaces = [], S.spacesSupported = !1, Gt(), S.channel = "main", (!e || !G.isInstalled("chat")) && (d.visible = !1, S.members = []), ue();
  }, { immediate: !0, flush: "sync" }), _e(() => d.visible, (e) => {
    e && Kt();
  }), _e(() => d.currentUser.uid, () => ue()), G.isInstalled("chat") && v.room && $e(de(v.room)).catch(() => {
    j.value = "待发队列读取失败，请关闭旧标签页后重试";
  }));
}
class ps {
  constructor() {
    hs();
  }
  connect() {
    Kt();
  }
  disconnect() {
    Ze();
  }
  resetReconnectAndConnect() {
    ue();
  }
  async retryMessage(t) {
    await gt(t);
  }
  dispatchOutgoing(t, i) {
    if (!i) {
      gt(t);
      return;
    }
    si(t, i).then(() => {
      X.fetch("海狸聊天室", `已发送到 ${i.name}`, "服务器已保存，不代表成员已读。");
    }).catch((r) => {
      X.fetch("海狸聊天室", "分享未确认", r instanceof Error ? r.message : "未确认发送结果，请检查聊天室连接。");
    });
  }
  sendWebsiteShare(t, i) {
    const r = tt(t.url);
    if (!r) {
      X.fetch("海狸聊天室", "未发送", "只支持分享有效的 HTTP(S) 网站地址。");
      return;
    }
    const n = (t.title || "网站").slice(0, 100), s = {
      id: `msg_${crypto.randomUUID()}`,
      sender: { ...d.currentUser, activity: d.shareActivity ? d.currentUser.activity : void 0 },
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
    this.dispatchOutgoing(s, i);
  }
  async sendTextMessage(t, i) {
    const r = t.trim();
    if (!r) return !1;
    const n = {
      id: `msg_${crypto.randomUUID()}`,
      sender: { ...d.currentUser, activity: d.shareActivity ? d.currentUser.activity : void 0 },
      type: "text",
      content: r,
      timestamp: Date.now()
    };
    if (!i) return gt(n);
    try {
      return await si(n, i), !0;
    } catch (s) {
      return X.fetch("海狸聊天室", "分享未确认", s instanceof Error ? s.message : "未确认发送结果，请检查聊天室连接。"), !1;
    }
  }
  sendMusicShare(t, i) {
    const r = {
      id: `msg_${crypto.randomUUID()}`,
      sender: { ...d.currentUser, activity: d.shareActivity ? d.currentUser.activity : void 0 },
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
      sender: { ...d.currentUser, activity: d.shareActivity ? d.currentUser.activity : void 0 },
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
      sender: { ...d.currentUser, activity: d.shareActivity ? d.currentUser.activity : void 0 },
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
      sender: { ...d.currentUser, activity: d.shareActivity ? d.currentUser.activity : void 0 },
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
      sender: { ...d.currentUser, activity: d.shareActivity ? d.currentUser.activity : void 0 },
      type: "image",
      content: "[图片]",
      meta: {
        imageUrl: t
      },
      timestamp: Date.now()
    };
    return gt(i);
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
      sender: { ...d.currentUser, activity: d.shareActivity ? d.currentUser.activity : void 0 },
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
      sender: { ...d.currentUser, activity: d.shareActivity ? d.currentUser.activity : void 0 },
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
    !t.uid || t.uid === d.currentUser.uid || us(t.uid).then(() => {
      X.fetch("海狸聊天室", `已向【${t.name}】发送好友申请`, "对方可在聊天室右上角通知中确认。");
    }).catch((r) => {
      X.fetch("海狸聊天室", "好友申请未发送", r instanceof Error ? r.message : "请检查聊天室连接。");
    });
  }
  respondFriendRequest(t, i) {
    t.id && fs(t.id, i).then(() => {
      X.fetch("海狸聊天室", i ? `已通过【${t.from.name}】的好友申请` : "已忽略该申请", i ? "双方已成为好友，可随时点击私聊。" : "");
    }).catch((r) => {
      X.fetch("海狸聊天室", "操作未完成", r instanceof Error ? r.message : "请检查网络。");
    });
  }
}
const Tr = new ps(), Ro = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  chatService: Tr
}, Symbol.toStringTag, { value: "Module" })), gs = {
  schemaVersion: 1,
  id: "chat",
  title: "海狸聊天室",
  emoji: "💬",
  rootId: "vue-chat-dialog-root",
  settingsKeys: ["lw_chat_server_url"],
  capabilities: ["chat:message-read", "chat:message-send"],
  badgeCount: () => d.unreadCount,
  loadView: () => import("./ChatDialog-B9JnhVft.js").then((e) => e.default),
  lifecycle: {
    isVisible: () => d.visible,
    canOpen: () => G.isInstalled("chat"),
    open: () => {
      G.isInstalled("chat") && (d.visible = !0, d.unreadCount = 0, xn.value && Tr.connect());
    },
    hide: () => {
      d.visible = !1;
    },
    canUnmount: () => !0
  }
};
se(gs);
se(fn);
se(an);
se(dn);
se(on);
se(rn);
se(sn);
se(en);
se(nn);
function ys(e) {
  const t = e.map((i) => ({ ...i }));
  for (const i of qi()) {
    if (i.presentation !== "card" || i.showInDock === !1) continue;
    if (t.some((s) => s.id === i.id)) throw new Error("Duplicate workspace card entry");
    const r = { id: i.id, title: i.title, icon: i.icon }, n = i.dockBefore ? t.findIndex((s) => s.id === i.dockBefore) : -1;
    t.splice(n < 0 ? t.length : n, 0, r);
  }
  return t;
}
function ws(e) {
  const t = e.map((i) => ({ ...i }));
  for (const i of qi()) {
    if (i.showInDock === !1 || i.presentation === "card") continue;
    if (t.some((s) => s.id === i.id)) throw new Error("Dock module duplicated in legacy tools");
    const r = { id: i.id, title: i.title, icon: i.icon, emoji: i.emoji }, n = i.dockBefore ? t.findIndex((s) => s.id === i.dockBefore) : -1;
    t.splice(n < 0 ? t.length : n, 0, r);
  }
  return t;
}
const bs = ys([]), vs = ws([]), Pr = "logicweaver_dock_custom_order", Si = "logicweaver_dock_position";
function Ai(e) {
  return e === "bottom" || e === "left" || e === "right" || e === "top";
}
function Ss() {
  try {
    if (typeof localStorage < "u") {
      const e = localStorage.getItem(Si);
      if (Ai(e)) return e;
    }
  } catch {
  }
  return "bottom";
}
function As(e) {
  try {
    typeof localStorage < "u" && localStorage.setItem(Si, e);
  } catch {
  }
}
function _t() {
  try {
    if (typeof localStorage < "u") {
      const e = localStorage.getItem(Pr);
      if (e) return JSON.parse(e) || {};
    }
  } catch {
  }
  return {};
}
function Bi(e) {
  try {
    typeof localStorage < "u" && localStorage.setItem(Pr, JSON.stringify(e));
  } catch {
  }
}
function Ur() {
  const e = vs.filter((i) => G.isInstalled(i.id)), t = _t().tools;
  if (Array.isArray(t) && t.length > 0) {
    const i = new Map(e.map((n) => [n.id, n])), r = [];
    for (const n of t) {
      const s = i.get(n);
      s && (r.push(s), i.delete(n));
    }
    for (const n of i.values())
      r.push(n);
    return r;
  }
  return e;
}
function _r() {
  const e = bs.filter((i) => G.isInstalled(i.id)), t = _t().cards;
  if (Array.isArray(t) && t.length > 0) {
    const i = new Map(e.map((n) => [n.id, n])), r = [];
    for (const n of t) {
      const s = i.get(n);
      s && (r.push(s), i.delete(n));
    }
    for (const n of i.values())
      r.push(n);
    return r;
  }
  return e;
}
const ks = () => ({
  mounted: !1,
  get activeTargetId() {
    return Xi() || Y.activeId || "";
  },
  activeTools: [],
  cards: _r(),
  tools: Ur(),
  position: Ss()
}), R = L(ks());
typeof window < "u" && (window.addEventListener("logicweaver:dock-modules-changed", () => {
  R.tools = Ur(), R.cards = _r();
}), window.addEventListener("storage", (e) => {
  e.key === Si && Ai(e.newValue) && (R.position = e.newValue);
}));
Mt.onStateChange((e) => {
  R.activeTools = [...e];
});
let ae = {};
function yt(e, t) {
  const i = window.chrome, r = i?.runtime?.getURL ? i.runtime.getURL(t) : t, n = e.includes("newtab") || t.includes("newtab");
  if (window.location.href.includes(e) || n && (window.location.pathname.endsWith("/newtab.html") || window.location.pathname === "/newtab.html"))
    return;
  const s = (a) => {
    const u = (a.url || a.pendingUrl || "").toLowerCase();
    return n ? u.includes("newtab.html") || u.startsWith("chrome://newtab") || u.startsWith("edge://newtab") || u.startsWith("chrome-search://local-ntp") || u.includes("chrome-extension://") && u.includes("newtab") || !!(a.title && (a.title.includes("LogicWeaver 新标签页") || a.title === "新标签页" || a.title === "New Tab")) : u.includes(e.toLowerCase());
  };
  if (i?.tabs?.query) {
    i.tabs.query({ currentWindow: !0 }, (a) => {
      const c = a.find(s);
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
  const o = document.createElement("a");
  o.href = r, o.target = "_blank", o.rel = "noreferrer", document.body.appendChild(o), o.click(), o.remove();
}
const No = {
  getSnapshot() {
    return Rt(R);
  },
  update(e) {
    const { activeTargetId: t, ...i } = e;
    Object.assign(R, i);
  },
  setMounted(e) {
    R.mounted = e;
  },
  setActiveTools(e) {
    R.activeTools = [...e];
  },
  addActiveTool(e) {
    R.activeTools.includes(e) || R.activeTools.push(e);
  },
  removeActiveTool(e) {
    const t = R.activeTools.indexOf(e);
    t >= 0 && R.activeTools.splice(t, 1);
  },
  triggerItem(e, t) {
    const i = typeof window < "u" ? window.location.pathname + window.location.href : "", r = i.includes("bilibili.html") || i.includes("github.html") || i.includes("aihot.html") || i.includes("youtube.html") || i.includes("pricing.html");
    if (e === "home") {
      if (r) {
        yt("newtab.html", "newtab.html");
        return;
      }
      if (ae.onHomeClick) {
        ae.onHomeClick();
        return;
      }
      document.body && (document.body.dataset.page = "home");
      const n = document.getElementById("daily-toggle");
      n && n.classList.contains("active") && n.classList.remove("active"), window.exitFullscreenCard?.(), typeof window < "u" && window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      return;
    }
    if (e === "target") {
      const n = {
        "daily-bilibili": "bilibili.html",
        "card-github": "github.html",
        "daily-aihot": "aihot.html",
        "daily-youtube": "youtube.html",
        "daily-pricing": "pricing.html"
      };
      if (r) {
        const o = n[t];
        o ? yt(o, o) : yt("newtab.html", "newtab.html");
        return;
      }
      if (ae.onTargetClick) {
        ae.onTargetClick(t);
        return;
      }
      const s = window;
      R.activeTargetId === t ? typeof s.exitFullscreenCard == "function" && s.exitFullscreenCard() : typeof s.enterFullscreenCard == "function" && s.enterFullscreenCard(t);
      return;
    }
    if (e === "tool") {
      const n = !!document.getElementById("vue-bili-companions-root");
      if (r && !n) {
        yt("newtab.html", "newtab.html");
        return;
      }
      if (!["todoist", "music", "siren", "wallpaper", "stickers", "sync", "chat"].includes(t) && typeof window < "u") {
        const o = window;
        typeof o.exitFullscreenCard == "function" && o.exitFullscreenCard();
      }
      if (ae.onToolClick) {
        ae.onToolClick(t);
        return;
      }
      Mt.toggle(t);
      return;
    }
  },
  reorderCards(e) {
    const t = new Map(R.cards.map((n) => [n.id, n])), i = [];
    for (const n of e) {
      const s = t.get(n);
      s && (i.push(s), t.delete(n));
    }
    for (const n of t.values()) i.push(n);
    R.cards = i;
    const r = _t();
    Bi({ ...r, cards: i.map((n) => n.id) });
  },
  reorderTools(e) {
    const t = new Map(R.tools.map((n) => [n.id, n])), i = [];
    for (const n of e) {
      const s = t.get(n);
      s && (i.push(s), t.delete(n));
    }
    for (const n of t.values()) i.push(n);
    R.tools = i;
    const r = _t();
    Bi({ ...r, tools: i.map((n) => n.id) });
  },
  setPosition(e) {
    Ai(e) && R.position !== e && (R.position = e, As(e), typeof window < "u" && window.dispatchEvent(new CustomEvent("logicweaver:dock-position-changed", { detail: e })));
  },
  setActions(e) {
    ae = { ...ae, ...e };
  }
}, Es = "leaf-newtab-backgrounds", Cs = 1, be = "current-background", x = "heroBackgroundHistory", ji = 30, wt = "assets/newtab-mountains.png", Wi = 450, Xt = 180 * 1024 * 1024;
let ai = [], bt = 0;
function Is(e) {
  return ai.push(e), e;
}
function Ts() {
  ai.forEach((e) => {
    try {
      URL.revokeObjectURL(e);
    } catch {
    }
  }), ai = [];
}
function ki() {
  return new Promise((e, t) => {
    if (typeof indexedDB > "u") {
      t(new Error("IndexedDB is not supported in this environment"));
      return;
    }
    const i = indexedDB.open(Es, Cs);
    i.onupgradeneeded = () => {
      const r = i.result;
      r.objectStoreNames.contains("files") || r.createObjectStore("files");
    }, i.onsuccess = () => e(i.result), i.onerror = () => t(i.error);
  });
}
async function Ps(e, t = be) {
  const i = await ki();
  return new Promise((r, n) => {
    const s = i.transaction("files", "readwrite");
    s.objectStore("files").put(e, t), s.oncomplete = () => {
      i.close(), r();
    }, s.onerror = () => {
      i.close(), n(s.error);
    }, s.onabort = s.onerror;
  });
}
async function Us() {
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
async function ci(e = "hero") {
  try {
    const t = await Us();
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
async function ei(e = be) {
  try {
    const i = await ki(), r = await new Promise((n, s) => {
      const o = i.transaction("files", "readonly"), a = o.objectStore("files").get(e);
      a.onsuccess = () => n(a.result || null), o.oncomplete = () => i.close(), o.onerror = () => {
        i.close(), s(o.error);
      };
    });
    if (r) return r;
  } catch {
  }
  const t = await ci(e);
  return t || (e === be ? ci("hero") : null);
}
async function Vi(e = be) {
  const t = await ki();
  return new Promise((i, r) => {
    const n = t.transaction("files", "readwrite");
    n.objectStore("files").delete(e), n.oncomplete = () => {
      t.close(), i();
    }, n.onerror = () => {
      t.close(), r(n.error);
    }, n.onabort = n.onerror;
  });
}
function je(e) {
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
function he(e) {
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
function Ei(e) {
  return !!(e && (/^image\//i.test(e.type || "") || /^video\//i.test(e.type || "") || /\.(png|jpe?g|webp|gif|mp4|webm)$/i.test(e.name || "")));
}
function Ci(e) {
  return String(e || "").replace(/\\/g, "/").replace(/^\.\//, "").replace(/^\/+/, "");
}
function _s(e, t) {
  const i = String(t || "").trim().replace(/^['"]|['"]$/g, "");
  if (!i || /^(?:[a-z][a-z0-9+.-]*:|#|data:|blob:)/i.test(i)) return "";
  const [r] = i.split(/[?#]/);
  if (!r) return "";
  const n = i.startsWith("/") ? "" : Ci(e).split("/").slice(0, -1).join("/"), s = `${n ? n + "/" : ""}${r.replace(/^\/+/, "")}`.split("/"), o = [];
  return s.forEach((a) => {
    !a || a === "." || (a === ".." ? o.pop() : o.push(a));
  }), o.join("/").toLowerCase();
}
function Ms(e, t) {
  return t.type ? t.type : /\.html?$/i.test(e) ? "text/html" : /\.css$/i.test(e) ? "text/css" : /\.m?js$/i.test(e) ? "text/javascript" : /\.png$/i.test(e) ? "image/png" : /\.jpe?g$/i.test(e) ? "image/jpeg" : /\.webp$/i.test(e) ? "image/webp" : /\.gif$/i.test(e) ? "image/gif" : /\.mp4$/i.test(e) ? "video/mp4" : /\.webm$/i.test(e) ? "video/webm" : "application/octet-stream";
}
async function Rs(e) {
  const t = [];
  let i = 0;
  async function r(n, s = "", o = 0) {
    if (!(o > 4 || t.length >= Wi || i >= Xt))
      for await (const a of n.values()) {
        if (t.length >= Wi || i >= Xt) break;
        const c = Ci(s ? `${s}/${a.name}` : a.name);
        if (a.kind === "file") {
          const u = await a.getFile();
          i += u.size || 0, i <= Xt && t.push({ path: c, file: u });
        } else a.kind === "directory" && await r(a, c, o + 1);
      }
  }
  return await r(e), t;
}
function Ns(e) {
  return e.filter((t) => /(^|\/)index\.html?$/i.test(t.path) || /\.html?$/i.test(t.path)).sort((t, i) => {
    const r = (n) => /^index\.html?$/i.test(n.path) ? 0 : /(^|\/)index\.html?$/i.test(n.path) ? 1 : 2;
    return r(t) - r(i) || t.path.length - i.path.length;
  })[0] || null;
}
function li(e, t = []) {
  return typeof e == "string" ? /\.(png|jpe?g|webp|gif|mp4|webm|html?)($|[?#])/i.test(e) && t.push(e) : Array.isArray(e) ? e.forEach((i) => li(i, t)) : e && typeof e == "object" && Object.values(e).forEach((i) => li(i, t)), t;
}
async function Os(e) {
  const t = new Map(e.map((r) => [Ci(r.path).toLowerCase(), r])), i = e.filter((r) => /(^|\/)project\.json$/i.test(r.path));
  for (const r of i)
    try {
      const n = JSON.parse(await r.file.text());
      for (const s of li(n)) {
        const o = t.get(_s(r.path, s));
        if (o && Ei(o.file)) return o.file;
      }
    } catch {
    }
  return null;
}
function Ds(e, t, i) {
  const r = i.filter((n) => !/\.(pkg|mpkg)$/i.test(n.path)).map((n) => ({ path: n.path, file: n.file, mime: Ms(n.path, n.file) }));
  return { type: "web", name: e || "Web Wallpaper", entry: t.path, files: r };
}
async function $s(e) {
  const t = await Rs(e), i = Ns(t);
  if (i) return Ds(e.name, i, t);
  const r = await Os(t);
  return r || t.map((s) => s.file).filter(Ei).sort((s, o) => {
    const a = (c) => /\.(mp4|webm)$/i.test(c.name) ? 0 : /\.gif$/i.test(c.name) ? 1 : /^preview\./i.test(c.name) ? 2 : /cover|thumb|poster/i.test(c.name) ? 3 : 4;
    return a(s) - a(o) || o.size - s.size;
  })[0] || null;
}
function xs(e) {
  return e ? typeof e == "string" ? "自定义图片" : e.name || (e.type === "web" ? "Web Wallpaper" : "自定义背景") : "默认背景";
}
function Ls(e) {
  return typeof e == "string" ? "图片" : e?.type === "web" ? "Web Wallpaper" : e?.type === "db" ? /video/i.test(e.mediaType || "") ? "视频" : "图片/GIF" : "背景";
}
const di = {
  async loadHistory() {
    const e = await je([x, "heroBackground"]);
    return { history: Array.isArray(e[x]) ? e[x] : [], currentValue: e.heroBackground || null };
  },
  async addHistory(e, t = null) {
    const i = `bg-${Date.now()}-${Math.random().toString(16).slice(2)}`;
    let r = e;
    e && typeof e == "object" && (r = { ...e, storageKey: i }), t && await Ps(t, i);
    const n = await je([x, "heroBackground"]), s = Array.isArray(n[x]) ? n[x] : [], a = [{
      id: i,
      title: xs(r),
      kind: Ls(r),
      createdAt: Date.now(),
      value: r
    }, ...s.filter((u) => JSON.stringify(u.value) !== JSON.stringify(r))].slice(
      0,
      ji
    ), c = s.slice(ji - 1).filter((u) => u.value?.storageKey && u.value.storageKey !== n.heroBackground?.storageKey);
    return await Promise.all(c.map((u) => Vi(u.value.storageKey))), await he({ [x]: a }), r;
  },
  async deleteHistory(e) {
    const t = await je([x, "heroBackground"]), i = (t[x] || []).filter((r) => r.id !== e.id);
    e.value?.storageKey && await Vi(e.value.storageKey), await he({ [x]: i }), JSON.stringify(t.heroBackground) === JSON.stringify(e.value) && await this.clearWallpaper();
  },
  async clearWallpaper() {
    const e = { type: "none" };
    await he({ heroBackground: e });
    try {
      localStorage.setItem("lw-current-wallpaper", JSON.stringify(e));
    } catch {
    }
    await this.applyWallpaper(null);
  },
  async setMountain() {
    await he({ heroBackground: wt });
    try {
      localStorage.setItem("lw-current-wallpaper", JSON.stringify(wt));
    } catch {
    }
    await this.applyWallpaper(wt);
  },
  async setWallpaper(e) {
    await he({ heroBackground: e });
    try {
      localStorage.setItem("lw-current-wallpaper", JSON.stringify(e));
    } catch {
    }
    await this.applyWallpaper(e);
  },
  async chooseBackgroundFile(e = "all") {
    return typeof document > "u" ? [] : new Promise((t, i) => {
      const r = document.createElement("input");
      r.type = "file", r.hidden = !0, r.multiple = !0, r.accept = e === "image" ? "image/*,.jpg,.jpeg,.png,.webp,.gif" : e === "video" ? "video/mp4,video/webm,.mp4,.webm" : "image/*,video/mp4,video/webm";
      const n = (a) => {
        r.removeEventListener("change", s), r.removeEventListener("cancel", o), r.remove(), t(a);
      }, s = () => n(Array.from(r.files || [])), o = () => n([]);
      r.addEventListener("change", s), r.addEventListener("cancel", o), document.body.appendChild(r);
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
    else if (Ei(e))
      r = e, i = { type: "db", name: e.name, mediaType: e.type || "application/octet-stream" };
    else
      throw new Error("请选择 JPG、PNG、WebP、GIF、MP4 或 WebM 壁纸。");
    return i = await this.addHistory(i, r), t && (await he({ heroBackground: i }), await this.applyWallpaper(i)), i;
  },
  async importWallpaperDirectory() {
    const e = window;
    if (!e.showDirectoryPicker) throw new Error("当前浏览器不支持直接选择 Wallpaper 文件夹。");
    const t = await e.showDirectoryPicker(), i = await $s(t);
    if (!i) throw new Error("文件夹中没有找到可用的 Web Wallpaper、图片、GIF、MP4 或 WebM。");
    return this.importBackgroundFile(i);
  },
  async applyWallpaper(e) {
    const t = ++bt;
    if (typeof document > "u") return;
    const i = document.getElementById("launcher"), r = document.getElementById("hero-background-media");
    if (!(!i || !r) && (Ts(), r.replaceChildren(), i.style.removeProperty("--launcher-image"), !!e)) {
      if (typeof e == "string") {
        const n = typeof chrome < "u" ? chrome : null, s = e.startsWith("chrome-extension://") || e.startsWith("http") || e.startsWith("data:") ? e : n?.runtime?.getURL ? n.runtime.getURL(e) : e, o = document.createElement("img");
        o.src = s, o.alt = "", o.decoding = "async", o.fetchPriority = "high", r.appendChild(o);
        return;
      }
      if (e.type === "style") {
        const n = document.createElement("div");
        n.style.cssText = e.style || "", n.style.position = "absolute", n.style.inset = "0", r.appendChild(n);
        return;
      }
      if (e.type === "web") {
        const n = await ei(e.storageKey || be);
        if (t !== bt) return;
        if (n?.type === "web") {
          const s = document.createElement("iframe");
          s.title = n.name || "Web Wallpaper";
          const o = typeof chrome < "u" ? chrome : null;
          s.src = o?.runtime?.getURL ? o.runtime.getURL("wallpaper-sandbox.html") : "wallpaper-sandbox.html";
          const a = setTimeout(() => {
            t === bt && s.parentNode && (console.warn("[Wallpaper] Web wallpaper timeout or failed, auto fallback to mountain"), di.setMountain());
          }, 1500);
          s.onload = () => {
            clearTimeout(a), s.contentWindow?.postMessage(n, "*");
          }, r.appendChild(s);
        } else
          di.setMountain();
        return;
      }
      if (e.type === "db") {
        const n = await ei(e.storageKey || be);
        if (t !== bt || !(n instanceof Blob)) return;
        const s = Is(URL.createObjectURL(n));
        if (/^video\//i.test(n.type || "") || /\.(mp4|webm)$/i.test(n.name || "")) {
          const o = document.createElement("video");
          o.src = s, o.autoplay = !0, o.preload = "metadata", o.loop = !0, o.muted = !0, o.defaultMuted = !0, o.volume = 0, o.setAttribute("muted", ""), o.playsInline = !0, o.disablePictureInPicture = !0, o.setAttribute("disablepictureinpicture", ""), o.setAttribute("disableremoteplayback", ""), r.appendChild(o);
        } else {
          const o = document.createElement("img");
          o.src = s, o.alt = "", o.decoding = "async", o.fetchPriority = "high", r.appendChild(o);
        }
      }
    }
  },
  // Caller owns and revokes this URL; never put it in the current wallpaper URL pool.
  async createLibraryPreviewUrl(e, t) {
    t?.throwIfAborted();
    const i = await ei(e || be);
    return t?.throwIfAborted(), i instanceof Blob ? URL.createObjectURL(i) : null;
  },
  async updateHistoryTitle(e, t) {
    const i = await je([x]), r = Array.isArray(i[x]) ? i[x] : [];
    if (!r.some((s) => s.id === e)) throw new Error("壁纸条目已变化，请刷新");
    const n = r.map((s) => s.id === e ? { ...s, title: t.trim() || s.title } : s);
    await he({ [x]: n });
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
        const t = await je(["heroBackground"]);
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
        const t = await ci("hero");
        t && (e = {
          type: "db",
          name: t.name || "当前壁纸",
          mediaType: t.type || "application/octet-stream"
        });
      }
      e || (e = wt);
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
  t === "local" && e.heroBackground && di.applyWallpaper(e.heroBackground.newValue);
});
typeof document < "u" && document.addEventListener("visibilitychange", () => {
  const e = document.querySelector("#hero-background-media video");
  e && (document.hidden ? e.paused || e.pause() : e.paused && e.play().catch(() => {
  }));
});
const Ee = Se(!1);
let vt = null;
const Oo = {
  get isActive() {
    return Ee.value;
  },
  /**
   * 进入新用户页面内空态预览沙箱（常用网站变为空无一物）
   */
  enter() {
    if (Ee.value) return;
    const e = Ht.getState();
    vt = JSON.parse(JSON.stringify(e)), Ht.updateState({
      links: [],
      groupSizes: {},
      folders: {},
      pages: ["常用网站"],
      pageLabels: {},
      activePage: "常用网站"
    }), Ee.value = !0, typeof window < "u" && window.dispatchEvent(new CustomEvent("tab-project:guest-preview-changed", {
      detail: { active: !0 }
    }));
  },
  /**
   * 退出新用户预览沙箱，原样恢复用户的真实数据
   */
  exit() {
    Ee.value && (vt && (Ht.updateState(vt), vt = null), Ee.value = !1, typeof window < "u" && window.dispatchEvent(new CustomEvent("tab-project:guest-preview-changed", {
      detail: { active: !1 }
    })));
  },
  toggle() {
    Ee.value ? this.exit() : this.enter();
  }
}, Fi = {
  // 通用操作 (Common Actions)
  "common.save": "保存",
  "common.cancel": "取消",
  "common.confirm": "确定",
  "common.delete": "删除",
  "common.deletePermanently": "彻底删除",
  "common.rename": "重命名",
  "common.edit": "编辑",
  "common.done": "完成",
  "common.finishEdit": "完成编辑",
  "common.add": "添加",
  "common.settings": "设置",
  "common.close": "关闭",
  "common.search": "搜索",
  "common.refresh": "刷新",
  "common.inUse": "使用中",
  "common.notice": "提示",
  "common.loading": "加载中…",
  "common.copied": "已复制到剪贴板",
  // 顶栏 (TopBar)
  "topbar.notifications": "通知中心",
  "topbar.bookmarks": "书签",
  "topbar.settings": "设置",
  "topbar.sidebar": "侧栏 · 标签页聚合与待办",
  // 快捷导航轮盘 (NavWheel)
  "navwheel.appName": "快捷轮盘",
  "navwheel.editSites": "编辑网站",
  "navwheel.finishEdit": "完成编辑",
  "navwheel.editSitesDesc": "管理快捷网站与点击收纳",
  "navwheel.finishEditDesc": "点击收尾并退出编辑模式",
  "navwheel.dragHint": "按住中心可自由拖动轮盘",
  "navwheel.addedNotice": "已进入轮盘！继续点选添加，完成后点击「完成编辑」",
  "navwheel.removedNotice": "已从轮盘移出",
  "navwheel.maxLimitNotice": "快捷轮盘最多容纳 12 个快捷网站",
  "navwheel.enterEditMode": "进入网站管理模式",
  "navwheel.editModeDesc": "点击桌面或文件夹网站即刻加入轮盘，点击轮盘 ✕ 可移除，完成后点击「完成编辑」",
  "navwheel.editSaved": "快捷轮盘已保存",
  // 设置面板 (Settings)
  "settings.title": "控制中心 / 偏好设置",
  "settings.subtitle": "集中管理首页组件、服务连接、快捷键与多端云同步。开关即时保存，输入项可完成编辑后统一保存。",
  "settings.tab.modules": "模块与功能",
  "settings.tab.shortcuts": "快捷键配置",
  "settings.tab.privacy": "搜索书签过滤",
  "settings.tab.appearance": "主题与外观",
  "settings.tab.sync": "数据备份与同步",
  "settings.tab.storage": "文件夹与存储",
  // 主题与外观 (Themes & Appearance)
  "theme.sectionTitle": "主题与外观定制",
  "theme.sectionDesc": "系统主题风格与新标签页视觉定制：提供明亮、深色及专属风格切换，支持预设纯净山景与自定义动静态壁纸。",
  "theme.systemThemes": "系统主题风格",
  "theme.light": "白天明亮",
  "theme.lightDesc": "经典纯净浅色，全模块适配最佳，高对比度清爽视觉",
  "theme.dark": "夜间深色",
  "theme.darkDesc": "护眼深邃暗色，适合弱光夜间环境浏览",
  "theme.endfield": "终末地风格",
  "theme.endfieldDesc": "工业战术硬核，金黄微光与深灰质感点缀",
  "theme.lonetrail": "孤星风格",
  "theme.lonetrailDesc": "深空沉稳蓝灰，极简科研与静谧纸面质感",
  "theme.hint": "💡 贴心提示：新标签页所有组件均深度优化适配明亮模式（白天），视觉纯净高雅；深色模式适合夜间低光照环境使用。",
  // 语言设置 (Language Settings)
  "language.title": "界面语言",
  "language.zh": "简体中文",
  "language.en": "English",
  "language.hint": "切换界面显示语言，全模块即刻生效",
  // Todoist 看板 (Todoist Workspace)
  "todoist.newProject": "新建项目",
  "todoist.renameProject": "重命名项目",
  "todoist.deleteProject": "删除项目",
  "todoist.deleteProjectConfirm": "删除项目确认",
  "todoist.deleteProjectAlert": "确定要彻底删除项目「{name}」吗？",
  "todoist.deleteProjectWarning": "此操作不可撤销，项目下的所有板块与任务也将一并删除！",
  "todoist.renameSection": "重命名板块",
  "todoist.deleteSection": "删除分组",
  "todoist.deleteSectionConfirm": "删除板块确认",
  "todoist.deleteSectionAlert": "确定要删除板块「{name}」吗？",
  "todoist.deleteSectionWarning": "板块内的任务将自动保留并移至默认收件箱。",
  "todoist.addTask": "＋ 添加任务",
  "todoist.deleteTask": "删除任务",
  "todoist.deleteTaskConfirm": "删除任务确认",
  "todoist.deleteTaskAlert": "确定要删除任务「{name}」吗？",
  "todoist.noTasks": "暂无任务",
  "todoist.dragDialogHint": "按住可拖动位置",
  "todoist.inputProjectPlaceholder": "新项目名称…",
  "todoist.inputSectionPlaceholder": "新板块名称…"
}, Bs = {
  // 通用操作 (Common Actions)
  "common.save": "Save",
  "common.cancel": "Cancel",
  "common.confirm": "Confirm",
  "common.delete": "Delete",
  "common.deletePermanently": "Delete Permanently",
  "common.rename": "Rename",
  "common.edit": "Edit",
  "common.done": "Done",
  "common.finishEdit": "Done Editing",
  "common.add": "Add",
  "common.settings": "Settings",
  "common.close": "Close",
  "common.search": "Search",
  "common.refresh": "Refresh",
  "common.inUse": "Active",
  "common.notice": "Notice",
  "common.loading": "Loading…",
  "common.copied": "Copied to clipboard",
  // 顶栏 (TopBar)
  "topbar.notifications": "Notifications",
  "topbar.bookmarks": "Bookmarks",
  "topbar.settings": "Settings",
  "topbar.sidebar": "Sidebar · Tabs & Tasks",
  // 快捷导航轮盘 (NavWheel)
  "navwheel.appName": "Quick Wheel",
  "navwheel.editSites": "Edit Sites",
  "navwheel.finishEdit": "Done Editing",
  "navwheel.editSitesDesc": "Manage and click sites to add",
  "navwheel.finishEditDesc": "Save changes and exit edit mode",
  "navwheel.dragHint": "Drag center hub to reposition",
  "navwheel.addedNotice": "added to wheel! Click more to add, or click Done Editing when finished.",
  "navwheel.removedNotice": "Removed from wheel",
  "navwheel.maxLimitNotice": "Quick Wheel can hold up to 12 shortcuts",
  "navwheel.enterEditMode": "Site Management Mode",
  "navwheel.editModeDesc": "Click any site on desktop or folder to add, click ✕ on wheel to remove.",
  "navwheel.editSaved": "Quick Wheel layout saved",
  // 设置面板 (Settings)
  "settings.title": "Control Center / Preferences",
  "settings.subtitle": "Manage new tab components, service integrations, shortcuts and multi-device sync.",
  "settings.tab.modules": "Modules & Features",
  "settings.tab.shortcuts": "Keyboard Shortcuts",
  "settings.tab.privacy": "Search & Filters",
  "settings.tab.appearance": "Themes & Appearance",
  "settings.tab.sync": "Backup & Cloud Sync",
  "settings.tab.storage": "Storage & Files",
  // 主题与外观 (Themes & Appearance)
  "theme.sectionTitle": "Themes & Appearance",
  "theme.sectionDesc": "Customize system style and wallpapers: choose between light, dark, and specialized themes with static or dynamic backgrounds.",
  "theme.systemThemes": "System Style",
  "theme.light": "Light Mode",
  "theme.lightDesc": "Classic crisp light theme with optimal contrast across all modules",
  "theme.dark": "Dark Mode",
  "theme.darkDesc": "Eye-friendly deep dark theme for low-light night environments",
  "theme.endfield": "Endfield Style",
  "theme.endfieldDesc": "Tactical industrial aesthetic with warm amber and graphite accents",
  "theme.lonetrail": "Lonetrail Style",
  "theme.lonetrailDesc": "Calm research blue-gray with serene paper texture",
  "theme.hint": "💡 Tip: All components are meticulously designed for Light Mode. Dark Mode is ideal for night-time use.",
  // 语言设置 (Language Settings)
  "language.title": "Interface Language",
  "language.zh": "简体中文",
  "language.en": "English",
  "language.hint": "Switch display language, changes apply immediately across all modules",
  // Todoist 看板 (Todoist Workspace)
  "todoist.newProject": "New Project",
  "todoist.renameProject": "Rename Project",
  "todoist.deleteProject": "Delete Project",
  "todoist.deleteProjectConfirm": "Delete Project",
  "todoist.deleteProjectAlert": 'Are you sure you want to permanently delete project "{name}"?',
  "todoist.deleteProjectWarning": "This cannot be undone. All sections and tasks in this project will also be removed!",
  "todoist.renameSection": "Rename Section",
  "todoist.deleteSection": "Delete Section",
  "todoist.deleteSectionConfirm": "Delete Section",
  "todoist.deleteSectionAlert": 'Are you sure you want to delete section "{name}"?',
  "todoist.deleteSectionWarning": "Tasks within this section will be preserved and moved to your default Inbox.",
  "todoist.addTask": "+ Add Task",
  "todoist.deleteTask": "Delete Task",
  "todoist.deleteTaskConfirm": "Delete Task",
  "todoist.deleteTaskAlert": 'Are you sure you want to delete task "{name}"?',
  "todoist.noTasks": "No tasks",
  "todoist.dragDialogHint": "Drag to reposition",
  "todoist.inputProjectPlaceholder": "New project name…",
  "todoist.inputSectionPlaceholder": "New section name…"
}, Do = [
  { code: "zh", label: "简体中文", nativeLabel: "中文" },
  { code: "en", label: "English", nativeLabel: "English" }
];
function js() {
  if (typeof window > "u") return "zh";
  try {
    const e = localStorage.getItem("app_language");
    return e === "zh" || e === "en" ? e : navigator.language.toLowerCase().startsWith("zh") ? "zh" : "en";
  } catch {
    return "zh";
  }
}
const Mr = Se(js());
function $o(e) {
  Mr.value = e;
  try {
    localStorage.setItem("app_language", e), document.documentElement.lang = e;
  } catch {
  }
  typeof chrome < "u" && chrome?.storage?.local && chrome.storage.local.set({ app_language: e });
}
function xo(e, t) {
  let n = (Mr.value === "en" ? Bs : Fi)[e] || Fi[e] || e;
  if (t && typeof n == "string")
    for (const [s, o] of Object.entries(t))
      n = n.replace(new RegExp(`\\{${s}\\}`, "g"), String(o));
  return n;
}
function Lo(e, t) {
  if (document.getElementById(e)) return;
  const i = document.createElement("style");
  i.id = e, i.textContent = t, document.head.appendChild(i);
}
export {
  Yi as $,
  l as A,
  io as B,
  Tr as C,
  $o as D,
  Mr as E,
  wt as F,
  Ai as G,
  ro as H,
  Fn as I,
  bo as J,
  Zt as K,
  So as L,
  v as M,
  Ct as N,
  to as O,
  Fe as P,
  O as Q,
  d as R,
  Do as S,
  gt as T,
  S as U,
  Ni as V,
  di as W,
  Io as X,
  vo as Y,
  Ui as Z,
  Qi as _,
  Yr as a,
  Zs as a0,
  Qs as a1,
  Ys as a2,
  Js as a3,
  zr as a4,
  Xs as a5,
  Ar as a6,
  Ot as a7,
  kr as a8,
  ds as a9,
  ho as aA,
  po as aB,
  go as aC,
  fo as aD,
  lo as aE,
  Qn as aF,
  To as aG,
  Ne as aH,
  cs as aI,
  ko as aJ,
  ls as aK,
  Co as aL,
  er as aM,
  no as aN,
  Ro as aO,
  _o as aa,
  Po as ab,
  Mo as ac,
  Uo as ad,
  mi as ae,
  He as af,
  kn as ag,
  so as ah,
  or as ai,
  oo as aj,
  ao as ak,
  hi as al,
  ce as am,
  ri as an,
  xn as ao,
  yo as ap,
  wo as aq,
  jn as ar,
  j as as,
  ir as at,
  co as au,
  tt as av,
  uo as aw,
  mo as ax,
  Eo as ay,
  Ao as az,
  Wr as b,
  Z as c,
  Hn as d,
  jr as e,
  Ki as f,
  Vi as g,
  Jr as h,
  Ee as i,
  Oo as j,
  m as k,
  te as l,
  No as m,
  X as n,
  zs as o,
  fe as p,
  xo as q,
  E as r,
  fi as s,
  z as t,
  Y as u,
  eo as v,
  tn as w,
  R as x,
  Hs as y,
  Lo as z
};
