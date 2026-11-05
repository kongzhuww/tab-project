import { c as Vr, w as jt, h as H, r as be, l as tr } from "./window-manager.store-BTl-n_d_.js";
import { r as j, y as me, a as Vt, w as he, b as te, d as Wr, L as qr, D as Fr, z as Gr, o as z, g as J, C as gt, h as ve, t as Se, i as Ne, F as xi, j as Li, G as Kr } from "./vendor-vue-D8gPZiit.js";
import { c as yt, S as Hr, p as zr } from "./stickers.service-CM18JWYX.js";
import { t as wt, p as Jr } from "./module-state-CYd8scC_.js";
import { U as M, a as ni } from "./search.service-DtP_26rI.js";
import { R as Qr } from "./InlineEditStatus.vue_vue_type_style_index_0_scoped_28642927_lang-YyXyKV6C.js";
import { _ as Yr } from "./_plugin-vue_export-helper-CKPfm2Rd.js";
const Ze = "notificationHistoryV1", ir = 200, Zr = 30 * 864e5;
function Ai(e) {
  if (e?.type === "todoist-task" && typeof e.taskId == "string" && /^[A-Za-z0-9_-]{1,100}$/.test(e.taskId)) return { type: e.type, taskId: e.taskId };
  if (e?.type === "module" && typeof e.moduleId == "string" && /^[a-z][a-z0-9-]{0,60}$/.test(e.moduleId)) return { type: e.type, moduleId: e.moduleId };
  if (e?.type === "bili-messages") return { type: e.type };
  if (e?.type === "bili-video") {
    if (typeof e.bvid == "string" && /^BV[A-Za-z0-9]{10}$/.test(e.bvid)) return { type: e.type, bvid: e.bvid };
    if (typeof e.aid == "string" && /^[1-9][0-9]{0,19}$/.test(e.aid)) return { type: e.type, aid: e.aid };
  }
  if (e?.type === "github-repository" && typeof e.fullName == "string" && e.fullName.length <= 240 && /^[\w.-]+\/[\w.-]+$/.test(e.fullName) && !e.fullName.split("/").some((t) => t === "." || t === "..")) return { type: e.type, fullName: e.fullName };
}
function Xr(e) {
  if (typeof e == "string")
    try {
      const t = new URL(e);
      if (t.protocol !== "https:" || t.username || t.password || t.port || !["bilibili.com", "www.bilibili.com", "m.bilibili.com"].includes(t.hostname)) return;
      const i = /^\/video\/(BV[A-Za-z0-9]{10}|av[1-9][0-9]{0,19})\/?$/.exec(t.pathname);
      if (i) return i[1].startsWith("BV") ? { type: "bili-video", bvid: i[1] } : { type: "bili-video", aid: i[1].slice(2) };
    } catch {
    }
}
function rr(e) {
  const t = /* @__PURE__ */ new Map();
  for (const i of e.matchAll(/https:\/\/[^\s<>"']+/g)) {
    const r = Xr(i[0].replace(/[)）。，,;；]+$/, ""));
    r && t.set(JSON.stringify(r), r);
  }
  return t.size === 1 ? t.values().next().value : void 0;
}
function He(e, t) {
  return typeof e != "string" ? "" : e.slice(0, 6e3).replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g, "").replace(/\bBearer\s+[A-Za-z0-9._~+\/-]+=*/gi, "Bearer [已隐藏]").replace(/\b(?:ghp_|github_pat_|sk-)[A-Za-z0-9_-]{8,}/g, "[已隐藏]").replace(/((?:token|password|passwd|secret|api[_-]?key|authorization|cookie)\s*[:=]\s*)[^\s,;]+/gi, "$1[已隐藏]").replace(/https?:\/\/[^\s<>"']+/gi, (i) => {
    try {
      const r = new URL(i);
      return r.username = "", r.password = "", r.search = "", r.hash = "", r.href;
    } catch {
      return "[链接]";
    }
  }).slice(0, t);
}
function nr(e) {
  if (!e || typeof e.id != "string" || !/^[A-Za-z0-9_:-]{1,200}$/.test(e.id) || typeof e.title != "string" || !Number.isFinite(e.createdAt) || !["info", "success", "warning", "error"].includes(e.level)) throw new Error("Invalid notification record");
  let t = Ai(e.target);
  return e.appType === "bili" && (!t || t.type === "bili-messages") && (t = rr([e.title, e.subtitle, e.message].filter((i) => typeof i == "string").join(" ")) || t), { id: e.id, appType: He(e.appType, 40), appName: He(e.appName, 60), title: He(e.title, 160), subtitle: He(e.subtitle, 240), message: He(e.message, 2e3), level: e.level, createdAt: e.createdAt, read: e.read === !0, target: t };
}
function sr(e) {
  if (e == null) return { version: 0, items: [] };
  if (!e || !Number.isSafeInteger(e.version) || e.version < 0 || !Array.isArray(e.items) || e.items.length > ir) throw new Error("Invalid notification history");
  const t = Date.now();
  return { version: e.version, items: e.items.map(nr).filter((i) => i.createdAt >= t - Zr && i.createdAt <= t + 6e4).sort((i, r) => r.createdAt - i.createdAt) };
}
let Di = Promise.resolve();
function xe(e, t) {
  const i = Di.then(async () => {
    if (typeof chrome > "u" || !chrome.storage?.local)
      throw new Error("Chrome storage API unavailable");
    const r = await chrome.storage.local.get(Ze), n = sr(r[Ze]);
    if (e === "list")
      return n;
    if (e === "append") {
      const s = nr(t);
      s.createdAt = Date.now(), s.read = !1, n.items.some((o) => o.id === s.id) || n.items.unshift(s), n.items = n.items.slice(0, ir);
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
    return n.version++, await chrome.storage.local.set({ [Ze]: n }), n;
  });
  return Di = i.catch(() => {
  }), i;
}
const _ = j({
  isOpen: !1,
  loading: !1,
  saving: !1,
  error: "",
  version: -1,
  items: []
}), vo = me(() => _.items.filter((e) => !e.read).length);
let Bi = !1;
function Ie(e) {
  e.version < _.version || (_.version = e.version, _.items = e.items);
}
const en = {
  state: _,
  start() {
    Bi || (Bi = !0, typeof chrome < "u" && chrome.storage?.onChanged && chrome.storage.onChanged.addListener((e, t) => {
      if (!(t !== "local" || !e[Ze]))
        try {
          Ie(sr(e[Ze].newValue));
        } catch {
          _.error = "通知历史格式异常，未覆盖当前记录。";
        }
    }), this.refresh());
  },
  async refresh() {
    _.loading = !0;
    try {
      const e = await xe("list");
      Ie(e), _.error = "";
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
        const t = await xe("read", e);
        Ie(t), _.error = "";
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
        const e = await xe("read-all");
        Ie(e), _.error = "";
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
        const t = await xe("remove", e);
        Ie(t), _.error = "";
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
        const e = await xe("clear");
        Ie(e), _.error = "";
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
    const t = Ai(e);
    if (t)
      try {
        if (t.type === "todoist-task") {
          const { openTodoistTask: i } = await import("./task-navigation-BsfmAB8d.js");
          i(t.taskId);
        } else if (t.type === "github-repository") {
          const { githubRepoDetailController: i } = await import("./search.service-DtP_26rI.js").then((r) => r.a4);
          i.open(t.fullName);
        } else if (t.type === "bili-video") {
          const { biliMiniPlayerController: i } = await Promise.resolve().then(() => cs);
          await i.openVideo({ bvid: t.bvid, aid: t.aid });
        } else if (t.type === "bili-messages") {
          const { biliMessagePanelController: i } = await import("./message-panel-store-C4SMHq1f.js");
          i.openPanel();
        } else {
          const { getDockModule: i } = await import("./window-manager.store-BTl-n_d_.js").then((n) => n.m);
          if (!i(t.moduleId)) throw new Error();
          const { windowManagerController: r } = await import("./window-manager.store-BTl-n_d_.js").then((n) => n.n);
          r.open(t.moduleId);
        }
        this.close();
      } catch {
        _.error = "通知对应页面暂不能打开，记录已保留。";
      }
  }
};
function tn(e) {
  en.start(), xe("append", e).then((t) => Ie(t)).catch(() => {
    _.error = "有一条通知未获持久保存确认。";
  });
}
const ce = j([]), bt = /* @__PURE__ */ new Map();
function rn(e, t) {
  return e.history !== void 0 ? e.history : e.level === "warning" || e.level === "error" || /失败|错误|异常|未确认|未获确认|未保存|无法|不可用|拒绝|超时|警告|到期|时间已到/.test(t) ? !0 : /复制成功|已复制|保存成功|已保存|设置成功|已更新设置|配置已更新|已设为|已取消|已切换/.test(t) || /^(正在|开始读取|加载中|同步中)/.test(t) ? !1 : e.appType === "chat" || e.appType === "bili" || /提醒|任务已创建|任务完成|已完成任务|任务结果|下载完成|新消息|新私信|新回复|新提及|有可用更新/.test(t);
}
const ji = {
  chat: { name: "海狸聊天室", icon: "assets/icon-48.png", action: "查看消息" },
  bili: { name: "哔哩哔哩", icon: "assets/bilibili.svg", action: "查看消息" },
  phone: { name: "手机文件", icon: "assets/nav-traffic.svg", action: "复制文件" },
  fetch: { name: "LogicWeaver", icon: "assets/icon-48.png", action: "" }
};
function Rt(e) {
  const t = ce.find((i) => i.id === e);
  !t || t.closing || (t.closing = !0, window.setTimeout(() => {
    const i = ce.findIndex((r) => r.id === e);
    i >= 0 && ce.splice(i, 1);
  }, 260));
}
function nn() {
  for (const e of ce) Rt(e.id);
}
function or(e) {
  if (!e) return null;
  const t = e.appType || "fetch", i = ji[t] || ji.fetch, r = String(e.title || "新消息通知"), n = String(e.subtitle || ""), s = String(e.message || ""), o = Ai(e.target) || (t === "bili" ? rr(`${r} ${n} ${s}`) : void 0), a = Math.max(500, Number(e.duration) || 7e3), c = String(e.id || `${t}_${r}_${n}_${s}`).trim(), d = Date.now();
  for (const [S, y] of bt)
    d - y > 3e4 && bt.delete(S);
  const f = e.id ? 200 : a <= 4e3 ? 1200 : 3e3, h = bt.get(c);
  if (h && d - h < f || ce.some((S) => S.fingerprint === c && !S.closing)) return null;
  bt.set(c, d);
  const m = `toast_${crypto.randomUUID()}`, g = {
    id: m,
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
  ce.push(g);
  const w = r + " " + n + " " + s;
  if (rn(e, w)) {
    const S = e.level || (/失败|错误|异常|未确认|未获确认|无法|超时/.test(w) ? "error" : "info"), y = o || (t === "chat" ? { type: "module", moduleId: "chat" } : void 0);
    tn({ id: m, appType: t, appName: g.appName, title: r, subtitle: n, message: s, level: S, createdAt: d, read: !1, target: y });
  }
  const b = ce.filter((S) => !S.closing);
  return b.length > 5 && Rt(b[0].id), Object.freeze({ id: m, close: () => Rt(m) });
}
function sn(e, t, i = "", r = "assets/logo.png", n = 3200) {
  return or({ appType: "fetch", appName: e, title: t, subtitle: i, icon: r, duration: n, showActions: !1, actionLabel: "" });
}
const So = Vt(ce), se = Object.freeze({
  show: or,
  fetch: sn,
  close: Rt,
  clear: nn,
  get size() {
    return ce.filter((e) => !e.closing).length;
  }
}), vt = "https://monster-siren.hypergryph.com/api", St = "msFavoriteSongs";
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
      const t = await chrome.storage.local.get([St]);
      t[St] && (this.favorites = t[St]);
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
    const i = await (await fetch(`${vt}/songs`, { headers: { Accept: "application/json" } })).json();
    return (i.data?.list || i.data || []).map((n) => ({
      cid: n.cid,
      name: n.name,
      artists: n.artists || [],
      albumCid: n.albumCid,
      coverUrl: n.albumCid && this.albumCoverMap.get(String(n.albumCid)) || ""
    }));
  }
  async getSirenAlbums() {
    const n = ((await (await fetch(`${vt}/albums`, { headers: { Accept: "application/json" } })).json()).data || []).map((s) => ({
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
    const n = await (await fetch(`${vt}/album/${t}/detail`, { headers: { Accept: "application/json" } })).json(), s = n.data?.songs || [], o = n.data?.coverUrl || "", a = s.map((c) => ({
      cid: c.cid,
      name: c.name,
      artists: c.artists || c.artistes || [],
      albumCid: t,
      coverUrl: o
    }));
    return this.albumDetailCache.set(i, a), a;
  }
  async getSirenSongUrl(t) {
    const r = await (await fetch(`${vt}/song/${t}`, { headers: { Accept: "application/json" } })).json();
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
      if (t.isNetease && t.neteaseId ? s = await M.getSongAudioUrl(t.neteaseId) : s = (await this.getSirenSongUrl(t.cid)).sourceUrl, !n()) return !1;
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
    M.addRecentSong(t);
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
    typeof chrome < "u" && chrome.storage?.local && chrome.storage.local.set({ [St]: this.favorites });
  }
}
const $ = Le.getInstance(), ae = j({ visible: !1, pendingWrites: 0 }), fi = /* @__PURE__ */ new Set();
function Ao(e) {
  return fi.add(e), () => {
    fi.delete(e);
  };
}
function on() {
  for (const e of fi) e();
}
async function ko(e) {
  ae.pendingWrites++;
  try {
    return await e();
  } finally {
    ae.pendingWrites--;
  }
}
const ar = "netease_cached_playlists", cr = "netease_cached_favorites_songs", Ve = /* @__PURE__ */ new Map(), We = /* @__PURE__ */ new Map();
let Ot;
function Vi(e) {
  const t = We.get(e);
  if (t) return t;
  try {
    const i = localStorage.getItem(e), r = Ve.get(e);
    if (r?.raw === i) return r.value;
    const n = i ? JSON.parse(i) : [], s = Array.isArray(n) ? n : [];
    return Ve.set(e, { raw: i, value: s }), s;
  } catch {
    return [];
  }
}
function lr() {
  clearTimeout(Ot), Ot = void 0;
  for (const [e, t] of We)
    try {
      const i = JSON.stringify(t);
      localStorage.getItem(e) !== i && localStorage.setItem(e, i), Ve.set(e, { raw: i, value: t });
    } catch {
      Ve.delete(e);
    }
  We.clear();
}
function Co(e, t) {
  We.set(e, t), Ot === void 0 && (Ot = setTimeout(lr, 250));
}
function Io(e) {
  We.delete(e), Ve.delete(e);
  try {
    localStorage.removeItem(e);
  } catch {
  }
}
typeof window < "u" && (window.addEventListener("pagehide", lr), window.addEventListener("storage", (e) => {
  if (e.storageArea === localStorage)
    for (const t of [ar, cr])
      (e.key === null || e.key === t) && (Ve.delete(t), We.delete(t));
}));
function De(e) {
  return (!Number.isFinite(e) || e < 0) && (e = 0), Math.floor(e / 60) + ":" + String(Math.floor(e % 60)).padStart(2, "0");
}
const Eo = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Ccircle cx='32' cy='32' r='30' fill='%231e1e24'/%3E%3Ctext x='32' y='38' fill='%23ec4141' font-size='22' text-anchor='middle'%3E%E2%99%AC%3C/text%3E%3C/svg%3E", an = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Cdefs%3E%3CradialGradient id='msrVinyl' cx='50%25' cy='50%25' r='50%25'%3E%3Cstop offset='0%25' stop-color='%2327272a'/%3E%3Cstop offset='70%25' stop-color='%2309090b'/%3E%3Cstop offset='100%25' stop-color='%23000000'/%3E%3C/radialGradient%3E%3C/defs%3E%3Ccircle cx='32' cy='32' r='31' fill='url(%23msrVinyl)' stroke='%233f3f46' stroke-width='1.5'/%3E%3Ccircle cx='32' cy='32' r='24' fill='none' stroke='%2327272a' stroke-width='1' stroke-dasharray='3 2'/%3E%3Ccircle cx='32' cy='32' r='18' fill='none' stroke='%2318181b' stroke-width='1'/%3E%3Ccircle cx='32' cy='32' r='11' fill='%23f59e0b' opacity='0.9'/%3E%3Ccircle cx='32' cy='32' r='4' fill='%2309090b'/%3E%3Ccircle cx='32' cy='32' r='1.5' fill='%23fafafa'/%3E%3C/svg%3E", cn = () => ({
  mounted: !1,
  playing: !1,
  title: "点击播放",
  artist: "作者",
  coverUrl: an,
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
  neteaseRecentSongs: M.getRecentSongs(),
  neteaseQrImg: "",
  neteaseQrStatus: "",
  neteaseLoading: !1
}), p = j(cn());
let N = {};
const ln = {
  getSnapshot() {
    return Vt(p);
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
    p.currentTime = e, p.duration = t, p.formattedCurrent = De(e), p.formattedDuration = De(t), t > 0 ? p.progressPercent = Math.min(100, Math.max(0, e / t * 100)) : p.progressPercent = 0;
  },
  setLiked(e) {
    p.liked = e;
  },
  setMode(e) {
    p.mode = e;
  },
  togglePicker(e) {
    e !== void 0 ? ae.visible = e : ae.visible = !ae.visible;
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
    N = { ...N, ...e };
  },
  playTrack(e) {
    p.isBiliRadio = !1;
    const t = window;
    if (t.LogicWeaverBiliRadioPlayer?.getState?.()?.playing && t.LogicWeaverBiliRadioPlayer.toggle(), N.playCid)
      N.playCid(e);
    else {
      const i = p.activeAlbum?._songs || [], n = [...p.songs, ...p.favorites, ...i].find((s) => String(s.cid) === String(e));
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
    N.togglePlay ? N.togglePlay() : ($.togglePlay(), window.dispatchEvent(new CustomEvent("logicweaver:music-toggle-play")));
  },
  prev() {
    if (p.isBiliRadio) {
      const e = window;
      if (typeof e.LogicWeaverBiliRadioPlayer?.prev == "function") {
        e.LogicWeaverBiliRadioPlayer.prev();
        return;
      }
    }
    N.prev ? N.prev() : ($.prev(), window.dispatchEvent(new CustomEvent("logicweaver:music-prev")));
  },
  next() {
    if (p.isBiliRadio) {
      const e = window;
      if (typeof e.LogicWeaverBiliRadioPlayer?.next == "function") {
        e.LogicWeaverBiliRadioPlayer.next();
        return;
      }
    }
    N.next ? N.next() : ($.next(), window.dispatchEvent(new CustomEvent("logicweaver:music-next")));
  },
  toggleLike() {
    if (N.toggleLike)
      N.toggleLike();
    else {
      const e = $.getState().currentSong;
      e && (p.liked = $.toggleLike(e), p.favorites = $.getFavorites()), window.dispatchEvent(new CustomEvent("logicweaver:music-toggle-like"));
    }
  },
  cycleMode() {
    if (N.cycleMode)
      N.cycleMode();
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
    N.seek ? N.seek(e) : ($.seek(e), window.dispatchEvent(new CustomEvent("logicweaver:music-seek", { detail: { percent: e } })));
  },
  openPanel() {
    N.openPanel ? N.openPanel() : (ln.togglePicker(!0), window.dispatchEvent(new CustomEvent("logicweaver:music-open-panel")));
  },
  openNetease() {
    p.pickerTab = "netease", p.pickerOpen = !0, p.activeAlbum = null, this.loadNeteaseData();
  },
  async loadNeteaseData() {
    p.neteaseUser = M.getUser(), p.neteaseRecentSongs = M.getRecentSongs(), p.neteaseLoading = !0;
    try {
      const [e] = await Promise.all([
        M.getPlaylists(),
        M.fetchAccountRecentSongs(60).catch(() => [])
      ]);
      if (p.neteasePlaylists = e, p.neteaseRecentSongs = M.getRecentSongs(), e.length > 0) {
        const t = e.find((i) => i.name.includes("喜欢的音乐") || i.name.includes("Favorite")) || e[0];
        (!p.neteaseActivePlaylist || p.neteaseActivePlaylist.id !== t.id) && await this.selectNeteasePlaylist(t);
      }
    } catch (e) {
      console.warn("[MusicStore] Load netease playlists error:", e);
    } finally {
      p.neteaseLoading = !1, p.neteaseRecentSongs = M.getRecentSongs();
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
          const i = await M.getPlaylistTracks(e.id, 10, 0);
          p.neteaseActivePlaylist?.id === e.id && !p.neteaseSongs.length && (p.neteaseSongs = i, p.neteaseLoading = !1);
        } catch {
        }
      const t = await M.getPlaylistTracks(e.id, 500, 0);
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
      const i = await M.searchSongs(t);
      p.neteaseSearchResults = i;
    } catch (i) {
      console.warn("[MusicStore] Search netease error:", i);
    } finally {
      p.neteaseLoading = !1;
    }
  },
  syncFromBiliRadio(e) {
    p.isBiliRadio = !0, p.isNetease = !1, p.playing = e.playing, p.title = e.title || "B站电台", p.artist = e.artist || e.seriesName || "哔哩哔哩", e.coverUrl && (p.coverUrl = e.coverUrl), p.currentTime = e.currentTime, p.duration = e.duration, p.formattedCurrent = De(e.currentTime), p.formattedDuration = De(e.duration), p.progressPercent = e.duration > 0 ? Math.min(100, Math.max(0, e.currentTime / e.duration * 100)) : 0, p.currentLyric = e.lyric || "", p.biliRadioSeriesName = e.seriesName || "";
    const t = $.getAudioElement();
    e.playing && t && !t.paused && t.pause();
  },
  playNeteaseTrack(e) {
    p.isBiliRadio = !1;
    const t = window;
    t.LogicWeaverBiliRadioPlayer?.getState?.()?.playing && t.LogicWeaverBiliRadioPlayer.toggle(), e && (M.recordRecentSong(e), p.neteaseRecentSongs = M.getRecentSongs()), $.playNeteaseSong(e);
  },
  clearNeteaseRecent() {
    M.clearRecentSongs().catch(() => console.warn("[MusicStore] Recent history removal failed; re-read before retry"));
  },
  refreshRecentSongs() {
    p.neteaseRecentSongs = M.getRecentSongs();
  },
  stopNeteaseQrLogin() {
  },
  async startNeteaseQrLogin() {
    this.stopNeteaseQrLogin();
    try {
      await M.connectWebsiteAccount(), p.neteaseQrStatus = "官网账户已连接", await this.loadNeteaseData();
    } catch (e) {
      p.neteaseQrStatus = e?.message || "请先在网易云官网登录。";
    }
  },
  async logoutNetease() {
    await M.logout(), p.neteaseUser = null, p.neteasePlaylists = [], p.neteaseActivePlaylist = null, p.neteaseSongs = [], p.neteaseSearchResults = [];
  }
};
typeof window < "u" && (window.addEventListener("netease:account-updated", () => {
  p.neteaseUser = M.getUser(), p.neteasePlaylists = [], p.neteaseSongs = [], p.neteaseSearchResults = [], p.neteaseActivePlaylist = null;
}), window.addEventListener("netease:recent-updated", (e) => {
  Array.isArray(e.detail) ? p.neteaseRecentSongs = e.detail : p.neteaseRecentSongs = M.getRecentSongs();
}), $.subscribe((e) => {
  p.playing = e.playing, p.currentTime = e.currentTime, p.duration = e.duration, p.formattedCurrent = De(e.currentTime), p.formattedDuration = De(e.duration), e.duration > 0 ? p.progressPercent = Math.min(100, Math.max(0, e.currentTime / e.duration * 100)) : p.progressPercent = 0, p.mode = e.mode, p.isNetease = !!e.currentSong?.isNetease, p.currentLyric = e.currentLyric || "", e.currentSong && (p.title = e.currentSong.name || "点击播放", p.artist = (e.currentSong.artists || []).join(", ") || "作者", p.coverUrl = e.currentSong.coverUrl || "", p.liked = $.isLiked(e.currentSong.cid));
}));
async function _o() {
  try {
    if (p.favorites = $.getFavorites(), p.neteaseRecentSongs = M.getRecentSongs(), p.neteaseUser = M.getUser(), typeof localStorage < "u")
      try {
        const i = Vi(cr);
        if (i.length) {
          const n = i;
          Array.isArray(n) && n.length > 0 && p.neteaseSongs.length === 0 && (p.neteaseSongs = n);
        }
        const r = Vi(ar);
        if (r.length) {
          const n = r;
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
const Y = j({
  avatarUrl: "assets/bilibili.svg",
  userName: "哔哩哔哩用户",
  buttonTitle: "通知中心"
}), un = () => ({
  mounted: !1,
  visible: !1,
  x: 0,
  y: 0,
  avatarUrl: "assets/bilibili.svg",
  userName: "用户"
}), Ae = j(un());
let G = {};
const dn = {
  getSnapshot() {
    return Vt(Ae);
  },
  update(e) {
    Object.assign(Ae, e);
  },
  setMounted(e) {
    Ae.mounted = e;
  },
  open(e, t) {
    Ae.x = e, Ae.y = t, Ae.visible = !0;
    const i = document.getElementById("bili-profile-menu");
    i && (i.hidden = !1, i.style.left = `${Math.min(window.innerWidth - 205, e)}px`, i.style.top = `${Math.min(window.innerHeight - 150, t)}px`);
  },
  close() {
    Ae.visible = !1;
    const e = document.getElementById("bili-profile-menu");
    e && (e.hidden = !0);
  },
  trigger(e) {
    if (dn.close(), G.onAction) {
      G.onAction(e);
      return;
    }
    e === "messages" && G.showInfo ? G.showInfo() : e === "refresh" && G.refresh ? G.refresh() : e === "switch" && G.switchUser ? G.switchUser() : e === "web" && G.openWeb ? G.openWeb() : window.dispatchEvent(new CustomEvent("logicweaver:profile-menu-action", { detail: { action: e } }));
  },
  setActions(e) {
    G = { ...G, ...e };
  }
}, Wi = [
  "todoist",
  "card-github",
  "daily-aihot",
  "daily-bilibili",
  "daily-youtube"
], Nt = "lw_active_card";
function fn() {
  try {
    if (typeof localStorage < "u" && localStorage.removeItem(Nt), typeof window < "u" && window.location?.hash) {
      const e = window.location.hash.replace(/^#/, "");
      if (Wi.includes(e))
        return e;
    }
    if (typeof sessionStorage < "u") {
      const e = sessionStorage.getItem(Nt);
      if (e && Wi.includes(e))
        return e;
    }
  } catch {
  }
  return null;
}
const Z = j({
  activeId: fn()
});
typeof window < "u" && he(
  () => Z.activeId,
  (e) => {
    try {
      e ? (sessionStorage.setItem(Nt, e), window.location.hash !== `#${e}` && history.replaceState(null, "", `#${e}`)) : (sessionStorage.removeItem(Nt), window.location.hash && history.replaceState(null, "", window.location.pathname + window.location.search));
    } catch {
    }
  },
  { immediate: !0 }
);
let $t;
function Uo(e) {
  $t = e;
}
function Wt(e) {
  if (!$t) throw new Error("Fullscreen card host not ready");
  $t.enter(e);
}
function ct(e) {
  Z.activeId === e && $t?.exit();
}
function mn(e) {
  typeof document > "u" || (document.documentElement?.classList.remove("has-card-fullscreen"), document.body && (document.body.classList.toggle("has-card-fullscreen", !!e), document.body.dataset.page = e ? "daily" : "home"));
}
const pn = {
  "bilibili.html": "daily-bilibili",
  "github.html": "card-github",
  "aihot.html": "daily-aihot",
  "youtube.html": "daily-youtube"
};
function ur() {
  return typeof location > "u" ? null : pn[location.pathname.split("/").pop() || ""] || null;
}
const To = me(() => {
  const e = ur() || Z.activeId;
  if (e) return e;
  const t = Vr.activeId;
  return t && jt.isActive(t) ? t : "home";
}), hn = {
  schemaVersion: 1,
  id: "card-github",
  title: "github插件",
  icon: "assets/nav-github.svg",
  presentation: "card",
  dockBefore: "daily-aihot",
  rootId: "card-github",
  settingsKeys: ["ghUser", "ghToken", "ghAiServiceConfigV1", "ghArchifyWebhookUrl"],
  capabilities: ["workspace:fullscreen", "view:retained", "github:repositories"],
  loadView: () => import("./GitHubWorkspaceCard-lLpYNsL5.js").then((e) => e.default),
  lifecycle: {
    isVisible: () => Z.activeId === "card-github",
    open: () => Wt("card-github"),
    hide: () => ct("card-github"),
    // Existing card menus do not expose Quit/Reload. Do not introduce a destructive new path
    // until settings drafts and every child editor provide an aggregate unmount guard.
    canUnmount: () => !1,
    unmountBlockedMessage: "GitHub 工作区保留原有隐藏保活设计；尚未开放独立退出/重载，以免丢失草稿。"
  }
}, gn = j({
  showWeather: !0,
  showSites: !0,
  showBili: !0,
  showYouTube: !0,
  showTodo: !0,
  showBookmarkPanel: !0
}), yn = {
  schemaVersion: 1,
  id: "daily-youtube",
  title: "youtube插件",
  icon: "assets/nav-youtube.svg",
  presentation: "card",
  rootId: "daily-youtube",
  showInDock: !0,
  settingsKeys: ["youtubeModuleSettingsV1"],
  capabilities: ["workspace:fullscreen", "view:retained", "youtube:recommendations", "youtube:favorites"],
  loadView: () => import("./YouTubeCard-CO3DPxLi.js").then((e) => e.Y).then((e) => e.default),
  lifecycle: {
    // Match the original retained-mount condition, including the shared homepage preference.
    isVisible: () => Z.activeId === "daily-youtube" && gn.showYouTube,
    open: () => Wt("daily-youtube"),
    hide: () => ct("daily-youtube"),
    // Preserve existing card menus. Settings drafts and shared writes are not yet
    // aggregated into a safe independent Quit/Reload guard.
    canUnmount: () => !1,
    unmountBlockedMessage: "YouTube 工作区保留原有隐藏保活设计；尚未开放独立退出/重载，以免丢失设置草稿或打断收藏操作。"
  }
}, wn = {
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
  loadView: () => import("./BilibiliWorkspace-CtCiCVrp.js").then((e) => e.default),
  lifecycle: {
    isVisible: () => Z.activeId === "daily-bilibili",
    open: () => Wt("daily-bilibili"),
    hide: () => ct("daily-bilibili"),
    // Hide must not dispose shared radio/player state or interrupt folder/cache operations.
    canUnmount: () => !1,
    unmountBlockedMessage: "B站收藏保留原有隐藏保活设计；尚未开放独立退出/重载，以免打断播放、收藏或缓存操作。"
  }
}, bn = {
  schemaVersion: 1,
  id: "daily-aihot",
  title: "ai hot插件",
  icon: "assets/nav-aihot.svg",
  presentation: "card",
  rootId: "daily-aihot",
  // Existing localStorage preferences; registration neither reads nor migrates them.
  settingsKeys: ["lw-info-feed-view", "lw-aihot-feed-cat", "lw-aihot-feed-window"],
  capabilities: ["workspace:fullscreen", "view:retained", "aihot:aggregate"],
  loadView: () => import("./AihotFeed-Co-m9Z75.js").then((e) => e.default),
  lifecycle: {
    isVisible: () => Z.activeId === "daily-aihot",
    open: () => Wt("daily-aihot"),
    hide: () => ct("daily-aihot"),
    // Keep the original retained card. Its view owns list activity;
    // the separate article reader is not owned or closed by this module.
    canUnmount: () => !1,
    unmountBlockedMessage: "AI HOT 保留原有隐藏保活设计；尚未开放独立退出/重载。"
  }
}, vn = {
  schemaVersion: 1,
  id: "stickers",
  title: "表情包模块",
  emoji: "😺",
  // Keep the chat picker's library management window without a standalone Dock entry.
  showInDock: !1,
  rootId: "vue-stickers-dialog-root",
  settingsKeys: Hr,
  capabilities: ["folder:explicit-permission", "image:explicit-save-delete", "image:local-preview", "image:clipboard"],
  loadView: () => import("./StickersDialog-DvZQJ06V.js").then((e) => e.default),
  lifecycle: {
    isVisible: () => yt.visible,
    open: () => {
      yt.visible = !0;
    },
    hide: () => {
      yt.visible = !1, zr();
    },
    canUnmount: () => yt.pendingWrites === 0,
    unmountBlockedMessage: "图片保存/删除、目录授权或偏好正在处理，暂不能退出/重载；可以先隐藏，已提交操作不会撤回。"
  }
}, Sn = "neteaseApiUrl", An = [Sn], kn = {
  schemaVersion: 1,
  id: "music",
  title: "网易云模块",
  icon: "assets/netease.svg",
  rootId: "vue-music-workspace-root",
  settingsKeys: An,
  capabilities: ["catalog:read", "settings:endpoint", "account:explicit-login-logout", "playback:shared-home-controls"],
  loadView: () => import("./NeteaseWorkspaceDialog-hzxzGexK.js").then((e) => e.default),
  lifecycle: {
    isVisible: () => ae.visible,
    open: () => {
      ae.visible = !0;
    },
    hide: () => {
      ae.visible = !1, on();
    },
    canUnmount: () => ae.pendingWrites === 0,
    unmountBlockedMessage: "节点保存、登录确认/退出或记录写入正在处理，暂不能退出/重载；可以隐藏。退出窗口不会停止首页播放。"
  }
}, Cn = Object.freeze([
  "todoistToken",
  "todoistActiveProjectIdV1"
]), In = {
  schemaVersion: 1,
  id: "todoist",
  title: "todoist",
  icon: "assets/nav-todoist.svg",
  dockBefore: "stickers",
  rootId: "todoist",
  settingsKeys: Cn,
  capabilities: ["view:retained", "tasks:read-write", "attachments:explicit-upload", "settings:account-rules", "calendar:shared"],
  loadView: () => import("./TodoistWorkspace-Cz8wj3KG.js").then((e) => e.default),
  lifecycle: {
    isVisible: () => wt.visible,
    open: () => {
      wt.visible = !0;
    },
    hide: () => {
      wt.visible = !1, Jr();
    },
    canUnmount: () => wt.pendingWrites === 0,
    unmountBlockedMessage: "任务、附件、评论或配置正在写入，暂不能退出/重载；可以隐藏。首页限时任务和独立日历不会随窗口退出停止。"
  }
}, En = 1, _n = 1, Un = { text: { legacy: !0 }, image: { legacy: !1 }, music: { legacy: !0 }, bilibili: { legacy: !0 }, github: { legacy: !0 }, bili_series: { legacy: !0 }, aihot: { legacy: !0 }, youtube: { legacy: !0 }, website: { legacy: !0 }, server_invite: { legacy: !0 }, music_party: { legacy: !0 } }, Tn = ["image/png", "image/jpeg", "image/gif", "image/webp"], Pn = { messageBytes: 262144, imageMessageBytes: 2097152, imageBytes: 1048576, textChars: 8e3, imageMaxDimension: 8192, imageMaxPixels: 16777216 }, Fe = {
  schema: En,
  protocol: _n,
  messageTypes: Un,
  imageMimeTypes: Tn,
  limits: Pn
};
function Mn(e) {
  try {
    if (e.length > Math.ceil(Fe.limits.imageBytes / 3) * 4 + 64) return;
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
const Rn = Fe.protocol, pe = Object.freeze({ ...Fe.limits }), mi = Object.freeze(Object.keys(Fe.messageTypes)), pi = Object.freeze([...Fe.imageMimeTypes]), X = (e) => !!e && typeof e == "object" && !Array.isArray(e), si = (e) => typeof e == "number" && Number.isSafeInteger(e) && e > 0;
function qt() {
  return { status: "unknown", reason: "请先完成当前服务器的身份同步，再发送消息。", messageTypes: [], imageMimeTypes: [], limits: { ...pe } };
}
function At() {
  return { ...qt(), status: "incompatible", reason: "服务端消息能力格式无效或协议版本不兼容，请服主核对前后端版本；待发内容已保留。" };
}
function On(e) {
  if (e === void 0 || X(e) && !("schema" in e) && !("protocol" in e) && !("messageTypes" in e) && !("limits" in e)) {
    if (e !== void 0 && !X(e)) return At();
    const n = X(e) && e.imageMessages === 1;
    return X(e) && e.maxImageBytes !== void 0 && !si(e.maxImageBytes) ? At() : {
      status: "legacy",
      reason: n ? "" : "此旧版服务端未声明图片能力，请服主升级；待发图片已保留。",
      messageTypes: mi.filter((s) => s === "image" ? n : Fe.messageTypes[s].legacy),
      imageMimeTypes: n ? [...pi] : [],
      limits: { ...pe, imageBytes: n && X(e) && si(e.maxImageBytes) ? Math.min(e.maxImageBytes, pe.imageBytes) : pe.imageBytes }
    };
  }
  if (!X(e) || e.schema !== 1 || e.protocol !== Rn || !X(e.limits) || !Array.isArray(e.messageTypes) || e.messageTypes.length > 64 || e.messageTypes.some((n) => typeof n != "string") || !Array.isArray(e.imageMimeTypes) || e.imageMimeTypes.length > 16 || e.imageMimeTypes.some((n) => typeof n != "string")) return At();
  const t = { ...pe };
  for (const n of Object.keys(t)) {
    const s = e.limits[n];
    if (!si(s)) return At();
    t[n] = Math.min(t[n], s);
  }
  const i = pi.filter((n) => e.imageMimeTypes.includes(n)), r = mi.filter((n) => e.messageTypes.includes(n) && (n !== "image" || e.imageMessages === 1 && i.length > 0));
  return { status: "supported", reason: r.includes("image") ? "" : "此服务端未启用兼容的图片消息，待发图片已保留。", messageTypes: r, imageMimeTypes: i, limits: t };
}
function Nn(e, t = pe, i = pi) {
  if (typeof e != "string" || e.length > Math.ceil(t.imageBytes / 3) * 4 + 32) return !1;
  const r = /^data:(image\/[a-z0-9.+-]+);base64,([A-Za-z0-9+/]+={0,2})$/.exec(e);
  if (!r || !i.includes(r[1])) return !1;
  const n = r[2], s = n.length / 4 * 3 - (n.endsWith("==") ? 2 : n.endsWith("=") ? 1 : 0);
  return n.length % 4 === 0 && s > 0 && s <= t.imageBytes;
}
function tt(e, t) {
  if (!X(t) || typeof t.type != "string" || typeof t.content != "string" || typeof t.id != "string" || !t.id || typeof t.timestamp != "number" || !Number.isFinite(t.timestamp) || !X(t.sender) || typeof t.sender.uid != "string" || typeof t.sender.name != "string" || typeof t.sender.avatar != "string") return "消息格式无效，原记录已保留，请核对后重新发送。";
  const i = X(t.meta) ? t.meta.imageUrl : void 0;
  if (e.status === "unknown" || e.status === "incompatible") return e.reason;
  if (!e.messageTypes.includes(t.type)) return t.type === "image" ? e.reason || "服务端未启用图片消息，待发图片已保留。" : "服务端不支持此消息类型，内容已保留。";
  if (t.content.length > e.limits.textChars) return "文字超过服务端声明的长度上限，请缩短后再发送。";
  if (t.type === "image" && !Nn(i, e.limits, e.imageMimeTypes)) return "图片格式或大小不符合服务端能力，请重新选择或压缩；原内容已保留。";
  if (t.type === "image") {
    const s = Mn(i);
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
const dr = pe.imageMessageBytes, fr = pe.textChars, it = (e) => !!e && typeof e == "object" && !Array.isArray(e), Q = (e, t) => typeof e == "string" && e.length <= t;
function lt(e) {
  if (!Q(e, 4096)) return "";
  try {
    const t = new URL(e);
    return ["https:", "http:"].includes(t.protocol) && !t.username && !t.password ? t.href : "";
  } catch {
    return "";
  }
}
function Ft(e) {
  return typeof e != "string" ? "" : e.length <= dr && /^data:image\/(?:png|jpeg|gif|webp);base64,[A-Za-z0-9+/=\r\n]+$/i.test(e) ? e : lt(e);
}
function Gt(e) {
  if (!Q(e, 4096)) throw new Error("服务器地址过长");
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
function mr(e, t) {
  if (!(!it(e) || !["bilibili", "github", "music", "aihot", "youtube", "idle"].includes(String(e.type)) || !Q(e.title, 500)))
    return { type: e.type, title: e.title, url: lt(e.url) || void 0, updatedAt: t };
}
function pr(e, t = 0) {
  if (!it(e) || t > 2) return;
  const i = /* @__PURE__ */ Object.create(null);
  for (const [r, n] of Object.entries(e).slice(0, 64))
    ["__proto__", "constructor", "prototype", "rawSong"].includes(r) || (typeof n == "string" && n.length <= (r === "imageUrl" ? dr : fr) ? i[r] = /(?:cover|avatar|face|imageUrl)$/i.test(r) ? Ft(n) : /url$/i.test(r) ? lt(n) : n : typeof n == "boolean" || typeof n == "number" && Number.isFinite(n) ? i[r] = n : r === "seriesItems" && Array.isArray(n) && (i[r] = n.slice(0, 100).map((s) => pr(s, t + 1)).filter(Boolean)));
  return i;
}
function ut(e) {
  return hr(e, Date.now());
}
function hr(e, t) {
  if (!it(e) || !it(e.sender) || !Q(e.id, 160) || !e.id || !Q(e.sender.uid, 160) || !e.sender.uid || !Q(e.sender.name, 100) || !Q(e.content, fr) || ![...mi, "system"].includes(String(e.type)) || typeof e.timestamp != "number" || !Number.isFinite(e.timestamp)) return;
  const i = Ft(e.sender.avatar) || (Q(e.sender.avatar, 32) && !/[:/]/.test(e.sender.avatar) ? e.sender.avatar : "👤");
  return { id: e.id, sender: { uid: e.sender.uid, name: e.sender.name, avatar: i, activity: mr(e.sender.activity, t) }, type: e.type, content: e.content, timestamp: e.timestamp, meta: pr(e.meta) };
}
function $n(e, t) {
  if (!it(e) || !Q(e.uid, 160) || !e.uid || !Q(e.name, 100)) return;
  const i = Ft(e.avatar) || (Q(e.avatar, 32) && !/[:/]/.test(e.avatar) ? e.avatar : "👤");
  return { uid: e.uid, name: e.name, avatar: i, activity: mr(e.activity, t) };
}
const rt = te(""), Po = te(!1), ki = te(0);
let ze, Ue = Promise.resolve();
const oe = /* @__PURE__ */ new Map();
function Ci(e, t, i) {
  return JSON.stringify([e, t, i]);
}
function Kt() {
  return ze || (ze = new Promise((e, t) => {
    const i = indexedDB.open("lw-chat-history", 2);
    i.onupgradeneeded = () => {
      i.result.objectStoreNames.contains("messages") || i.result.createObjectStore("messages", { keyPath: ["scope", "id"] }).createIndex("timeline", ["scope", "timestamp", "id"], { unique: !0 }), i.result.objectStoreNames.contains("relay-cursors") || i.result.createObjectStore("relay-cursors");
    }, i.onerror = () => t(i.error), i.onblocked = () => {
      rt.value = "历史数据库升级被其他标签页阻塞，请关闭旧标签页后重试";
    }, i.onsuccess = () => {
      const r = i.result;
      r.onversionchange = () => {
        r.close(), ze = void 0;
      }, e(r);
    };
  }).catch((e) => {
    throw ze = void 0, e;
  })), ze;
}
function Ht(e, t) {
  for (const i of t) {
    const r = ut(i);
    if (!r || r.id === "sys-welcome") continue;
    const n = { scope: e, id: r.id, timestamp: r.timestamp, message: JSON.parse(JSON.stringify(r)) };
    oe.set(JSON.stringify([e, n.id]), n);
  }
  return ki.value = oe.size, xn();
}
function xn() {
  return Ue = Ue.then(async () => {
    if (!oe.size) return;
    const e = [...oe.entries()];
    try {
      const t = await Kt();
      await new Promise((i, r) => {
        const n = t.transaction("messages", "readwrite");
        n.oncomplete = () => i(), n.onabort = () => r(n.error), n.onerror = () => r(n.error);
        const s = n.objectStore("messages");
        for (const [, o] of e) s.put(o);
      });
      for (const [i, r] of e) oe.get(i) === r && oe.delete(i);
      ki.value = oe.size, rt.value = "";
    } catch {
      rt.value = "历史未能写入磁盘（空间不足或数据库不可用）。待存消息保留在内存，请先导出备份，勿关闭或刷新。";
    }
  }), Ue;
}
async function Ln(e) {
  await Ue;
  const t = await Kt();
  return new Promise((i, r) => {
    const n = t.transaction("relay-cursors", "readonly"), s = n.objectStore("relay-cursors").get(e);
    n.oncomplete = () => i(Number.isSafeInteger(s.result) ? s.result : 0), n.onabort = () => r(n.error), s.onerror = () => r(s.error);
  });
}
function Dn(e, t, i) {
  const r = Ue.then(async () => {
    const n = await Kt();
    await new Promise((s, o) => {
      const a = n.transaction(["messages", "relay-cursors"], "readwrite"), c = a.objectStore("messages");
      for (const h of t) c.put({ scope: e, id: h.id, timestamp: h.timestamp, message: JSON.parse(JSON.stringify(h)) });
      const d = a.objectStore("relay-cursors"), f = d.get(e);
      f.onsuccess = () => d.put(Math.max(Number(f.result) || 0, i), e), a.oncomplete = () => s(), a.onabort = () => o(a.error), a.onerror = () => o(a.error);
    });
  });
  return Ue = r.catch(() => {
  }), r;
}
async function gr(e, t, i = 200) {
  await Ue;
  const r = await Kt();
  return new Promise((n, s) => {
    const o = r.transaction("messages", "readonly"), a = [e, -Number.MAX_VALUE, ""], c = t ? [e, t.timestamp, t.id] : [e, Number.MAX_VALUE, "￿"], d = IDBKeyRange.bound(a, c, !1, !!t), f = o.objectStore("messages").index("timeline").openCursor(d, "prev"), h = [];
    f.onerror = () => s(f.error), o.onabort = () => s(o.error), f.onsuccess = () => {
      const m = f.result;
      if (!m || h.length >= i) {
        n(h.reverse());
        return;
      }
      const g = ut(m.value.message);
      g && h.push(g), m.continue();
    };
  });
}
async function Mo(e) {
  const t = /* @__PURE__ */ new Map();
  let i;
  for (; ; ) {
    const r = await gr(e, i, 500);
    for (const n of r) t.set(n.id, n);
    if (r.length < 500) break;
    i = r[0];
  }
  for (const r of oe.values()) r.scope === e && t.set(r.id, r.message);
  return [...t.values()].sort((r, n) => r.timestamp - n.timestamp || r.id.localeCompare(n.id));
}
function Ro(e) {
  return [...oe.values()].filter((t) => t.scope === e).map((t) => t.message);
}
function xt(e) {
  const t = lt(e);
  return t && t.length <= 1e3 && !/\/noface\.(jpg|png)(?:[?#]|$)/i.test(t) ? t : "";
}
function zt(e, t = "") {
  const i = xt(e) || xt(t);
  return i || (e && e.length <= 8 && !/[:/]/.test(e) ? e : "🦫");
}
const Jt = "lw_chat_server_url", yr = "lw_chat_user_id", Qt = "lw_chat_user_name", Yt = "lw_chat_user_avatar", ie = "lw_chat_groups", wr = "lw_chat_current_group", Bn = "lw_chat_rooms", jn = "lw_chat_friends", br = "lw_chat_friend_requests_v1", Pt = "lw_chat_current_room", vr = "";
function ee(e, t) {
  try {
    if (typeof localStorage < "u") {
      const i = localStorage.getItem(e);
      if (e === Jt && i && localStorage.getItem("lw_chat_server_explicit") !== "true" && (i.includes("sslip.io") || i.includes("your-domain.com")))
        return localStorage.removeItem(e), t;
      if (i !== null) return i;
    }
  } catch {
  }
  return t;
}
function R(e, t) {
  try {
    typeof localStorage < "u" && localStorage.setItem(e, t);
  } catch {
  }
}
function Ye(e, t) {
  try {
    if (typeof localStorage < "u") {
      const i = localStorage.getItem(e);
      if (i) return JSON.parse(i);
    }
  } catch {
  }
  return t;
}
const Vn = [
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
], Wn = [
  { id: "main", name: "自习室大厅", icon: "🏠" },
  { id: "dev", name: "代码与摸鱼", icon: "💻" },
  { id: "music", name: "音乐咖啡馆", icon: "🎵" }
];
function qn() {
  const e = ["摸鱼", "冲浪", "喝茶", "听歌", "看番", "敲代码", "发呆", "漫游"], t = ["海狸", "企鹅", "猫猫", "柴犬", "仓鼠", "水獭", "考拉", "熊猫"], i = e[Math.floor(Math.random() * e.length)], r = t[Math.floor(Math.random() * t.length)], n = Math.floor(1e3 + Math.random() * 9e3);
  return `${i}的${r}#${n}`;
}
function Fn() {
  const e = ["🦫", "🐧", "🐱", "🐶", "🐹", "🦦", "🐨", "🐼", "🦊", "🐰"];
  return e[Math.floor(Math.random() * e.length)];
}
const Sr = ee(yr, ""), Ii = Sr || `u_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`;
Sr || R(yr, Ii);
const Lt = ee(Qt, ""), Gn = !Lt || Lt.includes("#"), qi = Y.userName && Y.userName !== "哔哩哔哩用户" && Y.userName !== "浏览器指纹与环境" ? Y.userName : "", Ar = Gn && qi ? qi : Lt || qn();
Lt || R(Qt, Ar);
const Be = ee(Yt, ""), Kn = !Be || Be.length <= 4 || Be.startsWith("data:") || Be.includes("/noface."), Fi = xt(Y.avatarUrl), kr = Kn && Fi ? Fi : Be || Fn();
Be || R(Yt, kr);
const u = j({
  visible: !1,
  shareActivity: ee("lw_chat_share_activity", "true") !== "false",
  error: "",
  connected: !1,
  connecting: !1,
  onlineCount: 1,
  serverUrl: ee(Jt, vr),
  currentGroupId: ee(wr, "hub_main"),
  currentChannelId: "general",
  groups: Ye(ie, Vn),
  groupMembers: [],
  currentRoomId: ee(Pt, "main"),
  rooms: Ye(Bn, Wn),
  friends: Ye(jn, []),
  friendRequests: Ye(br, []),
  currentUser: {
    uid: Ii,
    name: Ar,
    avatar: kr
  },
  messages: nt(ee(Pt, "main")).length > 0 ? nt(ee(Pt, "main")) : [
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
Jn();
he(
  () => [Y.avatarUrl, Y.userName],
  ([e, t]) => {
    const i = u.currentUser.avatar;
    xt(e) && (!i || i.length <= 4 || i.startsWith("data:") || i.includes("/noface.") || /^https?:\/\/[^/]*hdslb\.com\//i.test(i)) && (u.currentUser.avatar = e, R(Yt, e)), t && t !== "哔哩哔哩用户" && t !== "浏览器指纹与环境" && (!u.currentUser.name || u.currentUser.name.includes("#") || u.currentUser.name.startsWith("摸鱼")) && (u.currentUser.name = t, R(Qt, t));
  },
  { immediate: !0 }
);
const Gi = j({ scope: "", ready: !1 });
let kt = 0;
he(
  () => Ci(u.currentUser.uid, u.serverUrl, u.currentRoomId),
  async (e) => {
    const t = ++kt;
    Object.assign(Gi, { scope: e, ready: !1 });
    const { currentRoomId: i, serverUrl: r, currentUser: n } = u, s = nt(i, r, n.uid);
    await Ht(e, s);
    try {
      const o = await gr(e);
      if (t !== kt) return;
      const a = new Map(o.map((c) => [c.id, c]));
      for (const c of u.messages) c.id !== "sys-welcome" && a.set(c.id, c);
      u.messages = [...a.values()].sort((c, d) => c.timestamp - d.timestamp || c.id.localeCompare(d.id)).slice(-200);
    } catch {
      t === kt && (rt.value = "无法读取历史数据库，现有缓存未删除，请导出备份后检查浏览器存储。");
    } finally {
      t === kt && (Gi.ready = !0);
    }
  },
  { immediate: !0 }
);
function Oo(e, t) {
  u.currentUser.name = e.trim() || u.currentUser.name, u.currentUser.avatar = t.trim() || u.currentUser.avatar, R(Qt, u.currentUser.name), R(Yt, u.currentUser.avatar);
}
function Hn(e, t, i) {
  return "lw_chat_history_v2_" + JSON.stringify([i, t, e]);
}
function nt(e, t = ee(Jt, vr), i = Ii) {
  try {
    const r = localStorage.getItem(Hn(e, t, i));
    if (r) {
      const n = JSON.parse(r);
      if (Array.isArray(n)) return n.map(ut).filter((s) => !!s).slice(-200);
    }
  } catch {
  }
  return [];
}
function zn(e, t) {
  const i = Ci(u.currentUser.uid, u.serverUrl, e);
  Ht(i, t);
}
function Cr(e, t) {
  if (!e) return "";
  const i = new URL(Gt(e));
  return i.searchParams.set("room", t), i.href;
}
function hi(e, t = !0, i = !1) {
  if (t && rt.value && ki.value > 0)
    return u.error = "仍有未保存消息，请先重试保存或导出备份，暂不切换房间", !1;
  try {
    e.endpoint = Gt(e.endpoint), localStorage.setItem("lw_chat_session_v1", JSON.stringify(e));
  } catch {
    return u.error = "会话保存失败或地址无效，未切换房间", !1;
  }
  const r = e.endpoint !== u.serverUrl || e.roomId !== u.currentRoomId;
  return r && t && zn(u.currentRoomId, u.messages), Object.assign(u, {
    currentGroupId: e.groupId,
    currentChannelId: e.channelId,
    currentRoomId: e.roomId,
    serverUrl: e.endpoint
  }), r && (u.messages = nt(e.roomId, e.endpoint, u.currentUser.uid), u.userActivities = {}, u.unreadCount = 0, i || (u.connected = !1, u.connecting = !1), u.onlineCount = 0), R(Jt, e.endpoint), R(Pt, e.roomId), R(wr, e.groupId), !0;
}
function dt(e, t = "local", i = !1) {
  let r, n = t;
  try {
    if (r = Gt(e), r) {
      const a = new URL(r);
      if (n = a.searchParams.get("room") || "default", !n || n.length > 160) throw new Error();
      a.searchParams.set("room", n), r = a.href;
    }
  } catch {
    return u.error = "房间地址无效，未切换会话", !1;
  }
  for (const a of u.groups)
    for (const c of a.channels)
      if ((c.endpoint ?? Cr(a.endpoint ?? "", `${a.id}__${c.id}`)) === r && (r || c.id === n))
        return hi({ groupId: a.id, channelId: c.id, roomId: n, endpoint: r }, !0, i);
  const s = "joined_" + crypto.randomUUID(), o = {
    id: s,
    name: r ? "受邀房间" : "本地房间",
    icon: "💬",
    endpoint: r,
    isCustom: !0,
    channels: [{ id: n, name: n, icon: "💬", endpoint: r }]
  };
  return u.groups.push(o), hi({ groupId: s, channelId: n, roomId: n, endpoint: r }, !0, i) ? (R(ie, JSON.stringify(u.groups)), !0) : (u.groups.pop(), !1);
}
function Jn() {
  for (const t of u.groups) t.endpoint ??= u.serverUrl;
  const e = Ye("lw_chat_session_v1", null);
  if (e && typeof e.endpoint == "string" && typeof e.roomId == "string") {
    const t = u.groups.find((r) => r.id === e.groupId), i = t?.channels.find((r) => r.id === e.channelId);
    if (t && i)
      try {
        const r = Gt(e.endpoint), n = r ? new URL(r).searchParams.get("room") || "default" : e.roomId;
        i.endpoint = r, Object.assign(u, {
          currentGroupId: t.id,
          currentChannelId: i.id,
          currentRoomId: n,
          serverUrl: r,
          messages: nt(n, r, u.currentUser.uid)
        }), R(ie, JSON.stringify(u.groups));
        return;
      } catch {
      }
  }
  dt(u.serverUrl, u.currentRoomId), R(ie, JSON.stringify(u.groups));
}
function No(e) {
  u.friendRequests = u.friendRequests.filter((t) => t.id !== e), R(br, JSON.stringify(u.friendRequests));
}
function Zt(e, t) {
  const i = u.groups.find((o) => o.id === e), r = i?.channels.find((o) => o.id === t) || i?.channels[0];
  if (!i || !r) return !1;
  const n = r.endpoint !== void 0 ? r.endpoint ? new URL(r.endpoint).searchParams.get("room") || "default" : r.id : `${i.id}__${r.id}`, s = r.endpoint ?? Cr(i.endpoint ?? "", n);
  return hi({ groupId: i.id, channelId: r.id, roomId: n, endpoint: s });
}
function $o(e, t = "👥") {
  const i = e.trim() || "新群组", r = "group_" + Math.random().toString(36).slice(2, 8), n = {
    id: r,
    name: i,
    icon: t,
    channels: [
      { id: "general", name: "综合讨论", icon: "💬" },
      { id: "music", name: "音乐分享", icon: "🎵" },
      { id: "bili", name: "B站动态", icon: "📺" }
    ],
    endpoint: u.serverUrl,
    isCustom: !0
  };
  return u.groups.push(n), R(ie, JSON.stringify(u.groups)), Zt(r, "general"), n;
}
function xo(e) {
  if (u.groups.length <= 1) return;
  const t = u.groups.filter((i) => i.id !== e);
  if (u.currentGroupId === e) {
    const i = t[0];
    if (!i || !Zt(i.id, i.channels[0]?.id || "general")) return;
  }
  u.groups = t, R(ie, JSON.stringify(u.groups));
}
function Lo(e, t = "💬") {
  const i = u.groups.find((n) => n.id === u.currentGroupId);
  if (!i) return;
  const r = "ch_" + Math.random().toString(36).slice(2, 6);
  i.channels.push({ id: r, name: e.trim() || "新频道", icon: t }), R(ie, JSON.stringify(u.groups)), Zt(i.id, r);
}
function Do(e, t, i) {
  const r = u.groups.find((n) => n.id === e);
  r && (r.name = t.trim() || r.name, i && (r.icon = i), R(ie, JSON.stringify(u.groups)));
}
function Bo(e, t, i, r) {
  const n = u.groups.find((o) => o.id === e);
  if (!n) return;
  const s = n.channels.find((o) => o.id === t);
  s && (s.name = i.trim() || s.name, r && (s.icon = r), R(ie, JSON.stringify(u.groups)));
}
function jo(e, t) {
  const i = u.groups.find((n) => n.id === e);
  if (!i || i.channels.length <= 1) return;
  const r = i.channels.filter((n) => n.id !== t);
  u.currentGroupId === e && u.currentChannelId === t && (!r[0] || !Zt(e, r[0].id)) || (i.channels = r, R(ie, JSON.stringify(u.groups)));
}
const U = (e) => JSON.stringify([e.origin, e.room, e.uid]);
function st(e) {
  return typeof e == "string" && /^[A-Za-z0-9_-]{43}$/.test(e);
}
function ft(e) {
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
const Ei = "lw_private_chat_v1", v = j({ room: null, diagnostic: "" });
function _i() {
  let e = null, t = "";
  try {
    const i = localStorage.getItem(Ei);
    if (i === null) t = "当前浏览器配置中没有保存聊天室连接。请确认使用的是原来的浏览器用户和插件，或重新导入自己的邀请。";
    else
      try {
        e = ft(JSON.parse(i));
      } catch {
        t = "已保存的聊天室配置无效或使用了公网 HTTP，原记录和凭证未删除。请先配置 HTTPS，再按部署指南重新导入匹配当前聊天 ID 的邀请。";
      }
  } catch {
    t = "无法读取本机存储，请检查浏览器是否限制存储访问。";
  }
  v.diagnostic = t, JSON.stringify(e) !== JSON.stringify(v.room) && (v.room = e);
}
_i();
window.addEventListener("storage", (e) => {
  (e.key === Ei || e.key === null) && _i();
});
window.addEventListener("focus", _i);
const Qn = me(() => !!v.room);
function Ir(e) {
  return e.origin.replace(/^http:/, "ws:").replace(/^https:/, "wss:") + "/ws?room=" + encodeURIComponent(e.room);
}
function Yn(e) {
  const t = ft(e);
  localStorage.setItem(Ei, JSON.stringify(t)), v.diagnostic = "", v.room = t;
}
const Ui = te(0), q = te(""), Ti = /* @__PURE__ */ new Map();
let oi;
function Ge() {
  return oi ||= new Promise((e, t) => {
    const i = indexedDB.open("lw-chat-delivery", 1);
    i.onupgradeneeded = () => {
      i.result.createObjectStore("deliveries", { keyPath: ["scope", "id", "uid"] }).createIndex("scope", "scope");
    }, i.onsuccess = () => {
      i.result.onversionchange = () => {
        i.result.close(), oi = void 0;
      }, e(i.result);
    }, i.onerror = () => t(i.error), i.onblocked = () => {
      q.value = "发送队列被旧窗口阻塞，请关闭旧窗口后重试。";
    };
  }).catch((e) => {
    throw oi = void 0, e;
  });
}
async function Zn(e) {
  const t = await Ge();
  return new Promise((i, r) => {
    const n = t.transaction("deliveries", "readonly"), s = n.objectStore("deliveries").index("scope").getAll(e);
    n.oncomplete = () => i(s.result), n.onabort = () => r(n.error), s.onerror = () => r(s.error);
  });
}
let Ki = Promise.resolve();
function mt(e) {
  const t = Ki.then(e);
  return Ki = t.catch(() => {
  }), t;
}
async function Ke(e) {
  try {
    const t = /* @__PURE__ */ new Map();
    for (const i of await Zn(e)) {
      const r = t.get(i.id) || [];
      r.push(i), t.set(i.id, r);
    }
    Ti.set(e, t), Ui.value++;
  } catch {
    q.value = "无法读取发送确认记录，请检查浏览器存储。";
  }
}
function Xn(e, t) {
  Ui.value;
  const i = Ti.get(e)?.get(t) || [];
  if (!i.length) return "none";
  const r = i.filter((n) => !n.received);
  return r.length ? r.some((n) => n.failure === "rejected" || n.failure === "paused" || n.attempts >= 5 && (n.failure === "unconfirmed" || Date.now() - n.lastAttempt > 15e3)) ? "failed" : "sending" : "stored";
}
function Vo(e, t) {
  Ui.value;
  const i = Ti.get(e)?.get(t) || [];
  if (!i.length) return "无送达确认";
  const r = i.filter((s) => s.received).length;
  return r === i.length ? i.every((s) => s.uid === "private-relay-server") ? "服务器已保存（不代表对方已读）" : `对方已接收 ${r}/${i.length}（非已读）` : i.filter((s) => !s.received).some((s) => s.failure === "rejected") ? "服务器拒绝此次发送，可在消息详情中重试；不代表此前尝试一定未保存" : Xn(e, t) === "failed" ? "尚未获得保存确认，自动补发已暂停；不代表一定未送达，可在消息详情中重试" : "正在发送／等待保存确认，将按原目标房间补发；请勿重复发送";
}
async function Er(e, t, i) {
  await mt(async () => {
    const r = await Ge();
    await new Promise((n, s) => {
      const o = r.transaction("deliveries", "readwrite"), a = o.objectStore("deliveries");
      for (const c of new Set(i)) {
        const d = a.get([e, t.id, c]);
        d.onsuccess = () => {
          if (d.result?.received) return;
          const f = { scope: e, id: t.id, uid: c, message: JSON.parse(JSON.stringify(t)), attempts: 0, lastAttempt: 0, received: !1 };
          a.put(f);
        };
      }
      o.oncomplete = () => n(), o.onabort = () => s(o.error), o.onerror = () => s(o.error);
    }), await Ke(e);
  });
}
async function Wo(e, t) {
  try {
    await mt(async () => {
      const i = await Ge();
      await new Promise((r, n) => {
        const s = i.transaction("deliveries", "readwrite"), o = s.objectStore("deliveries").index("scope").openCursor(e);
        o.onsuccess = () => {
          const a = o.result;
          if (!a) return;
          const c = a.value;
          c.id === t && !c.received && a.update({ ...c, attempts: 5, failure: "paused" }), a.continue();
        }, s.oncomplete = () => r(), s.onabort = () => n(s.error), s.onerror = () => n(s.error);
      }), await Ke(e);
    });
  } catch {
    q.value = "暂停补发未能保存，请检查存储；已发出的消息无法撤回。";
  }
}
async function es(e, t, i) {
  return _r(e, [t], i);
}
async function _r(e, t, i) {
  t.length && await mt(async () => {
    const r = await Ge();
    await new Promise((n, s) => {
      const o = r.transaction("deliveries", "readwrite"), a = o.objectStore("deliveries");
      for (const c of new Set(t)) {
        const d = a.get([e, c, i]);
        d.onsuccess = () => {
          d.result && a.put({ ...d.result, received: !0, failure: void 0, message: void 0 });
        };
      }
      o.oncomplete = () => n(), o.onabort = () => s(o.error), o.onerror = () => s(o.error);
    }), await Ke(e);
  });
}
async function Hi(e, t, i, r = !1, n, s = !1) {
  await mt(async () => {
    const o = await Ge();
    await new Promise((a, c) => {
      const d = o.transaction("deliveries", "readwrite"), f = d.objectStore("deliveries"), h = f.get([e, t, i]);
      h.onsuccess = () => {
        const m = h.result;
        m && !m.received && (n === void 0 || m.lastAttempt === n) && f.put({
          ...m,
          attempts: r || s ? 5 : m.attempts,
          failure: s ? "paused" : r ? "rejected" : m.failure === "paused" ? "paused" : "unconfirmed"
        });
      }, d.oncomplete = () => a(), d.onerror = d.onabort = () => c(d.error);
    }), await Ke(e);
  });
}
async function ts(e, t, i, r, n = 4, s = () => !0) {
  await mt(async () => {
    const o = await Ge(), a = [];
    await new Promise((c, d) => {
      const f = o.transaction("deliveries", "readwrite"), h = f.objectStore("deliveries").index("scope").openCursor(e);
      h.onsuccess = () => {
        const m = h.result;
        if (!m || a.length >= n || !i()) return;
        const g = m.value;
        if (!g.received && g.message && g.attempts < 5 && Date.now() - g.lastAttempt >= 1e4 && t.includes(g.uid)) {
          if (!s(g.message)) {
            m.update({ ...g, attempts: 5, failure: "paused" }), m.continue();
            return;
          }
          const w = { ...g, attempts: g.attempts + 1, lastAttempt: Date.now(), failure: void 0 };
          m.update(w), a.push(w);
        }
        m.continue();
      }, f.oncomplete = () => c(), f.onabort = () => d(f.error), f.onerror = () => d(f.error);
    });
    for (const c of a) i() && r(c.uid, c.message, c.lastAttempt);
    await Ke(e);
  });
}
function de(e, t) {
  const i = new AbortController(), r = () => i.abort(e?.reason);
  e?.aborted ? r() : e?.addEventListener("abort", r, { once: !0 });
  const n = setTimeout(() => i.abort(new DOMException("视频加载超时，请手动重试", "TimeoutError")), t);
  return { signal: i.signal, dispose() {
    clearTimeout(n), e?.removeEventListener("abort", r), i.abort();
  } };
}
class is {
  start() {
    return this.cancel(), this.controller = new AbortController(), this.controller.signal;
  }
  cancel() {
    this.controller?.abort();
  }
}
function ai(e) {
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
function rs(e) {
  function t(g, w) {
    return g << w | g >>> 32 - w;
  }
  const i = [7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21], r = new Array(64).fill(0).map((g, w) => Math.floor(Math.abs(Math.sin(w + 1)) * 2 ** 32)), n = new TextEncoder().encode(e), s = n.length * 8, o = new Uint8Array((Math.floor((n.length + 8) / 64) + 1) * 64);
  o.set(n), o[n.length] = 128;
  const a = new DataView(o.buffer);
  a.setUint32(o.length - 8, s >>> 0, !0), a.setUint32(o.length - 4, Math.floor(s / 4294967296), !0);
  let c = 1732584193, d = 4023233417, f = 2562383102, h = 271733878;
  for (let g = 0; g < o.length; g += 64) {
    const w = new Array(16);
    for (let E = 0; E < 16; E++) w[E] = a.getUint32(g + E * 4, !0);
    let b = c, S = d, y = f, C = h;
    for (let E = 0; E < 64; E++) {
      let D, P;
      E < 16 ? (D = S & y | ~S & C, P = E) : E < 32 ? (D = C & S | ~C & y, P = (5 * E + 1) % 16) : E < 48 ? (D = S ^ y ^ C, P = (3 * E + 5) % 16) : (D = y ^ (S | ~C), P = 7 * E % 16);
      const x = D + b + r[E] + w[P] >>> 0;
      b = C, C = y, y = S, S = S + t(x, i[E]) >>> 0;
    }
    c = c + b >>> 0, d = d + S >>> 0, f = f + y >>> 0, h = h + C >>> 0;
  }
  function m(g) {
    let w = "";
    for (let b = 0; b < 4; b++) w += (g >>> b * 8 & 255).toString(16).padStart(2, "0");
    return w;
  }
  return m(c) + m(d) + m(f) + m(h);
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
function ci(e, t, i) {
  const r = ns.map((d) => (t + i)[d]).join("").slice(0, 32), n = Math.round(Date.now() / 1e3), s = { ...e, wts: n }, a = Object.keys(s).sort().map((d) => encodeURIComponent(d) + "=" + encodeURIComponent(String(s[d]).replace(/[!'()*]/g, ""))).join("&"), c = rs(a + r);
  return {
    signedQuery: `${a}&w_rid=${c}`,
    w_rid: c,
    wts: n
  };
}
function zi(e) {
  const t = Number(e);
  return t >= 120 ? "4K" : t === 116 ? "1080P60" : t === 112 ? "1080P+" : t === 80 ? "1080P" : t === 74 ? "720P60" : t === 64 ? "720P" : t === 32 ? "480P" : t === 16 ? "360P" : t > 0 ? `${t}P` : "清晰度";
}
function qo(e, t = "") {
  if (t && typeof t == "string" && t.trim()) return t.trim();
  const i = Number(e);
  return i >= 120 ? "超清 4K" : i === 116 ? "高清 1080P 60帧" : i === 112 ? "高清 1080P+ 高码率" : i === 80 ? "高清 1080P" : i === 74 ? "高码率 720P 60帧" : i === 64 ? "高清 720P" : i === 32 ? "清晰 480P" : i === 16 ? "流畅 360P" : `${i}P`;
}
class Ee {
  constructor() {
  }
  static getInstance() {
    return Ee.instance || (Ee.instance = new Ee()), Ee.instance;
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
      const d = Math.max(0, c.children.findIndex((f) => String(f.id) === String(a.id)));
      c.children.splice(d + (n === "after" ? 1 : 0), 0, o);
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
        for (let d = c.children.length - 1; d >= 0; d--) {
          const f = c.children[d];
          if (f.type === "fav")
            if (!n.has(String(f.id)))
              c.children.splice(d, 1), r = !0;
            else {
              const h = n.get(String(f.id));
              h?.title && f.name !== h.title && (f.name = h.title, r = !0);
            }
          else
            s(f);
        }
    };
    s(t);
    const o = /* @__PURE__ */ new Set(), a = (c) => {
      for (const d of c.children || [])
        d.type === "fav" ? o.add(String(d.id)) : a(d);
    };
    a(t), t.children || (t.children = []);
    for (const c of i) {
      const d = String(c.id || c.fid);
      o.has(d) || (t.children.push({
        id: d,
        type: "fav",
        name: c.title || "未命名收藏夹",
        children: []
      }), r = !0);
    }
    return r;
  }
  flattenTree(t, i, r, n) {
    const s = new Map((i || []).map((f) => [String(f.id || f.fid), f])), o = [], a = /* @__PURE__ */ new Set(), c = (f) => (f.children || []).reduce(
      (h, m) => h + (m.type === "fav" ? 1 : c(m)),
      0
    ), d = (f, h = 0) => {
      for (const m of f.children || []) {
        const g = String(m.id), w = s.get(g), b = m.type === "folder";
        b || a.add(g);
        const S = b && r.has(g), y = !b && g === String(n);
        o.push({
          id: g,
          title: String(m.name || w?.title || "未命名收藏夹"),
          count: Number(b ? c(m) : w?.media_count || 0),
          kind: w?.isCollected ? "collected" : w?.isOther ? "other" : "created",
          depth: h,
          group: b,
          collapsed: S,
          selected: y,
          writable: !b && !w?.isCollected && !w?.isOther
        }), b && !S && d(m, h + 1);
      }
    };
    d(t, 0);
    for (const f of i || []) {
      const h = String(f.id || f.fid);
      o.some((m) => !m.group && m.id === h) || !f.isCollected && !f.isOther && a.has(h) || o.push({
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
    return o;
  }
}
class je {
  constructor() {
    this.currentUser = null, this.writeQueue = Promise.resolve(), this.lastWriteTime = 0, this.wbiKeysCache = null, this.treeManager = Ee.getInstance();
  }
  static getInstance() {
    return je.instance || (je.instance = new je()), je.instance;
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
    const r = await this.api(`https://api.bilibili.com/x/v2/history?pn=${t}&ps=${i}`), s = (Array.isArray(r) ? r : r?.list || []).map((o) => ({
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
    return { medias: s, total: Number(r?.total || s.length) };
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
    if (o === "__history__") {
      const m = await this.getWatchHistory(i, r);
      let g = m.medias;
      if (s.trim()) {
        const w = s.toLowerCase();
        g = g.filter((b) => b.title.toLowerCase().includes(w) || b.upper?.name && b.upper.name.toLowerCase().includes(w));
      }
      return {
        info: { title: "播放历史", media_count: m.total },
        medias: g,
        hasMore: i * r < m.total,
        total: m.total
      };
    }
    if (o === "__toview__") {
      const m = await this.getToViewVideos();
      let g = m.medias;
      if (s.trim()) {
        const w = s.toLowerCase();
        g = g.filter((b) => b.title.toLowerCase().includes(w) || b.upper?.name && b.upper.name.toLowerCase().includes(w));
      }
      return {
        info: { title: "稍后再看", media_count: m.total },
        medias: g.slice((i - 1) * r, i * r),
        hasMore: i * r < g.length,
        total: g.length
      };
    }
    if (o === "__bangumi__") {
      const m = await this.getBangumiFollows(i, r);
      return {
        info: { title: "我的追番", media_count: m.total },
        medias: m.medias,
        hasMore: i * r < m.total,
        total: m.total
      };
    }
    if (o.startsWith("season:")) {
      const m = o.replace("season:", ""), g = await this.getSeasonVideos(m, i, r);
      return {
        info: { title: "合集内容", media_count: g.total },
        medias: g.medias,
        hasMore: i * r < g.total,
        total: g.total
      };
    }
    let a = `https://api.bilibili.com/x/v3/fav/resource/list?media_id=${t}&pn=${i}&ps=${r}&order=${n}&platform=web`;
    s.trim() && (a += `&keyword=${encodeURIComponent(s.trim())}`);
    const c = await this.api(a), d = c?.medias || [], f = !!c?.has_more, h = Number(c?.info?.media_count || d.length);
    return {
      info: c?.info,
      medias: d,
      hasMore: f,
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
        }), d = await (await fetch("https://api.bilibili.com/x/v3/fav/resource/move", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json"
          },
          body: a.toString()
        })).json();
        return d.code === 0 ? { ok: !0 } : { ok: !1, code: d.code, reason: this.formatBiliApiError(d.code, d.message) };
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
    const s = de(n, 18e3), o = s.signal, a = async (d) => {
      o.throwIfAborted();
      const f = de(o, 5e3);
      try {
        return await this.api(d, { signal: f.signal });
      } finally {
        f.dispose();
      }
    }, c = (d) => {
      if (o.throwIfAborted(), [401, 403, 412, 429].includes(d?.status) || [-101, -111, -352, -412].includes(d?.code) || d?.name === "TimeoutError" || d?.name === "AbortError" || d instanceof TypeError) throw d;
    };
    try {
      o.throwIfAborted();
      const d = Array.from(/* @__PURE__ */ new Set([r, 64, 32, 16]));
      let f = null, h = [], m = r;
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
      for (const w of d)
        try {
          const b = t ? `bvid=${encodeURIComponent(t)}` : "", S = await a(
            `https://api.bilibili.com/x/player/playurl?${b}&cid=${i}&qn=${w}&fnval=1&fourk=0&platform=html5&high_quality=1`
          ), y = g(S);
          if (y.length > 0) {
            f = S, h = y, m = Number(S?.quality || w);
            break;
          }
        } catch (b) {
          c(b);
        }
      if (!h.length)
        for (const w of Array.from(/* @__PURE__ */ new Set([r, 64, 32])))
          try {
            const b = de(o, 5e3);
            let S;
            try {
              S = await this.getWbiKeys(b.signal);
            } finally {
              b.dispose();
            }
            const { ik: y, sk: C } = S, E = { cid: i, qn: w, fnval: 1, fourk: 0 };
            t && (E.bvid = t);
            const { signedQuery: D } = ci(E, y, C), P = await a(
              `https://api.bilibili.com/x/player/wbi/playurl?${D}`
            ), x = g(P);
            if (x.length > 0) {
              f = P, h = x, m = Number(P?.quality || w);
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
      s.dispose();
    }
  }
  /**
   * 获取音频流：优先提取 DASH 纯音频流 (M4A，体积仅 ~3MB，彻底消除视频冗余与限速)，若无纯音频则降级至 360P 流畅视频流 (极小体积保底)
   */
  async fetchAudioStream(t, i, r) {
    const n = de(r, 18e3), s = n.signal, o = async (d) => {
      s.throwIfAborted();
      const f = de(s, 5e3);
      try {
        return await this.api(d, { signal: f.signal });
      } finally {
        f.dispose();
      }
    }, a = (d) => {
      if (s.throwIfAborted(), [401, 403, 412, 429].includes(d?.status) || [-101, -111, -352, -412].includes(d?.code) || d?.name === "TimeoutError" || d?.name === "AbortError" || d instanceof TypeError) throw d;
    }, c = (d) => {
      const f = d?.dash || d?.result?.dash, h = Array.isArray(f?.audio) ? f.audio : [];
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
      s.throwIfAborted();
      try {
        const f = t ? `bvid=${encodeURIComponent(t)}` : "", h = await o(
          `https://api.bilibili.com/x/player/playurl?${f}&cid=${i}&qn=16&fnval=16&fourk=0&platform=html5`
        ), m = c(h);
        if (m.length > 0)
          return { sources: m, isPureAudio: !0 };
      } catch (f) {
        a(f);
      }
      try {
        const f = de(s, 5e3);
        let h;
        try {
          h = await this.getWbiKeys(f.signal);
        } finally {
          f.dispose();
        }
        const { ik: m, sk: g } = h, w = { cid: i, qn: 16, fnval: 16, fourk: 0 };
        t && (w.bvid = t);
        const { signedQuery: b } = ci(w, m, g), S = await o(`https://api.bilibili.com/x/player/wbi/playurl?${b}`), y = c(S);
        if (y.length > 0)
          return { sources: y, isPureAudio: !0 };
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
    const n = String(t.bvid || "").trim(), s = String(t.aid || "").trim(), o = n.startsWith("BV") ? n : "", a = s.replace(/^av/i, "") || (n.startsWith("BV") ? "" : n.replace(/^av/i, "")), c = o ? `bvid=${encodeURIComponent(o)}` : `aid=${encodeURIComponent(a)}`, d = de(r, 2e4), f = d.signal;
    try {
      f.throwIfAborted();
      const h = t.cid && o && i === 1 ? this.fetchPlayStream(o, t.cid, Number(t.preferredQuality || 64), f).then((T) => ({ value: T, error: null }), (T) => ({ value: null, error: T })) : null;
      let m = null;
      try {
        const T = de(f, 6e3);
        try {
          m = await this.api(`https://api.bilibili.com/x/web-interface/view?${c}`, { signal: T.signal });
        } finally {
          T.dispose();
        }
      } catch {
        f.throwIfAborted();
      }
      const g = m?.bvid || "", w = g.startsWith("BV") ? g : o || "", S = (Array.isArray(m?.pages) ? m.pages : []).map((T) => ({
        cid: T.cid,
        page: T.page,
        part: T.part || `第${T.page}集`,
        duration: T.duration || 0
      })), y = S.findIndex((T) => T.page === i), C = y >= 0 ? S[y] : S[0] || null, E = C?.cid || m?.cid || t.cid;
      if (!E)
        throw new Error("无法获取视频 CID 标识");
      const D = Number(t.preferredQuality || 64), P = h && String(E) === String(t.cid) ? await h : null;
      f.throwIfAborted();
      const x = P && String(E) === String(t.cid) ? P.value || (() => {
        throw P.error;
      })() : await this.fetchPlayStream(w, E, D, f);
      return {
        title: m?.title || t.title || w,
        poster: String(m?.pic || t.cover || "").replace(/^http:/, "https:"),
        sources: x.sources,
        aid: m?.aid || t.aid || null,
        bvid: w,
        cid: E || null,
        owner: m?.owner?.name || t.owner || t.author || "UP主",
        ownerFace: m?.owner?.face ? String(m.owner.face).replace(/^http:/, "https:") : t.ownerFace || t.face || "",
        ownerMid: m?.owner?.mid || null,
        pubdate: m?.pubdate || 0,
        desc: m?.desc || t.desc || "暂无简介",
        views: m?.stat?.view || t.views || 0,
        danmaku: m?.stat?.danmaku || t.danmaku || 0,
        likes: m?.stat?.like || t.likes || 0,
        currentQuality: x.quality,
        acceptQuality: x.acceptQuality,
        acceptDescription: x.acceptDescription,
        pages: S,
        currentPage: C?.page || 1,
        partTitle: C?.part || ""
      };
    } finally {
      d.dispose();
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
    const s = Array.isArray(n?.pages) ? n.pages : [], o = i ? s.find((k) => k.cid === i) : null, a = i || n.cid, c = o?.part ? ` · P${o.page} ${o.part}` : "", { ik: d, sk: f } = await this.getWbiKeys(r);
    r?.throwIfAborted();
    const { signedQuery: h } = ci({ bvid: t, cid: a }, d, f), m = await this.api(`https://api.bilibili.com/x/player/wbi/v2?${h}`, { signal: r });
    if (r?.throwIfAborted(), r && !Array.isArray(m?.subtitle?.subtitles)) throw new Error("字幕轨道返回异常或当前账号无权读取");
    const g = m?.subtitle?.subtitles || [];
    if (!g.length)
      return { ok: !1, reason: `该视频${c ? "（" + c.trim() + "）" : ""}没有可用字幕`, cues: [] };
    const w = g.find((k) => /zh|中文|汉语|漢語/i.test((k.lan || "") + " " + (k.lan_doc || ""))) || g[0], b = w.subtitle_url || "", S = b.startsWith("//") ? `https:${b}` : b.startsWith("http") ? b : `https://${b}`, y = await fetch(S, { signal: r, credentials: "include", headers: { Accept: "application/json" } });
    if (!y.ok) throw new Error(`字幕获取失败: ${y.status}`);
    const C = await y.arrayBuffer();
    r?.throwIfAborted();
    let E;
    try {
      E = JSON.parse(new TextDecoder("utf-8", { fatal: !0 }).decode(C));
    } catch {
      try {
        E = JSON.parse(new TextDecoder("gb18030").decode(C));
      } catch {
        E = JSON.parse(new TextDecoder("big5").decode(C));
      }
    }
    if (r && !Array.isArray(E?.body)) throw new Error("字幕正文格式异常");
    const P = (E?.body || []).map((k, re) => ({
      id: `${k.from || 0}_${re}`,
      from: Number(k.from || 0),
      to: Number(k.to || k.from || 0),
      content: String(k.content || "").trim()
    })).filter((k) => k.content), x = (n.title || t) + c, T = [];
    if (T.push("标题：" + x), T.push("字幕轨道：" + g.map((k) => k.lan_doc || k.lan || "未知").join(" / ") + "（已选：" + (w.lan_doc || w.lan || "默认") + "）"), n.owner?.name && T.push("UP主：" + n.owner.name), n.pubdate) {
      const k = new Date(n.pubdate * 1e3);
      T.push(`发布时间：${k.getFullYear()}-${String(k.getMonth() + 1).padStart(2, "0")}-${String(k.getDate()).padStart(2, "0")}`);
    }
    T.push("链接：https://www.bilibili.com/video/" + t + (o?.page ? `?p=${o.page}` : ""));
    const I = P.map((k) => k.content).join(`\r
`), L = T.join(`\r
`) + `\r
\r
———— 字幕正文 ————\r
\r
`;
    return {
      ok: !0,
      title: x,
      bodyText: I,
      headText: L,
      lineCount: P.length,
      cues: P,
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
    ), o = s?.replies || [], a = s?.top || s?.upper?.top || null, c = s?.page || {}, d = Number(c.count || 0), f = (g, w = !1) => {
      const b = {};
      if (g.content?.emote && typeof g.content.emote == "object")
        for (const [y, C] of Object.entries(g.content.emote)) {
          const E = C?.url;
          typeof E == "string" && E && (b[y] = E.replace(/^http:/, "https:"));
        }
      const S = Array.isArray(g.replies) ? g.replies.map((y) => ({
        rpid: y.rpid,
        mid: Number(y.mid || 0),
        uname: String(y.member?.uname || "B站用户"),
        avatar: String(y.member?.avatar || "").replace(/^http:/, "https:"),
        message: String(y.content?.message || ""),
        timeText: new Date(Number(y.ctime || 0) * 1e3).toLocaleString(),
        like: Number(y.like || 0),
        pictures: ai(y.content?.pictures)
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
        pictures: ai(g.content?.pictures),
        emotes: b,
        replies: S
      };
    }, h = [];
    i === 1 && a && typeof a == "object" && a.rpid && h.push(f(a, !0));
    const m = a?.rpid ? String(a.rpid) : "";
    for (const g of o)
      m && String(g.rpid) === m || h.push(f(g, !1));
    return {
      comments: h,
      total: d,
      hasMore: i * r < d
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
          pictures: ai(f.content?.pictures),
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
          const d = await fetch(c);
          if (d.ok && (r = await d.text(), r && r.includes("<d p=")))
            break;
        } catch {
        }
      if (!r) return [];
      const o = new DOMParser().parseFromString(r, "text/xml").querySelectorAll("d"), a = [];
      return o.forEach((c, d) => {
        const h = (c.getAttribute("p") || "").split(","), m = parseFloat(h[0]) || 0, g = parseInt(h[1], 10) || 1, w = parseInt(h[2], 10) || 25, S = `#${(parseInt(h[3], 10) || 16777215).toString(16).padStart(6, "0")}`, y = parseInt(h[4], 10) || 0, C = parseInt(h[5], 10) || 0, E = h[6] || "", D = h[7] || String(d), P = c.textContent?.trim() || "";
        if (P) {
          const x = Math.floor(m / 60), T = Math.floor(m % 60), I = `${String(x).padStart(2, "0")}:${String(T).padStart(2, "0")}`;
          a.push({
            id: D,
            time: m,
            timeStr: I,
            mode: g,
            size: w,
            color: S,
            timestamp: y,
            pool: C,
            userHash: E,
            text: P
          });
        }
      }), a.sort((c, d) => c.time - d.time), a;
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
const ne = je.getInstance();
Ee.getInstance();
const Ct = new is(), ss = {
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
}, l = j({ ...ss });
let os = 1e4;
function V(e, t = !1) {
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
let Xe = "";
function Ji() {
  Xe && URL.revokeObjectURL(Xe), Xe = "";
}
const as = {
  get state() {
    return l;
  },
  bringToFront() {
    l.zIndex = ++os;
  },
  /**
   * 打开并播放指定视频
   */
  async openVideo(e) {
    const t = e.bvid || "", i = e.aid ? String(e.aid) : "";
    if (!t && !i) {
      V("无法播放：缺少视频标识 (BV/AV号)", !0);
      return;
    }
    this.bringToFront();
    const r = !!t && l.bvid === t || !!i && l.aid === i;
    if (l.isOpen && r && !e.cachedSourceUrl && (l.videoSrc || l.iframeSrc) && !l.errorMsg) {
      l.collapsed = !1;
      return;
    }
    const n = Ct.start();
    if (Ji(), l.isOpen = !0, l.collapsed = !1, l.isLoading = !0, l.errorMsg = "", l.bvid = t, l.aid = i, l.cid = e.cid || "", l.title = e.title || t || "加载中…", l.cover = e.cover || "", l.author = e.author || "", l.authorMid = e.mid ? String(e.mid) : "", l.authorFace = e.authorFace || "", l.videoSrc = "", l.sourceUrls = [], l.iframeSrc = "", l.useIframe = !1, l.currentTime = 0, l.pages = [], l.currentPageIndex = 0, l.comments = [], l.commentsPage = 1, l.hasMoreComments = !1, l.totalComments = 0, l.danmakuList = [], l.danmakuLoading = !1, typeof window < "u" && (l.x = Math.max(20, Math.floor((window.innerWidth - 380) / 2)), l.y = Math.max(60, Math.min(100, Math.floor((window.innerHeight - 254) / 3)))), e.cachedSourceUrl) {
      Xe = e.cachedSourceUrl, l.videoSrc = Xe, l.isLoading = !1;
      return;
    }
    try {
      const s = await ne.resolvePlayStream({
        bvid: t,
        aid: i,
        cid: e.cid,
        title: e.title,
        cover: e.cover,
        preferredQuality: l.currentQuality
      }, 1, n);
      if (n.throwIfAborted(), l.title = s.title || e.title || t, l.cover = s.poster || e.cover || "", l.author = s.owner || e.author || "UP主", l.authorFace = s.ownerFace || e.authorFace || "", s.ownerMid && (l.authorMid = String(s.ownerMid)), l.aid = s.aid ? String(s.aid) : i, l.bvid = s.bvid || t, l.cid = s.cid || "", l.description = s.desc || "", l.pubdate = s.pubdate ? new Date(s.pubdate * 1e3).toLocaleString() : "", l.pages = s.pages || [], l.currentPageIndex = Math.max(0, s.currentPage - 1), s.acceptQuality?.length && (l.qualities = s.acceptQuality.map((o, a) => ({
        qn: o,
        desc: s.acceptDescription?.[a] || zi(o)
      }))), l.currentQuality = s.currentQuality || 64, s.sources && s.sources.length)
        l.sourceUrls = s.sources, l.videoSrc = s.sources[0], l.isPlaying = !0, l.danmakuEnabled && this.loadDanmaku();
      else
        throw new Error("未能获取到直链源");
    } catch (s) {
      if (n.aborted) return;
      l.errorMsg = s?.message || "未能获取到视频播放流", V(`视频加载未完成：${l.errorMsg}`, !0);
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
      V("当前视频未获取到原生流，保持内嵌模式");
      return;
    }
    l.useIframe = !l.useIframe, l.useIframe && !l.iframeSrc && (l.iframeSrc = `https://player.bilibili.com/player.html?bvid=${encodeURIComponent(l.bvid)}&autoplay=1&danmaku=0&high_quality=1`), V(l.useIframe ? "已切换至官方嵌入播放模式" : "已切换至原生播放模式");
  },
  /**
   * 切换选集（分P）
   */
  async switchEpisode(e) {
    if (e < 0 || e >= l.pages.length) return;
    const t = l.pages[e];
    if (!t) return;
    l.currentPageIndex = e, l.cid = t.cid, l.videoSrc = "", l.sourceUrls = [], l.isLoading = !0, l.errorMsg = "", l.danmakuList = [], l.danmakuLoading = !1;
    const i = Ct.start();
    try {
      const r = await ne.fetchPlayStream(
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
      l.errorMsg = r?.message || "切换选集失败", V(`分P切换失败：${l.errorMsg}`, !0);
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
    const t = l.currentTime, i = Ct.start();
    try {
      const r = await ne.fetchPlayStream(
        l.bvid,
        l.cid,
        e,
        i
      );
      i.throwIfAborted(), r.sources?.length && (l.sourceUrls = r.sources, l.videoSrc = r.sources[0], l.currentQuality = r.quality, l.currentTime = t, l.isPlaying = !0, V(`已切换清晰度为 ${zi(e)}`));
    } catch (r) {
      if (i.aborted) return;
      V(`清晰度切换失败：${r?.message || "网络异常"}`, !0);
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
    Ct.cancel(), l.isLoading = !1, l.sourceUrls = [], Ji(), l.isOpen = !1, l.isPlaying = !1, l.videoSrc = "", l.episodesOpen = !1, l.descOpen = !1, l.commentsOpen = !1;
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
    l.danmakuEnabled = t, V(t ? "已开启弹幕" : "已关闭弹幕"), t && (!l.danmakuList.length || l.danmakuLoading) && this.loadDanmaku();
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
          const r = await ne.getVideoView(l.bvid);
          r?.cid && (t = r.cid, l.cid = t);
        }
        if (!t) {
          l.danmakuLoading = !1, V("未能获取到当前视频的 cid，暂无法拉取弹幕", !0);
          return;
        }
        const i = await ne.getVideoDanmaku(t);
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
`)), V("已复制视频简介到剪贴板");
    } catch {
      V("复制简介失败", !0);
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
        const n = await ne.getVideoView(l.bvid);
        n?.aid && (t = String(n.aid), l.aid = t);
      }
      if (!t) {
        l.commentsLoading = !1;
        return;
      }
      const i = await ne.getVideoComments(
        t,
        l.commentsPage,
        20,
        l.commentsSort
      ), r = (i.comments || []).map((n) => {
        const s = n.mid ? String(n.mid) : "", o = String(n.uname || "").trim(), a = l.authorMid ? String(l.authorMid) : "", c = String(l.author || "").trim(), d = !!(a && s && a === s || c && o && c === o);
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
          isUp: d,
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
      e ? l.comments = r : l.comments = [...l.comments, ...r], l.totalComments = i.total || l.comments.length, l.hasMoreComments = i.hasMore;
    } catch (t) {
      V(`评论加载失败：${t?.message || "网络异常"}`, !0);
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
          const a = await ne.getVideoView(l.bvid);
          a?.aid && (i = String(a.aid), l.aid = i);
        }
        if (!i) {
          t.subRepliesLoading = !1;
          return;
        }
        const r = await ne.getSubReplies(i, e, t.subRepliesPage, 10), n = (r.replies || []).map((a) => ({
          id: String(a.rpid),
          userName: a.uname,
          message: a.message,
          pictures: a.pictures || [],
          emotes: a.emotes
        })), s = new Set((t.replies || []).map((a) => String(a.id))), o = n.filter((a) => !s.has(String(a.id)));
        t.replies = [...t.replies || [], ...o], t.subRepliesHasMore = r.hasMore;
      } catch (i) {
        V(`子回复加载失败：${i?.message || "网络异常"}`, !0);
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
  const e = Z.activeId;
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
function ds(e, t) {
  if (u.visible) return;
  const i = t || A.channel || "main", r = A.rooms.find((o) => o.id === i), n = r?.name ? `#${r.name}` : void 0;
  let s = "assets/icon-48.png";
  if (e.sender?.avatar && /^https?:\/\//i.test(e.sender.avatar)) {
    const o = Ft(e.sender.avatar);
    o && (s = o);
  }
  se.show({
    id: `chat_msg_${e.id}`,
    appType: "chat",
    appName: "海狸聊天室",
    icon: s,
    title: e.sender?.name || "新消息",
    subtitle: n,
    message: us(e),
    duration: 6500,
    level: "info",
    history: !0,
    target: { type: "module", moduleId: "chat" },
    actionLabel: "查看消息",
    onClick: () => {
      jt.handleToolClick("chat");
    }
  });
}
class qe extends Error {
  constructor(t) {
    super(`服务器响应 ${t}`), this.status = t, this.name = "PrivateChatHttpError";
  }
}
class Pe extends Error {
  constructor() {
    super(...arguments), this.name = "ChatCapabilityError";
  }
}
function Ur(e, t, i) {
  return new Promise((r, n) => {
    const s = new AbortController(), o = () => s.abort(new DOMException("聊天室操作已停止等待", "AbortError")), a = () => {
      clearTimeout(d), i?.removeEventListener("abort", o), s.signal.removeEventListener("abort", c);
    }, c = () => {
      a(), n(s.signal.reason);
    }, d = setTimeout(() => s.abort(new DOMException("聊天室操作超时，结果可能尚未确认", "TimeoutError")), e);
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
class K extends Error {
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
    const t = new Promise((i, r) => {
      let n = !1;
      const s = (a) => {
        n || (n = !0, clearTimeout(o), r(a));
      }, o = setTimeout(() => s(new K("timeout")), 8e3);
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
        }, a.onerror = () => s(new K("storage")), a.onblocked = () => {
          if (!n) {
            s(new K("blocked"));
            try {
              this.onBlocked();
            } catch {
            }
          }
        };
      } catch {
        s(new K("storage"));
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
    if (!st(i)) throw new K("invalid");
    await this.access(t, i);
  }
  access(t, i, r) {
    const n = U(t);
    return Ur(8e3, async (s) => {
      try {
        const o = await this.open();
        return s.throwIfAborted(), await new Promise((a, c) => {
          const d = o.transaction("credentials", i === void 0 ? "readonly" : "readwrite"), f = d.objectStore("credentials"), h = i === void 0 ? f.get(n) : f.put(i, n), m = () => {
            try {
              d.abort();
            } catch {
            }
          }, g = () => s.removeEventListener("abort", m);
          i === void 0 && s.addEventListener("abort", m, { once: !0 }), d.oncomplete = () => {
            g();
            const w = i === void 0 ? h.result : i;
            w === void 0 || w === "" ? c(new K("missing")) : st(w) ? a(w) : c(new K("invalid"));
          }, d.onabort = d.onerror = h.onerror = () => {
            g(), c(new K("storage"));
          };
        });
      } catch (o) {
        throw s.aborted ? s.reason : o instanceof K ? o : new K("storage");
      }
    }, r);
  }
}
class ke extends Error {
  constructor() {
    super(...arguments), this.name = "PrivateChatTransportError";
  }
}
class ms {
  constructor(t) {
    this.ports = t;
  }
  async request(t) {
    let i, r;
    try {
      if (i = Object.freeze({ ...ft(t.destination), channel: t.destination.channel }), r = new URL(t.path, i.origin), !t.path.startsWith("/api/v1/") || t.path.includes("\\") || r.origin !== i.origin || r.hash || r.username || r.password || !r.pathname.startsWith("/api/v1/")) throw new Error();
    } catch {
      throw new ke("聊天室请求目标无效");
    }
    const n = Object.freeze({ ...t, destination: i, path: r.pathname, method: (t.method || "GET").toUpperCase() });
    return r.searchParams.set("room", i.room), r.searchParams.delete("channel"), i.channel && i.channel !== "main" && r.searchParams.set("channel", i.channel), Ur(n.signal ? 3e4 : 15e3, async (s) => {
      try {
        const o = await this.ports.credential(i, s);
        if (s.throwIfAborted(), !st(o)) throw new K("invalid");
        this.ports.beforeSend(n);
        let a;
        try {
          a = n.body === void 0 ? void 0 : JSON.stringify(n.body);
        } catch {
          throw new ke("聊天室请求内容格式无效");
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
        }), d = () => {
          c.body?.cancel().catch(() => {
          });
        };
        if (s.aborted && (d(), s.throwIfAborted()), !c.ok)
          throw d(), new qe(c.status);
        const f = c.body?.getReader();
        if (!f) throw new ke("聊天室返回空响应");
        const h = () => {
          f.cancel().catch(() => {
          });
        };
        s.addEventListener("abort", h, { once: !0 });
        let m = 0, g = "";
        const w = new TextDecoder();
        try {
          for (; ; ) {
            const b = await f.read();
            if (s.throwIfAborted(), b.done) break;
            if (m += b.value.byteLength, m > 2 * 1024 * 1024)
              throw h(), new ke("聊天室响应超限");
            g += w.decode(b.value, { stream: !0 });
          }
          try {
            return JSON.parse(g + w.decode());
          } catch {
            throw new ke("聊天室响应格式无效");
          }
        } finally {
          s.removeEventListener("abort", h);
          try {
            f.releaseLock();
          } catch {
          }
        }
      } catch (o) {
        throw s.aborted ? s.reason : o instanceof qe || o instanceof Pe || o instanceof K || o instanceof ke ? o : new ke("聊天室请求失败，请检查网络或服务配置");
      }
    }, n.signal);
  }
}
class ps {
  constructor(t) {
    this.ports = t, this.generation = 0, this.halted = !0, this.liveGeneration = -1, this.reads = new Qr();
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
    const d = {
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
      const f = await o.wait(() => this.ports.poll(t, d));
      if (!o.current()) return;
      r = 0, f?.hasMore && (a = 250);
    } catch (f) {
      if (!this.owns(t, i)) return;
      const h = this.ports.classify(f, t);
      h === "retry" ? (++r, a = Math.min(6e4, 1500 * 2 ** Math.min(r, 4))) : this.halted = !0, this.ports.failed(h, c, r), h === "missing-room" && i === this.generation && this.halted && this.schedule(() => this.ports.restart(), 0, i);
    } finally {
      o.finish(), this.running === n && (this.running = void 0), i === this.generation && (this.ports.active(t) || (this.halted = !0), this.ports.idle()), this.owns(t, i) && this.schedule(() => {
        this.tick(t, i, r);
      }, a, i);
    }
  }
}
const le = (e) => !!e && typeof e == "object" && !Array.isArray(e), ge = (e) => typeof e == "string" && /^[A-Za-z0-9_-]{1,160}$/.test(e), et = (e) => e == null, ot = (e) => typeof e == "number" && Number.isFinite(e) && e >= 0;
function W() {
  throw new Error("同步页格式无效，未提交本页记录或推进游标");
}
function Xt(e) {
  if (!Array.isArray(e) || e.length > 32) throw new Error("房间列表格式无效");
  return e.map((t) => {
    if (!le(t) || !ge(t.id) || typeof t.name != "string" || t.name.length > 80 || typeof t.icon != "string" || t.icon.length > 8 || typeof t.description != "string" || t.description.length > 500) throw new Error("房间格式无效");
    if (t.space !== void 0 && !ge(t.space)) throw new Error("空间格式无效");
    return { id: t.id, name: t.name, icon: t.icon, description: t.description, space: typeof t.space == "string" ? t.space : "hub_main" };
  });
}
function ei(e) {
  if (!Array.isArray(e) || e.length > 16) throw new Error("空间列表格式无效");
  return e.map((t) => {
    if (!le(t) || !ge(t.id) || typeof t.name != "string" || t.name.length > 80 || typeof t.icon != "string" || t.icon.length > 8) throw new Error("空间格式无效");
    return { id: t.id, name: t.name, icon: t.icon };
  });
}
function Tr(e, t) {
  if (typeof e.name != "string" || e.name.length > 200) return;
  const i = $n({ ...e, name: e.name.slice(0, 100) }, t);
  return i && { ...i, name: e.name };
}
function hs(e, t) {
  return et(e) ? [] : ((!Array.isArray(e) || e.length > 65) && W(), e.map((i) => {
    (!le(i) || !ge(i.uid) || i.role !== void 0 && i.role !== "owner" && i.role !== "member") && W();
    const r = Tr(i, t);
    return r || W(), r.activity && le(i.activity) && ot(i.activity.updatedAt) && (r.activity.updatedAt = i.activity.updatedAt), {
      ...r,
      role: i.role === "owner" ? "owner" : "member",
      online: typeof i.online == "boolean" ? i.online : void 0,
      lastSeen: ot(i.lastSeen) ? i.lastSeen : void 0
    };
  }));
}
function gs(e, t, i) {
  if (!et(e))
    return (!Array.isArray(e) || e.length > 200) && W(), e.map((r) => {
      (!le(r) || !ge(r.id) || !ge(r.toUid) || !le(r.from) || !ge(r.from.uid)) && W();
      const n = Tr(r.from, i);
      return (!n || n.uid !== t && r.toUid !== t || !["pending", "accepted", "rejected"].includes(String(r.status))) && W(), r.createdAt !== void 0 && !ot(r.createdAt) && W(), {
        id: r.id,
        from: n,
        toUid: r.toUid,
        status: r.status,
        createdAt: ot(r.createdAt) ? r.createdAt : i,
        note: typeof r.note == "string" && r.note.length <= 200 ? r.note : void 0
      };
    });
}
function ys(e, t, i, r) {
  (!Number.isSafeInteger(i) || i < 0 || !ot(r) || !le(e) || !le(e.identity) || e.identity.uid !== t || e.identity.role !== "owner" && e.identity.role !== "member" || !Array.isArray(e.messages) || e.messages.length > 50) && W();
  let n = i;
  const s = [], o = [];
  for (const d of e.messages) {
    (!le(d) || !Number.isSafeInteger(d.seq) || d.seq <= n) && W();
    const f = hr(d.message, r);
    f || W(), s.push(f), o.push(d.seq), n = d.seq;
  }
  e.hasMore !== void 0 && typeof e.hasMore != "boolean" && W();
  const a = e.hasMore === !0;
  a && !s.length && W();
  let c;
  return et(e.friends) || ((!Array.isArray(e.friends) || e.friends.length > 4096 || !e.friends.every(ge)) && W(), c = [...new Set(e.friends)]), Object.freeze({
    uid: t,
    role: e.identity.role,
    messages: s,
    sequences: o,
    next: n,
    hasMore: a,
    capabilities: On(e.capabilities),
    rooms: et(e.rooms) ? [{ id: "main", name: "综合讨论", icon: "💬", description: "" }] : Xt(e.rooms),
    spaces: et(e.spaces) ? [{ id: "hub_main", name: "聊天室", icon: "🏠" }] : ei(e.spaces),
    roomsSupported: Array.isArray(e.rooms),
    spacesSupported: Array.isArray(e.spaces),
    members: hs(e.members, r),
    friends: c,
    friendRequests: gs(e.friendRequests, t, r)
  });
}
function Je(e, t, i) {
  for (const r of Object.keys(t)) {
    if (!i()) return !1;
    e[r] = t[r];
  }
  return i();
}
function ws(e, t, i, r) {
  const { chat: n, service: s } = r, o = i.current;
  if (!o()) return !1;
  const a = i.restoring();
  for (let y = 0; y < e.messages.length; y++) {
    if (!o()) return !1;
    const C = e.messages[y];
    r.publish(C, Object.freeze({
      scope: t.scope,
      channel: t.channel,
      sequence: e.sequences[y],
      source: a ? "history" : C.sender.uid === e.uid ? "self" : "live"
    }), o);
  }
  if (!o()) return !1;
  const c = new Set(n.messages.map((y) => y.id)), d = e.messages.filter((y) => y.sender.uid !== e.uid && !y.meta?.silentPartySync && y.type !== "system" && !c.has(y.id)), f = n.visible ? [] : d.filter((y) => (t.cursor > 0 || t.now - y.timestamp < 3e4) && (y.type !== "music_party" || !a)).slice(-3), h = new Map(n.messages.map((y) => [y.id, y]));
  for (const y of e.messages) h.set(y.id, y);
  const m = Object.assign(/* @__PURE__ */ Object.create(null), n.userActivities);
  for (const y of e.members) y.activity && (m[y.uid] = y.activity);
  const g = [], w = new Set(n.friends.map((y) => y.uid)), b = new Map(e.members.map((y) => [y.uid, y]));
  for (const y of e.friends || []) {
    const C = b.get(y);
    C && !w.has(y) && (g.push({ uid: y, name: C.name, avatar: C.avatar, addedAt: t.now, status: "mutual" }), w.add(y));
  }
  if (!Je(n, {
    messages: [...h.values()].sort((y, C) => y.timestamp - C.timestamp || y.id.localeCompare(C.id)).slice(-200),
    unreadCount: d.length ? n.visible ? 0 : n.unreadCount + d.length : n.unreadCount
  }, o) || !Je(s, {
    capabilities: e.capabilities,
    imageMessagesSupported: e.capabilities.messageTypes.includes("image"),
    spacesSupported: e.spacesSupported,
    spaces: e.spaces,
    roomsSupported: e.roomsSupported,
    rooms: e.rooms
  }, o) || (r.authenticated(), !o()) || !Je(s, { role: e.role, members: e.members, ...e.friends === void 0 ? {} : { friends: e.friends } }, o)) return !1;
  for (const y of g) {
    if (!o()) return !1;
    n.friends.some((C) => C.uid === y.uid) || n.friends.push(y);
  }
  const S = e.members.some((y) => !!y.activity) || Object.getPrototypeOf(n.userActivities) !== null ? { userActivities: m } : {};
  if (!Je(n, {
    ...S,
    ...e.friendRequests === void 0 ? {} : { friendRequests: e.friendRequests },
    connected: !0,
    connecting: !1,
    error: ""
  }, o) || !Je(s, { status: "已连接私有服务器" }, o)) return !1;
  e.hasMore || i.caughtUp();
  for (const y of f) {
    if (!o()) return !1;
    if (n.visible) break;
    try {
      r.notify(y, t.channel);
    } catch {
      console.warn("[PrivateChat] notification failed");
    }
  }
  return o();
}
const _e = "private-relay-server";
class bs {
  constructor(t) {
    this.ports = t, this.flushing = !1;
  }
  async postAndAcknowledge(t, i, r = 12e3) {
    const n = Object.freeze({ ...t }), s = tt(this.ports.capabilities(n), i);
    if (s) throw new Pe(s);
    const o = await this.ports.post(n, i, AbortSignal.timeout(r));
    if (!o || o.stored !== !0 || o.id !== i.id) throw new Error("未收到服务器落盘确认");
    await es(this.ports.scope(n), i.id, _e);
  }
  async recordFailure(t, i, r, n) {
    try {
      if (r instanceof Pe) {
        q.value = r.message, await Hi(this.ports.scope(t), i, _e, !1, n, !0);
        return;
      }
      const s = r instanceof qe && r.status >= 400 && r.status < 500 && ![408, 429].includes(r.status);
      await Hi(this.ports.scope(t), i, _e, s, n);
    } catch {
      q.value = "无法保存消息的发送状态，请检查浏览器存储。";
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
        await ts(this.ports.scope(s), [_e], () => this.ports.active(t), (o, a, c) => {
          --n;
          const d = { ...a, sender: { ...a.sender, avatar: this.ports.avatar(a.sender.avatar) } };
          return i.push(this.postAndAcknowledge(s, d).catch((f) => this.recordFailure(s, a.id, f, c))), !0;
        }, n, (o) => !tt(this.ports.capabilities(s), o));
      }
    } catch {
      q.value = "待发队列处理未确认，请检查本地存储；未改投其他房间。";
    } finally {
      await Promise.allSettled(i), this.flushing = !1;
    }
  }
}
const Mt = [];
function Fo(e) {
  return Mt.push(e), () => {
    const t = Mt.indexOf(e);
    t >= 0 && Mt.splice(t, 1);
  };
}
async function Go() {
  const e = v.room;
  if (!e || e.uid !== u.currentUser.uid) throw new Error("请先在聊天室设置中加入自己的聊天室");
  const t = { ...e }, i = await F(t, "/api/v1/rooms", "GET", void 0, AbortSignal.timeout(15e3));
  if (!v.room || U(t) !== U(v.room)) throw new Error("聊天室配置已改变，请重新选择");
  const r = i.spaces ? ei(i.spaces) : [];
  return Xt(i.rooms).map((n) => ({ ...t, channel: n.id, name: `${r.find((s) => s.id === n.space)?.name || "聊天室"} / ${n.name}` }));
}
async function gi(e, t) {
  const i = v.room;
  if (!i || U(i) !== U(t) || u.currentUser.uid !== t.uid) throw new Error("聊天室身份已改变，未发送，请重新选择房间");
  const r = ut(e);
  if (!r || r.type === "system" || r.type === "image") throw new Error("分享内容无效或超出大小限制，未发送");
  const n = { ...t };
  r.sender = { ...r.sender, uid: n.uid, avatar: zt(u.currentUser.avatar, Y.avatarUrl), name: u.currentUser.name };
  const s = tt(pt(n), r);
  if (s) throw new Error(s);
  await Ht(ye(n), [r]), await Er(ye(n), r, [_e]), ue(n) && !u.messages.some((o) => o.id === r.id) && u.messages.push(r);
  try {
    await Dt.postAndAcknowledge(n, r, 15e3);
  } catch (o) {
    throw await Dt.recordFailure(n, r.id, o, 0), ii(), new Error(`未收到「${n.name}」的保存确认；已保留在该房间待发队列，请勿重复发送。`);
  }
}
const A = j({
  status: "未配置私有服务器",
  role: "",
  syncing: !1,
  channel: "main",
  rooms: [],
  spaces: [],
  spacesSupported: !1,
  imageMessagesSupported: !1,
  capabilities: qt(),
  roomsSupported: !1,
  friends: [],
  members: []
});
function pt(e) {
  return Re === U(e) && v.room && U(v.room) === U(e) && u.currentUser.uid === e.uid ? A.capabilities : qt();
}
function ti() {
  A.capabilities = qt(), A.imageMessagesSupported = !1;
}
const Dt = new bs({
  active: ue,
  capabilities: pt,
  scope: ye,
  avatar: (e) => zt(e, Y.avatarUrl),
  destinations: (e) => [Me(e), ...A.rooms.filter((t) => t.id !== A.channel).map((t) => ({ ...e, channel: t.id }))],
  post: (e, t, i) => F(e, "/api/v1/messages", "POST", { message: t }, i)
}), Pr = new fs(() => {
  A.status = "凭证数据库被旧标签页阻塞，请关闭旧页后重试";
}), vs = new ms({
  credential: (e, t) => Pr.read(e, t),
  beforeSend: ({ destination: e, path: t, method: i, body: r }) => {
    if (!H.isInstalled("chat")) throw new Pe("聊天室实验组件已停用，未发起请求");
    const n = t === "/api/v1/members" || t.startsWith("/api/v1/members/"), s = i !== "GET" && ["/api/v1/spaces", "/api/v1/rooms"].some((o) => t === o || t.startsWith(o + "/"));
    if ((n || s) && (!u.connected || A.role !== "owner" || Re !== U(e) || !v.room || U(v.room) !== U(e) || u.currentUser.uid !== e.uid))
      throw new qe(403);
    if (i === "POST" && t === "/api/v1/messages") {
      const o = tt(pt(e), r.message);
      if (o) throw new Pe(o);
    }
  }
});
function Ss(e) {
  const t = "BEAVER-PRIVATE1:";
  if (!e.startsWith(t) || e.length > 8e3) throw new Error("请粘贴新版私有聊天室邀请");
  try {
    const i = JSON.parse(decodeURIComponent(atob(e.slice(t.length))));
    if (!i || !st(i.token)) throw new Error();
    return { ...ft(i), token: i.token };
  } catch {
    throw new Error("邀请格式无效");
  }
}
let yi = 0;
async function Ko(e) {
  if (!H.isInstalled("chat")) throw new Pe("请先在商店手动启用聊天室实验组件");
  const t = Ss(e);
  if (t.uid !== u.currentUser.uid) throw new Error("此邀请不属于当前 UID，请让服主为当前账号重新创建");
  const i = ft(t), r = v.room ? U(v.room) : null;
  at();
  const n = yi;
  if (await Pr.write(i, t.token), n !== yi || u.currentUser.uid !== t.uid || r !== (v.room ? U(v.room) : null))
    throw new Error("凭据已保存，但身份或连接选择已改变，未激活旧邀请；如需加入请重新确认。");
  at(), Yn(i), u.transportMode = "relay", dt(Ir(i), t.room), we();
}
function F(e, t, i = "GET", r, n) {
  return H.isInstalled("chat") ? vs.request({ destination: e, path: t, method: i, body: r, signal: n }) : Promise.reject(new Pe("请先在商店手动启用聊天室实验组件"));
}
async function Mr(e, t, i) {
  const r = v.room;
  if (!r) throw new Error("未配置私有服务器");
  return F({ ...r }, e, t, i, AbortSignal.timeout(15e3));
}
async function Ho() {
  return (await Mr("/api/v1/members", "GET")).members;
}
async function As(e, t) {
  const i = v.room;
  if (!i) throw new Error("未配置私有服务器");
  const r = { ...i }, n = await F(r, "/api/v1/members", "POST", { uid: e, name: t }, AbortSignal.timeout(15e3));
  if (!st(n.token)) throw new Error("服务器返回无效，勿重复创建，请刷新成员列表");
  return "BEAVER-PRIVATE1:" + btoa(encodeURIComponent(JSON.stringify({ ...r, uid: e, token: n.token })));
}
async function zo(e) {
  const t = v.room;
  if (!t) throw new Error("未配置私有服务器，无法发送邀请");
  if (e.uid === u.currentUser.uid) throw new Error("不能邀请自己");
  const i = pt(t);
  if (!i.messageTypes.includes("server_invite")) throw new Error(i.status === "unknown" || i.status === "incompatible" ? i.reason : "服务端未启用邀请卡消息，未创建新成员邀请。");
  const r = await As(e.uid, e.name), n = A.spaces.find((h) => h.id === (A.rooms.find((m) => m.id === A.channel)?.space || "hub_main")), s = A.rooms.find((h) => h.id === A.channel) || A.rooms[0], o = n?.name || t.room || "海狸聊天室", a = s?.name || "综合讨论";
  let c = "";
  try {
    c = JSON.parse(decodeURIComponent(atob(r.replace(/^BEAVER-PRIVATE1:/, "")))).token || "";
  } catch {
  }
  const d = {
    id: `msg_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    sender: {
      uid: u.currentUser.uid,
      name: u.currentUser.name,
      avatar: u.currentUser.avatar
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
  }, f = Rr(e.uid);
  await gi(d, {
    ...t,
    channel: f,
    name: `私聊 / ${e.name}`
  }), ks(e.uid);
}
async function Jo(e) {
  if (!/^[a-f0-9]{32}$/.test(e)) throw new Error("成员标识无效");
  await Mr("/api/v1/members/" + e, "DELETE");
}
function Me(e) {
  return { ...e, channel: A.channel };
}
function ht(e) {
  const t = new URL(Ir(e)), i = e.channel || "main";
  return i !== "main" && t.searchParams.set("channel", i), t.href;
}
function ye(e) {
  return Ci(e.uid, ht(e), e.room);
}
function ue(e) {
  return H.isInstalled("chat") && u.currentUser.uid === e.uid && u.serverUrl === ht(e) && (e.channel || "main") === A.channel && u.currentRoomId === e.room && v.room !== null && U(v.room) === U(e);
}
function Qo() {
  const e = v.room && Me(v.room);
  return e && ue(e) ? { scope: ye(e), channel: e.channel } : null;
}
function Rr(e) {
  return "dm_" + [u.currentUser.uid, e].sort().join("__");
}
function Yo(e) {
  if (!e.startsWith("dm_")) return;
  const t = e.slice(3).split("__");
  if (t.length === 2)
    return t.find((i) => i !== u.currentUser.uid);
}
function ks(e) {
  const t = v.room;
  if (!t || !e || e === u.currentUser.uid) return;
  const i = Rr(e);
  i === A.channel && ue(Me(t)) || dt(ht({ ...t, channel: i }), t.room, !0) && (A.channel = i, we());
}
async function Cs(e) {
  const t = v.room;
  if (!t) throw new Error("未配置私有服务器");
  await F({ ...t }, "/api/v1/friends/request", "POST", { toUid: e }, AbortSignal.timeout(15e3));
}
async function Is(e, t) {
  const i = v.room;
  if (!i) throw new Error("未配置私有服务器");
  await F({ ...i }, "/api/v1/friends/respond", "POST", { id: e, accept: t }, AbortSignal.timeout(15e3));
}
function Or(e) {
  const t = v.room;
  if (!(!t || !A.rooms.some((i) => i.id === e))) {
    if (e === A.channel && ue(Me(t))) {
      ii();
      return;
    }
    dt(ht({ ...t, channel: e }), t.room, Re === U(t) && u.currentUser.uid === t.uid) && (A.channel = e, we());
  }
}
async function Zo(e, t) {
  const i = v.room;
  if (!i) throw new Error("未配置");
  const r = U(i), n = { ...i };
  await F(n, t ? `/api/v1/rooms/${encodeURIComponent(t)}` : "/api/v1/rooms", "POST", e, AbortSignal.timeout(15e3));
  const s = await F(n, "/api/v1/rooms", "GET", void 0, AbortSignal.timeout(15e3));
  if (v.room && U(v.room) === r && u.currentUser.uid === i.uid) {
    const o = Xt(s.rooms), a = s.spaces ? ei(s.spaces) : void 0;
    A.rooms = o, a && v.room && U(v.room) === r && u.currentUser.uid === i.uid && (A.spaces = a);
  }
}
async function Xo(e) {
  if (e === "main") throw new Error("默认房间不可移除");
  const t = v.room;
  if (!t) throw new Error("未配置");
  const i = U(t);
  await F({ ...t }, `/api/v1/rooms/${encodeURIComponent(e)}`, "DELETE", void 0, AbortSignal.timeout(15e3)), !(!v.room || U(v.room) !== i) && (A.rooms = A.rooms.filter((r) => r.id !== e), A.channel === e && Or("main"));
}
async function ea(e, t) {
  const i = v.room;
  if (!i) throw new Error("未配置");
  const r = U(i);
  await F({ ...i }, t ? `/api/v1/spaces/${encodeURIComponent(t)}` : "/api/v1/spaces", "POST", e, AbortSignal.timeout(15e3)), v.room && U(v.room) === r && await Nr(i);
}
async function ta(e) {
  if (e === "hub_main") throw new Error("默认空间不可移除");
  const t = v.room;
  if (!t) throw new Error("未配置");
  const i = U(t), r = A.channel;
  await F({ ...t }, `/api/v1/spaces/${encodeURIComponent(e)}`, "DELETE", void 0, AbortSignal.timeout(15e3)), !(!v.room || U(v.room) !== i || u.currentUser.uid !== t.uid) && (await Nr(t), !(!v.room || U(v.room) !== i || u.currentUser.uid !== t.uid) && A.channel === r && !A.rooms.some((n) => n.id === r) && Or("main"));
}
async function Nr(e) {
  const t = await F({ ...e }, "/api/v1/spaces", "GET", void 0, AbortSignal.timeout(15e3));
  if (!v.room || U(v.room) !== U(e) || u.currentUser.uid !== e.uid) return;
  const i = ei(t.spaces), r = Xt(t.rooms);
  A.spaces = i, v.room && U(v.room) === U(e) && u.currentUser.uid === e.uid && (A.rooms = r);
}
let $r = "", Re = "";
const Pi = new ps({
  active: ue,
  visible: () => u.visible,
  poll: Es,
  started: () => {
    u.connecting = !u.connected, A.syncing = !0;
  },
  idle: () => {
    A.syncing = !1;
  },
  classify: (e, t) => e instanceof qe && e.status === 404 && (t.channel || "main") !== "main" ? "missing-room" : e instanceof qe && [401, 403].includes(e.status) ? "auth" : "retry",
  failed: (e, t, i) => {
    e === "missing-room" ? (A.channel = "main", A.status = "房间已移除，正在返回综合讨论") : e === "auth" ? (Re = "", ti(), A.role = "", u.error = "访问凭证已失效、过期或不属于此房间，请重新导入邀请", u.connected = !1, u.connecting = !1) : i >= 2 && (u.connected = !1, u.connecting = !1, u.error = `${t}失败或超时，记录与待发队列保留，将自动重试。若持续失败，请关闭旧标签页后重试，并检查服务配置。`, A.status = u.error);
  },
  restart: () => we()
});
function ii() {
  const e = v.room && Me(v.room);
  e && !Pi.stopped && $r === U(e) && ue(e) || we();
}
function xr() {
  Pi.cancel();
}
function at() {
  ++yi, xr(), Re = "", ti(), u.connected = !1, u.connecting = !1, A.role = "";
}
function we() {
  if (!H.isInstalled("chat")) {
    at(), u.visible = !1, u.error = "", A.status = "实验性组件默认关闭，请先在商店手动启用";
    return;
  }
  const e = v.room && Me(v.room), t = !!e && Re === U(e) && u.currentUser.uid === e.uid;
  if (t ? xr() : at(), !e) {
    A.status = "尚未读取到聊天室配置，请在此窗口设置中检查", u.error = "";
    return;
  }
  if (e.uid !== u.currentUser.uid) {
    u.error = A.status = "邀请 UID 与本机不一致，请重新导入属于本机的邀请";
    return;
  }
  u.transportMode = "relay", dt(ht(e), e.room, t) && ($r = U(e), u.connected || (A.status = "正在同步"), Pi.start(e));
}
async function Es(e, t) {
  const i = ye(e), r = e.channel || "main", n = await t.wait(() => Ln(i)), s = zt(u.currentUser.avatar, Y.avatarUrl), o = u.currentUser.activity || ls(), a = u.shareActivity !== !1 && o?.title ? `&act_type=${encodeURIComponent(o.type || "")}&act_title=${encodeURIComponent(o.title || "")}&act_url=${encodeURIComponent(o.url || "")}` : "", c = t.visible ? "&wait=6" : "", d = `/api/v1/sync?after=${n}&avatar=${encodeURIComponent(s)}&name=${encodeURIComponent(u.currentUser.name.slice(0, 100))}${a}${c}`;
  t.phase("连接私有服务器");
  const f = await t.wait(() => F(e, d, "GET", void 0, t.signal));
  if (!t.current()) return;
  t.phase("校验同步页");
  let h;
  try {
    h = ys(f, e.uid, n, Date.now());
  } catch (m) {
    throw t.current() && ti(), m;
  }
  if (t.current() && (t.phase("保存同步记录"), await t.wait(() => Dn(i, h.messages, h.next)), !!t.current())) {
    try {
      await t.wait(() => _r(i, h.messages.filter((m) => m.sender.uid === e.uid).map((m) => m.id), _e));
    } catch {
      t.current() && (q.value = "无法保存消息的发送确认，请检查浏览器存储。");
    }
    if (t.current() && (t.phase("应用同步状态"), !!ws(h, { scope: i, channel: r, cursor: n, now: Date.now() }, t, {
      chat: u,
      service: A,
      authenticated: () => {
        Re = U(e);
      },
      publish: (m, g, w) => {
        for (const b of [...Mt]) {
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
      return t.phase("处理待发消息"), Dt.flush(e), { hasMore: h.hasMore };
  }
}
async function It(e) {
  const t = v.room && Me(v.room);
  if (!t || !ue(t))
    return q.value = "未配置此房间的私有服务器，未发送", !1;
  e.sender && (e.sender.avatar = zt(u.currentUser.avatar, Y.avatarUrl), u.currentUser.name && (e.sender.name = u.currentUser.name));
  const i = ut(e);
  if (!i || i.type === "system")
    return q.value = "消息格式无效，未发送", !1;
  const r = tt(pt(t), i);
  if (r)
    return q.value = r, !1;
  const n = { ...t };
  try {
    return await Ht(ye(n), [i]), await Er(ye(n), i, [_e]), ue(n) && !u.messages.some((s) => s.id === i.id) && u.messages.push(i), q.value = "", Dt.flush(n), !0;
  } catch {
    return q.value = "消息未能保存到待发队列，请勿刷新，检查存储后重试", !1;
  }
}
let Qi = !1;
function _s() {
  Qi || (Qi = !0, he(() => [H.isInstalled("chat"), JSON.stringify(v.room)], () => {
    const e = v.room;
    A.members = [], A.rooms = [], A.roomsSupported = !1, A.spaces = [], A.spacesSupported = !1, ti(), A.channel = "main", (!e || !H.isInstalled("chat")) && (u.visible = !1, A.members = []), we();
  }, { immediate: !0, flush: "sync" }), he(() => u.visible, (e) => {
    e && ii();
  }), he(() => u.currentUser.uid, () => we()), H.isInstalled("chat") && v.room && Ke(ye(v.room)).catch(() => {
    q.value = "待发队列读取失败，请关闭旧标签页后重试";
  }));
}
class Us {
  constructor() {
    _s();
  }
  connect() {
    ii();
  }
  disconnect() {
    at();
  }
  resetReconnectAndConnect() {
    we();
  }
  async retryMessage(t) {
    await It(t);
  }
  dispatchOutgoing(t, i) {
    if (!i) {
      It(t);
      return;
    }
    gi(t, i).then(() => {
      se.fetch("海狸聊天室", `已发送到 ${i.name}`, "服务器已保存，不代表成员已读。");
    }).catch((r) => {
      se.fetch("海狸聊天室", "分享未确认", r instanceof Error ? r.message : "未确认发送结果，请检查聊天室连接。");
    });
  }
  sendWebsiteShare(t, i) {
    const r = lt(t.url);
    if (!r) {
      se.fetch("海狸聊天室", "未发送", "只支持分享有效的 HTTP(S) 网站地址。");
      return;
    }
    const n = (t.title || "网站").slice(0, 100), s = {
      id: `msg_${crypto.randomUUID()}`,
      sender: { ...u.currentUser, activity: u.shareActivity ? u.currentUser.activity : void 0 },
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
      sender: { ...u.currentUser, activity: u.shareActivity ? u.currentUser.activity : void 0 },
      type: "text",
      content: r,
      timestamp: Date.now()
    };
    if (!i) return It(n);
    try {
      return await gi(n, i), !0;
    } catch (s) {
      return se.fetch("海狸聊天室", "分享未确认", s instanceof Error ? s.message : "未确认发送结果，请检查聊天室连接。"), !1;
    }
  }
  sendMusicShare(t, i) {
    const r = {
      id: `msg_${crypto.randomUUID()}`,
      sender: { ...u.currentUser, activity: u.shareActivity ? u.currentUser.activity : void 0 },
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
      sender: { ...u.currentUser, activity: u.shareActivity ? u.currentUser.activity : void 0 },
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
      sender: { ...u.currentUser, activity: u.shareActivity ? u.currentUser.activity : void 0 },
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
      sender: { ...u.currentUser, activity: u.shareActivity ? u.currentUser.activity : void 0 },
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
      sender: { ...u.currentUser, activity: u.shareActivity ? u.currentUser.activity : void 0 },
      type: "image",
      content: "[图片]",
      meta: {
        imageUrl: t
      },
      timestamp: Date.now()
    };
    return It(i);
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
      sender: { ...u.currentUser, activity: u.shareActivity ? u.currentUser.activity : void 0 },
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
      sender: { ...u.currentUser, activity: u.shareActivity ? u.currentUser.activity : void 0 },
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
    !t.uid || t.uid === u.currentUser.uid || Cs(t.uid).then(() => {
      se.fetch("海狸聊天室", `已向【${t.name}】发送好友申请`, "对方可在聊天室右上角通知中确认。");
    }).catch((r) => {
      se.fetch("海狸聊天室", "好友申请未发送", r instanceof Error ? r.message : "请检查聊天室连接。");
    });
  }
  respondFriendRequest(t, i) {
    t.id && Is(t.id, i).then(() => {
      se.fetch("海狸聊天室", i ? `已通过【${t.from.name}】的好友申请` : "已忽略该申请", i ? "双方已成为好友，可随时点击私聊。" : "");
    }).catch((r) => {
      se.fetch("海狸聊天室", "操作未完成", r instanceof Error ? r.message : "请检查网络。");
    });
  }
}
const Lr = new Us(), ia = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  chatService: Lr
}, Symbol.toStringTag, { value: "Module" })), Ts = {
  schemaVersion: 1,
  id: "chat",
  title: "海狸聊天室",
  emoji: "💬",
  rootId: "vue-chat-dialog-root",
  settingsKeys: ["lw_chat_server_url"],
  capabilities: ["chat:message-read", "chat:message-send"],
  badgeCount: () => u.unreadCount,
  loadView: () => import("./ChatDialog-Sh38Ylfr.js").then((e) => e.default),
  lifecycle: {
    isVisible: () => u.visible,
    canOpen: () => H.isInstalled("chat"),
    open: () => {
      H.isInstalled("chat") && (u.visible = !0, u.unreadCount = 0, Qn.value && Lr.connect());
    },
    hide: () => {
      u.visible = !1;
    },
    canUnmount: () => !0
  }
};
be(Ts);
be(In);
be(vn);
be(kn);
be(yn);
be(bn);
be(hn);
be(wn);
function Ps(e) {
  const t = e.map((i) => ({ ...i }));
  for (const i of tr()) {
    if (i.presentation !== "card" || i.showInDock === !1) continue;
    if (t.some((s) => s.id === i.id)) throw new Error("Duplicate workspace card entry");
    const r = { id: i.id, title: i.title, icon: i.icon }, n = i.dockBefore ? t.findIndex((s) => s.id === i.dockBefore) : -1;
    t.splice(n < 0 ? t.length : n, 0, r);
  }
  return t;
}
function Ms(e) {
  const t = e.map((i) => ({ ...i }));
  for (const i of tr()) {
    if (i.showInDock === !1 || i.presentation === "card") continue;
    if (t.some((s) => s.id === i.id)) throw new Error("Dock module duplicated in legacy tools");
    const r = { id: i.id, title: i.title, icon: i.icon, emoji: i.emoji }, n = i.dockBefore ? t.findIndex((s) => s.id === i.dockBefore) : -1;
    t.splice(n < 0 ? t.length : n, 0, r);
  }
  return t;
}
const Rs = Ps([]), Os = Ms([]), Dr = "logicweaver_dock_custom_order", Mi = "logicweaver_dock_position";
function Ri(e) {
  return e === "bottom" || e === "left" || e === "right" || e === "top";
}
function Ns() {
  try {
    if (typeof localStorage < "u") {
      const e = localStorage.getItem(Mi);
      if (Ri(e)) return e;
    }
  } catch {
  }
  return "bottom";
}
function $s(e) {
  try {
    typeof localStorage < "u" && localStorage.setItem(Mi, e);
  } catch {
  }
}
function Bt() {
  try {
    if (typeof localStorage < "u") {
      const e = localStorage.getItem(Dr);
      if (e) return JSON.parse(e) || {};
    }
  } catch {
  }
  return {};
}
function Yi(e) {
  try {
    typeof localStorage < "u" && localStorage.setItem(Dr, JSON.stringify(e));
  } catch {
  }
}
function Br() {
  const e = Os.filter((i) => H.isInstalled(i.id)), t = Bt().tools;
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
function jr() {
  const e = Rs.filter((i) => H.isInstalled(i.id)), t = Bt().cards;
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
const xs = () => ({
  mounted: !1,
  get activeTargetId() {
    return ur() || Z.activeId || "";
  },
  activeTools: [],
  cards: jr(),
  tools: Br(),
  position: Ns()
}), O = j(xs());
typeof window < "u" && (window.addEventListener("logicweaver:dock-modules-changed", () => {
  O.tools = Br(), O.cards = jr();
}), window.addEventListener("storage", (e) => {
  e.key === Mi && Ri(e.newValue) && (O.position = e.newValue);
}));
jt.onStateChange((e) => {
  O.activeTools = [...e];
});
let fe = {};
function Et(e, t) {
  const i = window.chrome, r = i?.runtime?.getURL ? i.runtime.getURL(t) : t, n = e.includes("newtab") || t.includes("newtab");
  if (window.location.href.includes(e) || n && (window.location.pathname.endsWith("/newtab.html") || window.location.pathname === "/newtab.html"))
    return;
  const s = (a) => {
    const d = (a.url || a.pendingUrl || "").toLowerCase();
    return n ? d.includes("newtab.html") || d.startsWith("chrome://newtab") || d.startsWith("edge://newtab") || d.startsWith("chrome-search://local-ntp") || d.includes("chrome-extension://") && d.includes("newtab") || !!(a.title && (a.title.includes("LogicWeaver 新标签页") || a.title === "新标签页" || a.title === "New Tab")) : d.includes(e.toLowerCase());
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
const ra = {
  getSnapshot() {
    return Vt(O);
  },
  update(e) {
    const { activeTargetId: t, ...i } = e;
    Object.assign(O, i);
  },
  setMounted(e) {
    O.mounted = e;
  },
  setActiveTools(e) {
    O.activeTools = [...e];
  },
  addActiveTool(e) {
    O.activeTools.includes(e) || O.activeTools.push(e);
  },
  removeActiveTool(e) {
    const t = O.activeTools.indexOf(e);
    t >= 0 && O.activeTools.splice(t, 1);
  },
  triggerItem(e, t) {
    const i = typeof window < "u" ? window.location.pathname + window.location.href : "", r = i.includes("bilibili.html") || i.includes("github.html") || i.includes("aihot.html") || i.includes("youtube.html");
    if (e === "home") {
      if (r) {
        Et("newtab.html", "newtab.html");
        return;
      }
      if (fe.onHomeClick) {
        fe.onHomeClick();
        return;
      }
      const n = document.getElementById("daily-toggle");
      n && n.classList.contains("active") && n.classList.remove("active");
      const s = Z.activeId;
      s && ct(s), mn(Z.activeId), typeof window < "u" && window.scrollTo({ top: 0, left: 0, behavior: "instant" });
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
        const o = n[t];
        o ? Et(o, o) : Et("newtab.html", "newtab.html");
        return;
      }
      if (fe.onTargetClick) {
        fe.onTargetClick(t);
        return;
      }
      const s = window;
      O.activeTargetId === t ? typeof s.exitFullscreenCard == "function" && s.exitFullscreenCard() : typeof s.enterFullscreenCard == "function" && s.enterFullscreenCard(t);
      return;
    }
    if (e === "tool") {
      const n = !!document.getElementById("vue-bili-companions-root");
      if (r && !n) {
        Et("newtab.html", "newtab.html");
        return;
      }
      if (!["todoist", "music", "siren", "wallpaper", "stickers", "sync", "chat"].includes(t) && typeof window < "u") {
        const o = window;
        typeof o.exitFullscreenCard == "function" && o.exitFullscreenCard();
      }
      if (fe.onToolClick) {
        fe.onToolClick(t);
        return;
      }
      jt.toggle(t);
      return;
    }
  },
  reorderCards(e) {
    const t = new Map(O.cards.map((n) => [n.id, n])), i = [];
    for (const n of e) {
      const s = t.get(n);
      s && (i.push(s), t.delete(n));
    }
    for (const n of t.values()) i.push(n);
    O.cards = i;
    const r = Bt();
    Yi({ ...r, cards: i.map((n) => n.id) });
  },
  reorderTools(e) {
    const t = new Map(O.tools.map((n) => [n.id, n])), i = [];
    for (const n of e) {
      const s = t.get(n);
      s && (i.push(s), t.delete(n));
    }
    for (const n of t.values()) i.push(n);
    O.tools = i;
    const r = Bt();
    Yi({ ...r, tools: i.map((n) => n.id) });
  },
  setPosition(e) {
    Ri(e) && O.position !== e && (O.position = e, $s(e), typeof window < "u" && window.dispatchEvent(new CustomEvent("logicweaver:dock-position-changed", { detail: e })));
  },
  setActions(e) {
    fe = { ...fe, ...e };
  }
}, Ls = "leaf-newtab-backgrounds", Ds = 1, Te = "current-background", B = "heroBackgroundHistory", Zi = 30, _t = "assets/newtab-mountains.png", Xi = 450, li = 180 * 1024 * 1024;
let wi = [], Ut = 0;
function Bs(e) {
  return wi.push(e), e;
}
function js() {
  wi.forEach((e) => {
    try {
      URL.revokeObjectURL(e);
    } catch {
    }
  }), wi = [];
}
function Oi() {
  return new Promise((e, t) => {
    if (typeof indexedDB > "u") {
      t(new Error("IndexedDB is not supported in this environment"));
      return;
    }
    const i = indexedDB.open(Ls, Ds);
    i.onupgradeneeded = () => {
      const r = i.result;
      r.objectStoreNames.contains("files") || r.createObjectStore("files");
    }, i.onsuccess = () => e(i.result), i.onerror = () => t(i.error);
  });
}
async function Vs(e, t = Te) {
  const i = await Oi();
  return new Promise((r, n) => {
    const s = i.transaction("files", "readwrite");
    s.objectStore("files").put(e, t), s.oncomplete = () => {
      i.close(), r();
    }, s.onerror = () => {
      i.close(), n(s.error);
    }, s.onabort = s.onerror;
  });
}
async function Ws() {
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
async function bi(e = "hero") {
  try {
    const t = await Ws();
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
async function ui(e = Te) {
  try {
    const i = await Oi(), r = await new Promise((n, s) => {
      const o = i.transaction("files", "readonly"), a = o.objectStore("files").get(e);
      a.onsuccess = () => n(a.result || null), o.oncomplete = () => i.close(), o.onerror = () => {
        i.close(), s(o.error);
      };
    });
    if (r) return r;
  } catch {
  }
  const t = await bi(e);
  return t || (e === Te ? bi("hero") : null);
}
async function er(e = Te) {
  const t = await Oi();
  return new Promise((i, r) => {
    const n = t.transaction("files", "readwrite");
    n.objectStore("files").delete(e), n.oncomplete = () => {
      t.close(), i();
    }, n.onerror = () => {
      t.close(), r(n.error);
    }, n.onabort = n.onerror;
  });
}
function Qe(e) {
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
function Ce(e) {
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
function Ni(e) {
  return !!(e && (/^image\//i.test(e.type || "") || /^video\//i.test(e.type || "") || /\.(png|jpe?g|webp|gif|mp4|webm)$/i.test(e.name || "")));
}
function $i(e) {
  return String(e || "").replace(/\\/g, "/").replace(/^\.\//, "").replace(/^\/+/, "");
}
function qs(e, t) {
  const i = String(t || "").trim().replace(/^['"]|['"]$/g, "");
  if (!i || /^(?:[a-z][a-z0-9+.-]*:|#|data:|blob:)/i.test(i)) return "";
  const [r] = i.split(/[?#]/);
  if (!r) return "";
  const n = i.startsWith("/") ? "" : $i(e).split("/").slice(0, -1).join("/"), s = `${n ? n + "/" : ""}${r.replace(/^\/+/, "")}`.split("/"), o = [];
  return s.forEach((a) => {
    !a || a === "." || (a === ".." ? o.pop() : o.push(a));
  }), o.join("/").toLowerCase();
}
function Fs(e, t) {
  return t.type ? t.type : /\.html?$/i.test(e) ? "text/html" : /\.css$/i.test(e) ? "text/css" : /\.m?js$/i.test(e) ? "text/javascript" : /\.png$/i.test(e) ? "image/png" : /\.jpe?g$/i.test(e) ? "image/jpeg" : /\.webp$/i.test(e) ? "image/webp" : /\.gif$/i.test(e) ? "image/gif" : /\.mp4$/i.test(e) ? "video/mp4" : /\.webm$/i.test(e) ? "video/webm" : "application/octet-stream";
}
async function Gs(e) {
  const t = [];
  let i = 0;
  async function r(n, s = "", o = 0) {
    if (!(o > 4 || t.length >= Xi || i >= li))
      for await (const a of n.values()) {
        if (t.length >= Xi || i >= li) break;
        const c = $i(s ? `${s}/${a.name}` : a.name);
        if (a.kind === "file") {
          const d = await a.getFile();
          i += d.size || 0, i <= li && t.push({ path: c, file: d });
        } else a.kind === "directory" && await r(a, c, o + 1);
      }
  }
  return await r(e), t;
}
function Ks(e) {
  return e.filter((t) => /(^|\/)index\.html?$/i.test(t.path) || /\.html?$/i.test(t.path)).sort((t, i) => {
    const r = (n) => /^index\.html?$/i.test(n.path) ? 0 : /(^|\/)index\.html?$/i.test(n.path) ? 1 : 2;
    return r(t) - r(i) || t.path.length - i.path.length;
  })[0] || null;
}
function vi(e, t = []) {
  return typeof e == "string" ? /\.(png|jpe?g|webp|gif|mp4|webm|html?)($|[?#])/i.test(e) && t.push(e) : Array.isArray(e) ? e.forEach((i) => vi(i, t)) : e && typeof e == "object" && Object.values(e).forEach((i) => vi(i, t)), t;
}
async function Hs(e) {
  const t = new Map(e.map((r) => [$i(r.path).toLowerCase(), r])), i = e.filter((r) => /(^|\/)project\.json$/i.test(r.path));
  for (const r of i)
    try {
      const n = JSON.parse(await r.file.text());
      for (const s of vi(n)) {
        const o = t.get(qs(r.path, s));
        if (o && Ni(o.file)) return o.file;
      }
    } catch {
    }
  return null;
}
function zs(e, t, i) {
  const r = i.filter((n) => !/\.(pkg|mpkg)$/i.test(n.path)).map((n) => ({ path: n.path, file: n.file, mime: Fs(n.path, n.file) }));
  return { type: "web", name: e || "Web Wallpaper", entry: t.path, files: r };
}
async function Js(e) {
  const t = await Gs(e), i = Ks(t);
  if (i) return zs(e.name, i, t);
  const r = await Hs(t);
  return r || t.map((s) => s.file).filter(Ni).sort((s, o) => {
    const a = (c) => /\.(mp4|webm)$/i.test(c.name) ? 0 : /\.gif$/i.test(c.name) ? 1 : /^preview\./i.test(c.name) ? 2 : /cover|thumb|poster/i.test(c.name) ? 3 : 4;
    return a(s) - a(o) || o.size - s.size;
  })[0] || null;
}
function Qs(e) {
  return e ? typeof e == "string" ? "自定义图片" : e.name || (e.type === "web" ? "Web Wallpaper" : "自定义背景") : "默认背景";
}
function Ys(e) {
  return typeof e == "string" ? "图片" : e?.type === "web" ? "Web Wallpaper" : e?.type === "db" ? /video/i.test(e.mediaType || "") ? "视频" : "图片/GIF" : "背景";
}
const Si = {
  async loadHistory() {
    const e = await Qe([B, "heroBackground"]);
    return { history: Array.isArray(e[B]) ? e[B] : [], currentValue: e.heroBackground || null };
  },
  async addHistory(e, t = null) {
    const i = `bg-${Date.now()}-${Math.random().toString(16).slice(2)}`;
    let r = e;
    e && typeof e == "object" && (r = { ...e, storageKey: i }), t && await Vs(t, i);
    const n = await Qe([B, "heroBackground"]), s = Array.isArray(n[B]) ? n[B] : [], a = [{
      id: i,
      title: Qs(r),
      kind: Ys(r),
      createdAt: Date.now(),
      value: r
    }, ...s.filter((d) => JSON.stringify(d.value) !== JSON.stringify(r))].slice(
      0,
      Zi
    ), c = s.slice(Zi - 1).filter((d) => d.value?.storageKey && d.value.storageKey !== n.heroBackground?.storageKey);
    return await Promise.all(c.map((d) => er(d.value.storageKey))), await Ce({ [B]: a }), r;
  },
  async deleteHistory(e) {
    const t = await Qe([B, "heroBackground"]), i = (t[B] || []).filter((r) => r.id !== e.id);
    e.value?.storageKey && await er(e.value.storageKey), await Ce({ [B]: i }), JSON.stringify(t.heroBackground) === JSON.stringify(e.value) && await this.clearWallpaper();
  },
  async clearWallpaper() {
    const e = { type: "none" };
    await Ce({ heroBackground: e });
    try {
      localStorage.setItem("lw-current-wallpaper", JSON.stringify(e));
    } catch {
    }
    await this.applyWallpaper(null);
  },
  async setMountain() {
    await Ce({ heroBackground: _t });
    try {
      localStorage.setItem("lw-current-wallpaper", JSON.stringify(_t));
    } catch {
    }
    await this.applyWallpaper(_t);
  },
  async setWallpaper(e) {
    await Ce({ heroBackground: e });
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
    else if (Ni(e))
      r = e, i = { type: "db", name: e.name, mediaType: e.type || "application/octet-stream" };
    else
      throw new Error("请选择 JPG、PNG、WebP、GIF、MP4 或 WebM 壁纸。");
    return i = await this.addHistory(i, r), t && (await Ce({ heroBackground: i }), await this.applyWallpaper(i)), i;
  },
  async importWallpaperDirectory() {
    const e = window;
    if (!e.showDirectoryPicker) throw new Error("当前浏览器不支持直接选择 Wallpaper 文件夹。");
    const t = await e.showDirectoryPicker(), i = await Js(t);
    if (!i) throw new Error("文件夹中没有找到可用的 Web Wallpaper、图片、GIF、MP4 或 WebM。");
    return this.importBackgroundFile(i);
  },
  async applyWallpaper(e) {
    const t = ++Ut;
    if (typeof document > "u") return;
    const i = document.getElementById("launcher"), r = document.getElementById("hero-background-media");
    if (!(!i || !r) && (js(), r.replaceChildren(), i.style.removeProperty("--launcher-image"), !!e)) {
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
        const n = await ui(e.storageKey || Te);
        if (t !== Ut) return;
        if (n?.type === "web") {
          const s = document.createElement("iframe");
          s.title = n.name || "Web Wallpaper";
          const o = typeof chrome < "u" ? chrome : null;
          s.src = o?.runtime?.getURL ? o.runtime.getURL("wallpaper-sandbox.html") : "wallpaper-sandbox.html";
          const a = setTimeout(() => {
            t === Ut && s.parentNode && (console.warn("[Wallpaper] Web wallpaper timeout or failed, auto fallback to mountain"), Si.setMountain());
          }, 1500);
          s.onload = () => {
            clearTimeout(a), s.contentWindow?.postMessage(n, "*");
          }, r.appendChild(s);
        } else
          Si.setMountain();
        return;
      }
      if (e.type === "db") {
        const n = await ui(e.storageKey || Te);
        if (t !== Ut || !(n instanceof Blob)) return;
        const s = Bs(URL.createObjectURL(n));
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
    const i = await ui(e || Te);
    return t?.throwIfAborted(), i instanceof Blob ? URL.createObjectURL(i) : null;
  },
  async updateHistoryTitle(e, t) {
    const i = await Qe([B]), r = Array.isArray(i[B]) ? i[B] : [];
    if (!r.some((s) => s.id === e)) throw new Error("壁纸条目已变化，请刷新");
    const n = r.map((s) => s.id === e ? { ...s, title: t.trim() || s.title } : s);
    await Ce({ [B]: n });
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
        const t = await Qe(["heroBackground"]);
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
        const t = await bi("hero");
        t && (e = {
          type: "db",
          name: t.name || "当前壁纸",
          mediaType: t.type || "application/octet-stream"
        });
      }
      e || (e = _t);
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
  t === "local" && e.heroBackground && Si.applyWallpaper(e.heroBackground.newValue);
});
typeof document < "u" && document.addEventListener("visibilitychange", () => {
  const e = document.querySelector("#hero-background-media video");
  e && (document.hidden ? e.paused || e.pause() : e.paused && e.play().catch(() => {
  }));
});
const $e = te(!1);
let Tt = null;
const na = {
  get isActive() {
    return $e.value;
  },
  /**
   * 进入新用户页面内空态预览沙箱（常用网站变为空无一物）
   */
  enter() {
    if ($e.value) return;
    const e = ni.getState();
    Tt = JSON.parse(JSON.stringify(e)), ni.updateState({
      links: [],
      groupSizes: {},
      folders: {},
      pages: ["常用网站"],
      pageLabels: {},
      activePage: "常用网站"
    }), $e.value = !0, typeof window < "u" && window.dispatchEvent(new CustomEvent("tab-project:guest-preview-changed", {
      detail: { active: !0 }
    }));
  },
  /**
   * 退出新用户预览沙箱，原样恢复用户的真实数据
   */
  exit() {
    $e.value && (Tt && (ni.updateState(Tt), Tt = null), $e.value = !1, typeof window < "u" && window.dispatchEvent(new CustomEvent("tab-project:guest-preview-changed", {
      detail: { active: !1 }
    })));
  },
  toggle() {
    $e.value ? this.exit() : this.enter();
  }
};
function di(e) {
  const t = { group: "", positions: /* @__PURE__ */ Object.create(null) };
  try {
    const i = JSON.parse(e || "null");
    if (!i || typeof i != "object") return t;
    typeof i.group == "string" && (t.group = i.group);
    for (const [r, n] of Object.entries(i.positions || {})) {
      const s = n;
      !s || !Number.isFinite(s.top) || s.top < 0 || (t.positions[r] = {
        top: s.top,
        ...typeof s.anchor == "string" ? { anchor: s.anchor } : {},
        ...Number.isFinite(s.offset) ? { offset: s.offset } : {}
      });
    }
  } catch {
  }
  return t;
}
function Zs(e) {
  const t = /* @__PURE__ */ new Map();
  for (const i of e)
    i.group && t.set(i.group, (t.get(i.group) || 0) + 1);
  return [...t].map(([i, r]) => ({ name: i, count: r }));
}
function Xs(e, t) {
  return Math.max(0, t !== void 0 && e.offset !== void 0 ? t - e.offset : e.top);
}
const eo = ["disabled", "aria-expanded"], to = {
  key: 0,
  class: "lw-select-icon"
}, io = {
  key: 0,
  class: "lw-select-groups",
  role: "group",
  "aria-label": "按厂商浏览"
}, ro = ["aria-pressed"], no = ["aria-pressed", "onClick"], so = {
  key: 0,
  class: "lw-select-empty"
}, oo = ["disabled", "data-select-value", "title", "aria-selected", "onClick"], ao = { class: "lw-item-content" }, co = {
  key: 0,
  class: "lw-item-icon"
}, lo = { class: "lw-item-text" }, uo = {
  key: 0,
  class: "lw-item-check"
}, fo = /* @__PURE__ */ Wr({
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
    const i = e, r = t, n = te(!1), s = te(null), o = te(null), a = te("");
    let c = di(null), d = !1;
    function f() {
      try {
        c = di(i.memoryKey ? localStorage.getItem(i.memoryKey) : null);
      } catch {
        c = di(null);
      }
      a.value = c.group;
    }
    f();
    function h(I = i.memoryKey) {
      const L = o.value;
      if (!L || !d) return;
      const k = [...L.querySelectorAll("[data-select-value]")], re = L.getBoundingClientRect().top, Oe = k.find((ri) => ri.getBoundingClientRect().bottom > re);
      if (c.group = a.value, c.positions[a.value] = {
        top: L.scrollTop,
        anchor: Oe?.dataset.selectValue,
        offset: Oe ? Oe.getBoundingClientRect().top - re : void 0
      }, I)
        try {
          localStorage.setItem(I, JSON.stringify(c));
        } catch {
        }
    }
    async function m() {
      d = !1, await Kr();
      const I = o.value;
      if (!n.value || !I) return;
      const L = [...I.querySelectorAll("[data-select-value]")], k = c.positions[a.value], re = L.find((ri) => ri.dataset.selectValue === (k?.anchor ?? String(i.modelValue))), Oe = re ? re.getBoundingClientRect().top - I.getBoundingClientRect().top + I.scrollTop : void 0;
      I.scrollTop = k ? Xs(k, Oe) : Math.max(0, (Oe ?? 0) - I.clientHeight / 2), d = y.value.length > 0;
    }
    function g() {
      h(), n.value = !1;
    }
    async function w(I) {
      I !== a.value && (h(), a.value = I, await m(), h());
    }
    const b = me(() => i.options.map((I) => typeof I == "object" && I !== null ? I : { value: I, label: String(I) })), S = me(() => i.grouped ? Zs(b.value) : []), y = me(() => a.value && i.grouped ? b.value.filter((I) => I.group === a.value) : b.value);
    he(() => i.memoryKey, (I, L) => {
      h(L), f(), n.value && m();
    }), he(b, () => {
      a.value && S.value.length && !S.value.some((I) => I.name === a.value) && (a.value = ""), n.value && m();
    }, { flush: "post" }), qr(() => h());
    const C = me(() => b.value.find((I) => String(I.value) === String(i.modelValue))), E = me(() => C.value?.label ?? i.placeholder);
    function D() {
      if (!i.disabled) {
        if (n.value) {
          g();
          return;
        }
        b.value.length && a.value && !S.value.some((I) => I.name === a.value) && (a.value = ""), n.value = !0, m();
      }
    }
    function P(I) {
      I.disabled || i.disabled || (g(), String(I.value) !== String(i.modelValue) && (r("update:modelValue", I.value), r("change", I.value)));
    }
    function x(I) {
      !n.value || !s.value || s.value.contains(I.target) || g();
    }
    function T(I) {
      n.value && I.key === "Escape" && g();
    }
    return Fr(() => {
      document.addEventListener("pointerdown", x, !0), window.addEventListener("keydown", T);
    }), Gr(() => {
      document.removeEventListener("pointerdown", x, !0), window.removeEventListener("keydown", T);
    }), (I, L) => (z(), J("div", {
      ref_key: "containerRef",
      ref: s,
      class: gt(["lw-custom-select", [`size-${e.size}`, { "is-open": n.value, "is-disabled": e.disabled }]])
    }, [
      ve("button", {
        type: "button",
        class: "lw-select-trigger",
        disabled: e.disabled,
        "aria-expanded": n.value,
        onClick: D
      }, [
        C.value?.icon ? (z(), J("span", to, Se(C.value.icon), 1)) : Ne("", !0),
        ve("span", {
          class: gt(["lw-select-label", { "is-placeholder": !C.value }])
        }, Se(E.value), 3),
        L[2] || (L[2] = ve("span", {
          class: "lw-select-chevron",
          "aria-hidden": "true"
        }, "▾", -1))
      ], 8, eo),
      n.value ? (z(), J("div", {
        key: 0,
        class: gt(["lw-select-dropdown", { "is-grouped": e.grouped }])
      }, [
        S.value.length ? (z(), J("div", io, [
          ve("button", {
            type: "button",
            "aria-pressed": !a.value,
            onClick: L[0] || (L[0] = (k) => w(""))
          }, "全部 · " + Se(b.value.length), 9, ro),
          (z(!0), J(xi, null, Li(S.value, (k) => (z(), J("button", {
            key: k.name,
            type: "button",
            "aria-pressed": a.value === k.name,
            onClick: (re) => w(k.name)
          }, Se(k.name) + " · " + Se(k.count), 9, no))), 128))
        ])) : Ne("", !0),
        ve("div", {
          ref_key: "listRef",
          ref: o,
          class: "lw-select-list",
          role: "listbox",
          onScrollPassive: L[1] || (L[1] = (k) => h())
        }, [
          y.value.length ? Ne("", !0) : (z(), J("div", so, " 暂无可用选项 ")),
          (z(!0), J(xi, null, Li(y.value, (k) => (z(), J("button", {
            key: String(k.value),
            type: "button",
            class: gt(["lw-select-item", {
              "is-active": String(k.value) === String(e.modelValue),
              "is-disabled": k.disabled
            }]),
            disabled: k.disabled,
            "data-select-value": String(k.value),
            title: k.label,
            role: "option",
            "aria-selected": String(k.value) === String(e.modelValue),
            onClick: (re) => P(k)
          }, [
            ve("span", ao, [
              k.icon ? (z(), J("span", co, Se(k.icon), 1)) : Ne("", !0),
              ve("span", lo, Se(k.label), 1)
            ]),
            String(k.value) === String(e.modelValue) ? (z(), J("span", uo, "✓")) : Ne("", !0)
          ], 10, oo))), 128))
        ], 544)
      ], 2)) : Ne("", !0)
    ], 2));
  }
}), sa = /* @__PURE__ */ Yr(fo, [["__scopeId", "data-v-24f4c9d8"]]);
function oa(e, t) {
  if (document.getElementById(e)) return;
  const i = document.createElement("style");
  i.id = e, i.textContent = t, document.head.appendChild(i);
}
export {
  Ao as $,
  l as A,
  To as B,
  sa as C,
  Lr as D,
  _t as E,
  Ri as F,
  qo as G,
  ci as H,
  Nt as I,
  Uo as J,
  Go as K,
  v as L,
  $ as M,
  u as N,
  It as O,
  is as P,
  A as Q,
  Gi as R,
  Qo as S,
  Fo as T,
  Vi as U,
  ar as V,
  Si as W,
  cr as X,
  Io as Y,
  ko as Z,
  Co as _,
  dn as a,
  an as a0,
  Eo as a1,
  Rr as a2,
  Ft as a3,
  Or as a4,
  ks as a5,
  ea as a6,
  Zo as a7,
  ta as a8,
  Xo as a9,
  No as aA,
  ls as aB,
  Yo as aC,
  qe as aD,
  Ss as aE,
  Ho as aF,
  As as aG,
  Jo as aH,
  ia as aI,
  ki as aa,
  rt as ab,
  xn as ac,
  Po as ad,
  gr as ae,
  Mo as af,
  Ro as ag,
  Ci as ah,
  pe as ai,
  pi as aj,
  Qn as ak,
  Vo as al,
  Wo as am,
  Xn as an,
  q as ao,
  fr as ap,
  Oo as aq,
  lt as ar,
  $o as as,
  Lo as at,
  zo as au,
  Ko as av,
  Do as aw,
  Bo as ax,
  jo as ay,
  xo as az,
  en as b,
  ne as c,
  as as d,
  Xr as e,
  rr as f,
  er as g,
  ln as h,
  $e as i,
  na as j,
  p as k,
  ae as l,
  ra as m,
  se as n,
  vo as o,
  Ae as p,
  _ as q,
  Z as r,
  Ai as s,
  Y as t,
  _o as u,
  gn as v,
  mn as w,
  O as x,
  So as y,
  oa as z
};
