import { _ as Xi, d as $e, r as qi, a as To, i as os } from "./dock-lifecycle.store-sB0Ll9yF.js";
/* empty css                */
import { r as Ee, a as vt, b as F, d as le, o as d, c as re, w as Pt, u as l, e as f, f as i, g as A, T as is, t as L, F as oe, h as me, i as K, j as ct, k as pi, l as Ae, v as ns, m as Ye, n as to, p as ss, q as rs, s as ne, x as Xe, y as Ot, z as At, A as ve, B as ue, C as Ne, D as q, E as j, G as Fo, H as Vt, I as Ji, J as So, K as et, L as so, M as Qi, N as Zi } from "./vendor-vue-CjOHdfe5.js";
import { t as xt, p as Go, n as Ie, a as ro, b as mt, l as Z, c as No, f as $o, d as fi, s as as, e as ls, h as Pe, m as ut, g as hi, i as Mo, j as Li, k as Ti, o as en, q as tn, r as on, u as nn, v as sn, w as Lt, x as _e, y as G, z as rn, A as Nt, B as an, C as oo, D as cs, E as Bt, F as Tt, G as ao, H as ds, I as us, J as lo } from "./search.service-CzxjlNxM.js";
import { f as Fe, l as lt, a as be, p as ps, b as Jt, c as Dt, d as ie, e as bt } from "./store-COMU29gc.js";
import { c as fs, a as hs, t as gs, b as St } from "./calendar.service-B8BRJfYm.js";
import { t as ms, a as vs, b as ys } from "./main-workspace-store-R_88lOV_.js";
import { todoistCalendarSidebarController as ws } from "./calendar-sidebar-store-BfJCHI6Q.js";
import { W as Io, b as bs, i as ks, g as _s, e as Cs } from "./view-styles-BwAwOeoD.js";
import { w as Ue, s as gi, P as xs, i as Eo, D as Uo, a as Si, g as Do, p as Ls, L as Ts, b as io, l as Ss } from "./read-session-C1M3QoXl.js";
import { s as Ho } from "./store-C4EO6cWS.js";
import { b as Qt, a as $s, c as Ms } from "./up-group-manager-store-Bgu5Ntgj.js";
import { biliMessagePanelController as pt, biliMessagePanelState as Is } from "./message-panel-store-B3uKhXuk.js";
import { b as ln, r as Es, a as Ht } from "./bili-favorites-store-LYdQqMAq.js";
import { s as Ds, a as Ps } from "./stickers.service-IL7ouITS.js";
import { a as mi, b as cn, c as As } from "./aihot-feed-store-B0pGDp7E.js";
import { p as dn } from "./pricing-store-Beh8wO7t.js";
import { y as un } from "./youtube-store-DQLV3CK_.js";
import { g as pn, G as Ws, _ as Os, a as Bs, b as Fs, c as Ns } from "./GitHubBatchBar.vue_vue_type_script_setup_true_lang-CQc3WsrI.js";
import { f as nt } from "./fullscreen-cards.store-C8zt8knq.js";
import { k as Hs, m as Rs } from "./core-utils-Ccz-tarm.js";
import { _ as Ce } from "./_plugin-vue_export-helper-CHgC5LLL.js";
import { u as fn } from "./InlineEditStatus.vue_vue_type_style_index_0_scoped_28642927_lang-BVjj5KH4.js";
import { t as Ve } from "./together-listen.store-TavS-Nlv.js";
const js = /^[a-z][a-z0-9]*(?:[.:-][a-z0-9]+)*$/;
function Ks() {
  const e = /* @__PURE__ */ new Map(), t = /* @__PURE__ */ new Map();
  function o(u) {
    if (!u || !js.test(u.id)) throw new TypeError(`Invalid command id: ${u?.id || ""}`);
    if (!u.title?.trim() || !u.category?.trim() || typeof u.run != "function")
      throw new TypeError(`Command ${u.id} requires title, category and run()`);
    if (e.has(u.id)) throw new Error(`Command already registered: ${u.id}`);
    return e.set(u.id, Object.freeze({
      ...u,
      description: u.description || "",
      keywords: Object.freeze([...u.keywords || []]),
      concurrency: u.concurrency || "replace"
    })), () => {
      n(u.id), e.delete(u.id);
    };
  }
  function n(u) {
    const x = t.get(u);
    return x ? (x.abort(), t.delete(u), !0) : !1;
  }
  async function s(u, x, C = "api") {
    const W = e.get(u);
    if (!W) throw new Error(`Unknown command: ${u}`);
    if (W.enabled && !W.enabled()) return;
    const p = W.concurrency || "replace";
    if (t.has(u)) {
      if (p === "drop") return;
      p === "replace" && n(u);
    }
    const r = new AbortController();
    p !== "parallel" && t.set(u, r);
    try {
      return await W.run(x, { signal: r.signal, source: C });
    } finally {
      t.get(u) === r && t.delete(u);
    }
  }
  function c(u) {
    return Object.freeze({
      id: u.id,
      title: u.title,
      category: u.category,
      description: u.description || "",
      keywords: Object.freeze([...u.keywords || []]),
      concurrency: u.concurrency || "replace",
      enabled: u.enabled ? !!u.enabled() : !0,
      running: t.has(u.id)
    });
  }
  function y() {
    return Object.freeze([...e.values()].map(c).sort((u, x) => u.category.localeCompare(x.category, "zh") || u.title.localeCompare(x.title, "zh")));
  }
  function m(u, x = 20) {
    const C = String(u || "").trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
    if (!C.length) return y().slice(0, x);
    const W = [...e.values()].map((p) => {
      const r = c(p), a = r.title.toLocaleLowerCase(), g = `${r.id} ${a} ${r.category} ${r.description} ${r.keywords.join(" ")}`.toLocaleLowerCase();
      if (!C.every((v) => g.includes(v))) return null;
      let b = 0;
      for (const v of C)
        r.id === v ? b += 200 : r.id.startsWith(v) && (b += 120), a === v ? b += 160 : a.startsWith(v) ? b += 100 : a.includes(v) && (b += 60), r.keywords.some((k) => k.toLocaleLowerCase().startsWith(v)) && (b += 40);
      return { item: r, score: b };
    }).filter((p) => !!p);
    return W.sort((p, r) => r.score - p.score || p.item.title.localeCompare(r.item.title, "zh")), Object.freeze(W.slice(0, Math.max(1, x)).map((p) => p.item));
  }
  return Object.freeze({ register: o, execute: s, cancel: n, has: (u) => e.has(u), list: y, search: m });
}
const gt = Ks(), Gs = /^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/;
function Us(e) {
  const t = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Map();
  function c(p) {
    if (!p || !Gs.test(p.id)) throw new TypeError(`Invalid feature id: ${p?.id || ""}`);
    if (!p.title?.trim() || typeof p.mount != "function") throw new TypeError(`Feature ${p.id} requires title and mount()`);
    if (t.has(p.id)) throw new Error(`Feature already registered: ${p.id}`);
    return t.set(p.id, Object.freeze({
      ...p,
      order: Number(p.order) || 100,
      eager: p.eager === !0,
      roots: Object.freeze([...p.roots || []]),
      capabilities: Object.freeze([...p.capabilities || []])
    })), () => {
      u(p.id), s.delete(p.id), t.delete(p.id);
    };
  }
  function y(p) {
    return typeof p == "function" ? p : p && typeof p.unmount == "function" ? () => p.unmount() : () => {
    };
  }
  function m(p) {
    if (o.has(p)) return Promise.resolve(o.get(p)?.cleanup);
    if (n.has(p)) return n.get(p);
    const r = t.get(p);
    if (!r) return Promise.reject(new Error(`Unknown feature: ${p}`));
    s.delete(p);
    const a = new AbortController(), g = Object.freeze({
      signal: a.signal,
      commands: e,
      getRoot: (v) => document.getElementById(v)
    }), b = Promise.resolve().then(() => r.mount(g)).then((v) => (n.delete(p), o.set(p, { cleanup: v, controller: a }), v), (v) => {
      throw n.delete(p), s.set(p, v), a.abort(), v;
    });
    return n.set(p, b), b;
  }
  async function u(p) {
    const r = n.get(p);
    if (r)
      try {
        await r;
      } catch {
        return;
      }
    const a = o.get(p);
    a && (o.delete(p), a.controller.abort(), await y(a.cleanup)());
  }
  async function x() {
    const p = typeof document < "u" && !!(document.getElementById("vue-spa-root") || document.getElementById("logicweaver-spa-root")), r = [...t.values()].filter((b) => !(!b.eager || !p && b.roots && b.roots.length > 0 && !b.roots.some((k) => !!document.getElementById(k)))).sort((b, v) => (b.order || 100) - (v.order || 100)), g = (await Promise.allSettled(r.map((b) => m(b.id)))).flatMap((b, v) => b.status === "rejected" ? [{ id: r[v].id, reason: b.reason }] : []);
    g.length && console.warn("LogicWeaver Vue features failed to mount", g);
  }
  async function C() {
    const p = [...o.keys()].reverse();
    await Promise.allSettled(p.map(u));
  }
  function W() {
    return Object.freeze([...t.values()].map((p) => Object.freeze({
      id: p.id,
      title: p.title,
      order: p.order || 100,
      eager: p.eager === !0,
      roots: Object.freeze([...p.roots || []]),
      capabilities: Object.freeze([...p.capabilities || []]),
      status: n.has(p.id) ? "mounting" : o.has(p.id) ? "mounted" : s.has(p.id) ? "failed" : "registered",
      error: s.has(p.id) ? String(s.get(p.id)?.message || s.get(p.id) || "Feature mount failed") : ""
    })).sort((p, r) => p.order - r.order));
  }
  return Object.freeze({ register: c, start: m, startEager: x, stop: u, stopAll: C, has: (p) => t.has(p), list: W });
}
const zs = localStorage.getItem("startupAnimationStyle") || localStorage.getItem("logicweaverStartupStyle") || "endfield", $i = (() => {
  try {
    const e = localStorage.getItem("showStartupAnimation"), t = localStorage.getItem("logicweaverEndfieldLoader");
    return e === "0" || e === "false" || t === "0" || t === "false" || document.documentElement.classList.contains("skip-endfield-loader");
  } catch {
    return !1;
  }
})(), ke = Ee({
  enabled: !$i,
  style: zs === "rhinelab" ? "rhinelab" : "endfield",
  renderedProgress: 4,
  targetProgress: 4,
  status: "CORE SHELL...",
  finished: $i,
  exiting: !1,
  forced: !1
});
let Wt = 0, Po = 4, hn = performance.now(), ri = 0, bo = null;
function gn(e) {
  const t = e - hn, o = ri ? Math.min(1, t / ri) : 1, n = o * o * (3 - 2 * o);
  ke.renderedProgress = Po + (ke.targetProgress - Po) * n, o < 1 && !ke.finished ? Wt = requestAnimationFrame(gn) : Wt = 0;
}
function Vs(e, t) {
  if (!ke.enabled || ke.finished) return;
  const o = Math.max(ke.targetProgress, Math.max(4, Math.min(100, Number(e) || 4)));
  t && (ke.status = t), Po = ke.renderedProgress, ke.targetProgress = o, hn = performance.now(), ri = Math.max(280, Math.min(920, 220 + Math.abs(o - Po) * 7.5)), cancelAnimationFrame(Wt), Wt = requestAnimationFrame(gn);
}
function mn(e = "Ready", t = !1) {
  ke.finished || (ke.finished = !0, ke.forced = t, ke.status = e, ke.targetProgress = 100, cancelAnimationFrame(Wt), Wt = 0, ke.renderedProgress = 100, bo?.(t));
}
function Ys(e = "KEYBOARD SKIP") {
  mn(e, !0);
}
const Be = vt(ke), st = Object.freeze({
  update: Vs,
  finish: mn,
  skip: Ys,
  get enabled() {
    return ke.enabled;
  },
  get finished() {
    return ke.finished;
  }
});
function Xs(e) {
  return bo = e, ke.finished && e(ke.forced), () => {
    bo === e && (bo = null);
  };
}
const vn = [
  { date: "今天", dayName: "周四", emoji: "🌤️", condition: "多云", highTemp: 26, lowTemp: 18, rainProb: 15 },
  { date: "明天", dayName: "周五", emoji: "⛅", condition: "阴天", highTemp: 24, lowTemp: 17, rainProb: 30 },
  { date: "后天", dayName: "周六", emoji: "🌧️", condition: "小雨", highTemp: 21, lowTemp: 16, rainProb: 75 },
  { date: "周日", dayName: "周日", emoji: "🌦️", condition: "阵雨", highTemp: 23, lowTemp: 15, rainProb: 45 },
  { date: "周一", dayName: "周一", emoji: "☀️", condition: "晴天", highTemp: 27, lowTemp: 18, rainProb: 10 },
  { date: "周二", dayName: "周二", emoji: "🌤️", condition: "多云", highTemp: 28, lowTemp: 19, rainProb: 15 },
  { date: "周三", dayName: "周三", emoji: "☀️", condition: "晴天", highTemp: 29, lowTemp: 20, rainProb: 5 }
], yn = "lw_weather_snapshot_v1";
function qs() {
  if (typeof window > "u" || typeof localStorage > "u") return null;
  try {
    const e = localStorage.getItem(yn);
    if (!e) return null;
    const t = JSON.parse(e);
    if (t && t.data && t.data.currentTemp !== void 0)
      return {
        state: "ready",
        city: t.city || t.data.cityName || "",
        data: t.data,
        forecastDays: Array.isArray(t.forecastDays) && t.forecastDays.length ? t.forecastDays : vn,
        detailInfo: t.detailInfo || null,
        updatedAt: t.savedAt || Date.now()
      };
  } catch {
  }
  return null;
}
function co(e) {
  if (!(typeof window > "u" || typeof localStorage > "u"))
    try {
      e.data && localStorage.setItem(
        yn,
        JSON.stringify({
          data: e.data,
          city: e.city,
          forecastDays: e.forecastDays,
          detailInfo: e.detailInfo,
          savedAt: e.updatedAt || Date.now()
        })
      );
    } catch {
    }
}
const Js = () => {
  const e = qs();
  return {
    state: e?.state || "loading",
    city: e?.city || "",
    errorMessage: "",
    data: e?.data || null,
    updatedAt: e?.updatedAt || null,
    forecastModalOpen: !1,
    forecastDays: e?.forecastDays || vn,
    detailInfo: e?.detailInfo || {
      humidity: "62%",
      wind: "东北风 2级",
      uvIndex: "中等 (4)",
      airQuality: "优 (32)"
    }
  };
}, N = Ee(Js());
let zo = null, Vo = null;
const Ge = {
  get snapshot() {
    return vt(N);
  },
  update(e) {
    Object.assign(N, e), co(N);
  },
  unconfigured() {
    Object.assign(N, {
      state: "unconfigured",
      city: "",
      errorMessage: "",
      data: null,
      updatedAt: Date.now()
    });
  },
  loading(e = "") {
    if (N.data) {
      e && (N.city = e);
      return;
    }
    Object.assign(N, {
      state: "loading",
      city: e,
      errorMessage: "",
      updatedAt: Date.now()
    });
  },
  ready(e, t = "") {
    Object.assign(N, {
      state: "ready",
      city: t || e.cityName,
      errorMessage: "",
      data: e,
      updatedAt: Date.now()
    }), co(N);
  },
  notFound(e = "") {
    Object.assign(N, {
      state: "not_found",
      city: e,
      errorMessage: `找不到城市「${e}」，右键可重新选择地点。`,
      data: null,
      updatedAt: Date.now()
    });
  },
  error(e = "天气加载失败，右键此处可重新选择地点。", t = "") {
    N.data || Object.assign(N, {
      state: "error",
      city: t,
      errorMessage: e,
      data: null,
      updatedAt: Date.now()
    });
  },
  openForecastModal(e) {
    e && (N.city = e), N.forecastModalOpen = !0;
  },
  closeForecastModal() {
    N.forecastModalOpen = !1;
  },
  setForecastDays(e) {
    N.forecastDays = Array.isArray(e) ? e.map((t) => ({
      dayName: t.dayName || t.day || "",
      date: t.date || "",
      emoji: t.emoji || "🌤️",
      condition: t.condition || t.text || "",
      rainProb: t.rainProb ?? 0,
      lowTemp: t.lowTemp ?? t.tempMin ?? 0,
      highTemp: t.highTemp ?? t.tempMax ?? 0
    })) : [], co(N);
  },
  setDetailInfo(e) {
    N.detailInfo = { ...e }, co(N);
  },
  applyCity(e) {
    typeof window < "u" && window.dispatchEvent(new CustomEvent("logicweaver:weather-city-selected", { detail: { city: e } })), this.refresh();
  },
  refresh() {
    zo ? zo() : typeof window < "u" && window.dispatchEvent(new CustomEvent("logicweaver:weather-refresh"));
  },
  changeLocation(e) {
    Vo ? Vo(e) : typeof window < "u" && window.dispatchEvent(new CustomEvent("logicweaver:weather-change-location", { detail: { clientX: e?.clientX, clientY: e?.clientY } }));
  },
  setRefreshAction(e) {
    zo = e;
  },
  setChangeLocationAction(e) {
    Vo = e;
  }
}, Qs = () => ({
  timeText: "--:--",
  secsText: ":--",
  greetingText: "你好",
  dateText: "",
  fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
  colorHex: "#ffffff",
  greetColor: "#ffffff",
  dateColor: "#ffffff",
  isBlack: !1,
  isCustomColor: !1,
  updatedAt: null
}), fe = Ee(Qs());
let Yo = null;
const $t = {
  get snapshot() {
    return vt(fe);
  },
  update(e) {
    Object.assign(fe, e);
  },
  updateTime(e, t, o, n) {
    fe.timeText = e, fe.secsText = t, fe.greetingText = o, fe.dateText = n, fe.updatedAt = Date.now();
  },
  applyConfig(e) {
    e.fontFamily !== void 0 && (fe.fontFamily = e.fontFamily), e.colorHex !== void 0 && (fe.colorHex = e.colorHex), e.greetColor !== void 0 && (fe.greetColor = e.greetColor), e.dateColor !== void 0 && (fe.dateColor = e.dateColor), e.isBlack !== void 0 && (fe.isBlack = e.isBlack), e.isCustomColor !== void 0 && (fe.isCustomColor = e.isCustomColor), fe.updatedAt = Date.now();
  },
  openSettings(e) {
    Yo ? Yo(e) : window.dispatchEvent(new CustomEvent("logicweaver:clock-open-settings", { detail: { clientX: e?.clientX, clientY: e?.clientY } }));
  },
  setOpenSettingsAction(e) {
    Yo = e;
  }
}, Zs = [
  { id: "ai", title: "AI 助手" },
  { id: "todoist", title: "Todoist" },
  { id: "stickers", title: "表情包" },
  { id: "calcom", title: "预约" },
  { id: "wallpaper", title: "壁纸库" }
], er = () => ({
  mounted: !1,
  visible: !1,
  items: [...Zs]
}), Xo = Ee(er());
let uo = {};
const vi = {
  getSnapshot() {
    return vt(Xo);
  },
  update(e) {
    Object.assign(Xo, e);
  },
  setMounted(e) {
    Xo.mounted = e;
  },
  openWorkspace(e, t = !1) {
    if (uo.open) {
      uo.open(e);
      return;
    }
    const o = typeof window < "u" ? window : {};
    if (e === "todoist") {
      o.LogicWeaverTodoistMainWorkspace?.open(), o.LogicWeaverWindowTabs?.bringToFront("todoist");
      return;
    }
    if (e === "ai") {
      o.LogicWeaverAiDialog?.open();
      return;
    }
    const n = o.LogicWeaverWindowTabs;
    if (n?.open) {
      n.open(e);
      return;
    }
    const s = document.getElementById(`${e}-top-open`);
    s && !t ? s.click() : window.dispatchEvent(new CustomEvent("logicweaver:open-workspace", { detail: { id: e } }));
  },
  setActions(e) {
    uo = { ...uo, ...e };
  }
}, qo = Ee({ visible: !1, pendingWrites: 0 });
async function tr(e) {
  if (qo.pendingWrites) throw new Error("壁纸操作正在处理，未自动排队");
  qo.pendingWrites++;
  try {
    return await e();
  } finally {
    qo.pendingWrites--;
  }
}
const Mi = {
  openDialog() {
    Ue.open("wallpaper");
  },
  closeDialog() {
    Ue.close("wallpaper");
  },
  resetDefault() {
    return tr(() => Io.clearWallpaper());
  }
}, Ii = [
  { id: "mono", label: "极简等宽", font: "ui-monospace, 'SF Mono', 'JetBrains Mono', Menlo, Consolas, monospace", sample: "15:50:10" },
  { id: "sans", label: "现代无衬线", font: "-apple-system, BlinkMacSystemFont, 'Segoe UI Variable Display', 'Segoe UI', Roboto, 'PingFang SC', sans-serif", sample: "15:50:10" },
  { id: "din", label: "经典几何", font: "'DIN Alternate', 'DIN Pro', 'Franklin Gothic Medium', Futura, sans-serif", sample: "15:50:10" },
  { id: "digital", label: "数码管等宽", font: "'Courier New', Courier, monospace", sample: "15:50:10" },
  { id: "impact", label: "硬派力量", font: "Impact, 'Arial Black', 'Trebuchet MS', sans-serif", sample: "15:50:10" },
  { id: "serif", label: "典雅衬线", font: "'Playfair Display', Georgia, 'Times New Roman', serif", sample: "15:50:10" },
  { id: "rounded", label: "圆润亲和", font: "'Quicksand', 'Comic Sans MS', 'Segoe UI', sans-serif", sample: "15:50:10" }
], Ei = [
  { id: "white", label: "纯净皓白 (默认)", hex: "#ffffff" },
  { id: "black", label: "曜石极黑", hex: "#0f172a" },
  { id: "gold", label: "香槟金砂", hex: "#f59e0b" },
  { id: "cyan", label: "科技青蓝", hex: "#38bdf8" },
  { id: "emerald", label: "翡翠竹绿", hex: "#10b981" },
  { id: "rose", label: "淡雅樱粉", hex: "#fb7185" }
], af = [
  { id: "local", label: "📍 本地系统时区", offset: "Local" },
  { id: "Asia/Shanghai", label: "🇨🇳 北京 / 香港", offset: "UTC+8" },
  { id: "Asia/Tokyo", label: "🇯🇵 东京 / 首尔", offset: "UTC+9" },
  { id: "Europe/London", label: "🇬🇧 伦敦 / 格林威治", offset: "UTC+0/+1" },
  { id: "Europe/Paris", label: "🇫🇷 巴黎 / 柏林", offset: "UTC+1/+2" },
  { id: "America/New_York", label: "🇺🇸 纽约 / 东部时间", offset: "UTC-5/-4" },
  { id: "America/Los_Angeles", label: "🇺🇸 洛杉矶 / 西部时间", offset: "UTC-8/-7" },
  { id: "Australia/Sydney", label: "🇦🇺 悉尼", offset: "UTC+10/+11" },
  { id: "UTC", label: "🌐 协调世界时 (UTC)", offset: "UTC" }
], ye = Ee({
  mounted: !1,
  isOpen: !1,
  x: 200,
  y: 200,
  font: "mono",
  color: "white",
  timezone: "local"
});
let Jo = null;
const ft = {
  state: ye,
  setMounted(e) {
    ye.mounted = e;
  },
  onAction(e) {
    Jo = e;
  },
  dispatch(e, t) {
    if (Jo)
      return Jo(e, t);
  },
  open(e) {
    const n = typeof window < "u" ? window.innerWidth : 1280, s = typeof window < "u" ? window.innerHeight : 800, c = e?.clientX ?? e?.x ?? n / 2, y = e?.clientY ?? e?.y ?? s / 2, m = Math.max(12, Math.min(c - 40, n - 290 - 12)), u = Math.max(12, Math.min(y + 10, s - 420 - 12));
    ye.x = m, ye.y = u, ye.isOpen = !0, this.dispatch("open", { x: m, y: u });
  },
  close() {
    ye.isOpen = !1, this.dispatch("close");
  },
  setFont(e) {
    ye.font = e;
    const t = Ii.find((o) => o.id === e);
    if (t) {
      $t.applyConfig({ fontFamily: t.font });
      try {
        localStorage.setItem("lw_clock_font", e);
      } catch {
      }
    }
    this.dispatch("change", { font: e, color: ye.color, timezone: ye.timezone });
  },
  setColor(e) {
    ye.color = e;
    const t = Ei.find((o) => o.id === e);
    if (t) {
      $t.applyConfig({
        colorHex: t.hex,
        greetColor: t.hex,
        dateColor: t.hex,
        isCustomColor: !0
      });
      try {
        localStorage.setItem("lw_clock_color", e);
      } catch {
      }
    }
    this.dispatch("change", { font: ye.font, color: e, timezone: ye.timezone });
  },
  setTimezone(e) {
    ye.timezone = e;
    try {
      localStorage.setItem("lw_clock_tz", e);
    } catch {
    }
    this.dispatch("change", { font: ye.font, color: ye.color, timezone: e });
  },
  initPreferences() {
    try {
      const e = localStorage.getItem("lw_clock_font");
      if (e) {
        ye.font = e;
        const n = Ii.find((s) => s.id === e);
        n && $t.applyConfig({ fontFamily: n.font });
      }
      const t = localStorage.getItem("lw_clock_color");
      if (t) {
        ye.color = t;
        const n = Ei.find((s) => s.id === t);
        n && $t.applyConfig({ colorHex: n.hex, greetColor: n.hex, dateColor: n.hex, isCustomColor: !0 });
      }
      const o = localStorage.getItem("lw_clock_tz");
      o && (ye.timezone = o);
    } catch {
    }
  },
  syncConfig(e) {
    e.font && (ye.font = e.font), e.color && (ye.color = e.color), e.timezone && (ye.timezone = e.timezone);
  }
}, se = Ee({
  mounted: !1,
  isOpen: !1,
  model: "gemini-3.6-flash",
  statusText: "就绪 · Google Gemini 3.6 Flash（极速 · 100万上下文）",
  authHidden: !0,
  authCode: "",
  authLink: "https://auth.openai.com/codex/device",
  messages: [],
  inputText: "",
  charCountText: "0 / 60,000 字符",
  isStreaming: !1,
  kwShelfHidden: !0,
  keywords: []
});
let Qo = null, ko = !1;
async function _o(e, t = {}) {
  if (e === "poll") return { state: "ready", model: se.model };
  if (e === "connect") return { state: "ready", model: se.model };
  throw new Error("旧版 AI 对话桥接已退役，请使用「海狸聊天室」开启智能会话。");
}
function wn(e) {
  if (!e) return;
  const t = {
    disconnected: "未连接",
    connecting: "正在连接…",
    login: "等待你在官方页面授权…",
    ready: "就绪",
    running: "正在生成…",
    failed: "请求失败"
  };
  let o = e.error;
  o || (e.state === "connecting" ? o = "正在连接本机 Codex 与 ChatGPT…" : e.state === "disconnected" ? o = "已待命（打开面板自动连接）" : e.authenticated ? o = `就绪 · ChatGPT ${e.plan || "已登录"}` : e.state === "ready" ? o = "就绪 · 尚未登录 ChatGPT" : o = t[e.state] || e.state), se.statusText = o, se.authHidden = !e.loginUrl, se.authCode = e.loginCode || "", se.authLink = e.loginUrl || "https://auth.openai.com/codex/device", se.isStreaming = ko || e.busy || e.state === "running";
}
async function or() {
  try {
    const e = await _o("poll");
    wn(e);
  } catch {
  }
}
async function ir(e, t) {
  if (e === "open" || e === "connect")
    try {
      se.statusText = "正在连接本机 Codex 与 ChatGPT…";
      const o = await _o("connect");
      wn(o);
    } catch (o) {
      se.statusText = o?.message || "连接失败";
    }
  else if (e === "send" && t?.text) {
    const o = t.text;
    se.messages.push({
      id: `msg-${Date.now()}`,
      role: "user",
      content: o
    }), se.inputText = "", se.isStreaming = !0, ko = !0;
    try {
      await _o("send", { text: o }), await or();
    } catch (n) {
      se.statusText = n?.message || "发送失败";
    } finally {
      ko = !1, se.isStreaming = !1;
    }
  } else if (e === "stop") {
    try {
      await _o("stop");
    } catch {
    }
    se.isStreaming = !1, ko = !1;
  }
}
const yi = {
  state: se,
  setMounted(e) {
    se.mounted = e;
  },
  onAction(e) {
    Qo = e;
  },
  dispatch(e, t) {
    if (Qo)
      return Qo(e, t);
    ir(e, t);
  },
  open() {
    se.isOpen = !0, this.dispatch("open");
  },
  close() {
    se.isOpen = !1, this.dispatch("close");
  },
  newChat() {
    se.messages = [], se.inputText = "", se.kwShelfHidden = !0, se.keywords = [], this.dispatch("newChat");
  },
  send() {
    const e = se.inputText.trim();
    !e || se.isStreaming || this.dispatch("send", { text: e });
  },
  stop() {
    se.isStreaming = !1, this.dispatch("stop");
  },
  extractKeywords() {
    this.dispatch("extractKeywords");
  },
  addSummaryPrompt() {
    this.dispatch("addSummaryPrompt");
  },
  copyChat() {
    this.dispatch("copyChat");
  },
  selectAllKeywords(e) {
    se.keywords.forEach((t) => t.selected = e), this.dispatch("selectAllKeywords", { all: e });
  },
  toggleKeyword(e) {
    se.keywords[e] && (se.keywords[e].selected = !se.keywords[e].selected, this.dispatch("toggleKeyword", { index: e, selected: se.keywords[e].selected }));
  },
  deepDiveKeywords() {
    const e = se.keywords.filter((t) => t.selected).map((t) => t.text);
    this.dispatch("deepDiveKeywords", { selected: e });
  }
}, Zo = Ee({
  open: !1,
  loading: !1,
  saving: !1,
  error: !1,
  status: "",
  taskId: "",
  context: "",
  url: "",
  title: "",
  description: "",
  dueDate: ""
}), po = /* @__PURE__ */ new Set(), nr = {
  state: Zo,
  open(e) {
    Object.assign(Zo, e, { open: !0 });
  },
  update(e) {
    Object.assign(Zo, e);
  },
  close() {
    po.forEach((e) => e("close"));
  },
  save(e) {
    po.forEach((t) => t("save", e));
  },
  onAction(e) {
    return po.add(e), () => po.delete(e);
  }
}, Co = Ee({ isOpen: !1 }), bn = {
  state: Co,
  open() {
    Co.isOpen = !0;
  },
  close() {
    Co.isOpen = !1;
  }
}, ei = "biliProfileCacheV1", Qe = "biliLocallyKnownMessageIdsV1", fo = "biliMessageUserCacheV1", Rt = "githubKnownReleaseVersionsV1", ho = "customNewtabAvatar", Di = "biliToastKnownCountsV1";
class sr {
  constructor() {
    this.customAvatar = "", this.profile = null, this.unread = {}, this.locallyKnownIds = {}, this.userCache = {}, this.activeKind = "reply", this.messageRequestId = 0, this.isBiliRefreshing = !1, this.biliToastKnownCounts = null, this.githubUpdates = [], this.githubResults = [], this.githubLastRun = "", this.githubTracked = 0, this.githubLoading = !1, this.githubKnownVersions = {}, this.githubListeners = /* @__PURE__ */ new Set(), this.initialized = !1, this.init();
  }
  // ---------- GitHub Star Release Updates ----------
  getGitHubSnapshot() {
    const t = this.githubUpdates.filter(
      (o) => o.repository && o.version && this.githubKnownVersions[o.repository] !== o.version
    ).length;
    return {
      updates: this.githubUpdates.map((o) => ({
        ...o,
        known: this.githubKnownVersions[o.repository] === o.version
      })),
      unread: t,
      tracked: this.githubTracked,
      lastRun: this.githubLastRun,
      loading: this.githubLoading
    };
  }
  notifyGitHubListeners() {
    const t = this.getGitHubSnapshot();
    for (const o of this.githubListeners)
      try {
        o(t);
      } catch {
      }
  }
  subscribeGitHubUpdates(t) {
    return this.githubListeners.add(t), t(this.getGitHubSnapshot()), () => this.githubListeners.delete(t);
  }
  async acknowledgeGitHubUpdate(t) {
    !t?.repository || !t?.version || (this.githubKnownVersions[t.repository] = t.version, typeof chrome < "u" && chrome?.storage?.local && await chrome.storage.local.set({ [Rt]: this.githubKnownVersions }), this.notifyGitHubListeners());
  }
  async loadGitHubUpdates(t = !1) {
    if (!(this.githubLoading && !t)) {
      this.githubLoading = !0, this.notifyGitHubListeners();
      try {
        this.githubUpdates = [], this.githubResults = [], this.githubLastRun = "", this.githubTracked = 0;
      } finally {
        this.githubLoading = !1, this.notifyGitHubListeners();
      }
    }
  }
  // ---------- B站用户资料与消息 ----------
  getVisibleUnread() {
    const t = {};
    let o = !1;
    return ["reply", "at", "like", "system", "private"].forEach((s) => {
      const c = Math.max(0, Number(this.unread?.[s] || 0));
      let y = Array.isArray(this.locallyKnownIds?.[s]) ? this.locallyKnownIds[s] : [];
      c < y.length && (y = [], this.locallyKnownIds[s] = [], o = !0), t[s] = Math.max(0, c - y.length);
    }), o && typeof chrome < "u" && chrome?.storage?.local && chrome.storage.local.set({ [Qe]: this.locallyKnownIds }).catch(() => {
    }), t;
  }
  markKnown(t, o, n) {
    this.locallyKnownIds[t] || (this.locallyKnownIds[t] = []);
    let s = !1;
    o && !this.locallyKnownIds[t].includes(o) && (this.locallyKnownIds[t].push(o), s = !0), n && !this.locallyKnownIds[t].includes(n) && (this.locallyKnownIds[t].push(n), s = !0), s && typeof chrome < "u" && chrome?.storage?.local && chrome.storage.local.set({ [Qe]: this.locallyKnownIds }).catch(() => {
    }), this.applyBiliProfile(this.profile, this.unread);
  }
  markAllKnown(t, o = []) {
    this.locallyKnownIds[t] || (this.locallyKnownIds[t] = []);
    const n = new Set(this.locallyKnownIds[t]);
    for (const c of o) c && n.add(c);
    const s = Math.max(0, Number(this.unread?.[t] || 0));
    if (n.size < s) {
      const c = s - n.size;
      for (let y = 0; y < c; y++) n.add(`__pad_${Date.now()}_${y}`);
    }
    this.locallyKnownIds[t] = Array.from(n), typeof chrome < "u" && chrome?.storage?.local && chrome.storage.local.set({ [Qe]: this.locallyKnownIds }).catch(() => {
    }), this.applyBiliProfile(this.profile, this.unread);
  }
  applyBiliProfile(t, o = {}) {
    this.profile = t || null, this.unread = o || {};
    const s = this.customAvatar || String(t?.face || "assets/bilibili.svg").replace(/^http:/, "https:"), c = this.getVisibleUnread();
    if (xt.avatarUrl = s, xt.userName = t?.uname || "哔哩哔哩用户", xt.buttonTitle = "通知中心", Go.avatarUrl = s, Go.userName = t?.uname || "用户", Go.mid = t?.mid, typeof document < "u") {
      const y = document.getElementById("bili-profile-avatar");
      y && (y.src = s);
      const m = document.getElementById("bili-profile-button");
      m && (m.title = xt.buttonTitle);
    }
    pt.updateState({
      userName: t?.uname || "哔哩哔哩用户",
      userMid: t?.mid ? String(t.mid) : "",
      userAvatar: s,
      unreadCounts: {
        reply: Number(c.reply || 0),
        at: Number(c.at || 0),
        like: Number(c.like || 0),
        system: Number(c.system || 0),
        private: Number(c.private || 0)
      }
    });
  }
  async refreshBiliProfile() {
    if (!this.isBiliRefreshing) {
      this.isBiliRefreshing = !0;
      try {
        const o = await (await fetch("https://api.bilibili.com/x/web-interface/nav", { credentials: "include" })).json();
        if (!o?.data?.isLogin) throw new Error("未登录");
        const n = {
          mid: o.data.mid,
          uname: o.data.uname,
          face: o.data.face
        }, [s, c, y] = await Promise.allSettled([
          fetch("https://api.bilibili.com/x/msgfeed/unread?build=0&mobi_app=web", { credentials: "include" }).then((r) => r.json()),
          fetch("https://api.vc.bilibili.com/x/im/web/msgfeed/unread", { credentials: "include" }).then((r) => r.json()),
          fetch("https://api.vc.bilibili.com/session_svr/v1/session_svr/single_unread", { credentials: "include" }).then((r) => r.json())
        ]), m = s.status === "fulfilled" ? s.value?.data || {} : {}, u = c.status === "fulfilled" ? c.value?.data || {} : {}, x = y.status === "fulfilled" ? y.value?.data || {} : {}, C = Number(u.at || 0), W = u.reply != null ? Number(u.reply || 0) : Math.max(0, Number(u.recv_reply || 0) - C), p = {
          reply: Math.max(Number(m.reply || 0), W),
          at: Math.max(Number(m.at || 0), C),
          like: Math.max(
            Number(m.like || m.praise || 0),
            Number(u.like || u.recv_like || 0)
          ),
          system: Math.max(Number(m.sys_msg || m.system || 0), Number(u.sys_msg || 0)),
          private: Number(
            m.chat || u.chat || Number(x.follow_unread || 0) + Number(x.unfollow_unread || 0) + Number(x.dustbin_push_msg || 0)
          )
        };
        this.applyBiliProfile(n, p), typeof chrome < "u" && chrome?.storage?.local && await chrome.storage.local.set({ [ei]: { profile: n, unread: p, savedAt: Date.now() } }), this.checkAndNotifyBiliInteractions(p);
      } catch {
        this.applyBiliProfile(null, {});
      } finally {
        this.isBiliRefreshing = !1;
      }
    }
  }
  checkAndNotifyBiliInteractions(t) {
    if (!t || typeof t != "object") return;
    const o = {
      like: Number(t.like || 0),
      private: Number(t.private || 0),
      reply: Number(t.reply || 0),
      at: Number(t.at || 0),
      system: Number(t.system || 0)
    };
    if (this.biliToastKnownCounts === null) {
      this.biliToastKnownCounts = { ...o }, typeof chrome < "u" && chrome?.storage?.local && chrome.storage.local.set({ [Di]: this.biliToastKnownCounts }).catch(() => {
      });
      return;
    }
    const n = o.private - Number(this.biliToastKnownCounts.private || 0);
    o.like - Number(this.biliToastKnownCounts.like || 0);
    const s = o.reply - Number(this.biliToastKnownCounts.reply || 0), c = o.at - Number(this.biliToastKnownCounts.at || 0);
    o.system - Number(this.biliToastKnownCounts.system || 0), this.biliToastKnownCounts = { ...o }, typeof chrome < "u" && chrome?.storage?.local && chrome.storage.local.set({ [Di]: this.biliToastKnownCounts }).catch(() => {
    }), n > 0 && Ie.show({
      appType: "bili",
      appName: "哔哩哔哩",
      icon: "assets/bilibili.svg",
      title: n > 1 ? `收到 ${n} 条新私信` : "收到新的私信",
      subtitle: "B站私信消息",
      message: "有人给你发送了私信，点击查看对话",
      actionLabel: "查看私信",
      showActions: !0,
      onClick: () => {
        pt.openPanel();
      }
    }), s > 0 && Ie.show({
      appType: "bili",
      appName: "哔哩哔哩",
      icon: "assets/bilibili.svg",
      title: s > 1 ? `收到 ${s} 条新回复` : "收到新的评论回复",
      subtitle: "评论回复通知",
      message: "有人在评论区回复了你",
      actionLabel: "查看回复",
      showActions: !0,
      onClick: () => {
        pt.openPanel();
      }
    }), c > 0 && Ie.show({
      appType: "bili",
      appName: "哔哩哔哩",
      icon: "assets/bilibili.svg",
      title: c > 1 ? `收到 ${c} 次新提及` : "有人 @了你",
      subtitle: "提到我的通知",
      message: "有人在动态或评论中 @了你",
      actionLabel: "查看提及",
      showActions: !0,
      onClick: () => {
        pt.openPanel();
      }
    });
  }
  init() {
    this.initialized || (this.initialized = !0, ro.setActions({
      onAction: async (t) => {
        if (t === "messages")
          mt.open();
        else if (t === "tabs")
          bn.open();
        else if (t === "refresh")
          await this.refreshBiliProfile();
        else if (t === "switch")
          typeof chrome < "u" && chrome?.tabs?.create ? chrome.tabs.create({ url: "https://passport.bilibili.com/login?gourl=https%3A%2F%2Fwww.bilibili.com%2F", active: !0 }) : window.open("https://passport.bilibili.com/login?gourl=https%3A%2F%2Fwww.bilibili.com%2F", "_blank");
        else if (t === "web") {
          const o = this.profile?.mid, n = o ? `https://space.bilibili.com/${o}` : "https://www.bilibili.com/";
          typeof chrome < "u" && chrome?.tabs?.create ? chrome.tabs.create({ url: n, active: !0 }) : window.open(n, "_blank");
        }
      }
    }), typeof chrome < "u" && chrome?.storage?.local && (chrome.storage.local.get([
      ei,
      Qe,
      fo,
      Rt,
      ho
    ]).then((t) => {
      this.customAvatar = t[ho] || "", this.locallyKnownIds = t[Qe] && typeof t[Qe] == "object" ? t[Qe] : {}, this.userCache = t[fo] && typeof t[fo] == "object" ? t[fo] : {}, this.githubKnownVersions = t[Rt] && typeof t[Rt] == "object" ? t[Rt] : {};
      const o = t[ei];
      o?.profile ? this.applyBiliProfile(o.profile, o.unread || {}) : this.applyBiliProfile(null, {});
    }).catch(() => {
    }), chrome.storage.onChanged && chrome.storage.onChanged.addListener((t, o) => {
      o === "local" && (t[ho] && (this.customAvatar = t[ho].newValue || "", this.applyBiliProfile(this.profile, this.unread)), t[Qe] && (this.locallyKnownIds = t[Qe].newValue || {}, this.applyBiliProfile(this.profile, this.unread)));
    })), pt.onAction((t, o) => {
      t === "mark-known" ? this.markKnown(o.kind, o.id, o.talkerId) : t === "mark-all-known" && this.markAllKnown(o.kind, o.ids);
    }), this.refreshBiliProfile(), setTimeout(() => {
      this.loadGitHubUpdates();
    }, 3500));
  }
}
const Pi = new sr(), ae = Ee({ open: !1, loading: !1, error: "", mid: "", name: "", face: "", sign: "", followed: !1, submitting: !1, left: 12, top: 12, videos: [] });
let go = null;
const xo = {
  state: ae,
  open(e, t) {
    go = t, Object.assign(ae, { open: !0, loading: !0, error: "", submitting: !1, videos: [] }, e);
  },
  update(e) {
    Object.assign(ae, e);
  },
  close() {
    ae.submitting || (ae.open = !1, go = null);
  },
  async toggleFollow() {
    if (!(!go || ae.submitting)) {
      ae.submitting = !0;
      try {
        const e = !ae.followed;
        await go(e) && (ae.followed = e);
      } finally {
        ae.submitting = !1;
      }
    }
  }
}, ai = () => ({
  icon: "🧭",
  title: "快捷轮盘",
  desc: "移动鼠标选择",
  active: !1
}), wi = () => ({
  visible: !1,
  wedgePath: "",
  arcPath: "",
  line1: { x1: 0, y1: 0, x2: 0, y2: 0 },
  line2: { x1: 0, y1: 0, x2: 0, y2: 0 }
}), z = Ee({
  mounted: !1,
  isOpen: !1,
  isExpanded: !1,
  mode: "main",
  ballPosition: { x: 0, y: 0 },
  hub: ai(),
  activeSectorId: null,
  sectors: [],
  beam: wi()
});
let Ai = null;
function rr(e, t) {
  if (typeof e != "number" || !t)
    return wi();
  const o = 160, n = 160, s = 26, c = 154, y = 360 / t, m = e - y / 2, u = e + y / 2, x = m * Math.PI / 180, C = u * Math.PI / 180, W = o + s * Math.cos(x), p = n + s * Math.sin(x), r = o + c * Math.cos(x), a = n + c * Math.sin(x), g = o + s * Math.cos(C), b = n + s * Math.sin(C), v = o + c * Math.cos(C), k = n + c * Math.sin(C), $ = y > 180 ? 1 : 0, M = `M ${W.toFixed(1)} ${p.toFixed(1)} L ${r.toFixed(1)} ${a.toFixed(1)} A ${c} ${c} 0 ${$} 1 ${v.toFixed(1)} ${k.toFixed(1)} L ${g.toFixed(1)} ${b.toFixed(1)} A ${s} ${s} 0 ${$} 0 ${W.toFixed(1)} ${p.toFixed(1)} Z`, U = `M ${r.toFixed(1)} ${a.toFixed(1)} A ${c} ${c} 0 ${$} 1 ${v.toFixed(1)} ${k.toFixed(1)}`;
  return {
    visible: !0,
    wedgePath: M,
    arcPath: U,
    line1: {
      x1: parseFloat(W.toFixed(1)),
      y1: parseFloat(p.toFixed(1)),
      x2: parseFloat(r.toFixed(1)),
      y2: parseFloat(a.toFixed(1))
    },
    line2: {
      x1: parseFloat(g.toFixed(1)),
      y1: parseFloat(b.toFixed(1)),
      x2: parseFloat(v.toFixed(1)),
      y2: parseFloat(k.toFixed(1))
    }
  };
}
const ge = {
  get state() {
    return z;
  },
  getSnapshot() {
    return vt(z);
  },
  setMounted(e) {
    z.mounted = e;
  },
  setBallPosition(e, t) {
    z.ballPosition.x = e, z.ballPosition.y = t;
  },
  setVisibility(e) {
    z.isOpen = e;
  },
  setHub(e) {
    e ? z.hub = {
      icon: e.icon || "🧭",
      title: e.title || "快捷轮盘",
      desc: e.desc || "移动鼠标选择",
      active: !!e.active
    } : z.hub = ai();
  },
  setBeam(e, t) {
    z.beam = rr(e, t);
  },
  setActiveSector(e) {
    z.activeSectorId = e;
  },
  setSectors(e) {
    z.sectors = [...e];
  },
  expand(e, t, o = "main") {
    z.isOpen = !0, z.isExpanded = !0, z.mode = o, typeof e == "number" && typeof t == "number" && this.setBallPosition(e, t);
  },
  collapse() {
    z.isExpanded = !1, z.mode = "main", z.activeSectorId = null, z.beam = wi(), z.hub = ai();
  },
  setWheelMode(e) {
    z.mode = e;
  },
  setActionHandler(e) {
    Ai = e;
  },
  dispatch(e, t) {
    Ai?.(e, t);
  }
}, kn = [
  { id: "daily-bilibili", title: "b站插件", desc: "B站收藏夹与追番视频", icon: "assets/bilibili.svg" },
  { id: "daily-pricing", title: "模型插件", desc: "AI 模型定价与排行榜", icon: "assets/nav-pricing.svg" },
  { id: "daily-aihot", title: "ai hot插件", desc: "全网 AI 与前沿科技资讯", icon: "assets/nav-aihot.svg" },
  { id: "folder", title: "常用网站", desc: "点击展开快捷网站子轮盘", icon: "assets/nav-folder.svg", mode: "shortcuts" },
  { id: "card-github", title: "github插件", desc: "GitHub 趋势与星标项目", icon: "assets/nav-github.svg" },
  { id: "launcher", title: "首页", desc: "返回主屏常用应用台", icon: "assets/nav-home.svg" }
];
function ar() {
  return kn.filter((e) => e.mode || e.id === "launcher" || Eo(e.id));
}
function lr() {
  return xs.filter((e) => e.kind === "module" && Eo(e.id)).map((e) => ({
    id: e.id,
    title: e.title,
    desc: e.isDev ? "已启用的实验性组件" : e.categoryLabel,
    icon: e.icon || e.emoji || "🧩",
    tool: e.id
  }));
}
function Wi() {
  z.isExpanded && no();
}
let li = [], Zt = kn, Ze = { x: 400, y: 300 }, Yt = !1, jt = !1, Kt = null;
function mo() {
  return globalThis.chrome?.storage;
}
function bi(e, t) {
  const o = z.isExpanded ? 160 : 24;
  ge.setBallPosition(
    Math.max(o + 8, Math.min(window.innerWidth - o - 8, e)),
    Math.max(o + 8, Math.min(window.innerHeight - o - 8, t))
  );
}
function no() {
  const e = z.mode;
  Zt = e === "tools" ? lr() : e === "shortcuts" ? [
    ...li.length ? li : [{ id: "shortcut-empty", title: "暂无快捷项", desc: "常用网站可放入快捷轮盘", icon: "📭" }],
    { id: "back-to-main", title: "返回主轮盘", desc: "返回页面电梯导航", icon: "🔙", mode: "main" }
  ] : ar();
  const t = Zt.length, o = t > 12 ? 118 : t > 9 ? 114 : 110, n = t > 12 ? 46 : t > 9 ? 50 : 56;
  ge.setSectors(Zt.map((s, c) => {
    const y = -90 + 360 / t * c, m = y * Math.PI / 180;
    return {
      id: s.id,
      title: s.title,
      desc: s.desc,
      icon: s.icon,
      angleDeg: y,
      x: Math.round(160 + Math.cos(m) * o),
      y: Math.round(160 + Math.sin(m) * o),
      size: n,
      isShortcut: !!s.url
    };
  })), ge.setWheelMode(e), ge.setActiveSector(null), ge.setBeam(null, 0), ge.setHub(e === "shortcuts" ? { icon: "🔙", title: "快捷方式" } : e === "tools" ? { icon: "🧰", title: "常用工具" } : null);
}
function Ao(e) {
  z.mode = e, no();
}
function ht() {
  ge.collapse(), bi(z.ballPosition.x, z.ballPosition.y), ge.setVisibility(Yt);
}
function Ct(e = z.ballPosition.x, t = z.ballPosition.y, o = "main") {
  ge.expand(void 0, void 0, o), bi(e, t), no(), ge.setVisibility(!0);
}
function cr(e) {
  if (!(e.tool && !Eo(e.tool) || !e.url && !e.mode && e.id !== "launcher" && !Eo(e.id))) {
    if (e.mode) {
      Ao(e.mode);
      return;
    }
    if (ht(), e.url) {
      window.open(e.url, "_blank");
      return;
    }
    if (e.tool) {
      window.triggerToolShortcut?.(e.tool);
      return;
    }
    e.id === "launcher" ? (typeof window < "u" && window.scrollTo({ top: 0, left: 0, behavior: "instant" }), nt.exit(), document.body && (document.body.dataset.page = "home")) : nt.enter(e.id);
  }
}
function Oi(e) {
  Ze = { x: e.clientX, y: e.clientY };
}
function Bi(e) {
  e.button === 1 && (e.preventDefault(), e.stopPropagation(), Ze = { x: e.clientX, y: e.clientY }, z.isExpanded ? ht() : Ct(e.clientX, e.clientY));
}
function Fi(e) {
  e.button === 1 && e.preventDefault();
}
function Ni(e) {
  !z.isExpanded || gi.active || (e.key === "Escape" || e.altKey && e.key.toLowerCase() === "w") && (e.preventDefault(), e.stopPropagation(), z.mode === "shortcuts" ? Ao("main") : ht());
}
function dr(e) {
  try {
    const t = globalThis.chrome;
    if (typeof t?.runtime?.getURL == "function")
      return t.runtime.getURL("_favicon/?pageUrl=" + encodeURIComponent(e) + "&size=64");
  } catch {
  }
  return "";
}
function ur(e) {
  const t = e.customIcon || e.icon;
  if (t && typeof t == "string" && !/google\.com\/s2\/favicons|icons\.duckduckgo/i.test(t))
    return t;
  if (e.url) {
    const o = Z.getCachedIcon(e.url);
    if (o) return o;
    const n = dr(e.url);
    if (n) return n;
  }
  return e.icon || "🔗";
}
const tt = {
  async start() {
    if (!jt) {
      jt = !0, Ze = { x: Math.round(window.innerWidth / 2), y: Math.round(window.innerHeight / 2) }, ge.setActionHandler((e, t) => {
        if (e === "hub:click")
          z.isExpanded ? z.mode === "shortcuts" ? Ao("main") : ht() : Ct();
        else if (e === "sector:click" || e === "container:click") {
          const o = Zt.find((n) => n.id === t?.id || e === "container:click" && n.id === z.activeSectorId);
          o && cr(o);
        } else if (e === "sector:hover") {
          const o = z.sectors.find((n) => n.id === t?.id);
          o && (ge.setHub({ icon: o.icon, title: o.title, desc: o.desc, active: !0 }), ge.setActiveSector(o.id), ge.setBeam(o.angleDeg, Zt.length));
        } else e === "sector:leave" && (ge.setActiveSector(null), ge.setBeam(null, 0), ge.setHub(z.mode === "shortcuts" ? { icon: "🔙", title: "快捷方式" } : z.mode === "tools" ? { icon: "🧰", title: "常用工具" } : null));
      }), window.addEventListener("logicweaver:dock-modules-changed", Wi), window.addEventListener("pointermove", Oi, { passive: !0 }), window.addEventListener("mousedown", Bi, !0), window.addEventListener("auxclick", Fi, !0), window.addEventListener("keydown", Ni, !0), Kt = (e, t) => {
        t === "local" && (e.showNavBall && (Yt = !!e.showNavBall.newValue, ge.setVisibility(Yt || z.isExpanded)), (e.siteShelfLinks || e.logicweaverNavWheelShortcutsV1) && this.loadShortcuts());
      }, mo()?.onChanged?.addListener(Kt);
      try {
        const e = await mo()?.local?.get(["showNavBall", "navBallPosition"]);
        if (!jt) return;
        Yt = !!e?.showNavBall;
        const t = e?.navBallPosition;
        bi(
          typeof t?.x == "number" ? t.x : 28,
          typeof t?.y == "number" ? t.y : Math.min(window.innerHeight - 60, 180)
        ), ge.setVisibility(Yt);
      } catch {
      }
      await this.loadShortcuts(), no();
    }
  },
  stop() {
    jt = !1, ge.setActionHandler(null), window.removeEventListener("logicweaver:dock-modules-changed", Wi), window.removeEventListener("pointermove", Oi), window.removeEventListener("mousedown", Bi, !0), window.removeEventListener("auxclick", Fi, !0), window.removeEventListener("keydown", Ni, !0), Kt && mo()?.onChanged?.removeListener(Kt), Kt = null;
  },
  async loadShortcuts() {
    try {
      const e = await mo()?.local?.get(["siteShelfLinks", "logicweaverNavWheelShortcutsV1"]);
      if (!jt) return;
      const t = e?.siteShelfLinks?.length ? e.siteShelfLinks : e?.logicweaverNavWheelShortcutsV1;
      li = (Array.isArray(t) ? t : []).map((o, n) => ({
        id: String(o.id || `wheel-${n}`),
        title: String(o.title || o.url || "快捷网站"),
        desc: String(o.url || ""),
        url: String(o.url || ""),
        icon: ur(o)
      })), z.mode === "shortcuts" && no();
    } catch (e) {
      console.warn("[NavWheel] 读取快捷方式失败", e);
    }
  },
  open(e, t) {
    Ct(e ?? Ze.x, t ?? Ze.y);
  },
  close: ht,
  toggle(e = !1) {
    z.isExpanded ? ht() : e ? Ct(Ze.x, Ze.y) : Ct();
  },
  toggleTools(e = !0) {
    z.isExpanded && z.mode === "tools" ? ht() : Ct(
      e ? Ze.x : z.ballPosition.x,
      e ? Ze.y : z.ballPosition.y,
      "tools"
    );
  },
  setMode(e) {
    Ao(e);
  }
};
class Mt {
  constructor() {
    this.activeShortcuts = { ...Uo }, this.isListenerBound = !1, this.storageListenerBound = !1, this.shortcutReadVersion = 0, this.initShortcuts();
  }
  static getInstance() {
    return Mt.instance || (Mt.instance = new Mt()), Mt.instance;
  }
  getShortcuts() {
    return { ...this.activeShortcuts };
  }
  async setShortcut(t, o) {
    if (typeof t != "string" || !t || typeof o != "string")
      throw new Error("快捷键参数无效，未保存");
    if (typeof chrome > "u" || !chrome.storage?.local)
      throw new Error("快捷键存储不可用，未保存");
    const { optionsService: n, SHORTCUT_STORAGE_KEY: s } = await import("./options.service-CWLVzZjp.js").then((C) => C.c), y = (await chrome.storage.local.get(s))[s], m = { ...y || {}, [t]: o }, u = this.shortcutReadVersion, x = await n.saveSettings(
      { [s]: m },
      { [s]: y }
    );
    u === this.shortcutReadVersion && (++this.shortcutReadVersion, this.applyShortcutOverrides(x[s]));
  }
  applyShortcutOverrides(t) {
    const o = t && typeof t == "object" && !Array.isArray(t) ? Object.entries(t).filter((n) => Object.prototype.hasOwnProperty.call(Uo, n[0]) && typeof n[1] == "string") : [];
    this.activeShortcuts = { ...Uo, ...Object.fromEntries(o) };
  }
  async initShortcuts() {
    if (!(typeof chrome > "u" || !chrome.storage?.local))
      try {
        !this.storageListenerBound && chrome.storage?.onChanged?.addListener && (chrome.storage.onChanged.addListener((n, s) => {
          s === "local" && Object.prototype.hasOwnProperty.call(n, "customShortcuts") && (++this.shortcutReadVersion, this.applyShortcutOverrides(n.customShortcuts.newValue));
        }), this.storageListenerBound = !0);
        const t = ++this.shortcutReadVersion, o = await chrome.storage.local.get("customShortcuts");
        t === this.shortcutReadVersion && this.applyShortcutOverrides(o?.customShortcuts);
      } catch {
      }
  }
  /**
   * 分发触发指定工具的快捷动作
   */
  triggerToolShortcut(t) {
    if (!t || !Si(t)) return !1;
    if (Do(t))
      return Ue.handleToolClick(t), !0;
    switch (t) {
      case "bookmarks":
        return No.toggle(), !0;
      case "settings":
        return Ho.open(), !0;
      case "nav-wheel":
        return tt.toggle(!0), !0;
      case "toolbox":
        return tt.toggleTools(!0), !0;
      case "pricing":
        return nt.enter("daily-pricing"), !0;
      case "search": {
        if (typeof document < "u") {
          const o = document.getElementById("search-input");
          if (o)
            return o.focus(), o.select(), !0;
        }
        return !1;
      }
      case "todoist-new-task":
        return typeof window < "u" && typeof window.triggerTodoistQuickAdd == "function" ? window.triggerTodoistQuickAdd() : Ue.handleToolClick("todoist"), !0;
      default: {
        const o = window.LogicWeaverWindowTabs;
        return o?.isOpen?.(t) ? (o.isActive?.(t) ? o.minimize(t) : o.activate(t), !0) : o?.open ? (o.open(t), !0) : !1;
      }
    }
  }
  /**
   * 绑定全局键盘监听器
   */
  bindGlobalListener() {
    this.isListenerBound || typeof window > "u" || (this.isListenerBound = !0, window.addEventListener(
      "keydown",
      (t) => {
        if (gi.active || t.defaultPrevented || t.isComposing || t.repeat) return;
        if (nt.activeId && t.altKey && t.key.toLowerCase() === "w") {
          t.preventDefault(), t.stopPropagation(), nt.exit();
          return;
        }
        if (t.target && (t.target.matches("input, textarea, select") || t.target.isContentEditable) && !t.altKey && !t.ctrlKey && !t.metaKey)
          return;
        const n = Ls(t);
        if (!n) return;
        const s = n.toLowerCase();
        for (const [c, y] of Object.entries(this.activeShortcuts))
          if (!(!y || !Si(c)) && y.toLowerCase().replace(/^cmd\+/, "meta+") === s) {
            t.preventDefault(), t.stopPropagation(), this.triggerToolShortcut(c);
            break;
          }
      },
      !0
    ));
  }
}
const ci = Mt.getInstance();
class It {
  constructor() {
    this._isVisible = F(typeof document < "u" ? !document.hidden : !0), this.callbacks = /* @__PURE__ */ new Set(), this.activeIntervals = /* @__PURE__ */ new Set(), typeof document < "u" && document.addEventListener("visibilitychange", () => {
      const t = !document.hidden;
      if (this._isVisible.value = t, t) {
        this.resumeIntervals();
        try {
          window.dispatchEvent(new CustomEvent("logicweaver:page-visible"));
        } catch {
        }
      } else {
        this.pauseIntervals();
        try {
          window.dispatchEvent(new CustomEvent("logicweaver:page-hidden"));
        } catch {
        }
      }
      for (const o of this.callbacks)
        try {
          o(t);
        } catch (n) {
          console.warn("[PageVisibility] callback error:", n);
        }
    });
  }
  static getInstance() {
    return It.instance || (It.instance = new It()), It.instance;
  }
  get isVisible() {
    return vt(this._isVisible);
  }
  isVisibleNow() {
    return typeof document < "u" ? !document.hidden : !0;
  }
  onChange(t) {
    return this.callbacks.add(t), () => {
      this.callbacks.delete(t);
    };
  }
  /**
   * 创建低功耗定时任务：后台标签自动暂停定时器，切回前台时自动无感唤醒并立即执行一次
   */
  createInterval(t, o) {
    const n = {
      handler: t,
      intervalMs: o,
      timerId: null
    };
    return { start: () => {
      this.activeIntervals.add(n), this.isVisibleNow() && !n.timerId && (n.timerId = setInterval(n.handler, n.intervalMs));
    }, stop: () => {
      this.activeIntervals.delete(n), n.timerId && (clearInterval(n.timerId), n.timerId = null);
    } };
  }
  pauseIntervals() {
    for (const t of this.activeIntervals)
      t.timerId && (clearInterval(t.timerId), t.timerId = null);
  }
  resumeIntervals() {
    for (const t of this.activeIntervals)
      if (!t.timerId) {
        try {
          t.handler();
        } catch {
        }
        t.timerId = setInterval(t.handler, t.intervalMs);
      }
  }
}
const pr = It.getInstance(), ti = () => window;
let dt = !1, Gt, oi, Ut;
function Hi(e) {
  return Z.getPageNames().filter((t) => t !== e).map((t) => ({ id: t, name: Z.getPageLabel(t) }));
}
function Ri() {
  if (!Fe.isOpen || !Fe.activeFolder) return;
  const e = Z.getState(), t = Fe.activeFolder;
  lt.setLinks(e.links.filter((c) => (c.group || "常用网站") === t));
  const o = /* @__PURE__ */ new Map();
  for (const c of e.links) {
    const y = c.group || "常用网站";
    o.has(y) || o.set(y, []), o.get(y).push(c);
  }
  const n = new Map(Object.keys(e.folders).map((c) => [c, $o(e.folders, c)])), s = /* @__PURE__ */ new Map();
  for (const c of n.values()) c && s.set(c, (s.get(c) || 0) + 1);
  lt.setFolders([...n].filter(([, c]) => c === t).map(([c]) => ({
    groupName: c,
    links: o.get(c) || [],
    count: (o.get(c)?.length || 0) + (s.get(c) || 0)
  })), $o(e.folders, t));
}
const di = {
  openEditor(e) {
    Jt.openEditDialog(e || {});
  },
  openFolder(e = Fe.activeFolder) {
    if (!e) return;
    const o = Z.getState().links.filter((n) => (n.group || "常用网站") === e);
    lt.openFolder(e, o), Ri();
  },
  openLinkMenu(e, t) {
    t?.preventDefault?.(), Dt.openLinkMenu(e, Hi(e.page || "常用网站"), t?.clientX || 0, t?.clientY || 0);
  },
  openFolderMenu(e, t, o) {
    t?.preventDefault?.();
    const n = Z.getState(), s = o || n.activePage;
    Dt.openFolderMenu(
      e,
      Z.getGroupSize(e) === "small" ? "扩大为大收藏夹" : "缩小为小收藏夹",
      Hi(s),
      t?.clientX || 0,
      t?.clientY || 0
    );
  },
  openPageMenu(e, t) {
    t?.preventDefault?.(), Dt.openPageMenu(
      e,
      Z.getPageLabel(e),
      Z.getPageNames().length > 1,
      t?.clientX || 0,
      t?.clientY || 0
    );
  },
  openIconPicker(e) {
    if (!e) return;
    const t = e.title || Z.hostOf(e.url);
    Jt.openIconPicker(e.title || "网站", t, e.url, String(e.id)), Jt.searchIcons(t);
  },
  render() {
    const e = Z.getState(), t = Z.getPageNames();
    be.update({
      ...e,
      pages: t,
      activePage: t.includes(e.activePage) ? e.activePage : t[0]
    }), Ri();
  },
  start() {
    dt || (dt = !0, be.setActions({
      openFolder: (e) => this.openFolder(e),
      deleteFolder: ps,
      openLinkMenu: (e, t) => this.openLinkMenu(e, t),
      openFolderMenu: (e, t, o) => this.openFolderMenu(e, o, t),
      openPageMenu: (e, t) => this.openPageMenu(e, t)
    }), lt.setActionHandler((e, t) => {
      e === "close" ? lt.closeFolder() : e === "folder:open" && typeof t == "string" ? this.openFolder(t) : e === "link:contextmenu" && t?.link && this.openLinkMenu(t.link, t);
    }), oi = Z.subscribe(() => {
      this.render();
    }), Ut = (e, t) => {
      if (t !== "local") return;
      const o = {
        quickLinks: "links",
        quickLinkGroupSizes: "groupSizes",
        launcherFolders: "folders",
        launcherPages: "pages",
        launcherPageLabels: "pageLabels",
        launcherActivePage: "activePage"
      }, n = {};
      for (const [s, c] of Object.entries(o)) {
        if (!(s in e)) continue;
        const y = e[s].newValue;
        n[c] = c === "links" ? Array.isArray(y) ? y : [] : c === "pages" ? Array.isArray(y) && y.length ? y : ["常用网站"] : c === "activePage" ? y || "常用网站" : y || {};
      }
      Object.keys(n).length && (Z.updateState(n), this.render());
    }, ti().chrome?.storage?.onChanged?.addListener(Ut));
  },
  init() {
    return this.start(), Gt || (Gt = (async () => {
      await Z.ready;
      const e = ti().chrome;
      if (!dt) return;
      const t = await e?.storage?.local?.get("quickLinksReady") || {};
      if (dt) {
        if (!Z.getState().links.length && !t.quickLinksReady && e?.topSites) {
          const o = await new Promise((n) => e.topSites.get((s) => n(s || [])));
          if (!dt) return;
          Z.getState().links.length || (Z.updateState({ links: o.slice(0, 14).map((n) => ({
            id: crypto.randomUUID(),
            title: n.title || Z.hostOf(n.url),
            url: n.url,
            group: "常用网站"
          })) }), await Z.save());
        }
        dt && this.render();
      }
    })().catch((e) => {
      throw Gt = void 0, e;
    }), Gt);
  },
  stop() {
    dt = !1, oi?.(), oi = void 0, Ut && ti().chrome?.storage?.onChanged?.removeListener(Ut), Ut = void 0, lt.setActionHandler(null), be.setActions({
      openFolder: void 0,
      deleteFolder: void 0,
      openLinkMenu: void 0,
      openFolderMenu: void 0,
      openPageMenu: void 0
    });
  }
}, ji = [
  { name: "深圳", admin: "广东", pinyin: "shenzhen" },
  { name: "武汉", admin: "湖北", pinyin: "wuhan" },
  { name: "北京", admin: "北京", pinyin: "beijing" },
  { name: "上海", admin: "上海", pinyin: "shanghai" },
  { name: "广州", admin: "广东", pinyin: "guangzhou" },
  { name: "成都", admin: "四川", pinyin: "chengdu" },
  { name: "杭州", admin: "浙江", pinyin: "hangzhou" },
  { name: "重庆", admin: "重庆", pinyin: "chongqing" },
  { name: "南京", admin: "江苏", pinyin: "nanjing" },
  { name: "西安", admin: "陕西", pinyin: "xian" },
  { name: "苏州", admin: "江苏", pinyin: "suzhou" },
  { name: "天津", admin: "天津", pinyin: "tianjin" },
  { name: "郑州", admin: "河南", pinyin: "zhengzhou" },
  { name: "长沙", admin: "湖南", pinyin: "changsha" },
  { name: "东莞", admin: "广东", pinyin: "dongguan" },
  { name: "佛山", admin: "广东", pinyin: "foshan" },
  { name: "宁波", admin: "浙江", pinyin: "ningbo" },
  { name: "青岛", admin: "山东", pinyin: "qingdao" },
  { name: "合肥", admin: "安徽", pinyin: "hefei" },
  { name: "福州", admin: "福建", pinyin: "fuzhou" },
  { name: "厦门", admin: "福建", pinyin: "xiamen" },
  { name: "济南", admin: "山东", pinyin: "jinan" },
  { name: "沈阳", admin: "辽宁", pinyin: "shenyang" },
  { name: "大连", admin: "辽宁", pinyin: "dalian" },
  { name: "哈尔滨", admin: "黑龙江", pinyin: "haerbin" },
  { name: "长春", admin: "吉林", pinyin: "changchun" },
  { name: "昆明", admin: "云南", pinyin: "kunming" },
  { name: "贵阳", admin: "贵州", pinyin: "guiyang" },
  { name: "南宁", admin: "广西", pinyin: "nanning" },
  { name: "乌鲁木齐", admin: "新疆", pinyin: "wulumuqi" },
  { name: "兰州", admin: "甘肃", pinyin: "lanzhou" },
  { name: "海口", admin: "海南", pinyin: "haikou" },
  { name: "三亚", admin: "海南", pinyin: "sanya" },
  { name: "银川", admin: "宁夏", pinyin: "yinchuan" },
  { name: "西宁", admin: "青海", pinyin: "xining" },
  { name: "呼和浩特", admin: "内蒙古", pinyin: "huhehaote" },
  { name: "拉萨", admin: "西藏", pinyin: "lasa" },
  { name: "石家庄", admin: "河北", pinyin: "shijiazhuang" },
  { name: "太原", admin: "山西", pinyin: "taiyuan" },
  { name: "南昌", admin: "江西", pinyin: "nanchang" },
  { name: "无锡", admin: "江苏", pinyin: "wuxi" },
  { name: "香港", admin: "中国香港", pinyin: "xianggang" },
  { name: "澳门", admin: "中国澳门", pinyin: "aomen" },
  { name: "台北", admin: "中国台湾", pinyin: "taibei" },
  { name: "Tokyo", admin: "日本", pinyin: "tokyo" },
  { name: "London", admin: "英国", pinyin: "london" },
  { name: "New York", admin: "美国", pinyin: "newyork" }
];
function vo(e) {
  return e === 0 ? { emoji: "☀️", label: "晴" } : e <= 2 ? { emoji: "🌤️", label: "少云" } : e === 3 ? { emoji: "☁️", label: "多云" } : e === 45 || e === 48 ? { emoji: "🌫️", label: "雾" } : e >= 51 && e <= 57 ? { emoji: "🌦️", label: "毛毛雨" } : e >= 61 && e <= 67 ? { emoji: "🌧️", label: "雨" } : e >= 71 && e <= 77 ? { emoji: "🌨️", label: "雪" } : e >= 80 && e <= 82 ? { emoji: "🌧️", label: "阵雨" } : e >= 85 && e <= 86 ? { emoji: "🌨️", label: "阵雪" } : e >= 95 ? { emoji: "⛈️", label: "雷雨" } : { emoji: "🌡️", label: "—" };
}
class Et {
  constructor() {
    this.currentCity = "武汉", this.isRefreshing = !1, this.activeRequestId = 0, this.initStorage();
  }
  static getInstance() {
    return Et.instance || (Et.instance = new Et()), Et.instance;
  }
  cancel() {
    this.activeRequestId++, this.isRefreshing = !1;
  }
  async initStorage() {
    if (typeof chrome < "u" && chrome.storage?.local)
      try {
        const t = await chrome.storage.local.get(["city"]);
        t.city && (this.currentCity = t.city);
      } catch {
      }
    else if (typeof localStorage < "u") {
      const t = localStorage.getItem("weatherCity");
      t && (this.currentCity = t);
    }
  }
  getCurrentCity() {
    return this.currentCity;
  }
  async changeCity(t) {
    const o = t.trim();
    o && (this.currentCity = o, typeof chrome < "u" && chrome.storage?.local ? await chrome.storage.local.set({ city: o }).catch(() => {
    }) : typeof localStorage < "u" && localStorage.setItem("weatherCity", o), await this.loadWeather(o));
  }
  filterCities(t, o = 8) {
    const n = t.trim().toLowerCase();
    if (!n) return ji.slice(0, o);
    const s = [];
    for (const c of ji) {
      const y = c.name.toLowerCase(), m = c.pinyin.toLowerCase(), u = c.admin.toLowerCase();
      if ((y.startsWith(n) || m.startsWith(n) || y.includes(n) || m.includes(n) || u.includes(n)) && s.push(c), s.length >= o) break;
    }
    return s;
  }
  async loadWeather(t) {
    const o = (t || this.currentCity || "").trim();
    if (!o) {
      Ge.unconfigured();
      return;
    }
    if (this.isRefreshing) return;
    this.isRefreshing = !0;
    const n = ++this.activeRequestId;
    Ge.loading(o);
    try {
      const s = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(o)}&count=1&language=zh&format=json`, c = await fetch(s);
      if (n !== this.activeRequestId || N.state === "unconfigured") {
        this.isRefreshing = !1;
        return;
      }
      const m = (await c.json()).results?.[0];
      if (!m) {
        n === this.activeRequestId && N.state !== "unconfigured" && Ge.notFound(o), this.isRefreshing = !1;
        return;
      }
      const u = `https://api.open-meteo.com/v1/forecast?latitude=${m.latitude}&longitude=${m.longitude}&current=temperature_2m,weather_code,relative_humidity_2m,wind_speed_10m&hourly=temperature_2m,weather_code,precipitation_probability&daily=temperature_2m_max,temperature_2m_min,weather_code,precipitation_probability_max&forecast_days=7&timezone=auto`, x = await fetch(u);
      if (n !== this.activeRequestId || N.state === "unconfigured") {
        this.isRefreshing = !1;
        return;
      }
      const C = await x.json(), W = vo(C.current?.weather_code ?? 0), p = Math.round(C.current?.temperature_2m ?? 0), r = C.hourly?.time || [], a = Date.now();
      let g = r.findIndex((P) => new Date(P).getTime() >= a);
      g < 0 && (g = 0);
      const b = [];
      for (let P = g; P < Math.min(g + 5, r.length); P++) {
        const S = P === g ? "现在" : new Date(r[P]).getHours() + "时", X = vo(C.hourly.weather_code[P]), J = Math.round(C.hourly.temperature_2m[P]);
        b.push({ time: S, emoji: X.emoji, temp: J });
      }
      let v = "未来 12 小时暂无降水 ☂️";
      for (let P = g; P < Math.min(g + 12, r.length); P++) {
        const S = C.hourly.weather_code[P], X = C.hourly.precipitation_probability?.[P] || 0;
        if (S >= 51 || X >= 60) {
          const J = new Date(r[P]).getHours(), D = S >= 71 && S <= 77 || S === 85 || S === 86;
          v = `预计 ${J}:00 ${D ? "有雪" : "有雨"}${X ? `（${X}%）` : ""} 🌧️`;
          break;
        }
      }
      const k = ["今天", "明天", "后天"], $ = [], M = C.daily?.time?.length || 0;
      for (let P = 1; P < Math.min(3, M); P++) {
        const S = k[P] || `+${P}天`, X = vo(C.daily.weather_code[P]), J = `${Math.round(C.daily.temperature_2m_max[P])}°/${Math.round(C.daily.temperature_2m_min[P])}°`;
        $.push({ label: S, emoji: X.emoji, tempRange: J });
      }
      const U = `${W.label} · 最高 ${Math.round(C.daily?.temperature_2m_max?.[0] ?? p)}° / 最低 ${Math.round(C.daily?.temperature_2m_min?.[0] ?? p)}°`, ce = {
        cityName: m.name || o,
        currentEmoji: W.emoji,
        currentTemp: p,
        subText: U,
        rainText: v,
        hours: b,
        days: $
      };
      if (n === this.activeRequestId && N.state !== "unconfigured") {
        if (Ge.ready(ce, o), C.daily?.time) {
          const S = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"], X = [];
          for (let J = 0; J < C.daily.time.length; J++) {
            const D = new Date(C.daily.time[J]), H = J === 0 ? "今天" : J === 1 ? "明天" : J === 2 ? "后天" : S[D.getDay()], O = vo(C.daily.weather_code[J]);
            X.push({
              date: `${D.getMonth() + 1}/${D.getDate()}`,
              dayName: H,
              emoji: O.emoji,
              condition: O.label,
              highTemp: Math.round(C.daily.temperature_2m_max[J]),
              lowTemp: Math.round(C.daily.temperature_2m_min[J]),
              rainProb: C.daily.precipitation_probability_max?.[J] || 0
            });
          }
          Ge.setForecastDays(X);
        }
        const P = {
          humidity: C.current?.relative_humidity_2m ? `${C.current.relative_humidity_2m}%` : "60%",
          wind: C.current?.wind_speed_10m ? `${Math.round(C.current.wind_speed_10m)} km/h` : "微风",
          uvIndex: "正常",
          airQuality: "优良"
        };
        Ge.setDetailInfo(P);
      }
    } catch (s) {
      n === this.activeRequestId && N.state !== "unconfigured" && Ge.error(s?.message || "天气加载失败，右键此处可重新选择地点。", o);
    } finally {
      n === this.activeRequestId && (this.isRefreshing = !1);
    }
  }
}
const Xt = Et.getInstance();
function fr(e, t) {
  window.LogicWeaverIntro = st, window.LogicWeaverNotifications = Ie, window.LogicWeaverWindowManager = Ue, window.LogicWeaverWindowTabs = Ue, window.LogicWeaverDomFreezer = Ts, window.LogicWeaverWallpaperService = Io, window.LogicWeaverLauncherService = Z, window.LogicWeaverLauncherRuntime = di, window.LogicWeaverProfileService = Pi;
  try {
    Pi.init();
  } catch (n) {
    console.error("[ProfileService] init failed:", n);
  }
  window.LogicWeaverBookmarksService = fi, window.LogicWeaverCalendarService = fs, window.LogicWeaverWeather = Ge, window.LogicWeaverWeatherService = Xt, window.LogicWeaverClock = $t, window.LogicWeaverSearch = as, window.LogicWeaverSearchService = ls, Object.defineProperty(window, "LogicWeaverAiHotService", {
    configurable: !0,
    get: () => {
      import("./aihot.service-C5ACGrq9.js").then(({ aiHotService: n }) => {
        window.LogicWeaverAiHotService = n;
      });
    }
  }), window.LogicWeaverHomeMusic = Pe, window.LogicWeaverLauncherGroups = be, window.LogicWeaverProfileMenu = ro, window.LogicWeaverWorkspaceLaunchers = vi, window.LogicWeaverMacDock = ut, window.LogicWeaverFullscreen = nt, window.enterFullscreenCard = (n) => nt.enter(n), window.exitFullscreenCard = () => nt.exit(), window.cycleFullscreenCard = () => nt.cycle(), window.LogicWeaverPageVisibility = pr, window.LogicWeaverBackgroundLibrary = Mi, window.LogicWeaverNotificationCenter = mt, window.LogicWeaverBookmarkMenu = hi, window.LogicWeaverBookmarkPanel = No, window.LogicWeaverBookmarkFolderStrip = Mo, window.LogicWeaverLauncherDialogs = Jt, window.LogicWeaverLauncherFolder = lt, window.LogicWeaverLauncherMenus = Dt, window.LogicWeaverSettings = Ho, window.LogicWeaverClockSettings = ft, window.LogicWeaverBiliTheater = Qt, window.LogicWeaverBilibiliService = Li, window.getBiliJct = () => Li.getBiliJct(), window.LogicWeaverBiliMiniPlayer = Ti, window.openBiliMiniPlayer = (n) => Ti.openVideo(n), window.LogicWeaverAiDialog = yi, window.LogicWeaverAihotViewer = mi, window.LogicWeaverNavWheel = ge, window.openNavWheel = (n, s) => tt.open(n, s), window.closeNavWheel = () => tt.close(), window.toggleNavWheel = (n) => tt.toggle(n), window.toggleToolWheel = (n) => tt.toggleTools(n), window.setNavWheelMode = (n) => tt.setMode(n), window.LogicWeaverShortcuts = ci, window.triggerToolShortcut = (n) => ci.triggerToolShortcut(n), window.LogicWeaverCommands = e, window.LogicWeaverFeatures = t, window.LogicWeaverCalendarView = hs, window.LogicWeaverGitHubStatus = en, window.LogicWeaverGitHubFolders = tn, window.LogicWeaverGitHubHero = on, window.LogicWeaverGitHubRepositories = nn, window.LogicWeaverGitHubBatchBar = sn, window.LogicWeaverTodoistLabels = gs, window.LogicWeaverTodoistWorkspace = ms, window.LogicWeaverTodoistCalendarSidebar = ws, window.LogicWeaverTodoistTaskList = vs, window.LogicWeaverBiliMessagePanel = pt, window.LogicWeaverStickerBoard = Ds, window.LogicWeaverStickersService = Ps, window.LogicWeaverPricing = dn, window.LogicWeaverBiliFavorites = ln, window.LogicWeaverBiliRadioTape = Es, window.LogicWeaverBiliOrganizerDialogs = $s, window.LogicWeaverBiliUpGroupManager = Ms, window.LogicWeaverBiliUpPreview = xo, window.LogicWeaverYouTube = un, window.LogicWeaverAihotFeed = cn, window.LogicWeaverGitHubTrending = pn, window.LogicWeaverCalendarWorkspace = St, window.LogicWeaverCalendar = St, window.LogicWeaverTodoistMainWorkspace = ys, window.LogicWeaverTodoistTaskDetail = nr, window.openBiliTheater = (n) => Qt.openVideo(n), window.closeBiliTheater = () => Qt.close(), window.showWindowsToast = (n) => n ? Ie.show({
    ...n,
    onClick: () => {
      if (typeof n?.onClick == "function") return n.onClick();
      if (n?.url) {
        window.open(n.url, "_blank");
        return;
      }
      n?.appType === "bili" && (window.LogicWeaverBiliMessagePanel ? window.LogicWeaverBiliMessagePanel.openPanel() : window.open("https://message.bilibili.com/", "_blank"));
    }
  }) : null, window.showToast = (n, s = !1, c = 3200) => window.showWindowsToast({
    appName: "系统提醒",
    icon: s ? "assets/error.svg" : "assets/logo.png",
    title: s ? "操作提醒" : "系统提醒",
    subtitle: n,
    duration: c
  }), window.showBiliToast = (n, s = 3200, c = {}) => {
    const y = c.isError || /失败|错误|异常|未获取|未找到/i.test(n), m = c.title || (y ? "B站操作未完成" : "哔哩哔哩"), u = c.subtitle || (n.length > 36 ? "" : n), x = c.message || (c.subtitle || n.length > 36 ? n : ""), C = {
      id: c.id || `bili_toast_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      appType: "bili",
      appName: "哔哩哔哩",
      icon: "assets/bilibili.svg",
      title: m,
      subtitle: u || n,
      message: x && x !== u ? x : "",
      showActions: !!(c.showActions || c.actionLabel),
      actionLabel: c.actionLabel || "",
      onClick: c.onClick || null,
      duration: Math.max(3e3, s)
    };
    return window.showWindowsToast(C);
  }, window.showFetchToast = (n, s, c = "", y = "assets/logo.png", m = 3200) => window.showWindowsToast({
    appName: n,
    title: s,
    subtitle: c,
    icon: y || "assets/logo.png",
    duration: m,
    showActions: !1,
    actionLabel: "",
    appType: "fetch"
  }), window.LogicWeaverKineticDrag = Hs, window.LogicWeaverMarkdownAst = Rs, window.setLauncherBackground = (n) => Io.setWallpaper(n), window.backgroundDbClear = (n) => bs(n), window.openBackgroundHistory = () => Mi.openDialog();
  const o = () => {
    import("./cli-bridge-BzDCKJ6A.js").then(({ cliBridgeRuntime: n }) => n.start());
  };
  document.readyState === "complete" || document.readyState === "interactive" ? setTimeout(o, 400) : (window.addEventListener("load", () => setTimeout(o, 400), { once: !0 }), setTimeout(o, 1200));
}
const Te = Ee({
  isOpen: !1,
  query: "",
  selectedIndex: 0
});
let yo = null;
const _n = {
  get state() {
    return Te;
  },
  open() {
    Te.isOpen || (Te.isOpen = !0, Te.query = "", Te.selectedIndex = 0, yo = Ue.pushModalCloser(() => (this.close(), !0)));
  },
  close() {
    Te.isOpen && (Te.isOpen = !1, Te.query = "", Te.selectedIndex = 0, yo && (yo(), yo = null));
  },
  toggle() {
    Te.isOpen ? this.close() : this.open();
  },
  setQuery(e) {
    Te.query = e, Te.selectedIndex = 0;
  },
  selectNext(e) {
    e <= 0 || (Te.selectedIndex = (Te.selectedIndex + 1) % e);
  },
  selectPrev(e) {
    e <= 0 || (Te.selectedIndex = (Te.selectedIndex - 1 + e) % e);
  },
  async executeCommand(e) {
    this.close();
    try {
      await gt.execute(e.id, void 0, "command-palette");
    } catch (t) {
      console.warn(`[CommandPalette] Failed to execute ${e.id}:`, t);
    }
  }
};
typeof window < "u" && window.addEventListener("keydown", (e) => {
  if (gi.active || e.defaultPrevented || e.isComposing || e.repeat) return;
  const t = (e.key || "").toLowerCase(), o = (e.ctrlKey || e.metaKey) && t === "k", n = e.altKey && (e.code === "Space" || t === " ");
  (o || n) && (e.preventDefault(), e.stopPropagation(), _n.toggle());
}, !0);
function hr(e) {
  e.register({
    id: "palette.toggle",
    title: "打开全局命令中心 (Spotlight)",
    category: "界面",
    keywords: ["命令", "palette", "spotlight", "raycast", "搜索", "cmd"],
    concurrency: "drop",
    run: () => _n.toggle()
  }), e.register({
    id: "intro.skip",
    title: "跳过开屏动画",
    category: "界面",
    keywords: ["开屏", "启动", "skip"],
    concurrency: "drop",
    enabled: () => st.enabled && !st.finished,
    run: () => st.skip("COMMAND SKIP")
  }), e.register({
    id: "notifications.clear",
    title: "关闭当前 Toast",
    category: "通知",
    keywords: ["toast", "关闭"],
    description: "只关闭浮动提示，不删除通知中心历史",
    concurrency: "drop",
    enabled: () => Ie.size > 0,
    run: () => Ie.clear()
  }), e.register({
    id: "weather.refresh",
    title: "刷新天气数据",
    category: "天气",
    description: "重新拉取当前城市的气象预报",
    keywords: ["天气", "weather", "气温", "预报"],
    concurrency: "drop",
    enabled: () => typeof window.LogicWeaverWeather?.refresh == "function",
    run: () => window.LogicWeaverWeather?.refresh()
  }), e.register({
    id: "weather.change-location",
    title: "切换天气城市",
    category: "天气",
    description: "弹出城市搜索选择气象城市",
    keywords: ["天气", "城市", "地点", "location"],
    concurrency: "drop",
    enabled: () => typeof window.LogicWeaverWeather?.changeLocation == "function",
    run: () => window.LogicWeaverWeather?.changeLocation()
  }), e.register({
    id: "clock.open-settings",
    title: "时钟个性化设置",
    category: "时钟",
    description: "弹出时钟字体、颜色与时区设置菜单",
    keywords: ["时钟", "clock", "字体", "时区", "颜色"],
    concurrency: "drop",
    enabled: () => typeof window.LogicWeaverClock?.openSettings == "function",
    run: () => window.LogicWeaverClock?.openSettings()
  }), e.register({
    id: "search.focus",
    title: "聚焦搜索框",
    category: "搜索",
    description: "聚焦首屏中央搜索框并全选内容",
    keywords: ["搜索", "search", "输入", "查找"],
    concurrency: "drop",
    enabled: () => typeof window.LogicWeaverSearch?.focus == "function",
    run: () => window.LogicWeaverSearch?.focus()
  }), e.register({
    id: "search.cycle-mode",
    title: "切换搜索模式",
    category: "搜索",
    description: "在网页/B站/GitHub/网易云之间切换搜索模式",
    keywords: ["搜索模式", "bilibili", "github", "netease"],
    concurrency: "drop",
    enabled: () => typeof window.LogicWeaverSearch?.cycleMode == "function",
    run: () => window.LogicWeaverSearch?.cycleMode()
  }), e.register({
    id: "music.toggle-play",
    title: "播放 / 暂停音乐",
    category: "音乐",
    description: "切换音乐播放或暂停状态",
    keywords: ["播放", "暂停", "play", "pause", "music", "塞壬唱片"],
    concurrency: "drop",
    enabled: () => typeof window.LogicWeaverHomeMusic?.togglePlay == "function",
    run: () => window.LogicWeaverHomeMusic?.togglePlay()
  }), e.register({
    id: "music.next",
    title: "播放下一首音乐",
    category: "音乐",
    description: "切换到下一首曲目",
    keywords: ["下一首", "next", "切歌"],
    concurrency: "drop",
    enabled: () => typeof window.LogicWeaverHomeMusic?.next == "function",
    run: () => window.LogicWeaverHomeMusic?.next()
  }), e.register({
    id: "music.prev",
    title: "播放上一首音乐",
    category: "音乐",
    description: "切换到上一首曲目",
    keywords: ["上一首", "prev"],
    concurrency: "drop",
    enabled: () => typeof window.LogicWeaverHomeMusic?.prev == "function",
    run: () => window.LogicWeaverHomeMusic?.prev()
  }), e.register({
    id: "music.open-siren",
    title: "打开塞壬唱片模块",
    category: "音乐",
    description: "打开明日方舟塞壬唱片官方原声模块",
    keywords: ["塞壬", "唱片", "原声", "siren"],
    concurrency: "drop",
    enabled: () => typeof window.LogicWeaverHomeMusic?.togglePicker == "function",
    run: () => window.LogicWeaverHomeMusic?.togglePicker()
  }), e.register({
    id: "music.open-netease",
    title: "打开网易云模块",
    category: "音乐",
    description: "打开网易云音乐工作区",
    keywords: ["网易云", "音乐", "netease"],
    concurrency: "drop",
    enabled: () => typeof window.LogicWeaverHomeMusic?.openPanel == "function",
    run: () => window.LogicWeaverHomeMusic?.openPanel()
  }), e.register({
    id: "launcher.next-page",
    title: "切换到下一网站分区",
    category: "常用网站",
    description: "向后切换常用网站分区标签",
    keywords: ["常用网站", "下一页", "分区", "launcher page"],
    concurrency: "drop",
    enabled: () => typeof window.LogicWeaverLauncherGroups?.nextPage == "function",
    run: () => window.LogicWeaverLauncherGroups?.nextPage()
  }), e.register({
    id: "launcher.prev-page",
    title: "切换到上一网站分区",
    category: "常用网站",
    description: "向前切换常用网站分区标签",
    keywords: ["常用网站", "上一页", "分区", "launcher page"],
    concurrency: "drop",
    enabled: () => typeof window.LogicWeaverLauncherGroups?.prevPage == "function",
    run: () => window.LogicWeaverLauncherGroups?.prevPage()
  }), e.register({
    id: "calendar.open",
    title: "打开日历",
    category: "日历",
    keywords: ["Todoist", "Google Calendar", "月历"],
    concurrency: "drop",
    enabled: () => typeof window.LogicWeaverCalendar?.open == "function",
    run: () => window.LogicWeaverCalendar?.open()
  }), e.register({
    id: "calendar.refresh",
    title: "刷新日历",
    category: "日历",
    keywords: ["Todoist", "Google Calendar", "同步"],
    concurrency: "drop",
    enabled: () => St.ready,
    run: () => St.refresh()
  }), e.register({
    id: "calendar.today",
    title: "日历跳转到今天",
    category: "日历",
    keywords: ["今日", "today", "日期"],
    concurrency: "drop",
    enabled: () => St.ready,
    run: () => St.goToday()
  }), e.register({
    id: "github.refresh",
    title: "刷新 GitHub Star",
    category: "GitHub",
    keywords: ["仓库", "收藏", "repository", "star"],
    concurrency: "drop",
    enabled: () => typeof window.LogicWeaverGitHub?.refresh == "function",
    run: () => window.LogicWeaverGitHub?.refresh()
  }), e.register({
    id: "todoist.open",
    title: "打开 Todoist",
    category: "Todoist",
    keywords: ["任务", "待办", "todo"],
    concurrency: "drop",
    enabled: () => typeof window.LogicWeaverTodoist?.open == "function",
    run: () => window.LogicWeaverTodoist?.open()
  }), e.register({
    id: "todoist.refresh",
    title: "刷新 Todoist",
    category: "Todoist",
    keywords: ["任务", "同步", "待办"],
    concurrency: "drop",
    enabled: () => typeof window.LogicWeaverTodoist?.refresh == "function",
    run: () => window.LogicWeaverTodoist?.refresh()
  }), e.register({
    id: "todoist.quick-add",
    title: "快速添加 Todoist 任务",
    category: "Todoist",
    keywords: ["新建", "任务", "quick add"],
    concurrency: "drop",
    enabled: () => typeof window.LogicWeaverTodoist?.quickAdd == "function",
    run: () => window.LogicWeaverTodoist?.quickAdd()
  }), e.register({
    id: "notifications.open-history",
    title: "打开通知中心",
    category: "通知",
    description: "查看保留的重要通知和未读记录",
    keywords: ["通知", "未读", "toast", "历史"],
    concurrency: "drop",
    enabled: () => typeof window.LogicWeaverProfileMenu?.trigger == "function",
    run: () => window.LogicWeaverProfileMenu?.trigger("messages")
  }), e.register({
    id: "profile.refresh",
    title: "刷新 B站账号信息",
    category: "账号",
    description: "重新读取B站用户和消息信息",
    keywords: ["刷新", "账号", "bilibili"],
    concurrency: "drop",
    enabled: () => typeof window.LogicWeaverProfileMenu?.trigger == "function",
    run: () => window.LogicWeaverProfileMenu?.trigger("refresh")
  }), e.register({
    id: "workspace.open-ai",
    title: "打开 AI 助手",
    category: "工作区",
    description: "展开侧边或悬浮 AI 对话助手",
    keywords: ["ai", "助手", "chat", "llm"],
    concurrency: "drop",
    enabled: () => typeof window.LogicWeaverWorkspaceLaunchers?.openWorkspace == "function",
    run: () => window.LogicWeaverWorkspaceLaunchers?.openWorkspace("ai")
  }), e.register({
    id: "workspace.open-todoist",
    title: "打开 Todoist 工作区",
    category: "工作区",
    description: "打开常驻 Todoist 任务工作区",
    keywords: ["todoist", "任务", "待办"],
    concurrency: "drop",
    enabled: () => typeof window.LogicWeaverWorkspaceLaunchers?.openWorkspace == "function",
    run: () => window.LogicWeaverWorkspaceLaunchers?.openWorkspace("todoist")
  }), e.register({
    id: "dock.go-home",
    title: "回到主页视窗",
    category: "Dock",
    description: "退出全屏卡片并平滑滚动回首屏主页",
    keywords: ["主页", "home", "dock"],
    concurrency: "drop",
    enabled: () => typeof window.LogicWeaverMacDock?.triggerItem == "function",
    run: () => window.LogicWeaverMacDock?.triggerItem("home", "home-launcher")
  }), e.register({
    id: "dock.open-bilibili",
    title: "打开 B站全屏收藏",
    category: "Dock",
    description: "展开 B站收藏卡片或切换全屏",
    keywords: ["bilibili", "b站", "收藏"],
    concurrency: "drop",
    enabled: () => typeof window.LogicWeaverMacDock?.triggerItem == "function",
    run: () => window.LogicWeaverMacDock?.triggerItem("target", "daily-bilibili")
  }), e.register({
    id: "dock.open-github",
    title: "打开 GitHub 卡片",
    category: "Dock",
    description: "展开 GitHub 仓库卡片或切换全屏",
    keywords: ["github", "仓库"],
    concurrency: "drop",
    enabled: () => typeof window.LogicWeaverMacDock?.triggerItem == "function",
    run: () => window.LogicWeaverMacDock?.triggerItem("target", "card-github")
  }), e.register({
    id: "wallpaper.open-dialog",
    title: "打开壁纸库",
    category: "壁纸",
    description: "打开壁纸历史与导入视窗",
    keywords: ["壁纸", "wallpaper", "背景"],
    concurrency: "drop",
    enabled: () => typeof window.LogicWeaverBackgroundLibrary?.openDialog == "function",
    run: () => window.LogicWeaverBackgroundLibrary?.openDialog()
  }), e.register({
    id: "wallpaper.close-dialog",
    title: "关闭壁纸库",
    category: "壁纸",
    description: "关闭壁纸历史视窗",
    keywords: ["关闭壁纸", "close wallpaper"],
    concurrency: "drop",
    enabled: () => typeof window.LogicWeaverBackgroundLibrary?.closeDialog == "function",
    run: () => window.LogicWeaverBackgroundLibrary?.closeDialog()
  }), e.register({
    id: "wallpaper.reset",
    title: "恢复默认壁纸",
    category: "壁纸",
    description: "重置为默认纯色主题壁纸",
    keywords: ["重置壁纸", "reset wallpaper"],
    concurrency: "drop",
    enabled: () => typeof window.LogicWeaverBackgroundLibrary?.resetDefault == "function",
    run: () => window.LogicWeaverBackgroundLibrary?.resetDefault()
  }), e.register({
    id: "notifications.close-history",
    title: "关闭通知中心",
    category: "通知",
    keywords: ["关闭通知"],
    concurrency: "drop",
    enabled: () => typeof window.LogicWeaverNotificationCenter?.close == "function",
    run: () => window.LogicWeaverNotificationCenter?.close()
  }), e.register({
    id: "browser-tabs.open",
    title: "标签页管理",
    category: "浏览器",
    keywords: ["标签页", "tabs"],
    concurrency: "drop",
    enabled: () => typeof window.LogicWeaverProfileMenu?.trigger == "function",
    run: () => window.LogicWeaverProfileMenu?.trigger("tabs")
  }), e.register({
    id: "bookmark.close-menu",
    title: "关闭书签操作菜单",
    category: "书签",
    description: "关闭书签右键操作与备注编辑菜单",
    keywords: ["书签菜单", "close bookmark menu"],
    concurrency: "drop",
    enabled: () => typeof window.LogicWeaverBookmarkMenu?.closeMenu == "function",
    run: () => window.LogicWeaverBookmarkMenu?.closeMenu()
  }), e.register({
    id: "launcher.open-edit-dialog",
    title: "打开添加网站弹窗",
    category: "启动器",
    description: "打开添加或编辑常用网站对话框",
    keywords: ["添加网站", "编辑网站", "add launcher"],
    concurrency: "drop",
    enabled: () => typeof window.LogicWeaverLauncherDialogs?.openEditDialog == "function",
    run: () => window.LogicWeaverLauncherDialogs?.openEditDialog({})
  }), e.register({
    id: "launcher.open-icon-picker",
    title: "打开网站图标选择器",
    category: "启动器",
    description: "搜索并选用网站高清图标或上传自定义图片",
    keywords: ["图标选择", "网站头像", "icon picker"],
    concurrency: "drop",
    enabled: () => typeof window.LogicWeaverLauncherDialogs?.openIconPicker == "function",
    run: () => window.LogicWeaverLauncherDialogs?.openIconPicker("新网站")
  }), e.register({
    id: "settings.open",
    title: "打开设置中心",
    category: "设置",
    description: "打开全局新标签页偏好设置对话框",
    keywords: ["偏好设置", "options", "settings"],
    concurrency: "drop",
    enabled: () => typeof window.LogicWeaverSettings?.open == "function",
    run: () => window.LogicWeaverSettings?.open()
  }), e.register({
    id: "settings.close",
    title: "关闭设置中心",
    category: "设置",
    description: "关闭并释放新标签页设置对话框",
    keywords: ["关闭设置", "close settings"],
    concurrency: "drop",
    enabled: () => typeof window.LogicWeaverSettings?.close == "function",
    run: () => window.LogicWeaverSettings?.close()
  }), e.register({
    id: "clock.open-settings-menu",
    title: "打开时钟个性化设置",
    category: "时钟",
    description: "呼出中央时钟字体、颜色与时区偏好配置菜单",
    keywords: ["时钟字体", "时钟颜色", "时钟时区", "clock settings"],
    concurrency: "drop",
    enabled: () => typeof window.LogicWeaverClockSettings?.open == "function",
    run: () => window.LogicWeaverClockSettings?.open()
  }), e.register({
    id: "clock.close-settings-menu",
    title: "关闭时钟设置菜单",
    category: "时钟",
    description: "关闭中央时钟偏好配置右键菜单",
    keywords: ["关闭时钟菜单", "close clock settings"],
    concurrency: "drop",
    enabled: () => typeof window.LogicWeaverClockSettings?.close == "function",
    run: () => window.LogicWeaverClockSettings?.close()
  }), e.register({
    id: "bilibili.open-theater",
    title: "打开B站视频剧场",
    category: "Bilibili",
    description: "打开B站沉浸视频播放与评论区弹窗",
    keywords: ["B站播放", "bilibili theater", "视频评论"],
    concurrency: "drop",
    enabled: () => typeof window.LogicWeaverBiliTheater?.open == "function",
    run: () => window.LogicWeaverBiliTheater?.open()
  }), e.register({
    id: "bilibili.close-theater",
    title: "关闭B站视频剧场",
    category: "Bilibili",
    description: "关闭B站沉浸视频播放弹窗并停止播放",
    keywords: ["关闭B站", "close bilibili theater"],
    concurrency: "drop",
    enabled: () => typeof window.LogicWeaverBiliTheater?.close == "function",
    run: () => window.LogicWeaverBiliTheater?.close()
  }), e.register({
    id: "ai.open-dialog",
    title: "打开AI助手",
    category: "AI",
    description: "呼出基于大模型的 AI 对话与知识提炼窗口",
    keywords: ["AI 对话", "ChatGPT", "Gemini", "ai assistant"],
    concurrency: "drop",
    enabled: () => typeof window.LogicWeaverAiDialog?.open == "function",
    run: () => window.LogicWeaverAiDialog?.open()
  }), e.register({
    id: "ai.close-dialog",
    title: "关闭AI助手",
    category: "AI",
    description: "关闭并断开当前 AI 会话窗口",
    keywords: ["关闭AI", "close ai"],
    concurrency: "drop",
    enabled: () => typeof window.LogicWeaverAiDialog?.close == "function",
    run: () => window.LogicWeaverAiDialog?.close()
  });
}
const gr = {
  key: 0,
  id: "guest-preview-banner",
  class: "guest-preview-banner",
  role: "alert",
  "aria-label": "新用户开箱视角预览提示"
}, mr = /* @__PURE__ */ le({
  __name: "GuestPreviewBanner",
  setup(e) {
    function t() {
      _s.exit();
    }
    return (o, n) => (d(), re(is, { name: "guest-banner-slide" }, {
      default: Pt(() => [
        l(ks) ? (d(), f("aside", gr, [
          n[1] || (n[1] = i("div", { class: "banner-content" }, [
            i("span", {
              class: "preview-pulse-dot",
              "aria-hidden": "true"
            }),
            i("div", { class: "banner-texts" }, [
              i("strong", null, "👀 新用户开箱视角预览中"),
              i("small", null, "当前正在模拟新用户刚安装时的纯净首屏体验 · 你的真实数据已安全封存")
            ])
          ], -1)),
          i("button", {
            type: "button",
            class: "btn-exit-guest",
            title: "退出沙箱，原样恢复我的真实网站与数据",
            onClick: t
          }, [...n[0] || (n[0] = [
            i("span", null, "✕ 退出预览，恢复我的数据", -1)
          ])])
        ])) : A("", !0)
      ]),
      _: 1
    }));
  }
}), vr = /* @__PURE__ */ Ce(mr, [["__scopeId", "data-v-a2f2ca5f"]]), yr = ["hidden"], wr = {
  key: 0,
  class: "bookmark-folder-strip-empty"
}, br = ["title", "data-bookmark-folder-id", "onClick", "onContextmenu"], kr = /* @__PURE__ */ le({
  __name: "BookmarkFolderStrip",
  setup(e) {
    const t = F(null);
    function o(c) {
      const y = t.value;
      !y || y.scrollWidth <= y.clientWidth || !c.deltaY || (c.preventDefault(), y.scrollLeft += c.deltaY);
    }
    function n(c) {
      Mo.openFolder(c.id);
    }
    function s(c, y) {
      Mo.openContextMenu(y, c.clientX, c.clientY);
    }
    return (c, y) => (d(), f("nav", {
      id: "bookmark-folder-strip",
      ref_key: "stripRef",
      ref: t,
      class: "bookmark-folder-strip",
      "aria-label": "书签栏文件夹",
      hidden: !l(Lt).enabled,
      onWheel: o
    }, [
      l(Lt).folders.length ? A("", !0) : (d(), f("span", wr, L(l(Lt).emptyMessage || "书签栏没有文件夹"), 1)),
      (d(!0), f(oe, null, me(l(Lt).folders, (m) => (d(), f("button", {
        key: m.id,
        class: "bookmark-folder-chip",
        type: "button",
        title: `打开书签文件夹：${m.title || "未命名"}`,
        "data-bookmark-folder-id": m.id,
        onClick: (u) => n(m),
        onContextmenu: K((u) => s(u, m), ["prevent"])
      }, [
        y[0] || (y[0] = i("span", { "aria-hidden": "true" }, "📁", -1)),
        i("span", null, L(m.title || "未命名"), 1)
      ], 40, br))), 128))
    ], 40, yr));
  }
}), _r = /* @__PURE__ */ Ce(kr, [["__scopeId", "data-v-5e71cc7c"]]), Cr = { class: "cube-manager-body" }, xr = ["disabled", "onClick"], Lr = ["disabled", "onClick"], Tr = ["onClick"], Sr = ["onClick"], $r = ["onClick"], Mr = ["type", "placeholder"], Ir = {
  key: 0,
  role: "alert"
}, Er = /* @__PURE__ */ le({
  __name: "CubeConfigDialog",
  setup(e) {
    const t = _e.state, o = ne(() => _e.getActiveFaces()), n = ne(() => t.registeredFaces.filter((p) => !t.activeFaceIds.includes(p.id))), s = F(""), c = F("memo"), y = F(""), m = F(!1), u = F(JSON.stringify({ title: "每日一句", icon: "📝", customType: "memo", customData: { text: "今天也要记得休息" } }, null, 2)), x = F("");
    function C(p) {
      x.value = "";
      try {
        p();
      } catch (r) {
        x.value = r instanceof Error ? r.message : "操作失败";
      }
    }
    function W() {
      C(() => {
        const p = m.value ? JSON.parse(u.value) : {
          title: s.value,
          customType: c.value,
          customData: { text: y.value, targetDate: y.value, url: y.value }
        };
        _e.addCustomFace(p), s.value = "", y.value = "";
      });
    }
    return (p, r) => (d(), re(ct, { to: "body" }, [
      l(t).isConfigDialogOpen ? (d(), f("section", {
        key: 0,
        class: "cube-manager",
        role: "dialog",
        "aria-label": "管理立方体面",
        onKeydown: r[7] || (r[7] = pi(K((a) => l(_e).closeConfigDialog(), ["stop"]), ["esc"]))
      }, [
        i("header", null, [
          r[8] || (r[8] = i("strong", null, "管理立方体面", -1)),
          i("button", {
            type: "button",
            "aria-label": "关闭",
            onClick: r[0] || (r[0] = (a) => l(_e).closeConfigDialog())
          }, "×")
        ]),
        i("div", Cr, [
          r[16] || (r[16] = i("p", null, "默认只有音乐。可以删除所有面，空位仍可添加。", -1)),
          (d(!0), f(oe, null, me(o.value, (a, g) => (d(), f("div", {
            key: a.id,
            class: "cube-row"
          }, [
            i("span", null, L(a.icon) + " " + L(a.title), 1),
            i("button", {
              type: "button",
              disabled: g === 0,
              onClick: (b) => C(() => l(_e).moveUp(a.id)),
              title: "上移"
            }, "↑", 8, xr),
            i("button", {
              type: "button",
              disabled: g === o.value.length - 1,
              onClick: (b) => C(() => l(_e).moveDown(a.id)),
              title: "下移"
            }, "↓", 8, Lr),
            i("button", {
              type: "button",
              onClick: (b) => C(() => l(_e).removeCustomFace(a.id))
            }, "删除面", 8, Tr)
          ]))), 128)),
          (d(!0), f(oe, null, me(n.value, (a) => (d(), f("div", {
            key: a.id,
            class: "cube-row"
          }, [
            i("span", null, L(a.title) + "（未启用）", 1),
            i("button", {
              type: "button",
              onClick: (g) => C(() => l(_e).toggleActive(a.id, !0))
            }, "添加", 8, Sr),
            a.builtIn ? A("", !0) : (d(), f("button", {
              key: 0,
              type: "button",
              onClick: (g) => C(() => l(_e).removeCustomFace(a.id))
            }, "删除", 8, $r))
          ]))), 128)),
          r[17] || (r[17] = i("h3", null, "添加面", -1)),
          i("label", null, [
            Ae(i("input", {
              "onUpdate:modelValue": r[1] || (r[1] = (a) => m.value = a),
              type: "checkbox"
            }, null, 512), [
              [ns, m.value]
            ]),
            r[9] || (r[9] = Ye(" 粘贴 JSON 配置", -1))
          ]),
          i("form", {
            onSubmit: K(W, ["prevent"])
          }, [
            m.value ? (d(), f(oe, { key: 1 }, [
              r[14] || (r[14] = i("p", null, "仅支持文本、倒数日和链接配置，不执行 JavaScript / HTML。开发者动态注册说明见 SDK 文档。", -1)),
              Ae(i("textarea", {
                "onUpdate:modelValue": r[5] || (r[5] = (a) => u.value = a),
                rows: "9",
                maxlength: "10000",
                "aria-label": "面的 JSON 配置",
                spellcheck: "false"
              }, null, 512), [
                [to, u.value]
              ])
            ], 64)) : (d(), f(oe, { key: 0 }, [
              i("label", null, [
                r[10] || (r[10] = Ye("标题", -1)),
                Ae(i("input", {
                  "onUpdate:modelValue": r[2] || (r[2] = (a) => s.value = a),
                  maxlength: "60",
                  required: ""
                }, null, 512), [
                  [to, s.value]
                ])
              ]),
              i("label", null, [
                r[12] || (r[12] = Ye("类型", -1)),
                Ae(i("select", {
                  "onUpdate:modelValue": r[3] || (r[3] = (a) => c.value = a)
                }, [...r[11] || (r[11] = [
                  i("option", { value: "memo" }, "文本", -1),
                  i("option", { value: "countdown" }, "倒数日", -1),
                  i("option", { value: "link" }, "链接", -1)
                ])], 512), [
                  [ss, c.value]
                ])
              ]),
              i("label", null, [
                r[13] || (r[13] = Ye("内容", -1)),
                Ae(i("input", {
                  "onUpdate:modelValue": r[4] || (r[4] = (a) => y.value = a),
                  type: c.value === "countdown" ? "date" : "text",
                  placeholder: c.value === "link" ? "https://…" : "输入内容",
                  maxlength: "500",
                  required: ""
                }, null, 8, Mr), [
                  [rs, y.value]
                ])
              ])
            ], 64)),
            r[15] || (r[15] = i("button", { type: "submit" }, "添加面", -1))
          ], 32),
          x.value ? (d(), f("p", Ir, L(x.value), 1)) : A("", !0)
        ]),
        i("footer", null, [
          i("button", {
            type: "button",
            onClick: r[6] || (r[6] = (a) => C(() => l(_e).resetDefaults()))
          }, "恢复默认（仅音乐）"),
          r[18] || (r[18] = i("small", null, "自定义配置保留，但退出轮播", -1))
        ])
      ], 32)) : A("", !0)
    ]));
  }
}), Dr = /* @__PURE__ */ Ce(Er, [["__scopeId", "data-v-15dd5487"]]), Pr = ["data-face"], Ar = { class: "ms-top-side" }, Wr = {
  key: 0,
  class: "ms-top-meta"
}, Or = {
  class: "ms-top-title",
  style: { color: "#10b981", "font-weight": "700" }
}, Br = { class: "ms-top-artist" }, Fr = { class: "ms-top-meta" }, Nr = ["title"], Hr = ["title"], Rr = {
  key: 0,
  class: "ms-top-divider"
}, jr = ["title"], Kr = { class: "ms-top-mini-progress" }, Gr = { class: "ms-top-side" }, Ur = ["aria-label"], zr = ["title"], Vr = { class: "ms-cube-custom-icon" }, Yr = { class: "ms-cube-custom-title" }, Xr = ["title"], qr = {
  key: 1,
  class: "ms-cube-custom-text countdown"
}, Jr = ["href"], Qr = {
  class: "ms-cube-dots",
  "aria-hidden": "true"
}, Zr = ["title", "onClick"], ea = { class: "ms-cube-cm-header" }, ta = { class: "ms-cube-cm-list" }, oa = ["onClick"], ia = { class: "ms-cube-cm-icon" }, na = { class: "ms-cube-cm-title" }, sa = {
  key: 0,
  class: "ms-cube-cm-check"
}, ra = /* @__PURE__ */ le({
  __name: "TopInfoCube",
  props: {
    active: { type: Boolean, default: !0 }
  },
  setup(e) {
    const t = e, o = ne(() => rn.visible || Ve.djModalOpen || Ve.isActive && Ve.isJoined), n = ne(() => Ve.isActive && Ve.isJoined), s = ne(() => _e.getActiveFaces()), c = F("music"), y = F(0);
    let m = !1, u;
    Xe(
      () => s.value,
      (I) => {
        I.some((E) => E.id === c.value) || (c.value = I[0]?.id || "");
      },
      { immediate: !0 }
    );
    const x = ne(() => s.value.filter((I) => !I.builtIn)), C = F(!1), W = F({ x: 0, y: 0 });
    Xe(() => t.active, (I) => {
      I || (C.value = !1, _e.closeConfigDialog(), clearTimeout(u), m = !1);
    }, { immediate: !0 });
    const { menuRef: p, style: r } = fn({
      visible: () => C.value,
      anchor: () => W.value,
      dismiss: () => {
        C.value = !1;
      }
    });
    function a(I) {
      I.preventDefault(), I.stopPropagation(), W.value = { x: I.clientX, y: I.clientY }, C.value = !0;
    }
    function g(I) {
      X(I), C.value = !1;
    }
    function b() {
      C.value = !1, _e.openConfigDialog();
    }
    function v() {
      C.value = !1, k(() => _e.resetDefaults()), X("music");
    }
    function k(I) {
      C.value = !1;
      try {
        I();
      } catch (E) {
        Ie.show({ appName: "滚动立方体", title: "保存失败", message: E instanceof Error ? E.message : "请检查浏览器存储" });
      }
    }
    function $(I) {
      if (!I) return "未设置目标日";
      const B = new Date(I).getTime() - P.value, pe = Math.ceil(B / (1e3 * 60 * 60 * 24));
      return pe > 0 ? `还剩 ${pe} 天` : pe === 0 ? "就是今天！" : `已过去 ${Math.abs(pe)} 天`;
    }
    const M = ne(() => G.isBiliRadio ? "B站电台" : G.isNetease ? "网易云" : G.playing ? "塞壬" : "待机"), U = ne(() => G.currentLyric ? G.currentLyric : G.playing ? "♪ 伴奏播放中…" : "选择塞壬歌曲、网易云或B站电台后在这里显示歌词");
    function ce() {
      G.isNetease ? Ue.handleToolClick("music") : Ue.handleToolClick("siren");
    }
    const P = F(Date.now());
    let S;
    Xe(() => t.active && s.value.some((I) => I.id === c.value && I.customType === "countdown"), (I) => {
      I && (P.value = Date.now()), clearInterval(S), S = I ? window.setInterval(() => {
        document.hidden || (P.value = Date.now());
      }, 6e4) : void 0;
    }, { immediate: !0 });
    function X(I, E = null) {
      const B = s.value, pe = B.find((xe) => xe.id === I) || B[0];
      if (pe) {
        if (Number.isFinite(E))
          y.value = E;
        else if (pe.id !== c.value) {
          const xe = B.findIndex((Re) => Re.id === c.value);
          let he = (B.findIndex((Re) => Re.id === pe.id) - xe + B.length) % B.length;
          he > B.length / 2 && (he -= B.length), y.value += he * 90;
        }
        c.value = pe.id;
      }
    }
    function J(I) {
      const E = s.value;
      if (E.length <= 1) return;
      const B = E.findIndex((he) => he.id === c.value), xe = ((B >= 0 ? B : 0) + I + E.length) % E.length, He = E[xe];
      He && X(He.id, y.value + I * 90);
    }
    function D(I) {
      s.value.length <= 1 || I.altKey || Math.abs(I.deltaY) < 2 || (I.preventDefault(), !m && (m = !0, J(I.deltaY > 0 ? 1 : -1), u = setTimeout(() => {
        m = !1;
      }, 420)));
    }
    function H(I) {
      !["ArrowUp", "ArrowDown", "PageUp", "PageDown"].includes(I.key) || I.target?.closest?.("input") || (I.preventDefault(), J(["ArrowDown", "PageDown"].includes(I.key) ? 1 : -1));
    }
    function O(I, E) {
      return c.value === I ? {
        transform: `rotateX(${-y.value}deg) translateZ(22px)`,
        visibility: "visible"
      } : {
        transform: `rotateX(-${E}deg) translateZ(22px)`,
        visibility: "hidden"
      };
    }
    function V(I) {
      const E = I.target;
      E && (E.tagName === "INPUT" || E.tagName === "TEXTAREA" || E.isContentEditable) || (I.preventDefault(), I.stopPropagation());
    }
    function we(I) {
      const E = I.target;
      E && (E.tagName === "INPUT" || E.tagName === "TEXTAREA" || E.isContentEditable) || I.preventDefault();
    }
    return Ot(() => {
      clearInterval(S), clearTimeout(u);
    }), (I, E) => Ae((d(), f("div", {
      class: "ms-top-player",
      "data-face": c.value,
      tabindex: "0",
      title: "滚动立方体 · 滚轮切换面板，右键可自由增删与排序",
      "aria-label": "滚动立方体",
      onWheel: D,
      onKeydown: H,
      onContextmenu: a,
      onCopy: V,
      onSelectstart: we
    }, [
      s.value.length ? A("", !0) : (d(), f("button", {
        key: 0,
        type: "button",
        class: "ms-cube-cm-action",
        onClick: b
      }, "＋ 添加面（右键管理）")),
      i("div", {
        class: "ms-top-cube",
        style: ve({ transform: `translateZ(-22px) rotateX(${y.value}deg)` })
      }, [
        l(_e).isActive("music") && c.value === "music" ? (d(), f("section", {
          key: 0,
          class: "ms-top-face ms-top-face-music",
          "aria-label": "音乐歌词面",
          style: ve(O("music", 0))
        }, [
          i("div", Ar, [
            i("button", {
              class: "ms-top-prev",
              title: "上一首",
              type: "button",
              onClick: E[0] || (E[0] = K((B) => l(Pe).prev(), ["stop"]))
            }, "⏮"),
            i("button", {
              class: "ms-top-play",
              title: "播放/暂停",
              type: "button",
              onClick: E[1] || (E[1] = K((B) => l(Pe).togglePlay(), ["stop"]))
            }, L(l(G).playing ? "⏸" : "▶"), 1)
          ]),
          i("button", {
            class: "ms-top-main",
            title: "打开音乐播放器",
            type: "button",
            onClick: K(ce, ["stop"])
          }, [
            o.value ? (d(), f("div", Wr, [
              i("span", Or, " 🎧 " + L(n.value ? "正在一起听" : "正在收听") + "：" + L(l(G).title || "待机中"), 1),
              i("span", Br, L(l(G).artist), 1)
            ])) : (d(), f(oe, { key: 1 }, [
              i("div", Fr, [
                i("span", {
                  class: "ms-top-title",
                  title: l(G).title || "音乐播放器"
                }, L(l(G).title || "音乐播放器"), 9, Nr),
                i("span", {
                  class: "ms-top-artist",
                  title: l(G).artist || "待机中"
                }, L(l(G).artist || "待机中"), 9, Hr),
                i("span", {
                  class: ue(["ms-top-source", { idle: !l(G).playing }])
                }, L(M.value), 3),
                U.value ? (d(), f("span", Rr)) : A("", !0)
              ]),
              U.value ? (d(), f("span", {
                key: 0,
                class: "ms-top-lyric",
                title: U.value
              }, L(U.value), 9, jr)) : A("", !0)
            ], 64)),
            i("div", Kr, [
              i("div", {
                class: "ms-top-mini-fill",
                style: ve({ width: l(G).progressPercent + "%" })
              }, null, 4)
            ])
          ]),
          i("div", Gr, [
            i("button", {
              class: "ms-top-next",
              title: "下一首",
              type: "button",
              onClick: E[2] || (E[2] = K((B) => l(Pe).next(), ["stop"]))
            }, "⏭"),
            i("button", {
              class: "ms-top-open",
              title: "打开歌单",
              type: "button",
              onClick: K(ce, ["stop"])
            }, "🎵")
          ])
        ], 4)) : A("", !0),
        (d(!0), f(oe, null, me(x.value, (B, pe) => (d(), f("section", {
          key: B.id,
          class: "ms-top-face ms-top-face-custom",
          "aria-label": B.title,
          style: ve(O(B.id, (pe + 1) * 90))
        }, [
          c.value === B.id ? (d(), f("div", {
            key: 0,
            class: "ms-cube-custom-body",
            title: B.desc
          }, [
            i("span", Vr, L(B.icon), 1),
            i("strong", Yr, L(B.title), 1),
            E[10] || (E[10] = i("span", { class: "ms-cube-divider" }, null, -1)),
            B.customType === "memo" ? (d(), f("span", {
              key: 0,
              class: "ms-cube-custom-text",
              title: B.customData?.text
            }, L(B.customData?.text || "（点击右键配置便签内容）"), 9, Xr)) : B.customType === "countdown" ? (d(), f("span", qr, L($(B.customData?.targetDate)), 1)) : B.customType === "link" ? (d(), f("a", {
              key: 2,
              href: B.customData?.url,
              target: "_blank",
              rel: "noreferrer",
              class: "ms-cube-custom-link",
              onClick: E[3] || (E[3] = K(() => {
              }, ["stop"]))
            }, L(B.customData?.url) + " ↗ ", 9, Jr)) : A("", !0)
          ], 8, zr)) : A("", !0),
          i("button", {
            type: "button",
            class: "ms-cube-config-trigger",
            title: "管理立方体面",
            onClick: E[4] || (E[4] = K((xe) => l(_e).openConfigDialog(), ["stop"]))
          }, " ⚙ ")
        ], 12, Ur))), 128))
      ], 4),
      i("div", Qr, [
        (d(!0), f(oe, null, me(s.value, (B) => (d(), f("i", {
          key: B.id,
          class: ue({ on: c.value === B.id }),
          title: B.title,
          onClick: K((pe) => X(B.id), ["stop"])
        }, null, 10, Zr))), 128))
      ]),
      (d(), re(ct, { to: "body" }, [
        t.active && C.value ? (d(), f("div", {
          key: 0,
          ref_key: "menuRef",
          ref: p,
          class: "ms-cube-context-menu",
          style: ve(l(r)),
          onClick: E[9] || (E[9] = K(() => {
          }, ["stop"]))
        }, [
          i("div", ea, [
            E[11] || (E[11] = i("span", null, "🎲 滚动立方体面", -1)),
            i("button", {
              type: "button",
              class: "ms-cube-cm-close",
              onClick: E[5] || (E[5] = (B) => C.value = !1)
            }, "×")
          ]),
          i("div", ta, [
            (d(!0), f(oe, null, me(s.value, (B) => (d(), f("button", {
              key: B.id,
              type: "button",
              class: ue(["ms-cube-cm-item", { active: c.value === B.id }]),
              onClick: (pe) => g(B.id)
            }, [
              i("span", ia, L(B.icon), 1),
              i("span", na, L(B.title), 1),
              c.value === B.id ? (d(), f("span", sa, "✓")) : A("", !0)
            ], 10, oa))), 128))
          ]),
          E[16] || (E[16] = i("div", { class: "ms-cube-cm-divider" }, null, -1)),
          i("button", {
            type: "button",
            class: "ms-cube-cm-action",
            onClick: b
          }, [...E[12] || (E[12] = [
            i("span", null, "＋ 添加面 / 管理面", -1)
          ])]),
          i("button", {
            type: "button",
            class: "ms-cube-cm-action",
            onClick: E[6] || (E[6] = (B) => {
              J(-1), C.value = !1;
            })
          }, [...E[13] || (E[13] = [
            i("span", null, "⏮ 上一个面板", -1)
          ])]),
          i("button", {
            type: "button",
            class: "ms-cube-cm-action",
            onClick: E[7] || (E[7] = (B) => {
              J(1), C.value = !1;
            })
          }, [...E[14] || (E[14] = [
            i("span", null, "⏭ 下一个面板", -1)
          ])]),
          c.value ? (d(), f("button", {
            key: 0,
            type: "button",
            class: "ms-cube-cm-action danger",
            onClick: E[8] || (E[8] = (B) => k(() => l(_e).removeCustomFace(c.value)))
          }, "删除当前面")) : A("", !0),
          i("button", {
            type: "button",
            class: "ms-cube-cm-action danger",
            onClick: v
          }, [...E[15] || (E[15] = [
            i("span", null, "↺ 恢复默认（仅音乐）", -1)
          ])])
        ], 4)) : A("", !0)
      ])),
      t.active ? (d(), re(Dr, { key: 1 })) : A("", !0)
    ], 40, Pr)), [
      [At, t.active]
    ]);
  }
}), aa = /* @__PURE__ */ Ce(ra, [["__scopeId", "data-v-5602a785"]]), la = { class: "tb-brand" }, ca = ["aria-expanded", "aria-label"], da = ["src", "alt"], ua = ["hidden"], pa = ["hidden"], fa = { id: "vue-bookmark-folder-strip-root" }, ha = { class: "tb-actions" }, ga = {
  id: "workspace-launchers",
  hidden: ""
}, ma = /* @__PURE__ */ le({
  __name: "AppTopBar",
  setup(e) {
    const t = j(() => import("./WorkspaceLaunchers-Bm6dvbIB.js"));
    function o(r) {
      r.preventDefault(), r.stopPropagation();
      const a = typeof window < "u" ? window : null;
      a?.LogicWeaverWindowManager?.open ? a.LogicWeaverWindowManager.open("settings") : a?.LogicWeaverWindowTabs?.open ? a.LogicWeaverWindowTabs.open("settings") : Ho.open();
    }
    function n(r) {
      r.preventDefault();
      const a = typeof window < "u" ? window : null;
      typeof a?.toggleBookmarkPanel == "function" ? a.toggleBookmarkPanel() : a?.LogicWeaverBookmarkPanel?.toggle ? a.LogicWeaverBookmarkPanel.toggle() : fi.toggleBookmarkPanel();
    }
    function s(r) {
      r.preventDefault(), mt.toggle();
    }
    function c(r) {
      r.preventDefault(), ro.open(r.clientX, r.clientY);
    }
    const y = [
      { id: "light", icon: "☀️", label: "白天模式" },
      { id: "dark", icon: "🌙", label: "夜晚模式" },
      { id: "endfield", icon: "⚡", label: "终末地风格" },
      { id: "lonetrail", icon: "🌌", label: "孤星风格" }
    ], m = F("☀️"), u = F("切换主题");
    function x() {
      if (typeof document > "u") return;
      const r = document.documentElement.dataset.theme || "light", a = y.find((g) => g.id === r) || y.find((g) => g.id === "light") || y[0];
      m.value = a.icon, u.value = `主题：${a.label}（点击更换）`;
    }
    function C(r) {
      if (r.preventDefault(), typeof document > "u") return;
      const a = document.documentElement.dataset.theme || "light", g = y.findIndex((v) => v.id === a), b = y[(g + 1) % y.length];
      document.documentElement.dataset.theme = b.id;
      try {
        localStorage.setItem("theme", b.id);
      } catch {
      }
      typeof chrome < "u" && chrome?.storage?.local && chrome.storage.local.set({ theme: b.id }), x(), document.querySelectorAll("iframe").forEach((v) => {
        try {
          v.contentWindow?.postMessage({ type: "theme-change", theme: b.id }, "*");
        } catch {
        }
      });
    }
    function W(r) {
      const a = r.target;
      a && (a.tagName === "INPUT" || a.tagName === "TEXTAREA" || a.isContentEditable) || (r.preventDefault(), r.stopPropagation());
    }
    function p(r) {
      const a = r.target;
      a && (a.tagName === "INPUT" || a.tagName === "TEXTAREA" || a.isContentEditable) || r.preventDefault();
    }
    return Ne(() => {
      mt.start();
      const r = localStorage.getItem("theme") || "light";
      document.documentElement.dataset.theme = r, document.documentElement.setAttribute("data-theme", r), x();
    }), (r, a) => (d(), f("header", {
      class: ue(["topbar", { "bookmark-folders-mode": l(Lt).enabled }]),
      onCopy: W,
      onSelectstart: p
    }, [
      i("div", la, [
        i("button", {
          id: "bili-profile-button",
          class: "bili-profile-button",
          type: "button",
          title: "通知中心",
          "aria-controls": "notification-center",
          "aria-expanded": l(an).isOpen,
          "aria-label": l(Nt) ? `通知中心，${l(Nt)} 条未读` : "通知中心",
          onClick: s,
          onContextmenu: a[0] || (a[0] = K((g) => c(g), ["prevent"]))
        }, [
          i("img", {
            id: "bili-profile-avatar",
            src: l(xt).avatarUrl || "assets/bilibili.svg",
            alt: l(xt).userName || "通知中心头像"
          }, null, 8, da),
          i("span", {
            id: "bili-profile-badge",
            class: "bili-profile-badge",
            hidden: l(Nt) <= 0
          }, L(l(Nt) > 99 ? "99+" : l(Nt)), 9, ua)
        ], 40, ca),
        i("button", {
          id: "bookmark-handle",
          class: "bookmark-handle",
          type: "button",
          "aria-expanded": "false",
          title: "书签",
          hidden: l(Lt).enabled,
          onClick: n
        }, [...a[1] || (a[1] = [
          i("span", { id: "bookmark-handle-icon" }, "📁", -1),
          i("span", null, "书签", -1)
        ])], 8, pa),
        i("div", fa, [
          q(_r)
        ])
      ]),
      q(aa, {
        active: !l(oo).activeId
      }, null, 8, ["active"]),
      i("div", ha, [
        a[2] || (a[2] = i("button", {
          id: "daily-toggle",
          class: "tb-pill",
          type: "button",
          hidden: "",
          title: "查看日报"
        }, "📰 日报", -1)),
        i("span", ga, [
          q(l(t))
        ]),
        i("button", {
          id: "settings-open",
          class: "tb-btn",
          title: "设置",
          onClick: o
        }, "⚙"),
        i("button", {
          id: "theme-toggle",
          class: "tb-btn",
          type: "button",
          title: "主题 · 切换风格",
          onClick: C
        }, L(m.value), 1)
      ])
    ], 34));
  }
}), va = {
  key: 0,
  class: "notice"
}, ya = {
  key: 1,
  class: "muted small"
}, wa = {
  key: 2,
  class: "notice"
}, ba = {
  key: 3,
  class: "notice"
}, ka = { class: "wx-cur" }, _a = { class: "wx-emoji" }, Ca = { class: "wx-temp" }, xa = { class: "wx-sub" }, La = { class: "wx-rain" }, Ta = { class: "wx-hours" }, Sa = { class: "hh" }, $a = { class: "he" }, Ma = { class: "ht" }, Ia = { class: "wx-days" }, Ea = ["open"], Da = { class: "weather-forecast-head" }, Pa = { class: "weather-forecast-city-info" }, Aa = { class: "weather-forecast-icon" }, Wa = { id: "weather-forecast-city-title" }, Oa = { class: "small muted" }, Ba = { class: "weather-forecast-actions" }, Fa = {
  key: 0,
  class: "weather-metrics-grid"
}, Na = { class: "weather-metric-item" }, Ha = {
  class: "metric-val",
  id: "weather-forecast-humidity"
}, Ra = { class: "weather-metric-item" }, ja = {
  class: "metric-val",
  id: "weather-forecast-wind"
}, Ka = { class: "weather-metric-item" }, Ga = {
  class: "metric-val",
  id: "weather-forecast-uv"
}, Ua = { class: "weather-metric-item" }, za = {
  class: "metric-val",
  id: "weather-forecast-aqi"
}, Va = {
  class: "weather-forecast-list",
  id: "weather-forecast-days-list"
}, Ya = { class: "day-date-col" }, Xa = { class: "day-name" }, qa = { class: "day-date small muted" }, Ja = { class: "day-weather-col" }, Qa = { class: "day-emoji" }, Za = { class: "day-cond" }, el = { class: "day-rain-col" }, tl = {
  key: 0,
  class: "rain-tag"
}, ol = {
  key: 1,
  class: "rain-tag empty"
}, il = { class: "day-temp-bar-col" }, nl = { class: "low-temp" }, sl = { class: "temp-track" }, rl = { class: "high-temp" }, al = { class: "weather-location-head" }, ll = { class: "weather-location-title-row" }, cl = ["title"], dl = { class: "weather-input-wrapper" }, ul = ["onKeydown"], pl = { key: 0 }, fl = {
  key: 0,
  class: "weather-location-suggestions"
}, hl = ["onClick"], gl = { class: "weather-suggestion-name" }, ml = { class: "weather-suggestion-sub" }, vl = {
  key: 1,
  class: "weather-suggestion-empty"
}, yl = { key: 1 }, wl = { class: "weather-quick-chips-grid" }, bl = ["onClick"], kl = /* @__PURE__ */ le({
  __name: "WeatherWidget",
  setup(e) {
    const t = F(!1), o = F({ x: 0, y: 0 }), n = F(""), s = F(null), c = F(null), y = ["深圳", "武汉", "北京", "上海", "广州", "成都", "杭州", "南京", "西安", "重庆", "苏州", "天津"], m = ne(() => {
      const v = n.value.trim();
      return v ? Xt.filterCities(v, 6) : [];
    });
    function u(v) {
      const U = v?.clientX ?? window.innerWidth / 2 - 140, ce = v?.clientY ?? window.innerHeight / 2 - 320 / 2, P = Math.max(12, Math.min(window.innerWidth - 280 - 12, U)), S = Math.max(12, Math.min(window.innerHeight - 320 - 12, ce));
      o.value = { x: P, y: S }, t.value = !0, n.value = "", Fo(() => {
        c.value?.focus();
      });
    }
    function x() {
      t.value = !1, n.value = "";
    }
    async function C(v) {
      const k = v.trim();
      k && (x(), await Xt.changeCity(k));
    }
    function W() {
      const v = n.value.trim();
      v && C(v);
    }
    function p(v) {
      if (!t.value) return;
      const k = v.target;
      s.value && !s.value.contains(k) && x();
    }
    function r(v) {
      t.value && v.key === "Escape" && (v.preventDefault(), x());
    }
    Ne(() => {
      Ge.setRefreshAction(() => {
        Xt.loadWeather();
      }), Ge.setChangeLocationAction((v) => {
        u(v);
      }), Xt.loadWeather(), window.addEventListener("pointerdown", p, !0), window.addEventListener("keydown", r, !0);
    }), Ot(() => {
      window.removeEventListener("pointerdown", p, !0), window.removeEventListener("keydown", r, !0);
    });
    function a(v) {
      v.preventDefault(), u(v);
    }
    function g() {
      Ge.closeForecastModal();
    }
    function b(v) {
      v.target?.id === "weather-forecast-dialog" && g();
    }
    return (v, k) => (d(), f("div", {
      class: "weather-widget-container",
      onContextmenu: a
    }, [
      l(N).state === "unconfigured" ? (d(), f("p", va, [...k[6] || (k[6] = [
        Ye(" 未设置城市。右键此处快速设置，或到 ", -1),
        i("a", { href: "options.html" }, "设置", -1),
        Ye(" 填写城市名（如 武汉 / Tokyo）。 ", -1)
      ])])) : l(N).state === "loading" ? (d(), f("p", ya, "加载中…")) : l(N).state === "not_found" ? (d(), f("p", wa, "找不到城市「" + L(l(N).city) + "」，右键可重新选择地点。", 1)) : l(N).state === "error" ? (d(), f("p", ba, L(l(N).errorMessage || "天气加载失败，右键此处可重新选择地点。"), 1)) : l(N).state === "ready" && l(N).data ? (d(), f(oe, { key: 4 }, [
        i("div", ka, [
          i("span", _a, L(l(N).data.currentEmoji), 1),
          i("span", Ca, L(l(N).data.currentTemp) + "°", 1)
        ]),
        i("p", xa, L(l(N).data.subText), 1),
        i("p", La, L(l(N).data.rainText), 1),
        i("div", Ta, [
          (d(!0), f(oe, null, me(l(N).data.hours, ($, M) => (d(), f("div", {
            key: M,
            class: "wx-h"
          }, [
            i("span", Sa, L($.time), 1),
            i("span", $a, L($.emoji), 1),
            i("span", Ma, L($.temp) + "°", 1)
          ]))), 128))
        ]),
        i("div", Ia, [
          (d(!0), f(oe, null, me(l(N).data.days, ($, M) => (d(), f("span", { key: M }, L($.label) + " " + L($.emoji) + " " + L($.tempRange), 1))), 128))
        ])
      ], 64)) : A("", !0),
      i("dialog", {
        id: "weather-forecast-dialog",
        class: "weather-forecast-dialog",
        open: l(N).forecastModalOpen,
        onClick: b
      }, [
        i("div", {
          class: "weather-forecast-shell",
          onClick: k[1] || (k[1] = K(() => {
          }, ["stop"]))
        }, [
          i("header", Da, [
            i("div", Pa, [
              i("span", Aa, L(l(N).data?.currentEmoji || "🌤️"), 1),
              i("div", null, [
                i("h3", Wa, L(l(N).city || l(N).data?.cityName || "天气预报"), 1),
                i("p", Oa, L(l(N).data?.subText || "未来多日天气趋势与生活气象指数"), 1)
              ])
            ]),
            i("div", Ba, [
              i("button", {
                id: "weather-forecast-refresh-btn",
                type: "button",
                class: "weather-forecast-btn",
                title: "刷新天气数据",
                onClick: k[0] || (k[0] = ($) => l(Ge).refresh())
              }, " ↻ 刷新 "),
              i("button", {
                id: "weather-forecast-close-btn",
                type: "button",
                class: "weather-forecast-close",
                title: "关闭",
                onClick: g
              }, " ✕ ")
            ])
          ]),
          l(N).detailInfo ? (d(), f("div", Fa, [
            i("div", Na, [
              k[7] || (k[7] = i("span", { class: "metric-label" }, "💧 相对湿度", -1)),
              i("span", Ha, L(l(N).detailInfo.humidity || "50%"), 1)
            ]),
            i("div", Ra, [
              k[8] || (k[8] = i("span", { class: "metric-label" }, "💨 风力风向", -1)),
              i("span", ja, L(l(N).detailInfo.wind || "微风"), 1)
            ]),
            i("div", Ka, [
              k[9] || (k[9] = i("span", { class: "metric-label" }, "☀️ 紫外线指数", -1)),
              i("span", Ga, L(l(N).detailInfo.uvIndex || "中等"), 1)
            ]),
            i("div", Ua, [
              k[10] || (k[10] = i("span", { class: "metric-label" }, "🍃 空气质量", -1)),
              i("span", za, L(l(N).detailInfo.airQuality || "良"), 1)
            ])
          ])) : A("", !0),
          i("div", Va, [
            (d(!0), f(oe, null, me(l(N).forecastDays, ($, M) => (d(), f("div", {
              key: M,
              class: "weather-forecast-day-row forecast-day-item"
            }, [
              i("div", Ya, [
                i("span", Xa, L($.dayName), 1),
                i("span", qa, L($.date), 1)
              ]),
              i("div", Ja, [
                i("span", Qa, L($.emoji), 1),
                i("span", Za, L($.condition), 1)
              ]),
              i("div", el, [
                $.rainProb > 0 ? (d(), f("span", tl, "☂️ " + L($.rainProb) + "%", 1)) : (d(), f("span", ol, "无降水"))
              ]),
              i("div", il, [
                i("span", nl, L($.lowTemp) + "°", 1),
                i("div", sl, [
                  i("div", {
                    class: "temp-range-fill",
                    style: ve({
                      left: `${Math.max(0, Math.min(100, ($.lowTemp + 10) * 2))}%`,
                      width: `${Math.max(20, Math.min(80, ($.highTemp - $.lowTemp) * 6))}%`
                    })
                  }, null, 4)
                ]),
                i("span", rl, L($.highTemp) + "°", 1)
              ])
            ]))), 128))
          ])
        ])
      ], 8, Ea),
      (d(), re(ct, { to: "body" }, [
        t.value ? (d(), f("div", {
          key: 0,
          ref_key: "contextMenuRef",
          ref: s,
          class: "weather-location-context-menu",
          style: ve({ left: `${o.value.x}px`, top: `${o.value.y}px` }),
          onClick: k[4] || (k[4] = K(() => {
          }, ["stop"])),
          onContextmenu: k[5] || (k[5] = K(() => {
          }, ["prevent"]))
        }, [
          i("div", al, [
            i("div", ll, [
              k[12] || (k[12] = i("span", { class: "weather-location-title" }, "切换天气地点", -1)),
              i("span", {
                class: "weather-location-curr-badge",
                title: l(N).city
              }, [
                k[11] || (k[11] = i("span", { class: "weather-curr-dot" }, null, -1)),
                Ye(" " + L(l(N).city || "未设置"), 1)
              ], 8, cl)
            ])
          ]),
          i("form", {
            class: "weather-location-form",
            onSubmit: K(W, ["prevent"])
          }, [
            i("div", dl, [
              k[13] || (k[13] = i("span", { class: "weather-input-icon" }, "🔍", -1)),
              Ae(i("input", {
                ref_key: "inputRef",
                ref: c,
                class: "weather-location-input",
                placeholder: "输入城市名或拼音…",
                "onUpdate:modelValue": k[2] || (k[2] = ($) => n.value = $),
                onKeydown: pi(K(W, ["prevent"]), ["enter"]),
                autocomplete: "off"
              }, null, 40, ul), [
                [to, n.value]
              ]),
              n.value ? (d(), f("button", {
                key: 0,
                type: "button",
                class: "weather-input-clear",
                onClick: k[3] || (k[3] = ($) => n.value = ""),
                title: "清除输入"
              }, "✕")) : A("", !0)
            ]),
            k[14] || (k[14] = i("button", {
              type: "submit",
              class: "weather-location-submit"
            }, "确定", -1))
          ], 32),
          n.value.trim() ? (d(), f("div", pl, [
            k[15] || (k[15] = i("div", { class: "weather-section-subtitle" }, "匹配建议", -1)),
            m.value.length ? (d(), f("div", fl, [
              (d(!0), f(oe, null, me(m.value, ($) => (d(), f("button", {
                key: $.name + $.admin,
                type: "button",
                class: "weather-suggestion-item",
                onClick: (M) => C($.name)
              }, [
                i("span", gl, L($.name), 1),
                i("span", ml, L($.admin), 1)
              ], 8, hl))), 128))
            ])) : (d(), f("div", vl, " 未找到完全匹配城市，回车或点击「确定」直接尝试检索 "))
          ])) : (d(), f("div", yl, [
            k[16] || (k[16] = i("div", { class: "weather-section-subtitle" }, "常用城市", -1)),
            i("div", wl, [
              (d(), f(oe, null, me(y, ($) => i("button", {
                key: $,
                type: "button",
                class: ue(["weather-quick-chip", { active: l(N).city === $ }]),
                onClick: (M) => C($)
              }, L($), 11, bl)), 64))
            ])
          ]))
        ], 36)) : A("", !0)
      ]))
    ], 32));
  }
}), Cn = /* @__PURE__ */ Ce(kl, [["__scopeId", "data-v-51b21266"]]), ui = "heroCustomMottoV1";
function _l() {
  try {
    if (typeof localStorage < "u") {
      const e = localStorage.getItem(ui);
      if (e) {
        const t = JSON.parse(e);
        return {
          customText: typeof t?.customText == "string" ? t.customText : null,
          history: Array.isArray(t?.history) ? t.history : []
        };
      }
    }
  } catch {
  }
  return { customText: null, history: [] };
}
const kt = _l(), R = Ee({
  loaded: !1,
  customText: kt.customText,
  history: kt.history,
  currentIndex: kt.customText && kt.history.length ? kt.history.findIndex((e) => e.text === kt.customText) : -1,
  menuOpen: !1,
  menuPos: { x: 0, y: 0 }
});
function Cl(e) {
  return new Promise((t) => {
    typeof chrome < "u" && chrome?.storage?.local?.get ? chrome.storage.local.get([e], (o) => t(o?.[e])) : t(null);
  });
}
function xl(e, t) {
  try {
    typeof localStorage < "u" && localStorage.setItem(e, JSON.stringify(t));
  } catch {
  }
  return new Promise((o) => {
    typeof chrome < "u" && chrome?.storage?.local?.set ? chrome.storage.local.set({ [e]: t }, () => o()) : o();
  });
}
function Ll(e) {
  const t = (s) => String(s).padStart(2, "0"), o = `${e.getFullYear()}-${t(e.getMonth() + 1)}-${t(e.getDate())}`, n = `${t(e.getHours())}:${t(e.getMinutes())}`;
  return { date: o, time: n };
}
const Ke = {
  async init() {
    try {
      const e = await Cl(ui);
      if (e && typeof e == "object") {
        const t = Array.isArray(e.history) ? e.history : [];
        t.length >= R.history.length && (R.history = t, e.customText !== void 0 && (R.customText = e.customText));
      }
    } catch (e) {
      console.warn("[HeroMotto] Sync chrome.storage failed:", e);
    } finally {
      R.loaded = !0, R.customText && R.history.length && (R.currentIndex = R.history.findIndex(
        (e) => e.text === R.customText
      ));
    }
  },
  async persist() {
    const e = {
      customText: R.customText,
      history: R.history
    };
    await xl(ui, e);
  },
  setCustomMotto(e) {
    const t = e.trim();
    if (!t) {
      this.resetToSystem();
      return;
    }
    const { date: o, time: n } = Ll(/* @__PURE__ */ new Date());
    R.customText = t;
    const s = R.history.findIndex((c) => c.text === t);
    if (s !== -1) {
      const c = R.history.splice(s, 1)[0];
      c.date = o, c.time = n, R.history.unshift(c);
    } else
      R.history.unshift({
        id: `motto_${Date.now()}`,
        date: o,
        time: n,
        text: t,
        createdAt: Date.now()
      });
    R.history.length > 50 && (R.history = R.history.slice(0, 50)), R.currentIndex = 0, this.persist();
  },
  selectHistory(e) {
    R.customText = e.text, R.currentIndex = R.history.findIndex((t) => t.id === e.id), this.closeMenu(), this.persist();
  },
  resetToSystem() {
    R.customText = null, R.currentIndex = -1, this.closeMenu(), this.persist();
  },
  deleteEntry(e) {
    const t = R.history.findIndex((o) => o.id === e);
    t !== -1 && (R.history.splice(t, 1), R.currentIndex === t && (R.history.length > 0 ? this.selectHistory(R.history[0]) : this.resetToSystem()), this.persist());
  },
  clearHistory() {
    R.history = [], this.resetToSystem();
  },
  stepHistory(e) {
    if (!R.history.length) return;
    let t = R.currentIndex + e;
    if (t < 0) {
      this.resetToSystem();
      return;
    }
    t >= R.history.length && (t = 0), this.selectHistory(R.history[t]);
  },
  openMenu(e, t) {
    R.menuPos = { x: e, y: t }, R.menuOpen = !0;
  },
  closeMenu() {
    R.menuOpen = !1;
  }
}, Tl = { class: "motto-content" }, Sl = {
  key: 0,
  class: "motto-scroll-hint",
  title: "滚动鼠标滚轮快速切换历史标语"
}, $l = { class: "motto-menu-header" }, Ml = { class: "dim" }, Il = { class: "motto-history-list" }, El = {
  key: 0,
  class: "motto-history-empty dim"
}, Dl = ["onClick"], Pl = { class: "motto-item-date" }, Al = ["title"], Wl = ["onClick"], Ol = /* @__PURE__ */ le({
  __name: "HeroMotto",
  setup(e) {
    const t = F(!1), o = F(""), n = F(null), s = ne(() => R.customText || fe.greetingText);
    function c() {
      Ke.closeMenu(), o.value = R.customText || fe.greetingText, t.value = !0, Fo(() => {
        n.value?.focus(), n.value?.select();
      });
    }
    function y() {
      if (!t.value) return;
      t.value = !1;
      const p = o.value.trim();
      Ke.setCustomMotto(p), p && Ie.fetch("标语", `已更新标语: ${p}`);
    }
    function m() {
      t.value = !1;
    }
    function u(p) {
      p.key === "Enter" ? (p.preventDefault(), y()) : p.key === "Escape" && (p.preventDefault(), m());
    }
    function x(p) {
      t.value || (p.preventDefault(), p.stopPropagation(), Ke.stepHistory(p.deltaY > 0 ? 1 : -1));
    }
    function C(p) {
      p.preventDefault(), p.stopPropagation(), Ke.openMenu(p.clientX, p.clientY);
    }
    function W(p) {
      R.menuOpen && (p.target.closest(".motto-context-menu") || Ke.closeMenu());
    }
    return Ne(() => {
      Ke.init(), window.addEventListener("click", W);
    }), Ot(() => {
      window.removeEventListener("click", W);
    }), (p, r) => (d(), f(oe, null, [
      i("div", {
        class: "hero-motto-wrapper",
        title: "点击直接编辑标语 · 滚轮切换历史标语 · 右键查看标语菜单",
        onWheel: x,
        onContextmenu: C
      }, [
        t.value ? Ae((d(), f("input", {
          key: 0,
          ref_key: "mottoInputRef",
          ref: n,
          "onUpdate:modelValue": r[0] || (r[0] = (a) => o.value = a),
          class: "hero-motto-input",
          type: "text",
          placeholder: "写下你此刻的个性标语…",
          maxlength: "60",
          onBlur: y,
          onKeydown: u
        }, null, 544)), [
          [to, o.value]
        ]) : (d(), f("p", {
          key: 1,
          id: "greeting",
          class: "hero-motto-text",
          style: ve({ color: l(fe).greetColor }),
          onClick: c
        }, [
          i("span", Tl, L(s.value), 1),
          l(R).history.length > 1 ? (d(), f("span", Sl, "⇕")) : A("", !0)
        ], 4))
      ], 32),
      (d(), re(ct, { to: "body" }, [
        l(R).menuOpen ? (d(), f("div", {
          key: 0,
          class: "motto-context-menu",
          style: ve({ left: `${l(R).menuPos.x}px`, top: `${l(R).menuPos.y}px` }),
          onClick: r[3] || (r[3] = K(() => {
          }, ["stop"])),
          onContextmenu: r[4] || (r[4] = K(() => {
          }, ["prevent"]))
        }, [
          i("div", $l, [
            r[5] || (r[5] = i("span", null, "🏷️ 自定义标语", -1)),
            i("small", Ml, L(l(R).history.length) + " 条记录", 1)
          ]),
          i("button", {
            type: "button",
            class: "motto-menu-action",
            onClick: c
          }, [...r[6] || (r[6] = [
            i("i", null, "✎", -1),
            i("span", null, "编辑当前标语", -1)
          ])]),
          r[9] || (r[9] = i("div", { class: "motto-menu-divider" }, null, -1)),
          r[10] || (r[10] = i("div", { class: "motto-history-label" }, "历史标语记录（点击切换）：", -1)),
          i("div", Il, [
            l(R).history.length ? (d(!0), f(oe, { key: 1 }, me(l(R).history, (a) => (d(), f("div", {
              key: a.id,
              class: ue(["motto-history-item", { active: l(R).customText === a.text }]),
              onClick: (g) => l(Ke).selectHistory(a)
            }, [
              i("span", Pl, L(a.date), 1),
              i("span", {
                class: "motto-item-text",
                title: a.text
              }, L(a.text), 9, Al),
              i("button", {
                type: "button",
                class: "motto-item-del",
                title: "删除此条标语",
                onClick: K((g) => l(Ke).deleteEntry(a.id), ["stop"])
              }, "×", 8, Wl)
            ], 10, Dl))), 128)) : (d(), f("div", El, " 暂无历史标语，自定义的每一条标语都会沉淀在此 "))
          ]),
          r[11] || (r[11] = i("div", { class: "motto-menu-divider" }, null, -1)),
          i("button", {
            type: "button",
            class: "motto-menu-action reset-btn",
            onClick: r[1] || (r[1] = //@ts-ignore
            (...a) => l(Ke).resetToSystem && l(Ke).resetToSystem(...a))
          }, [...r[7] || (r[7] = [
            i("i", null, "↻", -1),
            i("span", null, "恢复系统自动问候（早安/午安/晚安）", -1)
          ])]),
          l(R).history.length ? (d(), f("button", {
            key: 0,
            type: "button",
            class: "motto-menu-action danger-btn",
            onClick: r[2] || (r[2] = //@ts-ignore
            (...a) => l(Ke).clearHistory && l(Ke).clearHistory(...a))
          }, [...r[8] || (r[8] = [
            i("i", null, "🗑", -1),
            i("span", null, "清空全部历史标语", -1)
          ])])) : A("", !0)
        ], 36)) : A("", !0)
      ]))
    ], 64));
  }
}), Bl = /* @__PURE__ */ Ce(Ol, [["__scopeId", "data-v-0514f22a"]]), Fl = /* @__PURE__ */ le({
  __name: "HeroClock",
  setup(e) {
    const t = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
    function o(u) {
      return u < 5 ? "夜深了" : u < 9 ? "早上好" : u < 12 ? "上午好" : u < 14 ? "中午好" : u < 18 ? "下午好" : u < 23 ? "晚上好" : "夜深了";
    }
    function n() {
      const u = ft.state.timezone;
      if (!u || u === "local") return /* @__PURE__ */ new Date();
      try {
        const x = (/* @__PURE__ */ new Date()).toLocaleString("en-US", { timeZone: u });
        return new Date(x);
      } catch {
        return /* @__PURE__ */ new Date();
      }
    }
    function s() {
      const u = (U) => String(U).padStart(2, "0"), x = n(), C = x.getHours(), W = x.getMinutes(), p = x.getSeconds(), r = x.getFullYear(), a = x.getMonth() + 1, g = x.getDate(), b = x.getDay(), v = `${u(C)}:${u(W)}`, k = `:${u(p)}`, $ = o(C), M = `${r}年${a}月${g}日 · ${t[b]}`;
      $t.updateTime(v, k, $, M);
    }
    function c(u) {
      u.preventDefault(), ft.open({ clientX: u.clientX, clientY: u.clientY });
    }
    function y() {
      document.hidden ? m && (clearInterval(m), m = null) : (s(), m || (m = setInterval(s, 1e3)));
    }
    let m = null;
    return ft.initPreferences(), s(), Ne(() => {
      ft.initPreferences(), oo.activeId || (s(), m = setInterval(s, 1e3)), document.addEventListener("visibilitychange", y);
    }), Xe(
      () => oo.activeId,
      (u) => {
        u ? m && (clearInterval(m), m = null) : document.hidden || (s(), m || (m = setInterval(s, 1e3)));
      }
    ), Ot(() => {
      m && (clearInterval(m), m = null), document.removeEventListener("visibilitychange", y);
    }), (u, x) => (d(), f("div", {
      class: "hero-clock-vue-container",
      onContextmenu: c
    }, [
      i("p", {
        id: "clock",
        class: "clock",
        style: ve({ fontFamily: l(fe).fontFamily, color: l(fe).colorHex })
      }, [
        Ye(L(l(fe).timeText), 1),
        i("span", {
          id: "secs",
          style: ve({ color: l(fe).colorHex })
        }, L(l(fe).secsText), 5)
      ], 4),
      i("p", {
        id: "date",
        class: "date",
        style: ve({ color: l(fe).dateColor })
      }, L(l(fe).dateText), 5)
    ], 32));
  }
}), xn = /* @__PURE__ */ Ce(Fl, [["__scopeId", "data-v-38840808"]]), Nl = {
  key: 0,
  class: "home-music-degraded-box"
}, Hl = { class: "degraded-badge-row" }, Rl = { class: "degraded-status" }, jl = {
  key: 0,
  class: "degraded-host-tag"
}, Kl = {
  key: 1,
  class: "degraded-host-tag"
}, Gl = { class: "degraded-title-row" }, Ul = ["title"], zl = { class: "degraded-track-artist" }, Vl = { class: "degraded-progress-bar-wrap" }, Yl = { class: "degraded-actions" }, Xl = { class: "degraded-time" }, ql = { class: "home-vinyl-box" }, Jl = ["src"], Ql = { class: "home-music-right" }, Zl = ["title"], ec = {
  id: "home-music-artist",
  class: "home-music-meta-artist"
}, tc = { class: "home-music-seek-row" }, oc = {
  id: "home-music-cur",
  class: "home-music-time"
}, ic = ["value"], nc = {
  id: "home-music-dur",
  class: "home-music-time"
}, sc = { class: "home-music-actions" }, rc = /* @__PURE__ */ le({
  __name: "HomeMusicCard",
  setup(e) {
    Ne(() => {
      setTimeout(() => {
        cs();
      }, 200);
    });
    const t = ne(() => rn.visible || Ve.djModalOpen || Ve.isActive && Ve.isJoined), o = ne(() => Ve.isActive && Ve.isJoined), n = ne(() => G.mode === "shuffle" ? "🔀" : G.mode === "one" ? "🔂" : "🔁");
    function s(y) {
      const m = y.target, u = Number(m.value);
      Pe.seek(u);
    }
    function c() {
      Pe.update({ coverUrl: "" });
    }
    return (y, m) => (d(), f("div", {
      id: "home-music-player-view",
      class: ue(["home-music-player-view", { "is-degraded": t.value }])
    }, [
      t.value ? (d(), f("div", Nl, [
        i("div", Hl, [
          m[7] || (m[7] = i("span", { class: "degraded-icon" }, "🎧", -1)),
          i("strong", Rl, L(o.value ? "正在一起听" : "后台收听中"), 1),
          o.value ? (d(), f("span", jl, " DJ: " + L(l(Ve).hostName), 1)) : (d(), f("span", Kl, " 工作区就绪 "))
        ]),
        i("div", Gl, [
          i("h3", {
            class: "degraded-track-title",
            title: l(G).title
          }, L(l(G).title || "待机中"), 9, Ul),
          i("p", zl, L(l(G).artist), 1)
        ]),
        i("div", Vl, [
          i("div", {
            class: "degraded-progress-bar-fill",
            style: ve({ width: l(G).progressPercent + "%" })
          }, null, 4)
        ]),
        i("div", Yl, [
          i("button", {
            type: "button",
            class: "degraded-btn",
            onClick: m[0] || (m[0] = (u) => l(Pe).togglePlay())
          }, L(l(G).playing ? "⏸ 暂停" : "▶ 播放"), 1),
          i("span", Xl, L(l(G).formattedCurrent) + " / " + L(l(G).formattedDuration), 1)
        ])
      ])) : (d(), f(oe, { key: 1 }, [
        i("div", ql, [
          i("div", {
            id: "home-vinyl-needle",
            class: ue(["home-vinyl-needle", { playing: l(G).playing }])
          }, [...m[8] || (m[8] = [
            Vt('<svg viewBox="0 0 32 52" fill="none" data-v-25a69816><circle cx="26" cy="4" r="3.5" fill="#e2e8f0" stroke="#475569" stroke-width="1.5" data-v-25a69816></circle><circle cx="26" cy="4" r="1.5" fill="#64748b" data-v-25a69816></circle><path d="M26 4 L14 26 L11 44" stroke="#cbd5e1" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" data-v-25a69816></path><rect x="7" y="42" width="8" height="9" rx="1.5" fill="#f43f5e" transform="rotate(-15 11 46)" data-v-25a69816></rect></svg>', 1)
          ])], 2),
          i("div", {
            id: "home-vinyl-disc",
            class: ue(["home-vinyl-disc", { playing: l(G).playing }]),
            title: "点击播放 / 暂停",
            onClick: m[1] || (m[1] = (u) => l(Pe).togglePlay())
          }, [
            l(G).coverUrl ? (d(), f("img", {
              key: 0,
              id: "home-vinyl-cover",
              class: "home-vinyl-cover",
              referrerpolicy: "no-referrer",
              src: l(G).coverUrl,
              alt: "音乐封面",
              onError: c
            }, null, 40, Jl)) : A("", !0),
            m[9] || (m[9] = i("div", { class: "home-vinyl-hole" }, null, -1))
          ], 2)
        ]),
        i("div", Ql, [
          i("h3", {
            id: "home-music-title",
            class: "home-music-meta-title",
            title: l(G).title
          }, L(l(G).title), 9, Zl),
          i("p", ec, L(l(G).artist), 1),
          i("div", tc, [
            i("span", oc, L(l(G).formattedCurrent), 1),
            i("input", {
              id: "home-music-seek",
              class: "home-music-seek-bar",
              type: "range",
              min: "0",
              max: "100",
              value: l(G).progressPercent,
              onInput: s
            }, null, 40, ic),
            i("span", nc, L(l(G).formattedDuration), 1)
          ]),
          i("div", sc, [
            i("button", {
              id: "home-music-prev",
              class: "home-music-btn",
              type: "button",
              title: "上一首",
              onClick: m[2] || (m[2] = (u) => l(Pe).prev())
            }, " ⏮ "),
            i("button", {
              id: "home-music-play",
              class: "home-music-btn play-btn",
              type: "button",
              title: "播放 / 暂停",
              onClick: m[3] || (m[3] = (u) => l(Pe).togglePlay())
            }, L(l(G).playing ? "⏸" : "▶"), 1),
            i("button", {
              id: "home-music-next",
              class: "home-music-btn",
              type: "button",
              title: "下一首",
              onClick: m[4] || (m[4] = (u) => l(Pe).next())
            }, " ⏭ "),
            i("button", {
              id: "home-music-like",
              class: ue(["home-music-btn like-btn", { liked: l(G).liked }]),
              type: "button",
              title: "收藏",
              onClick: m[5] || (m[5] = (u) => l(Pe).toggleLike())
            }, L(l(G).liked ? "♥" : "♡"), 3),
            i("button", {
              id: "home-music-mode",
              class: "home-music-btn",
              type: "button",
              title: "播放模式",
              onClick: m[6] || (m[6] = (u) => l(Pe).cycleMode())
            }, L(n.value), 1)
          ])
        ])
      ], 64))
    ], 2));
  }
}), Ln = /* @__PURE__ */ Ce(rc, [["__scopeId", "data-v-25a69816"]]), ot = /* @__PURE__ */ new Map(), it = /* @__PURE__ */ new Set();
function ac(e, t) {
  for (ot.delete(e), ot.set(e, t), it.delete(t), it.add(t); ot.size > 512; )
    ot.delete(ot.keys().next().value);
  for (; it.size > 512; )
    it.delete(it.values().next().value);
}
const lc = {
  key: 0,
  class: "launcher-fallback"
}, cc = ["src"], ii = "lw_resolved_icon:", dc = /* @__PURE__ */ le({
  __name: "LauncherFavicon",
  props: {
    link: {},
    mini: { type: Boolean, default: !1 }
  },
  setup(e) {
    function t(v) {
      try {
        return localStorage.getItem(ii + v) || "";
      } catch {
        return "";
      }
    }
    function o(v, k) {
      try {
        localStorage.setItem(ii + v, k);
      } catch {
      }
    }
    function n(v) {
      try {
        return localStorage.getItem("lw_sync_dataurl:" + v) || "";
      } catch {
        return "";
      }
    }
    const s = e;
    function c(v) {
      try {
        return new URL(v).hostname.replace(/^www\./, "");
      } catch {
        return v || "";
      }
    }
    function y(v) {
      try {
        return new URL(v).origin;
      } catch {
        return "";
      }
    }
    function m(v) {
      try {
        const k = window, $ = typeof k.chrome < "u" ? k.chrome : globalThis.chrome;
        if (typeof $?.runtime?.getURL == "function")
          return $.runtime.getURL("_favicon/?pageUrl=" + encodeURIComponent(v) + "&size=64");
      } catch {
      }
      return "";
    }
    const u = ne(() => {
      const v = s.link, k = (v.title || c(v.url)).trim();
      return k ? k.slice(0, 1).toUpperCase() : "🔗";
    }), x = F([]), C = F(0), W = F(!1), p = F(!1), r = ne(() => p.value || C.value >= x.value.length ? "" : x.value[C.value] || "");
    function a() {
      const v = s.link;
      if (!v?.url) {
        x.value = [], p.value = !0, W.value = !1;
        return;
      }
      const k = [], $ = n(v.url);
      $ && k.push($);
      const M = ot.get(v.url) || t(v.url);
      M && !k.includes(M) && k.push(M);
      const U = (D) => D ? /google\.com\/s2\/favicons|icons\.duckduckgo\.com|unavatar\.io|icon\.horse/i.test(D) : !1;
      v.customIcon && !U(v.customIcon) && k.push(v.customIcon), v.icon && !U(v.icon) && k.push(v.icon);
      const ce = m(v.url);
      ce && !k.includes(ce) && k.push(ce);
      const P = Z.getCachedIcon(v.url);
      P && !k.includes(P) && k.push(P);
      const S = y(v.url);
      S && !S.startsWith("http://1.") && !S.startsWith("http://192.") && !S.startsWith("http://127.") && k.push(`${S}/favicon.ico`), v.customIcon && !U(v.customIcon) && k.unshift(v.customIcon);
      const X = [...new Set(k.filter(Boolean))];
      x.value = X, C.value = 0, p.value = X.length === 0;
      const J = X[0];
      J && (J.startsWith("data:") || it.has(J)) && (W.value = !0);
    }
    Xe(
      () => [s.link?.url, s.link?.icon, s.link?.customIcon],
      (v, k) => {
        k && v[0] === k[0] && v[1] === k[1] && v[2] === k[2] || a();
      },
      { immediate: !0 }
    ), Ne(() => {
      x.value.length === 0 && a();
    });
    function g(v) {
      W.value = !0, p.value = !1;
      const k = r.value;
      if (k) {
        const $ = it.has(k), M = ot.get(s.link.url);
        ac(s.link.url, k), M !== k && t(s.link.url) !== k && o(s.link.url, k);
        const U = v.target;
        if (!$ && !k.startsWith("data:")) {
          const ce = s.link.url;
          setTimeout(() => {
            Z.cacheIcon(ce, k, U?.getAttribute("src") === k ? U : null);
          }, 0);
        }
      }
    }
    function b() {
      const v = r.value;
      if (v) {
        it.delete(v), ot.get(s.link.url) === v && ot.delete(s.link.url);
        try {
          localStorage.removeItem(ii + s.link.url), localStorage.removeItem("lw_sync_dataurl:" + s.link.url);
        } catch {
        }
      }
      if (v && Z.getCachedIcon(s.link.url) === v && Z.evictCachedIcon(s.link.url), C.value + 1 < x.value.length) {
        C.value += 1;
        const k = x.value[C.value];
        k && (k.startsWith("data:") || it.has(k)) && (W.value = !0);
      } else
        p.value = !0, W.value = !1;
    }
    return (v, k) => (d(), f("span", {
      class: ue(e.mini ? "launcher-folder-mini" : "launcher-favicon")
    }, [
      p.value || !r.value ? (d(), f("span", lc, L(u.value), 1)) : (d(), f("img", {
        key: 1,
        src: r.value,
        alt: "",
        draggable: "false",
        referrerpolicy: "no-referrer",
        decoding: "async",
        style: { "pointer-events": "none", "user-select": "none" },
        onLoad: g,
        onError: b
      }, null, 40, cc))
    ], 2));
  }
}), Wo = /* @__PURE__ */ Ce(dc, [["__scopeId", "data-v-bc41d0d8"]]), uc = { class: "launcher-label launcher-title" }, pc = ["title"], fc = {
  key: 0,
  class: "launcher-folder-more"
}, hc = {
  key: 1,
  class: "empty-folder",
  "aria-hidden": "true"
}, gc = { class: "launcher-folder-label launcher-title" }, mc = /* @__PURE__ */ le({
  __name: "LauncherTileContent",
  props: {
    link: {},
    folder: {},
    size: { default: "small" }
  },
  setup(e) {
    const t = e, o = ne(() => t.size === "large" ? 9 : 4), n = ne(() => t.folder?.preview.slice(0, t.folder.count > o.value ? o.value - 1 : o.value) || []);
    return (s, c) => e.link ? (d(), f(oe, { key: 0 }, [
      q(Wo, { link: e.link }, null, 8, ["link"]),
      i("span", uc, L(e.link.title), 1)
    ], 64)) : e.folder ? (d(), f(oe, { key: 1 }, [
      i("div", {
        class: "launcher-folder-preview",
        title: `打开${e.folder.title}`
      }, [
        (d(!0), f(oe, null, me(n.value, (y) => (d(), re(Wo, {
          key: y.id,
          link: y,
          mini: !0
        }, null, 8, ["link"]))), 128)),
        e.folder.count > o.value ? (d(), f("span", fc, "+" + L(e.folder.count - (o.value - 1)), 1)) : A("", !0),
        n.value.length ? A("", !0) : (d(), f("span", hc, "📁")),
        Ji(s.$slots, "default", {}, void 0, !0)
      ], 8, pc),
      i("span", gc, L(e.folder.title), 1)
    ], 64)) : A("", !0);
  }
}), Ki = /* @__PURE__ */ Ce(mc, [["__scopeId", "data-v-7f513029"]]), vc = 5, yc = 180;
function wc(e, t, o) {
  const n = t - e.left, s = o - e.top;
  return n > e.width * 0.25 && n < e.width * 0.75 && s > e.height * 0.25 && s < e.height * 0.75;
}
function bc(e, t, o) {
  return Math.hypot(t - (e.left + e.width / 2), o - (e.top + e.height / 2)) <= Math.max(e.width, e.height) * 0.55;
}
const kc = {
  class: "launcher-group launcher-aihot launcher-todoist size-large",
  id: "launcher-todoist"
}, _c = {
  class: "aihot-home-body",
  id: "aihot-home-body"
}, Cc = {
  key: 0,
  class: "muted small"
}, xc = {
  key: 1,
  class: "notice small"
}, Lc = {
  key: 2,
  class: "muted small aihot-home-empty"
}, Tc = {
  key: 3,
  class: "aihot-home-rich-list"
}, Sc = ["href", "title", "onClick"], $c = { class: "aihot-home-rich-main" }, Mc = { class: "aihot-home-rich-title" }, Ic = {
  key: 0,
  class: "aihot-home-rich-summary"
}, Ec = { class: "aihot-home-rich-meta" }, Dc = { class: "aihot-home-rich-meta-left" }, Pc = {
  key: 0,
  class: "aihot-home-rich-tag"
}, Ac = { class: "aihot-home-rich-source" }, Wc = { class: "aihot-home-rich-time" }, Gi = 6, Oc = /* @__PURE__ */ le({
  __name: "LauncherAiHotCard",
  setup(e) {
    const t = {
      "ai-models": "🤖 模型",
      "ai-products": "🚀 产品",
      industry: "🏢 行业",
      paper: "📄 论文",
      tip: "💡 观点",
      code: "💻 开源",
      hardware: "⚡ 算力",
      robot: "🦾 具身"
    }, o = F([]), n = F(0), s = F(!0), c = F("");
    function y(a) {
      return a.category ? t[a.category] || a.category : "";
    }
    function m(a) {
      const g = a.publishedAt || a.published || "";
      if (!g) return "最新";
      const b = Number(g), v = Number.isFinite(b) && b > 0 ? new Date(b > 1e12 ? b : b * 1e3) : new Date(g);
      if (isNaN(v.getTime())) return String(g).slice(0, 16) || "最新";
      const k = (S) => String(S).padStart(2, "0"), $ = v.getFullYear(), M = k(v.getMonth() + 1), U = k(v.getDate()), ce = k(v.getHours()), P = k(v.getMinutes());
      return `${$}-${M}-${U} ${ce}:${P}`;
    }
    const u = [
      {
        id: "fb-1",
        title: "DeepSeek 发布新一代推理与开源模型架构，算力能效与推理表现获全球瞩目",
        summary: "新一代模型在长文本理解、复杂数学推导与代码生成领域实现大幅跃升，全面革新开源生态格局与部署成本。",
        category: "ai-models",
        sourceName: "AI 科技评论",
        publishedAt: new Date(Date.now() - 36e5).toISOString(),
        links: { original: "https://aihot.virxact.com" },
        url: "https://aihot.virxact.com"
      },
      {
        id: "fb-2",
        title: "Anthropic 正式推出 Claude 3.7 Sonnet 混合推理模型与交互演进",
        summary: "业界首创结合瞬时直答与长思维链展开模式，兼顾极速响应与深层次逻辑推理，编码能力刷新多项基准。",
        category: "ai-models",
        sourceName: "机器之心",
        publishedAt: new Date(Date.now() - 72e5).toISOString(),
        links: { original: "https://aihot.virxact.com" },
        url: "https://aihot.virxact.com"
      },
      {
        id: "fb-3",
        title: "OpenAI 发布 GPT-4.5 预研与多模态感知前沿技术进展报告",
        summary: "更大规模的世界知识储备与常识对齐，进一步缩减幻觉率，带来更自然的上下文情感感知与工具调用精度。",
        category: "industry",
        sourceName: "量子位",
        publishedAt: new Date(Date.now() - 108e5).toISOString(),
        links: { original: "https://aihot.virxact.com" },
        url: "https://aihot.virxact.com"
      },
      {
        id: "fb-4",
        title: "具身智能开源机器人开源框架发布，多模态大模型进入物理现实交互新阶段",
        summary: "从视觉语言感知到肢体灵巧操作的端到端神经驱动方案，大幅降低机器人动作泛化与仿真学习门槛。",
        category: "robot",
        sourceName: "新智元",
        publishedAt: new Date(Date.now() - 144e5).toISOString(),
        links: { original: "https://aihot.virxact.com" },
        url: "https://aihot.virxact.com"
      },
      {
        id: "fb-5",
        title: "AI 编程智能体大规模落地开发团队，软件工程流水线迈向全面自动化",
        summary: "代码检索、自动修复测试用例、全景架构审查及一键重构工具已无缝嵌入主流 IDE 与 Git 工作流。",
        category: "code",
        sourceName: "InfoQ",
        publishedAt: new Date(Date.now() - 18e6).toISOString(),
        links: { original: "https://aihot.virxact.com" },
        url: "https://aihot.virxact.com"
      },
      {
        id: "fb-6",
        title: "多模态大模型芯片与集群能效优化报告：端侧低功耗推理成为新焦点",
        summary: "混合量化与投机解码技术走向成熟，在普通消费级终端与嵌入式边缘硬件上实现高质量全尺寸模型流畅运行。",
        category: "hardware",
        sourceName: "极客公园",
        publishedAt: new Date(Date.now() - 216e5).toISOString(),
        links: { original: "https://aihot.virxact.com" },
        url: "https://aihot.virxact.com"
      }
    ];
    function x() {
      const g = (typeof window < "u" ? window : null)?.LogicWeaverAihotFeed?.getState?.()?.feedArticles;
      if (Array.isArray(g) && g.length)
        return g;
      const b = [
        "newtab_aihot_items_v2",
        "lw-aihot-cached-feed-all-24h-v1",
        "lw-aihot-cached-feed-v1"
      ];
      for (const v of b)
        try {
          const k = localStorage.getItem(v);
          if (k) {
            const $ = JSON.parse(k);
            if (Array.isArray($) && $.length) return $;
            if ($ && Array.isArray($.items) && $.items.length) return $.items;
          }
        } catch {
        }
      return [];
    }
    async function C(a = !1) {
      if (!a && o.value.length > 0) return;
      const g = x();
      g.length ? (o.value = g, s.value = !1) : o.value.length || (o.value = [...u], s.value = !1);
      try {
        const v = await (await fetch("https://aihot.virxact.com/api/v1/items?mode=selected&window=24h&limit=24", {
          headers: { Accept: "application/json" },
          signal: AbortSignal.timeout(5e3)
        })).json(), k = Array.isArray(v) ? v : v.items || v.data || v.results || [];
        if (k.length) {
          o.value = k, n.value = 0, c.value = "";
          try {
            localStorage.setItem("newtab_aihot_items_v2", JSON.stringify(k.slice(0, 30)));
          } catch {
          }
        }
      } catch {
        o.value.length || (o.value = [...u]);
      } finally {
        s.value = !1;
      }
    }
    function W() {
      if (!o.value.length) {
        s.value = !0, C(!0);
        return;
      }
      n.value += Gi, n.value >= o.value.length && (n.value = 0);
    }
    function p() {
      const a = window;
      if (typeof a.enterFullscreenCard == "function") {
        a.enterFullscreenCard("daily-aihot");
        return;
      }
      const g = document.querySelector("#daily-aihot, [data-dock-id='daily-aihot']");
      g ? g.scrollIntoView({ behavior: "smooth", block: "start" }) : window.open("https://aihot.virxact.com", "_blank", "noreferrer");
    }
    function r(a, g) {
      if (g.ctrlKey || g.metaKey || g.shiftKey || g.button === 1) return;
      g.preventDefault();
      const b = a.links?.original || a.links?.aihot || a.url || "#";
      mi.openArticle(
        {
          id: a.id,
          title: a.title,
          summary: a.summary,
          sourceName: a.source?.name || a.sourceName || "AI HOT",
          published: m(a),
          url: b
        },
        ""
      );
    }
    return Ne(() => {
      C();
    }), (a, g) => (d(), f("section", kc, [
      i("header", { class: "card-head aihot-home-head" }, [
        g[0] || (g[0] = i("span", { class: "bar cyan" }, null, -1)),
        g[1] || (g[1] = i("strong", { class: "title" }, "AI HOT 资讯", -1)),
        g[2] || (g[2] = i("span", { class: "grow" }, null, -1)),
        i("button", {
          class: "aihot-home-btn",
          type: "button",
          title: "换一批最新资讯",
          onClick: W
        }, " 换一批 ↻ "),
        i("button", {
          class: "aihot-home-btn aihot-home-more-btn",
          type: "button",
          title: "查看完整 AI HOT 榜单",
          onClick: p
        }, " 热榜 ↗ ")
      ]),
      i("div", _c, [
        s.value && !o.value.length ? (d(), f("p", Cc, "正在加载精选资讯…")) : c.value && !o.value.length ? (d(), f("p", xc, L(c.value), 1)) : o.value.length ? (d(), f("div", Tc, [
          (d(!0), f(oe, null, me(o.value.slice(n.value, n.value + Gi), (b, v) => (d(), f("a", {
            key: b.id || b.title,
            class: "aihot-home-rich-card",
            href: b.links?.original || b.links?.aihot || b.url || "#",
            target: "_blank",
            rel: "noreferrer",
            title: `${b.title}
${b.summary || ""}
点击在阅读器中查看`,
            onClick: (k) => r(b, k)
          }, [
            i("span", {
              class: ue(["aihot-home-rich-rank", { top: n.value + v < 3 }])
            }, L(n.value + v + 1), 3),
            i("div", $c, [
              i("h3", Mc, L(b.title), 1),
              b.summary ? (d(), f("p", Ic, L(b.summary), 1)) : A("", !0),
              i("div", Ec, [
                i("div", Dc, [
                  y(b) ? (d(), f("span", Pc, L(y(b)), 1)) : A("", !0),
                  i("span", Ac, L(b.source?.name || b.sourceName || "AI HOT"), 1)
                ]),
                i("time", Wc, L(m(b)), 1)
              ])
            ])
          ], 8, Sc))), 128))
        ])) : (d(), f("p", Lc, "暂无精选资讯，请点击换一批重试"))
      ])
    ]));
  }
}), Bc = /* @__PURE__ */ Ce(Oc, [["__scopeId", "data-v-cc4398a8"]]), Fc = {
  class: "sites-view-switch",
  role: "group",
  "aria-label": "网站与书签切换"
}, Nc = ["disabled", "aria-pressed"], Hc = ["disabled", "aria-pressed"], Rc = {
  class: "launcher-page-tabs",
  role: "tablist",
  "aria-label": "常用网站分区"
}, jc = ["data-page", "title", "onClick", "onContextmenu", "onDragover", "onDrop"], Kc = {
  key: 0,
  id: "bookmark-board-header",
  class: "launcher-page-tabs"
}, Gc = ["data-page"], Uc = ["href", "title", "data-launcher-id", "onPointerdown", "onClick", "onContextmenu"], zc = ["title", "data-launcher-folder", "onPointerdown", "onDragstart", "onDrop", "onClick", "onContextmenu"], Vc = ["title", "onClick"], Yc = {
  class: "launcher-folder-count",
  hidden: ""
}, Xc = {
  class: "launcher-empty",
  key: "empty-msg"
}, qc = {
  key: 1,
  class: "launcher-media-stack"
}, Jc = {
  key: 1,
  id: "launcher-bili"
}, Qc = { class: "launcher-folder-preview" }, Zc = { class: "launcher-folder-label launcher-title" }, ed = { class: "launcher-label launcher-title" }, td = /* @__PURE__ */ le({
  __name: "FavoriteSites",
  setup(e) {
    const t = j(() => import("./BookmarkBoard-H8lUcpKo.js")), o = F("sites"), n = F(!1);
    Ne(() => {
      be.setExternalDragHandler(k), be.setExternalDropHandler($);
      const h = window;
      ie.hasBili && typeof h.ensureLauncherMediaCards == "function" && h.ensureLauncherMediaCards();
    });
    const s = F(!1), c = F(""), y = F(null), m = F(null), u = F(null), x = F(null);
    let C = !1, W = 0, p = 0, r = 0, a = "", g = 0, b = "", v = 0;
    function k(h) {
      if (o.value !== "sites") return;
      if (!h || Fe.isOpen) {
        x.value && (x.value = null), b = "";
        return;
      }
      const w = document.elementsFromPoint(h.clientX, h.clientY);
      if (!w.some(
        (Se) => Se.classList.contains("launcher-site-items") || !!Se.closest?.(".launcher-site-items")
      )) {
        x.value && (x.value = null), b = "";
        return;
      }
      const T = w.find((Se) => Se.classList.contains("launcher-link") && Se.getAttribute("data-launcher-id") !== String(h.link.id) || Se.classList.contains("launcher-folder"));
      if (!T) return;
      const Y = T.classList.contains("launcher-link"), de = Y ? T.getAttribute("data-launcher-id") : null, Le = Y ? null : T.getAttribute("data-launcher-folder"), Q = Y ? `link-${de}` : `folder-${Le}`, te = T.getBoundingClientRect(), Me = te.left + te.width / 2, Ko = te.top + te.height / 2, Ft = Math.hypot(h.clientX - Me, h.clientY - Ko), yt = Date.now();
      if (Ft > Math.max(te.width, te.height) * 0.55 || Q === b && yt - v < 180) return;
      const wt = ze.value.filter(
        (Se) => Se.type !== "link" || String(Se.link.id) !== String(h.link.id)
      ), Je = [...x.value || wt], rt = Je.findIndex(
        (Se) => Se.type === "link" && String(Se.link.id) === String(h.link.id)
      ), at = Je.findIndex((Se) => Se.key === Q);
      if (at < 0) return;
      const je = {
        key: `link-${h.link.id}`,
        type: "link",
        link: h.link
      };
      rt >= 0 ? rt !== at && (Je.splice(rt, 1), Je.splice(at, 0, je), x.value = Je, b = Q, v = yt) : (Je.splice(at, 0, je), x.value = Je, b = Q, v = yt);
    }
    async function $(h) {
      if (o.value !== "sites" || Fe.isOpen) return !1;
      if (x.value) {
        const w = x.value.map((_) => ({
          type: _.type,
          id: _.type === "link" ? String(_.link.id) : void 0,
          groupName: _.type === "folder" ? _.folder.groupName : void 0
        }));
        return await Z.moveLinkTo(String(h.id), ie.activePage, "常用网站"), await Z.reorderPageItems(ie.activePage, w), x.value = null, b = "", !0;
      }
      return !1;
    }
    const M = Ee({
      visible: !1,
      x: 0,
      y: 0,
      type: "link",
      link: null,
      folder: null,
      offsetX: 34,
      offsetY: 38
    });
    let U = null, ce = 0, P = 0, S = null, X = null, J = !1;
    function D(h, w) {
      if (w.button !== 0) return;
      U = w.pointerId, ce = w.clientX, P = w.clientY, p = w.clientX, r = w.clientY, S = String(h.id), X = null, J = !1;
      const _ = w.currentTarget.getBoundingClientRect();
      M.offsetX = w.clientX - _.left, M.offsetY = w.clientY - _.top, M.type = "link", M.link = h, M.folder = null, window.addEventListener("pointermove", I, { passive: !1 }), window.addEventListener("pointerup", B), window.addEventListener("pointercancel", B);
    }
    function H(h, w, _) {
      if (_.button !== 0 || _.target.closest(".launcher-folder-del-btn")) return;
      U = _.pointerId, ce = _.clientX, P = _.clientY, p = _.clientX, r = _.clientY, S = null, X = h, J = !1;
      const T = _.currentTarget.getBoundingClientRect();
      M.offsetX = _.clientX - T.left, M.offsetY = _.clientY - T.top, M.type = "folder", M.folder = {
        groupName: h,
        size: he(h),
        links: w?.links || []
      }, M.link = null, window.addEventListener("pointermove", I, { passive: !1 }), window.addEventListener("pointerup", B), window.addEventListener("pointercancel", B);
    }
    let O = 0, V = null;
    function we() {
      cancelAnimationFrame(O), O = 0, V = null;
    }
    function I(h) {
      h.pointerId === U && (J && h.cancelable && h.preventDefault(), V = h, !O && (O = requestAnimationFrame(() => {
        O = 0;
        const w = V;
        V = null, w && E(w);
      })));
    }
    function E(h) {
      if (h.pointerId !== U || !S && !X) return;
      const w = Math.hypot(h.clientX - ce, h.clientY - P);
      if (!J && w > vc && (J = !0, C = !0, S ? m.value = S : X && (u.value = X)), !J) return;
      (M.link || M.folder) && (M.visible = !0, M.x = h.clientX - M.offsetX, M.y = h.clientY - M.offsetY);
      const _ = document.elementsFromPoint(h.clientX, h.clientY);
      if (xi()) {
        const Q = _.some(
          (Me) => Me.id === "launcher-folder-dialog" || !!Me.closest?.("#launcher-folder-dialog")
        ), te = document.querySelector("#launcher-folder-dialog");
        if (Q && te) {
          te.classList.add("drop-hover-valid"), Fe.dropHoverValid = !0;
          return;
        } else
          te?.classList.remove("drop-hover-valid"), Fe.dropHoverValid = !1;
        x.value = null;
        return;
      }
      const Y = x.value || ze.value, de = S ? `link-${S}` : `folder-${X}`;
      if (Y.length) {
        const Q = _.find((te) => {
          if (te.classList.contains("launcher-link")) {
            const Me = te.getAttribute("data-launcher-id");
            return Me && `link-${Me}` !== de;
          }
          if (te.classList.contains("launcher-folder")) {
            const Me = te.getAttribute("data-launcher-folder");
            return Me && `folder-${Me}` !== de;
          }
          return !1;
        });
        if (Q) {
          const te = Q.classList.contains("launcher-link"), Me = te ? Q.getAttribute("data-launcher-id") : null, Ko = te ? null : Q.getAttribute("data-launcher-folder"), Ft = te ? `link-${Me}` : `folder-${Ko}`, yt = Q.getBoundingClientRect();
          let wt = !0;
          S && !te && (wc(yt, h.clientX, h.clientY) ? (wt = !1, Q.classList.add("drop-target")) : Q.classList.remove("drop-target"));
          const Je = Date.now();
          if (bc(yt, h.clientX, h.clientY) || (wt = !1), Ft === a && Je - g < yc && (wt = !1), wt) {
            document.querySelectorAll(".launcher-folder.drop-target").forEach((je) => je.classList.remove("drop-target"));
            const rt = Y.findIndex((je) => je.key === de), at = Y.findIndex((je) => je.key === Ft);
            if (rt >= 0 && at >= 0 && rt !== at) {
              const je = Y.slice(), Se = je.splice(rt, 1)[0];
              je.splice(at, 0, Se), x.value = je, a = Ft, g = Je;
            }
          }
        }
      }
      const Le = _.find((Q) => Q.classList.contains("launcher-page-tab"));
      if (Le) {
        const Q = Le.getAttribute("data-page");
        Q && Q !== ie.activePage && Le.classList.add("drop-target");
      } else
        document.querySelectorAll(".launcher-page-tab.drop-target").forEach((Q) => Q.classList.remove("drop-target"));
    }
    async function B(h) {
      if (h.pointerId === U) {
        we(), h.type === "pointercancel" ? pe() : E(h), window.removeEventListener("pointermove", I), window.removeEventListener("pointerup", B), window.removeEventListener("pointercancel", B);
        try {
          if (J) {
            W = Date.now(), C = !1;
            const w = document.elementsFromPoint(h.clientX, h.clientY);
            if (document.querySelectorAll(".launcher-page-tab.drop-target").forEach((T) => T.classList.remove("drop-target")), document.querySelectorAll(".launcher-folder.drop-target").forEach((T) => T.classList.remove("drop-target")), xi() && Fe.activeFolder) {
              if (w.some(
                (Y) => Y.id === "launcher-folder-dialog" || !!Y.closest?.("#launcher-folder-dialog")
              )) {
                const de = w.find((Le) => Le.hasAttribute("data-child-folder"))?.getAttribute("data-child-folder") || Fe.activeFolder;
                S ? await Z.moveLinkTo(S, void 0, de) : X && await Z.moveFolderInto(X, de);
              }
              return;
            }
            const _ = w.find((T) => T.classList.contains("launcher-page-tab"));
            if (_) {
              const T = _.getAttribute("data-page");
              if (T) {
                S ? (await Z.moveLinkTo(S, T, "常用网站"), await Z.setPage(T)) : X && await Z.moveFolderToPage(X, T), pe();
                return;
              }
            }
            if (S) {
              const T = w.find((Y) => Y.classList.contains("launcher-folder"));
              if (T) {
                const Y = T.getAttribute("data-launcher-folder");
                if (Y) {
                  await Z.moveLinkTo(S, ie.activePage, Y), pe();
                  return;
                }
              }
            }
            if (x.value) {
              const T = x.value.map((Y) => ({
                type: Y.type,
                id: Y.type === "link" ? String(Y.link.id) : void 0,
                groupName: Y.type === "folder" ? Y.folder.groupName : void 0
              }));
              await Z.reorderPageItems(ie.activePage, T);
            }
          }
        } catch (w) {
          Ie.show({ appName: "常用网站", title: "移动未完成", message: w instanceof Error ? w.message : "请刷新核对，未自动重试。" });
        } finally {
          pe();
        }
      }
    }
    function pe() {
      we(), U = null, S = null, X = null, J = !1, m.value = null, u.value = null, x.value = null, M.visible = !1, M.link = null, M.folder = null, a = "", document.querySelector("#launcher-folder-dialog")?.classList.remove("drop-hover-valid"), Fe.dropHoverValid = !1;
    }
    Ot(() => {
      be.setExternalDragHandler(null), be.setExternalDropHandler(null), pe(), window.removeEventListener("pointermove", I), window.removeEventListener("pointerup", B), window.removeEventListener("pointercancel", B);
    });
    function xe(h) {
      const w = ie.pageLabels;
      return w && w[h] ? w[h] : h || "常用网站";
    }
    function He(h, w) {
      const _ = String(h.page || "").trim(), T = String(w).trim(), Y = ie.pageLabels || {}, de = !_ || _ === "常用网站" || _ === "默认";
      if (!T || T === "常用网站" || T === "默认") return de;
      if (de) return !1;
      if (_ === T) return !0;
      const Q = Y[_] || _, te = Y[T] || T;
      return Q === te || _ === te || Q === T;
    }
    function he(h) {
      const w = ie.groupSizes;
      return w && w[h] === "large" ? "large" : "small";
    }
    function Re(h) {
      return h === "large" ? 9 : 4;
    }
    function We(h, w) {
      const _ = Re(w), T = h.length > _ ? _ - 1 : _;
      return h.slice(0, T);
    }
    const ze = ne(() => {
      const h = ie.activePage || "常用网站", _ = ie.links.filter(
        (Q) => He(Q, h)
      ), T = /* @__PURE__ */ new Map();
      _.forEach((Q) => {
        const te = Q.group || "常用网站";
        te !== "常用网站" && (T.has(te) || T.set(te, []), T.get(te).push(Q));
      });
      const Y = /* @__PURE__ */ new Set(), de = [];
      _.forEach((Q) => {
        const te = Q.group || "常用网站";
        $o(ie.folders, te) || (te === "常用网站" ? de.push({ key: `link-${Q.id}`, type: "link", link: Q }) : Y.has(te) || (Y.add(te), de.push({
          key: `folder-${te}`,
          type: "folder",
          folder: {
            groupName: te,
            pageName: h,
            links: T.get(te) || []
          }
        })));
      });
      const Le = ie.folders;
      return Le && Object.entries(Le).forEach(([Q, te]) => {
        if ($o(ie.folders, Q)) return;
        const Me = te?.page || "常用网站";
        (Me === h || h === "常用网站" && Me === "默认") && !Y.has(Q) && (Y.add(Q), de.push({
          key: `folder-${Q}`,
          type: "folder",
          folder: {
            groupName: Q,
            pageName: h,
            links: T.get(Q) || []
          }
        }));
      }), de;
    }), qe = ne(() => x.value && x.value.length ? x.value : ze.value), Oe = ne(() => {
      const h = ie.activePage || "常用网站", w = xe(h);
      return w === "默认" || h === "常用网站" ? "还没有快捷入口，点击“编辑入口”后添加。" : `“${w}”还是空的，把网站拖到这里。`;
    });
    function _i(h) {
      x.value = null, m.value = null, u.value = null, be.switchPage(h);
    }
    function An() {
      s.value = !0, c.value = "", Fo(() => {
        y.value?.focus();
      });
    }
    function Ci() {
      if (!s.value) return;
      const h = c.value.trim();
      s.value = !1, h && be.addPage(h);
    }
    function Wn(h) {
      h.key === "Enter" ? (h.preventDefault(), Ci()) : h.key === "Escape" && (s.value = !1);
    }
    function On(h, w) {
      be.openPageMenu(h, w);
    }
    function Bn(h) {
      const w = h.target;
      if (!w || w.closest(".launcher-link") || w.closest(".launcher-folder") || w.closest(".launcher-page-tab") || w.closest("button") || w.closest("input"))
        return;
      h.preventDefault();
      const _ = ie.activePage || "常用网站";
      Dt.openBlankMenu(_, h.clientX, h.clientY);
    }
    function Fn(h) {
      o.value === "sites" && (!h.shiftKey || ie.pages.length < 2 || (h.preventDefault(), h.deltaY > 0 || h.deltaX > 0 ? be.nextPage() : be.prevPage()));
    }
    function Nn(h) {
      h.target.closest(".launcher-page-tab") || h.stopPropagation();
    }
    function Hn(h) {
      h.button === 0 && (p = h.clientX, r = h.clientY);
    }
    function Rn(h, w) {
      w.preventDefault(), w.stopPropagation(), !(Math.hypot(w.clientX - p, w.clientY - r) >= 6 || C || Date.now() - W < 600) && be.openLink(h, w);
    }
    function jn(h, w) {
      be.openLinkMenu(h, w);
    }
    function Kn(h, w) {
      if (C || Date.now() - W < 450) {
        w.preventDefault(), w.stopPropagation();
        return;
      }
      be.openFolder(h, w);
    }
    function Gn(h, w, _) {
      be.openFolderMenu(h, w, _);
    }
    function Un(h) {
      be.deleteFolder(h);
    }
    function zn(h, w) {
      const _ = Array.from(w.dataTransfer?.types || []);
      if (!_.includes("application/x-newtab-launcher") && !_.includes("application/x-newtab-bookmark") && !_.includes("text/uri-list") && !_.includes("text/plain")) return;
      w.preventDefault(), w.dataTransfer && (w.dataTransfer.dropEffect = "move"), ie.activePage !== h && _i(h), w.currentTarget?.classList.add("drop-target");
    }
    function Vn(h) {
      h.currentTarget?.classList.remove("drop-target");
    }
    async function Yn(h, w) {
      w.currentTarget?.classList.remove("drop-target");
      let T = "";
      const Y = w.dataTransfer?.getData("application/x-newtab-launcher");
      if (Y)
        try {
          T = String(JSON.parse(Y)?.id || "");
        } catch {
        }
      if (!T && (m.value || window.__activeLauncherLink) && (T = String(window.__activeLauncherLink?.id || m.value || "")), T) {
        w.preventDefault(), w.stopPropagation(), await Z.moveLinkTo(T, h, "常用网站"), await Z.setPage(h);
        return;
      }
      const de = window;
      typeof de.importDroppedLauncherItem == "function" && (w.preventDefault(), w.stopPropagation(), await de.importDroppedLauncherItem(w, "常用网站", h));
    }
    function Xn(h) {
      const w = Array.from(h.dataTransfer?.types || []);
      if (!w.includes("application/x-newtab-launcher") && !w.includes("application/x-newtab-bookmark") && !w.includes("text/uri-list") && !w.includes("text/plain")) return;
      h.preventDefault(), h.dataTransfer && (h.dataTransfer.dropEffect = w.includes("application/x-newtab-launcher") ? "move" : "copy"), h.currentTarget?.classList.add("drop-target");
    }
    function qn(h) {
      const w = h.currentTarget;
      w?.contains(h.relatedTarget) || w?.classList.remove("drop-target");
    }
    async function Jn(h) {
      h.currentTarget?.classList.remove("drop-target");
      let _ = "";
      const T = h.dataTransfer?.getData("application/x-newtab-launcher");
      if (T)
        try {
          _ = String(JSON.parse(T)?.id || "");
        } catch {
        }
      if (!_ && (m.value || window.__activeLauncherLink) && (_ = String(window.__activeLauncherLink?.id || m.value || "")), _) {
        h.preventDefault(), h.stopPropagation(), await Z.moveLinkTo(_, ie.activePage, "常用网站");
        return;
      }
      const Y = window;
      if (typeof Y.importDroppedLauncherItem == "function") {
        h.preventDefault(), h.stopPropagation(), await Y.importDroppedLauncherItem(h, "常用网站", ie.activePage);
        return;
      }
      const de = h.dataTransfer?.getData("text/plain");
      de && /^https?:\/\//i.test(de.trim()) && (h.preventDefault(), h.stopPropagation(), await Z.addLink({
        title: "",
        url: de.trim(),
        page: ie.activePage
      }));
    }
    function xi() {
      if (!Fe.isOpen) return !1;
      if (typeof document < "u") {
        const h = document.querySelector("#launcher-folder-dialog");
        return !!(h && h.open);
      }
      return !1;
    }
    function Qn(h, w) {
      w.preventDefault();
    }
    function Zn(h) {
      h.preventDefault(), h.dataTransfer && (h.dataTransfer.dropEffect = "move"), h.currentTarget?.classList.add("drop-target");
    }
    function es(h) {
      h.currentTarget?.classList.remove("drop-target");
    }
    async function ts(h, w) {
      w.currentTarget?.classList.remove("drop-target"), w.preventDefault(), w.stopPropagation();
      const T = w.dataTransfer?.getData("application/x-newtab-launcher-folder");
      if (T && T !== h) {
        try {
          await Z.moveFolderInto(T, h);
        } catch (Le) {
          Ie.show({ appName: "常用网站", title: "移动未完成", message: Le instanceof Error ? Le.message : "请刷新后核对。" });
        }
        return;
      }
      let Y = "";
      const de = w.dataTransfer?.getData("application/x-newtab-launcher");
      if (de)
        try {
          Y = String(JSON.parse(de)?.id || "");
        } catch {
        }
      !Y && (m.value || window.__activeLauncherLink) && (Y = String(window.__activeLauncherLink?.id || m.value || "")), Y && await Z.moveLinkTo(Y, ie.activePage, h);
    }
    return (h, w) => (d(), f(oe, null, [
      l(ie).showSites ? (d(), f("section", {
        key: 0,
        class: "launcher-group launcher-sites size-large",
        onWheel: Fn
      }, [
        i("header", {
          class: "launcher-group-head launcher-sites-head",
          onPointerdown: w[5] || (w[5] = K(() => {
          }, ["stop"])),
          onContextmenu: Nn
        }, [
          i("div", Fc, [
            i("button", {
              type: "button",
              disabled: n.value,
              "aria-pressed": o.value === "sites",
              onClick: w[0] || (w[0] = (_) => o.value = "sites")
            }, "常用网站", 8, Nc),
            i("button", {
              type: "button",
              disabled: n.value,
              "aria-pressed": o.value === "bookmarks",
              onClick: w[1] || (w[1] = (_) => o.value = "bookmarks")
            }, "书签", 8, Hc)
          ]),
          Ae(i("div", Rc, [
            (d(!0), f(oe, null, me(l(ie).pages, (_) => (d(), f("button", {
              key: _,
              type: "button",
              class: ue(["launcher-page-tab", { active: _ === l(ie).activePage }]),
              "data-page": _,
              role: "tab",
              title: `切换到${xe(_)}；拖动网站到这里可移动分区；右键管理分区`,
              onPointerdown: w[2] || (w[2] = K(() => {
              }, ["stop"])),
              onClick: K((T) => _i(_), ["prevent", "stop"]),
              onContextmenu: K((T) => On(_, T), ["prevent", "stop"]),
              onDragover: (T) => zn(_, T),
              onDragleave: w[3] || (w[3] = (T) => Vn(T)),
              onDrop: (T) => Yn(_, T)
            }, L(xe(_)), 43, jc))), 128)),
            s.value ? Ae((d(), f("input", {
              key: 1,
              ref_key: "pageInputRef",
              ref: y,
              class: "launcher-page-input",
              maxlength: "12",
              placeholder: "例如：游戏区",
              "onUpdate:modelValue": w[4] || (w[4] = (_) => c.value = _),
              onKeydown: Wn,
              onBlur: Ci
            }, null, 544)), [
              [to, c.value]
            ]) : (d(), f("button", {
              key: 0,
              class: "launcher-page-add",
              type: "button",
              title: "添加网站分区，例如游戏区",
              "aria-label": "添加网站分区",
              onClick: An
            }, " + "))
          ], 512), [
            [At, o.value === "sites"]
          ]),
          o.value === "bookmarks" ? (d(), f("div", Kc)) : A("", !0)
        ], 32),
        o.value === "bookmarks" ? (d(), re(l(t), {
          key: 0,
          "header-target": "#bookmark-board-header",
          onBusy: w[6] || (w[6] = (_) => n.value = _)
        })) : A("", !0),
        Ae(i("div", {
          class: "launcher-page-panel",
          "data-page": l(ie).activePage,
          hidden: !1,
          role: "tabpanel",
          onContextmenu: Bn,
          onDragover: w[12] || (w[12] = (_) => Xn(_)),
          onDragleave: w[13] || (w[13] = (_) => qn(_)),
          onDrop: w[14] || (w[14] = (_) => Jn(_))
        }, [
          (d(), re(So, {
            tag: "div",
            class: "launcher-items launcher-site-items",
            key: l(ie).activePage,
            name: m.value || u.value ? "launcher-grid" : ""
          }, {
            default: Pt(() => [
              (d(!0), f(oe, null, me(qe.value, (_) => (d(), f(oe, {
                key: _.key
              }, [
                _.type === "link" ? (d(), f("a", {
                  key: _.key,
                  class: ue(["launcher-link", {
                    "is-dragging": m.value === String(_.link.id)
                  }]),
                  href: _.link.url,
                  title: _.link.title + (_.link.note ? `
📝 ` + _.link.note : "") + `
🔗 ` + _.link.url,
                  "data-launcher-id": String(_.link.id),
                  target: "_blank",
                  rel: "noreferrer",
                  draggable: "false",
                  onDragstart: w[7] || (w[7] = K(() => {
                  }, ["prevent"])),
                  onPointerdown: (T) => D(_.link, T),
                  onMousedown: w[8] || (w[8] = (T) => Hn(T)),
                  onClick: K((T) => Rn(_.link, T), ["prevent"]),
                  onContextmenu: K((T) => jn(_.link, T), ["prevent"])
                }, [
                  q(Ki, {
                    link: _.link
                  }, null, 8, ["link"])
                ], 42, Uc)) : _.type === "folder" ? (d(), f("div", {
                  key: _.key,
                  class: ue(["launcher-folder", [
                    `size-${he(_.folder.groupName)}`,
                    { "is-dragging": u.value === _.folder.groupName }
                  ]]),
                  title: `${_.folder.groupName}
可拖动调整位置；右键调整收藏夹大小`,
                  role: "button",
                  tabindex: "0",
                  "data-launcher-folder": String(_.folder.groupName),
                  draggable: "true",
                  onPointerdown: (T) => H(_.folder.groupName, _.folder, T),
                  onDragstart: (T) => Qn(_.folder.groupName, T),
                  onDragover: w[10] || (w[10] = (T) => Zn(T)),
                  onDragleave: w[11] || (w[11] = (T) => es(T)),
                  onDrop: (T) => ts(_.folder.groupName, T),
                  onClick: (T) => Kn(_.folder.groupName, T),
                  onContextmenu: K((T) => Gn(_.folder.groupName, _.folder.pageName, T), ["prevent"])
                }, [
                  q(Ki, {
                    folder: { title: _.folder.groupName, preview: _.folder.links, count: _.folder.links.length },
                    size: he(_.folder.groupName)
                  }, {
                    default: Pt(() => [
                      i("button", {
                        class: "launcher-folder-del-btn",
                        type: "button",
                        title: `删除文件夹「${_.folder.groupName}」`,
                        "aria-label": "删除文件夹",
                        onPointerdown: w[9] || (w[9] = K(() => {
                        }, ["stop"])),
                        onClick: K((T) => Un(_.folder.groupName), ["stop", "prevent"])
                      }, " ✕ ", 40, Vc)
                    ]),
                    _: 2
                  }, 1032, ["folder", "size"]),
                  i("span", Yc, L(_.folder.links.length), 1)
                ], 42, zc)) : A("", !0)
              ], 64))), 128)),
              qe.value.length ? A("", !0) : (d(), f("p", Xc, L(Oe.value), 1))
            ]),
            _: 1
          }, 8, ["name"]))
        ], 40, Gc), [
          [At, o.value === "sites"]
        ])
      ], 32)) : A("", !0),
      l(ie).hasTodo || l(ie).hasBili ? (d(), f("div", qc, [
        l(ie).hasTodo ? (d(), re(Bc, { key: 0 })) : l(ie).hasBili ? (d(), f("div", Jc)) : A("", !0)
      ])) : A("", !0),
      (d(), re(ct, { to: "body" }, [
        M.visible ? (d(), f("div", {
          key: 0,
          class: ue(["launcher-drag-ghost", [
            M.type === "folder" ? `folder-ghost size-${M.folder?.size}` : "link-ghost"
          ]]),
          style: ve({
            left: `${M.x}px`,
            top: `${M.y}px`
          })
        }, [
          M.type === "folder" && M.folder ? (d(), f(oe, { key: 0 }, [
            i("div", Qc, [
              (d(!0), f(oe, null, me(We(M.folder.links, M.folder.size), (_, T) => (d(), re(Wo, {
                key: _.id || T,
                link: _,
                mini: !0
              }, null, 8, ["link"]))), 128))
            ]),
            i("span", Zc, L(M.folder.groupName), 1)
          ], 64)) : M.link ? (d(), f(oe, { key: 1 }, [
            q(Wo, {
              link: M.link
            }, null, 8, ["link"]),
            i("span", ed, L(M.link.title), 1)
          ], 64)) : A("", !0)
        ], 6)) : A("", !0)
      ]))
    ], 64));
  }
}), Tn = /* @__PURE__ */ Ce(td, [["__scopeId", "data-v-e2bb88a0"]]), Lo = Object.keys(Bt);
let wo = !1, ni = 0, zt, si;
function Ui(e) {
  for (const t of Lo)
    Object.prototype.hasOwnProperty.call(e, t) && (Bt[t] = e[t] !== !1);
}
function od() {
  const e = Bt;
  be.setPrefs(e.showSites, e.showTodo, !e.showTodo && e.showBili), document.body.classList.toggle("hide-weather", !e.showWeather), document.body.classList.toggle("hide-sites", !e.showSites), document.body.classList.toggle("hide-bili", !e.showBili), document.body.classList.toggle("hide-youtube", !e.showYouTube), document.body.classList.toggle("hide-todo", !e.showTodo), document.body.classList.toggle("hide-bookmarks", !e.showBookmarkPanel), e.showBookmarkPanel || No.close();
}
const zi = {
  start() {
    if (wo) return;
    wo = !0;
    const e = ++ni;
    si = Xe(() => Lo.map((o) => Bt[o]), od, { immediate: !0, flush: "sync" });
    const t = globalThis.chrome;
    zt = (o, n) => {
      if (n !== "local") return;
      const s = {};
      for (const c of Lo) o[c] && (s[c] = o[c].newValue);
      Ui(s);
    }, t?.storage?.onChanged?.addListener(zt), t?.storage?.local && t.storage.local.get(Lo).then((o) => {
      wo && ni === e && Ui(o || {});
    }).catch((o) => console.warn("[HomePrefs] 读取首页设置失败", o));
  },
  stop() {
    wo = !1, ni++, si?.(), si = void 0, zt && globalThis.chrome?.storage?.onChanged?.removeListener(zt), zt = void 0;
  }
}, id = {
  id: "launcher",
  class: "launcher",
  "aria-label": "快捷入口"
}, nd = { class: "launcher-inner" }, sd = { class: "launcher-overview" }, rd = {
  class: "launcher-widget launcher-weather",
  "data-home-module": "weather",
  title: "右键此处可快速切换天气地点"
}, ad = { id: "weather-body" }, ld = { class: "launcher-center" }, cd = {
  class: "hero-clock",
  id: "hero-clock"
}, dd = {
  class: "launcher-widget launcher-task-threads launcher-music-card",
  "data-home-module": "taskThreads"
}, ud = {
  id: "task-thread-home",
  class: "task-thread-home home-music-body"
}, pd = /* @__PURE__ */ le({
  __name: "AppLauncher",
  setup(e) {
    Ne(() => {
      Io.initWallpaper();
    });
    function t() {
      Ue.handleToolClick("music");
    }
    return (o, n) => (d(), f("section", id, [
      n[5] || (n[5] = i("div", {
        id: "hero-background-media",
        class: "hero-background-media",
        "aria-hidden": "true"
      }, null, -1)),
      i("div", nd, [
        i("div", sd, [
          Ae(i("section", rd, [
            n[1] || (n[1] = i("header", { class: "card-head" }, [
              i("span", {
                class: "bar",
                style: { background: "linear-gradient(180deg,#38bdf8,#818cf8)" }
              }),
              i("h2", { id: "wx-title" }, "天气")
            ], -1)),
            i("div", ad, [
              q(Cn)
            ])
          ], 512), [
            [At, l(Bt).showWeather]
          ]),
          i("div", ld, [
            i("div", cd, [
              q(Bl),
              q(xn)
            ]),
            i("form", {
              id: "search",
              class: "search",
              onSubmit: n[0] || (n[0] = K(() => {
              }, ["prevent"]))
            }, [
              q(Xi)
            ], 32)
          ]),
          i("section", dd, [
            i("header", { class: "card-head" }, [
              n[2] || (n[2] = i("span", { class: "bar music-purple" }, null, -1)),
              n[3] || (n[3] = i("h2", null, "播放器", -1)),
              n[4] || (n[4] = i("span", { class: "grow" }, null, -1)),
              i("button", {
                id: "home-music-open-panel",
                class: "home-music-head-btn",
                type: "button",
                title: "打开网易云模块",
                onClick: t
              }, "网易云 ↗")
            ]),
            i("div", ud, [
              q(Ln)
            ])
          ])
        ]),
        i("div", {
          id: "launcher-groups",
          class: ue(["launcher-groups", { "has-sites": l(ie).showSites, "has-todoist": l(ie).hasTodo, "has-bili": l(ie).hasBili, "has-media": l(ie).hasTodo || l(ie).hasBili }])
        }, [
          q(Tn)
        ], 2)
      ]),
      n[6] || (n[6] = i("input", {
        id: "background-input",
        type: "file",
        accept: "image/*,video/mp4,video/webm,.gif,.mp4,.webm",
        multiple: "",
        hidden: ""
      }, null, -1))
    ]));
  }
}), _t = /* @__PURE__ */ le({
  __name: "DockCardModuleHost",
  props: {
    id: {}
  },
  setup(e) {
    const o = Do(e.id);
    if (!o || o.presentation !== "card") throw new Error("Unknown registered workspace card");
    const n = o;
    n.mountPolicy === "workspace-ready" && $e.markRunning(n.id), Xe(n.lifecycle.isVisible, (y) => {
      y && $e.markRunning(n.id);
    }, { immediate: !0, flush: "sync" });
    const s = ne(() => !!To[n.id]), c = j({
      loader: n.loadView,
      errorComponent: le({
        setup: () => () => n.lifecycle.isVisible() ? et("section", { class: "card wide card-fullscreen", role: "alert" }, [
          et("h2", n.title),
          et("p", "工作区代码加载失败。请先保存其它窗口的草稿，再手动刷新页面；不会自动刷新或重发任务。"),
          et("button", { type: "button", onClick: n.lifecycle.hide }, "返回首页")
        ]) : null
      })
    });
    return so(() => {
      n.lifecycle.hide(), qi.delete(n.id), delete To[n.id];
    }), (y, m) => s.value ? (d(), re(Qi(l(c)), {
      key: l($e).getRenderKey(l(n).id)
    })) : A("", !0);
  }
}), fd = { class: "logicweaver-workspaces-layer" }, hd = {
  key: 0,
  id: "daily-section",
  class: "wrap"
}, gd = { id: "vue-todoist-root" }, md = { id: "vue-bili-favorites-root" }, vd = { id: "vue-youtube-root" }, yd = { id: "vue-pricing-root" }, wd = { id: "vue-aihot-root" }, bd = /* @__PURE__ */ le({
  __name: "AppWorkspaces",
  setup(e) {
    const t = F(!!oo.activeId);
    return Ne(() => {
      t.value || (typeof window < "u" && "requestIdleCallback" in window ? window.requestIdleCallback(() => {
        t.value = !0;
      }, { timeout: 80 }) : setTimeout(() => {
        t.value = !0;
      }, 40));
    }), (o, n) => (d(), f("div", fd, [
      t.value ? (d(), f("main", hd, [
        i("div", gd, [
          q(_t, { id: "todoist" })
        ]),
        i("div", md, [
          q(_t, { id: "daily-bilibili" })
        ]),
        Ae(i("div", vd, [
          q(_t, { id: "daily-youtube" })
        ], 512), [
          [At, l(Bt).showYouTube]
        ]),
        i("div", yd, [
          q(_t, { id: "daily-pricing" })
        ]),
        i("div", wd, [
          q(_t, { id: "daily-aihot" })
        ]),
        q(_t, { id: "card-github" })
      ])) : A("", !0)
    ]));
  }
}), kd = ["aria-label"], _d = { class: "dock-menu-head" }, Cd = { class: "dock-menu-title" }, xd = ["src", "alt"], Ld = {
  key: 1,
  class: "dock-menu-emoji"
}, Td = /* @__PURE__ */ le({
  __name: "DockContextMenu",
  props: {
    target: {}
  },
  emits: ["close", "action"],
  setup(e, { emit: t }) {
    const o = e, n = t, s = ne(() => !o.target || o.target.type !== "tool" ? !1 : $e.isRunning(o.target.id)), c = ne(() => !o.target || o.target.type !== "tool" ? !1 : $e.isVisible(o.target.id)), { menuRef: y, style: m } = fn({
      visible: () => !!o.target,
      anchor: () => o.target || { x: 0, y: 0 },
      placement: Tt.position === "top" ? "below" : "above",
      align: "center",
      gap: 12,
      dismiss: () => n("close")
    });
    function u() {
      o.target && ($e.openApp(o.target.id), n("close"));
    }
    function x() {
      o.target && ($e.hideApp(o.target.id), n("close"));
    }
    async function C() {
      o.target && (await $e.reloadApp(o.target.id), n("close"));
    }
    async function W() {
      if (!o.target) return;
      const a = o.target;
      if ((await $e.quitApp(a.id))?.ok === !1) {
        n("close");
        return;
      }
      Ie.show({
        appName: a.title,
        title: "已退出应用",
        subtitle: "当前页面的应用已请求退出，不代表外部进程或远端任务已停止",
        icon: a.icon || "assets/logo.png",
        duration: 2800
      }), n("close");
    }
    async function p() {
      if (!o.target) return;
      const a = o.target, g = io.uninstall(a.id);
      n("close"), await g || Ie.show({
        appName: a.title,
        title: "入口停用未确认",
        subtitle: io.state.errorMessage || "请打开模块管理核对当前启用状态",
        icon: a.icon || "assets/logo.png",
        duration: 4e3
      });
    }
    function r() {
      if (!o.target) return;
      const g = {
        "daily-bilibili": "https://www.bilibili.com",
        "card-github": "https://github.com",
        "daily-aihot": "https://news.ycombinator.com",
        "daily-youtube": "https://www.youtube.com",
        "daily-pricing": "https://openai.com/api/pricing"
      }[o.target.id] || "https://www.bilibili.com";
      window.open(g, "_blank"), n("close");
    }
    return (a, g) => (d(), re(ct, { to: "body" }, [
      e.target ? (d(), f("div", {
        key: 0,
        ref_key: "menuRef",
        ref: y,
        role: "group",
        "aria-label": `${e.target.title}操作`,
        class: "dock-context-menu",
        style: ve(l(m)),
        onClick: g[1] || (g[1] = K(() => {
        }, ["stop"])),
        onContextmenu: g[2] || (g[2] = K(() => {
        }, ["prevent"]))
      }, [
        i("div", _d, [
          i("div", Cd, [
            e.target.icon ? (d(), f("img", {
              key: 0,
              class: "dock-menu-icon",
              src: e.target.icon,
              alt: e.target.title
            }, null, 8, xd)) : e.target.emoji ? (d(), f("span", Ld, L(e.target.emoji), 1)) : A("", !0),
            i("strong", null, L(e.target.title), 1)
          ]),
          e.target.type === "tool" ? (d(), f("span", {
            key: 0,
            class: ue(["dock-status-tag", { "is-running": s.value }])
          }, [
            g[3] || (g[3] = i("span", { class: "dock-status-dot" }, null, -1)),
            Ye(" " + L(s.value ? "运行中" : "未启动"), 1)
          ], 2)) : A("", !0)
        ]),
        g[12] || (g[12] = i("div", { class: "dock-menu-divider" }, null, -1)),
        e.target.type === "tool" ? (d(), f(oe, { key: 0 }, [
          c.value ? (d(), f("button", {
            key: 1,
            type: "button",
            class: "dock-menu-item",
            onClick: x
          }, [...g[5] || (g[5] = [
            i("span", { class: "dock-menu-symbol" }, "−", -1),
            i("span", null, "隐藏窗口", -1)
          ])])) : (d(), f("button", {
            key: 0,
            type: "button",
            class: "dock-menu-item",
            onClick: u
          }, [...g[4] || (g[4] = [
            i("span", { class: "dock-menu-symbol" }, "↗", -1),
            i("span", null, "打开窗口", -1)
          ])])),
          i("button", {
            type: "button",
            class: "dock-menu-item",
            onClick: C
          }, [...g[6] || (g[6] = [
            i("span", { class: "dock-menu-symbol" }, "⟲", -1),
            i("div", { class: "dock-menu-text" }, [
              i("span", null, "重新加载"),
              i("small", null, "单应用热重启")
            ], -1)
          ])]),
          g[9] || (g[9] = i("div", { class: "dock-menu-divider" }, null, -1)),
          i("button", {
            type: "button",
            class: "dock-menu-item",
            onClick: p
          }, [...g[7] || (g[7] = [
            i("span", { class: "dock-menu-symbol" }, "📌", -1),
            i("div", { class: "dock-menu-text" }, [
              i("span", null, "从 Dock 栏移出"),
              i("small", null, "可在模块管理中重新添加")
            ], -1)
          ])]),
          i("button", {
            type: "button",
            class: "dock-menu-item item-danger",
            onClick: W
          }, [...g[8] || (g[8] = [
            i("span", { class: "dock-menu-symbol" }, "✕", -1),
            i("div", { class: "dock-menu-text" }, [
              i("span", null, "真正的关闭"),
              i("small", null, "退出并释放内存")
            ], -1)
          ])])
        ], 64)) : e.target.type === "card" ? (d(), f("button", {
          key: 1,
          type: "button",
          class: "dock-menu-item",
          onClick: r
        }, [...g[10] || (g[10] = [
          i("span", { class: "dock-menu-symbol" }, "↗", -1),
          i("span", null, "在新标签页打开官网", -1)
        ])])) : (d(), f("button", {
          key: 2,
          type: "button",
          class: "dock-menu-item",
          onClick: g[0] || (g[0] = (b) => n("close"))
        }, [...g[11] || (g[11] = [
          i("span", { class: "dock-menu-symbol" }, "🏠", -1),
          i("span", null, "返回常用主页", -1)
        ])]))
      ], 44, kd)) : A("", !0)
    ]));
  }
}), Sd = /* @__PURE__ */ Ce(Td, [["__scopeId", "data-v-3aa85877"]]), $d = { class: "mac-dock-shelf" }, Md = ["data-dock-target", "title", "onPointerdown", "onClick", "onContextmenu"], Id = ["src", "alt"], Ed = {
  key: 0,
  class: "mac-dock-dot",
  "aria-hidden": "true"
}, Dd = ["data-dock-tool", "title", "onPointerdown", "onClick", "onContextmenu"], Pd = ["src", "alt"], Ad = {
  key: 1,
  class: "mac-dock-emoji",
  "aria-hidden": "true"
}, Wd = {
  key: 2,
  class: "mac-dock-dot",
  "aria-hidden": "true"
}, Od = {
  key: 3,
  class: "mac-dock-badge"
}, Bd = ["src"], Fd = {
  key: 1,
  class: "mac-dock-emoji"
}, Nd = /* @__PURE__ */ le({
  __name: "MacDock",
  setup(e) {
    const t = ne(() => Tt), o = F(null), n = ne(() => Object.fromEntries(Tt.tools.map((D) => {
      const H = Do(D.id)?.badgeCount?.() || 0;
      return [D.id, Number.isFinite(H) ? Math.max(0, Math.floor(H)) : 0];
    })));
    function s(D) {
      D.stopPropagation(), o.value = null, W(D.currentTarget), io.open();
    }
    function c(D, H) {
      H.stopPropagation(), o.value = null, W(H.currentTarget), ut.triggerItem("target", D);
    }
    function y(D, H) {
      const V = H.currentTarget.getBoundingClientRect(), we = Tt.position, I = we === "left" || we === "right";
      o.value = {
        type: "card",
        id: D.id,
        title: D.title,
        icon: D.icon,
        x: I ? we === "left" ? V.right + 8 : V.left - 8 : V.left + V.width / 2,
        y: I ? V.top + V.height / 2 : we === "top" ? V.bottom + 8 : V.top
      };
    }
    function m(D) {
      D.stopPropagation(), o.value = null, W(D.currentTarget), ut.triggerItem("home", "home-launcher");
    }
    function u(D, H) {
      H.stopPropagation(), o.value = null, W(H.currentTarget), Do(D) || $e.markRunning(D), ut.triggerItem("tool", D);
    }
    function x(D, H) {
      const V = H.currentTarget.getBoundingClientRect(), we = Tt.position, I = we === "left" || we === "right";
      o.value = {
        type: "tool",
        id: D.id,
        title: D.title,
        icon: D.icon,
        emoji: D.emoji,
        x: I ? we === "left" ? V.right + 8 : V.left - 8 : V.left + V.width / 2,
        y: I ? V.top + V.height / 2 : we === "top" ? V.bottom + 8 : V.top
      };
    }
    const C = /* @__PURE__ */ new Map();
    function W(D) {
      if (!D || (C.get(D)?.cancel(), window.matchMedia("(prefers-reduced-motion: reduce)").matches)) return;
      const H = D.animate([
        { translate: "0 0", offset: 0 },
        { translate: "0 -8px", offset: 0.35 },
        { translate: "0 0", offset: 0.65 },
        { translate: "0 -2px", offset: 0.85 },
        { translate: "0 0", offset: 1 }
      ], { duration: 350, easing: "ease" });
      C.set(D, H);
      const O = () => {
        C.get(D) === H && C.delete(D);
      };
      H.onfinish = O, H.oncancel = O;
    }
    const p = F(null), r = Ee({
      visible: !1,
      x: 0,
      y: 0,
      width: 40,
      height: 40,
      item: null,
      type: "tool"
    }), a = F(null), g = F(null), b = ne(() => a.value || t.value.cards), v = ne(() => g.value || t.value.tools);
    let k = "", $ = 0, M = !1, U = 0;
    function ce(D, H, O) {
      if (O.button !== 0 || O.target.closest(".mac-dock-market-btn")) return;
      const I = O.currentTarget.getBoundingClientRect();
      M = !1, p.value = {
        type: D,
        id: H.id,
        item: H,
        startX: O.clientX,
        startY: O.clientY,
        initialLeft: I.left,
        initialTop: I.top,
        width: I.width,
        height: I.height
      }, window.addEventListener("pointermove", P), window.addEventListener("pointerup", S), window.addEventListener("pointercancel", S);
    }
    function P(D) {
      if (!p.value) return;
      const H = D.clientX - p.value.startX, O = D.clientY - p.value.startY, V = Math.hypot(H, O);
      if (!M && V > 5 && (M = !0, r.visible = !0, r.item = p.value.item, r.type = p.value.type, r.width = p.value.width, r.height = p.value.height, p.value.type === "card" ? a.value = [...t.value.cards] : g.value = [...t.value.tools]), !M) return;
      r.x = D.clientX - r.width / 2, r.y = D.clientY - r.height / 2;
      const I = document.elementsFromPoint(D.clientX, D.clientY).find(
        (he) => he.classList.contains("mac-dock-item") && !he.classList.contains("mac-dock-market-btn")
      );
      if (!I) return;
      const E = I.getAttribute("data-dock-target"), B = I.getAttribute("data-dock-tool"), pe = p.value.type, xe = p.value.id, He = Date.now();
      if (pe === "card" && E && E !== xe && E !== "home-launcher") {
        const he = I.getBoundingClientRect(), Re = he.left + he.width / 2;
        if (Math.abs(D.clientX - Re) > he.width * 0.55 || E === k && He - $ < 180) return;
        const We = [...a.value || t.value.cards], ze = We.findIndex((Oe) => Oe.id === xe), qe = We.findIndex((Oe) => Oe.id === E);
        if (ze >= 0 && qe >= 0 && ze !== qe) {
          const Oe = We.splice(ze, 1)[0];
          We.splice(qe, 0, Oe), a.value = We, k = E, $ = He;
        }
      } else if (pe === "tool" && B && B !== xe) {
        const he = I.getBoundingClientRect(), Re = he.left + he.width / 2;
        if (Math.abs(D.clientX - Re) > he.width * 0.55 || B === k && He - $ < 180) return;
        const We = [...g.value || t.value.tools], ze = We.findIndex((Oe) => Oe.id === xe), qe = We.findIndex((Oe) => Oe.id === B);
        if (ze >= 0 && qe >= 0 && ze !== qe) {
          const Oe = We.splice(ze, 1)[0];
          We.splice(qe, 0, Oe), g.value = We, k = B, $ = He;
        }
      }
    }
    function S() {
      window.removeEventListener("pointermove", P), window.removeEventListener("pointerup", S), window.removeEventListener("pointercancel", S), M && p.value && (U = Date.now() + 250, p.value.type === "card" && a.value ? ut.reorderCards(a.value.map((D) => D.id)) : p.value.type === "tool" && g.value && ut.reorderTools(g.value.map((D) => D.id))), r.visible = !1, r.item = null, a.value = null, g.value = null, p.value = null, M = !1, k = "";
    }
    function X(D, H) {
      Date.now() < U || c(D, H);
    }
    function J(D, H) {
      Date.now() < U || u(D, H);
    }
    return so(() => {
      for (const D of C.values()) D.cancel();
      C.clear(), window.removeEventListener("pointermove", P), window.removeEventListener("pointerup", S), window.removeEventListener("pointercancel", S);
    }), (D, H) => (d(), f(oe, null, [
      i("div", $d, [
        q(So, {
          tag: "div",
          class: "mac-dock-group mac-dock-cards-group",
          name: "dock-item-motion"
        }, {
          default: Pt(() => [
            (d(!0), f(oe, null, me(b.value, (O) => (d(), f("button", {
              key: O.id,
              class: ue(["mac-dock-item", {
                "is-active": t.value.activeTargetId === O.id,
                "is-drag-origin": p.value && p.value.id === O.id
              }]),
              type: "button",
              "data-dock-target": O.id,
              title: O.title,
              onPointerdown: (V) => ce("card", O, V),
              onClick: K((V) => X(O.id, V), ["stop"]),
              onContextmenu: K((V) => y(O, V), ["prevent"])
            }, [
              i("img", {
                class: "mac-dock-icon",
                src: O.icon,
                alt: O.title
              }, null, 8, Id),
              t.value.activeTargetId === O.id ? (d(), f("span", Ed)) : A("", !0)
            ], 42, Md))), 128))
          ]),
          _: 1
        }),
        H[5] || (H[5] = i("div", {
          class: "mac-dock-divider",
          "aria-hidden": "true"
        }, null, -1)),
        i("button", {
          class: "mac-dock-item",
          type: "button",
          "data-dock-target": "home-launcher",
          title: "常用主页",
          onClick: H[0] || (H[0] = K((O) => m(O), ["stop"]))
        }, [...H[3] || (H[3] = [
          i("img", {
            class: "mac-dock-icon",
            src: "assets/nav-home.svg",
            alt: "主页"
          }, null, -1)
        ])]),
        H[6] || (H[6] = i("div", {
          class: "mac-dock-divider mac-dock-divider-dark",
          "aria-hidden": "true"
        }, null, -1)),
        q(So, {
          tag: "div",
          class: "mac-dock-group mac-dock-tools-group",
          name: "dock-item-motion"
        }, {
          default: Pt(() => [
            (d(!0), f(oe, null, me(v.value, (O) => (d(), f("button", {
              key: O.id,
              class: ue(["mac-dock-item", {
                "is-active": l($e).isRunning(O.id),
                "is-drag-origin": p.value && p.value.id === O.id
              }]),
              type: "button",
              "data-dock-tool": O.id,
              title: O.title,
              onPointerdown: (V) => ce("tool", O, V),
              onClick: K((V) => J(O.id, V), ["stop"]),
              onContextmenu: K((V) => x(O, V), ["prevent"])
            }, [
              O.icon ? (d(), f("img", {
                key: 0,
                class: "mac-dock-icon",
                src: O.icon,
                alt: O.title
              }, null, 8, Pd)) : O.emoji ? (d(), f("span", Ad, L(O.emoji), 1)) : A("", !0),
              l($e).isRunning(O.id) ? (d(), f("span", Wd)) : A("", !0),
              n.value[O.id] > 0 ? (d(), f("span", Od, L(n.value[O.id] > 99 ? "99+" : n.value[O.id]), 1)) : A("", !0)
            ], 42, Dd))), 128))
          ]),
          _: 1
        }),
        i("button", {
          class: ue(["mac-dock-item mac-dock-market-btn", { "is-active": l(io).state.isOpen }]),
          type: "button",
          title: "模块与全屏插件管理",
          onClick: H[1] || (H[1] = K((O) => s(O), ["stop"]))
        }, [...H[4] || (H[4] = [
          i("span", {
            class: "mac-dock-market-icon",
            "aria-hidden": "true"
          }, "🧩", -1)
        ])], 2)
      ]),
      (d(), re(ct, { to: "body" }, [
        r.visible && r.item ? (d(), f("div", {
          key: 0,
          class: "mac-dock-drag-ghost",
          style: ve({
            width: r.width + "px",
            height: r.height + "px",
            transform: "translate3d(" + r.x + "px," + r.y + "px, 0)"
          }),
          "aria-hidden": "true"
        }, [
          r.item.icon ? (d(), f("img", {
            key: 0,
            class: "mac-dock-icon",
            src: r.item.icon,
            alt: ""
          }, null, 8, Bd)) : r.item.emoji ? (d(), f("span", Fd, L(r.item.emoji), 1)) : A("", !0)
        ], 4)) : A("", !0)
      ])),
      q(Sd, {
        target: o.value,
        onClose: H[2] || (H[2] = (O) => o.value = null)
      }, null, 8, ["target"])
    ], 64));
  }
}), Sn = /* @__PURE__ */ Ce(Nd, [["__scopeId", "data-v-4528a5df"]]), Hd = {
  id: "win-toast-container",
  class: "win-toast-container",
  "aria-live": "polite",
  "aria-relevant": "additions"
}, Rd = ["data-toast-fingerprint", "onMouseenter", "onMouseleave"], jd = { class: "win-toast-head" }, Kd = ["src"], Gd = { class: "win-toast-app" }, Ud = ["onClick"], zd = ["onClick"], Vd = { class: "win-toast-title" }, Yd = {
  key: 0,
  class: "win-toast-subtitle"
}, Xd = {
  key: 1,
  class: "win-toast-snippet"
}, qd = {
  key: 0,
  class: "win-toast-actions"
}, Jd = ["onClick"], Qd = ["onClick"], Zd = /* @__PURE__ */ le({
  __name: "NotificationHost",
  setup(e) {
    const t = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map(), s = F({}), c = F({});
    let y = null;
    function m(a) {
      const g = t.get(a);
      g !== void 0 && clearTimeout(g), t.delete(a);
    }
    function u(a, g = a.duration) {
      m(a.id), n.set(a.id, g), o.set(a.id, Date.now()), c.value[a.id] = !1, s.value[a.id] = Math.max(0, Math.min(100, g / a.duration * 100)), Fo(() => requestAnimationFrame(() => {
        s.value[a.id] = 0;
      })), t.set(a.id, window.setTimeout(() => {
        t.delete(a.id), Ie.close(a.id);
      }, g));
    }
    function x(a) {
      m(a.id);
      const g = Date.now() - (o.get(a.id) || Date.now()), b = Math.max(0, (n.get(a.id) ?? a.duration) - g);
      n.set(a.id, b), c.value[a.id] = !0, s.value[a.id] = Math.max(0, Math.min(100, b / a.duration * 100));
    }
    function C(a) {
      u(a, Math.max(1500, n.get(a.id) ?? a.duration));
    }
    function W(a) {
      m(a.id), Ie.close(a.id);
    }
    function p(a) {
      if (mt.markRead(a.id), W(a), !a.onClick) {
        a.target && mt.openTarget(a.target);
        return;
      }
      try {
        Promise.resolve(a.onClick()).catch((g) => console.warn("Notification action failed", g));
      } catch (g) {
        console.warn("Notification action failed", g);
      }
    }
    function r(a) {
      const g = Math.max(500, n.get(a.id) ?? a.duration);
      return {
        width: `${s.value[a.id] ?? 100}%`,
        transition: c.value[a.id] ? "none" : `width ${g}ms linear`
      };
    }
    return Ne(() => {
      y = new MutationObserver(() => {
        const g = new Set(ao.map((b) => b.id));
        for (const b of ao)
          !b.closing && !t.has(b.id) && !n.has(b.id) && u(b);
        for (const b of n.keys())
          g.has(b) || (m(b), n.delete(b), o.delete(b), delete s.value[b], delete c.value[b]);
      });
      const a = document.getElementById("win-toast-container");
      a && y.observe(a, { childList: !0 });
      for (const g of ao) u(g);
    }), so(() => {
      y?.disconnect(), y = null;
      for (const a of t.values()) clearTimeout(a);
      t.clear();
    }), (a, g) => (d(), re(ct, { to: "body" }, [
      i("div", Hd, [
        q(So, { name: "win-toast" }, {
          default: Pt(() => [
            (d(!0), f(oe, null, me(l(ao), (b) => (d(), f("article", {
              key: b.id,
              class: ue(["win-toast-card", [b.appType, { closing: b.closing }]]),
              "data-toast-fingerprint": b.fingerprint,
              onMouseenter: (v) => x(b),
              onMouseleave: (v) => C(b)
            }, [
              i("header", jd, [
                i("img", {
                  src: b.icon,
                  class: "win-toast-icon",
                  alt: ""
                }, null, 8, Kd),
                i("span", Gd, L(b.appName), 1),
                g[0] || (g[0] = i("span", { class: "win-toast-time" }, "刚刚", -1)),
                i("button", {
                  type: "button",
                  class: "win-toast-close",
                  title: "关闭",
                  "aria-label": "关闭通知",
                  onClick: (v) => W(b)
                }, "✕", 8, Ud)
              ]),
              i("button", {
                type: "button",
                class: "win-toast-body win-toast-body-button",
                onClick: (v) => p(b)
              }, [
                i("span", Vd, L(b.title), 1),
                b.subtitle ? (d(), f("span", Yd, L(b.subtitle), 1)) : A("", !0),
                b.message ? (d(), f("span", Xd, L(b.message), 1)) : A("", !0)
              ], 8, zd),
              b.showActions && b.actionLabel ? (d(), f("footer", qd, [
                i("button", {
                  type: "button",
                  class: "win-toast-btn primary",
                  onClick: (v) => p(b)
                }, L(b.actionLabel), 9, Jd),
                i("button", {
                  type: "button",
                  class: "win-toast-btn",
                  onClick: (v) => W(b)
                }, "关闭", 8, Qd)
              ])) : A("", !0),
              i("div", {
                class: "win-toast-progress",
                style: ve(r(b))
              }, null, 4)
            ], 42, Rd))), 128))
          ]),
          _: 1
        })
      ])
    ]));
  }
}), $n = /* @__PURE__ */ Ce(Zd, [["__scopeId", "data-v-8ecd30bd"]]), eu = ["id"], tu = /* @__PURE__ */ le({
  __name: "DockModuleHost",
  setup(e) {
    const t = Ss().filter((o) => o.presentation !== "card").map((o) => {
      Xe(o.lifecycle.isVisible, (s) => {
        s && $e.markRunning(o.id);
      }, { immediate: !0, flush: "sync" });
      const n = le({
        setup: () => () => et("section", { class: "dock-module-load-error", role: "alert" }, [
          et("p", `${o.title} 的界面代码未能加载，并非只能打开一个窗口。`),
          et("p", "若刚更新过扩展代码，请先保存草稿，再手动刷新整个页面；旧页面引用的分块文件可能已经被移除。不会自动刷新或关闭其它窗口。"),
          et("button", { type: "button", onClick: () => {
            $e.reloadApp(o.id);
          } }, "重试此窗口"),
          et("button", { type: "button", onClick: () => {
            $e.hideApp(o.id);
          } }, "隐藏窗口")
        ])
      });
      return {
        definition: o,
        mounted: ne(() => !!To[o.id]),
        view: j({
          loader: o.loadView,
          errorComponent: n
        })
      };
    });
    return so(() => {
      for (const { definition: o } of t)
        Ue.close(o.id), qi.delete(o.id), To[o.id] = !1;
    }), (o, n) => (d(!0), f(oe, null, me(l(t), (s) => Ae((d(), f("div", {
      id: s.definition.rootId,
      key: s.definition.id
    }, [
      s.mounted.value ? (d(), re(Qi(s.view), {
        key: l($e).getRenderKey(s.definition.id)
      })) : A("", !0)
    ], 8, eu)), [
      [At, s.definition.lifecycle.isVisible()]
    ])), 128));
  }
}), ou = /* @__PURE__ */ Ce(tu, [["__scopeId", "data-v-8164c563"]]);
function De(e, t) {
  const o = F(!1);
  return Xe(
    e,
    (n) => {
      n && (o.value = !0);
    },
    { immediate: !0, flush: "sync" }
  ), vt(o);
}
const iu = ["onKeydown"], nu = { class: "fo-up-preview-head" }, su = ["src"], ru = { class: "fo-up-preview-meta" }, au = { class: "fo-up-preview-name-row" }, lu = ["href"], cu = ["disabled"], du = { class: "fo-up-preview-sign" }, uu = { class: "fo-up-preview-videos" }, pu = {
  key: 0,
  class: "fo-up-preview-loading"
}, fu = {
  key: 1,
  class: "fo-up-preview-empty"
}, hu = {
  key: 2,
  class: "fo-up-preview-empty"
}, gu = ["href"], mu = ["src"], vu = {
  key: 0,
  class: "fo-bili-duration"
}, yu = { class: "fo-up-preview-video-info" }, wu = ["href"], bu = { class: "fo-up-preview-video-meta" }, ku = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2394a3b8'%3E%3Cpath d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/%3E%3C/svg%3E", _u = /* @__PURE__ */ le({
  __name: "BiliUpPreview",
  setup(e) {
    const t = F(!1);
    function o() {
      if (!ae.submitting) {
        if (!ae.followed) {
          t.value = !1, xo.toggleFollow();
          return;
        }
        if (!t.value) {
          t.value = !0;
          return;
        }
        t.value = !1, xo.toggleFollow();
      }
    }
    function n() {
      t.value = !1, xo.close();
    }
    return (s, c) => l(ae).open ? (d(), f("div", {
      key: 0,
      class: "fo-up-preview-backdrop",
      onPointerdown: K(n, ["self"])
    }, [
      i("aside", {
        class: "fo-up-preview-popover",
        style: ve({ left: `${l(ae).left}px`, top: `${l(ae).top}px` }),
        onKeydown: pi(K(n, ["stop", "prevent"]), ["esc"])
      }, [
        i("div", nu, [
          i("img", {
            class: "fo-up-preview-avatar",
            src: l(ae).face || ku,
            alt: "",
            referrerpolicy: "no-referrer"
          }, null, 8, su),
          i("div", ru, [
            i("div", au, [
              i("a", {
                class: "fo-up-preview-name",
                href: `https://space.bilibili.com/${l(ae).mid}`,
                target: "_blank",
                rel: "noreferrer"
              }, L(l(ae).name), 9, lu),
              i("button", {
                type: "button",
                class: ue([
                  l(ae).followed ? "fo-up-preview-unfollow" : "fo-up-preview-follow",
                  { "is-armed": t.value }
                ]),
                disabled: l(ae).submitting,
                onClick: o
              }, L(l(ae).submitting ? "处理中…" : t.value ? "确定取消？" : l(ae).followed ? "取消关注" : "＋ 关注"), 11, cu)
            ]),
            i("p", du, L(l(ae).sign || "暂无个人简介"), 1)
          ]),
          i("button", {
            type: "button",
            class: "fo-up-preview-close",
            "aria-label": "关闭预览",
            onClick: n
          }, "✕")
        ]),
        c[1] || (c[1] = i("div", { class: "fo-up-preview-title-tag" }, "近期投稿视频（最新 2~3 个）", -1)),
        i("div", uu, [
          l(ae).loading ? (d(), f("div", pu, [...c[0] || (c[0] = [
            i("i", null, null, -1),
            i("span", null, "正在读取近期投稿…", -1)
          ])])) : l(ae).error ? (d(), f("p", fu, L(l(ae).error), 1)) : l(ae).videos.length ? (d(!0), f(oe, { key: 3 }, me(l(ae).videos, (y) => (d(), f("article", {
            key: y.bvid,
            class: "fo-up-preview-video"
          }, [
            i("a", {
              class: "fo-up-preview-thumb",
              href: y.url,
              target: "_blank",
              rel: "noreferrer"
            }, [
              i("img", {
                src: y.cover,
                alt: "",
                loading: "lazy",
                referrerpolicy: "no-referrer"
              }, null, 8, mu),
              y.duration ? (d(), f("span", vu, L(y.duration), 1)) : A("", !0)
            ], 8, gu),
            i("div", yu, [
              i("a", {
                class: "fo-up-preview-video-title",
                href: y.url,
                target: "_blank",
                rel: "noreferrer"
              }, L(y.title), 9, wu),
              i("div", bu, [
                i("span", null, "▣ " + L(y.playCount), 1),
                i("span", null, L(y.published), 1)
              ])
            ])
          ]))), 128)) : (d(), f("p", hu, "该 UP 主近期暂无视频动态"))
        ])
      ], 44, iu)
    ], 32)) : A("", !0);
  }
}), Cu = /* @__PURE__ */ Ce(_u, [["__scopeId", "data-v-83b4a8d5"]]), xu = { class: "logicweaver-overlays-layer" }, Lu = { id: "vue-notification-root" }, Tu = {
  id: "bili-profile-menu",
  class: "bili-profile-menu",
  hidden: ""
}, Su = { id: "vue-bili-message-panel-root" }, $u = { id: "vue-notification-center-root" }, Mu = { id: "vue-tab-manager-root" }, Iu = { id: "vue-bookmark-menu-root" }, Eu = { id: "vue-bookmark-panel-root" }, Du = { id: "vue-launcher-dialogs-root" }, Pu = { id: "vue-launcher-folder-root" }, Au = { id: "vue-launcher-menus-root" }, Wu = { id: "vue-settings-dialog-root" }, Ou = { id: "vue-clock-settings-root" }, Bu = { id: "vue-bili-theater-root" }, Fu = { id: "vue-bili-mini-player-root" }, Nu = { id: "vue-ai-dialog-root" }, Hu = { id: "vue-aihot-viewer-root" }, Ru = { id: "vue-nav-wheel-root" }, ju = { id: "vue-github-detail-root" }, Ku = { id: "vue-bili-subtitle-modal-root" }, Gu = { id: "vue-firecrawl-modal-root" }, Uu = { id: "vue-floating-image-viewer-root" }, zu = { id: "vue-command-palette-root" }, Vu = /* @__PURE__ */ le({
  __name: "AppOverlays",
  setup(e) {
    const t = De(() => io.state.isOpen), o = De(() => an.isOpen), n = De(() => Co.isOpen), s = De(() => ft.state.isOpen), c = De(() => As.open), y = De(() => Qt.state.isOpen), m = De(() => ds.isOpen), u = De(() => Is.isOpen), x = De(() => yi.state.isOpen), C = De(() => us.isOpen), W = De(() => Te.isOpen), p = De(() => hi.state.isOpen), r = De(() => Fe.isOpen), a = De(() => bt.editDialog.isOpen || bt.iconPicker.isOpen || bt.linkMove.isOpen || bt.folderMove.isOpen || bt.groupMerge.isOpen || bt.folderDelete.isOpen), g = j(() => import("./ProfileMenu-C5_uj5S2.js")), b = j(() => import("./BookmarkNoteMenu-cDVopwDw.js")), v = j(() => import("./BookmarkPanel-D_0JKu3S.js")), k = j(() => import("./ClockSettingsMenu-DkaOUEv-.js")), $ = j(() => import("./NotificationCenter-D0l0QU4_.js")), M = j(() => import("./TabManagerPanel-BrnA44xP.js")), U = j(() => import("./LauncherDialogs--RPT1SCa.js")), ce = j(() => import("./LauncherFolderDialog-DMVg6sVL.js")), P = j(() => import("./LauncherMenus-D9_ecgho.js")), S = j(() => import("./SettingsDialog-D_TYBV4x.js")), X = j(() => import("./BiliMiniPlayer-Lr0Hy_u-.js")), J = j(() => import("./BiliTheaterDialog-D637goIW.js")), D = j(() => import("./BiliMessagePanel-DtWzlEhq.js")), H = j(() => import("./AiDialog-CJHJPRkq.js")), O = j(() => import("./AihotViewer-DCJiLecQ.js")), V = j(() => import("./NavWheelOverlay-x8O9Nd_N.js")), we = j(() => import("./GitHubRepoDetailDrawer--nvHg8Wt.js")), I = j(() => import("./BiliSubtitleModal-Ca0HJiCO.js")), E = j(() => import("./FirecrawlModal-B-e_AhYj.js")), B = j(() => import("./FloatingImageViewer-Bxywd53O.js")), pe = j(() => import("./CommandPalette-Dfml5P6u.js")), xe = j(() => import("./AppPromptModal-DLEL0uaJ.js")), He = j(async () => {
      const [he, Re] = await Promise.all([
        import("./PluginMarketDialog-BDv7Yq9A.js"),
        import("./plugin-market-B6zN10fA.js")
      ]);
      return Cs("logicweaver-market-styles", Re.default), he.default;
    });
    return (he, Re) => (d(), f("div", xu, [
      i("div", Lu, [
        q($n)
      ]),
      i("div", Tu, [
        q(l(g))
      ]),
      i("div", Su, [
        l(u) ? (d(), re(l(D), { key: 0 })) : A("", !0)
      ]),
      i("div", $u, [
        l(o) ? (d(), re(l($), { key: 0 })) : A("", !0)
      ]),
      i("div", Mu, [
        l(n) ? (d(), re(l(M), { key: 0 })) : A("", !0)
      ]),
      i("div", Iu, [
        l(p) ? (d(), re(l(b), { key: 0 })) : A("", !0)
      ]),
      i("div", Eu, [
        q(l(v))
      ]),
      i("div", Du, [
        l(a) ? (d(), re(l(U), { key: 0 })) : A("", !0)
      ]),
      i("div", Pu, [
        l(r) ? (d(), re(l(ce), { key: 0 })) : A("", !0)
      ]),
      i("div", Au, [
        q(l(P))
      ]),
      i("div", Wu, [
        q(l(S))
      ]),
      i("div", Ou, [
        l(s) ? (d(), re(l(k), { key: 0 })) : A("", !0)
      ]),
      i("div", Bu, [
        l(y) ? (d(), re(l(J), { key: 0 })) : A("", !0)
      ]),
      i("div", Fu, [
        l(m) ? (d(), re(l(X), { key: 0 })) : A("", !0)
      ]),
      i("div", Nu, [
        l(x) ? (d(), re(l(H), { key: 0 })) : A("", !0)
      ]),
      i("div", Hu, [
        l(c) ? (d(), re(l(O), { key: 0 })) : A("", !0)
      ]),
      i("div", Ru, [
        q(l(V))
      ]),
      q(ou),
      i("div", ju, [
        l(C) ? (d(), re(l(we), { key: 0 })) : A("", !0)
      ]),
      i("div", Ku, [
        q(l(I))
      ]),
      i("div", Gu, [
        q(l(E))
      ]),
      i("div", Uu, [
        q(l(B))
      ]),
      i("div", zu, [
        l(W) ? (d(), re(l(pe), { key: 0 })) : A("", !0)
      ]),
      q(Cu),
      q(l(xe)),
      l(t) ? (d(), re(l(He), { key: 0 })) : A("", !0)
    ]));
  }
}), Yu = ["data-active-workspace"], Xu = /* @__PURE__ */ le({
  __name: "App",
  setup(e, { expose: t }) {
    const o = typeof document > "u" ? "" : document.title, n = {
      workbench: {
        title: "海狸工作台 · 聚焦",
        icon: "assets/nav-workbench.svg",
        iconType: "image/svg+xml"
      },
      "daily-bilibili": {
        title: "哔哩哔哩 · 收藏夹",
        icon: "assets/bilibili.svg",
        iconType: "image/svg+xml"
      },
      "card-github": {
        title: "GitHub · 工作区",
        icon: "assets/nav-github.svg",
        iconType: "image/svg+xml"
      },
      "daily-aihot": {
        title: "AI Hot · 今日热榜",
        icon: "assets/nav-aihot.svg",
        iconType: "image/svg+xml"
      },
      "daily-youtube": {
        title: "YouTube",
        icon: "assets/nav-youtube.svg",
        iconType: "image/svg+xml"
      },
      "daily-pricing": {
        title: "模型评测 · 价格排行",
        icon: "assets/nav-pricing.svg",
        iconType: "image/svg+xml"
      },
      todoist: {
        title: "Todoist · 任务",
        icon: "assets/nav-todoist.svg",
        iconType: "image/svg+xml"
      },
      wallpaper: {
        title: "壁纸工坊",
        icon: "assets/icon-32.png",
        iconType: "image/png"
      },
      home: {
        title: "新标签页",
        icon: "assets/icon-32.png",
        iconType: "image/png"
      }
    };
    let s = "";
    function c(u, x = "image/svg+xml") {
      if (typeof document > "u") return;
      const C = typeof chrome < "u" && chrome.runtime?.getURL ? chrome.runtime.getURL(u) : u;
      if (s === C) return;
      s = C;
      const W = document.querySelectorAll("link[rel*='icon']");
      if (W.length > 0)
        W.forEach((p) => {
          p.type = x, p.href = C;
        });
      else {
        const p = document.createElement("link");
        p.rel = "icon", p.type = x, p.href = C, document.head.appendChild(p);
      }
    }
    function y() {
      if (typeof document > "u") return;
      const u = n[lo.value] || n.home;
      if (c(u.icon, u.iconType), G.playing && G.title) {
        const x = G.artist ? ` - ${G.artist}` : "";
        document.title = `▶ ${G.title}${x}`;
        return;
      }
      if (Ht.playing && Ht.title) {
        document.title = `▶ ${Ht.title} · 电台`;
        return;
      }
      document.title = u.title;
    }
    Xe(
      [
        () => lo.value,
        () => G.playing,
        () => G.title,
        () => G.artist,
        () => Ht.playing,
        () => Ht.title
      ],
      () => {
        y();
      },
      { immediate: !0 }
    );
    const m = ne(() => lo.value === "home" ? "" : lo.value);
    return Xe(() => oo.activeId, (u) => {
      document.body.classList.toggle("has-card-fullscreen", !!u);
    }, { immediate: !0, flush: "sync" }), Ne(() => {
      if (typeof document < "u") {
        document.body.dataset.spa = "1", document.body.classList.remove("is-starting");
        const u = document.getElementById("endfield-loader");
        u && u.remove();
      }
      try {
        ci.bindGlobalListener(), tt.start(), zi.start(), di.init().catch((u) => console.warn("[Launcher] 初始化失败", u)), typeof chrome < "u" && chrome?.runtime?.sendMessage && setTimeout(() => {
          try {
            chrome.runtime.sendMessage({ type: "cleanupNativeTabs" }, () => {
              chrome.runtime?.lastError;
            });
          } catch {
          }
        }, 400);
      } catch (u) {
        console.warn("[App] Runtime start error:", u);
      }
    }), Ot(() => {
      tt.stop(), di.stop(), zi.stop(), document.body.classList.remove("has-card-fullscreen"), typeof document < "u" && o && (document.title = o);
    }), t({
      activeWorkspaceId: m,
      windowManagerController: Ue
    }), (u, x) => (d(), f("div", {
      id: "logicweaver-spa-root",
      class: "logicweaver-spa-root",
      "data-active-workspace": m.value || ""
    }, [
      q(vr),
      q(ma),
      q(pd),
      q(bd),
      i("nav", {
        id: "mac-dock",
        class: ue(["mac-dock", "dock-" + l(Tt).position]),
        "aria-label": "快捷应用栏"
      }, [
        q(Sn)
      ], 2),
      q(Vu)
    ], 8, Yu));
  }
}), qu = /* @__PURE__ */ Ce(Xu, [["__scopeId", "data-v-b35946c1"]]), Ju = {
  class: "endfield-stage",
  "aria-hidden": "true"
}, Qu = {
  class: "rhinelab-stage",
  "aria-hidden": "true"
}, Zu = { class: "rhine-scaler" }, ep = { class: "rhine-center-group" }, tp = { class: "rhine-auth-status" }, op = { class: "rhine-auth-text" }, ip = ["hidden"], np = { class: "rhine-cinema-caption" }, sp = /* @__PURE__ */ le({
  __name: "IntroAnimation",
  setup(e) {
    const t = F(window.innerHeight), o = F(window.innerWidth), n = F(!1), s = F(!1), c = F(10), y = F(1), m = F(0), u = /* @__PURE__ */ new Set();
    let x = 0, C = () => {
    };
    const W = ne(() => `${String(Math.round(Be.renderedProgress)).padStart(2, "0")}%`), p = ne(() => {
      const P = Be.renderedProgress / 100 * t.value + 10;
      return `${Math.min(P, Math.max(0, t.value - 102)).toFixed(1)}px`;
    }), r = ne(() => Be.renderedProgress >= 75 ? "START PROCESSING..." : Be.renderedProgress >= 35 ? "REQUEST RECEIVED" : "ID CONFIRMED : JOYCE MOORE"), a = ne(() => Be.finished ? "身份验证通过 · 欢迎进入终端" : Be.status ? `身份信息确认 · ${Be.status.replace(/^.*?\/\s*/, "")}` : "身份信息确认：JOYCE MOORE"), g = ne(() => String(Math.max(0.35, Math.min(o.value / 1920, t.value / 1080))));
    function b(P, S) {
      const X = window.setTimeout(() => {
        u.delete(X), P();
      }, S);
      u.add(X);
    }
    function v() {
      window.dispatchEvent(new CustomEvent("logicweaver:intro-complete"));
    }
    function k(P) {
      if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
        v();
        return;
      }
      const S = P ? 180 : 260, X = P ? 200 : 280, J = performance.now(), D = (H) => {
        const O = H - J, V = Math.min(1, O / S), we = 1 - Math.pow(1 - V, 3);
        if (c.value = 10 + we * Math.max(0, o.value - 10), O > S && (y.value = Math.max(0, 1 - (O - S) / X)), O >= S + X) {
          v();
          return;
        }
        x = requestAnimationFrame(D);
      };
      b(() => {
        x = requestAnimationFrame(D);
      }, P ? 60 : 120);
    }
    function $(P) {
      P || (n.value = !0), b(() => {
        s.value = !0, m.value = 6, y.value = 0, b(v, 380);
      }, P ? 40 : 420);
    }
    function M(P) {
      Be.style === "rhinelab" ? $(P) : k(P);
    }
    function U() {
      o.value = window.innerWidth, t.value = window.innerHeight;
    }
    function ce(P) {
      Be.finished || (P.key === "Enter" || P.key === " " || P.key === "Escape") && (P.preventDefault(), st.skip("KEYBOARD SKIP"));
    }
    return Ne(() => {
      document.documentElement.style.setProperty("--rhine-scale", g.value), window.addEventListener("resize", U, { passive: !0 }), window.addEventListener("keydown", ce, !0), C = Xs(M), Be.finished && M(Be.forced);
    }), so(() => {
      C(), window.removeEventListener("resize", U), window.removeEventListener("keydown", ce, !0), cancelAnimationFrame(x);
      for (const P of u) clearTimeout(P);
      u.clear();
    }), (P, S) => (d(), f("div", {
      class: "intro-vue-content",
      style: ve({ "--rhine-scale": g.value, opacity: y.value, filter: `blur(${m.value}px)` })
    }, [
      i("div", Ju, [
        S[2] || (S[2] = i("div", { class: "endfield-loader-texture" }, null, -1)),
        S[3] || (S[3] = i("div", { class: "endfield-loader-rail" }, null, -1)),
        i("div", {
          class: "endfield-loader-fill",
          style: ve({ height: `${l(Be).renderedProgress}%` })
        }, null, 4),
        i("div", {
          class: "endfield-loader-meter",
          style: ve({ top: p.value })
        }, [
          S[1] || (S[1] = i("span", { class: "endfield-loader-tick" }, null, -1)),
          i("b", null, L(W.value), 1),
          i("small", null, L(l(Be).status), 1)
        ], 4),
        S[4] || (S[4] = Vt('<section class="endfield-loader-brand"><span class="endfield-loader-kicker">DEEPSEEK HARNESS</span><strong>END</strong><strong>FIELD</strong><span class="endfield-loader-detail"><i class="endfield-loader-chevron"></i><span>EDGE INTELLIGENCE THEME</span><small>TERRA RESEARCH COMMISSION / BOOT SEQUENCE</small><span class="endfield-loader-squares"><i class="on"></i><i class="on"></i><i class="on"></i><i></i><i></i><i></i><i class="on"></i><i class="on"></i><i></i><i></i><i></i><i></i></span></span><em>OVER THE FRONTIER / INTO THE FRONT</em></section>', 1)),
        i("div", {
          class: "endfield-loader-wipe",
          style: ve({ width: `${c.value}px`, opacity: c.value > 10 ? 1 : 0 })
        }, null, 4)
      ]),
      i("div", Qu, [
        S[12] || (S[12] = Vt('<div class="rhine-background"><svg viewBox="0 0 1920 1080" preserveAspectRatio="none"><g fill="none" stroke="#ffffff" stroke-width="2.5"><path class="rhine-drift-path1" d="M-210 705C-45 705 182 704 247 567C337 377 99 306 4 435S27 680 169 631C309 584 227 314 279 111S568-113 568-113"></path><path class="rhine-drift-path2" d="M1560-80C1374 114 1671 168 1601 323S1371 367 1431 480S1692 666 1559 787S1329 886 1498 1130"></path><circle class="rhine-drift-circle" cx="1450" cy="648" r="346"></circle><circle class="rhine-drift-circle2" cx="1450" cy="648" r="348"></circle></g></svg></div>', 1)),
        i("div", Zu, [
          S[10] || (S[10] = Vt('<header class="rhine-brand"><h1>RHINE LAB</h1><div class="rhine-brand-sub">SYNTHESIZE INFORMATION</div><p class="rhine-brand-os"><span class="rhine-brand-analysis"><span style="left:2px;">A</span><span style="left:28px;">N</span><span style="left:55px;">A</span><span style="left:81px;">L</span><span style="left:103px;">Y</span><span style="left:129px;">S</span><span style="left:154px;">I</span><span style="left:166px;">S</span></span><b>OS</b></p></header>', 1)),
          i("button", {
            class: "rhine-skip",
            type: "button",
            title: "点击进入系统 (或按 Enter)",
            onClick: S[0] || (S[0] = (X) => l(st).skip("ENTER SYSTEM"))
          }, [...S[5] || (S[5] = [
            Ye("ENTER SYSTEM ", -1),
            i("span", null, "↗", -1)
          ])]),
          i("div", ep, [
            S[8] || (S[8] = i("div", { class: "rhine-logo-box" }, [
              i("svg", {
                class: "rhine-logo-svg",
                viewBox: "0 0 310 185",
                "aria-label": "Rhine Lab",
                role: "img"
              }, [
                i("path", {
                  class: "rhine-logo-contour",
                  d: "M295 73C295 41 273 15 240 15C221 15 207 23 192 38C186 43 181 47 176 52C127 96 103 128 70 128C38 128 15 101 15 70C15 39 37 15 70 15C103 15 127 48 156 75C182 99 208 128 240 128C273 128 295 105 295 73Z",
                  fill: "none",
                  stroke: "currentColor",
                  "stroke-width": "26",
                  pathLength: "1"
                }),
                i("path", {
                  class: "rhine-logo-plus",
                  d: "M44 70h50M69 45v50",
                  fill: "none",
                  stroke: "currentColor",
                  "stroke-width": "15"
                }),
                i("path", {
                  class: "rhine-logo-minus",
                  d: "M219 70h44",
                  fill: "none",
                  stroke: "currentColor",
                  "stroke-width": "15"
                }),
                i("text", {
                  class: "rhine-logo-text",
                  x: "165",
                  y: "174",
                  "text-anchor": "middle",
                  "font-size": "16",
                  "font-weight": "700",
                  "letter-spacing": "22"
                }, "RHINE·LAB")
              ])
            ], -1)),
            i("div", tp, [
              S[6] || (S[6] = i("span", { class: "rhine-auth-dot" }, "·", -1)),
              i("span", op, L(r.value), 1),
              S[7] || (S[7] = i("i", {
                class: "rhine-cursor",
                "aria-hidden": "true"
              }, null, -1))
            ])
          ]),
          i("div", {
            class: ue(["rhine-scan", { active: n.value }]),
            hidden: !n.value
          }, [...S[9] || (S[9] = [
            Vt('<svg viewBox="0 0 1920 1080" aria-hidden="true"><g fill="none" stroke="#080a08" stroke-linecap="round"><circle class="rhine-scan-circle ring-outer" cx="960" cy="540" r="280" stroke-width="2.5"></circle><circle class="rhine-scan-circle ring-white" cx="960" cy="540" r="260" stroke="#fff" stroke-width="3.5"></circle><circle class="rhine-scan-circle ring-inner" cx="960" cy="540" r="220" stroke-width="2"></circle><circle class="rhine-orbit-dot dot-1" cx="960" cy="260" r="8" fill="#ed821b" stroke="none"></circle><circle class="rhine-orbit-dot dot-2" cx="960" cy="820" r="8" fill="#ed821b" stroke="none"></circle><circle class="rhine-scan-core" cx="960" cy="540" r="6" fill="#080a08" stroke="none"></circle></g></svg><span class="rhine-scan-label">PERMISSION AUTHORIZED</span>', 2)
          ])], 10, ip),
          i("div", np, L(a.value), 1),
          S[11] || (S[11] = i("div", { class: "rhine-powered" }, [
            Ye("POWERED BY "),
            i("b", null, "RHINE LAB"),
            i("i")
          ], -1))
        ]),
        i("div", {
          class: ue(["rhine-white", { flash: s.value }]),
          "aria-hidden": "true"
        }, null, 2)
      ])
    ], 4));
  }
}), rp = /* @__PURE__ */ le({
  __name: "ProfileMenu",
  setup(e) {
    function t(o) {
      ro.trigger(o);
    }
    return (o, n) => (d(), f(oe, null, [
      i("button", {
        type: "button",
        "data-action": "messages",
        onClick: n[0] || (n[0] = K((s) => t("messages"), ["stop"]))
      }, " 通知中心 "),
      i("button", {
        type: "button",
        "data-action": "tabs",
        onClick: n[1] || (n[1] = K((s) => t("tabs"), ["stop"]))
      }, "标签页管理"),
      i("button", {
        type: "button",
        "data-action": "refresh",
        onClick: n[2] || (n[2] = K((s) => t("refresh"), ["stop"]))
      }, " 刷新 B站账号信息 "),
      i("button", {
        type: "button",
        "data-action": "switch",
        onClick: n[3] || (n[3] = K((s) => t("switch"), ["stop"]))
      }, " 切换用户（打开 B站） "),
      i("button", {
        type: "button",
        "data-action": "web",
        onClick: n[4] || (n[4] = K((s) => t("web"), ["stop"]))
      }, " 打开 B站个人中心 ")
    ], 64));
  }
}), ap = /* @__PURE__ */ le({
  __name: "WorkspaceLaunchers",
  setup(e) {
    function t(o) {
      vi.openWorkspace(o, !0);
    }
    return (o, n) => (d(), f(oe, null, [
      i("button", {
        id: "ai-top-open",
        type: "button",
        onClick: n[0] || (n[0] = (s) => t("ai"))
      }, "AI 助手"),
      i("button", {
        id: "todoist-top-open",
        type: "button",
        onClick: n[1] || (n[1] = (s) => t("todoist"))
      }, "Todoist"),
      i("button", {
        id: "stickers-top-open",
        type: "button",
        onClick: n[2] || (n[2] = (s) => t("stickers"))
      }, "表情包"),
      i("button", {
        id: "calcom-top-open",
        type: "button",
        onClick: n[3] || (n[3] = (s) => t("calcom"))
      }, "预约"),
      i("button", {
        id: "wallpaper-top-open",
        type: "button",
        onClick: n[4] || (n[4] = (s) => t("wallpaper"))
      }, "壁纸库"),
      Ji(o.$slots, "default")
    ], 64));
  }
}), lp = j(() => import("./GitHubWorkspaceCard-CZiuAFZk.js")), cp = j(() => import("./NotificationCenter-D0l0QU4_.js")), dp = j(() => import("./TabManagerPanel-BrnA44xP.js")), up = j(() => import("./BookmarkNoteMenu-cDVopwDw.js")), pp = j(() => import("./BookmarkPanel-D_0JKu3S.js")), fp = j(() => import("./LauncherDialogs--RPT1SCa.js")), hp = j(() => import("./SettingsDialog-D_TYBV4x.js")), gp = j(() => import("./SettingsView-DA2TiIiz.js")), mp = j(() => import("./ClockSettingsMenu-DkaOUEv-.js")), vp = j(() => import("./BiliTheaterDialog-D637goIW.js")), yp = j(() => import("./BiliMiniPlayer-Lr0Hy_u-.js")), wp = j(() => import("./BiliMessagePanel-DtWzlEhq.js")), bp = j(() => import("./ModelPricingCard-C0_fjPFo.js")), kp = j(() => import("./BilibiliWorkspace-CKU0zNZI.js")), _p = j(() => import("./YouTubeCard-CujX-Q50.js")), Cp = j(() => import("./AihotFeed-CgysiC3d.js")), xp = j(() => import("./GitHubTrending-WXoPzEen.js")), Lp = j(() => import("./AiDialog-CJHJPRkq.js")), Tp = j(() => import("./AihotViewer-DCJiLecQ.js")), Sp = j(() => import("./NavWheelOverlay-x8O9Nd_N.js")), $p = j(() => import("./StandaloneHost-pkM2b8qL.js")), Mp = j(() => import("./LauncherFolderDialog-DMVg6sVL.js")), Ip = j(() => import("./LauncherMenus-D9_ecgho.js"));
function ee(e, t, o, n) {
  t.spaOwned && document.getElementById("vue-spa-root") || t.id !== "github-workspace" && t.id.startsWith("github-") && document.getElementById("vue-github-workspace-root") || e.register({
    id: t.id,
    title: t.title,
    order: t.order,
    eager: !0,
    roots: [t.root],
    capabilities: t.capabilities,
    mount: ({ getRoot: s }) => {
      const c = s(t.root);
      if (!c) return;
      if (document.getElementById("vue-spa-root") && t.id !== "spa-app")
        return n?.setMounted?.(!0), () => {
          n?.setMounted?.(!1);
        };
      const y = c.innerHTML, m = Zi(o);
      m.config.errorHandler = (u, x, C) => {
        console.error(`LogicWeaver Vue feature failed: ${t.id} (${C})`, u), c.dataset.vueError = "1";
      };
      try {
        m.mount(c), n?.setMounted?.(!0);
      } catch (u) {
        throw n?.setMounted?.(!1), c.innerHTML = y, u;
      }
      return () => {
        n?.setMounted?.(!1), m.unmount();
      };
    }
  });
}
function Ep(e) {
  e.register({
    id: "intro",
    title: "启动动画",
    order: 10,
    eager: !0,
    roots: ["endfield-loader"],
    capabilities: ["ui:intro", "boot:progress"],
    mount: () => {
      const t = document.getElementById("endfield-loader");
      if (!st.enabled) {
        t?.remove(), document.body.classList.remove("is-starting");
        return;
      }
      if (!t) return;
      const o = Zi(sp);
      let n = !1;
      const s = () => {
        e.stop("intro");
      };
      window.addEventListener("logicweaver:intro-complete", s, { once: !0 }), o.mount(t);
      const c = window.setTimeout(() => {
        st.finish("基础界面已就绪，在线服务继续后台加载", !0), window.setTimeout(() => {
          n || (s(), t?.remove(), document.body.classList.remove("is-starting"));
        }, 600);
      }, 8e3);
      return () => {
        n || (n = !0, clearTimeout(c), window.removeEventListener("logicweaver:intro-complete", s), o.unmount(), t.remove(), document.body.classList.remove("is-starting"));
      };
    }
  }), ee(e, { id: "spa-app", title: "纯血 SPA 单根调度器", order: 15, root: "vue-spa-root", capabilities: ["ui:spa-root", "workspace:keepalive"] }, qu), document.getElementById("vue-spa-root") || ee(e, { id: "bili-companions", title: "b站伴随窗口", order: 19, root: "vue-bili-companions-root", capabilities: ["ui:dock-companion"] }, $p), ee(e, { id: "notifications", title: "通知中心", order: 20, root: "vue-notification-root", capabilities: ["ui:toast", "notification:dedupe"] }, $n), ee(e, { id: "profile-menu", title: "头像右键菜单", order: 21, root: "bili-profile-menu", capabilities: ["ui:profile-menu", "profile:actions"] }, rp, ro), ee(e, { id: "workspace-launchers", title: "常用工作区启动项", order: 22, root: "workspace-launchers", capabilities: ["ui:workspace-launchers", "workspace:launch"] }, ap, vi), ee(e, { id: "mac-dock", title: "底部快捷应用 Dock 栏", order: 23, root: "mac-dock", capabilities: ["ui:mac-dock", "dock:navigate"] }, Sn, ut), ee(e, { id: "hero-clock", title: "首屏中央时钟", order: 26, root: "hero-clock", capabilities: ["ui:hero-clock", "clock:read"] }, xn), ee(e, { id: "search-box", title: "首屏搜索框", order: 27, root: "search", capabilities: ["ui:search-box", "search:actions"] }, Xi), ee(e, { id: "home-music", title: "首屏音乐播放器", order: 28, root: "task-thread-home", capabilities: ["ui:home-music", "music:playback"] }, Ln, Pe), ee(e, { id: "launcher-groups", title: "常用网站分组架", order: 29, root: "launcher-groups", capabilities: ["ui:launcher-groups", "launcher:navigate"] }, Tn, be), ee(e, { id: "weather-widget", title: "首屏天气小部件", order: 39, root: "weather-body", capabilities: ["ui:weather-widget", "weather:read"] }, Cn), ee(e, { id: "github-workspace", title: "GitHub 独立页 Vue 工作台", order: 49, root: "vue-github-workspace-root", capabilities: ["ui:github-workspace"] }, lp), ee(e, { id: "github-status", title: "GitHub 同步状态", order: 50, root: "vue-github-status-root", capabilities: ["ui:github-status", "github:sync-read"] }, Ws, en), ee(e, { id: "github-folders", title: "GitHub 文件夹导航", order: 55, root: "gh-folder-list", capabilities: ["ui:github-folders", "github:categorize-drop"] }, Os, tn), ee(e, { id: "github-hero", title: "GitHub 分类摘要", order: 56, root: "gh-hero", capabilities: ["ui:github-summary", "github:actions"] }, Bs, on), ee(e, { id: "github-repositories", title: "GitHub 仓库列表", order: 57, root: "vue-github-repositories-root", capabilities: ["ui:github-repositories", "github:repository-actions", "github:paging"] }, Fs, nn), ee(e, { id: "github-batch-bar", title: "GitHub Star 批量操作工具栏", order: 58, root: "gh-batch-bar", capabilities: ["ui:github-batch-bar", "github:batch-actions"] }, Ns, sn), ee(e, { id: "notification-center", spaOwned: !0, title: "持久通知中心", order: 71, root: "vue-notification-center-root", capabilities: ["ui:notification-history", "notification:read"] }, cp, mt), ee(e, { id: "tab-manager", spaOwned: !0, title: "独立标签页管理", order: 71, root: "vue-tab-manager-root", capabilities: ["ui:tab-manager", "tabs:explicit"] }, dp, bn), ee(e, { id: "bookmark-menu", title: "书签上下文操作与备注菜单", order: 72, root: "vue-bookmark-menu-root", capabilities: ["ui:bookmark-menu", "bookmark:edit"] }, up, hi), ee(e, { id: "launcher-dialogs", title: "快捷启动器管理弹窗族", order: 73, root: "vue-launcher-dialogs-root", capabilities: ["ui:launcher-dialogs", "launcher:manage"] }, fp, Jt), ee(e, { id: "launcher-folder-dialog", title: "大文件夹展开视窗", order: 74, root: "vue-launcher-folder-root", capabilities: ["ui:launcher-folder", "launcher:folder-dialog"] }, Mp, lt), ee(e, { id: "launcher-menus", title: "启动器快捷上下文菜单族", order: 76, root: "vue-launcher-menus-root", capabilities: ["ui:launcher-menus", "launcher:context-menu"] }, Ip, Dt), ee(e, { id: "bookmark-panel", title: "浏览器书签侧边滑动视窗", order: 77, root: "vue-bookmark-panel-root", capabilities: ["ui:bookmark-panel", "bookmarks:panel"] }, pp, No), ee(e, { id: "bookmark-folder-strip", spaOwned: !0, title: "顶栏书签快捷文件夹横条", order: 78, root: "vue-bookmark-folder-strip-root", capabilities: ["ui:bookmark-folder-strip", "bookmarks:strip"] }, null, Mo), ee(e, { id: "settings-page", title: "独立设置页 Vue 工作台", order: 79, root: "vue-options-root", capabilities: ["ui:settings-page"] }, gp), ee(e, { id: "settings-dialog", title: "全局设置中心视窗", order: 80, root: "vue-settings-dialog-root", capabilities: ["ui:settings-dialog", "settings:manage"] }, hp, Ho), ee(e, { id: "clock-settings-menu", spaOwned: !0, title: "中央时钟偏好配置菜单", order: 82, root: "vue-clock-settings-root", capabilities: ["ui:clock-settings", "clock:preference-edit"] }, mp, ft), ee(e, { id: "bili-theater-dialog", title: "Bilibili 沉浸剧场与评论区弹窗", order: 85, root: "vue-bili-theater-root", capabilities: ["ui:bili-theater", "bili:playback"] }, vp, Qt), ee(e, { id: "bili-mini-player", title: "Bilibili 悬浮迷你播放器", order: 85, root: "vue-bili-mini-player-root", capabilities: ["ui:bili-mini-player", "bili:playback"] }, yp), ee(e, { id: "ai-dialog", title: "AI 助手对话框与知识点抽屉", order: 86, root: "vue-ai-dialog-root", capabilities: ["ui:ai-dialog", "ai:chat"] }, Lp, yi), ee(e, { id: "aihot-viewer", spaOwned: !0, title: "AI HOT 资讯文章阅读器", order: 88, root: "vue-aihot-viewer-root", capabilities: ["ui:aihot-viewer", "viewer:aihot"] }, Tp, mi), ee(e, { id: "nav-wheel", title: "辐射状快捷动作轮盘与悬浮球", order: 95, root: "vue-nav-wheel-root", capabilities: ["ui:nav-wheel", "nav:radial-menu"] }, Sp, ge), ee(e, { id: "bili-message-panel", spaOwned: !0, title: "Bilibili 消息与互动通知中心", order: 102, root: "vue-bili-message-panel-root", capabilities: ["ui:bili-message-panel", "bili:messages"] }, wp, pt), ee(e, { id: "pricing-radar", spaOwned: !0, title: "模型插件 (AI 定价与排行榜)", order: 108, root: "vue-pricing-root", capabilities: ["ui:pricing-radar", "pricing:read"] }, bp, dn), ee(e, { id: "bili-favorites", spaOwned: !0, title: "b站插件 Vue 外壳", order: 110, root: "vue-bili-favorites-root", capabilities: ["ui:bili-favorites-shell", "bilibili:favorites"] }, kp, ln), ee(e, { id: "youtube-card", spaOwned: !0, title: "YouTube 订阅与探索工作台", order: 111, root: "vue-youtube-root", capabilities: ["ui:youtube-card", "youtube:updates"] }, _p, un), ee(e, { id: "aihot-feed", spaOwned: !0, title: "AI HOT 资讯流全功能聚合看板", order: 112, root: "vue-aihot-root", capabilities: ["ui:aihot-feed", "aihot:aggregate"] }, Cp, cn), ee(e, { id: "github-trending", spaOwned: !0, title: "GitHub 趋势榜与热门流", order: 114, root: "vue-github-trending-root", capabilities: ["ui:github-trending", "github:trending"] }, xp, pn);
}
const Vi = /* @__PURE__ */ new WeakMap(), eo = /* @__PURE__ */ new Map();
let Dp = 1, qt = null;
const Yi = /\b(?:buy|purchase|pay|checkout|order|delete|remove|erase|send|post|publish|submit|transfer|withdraw|reset password)\b|购买|支付|下单|删除|移除|发送|发布|提交|转账|提现|修改密码/i;
function ki(e) {
  let t = Vi.get(e);
  return t || (t = Dp++, Vi.set(e, t)), eo.set(t, e), t;
}
function Mn() {
  return window.location.protocol === "chrome-extension:" && ["/newtab.html", "/bilibili.html"].includes(window.location.pathname);
}
function Oo(e) {
  return e.isConnected && !e.closest('[aria-hidden="true"],[inert]') && e.checkVisibility({ checkOpacity: !0, checkVisibilityCSS: !0 });
}
function Ro(e) {
  const t = e;
  return !["password", "file", "hidden"].includes(t.type || "") && !e.matches(":disabled") && !e.closest('[aria-disabled="true"]');
}
function In(e) {
  const t = e, o = t.getAttribute("aria-labelledby")?.split(/\s+/).map((s) => document.getElementById(s)?.textContent?.trim() || "").filter(Boolean).join(" ") || "", n = "labels" in t ? [...t.labels || []].map((s) => s.textContent?.trim() || "").filter(Boolean).join(" ") : "";
  return (o || t.getAttribute("aria-label") || n || t.getAttribute("title") || t.getAttribute("placeholder") || t.innerText || t.textContent || "").trim().slice(0, 160);
}
function En(e) {
  const t = e;
  return e.getAttribute("role") || { A: "link", BUTTON: "button", SELECT: "combobox", TEXTAREA: "textbox" }[e.tagName] || (e.tagName === "INPUT" ? ["checkbox", "radio"].includes(t.type) ? t.type : ["submit", "button", "reset"].includes(t.type) ? "button" : "textbox" : "button");
}
function Bo(e) {
  const t = e;
  return "value" in t ? String(t.value || "").slice(0, 200) : "";
}
function Dn() {
  return [
    performance.timeOrigin,
    location.href,
    scrollX,
    scrollY,
    innerWidth,
    innerHeight,
    [...document.querySelectorAll("input,textarea,select")].filter(Ro).map((e) => [ki(e), Bo(e), e.checked, e.selectedIndex])
  ];
}
function Pn(e) {
  if (!e || !Oo(e) || !Ro(e)) return "";
  const t = e.closest("form,dialog,[role=dialog],article,li,tr") || e.parentElement;
  return JSON.stringify([
    ki(e),
    En(e),
    In(e),
    Bo(e),
    e.checked,
    e.getAttribute("href"),
    e.getAttribute("aria-expanded"),
    t?.textContent?.trim().slice(0, 250) || ""
  ]);
}
function Pp() {
  if (!Mn() || !document.body) throw new Error("Unsupported workspace page");
  for (const [r, a] of eo) a.isConnected || eo.delete(r);
  const e = [], t = 'a[href],button,input,textarea,select,summary,[contenteditable="true"],[role="button"],[role="link"],[role="checkbox"],[role="tab"],[role="menuitem"],[role="textbox"]';
  for (const r of document.querySelectorAll(t)) {
    if (!Ro(r) || !Oo(r)) continue;
    const a = r.getBoundingClientRect(), g = a.x + a.width / 2, b = a.y + a.height / 2;
    if (!a.width || !a.height || g < 0 || b < 0 || g >= innerWidth || b >= innerHeight) continue;
    const v = ki(r), k = En(r), $ = In(r) || k;
    if (r.tagName === "SELECT") {
      const M = r;
      for (const U of M.options) !U.disabled && !U.selected && e.push({
        id: "e" + (e.length + 1),
        kind: "select",
        node: v,
        role: k,
        label: $ + " -> " + U.label.slice(0, 100),
        value: U.value,
        current_value: M.selectedOptions[0]?.label || ""
      });
    } else {
      const U = !r.readOnly && (r.matches('input:not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="button"]),textarea,[contenteditable="true"]') || ["textbox", "searchbox"].includes(r.getAttribute("role") || ""));
      e.push({
        id: "e" + (e.length + 1),
        kind: U ? "fill" : "click",
        node: v,
        role: k,
        label: $,
        value: Bo(r)
      }), U && e.push({
        id: "e" + (e.length + 1),
        kind: "click",
        node: v,
        role: k,
        label: "Open " + $,
        value: Bo(r)
      });
    }
    if (e.length >= 120) break;
  }
  const o = document.documentElement.scrollHeight, n = e.slice(0, 120);
  scrollY + innerHeight < o - 2 && n.push({ id: "scroll_down", kind: "scroll", label: "Scroll down", delta: 560 }), scrollY > 0 && n.push({ id: "scroll_up", kind: "scroll", label: "Scroll up", delta: -560 }), n.push({ id: "wait", kind: "wait", label: "Wait for page" });
  const s = [], c = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT), y = document.createRange();
  let m = 0, u;
  for (; (u = c.nextNode()) && m < 4e3; ) {
    const r = u.parentElement, a = u.textContent?.trim() || "";
    if (!r || !a || !Oo(r) || r.closest("script,style,noscript,template")) continue;
    y.selectNodeContents(u);
    const g = y.getBoundingClientRect();
    !g.width || !g.height || g.bottom <= 0 || g.top >= innerHeight || g.right <= 0 || g.left >= innerWidth || (s.push(a), m += a.length);
  }
  const x = s.join(`
`).slice(0, 4e3), C = Dn(), W = {};
  for (const r of n) r.node && (W[String(r.node)] = Pn(eo.get(r.node)));
  const p = {
    url: location.href,
    title: document.title.slice(0, 160),
    text: x,
    actions: n,
    scroll: { y: scrollY, height: o },
    page_key: C,
    guards: W,
    marker: JSON.stringify([C, x, n.map((r) => [r.kind, r.label, r.value])])
  };
  return qt = p, p;
}
function Ap(e) {
  if (!Mn() || !qt || !e || typeof e != "object") throw new Error("No observed page");
  const t = e, o = qt.actions.find((n) => n.id === t.action?.id && n.kind === t.action?.kind && n.node === t.action?.node && n.label === t.action?.label && n.value === t.action?.value);
  if (!o || t.url !== location.href || JSON.stringify(t.pageKey) !== JSON.stringify(Dn()))
    throw new Error("STALE_PAGE");
  if (o.node) {
    const n = eo.get(o.node);
    if (!n || !Oo(n) || !Ro(n) || Pn(n) !== t.expectedGuard || qt.guards[String(o.node)] !== t.expectedGuard) throw new Error("STALE_PAGE");
    const s = n.getBoundingClientRect(), c = s.x + s.width / 2, y = s.y + s.height / 2;
    if (c < 0 || y < 0 || c >= innerWidth || y >= innerHeight || !n.contains(document.elementFromPoint(c, y)))
      throw new Error("STALE_PAGE");
    const m = n.getAttribute("href") || "";
    if (o.kind === "click" && (Yi.test(o.label + " " + m) || m && new URL(m, location.href).origin !== location.origin)) throw new Error("NEEDS_CONFIRMATION");
    if (o.kind === "select") {
      if (Yi.test(o.label) || n.tagName !== "SELECT") throw new Error("NEEDS_CONFIRMATION");
      const u = n;
      if (![...u.options].some((x) => x.value === o.value && !x.disabled)) throw new Error("STALE_PAGE");
      u.value = o.value || "", u.dispatchEvent(new Event("input", { bubbles: !0 })), u.dispatchEvent(new Event("change", { bubbles: !0 }));
    } else if (o.kind === "fill") {
      if (typeof t.text != "string" || !t.text.trim() || t.text.length > 2e3) throw new Error("Invalid text");
      if (n.readOnly) throw new Error("STALE_PAGE");
      if (n instanceof HTMLTextAreaElement || n instanceof HTMLInputElement) {
        const x = n instanceof HTMLTextAreaElement ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
        Object.getOwnPropertyDescriptor(x, "value")?.set?.call(n, t.text);
      } else if (n.isContentEditable) n.textContent = t.text;
      else throw new Error("STALE_PAGE");
      n.dispatchEvent(new Event("input", { bubbles: !0 })), n.dispatchEvent(new Event("change", { bubbles: !0 }));
    } else o.kind === "click" && n.click();
  } else o.kind === "scroll" && window.scrollBy({ top: o.delta, behavior: "instant" });
  return qt = null, { executed: !0 };
}
function Wp() {
  if (window.location.protocol !== "chrome-extension:" || typeof chrome > "u" || !chrome.runtime?.connect || !["/newtab.html", "/bilibili.html"].includes(window.location.pathname)) return;
  const e = chrome.runtime.connect({ name: "jev-cooperative-dock" });
  e.onMessage.addListener((t) => {
    if (!t || typeof t != "object") return;
    const o = t;
    if (o.operation === "observePage" && typeof o.id == "string") {
      try {
        e.postMessage({ id: o.id, state: Pp() });
      } catch {
        e.postMessage({ id: o.id, error: "Page unavailable" });
      }
      return;
    }
    if (o.operation === "actPage" && typeof o.id == "string") {
      try {
        e.postMessage({ id: o.id, ...Ap(o.request) });
      } catch {
        e.postMessage({ id: o.id, error: "Page action rejected" });
      }
      return;
    }
    if (!(typeof o.id != "string" || o.id.length > 100)) {
      if (o.operation === "observe") {
        const n = gt.list().find((s) => s.id === "dock.open-bilibili");
        e.postMessage({ id: o.id, ready: n?.enabled === !0 });
        return;
      }
      if (o.operation === "activate") {
        if (gt.list().find((s) => s.id === "dock.open-bilibili")?.enabled !== !0) {
          e.postMessage({ id: o.id, executed: !1 });
          return;
        }
        gt.execute("dock.open-bilibili", void 0, "jev-cooperative").then(
          () => e.postMessage({ id: o.id, executed: !0 }),
          () => e.postMessage({ id: o.id, executed: !1 })
        );
      }
    }
  });
}
os();
const jo = Us(gt);
fr(gt, jo);
hr(gt);
Ep(jo);
Wp();
fi.loadBookmarks();
(async () => {
  document.getElementById("vue-bili-favorites-root") && !document.getElementById("vue-spa-root") && await import("./bilibili-channel.service-D55I1NIa.js"), await jo.startEager(), st.finish("BOOT COMPLETE / 首页加载完成");
})().catch((e) => console.error("[LogicWeaver] 页面启动失败", e));
window.addEventListener("pagehide", () => {
  jo.stopAll();
}, { once: !0 });
export {
  Ii as C,
  ou as D,
  Ki as L,
  vc as T,
  ap as _,
  bn as a,
  Ei as b,
  ft as c,
  af as d,
  yi as e,
  ge as f,
  Wo as g,
  bc as h,
  wc as i,
  yc as j,
  rp as k,
  Te as l,
  _n as m,
  z as n,
  gt as o,
  Co as t
};
