import { c as Vn, w as pr, h as ee, r as Me, l as Bi } from "./window-manager.store-BdI_8a-H.js";
import { r as F, s as ke, a as Ut, w as _e, b as ye, d as Fn, K as qn, B as Hn, x as Gn, o as re, e as ie, A as Dt, i as Re, t as Oe, f as Ge, F as gi, g as yi, D as Kn } from "./vendor-vue-9b0eS4bW.js";
import { b as Bt, S as zn, p as Jn } from "./stickers.service-Bdd21-le.js";
import { t as jt, p as Qn } from "./module-state-D4Dr89rP.js";
import { R as Yn } from "./InlineEditStatus.vue_vue_type_style_index_0_scoped_c63d0c6d_lang-9z3_WNrf.js";
import { V as x } from "./search.service-wriY3nvN.js";
import { _ as Zn } from "./_plugin-vue_export-helper-BxikU0LD.js";
const ht = "notificationHistoryV1", ji = 200, Xn = 30 * 864e5;
function ei(e) {
  if (e?.type === "todoist-task" && typeof e.taskId == "string" && /^[A-Za-z0-9_-]{1,100}$/.test(e.taskId)) return { type: e.type, taskId: e.taskId };
  if (e?.type === "module" && typeof e.moduleId == "string" && /^[a-z][a-z0-9-]{0,60}$/.test(e.moduleId)) return { type: e.type, moduleId: e.moduleId };
  if (e?.type === "bili-messages") return { type: e.type };
  if (e?.type === "bili-video") {
    if (typeof e.bvid == "string" && /^BV[A-Za-z0-9]{10}$/.test(e.bvid)) return { type: e.type, bvid: e.bvid };
    if (typeof e.aid == "string" && /^[1-9][0-9]{0,19}$/.test(e.aid)) return { type: e.type, aid: e.aid };
  }
  if (e?.type === "github-repository" && typeof e.fullName == "string" && e.fullName.length <= 240 && /^[\w.-]+\/[\w.-]+$/.test(e.fullName) && !e.fullName.split("/").some((t) => t === "." || t === "..")) return { type: e.type, fullName: e.fullName };
}
function eo(e) {
  if (typeof e == "string")
    try {
      const t = new URL(e);
      if (t.protocol !== "https:" || t.username || t.password || t.port || !["bilibili.com", "www.bilibili.com", "m.bilibili.com"].includes(t.hostname)) return;
      const r = /^\/video\/(BV[A-Za-z0-9]{10}|av[1-9][0-9]{0,19})\/?$/.exec(t.pathname);
      if (r) return r[1].startsWith("BV") ? { type: "bili-video", bvid: r[1] } : { type: "bili-video", aid: r[1].slice(2) };
    } catch {
    }
}
function Wi(e) {
  const t = /* @__PURE__ */ new Map();
  for (const r of e.matchAll(/https:\/\/[^\s<>"']+/g)) {
    const i = eo(r[0].replace(/[)）。，,;；]+$/, ""));
    i && t.set(JSON.stringify(i), i);
  }
  return t.size === 1 ? t.values().next().value : void 0;
}
function at(e, t) {
  return typeof e != "string" ? "" : e.slice(0, 6e3).replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g, "").replace(/\bBearer\s+[A-Za-z0-9._~+\/-]+=*/gi, "Bearer [已隐藏]").replace(/\b(?:ghp_|github_pat_|sk-)[A-Za-z0-9_-]{8,}/g, "[已隐藏]").replace(/((?:token|password|passwd|secret|api[_-]?key|authorization|cookie)\s*[:=]\s*)[^\s,;]+/gi, "$1[已隐藏]").replace(/https?:\/\/[^\s<>"']+/gi, (r) => {
    try {
      const i = new URL(r);
      return i.username = "", i.password = "", i.search = "", i.hash = "", i.href;
    } catch {
      return "[链接]";
    }
  }).slice(0, t);
}
function Vi(e) {
  if (!e || typeof e.id != "string" || !/^[A-Za-z0-9_:-]{1,200}$/.test(e.id) || typeof e.title != "string" || !Number.isFinite(e.createdAt) || !["info", "success", "warning", "error"].includes(e.level)) throw new Error("Invalid notification record");
  let t = ei(e.target);
  return e.appType === "bili" && (!t || t.type === "bili-messages") && (t = Wi([e.title, e.subtitle, e.message].filter((r) => typeof r == "string").join(" ")) || t), { id: e.id, appType: at(e.appType, 40), appName: at(e.appName, 60), title: at(e.title, 160), subtitle: at(e.subtitle, 240), message: at(e.message, 2e3), level: e.level, createdAt: e.createdAt, read: e.read === !0, target: t };
}
function Fi(e) {
  if (e == null) return { version: 0, items: [] };
  if (!e || !Number.isSafeInteger(e.version) || e.version < 0 || !Array.isArray(e.items) || e.items.length > ji) throw new Error("Invalid notification history");
  const t = Date.now();
  return { version: e.version, items: e.items.map(Vi).filter((r) => r.createdAt >= t - Xn && r.createdAt <= t + 6e4).sort((r, i) => i.createdAt - r.createdAt) };
}
let wi = Promise.resolve();
function Ke(e, t) {
  const r = wi.then(async () => {
    if (typeof chrome > "u" || !chrome.storage?.local)
      throw new Error("Chrome storage API unavailable");
    const i = await chrome.storage.local.get(ht), n = Fi(i[ht]);
    if (e === "list")
      return n;
    if (e === "append") {
      const o = Vi(t);
      o.createdAt = Date.now(), o.read = !1, n.items.some((s) => s.id === o.id) || n.items.unshift(o), n.items = n.items.slice(0, ji);
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
    return n.version++, await chrome.storage.local.set({ [ht]: n }), n;
  });
  return wi = r.catch(() => {
  }), r;
}
const _ = F({
  isOpen: !1,
  loading: !1,
  saving: !1,
  error: "",
  version: -1,
  items: []
}), Ra = ke(() => _.items.filter((e) => !e.read).length);
let bi = !1;
function $e(e) {
  e.version < _.version || (_.version = e.version, _.items = e.items);
}
const to = {
  state: _,
  start() {
    bi || (bi = !0, typeof chrome < "u" && chrome.storage?.onChanged && chrome.storage.onChanged.addListener((e, t) => {
      if (!(t !== "local" || !e[ht]))
        try {
          $e(Fi(e[ht].newValue));
        } catch {
          _.error = "通知历史格式异常，未覆盖当前记录。";
        }
    }), this.refresh());
  },
  async refresh() {
    _.loading = !0;
    try {
      const e = await Ke("list");
      $e(e), _.error = "";
    } catch {
      _.error = "通知历史读取失败。请点击“重新读取”重试。";
    } finally {
      _.loading = !1;
    }
  },
  open() {
    this.start(), _.isOpen = !0, this.refresh();
  },
  close() {
    _.isOpen = !1;
  },
  toggle() {
    _.isOpen ? this.close() : this.open();
  },
  async markRead(e) {
    if (!_.saving) {
      _.saving = !0;
      try {
        const t = await Ke("read", e);
        $e(t), _.error = "";
      } catch {
        _.error = "标记已读未确认，请重试。";
      } finally {
        _.saving = !1;
      }
    }
  },
  async markAllRead() {
    if (!_.saving) {
      _.saving = !0;
      try {
        const e = await Ke("read-all");
        $e(e), _.error = "";
      } catch {
        _.error = "全部标记已读未确认，请重试。";
      } finally {
        _.saving = !1;
      }
    }
  },
  async remove(e) {
    if (!_.saving) {
      _.saving = !0;
      try {
        const t = await Ke("remove", e);
        $e(t), _.error = "";
      } catch {
        _.error = "删除通知未确认，请重试。";
      } finally {
        _.saving = !1;
      }
    }
  },
  async clear() {
    if (!_.saving) {
      _.saving = !0;
      try {
        const e = await Ke("clear");
        $e(e), _.error = "";
      } catch {
        _.error = "清空通知未确认，请重试。";
      } finally {
        _.saving = !1;
      }
    }
  },
  async activate(e) {
    await this.markRead(e.id), e.target && await this.openTarget(e.target);
  },
  async openTarget(e) {
    const t = ei(e);
    if (t)
      try {
        if (t.type === "todoist-task") {
          const { openTodoistTask: r } = await import("./task-navigation-CvM3gAxl.js");
          r(t.taskId);
        } else if (t.type === "github-repository") {
          const { githubRepoDetailController: r } = await import("./search.service-wriY3nvN.js").then((i) => i.a5);
          r.open(t.fullName);
        } else if (t.type === "bili-video") {
          const { biliMiniPlayerController: r } = await Promise.resolve().then(() => cs);
          await r.openVideo({ bvid: t.bvid, aid: t.aid });
        } else if (t.type === "bili-messages") {
          const { biliMessagePanelController: r } = await import("./message-panel-store-CXAxSqS9.js");
          r.openPanel();
        } else {
          const { getDockModule: r } = await import("./window-manager.store-BdI_8a-H.js").then((n) => n.m);
          if (!r(t.moduleId)) throw new Error();
          const { windowManagerController: i } = await import("./window-manager.store-BdI_8a-H.js").then((n) => n.n);
          i.open(t.moduleId);
        }
        this.close();
      } catch {
        _.error = "通知对应页面暂不能打开，记录已保留。";
      }
  }
};
function ro(e) {
  to.start(), Ke("append", e).then((t) => $e(t)).catch(() => {
    _.error = "有一条通知未获持久保存确认。";
  });
}
const be = F([]), Wt = /* @__PURE__ */ new Map();
function io(e, t) {
  return e.history !== void 0 ? e.history : e.level === "warning" || e.level === "error" || /失败|错误|异常|未确认|未获确认|未保存|无法|不可用|拒绝|超时|警告|到期|时间已到/.test(t) ? !0 : /复制成功|已复制|保存成功|已保存|设置成功|已更新设置|配置已更新|已设为|已取消|已切换/.test(t) || /^(正在|开始读取|加载中|同步中)/.test(t) ? !1 : e.appType === "chat" || e.appType === "bili" || /提醒|任务已创建|任务完成|已完成任务|任务结果|下载完成|新消息|新私信|新回复|新提及|有可用更新/.test(t);
}
const vi = {
  chat: { name: "海狸聊天室", icon: "assets/icon-48.png", action: "查看消息" },
  bili: { name: "哔哩哔哩", icon: "assets/bilibili.svg", action: "查看消息" },
  phone: { name: "手机文件", icon: "assets/nav-traffic.svg", action: "复制文件" },
  fetch: { name: "LogicWeaver", icon: "assets/icon-48.png", action: "" }
};
function nr(e) {
  const t = be.find((r) => r.id === e);
  !t || t.closing || (t.closing = !0, window.setTimeout(() => {
    const r = be.findIndex((i) => i.id === e);
    r >= 0 && be.splice(r, 1);
  }, 260));
}
function no() {
  for (const e of be) nr(e.id);
}
function qi(e) {
  if (!e) return null;
  const t = e.appType || "fetch", r = vi[t] || vi.fetch, i = String(e.title || "新消息通知"), n = String(e.subtitle || ""), o = String(e.message || ""), s = ei(e.target) || (t === "bili" ? Wi(`${i} ${n} ${o}`) : void 0), a = Math.max(500, Number(e.duration) || 7e3), c = String(e.id || `${t}_${i}_${n}_${o}`).trim(), u = Date.now();
  for (const [S, y] of Wt)
    u - y > 3e4 && Wt.delete(S);
  const f = e.id ? 200 : a <= 4e3 ? 1200 : 3e3, h = Wt.get(c);
  if (h && u - h < f || be.some((S) => S.fingerprint === c && !S.closing)) return null;
  Wt.set(c, u);
  const m = `toast_${crypto.randomUUID()}`, g = {
    id: m,
    fingerprint: c,
    appType: t,
    appName: String(e.appName || r.name),
    icon: String(e.icon || r.icon),
    title: i,
    subtitle: n,
    message: o,
    actionLabel: e.actionLabel === void 0 ? r.action : String(e.actionLabel || ""),
    showActions: e.showActions !== !1,
    duration: a,
    onClick: typeof e.onClick == "function" ? e.onClick : null,
    closing: !1,
    target: s
  };
  be.push(g);
  const w = i + " " + n + " " + o;
  if (io(e, w)) {
    const S = e.level || (/失败|错误|异常|未确认|未获确认|无法|超时/.test(w) ? "error" : "info"), y = s || (t === "chat" ? { type: "module", moduleId: "chat" } : void 0);
    ro({ id: m, appType: t, appName: g.appName, title: i, subtitle: n, message: o, level: S, createdAt: u, read: !1, target: y });
  }
  const b = be.filter((S) => !S.closing);
  return b.length > 5 && nr(b[0].id), Object.freeze({ id: m, close: () => nr(m) });
}
function oo(e, t, r = "", i = "assets/logo.png", n = 3200) {
  return qi({ appType: "fetch", appName: e, title: t, subtitle: r, icon: i, duration: n, showActions: !1, actionLabel: "" });
}
const Oa = Ut(be), me = Object.freeze({
  show: qi,
  fetch: oo,
  close: nr,
  clear: no,
  get size() {
    return be.filter((e) => !e.closing).length;
  }
}), Vt = "https://monster-siren.hypergryph.com/api", Ft = "msFavoriteSongs";
class Je {
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
    return Je.instance || (Je.instance = new Je()), Je.instance;
  }
  getAudioElement() {
    return this.audio;
  }
  async initStorage() {
    if (typeof chrome < "u" && chrome.storage?.local) {
      const t = await chrome.storage.local.get([Ft]);
      t[Ft] && (this.favorites = t[Ft]);
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
    const r = await (await fetch(`${Vt}/songs`, { headers: { Accept: "application/json" } })).json();
    return (r.data?.list || r.data || []).map((n) => ({
      cid: n.cid,
      name: n.name,
      artists: n.artists || [],
      albumCid: n.albumCid,
      coverUrl: n.albumCid && this.albumCoverMap.get(String(n.albumCid)) || ""
    }));
  }
  async getSirenAlbums() {
    const n = ((await (await fetch(`${Vt}/albums`, { headers: { Accept: "application/json" } })).json()).data || []).map((o) => ({
      cid: o.cid,
      name: o.name,
      coverUrl: o.coverUrl
    }));
    for (const o of n)
      o.cid && o.coverUrl && this.albumCoverMap.set(String(o.cid), o.coverUrl);
    return n;
  }
  async getSirenAlbumDetail(t) {
    const r = String(t);
    if (this.albumDetailCache.has(r))
      return this.albumDetailCache.get(r);
    const n = await (await fetch(`${Vt}/album/${t}/detail`, { headers: { Accept: "application/json" } })).json(), o = n.data?.songs || [], s = n.data?.coverUrl || "", a = o.map((c) => ({
      cid: c.cid,
      name: c.name,
      artists: c.artists || c.artistes || [],
      albumCid: t,
      coverUrl: s
    }));
    return this.albumDetailCache.set(r, a), a;
  }
  async getSirenSongUrl(t) {
    const i = await (await fetch(`${Vt}/song/${t}`, { headers: { Accept: "application/json" } })).json();
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
    !t.coverUrl && t.albumCid && (t.coverUrl = this.albumCoverMap.get(String(t.albumCid)) || ""), this.state.currentSong = t, this.state.queue.some((o) => String(o.cid) === String(t.cid)) || this.state.queue.push(t), this.state.queueIndex = this.state.queue.findIndex((o) => String(o.cid) === String(t.cid));
    try {
      let o = "";
      if (t.isNetease && t.neteaseId ? o = await x.getSongAudioUrl(t.neteaseId) : o = (await this.getSirenSongUrl(t.cid)).sourceUrl, !n()) return !1;
      if (o)
        return this.audio.src = o, r.autoplay !== !1 && await this.audio.play(), n() ? (this.state.playing = !this.audio.paused, this.notify(), !0) : !1;
    } catch (o) {
      if (!n()) return !1;
      console.error("[MusicService] Play song failed:", o), this.state.playing = !1, this.notify();
    }
    return !1;
  }
  async playNeteaseSong(t, r = {}) {
    if (!t || r.isCurrent?.() === !1) return !1;
    x.addRecentSong(t);
    const i = (t.ar || t.artists || []).map((s) => typeof s == "string" ? s : s.name), n = t.al?.picUrl || t.album?.picUrl || t.picUrl || t.coverUrl || "", o = {
      cid: `ne_${t.id}`,
      name: t.name || "网易云音乐",
      artists: i.length ? i : ["网易云音乐"],
      coverUrl: n,
      isNetease: !0,
      neteaseId: t.id,
      rawSong: t
    };
    return this.playSong(o, r);
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
    typeof chrome < "u" && chrome.storage?.local && chrome.storage.local.set({ [Ft]: this.favorites });
  }
}
const $ = Je.getInstance(), we = F({ visible: !1, pendingWrites: 0 }), Vr = /* @__PURE__ */ new Set();
function xa(e) {
  return Vr.add(e), () => {
    Vr.delete(e);
  };
}
function so() {
  for (const e of Vr) e();
}
async function Na(e) {
  we.pendingWrites++;
  try {
    return await e();
  } finally {
    we.pendingWrites--;
  }
}
const Hi = "netease_cached_playlists", Gi = "netease_cached_favorites_songs", tt = /* @__PURE__ */ new Map(), rt = /* @__PURE__ */ new Map();
let or;
function Si(e) {
  const t = rt.get(e);
  if (t) return t;
  try {
    const r = localStorage.getItem(e), i = tt.get(e);
    if (i?.raw === r) return i.value;
    const n = r ? JSON.parse(r) : [], o = Array.isArray(n) ? n : [];
    return tt.set(e, { raw: r, value: o }), o;
  } catch {
    return [];
  }
}
function Ki() {
  clearTimeout(or), or = void 0;
  for (const [e, t] of rt)
    try {
      const r = JSON.stringify(t);
      localStorage.getItem(e) !== r && localStorage.setItem(e, r), tt.set(e, { raw: r, value: t });
    } catch {
      tt.delete(e);
    }
  rt.clear();
}
function La(e, t) {
  rt.set(e, t), or === void 0 && (or = setTimeout(Ki, 250));
}
function $a(e) {
  rt.delete(e), tt.delete(e);
  try {
    localStorage.removeItem(e);
  } catch {
  }
}
typeof window < "u" && (window.addEventListener("pagehide", Ki), window.addEventListener("storage", (e) => {
  if (e.storageArea === localStorage)
    for (const t of [Hi, Gi])
      (e.key === null || e.key === t) && (tt.delete(t), rt.delete(t));
}));
function Qe(e) {
  return (!Number.isFinite(e) || e < 0) && (e = 0), Math.floor(e / 60) + ":" + String(Math.floor(e % 60)).padStart(2, "0");
}
const Da = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Ccircle cx='32' cy='32' r='30' fill='%231e1e24'/%3E%3Ctext x='32' y='38' fill='%23ec4141' font-size='22' text-anchor='middle'%3E%E2%99%AC%3C/text%3E%3C/svg%3E", ao = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Cdefs%3E%3CradialGradient id='msrVinyl' cx='50%25' cy='50%25' r='50%25'%3E%3Cstop offset='0%25' stop-color='%2327272a'/%3E%3Cstop offset='70%25' stop-color='%2309090b'/%3E%3Cstop offset='100%25' stop-color='%23000000'/%3E%3C/radialGradient%3E%3C/defs%3E%3Ccircle cx='32' cy='32' r='31' fill='url(%23msrVinyl)' stroke='%233f3f46' stroke-width='1.5'/%3E%3Ccircle cx='32' cy='32' r='24' fill='none' stroke='%2327272a' stroke-width='1' stroke-dasharray='3 2'/%3E%3Ccircle cx='32' cy='32' r='18' fill='none' stroke='%2318181b' stroke-width='1'/%3E%3Ccircle cx='32' cy='32' r='11' fill='%23f59e0b' opacity='0.9'/%3E%3Ccircle cx='32' cy='32' r='4' fill='%2309090b'/%3E%3Ccircle cx='32' cy='32' r='1.5' fill='%23fafafa'/%3E%3C/svg%3E", co = () => ({
  mounted: !1,
  playing: !1,
  title: "点击播放",
  artist: "作者",
  coverUrl: ao,
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
  neteaseRecentSongs: x.getRecentSongs(),
  neteaseQrImg: "",
  neteaseQrStatus: "",
  neteaseLoading: !1
}), p = F(co());
let D = {};
const zi = {
  getSnapshot() {
    return Ut(p);
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
  setTrack(e, t, r) {
    p.title = e || "点击播放", p.artist = t || "作者", p.coverUrl = r || "";
  },
  setProgress(e, t) {
    p.currentTime = e, p.duration = t, p.formattedCurrent = Qe(e), p.formattedDuration = Qe(t), t > 0 ? p.progressPercent = Math.min(100, Math.max(0, e / t * 100)) : p.progressPercent = 0;
  },
  setLiked(e) {
    p.liked = e;
  },
  setMode(e) {
    p.mode = e;
  },
  togglePicker(e) {
    e !== void 0 ? we.visible = e : we.visible = !we.visible;
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
    D = { ...D, ...e };
  },
  playTrack(e) {
    p.isBiliRadio = !1;
    const t = window;
    if (t.LogicWeaverBiliRadioPlayer?.getState?.()?.playing && t.LogicWeaverBiliRadioPlayer.toggle(), D.playCid)
      D.playCid(e);
    else {
      const r = p.activeAlbum?._songs || [], n = [...p.songs, ...p.favorites, ...r].find((o) => String(o.cid) === String(e));
      n ? $.playSong(n) : $.playSong({ cid: e, name: "塞壬唱片", artists: ["塞壬唱片"] }), window.dispatchEvent(new CustomEvent("logicweaver:music-play-cid", { detail: { cid: e } }));
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
    D.togglePlay ? D.togglePlay() : ($.togglePlay(), window.dispatchEvent(new CustomEvent("logicweaver:music-toggle-play")));
  },
  prev() {
    if (p.isBiliRadio) {
      const e = window;
      if (typeof e.LogicWeaverBiliRadioPlayer?.prev == "function") {
        e.LogicWeaverBiliRadioPlayer.prev();
        return;
      }
    }
    D.prev ? D.prev() : ($.prev(), window.dispatchEvent(new CustomEvent("logicweaver:music-prev")));
  },
  next() {
    if (p.isBiliRadio) {
      const e = window;
      if (typeof e.LogicWeaverBiliRadioPlayer?.next == "function") {
        e.LogicWeaverBiliRadioPlayer.next();
        return;
      }
    }
    D.next ? D.next() : ($.next(), window.dispatchEvent(new CustomEvent("logicweaver:music-next")));
  },
  toggleLike() {
    if (D.toggleLike)
      D.toggleLike();
    else {
      const e = $.getState().currentSong;
      e && (p.liked = $.toggleLike(e), p.favorites = $.getFavorites()), window.dispatchEvent(new CustomEvent("logicweaver:music-toggle-like"));
    }
  },
  cycleMode() {
    if (D.cycleMode)
      D.cycleMode();
    else {
      const e = $.cyclePlayMode();
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
    D.seek ? D.seek(e) : ($.seek(e), window.dispatchEvent(new CustomEvent("logicweaver:music-seek", { detail: { percent: e } })));
  },
  openPanel() {
    D.openPanel ? D.openPanel() : (zi.togglePicker(!0), window.dispatchEvent(new CustomEvent("logicweaver:music-open-panel")));
  },
  openNetease() {
    p.pickerTab = "netease", p.pickerOpen = !0, p.activeAlbum = null, this.loadNeteaseData();
  },
  async loadNeteaseData() {
    p.neteaseUser = x.getUser(), p.neteaseRecentSongs = x.getRecentSongs(), p.neteaseLoading = !0;
    try {
      const [e] = await Promise.all([
        x.getPlaylists(),
        x.fetchAccountRecentSongs(60).catch(() => [])
      ]);
      if (p.neteasePlaylists = e, p.neteaseRecentSongs = x.getRecentSongs(), e.length > 0) {
        const t = e.find((r) => r.name.includes("喜欢的音乐") || r.name.includes("Favorite")) || e[0];
        (!p.neteaseActivePlaylist || p.neteaseActivePlaylist.id !== t.id) && await this.selectNeteasePlaylist(t);
      }
    } catch (e) {
      console.warn("[MusicStore] Load netease playlists error:", e);
    } finally {
      p.neteaseLoading = !1, p.neteaseRecentSongs = x.getRecentSongs();
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
          const r = await x.getPlaylistTracks(e.id, 10, 0);
          p.neteaseActivePlaylist?.id === e.id && !p.neteaseSongs.length && (p.neteaseSongs = r, p.neteaseLoading = !1);
        } catch {
        }
      const t = await x.getPlaylistTracks(e.id, 500, 0);
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
      const r = await x.searchSongs(t);
      p.neteaseSearchResults = r;
    } catch (r) {
      console.warn("[MusicStore] Search netease error:", r);
    } finally {
      p.neteaseLoading = !1;
    }
  },
  syncFromBiliRadio(e) {
    p.isBiliRadio = !0, p.isNetease = !1, p.playing = e.playing, p.title = e.title || "B站电台", p.artist = e.artist || e.seriesName || "哔哩哔哩", e.coverUrl && (p.coverUrl = e.coverUrl), p.currentTime = e.currentTime, p.duration = e.duration, p.formattedCurrent = Qe(e.currentTime), p.formattedDuration = Qe(e.duration), p.progressPercent = e.duration > 0 ? Math.min(100, Math.max(0, e.currentTime / e.duration * 100)) : 0, p.currentLyric = e.lyric || "", p.biliRadioSeriesName = e.seriesName || "";
    const t = $.getAudioElement();
    e.playing && t && !t.paused && t.pause();
  },
  playNeteaseTrack(e) {
    p.isBiliRadio = !1;
    const t = window;
    t.LogicWeaverBiliRadioPlayer?.getState?.()?.playing && t.LogicWeaverBiliRadioPlayer.toggle(), e && (x.recordRecentSong(e), p.neteaseRecentSongs = x.getRecentSongs()), $.playNeteaseSong(e);
  },
  clearNeteaseRecent() {
    x.clearRecentSongs().catch(() => console.warn("[MusicStore] Recent history removal failed; re-read before retry"));
  },
  refreshRecentSongs() {
    p.neteaseRecentSongs = x.getRecentSongs();
  },
  stopNeteaseQrLogin() {
  },
  async startNeteaseQrLogin() {
    this.stopNeteaseQrLogin();
    try {
      await x.connectWebsiteAccount(), p.neteaseQrStatus = "官网账户已连接", await this.loadNeteaseData();
    } catch (e) {
      p.neteaseQrStatus = e?.message || "请先在网易云官网登录。";
    }
  },
  async logoutNetease() {
    await x.logout(), p.neteaseUser = null, p.neteasePlaylists = [], p.neteaseActivePlaylist = null, p.neteaseSongs = [], p.neteaseSearchResults = [];
  }
};
typeof window < "u" && (window.addEventListener("netease:account-updated", () => {
  p.neteaseUser = x.getUser(), p.neteasePlaylists = [], p.neteaseSongs = [], p.neteaseSearchResults = [], p.neteaseActivePlaylist = null;
}), window.addEventListener("netease:recent-updated", (e) => {
  Array.isArray(e.detail) ? p.neteaseRecentSongs = e.detail : p.neteaseRecentSongs = x.getRecentSongs();
}), $.subscribe((e) => {
  p.playing = e.playing, p.currentTime = e.currentTime, p.duration = e.duration, p.formattedCurrent = Qe(e.currentTime), p.formattedDuration = Qe(e.duration), e.duration > 0 ? p.progressPercent = Math.min(100, Math.max(0, e.currentTime / e.duration * 100)) : p.progressPercent = 0, p.mode = e.mode, p.isNetease = !!e.currentSong?.isNetease, p.currentLyric = e.currentLyric || "", e.currentSong && (p.title = e.currentSong.name || "点击播放", p.artist = (e.currentSong.artists || []).join(", ") || "作者", p.coverUrl = e.currentSong.coverUrl || "", p.liked = $.isLiked(e.currentSong.cid));
}));
async function Ba() {
  try {
    if (p.favorites = $.getFavorites(), p.neteaseRecentSongs = x.getRecentSongs(), p.neteaseUser = x.getUser(), typeof localStorage < "u")
      try {
        const r = Si(Gi);
        if (r.length) {
          const n = r;
          Array.isArray(n) && n.length > 0 && p.neteaseSongs.length === 0 && (p.neteaseSongs = n);
        }
        const i = Si(Hi);
        if (i.length) {
          const n = i;
          Array.isArray(n) && n.length > 0 && p.neteasePlaylists.length === 0 && (p.neteasePlaylists = n);
        }
      } catch {
      }
    const [e, t] = await Promise.all([
      $.getSirenSongs().catch(() => []),
      $.getSirenAlbums().catch(() => [])
    ]);
    e.length > 0 && p.songs.length === 0 && (p.songs = e, $.setQueue(e, -1, !1)), t.length > 0 && p.albums.length === 0 && (p.albums = t);
  } catch (e) {
    console.warn("[MusicStore] initHomeMusicService failed:", e);
  }
}
const se = F({
  avatarUrl: "assets/bilibili.svg",
  userName: "哔哩哔哩用户",
  buttonTitle: "通知中心"
}), lo = () => ({
  mounted: !1,
  visible: !1,
  x: 0,
  y: 0,
  avatarUrl: "assets/bilibili.svg",
  userName: "用户"
}), xe = F(lo());
let Y = {};
const uo = {
  getSnapshot() {
    return Ut(xe);
  },
  update(e) {
    Object.assign(xe, e);
  },
  setMounted(e) {
    xe.mounted = e;
  },
  open(e, t) {
    xe.x = e, xe.y = t, xe.visible = !0;
    const r = document.getElementById("bili-profile-menu");
    r && (r.hidden = !1, r.style.left = `${Math.min(window.innerWidth - 205, e)}px`, r.style.top = `${Math.min(window.innerHeight - 150, t)}px`);
  },
  close() {
    xe.visible = !1;
    const e = document.getElementById("bili-profile-menu");
    e && (e.hidden = !0);
  },
  trigger(e) {
    if (uo.close(), Y.onAction) {
      Y.onAction(e);
      return;
    }
    e === "messages" && Y.showInfo ? Y.showInfo() : e === "refresh" && Y.refresh ? Y.refresh() : e === "switch" && Y.switchUser ? Y.switchUser() : e === "web" && Y.openWeb ? Y.openWeb() : window.dispatchEvent(new CustomEvent("logicweaver:profile-menu-action", { detail: { action: e } }));
  },
  setActions(e) {
    Y = { ...Y, ...e };
  }
}, Ai = [
  "todoist",
  "card-github",
  "daily-aihot",
  "daily-bilibili",
  "daily-youtube"
], sr = "lw_active_card";
function fo() {
  try {
    if (typeof localStorage < "u" && localStorage.removeItem(sr), typeof window < "u" && window.location?.hash) {
      const e = window.location.hash.replace(/^#/, "");
      if (Ai.includes(e))
        return e;
    }
    if (typeof sessionStorage < "u") {
      const e = sessionStorage.getItem(sr);
      if (e && Ai.includes(e))
        return e;
    }
  } catch {
  }
  return null;
}
const ae = F({
  activeId: fo()
});
typeof window < "u" && _e(
  () => ae.activeId,
  (e) => {
    try {
      e ? (sessionStorage.setItem(sr, e), window.location.hash !== `#${e}` && history.replaceState(null, "", `#${e}`)) : (sessionStorage.removeItem(sr), window.location.hash && history.replaceState(null, "", window.location.pathname + window.location.search));
    } catch {
    }
  },
  { immediate: !0 }
);
let ar;
function ja(e) {
  ar = e;
}
function hr(e) {
  if (!ar) throw new Error("Fullscreen card host not ready");
  ar.enter(e);
}
function Pt(e) {
  ae.activeId === e && ar?.exit();
}
function mo(e) {
  typeof document > "u" || (document.documentElement?.classList.remove("has-card-fullscreen"), document.body && (document.body.classList.toggle("has-card-fullscreen", !!e), document.body.dataset.page = e ? "daily" : "home"));
}
const po = {
  "bilibili.html": "daily-bilibili",
  "github.html": "card-github",
  "aihot.html": "daily-aihot",
  "youtube.html": "daily-youtube"
};
function Ji() {
  return typeof location > "u" ? null : po[location.pathname.split("/").pop() || ""] || null;
}
const Wa = ke(() => {
  const e = Ji() || ae.activeId;
  if (e) return e;
  const t = Vn.activeId;
  return t && pr.isActive(t) ? t : "home";
}), ho = {
  schemaVersion: 1,
  id: "card-github",
  title: "github插件",
  icon: "assets/nav-github.svg",
  presentation: "card",
  dockBefore: "daily-aihot",
  rootId: "card-github",
  settingsKeys: ["ghUser", "ghToken", "ghAiServiceConfigV1", "ghArchifyWebhookUrl"],
  capabilities: ["workspace:fullscreen", "view:retained", "github:repositories"],
  loadView: () => import("./GitHubWorkspaceCard-BML0V5aJ.js").then((e) => e.default),
  lifecycle: {
    isVisible: () => ae.activeId === "card-github",
    open: () => hr("card-github"),
    hide: () => Pt("card-github"),
    // Existing card menus do not expose Quit/Reload. Do not introduce a destructive new path
    // until settings drafts and every child editor provide an aggregate unmount guard.
    canUnmount: () => !1,
    unmountBlockedMessage: "GitHub 工作区保留原有隐藏保活设计；尚未开放独立退出/重载，以免丢失草稿。"
  }
}, go = F({
  showWeather: !0,
  showSites: !0,
  showBili: !0,
  showYouTube: !0,
  showTodo: !0,
  showBookmarkPanel: !0
}), yo = {
  schemaVersion: 1,
  id: "daily-youtube",
  title: "youtube插件",
  icon: "assets/nav-youtube.svg",
  presentation: "card",
  rootId: "daily-youtube",
  showInDock: !0,
  settingsKeys: ["youtubeModuleSettingsV1"],
  capabilities: ["workspace:fullscreen", "view:retained", "youtube:recommendations", "youtube:favorites"],
  loadView: () => import("./YouTubeCard-CDntkAcs.js").then((e) => e.Y).then((e) => e.default),
  lifecycle: {
    // Match the original retained-mount condition, including the shared homepage preference.
    isVisible: () => ae.activeId === "daily-youtube" && go.showYouTube,
    open: () => hr("daily-youtube"),
    hide: () => Pt("daily-youtube"),
    // Preserve existing card menus. Settings drafts and shared writes are not yet
    // aggregated into a safe independent Quit/Reload guard.
    canUnmount: () => !1,
    unmountBlockedMessage: "YouTube 工作区保留原有隐藏保活设计；尚未开放独立退出/重载，以免丢失设置草稿或打断收藏操作。"
  }
}, wo = {
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
  loadView: () => import("./BilibiliWorkspace-DdlSrmjl.js").then((e) => e.default),
  lifecycle: {
    isVisible: () => ae.activeId === "daily-bilibili",
    open: () => hr("daily-bilibili"),
    hide: () => Pt("daily-bilibili"),
    // Hide must not dispose shared radio/player state or interrupt folder/cache operations.
    canUnmount: () => !1,
    unmountBlockedMessage: "B站收藏保留原有隐藏保活设计；尚未开放独立退出/重载，以免打断播放、收藏或缓存操作。"
  }
}, bo = {
  schemaVersion: 1,
  id: "daily-aihot",
  title: "ai hot插件",
  icon: "assets/nav-aihot.svg",
  presentation: "card",
  rootId: "daily-aihot",
  // Existing localStorage preferences; registration neither reads nor migrates them.
  settingsKeys: ["lw-info-feed-view", "lw-aihot-feed-cat", "lw-aihot-feed-window"],
  capabilities: ["workspace:fullscreen", "view:retained", "aihot:aggregate"],
  loadView: () => import("./AihotFeed-k68tnB8a.js").then((e) => e.default),
  lifecycle: {
    isVisible: () => ae.activeId === "daily-aihot",
    open: () => hr("daily-aihot"),
    hide: () => Pt("daily-aihot"),
    // Keep the original retained card. Its view owns list activity;
    // the separate article reader is not owned or closed by this module.
    canUnmount: () => !1,
    unmountBlockedMessage: "AI HOT 保留原有隐藏保活设计；尚未开放独立退出/重载。"
  }
}, vo = {
  schemaVersion: 1,
  id: "stickers",
  title: "表情包模块",
  emoji: "😺",
  // Keep the chat picker's library management window without a standalone Dock entry.
  showInDock: !1,
  rootId: "vue-stickers-dialog-root",
  settingsKeys: zn,
  capabilities: ["folder:explicit-permission", "image:explicit-save-delete", "image:local-preview", "image:clipboard"],
  loadView: () => import("./StickersDialog-75iBZmAE.js").then((e) => e.default),
  lifecycle: {
    isVisible: () => Bt.visible,
    open: () => {
      Bt.visible = !0;
    },
    hide: () => {
      Bt.visible = !1, Jn();
    },
    canUnmount: () => Bt.pendingWrites === 0,
    unmountBlockedMessage: "图片保存/删除、目录授权或偏好正在处理，暂不能退出/重载；可以先隐藏，已提交操作不会撤回。"
  }
}, So = "neteaseApiUrl", Ao = [So], Eo = {
  schemaVersion: 1,
  id: "music",
  title: "网易云模块",
  icon: "assets/netease.svg",
  rootId: "vue-music-workspace-root",
  settingsKeys: Ao,
  capabilities: ["catalog:read", "settings:endpoint", "account:explicit-login-logout", "playback:shared-home-controls"],
  loadView: () => import("./NeteaseWorkspaceDialog-B6Kj5g1V.js").then((e) => e.default),
  lifecycle: {
    isVisible: () => we.visible,
    open: () => {
      we.visible = !0;
    },
    hide: () => {
      we.visible = !1, so();
    },
    canUnmount: () => we.pendingWrites === 0,
    unmountBlockedMessage: "节点保存、登录确认/退出或记录写入正在处理，暂不能退出/重载；可以隐藏。退出窗口不会停止首页播放。"
  }
}, Co = Object.freeze([
  "todoistToken",
  "todoistActiveProjectIdV1"
]), ko = {
  schemaVersion: 1,
  id: "todoist",
  title: "todoist",
  icon: "assets/nav-todoist.svg",
  dockBefore: "stickers",
  rootId: "todoist",
  settingsKeys: Co,
  capabilities: ["view:retained", "tasks:read-write", "attachments:explicit-upload", "settings:account-rules", "calendar:shared"],
  loadView: () => import("./TodoistWorkspace-uM5weQdA.js").then((e) => e.default),
  lifecycle: {
    isVisible: () => jt.visible,
    open: () => {
      jt.visible = !0;
    },
    hide: () => {
      jt.visible = !1, Qn();
    },
    canUnmount: () => jt.pendingWrites === 0,
    unmountBlockedMessage: "任务、附件、评论或配置正在写入，暂不能退出/重载；可以隐藏。首页限时任务和独立日历不会随窗口退出停止。"
  }
}, Io = 1, _o = 1, To = { text: { legacy: !0 }, image: { legacy: !1 }, music: { legacy: !0 }, bilibili: { legacy: !0 }, github: { legacy: !0 }, bili_series: { legacy: !0 }, aihot: { legacy: !0 }, youtube: { legacy: !0 }, website: { legacy: !0 }, server_invite: { legacy: !0 }, music_party: { legacy: !0 } }, Uo = ["image/png", "image/jpeg", "image/gif", "image/webp"], Po = { messageBytes: 262144, imageMessageBytes: 2097152, imageBytes: 1048576, textChars: 8e3, imageMaxDimension: 8192, imageMaxPixels: 16777216 }, nt = {
  schema: Io,
  protocol: _o,
  messageTypes: To,
  imageMimeTypes: Uo,
  limits: Po
};
function Mo(e) {
  try {
    if (e.length > Math.ceil(nt.limits.imageBytes / 3) * 4 + 64) return;
    const t = e.indexOf(","), r = e.slice(5, e.indexOf(";")), i = Uint8Array.from(atob(e.slice(t + 1)), (s) => s.charCodeAt(0)), n = new DataView(i.buffer), o = (s, a) => String.fromCharCode(...i.slice(s, a));
    if (r === "image/png" && i.length >= 33 && o(0, 8) === `PNG\r

` && n.getUint32(8) === 13 && o(12, 16) === "IHDR") return [n.getUint32(16), n.getUint32(20)];
    if (r === "image/gif" && i.length >= 13 && ["GIF87a", "GIF89a"].includes(o(0, 6))) return [n.getUint16(6, !0), n.getUint16(8, !0)];
    if (r === "image/webp" && i.length >= 25 && o(0, 4) === "RIFF" && o(8, 12) === "WEBP" && n.getUint32(4, !0) + 8 === i.length) {
      const s = o(12, 16);
      if (s === "VP8X" && i.length >= 30) return [1 + i[24] + (i[25] << 8) + (i[26] << 16), 1 + i[27] + (i[28] << 8) + (i[29] << 16)];
      if (s === "VP8L" && i[20] === 47) {
        const a = n.getUint32(21, !0);
        return [1 + (a & 16383), 1 + (a >>> 14 & 16383)];
      }
      if (s === "VP8 " && i.length >= 30 && o(23, 26) === "*") return [n.getUint16(26, !0) & 16383, n.getUint16(28, !0) & 16383];
    }
    if (r === "image/jpeg" && i[0] === 255 && i[1] === 216) {
      let s = 2;
      for (; s + 4 <= i.length && i[s] === 255; ) {
        for (; s < i.length && i[s] === 255; ) s++;
        if (s >= i.length) break;
        const a = i[s++];
        if (a === 216 || a === 1 || a >= 208 && a <= 215) continue;
        if (a === 217 || a === 218 || s + 2 > i.length) break;
        const c = n.getUint16(s);
        if (c < 2 || s + c > i.length) break;
        if ([192, 193, 194, 195, 197, 198, 199, 201, 202, 203, 205, 206, 207].includes(a) && c >= 8) return [n.getUint16(s + 5), n.getUint16(s + 3)];
        s += c;
      }
    }
  } catch {
  }
}
const Ro = nt.protocol, Ie = Object.freeze({ ...nt.limits }), Fr = Object.freeze(Object.keys(nt.messageTypes)), qr = Object.freeze([...nt.imageMimeTypes]), ce = (e) => !!e && typeof e == "object" && !Array.isArray(e), Mr = (e) => typeof e == "number" && Number.isSafeInteger(e) && e > 0;
function gr() {
  return { status: "unknown", reason: "请先完成当前服务器的身份同步，再发送消息。", messageTypes: [], imageMimeTypes: [], limits: { ...Ie } };
}
function qt() {
  return { ...gr(), status: "incompatible", reason: "服务端消息能力格式无效或协议版本不兼容，请服主核对前后端版本；待发内容已保留。" };
}
function Oo(e) {
  if (e === void 0 || ce(e) && !("schema" in e) && !("protocol" in e) && !("messageTypes" in e) && !("limits" in e)) {
    if (e !== void 0 && !ce(e)) return qt();
    const n = ce(e) && e.imageMessages === 1;
    return ce(e) && e.maxImageBytes !== void 0 && !Mr(e.maxImageBytes) ? qt() : {
      status: "legacy",
      reason: n ? "" : "此旧版服务端未声明图片能力，请服主升级；待发图片已保留。",
      messageTypes: Fr.filter((o) => o === "image" ? n : nt.messageTypes[o].legacy),
      imageMimeTypes: n ? [...qr] : [],
      limits: { ...Ie, imageBytes: n && ce(e) && Mr(e.maxImageBytes) ? Math.min(e.maxImageBytes, Ie.imageBytes) : Ie.imageBytes }
    };
  }
  if (!ce(e) || e.schema !== 1 || e.protocol !== Ro || !ce(e.limits) || !Array.isArray(e.messageTypes) || e.messageTypes.length > 64 || e.messageTypes.some((n) => typeof n != "string") || !Array.isArray(e.imageMimeTypes) || e.imageMimeTypes.length > 16 || e.imageMimeTypes.some((n) => typeof n != "string")) return qt();
  const t = { ...Ie };
  for (const n of Object.keys(t)) {
    const o = e.limits[n];
    if (!Mr(o)) return qt();
    t[n] = Math.min(t[n], o);
  }
  const r = qr.filter((n) => e.imageMimeTypes.includes(n)), i = Fr.filter((n) => e.messageTypes.includes(n) && (n !== "image" || e.imageMessages === 1 && r.length > 0));
  return { status: "supported", reason: i.includes("image") ? "" : "此服务端未启用兼容的图片消息，待发图片已保留。", messageTypes: i, imageMimeTypes: r, limits: t };
}
function xo(e, t = Ie, r = qr) {
  if (typeof e != "string" || e.length > Math.ceil(t.imageBytes / 3) * 4 + 32) return !1;
  const i = /^data:(image\/[a-z0-9.+-]+);base64,([A-Za-z0-9+/]+={0,2})$/.exec(e);
  if (!i || !r.includes(i[1])) return !1;
  const n = i[2], o = n.length / 4 * 3 - (n.endsWith("==") ? 2 : n.endsWith("=") ? 1 : 0);
  return n.length % 4 === 0 && o > 0 && o <= t.imageBytes;
}
function St(e, t) {
  if (!ce(t) || typeof t.type != "string" || typeof t.content != "string" || typeof t.id != "string" || !t.id || typeof t.timestamp != "number" || !Number.isFinite(t.timestamp) || !ce(t.sender) || typeof t.sender.uid != "string" || typeof t.sender.name != "string" || typeof t.sender.avatar != "string") return "消息格式无效，原记录已保留，请核对后重新发送。";
  const r = ce(t.meta) ? t.meta.imageUrl : void 0;
  if (e.status === "unknown" || e.status === "incompatible") return e.reason;
  if (!e.messageTypes.includes(t.type)) return t.type === "image" ? e.reason || "服务端未启用图片消息，待发图片已保留。" : "服务端不支持此消息类型，内容已保留。";
  if (t.content.length > e.limits.textChars) return "文字超过服务端声明的长度上限，请缩短后再发送。";
  if (t.type === "image" && !xo(r, e.limits, e.imageMimeTypes)) return "图片格式或大小不符合服务端能力，请重新选择或压缩；原内容已保留。";
  if (t.type === "image") {
    const o = Mo(r);
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
const Qi = Ie.imageMessageBytes, Yi = Ie.textChars, At = (e) => !!e && typeof e == "object" && !Array.isArray(e), ne = (e, t) => typeof e == "string" && e.length <= t;
function Mt(e) {
  if (!ne(e, 4096)) return "";
  try {
    const t = new URL(e);
    return ["https:", "http:"].includes(t.protocol) && !t.username && !t.password ? t.href : "";
  } catch {
    return "";
  }
}
function yr(e) {
  return typeof e != "string" ? "" : e.length <= Qi && /^data:image\/(?:png|jpeg|gif|webp);base64,[A-Za-z0-9+/=\r\n]+$/i.test(e) ? e : Mt(e);
}
function wr(e) {
  if (!ne(e, 4096)) throw new Error("服务器地址过长");
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
function Zi(e, t) {
  if (!(!At(e) || !["bilibili", "github", "music", "aihot", "youtube", "idle"].includes(String(e.type)) || !ne(e.title, 500)))
    return { type: e.type, title: e.title, url: Mt(e.url) || void 0, updatedAt: t };
}
function Xi(e, t = 0) {
  if (!At(e) || t > 2) return;
  const r = /* @__PURE__ */ Object.create(null);
  for (const [i, n] of Object.entries(e).slice(0, 64))
    ["__proto__", "constructor", "prototype", "rawSong"].includes(i) || (typeof n == "string" && n.length <= (i === "imageUrl" ? Qi : Yi) ? r[i] = /(?:cover|avatar|face|imageUrl)$/i.test(i) ? yr(n) : /url$/i.test(i) ? Mt(n) : n : typeof n == "boolean" || typeof n == "number" && Number.isFinite(n) ? r[i] = n : i === "seriesItems" && Array.isArray(n) && (r[i] = n.slice(0, 100).map((o) => Xi(o, t + 1)).filter(Boolean)));
  return r;
}
function Rt(e) {
  return en(e, Date.now());
}
function en(e, t) {
  if (!At(e) || !At(e.sender) || !ne(e.id, 160) || !e.id || !ne(e.sender.uid, 160) || !e.sender.uid || !ne(e.sender.name, 100) || !ne(e.content, Yi) || ![...Fr, "system"].includes(String(e.type)) || typeof e.timestamp != "number" || !Number.isFinite(e.timestamp)) return;
  const r = yr(e.sender.avatar) || (ne(e.sender.avatar, 32) && !/[:/]/.test(e.sender.avatar) ? e.sender.avatar : "👤");
  return { id: e.id, sender: { uid: e.sender.uid, name: e.sender.name, avatar: r, activity: Zi(e.sender.activity, t) }, type: e.type, content: e.content, timestamp: e.timestamp, meta: Xi(e.meta) };
}
function No(e, t) {
  if (!At(e) || !ne(e.uid, 160) || !e.uid || !ne(e.name, 100)) return;
  const r = yr(e.avatar) || (ne(e.avatar, 32) && !/[:/]/.test(e.avatar) ? e.avatar : "👤");
  return { uid: e.uid, name: e.name, avatar: r, activity: Zi(e.activity, t) };
}
const Et = ye(""), Va = ye(!1), ti = ye(0);
let ct, je = Promise.resolve();
const pe = /* @__PURE__ */ new Map();
function ri(e, t, r) {
  return JSON.stringify([e, t, r]);
}
function br() {
  return ct || (ct = new Promise((e, t) => {
    const r = indexedDB.open("lw-chat-history", 2);
    r.onupgradeneeded = () => {
      r.result.objectStoreNames.contains("messages") || r.result.createObjectStore("messages", { keyPath: ["scope", "id"] }).createIndex("timeline", ["scope", "timestamp", "id"], { unique: !0 }), r.result.objectStoreNames.contains("relay-cursors") || r.result.createObjectStore("relay-cursors");
    }, r.onerror = () => t(r.error), r.onblocked = () => {
      Et.value = "历史数据库升级被其他标签页阻塞，请关闭旧标签页后重试";
    }, r.onsuccess = () => {
      const i = r.result;
      i.onversionchange = () => {
        i.close(), ct = void 0;
      }, e(i);
    };
  }).catch((e) => {
    throw ct = void 0, e;
  })), ct;
}
function vr(e, t) {
  for (const r of t) {
    const i = Rt(r);
    if (!i || i.id === "sys-welcome") continue;
    const n = { scope: e, id: i.id, timestamp: i.timestamp, message: JSON.parse(JSON.stringify(i)) };
    pe.set(JSON.stringify([e, n.id]), n);
  }
  return ti.value = pe.size, Lo();
}
function Lo() {
  return je = je.then(async () => {
    if (!pe.size) return;
    const e = [...pe.entries()];
    try {
      const t = await br();
      await new Promise((r, i) => {
        const n = t.transaction("messages", "readwrite");
        n.oncomplete = () => r(), n.onabort = () => i(n.error), n.onerror = () => i(n.error);
        const o = n.objectStore("messages");
        for (const [, s] of e) o.put(s);
      });
      for (const [r, i] of e) pe.get(r) === i && pe.delete(r);
      ti.value = pe.size, Et.value = "";
    } catch {
      Et.value = "历史未能写入磁盘（空间不足或数据库不可用）。待存消息保留在内存，请先导出备份，勿关闭或刷新。";
    }
  }), je;
}
async function $o(e) {
  await je;
  const t = await br();
  return new Promise((r, i) => {
    const n = t.transaction("relay-cursors", "readonly"), o = n.objectStore("relay-cursors").get(e);
    n.oncomplete = () => r(Number.isSafeInteger(o.result) ? o.result : 0), n.onabort = () => i(n.error), o.onerror = () => i(o.error);
  });
}
function Do(e, t, r) {
  const i = je.then(async () => {
    const n = await br();
    await new Promise((o, s) => {
      const a = n.transaction(["messages", "relay-cursors"], "readwrite"), c = a.objectStore("messages");
      for (const h of t) c.put({ scope: e, id: h.id, timestamp: h.timestamp, message: JSON.parse(JSON.stringify(h)) });
      const u = a.objectStore("relay-cursors"), f = u.get(e);
      f.onsuccess = () => u.put(Math.max(Number(f.result) || 0, r), e), a.oncomplete = () => o(), a.onabort = () => s(a.error), a.onerror = () => s(a.error);
    });
  });
  return je = i.catch(() => {
  }), i;
}
async function tn(e, t, r = 200) {
  await je;
  const i = await br();
  return new Promise((n, o) => {
    const s = i.transaction("messages", "readonly"), a = [e, -Number.MAX_VALUE, ""], c = t ? [e, t.timestamp, t.id] : [e, Number.MAX_VALUE, "￿"], u = IDBKeyRange.bound(a, c, !1, !!t), f = s.objectStore("messages").index("timeline").openCursor(u, "prev"), h = [];
    f.onerror = () => o(f.error), s.onabort = () => o(s.error), f.onsuccess = () => {
      const m = f.result;
      if (!m || h.length >= r) {
        n(h.reverse());
        return;
      }
      const g = Rt(m.value.message);
      g && h.push(g), m.continue();
    };
  });
}
async function Fa(e) {
  const t = /* @__PURE__ */ new Map();
  let r;
  for (; ; ) {
    const i = await tn(e, r, 500);
    for (const n of i) t.set(n.id, n);
    if (i.length < 500) break;
    r = i[0];
  }
  for (const i of pe.values()) i.scope === e && t.set(i.id, i.message);
  return [...t.values()].sort((i, n) => i.timestamp - n.timestamp || i.id.localeCompare(n.id));
}
function qa(e) {
  return [...pe.values()].filter((t) => t.scope === e).map((t) => t.message);
}
function cr(e) {
  const t = Mt(e);
  return t && t.length <= 1e3 && !/\/noface\.(jpg|png)(?:[?#]|$)/i.test(t) ? t : "";
}
function Sr(e, t = "") {
  const r = cr(e) || cr(t);
  return r || (e && e.length <= 8 && !/[:/]/.test(e) ? e : "🦫");
}
const Ar = "lw_chat_server_url", rn = "lw_chat_user_id", Er = "lw_chat_user_name", Cr = "lw_chat_user_avatar", de = "lw_chat_groups", nn = "lw_chat_current_group", Bo = "lw_chat_rooms", jo = "lw_chat_friends", on = "lw_chat_friend_requests_v1", Zt = "lw_chat_current_room", sn = "";
function ue(e, t) {
  try {
    if (typeof localStorage < "u") {
      const r = localStorage.getItem(e);
      if (e === Ar && r && localStorage.getItem("lw_chat_server_explicit") !== "true" && (r.includes("sslip.io") || r.includes("your-domain.com")))
        return localStorage.removeItem(e), t;
      if (r !== null) return r;
    }
  } catch {
  }
  return t;
}
function N(e, t) {
  try {
    typeof localStorage < "u" && localStorage.setItem(e, t);
  } catch {
  }
}
function mt(e, t) {
  try {
    if (typeof localStorage < "u") {
      const r = localStorage.getItem(e);
      if (r) return JSON.parse(r);
    }
  } catch {
  }
  return t;
}
const Wo = [
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
], Vo = [
  { id: "main", name: "自习室大厅", icon: "🏠" },
  { id: "dev", name: "代码与摸鱼", icon: "💻" },
  { id: "music", name: "音乐咖啡馆", icon: "🎵" }
];
function Fo() {
  const e = ["摸鱼", "冲浪", "喝茶", "听歌", "看番", "敲代码", "发呆", "漫游"], t = ["海狸", "企鹅", "猫猫", "柴犬", "仓鼠", "水獭", "考拉", "熊猫"], r = e[Math.floor(Math.random() * e.length)], i = t[Math.floor(Math.random() * t.length)], n = Math.floor(1e3 + Math.random() * 9e3);
  return `${r}的${i}#${n}`;
}
function qo() {
  const e = ["🦫", "🐧", "🐱", "🐶", "🐹", "🦦", "🐨", "🐼", "🦊", "🐰"];
  return e[Math.floor(Math.random() * e.length)];
}
const an = ue(rn, ""), ii = an || `u_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`;
an || N(rn, ii);
const lr = ue(Er, ""), Ho = !lr || lr.includes("#"), Ei = se.userName && se.userName !== "哔哩哔哩用户" && se.userName !== "浏览器指纹与环境" ? se.userName : "", cn = Ho && Ei ? Ei : lr || Fo();
lr || N(Er, cn);
const Ye = ue(Cr, ""), Go = !Ye || Ye.length <= 4 || Ye.startsWith("data:") || Ye.includes("/noface."), Ci = cr(se.avatarUrl), ln = Go && Ci ? Ci : Ye || qo();
Ye || N(Cr, ln);
const d = F({
  visible: !1,
  shareActivity: ue("lw_chat_share_activity", "true") !== "false",
  error: "",
  connected: !1,
  connecting: !1,
  onlineCount: 1,
  serverUrl: ue(Ar, sn),
  currentGroupId: ue(nn, "hub_main"),
  currentChannelId: "general",
  groups: mt(de, Wo),
  groupMembers: [],
  currentRoomId: ue(Zt, "main"),
  rooms: mt(Bo, Vo),
  friends: mt(jo, []),
  friendRequests: mt(on, []),
  currentUser: {
    uid: ii,
    name: cn,
    avatar: ln
  },
  messages: Ct(ue(Zt, "main")).length > 0 ? Ct(ue(Zt, "main")) : [
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
Jo();
_e(
  () => [se.avatarUrl, se.userName],
  ([e, t]) => {
    const r = d.currentUser.avatar;
    cr(e) && (!r || r.length <= 4 || r.startsWith("data:") || r.includes("/noface.") || /^https?:\/\/[^/]*hdslb\.com\//i.test(r)) && (d.currentUser.avatar = e, N(Cr, e)), t && t !== "哔哩哔哩用户" && t !== "浏览器指纹与环境" && (!d.currentUser.name || d.currentUser.name.includes("#") || d.currentUser.name.startsWith("摸鱼")) && (d.currentUser.name = t, N(Er, t));
  },
  { immediate: !0 }
);
const ki = F({ scope: "", ready: !1 });
let Ht = 0;
_e(
  () => ri(d.currentUser.uid, d.serverUrl, d.currentRoomId),
  async (e) => {
    const t = ++Ht;
    Object.assign(ki, { scope: e, ready: !1 });
    const { currentRoomId: r, serverUrl: i, currentUser: n } = d, o = Ct(r, i, n.uid);
    await vr(e, o);
    try {
      const s = await tn(e);
      if (t !== Ht) return;
      const a = new Map(s.map((c) => [c.id, c]));
      for (const c of d.messages) c.id !== "sys-welcome" && a.set(c.id, c);
      d.messages = [...a.values()].sort((c, u) => c.timestamp - u.timestamp || c.id.localeCompare(u.id)).slice(-200);
    } catch {
      t === Ht && (Et.value = "无法读取历史数据库，现有缓存未删除，请导出备份后检查浏览器存储。");
    } finally {
      t === Ht && (ki.ready = !0);
    }
  },
  { immediate: !0 }
);
function Ha(e, t) {
  d.currentUser.name = e.trim() || d.currentUser.name, d.currentUser.avatar = t.trim() || d.currentUser.avatar, N(Er, d.currentUser.name), N(Cr, d.currentUser.avatar);
}
function Ko(e, t, r) {
  return "lw_chat_history_v2_" + JSON.stringify([r, t, e]);
}
function Ct(e, t = ue(Ar, sn), r = ii) {
  try {
    const i = localStorage.getItem(Ko(e, t, r));
    if (i) {
      const n = JSON.parse(i);
      if (Array.isArray(n)) return n.map(Rt).filter((o) => !!o).slice(-200);
    }
  } catch {
  }
  return [];
}
function zo(e, t) {
  const r = ri(d.currentUser.uid, d.serverUrl, e);
  vr(r, t);
}
function un(e, t) {
  if (!e) return "";
  const r = new URL(wr(e));
  return r.searchParams.set("room", t), r.href;
}
function Hr(e, t = !0, r = !1) {
  if (t && Et.value && ti.value > 0)
    return d.error = "仍有未保存消息，请先重试保存或导出备份，暂不切换房间", !1;
  try {
    e.endpoint = wr(e.endpoint), localStorage.setItem("lw_chat_session_v1", JSON.stringify(e));
  } catch {
    return d.error = "会话保存失败或地址无效，未切换房间", !1;
  }
  const i = e.endpoint !== d.serverUrl || e.roomId !== d.currentRoomId;
  return i && t && zo(d.currentRoomId, d.messages), Object.assign(d, {
    currentGroupId: e.groupId,
    currentChannelId: e.channelId,
    currentRoomId: e.roomId,
    serverUrl: e.endpoint
  }), i && (d.messages = Ct(e.roomId, e.endpoint, d.currentUser.uid), d.userActivities = {}, d.unreadCount = 0, r || (d.connected = !1, d.connecting = !1), d.onlineCount = 0), N(Ar, e.endpoint), N(Zt, e.roomId), N(nn, e.groupId), !0;
}
function Ot(e, t = "local", r = !1) {
  let i, n = t;
  try {
    if (i = wr(e), i) {
      const a = new URL(i);
      if (n = a.searchParams.get("room") || "default", !n || n.length > 160) throw new Error();
      a.searchParams.set("room", n), i = a.href;
    }
  } catch {
    return d.error = "房间地址无效，未切换会话", !1;
  }
  for (const a of d.groups)
    for (const c of a.channels)
      if ((c.endpoint ?? un(a.endpoint ?? "", `${a.id}__${c.id}`)) === i && (i || c.id === n))
        return Hr({ groupId: a.id, channelId: c.id, roomId: n, endpoint: i }, !0, r);
  const o = "joined_" + crypto.randomUUID(), s = {
    id: o,
    name: i ? "受邀房间" : "本地房间",
    icon: "💬",
    endpoint: i,
    isCustom: !0,
    channels: [{ id: n, name: n, icon: "💬", endpoint: i }]
  };
  return d.groups.push(s), Hr({ groupId: o, channelId: n, roomId: n, endpoint: i }, !0, r) ? (N(de, JSON.stringify(d.groups)), !0) : (d.groups.pop(), !1);
}
function Jo() {
  for (const t of d.groups) t.endpoint ??= d.serverUrl;
  const e = mt("lw_chat_session_v1", null);
  if (e && typeof e.endpoint == "string" && typeof e.roomId == "string") {
    const t = d.groups.find((i) => i.id === e.groupId), r = t?.channels.find((i) => i.id === e.channelId);
    if (t && r)
      try {
        const i = wr(e.endpoint), n = i ? new URL(i).searchParams.get("room") || "default" : e.roomId;
        r.endpoint = i, Object.assign(d, {
          currentGroupId: t.id,
          currentChannelId: r.id,
          currentRoomId: n,
          serverUrl: i,
          messages: Ct(n, i, d.currentUser.uid)
        }), N(de, JSON.stringify(d.groups));
        return;
      } catch {
      }
  }
  Ot(d.serverUrl, d.currentRoomId), N(de, JSON.stringify(d.groups));
}
function Ga(e) {
  d.friendRequests = d.friendRequests.filter((t) => t.id !== e), N(on, JSON.stringify(d.friendRequests));
}
function kr(e, t) {
  const r = d.groups.find((s) => s.id === e), i = r?.channels.find((s) => s.id === t) || r?.channels[0];
  if (!r || !i) return !1;
  const n = i.endpoint !== void 0 ? i.endpoint ? new URL(i.endpoint).searchParams.get("room") || "default" : i.id : `${r.id}__${i.id}`, o = i.endpoint ?? un(r.endpoint ?? "", n);
  return Hr({ groupId: r.id, channelId: i.id, roomId: n, endpoint: o });
}
function Ka(e, t = "👥") {
  const r = e.trim() || "新群组", i = "group_" + Math.random().toString(36).slice(2, 8), n = {
    id: i,
    name: r,
    icon: t,
    channels: [
      { id: "general", name: "综合讨论", icon: "💬" },
      { id: "music", name: "音乐分享", icon: "🎵" },
      { id: "bili", name: "B站动态", icon: "📺" }
    ],
    endpoint: d.serverUrl,
    isCustom: !0
  };
  return d.groups.push(n), N(de, JSON.stringify(d.groups)), kr(i, "general"), n;
}
function za(e) {
  if (d.groups.length <= 1) return;
  const t = d.groups.filter((r) => r.id !== e);
  if (d.currentGroupId === e) {
    const r = t[0];
    if (!r || !kr(r.id, r.channels[0]?.id || "general")) return;
  }
  d.groups = t, N(de, JSON.stringify(d.groups));
}
function Ja(e, t = "💬") {
  const r = d.groups.find((n) => n.id === d.currentGroupId);
  if (!r) return;
  const i = "ch_" + Math.random().toString(36).slice(2, 6);
  r.channels.push({ id: i, name: e.trim() || "新频道", icon: t }), N(de, JSON.stringify(d.groups)), kr(r.id, i);
}
function Qa(e, t, r) {
  const i = d.groups.find((n) => n.id === e);
  i && (i.name = t.trim() || i.name, r && (i.icon = r), N(de, JSON.stringify(d.groups)));
}
function Ya(e, t, r, i) {
  const n = d.groups.find((s) => s.id === e);
  if (!n) return;
  const o = n.channels.find((s) => s.id === t);
  o && (o.name = r.trim() || o.name, i && (o.icon = i), N(de, JSON.stringify(d.groups)));
}
function Za(e, t) {
  const r = d.groups.find((n) => n.id === e);
  if (!r || r.channels.length <= 1) return;
  const i = r.channels.filter((n) => n.id !== t);
  d.currentGroupId === e && d.currentChannelId === t && (!i[0] || !kr(e, i[0].id)) || (r.channels = i, N(de, JSON.stringify(d.groups)));
}
const T = (e) => JSON.stringify([e.origin, e.room, e.uid]);
function kt(e) {
  return typeof e == "string" && /^[A-Za-z0-9_-]{43}$/.test(e);
}
function xt(e) {
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
const ni = "lw_private_chat_v1", v = F({ room: null, diagnostic: "" });
function oi() {
  let e = null, t = "";
  try {
    const r = localStorage.getItem(ni);
    if (r === null) t = "当前浏览器配置中没有保存聊天室连接。请确认使用的是原来的浏览器用户和插件，或重新导入自己的邀请。";
    else
      try {
        e = xt(JSON.parse(r));
      } catch {
        t = "已保存的聊天室配置无效或使用了公网 HTTP，原记录和凭证未删除。请先配置 HTTPS，再按部署指南重新导入匹配当前聊天 ID 的邀请。";
      }
  } catch {
    t = "无法读取本机存储，请检查浏览器是否限制存储访问。";
  }
  v.diagnostic = t, JSON.stringify(e) !== JSON.stringify(v.room) && (v.room = e);
}
oi();
window.addEventListener("storage", (e) => {
  (e.key === ni || e.key === null) && oi();
});
window.addEventListener("focus", oi);
const Qo = ke(() => !!v.room);
function dn(e) {
  return e.origin.replace(/^http:/, "ws:").replace(/^https:/, "wss:") + "/ws?room=" + encodeURIComponent(e.room);
}
function Yo(e) {
  const t = xt(e);
  localStorage.setItem(ni, JSON.stringify(t)), v.diagnostic = "", v.room = t;
}
const si = ye(0), z = ye(""), ai = /* @__PURE__ */ new Map();
let Rr;
function ot() {
  return Rr ||= new Promise((e, t) => {
    const r = indexedDB.open("lw-chat-delivery", 1);
    r.onupgradeneeded = () => {
      r.result.createObjectStore("deliveries", { keyPath: ["scope", "id", "uid"] }).createIndex("scope", "scope");
    }, r.onsuccess = () => {
      r.result.onversionchange = () => {
        r.result.close(), Rr = void 0;
      }, e(r.result);
    }, r.onerror = () => t(r.error), r.onblocked = () => {
      z.value = "发送队列被旧窗口阻塞，请关闭旧窗口后重试。";
    };
  }).catch((e) => {
    throw Rr = void 0, e;
  });
}
async function Zo(e) {
  const t = await ot();
  return new Promise((r, i) => {
    const n = t.transaction("deliveries", "readonly"), o = n.objectStore("deliveries").index("scope").getAll(e);
    n.oncomplete = () => r(o.result), n.onabort = () => i(n.error), o.onerror = () => i(o.error);
  });
}
let Ii = Promise.resolve();
function Nt(e) {
  const t = Ii.then(e);
  return Ii = t.catch(() => {
  }), t;
}
async function st(e) {
  try {
    const t = /* @__PURE__ */ new Map();
    for (const r of await Zo(e)) {
      const i = t.get(r.id) || [];
      i.push(r), t.set(r.id, i);
    }
    ai.set(e, t), si.value++;
  } catch {
    z.value = "无法读取发送确认记录，请检查浏览器存储。";
  }
}
function Xo(e, t) {
  si.value;
  const r = ai.get(e)?.get(t) || [];
  if (!r.length) return "none";
  const i = r.filter((n) => !n.received);
  return i.length ? i.some((n) => n.failure === "rejected" || n.failure === "paused" || n.attempts >= 5 && (n.failure === "unconfirmed" || Date.now() - n.lastAttempt > 15e3)) ? "failed" : "sending" : "stored";
}
function Xa(e, t) {
  si.value;
  const r = ai.get(e)?.get(t) || [];
  if (!r.length) return "无送达确认";
  const i = r.filter((o) => o.received).length;
  return i === r.length ? r.every((o) => o.uid === "private-relay-server") ? "服务器已保存（不代表对方已读）" : `对方已接收 ${i}/${r.length}（非已读）` : r.filter((o) => !o.received).some((o) => o.failure === "rejected") ? "服务器拒绝此次发送，可在消息详情中重试；不代表此前尝试一定未保存" : Xo(e, t) === "failed" ? "尚未获得保存确认，自动补发已暂停；不代表一定未送达，可在消息详情中重试" : "正在发送／等待保存确认，将按原目标房间补发；请勿重复发送";
}
async function fn(e, t, r) {
  await Nt(async () => {
    const i = await ot();
    await new Promise((n, o) => {
      const s = i.transaction("deliveries", "readwrite"), a = s.objectStore("deliveries");
      for (const c of new Set(r)) {
        const u = a.get([e, t.id, c]);
        u.onsuccess = () => {
          if (u.result?.received) return;
          const f = { scope: e, id: t.id, uid: c, message: JSON.parse(JSON.stringify(t)), attempts: 0, lastAttempt: 0, received: !1 };
          a.put(f);
        };
      }
      s.oncomplete = () => n(), s.onabort = () => o(s.error), s.onerror = () => o(s.error);
    }), await st(e);
  });
}
async function ec(e, t) {
  try {
    await Nt(async () => {
      const r = await ot();
      await new Promise((i, n) => {
        const o = r.transaction("deliveries", "readwrite"), s = o.objectStore("deliveries").index("scope").openCursor(e);
        s.onsuccess = () => {
          const a = s.result;
          if (!a) return;
          const c = a.value;
          c.id === t && !c.received && a.update({ ...c, attempts: 5, failure: "paused" }), a.continue();
        }, o.oncomplete = () => i(), o.onabort = () => n(o.error), o.onerror = () => n(o.error);
      }), await st(e);
    });
  } catch {
    z.value = "暂停补发未能保存，请检查存储；已发出的消息无法撤回。";
  }
}
async function es(e, t, r) {
  return mn(e, [t], r);
}
async function mn(e, t, r) {
  t.length && await Nt(async () => {
    const i = await ot();
    await new Promise((n, o) => {
      const s = i.transaction("deliveries", "readwrite"), a = s.objectStore("deliveries");
      for (const c of new Set(t)) {
        const u = a.get([e, c, r]);
        u.onsuccess = () => {
          u.result && a.put({ ...u.result, received: !0, failure: void 0, message: void 0 });
        };
      }
      s.oncomplete = () => n(), s.onabort = () => o(s.error), s.onerror = () => o(s.error);
    }), await st(e);
  });
}
async function _i(e, t, r, i = !1, n, o = !1) {
  await Nt(async () => {
    const s = await ot();
    await new Promise((a, c) => {
      const u = s.transaction("deliveries", "readwrite"), f = u.objectStore("deliveries"), h = f.get([e, t, r]);
      h.onsuccess = () => {
        const m = h.result;
        m && !m.received && (n === void 0 || m.lastAttempt === n) && f.put({
          ...m,
          attempts: i || o ? 5 : m.attempts,
          failure: o ? "paused" : i ? "rejected" : m.failure === "paused" ? "paused" : "unconfirmed"
        });
      }, u.oncomplete = () => a(), u.onerror = u.onabort = () => c(u.error);
    }), await st(e);
  });
}
async function ts(e, t, r, i, n = 4, o = () => !0) {
  await Nt(async () => {
    const s = await ot(), a = [];
    await new Promise((c, u) => {
      const f = s.transaction("deliveries", "readwrite"), h = f.objectStore("deliveries").index("scope").openCursor(e);
      h.onsuccess = () => {
        const m = h.result;
        if (!m || a.length >= n || !r()) return;
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
      }, f.oncomplete = () => c(), f.onabort = () => u(f.error), f.onerror = () => u(f.error);
    });
    for (const c of a) r() && i(c.uid, c.message, c.lastAttempt);
    await st(e);
  });
}
function Ee(e, t) {
  const r = new AbortController(), i = () => r.abort(e?.reason);
  e?.aborted ? i() : e?.addEventListener("abort", i, { once: !0 });
  const n = setTimeout(() => r.abort(new DOMException("视频加载超时，请手动重试", "TimeoutError")), t);
  return { signal: r.signal, dispose() {
    clearTimeout(n), e?.removeEventListener("abort", i), r.abort();
  } };
}
class rs {
  start() {
    return this.cancel(), this.controller = new AbortController(), this.controller.signal;
  }
  cancel() {
    this.controller?.abort();
  }
}
function Or(e) {
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
function is(e) {
  function t(g, w) {
    return g << w | g >>> 32 - w;
  }
  const r = [7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21], i = new Array(64).fill(0).map((g, w) => Math.floor(Math.abs(Math.sin(w + 1)) * 2 ** 32)), n = new TextEncoder().encode(e), o = n.length * 8, s = new Uint8Array((Math.floor((n.length + 8) / 64) + 1) * 64);
  s.set(n), s[n.length] = 128;
  const a = new DataView(s.buffer);
  a.setUint32(s.length - 8, o >>> 0, !0), a.setUint32(s.length - 4, Math.floor(o / 4294967296), !0);
  let c = 1732584193, u = 4023233417, f = 2562383102, h = 271733878;
  for (let g = 0; g < s.length; g += 64) {
    const w = new Array(16);
    for (let I = 0; I < 16; I++) w[I] = a.getUint32(g + I * 4, !0);
    let b = c, S = u, y = f, C = h;
    for (let I = 0; I < 64; I++) {
      let q, O;
      I < 16 ? (q = S & y | ~S & C, O = I) : I < 32 ? (q = C & S | ~C & y, O = (5 * I + 1) % 16) : I < 48 ? (q = S ^ y ^ C, O = (3 * I + 5) % 16) : (q = y ^ (S | ~C), O = 7 * I % 16);
      const B = q + b + i[I] + w[O] >>> 0;
      b = C, C = y, y = S, S = S + t(B, r[I]) >>> 0;
    }
    c = c + b >>> 0, u = u + S >>> 0, f = f + y >>> 0, h = h + C >>> 0;
  }
  function m(g) {
    let w = "";
    for (let b = 0; b < 4; b++) w += (g >>> b * 8 & 255).toString(16).padStart(2, "0");
    return w;
  }
  return m(c) + m(u) + m(f) + m(h);
}
const ns = [
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
function xr(e, t, r) {
  const i = ns.map((u) => (t + r)[u]).join("").slice(0, 32), n = Math.round(Date.now() / 1e3), o = { ...e, wts: n }, a = Object.keys(o).sort().map((u) => encodeURIComponent(u) + "=" + encodeURIComponent(String(o[u]).replace(/[!'()*]/g, ""))).join("&"), c = is(a + i);
  return {
    signedQuery: `${a}&w_rid=${c}`,
    w_rid: c,
    wts: n
  };
}
function Ti(e) {
  const t = Number(e);
  return t >= 120 ? "4K" : t === 116 ? "1080P60" : t === 112 ? "1080P+" : t === 80 ? "1080P" : t === 74 ? "720P60" : t === 64 ? "720P" : t === 32 ? "480P" : t === 16 ? "360P" : t > 0 ? `${t}P` : "清晰度";
}
function tc(e, t = "") {
  if (t && typeof t == "string" && t.trim()) return t.trim();
  const r = Number(e);
  return r >= 120 ? "超清 4K" : r === 116 ? "高清 1080P 60帧" : r === 112 ? "高清 1080P+ 高码率" : r === 80 ? "高清 1080P" : r === 74 ? "高码率 720P 60帧" : r === 64 ? "高清 720P" : r === 32 ? "清晰 480P" : r === 16 ? "流畅 360P" : `${r}P`;
}
class De {
  constructor() {
  }
  static getInstance() {
    return De.instance || (De.instance = new De()), De.instance;
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
    const i = this.findParent(t, r) || t, n = (i.children || []).findIndex((s) => String(s.id) === String(r));
    if (n < 0) return !1;
    const o = i.children[n];
    return i.children.splice(n, 1, ...o.children || []), !0;
  }
  moveNode(t, r, i, n, o) {
    let s = this.findNode(t, r);
    s || (s = { id: String(r), type: "fav", name: o || "收藏夹", children: [] });
    const a = String(i) === "root" ? t : this.findNode(t, i);
    if (!s || !a || s === a || s.type === "folder" && this.isDescendant(s, a.id))
      return !1;
    if (this.removeNodeById(t, s.id), a === t || n === "into" && a.type === "folder")
      Array.isArray(a.children) || (a.children = []), a.children.push(s);
    else {
      const c = this.findParent(t, a.id) || t;
      Array.isArray(c.children) || (c.children = []);
      const u = Math.max(0, c.children.findIndex((f) => String(f.id) === String(a.id)));
      c.children.splice(u + (n === "after" ? 1 : 0), 0, s);
    }
    return !0;
  }
  syncTreeWithFolders(t, r) {
    let i = !1;
    const n = /* @__PURE__ */ new Map();
    for (const c of r)
      n.set(String(c.id || c.fid), c);
    const o = (c) => {
      if (c.children)
        for (let u = c.children.length - 1; u >= 0; u--) {
          const f = c.children[u];
          if (f.type === "fav")
            if (!n.has(String(f.id)))
              c.children.splice(u, 1), i = !0;
            else {
              const h = n.get(String(f.id));
              h?.title && f.name !== h.title && (f.name = h.title, i = !0);
            }
          else
            o(f);
        }
    };
    o(t);
    const s = /* @__PURE__ */ new Set(), a = (c) => {
      for (const u of c.children || [])
        u.type === "fav" ? s.add(String(u.id)) : a(u);
    };
    a(t), t.children || (t.children = []);
    for (const c of r) {
      const u = String(c.id || c.fid);
      s.has(u) || (t.children.push({
        id: u,
        type: "fav",
        name: c.title || "未命名收藏夹",
        children: []
      }), i = !0);
    }
    return i;
  }
  flattenTree(t, r, i, n) {
    const o = new Map((r || []).map((f) => [String(f.id || f.fid), f])), s = [], a = /* @__PURE__ */ new Set(), c = (f) => (f.children || []).reduce(
      (h, m) => h + (m.type === "fav" ? 1 : c(m)),
      0
    ), u = (f, h = 0) => {
      for (const m of f.children || []) {
        const g = String(m.id), w = o.get(g), b = m.type === "folder";
        b || a.add(g);
        const S = b && i.has(g), y = !b && g === String(n);
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
    for (const f of r || []) {
      const h = String(f.id || f.fid);
      s.some((m) => !m.group && m.id === h) || !f.isCollected && !f.isOther && a.has(h) || s.push({
        id: h,
        title: f.title || "未命名收藏",
        count: Number(f.media_count || 0),
        kind: f.isCollected ? "collected" : f.isOther ? "other" : "created",
        depth: 0,
        group: !1,
        collapsed: !1,
        selected: h === String(n),
        writable: !f.isCollected && !f.isOther
      });
    }
    return s;
  }
}
class Ze {
  constructor() {
    this.currentUser = null, this.writeQueue = Promise.resolve(), this.lastWriteTime = 0, this.wbiKeysCache = null, this.treeManager = De.getInstance();
  }
  static getInstance() {
    return Ze.instance || (Ze.instance = new Ze()), Ze.instance;
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
      const o = Date.now() - this.lastWriteTime;
      o < r && await new Promise((s) => setTimeout(s, r - o));
      try {
        const s = await t();
        return this.lastWriteTime = Date.now(), s;
      } catch (s) {
        throw this.lastWriteTime = Date.now(), s;
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
    const o = await this.api(
      `https://api.bilibili.com/x/v3/fav/folder/collected/list?pn=${t}&ps=${r}&up_mid=${n || ""}&platform=web`
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
  async getWatchHistory(t = 1, r = 24) {
    const i = await this.api(`https://api.bilibili.com/x/v2/history?pn=${t}&ps=${r}`), o = (Array.isArray(i) ? i : i?.list || []).map((s) => ({
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
    return { medias: o, total: Number(i?.total || o.length) };
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
    const o = await this.api(
      `https://api.bilibili.com/x/space/bangumi/follow/list?type=1&follow_status=0&pn=${t}&ps=${r}&vmid=${n || ""}`
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
  async getSeasonVideos(t, r = 1, i = 24) {
    const n = await this.api(
      `https://api.bilibili.com/x/space/fav/season/list?season_id=${t}&pn=${r}&ps=${i}&platform=web`
    ), o = n?.medias || [];
    return {
      medias: o,
      total: Number(n?.info?.media_count || o.length)
    };
  }
  /**
   * 统一分页获取视频资源列表 (自动适配自建/合集/稍后再看/追番)
   */
  async getFolderVideos(t, r = 1, i = 20, n = "mtime", o = "") {
    const s = String(t);
    if (s === "__history__") {
      const m = await this.getWatchHistory(r, i);
      let g = m.medias;
      if (o.trim()) {
        const w = o.toLowerCase();
        g = g.filter((b) => b.title.toLowerCase().includes(w) || b.upper?.name && b.upper.name.toLowerCase().includes(w));
      }
      return {
        info: { title: "播放历史", media_count: m.total },
        medias: g,
        hasMore: r * i < m.total,
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
        medias: g.slice((r - 1) * i, r * i),
        hasMore: r * i < g.length,
        total: g.length
      };
    }
    if (s === "__bangumi__") {
      const m = await this.getBangumiFollows(r, i);
      return {
        info: { title: "我的追番", media_count: m.total },
        medias: m.medias,
        hasMore: r * i < m.total,
        total: m.total
      };
    }
    if (s.startsWith("season:")) {
      const m = s.replace("season:", ""), g = await this.getSeasonVideos(m, r, i);
      return {
        info: { title: "合集内容", media_count: g.total },
        medias: g.medias,
        hasMore: r * i < g.total,
        total: g.total
      };
    }
    let a = `https://api.bilibili.com/x/v3/fav/resource/list?media_id=${t}&pn=${r}&ps=${i}&order=${n}&platform=web`;
    o.trim() && (a += `&keyword=${encodeURIComponent(o.trim())}`);
    const c = await this.api(a), u = c?.medias || [], f = !!c?.has_more, h = Number(c?.info?.media_count || u.length);
    return {
      info: c?.info,
      medias: u,
      hasMore: f,
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
      const n = new URLSearchParams({ title: t, intro: "", privacy: String(r === 0 ? 0 : 1), csrf: i }), o = await fetch("https://api.bilibili.com/x/v3/fav/folder/add", {
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
  async moveVideo(t, r, i, n) {
    return this.enqueueWrite(async () => {
      const o = await this.getBiliJct();
      if (!o) return { ok: !1, reason: "取不到 csrf（bili_jct）" };
      try {
        const s = Array.isArray(i) ? i.map((f) => String(f).includes(":") ? String(f) : `${f}:2`).join(",") : String(i).includes(":") ? String(i) : `${i}:2`, a = new URLSearchParams({
          src_media_id: String(t),
          tar_media_id: String(r),
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
  async deleteVideo(t, r, i = 2) {
    return this.enqueueWrite(async () => {
      let n = 0;
      for (; ; ) {
        n++;
        const o = await this.getBiliJct();
        if (!o) return { ok: !1, reason: "取不到 csrf（bili_jct）" };
        try {
          const s = new URLSearchParams({
            csrf: o,
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
            body: s.toString()
          })).json();
          if (c.code === 0) return { ok: !0 };
          if ((c.code === 11007 || c.code === -412 || /频繁|稍后|频率/.test(c.message || "")) && n <= i) {
            await new Promise((f) => setTimeout(f, 850 * n));
            continue;
          }
          return { ok: !1, code: c.code, reason: this.formatBiliApiError(c.code, c.message) };
        } catch (s) {
          if (n <= i) {
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
    const n = i?.wbi_img?.img_url?.split("/").pop()?.split(".")[0] || "", o = i?.wbi_img?.sub_url?.split("/").pop()?.split(".")[0] || "";
    if (!n || !o)
      throw new Error("无法获取 B 站 WBI 鉴权密钥");
    return this.wbiKeysCache = { ik: n, sk: o, expire: r + 3600 * 1e3 }, { ik: n, sk: o };
  }
  /**
   * 获取指定清晰度的视频/音频直链播放流 (支持逐级清晰度自动降阶重试与 WBI 签名直链备用获取)
   */
  async fetchPlayStream(t, r, i = 64, n) {
    const o = Ee(n, 18e3), s = o.signal, a = async (u) => {
      s.throwIfAborted();
      const f = Ee(s, 5e3);
      try {
        return await this.api(u, { signal: f.signal });
      } finally {
        f.dispose();
      }
    }, c = (u) => {
      if (s.throwIfAborted(), [401, 403, 412, 429].includes(u?.status) || [-101, -111, -352, -412].includes(u?.code) || u?.name === "TimeoutError" || u?.name === "AbortError" || u instanceof TypeError) throw u;
    };
    try {
      s.throwIfAborted();
      const u = Array.from(/* @__PURE__ */ new Set([i, 64, 32, 16]));
      let f = null, h = [], m = i;
      const g = (w) => {
        if (!w) return [];
        const b = Array.isArray(w.durl) ? w.durl : Array.isArray(w.result?.durl) ? w.result.durl : [], S = [];
        for (const y of b.slice(0, 1))
          if (y?.url && S.push(String(y.url)), Array.isArray(y?.backup_url))
            for (const C of y.backup_url)
              C && S.push(String(C));
        return Array.from(new Set(S.filter(Boolean).map((y) => y.replace(/^http:/, "https:")))).filter((y) => {
          try {
            const C = new URL(y);
            return C.protocol === "https:" && !C.username && !C.password;
          } catch {
            return !1;
          }
        });
      };
      for (const w of u)
        try {
          const b = t ? `bvid=${encodeURIComponent(t)}` : "", S = await a(
            `https://api.bilibili.com/x/player/playurl?${b}&cid=${r}&qn=${w}&fnval=1&fourk=0&platform=html5&high_quality=1`
          ), y = g(S);
          if (y.length > 0) {
            f = S, h = y, m = Number(S?.quality || w);
            break;
          }
        } catch (b) {
          c(b);
        }
      if (!h.length)
        for (const w of Array.from(/* @__PURE__ */ new Set([i, 64, 32])))
          try {
            const b = Ee(s, 5e3);
            let S;
            try {
              S = await this.getWbiKeys(b.signal);
            } finally {
              b.dispose();
            }
            const { ik: y, sk: C } = S, I = { cid: r, qn: w, fnval: 1, fourk: 0 };
            t && (I.bvid = t);
            const { signedQuery: q } = xr(I, y, C), O = await a(
              `https://api.bilibili.com/x/player/wbi/playurl?${q}`
            ), B = g(O);
            if (B.length > 0) {
              f = O, h = B, m = Number(O?.quality || w);
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
        acceptQuality: f?.accept_quality || [80, 64, 32, 16],
        acceptDescription: f?.accept_description || ["1080P 高清", "720P 高清", "480P 清晰", "360P 流畅"]
      };
    } finally {
      o.dispose();
    }
  }
  /**
   * 获取音频流：优先提取 DASH 纯音频流 (M4A，体积仅 ~3MB，彻底消除视频冗余与限速)，若无纯音频则降级至 360P 流畅视频流 (极小体积保底)
   */
  async fetchAudioStream(t, r, i) {
    const n = Ee(i, 18e3), o = n.signal, s = async (u) => {
      o.throwIfAborted();
      const f = Ee(o, 5e3);
      try {
        return await this.api(u, { signal: f.signal });
      } finally {
        f.dispose();
      }
    }, a = (u) => {
      if (o.throwIfAborted(), [401, 403, 412, 429].includes(u?.status) || [-101, -111, -352, -412].includes(u?.code) || u?.name === "TimeoutError" || u?.name === "AbortError" || u instanceof TypeError) throw u;
    }, c = (u) => {
      const f = u?.dash || u?.result?.dash, h = Array.isArray(f?.audio) ? f.audio : [];
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
        const f = t ? `bvid=${encodeURIComponent(t)}` : "", h = await s(
          `https://api.bilibili.com/x/player/playurl?${f}&cid=${r}&qn=16&fnval=16&fourk=0&platform=html5`
        ), m = c(h);
        if (m.length > 0)
          return { sources: m, isPureAudio: !0 };
      } catch (f) {
        a(f);
      }
      try {
        const f = Ee(o, 5e3);
        let h;
        try {
          h = await this.getWbiKeys(f.signal);
        } finally {
          f.dispose();
        }
        const { ik: m, sk: g } = h, w = { cid: r, qn: 16, fnval: 16, fourk: 0 };
        t && (w.bvid = t);
        const { signedQuery: b } = xr(w, m, g), S = await s(`https://api.bilibili.com/x/player/wbi/playurl?${b}`), y = c(S);
        if (y.length > 0)
          return { sources: y, isPureAudio: !0 };
      } catch (f) {
        a(f);
      }
      return { sources: (await this.fetchPlayStream(t, r, 16, o)).sources, isPureAudio: !1 };
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
    const n = String(t.bvid || "").trim(), o = String(t.aid || "").trim(), s = n.startsWith("BV") ? n : "", a = o.replace(/^av/i, "") || (n.startsWith("BV") ? "" : n.replace(/^av/i, "")), c = s ? `bvid=${encodeURIComponent(s)}` : `aid=${encodeURIComponent(a)}`, u = Ee(i, 2e4), f = u.signal;
    try {
      f.throwIfAborted();
      const h = t.cid && s && r === 1 ? this.fetchPlayStream(s, t.cid, Number(t.preferredQuality || 64), f).then((P) => ({ value: P, error: null }), (P) => ({ value: null, error: P })) : null;
      let m = null;
      try {
        const P = Ee(f, 6e3);
        try {
          m = await this.api(`https://api.bilibili.com/x/web-interface/view?${c}`, { signal: P.signal });
        } finally {
          P.dispose();
        }
      } catch {
        f.throwIfAborted();
      }
      const g = m?.bvid || "", w = g.startsWith("BV") ? g : s || "", S = (Array.isArray(m?.pages) ? m.pages : []).map((P) => ({
        cid: P.cid,
        page: P.page,
        part: P.part || `第${P.page}集`,
        duration: P.duration || 0
      })), y = S.findIndex((P) => P.page === r), C = y >= 0 ? S[y] : S[0] || null, I = C?.cid || m?.cid || t.cid;
      if (!I)
        throw new Error("无法获取视频 CID 标识");
      const q = Number(t.preferredQuality || 64), O = h && String(I) === String(t.cid) ? await h : null;
      f.throwIfAborted();
      const B = O && String(I) === String(t.cid) ? O.value || (() => {
        throw O.error;
      })() : await this.fetchPlayStream(w, I, q, f);
      return {
        title: m?.title || t.title || w,
        poster: String(m?.pic || t.cover || "").replace(/^http:/, "https:"),
        sources: B.sources,
        aid: m?.aid || t.aid || null,
        bvid: w,
        cid: I || null,
        owner: m?.owner?.name || t.owner || t.author || "UP主",
        ownerFace: m?.owner?.face ? String(m.owner.face).replace(/^http:/, "https:") : t.ownerFace || t.face || "",
        ownerMid: m?.owner?.mid || null,
        pubdate: m?.pubdate || 0,
        desc: m?.desc || t.desc || "暂无简介",
        views: m?.stat?.view || t.views || 0,
        danmaku: m?.stat?.danmaku || t.danmaku || 0,
        likes: m?.stat?.like || t.likes || 0,
        currentQuality: B.quality,
        acceptQuality: B.acceptQuality,
        acceptDescription: B.acceptDescription,
        pages: S,
        currentPage: C?.page || 1,
        partTitle: C?.part || ""
      };
    } finally {
      u.dispose();
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
    const o = Array.isArray(n?.pages) ? n.pages : [], s = r ? o.find((E) => E.cid === r) : null, a = r || n.cid, c = s?.part ? ` · P${s.page} ${s.part}` : "", { ik: u, sk: f } = await this.getWbiKeys(i);
    i?.throwIfAborted();
    const { signedQuery: h } = xr({ bvid: t, cid: a }, u, f), m = await this.api(`https://api.bilibili.com/x/player/wbi/v2?${h}`, { signal: i });
    if (i?.throwIfAborted(), i && !Array.isArray(m?.subtitle?.subtitles)) throw new Error("字幕轨道返回异常或当前账号无权读取");
    const g = m?.subtitle?.subtitles || [];
    if (!g.length)
      return { ok: !1, reason: `该视频${c ? "（" + c.trim() + "）" : ""}没有可用字幕`, cues: [] };
    const w = g.find((E) => /zh|中文|汉语|漢語/i.test((E.lan || "") + " " + (E.lan_doc || ""))) || g[0], b = w.subtitle_url || "", S = b.startsWith("//") ? `https:${b}` : b.startsWith("http") ? b : `https://${b}`, y = await fetch(S, { signal: i, credentials: "include", headers: { Accept: "application/json" } });
    if (!y.ok) throw new Error(`字幕获取失败: ${y.status}`);
    const C = await y.arrayBuffer();
    i?.throwIfAborted();
    let I;
    try {
      I = JSON.parse(new TextDecoder("utf-8", { fatal: !0 }).decode(C));
    } catch {
      try {
        I = JSON.parse(new TextDecoder("gb18030").decode(C));
      } catch {
        I = JSON.parse(new TextDecoder("big5").decode(C));
      }
    }
    if (i && !Array.isArray(I?.body)) throw new Error("字幕正文格式异常");
    const O = (I?.body || []).map((E, fe) => ({
      id: `${E.from || 0}_${fe}`,
      from: Number(E.from || 0),
      to: Number(E.to || E.from || 0),
      content: String(E.content || "").trim()
    })).filter((E) => E.content), B = (n.title || t) + c, P = [];
    if (P.push("标题：" + B), P.push("字幕轨道：" + g.map((E) => E.lan_doc || E.lan || "未知").join(" / ") + "（已选：" + (w.lan_doc || w.lan || "默认") + "）"), n.owner?.name && P.push("UP主：" + n.owner.name), n.pubdate) {
      const E = new Date(n.pubdate * 1e3);
      P.push(`发布时间：${E.getFullYear()}-${String(E.getMonth() + 1).padStart(2, "0")}-${String(E.getDate()).padStart(2, "0")}`);
    }
    P.push("链接：https://www.bilibili.com/video/" + t + (s?.page ? `?p=${s.page}` : ""));
    const k = O.map((E) => E.content).join(`\r
`), j = P.join(`\r
`) + `\r
\r
———— 字幕正文 ————\r
\r
`;
    return {
      ok: !0,
      title: B,
      bodyText: k,
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
    const r = t.startsWith("//") ? `https:${t}` : t, i = await fetch(r);
    if (!i.ok) throw new Error(`字幕获取失败: ${i.statusText}`);
    return ((await i.json()).body || []).map((s) => ({
      from: Number(s.from || 0),
      to: Number(s.to || 0),
      content: String(s.content || "").trim()
    }));
  }
  /**
   * 分页获取视频评论区列表
   */
  async getVideoComments(t, r = 1, i = 20, n = 2) {
    const o = await this.api(
      `https://api.bilibili.com/x/v2/reply?type=1&oid=${t}&pn=${r}&ps=${i}&sort=${n}`
    ), s = o?.replies || [], a = o?.top || o?.upper?.top || null, c = o?.page || {}, u = Number(c.count || 0), f = (g, w = !1) => {
      const b = {};
      if (g.content?.emote && typeof g.content.emote == "object")
        for (const [y, C] of Object.entries(g.content.emote)) {
          const I = C?.url;
          typeof I == "string" && I && (b[y] = I.replace(/^http:/, "https:"));
        }
      const S = Array.isArray(g.replies) ? g.replies.map((y) => ({
        rpid: y.rpid,
        mid: Number(y.mid || 0),
        uname: String(y.member?.uname || "B站用户"),
        avatar: String(y.member?.avatar || "").replace(/^http:/, "https:"),
        message: String(y.content?.message || ""),
        timeText: new Date(Number(y.ctime || 0) * 1e3).toLocaleString(),
        like: Number(y.like || 0),
        pictures: Or(y.content?.pictures)
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
        pictures: Or(g.content?.pictures),
        emotes: b,
        replies: S
      };
    }, h = [];
    r === 1 && a && typeof a == "object" && a.rpid && h.push(f(a, !0));
    const m = a?.rpid ? String(a.rpid) : "";
    for (const g of s)
      m && String(g.rpid) === m || h.push(f(g, !1));
    return {
      comments: h,
      total: u,
      hasMore: r * i < u
    };
  }
  /**
   * 分页获取某条根评论下的子回复（楼中楼）
   */
  async getSubReplies(t, r, i = 1, n = 10) {
    const o = await this.api(
      `https://api.bilibili.com/x/v2/reply/reply?type=1&oid=${t}&root=${r}&pn=${i}&ps=${n}`
    ), s = o?.replies || [], a = o?.page || {}, c = Number(a.count || 0);
    return {
      replies: s.map((f) => {
        const h = {};
        if (f.content?.emote && typeof f.content.emote == "object")
          for (const [m, g] of Object.entries(f.content.emote)) {
            const w = g?.url;
            typeof w == "string" && w && (h[m] = w.replace(/^http:/, "https:"));
          }
        return {
          rpid: f.rpid,
          mid: Number(f.mid || 0),
          uname: String(f.member?.uname || "B站用户"),
          avatar: String(f.member?.avatar || "").replace(/^http:/, "https:"),
          message: String(f.content?.message || ""),
          timeText: new Date(Number(f.ctime || 0) * 1e3).toLocaleString(),
          like: Number(f.like || 0),
          pictures: Or(f.content?.pictures),
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
          const u = await fetch(c);
          if (u.ok && (i = await u.text(), i && i.includes("<d p=")))
            break;
        } catch {
        }
      if (!i) return [];
      const s = new DOMParser().parseFromString(i, "text/xml").querySelectorAll("d"), a = [];
      return s.forEach((c, u) => {
        const h = (c.getAttribute("p") || "").split(","), m = parseFloat(h[0]) || 0, g = parseInt(h[1], 10) || 1, w = parseInt(h[2], 10) || 25, S = `#${(parseInt(h[3], 10) || 16777215).toString(16).padStart(6, "0")}`, y = parseInt(h[4], 10) || 0, C = parseInt(h[5], 10) || 0, I = h[6] || "", q = h[7] || String(u), O = c.textContent?.trim() || "";
        if (O) {
          const B = Math.floor(m / 60), P = Math.floor(m % 60), k = `${String(B).padStart(2, "0")}:${String(P).padStart(2, "0")}`;
          a.push({
            id: q,
            time: m,
            timeStr: k,
            mode: g,
            size: w,
            color: S,
            timestamp: y,
            pool: C,
            userHash: I,
            text: O
          });
        }
      }), a.sort((c, u) => c.time - u.time), a;
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
const X = Ze.getInstance();
De.getInstance();
const Gt = new rs(), os = {
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
}, l = F({ ...os });
let ss = 1e4;
function G(e, t = !1) {
  const r = globalThis;
  typeof r.showBiliToast == "function" ? r.showBiliToast(e, 3200, { isError: t, target: { type: "bili-video", bvid: l.bvid, aid: l.aid } }) : typeof r.showWindowsToast == "function" && r.showWindowsToast({
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
let gt = "";
function Ui() {
  gt && URL.revokeObjectURL(gt), gt = "";
}
const as = {
  get state() {
    return l;
  },
  bringToFront() {
    l.zIndex = ++ss;
  },
  /**
   * 打开并播放指定视频
   */
  async openVideo(e) {
    const t = e.bvid || "", r = e.aid ? String(e.aid) : "";
    if (!t && !r) {
      G("无法播放：缺少视频标识 (BV/AV号)", !0);
      return;
    }
    this.bringToFront();
    const i = !!t && l.bvid === t || !!r && l.aid === r;
    if (l.isOpen && i && !e.cachedSourceUrl && (l.videoSrc || l.iframeSrc) && !l.errorMsg) {
      l.collapsed = !1;
      return;
    }
    const n = Gt.start();
    if (Ui(), l.isOpen = !0, l.collapsed = !1, l.isLoading = !0, l.errorMsg = "", l.bvid = t, l.aid = r, l.cid = e.cid || "", l.title = e.title || t || "加载中…", l.cover = e.cover || "", l.author = e.author || "", l.authorMid = e.mid ? String(e.mid) : "", l.authorFace = e.authorFace || "", l.videoSrc = "", l.sourceUrls = [], l.iframeSrc = "", l.useIframe = !1, l.currentTime = 0, l.pages = [], l.currentPageIndex = 0, l.comments = [], l.commentsPage = 1, l.hasMoreComments = !1, l.totalComments = 0, l.danmakuList = [], l.danmakuLoading = !1, typeof window < "u" && (l.x = Math.max(20, Math.floor((window.innerWidth - 380) / 2)), l.y = Math.max(60, Math.min(100, Math.floor((window.innerHeight - 254) / 3)))), e.cachedSourceUrl) {
      gt = e.cachedSourceUrl, l.videoSrc = gt, l.isLoading = !1;
      return;
    }
    try {
      const o = await X.resolvePlayStream({
        bvid: t,
        aid: r,
        cid: e.cid,
        title: e.title,
        cover: e.cover,
        preferredQuality: l.currentQuality
      }, 1, n);
      if (n.throwIfAborted(), l.title = o.title || e.title || t, l.cover = o.poster || e.cover || "", l.author = o.owner || e.author || "UP主", l.authorFace = o.ownerFace || e.authorFace || "", o.ownerMid && (l.authorMid = String(o.ownerMid)), l.aid = o.aid ? String(o.aid) : r, l.bvid = o.bvid || t, l.cid = o.cid || "", l.description = o.desc || "", l.pubdate = o.pubdate ? new Date(o.pubdate * 1e3).toLocaleString() : "", l.pages = o.pages || [], l.currentPageIndex = Math.max(0, o.currentPage - 1), o.acceptQuality?.length && (l.qualities = o.acceptQuality.map((s, a) => ({
        qn: s,
        desc: o.acceptDescription?.[a] || Ti(s)
      }))), l.currentQuality = o.currentQuality || 64, o.sources && o.sources.length)
        l.sourceUrls = o.sources, l.videoSrc = o.sources[0], l.isPlaying = !0, l.danmakuEnabled && this.loadDanmaku();
      else
        throw new Error("未能获取到直链源");
    } catch (o) {
      if (n.aborted) return;
      l.errorMsg = o?.message || "未能获取到视频播放流", G(`视频加载未完成：${l.errorMsg}`, !0);
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
      G("当前视频未获取到原生流，保持内嵌模式");
      return;
    }
    l.useIframe = !l.useIframe, l.useIframe && !l.iframeSrc && (l.iframeSrc = `https://player.bilibili.com/player.html?bvid=${encodeURIComponent(l.bvid)}&autoplay=1&danmaku=0&high_quality=1`), G(l.useIframe ? "已切换至官方嵌入播放模式" : "已切换至原生播放模式");
  },
  /**
   * 切换选集（分P）
   */
  async switchEpisode(e) {
    if (e < 0 || e >= l.pages.length) return;
    const t = l.pages[e];
    if (!t) return;
    l.currentPageIndex = e, l.cid = t.cid, l.videoSrc = "", l.sourceUrls = [], l.isLoading = !0, l.errorMsg = "", l.danmakuList = [], l.danmakuLoading = !1;
    const r = Gt.start();
    try {
      const i = await X.fetchPlayStream(
        l.bvid,
        t.cid,
        l.currentQuality,
        r
      );
      if (r.throwIfAborted(), i.sources?.length)
        l.sourceUrls = i.sources, l.videoSrc = i.sources[0], l.currentTime = 0, l.isPlaying = !0, l.danmakuEnabled && this.loadDanmaku();
      else
        throw new Error("获取分P视频流失败");
    } catch (i) {
      if (r.aborted) return;
      l.errorMsg = i?.message || "切换选集失败", G(`分P切换失败：${l.errorMsg}`, !0);
    } finally {
      r.aborted || (l.isLoading = !1);
    }
  },
  /**
   * 切换清晰度
   */
  async switchQuality(e) {
    if (l.qualityMenuOpen = !1, e === l.currentQuality) return;
    l.isLoading = !0;
    const t = l.currentTime, r = Gt.start();
    try {
      const i = await X.fetchPlayStream(
        l.bvid,
        l.cid,
        e,
        r
      );
      r.throwIfAborted(), i.sources?.length && (l.sourceUrls = i.sources, l.videoSrc = i.sources[0], l.currentQuality = i.quality, l.currentTime = t, l.isPlaying = !0, G(`已切换清晰度为 ${Ti(e)}`));
    } catch (i) {
      if (r.aborted) return;
      G(`清晰度切换失败：${i?.message || "网络异常"}`, !0);
    } finally {
      r.aborted || (l.isLoading = !1);
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
    Gt.cancel(), l.isLoading = !1, l.sourceUrls = [], Ui(), l.isOpen = !1, l.isPlaying = !1, l.videoSrc = "", l.episodesOpen = !1, l.descOpen = !1, l.commentsOpen = !1;
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
    l.danmakuEnabled = t, G(t ? "已开启弹幕" : "已关闭弹幕"), t && (!l.danmakuList.length || l.danmakuLoading) && this.loadDanmaku();
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
          const i = await X.getVideoView(l.bvid);
          i?.cid && (t = i.cid, l.cid = t);
        }
        if (!t) {
          l.danmakuLoading = !1, G("未能获取到当前视频的 cid，暂无法拉取弹幕", !0);
          return;
        }
        const r = await X.getVideoDanmaku(t);
        l.danmakuList = r;
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
`)), G("已复制视频简介到剪贴板");
    } catch {
      G("复制简介失败", !0);
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
        const n = await X.getVideoView(l.bvid);
        n?.aid && (t = String(n.aid), l.aid = t);
      }
      if (!t) {
        l.commentsLoading = !1;
        return;
      }
      const r = await X.getVideoComments(
        t,
        l.commentsPage,
        20,
        l.commentsSort
      ), i = (r.comments || []).map((n) => {
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
          replies: (n.replies || []).map((f) => ({
            id: String(f.rpid),
            userName: f.uname,
            message: f.message,
            pictures: f.pictures || [],
            emotes: f.emotes
          }))
        };
      });
      e ? l.comments = i : l.comments = [...l.comments, ...i], l.totalComments = r.total || l.comments.length, l.hasMoreComments = r.hasMore;
    } catch (t) {
      G(`评论加载失败：${t?.message || "网络异常"}`, !0);
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
    const t = l.comments.find((r) => String(r.id) === String(e));
    if (!(!t || t.subRepliesLoading)) {
      t.subRepliesPage ? t.subRepliesPage++ : t.subRepliesPage = 1, t.subRepliesLoading = !0, t.subRepliesExpanded = !0;
      try {
        let r = l.aid;
        if (!r && l.bvid) {
          const a = await X.getVideoView(l.bvid);
          a?.aid && (r = String(a.aid), l.aid = r);
        }
        if (!r) {
          t.subRepliesLoading = !1;
          return;
        }
        const i = await X.getSubReplies(r, e, t.subRepliesPage, 10), n = (i.replies || []).map((a) => ({
          id: String(a.rpid),
          userName: a.uname,
          message: a.message,
          pictures: a.pictures || [],
          emotes: a.emotes
        })), o = new Set((t.replies || []).map((a) => String(a.id))), s = n.filter((a) => !o.has(String(a.id)));
        t.replies = [...t.replies || [], ...s], t.subRepliesHasMore = i.hasMore;
      } catch (r) {
        G(`子回复加载失败：${r?.message || "网络异常"}`, !0);
      } finally {
        t.subRepliesLoading = !1;
      }
    }
  },
  /**
   * 收起已展开的楼中楼子回复
   */
  collapseSubReplies(e) {
    const t = l.comments.find((r) => String(r.id) === String(e));
    t && (t.subRepliesExpanded = !1);
  },
  /**
   * 加载更多评论
   */
  loadMoreComments() {
    l.commentsLoading || !l.hasMoreComments || (l.commentsPage++, this.loadComments(!1));
  }
}, cs = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  biliMiniPlayerController: as,
  biliMiniPlayerState: l
}, Symbol.toStringTag, { value: "Module" }));
function ls() {
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
  const e = ae.activeId;
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
function us(e) {
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
function ds(e, t) {
  if (d.visible) return;
  const r = t || A.channel || "main", i = A.rooms.find((s) => s.id === r), n = i?.name ? `#${i.name}` : void 0;
  let o = "assets/icon-48.png";
  if (e.sender?.avatar && /^https?:\/\//i.test(e.sender.avatar)) {
    const s = yr(e.sender.avatar);
    s && (o = s);
  }
  me.show({
    id: `chat_msg_${e.id}`,
    appType: "chat",
    appName: "海狸聊天室",
    icon: o,
    title: e.sender?.name || "新消息",
    subtitle: n,
    message: us(e),
    duration: 6500,
    level: "info",
    history: !0,
    target: { type: "module", moduleId: "chat" },
    actionLabel: "查看消息",
    onClick: () => {
      pr.handleToolClick("chat");
    }
  });
}
class it extends Error {
  constructor(t) {
    super(`服务器响应 ${t}`), this.status = t, this.name = "PrivateChatHttpError";
  }
}
class Ve extends Error {
  constructor() {
    super(...arguments), this.name = "ChatCapabilityError";
  }
}
function pn(e, t, r) {
  return new Promise((i, n) => {
    const o = new AbortController(), s = () => o.abort(new DOMException("聊天室操作已停止等待", "AbortError")), a = () => {
      clearTimeout(u), r?.removeEventListener("abort", s), o.signal.removeEventListener("abort", c);
    }, c = () => {
      a(), n(o.signal.reason);
    }, u = setTimeout(() => o.abort(new DOMException("聊天室操作超时，结果可能尚未确认", "TimeoutError")), e);
    if (o.signal.addEventListener("abort", c, { once: !0 }), r?.addEventListener("abort", s, { once: !0 }), r?.aborted) {
      s();
      return;
    }
    Promise.resolve().then(() => (o.signal.throwIfAborted(), t(o.signal))).then(
      (f) => {
        a(), o.signal.aborted ? n(o.signal.reason) : i(f);
      },
      (f) => {
        a(), n(f);
      }
    );
  });
}
class Z extends Error {
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
class fs {
  constructor(t = () => {
  }) {
    this.onBlocked = t;
  }
  open() {
    if (this.database) return this.database;
    const t = new Promise((r, i) => {
      let n = !1;
      const o = (a) => {
        n || (n = !0, clearTimeout(s), i(a));
      }, s = setTimeout(() => o(new Z("timeout")), 8e3);
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
          }, r(c);
        }, a.onerror = () => o(new Z("storage")), a.onblocked = () => {
          if (!n) {
            o(new Z("blocked"));
            try {
              this.onBlocked();
            } catch {
            }
          }
        };
      } catch {
        o(new Z("storage"));
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
    if (!kt(r)) throw new Z("invalid");
    await this.access(t, r);
  }
  access(t, r, i) {
    const n = T(t);
    return pn(8e3, async (o) => {
      try {
        const s = await this.open();
        return o.throwIfAborted(), await new Promise((a, c) => {
          const u = s.transaction("credentials", r === void 0 ? "readonly" : "readwrite"), f = u.objectStore("credentials"), h = r === void 0 ? f.get(n) : f.put(r, n), m = () => {
            try {
              u.abort();
            } catch {
            }
          }, g = () => o.removeEventListener("abort", m);
          r === void 0 && o.addEventListener("abort", m, { once: !0 }), u.oncomplete = () => {
            g();
            const w = r === void 0 ? h.result : r;
            w === void 0 || w === "" ? c(new Z("missing")) : kt(w) ? a(w) : c(new Z("invalid"));
          }, u.onabort = u.onerror = h.onerror = () => {
            g(), c(new Z("storage"));
          };
        });
      } catch (s) {
        throw o.aborted ? o.reason : s instanceof Z ? s : new Z("storage");
      }
    }, i);
  }
}
class Ne extends Error {
  constructor() {
    super(...arguments), this.name = "PrivateChatTransportError";
  }
}
class ms {
  constructor(t) {
    this.ports = t;
  }
  async request(t) {
    let r, i;
    try {
      if (r = Object.freeze({ ...xt(t.destination), channel: t.destination.channel }), i = new URL(t.path, r.origin), !t.path.startsWith("/api/v1/") || t.path.includes("\\") || i.origin !== r.origin || i.hash || i.username || i.password || !i.pathname.startsWith("/api/v1/")) throw new Error();
    } catch {
      throw new Ne("聊天室请求目标无效");
    }
    const n = Object.freeze({ ...t, destination: r, path: i.pathname, method: (t.method || "GET").toUpperCase() });
    return i.searchParams.set("room", r.room), i.searchParams.delete("channel"), r.channel && r.channel !== "main" && i.searchParams.set("channel", r.channel), pn(n.signal ? 3e4 : 15e3, async (o) => {
      try {
        const s = await this.ports.credential(r, o);
        if (o.throwIfAborted(), !kt(s)) throw new Z("invalid");
        this.ports.beforeSend(n);
        let a;
        try {
          a = n.body === void 0 ? void 0 : JSON.stringify(n.body);
        } catch {
          throw new Ne("聊天室请求内容格式无效");
        }
        const c = await fetch(i, {
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
          throw u(), new it(c.status);
        const f = c.body?.getReader();
        if (!f) throw new Ne("聊天室返回空响应");
        const h = () => {
          f.cancel().catch(() => {
          });
        };
        o.addEventListener("abort", h, { once: !0 });
        let m = 0, g = "";
        const w = new TextDecoder();
        try {
          for (; ; ) {
            const b = await f.read();
            if (o.throwIfAborted(), b.done) break;
            if (m += b.value.byteLength, m > 2 * 1024 * 1024)
              throw h(), new Ne("聊天室响应超限");
            g += w.decode(b.value, { stream: !0 });
          }
          try {
            return JSON.parse(g + w.decode());
          } catch {
            throw new Ne("聊天室响应格式无效");
          }
        } finally {
          o.removeEventListener("abort", h);
          try {
            f.releaseLock();
          } catch {
          }
        }
      } catch (s) {
        throw o.aborted ? o.reason : s instanceof it || s instanceof Ve || s instanceof Z || s instanceof Ne ? s : new Ne("聊天室请求失败，请检查网络或服务配置");
      }
    }, n.signal);
  }
}
class ps {
  constructor(t) {
    this.ports = t, this.generation = 0, this.halted = !0, this.liveGeneration = -1, this.reads = new Yn();
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
    const o = this.ports.visible(), s = this.reads.begin({ timeoutMs: o ? 25e3 : 2e4, isCurrent: () => this.owns(t, r) });
    let a = o ? 2500 : 1e4, c = "读取本地历史";
    const u = {
      signal: s.signal,
      current: s.current,
      wait: s.wait,
      visible: o,
      phase: (f) => {
        c = f;
      },
      restoring: () => this.liveGeneration !== r,
      caughtUp: () => {
        s.current() && (this.liveGeneration = r);
      }
    };
    try {
      this.ports.started();
      const f = await s.wait(() => this.ports.poll(t, u));
      if (!s.current()) return;
      i = 0, f?.hasMore && (a = 250);
    } catch (f) {
      if (!this.owns(t, r)) return;
      const h = this.ports.classify(f, t);
      h === "retry" ? (++i, a = Math.min(6e4, 1500 * 2 ** Math.min(i, 4))) : this.halted = !0, this.ports.failed(h, c, i), h === "missing-room" && r === this.generation && this.halted && this.schedule(() => this.ports.restart(), 0, r);
    } finally {
      s.finish(), this.running === n && (this.running = void 0), r === this.generation && (this.ports.active(t) || (this.halted = !0), this.ports.idle()), this.owns(t, r) && this.schedule(() => {
        this.tick(t, r, i);
      }, a, r);
    }
  }
}
const ve = (e) => !!e && typeof e == "object" && !Array.isArray(e), Te = (e) => typeof e == "string" && /^[A-Za-z0-9_-]{1,160}$/.test(e), yt = (e) => e == null, It = (e) => typeof e == "number" && Number.isFinite(e) && e >= 0;
function K() {
  throw new Error("同步页格式无效，未提交本页记录或推进游标");
}
function Ir(e) {
  if (!Array.isArray(e) || e.length > 32) throw new Error("房间列表格式无效");
  return e.map((t) => {
    if (!ve(t) || !Te(t.id) || typeof t.name != "string" || t.name.length > 80 || typeof t.icon != "string" || t.icon.length > 8 || typeof t.description != "string" || t.description.length > 500) throw new Error("房间格式无效");
    if (t.space !== void 0 && !Te(t.space)) throw new Error("空间格式无效");
    return { id: t.id, name: t.name, icon: t.icon, description: t.description, space: typeof t.space == "string" ? t.space : "hub_main" };
  });
}
function _r(e) {
  if (!Array.isArray(e) || e.length > 16) throw new Error("空间列表格式无效");
  return e.map((t) => {
    if (!ve(t) || !Te(t.id) || typeof t.name != "string" || t.name.length > 80 || typeof t.icon != "string" || t.icon.length > 8) throw new Error("空间格式无效");
    return { id: t.id, name: t.name, icon: t.icon };
  });
}
function hn(e, t) {
  if (typeof e.name != "string" || e.name.length > 200) return;
  const r = No({ ...e, name: e.name.slice(0, 100) }, t);
  return r && { ...r, name: e.name };
}
function hs(e, t) {
  return yt(e) ? [] : ((!Array.isArray(e) || e.length > 65) && K(), e.map((r) => {
    (!ve(r) || !Te(r.uid) || r.role !== void 0 && r.role !== "owner" && r.role !== "member") && K();
    const i = hn(r, t);
    return i || K(), i.activity && ve(r.activity) && It(r.activity.updatedAt) && (i.activity.updatedAt = r.activity.updatedAt), {
      ...i,
      role: r.role === "owner" ? "owner" : "member",
      online: typeof r.online == "boolean" ? r.online : void 0,
      lastSeen: It(r.lastSeen) ? r.lastSeen : void 0
    };
  }));
}
function gs(e, t, r) {
  if (!yt(e))
    return (!Array.isArray(e) || e.length > 200) && K(), e.map((i) => {
      (!ve(i) || !Te(i.id) || !Te(i.toUid) || !ve(i.from) || !Te(i.from.uid)) && K();
      const n = hn(i.from, r);
      return (!n || n.uid !== t && i.toUid !== t || !["pending", "accepted", "rejected"].includes(String(i.status))) && K(), i.createdAt !== void 0 && !It(i.createdAt) && K(), {
        id: i.id,
        from: n,
        toUid: i.toUid,
        status: i.status,
        createdAt: It(i.createdAt) ? i.createdAt : r,
        note: typeof i.note == "string" && i.note.length <= 200 ? i.note : void 0
      };
    });
}
function ys(e, t, r, i) {
  (!Number.isSafeInteger(r) || r < 0 || !It(i) || !ve(e) || !ve(e.identity) || e.identity.uid !== t || e.identity.role !== "owner" && e.identity.role !== "member" || !Array.isArray(e.messages) || e.messages.length > 50) && K();
  let n = r;
  const o = [], s = [];
  for (const u of e.messages) {
    (!ve(u) || !Number.isSafeInteger(u.seq) || u.seq <= n) && K();
    const f = en(u.message, i);
    f || K(), o.push(f), s.push(u.seq), n = u.seq;
  }
  e.hasMore !== void 0 && typeof e.hasMore != "boolean" && K();
  const a = e.hasMore === !0;
  a && !o.length && K();
  let c;
  return yt(e.friends) || ((!Array.isArray(e.friends) || e.friends.length > 4096 || !e.friends.every(Te)) && K(), c = [...new Set(e.friends)]), Object.freeze({
    uid: t,
    role: e.identity.role,
    messages: o,
    sequences: s,
    next: n,
    hasMore: a,
    capabilities: Oo(e.capabilities),
    rooms: yt(e.rooms) ? [{ id: "main", name: "综合讨论", icon: "💬", description: "" }] : Ir(e.rooms),
    spaces: yt(e.spaces) ? [{ id: "hub_main", name: "聊天室", icon: "🏠" }] : _r(e.spaces),
    roomsSupported: Array.isArray(e.rooms),
    spacesSupported: Array.isArray(e.spaces),
    members: hs(e.members, i),
    friends: c,
    friendRequests: gs(e.friendRequests, t, i)
  });
}
function lt(e, t, r) {
  for (const i of Object.keys(t)) {
    if (!r()) return !1;
    e[i] = t[i];
  }
  return r();
}
function ws(e, t, r, i) {
  const { chat: n, service: o } = i, s = r.current;
  if (!s()) return !1;
  const a = r.restoring();
  for (let y = 0; y < e.messages.length; y++) {
    if (!s()) return !1;
    const C = e.messages[y];
    i.publish(C, Object.freeze({
      scope: t.scope,
      channel: t.channel,
      sequence: e.sequences[y],
      source: a ? "history" : C.sender.uid === e.uid ? "self" : "live"
    }), s);
  }
  if (!s()) return !1;
  const c = new Set(n.messages.map((y) => y.id)), u = e.messages.filter((y) => y.sender.uid !== e.uid && !y.meta?.silentPartySync && y.type !== "system" && !c.has(y.id)), f = n.visible ? [] : u.filter((y) => (t.cursor > 0 || t.now - y.timestamp < 3e4) && (y.type !== "music_party" || !a)).slice(-3), h = new Map(n.messages.map((y) => [y.id, y]));
  for (const y of e.messages) h.set(y.id, y);
  const m = Object.assign(/* @__PURE__ */ Object.create(null), n.userActivities);
  for (const y of e.members) y.activity && (m[y.uid] = y.activity);
  const g = [], w = new Set(n.friends.map((y) => y.uid)), b = new Map(e.members.map((y) => [y.uid, y]));
  for (const y of e.friends || []) {
    const C = b.get(y);
    C && !w.has(y) && (g.push({ uid: y, name: C.name, avatar: C.avatar, addedAt: t.now, status: "mutual" }), w.add(y));
  }
  if (!lt(n, {
    messages: [...h.values()].sort((y, C) => y.timestamp - C.timestamp || y.id.localeCompare(C.id)).slice(-200),
    unreadCount: u.length ? n.visible ? 0 : n.unreadCount + u.length : n.unreadCount
  }, s) || !lt(o, {
    capabilities: e.capabilities,
    imageMessagesSupported: e.capabilities.messageTypes.includes("image"),
    spacesSupported: e.spacesSupported,
    spaces: e.spaces,
    roomsSupported: e.roomsSupported,
    rooms: e.rooms
  }, s) || (i.authenticated(), !s()) || !lt(o, { role: e.role, members: e.members, ...e.friends === void 0 ? {} : { friends: e.friends } }, s)) return !1;
  for (const y of g) {
    if (!s()) return !1;
    n.friends.some((C) => C.uid === y.uid) || n.friends.push(y);
  }
  const S = e.members.some((y) => !!y.activity) || Object.getPrototypeOf(n.userActivities) !== null ? { userActivities: m } : {};
  if (!lt(n, {
    ...S,
    ...e.friendRequests === void 0 ? {} : { friendRequests: e.friendRequests },
    connected: !0,
    connecting: !1,
    error: ""
  }, s) || !lt(o, { status: "已连接私有服务器" }, s)) return !1;
  e.hasMore || r.caughtUp();
  for (const y of f) {
    if (!s()) return !1;
    if (n.visible) break;
    try {
      i.notify(y, t.channel);
    } catch {
      console.warn("[PrivateChat] notification failed");
    }
  }
  return s();
}
const Be = "private-relay-server";
class bs {
  constructor(t) {
    this.ports = t, this.flushing = !1;
  }
  async postAndAcknowledge(t, r, i = 12e3) {
    const n = Object.freeze({ ...t }), o = St(this.ports.capabilities(n), r);
    if (o) throw new Ve(o);
    const s = await this.ports.post(n, r, AbortSignal.timeout(i));
    if (!s || s.stored !== !0 || s.id !== r.id) throw new Error("未收到服务器落盘确认");
    await es(this.ports.scope(n), r.id, Be);
  }
  async recordFailure(t, r, i, n) {
    try {
      if (i instanceof Ve) {
        z.value = i.message, await _i(this.ports.scope(t), r, Be, !1, n, !0);
        return;
      }
      const o = i instanceof it && i.status >= 400 && i.status < 500 && ![408, 429].includes(i.status);
      await _i(this.ports.scope(t), r, Be, o, n);
    } catch {
      z.value = "无法保存消息的发送状态，请检查浏览器存储。";
    }
  }
  async flush(t) {
    if (this.flushing || !this.ports.active(t) || ["unknown", "incompatible"].includes(this.ports.capabilities(t).status)) return;
    this.flushing = !0;
    const r = [];
    try {
      const i = this.ports.destinations(t).map((o) => Object.freeze({ ...o }));
      let n = 8;
      for (const o of i) {
        if (!n || !this.ports.active(t)) break;
        await ts(this.ports.scope(o), [Be], () => this.ports.active(t), (s, a, c) => {
          --n;
          const u = { ...a, sender: { ...a.sender, avatar: this.ports.avatar(a.sender.avatar) } };
          return r.push(this.postAndAcknowledge(o, u).catch((f) => this.recordFailure(o, a.id, f, c))), !0;
        }, n, (s) => !St(this.ports.capabilities(o), s));
      }
    } catch {
      z.value = "待发队列处理未确认，请检查本地存储；未改投其他房间。";
    } finally {
      await Promise.allSettled(r), this.flushing = !1;
    }
  }
}
const Xt = [];
function rc(e) {
  return Xt.push(e), () => {
    const t = Xt.indexOf(e);
    t >= 0 && Xt.splice(t, 1);
  };
}
async function ic() {
  const e = v.room;
  if (!e || e.uid !== d.currentUser.uid) throw new Error("请先在聊天室设置中加入自己的聊天室");
  const t = { ...e }, r = await Q(t, "/api/v1/rooms", "GET", void 0, AbortSignal.timeout(15e3));
  if (!v.room || T(t) !== T(v.room)) throw new Error("聊天室配置已改变，请重新选择");
  const i = r.spaces ? _r(r.spaces) : [];
  return Ir(r.rooms).map((n) => ({ ...t, channel: n.id, name: `${i.find((o) => o.id === n.space)?.name || "聊天室"} / ${n.name}` }));
}
async function Gr(e, t) {
  const r = v.room;
  if (!r || T(r) !== T(t) || d.currentUser.uid !== t.uid) throw new Error("聊天室身份已改变，未发送，请重新选择房间");
  const i = Rt(e);
  if (!i || i.type === "system" || i.type === "image") throw new Error("分享内容无效或超出大小限制，未发送");
  const n = { ...t };
  i.sender = { ...i.sender, uid: n.uid, avatar: Sr(d.currentUser.avatar, se.avatarUrl), name: d.currentUser.name };
  const o = St(Lt(n), i);
  if (o) throw new Error(o);
  await vr(Ue(n), [i]), await fn(Ue(n), i, [Be]), Se(n) && !d.messages.some((s) => s.id === i.id) && d.messages.push(i);
  try {
    await ur.postAndAcknowledge(n, i, 15e3);
  } catch (s) {
    throw await ur.recordFailure(n, i.id, s, 0), Ur(), new Error(`未收到「${n.name}」的保存确认；已保留在该房间待发队列，请勿重复发送。`);
  }
}
const A = F({
  status: "未配置私有服务器",
  role: "",
  syncing: !1,
  channel: "main",
  rooms: [],
  spaces: [],
  spacesSupported: !1,
  imageMessagesSupported: !1,
  capabilities: gr(),
  roomsSupported: !1,
  friends: [],
  members: []
});
function Lt(e) {
  return qe === T(e) && v.room && T(v.room) === T(e) && d.currentUser.uid === e.uid ? A.capabilities : gr();
}
function Tr() {
  A.capabilities = gr(), A.imageMessagesSupported = !1;
}
const ur = new bs({
  active: Se,
  capabilities: Lt,
  scope: Ue,
  avatar: (e) => Sr(e, se.avatarUrl),
  destinations: (e) => [Fe(e), ...A.rooms.filter((t) => t.id !== A.channel).map((t) => ({ ...e, channel: t.id }))],
  post: (e, t, r) => Q(e, "/api/v1/messages", "POST", { message: t }, r)
}), gn = new fs(() => {
  A.status = "凭证数据库被旧标签页阻塞，请关闭旧页后重试";
}), vs = new ms({
  credential: (e, t) => gn.read(e, t),
  beforeSend: ({ destination: e, path: t, method: r, body: i }) => {
    if (!ee.isInstalled("chat")) throw new Ve("聊天室实验组件已停用，未发起请求");
    const n = t === "/api/v1/members" || t.startsWith("/api/v1/members/"), o = r !== "GET" && ["/api/v1/spaces", "/api/v1/rooms"].some((s) => t === s || t.startsWith(s + "/"));
    if ((n || o) && (!d.connected || A.role !== "owner" || qe !== T(e) || !v.room || T(v.room) !== T(e) || d.currentUser.uid !== e.uid))
      throw new it(403);
    if (r === "POST" && t === "/api/v1/messages") {
      const s = St(Lt(e), i.message);
      if (s) throw new Ve(s);
    }
  }
});
function Ss(e) {
  const t = "BEAVER-PRIVATE1:";
  if (!e.startsWith(t) || e.length > 8e3) throw new Error("请粘贴新版私有聊天室邀请");
  try {
    const r = JSON.parse(decodeURIComponent(atob(e.slice(t.length))));
    if (!r || !kt(r.token)) throw new Error();
    return { ...xt(r), token: r.token };
  } catch {
    throw new Error("邀请格式无效");
  }
}
let Kr = 0;
async function nc(e) {
  if (!ee.isInstalled("chat")) throw new Ve("请先在商店手动启用聊天室实验组件");
  const t = Ss(e);
  if (t.uid !== d.currentUser.uid) throw new Error("此邀请不属于当前 UID，请让服主为当前账号重新创建");
  const r = xt(t), i = v.room ? T(v.room) : null;
  _t();
  const n = Kr;
  if (await gn.write(r, t.token), n !== Kr || d.currentUser.uid !== t.uid || i !== (v.room ? T(v.room) : null))
    throw new Error("凭据已保存，但身份或连接选择已改变，未激活旧邀请；如需加入请重新确认。");
  _t(), Yo(r), d.transportMode = "relay", Ot(dn(r), t.room), Pe();
}
function Q(e, t, r = "GET", i, n) {
  return ee.isInstalled("chat") ? vs.request({ destination: e, path: t, method: r, body: i, signal: n }) : Promise.reject(new Ve("请先在商店手动启用聊天室实验组件"));
}
async function yn(e, t, r) {
  const i = v.room;
  if (!i) throw new Error("未配置私有服务器");
  return Q({ ...i }, e, t, r, AbortSignal.timeout(15e3));
}
async function oc() {
  return (await yn("/api/v1/members", "GET")).members;
}
async function As(e, t) {
  const r = v.room;
  if (!r) throw new Error("未配置私有服务器");
  const i = { ...r }, n = await Q(i, "/api/v1/members", "POST", { uid: e, name: t }, AbortSignal.timeout(15e3));
  if (!kt(n.token)) throw new Error("服务器返回无效，勿重复创建，请刷新成员列表");
  return "BEAVER-PRIVATE1:" + btoa(encodeURIComponent(JSON.stringify({ ...i, uid: e, token: n.token })));
}
async function sc(e) {
  const t = v.room;
  if (!t) throw new Error("未配置私有服务器，无法发送邀请");
  if (e.uid === d.currentUser.uid) throw new Error("不能邀请自己");
  const r = Lt(t);
  if (!r.messageTypes.includes("server_invite")) throw new Error(r.status === "unknown" || r.status === "incompatible" ? r.reason : "服务端未启用邀请卡消息，未创建新成员邀请。");
  const i = await As(e.uid, e.name), n = A.spaces.find((h) => h.id === (A.rooms.find((m) => m.id === A.channel)?.space || "hub_main")), o = A.rooms.find((h) => h.id === A.channel) || A.rooms[0], s = n?.name || t.room || "海狸聊天室", a = o?.name || "综合讨论";
  let c = "";
  try {
    c = JSON.parse(decodeURIComponent(atob(i.replace(/^BEAVER-PRIVATE1:/, "")))).token || "";
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
    content: `邀请你加入【${s}】聊天室`,
    meta: {
      inviteOrigin: t.origin,
      inviteRoom: t.room,
      inviteRoomName: a,
      inviteServerName: s,
      inviteServerIcon: n?.icon || "🏠",
      inviteToken: c,
      inviteTargetUid: e.uid,
      inviteCode: i
    },
    timestamp: Date.now()
  }, f = wn(e.uid);
  await Gr(u, {
    ...t,
    channel: f,
    name: `私聊 / ${e.name}`
  }), Es(e.uid);
}
async function ac(e) {
  if (!/^[a-f0-9]{32}$/.test(e)) throw new Error("成员标识无效");
  await yn("/api/v1/members/" + e, "DELETE");
}
function Fe(e) {
  return { ...e, channel: A.channel };
}
function $t(e) {
  const t = new URL(dn(e)), r = e.channel || "main";
  return r !== "main" && t.searchParams.set("channel", r), t.href;
}
function Ue(e) {
  return ri(e.uid, $t(e), e.room);
}
function Se(e) {
  return ee.isInstalled("chat") && d.currentUser.uid === e.uid && d.serverUrl === $t(e) && (e.channel || "main") === A.channel && d.currentRoomId === e.room && v.room !== null && T(v.room) === T(e);
}
function cc() {
  const e = v.room && Fe(v.room);
  return e && Se(e) ? { scope: Ue(e), channel: e.channel } : null;
}
function wn(e) {
  return "dm_" + [d.currentUser.uid, e].sort().join("__");
}
function lc(e) {
  if (!e.startsWith("dm_")) return;
  const t = e.slice(3).split("__");
  if (t.length === 2)
    return t.find((r) => r !== d.currentUser.uid);
}
function Es(e) {
  const t = v.room;
  if (!t || !e || e === d.currentUser.uid) return;
  const r = wn(e);
  r === A.channel && Se(Fe(t)) || Ot($t({ ...t, channel: r }), t.room, !0) && (A.channel = r, Pe());
}
async function Cs(e) {
  const t = v.room;
  if (!t) throw new Error("未配置私有服务器");
  await Q({ ...t }, "/api/v1/friends/request", "POST", { toUid: e }, AbortSignal.timeout(15e3));
}
async function ks(e, t) {
  const r = v.room;
  if (!r) throw new Error("未配置私有服务器");
  await Q({ ...r }, "/api/v1/friends/respond", "POST", { id: e, accept: t }, AbortSignal.timeout(15e3));
}
function bn(e) {
  const t = v.room;
  if (!(!t || !A.rooms.some((r) => r.id === e))) {
    if (e === A.channel && Se(Fe(t))) {
      Ur();
      return;
    }
    Ot($t({ ...t, channel: e }), t.room, qe === T(t) && d.currentUser.uid === t.uid) && (A.channel = e, Pe());
  }
}
async function uc(e, t) {
  const r = v.room;
  if (!r) throw new Error("未配置");
  const i = T(r), n = { ...r };
  await Q(n, t ? `/api/v1/rooms/${encodeURIComponent(t)}` : "/api/v1/rooms", "POST", e, AbortSignal.timeout(15e3));
  const o = await Q(n, "/api/v1/rooms", "GET", void 0, AbortSignal.timeout(15e3));
  if (v.room && T(v.room) === i && d.currentUser.uid === r.uid) {
    const s = Ir(o.rooms), a = o.spaces ? _r(o.spaces) : void 0;
    A.rooms = s, a && v.room && T(v.room) === i && d.currentUser.uid === r.uid && (A.spaces = a);
  }
}
async function dc(e) {
  if (e === "main") throw new Error("默认房间不可移除");
  const t = v.room;
  if (!t) throw new Error("未配置");
  const r = T(t);
  await Q({ ...t }, `/api/v1/rooms/${encodeURIComponent(e)}`, "DELETE", void 0, AbortSignal.timeout(15e3)), !(!v.room || T(v.room) !== r) && (A.rooms = A.rooms.filter((i) => i.id !== e), A.channel === e && bn("main"));
}
async function fc(e, t) {
  const r = v.room;
  if (!r) throw new Error("未配置");
  const i = T(r);
  await Q({ ...r }, t ? `/api/v1/spaces/${encodeURIComponent(t)}` : "/api/v1/spaces", "POST", e, AbortSignal.timeout(15e3)), v.room && T(v.room) === i && await vn(r);
}
async function mc(e) {
  if (e === "hub_main") throw new Error("默认空间不可移除");
  const t = v.room;
  if (!t) throw new Error("未配置");
  const r = T(t), i = A.channel;
  await Q({ ...t }, `/api/v1/spaces/${encodeURIComponent(e)}`, "DELETE", void 0, AbortSignal.timeout(15e3)), !(!v.room || T(v.room) !== r || d.currentUser.uid !== t.uid) && (await vn(t), !(!v.room || T(v.room) !== r || d.currentUser.uid !== t.uid) && A.channel === i && !A.rooms.some((n) => n.id === i) && bn("main"));
}
async function vn(e) {
  const t = await Q({ ...e }, "/api/v1/spaces", "GET", void 0, AbortSignal.timeout(15e3));
  if (!v.room || T(v.room) !== T(e) || d.currentUser.uid !== e.uid) return;
  const r = _r(t.spaces), i = Ir(t.rooms);
  A.spaces = r, v.room && T(v.room) === T(e) && d.currentUser.uid === e.uid && (A.rooms = i);
}
let Sn = "", qe = "";
const ci = new ps({
  active: Se,
  visible: () => d.visible,
  poll: Is,
  started: () => {
    d.connecting = !d.connected, A.syncing = !0;
  },
  idle: () => {
    A.syncing = !1;
  },
  classify: (e, t) => e instanceof it && e.status === 404 && (t.channel || "main") !== "main" ? "missing-room" : e instanceof it && [401, 403].includes(e.status) ? "auth" : "retry",
  failed: (e, t, r) => {
    e === "missing-room" ? (A.channel = "main", A.status = "房间已移除，正在返回综合讨论") : e === "auth" ? (qe = "", Tr(), A.role = "", d.error = "访问凭证已失效、过期或不属于此房间，请重新导入邀请", d.connected = !1, d.connecting = !1) : r >= 2 && (d.connected = !1, d.connecting = !1, d.error = `${t}失败或超时，记录与待发队列保留，将自动重试。若持续失败，请关闭旧标签页后重试，并检查服务配置。`, A.status = d.error);
  },
  restart: () => Pe()
});
function Ur() {
  const e = v.room && Fe(v.room);
  e && !ci.stopped && Sn === T(e) && Se(e) || Pe();
}
function An() {
  ci.cancel();
}
function _t() {
  ++Kr, An(), qe = "", Tr(), d.connected = !1, d.connecting = !1, A.role = "";
}
function Pe() {
  if (!ee.isInstalled("chat")) {
    _t(), d.visible = !1, d.error = "", A.status = "实验性组件默认关闭，请先在商店手动启用";
    return;
  }
  const e = v.room && Fe(v.room), t = !!e && qe === T(e) && d.currentUser.uid === e.uid;
  if (t ? An() : _t(), !e) {
    A.status = "尚未读取到聊天室配置，请在此窗口设置中检查", d.error = "";
    return;
  }
  if (e.uid !== d.currentUser.uid) {
    d.error = A.status = "邀请 UID 与本机不一致，请重新导入属于本机的邀请";
    return;
  }
  d.transportMode = "relay", Ot($t(e), e.room, t) && (Sn = T(e), d.connected || (A.status = "正在同步"), ci.start(e));
}
async function Is(e, t) {
  const r = Ue(e), i = e.channel || "main", n = await t.wait(() => $o(r)), o = Sr(d.currentUser.avatar, se.avatarUrl), s = d.currentUser.activity || ls(), a = d.shareActivity !== !1 && s?.title ? `&act_type=${encodeURIComponent(s.type || "")}&act_title=${encodeURIComponent(s.title || "")}&act_url=${encodeURIComponent(s.url || "")}` : "", c = t.visible ? "&wait=6" : "", u = `/api/v1/sync?after=${n}&avatar=${encodeURIComponent(o)}&name=${encodeURIComponent(d.currentUser.name.slice(0, 100))}${a}${c}`;
  t.phase("连接私有服务器");
  const f = await t.wait(() => Q(e, u, "GET", void 0, t.signal));
  if (!t.current()) return;
  t.phase("校验同步页");
  let h;
  try {
    h = ys(f, e.uid, n, Date.now());
  } catch (m) {
    throw t.current() && Tr(), m;
  }
  if (t.current() && (t.phase("保存同步记录"), await t.wait(() => Do(r, h.messages, h.next)), !!t.current())) {
    try {
      await t.wait(() => mn(r, h.messages.filter((m) => m.sender.uid === e.uid).map((m) => m.id), Be));
    } catch {
      t.current() && (z.value = "无法保存消息的发送确认，请检查浏览器存储。");
    }
    if (t.current() && (t.phase("应用同步状态"), !!ws(h, { scope: r, channel: i, cursor: n, now: Date.now() }, t, {
      chat: d,
      service: A,
      authenticated: () => {
        qe = T(e);
      },
      publish: (m, g, w) => {
        for (const b of [...Xt]) {
          if (!w()) return;
          try {
            b(m, g);
          } catch {
            console.warn("[PrivateChat] message listener failed");
          }
        }
      },
      notify: ds
    }) && t.current()))
      return t.phase("处理待发消息"), ur.flush(e), { hasMore: h.hasMore };
  }
}
async function Kt(e) {
  const t = v.room && Fe(v.room);
  if (!t || !Se(t))
    return z.value = "未配置此房间的私有服务器，未发送", !1;
  e.sender && (e.sender.avatar = Sr(d.currentUser.avatar, se.avatarUrl), d.currentUser.name && (e.sender.name = d.currentUser.name));
  const r = Rt(e);
  if (!r || r.type === "system")
    return z.value = "消息格式无效，未发送", !1;
  const i = St(Lt(t), r);
  if (i)
    return z.value = i, !1;
  const n = { ...t };
  try {
    return await vr(Ue(n), [r]), await fn(Ue(n), r, [Be]), Se(n) && !d.messages.some((o) => o.id === r.id) && d.messages.push(r), z.value = "", ur.flush(n), !0;
  } catch {
    return z.value = "消息未能保存到待发队列，请勿刷新，检查存储后重试", !1;
  }
}
let Pi = !1;
function _s() {
  Pi || (Pi = !0, _e(() => [ee.isInstalled("chat"), JSON.stringify(v.room)], () => {
    const e = v.room;
    A.members = [], A.rooms = [], A.roomsSupported = !1, A.spaces = [], A.spacesSupported = !1, Tr(), A.channel = "main", (!e || !ee.isInstalled("chat")) && (d.visible = !1, A.members = []), Pe();
  }, { immediate: !0, flush: "sync" }), _e(() => d.visible, (e) => {
    e && Ur();
  }), _e(() => d.currentUser.uid, () => Pe()), ee.isInstalled("chat") && v.room && st(Ue(v.room)).catch(() => {
    z.value = "待发队列读取失败，请关闭旧标签页后重试";
  }));
}
class Ts {
  constructor() {
    _s();
  }
  connect() {
    Ur();
  }
  disconnect() {
    _t();
  }
  resetReconnectAndConnect() {
    Pe();
  }
  async retryMessage(t) {
    await Kt(t);
  }
  dispatchOutgoing(t, r) {
    if (!r) {
      Kt(t);
      return;
    }
    Gr(t, r).then(() => {
      me.fetch("海狸聊天室", `已发送到 ${r.name}`, "服务器已保存，不代表成员已读。");
    }).catch((i) => {
      me.fetch("海狸聊天室", "分享未确认", i instanceof Error ? i.message : "未确认发送结果，请检查聊天室连接。");
    });
  }
  sendWebsiteShare(t, r) {
    const i = Mt(t.url);
    if (!i) {
      me.fetch("海狸聊天室", "未发送", "只支持分享有效的 HTTP(S) 网站地址。");
      return;
    }
    const n = (t.title || "网站").slice(0, 100), o = {
      id: `msg_${crypto.randomUUID()}`,
      sender: { ...d.currentUser, activity: d.shareActivity ? d.currentUser.activity : void 0 },
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
    this.dispatchOutgoing(o, r);
  }
  async sendTextMessage(t, r) {
    const i = t.trim();
    if (!i) return !1;
    const n = {
      id: `msg_${crypto.randomUUID()}`,
      sender: { ...d.currentUser, activity: d.shareActivity ? d.currentUser.activity : void 0 },
      type: "text",
      content: i,
      timestamp: Date.now()
    };
    if (!r) return Kt(n);
    try {
      return await Gr(n, r), !0;
    } catch (o) {
      return me.fetch("海狸聊天室", "分享未确认", o instanceof Error ? o.message : "未确认发送结果，请检查聊天室连接。"), !1;
    }
  }
  sendMusicShare(t, r) {
    const i = {
      id: `msg_${crypto.randomUUID()}`,
      sender: { ...d.currentUser, activity: d.shareActivity ? d.currentUser.activity : void 0 },
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
      sender: { ...d.currentUser, activity: d.shareActivity ? d.currentUser.activity : void 0 },
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
      sender: { ...d.currentUser, activity: d.shareActivity ? d.currentUser.activity : void 0 },
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
      sender: { ...d.currentUser, activity: d.shareActivity ? d.currentUser.activity : void 0 },
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
      sender: { ...d.currentUser, activity: d.shareActivity ? d.currentUser.activity : void 0 },
      type: "image",
      content: "[图片]",
      meta: {
        imageUrl: t
      },
      timestamp: Date.now()
    };
    return Kt(r);
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
      sender: { ...d.currentUser, activity: d.shareActivity ? d.currentUser.activity : void 0 },
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
      sender: { ...d.currentUser, activity: d.shareActivity ? d.currentUser.activity : void 0 },
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
    !t.uid || t.uid === d.currentUser.uid || Cs(t.uid).then(() => {
      me.fetch("海狸聊天室", `已向【${t.name}】发送好友申请`, "对方可在聊天室右上角通知中确认。");
    }).catch((i) => {
      me.fetch("海狸聊天室", "好友申请未发送", i instanceof Error ? i.message : "请检查聊天室连接。");
    });
  }
  respondFriendRequest(t, r) {
    t.id && ks(t.id, r).then(() => {
      me.fetch("海狸聊天室", r ? `已通过【${t.from.name}】的好友申请` : "已忽略该申请", r ? "双方已成为好友，可随时点击私聊。" : "");
    }).catch((i) => {
      me.fetch("海狸聊天室", "操作未完成", i instanceof Error ? i.message : "请检查网络。");
    });
  }
}
const En = new Ts(), pc = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  chatService: En
}, Symbol.toStringTag, { value: "Module" })), Us = {
  schemaVersion: 1,
  id: "chat",
  title: "海狸聊天室",
  emoji: "💬",
  rootId: "vue-chat-dialog-root",
  settingsKeys: ["lw_chat_server_url"],
  capabilities: ["chat:message-read", "chat:message-send"],
  badgeCount: () => d.unreadCount,
  loadView: () => import("./ChatDialog-Wa2IUj6-.js").then((e) => e.default),
  lifecycle: {
    isVisible: () => d.visible,
    canOpen: () => ee.isInstalled("chat"),
    open: () => {
      ee.isInstalled("chat") && (d.visible = !0, d.unreadCount = 0, Qo.value && En.connect());
    },
    hide: () => {
      d.visible = !1;
    },
    canUnmount: () => !0
  }
};
Me(Us);
Me(ko);
Me(vo);
Me(Eo);
Me(yo);
Me(bo);
Me(ho);
Me(wo);
function Ps(e) {
  const t = e.map((r) => ({ ...r }));
  for (const r of Bi()) {
    if (r.presentation !== "card" || r.showInDock === !1) continue;
    if (t.some((o) => o.id === r.id)) throw new Error("Duplicate workspace card entry");
    const i = { id: r.id, title: r.title, icon: r.icon }, n = r.dockBefore ? t.findIndex((o) => o.id === r.dockBefore) : -1;
    t.splice(n < 0 ? t.length : n, 0, i);
  }
  return t;
}
function Ms(e) {
  const t = e.map((r) => ({ ...r }));
  for (const r of Bi()) {
    if (r.showInDock === !1 || r.presentation === "card") continue;
    if (t.some((o) => o.id === r.id)) throw new Error("Dock module duplicated in legacy tools");
    const i = { id: r.id, title: r.title, icon: r.icon, emoji: r.emoji }, n = r.dockBefore ? t.findIndex((o) => o.id === r.dockBefore) : -1;
    t.splice(n < 0 ? t.length : n, 0, i);
  }
  return t;
}
function Rs(e) {
  const t = e.find((r) => r.id === "daily-bilibili");
  return t ? [t, ...e.filter((r) => r !== t)] : [...e];
}
const Os = Rs(Ps([])), xs = Ms([]), Cn = "logicweaver_dock_custom_order", li = "logicweaver_dock_position";
function ui(e) {
  return e === "bottom" || e === "left" || e === "right" || e === "top";
}
function Ns() {
  try {
    if (typeof localStorage < "u") {
      const e = localStorage.getItem(li);
      if (ui(e)) return e;
    }
  } catch {
  }
  return "bottom";
}
function Ls(e) {
  try {
    typeof localStorage < "u" && localStorage.setItem(li, e);
  } catch {
  }
}
function dr() {
  try {
    if (typeof localStorage < "u") {
      const e = localStorage.getItem(Cn);
      if (e) return JSON.parse(e) || {};
    }
  } catch {
  }
  return {};
}
function Mi(e) {
  try {
    typeof localStorage < "u" && localStorage.setItem(Cn, JSON.stringify(e));
  } catch {
  }
}
function kn() {
  const e = xs.filter((r) => ee.isInstalled(r.id)), t = dr().tools;
  if (Array.isArray(t) && t.length > 0) {
    const r = new Map(e.map((n) => [n.id, n])), i = [];
    for (const n of t) {
      const o = r.get(n);
      o && (i.push(o), r.delete(n));
    }
    for (const n of r.values())
      i.push(n);
    return i;
  }
  return e;
}
function In() {
  const e = Os.filter((r) => ee.isInstalled(r.id)), t = dr().cards;
  if (Array.isArray(t) && t.length > 0) {
    const r = new Map(e.map((n) => [n.id, n])), i = [];
    for (const n of t) {
      const o = r.get(n);
      o && (i.push(o), r.delete(n));
    }
    for (const n of r.values())
      i.push(n);
    return i;
  }
  return e;
}
const $s = () => ({
  mounted: !1,
  get activeTargetId() {
    return Ji() || ae.activeId || "";
  },
  activeTools: [],
  cards: In(),
  tools: kn(),
  position: Ns()
}), L = F($s());
typeof window < "u" && (window.addEventListener("logicweaver:dock-modules-changed", () => {
  L.tools = kn(), L.cards = In();
}), window.addEventListener("storage", (e) => {
  e.key === li && ui(e.newValue) && (L.position = e.newValue);
}));
pr.onStateChange((e) => {
  L.activeTools = [...e];
});
let Ce = {};
function zt(e, t) {
  const r = window.chrome, i = r?.runtime?.getURL ? r.runtime.getURL(t) : t, n = e.includes("newtab") || t.includes("newtab");
  if (window.location.href.includes(e) || n && (window.location.pathname.endsWith("/newtab.html") || window.location.pathname === "/newtab.html"))
    return;
  const o = (a) => {
    const u = (a.url || a.pendingUrl || "").toLowerCase();
    return n ? u.includes("newtab.html") || u.startsWith("chrome://newtab") || u.startsWith("edge://newtab") || u.startsWith("chrome-search://local-ntp") || u.includes("chrome-extension://") && u.includes("newtab") || !!(a.title && (a.title.includes("LogicWeaver 新标签页") || a.title === "新标签页" || a.title === "New Tab")) : u.includes(e.toLowerCase());
  };
  if (r?.tabs?.query) {
    r.tabs.query({ currentWindow: !0 }, (a) => {
      const c = a.find(o);
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
  const s = document.createElement("a");
  s.href = i, s.target = "_blank", s.rel = "noreferrer", document.body.appendChild(s), s.click(), s.remove();
}
const hc = {
  getSnapshot() {
    return Ut(L);
  },
  update(e) {
    const { activeTargetId: t, ...r } = e;
    Object.assign(L, r);
  },
  setMounted(e) {
    L.mounted = e;
  },
  setActiveTools(e) {
    L.activeTools = [...e];
  },
  addActiveTool(e) {
    L.activeTools.includes(e) || L.activeTools.push(e);
  },
  removeActiveTool(e) {
    const t = L.activeTools.indexOf(e);
    t >= 0 && L.activeTools.splice(t, 1);
  },
  triggerItem(e, t) {
    const r = typeof window < "u" ? window.location.pathname + window.location.href : "", i = r.includes("bilibili.html") || r.includes("github.html") || r.includes("aihot.html") || r.includes("youtube.html");
    if (e === "home") {
      if (i) {
        zt("newtab.html", "newtab.html");
        return;
      }
      if (Ce.onHomeClick) {
        Ce.onHomeClick();
        return;
      }
      const n = document.getElementById("daily-toggle");
      n && n.classList.contains("active") && n.classList.remove("active");
      const o = ae.activeId;
      o && Pt(o), mo(ae.activeId), typeof window < "u" && window.scrollTo({ top: 0, left: 0, behavior: "instant" });
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
        const s = n[t];
        s ? zt(s, s) : zt("newtab.html", "newtab.html");
        return;
      }
      if (Ce.onTargetClick) {
        Ce.onTargetClick(t);
        return;
      }
      const o = window;
      L.activeTargetId === t ? typeof o.exitFullscreenCard == "function" && o.exitFullscreenCard() : typeof o.enterFullscreenCard == "function" && o.enterFullscreenCard(t);
      return;
    }
    if (e === "tool") {
      const n = !!document.getElementById("vue-bili-companions-root");
      if (i && !n) {
        zt("newtab.html", "newtab.html");
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
      pr.toggle(t);
      return;
    }
  },
  reorderCards(e) {
    const t = new Map(L.cards.map((n) => [n.id, n])), r = [];
    for (const n of e) {
      const o = t.get(n);
      o && (r.push(o), t.delete(n));
    }
    for (const n of t.values()) r.push(n);
    L.cards = r;
    const i = dr();
    Mi({ ...i, cards: r.map((n) => n.id) });
  },
  reorderTools(e) {
    const t = new Map(L.tools.map((n) => [n.id, n])), r = [];
    for (const n of e) {
      const o = t.get(n);
      o && (r.push(o), t.delete(n));
    }
    for (const n of t.values()) r.push(n);
    L.tools = r;
    const i = dr();
    Mi({ ...i, tools: r.map((n) => n.id) });
  },
  setPosition(e) {
    ui(e) && L.position !== e && (L.position = e, Ls(e), typeof window < "u" && window.dispatchEvent(new CustomEvent("logicweaver:dock-position-changed", { detail: e })));
  },
  setActions(e) {
    Ce = { ...Ce, ...e };
  }
}, _n = "active_wallpaper", di = "_manifest.json";
function Tn() {
  return typeof navigator < "u" && typeof navigator.storage?.getDirectory == "function";
}
async function Ds(e) {
  const t = [];
  for await (const [r, i] of e.entries())
    t.push(e.removeEntry(r, { recursive: i.kind === "directory" }));
  await Promise.all(t);
}
async function Bs(e, t) {
  let r = e;
  for (const i of t)
    !i || i === "." || (r = await r.getDirectoryHandle(i, { create: !0 }));
  return r;
}
async function js(e) {
  if (!Tn()) return !1;
  try {
    const r = await (await navigator.storage.getDirectory()).getDirectoryHandle(_n, { create: !0 });
    await Ds(r);
    const n = await (await r.getFileHandle(di, { create: !0 })).createWritable(), o = {
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
      const c = a.split("/"), u = c.pop(), m = await (await (await Bs(r, c)).getFileHandle(u, { create: !0 })).createWritable();
      await m.write(s.file), await m.close();
    }
    return !0;
  } catch (t) {
    return console.warn("[OPFS Wallpaper] 写入活跃壁纸失败，回退至 IndexedDB:", t), !1;
  }
}
async function Un(e, t = "") {
  const r = [];
  for await (const [i, n] of e.entries()) {
    if (i === di) continue;
    const o = t ? `${t}/${i}` : i;
    if (n.kind === "file") {
      const s = await n.getFile();
      r.push({
        path: o,
        file: s,
        mime: s.type || void 0
      });
    } else if (n.kind === "directory") {
      const s = await Un(n, o);
      r.push(...s);
    }
  }
  return r;
}
async function Ri() {
  if (!Tn()) return null;
  try {
    const e = await navigator.storage.getDirectory();
    let t;
    try {
      t = await e.getDirectoryHandle(_n, { create: !1 });
    } catch {
      return null;
    }
    let r;
    try {
      r = await t.getFileHandle(di, { create: !1 });
    } catch {
      return null;
    }
    const n = await (await r.getFile()).text(), o = JSON.parse(n), s = await Un(t);
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
function Jt(e) {
  (!Number.isFinite(e) || e < 0) && (e = 0);
  const t = Math.floor(e / 60), r = Math.floor(e % 60);
  return String(t).padStart(2, "0") + ":" + String(r).padStart(2, "0");
}
const Qt = typeof localStorage < "u" ? localStorage.getItem("bili_radio_mode") : null, Ws = () => ({
  active: !1,
  loading: !1,
  playing: !1,
  mode: Qt === "order" || Qt === "one" || Qt === "shuffle" ? Qt : "order",
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
}), M = F(Ws()), Pn = {
  getSnapshot() {
    return Ut(M);
  },
  update(e) {
    for (const t of Object.keys(e))
      M[t] !== e[t] && (M[t] = e[t]);
    if (typeof e.currentTime == "number" || typeof e.duration == "number") {
      const t = e.currentTime ?? M.currentTime, r = e.duration ?? M.duration, i = Jt(t), n = Jt(r);
      if (M.formattedCurrent !== i && (M.formattedCurrent = i), M.formattedDuration !== n && (M.formattedDuration = n), r > 0) {
        const o = Math.round(Math.min(100, Math.max(0, t / r * 100)) * 10) / 10;
        Math.abs(M.progressPercent - o) >= 0.2 && (M.progressPercent = o);
      } else
        M.progressPercent = 0;
    }
  },
  setProgress(e, t) {
    M.currentTime = e, M.duration = t;
    const r = Jt(e), i = Jt(t);
    if (M.formattedCurrent !== r && (M.formattedCurrent = r), M.formattedDuration !== i && (M.formattedDuration = i), t > 0) {
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
    const e = M.mode || "order", r = {
      order: "one",
      one: "shuffle",
      shuffle: "order"
    }[e] || "order";
    M.mode = r;
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
typeof window < "u" && (window.LogicWeaverBiliRadioTape = Pn);
let U = null, te = !1, fr = !1, wt = "B站电台", R = [], W = -1, V = null, zr, Mn = {}, ut = 0, Ae = "", er = null, Rn = [], tr = /* @__PURE__ */ new Set(), et = null, rr = 0, pt = Date.now(), Nr = 0;
function fi() {
  er !== null && (clearInterval(er), er = null);
}
function On(e) {
  const t = U;
  if (!t || !te || !V) return;
  const r = Rn.find((i) => !tr.has(i) && /^https?:\/\//i.test(i));
  if (!r || tr.size >= 3) {
    fi(), Ae = "音频连接中断，已尝试所有备用线路", J();
    return;
  }
  tr.add(r), et = {
    time: Number.isFinite(t.currentTime) ? t.currentTime : 0,
    paused: t.paused
  }, Ae = "网络波动，正在切换备用线路…", J(), t.src = r, t.load(), et.paused || t.play().catch(() => {
  });
}
function Vs() {
  fi(), pt = Date.now(), rr = U?.currentTime || 0, Nr = U?.buffered.length ? U.buffered.end(U.buffered.length - 1) : 0, er = setInterval(() => {
    const e = U;
    if (!e || !te || e.paused || e.ended) {
      pt = Date.now();
      return;
    }
    const t = e.currentTime, r = e.buffered.length ? e.buffered.end(e.buffered.length - 1) : 0;
    if (t !== rr || r > Nr) {
      pt = Date.now(), rr = t, Nr = r, Ae === "网络波动，正在切换备用线路…" && (Ae = "", J());
      return;
    }
    Date.now() - pt >= 8e3 && e.readyState < 3 && On();
  }, 1e3);
}
function Fs() {
  U && (pt = Date.now(), rr = U.currentTime, Ae === "网络波动，正在切换备用线路…" && (Ae = "")), J();
}
function qs() {
  const e = U;
  if (e && et) {
    const t = et;
    if (et = null, t.time > 0 && t.time < (e.duration || 1 / 0))
      try {
        e.currentTime = t.time;
      } catch {
      }
    t.paused || e.play().catch(() => {
    });
  }
  J();
}
function Hs() {
  te && U?.error && On(`音频解码或网络错误 [代码: ${U.error.code}]`);
}
function Xe() {
  return U || (U = new Audio(), U.id = "bili-radio-audio", U.preload = "auto", U.addEventListener("ended", Gs), U.addEventListener("timeupdate", Fs), U.addEventListener("play", J), U.addEventListener("pause", J), U.addEventListener("loadedmetadata", qs), U.addEventListener("error", Hs), U);
}
function Gs() {
  const e = M.mode || "order";
  if (e === "one")
    U && (U.currentTime = 0, U.play().catch(() => {
    }), J());
  else if (e === "shuffle")
    if (R.length <= 1)
      le(0);
    else {
      let t = Math.floor(Math.random() * R.length);
      t === W && R.length > 1 && (t = (W + 1) % R.length), le(t);
    }
  else
    le(W + 1);
}
function J() {
  const e = U, t = !!(e && !e.paused && !e.ended && te), r = e?.duration && Number.isFinite(e.duration) ? e.duration : V?.duration || 0, i = V?.cues?.find((o) => (e?.currentTime || 0) >= o.from && (e?.currentTime || 0) < o.to), n = Ae || i?.content || (t ? "♪ 伴奏播放中…" : V ? `已暂停 · 《${V.title}》` : "点击磁带继续播放");
  Pn.update({
    active: te,
    loading: fr,
    playing: t,
    title: V?.title || "B站电台",
    coverUrl: V?.cover || "",
    seriesName: wt,
    trackIndex: W >= 0 ? W + 1 : 1,
    totalTracks: R.length || 1,
    currentTime: e?.currentTime || 0,
    duration: r,
    lyric: n
  }), te && V && zi.syncFromBiliRadio({
    playing: t,
    title: V.title || "B站电台",
    artist: V.upper || V.author || wt || "哔哩哔哩电台",
    coverUrl: V.cover || "",
    currentTime: e?.currentTime || 0,
    duration: r,
    lyric: n,
    seriesName: wt
  });
}
async function Ks(e) {
  if (e.streamUrl || e.url) return e;
  const t = await X.getVideoView(e.bvid);
  if (!t?.cid) throw new Error("视频信息不可用");
  const r = await X.fetchAudioStream(e.bvid, t.cid);
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
async function le(e) {
  const t = Mn;
  if (!R.length || t.isCurrent?.() === !1) return;
  const r = ++ut;
  W = (e % R.length + R.length) % R.length, fr = !0, te = !0, Ae = "", fi(), et = null, Xe().pause(), J();
  try {
    const i = zr ? await zr(R[W]) : await Ks(R[W]);
    if (r !== ut || t.isCurrent?.() === !1) return;
    V = i;
    const n = i.streamUrls?.length ? i.streamUrls : i.streamUrl || i.url ? [i.streamUrl || i.url] : [], o = n[0];
    if (!o) throw new Error("没有取得视频播放地址");
    Rn = n, tr = /* @__PURE__ */ new Set([o]), Xe().src = o, Vs(), t.onReady?.(Xe()), t.autoplay !== !1 && Xe().play().catch((s) => console.warn("[BiliRadio] 播放失败", s)), i.bvid && !i.cues?.length && X.fetchVideoSubtitleDetails(i.bvid, i.cid).then((s) => {
      r === ut && s.ok && V && (V.cues = s.cues);
    }).catch(() => {
    });
  } catch (i) {
    if (r !== ut || t.isCurrent?.() === !1) return;
    te = !1, console.warn("[BiliRadio] 解析音轨失败", i), Ae = i instanceof Error ? i.message : "播放失败";
  } finally {
    r === ut && (fr = !1, t.isCurrent?.() === !1 && (te = !1), J());
  }
}
const xn = {
  playQueue(e) {
    wt = e.name || "B站电台", R = Array.isArray(e.items) ? e.items.map((t) => ({ ...t })) : [], zr = e.resolveTrack, Mn = { isCurrent: e.isCurrent, autoplay: e.autoplay, onReady: e.onReady }, le(e.startIndex || 0);
  },
  playAt(e) {
    R.length && le(e);
  },
  next() {
    if ((M.mode || "order") === "shuffle" && R.length > 1) {
      let t = Math.floor(Math.random() * R.length);
      t === W && (t = (W + 1) % R.length), le(t);
    } else
      le(W + 1);
  },
  prev() {
    if ((M.mode || "order") === "shuffle" && R.length > 1) {
      let t = Math.floor(Math.random() * R.length);
      t === W && (t = ((W - 1) % R.length + R.length) % R.length), le(t);
    } else
      le(W - 1);
  },
  toggle() {
    const e = Xe();
    if (!te && !e.src) {
      R.length > 0 && le(W >= 0 ? W : 0);
      return;
    }
    e.paused ? e.play().catch(() => {
    }) : e.pause(), J();
  },
  seek(e) {
    const t = Xe();
    Number.isFinite(t.duration) && t.duration > 0 && (t.currentTime = Math.min(100, Math.max(0, e)) / 100 * t.duration, J());
  },
  getAudioElement() {
    return U;
  },
  getState() {
    return {
      active: te,
      loading: fr,
      name: wt,
      items: R,
      index: W,
      track: V,
      currentTime: U?.currentTime || 0,
      duration: U?.duration || 0,
      playing: !!(U && !U.paused && !U.ended && te)
    };
  },
  syncTape: J
};
typeof window < "u" && (window.LogicWeaverBiliRadioPlayer = xn);
const Jr = 1024, bt = Jr / 2, ze = 64;
let oe = null, he = null, ge = null;
const Oi = /* @__PURE__ */ new WeakMap();
let xi = null, vt = null, Tt = null, mr = !1;
const Lr = new Uint8Array(bt), $r = new Uint8Array(bt), Dr = new Array(128).fill(0), Nn = new Array(128).fill(0), Ln = [];
for (let e = 0; e < ze; e++) {
  const t = Math.floor(e + Math.pow(e / ze, 3.2) * (bt - ze)), r = Math.min(
    bt - 1,
    Math.max(t, Math.floor(e + 1 + Math.pow((e + 1) / ze, 3.2) * (bt - ze) - 1))
  );
  Ln.push([t, r]);
}
function zs() {
  if (oe && he && ge) return !0;
  try {
    const e = window.AudioContext || window.webkitAudioContext;
    if (!e) return !1;
    oe = new e();
    const t = oe.createChannelSplitter(2);
    return he = oe.createAnalyser(), he.fftSize = Jr, he.smoothingTimeConstant = 0.82, ge = oe.createAnalyser(), ge.fftSize = Jr, ge.smoothingTimeConstant = 0.82, t.connect(he, 0), t.connect(ge, 1), !0;
  } catch (e) {
    return console.warn("[WE AudioVisualizer] AudioContext init failed:", e), !1;
  }
}
function Js(e) {
  if (!e || !zs() || !oe) return !1;
  try {
    let t = Oi.get(e);
    if (t || (t = oe.createMediaElementSource(e), Oi.set(e, t)), xi !== e) {
      if (he && ge) {
        try {
          t.disconnect();
        } catch {
        }
        t.connect(he), t.connect(ge);
      }
      t.connect(oe.destination), xi = e;
    }
    return !0;
  } catch {
    return !1;
  }
}
function $n() {
  const e = $.getAudioElement(), t = xn.getAudioElement();
  let r = null;
  t && !t.paused && !t.ended ? r = t : e && !e.paused && !e.ended ? r = e : r = e || t, r && Js(r);
}
function Dn() {
  if (!mr || !Tt) return;
  oe && oe.state === "suspended" && oe.resume().catch(() => {
  }), $n();
  let e = !1;
  if (he && ge) {
    he.getByteFrequencyData(Lr), ge.getByteFrequencyData($r);
    for (let t = 0; t < ze; t++) {
      const [r, i] = Ln[t];
      let n = 0, o = 0;
      for (let c = r; c <= i; c++)
        Lr[c] > n && (n = Lr[c]), $r[c] > o && (o = $r[c]);
      const s = n / 255, a = o / 255;
      Dr[t] = s, Dr[t + 64] = a, (s > 0.015 || a > 0.015) && (e = !0);
    }
  }
  try {
    Tt.postMessage({
      type: "WE_AUDIO_DATA",
      audio: e ? Dr : Nn
    }, "*");
  } catch {
  }
  vt = requestAnimationFrame(Dn);
}
function Bn(e) {
  Tt = e, !mr && ($n(), mr = !0, vt = requestAnimationFrame(Dn));
}
function jn() {
  if (mr = !1, vt !== null && (cancelAnimationFrame(vt), vt = null), Tt)
    try {
      Tt.postMessage({
        type: "WE_AUDIO_DATA",
        audio: Nn
      }, "*");
    } catch {
    }
}
const Qs = "leaf-newtab-backgrounds", Ys = 1, We = "current-background", H = "heroBackgroundHistory", Ni = 30, Yt = "assets/newtab-mountains.png", Li = 450, Br = 180 * 1024 * 1024;
let Qr = [], dt = 0, ir = null;
function $i(e) {
  return Qr.push(e), e;
}
function Wn() {
  if (ir) {
    try {
      ir();
    } catch {
    }
    ir = null;
  }
}
function Zs(e) {
  Wn();
  let t = null, r = 0, i = 0;
  const n = (c) => {
    r = c.clientX, i = c.clientY, t === null && (t = requestAnimationFrame(() => {
      t = null;
      try {
        e.postMessage({
          type: "WE_MOUSE_MOVE",
          x: r,
          y: i
        }, "*");
      } catch {
      }
    }));
  }, o = (c) => {
    try {
      e.postMessage({
        type: "WE_MOUSE_DOWN",
        x: c.clientX,
        y: c.clientY
      }, "*");
    } catch {
    }
  }, s = (c) => {
    try {
      e.postMessage({
        type: "WE_MOUSE_UP",
        x: c.clientX,
        y: c.clientY
      }, "*");
    } catch {
    }
  }, a = () => {
    const c = document.hidden;
    try {
      e.postMessage({
        type: "WE_SET_PAUSED",
        isPaused: c
      }, "*");
    } catch {
    }
    c ? jn() : Bn(e);
  };
  window.addEventListener("pointermove", n, { passive: !0 }), window.addEventListener("mousedown", o, { passive: !0 }), window.addEventListener("mouseup", s, { passive: !0 }), document.addEventListener("visibilitychange", a), ir = () => {
    t !== null && cancelAnimationFrame(t), window.removeEventListener("pointermove", n), window.removeEventListener("mousedown", o), window.removeEventListener("mouseup", s), document.removeEventListener("visibilitychange", a);
  };
}
function Xs() {
  jn(), Wn(), Qr.forEach((e) => {
    try {
      URL.revokeObjectURL(e);
    } catch {
    }
  }), Qr = [];
}
function mi() {
  return new Promise((e, t) => {
    if (typeof indexedDB > "u") {
      t(new Error("IndexedDB is not supported in this environment"));
      return;
    }
    const r = indexedDB.open(Qs, Ys);
    r.onupgradeneeded = () => {
      const i = r.result;
      i.objectStoreNames.contains("files") || i.createObjectStore("files");
    }, r.onsuccess = () => e(r.result), r.onerror = () => t(r.error);
  });
}
async function ea(e, t = We) {
  const r = await mi();
  return new Promise((i, n) => {
    const o = r.transaction("files", "readwrite");
    o.objectStore("files").put(e, t), o.oncomplete = () => {
      r.close(), i();
    }, o.onerror = () => {
      r.close(), n(o.error);
    }, o.onabort = o.onerror;
  });
}
async function ta() {
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
async function Yr(e = "hero") {
  try {
    const t = await ta();
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
async function jr(e = We) {
  try {
    const r = await mi(), i = await new Promise((n, o) => {
      const s = r.transaction("files", "readonly"), a = s.objectStore("files").get(e);
      a.onsuccess = () => n(a.result || null), s.oncomplete = () => r.close(), s.onerror = () => {
        r.close(), o(s.error);
      };
    });
    if (i) return i;
  } catch {
  }
  const t = await Yr(e);
  return t || (e === We ? Yr("hero") : null);
}
async function Di(e = We) {
  const t = await mi();
  return new Promise((r, i) => {
    const n = t.transaction("files", "readwrite");
    n.objectStore("files").delete(e), n.oncomplete = () => {
      t.close(), r();
    }, n.onerror = () => {
      t.close(), i(n.error);
    }, n.onabort = n.onerror;
  });
}
function ft(e) {
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
function Le(e) {
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
function pi(e) {
  return !!(e && (/^image\//i.test(e.type || "") || /^video\//i.test(e.type || "") || /\.(png|jpe?g|webp|gif|mp4|webm)$/i.test(e.name || "")));
}
function hi(e) {
  return String(e || "").replace(/\\/g, "/").replace(/^\.\//, "").replace(/^\/+/, "");
}
function ra(e, t) {
  const r = String(t || "").trim().replace(/^['"]|['"]$/g, "");
  if (!r || /^(?:[a-z][a-z0-9+.-]*:|#|data:|blob:)/i.test(r)) return "";
  const [i] = r.split(/[?#]/);
  if (!i) return "";
  const n = r.startsWith("/") ? "" : hi(e).split("/").slice(0, -1).join("/"), o = `${n ? n + "/" : ""}${i.replace(/^\/+/, "")}`.split("/"), s = [];
  return o.forEach((a) => {
    !a || a === "." || (a === ".." ? s.pop() : s.push(a));
  }), s.join("/").toLowerCase();
}
function ia(e, t) {
  return t.type ? t.type : /\.html?$/i.test(e) ? "text/html" : /\.css$/i.test(e) ? "text/css" : /\.m?js$/i.test(e) ? "text/javascript" : /\.png$/i.test(e) ? "image/png" : /\.jpe?g$/i.test(e) ? "image/jpeg" : /\.webp$/i.test(e) ? "image/webp" : /\.gif$/i.test(e) ? "image/gif" : /\.mp4$/i.test(e) ? "video/mp4" : /\.webm$/i.test(e) ? "video/webm" : "application/octet-stream";
}
async function na(e) {
  const t = [];
  let r = 0;
  async function i(n, o = "", s = 0) {
    if (!(s > 4 || t.length >= Li || r >= Br))
      for await (const a of n.values()) {
        if (t.length >= Li || r >= Br) break;
        const c = hi(o ? `${o}/${a.name}` : a.name);
        if (a.kind === "file") {
          const u = await a.getFile();
          r += u.size || 0, r <= Br && t.push({ path: c, file: u });
        } else a.kind === "directory" && await i(a, c, s + 1);
      }
  }
  return await i(e), t;
}
function oa(e) {
  return e.filter((t) => /(^|\/)index\.html?$/i.test(t.path) || /\.html?$/i.test(t.path)).sort((t, r) => {
    const i = (n) => /^index\.html?$/i.test(n.path) ? 0 : /(^|\/)index\.html?$/i.test(n.path) ? 1 : 2;
    return i(t) - i(r) || t.path.length - r.path.length;
  })[0] || null;
}
function Zr(e, t = []) {
  return typeof e == "string" ? /\.(png|jpe?g|webp|gif|mp4|webm|html?)($|[?#])/i.test(e) && t.push(e) : Array.isArray(e) ? e.forEach((r) => Zr(r, t)) : e && typeof e == "object" && Object.values(e).forEach((r) => Zr(r, t)), t;
}
async function sa(e) {
  const t = new Map(e.map((i) => [hi(i.path).toLowerCase(), i])), r = e.filter((i) => /(^|\/)project\.json$/i.test(i.path));
  for (const i of r)
    try {
      const n = JSON.parse(await i.file.text());
      for (const o of Zr(n)) {
        const s = t.get(ra(i.path, o));
        if (s && pi(s.file)) return s.file;
      }
    } catch {
    }
  return null;
}
function aa(e, t, r) {
  const i = r.filter((n) => !/\.(pkg|mpkg)$/i.test(n.path)).map((n) => ({ path: n.path, file: n.file, mime: ia(n.path, n.file) }));
  return { type: "web", name: e || "Web Wallpaper", entry: t.path, files: i };
}
async function ca(e) {
  const t = await na(e), r = oa(t);
  if (r) return aa(e.name, r, t);
  const i = await sa(t);
  return i || t.map((o) => o.file).filter(pi).sort((o, s) => {
    const a = (c) => /\.(mp4|webm)$/i.test(c.name) ? 0 : /\.gif$/i.test(c.name) ? 1 : /^preview\./i.test(c.name) ? 2 : /cover|thumb|poster/i.test(c.name) ? 3 : 4;
    return a(o) - a(s) || s.size - o.size;
  })[0] || null;
}
function la(e) {
  return e ? typeof e == "string" ? "自定义图片" : e.name || (e.type === "web" ? "Web Wallpaper" : "自定义背景") : "默认背景";
}
function ua(e) {
  return typeof e == "string" ? "图片" : e?.type === "web" ? "Web Wallpaper" : e?.type === "db" ? /video/i.test(e.mediaType || "") ? "视频" : "图片/GIF" : "背景";
}
const Xr = {
  async loadHistory() {
    const e = await ft([H, "heroBackground"]);
    return { history: Array.isArray(e[H]) ? e[H] : [], currentValue: e.heroBackground || null };
  },
  async addHistory(e, t = null) {
    const r = `bg-${Date.now()}-${Math.random().toString(16).slice(2)}`;
    let i = e;
    e && typeof e == "object" && (i = { ...e, storageKey: r }), t && await ea(t, r);
    const n = await ft([H, "heroBackground"]), o = Array.isArray(n[H]) ? n[H] : [], a = [{
      id: r,
      title: la(i),
      kind: ua(i),
      createdAt: Date.now(),
      value: i
    }, ...o.filter((u) => JSON.stringify(u.value) !== JSON.stringify(i))].slice(
      0,
      Ni
    ), c = o.slice(Ni - 1).filter((u) => u.value?.storageKey && u.value.storageKey !== n.heroBackground?.storageKey);
    return await Promise.all(c.map((u) => Di(u.value.storageKey))), await Le({ [H]: a }), i;
  },
  async deleteHistory(e) {
    const t = await ft([H, "heroBackground"]), r = (t[H] || []).filter((i) => i.id !== e.id);
    e.value?.storageKey && await Di(e.value.storageKey), await Le({ [H]: r }), JSON.stringify(t.heroBackground) === JSON.stringify(e.value) && await this.clearWallpaper();
  },
  async clearWallpaper() {
    const e = { type: "none" };
    await Le({ heroBackground: e });
    try {
      localStorage.setItem("lw-current-wallpaper", JSON.stringify(e));
    } catch {
    }
    await this.applyWallpaper(null);
  },
  async setMountain() {
    await Le({ heroBackground: Yt });
    try {
      localStorage.setItem("lw-current-wallpaper", JSON.stringify(Yt));
    } catch {
    }
    await this.applyWallpaper(Yt);
  },
  async setWallpaper(e) {
    await Le({ heroBackground: e });
    try {
      localStorage.setItem("lw-current-wallpaper", JSON.stringify(e));
    } catch {
    }
    await this.applyWallpaper(e);
  },
  async chooseBackgroundFile(e = "all") {
    return typeof document > "u" ? [] : new Promise((t, r) => {
      const i = document.createElement("input");
      i.type = "file", i.hidden = !0, i.multiple = !0, i.accept = e === "image" ? "image/*,.jpg,.jpeg,.png,.webp,.gif" : e === "video" ? "video/mp4,video/webm,.mp4,.webm" : "image/*,video/mp4,video/webm";
      const n = (a) => {
        i.removeEventListener("change", o), i.removeEventListener("cancel", s), i.remove(), t(a);
      }, o = () => n(Array.from(i.files || [])), s = () => n([]);
      i.addEventListener("change", o), i.addEventListener("cancel", s), document.body.appendChild(i);
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
    else if (pi(e))
      i = e, r = { type: "db", name: e.name, mediaType: e.type || "application/octet-stream" };
    else
      throw new Error("请选择 JPG、PNG、WebP、GIF、MP4 或 WebM 壁纸。");
    return r = await this.addHistory(r, i), t && (await Le({ heroBackground: r }), await this.applyWallpaper(r)), r;
  },
  async importWallpaperDirectory() {
    const e = window;
    if (!e.showDirectoryPicker) throw new Error("当前浏览器不支持直接选择 Wallpaper 文件夹。");
    const t = await e.showDirectoryPicker(), r = await ca(t);
    if (!r) throw new Error("文件夹中没有找到可用的 Web Wallpaper、图片、GIF、MP4 或 WebM。");
    return this.importBackgroundFile(r);
  },
  async applyWallpaper(e, t = null) {
    const r = ++dt;
    if (typeof document > "u") return;
    const i = document.getElementById("launcher"), n = document.getElementById("hero-background-media");
    if (!(!i || !n) && (Xs(), n.replaceChildren(), i.style.removeProperty("--launcher-image"), !!e)) {
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
          const s = await Ri();
          s?.files?.length && (o = (s.files.find((c) => c.path === s.entry) || s.files[0])?.file || null);
        }
        if (o instanceof Blob && r === dt) {
          const s = $i(URL.createObjectURL(o)), a = document.createElement("video");
          a.src = s, a.autoplay = !0, a.preload = "metadata", a.loop = !0, a.muted = !0, a.defaultMuted = !0, a.volume = 0, a.setAttribute("muted", ""), a.playsInline = !0, a.disablePictureInPicture = !0, a.setAttribute("disablepictureinpicture", ""), a.setAttribute("disableremoteplayback", ""), n.appendChild(a);
          return;
        }
      }
      if (e.type === "web") {
        let o = t;
        if ((!o || o.type !== "web") && (o = await Ri(), (!o || o.type !== "web") && (o = await jr(e.storageKey || We), o && o.type === "web" && js(o))), r !== dt) return;
        if (o?.type === "web") {
          const s = document.createElement("iframe");
          s.title = o.name || "Web Wallpaper";
          const a = typeof chrome < "u" ? chrome : null;
          s.src = a?.runtime?.getURL ? a.runtime.getURL("wallpaper-sandbox.html") : "wallpaper-sandbox.html";
          const c = setTimeout(() => {
            r === dt && s.parentNode && (console.warn("[Wallpaper] Web wallpaper timeout or failed, auto fallback to mountain"), Xr.setMountain());
          }, 1500);
          s.onload = () => {
            clearTimeout(c), s.contentWindow?.postMessage(o, "*"), s.contentWindow && (Zs(s.contentWindow), Bn(s.contentWindow));
          }, n.appendChild(s);
        } else
          Xr.setMountain();
        return;
      }
      if (e.type === "db") {
        const o = await jr(e.storageKey || We);
        if (r !== dt || !(o instanceof Blob)) return;
        const s = $i(URL.createObjectURL(o));
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
    const r = await jr(e || We);
    return t?.throwIfAborted(), r instanceof Blob ? URL.createObjectURL(r) : null;
  },
  async updateHistoryTitle(e, t) {
    const r = await ft([H]), i = Array.isArray(r[H]) ? r[H] : [];
    if (!i.some((o) => o.id === e)) throw new Error("壁纸条目已变化，请刷新");
    const n = i.map((o) => o.id === e ? { ...o, title: t.trim() || o.title } : o);
    await Le({ [H]: n });
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
        const t = await ft(["heroBackground"]);
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
        const t = await Yr("hero");
        t && (e = {
          type: "db",
          name: t.name || "当前壁纸",
          mediaType: t.type || "application/octet-stream"
        });
      }
      e || (e = Yt);
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
  t === "local" && e.heroBackground && Xr.applyWallpaper(e.heroBackground.newValue);
});
typeof document < "u" && document.addEventListener("visibilitychange", () => {
  const e = document.querySelector("#hero-background-media video");
  e && (document.hidden ? e.paused || e.pause() : e.paused && e.play().catch(() => {
  }));
});
function Wr(e) {
  const t = { group: "", positions: /* @__PURE__ */ Object.create(null) };
  try {
    const r = JSON.parse(e || "null");
    if (!r || typeof r != "object") return t;
    typeof r.group == "string" && (t.group = r.group);
    for (const [i, n] of Object.entries(r.positions || {})) {
      const o = n;
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
function da(e) {
  const t = /* @__PURE__ */ new Map();
  for (const r of e)
    r.group && t.set(r.group, (t.get(r.group) || 0) + 1);
  return [...t].map(([r, i]) => ({ name: r, count: i }));
}
function fa(e, t) {
  return Math.max(0, t !== void 0 && e.offset !== void 0 ? t - e.offset : e.top);
}
const ma = ["disabled", "aria-expanded"], pa = {
  key: 0,
  class: "lw-select-icon"
}, ha = {
  key: 0,
  class: "lw-select-groups",
  role: "group",
  "aria-label": "按厂商浏览"
}, ga = ["aria-pressed"], ya = ["aria-pressed", "onClick"], wa = {
  key: 0,
  class: "lw-select-empty"
}, ba = ["disabled", "data-select-value", "title", "aria-selected", "onClick"], va = { class: "lw-item-content" }, Sa = {
  key: 0,
  class: "lw-item-icon"
}, Aa = { class: "lw-item-text" }, Ea = {
  key: 0,
  class: "lw-item-check"
}, Ca = /* @__PURE__ */ Fn({
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
    const r = e, i = t, n = ye(!1), o = ye(null), s = ye(null), a = ye("");
    let c = Wr(null), u = !1;
    function f() {
      try {
        c = Wr(r.memoryKey ? localStorage.getItem(r.memoryKey) : null);
      } catch {
        c = Wr(null);
      }
      a.value = c.group;
    }
    f();
    function h(k = r.memoryKey) {
      const j = s.value;
      if (!j || !u) return;
      const E = [...j.querySelectorAll("[data-select-value]")], fe = j.getBoundingClientRect().top, He = E.find((Pr) => Pr.getBoundingClientRect().bottom > fe);
      if (c.group = a.value, c.positions[a.value] = {
        top: j.scrollTop,
        anchor: He?.dataset.selectValue,
        offset: He ? He.getBoundingClientRect().top - fe : void 0
      }, k)
        try {
          localStorage.setItem(k, JSON.stringify(c));
        } catch {
        }
    }
    async function m() {
      u = !1, await Kn();
      const k = s.value;
      if (!n.value || !k) return;
      const j = [...k.querySelectorAll("[data-select-value]")], E = c.positions[a.value], fe = j.find((Pr) => Pr.dataset.selectValue === (E?.anchor ?? String(r.modelValue))), He = fe ? fe.getBoundingClientRect().top - k.getBoundingClientRect().top + k.scrollTop : void 0;
      k.scrollTop = E ? fa(E, He) : Math.max(0, (He ?? 0) - k.clientHeight / 2), u = y.value.length > 0;
    }
    function g() {
      h(), n.value = !1;
    }
    async function w(k) {
      k !== a.value && (h(), a.value = k, await m(), h());
    }
    const b = ke(() => r.options.map((k) => typeof k == "object" && k !== null ? k : { value: k, label: String(k) })), S = ke(() => r.grouped ? da(b.value) : []), y = ke(() => a.value && r.grouped ? b.value.filter((k) => k.group === a.value) : b.value);
    _e(() => r.memoryKey, (k, j) => {
      h(j), f(), n.value && m();
    }), _e(b, () => {
      a.value && S.value.length && !S.value.some((k) => k.name === a.value) && (a.value = ""), n.value && m();
    }, { flush: "post" }), qn(() => h());
    const C = ke(() => b.value.find((k) => String(k.value) === String(r.modelValue))), I = ke(() => C.value?.label ?? r.placeholder);
    function q() {
      if (!r.disabled) {
        if (n.value) {
          g();
          return;
        }
        b.value.length && a.value && !S.value.some((k) => k.name === a.value) && (a.value = ""), n.value = !0, m();
      }
    }
    function O(k) {
      k.disabled || r.disabled || (g(), String(k.value) !== String(r.modelValue) && (i("update:modelValue", k.value), i("change", k.value)));
    }
    function B(k) {
      !n.value || !o.value || o.value.contains(k.target) || g();
    }
    function P(k) {
      n.value && k.key === "Escape" && g();
    }
    return Hn(() => {
      document.addEventListener("pointerdown", B, !0), window.addEventListener("keydown", P);
    }), Gn(() => {
      document.removeEventListener("pointerdown", B, !0), window.removeEventListener("keydown", P);
    }), (k, j) => (re(), ie("div", {
      ref_key: "containerRef",
      ref: o,
      class: Dt(["lw-custom-select", [`size-${e.size}`, { "is-open": n.value, "is-disabled": e.disabled }]])
    }, [
      Re("button", {
        type: "button",
        class: "lw-select-trigger",
        disabled: e.disabled,
        "aria-expanded": n.value,
        onClick: q
      }, [
        C.value?.icon ? (re(), ie("span", pa, Oe(C.value.icon), 1)) : Ge("", !0),
        Re("span", {
          class: Dt(["lw-select-label", { "is-placeholder": !C.value }])
        }, Oe(I.value), 3),
        j[2] || (j[2] = Re("span", {
          class: "lw-select-chevron",
          "aria-hidden": "true"
        }, "▾", -1))
      ], 8, ma),
      n.value ? (re(), ie("div", {
        key: 0,
        class: Dt(["lw-select-dropdown", { "is-grouped": e.grouped }])
      }, [
        S.value.length ? (re(), ie("div", ha, [
          Re("button", {
            type: "button",
            "aria-pressed": !a.value,
            onClick: j[0] || (j[0] = (E) => w(""))
          }, "全部 · " + Oe(b.value.length), 9, ga),
          (re(!0), ie(gi, null, yi(S.value, (E) => (re(), ie("button", {
            key: E.name,
            type: "button",
            "aria-pressed": a.value === E.name,
            onClick: (fe) => w(E.name)
          }, Oe(E.name) + " · " + Oe(E.count), 9, ya))), 128))
        ])) : Ge("", !0),
        Re("div", {
          ref_key: "listRef",
          ref: s,
          class: "lw-select-list",
          role: "listbox",
          onScrollPassive: j[1] || (j[1] = (E) => h())
        }, [
          y.value.length ? Ge("", !0) : (re(), ie("div", wa, " 暂无可用选项 ")),
          (re(!0), ie(gi, null, yi(y.value, (E) => (re(), ie("button", {
            key: String(E.value),
            type: "button",
            class: Dt(["lw-select-item", {
              "is-active": String(E.value) === String(e.modelValue),
              "is-disabled": E.disabled
            }]),
            disabled: E.disabled,
            "data-select-value": String(E.value),
            title: E.label,
            role: "option",
            "aria-selected": String(E.value) === String(e.modelValue),
            onClick: (fe) => O(E)
          }, [
            Re("span", va, [
              E.icon ? (re(), ie("span", Sa, Oe(E.icon), 1)) : Ge("", !0),
              Re("span", Aa, Oe(E.label), 1)
            ]),
            String(E.value) === String(e.modelValue) ? (re(), ie("span", Ea, "✓")) : Ge("", !0)
          ], 10, ba))), 128))
        ], 544)
      ], 2)) : Ge("", !0)
    ], 2));
  }
}), gc = /* @__PURE__ */ Zn(Ca, [["__scopeId", "data-v-24f4c9d8"]]);
function yc(e, t) {
  if (document.getElementById(e)) return;
  const r = document.createElement("style");
  r.id = e, r.textContent = t, document.head.appendChild(r);
}
export {
  $a as $,
  Wa as A,
  M as B,
  gc as C,
  En as D,
  mi as E,
  js as F,
  Yt as G,
  ui as H,
  tc as I,
  xr as J,
  sr as K,
  ja as L,
  ic as M,
  v as N,
  xn as O,
  rs as P,
  $ as Q,
  d as R,
  Kt as S,
  A as T,
  ki as U,
  cc as V,
  Xr as W,
  rc as X,
  Si as Y,
  Hi as Z,
  Gi as _,
  uo as a,
  Na as a0,
  La as a1,
  xa as a2,
  ao as a3,
  Da as a4,
  wn as a5,
  yr as a6,
  bn as a7,
  Es as a8,
  fc as a9,
  Ya as aA,
  Za as aB,
  za as aC,
  Ga as aD,
  ls as aE,
  lc as aF,
  it as aG,
  Ss as aH,
  oc as aI,
  As as aJ,
  ac as aK,
  pc as aL,
  uc as aa,
  mc as ab,
  dc as ac,
  ti as ad,
  Et as ae,
  Lo as af,
  Va as ag,
  tn as ah,
  Fa as ai,
  qa as aj,
  ri as ak,
  Ie as al,
  qr as am,
  Qo as an,
  Xa as ao,
  ec as ap,
  Xo as aq,
  z as ar,
  Yi as as,
  Ha as at,
  Mt as au,
  Ka as av,
  Ja as aw,
  sc as ax,
  nc as ay,
  Qa as az,
  to as b,
  X as c,
  as as d,
  eo as e,
  Wi as f,
  Di as g,
  zi as h,
  p as i,
  we as j,
  Ra as k,
  _ as l,
  hc as m,
  me as n,
  ae as o,
  xe as p,
  Ba as q,
  Pn as r,
  ei as s,
  se as t,
  go as u,
  mo as v,
  L as w,
  Oa as x,
  yc as y,
  l as z
};
