import { _ as wi, i as hs } from "./SearchBox.vue_vue_type_script_setup_true_lang-COsFKoJk.js";
/* empty css                */
import { r as ke, a as Pt, b as H, d as le, o as r, c as ce, w as Zt, u as s, e as c, f as n, g as I, T as ms, t as m, F as z, h as pe, i as N, j as mt, k as Dt, l as We, v as vs, m as Oe, n as eo, p as bi, q as ys, s as re, x as Ne, y as Et, z as to, A as ve, B as se, C as He, D as Q, E as G, G as ft, H as mo, I as ki, J as Go, K as lt, L as no, M as _i, N as ws, O as Ci } from "./vendor-vue-DokqDua_.js";
import { W as Vo, t as jt, p as rn, n as Ae, a as To, b as At, h as Fe, m as ct, c as Un, d as Gn, e as bs, i as ks, g as _s, f as V, j as xi, k as ao, l as $i, o as xo, q as Cs, r as io, s as Kt, u as So, v as xs, w as $s, x as Mo, y as Ls } from "./view-styles-BVg88bAF.js";
import { l as Ts, r as Ss, G as Ms, a as oe, b as en, f as Yo, c as En, s as Is, d as Ds, e as Wn, g as qo, h as tn, i as Tt, j as zt, k as at, m as bo, n as Ut, o as Se, p as As, q as Je, t as ot, u as _t, v as kt, w as vo, R as Ps, x as Es, y as wt, z as Ce, A as Ws, B as Bt } from "./search.service-Du6XfCKa.js";
import { f as Ge, l as Ct, a as xe, p as Os, b as ko, c as Qt, y as Li, d as ae, e as Rt } from "./youtube-store-g5iUTDFb.js";
import { c as Bs, a as Rs, t as Fs, b as Ns, d as Hs, e as js, f as Gt, g as Ks } from "./calendar.service-CoUPYBch.js";
import { w as $e, s as On, P as zs, i as Xo, D as ln, a as Vn, g as Ve, p as Us, L as Gs, b as xt, c as Vs, d as cn, t as Yn, e as Ys, f as qs, h as $o, l as Xs } from "./window-manager.store-Dfe7fisV.js";
import { s as on, a as Js, b as Qs, u as Ti } from "./InlineEditStatus.vue_vue_type_style_index_0_scoped_28642927_lang-ChQUbu-A.js";
import { b as _o, a as Zs, c as ea } from "./up-group-manager-store-Djltjsru.js";
import { biliMessagePanelController as St, biliMessagePanelState as ta } from "./message-panel-store-jrtqwP8n.js";
import { b as Si, r as oa, a as ro } from "./bili-favorites-store-CEtQay0A.js";
import { a as Bn, b as Mi, c as na } from "./aihot-feed-store-DACvFIR-.js";
import { p as Ii } from "./pricing-store-BqXWmthf.js";
import { R as ia } from "./read-session-e15k1OwA.js";
import { f as gt } from "./fullscreen-cards.store-DWUHs7_x.js";
import { k as sa, m as aa } from "./core-utils-Ccz-tarm.js";
import { _ as Te } from "./_plugin-vue_export-helper-CHgC5LLL.js";
import { t as tt } from "./together-listen.store-ite4NsQn.js";
import { C as ra } from "./ChatShareMenu-D7qIImNo.js";
const la = /^[a-z][a-z0-9]*(?:[.:-][a-z0-9]+)*$/;
function ca() {
  const e = /* @__PURE__ */ new Map(), t = /* @__PURE__ */ new Map();
  function o(p) {
    if (!p || !la.test(p.id)) throw new TypeError(`Invalid command id: ${p?.id || ""}`);
    if (!p.title?.trim() || !p.category?.trim() || typeof p.run != "function")
      throw new TypeError(`Command ${p.id} requires title, category and run()`);
    if (e.has(p.id)) throw new Error(`Command already registered: ${p.id}`);
    return e.set(p.id, Object.freeze({
      ...p,
      description: p.description || "",
      keywords: Object.freeze([...p.keywords || []]),
      concurrency: p.concurrency || "replace"
    })), () => {
      i(p.id), e.delete(p.id);
    };
  }
  function i(p) {
    const w = t.get(p);
    return w ? (w.abort(), t.delete(p), !0) : !1;
  }
  async function a(p, w, k = "api") {
    const M = e.get(p);
    if (!M) throw new Error(`Unknown command: ${p}`);
    if (M.enabled && !M.enabled()) return;
    const g = M.concurrency || "replace";
    if (t.has(p)) {
      if (g === "drop") return;
      g === "replace" && i(p);
    }
    const u = new AbortController();
    g !== "parallel" && t.set(p, u);
    try {
      return await M.run(w, { signal: u.signal, source: k });
    } finally {
      t.get(p) === u && t.delete(p);
    }
  }
  function l(p) {
    return Object.freeze({
      id: p.id,
      title: p.title,
      category: p.category,
      description: p.description || "",
      keywords: Object.freeze([...p.keywords || []]),
      concurrency: p.concurrency || "replace",
      enabled: p.enabled ? !!p.enabled() : !0,
      running: t.has(p.id)
    });
  }
  function h() {
    return Object.freeze([...e.values()].map(l).sort((p, w) => p.category.localeCompare(w.category, "zh") || p.title.localeCompare(w.title, "zh")));
  }
  function f(p, w = 20) {
    const k = String(p || "").trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
    if (!k.length) return h().slice(0, w);
    const M = [...e.values()].map((g) => {
      const u = l(g), d = u.title.toLocaleLowerCase(), b = `${u.id} ${d} ${u.category} ${u.description} ${u.keywords.join(" ")}`.toLocaleLowerCase();
      if (!k.every((y) => b.includes(y))) return null;
      let C = 0;
      for (const y of k)
        u.id === y ? C += 200 : u.id.startsWith(y) && (C += 120), d === y ? C += 160 : d.startsWith(y) ? C += 100 : d.includes(y) && (C += 60), u.keywords.some((x) => x.toLocaleLowerCase().startsWith(y)) && (C += 40);
      return { item: u, score: C };
    }).filter((g) => !!g);
    return M.sort((g, u) => u.score - g.score || g.item.title.localeCompare(u.item.title, "zh")), Object.freeze(M.slice(0, Math.max(1, w)).map((g) => g.item));
  }
  return Object.freeze({ register: o, execute: a, cancel: i, has: (p) => e.has(p), list: h, search: f });
}
const nn = ca(), da = /^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/;
function ua(e) {
  const t = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map();
  function l(g) {
    if (!g || !da.test(g.id)) throw new TypeError(`Invalid feature id: ${g?.id || ""}`);
    if (!g.title?.trim() || typeof g.mount != "function") throw new TypeError(`Feature ${g.id} requires title and mount()`);
    if (t.has(g.id)) throw new Error(`Feature already registered: ${g.id}`);
    return t.set(g.id, Object.freeze({
      ...g,
      order: Number(g.order) || 100,
      eager: g.eager === !0,
      roots: Object.freeze([...g.roots || []]),
      capabilities: Object.freeze([...g.capabilities || []])
    })), () => {
      p(g.id), a.delete(g.id), t.delete(g.id);
    };
  }
  function h(g) {
    return typeof g == "function" ? g : g && typeof g.unmount == "function" ? () => g.unmount() : () => {
    };
  }
  function f(g) {
    if (o.has(g)) return Promise.resolve(o.get(g)?.cleanup);
    if (i.has(g)) return i.get(g);
    const u = t.get(g);
    if (!u) return Promise.reject(new Error(`Unknown feature: ${g}`));
    a.delete(g);
    const d = new AbortController(), b = Object.freeze({
      signal: d.signal,
      commands: e,
      getRoot: (y) => document.getElementById(y)
    }), C = Promise.resolve().then(() => u.mount(b)).then((y) => (i.delete(g), o.set(g, { cleanup: y, controller: d }), y), (y) => {
      throw i.delete(g), a.set(g, y), d.abort(), y;
    });
    return i.set(g, C), C;
  }
  async function p(g) {
    const u = i.get(g);
    if (u)
      try {
        await u;
      } catch {
        return;
      }
    const d = o.get(g);
    d && (o.delete(g), d.controller.abort(), await h(d.cleanup)());
  }
  async function w() {
    const g = typeof document < "u" && !!(document.getElementById("vue-spa-root") || document.getElementById("logicweaver-spa-root")), u = [...t.values()].filter((C) => !(!C.eager || !g && C.roots && C.roots.length > 0 && !C.roots.some((x) => !!document.getElementById(x)))).sort((C, y) => (C.order || 100) - (y.order || 100)), b = (await Promise.allSettled(u.map((C) => f(C.id)))).flatMap((C, y) => C.status === "rejected" ? [{ id: u[y].id, reason: C.reason }] : []);
    b.length && console.warn("LogicWeaver Vue features failed to mount", b);
  }
  async function k() {
    const g = [...o.keys()].reverse();
    await Promise.allSettled(g.map(p));
  }
  function M() {
    return Object.freeze([...t.values()].map((g) => Object.freeze({
      id: g.id,
      title: g.title,
      order: g.order || 100,
      eager: g.eager === !0,
      roots: Object.freeze([...g.roots || []]),
      capabilities: Object.freeze([...g.capabilities || []]),
      status: i.has(g.id) ? "mounting" : o.has(g.id) ? "mounted" : a.has(g.id) ? "failed" : "registered",
      error: a.has(g.id) ? String(a.get(g.id)?.message || a.get(g.id) || "Feature mount failed") : ""
    })).sort((g, u) => g.order - u.order));
  }
  return Object.freeze({ register: l, start: f, startEager: w, stop: p, stopAll: k, has: (g) => t.has(g), list: M });
}
const pa = localStorage.getItem("startupAnimationStyle") || localStorage.getItem("logicweaverStartupStyle") || "endfield", qn = (() => {
  try {
    const e = localStorage.getItem("showStartupAnimation"), t = localStorage.getItem("logicweaverEndfieldLoader");
    return e === "0" || e === "false" || t === "0" || t === "false" || document.documentElement.classList.contains("skip-endfield-loader");
  } catch {
    return !1;
  }
})(), Le = ke({
  enabled: !qn,
  style: pa === "rhinelab" ? "rhinelab" : "endfield",
  renderedProgress: 4,
  targetProgress: 4,
  status: "CORE SHELL...",
  finished: qn,
  exiting: !1,
  forced: !1
});
let oo = 0, Jo = 4, Di = performance.now(), Sn = 0, No = null;
function Ai(e) {
  const t = e - Di, o = Sn ? Math.min(1, t / Sn) : 1, i = o * o * (3 - 2 * o);
  Le.renderedProgress = Jo + (Le.targetProgress - Jo) * i, o < 1 && !Le.finished ? oo = requestAnimationFrame(Ai) : oo = 0;
}
function fa(e, t) {
  if (!Le.enabled || Le.finished) return;
  const o = Math.max(Le.targetProgress, Math.max(4, Math.min(100, Number(e) || 4)));
  t && (Le.status = t), Jo = Le.renderedProgress, Le.targetProgress = o, Di = performance.now(), Sn = Math.max(280, Math.min(920, 220 + Math.abs(o - Jo) * 7.5)), cancelAnimationFrame(oo), oo = requestAnimationFrame(Ai);
}
function Pi(e = "Ready", t = !1) {
  Le.finished || (Le.finished = !0, Le.forced = t, Le.status = e, Le.targetProgress = 100, cancelAnimationFrame(oo), oo = 0, Le.renderedProgress = 100, No?.(t));
}
function ga(e = "KEYBOARD SKIP") {
  Pi(e, !0);
}
const ze = Pt(Le), ht = Object.freeze({
  update: fa,
  finish: Pi,
  skip: ga,
  get enabled() {
    return Le.enabled;
  },
  get finished() {
    return Le.finished;
  }
});
function ha(e) {
  return No = e, Le.finished && e(Le.forced), () => {
    No === e && (No = null);
  };
}
const Ei = [
  { date: "今天", dayName: "周四", emoji: "🌤️", condition: "多云", highTemp: 26, lowTemp: 18, rainProb: 15 },
  { date: "明天", dayName: "周五", emoji: "⛅", condition: "阴天", highTemp: 24, lowTemp: 17, rainProb: 30 },
  { date: "后天", dayName: "周六", emoji: "🌧️", condition: "小雨", highTemp: 21, lowTemp: 16, rainProb: 75 },
  { date: "周日", dayName: "周日", emoji: "🌦️", condition: "阵雨", highTemp: 23, lowTemp: 15, rainProb: 45 },
  { date: "周一", dayName: "周一", emoji: "☀️", condition: "晴天", highTemp: 27, lowTemp: 18, rainProb: 10 },
  { date: "周二", dayName: "周二", emoji: "🌤️", condition: "多云", highTemp: 28, lowTemp: 19, rainProb: 15 },
  { date: "周三", dayName: "周三", emoji: "☀️", condition: "晴天", highTemp: 29, lowTemp: 20, rainProb: 5 }
], Wi = "lw_weather_snapshot_v1";
function ma() {
  if (typeof window > "u" || typeof localStorage > "u") return null;
  try {
    const e = localStorage.getItem(Wi);
    if (!e) return null;
    const t = JSON.parse(e);
    if (t && t.data && t.data.currentTemp !== void 0)
      return {
        state: "ready",
        city: t.city || t.data.cityName || "",
        data: t.data,
        forecastDays: Array.isArray(t.forecastDays) && t.forecastDays.length ? t.forecastDays : Ei,
        detailInfo: t.detailInfo || null,
        updatedAt: t.savedAt || Date.now()
      };
  } catch {
  }
  return null;
}
function Io(e) {
  if (!(typeof window > "u" || typeof localStorage > "u"))
    try {
      e.data && localStorage.setItem(
        Wi,
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
const va = () => {
  const e = ma();
  return {
    state: e?.state || "loading",
    city: e?.city || "",
    errorMessage: "",
    data: e?.data || null,
    updatedAt: e?.updatedAt || null,
    forecastModalOpen: !1,
    forecastDays: e?.forecastDays || Ei,
    detailInfo: e?.detailInfo || {
      humidity: "62%",
      wind: "东北风 2级",
      uvIndex: "中等 (4)",
      airQuality: "优 (32)"
    }
  };
}, j = ke(va());
let dn = null, un = null;
const Ze = {
  get snapshot() {
    return Pt(j);
  },
  update(e) {
    Object.assign(j, e), Io(j);
  },
  unconfigured() {
    Object.assign(j, {
      state: "unconfigured",
      city: "",
      errorMessage: "",
      data: null,
      updatedAt: Date.now()
    });
  },
  loading(e = "") {
    if (j.data) {
      e && (j.city = e);
      return;
    }
    Object.assign(j, {
      state: "loading",
      city: e,
      errorMessage: "",
      updatedAt: Date.now()
    });
  },
  ready(e, t = "") {
    Object.assign(j, {
      state: "ready",
      city: t || e.cityName,
      errorMessage: "",
      data: e,
      updatedAt: Date.now()
    }), Io(j);
  },
  notFound(e = "") {
    Object.assign(j, {
      state: "not_found",
      city: e,
      errorMessage: `找不到城市「${e}」，右键可重新选择地点。`,
      data: null,
      updatedAt: Date.now()
    });
  },
  error(e = "天气加载失败，右键此处可重新选择地点。", t = "") {
    j.data || Object.assign(j, {
      state: "error",
      city: t,
      errorMessage: e,
      data: null,
      updatedAt: Date.now()
    });
  },
  openForecastModal(e) {
    e && (j.city = e), j.forecastModalOpen = !0;
  },
  closeForecastModal() {
    j.forecastModalOpen = !1;
  },
  setForecastDays(e) {
    j.forecastDays = Array.isArray(e) ? e.map((t) => ({
      dayName: t.dayName || t.day || "",
      date: t.date || "",
      emoji: t.emoji || "🌤️",
      condition: t.condition || t.text || "",
      rainProb: t.rainProb ?? 0,
      lowTemp: t.lowTemp ?? t.tempMin ?? 0,
      highTemp: t.highTemp ?? t.tempMax ?? 0
    })) : [], Io(j);
  },
  setDetailInfo(e) {
    j.detailInfo = { ...e }, Io(j);
  },
  applyCity(e) {
    typeof window < "u" && window.dispatchEvent(new CustomEvent("logicweaver:weather-city-selected", { detail: { city: e } })), this.refresh();
  },
  refresh() {
    dn ? dn() : typeof window < "u" && window.dispatchEvent(new CustomEvent("logicweaver:weather-refresh"));
  },
  changeLocation(e) {
    un ? un(e) : typeof window < "u" && window.dispatchEvent(new CustomEvent("logicweaver:weather-change-location", { detail: { clientX: e?.clientX, clientY: e?.clientY } }));
  },
  setRefreshAction(e) {
    dn = e;
  },
  setChangeLocationAction(e) {
    un = e;
  }
}, ya = () => ({
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
}), he = ke(ya());
let pn = null;
const Vt = {
  get snapshot() {
    return Pt(he);
  },
  update(e) {
    Object.assign(he, e);
  },
  updateTime(e, t, o, i) {
    he.timeText = e, he.secsText = t, he.greetingText = o, he.dateText = i, he.updatedAt = Date.now();
  },
  applyConfig(e) {
    e.fontFamily !== void 0 && (he.fontFamily = e.fontFamily), e.colorHex !== void 0 && (he.colorHex = e.colorHex), e.greetColor !== void 0 && (he.greetColor = e.greetColor), e.dateColor !== void 0 && (he.dateColor = e.dateColor), e.isBlack !== void 0 && (he.isBlack = e.isBlack), e.isCustomColor !== void 0 && (he.isCustomColor = e.isCustomColor), he.updatedAt = Date.now();
  },
  openSettings(e) {
    pn ? pn(e) : window.dispatchEvent(new CustomEvent("logicweaver:clock-open-settings", { detail: { clientX: e?.clientX, clientY: e?.clientY } }));
  },
  setOpenSettingsAction(e) {
    pn = e;
  }
}, wa = [
  { id: "ai", title: "AI 助手" },
  { id: "todoist", title: "Todoist" },
  { id: "stickers", title: "表情包" },
  { id: "calcom", title: "预约" },
  { id: "wallpaper", title: "壁纸库" }
], ba = () => ({
  mounted: !1,
  visible: !1,
  items: [...wa]
}), fn = ke(ba());
let Do = {};
const Rn = {
  getSnapshot() {
    return Pt(fn);
  },
  update(e) {
    Object.assign(fn, e);
  },
  setMounted(e) {
    fn.mounted = e;
  },
  openWorkspace(e, t = !1) {
    if (Do.open) {
      Do.open(e);
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
    const i = o.LogicWeaverWindowTabs;
    if (i?.open) {
      i.open(e);
      return;
    }
    const a = document.getElementById(`${e}-top-open`);
    a && !t ? a.click() : window.dispatchEvent(new CustomEvent("logicweaver:open-workspace", { detail: { id: e } }));
  },
  setActions(e) {
    Do = { ...Do, ...e };
  }
}, gn = ke({ visible: !1, pendingWrites: 0 });
async function ka(e) {
  if (gn.pendingWrites) throw new Error("壁纸操作正在处理，未自动排队");
  gn.pendingWrites++;
  try {
    return await e();
  } finally {
    gn.pendingWrites--;
  }
}
const Xn = {
  openDialog() {
    $e.open("wallpaper");
  },
  closeDialog() {
    $e.close("wallpaper");
  },
  resetDefault() {
    return ka(() => Vo.clearWallpaper());
  }
}, Jn = [
  { id: "mono", label: "极简等宽", font: "ui-monospace, 'SF Mono', 'JetBrains Mono', Menlo, Consolas, monospace", sample: "15:50:10" },
  { id: "sans", label: "现代无衬线", font: "-apple-system, BlinkMacSystemFont, 'Segoe UI Variable Display', 'Segoe UI', Roboto, 'PingFang SC', sans-serif", sample: "15:50:10" },
  { id: "din", label: "经典几何", font: "'DIN Alternate', 'DIN Pro', 'Franklin Gothic Medium', Futura, sans-serif", sample: "15:50:10" },
  { id: "digital", label: "数码管等宽", font: "'Courier New', Courier, monospace", sample: "15:50:10" },
  { id: "impact", label: "硬派力量", font: "Impact, 'Arial Black', 'Trebuchet MS', sans-serif", sample: "15:50:10" },
  { id: "serif", label: "典雅衬线", font: "'Playfair Display', Georgia, 'Times New Roman', serif", sample: "15:50:10" },
  { id: "rounded", label: "圆润亲和", font: "'Quicksand', 'Comic Sans MS', 'Segoe UI', sans-serif", sample: "15:50:10" }
], Qn = [
  { id: "white", label: "纯净皓白 (默认)", hex: "#ffffff" },
  { id: "black", label: "曜石极黑", hex: "#0f172a" },
  { id: "gold", label: "香槟金砂", hex: "#f59e0b" },
  { id: "cyan", label: "科技青蓝", hex: "#38bdf8" },
  { id: "emerald", label: "翡翠竹绿", hex: "#10b981" },
  { id: "rose", label: "淡雅樱粉", hex: "#fb7185" }
], Qg = [
  { id: "local", label: "📍 本地系统时区", offset: "Local" },
  { id: "Asia/Shanghai", label: "🇨🇳 北京 / 香港", offset: "UTC+8" },
  { id: "Asia/Tokyo", label: "🇯🇵 东京 / 首尔", offset: "UTC+9" },
  { id: "Europe/London", label: "🇬🇧 伦敦 / 格林威治", offset: "UTC+0/+1" },
  { id: "Europe/Paris", label: "🇫🇷 巴黎 / 柏林", offset: "UTC+1/+2" },
  { id: "America/New_York", label: "🇺🇸 纽约 / 东部时间", offset: "UTC-5/-4" },
  { id: "America/Los_Angeles", label: "🇺🇸 洛杉矶 / 西部时间", offset: "UTC-8/-7" },
  { id: "Australia/Sydney", label: "🇦🇺 悉尼", offset: "UTC+10/+11" },
  { id: "UTC", label: "🌐 协调世界时 (UTC)", offset: "UTC" }
], be = ke({
  mounted: !1,
  isOpen: !1,
  x: 200,
  y: 200,
  font: "mono",
  color: "white",
  timezone: "local"
});
let hn = null;
const Mt = {
  state: be,
  setMounted(e) {
    be.mounted = e;
  },
  onAction(e) {
    hn = e;
  },
  dispatch(e, t) {
    if (hn)
      return hn(e, t);
  },
  open(e) {
    const i = typeof window < "u" ? window.innerWidth : 1280, a = typeof window < "u" ? window.innerHeight : 800, l = e?.clientX ?? e?.x ?? i / 2, h = e?.clientY ?? e?.y ?? a / 2, f = Math.max(12, Math.min(l - 40, i - 290 - 12)), p = Math.max(12, Math.min(h + 10, a - 420 - 12));
    be.x = f, be.y = p, be.isOpen = !0, this.dispatch("open", { x: f, y: p });
  },
  close() {
    be.isOpen = !1, this.dispatch("close");
  },
  setFont(e) {
    be.font = e;
    const t = Jn.find((o) => o.id === e);
    if (t) {
      Vt.applyConfig({ fontFamily: t.font });
      try {
        localStorage.setItem("lw_clock_font", e);
      } catch {
      }
    }
    this.dispatch("change", { font: e, color: be.color, timezone: be.timezone });
  },
  setColor(e) {
    be.color = e;
    const t = Qn.find((o) => o.id === e);
    if (t) {
      Vt.applyConfig({
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
    this.dispatch("change", { font: be.font, color: e, timezone: be.timezone });
  },
  setTimezone(e) {
    be.timezone = e;
    try {
      localStorage.setItem("lw_clock_tz", e);
    } catch {
    }
    this.dispatch("change", { font: be.font, color: be.color, timezone: e });
  },
  initPreferences() {
    try {
      const e = localStorage.getItem("lw_clock_font");
      if (e) {
        be.font = e;
        const i = Jn.find((a) => a.id === e);
        i && Vt.applyConfig({ fontFamily: i.font });
      }
      const t = localStorage.getItem("lw_clock_color");
      if (t) {
        be.color = t;
        const i = Qn.find((a) => a.id === t);
        i && Vt.applyConfig({ colorHex: i.hex, greetColor: i.hex, dateColor: i.hex, isCustomColor: !0 });
      }
      const o = localStorage.getItem("lw_clock_tz");
      o && (be.timezone = o);
    } catch {
    }
  },
  syncConfig(e) {
    e.font && (be.font = e.font), e.color && (be.color = e.color), e.timezone && (be.timezone = e.timezone);
  }
}, de = ke({
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
let mn = null, Ho = !1;
async function jo(e, t = {}) {
  if (e === "poll") return { state: "ready", model: de.model };
  if (e === "connect") return { state: "ready", model: de.model };
  throw new Error("旧版 AI 对话桥接已退役，请使用「海狸聊天室」开启智能会话。");
}
function Oi(e) {
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
  o || (e.state === "connecting" ? o = "正在连接本机 Codex 与 ChatGPT…" : e.state === "disconnected" ? o = "已待命（打开面板自动连接）" : e.authenticated ? o = `就绪 · ChatGPT ${e.plan || "已登录"}` : e.state === "ready" ? o = "就绪 · 尚未登录 ChatGPT" : o = t[e.state] || e.state), de.statusText = o, de.authHidden = !e.loginUrl, de.authCode = e.loginCode || "", de.authLink = e.loginUrl || "https://auth.openai.com/codex/device", de.isStreaming = Ho || e.busy || e.state === "running";
}
async function _a() {
  try {
    const e = await jo("poll");
    Oi(e);
  } catch {
  }
}
async function Ca(e, t) {
  if (e === "open" || e === "connect")
    try {
      de.statusText = "正在连接本机 Codex 与 ChatGPT…";
      const o = await jo("connect");
      Oi(o);
    } catch (o) {
      de.statusText = o?.message || "连接失败";
    }
  else if (e === "send" && t?.text) {
    const o = t.text;
    de.messages.push({
      id: `msg-${Date.now()}`,
      role: "user",
      content: o
    }), de.inputText = "", de.isStreaming = !0, Ho = !0;
    try {
      await jo("send", { text: o }), await _a();
    } catch (i) {
      de.statusText = i?.message || "发送失败";
    } finally {
      Ho = !1, de.isStreaming = !1;
    }
  } else if (e === "stop") {
    try {
      await jo("stop");
    } catch {
    }
    de.isStreaming = !1, Ho = !1;
  }
}
const Fn = {
  state: de,
  setMounted(e) {
    de.mounted = e;
  },
  onAction(e) {
    mn = e;
  },
  dispatch(e, t) {
    if (mn)
      return mn(e, t);
    Ca(e, t);
  },
  open() {
    de.isOpen = !0, this.dispatch("open");
  },
  close() {
    de.isOpen = !1, this.dispatch("close");
  },
  newChat() {
    de.messages = [], de.inputText = "", de.kwShelfHidden = !0, de.keywords = [], this.dispatch("newChat");
  },
  send() {
    const e = de.inputText.trim();
    !e || de.isStreaming || this.dispatch("send", { text: e });
  },
  stop() {
    de.isStreaming = !1, this.dispatch("stop");
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
    de.keywords.forEach((t) => t.selected = e), this.dispatch("selectAllKeywords", { all: e });
  },
  toggleKeyword(e) {
    de.keywords[e] && (de.keywords[e].selected = !de.keywords[e].selected, this.dispatch("toggleKeyword", { index: e, selected: de.keywords[e].selected }));
  },
  deepDiveKeywords() {
    const e = de.keywords.filter((t) => t.selected).map((t) => t.text);
    this.dispatch("deepDiveKeywords", { selected: e });
  }
}, vn = ke({
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
}), Ao = /* @__PURE__ */ new Set(), xa = {
  state: vn,
  open(e) {
    Object.assign(vn, e, { open: !0 });
  },
  update(e) {
    Object.assign(vn, e);
  },
  close() {
    Ao.forEach((e) => e("close"));
  },
  save(e) {
    Ao.forEach((t) => t("save", e));
  },
  onAction(e) {
    return Ao.add(e), () => Ao.delete(e);
  }
}, Ko = ke({ isOpen: !1 }), Bi = {
  state: Ko,
  open() {
    Ko.isOpen = !0;
  },
  close() {
    Ko.isOpen = !1;
  }
}, yn = "biliProfileCacheV1", st = "biliLocallyKnownMessageIdsV1", Po = "biliMessageUserCacheV1", lo = "githubKnownReleaseVersionsV1", Eo = "customNewtabAvatar", Zn = "biliToastKnownCountsV1";
class $a {
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
    !t?.repository || !t?.version || (this.githubKnownVersions[t.repository] = t.version, typeof chrome < "u" && chrome?.storage?.local && await chrome.storage.local.set({ [lo]: this.githubKnownVersions }), this.notifyGitHubListeners());
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
    return ["reply", "at", "like", "system", "private"].forEach((a) => {
      const l = Math.max(0, Number(this.unread?.[a] || 0));
      let h = Array.isArray(this.locallyKnownIds?.[a]) ? this.locallyKnownIds[a] : [];
      l < h.length && (h = [], this.locallyKnownIds[a] = [], o = !0), t[a] = Math.max(0, l - h.length);
    }), o && typeof chrome < "u" && chrome?.storage?.local && chrome.storage.local.set({ [st]: this.locallyKnownIds }).catch(() => {
    }), t;
  }
  markKnown(t, o, i) {
    this.locallyKnownIds[t] || (this.locallyKnownIds[t] = []);
    let a = !1;
    o && !this.locallyKnownIds[t].includes(o) && (this.locallyKnownIds[t].push(o), a = !0), i && !this.locallyKnownIds[t].includes(i) && (this.locallyKnownIds[t].push(i), a = !0), a && typeof chrome < "u" && chrome?.storage?.local && chrome.storage.local.set({ [st]: this.locallyKnownIds }).catch(() => {
    }), this.applyBiliProfile(this.profile, this.unread);
  }
  markAllKnown(t, o = []) {
    this.locallyKnownIds[t] || (this.locallyKnownIds[t] = []);
    const i = new Set(this.locallyKnownIds[t]);
    for (const l of o) l && i.add(l);
    const a = Math.max(0, Number(this.unread?.[t] || 0));
    if (i.size < a) {
      const l = a - i.size;
      for (let h = 0; h < l; h++) i.add(`__pad_${Date.now()}_${h}`);
    }
    this.locallyKnownIds[t] = Array.from(i), typeof chrome < "u" && chrome?.storage?.local && chrome.storage.local.set({ [st]: this.locallyKnownIds }).catch(() => {
    }), this.applyBiliProfile(this.profile, this.unread);
  }
  applyBiliProfile(t, o = {}) {
    this.profile = t || null, this.unread = o || {};
    const a = this.customAvatar || String(t?.face || "assets/bilibili.svg").replace(/^http:/, "https:"), l = this.getVisibleUnread();
    if (jt.avatarUrl = a, jt.userName = t?.uname || "哔哩哔哩用户", jt.buttonTitle = "通知中心", rn.avatarUrl = a, rn.userName = t?.uname || "用户", rn.mid = t?.mid, typeof document < "u") {
      const h = document.getElementById("bili-profile-avatar");
      h && (h.src = a);
      const f = document.getElementById("bili-profile-button");
      f && (f.title = jt.buttonTitle);
    }
    St.updateState({
      userName: t?.uname || "哔哩哔哩用户",
      userMid: t?.mid ? String(t.mid) : "",
      userAvatar: a,
      unreadCounts: {
        reply: Number(l.reply || 0),
        at: Number(l.at || 0),
        like: Number(l.like || 0),
        system: Number(l.system || 0),
        private: Number(l.private || 0)
      }
    });
  }
  async refreshBiliProfile() {
    if (!this.isBiliRefreshing) {
      this.isBiliRefreshing = !0;
      try {
        const o = await (await fetch("https://api.bilibili.com/x/web-interface/nav", { credentials: "include" })).json();
        if (!o?.data?.isLogin) throw new Error("未登录");
        const i = {
          mid: o.data.mid,
          uname: o.data.uname,
          face: o.data.face
        }, [a, l, h] = await Promise.allSettled([
          fetch("https://api.bilibili.com/x/msgfeed/unread?build=0&mobi_app=web", { credentials: "include" }).then((u) => u.json()),
          fetch("https://api.vc.bilibili.com/x/im/web/msgfeed/unread", { credentials: "include" }).then((u) => u.json()),
          fetch("https://api.vc.bilibili.com/session_svr/v1/session_svr/single_unread", { credentials: "include" }).then((u) => u.json())
        ]), f = a.status === "fulfilled" ? a.value?.data || {} : {}, p = l.status === "fulfilled" ? l.value?.data || {} : {}, w = h.status === "fulfilled" ? h.value?.data || {} : {}, k = Number(p.at || 0), M = p.reply != null ? Number(p.reply || 0) : Math.max(0, Number(p.recv_reply || 0) - k), g = {
          reply: Math.max(Number(f.reply || 0), M),
          at: Math.max(Number(f.at || 0), k),
          like: Math.max(
            Number(f.like || f.praise || 0),
            Number(p.like || p.recv_like || 0)
          ),
          system: Math.max(Number(f.sys_msg || f.system || 0), Number(p.sys_msg || 0)),
          private: Number(
            f.chat || p.chat || Number(w.follow_unread || 0) + Number(w.unfollow_unread || 0) + Number(w.dustbin_push_msg || 0)
          )
        };
        this.applyBiliProfile(i, g), typeof chrome < "u" && chrome?.storage?.local && await chrome.storage.local.set({ [yn]: { profile: i, unread: g, savedAt: Date.now() } }), this.checkAndNotifyBiliInteractions(g);
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
      this.biliToastKnownCounts = { ...o }, typeof chrome < "u" && chrome?.storage?.local && chrome.storage.local.set({ [Zn]: this.biliToastKnownCounts }).catch(() => {
      });
      return;
    }
    const i = o.private - Number(this.biliToastKnownCounts.private || 0);
    o.like - Number(this.biliToastKnownCounts.like || 0);
    const a = o.reply - Number(this.biliToastKnownCounts.reply || 0), l = o.at - Number(this.biliToastKnownCounts.at || 0);
    o.system - Number(this.biliToastKnownCounts.system || 0), this.biliToastKnownCounts = { ...o }, typeof chrome < "u" && chrome?.storage?.local && chrome.storage.local.set({ [Zn]: this.biliToastKnownCounts }).catch(() => {
    }), i > 0 && Ae.show({
      appType: "bili",
      appName: "哔哩哔哩",
      icon: "assets/bilibili.svg",
      title: i > 1 ? `收到 ${i} 条新私信` : "收到新的私信",
      subtitle: "B站私信消息",
      message: "有人给你发送了私信，点击查看对话",
      actionLabel: "查看私信",
      showActions: !0,
      onClick: () => {
        St.openPanel();
      }
    }), a > 0 && Ae.show({
      appType: "bili",
      appName: "哔哩哔哩",
      icon: "assets/bilibili.svg",
      title: a > 1 ? `收到 ${a} 条新回复` : "收到新的评论回复",
      subtitle: "评论回复通知",
      message: "有人在评论区回复了你",
      actionLabel: "查看回复",
      showActions: !0,
      onClick: () => {
        St.openPanel();
      }
    }), l > 0 && Ae.show({
      appType: "bili",
      appName: "哔哩哔哩",
      icon: "assets/bilibili.svg",
      title: l > 1 ? `收到 ${l} 次新提及` : "有人 @了你",
      subtitle: "提到我的通知",
      message: "有人在动态或评论中 @了你",
      actionLabel: "查看提及",
      showActions: !0,
      onClick: () => {
        St.openPanel();
      }
    });
  }
  init() {
    this.initialized || (this.initialized = !0, To.setActions({
      onAction: async (t) => {
        if (t === "messages")
          At.open();
        else if (t === "tabs")
          Bi.open();
        else if (t === "refresh")
          await this.refreshBiliProfile();
        else if (t === "switch")
          typeof chrome < "u" && chrome?.tabs?.create ? chrome.tabs.create({ url: "https://passport.bilibili.com/login?gourl=https%3A%2F%2Fwww.bilibili.com%2F", active: !0 }) : window.open("https://passport.bilibili.com/login?gourl=https%3A%2F%2Fwww.bilibili.com%2F", "_blank");
        else if (t === "web") {
          const o = this.profile?.mid, i = o ? `https://space.bilibili.com/${o}` : "https://www.bilibili.com/";
          typeof chrome < "u" && chrome?.tabs?.create ? chrome.tabs.create({ url: i, active: !0 }) : window.open(i, "_blank");
        }
      }
    }), typeof chrome < "u" && chrome?.storage?.local && (chrome.storage.local.get([
      yn,
      st,
      Po,
      lo,
      Eo
    ]).then((t) => {
      this.customAvatar = t[Eo] || "", this.locallyKnownIds = t[st] && typeof t[st] == "object" ? t[st] : {}, this.userCache = t[Po] && typeof t[Po] == "object" ? t[Po] : {}, this.githubKnownVersions = t[lo] && typeof t[lo] == "object" ? t[lo] : {};
      const o = t[yn];
      o?.profile ? this.applyBiliProfile(o.profile, o.unread || {}) : this.applyBiliProfile(null, {});
    }).catch(() => {
    }), chrome.storage.onChanged && chrome.storage.onChanged.addListener((t, o) => {
      o === "local" && (t[Eo] && (this.customAvatar = t[Eo].newValue || "", this.applyBiliProfile(this.profile, this.unread)), t[st] && (this.locallyKnownIds = t[st].newValue || {}, this.applyBiliProfile(this.profile, this.unread)));
    })), St.onAction((t, o) => {
      t === "mark-known" ? this.markKnown(o.kind, o.id, o.talkerId) : t === "mark-all-known" && this.markAllKnown(o.kind, o.ids);
    }), this.refreshBiliProfile(), setTimeout(() => {
      this.loadGitHubUpdates();
    }, 3500));
  }
}
const ei = new $a(), ue = ke({ open: !1, loading: !1, error: "", mid: "", name: "", face: "", sign: "", followed: !1, submitting: !1, left: 12, top: 12, videos: [] });
let Wo = null;
const zo = {
  state: ue,
  open(e, t) {
    Wo = t, Object.assign(ue, { open: !0, loading: !0, error: "", submitting: !1, videos: [] }, e);
  },
  update(e) {
    Object.assign(ue, e);
  },
  close() {
    ue.submitting || (ue.open = !1, Wo = null);
  },
  async toggleFollow() {
    if (!(!Wo || ue.submitting)) {
      ue.submitting = !0;
      try {
        const e = !ue.followed;
        await Wo(e) && (ue.followed = e);
      } finally {
        ue.submitting = !1;
      }
    }
  }
}, ye = ke({
  currentTab: "stars",
  rangeText: "近 7 天",
  sinceDays: 7,
  repos: [],
  isLoading: !1,
  errorMessage: "",
  sourceText: "",
  fetchedAt: 0,
  hasLoaded: !1
}), wn = /* @__PURE__ */ new Set();
let bt;
const co = new ia();
let ti = !1;
async function La(e, t) {
  if (t.throwIfAborted(), new URL(e).origin !== "https://ghapi.h11.dev") throw new Error("Unexpected public source");
  const o = new AbortController(), i = () => o.abort();
  t.addEventListener("abort", i, { once: !0 });
  const a = setTimeout(i, 15e3);
  try {
    const l = await fetch(e, {
      signal: o.signal,
      credentials: "omit",
      redirect: "error",
      referrerPolicy: "no-referrer",
      cache: "no-store",
      headers: { Accept: "application/json" }
    });
    if (!l.ok)
      throw l.body?.cancel().catch(() => {
      }), new Error("Source unavailable");
    if (!l.body) throw new Error("Empty public source");
    const h = l.body.getReader(), f = new TextDecoder("utf-8", { fatal: !0 });
    let p = 0, w = "";
    try {
      for (; ; ) {
        o.signal.throwIfAborted();
        const k = await h.read();
        if (k.done) break;
        if (p += k.value.byteLength, p > 2 * 1024 * 1024) throw new Error("Public source exceeds limit");
        w += f.decode(k.value, { stream: !0 });
      }
      return o.signal.throwIfAborted(), JSON.parse(w + f.decode());
    } finally {
      h.cancel().catch(() => {
      }), h.releaseLock();
    }
  } finally {
    clearTimeout(a), t.removeEventListener("abort", i);
  }
}
function oi(e, t) {
  const o = e?.name || e?.repository, i = t ? e?.full_name || (typeof o == "string" && o.includes("/") ? o : e?.author && o ? `${e.author}/${o}` : "") : e?.full_name;
  if (typeof i != "string" || !/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(i) || i.split("/").some((f) => f === "." || f === "..")) throw new Error("Invalid repository");
  const [a, l] = i.split("/"), h = (f) => typeof f == "number" && Number.isFinite(f) && f >= 0 ? f : void 0;
  return {
    name: l,
    full_name: i,
    owner: { login: a },
    description: typeof e.description == "string" ? e.description : "",
    language: typeof e.language == "string" ? e.language : "",
    stargazers_count: h(t ? e.stars ?? e.stargazers_count : e.stargazers_count),
    forks_count: h(t ? e.forks ?? e.forks_count : e.forks_count),
    html_url: `https://github.com/${encodeURIComponent(a)}/${encodeURIComponent(l)}`
  };
}
async function Ta(e, t) {
  const o = new Date(Date.now() - e * 864e5).toISOString().slice(0, 10);
  let i = "";
  try {
    const h = await Ts(t), { data: f } = await Ss(`/search/repositories?q=${encodeURIComponent(`is:public created:>${o}`)}&sort=stars&order=desc&per_page=30`, { headers: h, signal: t, maxBytes: 2 * 1024 * 1024 });
    if (t.throwIfAborted(), !Array.isArray(f?.items)) throw new Error("Invalid search response");
    return {
      repos: f.items.slice(0, 30).map((p) => oi(p, !1)),
      sourceText: `GitHub Search：UTC 日期 ${o} 之后新建的仓库，按累计 Star 排序；不是官方 Trending 榜。${f.incomplete_results ? " API 标记为不完整结果。" : ""}`
    };
  } catch (h) {
    t.throwIfAborted(), i = h instanceof Ms ? h.message : "主源响应格式无效。";
  }
  const a = e === 1 ? "daily" : e === 7 ? "weekly" : "monthly", l = await La(`https://ghapi.h11.dev/repositories?since=${a}`, t);
  if (t.throwIfAborted(), !Array.isArray(l)) throw new Error("Invalid fallback response");
  return {
    repos: l.slice(0, 30).map((h) => oi(h, !0)),
    sourceText: `GitHub Search 不可用：${i} 改用第三方 ghapi.h11.dev 的 ${a} 趋势快照（不发送账号凭据）；口径与新建仓库搜索不同，源更新时间未提供。`
  };
}
const Ri = {
  get state() {
    return ye;
  },
  // Only a mounted, visible View may own network work. Returning keeps the
  // previous result/error; an interrupted request requires explicit refresh.
  attachView(e) {
    co.cancel(), ye.isLoading = !1, bt = e;
    const t = () => {
      bt === e && co.pending && (co.cancel(), ye.isLoading = !1, ye.errorMessage = "读取已暂停，返回后可点击刷新。");
    };
    return e.addEventListener("abort", t, { once: !0 }), !e.aborted && !ti && this.refresh(), () => {
      e.removeEventListener("abort", t), bt === e && (t(), bt = void 0);
    };
  },
  switchTab(e) {
    ye.currentTab = e, this.dispatch("switch-tab", e);
  },
  async switchRange(e, t) {
    !bt || bt.aborted || ![1, 7, 30].includes(e) || e === ye.sinceDays || (co.cancel(), Object.assign(ye, {
      sinceDays: e,
      rangeText: `近 ${e} 天`,
      repos: [],
      sourceText: "",
      fetchedAt: 0,
      hasLoaded: !1,
      errorMessage: "",
      isLoading: !1
    }), this.dispatch("switch-range", { days: e, text: ye.rangeText }), await this.refresh());
  },
  async refresh() {
    const e = bt;
    if (!e || e.aborted || ye.isLoading) return;
    const t = ye.sinceDays, o = co.begin({
      signal: e,
      timeoutMs: 45e3,
      isCurrent: () => bt === e && ye.sinceDays === t,
      onStop: (a) => {
        ye.isLoading = !1, a === "timeout" && (ye.errorMessage = "数据源读取超过整体45秒上限，请手动刷新；没有继续请求备用源。");
      }
    }), i = o.current;
    if (i()) {
      ti = !0, ye.isLoading = !0, ye.errorMessage = "";
      try {
        const a = await o.wait(() => Ta(t, o.signal));
        if (!i()) return;
        ye.repos = a.repos, ye.sourceText = a.sourceText, ye.fetchedAt = Date.now(), ye.hasLoaded = !0;
      } catch {
        i() && (ye.errorMessage = ye.hasLoaded ? "刷新失败，保留同一时间范围的上次读取结果；请检查网络或额度后手动刷新。" : "数据源读取失败或超时；未使用内置样例，请稍后手动刷新。");
      } finally {
        o.finish() && (ye.isLoading = !1, this.dispatch("refresh"));
      }
    }
  },
  selectRepo(e) {
    this.dispatch("select-repo", e);
  },
  onAction(e) {
    return wn.add(e), () => {
      wn.delete(e);
    };
  },
  dispatch(e, t) {
    for (const o of wn)
      try {
        o(e, t);
      } catch {
      }
  }
}, Mn = () => ({
  icon: "🧭",
  title: "快捷轮盘",
  desc: "移动鼠标选择",
  active: !1
}), Nn = () => ({
  visible: !1,
  wedgePath: "",
  arcPath: "",
  line1: { x1: 0, y1: 0, x2: 0, y2: 0 },
  line2: { x1: 0, y1: 0, x2: 0, y2: 0 }
}), q = ke({
  mounted: !1,
  isOpen: !1,
  isExpanded: !1,
  mode: "main",
  ballPosition: { x: 0, y: 0 },
  hub: Mn(),
  activeSectorId: null,
  sectors: [],
  beam: Nn()
});
let ni = null;
function Sa(e, t) {
  if (typeof e != "number" || !t)
    return Nn();
  const o = 160, i = 160, a = 26, l = 154, h = 360 / t, f = e - h / 2, p = e + h / 2, w = f * Math.PI / 180, k = p * Math.PI / 180, M = o + a * Math.cos(w), g = i + a * Math.sin(w), u = o + l * Math.cos(w), d = i + l * Math.sin(w), b = o + a * Math.cos(k), C = i + a * Math.sin(k), y = o + l * Math.cos(k), x = i + l * Math.sin(k), E = h > 180 ? 1 : 0, T = `M ${M.toFixed(1)} ${g.toFixed(1)} L ${u.toFixed(1)} ${d.toFixed(1)} A ${l} ${l} 0 ${E} 1 ${y.toFixed(1)} ${x.toFixed(1)} L ${b.toFixed(1)} ${C.toFixed(1)} A ${a} ${a} 0 ${E} 0 ${M.toFixed(1)} ${g.toFixed(1)} Z`, L = `M ${u.toFixed(1)} ${d.toFixed(1)} A ${l} ${l} 0 ${E} 1 ${y.toFixed(1)} ${x.toFixed(1)}`;
  return {
    visible: !0,
    wedgePath: T,
    arcPath: L,
    line1: {
      x1: parseFloat(M.toFixed(1)),
      y1: parseFloat(g.toFixed(1)),
      x2: parseFloat(u.toFixed(1)),
      y2: parseFloat(d.toFixed(1))
    },
    line2: {
      x1: parseFloat(b.toFixed(1)),
      y1: parseFloat(C.toFixed(1)),
      x2: parseFloat(y.toFixed(1)),
      y2: parseFloat(x.toFixed(1))
    }
  };
}
const we = {
  get state() {
    return q;
  },
  getSnapshot() {
    return Pt(q);
  },
  setMounted(e) {
    q.mounted = e;
  },
  setBallPosition(e, t) {
    q.ballPosition.x = e, q.ballPosition.y = t;
  },
  setVisibility(e) {
    q.isOpen = e;
  },
  setHub(e) {
    e ? q.hub = {
      icon: e.icon || "🧭",
      title: e.title || "快捷轮盘",
      desc: e.desc || "移动鼠标选择",
      active: !!e.active
    } : q.hub = Mn();
  },
  setBeam(e, t) {
    q.beam = Sa(e, t);
  },
  setActiveSector(e) {
    q.activeSectorId = e;
  },
  setSectors(e) {
    q.sectors = [...e];
  },
  expand(e, t, o = "main") {
    q.isOpen = !0, q.isExpanded = !0, q.mode = o, typeof e == "number" && typeof t == "number" && this.setBallPosition(e, t);
  },
  collapse() {
    q.isExpanded = !1, q.mode = "main", q.activeSectorId = null, q.beam = Nn(), q.hub = Mn();
  },
  setWheelMode(e) {
    q.mode = e;
  },
  setActionHandler(e) {
    ni = e;
  },
  dispatch(e, t) {
    ni?.(e, t);
  }
}, Fi = [
  { id: "daily-bilibili", title: "b站插件", desc: "B站收藏夹与追番视频", icon: "assets/bilibili.svg" },
  { id: "daily-pricing", title: "模型插件", desc: "AI 模型定价与排行榜", icon: "assets/nav-pricing.svg" },
  { id: "daily-aihot", title: "ai hot插件", desc: "全网 AI 与前沿科技资讯", icon: "assets/nav-aihot.svg" },
  { id: "folder", title: "常用网站", desc: "点击展开快捷网站子轮盘", icon: "assets/nav-folder.svg", mode: "shortcuts" },
  { id: "card-github", title: "github插件", desc: "GitHub 趋势与星标项目", icon: "assets/nav-github.svg" },
  { id: "launcher", title: "首页", desc: "返回主屏常用应用台", icon: "assets/nav-home.svg" }
];
function Ma() {
  return Fi.filter((e) => e.mode || e.id === "launcher" || Xo(e.id));
}
function Ia() {
  return zs.filter((e) => e.kind === "module" && Xo(e.id)).map((e) => ({
    id: e.id,
    title: e.title,
    desc: e.isDev ? "已启用的实验性组件" : e.categoryLabel,
    icon: e.icon || e.emoji || "🧩",
    tool: e.id
  }));
}
function ii() {
  q.isExpanded && Lo();
}
let In = [], Co = Fi, rt = { x: 400, y: 300 }, yo = !1, uo = !1, po = null;
function Oo() {
  return globalThis.chrome?.storage;
}
function Hn(e, t) {
  const o = q.isExpanded ? 160 : 24;
  we.setBallPosition(
    Math.max(o + 8, Math.min(window.innerWidth - o - 8, e)),
    Math.max(o + 8, Math.min(window.innerHeight - o - 8, t))
  );
}
function Lo() {
  const e = q.mode;
  Co = e === "tools" ? Ia() : e === "shortcuts" ? [
    ...In.length ? In : [{ id: "shortcut-empty", title: "暂无快捷项", desc: "常用网站可放入快捷轮盘", icon: "📭" }],
    { id: "back-to-main", title: "返回主轮盘", desc: "返回页面电梯导航", icon: "🔙", mode: "main" }
  ] : Ma();
  const t = Co.length, o = t > 12 ? 118 : t > 9 ? 114 : 110, i = t > 12 ? 46 : t > 9 ? 50 : 56;
  we.setSectors(Co.map((a, l) => {
    const h = -90 + 360 / t * l, f = h * Math.PI / 180;
    return {
      id: a.id,
      title: a.title,
      desc: a.desc,
      icon: a.icon,
      angleDeg: h,
      x: Math.round(160 + Math.cos(f) * o),
      y: Math.round(160 + Math.sin(f) * o),
      size: i,
      isShortcut: !!a.url
    };
  })), we.setWheelMode(e), we.setActiveSector(null), we.setBeam(null, 0), we.setHub(e === "shortcuts" ? { icon: "🔙", title: "快捷方式" } : e === "tools" ? { icon: "🧰", title: "常用工具" } : null);
}
function Qo(e) {
  q.mode = e, Lo();
}
function It() {
  we.collapse(), Hn(q.ballPosition.x, q.ballPosition.y), we.setVisibility(yo);
}
function Ht(e = q.ballPosition.x, t = q.ballPosition.y, o = "main") {
  we.expand(void 0, void 0, o), Hn(e, t), Lo(), we.setVisibility(!0);
}
function Da(e) {
  if (!(e.tool && !Xo(e.tool) || !e.url && !e.mode && e.id !== "launcher" && !Xo(e.id))) {
    if (e.mode) {
      Qo(e.mode);
      return;
    }
    if (It(), e.url) {
      window.open(e.url, "_blank");
      return;
    }
    if (e.tool) {
      window.triggerToolShortcut?.(e.tool);
      return;
    }
    e.id === "launcher" ? (typeof window < "u" && window.scrollTo({ top: 0, left: 0, behavior: "instant" }), gt.exit(), document.body && (document.body.dataset.page = "home")) : gt.enter(e.id);
  }
}
function si(e) {
  rt = { x: e.clientX, y: e.clientY };
}
function ai(e) {
  e.button === 1 && (e.preventDefault(), e.stopPropagation(), rt = { x: e.clientX, y: e.clientY }, q.isExpanded ? It() : Ht(e.clientX, e.clientY));
}
function ri(e) {
  e.button === 1 && e.preventDefault();
}
function li(e) {
  !q.isExpanded || On.active || (e.key === "Escape" || e.altKey && e.key.toLowerCase() === "w") && (e.preventDefault(), e.stopPropagation(), q.mode === "shortcuts" ? Qo("main") : It());
}
function Aa(e) {
  try {
    const t = globalThis.chrome;
    if (typeof t?.runtime?.getURL == "function")
      return t.runtime.getURL("_favicon/?pageUrl=" + encodeURIComponent(e) + "&size=64");
  } catch {
  }
  return "";
}
function Pa(e) {
  const t = e.customIcon || e.icon;
  if (t && typeof t == "string" && !/google\.com\/s2\/favicons|icons\.duckduckgo/i.test(t))
    return t;
  if (e.url) {
    const o = oe.getCachedIcon(e.url);
    if (o) return o;
    const i = Aa(e.url);
    if (i) return i;
  }
  return e.icon || "🔗";
}
const dt = {
  async start() {
    if (!uo) {
      uo = !0, rt = { x: Math.round(window.innerWidth / 2), y: Math.round(window.innerHeight / 2) }, we.setActionHandler((e, t) => {
        if (e === "hub:click")
          q.isExpanded ? q.mode === "shortcuts" ? Qo("main") : It() : Ht();
        else if (e === "sector:click" || e === "container:click") {
          const o = Co.find((i) => i.id === t?.id || e === "container:click" && i.id === q.activeSectorId);
          o && Da(o);
        } else if (e === "sector:hover") {
          const o = q.sectors.find((i) => i.id === t?.id);
          o && (we.setHub({ icon: o.icon, title: o.title, desc: o.desc, active: !0 }), we.setActiveSector(o.id), we.setBeam(o.angleDeg, Co.length));
        } else e === "sector:leave" && (we.setActiveSector(null), we.setBeam(null, 0), we.setHub(q.mode === "shortcuts" ? { icon: "🔙", title: "快捷方式" } : q.mode === "tools" ? { icon: "🧰", title: "常用工具" } : null));
      }), window.addEventListener("logicweaver:dock-modules-changed", ii), window.addEventListener("pointermove", si, { passive: !0 }), window.addEventListener("mousedown", ai, !0), window.addEventListener("auxclick", ri, !0), window.addEventListener("keydown", li, !0), po = (e, t) => {
        t === "local" && (e.showNavBall && (yo = !!e.showNavBall.newValue, we.setVisibility(yo || q.isExpanded)), (e.siteShelfLinks || e.logicweaverNavWheelShortcutsV1) && this.loadShortcuts());
      }, Oo()?.onChanged?.addListener(po);
      try {
        const e = await Oo()?.local?.get(["showNavBall", "navBallPosition"]);
        if (!uo) return;
        yo = !!e?.showNavBall;
        const t = e?.navBallPosition;
        Hn(
          typeof t?.x == "number" ? t.x : 28,
          typeof t?.y == "number" ? t.y : Math.min(window.innerHeight - 60, 180)
        ), we.setVisibility(yo);
      } catch {
      }
      await this.loadShortcuts(), Lo();
    }
  },
  stop() {
    uo = !1, we.setActionHandler(null), window.removeEventListener("logicweaver:dock-modules-changed", ii), window.removeEventListener("pointermove", si), window.removeEventListener("mousedown", ai, !0), window.removeEventListener("auxclick", ri, !0), window.removeEventListener("keydown", li, !0), po && Oo()?.onChanged?.removeListener(po), po = null;
  },
  async loadShortcuts() {
    try {
      const e = await Oo()?.local?.get(["siteShelfLinks", "logicweaverNavWheelShortcutsV1"]);
      if (!uo) return;
      const t = e?.siteShelfLinks?.length ? e.siteShelfLinks : e?.logicweaverNavWheelShortcutsV1;
      In = (Array.isArray(t) ? t : []).map((o, i) => ({
        id: String(o.id || `wheel-${i}`),
        title: String(o.title || o.url || "快捷网站"),
        desc: String(o.url || ""),
        url: String(o.url || ""),
        icon: Pa(o)
      })), q.mode === "shortcuts" && Lo();
    } catch (e) {
      console.warn("[NavWheel] 读取快捷方式失败", e);
    }
  },
  open(e, t) {
    Ht(e ?? rt.x, t ?? rt.y);
  },
  close: It,
  toggle(e = !1) {
    q.isExpanded ? It() : e ? Ht(rt.x, rt.y) : Ht();
  },
  toggleTools(e = !0) {
    q.isExpanded && q.mode === "tools" ? It() : Ht(
      e ? rt.x : q.ballPosition.x,
      e ? rt.y : q.ballPosition.y,
      "tools"
    );
  },
  setMode(e) {
    Qo(e);
  }
};
class Yt {
  constructor() {
    this.activeShortcuts = { ...ln }, this.isListenerBound = !1, this.storageListenerBound = !1, this.shortcutReadVersion = 0, this.initShortcuts();
  }
  static getInstance() {
    return Yt.instance || (Yt.instance = new Yt()), Yt.instance;
  }
  getShortcuts() {
    return { ...this.activeShortcuts };
  }
  async setShortcut(t, o) {
    if (typeof t != "string" || !t || typeof o != "string")
      throw new Error("快捷键参数无效，未保存");
    if (typeof chrome > "u" || !chrome.storage?.local)
      throw new Error("快捷键存储不可用，未保存");
    const { optionsService: i, SHORTCUT_STORAGE_KEY: a } = await import("./options.service-Dkt-RYiQ.js").then((k) => k.h), h = (await chrome.storage.local.get(a))[a], f = { ...h || {}, [t]: o }, p = this.shortcutReadVersion, w = await i.saveSettings(
      { [a]: f },
      { [a]: h }
    );
    p === this.shortcutReadVersion && (++this.shortcutReadVersion, this.applyShortcutOverrides(w[a]));
  }
  applyShortcutOverrides(t) {
    const o = t && typeof t == "object" && !Array.isArray(t) ? Object.entries(t).filter((i) => Object.prototype.hasOwnProperty.call(ln, i[0]) && typeof i[1] == "string") : [];
    this.activeShortcuts = { ...ln, ...Object.fromEntries(o) };
  }
  async initShortcuts() {
    if (!(typeof chrome > "u" || !chrome.storage?.local))
      try {
        !this.storageListenerBound && chrome.storage?.onChanged?.addListener && (chrome.storage.onChanged.addListener((i, a) => {
          a === "local" && Object.prototype.hasOwnProperty.call(i, "customShortcuts") && (++this.shortcutReadVersion, this.applyShortcutOverrides(i.customShortcuts.newValue));
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
    if (!t || !Vn(t)) return !1;
    if (Ve(t))
      return $e.handleToolClick(t), !0;
    switch (t) {
      case "bookmarks":
        return en.toggle(), !0;
      case "settings":
        return on.open(), !0;
      case "nav-wheel":
        return dt.toggle(!0), !0;
      case "toolbox":
        return dt.toggleTools(!0), !0;
      case "pricing":
        return gt.enter("daily-pricing"), !0;
      case "search": {
        if (typeof document < "u") {
          const o = document.getElementById("search-input");
          if (o)
            return o.focus(), o.select(), !0;
        }
        return !1;
      }
      case "todoist-new-task":
        return typeof window < "u" && typeof window.triggerTodoistQuickAdd == "function" ? window.triggerTodoistQuickAdd() : $e.handleToolClick("todoist"), !0;
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
        if (On.active || t.defaultPrevented || t.isComposing || t.repeat) return;
        if (gt.activeId && t.altKey && t.key.toLowerCase() === "w") {
          t.preventDefault(), t.stopPropagation(), gt.exit();
          return;
        }
        if (t.target && (t.target.matches("input, textarea, select") || t.target.isContentEditable) && !t.altKey && !t.ctrlKey && !t.metaKey)
          return;
        const i = Us(t);
        if (!i) return;
        const a = i.toLowerCase();
        for (const [l, h] of Object.entries(this.activeShortcuts))
          if (!(!h || !Vn(l)) && h.toLowerCase().replace(/^cmd\+/, "meta+") === a) {
            t.preventDefault(), t.stopPropagation(), this.triggerToolShortcut(l);
            break;
          }
      },
      !0
    ));
  }
}
const Dn = Yt.getInstance();
class qt {
  constructor() {
    this._isVisible = H(typeof document < "u" ? !document.hidden : !0), this.callbacks = /* @__PURE__ */ new Set(), this.activeIntervals = /* @__PURE__ */ new Set(), typeof document < "u" && document.addEventListener("visibilitychange", () => {
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
        } catch (i) {
          console.warn("[PageVisibility] callback error:", i);
        }
    });
  }
  static getInstance() {
    return qt.instance || (qt.instance = new qt()), qt.instance;
  }
  get isVisible() {
    return Pt(this._isVisible);
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
    const i = {
      handler: t,
      intervalMs: o,
      timerId: null
    };
    return { start: () => {
      this.activeIntervals.add(i), this.isVisibleNow() && !i.timerId && (i.timerId = setInterval(i.handler, i.intervalMs));
    }, stop: () => {
      this.activeIntervals.delete(i), i.timerId && (clearInterval(i.timerId), i.timerId = null);
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
const Ea = qt.getInstance(), bn = () => window;
let $t = !1, fo, kn, go;
function ci(e) {
  return oe.getPageNames().filter((t) => t !== e).map((t) => ({ id: t, name: oe.getPageLabel(t) }));
}
function di() {
  if (!Ge.isOpen || !Ge.activeFolder) return;
  const e = oe.getState(), t = Ge.activeFolder;
  Ct.setLinks(e.links.filter((l) => (l.group || "常用网站") === t));
  const o = /* @__PURE__ */ new Map();
  for (const l of e.links) {
    const h = l.group || "常用网站";
    o.has(h) || o.set(h, []), o.get(h).push(l);
  }
  const i = new Map(Object.keys(e.folders).map((l) => [l, Yo(e.folders, l)])), a = /* @__PURE__ */ new Map();
  for (const l of i.values()) l && a.set(l, (a.get(l) || 0) + 1);
  Ct.setFolders([...i].filter(([, l]) => l === t).map(([l]) => ({
    groupName: l,
    links: o.get(l) || [],
    count: (o.get(l)?.length || 0) + (a.get(l) || 0)
  })), Yo(e.folders, t));
}
const An = {
  openEditor(e) {
    ko.openEditDialog(e || {});
  },
  openFolder(e = Ge.activeFolder) {
    if (!e) return;
    const o = oe.getState().links.filter((i) => (i.group || "常用网站") === e);
    Ct.openFolder(e, o), di();
  },
  openLinkMenu(e, t) {
    t?.preventDefault?.(), Qt.openLinkMenu(e, ci(e.page || "常用网站"), t?.clientX || 0, t?.clientY || 0);
  },
  openFolderMenu(e, t, o) {
    t?.preventDefault?.();
    const i = oe.getState(), a = o || i.activePage;
    Qt.openFolderMenu(
      e,
      oe.getGroupSize(e) === "small" ? "扩大为大收藏夹" : "缩小为小收藏夹",
      ci(a),
      t?.clientX || 0,
      t?.clientY || 0
    );
  },
  openPageMenu(e, t) {
    t?.preventDefault?.(), Qt.openPageMenu(
      e,
      oe.getPageLabel(e),
      oe.getPageNames().length > 1,
      t?.clientX || 0,
      t?.clientY || 0
    );
  },
  openIconPicker(e) {
    if (!e) return;
    const t = e.title || oe.hostOf(e.url);
    ko.openIconPicker(e.title || "网站", t, e.url, String(e.id)), ko.searchIcons(t);
  },
  render() {
    const e = oe.getState(), t = oe.getPageNames();
    xe.update({
      ...e,
      pages: t,
      activePage: t.includes(e.activePage) ? e.activePage : t[0]
    }), di();
  },
  start() {
    $t || ($t = !0, xe.setActions({
      openFolder: (e) => this.openFolder(e),
      deleteFolder: Os,
      openLinkMenu: (e, t) => this.openLinkMenu(e, t),
      openFolderMenu: (e, t, o) => this.openFolderMenu(e, o, t),
      openPageMenu: (e, t) => this.openPageMenu(e, t)
    }), Ct.setActionHandler((e, t) => {
      e === "close" ? Ct.closeFolder() : e === "folder:open" && typeof t == "string" ? this.openFolder(t) : e === "link:contextmenu" && t?.link && this.openLinkMenu(t.link, t);
    }), kn = oe.subscribe(() => {
      this.render();
    }), go = (e, t) => {
      if (t !== "local") return;
      const o = {
        quickLinks: "links",
        quickLinkGroupSizes: "groupSizes",
        launcherFolders: "folders",
        launcherPages: "pages",
        launcherPageLabels: "pageLabels",
        launcherActivePage: "activePage"
      }, i = {};
      for (const [a, l] of Object.entries(o)) {
        if (!(a in e)) continue;
        const h = e[a].newValue;
        i[l] = l === "links" ? Array.isArray(h) ? h : [] : l === "pages" ? Array.isArray(h) && h.length ? h : ["常用网站"] : l === "activePage" ? h || "常用网站" : h || {};
      }
      Object.keys(i).length && (oe.updateState(i), this.render());
    }, bn().chrome?.storage?.onChanged?.addListener(go));
  },
  init() {
    return this.start(), fo || (fo = (async () => {
      await oe.ready;
      const e = bn().chrome;
      if (!$t) return;
      const t = await e?.storage?.local?.get("quickLinksReady") || {};
      if ($t) {
        if (!oe.getState().links.length && !t.quickLinksReady && e?.topSites) {
          const o = await new Promise((i) => e.topSites.get((a) => i(a || [])));
          if (!$t) return;
          oe.getState().links.length || (oe.updateState({ links: o.slice(0, 14).map((i) => ({
            id: crypto.randomUUID(),
            title: i.title || oe.hostOf(i.url),
            url: i.url,
            group: "常用网站"
          })) }), await oe.save());
        }
        $t && this.render();
      }
    })().catch((e) => {
      throw fo = void 0, e;
    }), fo);
  },
  stop() {
    $t = !1, kn?.(), kn = void 0, go && bn().chrome?.storage?.onChanged?.removeListener(go), go = void 0, Ct.setActionHandler(null), xe.setActions({
      openFolder: void 0,
      deleteFolder: void 0,
      openLinkMenu: void 0,
      openFolderMenu: void 0,
      openPageMenu: void 0
    });
  }
}, ui = [
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
function Bo(e) {
  return e === 0 ? { emoji: "☀️", label: "晴" } : e <= 2 ? { emoji: "🌤️", label: "少云" } : e === 3 ? { emoji: "☁️", label: "多云" } : e === 45 || e === 48 ? { emoji: "🌫️", label: "雾" } : e >= 51 && e <= 57 ? { emoji: "🌦️", label: "毛毛雨" } : e >= 61 && e <= 67 ? { emoji: "🌧️", label: "雨" } : e >= 71 && e <= 77 ? { emoji: "🌨️", label: "雪" } : e >= 80 && e <= 82 ? { emoji: "🌧️", label: "阵雨" } : e >= 85 && e <= 86 ? { emoji: "🌨️", label: "阵雪" } : e >= 95 ? { emoji: "⛈️", label: "雷雨" } : { emoji: "🌡️", label: "—" };
}
class Xt {
  constructor() {
    this.currentCity = "武汉", this.isRefreshing = !1, this.activeRequestId = 0, this.initStorage();
  }
  static getInstance() {
    return Xt.instance || (Xt.instance = new Xt()), Xt.instance;
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
    const i = t.trim().toLowerCase();
    if (!i) return ui.slice(0, o);
    const a = [];
    for (const l of ui) {
      const h = l.name.toLowerCase(), f = l.pinyin.toLowerCase(), p = l.admin.toLowerCase();
      if ((h.startsWith(i) || f.startsWith(i) || h.includes(i) || f.includes(i) || p.includes(i)) && a.push(l), a.length >= o) break;
    }
    return a;
  }
  async loadWeather(t) {
    const o = (t || this.currentCity || "").trim();
    if (!o) {
      Ze.unconfigured();
      return;
    }
    if (this.isRefreshing) return;
    this.isRefreshing = !0;
    const i = ++this.activeRequestId;
    Ze.loading(o);
    try {
      const a = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(o)}&count=1&language=zh&format=json`, l = await fetch(a);
      if (i !== this.activeRequestId || j.state === "unconfigured") {
        this.isRefreshing = !1;
        return;
      }
      const f = (await l.json()).results?.[0];
      if (!f) {
        i === this.activeRequestId && j.state !== "unconfigured" && Ze.notFound(o), this.isRefreshing = !1;
        return;
      }
      const p = `https://api.open-meteo.com/v1/forecast?latitude=${f.latitude}&longitude=${f.longitude}&current=temperature_2m,weather_code,relative_humidity_2m,wind_speed_10m&hourly=temperature_2m,weather_code,precipitation_probability&daily=temperature_2m_max,temperature_2m_min,weather_code,precipitation_probability_max&forecast_days=7&timezone=auto`, w = await fetch(p);
      if (i !== this.activeRequestId || j.state === "unconfigured") {
        this.isRefreshing = !1;
        return;
      }
      const k = await w.json(), M = Bo(k.current?.weather_code ?? 0), g = Math.round(k.current?.temperature_2m ?? 0), u = k.hourly?.time || [], d = Date.now();
      let b = u.findIndex((A) => new Date(A).getTime() >= d);
      b < 0 && (b = 0);
      const C = [];
      for (let A = b; A < Math.min(b + 5, u.length); A++) {
        const P = A === b ? "现在" : new Date(u[A]).getHours() + "时", Y = Bo(k.hourly.weather_code[A]), Z = Math.round(k.hourly.temperature_2m[A]);
        C.push({ time: P, emoji: Y.emoji, temp: Z });
      }
      let y = "未来 12 小时暂无降水 ☂️";
      for (let A = b; A < Math.min(b + 12, u.length); A++) {
        const P = k.hourly.weather_code[A], Y = k.hourly.precipitation_probability?.[A] || 0;
        if (P >= 51 || Y >= 60) {
          const Z = new Date(u[A]).getHours(), B = P >= 71 && P <= 77 || P === 85 || P === 86;
          y = `预计 ${Z}:00 ${B ? "有雪" : "有雨"}${Y ? `（${Y}%）` : ""} 🌧️`;
          break;
        }
      }
      const x = ["今天", "明天", "后天"], E = [], T = k.daily?.time?.length || 0;
      for (let A = 1; A < Math.min(3, T); A++) {
        const P = x[A] || `+${A}天`, Y = Bo(k.daily.weather_code[A]), Z = `${Math.round(k.daily.temperature_2m_max[A])}°/${Math.round(k.daily.temperature_2m_min[A])}°`;
        E.push({ label: P, emoji: Y.emoji, tempRange: Z });
      }
      const L = `${M.label} · 最高 ${Math.round(k.daily?.temperature_2m_max?.[0] ?? g)}° / 最低 ${Math.round(k.daily?.temperature_2m_min?.[0] ?? g)}°`, S = {
        cityName: f.name || o,
        currentEmoji: M.emoji,
        currentTemp: g,
        subText: L,
        rainText: y,
        hours: C,
        days: E
      };
      if (i === this.activeRequestId && j.state !== "unconfigured") {
        if (Ze.ready(S, o), k.daily?.time) {
          const P = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"], Y = [];
          for (let Z = 0; Z < k.daily.time.length; Z++) {
            const B = new Date(k.daily.time[Z]), K = Z === 0 ? "今天" : Z === 1 ? "明天" : Z === 2 ? "后天" : P[B.getDay()], R = Bo(k.daily.weather_code[Z]);
            Y.push({
              date: `${B.getMonth() + 1}/${B.getDate()}`,
              dayName: K,
              emoji: R.emoji,
              condition: R.label,
              highTemp: Math.round(k.daily.temperature_2m_max[Z]),
              lowTemp: Math.round(k.daily.temperature_2m_min[Z]),
              rainProb: k.daily.precipitation_probability_max?.[Z] || 0
            });
          }
          Ze.setForecastDays(Y);
        }
        const A = {
          humidity: k.current?.relative_humidity_2m ? `${k.current.relative_humidity_2m}%` : "60%",
          wind: k.current?.wind_speed_10m ? `${Math.round(k.current.wind_speed_10m)} km/h` : "微风",
          uvIndex: "正常",
          airQuality: "优良"
        };
        Ze.setDetailInfo(A);
      }
    } catch (a) {
      i === this.activeRequestId && j.state !== "unconfigured" && Ze.error(a?.message || "天气加载失败，右键此处可重新选择地点。", o);
    } finally {
      i === this.activeRequestId && (this.isRefreshing = !1);
    }
  }
}
const wo = Xt.getInstance();
function Wa(e, t) {
  window.LogicWeaverIntro = ht, window.LogicWeaverNotifications = Ae, window.LogicWeaverWindowManager = $e, window.LogicWeaverWindowTabs = $e, window.LogicWeaverDomFreezer = Gs, window.LogicWeaverWallpaperService = Vo, window.LogicWeaverLauncherService = oe, window.LogicWeaverLauncherRuntime = An, window.LogicWeaverProfileService = ei;
  try {
    ei.init();
  } catch (o) {
    console.error("[ProfileService] init failed:", o);
  }
  window.LogicWeaverBookmarksService = En, window.LogicWeaverCalendarService = Bs, window.LogicWeaverWeather = Ze, window.LogicWeaverWeatherService = wo, window.LogicWeaverClock = Vt, window.LogicWeaverSearch = Is, window.LogicWeaverSearchService = Ds, Object.defineProperty(window, "LogicWeaverAiHotService", {
    configurable: !0,
    get: () => {
      import("./aihot.service-a53WsZEK.js").then(({ aiHotService: o }) => {
        window.LogicWeaverAiHotService = o;
      });
    }
  }), window.LogicWeaverHomeMusic = Fe, window.LogicWeaverLauncherGroups = xe, window.LogicWeaverProfileMenu = To, window.LogicWeaverWorkspaceLaunchers = Rn, window.LogicWeaverMacDock = ct, window.LogicWeaverFullscreen = gt, window.enterFullscreenCard = (o) => gt.enter(o), window.exitFullscreenCard = () => gt.exit(), window.cycleFullscreenCard = () => gt.cycle(), window.LogicWeaverPageVisibility = Ea, window.LogicWeaverBackgroundLibrary = Xn, window.LogicWeaverNotificationCenter = At, window.LogicWeaverBookmarkMenu = Wn, window.LogicWeaverBookmarkPanel = en, window.LogicWeaverBookmarkFolderStrip = qo, window.LogicWeaverLauncherDialogs = ko, window.LogicWeaverLauncherFolder = Ct, window.LogicWeaverLauncherMenus = Qt, window.LogicWeaverSettings = on, window.LogicWeaverClockSettings = Mt, window.LogicWeaverBiliTheater = _o, window.LogicWeaverBilibiliService = Un, window.getBiliJct = () => Un.getBiliJct(), window.LogicWeaverBiliMiniPlayer = Gn, window.openBiliMiniPlayer = (o) => Gn.openVideo(o), window.LogicWeaverAiDialog = Fn, window.LogicWeaverAihotViewer = Bn, window.LogicWeaverNavWheel = we, window.openNavWheel = (o, i) => dt.open(o, i), window.closeNavWheel = () => dt.close(), window.toggleNavWheel = (o) => dt.toggle(o), window.toggleToolWheel = (o) => dt.toggleTools(o), window.setNavWheelMode = (o) => dt.setMode(o), window.LogicWeaverShortcuts = Dn, window.triggerToolShortcut = (o) => Dn.triggerToolShortcut(o), window.LogicWeaverCommands = e, window.LogicWeaverFeatures = t, window.LogicWeaverCalendarView = Rs, window.LogicWeaverGitHubStatus = tn, window.LogicWeaverGitHubFolders = Tt, window.LogicWeaverGitHubHero = zt, window.LogicWeaverGitHubRepositories = at, window.LogicWeaverGitHubBatchBar = bo, window.LogicWeaverTodoistLabels = Fs, window.LogicWeaverTodoistWorkspace = Ns, window.LogicWeaverTodoistCalendarSidebar = Hs, window.LogicWeaverTodoistTaskList = js, window.LogicWeaverBiliMessagePanel = St, window.LogicWeaverStickerBoard = Js, window.LogicWeaverStickersService = Qs, window.LogicWeaverPricing = Ii, window.LogicWeaverBiliFavorites = Si, window.LogicWeaverBiliRadioTape = oa, window.LogicWeaverBiliOrganizerDialogs = Zs, window.LogicWeaverBiliUpGroupManager = ea, window.LogicWeaverBiliUpPreview = zo, window.LogicWeaverYouTube = Li, window.LogicWeaverAihotFeed = Mi, window.LogicWeaverGitHubTrending = Ri, window.LogicWeaverCalendarWorkspace = Gt, window.LogicWeaverCalendar = Gt, window.LogicWeaverTodoistMainWorkspace = Ks, window.LogicWeaverTodoistTaskDetail = xa, window.openBiliTheater = (o) => _o.openVideo(o), window.closeBiliTheater = () => _o.close(), window.showWindowsToast = (o) => o ? Ae.show({
    ...o,
    onClick: () => {
      if (typeof o?.onClick == "function") return o.onClick();
      if (o?.url) {
        window.open(o.url, "_blank");
        return;
      }
      o?.appType === "bili" && (window.LogicWeaverBiliMessagePanel ? window.LogicWeaverBiliMessagePanel.openPanel() : window.open("https://message.bilibili.com/", "_blank"));
    }
  }) : null, window.showToast = (o, i = !1, a = 3200) => window.showWindowsToast({
    appName: "系统提醒",
    icon: i ? "assets/error.svg" : "assets/logo.png",
    title: i ? "操作提醒" : "系统提醒",
    subtitle: o,
    duration: a
  }), window.showBiliToast = (o, i = 3200, a = {}) => {
    const l = a.isError || /失败|错误|异常|未获取|未找到/i.test(o), h = a.title || (l ? "B站操作未完成" : "哔哩哔哩"), f = a.subtitle || (o.length > 36 ? "" : o), p = a.message || (a.subtitle || o.length > 36 ? o : ""), w = {
      id: a.id || `bili_toast_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      appType: "bili",
      appName: "哔哩哔哩",
      icon: "assets/bilibili.svg",
      title: h,
      subtitle: f || o,
      message: p && p !== f ? p : "",
      showActions: !!(a.showActions || a.actionLabel),
      actionLabel: a.actionLabel || "",
      onClick: a.onClick || null,
      duration: Math.max(3e3, i)
    };
    return window.showWindowsToast(w);
  }, window.showFetchToast = (o, i, a = "", l = "assets/logo.png", h = 3200) => window.showWindowsToast({
    appName: o,
    title: i,
    subtitle: a,
    icon: l || "assets/logo.png",
    duration: h,
    showActions: !1,
    actionLabel: "",
    appType: "fetch"
  }), window.LogicWeaverKineticDrag = sa, window.LogicWeaverMarkdownAst = aa, window.setLauncherBackground = (o) => Vo.setWallpaper(o), window.backgroundDbClear = (o) => bs(o), window.openBackgroundHistory = () => Xn.openDialog();
}
const De = ke({
  isOpen: !1,
  query: "",
  selectedIndex: 0
});
let Ro = null;
const Ni = {
  get state() {
    return De;
  },
  open() {
    De.isOpen || (De.isOpen = !0, De.query = "", De.selectedIndex = 0, Ro = $e.pushModalCloser(() => (this.close(), !0)));
  },
  close() {
    De.isOpen && (De.isOpen = !1, De.query = "", De.selectedIndex = 0, Ro && (Ro(), Ro = null));
  },
  toggle() {
    De.isOpen ? this.close() : this.open();
  },
  setQuery(e) {
    De.query = e, De.selectedIndex = 0;
  },
  selectNext(e) {
    e <= 0 || (De.selectedIndex = (De.selectedIndex + 1) % e);
  },
  selectPrev(e) {
    e <= 0 || (De.selectedIndex = (De.selectedIndex - 1 + e) % e);
  },
  async executeCommand(e) {
    this.close();
    try {
      await nn.execute(e.id, void 0, "command-palette");
    } catch (t) {
      console.warn(`[CommandPalette] Failed to execute ${e.id}:`, t);
    }
  }
};
typeof window < "u" && window.addEventListener("keydown", (e) => {
  if (On.active || e.defaultPrevented || e.isComposing || e.repeat) return;
  const t = (e.key || "").toLowerCase(), o = (e.ctrlKey || e.metaKey) && t === "k", i = e.altKey && (e.code === "Space" || t === " ");
  (o || i) && (e.preventDefault(), e.stopPropagation(), Ni.toggle());
}, !0);
function Oa(e) {
  e.register({
    id: "palette.toggle",
    title: "打开全局命令中心 (Spotlight)",
    category: "界面",
    keywords: ["命令", "palette", "spotlight", "raycast", "搜索", "cmd"],
    concurrency: "drop",
    run: () => Ni.toggle()
  }), e.register({
    id: "intro.skip",
    title: "跳过开屏动画",
    category: "界面",
    keywords: ["开屏", "启动", "skip"],
    concurrency: "drop",
    enabled: () => ht.enabled && !ht.finished,
    run: () => ht.skip("COMMAND SKIP")
  }), e.register({
    id: "notifications.clear",
    title: "关闭当前 Toast",
    category: "通知",
    keywords: ["toast", "关闭"],
    description: "只关闭浮动提示，不删除通知中心历史",
    concurrency: "drop",
    enabled: () => Ae.size > 0,
    run: () => Ae.clear()
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
    enabled: () => Gt.ready,
    run: () => Gt.refresh()
  }), e.register({
    id: "calendar.today",
    title: "日历跳转到今天",
    category: "日历",
    keywords: ["今日", "today", "日期"],
    concurrency: "drop",
    enabled: () => Gt.ready,
    run: () => Gt.goToday()
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
const Ba = {
  key: 0,
  id: "guest-preview-banner",
  class: "guest-preview-banner",
  role: "alert",
  "aria-label": "新用户开箱视角预览提示"
}, Ra = /* @__PURE__ */ le({
  __name: "GuestPreviewBanner",
  setup(e) {
    function t() {
      _s.exit();
    }
    return (o, i) => (r(), ce(ms, { name: "guest-banner-slide" }, {
      default: Zt(() => [
        s(ks) ? (r(), c("aside", Ba, [
          i[1] || (i[1] = n("div", { class: "banner-content" }, [
            n("span", {
              class: "preview-pulse-dot",
              "aria-hidden": "true"
            }),
            n("div", { class: "banner-texts" }, [
              n("strong", null, "👀 新用户开箱视角预览中"),
              n("small", null, "当前正在模拟新用户刚安装时的纯净首屏体验 · 你的真实数据已安全封存")
            ])
          ], -1)),
          n("button", {
            type: "button",
            class: "btn-exit-guest",
            title: "退出沙箱，原样恢复我的真实网站与数据",
            onClick: t
          }, [...i[0] || (i[0] = [
            n("span", null, "✕ 退出预览，恢复我的数据", -1)
          ])])
        ])) : I("", !0)
      ]),
      _: 1
    }));
  }
}), Fa = /* @__PURE__ */ Te(Ra, [["__scopeId", "data-v-a2f2ca5f"]]), Na = ["hidden"], Ha = {
  key: 0,
  class: "bookmark-folder-strip-empty"
}, ja = ["title", "data-bookmark-folder-id", "onClick", "onContextmenu"], Ka = /* @__PURE__ */ le({
  __name: "BookmarkFolderStrip",
  setup(e) {
    const t = H(null);
    function o(l) {
      const h = t.value;
      !h || h.scrollWidth <= h.clientWidth || !l.deltaY || (l.preventDefault(), h.scrollLeft += l.deltaY);
    }
    function i(l) {
      qo.openFolder(l.id);
    }
    function a(l, h) {
      qo.openContextMenu(h, l.clientX, l.clientY);
    }
    return (l, h) => (r(), c("nav", {
      id: "bookmark-folder-strip",
      ref_key: "stripRef",
      ref: t,
      class: "bookmark-folder-strip",
      "aria-label": "书签栏文件夹",
      hidden: !s(Ut).enabled,
      onWheel: o
    }, [
      s(Ut).folders.length ? I("", !0) : (r(), c("span", Ha, m(s(Ut).emptyMessage || "书签栏没有文件夹"), 1)),
      (r(!0), c(z, null, pe(s(Ut).folders, (f) => (r(), c("button", {
        key: f.id,
        class: "bookmark-folder-chip",
        type: "button",
        title: `打开书签文件夹：${f.title || "未命名"}`,
        "data-bookmark-folder-id": f.id,
        onClick: (p) => i(f),
        onContextmenu: N((p) => a(p, f), ["prevent"])
      }, [
        h[0] || (h[0] = n("span", { "aria-hidden": "true" }, "📁", -1)),
        n("span", null, m(f.title || "未命名"), 1)
      ], 40, ja))), 128))
    ], 40, Na));
  }
}), za = /* @__PURE__ */ Te(Ka, [["__scopeId", "data-v-5e71cc7c"]]), Ua = { class: "cube-manager-body" }, Ga = ["disabled", "onClick"], Va = ["disabled", "onClick"], Ya = ["onClick"], qa = ["onClick"], Xa = ["onClick"], Ja = ["type", "placeholder"], Qa = {
  key: 0,
  role: "alert"
}, Za = /* @__PURE__ */ le({
  __name: "CubeConfigDialog",
  setup(e) {
    const t = Se.state, o = re(() => Se.getActiveFaces()), i = re(() => t.registeredFaces.filter((g) => !t.activeFaceIds.includes(g.id))), a = H(""), l = H("memo"), h = H(""), f = H(!1), p = H(JSON.stringify({ title: "每日一句", icon: "📝", customType: "memo", customData: { text: "今天也要记得休息" } }, null, 2)), w = H("");
    function k(g) {
      w.value = "";
      try {
        g();
      } catch (u) {
        w.value = u instanceof Error ? u.message : "操作失败";
      }
    }
    function M() {
      k(() => {
        const g = f.value ? JSON.parse(p.value) : {
          title: a.value,
          customType: l.value,
          customData: { text: h.value, targetDate: h.value, url: h.value }
        };
        Se.addCustomFace(g), a.value = "", h.value = "";
      });
    }
    return (g, u) => (r(), ce(mt, { to: "body" }, [
      s(t).isConfigDialogOpen ? (r(), c("section", {
        key: 0,
        class: "cube-manager",
        role: "dialog",
        "aria-label": "管理立方体面",
        onKeydown: u[7] || (u[7] = Dt(N((d) => s(Se).closeConfigDialog(), ["stop"]), ["esc"]))
      }, [
        n("header", null, [
          u[8] || (u[8] = n("strong", null, "管理立方体面", -1)),
          n("button", {
            type: "button",
            "aria-label": "关闭",
            onClick: u[0] || (u[0] = (d) => s(Se).closeConfigDialog())
          }, "×")
        ]),
        n("div", Ua, [
          u[16] || (u[16] = n("p", null, "默认只有音乐。可以删除所有面，空位仍可添加。", -1)),
          (r(!0), c(z, null, pe(o.value, (d, b) => (r(), c("div", {
            key: d.id,
            class: "cube-row"
          }, [
            n("span", null, m(d.icon) + " " + m(d.title), 1),
            n("button", {
              type: "button",
              disabled: b === 0,
              onClick: (C) => k(() => s(Se).moveUp(d.id)),
              title: "上移"
            }, "↑", 8, Ga),
            n("button", {
              type: "button",
              disabled: b === o.value.length - 1,
              onClick: (C) => k(() => s(Se).moveDown(d.id)),
              title: "下移"
            }, "↓", 8, Va),
            n("button", {
              type: "button",
              onClick: (C) => k(() => s(Se).removeCustomFace(d.id))
            }, "删除面", 8, Ya)
          ]))), 128)),
          (r(!0), c(z, null, pe(i.value, (d) => (r(), c("div", {
            key: d.id,
            class: "cube-row"
          }, [
            n("span", null, m(d.title) + "（未启用）", 1),
            n("button", {
              type: "button",
              onClick: (b) => k(() => s(Se).toggleActive(d.id, !0))
            }, "添加", 8, qa),
            d.builtIn ? I("", !0) : (r(), c("button", {
              key: 0,
              type: "button",
              onClick: (b) => k(() => s(Se).removeCustomFace(d.id))
            }, "删除", 8, Xa))
          ]))), 128)),
          u[17] || (u[17] = n("h3", null, "添加面", -1)),
          n("label", null, [
            We(n("input", {
              "onUpdate:modelValue": u[1] || (u[1] = (d) => f.value = d),
              type: "checkbox"
            }, null, 512), [
              [vs, f.value]
            ]),
            u[9] || (u[9] = Oe(" 粘贴 JSON 配置", -1))
          ]),
          n("form", {
            onSubmit: N(M, ["prevent"])
          }, [
            f.value ? (r(), c(z, { key: 1 }, [
              u[14] || (u[14] = n("p", null, "仅支持文本、倒数日和链接配置，不执行 JavaScript / HTML。开发者动态注册说明见 SDK 文档。", -1)),
              We(n("textarea", {
                "onUpdate:modelValue": u[5] || (u[5] = (d) => p.value = d),
                rows: "9",
                maxlength: "10000",
                "aria-label": "面的 JSON 配置",
                spellcheck: "false"
              }, null, 512), [
                [eo, p.value]
              ])
            ], 64)) : (r(), c(z, { key: 0 }, [
              n("label", null, [
                u[10] || (u[10] = Oe("标题", -1)),
                We(n("input", {
                  "onUpdate:modelValue": u[2] || (u[2] = (d) => a.value = d),
                  maxlength: "60",
                  required: ""
                }, null, 512), [
                  [eo, a.value]
                ])
              ]),
              n("label", null, [
                u[12] || (u[12] = Oe("类型", -1)),
                We(n("select", {
                  "onUpdate:modelValue": u[3] || (u[3] = (d) => l.value = d)
                }, [...u[11] || (u[11] = [
                  n("option", { value: "memo" }, "文本", -1),
                  n("option", { value: "countdown" }, "倒数日", -1),
                  n("option", { value: "link" }, "链接", -1)
                ])], 512), [
                  [bi, l.value]
                ])
              ]),
              n("label", null, [
                u[13] || (u[13] = Oe("内容", -1)),
                We(n("input", {
                  "onUpdate:modelValue": u[4] || (u[4] = (d) => h.value = d),
                  type: l.value === "countdown" ? "date" : "text",
                  placeholder: l.value === "link" ? "https://…" : "输入内容",
                  maxlength: "500",
                  required: ""
                }, null, 8, Ja), [
                  [ys, h.value]
                ])
              ])
            ], 64)),
            u[15] || (u[15] = n("button", { type: "submit" }, "添加面", -1))
          ], 32),
          w.value ? (r(), c("p", Qa, m(w.value), 1)) : I("", !0)
        ]),
        n("footer", null, [
          n("button", {
            type: "button",
            onClick: u[6] || (u[6] = (d) => k(() => s(Se).resetDefaults()))
          }, "恢复默认（仅音乐）"),
          u[18] || (u[18] = n("small", null, "自定义配置保留，但退出轮播", -1))
        ])
      ], 32)) : I("", !0)
    ]));
  }
}), er = /* @__PURE__ */ Te(Za, [["__scopeId", "data-v-15dd5487"]]), tr = ["data-face"], or = { class: "ms-top-side" }, nr = {
  key: 0,
  class: "ms-top-meta"
}, ir = {
  class: "ms-top-title",
  style: { color: "#10b981", "font-weight": "700" }
}, sr = { class: "ms-top-artist" }, ar = { class: "ms-top-meta" }, rr = ["title"], lr = ["title"], cr = {
  key: 0,
  class: "ms-top-divider"
}, dr = ["title"], ur = { class: "ms-top-mini-progress" }, pr = { class: "ms-top-side" }, fr = ["aria-label"], gr = ["title"], hr = { class: "ms-cube-custom-icon" }, mr = { class: "ms-cube-custom-title" }, vr = ["title"], yr = {
  key: 1,
  class: "ms-cube-custom-text countdown"
}, wr = ["href"], br = {
  class: "ms-cube-dots",
  "aria-hidden": "true"
}, kr = ["title", "onClick"], _r = { class: "ms-cube-cm-header" }, Cr = { class: "ms-cube-cm-list" }, xr = ["onClick"], $r = { class: "ms-cube-cm-icon" }, Lr = { class: "ms-cube-cm-title" }, Tr = {
  key: 0,
  class: "ms-cube-cm-check"
}, Sr = /* @__PURE__ */ le({
  __name: "TopInfoCube",
  props: {
    active: { type: Boolean, default: !0 }
  },
  setup(e) {
    const t = e, o = re(() => xi.visible || tt.djModalOpen || tt.isActive && tt.isJoined), i = re(() => tt.isActive && tt.isJoined), a = re(() => Se.getActiveFaces()), l = H("music"), h = H(0);
    let f = !1, p;
    Ne(
      () => a.value,
      (W) => {
        W.some((O) => O.id === l.value) || (l.value = W[0]?.id || "");
      },
      { immediate: !0 }
    );
    const w = re(() => a.value.filter((W) => !W.builtIn)), k = H(!1), M = H({ x: 0, y: 0 });
    Ne(() => t.active, (W) => {
      W || (k.value = !1, Se.closeConfigDialog(), clearTimeout(p), f = !1);
    }, { immediate: !0 });
    const { menuRef: g, style: u } = Ti({
      visible: () => k.value,
      anchor: () => M.value,
      dismiss: () => {
        k.value = !1;
      }
    });
    function d(W) {
      W.preventDefault(), W.stopPropagation(), M.value = { x: W.clientX, y: W.clientY }, k.value = !0;
    }
    function b(W) {
      Y(W), k.value = !1;
    }
    function C() {
      k.value = !1, Se.openConfigDialog();
    }
    function y() {
      k.value = !1, x(() => Se.resetDefaults()), Y("music");
    }
    function x(W) {
      k.value = !1;
      try {
        W();
      } catch (O) {
        Ae.show({ appName: "滚动立方体", title: "保存失败", message: O instanceof Error ? O.message : "请检查浏览器存储" });
      }
    }
    function E(W) {
      if (!W) return "未设置目标日";
      const F = new Date(W).getTime() - A.value, ge = Math.ceil(F / (1e3 * 60 * 60 * 24));
      return ge > 0 ? `还剩 ${ge} 天` : ge === 0 ? "就是今天！" : `已过去 ${Math.abs(ge)} 天`;
    }
    const T = re(() => V.isBiliRadio ? "B站电台" : V.isNetease ? "网易云" : V.playing ? "塞壬" : "待机"), L = re(() => V.currentLyric ? V.currentLyric : V.playing ? "♪ 伴奏播放中…" : "选择塞壬歌曲、网易云或B站电台后在这里显示歌词");
    function S() {
      V.isNetease ? $e.handleToolClick("music") : $e.handleToolClick("siren");
    }
    const A = H(Date.now());
    let P;
    Ne(() => t.active && a.value.some((W) => W.id === l.value && W.customType === "countdown"), (W) => {
      W && (A.value = Date.now()), clearInterval(P), P = W ? window.setInterval(() => {
        document.hidden || (A.value = Date.now());
      }, 6e4) : void 0;
    }, { immediate: !0 });
    function Y(W, O = null) {
      const F = a.value, ge = F.find((Me) => Me.id === W) || F[0];
      if (ge) {
        if (Number.isFinite(O))
          h.value = O;
        else if (ge.id !== l.value) {
          const Me = F.findIndex((qe) => qe.id === l.value);
          let me = (F.findIndex((qe) => qe.id === ge.id) - Me + F.length) % F.length;
          me > F.length / 2 && (me -= F.length), h.value += me * 90;
        }
        l.value = ge.id;
      }
    }
    function Z(W) {
      const O = a.value;
      if (O.length <= 1) return;
      const F = O.findIndex((me) => me.id === l.value), Me = ((F >= 0 ? F : 0) + W + O.length) % O.length, Ye = O[Me];
      Ye && Y(Ye.id, h.value + W * 90);
    }
    function B(W) {
      a.value.length <= 1 || W.altKey || Math.abs(W.deltaY) < 2 || (W.preventDefault(), !f && (f = !0, Z(W.deltaY > 0 ? 1 : -1), p = setTimeout(() => {
        f = !1;
      }, 420)));
    }
    function K(W) {
      !["ArrowUp", "ArrowDown", "PageUp", "PageDown"].includes(W.key) || W.target?.closest?.("input") || (W.preventDefault(), Z(["ArrowDown", "PageDown"].includes(W.key) ? 1 : -1));
    }
    function R(W, O) {
      return l.value === W ? {
        transform: `rotateX(${-h.value}deg) translateZ(22px)`,
        visibility: "visible"
      } : {
        transform: `rotateX(-${O}deg) translateZ(22px)`,
        visibility: "hidden"
      };
    }
    function X(W) {
      const O = W.target;
      O && (O.tagName === "INPUT" || O.tagName === "TEXTAREA" || O.isContentEditable) || (W.preventDefault(), W.stopPropagation());
    }
    function _e(W) {
      const O = W.target;
      O && (O.tagName === "INPUT" || O.tagName === "TEXTAREA" || O.isContentEditable) || W.preventDefault();
    }
    return Et(() => {
      clearInterval(P), clearTimeout(p);
    }), (W, O) => We((r(), c("div", {
      class: "ms-top-player",
      "data-face": l.value,
      tabindex: "0",
      title: "滚动立方体 · 滚轮切换面板，右键可自由增删与排序",
      "aria-label": "滚动立方体",
      onWheel: B,
      onKeydown: K,
      onContextmenu: d,
      onCopy: X,
      onSelectstart: _e
    }, [
      a.value.length ? I("", !0) : (r(), c("button", {
        key: 0,
        type: "button",
        class: "ms-cube-cm-action",
        onClick: C
      }, "＋ 添加面（右键管理）")),
      n("div", {
        class: "ms-top-cube",
        style: ve({ transform: `translateZ(-22px) rotateX(${h.value}deg)` })
      }, [
        s(Se).isActive("music") && l.value === "music" ? (r(), c("section", {
          key: 0,
          class: "ms-top-face ms-top-face-music",
          "aria-label": "音乐歌词面",
          style: ve(R("music", 0))
        }, [
          n("div", or, [
            n("button", {
              class: "ms-top-prev",
              title: "上一首",
              type: "button",
              onClick: O[0] || (O[0] = N((F) => s(Fe).prev(), ["stop"]))
            }, "⏮"),
            n("button", {
              class: "ms-top-play",
              title: "播放/暂停",
              type: "button",
              onClick: O[1] || (O[1] = N((F) => s(Fe).togglePlay(), ["stop"]))
            }, m(s(V).playing ? "⏸" : "▶"), 1)
          ]),
          n("button", {
            class: "ms-top-main",
            title: "打开音乐播放器",
            type: "button",
            onClick: N(S, ["stop"])
          }, [
            o.value ? (r(), c("div", nr, [
              n("span", ir, " 🎧 " + m(i.value ? "正在一起听" : "正在收听") + "：" + m(s(V).title || "待机中"), 1),
              n("span", sr, m(s(V).artist), 1)
            ])) : (r(), c(z, { key: 1 }, [
              n("div", ar, [
                n("span", {
                  class: "ms-top-title",
                  title: s(V).title || "音乐播放器"
                }, m(s(V).title || "音乐播放器"), 9, rr),
                n("span", {
                  class: "ms-top-artist",
                  title: s(V).artist || "待机中"
                }, m(s(V).artist || "待机中"), 9, lr),
                n("span", {
                  class: se(["ms-top-source", { idle: !s(V).playing }])
                }, m(T.value), 3),
                L.value ? (r(), c("span", cr)) : I("", !0)
              ]),
              L.value ? (r(), c("span", {
                key: 0,
                class: "ms-top-lyric",
                title: L.value
              }, m(L.value), 9, dr)) : I("", !0)
            ], 64)),
            n("div", ur, [
              n("div", {
                class: "ms-top-mini-fill",
                style: ve({ width: s(V).progressPercent + "%" })
              }, null, 4)
            ])
          ]),
          n("div", pr, [
            n("button", {
              class: "ms-top-next",
              title: "下一首",
              type: "button",
              onClick: O[2] || (O[2] = N((F) => s(Fe).next(), ["stop"]))
            }, "⏭"),
            n("button", {
              class: "ms-top-open",
              title: "打开歌单",
              type: "button",
              onClick: N(S, ["stop"])
            }, "🎵")
          ])
        ], 4)) : I("", !0),
        (r(!0), c(z, null, pe(w.value, (F, ge) => (r(), c("section", {
          key: F.id,
          class: "ms-top-face ms-top-face-custom",
          "aria-label": F.title,
          style: ve(R(F.id, (ge + 1) * 90))
        }, [
          l.value === F.id ? (r(), c("div", {
            key: 0,
            class: "ms-cube-custom-body",
            title: F.desc
          }, [
            n("span", hr, m(F.icon), 1),
            n("strong", mr, m(F.title), 1),
            O[10] || (O[10] = n("span", { class: "ms-cube-divider" }, null, -1)),
            F.customType === "memo" ? (r(), c("span", {
              key: 0,
              class: "ms-cube-custom-text",
              title: F.customData?.text
            }, m(F.customData?.text || "（点击右键配置便签内容）"), 9, vr)) : F.customType === "countdown" ? (r(), c("span", yr, m(E(F.customData?.targetDate)), 1)) : F.customType === "link" ? (r(), c("a", {
              key: 2,
              href: F.customData?.url,
              target: "_blank",
              rel: "noreferrer",
              class: "ms-cube-custom-link",
              onClick: O[3] || (O[3] = N(() => {
              }, ["stop"]))
            }, m(F.customData?.url) + " ↗ ", 9, wr)) : I("", !0)
          ], 8, gr)) : I("", !0),
          n("button", {
            type: "button",
            class: "ms-cube-config-trigger",
            title: "管理立方体面",
            onClick: O[4] || (O[4] = N((Me) => s(Se).openConfigDialog(), ["stop"]))
          }, " ⚙ ")
        ], 12, fr))), 128))
      ], 4),
      n("div", br, [
        (r(!0), c(z, null, pe(a.value, (F) => (r(), c("i", {
          key: F.id,
          class: se({ on: l.value === F.id }),
          title: F.title,
          onClick: N((ge) => Y(F.id), ["stop"])
        }, null, 10, kr))), 128))
      ]),
      (r(), ce(mt, { to: "body" }, [
        t.active && k.value ? (r(), c("div", {
          key: 0,
          ref_key: "menuRef",
          ref: g,
          class: "ms-cube-context-menu",
          style: ve(s(u)),
          onClick: O[9] || (O[9] = N(() => {
          }, ["stop"]))
        }, [
          n("div", _r, [
            O[11] || (O[11] = n("span", null, "🎲 滚动立方体面", -1)),
            n("button", {
              type: "button",
              class: "ms-cube-cm-close",
              onClick: O[5] || (O[5] = (F) => k.value = !1)
            }, "×")
          ]),
          n("div", Cr, [
            (r(!0), c(z, null, pe(a.value, (F) => (r(), c("button", {
              key: F.id,
              type: "button",
              class: se(["ms-cube-cm-item", { active: l.value === F.id }]),
              onClick: (ge) => b(F.id)
            }, [
              n("span", $r, m(F.icon), 1),
              n("span", Lr, m(F.title), 1),
              l.value === F.id ? (r(), c("span", Tr, "✓")) : I("", !0)
            ], 10, xr))), 128))
          ]),
          O[16] || (O[16] = n("div", { class: "ms-cube-cm-divider" }, null, -1)),
          n("button", {
            type: "button",
            class: "ms-cube-cm-action",
            onClick: C
          }, [...O[12] || (O[12] = [
            n("span", null, "＋ 添加面 / 管理面", -1)
          ])]),
          n("button", {
            type: "button",
            class: "ms-cube-cm-action",
            onClick: O[6] || (O[6] = (F) => {
              Z(-1), k.value = !1;
            })
          }, [...O[13] || (O[13] = [
            n("span", null, "⏮ 上一个面板", -1)
          ])]),
          n("button", {
            type: "button",
            class: "ms-cube-cm-action",
            onClick: O[7] || (O[7] = (F) => {
              Z(1), k.value = !1;
            })
          }, [...O[14] || (O[14] = [
            n("span", null, "⏭ 下一个面板", -1)
          ])]),
          l.value ? (r(), c("button", {
            key: 0,
            type: "button",
            class: "ms-cube-cm-action danger",
            onClick: O[8] || (O[8] = (F) => x(() => s(Se).removeCustomFace(l.value)))
          }, "删除当前面")) : I("", !0),
          n("button", {
            type: "button",
            class: "ms-cube-cm-action danger",
            onClick: y
          }, [...O[15] || (O[15] = [
            n("span", null, "↺ 恢复默认（仅音乐）", -1)
          ])])
        ], 4)) : I("", !0)
      ])),
      t.active ? (r(), ce(er, { key: 1 })) : I("", !0)
    ], 40, tr)), [
      [to, t.active]
    ]);
  }
}), Mr = /* @__PURE__ */ Te(Sr, [["__scopeId", "data-v-5602a785"]]), Ir = { class: "tb-brand" }, Dr = ["aria-expanded", "aria-label"], Ar = ["src", "alt"], Pr = ["hidden"], Er = ["hidden"], Wr = { id: "vue-bookmark-folder-strip-root" }, Or = { class: "tb-actions" }, Br = {
  id: "workspace-launchers",
  hidden: ""
}, Rr = /* @__PURE__ */ le({
  __name: "AppTopBar",
  setup(e) {
    const t = G(() => import("./WorkspaceLaunchers-DoMJcf0L.js"));
    function o(u) {
      u.preventDefault(), u.stopPropagation();
      const d = typeof window < "u" ? window : null;
      d?.LogicWeaverWindowManager?.open ? d.LogicWeaverWindowManager.open("settings") : d?.LogicWeaverWindowTabs?.open ? d.LogicWeaverWindowTabs.open("settings") : on.open();
    }
    function i(u) {
      u.preventDefault();
      const d = typeof window < "u" ? window : null;
      typeof d?.toggleBookmarkPanel == "function" ? d.toggleBookmarkPanel() : d?.LogicWeaverBookmarkPanel?.toggle ? d.LogicWeaverBookmarkPanel.toggle() : En.toggleBookmarkPanel();
    }
    function a(u) {
      u.preventDefault(), At.toggle();
    }
    function l(u) {
      u.preventDefault(), To.open(u.clientX, u.clientY);
    }
    const h = [
      { id: "light", icon: "☀️", label: "白天模式" },
      { id: "dark", icon: "🌙", label: "夜晚模式" },
      { id: "endfield", icon: "⚡", label: "终末地风格" },
      { id: "lonetrail", icon: "🌌", label: "孤星风格" }
    ], f = H("☀️"), p = H("切换主题");
    function w() {
      if (typeof document > "u") return;
      const u = document.documentElement.dataset.theme || "light", d = h.find((b) => b.id === u) || h.find((b) => b.id === "light") || h[0];
      f.value = d.icon, p.value = `主题：${d.label}（点击更换）`;
    }
    function k(u) {
      if (u.preventDefault(), typeof document > "u") return;
      const d = document.documentElement.dataset.theme || "light", b = h.findIndex((y) => y.id === d), C = h[(b + 1) % h.length];
      document.documentElement.dataset.theme = C.id;
      try {
        localStorage.setItem("theme", C.id);
      } catch {
      }
      typeof chrome < "u" && chrome?.storage?.local && chrome.storage.local.set({ theme: C.id }), w(), document.querySelectorAll("iframe").forEach((y) => {
        try {
          y.contentWindow?.postMessage({ type: "theme-change", theme: C.id }, "*");
        } catch {
        }
      });
    }
    function M(u) {
      const d = u.target;
      d && (d.tagName === "INPUT" || d.tagName === "TEXTAREA" || d.isContentEditable) || (u.preventDefault(), u.stopPropagation());
    }
    function g(u) {
      const d = u.target;
      d && (d.tagName === "INPUT" || d.tagName === "TEXTAREA" || d.isContentEditable) || u.preventDefault();
    }
    return He(() => {
      At.start();
      const u = localStorage.getItem("theme") || "light";
      document.documentElement.dataset.theme = u, document.documentElement.setAttribute("data-theme", u), w();
    }), (u, d) => (r(), c("header", {
      class: se(["topbar", { "bookmark-folders-mode": s(Ut).enabled }]),
      onCopy: M,
      onSelectstart: g
    }, [
      n("div", Ir, [
        n("button", {
          id: "bili-profile-button",
          class: "bili-profile-button",
          type: "button",
          title: "通知中心",
          "aria-controls": "notification-center",
          "aria-expanded": s($i).isOpen,
          "aria-label": s(ao) ? `通知中心，${s(ao)} 条未读` : "通知中心",
          onClick: a,
          onContextmenu: d[0] || (d[0] = N((b) => l(b), ["prevent"]))
        }, [
          n("img", {
            id: "bili-profile-avatar",
            src: s(jt).avatarUrl || "assets/bilibili.svg",
            alt: s(jt).userName || "通知中心头像"
          }, null, 8, Ar),
          n("span", {
            id: "bili-profile-badge",
            class: "bili-profile-badge",
            hidden: s(ao) <= 0
          }, m(s(ao) > 99 ? "99+" : s(ao)), 9, Pr)
        ], 40, Dr),
        n("button", {
          id: "bookmark-handle",
          class: "bookmark-handle",
          type: "button",
          "aria-expanded": "false",
          title: "书签",
          hidden: s(Ut).enabled,
          onClick: i
        }, [...d[1] || (d[1] = [
          n("span", { id: "bookmark-handle-icon" }, "📁", -1),
          n("span", null, "书签", -1)
        ])], 8, Er),
        n("div", Wr, [
          Q(za)
        ])
      ]),
      Q(Mr, {
        active: !s(xo).activeId
      }, null, 8, ["active"]),
      n("div", Or, [
        d[2] || (d[2] = n("button", {
          id: "daily-toggle",
          class: "tb-pill",
          type: "button",
          hidden: "",
          title: "查看日报"
        }, "📰 日报", -1)),
        n("span", Br, [
          Q(s(t))
        ]),
        n("button", {
          id: "settings-open",
          class: "tb-btn",
          title: "设置",
          onClick: o
        }, "⚙"),
        n("button", {
          id: "theme-toggle",
          class: "tb-btn",
          type: "button",
          title: "主题 · 切换风格",
          onClick: k
        }, m(f.value), 1)
      ])
    ], 34));
  }
}), Fr = {
  key: 0,
  class: "notice"
}, Nr = {
  key: 1,
  class: "muted small"
}, Hr = {
  key: 2,
  class: "notice"
}, jr = {
  key: 3,
  class: "notice"
}, Kr = { class: "wx-cur" }, zr = { class: "wx-emoji" }, Ur = { class: "wx-temp" }, Gr = { class: "wx-sub" }, Vr = { class: "wx-rain" }, Yr = { class: "wx-hours" }, qr = { class: "hh" }, Xr = { class: "he" }, Jr = { class: "ht" }, Qr = { class: "wx-days" }, Zr = ["open"], el = { class: "weather-forecast-head" }, tl = { class: "weather-forecast-city-info" }, ol = { class: "weather-forecast-icon" }, nl = { id: "weather-forecast-city-title" }, il = { class: "small muted" }, sl = { class: "weather-forecast-actions" }, al = {
  key: 0,
  class: "weather-metrics-grid"
}, rl = { class: "weather-metric-item" }, ll = {
  class: "metric-val",
  id: "weather-forecast-humidity"
}, cl = { class: "weather-metric-item" }, dl = {
  class: "metric-val",
  id: "weather-forecast-wind"
}, ul = { class: "weather-metric-item" }, pl = {
  class: "metric-val",
  id: "weather-forecast-uv"
}, fl = { class: "weather-metric-item" }, gl = {
  class: "metric-val",
  id: "weather-forecast-aqi"
}, hl = {
  class: "weather-forecast-list",
  id: "weather-forecast-days-list"
}, ml = { class: "day-date-col" }, vl = { class: "day-name" }, yl = { class: "day-date small muted" }, wl = { class: "day-weather-col" }, bl = { class: "day-emoji" }, kl = { class: "day-cond" }, _l = { class: "day-rain-col" }, Cl = {
  key: 0,
  class: "rain-tag"
}, xl = {
  key: 1,
  class: "rain-tag empty"
}, $l = { class: "day-temp-bar-col" }, Ll = { class: "low-temp" }, Tl = { class: "temp-track" }, Sl = { class: "high-temp" }, Ml = { class: "weather-location-head" }, Il = { class: "weather-location-title-row" }, Dl = ["title"], Al = { class: "weather-input-wrapper" }, Pl = ["onKeydown"], El = { key: 0 }, Wl = {
  key: 0,
  class: "weather-location-suggestions"
}, Ol = ["onClick"], Bl = { class: "weather-suggestion-name" }, Rl = { class: "weather-suggestion-sub" }, Fl = {
  key: 1,
  class: "weather-suggestion-empty"
}, Nl = { key: 1 }, Hl = { class: "weather-quick-chips-grid" }, jl = ["onClick"], Kl = /* @__PURE__ */ le({
  __name: "WeatherWidget",
  setup(e) {
    const t = H(!1), o = H({ x: 0, y: 0 }), i = H(""), a = H(null), l = H(null), h = ["深圳", "武汉", "北京", "上海", "广州", "成都", "杭州", "南京", "西安", "重庆", "苏州", "天津"], f = re(() => {
      const y = i.value.trim();
      return y ? wo.filterCities(y, 6) : [];
    });
    function p(y) {
      const L = y?.clientX ?? window.innerWidth / 2 - 140, S = y?.clientY ?? window.innerHeight / 2 - 320 / 2, A = Math.max(12, Math.min(window.innerWidth - 280 - 12, L)), P = Math.max(12, Math.min(window.innerHeight - 320 - 12, S));
      o.value = { x: A, y: P }, t.value = !0, i.value = "", ft(() => {
        l.value?.focus();
      });
    }
    function w() {
      t.value = !1, i.value = "";
    }
    async function k(y) {
      const x = y.trim();
      x && (w(), await wo.changeCity(x));
    }
    function M() {
      const y = i.value.trim();
      y && k(y);
    }
    function g(y) {
      if (!t.value) return;
      const x = y.target;
      a.value && !a.value.contains(x) && w();
    }
    function u(y) {
      t.value && y.key === "Escape" && (y.preventDefault(), w());
    }
    He(() => {
      Ze.setRefreshAction(() => {
        wo.loadWeather();
      }), Ze.setChangeLocationAction((y) => {
        p(y);
      }), wo.loadWeather(), window.addEventListener("pointerdown", g, !0), window.addEventListener("keydown", u, !0);
    }), Et(() => {
      window.removeEventListener("pointerdown", g, !0), window.removeEventListener("keydown", u, !0);
    });
    function d(y) {
      y.preventDefault(), p(y);
    }
    function b() {
      Ze.closeForecastModal();
    }
    function C(y) {
      y.target?.id === "weather-forecast-dialog" && b();
    }
    return (y, x) => (r(), c("div", {
      class: "weather-widget-container",
      onContextmenu: d
    }, [
      s(j).state === "unconfigured" ? (r(), c("p", Fr, [...x[6] || (x[6] = [
        Oe(" 未设置城市。右键此处快速设置，或到 ", -1),
        n("a", { href: "options.html" }, "设置", -1),
        Oe(" 填写城市名（如 武汉 / Tokyo）。 ", -1)
      ])])) : s(j).state === "loading" ? (r(), c("p", Nr, "加载中…")) : s(j).state === "not_found" ? (r(), c("p", Hr, "找不到城市「" + m(s(j).city) + "」，右键可重新选择地点。", 1)) : s(j).state === "error" ? (r(), c("p", jr, m(s(j).errorMessage || "天气加载失败，右键此处可重新选择地点。"), 1)) : s(j).state === "ready" && s(j).data ? (r(), c(z, { key: 4 }, [
        n("div", Kr, [
          n("span", zr, m(s(j).data.currentEmoji), 1),
          n("span", Ur, m(s(j).data.currentTemp) + "°", 1)
        ]),
        n("p", Gr, m(s(j).data.subText), 1),
        n("p", Vr, m(s(j).data.rainText), 1),
        n("div", Yr, [
          (r(!0), c(z, null, pe(s(j).data.hours, (E, T) => (r(), c("div", {
            key: T,
            class: "wx-h"
          }, [
            n("span", qr, m(E.time), 1),
            n("span", Xr, m(E.emoji), 1),
            n("span", Jr, m(E.temp) + "°", 1)
          ]))), 128))
        ]),
        n("div", Qr, [
          (r(!0), c(z, null, pe(s(j).data.days, (E, T) => (r(), c("span", { key: T }, m(E.label) + " " + m(E.emoji) + " " + m(E.tempRange), 1))), 128))
        ])
      ], 64)) : I("", !0),
      n("dialog", {
        id: "weather-forecast-dialog",
        class: "weather-forecast-dialog",
        open: s(j).forecastModalOpen,
        onClick: C
      }, [
        n("div", {
          class: "weather-forecast-shell",
          onClick: x[1] || (x[1] = N(() => {
          }, ["stop"]))
        }, [
          n("header", el, [
            n("div", tl, [
              n("span", ol, m(s(j).data?.currentEmoji || "🌤️"), 1),
              n("div", null, [
                n("h3", nl, m(s(j).city || s(j).data?.cityName || "天气预报"), 1),
                n("p", il, m(s(j).data?.subText || "未来多日天气趋势与生活气象指数"), 1)
              ])
            ]),
            n("div", sl, [
              n("button", {
                id: "weather-forecast-refresh-btn",
                type: "button",
                class: "weather-forecast-btn",
                title: "刷新天气数据",
                onClick: x[0] || (x[0] = (E) => s(Ze).refresh())
              }, " ↻ 刷新 "),
              n("button", {
                id: "weather-forecast-close-btn",
                type: "button",
                class: "weather-forecast-close",
                title: "关闭",
                onClick: b
              }, " ✕ ")
            ])
          ]),
          s(j).detailInfo ? (r(), c("div", al, [
            n("div", rl, [
              x[7] || (x[7] = n("span", { class: "metric-label" }, "💧 相对湿度", -1)),
              n("span", ll, m(s(j).detailInfo.humidity || "50%"), 1)
            ]),
            n("div", cl, [
              x[8] || (x[8] = n("span", { class: "metric-label" }, "💨 风力风向", -1)),
              n("span", dl, m(s(j).detailInfo.wind || "微风"), 1)
            ]),
            n("div", ul, [
              x[9] || (x[9] = n("span", { class: "metric-label" }, "☀️ 紫外线指数", -1)),
              n("span", pl, m(s(j).detailInfo.uvIndex || "中等"), 1)
            ]),
            n("div", fl, [
              x[10] || (x[10] = n("span", { class: "metric-label" }, "🍃 空气质量", -1)),
              n("span", gl, m(s(j).detailInfo.airQuality || "良"), 1)
            ])
          ])) : I("", !0),
          n("div", hl, [
            (r(!0), c(z, null, pe(s(j).forecastDays, (E, T) => (r(), c("div", {
              key: T,
              class: "weather-forecast-day-row forecast-day-item"
            }, [
              n("div", ml, [
                n("span", vl, m(E.dayName), 1),
                n("span", yl, m(E.date), 1)
              ]),
              n("div", wl, [
                n("span", bl, m(E.emoji), 1),
                n("span", kl, m(E.condition), 1)
              ]),
              n("div", _l, [
                E.rainProb > 0 ? (r(), c("span", Cl, "☂️ " + m(E.rainProb) + "%", 1)) : (r(), c("span", xl, "无降水"))
              ]),
              n("div", $l, [
                n("span", Ll, m(E.lowTemp) + "°", 1),
                n("div", Tl, [
                  n("div", {
                    class: "temp-range-fill",
                    style: ve({
                      left: `${Math.max(0, Math.min(100, (E.lowTemp + 10) * 2))}%`,
                      width: `${Math.max(20, Math.min(80, (E.highTemp - E.lowTemp) * 6))}%`
                    })
                  }, null, 4)
                ]),
                n("span", Sl, m(E.highTemp) + "°", 1)
              ])
            ]))), 128))
          ])
        ])
      ], 8, Zr),
      (r(), ce(mt, { to: "body" }, [
        t.value ? (r(), c("div", {
          key: 0,
          ref_key: "contextMenuRef",
          ref: a,
          class: "weather-location-context-menu",
          style: ve({ left: `${o.value.x}px`, top: `${o.value.y}px` }),
          onClick: x[4] || (x[4] = N(() => {
          }, ["stop"])),
          onContextmenu: x[5] || (x[5] = N(() => {
          }, ["prevent"]))
        }, [
          n("div", Ml, [
            n("div", Il, [
              x[12] || (x[12] = n("span", { class: "weather-location-title" }, "切换天气地点", -1)),
              n("span", {
                class: "weather-location-curr-badge",
                title: s(j).city
              }, [
                x[11] || (x[11] = n("span", { class: "weather-curr-dot" }, null, -1)),
                Oe(" " + m(s(j).city || "未设置"), 1)
              ], 8, Dl)
            ])
          ]),
          n("form", {
            class: "weather-location-form",
            onSubmit: N(M, ["prevent"])
          }, [
            n("div", Al, [
              x[13] || (x[13] = n("span", { class: "weather-input-icon" }, "🔍", -1)),
              We(n("input", {
                ref_key: "inputRef",
                ref: l,
                class: "weather-location-input",
                placeholder: "输入城市名或拼音…",
                "onUpdate:modelValue": x[2] || (x[2] = (E) => i.value = E),
                onKeydown: Dt(N(M, ["prevent"]), ["enter"]),
                autocomplete: "off"
              }, null, 40, Pl), [
                [eo, i.value]
              ]),
              i.value ? (r(), c("button", {
                key: 0,
                type: "button",
                class: "weather-input-clear",
                onClick: x[3] || (x[3] = (E) => i.value = ""),
                title: "清除输入"
              }, "✕")) : I("", !0)
            ]),
            x[14] || (x[14] = n("button", {
              type: "submit",
              class: "weather-location-submit"
            }, "确定", -1))
          ], 32),
          i.value.trim() ? (r(), c("div", El, [
            x[15] || (x[15] = n("div", { class: "weather-section-subtitle" }, "匹配建议", -1)),
            f.value.length ? (r(), c("div", Wl, [
              (r(!0), c(z, null, pe(f.value, (E) => (r(), c("button", {
                key: E.name + E.admin,
                type: "button",
                class: "weather-suggestion-item",
                onClick: (T) => k(E.name)
              }, [
                n("span", Bl, m(E.name), 1),
                n("span", Rl, m(E.admin), 1)
              ], 8, Ol))), 128))
            ])) : (r(), c("div", Fl, " 未找到完全匹配城市，回车或点击「确定」直接尝试检索 "))
          ])) : (r(), c("div", Nl, [
            x[16] || (x[16] = n("div", { class: "weather-section-subtitle" }, "常用城市", -1)),
            n("div", Hl, [
              (r(), c(z, null, pe(h, (E) => n("button", {
                key: E,
                type: "button",
                class: se(["weather-quick-chip", { active: s(j).city === E }]),
                onClick: (T) => k(E)
              }, m(E), 11, jl)), 64))
            ])
          ]))
        ], 36)) : I("", !0)
      ]))
    ], 32));
  }
}), Hi = /* @__PURE__ */ Te(Kl, [["__scopeId", "data-v-51b21266"]]), Pn = "heroCustomMottoV1";
function zl() {
  try {
    if (typeof localStorage < "u") {
      const e = localStorage.getItem(Pn);
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
const Ft = zl(), U = ke({
  loaded: !1,
  customText: Ft.customText,
  history: Ft.history,
  currentIndex: Ft.customText && Ft.history.length ? Ft.history.findIndex((e) => e.text === Ft.customText) : -1,
  menuOpen: !1,
  menuPos: { x: 0, y: 0 }
});
function Ul(e) {
  return new Promise((t) => {
    typeof chrome < "u" && chrome?.storage?.local?.get ? chrome.storage.local.get([e], (o) => t(o?.[e])) : t(null);
  });
}
function Gl(e, t) {
  try {
    typeof localStorage < "u" && localStorage.setItem(e, JSON.stringify(t));
  } catch {
  }
  return new Promise((o) => {
    typeof chrome < "u" && chrome?.storage?.local?.set ? chrome.storage.local.set({ [e]: t }, () => o()) : o();
  });
}
function Vl(e) {
  const t = (a) => String(a).padStart(2, "0"), o = `${e.getFullYear()}-${t(e.getMonth() + 1)}-${t(e.getDate())}`, i = `${t(e.getHours())}:${t(e.getMinutes())}`;
  return { date: o, time: i };
}
const Qe = {
  async init() {
    try {
      const e = await Ul(Pn);
      if (e && typeof e == "object") {
        const t = Array.isArray(e.history) ? e.history : [];
        t.length >= U.history.length && (U.history = t, e.customText !== void 0 && (U.customText = e.customText));
      }
    } catch (e) {
      console.warn("[HeroMotto] Sync chrome.storage failed:", e);
    } finally {
      U.loaded = !0, U.customText && U.history.length && (U.currentIndex = U.history.findIndex(
        (e) => e.text === U.customText
      ));
    }
  },
  async persist() {
    const e = {
      customText: U.customText,
      history: U.history
    };
    await Gl(Pn, e);
  },
  setCustomMotto(e) {
    const t = e.trim();
    if (!t) {
      this.resetToSystem();
      return;
    }
    const { date: o, time: i } = Vl(/* @__PURE__ */ new Date());
    U.customText = t;
    const a = U.history.findIndex((l) => l.text === t);
    if (a !== -1) {
      const l = U.history.splice(a, 1)[0];
      l.date = o, l.time = i, U.history.unshift(l);
    } else
      U.history.unshift({
        id: `motto_${Date.now()}`,
        date: o,
        time: i,
        text: t,
        createdAt: Date.now()
      });
    U.history.length > 50 && (U.history = U.history.slice(0, 50)), U.currentIndex = 0, this.persist();
  },
  selectHistory(e) {
    U.customText = e.text, U.currentIndex = U.history.findIndex((t) => t.id === e.id), this.closeMenu(), this.persist();
  },
  resetToSystem() {
    U.customText = null, U.currentIndex = -1, this.closeMenu(), this.persist();
  },
  deleteEntry(e) {
    const t = U.history.findIndex((o) => o.id === e);
    t !== -1 && (U.history.splice(t, 1), U.currentIndex === t && (U.history.length > 0 ? this.selectHistory(U.history[0]) : this.resetToSystem()), this.persist());
  },
  clearHistory() {
    U.history = [], this.resetToSystem();
  },
  stepHistory(e) {
    if (!U.history.length) return;
    let t = U.currentIndex + e;
    if (t < 0) {
      this.resetToSystem();
      return;
    }
    t >= U.history.length && (t = 0), this.selectHistory(U.history[t]);
  },
  openMenu(e, t) {
    U.menuPos = { x: e, y: t }, U.menuOpen = !0;
  },
  closeMenu() {
    U.menuOpen = !1;
  }
}, Yl = { class: "motto-content" }, ql = {
  key: 0,
  class: "motto-scroll-hint",
  title: "滚动鼠标滚轮快速切换历史标语"
}, Xl = { class: "motto-menu-header" }, Jl = { class: "dim" }, Ql = { class: "motto-history-list" }, Zl = {
  key: 0,
  class: "motto-history-empty dim"
}, ec = ["onClick"], tc = { class: "motto-item-date" }, oc = ["title"], nc = ["onClick"], ic = /* @__PURE__ */ le({
  __name: "HeroMotto",
  setup(e) {
    const t = H(!1), o = H(""), i = H(null), a = re(() => U.customText || he.greetingText);
    function l() {
      Qe.closeMenu(), o.value = U.customText || he.greetingText, t.value = !0, ft(() => {
        i.value?.focus(), i.value?.select();
      });
    }
    function h() {
      if (!t.value) return;
      t.value = !1;
      const g = o.value.trim();
      Qe.setCustomMotto(g), g && Ae.fetch("标语", `已更新标语: ${g}`);
    }
    function f() {
      t.value = !1;
    }
    function p(g) {
      g.key === "Enter" ? (g.preventDefault(), h()) : g.key === "Escape" && (g.preventDefault(), f());
    }
    function w(g) {
      t.value || (g.preventDefault(), g.stopPropagation(), Qe.stepHistory(g.deltaY > 0 ? 1 : -1));
    }
    function k(g) {
      g.preventDefault(), g.stopPropagation(), Qe.openMenu(g.clientX, g.clientY);
    }
    function M(g) {
      U.menuOpen && (g.target.closest(".motto-context-menu") || Qe.closeMenu());
    }
    return He(() => {
      Qe.init(), window.addEventListener("click", M);
    }), Et(() => {
      window.removeEventListener("click", M);
    }), (g, u) => (r(), c(z, null, [
      n("div", {
        class: "hero-motto-wrapper",
        title: "点击直接编辑标语 · 滚轮切换历史标语 · 右键查看标语菜单",
        onWheel: w,
        onContextmenu: k
      }, [
        t.value ? We((r(), c("input", {
          key: 0,
          ref_key: "mottoInputRef",
          ref: i,
          "onUpdate:modelValue": u[0] || (u[0] = (d) => o.value = d),
          class: "hero-motto-input",
          type: "text",
          placeholder: "写下你此刻的个性标语…",
          maxlength: "60",
          onBlur: h,
          onKeydown: p
        }, null, 544)), [
          [eo, o.value]
        ]) : (r(), c("p", {
          key: 1,
          id: "greeting",
          class: "hero-motto-text",
          style: ve({ color: s(he).greetColor }),
          onClick: l
        }, [
          n("span", Yl, m(a.value), 1),
          s(U).history.length > 1 ? (r(), c("span", ql, "⇕")) : I("", !0)
        ], 4))
      ], 32),
      (r(), ce(mt, { to: "body" }, [
        s(U).menuOpen ? (r(), c("div", {
          key: 0,
          class: "motto-context-menu",
          style: ve({ left: `${s(U).menuPos.x}px`, top: `${s(U).menuPos.y}px` }),
          onClick: u[3] || (u[3] = N(() => {
          }, ["stop"])),
          onContextmenu: u[4] || (u[4] = N(() => {
          }, ["prevent"]))
        }, [
          n("div", Xl, [
            u[5] || (u[5] = n("span", null, "🏷️ 自定义标语", -1)),
            n("small", Jl, m(s(U).history.length) + " 条记录", 1)
          ]),
          n("button", {
            type: "button",
            class: "motto-menu-action",
            onClick: l
          }, [...u[6] || (u[6] = [
            n("i", null, "✎", -1),
            n("span", null, "编辑当前标语", -1)
          ])]),
          u[9] || (u[9] = n("div", { class: "motto-menu-divider" }, null, -1)),
          u[10] || (u[10] = n("div", { class: "motto-history-label" }, "历史标语记录（点击切换）：", -1)),
          n("div", Ql, [
            s(U).history.length ? (r(!0), c(z, { key: 1 }, pe(s(U).history, (d) => (r(), c("div", {
              key: d.id,
              class: se(["motto-history-item", { active: s(U).customText === d.text }]),
              onClick: (b) => s(Qe).selectHistory(d)
            }, [
              n("span", tc, m(d.date), 1),
              n("span", {
                class: "motto-item-text",
                title: d.text
              }, m(d.text), 9, oc),
              n("button", {
                type: "button",
                class: "motto-item-del",
                title: "删除此条标语",
                onClick: N((b) => s(Qe).deleteEntry(d.id), ["stop"])
              }, "×", 8, nc)
            ], 10, ec))), 128)) : (r(), c("div", Zl, " 暂无历史标语，自定义的每一条标语都会沉淀在此 "))
          ]),
          u[11] || (u[11] = n("div", { class: "motto-menu-divider" }, null, -1)),
          n("button", {
            type: "button",
            class: "motto-menu-action reset-btn",
            onClick: u[1] || (u[1] = //@ts-ignore
            (...d) => s(Qe).resetToSystem && s(Qe).resetToSystem(...d))
          }, [...u[7] || (u[7] = [
            n("i", null, "↻", -1),
            n("span", null, "恢复系统自动问候（早安/午安/晚安）", -1)
          ])]),
          s(U).history.length ? (r(), c("button", {
            key: 0,
            type: "button",
            class: "motto-menu-action danger-btn",
            onClick: u[2] || (u[2] = //@ts-ignore
            (...d) => s(Qe).clearHistory && s(Qe).clearHistory(...d))
          }, [...u[8] || (u[8] = [
            n("i", null, "🗑", -1),
            n("span", null, "清空全部历史标语", -1)
          ])])) : I("", !0)
        ], 36)) : I("", !0)
      ]))
    ], 64));
  }
}), sc = /* @__PURE__ */ Te(ic, [["__scopeId", "data-v-0514f22a"]]), ac = /* @__PURE__ */ le({
  __name: "HeroClock",
  setup(e) {
    const t = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
    function o(p) {
      return p < 5 ? "夜深了" : p < 9 ? "早上好" : p < 12 ? "上午好" : p < 14 ? "中午好" : p < 18 ? "下午好" : p < 23 ? "晚上好" : "夜深了";
    }
    function i() {
      const p = Mt.state.timezone;
      if (!p || p === "local") return /* @__PURE__ */ new Date();
      try {
        const w = (/* @__PURE__ */ new Date()).toLocaleString("en-US", { timeZone: p });
        return new Date(w);
      } catch {
        return /* @__PURE__ */ new Date();
      }
    }
    function a() {
      const p = (L) => String(L).padStart(2, "0"), w = i(), k = w.getHours(), M = w.getMinutes(), g = w.getSeconds(), u = w.getFullYear(), d = w.getMonth() + 1, b = w.getDate(), C = w.getDay(), y = `${p(k)}:${p(M)}`, x = `:${p(g)}`, E = o(k), T = `${u}年${d}月${b}日 · ${t[C]}`;
      Vt.updateTime(y, x, E, T);
    }
    function l(p) {
      p.preventDefault(), Mt.open({ clientX: p.clientX, clientY: p.clientY });
    }
    function h() {
      document.hidden ? f && (clearInterval(f), f = null) : (a(), f || (f = setInterval(a, 1e3)));
    }
    let f = null;
    return Mt.initPreferences(), a(), He(() => {
      Mt.initPreferences(), xo.activeId || (a(), f = setInterval(a, 1e3)), document.addEventListener("visibilitychange", h);
    }), Ne(
      () => xo.activeId,
      (p) => {
        p ? f && (clearInterval(f), f = null) : document.hidden || (a(), f || (f = setInterval(a, 1e3)));
      }
    ), Et(() => {
      f && (clearInterval(f), f = null), document.removeEventListener("visibilitychange", h);
    }), (p, w) => (r(), c("div", {
      class: "hero-clock-vue-container",
      onContextmenu: l
    }, [
      n("p", {
        id: "clock",
        class: "clock",
        style: ve({ fontFamily: s(he).fontFamily, color: s(he).colorHex })
      }, [
        Oe(m(s(he).timeText), 1),
        n("span", {
          id: "secs",
          style: ve({ color: s(he).colorHex })
        }, m(s(he).secsText), 5)
      ], 4),
      n("p", {
        id: "date",
        class: "date",
        style: ve({ color: s(he).dateColor })
      }, m(s(he).dateText), 5)
    ], 32));
  }
}), ji = /* @__PURE__ */ Te(ac, [["__scopeId", "data-v-38840808"]]), rc = {
  key: 0,
  class: "home-music-degraded-box"
}, lc = { class: "degraded-badge-row" }, cc = { class: "degraded-status" }, dc = {
  key: 0,
  class: "degraded-host-tag"
}, uc = {
  key: 1,
  class: "degraded-host-tag"
}, pc = { class: "degraded-title-row" }, fc = ["title"], gc = { class: "degraded-track-artist" }, hc = { class: "degraded-progress-bar-wrap" }, mc = { class: "degraded-actions" }, vc = { class: "degraded-time" }, yc = { class: "home-vinyl-box" }, wc = ["src"], bc = { class: "home-music-right" }, kc = ["title"], _c = {
  id: "home-music-artist",
  class: "home-music-meta-artist"
}, Cc = { class: "home-music-seek-row" }, xc = {
  id: "home-music-cur",
  class: "home-music-time"
}, $c = ["value"], Lc = {
  id: "home-music-dur",
  class: "home-music-time"
}, Tc = { class: "home-music-actions" }, Sc = /* @__PURE__ */ le({
  __name: "HomeMusicCard",
  setup(e) {
    He(() => {
      setTimeout(() => {
        Cs();
      }, 200);
    });
    const t = re(() => xi.visible || tt.djModalOpen || tt.isActive && tt.isJoined), o = re(() => tt.isActive && tt.isJoined), i = re(() => V.mode === "shuffle" ? "🔀" : V.mode === "one" ? "🔂" : "🔁");
    function a(h) {
      const f = h.target, p = Number(f.value);
      Fe.seek(p);
    }
    function l() {
      Fe.update({ coverUrl: "" });
    }
    return (h, f) => (r(), c("div", {
      id: "home-music-player-view",
      class: se(["home-music-player-view", { "is-degraded": t.value }])
    }, [
      t.value ? (r(), c("div", rc, [
        n("div", lc, [
          f[7] || (f[7] = n("span", { class: "degraded-icon" }, "🎧", -1)),
          n("strong", cc, m(o.value ? "正在一起听" : "后台收听中"), 1),
          o.value ? (r(), c("span", dc, " DJ: " + m(s(tt).hostName), 1)) : (r(), c("span", uc, " 工作区就绪 "))
        ]),
        n("div", pc, [
          n("h3", {
            class: "degraded-track-title",
            title: s(V).title
          }, m(s(V).title || "待机中"), 9, fc),
          n("p", gc, m(s(V).artist), 1)
        ]),
        n("div", hc, [
          n("div", {
            class: "degraded-progress-bar-fill",
            style: ve({ width: s(V).progressPercent + "%" })
          }, null, 4)
        ]),
        n("div", mc, [
          n("button", {
            type: "button",
            class: "degraded-btn",
            onClick: f[0] || (f[0] = (p) => s(Fe).togglePlay())
          }, m(s(V).playing ? "⏸ 暂停" : "▶ 播放"), 1),
          n("span", vc, m(s(V).formattedCurrent) + " / " + m(s(V).formattedDuration), 1)
        ])
      ])) : (r(), c(z, { key: 1 }, [
        n("div", yc, [
          n("div", {
            id: "home-vinyl-needle",
            class: se(["home-vinyl-needle", { playing: s(V).playing }])
          }, [...f[8] || (f[8] = [
            mo('<svg viewBox="0 0 32 52" fill="none" data-v-25a69816><circle cx="26" cy="4" r="3.5" fill="#e2e8f0" stroke="#475569" stroke-width="1.5" data-v-25a69816></circle><circle cx="26" cy="4" r="1.5" fill="#64748b" data-v-25a69816></circle><path d="M26 4 L14 26 L11 44" stroke="#cbd5e1" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" data-v-25a69816></path><rect x="7" y="42" width="8" height="9" rx="1.5" fill="#f43f5e" transform="rotate(-15 11 46)" data-v-25a69816></rect></svg>', 1)
          ])], 2),
          n("div", {
            id: "home-vinyl-disc",
            class: se(["home-vinyl-disc", { playing: s(V).playing }]),
            title: "点击播放 / 暂停",
            onClick: f[1] || (f[1] = (p) => s(Fe).togglePlay())
          }, [
            s(V).coverUrl ? (r(), c("img", {
              key: 0,
              id: "home-vinyl-cover",
              class: "home-vinyl-cover",
              referrerpolicy: "no-referrer",
              src: s(V).coverUrl,
              alt: "音乐封面",
              onError: l
            }, null, 40, wc)) : I("", !0),
            f[9] || (f[9] = n("div", { class: "home-vinyl-hole" }, null, -1))
          ], 2)
        ]),
        n("div", bc, [
          n("h3", {
            id: "home-music-title",
            class: "home-music-meta-title",
            title: s(V).title
          }, m(s(V).title), 9, kc),
          n("p", _c, m(s(V).artist), 1),
          n("div", Cc, [
            n("span", xc, m(s(V).formattedCurrent), 1),
            n("input", {
              id: "home-music-seek",
              class: "home-music-seek-bar",
              type: "range",
              min: "0",
              max: "100",
              value: s(V).progressPercent,
              onInput: a
            }, null, 40, $c),
            n("span", Lc, m(s(V).formattedDuration), 1)
          ]),
          n("div", Tc, [
            n("button", {
              id: "home-music-prev",
              class: "home-music-btn",
              type: "button",
              title: "上一首",
              onClick: f[2] || (f[2] = (p) => s(Fe).prev())
            }, " ⏮ "),
            n("button", {
              id: "home-music-play",
              class: "home-music-btn play-btn",
              type: "button",
              title: "播放 / 暂停",
              onClick: f[3] || (f[3] = (p) => s(Fe).togglePlay())
            }, m(s(V).playing ? "⏸" : "▶"), 1),
            n("button", {
              id: "home-music-next",
              class: "home-music-btn",
              type: "button",
              title: "下一首",
              onClick: f[4] || (f[4] = (p) => s(Fe).next())
            }, " ⏭ "),
            n("button", {
              id: "home-music-like",
              class: se(["home-music-btn like-btn", { liked: s(V).liked }]),
              type: "button",
              title: "收藏",
              onClick: f[5] || (f[5] = (p) => s(Fe).toggleLike())
            }, m(s(V).liked ? "♥" : "♡"), 3),
            n("button", {
              id: "home-music-mode",
              class: "home-music-btn",
              type: "button",
              title: "播放模式",
              onClick: f[6] || (f[6] = (p) => s(Fe).cycleMode())
            }, m(i.value), 1)
          ])
        ])
      ], 64))
    ], 2));
  }
}), Ki = /* @__PURE__ */ Te(Sc, [["__scopeId", "data-v-25a69816"]]), ut = /* @__PURE__ */ new Map(), pt = /* @__PURE__ */ new Set();
function Mc(e, t) {
  for (ut.delete(e), ut.set(e, t), pt.delete(t), pt.add(t); ut.size > 512; )
    ut.delete(ut.keys().next().value);
  for (; pt.size > 512; )
    pt.delete(pt.values().next().value);
}
const Ic = {
  key: 0,
  class: "launcher-fallback"
}, Dc = ["src"], _n = "lw_resolved_icon:", Ac = /* @__PURE__ */ le({
  __name: "LauncherFavicon",
  props: {
    link: {},
    mini: { type: Boolean, default: !1 }
  },
  setup(e) {
    function t(y) {
      try {
        return localStorage.getItem(_n + y) || "";
      } catch {
        return "";
      }
    }
    function o(y, x) {
      try {
        localStorage.setItem(_n + y, x);
      } catch {
      }
    }
    function i(y) {
      try {
        return localStorage.getItem("lw_sync_dataurl:" + y) || "";
      } catch {
        return "";
      }
    }
    const a = e;
    function l(y) {
      try {
        return new URL(y).hostname.replace(/^www\./, "");
      } catch {
        return y || "";
      }
    }
    function h(y) {
      try {
        return new URL(y).origin;
      } catch {
        return "";
      }
    }
    function f(y) {
      try {
        const x = window, E = typeof x.chrome < "u" ? x.chrome : globalThis.chrome;
        if (typeof E?.runtime?.getURL == "function")
          return E.runtime.getURL("_favicon/?pageUrl=" + encodeURIComponent(y) + "&size=64");
      } catch {
      }
      return "";
    }
    const p = re(() => {
      const y = a.link, x = (y.title || l(y.url)).trim();
      return x ? x.slice(0, 1).toUpperCase() : "🔗";
    }), w = H([]), k = H(0), M = H(!1), g = H(!1), u = re(() => g.value || k.value >= w.value.length ? "" : w.value[k.value] || "");
    function d() {
      const y = a.link;
      if (!y?.url) {
        w.value = [], g.value = !0, M.value = !1;
        return;
      }
      const x = [], E = i(y.url);
      E && x.push(E);
      const T = ut.get(y.url) || t(y.url);
      T && !x.includes(T) && x.push(T);
      const L = (B) => B ? /google\.com\/s2\/favicons|icons\.duckduckgo\.com|unavatar\.io|icon\.horse/i.test(B) : !1;
      y.customIcon && !L(y.customIcon) && x.push(y.customIcon), y.icon && !L(y.icon) && x.push(y.icon);
      const S = f(y.url);
      S && !x.includes(S) && x.push(S);
      const A = oe.getCachedIcon(y.url);
      A && !x.includes(A) && x.push(A);
      const P = h(y.url);
      P && !P.startsWith("http://1.") && !P.startsWith("http://192.") && !P.startsWith("http://127.") && x.push(`${P}/favicon.ico`), y.customIcon && !L(y.customIcon) && x.unshift(y.customIcon);
      const Y = [...new Set(x.filter(Boolean))];
      w.value = Y, k.value = 0, g.value = Y.length === 0;
      const Z = Y[0];
      Z && (Z.startsWith("data:") || pt.has(Z)) && (M.value = !0);
    }
    Ne(
      () => [a.link?.url, a.link?.icon, a.link?.customIcon],
      (y, x) => {
        x && y[0] === x[0] && y[1] === x[1] && y[2] === x[2] || d();
      },
      { immediate: !0 }
    ), He(() => {
      w.value.length === 0 && d();
    });
    function b(y) {
      M.value = !0, g.value = !1;
      const x = u.value;
      if (x) {
        const E = pt.has(x), T = ut.get(a.link.url);
        Mc(a.link.url, x), T !== x && t(a.link.url) !== x && o(a.link.url, x);
        const L = y.target;
        if (!E && !x.startsWith("data:")) {
          const S = a.link.url;
          setTimeout(() => {
            oe.cacheIcon(S, x, L?.getAttribute("src") === x ? L : null);
          }, 0);
        }
      }
    }
    function C() {
      const y = u.value;
      if (y) {
        pt.delete(y), ut.get(a.link.url) === y && ut.delete(a.link.url);
        try {
          localStorage.removeItem(_n + a.link.url), localStorage.removeItem("lw_sync_dataurl:" + a.link.url);
        } catch {
        }
      }
      if (y && oe.getCachedIcon(a.link.url) === y && oe.evictCachedIcon(a.link.url), k.value + 1 < w.value.length) {
        k.value += 1;
        const x = w.value[k.value];
        x && (x.startsWith("data:") || pt.has(x)) && (M.value = !0);
      } else
        g.value = !0, M.value = !1;
    }
    return (y, x) => (r(), c("span", {
      class: se(e.mini ? "launcher-folder-mini" : "launcher-favicon")
    }, [
      g.value || !u.value ? (r(), c("span", Ic, m(p.value), 1)) : (r(), c("img", {
        key: 1,
        src: u.value,
        alt: "",
        draggable: "false",
        referrerpolicy: "no-referrer",
        decoding: "async",
        style: { "pointer-events": "none", "user-select": "none" },
        onLoad: b,
        onError: C
      }, null, 40, Dc))
    ], 2));
  }
}), Zo = /* @__PURE__ */ Te(Ac, [["__scopeId", "data-v-bc41d0d8"]]), Pc = { class: "launcher-label launcher-title" }, Ec = ["title"], Wc = {
  key: 0,
  class: "launcher-folder-more"
}, Oc = {
  key: 1,
  class: "empty-folder",
  "aria-hidden": "true"
}, Bc = { class: "launcher-folder-label launcher-title" }, Rc = /* @__PURE__ */ le({
  __name: "LauncherTileContent",
  props: {
    link: {},
    folder: {},
    size: { default: "small" }
  },
  setup(e) {
    const t = e, o = re(() => t.size === "large" ? 9 : 4), i = re(() => t.folder?.preview.slice(0, t.folder.count > o.value ? o.value - 1 : o.value) || []);
    return (a, l) => e.link ? (r(), c(z, { key: 0 }, [
      Q(Zo, { link: e.link }, null, 8, ["link"]),
      n("span", Pc, m(e.link.title), 1)
    ], 64)) : e.folder ? (r(), c(z, { key: 1 }, [
      n("div", {
        class: "launcher-folder-preview",
        title: `打开${e.folder.title}`
      }, [
        (r(!0), c(z, null, pe(i.value, (h) => (r(), ce(Zo, {
          key: h.id,
          link: h,
          mini: !0
        }, null, 8, ["link"]))), 128)),
        e.folder.count > o.value ? (r(), c("span", Wc, "+" + m(e.folder.count - (o.value - 1)), 1)) : I("", !0),
        i.value.length ? I("", !0) : (r(), c("span", Oc, "📁")),
        ki(a.$slots, "default", {}, void 0, !0)
      ], 8, Ec),
      n("span", Bc, m(e.folder.title), 1)
    ], 64)) : I("", !0);
  }
}), pi = /* @__PURE__ */ Te(Rc, [["__scopeId", "data-v-7f513029"]]), Fc = 5, Nc = 180;
function Hc(e, t, o) {
  const i = t - e.left, a = o - e.top;
  return i > e.width * 0.25 && i < e.width * 0.75 && a > e.height * 0.25 && a < e.height * 0.75;
}
function jc(e, t, o) {
  return Math.hypot(t - (e.left + e.width / 2), o - (e.top + e.height / 2)) <= Math.max(e.width, e.height) * 0.55;
}
const Kc = {
  class: "launcher-group launcher-aihot launcher-todoist size-large",
  id: "launcher-todoist"
}, zc = {
  class: "aihot-home-body",
  id: "aihot-home-body"
}, Uc = {
  key: 0,
  class: "muted small"
}, Gc = {
  key: 1,
  class: "notice small"
}, Vc = {
  key: 2,
  class: "muted small aihot-home-empty"
}, Yc = {
  key: 3,
  class: "aihot-home-rich-list"
}, qc = ["href", "title", "onClick"], Xc = { class: "aihot-home-rich-main" }, Jc = { class: "aihot-home-rich-title" }, Qc = {
  key: 0,
  class: "aihot-home-rich-summary"
}, Zc = { class: "aihot-home-rich-meta" }, ed = { class: "aihot-home-rich-meta-left" }, td = {
  key: 0,
  class: "aihot-home-rich-tag"
}, od = { class: "aihot-home-rich-source" }, nd = { class: "aihot-home-rich-time" }, fi = 6, id = /* @__PURE__ */ le({
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
    }, o = H([]), i = H(0), a = H(!0), l = H("");
    function h(d) {
      return d.category ? t[d.category] || d.category : "";
    }
    function f(d) {
      const b = d.publishedAt || d.published || "";
      if (!b) return "最新";
      const C = Number(b), y = Number.isFinite(C) && C > 0 ? new Date(C > 1e12 ? C : C * 1e3) : new Date(b);
      if (isNaN(y.getTime())) return String(b).slice(0, 16) || "最新";
      const x = (P) => String(P).padStart(2, "0"), E = y.getFullYear(), T = x(y.getMonth() + 1), L = x(y.getDate()), S = x(y.getHours()), A = x(y.getMinutes());
      return `${E}-${T}-${L} ${S}:${A}`;
    }
    const p = [
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
    function w() {
      const b = (typeof window < "u" ? window : null)?.LogicWeaverAihotFeed?.getState?.()?.feedArticles;
      if (Array.isArray(b) && b.length)
        return b;
      const C = [
        "newtab_aihot_items_v2",
        "lw-aihot-cached-feed-all-24h-v1",
        "lw-aihot-cached-feed-v1"
      ];
      for (const y of C)
        try {
          const x = localStorage.getItem(y);
          if (x) {
            const E = JSON.parse(x);
            if (Array.isArray(E) && E.length) return E;
            if (E && Array.isArray(E.items) && E.items.length) return E.items;
          }
        } catch {
        }
      return [];
    }
    async function k(d = !1) {
      if (!d && o.value.length > 0) return;
      const b = w();
      b.length ? (o.value = b, a.value = !1) : o.value.length || (o.value = [...p], a.value = !1);
      try {
        const y = await (await fetch("https://aihot.virxact.com/api/v1/items?mode=selected&window=24h&limit=24", {
          headers: { Accept: "application/json" },
          signal: AbortSignal.timeout(5e3)
        })).json(), x = Array.isArray(y) ? y : y.items || y.data || y.results || [];
        if (x.length) {
          o.value = x, i.value = 0, l.value = "";
          try {
            localStorage.setItem("newtab_aihot_items_v2", JSON.stringify(x.slice(0, 30)));
          } catch {
          }
        }
      } catch {
        o.value.length || (o.value = [...p]);
      } finally {
        a.value = !1;
      }
    }
    function M() {
      if (!o.value.length) {
        a.value = !0, k(!0);
        return;
      }
      i.value += fi, i.value >= o.value.length && (i.value = 0);
    }
    function g() {
      const d = window;
      if (typeof d.enterFullscreenCard == "function") {
        d.enterFullscreenCard("daily-aihot");
        return;
      }
      const b = document.querySelector("#daily-aihot, [data-dock-id='daily-aihot']");
      b ? b.scrollIntoView({ behavior: "smooth", block: "start" }) : window.open("https://aihot.virxact.com", "_blank", "noreferrer");
    }
    function u(d, b) {
      if (b.ctrlKey || b.metaKey || b.shiftKey || b.button === 1) return;
      b.preventDefault();
      const C = d.links?.original || d.links?.aihot || d.url || "#";
      Bn.openArticle(
        {
          id: d.id,
          title: d.title,
          summary: d.summary,
          sourceName: d.source?.name || d.sourceName || "AI HOT",
          published: f(d),
          url: C
        },
        ""
      );
    }
    return He(() => {
      k();
    }), (d, b) => (r(), c("section", Kc, [
      n("header", { class: "card-head aihot-home-head" }, [
        b[0] || (b[0] = n("span", { class: "bar cyan" }, null, -1)),
        b[1] || (b[1] = n("strong", { class: "title" }, "AI HOT 资讯", -1)),
        b[2] || (b[2] = n("span", { class: "grow" }, null, -1)),
        n("button", {
          class: "aihot-home-btn",
          type: "button",
          title: "换一批最新资讯",
          onClick: M
        }, " 换一批 ↻ "),
        n("button", {
          class: "aihot-home-btn aihot-home-more-btn",
          type: "button",
          title: "查看完整 AI HOT 榜单",
          onClick: g
        }, " 热榜 ↗ ")
      ]),
      n("div", zc, [
        a.value && !o.value.length ? (r(), c("p", Uc, "正在加载精选资讯…")) : l.value && !o.value.length ? (r(), c("p", Gc, m(l.value), 1)) : o.value.length ? (r(), c("div", Yc, [
          (r(!0), c(z, null, pe(o.value.slice(i.value, i.value + fi), (C, y) => (r(), c("a", {
            key: C.id || C.title,
            class: "aihot-home-rich-card",
            href: C.links?.original || C.links?.aihot || C.url || "#",
            target: "_blank",
            rel: "noreferrer",
            title: `${C.title}
${C.summary || ""}
点击在阅读器中查看`,
            onClick: (x) => u(C, x)
          }, [
            n("span", {
              class: se(["aihot-home-rich-rank", { top: i.value + y < 3 }])
            }, m(i.value + y + 1), 3),
            n("div", Xc, [
              n("h3", Jc, m(C.title), 1),
              C.summary ? (r(), c("p", Qc, m(C.summary), 1)) : I("", !0),
              n("div", Zc, [
                n("div", ed, [
                  h(C) ? (r(), c("span", td, m(h(C)), 1)) : I("", !0),
                  n("span", od, m(C.source?.name || C.sourceName || "AI HOT"), 1)
                ]),
                n("time", nd, m(f(C)), 1)
              ])
            ])
          ], 8, qc))), 128))
        ])) : (r(), c("p", Vc, "暂无精选资讯，请点击换一批重试"))
      ])
    ]));
  }
}), sd = /* @__PURE__ */ Te(id, [["__scopeId", "data-v-cc4398a8"]]), ad = {
  class: "sites-view-switch",
  role: "group",
  "aria-label": "网站与书签切换"
}, rd = ["disabled", "aria-pressed"], ld = ["disabled", "aria-pressed"], cd = {
  class: "launcher-page-tabs",
  role: "tablist",
  "aria-label": "常用网站分区"
}, dd = ["data-page", "title", "onClick", "onContextmenu", "onDragover", "onDrop"], ud = {
  key: 0,
  id: "bookmark-board-header",
  class: "launcher-page-tabs"
}, pd = ["data-page"], fd = ["href", "title", "data-launcher-id", "onPointerdown", "onClick", "onContextmenu"], gd = ["title", "data-launcher-folder", "onPointerdown", "onDragstart", "onDrop", "onClick", "onContextmenu"], hd = ["title", "onClick"], md = {
  class: "launcher-folder-count",
  hidden: ""
}, vd = {
  class: "launcher-empty",
  key: "empty-msg"
}, yd = {
  key: 1,
  class: "launcher-media-stack"
}, wd = {
  key: 1,
  id: "launcher-bili"
}, bd = { class: "launcher-folder-preview" }, kd = { class: "launcher-folder-label launcher-title" }, _d = { class: "launcher-label launcher-title" }, Cd = /* @__PURE__ */ le({
  __name: "FavoriteSites",
  setup(e) {
    const t = G(() => import("./BookmarkBoard-C0RXtf6T.js")), o = H("sites"), i = H(!1);
    He(() => {
      xe.setExternalDragHandler(x), xe.setExternalDropHandler(E);
      const v = window;
      ae.hasBili && typeof v.ensureLauncherMediaCards == "function" && v.ensureLauncherMediaCards();
    });
    const a = H(!1), l = H(""), h = H(null), f = H(null), p = H(null), w = H(null);
    let k = !1, M = 0, g = 0, u = 0, d = "", b = 0, C = "", y = 0;
    function x(v) {
      if (o.value !== "sites") return;
      if (!v || Ge.isOpen) {
        w.value && (w.value = null), C = "";
        return;
      }
      const _ = document.elementsFromPoint(v.clientX, v.clientY);
      if (!_.some(
        (Pe) => Pe.classList.contains("launcher-site-items") || !!Pe.closest?.(".launcher-site-items")
      )) {
        w.value && (w.value = null), C = "";
        return;
      }
      const D = _.find((Pe) => Pe.classList.contains("launcher-link") && Pe.getAttribute("data-launcher-id") !== String(v.link.id) || Pe.classList.contains("launcher-folder"));
      if (!D) return;
      const J = D.classList.contains("launcher-link"), fe = J ? D.getAttribute("data-launcher-id") : null, Ie = J ? null : D.getAttribute("data-launcher-folder"), te = J ? `link-${fe}` : `folder-${Ie}`, ie = D.getBoundingClientRect(), Be = ie.left + ie.width / 2, an = ie.top + ie.height / 2, so = Math.hypot(v.clientX - Be, v.clientY - an), Wt = Date.now();
      if (so > Math.max(ie.width, ie.height) * 0.55 || te === C && Wt - y < 180) return;
      const Ot = et.value.filter(
        (Pe) => Pe.type !== "link" || String(Pe.link.id) !== String(v.link.id)
      ), it = [...w.value || Ot], vt = it.findIndex(
        (Pe) => Pe.type === "link" && String(Pe.link.id) === String(v.link.id)
      ), yt = it.findIndex((Pe) => Pe.key === te);
      if (yt < 0) return;
      const Xe = {
        key: `link-${v.link.id}`,
        type: "link",
        link: v.link
      };
      vt >= 0 ? vt !== yt && (it.splice(vt, 1), it.splice(yt, 0, Xe), w.value = it, C = te, y = Wt) : (it.splice(yt, 0, Xe), w.value = it, C = te, y = Wt);
    }
    async function E(v) {
      if (o.value !== "sites" || Ge.isOpen) return !1;
      if (w.value) {
        const _ = w.value.map(($) => ({
          type: $.type,
          id: $.type === "link" ? String($.link.id) : void 0,
          groupName: $.type === "folder" ? $.folder.groupName : void 0
        }));
        return await oe.moveLinkTo(String(v.id), ae.activePage, "常用网站"), await oe.reorderPageItems(ae.activePage, _), w.value = null, C = "", !0;
      }
      return !1;
    }
    const T = ke({
      visible: !1,
      x: 0,
      y: 0,
      type: "link",
      link: null,
      folder: null,
      offsetX: 34,
      offsetY: 38
    });
    let L = null, S = 0, A = 0, P = null, Y = null, Z = !1;
    function B(v, _) {
      if (_.button !== 0) return;
      L = _.pointerId, S = _.clientX, A = _.clientY, g = _.clientX, u = _.clientY, P = String(v.id), Y = null, Z = !1;
      const $ = _.currentTarget.getBoundingClientRect();
      T.offsetX = _.clientX - $.left, T.offsetY = _.clientY - $.top, T.type = "link", T.link = v, T.folder = null, window.addEventListener("pointermove", W, { passive: !1 }), window.addEventListener("pointerup", F), window.addEventListener("pointercancel", F);
    }
    function K(v, _, $) {
      if ($.button !== 0 || $.target.closest(".launcher-folder-del-btn")) return;
      L = $.pointerId, S = $.clientX, A = $.clientY, g = $.clientX, u = $.clientY, P = null, Y = v, Z = !1;
      const D = $.currentTarget.getBoundingClientRect();
      T.offsetX = $.clientX - D.left, T.offsetY = $.clientY - D.top, T.type = "folder", T.folder = {
        groupName: v,
        size: me(v),
        links: _?.links || []
      }, T.link = null, window.addEventListener("pointermove", W, { passive: !1 }), window.addEventListener("pointerup", F), window.addEventListener("pointercancel", F);
    }
    let R = 0, X = null;
    function _e() {
      cancelAnimationFrame(R), R = 0, X = null;
    }
    function W(v) {
      v.pointerId === L && (Z && v.cancelable && v.preventDefault(), X = v, !R && (R = requestAnimationFrame(() => {
        R = 0;
        const _ = X;
        X = null, _ && O(_);
      })));
    }
    function O(v) {
      if (v.pointerId !== L || !P && !Y) return;
      const _ = Math.hypot(v.clientX - S, v.clientY - A);
      if (!Z && _ > Fc && (Z = !0, k = !0, P ? f.value = P : Y && (p.value = Y)), !Z) return;
      (T.link || T.folder) && (T.visible = !0, T.x = v.clientX - T.offsetX, T.y = v.clientY - T.offsetY);
      const $ = document.elementsFromPoint(v.clientX, v.clientY);
      if (zn()) {
        const te = $.some(
          (Be) => Be.id === "launcher-folder-dialog" || !!Be.closest?.("#launcher-folder-dialog")
        ), ie = document.querySelector("#launcher-folder-dialog");
        if (te && ie) {
          ie.classList.add("drop-hover-valid"), Ge.dropHoverValid = !0;
          return;
        } else
          ie?.classList.remove("drop-hover-valid"), Ge.dropHoverValid = !1;
        w.value = null;
        return;
      }
      const J = w.value || et.value, fe = P ? `link-${P}` : `folder-${Y}`;
      if (J.length) {
        const te = $.find((ie) => {
          if (ie.classList.contains("launcher-link")) {
            const Be = ie.getAttribute("data-launcher-id");
            return Be && `link-${Be}` !== fe;
          }
          if (ie.classList.contains("launcher-folder")) {
            const Be = ie.getAttribute("data-launcher-folder");
            return Be && `folder-${Be}` !== fe;
          }
          return !1;
        });
        if (te) {
          const ie = te.classList.contains("launcher-link"), Be = ie ? te.getAttribute("data-launcher-id") : null, an = ie ? null : te.getAttribute("data-launcher-folder"), so = ie ? `link-${Be}` : `folder-${an}`, Wt = te.getBoundingClientRect();
          let Ot = !0;
          P && !ie && (Hc(Wt, v.clientX, v.clientY) ? (Ot = !1, te.classList.add("drop-target")) : te.classList.remove("drop-target"));
          const it = Date.now();
          if (jc(Wt, v.clientX, v.clientY) || (Ot = !1), so === d && it - b < Nc && (Ot = !1), Ot) {
            document.querySelectorAll(".launcher-folder.drop-target").forEach((Xe) => Xe.classList.remove("drop-target"));
            const vt = J.findIndex((Xe) => Xe.key === fe), yt = J.findIndex((Xe) => Xe.key === so);
            if (vt >= 0 && yt >= 0 && vt !== yt) {
              const Xe = J.slice(), Pe = Xe.splice(vt, 1)[0];
              Xe.splice(yt, 0, Pe), w.value = Xe, d = so, b = it;
            }
          }
        }
      }
      const Ie = $.find((te) => te.classList.contains("launcher-page-tab"));
      if (Ie) {
        const te = Ie.getAttribute("data-page");
        te && te !== ae.activePage && Ie.classList.add("drop-target");
      } else
        document.querySelectorAll(".launcher-page-tab.drop-target").forEach((te) => te.classList.remove("drop-target"));
    }
    async function F(v) {
      if (v.pointerId === L) {
        _e(), v.type === "pointercancel" ? ge() : O(v), window.removeEventListener("pointermove", W), window.removeEventListener("pointerup", F), window.removeEventListener("pointercancel", F);
        try {
          if (Z) {
            M = Date.now(), k = !1;
            const _ = document.elementsFromPoint(v.clientX, v.clientY);
            if (document.querySelectorAll(".launcher-page-tab.drop-target").forEach((D) => D.classList.remove("drop-target")), document.querySelectorAll(".launcher-folder.drop-target").forEach((D) => D.classList.remove("drop-target")), zn() && Ge.activeFolder) {
              if (_.some(
                (J) => J.id === "launcher-folder-dialog" || !!J.closest?.("#launcher-folder-dialog")
              )) {
                const fe = _.find((Ie) => Ie.hasAttribute("data-child-folder"))?.getAttribute("data-child-folder") || Ge.activeFolder;
                P ? await oe.moveLinkTo(P, void 0, fe) : Y && await oe.moveFolderInto(Y, fe);
              }
              return;
            }
            const $ = _.find((D) => D.classList.contains("launcher-page-tab"));
            if ($) {
              const D = $.getAttribute("data-page");
              if (D) {
                P ? (await oe.moveLinkTo(P, D, "常用网站"), await oe.setPage(D)) : Y && await oe.moveFolderToPage(Y, D), ge();
                return;
              }
            }
            if (P) {
              const D = _.find((J) => J.classList.contains("launcher-folder"));
              if (D) {
                const J = D.getAttribute("data-launcher-folder");
                if (J) {
                  await oe.moveLinkTo(P, ae.activePage, J), ge();
                  return;
                }
              }
            }
            if (w.value) {
              const D = w.value.map((J) => ({
                type: J.type,
                id: J.type === "link" ? String(J.link.id) : void 0,
                groupName: J.type === "folder" ? J.folder.groupName : void 0
              }));
              await oe.reorderPageItems(ae.activePage, D);
            }
          }
        } catch (_) {
          Ae.show({ appName: "常用网站", title: "移动未完成", message: _ instanceof Error ? _.message : "请刷新核对，未自动重试。" });
        } finally {
          ge();
        }
      }
    }
    function ge() {
      _e(), L = null, P = null, Y = null, Z = !1, f.value = null, p.value = null, w.value = null, T.visible = !1, T.link = null, T.folder = null, d = "", document.querySelector("#launcher-folder-dialog")?.classList.remove("drop-hover-valid"), Ge.dropHoverValid = !1;
    }
    Et(() => {
      xe.setExternalDragHandler(null), xe.setExternalDropHandler(null), ge(), window.removeEventListener("pointermove", W), window.removeEventListener("pointerup", F), window.removeEventListener("pointercancel", F);
    });
    function Me(v) {
      const _ = ae.pageLabels;
      return _ && _[v] ? _[v] : v || "常用网站";
    }
    function Ye(v, _) {
      const $ = String(v.page || "").trim(), D = String(_).trim(), J = ae.pageLabels || {}, fe = !$ || $ === "常用网站" || $ === "默认";
      if (!D || D === "常用网站" || D === "默认") return fe;
      if (fe) return !1;
      if ($ === D) return !0;
      const te = J[$] || $, ie = J[D] || D;
      return te === ie || $ === ie || te === D;
    }
    function me(v) {
      const _ = ae.groupSizes;
      return _ && _[v] === "large" ? "large" : "small";
    }
    function qe(v) {
      return v === "large" ? 9 : 4;
    }
    function je(v, _) {
      const $ = qe(_), D = v.length > $ ? $ - 1 : $;
      return v.slice(0, D);
    }
    const et = re(() => {
      const v = ae.activePage || "常用网站", $ = ae.links.filter(
        (te) => Ye(te, v)
      ), D = /* @__PURE__ */ new Map();
      $.forEach((te) => {
        const ie = te.group || "常用网站";
        ie !== "常用网站" && (D.has(ie) || D.set(ie, []), D.get(ie).push(te));
      });
      const J = /* @__PURE__ */ new Set(), fe = [];
      $.forEach((te) => {
        const ie = te.group || "常用网站";
        Yo(ae.folders, ie) || (ie === "常用网站" ? fe.push({ key: `link-${te.id}`, type: "link", link: te }) : J.has(ie) || (J.add(ie), fe.push({
          key: `folder-${ie}`,
          type: "folder",
          folder: {
            groupName: ie,
            pageName: v,
            links: D.get(ie) || []
          }
        })));
      });
      const Ie = ae.folders;
      return Ie && Object.entries(Ie).forEach(([te, ie]) => {
        if (Yo(ae.folders, te)) return;
        const Be = ie?.page || "常用网站";
        (Be === v || v === "常用网站" && Be === "默认") && !J.has(te) && (J.add(te), fe.push({
          key: `folder-${te}`,
          type: "folder",
          folder: {
            groupName: te,
            pageName: v,
            links: D.get(te) || []
          }
        }));
      }), fe;
    }), nt = re(() => w.value && w.value.length ? w.value : et.value), Ke = re(() => {
      const v = ae.activePage || "常用网站", _ = Me(v);
      return _ === "默认" || v === "常用网站" ? "还没有快捷入口，点击“编辑入口”后添加。" : `“${_}”还是空的，把网站拖到这里。`;
    });
    function jn(v) {
      w.value = null, f.value = null, p.value = null, xe.switchPage(v);
    }
    function Vi() {
      a.value = !0, l.value = "", ft(() => {
        h.value?.focus();
      });
    }
    function Kn() {
      if (!a.value) return;
      const v = l.value.trim();
      a.value = !1, v && xe.addPage(v);
    }
    function Yi(v) {
      v.key === "Enter" ? (v.preventDefault(), Kn()) : v.key === "Escape" && (a.value = !1);
    }
    function qi(v, _) {
      xe.openPageMenu(v, _);
    }
    function Xi(v) {
      const _ = v.target;
      if (!_ || _.closest(".launcher-link") || _.closest(".launcher-folder") || _.closest(".launcher-page-tab") || _.closest("button") || _.closest("input"))
        return;
      v.preventDefault();
      const $ = ae.activePage || "常用网站";
      Qt.openBlankMenu($, v.clientX, v.clientY);
    }
    function Ji(v) {
      o.value === "sites" && (!v.shiftKey || ae.pages.length < 2 || (v.preventDefault(), v.deltaY > 0 || v.deltaX > 0 ? xe.nextPage() : xe.prevPage()));
    }
    function Qi(v) {
      v.target.closest(".launcher-page-tab") || v.stopPropagation();
    }
    function Zi(v) {
      v.button === 0 && (g = v.clientX, u = v.clientY);
    }
    function es(v, _) {
      _.preventDefault(), _.stopPropagation(), !(Math.hypot(_.clientX - g, _.clientY - u) >= 6 || k || Date.now() - M < 600) && xe.openLink(v, _);
    }
    function ts(v, _) {
      xe.openLinkMenu(v, _);
    }
    function os(v, _) {
      if (k || Date.now() - M < 450) {
        _.preventDefault(), _.stopPropagation();
        return;
      }
      xe.openFolder(v, _);
    }
    function ns(v, _, $) {
      xe.openFolderMenu(v, _, $);
    }
    function is(v) {
      xe.deleteFolder(v);
    }
    function ss(v, _) {
      const $ = Array.from(_.dataTransfer?.types || []);
      if (!$.includes("application/x-newtab-launcher") && !$.includes("application/x-newtab-bookmark") && !$.includes("text/uri-list") && !$.includes("text/plain")) return;
      _.preventDefault(), _.dataTransfer && (_.dataTransfer.dropEffect = "move"), ae.activePage !== v && jn(v), _.currentTarget?.classList.add("drop-target");
    }
    function as(v) {
      v.currentTarget?.classList.remove("drop-target");
    }
    async function rs(v, _) {
      _.currentTarget?.classList.remove("drop-target");
      let D = "";
      const J = _.dataTransfer?.getData("application/x-newtab-launcher");
      if (J)
        try {
          D = String(JSON.parse(J)?.id || "");
        } catch {
        }
      if (!D && (f.value || window.__activeLauncherLink) && (D = String(window.__activeLauncherLink?.id || f.value || "")), D) {
        _.preventDefault(), _.stopPropagation(), await oe.moveLinkTo(D, v, "常用网站"), await oe.setPage(v);
        return;
      }
      const fe = window;
      typeof fe.importDroppedLauncherItem == "function" && (_.preventDefault(), _.stopPropagation(), await fe.importDroppedLauncherItem(_, "常用网站", v));
    }
    function ls(v) {
      const _ = Array.from(v.dataTransfer?.types || []);
      if (!_.includes("application/x-newtab-launcher") && !_.includes("application/x-newtab-bookmark") && !_.includes("text/uri-list") && !_.includes("text/plain")) return;
      v.preventDefault(), v.dataTransfer && (v.dataTransfer.dropEffect = _.includes("application/x-newtab-launcher") ? "move" : "copy"), v.currentTarget?.classList.add("drop-target");
    }
    function cs(v) {
      const _ = v.currentTarget;
      _?.contains(v.relatedTarget) || _?.classList.remove("drop-target");
    }
    async function ds(v) {
      v.currentTarget?.classList.remove("drop-target");
      let $ = "";
      const D = v.dataTransfer?.getData("application/x-newtab-launcher");
      if (D)
        try {
          $ = String(JSON.parse(D)?.id || "");
        } catch {
        }
      if (!$ && (f.value || window.__activeLauncherLink) && ($ = String(window.__activeLauncherLink?.id || f.value || "")), $) {
        v.preventDefault(), v.stopPropagation(), await oe.moveLinkTo($, ae.activePage, "常用网站");
        return;
      }
      const J = window;
      if (typeof J.importDroppedLauncherItem == "function") {
        v.preventDefault(), v.stopPropagation(), await J.importDroppedLauncherItem(v, "常用网站", ae.activePage);
        return;
      }
      const fe = v.dataTransfer?.getData("text/plain");
      fe && /^https?:\/\//i.test(fe.trim()) && (v.preventDefault(), v.stopPropagation(), await oe.addLink({
        title: "",
        url: fe.trim(),
        page: ae.activePage
      }));
    }
    function zn() {
      if (!Ge.isOpen) return !1;
      if (typeof document < "u") {
        const v = document.querySelector("#launcher-folder-dialog");
        return !!(v && v.open);
      }
      return !1;
    }
    function us(v, _) {
      _.preventDefault();
    }
    function ps(v) {
      v.preventDefault(), v.dataTransfer && (v.dataTransfer.dropEffect = "move"), v.currentTarget?.classList.add("drop-target");
    }
    function fs(v) {
      v.currentTarget?.classList.remove("drop-target");
    }
    async function gs(v, _) {
      _.currentTarget?.classList.remove("drop-target"), _.preventDefault(), _.stopPropagation();
      const D = _.dataTransfer?.getData("application/x-newtab-launcher-folder");
      if (D && D !== v) {
        try {
          await oe.moveFolderInto(D, v);
        } catch (Ie) {
          Ae.show({ appName: "常用网站", title: "移动未完成", message: Ie instanceof Error ? Ie.message : "请刷新后核对。" });
        }
        return;
      }
      let J = "";
      const fe = _.dataTransfer?.getData("application/x-newtab-launcher");
      if (fe)
        try {
          J = String(JSON.parse(fe)?.id || "");
        } catch {
        }
      !J && (f.value || window.__activeLauncherLink) && (J = String(window.__activeLauncherLink?.id || f.value || "")), J && await oe.moveLinkTo(J, ae.activePage, v);
    }
    return (v, _) => (r(), c(z, null, [
      s(ae).showSites ? (r(), c("section", {
        key: 0,
        class: "launcher-group launcher-sites size-large",
        onWheel: Ji
      }, [
        n("header", {
          class: "launcher-group-head launcher-sites-head",
          onPointerdown: _[5] || (_[5] = N(() => {
          }, ["stop"])),
          onContextmenu: Qi
        }, [
          n("div", ad, [
            n("button", {
              type: "button",
              disabled: i.value,
              "aria-pressed": o.value === "sites",
              onClick: _[0] || (_[0] = ($) => o.value = "sites")
            }, "常用网站", 8, rd),
            n("button", {
              type: "button",
              disabled: i.value,
              "aria-pressed": o.value === "bookmarks",
              onClick: _[1] || (_[1] = ($) => o.value = "bookmarks")
            }, "书签", 8, ld)
          ]),
          We(n("div", cd, [
            (r(!0), c(z, null, pe(s(ae).pages, ($) => (r(), c("button", {
              key: $,
              type: "button",
              class: se(["launcher-page-tab", { active: $ === s(ae).activePage }]),
              "data-page": $,
              role: "tab",
              title: `切换到${Me($)}；拖动网站到这里可移动分区；右键管理分区`,
              onPointerdown: _[2] || (_[2] = N(() => {
              }, ["stop"])),
              onClick: N((D) => jn($), ["prevent", "stop"]),
              onContextmenu: N((D) => qi($, D), ["prevent", "stop"]),
              onDragover: (D) => ss($, D),
              onDragleave: _[3] || (_[3] = (D) => as(D)),
              onDrop: (D) => rs($, D)
            }, m(Me($)), 43, dd))), 128)),
            a.value ? We((r(), c("input", {
              key: 1,
              ref_key: "pageInputRef",
              ref: h,
              class: "launcher-page-input",
              maxlength: "12",
              placeholder: "例如：游戏区",
              "onUpdate:modelValue": _[4] || (_[4] = ($) => l.value = $),
              onKeydown: Yi,
              onBlur: Kn
            }, null, 544)), [
              [eo, l.value]
            ]) : (r(), c("button", {
              key: 0,
              class: "launcher-page-add",
              type: "button",
              title: "添加网站分区，例如游戏区",
              "aria-label": "添加网站分区",
              onClick: Vi
            }, " + "))
          ], 512), [
            [to, o.value === "sites"]
          ]),
          o.value === "bookmarks" ? (r(), c("div", ud)) : I("", !0)
        ], 32),
        o.value === "bookmarks" ? (r(), ce(s(t), {
          key: 0,
          "header-target": "#bookmark-board-header",
          onBusy: _[6] || (_[6] = ($) => i.value = $)
        })) : I("", !0),
        We(n("div", {
          class: "launcher-page-panel",
          "data-page": s(ae).activePage,
          hidden: !1,
          role: "tabpanel",
          onContextmenu: Xi,
          onDragover: _[12] || (_[12] = ($) => ls($)),
          onDragleave: _[13] || (_[13] = ($) => cs($)),
          onDrop: _[14] || (_[14] = ($) => ds($))
        }, [
          (r(), ce(Go, {
            tag: "div",
            class: "launcher-items launcher-site-items",
            key: s(ae).activePage,
            name: f.value || p.value ? "launcher-grid" : ""
          }, {
            default: Zt(() => [
              (r(!0), c(z, null, pe(nt.value, ($) => (r(), c(z, {
                key: $.key
              }, [
                $.type === "link" ? (r(), c("a", {
                  key: $.key,
                  class: se(["launcher-link", {
                    "is-dragging": f.value === String($.link.id)
                  }]),
                  href: $.link.url,
                  title: $.link.title + ($.link.note ? `
📝 ` + $.link.note : "") + `
🔗 ` + $.link.url,
                  "data-launcher-id": String($.link.id),
                  target: "_blank",
                  rel: "noreferrer",
                  draggable: "false",
                  onDragstart: _[7] || (_[7] = N(() => {
                  }, ["prevent"])),
                  onPointerdown: (D) => B($.link, D),
                  onMousedown: _[8] || (_[8] = (D) => Zi(D)),
                  onClick: N((D) => es($.link, D), ["prevent"]),
                  onContextmenu: N((D) => ts($.link, D), ["prevent"])
                }, [
                  Q(pi, {
                    link: $.link
                  }, null, 8, ["link"])
                ], 42, fd)) : $.type === "folder" ? (r(), c("div", {
                  key: $.key,
                  class: se(["launcher-folder", [
                    `size-${me($.folder.groupName)}`,
                    { "is-dragging": p.value === $.folder.groupName }
                  ]]),
                  title: `${$.folder.groupName}
可拖动调整位置；右键调整收藏夹大小`,
                  role: "button",
                  tabindex: "0",
                  "data-launcher-folder": String($.folder.groupName),
                  draggable: "true",
                  onPointerdown: (D) => K($.folder.groupName, $.folder, D),
                  onDragstart: (D) => us($.folder.groupName, D),
                  onDragover: _[10] || (_[10] = (D) => ps(D)),
                  onDragleave: _[11] || (_[11] = (D) => fs(D)),
                  onDrop: (D) => gs($.folder.groupName, D),
                  onClick: (D) => os($.folder.groupName, D),
                  onContextmenu: N((D) => ns($.folder.groupName, $.folder.pageName, D), ["prevent"])
                }, [
                  Q(pi, {
                    folder: { title: $.folder.groupName, preview: $.folder.links, count: $.folder.links.length },
                    size: me($.folder.groupName)
                  }, {
                    default: Zt(() => [
                      n("button", {
                        class: "launcher-folder-del-btn",
                        type: "button",
                        title: `删除文件夹「${$.folder.groupName}」`,
                        "aria-label": "删除文件夹",
                        onPointerdown: _[9] || (_[9] = N(() => {
                        }, ["stop"])),
                        onClick: N((D) => is($.folder.groupName), ["stop", "prevent"])
                      }, " ✕ ", 40, hd)
                    ]),
                    _: 2
                  }, 1032, ["folder", "size"]),
                  n("span", md, m($.folder.links.length), 1)
                ], 42, gd)) : I("", !0)
              ], 64))), 128)),
              nt.value.length ? I("", !0) : (r(), c("p", vd, m(Ke.value), 1))
            ]),
            _: 1
          }, 8, ["name"]))
        ], 40, pd), [
          [to, o.value === "sites"]
        ])
      ], 32)) : I("", !0),
      s(ae).hasTodo || s(ae).hasBili ? (r(), c("div", yd, [
        s(ae).hasTodo ? (r(), ce(sd, { key: 0 })) : s(ae).hasBili ? (r(), c("div", wd)) : I("", !0)
      ])) : I("", !0),
      (r(), ce(mt, { to: "body" }, [
        T.visible ? (r(), c("div", {
          key: 0,
          class: se(["launcher-drag-ghost", [
            T.type === "folder" ? `folder-ghost size-${T.folder?.size}` : "link-ghost"
          ]]),
          style: ve({
            left: `${T.x}px`,
            top: `${T.y}px`
          })
        }, [
          T.type === "folder" && T.folder ? (r(), c(z, { key: 0 }, [
            n("div", bd, [
              (r(!0), c(z, null, pe(je(T.folder.links, T.folder.size), ($, D) => (r(), ce(Zo, {
                key: $.id || D,
                link: $,
                mini: !0
              }, null, 8, ["link"]))), 128))
            ]),
            n("span", kd, m(T.folder.groupName), 1)
          ], 64)) : T.link ? (r(), c(z, { key: 1 }, [
            Q(Zo, {
              link: T.link
            }, null, 8, ["link"]),
            n("span", _d, m(T.link.title), 1)
          ], 64)) : I("", !0)
        ], 6)) : I("", !0)
      ]))
    ], 64));
  }
}), zi = /* @__PURE__ */ Te(Cd, [["__scopeId", "data-v-e2bb88a0"]]), Uo = Object.keys(io);
let Fo = !1, Cn = 0, ho, xn;
function gi(e) {
  for (const t of Uo)
    Object.prototype.hasOwnProperty.call(e, t) && (io[t] = e[t] !== !1);
}
function xd() {
  const e = io;
  xe.setPrefs(e.showSites, e.showTodo, !e.showTodo && e.showBili), document.body.classList.toggle("hide-weather", !e.showWeather), document.body.classList.toggle("hide-sites", !e.showSites), document.body.classList.toggle("hide-bili", !e.showBili), document.body.classList.toggle("hide-youtube", !e.showYouTube), document.body.classList.toggle("hide-todo", !e.showTodo), document.body.classList.toggle("hide-bookmarks", !e.showBookmarkPanel), e.showBookmarkPanel || en.close();
}
const hi = {
  start() {
    if (Fo) return;
    Fo = !0;
    const e = ++Cn;
    xn = Ne(() => Uo.map((o) => io[o]), xd, { immediate: !0, flush: "sync" });
    const t = globalThis.chrome;
    ho = (o, i) => {
      if (i !== "local") return;
      const a = {};
      for (const l of Uo) o[l] && (a[l] = o[l].newValue);
      gi(a);
    }, t?.storage?.onChanged?.addListener(ho), t?.storage?.local && t.storage.local.get(Uo).then((o) => {
      Fo && Cn === e && gi(o || {});
    }).catch((o) => console.warn("[HomePrefs] 读取首页设置失败", o));
  },
  stop() {
    Fo = !1, Cn++, xn?.(), xn = void 0, ho && globalThis.chrome?.storage?.onChanged?.removeListener(ho), ho = void 0;
  }
}, $d = {
  id: "launcher",
  class: "launcher",
  "aria-label": "快捷入口"
}, Ld = { class: "launcher-inner" }, Td = { class: "launcher-overview" }, Sd = {
  class: "launcher-widget launcher-weather",
  "data-home-module": "weather",
  title: "右键此处可快速切换天气地点"
}, Md = { id: "weather-body" }, Id = { class: "launcher-center" }, Dd = {
  class: "hero-clock",
  id: "hero-clock"
}, Ad = {
  class: "launcher-widget launcher-task-threads launcher-music-card",
  "data-home-module": "taskThreads"
}, Pd = {
  id: "task-thread-home",
  class: "task-thread-home home-music-body"
}, Ed = /* @__PURE__ */ le({
  __name: "AppLauncher",
  setup(e) {
    He(() => {
      Vo.initWallpaper();
    });
    function t() {
      $e.handleToolClick("music");
    }
    return (o, i) => (r(), c("section", $d, [
      i[5] || (i[5] = n("div", {
        id: "hero-background-media",
        class: "hero-background-media",
        "aria-hidden": "true"
      }, null, -1)),
      n("div", Ld, [
        n("div", Td, [
          We(n("section", Sd, [
            i[1] || (i[1] = n("header", { class: "card-head" }, [
              n("span", {
                class: "bar",
                style: { background: "linear-gradient(180deg,#38bdf8,#818cf8)" }
              }),
              n("h2", { id: "wx-title" }, "天气")
            ], -1)),
            n("div", Md, [
              Q(Hi)
            ])
          ], 512), [
            [to, s(io).showWeather]
          ]),
          n("div", Id, [
            n("div", Dd, [
              Q(sc),
              Q(ji)
            ]),
            n("form", {
              id: "search",
              class: "search",
              onSubmit: i[0] || (i[0] = N(() => {
              }, ["prevent"]))
            }, [
              Q(wi)
            ], 32)
          ]),
          n("section", Ad, [
            n("header", { class: "card-head" }, [
              i[2] || (i[2] = n("span", { class: "bar music-purple" }, null, -1)),
              i[3] || (i[3] = n("h2", null, "播放器", -1)),
              i[4] || (i[4] = n("span", { class: "grow" }, null, -1)),
              n("button", {
                id: "home-music-open-panel",
                class: "home-music-head-btn",
                type: "button",
                title: "打开网易云模块",
                onClick: t
              }, "网易云 ↗")
            ]),
            n("div", Pd, [
              Q(Ki)
            ])
          ])
        ]),
        n("div", {
          id: "launcher-groups",
          class: se(["launcher-groups", { "has-sites": s(ae).showSites, "has-todoist": s(ae).hasTodo, "has-bili": s(ae).hasBili, "has-media": s(ae).hasTodo || s(ae).hasBili }])
        }, [
          Q(zi)
        ], 2)
      ]),
      i[6] || (i[6] = n("input", {
        id: "background-input",
        type: "file",
        accept: "image/*,video/mp4,video/webm,.gif,.mp4,.webm",
        multiple: "",
        hidden: ""
      }, null, -1))
    ]));
  }
}), Jt = ke(/* @__PURE__ */ new Set()), Lt = ke({}), Ue = ke({});
function $n(e) {
  const t = Ve(e);
  if (!t?.lifecycle.canUnmount || t.lifecycle.canUnmount()) return { ok: !0 };
  const o = t.lifecycle.unmountBlockedMessage || "模块操作尚未结束，不能退出或重载。";
  return Ae.show({ appName: t.title, title: "操作进行中", message: o, showActions: !1 }), { ok: !1, error: o };
}
const Ee = {
  // 检查应用是否处于运行显示状态（驱动 Dock 上的小圆点：关闭即熄灭，不保留 macOS 风格后台悬浮绿点）
  isRunning(e) {
    return this.isVisible(e);
  },
  // 检查应用当前是否在屏幕上可见（窗口是否打开）
  isVisible(e) {
    const t = Ve(e);
    return t ? t.lifecycle.isVisible() : cn(e) ? !!Ys[e] : qs(e);
  },
  // 标记应用启动
  markRunning(e) {
    Jt.add(e), (e in Ue || Ve(e)) && (Ue[e] = !0);
  },
  // 获取组件当前的 render key
  getRenderKey(e) {
    return Lt[e] || 0;
  },
  // 打开 / 显示应用窗口
  openApp(e) {
    const t = Ve(e);
    if (t) {
      $e.open(e), t.lifecycle.isVisible() && this.markRunning(e);
      return;
    }
    if (this.markRunning(e), cn(e)) {
      Yn.open(e);
      return;
    }
    $e.open(e);
  },
  // 隐藏/关闭窗口：立即退出可见运行态并熄灭 Dock 指示绿点
  hideApp(e) {
    if (Jt.delete(e), Ve(e)) {
      $e.close(e);
      return;
    }
    if (cn(e)) {
      Yn.close(e);
      return;
    }
    $e.close(e);
  },
  // 真正的关闭（Quit / 彻底从内存与 DOM 中卸载销毁，熄灭小圆点）
  async quitApp(e) {
    if (Ve(e)) {
      const a = $n(e);
      if (!a.ok) return a;
      const l = Ve(e)?.lifecycle.beforeQuit;
      if (l) {
        const p = xt(e);
        try {
          await l();
        } catch {
          const k = "后台停止未确认，窗口保留；未自动重试，请检查后台状态。";
          return Ae.show({ appName: Ve(e).title, title: "未退出", message: k, showActions: !1 }), { ok: !1, error: k };
        }
        if (xt(e) !== p) return { ok: !1, error: "窗口已有后续操作，未卸载。" };
        const w = $n(e);
        if (!w.ok) return w;
      }
      const h = $e.close(e), f = xt(e);
      return Jt.delete(e), Ue[e] = !1, ct.removeActiveTool(e), await h, await ft(), xt(e) === f ? { ok: !0 } : { ok: !1, error: "模块已有后续操作，退出状态已变化。" };
    }
    this.hideApp(e), Jt.delete(e), ct.removeActiveTool(e), e in Ue && (Ue[e] = !1);
    const t = Vs;
    t.activeId === e && (t.activeId = "");
    const o = t.openOrder.indexOf(e);
    o >= 0 && t.openOrder.splice(o, 1);
    const i = t.activeTools.indexOf(e);
    i >= 0 && t.activeTools.splice(i, 1), $e.render();
  },
  // 重新加载（Reload / 单应用热重启，重新初始化组件）
  async reloadApp(e) {
    const t = Ve(e);
    if (t) {
      if (t.lifecycle.canOpen && !t.lifecycle.canOpen()) return { ok: !1, error: "模块当前不能打开，未重载窗口。" };
      const o = $n(e);
      if (!o.ok) return o;
      const i = $e.close(e), a = xt(e);
      return await i, xt(e) !== a ? { ok: !1, error: "模块已有后续操作，重载已取消。" } : (Ue[e] = !1, await ft(), xt(e) !== a ? { ok: !1, error: "模块已有后续操作，未重新打开。" } : (Lt[e] = (Lt[e] || 0) + 1, $e.open(e), t.lifecycle.isVisible() ? (this.markRunning(e), { ok: !0 }) : { ok: !1, error: "模块当前不能打开，未重新显示窗口。" }));
    }
    this.hideApp(e), e in Ue ? (Ue[e] = !1, await ft(), Lt[e] = (Lt[e] || 0) + 1, Ue[e] = !0) : Lt[e] = (Lt[e] || 0) + 1, await ft(), this.openApp(e);
  }
}, Nt = /* @__PURE__ */ le({
  __name: "DockCardModuleHost",
  props: {
    id: {}
  },
  setup(e) {
    const o = Ve(e.id);
    if (!o || o.presentation !== "card") throw new Error("Unknown registered workspace card");
    const i = o;
    i.mountPolicy === "workspace-ready" && Ee.markRunning(i.id), Ne(i.lifecycle.isVisible, (h) => {
      h && Ee.markRunning(i.id);
    }, { immediate: !0, flush: "sync" });
    const a = re(() => !!Ue[i.id]), l = G({
      loader: i.loadView,
      errorComponent: le({
        setup: () => () => i.lifecycle.isVisible() ? lt("section", { class: "card wide card-fullscreen", role: "alert" }, [
          lt("h2", i.title),
          lt("p", "工作区代码加载失败。请先保存其它窗口的草稿，再手动刷新页面；不会自动刷新或重发任务。"),
          lt("button", { type: "button", onClick: i.lifecycle.hide }, "返回首页")
        ]) : null
      })
    });
    return no(() => {
      i.lifecycle.hide(), Jt.delete(i.id), delete Ue[i.id];
    }), (h, f) => a.value ? (r(), ce(_i(s(l)), {
      key: s(Ee).getRenderKey(s(i).id)
    })) : I("", !0);
  }
}), Wd = { class: "logicweaver-workspaces-layer" }, Od = {
  key: 0,
  id: "daily-section",
  class: "wrap"
}, Bd = { id: "vue-todoist-root" }, Rd = { id: "vue-bili-favorites-root" }, Fd = { id: "vue-youtube-root" }, Nd = { id: "vue-pricing-root" }, Hd = { id: "vue-aihot-root" }, jd = /* @__PURE__ */ le({
  __name: "AppWorkspaces",
  setup(e) {
    const t = H(!!xo.activeId);
    return He(() => {
      t.value || (typeof window < "u" && "requestIdleCallback" in window ? window.requestIdleCallback(() => {
        t.value = !0;
      }, { timeout: 80 }) : setTimeout(() => {
        t.value = !0;
      }, 40));
    }), (o, i) => (r(), c("div", Wd, [
      t.value ? (r(), c("main", Od, [
        n("div", Bd, [
          Q(Nt, { id: "todoist" })
        ]),
        n("div", Rd, [
          Q(Nt, { id: "daily-bilibili" })
        ]),
        We(n("div", Fd, [
          Q(Nt, { id: "daily-youtube" })
        ], 512), [
          [to, s(io).showYouTube]
        ]),
        n("div", Nd, [
          Q(Nt, { id: "daily-pricing" })
        ]),
        n("div", Hd, [
          Q(Nt, { id: "daily-aihot" })
        ]),
        Q(Nt, { id: "card-github" })
      ])) : I("", !0)
    ]));
  }
}), Kd = ["aria-label"], zd = { class: "dock-menu-head" }, Ud = { class: "dock-menu-title" }, Gd = ["src", "alt"], Vd = {
  key: 1,
  class: "dock-menu-emoji"
}, Yd = /* @__PURE__ */ le({
  __name: "DockContextMenu",
  props: {
    target: {}
  },
  emits: ["close", "action"],
  setup(e, { emit: t }) {
    const o = e, i = t, a = re(() => !o.target || o.target.type !== "tool" ? !1 : Ee.isRunning(o.target.id)), l = re(() => !o.target || o.target.type !== "tool" ? !1 : Ee.isVisible(o.target.id)), { menuRef: h, style: f } = Ti({
      visible: () => !!o.target,
      anchor: () => o.target || { x: 0, y: 0 },
      placement: Kt.position === "top" ? "below" : "above",
      align: "center",
      gap: 12,
      dismiss: () => i("close")
    });
    function p() {
      o.target && (Ee.openApp(o.target.id), i("close"));
    }
    function w() {
      o.target && (Ee.hideApp(o.target.id), i("close"));
    }
    async function k() {
      o.target && (await Ee.reloadApp(o.target.id), i("close"));
    }
    async function M() {
      if (!o.target) return;
      const d = o.target;
      if ((await Ee.quitApp(d.id))?.ok === !1) {
        i("close");
        return;
      }
      Ae.show({
        appName: d.title,
        title: "已退出应用",
        subtitle: "当前页面的应用已请求退出，不代表外部进程或远端任务已停止",
        icon: d.icon || "assets/logo.png",
        duration: 2800
      }), i("close");
    }
    async function g() {
      if (!o.target) return;
      const d = o.target, b = $o.uninstall(d.id);
      i("close"), await b || Ae.show({
        appName: d.title,
        title: "入口停用未确认",
        subtitle: $o.state.errorMessage || "请打开模块管理核对当前启用状态",
        icon: d.icon || "assets/logo.png",
        duration: 4e3
      });
    }
    function u() {
      if (!o.target) return;
      const b = {
        "daily-bilibili": "https://www.bilibili.com",
        "card-github": "https://github.com",
        "daily-aihot": "https://news.ycombinator.com",
        "daily-youtube": "https://www.youtube.com",
        "daily-pricing": "https://openai.com/api/pricing"
      }[o.target.id] || "https://www.bilibili.com";
      window.open(b, "_blank"), i("close");
    }
    return (d, b) => (r(), ce(mt, { to: "body" }, [
      e.target ? (r(), c("div", {
        key: 0,
        ref_key: "menuRef",
        ref: h,
        role: "group",
        "aria-label": `${e.target.title}操作`,
        class: "dock-context-menu",
        style: ve(s(f)),
        onClick: b[1] || (b[1] = N(() => {
        }, ["stop"])),
        onContextmenu: b[2] || (b[2] = N(() => {
        }, ["prevent"]))
      }, [
        n("div", zd, [
          n("div", Ud, [
            e.target.icon ? (r(), c("img", {
              key: 0,
              class: "dock-menu-icon",
              src: e.target.icon,
              alt: e.target.title
            }, null, 8, Gd)) : e.target.emoji ? (r(), c("span", Vd, m(e.target.emoji), 1)) : I("", !0),
            n("strong", null, m(e.target.title), 1)
          ]),
          e.target.type === "tool" ? (r(), c("span", {
            key: 0,
            class: se(["dock-status-tag", { "is-running": a.value }])
          }, [
            b[3] || (b[3] = n("span", { class: "dock-status-dot" }, null, -1)),
            Oe(" " + m(a.value ? "运行中" : "未启动"), 1)
          ], 2)) : I("", !0)
        ]),
        b[12] || (b[12] = n("div", { class: "dock-menu-divider" }, null, -1)),
        e.target.type === "tool" ? (r(), c(z, { key: 0 }, [
          l.value ? (r(), c("button", {
            key: 1,
            type: "button",
            class: "dock-menu-item",
            onClick: w
          }, [...b[5] || (b[5] = [
            n("span", { class: "dock-menu-symbol" }, "−", -1),
            n("span", null, "隐藏窗口", -1)
          ])])) : (r(), c("button", {
            key: 0,
            type: "button",
            class: "dock-menu-item",
            onClick: p
          }, [...b[4] || (b[4] = [
            n("span", { class: "dock-menu-symbol" }, "↗", -1),
            n("span", null, "打开窗口", -1)
          ])])),
          n("button", {
            type: "button",
            class: "dock-menu-item",
            onClick: k
          }, [...b[6] || (b[6] = [
            n("span", { class: "dock-menu-symbol" }, "⟲", -1),
            n("div", { class: "dock-menu-text" }, [
              n("span", null, "重新加载"),
              n("small", null, "单应用热重启")
            ], -1)
          ])]),
          b[9] || (b[9] = n("div", { class: "dock-menu-divider" }, null, -1)),
          n("button", {
            type: "button",
            class: "dock-menu-item",
            onClick: g
          }, [...b[7] || (b[7] = [
            n("span", { class: "dock-menu-symbol" }, "📌", -1),
            n("div", { class: "dock-menu-text" }, [
              n("span", null, "从 Dock 栏移出"),
              n("small", null, "可在模块管理中重新添加")
            ], -1)
          ])]),
          n("button", {
            type: "button",
            class: "dock-menu-item item-danger",
            onClick: M
          }, [...b[8] || (b[8] = [
            n("span", { class: "dock-menu-symbol" }, "✕", -1),
            n("div", { class: "dock-menu-text" }, [
              n("span", null, "真正的关闭"),
              n("small", null, "退出并释放内存")
            ], -1)
          ])])
        ], 64)) : e.target.type === "card" ? (r(), c("button", {
          key: 1,
          type: "button",
          class: "dock-menu-item",
          onClick: u
        }, [...b[10] || (b[10] = [
          n("span", { class: "dock-menu-symbol" }, "↗", -1),
          n("span", null, "在新标签页打开官网", -1)
        ])])) : (r(), c("button", {
          key: 2,
          type: "button",
          class: "dock-menu-item",
          onClick: b[0] || (b[0] = (C) => i("close"))
        }, [...b[11] || (b[11] = [
          n("span", { class: "dock-menu-symbol" }, "🏠", -1),
          n("span", null, "返回常用主页", -1)
        ])]))
      ], 44, Kd)) : I("", !0)
    ]));
  }
}), qd = /* @__PURE__ */ Te(Yd, [["__scopeId", "data-v-3aa85877"]]), Xd = { class: "mac-dock-shelf" }, Jd = ["data-dock-target", "title", "onPointerdown", "onClick", "onContextmenu"], Qd = ["src", "alt"], Zd = {
  key: 0,
  class: "mac-dock-dot",
  "aria-hidden": "true"
}, eu = ["data-dock-tool", "title", "onPointerdown", "onClick", "onContextmenu"], tu = ["src", "alt"], ou = {
  key: 1,
  class: "mac-dock-emoji",
  "aria-hidden": "true"
}, nu = {
  key: 2,
  class: "mac-dock-dot",
  "aria-hidden": "true"
}, iu = {
  key: 3,
  class: "mac-dock-badge"
}, su = ["src"], au = {
  key: 1,
  class: "mac-dock-emoji"
}, ru = /* @__PURE__ */ le({
  __name: "MacDock",
  setup(e) {
    const t = re(() => Kt), o = H(null), i = re(() => Object.fromEntries(Kt.tools.map((B) => {
      const K = Ve(B.id)?.badgeCount?.() || 0;
      return [B.id, Number.isFinite(K) ? Math.max(0, Math.floor(K)) : 0];
    })));
    function a(B) {
      B.stopPropagation(), o.value = null, M(B.currentTarget), $o.open();
    }
    function l(B, K) {
      K.stopPropagation(), o.value = null, M(K.currentTarget), ct.triggerItem("target", B);
    }
    function h(B, K) {
      const X = K.currentTarget.getBoundingClientRect(), _e = Kt.position, W = _e === "left" || _e === "right";
      o.value = {
        type: "card",
        id: B.id,
        title: B.title,
        icon: B.icon,
        x: W ? _e === "left" ? X.right + 8 : X.left - 8 : X.left + X.width / 2,
        y: W ? X.top + X.height / 2 : _e === "top" ? X.bottom + 8 : X.top
      };
    }
    function f(B) {
      B.stopPropagation(), o.value = null, M(B.currentTarget), ct.triggerItem("home", "home-launcher");
    }
    function p(B, K) {
      K.stopPropagation(), o.value = null, M(K.currentTarget), Ve(B) || Ee.markRunning(B), ct.triggerItem("tool", B);
    }
    function w(B, K) {
      const X = K.currentTarget.getBoundingClientRect(), _e = Kt.position, W = _e === "left" || _e === "right";
      o.value = {
        type: "tool",
        id: B.id,
        title: B.title,
        icon: B.icon,
        emoji: B.emoji,
        x: W ? _e === "left" ? X.right + 8 : X.left - 8 : X.left + X.width / 2,
        y: W ? X.top + X.height / 2 : _e === "top" ? X.bottom + 8 : X.top
      };
    }
    const k = /* @__PURE__ */ new Map();
    function M(B) {
      if (!B || (k.get(B)?.cancel(), window.matchMedia("(prefers-reduced-motion: reduce)").matches)) return;
      const K = B.animate([
        { translate: "0 0", offset: 0 },
        { translate: "0 -8px", offset: 0.35 },
        { translate: "0 0", offset: 0.65 },
        { translate: "0 -2px", offset: 0.85 },
        { translate: "0 0", offset: 1 }
      ], { duration: 350, easing: "ease" });
      k.set(B, K);
      const R = () => {
        k.get(B) === K && k.delete(B);
      };
      K.onfinish = R, K.oncancel = R;
    }
    const g = H(null), u = ke({
      visible: !1,
      x: 0,
      y: 0,
      width: 40,
      height: 40,
      item: null,
      type: "tool"
    }), d = H(null), b = H(null), C = re(() => d.value || t.value.cards), y = re(() => b.value || t.value.tools);
    let x = "", E = 0, T = !1, L = 0;
    function S(B, K, R) {
      if (R.button !== 0 || R.target.closest(".mac-dock-market-btn")) return;
      const W = R.currentTarget.getBoundingClientRect();
      T = !1, g.value = {
        type: B,
        id: K.id,
        item: K,
        startX: R.clientX,
        startY: R.clientY,
        initialLeft: W.left,
        initialTop: W.top,
        width: W.width,
        height: W.height
      }, window.addEventListener("pointermove", A), window.addEventListener("pointerup", P), window.addEventListener("pointercancel", P);
    }
    function A(B) {
      if (!g.value) return;
      const K = B.clientX - g.value.startX, R = B.clientY - g.value.startY, X = Math.hypot(K, R);
      if (!T && X > 5 && (T = !0, u.visible = !0, u.item = g.value.item, u.type = g.value.type, u.width = g.value.width, u.height = g.value.height, g.value.type === "card" ? d.value = [...t.value.cards] : b.value = [...t.value.tools]), !T) return;
      u.x = B.clientX - u.width / 2, u.y = B.clientY - u.height / 2;
      const W = document.elementsFromPoint(B.clientX, B.clientY).find(
        (me) => me.classList.contains("mac-dock-item") && !me.classList.contains("mac-dock-market-btn")
      );
      if (!W) return;
      const O = W.getAttribute("data-dock-target"), F = W.getAttribute("data-dock-tool"), ge = g.value.type, Me = g.value.id, Ye = Date.now();
      if (ge === "card" && O && O !== Me && O !== "home-launcher") {
        const me = W.getBoundingClientRect(), qe = me.left + me.width / 2;
        if (Math.abs(B.clientX - qe) > me.width * 0.55 || O === x && Ye - E < 180) return;
        const je = [...d.value || t.value.cards], et = je.findIndex((Ke) => Ke.id === Me), nt = je.findIndex((Ke) => Ke.id === O);
        if (et >= 0 && nt >= 0 && et !== nt) {
          const Ke = je.splice(et, 1)[0];
          je.splice(nt, 0, Ke), d.value = je, x = O, E = Ye;
        }
      } else if (ge === "tool" && F && F !== Me) {
        const me = W.getBoundingClientRect(), qe = me.left + me.width / 2;
        if (Math.abs(B.clientX - qe) > me.width * 0.55 || F === x && Ye - E < 180) return;
        const je = [...b.value || t.value.tools], et = je.findIndex((Ke) => Ke.id === Me), nt = je.findIndex((Ke) => Ke.id === F);
        if (et >= 0 && nt >= 0 && et !== nt) {
          const Ke = je.splice(et, 1)[0];
          je.splice(nt, 0, Ke), b.value = je, x = F, E = Ye;
        }
      }
    }
    function P() {
      window.removeEventListener("pointermove", A), window.removeEventListener("pointerup", P), window.removeEventListener("pointercancel", P), T && g.value && (L = Date.now() + 250, g.value.type === "card" && d.value ? ct.reorderCards(d.value.map((B) => B.id)) : g.value.type === "tool" && b.value && ct.reorderTools(b.value.map((B) => B.id))), u.visible = !1, u.item = null, d.value = null, b.value = null, g.value = null, T = !1, x = "";
    }
    function Y(B, K) {
      Date.now() < L || l(B, K);
    }
    function Z(B, K) {
      Date.now() < L || p(B, K);
    }
    return no(() => {
      for (const B of k.values()) B.cancel();
      k.clear(), window.removeEventListener("pointermove", A), window.removeEventListener("pointerup", P), window.removeEventListener("pointercancel", P);
    }), (B, K) => (r(), c(z, null, [
      n("div", Xd, [
        Q(Go, {
          tag: "div",
          class: "mac-dock-group mac-dock-cards-group",
          name: "dock-item-motion"
        }, {
          default: Zt(() => [
            (r(!0), c(z, null, pe(C.value, (R) => (r(), c("button", {
              key: R.id,
              class: se(["mac-dock-item", {
                "is-active": t.value.activeTargetId === R.id,
                "is-drag-origin": g.value && g.value.id === R.id
              }]),
              type: "button",
              "data-dock-target": R.id,
              title: R.title,
              onPointerdown: (X) => S("card", R, X),
              onClick: N((X) => Y(R.id, X), ["stop"]),
              onContextmenu: N((X) => h(R, X), ["prevent"])
            }, [
              n("img", {
                class: "mac-dock-icon",
                src: R.icon,
                alt: R.title
              }, null, 8, Qd),
              t.value.activeTargetId === R.id ? (r(), c("span", Zd)) : I("", !0)
            ], 42, Jd))), 128))
          ]),
          _: 1
        }),
        K[5] || (K[5] = n("div", {
          class: "mac-dock-divider",
          "aria-hidden": "true"
        }, null, -1)),
        n("button", {
          class: "mac-dock-item",
          type: "button",
          "data-dock-target": "home-launcher",
          title: "常用主页",
          onClick: K[0] || (K[0] = N((R) => f(R), ["stop"]))
        }, [...K[3] || (K[3] = [
          n("img", {
            class: "mac-dock-icon",
            src: "assets/nav-home.svg",
            alt: "主页"
          }, null, -1)
        ])]),
        K[6] || (K[6] = n("div", {
          class: "mac-dock-divider mac-dock-divider-dark",
          "aria-hidden": "true"
        }, null, -1)),
        Q(Go, {
          tag: "div",
          class: "mac-dock-group mac-dock-tools-group",
          name: "dock-item-motion"
        }, {
          default: Zt(() => [
            (r(!0), c(z, null, pe(y.value, (R) => (r(), c("button", {
              key: R.id,
              class: se(["mac-dock-item", {
                "is-active": s(Ee).isRunning(R.id),
                "is-drag-origin": g.value && g.value.id === R.id
              }]),
              type: "button",
              "data-dock-tool": R.id,
              title: R.title,
              onPointerdown: (X) => S("tool", R, X),
              onClick: N((X) => Z(R.id, X), ["stop"]),
              onContextmenu: N((X) => w(R, X), ["prevent"])
            }, [
              R.icon ? (r(), c("img", {
                key: 0,
                class: "mac-dock-icon",
                src: R.icon,
                alt: R.title
              }, null, 8, tu)) : R.emoji ? (r(), c("span", ou, m(R.emoji), 1)) : I("", !0),
              s(Ee).isRunning(R.id) ? (r(), c("span", nu)) : I("", !0),
              i.value[R.id] > 0 ? (r(), c("span", iu, m(i.value[R.id] > 99 ? "99+" : i.value[R.id]), 1)) : I("", !0)
            ], 42, eu))), 128))
          ]),
          _: 1
        }),
        n("button", {
          class: se(["mac-dock-item mac-dock-market-btn", { "is-active": s($o).state.isOpen }]),
          type: "button",
          title: "模块与全屏插件管理",
          onClick: K[1] || (K[1] = N((R) => a(R), ["stop"]))
        }, [...K[4] || (K[4] = [
          n("span", {
            class: "mac-dock-market-icon",
            "aria-hidden": "true"
          }, "🧩", -1)
        ])], 2)
      ]),
      (r(), ce(mt, { to: "body" }, [
        u.visible && u.item ? (r(), c("div", {
          key: 0,
          class: "mac-dock-drag-ghost",
          style: ve({
            width: u.width + "px",
            height: u.height + "px",
            transform: "translate3d(" + u.x + "px," + u.y + "px, 0)"
          }),
          "aria-hidden": "true"
        }, [
          u.item.icon ? (r(), c("img", {
            key: 0,
            class: "mac-dock-icon",
            src: u.item.icon,
            alt: ""
          }, null, 8, su)) : u.item.emoji ? (r(), c("span", au, m(u.item.emoji), 1)) : I("", !0)
        ], 4)) : I("", !0)
      ])),
      Q(qd, {
        target: o.value,
        onClose: K[2] || (K[2] = (R) => o.value = null)
      }, null, 8, ["target"])
    ], 64));
  }
}), Ui = /* @__PURE__ */ Te(ru, [["__scopeId", "data-v-4528a5df"]]), lu = {
  id: "win-toast-container",
  class: "win-toast-container",
  "aria-live": "polite",
  "aria-relevant": "additions"
}, cu = ["data-toast-fingerprint", "onMouseenter", "onMouseleave"], du = { class: "win-toast-head" }, uu = ["src"], pu = { class: "win-toast-app" }, fu = ["onClick"], gu = ["onClick"], hu = { class: "win-toast-title" }, mu = {
  key: 0,
  class: "win-toast-subtitle"
}, vu = {
  key: 1,
  class: "win-toast-snippet"
}, yu = {
  key: 0,
  class: "win-toast-actions"
}, wu = ["onClick"], bu = ["onClick"], ku = /* @__PURE__ */ le({
  __name: "NotificationHost",
  setup(e) {
    const t = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), a = H({}), l = H({});
    let h = null;
    function f(d) {
      const b = t.get(d);
      b !== void 0 && clearTimeout(b), t.delete(d);
    }
    function p(d, b = d.duration) {
      f(d.id), i.set(d.id, b), o.set(d.id, Date.now()), l.value[d.id] = !1, a.value[d.id] = Math.max(0, Math.min(100, b / d.duration * 100)), ft(() => requestAnimationFrame(() => {
        a.value[d.id] = 0;
      })), t.set(d.id, window.setTimeout(() => {
        t.delete(d.id), Ae.close(d.id);
      }, b));
    }
    function w(d) {
      f(d.id);
      const b = Date.now() - (o.get(d.id) || Date.now()), C = Math.max(0, (i.get(d.id) ?? d.duration) - b);
      i.set(d.id, C), l.value[d.id] = !0, a.value[d.id] = Math.max(0, Math.min(100, C / d.duration * 100));
    }
    function k(d) {
      p(d, Math.max(1500, i.get(d.id) ?? d.duration));
    }
    function M(d) {
      f(d.id), Ae.close(d.id);
    }
    function g(d) {
      if (At.markRead(d.id), M(d), !d.onClick) {
        d.target && At.openTarget(d.target);
        return;
      }
      try {
        Promise.resolve(d.onClick()).catch((b) => console.warn("Notification action failed", b));
      } catch (b) {
        console.warn("Notification action failed", b);
      }
    }
    function u(d) {
      const b = Math.max(500, i.get(d.id) ?? d.duration);
      return {
        width: `${a.value[d.id] ?? 100}%`,
        transition: l.value[d.id] ? "none" : `width ${b}ms linear`
      };
    }
    return He(() => {
      h = new MutationObserver(() => {
        const b = new Set(So.map((C) => C.id));
        for (const C of So)
          !C.closing && !t.has(C.id) && !i.has(C.id) && p(C);
        for (const C of i.keys())
          b.has(C) || (f(C), i.delete(C), o.delete(C), delete a.value[C], delete l.value[C]);
      });
      const d = document.getElementById("win-toast-container");
      d && h.observe(d, { childList: !0 });
      for (const b of So) p(b);
    }), no(() => {
      h?.disconnect(), h = null;
      for (const d of t.values()) clearTimeout(d);
      t.clear();
    }), (d, b) => (r(), ce(mt, { to: "body" }, [
      n("div", lu, [
        Q(Go, { name: "win-toast" }, {
          default: Zt(() => [
            (r(!0), c(z, null, pe(s(So), (C) => (r(), c("article", {
              key: C.id,
              class: se(["win-toast-card", [C.appType, { closing: C.closing }]]),
              "data-toast-fingerprint": C.fingerprint,
              onMouseenter: (y) => w(C),
              onMouseleave: (y) => k(C)
            }, [
              n("header", du, [
                n("img", {
                  src: C.icon,
                  class: "win-toast-icon",
                  alt: ""
                }, null, 8, uu),
                n("span", pu, m(C.appName), 1),
                b[0] || (b[0] = n("span", { class: "win-toast-time" }, "刚刚", -1)),
                n("button", {
                  type: "button",
                  class: "win-toast-close",
                  title: "关闭",
                  "aria-label": "关闭通知",
                  onClick: (y) => M(C)
                }, "✕", 8, fu)
              ]),
              n("button", {
                type: "button",
                class: "win-toast-body win-toast-body-button",
                onClick: (y) => g(C)
              }, [
                n("span", hu, m(C.title), 1),
                C.subtitle ? (r(), c("span", mu, m(C.subtitle), 1)) : I("", !0),
                C.message ? (r(), c("span", vu, m(C.message), 1)) : I("", !0)
              ], 8, gu),
              C.showActions && C.actionLabel ? (r(), c("footer", yu, [
                n("button", {
                  type: "button",
                  class: "win-toast-btn primary",
                  onClick: (y) => g(C)
                }, m(C.actionLabel), 9, wu),
                n("button", {
                  type: "button",
                  class: "win-toast-btn",
                  onClick: (y) => M(C)
                }, "关闭", 8, bu)
              ])) : I("", !0),
              n("div", {
                class: "win-toast-progress",
                style: ve(u(C))
              }, null, 4)
            ], 42, cu))), 128))
          ]),
          _: 1
        })
      ])
    ]));
  }
}), Gi = /* @__PURE__ */ Te(ku, [["__scopeId", "data-v-8ecd30bd"]]), _u = ["id"], Cu = /* @__PURE__ */ le({
  __name: "DockModuleHost",
  setup(e) {
    const t = Xs().filter((o) => o.presentation !== "card").map((o) => {
      Ne(o.lifecycle.isVisible, (a) => {
        a && Ee.markRunning(o.id);
      }, { immediate: !0, flush: "sync" });
      const i = le({
        setup: () => () => lt("section", { class: "dock-module-load-error", role: "alert" }, [
          lt("p", `${o.title} 的界面代码未能加载，并非只能打开一个窗口。`),
          lt("p", "若刚更新过扩展代码，请先保存草稿，再手动刷新整个页面；旧页面引用的分块文件可能已经被移除。不会自动刷新或关闭其它窗口。"),
          lt("button", { type: "button", onClick: () => {
            Ee.reloadApp(o.id);
          } }, "重试此窗口"),
          lt("button", { type: "button", onClick: () => {
            Ee.hideApp(o.id);
          } }, "隐藏窗口")
        ])
      });
      return {
        definition: o,
        mounted: re(() => !!Ue[o.id]),
        view: G({
          loader: o.loadView,
          errorComponent: i
        })
      };
    });
    return no(() => {
      for (const { definition: o } of t)
        $e.close(o.id), Jt.delete(o.id), Ue[o.id] = !1;
    }), (o, i) => (r(!0), c(z, null, pe(s(t), (a) => We((r(), c("div", {
      id: a.definition.rootId,
      key: a.definition.id
    }, [
      a.mounted.value ? (r(), ce(_i(a.view), {
        key: s(Ee).getRenderKey(a.definition.id)
      })) : I("", !0)
    ], 8, _u)), [
      [to, a.definition.lifecycle.isVisible()]
    ])), 128));
  }
}), xu = /* @__PURE__ */ Te(Cu, [["__scopeId", "data-v-8164c563"]]);
function Re(e, t) {
  const o = H(!1);
  return Ne(
    e,
    (i) => {
      i && (o.value = !0);
    },
    { immediate: !0, flush: "sync" }
  ), Pt(o);
}
const $u = ["onKeydown"], Lu = { class: "fo-up-preview-head" }, Tu = ["src"], Su = { class: "fo-up-preview-meta" }, Mu = { class: "fo-up-preview-name-row" }, Iu = ["href"], Du = ["disabled"], Au = { class: "fo-up-preview-sign" }, Pu = { class: "fo-up-preview-videos" }, Eu = {
  key: 0,
  class: "fo-up-preview-loading"
}, Wu = {
  key: 1,
  class: "fo-up-preview-empty"
}, Ou = {
  key: 2,
  class: "fo-up-preview-empty"
}, Bu = ["href"], Ru = ["src"], Fu = {
  key: 0,
  class: "fo-bili-duration"
}, Nu = { class: "fo-up-preview-video-info" }, Hu = ["href"], ju = { class: "fo-up-preview-video-meta" }, Ku = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2394a3b8'%3E%3Cpath d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/%3E%3C/svg%3E", zu = /* @__PURE__ */ le({
  __name: "BiliUpPreview",
  setup(e) {
    const t = H(!1);
    function o() {
      if (!ue.submitting) {
        if (!ue.followed) {
          t.value = !1, zo.toggleFollow();
          return;
        }
        if (!t.value) {
          t.value = !0;
          return;
        }
        t.value = !1, zo.toggleFollow();
      }
    }
    function i() {
      t.value = !1, zo.close();
    }
    return (a, l) => s(ue).open ? (r(), c("div", {
      key: 0,
      class: "fo-up-preview-backdrop",
      onPointerdown: N(i, ["self"])
    }, [
      n("aside", {
        class: "fo-up-preview-popover",
        style: ve({ left: `${s(ue).left}px`, top: `${s(ue).top}px` }),
        onKeydown: Dt(N(i, ["stop", "prevent"]), ["esc"])
      }, [
        n("div", Lu, [
          n("img", {
            class: "fo-up-preview-avatar",
            src: s(ue).face || Ku,
            alt: "",
            referrerpolicy: "no-referrer"
          }, null, 8, Tu),
          n("div", Su, [
            n("div", Mu, [
              n("a", {
                class: "fo-up-preview-name",
                href: `https://space.bilibili.com/${s(ue).mid}`,
                target: "_blank",
                rel: "noreferrer"
              }, m(s(ue).name), 9, Iu),
              n("button", {
                type: "button",
                class: se([
                  s(ue).followed ? "fo-up-preview-unfollow" : "fo-up-preview-follow",
                  { "is-armed": t.value }
                ]),
                disabled: s(ue).submitting,
                onClick: o
              }, m(s(ue).submitting ? "处理中…" : t.value ? "确定取消？" : s(ue).followed ? "取消关注" : "＋ 关注"), 11, Du)
            ]),
            n("p", Au, m(s(ue).sign || "暂无个人简介"), 1)
          ]),
          n("button", {
            type: "button",
            class: "fo-up-preview-close",
            "aria-label": "关闭预览",
            onClick: i
          }, "✕")
        ]),
        l[1] || (l[1] = n("div", { class: "fo-up-preview-title-tag" }, "近期投稿视频（最新 2~3 个）", -1)),
        n("div", Pu, [
          s(ue).loading ? (r(), c("div", Eu, [...l[0] || (l[0] = [
            n("i", null, null, -1),
            n("span", null, "正在读取近期投稿…", -1)
          ])])) : s(ue).error ? (r(), c("p", Wu, m(s(ue).error), 1)) : s(ue).videos.length ? (r(!0), c(z, { key: 3 }, pe(s(ue).videos, (h) => (r(), c("article", {
            key: h.bvid,
            class: "fo-up-preview-video"
          }, [
            n("a", {
              class: "fo-up-preview-thumb",
              href: h.url,
              target: "_blank",
              rel: "noreferrer"
            }, [
              n("img", {
                src: h.cover,
                alt: "",
                loading: "lazy",
                referrerpolicy: "no-referrer"
              }, null, 8, Ru),
              h.duration ? (r(), c("span", Fu, m(h.duration), 1)) : I("", !0)
            ], 8, Bu),
            n("div", Nu, [
              n("a", {
                class: "fo-up-preview-video-title",
                href: h.url,
                target: "_blank",
                rel: "noreferrer"
              }, m(h.title), 9, Hu),
              n("div", ju, [
                n("span", null, "▣ " + m(h.playCount), 1),
                n("span", null, m(h.published), 1)
              ])
            ])
          ]))), 128)) : (r(), c("p", Ou, "该 UP 主近期暂无视频动态"))
        ])
      ], 44, $u)
    ], 32)) : I("", !0);
  }
}), Uu = /* @__PURE__ */ Te(zu, [["__scopeId", "data-v-83b4a8d5"]]), Gu = { class: "logicweaver-overlays-layer" }, Vu = { id: "vue-notification-root" }, Yu = {
  id: "bili-profile-menu",
  class: "bili-profile-menu",
  hidden: ""
}, qu = { id: "vue-bili-message-panel-root" }, Xu = { id: "vue-notification-center-root" }, Ju = { id: "vue-tab-manager-root" }, Qu = { id: "vue-bookmark-menu-root" }, Zu = { id: "vue-bookmark-panel-root" }, ep = { id: "vue-launcher-dialogs-root" }, tp = { id: "vue-launcher-folder-root" }, op = { id: "vue-launcher-menus-root" }, np = { id: "vue-settings-dialog-root" }, ip = { id: "vue-clock-settings-root" }, sp = { id: "vue-bili-theater-root" }, ap = { id: "vue-bili-mini-player-root" }, rp = { id: "vue-ai-dialog-root" }, lp = { id: "vue-aihot-viewer-root" }, cp = { id: "vue-nav-wheel-root" }, dp = { id: "vue-github-detail-root" }, up = { id: "vue-bili-subtitle-modal-root" }, pp = { id: "vue-firecrawl-modal-root" }, fp = { id: "vue-floating-image-viewer-root" }, gp = { id: "vue-command-palette-root" }, hp = /* @__PURE__ */ le({
  __name: "AppOverlays",
  setup(e) {
    const t = Re(() => $o.state.isOpen), o = Re(() => $i.isOpen), i = Re(() => Ko.isOpen), a = Re(() => Mt.state.isOpen), l = Re(() => na.open), h = Re(() => _o.state.isOpen), f = Re(() => $s.isOpen), p = Re(() => ta.isOpen), w = Re(() => Fn.state.isOpen), k = Re(() => As.isOpen), M = Re(() => De.isOpen), g = Re(() => Wn.state.isOpen), u = Re(() => Ge.isOpen), d = Re(() => Rt.editDialog.isOpen || Rt.iconPicker.isOpen || Rt.linkMove.isOpen || Rt.folderMove.isOpen || Rt.groupMerge.isOpen || Rt.folderDelete.isOpen), b = G(() => import("./ProfileMenu-U6Hot9WV.js")), C = G(() => import("./BookmarkNoteMenu-_Rtgf9Rb.js")), y = G(() => import("./BookmarkPanel-BTTf_A_v.js")), x = G(() => import("./ClockSettingsMenu-mPbGtiex.js")), E = G(() => import("./NotificationCenter-C59zGsJm.js")), T = G(() => import("./TabManagerPanel-DmqQekzJ.js")), L = G(() => import("./LauncherDialogs-ByTweiO4.js")), S = G(() => import("./LauncherFolderDialog-BAcQ1UXF.js")), A = G(() => import("./LauncherMenus-N5aWyw_2.js")), P = G(() => import("./SettingsDialog-NmkgbAkX.js")), Y = G(() => import("./BiliMiniPlayer-D8ZHPMoz.js")), Z = G(() => import("./BiliTheaterDialog-DfHz1w_I.js")), B = G(() => import("./BiliMessagePanel-C0A-hvZ3.js")), K = G(() => import("./AiDialog-D8QksQEf.js")), R = G(() => import("./AihotViewer-DJXC8yZ2.js")), X = G(() => import("./NavWheelOverlay-BBANvk8o.js")), _e = G(() => import("./GitHubRepoDetailDrawer-DjEoDE3-.js")), W = G(() => import("./BiliSubtitleModal-C_dC2wWo.js")), O = G(() => import("./FirecrawlModal-DVRBMTNo.js")), F = G(() => import("./FloatingImageViewer-h2EVX26c.js")), ge = G(() => import("./CommandPalette-Coo7ivxS.js")), Me = G(() => import("./AppPromptModal-BeukD1Gs.js")), Ye = G(async () => {
      const [me, qe] = await Promise.all([
        import("./PluginMarketDialog-DpZzfik_.js"),
        import("./plugin-market-B6zN10fA.js")
      ]);
      return xs("logicweaver-market-styles", qe.default), me.default;
    });
    return (me, qe) => (r(), c("div", Gu, [
      n("div", Vu, [
        Q(Gi)
      ]),
      n("div", Yu, [
        Q(s(b))
      ]),
      n("div", qu, [
        s(p) ? (r(), ce(s(B), { key: 0 })) : I("", !0)
      ]),
      n("div", Xu, [
        s(o) ? (r(), ce(s(E), { key: 0 })) : I("", !0)
      ]),
      n("div", Ju, [
        s(i) ? (r(), ce(s(T), { key: 0 })) : I("", !0)
      ]),
      n("div", Qu, [
        s(g) ? (r(), ce(s(C), { key: 0 })) : I("", !0)
      ]),
      n("div", Zu, [
        Q(s(y))
      ]),
      n("div", ep, [
        s(d) ? (r(), ce(s(L), { key: 0 })) : I("", !0)
      ]),
      n("div", tp, [
        s(u) ? (r(), ce(s(S), { key: 0 })) : I("", !0)
      ]),
      n("div", op, [
        Q(s(A))
      ]),
      n("div", np, [
        Q(s(P))
      ]),
      n("div", ip, [
        s(a) ? (r(), ce(s(x), { key: 0 })) : I("", !0)
      ]),
      n("div", sp, [
        s(h) ? (r(), ce(s(Z), { key: 0 })) : I("", !0)
      ]),
      n("div", ap, [
        s(f) ? (r(), ce(s(Y), { key: 0 })) : I("", !0)
      ]),
      n("div", rp, [
        s(w) ? (r(), ce(s(K), { key: 0 })) : I("", !0)
      ]),
      n("div", lp, [
        s(l) ? (r(), ce(s(R), { key: 0 })) : I("", !0)
      ]),
      n("div", cp, [
        Q(s(X))
      ]),
      Q(xu),
      n("div", dp, [
        s(k) ? (r(), ce(s(_e), { key: 0 })) : I("", !0)
      ]),
      n("div", up, [
        Q(s(W))
      ]),
      n("div", pp, [
        Q(s(O))
      ]),
      n("div", fp, [
        Q(s(F))
      ]),
      n("div", gp, [
        s(M) ? (r(), ce(s(ge), { key: 0 })) : I("", !0)
      ]),
      Q(Uu),
      Q(s(Me)),
      s(t) ? (r(), ce(s(Ye), { key: 0 })) : I("", !0)
    ]));
  }
}), mp = ["data-active-workspace"], vp = /* @__PURE__ */ le({
  __name: "App",
  setup(e, { expose: t }) {
    const o = typeof document > "u" ? "" : document.title, i = {
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
    let a = "";
    function l(p, w = "image/svg+xml") {
      if (typeof document > "u") return;
      const k = typeof chrome < "u" && chrome.runtime?.getURL ? chrome.runtime.getURL(p) : p;
      if (a === k) return;
      a = k;
      const M = document.querySelectorAll("link[rel*='icon']");
      if (M.length > 0)
        M.forEach((g) => {
          g.type = w, g.href = k;
        });
      else {
        const g = document.createElement("link");
        g.rel = "icon", g.type = w, g.href = k, document.head.appendChild(g);
      }
    }
    function h() {
      if (typeof document > "u") return;
      const p = i[Mo.value] || i.home;
      if (l(p.icon, p.iconType), V.playing && V.title) {
        const w = V.artist ? ` - ${V.artist}` : "";
        document.title = `▶ ${V.title}${w}`;
        return;
      }
      if (ro.playing && ro.title) {
        document.title = `▶ ${ro.title} · 电台`;
        return;
      }
      document.title = p.title;
    }
    Ne(
      [
        () => Mo.value,
        () => V.playing,
        () => V.title,
        () => V.artist,
        () => ro.playing,
        () => ro.title
      ],
      () => {
        h();
      },
      { immediate: !0 }
    );
    const f = re(() => Mo.value === "home" ? "" : Mo.value);
    return Ne(() => xo.activeId, (p) => {
      document.body.classList.toggle("has-card-fullscreen", !!p);
    }, { immediate: !0, flush: "sync" }), He(() => {
      if (typeof document < "u") {
        document.body.dataset.spa = "1", document.body.classList.remove("is-starting");
        const p = document.getElementById("endfield-loader");
        p && p.remove();
      }
      try {
        Dn.bindGlobalListener(), dt.start(), hi.start(), An.init().catch((p) => console.warn("[Launcher] 初始化失败", p)), typeof chrome < "u" && chrome?.runtime?.sendMessage && setTimeout(() => {
          try {
            chrome.runtime.sendMessage({ type: "cleanupNativeTabs" }, () => {
              chrome.runtime?.lastError;
            });
          } catch {
          }
        }, 400);
      } catch (p) {
        console.warn("[App] Runtime start error:", p);
      }
    }), Et(() => {
      dt.stop(), An.stop(), hi.stop(), document.body.classList.remove("has-card-fullscreen"), typeof document < "u" && o && (document.title = o);
    }), t({
      activeWorkspaceId: f,
      windowManagerController: $e
    }), (p, w) => (r(), c("div", {
      id: "logicweaver-spa-root",
      class: "logicweaver-spa-root",
      "data-active-workspace": f.value || ""
    }, [
      Q(Fa),
      Q(Rr),
      Q(Ed),
      Q(jd),
      n("nav", {
        id: "mac-dock",
        class: se(["mac-dock", "dock-" + s(Kt).position]),
        "aria-label": "快捷应用栏"
      }, [
        Q(Ui)
      ], 2),
      Q(hp)
    ], 8, mp));
  }
}), yp = /* @__PURE__ */ Te(vp, [["__scopeId", "data-v-b35946c1"]]), wp = {
  class: "endfield-stage",
  "aria-hidden": "true"
}, bp = {
  class: "rhinelab-stage",
  "aria-hidden": "true"
}, kp = { class: "rhine-scaler" }, _p = { class: "rhine-center-group" }, Cp = { class: "rhine-auth-status" }, xp = { class: "rhine-auth-text" }, $p = ["hidden"], Lp = { class: "rhine-cinema-caption" }, Tp = /* @__PURE__ */ le({
  __name: "IntroAnimation",
  setup(e) {
    const t = H(window.innerHeight), o = H(window.innerWidth), i = H(!1), a = H(!1), l = H(10), h = H(1), f = H(0), p = /* @__PURE__ */ new Set();
    let w = 0, k = () => {
    };
    const M = re(() => `${String(Math.round(ze.renderedProgress)).padStart(2, "0")}%`), g = re(() => {
      const A = ze.renderedProgress / 100 * t.value + 10;
      return `${Math.min(A, Math.max(0, t.value - 102)).toFixed(1)}px`;
    }), u = re(() => ze.renderedProgress >= 75 ? "START PROCESSING..." : ze.renderedProgress >= 35 ? "REQUEST RECEIVED" : "ID CONFIRMED : JOYCE MOORE"), d = re(() => ze.finished ? "身份验证通过 · 欢迎进入终端" : ze.status ? `身份信息确认 · ${ze.status.replace(/^.*?\/\s*/, "")}` : "身份信息确认：JOYCE MOORE"), b = re(() => String(Math.max(0.35, Math.min(o.value / 1920, t.value / 1080))));
    function C(A, P) {
      const Y = window.setTimeout(() => {
        p.delete(Y), A();
      }, P);
      p.add(Y);
    }
    function y() {
      window.dispatchEvent(new CustomEvent("logicweaver:intro-complete"));
    }
    function x(A) {
      if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
        y();
        return;
      }
      const P = A ? 180 : 260, Y = A ? 200 : 280, Z = performance.now(), B = (K) => {
        const R = K - Z, X = Math.min(1, R / P), _e = 1 - Math.pow(1 - X, 3);
        if (l.value = 10 + _e * Math.max(0, o.value - 10), R > P && (h.value = Math.max(0, 1 - (R - P) / Y)), R >= P + Y) {
          y();
          return;
        }
        w = requestAnimationFrame(B);
      };
      C(() => {
        w = requestAnimationFrame(B);
      }, A ? 60 : 120);
    }
    function E(A) {
      A || (i.value = !0), C(() => {
        a.value = !0, f.value = 6, h.value = 0, C(y, 380);
      }, A ? 40 : 420);
    }
    function T(A) {
      ze.style === "rhinelab" ? E(A) : x(A);
    }
    function L() {
      o.value = window.innerWidth, t.value = window.innerHeight;
    }
    function S(A) {
      ze.finished || (A.key === "Enter" || A.key === " " || A.key === "Escape") && (A.preventDefault(), ht.skip("KEYBOARD SKIP"));
    }
    return He(() => {
      document.documentElement.style.setProperty("--rhine-scale", b.value), window.addEventListener("resize", L, { passive: !0 }), window.addEventListener("keydown", S, !0), k = ha(T), ze.finished && T(ze.forced);
    }), no(() => {
      k(), window.removeEventListener("resize", L), window.removeEventListener("keydown", S, !0), cancelAnimationFrame(w);
      for (const A of p) clearTimeout(A);
      p.clear();
    }), (A, P) => (r(), c("div", {
      class: "intro-vue-content",
      style: ve({ "--rhine-scale": b.value, opacity: h.value, filter: `blur(${f.value}px)` })
    }, [
      n("div", wp, [
        P[2] || (P[2] = n("div", { class: "endfield-loader-texture" }, null, -1)),
        P[3] || (P[3] = n("div", { class: "endfield-loader-rail" }, null, -1)),
        n("div", {
          class: "endfield-loader-fill",
          style: ve({ height: `${s(ze).renderedProgress}%` })
        }, null, 4),
        n("div", {
          class: "endfield-loader-meter",
          style: ve({ top: g.value })
        }, [
          P[1] || (P[1] = n("span", { class: "endfield-loader-tick" }, null, -1)),
          n("b", null, m(M.value), 1),
          n("small", null, m(s(ze).status), 1)
        ], 4),
        P[4] || (P[4] = mo('<section class="endfield-loader-brand"><span class="endfield-loader-kicker">DEEPSEEK HARNESS</span><strong>END</strong><strong>FIELD</strong><span class="endfield-loader-detail"><i class="endfield-loader-chevron"></i><span>EDGE INTELLIGENCE THEME</span><small>TERRA RESEARCH COMMISSION / BOOT SEQUENCE</small><span class="endfield-loader-squares"><i class="on"></i><i class="on"></i><i class="on"></i><i></i><i></i><i></i><i class="on"></i><i class="on"></i><i></i><i></i><i></i><i></i></span></span><em>OVER THE FRONTIER / INTO THE FRONT</em></section>', 1)),
        n("div", {
          class: "endfield-loader-wipe",
          style: ve({ width: `${l.value}px`, opacity: l.value > 10 ? 1 : 0 })
        }, null, 4)
      ]),
      n("div", bp, [
        P[12] || (P[12] = mo('<div class="rhine-background"><svg viewBox="0 0 1920 1080" preserveAspectRatio="none"><g fill="none" stroke="#ffffff" stroke-width="2.5"><path class="rhine-drift-path1" d="M-210 705C-45 705 182 704 247 567C337 377 99 306 4 435S27 680 169 631C309 584 227 314 279 111S568-113 568-113"></path><path class="rhine-drift-path2" d="M1560-80C1374 114 1671 168 1601 323S1371 367 1431 480S1692 666 1559 787S1329 886 1498 1130"></path><circle class="rhine-drift-circle" cx="1450" cy="648" r="346"></circle><circle class="rhine-drift-circle2" cx="1450" cy="648" r="348"></circle></g></svg></div>', 1)),
        n("div", kp, [
          P[10] || (P[10] = mo('<header class="rhine-brand"><h1>RHINE LAB</h1><div class="rhine-brand-sub">SYNTHESIZE INFORMATION</div><p class="rhine-brand-os"><span class="rhine-brand-analysis"><span style="left:2px;">A</span><span style="left:28px;">N</span><span style="left:55px;">A</span><span style="left:81px;">L</span><span style="left:103px;">Y</span><span style="left:129px;">S</span><span style="left:154px;">I</span><span style="left:166px;">S</span></span><b>OS</b></p></header>', 1)),
          n("button", {
            class: "rhine-skip",
            type: "button",
            title: "点击进入系统 (或按 Enter)",
            onClick: P[0] || (P[0] = (Y) => s(ht).skip("ENTER SYSTEM"))
          }, [...P[5] || (P[5] = [
            Oe("ENTER SYSTEM ", -1),
            n("span", null, "↗", -1)
          ])]),
          n("div", _p, [
            P[8] || (P[8] = n("div", { class: "rhine-logo-box" }, [
              n("svg", {
                class: "rhine-logo-svg",
                viewBox: "0 0 310 185",
                "aria-label": "Rhine Lab",
                role: "img"
              }, [
                n("path", {
                  class: "rhine-logo-contour",
                  d: "M295 73C295 41 273 15 240 15C221 15 207 23 192 38C186 43 181 47 176 52C127 96 103 128 70 128C38 128 15 101 15 70C15 39 37 15 70 15C103 15 127 48 156 75C182 99 208 128 240 128C273 128 295 105 295 73Z",
                  fill: "none",
                  stroke: "currentColor",
                  "stroke-width": "26",
                  pathLength: "1"
                }),
                n("path", {
                  class: "rhine-logo-plus",
                  d: "M44 70h50M69 45v50",
                  fill: "none",
                  stroke: "currentColor",
                  "stroke-width": "15"
                }),
                n("path", {
                  class: "rhine-logo-minus",
                  d: "M219 70h44",
                  fill: "none",
                  stroke: "currentColor",
                  "stroke-width": "15"
                }),
                n("text", {
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
            n("div", Cp, [
              P[6] || (P[6] = n("span", { class: "rhine-auth-dot" }, "·", -1)),
              n("span", xp, m(u.value), 1),
              P[7] || (P[7] = n("i", {
                class: "rhine-cursor",
                "aria-hidden": "true"
              }, null, -1))
            ])
          ]),
          n("div", {
            class: se(["rhine-scan", { active: i.value }]),
            hidden: !i.value
          }, [...P[9] || (P[9] = [
            mo('<svg viewBox="0 0 1920 1080" aria-hidden="true"><g fill="none" stroke="#080a08" stroke-linecap="round"><circle class="rhine-scan-circle ring-outer" cx="960" cy="540" r="280" stroke-width="2.5"></circle><circle class="rhine-scan-circle ring-white" cx="960" cy="540" r="260" stroke="#fff" stroke-width="3.5"></circle><circle class="rhine-scan-circle ring-inner" cx="960" cy="540" r="220" stroke-width="2"></circle><circle class="rhine-orbit-dot dot-1" cx="960" cy="260" r="8" fill="#ed821b" stroke="none"></circle><circle class="rhine-orbit-dot dot-2" cx="960" cy="820" r="8" fill="#ed821b" stroke="none"></circle><circle class="rhine-scan-core" cx="960" cy="540" r="6" fill="#080a08" stroke="none"></circle></g></svg><span class="rhine-scan-label">PERMISSION AUTHORIZED</span>', 2)
          ])], 10, $p),
          n("div", Lp, m(d.value), 1),
          P[11] || (P[11] = n("div", { class: "rhine-powered" }, [
            Oe("POWERED BY "),
            n("b", null, "RHINE LAB"),
            n("i")
          ], -1))
        ]),
        n("div", {
          class: se(["rhine-white", { flash: a.value }]),
          "aria-hidden": "true"
        }, null, 2)
      ])
    ], 4));
  }
}), Sp = /* @__PURE__ */ le({
  __name: "ProfileMenu",
  setup(e) {
    function t(o) {
      To.trigger(o);
    }
    return (o, i) => (r(), c(z, null, [
      n("button", {
        type: "button",
        "data-action": "messages",
        onClick: i[0] || (i[0] = N((a) => t("messages"), ["stop"]))
      }, " 通知中心 "),
      n("button", {
        type: "button",
        "data-action": "tabs",
        onClick: i[1] || (i[1] = N((a) => t("tabs"), ["stop"]))
      }, "标签页管理"),
      n("button", {
        type: "button",
        "data-action": "refresh",
        onClick: i[2] || (i[2] = N((a) => t("refresh"), ["stop"]))
      }, " 刷新 B站账号信息 "),
      n("button", {
        type: "button",
        "data-action": "switch",
        onClick: i[3] || (i[3] = N((a) => t("switch"), ["stop"]))
      }, " 切换用户（打开 B站） "),
      n("button", {
        type: "button",
        "data-action": "web",
        onClick: i[4] || (i[4] = N((a) => t("web"), ["stop"]))
      }, " 打开 B站个人中心 ")
    ], 64));
  }
}), Mp = /* @__PURE__ */ le({
  __name: "WorkspaceLaunchers",
  setup(e) {
    function t(o) {
      Rn.openWorkspace(o, !0);
    }
    return (o, i) => (r(), c(z, null, [
      n("button", {
        id: "ai-top-open",
        type: "button",
        onClick: i[0] || (i[0] = (a) => t("ai"))
      }, "AI 助手"),
      n("button", {
        id: "todoist-top-open",
        type: "button",
        onClick: i[1] || (i[1] = (a) => t("todoist"))
      }, "Todoist"),
      n("button", {
        id: "stickers-top-open",
        type: "button",
        onClick: i[2] || (i[2] = (a) => t("stickers"))
      }, "表情包"),
      n("button", {
        id: "calcom-top-open",
        type: "button",
        onClick: i[3] || (i[3] = (a) => t("calcom"))
      }, "预约"),
      n("button", {
        id: "wallpaper-top-open",
        type: "button",
        onClick: i[4] || (i[4] = (a) => t("wallpaper"))
      }, "壁纸库"),
      ki(o.$slots, "default")
    ], 64));
  }
}), Ip = {
  key: 0,
  "aria-label": "AI 分析任务"
}, Dp = { role: "status" }, Ap = ["disabled"], Pp = ["disabled"], Ep = /* @__PURE__ */ le({
  __name: "GitHubStatus",
  setup(e) {
    function t() {
      tn.update({ actionText: "", actionError: !1 });
    }
    return (o, i) => (r(), c(z, null, [
      s(Je).message || s(Je).busy ? (r(), c("section", Ip, [
        n("p", Dp, m(s(Je).repo ? `原任务仓库：${s(Je).repo}。 ` : "") + m(s(Je).message), 1),
        s(Je).busy ? (r(), c("button", {
          key: 0,
          type: "button",
          onClick: i[0] || (i[0] = (a) => s(ot).stopAiAnalysis())
        }, "停止后续分析 / 中断等待")) : I("", !0),
        s(Je).uncertain ? (r(), c(z, { key: 1 }, [
          i[5] || (i[5] = n("p", null, "AI 结果未确认，已阻止本页再次提交。请到供应商核对请求和计费；本页记录在整页关闭或重载后会丢失。", -1)),
          s(Je).unlockConfirmation ? (r(), c(z, { key: 1 }, [
            i[4] || (i[4] = n("p", null, "扩展不能验证供应商任务；确认只解除本页限制，不代表成功，也不会重发请求。", -1)),
            n("button", {
              type: "button",
              disabled: s(Je).busy,
              onClick: i[2] || (i[2] = (a) => s(ot).acknowledgeAiChecked())
            }, "确认解除本页限制", 8, Pp),
            n("button", {
              type: "button",
              onClick: i[3] || (i[3] = (a) => s(Je).unlockConfirmation = !1)
            }, "保持限制")
          ], 64)) : (r(), c("button", {
            key: 0,
            type: "button",
            disabled: s(Je).busy,
            onClick: i[1] || (i[1] = (a) => s(Je).unlockConfirmation = !0)
          }, "我已核对供应商记录", 8, Ap))
        ], 64)) : I("", !0)
      ])) : I("", !0),
      s(_t).actionText && s(_t).actionError ? (r(), c("div", {
        key: 1,
        class: se(["gh-action-status", { error: s(_t).actionError }]),
        role: "status"
      }, [
        n("span", null, m(s(_t).actionText), 1),
        n("button", {
          type: "button",
          class: "gh-action-status-close",
          title: "关闭提示",
          onClick: t
        }, "✕")
      ], 2)) : I("", !0)
    ], 64));
  }
}), Wp = /* @__PURE__ */ Te(Ep, [["__scopeId", "data-v-8fc895fa"]]), Op = {
  key: 0,
  role: "status",
  style: { "font-size": "12px", color: "var(--danger,#ef4444)", padding: "4px 8px", margin: "0 0 6px 0", "border-radius": "6px", background: "var(--surface)" }
}, Bp = {
  key: 0,
  class: "gh-sidebar-divider"
}, Rp = {
  key: 1,
  class: "gh-sidebar-caption"
}, Fp = ["data-folder", "onClick", "onDragover", "onDragleave", "onDrop"], Np = {
  class: "gh-folder-icon-wrap",
  style: { "font-size": "13px", display: "grid", "place-items": "center" }
}, Hp = { key: 0 }, jp = { key: 1 }, Kp = { key: 2 }, zp = {
  key: 3,
  class: "fo-folder-icon",
  style: { color: "currentColor" }
}, Up = ["title"], Gp = { class: "gh-folder-count" }, Vp = ["data-del", "onClick", "onKeydown"], Yp = /* @__PURE__ */ le({
  __name: "GitHubFolders",
  props: {
    active: { type: Boolean, default: !0 }
  },
  setup(e) {
    const t = e, o = H(""), i = () => {
      o.value = "";
    };
    function a(w) {
      return t.active && !kt.busy && vo.folders.some((k) => k.title === w && (k.kind === "custom" || k.kind === "uncategorized"));
    }
    Ne(() => t.active, (w) => {
      i(), window.removeEventListener("dragend", i), window.removeEventListener("drop", i), w && (window.addEventListener("dragend", i), window.addEventListener("drop", i));
    }, { immediate: !0 }), no(() => {
      window.removeEventListener("dragend", i), window.removeEventListener("drop", i);
    });
    function l(w, k) {
      w.stopPropagation(), Tt.delete(k);
    }
    function h(w, k) {
      if (!a(k) || !Array.from(w.dataTransfer?.types || []).includes(Ps)) {
        i();
        return;
      }
      w.preventDefault(), w.dataTransfer && (w.dataTransfer.dropEffect = "move"), o.value = k;
    }
    function f(w, k) {
      const M = w.currentTarget;
      M instanceof Node && w.relatedTarget instanceof Node && M.contains(w.relatedTarget) || o.value === k && (o.value = "");
    }
    function p(w, k) {
      if (i(), !a(k)) return;
      const M = Es(w.dataTransfer);
      M && (w.preventDefault(), w.stopPropagation(), Tt.dropRepository(M, k));
    }
    return (w, k) => (r(), c(z, null, [
      s(kt).message ? (r(), c("p", Op, m(s(kt).message), 1)) : I("", !0),
      (r(!0), c(z, null, pe(s(vo).folders, (M, g) => (r(), c(z, {
        key: M.title
      }, [
        M.kind === "custom" && s(vo).folders[g - 1]?.kind !== "custom" ? (r(), c("div", Bp)) : I("", !0),
        M.kind === "custom" && s(vo).folders[g - 1]?.kind !== "custom" ? (r(), c("div", Rp, "我的文件夹")) : I("", !0),
        n("button", {
          type: "button",
          class: se(["gh-bili-folder", { on: M.active, "drag-into": o.value === M.title }]),
          "data-folder": M.title,
          onClick: (u) => s(Tt).select(M.title),
          onDragover: (u) => h(u, M.title),
          onDragleave: (u) => f(u, M.title),
          onDrop: (u) => p(u, M.title)
        }, [
          n("span", Np, [
            M.kind === "all" ? (r(), c("span", Hp, "⭐")) : M.kind === "used" ? (r(), c("span", jp, "⚡")) : M.kind === "uncategorized" ? (r(), c("span", Kp, "📄")) : (r(), c("i", zp))
          ]),
          n("span", {
            class: "gh-folder-name",
            title: M.title
          }, m(M.title), 9, Up),
          n("small", Gp, m(M.count), 1),
          M.kind === "custom" ? (r(), c("span", {
            key: 0,
            class: "gh-folder-delete",
            title: "删除文件夹",
            "data-del": M.title,
            role: "button",
            tabindex: "0",
            onClick: (u) => l(u, M.title),
            onKeydown: [
              Dt(N((u) => s(Tt).delete(M.title), ["prevent", "stop"]), ["enter"]),
              Dt(N((u) => s(Tt).delete(M.title), ["prevent", "stop"]), ["space"])
            ]
          }, "✕", 40, Vp)) : I("", !0)
        ], 42, Fp)
      ], 64))), 128))
    ], 64));
  }
}), qp = {
  id: "gh-hero-cover",
  class: "gh-bili-cover"
}, Xp = { key: 0 }, Jp = { key: 1 }, Qp = { key: 2 }, Zp = {
  key: 3,
  class: "fo-folder-icon"
}, ef = { class: "gh-bili-heading" }, tf = { class: "gh-hero-title-row" }, of = ["title"], nf = {
  key: 0,
  class: "gh-hero-inline-status",
  role: "status",
  "aria-live": "polite",
  "aria-atomic": "true"
}, sf = ["title"], af = { id: "gh-hero-desc" }, rf = { class: "gh-bili-actions" }, lf = { class: "gh-batch-btn-text" }, cf = /* @__PURE__ */ le({
  __name: "GitHubHero",
  emits: ["open-ai-settings"],
  setup(e, { emit: t }) {
    const o = t;
    return (i, a) => (r(), c(z, null, [
      n("div", qp, [
        s(wt).kind === "all" ? (r(), c("span", Xp, "⭐")) : s(wt).kind === "used" ? (r(), c("span", Jp, "⚡")) : s(wt).kind === "uncategorized" ? (r(), c("span", Qp, "📄")) : (r(), c("i", Zp))
      ]),
      n("div", ef, [
        n("div", tf, [
          n("h3", {
            id: "gh-hero-title",
            title: s(wt).title
          }, m(s(wt).title), 9, of),
          s(_t).actionText && !s(_t).actionError ? (r(), c("div", nf, [
            n("span", {
              class: "gh-hero-status-text",
              title: s(_t).actionText
            }, m(s(_t).actionText), 9, sf),
            n("button", {
              type: "button",
              title: "关闭提示",
              "aria-label": "关闭同步状态提示",
              onClick: a[0] || (a[0] = (l) => s(tn).update({ actionText: "", actionError: !1 }))
            }, "×")
          ])) : I("", !0)
        ]),
        n("p", af, m(s(wt).description), 1)
      ]),
      n("div", rf, [
        n("button", {
          id: "gh-ai-analyze-all-btn",
          type: "button",
          class: "gh-hero-btn",
          title: "仅分析当前筛选下已加载且没有摘要的仓库，不代表全部远端收藏",
          onClick: a[1] || (a[1] = (l) => s(zt).analyzeAll())
        }, "✨ AI 分析已加载项"),
        n("button", {
          id: "gh-ai-settings-btn",
          type: "button",
          class: "gh-hero-btn",
          title: "配置 AI 服务（DeepSeek、Gemini、OpenAI等）",
          onClick: a[2] || (a[2] = (l) => o("open-ai-settings"))
        }, "🤖 AI 设置"),
        n("button", {
          id: "gh-batch-toggle-btn",
          type: "button",
          class: se(["gh-hero-btn gh-batch-toggle-btn", { active: s(wt).batchMode }]),
          title: "批量多选操作",
          onClick: a[3] || (a[3] = (l) => s(zt).toggleBatch())
        }, [
          a[6] || (a[6] = n("span", { class: "gh-batch-btn-icon" }, "☑", -1)),
          n("span", lf, m(s(wt).batchMode ? "返回" : "批量操作"), 1)
        ], 2),
        n("button", {
          id: "gh-refresh-btn",
          type: "button",
          class: "gh-hero-btn",
          title: "只读核对未确认的 Star 状态并刷新列表，不重发远端操作",
          onClick: a[4] || (a[4] = (l) => s(zt).refresh())
        }, "↻ 刷新 / 核对"),
        n("button", {
          id: "gh-hero-add-folder-btn",
          type: "button",
          class: "gh-hero-btn primary",
          onClick: a[5] || (a[5] = (l) => s(zt).createFolder())
        }, "＋ 新建文件夹")
      ])
    ], 64));
  }
}), df = /* @__PURE__ */ Te(cf, [["__scopeId", "data-v-3538adaf"]]), ee = ke({ repo: "", text: "", baseline: "", busy: !1, message: "", storedValue: null });
function mi(e, t = !1) {
  if (!e || ee.busy) return;
  if (ee.repo && ee.text !== ee.baseline) {
    ee.message = "请先保存或明确取消当前草稿，再编辑或清除其它备注。";
    return;
  }
  const o = ot.remarks[e]?.userRemark, i = typeof o == "string" ? o : "";
  Object.assign(ee, {
    repo: e,
    baseline: i,
    text: t ? "" : i,
    storedValue: null,
    message: t ? "清除已准备；点击保存才会清除手写备注，AI 简介不变。" : "仅点击保存或 Enter 才写入；草稿只保留在本页内存。"
  });
}
function Ln() {
  ee.busy || Object.assign(ee, { repo: "", text: "", baseline: "", storedValue: null, message: "" });
}
async function Tn() {
  if (ee.busy || !ee.repo) return;
  const { repo: e, text: t, baseline: o } = ee;
  ee.busy = !0;
  try {
    await ot.updateRepoRemark(e, { userRemark: t.trim() }, o), Object.assign(ee, { repo: "", text: "", baseline: "", storedValue: null, message: `${e} 的备注已保存并回读核对。` });
  } catch (i) {
    ee.message = i instanceof Error ? i.message : "保存未确认，草稿保留，请先读取已保存值核对。";
  } finally {
    ee.busy = !1;
  }
}
async function vi() {
  if (ee.busy || !ee.repo) return;
  const e = ee.repo;
  ee.busy = !0;
  try {
    const o = (await ot.reloadRepoRemarks())[e]?.userRemark;
    if (o !== void 0 && typeof o != "string") throw new Error("保存值格式异常，未变更草稿或覆盖基准。");
    ee.storedValue = o ?? "", ee.baseline = o ?? "", ee.message = "已读取保存值，草稿没有替换。请对比下方保存值；再次点击保存将以草稿替换它。";
  } catch (t) {
    ee.message = t instanceof Error ? t.message : "读取失败，草稿保留。";
  } finally {
    ee.busy = !1;
  }
}
const uf = ["disabled"], pf = ["disabled"], ff = ["disabled"], gf = ["disabled"], hf = {
  key: 0,
  style: { width: "100%", "white-space": "pre-wrap", "overflow-wrap": "anywhere" }
}, yi = /* @__PURE__ */ le({
  __name: "GitHubRemarkEditor",
  props: {
    active: { type: Boolean }
  },
  setup(e) {
    const t = e, o = H(null);
    return He(() => {
      ft(() => {
        t.active && !ee.busy && o.value?.focus();
      });
    }), (i, a) => (r(), c("div", {
      class: "gh-inline-remark-box",
      style: { "flex-wrap": "wrap", "max-width": "100%" },
      onClick: a[6] || (a[6] = N(() => {
      }, ["stop"]))
    }, [
      We(n("input", {
        ref_key: "input",
        ref: o,
        "onUpdate:modelValue": a[0] || (a[0] = (l) => s(ee).text = l),
        class: "gh-inline-remark-input",
        type: "text",
        maxlength: "100",
        "aria-label": "手写仓库备注",
        placeholder: "备注说明…",
        disabled: s(ee).busy || !e.active,
        onKeydown: [
          a[1] || (a[1] = Dt(N((l) => !l.isComposing && e.active && s(Tn)(), ["prevent"]), ["enter"])),
          a[2] || (a[2] = Dt(N((l) => !l.isComposing && e.active && s(Ln)(), ["prevent", "stop"]), ["esc"]))
        ]
      }, null, 40, uf), [
        [eo, s(ee).text]
      ]),
      n("button", {
        type: "button",
        class: "gh-inline-remark-btn save",
        title: "保存备注",
        disabled: s(ee).busy || !e.active,
        onClick: a[3] || (a[3] = //@ts-ignore
        (...l) => s(Tn) && s(Tn)(...l))
      }, "✓", 8, pf),
      n("button", {
        type: "button",
        class: "gh-inline-remark-btn cancel",
        title: "取消草稿",
        disabled: s(ee).busy || !e.active,
        onClick: a[4] || (a[4] = //@ts-ignore
        (...l) => s(Ln) && s(Ln)(...l))
      }, "✕", 8, ff),
      n("button", {
        type: "button",
        disabled: s(ee).busy || !e.active,
        onClick: a[5] || (a[5] = //@ts-ignore
        (...l) => s(vi) && s(vi)(...l))
      }, "读取已保存值", 8, gf),
      s(ee).storedValue !== null ? (r(), c("p", hf, "已保存值：" + m(s(ee).storedValue || "（空）"), 1)) : I("", !0)
    ]));
  }
}), mf = {
  key: 0,
  role: "status"
}, vf = {
  key: 1,
  "aria-label": "未显示仓库的备注草稿"
}, yf = {
  key: 2,
  class: "gh-search-options",
  style: { margin: "0 0 10px" }
}, wf = { style: { "font-size": "12px", color: "var(--dim)" } }, bf = {
  key: 3,
  class: "muted small"
}, kf = ["data-repo-name", "onClick", "onContextmenu", "onDragstart"], _f = ["onClick"], Cf = { class: "gh-card-head" }, xf = ["checked", "onChange"], $f = ["src"], Lf = ["href", "title"], Tf = { class: "owner" }, Sf = { class: "gh-card-body" }, Mf = { class: "gh-card-badges" }, If = ["title", "onClick"], Df = ["title", "onClick"], Af = { class: "gh-badge-remark-text" }, Pf = ["onClick"], Ef = ["href"], Wf = {
  key: 0,
  class: "desc gh-desc-analyzing",
  title: "正在使用 AI 分析仓库…"
}, Of = {
  key: 1,
  class: "desc gh-desc-ai",
  title: "AI 中文简介（点击可直接修改，右键可重新分析）"
}, Bf = ["title"], Rf = {
  key: 3,
  class: "desc dim"
}, Ff = { class: "meta" }, Nf = { class: "gh-stars" }, Hf = {
  key: 0,
  class: "gh-lang"
}, jf = {
  key: 1,
  class: "gh-updated"
}, Kf = {
  key: 5,
  class: "gh-pager"
}, zf = ["disabled"], Uf = { class: "gh-page-info" }, Gf = ["disabled"], Vf = ["onClick"], Yf = /* @__PURE__ */ le({
  __name: "GitHubRepositories",
  props: {
    active: { type: Boolean, default: !0 }
  },
  setup(e) {
    const t = e, o = re(() => !!ee.repo && !Ce.cards.some((T) => T.fullName === ee.repo)), i = ke({
      visible: !1,
      x: 0,
      y: 0,
      fullName: "",
      folder: "",
      used: !1,
      hasRemark: !1,
      url: ""
    }), a = H(null), l = H(!1);
    function h(T, L) {
      const S = T.target;
      if (S instanceof Element) {
        if (Ce.batchMode) {
          if (S.closest(".fo-card-more,.gh-badge-folder,.gh-badge-used,.gh-badge-remark,.gh-inline-remark-box")) return;
          T.preventDefault(), T.stopPropagation(), at.toggleSelection(L.fullName);
          return;
        }
        S.closest("a,button,.gh-badge-folder,.gh-badge-used,.gh-badge-remark,.fo-card-more,.gh-card-hole,.gh-card-checkbox,.gh-inline-remark-box") || (T.preventDefault(), T.stopPropagation(), Ws.open(L.fullName, void 0, L));
      }
    }
    function f(T, L) {
      if (!t.active) return;
      T.preventDefault(), T.stopPropagation();
      const S = 12, A = 160, P = 280, Y = Math.min(window.innerWidth - A - S, Math.max(S, T.clientX)), Z = Math.min(window.innerHeight - P - S, Math.max(S, T.clientY));
      i.x = Y, i.y = Z, i.fullName = L.fullName, i.folder = L.folder || "", i.used = !!L.used, i.hasRemark = !!L.customRemark, i.url = L.url, i.visible = !0, a.value = null, l.value = Y > window.innerWidth - 380;
    }
    function p(T, L) {
      f(L, T), a.value = "folder";
    }
    function w() {
      i.visible = !1, a.value = null;
    }
    function k(T) {
      ot.setRepoFolder(i.fullName, T), w();
    }
    function M(T) {
      if (!t.active) return;
      const L = typeof T == "string" ? T : T?.fullName || i.fullName;
      w(), mi(L);
    }
    function g() {
      if (!t.active) return;
      const T = i.fullName;
      w(), mi(T, !0);
    }
    async function u() {
      const T = i.url;
      if (w(), T && t.active)
        try {
          await navigator.clipboard.writeText(T);
        } catch {
        }
    }
    function d(T) {
      const L = ot.findRepository(i.fullName);
      w(), L && Ls.sendGitHubShare({
        fullName: L.full_name,
        name: L.name,
        owner: L.owner?.login,
        ownerAvatar: L.owner?.avatar_url,
        desc: L.description || void 0,
        language: L.language || void 0,
        stars: L.stargazers_count,
        category: i.folder || "未分类",
        url: L.html_url || `https://github.com/${L.full_name}`,
        updatedAt: L.updated_at ? L.updated_at.split("T")[0] : void 0
      }, T);
    }
    function b() {
      i.url && window.open(i.url, "_blank", "noreferrer"), w();
    }
    async function C() {
      const T = ot.findRepository(i.fullName);
      if (!T) {
        w();
        return;
      }
      w(), await ot.confirmUnstarRepository(T);
    }
    function y(T) {
      const L = T.target;
      L?.closest(".gh-repo-context-menu") || L?.closest(".gh-inline-remark-box") || w();
    }
    function x(T) {
      T.key === "Escape" && i.visible && w();
    }
    Ne(() => t.active, (T) => {
      window.removeEventListener("pointerdown", y), window.removeEventListener("keydown", x), w(), T && (window.addEventListener("pointerdown", y), window.addEventListener("keydown", x));
    }, { immediate: !0 }), Et(() => {
      window.removeEventListener("pointerdown", y), window.removeEventListener("keydown", x);
    });
    function E(T, L) {
      const S = T.target;
      if (S instanceof Element && S.closest("button,a,input,textarea,select,[contenteditable='true']")) {
        T.preventDefault();
        return;
      }
      at.startDrag(L, T);
    }
    return (T, L) => (r(), c(z, null, [
      s(ee).message ? (r(), c("p", mf, m(s(ee).repo ? `${s(ee).repo}：` : "") + m(s(ee).message), 1)) : I("", !0),
      o.value ? (r(), c("section", vf, [
        n("p", null, "备注草稿：" + m(s(ee).repo) + "（仓库不在当前列表中，草稿仍保留）", 1),
        Q(yi, {
          active: t.active
        }, null, 8, ["active"])
      ])) : I("", !0),
      s(Ce).searchMessage ? (r(), c("div", yf, [
        n("span", wf, m(s(Ce).searchMessage), 1),
        n("button", {
          type: "button",
          class: "gh-tab",
          style: { padding: "2px 8px", "font-size": "11px", "margin-left": "8px" },
          onClick: L[0] || (L[0] = (S) => s(at).resetSearch())
        }, "清空搜索")
      ])) : I("", !0),
      s(Ce).emptyMessage ? (r(), c("p", bf, m(s(Ce).emptyMessage), 1)) : I("", !0),
      s(Ce).cards.length ? (r(), c("div", {
        key: 4,
        class: se(["repos gh-grid", { "gh-batch-active": s(Ce).batchMode }])
      }, [
        (r(!0), c(z, null, pe(s(Ce).cards, (S) => (r(), c("article", {
          key: S.fullName,
          class: se(["repo gh-card", { selected: S.selected }]),
          "data-repo-name": S.fullName,
          draggable: "true",
          onClick: (A) => h(A, S),
          onContextmenu: (A) => f(A, S),
          onDragstart: (A) => E(A, S.fullName)
        }, [
          n("button", {
            class: "fo-card-more",
            type: "button",
            "aria-label": "更多操作",
            title: "更多操作",
            onClick: N((A) => f(A, S), ["stop"])
          }, "⋮", 8, _f),
          n("div", Cf, [
            n("label", {
              class: "gh-card-hole",
              title: "点击勾选此仓库",
              onClick: L[1] || (L[1] = N(() => {
              }, ["stop"]))
            }, [
              n("input", {
                class: "gh-card-checkbox",
                type: "checkbox",
                checked: S.selected,
                onChange: (A) => s(at).setSelection(S.fullName, A.target.checked)
              }, null, 40, xf),
              L[17] || (L[17] = n("span", { class: "gh-hole-inner" }, null, -1))
            ]),
            n("img", {
              class: "gh-owner-avatar",
              src: S.avatarUrl || "assets/github-star.svg",
              alt: "",
              loading: "lazy",
              referrerpolicy: "no-referrer",
              onError: L[2] || (L[2] = (A) => A.target.src = "assets/github-star.svg")
            }, null, 40, $f),
            n("a", {
              href: S.url,
              target: "_blank",
              rel: "noreferrer",
              class: "name",
              title: S.fullName
            }, [
              n("span", Tf, m(S.owner) + "/", 1),
              Oe(m(S.name), 1)
            ], 8, Lf)
          ]),
          n("div", Sf, [
            n("div", Mf, [
              n("span", {
                class: se(["gh-badge-folder", { uncat: !S.folder }]),
                title: S.folder ? `文件夹：${S.folder}（点击更换）` : "未分类（点击归类）",
                onClick: N((A) => p(S, A), ["stop"])
              }, m(S.folder ? `📁 ${S.folder}` : "＋ 未分类"), 11, If),
              s(ee).repo === S.fullName ? (r(), ce(yi, {
                key: 0,
                active: t.active
              }, null, 8, ["active"])) : S.customRemark ? (r(), c("span", {
                key: 1,
                class: "gh-badge-remark",
                title: `备注：${S.customRemark}（点击就地修改）`,
                onClick: N((A) => M(S), ["stop"])
              }, [
                L[18] || (L[18] = n("span", { class: "gh-badge-remark-icon" }, "💬", -1)),
                n("span", Af, m(S.customRemark), 1)
              ], 8, Df)) : I("", !0),
              S.showUsedStatus && S.used ? (r(), c("span", {
                key: 2,
                class: "gh-badge-used",
                title: "已标记为正在使用（点击移除）",
                onClick: N((A) => s(at).removeUsed(S.fullName), ["stop"])
              }, "⚡ 正在使用", 8, Pf)) : I("", !0),
              S.showUsedStatus && S.releaseKind !== "none" && S.releaseUrl ? (r(), c("a", {
                key: 3,
                class: se(["gh-update-badge", { latest: S.releaseKind === "latest" }]),
                href: S.releaseUrl,
                target: "_blank",
                rel: "noreferrer"
              }, m(S.releaseText), 11, Ef)) : S.showUsedStatus && S.releaseKind !== "none" ? (r(), c("span", {
                key: 4,
                class: se(["gh-update-badge", { latest: S.releaseKind === "latest" }])
              }, m(S.releaseText), 3)) : I("", !0)
            ]),
            S.descriptionKind === "analyzing" ? (r(), c("p", Wf, [...L[19] || (L[19] = [
              n("span", { class: "gh-ai-sparkle" }, "✨", -1),
              Oe(" 正在使用 AI 分析仓库并提炼中文介绍…", -1)
            ])])) : S.descriptionKind === "ai" ? (r(), c("p", Of, [
              L[20] || (L[20] = n("span", { class: "gh-ai-tag-flag" }, "🤖", -1)),
              Oe(m(S.description), 1)
            ])) : S.descriptionKind === "plain" ? (r(), c("p", {
              key: 2,
              class: "desc",
              title: S.description
            }, m(S.description), 9, Bf)) : (r(), c("p", Rf, "暂无描述"))
          ]),
          n("div", Ff, [
            n("span", Nf, "★ " + m(S.stars), 1),
            S.language ? (r(), c("span", Hf, m(S.language), 1)) : I("", !0),
            S.updated ? (r(), c("span", jf, "更新 " + m(S.updated), 1)) : I("", !0)
          ])
        ], 42, kf))), 128))
      ], 2)) : I("", !0),
      s(Ce).totalPages > 1 ? (r(), c("div", Kf, [
        n("button", {
          class: "gh-page-btn",
          type: "button",
          disabled: s(Ce).page <= 1,
          onClick: L[3] || (L[3] = (S) => s(at).changePage(s(Ce).page - 1))
        }, "‹ 上一页", 8, zf),
        n("span", Uf, m(s(Ce).page) + " / " + m(s(Ce).totalPages) + " · 共 " + m(s(Ce).totalItems) + " 个" + m(s(Ce).serverPaged ? ` · 已加载 ${s(Ce).loadedItems}` : ""), 1),
        n("button", {
          class: "gh-page-btn",
          type: "button",
          disabled: s(Ce).page >= s(Ce).totalPages,
          onClick: L[4] || (L[4] = (S) => s(at).changePage(s(Ce).page + 1))
        }, "下一页 ›", 8, Gf)
      ])) : I("", !0),
      (r(), ce(mt, { to: "body" }, [
        t.active && i.visible ? (r(), c("div", {
          key: 0,
          class: "fo-cover-context-menu gh-repo-context-menu",
          style: ve({ left: `${i.x}px`, top: `${i.y}px` }),
          onClick: L[15] || (L[15] = N(() => {
          }, ["stop"])),
          onContextmenu: L[16] || (L[16] = N(() => {
          }, ["prevent"]))
        }, [
          n("div", {
            class: se(["gh-menu-has-sub", { "is-active": a.value === "folder" }]),
            onMouseenter: L[7] || (L[7] = (S) => a.value = "folder")
          }, [
            L[21] || (L[21] = n("button", {
              class: "fo-cover-menu-item with-sub-arrow",
              type: "button"
            }, [
              n("span", null, "📁 移动到文件夹"),
              n("span", { class: "sub-arrow" }, "›")
            ], -1)),
            n("div", {
              class: se(["gh-sub-flyout", { "flyout-left": l.value }]),
              onClick: L[6] || (L[6] = N(() => {
              }, ["stop"]))
            }, [
              n("button", {
                class: se(["fo-cover-menu-item", { primary: !i.folder }]),
                type: "button",
                onClick: L[5] || (L[5] = (S) => k(""))
              }, m(i.folder ? "  " : "✓ ") + "＋ 设为未分类（清旧使用标记） ", 3),
              (r(!0), c(z, null, pe(s(ot).cats, (S) => (r(), c("button", {
                key: S,
                class: se(["fo-cover-menu-item", { primary: i.folder === S }]),
                type: "button",
                onClick: (A) => k(S)
              }, m(i.folder === S ? "✓ " : "  ") + "📁 " + m(S), 11, Vf))), 128))
            ], 2)
          ], 34),
          n("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: L[8] || (L[8] = (S) => a.value = null),
            onClick: L[9] || (L[9] = (S) => M())
          }, " ✏️ 编辑备注… ", 32),
          Q(ra, {
            label: "💬 发送到聊天室",
            visible: i.visible,
            onOpen: L[10] || (L[10] = (S) => a.value = null),
            onSelect: d
          }, null, 8, ["visible"]),
          i.hasRemark ? (r(), c("button", {
            key: 0,
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: L[11] || (L[11] = (S) => a.value = null),
            onClick: g
          }, " 🗑️ 清除备注 ", 32)) : I("", !0),
          n("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: L[12] || (L[12] = (S) => a.value = null),
            onClick: u
          }, " 📋 复制仓库链接 ", 32),
          n("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: L[13] || (L[13] = (S) => a.value = null),
            onClick: b
          }, " ↗ 在 GitHub 打开 ", 32),
          n("button", {
            class: "fo-cover-menu-item danger",
            type: "button",
            onMouseenter: L[14] || (L[14] = (S) => a.value = null),
            onClick: C
          }, " ⭐ 取消 Star ", 32)
        ], 36)) : I("", !0)
      ]))
    ], 64));
  }
}), qf = { class: "gh-batch-bar-left" }, Xf = { class: "gh-batch-count-tip" }, Jf = { id: "gh-batch-selected-count" }, Qf = {
  key: 0,
  "aria-label": "批量移动确认"
}, Zf = ["disabled"], eg = ["value"], tg = ["disabled"], og = ["disabled"], ng = { class: "gh-batch-bar-right" }, ig = ["disabled"], sg = ["disabled"], ag = ["disabled"], rg = /* @__PURE__ */ le({
  __name: "GitHubBatchBar",
  props: {
    active: { type: Boolean, default: !0 }
  },
  setup(e) {
    const t = e, o = ws(), i = H(null);
    function a() {
      t.active && (o.value = ot.prepareBatchMove(), i.value = null);
    }
    async function l() {
      const h = o.value, f = i.value;
      if (!t.active || !h || f === null || kt.busy) return;
      await h.submit(f) && o.value === h && (o.value = void 0);
    }
    return Ne(() => t.active && Bt.active, (h) => {
      h || (o.value = void 0);
    }), (h, f) => (r(), c(z, null, [
      n("div", qf, [
        n("button", {
          type: "button",
          class: "gh-batch-action-btn",
          id: "gh-batch-select-all-btn",
          onClick: f[0] || (f[0] = (p) => s(bo).toggleSelectAll())
        }, m(s(Bt).allSelected ? "取消全选" : "全选"), 1),
        n("span", Xf, [
          f[5] || (f[5] = Oe("已选择 ", -1)),
          n("b", Jf, m(s(Bt).selectedCount), 1),
          f[6] || (f[6] = Oe(" 项", -1))
        ])
      ]),
      o.value ? (r(), c("section", Qf, [
        n("p", null, "仅移动打开选择器时的 " + m(o.value.names.length) + " 个仓库；后来勾选的仓库不加入。", 1),
        n("details", null, [
          f[7] || (f[7] = n("summary", null, "查看本次仓库清单", -1)),
          n("ul", null, [
            (r(!0), c(z, null, pe(o.value.names, (p) => (r(), c("li", { key: p }, m(p), 1))), 128))
          ])
        ]),
        We(n("select", {
          "onUpdate:modelValue": f[1] || (f[1] = (p) => i.value = p),
          "aria-label": "目标分类",
          disabled: s(kt).busy
        }, [
          f[8] || (f[8] = n("option", {
            value: null,
            disabled: ""
          }, "请选择目标分类", -1)),
          f[9] || (f[9] = n("option", { value: "" }, "未分类（同时清除这些仓库的旧使用标记）", -1)),
          (r(!0), c(z, null, pe(s(vo).folders.filter((p) => p.kind === "custom"), (p) => (r(), c("option", {
            key: p.title,
            value: p.title
          }, m(p.title), 9, eg))), 128))
        ], 8, Zf), [
          [bi, i.value]
        ]),
        n("button", {
          type: "button",
          disabled: !t.active || s(kt).busy || i.value === null,
          onClick: l
        }, "确认移动", 8, tg),
        n("button", {
          type: "button",
          disabled: s(kt).busy,
          onClick: f[2] || (f[2] = (p) => o.value = void 0)
        }, "取消", 8, og)
      ])) : I("", !0),
      n("div", ng, [
        n("button", {
          type: "button",
          class: "gh-batch-action-btn",
          id: "gh-batch-move-btn",
          disabled: !t.active || s(kt).busy || s(Bt).selectedCount === 0,
          title: "固定当前选择，确认后批量移动",
          onClick: a
        }, " 📁 移动到文件夹 ", 8, ig),
        n("button", {
          type: "button",
          class: "gh-batch-action-btn",
          id: "gh-batch-ai-btn",
          disabled: s(Bt).selectedCount === 0,
          title: "批量使用 AI 生成中文介绍",
          onClick: f[3] || (f[3] = (p) => s(bo).analyzeAi())
        }, " ✨ 批量 AI 分析 ", 8, sg),
        n("button", {
          type: "button",
          class: "gh-batch-action-btn danger",
          id: "gh-batch-unstar-btn",
          disabled: s(Bt).selectedCount === 0,
          title: "从 GitHub 批量取消 Star 收藏",
          onClick: f[4] || (f[4] = (p) => s(bo).unstar())
        }, " 🗑 取消收藏 ", 8, ag)
      ])
    ], 64));
  }
}), lg = G(() => import("./GitHubWorkspaceCard-BYPNc9Xk.js")), cg = G(() => import("./NotificationCenter-C59zGsJm.js")), dg = G(() => import("./TabManagerPanel-DmqQekzJ.js")), ug = G(() => import("./BookmarkNoteMenu-_Rtgf9Rb.js")), pg = G(() => import("./BookmarkPanel-BTTf_A_v.js")), fg = G(() => import("./LauncherDialogs-ByTweiO4.js")), gg = G(() => import("./SettingsDialog-NmkgbAkX.js")), hg = G(() => import("./SettingsView-Ctwqdb-H.js")), mg = G(() => import("./ClockSettingsMenu-mPbGtiex.js")), vg = G(() => import("./BiliTheaterDialog-DfHz1w_I.js")), yg = G(() => import("./BiliMiniPlayer-D8ZHPMoz.js")), wg = G(() => import("./BiliMessagePanel-C0A-hvZ3.js")), bg = G(() => import("./ModelPricingCard-CBqY8qVR.js")), kg = G(() => import("./BilibiliWorkspace-gCZ1MEr5.js")), _g = G(() => import("./YouTubeCard-B653sZRA.js").then((e) => e.Y)), Cg = G(() => import("./AihotFeed-8V2NY1IQ.js")), xg = G(() => import("./GitHubTrending-BYCDRdJy.js")), $g = G(() => import("./AiDialog-D8QksQEf.js")), Lg = G(() => import("./AihotViewer-DJXC8yZ2.js")), Tg = G(() => import("./NavWheelOverlay-BBANvk8o.js")), Sg = G(() => import("./StandaloneHost-ulujMm3-.js")), Mg = G(() => import("./LauncherFolderDialog-BAcQ1UXF.js")), Ig = G(() => import("./LauncherMenus-N5aWyw_2.js"));
function ne(e, t, o, i) {
  t.spaOwned && document.getElementById("vue-spa-root") || t.id !== "github-workspace" && t.id.startsWith("github-") && document.getElementById("vue-github-workspace-root") || e.register({
    id: t.id,
    title: t.title,
    order: t.order,
    eager: !0,
    roots: [t.root],
    capabilities: t.capabilities,
    mount: ({ getRoot: a }) => {
      const l = a(t.root);
      if (!l) return;
      if (document.getElementById("vue-spa-root") && t.id !== "spa-app")
        return i?.setMounted?.(!0), () => {
          i?.setMounted?.(!1);
        };
      const h = l.innerHTML, f = Ci(o);
      f.config.errorHandler = (p, w, k) => {
        console.error(`LogicWeaver Vue feature failed: ${t.id} (${k})`, p), l.dataset.vueError = "1";
      };
      try {
        f.mount(l), i?.setMounted?.(!0);
      } catch (p) {
        throw i?.setMounted?.(!1), l.innerHTML = h, p;
      }
      return () => {
        i?.setMounted?.(!1), f.unmount();
      };
    }
  });
}
function Dg(e) {
  e.register({
    id: "intro",
    title: "启动动画",
    order: 10,
    eager: !0,
    roots: ["endfield-loader"],
    capabilities: ["ui:intro", "boot:progress"],
    mount: () => {
      const t = document.getElementById("endfield-loader");
      if (!ht.enabled) {
        t?.remove(), document.body.classList.remove("is-starting");
        return;
      }
      if (!t) return;
      const o = Ci(Tp);
      let i = !1;
      const a = () => {
        e.stop("intro");
      };
      window.addEventListener("logicweaver:intro-complete", a, { once: !0 }), o.mount(t);
      const l = window.setTimeout(() => {
        ht.finish("基础界面已就绪，在线服务继续后台加载", !0), window.setTimeout(() => {
          i || (a(), t?.remove(), document.body.classList.remove("is-starting"));
        }, 600);
      }, 8e3);
      return () => {
        i || (i = !0, clearTimeout(l), window.removeEventListener("logicweaver:intro-complete", a), o.unmount(), t.remove(), document.body.classList.remove("is-starting"));
      };
    }
  }), ne(e, { id: "spa-app", title: "纯血 SPA 单根调度器", order: 15, root: "vue-spa-root", capabilities: ["ui:spa-root", "workspace:keepalive"] }, yp), document.getElementById("vue-spa-root") || ne(e, { id: "bili-companions", title: "b站伴随窗口", order: 19, root: "vue-bili-companions-root", capabilities: ["ui:dock-companion"] }, Sg), ne(e, { id: "notifications", title: "通知中心", order: 20, root: "vue-notification-root", capabilities: ["ui:toast", "notification:dedupe"] }, Gi), ne(e, { id: "profile-menu", title: "头像右键菜单", order: 21, root: "bili-profile-menu", capabilities: ["ui:profile-menu", "profile:actions"] }, Sp, To), ne(e, { id: "workspace-launchers", title: "常用工作区启动项", order: 22, root: "workspace-launchers", capabilities: ["ui:workspace-launchers", "workspace:launch"] }, Mp, Rn), ne(e, { id: "mac-dock", title: "底部快捷应用 Dock 栏", order: 23, root: "mac-dock", capabilities: ["ui:mac-dock", "dock:navigate"] }, Ui, ct), ne(e, { id: "hero-clock", title: "首屏中央时钟", order: 26, root: "hero-clock", capabilities: ["ui:hero-clock", "clock:read"] }, ji), ne(e, { id: "search-box", title: "首屏搜索框", order: 27, root: "search", capabilities: ["ui:search-box", "search:actions"] }, wi), ne(e, { id: "home-music", title: "首屏音乐播放器", order: 28, root: "task-thread-home", capabilities: ["ui:home-music", "music:playback"] }, Ki, Fe), ne(e, { id: "launcher-groups", title: "常用网站分组架", order: 29, root: "launcher-groups", capabilities: ["ui:launcher-groups", "launcher:navigate"] }, zi, xe), ne(e, { id: "weather-widget", title: "首屏天气小部件", order: 39, root: "weather-body", capabilities: ["ui:weather-widget", "weather:read"] }, Hi), ne(e, { id: "github-workspace", title: "GitHub 独立页 Vue 工作台", order: 49, root: "vue-github-workspace-root", capabilities: ["ui:github-workspace"] }, lg), ne(e, { id: "github-status", title: "GitHub 同步状态", order: 50, root: "vue-github-status-root", capabilities: ["ui:github-status", "github:sync-read"] }, Wp, tn), ne(e, { id: "github-folders", title: "GitHub 文件夹导航", order: 55, root: "gh-folder-list", capabilities: ["ui:github-folders", "github:categorize-drop"] }, Yp, Tt), ne(e, { id: "github-hero", title: "GitHub 分类摘要", order: 56, root: "gh-hero", capabilities: ["ui:github-summary", "github:actions"] }, df, zt), ne(e, { id: "github-repositories", title: "GitHub 仓库列表", order: 57, root: "vue-github-repositories-root", capabilities: ["ui:github-repositories", "github:repository-actions", "github:paging"] }, Yf, at), ne(e, { id: "github-batch-bar", title: "GitHub Star 批量操作工具栏", order: 58, root: "gh-batch-bar", capabilities: ["ui:github-batch-bar", "github:batch-actions"] }, rg, bo), ne(e, { id: "notification-center", spaOwned: !0, title: "持久通知中心", order: 71, root: "vue-notification-center-root", capabilities: ["ui:notification-history", "notification:read"] }, cg, At), ne(e, { id: "tab-manager", spaOwned: !0, title: "独立标签页管理", order: 71, root: "vue-tab-manager-root", capabilities: ["ui:tab-manager", "tabs:explicit"] }, dg, Bi), ne(e, { id: "bookmark-menu", title: "书签上下文操作与备注菜单", order: 72, root: "vue-bookmark-menu-root", capabilities: ["ui:bookmark-menu", "bookmark:edit"] }, ug, Wn), ne(e, { id: "launcher-dialogs", title: "快捷启动器管理弹窗族", order: 73, root: "vue-launcher-dialogs-root", capabilities: ["ui:launcher-dialogs", "launcher:manage"] }, fg, ko), ne(e, { id: "launcher-folder-dialog", title: "大文件夹展开视窗", order: 74, root: "vue-launcher-folder-root", capabilities: ["ui:launcher-folder", "launcher:folder-dialog"] }, Mg, Ct), ne(e, { id: "launcher-menus", title: "启动器快捷上下文菜单族", order: 76, root: "vue-launcher-menus-root", capabilities: ["ui:launcher-menus", "launcher:context-menu"] }, Ig, Qt), ne(e, { id: "bookmark-panel", title: "浏览器书签侧边滑动视窗", order: 77, root: "vue-bookmark-panel-root", capabilities: ["ui:bookmark-panel", "bookmarks:panel"] }, pg, en), ne(e, { id: "bookmark-folder-strip", spaOwned: !0, title: "顶栏书签快捷文件夹横条", order: 78, root: "vue-bookmark-folder-strip-root", capabilities: ["ui:bookmark-folder-strip", "bookmarks:strip"] }, null, qo), ne(e, { id: "settings-page", title: "独立设置页 Vue 工作台", order: 79, root: "vue-options-root", capabilities: ["ui:settings-page"] }, hg), ne(e, { id: "settings-dialog", title: "全局设置中心视窗", order: 80, root: "vue-settings-dialog-root", capabilities: ["ui:settings-dialog", "settings:manage"] }, gg, on), ne(e, { id: "clock-settings-menu", spaOwned: !0, title: "中央时钟偏好配置菜单", order: 82, root: "vue-clock-settings-root", capabilities: ["ui:clock-settings", "clock:preference-edit"] }, mg, Mt), ne(e, { id: "bili-theater-dialog", title: "Bilibili 沉浸剧场与评论区弹窗", order: 85, root: "vue-bili-theater-root", capabilities: ["ui:bili-theater", "bili:playback"] }, vg, _o), ne(e, { id: "bili-mini-player", title: "Bilibili 悬浮迷你播放器", order: 85, root: "vue-bili-mini-player-root", capabilities: ["ui:bili-mini-player", "bili:playback"] }, yg), ne(e, { id: "ai-dialog", title: "AI 助手对话框与知识点抽屉", order: 86, root: "vue-ai-dialog-root", capabilities: ["ui:ai-dialog", "ai:chat"] }, $g, Fn), ne(e, { id: "aihot-viewer", spaOwned: !0, title: "AI HOT 资讯文章阅读器", order: 88, root: "vue-aihot-viewer-root", capabilities: ["ui:aihot-viewer", "viewer:aihot"] }, Lg, Bn), ne(e, { id: "nav-wheel", title: "辐射状快捷动作轮盘与悬浮球", order: 95, root: "vue-nav-wheel-root", capabilities: ["ui:nav-wheel", "nav:radial-menu"] }, Tg, we), ne(e, { id: "bili-message-panel", spaOwned: !0, title: "Bilibili 消息与互动通知中心", order: 102, root: "vue-bili-message-panel-root", capabilities: ["ui:bili-message-panel", "bili:messages"] }, wg, St), ne(e, { id: "pricing-radar", spaOwned: !0, title: "模型插件 (AI 定价与排行榜)", order: 108, root: "vue-pricing-root", capabilities: ["ui:pricing-radar", "pricing:read"] }, bg, Ii), ne(e, { id: "bili-favorites", spaOwned: !0, title: "b站插件 Vue 外壳", order: 110, root: "vue-bili-favorites-root", capabilities: ["ui:bili-favorites-shell", "bilibili:favorites"] }, kg, Si), ne(e, { id: "youtube-card", spaOwned: !0, title: "YouTube 订阅与探索工作台", order: 111, root: "vue-youtube-root", capabilities: ["ui:youtube-card", "youtube:updates"] }, _g, Li), ne(e, { id: "aihot-feed", spaOwned: !0, title: "AI HOT 资讯流全功能聚合看板", order: 112, root: "vue-aihot-root", capabilities: ["ui:aihot-feed", "aihot:aggregate"] }, Cg, Mi), ne(e, { id: "github-trending", spaOwned: !0, title: "GitHub 趋势榜与热门流", order: 114, root: "vue-github-trending-root", capabilities: ["ui:github-trending", "github:trending"] }, xg, Ri);
}
hs();
const sn = ua(nn);
Wa(nn, sn);
Oa(nn);
Dg(sn);
En.loadBookmarks();
(async () => {
  document.getElementById("vue-bili-favorites-root") && !document.getElementById("vue-spa-root") && await import("./bilibili-channel.service-BdK5kcwq.js"), await sn.startEager(), ht.finish("BOOT COMPLETE / 首页加载完成");
})().catch((e) => console.error("[LogicWeaver] 页面启动失败", e));
window.addEventListener("pagehide", () => {
  sn.stopAll();
}, { once: !0 });
export {
  Jn as C,
  xu as D,
  df as G,
  pi as L,
  Fc as T,
  Yp as _,
  rg as a,
  Yf as b,
  Wp as c,
  Bi as d,
  Mt as e,
  Qn as f,
  Ri as g,
  Qg as h,
  ye as i,
  Fn as j,
  we as k,
  Zo as l,
  Hc as m,
  q as n,
  jc as o,
  Nc as p,
  Mp as q,
  Sp as r,
  De as s,
  Ko as t,
  Ni as u,
  nn as v
};
