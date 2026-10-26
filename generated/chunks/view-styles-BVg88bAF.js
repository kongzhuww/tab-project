import { c as Tr, w as Mt, h as V, r as J, l as Wi } from "./window-manager.store-Dfe7fisV.js";
import { r as N, s as li, a as Rt, x as _e, b as Oe } from "./vendor-vue-DokqDua_.js";
import { c as ct, S as Pr, p as Mr } from "./InlineEditStatus.vue_vue_type_style_index_0_scoped_28642927_lang-ChQUbu-A.js";
import { t as lt, p as Rr } from "./module-state-BT0PQSND.js";
import { P as U, a as Jt } from "./search.service-Du6XfCKa.js";
import { R as Or } from "./read-session-e15k1OwA.js";
const Ve = "notificationHistoryV1", Vi = 200, Nr = 30 * 864e5;
function At(e) {
  if (e?.type === "todoist-task" && typeof e.taskId == "string" && /^[A-Za-z0-9_-]{1,100}$/.test(e.taskId)) return { type: e.type, taskId: e.taskId };
  if (e?.type === "module" && typeof e.moduleId == "string" && /^[a-z][a-z0-9-]{0,60}$/.test(e.moduleId)) return { type: e.type, moduleId: e.moduleId };
  if (e?.type === "bili-messages") return { type: e.type };
  if (e?.type === "github-repository" && typeof e.fullName == "string" && e.fullName.length <= 240 && /^[\w.-]+\/[\w.-]+$/.test(e.fullName) && !e.fullName.split("/").some((t) => t === "." || t === "..")) return { type: e.type, fullName: e.fullName };
}
function De(e, t) {
  return typeof e != "string" ? "" : e.slice(0, 6e3).replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g, "").replace(/\bBearer\s+[A-Za-z0-9._~+\/-]+=*/gi, "Bearer [已隐藏]").replace(/\b(?:ghp_|github_pat_|sk-)[A-Za-z0-9_-]{8,}/g, "[已隐藏]").replace(/((?:token|password|passwd|secret|api[_-]?key|authorization|cookie)\s*[:=]\s*)[^\s,;]+/gi, "$1[已隐藏]").replace(/https?:\/\/[^\s<>"']+/gi, (i) => {
    try {
      const r = new URL(i);
      return r.username = "", r.password = "", r.search = "", r.hash = "", r.href;
    } catch {
      return "[链接]";
    }
  }).slice(0, t);
}
function qi(e) {
  if (!e || typeof e.id != "string" || !/^[A-Za-z0-9_:-]{1,200}$/.test(e.id) || typeof e.title != "string" || !Number.isFinite(e.createdAt) || !["info", "success", "warning", "error"].includes(e.level)) throw new Error("Invalid notification record");
  return { id: e.id, appType: De(e.appType, 40), appName: De(e.appName, 60), title: De(e.title, 160), subtitle: De(e.subtitle, 240), message: De(e.message, 2e3), level: e.level, createdAt: e.createdAt, read: e.read === !0, target: At(e.target) };
}
function Fi(e) {
  if (e == null) return { version: 0, items: [] };
  if (!e || !Number.isSafeInteger(e.version) || e.version < 0 || !Array.isArray(e.items) || e.items.length > Vi) throw new Error("Invalid notification history");
  const t = Date.now();
  return { version: e.version, items: e.items.map(qi).filter((i) => i.createdAt >= t - Nr && i.createdAt <= t + 6e4).sort((i, r) => r.createdAt - i.createdAt) };
}
let ki = Promise.resolve();
function Ae(e, t) {
  const i = ki.then(async () => {
    if (typeof chrome > "u" || !chrome.storage?.local)
      throw new Error("Chrome storage API unavailable");
    const r = await chrome.storage.local.get(Ve), n = Fi(r[Ve]);
    if (e === "list")
      return n;
    if (e === "append") {
      const s = qi(t);
      s.createdAt = Date.now(), s.read = !1, n.items.some((o) => o.id === s.id) || n.items.unshift(s), n.items = n.items.slice(0, Vi);
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
  return ki = i.catch(() => {
  }), i;
}
const A = N({
  isOpen: !1,
  loading: !1,
  saving: !1,
  error: "",
  version: -1,
  items: []
}), Ds = li(() => A.items.filter((e) => !e.read).length);
let Ci = !1;
function fe(e) {
  e.version < A.version || (A.version = e.version, A.items = e.items);
}
const $r = {
  state: A,
  start() {
    Ci || (Ci = !0, typeof chrome < "u" && chrome.storage?.onChanged && chrome.storage.onChanged.addListener((e, t) => {
      if (!(t !== "local" || !e[Ve]))
        try {
          fe(Fi(e[Ve].newValue));
        } catch {
          A.error = "通知历史格式异常，未覆盖当前记录。";
        }
    }), this.refresh());
  },
  async refresh() {
    A.loading = !0;
    try {
      const e = await Ae("list");
      fe(e), A.error = "";
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
  async markRead(e) {
    if (!A.saving) {
      A.saving = !0;
      try {
        const t = await Ae("read", e);
        fe(t), A.error = "";
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
        const e = await Ae("read-all");
        fe(e), A.error = "";
      } catch {
        A.error = "全部标记已读未确认，请重试。";
      } finally {
        A.saving = !1;
      }
    }
  },
  async remove(e) {
    if (!A.saving) {
      A.saving = !0;
      try {
        const t = await Ae("remove", e);
        fe(t), A.error = "";
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
        const e = await Ae("clear");
        fe(e), A.error = "";
      } catch {
        A.error = "清空通知未确认，请重试。";
      } finally {
        A.saving = !1;
      }
    }
  },
  async activate(e) {
    await this.markRead(e.id), e.target && await this.openTarget(e.target);
  },
  async openTarget(e) {
    const t = At(e);
    if (t)
      try {
        if (t.type === "todoist-task") {
          const { openTodoistTask: i } = await import("./task-navigation-DnsZubWl.js");
          i(t.taskId);
        } else if (t.type === "github-repository") {
          const { githubRepoDetailController: i } = await import("./search.service-Du6XfCKa.js").then((r) => r.a6);
          i.open(t.fullName);
        } else if (t.type === "bili-messages") {
          const { biliMessagePanelController: i } = await import("./message-panel-store-jrtqwP8n.js");
          i.openPanel();
        } else {
          const { getDockModule: i } = await import("./window-manager.store-Dfe7fisV.js").then((n) => n.m);
          if (!i(t.moduleId)) throw new Error();
          const { windowManagerController: r } = await import("./window-manager.store-Dfe7fisV.js").then((n) => n.n);
          r.open(t.moduleId);
        }
        this.close();
      } catch {
        A.error = "通知对应页面暂不能打开，记录已保留。";
      }
  }
};
function xr(e) {
  $r.start(), Ae("append", e).then((t) => fe(t)).catch(() => {
    A.error = "有一条通知未获持久保存确认。";
  });
}
const X = N([]), ut = /* @__PURE__ */ new Map();
function Dr(e, t) {
  return e.history !== void 0 ? e.history : e.level === "warning" || e.level === "error" || /失败|错误|异常|未确认|未获确认|未保存|无法|不可用|拒绝|超时|警告|到期|时间已到/.test(t) ? !0 : /复制成功|已复制|保存成功|已保存|设置成功|已更新设置|配置已更新|已设为|已取消|已切换/.test(t) || /^(正在|开始读取|加载中|同步中)/.test(t) ? !1 : e.appType === "chat" || e.appType === "bili" || /提醒|任务已创建|任务完成|已完成任务|任务结果|下载完成|新消息|新私信|新回复|新提及|有可用更新/.test(t);
}
const Ii = {
  chat: { name: "海狸聊天室", icon: "assets/icon-48.png", action: "查看消息" },
  qq: { name: "QQ", icon: "assets/qq.png", action: "查看消息" },
  bili: { name: "哔哩哔哩", icon: "assets/bilibili.svg", action: "查看消息" },
  phone: { name: "手机文件", icon: "assets/nav-traffic.svg", action: "复制文件" },
  fetch: { name: "LogicWeaver", icon: "assets/icon-48.png", action: "" }
};
function kt(e) {
  const t = X.find((i) => i.id === e);
  !t || t.closing || (t.closing = !0, window.setTimeout(() => {
    const i = X.findIndex((r) => r.id === e);
    i >= 0 && X.splice(i, 1);
  }, 260));
}
function Lr() {
  for (const e of X) kt(e.id);
}
function Gi(e) {
  if (!e) return null;
  const t = e.appType || "fetch", i = Ii[t] || Ii.fetch, r = String(e.title || "新消息通知"), n = String(e.subtitle || ""), s = String(e.message || ""), o = Math.max(500, Number(e.duration) || 7e3), c = String(e.id || `${t}_${r}_${n}_${s}`).trim(), a = Date.now();
  for (const [v, I] of ut)
    a - I > 3e4 && ut.delete(v);
  const d = e.id ? 200 : o <= 4e3 ? 1200 : 3e3, f = ut.get(c);
  if (f && a - f < d || X.some((v) => v.fingerprint === c && !v.closing)) return null;
  ut.set(c, a);
  const h = `toast_${crypto.randomUUID()}`, p = {
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
    duration: o,
    onClick: typeof e.onClick == "function" ? e.onClick : null,
    closing: !1,
    target: At(e.target)
  };
  X.push(p);
  const g = r + " " + n + " " + s;
  if (Dr(e, g)) {
    const v = e.level || (/失败|错误|异常|未确认|未获确认|无法|超时/.test(g) ? "error" : "info"), I = At(e.target) || (t === "bili" ? { type: "bili-messages" } : t === "chat" ? { type: "module", moduleId: "chat" } : void 0);
    xr({ id: h, appType: t, appName: p.appName, title: r, subtitle: n, message: s, level: v, createdAt: a, read: !1, target: I });
  }
  const w = X.filter((v) => !v.closing);
  return w.length > 5 && kt(w[0].id), Object.freeze({ id: h, close: () => kt(h) });
}
function Br(e, t, i = "", r = "assets/logo.png", n = 3200) {
  return Gi({ appType: "fetch", appName: e, title: t, subtitle: i, icon: r, duration: n, showActions: !1, actionLabel: "" });
}
const Ls = Rt(X), Y = Object.freeze({
  show: Gi,
  fetch: Br,
  close: kt,
  clear: Lr,
  get size() {
    return X.filter((e) => !e.closing).length;
  }
}), dt = "https://monster-siren.hypergryph.com/api", ft = "msFavoriteSongs";
class ke {
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
    return ke.instance || (ke.instance = new ke()), ke.instance;
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
    const i = await (await fetch(`${dt}/songs`, { headers: { Accept: "application/json" } })).json();
    return (i.data?.list || i.data || []).map((n) => ({
      cid: n.cid,
      name: n.name,
      artists: n.artists || [],
      albumCid: n.albumCid,
      coverUrl: n.albumCid && this.albumCoverMap.get(String(n.albumCid)) || ""
    }));
  }
  async getSirenAlbums() {
    const n = ((await (await fetch(`${dt}/albums`, { headers: { Accept: "application/json" } })).json()).data || []).map((s) => ({
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
    const n = await (await fetch(`${dt}/album/${t}/data`, { headers: { Accept: "application/json" } })).json(), s = n.data?.songs || [], o = n.data?.coverUrl || "", c = s.map((a) => ({
      cid: a.cid,
      name: a.name,
      artists: a.artists || [],
      albumCid: t,
      coverUrl: o
    }));
    return this.albumDetailCache.set(i, c), c;
  }
  async getSirenSongUrl(t) {
    const r = await (await fetch(`${dt}/song/${t}`, { headers: { Accept: "application/json" } })).json();
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
      if (t.isNetease && t.neteaseId ? s = await U.getSongAudioUrl(t.neteaseId) : s = (await this.getSirenSongUrl(t.cid)).sourceUrl, !n()) return !1;
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
    U.addRecentSong(t);
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
const R = ke.getInstance(), Ce = N({ visible: !1, pendingWrites: 0 }), Te = N({ visible: !1, pendingWrites: 0 }), Xt = /* @__PURE__ */ new Set();
function Bs(e) {
  return Xt.add(e), () => {
    Xt.delete(e);
  };
}
function jr() {
  for (const e of Xt) e();
}
async function js(e) {
  Ce.pendingWrites++;
  try {
    return await e();
  } finally {
    Ce.pendingWrites--;
  }
}
const Ki = "netease_cached_playlists", Hi = "netease_cached_favorites_songs", Pe = /* @__PURE__ */ new Map(), Me = /* @__PURE__ */ new Map();
let Ct;
function Ei(e) {
  const t = Me.get(e);
  if (t) return t;
  try {
    const i = localStorage.getItem(e), r = Pe.get(e);
    if (r?.raw === i) return r.value;
    const n = i ? JSON.parse(i) : [], s = Array.isArray(n) ? n : [];
    return Pe.set(e, { raw: i, value: s }), s;
  } catch {
    return [];
  }
}
function Ji() {
  clearTimeout(Ct), Ct = void 0;
  for (const [e, t] of Me)
    try {
      const i = JSON.stringify(t);
      localStorage.getItem(e) !== i && localStorage.setItem(e, i), Pe.set(e, { raw: i, value: t });
    } catch {
      Pe.delete(e);
    }
  Me.clear();
}
function Ws(e, t) {
  Me.set(e, t), Ct === void 0 && (Ct = setTimeout(Ji, 250));
}
function Vs(e) {
  Me.delete(e), Pe.delete(e);
  try {
    localStorage.removeItem(e);
  } catch {
  }
}
typeof window < "u" && (window.addEventListener("pagehide", Ji), window.addEventListener("storage", (e) => {
  if (e.storageArea === localStorage)
    for (const t of [Ki, Hi])
      (e.key === null || e.key === t) && (Pe.delete(t), Me.delete(t));
}));
function Ie(e) {
  return (!Number.isFinite(e) || e < 0) && (e = 0), Math.floor(e / 60) + ":" + String(Math.floor(e % 60)).padStart(2, "0");
}
const qs = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Ccircle cx='32' cy='32' r='30' fill='%231e1e24'/%3E%3Ctext x='32' y='38' fill='%23ec4141' font-size='22' text-anchor='middle'%3E%E2%99%AC%3C/text%3E%3C/svg%3E", Wr = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Cdefs%3E%3CradialGradient id='msrVinyl' cx='50%25' cy='50%25' r='50%25'%3E%3Cstop offset='0%25' stop-color='%2327272a'/%3E%3Cstop offset='70%25' stop-color='%2309090b'/%3E%3Cstop offset='100%25' stop-color='%23000000'/%3E%3C/radialGradient%3E%3C/defs%3E%3Ccircle cx='32' cy='32' r='31' fill='url(%23msrVinyl)' stroke='%233f3f46' stroke-width='1.5'/%3E%3Ccircle cx='32' cy='32' r='24' fill='none' stroke='%2327272a' stroke-width='1' stroke-dasharray='3 2'/%3E%3Ccircle cx='32' cy='32' r='18' fill='none' stroke='%2318181b' stroke-width='1'/%3E%3Ccircle cx='32' cy='32' r='11' fill='%23f59e0b' opacity='0.9'/%3E%3Ccircle cx='32' cy='32' r='4' fill='%2309090b'/%3E%3Ccircle cx='32' cy='32' r='1.5' fill='%23fafafa'/%3E%3C/svg%3E", Vr = () => ({
  mounted: !1,
  playing: !1,
  title: "塞壬唱片 · 点击播放",
  artist: "明日方舟音乐库",
  coverUrl: Wr,
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
}), m = N(Vr());
let M = {};
const qr = {
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
    m.title = e || "塞壬唱片 · 点击播放", m.artist = t || "明日方舟音乐库", m.coverUrl = i || "";
  },
  setProgress(e, t) {
    m.currentTime = e, m.duration = t, m.formattedCurrent = Ie(e), m.formattedDuration = Ie(t), t > 0 ? m.progressPercent = Math.min(100, Math.max(0, e / t * 100)) : m.progressPercent = 0;
  },
  setLiked(e) {
    m.liked = e;
  },
  setMode(e) {
    m.mode = e;
  },
  togglePicker(e) {
    e !== void 0 ? Te.visible = e : Te.visible = !Te.visible;
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
    M = { ...M, ...e };
  },
  playTrack(e) {
    m.isBiliRadio = !1;
    const t = window;
    if (t.LogicWeaverBiliRadioPlayer?.getState?.()?.playing && t.LogicWeaverBiliRadioPlayer.toggle(), M.playCid)
      M.playCid(e);
    else {
      const r = [...m.songs, ...m.favorites].find((n) => String(n.cid) === String(e));
      r ? R.playSong(r) : R.playSong({ cid: e, name: "塞壬唱片", artists: ["塞壬唱片"] }), window.dispatchEvent(new CustomEvent("logicweaver:music-play-cid", { detail: { cid: e } }));
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
    M.togglePlay ? M.togglePlay() : (R.togglePlay(), window.dispatchEvent(new CustomEvent("logicweaver:music-toggle-play")));
  },
  prev() {
    if (m.isBiliRadio) {
      const e = window;
      if (typeof e.LogicWeaverBiliRadioPlayer?.prev == "function") {
        e.LogicWeaverBiliRadioPlayer.prev();
        return;
      }
    }
    M.prev ? M.prev() : (R.prev(), window.dispatchEvent(new CustomEvent("logicweaver:music-prev")));
  },
  next() {
    if (m.isBiliRadio) {
      const e = window;
      if (typeof e.LogicWeaverBiliRadioPlayer?.next == "function") {
        e.LogicWeaverBiliRadioPlayer.next();
        return;
      }
    }
    M.next ? M.next() : (R.next(), window.dispatchEvent(new CustomEvent("logicweaver:music-next")));
  },
  toggleLike() {
    if (M.toggleLike)
      M.toggleLike();
    else {
      const e = R.getState().currentSong;
      e && (m.liked = R.toggleLike(e), m.favorites = R.getFavorites()), window.dispatchEvent(new CustomEvent("logicweaver:music-toggle-like"));
    }
  },
  cycleMode() {
    if (M.cycleMode)
      M.cycleMode();
    else {
      const e = R.cyclePlayMode();
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
    M.seek ? M.seek(e) : (R.seek(e), window.dispatchEvent(new CustomEvent("logicweaver:music-seek", { detail: { percent: e } })));
  },
  openPanel() {
    M.openPanel ? M.openPanel() : (qr.togglePicker(!0), window.dispatchEvent(new CustomEvent("logicweaver:music-open-panel")));
  },
  openNetease() {
    m.pickerTab = "netease", m.pickerOpen = !0, m.activeAlbum = null, this.loadNeteaseData();
  },
  async loadNeteaseData() {
    m.neteaseUser = U.getUser(), m.neteaseRecentSongs = U.getRecentSongs(), m.neteaseLoading = !0;
    try {
      const [e] = await Promise.all([
        U.getPlaylists(),
        U.fetchAccountRecentSongs(60).catch(() => [])
      ]);
      if (m.neteasePlaylists = e, m.neteaseRecentSongs = U.getRecentSongs(), e.length > 0) {
        const t = e.find((i) => i.name.includes("喜欢的音乐") || i.name.includes("Favorite")) || e[0];
        (!m.neteaseActivePlaylist || m.neteaseActivePlaylist.id !== t.id) && await this.selectNeteasePlaylist(t);
      }
    } catch (e) {
      console.warn("[MusicStore] Load netease playlists error:", e);
    } finally {
      m.neteaseLoading = !1, m.neteaseRecentSongs = U.getRecentSongs();
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
          const i = await U.getPlaylistTracks(e.id, 10, 0);
          m.neteaseActivePlaylist?.id === e.id && !m.neteaseSongs.length && (m.neteaseSongs = i, m.neteaseLoading = !1);
        } catch {
        }
      const t = await U.getPlaylistTracks(e.id, 500, 0);
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
      const i = await U.searchSongs(t);
      m.neteaseSearchResults = i;
    } catch (i) {
      console.warn("[MusicStore] Search netease error:", i);
    } finally {
      m.neteaseLoading = !1;
    }
  },
  syncFromBiliRadio(e) {
    m.isBiliRadio = !0, m.isNetease = !1, m.playing = e.playing, m.title = e.title || "B站电台", m.artist = e.artist || e.seriesName || "哔哩哔哩", e.coverUrl && (m.coverUrl = e.coverUrl), m.currentTime = e.currentTime, m.duration = e.duration, m.formattedCurrent = Ie(e.currentTime), m.formattedDuration = Ie(e.duration), m.progressPercent = e.duration > 0 ? Math.min(100, Math.max(0, e.currentTime / e.duration * 100)) : 0, m.currentLyric = e.lyric || "", m.biliRadioSeriesName = e.seriesName || "";
    const t = R.getAudioElement();
    e.playing && t && !t.paused && t.pause();
  },
  playNeteaseTrack(e) {
    m.isBiliRadio = !1;
    const t = window;
    t.LogicWeaverBiliRadioPlayer?.getState?.()?.playing && t.LogicWeaverBiliRadioPlayer.toggle(), e && (U.recordRecentSong(e), m.neteaseRecentSongs = U.getRecentSongs()), R.playNeteaseSong(e);
  },
  clearNeteaseRecent() {
    U.clearRecentSongs().catch(() => console.warn("[MusicStore] Recent history removal failed; re-read before retry"));
  },
  refreshRecentSongs() {
    m.neteaseRecentSongs = U.getRecentSongs();
  },
  stopNeteaseQrLogin() {
  },
  async startNeteaseQrLogin() {
    this.stopNeteaseQrLogin();
    try {
      await U.connectWebsiteAccount(), m.neteaseQrStatus = "官网账户已连接", await this.loadNeteaseData();
    } catch (e) {
      m.neteaseQrStatus = e?.message || "请先在网易云官网登录。";
    }
  },
  async logoutNetease() {
    await U.logout(), m.neteaseUser = null, m.neteasePlaylists = [], m.neteaseActivePlaylist = null, m.neteaseSongs = [], m.neteaseSearchResults = [];
  }
};
typeof window < "u" && (window.addEventListener("netease:account-updated", () => {
  m.neteaseUser = U.getUser(), m.neteasePlaylists = [], m.neteaseSongs = [], m.neteaseSearchResults = [], m.neteaseActivePlaylist = null;
}), window.addEventListener("netease:recent-updated", (e) => {
  Array.isArray(e.detail) ? m.neteaseRecentSongs = e.detail : m.neteaseRecentSongs = U.getRecentSongs();
}), R.subscribe((e) => {
  m.playing = e.playing, m.currentTime = e.currentTime, m.duration = e.duration, m.formattedCurrent = Ie(e.currentTime), m.formattedDuration = Ie(e.duration), e.duration > 0 ? m.progressPercent = Math.min(100, Math.max(0, e.currentTime / e.duration * 100)) : m.progressPercent = 0, m.mode = e.mode, m.isNetease = !!e.currentSong?.isNetease, m.currentLyric = e.currentLyric || "", e.currentSong && (m.title = e.currentSong.name || "塞壬唱片 · 点击播放", m.artist = (e.currentSong.artists || []).join(", ") || "明日方舟音乐库", m.coverUrl = e.currentSong.coverUrl || "", m.liked = R.isLiked(e.currentSong.cid));
}));
async function Fs() {
  try {
    if (m.favorites = R.getFavorites(), m.neteaseRecentSongs = U.getRecentSongs(), m.neteaseUser = U.getUser(), typeof localStorage < "u")
      try {
        const i = Ei(Hi);
        if (i.length) {
          const n = i;
          Array.isArray(n) && n.length > 0 && m.neteaseSongs.length === 0 && (m.neteaseSongs = n);
        }
        const r = Ei(Ki);
        if (r.length) {
          const n = r;
          Array.isArray(n) && n.length > 0 && m.neteasePlaylists.length === 0 && (m.neteasePlaylists = n);
        }
      } catch {
      }
    const [e, t] = await Promise.all([
      R.getSirenSongs().catch(() => []),
      R.getSirenAlbums().catch(() => [])
    ]);
    e.length > 0 && m.songs.length === 0 && (m.songs = e, R.setQueue(e, -1, !1)), t.length > 0 && m.albums.length === 0 && (m.albums = t);
  } catch (e) {
    console.warn("[MusicStore] initHomeMusicService failed:", e);
  }
}
const F = N({
  avatarUrl: "assets/bilibili.svg",
  userName: "哔哩哔哩用户",
  buttonTitle: "通知中心"
}), Fr = () => ({
  mounted: !1,
  visible: !1,
  x: 0,
  y: 0,
  avatarUrl: "assets/bilibili.svg",
  userName: "用户"
}), le = N(Fr());
let j = {};
const Gr = {
  getSnapshot() {
    return Rt(le);
  },
  update(e) {
    Object.assign(le, e);
  },
  setMounted(e) {
    le.mounted = e;
  },
  open(e, t) {
    le.x = e, le.y = t, le.visible = !0;
    const i = document.getElementById("bili-profile-menu");
    i && (i.hidden = !1, i.style.left = `${Math.min(window.innerWidth - 205, e)}px`, i.style.top = `${Math.min(window.innerHeight - 150, t)}px`);
  },
  close() {
    le.visible = !1;
    const e = document.getElementById("bili-profile-menu");
    e && (e.hidden = !0);
  },
  trigger(e) {
    if (Gr.close(), j.onAction) {
      j.onAction(e);
      return;
    }
    e === "messages" && j.showInfo ? j.showInfo() : e === "refresh" && j.refresh ? j.refresh() : e === "switch" && j.switchUser ? j.switchUser() : e === "web" && j.openWeb ? j.openWeb() : window.dispatchEvent(new CustomEvent("logicweaver:profile-menu-action", { detail: { action: e } }));
  },
  setActions(e) {
    j = { ...j, ...e };
  }
}, Ui = [
  "todoist",
  "card-github",
  "daily-aihot",
  "daily-bilibili",
  "daily-youtube",
  "daily-pricing"
], It = "lw_active_card";
function Kr() {
  try {
    if (typeof localStorage < "u" && localStorage.removeItem(It), typeof window < "u" && window.location?.hash) {
      const e = window.location.hash.replace(/^#/, "");
      if (Ui.includes(e))
        return e;
    }
    if (typeof sessionStorage < "u") {
      const e = sessionStorage.getItem(It);
      if (e && Ui.includes(e))
        return e;
    }
  } catch {
  }
  return null;
}
const z = N({
  activeId: Kr()
});
typeof window < "u" && _e(
  () => z.activeId,
  (e) => {
    try {
      e ? (sessionStorage.setItem(It, e), window.location.hash !== `#${e}` && history.replaceState(null, "", `#${e}`)) : (sessionStorage.removeItem(It), window.location.hash && history.replaceState(null, "", window.location.pathname + window.location.search));
    } catch {
    }
  },
  { immediate: !0 }
);
let Et;
function Gs(e) {
  Et = e;
}
function Xe(e) {
  if (!Et) throw new Error("Fullscreen card host not ready");
  Et.enter(e);
}
function et(e) {
  z.activeId === e && Et?.exit();
}
const Hr = {
  "bilibili.html": "daily-bilibili",
  "github.html": "card-github",
  "aihot.html": "daily-aihot",
  "youtube.html": "daily-youtube",
  "pricing.html": "daily-pricing"
};
function zi() {
  return typeof location > "u" ? null : Hr[location.pathname.split("/").pop() || ""] || null;
}
const Ks = li(() => {
  const e = zi() || z.activeId;
  if (e) return e;
  const t = Tr.activeId;
  return t && Mt.isActive(t) ? t : "home";
}), Jr = {
  schemaVersion: 1,
  id: "card-github",
  title: "github插件",
  icon: "assets/nav-github.svg",
  presentation: "card",
  dockBefore: "daily-aihot",
  rootId: "card-github",
  settingsKeys: ["ghUser", "ghToken", "ghAiServiceConfigV1", "ghArchifyWebhookUrl"],
  capabilities: ["workspace:fullscreen", "view:retained", "github:repositories"],
  loadView: () => import("./GitHubWorkspaceCard-BYPNc9Xk.js").then((e) => e.default),
  lifecycle: {
    isVisible: () => z.activeId === "card-github",
    open: () => Xe("card-github"),
    hide: () => et("card-github"),
    // Existing card menus do not expose Quit/Reload. Do not introduce a destructive new path
    // until settings drafts and every child editor provide an aggregate unmount guard.
    canUnmount: () => !1,
    unmountBlockedMessage: "GitHub 工作区保留原有隐藏保活设计；尚未开放独立退出/重载，以免丢失草稿。"
  }
}, zr = N({
  showWeather: !0,
  showSites: !0,
  showBili: !0,
  showYouTube: !0,
  showTodo: !0,
  showBookmarkPanel: !0
}), Qr = {
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
  loadView: () => import("./YouTubeCard-B653sZRA.js").then((e) => e.Y).then((e) => e.default),
  lifecycle: {
    // Match the original retained-mount condition, including the shared homepage preference.
    isVisible: () => z.activeId === "daily-youtube" && zr.showYouTube,
    open: () => Xe("daily-youtube"),
    hide: () => et("daily-youtube"),
    // Preserve existing card menus. Settings drafts and shared writes are not yet
    // aggregated into a safe independent Quit/Reload guard.
    canUnmount: () => !1,
    unmountBlockedMessage: "YouTube 工作区保留原有隐藏保活设计；尚未开放独立退出/重载，以免丢失设置草稿或打断收藏操作。"
  }
}, Yr = {
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
  loadView: () => import("./BilibiliWorkspace-gCZ1MEr5.js").then((e) => e.default),
  lifecycle: {
    isVisible: () => z.activeId === "daily-bilibili",
    open: () => Xe("daily-bilibili"),
    hide: () => et("daily-bilibili"),
    // Hide must not dispose shared radio/player state or interrupt folder/cache operations.
    canUnmount: () => !1,
    unmountBlockedMessage: "B站收藏保留原有隐藏保活设计；尚未开放独立退出/重载，以免打断播放、收藏或缓存操作。"
  }
}, Zr = {
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
  loadView: () => import("./AihotFeed-8V2NY1IQ.js").then((e) => e.default),
  lifecycle: {
    isVisible: () => z.activeId === "daily-aihot",
    open: () => Xe("daily-aihot"),
    hide: () => et("daily-aihot"),
    // Keep the original retained card. Its view owns list activity;
    // the separate article reader is not owned or closed by this module.
    canUnmount: () => !1,
    unmountBlockedMessage: "AI HOT 保留原有隐藏保活设计；尚未开放独立退出/重载。"
  }
}, qe = ["artificialAnalysisApiKey", "openRouterApiKey"];
async function Qi() {
  const e = typeof chrome < "u" && chrome.storage?.local ? await chrome.storage.local.get([...qe]) : Object.fromEntries(qe.map((t) => [t, localStorage.getItem(t)]));
  return Object.fromEntries(qe.map((t) => [t, typeof e[t] == "string" ? e[t] : ""]));
}
async function Hs() {
  const e = await Qi();
  return {
    hasOpenRouterKey: !!e.openRouterApiKey.trim(),
    hasAaApiKey: !!e.artificialAnalysisApiKey.trim()
  };
}
async function Js(e, t) {
  const i = {};
  for (const r of qe) e[r] !== t[r] && (i[r] = e[r].trim());
  if (Object.keys(i).length)
    if (typeof chrome < "u" && chrome.storage?.local) await chrome.storage.local.set(i);
    else for (const [r, n] of Object.entries(i)) localStorage.setItem(r, n);
  return Qi();
}
const Xr = {
  schemaVersion: 1,
  id: "daily-pricing",
  title: "模型插件",
  icon: "assets/nav-pricing.svg",
  presentation: "card",
  rootId: "daily-pricing",
  settingsKeys: qe,
  capabilities: ["workspace:fullscreen", "view:retained", "pricing:bundled-data"],
  loadView: () => import("./ModelPricingCard-CBqY8qVR.js").then((e) => e.default),
  lifecycle: {
    isVisible: () => z.activeId === "daily-pricing",
    open: () => Xe("daily-pricing"),
    hide: () => et("daily-pricing"),
    // Keep settings drafts, filters and in-memory favorites across Hide.
    // Registration does not add live data fetching or independent Quit/Reload.
    canUnmount: () => !1,
    unmountBlockedMessage: "模型价格保留原有隐藏保活设计；尚未开放独立退出/重载，以免丢失设置草稿与本页关注。"
  }
}, en = {
  schemaVersion: 1,
  id: "stickers",
  title: "表情包模块",
  emoji: "😺",
  // Keep the chat picker's library management window without a standalone Dock entry.
  showInDock: !1,
  rootId: "vue-stickers-dialog-root",
  settingsKeys: Pr,
  capabilities: ["folder:explicit-permission", "image:explicit-save-delete", "image:local-preview", "image:clipboard", "qq:explicit-send"],
  loadView: () => import("./StickersDialog-BeBQPCma.js").then((e) => e.default),
  lifecycle: {
    isVisible: () => ct.visible,
    open: () => {
      ct.visible = !0;
    },
    hide: () => {
      ct.visible = !1, Mr();
    },
    canUnmount: () => ct.pendingWrites === 0,
    unmountBlockedMessage: "图片保存/删除、目录授权/偏好或QQ发送正在处理，暂不能退出/重载；可以先隐藏，已提交操作不会撤回。"
  }
}, tn = "neteaseApiUrl", rn = [tn], nn = {
  schemaVersion: 1,
  id: "music",
  title: "网易云模块",
  icon: "assets/netease.svg",
  dockBefore: "qq",
  rootId: "vue-music-workspace-root",
  settingsKeys: rn,
  capabilities: ["catalog:read", "settings:endpoint", "account:explicit-login-logout", "playback:shared-home-controls"],
  loadView: () => import("./NeteaseWorkspaceDialog-7urw7XKe.js").then((e) => e.default),
  lifecycle: {
    isVisible: () => Ce.visible,
    open: () => {
      Ce.visible = !0;
    },
    hide: () => {
      Ce.visible = !1, jr();
    },
    canUnmount: () => Ce.pendingWrites === 0,
    unmountBlockedMessage: "节点保存、登录确认/退出或记录写入正在处理，暂不能退出/重载；可以隐藏。退出窗口不会停止首页播放。"
  }
}, sn = {
  schemaVersion: 1,
  id: "siren",
  title: "塞壬唱片模块",
  emoji: "💿",
  showInDock: !1,
  rootId: "vue-siren-workspace-root",
  settingsKeys: [],
  capabilities: ["playback:siren", "catalog:read"],
  loadView: () => import("./SirenWorkspaceDialog-Bj_S-OWx.js").then((e) => e.default),
  lifecycle: {
    isVisible: () => Te.visible,
    open: () => {
      Te.visible = !0;
    },
    hide: () => {
      Te.visible = !1;
    }
  }
}, on = Object.freeze([
  "todoistToken",
  "todoistActiveProjectIdV1"
]), an = {
  schemaVersion: 1,
  id: "todoist",
  title: "todoist",
  icon: "assets/nav-todoist.svg",
  dockBefore: "stickers",
  rootId: "todoist",
  settingsKeys: on,
  capabilities: ["view:retained", "tasks:read-write", "attachments:explicit-upload", "settings:account-rules", "calendar:shared"],
  loadView: () => import("./TodoistWorkspace-DVCDw2Et.js").then((e) => e.default),
  lifecycle: {
    isVisible: () => lt.visible,
    open: () => {
      lt.visible = !0;
    },
    hide: () => {
      lt.visible = !1, Rr();
    },
    canUnmount: () => lt.pendingWrites === 0,
    unmountBlockedMessage: "任务、附件、评论或配置正在写入，暂不能退出/重载；可以隐藏。首页限时任务和独立日历不会随窗口退出停止。"
  }
}, cn = 1, ln = 1, un = { text: { legacy: !0 }, image: { legacy: !1 }, music: { legacy: !0 }, bilibili: { legacy: !0 }, github: { legacy: !0 }, bili_series: { legacy: !0 }, aihot: { legacy: !0 }, youtube: { legacy: !0 }, website: { legacy: !0 }, server_invite: { legacy: !0 }, music_party: { legacy: !0 } }, dn = ["image/png", "image/jpeg", "image/gif", "image/webp"], fn = { messageBytes: 262144, imageMessageBytes: 2097152, imageBytes: 1048576, textChars: 8e3, imageMaxDimension: 8192, imageMaxPixels: 16777216 }, Ne = {
  schema: cn,
  protocol: ln,
  messageTypes: un,
  imageMimeTypes: dn,
  limits: fn
};
function mn(e) {
  try {
    if (e.length > Math.ceil(Ne.limits.imageBytes / 3) * 4 + 64) return;
    const t = e.indexOf(","), i = e.slice(5, e.indexOf(";")), r = Uint8Array.from(atob(e.slice(t + 1)), (o) => o.charCodeAt(0)), n = new DataView(r.buffer), s = (o, c) => String.fromCharCode(...r.slice(o, c));
    if (i === "image/png" && r.length >= 33 && s(0, 8) === `PNG\r

` && n.getUint32(8) === 13 && s(12, 16) === "IHDR") return [n.getUint32(16), n.getUint32(20)];
    if (i === "image/gif" && r.length >= 13 && ["GIF87a", "GIF89a"].includes(s(0, 6))) return [n.getUint16(6, !0), n.getUint16(8, !0)];
    if (i === "image/webp" && r.length >= 25 && s(0, 4) === "RIFF" && s(8, 12) === "WEBP" && n.getUint32(4, !0) + 8 === r.length) {
      const o = s(12, 16);
      if (o === "VP8X" && r.length >= 30) return [1 + r[24] + (r[25] << 8) + (r[26] << 16), 1 + r[27] + (r[28] << 8) + (r[29] << 16)];
      if (o === "VP8L" && r[20] === 47) {
        const c = n.getUint32(21, !0);
        return [1 + (c & 16383), 1 + (c >>> 14 & 16383)];
      }
      if (o === "VP8 " && r.length >= 30 && s(23, 26) === "*") return [n.getUint16(26, !0) & 16383, n.getUint16(28, !0) & 16383];
    }
    if (i === "image/jpeg" && r[0] === 255 && r[1] === 216) {
      let o = 2;
      for (; o + 4 <= r.length && r[o] === 255; ) {
        for (; o < r.length && r[o] === 255; ) o++;
        if (o >= r.length) break;
        const c = r[o++];
        if (c === 216 || c === 1 || c >= 208 && c <= 215) continue;
        if (c === 217 || c === 218 || o + 2 > r.length) break;
        const a = n.getUint16(o);
        if (a < 2 || o + a > r.length) break;
        if ([192, 193, 194, 195, 197, 198, 199, 201, 202, 203, 205, 206, 207].includes(c) && a >= 8) return [n.getUint16(o + 5), n.getUint16(o + 3)];
        o += a;
      }
    }
  } catch {
  }
}
const pn = Ne.protocol, se = Object.freeze({ ...Ne.limits }), ei = Object.freeze(Object.keys(Ne.messageTypes)), ti = Object.freeze([...Ne.imageMimeTypes]), G = (e) => !!e && typeof e == "object" && !Array.isArray(e), zt = (e) => typeof e == "number" && Number.isSafeInteger(e) && e > 0;
function Ot() {
  return { status: "unknown", reason: "请先完成当前服务器的身份同步，再发送消息。", messageTypes: [], imageMimeTypes: [], limits: { ...se } };
}
function mt() {
  return { ...Ot(), status: "incompatible", reason: "服务端消息能力格式无效或协议版本不兼容，请服主核对前后端版本；待发内容已保留。" };
}
function hn(e) {
  if (e === void 0 || G(e) && !("schema" in e) && !("protocol" in e) && !("messageTypes" in e) && !("limits" in e)) {
    if (e !== void 0 && !G(e)) return mt();
    const n = G(e) && e.imageMessages === 1;
    return G(e) && e.maxImageBytes !== void 0 && !zt(e.maxImageBytes) ? mt() : {
      status: "legacy",
      reason: n ? "" : "此旧版服务端未声明图片能力，请服主升级；待发图片已保留。",
      messageTypes: ei.filter((s) => s === "image" ? n : Ne.messageTypes[s].legacy),
      imageMimeTypes: n ? [...ti] : [],
      limits: { ...se, imageBytes: n && G(e) && zt(e.maxImageBytes) ? Math.min(e.maxImageBytes, se.imageBytes) : se.imageBytes }
    };
  }
  if (!G(e) || e.schema !== 1 || e.protocol !== pn || !G(e.limits) || !Array.isArray(e.messageTypes) || e.messageTypes.length > 64 || e.messageTypes.some((n) => typeof n != "string") || !Array.isArray(e.imageMimeTypes) || e.imageMimeTypes.length > 16 || e.imageMimeTypes.some((n) => typeof n != "string")) return mt();
  const t = { ...se };
  for (const n of Object.keys(t)) {
    const s = e.limits[n];
    if (!zt(s)) return mt();
    t[n] = Math.min(t[n], s);
  }
  const i = ti.filter((n) => e.imageMimeTypes.includes(n)), r = ei.filter((n) => e.messageTypes.includes(n) && (n !== "image" || e.imageMessages === 1 && i.length > 0));
  return { status: "supported", reason: r.includes("image") ? "" : "此服务端未启用兼容的图片消息，待发图片已保留。", messageTypes: r, imageMimeTypes: i, limits: t };
}
function gn(e, t = se, i = ti) {
  if (typeof e != "string" || e.length > Math.ceil(t.imageBytes / 3) * 4 + 32) return !1;
  const r = /^data:(image\/[a-z0-9.+-]+);base64,([A-Za-z0-9+/]+={0,2})$/.exec(e);
  if (!r || !i.includes(r[1])) return !1;
  const n = r[2], s = n.length / 4 * 3 - (n.endsWith("==") ? 2 : n.endsWith("=") ? 1 : 0);
  return n.length % 4 === 0 && s > 0 && s <= t.imageBytes;
}
function Ke(e, t) {
  if (!G(t) || typeof t.type != "string" || typeof t.content != "string" || typeof t.id != "string" || !t.id || typeof t.timestamp != "number" || !Number.isFinite(t.timestamp) || !G(t.sender) || typeof t.sender.uid != "string" || typeof t.sender.name != "string" || typeof t.sender.avatar != "string") return "消息格式无效，原记录已保留，请核对后重新发送。";
  const i = G(t.meta) ? t.meta.imageUrl : void 0;
  if (e.status === "unknown" || e.status === "incompatible") return e.reason;
  if (!e.messageTypes.includes(t.type)) return t.type === "image" ? e.reason || "服务端未启用图片消息，待发图片已保留。" : "服务端不支持此消息类型，内容已保留。";
  if (t.content.length > e.limits.textChars) return "文字超过服务端声明的长度上限，请缩短后再发送。";
  if (t.type === "image" && !gn(i, e.limits, e.imageMimeTypes)) return "图片格式或大小不符合服务端能力，请重新选择或压缩；原内容已保留。";
  if (t.type === "image") {
    const s = mn(i);
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
const Yi = se.imageMessageBytes, Zi = se.textChars, He = (e) => !!e && typeof e == "object" && !Array.isArray(e), q = (e, t) => typeof e == "string" && e.length <= t;
function tt(e) {
  if (!q(e, 4096)) return "";
  try {
    const t = new URL(e);
    return ["https:", "http:"].includes(t.protocol) && !t.username && !t.password ? t.href : "";
  } catch {
    return "";
  }
}
function Nt(e) {
  return typeof e != "string" ? "" : e.length <= Yi && /^data:image\/(?:png|jpeg|gif|webp);base64,[A-Za-z0-9+/=\r\n]+$/i.test(e) ? e : tt(e);
}
function $t(e) {
  if (!q(e, 4096)) throw new Error("服务器地址过长");
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
function Xi(e, t) {
  if (!(!He(e) || !["bilibili", "github", "music", "aihot", "youtube", "idle"].includes(String(e.type)) || !q(e.title, 500)))
    return { type: e.type, title: e.title, url: tt(e.url) || void 0, updatedAt: t };
}
function er(e, t = 0) {
  if (!He(e) || t > 2) return;
  const i = /* @__PURE__ */ Object.create(null);
  for (const [r, n] of Object.entries(e).slice(0, 64))
    ["__proto__", "constructor", "prototype", "rawSong"].includes(r) || (typeof n == "string" && n.length <= (r === "imageUrl" ? Yi : Zi) ? i[r] = /(?:cover|avatar|face|imageUrl)$/i.test(r) ? Nt(n) : /url$/i.test(r) ? tt(n) : n : typeof n == "boolean" || typeof n == "number" && Number.isFinite(n) ? i[r] = n : r === "seriesItems" && Array.isArray(n) && (i[r] = n.slice(0, 100).map((s) => er(s, t + 1)).filter(Boolean)));
  return i;
}
function it(e) {
  return tr(e, Date.now());
}
function tr(e, t) {
  if (!He(e) || !He(e.sender) || !q(e.id, 160) || !e.id || !q(e.sender.uid, 160) || !e.sender.uid || !q(e.sender.name, 100) || !q(e.content, Zi) || ![...ei, "system"].includes(String(e.type)) || typeof e.timestamp != "number" || !Number.isFinite(e.timestamp)) return;
  const i = Nt(e.sender.avatar) || (q(e.sender.avatar, 32) && !/[:/]/.test(e.sender.avatar) ? e.sender.avatar : "👤");
  return { id: e.id, sender: { uid: e.sender.uid, name: e.sender.name, avatar: i, activity: Xi(e.sender.activity, t) }, type: e.type, content: e.content, timestamp: e.timestamp, meta: er(e.meta) };
}
function yn(e, t) {
  if (!He(e) || !q(e.uid, 160) || !e.uid || !q(e.name, 100)) return;
  const i = Nt(e.avatar) || (q(e.avatar, 32) && !/[:/]/.test(e.avatar) ? e.avatar : "👤");
  return { uid: e.uid, name: e.name, avatar: i, activity: Xi(e.activity, t) };
}
const Je = Oe(""), zs = Oe(!1), ui = Oe(0);
let Le, he = Promise.resolve();
const Z = /* @__PURE__ */ new Map();
function di(e, t, i) {
  return JSON.stringify([e, t, i]);
}
function xt() {
  return Le || (Le = new Promise((e, t) => {
    const i = indexedDB.open("lw-chat-history", 2);
    i.onupgradeneeded = () => {
      i.result.objectStoreNames.contains("messages") || i.result.createObjectStore("messages", { keyPath: ["scope", "id"] }).createIndex("timeline", ["scope", "timestamp", "id"], { unique: !0 }), i.result.objectStoreNames.contains("relay-cursors") || i.result.createObjectStore("relay-cursors");
    }, i.onerror = () => t(i.error), i.onblocked = () => {
      Je.value = "历史数据库升级被其他标签页阻塞，请关闭旧标签页后重试";
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
function Dt(e, t) {
  for (const i of t) {
    const r = it(i);
    if (!r || r.id === "sys-welcome") continue;
    const n = { scope: e, id: r.id, timestamp: r.timestamp, message: JSON.parse(JSON.stringify(r)) };
    Z.set(JSON.stringify([e, n.id]), n);
  }
  return ui.value = Z.size, wn();
}
function wn() {
  return he = he.then(async () => {
    if (!Z.size) return;
    const e = [...Z.entries()];
    try {
      const t = await xt();
      await new Promise((i, r) => {
        const n = t.transaction("messages", "readwrite");
        n.oncomplete = () => i(), n.onabort = () => r(n.error), n.onerror = () => r(n.error);
        const s = n.objectStore("messages");
        for (const [, o] of e) s.put(o);
      });
      for (const [i, r] of e) Z.get(i) === r && Z.delete(i);
      ui.value = Z.size, Je.value = "";
    } catch {
      Je.value = "历史未能写入磁盘（空间不足或数据库不可用）。待存消息保留在内存，请先导出备份，勿关闭或刷新。";
    }
  }), he;
}
async function bn(e) {
  await he;
  const t = await xt();
  return new Promise((i, r) => {
    const n = t.transaction("relay-cursors", "readonly"), s = n.objectStore("relay-cursors").get(e);
    n.oncomplete = () => i(Number.isSafeInteger(s.result) ? s.result : 0), n.onabort = () => r(n.error), s.onerror = () => r(s.error);
  });
}
function vn(e, t, i) {
  const r = he.then(async () => {
    const n = await xt();
    await new Promise((s, o) => {
      const c = n.transaction(["messages", "relay-cursors"], "readwrite"), a = c.objectStore("messages");
      for (const h of t) a.put({ scope: e, id: h.id, timestamp: h.timestamp, message: JSON.parse(JSON.stringify(h)) });
      const d = c.objectStore("relay-cursors"), f = d.get(e);
      f.onsuccess = () => d.put(Math.max(Number(f.result) || 0, i), e), c.oncomplete = () => s(), c.onabort = () => o(c.error), c.onerror = () => o(c.error);
    });
  });
  return he = r.catch(() => {
  }), r;
}
async function ir(e, t, i = 200) {
  await he;
  const r = await xt();
  return new Promise((n, s) => {
    const o = r.transaction("messages", "readonly"), c = [e, -Number.MAX_VALUE, ""], a = t ? [e, t.timestamp, t.id] : [e, Number.MAX_VALUE, "￿"], d = IDBKeyRange.bound(c, a, !1, !!t), f = o.objectStore("messages").index("timeline").openCursor(d, "prev"), h = [];
    f.onerror = () => s(f.error), o.onabort = () => s(o.error), f.onsuccess = () => {
      const p = f.result;
      if (!p || h.length >= i) {
        n(h.reverse());
        return;
      }
      const g = it(p.value.message);
      g && h.push(g), p.continue();
    };
  });
}
async function Qs(e) {
  const t = /* @__PURE__ */ new Map();
  let i;
  for (; ; ) {
    const r = await ir(e, i, 500);
    for (const n of r) t.set(n.id, n);
    if (r.length < 500) break;
    i = r[0];
  }
  for (const r of Z.values()) r.scope === e && t.set(r.id, r.message);
  return [...t.values()].sort((r, n) => r.timestamp - n.timestamp || r.id.localeCompare(n.id));
}
function Ys(e) {
  return [...Z.values()].filter((t) => t.scope === e).map((t) => t.message);
}
function Ut(e) {
  const t = tt(e);
  return t && t.length <= 1e3 && !/\/noface\.(jpg|png)(?:[?#]|$)/i.test(t) ? t : "";
}
function Lt(e, t = "") {
  const i = Ut(e) || Ut(t);
  return i || (e && e.length <= 8 && !/[:/]/.test(e) ? e : "🦫");
}
const Bt = "lw_chat_server_url", rr = "lw_chat_user_id", jt = "lw_chat_user_name", Wt = "lw_chat_user_avatar", H = "lw_chat_groups", nr = "lw_chat_current_group", Sn = "lw_chat_rooms", An = "lw_chat_friends", sr = "lw_chat_friend_requests_v1", vt = "lw_chat_current_room", or = "";
function K(e, t) {
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
function T(e, t) {
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
const kn = [
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
], Cn = [
  { id: "main", name: "自习室大厅", icon: "🏠" },
  { id: "dev", name: "代码与摸鱼", icon: "💻" },
  { id: "music", name: "音乐咖啡馆", icon: "🎵" }
];
function In() {
  const e = ["摸鱼", "冲浪", "喝茶", "听歌", "看番", "敲代码", "发呆", "漫游"], t = ["海狸", "企鹅", "猫猫", "柴犬", "仓鼠", "水獭", "考拉", "熊猫"], i = e[Math.floor(Math.random() * e.length)], r = t[Math.floor(Math.random() * t.length)], n = Math.floor(1e3 + Math.random() * 9e3);
  return `${i}的${r}#${n}`;
}
function En() {
  const e = ["🦫", "🐧", "🐱", "🐶", "🐹", "🦦", "🐨", "🐼", "🦊", "🐰"];
  return e[Math.floor(Math.random() * e.length)];
}
const ar = K(rr, ""), fi = ar || `u_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`;
ar || T(rr, fi);
const _t = K(jt, ""), Un = !_t || _t.includes("#"), _i = F.userName && F.userName !== "哔哩哔哩用户" && F.userName !== "浏览器指纹与环境" ? F.userName : "", cr = Un && _i ? _i : _t || In();
_t || T(jt, cr);
const Ee = K(Wt, ""), _n = !Ee || Ee.length <= 4 || Ee.startsWith("data:") || Ee.includes("/noface."), Ti = Ut(F.avatarUrl), lr = _n && Ti ? Ti : Ee || En();
Ee || T(Wt, lr);
const u = N({
  visible: !1,
  shareActivity: K("lw_chat_share_activity", "true") !== "false",
  error: "",
  connected: !1,
  connecting: !1,
  onlineCount: 1,
  serverUrl: K(Bt, or),
  currentGroupId: K(nr, "hub_main"),
  currentChannelId: "general",
  groups: We(H, kn),
  groupMembers: [],
  currentRoomId: K(vt, "main"),
  rooms: We(Sn, Cn),
  friends: We(An, []),
  friendRequests: We(sr, []),
  currentUser: {
    uid: fi,
    name: cr,
    avatar: lr
  },
  messages: ze(K(vt, "main")).length > 0 ? ze(K(vt, "main")) : [
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
Mn();
_e(
  () => [F.avatarUrl, F.userName],
  ([e, t]) => {
    const i = u.currentUser.avatar;
    Ut(e) && (!i || i.length <= 4 || i.startsWith("data:") || i.includes("/noface.") || /^https?:\/\/[^/]*hdslb\.com\//i.test(i)) && (u.currentUser.avatar = e, T(Wt, e)), t && t !== "哔哩哔哩用户" && t !== "浏览器指纹与环境" && (!u.currentUser.name || u.currentUser.name.includes("#") || u.currentUser.name.startsWith("摸鱼")) && (u.currentUser.name = t, T(jt, t));
  },
  { immediate: !0 }
);
const Pi = N({ scope: "", ready: !1 });
let pt = 0;
_e(
  () => di(u.currentUser.uid, u.serverUrl, u.currentRoomId),
  async (e) => {
    const t = ++pt;
    Object.assign(Pi, { scope: e, ready: !1 });
    const { currentRoomId: i, serverUrl: r, currentUser: n } = u, s = ze(i, r, n.uid);
    await Dt(e, s);
    try {
      const o = await ir(e);
      if (t !== pt) return;
      const c = new Map(o.map((a) => [a.id, a]));
      for (const a of u.messages) a.id !== "sys-welcome" && c.set(a.id, a);
      u.messages = [...c.values()].sort((a, d) => a.timestamp - d.timestamp || a.id.localeCompare(d.id)).slice(-200);
    } catch {
      t === pt && (Je.value = "无法读取历史数据库，现有缓存未删除，请导出备份后检查浏览器存储。");
    } finally {
      t === pt && (Pi.ready = !0);
    }
  },
  { immediate: !0 }
);
function Zs(e, t) {
  u.currentUser.name = e.trim() || u.currentUser.name, u.currentUser.avatar = t.trim() || u.currentUser.avatar, T(jt, u.currentUser.name), T(Wt, u.currentUser.avatar);
}
function Tn(e, t, i) {
  return "lw_chat_history_v2_" + JSON.stringify([i, t, e]);
}
function ze(e, t = K(Bt, or), i = fi) {
  try {
    const r = localStorage.getItem(Tn(e, t, i));
    if (r) {
      const n = JSON.parse(r);
      if (Array.isArray(n)) return n.map(it).filter((s) => !!s).slice(-200);
    }
  } catch {
  }
  return [];
}
function Pn(e, t) {
  const i = di(u.currentUser.uid, u.serverUrl, e);
  Dt(i, t);
}
function ur(e, t) {
  if (!e) return "";
  const i = new URL($t(e));
  return i.searchParams.set("room", t), i.href;
}
function ii(e, t = !0, i = !1) {
  if (t && Je.value && ui.value > 0)
    return u.error = "仍有未保存消息，请先重试保存或导出备份，暂不切换房间", !1;
  try {
    e.endpoint = $t(e.endpoint), localStorage.setItem("lw_chat_session_v1", JSON.stringify(e));
  } catch {
    return u.error = "会话保存失败或地址无效，未切换房间", !1;
  }
  const r = e.endpoint !== u.serverUrl || e.roomId !== u.currentRoomId;
  return r && t && Pn(u.currentRoomId, u.messages), Object.assign(u, {
    currentGroupId: e.groupId,
    currentChannelId: e.channelId,
    currentRoomId: e.roomId,
    serverUrl: e.endpoint
  }), r && (u.messages = ze(e.roomId, e.endpoint, u.currentUser.uid), u.userActivities = {}, u.unreadCount = 0, i || (u.connected = !1, u.connecting = !1), u.onlineCount = 0), T(Bt, e.endpoint), T(vt, e.roomId), T(nr, e.groupId), !0;
}
function rt(e, t = "local", i = !1) {
  let r, n = t;
  try {
    if (r = $t(e), r) {
      const c = new URL(r);
      if (n = c.searchParams.get("room") || "default", !n || n.length > 160) throw new Error();
      c.searchParams.set("room", n), r = c.href;
    }
  } catch {
    return u.error = "房间地址无效，未切换会话", !1;
  }
  for (const c of u.groups)
    for (const a of c.channels)
      if ((a.endpoint ?? ur(c.endpoint ?? "", `${c.id}__${a.id}`)) === r && (r || a.id === n))
        return ii({ groupId: c.id, channelId: a.id, roomId: n, endpoint: r }, !0, i);
  const s = "joined_" + crypto.randomUUID(), o = {
    id: s,
    name: r ? "受邀房间" : "本地房间",
    icon: "💬",
    endpoint: r,
    isCustom: !0,
    channels: [{ id: n, name: n, icon: "💬", endpoint: r }]
  };
  return u.groups.push(o), ii({ groupId: s, channelId: n, roomId: n, endpoint: r }, !0, i) ? (T(H, JSON.stringify(u.groups)), !0) : (u.groups.pop(), !1);
}
function Mn() {
  for (const t of u.groups) t.endpoint ??= u.serverUrl;
  const e = We("lw_chat_session_v1", null);
  if (e && typeof e.endpoint == "string" && typeof e.roomId == "string") {
    const t = u.groups.find((r) => r.id === e.groupId), i = t?.channels.find((r) => r.id === e.channelId);
    if (t && i)
      try {
        const r = $t(e.endpoint), n = r ? new URL(r).searchParams.get("room") || "default" : e.roomId;
        i.endpoint = r, Object.assign(u, {
          currentGroupId: t.id,
          currentChannelId: i.id,
          currentRoomId: n,
          serverUrl: r,
          messages: ze(n, r, u.currentUser.uid)
        }), T(H, JSON.stringify(u.groups));
        return;
      } catch {
      }
  }
  rt(u.serverUrl, u.currentRoomId), T(H, JSON.stringify(u.groups));
}
function Xs(e) {
  u.friendRequests = u.friendRequests.filter((t) => t.id !== e), T(sr, JSON.stringify(u.friendRequests));
}
function Vt(e, t) {
  const i = u.groups.find((o) => o.id === e), r = i?.channels.find((o) => o.id === t) || i?.channels[0];
  if (!i || !r) return !1;
  const n = r.endpoint !== void 0 ? r.endpoint ? new URL(r.endpoint).searchParams.get("room") || "default" : r.id : `${i.id}__${r.id}`, s = r.endpoint ?? ur(i.endpoint ?? "", n);
  return ii({ groupId: i.id, channelId: r.id, roomId: n, endpoint: s });
}
function eo(e, t = "👥") {
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
  return u.groups.push(n), T(H, JSON.stringify(u.groups)), Vt(r, "general"), n;
}
function to(e) {
  if (u.groups.length <= 1) return;
  const t = u.groups.filter((i) => i.id !== e);
  if (u.currentGroupId === e) {
    const i = t[0];
    if (!i || !Vt(i.id, i.channels[0]?.id || "general")) return;
  }
  u.groups = t, T(H, JSON.stringify(u.groups));
}
function io(e, t = "💬") {
  const i = u.groups.find((n) => n.id === u.currentGroupId);
  if (!i) return;
  const r = "ch_" + Math.random().toString(36).slice(2, 6);
  i.channels.push({ id: r, name: e.trim() || "新频道", icon: t }), T(H, JSON.stringify(u.groups)), Vt(i.id, r);
}
function ro(e, t, i) {
  const r = u.groups.find((n) => n.id === e);
  r && (r.name = t.trim() || r.name, i && (r.icon = i), T(H, JSON.stringify(u.groups)));
}
function no(e, t, i, r) {
  const n = u.groups.find((o) => o.id === e);
  if (!n) return;
  const s = n.channels.find((o) => o.id === t);
  s && (s.name = i.trim() || s.name, r && (s.icon = r), T(H, JSON.stringify(u.groups)));
}
function so(e, t) {
  const i = u.groups.find((n) => n.id === e);
  if (!i || i.channels.length <= 1) return;
  const r = i.channels.filter((n) => n.id !== t);
  u.currentGroupId === e && u.currentChannelId === t && (!r[0] || !Vt(e, r[0].id)) || (i.channels = r, T(H, JSON.stringify(u.groups)));
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
const mi = "lw_private_chat_v1", b = N({ room: null, diagnostic: "" });
function pi() {
  let e = null, t = "";
  try {
    const i = localStorage.getItem(mi);
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
  b.diagnostic = t, JSON.stringify(e) !== JSON.stringify(b.room) && (b.room = e);
}
pi();
window.addEventListener("storage", (e) => {
  (e.key === mi || e.key === null) && pi();
});
window.addEventListener("focus", pi);
const Rn = li(() => !!b.room);
function dr(e) {
  return e.origin.replace(/^http:/, "ws:").replace(/^https:/, "wss:") + "/ws?room=" + encodeURIComponent(e.room);
}
function On(e) {
  const t = nt(e);
  localStorage.setItem(mi, JSON.stringify(t)), b.diagnostic = "", b.room = t;
}
const hi = Oe(0), D = Oe(""), gi = /* @__PURE__ */ new Map();
let Qt;
function $e() {
  return Qt ||= new Promise((e, t) => {
    const i = indexedDB.open("lw-chat-delivery", 1);
    i.onupgradeneeded = () => {
      i.result.createObjectStore("deliveries", { keyPath: ["scope", "id", "uid"] }).createIndex("scope", "scope");
    }, i.onsuccess = () => {
      i.result.onversionchange = () => {
        i.result.close(), Qt = void 0;
      }, e(i.result);
    }, i.onerror = () => t(i.error), i.onblocked = () => {
      D.value = "发送队列被旧窗口阻塞，请关闭旧窗口后重试。";
    };
  }).catch((e) => {
    throw Qt = void 0, e;
  });
}
async function Nn(e) {
  const t = await $e();
  return new Promise((i, r) => {
    const n = t.transaction("deliveries", "readonly"), s = n.objectStore("deliveries").index("scope").getAll(e);
    n.oncomplete = () => i(s.result), n.onabort = () => r(n.error), s.onerror = () => r(s.error);
  });
}
let Mi = Promise.resolve();
function st(e) {
  const t = Mi.then(e);
  return Mi = t.catch(() => {
  }), t;
}
async function xe(e) {
  try {
    const t = /* @__PURE__ */ new Map();
    for (const i of await Nn(e)) {
      const r = t.get(i.id) || [];
      r.push(i), t.set(i.id, r);
    }
    gi.set(e, t), hi.value++;
  } catch {
    D.value = "无法读取发送确认记录，请检查浏览器存储。";
  }
}
function $n(e, t) {
  hi.value;
  const i = gi.get(e)?.get(t) || [];
  if (!i.length) return "none";
  const r = i.filter((n) => !n.received);
  return r.length ? r.some((n) => n.failure === "rejected" || n.failure === "paused" || n.attempts >= 5 && (n.failure === "unconfirmed" || Date.now() - n.lastAttempt > 15e3)) ? "failed" : "sending" : "stored";
}
function oo(e, t) {
  hi.value;
  const i = gi.get(e)?.get(t) || [];
  if (!i.length) return "无送达确认";
  const r = i.filter((s) => s.received).length;
  return r === i.length ? i.every((s) => s.uid === "private-relay-server") ? "服务器已保存（不代表对方已读）" : `对方已接收 ${r}/${i.length}（非已读）` : i.filter((s) => !s.received).some((s) => s.failure === "rejected") ? "服务器拒绝此次发送，可在消息详情中重试；不代表此前尝试一定未保存" : $n(e, t) === "failed" ? "尚未获得保存确认，自动补发已暂停；不代表一定未送达，可在消息详情中重试" : "正在发送／等待保存确认，将按原目标房间补发；请勿重复发送";
}
async function fr(e, t, i) {
  await st(async () => {
    const r = await $e();
    await new Promise((n, s) => {
      const o = r.transaction("deliveries", "readwrite"), c = o.objectStore("deliveries");
      for (const a of new Set(i)) {
        const d = c.get([e, t.id, a]);
        d.onsuccess = () => {
          if (d.result?.received) return;
          const f = { scope: e, id: t.id, uid: a, message: JSON.parse(JSON.stringify(t)), attempts: 0, lastAttempt: 0, received: !1 };
          c.put(f);
        };
      }
      o.oncomplete = () => n(), o.onabort = () => s(o.error), o.onerror = () => s(o.error);
    }), await xe(e);
  });
}
async function ao(e, t) {
  try {
    await st(async () => {
      const i = await $e();
      await new Promise((r, n) => {
        const s = i.transaction("deliveries", "readwrite"), o = s.objectStore("deliveries").index("scope").openCursor(e);
        o.onsuccess = () => {
          const c = o.result;
          if (!c) return;
          const a = c.value;
          a.id === t && !a.received && c.update({ ...a, attempts: 5, failure: "paused" }), c.continue();
        }, s.oncomplete = () => r(), s.onabort = () => n(s.error), s.onerror = () => n(s.error);
      }), await xe(e);
    });
  } catch {
    D.value = "暂停补发未能保存，请检查存储；已发出的消息无法撤回。";
  }
}
async function xn(e, t, i) {
  return mr(e, [t], i);
}
async function mr(e, t, i) {
  t.length && await st(async () => {
    const r = await $e();
    await new Promise((n, s) => {
      const o = r.transaction("deliveries", "readwrite"), c = o.objectStore("deliveries");
      for (const a of new Set(t)) {
        const d = c.get([e, a, i]);
        d.onsuccess = () => {
          d.result && c.put({ ...d.result, received: !0, failure: void 0, message: void 0 });
        };
      }
      o.oncomplete = () => n(), o.onabort = () => s(o.error), o.onerror = () => s(o.error);
    }), await xe(e);
  });
}
async function Ri(e, t, i, r = !1, n, s = !1) {
  await st(async () => {
    const o = await $e();
    await new Promise((c, a) => {
      const d = o.transaction("deliveries", "readwrite"), f = d.objectStore("deliveries"), h = f.get([e, t, i]);
      h.onsuccess = () => {
        const p = h.result;
        p && !p.received && (n === void 0 || p.lastAttempt === n) && f.put({
          ...p,
          attempts: r || s ? 5 : p.attempts,
          failure: s ? "paused" : r ? "rejected" : p.failure === "paused" ? "paused" : "unconfirmed"
        });
      }, d.oncomplete = () => c(), d.onerror = d.onabort = () => a(d.error);
    }), await xe(e);
  });
}
async function Dn(e, t, i, r, n = 4, s = () => !0) {
  await st(async () => {
    const o = await $e(), c = [];
    await new Promise((a, d) => {
      const f = o.transaction("deliveries", "readwrite"), h = f.objectStore("deliveries").index("scope").openCursor(e);
      h.onsuccess = () => {
        const p = h.result;
        if (!p || c.length >= n || !i()) return;
        const g = p.value;
        if (!g.received && g.message && g.attempts < 5 && Date.now() - g.lastAttempt >= 1e4 && t.includes(g.uid)) {
          if (!s(g.message)) {
            p.update({ ...g, attempts: 5, failure: "paused" }), p.continue();
            return;
          }
          const w = { ...g, attempts: g.attempts + 1, lastAttempt: Date.now(), failure: void 0 };
          p.update(w), c.push(w);
        }
        p.continue();
      }, f.oncomplete = () => a(), f.onabort = () => d(f.error), f.onerror = () => d(f.error);
    });
    for (const a of c) i() && r(a.uid, a.message, a.lastAttempt);
    await xe(e);
  });
}
function Ln(e) {
  function t(g, w) {
    return g << w | g >>> 32 - w;
  }
  const i = [7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21], r = new Array(64).fill(0).map((g, w) => Math.floor(Math.abs(Math.sin(w + 1)) * 2 ** 32)), n = new TextEncoder().encode(e), s = n.length * 8, o = new Uint8Array((Math.floor((n.length + 8) / 64) + 1) * 64);
  o.set(n), o[n.length] = 128;
  const c = new DataView(o.buffer);
  c.setUint32(o.length - 8, s >>> 0, !0), c.setUint32(o.length - 4, Math.floor(s / 4294967296), !0);
  let a = 1732584193, d = 4023233417, f = 2562383102, h = 271733878;
  for (let g = 0; g < o.length; g += 64) {
    const w = new Array(16);
    for (let E = 0; E < 16; E++) w[E] = c.getUint32(g + E * 4, !0);
    let v = a, I = d, y = f, k = h;
    for (let E = 0; E < 64; E++) {
      let ie, B;
      E < 16 ? (ie = I & y | ~I & k, B = E) : E < 32 ? (ie = k & I | ~k & y, B = (5 * E + 1) % 16) : E < 48 ? (ie = I ^ y ^ k, B = (3 * E + 5) % 16) : (ie = y ^ (I | ~k), B = 7 * E % 16);
      const ve = ie + v + r[E] + w[B] >>> 0;
      v = k, k = y, y = I, I = I + t(ve, i[E]) >>> 0;
    }
    a = a + v >>> 0, d = d + I >>> 0, f = f + y >>> 0, h = h + k >>> 0;
  }
  function p(g) {
    let w = "";
    for (let v = 0; v < 4; v++) w += (g >>> v * 8 & 255).toString(16).padStart(2, "0");
    return w;
  }
  return p(a) + p(d) + p(f) + p(h);
}
const Bn = [
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
function Oi(e, t, i) {
  const r = Bn.map((d) => (t + i)[d]).join("").slice(0, 32), n = Math.round(Date.now() / 1e3), s = { ...e, wts: n }, c = Object.keys(s).sort().map((d) => encodeURIComponent(d) + "=" + encodeURIComponent(String(s[d]).replace(/[!'()*]/g, ""))).join("&"), a = Ln(c + r);
  return {
    signedQuery: `${c}&w_rid=${a}`,
    w_rid: a,
    wts: n
  };
}
function Ni(e) {
  const t = Number(e);
  return t >= 120 ? "4K" : t === 116 ? "1080P60" : t === 112 ? "1080P+" : t === 80 ? "1080P" : t === 74 ? "720P60" : t === 64 ? "720P" : t === 32 ? "480P" : t === 16 ? "360P" : t > 0 ? `${t}P` : "清晰度";
}
function co(e, t = "") {
  if (t && typeof t == "string" && t.trim()) return t.trim();
  const i = Number(e);
  return i >= 120 ? "超清 4K" : i === 116 ? "高清 1080P 60帧" : i === 112 ? "高清 1080P+ 高码率" : i === 80 ? "高清 1080P" : i === 74 ? "高码率 720P 60帧" : i === 64 ? "高清 720P" : i === 32 ? "清晰 480P" : i === 16 ? "流畅 360P" : `${i}P`;
}
class me {
  constructor() {
  }
  static getInstance() {
    return me.instance || (me.instance = new me()), me.instance;
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
    const c = String(r) === "root" ? t : this.findNode(t, r);
    if (!o || !c || o === c || o.type === "folder" && this.isDescendant(o, c.id))
      return !1;
    if (this.removeNodeById(t, o.id), c === t || n === "into" && c.type === "folder")
      Array.isArray(c.children) || (c.children = []), c.children.push(o);
    else {
      const a = this.findParent(t, c.id) || t;
      Array.isArray(a.children) || (a.children = []);
      const d = Math.max(0, a.children.findIndex((f) => String(f.id) === String(c.id)));
      a.children.splice(d + (n === "after" ? 1 : 0), 0, o);
    }
    return !0;
  }
  syncTreeWithFolders(t, i) {
    let r = !1;
    const n = /* @__PURE__ */ new Map();
    for (const a of i)
      n.set(String(a.id || a.fid), a);
    const s = (a) => {
      if (a.children)
        for (let d = a.children.length - 1; d >= 0; d--) {
          const f = a.children[d];
          if (f.type === "fav")
            if (!n.has(String(f.id)))
              a.children.splice(d, 1), r = !0;
            else {
              const h = n.get(String(f.id));
              h?.title && f.name !== h.title && (f.name = h.title, r = !0);
            }
          else
            s(f);
        }
    };
    s(t);
    const o = /* @__PURE__ */ new Set(), c = (a) => {
      for (const d of a.children || [])
        d.type === "fav" ? o.add(String(d.id)) : c(d);
    };
    c(t), t.children || (t.children = []);
    for (const a of i) {
      const d = String(a.id || a.fid);
      o.has(d) || (t.children.push({
        id: d,
        type: "fav",
        name: a.title || "未命名收藏夹",
        children: []
      }), r = !0);
    }
    return r;
  }
  flattenTree(t, i, r, n) {
    const s = new Map((i || []).map((f) => [String(f.id || f.fid), f])), o = [], c = /* @__PURE__ */ new Set(), a = (f) => (f.children || []).reduce(
      (h, p) => h + (p.type === "fav" ? 1 : a(p)),
      0
    ), d = (f, h = 0) => {
      for (const p of f.children || []) {
        const g = String(p.id), w = s.get(g), v = p.type === "folder";
        v || c.add(g);
        const I = v && r.has(g), y = !v && g === String(n);
        o.push({
          id: g,
          title: String(p.name || w?.title || "未命名收藏夹"),
          count: Number(v ? a(p) : w?.media_count || 0),
          kind: w?.isCollected ? "collected" : w?.isOther ? "other" : "created",
          depth: h,
          group: v,
          collapsed: I,
          selected: y,
          writable: !v && !w?.isCollected && !w?.isOther
        }), v && !I && d(p, h + 1);
      }
    };
    d(t, 0);
    for (const f of i || []) {
      const h = String(f.id || f.fid);
      o.some((p) => !p.group && p.id === h) || !f.isCollected && !f.isOther && c.has(h) || o.push({
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
class Ue {
  constructor() {
    this.currentUser = null, this.writeQueue = Promise.resolve(), this.lastWriteTime = 0, this.wbiKeysCache = null, this.treeManager = me.getInstance();
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
      throw new Error(`Bilibili API 请求失败 [${r.status}]: ${r.statusText}`);
    const n = await r.json();
    if (n.code !== 0 && n.code !== void 0)
      throw new Error(n.message || n.msg || `Bilibili 接口返回错误码 ${n.code}`);
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
    ), c = (s?.list || []).map((a) => ({
      id: a.id,
      fid: a.fid || a.id,
      title: a.title,
      media_count: Number(a.media_count || 0),
      cover: (a.cover || "").replace(/^http:/, "https:"),
      upper: a.upper || { name: a.owner?.name || "UP主", mid: a.mid },
      isCollected: !0,
      isSeason: a.type === 21 || !!a.season,
      type: a.type
    }));
    return {
      count: Number(s?.count || c.length),
      list: c
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
    ), c = (s?.list || []).map((a) => ({
      id: a.season_id,
      type: 21,
      title: a.title,
      cover: (a.cover || "").replace(/^http:/, "https:"),
      duration: 0,
      upper: { mid: 0, name: a.season_type_name || "番剧", face: "" },
      cnt_info: {
        play: a.stat?.view || 0,
        danmaku: a.stat?.danmaku || 0,
        collect: a.stat?.follow || 0
      },
      link: a.url,
      bvid: a.new_ep?.bvid || "",
      intro: a.evaluate
    }));
    return { medias: c, total: Number(s?.total || c.length) };
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
      const p = await this.getToViewVideos();
      let g = p.medias;
      if (s.trim()) {
        const w = s.toLowerCase();
        g = g.filter((v) => v.title.toLowerCase().includes(w) || v.upper?.name && v.upper.name.toLowerCase().includes(w));
      }
      return {
        info: { title: "稍后再看", media_count: p.total },
        medias: g.slice((i - 1) * r, i * r),
        hasMore: i * r < g.length,
        total: g.length
      };
    }
    if (o === "__bangumi__") {
      const p = await this.getBangumiFollows(i, r);
      return {
        info: { title: "我的追番", media_count: p.total },
        medias: p.medias,
        hasMore: i * r < p.total,
        total: p.total
      };
    }
    if (o.startsWith("season:")) {
      const p = o.replace("season:", ""), g = await this.getSeasonVideos(p, i, r);
      return {
        info: { title: "合集内容", media_count: g.total },
        medias: g.medias,
        hasMore: i * r < g.total,
        total: g.total
      };
    }
    let c = `https://api.bilibili.com/x/v3/fav/resource/list?media_id=${t}&pn=${i}&ps=${r}&order=${n}&platform=web`;
    s.trim() && (c += `&keyword=${encodeURIComponent(s.trim())}`);
    const a = await this.api(c), d = a?.medias || [], f = !!a?.has_more, h = Number(a?.info?.media_count || d.length);
    return {
      info: a?.info,
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
        const o = Array.isArray(r) ? r.map((f) => String(f).includes(":") ? String(f) : `${f}:2`).join(",") : String(r).includes(":") ? String(r) : `${r}:2`, c = new URLSearchParams({
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
          body: c.toString()
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
          }), a = await (await fetch("https://api.bilibili.com/x/v3/fav/resource/deal", {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Accept: "application/json"
            },
            body: o.toString()
          })).json();
          if (a.code === 0) return { ok: !0 };
          if ((a.code === 11007 || a.code === -412 || /频繁|稍后|频率/.test(a.message || "")) && n <= r) {
            await new Promise((f) => setTimeout(f, 850 * n));
            continue;
          }
          return { ok: !1, code: a.code, reason: this.formatBiliApiError(a.code, a.message) };
        } catch (o) {
          if (n <= r) {
            await new Promise((c) => setTimeout(c, 600));
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
  async fetchPlayStream(t, i, r = 64) {
    const n = Array.from(/* @__PURE__ */ new Set([r, 64, 32, 16]));
    let s = null, o = [], c = r;
    const a = (d) => {
      if (!d) return [];
      const f = Array.isArray(d.durl) ? d.durl : Array.isArray(d.result?.durl) ? d.result.durl : [], h = [];
      for (const p of f)
        if (p?.url && h.push(String(p.url)), Array.isArray(p?.backup_url))
          for (const g of p.backup_url)
            g && h.push(String(g));
      return Array.from(new Set(h.filter(Boolean))).map((p) => p.replace(/^http:/, "https:"));
    };
    for (const d of n)
      try {
        const f = t ? `bvid=${encodeURIComponent(t)}` : "", h = await this.api(
          `https://api.bilibili.com/x/player/playurl?${f}&cid=${i}&qn=${d}&fnval=1&fourk=0&platform=html5&high_quality=1`
        ), p = a(h);
        if (p.length > 0) {
          s = h, o = p, c = Number(h?.quality || d);
          break;
        }
      } catch {
      }
    if (!o.length)
      for (const d of [r, 64, 32])
        try {
          const { ik: f, sk: h } = await this.getWbiKeys(), p = { cid: i, qn: d, fnval: 1, fourk: 0 };
          t && (p.bvid = t);
          const { signedQuery: g } = Oi(p, f, h), w = await this.api(
            `https://api.bilibili.com/x/player/wbi/playurl?${g}`
          ), v = a(w);
          if (v.length > 0) {
            s = w, o = v, c = Number(w?.quality || d);
            break;
          }
        } catch {
        }
    if (!o.length)
      throw new Error("未能获取到有效视频直链播放流");
    return {
      sources: o,
      quality: c,
      acceptQuality: s?.accept_quality || [80, 64, 32, 16],
      acceptDescription: s?.accept_description || ["1080P 高清", "720P 高清", "480P 清晰", "360P 流畅"]
    };
  }
  /**
   * 现代化多源视频流与分P信息自洽解析
   */
  async resolvePlayStream(t, i = 1) {
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
    const r = String(t.bvid || "").trim(), n = String(t.aid || "").trim(), s = r.startsWith("BV") ? r : "", o = n.replace(/^av/i, "") || (r.startsWith("BV") ? "" : r.replace(/^av/i, "")), c = s ? `bvid=${encodeURIComponent(s)}` : `aid=${encodeURIComponent(o)}`;
    let a = null;
    try {
      a = await this.api(`https://api.bilibili.com/x/web-interface/view?${c}`);
    } catch {
    }
    const d = a?.bvid || "", f = d.startsWith("BV") ? d : s || "", p = (Array.isArray(a?.pages) ? a.pages : []).map((k) => ({
      cid: k.cid,
      page: k.page,
      part: k.part || `第${k.page}集`,
      duration: k.duration || 0
    })), g = p.findIndex((k) => k.page === i), w = g >= 0 ? p[g] : p[0] || null, v = w?.cid || a?.cid || t.cid;
    if (!v)
      throw new Error("无法获取视频 CID 标识");
    const I = Number(t.preferredQuality || 64), y = await this.fetchPlayStream(f, v, I);
    return {
      title: a?.title || t.title || f,
      poster: String(a?.pic || t.cover || "").replace(/^http:/, "https:"),
      sources: y.sources,
      aid: a?.aid || t.aid || null,
      bvid: f,
      cid: v || null,
      owner: a?.owner?.name || t.owner || t.author || "UP主",
      ownerFace: a?.owner?.face ? String(a.owner.face).replace(/^http:/, "https:") : t.ownerFace || t.face || "",
      ownerMid: a?.owner?.mid || null,
      pubdate: a?.pubdate || 0,
      desc: a?.desc || t.desc || "暂无简介",
      views: a?.stat?.view || t.views || 0,
      danmaku: a?.stat?.danmaku || t.danmaku || 0,
      likes: a?.stat?.like || t.likes || 0,
      currentQuality: y.quality,
      acceptQuality: y.acceptQuality,
      acceptDescription: y.acceptDescription,
      pages: p,
      currentPage: w?.page || 1,
      partTitle: w?.part || ""
    };
  }
  /**
   * 纯数据拉取并深度解析视频字幕轨道 (支持 WBI 签名鉴权与多语言挑选)
   */
  async fetchVideoSubtitleDetails(t, i, r) {
    r?.throwIfAborted();
    const n = await this.api(`https://api.bilibili.com/x/web-interface/view?bvid=${encodeURIComponent(t)}`, { signal: r });
    if (r?.throwIfAborted(), r && !n?.cid) throw new Error("无法读取视频详情，请重试");
    if (!n?.cid) return { ok: !1, reason: "视频不存在或未登录", cues: [] };
    const s = Array.isArray(n?.pages) ? n.pages : [], o = i ? s.find((_) => _.cid === i) : null, c = i || n.cid, a = o?.part ? ` · P${o.page} ${o.part}` : "", { ik: d, sk: f } = await this.getWbiKeys(r);
    r?.throwIfAborted();
    const { signedQuery: h } = Oi({ bvid: t, cid: c }, d, f), p = await this.api(`https://api.bilibili.com/x/player/wbi/v2?${h}`, { signal: r });
    if (r?.throwIfAborted(), r && !Array.isArray(p?.subtitle?.subtitles)) throw new Error("字幕轨道返回异常或当前账号无权读取");
    const g = p?.subtitle?.subtitles || [];
    if (!g.length)
      return { ok: !1, reason: `该视频${a ? "（" + a.trim() + "）" : ""}没有可用字幕`, cues: [] };
    const w = g.find((_) => /zh|中文|汉语|漢語/i.test((_.lan || "") + " " + (_.lan_doc || ""))) || g[0], v = w.subtitle_url || "", I = v.startsWith("//") ? `https:${v}` : v.startsWith("http") ? v : `https://${v}`, y = await fetch(I, { signal: r, credentials: "include", headers: { Accept: "application/json" } });
    if (!y.ok) throw new Error(`字幕获取失败: ${y.status}`);
    const k = await y.arrayBuffer();
    r?.throwIfAborted();
    let E;
    try {
      E = JSON.parse(new TextDecoder("utf-8", { fatal: !0 }).decode(k));
    } catch {
      try {
        E = JSON.parse(new TextDecoder("gb18030").decode(k));
      } catch {
        E = JSON.parse(new TextDecoder("big5").decode(k));
      }
    }
    if (r && !Array.isArray(E?.body)) throw new Error("字幕正文格式异常");
    const B = (E?.body || []).map((_, _r) => ({
      id: `${_.from || 0}_${_r}`,
      from: Number(_.from || 0),
      to: Number(_.to || _.from || 0),
      content: String(_.content || "").trim()
    })).filter((_) => _.content), ve = (n.title || t) + a, re = [];
    if (re.push("标题：" + ve), re.push("字幕轨道：" + g.map((_) => _.lan_doc || _.lan || "未知").join(" / ") + "（已选：" + (w.lan_doc || w.lan || "默认") + "）"), n.owner?.name && re.push("UP主：" + n.owner.name), n.pubdate) {
      const _ = new Date(n.pubdate * 1e3);
      re.push(`发布时间：${_.getFullYear()}-${String(_.getMonth() + 1).padStart(2, "0")}-${String(_.getDate()).padStart(2, "0")}`);
    }
    re.push("链接：https://www.bilibili.com/video/" + t + (o?.page ? `?p=${o.page}` : ""));
    const Ht = B.map((_) => _.content).join(`\r
`), Ur = re.join(`\r
`) + `\r
\r
———— 字幕正文 ————\r
\r
`;
    return {
      ok: !0,
      title: ve,
      bodyText: Ht,
      headText: Ur,
      lineCount: B.length,
      cues: B,
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
    ), o = s?.replies || [], c = s?.page || {}, a = Number(c.count || 0);
    return {
      comments: o.map((f) => {
        const h = {};
        if (f.content?.emote && typeof f.content.emote == "object")
          for (const [g, w] of Object.entries(f.content.emote)) {
            const v = w?.url;
            typeof v == "string" && v && (h[g] = v.replace(/^http:/, "https:"));
          }
        const p = Array.isArray(f.replies) ? f.replies.map((g) => ({
          rpid: g.rpid,
          mid: Number(g.mid || 0),
          uname: String(g.member?.uname || "B站用户"),
          avatar: String(g.member?.avatar || "").replace(/^http:/, "https:"),
          message: String(g.content?.message || ""),
          timeText: new Date(Number(g.ctime || 0) * 1e3).toLocaleString(),
          like: Number(g.like || 0)
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
          pictures: (f.content?.pictures || []).map((g) => String(g.img_src || "").replace(/^http:/, "https:")),
          emotes: h,
          replies: p
        };
      }),
      total: a,
      hasMore: i * r < a
    };
  }
  /**
   * 分页获取某条根评论下的子回复（楼中楼）
   */
  async getSubReplies(t, i, r = 1, n = 10) {
    const s = await this.api(
      `https://api.bilibili.com/x/v2/reply/reply?type=1&oid=${t}&root=${i}&pn=${r}&ps=${n}`
    ), o = s?.replies || [], c = s?.page || {}, a = Number(c.count || 0);
    return {
      replies: o.map((f) => {
        const h = {};
        if (f.content?.emote && typeof f.content.emote == "object")
          for (const [p, g] of Object.entries(f.content.emote)) {
            const w = g?.url;
            typeof w == "string" && w && (h[p] = w.replace(/^http:/, "https:"));
          }
        return {
          rpid: f.rpid,
          mid: Number(f.mid || 0),
          uname: String(f.member?.uname || "B站用户"),
          avatar: String(f.member?.avatar || "").replace(/^http:/, "https:"),
          message: String(f.content?.message || ""),
          timeText: new Date(Number(f.ctime || 0) * 1e3).toLocaleString(),
          like: Number(f.like || 0),
          emotes: h
        };
      }),
      total: a,
      hasMore: r * n < a
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
      for (const a of i)
        try {
          const d = await fetch(a);
          if (d.ok && (r = await d.text(), r && r.includes("<d p=")))
            break;
        } catch {
        }
      if (!r) return [];
      const o = new DOMParser().parseFromString(r, "text/xml").querySelectorAll("d"), c = [];
      return o.forEach((a, d) => {
        const h = (a.getAttribute("p") || "").split(","), p = parseFloat(h[0]) || 0, g = parseInt(h[1], 10) || 1, w = parseInt(h[2], 10) || 25, I = `#${(parseInt(h[3], 10) || 16777215).toString(16).padStart(6, "0")}`, y = parseInt(h[4], 10) || 0, k = parseInt(h[5], 10) || 0, E = h[6] || "", ie = h[7] || String(d), B = a.textContent?.trim() || "";
        if (B) {
          const ve = Math.floor(p / 60), re = Math.floor(p % 60), Ht = `${String(ve).padStart(2, "0")}:${String(re).padStart(2, "0")}`;
          c.push({
            id: ie,
            time: p,
            timeStr: Ht,
            mode: g,
            size: w,
            color: I,
            timestamp: y,
            pool: k,
            userHash: E,
            text: B
          });
        }
      }), c.sort((a, d) => a.time - d.time), c;
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
const Q = Ue.getInstance();
me.getInstance();
const jn = {
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
}, l = N({ ...jn });
let Wn = 1e4;
function O(e, t = !1) {
  const i = globalThis;
  typeof i.showBiliToast == "function" ? i.showBiliToast(e, 3200, { isError: t }) : typeof i.showWindowsToast == "function" && i.showWindowsToast({
    id: `bili_mini_${Date.now()}`,
    appName: "哔哩哔哩",
    icon: "assets/bilibili.svg",
    title: "B站迷你播放器",
    message: e,
    duration: 3200
  });
}
let Fe = "";
function $i() {
  Fe && URL.revokeObjectURL(Fe), Fe = "";
}
const lo = {
  get state() {
    return l;
  },
  bringToFront() {
    l.zIndex = ++Wn;
  },
  /**
   * 打开并播放指定视频
   */
  async openVideo(e) {
    const t = e.bvid || "", i = e.aid ? String(e.aid) : "";
    if (!t && !i) {
      O("无法播放：缺少视频标识 (BV/AV号)", !0);
      return;
    }
    this.bringToFront();
    const r = l.bvid === t || !!i && l.aid === i;
    if (l.isOpen && r && !e.cachedSourceUrl && (l.videoSrc || l.iframeSrc) && !l.errorMsg) {
      l.collapsed = !1;
      return;
    }
    if ($i(), l.isOpen = !0, l.collapsed = !1, l.isLoading = !0, l.errorMsg = "", l.bvid = t, l.aid = i, l.cid = e.cid || "", l.title = e.title || t || "加载中…", l.cover = e.cover || "", l.author = e.author || "", l.authorMid = e.mid ? String(e.mid) : "", l.authorFace = e.authorFace || "", l.videoSrc = "", l.iframeSrc = "", l.useIframe = !1, l.currentTime = 0, l.pages = [], l.currentPageIndex = 0, l.comments = [], l.commentsPage = 1, l.hasMoreComments = !1, l.totalComments = 0, l.danmakuList = [], l.danmakuLoading = !1, typeof window < "u" && (l.x = Math.max(20, Math.floor((window.innerWidth - 380) / 2)), l.y = Math.max(60, Math.min(100, Math.floor((window.innerHeight - 254) / 3)))), e.cachedSourceUrl) {
      Fe = e.cachedSourceUrl, l.videoSrc = Fe, l.isLoading = !1;
      return;
    }
    try {
      const n = await Q.resolvePlayStream({
        bvid: t,
        aid: i,
        cid: e.cid,
        title: e.title,
        cover: e.cover,
        preferredQuality: l.currentQuality
      });
      if (l.title = n.title || e.title || t, l.cover = n.poster || e.cover || "", l.author = n.owner || e.author || "UP主", l.authorFace = n.ownerFace || e.authorFace || "", n.ownerMid && (l.authorMid = String(n.ownerMid)), l.aid = n.aid ? String(n.aid) : i, l.bvid = n.bvid || t, l.cid = n.cid || "", l.description = n.desc || "", l.pubdate = n.pubdate ? new Date(n.pubdate * 1e3).toLocaleString() : "", l.pages = n.pages || [], l.currentPageIndex = Math.max(0, n.currentPage - 1), n.acceptQuality?.length && (l.qualities = n.acceptQuality.map((s, o) => ({
        qn: s,
        desc: n.acceptDescription?.[o] || Ni(s)
      }))), l.currentQuality = n.currentQuality || 64, n.sources && n.sources.length)
        l.videoSrc = n.sources[0], l.isPlaying = !0, l.danmakuEnabled && this.loadDanmaku();
      else
        throw new Error("未能获取到直链源");
    } catch (n) {
      l.errorMsg = n?.message || "未能获取到视频播放流", O(`视频加载未完成：${l.errorMsg}`, !0);
    } finally {
      l.isLoading = !1;
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
      O("当前视频未获取到原生流，保持内嵌模式");
      return;
    }
    l.useIframe = !l.useIframe, l.useIframe && !l.iframeSrc && (l.iframeSrc = `https://player.bilibili.com/player.html?bvid=${encodeURIComponent(l.bvid)}&autoplay=1&danmaku=0&high_quality=1`), O(l.useIframe ? "已切换至官方嵌入播放模式" : "已切换至原生播放模式");
  },
  /**
   * 切换选集（分P）
   */
  async switchEpisode(e) {
    if (e < 0 || e >= l.pages.length) return;
    const t = l.pages[e];
    if (t) {
      l.currentPageIndex = e, l.cid = t.cid, l.isLoading = !0, l.errorMsg = "", l.danmakuList = [], l.danmakuLoading = !1;
      try {
        const i = await Q.fetchPlayStream(
          l.bvid,
          t.cid,
          l.currentQuality
        );
        if (i.sources?.length)
          l.videoSrc = i.sources[0], l.currentTime = 0, l.isPlaying = !0, l.danmakuEnabled && this.loadDanmaku();
        else
          throw new Error("获取分P视频流失败");
      } catch (i) {
        l.errorMsg = i?.message || "切换选集失败", O(`分P切换失败：${l.errorMsg}`, !0);
      } finally {
        l.isLoading = !1;
      }
    }
  },
  /**
   * 切换清晰度
   */
  async switchQuality(e) {
    if (l.qualityMenuOpen = !1, e === l.currentQuality) return;
    l.isLoading = !0;
    const t = l.currentTime;
    try {
      const i = await Q.fetchPlayStream(
        l.bvid,
        l.cid,
        e
      );
      i.sources?.length && (l.videoSrc = i.sources[0], l.currentQuality = i.quality, l.currentTime = t, l.isPlaying = !0, O(`已切换清晰度为 ${Ni(e)}`));
    } catch (i) {
      O(`清晰度切换失败：${i?.message || "网络异常"}`, !0);
    } finally {
      l.isLoading = !1;
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
    $i(), l.isOpen = !1, l.isPlaying = !1, l.videoSrc = "", l.episodesOpen = !1, l.descOpen = !1, l.commentsOpen = !1;
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
    l.danmakuEnabled = t, O(t ? "已开启弹幕" : "已关闭弹幕"), t && (!l.danmakuList.length || l.danmakuLoading) && this.loadDanmaku();
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
          const r = await Q.getVideoView(l.bvid);
          r?.cid && (t = r.cid, l.cid = t);
        }
        if (!t) {
          l.danmakuLoading = !1, O("未能获取到当前视频的 cid，暂无法拉取弹幕", !0);
          return;
        }
        const i = await Q.getVideoDanmaku(t);
        l.danmakuList = i, i.length > 0 ? O(`✓ 已成功获取 ${i.length} 条弹幕`) : O("当前视频暂无弹幕或弹幕列表为空");
      } catch (t) {
        console.warn("[MiniPlayer] 获取弹幕失败:", t), O(`获取弹幕失败: ${t?.message || "网络异常"}`, !0);
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
`)), O("已复制视频简介到剪贴板");
    } catch {
      O("复制简介失败", !0);
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
        const n = await Q.getVideoView(l.bvid);
        n?.aid && (t = String(n.aid), l.aid = t);
      }
      if (!t) {
        l.commentsLoading = !1;
        return;
      }
      const i = await Q.getVideoComments(
        t,
        l.commentsPage,
        20,
        l.commentsSort
      ), r = (i.comments || []).map((n) => {
        const s = n.mid ? String(n.mid) : "", o = String(n.uname || "").trim(), c = l.authorMid ? String(l.authorMid) : "", a = String(l.author || "").trim(), d = !!(c && s && c === s || a && o && a === o);
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
          isUp: d,
          replies: (n.replies || []).map((f) => ({
            id: String(f.rpid),
            userName: f.uname,
            message: f.message
          }))
        };
      });
      e ? l.comments = r : l.comments = [...l.comments, ...r], l.totalComments = i.total || l.comments.length, l.hasMoreComments = i.hasMore;
    } catch (t) {
      O(`评论加载失败：${t?.message || "网络异常"}`, !0);
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
          const c = await Q.getVideoView(l.bvid);
          c?.aid && (i = String(c.aid), l.aid = i);
        }
        if (!i) {
          t.subRepliesLoading = !1;
          return;
        }
        const r = await Q.getSubReplies(i, e, t.subRepliesPage, 10), n = (r.replies || []).map((c) => ({
          id: String(c.rpid),
          userName: c.uname,
          message: c.message
        })), s = new Set((t.replies || []).map((c) => String(c.id))), o = n.filter((c) => !s.has(String(c.id)));
        t.replies = [...t.replies || [], ...o], t.subRepliesHasMore = r.hasMore;
      } catch (i) {
        O(`子回复加载失败：${i?.message || "网络异常"}`, !0);
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
};
function Vn() {
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
  const e = z.activeId;
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
function qn(e) {
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
function Fn(e, t) {
  if (u.visible) return;
  const i = t || S.channel || "main", r = S.rooms.find((o) => o.id === i), n = r?.name ? `#${r.name}` : void 0;
  let s = "assets/icon-48.png";
  if (e.sender?.avatar && /^https?:\/\//i.test(e.sender.avatar)) {
    const o = Nt(e.sender.avatar);
    o && (s = o);
  }
  Y.show({
    id: `chat_msg_${e.id}`,
    appType: "chat",
    appName: "海狸聊天室",
    icon: s,
    title: e.sender?.name || "新消息",
    subtitle: n,
    message: qn(e),
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
class Re extends Error {
  constructor(t) {
    super(`服务器响应 ${t}`), this.status = t, this.name = "PrivateChatHttpError";
  }
}
class ye extends Error {
  constructor() {
    super(...arguments), this.name = "ChatCapabilityError";
  }
}
function pr(e, t, i) {
  return new Promise((r, n) => {
    const s = new AbortController(), o = () => s.abort(new DOMException("聊天室操作已停止等待", "AbortError")), c = () => {
      clearTimeout(d), i?.removeEventListener("abort", o), s.signal.removeEventListener("abort", a);
    }, a = () => {
      c(), n(s.signal.reason);
    }, d = setTimeout(() => s.abort(new DOMException("聊天室操作超时，结果可能尚未确认", "TimeoutError")), e);
    if (s.signal.addEventListener("abort", a, { once: !0 }), i?.addEventListener("abort", o, { once: !0 }), i?.aborted) {
      o();
      return;
    }
    Promise.resolve().then(() => (s.signal.throwIfAborted(), t(s.signal))).then(
      (f) => {
        c(), s.signal.aborted ? n(s.signal.reason) : r(f);
      },
      (f) => {
        c(), n(f);
      }
    );
  });
}
class W extends Error {
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
class Gn {
  constructor(t = () => {
  }) {
    this.onBlocked = t;
  }
  open() {
    if (this.database) return this.database;
    const t = new Promise((i, r) => {
      let n = !1;
      const s = (c) => {
        n || (n = !0, clearTimeout(o), r(c));
      }, o = setTimeout(() => s(new W("timeout")), 8e3);
      try {
        const c = indexedDB.open("lw-private-chat-credentials", 1);
        c.onupgradeneeded = () => {
          if (n) {
            c.transaction?.abort();
            return;
          }
          c.result.createObjectStore("credentials");
        }, c.onsuccess = () => {
          const a = c.result;
          if (n) {
            a.close();
            return;
          }
          n = !0, clearTimeout(o), a.onversionchange = () => {
            a.close(), this.database === t && (this.database = void 0);
          }, i(a);
        }, c.onerror = () => s(new W("storage")), c.onblocked = () => {
          if (!n) {
            s(new W("blocked"));
            try {
              this.onBlocked();
            } catch {
            }
          }
        };
      } catch {
        s(new W("storage"));
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
    if (!Qe(i)) throw new W("invalid");
    await this.access(t, i);
  }
  access(t, i, r) {
    const n = C(t);
    return pr(8e3, async (s) => {
      try {
        const o = await this.open();
        return s.throwIfAborted(), await new Promise((c, a) => {
          const d = o.transaction("credentials", i === void 0 ? "readonly" : "readwrite"), f = d.objectStore("credentials"), h = i === void 0 ? f.get(n) : f.put(i, n), p = () => {
            try {
              d.abort();
            } catch {
            }
          }, g = () => s.removeEventListener("abort", p);
          i === void 0 && s.addEventListener("abort", p, { once: !0 }), d.oncomplete = () => {
            g();
            const w = i === void 0 ? h.result : i;
            w === void 0 || w === "" ? a(new W("missing")) : Qe(w) ? c(w) : a(new W("invalid"));
          }, d.onabort = d.onerror = h.onerror = () => {
            g(), a(new W("storage"));
          };
        });
      } catch (o) {
        throw s.aborted ? s.reason : o instanceof W ? o : new W("storage");
      }
    }, r);
  }
}
class ue extends Error {
  constructor() {
    super(...arguments), this.name = "PrivateChatTransportError";
  }
}
class Kn {
  constructor(t) {
    this.ports = t;
  }
  async request(t) {
    let i, r;
    try {
      if (i = Object.freeze({ ...nt(t.destination), channel: t.destination.channel }), r = new URL(t.path, i.origin), !t.path.startsWith("/api/v1/") || t.path.includes("\\") || r.origin !== i.origin || r.hash || r.username || r.password || !r.pathname.startsWith("/api/v1/")) throw new Error();
    } catch {
      throw new ue("聊天室请求目标无效");
    }
    const n = Object.freeze({ ...t, destination: i, path: r.pathname, method: (t.method || "GET").toUpperCase() });
    return r.searchParams.set("room", i.room), r.searchParams.delete("channel"), i.channel && i.channel !== "main" && r.searchParams.set("channel", i.channel), pr(n.signal ? 3e4 : 15e3, async (s) => {
      try {
        const o = await this.ports.credential(i, s);
        if (s.throwIfAborted(), !Qe(o)) throw new W("invalid");
        this.ports.beforeSend(n);
        let c;
        try {
          c = n.body === void 0 ? void 0 : JSON.stringify(n.body);
        } catch {
          throw new ue("聊天室请求内容格式无效");
        }
        const a = await fetch(r, {
          method: n.method,
          signal: s,
          body: c,
          headers: { Authorization: `Bearer ${o}`, "Content-Type": "application/json" },
          redirect: "error",
          credentials: "omit",
          cache: "no-store",
          referrerPolicy: "no-referrer"
        }), d = () => {
          a.body?.cancel().catch(() => {
          });
        };
        if (s.aborted && (d(), s.throwIfAborted()), !a.ok)
          throw d(), new Re(a.status);
        const f = a.body?.getReader();
        if (!f) throw new ue("聊天室返回空响应");
        const h = () => {
          f.cancel().catch(() => {
          });
        };
        s.addEventListener("abort", h, { once: !0 });
        let p = 0, g = "";
        const w = new TextDecoder();
        try {
          for (; ; ) {
            const v = await f.read();
            if (s.throwIfAborted(), v.done) break;
            if (p += v.value.byteLength, p > 2 * 1024 * 1024)
              throw h(), new ue("聊天室响应超限");
            g += w.decode(v.value, { stream: !0 });
          }
          try {
            return JSON.parse(g + w.decode());
          } catch {
            throw new ue("聊天室响应格式无效");
          }
        } finally {
          s.removeEventListener("abort", h);
          try {
            f.releaseLock();
          } catch {
          }
        }
      } catch (o) {
        throw s.aborted ? s.reason : o instanceof Re || o instanceof ye || o instanceof W || o instanceof ue ? o : new ue("聊天室请求失败，请检查网络或服务配置");
      }
    }, n.signal);
  }
}
class Hn {
  constructor(t) {
    this.ports = t, this.generation = 0, this.halted = !0, this.liveGeneration = -1, this.reads = new Or();
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
    let c = s ? 2500 : 1e4, a = "读取本地历史";
    const d = {
      signal: o.signal,
      current: o.current,
      wait: o.wait,
      visible: s,
      phase: (f) => {
        a = f;
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
      r = 0, f?.hasMore && (c = 250);
    } catch (f) {
      if (!this.owns(t, i)) return;
      const h = this.ports.classify(f, t);
      h === "retry" ? (++r, c = Math.min(6e4, 1500 * 2 ** Math.min(r, 4))) : this.halted = !0, this.ports.failed(h, a, r), h === "missing-room" && i === this.generation && this.halted && this.schedule(() => this.ports.restart(), 0, i);
    } finally {
      o.finish(), this.running === n && (this.running = void 0), i === this.generation && (this.ports.active(t) || (this.halted = !0), this.ports.idle()), this.owns(t, i) && this.schedule(() => {
        this.tick(t, i, r);
      }, c, i);
    }
  }
}
const ee = (e) => !!e && typeof e == "object" && !Array.isArray(e), oe = (e) => typeof e == "string" && /^[A-Za-z0-9_-]{1,160}$/.test(e), Ge = (e) => e == null, Ye = (e) => typeof e == "number" && Number.isFinite(e) && e >= 0;
function x() {
  throw new Error("同步页格式无效，未提交本页记录或推进游标");
}
function qt(e) {
  if (!Array.isArray(e) || e.length > 32) throw new Error("房间列表格式无效");
  return e.map((t) => {
    if (!ee(t) || !oe(t.id) || typeof t.name != "string" || t.name.length > 80 || typeof t.icon != "string" || t.icon.length > 8 || typeof t.description != "string" || t.description.length > 500) throw new Error("房间格式无效");
    if (t.space !== void 0 && !oe(t.space)) throw new Error("空间格式无效");
    return { id: t.id, name: t.name, icon: t.icon, description: t.description, space: typeof t.space == "string" ? t.space : "hub_main" };
  });
}
function Ft(e) {
  if (!Array.isArray(e) || e.length > 16) throw new Error("空间列表格式无效");
  return e.map((t) => {
    if (!ee(t) || !oe(t.id) || typeof t.name != "string" || t.name.length > 80 || typeof t.icon != "string" || t.icon.length > 8) throw new Error("空间格式无效");
    return { id: t.id, name: t.name, icon: t.icon };
  });
}
function hr(e, t) {
  if (typeof e.name != "string" || e.name.length > 200) return;
  const i = yn({ ...e, name: e.name.slice(0, 100) }, t);
  return i && { ...i, name: e.name };
}
function Jn(e, t) {
  return Ge(e) ? [] : ((!Array.isArray(e) || e.length > 65) && x(), e.map((i) => {
    (!ee(i) || !oe(i.uid) || i.role !== void 0 && i.role !== "owner" && i.role !== "member") && x();
    const r = hr(i, t);
    return r || x(), r.activity && ee(i.activity) && Ye(i.activity.updatedAt) && (r.activity.updatedAt = i.activity.updatedAt), {
      ...r,
      role: i.role === "owner" ? "owner" : "member",
      online: typeof i.online == "boolean" ? i.online : void 0,
      lastSeen: Ye(i.lastSeen) ? i.lastSeen : void 0
    };
  }));
}
function zn(e, t, i) {
  if (!Ge(e))
    return (!Array.isArray(e) || e.length > 200) && x(), e.map((r) => {
      (!ee(r) || !oe(r.id) || !oe(r.toUid) || !ee(r.from) || !oe(r.from.uid)) && x();
      const n = hr(r.from, i);
      return (!n || n.uid !== t && r.toUid !== t || !["pending", "accepted", "rejected"].includes(String(r.status))) && x(), r.createdAt !== void 0 && !Ye(r.createdAt) && x(), {
        id: r.id,
        from: n,
        toUid: r.toUid,
        status: r.status,
        createdAt: Ye(r.createdAt) ? r.createdAt : i,
        note: typeof r.note == "string" && r.note.length <= 200 ? r.note : void 0
      };
    });
}
function Qn(e, t, i, r) {
  (!Number.isSafeInteger(i) || i < 0 || !Ye(r) || !ee(e) || !ee(e.identity) || e.identity.uid !== t || e.identity.role !== "owner" && e.identity.role !== "member" || !Array.isArray(e.messages) || e.messages.length > 50) && x();
  let n = i;
  const s = [], o = [];
  for (const d of e.messages) {
    (!ee(d) || !Number.isSafeInteger(d.seq) || d.seq <= n) && x();
    const f = tr(d.message, r);
    f || x(), s.push(f), o.push(d.seq), n = d.seq;
  }
  e.hasMore !== void 0 && typeof e.hasMore != "boolean" && x();
  const c = e.hasMore === !0;
  c && !s.length && x();
  let a;
  return Ge(e.friends) || ((!Array.isArray(e.friends) || e.friends.length > 4096 || !e.friends.every(oe)) && x(), a = [...new Set(e.friends)]), Object.freeze({
    uid: t,
    role: e.identity.role,
    messages: s,
    sequences: o,
    next: n,
    hasMore: c,
    capabilities: hn(e.capabilities),
    rooms: Ge(e.rooms) ? [{ id: "main", name: "综合讨论", icon: "💬", description: "" }] : qt(e.rooms),
    spaces: Ge(e.spaces) ? [{ id: "hub_main", name: "聊天室", icon: "🏠" }] : Ft(e.spaces),
    roomsSupported: Array.isArray(e.rooms),
    spacesSupported: Array.isArray(e.spaces),
    members: Jn(e.members, r),
    friends: a,
    friendRequests: zn(e.friendRequests, t, r)
  });
}
function Be(e, t, i) {
  for (const r of Object.keys(t)) {
    if (!i()) return !1;
    e[r] = t[r];
  }
  return i();
}
function Yn(e, t, i, r) {
  const { chat: n, service: s } = r, o = i.current;
  if (!o()) return !1;
  const c = i.restoring();
  for (let y = 0; y < e.messages.length; y++) {
    if (!o()) return !1;
    const k = e.messages[y];
    r.publish(k, Object.freeze({
      scope: t.scope,
      channel: t.channel,
      sequence: e.sequences[y],
      source: c ? "history" : k.sender.uid === e.uid ? "self" : "live"
    }), o);
  }
  if (!o()) return !1;
  const a = new Set(n.messages.map((y) => y.id)), d = e.messages.filter((y) => y.sender.uid !== e.uid && !y.meta?.silentPartySync && y.type !== "system" && !a.has(y.id)), f = n.visible ? [] : d.filter((y) => (t.cursor > 0 || t.now - y.timestamp < 3e4) && (y.type !== "music_party" || !c)).slice(-3), h = new Map(n.messages.map((y) => [y.id, y]));
  for (const y of e.messages) h.set(y.id, y);
  const p = Object.assign(/* @__PURE__ */ Object.create(null), n.userActivities);
  for (const y of e.members) y.activity && (p[y.uid] = y.activity);
  const g = [], w = new Set(n.friends.map((y) => y.uid)), v = new Map(e.members.map((y) => [y.uid, y]));
  for (const y of e.friends || []) {
    const k = v.get(y);
    k && !w.has(y) && (g.push({ uid: y, name: k.name, avatar: k.avatar, addedAt: t.now, status: "mutual" }), w.add(y));
  }
  if (!Be(n, {
    messages: [...h.values()].sort((y, k) => y.timestamp - k.timestamp || y.id.localeCompare(k.id)).slice(-200),
    unreadCount: d.length ? n.visible ? 0 : n.unreadCount + d.length : n.unreadCount
  }, o) || !Be(s, {
    capabilities: e.capabilities,
    imageMessagesSupported: e.capabilities.messageTypes.includes("image"),
    spacesSupported: e.spacesSupported,
    spaces: e.spaces,
    roomsSupported: e.roomsSupported,
    rooms: e.rooms
  }, o) || (r.authenticated(), !o()) || !Be(s, { role: e.role, members: e.members, ...e.friends === void 0 ? {} : { friends: e.friends } }, o)) return !1;
  for (const y of g) {
    if (!o()) return !1;
    n.friends.some((k) => k.uid === y.uid) || n.friends.push(y);
  }
  const I = e.members.some((y) => !!y.activity) || Object.getPrototypeOf(n.userActivities) !== null ? { userActivities: p } : {};
  if (!Be(n, {
    ...I,
    ...e.friendRequests === void 0 ? {} : { friendRequests: e.friendRequests },
    connected: !0,
    connecting: !1,
    error: ""
  }, o) || !Be(s, { status: "已连接私有服务器" }, o)) return !1;
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
const pe = "private-relay-server";
class Zn {
  constructor(t) {
    this.ports = t, this.flushing = !1;
  }
  async postAndAcknowledge(t, i, r = 12e3) {
    const n = Object.freeze({ ...t }), s = Ke(this.ports.capabilities(n), i);
    if (s) throw new ye(s);
    const o = await this.ports.post(n, i, AbortSignal.timeout(r));
    if (!o || o.stored !== !0 || o.id !== i.id) throw new Error("未收到服务器落盘确认");
    await xn(this.ports.scope(n), i.id, pe);
  }
  async recordFailure(t, i, r, n) {
    try {
      if (r instanceof ye) {
        D.value = r.message, await Ri(this.ports.scope(t), i, pe, !1, n, !0);
        return;
      }
      const s = r instanceof Re && r.status >= 400 && r.status < 500 && ![408, 429].includes(r.status);
      await Ri(this.ports.scope(t), i, pe, s, n);
    } catch {
      D.value = "无法保存消息的发送状态，请检查浏览器存储。";
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
        await Dn(this.ports.scope(s), [pe], () => this.ports.active(t), (o, c, a) => {
          --n;
          const d = { ...c, sender: { ...c.sender, avatar: this.ports.avatar(c.sender.avatar) } };
          return i.push(this.postAndAcknowledge(s, d).catch((f) => this.recordFailure(s, c.id, f, a))), !0;
        }, n, (o) => !Ke(this.ports.capabilities(s), o));
      }
    } catch {
      D.value = "待发队列处理未确认，请检查本地存储；未改投其他房间。";
    } finally {
      await Promise.allSettled(i), this.flushing = !1;
    }
  }
}
const St = [];
function uo(e) {
  return St.push(e), () => {
    const t = St.indexOf(e);
    t >= 0 && St.splice(t, 1);
  };
}
async function fo() {
  const e = b.room;
  if (!e || e.uid !== u.currentUser.uid) throw new Error("请先在聊天室设置中加入自己的聊天室");
  const t = { ...e }, i = await L(t, "/api/v1/rooms", "GET", void 0, AbortSignal.timeout(15e3));
  if (!b.room || C(t) !== C(b.room)) throw new Error("聊天室配置已改变，请重新选择");
  const r = i.spaces ? Ft(i.spaces) : [];
  return qt(i.rooms).map((n) => ({ ...t, channel: n.id, name: `${r.find((s) => s.id === n.space)?.name || "聊天室"} / ${n.name}` }));
}
async function ri(e, t) {
  const i = b.room;
  if (!i || C(i) !== C(t) || u.currentUser.uid !== t.uid) throw new Error("聊天室身份已改变，未发送，请重新选择房间");
  const r = it(e);
  if (!r || r.type === "system" || r.type === "image") throw new Error("分享内容无效或超出大小限制，未发送");
  const n = { ...t };
  r.sender = { ...r.sender, uid: n.uid, avatar: Lt(u.currentUser.avatar, F.avatarUrl), name: u.currentUser.name };
  const s = Ke(ot(n), r);
  if (s) throw new Error(s);
  await Dt(ae(n), [r]), await fr(ae(n), r, [pe]), te(n) && !u.messages.some((o) => o.id === r.id) && u.messages.push(r);
  try {
    await Tt.postAndAcknowledge(n, r, 15e3);
  } catch (o) {
    throw await Tt.recordFailure(n, r.id, o, 0), Kt(), new Error(`未收到「${n.name}」的保存确认；已保留在该房间待发队列，请勿重复发送。`);
  }
}
const S = N({
  status: "未配置私有服务器",
  role: "",
  syncing: !1,
  channel: "main",
  rooms: [],
  spaces: [],
  spacesSupported: !1,
  imageMessagesSupported: !1,
  capabilities: Ot(),
  roomsSupported: !1,
  friends: [],
  members: []
});
function ot(e) {
  return be === C(e) && b.room && C(b.room) === C(e) && u.currentUser.uid === e.uid ? S.capabilities : Ot();
}
function Gt() {
  S.capabilities = Ot(), S.imageMessagesSupported = !1;
}
const Tt = new Zn({
  active: te,
  capabilities: ot,
  scope: ae,
  avatar: (e) => Lt(e, F.avatarUrl),
  destinations: (e) => [we(e), ...S.rooms.filter((t) => t.id !== S.channel).map((t) => ({ ...e, channel: t.id }))],
  post: (e, t, i) => L(e, "/api/v1/messages", "POST", { message: t }, i)
}), gr = new Gn(() => {
  S.status = "凭证数据库被旧标签页阻塞，请关闭旧页后重试";
}), Xn = new Kn({
  credential: (e, t) => gr.read(e, t),
  beforeSend: ({ destination: e, path: t, method: i, body: r }) => {
    if (!V.isInstalled("chat")) throw new ye("聊天室实验组件已停用，未发起请求");
    const n = t === "/api/v1/members" || t.startsWith("/api/v1/members/"), s = i !== "GET" && ["/api/v1/spaces", "/api/v1/rooms"].some((o) => t === o || t.startsWith(o + "/"));
    if ((n || s) && (!u.connected || S.role !== "owner" || be !== C(e) || !b.room || C(b.room) !== C(e) || u.currentUser.uid !== e.uid))
      throw new Re(403);
    if (i === "POST" && t === "/api/v1/messages") {
      const o = Ke(ot(e), r.message);
      if (o) throw new ye(o);
    }
  }
});
function es(e) {
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
let ni = 0;
async function mo(e) {
  if (!V.isInstalled("chat")) throw new ye("请先在商店手动启用聊天室实验组件");
  const t = es(e);
  if (t.uid !== u.currentUser.uid) throw new Error("此邀请不属于当前 UID，请让服主为当前账号重新创建");
  const i = nt(t), r = b.room ? C(b.room) : null;
  Ze();
  const n = ni;
  if (await gr.write(i, t.token), n !== ni || u.currentUser.uid !== t.uid || r !== (b.room ? C(b.room) : null))
    throw new Error("凭据已保存，但身份或连接选择已改变，未激活旧邀请；如需加入请重新确认。");
  Ze(), On(i), u.transportMode = "relay", rt(dr(i), t.room), ce();
}
function L(e, t, i = "GET", r, n) {
  return V.isInstalled("chat") ? Xn.request({ destination: e, path: t, method: i, body: r, signal: n }) : Promise.reject(new ye("请先在商店手动启用聊天室实验组件"));
}
async function yr(e, t, i) {
  const r = b.room;
  if (!r) throw new Error("未配置私有服务器");
  return L({ ...r }, e, t, i, AbortSignal.timeout(15e3));
}
async function po() {
  return (await yr("/api/v1/members", "GET")).members;
}
async function ts(e, t) {
  const i = b.room;
  if (!i) throw new Error("未配置私有服务器");
  const r = { ...i }, n = await L(r, "/api/v1/members", "POST", { uid: e, name: t }, AbortSignal.timeout(15e3));
  if (!Qe(n.token)) throw new Error("服务器返回无效，勿重复创建，请刷新成员列表");
  return "BEAVER-PRIVATE1:" + btoa(encodeURIComponent(JSON.stringify({ ...r, uid: e, token: n.token })));
}
async function ho(e) {
  const t = b.room;
  if (!t) throw new Error("未配置私有服务器，无法发送邀请");
  if (e.uid === u.currentUser.uid) throw new Error("不能邀请自己");
  const i = ot(t);
  if (!i.messageTypes.includes("server_invite")) throw new Error(i.status === "unknown" || i.status === "incompatible" ? i.reason : "服务端未启用邀请卡消息，未创建新成员邀请。");
  const r = await ts(e.uid, e.name), n = S.spaces.find((h) => h.id === (S.rooms.find((p) => p.id === S.channel)?.space || "hub_main")), s = S.rooms.find((h) => h.id === S.channel) || S.rooms[0], o = n?.name || t.room || "海狸聊天室", c = s?.name || "综合讨论";
  let a = "";
  try {
    a = JSON.parse(decodeURIComponent(atob(r.replace(/^BEAVER-PRIVATE1:/, "")))).token || "";
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
      inviteRoomName: c,
      inviteServerName: o,
      inviteServerIcon: n?.icon || "🏠",
      inviteToken: a,
      inviteTargetUid: e.uid,
      inviteCode: r
    },
    timestamp: Date.now()
  }, f = wr(e.uid);
  await ri(d, {
    ...t,
    channel: f,
    name: `私聊 / ${e.name}`
  }), is(e.uid);
}
async function go(e) {
  if (!/^[a-f0-9]{32}$/.test(e)) throw new Error("成员标识无效");
  await yr("/api/v1/members/" + e, "DELETE");
}
function we(e) {
  return { ...e, channel: S.channel };
}
function at(e) {
  const t = new URL(dr(e)), i = e.channel || "main";
  return i !== "main" && t.searchParams.set("channel", i), t.href;
}
function ae(e) {
  return di(e.uid, at(e), e.room);
}
function te(e) {
  return V.isInstalled("chat") && u.currentUser.uid === e.uid && u.serverUrl === at(e) && (e.channel || "main") === S.channel && u.currentRoomId === e.room && b.room !== null && C(b.room) === C(e);
}
function yo() {
  const e = b.room && we(b.room);
  return e && te(e) ? { scope: ae(e), channel: e.channel } : null;
}
function wr(e) {
  return "dm_" + [u.currentUser.uid, e].sort().join("__");
}
function wo(e) {
  if (!e.startsWith("dm_")) return;
  const t = e.slice(3).split("__");
  if (t.length === 2)
    return t.find((i) => i !== u.currentUser.uid);
}
function is(e) {
  const t = b.room;
  if (!t || !e || e === u.currentUser.uid) return;
  const i = wr(e);
  i === S.channel && te(we(t)) || rt(at({ ...t, channel: i }), t.room, !0) && (S.channel = i, ce());
}
async function rs(e) {
  const t = b.room;
  if (!t) throw new Error("未配置私有服务器");
  await L({ ...t }, "/api/v1/friends/request", "POST", { toUid: e }, AbortSignal.timeout(15e3));
}
async function ns(e, t) {
  const i = b.room;
  if (!i) throw new Error("未配置私有服务器");
  await L({ ...i }, "/api/v1/friends/respond", "POST", { id: e, accept: t }, AbortSignal.timeout(15e3));
}
function br(e) {
  const t = b.room;
  if (!(!t || !S.rooms.some((i) => i.id === e))) {
    if (e === S.channel && te(we(t))) {
      Kt();
      return;
    }
    rt(at({ ...t, channel: e }), t.room, be === C(t) && u.currentUser.uid === t.uid) && (S.channel = e, ce());
  }
}
async function bo(e, t) {
  const i = b.room;
  if (!i) throw new Error("未配置");
  const r = C(i), n = { ...i };
  await L(n, t ? `/api/v1/rooms/${encodeURIComponent(t)}` : "/api/v1/rooms", "POST", e, AbortSignal.timeout(15e3));
  const s = await L(n, "/api/v1/rooms", "GET", void 0, AbortSignal.timeout(15e3));
  if (b.room && C(b.room) === r && u.currentUser.uid === i.uid) {
    const o = qt(s.rooms), c = s.spaces ? Ft(s.spaces) : void 0;
    S.rooms = o, c && b.room && C(b.room) === r && u.currentUser.uid === i.uid && (S.spaces = c);
  }
}
async function vo(e) {
  if (e === "main") throw new Error("默认房间不可移除");
  const t = b.room;
  if (!t) throw new Error("未配置");
  const i = C(t);
  await L({ ...t }, `/api/v1/rooms/${encodeURIComponent(e)}`, "DELETE", void 0, AbortSignal.timeout(15e3)), !(!b.room || C(b.room) !== i) && (S.rooms = S.rooms.filter((r) => r.id !== e), S.channel === e && br("main"));
}
async function So(e, t) {
  const i = b.room;
  if (!i) throw new Error("未配置");
  const r = C(i);
  await L({ ...i }, t ? `/api/v1/spaces/${encodeURIComponent(t)}` : "/api/v1/spaces", "POST", e, AbortSignal.timeout(15e3)), b.room && C(b.room) === r && await vr(i);
}
async function Ao(e) {
  if (e === "hub_main") throw new Error("默认空间不可移除");
  const t = b.room;
  if (!t) throw new Error("未配置");
  const i = C(t), r = S.channel;
  await L({ ...t }, `/api/v1/spaces/${encodeURIComponent(e)}`, "DELETE", void 0, AbortSignal.timeout(15e3)), !(!b.room || C(b.room) !== i || u.currentUser.uid !== t.uid) && (await vr(t), !(!b.room || C(b.room) !== i || u.currentUser.uid !== t.uid) && S.channel === r && !S.rooms.some((n) => n.id === r) && br("main"));
}
async function vr(e) {
  const t = await L({ ...e }, "/api/v1/spaces", "GET", void 0, AbortSignal.timeout(15e3));
  if (!b.room || C(b.room) !== C(e) || u.currentUser.uid !== e.uid) return;
  const i = Ft(t.spaces), r = qt(t.rooms);
  S.spaces = i, b.room && C(b.room) === C(e) && u.currentUser.uid === e.uid && (S.rooms = r);
}
let Sr = "", be = "";
const yi = new Hn({
  active: te,
  visible: () => u.visible,
  poll: ss,
  started: () => {
    u.connecting = !u.connected, S.syncing = !0;
  },
  idle: () => {
    S.syncing = !1;
  },
  classify: (e, t) => e instanceof Re && e.status === 404 && (t.channel || "main") !== "main" ? "missing-room" : e instanceof Re && [401, 403].includes(e.status) ? "auth" : "retry",
  failed: (e, t, i) => {
    e === "missing-room" ? (S.channel = "main", S.status = "房间已移除，正在返回综合讨论") : e === "auth" ? (be = "", Gt(), S.role = "", u.error = "访问凭证已失效、过期或不属于此房间，请重新导入邀请", u.connected = !1, u.connecting = !1) : i >= 2 && (u.connected = !1, u.connecting = !1, u.error = `${t}失败或超时，记录与待发队列保留，将自动重试。若持续失败，请关闭旧标签页后重试，并检查服务配置。`, S.status = u.error);
  },
  restart: () => ce()
});
function Kt() {
  const e = b.room && we(b.room);
  e && !yi.stopped && Sr === C(e) && te(e) || ce();
}
function Ar() {
  yi.cancel();
}
function Ze() {
  ++ni, Ar(), be = "", Gt(), u.connected = !1, u.connecting = !1, S.role = "";
}
function ce() {
  if (!V.isInstalled("chat")) {
    Ze(), u.visible = !1, u.error = "", S.status = "实验性组件默认关闭，请先在商店手动启用";
    return;
  }
  const e = b.room && we(b.room), t = !!e && be === C(e) && u.currentUser.uid === e.uid;
  if (t ? Ar() : Ze(), !e) {
    S.status = "尚未读取到聊天室配置，请在此窗口设置中检查", u.error = "";
    return;
  }
  if (e.uid !== u.currentUser.uid) {
    u.error = S.status = "邀请 UID 与本机不一致，请重新导入属于本机的邀请";
    return;
  }
  u.transportMode = "relay", rt(at(e), e.room, t) && (Sr = C(e), u.connected || (S.status = "正在同步"), yi.start(e));
}
async function ss(e, t) {
  const i = ae(e), r = e.channel || "main", n = await t.wait(() => bn(i)), s = Lt(u.currentUser.avatar, F.avatarUrl), o = u.currentUser.activity || Vn(), c = u.shareActivity !== !1 && o?.title ? `&act_type=${encodeURIComponent(o.type || "")}&act_title=${encodeURIComponent(o.title || "")}&act_url=${encodeURIComponent(o.url || "")}` : "", a = t.visible ? "&wait=6" : "", d = `/api/v1/sync?after=${n}&avatar=${encodeURIComponent(s)}&name=${encodeURIComponent(u.currentUser.name.slice(0, 100))}${c}${a}`;
  t.phase("连接私有服务器");
  const f = await t.wait(() => L(e, d, "GET", void 0, t.signal));
  if (!t.current()) return;
  t.phase("校验同步页");
  let h;
  try {
    h = Qn(f, e.uid, n, Date.now());
  } catch (p) {
    throw t.current() && Gt(), p;
  }
  if (t.current() && (t.phase("保存同步记录"), await t.wait(() => vn(i, h.messages, h.next)), !!t.current())) {
    try {
      await t.wait(() => mr(i, h.messages.filter((p) => p.sender.uid === e.uid).map((p) => p.id), pe));
    } catch {
      t.current() && (D.value = "无法保存消息的发送确认，请检查浏览器存储。");
    }
    if (t.current() && (t.phase("应用同步状态"), !!Yn(h, { scope: i, channel: r, cursor: n, now: Date.now() }, t, {
      chat: u,
      service: S,
      authenticated: () => {
        be = C(e);
      },
      publish: (p, g, w) => {
        for (const v of [...St]) {
          if (!w()) return;
          try {
            v(p, g);
          } catch {
            console.warn("[PrivateChat] message listener failed");
          }
        }
      },
      notify: Fn
    }) && t.current()))
      return t.phase("处理待发消息"), Tt.flush(e), { hasMore: h.hasMore };
  }
}
async function ht(e) {
  const t = b.room && we(b.room);
  if (!t || !te(t))
    return D.value = "未配置此房间的私有服务器，未发送", !1;
  e.sender && (e.sender.avatar = Lt(u.currentUser.avatar, F.avatarUrl), u.currentUser.name && (e.sender.name = u.currentUser.name));
  const i = it(e);
  if (!i || i.type === "system")
    return D.value = "消息格式无效，未发送", !1;
  const r = Ke(ot(t), i);
  if (r)
    return D.value = r, !1;
  const n = { ...t };
  try {
    return await Dt(ae(n), [i]), await fr(ae(n), i, [pe]), te(n) && !u.messages.some((s) => s.id === i.id) && u.messages.push(i), D.value = "", Tt.flush(n), !0;
  } catch {
    return D.value = "消息未能保存到待发队列，请勿刷新，检查存储后重试", !1;
  }
}
let xi = !1;
function os() {
  xi || (xi = !0, _e(() => [V.isInstalled("chat"), JSON.stringify(b.room)], () => {
    const e = b.room;
    S.members = [], S.rooms = [], S.roomsSupported = !1, S.spaces = [], S.spacesSupported = !1, Gt(), S.channel = "main", (!e || !V.isInstalled("chat")) && (u.visible = !1, S.members = []), ce();
  }, { immediate: !0, flush: "sync" }), _e(() => u.visible, (e) => {
    e && Kt();
  }), _e(() => u.currentUser.uid, () => ce()), V.isInstalled("chat") && b.room && xe(ae(b.room)).catch(() => {
    D.value = "待发队列读取失败，请关闭旧标签页后重试";
  }));
}
class as {
  constructor() {
    os();
  }
  connect() {
    Kt();
  }
  disconnect() {
    Ze();
  }
  resetReconnectAndConnect() {
    ce();
  }
  async retryMessage(t) {
    await ht(t);
  }
  dispatchOutgoing(t, i) {
    if (!i) {
      ht(t);
      return;
    }
    ri(t, i).then(() => {
      Y.fetch("海狸聊天室", `已发送到 ${i.name}`, "服务器已保存，不代表成员已读。");
    }).catch((r) => {
      Y.fetch("海狸聊天室", "分享未确认", r instanceof Error ? r.message : "未确认发送结果，请检查聊天室连接。");
    });
  }
  sendWebsiteShare(t, i) {
    const r = tt(t.url);
    if (!r) {
      Y.fetch("海狸聊天室", "未发送", "只支持分享有效的 HTTP(S) 网站地址。");
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
    if (!i) return ht(n);
    try {
      return await ri(n, i), !0;
    } catch (s) {
      return Y.fetch("海狸聊天室", "分享未确认", s instanceof Error ? s.message : "未确认发送结果，请检查聊天室连接。"), !1;
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
    return ht(i);
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
    !t.uid || t.uid === u.currentUser.uid || rs(t.uid).then(() => {
      Y.fetch("海狸聊天室", `已向【${t.name}】发送好友申请`, "对方可在聊天室右上角通知中确认。");
    }).catch((r) => {
      Y.fetch("海狸聊天室", "好友申请未发送", r instanceof Error ? r.message : "请检查聊天室连接。");
    });
  }
  respondFriendRequest(t, i) {
    t.id && ns(t.id, i).then(() => {
      Y.fetch("海狸聊天室", i ? `已通过【${t.from.name}】的好友申请` : "已忽略该申请", i ? "双方已成为好友，可随时点击私聊。" : "");
    }).catch((r) => {
      Y.fetch("海狸聊天室", "操作未完成", r instanceof Error ? r.message : "请检查网络。");
    });
  }
}
const kr = new as(), ko = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  chatService: kr
}, Symbol.toStringTag, { value: "Module" })), cs = {
  schemaVersion: 1,
  id: "chat",
  title: "海狸聊天室",
  emoji: "💬",
  rootId: "vue-chat-dialog-root",
  settingsKeys: ["lw_chat_server_url"],
  capabilities: ["chat:message-read", "chat:message-send"],
  badgeCount: () => u.unreadCount,
  loadView: () => import("./ChatDialog-Bc8jvQef.js").then((e) => e.default),
  lifecycle: {
    isVisible: () => u.visible,
    canOpen: () => V.isInstalled("chat"),
    open: () => {
      V.isInstalled("chat") && (u.visible = !0, u.unreadCount = 0, Rn.value && kr.connect());
    },
    hide: () => {
      u.visible = !1;
    },
    canUnmount: () => !0
  }
};
J(cs);
J(an);
J(en);
J(sn);
J(nn);
J(Xr);
J(Qr);
J(Zr);
J(Jr);
J(Yr);
function ls(e) {
  const t = e.map((i) => ({ ...i }));
  for (const i of Wi()) {
    if (i.presentation !== "card" || i.showInDock === !1) continue;
    if (t.some((s) => s.id === i.id)) throw new Error("Duplicate workspace card entry");
    const r = { id: i.id, title: i.title, icon: i.icon }, n = i.dockBefore ? t.findIndex((s) => s.id === i.dockBefore) : -1;
    t.splice(n < 0 ? t.length : n, 0, r);
  }
  return t;
}
function us(e) {
  const t = e.map((i) => ({ ...i }));
  for (const i of Wi()) {
    if (i.showInDock === !1 || i.presentation === "card") continue;
    if (t.some((s) => s.id === i.id)) throw new Error("Dock module duplicated in legacy tools");
    const r = { id: i.id, title: i.title, icon: i.icon, emoji: i.emoji }, n = i.dockBefore ? t.findIndex((s) => s.id === i.dockBefore) : -1;
    t.splice(n < 0 ? t.length : n, 0, r);
  }
  return t;
}
const ds = ls([]), fs = us([]), Cr = "logicweaver_dock_custom_order", wi = "logicweaver_dock_position";
function bi(e) {
  return e === "bottom" || e === "left" || e === "right" || e === "top";
}
function ms() {
  try {
    if (typeof localStorage < "u") {
      const e = localStorage.getItem(wi);
      if (bi(e)) return e;
    }
  } catch {
  }
  return "bottom";
}
function ps(e) {
  try {
    typeof localStorage < "u" && localStorage.setItem(wi, e);
  } catch {
  }
}
function Pt() {
  try {
    if (typeof localStorage < "u") {
      const e = localStorage.getItem(Cr);
      if (e) return JSON.parse(e) || {};
    }
  } catch {
  }
  return {};
}
function Di(e) {
  try {
    typeof localStorage < "u" && localStorage.setItem(Cr, JSON.stringify(e));
  } catch {
  }
}
function Ir() {
  const e = fs.filter((i) => V.isInstalled(i.id)), t = Pt().tools;
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
function Er() {
  const e = ds.filter((i) => V.isInstalled(i.id)), t = Pt().cards;
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
const hs = () => ({
  mounted: !1,
  get activeTargetId() {
    return zi() || z.activeId || "";
  },
  activeTools: [],
  cards: Er(),
  tools: Ir(),
  position: ms()
}), P = N(hs());
typeof window < "u" && (window.addEventListener("logicweaver:dock-modules-changed", () => {
  P.tools = Ir(), P.cards = Er();
}), window.addEventListener("storage", (e) => {
  e.key === wi && bi(e.newValue) && (P.position = e.newValue);
}));
Mt.onStateChange((e) => {
  P.activeTools = [...e];
});
let ne = {};
function gt(e, t) {
  const i = window.chrome, r = i?.runtime?.getURL ? i.runtime.getURL(t) : t, n = e.includes("newtab") || t.includes("newtab");
  if (window.location.href.includes(e) || n && (window.location.pathname.endsWith("/newtab.html") || window.location.pathname === "/newtab.html"))
    return;
  const s = (c) => {
    const d = (c.url || c.pendingUrl || "").toLowerCase();
    return n ? d.includes("newtab.html") || d.startsWith("chrome://newtab") || d.startsWith("edge://newtab") || d.startsWith("chrome-search://local-ntp") || d.includes("chrome-extension://") && d.includes("newtab") || !!(c.title && (c.title.includes("LogicWeaver 新标签页") || c.title === "新标签页" || c.title === "New Tab")) : d.includes(e.toLowerCase());
  };
  if (i?.tabs?.query) {
    i.tabs.query({ currentWindow: !0 }, (c) => {
      const a = c.find(s);
      if (a && a.id != null) {
        if (i.tabs.update(a.id, { active: !0 }), a.windowId != null && i.windows?.update)
          try {
            i.windows.update(a.windowId, { focused: !0 });
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
const Co = {
  getSnapshot() {
    return Rt(P);
  },
  update(e) {
    const { activeTargetId: t, ...i } = e;
    Object.assign(P, i);
  },
  setMounted(e) {
    P.mounted = e;
  },
  setActiveTools(e) {
    P.activeTools = [...e];
  },
  addActiveTool(e) {
    P.activeTools.includes(e) || P.activeTools.push(e);
  },
  removeActiveTool(e) {
    const t = P.activeTools.indexOf(e);
    t >= 0 && P.activeTools.splice(t, 1);
  },
  triggerItem(e, t) {
    const i = typeof window < "u" ? window.location.pathname + window.location.href : "", r = i.includes("bilibili.html") || i.includes("github.html") || i.includes("aihot.html") || i.includes("youtube.html") || i.includes("pricing.html");
    if (e === "home") {
      if (r) {
        gt("newtab.html", "newtab.html");
        return;
      }
      if (ne.onHomeClick) {
        ne.onHomeClick();
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
        o ? gt(o, o) : gt("newtab.html", "newtab.html");
        return;
      }
      if (ne.onTargetClick) {
        ne.onTargetClick(t);
        return;
      }
      const s = window;
      P.activeTargetId === t ? typeof s.exitFullscreenCard == "function" && s.exitFullscreenCard() : typeof s.enterFullscreenCard == "function" && s.enterFullscreenCard(t);
      return;
    }
    if (e === "tool") {
      const n = !!document.getElementById("vue-bili-companions-root");
      if (r && !n) {
        gt("newtab.html", "newtab.html");
        return;
      }
      if (!["todoist", "music", "siren", "wallpaper", "stickers", "sync", "chat"].includes(t) && typeof window < "u") {
        const o = window;
        typeof o.exitFullscreenCard == "function" && o.exitFullscreenCard();
      }
      if (ne.onToolClick) {
        ne.onToolClick(t);
        return;
      }
      Mt.toggle(t);
      return;
    }
  },
  reorderCards(e) {
    const t = new Map(P.cards.map((n) => [n.id, n])), i = [];
    for (const n of e) {
      const s = t.get(n);
      s && (i.push(s), t.delete(n));
    }
    for (const n of t.values()) i.push(n);
    P.cards = i;
    const r = Pt();
    Di({ ...r, cards: i.map((n) => n.id) });
  },
  reorderTools(e) {
    const t = new Map(P.tools.map((n) => [n.id, n])), i = [];
    for (const n of e) {
      const s = t.get(n);
      s && (i.push(s), t.delete(n));
    }
    for (const n of t.values()) i.push(n);
    P.tools = i;
    const r = Pt();
    Di({ ...r, tools: i.map((n) => n.id) });
  },
  setPosition(e) {
    bi(e) && P.position !== e && (P.position = e, ps(e), typeof window < "u" && window.dispatchEvent(new CustomEvent("logicweaver:dock-position-changed", { detail: e })));
  },
  setActions(e) {
    ne = { ...ne, ...e };
  }
}, gs = "leaf-newtab-backgrounds", ys = 1, ge = "current-background", $ = "heroBackgroundHistory", Li = 30, yt = "assets/newtab-mountains.png", Bi = 450, Yt = 180 * 1024 * 1024;
let si = [], wt = 0;
function ws(e) {
  return si.push(e), e;
}
function bs() {
  si.forEach((e) => {
    try {
      URL.revokeObjectURL(e);
    } catch {
    }
  }), si = [];
}
function vi() {
  return new Promise((e, t) => {
    if (typeof indexedDB > "u") {
      t(new Error("IndexedDB is not supported in this environment"));
      return;
    }
    const i = indexedDB.open(gs, ys);
    i.onupgradeneeded = () => {
      const r = i.result;
      r.objectStoreNames.contains("files") || r.createObjectStore("files");
    }, i.onsuccess = () => e(i.result), i.onerror = () => t(i.error);
  });
}
async function vs(e, t = ge) {
  const i = await vi();
  return new Promise((r, n) => {
    const s = i.transaction("files", "readwrite");
    s.objectStore("files").put(e, t), s.oncomplete = () => {
      i.close(), r();
    }, s.onerror = () => {
      i.close(), n(s.error);
    }, s.onabort = s.onerror;
  });
}
async function Ss() {
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
async function oi(e = "hero") {
  try {
    const t = await Ss();
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
async function Zt(e = ge) {
  try {
    const i = await vi(), r = await new Promise((n, s) => {
      const o = i.transaction("files", "readonly"), c = o.objectStore("files").get(e);
      c.onsuccess = () => n(c.result || null), o.oncomplete = () => i.close(), o.onerror = () => {
        i.close(), s(o.error);
      };
    });
    if (r) return r;
  } catch {
  }
  const t = await oi(e);
  return t || (e === ge ? oi("hero") : null);
}
async function ji(e = ge) {
  const t = await vi();
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
function de(e) {
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
function Si(e) {
  return !!(e && (/^image\//i.test(e.type || "") || /^video\//i.test(e.type || "") || /\.(png|jpe?g|webp|gif|mp4|webm)$/i.test(e.name || "")));
}
function Ai(e) {
  return String(e || "").replace(/\\/g, "/").replace(/^\.\//, "").replace(/^\/+/, "");
}
function As(e, t) {
  const i = String(t || "").trim().replace(/^['"]|['"]$/g, "");
  if (!i || /^(?:[a-z][a-z0-9+.-]*:|#|data:|blob:)/i.test(i)) return "";
  const [r] = i.split(/[?#]/);
  if (!r) return "";
  const n = i.startsWith("/") ? "" : Ai(e).split("/").slice(0, -1).join("/"), s = `${n ? n + "/" : ""}${r.replace(/^\/+/, "")}`.split("/"), o = [];
  return s.forEach((c) => {
    !c || c === "." || (c === ".." ? o.pop() : o.push(c));
  }), o.join("/").toLowerCase();
}
function ks(e, t) {
  return t.type ? t.type : /\.html?$/i.test(e) ? "text/html" : /\.css$/i.test(e) ? "text/css" : /\.m?js$/i.test(e) ? "text/javascript" : /\.png$/i.test(e) ? "image/png" : /\.jpe?g$/i.test(e) ? "image/jpeg" : /\.webp$/i.test(e) ? "image/webp" : /\.gif$/i.test(e) ? "image/gif" : /\.mp4$/i.test(e) ? "video/mp4" : /\.webm$/i.test(e) ? "video/webm" : "application/octet-stream";
}
async function Cs(e) {
  const t = [];
  let i = 0;
  async function r(n, s = "", o = 0) {
    if (!(o > 4 || t.length >= Bi || i >= Yt))
      for await (const c of n.values()) {
        if (t.length >= Bi || i >= Yt) break;
        const a = Ai(s ? `${s}/${c.name}` : c.name);
        if (c.kind === "file") {
          const d = await c.getFile();
          i += d.size || 0, i <= Yt && t.push({ path: a, file: d });
        } else c.kind === "directory" && await r(c, a, o + 1);
      }
  }
  return await r(e), t;
}
function Is(e) {
  return e.filter((t) => /(^|\/)index\.html?$/i.test(t.path) || /\.html?$/i.test(t.path)).sort((t, i) => {
    const r = (n) => /^index\.html?$/i.test(n.path) ? 0 : /(^|\/)index\.html?$/i.test(n.path) ? 1 : 2;
    return r(t) - r(i) || t.path.length - i.path.length;
  })[0] || null;
}
function ai(e, t = []) {
  return typeof e == "string" ? /\.(png|jpe?g|webp|gif|mp4|webm|html?)($|[?#])/i.test(e) && t.push(e) : Array.isArray(e) ? e.forEach((i) => ai(i, t)) : e && typeof e == "object" && Object.values(e).forEach((i) => ai(i, t)), t;
}
async function Es(e) {
  const t = new Map(e.map((r) => [Ai(r.path).toLowerCase(), r])), i = e.filter((r) => /(^|\/)project\.json$/i.test(r.path));
  for (const r of i)
    try {
      const n = JSON.parse(await r.file.text());
      for (const s of ai(n)) {
        const o = t.get(As(r.path, s));
        if (o && Si(o.file)) return o.file;
      }
    } catch {
    }
  return null;
}
function Us(e, t, i) {
  const r = i.filter((n) => !/\.(pkg|mpkg)$/i.test(n.path)).map((n) => ({ path: n.path, file: n.file, mime: ks(n.path, n.file) }));
  return { type: "web", name: e || "Web Wallpaper", entry: t.path, files: r };
}
async function _s(e) {
  const t = await Cs(e), i = Is(t);
  if (i) return Us(e.name, i, t);
  const r = await Es(t);
  return r || t.map((s) => s.file).filter(Si).sort((s, o) => {
    const c = (a) => /\.(mp4|webm)$/i.test(a.name) ? 0 : /\.gif$/i.test(a.name) ? 1 : /^preview\./i.test(a.name) ? 2 : /cover|thumb|poster/i.test(a.name) ? 3 : 4;
    return c(s) - c(o) || o.size - s.size;
  })[0] || null;
}
function Ts(e) {
  return e ? typeof e == "string" ? "自定义图片" : e.name || (e.type === "web" ? "Web Wallpaper" : "自定义背景") : "默认背景";
}
function Ps(e) {
  return typeof e == "string" ? "图片" : e?.type === "web" ? "Web Wallpaper" : e?.type === "db" ? /video/i.test(e.mediaType || "") ? "视频" : "图片/GIF" : "背景";
}
const ci = {
  async loadHistory() {
    const e = await je([$, "heroBackground"]);
    return { history: Array.isArray(e[$]) ? e[$] : [], currentValue: e.heroBackground || null };
  },
  async addHistory(e, t = null) {
    const i = `bg-${Date.now()}-${Math.random().toString(16).slice(2)}`;
    let r = e;
    e && typeof e == "object" && (r = { ...e, storageKey: i }), t && await vs(t, i);
    const n = await je([$, "heroBackground"]), s = Array.isArray(n[$]) ? n[$] : [], c = [{
      id: i,
      title: Ts(r),
      kind: Ps(r),
      createdAt: Date.now(),
      value: r
    }, ...s.filter((d) => JSON.stringify(d.value) !== JSON.stringify(r))].slice(
      0,
      Li
    ), a = s.slice(Li - 1).filter((d) => d.value?.storageKey && d.value.storageKey !== n.heroBackground?.storageKey);
    return await Promise.all(a.map((d) => ji(d.value.storageKey))), await de({ [$]: c }), r;
  },
  async deleteHistory(e) {
    const t = await je([$, "heroBackground"]), i = (t[$] || []).filter((r) => r.id !== e.id);
    e.value?.storageKey && await ji(e.value.storageKey), await de({ [$]: i }), JSON.stringify(t.heroBackground) === JSON.stringify(e.value) && await this.clearWallpaper();
  },
  async clearWallpaper() {
    const e = { type: "none" };
    await de({ heroBackground: e });
    try {
      localStorage.setItem("lw-current-wallpaper", JSON.stringify(e));
    } catch {
    }
    await this.applyWallpaper(null);
  },
  async setMountain() {
    await de({ heroBackground: yt });
    try {
      localStorage.setItem("lw-current-wallpaper", JSON.stringify(yt));
    } catch {
    }
    await this.applyWallpaper(yt);
  },
  async setWallpaper(e) {
    await de({ heroBackground: e });
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
      const n = (c) => {
        r.removeEventListener("change", s), r.removeEventListener("cancel", o), r.remove(), t(c);
      }, s = () => n(Array.from(r.files || [])), o = () => n([]);
      r.addEventListener("change", s), r.addEventListener("cancel", o), document.body.appendChild(r);
      try {
        r.click();
      } catch (c) {
        r.remove(), i(c);
      }
    });
  },
  async importBackgroundFile(e, { apply: t = !0 } = {}) {
    if (!e) return null;
    let i, r = null;
    if (e.type === "web")
      r = e, i = { type: "web", name: e.name, entry: e.entry };
    else if (Si(e))
      r = e, i = { type: "db", name: e.name, mediaType: e.type || "application/octet-stream" };
    else
      throw new Error("请选择 JPG、PNG、WebP、GIF、MP4 或 WebM 壁纸。");
    return i = await this.addHistory(i, r), t && (await de({ heroBackground: i }), await this.applyWallpaper(i)), i;
  },
  async importWallpaperDirectory() {
    const e = window;
    if (!e.showDirectoryPicker) throw new Error("当前浏览器不支持直接选择 Wallpaper 文件夹。");
    const t = await e.showDirectoryPicker(), i = await _s(t);
    if (!i) throw new Error("文件夹中没有找到可用的 Web Wallpaper、图片、GIF、MP4 或 WebM。");
    return this.importBackgroundFile(i);
  },
  async applyWallpaper(e) {
    const t = ++wt;
    if (typeof document > "u") return;
    const i = document.getElementById("launcher"), r = document.getElementById("hero-background-media");
    if (!(!i || !r) && (bs(), r.replaceChildren(), i.style.removeProperty("--launcher-image"), !!e)) {
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
        const n = await Zt(e.storageKey || ge);
        if (t !== wt) return;
        if (n?.type === "web") {
          const s = document.createElement("iframe");
          s.title = n.name || "Web Wallpaper";
          const o = typeof chrome < "u" ? chrome : null;
          s.src = o?.runtime?.getURL ? o.runtime.getURL("wallpaper-sandbox.html") : "wallpaper-sandbox.html";
          const c = setTimeout(() => {
            t === wt && s.parentNode && (console.warn("[Wallpaper] Web wallpaper timeout or failed, auto fallback to mountain"), ci.setMountain());
          }, 1500);
          s.onload = () => {
            clearTimeout(c), s.contentWindow?.postMessage(n, "*");
          }, r.appendChild(s);
        } else
          ci.setMountain();
        return;
      }
      if (e.type === "db") {
        const n = await Zt(e.storageKey || ge);
        if (t !== wt || !(n instanceof Blob)) return;
        const s = ws(URL.createObjectURL(n));
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
    const i = await Zt(e || ge);
    return t?.throwIfAborted(), i instanceof Blob ? URL.createObjectURL(i) : null;
  },
  async updateHistoryTitle(e, t) {
    const i = await je([$]), r = Array.isArray(i[$]) ? i[$] : [];
    if (!r.some((s) => s.id === e)) throw new Error("壁纸条目已变化，请刷新");
    const n = r.map((s) => s.id === e ? { ...s, title: t.trim() || s.title } : s);
    await de({ [$]: n });
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
        const t = await oi("hero");
        t && (e = {
          type: "db",
          name: t.name || "当前壁纸",
          mediaType: t.type || "application/octet-stream"
        });
      }
      e || (e = yt);
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
  t === "local" && e.heroBackground && ci.applyWallpaper(e.heroBackground.newValue);
});
typeof document < "u" && document.addEventListener("visibilitychange", () => {
  const e = document.querySelector("#hero-background-media video");
  e && (document.hidden ? e.paused || e.pause() : e.paused && e.play().catch(() => {
  }));
});
const Se = Oe(!1);
let bt = null;
const Io = {
  get isActive() {
    return Se.value;
  },
  /**
   * 进入新用户页面内空态预览沙箱（常用网站变为空无一物）
   */
  enter() {
    if (Se.value) return;
    const e = Jt.getState();
    bt = JSON.parse(JSON.stringify(e)), Jt.updateState({
      links: [],
      groupSizes: {},
      folders: {},
      pages: ["常用网站"],
      pageLabels: {},
      activePage: "常用网站"
    }), Se.value = !0, typeof window < "u" && window.dispatchEvent(new CustomEvent("tab-project:guest-preview-changed", {
      detail: { active: !0 }
    }));
  },
  /**
   * 退出新用户预览沙箱，原样恢复用户的真实数据
   */
  exit() {
    Se.value && (bt && (Jt.updateState(bt), bt = null), Se.value = !1, typeof window < "u" && window.dispatchEvent(new CustomEvent("tab-project:guest-preview-changed", {
      detail: { active: !1 }
    })));
  },
  toggle() {
    Se.value ? this.exit() : this.enter();
  }
};
function Eo(e, t) {
  if (document.getElementById(e)) return;
  const i = document.createElement("style");
  i.id = e, i.textContent = t, document.head.appendChild(i);
}
export {
  wr as $,
  Hs as A,
  co as B,
  Oi as C,
  yt as D,
  fo as E,
  b as F,
  It as G,
  Gs as H,
  R as I,
  u as J,
  ht as K,
  S as L,
  Pi as M,
  yo as N,
  uo as O,
  qe as P,
  Ei as Q,
  Ki as R,
  Hi as S,
  Vs as T,
  js as U,
  Ws as V,
  ci as W,
  Bs as X,
  Wr as Y,
  qs as Z,
  Te as _,
  Gr as a,
  Nt as a0,
  br as a1,
  is as a2,
  So as a3,
  bo as a4,
  Ao as a5,
  vo as a6,
  ui as a7,
  Je as a8,
  wn as a9,
  Re as aA,
  es as aB,
  po as aC,
  ts as aD,
  go as aE,
  Qi as aF,
  Js as aG,
  ko as aH,
  zs as aa,
  ir as ab,
  Qs as ac,
  Ys as ad,
  di as ae,
  se as af,
  ti as ag,
  Rn as ah,
  oo as ai,
  ao as aj,
  $n as ak,
  D as al,
  Zi as am,
  Zs as an,
  tt as ao,
  eo as ap,
  io as aq,
  ho as ar,
  mo as as,
  ro as at,
  no as au,
  so as av,
  to as aw,
  Xs as ax,
  Vn as ay,
  wo as az,
  $r as b,
  Q as c,
  lo as d,
  ji as e,
  m as f,
  Io as g,
  qr as h,
  Se as i,
  Ce as j,
  Ds as k,
  A as l,
  Co as m,
  Y as n,
  z as o,
  le as p,
  Fs as q,
  zr as r,
  P as s,
  F as t,
  Ls as u,
  Eo as v,
  l as w,
  Ks as x,
  kr as y,
  bi as z
};
