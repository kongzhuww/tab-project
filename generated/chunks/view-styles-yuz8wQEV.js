import { c as es, w as Cr, h as G, r as Ce, l as Qi } from "./window-manager.store-fHSi_Uh8.js";
import { r as z, s as Ue, a as Lt, w as Oe, b as be, d as ts, K as rs, B as is, x as ns, o as se, e as oe, A as qt, i as xe, t as Be, f as Ye, F as Ii, g as Ui, D as ss } from "./vendor-vue-BkY5-p5y.js";
import { b as Gt, S as os, p as as } from "./stickers.service-CLmzoD5s.js";
import { t as Kt, p as cs } from "./system-theme-V_tLotZp.js";
import { R as ls } from "./InlineEditStatus.vue_vue_type_style_index_0_scoped_c63d0c6d_lang-DEjO_zkf.js";
import { V as O } from "./search.service-DF5Rt2Wp.js";
import { _ as us } from "./_plugin-vue_export-helper-Bz4EjXjr.js";
const St = "notificationHistoryV1", Xi = 200, ds = 30 * 864e5;
function di(e) {
  if (e?.type === "todoist-task" && typeof e.taskId == "string" && /^[A-Za-z0-9_-]{1,100}$/.test(e.taskId)) return { type: e.type, taskId: e.taskId };
  if (e?.type === "module" && typeof e.moduleId == "string" && /^[a-z][a-z0-9-]{0,60}$/.test(e.moduleId)) return { type: e.type, moduleId: e.moduleId };
  if (e?.type === "bili-messages") return { type: e.type };
  if (e?.type === "bili-video") {
    if (typeof e.bvid == "string" && /^BV[A-Za-z0-9]{10}$/.test(e.bvid)) return { type: e.type, bvid: e.bvid };
    if (typeof e.aid == "string" && /^[1-9][0-9]{0,19}$/.test(e.aid)) return { type: e.type, aid: e.aid };
  }
  if (e?.type === "github-repository" && typeof e.fullName == "string" && e.fullName.length <= 240 && /^[\w.-]+\/[\w.-]+$/.test(e.fullName) && !e.fullName.split("/").some((t) => t === "." || t === "..")) return { type: e.type, fullName: e.fullName };
}
function fs(e) {
  if (typeof e == "string")
    try {
      const t = new URL(e);
      if (t.protocol !== "https:" || t.username || t.password || t.port || !["bilibili.com", "www.bilibili.com", "m.bilibili.com"].includes(t.hostname)) return;
      const r = /^\/video\/(BV[A-Za-z0-9]{10}|av[1-9][0-9]{0,19})\/?$/.exec(t.pathname);
      if (r) return r[1].startsWith("BV") ? { type: "bili-video", bvid: r[1] } : { type: "bili-video", aid: r[1].slice(2) };
    } catch {
    }
}
function Zi(e) {
  const t = /* @__PURE__ */ new Map();
  for (const r of e.matchAll(/https:\/\/[^\s<>"']+/g)) {
    const i = fs(r[0].replace(/[)）。，,;；]+$/, ""));
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
function en(e) {
  if (!e || typeof e.id != "string" || !/^[A-Za-z0-9_:-]{1,200}$/.test(e.id) || typeof e.title != "string" || !Number.isFinite(e.createdAt) || !["info", "success", "warning", "error"].includes(e.level)) throw new Error("Invalid notification record");
  let t = di(e.target);
  return e.appType === "bili" && (!t || t.type === "bili-messages") && (t = Zi([e.title, e.subtitle, e.message].filter((r) => typeof r == "string").join(" ")) || t), { id: e.id, appType: ft(e.appType, 40), appName: ft(e.appName, 60), title: ft(e.title, 160), subtitle: ft(e.subtitle, 240), message: ft(e.message, 2e3), level: e.level, createdAt: e.createdAt, read: e.read === !0, target: t };
}
function tn(e) {
  if (e == null) return { version: 0, items: [] };
  if (!e || !Number.isSafeInteger(e.version) || e.version < 0 || !Array.isArray(e.items) || e.items.length > Xi) throw new Error("Invalid notification history");
  const t = Date.now();
  return { version: e.version, items: e.items.map(en).filter((r) => r.createdAt >= t - ds && r.createdAt <= t + 6e4).sort((r, i) => i.createdAt - r.createdAt) };
}
let Mi = Promise.resolve();
function Qe(e, t) {
  const r = Mi.then(async () => {
    if (typeof chrome > "u" || !chrome.storage?.local)
      throw new Error("Chrome storage API unavailable");
    const i = await chrome.storage.local.get(St), n = tn(i[St]);
    if (e === "list")
      return n;
    if (e === "append") {
      const s = en(t);
      s.createdAt = Date.now(), s.read = !1, n.items.some((o) => o.id === s.id) || n.items.unshift(s), n.items = n.items.slice(0, Xi);
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
  return Mi = r.catch(() => {
  }), r;
}
const k = z({
  isOpen: !1,
  loading: !1,
  saving: !1,
  error: "",
  version: -1,
  items: []
}), tc = Ue(() => k.items.filter((e) => !e.read).length);
let Pi = !1;
function je(e) {
  e.version < k.version || (k.version = e.version, k.items = e.items);
}
const ps = {
  state: k,
  start() {
    Pi || (Pi = !0, typeof chrome < "u" && chrome.storage?.onChanged && chrome.storage.onChanged.addListener((e, t) => {
      if (!(t !== "local" || !e[St]))
        try {
          je(tn(e[St].newValue));
        } catch {
          k.error = "通知历史格式异常，未覆盖当前记录。";
        }
    }), this.refresh());
  },
  async refresh() {
    k.loading = !0;
    try {
      const e = await Qe("list");
      je(e), k.error = "";
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
        const t = await Qe("read", e);
        je(t), k.error = "";
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
        const e = await Qe("read-all");
        je(e), k.error = "";
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
        const t = await Qe("remove", e);
        je(t), k.error = "";
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
        const e = await Qe("clear");
        je(e), k.error = "";
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
    const t = di(e);
    if (t)
      try {
        if (t.type === "todoist-task") {
          const { openTodoistTask: r } = await import("./task-navigation-B0GzLoZR.js");
          r(t.taskId);
        } else if (t.type === "github-repository") {
          const { githubRepoDetailController: r } = await import("./search.service-DF5Rt2Wp.js").then((i) => i.a7);
          r.open(t.fullName);
        } else if (t.type === "bili-video") {
          const { biliMiniPlayerController: r } = await Promise.resolve().then(() => _o);
          await r.openVideo({ bvid: t.bvid, aid: t.aid });
        } else if (t.type === "bili-messages") {
          const { biliMessagePanelController: r } = await import("./message-panel-store-BejcpuEQ.js");
          r.openPanel();
        } else {
          const { getDockModule: r } = await import("./window-manager.store-fHSi_Uh8.js").then((n) => n.m);
          if (!r(t.moduleId)) throw new Error();
          const { windowManagerController: i } = await import("./window-manager.store-fHSi_Uh8.js").then((n) => n.n);
          i.open(t.moduleId);
        }
        this.close();
      } catch {
        k.error = "通知对应页面暂不能打开，记录已保留。";
      }
  }
};
function ms(e) {
  ps.start(), Qe("append", e).then((t) => je(t)).catch(() => {
    k.error = "有一条通知未获持久保存确认。";
  });
}
const Se = z([]), Ht = /* @__PURE__ */ new Map();
function hs(e, t) {
  return e.history !== void 0 ? e.history : e.level === "warning" || e.level === "error" || /失败|错误|异常|未确认|未获确认|未保存|无法|不可用|拒绝|超时|警告|到期|时间已到/.test(t) ? !0 : /复制成功|已复制|保存成功|已保存|设置成功|已更新设置|配置已更新|已设为|已取消|已切换/.test(t) || /^(正在|开始读取|加载中|同步中)/.test(t) ? !1 : e.appType === "chat" || e.appType === "bili" || /提醒|任务已创建|任务完成|已完成任务|任务结果|下载完成|新消息|新私信|新回复|新提及|有可用更新/.test(t);
}
const Ri = {
  chat: { name: "海狸聊天室", icon: "assets/icon-48.png", action: "查看消息" },
  bili: { name: "哔哩哔哩", icon: "assets/bilibili.svg", action: "查看消息" },
  phone: { name: "手机文件", icon: "assets/nav-traffic.svg", action: "复制文件" },
  fetch: { name: "LogicWeaver", icon: "assets/icon-48.png", action: "" }
};
function pr(e) {
  const t = Se.find((r) => r.id === e);
  !t || t.closing || (t.closing = !0, window.setTimeout(() => {
    const r = Se.findIndex((i) => i.id === e);
    r >= 0 && Se.splice(r, 1);
  }, 260));
}
function gs() {
  for (const e of Se) pr(e.id);
}
function rn(e) {
  if (!e) return null;
  const t = e.appType || "fetch", r = Ri[t] || Ri.fetch, i = String(e.title || "新消息通知"), n = String(e.subtitle || ""), s = String(e.message || ""), o = di(e.target) || (t === "bili" ? Zi(`${i} ${n} ${s}`) : void 0), a = Math.max(500, Number(e.duration) || 7e3), c = String(e.id || `${t}_${i}_${n}_${s}`).trim(), l = Date.now();
  for (const [S, y] of Ht)
    l - y > 3e4 && Ht.delete(S);
  const u = e.id ? 200 : a <= 4e3 ? 1200 : 3e3, h = Ht.get(c);
  if (h && l - h < u || Se.some((S) => S.fingerprint === c && !S.closing)) return null;
  Ht.set(c, l);
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
  if (hs(e, w)) {
    const S = e.level || (/失败|错误|异常|未确认|未获确认|无法|超时/.test(w) ? "error" : "info"), y = o || (t === "chat" ? { type: "module", moduleId: "chat" } : void 0);
    ms({ id: p, appType: t, appName: g.appName, title: i, subtitle: n, message: s, level: S, createdAt: l, read: !1, target: y });
  }
  const b = Se.filter((S) => !S.closing);
  return b.length > 5 && pr(b[0].id), Object.freeze({ id: p, close: () => pr(p) });
}
function ys(e, t, r = "", i = "assets/logo.png", n = 3200) {
  return rn({ appType: "fetch", appName: e, title: t, subtitle: r, icon: i, duration: n, showActions: !1, actionLabel: "" });
}
const rc = Lt(Se), he = Object.freeze({
  show: rn,
  fetch: ys,
  close: pr,
  clear: gs,
  get size() {
    return Se.filter((e) => !e.closing).length;
  }
}), zt = "https://monster-siren.hypergryph.com/api", Jt = "msFavoriteSongs";
class et {
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
    return et.instance || (et.instance = new et()), et.instance;
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
const D = et.getInstance(), ve = z({ visible: !1, pendingWrites: 0 }), Zr = /* @__PURE__ */ new Set();
function ic(e) {
  return Zr.add(e), () => {
    Zr.delete(e);
  };
}
function ws() {
  for (const e of Zr) e();
}
async function nc(e) {
  ve.pendingWrites++;
  try {
    return await e();
  } finally {
    ve.pendingWrites--;
  }
}
const nn = "netease_cached_playlists", sn = "netease_cached_favorites_songs", ot = /* @__PURE__ */ new Map(), at = /* @__PURE__ */ new Map();
let mr;
function Oi(e) {
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
function on() {
  clearTimeout(mr), mr = void 0;
  for (const [e, t] of at)
    try {
      const r = JSON.stringify(t);
      localStorage.getItem(e) !== r && localStorage.setItem(e, r), ot.set(e, { raw: r, value: t });
    } catch {
      ot.delete(e);
    }
  at.clear();
}
function sc(e, t) {
  at.set(e, t), mr === void 0 && (mr = setTimeout(on, 250));
}
function oc(e) {
  at.delete(e), ot.delete(e);
  try {
    localStorage.removeItem(e);
  } catch {
  }
}
typeof window < "u" && (window.addEventListener("pagehide", on), window.addEventListener("storage", (e) => {
  if (e.storageArea === localStorage)
    for (const t of [nn, sn])
      (e.key === null || e.key === t) && (ot.delete(t), at.delete(t));
}));
class bs {
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
const Xe = new bs();
function tt(e) {
  return (!Number.isFinite(e) || e < 0) && (e = 0), Math.floor(e / 60) + ":" + String(Math.floor(e % 60)).padStart(2, "0");
}
const ac = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Ccircle cx='32' cy='32' r='30' fill='%231e1e24'/%3E%3Ctext x='32' y='38' fill='%23ec4141' font-size='22' text-anchor='middle'%3E%E2%99%AC%3C/text%3E%3C/svg%3E", vs = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Cdefs%3E%3CradialGradient id='msrVinyl' cx='50%25' cy='50%25' r='50%25'%3E%3Cstop offset='0%25' stop-color='%2327272a'/%3E%3Cstop offset='70%25' stop-color='%2309090b'/%3E%3Cstop offset='100%25' stop-color='%23000000'/%3E%3C/radialGradient%3E%3C/defs%3E%3Ccircle cx='32' cy='32' r='31' fill='url(%23msrVinyl)' stroke='%233f3f46' stroke-width='1.5'/%3E%3Ccircle cx='32' cy='32' r='24' fill='none' stroke='%2327272a' stroke-width='1' stroke-dasharray='3 2'/%3E%3Ccircle cx='32' cy='32' r='18' fill='none' stroke='%2318181b' stroke-width='1'/%3E%3Ccircle cx='32' cy='32' r='11' fill='%23f59e0b' opacity='0.9'/%3E%3Ccircle cx='32' cy='32' r='4' fill='%2309090b'/%3E%3Ccircle cx='32' cy='32' r='1.5' fill='%23fafafa'/%3E%3C/svg%3E", Ss = () => ({
  mounted: !1,
  playing: !1,
  title: "点击播放",
  artist: "作者",
  coverUrl: vs,
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
}), m = z(Ss());
let W = {};
const an = {
  get authMachine() {
    return Xe;
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
    m.currentTime = e, m.duration = t, m.formattedCurrent = tt(e), m.formattedDuration = tt(t), t > 0 ? m.progressPercent = Math.min(100, Math.max(0, e / t * 100)) : m.progressPercent = 0;
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
    W.openPanel ? W.openPanel() : (an.togglePicker(!0), window.dispatchEvent(new CustomEvent("logicweaver:music-open-panel")));
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
    m.isBiliRadio = !0, m.isNetease = !1, m.playing = e.playing, m.title = e.title || "B站电台", m.artist = e.artist || e.seriesName || "哔哩哔哩", e.coverUrl && (m.coverUrl = e.coverUrl), m.currentTime = e.currentTime, m.duration = e.duration, m.formattedCurrent = tt(e.currentTime), m.formattedDuration = tt(e.duration), m.progressPercent = e.duration > 0 ? Math.min(100, Math.max(0, e.currentTime / e.duration * 100)) : 0, m.currentLyric = e.lyric || "", m.biliRadioSeriesName = e.seriesName || "";
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
    if (this.stopNeteaseQrLogin(), !!Xe.send({ type: "START_CONNECT" }))
      try {
        await O.connectWebsiteAccount();
        const e = O.getUser();
        Xe.send({ type: "CONNECT_SUCCESS", user: e }), m.neteaseQrStatus = "官网账户已连接", await this.loadNeteaseData();
      } catch (e) {
        const t = e?.message || "请先在网易云官网登录。";
        Xe.send({ type: "CONNECT_FAILURE", message: t }), m.neteaseQrStatus = t;
      }
  },
  async logoutNetease() {
    await O.logout(), Xe.send({ type: "LOGOUT" }), m.neteaseUser = null, m.neteasePlaylists = [], m.neteaseActivePlaylist = null, m.neteaseSongs = [], m.neteaseSearchResults = [];
  }
};
typeof window < "u" && (window.addEventListener("netease:account-updated", () => {
  m.neteaseUser = O.getUser(), Xe.send({ type: "SYNC_USER", user: m.neteaseUser }), m.neteasePlaylists = [], m.neteaseSongs = [], m.neteaseSearchResults = [], m.neteaseActivePlaylist = null;
}), window.addEventListener("netease:recent-updated", (e) => {
  Array.isArray(e.detail) ? m.neteaseRecentSongs = e.detail : m.neteaseRecentSongs = O.getRecentSongs();
}), D.subscribe((e) => {
  m.playing = e.playing, m.currentTime = e.currentTime, m.duration = e.duration, m.formattedCurrent = tt(e.currentTime), m.formattedDuration = tt(e.duration), e.duration > 0 ? m.progressPercent = Math.min(100, Math.max(0, e.currentTime / e.duration * 100)) : m.progressPercent = 0, m.mode = e.mode, m.isNetease = !!e.currentSong?.isNetease, m.currentLyric = e.currentLyric || "", e.currentSong && (m.title = e.currentSong.name || "点击播放", m.artist = (e.currentSong.artists || []).join(", ") || "作者", m.coverUrl = e.currentSong.coverUrl || "", m.liked = D.isLiked(e.currentSong.cid));
}));
async function cc() {
  try {
    if (m.favorites = D.getFavorites(), m.neteaseRecentSongs = O.getRecentSongs(), m.neteaseUser = O.getUser(), typeof localStorage < "u")
      try {
        const r = Oi(sn);
        if (r.length) {
          const n = r;
          Array.isArray(n) && n.length > 0 && m.neteaseSongs.length === 0 && (m.neteaseSongs = n);
        }
        const i = Oi(nn);
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
const ce = z({
  avatarUrl: "assets/bilibili.svg",
  userName: "哔哩哔哩用户",
  buttonTitle: "通知中心"
}), As = () => ({
  mounted: !1,
  visible: !1,
  x: 0,
  y: 0,
  avatarUrl: "assets/bilibili.svg",
  userName: "用户"
}), $e = z(As());
let re = {};
const _s = {
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
    if (_s.close(), re.onAction) {
      re.onAction(e);
      return;
    }
    e === "messages" && re.showInfo ? re.showInfo() : e === "refresh" && re.refresh ? re.refresh() : e === "switch" && re.switchUser ? re.switchUser() : e === "web" && re.openWeb ? re.openWeb() : window.dispatchEvent(new CustomEvent("logicweaver:profile-menu-action", { detail: { action: e } }));
  },
  setActions(e) {
    re = { ...re, ...e };
  }
}, Ni = [
  "todoist",
  "card-github",
  "daily-aihot",
  "daily-bilibili",
  "multica"
], hr = "lw_active_card";
function Es() {
  try {
    if (typeof localStorage < "u" && localStorage.removeItem(hr), typeof window < "u" && window.location?.hash) {
      const e = window.location.hash.replace(/^#/, "");
      if (Ni.includes(e))
        return e;
    }
    if (typeof sessionStorage < "u") {
      const e = sessionStorage.getItem(hr);
      if (e && Ni.includes(e))
        return e;
    }
  } catch {
  }
  return null;
}
const le = z({
  activeId: Es()
});
typeof window < "u" && Oe(
  () => le.activeId,
  (e) => {
    try {
      e ? (sessionStorage.setItem(hr, e), window.location.hash !== `#${e}` && history.replaceState(null, "", `#${e}`)) : (sessionStorage.removeItem(hr), window.location.hash && history.replaceState(null, "", window.location.pathname + window.location.search));
    } catch {
    }
  },
  { immediate: !0 }
);
let gr;
function lc(e) {
  gr = e;
}
function Tr(e) {
  if (!gr) throw new Error("Fullscreen card host not ready");
  gr.enter(e);
}
function Dt(e) {
  le.activeId === e && gr?.exit();
}
function Cs(e) {
  typeof document > "u" || (document.documentElement?.classList.remove("has-card-fullscreen"), document.body && (document.body.classList.toggle("has-card-fullscreen", !!e), document.body.dataset.page = e ? "daily" : "home"));
}
const Ts = {
  "bilibili.html": "daily-bilibili",
  "github.html": "card-github",
  "aihot.html": "daily-aihot"
};
function cn() {
  return typeof location > "u" ? null : Ts[location.pathname.split("/").pop() || ""] || null;
}
const uc = Ue(() => {
  const e = cn() || le.activeId;
  if (e) return e;
  const t = es.activeId;
  return t && Cr.isActive(t) ? t : "home";
}), ks = [
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
function Is() {
  if (!(typeof localStorage > "u"))
    for (const e of ks)
      localStorage.removeItem(e), localStorage.removeItem(`logicweaver:${e}`);
}
const Us = {
  schemaVersion: 1,
  id: "card-github",
  title: "github插件",
  icon: "assets/nav-github.svg",
  presentation: "card",
  dockBefore: "daily-aihot",
  rootId: "card-github",
  settingsKeys: ["ghUser", "ghToken", "ghAiServiceConfigV1", "ghArchifyWebhookUrl"],
  capabilities: ["workspace:fullscreen", "view:retained", "github:repositories"],
  loadView: () => import("./GitHubWorkspaceCard-aYxxLytN.js").then((e) => e.default),
  lifecycle: {
    isVisible: () => le.activeId === "card-github",
    open: () => Tr("card-github"),
    hide: () => Dt("card-github"),
    // Existing card menus do not expose Quit/Reload. Do not introduce a destructive new path
    // until settings drafts and every child editor provide an aggregate unmount guard.
    canUnmount: () => !1,
    unmountBlockedMessage: "GitHub 工作区保留原有隐藏保活设计；尚未开放独立退出/重载，以免丢失草稿。"
  }
}, Ms = {
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
  loadView: () => import("./BilibiliWorkspace-BfL2KHjD.js").then((e) => e.default),
  lifecycle: {
    isVisible: () => le.activeId === "daily-bilibili",
    open: () => Tr("daily-bilibili"),
    hide: () => Dt("daily-bilibili"),
    // Hide must not dispose shared radio/player state or interrupt folder/cache operations.
    canUnmount: () => !1,
    unmountBlockedMessage: "B站收藏保留原有隐藏保活设计；尚未开放独立退出/重载，以免打断播放、收藏或缓存操作。"
  }
}, Ps = {
  schemaVersion: 1,
  id: "daily-aihot",
  title: "ai hot插件",
  icon: "assets/nav-aihot.svg",
  presentation: "card",
  rootId: "daily-aihot",
  // Existing localStorage preferences; registration neither reads nor migrates them.
  settingsKeys: ["lw-info-feed-view", "lw-aihot-feed-cat", "lw-aihot-feed-window"],
  capabilities: ["workspace:fullscreen", "view:retained", "aihot:aggregate"],
  loadView: () => import("./AihotFeed-CTIDD3Xb.js").then((e) => e.default),
  lifecycle: {
    isVisible: () => le.activeId === "daily-aihot",
    open: () => Tr("daily-aihot"),
    hide: () => Dt("daily-aihot"),
    // Keep the original retained card. Its view owns list activity;
    // the separate article reader is not owned or closed by this module.
    canUnmount: () => !1,
    unmountBlockedMessage: "AI HOT 保留原有隐藏保活设计；尚未开放独立退出/重载。"
  }
}, Rs = {
  schemaVersion: 1,
  id: "stickers",
  title: "表情包模块",
  emoji: "😺",
  // Keep the chat picker's library management window without a standalone Dock entry.
  showInDock: !1,
  rootId: "vue-stickers-dialog-root",
  settingsKeys: os,
  capabilities: ["folder:explicit-permission", "image:explicit-save-delete", "image:local-preview", "image:clipboard"],
  loadView: () => import("./StickersDialog-B0iQJ_YS.js").then((e) => e.default),
  lifecycle: {
    isVisible: () => Gt.visible,
    open: () => {
      Gt.visible = !0;
    },
    hide: () => {
      Gt.visible = !1, as();
    },
    canUnmount: () => Gt.pendingWrites === 0,
    unmountBlockedMessage: "图片保存/删除、目录授权或偏好正在处理，暂不能退出/重载；可以先隐藏，已提交操作不会撤回。"
  }
}, Os = "neteaseApiUrl", Ns = [Os], Ls = {
  schemaVersion: 1,
  id: "music",
  title: "网易云模块",
  icon: "assets/netease.svg",
  rootId: "vue-music-workspace-root",
  settingsKeys: Ns,
  capabilities: ["catalog:read", "settings:endpoint", "account:explicit-login-logout", "playback:shared-home-controls"],
  loadView: () => import("./NeteaseWorkspaceDialog-DvXdDui9.js").then((e) => e.default),
  lifecycle: {
    isVisible: () => ve.visible,
    open: () => {
      ve.visible = !0;
    },
    hide: () => {
      ve.visible = !1, ws();
    },
    canUnmount: () => ve.pendingWrites === 0,
    unmountBlockedMessage: "节点保存、登录确认/退出或记录写入正在处理，暂不能退出/重载；可以隐藏。退出窗口不会停止首页播放。"
  }
}, Ds = Object.freeze([
  "todoistToken",
  "todoistActiveProjectIdV1"
]), xs = {
  schemaVersion: 1,
  id: "todoist",
  title: "todoist",
  icon: "assets/nav-todoist.svg",
  dockBefore: "stickers",
  rootId: "todoist",
  settingsKeys: Ds,
  capabilities: ["view:retained", "tasks:read-write", "attachments:explicit-upload", "settings:account-rules", "calendar:shared"],
  loadView: () => import("./TodoistWorkspace-C_fZ4oWX.js").then((e) => e.default),
  lifecycle: {
    isVisible: () => Kt.visible,
    open: () => {
      Kt.visible = !0;
    },
    hide: () => {
      Kt.visible = !1, cs();
    },
    canUnmount: () => Kt.pendingWrites === 0,
    unmountBlockedMessage: "任务、附件、评论或配置正在写入，暂不能退出/重载；可以隐藏。首页限时任务和独立日历不会随窗口退出停止。"
  }
}, Bs = 1, $s = 1, Ws = { text: { legacy: !0 }, image: { legacy: !1 }, music: { legacy: !0 }, bilibili: { legacy: !0 }, github: { legacy: !0 }, bili_series: { legacy: !0 }, aihot: { legacy: !0 }, youtube: { legacy: !0 }, website: { legacy: !0 }, server_invite: { legacy: !0 }, music_party: { legacy: !0 } }, js = ["image/png", "image/jpeg", "image/gif", "image/webp"], Vs = { messageBytes: 262144, imageMessageBytes: 2097152, imageBytes: 1048576, textChars: 8e3, imageMaxDimension: 8192, imageMaxPixels: 16777216 }, lt = {
  schema: Bs,
  protocol: $s,
  messageTypes: Ws,
  imageMimeTypes: js,
  limits: Vs
};
function Fs(e) {
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
const qs = lt.protocol, Me = Object.freeze({ ...lt.limits }), ei = Object.freeze(Object.keys(lt.messageTypes)), ti = Object.freeze([...lt.imageMimeTypes]), ue = (e) => !!e && typeof e == "object" && !Array.isArray(e), Fr = (e) => typeof e == "number" && Number.isSafeInteger(e) && e > 0;
function kr() {
  return { status: "unknown", reason: "请先完成当前服务器的身份同步，再发送消息。", messageTypes: [], imageMimeTypes: [], limits: { ...Me } };
}
function Yt() {
  return { ...kr(), status: "incompatible", reason: "服务端消息能力格式无效或协议版本不兼容，请服主核对前后端版本；待发内容已保留。" };
}
function Gs(e) {
  if (e === void 0 || ue(e) && !("schema" in e) && !("protocol" in e) && !("messageTypes" in e) && !("limits" in e)) {
    if (e !== void 0 && !ue(e)) return Yt();
    const n = ue(e) && e.imageMessages === 1;
    return ue(e) && e.maxImageBytes !== void 0 && !Fr(e.maxImageBytes) ? Yt() : {
      status: "legacy",
      reason: n ? "" : "此旧版服务端未声明图片能力，请服主升级；待发图片已保留。",
      messageTypes: ei.filter((s) => s === "image" ? n : lt.messageTypes[s].legacy),
      imageMimeTypes: n ? [...ti] : [],
      limits: { ...Me, imageBytes: n && ue(e) && Fr(e.maxImageBytes) ? Math.min(e.maxImageBytes, Me.imageBytes) : Me.imageBytes }
    };
  }
  if (!ue(e) || e.schema !== 1 || e.protocol !== qs || !ue(e.limits) || !Array.isArray(e.messageTypes) || e.messageTypes.length > 64 || e.messageTypes.some((n) => typeof n != "string") || !Array.isArray(e.imageMimeTypes) || e.imageMimeTypes.length > 16 || e.imageMimeTypes.some((n) => typeof n != "string")) return Yt();
  const t = { ...Me };
  for (const n of Object.keys(t)) {
    const s = e.limits[n];
    if (!Fr(s)) return Yt();
    t[n] = Math.min(t[n], s);
  }
  const r = ti.filter((n) => e.imageMimeTypes.includes(n)), i = ei.filter((n) => e.messageTypes.includes(n) && (n !== "image" || e.imageMessages === 1 && r.length > 0));
  return { status: "supported", reason: i.includes("image") ? "" : "此服务端未启用兼容的图片消息，待发图片已保留。", messageTypes: i, imageMimeTypes: r, limits: t };
}
function Ks(e, t = Me, r = ti) {
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
  if (t.type === "image" && !Ks(r, e.limits, e.imageMimeTypes)) return "图片格式或大小不符合服务端能力，请重新选择或压缩；原内容已保留。";
  if (t.type === "image") {
    const s = Fs(r);
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
const ln = Me.imageMessageBytes, un = Me.textChars, It = (e) => !!e && typeof e == "object" && !Array.isArray(e), ae = (e, t) => typeof e == "string" && e.length <= t;
function xt(e) {
  if (!ae(e, 4096)) return "";
  try {
    const t = new URL(e);
    return ["https:", "http:"].includes(t.protocol) && !t.username && !t.password ? t.href : "";
  } catch {
    return "";
  }
}
function Ir(e) {
  return typeof e != "string" ? "" : e.length <= ln && /^data:image\/(?:png|jpeg|gif|webp);base64,[A-Za-z0-9+/=\r\n]+$/i.test(e) ? e : xt(e);
}
function Ur(e) {
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
function dn(e, t) {
  if (!(!It(e) || !["bilibili", "github", "music", "aihot", "youtube", "idle"].includes(String(e.type)) || !ae(e.title, 500)))
    return { type: e.type, title: e.title, url: xt(e.url) || void 0, updatedAt: t };
}
function fn(e, t = 0) {
  if (!It(e) || t > 2) return;
  const r = /* @__PURE__ */ Object.create(null);
  for (const [i, n] of Object.entries(e).slice(0, 64))
    ["__proto__", "constructor", "prototype", "rawSong"].includes(i) || (typeof n == "string" && n.length <= (i === "imageUrl" ? ln : un) ? r[i] = /(?:cover|avatar|face|imageUrl)$/i.test(i) ? Ir(n) : /url$/i.test(i) ? xt(n) : n : typeof n == "boolean" || typeof n == "number" && Number.isFinite(n) ? r[i] = n : i === "seriesItems" && Array.isArray(n) && (r[i] = n.slice(0, 100).map((s) => fn(s, t + 1)).filter(Boolean)));
  return r;
}
function Bt(e) {
  return pn(e, Date.now());
}
function pn(e, t) {
  if (!It(e) || !It(e.sender) || !ae(e.id, 160) || !e.id || !ae(e.sender.uid, 160) || !e.sender.uid || !ae(e.sender.name, 100) || !ae(e.content, un) || ![...ei, "system"].includes(String(e.type)) || typeof e.timestamp != "number" || !Number.isFinite(e.timestamp)) return;
  const r = Ir(e.sender.avatar) || (ae(e.sender.avatar, 32) && !/[:/]/.test(e.sender.avatar) ? e.sender.avatar : "👤");
  return { id: e.id, sender: { uid: e.sender.uid, name: e.sender.name, avatar: r, activity: dn(e.sender.activity, t) }, type: e.type, content: e.content, timestamp: e.timestamp, meta: fn(e.meta) };
}
function Hs(e, t) {
  if (!It(e) || !ae(e.uid, 160) || !e.uid || !ae(e.name, 100)) return;
  const r = Ir(e.avatar) || (ae(e.avatar, 32) && !/[:/]/.test(e.avatar) ? e.avatar : "👤");
  return { uid: e.uid, name: e.name, avatar: r, activity: dn(e.activity, t) };
}
const Ut = be(""), dc = be(!1), fi = be(0);
let pt, qe = Promise.resolve();
const ge = /* @__PURE__ */ new Map();
function pi(e, t, r) {
  return JSON.stringify([e, t, r]);
}
function Mr() {
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
function Pr(e, t) {
  for (const r of t) {
    const i = Bt(r);
    if (!i || i.id === "sys-welcome") continue;
    const n = { scope: e, id: i.id, timestamp: i.timestamp, message: JSON.parse(JSON.stringify(i)) };
    ge.set(JSON.stringify([e, n.id]), n);
  }
  return fi.value = ge.size, zs();
}
function zs() {
  return qe = qe.then(async () => {
    if (!ge.size) return;
    const e = [...ge.entries()];
    try {
      const t = await Mr();
      await new Promise((r, i) => {
        const n = t.transaction("messages", "readwrite");
        n.oncomplete = () => r(), n.onabort = () => i(n.error), n.onerror = () => i(n.error);
        const s = n.objectStore("messages");
        for (const [, o] of e) s.put(o);
      });
      for (const [r, i] of e) ge.get(r) === i && ge.delete(r);
      fi.value = ge.size, Ut.value = "";
    } catch {
      Ut.value = "历史未能写入磁盘（空间不足或数据库不可用）。待存消息保留在内存，请先导出备份，勿关闭或刷新。";
    }
  }), qe;
}
async function Js(e) {
  await qe;
  const t = await Mr();
  return new Promise((r, i) => {
    const n = t.transaction("relay-cursors", "readonly"), s = n.objectStore("relay-cursors").get(e);
    n.oncomplete = () => r(Number.isSafeInteger(s.result) ? s.result : 0), n.onabort = () => i(n.error), s.onerror = () => i(s.error);
  });
}
function Ys(e, t, r) {
  const i = qe.then(async () => {
    const n = await Mr();
    await new Promise((s, o) => {
      const a = n.transaction(["messages", "relay-cursors"], "readwrite"), c = a.objectStore("messages");
      for (const h of t) c.put({ scope: e, id: h.id, timestamp: h.timestamp, message: JSON.parse(JSON.stringify(h)) });
      const l = a.objectStore("relay-cursors"), u = l.get(e);
      u.onsuccess = () => l.put(Math.max(Number(u.result) || 0, r), e), a.oncomplete = () => s(), a.onabort = () => o(a.error), a.onerror = () => o(a.error);
    });
  });
  return qe = i.catch(() => {
  }), i;
}
async function mn(e, t, r = 200) {
  await qe;
  const i = await Mr();
  return new Promise((n, s) => {
    const o = i.transaction("messages", "readonly"), a = [e, -Number.MAX_VALUE, ""], c = t ? [e, t.timestamp, t.id] : [e, Number.MAX_VALUE, "￿"], l = IDBKeyRange.bound(a, c, !1, !!t), u = o.objectStore("messages").index("timeline").openCursor(l, "prev"), h = [];
    u.onerror = () => s(u.error), o.onabort = () => s(o.error), u.onsuccess = () => {
      const p = u.result;
      if (!p || h.length >= r) {
        n(h.reverse());
        return;
      }
      const g = Bt(p.value.message);
      g && h.push(g), p.continue();
    };
  });
}
async function fc(e) {
  const t = /* @__PURE__ */ new Map();
  let r;
  for (; ; ) {
    const i = await mn(e, r, 500);
    for (const n of i) t.set(n.id, n);
    if (i.length < 500) break;
    r = i[0];
  }
  for (const i of ge.values()) i.scope === e && t.set(i.id, i.message);
  return [...t.values()].sort((i, n) => i.timestamp - n.timestamp || i.id.localeCompare(n.id));
}
function pc(e) {
  return [...ge.values()].filter((t) => t.scope === e).map((t) => t.message);
}
function yr(e) {
  const t = xt(e);
  return t && t.length <= 1e3 && !/\/noface\.(jpg|png)(?:[?#]|$)/i.test(t) ? t : "";
}
function Rr(e, t = "") {
  const r = yr(e) || yr(t);
  return r || (e && e.length <= 8 && !/[:/]/.test(e) ? e : "🦫");
}
const Or = "lw_chat_server_url", hn = "lw_chat_user_id", Nr = "lw_chat_user_name", Lr = "lw_chat_user_avatar", pe = "lw_chat_groups", gn = "lw_chat_current_group", Qs = "lw_chat_rooms", Xs = "lw_chat_friends", yn = "lw_chat_friend_requests_v1", or = "lw_chat_current_room", wn = "";
function fe(e, t) {
  try {
    if (typeof localStorage < "u") {
      const r = localStorage.getItem(e);
      if (e === Or && r && localStorage.getItem("lw_chat_server_explicit") !== "true" && (r.includes("sslip.io") || r.includes("your-domain.com")))
        return localStorage.removeItem(e), t;
      if (r !== null) return r;
    }
  } catch {
  }
  return t;
}
function B(e, t) {
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
const Zs = [
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
], eo = [
  { id: "main", name: "自习室大厅", icon: "🏠" },
  { id: "dev", name: "代码与摸鱼", icon: "💻" },
  { id: "music", name: "音乐咖啡馆", icon: "🎵" }
];
function to() {
  const e = ["摸鱼", "冲浪", "喝茶", "听歌", "看番", "敲代码", "发呆", "漫游"], t = ["海狸", "企鹅", "猫猫", "柴犬", "仓鼠", "水獭", "考拉", "熊猫"], r = e[Math.floor(Math.random() * e.length)], i = t[Math.floor(Math.random() * t.length)], n = Math.floor(1e3 + Math.random() * 9e3);
  return `${r}的${i}#${n}`;
}
function ro() {
  const e = ["🦫", "🐧", "🐱", "🐶", "🐹", "🦦", "🐨", "🐼", "🦊", "🐰"];
  return e[Math.floor(Math.random() * e.length)];
}
const bn = fe(hn, ""), mi = bn || `u_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`;
bn || B(hn, mi);
const wr = fe(Nr, ""), io = !wr || wr.includes("#"), Li = ce.userName && ce.userName !== "哔哩哔哩用户" && ce.userName !== "浏览器指纹与环境" ? ce.userName : "", vn = io && Li ? Li : wr || to();
wr || B(Nr, vn);
const rt = fe(Lr, ""), no = !rt || rt.length <= 4 || rt.startsWith("data:") || rt.includes("/noface."), Di = yr(ce.avatarUrl), Sn = no && Di ? Di : rt || ro();
rt || B(Lr, Sn);
const f = z({
  visible: !1,
  shareActivity: fe("lw_chat_share_activity", "true") !== "false",
  error: "",
  connected: !1,
  connecting: !1,
  onlineCount: 1,
  serverUrl: fe(Or, wn),
  currentGroupId: fe(gn, "hub_main"),
  currentChannelId: "general",
  groups: bt(pe, Zs),
  groupMembers: [],
  currentRoomId: fe(or, "main"),
  rooms: bt(Qs, eo),
  friends: bt(Xs, []),
  friendRequests: bt(yn, []),
  currentUser: {
    uid: mi,
    name: vn,
    avatar: Sn
  },
  messages: Mt(fe(or, "main")).length > 0 ? Mt(fe(or, "main")) : [
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
ao();
Oe(
  () => [ce.avatarUrl, ce.userName],
  ([e, t]) => {
    const r = f.currentUser.avatar;
    yr(e) && (!r || r.length <= 4 || r.startsWith("data:") || r.includes("/noface.") || /^https?:\/\/[^/]*hdslb\.com\//i.test(r)) && (f.currentUser.avatar = e, B(Lr, e)), t && t !== "哔哩哔哩用户" && t !== "浏览器指纹与环境" && (!f.currentUser.name || f.currentUser.name.includes("#") || f.currentUser.name.startsWith("摸鱼")) && (f.currentUser.name = t, B(Nr, t));
  },
  { immediate: !0 }
);
const xi = z({ scope: "", ready: !1 });
let Qt = 0;
Oe(
  () => pi(f.currentUser.uid, f.serverUrl, f.currentRoomId),
  async (e) => {
    const t = ++Qt;
    Object.assign(xi, { scope: e, ready: !1 });
    const { currentRoomId: r, serverUrl: i, currentUser: n } = f, s = Mt(r, i, n.uid);
    await Pr(e, s);
    try {
      const o = await mn(e);
      if (t !== Qt) return;
      const a = new Map(o.map((c) => [c.id, c]));
      for (const c of f.messages) c.id !== "sys-welcome" && a.set(c.id, c);
      f.messages = [...a.values()].sort((c, l) => c.timestamp - l.timestamp || c.id.localeCompare(l.id)).slice(-200);
    } catch {
      t === Qt && (Ut.value = "无法读取历史数据库，现有缓存未删除，请导出备份后检查浏览器存储。");
    } finally {
      t === Qt && (xi.ready = !0);
    }
  },
  { immediate: !0 }
);
function mc(e, t) {
  f.currentUser.name = e.trim() || f.currentUser.name, f.currentUser.avatar = t.trim() || f.currentUser.avatar, B(Nr, f.currentUser.name), B(Lr, f.currentUser.avatar);
}
function so(e, t, r) {
  return "lw_chat_history_v2_" + JSON.stringify([r, t, e]);
}
function Mt(e, t = fe(Or, wn), r = mi) {
  try {
    const i = localStorage.getItem(so(e, t, r));
    if (i) {
      const n = JSON.parse(i);
      if (Array.isArray(n)) return n.map(Bt).filter((s) => !!s).slice(-200);
    }
  } catch {
  }
  return [];
}
function oo(e, t) {
  const r = pi(f.currentUser.uid, f.serverUrl, e);
  Pr(r, t);
}
function An(e, t) {
  if (!e) return "";
  const r = new URL(Ur(e));
  return r.searchParams.set("room", t), r.href;
}
function ri(e, t = !0, r = !1) {
  if (t && Ut.value && fi.value > 0)
    return f.error = "仍有未保存消息，请先重试保存或导出备份，暂不切换房间", !1;
  try {
    e.endpoint = Ur(e.endpoint), localStorage.setItem("lw_chat_session_v1", JSON.stringify(e));
  } catch {
    return f.error = "会话保存失败或地址无效，未切换房间", !1;
  }
  const i = e.endpoint !== f.serverUrl || e.roomId !== f.currentRoomId;
  return i && t && oo(f.currentRoomId, f.messages), Object.assign(f, {
    currentGroupId: e.groupId,
    currentChannelId: e.channelId,
    currentRoomId: e.roomId,
    serverUrl: e.endpoint
  }), i && (f.messages = Mt(e.roomId, e.endpoint, f.currentUser.uid), f.userActivities = {}, f.unreadCount = 0, r || (f.connected = !1, f.connecting = !1), f.onlineCount = 0), B(Or, e.endpoint), B(or, e.roomId), B(gn, e.groupId), !0;
}
function $t(e, t = "local", r = !1) {
  let i, n = t;
  try {
    if (i = Ur(e), i) {
      const a = new URL(i);
      if (n = a.searchParams.get("room") || "default", !n || n.length > 160) throw new Error();
      a.searchParams.set("room", n), i = a.href;
    }
  } catch {
    return f.error = "房间地址无效，未切换会话", !1;
  }
  for (const a of f.groups)
    for (const c of a.channels)
      if ((c.endpoint ?? An(a.endpoint ?? "", `${a.id}__${c.id}`)) === i && (i || c.id === n))
        return ri({ groupId: a.id, channelId: c.id, roomId: n, endpoint: i }, !0, r);
  const s = "joined_" + crypto.randomUUID(), o = {
    id: s,
    name: i ? "受邀房间" : "本地房间",
    icon: "💬",
    endpoint: i,
    isCustom: !0,
    channels: [{ id: n, name: n, icon: "💬", endpoint: i }]
  };
  return f.groups.push(o), ri({ groupId: s, channelId: n, roomId: n, endpoint: i }, !0, r) ? (B(pe, JSON.stringify(f.groups)), !0) : (f.groups.pop(), !1);
}
function ao() {
  for (const t of f.groups) t.endpoint ??= f.serverUrl;
  const e = bt("lw_chat_session_v1", null);
  if (e && typeof e.endpoint == "string" && typeof e.roomId == "string") {
    const t = f.groups.find((i) => i.id === e.groupId), r = t?.channels.find((i) => i.id === e.channelId);
    if (t && r)
      try {
        const i = Ur(e.endpoint), n = i ? new URL(i).searchParams.get("room") || "default" : e.roomId;
        r.endpoint = i, Object.assign(f, {
          currentGroupId: t.id,
          currentChannelId: r.id,
          currentRoomId: n,
          serverUrl: i,
          messages: Mt(n, i, f.currentUser.uid)
        }), B(pe, JSON.stringify(f.groups));
        return;
      } catch {
      }
  }
  $t(f.serverUrl, f.currentRoomId), B(pe, JSON.stringify(f.groups));
}
function hc(e) {
  f.friendRequests = f.friendRequests.filter((t) => t.id !== e), B(yn, JSON.stringify(f.friendRequests));
}
function Dr(e, t) {
  const r = f.groups.find((o) => o.id === e), i = r?.channels.find((o) => o.id === t) || r?.channels[0];
  if (!r || !i) return !1;
  const n = i.endpoint !== void 0 ? i.endpoint ? new URL(i.endpoint).searchParams.get("room") || "default" : i.id : `${r.id}__${i.id}`, s = i.endpoint ?? An(r.endpoint ?? "", n);
  return ri({ groupId: r.id, channelId: i.id, roomId: n, endpoint: s });
}
function gc(e, t = "👥") {
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
  return f.groups.push(n), B(pe, JSON.stringify(f.groups)), Dr(i, "general"), n;
}
function yc(e) {
  if (f.groups.length <= 1) return;
  const t = f.groups.filter((r) => r.id !== e);
  if (f.currentGroupId === e) {
    const r = t[0];
    if (!r || !Dr(r.id, r.channels[0]?.id || "general")) return;
  }
  f.groups = t, B(pe, JSON.stringify(f.groups));
}
function wc(e, t = "💬") {
  const r = f.groups.find((n) => n.id === f.currentGroupId);
  if (!r) return;
  const i = "ch_" + Math.random().toString(36).slice(2, 6);
  r.channels.push({ id: i, name: e.trim() || "新频道", icon: t }), B(pe, JSON.stringify(f.groups)), Dr(r.id, i);
}
function bc(e, t, r) {
  const i = f.groups.find((n) => n.id === e);
  i && (i.name = t.trim() || i.name, r && (i.icon = r), B(pe, JSON.stringify(f.groups)));
}
function vc(e, t, r, i) {
  const n = f.groups.find((o) => o.id === e);
  if (!n) return;
  const s = n.channels.find((o) => o.id === t);
  s && (s.name = r.trim() || s.name, i && (s.icon = i), B(pe, JSON.stringify(f.groups)));
}
function Sc(e, t) {
  const r = f.groups.find((n) => n.id === e);
  if (!r || r.channels.length <= 1) return;
  const i = r.channels.filter((n) => n.id !== t);
  f.currentGroupId === e && f.currentChannelId === t && (!i[0] || !Dr(e, i[0].id)) || (r.channels = i, B(pe, JSON.stringify(f.groups)));
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
const hi = "lw_private_chat_v1", v = z({ room: null, diagnostic: "" });
function gi() {
  let e = null, t = "";
  try {
    const r = localStorage.getItem(hi);
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
gi();
window.addEventListener("storage", (e) => {
  (e.key === hi || e.key === null) && gi();
});
window.addEventListener("focus", gi);
const co = Ue(() => !!v.room);
function _n(e) {
  return e.origin.replace(/^http:/, "ws:").replace(/^https:/, "wss:") + "/ws?room=" + encodeURIComponent(e.room);
}
function lo(e) {
  const t = Wt(e);
  localStorage.setItem(hi, JSON.stringify(t)), v.diagnostic = "", v.room = t;
}
const yi = be(0), Z = be(""), wi = /* @__PURE__ */ new Map();
let qr;
function ut() {
  return qr ||= new Promise((e, t) => {
    const r = indexedDB.open("lw-chat-delivery", 1);
    r.onupgradeneeded = () => {
      r.result.createObjectStore("deliveries", { keyPath: ["scope", "id", "uid"] }).createIndex("scope", "scope");
    }, r.onsuccess = () => {
      r.result.onversionchange = () => {
        r.result.close(), qr = void 0;
      }, e(r.result);
    }, r.onerror = () => t(r.error), r.onblocked = () => {
      Z.value = "发送队列被旧窗口阻塞，请关闭旧窗口后重试。";
    };
  }).catch((e) => {
    throw qr = void 0, e;
  });
}
async function uo(e) {
  const t = await ut();
  return new Promise((r, i) => {
    const n = t.transaction("deliveries", "readonly"), s = n.objectStore("deliveries").index("scope").getAll(e);
    n.oncomplete = () => r(s.result), n.onabort = () => i(n.error), s.onerror = () => i(s.error);
  });
}
let Bi = Promise.resolve();
function jt(e) {
  const t = Bi.then(e);
  return Bi = t.catch(() => {
  }), t;
}
async function dt(e) {
  try {
    const t = /* @__PURE__ */ new Map();
    for (const r of await uo(e)) {
      const i = t.get(r.id) || [];
      i.push(r), t.set(r.id, i);
    }
    wi.set(e, t), yi.value++;
  } catch {
    Z.value = "无法读取发送确认记录，请检查浏览器存储。";
  }
}
function fo(e, t) {
  yi.value;
  const r = wi.get(e)?.get(t) || [];
  if (!r.length) return "none";
  const i = r.filter((n) => !n.received);
  return i.length ? i.some((n) => n.failure === "rejected" || n.failure === "paused" || n.attempts >= 5 && (n.failure === "unconfirmed" || Date.now() - n.lastAttempt > 15e3)) ? "failed" : "sending" : "stored";
}
function Ac(e, t) {
  yi.value;
  const r = wi.get(e)?.get(t) || [];
  if (!r.length) return "无送达确认";
  const i = r.filter((s) => s.received).length;
  return i === r.length ? r.every((s) => s.uid === "private-relay-server") ? "服务器已保存（不代表对方已读）" : `对方已接收 ${i}/${r.length}（非已读）` : r.filter((s) => !s.received).some((s) => s.failure === "rejected") ? "服务器拒绝此次发送，可在消息详情中重试；不代表此前尝试一定未保存" : fo(e, t) === "failed" ? "尚未获得保存确认，自动补发已暂停；不代表一定未送达，可在消息详情中重试" : "正在发送／等待保存确认，将按原目标房间补发；请勿重复发送";
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
async function _c(e, t) {
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
    Z.value = "暂停补发未能保存，请检查存储；已发出的消息无法撤回。";
  }
}
async function po(e, t, r) {
  return Cn(e, [t], r);
}
async function Cn(e, t, r) {
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
async function $i(e, t, r, i = !1, n, s = !1) {
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
async function mo(e, t, r, i, n = 4, s = () => !0) {
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
function Te(e, t) {
  const r = new AbortController(), i = () => r.abort(e?.reason);
  e?.aborted ? i() : e?.addEventListener("abort", i, { once: !0 });
  const n = setTimeout(() => r.abort(new DOMException("视频加载超时，请手动重试", "TimeoutError")), t);
  return { signal: r.signal, dispose() {
    clearTimeout(n), e?.removeEventListener("abort", i), r.abort();
  } };
}
class ho {
  start() {
    return this.cancel(), this.controller = new AbortController(), this.controller.signal;
  }
  cancel() {
    this.controller?.abort();
  }
}
function Gr(e) {
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
function Tn(e) {
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
    let b = c, S = l, y = u, E = h;
    for (let T = 0; T < 64; T++) {
      let J, L;
      T < 16 ? (J = S & y | ~S & E, L = T) : T < 32 ? (J = E & S | ~E & y, L = (5 * T + 1) % 16) : T < 48 ? (J = S ^ y ^ E, L = (3 * T + 5) % 16) : (J = y ^ (S | ~E), L = 7 * T % 16);
      const j = J + b + i[T] + w[L] >>> 0;
      b = E, E = y, y = S, S = S + t(j, r[T]) >>> 0;
    }
    c = c + b >>> 0, l = l + S >>> 0, u = u + y >>> 0, h = h + E >>> 0;
  }
  function p(g) {
    let w = "";
    for (let b = 0; b < 4; b++) w += (g >>> b * 8 & 255).toString(16).padStart(2, "0");
    return w;
  }
  return p(c) + p(l) + p(u) + p(h);
}
const kn = [
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
function ar(e, t, r) {
  const i = kn.map((l) => (t + r)[l]).join("").slice(0, 32), n = Math.round(Date.now() / 1e3), s = { ...e, wts: n }, a = Object.keys(s).sort().map((l) => encodeURIComponent(l) + "=" + encodeURIComponent(String(s[l]).replace(/[!'()*]/g, ""))).join("&"), c = Tn(a + i);
  return {
    signedQuery: `${a}&w_rid=${c}`,
    w_rid: c,
    wts: n
  };
}
function In(e) {
  const t = e.replace(/^\uFEFF/, "").split(/\r?\n/), r = [];
  let i = [];
  const n = () => {
    const s = i.filter((o) => !/^\d+$/.test(o) && !o.includes("-->") && !/^(WEBVTT|Kind:|Language:)/i.test(o)).join(`\r
`).trim();
    s && r.push(s), i = [];
  };
  for (const s of t) {
    const o = s.trim();
    o === "" ? n() : i.push(o);
  }
  return n(), r.join(`\r
`);
}
function go(e, t = "") {
  if ((t || "").split(".").pop()?.toLowerCase() === "json" || /^\s*[\[{]/.test(e))
    try {
      const i = JSON.parse(e), n = i?.body || i?.data?.body || (Array.isArray(i) ? i : null);
      if (Array.isArray(n) && n.length) {
        const s = n.map((o) => o && typeof o == "object" ? o.content : String(o)).filter((o) => o && String(o).trim());
        if (s.length) return s.join(`\r
`);
      }
    } catch {
    }
  if (e.includes("[Events]")) {
    const i = e.split(/\r?\n/).filter((n) => /^Dialogue:/i.test(n));
    if (i.length) {
      const n = i.map((s) => s.split(",").slice(9).join(",").replace(/\{[^}]*\}/g, "").replace(/\\N/g, `\r
`).trim()).filter(Boolean);
      if (n.length) return n.join(`\r
`);
    }
  }
  return In(e);
}
function ii(e) {
  const t = Number(e);
  return t >= 120 ? "4K" : t === 116 ? "1080P60" : t === 112 ? "1080P+" : t === 80 ? "1080P" : t === 74 ? "720P60" : t === 64 ? "720P" : t === 32 ? "480P" : t === 16 ? "360P" : t > 0 ? `${t}P` : "清晰度";
}
function yo(e, t = "") {
  if (t && typeof t == "string" && t.trim()) return t.trim();
  const r = Number(e);
  return r >= 120 ? "超清 4K" : r === 116 ? "高清 1080P 60帧" : r === 112 ? "高清 1080P+ 高码率" : r === 80 ? "高清 1080P" : r === 74 ? "高码率 720P 60帧" : r === 64 ? "高清 720P" : r === 32 ? "清晰 480P" : r === 16 ? "流畅 360P" : `${r}P`;
}
class Pe {
  constructor() {
  }
  static getInstance() {
    return Pe.instance || (Pe.instance = new Pe()), Pe.instance;
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
class Ve {
  constructor() {
    this.currentUser = null, this.writeQueue = Promise.resolve(), this.lastWriteTime = 0, this.wbiKeysCache = null, this.treeManager = Pe.getInstance();
  }
  static getInstance() {
    return Ve.instance || (Ve.instance = new Ve()), Ve.instance;
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
  async getVideoView(t, r) {
    return this.api(`https://api.bilibili.com/x/web-interface/view?bvid=${encodeURIComponent(t)}`, { signal: r });
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
    const s = Te(n, 18e3), o = s.signal, a = async (l) => {
      o.throwIfAborted();
      const u = Te(o, 5e3);
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
            for (const E of y.backup_url)
              E && S.push(String(E));
        return Array.from(new Set(S.filter(Boolean).map((y) => y.replace(/^http:/, "https:")))).filter((y) => {
          try {
            const E = new URL(y);
            return E.protocol === "https:" && !E.username && !E.password;
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
            const b = Te(o, 5e3);
            let S;
            try {
              S = await this.getWbiKeys(b.signal);
            } finally {
              b.dispose();
            }
            const { ik: y, sk: E } = S, T = { cid: r, qn: w, fnval: 1, fourk: 0 };
            t && (T.bvid = t);
            const { signedQuery: J } = ar(T, y, E), L = await a(
              `https://api.bilibili.com/x/player/wbi/playurl?${J}`
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
    const n = Te(i, 18e3), s = n.signal, o = async (l) => {
      s.throwIfAborted();
      const u = Te(s, 5e3);
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
        const u = Te(s, 5e3);
        let h;
        try {
          h = await this.getWbiKeys(u.signal);
        } finally {
          u.dispose();
        }
        const { ik: p, sk: g } = h, w = { cid: r, qn: 16, fnval: 16, fourk: 0 };
        t && (w.bvid = t);
        const { signedQuery: b } = ar(w, p, g), S = await o(`https://api.bilibili.com/x/player/wbi/playurl?${b}`), y = c(S);
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
    const n = String(t.bvid || "").trim(), s = String(t.aid || "").trim(), o = n.startsWith("BV") ? n : "", a = s.replace(/^av/i, "") || (n.startsWith("BV") ? "" : n.replace(/^av/i, "")), c = o ? `bvid=${encodeURIComponent(o)}` : `aid=${encodeURIComponent(a)}`, l = Te(i, 2e4), u = l.signal;
    try {
      u.throwIfAborted();
      const h = t.cid && o && r === 1 ? this.fetchPlayStream(o, t.cid, Number(t.preferredQuality || 64), u).then((P) => ({ value: P, error: null }), (P) => ({ value: null, error: P })) : null;
      let p = null;
      try {
        const P = Te(u, 6e3);
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
      })), y = S.findIndex((P) => P.page === r), E = y >= 0 ? S[y] : S[0] || null, T = E?.cid || p?.cid || t.cid;
      if (!T)
        throw new Error("无法获取视频 CID 标识");
      const J = Number(t.preferredQuality || 64), L = h && String(T) === String(t.cid) ? await h : null;
      u.throwIfAborted();
      const j = L && String(T) === String(t.cid) ? L.value || (() => {
        throw L.error;
      })() : await this.fetchPlayStream(w, T, J, u);
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
        currentPage: E?.page || 1,
        partTitle: E?.part || ""
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
    const s = Array.isArray(n?.pages) ? n.pages : [], o = r ? s.find((_) => _.cid === r) : null, a = r || n.cid, c = o?.part ? ` · P${o.page} ${o.part}` : "", { ik: l, sk: u } = await this.getWbiKeys(i);
    i?.throwIfAborted();
    const { signedQuery: h } = ar({ bvid: t, cid: a }, l, u), p = await this.api(`https://api.bilibili.com/x/player/wbi/v2?${h}`, { signal: i });
    if (i?.throwIfAborted(), i && !Array.isArray(p?.subtitle?.subtitles)) throw new Error("字幕轨道返回异常或当前账号无权读取");
    const g = p?.subtitle?.subtitles || [];
    if (!g.length)
      return { ok: !1, reason: `该视频${c ? "（" + c.trim() + "）" : ""}没有可用字幕`, cues: [] };
    const w = g.find((_) => /zh|中文|汉语|漢語/i.test((_.lan || "") + " " + (_.lan_doc || ""))) || g[0], b = w.subtitle_url || "", S = b.startsWith("//") ? `https:${b}` : b.startsWith("http") ? b : `https://${b}`, y = await fetch(S, { signal: i, credentials: "include", headers: { Accept: "application/json" } });
    if (!y.ok) throw new Error(`字幕获取失败: ${y.status}`);
    const E = await y.arrayBuffer();
    i?.throwIfAborted();
    let T;
    try {
      T = JSON.parse(new TextDecoder("utf-8", { fatal: !0 }).decode(E));
    } catch {
      try {
        T = JSON.parse(new TextDecoder("gb18030").decode(E));
      } catch {
        T = JSON.parse(new TextDecoder("big5").decode(E));
      }
    }
    if (i && !Array.isArray(T?.body)) throw new Error("字幕正文格式异常");
    const L = (T?.body || []).map((_, me) => ({
      id: `${_.from || 0}_${me}`,
      from: Number(_.from || 0),
      to: Number(_.to || _.from || 0),
      content: String(_.content || "").trim()
    })).filter((_) => _.content), j = (n.title || t) + c, P = [];
    if (P.push("标题：" + j), P.push("字幕轨道：" + g.map((_) => _.lan_doc || _.lan || "未知").join(" / ") + "（已选：" + (w.lan_doc || w.lan || "默认") + "）"), n.owner?.name && P.push("UP主：" + n.owner.name), n.pubdate) {
      const _ = new Date(n.pubdate * 1e3);
      P.push(`发布时间：${_.getFullYear()}-${String(_.getMonth() + 1).padStart(2, "0")}-${String(_.getDate()).padStart(2, "0")}`);
    }
    P.push("链接：https://www.bilibili.com/video/" + t + (o?.page ? `?p=${o.page}` : ""));
    const C = L.map((_) => _.content).join(`\r
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
        for (const [y, E] of Object.entries(g.content.emote)) {
          const T = E?.url;
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
        pictures: Gr(y.content?.pictures)
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
        pictures: Gr(g.content?.pictures),
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
          pictures: Gr(u.content?.pictures),
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
        const h = (c.getAttribute("p") || "").split(","), p = parseFloat(h[0]) || 0, g = parseInt(h[1], 10) || 1, w = parseInt(h[2], 10) || 25, S = `#${(parseInt(h[3], 10) || 16777215).toString(16).padStart(6, "0")}`, y = parseInt(h[4], 10) || 0, E = parseInt(h[5], 10) || 0, T = h[6] || "", J = h[7] || String(l), L = c.textContent?.trim() || "";
        if (L) {
          const j = Math.floor(p / 60), P = Math.floor(p % 60), C = `${String(j).padStart(2, "0")}:${String(P).padStart(2, "0")}`;
          a.push({
            id: J,
            time: p,
            timeStr: C,
            mode: g,
            size: w,
            color: S,
            timestamp: y,
            pool: E,
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
const Q = Ve.getInstance(), wo = Pe.getInstance(), Ec = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  BilibiliFavoritesTreeManager: Pe,
  BilibiliService: Ve,
  WBI_MIXIN_TAB: kn,
  biliMd5: Tn,
  bilibiliFavoritesManager: wo,
  bilibiliService: Q,
  calculateWbiSign: ar,
  extractSubtitlesFromText: go,
  getBiliQualityFullLabel: yo,
  getBiliQualityShortLabel: ii,
  parseSrtToPlainText: In
}, Symbol.toStringTag, { value: "Module" })), bo = {
  phase: "closed",
  isCollapsed: !1,
  openDrawers: /* @__PURE__ */ new Set(),
  qualityMenuOpen: !1,
  speedMenuOpen: !1,
  error: ""
};
class Un {
  constructor() {
    this._state = { ...bo }, this._listeners = /* @__PURE__ */ new Set(), typeof window < "u" && (window.__TAB_MACHINES__ = window.__TAB_MACHINES__ || {}, window.__TAB_MACHINES__.biliMiniPlayer = this);
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
const Xt = new ho(), vo = {
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
}, d = z({ ...vo }), M = new Un();
M.subscribe((e) => {
  d.isOpen = e.phase !== "closed", d.isLoading = e.phase === "loading", d.isPlaying = e.phase === "playing", d.errorMsg = e.error, d.collapsed = e.isCollapsed, d.episodesOpen = e.openDrawers.has("episodes"), d.descOpen = e.openDrawers.has("desc"), d.commentsOpen = e.openDrawers.has("comments"), d.qualityMenuOpen = e.qualityMenuOpen, d.speedMenuOpen = e.speedMenuOpen;
});
let So = 1e4;
function Y(e, t = !1) {
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
function Wi() {
  At && URL.revokeObjectURL(At), At = "";
}
const Ao = {
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
    d.zIndex = ++So;
  },
  /**
   * 打开并播放指定视频
   */
  async openVideo(e) {
    const t = e.bvid || "", r = e.aid ? String(e.aid) : "";
    if (!t && !r) {
      Y("无法播放：缺少视频标识 (BV/AV号)", !0);
      return;
    }
    this.bringToFront();
    const i = !!t && d.bvid === t || !!r && d.aid === r;
    if (d.isOpen && i && !e.cachedSourceUrl && (d.videoSrc || d.iframeSrc) && !d.errorMsg) {
      M.send({ type: "TOGGLE_COLLAPSE", collapsed: !1 });
      return;
    }
    const n = Xt.start();
    if (Wi(), M.send({ type: "OPEN_START" }), d.bvid = t, d.aid = r, d.cid = e.cid || "", d.title = e.title || t || "加载中…", d.cover = e.cover || "", d.author = e.author || "", d.authorMid = e.mid ? String(e.mid) : "", d.authorFace = e.authorFace || "", d.videoSrc = "", d.sourceUrls = [], d.iframeSrc = "", d.useIframe = !1, d.currentTime = 0, d.pages = [], d.currentPageIndex = 0, d.comments = [], d.commentsPage = 1, d.hasMoreComments = !1, d.totalComments = 0, d.danmakuList = [], d.danmakuLoading = !1, typeof window < "u" && (d.x = Math.max(20, Math.floor((window.innerWidth - 380) / 2)), d.y = Math.max(60, Math.min(100, Math.floor((window.innerHeight - 254) / 3)))), e.cachedSourceUrl) {
      At = e.cachedSourceUrl, d.videoSrc = At, M.send({ type: "STREAM_RESOLVED", isPlaying: !0 });
      return;
    }
    try {
      const s = await Q.resolvePlayStream({
        bvid: t,
        aid: r,
        cid: e.cid,
        title: e.title,
        cover: e.cover,
        preferredQuality: d.currentQuality
      }, 1, n);
      if (n.throwIfAborted(), d.title = s.title || e.title || t, d.cover = s.poster || e.cover || "", d.author = s.owner || e.author || "UP主", d.authorFace = s.ownerFace || e.authorFace || "", s.ownerMid && (d.authorMid = String(s.ownerMid)), d.aid = s.aid ? String(s.aid) : r, d.bvid = s.bvid || t, d.cid = s.cid || "", d.description = s.desc || "", d.pubdate = s.pubdate ? new Date(s.pubdate * 1e3).toLocaleString() : "", d.pages = s.pages || [], d.currentPageIndex = Math.max(0, s.currentPage - 1), s.acceptQuality?.length && (d.qualities = s.acceptQuality.map((o, a) => ({
        qn: o,
        desc: s.acceptDescription?.[a] || ii(o)
      }))), d.currentQuality = s.currentQuality || 64, s.sources && s.sources.length)
        d.sourceUrls = s.sources, d.videoSrc = s.sources[0], M.send({ type: "STREAM_RESOLVED", isPlaying: !0 }), d.danmakuEnabled && this.loadDanmaku();
      else
        throw new Error("未能获取到直链源");
    } catch (s) {
      if (n.aborted) return;
      const o = s?.message || "未能获取到视频播放流";
      M.send({ type: "ERROR", message: o }), Y(`视频加载未完成：${o}`, !0);
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
      Y("当前视频未获取到原生流，保持内嵌模式");
      return;
    }
    d.useIframe = !d.useIframe, d.useIframe && !d.iframeSrc && (d.iframeSrc = `https://player.bilibili.com/player.html?bvid=${encodeURIComponent(d.bvid)}&autoplay=1&danmaku=0&high_quality=1`), Y(d.useIframe ? "已切换至官方嵌入播放模式" : "已切换至原生播放模式");
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
      const i = await Q.fetchPlayStream(
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
      M.send({ type: "ERROR", message: n }), Y(`分P切换失败：${n}`, !0);
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
      const i = await Q.fetchPlayStream(
        d.bvid,
        d.cid,
        e,
        r
      );
      r.throwIfAborted(), i.sources?.length && (d.sourceUrls = i.sources, d.videoSrc = i.sources[0], d.currentQuality = i.quality, d.currentTime = t, M.send({ type: "STREAM_RESOLVED", isPlaying: !0 }), Y(`已切换清晰度为 ${ii(e)}`));
    } catch (i) {
      if (r.aborted) return;
      Y(`清晰度切换失败：${i?.message || "网络异常"}`, !0);
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
    Xt.cancel(), Wi(), d.sourceUrls = [], d.videoSrc = "", M.send({ type: "CLOSE" });
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
    d.danmakuEnabled = t, Y(t ? "已开启弹幕" : "已关闭弹幕"), t && (!d.danmakuList.length || d.danmakuLoading) && this.loadDanmaku();
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
          const i = await Q.getVideoView(d.bvid);
          i?.cid && (t = i.cid, d.cid = t);
        }
        if (!t) {
          d.danmakuLoading = !1, Y("未能获取到当前视频的 cid，暂无法拉取弹幕", !0);
          return;
        }
        const r = await Q.getVideoDanmaku(t);
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
`)), Y("已复制视频简介到剪贴板");
    } catch {
      Y("复制简介失败", !0);
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
        const n = await Q.getVideoView(d.bvid);
        n?.aid && (t = String(n.aid), d.aid = t);
      }
      if (!t) {
        d.commentsLoading = !1;
        return;
      }
      const r = await Q.getVideoComments(
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
      Y(`评论加载失败：${t?.message || "网络异常"}`, !0);
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
          const a = await Q.getVideoView(d.bvid);
          a?.aid && (r = String(a.aid), d.aid = r);
        }
        if (!r) {
          t.subRepliesLoading = !1;
          return;
        }
        const i = await Q.getSubReplies(r, e, t.subRepliesPage, 10), n = (i.replies || []).map((a) => ({
          id: String(a.rpid),
          userName: a.uname,
          message: a.message,
          pictures: a.pictures || [],
          emotes: a.emotes
        })), s = new Set((t.replies || []).map((a) => String(a.id))), o = n.filter((a) => !s.has(String(a.id)));
        t.replies = [...t.replies || [], ...o], t.subRepliesHasMore = i.hasMore;
      } catch (r) {
        Y(`子回复加载失败：${r?.message || "网络异常"}`, !0);
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
}, _o = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  MiniPlayerMachine: Un,
  biliMiniPlayerController: Ao,
  biliMiniPlayerState: d,
  miniPlayerMachine: M
}, Symbol.toStringTag, { value: "Module" }));
function Eo() {
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
  if (e === "todoist")
    return { type: "idle", title: "Todoist 待办任务清单", updatedAt: Date.now() };
}
function Co(e) {
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
function To(e, t) {
  if (f.visible) return;
  const r = t || A.channel || "main", i = A.rooms.find((o) => o.id === r), n = i?.name ? `#${i.name}` : void 0;
  let s = "assets/icon-48.png";
  if (e.sender?.avatar && /^https?:\/\//i.test(e.sender.avatar)) {
    const o = Ir(e.sender.avatar);
    o && (s = o);
  }
  he.show({
    id: `chat_msg_${e.id}`,
    appType: "chat",
    appName: "海狸聊天室",
    icon: s,
    title: e.sender?.name || "新消息",
    subtitle: n,
    message: Co(e),
    duration: 6500,
    level: "info",
    history: !0,
    target: { type: "module", moduleId: "chat" },
    actionLabel: "查看消息",
    onClick: () => {
      Cr.handleToolClick("chat");
    }
  });
}
class ct extends Error {
  constructor(t) {
    super(`服务器响应 ${t}`), this.status = t, this.name = "PrivateChatHttpError";
  }
}
class Ke extends Error {
  constructor() {
    super(...arguments), this.name = "ChatCapabilityError";
  }
}
function Mn(e, t, r) {
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
class ie extends Error {
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
class ko {
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
      }, o = setTimeout(() => s(new ie("timeout")), 8e3);
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
        }, a.onerror = () => s(new ie("storage")), a.onblocked = () => {
          if (!n) {
            s(new ie("blocked"));
            try {
              this.onBlocked();
            } catch {
            }
          }
        };
      } catch {
        s(new ie("storage"));
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
    if (!Pt(r)) throw new ie("invalid");
    await this.access(t, r);
  }
  access(t, r, i) {
    const n = I(t);
    return Mn(8e3, async (s) => {
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
            w === void 0 || w === "" ? c(new ie("missing")) : Pt(w) ? a(w) : c(new ie("invalid"));
          }, l.onabort = l.onerror = h.onerror = () => {
            g(), c(new ie("storage"));
          };
        });
      } catch (o) {
        throw s.aborted ? s.reason : o instanceof ie ? o : new ie("storage");
      }
    }, i);
  }
}
class We extends Error {
  constructor() {
    super(...arguments), this.name = "PrivateChatTransportError";
  }
}
class Io {
  constructor(t) {
    this.ports = t;
  }
  async request(t) {
    let r, i;
    try {
      if (r = Object.freeze({ ...Wt(t.destination), channel: t.destination.channel }), i = new URL(t.path, r.origin), !t.path.startsWith("/api/v1/") || t.path.includes("\\") || i.origin !== r.origin || i.hash || i.username || i.password || !i.pathname.startsWith("/api/v1/")) throw new Error();
    } catch {
      throw new We("聊天室请求目标无效");
    }
    const n = Object.freeze({ ...t, destination: r, path: i.pathname, method: (t.method || "GET").toUpperCase() });
    return i.searchParams.set("room", r.room), i.searchParams.delete("channel"), r.channel && r.channel !== "main" && i.searchParams.set("channel", r.channel), Mn(n.signal ? 3e4 : 15e3, async (s) => {
      try {
        const o = await this.ports.credential(r, s);
        if (s.throwIfAborted(), !Pt(o)) throw new ie("invalid");
        this.ports.beforeSend(n);
        let a;
        try {
          a = n.body === void 0 ? void 0 : JSON.stringify(n.body);
        } catch {
          throw new We("聊天室请求内容格式无效");
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
        if (!u) throw new We("聊天室返回空响应");
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
              throw h(), new We("聊天室响应超限");
            g += w.decode(b.value, { stream: !0 });
          }
          try {
            return JSON.parse(g + w.decode());
          } catch {
            throw new We("聊天室响应格式无效");
          }
        } finally {
          s.removeEventListener("abort", h);
          try {
            u.releaseLock();
          } catch {
          }
        }
      } catch (o) {
        throw s.aborted ? s.reason : o instanceof ct || o instanceof Ke || o instanceof ie || o instanceof We ? o : new We("聊天室请求失败，请检查网络或服务配置");
      }
    }, n.signal);
  }
}
class Uo {
  constructor(t) {
    this.ports = t, this.generation = 0, this.halted = !0, this.liveGeneration = -1, this.reads = new ls();
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
const Ae = (e) => !!e && typeof e == "object" && !Array.isArray(e), Ne = (e) => typeof e == "string" && /^[A-Za-z0-9_-]{1,160}$/.test(e), _t = (e) => e == null, Rt = (e) => typeof e == "number" && Number.isFinite(e) && e >= 0;
function X() {
  throw new Error("同步页格式无效，未提交本页记录或推进游标");
}
function xr(e) {
  if (!Array.isArray(e) || e.length > 32) throw new Error("房间列表格式无效");
  return e.map((t) => {
    if (!Ae(t) || !Ne(t.id) || typeof t.name != "string" || t.name.length > 80 || typeof t.icon != "string" || t.icon.length > 8 || typeof t.description != "string" || t.description.length > 500) throw new Error("房间格式无效");
    if (t.space !== void 0 && !Ne(t.space)) throw new Error("空间格式无效");
    return { id: t.id, name: t.name, icon: t.icon, description: t.description, space: typeof t.space == "string" ? t.space : "hub_main" };
  });
}
function Br(e) {
  if (!Array.isArray(e) || e.length > 16) throw new Error("空间列表格式无效");
  return e.map((t) => {
    if (!Ae(t) || !Ne(t.id) || typeof t.name != "string" || t.name.length > 80 || typeof t.icon != "string" || t.icon.length > 8) throw new Error("空间格式无效");
    return { id: t.id, name: t.name, icon: t.icon };
  });
}
function Pn(e, t) {
  if (typeof e.name != "string" || e.name.length > 200) return;
  const r = Hs({ ...e, name: e.name.slice(0, 100) }, t);
  return r && { ...r, name: e.name };
}
function Mo(e, t) {
  return _t(e) ? [] : ((!Array.isArray(e) || e.length > 65) && X(), e.map((r) => {
    (!Ae(r) || !Ne(r.uid) || r.role !== void 0 && r.role !== "owner" && r.role !== "member") && X();
    const i = Pn(r, t);
    return i || X(), i.activity && Ae(r.activity) && Rt(r.activity.updatedAt) && (i.activity.updatedAt = r.activity.updatedAt), {
      ...i,
      role: r.role === "owner" ? "owner" : "member",
      online: typeof r.online == "boolean" ? r.online : void 0,
      lastSeen: Rt(r.lastSeen) ? r.lastSeen : void 0
    };
  }));
}
function Po(e, t, r) {
  if (!_t(e))
    return (!Array.isArray(e) || e.length > 200) && X(), e.map((i) => {
      (!Ae(i) || !Ne(i.id) || !Ne(i.toUid) || !Ae(i.from) || !Ne(i.from.uid)) && X();
      const n = Pn(i.from, r);
      return (!n || n.uid !== t && i.toUid !== t || !["pending", "accepted", "rejected"].includes(String(i.status))) && X(), i.createdAt !== void 0 && !Rt(i.createdAt) && X(), {
        id: i.id,
        from: n,
        toUid: i.toUid,
        status: i.status,
        createdAt: Rt(i.createdAt) ? i.createdAt : r,
        note: typeof i.note == "string" && i.note.length <= 200 ? i.note : void 0
      };
    });
}
function Ro(e, t, r, i) {
  (!Number.isSafeInteger(r) || r < 0 || !Rt(i) || !Ae(e) || !Ae(e.identity) || e.identity.uid !== t || e.identity.role !== "owner" && e.identity.role !== "member" || !Array.isArray(e.messages) || e.messages.length > 50) && X();
  let n = r;
  const s = [], o = [];
  for (const l of e.messages) {
    (!Ae(l) || !Number.isSafeInteger(l.seq) || l.seq <= n) && X();
    const u = pn(l.message, i);
    u || X(), s.push(u), o.push(l.seq), n = l.seq;
  }
  e.hasMore !== void 0 && typeof e.hasMore != "boolean" && X();
  const a = e.hasMore === !0;
  a && !s.length && X();
  let c;
  return _t(e.friends) || ((!Array.isArray(e.friends) || e.friends.length > 4096 || !e.friends.every(Ne)) && X(), c = [...new Set(e.friends)]), Object.freeze({
    uid: t,
    role: e.identity.role,
    messages: s,
    sequences: o,
    next: n,
    hasMore: a,
    capabilities: Gs(e.capabilities),
    rooms: _t(e.rooms) ? [{ id: "main", name: "综合讨论", icon: "💬", description: "" }] : xr(e.rooms),
    spaces: _t(e.spaces) ? [{ id: "hub_main", name: "聊天室", icon: "🏠" }] : Br(e.spaces),
    roomsSupported: Array.isArray(e.rooms),
    spacesSupported: Array.isArray(e.spaces),
    members: Mo(e.members, i),
    friends: c,
    friendRequests: Po(e.friendRequests, t, i)
  });
}
function mt(e, t, r) {
  for (const i of Object.keys(t)) {
    if (!r()) return !1;
    e[i] = t[i];
  }
  return r();
}
function Oo(e, t, r, i) {
  const { chat: n, service: s } = i, o = r.current;
  if (!o()) return !1;
  const a = r.restoring();
  for (let y = 0; y < e.messages.length; y++) {
    if (!o()) return !1;
    const E = e.messages[y];
    i.publish(E, Object.freeze({
      scope: t.scope,
      channel: t.channel,
      sequence: e.sequences[y],
      source: a ? "history" : E.sender.uid === e.uid ? "self" : "live"
    }), o);
  }
  if (!o()) return !1;
  const c = new Set(n.messages.map((y) => y.id)), l = e.messages.filter((y) => y.sender.uid !== e.uid && !y.meta?.silentPartySync && y.type !== "system" && !c.has(y.id)), u = n.visible ? [] : l.filter((y) => (t.cursor > 0 || t.now - y.timestamp < 3e4) && (y.type !== "music_party" || !a)).slice(-3), h = new Map(n.messages.map((y) => [y.id, y]));
  for (const y of e.messages) h.set(y.id, y);
  const p = Object.assign(/* @__PURE__ */ Object.create(null), n.userActivities);
  for (const y of e.members) y.activity && (p[y.uid] = y.activity);
  const g = [], w = new Set(n.friends.map((y) => y.uid)), b = new Map(e.members.map((y) => [y.uid, y]));
  for (const y of e.friends || []) {
    const E = b.get(y);
    E && !w.has(y) && (g.push({ uid: y, name: E.name, avatar: E.avatar, addedAt: t.now, status: "mutual" }), w.add(y));
  }
  if (!mt(n, {
    messages: [...h.values()].sort((y, E) => y.timestamp - E.timestamp || y.id.localeCompare(E.id)).slice(-200),
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
    n.friends.some((E) => E.uid === y.uid) || n.friends.push(y);
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
const Fe = "private-relay-server";
class No {
  constructor(t) {
    this.ports = t, this.flushing = !1;
  }
  async postAndAcknowledge(t, r, i = 12e3) {
    const n = Object.freeze({ ...t }), s = kt(this.ports.capabilities(n), r);
    if (s) throw new Ke(s);
    const o = await this.ports.post(n, r, AbortSignal.timeout(i));
    if (!o || o.stored !== !0 || o.id !== r.id) throw new Error("未收到服务器落盘确认");
    await po(this.ports.scope(n), r.id, Fe);
  }
  async recordFailure(t, r, i, n) {
    try {
      if (i instanceof Ke) {
        Z.value = i.message, await $i(this.ports.scope(t), r, Fe, !1, n, !0);
        return;
      }
      const s = i instanceof ct && i.status >= 400 && i.status < 500 && ![408, 429].includes(i.status);
      await $i(this.ports.scope(t), r, Fe, s, n);
    } catch {
      Z.value = "无法保存消息的发送状态，请检查浏览器存储。";
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
        await mo(this.ports.scope(s), [Fe], () => this.ports.active(t), (o, a, c) => {
          --n;
          const l = { ...a, sender: { ...a.sender, avatar: this.ports.avatar(a.sender.avatar) } };
          return r.push(this.postAndAcknowledge(s, l).catch((u) => this.recordFailure(s, a.id, u, c))), !0;
        }, n, (o) => !kt(this.ports.capabilities(s), o));
      }
    } catch {
      Z.value = "待发队列处理未确认，请检查本地存储；未改投其他房间。";
    } finally {
      await Promise.allSettled(r), this.flushing = !1;
    }
  }
}
const cr = [];
function Cc(e) {
  return cr.push(e), () => {
    const t = cr.indexOf(e);
    t >= 0 && cr.splice(t, 1);
  };
}
async function Tc() {
  const e = v.room;
  if (!e || e.uid !== f.currentUser.uid) throw new Error("请先在聊天室设置中加入自己的聊天室");
  const t = { ...e }, r = await te(t, "/api/v1/rooms", "GET", void 0, AbortSignal.timeout(15e3));
  if (!v.room || I(t) !== I(v.room)) throw new Error("聊天室配置已改变，请重新选择");
  const i = r.spaces ? Br(r.spaces) : [];
  return xr(r.rooms).map((n) => ({ ...t, channel: n.id, name: `${i.find((s) => s.id === n.space)?.name || "聊天室"} / ${n.name}` }));
}
async function ni(e, t) {
  const r = v.room;
  if (!r || I(r) !== I(t) || f.currentUser.uid !== t.uid) throw new Error("聊天室身份已改变，未发送，请重新选择房间");
  const i = Bt(e);
  if (!i || i.type === "system" || i.type === "image") throw new Error("分享内容无效或超出大小限制，未发送");
  const n = { ...t };
  i.sender = { ...i.sender, uid: n.uid, avatar: Rr(f.currentUser.avatar, ce.avatarUrl), name: f.currentUser.name };
  const s = kt(Vt(n), i);
  if (s) throw new Error(s);
  await Pr(Le(n), [i]), await En(Le(n), i, [Fe]), _e(n) && !f.messages.some((o) => o.id === i.id) && f.messages.push(i);
  try {
    await br.postAndAcknowledge(n, i, 15e3);
  } catch (o) {
    throw await br.recordFailure(n, i.id, o, 0), Wr(), new Error(`未收到「${n.name}」的保存确认；已保留在该房间待发队列，请勿重复发送。`);
  }
}
const A = z({
  status: "未配置私有服务器",
  role: "",
  syncing: !1,
  channel: "main",
  rooms: [],
  spaces: [],
  spacesSupported: !1,
  imageMessagesSupported: !1,
  capabilities: kr(),
  roomsSupported: !1,
  friends: [],
  members: []
});
function Vt(e) {
  return ze === I(e) && v.room && I(v.room) === I(e) && f.currentUser.uid === e.uid ? A.capabilities : kr();
}
function $r() {
  A.capabilities = kr(), A.imageMessagesSupported = !1;
}
const br = new No({
  active: _e,
  capabilities: Vt,
  scope: Le,
  avatar: (e) => Rr(e, ce.avatarUrl),
  destinations: (e) => [He(e), ...A.rooms.filter((t) => t.id !== A.channel).map((t) => ({ ...e, channel: t.id }))],
  post: (e, t, r) => te(e, "/api/v1/messages", "POST", { message: t }, r)
}), Rn = new ko(() => {
  A.status = "凭证数据库被旧标签页阻塞，请关闭旧页后重试";
}), Lo = new Io({
  credential: (e, t) => Rn.read(e, t),
  beforeSend: ({ destination: e, path: t, method: r, body: i }) => {
    if (!G.isInstalled("chat")) throw new Ke("聊天室实验组件已停用，未发起请求");
    const n = t === "/api/v1/members" || t.startsWith("/api/v1/members/"), s = r !== "GET" && ["/api/v1/spaces", "/api/v1/rooms"].some((o) => t === o || t.startsWith(o + "/"));
    if ((n || s) && (!f.connected || A.role !== "owner" || ze !== I(e) || !v.room || I(v.room) !== I(e) || f.currentUser.uid !== e.uid))
      throw new ct(403);
    if (r === "POST" && t === "/api/v1/messages") {
      const o = kt(Vt(e), i.message);
      if (o) throw new Ke(o);
    }
  }
});
function Do(e) {
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
let si = 0;
async function kc(e) {
  if (!G.isInstalled("chat")) throw new Ke("请先在商店手动启用聊天室实验组件");
  const t = Do(e);
  if (t.uid !== f.currentUser.uid) throw new Error("此邀请不属于当前 UID，请让服主为当前账号重新创建");
  const r = Wt(t), i = v.room ? I(v.room) : null;
  Ot();
  const n = si;
  if (await Rn.write(r, t.token), n !== si || f.currentUser.uid !== t.uid || i !== (v.room ? I(v.room) : null))
    throw new Error("凭据已保存，但身份或连接选择已改变，未激活旧邀请；如需加入请重新确认。");
  Ot(), lo(r), f.transportMode = "relay", $t(_n(r), t.room), De();
}
function te(e, t, r = "GET", i, n) {
  return G.isInstalled("chat") ? Lo.request({ destination: e, path: t, method: r, body: i, signal: n }) : Promise.reject(new Ke("请先在商店手动启用聊天室实验组件"));
}
async function On(e, t, r) {
  const i = v.room;
  if (!i) throw new Error("未配置私有服务器");
  return te({ ...i }, e, t, r, AbortSignal.timeout(15e3));
}
async function Ic() {
  return (await On("/api/v1/members", "GET")).members;
}
async function xo(e, t) {
  const r = v.room;
  if (!r) throw new Error("未配置私有服务器");
  const i = { ...r }, n = await te(i, "/api/v1/members", "POST", { uid: e, name: t }, AbortSignal.timeout(15e3));
  if (!Pt(n.token)) throw new Error("服务器返回无效，勿重复创建，请刷新成员列表");
  return "BEAVER-PRIVATE1:" + btoa(encodeURIComponent(JSON.stringify({ ...i, uid: e, token: n.token })));
}
async function Uc(e) {
  const t = v.room;
  if (!t) throw new Error("未配置私有服务器，无法发送邀请");
  if (e.uid === f.currentUser.uid) throw new Error("不能邀请自己");
  const r = Vt(t);
  if (!r.messageTypes.includes("server_invite")) throw new Error(r.status === "unknown" || r.status === "incompatible" ? r.reason : "服务端未启用邀请卡消息，未创建新成员邀请。");
  const i = await xo(e.uid, e.name), n = A.spaces.find((h) => h.id === (A.rooms.find((p) => p.id === A.channel)?.space || "hub_main")), s = A.rooms.find((h) => h.id === A.channel) || A.rooms[0], o = n?.name || t.room || "海狸聊天室", a = s?.name || "综合讨论";
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
  }, u = Nn(e.uid);
  await ni(l, {
    ...t,
    channel: u,
    name: `私聊 / ${e.name}`
  }), Bo(e.uid);
}
async function Mc(e) {
  if (!/^[a-f0-9]{32}$/.test(e)) throw new Error("成员标识无效");
  await On("/api/v1/members/" + e, "DELETE");
}
function He(e) {
  return { ...e, channel: A.channel };
}
function Ft(e) {
  const t = new URL(_n(e)), r = e.channel || "main";
  return r !== "main" && t.searchParams.set("channel", r), t.href;
}
function Le(e) {
  return pi(e.uid, Ft(e), e.room);
}
function _e(e) {
  return G.isInstalled("chat") && f.currentUser.uid === e.uid && f.serverUrl === Ft(e) && (e.channel || "main") === A.channel && f.currentRoomId === e.room && v.room !== null && I(v.room) === I(e);
}
function Pc() {
  const e = v.room && He(v.room);
  return e && _e(e) ? { scope: Le(e), channel: e.channel } : null;
}
function Nn(e) {
  return "dm_" + [f.currentUser.uid, e].sort().join("__");
}
function Rc(e) {
  if (!e.startsWith("dm_")) return;
  const t = e.slice(3).split("__");
  if (t.length === 2)
    return t.find((r) => r !== f.currentUser.uid);
}
function Bo(e) {
  const t = v.room;
  if (!t || !e || e === f.currentUser.uid) return;
  const r = Nn(e);
  r === A.channel && _e(He(t)) || $t(Ft({ ...t, channel: r }), t.room, !0) && (A.channel = r, De());
}
async function $o(e) {
  const t = v.room;
  if (!t) throw new Error("未配置私有服务器");
  await te({ ...t }, "/api/v1/friends/request", "POST", { toUid: e }, AbortSignal.timeout(15e3));
}
async function Wo(e, t) {
  const r = v.room;
  if (!r) throw new Error("未配置私有服务器");
  await te({ ...r }, "/api/v1/friends/respond", "POST", { id: e, accept: t }, AbortSignal.timeout(15e3));
}
function Ln(e) {
  const t = v.room;
  if (!(!t || !A.rooms.some((r) => r.id === e))) {
    if (e === A.channel && _e(He(t))) {
      Wr();
      return;
    }
    $t(Ft({ ...t, channel: e }), t.room, ze === I(t) && f.currentUser.uid === t.uid) && (A.channel = e, De());
  }
}
async function Oc(e, t) {
  const r = v.room;
  if (!r) throw new Error("未配置");
  const i = I(r), n = { ...r };
  await te(n, t ? `/api/v1/rooms/${encodeURIComponent(t)}` : "/api/v1/rooms", "POST", e, AbortSignal.timeout(15e3));
  const s = await te(n, "/api/v1/rooms", "GET", void 0, AbortSignal.timeout(15e3));
  if (v.room && I(v.room) === i && f.currentUser.uid === r.uid) {
    const o = xr(s.rooms), a = s.spaces ? Br(s.spaces) : void 0;
    A.rooms = o, a && v.room && I(v.room) === i && f.currentUser.uid === r.uid && (A.spaces = a);
  }
}
async function Nc(e) {
  if (e === "main") throw new Error("默认房间不可移除");
  const t = v.room;
  if (!t) throw new Error("未配置");
  const r = I(t);
  await te({ ...t }, `/api/v1/rooms/${encodeURIComponent(e)}`, "DELETE", void 0, AbortSignal.timeout(15e3)), !(!v.room || I(v.room) !== r) && (A.rooms = A.rooms.filter((i) => i.id !== e), A.channel === e && Ln("main"));
}
async function Lc(e, t) {
  const r = v.room;
  if (!r) throw new Error("未配置");
  const i = I(r);
  await te({ ...r }, t ? `/api/v1/spaces/${encodeURIComponent(t)}` : "/api/v1/spaces", "POST", e, AbortSignal.timeout(15e3)), v.room && I(v.room) === i && await Dn(r);
}
async function Dc(e) {
  if (e === "hub_main") throw new Error("默认空间不可移除");
  const t = v.room;
  if (!t) throw new Error("未配置");
  const r = I(t), i = A.channel;
  await te({ ...t }, `/api/v1/spaces/${encodeURIComponent(e)}`, "DELETE", void 0, AbortSignal.timeout(15e3)), !(!v.room || I(v.room) !== r || f.currentUser.uid !== t.uid) && (await Dn(t), !(!v.room || I(v.room) !== r || f.currentUser.uid !== t.uid) && A.channel === i && !A.rooms.some((n) => n.id === i) && Ln("main"));
}
async function Dn(e) {
  const t = await te({ ...e }, "/api/v1/spaces", "GET", void 0, AbortSignal.timeout(15e3));
  if (!v.room || I(v.room) !== I(e) || f.currentUser.uid !== e.uid) return;
  const r = Br(t.spaces), i = xr(t.rooms);
  A.spaces = r, v.room && I(v.room) === I(e) && f.currentUser.uid === e.uid && (A.rooms = i);
}
let xn = "", ze = "";
const bi = new Uo({
  active: _e,
  visible: () => f.visible,
  poll: jo,
  started: () => {
    f.connecting = !f.connected, A.syncing = !0;
  },
  idle: () => {
    A.syncing = !1;
  },
  classify: (e, t) => e instanceof ct && e.status === 404 && (t.channel || "main") !== "main" ? "missing-room" : e instanceof ct && [401, 403].includes(e.status) ? "auth" : "retry",
  failed: (e, t, r) => {
    e === "missing-room" ? (A.channel = "main", A.status = "房间已移除，正在返回综合讨论") : e === "auth" ? (ze = "", $r(), A.role = "", f.error = "访问凭证已失效、过期或不属于此房间，请重新导入邀请", f.connected = !1, f.connecting = !1) : r >= 2 && (f.connected = !1, f.connecting = !1, f.error = `${t}失败或超时，记录与待发队列保留，将自动重试。若持续失败，请关闭旧标签页后重试，并检查服务配置。`, A.status = f.error);
  },
  restart: () => De()
});
function Wr() {
  const e = v.room && He(v.room);
  e && !bi.stopped && xn === I(e) && _e(e) || De();
}
function Bn() {
  bi.cancel();
}
function Ot() {
  ++si, Bn(), ze = "", $r(), f.connected = !1, f.connecting = !1, A.role = "";
}
function De() {
  if (!G.isInstalled("chat")) {
    Ot(), f.visible = !1, f.error = "", A.status = "实验性组件默认关闭，请先在商店手动启用";
    return;
  }
  const e = v.room && He(v.room), t = !!e && ze === I(e) && f.currentUser.uid === e.uid;
  if (t ? Bn() : Ot(), !e) {
    A.status = "尚未读取到聊天室配置，请在此窗口设置中检查", f.error = "";
    return;
  }
  if (e.uid !== f.currentUser.uid) {
    f.error = A.status = "邀请 UID 与本机不一致，请重新导入属于本机的邀请";
    return;
  }
  f.transportMode = "relay", $t(Ft(e), e.room, t) && (xn = I(e), f.connected || (A.status = "正在同步"), bi.start(e));
}
async function jo(e, t) {
  const r = Le(e), i = e.channel || "main", n = await t.wait(() => Js(r)), s = Rr(f.currentUser.avatar, ce.avatarUrl), o = f.currentUser.activity || Eo(), a = f.shareActivity !== !1 && o?.title ? `&act_type=${encodeURIComponent(o.type || "")}&act_title=${encodeURIComponent(o.title || "")}&act_url=${encodeURIComponent(o.url || "")}` : "", c = t.visible ? "&wait=6" : "", l = `/api/v1/sync?after=${n}&avatar=${encodeURIComponent(s)}&name=${encodeURIComponent(f.currentUser.name.slice(0, 100))}${a}${c}`;
  t.phase("连接私有服务器");
  const u = await t.wait(() => te(e, l, "GET", void 0, t.signal));
  if (!t.current()) return;
  t.phase("校验同步页");
  let h;
  try {
    h = Ro(u, e.uid, n, Date.now());
  } catch (p) {
    throw t.current() && $r(), p;
  }
  if (t.current() && (t.phase("保存同步记录"), await t.wait(() => Ys(r, h.messages, h.next)), !!t.current())) {
    try {
      await t.wait(() => Cn(r, h.messages.filter((p) => p.sender.uid === e.uid).map((p) => p.id), Fe));
    } catch {
      t.current() && (Z.value = "无法保存消息的发送确认，请检查浏览器存储。");
    }
    if (t.current() && (t.phase("应用同步状态"), !!Oo(h, { scope: r, channel: i, cursor: n, now: Date.now() }, t, {
      chat: f,
      service: A,
      authenticated: () => {
        ze = I(e);
      },
      publish: (p, g, w) => {
        for (const b of [...cr]) {
          if (!w()) return;
          try {
            b(p, g);
          } catch {
            console.warn("[PrivateChat] message listener failed");
          }
        }
      },
      notify: To
    }) && t.current()))
      return t.phase("处理待发消息"), br.flush(e), { hasMore: h.hasMore };
  }
}
async function Zt(e) {
  const t = v.room && He(v.room);
  if (!t || !_e(t))
    return Z.value = "未配置此房间的私有服务器，未发送", !1;
  e.sender && (e.sender.avatar = Rr(f.currentUser.avatar, ce.avatarUrl), f.currentUser.name && (e.sender.name = f.currentUser.name));
  const r = Bt(e);
  if (!r || r.type === "system")
    return Z.value = "消息格式无效，未发送", !1;
  const i = kt(Vt(t), r);
  if (i)
    return Z.value = i, !1;
  const n = { ...t };
  try {
    return await Pr(Le(n), [r]), await En(Le(n), r, [Fe]), _e(n) && !f.messages.some((s) => s.id === r.id) && f.messages.push(r), Z.value = "", br.flush(n), !0;
  } catch {
    return Z.value = "消息未能保存到待发队列，请勿刷新，检查存储后重试", !1;
  }
}
let ji = !1;
function Vo() {
  ji || (ji = !0, Oe(() => [G.isInstalled("chat"), JSON.stringify(v.room)], () => {
    const e = v.room;
    A.members = [], A.rooms = [], A.roomsSupported = !1, A.spaces = [], A.spacesSupported = !1, $r(), A.channel = "main", (!e || !G.isInstalled("chat")) && (f.visible = !1, A.members = []), De();
  }, { immediate: !0, flush: "sync" }), Oe(() => f.visible, (e) => {
    e && Wr();
  }), Oe(() => f.currentUser.uid, () => De()), G.isInstalled("chat") && v.room && dt(Le(v.room)).catch(() => {
    Z.value = "待发队列读取失败，请关闭旧标签页后重试";
  }));
}
class Fo {
  constructor() {
    Vo();
  }
  connect() {
    Wr();
  }
  disconnect() {
    Ot();
  }
  resetReconnectAndConnect() {
    De();
  }
  async retryMessage(t) {
    await Zt(t);
  }
  dispatchOutgoing(t, r) {
    if (!r) {
      Zt(t);
      return;
    }
    ni(t, r).then(() => {
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
      return await ni(n, r), !0;
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
    !t.uid || t.uid === f.currentUser.uid || $o(t.uid).then(() => {
      he.fetch("海狸聊天室", `已向【${t.name}】发送好友申请`, "对方可在聊天室右上角通知中确认。");
    }).catch((i) => {
      he.fetch("海狸聊天室", "好友申请未发送", i instanceof Error ? i.message : "请检查聊天室连接。");
    });
  }
  respondFriendRequest(t, r) {
    t.id && Wo(t.id, r).then(() => {
      he.fetch("海狸聊天室", r ? `已通过【${t.from.name}】的好友申请` : "已忽略该申请", r ? "双方已成为好友，可随时点击私聊。" : "");
    }).catch((i) => {
      he.fetch("海狸聊天室", "操作未完成", i instanceof Error ? i.message : "请检查网络。");
    });
  }
}
const $n = new Fo(), xc = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  chatService: $n
}, Symbol.toStringTag, { value: "Module" })), qo = {
  schemaVersion: 1,
  id: "chat",
  title: "海狸聊天室",
  emoji: "💬",
  rootId: "vue-chat-dialog-root",
  settingsKeys: ["lw_chat_server_url"],
  capabilities: ["chat:message-read", "chat:message-send"],
  badgeCount: () => f.unreadCount,
  loadView: () => import("./ChatDialog-4mVyviS7.js").then((e) => e.default),
  lifecycle: {
    isVisible: () => f.visible,
    canOpen: () => G.isInstalled("chat"),
    open: () => {
      G.isInstalled("chat") && (f.visible = !0, f.unreadCount = 0, co.value && $n.connect());
    },
    hide: () => {
      f.visible = !1;
    },
    canUnmount: () => !0
  }
}, er = z({
  visible: !1,
  pendingWrites: 0
}), Go = "logicweaver_prompt_backpack_v1", Ko = "logicweaver_prompt_backpack_categories_v1", Bc = "logicweaver_saved_articles_v1", $c = "logicweaver_saved_article_categories_v1", Wc = [
  { id: "all", name: "全部", icon: "🎒", isBuiltin: !0 },
  { id: "starred", name: "星标置顶", icon: "⭐", isBuiltin: !0 },
  { id: "default", name: "默认分组", icon: "📁", isBuiltin: !1 }
], jc = [
  { id: "all", name: "全部", icon: "📑", isBuiltin: !0 },
  { id: "starred", name: "星标置顶", icon: "⭐", isBuiltin: !0 },
  { id: "default", name: "默认分组", icon: "📁", isBuiltin: !1 }
], Ho = {
  schemaVersion: 1,
  id: "backpack",
  title: "提示词背包",
  emoji: "🎒",
  rootId: "vue-backpack-dialog-root",
  settingsKeys: [Go, Ko],
  capabilities: ["prompt:read", "prompt:write", "prompt:clipboard"],
  loadView: () => import("./BackpackDialog-DVIzxXbE.js").then((e) => e.default),
  lifecycle: {
    isVisible: () => er.visible,
    canOpen: () => G.isInstalled("backpack"),
    open: () => {
      G.isInstalled("backpack") && (er.visible = !0);
    },
    hide: () => {
      er.visible = !1;
    },
    canUnmount: () => er.pendingWrites === 0
  }
}, zo = {
  schemaVersion: 1,
  id: "multica",
  title: "Agent 工作台",
  icon: "assets/nav-multica.png",
  emoji: "🤖",
  presentation: "card",
  rootId: "multica",
  settingsKeys: [],
  capabilities: ["workspace:fullscreen", "multica:tasks", "multica:runtimes"],
  loadView: () => import("./MulticaDialog-B8YIPz1e.js").then((e) => e.M).then((e) => e.default),
  lifecycle: {
    isVisible: () => le.activeId === "multica",
    canOpen: () => G.isInstalled("multica"),
    open: () => {
      G.isInstalled("multica") && Tr("multica");
    },
    hide: () => Dt("multica")
  }
};
try {
  Is();
} catch (e) {
  console.warn("旧 YouTube 数据清理失败", e);
}
Ce(qo);
Ce(Ho);
Ce(zo);
Ce(xs);
Ce(Rs);
Ce(Ls);
Ce(Ps);
Ce(Us);
Ce(Ms);
function Jo(e) {
  const t = e.map((r) => ({ ...r }));
  for (const r of Qi()) {
    if (r.presentation !== "card" || r.showInDock === !1) continue;
    if (t.some((s) => s.id === r.id)) throw new Error("Duplicate workspace card entry");
    const i = { id: r.id, title: r.title, icon: r.icon }, n = r.dockBefore ? t.findIndex((s) => s.id === r.dockBefore) : -1;
    t.splice(n < 0 ? t.length : n, 0, i);
  }
  return t;
}
function Yo(e) {
  const t = e.map((r) => ({ ...r }));
  for (const r of Qi()) {
    if (r.showInDock === !1 || r.presentation === "card") continue;
    if (t.some((s) => s.id === r.id)) throw new Error("Dock module duplicated in legacy tools");
    const i = { id: r.id, title: r.title, icon: r.icon, emoji: r.emoji }, n = r.dockBefore ? t.findIndex((s) => s.id === r.dockBefore) : -1;
    t.splice(n < 0 ? t.length : n, 0, i);
  }
  return t;
}
function Qo(e) {
  const t = e.find((r) => r.id === "daily-bilibili");
  return t ? [t, ...e.filter((r) => r !== t)] : [...e];
}
const Xo = Qo(Jo([])), Zo = Yo([]), Wn = "logicweaver_dock_custom_order", vi = "logicweaver_dock_position";
function Si(e) {
  return e === "bottom" || e === "left" || e === "right" || e === "top";
}
function ea() {
  try {
    if (typeof localStorage < "u") {
      const e = localStorage.getItem(vi);
      if (Si(e)) return e;
    }
  } catch {
  }
  return "bottom";
}
function ta(e) {
  try {
    typeof localStorage < "u" && localStorage.setItem(vi, e);
  } catch {
  }
}
function vr() {
  try {
    if (typeof localStorage < "u") {
      const e = localStorage.getItem(Wn);
      if (e) return JSON.parse(e) || {};
    }
  } catch {
  }
  return {};
}
function Vi(e) {
  try {
    typeof localStorage < "u" && localStorage.setItem(Wn, JSON.stringify(e));
  } catch {
  }
}
function jn() {
  const e = Zo.filter((r) => G.isInstalled(r.id)), t = vr().tools;
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
function Vn() {
  const e = Xo.filter((r) => G.isInstalled(r.id)), t = vr().cards;
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
const ra = () => ({
  mounted: !1,
  get activeTargetId() {
    return cn() || le.activeId || "";
  },
  activeTools: [],
  cards: Vn(),
  tools: jn(),
  position: ea()
}), $ = z(ra());
typeof window < "u" && (window.addEventListener("logicweaver:dock-modules-changed", () => {
  $.tools = jn(), $.cards = Vn();
}), window.addEventListener("storage", (e) => {
  e.key === vi && Si(e.newValue) && ($.position = e.newValue);
}));
Cr.onStateChange((e) => {
  $.activeTools = [...e];
});
let ke = {};
function tr(e, t) {
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
const Vc = {
  getSnapshot() {
    return Lt($);
  },
  update(e) {
    const { activeTargetId: t, ...r } = e;
    Object.assign($, r);
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
    const r = typeof window < "u" ? window.location.pathname + window.location.href : "", i = r.includes("bilibili.html") || r.includes("github.html") || r.includes("aihot.html");
    if (e === "home") {
      if (i) {
        tr("newtab.html", "newtab.html");
        return;
      }
      if (ke.onHomeClick) {
        ke.onHomeClick();
        return;
      }
      const n = document.getElementById("daily-toggle");
      n && n.classList.contains("active") && n.classList.remove("active");
      const s = le.activeId;
      s && Dt(s), Cs(le.activeId), typeof window < "u" && window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      return;
    }
    if (e === "target") {
      const n = {
        "daily-bilibili": "bilibili.html",
        "card-github": "github.html",
        "daily-aihot": "aihot.html"
      };
      if (i) {
        const o = n[t];
        o ? tr(o, o) : tr("newtab.html", "newtab.html");
        return;
      }
      if (ke.onTargetClick) {
        ke.onTargetClick(t);
        return;
      }
      const s = window;
      $.activeTargetId === t ? typeof s.exitFullscreenCard == "function" && s.exitFullscreenCard() : typeof s.enterFullscreenCard == "function" && s.enterFullscreenCard(t);
      return;
    }
    if (e === "tool") {
      const n = !!document.getElementById("vue-bili-companions-root");
      if (i && !n) {
        tr("newtab.html", "newtab.html");
        return;
      }
      if (!["todoist", "music", "siren", "wallpaper", "stickers", "sync", "chat", "backpack", "multica"].includes(t) && typeof window < "u") {
        const o = window;
        typeof o.exitFullscreenCard == "function" && o.exitFullscreenCard();
      }
      if (ke.onToolClick) {
        ke.onToolClick(t);
        return;
      }
      Cr.toggle(t);
      return;
    }
  },
  reorderCards(e) {
    const t = new Map($.cards.map((n) => [n.id, n])), r = [];
    for (const n of e) {
      const s = t.get(n);
      s && (r.push(s), t.delete(n));
    }
    for (const n of t.values()) r.push(n);
    $.cards = r;
    const i = vr();
    Vi({ ...i, cards: r.map((n) => n.id) });
  },
  reorderTools(e) {
    const t = new Map($.tools.map((n) => [n.id, n])), r = [];
    for (const n of e) {
      const s = t.get(n);
      s && (r.push(s), t.delete(n));
    }
    for (const n of t.values()) r.push(n);
    $.tools = r;
    const i = vr();
    Vi({ ...i, tools: r.map((n) => n.id) });
  },
  setPosition(e) {
    Si(e) && $.position !== e && ($.position = e, ta(e), typeof window < "u" && window.dispatchEvent(new CustomEvent("logicweaver:dock-position-changed", { detail: e })));
  },
  setActions(e) {
    ke = { ...ke, ...e };
  }
}, Fn = "active_wallpaper", Ai = "_manifest.json";
function qn() {
  return typeof navigator < "u" && typeof navigator.storage?.getDirectory == "function";
}
async function ia(e) {
  const t = [];
  for await (const [r, i] of e.entries())
    t.push(e.removeEntry(r, { recursive: i.kind === "directory" }));
  await Promise.all(t);
}
async function na(e, t) {
  let r = e;
  for (const i of t)
    !i || i === "." || (r = await r.getDirectoryHandle(i, { create: !0 }));
  return r;
}
async function sa(e) {
  if (!qn()) return !1;
  try {
    const r = await (await navigator.storage.getDirectory()).getDirectoryHandle(Fn, { create: !0 });
    await ia(r);
    const n = await (await r.getFileHandle(Ai, { create: !0 })).createWritable(), s = {
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
      const c = a.split("/"), l = c.pop(), p = await (await (await na(r, c)).getFileHandle(l, { create: !0 })).createWritable();
      await p.write(o.file), await p.close();
    }
    return !0;
  } catch (t) {
    return console.warn("[OPFS Wallpaper] 写入活跃壁纸失败，回退至 IndexedDB:", t), !1;
  }
}
async function Gn(e, t = "") {
  const r = [];
  for await (const [i, n] of e.entries()) {
    if (i === Ai) continue;
    const s = t ? `${t}/${i}` : i;
    if (n.kind === "file") {
      const o = await n.getFile();
      r.push({
        path: s,
        file: o,
        mime: o.type || void 0
      });
    } else if (n.kind === "directory") {
      const o = await Gn(n, s);
      r.push(...o);
    }
  }
  return r;
}
async function Fi() {
  if (!qn()) return null;
  try {
    const e = await navigator.storage.getDirectory();
    let t;
    try {
      t = await e.getDirectoryHandle(Fn, { create: !1 });
    } catch {
      return null;
    }
    let r;
    try {
      r = await t.getFileHandle(Ai, { create: !1 });
    } catch {
      return null;
    }
    const n = await (await r.getFile()).text(), s = JSON.parse(n), o = await Gn(t);
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
function rr(e) {
  (!Number.isFinite(e) || e < 0) && (e = 0);
  const t = Math.floor(e / 60), r = Math.floor(e % 60);
  return String(t).padStart(2, "0") + ":" + String(r).padStart(2, "0");
}
const ir = typeof localStorage < "u" ? localStorage.getItem("bili_radio_mode") : null, oa = () => ({
  active: !1,
  loading: !1,
  playing: !1,
  mode: ir === "order" || ir === "one" || ir === "shuffle" ? ir : "order",
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
}), R = z(oa()), Kn = {
  getSnapshot() {
    return Lt(R);
  },
  update(e) {
    for (const t of Object.keys(e))
      R[t] !== e[t] && (R[t] = e[t]);
    if (typeof e.currentTime == "number" || typeof e.duration == "number") {
      const t = e.currentTime ?? R.currentTime, r = e.duration ?? R.duration, i = rr(t), n = rr(r);
      if (R.formattedCurrent !== i && (R.formattedCurrent = i), R.formattedDuration !== n && (R.formattedDuration = n), r > 0) {
        const s = Math.round(Math.min(100, Math.max(0, t / r * 100)) * 10) / 10;
        Math.abs(R.progressPercent - s) >= 0.2 && (R.progressPercent = s);
      } else
        R.progressPercent = 0;
    }
  },
  setProgress(e, t) {
    R.currentTime = e, R.duration = t;
    const r = rr(e), i = rr(t);
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
typeof window < "u" && (window.LogicWeaverBiliRadioTape = Kn);
let U = null, ne = !1, Sr = !1, Et = "B站电台", N = [], F = -1, q = null, oi, Hn = {}, ht = 0, Ee = "", lr = null, zn = [], ur = /* @__PURE__ */ new Set(), nt = null, dr = 0, vt = Date.now(), Kr = 0;
function _i() {
  lr !== null && (clearInterval(lr), lr = null);
}
function Jn(e) {
  const t = U;
  if (!t || !ne || !q) return;
  const r = zn.find((i) => !ur.has(i) && /^https?:\/\//i.test(i));
  if (!r || ur.size >= 3) {
    _i(), Ee = "音频连接中断，已尝试所有备用线路", ee();
    return;
  }
  ur.add(r), nt = {
    time: Number.isFinite(t.currentTime) ? t.currentTime : 0,
    paused: t.paused
  }, Ee = "网络波动，正在切换备用线路…", ee(), t.src = r, t.load(), nt.paused || t.play().catch(() => {
  });
}
function aa() {
  _i(), vt = Date.now(), dr = U?.currentTime || 0, Kr = U?.buffered.length ? U.buffered.end(U.buffered.length - 1) : 0, lr = setInterval(() => {
    const e = U;
    if (!e || !ne || e.paused || e.ended) {
      vt = Date.now();
      return;
    }
    const t = e.currentTime, r = e.buffered.length ? e.buffered.end(e.buffered.length - 1) : 0;
    if (t !== dr || r > Kr) {
      vt = Date.now(), dr = t, Kr = r, Ee === "网络波动，正在切换备用线路…" && (Ee = "", ee());
      return;
    }
    Date.now() - vt >= 8e3 && e.readyState < 3 && Jn();
  }, 1e3);
}
function ca() {
  U && (vt = Date.now(), dr = U.currentTime, Ee === "网络波动，正在切换备用线路…" && (Ee = "")), ee();
}
function la() {
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
  ee();
}
function ua() {
  ne && U?.error && Jn(`音频解码或网络错误 [代码: ${U.error.code}]`);
}
function it() {
  return U || (U = new Audio(), U.id = "bili-radio-audio", U.preload = "auto", U.addEventListener("ended", da), U.addEventListener("timeupdate", ca), U.addEventListener("play", ee), U.addEventListener("pause", ee), U.addEventListener("loadedmetadata", la), U.addEventListener("error", ua), U);
}
function da() {
  const e = R.mode || "order";
  if (e === "one")
    U && (U.currentTime = 0, U.play().catch(() => {
    }), ee());
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
function ee() {
  const e = U, t = !!(e && !e.paused && !e.ended && ne), r = e?.duration && Number.isFinite(e.duration) ? e.duration : q?.duration || 0, i = q?.cues?.find((s) => (e?.currentTime || 0) >= s.from && (e?.currentTime || 0) < s.to), n = Ee || i?.content || (t ? "♪ 伴奏播放中…" : q ? `已暂停 · 《${q.title}》` : "点击磁带继续播放");
  Kn.update({
    active: ne,
    loading: Sr,
    playing: t,
    title: q?.title || "B站电台",
    coverUrl: q?.cover || "",
    seriesName: Et,
    trackIndex: F >= 0 ? F + 1 : 1,
    totalTracks: N.length || 1,
    currentTime: e?.currentTime || 0,
    duration: r,
    lyric: n
  }), ne && q && an.syncFromBiliRadio({
    playing: t,
    title: q.title || "B站电台",
    artist: q.upper || q.author || Et || "哔哩哔哩电台",
    coverUrl: q.cover || "",
    currentTime: e?.currentTime || 0,
    duration: r,
    lyric: n,
    seriesName: Et
  });
}
async function fa(e) {
  if (e.streamUrl || e.url) return e;
  const t = await Q.getVideoView(e.bvid);
  if (!t?.cid) throw new Error("视频信息不可用");
  const r = await Q.fetchAudioStream(e.bvid, t.cid);
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
  const t = Hn;
  if (!N.length || t.isCurrent?.() === !1) return;
  const r = ++ht;
  F = (e % N.length + N.length) % N.length, Sr = !0, ne = !0, Ee = "", _i(), nt = null, it().pause(), ee();
  try {
    const i = oi ? await oi(N[F]) : await fa(N[F]);
    if (r !== ht || t.isCurrent?.() === !1) return;
    q = i;
    const n = i.streamUrls?.length ? i.streamUrls : i.streamUrl || i.url ? [i.streamUrl || i.url] : [], s = n[0];
    if (!s) throw new Error("没有取得视频播放地址");
    zn = n, ur = /* @__PURE__ */ new Set([s]), it().src = s, aa(), t.onReady?.(it()), t.autoplay !== !1 && it().play().catch((o) => console.warn("[BiliRadio] 播放失败", o)), i.bvid && !i.cues?.length && Q.fetchVideoSubtitleDetails(i.bvid, i.cid).then((o) => {
      r === ht && o.ok && q && (q.cues = o.cues);
    }).catch(() => {
    });
  } catch (i) {
    if (r !== ht || t.isCurrent?.() === !1) return;
    ne = !1, console.warn("[BiliRadio] 解析音轨失败", i), Ee = i instanceof Error ? i.message : "播放失败";
  } finally {
    r === ht && (Sr = !1, t.isCurrent?.() === !1 && (ne = !1), ee());
  }
}
const Ei = {
  playQueue(e) {
    Et = e.name || "B站电台", N = Array.isArray(e.items) ? e.items.map((t) => ({ ...t })) : [], oi = e.resolveTrack, Hn = { isCurrent: e.isCurrent, autoplay: e.autoplay, onReady: e.onReady }, de(e.startIndex || 0);
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
    }) : e.pause(), ee();
  },
  seek(e) {
    const t = it();
    Number.isFinite(t.duration) && t.duration > 0 && (t.currentTime = Math.min(100, Math.max(0, e)) / 100 * t.duration, ee());
  },
  getAudioElement() {
    return U;
  },
  getState() {
    return {
      active: ne,
      loading: Sr,
      name: Et,
      items: N,
      index: F,
      track: q,
      currentTime: U?.currentTime || 0,
      duration: U?.duration || 0,
      playing: !!(U && !U.paused && !U.ended && ne)
    };
  },
  syncTape: ee
};
typeof window < "u" && (window.LogicWeaverBiliRadioPlayer = Ei);
const ai = 1024, Ct = ai / 2, Ze = 64;
let x = null, ye = null, we = null;
const qi = /* @__PURE__ */ new WeakMap();
let Gi = null, H = null, Re = null, Nt = !1, Ar = 0, st = 0, Ki = !1;
const Hr = new Uint8Array(Ct), zr = new Uint8Array(Ct), Jr = new Array(128).fill(0), Tt = new Array(128).fill(0), Yn = [];
for (let e = 0; e < Ze; e++) {
  const t = Math.floor(e + Math.pow(e / Ze, 3.2) * (Ct - Ze)), r = Math.min(
    Ct - 1,
    Math.max(t, Math.floor(e + 1 + Math.pow((e + 1) / Ze, 3.2) * (Ct - Ze) - 1))
  );
  Yn.push([t, r]);
}
function pa() {
  if (x && ye && we) return !0;
  try {
    const e = window.AudioContext || window.webkitAudioContext;
    if (!e) return !1;
    x = new e();
    const t = x.createChannelSplitter(2);
    return ye = x.createAnalyser(), ye.fftSize = ai, ye.smoothingTimeConstant = 0.82, we = x.createAnalyser(), we.fftSize = ai, we.smoothingTimeConstant = 0.82, t.connect(ye, 0), t.connect(we, 1), !0;
  } catch (e) {
    return console.warn("[WE AudioVisualizer] AudioContext init failed:", e), !1;
  }
}
function ma(e) {
  if (!e || !pa() || !x) return !1;
  try {
    let t = qi.get(e);
    if (t || (t = x.createMediaElementSource(e), qi.set(e, t)), Gi !== e) {
      if (ye && we) {
        try {
          t.disconnect();
        } catch {
        }
        t.connect(ye), t.connect(we);
      }
      t.connect(x.destination), Gi = e;
    }
    return !0;
  } catch {
    return !1;
  }
}
function Qn() {
  const e = D.getAudioElement(), t = Ei.getAudioElement();
  return t && !t.paused && !t.ended && t.currentTime > 0 ? t : e && !e.paused && !e.ended && e.currentTime > 0 ? e : null;
}
function ha() {
  const e = Qn();
  return e && ma(e), e;
}
function _r(e) {
  if (!Nt || !Re) return;
  if (e - Ar < 33) {
    H = requestAnimationFrame(_r);
    return;
  }
  Ar = e;
  const t = ha();
  if (!t || t.paused || t.ended) {
    try {
      Re.postMessage({
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
    ye.getByteFrequencyData(Hr), we.getByteFrequencyData(zr);
    for (let i = 0; i < Ze; i++) {
      const [n, s] = Yn[i];
      let o = 0, a = 0;
      for (let u = n; u <= s; u++)
        Hr[u] > o && (o = Hr[u]), zr[u] > a && (a = zr[u]);
      const c = o / 255, l = a / 255;
      Jr[i] = c, Jr[i + 64] = l, (c > 0.015 || l > 0.015) && (r = !0);
    }
  }
  if (r)
    st = 0;
  else if (st++, st >= 30) {
    try {
      Re.postMessage({
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
    Re.postMessage({
      type: "WE_AUDIO_DATA",
      audio: r ? Jr : Tt
    }, "*");
  } catch {
  }
  H = requestAnimationFrame(_r);
}
function nr() {
  Nt && H === null && (st = 0, Ar = 0, H = requestAnimationFrame(_r));
}
function ga() {
  if (Ki) return;
  Ki = !0;
  const e = D.getAudioElement(), t = Ei.getAudioElement();
  e && (e.addEventListener("play", nr), e.addEventListener("playing", nr)), t && (t.addEventListener("play", nr), t.addEventListener("playing", nr));
}
function Xn(e) {
  if (Re = e, ga(), Nt) return;
  if (Nt = !0, Ar = 0, st = 0, Qn())
    H = requestAnimationFrame(_r);
  else
    try {
      Re.postMessage({
        type: "WE_AUDIO_DATA",
        audio: Tt
      }, "*");
    } catch {
    }
}
function jr() {
  if (Nt = !1, st = 0, H !== null && (typeof cancelAnimationFrame == "function" && cancelAnimationFrame(H), clearTimeout(H), H = null), x && x.state === "running" && x.suspend().catch(() => {
  }), Re)
    try {
      Re.postMessage({
        type: "WE_AUDIO_DATA",
        audio: Tt
      }, "*");
    } catch {
    }
}
const ya = "leaf-newtab-backgrounds", wa = 1, Ge = "current-background", K = "heroBackgroundHistory", Hi = 30, sr = "assets/newtab-mountains.png", zi = 450, Yr = 180 * 1024 * 1024;
let ci = [], gt = 0, fr = null, yt = null, Er = null;
function Ji(e) {
  return ci.push(e), e;
}
function Zn() {
  if (fr) {
    try {
      fr();
    } catch {
    }
    fr = null;
  }
}
function ba(e) {
  Zn();
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
    g ? jr() : Xn(e);
  };
  window.addEventListener("pointermove", c, { passive: !0 }), window.addEventListener("mousedown", l, { passive: !0 }), window.addEventListener("mouseup", u, { passive: !0 }), window.addEventListener("click", h, { passive: !0 }), window.addEventListener("keydown", h, { passive: !0 }), document.addEventListener("visibilitychange", p), fr = () => {
    t && clearTimeout(t), window.removeEventListener("pointermove", c), window.removeEventListener("mousedown", l), window.removeEventListener("mouseup", u), window.removeEventListener("click", h), window.removeEventListener("keydown", h), document.removeEventListener("visibilitychange", p);
  };
}
function va() {
  jr(), Zn(), ci.forEach((e) => {
    try {
      URL.revokeObjectURL(e);
    } catch {
    }
  }), ci = [];
}
function Ci() {
  return new Promise((e, t) => {
    if (typeof indexedDB > "u") {
      t(new Error("IndexedDB is not supported in this environment"));
      return;
    }
    const r = indexedDB.open(ya, wa);
    r.onupgradeneeded = () => {
      const i = r.result;
      i.objectStoreNames.contains("files") || i.createObjectStore("files");
    }, r.onsuccess = () => e(r.result), r.onerror = () => t(r.error);
  });
}
async function Sa(e, t = Ge) {
  const r = await Ci();
  return new Promise((i, n) => {
    const s = r.transaction("files", "readwrite");
    s.objectStore("files").put(e, t), s.oncomplete = () => {
      r.close(), i();
    }, s.onerror = () => {
      r.close(), n(s.error);
    }, s.onabort = s.onerror;
  });
}
async function Aa() {
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
async function li(e = "hero") {
  try {
    const t = await Aa();
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
async function Qr(e = Ge) {
  try {
    const r = await Ci(), i = await new Promise((n, s) => {
      const o = r.transaction("files", "readonly"), a = o.objectStore("files").get(e);
      a.onsuccess = () => n(a.result || null), o.oncomplete = () => r.close(), o.onerror = () => {
        r.close(), s(o.error);
      };
    });
    if (i) return i;
  } catch {
  }
  const t = await li(e);
  return t || (e === Ge ? li("hero") : null);
}
async function Yi(e = Ge) {
  const t = await Ci();
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
function Ie(e) {
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
function Ti(e) {
  return !!(e && (/^image\//i.test(e.type || "") || /^video\//i.test(e.type || "") || /\.(png|jpe?g|webp|gif|mp4|webm)$/i.test(e.name || "")));
}
function ki(e) {
  return String(e || "").replace(/\\/g, "/").replace(/^\.\//, "").replace(/^\/+/, "");
}
function _a(e, t) {
  const r = String(t || "").trim().replace(/^['"]|['"]$/g, "");
  if (!r || /^(?:[a-z][a-z0-9+.-]*:|#|data:|blob:)/i.test(r)) return "";
  const [i] = r.split(/[?#]/);
  if (!i) return "";
  const n = r.startsWith("/") ? "" : ki(e).split("/").slice(0, -1).join("/"), s = `${n ? n + "/" : ""}${i.replace(/^\/+/, "")}`.split("/"), o = [];
  return s.forEach((a) => {
    !a || a === "." || (a === ".." ? o.pop() : o.push(a));
  }), o.join("/").toLowerCase();
}
function Ea(e, t) {
  return t.type ? t.type : /\.html?$/i.test(e) ? "text/html" : /\.css$/i.test(e) ? "text/css" : /\.m?js$/i.test(e) ? "text/javascript" : /\.png$/i.test(e) ? "image/png" : /\.jpe?g$/i.test(e) ? "image/jpeg" : /\.webp$/i.test(e) ? "image/webp" : /\.gif$/i.test(e) ? "image/gif" : /\.mp4$/i.test(e) ? "video/mp4" : /\.webm$/i.test(e) ? "video/webm" : "application/octet-stream";
}
async function Ca(e) {
  const t = [];
  let r = 0;
  async function i(n, s = "", o = 0) {
    if (!(o > 4 || t.length >= zi || r >= Yr))
      for await (const a of n.values()) {
        if (t.length >= zi || r >= Yr) break;
        const c = ki(s ? `${s}/${a.name}` : a.name);
        if (a.kind === "file") {
          const l = await a.getFile();
          r += l.size || 0, r <= Yr && t.push({ path: c, file: l });
        } else a.kind === "directory" && await i(a, c, o + 1);
      }
  }
  return await i(e), t;
}
function Ta(e) {
  return e.filter((t) => /(^|\/)index\.html?$/i.test(t.path) || /\.html?$/i.test(t.path)).sort((t, r) => {
    const i = (n) => /^index\.html?$/i.test(n.path) ? 0 : /(^|\/)index\.html?$/i.test(n.path) ? 1 : 2;
    return i(t) - i(r) || t.path.length - r.path.length;
  })[0] || null;
}
function ui(e, t = []) {
  return typeof e == "string" ? /\.(png|jpe?g|webp|gif|mp4|webm|html?)($|[?#])/i.test(e) && t.push(e) : Array.isArray(e) ? e.forEach((r) => ui(r, t)) : e && typeof e == "object" && Object.values(e).forEach((r) => ui(r, t)), t;
}
async function ka(e) {
  const t = new Map(e.map((i) => [ki(i.path).toLowerCase(), i])), r = e.filter((i) => /(^|\/)project\.json$/i.test(i.path));
  for (const i of r)
    try {
      const n = JSON.parse(await i.file.text());
      for (const s of ui(n)) {
        const o = t.get(_a(i.path, s));
        if (o && Ti(o.file)) return o.file;
      }
    } catch {
    }
  return null;
}
function Ia(e, t, r) {
  const i = r.filter((n) => !/\.(pkg|mpkg)$/i.test(n.path)).map((n) => ({ path: n.path, file: n.file, mime: Ea(n.path, n.file) }));
  return { type: "web", name: e || "Web Wallpaper", entry: t.path, files: i };
}
async function Ua(e) {
  const t = await Ca(e), r = Ta(t);
  if (r) return Ia(e.name, r, t);
  const i = await ka(t);
  return i || t.map((s) => s.file).filter(Ti).sort((s, o) => {
    const a = (c) => /\.(mp4|webm)$/i.test(c.name) ? 0 : /\.gif$/i.test(c.name) ? 1 : /^preview\./i.test(c.name) ? 2 : /cover|thumb|poster/i.test(c.name) ? 3 : 4;
    return a(s) - a(o) || o.size - s.size;
  })[0] || null;
}
function Ma(e) {
  return e ? typeof e == "string" ? "自定义图片" : e.name || (e.type === "web" ? "Web Wallpaper" : "自定义背景") : "默认背景";
}
function Pa(e) {
  return typeof e == "string" ? "图片" : e?.type === "web" ? "Web Wallpaper" : e?.type === "db" ? /video/i.test(e.mediaType || "") ? "视频" : "图片/GIF" : "背景";
}
function Ra(e, t) {
  if (!e || !t) return !1;
  const r = e.value || e, i = t.value || t;
  if (r.workshopId && i.workshopId && String(r.workshopId) === String(i.workshopId)) return !0;
  const n = e.title || r.name || r.title, s = t.title || i.name || i.title;
  if (n && s && n === s && r.type === i.type) return !0;
  const o = { ...r, storageKey: void 0 }, a = { ...i, storageKey: void 0 };
  return JSON.stringify(o) === JSON.stringify(a);
}
const Oa = {
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
    e && jr();
  },
  async loadHistory() {
    const e = await wt([K, "heroBackground"]);
    let t = Array.isArray(e[K]) ? e[K] : [];
    const r = /* @__PURE__ */ new Set(), i = [];
    for (const n of t) {
      const s = n.value?.workshopId ? `ws-${n.value.workshopId}` : n.title ? `${n.kind || ""}-${n.title}` : JSON.stringify({ ...n.value, storageKey: void 0 });
      r.has(s) || (r.add(s), i.push(n));
    }
    return i.length !== t.length && (t = i, Ie({ [K]: i })), { history: t, currentValue: e.heroBackground || null };
  },
  async addHistory(e, t = null, r) {
    const i = `bg-${Date.now()}-${Math.random().toString(16).slice(2)}`;
    let n = e;
    e && typeof e == "object" && (n = { ...e, storageKey: i }), t && await Sa(t, i);
    const s = await wt([K, "heroBackground"]), o = Array.isArray(s[K]) ? s[K] : [], a = {
      id: i,
      title: Ma(n),
      kind: Pa(n),
      createdAt: Date.now(),
      previewUrl: r || n.previewUrl || n.previewBase64,
      value: n
    }, c = [a, ...o.filter((u) => !Ra(u, a))].slice(
      0,
      Hi
    ), l = o.slice(Hi - 1).filter((u) => u.value?.storageKey && u.value.storageKey !== s.heroBackground?.storageKey);
    return await Promise.all(l.map((u) => Yi(u.value.storageKey))), await Ie({ [K]: c }), n;
  },
  async deleteHistory(e) {
    const t = await wt([K, "heroBackground"]), r = (t[K] || []).filter((i) => i.id !== e.id);
    e.value?.storageKey && await Yi(e.value.storageKey), await Ie({ [K]: r }), JSON.stringify(t.heroBackground) === JSON.stringify(e.value) && await this.clearWallpaper();
  },
  async clearWallpaper() {
    const e = { type: "none" };
    await Ie({ heroBackground: e });
    try {
      localStorage.setItem("lw-current-wallpaper", JSON.stringify(e));
    } catch {
    }
    await this.applyWallpaper(null);
  },
  async setMountain() {
    await Ie({ heroBackground: sr });
    try {
      localStorage.setItem("lw-current-wallpaper", JSON.stringify(sr));
    } catch {
    }
    await this.applyWallpaper(sr);
  },
  async setWallpaper(e, t = null) {
    t && (yt = t), Er = e, await Ie({ heroBackground: e });
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
    else if (Ti(e))
      i = e, r = { type: "db", name: e.name, mediaType: e.type || "application/octet-stream" };
    else
      throw new Error("请选择 JPG、PNG、WebP、GIF、MP4 或 WebM 壁纸。");
    return r = await this.addHistory(r, i), t && (await Ie({ heroBackground: r }), await this.applyWallpaper(r)), r;
  },
  async importWallpaperDirectory() {
    const e = window;
    if (!e.showDirectoryPicker) throw new Error("当前浏览器不支持直接选择 Wallpaper 文件夹。");
    const t = await e.showDirectoryPicker(), r = await Ua(t);
    if (!r) throw new Error("文件夹中没有找到可用的 Web Wallpaper、图片、GIF、MP4 或 WebM。");
    return this.importBackgroundFile(r);
  },
  async applyWallpaper(e, t = null) {
    const r = ++gt;
    if (typeof document > "u") return;
    const i = document.getElementById("launcher"), n = document.getElementById("hero-background-media");
    if (!(!i || !n) && (va(), n.replaceChildren(), i.style.removeProperty("--launcher-image"), !!e)) {
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
          const o = await Fi();
          o?.files?.length && (s = (o.files.find((c) => c.path === o.entry) || o.files[0])?.file || null);
        }
        if (s instanceof Blob && r === gt) {
          const o = Ji(URL.createObjectURL(s)), a = document.createElement("video");
          a.src = o, a.autoplay = !0, a.preload = "metadata", a.loop = !0, a.muted = !0, a.defaultMuted = !0, a.volume = 0, a.setAttribute("muted", ""), a.playsInline = !0, a.disablePictureInPicture = !0, a.setAttribute("disablepictureinpicture", ""), a.setAttribute("disableremoteplayback", ""), n.appendChild(a);
          return;
        }
      }
      if (Er = e, e.type === "web") {
        let s = t || yt;
        if ((!s || s.type !== "web") && (s = await Fi(), s && s.type === "web" ? yt = s : (s = await Qr(e.storageKey || Ge), s && s.type === "web" && (yt = s, sa(s)))), r !== gt) return;
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
            o.contentWindow && (ba(o.contentWindow), Xn(o.contentWindow));
          }, n.appendChild(o);
        } else
          console.warn("[WallpaperService] Web wallpaper pack not found yet, keeping state without fallback");
        return;
      }
      if (e.type === "db") {
        const s = await Qr(e.storageKey || Ge);
        if (r !== gt || !(s instanceof Blob)) return;
        const o = Ji(URL.createObjectURL(s));
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
    const r = await Qr(e || Ge);
    return t?.throwIfAborted(), r instanceof Blob ? URL.createObjectURL(r) : null;
  },
  async updateHistoryTitle(e, t) {
    const r = await wt([K]), i = Array.isArray(r[K]) ? r[K] : [];
    if (!i.some((s) => s.id === e)) throw new Error("壁纸条目已变化，请刷新");
    const n = i.map((s) => s.id === e ? { ...s, title: t.trim() || s.title } : s);
    await Ie({ [K]: n });
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
        const t = await li("hero");
        t && (e = {
          type: "db",
          name: t.name || "当前壁纸",
          mediaType: t.type || "application/octet-stream"
        });
      }
      e || (e = sr);
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
    if (Er && r && JSON.stringify(Er) === JSON.stringify(r))
      return;
    Oa.applyWallpaper(r);
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
  e && jr();
});
function Xr(e) {
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
function Na(e) {
  const t = /* @__PURE__ */ new Map();
  for (const r of e)
    r.group && t.set(r.group, (t.get(r.group) || 0) + 1);
  return [...t].map(([r, i]) => ({ name: r, count: i }));
}
function La(e, t) {
  return Math.max(0, t !== void 0 && e.offset !== void 0 ? t - e.offset : e.top);
}
const Da = ["disabled", "aria-expanded"], xa = {
  key: 0,
  class: "lw-select-icon"
}, Ba = {
  key: 0,
  class: "lw-select-groups",
  role: "group",
  "aria-label": "按厂商浏览"
}, $a = ["aria-pressed"], Wa = ["aria-pressed", "onClick"], ja = {
  key: 0,
  class: "lw-select-empty"
}, Va = ["disabled", "data-select-value", "title", "aria-selected", "onClick"], Fa = { class: "lw-item-content" }, qa = {
  key: 0,
  class: "lw-item-icon"
}, Ga = { class: "lw-item-text" }, Ka = {
  key: 0,
  class: "lw-item-check"
}, Ha = /* @__PURE__ */ ts({
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
    let c = Xr(null), l = !1;
    function u() {
      try {
        c = Xr(r.memoryKey ? localStorage.getItem(r.memoryKey) : null);
      } catch {
        c = Xr(null);
      }
      a.value = c.group;
    }
    u();
    function h(C = r.memoryKey) {
      const V = o.value;
      if (!V || !l) return;
      const _ = [...V.querySelectorAll("[data-select-value]")], me = V.getBoundingClientRect().top, Je = _.find((Vr) => Vr.getBoundingClientRect().bottom > me);
      if (c.group = a.value, c.positions[a.value] = {
        top: V.scrollTop,
        anchor: Je?.dataset.selectValue,
        offset: Je ? Je.getBoundingClientRect().top - me : void 0
      }, C)
        try {
          localStorage.setItem(C, JSON.stringify(c));
        } catch {
        }
    }
    async function p() {
      l = !1, await ss();
      const C = o.value;
      if (!n.value || !C) return;
      const V = [...C.querySelectorAll("[data-select-value]")], _ = c.positions[a.value], me = V.find((Vr) => Vr.dataset.selectValue === (_?.anchor ?? String(r.modelValue))), Je = me ? me.getBoundingClientRect().top - C.getBoundingClientRect().top + C.scrollTop : void 0;
      C.scrollTop = _ ? La(_, Je) : Math.max(0, (Je ?? 0) - C.clientHeight / 2), l = y.value.length > 0;
    }
    function g() {
      h(), n.value = !1;
    }
    async function w(C) {
      C !== a.value && (h(), a.value = C, await p(), h());
    }
    const b = Ue(() => r.options.map((C) => typeof C == "object" && C !== null ? C : { value: C, label: String(C) })), S = Ue(() => r.grouped ? Na(b.value) : []), y = Ue(() => a.value && r.grouped ? b.value.filter((C) => C.group === a.value) : b.value);
    Oe(() => r.memoryKey, (C, V) => {
      h(V), u(), n.value && p();
    }), Oe(b, () => {
      a.value && S.value.length && !S.value.some((C) => C.name === a.value) && (a.value = ""), n.value && p();
    }, { flush: "post" }), rs(() => h());
    const E = Ue(() => b.value.find((C) => String(C.value) === String(r.modelValue))), T = Ue(() => E.value?.label ?? r.placeholder);
    function J() {
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
    return is(() => {
      document.addEventListener("pointerdown", j, !0), window.addEventListener("keydown", P);
    }), ns(() => {
      document.removeEventListener("pointerdown", j, !0), window.removeEventListener("keydown", P);
    }), (C, V) => (se(), oe("div", {
      ref_key: "containerRef",
      ref: s,
      class: qt(["lw-custom-select", [`size-${e.size}`, { "is-open": n.value, "is-disabled": e.disabled }]])
    }, [
      xe("button", {
        type: "button",
        class: "lw-select-trigger",
        disabled: e.disabled,
        "aria-expanded": n.value,
        onClick: J
      }, [
        E.value?.icon ? (se(), oe("span", xa, Be(E.value.icon), 1)) : Ye("", !0),
        xe("span", {
          class: qt(["lw-select-label", { "is-placeholder": !E.value }])
        }, Be(T.value), 3),
        V[2] || (V[2] = xe("span", {
          class: "lw-select-chevron",
          "aria-hidden": "true"
        }, "▾", -1))
      ], 8, Da),
      n.value ? (se(), oe("div", {
        key: 0,
        class: qt(["lw-select-dropdown", { "is-grouped": e.grouped }])
      }, [
        S.value.length ? (se(), oe("div", Ba, [
          xe("button", {
            type: "button",
            "aria-pressed": !a.value,
            onClick: V[0] || (V[0] = (_) => w(""))
          }, "全部 · " + Be(b.value.length), 9, $a),
          (se(!0), oe(Ii, null, Ui(S.value, (_) => (se(), oe("button", {
            key: _.name,
            type: "button",
            "aria-pressed": a.value === _.name,
            onClick: (me) => w(_.name)
          }, Be(_.name) + " · " + Be(_.count), 9, Wa))), 128))
        ])) : Ye("", !0),
        xe("div", {
          ref_key: "listRef",
          ref: o,
          class: "lw-select-list",
          role: "listbox",
          onScrollPassive: V[1] || (V[1] = (_) => h())
        }, [
          y.value.length ? Ye("", !0) : (se(), oe("div", ja, " 暂无可用选项 ")),
          (se(!0), oe(Ii, null, Ui(y.value, (_) => (se(), oe("button", {
            key: String(_.value),
            type: "button",
            class: qt(["lw-select-item", {
              "is-active": String(_.value) === String(e.modelValue),
              "is-disabled": _.disabled
            }]),
            disabled: _.disabled,
            "data-select-value": String(_.value),
            title: _.label,
            role: "option",
            "aria-selected": String(_.value) === String(e.modelValue),
            onClick: (me) => L(_)
          }, [
            xe("span", Fa, [
              _.icon ? (se(), oe("span", qa, Be(_.icon), 1)) : Ye("", !0),
              xe("span", Ga, Be(_.label), 1)
            ]),
            String(_.value) === String(e.modelValue) ? (se(), oe("span", Ka, "✓")) : Ye("", !0)
          ], 10, Va))), 128))
        ], 544)
      ], 2)) : Ye("", !0)
    ], 2));
  }
}), Fc = /* @__PURE__ */ us(Ha, [["__scopeId", "data-v-24f4c9d8"]]);
function qc(e, t) {
  if (document.getElementById(e)) return;
  const r = document.createElement("style");
  r.id = e, r.textContent = t, document.head.appendChild(r);
}
export {
  nc as $,
  R as A,
  $n as B,
  Fc as C,
  Ci as D,
  sa as E,
  sr as F,
  Si as G,
  yo as H,
  ar as I,
  hr as J,
  lc as K,
  Tc as L,
  v as M,
  Ei as N,
  D as O,
  ho as P,
  f as Q,
  Zt as R,
  A as S,
  xi as T,
  Pc as U,
  Cc as V,
  Oa as W,
  Oi as X,
  nn as Y,
  sn as Z,
  oc as _,
  _s as a,
  sc as a0,
  ic as a1,
  Xe as a2,
  vs as a3,
  ac as a4,
  Nn as a5,
  Ir as a6,
  Ln as a7,
  Bo as a8,
  Lc as a9,
  vc as aA,
  Sc as aB,
  yc as aC,
  hc as aD,
  Eo as aE,
  Rc as aF,
  ct as aG,
  Do as aH,
  Ic as aI,
  xo as aJ,
  Mc as aK,
  Ko as aL,
  Go as aM,
  Wc as aN,
  $c as aO,
  Bc as aP,
  jc as aQ,
  er as aR,
  Ec as aS,
  xc as aT,
  Oc as aa,
  Dc as ab,
  Nc as ac,
  fi as ad,
  Ut as ae,
  zs as af,
  dc as ag,
  mn as ah,
  fc as ai,
  pc as aj,
  pi as ak,
  Me as al,
  ti as am,
  co as an,
  Ac as ao,
  _c as ap,
  fo as aq,
  Z as ar,
  un as as,
  mc as at,
  xt as au,
  gc as av,
  wc as aw,
  Uc as ax,
  kc as ay,
  bc as az,
  ps as b,
  Q as c,
  Ao as d,
  fs as e,
  Zi as f,
  Yi as g,
  an as h,
  m as i,
  ve as j,
  tc as k,
  k as l,
  Vc as m,
  he as n,
  le as o,
  $e as p,
  cc as q,
  Kn as r,
  di as s,
  ce as t,
  Cs as u,
  $ as v,
  rc as w,
  qc as x,
  d as y,
  uc as z
};
