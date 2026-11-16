import { l as Xn, a as Fe, b as zi, c as Gi, d as ni, e as ue, f as Ct, S as Ui, g as wo, i as Hs } from "./SearchBox-BSaJNdli.js";
/* empty css                */
import { c as ii, r as Le, a as Rt, w as We, b as z, d as fe, o as l, e as p, u as i, t as u, f as P, F as Q, g as we, h as V, i as n, j as pe, T as bt, k as Wo, l as st, v as Ks, m as tt, n as fo, p as Z, q as js, s as te, x as Nt, y as Ro, z as Se, A as ce, B as qe, C as Yt, D as X, E as Tt, G as So, H as hn, I as Et, J as No, K as Ye, L as Yi, M as Vs } from "./vendor-vue-C09jaOfK.js";
import { n as ke, a as Wt, b as gi, c as sn, s as Ln, d as mi, e as zs, f as bo, g as Xi, N as vi, h as Go, i as Gs } from "./mini-player-store-BZz5yLl2.js";
import { l as Ee, b as bn, a as si, s as Us, c as Ys, d as ai, e as fn, f as io, g as ze, h as yi, i as Xs, r as qs } from "./search.service-Dzs18alc.js";
import { W as gn, t as so, p as $n, a as Bo, h as Qe, m as Lt, r as Js, b as Zs, C as qi, c as oe, d as Ji, n as Qs, i as ea, e as ao, f as ta, g as Uo, j as ko, k as oa } from "./view-styles-BWvP_cB-.js";
import { c as na, a as ia, t as sa, b as aa, d as ra, e as la, f as ro, g as ca } from "./calendar.service-CZu-jodG.js";
import { l as da, r as ua, G as pa, g as ri, a as Io, b as Mo, c as At, d as Do, e as ha, f as He, h as rt, i as dt, j as Zi, s as Te, k as Qi, R as fa, m as ga, n as Ft, o as jt, p as De, q as Qt } from "./github.service-CnwzFWAn.js";
import { w as Oe, s as li, P as ma, i as mn, D as Sn, a as wi, g as it, p as va, L as ya, b as Ht, c as wa, d as Tn, t as bi, e as ba, f as ka, h as Oo, l as es } from "./window-manager.store-CzUcQOW-.js";
import { s as Fo } from "./store-BjvXo5pC.js";
import { b as Ao, a as _a, c as Ca } from "./up-group-manager-store-CNeHbL6u.js";
import { biliMessagePanelController as Vt, biliMessagePanelState as xa } from "./message-panel-store-C2cF0vMo.js";
import { s as La, a as $a } from "./stickers.service-BVu9MhEk.js";
import { a as ci, b as Sa } from "./store-FyPEO0xk.js";
import { b as ts } from "./bili-favorites-store-Ca6-1-Qa.js";
import { a as os } from "./aihot-feed-store-BBHzZC21.js";
import { R as Ta, a as ki } from "./read-session-D7iZUlf2.js";
import { t as c, c as mt, _ as Re } from "./_plugin-vue_export-helper-BTb4PcVA.js";
import { fullscreenCardsController as zt } from "./fullscreen-cards.store-JvFiCXY5.js";
import { k as Ia, m as Ma } from "./core-utils-BHmA-Jjh.js";
import { u as di } from "./InlineEditStatus.vue_vue_type_style_index_0_scoped_c63d0c6d_lang-DSwVoylL.js";
import { t as gt } from "./together-listen.store-6c5IMpLq.js";
import { f as yt, s as ns } from "./fullscreen-presentation-C5hJzUwf.js";
import { n as Da } from "./system-theme-B-k5DBhe.js";
import { A as Aa } from "./AppWindowFrame-CtzBF0Q7.js";
/* empty css                                                                             */
import { C as Ea } from "./ChatShareMenu-msyDPVHG.js";
const Pa = /^[a-z][a-z0-9]*(?:[.:-][a-z0-9]+)*$/;
function Wa() {
  const e = /* @__PURE__ */ new Map(), t = /* @__PURE__ */ new Map();
  function o(d) {
    if (!d || !Pa.test(d.id)) throw new TypeError(`Invalid command id: ${d?.id || ""}`);
    if (!d.title?.trim() || !d.category?.trim() || typeof d.run != "function")
      throw new TypeError(`Command ${d.id} requires title, category and run()`);
    if (e.has(d.id)) throw new Error(`Command already registered: ${d.id}`);
    return e.set(d.id, Object.freeze({
      ...d,
      description: d.description || "",
      keywords: Object.freeze([...d.keywords || []]),
      concurrency: d.concurrency || "replace"
    })), () => {
      s(d.id), e.delete(d.id);
    };
  }
  function s(d) {
    const h = t.get(d);
    return h ? (h.abort(), t.delete(d), !0) : !1;
  }
  async function a(d, h, b = "api") {
    const E = e.get(d);
    if (!E) throw new Error(`Unknown command: ${d}`);
    if (E.enabled && !E.enabled()) return;
    const g = E.concurrency || "replace";
    if (t.has(d)) {
      if (g === "drop") return;
      g === "replace" && s(d);
    }
    const M = new AbortController();
    g !== "parallel" && t.set(d, M);
    try {
      return await E.run(h, { signal: M.signal, source: b });
    } finally {
      t.get(d) === M && t.delete(d);
    }
  }
  function r(d) {
    return Object.freeze({
      id: d.id,
      title: d.title,
      category: d.category,
      description: d.description || "",
      keywords: Object.freeze([...d.keywords || []]),
      concurrency: d.concurrency || "replace",
      enabled: d.enabled ? !!d.enabled() : !0,
      running: t.has(d.id)
    });
  }
  function m() {
    return Object.freeze([...e.values()].map(r).sort((d, h) => d.category.localeCompare(h.category, "zh") || d.title.localeCompare(h.title, "zh")));
  }
  function f(d, h = 20) {
    const b = String(d || "").trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
    if (!b.length) return m().slice(0, h);
    const E = [...e.values()].map((g) => {
      const M = r(g), v = M.title.toLocaleLowerCase(), w = `${M.id} ${v} ${M.category} ${M.description} ${M.keywords.join(" ")}`.toLocaleLowerCase();
      if (!b.every((y) => w.includes(y))) return null;
      let T = 0;
      for (const y of b)
        M.id === y ? T += 200 : M.id.startsWith(y) && (T += 120), v === y ? T += 160 : v.startsWith(y) ? T += 100 : v.includes(y) && (T += 60), M.keywords.some((C) => C.toLocaleLowerCase().startsWith(y)) && (T += 40);
      return { item: M, score: T };
    }).filter((g) => !!g);
    return E.sort((g, M) => M.score - g.score || g.item.title.localeCompare(M.item.title, "zh")), Object.freeze(E.slice(0, Math.max(1, h)).map((g) => g.item));
  }
  return Object.freeze({ register: o, execute: a, cancel: s, has: (d) => e.has(d), list: m, search: f });
}
const kn = Wa(), Ra = /^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/;
function Na(e) {
  const t = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map();
  function r(g) {
    if (!g || !Ra.test(g.id)) throw new TypeError(`Invalid feature id: ${g?.id || ""}`);
    if (!g.title?.trim() || typeof g.mount != "function") throw new TypeError(`Feature ${g.id} requires title and mount()`);
    if (t.has(g.id)) throw new Error(`Feature already registered: ${g.id}`);
    return t.set(g.id, Object.freeze({
      ...g,
      order: Number(g.order) || 100,
      eager: g.eager === !0,
      roots: Object.freeze([...g.roots || []]),
      capabilities: Object.freeze([...g.capabilities || []])
    })), () => {
      d(g.id), a.delete(g.id), t.delete(g.id);
    };
  }
  function m(g) {
    return typeof g == "function" ? g : g && typeof g.unmount == "function" ? () => g.unmount() : () => {
    };
  }
  function f(g) {
    if (o.has(g)) return Promise.resolve(o.get(g)?.cleanup);
    if (s.has(g)) return s.get(g);
    const M = t.get(g);
    if (!M) return Promise.reject(new Error(`Unknown feature: ${g}`));
    a.delete(g);
    const v = new AbortController(), w = Object.freeze({
      signal: v.signal,
      commands: e,
      getRoot: (y) => document.getElementById(y)
    }), T = Promise.resolve().then(() => M.mount(w)).then((y) => (s.delete(g), o.set(g, { cleanup: y, controller: v }), y), (y) => {
      throw s.delete(g), a.set(g, y), v.abort(), y;
    });
    return s.set(g, T), T;
  }
  async function d(g) {
    const M = s.get(g);
    if (M)
      try {
        await M;
      } catch {
        return;
      }
    const v = o.get(g);
    v && (o.delete(g), v.controller.abort(), await m(v.cleanup)());
  }
  async function h() {
    const g = typeof document < "u" && !!(document.getElementById("vue-spa-root") || document.getElementById("logicweaver-spa-root")), M = [...t.values()].filter((T) => !(!T.eager || !g && T.roots && T.roots.length > 0 && !T.roots.some((C) => !!document.getElementById(C)))).sort((T, y) => (T.order || 100) - (y.order || 100)), w = (await Promise.allSettled(M.map((T) => f(T.id)))).flatMap((T, y) => T.status === "rejected" ? [{ id: M[y].id, reason: T.reason }] : []);
    w.length && console.warn("LogicWeaver Vue features failed to mount", w);
  }
  async function b() {
    const g = [...o.keys()].reverse();
    await Promise.allSettled(g.map(d));
  }
  function E() {
    return Object.freeze([...t.values()].map((g) => Object.freeze({
      id: g.id,
      title: g.title,
      order: g.order || 100,
      eager: g.eager === !0,
      roots: Object.freeze([...g.roots || []]),
      capabilities: Object.freeze([...g.capabilities || []]),
      status: s.has(g.id) ? "mounting" : o.has(g.id) ? "mounted" : a.has(g.id) ? "failed" : "registered",
      error: a.has(g.id) ? String(a.get(g.id)?.message || a.get(g.id) || "Feature mount failed") : ""
    })).sort((g, M) => g.order - M.order));
  }
  return Object.freeze({ register: r, start: f, startEager: h, stop: d, stopAll: b, has: (g) => t.has(g), list: E });
}
const Oa = localStorage.getItem("startupAnimationStyle") || localStorage.getItem("logicweaverStartupStyle") || "endfield", _i = (() => {
  try {
    const e = localStorage.getItem("showStartupAnimation"), t = localStorage.getItem("logicweaverEndfieldLoader"), o = e ?? t;
    return o === "1" || o === "true";
  } catch {
    return !1;
  }
})(), ie = Le({
  enabled: _i,
  style: Oa === "rhinelab" ? "rhinelab" : "endfield",
  renderedProgress: 4,
  targetProgress: 4,
  status: "CORE SHELL...",
  finished: !_i,
  exiting: !1,
  forced: !1
});
let go = 0, vn = 4, is = performance.now(), qn = 0, an = null, Jn = !1;
function ss(e) {
  const t = e - is, o = qn ? Math.min(1, t / qn) : 1, s = o * o * (3 - 2 * o);
  ie.renderedProgress = vn + (ie.targetProgress - vn) * s, o < 1 && !ie.finished ? go = requestAnimationFrame(ss) : go = 0;
}
function rn(e, t) {
  if (!ie.enabled || ie.finished) return;
  const o = Math.max(ie.targetProgress, Math.max(4, Math.min(100, Number(e) || 4)));
  t && (ie.status = t), vn = ie.renderedProgress, ie.targetProgress = o, is = performance.now(), qn = Math.max(280, Math.min(920, 220 + Math.abs(o - vn) * 7.5)), cancelAnimationFrame(go), go = requestAnimationFrame(ss);
}
function _n(e = "Ready", t = !1) {
  ie.finished || (ie.finished = !0, ie.forced = t, ie.status = e, ie.targetProgress = 100, cancelAnimationFrame(go), go = 0, ie.renderedProgress = 100, an?.(t));
}
function Ba(e = "KEYBOARD SKIP") {
  _n(e, !0);
}
function Fa() {
  ie.enabled || _n("BOOT COMPLETE", !0);
}
function as() {
  !ie.enabled || ie.finished || Jn || (Jn = !0, rn(38, "INITIALIZING CORE SHELL..."), setTimeout(() => {
    ie.finished || rn(76, "SYNTHESIZING RUNTIME...");
  }, 400), setTimeout(() => {
    ie.finished || rn(100, ie.style === "rhinelab" ? "ID CONFIRMED : JOYCE MOORE" : "TERRA LINK READY / 终端就绪");
  }, 900), setTimeout(() => {
    ie.finished || _n("BOOT COMPLETE / 首页就绪", !1);
  }, 1650));
}
async function Ha() {
  if (document.getElementById("vue-spa-root")) {
    try {
      const e = await chrome.storage.local.get(["showStartupAnimation", "startupAnimationStyle"]);
      typeof e.showStartupAnimation == "boolean" && (ie.enabled = e.showStartupAnimation, localStorage.setItem("showStartupAnimation", ie.enabled ? "1" : "0"), localStorage.setItem("logicweaverEndfieldLoader", ie.enabled ? "1" : "0")), (e.startupAnimationStyle === "endfield" || e.startupAnimationStyle === "rhinelab") && (ie.style = e.startupAnimationStyle, localStorage.setItem("startupAnimationStyle", ie.style));
    } catch {
      console.warn("[Intro] Startup preferences unavailable; using first-paint preference.");
    }
    ie.finished = !ie.enabled, document.documentElement.dataset.startupStyle = ie.style, document.documentElement.classList.toggle("skip-endfield-loader", !ie.enabled), document.body.classList.toggle("is-starting", ie.enabled);
  }
}
const lt = Rt(ie), wt = Object.freeze({
  update: rn,
  finish: _n,
  skip: Ba,
  notifyBootReady: Fa,
  async playIntro(e) {
    if (e?.style && (ie.style = e.style), typeof document < "u" && (document.documentElement.dataset.startupStyle = ie.style, document.documentElement.classList.remove("skip-endfield-loader"), document.body.classList.add("is-starting")), ie.enabled = !0, ie.finished = !1, ie.forced = !!e?.force, ie.renderedProgress = 4, ie.targetProgress = 4, Jn = !1, typeof document < "u") {
      let t = document.getElementById("endfield-loader");
      if (!t) {
        t = document.createElement("div"), t.id = "endfield-loader", t.className = "endfield-loader notranslate", document.body.appendChild(t);
        const { default: o } = await import("./IntroAnimation-BmQd_Q8m.js"), s = ii(o), a = () => {
          window.removeEventListener("logicweaver:intro-complete", a), s.unmount(), t?.remove(), document.body.classList.remove("is-starting");
        };
        window.addEventListener("logicweaver:intro-complete", a, { once: !0 }), s.mount(t);
      }
    }
    as();
  },
  get enabled() {
    return ie.enabled;
  },
  get finished() {
    return ie.finished;
  }
});
function Ka(e) {
  return an = e, ie.finished && e(ie.forced), () => {
    an === e && (an = null);
  };
}
const rs = [
  { date: "今天", dayName: "周四", emoji: "🌤️", condition: "多云", highTemp: 26, lowTemp: 18, rainProb: 15 },
  { date: "明天", dayName: "周五", emoji: "⛅", condition: "阴天", highTemp: 24, lowTemp: 17, rainProb: 30 },
  { date: "后天", dayName: "周六", emoji: "🌧️", condition: "小雨", highTemp: 21, lowTemp: 16, rainProb: 75 },
  { date: "周日", dayName: "周日", emoji: "🌦️", condition: "阵雨", highTemp: 23, lowTemp: 15, rainProb: 45 },
  { date: "周一", dayName: "周一", emoji: "☀️", condition: "晴天", highTemp: 27, lowTemp: 18, rainProb: 10 },
  { date: "周二", dayName: "周二", emoji: "🌤️", condition: "多云", highTemp: 28, lowTemp: 19, rainProb: 15 },
  { date: "周三", dayName: "周三", emoji: "☀️", condition: "晴天", highTemp: 29, lowTemp: 20, rainProb: 5 }
], ls = "lw_weather_snapshot_v1";
function ja() {
  if (typeof window > "u" || typeof localStorage > "u") return null;
  try {
    const e = localStorage.getItem(ls);
    if (!e) return null;
    const t = JSON.parse(e);
    if (t && t.data && t.data.currentTemp !== void 0)
      return {
        state: "ready",
        city: t.city || t.data.cityName || "",
        data: t.data,
        forecastDays: Array.isArray(t.forecastDays) && t.forecastDays.length ? t.forecastDays : rs,
        detailInfo: t.detailInfo || null,
        updatedAt: t.savedAt || Date.now()
      };
  } catch {
  }
  return null;
}
function Yo(e) {
  if (!(typeof window > "u" || typeof localStorage > "u"))
    try {
      e.data && localStorage.setItem(
        ls,
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
const Va = () => {
  const e = ja();
  return {
    state: e?.state || "loading",
    city: e?.city || "",
    errorMessage: "",
    data: e?.data || null,
    updatedAt: e?.updatedAt || null,
    forecastModalOpen: !1,
    forecastDays: e?.forecastDays || rs,
    detailInfo: e?.detailInfo || {
      humidity: "62%",
      wind: "东北风 2级",
      uvIndex: "中等 (4)",
      airQuality: "优 (32)"
    }
  };
}, q = Le(Va());
let In = null, Mn = null;
const ut = {
  get snapshot() {
    return Rt(q);
  },
  update(e) {
    Object.assign(q, e), Yo(q);
  },
  unconfigured() {
    Object.assign(q, {
      state: "unconfigured",
      city: "",
      errorMessage: "",
      data: null,
      updatedAt: Date.now()
    });
  },
  loading(e = "") {
    if (q.data) {
      e && (q.city = e);
      return;
    }
    Object.assign(q, {
      state: "loading",
      city: e,
      errorMessage: "",
      updatedAt: Date.now()
    });
  },
  ready(e, t = "") {
    Object.assign(q, {
      state: "ready",
      city: t || e.cityName,
      errorMessage: "",
      data: e,
      updatedAt: Date.now()
    }), Yo(q);
  },
  notFound(e = "") {
    Object.assign(q, {
      state: "not_found",
      city: e,
      errorMessage: `找不到城市「${e}」，右键可重新选择地点。`,
      data: null,
      updatedAt: Date.now()
    });
  },
  error(e = "天气加载失败，右键此处可重新选择地点。", t = "") {
    q.data || Object.assign(q, {
      state: "error",
      city: t,
      errorMessage: e,
      data: null,
      updatedAt: Date.now()
    });
  },
  openForecastModal(e) {
    e && (q.city = e), q.forecastModalOpen = !0;
  },
  closeForecastModal() {
    q.forecastModalOpen = !1;
  },
  setForecastDays(e) {
    q.forecastDays = Array.isArray(e) ? e.map((t) => ({
      dayName: t.dayName || t.day || "",
      date: t.date || "",
      emoji: t.emoji || "🌤️",
      condition: t.condition || t.text || "",
      rainProb: t.rainProb ?? 0,
      lowTemp: t.lowTemp ?? t.tempMin ?? 0,
      highTemp: t.highTemp ?? t.tempMax ?? 0
    })) : [], Yo(q);
  },
  setDetailInfo(e) {
    q.detailInfo = { ...e }, Yo(q);
  },
  applyCity(e) {
    typeof window < "u" && window.dispatchEvent(new CustomEvent("logicweaver:weather-city-selected", { detail: { city: e } })), this.refresh();
  },
  refresh() {
    In ? In() : typeof window < "u" && window.dispatchEvent(new CustomEvent("logicweaver:weather-refresh"));
  },
  changeLocation(e) {
    Mn ? Mn(e) : typeof window < "u" && window.dispatchEvent(new CustomEvent("logicweaver:weather-change-location", { detail: { clientX: e?.clientX, clientY: e?.clientY } }));
  },
  setRefreshAction(e) {
    In = e;
  },
  setChangeLocationAction(e) {
    Mn = e;
  }
}, za = () => ({
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
}), _e = Le(za());
let Dn = null;
const lo = {
  get snapshot() {
    return Rt(_e);
  },
  update(e) {
    Object.assign(_e, e);
  },
  updateTime(e, t, o, s) {
    _e.timeText = e, _e.secsText = t, _e.greetingText = o, _e.dateText = s, _e.updatedAt = Date.now();
  },
  applyConfig(e) {
    e.fontFamily !== void 0 && (_e.fontFamily = e.fontFamily), e.colorHex !== void 0 && (_e.colorHex = e.colorHex), e.greetColor !== void 0 && (_e.greetColor = e.greetColor), e.dateColor !== void 0 && (_e.dateColor = e.dateColor), e.isBlack !== void 0 && (_e.isBlack = e.isBlack), e.isCustomColor !== void 0 && (_e.isCustomColor = e.isCustomColor), _e.updatedAt = Date.now();
  },
  openSettings(e) {
    Dn ? Dn(e) : window.dispatchEvent(new CustomEvent("logicweaver:clock-open-settings", { detail: { clientX: e?.clientX, clientY: e?.clientY } }));
  },
  setOpenSettingsAction(e) {
    Dn = e;
  }
}, Ga = [
  { id: "ai", title: "AI 助手" },
  { id: "todoist", title: "Todoist" },
  { id: "stickers", title: "表情包" },
  { id: "calcom", title: "预约" },
  { id: "wallpaper", title: "壁纸库" }
], Ua = () => ({
  mounted: !1,
  visible: !1,
  items: [...Ga]
}), An = Le(Ua());
let Xo = {};
const ui = {
  getSnapshot() {
    return Rt(An);
  },
  update(e) {
    Object.assign(An, e);
  },
  setMounted(e) {
    An.mounted = e;
  },
  openWorkspace(e, t = !1) {
    if (Xo.open) {
      Xo.open(e);
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
    const s = o.LogicWeaverWindowTabs;
    if (s?.open) {
      s.open(e);
      return;
    }
    const a = document.getElementById(`${e}-top-open`);
    a && !t ? a.click() : window.dispatchEvent(new CustomEvent("logicweaver:open-workspace", { detail: { id: e } }));
  },
  setActions(e) {
    Xo = { ...Xo, ...e };
  }
}, En = Le({ visible: !1, pendingWrites: 0 });
async function Ya(e) {
  if (En.pendingWrites) throw new Error("壁纸操作正在处理，未自动排队");
  En.pendingWrites++;
  try {
    return await e();
  } finally {
    En.pendingWrites--;
  }
}
const Ci = {
  openDialog() {
    Oe.open("wallpaper");
  },
  closeDialog() {
    Oe.close("wallpaper");
  },
  resetDefault() {
    return Ya(() => gn.clearWallpaper());
  }
}, xi = [
  { id: "mono", label: "极简等宽", font: "ui-monospace, 'SF Mono', 'JetBrains Mono', Menlo, Consolas, monospace", sample: "15:50:10" },
  { id: "sans", label: "现代无衬线", font: "-apple-system, BlinkMacSystemFont, 'Segoe UI Variable Display', 'Segoe UI', Roboto, 'PingFang SC', sans-serif", sample: "15:50:10" },
  { id: "din", label: "经典几何", font: "'DIN Alternate', 'DIN Pro', 'Franklin Gothic Medium', Futura, sans-serif", sample: "15:50:10" },
  { id: "digital", label: "数码管等宽", font: "'Courier New', Courier, monospace", sample: "15:50:10" },
  { id: "impact", label: "硬派力量", font: "Impact, 'Arial Black', 'Trebuchet MS', sans-serif", sample: "15:50:10" },
  { id: "serif", label: "典雅衬线", font: "'Playfair Display', Georgia, 'Times New Roman', serif", sample: "15:50:10" },
  { id: "rounded", label: "圆润亲和", font: "'Quicksand', 'Comic Sans MS', 'Segoe UI', sans-serif", sample: "15:50:10" }
], Li = [
  { id: "white", label: "纯净皓白 (默认)", hex: "#ffffff" },
  { id: "black", label: "曜石极黑", hex: "#0f172a" },
  { id: "gold", label: "香槟金砂", hex: "#f59e0b" },
  { id: "cyan", label: "科技青蓝", hex: "#38bdf8" },
  { id: "emerald", label: "翡翠竹绿", hex: "#10b981" },
  { id: "rose", label: "淡雅樱粉", hex: "#fb7185" }
], Pm = [
  { id: "local", label: "📍 本地系统时区", offset: "Local" },
  { id: "Asia/Shanghai", label: "🇨🇳 北京 / 香港", offset: "UTC+8" },
  { id: "Asia/Tokyo", label: "🇯🇵 东京 / 首尔", offset: "UTC+9" },
  { id: "Europe/London", label: "🇬🇧 伦敦 / 格林威治", offset: "UTC+0/+1" },
  { id: "Europe/Paris", label: "🇫🇷 巴黎 / 柏林", offset: "UTC+1/+2" },
  { id: "America/New_York", label: "🇺🇸 纽约 / 东部时间", offset: "UTC-5/-4" },
  { id: "America/Los_Angeles", label: "🇺🇸 洛杉矶 / 西部时间", offset: "UTC-8/-7" },
  { id: "Australia/Sydney", label: "🇦🇺 悉尼", offset: "UTC+10/+11" },
  { id: "UTC", label: "🌐 协调世界时 (UTC)", offset: "UTC" }
], Ae = Le({
  mounted: !1,
  isOpen: !1,
  x: 200,
  y: 200,
  font: "mono",
  color: "white",
  timezone: "local"
});
let Pn = null;
const Gt = {
  state: Ae,
  setMounted(e) {
    Ae.mounted = e;
  },
  onAction(e) {
    Pn = e;
  },
  dispatch(e, t) {
    if (Pn)
      return Pn(e, t);
  },
  open(e) {
    const s = typeof window < "u" ? window.innerWidth : 1280, a = typeof window < "u" ? window.innerHeight : 800, r = e?.clientX ?? e?.x ?? s / 2, m = e?.clientY ?? e?.y ?? a / 2, f = Math.max(12, Math.min(r - 40, s - 290 - 12)), d = Math.max(12, Math.min(m + 10, a - 420 - 12));
    Ae.x = f, Ae.y = d, Ae.isOpen = !0, this.dispatch("open", { x: f, y: d });
  },
  close() {
    Ae.isOpen = !1, this.dispatch("close");
  },
  setFont(e) {
    Ae.font = e;
    const t = xi.find((o) => o.id === e);
    if (t) {
      lo.applyConfig({ fontFamily: t.font });
      try {
        localStorage.setItem("lw_clock_font", e);
      } catch {
      }
    }
    this.dispatch("change", { font: e, color: Ae.color, timezone: Ae.timezone });
  },
  setColor(e) {
    Ae.color = e;
    const t = Li.find((o) => o.id === e);
    if (t) {
      lo.applyConfig({
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
    this.dispatch("change", { font: Ae.font, color: e, timezone: Ae.timezone });
  },
  setTimezone(e) {
    Ae.timezone = e;
    try {
      localStorage.setItem("lw_clock_tz", e);
    } catch {
    }
    this.dispatch("change", { font: Ae.font, color: Ae.color, timezone: e });
  },
  initPreferences() {
    try {
      const e = localStorage.getItem("lw_clock_font");
      if (e) {
        Ae.font = e;
        const s = xi.find((a) => a.id === e);
        s && lo.applyConfig({ fontFamily: s.font });
      }
      const t = localStorage.getItem("lw_clock_color");
      if (t) {
        Ae.color = t;
        const s = Li.find((a) => a.id === t);
        s && lo.applyConfig({ colorHex: s.hex, greetColor: s.hex, dateColor: s.hex, isCustomColor: !0 });
      }
      const o = localStorage.getItem("lw_clock_tz");
      o && (Ae.timezone = o);
    } catch {
    }
  },
  syncConfig(e) {
    e.font && (Ae.font = e.font), e.color && (Ae.color = e.color), e.timezone && (Ae.timezone = e.timezone);
  }
}, ge = Le({
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
let Wn = null, ln = !1;
async function cn(e, t = {}) {
  if (e === "poll") return { state: "ready", model: ge.model };
  if (e === "connect") return { state: "ready", model: ge.model };
  throw new Error("旧版 AI 对话桥接已退役，请使用「海狸聊天室」开启智能会话。");
}
function cs(e) {
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
  o || (e.state === "connecting" ? o = "正在连接本机 Codex 与 ChatGPT…" : e.state === "disconnected" ? o = "已待命（打开面板自动连接）" : e.authenticated ? o = `就绪 · ChatGPT ${e.plan || "已登录"}` : e.state === "ready" ? o = "就绪 · 尚未登录 ChatGPT" : o = t[e.state] || e.state), ge.statusText = o, ge.authHidden = !e.loginUrl, ge.authCode = e.loginCode || "", ge.authLink = e.loginUrl || "https://auth.openai.com/codex/device", ge.isStreaming = ln || e.busy || e.state === "running";
}
async function Xa() {
  try {
    const e = await cn("poll");
    cs(e);
  } catch {
  }
}
async function qa(e, t) {
  if (e === "open" || e === "connect")
    try {
      ge.statusText = "正在连接本机 Codex 与 ChatGPT…";
      const o = await cn("connect");
      cs(o);
    } catch (o) {
      ge.statusText = o?.message || "连接失败";
    }
  else if (e === "send" && t?.text) {
    const o = t.text;
    ge.messages.push({
      id: `msg-${Date.now()}`,
      role: "user",
      content: o
    }), ge.inputText = "", ge.isStreaming = !0, ln = !0;
    try {
      await cn("send", { text: o }), await Xa();
    } catch (s) {
      ge.statusText = s?.message || "发送失败";
    } finally {
      ln = !1, ge.isStreaming = !1;
    }
  } else if (e === "stop") {
    try {
      await cn("stop");
    } catch {
    }
    ge.isStreaming = !1, ln = !1;
  }
}
const pi = {
  state: ge,
  setMounted(e) {
    ge.mounted = e;
  },
  onAction(e) {
    Wn = e;
  },
  dispatch(e, t) {
    if (Wn)
      return Wn(e, t);
    qa(e, t);
  },
  open() {
    ge.isOpen = !0, this.dispatch("open");
  },
  close() {
    ge.isOpen = !1, this.dispatch("close");
  },
  newChat() {
    ge.messages = [], ge.inputText = "", ge.kwShelfHidden = !0, ge.keywords = [], this.dispatch("newChat");
  },
  send() {
    const e = ge.inputText.trim();
    !e || ge.isStreaming || this.dispatch("send", { text: e });
  },
  stop() {
    ge.isStreaming = !1, this.dispatch("stop");
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
    ge.keywords.forEach((t) => t.selected = e), this.dispatch("selectAllKeywords", { all: e });
  },
  toggleKeyword(e) {
    ge.keywords[e] && (ge.keywords[e].selected = !ge.keywords[e].selected, this.dispatch("toggleKeyword", { index: e, selected: ge.keywords[e].selected }));
  },
  deepDiveKeywords() {
    const e = ge.keywords.filter((t) => t.selected).map((t) => t.text);
    this.dispatch("deepDiveKeywords", { selected: e });
  }
}, Rn = Le({
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
}), qo = /* @__PURE__ */ new Set(), Ja = {
  state: Rn,
  open(e) {
    Object.assign(Rn, e, { open: !0 });
  },
  update(e) {
    Object.assign(Rn, e);
  },
  close() {
    qo.forEach((e) => e("close"));
  },
  save(e) {
    qo.forEach((t) => t("save", e));
  },
  onAction(e) {
    return qo.add(e), () => qo.delete(e);
  }
}, dn = Le({ isOpen: !1 }), ds = {
  state: dn,
  open() {
    dn.isOpen = !0;
  },
  close() {
    dn.isOpen = !1;
  }
}, Nn = "biliProfileCacheV1", _t = "biliLocallyKnownMessageIdsV1", Jo = "biliMessageUserCacheV1", _o = "githubKnownReleaseVersionsV1", Zo = "customNewtabAvatar", $i = "biliToastKnownCountsV1";
class Za {
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
    !t?.repository || !t?.version || (this.githubKnownVersions[t.repository] = t.version, typeof chrome < "u" && chrome?.storage?.local && await chrome.storage.local.set({ [_o]: this.githubKnownVersions }), this.notifyGitHubListeners());
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
      const r = Math.max(0, Number(this.unread?.[a] || 0));
      let m = Array.isArray(this.locallyKnownIds?.[a]) ? this.locallyKnownIds[a] : [];
      r < m.length && (m = [], this.locallyKnownIds[a] = [], o = !0), t[a] = Math.max(0, r - m.length);
    }), o && typeof chrome < "u" && chrome?.storage?.local && chrome.storage.local.set({ [_t]: this.locallyKnownIds }).catch(() => {
    }), t;
  }
  markKnown(t, o, s) {
    this.locallyKnownIds[t] || (this.locallyKnownIds[t] = []);
    let a = !1;
    o && !this.locallyKnownIds[t].includes(o) && (this.locallyKnownIds[t].push(o), a = !0), s && !this.locallyKnownIds[t].includes(s) && (this.locallyKnownIds[t].push(s), a = !0), a && typeof chrome < "u" && chrome?.storage?.local && chrome.storage.local.set({ [_t]: this.locallyKnownIds }).catch(() => {
    }), this.applyBiliProfile(this.profile, this.unread);
  }
  markAllKnown(t, o = []) {
    this.locallyKnownIds[t] || (this.locallyKnownIds[t] = []);
    const s = new Set(this.locallyKnownIds[t]);
    for (const r of o) r && s.add(r);
    const a = Math.max(0, Number(this.unread?.[t] || 0));
    if (s.size < a) {
      const r = a - s.size;
      for (let m = 0; m < r; m++) s.add(`__pad_${Date.now()}_${m}`);
    }
    this.locallyKnownIds[t] = Array.from(s), typeof chrome < "u" && chrome?.storage?.local && chrome.storage.local.set({ [_t]: this.locallyKnownIds }).catch(() => {
    }), this.applyBiliProfile(this.profile, this.unread);
  }
  applyBiliProfile(t, o = {}) {
    this.profile = t || null, this.unread = o || {};
    const a = this.customAvatar || String(t?.face || "assets/bilibili.svg").replace(/^http:/, "https:"), r = this.getVisibleUnread();
    if (so.avatarUrl = a, so.userName = t?.uname || "哔哩哔哩用户", so.buttonTitle = "通知中心", $n.avatarUrl = a, $n.userName = t?.uname || "用户", $n.mid = t?.mid, typeof document < "u") {
      const m = document.getElementById("bili-profile-avatar");
      m && (m.src = a);
      const f = document.getElementById("bili-profile-button");
      f && (f.title = so.buttonTitle);
    }
    Vt.updateState({
      userName: t?.uname || "哔哩哔哩用户",
      userMid: t?.mid ? String(t.mid) : "",
      userAvatar: a,
      unreadCounts: {
        reply: Number(r.reply || 0),
        at: Number(r.at || 0),
        like: Number(r.like || 0),
        system: Number(r.system || 0),
        private: Number(r.private || 0)
      }
    });
  }
  async refreshBiliProfile() {
    if (!this.isBiliRefreshing) {
      this.isBiliRefreshing = !0;
      try {
        const o = await (await fetch("https://api.bilibili.com/x/web-interface/nav", { credentials: "include" })).json();
        if (!o?.data?.isLogin) throw new Error("未登录");
        const s = {
          mid: o.data.mid,
          uname: o.data.uname,
          face: o.data.face
        }, [a, r, m] = await Promise.allSettled([
          fetch("https://api.bilibili.com/x/msgfeed/unread?build=0&mobi_app=web", { credentials: "include" }).then((M) => M.json()),
          fetch("https://api.vc.bilibili.com/x/im/web/msgfeed/unread", { credentials: "include" }).then((M) => M.json()),
          fetch("https://api.vc.bilibili.com/session_svr/v1/session_svr/single_unread", { credentials: "include" }).then((M) => M.json())
        ]), f = a.status === "fulfilled" ? a.value?.data || {} : {}, d = r.status === "fulfilled" ? r.value?.data || {} : {}, h = m.status === "fulfilled" ? m.value?.data || {} : {}, b = Number(d.at || 0), E = d.reply != null ? Number(d.reply || 0) : Math.max(0, Number(d.recv_reply || 0) - b), g = {
          reply: Math.max(Number(f.reply || 0), E),
          at: Math.max(Number(f.at || 0), b),
          like: Math.max(
            Number(f.like || f.praise || 0),
            Number(d.like || d.recv_like || 0)
          ),
          system: Math.max(Number(f.sys_msg || f.system || 0), Number(d.sys_msg || 0)),
          private: Number(
            f.chat || d.chat || Number(h.follow_unread || 0) + Number(h.unfollow_unread || 0) + Number(h.dustbin_push_msg || 0)
          )
        };
        this.applyBiliProfile(s, g), typeof chrome < "u" && chrome?.storage?.local && await chrome.storage.local.set({ [Nn]: { profile: s, unread: g, savedAt: Date.now() } }), this.checkAndNotifyBiliInteractions(g);
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
      this.biliToastKnownCounts = { ...o }, typeof chrome < "u" && chrome?.storage?.local && chrome.storage.local.set({ [$i]: this.biliToastKnownCounts }).catch(() => {
      });
      return;
    }
    const s = o.private - Number(this.biliToastKnownCounts.private || 0);
    o.like - Number(this.biliToastKnownCounts.like || 0);
    const a = o.reply - Number(this.biliToastKnownCounts.reply || 0), r = o.at - Number(this.biliToastKnownCounts.at || 0);
    o.system - Number(this.biliToastKnownCounts.system || 0), this.biliToastKnownCounts = { ...o }, typeof chrome < "u" && chrome?.storage?.local && chrome.storage.local.set({ [$i]: this.biliToastKnownCounts }).catch(() => {
    }), s > 0 && ke.show({
      appType: "bili",
      appName: "哔哩哔哩",
      icon: "assets/bilibili.svg",
      title: s > 1 ? `收到 ${s} 条新私信` : "收到新的私信",
      subtitle: "B站私信消息",
      message: "有人给你发送了私信，点击查看对话",
      target: { type: "bili-messages" },
      actionLabel: "查看私信",
      showActions: !0,
      onClick: () => {
        Vt.openPanel();
      }
    }), a > 0 && ke.show({
      appType: "bili",
      appName: "哔哩哔哩",
      icon: "assets/bilibili.svg",
      title: a > 1 ? `收到 ${a} 条新回复` : "收到新的评论回复",
      subtitle: "评论回复通知",
      message: "有人在评论区回复了你",
      target: { type: "bili-messages" },
      actionLabel: "查看回复",
      showActions: !0,
      onClick: () => {
        Vt.openPanel();
      }
    }), r > 0 && ke.show({
      appType: "bili",
      appName: "哔哩哔哩",
      icon: "assets/bilibili.svg",
      title: r > 1 ? `收到 ${r} 次新提及` : "有人 @了你",
      subtitle: "提到我的通知",
      message: "有人在动态或评论中 @了你",
      target: { type: "bili-messages" },
      actionLabel: "查看提及",
      showActions: !0,
      onClick: () => {
        Vt.openPanel();
      }
    });
  }
  init() {
    this.initialized || (this.initialized = !0, Bo.setActions({
      onAction: async (t) => {
        if (t === "messages")
          Wt.open();
        else if (t === "tabs")
          ds.open();
        else if (t === "refresh")
          await this.refreshBiliProfile();
        else if (t === "switch")
          typeof chrome < "u" && chrome?.tabs?.create ? chrome.tabs.create({ url: "https://passport.bilibili.com/login?gourl=https%3A%2F%2Fwww.bilibili.com%2F", active: !0 }) : window.open("https://passport.bilibili.com/login?gourl=https%3A%2F%2Fwww.bilibili.com%2F", "_blank");
        else if (t === "web") {
          const o = this.profile?.mid, s = o ? `https://space.bilibili.com/${o}` : "https://www.bilibili.com/";
          typeof chrome < "u" && chrome?.tabs?.create ? chrome.tabs.create({ url: s, active: !0 }) : window.open(s, "_blank");
        }
      }
    }), typeof chrome < "u" && chrome?.storage?.local && (chrome.storage.local.get([
      Nn,
      _t,
      Jo,
      _o,
      Zo
    ]).then((t) => {
      this.customAvatar = t[Zo] || "", this.locallyKnownIds = t[_t] && typeof t[_t] == "object" ? t[_t] : {}, this.userCache = t[Jo] && typeof t[Jo] == "object" ? t[Jo] : {}, this.githubKnownVersions = t[_o] && typeof t[_o] == "object" ? t[_o] : {};
      const o = t[Nn];
      o?.profile ? this.applyBiliProfile(o.profile, o.unread || {}) : this.applyBiliProfile(null, {});
    }).catch(() => {
    }), chrome.storage.onChanged && chrome.storage.onChanged.addListener((t, o) => {
      o === "local" && (t[Zo] && (this.customAvatar = t[Zo].newValue || "", this.applyBiliProfile(this.profile, this.unread)), t[_t] && (this.locallyKnownIds = t[_t].newValue || {}, this.applyBiliProfile(this.profile, this.unread)));
    })), Vt.onAction((t, o) => {
      t === "mark-known" ? this.markKnown(o.kind, o.id, o.talkerId) : t === "mark-all-known" && this.markAllKnown(o.kind, o.ids);
    }), this.refreshBiliProfile(), setTimeout(() => {
      this.loadGitHubUpdates();
    }, 3500));
  }
}
const Si = new Za(), me = Le({ open: !1, loading: !1, error: "", mid: "", name: "", face: "", sign: "", followed: !1, submitting: !1, left: 12, top: 12, videos: [] });
let Qo = null;
const un = {
  state: me,
  open(e, t) {
    Qo = t, Object.assign(me, { open: !0, loading: !0, error: "", submitting: !1, videos: [] }, e);
  },
  update(e) {
    Object.assign(me, e);
  },
  close() {
    me.submitting || (me.open = !1, Qo = null);
  },
  async toggleFollow() {
    if (!(!Qo || me.submitting)) {
      me.submitting = !0;
      try {
        const e = !me.followed;
        await Qo(e) && (me.followed = e);
      } finally {
        me.submitting = !1;
      }
    }
  }
}, us = {}, Ti = /* @__PURE__ */ new Set();
function ps() {
  return new Proxy(us, {
    get(e, t) {
      return t === "get" ? (o) => e[o] : t === "list" ? () => {
        const o = {};
        for (const [s, a] of Object.entries(e))
          o[s] = a?.state ?? a;
        return o;
      } : t === "snapshot" ? () => {
        const o = {};
        for (const [s, a] of Object.entries(e)) {
          const r = a?.history || [];
          o[s] = {
            state: a?.state ?? a,
            historyLength: r.length,
            lastTransition: r.length ? r[r.length - 1] : void 0
          };
        }
        return o;
      } : t === "exportTrace" ? () => {
        const o = {
          version: 1,
          exportedAt: (/* @__PURE__ */ new Date()).toISOString(),
          machinesCount: Object.keys(e).length,
          machines: {}
        };
        for (const [s, a] of Object.entries(e)) {
          const r = a?.history || [];
          o.machines[s] = {
            state: a?.state ?? a,
            historyCount: r.length,
            history: [...r]
          };
        }
        return o;
      } : t === "subscribeAll" ? (o) => (Ti.add(o), () => {
        Ti.delete(o);
      }) : e[t];
    }
  });
}
function Ii(e, t) {
  us[e] = t, typeof window < "u" && (window.__TAB_MACHINES__ = ps());
}
function Qa() {
  return ps();
}
const Ne = Le({
  currentTab: "stars",
  rangeText: "近 7 天",
  sinceDays: 7,
  repos: [],
  isLoading: !1,
  errorMessage: "",
  sourceText: "",
  fetchedAt: 0,
  hasLoaded: !1
}), On = /* @__PURE__ */ new Set();
let eo;
const Bn = new Ta();
async function er(e, t) {
  if (t.throwIfAborted(), new URL(e).origin !== "https://ghapi.h11.dev") throw new Error("Unexpected public source");
  const o = new AbortController(), s = () => o.abort();
  t.addEventListener("abort", s, { once: !0 });
  const a = setTimeout(s, 15e3);
  try {
    const r = await fetch(e, {
      signal: o.signal,
      credentials: "omit",
      redirect: "error",
      referrerPolicy: "no-referrer",
      cache: "no-store",
      headers: { Accept: "application/json" }
    });
    if (!r.ok)
      throw r.body?.cancel().catch(() => {
      }), new Error("Source unavailable");
    if (!r.body) throw new Error("Empty public source");
    const m = r.body.getReader(), f = new TextDecoder("utf-8", { fatal: !0 });
    let d = 0, h = "";
    try {
      for (; ; ) {
        o.signal.throwIfAborted();
        const b = await m.read();
        if (b.done) break;
        if (d += b.value.byteLength, d > 2 * 1024 * 1024) throw new Error("Public source exceeds limit");
        h += f.decode(b.value, { stream: !0 });
      }
      return o.signal.throwIfAborted(), JSON.parse(h + f.decode());
    } finally {
      m.cancel().catch(() => {
      }), m.releaseLock();
    }
  } finally {
    clearTimeout(a), t.removeEventListener("abort", s);
  }
}
function Mi(e, t) {
  const o = e?.name || e?.repository, s = t ? e?.full_name || (typeof o == "string" && o.includes("/") ? o : e?.author && o ? `${e.author}/${o}` : "") : e?.full_name;
  if (typeof s != "string" || !/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(s) || s.split("/").some((f) => f === "." || f === "..")) throw new Error("Invalid repository");
  const [a, r] = s.split("/"), m = (f) => typeof f == "number" && Number.isFinite(f) && f >= 0 ? f : void 0;
  return {
    name: r,
    full_name: s,
    owner: { login: a },
    description: typeof e.description == "string" ? e.description : "",
    language: typeof e.language == "string" ? e.language : "",
    stargazers_count: m(t ? e.stars ?? e.stargazers_count : e.stargazers_count),
    forks_count: m(t ? e.forks ?? e.forks_count : e.forks_count),
    html_url: `https://github.com/${encodeURIComponent(a)}/${encodeURIComponent(r)}`
  };
}
async function tr(e, t) {
  const o = new Date(Date.now() - e * 864e5).toISOString().slice(0, 10);
  let s = "";
  try {
    const m = await da(t), { data: f } = await ua(`/search/repositories?q=${encodeURIComponent(`is:public created:>${o}`)}&sort=stars&order=desc&per_page=30`, { headers: m, signal: t, maxBytes: 2 * 1024 * 1024 });
    if (t.throwIfAborted(), !Array.isArray(f?.items)) throw new Error("Invalid search response");
    return {
      repos: f.items.slice(0, 30).map((d) => Mi(d, !1)),
      sourceText: `GitHub Search：UTC 日期 ${o} 之后新建的仓库，按累计 Star 排序；不是官方 Trending 榜。${f.incomplete_results ? " API 标记为不完整结果。" : ""}`
    };
  } catch (m) {
    t.throwIfAborted(), s = m instanceof pa ? m.message : "主源响应格式无效。";
  }
  const a = e === 1 ? "daily" : e === 7 ? "weekly" : "monthly", r = await er(`https://ghapi.h11.dev/repositories?since=${a}`, t);
  if (t.throwIfAborted(), !Array.isArray(r)) throw new Error("Invalid fallback response");
  return {
    repos: r.slice(0, 30).map((m) => Mi(m, !0)),
    sourceText: `GitHub Search 不可用：${s} 改用第三方 ghapi.h11.dev 的 ${a} 趋势快照（不发送账号凭据）；口径与新建仓库搜索不同，源更新时间未提供。`
  };
}
const hs = {
  get state() {
    return Ne;
  },
  // View attachment permits starting reads; detaching does not cancel an
  // already requested read. Range changes still replace the old session.
  attachView(e) {
    return eo = e, !e.aborted && !Ne.hasLoaded && !Bn.pending && this.refresh(), () => {
      eo === e && (eo = void 0);
    };
  },
  switchTab(e) {
    Ne.currentTab = e, this.dispatch("switch-tab", e);
  },
  async switchRange(e, t) {
    !eo || eo.aborted || ![1, 7, 30].includes(e) || e === Ne.sinceDays || (Bn.cancel(), Object.assign(Ne, {
      sinceDays: e,
      rangeText: `近 ${e} 天`,
      repos: [],
      sourceText: "",
      fetchedAt: 0,
      hasLoaded: !1,
      errorMessage: "",
      isLoading: !1
    }), this.dispatch("switch-range", { days: e, text: Ne.rangeText }), await this.refresh());
  },
  async refresh() {
    const e = eo;
    if (!e || e.aborted || Ne.isLoading) return;
    const t = Ne.sinceDays, o = Bn.begin({
      timeoutMs: 45e3,
      isCurrent: () => Ne.sinceDays === t,
      onStop: (a) => {
        Ne.isLoading = !1, a === "timeout" && (Ne.errorMessage = "数据源读取超过整体45秒上限，请手动刷新；没有继续请求备用源。");
      }
    }), s = o.current;
    if (s()) {
      Ne.isLoading = !0, Ne.errorMessage = "";
      try {
        const a = await o.wait(() => tr(t, o.signal));
        if (!s()) return;
        Ne.repos = a.repos, Ne.sourceText = a.sourceText, Ne.fetchedAt = Date.now(), Ne.hasLoaded = !0;
      } catch {
        s() && (Ne.errorMessage = Ne.hasLoaded ? "刷新失败，保留同一时间范围的上次读取结果；请检查网络或额度后手动刷新。" : "数据源读取失败或超时；未使用内置样例，请稍后手动刷新。");
      } finally {
        o.finish() && (Ne.isLoading = !1, this.dispatch("refresh"));
      }
    }
  },
  selectRepo(e) {
    this.dispatch("select-repo", e);
  },
  onAction(e) {
    return On.add(e), () => {
      On.delete(e);
    };
  },
  dispatch(e, t) {
    for (const o of On)
      try {
        o(e, t);
      } catch {
      }
  }
}, Zn = () => ({
  icon: "🧭",
  title: "快捷轮盘",
  desc: "移动鼠标选择",
  active: !1
}), hi = () => ({
  visible: !1,
  wedgePath: "",
  arcPath: "",
  line1: { x1: 0, y1: 0, x2: 0, y2: 0 },
  line2: { x1: 0, y1: 0, x2: 0, y2: 0 }
}), ne = Le({
  mounted: !1,
  isOpen: !1,
  isExpanded: !1,
  mode: "main",
  ballPosition: { x: 0, y: 0 },
  hub: Zn(),
  activeSectorId: null,
  sectors: [],
  beam: hi()
});
let Di = null;
function or(e, t) {
  if (typeof e != "number" || !t)
    return hi();
  const o = 160, s = 160, a = 26, r = 154, m = 360 / t, f = e - m / 2, d = e + m / 2, h = f * Math.PI / 180, b = d * Math.PI / 180, E = o + a * Math.cos(h), g = s + a * Math.sin(h), M = o + r * Math.cos(h), v = s + r * Math.sin(h), w = o + a * Math.cos(b), T = s + a * Math.sin(b), y = o + r * Math.cos(b), C = s + r * Math.sin(b), L = m > 180 ? 1 : 0, B = `M ${E.toFixed(1)} ${g.toFixed(1)} L ${M.toFixed(1)} ${v.toFixed(1)} A ${r} ${r} 0 ${L} 1 ${y.toFixed(1)} ${C.toFixed(1)} L ${w.toFixed(1)} ${T.toFixed(1)} A ${a} ${a} 0 ${L} 0 ${E.toFixed(1)} ${g.toFixed(1)} Z`, H = `M ${M.toFixed(1)} ${v.toFixed(1)} A ${r} ${r} 0 ${L} 1 ${y.toFixed(1)} ${C.toFixed(1)}`;
  return {
    visible: !0,
    wedgePath: B,
    arcPath: H,
    line1: {
      x1: parseFloat(E.toFixed(1)),
      y1: parseFloat(g.toFixed(1)),
      x2: parseFloat(M.toFixed(1)),
      y2: parseFloat(v.toFixed(1))
    },
    line2: {
      x1: parseFloat(w.toFixed(1)),
      y1: parseFloat(T.toFixed(1)),
      x2: parseFloat(y.toFixed(1)),
      y2: parseFloat(C.toFixed(1))
    }
  };
}
const Pe = {
  get state() {
    return ne;
  },
  getSnapshot() {
    return Rt(ne);
  },
  setMounted(e) {
    ne.mounted = e;
  },
  setBallPosition(e, t) {
    ne.ballPosition.x = e, ne.ballPosition.y = t;
  },
  setVisibility(e) {
    ne.isOpen = e;
  },
  setHub(e) {
    e ? ne.hub = {
      icon: e.icon || "🧭",
      title: e.title || "快捷轮盘",
      desc: e.desc || "移动鼠标选择",
      active: !!e.active
    } : ne.hub = Zn();
  },
  setBeam(e, t) {
    ne.beam = or(e, t);
  },
  setActiveSector(e) {
    ne.activeSectorId = e;
  },
  setSectors(e) {
    ne.sectors = [...e];
  },
  expand(e, t, o = "main") {
    ne.isOpen = !0, ne.isExpanded = !0, ne.mode = o, typeof e == "number" && typeof t == "number" && this.setBallPosition(e, t);
  },
  collapse() {
    ne.isExpanded = !1, ne.mode = "main", ne.activeSectorId = null, ne.beam = hi(), ne.hub = Zn();
  },
  setWheelMode(e) {
    ne.mode = e;
  },
  setActionHandler(e) {
    Di = e;
  },
  dispatch(e, t) {
    Di?.(e, t);
  }
}, fs = [
  { id: "daily-bilibili", title: "b站插件", desc: "B站收藏夹与追番视频", icon: "assets/bilibili.svg" },
  { id: "daily-aihot", title: "ai hot插件", desc: "全网 AI 与前沿科技资讯", icon: "assets/nav-aihot.svg" },
  { id: "folder", title: "常用网站", desc: "点击展开快捷网站子轮盘", icon: "assets/nav-folder.svg", mode: "shortcuts" },
  { id: "card-github", title: "github插件", desc: "GitHub 趋势与星标项目", icon: "assets/nav-github.svg" },
  { id: "launcher", title: "首页", desc: "返回主屏常用应用台", icon: "assets/nav-home.svg" }
];
function nr() {
  return fs.filter((e) => e.mode || e.id === "launcher" || mn(e.id));
}
function ir() {
  return ma.filter((e) => e.kind === "module" && mn(e.id)).map((e) => ({
    id: e.id,
    title: e.title,
    desc: e.isDev ? "已启用的实验性组件" : e.categoryLabel,
    icon: e.icon || e.emoji || "🧩",
    tool: e.id
  }));
}
function Ai() {
  ne.isExpanded && ht();
}
let Qn = [], Eo = fs, xt = { x: 400, y: 300 }, gs = !1, Co = !1, Fn = null, xo = null, pt = !1;
const sr = Le(/* @__PURE__ */ new Set()), ar = /* @__PURE__ */ new Map();
function Pt() {
  return globalThis.chrome?.storage;
}
function ms(e, t) {
  const o = ne.isExpanded ? 160 : 24;
  Pe.setBallPosition(
    Math.max(o + 8, Math.min(window.innerWidth - o - 8, e)),
    Math.max(o + 8, Math.min(window.innerHeight - o - 8, t))
  );
}
function ht() {
  const e = ne.mode;
  let t = [];
  e === "shortcuts" && (t = [...Qn], t.push({
    id: "toggle-edit-shortcuts",
    title: pt ? c("navwheel.finishEdit") : c("navwheel.editSites"),
    desc: pt ? c("navwheel.finishEditDesc") : c("navwheel.editSitesDesc"),
    icon: pt ? "✅" : "✏️"
  })), Eo = e === "tools" ? ir() : e === "shortcuts" ? [
    ...t,
    { id: "back-to-main", title: c("navwheel.back"), desc: c("navwheel.backDesc"), icon: "🔙", mode: "main" }
  ] : nr();
  const o = Eo.length, s = o > 12 ? 118 : o > 9 ? 114 : 110, a = o > 12 ? 46 : o > 9 ? 50 : 56;
  Pe.setSectors(Eo.map((r, m) => {
    const f = -90 + 360 / o * m, d = f * Math.PI / 180;
    return {
      id: r.id,
      title: r.title,
      desc: r.desc,
      icon: r.icon,
      angleDeg: f,
      x: Math.round(160 + Math.cos(d) * s),
      y: Math.round(160 + Math.sin(d) * s),
      size: a,
      isShortcut: !!r.url
    };
  })), Pe.setWheelMode(e), Pe.setActiveSector(null), Pe.setBeam(null, 0), Pe.setHub(e === "shortcuts" ? pt ? { icon: "✏️", title: c("navwheel.editing") } : { icon: "🔙", title: c("navwheel.shortcuts") } : e === "tools" ? { icon: "🧰", title: c("navwheel.tools") } : null);
}
function yn(e) {
  ne.mode = e, ht();
}
function Ut() {
  Pe.collapse(), ms(ne.ballPosition.x, ne.ballPosition.y), Pe.setVisibility(gs);
}
function oo(e = ne.ballPosition.x, t = ne.ballPosition.y, o = "main") {
  Pe.expand(void 0, void 0, o), ms(e, t), ht(), Pe.setVisibility(!0);
}
function rr(e) {
  if (e.id === "toggle-edit-shortcuts") {
    vs();
    return;
  }
  if (pt && e.url) {
    ke.show({
      appName: c("navwheel.appName"),
      title: c("navwheel.editingNotice"),
      message: c("navwheel.editingHint"),
      duration: 2500
    });
    return;
  }
  if (!(e.tool && !mn(e.tool) || !e.url && !e.mode && e.id !== "launcher" && !mn(e.id))) {
    if (e.mode) {
      yn(e.mode);
      return;
    }
    if (Ut(), e.url) {
      window.open(e.url, "_blank");
      return;
    }
    if (e.tool) {
      window.triggerToolShortcut?.(e.tool);
      return;
    }
    e.id === "launcher" ? (typeof window < "u" && window.scrollTo({ top: 0, left: 0, behavior: "instant" }), zt.exit(), document.body && (document.body.dataset.page = "home")) : zt.enter(e.id);
  }
}
function vs() {
  pt = !pt, pt ? (ke.show({
    appName: c("navwheel.appName"),
    title: c("navwheel.enterEditMode"),
    message: c("navwheel.editModeDesc"),
    duration: 5e3
  }), ht()) : (ke.show({
    appName: c("navwheel.appName"),
    title: c("navwheel.editDone"),
    message: c("navwheel.editSaved"),
    duration: 2e3
  }), ht());
}
async function lr(e) {
  if (!pt || !e || !e.url) return !1;
  try {
    const t = await Pt()?.local?.get(["siteShelfLinks", "logicweaverNavWheelShortcutsV1"]), o = Array.isArray(t?.siteShelfLinks) ? t.siteShelfLinks : Array.isArray(t?.logicweaverNavWheelShortcutsV1) ? t.logicweaverNavWheelShortcutsV1 : [], s = o.findIndex((m) => m.url === e.url);
    if (s >= 0) {
      const m = o.filter((f, d) => d !== s);
      return await Pt()?.local?.set({ siteShelfLinks: m, logicweaverNavWheelShortcutsV1: m }), await Xe.loadShortcuts(), ht(), ke.show({
        appName: c("navwheel.appName"),
        title: c("navwheel.removedNotice"),
        message: c("navwheel.removedSite", { name: e.title || e.url }),
        duration: 2e3
      }), !0;
    }
    if (o.length >= 12)
      return ke.show({
        appName: c("navwheel.appName"),
        title: c("navwheel.limitTitle"),
        message: c("navwheel.maxLimitNotice"),
        duration: 2500
      }), !0;
    const a = {
      id: String(e.id || `wheel-${Date.now()}`),
      title: e.title || c("navwheel.site"),
      url: e.url,
      icon: e.icon || "",
      customIcon: e.customIcon || ""
    }, r = [...o, a];
    return await Pt()?.local?.set({ siteShelfLinks: r, logicweaverNavWheelShortcutsV1: r }), await Xe.loadShortcuts(), ht(), ke.show({
      appName: c("navwheel.appName"),
      title: c("navwheel.addedTitle"),
      message: c("navwheel.addedNotice", { name: a.title }),
      duration: 2500
    }), !0;
  } catch (t) {
    return console.warn("[NavWheel] 即时处理快捷方式失败", t), !1;
  }
}
async function cr(e) {
  try {
    const t = await Pt()?.local?.get(["siteShelfLinks", "logicweaverNavWheelShortcutsV1"]), o = Array.isArray(t?.siteShelfLinks) ? t.siteShelfLinks : Array.isArray(t?.logicweaverNavWheelShortcutsV1) ? t.logicweaverNavWheelShortcutsV1 : [], s = o.find((r) => String(r.id) === String(e)), a = o.filter((r) => String(r.id) !== String(e));
    await Pt()?.local?.set({ siteShelfLinks: a, logicweaverNavWheelShortcutsV1: a }), await Xe.loadShortcuts(), ht(), s && ke.show({
      appName: c("navwheel.appName"),
      title: c("navwheel.removedNotice"),
      message: c("navwheel.removedSite", { name: s.title || c("navwheel.site") }),
      duration: 2500
    });
  } catch (t) {
    console.warn("[NavWheel] 删除快捷方式失败", t);
  }
}
function Ei(e) {
  xt = { x: e.clientX, y: e.clientY };
}
function Pi(e) {
  e.button === 1 && (e.preventDefault(), e.stopPropagation(), xt = { x: e.clientX, y: e.clientY }, ne.isExpanded ? Ut() : oo(e.clientX, e.clientY));
}
function Wi(e) {
  e.button === 1 && e.preventDefault();
}
function Ri(e) {
  if (e.key === "Escape") {
    if (pt) {
      e.preventDefault(), e.stopPropagation(), pt = !1, sr.clear(), ar.clear(), ht(), ke.show({
        appName: c("navwheel.appName"),
        title: c("navwheel.exitedEditing"),
        duration: 1500
      });
      return;
    }
    if (!ne.isExpanded || li.active) return;
    e.preventDefault(), e.stopPropagation(), ne.mode === "shortcuts" ? yn("main") : Ut();
  }
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
    const o = Ee.getCachedIcon(e.url);
    if (o) return o;
    const s = dr(e.url);
    if (s) return s;
  }
  return e.icon || "🔗";
}
const Xe = {
  async start() {
    if (!Co) {
      Co = !0, Fn = We(mt, () => {
        ne.isExpanded && ht();
      }), xt = { x: Math.round(window.innerWidth / 2), y: Math.round(window.innerHeight / 2) }, Pe.setActionHandler((e, t) => {
        if (e === "hub:click")
          ne.isExpanded ? ne.mode === "shortcuts" ? yn("main") : Ut() : oo();
        else if (e === "sector:click" || e === "container:click") {
          const o = Eo.find((s) => s.id === t?.id || e === "container:click" && s.id === ne.activeSectorId);
          o && rr(o);
        } else if (e === "sector:hover") {
          const o = ne.sectors.find((s) => s.id === t?.id);
          o && (Pe.setHub({ icon: o.icon, title: o.title, desc: o.desc, active: !0 }), Pe.setActiveSector(o.id), Pe.setBeam(o.angleDeg, Eo.length));
        } else e === "sector:leave" && (Pe.setActiveSector(null), Pe.setBeam(null, 0), Pe.setHub(ne.mode === "shortcuts" ? { icon: "🔙", title: c("navwheel.shortcuts") } : ne.mode === "tools" ? { icon: "🧰", title: c("navwheel.tools") } : null));
      }), window.addEventListener("logicweaver:dock-modules-changed", Ai), window.addEventListener("pointermove", Ei, { passive: !0 }), window.addEventListener("mousedown", Pi, !0), window.addEventListener("auxclick", Wi, !0), window.addEventListener("keydown", Ri, !0), xo = (e, t) => {
        t === "local" && (e.siteShelfLinks || e.logicweaverNavWheelShortcutsV1) && this.loadShortcuts();
      }, Pt()?.onChanged?.addListener(xo);
      try {
        if (!Co) return;
        gs = !1, Pe.setVisibility(!1);
      } catch {
      }
      await this.loadShortcuts(), ht();
    }
  },
  stop() {
    Co = !1, Fn?.(), Fn = null, Pe.setActionHandler(null), window.removeEventListener("logicweaver:dock-modules-changed", Ai), window.removeEventListener("pointermove", Ei), window.removeEventListener("mousedown", Pi, !0), window.removeEventListener("auxclick", Wi, !0), window.removeEventListener("keydown", Ri, !0), xo && Pt()?.onChanged?.removeListener(xo), xo = null;
  },
  async loadShortcuts() {
    try {
      const e = await Pt()?.local?.get(["siteShelfLinks", "logicweaverNavWheelShortcutsV1"]);
      if (!Co) return;
      const t = e?.siteShelfLinks?.length ? e.siteShelfLinks : e?.logicweaverNavWheelShortcutsV1;
      Qn = (Array.isArray(t) ? t : []).map((o, s) => ({
        id: String(o.id || `wheel-${s}`),
        title: String(o.title || o.url || c("navwheel.site")),
        desc: String(o.url || ""),
        url: String(o.url || ""),
        icon: ur(o)
      })), ne.mode === "shortcuts" && ht();
    } catch (e) {
      console.warn("[NavWheel] 读取快捷方式失败", e);
    }
  },
  open(e, t) {
    oo(e ?? xt.x, t ?? xt.y);
  },
  close: Ut,
  get isEditingShortcuts() {
    return pt;
  },
  isLinkInWheel(e) {
    return e ? Qn.some((t) => t.url === e) : !1;
  },
  toggleEditingShortcuts: vs,
  handleLinkSelection: lr,
  removeShortcut: cr,
  toggle(e = !1) {
    ne.isExpanded ? Ut() : e ? oo(xt.x, xt.y) : oo();
  },
  toggleTools(e = !0) {
    ne.isExpanded && ne.mode === "tools" ? Ut() : oo(
      e ? xt.x : ne.ballPosition.x,
      e ? xt.y : ne.ballPosition.y,
      "tools"
    );
  },
  setMode(e) {
    yn(e);
  }
};
class co {
  constructor() {
    this.activeShortcuts = { ...Sn }, this.isListenerBound = !1, this.storageListenerBound = !1, this.shortcutReadVersion = 0, this.initShortcuts();
  }
  static getInstance() {
    return co.instance || (co.instance = new co()), co.instance;
  }
  getShortcuts() {
    return { ...this.activeShortcuts };
  }
  async setShortcut(t, o) {
    if (typeof t != "string" || !t || typeof o != "string")
      throw new Error("快捷键参数无效，未保存");
    if (typeof chrome > "u" || !chrome.storage?.local)
      throw new Error("快捷键存储不可用，未保存");
    const { optionsService: s, SHORTCUT_STORAGE_KEY: a } = await import("./options.service-Dd2PWcro.js").then((b) => b.b), m = (await chrome.storage.local.get(a))[a], f = { ...m || {}, [t]: o }, d = this.shortcutReadVersion, h = await s.saveSettings(
      { [a]: f },
      { [a]: m }
    );
    d === this.shortcutReadVersion && (++this.shortcutReadVersion, this.applyShortcutOverrides(h[a]));
  }
  applyShortcutOverrides(t) {
    const o = t && typeof t == "object" && !Array.isArray(t) ? Object.entries(t).filter((s) => Object.prototype.hasOwnProperty.call(Sn, s[0]) && typeof s[1] == "string") : [];
    this.activeShortcuts = { ...Sn, ...Object.fromEntries(o) };
  }
  async initShortcuts() {
    if (!(typeof chrome > "u" || !chrome.storage?.local))
      try {
        !this.storageListenerBound && chrome.storage?.onChanged?.addListener && (chrome.storage.onChanged.addListener((s, a) => {
          a === "local" && Object.prototype.hasOwnProperty.call(s, "customShortcuts") && (++this.shortcutReadVersion, this.applyShortcutOverrides(s.customShortcuts.newValue));
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
    if (!t || !wi(t)) return !1;
    if (it(t))
      return Oe.handleToolClick(t), !0;
    switch (t) {
      case "bookmarks":
        return bn.toggle(), !0;
      case "settings":
        return Fo.open(), !0;
      case "nav-wheel":
        return Xe.toggle(!0), !0;
      case "toolbox":
        return Xe.toggleTools(!0), !0;
      case "search": {
        if (typeof document < "u") {
          const o = document.getElementById("search-input");
          if (o)
            return o.focus(), o.select(), !0;
        }
        return !1;
      }
      case "todoist-new-task":
        return typeof window < "u" && typeof window.triggerTodoistQuickAdd == "function" ? window.triggerTodoistQuickAdd() : Oe.handleToolClick("todoist"), !0;
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
        if (li.active || t.defaultPrevented || t.isComposing || t.repeat || t.target && (t.target.matches("input, textarea, select") || t.target.isContentEditable) && !t.altKey && !t.ctrlKey && !t.metaKey)
          return;
        const s = va(t);
        if (!s) return;
        const a = s.toLowerCase();
        for (const [r, m] of Object.entries(this.activeShortcuts))
          if (!(!m || !wi(r)) && m.toLowerCase().replace(/^cmd\+/, "meta+") === a) {
            t.preventDefault(), t.stopPropagation(), this.triggerToolShortcut(r);
            break;
          }
      },
      !0
    ));
  }
}
const ei = co.getInstance();
class uo {
  constructor() {
    this._isVisible = z(typeof document < "u" ? !document.hidden : !0), this.callbacks = /* @__PURE__ */ new Set(), this.activeIntervals = /* @__PURE__ */ new Set(), typeof document < "u" && document.addEventListener("visibilitychange", () => {
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
        } catch (s) {
          console.warn("[PageVisibility] callback error:", s);
        }
    });
  }
  static getInstance() {
    return uo.instance || (uo.instance = new uo()), uo.instance;
  }
  get isVisible() {
    return Rt(this._isVisible);
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
    const s = {
      handler: t,
      intervalMs: o,
      timerId: null
    };
    return { start: () => {
      this.activeIntervals.add(s), this.isVisibleNow() && !s.timerId && (s.timerId = setInterval(s.handler, s.intervalMs));
    }, stop: () => {
      this.activeIntervals.delete(s), s.timerId && (clearInterval(s.timerId), s.timerId = null);
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
const pr = uo.getInstance(), Ni = [
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
function en(e) {
  return e === 0 ? { emoji: "☀️", label: c("weather.condition.clear") } : e <= 2 ? { emoji: "🌤️", label: c("weather.condition.mainlyClear") } : e === 3 ? { emoji: "☁️", label: c("weather.condition.cloudy") } : e === 45 || e === 48 ? { emoji: "🌫️", label: c("weather.condition.fog") } : e >= 51 && e <= 57 ? { emoji: "🌦️", label: c("weather.condition.drizzle") } : e >= 61 && e <= 67 ? { emoji: "🌧️", label: c("weather.condition.rain") } : e >= 71 && e <= 77 ? { emoji: "🌨️", label: c("weather.condition.snow") } : e >= 80 && e <= 82 ? { emoji: "🌧️", label: c("weather.condition.rainShower") } : e >= 85 && e <= 86 ? { emoji: "🌨️", label: c("weather.condition.snowShower") } : e >= 95 ? { emoji: "⛈️", label: c("weather.condition.thunderstorm") } : { emoji: "🌡️", label: c("weather.condition.unknown") };
}
class po {
  constructor() {
    this.currentCity = "武汉", this.isRefreshing = !1, this.activeRequestId = 0, this.lastRawForecastData = null, this.initStorage();
  }
  static getInstance() {
    return po.instance || (po.instance = new po()), po.instance;
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
  reformatCurrentWeather() {
    if (!this.lastRawForecastData) return;
    const { city: t, loc: o, d: s } = this.lastRawForecastData;
    this.applyForecastPayload(t, o, s);
  }
  applyForecastPayload(t, o, s) {
    const a = en(s.current?.weather_code ?? 0), r = Math.round(s.current?.temperature_2m ?? 0), m = s.hourly?.time || [], f = Date.now();
    let d = m.findIndex((L) => new Date(L).getTime() >= f);
    d < 0 && (d = 0);
    const h = [];
    for (let L = d; L < Math.min(d + 5, m.length); L++) {
      const B = L === d ? c("weather.now") : c("weather.hourSuffix", { hour: new Date(m[L]).getHours() }), H = en(s.hourly.weather_code[L]), G = Math.round(s.hourly.temperature_2m[L]);
      h.push({ time: B, emoji: H.emoji, temp: G });
    }
    let b = c("weather.noRain12h");
    for (let L = d; L < Math.min(d + 12, m.length); L++) {
      const B = s.hourly.weather_code[L], H = s.hourly.precipitation_probability?.[L] || 0;
      if (B >= 51 || H >= 60) {
        const G = new Date(m[L]).getHours(), _ = B >= 71 && B <= 77 || B === 85 || B === 86 ? c("weather.snow") : c("weather.rain"), $ = H ? ` (${H}%)` : "";
        b = c("weather.expectPrecip", { time: `${G}:00`, type: _, prob: $ });
        break;
      }
    }
    const E = [c("weather.today"), c("weather.tomorrow"), c("weather.afterTomorrow")], g = [], M = s.daily?.time?.length || 0;
    for (let L = 1; L < Math.min(3, M); L++) {
      const B = E[L] || c("weather.plusDays", { count: L }), H = en(s.daily.weather_code[L]), G = `${Math.round(s.daily.temperature_2m_max[L])}°/${Math.round(s.daily.temperature_2m_min[L])}°`;
      g.push({ label: B, emoji: H.emoji, tempRange: G });
    }
    const v = Math.round(s.daily?.temperature_2m_max?.[0] ?? r), w = Math.round(s.daily?.temperature_2m_min?.[0] ?? r), T = c("weather.tempRange", { cond: a.label, max: v, min: w }), y = {
      cityName: o.name || t,
      currentEmoji: a.emoji,
      currentTemp: r,
      subText: T,
      rainText: b,
      hours: h,
      days: g
    };
    if (ut.ready(y, t), s.daily?.time) {
      const L = [
        c("weather.weekday.sun"),
        c("weather.weekday.mon"),
        c("weather.weekday.tue"),
        c("weather.weekday.wed"),
        c("weather.weekday.thu"),
        c("weather.weekday.fri"),
        c("weather.weekday.sat")
      ], B = [];
      for (let H = 0; H < s.daily.time.length; H++) {
        const G = new Date(s.daily.time[H]), A = H === 0 ? c("weather.today") : H === 1 ? c("weather.tomorrow") : H === 2 ? c("weather.afterTomorrow") : L[G.getDay()], _ = en(s.daily.weather_code[H]);
        B.push({
          date: `${G.getMonth() + 1}/${G.getDate()}`,
          dayName: A,
          emoji: _.emoji,
          condition: _.label,
          highTemp: Math.round(s.daily.temperature_2m_max[H]),
          lowTemp: Math.round(s.daily.temperature_2m_min[H]),
          rainProb: s.daily.precipitation_probability_max?.[H] || 0
        });
      }
      ut.setForecastDays(B);
    }
    const C = {
      humidity: s.current?.relative_humidity_2m ? `${s.current.relative_humidity_2m}%` : "60%",
      wind: s.current?.wind_speed_10m ? `${Math.round(s.current.wind_speed_10m)} km/h` : c("weather.detail.windLight"),
      uvIndex: c("weather.detail.uvNormal"),
      airQuality: c("weather.detail.airGood")
    };
    ut.setDetailInfo(C);
  }
  filterCities(t, o = 8) {
    const s = t.trim().toLowerCase();
    if (!s) return Ni.slice(0, o);
    const a = [];
    for (const r of Ni) {
      const m = r.name.toLowerCase(), f = r.pinyin.toLowerCase(), d = r.admin.toLowerCase();
      if ((m.startsWith(s) || f.startsWith(s) || m.includes(s) || f.includes(s) || d.includes(s)) && a.push(r), a.length >= o) break;
    }
    return a;
  }
  async loadWeather(t) {
    const o = (t || this.currentCity || "").trim();
    if (!o) {
      ut.unconfigured();
      return;
    }
    if (this.isRefreshing) return;
    this.isRefreshing = !0;
    const s = ++this.activeRequestId;
    ut.loading(o);
    try {
      const a = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(o)}&count=1&language=zh&format=json`, r = await fetch(a);
      if (s !== this.activeRequestId || q.state === "unconfigured") {
        this.isRefreshing = !1;
        return;
      }
      const f = (await r.json()).results?.[0];
      if (!f) {
        s === this.activeRequestId && q.state !== "unconfigured" && ut.notFound(o), this.isRefreshing = !1;
        return;
      }
      const d = `https://api.open-meteo.com/v1/forecast?latitude=${f.latitude}&longitude=${f.longitude}&current=temperature_2m,weather_code,relative_humidity_2m,wind_speed_10m&hourly=temperature_2m,weather_code,precipitation_probability&daily=temperature_2m_max,temperature_2m_min,weather_code,precipitation_probability_max&forecast_days=7&timezone=auto`, h = await fetch(d);
      if (s !== this.activeRequestId || q.state === "unconfigured") {
        this.isRefreshing = !1;
        return;
      }
      const b = await h.json();
      this.lastRawForecastData = { city: o, loc: f, d: b }, s === this.activeRequestId && q.state !== "unconfigured" && this.applyForecastPayload(o, f, b);
    } catch (a) {
      s === this.activeRequestId && q.state !== "unconfigured" && ut.error(a?.message || "天气加载失败，右键此处可重新选择地点。", o);
    } finally {
      s === this.activeRequestId && (this.isRefreshing = !1);
    }
  }
}
const no = po.getInstance();
function hr(e, t) {
  window.LogicWeaverIntro = wt, window.LogicWeaverStartupIntro = wt, window.LogicWeaverNotifications = ke, window.LogicWeaverWindowManager = Oe, window.LogicWeaverWindowTabs = Oe, window.LogicWeaverDomFreezer = ya, window.LogicWeaverWallpaperService = gn, window.LogicWeaverLauncherService = Ee, window.LogicWeaverLauncherRuntime = Xn, window.LogicWeaverProfileService = Si;
  try {
    Si.init();
  } catch (o) {
    console.error("[ProfileService] init failed:", o);
  }
  window.LogicWeaverBookmarksService = si, window.LogicWeaverCalendarService = na, window.LogicWeaverWeather = ut, window.LogicWeaverWeatherService = no, window.LogicWeaverClock = lo, window.LogicWeaverSearch = Us, window.LogicWeaverSearchService = Ys, Object.defineProperty(window, "LogicWeaverAiHotService", {
    configurable: !0,
    get: () => {
      import("./aihot.service-DtWpsFyZ.js").then(({ aiHotService: o }) => {
        window.LogicWeaverAiHotService = o;
      });
    }
  }), window.LogicWeaverHomeMusic = Qe, window.LogicWeaverLauncherGroups = Fe, window.LogicWeaverProfileMenu = Bo, window.LogicWeaverWorkspaceLaunchers = ui, window.LogicWeaverMacDock = Lt, window.LogicWeaverFullscreen = zt, window.enterFullscreenCard = (o) => zt.enter(o), window.exitFullscreenCard = () => zt.exit(), window.cycleFullscreenCard = () => zt.cycle(), window.LogicWeaverPageVisibility = pr, window.LogicWeaverBackgroundLibrary = Ci, window.LogicWeaverNotificationCenter = Wt, window.LogicWeaverBookmarkMenu = ai, window.LogicWeaverBookmarkPanel = bn, window.LogicWeaverBookmarkFolderStrip = fn, window.LogicWeaverLauncherDialogs = zi, window.LogicWeaverLauncherFolder = Gi, window.LogicWeaverLauncherMenus = ni, window.LogicWeaverSettings = Fo, window.LogicWeaverClockSettings = Gt, window.LogicWeaverBiliTheater = Ao, window.LogicWeaverBilibiliService = gi, window.getBiliJct = () => gi.getBiliJct(), window.LogicWeaverBiliMiniPlayer = sn, window.openBiliMiniPlayer = (o) => sn.openVideo(o), window.LogicWeaverAiDialog = pi, window.LogicWeaverAihotViewer = ci, window.LogicWeaverNavWheel = Pe, window.openNavWheel = (o, s) => Xe.open(o, s), window.closeNavWheel = () => Xe.close(), window.toggleNavWheel = (o) => Xe.toggle(o), window.toggleToolWheel = (o) => Xe.toggleTools(o), window.setNavWheelMode = (o) => Xe.setMode(o), window.LogicWeaverShortcuts = ei, window.triggerToolShortcut = (o) => ei.triggerToolShortcut(o), window.LogicWeaverCommands = e, window.LogicWeaverFeatures = t, window.LogicWeaverCalendarView = ia, window.LogicWeaverGitHubStatus = ri, window.LogicWeaverGitHubFolders = Io, window.LogicWeaverGitHubHero = Mo, window.LogicWeaverGitHubRepositories = At, window.LogicWeaverGitHubBatchBar = Do, window.LogicWeaverTodoistLabels = sa, window.LogicWeaverTodoistWorkspace = aa, window.LogicWeaverTodoistCalendarSidebar = ra, window.LogicWeaverTodoistTaskList = la, window.LogicWeaverBiliMessagePanel = Vt, window.LogicWeaverStickerBoard = La, window.LogicWeaverStickersService = $a, window.LogicWeaverBiliFavorites = ts, window.LogicWeaverBiliRadioTape = Js, window.LogicWeaverBiliOrganizerDialogs = _a, window.LogicWeaverBiliUpGroupManager = Ca, window.LogicWeaverBiliUpPreview = un, window.LogicWeaverAihotFeed = os, window.LogicWeaverGitHubTrending = hs, window.LogicWeaverCalendarWorkspace = ro, window.LogicWeaverCalendar = ro, window.LogicWeaverTodoistMainWorkspace = ca, window.LogicWeaverTodoistTaskDetail = Ja, window.openBiliTheater = (o) => Ao.openVideo(o), window.closeBiliTheater = () => Ao.close(), window.showWindowsToast = (o) => {
    if (!o) return null;
    const s = Ln(o.target) || mi(o.url) || (o.appType === "bili" ? zs([o.title, o.subtitle, o.message].filter((a) => typeof a == "string").join(" ")) : void 0);
    return ke.show({
      ...o,
      target: s,
      onClick: () => {
        if (typeof o?.onClick == "function") return o.onClick();
        if (s) return Wt.openTarget(s);
        if (o?.url) {
          window.open(o.url, "_blank");
          return;
        }
      }
    });
  }, window.showToast = (o, s = !1, a = 3200) => window.showWindowsToast({
    appName: "系统提醒",
    icon: s ? "assets/error.svg" : "assets/logo.png",
    title: s ? "操作提醒" : "系统提醒",
    subtitle: o,
    duration: a
  }), window.showBiliToast = (o, s = 3200, a = {}) => {
    const r = typeof s == "object" && s ? s : a, m = typeof s == "number" ? s : 3200, f = r.isError || /失败|错误|异常|未获取|未找到/i.test(o), d = r.title || (f ? "B站操作未完成" : "哔哩哔哩"), h = r.subtitle || (o.length > 36 ? "" : o), b = r.message || (r.subtitle || o.length > 36 ? o : ""), E = {
      id: r.id || `bili_toast_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      appType: "bili",
      appName: "哔哩哔哩",
      icon: "assets/bilibili.svg",
      title: d,
      subtitle: h || o,
      message: b && b !== h ? b : "",
      showActions: !!(r.showActions || r.actionLabel),
      actionLabel: r.actionLabel || "",
      onClick: r.onClick || null,
      target: Ln(r.target) || mi(r.url) || Ln({ type: "bili-video", bvid: r.bvid, aid: r.aid ? String(r.aid) : void 0 }),
      url: r.url,
      duration: Math.max(3e3, m)
    };
    return window.showWindowsToast(E);
  }, window.showFetchToast = (o, s, a = "", r = "assets/logo.png", m = 3200) => window.showWindowsToast({
    appName: o,
    title: s,
    subtitle: a,
    icon: r || "assets/logo.png",
    duration: m,
    showActions: !1,
    actionLabel: "",
    appType: "fetch"
  }), window.LogicWeaverKineticDrag = Ia, window.LogicWeaverMarkdownAst = Ma, window.setLauncherBackground = (o) => gn.setWallpaper(o), window.backgroundDbClear = (o) => Zs(o), window.openBackgroundHistory = () => Ci.openDialog(), Ii("biliMiniPlayer", sn.machine), Ii("neteaseAuth", Qe.authMachine), window.__TAB_MACHINES__ = Qa();
}
const Ve = Le({
  isOpen: !1,
  query: "",
  selectedIndex: 0
});
let tn = null;
const ys = {
  get state() {
    return Ve;
  },
  open() {
    Ve.isOpen || (Ve.isOpen = !0, Ve.query = "", Ve.selectedIndex = 0, tn = Oe.pushModalCloser(() => (this.close(), !0)));
  },
  close() {
    Ve.isOpen && (Ve.isOpen = !1, Ve.query = "", Ve.selectedIndex = 0, tn && (tn(), tn = null));
  },
  toggle() {
    Ve.isOpen ? this.close() : this.open();
  },
  setQuery(e) {
    Ve.query = e, Ve.selectedIndex = 0;
  },
  selectNext(e) {
    e <= 0 || (Ve.selectedIndex = (Ve.selectedIndex + 1) % e);
  },
  selectPrev(e) {
    e <= 0 || (Ve.selectedIndex = (Ve.selectedIndex - 1 + e) % e);
  },
  async executeCommand(e) {
    this.close();
    try {
      await kn.execute(e.id, void 0, "command-palette");
    } catch (t) {
      console.warn(`[CommandPalette] Failed to execute ${e.id}:`, t);
    }
  }
};
typeof window < "u" && window.addEventListener("keydown", (e) => {
  if (li.active || e.defaultPrevented || e.isComposing || e.repeat) return;
  const t = (e.key || "").toLowerCase(), o = (e.ctrlKey || e.metaKey) && t === "k", s = e.altKey && (e.code === "Space" || t === " ");
  (o || s) && (e.preventDefault(), e.stopPropagation(), ys.toggle());
}, !0);
function fr(e) {
  e.register({
    id: "palette.toggle",
    title: "打开全局命令中心 (Spotlight)",
    category: "界面",
    keywords: ["命令", "palette", "spotlight", "raycast", "搜索", "cmd"],
    concurrency: "drop",
    run: () => ys.toggle()
  }), e.register({
    id: "intro.skip",
    title: "跳过开屏动画",
    category: "界面",
    keywords: ["开屏", "启动", "skip"],
    concurrency: "drop",
    enabled: () => wt.enabled && !wt.finished,
    run: () => wt.skip("COMMAND SKIP")
  }), e.register({
    id: "notifications.clear",
    title: "关闭当前 Toast",
    category: "通知",
    keywords: ["toast", "关闭"],
    description: "只关闭浮动提示，不删除通知中心历史",
    concurrency: "drop",
    enabled: () => ke.size > 0,
    run: () => ke.clear()
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
    description: "在网页、B站、GitHub、网易云等搜索模式之间切换",
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
    enabled: () => ro.ready,
    run: () => ro.refresh()
  }), e.register({
    id: "calendar.today",
    title: "日历跳转到今天",
    category: "日历",
    keywords: ["今日", "today", "日期"],
    concurrency: "drop",
    enabled: () => ro.ready,
    run: () => ro.goToday()
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
const gr = ["hidden"], mr = {
  key: 0,
  class: "bookmark-folder-strip-empty"
}, vr = ["title", "data-bookmark-folder-id", "onClick", "onContextmenu"], yr = /* @__PURE__ */ fe({
  __name: "BookmarkFolderStrip",
  setup(e) {
    const t = z(null);
    function o(r) {
      const m = t.value;
      !m || m.scrollWidth <= m.clientWidth || !r.deltaY || (r.preventDefault(), m.scrollLeft += r.deltaY);
    }
    function s(r) {
      fn.openFolder(r.id);
    }
    function a(r, m) {
      fn.openContextMenu(m, r.clientX, r.clientY);
    }
    return (r, m) => (l(), p("nav", {
      id: "bookmark-folder-strip",
      ref_key: "stripRef",
      ref: t,
      class: "bookmark-folder-strip",
      "aria-label": "书签栏文件夹",
      hidden: !i(io).enabled,
      onWheel: o
    }, [
      i(io).folders.length ? P("", !0) : (l(), p("span", mr, u(i(io).emptyMessage || "书签栏没有文件夹"), 1)),
      (l(!0), p(Q, null, we(i(io).folders, (f) => (l(), p("button", {
        key: f.id,
        class: "bookmark-folder-chip",
        type: "button",
        title: `打开书签文件夹：${f.title || "未命名"}`,
        "data-bookmark-folder-id": f.id,
        onClick: (d) => s(f),
        onContextmenu: V((d) => a(d, f), ["prevent"])
      }, [
        m[0] || (m[0] = n("span", { "aria-hidden": "true" }, "📁", -1)),
        n("span", null, u(f.title || "未命名"), 1)
      ], 40, vr))), 128))
    ], 40, gr));
  }
}), wr = /* @__PURE__ */ Re(yr, [["__scopeId", "data-v-df99d10f"]]), br = ["aria-label"], kr = { class: "cube-manager-body" }, _r = ["disabled", "onClick", "title"], Cr = ["disabled", "onClick", "title"], xr = ["onClick"], Lr = ["onClick"], $r = ["onClick"], Sr = ["type", "placeholder"], Tr = { type: "submit" }, Ir = {
  key: 0,
  role: "alert"
}, Mr = /* @__PURE__ */ fe({
  __name: "CubeConfigDialog",
  setup(e) {
    const t = ze.state, o = te(() => ze.getActiveFaces()), s = te(() => t.registeredFaces.filter((M) => !t.activeFaceIds.includes(M.id))), a = z(""), r = z("memo"), m = te(() => [
      { value: "memo", label: c("cube.manager.typeMemo"), icon: "📝" },
      { value: "countdown", label: c("cube.manager.typeCountdown"), icon: "⏳" },
      { value: "link", label: c("cube.manager.typeLink"), icon: "🔗" }
    ]), f = z(""), d = z(!1), h = z(JSON.stringify({ title: "每日一句", icon: "📝", customType: "memo", customData: { text: "今天也要记得休息" } }, null, 2)), b = z("");
    function E(M) {
      b.value = "";
      try {
        M();
      } catch (v) {
        b.value = v instanceof Error ? v.message : "操作失败";
      }
    }
    function g() {
      E(() => {
        const M = d.value ? JSON.parse(h.value) : {
          title: a.value,
          customType: r.value,
          customData: { text: f.value, targetDate: f.value, url: f.value }
        };
        ze.addCustomFace(M), a.value = "", f.value = "";
      });
    }
    return (M, v) => (l(), pe(bt, { to: "body" }, [
      i(t).isConfigDialogOpen ? (l(), p("section", {
        key: 0,
        class: "cube-manager",
        role: "dialog",
        "aria-label": i(c)("cube.manager.title"),
        onKeydown: v[8] || (v[8] = Wo(V((w) => i(ze).closeConfigDialog(), ["stop"]), ["esc"]))
      }, [
        n("header", null, [
          n("strong", null, u(i(c)("cube.manager.title")), 1),
          n("button", {
            type: "button",
            "aria-label": "关闭",
            onClick: v[0] || (v[0] = (w) => i(ze).closeConfigDialog())
          }, "×")
        ]),
        n("div", kr, [
          n("p", null, u(i(c)("cube.manager.desc")), 1),
          (l(!0), p(Q, null, we(o.value, (w, T) => (l(), p("div", {
            key: w.id,
            class: "cube-row"
          }, [
            n("span", null, u(w.icon) + " " + u(w.title), 1),
            n("button", {
              type: "button",
              disabled: T === 0,
              onClick: (y) => E(() => i(ze).moveUp(w.id)),
              title: i(c)("cube.manager.moveUp")
            }, "↑", 8, _r),
            n("button", {
              type: "button",
              disabled: T === o.value.length - 1,
              onClick: (y) => E(() => i(ze).moveDown(w.id)),
              title: i(c)("cube.manager.moveDown")
            }, "↓", 8, Cr),
            n("button", {
              type: "button",
              onClick: (y) => E(() => i(ze).removeCustomFace(w.id))
            }, u(i(c)("cube.manager.removeFace")), 9, xr)
          ]))), 128)),
          (l(!0), p(Q, null, we(s.value, (w) => (l(), p("div", {
            key: w.id,
            class: "cube-row"
          }, [
            n("span", null, u(w.title) + u(i(c)("cube.manager.inactiveSuffix")), 1),
            n("button", {
              type: "button",
              onClick: (T) => E(() => i(ze).toggleActive(w.id, !0))
            }, u(i(c)("cube.manager.add")), 9, Lr),
            w.builtIn ? P("", !0) : (l(), p("button", {
              key: 0,
              type: "button",
              onClick: (T) => E(() => i(ze).removeCustomFace(w.id))
            }, u(i(c)("cube.manager.delete")), 9, $r))
          ]))), 128)),
          n("h3", null, u(i(c)("cube.manager.addFace")), 1),
          n("label", null, [
            st(n("input", {
              "onUpdate:modelValue": v[1] || (v[1] = (w) => d.value = w),
              type: "checkbox"
            }, null, 512), [
              [Ks, d.value]
            ]),
            tt(" " + u(i(c)("cube.manager.pasteJson")), 1)
          ]),
          n("form", {
            onSubmit: V(g, ["prevent"])
          }, [
            d.value ? (l(), p(Q, { key: 1 }, [
              n("p", null, u(i(c)("cube.manager.securityNotice")), 1),
              st(n("textarea", {
                "onUpdate:modelValue": v[6] || (v[6] = (w) => h.value = w),
                rows: "9",
                maxlength: "10000",
                "aria-label": "面的 JSON 配置",
                spellcheck: "false"
              }, null, 512), [
                [fo, h.value]
              ])
            ], 64)) : (l(), p(Q, { key: 0 }, [
              n("label", null, [
                tt(u(i(c)("cube.manager.fieldTitle")), 1),
                st(n("input", {
                  "onUpdate:modelValue": v[2] || (v[2] = (w) => a.value = w),
                  maxlength: "60",
                  required: ""
                }, null, 512), [
                  [fo, a.value]
                ])
              ]),
              n("label", null, [
                tt(u(i(c)("cube.manager.fieldType")) + " ", 1),
                Z(qi, {
                  modelValue: r.value,
                  "onUpdate:modelValue": v[3] || (v[3] = (w) => r.value = w),
                  options: m.value,
                  size: "sm",
                  onChange: v[4] || (v[4] = (w) => r.value = w)
                }, null, 8, ["modelValue", "options"])
              ]),
              n("label", null, [
                tt(u(i(c)("cube.manager.fieldContent")), 1),
                st(n("input", {
                  "onUpdate:modelValue": v[5] || (v[5] = (w) => f.value = w),
                  type: r.value === "countdown" ? "date" : "text",
                  placeholder: r.value === "link" ? "https://…" : i(c)("cube.manager.contentPlaceholderText"),
                  maxlength: "500",
                  required: ""
                }, null, 8, Sr), [
                  [js, f.value]
                ])
              ])
            ], 64)),
            n("button", Tr, u(i(c)("cube.manager.submitAdd")), 1)
          ], 32),
          b.value ? (l(), p("p", Ir, u(b.value), 1)) : P("", !0)
        ]),
        n("footer", null, [
          n("button", {
            type: "button",
            onClick: v[7] || (v[7] = (w) => E(() => i(ze).resetDefaults()))
          }, u(i(c)("cube.manager.resetDefault")), 1),
          n("small", null, u(i(c)("cube.manager.resetNotice")), 1)
        ])
      ], 40, br)) : P("", !0)
    ]));
  }
}), Dr = /* @__PURE__ */ Re(Mr, [["__scopeId", "data-v-4cfc2436"]]), Ar = ["data-face"], Er = ["aria-label"], Pr = { class: "ms-top-side" }, Wr = ["title"], Rr = ["title"], Nr = ["title"], Or = {
  key: 0,
  class: "ms-top-meta"
}, Br = {
  class: "ms-top-title",
  style: { color: "#10b981", "font-weight": "700" }
}, Fr = { class: "ms-top-artist" }, Hr = { class: "ms-top-meta" }, Kr = ["title"], jr = ["title"], Vr = {
  key: 0,
  class: "ms-top-divider"
}, zr = ["title"], Gr = { class: "ms-top-mini-progress" }, Ur = { class: "ms-top-side" }, Yr = ["title"], Xr = ["title"], qr = ["aria-label"], Jr = ["title"], Zr = { class: "ms-cube-custom-icon" }, Qr = { class: "ms-cube-custom-title" }, el = ["title"], tl = {
  key: 1,
  class: "ms-cube-custom-text countdown"
}, ol = ["href"], nl = {
  class: "ms-cube-dots",
  "aria-hidden": "true"
}, il = ["title", "onClick"], sl = { class: "ms-cube-cm-header" }, al = { class: "ms-cube-cm-list" }, rl = ["onClick"], ll = { class: "ms-cube-cm-icon" }, cl = { class: "ms-cube-cm-title" }, dl = {
  key: 0,
  class: "ms-cube-cm-check"
}, ul = /* @__PURE__ */ fe({
  __name: "TopInfoCube",
  props: {
    active: { type: Boolean, default: !0 }
  },
  setup(e) {
    const t = e, o = te(() => Ji.visible || gt.djModalOpen || gt.isActive && gt.isJoined), s = te(() => gt.isActive && gt.isJoined), a = te(() => ze.getActiveFaces()), r = z("music"), m = z(0);
    let f = !1, d;
    We(
      () => a.value,
      (j) => {
        j.some((I) => I.id === r.value) || (r.value = j[0]?.id || "");
      },
      { immediate: !0 }
    );
    const h = te(() => a.value.filter((j) => !j.builtIn)), b = z(!1), E = z({ x: 0, y: 0 });
    We(() => t.active, (j) => {
      j || (b.value = !1, ze.closeConfigDialog(), clearTimeout(d), f = !1);
    }, { immediate: !0 });
    const { menuRef: g, style: M } = di({
      visible: () => b.value,
      anchor: () => E.value,
      dismiss: () => {
        b.value = !1;
      }
    });
    function v(j) {
      j.preventDefault(), j.stopPropagation(), E.value = { x: j.clientX, y: j.clientY }, b.value = !0;
    }
    function w(j) {
      ee(j), b.value = !1;
    }
    function T() {
      b.value = !1, y(() => ze.resetDefaults()), ee("music");
    }
    function y(j) {
      b.value = !1;
      try {
        j();
      } catch (I) {
        ke.show({ appName: "滚动立方体", title: "保存失败", message: I instanceof Error ? I.message : "请检查浏览器存储" });
      }
    }
    function C(j) {
      if (!j) return c("cube.countdown.noTarget");
      const F = new Date(j).getTime() - _.value, ye = Math.ceil(F / (1e3 * 60 * 60 * 24));
      return ye > 0 ? c("cube.countdown.remaining", { days: ye }) : ye === 0 ? c("cube.countdown.today") : c("cube.countdown.passed", { days: Math.abs(ye) });
    }
    const L = te(() => !oe.title || oe.title === "点击播放" ? c("home.music.defaultTitle") : oe.title), B = te(() => !oe.artist || oe.artist === "作者" ? c("home.music.defaultArtist") : oe.artist), H = te(() => oe.isBiliRadio ? c("cube.source.biliRadio") : oe.isNetease ? c("cube.source.netease") : oe.playing ? c("cube.source.siren") : c("cube.source.idle")), G = te(() => oe.currentLyric ? oe.currentLyric : oe.playing ? c("cube.defaultPlayingLyric") : c("cube.defaultIdleLyric"));
    function A() {
      Oe.handleToolClick("music");
    }
    const _ = z(Date.now());
    let $;
    We(() => t.active && a.value.some((j) => j.id === r.value && j.customType === "countdown"), (j) => {
      j && (_.value = Date.now()), clearInterval($), $ = j ? window.setInterval(() => {
        document.hidden || (_.value = Date.now());
      }, 6e4) : void 0;
    }, { immediate: !0 });
    function ee(j, I = null) {
      const F = a.value, ye = F.find((Ie) => Ie.id === j) || F[0];
      if (ye) {
        if (Number.isFinite(I))
          m.value = I;
        else if (ye.id !== r.value) {
          const Ie = F.findIndex((be) => be.id === r.value);
          let Ce = (F.findIndex((be) => be.id === ye.id) - Ie + F.length) % F.length;
          Ce > F.length / 2 && (Ce -= F.length), m.value += Ce * 90;
        }
        r.value = ye.id;
      }
    }
    function R(j) {
      const I = a.value;
      if (I.length <= 1) return;
      const F = I.findIndex((Ce) => Ce.id === r.value), Ie = ((F >= 0 ? F : 0) + j + I.length) % I.length, Me = I[Ie];
      Me && ee(Me.id, m.value + j * 90);
    }
    function Y(j) {
      a.value.length <= 1 || j.altKey || Math.abs(j.deltaY) < 2 || (j.preventDefault(), !f && (f = !0, R(j.deltaY > 0 ? 1 : -1), d = setTimeout(() => {
        f = !1;
      }, 420)));
    }
    function N(j) {
      !["ArrowUp", "ArrowDown", "PageUp", "PageDown"].includes(j.key) || j.target?.closest?.("input") || (j.preventDefault(), R(["ArrowDown", "PageDown"].includes(j.key) ? 1 : -1));
    }
    function U(j, I) {
      return r.value === j ? {
        transform: `rotateX(${-m.value}deg) translateZ(22px)`,
        visibility: "visible"
      } : {
        transform: `rotateX(-${I}deg) translateZ(22px)`,
        visibility: "hidden"
      };
    }
    function ve(j) {
      const I = j.target;
      I && (I.tagName === "INPUT" || I.tagName === "TEXTAREA" || I.isContentEditable) || (j.preventDefault(), j.stopPropagation());
    }
    function $e(j) {
      const I = j.target;
      I && (I.tagName === "INPUT" || I.tagName === "TEXTAREA" || I.isContentEditable) || j.preventDefault();
    }
    return Nt(() => {
      clearInterval($), clearTimeout(d);
    }), (j, I) => st((l(), p("div", {
      class: "ms-top-player",
      "data-face": r.value,
      tabindex: "0",
      title: "滚动立方体 · 滚轮切换面板，右键可自由增删与排序",
      "aria-label": "滚动立方体",
      onWheel: Y,
      onKeydown: N,
      onContextmenu: v,
      onCopy: ve,
      onSelectstart: $e
    }, [
      a.value.length ? P("", !0) : (l(), p("button", {
        key: 0,
        type: "button",
        class: "ms-cube-cm-action",
        onClick: T
      }, "↺ 恢复默认音乐播放条")),
      n("div", {
        class: "ms-top-cube",
        style: Se({ transform: `translateZ(-22px) rotateX(${m.value}deg)` })
      }, [
        i(ze).isActive("music") && r.value === "music" ? (l(), p("section", {
          key: 0,
          class: "ms-top-face ms-top-face-music",
          "aria-label": i(c)("cube.musicFaceAria"),
          style: Se(U("music", 0))
        }, [
          n("div", Pr, [
            n("button", {
              class: "ms-top-prev",
              title: i(c)("cube.prevTrack"),
              type: "button",
              onClick: I[0] || (I[0] = V((F) => i(Qe).prev(), ["stop"]))
            }, "⏮", 8, Wr),
            n("button", {
              class: "ms-top-play",
              title: i(c)("cube.playPause"),
              type: "button",
              onClick: I[1] || (I[1] = V((F) => i(Qe).togglePlay(), ["stop"]))
            }, u(i(oe).playing ? "⏸" : "▶"), 9, Rr)
          ]),
          n("button", {
            class: "ms-top-main",
            title: i(c)("cube.openMusicPicker"),
            type: "button",
            onClick: V(A, ["stop"])
          }, [
            o.value ? (l(), p("div", Or, [
              n("span", Br, " 🎧 " + u(s.value ? i(c)("cube.listeningTogether") : i(c)("cube.listening")) + "：" + u(L.value), 1),
              n("span", Fr, u(B.value), 1)
            ])) : (l(), p(Q, { key: 1 }, [
              n("div", Hr, [
                n("span", {
                  class: "ms-top-title",
                  title: L.value
                }, u(L.value), 9, Kr),
                n("span", {
                  class: "ms-top-artist",
                  title: B.value
                }, u(B.value), 9, jr),
                n("span", {
                  class: ce(["ms-top-source", { idle: !i(oe).playing }])
                }, u(H.value), 3),
                G.value ? (l(), p("span", Vr)) : P("", !0)
              ]),
              G.value ? (l(), p("span", {
                key: 0,
                class: "ms-top-lyric",
                title: G.value
              }, u(G.value), 9, zr)) : P("", !0)
            ], 64)),
            n("div", Gr, [
              n("div", {
                class: "ms-top-mini-fill",
                style: Se({ width: i(oe).progressPercent + "%" })
              }, null, 4)
            ])
          ], 8, Nr),
          n("div", Ur, [
            n("button", {
              class: "ms-top-next",
              title: i(c)("cube.nextTrack"),
              type: "button",
              onClick: I[2] || (I[2] = V((F) => i(Qe).next(), ["stop"]))
            }, "⏭", 8, Yr),
            n("button", {
              class: "ms-top-open",
              title: i(c)("cube.openPlaylist"),
              type: "button",
              onClick: V(A, ["stop"])
            }, "🎵", 8, Xr)
          ])
        ], 12, Er)) : P("", !0),
        (l(!0), p(Q, null, we(h.value, (F, ye) => (l(), p("section", {
          key: F.id,
          class: "ms-top-face ms-top-face-custom",
          "aria-label": F.title,
          style: Se(U(F.id, (ye + 1) * 90))
        }, [
          r.value === F.id ? (l(), p("div", {
            key: 0,
            class: "ms-cube-custom-body",
            title: F.desc
          }, [
            n("span", Zr, u(F.icon), 1),
            n("strong", Qr, u(F.title), 1),
            I[10] || (I[10] = n("span", { class: "ms-cube-divider" }, null, -1)),
            F.customType === "memo" ? (l(), p("span", {
              key: 0,
              class: "ms-cube-custom-text",
              title: F.customData?.text
            }, u(F.customData?.text || i(c)("cube.memo.clickToConfig")), 9, el)) : F.customType === "countdown" ? (l(), p("span", tl, u(C(F.customData?.targetDate)), 1)) : F.customType === "link" ? (l(), p("a", {
              key: 2,
              href: F.customData?.url,
              target: "_blank",
              rel: "noreferrer",
              class: "ms-cube-custom-link",
              onClick: I[3] || (I[3] = V(() => {
              }, ["stop"]))
            }, u(F.customData?.url) + " ↗ ", 9, ol)) : P("", !0)
          ], 8, Jr)) : P("", !0),
          n("button", {
            type: "button",
            class: "ms-cube-config-trigger",
            title: "管理立方体面",
            onClick: I[4] || (I[4] = V((Ie) => i(ze).openConfigDialog(), ["stop"]))
          }, " ⚙ ")
        ], 12, qr))), 128))
      ], 4),
      n("div", nl, [
        (l(!0), p(Q, null, we(a.value, (F) => (l(), p("i", {
          key: F.id,
          class: ce({ on: r.value === F.id }),
          title: F.title,
          onClick: V((ye) => ee(F.id), ["stop"])
        }, null, 10, il))), 128))
      ]),
      (l(), pe(bt, { to: "body" }, [
        t.active && b.value ? (l(), p("div", {
          key: 0,
          ref_key: "menuRef",
          ref: g,
          class: "ms-cube-context-menu",
          style: Se(i(M)),
          onClick: I[9] || (I[9] = V(() => {
          }, ["stop"]))
        }, [
          n("div", sl, [
            I[11] || (I[11] = n("span", null, "🎲 滚动立方体面", -1)),
            n("button", {
              type: "button",
              class: "ms-cube-cm-close",
              onClick: I[5] || (I[5] = (F) => b.value = !1)
            }, "×")
          ]),
          n("div", al, [
            (l(!0), p(Q, null, we(a.value, (F) => (l(), p("button", {
              key: F.id,
              type: "button",
              class: ce(["ms-cube-cm-item", { active: r.value === F.id }]),
              onClick: (ye) => w(F.id)
            }, [
              n("span", ll, u(F.icon), 1),
              n("span", cl, u(F.title), 1),
              r.value === F.id ? (l(), p("span", dl, "✓")) : P("", !0)
            ], 10, rl))), 128))
          ]),
          a.value.length > 1 ? (l(), p(Q, { key: 0 }, [
            I[15] || (I[15] = n("div", { class: "ms-cube-cm-divider" }, null, -1)),
            n("button", {
              type: "button",
              class: "ms-cube-cm-action",
              onClick: I[6] || (I[6] = (F) => {
                R(-1), b.value = !1;
              })
            }, [...I[12] || (I[12] = [
              n("span", null, "⏮ 上一个面板", -1)
            ])]),
            n("button", {
              type: "button",
              class: "ms-cube-cm-action",
              onClick: I[7] || (I[7] = (F) => {
                R(1), b.value = !1;
              })
            }, [...I[13] || (I[13] = [
              n("span", null, "⏭ 下一个面板", -1)
            ])]),
            r.value && r.value !== "music" ? (l(), p("button", {
              key: 0,
              type: "button",
              class: "ms-cube-cm-action danger",
              onClick: I[8] || (I[8] = (F) => y(() => i(ze).removeCustomFace(r.value)))
            }, " 删除当前面 ")) : P("", !0),
            n("button", {
              type: "button",
              class: "ms-cube-cm-action danger",
              onClick: T
            }, [...I[14] || (I[14] = [
              n("span", null, "↺ 恢复默认（仅音乐）", -1)
            ])])
          ], 64)) : P("", !0)
        ], 4)) : P("", !0)
      ])),
      t.active ? (l(), pe(Dr, { key: 1 })) : P("", !0)
    ], 40, Ar)), [
      [Ro, t.active]
    ]);
  }
}), pl = /* @__PURE__ */ Re(ul, [["__scopeId", "data-v-995b252f"]]), To = Le({
  isOpen: !1
}), ws = {
  open() {
    To.isOpen = !0;
  },
  close() {
    To.isOpen = !1;
  },
  toggle() {
    To.isOpen = !To.isOpen;
  }
}, ti = Rt(To);
function hl() {
  if (typeof chrome > "u" || !chrome.runtime?.onMessage) return () => {
  };
  let e = !1, t;
  const o = (s, a, r) => {
    a.id !== chrome.runtime.id || s?.type !== "TOGGLE_SIDE_DRAWER" || t === void 0 || s.targetTabId !== t || (ws.toggle(), r({ ok: !0 }));
  };
  return chrome.tabs.getCurrent().then((s) => {
    e || (t = s?.id, chrome.runtime.onMessage.addListener(o));
  }).catch(() => console.warn("[SideDrawer] Could not bind the home-page command.")), () => {
    e = !0, chrome.runtime.onMessage.removeListener(o);
  };
}
const fl = { class: "tb-brand" }, gl = ["title", "aria-expanded", "aria-label"], ml = ["src", "alt"], vl = ["hidden"], yl = ["title", "hidden"], wl = { id: "vue-bookmark-folder-strip-root" }, bl = { class: "tb-actions" }, kl = {
  id: "workspace-launchers",
  hidden: ""
}, _l = ["title", "aria-expanded"], Cl = ["title"], xl = /* @__PURE__ */ fe({
  __name: "AppTopBar",
  setup(e) {
    const t = X(() => import("./WorkspaceLaunchers-DiALgCmX.js"));
    function o(h) {
      h.preventDefault(), h.stopPropagation();
      const b = typeof window < "u" ? window : null;
      b?.LogicWeaverWindowManager?.open ? b.LogicWeaverWindowManager.open("settings") : b?.LogicWeaverWindowTabs?.open ? b.LogicWeaverWindowTabs.open("settings") : Fo.open();
    }
    function s(h) {
      h.preventDefault();
      const b = typeof window < "u" ? window : null;
      typeof b?.toggleBookmarkPanel == "function" ? b.toggleBookmarkPanel() : b?.LogicWeaverBookmarkPanel?.toggle ? b.LogicWeaverBookmarkPanel.toggle() : si.toggleBookmarkPanel();
    }
    function a(h) {
      h.preventDefault(), Wt.toggle();
    }
    function r(h) {
      h.preventDefault(), Bo.open(h.clientX, h.clientY);
    }
    function m(h) {
      const b = h.target;
      b && (b.tagName === "INPUT" || b.tagName === "TEXTAREA" || b.isContentEditable) || (h.preventDefault(), h.stopPropagation());
    }
    function f(h) {
      const b = h.target;
      b && (b.tagName === "INPUT" || b.tagName === "TEXTAREA" || b.isContentEditable) || h.preventDefault();
    }
    function d(h, b) {
      if (!(b !== "local" || !h[vi] || document.visibilityState !== "visible"))
        try {
          const E = h[vi];
          for (const g of Qs(E.oldValue, E.newValue))
            ke.show({ id: g.id, appType: g.appType, appName: g.appName, icon: "assets/nav-multica.png", title: g.title, subtitle: g.subtitle, message: g.message, target: g.target, history: !1, historyId: g.id, actionLabel: "查看任务" });
        } catch {
        }
    }
    return qe(() => {
      Wt.start(), typeof chrome < "u" && chrome.storage?.onChanged?.addListener(d);
      const h = Da(localStorage.getItem("theme"));
      document.documentElement.dataset.theme = h, document.documentElement.setAttribute("data-theme", h);
    }), Yt(() => {
      typeof chrome < "u" && chrome.storage?.onChanged?.removeListener(d);
    }), (h, b) => (l(), p("header", {
      class: ce(["topbar", { "bookmark-folders-mode": i(io).enabled }]),
      onCopy: m,
      onSelectstart: f
    }, [
      n("div", fl, [
        n("button", {
          id: "bili-profile-button",
          class: "bili-profile-button",
          type: "button",
          title: i(c)("topbar.notifications"),
          "aria-controls": "notification-center",
          "aria-expanded": i(Xi).isOpen,
          "aria-label": i(bo) ? i(c)("topbar.notificationsUnread", { count: i(bo) }) : i(c)("topbar.notifications"),
          onClick: a,
          onContextmenu: b[0] || (b[0] = V((E) => r(E), ["prevent"]))
        }, [
          n("img", {
            id: "bili-profile-avatar",
            src: i(so).avatarUrl || "assets/bilibili.svg",
            alt: i(so).userName || i(c)("topbar.notifications")
          }, null, 8, ml),
          n("span", {
            id: "bili-profile-badge",
            class: "bili-profile-badge",
            hidden: i(bo) <= 0
          }, u(i(bo) > 99 ? "99+" : i(bo)), 9, vl)
        ], 40, gl),
        n("button", {
          id: "bookmark-handle",
          class: "bookmark-handle",
          type: "button",
          "aria-expanded": "false",
          title: i(c)("topbar.bookmarks"),
          hidden: i(io).enabled,
          onClick: s
        }, [
          b[2] || (b[2] = n("span", { id: "bookmark-handle-icon" }, "📁", -1)),
          n("span", null, u(i(c)("topbar.bookmarks")), 1)
        ], 8, yl),
        n("div", wl, [
          Z(wr)
        ])
      ]),
      Z(pl, {
        active: !i(yt).activeId
      }, null, 8, ["active"]),
      n("div", bl, [
        b[3] || (b[3] = n("button", {
          id: "daily-toggle",
          class: "tb-pill",
          type: "button",
          hidden: "",
          title: "查看日报"
        }, "📰 日报", -1)),
        n("span", kl, [
          Z(i(t))
        ]),
        n("button", {
          id: "side-drawer-toggle",
          class: ce(["tb-btn", { active: i(ti).isOpen }]),
          type: "button",
          title: i(c)("topbar.sidebar"),
          "aria-controls": "in-page-side-drawer",
          "aria-expanded": i(ti).isOpen,
          onClick: b[1] || (b[1] = (E) => i(ws).toggle())
        }, " 📑 ", 10, _l),
        n("button", {
          id: "settings-open",
          class: "tb-btn",
          title: i(c)("topbar.settings"),
          onClick: o
        }, "⚙", 8, Cl)
      ])
    ], 34));
  }
}), Ll = {
  key: 0,
  class: "notice"
}, $l = {
  key: 1,
  class: "muted small"
}, Sl = {
  key: 2,
  class: "notice"
}, Tl = {
  key: 3,
  class: "notice"
}, Il = { class: "wx-cur" }, Ml = { class: "wx-emoji" }, Dl = { class: "wx-temp" }, Al = { class: "wx-sub" }, El = { class: "wx-rain" }, Pl = { class: "wx-hours" }, Wl = { class: "hh" }, Rl = { class: "he" }, Nl = { class: "ht" }, Ol = { class: "wx-days" }, Bl = ["open"], Fl = { class: "weather-forecast-head" }, Hl = { class: "weather-forecast-city-info" }, Kl = { class: "weather-forecast-icon" }, jl = { id: "weather-forecast-city-title" }, Vl = { class: "small muted" }, zl = { class: "weather-forecast-actions" }, Gl = ["title"], Ul = ["title"], Yl = {
  key: 0,
  class: "weather-metrics-grid"
}, Xl = { class: "weather-metric-item" }, ql = { class: "metric-label" }, Jl = {
  class: "metric-val",
  id: "weather-forecast-humidity"
}, Zl = { class: "weather-metric-item" }, Ql = { class: "metric-label" }, ec = {
  class: "metric-val",
  id: "weather-forecast-wind"
}, tc = { class: "weather-metric-item" }, oc = { class: "metric-label" }, nc = {
  class: "metric-val",
  id: "weather-forecast-uv"
}, ic = { class: "weather-metric-item" }, sc = { class: "metric-label" }, ac = {
  class: "metric-val",
  id: "weather-forecast-aqi"
}, rc = {
  class: "weather-forecast-list",
  id: "weather-forecast-days-list"
}, lc = { class: "day-date-col" }, cc = { class: "day-name" }, dc = { class: "day-date small muted" }, uc = { class: "day-weather-col" }, pc = { class: "day-emoji" }, hc = { class: "day-cond" }, fc = { class: "day-rain-col" }, gc = {
  key: 0,
  class: "rain-tag"
}, mc = {
  key: 1,
  class: "rain-tag empty"
}, vc = { class: "day-temp-bar-col" }, yc = { class: "low-temp" }, wc = { class: "temp-track" }, bc = { class: "high-temp" }, kc = { class: "weather-location-head" }, _c = { class: "weather-location-title-row" }, Cc = { class: "weather-location-title" }, xc = ["title"], Lc = { class: "weather-input-wrapper" }, $c = ["placeholder", "onKeydown"], Sc = ["title"], Tc = {
  type: "submit",
  class: "weather-location-submit"
}, Ic = { key: 0 }, Mc = { class: "weather-section-subtitle" }, Dc = {
  key: 0,
  class: "weather-location-suggestions"
}, Ac = ["onClick"], Ec = { class: "weather-suggestion-name" }, Pc = { class: "weather-suggestion-sub" }, Wc = {
  key: 1,
  class: "weather-suggestion-empty"
}, Rc = { key: 1 }, Nc = { class: "weather-section-subtitle" }, Oc = { class: "weather-quick-chips-grid" }, Bc = ["onClick"], Fc = /* @__PURE__ */ fe({
  __name: "WeatherWidget",
  setup(e) {
    const t = z(!1), o = z({ x: 0, y: 0 }), s = z(""), a = z(null), r = z(null), m = ["深圳", "武汉", "北京", "上海", "广州", "成都", "杭州", "南京", "西安", "重庆", "苏州", "天津"], f = te(() => {
      const y = s.value.trim();
      return y ? no.filterCities(y, 6) : [];
    });
    function d(y) {
      const H = y?.clientX ?? window.innerWidth / 2 - 140, G = y?.clientY ?? window.innerHeight / 2 - 320 / 2, A = Math.max(12, Math.min(window.innerWidth - 280 - 12, H)), _ = Math.max(12, Math.min(window.innerHeight - 320 - 12, G));
      o.value = { x: A, y: _ }, t.value = !0, s.value = "", Tt(() => {
        r.value?.focus();
      });
    }
    function h() {
      t.value = !1, s.value = "";
    }
    async function b(y) {
      const C = y.trim();
      C && (h(), await no.changeCity(C));
    }
    function E() {
      const y = s.value.trim();
      y && b(y);
    }
    function g(y) {
      if (!t.value) return;
      const C = y.target;
      a.value && !a.value.contains(C) && h();
    }
    function M(y) {
      t.value && y.key === "Escape" && (y.preventDefault(), h());
    }
    qe(() => {
      ut.setRefreshAction(() => {
        no.loadWeather();
      }), ut.setChangeLocationAction((y) => {
        d(y);
      }), no.loadWeather(), We(mt, () => {
        no.reformatCurrentWeather();
      }), window.addEventListener("pointerdown", g, !0), window.addEventListener("keydown", M, !0);
    }), Nt(() => {
      window.removeEventListener("pointerdown", g, !0), window.removeEventListener("keydown", M, !0);
    });
    function v(y) {
      y.preventDefault(), d(y);
    }
    function w() {
      ut.closeForecastModal();
    }
    function T(y) {
      y.target?.id === "weather-forecast-dialog" && w();
    }
    return (y, C) => (l(), p("div", {
      class: "weather-widget-container",
      onContextmenu: v
    }, [
      i(q).state === "unconfigured" ? (l(), p("p", Ll, u(i(c)("weather.noCitySet")), 1)) : i(q).state === "loading" ? (l(), p("p", $l, u(i(c)("common.loading")), 1)) : i(q).state === "not_found" ? (l(), p("p", Sl, u(i(c)("weather.cityNotFound", { city: i(q).city })), 1)) : i(q).state === "error" ? (l(), p("p", Tl, u(i(q).errorMessage || i(c)("weather.loadFailed")), 1)) : i(q).state === "ready" && i(q).data ? (l(), p(Q, { key: 4 }, [
        n("div", Il, [
          n("span", Ml, u(i(q).data.currentEmoji), 1),
          n("span", Dl, u(i(q).data.currentTemp) + "°", 1)
        ]),
        n("p", Al, u(i(q).data.subText), 1),
        n("p", El, u(i(q).data.rainText), 1),
        n("div", Pl, [
          (l(!0), p(Q, null, we(i(q).data.hours, (L, B) => (l(), p("div", {
            key: B,
            class: "wx-h"
          }, [
            n("span", Wl, u(L.time), 1),
            n("span", Rl, u(L.emoji), 1),
            n("span", Nl, u(L.temp) + "°", 1)
          ]))), 128))
        ]),
        n("div", Ol, [
          (l(!0), p(Q, null, we(i(q).data.days, (L, B) => (l(), p("span", { key: B }, u(L.label) + " " + u(L.emoji) + " " + u(L.tempRange), 1))), 128))
        ])
      ], 64)) : P("", !0),
      n("dialog", {
        id: "weather-forecast-dialog",
        class: "weather-forecast-dialog",
        open: i(q).forecastModalOpen,
        onClick: T
      }, [
        n("div", {
          class: "weather-forecast-shell",
          onClick: C[1] || (C[1] = V(() => {
          }, ["stop"]))
        }, [
          n("header", Fl, [
            n("div", Hl, [
              n("span", Kl, u(i(q).data?.currentEmoji || "🌤️"), 1),
              n("div", null, [
                n("h3", jl, u(i(q).city || i(q).data?.cityName || i(c)("weather.forecastTitle")), 1),
                n("p", Vl, u(i(q).data?.subText || i(c)("weather.forecastSub")), 1)
              ])
            ]),
            n("div", zl, [
              n("button", {
                id: "weather-forecast-refresh-btn",
                type: "button",
                class: "weather-forecast-btn",
                title: i(c)("weather.refreshTitle"),
                onClick: C[0] || (C[0] = (L) => i(ut).refresh())
              }, u(i(c)("weather.refresh")), 9, Gl),
              n("button", {
                id: "weather-forecast-close-btn",
                type: "button",
                class: "weather-forecast-close",
                title: i(c)("common.close"),
                onClick: w
              }, " ✕ ", 8, Ul)
            ])
          ]),
          i(q).detailInfo ? (l(), p("div", Yl, [
            n("div", Xl, [
              n("span", ql, u(i(c)("weather.metric.humidity")), 1),
              n("span", Jl, u(i(q).detailInfo.humidity || "50%"), 1)
            ]),
            n("div", Zl, [
              n("span", Ql, u(i(c)("weather.metric.wind")), 1),
              n("span", ec, u(i(q).detailInfo.wind || (i(mt) === "en" ? "Breeze" : "微风")), 1)
            ]),
            n("div", tc, [
              n("span", oc, u(i(c)("weather.metric.uv")), 1),
              n("span", nc, u(i(q).detailInfo.uvIndex || (i(mt) === "en" ? "Moderate" : "中等")), 1)
            ]),
            n("div", ic, [
              n("span", sc, u(i(c)("weather.metric.aqi")), 1),
              n("span", ac, u(i(q).detailInfo.airQuality || (i(mt) === "en" ? "Good" : "良")), 1)
            ])
          ])) : P("", !0),
          n("div", rc, [
            (l(!0), p(Q, null, we(i(q).forecastDays, (L, B) => (l(), p("div", {
              key: B,
              class: "weather-forecast-day-row forecast-day-item"
            }, [
              n("div", lc, [
                n("span", cc, u(L.dayName), 1),
                n("span", dc, u(L.date), 1)
              ]),
              n("div", uc, [
                n("span", pc, u(L.emoji), 1),
                n("span", hc, u(L.condition), 1)
              ]),
              n("div", fc, [
                L.rainProb > 0 ? (l(), p("span", gc, "☂️ " + u(L.rainProb) + "%", 1)) : (l(), p("span", mc, u(i(c)("weather.metric.noRain")), 1))
              ]),
              n("div", vc, [
                n("span", yc, u(L.lowTemp) + "°", 1),
                n("div", wc, [
                  n("div", {
                    class: "temp-range-fill",
                    style: Se({
                      left: `${Math.max(0, Math.min(100, (L.lowTemp + 10) * 2))}%`,
                      width: `${Math.max(20, Math.min(80, (L.highTemp - L.lowTemp) * 6))}%`
                    })
                  }, null, 4)
                ]),
                n("span", bc, u(L.highTemp) + "°", 1)
              ])
            ]))), 128))
          ])
        ])
      ], 8, Bl),
      (l(), pe(bt, { to: "body" }, [
        t.value ? (l(), p("div", {
          key: 0,
          ref_key: "contextMenuRef",
          ref: a,
          class: "weather-location-context-menu",
          style: Se({ left: `${o.value.x}px`, top: `${o.value.y}px` }),
          onClick: C[4] || (C[4] = V(() => {
          }, ["stop"])),
          onContextmenu: C[5] || (C[5] = V(() => {
          }, ["prevent"]))
        }, [
          n("div", kc, [
            n("div", _c, [
              n("span", Cc, u(i(c)("weather.menu.changeLocation")), 1),
              n("span", {
                class: "weather-location-curr-badge",
                title: i(q).city
              }, [
                C[6] || (C[6] = n("span", { class: "weather-curr-dot" }, null, -1)),
                tt(" " + u(i(q).city || i(c)("weather.menu.unset")), 1)
              ], 8, xc)
            ])
          ]),
          n("form", {
            class: "weather-location-form",
            onSubmit: V(E, ["prevent"])
          }, [
            n("div", Lc, [
              C[7] || (C[7] = n("span", { class: "weather-input-icon" }, "🔍", -1)),
              st(n("input", {
                ref_key: "inputRef",
                ref: r,
                class: "weather-location-input",
                placeholder: i(c)("weather.menu.inputPlaceholder"),
                "onUpdate:modelValue": C[2] || (C[2] = (L) => s.value = L),
                onKeydown: Wo(V(E, ["prevent"]), ["enter"]),
                autocomplete: "off"
              }, null, 40, $c), [
                [fo, s.value]
              ]),
              s.value ? (l(), p("button", {
                key: 0,
                type: "button",
                class: "weather-input-clear",
                onClick: C[3] || (C[3] = (L) => s.value = ""),
                title: i(c)("weather.menu.clearInput")
              }, "✕", 8, Sc)) : P("", !0)
            ]),
            n("button", Tc, u(i(c)("weather.menu.submit")), 1)
          ], 32),
          s.value.trim() ? (l(), p("div", Ic, [
            n("div", Mc, u(i(c)("weather.menu.suggestions")), 1),
            f.value.length ? (l(), p("div", Dc, [
              (l(!0), p(Q, null, we(f.value, (L) => (l(), p("button", {
                key: L.name + L.admin,
                type: "button",
                class: "weather-suggestion-item",
                onClick: (B) => b(L.name)
              }, [
                n("span", Ec, u(L.name), 1),
                n("span", Pc, u(L.admin), 1)
              ], 8, Ac))), 128))
            ])) : (l(), p("div", Wc, u(i(c)("weather.menu.emptySuggestion")), 1))
          ])) : (l(), p("div", Rc, [
            n("div", Nc, u(i(c)("weather.menu.commonCities")), 1),
            n("div", Oc, [
              (l(), p(Q, null, we(m, (L) => n("button", {
                key: L,
                type: "button",
                class: ce(["weather-quick-chip", { active: i(q).city === L }]),
                onClick: (B) => b(L)
              }, u(L), 11, Bc)), 64))
            ])
          ]))
        ], 36)) : P("", !0)
      ]))
    ], 32));
  }
}), bs = /* @__PURE__ */ Re(Fc, [["__scopeId", "data-v-bf1a1ba5"]]), oi = "heroCustomMottoV1";
function Hc() {
  try {
    if (typeof localStorage < "u") {
      const e = localStorage.getItem(oi);
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
const to = Hc(), J = Le({
  loaded: !1,
  customText: to.customText,
  history: to.history,
  currentIndex: to.customText && to.history.length ? to.history.findIndex((e) => e.text === to.customText) : -1,
  menuOpen: !1,
  menuPos: { x: 0, y: 0 }
});
function Kc(e) {
  return new Promise((t) => {
    typeof chrome < "u" && chrome?.storage?.local?.get ? chrome.storage.local.get([e], (o) => t(o?.[e])) : t(null);
  });
}
function jc(e, t) {
  try {
    typeof localStorage < "u" && localStorage.setItem(e, JSON.stringify(t));
  } catch {
  }
  return new Promise((o) => {
    typeof chrome < "u" && chrome?.storage?.local?.set ? chrome.storage.local.set({ [e]: t }, () => o()) : o();
  });
}
function Vc(e) {
  const t = (a) => String(a).padStart(2, "0"), o = `${e.getFullYear()}-${t(e.getMonth() + 1)}-${t(e.getDate())}`, s = `${t(e.getHours())}:${t(e.getMinutes())}`;
  return { date: o, time: s };
}
const ct = {
  async init() {
    try {
      const e = await Kc(oi);
      if (e && typeof e == "object") {
        const t = Array.isArray(e.history) ? e.history : [];
        t.length >= J.history.length && (J.history = t, e.customText !== void 0 && (J.customText = e.customText));
      }
    } catch (e) {
      console.warn("[HeroMotto] Sync chrome.storage failed:", e);
    } finally {
      J.loaded = !0, J.customText && J.history.length && (J.currentIndex = J.history.findIndex(
        (e) => e.text === J.customText
      ));
    }
  },
  async persist() {
    const e = {
      customText: J.customText,
      history: J.history
    };
    await jc(oi, e);
  },
  setCustomMotto(e) {
    const t = e.trim();
    if (!t) {
      this.resetToSystem();
      return;
    }
    const { date: o, time: s } = Vc(/* @__PURE__ */ new Date());
    J.customText = t;
    const a = J.history.findIndex((r) => r.text === t);
    if (a !== -1) {
      const r = J.history.splice(a, 1)[0];
      r.date = o, r.time = s, J.history.unshift(r);
    } else
      J.history.unshift({
        id: `motto_${Date.now()}`,
        date: o,
        time: s,
        text: t,
        createdAt: Date.now()
      });
    J.history.length > 50 && (J.history = J.history.slice(0, 50)), J.currentIndex = 0, this.persist();
  },
  selectHistory(e) {
    J.customText = e.text, J.currentIndex = J.history.findIndex((t) => t.id === e.id), this.closeMenu(), this.persist();
  },
  resetToSystem() {
    J.customText = null, J.currentIndex = -1, this.closeMenu(), this.persist();
  },
  deleteEntry(e) {
    const t = J.history.findIndex((o) => o.id === e);
    t !== -1 && (J.history.splice(t, 1), J.currentIndex === t && (J.history.length > 0 ? this.selectHistory(J.history[0]) : this.resetToSystem()), this.persist());
  },
  clearHistory() {
    J.history = [], this.resetToSystem();
  },
  stepHistory(e) {
    if (!J.history.length) return;
    let t = J.currentIndex + e;
    if (t < 0) {
      this.resetToSystem();
      return;
    }
    t >= J.history.length && (t = 0), this.selectHistory(J.history[t]);
  },
  openMenu(e, t) {
    J.menuPos = { x: e, y: t }, J.menuOpen = !0;
  },
  closeMenu() {
    J.menuOpen = !1;
  }
}, zc = ["title"], Gc = ["placeholder"], Uc = { class: "motto-content" }, Yc = ["title"], Xc = { class: "motto-menu-header" }, qc = { class: "dim" }, Jc = { class: "motto-history-label" }, Zc = { class: "motto-history-list" }, Qc = {
  key: 0,
  class: "motto-history-empty dim"
}, ed = ["onClick"], td = { class: "motto-item-date" }, od = ["title"], nd = ["title", "onClick"], id = /* @__PURE__ */ fe({
  __name: "HeroMotto",
  setup(e) {
    const t = z(!1), o = z(""), s = z(null), a = {
      夜深了: "clock.greeting.lateNight",
      早上好: "clock.greeting.morning",
      上午好: "clock.greeting.forenoon",
      中午好: "clock.greeting.noon",
      下午好: "clock.greeting.afternoon",
      晚上好: "clock.greeting.evening",
      你好: "clock.greeting.hello"
    };
    function r(v) {
      const w = a[v];
      return w ? c(w) : v;
    }
    const m = te(() => J.customText ? r(J.customText) : _e.greetingText);
    function f() {
      ct.closeMenu(), o.value = J.customText || _e.greetingText, t.value = !0, Tt(() => {
        s.value?.focus(), s.value?.select();
      });
    }
    function d() {
      if (!t.value) return;
      t.value = !1;
      const v = o.value.trim();
      ct.setCustomMotto(v), v && ke.fetch(c("motto.appName"), c("motto.updated", { text: v }));
    }
    function h() {
      t.value = !1;
    }
    function b(v) {
      v.key === "Enter" ? (v.preventDefault(), d()) : v.key === "Escape" && (v.preventDefault(), h());
    }
    function E(v) {
      t.value || (v.preventDefault(), v.stopPropagation(), ct.stepHistory(v.deltaY > 0 ? 1 : -1));
    }
    function g(v) {
      v.preventDefault(), v.stopPropagation(), ct.openMenu(v.clientX, v.clientY);
    }
    function M(v) {
      J.menuOpen && (v.target.closest(".motto-context-menu") || ct.closeMenu());
    }
    return qe(() => {
      ct.init(), window.addEventListener("click", M);
    }), Nt(() => {
      window.removeEventListener("click", M);
    }), (v, w) => (l(), p(Q, null, [
      n("div", {
        class: "hero-motto-wrapper",
        title: i(c)("motto.hint"),
        onWheel: E,
        onContextmenu: g
      }, [
        t.value ? st((l(), p("input", {
          key: 0,
          ref_key: "mottoInputRef",
          ref: s,
          "onUpdate:modelValue": w[0] || (w[0] = (T) => o.value = T),
          class: "hero-motto-input",
          type: "text",
          placeholder: i(c)("motto.placeholder"),
          maxlength: "60",
          onBlur: d,
          onKeydown: b
        }, null, 40, Gc)), [
          [fo, o.value]
        ]) : (l(), p("p", {
          key: 1,
          id: "greeting",
          class: "hero-motto-text",
          style: Se({
            color: i(_e).greetColor,
            textShadow: i(_e).greetColor === "#0f172a" ? "none" : "0 1px 8px rgba(0, 0, 0, 0.35)"
          }),
          onClick: f
        }, [
          n("span", Uc, u(m.value), 1),
          i(J).history.length > 1 ? (l(), p("span", {
            key: 0,
            class: "motto-scroll-hint",
            title: i(c)("motto.scrollHint")
          }, "⇕", 8, Yc)) : P("", !0)
        ], 4))
      ], 40, zc),
      (l(), pe(bt, { to: "body" }, [
        i(J).menuOpen ? (l(), p("div", {
          key: 0,
          class: "motto-context-menu",
          style: Se({ left: `${i(J).menuPos.x}px`, top: `${i(J).menuPos.y}px` }),
          onClick: w[3] || (w[3] = V(() => {
          }, ["stop"])),
          onContextmenu: w[4] || (w[4] = V(() => {
          }, ["prevent"]))
        }, [
          n("div", Xc, [
            n("span", null, u(i(c)("motto.customTitle")), 1),
            n("small", qc, u(i(c)("motto.recordsCount", { count: i(J).history.length })), 1)
          ]),
          n("button", {
            type: "button",
            class: "motto-menu-action",
            onClick: f
          }, [
            w[5] || (w[5] = n("i", null, "✎", -1)),
            n("span", null, u(i(c)("motto.editCurrent")), 1)
          ]),
          w[8] || (w[8] = n("div", { class: "motto-menu-divider" }, null, -1)),
          n("div", Jc, u(i(c)("motto.historyLabel")), 1),
          n("div", Zc, [
            i(J).history.length ? (l(!0), p(Q, { key: 1 }, we(i(J).history, (T) => (l(), p("div", {
              key: T.id,
              class: ce(["motto-history-item", { active: i(J).customText === T.text }]),
              onClick: (y) => i(ct).selectHistory(T)
            }, [
              n("span", td, u(T.date), 1),
              n("span", {
                class: "motto-item-text",
                title: r(T.text)
              }, u(r(T.text)), 9, od),
              n("button", {
                type: "button",
                class: "motto-item-del",
                title: i(c)("motto.deleteEntry"),
                onClick: V((y) => i(ct).deleteEntry(T.id), ["stop"])
              }, "×", 8, nd)
            ], 10, ed))), 128)) : (l(), p("div", Qc, u(i(c)("motto.historyEmpty")), 1))
          ]),
          w[9] || (w[9] = n("div", { class: "motto-menu-divider" }, null, -1)),
          n("button", {
            type: "button",
            class: "motto-menu-action reset-btn",
            onClick: w[1] || (w[1] = //@ts-ignore
            (...T) => i(ct).resetToSystem && i(ct).resetToSystem(...T))
          }, [
            w[6] || (w[6] = n("i", null, "↻", -1)),
            n("span", null, u(i(c)("motto.resetGreeting")), 1)
          ]),
          i(J).history.length ? (l(), p("button", {
            key: 0,
            type: "button",
            class: "motto-menu-action danger-btn",
            onClick: w[2] || (w[2] = //@ts-ignore
            (...T) => i(ct).clearHistory && i(ct).clearHistory(...T))
          }, [
            w[7] || (w[7] = n("i", null, "🗑", -1)),
            n("span", null, u(i(c)("motto.clearAll")), 1)
          ])) : P("", !0)
        ], 36)) : P("", !0)
      ]))
    ], 64));
  }
}), sd = /* @__PURE__ */ Re(id, [["__scopeId", "data-v-afc4beae"]]), ad = /* @__PURE__ */ fe({
  __name: "HeroClock",
  setup(e) {
    const t = [
      "clock.weekday.sun",
      "clock.weekday.mon",
      "clock.weekday.tue",
      "clock.weekday.wed",
      "clock.weekday.thu",
      "clock.weekday.fri",
      "clock.weekday.sat"
    ];
    function o(d) {
      return d < 5 ? c("clock.greeting.lateNight") : d < 9 ? c("clock.greeting.morning") : d < 12 ? c("clock.greeting.forenoon") : d < 14 ? c("clock.greeting.noon") : d < 18 ? c("clock.greeting.afternoon") : d < 23 ? c("clock.greeting.evening") : c("clock.greeting.lateNight");
    }
    function s() {
      const d = Gt.state.timezone;
      if (!d || d === "local") return /* @__PURE__ */ new Date();
      try {
        const h = (/* @__PURE__ */ new Date()).toLocaleString("en-US", { timeZone: d });
        return new Date(h);
      } catch {
        return /* @__PURE__ */ new Date();
      }
    }
    function a() {
      const d = (G) => String(G).padStart(2, "0"), h = s(), b = h.getHours(), E = h.getMinutes(), g = h.getSeconds(), M = h.getFullYear(), v = h.getMonth() + 1, w = h.getDate(), T = h.getDay(), y = `${d(b)}:${d(E)}`, C = `:${d(g)}`, L = o(b), B = c(t[T]), H = c("clock.datePattern", {
        year: M,
        month: v,
        day: w,
        week: B
      });
      lo.updateTime(y, C, L, H);
    }
    function r(d) {
      d.preventDefault(), Gt.open({ clientX: d.clientX, clientY: d.clientY });
    }
    function m() {
      document.hidden ? f && (clearInterval(f), f = null) : (a(), f || (f = setInterval(a, 1e3)));
    }
    let f = null;
    return Gt.initPreferences(), a(), qe(() => {
      Gt.initPreferences(), We(mt, () => {
        a();
      }), yt.activeId || (a(), f = setInterval(a, 1e3)), document.addEventListener("visibilitychange", m);
    }), We(
      () => yt.activeId,
      (d) => {
        d ? f && (clearInterval(f), f = null) : document.hidden || (a(), f || (f = setInterval(a, 1e3)));
      }
    ), Nt(() => {
      f && (clearInterval(f), f = null), document.removeEventListener("visibilitychange", m);
    }), (d, h) => (l(), p("div", {
      class: "hero-clock-vue-container",
      onContextmenu: r
    }, [
      n("p", {
        id: "clock",
        class: "clock",
        style: Se({
          fontFamily: i(_e).fontFamily,
          color: i(_e).colorHex,
          textShadow: i(_e).colorHex === "#0f172a" ? "none" : "0 2px 14px rgba(0, 0, 0, 0.45)"
        })
      }, [
        tt(u(i(_e).timeText), 1),
        n("span", {
          id: "secs",
          style: Se({ color: i(_e).colorHex })
        }, u(i(_e).secsText), 5)
      ], 4),
      n("p", {
        id: "date",
        class: "date",
        style: Se({
          color: i(_e).dateColor,
          textShadow: i(_e).dateColor === "#0f172a" ? "none" : "0 1px 8px rgba(0, 0, 0, 0.35)"
        })
      }, u(i(_e).dateText), 5)
    ], 32));
  }
}), ks = /* @__PURE__ */ Re(ad, [["__scopeId", "data-v-16c004bb"]]), rd = {
  key: 0,
  class: "home-music-degraded-box"
}, ld = { class: "degraded-badge-row" }, cd = { class: "degraded-status" }, dd = {
  key: 0,
  class: "degraded-host-tag"
}, ud = {
  key: 1,
  class: "degraded-host-tag"
}, pd = { class: "degraded-title-row" }, hd = ["title"], fd = { class: "degraded-track-artist" }, gd = { class: "degraded-progress-bar-wrap" }, md = { class: "degraded-actions" }, vd = { class: "degraded-time" }, yd = { class: "home-vinyl-box" }, wd = ["title"], bd = ["src", "alt"], kd = { class: "home-music-right" }, _d = ["title"], Cd = {
  id: "home-music-artist",
  class: "home-music-meta-artist"
}, xd = { class: "home-music-seek-row" }, Ld = {
  id: "home-music-cur",
  class: "home-music-time"
}, $d = ["value"], Sd = {
  id: "home-music-dur",
  class: "home-music-time"
}, Td = { class: "home-music-actions" }, Id = ["title"], Md = ["title"], Dd = ["title"], Ad = ["title"], Ed = ["title"], Pd = /* @__PURE__ */ fe({
  __name: "HomeMusicCard",
  setup(e) {
    qe(() => {
      setTimeout(() => {
        ea();
      }, 200);
    });
    const t = te(() => Ji.visible || gt.djModalOpen || gt.isActive && gt.isJoined), o = te(() => gt.isActive && gt.isJoined), s = te(() => !oe.title || oe.title === "点击播放" ? c("home.music.defaultTitle") : oe.title), a = te(() => !oe.artist || oe.artist === "作者" ? c("home.music.defaultArtist") : oe.artist), r = te(() => oe.mode === "shuffle" ? "🔀" : oe.mode === "one" ? "🔂" : "🔁");
    function m(d) {
      const h = d.target, b = Number(h.value);
      Qe.seek(b);
    }
    function f() {
      Qe.update({ coverUrl: "" });
    }
    return (d, h) => (l(), p("div", {
      id: "home-music-player-view",
      class: ce(["home-music-player-view", { "is-degraded": t.value }])
    }, [
      t.value ? (l(), p("div", rd, [
        n("div", ld, [
          h[7] || (h[7] = n("span", { class: "degraded-icon" }, "🎧", -1)),
          n("strong", cd, u(o.value ? i(c)("home.music.togetherListening") : i(c)("home.music.backgroundListening")), 1),
          o.value ? (l(), p("span", dd, " DJ: " + u(i(gt).hostName), 1)) : (l(), p("span", ud, u(i(c)("home.music.workspaceReady")), 1))
        ]),
        n("div", pd, [
          n("h3", {
            class: "degraded-track-title",
            title: s.value
          }, u(s.value || i(c)("home.music.standby")), 9, hd),
          n("p", fd, u(a.value), 1)
        ]),
        n("div", gd, [
          n("div", {
            class: "degraded-progress-bar-fill",
            style: Se({ width: i(oe).progressPercent + "%" })
          }, null, 4)
        ]),
        n("div", md, [
          n("button", {
            type: "button",
            class: "degraded-btn",
            onClick: h[0] || (h[0] = (b) => i(Qe).togglePlay())
          }, u(i(oe).playing ? i(c)("home.music.pause") : i(c)("home.music.play")), 1),
          n("span", vd, u(i(oe).formattedCurrent) + " / " + u(i(oe).formattedDuration), 1)
        ])
      ])) : (l(), p(Q, { key: 1 }, [
        n("div", yd, [
          n("div", {
            id: "home-vinyl-needle",
            class: ce(["home-vinyl-needle", { playing: i(oe).playing }])
          }, [...h[8] || (h[8] = [
            So('<svg viewBox="0 0 32 52" fill="none" data-v-6f1e9a8e><circle cx="26" cy="4" r="3.5" fill="#e2e8f0" stroke="#475569" stroke-width="1.5" data-v-6f1e9a8e></circle><circle cx="26" cy="4" r="1.5" fill="#64748b" data-v-6f1e9a8e></circle><path d="M26 4 L14 26 L11 44" stroke="#cbd5e1" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" data-v-6f1e9a8e></path><rect x="7" y="42" width="8" height="9" rx="1.5" fill="#f43f5e" transform="rotate(-15 11 46)" data-v-6f1e9a8e></rect></svg>', 1)
          ])], 2),
          n("div", {
            id: "home-vinyl-disc",
            class: ce(["home-vinyl-disc", { playing: i(oe).playing }]),
            title: i(c)("home.music.togglePlay"),
            onClick: h[1] || (h[1] = (b) => i(Qe).togglePlay())
          }, [
            i(oe).coverUrl ? (l(), p("img", {
              key: 0,
              id: "home-vinyl-cover",
              class: "home-vinyl-cover",
              referrerpolicy: "no-referrer",
              src: i(oe).coverUrl,
              alt: i(c)("home.music.coverAlt"),
              onError: f
            }, null, 40, bd)) : P("", !0),
            h[9] || (h[9] = n("div", { class: "home-vinyl-hole" }, null, -1))
          ], 10, wd)
        ]),
        n("div", kd, [
          n("h3", {
            id: "home-music-title",
            class: "home-music-meta-title",
            title: s.value
          }, u(s.value), 9, _d),
          n("p", Cd, u(a.value), 1),
          n("div", xd, [
            n("span", Ld, u(i(oe).formattedCurrent), 1),
            n("input", {
              id: "home-music-seek",
              class: "home-music-seek-bar",
              type: "range",
              min: "0",
              max: "100",
              value: i(oe).progressPercent,
              onInput: m
            }, null, 40, $d),
            n("span", Sd, u(i(oe).formattedDuration), 1)
          ]),
          n("div", Td, [
            n("button", {
              id: "home-music-prev",
              class: "home-music-btn",
              type: "button",
              title: i(c)("home.music.prevTrack"),
              onClick: h[2] || (h[2] = (b) => i(Qe).prev())
            }, " ⏮ ", 8, Id),
            n("button", {
              id: "home-music-play",
              class: "home-music-btn play-btn",
              type: "button",
              title: i(c)("home.music.togglePlay"),
              onClick: h[3] || (h[3] = (b) => i(Qe).togglePlay())
            }, u(i(oe).playing ? "⏸" : "▶"), 9, Md),
            n("button", {
              id: "home-music-next",
              class: "home-music-btn",
              type: "button",
              title: i(c)("home.music.nextTrack"),
              onClick: h[4] || (h[4] = (b) => i(Qe).next())
            }, " ⏭ ", 8, Dd),
            n("button", {
              id: "home-music-like",
              class: ce(["home-music-btn like-btn", { liked: i(oe).liked }]),
              type: "button",
              title: i(c)("home.music.favorite"),
              onClick: h[5] || (h[5] = (b) => i(Qe).toggleLike())
            }, u(i(oe).liked ? "♥" : "♡"), 11, Ad),
            n("button", {
              id: "home-music-mode",
              class: "home-music-btn",
              type: "button",
              title: i(c)("home.music.playMode"),
              onClick: h[6] || (h[6] = (b) => i(Qe).cycleMode())
            }, u(r.value), 9, Ed)
          ])
        ])
      ], 64))
    ], 2));
  }
}), _s = /* @__PURE__ */ Re(Pd, [["__scopeId", "data-v-6f1e9a8e"]]), $t = /* @__PURE__ */ new Map(), St = /* @__PURE__ */ new Set();
function Wd(e, t) {
  for ($t.delete(e), $t.set(e, t), St.delete(t), St.add(t); $t.size > 512; )
    $t.delete($t.keys().next().value);
  for (; St.size > 512; )
    St.delete(St.values().next().value);
}
const Rd = {
  key: 0,
  class: "launcher-fallback"
}, Nd = ["src"], Hn = "lw_resolved_icon:", Od = /* @__PURE__ */ fe({
  __name: "LauncherFavicon",
  props: {
    link: {},
    mini: { type: Boolean, default: !1 }
  },
  setup(e) {
    function t(y) {
      try {
        return localStorage.getItem(Hn + y) || "";
      } catch {
        return "";
      }
    }
    function o(y, C) {
      try {
        localStorage.setItem(Hn + y, C);
      } catch {
      }
    }
    function s(y) {
      try {
        return localStorage.getItem("lw_sync_dataurl:" + y) || "";
      } catch {
        return "";
      }
    }
    const a = e;
    function r(y) {
      try {
        return new URL(y).hostname.replace(/^www\./, "");
      } catch {
        return y || "";
      }
    }
    function m(y) {
      try {
        return new URL(y).origin;
      } catch {
        return "";
      }
    }
    function f(y) {
      try {
        const C = window, L = typeof C.chrome < "u" ? C.chrome : globalThis.chrome;
        if (typeof L?.runtime?.getURL == "function")
          return L.runtime.getURL("_favicon/?pageUrl=" + encodeURIComponent(y) + "&size=64");
      } catch {
      }
      return "";
    }
    const d = te(() => {
      const y = a.link, C = (y.title || r(y.url)).trim();
      return C ? C.slice(0, 1).toUpperCase() : "🔗";
    }), h = z([]), b = z(0), E = z(!1), g = z(!1), M = te(() => g.value || b.value >= h.value.length ? "" : h.value[b.value] || "");
    function v() {
      const y = a.link;
      if (!y?.url) {
        h.value = [], g.value = !0, E.value = !1;
        return;
      }
      const C = [], L = s(y.url);
      L && C.push(L);
      const B = $t.get(y.url) || t(y.url);
      B && !C.includes(B) && C.push(B);
      const H = (R) => R ? /google\.com\/s2\/favicons|icons\.duckduckgo\.com|unavatar\.io|icon\.horse/i.test(R) : !1;
      y.customIcon && !H(y.customIcon) && C.push(y.customIcon), y.icon && !H(y.icon) && C.push(y.icon);
      const G = f(y.url);
      G && !C.includes(G) && C.push(G);
      const A = Ee.getCachedIcon(y.url);
      A && !C.includes(A) && C.push(A);
      const _ = m(y.url);
      _ && !_.startsWith("http://1.") && !_.startsWith("http://192.") && !_.startsWith("http://127.") && C.push(`${_}/favicon.ico`), y.customIcon && !H(y.customIcon) && C.unshift(y.customIcon);
      const $ = [...new Set(C.filter(Boolean))];
      h.value = $, b.value = 0, g.value = $.length === 0;
      const ee = $[0];
      ee && (ee.startsWith("data:") || St.has(ee)) && (E.value = !0);
    }
    We(
      () => [a.link?.url, a.link?.icon, a.link?.customIcon],
      (y, C) => {
        C && y[0] === C[0] && y[1] === C[1] && y[2] === C[2] || v();
      },
      { immediate: !0 }
    ), qe(() => {
      h.value.length === 0 && v();
    });
    function w(y) {
      E.value = !0, g.value = !1;
      const C = M.value;
      if (C) {
        const L = St.has(C), B = $t.get(a.link.url);
        Wd(a.link.url, C), B !== C && t(a.link.url) !== C && o(a.link.url, C);
        const H = y.target;
        if (!L && !C.startsWith("data:")) {
          const G = a.link.url;
          setTimeout(() => {
            Ee.cacheIcon(G, C, H?.getAttribute("src") === C ? H : null);
          }, 0);
        }
      }
    }
    function T() {
      const y = M.value;
      if (y) {
        St.delete(y), $t.get(a.link.url) === y && $t.delete(a.link.url);
        try {
          localStorage.removeItem(Hn + a.link.url), localStorage.removeItem("lw_sync_dataurl:" + a.link.url);
        } catch {
        }
      }
      if (y && Ee.getCachedIcon(a.link.url) === y && Ee.evictCachedIcon(a.link.url), b.value + 1 < h.value.length) {
        b.value += 1;
        const C = h.value[b.value];
        C && (C.startsWith("data:") || St.has(C)) && (E.value = !0);
      } else
        g.value = !0, E.value = !1;
    }
    return (y, C) => (l(), p("span", {
      class: ce(e.mini ? "launcher-folder-mini" : "launcher-favicon")
    }, [
      g.value || !M.value ? (l(), p("span", Rd, u(d.value), 1)) : (l(), p("img", {
        key: 1,
        src: M.value,
        alt: "",
        draggable: "false",
        referrerpolicy: "no-referrer",
        decoding: "async",
        style: { "pointer-events": "none", "user-select": "none" },
        onLoad: w,
        onError: T
      }, null, 40, Nd))
    ], 2));
  }
}), wn = /* @__PURE__ */ Re(Od, [["__scopeId", "data-v-49e611bb"]]), Bd = { class: "launcher-label launcher-title" }, Fd = ["title"], Hd = {
  key: 0,
  class: "launcher-folder-more"
}, Kd = {
  key: 1,
  class: "empty-folder",
  "aria-hidden": "true"
}, jd = { class: "launcher-folder-label launcher-title" }, Vd = /* @__PURE__ */ fe({
  __name: "LauncherTileContent",
  props: {
    link: {},
    folder: {},
    size: { default: "small" }
  },
  setup(e) {
    const t = e, o = te(() => t.size === "large" ? 9 : 4), s = te(() => t.folder?.preview.slice(0, t.folder.count > o.value ? o.value - 1 : o.value) || []);
    return (a, r) => e.link ? (l(), p(Q, { key: 0 }, [
      Z(wn, { link: e.link }, null, 8, ["link"]),
      n("span", Bd, u(e.link.title), 1)
    ], 64)) : e.folder ? (l(), p(Q, { key: 1 }, [
      n("div", {
        class: "launcher-folder-preview",
        title: `打开${e.folder.title}`
      }, [
        (l(!0), p(Q, null, we(s.value, (m) => (l(), pe(wn, {
          key: m.id,
          link: m,
          mini: !0
        }, null, 8, ["link"]))), 128)),
        e.folder.count > o.value ? (l(), p("span", Hd, "+" + u(e.folder.count - (o.value - 1)), 1)) : P("", !0),
        s.value.length ? P("", !0) : (l(), p("span", Kd, "📁")),
        hn(a.$slots, "default", {}, void 0, !0)
      ], 8, Fd),
      n("span", jd, u(e.folder.title), 1)
    ], 64)) : P("", !0);
  }
}), Po = /* @__PURE__ */ Re(Vd, [["__scopeId", "data-v-289b8350"]]), Cs = 5, xs = 180;
function Ls(e, t, o) {
  const s = t - e.left, a = o - e.top;
  return s > e.width * 0.25 && s < e.width * 0.75 && a > e.height * 0.25 && a < e.height * 0.75;
}
function $s(e, t, o) {
  return Math.hypot(t - (e.left + e.width / 2), o - (e.top + e.height / 2)) <= Math.max(e.width, e.height) * 0.55;
}
const zd = {
  class: "launcher-group launcher-aihot launcher-todoist size-large",
  id: "launcher-todoist"
}, Gd = { class: "card-head aihot-home-head" }, Ud = { class: "title" }, Yd = ["title"], Xd = ["title"], qd = {
  class: "aihot-home-body",
  id: "aihot-home-body"
}, Jd = {
  key: 0,
  class: "muted small"
}, Zd = {
  key: 1,
  class: "notice small"
}, Qd = {
  key: 2,
  class: "muted small aihot-home-empty"
}, eu = {
  key: 3,
  class: "aihot-home-rich-list"
}, tu = ["href", "title", "onClick"], ou = { class: "aihot-home-rich-main" }, nu = { class: "aihot-home-rich-title" }, iu = {
  key: 0,
  class: "aihot-home-rich-summary"
}, su = { class: "aihot-home-rich-meta" }, au = { class: "aihot-home-rich-meta-left" }, ru = {
  key: 0,
  class: "aihot-home-rich-tag"
}, lu = { class: "aihot-home-rich-source" }, cu = { class: "aihot-home-rich-time" }, Oi = 6, du = /* @__PURE__ */ fe({
  __name: "LauncherAiHotCard",
  setup(e) {
    const t = {
      "ai-models": "aihot.card.cat.models",
      "ai-products": "aihot.card.cat.products",
      industry: "aihot.card.cat.industry",
      paper: "aihot.card.cat.paper",
      tip: "aihot.card.cat.tip",
      code: "aihot.card.cat.code",
      hardware: "aihot.card.cat.hardware",
      robot: "aihot.card.cat.robot"
    }, o = z([]), s = z(0), a = z(!0), r = z("");
    function m(y) {
      return mt.value === "en" && y.originalTitle ? y.originalTitle : y.title;
    }
    function f(y) {
      const C = y.source?.name || y.sourceName || "AI HOT";
      return mt.value === "en" && C.includes("：") ? C.split("：")[0].trim() : C;
    }
    function d(y) {
      if (!y.category) return "";
      const C = t[y.category];
      if (C)
        try {
          return c(C);
        } catch {
        }
      return y.category;
    }
    const h = te(() => mt.value !== "en" ? o.value : [...o.value].sort((y, C) => {
      const L = !!(y.originalTitle && /[a-zA-Z]{3,}/.test(y.originalTitle)), B = !!(C.originalTitle && /[a-zA-Z]{3,}/.test(C.originalTitle));
      return L && !B ? -1 : !L && B ? 1 : 0;
    }));
    function b(y) {
      const C = y.publishedAt || y.published || "";
      if (!C) return mt.value === "en" ? "Latest" : "最新";
      const L = Number(C), B = Number.isFinite(L) && L > 0 ? new Date(L > 1e12 ? L : L * 1e3) : new Date(C);
      if (isNaN(B.getTime())) return String(C).slice(0, 16) || (mt.value === "en" ? "Latest" : "最新");
      const H = (R) => String(R).padStart(2, "0"), G = B.getFullYear(), A = H(B.getMonth() + 1), _ = H(B.getDate()), $ = H(B.getHours()), ee = H(B.getMinutes());
      return `${G}-${A}-${_} ${$}:${ee}`;
    }
    const E = [
      {
        id: "fb-1",
        title: "DeepSeek 发布新一代推理与开源模型架构，算力能效与推理表现获全球瞩目",
        originalTitle: "DeepSeek Unveils Next-Generation Open Reasoning Architecture",
        summary: "新一代模型在长文本理解、复杂数学推导与代码生成领域实现大幅跃升，全面革新开源生态格局与部署成本。",
        category: "ai-models",
        sourceName: "AI Research",
        publishedAt: new Date(Date.now() - 36e5).toISOString(),
        links: { original: "https://aihot.virxact.com" },
        url: "https://aihot.virxact.com"
      },
      {
        id: "fb-2",
        title: "Anthropic 正式推出 Claude 3.7 Sonnet 混合推理模型与交互演进",
        originalTitle: "Anthropic Releases Claude 3.7 Sonnet with Hybrid Reasoning",
        summary: "业界首创结合瞬时直答与长思维链展开模式，兼顾极速响应与深层次逻辑推理，编码能力刷新多项基准。",
        category: "ai-models",
        sourceName: "Anthropic Blog",
        publishedAt: new Date(Date.now() - 72e5).toISOString(),
        links: { original: "https://aihot.virxact.com" },
        url: "https://aihot.virxact.com"
      },
      {
        id: "fb-3",
        title: "OpenAI 发布 GPT-4.5 预研与多模态感知前沿技术进展报告",
        originalTitle: "OpenAI Frontier Multimodal & System Progress Technical Brief",
        summary: "更大规模的世界知识储备与常识对齐，进一步缩减幻觉率，带来更自然的上下文情感感知与工具调用精度。",
        category: "industry",
        sourceName: "OpenAI Research",
        publishedAt: new Date(Date.now() - 108e5).toISOString(),
        links: { original: "https://aihot.virxact.com" },
        url: "https://aihot.virxact.com"
      },
      {
        id: "fb-4",
        title: "具身智能开源机器人开源框架发布，多模态大模型进入物理现实交互新阶段",
        originalTitle: "End-to-End Embodied AI Framework Advances Dexterous Manipulation",
        summary: "从视觉语言感知到肢体灵巧操作的端到端神经驱动方案，大幅降低机器人动作泛化与仿真学习门槛。",
        category: "robot",
        sourceName: "Robotics Weekly",
        publishedAt: new Date(Date.now() - 144e5).toISOString(),
        links: { original: "https://aihot.virxact.com" },
        url: "https://aihot.virxact.com"
      },
      {
        id: "fb-5",
        title: "AI 编程智能体大规模落地开发团队，软件工程流水线迈向全面自动化",
        originalTitle: "Autonomous Coding Agents Reshape Modern Software Engineering Pipelines",
        summary: "代码检索、自动修复测试用例、全景架构审查及一键重构工具已无缝嵌入主流 IDE 与 Git 工作流。",
        category: "code",
        sourceName: "Hacker News",
        publishedAt: new Date(Date.now() - 18e6).toISOString(),
        links: { original: "https://aihot.virxact.com" },
        url: "https://aihot.virxact.com"
      },
      {
        id: "fb-6",
        title: "多模态大模型芯片与集群能效优化报告：端侧低功耗推理成为新焦点",
        originalTitle: "Edge LLM Acceleration & Speculative Decoding Efficiency Report",
        summary: "混合量化与投机解码技术走向成熟，在普通消费级终端与嵌入式边缘硬件上实现高质量全尺寸模型流畅运行。",
        category: "hardware",
        sourceName: "Semiconductor Insights",
        publishedAt: new Date(Date.now() - 216e5).toISOString(),
        links: { original: "https://aihot.virxact.com" },
        url: "https://aihot.virxact.com"
      }
    ];
    function g() {
      const C = (typeof window < "u" ? window : null)?.LogicWeaverAihotFeed?.getState?.()?.feedArticles;
      if (Array.isArray(C) && C.length)
        return C;
      const L = [
        "newtab_aihot_items_v2",
        "lw-aihot-cached-feed-all-24h-v1",
        "lw-aihot-cached-feed-v1"
      ];
      for (const B of L)
        try {
          const H = localStorage.getItem(B);
          if (H) {
            const G = JSON.parse(H);
            if (Array.isArray(G) && G.length) return G;
            if (G && Array.isArray(G.items) && G.items.length) return G.items;
          }
        } catch {
        }
      return [];
    }
    async function M(y = !1) {
      if (!y && o.value.length > 0) return;
      const C = g();
      C.length ? (o.value = C, a.value = !1) : o.value.length || (o.value = [...E], a.value = !1);
      try {
        const B = await (await fetch("https://aihot.virxact.com/api/v1/items?mode=selected&window=24h&limit=24", {
          headers: { Accept: "application/json" },
          signal: AbortSignal.timeout(5e3)
        })).json(), H = Array.isArray(B) ? B : B.items || B.data || B.results || [];
        if (H.length) {
          o.value = H, s.value = 0, r.value = "";
          try {
            localStorage.setItem("newtab_aihot_items_v2", JSON.stringify(H.slice(0, 30)));
          } catch {
          }
        }
      } catch {
        o.value.length || (o.value = [...E]);
      } finally {
        a.value = !1;
      }
    }
    function v() {
      if (!h.value.length) {
        a.value = !0, M(!0);
        return;
      }
      s.value += Oi, s.value >= h.value.length && (s.value = 0);
    }
    function w() {
      const y = window;
      if (typeof y.enterFullscreenCard == "function") {
        y.enterFullscreenCard("daily-aihot");
        return;
      }
      const C = document.querySelector("#daily-aihot, [data-dock-id='daily-aihot']");
      C ? C.scrollIntoView({ behavior: "smooth", block: "start" }) : window.open("https://aihot.virxact.com", "_blank", "noreferrer");
    }
    function T(y, C) {
      if (C.ctrlKey || C.metaKey || C.shiftKey || C.button === 1) return;
      C.preventDefault();
      const L = y.links?.original || y.links?.aihot || y.url || "#";
      ci.openArticle(
        {
          id: y.id,
          title: m(y),
          summary: y.summary,
          sourceName: f(y),
          published: b(y),
          url: L
        },
        ""
      );
    }
    return qe(() => {
      M();
    }), (y, C) => (l(), p("section", zd, [
      n("header", Gd, [
        C[0] || (C[0] = n("span", { class: "bar cyan" }, null, -1)),
        n("strong", Ud, u(i(c)("aihot.card.title")), 1),
        C[1] || (C[1] = n("span", { class: "grow" }, null, -1)),
        n("button", {
          class: "aihot-home-btn",
          type: "button",
          title: i(c)("aihot.card.refreshBtnTip"),
          onClick: v
        }, u(i(c)("aihot.card.refreshBtn")), 9, Yd),
        n("button", {
          class: "aihot-home-btn aihot-home-more-btn",
          type: "button",
          title: i(c)("aihot.card.hotlistBtnTip"),
          onClick: w
        }, u(i(c)("aihot.card.hotlistBtn")), 9, Xd)
      ]),
      n("div", qd, [
        a.value && !h.value.length ? (l(), p("p", Jd, u(i(c)("aihot.card.loading")), 1)) : r.value && !h.value.length ? (l(), p("p", Zd, u(r.value), 1)) : h.value.length ? (l(), p("div", eu, [
          (l(!0), p(Q, null, we(h.value.slice(s.value, s.value + Oi), (L, B) => (l(), p("a", {
            key: L.id || L.title,
            class: "aihot-home-rich-card",
            href: L.links?.original || L.links?.aihot || L.url || "#",
            target: "_blank",
            rel: "noreferrer",
            title: `${m(L)}
${L.summary || ""}
${i(c)("aihot.card.viewInReader")}`,
            onClick: (H) => T(L, H)
          }, [
            n("span", {
              class: ce(["aihot-home-rich-rank", { top: s.value + B < 3 }])
            }, u(s.value + B + 1), 3),
            n("div", ou, [
              n("h3", nu, u(m(L)), 1),
              L.summary ? (l(), p("p", iu, u(L.summary), 1)) : P("", !0),
              n("div", su, [
                n("div", au, [
                  d(L) ? (l(), p("span", ru, u(d(L)), 1)) : P("", !0),
                  n("span", lu, u(f(L)), 1)
                ]),
                n("time", cu, u(b(L)), 1)
              ])
            ])
          ], 8, tu))), 128))
        ])) : (l(), p("p", Qd, u(i(c)("aihot.card.empty")), 1))
      ])
    ]));
  }
}), uu = /* @__PURE__ */ Re(du, [["__scopeId", "data-v-01e71b65"]]), pu = ["aria-label"], hu = ["disabled", "aria-pressed"], fu = ["disabled", "aria-pressed"], gu = ["aria-label"], mu = ["data-page", "title", "onClick", "onContextmenu", "onDragover", "onDrop"], vu = {
  key: 0,
  id: "bookmark-board-header",
  class: "launcher-page-tabs"
}, yu = ["data-page"], wu = ["href", "title", "data-launcher-id", "onPointerdown", "onClick", "onContextmenu"], bu = ["title", "data-launcher-folder", "onPointerdown", "onDragstart", "onDrop", "onClick", "onContextmenu"], ku = ["title", "onClick"], _u = {
  class: "launcher-folder-count",
  hidden: ""
}, Cu = {
  class: "launcher-empty",
  key: "empty-msg"
}, xu = {
  key: 1,
  class: "launcher-media-stack"
}, Lu = {
  key: 1,
  id: "launcher-bili"
}, $u = { class: "launcher-folder-preview" }, Su = { class: "launcher-folder-label launcher-title" }, Tu = { class: "launcher-label launcher-title" }, Iu = /* @__PURE__ */ fe({
  __name: "FavoriteSites",
  setup(e) {
    const t = X(() => import("./BookmarkBoard-DqDQIPVe.js")), o = X(() => import("./LauncherBookGuideDialog-pPgKOi0X.js")), s = te({
      get: () => ue.sitesView || "sites",
      set: (k) => Fe.setSitesView(k)
    }), a = z(!1), r = z(!1);
    function m() {
      r.value = !0;
    }
    function f() {
      r.value = !1;
    }
    function d() {
      be(), w = !1, ve = !1;
    }
    qe(() => {
      Fe.setExternalDragHandler(A), Fe.setExternalDropHandler(_), window.addEventListener("blur", d), window.addEventListener("pagehide", d), document.addEventListener("visibilitychange", d);
      const k = window;
      ue.hasBili && typeof k.ensureLauncherMediaCards == "function" && k.ensureLauncherMediaCards();
    });
    const h = z(!1), b = z(""), E = z(null), g = z(null), M = z(null), v = z(null);
    let w = !1, T = 0, y = 0, C = 0, L = "", B = 0, H = "", G = 0;
    function A(k) {
      if (s.value !== "sites") return;
      if (!k || Ct.isOpen) {
        v.value && (v.value = null), H = "";
        return;
      }
      const x = document.elementsFromPoint(k.clientX, k.clientY);
      if (!x.some(
        (Ue) => Ue.classList.contains("launcher-site-items") || !!Ue.closest?.(".launcher-site-items")
      )) {
        v.value && (v.value = null), H = "";
        return;
      }
      const W = x.find((Ue) => Ue.classList.contains("launcher-link") && Ue.getAttribute("data-launcher-id") !== String(k.link.id) || Ue.classList.contains("launcher-folder"));
      if (!W) return;
      const se = W.classList.contains("launcher-link"), xe = se ? W.getAttribute("data-launcher-id") : null, je = se ? null : W.getAttribute("data-launcher-folder"), re = se ? `link-${xe}` : `folder-${je}`, le = W.getBoundingClientRect(), Je = le.left + le.width / 2, xn = le.top + le.height / 2, yo = Math.hypot(k.clientX - Je, k.clientY - xn), Jt = Date.now();
      if (yo > Math.max(le.width, le.height) * 0.55 || re === H && Jt - G < 180) return;
      const Zt = Xt.value.filter(
        (Ue) => Ue.type !== "link" || String(Ue.link.id) !== String(k.link.id)
      ), vt = [...v.value || Zt], Mt = vt.findIndex(
        (Ue) => Ue.type === "link" && String(Ue.link.id) === String(k.link.id)
      ), Dt = vt.findIndex((Ue) => Ue.key === re);
      if (Dt < 0) return;
      const at = {
        key: `link-${k.link.id}`,
        type: "link",
        link: k.link
      };
      Mt >= 0 ? Mt !== Dt && (vt.splice(Mt, 1), vt.splice(Dt, 0, at), v.value = vt, H = re, G = Jt) : (vt.splice(Dt, 0, at), v.value = vt, H = re, G = Jt);
    }
    async function _(k) {
      if (s.value !== "sites" || Ct.isOpen) return !1;
      if (v.value) {
        const x = v.value.map((S) => ({
          type: S.type,
          id: S.type === "link" ? String(S.link.id) : void 0,
          groupName: S.type === "folder" ? S.folder.groupName : void 0
        }));
        return await Ee.moveLinkTo(String(k.id), ue.activePage, "常用网站"), await Ee.reorderPageItems(ue.activePage, x), v.value = null, H = "", !0;
      }
      return !1;
    }
    const $ = Le({
      visible: !1,
      x: 0,
      y: 0,
      type: "link",
      link: null,
      folder: null,
      offsetX: 34,
      offsetY: 38
    });
    let ee = null, R = 0, Y = 0, N = null, U = null, ve = !1;
    function $e(k, x) {
      if (x.button !== 0) return;
      ee = x.pointerId, R = x.clientX, Y = x.clientY, y = x.clientX, C = x.clientY, N = String(k.id), U = null, ve = !1;
      const S = x.currentTarget.getBoundingClientRect();
      $.offsetX = x.clientX - S.left, $.offsetY = x.clientY - S.top, $.type = "link", $.link = k, $.folder = null, window.addEventListener("pointermove", Ie, { passive: !1 }), window.addEventListener("pointerup", Ce), window.addEventListener("pointercancel", Ce);
    }
    function j(k, x, S) {
      if (S.button !== 0 || S.target.closest(".launcher-folder-del-btn")) return;
      ee = S.pointerId, R = S.clientX, Y = S.clientY, y = S.clientX, C = S.clientY, N = null, U = k, ve = !1;
      const W = S.currentTarget.getBoundingClientRect();
      $.offsetX = S.clientX - W.left, $.offsetY = S.clientY - W.top, $.type = "folder", $.folder = {
        groupName: k,
        size: Be(k),
        links: x?.links || []
      }, $.link = null, window.addEventListener("pointermove", Ie, { passive: !1 }), window.addEventListener("pointerup", Ce), window.addEventListener("pointercancel", Ce);
    }
    let I = 0, F = null;
    function ye() {
      cancelAnimationFrame(I), I = 0, F = null;
    }
    function Ie(k) {
      k.pointerId === ee && (ve && k.cancelable && k.preventDefault(), F = k, !I && (I = requestAnimationFrame(() => {
        I = 0;
        const x = F;
        F = null, x && Me(x);
      })));
    }
    function Me(k) {
      if (k.pointerId !== ee || !N && !U) return;
      const x = Math.hypot(k.clientX - R, k.clientY - Y);
      if (!ve && x > Cs && (ve = !0, w = !0, N ? g.value = N : U && (M.value = U)), !ve) return;
      ($.link || $.folder) && ($.visible = !0, $.x = k.clientX - $.offsetX, $.y = k.clientY - $.offsetY);
      const S = document.elementsFromPoint(k.clientX, k.clientY);
      if (fi()) {
        const re = S.some(
          (Je) => Je.id === "launcher-folder-dialog" || !!Je.closest?.("#launcher-folder-dialog")
        ), le = document.querySelector("#launcher-folder-dialog");
        if (re && le) {
          le.classList.add("drop-hover-valid"), Ct.dropHoverValid = !0;
          return;
        } else
          le?.classList.remove("drop-hover-valid"), Ct.dropHoverValid = !1;
        v.value = null;
        return;
      }
      const se = v.value || Xt.value, xe = N ? `link-${N}` : `folder-${U}`;
      if (se.length) {
        const re = S.find((le) => {
          if (le.classList.contains("launcher-link")) {
            const Je = le.getAttribute("data-launcher-id");
            return Je && `link-${Je}` !== xe;
          }
          if (le.classList.contains("launcher-folder")) {
            const Je = le.getAttribute("data-launcher-folder");
            return Je && `folder-${Je}` !== xe;
          }
          return !1;
        });
        if (re) {
          const le = re.classList.contains("launcher-link"), Je = le ? re.getAttribute("data-launcher-id") : null, xn = le ? null : re.getAttribute("data-launcher-folder"), yo = le ? `link-${Je}` : `folder-${xn}`, Jt = re.getBoundingClientRect();
          let Zt = !0;
          N && !le && (Ls(Jt, k.clientX, k.clientY) ? (Zt = !1, re.classList.add("drop-target")) : re.classList.remove("drop-target"));
          const vt = Date.now();
          if ($s(Jt, k.clientX, k.clientY) || (Zt = !1), yo === L && vt - B < xs && (Zt = !1), Zt) {
            document.querySelectorAll(".launcher-folder.drop-target").forEach((at) => at.classList.remove("drop-target"));
            const Mt = se.findIndex((at) => at.key === xe), Dt = se.findIndex((at) => at.key === yo);
            if (Mt >= 0 && Dt >= 0 && Mt !== Dt) {
              const at = se.slice(), Ue = at.splice(Mt, 1)[0];
              at.splice(Dt, 0, Ue), v.value = at, L = yo, B = vt;
            }
          }
        }
      }
      const je = S.find((re) => re.classList.contains("launcher-page-tab"));
      if (je) {
        const re = je.getAttribute("data-page");
        re && re !== ue.activePage && je.classList.add("drop-target");
      } else
        document.querySelectorAll(".launcher-page-tab.drop-target").forEach((re) => re.classList.remove("drop-target"));
    }
    async function Ce(k) {
      if (k.pointerId === ee) {
        ye(), k.type === "pointercancel" ? be() : Me(k), window.removeEventListener("pointermove", Ie), window.removeEventListener("pointerup", Ce), window.removeEventListener("pointercancel", Ce);
        try {
          if (ve) {
            T = Date.now(), w = !1;
            const x = document.elementsFromPoint(k.clientX, k.clientY);
            if (document.querySelectorAll(".launcher-page-tab.drop-target").forEach((W) => W.classList.remove("drop-target")), document.querySelectorAll(".launcher-folder.drop-target").forEach((W) => W.classList.remove("drop-target")), fi() && Ct.activeFolder) {
              if (x.some(
                (se) => se.id === "launcher-folder-dialog" || !!se.closest?.("#launcher-folder-dialog")
              )) {
                const xe = x.find((je) => je.hasAttribute("data-child-folder"))?.getAttribute("data-child-folder") || Ct.activeFolder;
                N ? await Ee.moveLinkTo(N, void 0, xe) : U && await Ee.moveFolderInto(U, xe);
              }
              return;
            }
            const S = x.find((W) => W.classList.contains("launcher-page-tab"));
            if (S) {
              const W = S.getAttribute("data-page");
              if (W) {
                N ? (await Ee.moveLinkTo(N, W, "常用网站"), await Ee.setPage(W)) : U && await Ee.moveFolderToPage(U, W), be();
                return;
              }
            }
            if (N) {
              const W = x.find((se) => se.classList.contains("launcher-folder"));
              if (W) {
                const se = W.getAttribute("data-launcher-folder");
                if (se) {
                  await Ee.moveLinkTo(N, ue.activePage, se), be();
                  return;
                }
              }
            }
            if (v.value) {
              const W = v.value.map((se) => ({
                type: se.type,
                id: se.type === "link" ? String(se.link.id) : void 0,
                groupName: se.type === "folder" ? se.folder.groupName : void 0
              }));
              await Ee.reorderPageItems(ue.activePage, W);
            }
          }
        } catch (x) {
          ke.show({ appName: "常用网站", title: "移动未完成", message: x instanceof Error ? x.message : "请刷新核对，未自动重试。" });
        } finally {
          be();
        }
      }
    }
    function be() {
      ye(), ee = null, N = null, U = null, ve = !1, w = !1, g.value = null, M.value = null, v.value = null, $.visible = !1, $.link = null, $.folder = null, L = "", document.querySelector("#launcher-folder-dialog")?.classList.remove("drop-hover-valid"), Ct.dropHoverValid = !1, window.removeEventListener("pointermove", Ie), window.removeEventListener("pointerup", Ce), window.removeEventListener("pointercancel", Ce);
    }
    Nt(() => {
      Fe.setExternalDragHandler(null), Fe.setExternalDropHandler(null), be(), window.removeEventListener("blur", d), window.removeEventListener("pagehide", d), document.removeEventListener("visibilitychange", d), window.removeEventListener("pointermove", Ie), window.removeEventListener("pointerup", Ce), window.removeEventListener("pointercancel", Ce);
    });
    function Ge(k) {
      const x = ue.pageLabels;
      return x && x[k] ? x[k] : k || "常用网站";
    }
    function et(k, x) {
      const S = String(k.page || "").trim(), W = String(x).trim(), se = ue.pageLabels || {}, xe = !S || S === "常用网站" || S === "默认";
      if (!W || W === "常用网站" || W === "默认") return xe;
      if (xe) return !1;
      if (S === W) return !0;
      const re = se[S] || S, le = se[W] || W;
      return re === le || S === le || re === W;
    }
    function Be(k) {
      const x = ue.groupSizes;
      return x && x[k] === "large" ? "large" : "small";
    }
    function It(k) {
      return k === "large" ? 9 : 4;
    }
    function Ot(k, x) {
      const S = It(x), W = k.length > S ? S - 1 : S;
      return k.slice(0, W);
    }
    const Xt = te(() => {
      const k = ue.activePage || "常用网站", S = ue.links.filter(
        (re) => et(re, k)
      ), W = /* @__PURE__ */ new Map();
      S.forEach((re) => {
        const le = re.group || "常用网站";
        le !== "常用网站" && (W.has(le) || W.set(le, []), W.get(le).push(re));
      });
      const se = /* @__PURE__ */ new Set(), xe = [];
      S.forEach((re) => {
        const le = re.group || "常用网站";
        yi(ue.folders, le) || (le === "常用网站" ? xe.push({ key: `link-${re.id}`, type: "link", link: re }) : se.has(le) || (se.add(le), xe.push({
          key: `folder-${le}`,
          type: "folder",
          folder: {
            groupName: le,
            pageName: k,
            links: W.get(le) || []
          }
        })));
      });
      const je = ue.folders;
      return je && Object.entries(je).forEach(([re, le]) => {
        if (yi(ue.folders, re)) return;
        const Je = le?.page || "常用网站";
        (Je === k || k === "常用网站" && Je === "默认") && !se.has(re) && (se.add(re), xe.push({
          key: `folder-${re}`,
          type: "folder",
          folder: {
            groupName: re,
            pageName: k,
            links: W.get(re) || []
          }
        }));
      }), xe;
    }), mo = te(() => v.value && v.value.length ? v.value : Xt.value), ot = te(() => {
      const k = ue.activePage || "常用网站", x = Ge(k);
      return x === "默认" || k === "常用网站" ? "还没有快捷入口，点击“编辑入口”后添加。" : `“${x}”还是空的，把网站拖到这里。`;
    });
    function Ko(k) {
      v.value = null, g.value = null, M.value = null, Fe.switchPage(k);
    }
    function jo() {
      h.value = !0, b.value = "", Tt(() => {
        E.value?.focus();
      });
    }
    function vo() {
      if (!h.value) return;
      const k = b.value.trim();
      h.value = !1, k && Fe.addPage(k);
    }
    function Vo(k) {
      k.key === "Enter" ? (k.preventDefault(), vo()) : k.key === "Escape" && (h.value = !1);
    }
    function qt(k, x) {
      Fe.openPageMenu(k, x);
    }
    function zo(k) {
      const x = k.target;
      if (!x || x.closest(".launcher-link") || x.closest(".launcher-folder") || x.closest(".launcher-page-tab") || x.closest("button") || x.closest("input"))
        return;
      k.preventDefault();
      const S = ue.activePage || "常用网站";
      ni.openBlankMenu(S, k.clientX, k.clientY);
    }
    function D(k) {
      s.value === "sites" && (!k.shiftKey || ue.pages.length < 2 || (k.preventDefault(), k.deltaY > 0 || k.deltaX > 0 ? Fe.nextPage() : Fe.prevPage()));
    }
    function O(k) {
      k.target.closest(".launcher-page-tab") || k.stopPropagation();
    }
    function K(k) {
      k.button === 0 && (y = k.clientX, C = k.clientY);
    }
    function he(k, x) {
      if (x.preventDefault(), x.stopPropagation(), Xe.isEditingShortcuts) {
        Xe.handleLinkSelection(k);
        return;
      }
      ee || (w = !1), !(Math.hypot(x.clientX - y, x.clientY - C) >= 6 || w || Date.now() - T < 600) && Fe.openLink(k, x);
    }
    function ft(k, x) {
      Fe.openLinkMenu(k, x);
    }
    function kt(k, x) {
      if (ee || (w = !1), w || Date.now() - T < 450) {
        x.preventDefault(), x.stopPropagation();
        return;
      }
      Fe.openFolder(k, x);
    }
    function Bt(k, x, S) {
      Fe.openFolderMenu(k, x, S);
    }
    function Ms(k) {
      Fe.deleteFolder(k);
    }
    function Ds(k, x) {
      const S = Array.from(x.dataTransfer?.types || []);
      if (!S.includes("application/x-newtab-launcher") && !S.includes("application/x-newtab-bookmark") && !S.includes("text/uri-list") && !S.includes("text/plain")) return;
      x.preventDefault(), x.dataTransfer && (x.dataTransfer.dropEffect = "move"), ue.activePage !== k && Ko(k), x.currentTarget?.classList.add("drop-target");
    }
    function As(k) {
      k.currentTarget?.classList.remove("drop-target");
    }
    async function Es(k, x) {
      x.currentTarget?.classList.remove("drop-target");
      let W = "";
      const se = x.dataTransfer?.getData("application/x-newtab-launcher");
      if (se)
        try {
          W = String(JSON.parse(se)?.id || "");
        } catch {
        }
      if (!W && (g.value || window.__activeLauncherLink) && (W = String(window.__activeLauncherLink?.id || g.value || "")), W) {
        x.preventDefault(), x.stopPropagation(), await Ee.moveLinkTo(W, k, "常用网站"), await Ee.setPage(k);
        return;
      }
      const xe = window;
      typeof xe.importDroppedLauncherItem == "function" && (x.preventDefault(), x.stopPropagation(), await xe.importDroppedLauncherItem(x, "常用网站", k));
    }
    function Ps(k) {
      const x = Array.from(k.dataTransfer?.types || []);
      if (!x.includes("application/x-newtab-launcher") && !x.includes("application/x-newtab-bookmark") && !x.includes("text/uri-list") && !x.includes("text/plain")) return;
      k.preventDefault(), k.dataTransfer && (k.dataTransfer.dropEffect = x.includes("application/x-newtab-launcher") ? "move" : "copy"), k.currentTarget?.classList.add("drop-target");
    }
    function Ws(k) {
      const x = k.currentTarget;
      x?.contains(k.relatedTarget) || x?.classList.remove("drop-target");
    }
    async function Rs(k) {
      k.currentTarget?.classList.remove("drop-target");
      let S = "";
      const W = k.dataTransfer?.getData("application/x-newtab-launcher");
      if (W)
        try {
          S = String(JSON.parse(W)?.id || "");
        } catch {
        }
      if (!S && (g.value || window.__activeLauncherLink) && (S = String(window.__activeLauncherLink?.id || g.value || "")), S) {
        k.preventDefault(), k.stopPropagation(), await Ee.moveLinkTo(S, ue.activePage, "常用网站");
        return;
      }
      const se = window;
      if (typeof se.importDroppedLauncherItem == "function") {
        k.preventDefault(), k.stopPropagation(), await se.importDroppedLauncherItem(k, "常用网站", ue.activePage);
        return;
      }
      const xe = k.dataTransfer?.getData("text/plain");
      xe && /^https?:\/\//i.test(xe.trim()) && (k.preventDefault(), k.stopPropagation(), await Ee.addLink({
        title: "",
        url: xe.trim(),
        page: ue.activePage
      }));
    }
    function fi() {
      if (!Ct.isOpen) return !1;
      if (typeof document < "u") {
        const k = document.querySelector("#launcher-folder-dialog");
        return !!(k && k.open);
      }
      return !1;
    }
    function Ns(k, x) {
      x.preventDefault();
    }
    function Os(k) {
      k.preventDefault(), k.dataTransfer && (k.dataTransfer.dropEffect = "move"), k.currentTarget?.classList.add("drop-target");
    }
    function Bs(k) {
      k.currentTarget?.classList.remove("drop-target");
    }
    async function Fs(k, x) {
      x.currentTarget?.classList.remove("drop-target"), x.preventDefault(), x.stopPropagation();
      const W = x.dataTransfer?.getData("application/x-newtab-launcher-folder");
      if (W && W !== k) {
        try {
          await Ee.moveFolderInto(W, k);
        } catch (je) {
          ke.show({ appName: "常用网站", title: "移动未完成", message: je instanceof Error ? je.message : "请刷新后核对。" });
        }
        return;
      }
      let se = "";
      const xe = x.dataTransfer?.getData("application/x-newtab-launcher");
      if (xe)
        try {
          se = String(JSON.parse(xe)?.id || "");
        } catch {
        }
      !se && (g.value || window.__activeLauncherLink) && (se = String(window.__activeLauncherLink?.id || g.value || "")), se && await Ee.moveLinkTo(se, ue.activePage, k);
    }
    return (k, x) => (l(), p(Q, null, [
      i(ue).showSites ? (l(), p("section", {
        key: 0,
        class: "launcher-group launcher-sites size-large",
        onWheel: D
      }, [
        n("header", {
          class: "launcher-group-head launcher-sites-head",
          onPointerdown: x[5] || (x[5] = V(() => {
          }, ["stop"])),
          onContextmenu: O
        }, [
          n("div", {
            class: "sites-view-switch",
            role: "group",
            "aria-label": i(c)("home.sites.switchAria")
          }, [
            n("button", {
              type: "button",
              disabled: a.value,
              "aria-pressed": s.value === "sites",
              onClick: x[0] || (x[0] = (S) => s.value = "sites")
            }, u(i(c)("home.sites.favoriteSites")), 9, hu),
            n("button", {
              type: "button",
              disabled: a.value,
              "aria-pressed": s.value === "bookmarks",
              onClick: x[1] || (x[1] = (S) => s.value = "bookmarks")
            }, u(i(c)("home.sites.bookmarks")), 9, fu)
          ], 8, pu),
          st(n("div", {
            class: "launcher-page-tabs",
            role: "tablist",
            "aria-label": i(c)("home.sites.pagesAria")
          }, [
            (l(!0), p(Q, null, we(i(ue).pages, (S) => (l(), p("button", {
              key: S,
              type: "button",
              class: ce(["launcher-page-tab", { active: S === i(ue).activePage }]),
              "data-page": S,
              role: "tab",
              title: i(c)("home.sites.pageTabTitle", { label: Ge(S) }),
              onPointerdown: x[2] || (x[2] = V(() => {
              }, ["stop"])),
              onClick: V((W) => Ko(S), ["prevent", "stop"]),
              onContextmenu: V((W) => qt(S, W), ["prevent", "stop"]),
              onDragover: (W) => Ds(S, W),
              onDragleave: x[3] || (x[3] = (W) => As(W)),
              onDrop: (W) => Es(S, W)
            }, u(Ge(S)), 43, mu))), 128)),
            h.value ? st((l(), p("input", {
              key: 1,
              ref_key: "pageInputRef",
              ref: E,
              class: "launcher-page-input",
              maxlength: "12",
              placeholder: "例如：游戏区",
              "onUpdate:modelValue": x[4] || (x[4] = (S) => b.value = S),
              onKeydown: Vo,
              onBlur: vo
            }, null, 544)), [
              [fo, b.value]
            ]) : (l(), p("button", {
              key: 0,
              class: "launcher-page-add",
              type: "button",
              title: "添加网站分区，例如游戏区",
              "aria-label": "添加网站分区",
              onClick: jo
            }, " + "))
          ], 8, gu), [
            [Ro, s.value === "sites"]
          ]),
          s.value === "bookmarks" ? (l(), p("div", vu)) : P("", !0),
          n("button", {
            class: "launcher-page-help",
            type: "button",
            title: "使用指南：如何创建文件夹与整理网站",
            "aria-label": "使用指南与技巧",
            onClick: m
          }, " ? ")
        ], 32),
        s.value === "bookmarks" ? (l(), pe(i(t), {
          key: 0,
          "header-target": "#bookmark-board-header",
          onBusy: x[6] || (x[6] = (S) => a.value = S)
        })) : P("", !0),
        st(n("div", {
          class: "launcher-page-panel",
          "data-page": i(ue).activePage,
          hidden: !1,
          role: "tabpanel",
          onContextmenu: zo,
          onDragover: x[12] || (x[12] = (S) => Ps(S)),
          onDragleave: x[13] || (x[13] = (S) => Ws(S)),
          onDrop: x[14] || (x[14] = (S) => Rs(S))
        }, [
          (l(), pe(No, {
            tag: "div",
            class: "launcher-items launcher-site-items",
            key: i(ue).activePage,
            name: g.value || M.value ? "launcher-grid" : ""
          }, {
            default: Et(() => [
              (l(!0), p(Q, null, we(mo.value, (S) => (l(), p(Q, {
                key: S.key
              }, [
                S.type === "link" ? (l(), p("a", {
                  key: S.key,
                  class: ce(["launcher-link", {
                    "is-dragging": g.value === String(S.link.id),
                    "is-wheel-picked": i(Xe).isEditingShortcuts && i(Xe).isLinkInWheel(S.link.url)
                  }]),
                  href: S.link.url,
                  title: S.link.title + (S.link.note ? `
📝 ` + S.link.note : "") + `
🔗 ` + S.link.url,
                  "data-launcher-id": String(S.link.id),
                  target: "_blank",
                  rel: "noreferrer",
                  draggable: "false",
                  onDragstart: x[7] || (x[7] = V(() => {
                  }, ["prevent"])),
                  onPointerdown: (W) => $e(S.link, W),
                  onMousedown: x[8] || (x[8] = (W) => K(W)),
                  onClick: V((W) => he(S.link, W), ["prevent"]),
                  onContextmenu: V((W) => ft(S.link, W), ["prevent"])
                }, [
                  Z(Po, {
                    link: S.link
                  }, null, 8, ["link"])
                ], 42, wu)) : S.type === "folder" ? (l(), p("div", {
                  key: S.key,
                  class: ce(["launcher-folder", [
                    `size-${Be(S.folder.groupName)}`,
                    { "is-dragging": M.value === S.folder.groupName }
                  ]]),
                  title: `${S.folder.groupName}
可拖动调整位置；右键调整收藏夹大小`,
                  role: "button",
                  tabindex: "0",
                  "data-launcher-folder": String(S.folder.groupName),
                  draggable: "true",
                  onPointerdown: (W) => j(S.folder.groupName, S.folder, W),
                  onDragstart: (W) => Ns(S.folder.groupName, W),
                  onDragover: x[10] || (x[10] = (W) => Os(W)),
                  onDragleave: x[11] || (x[11] = (W) => Bs(W)),
                  onDrop: (W) => Fs(S.folder.groupName, W),
                  onClick: (W) => kt(S.folder.groupName, W),
                  onContextmenu: V((W) => Bt(S.folder.groupName, S.folder.pageName, W), ["prevent"])
                }, [
                  Z(Po, {
                    folder: { title: S.folder.groupName, preview: S.folder.links, count: S.folder.links.length },
                    size: Be(S.folder.groupName)
                  }, {
                    default: Et(() => [
                      n("button", {
                        class: "launcher-folder-del-btn",
                        type: "button",
                        title: `删除文件夹「${S.folder.groupName}」`,
                        "aria-label": "删除文件夹",
                        onPointerdown: x[9] || (x[9] = V(() => {
                        }, ["stop"])),
                        onClick: V((W) => Ms(S.folder.groupName), ["stop", "prevent"])
                      }, " ✕ ", 40, ku)
                    ]),
                    _: 2
                  }, 1032, ["folder", "size"]),
                  n("span", _u, u(S.folder.links.length), 1)
                ], 42, bu)) : P("", !0)
              ], 64))), 128)),
              mo.value.length ? P("", !0) : (l(), p("p", Cu, u(ot.value), 1))
            ]),
            _: 1
          }, 8, ["name"]))
        ], 40, yu), [
          [Ro, s.value === "sites"]
        ])
      ], 32)) : P("", !0),
      i(ue).hasTodo || i(ue).hasBili ? (l(), p("div", xu, [
        i(ue).hasTodo ? (l(), pe(uu, { key: 0 })) : i(ue).hasBili ? (l(), p("div", Lu)) : P("", !0)
      ])) : P("", !0),
      (l(), pe(bt, { to: "body" }, [
        $.visible ? (l(), p("div", {
          key: 0,
          class: ce(["launcher-drag-ghost", [
            $.type === "folder" ? `folder-ghost size-${$.folder?.size}` : "link-ghost"
          ]]),
          style: Se({
            left: `${$.x}px`,
            top: `${$.y}px`
          })
        }, [
          $.type === "folder" && $.folder ? (l(), p(Q, { key: 0 }, [
            n("div", $u, [
              (l(!0), p(Q, null, we(Ot($.folder.links, $.folder.size), (S, W) => (l(), pe(wn, {
                key: S.id || W,
                link: S,
                mini: !0
              }, null, 8, ["link"]))), 128))
            ]),
            n("span", Su, u($.folder.groupName), 1)
          ], 64)) : $.link ? (l(), p(Q, { key: 1 }, [
            Z(wn, {
              link: $.link
            }, null, 8, ["link"]),
            n("span", Tu, u($.link.title), 1)
          ], 64)) : P("", !0)
        ], 6)) : P("", !0)
      ])),
      Z(i(o), {
        open: r.value,
        onClose: f
      }, null, 8, ["open"])
    ], 64));
  }
}), Ss = /* @__PURE__ */ Re(Iu, [["__scopeId", "data-v-142d9c79"]]), Ho = Le({
  showWeather: !0,
  showSites: !0,
  showBili: !0,
  showTodo: !0,
  showBookmarkPanel: !0
}), pn = Object.keys(Ho);
let on = !1, Kn = 0, Lo, jn;
function Bi(e) {
  for (const t of pn)
    Object.prototype.hasOwnProperty.call(e, t) && (Ho[t] = e[t] !== !1);
}
function Mu() {
  const e = Ho;
  Fe.setPrefs(e.showSites, e.showTodo, !e.showTodo && e.showBili), document.body.classList.toggle("hide-weather", !e.showWeather), document.body.classList.toggle("hide-sites", !e.showSites), document.body.classList.toggle("hide-bili", !e.showBili), document.body.classList.toggle("hide-todo", !e.showTodo), document.body.classList.toggle("hide-bookmarks", !e.showBookmarkPanel), e.showBookmarkPanel || bn.close();
}
const Fi = {
  start() {
    if (on) return;
    on = !0;
    const e = ++Kn;
    jn = We(() => pn.map((o) => Ho[o]), Mu, { immediate: !0, flush: "sync" });
    const t = globalThis.chrome;
    Lo = (o, s) => {
      if (s !== "local") return;
      const a = {};
      for (const r of pn) o[r] && (a[r] = o[r].newValue);
      Bi(a);
    }, t?.storage?.onChanged?.addListener(Lo), t?.storage?.local && t.storage.local.get(pn).then((o) => {
      on && Kn === e && Bi(o || {});
    }).catch((o) => console.warn("[HomePrefs] 读取首页设置失败", o));
  },
  stop() {
    on = !1, Kn++, jn?.(), jn = void 0, Lo && globalThis.chrome?.storage?.onChanged?.removeListener(Lo), Lo = void 0;
  }
}, Du = {
  id: "launcher",
  class: "launcher",
  "aria-label": "快捷入口"
}, Au = { class: "launcher-inner" }, Eu = { class: "launcher-overview" }, Pu = ["title"], Wu = { class: "card-head" }, Ru = { id: "wx-title" }, Nu = { id: "weather-body" }, Ou = { class: "launcher-center" }, Bu = {
  class: "hero-clock",
  id: "hero-clock"
}, Fu = {
  class: "launcher-widget launcher-task-threads launcher-music-card",
  "data-home-module": "taskThreads"
}, Hu = { class: "card-head" }, Ku = ["title"], ju = {
  id: "task-thread-home",
  class: "task-thread-home home-music-body"
}, Vu = /* @__PURE__ */ fe({
  __name: "AppLauncher",
  setup(e) {
    qe(() => {
      gn.initWallpaper();
    });
    function t() {
      Oe.handleToolClick("music");
    }
    return (o, s) => (l(), p("section", Du, [
      s[4] || (s[4] = n("div", {
        id: "hero-background-media",
        class: "hero-background-media",
        "aria-hidden": "true"
      }, null, -1)),
      n("div", Au, [
        n("div", Eu, [
          st(n("section", {
            class: "launcher-widget launcher-weather",
            "data-home-module": "weather",
            title: i(c)("weather.widgetSwitchTip")
          }, [
            n("header", Wu, [
              s[1] || (s[1] = n("span", {
                class: "bar",
                style: { background: "linear-gradient(180deg,#38bdf8,#818cf8)" }
              }, null, -1)),
              n("h2", Ru, u(i(c)("weather.widgetTitle")), 1)
            ]),
            n("div", Nu, [
              Z(bs)
            ])
          ], 8, Pu), [
            [Ro, i(Ho).showWeather]
          ]),
          n("div", Ou, [
            n("div", Bu, [
              Z(sd),
              Z(ks)
            ]),
            n("form", {
              id: "search",
              class: "search",
              onSubmit: s[0] || (s[0] = V(() => {
              }, ["prevent"]))
            }, [
              Z(Ui)
            ], 32)
          ]),
          n("section", Fu, [
            n("header", Hu, [
              s[2] || (s[2] = n("span", { class: "bar music-purple" }, null, -1)),
              n("h2", null, u(i(c)("home.music.player")), 1),
              s[3] || (s[3] = n("span", { class: "grow" }, null, -1)),
              n("button", {
                id: "home-music-open-panel",
                class: "home-music-head-btn",
                type: "button",
                title: i(c)("home.music.openNeteaseTip"),
                onClick: t
              }, u(i(c)("home.music.openNetease")), 9, Ku)
            ]),
            n("div", ju, [
              Z(_s)
            ])
          ])
        ]),
        n("div", {
          id: "launcher-groups",
          class: ce(["launcher-groups", { "has-sites": i(ue).showSites, "has-todoist": i(ue).hasTodo, "has-bili": i(ue).hasBili, "has-media": i(ue).hasTodo || i(ue).hasBili }])
        }, [
          Z(Ss)
        ], 2)
      ]),
      s[5] || (s[5] = n("input", {
        id: "background-input",
        type: "file",
        accept: "image/*,video/mp4,video/webm,.gif,.mp4,.webm",
        multiple: "",
        hidden: ""
      }, null, -1))
    ]));
  }
}), ho = Le(/* @__PURE__ */ new Set()), Kt = Le({}), nt = Le({});
function Vn(e) {
  const t = it(e);
  if (!t?.lifecycle.canUnmount || t.lifecycle.canUnmount()) return { ok: !0 };
  const o = t.lifecycle.unmountBlockedMessage || "模块操作尚未结束，不能退出或重载。";
  return ke.show({ appName: t.title, title: "操作进行中", message: o, showActions: !1 }), { ok: !1, error: o };
}
const Ke = {
  // 检查应用是否处于运行显示状态（驱动 Dock 上的小圆点：关闭即熄灭，不保留 macOS 风格后台悬浮绿点）
  isRunning(e) {
    return this.isVisible(e);
  },
  // 检查应用当前是否在屏幕上可见（窗口是否打开）
  isVisible(e) {
    const t = it(e);
    return t ? t.lifecycle.isVisible() : Tn(e) ? !!ba[e] : ka(e);
  },
  // 标记应用启动
  markRunning(e) {
    ho.add(e), (e in nt || it(e)) && (nt[e] = !0);
  },
  // 获取组件当前的 render key
  getRenderKey(e) {
    return Kt[e] || 0;
  },
  // 打开 / 显示应用窗口
  openApp(e) {
    const t = it(e);
    if (t) {
      Oe.open(e), t.lifecycle.isVisible() && this.markRunning(e);
      return;
    }
    if (this.markRunning(e), Tn(e)) {
      bi.open(e);
      return;
    }
    Oe.open(e);
  },
  // 隐藏/关闭窗口：立即退出可见运行态并熄灭 Dock 指示绿点
  hideApp(e) {
    if (ho.delete(e), it(e)) {
      Oe.close(e);
      return;
    }
    if (Tn(e)) {
      bi.close(e);
      return;
    }
    Oe.close(e);
  },
  // 真正的关闭（Quit / 彻底从内存与 DOM 中卸载销毁，熄灭小圆点）
  async quitApp(e) {
    if (it(e)) {
      const a = Vn(e);
      if (!a.ok) return a;
      const r = it(e)?.lifecycle.beforeQuit;
      if (r) {
        const d = Ht(e);
        try {
          await r();
        } catch {
          const b = "后台停止未确认，窗口保留；未自动重试，请检查后台状态。";
          return ke.show({ appName: it(e).title, title: "未退出", message: b, showActions: !1 }), { ok: !1, error: b };
        }
        if (Ht(e) !== d) return { ok: !1, error: "窗口已有后续操作，未卸载。" };
        const h = Vn(e);
        if (!h.ok) return h;
      }
      const m = Oe.close(e), f = Ht(e);
      return ho.delete(e), nt[e] = !1, Lt.removeActiveTool(e), await m, await Tt(), Ht(e) === f ? { ok: !0 } : { ok: !1, error: "模块已有后续操作，退出状态已变化。" };
    }
    this.hideApp(e), ho.delete(e), Lt.removeActiveTool(e), e in nt && (nt[e] = !1);
    const t = wa;
    t.activeId === e && (t.activeId = "");
    const o = t.openOrder.indexOf(e);
    o >= 0 && t.openOrder.splice(o, 1);
    const s = t.activeTools.indexOf(e);
    s >= 0 && t.activeTools.splice(s, 1), Oe.render();
  },
  // 重新加载（Reload / 单应用热重启，重新初始化组件）
  async reloadApp(e) {
    const t = it(e);
    if (t) {
      if (t.lifecycle.canOpen && !t.lifecycle.canOpen()) return { ok: !1, error: "模块当前不能打开，未重载窗口。" };
      const o = Vn(e);
      if (!o.ok) return o;
      const s = Oe.close(e), a = Ht(e);
      return await s, Ht(e) !== a ? { ok: !1, error: "模块已有后续操作，重载已取消。" } : (nt[e] = !1, await Tt(), Ht(e) !== a ? { ok: !1, error: "模块已有后续操作，未重新打开。" } : (Kt[e] = (Kt[e] || 0) + 1, Oe.open(e), t.lifecycle.isVisible() ? (this.markRunning(e), { ok: !0 }) : { ok: !1, error: "模块当前不能打开，未重新显示窗口。" }));
    }
    this.hideApp(e), e in nt ? (nt[e] = !1, await Tt(), Kt[e] = (Kt[e] || 0) + 1, nt[e] = !0) : Kt[e] = (Kt[e] || 0) + 1, await Tt(), this.openApp(e);
  }
}, $o = /* @__PURE__ */ fe({
  __name: "DockCardModuleHost",
  props: {
    id: {}
  },
  setup(e) {
    const o = it(e.id);
    if (!o || o.presentation !== "card") throw new Error("Unknown registered workspace card");
    const s = o;
    s.mountPolicy === "workspace-ready" && Ke.markRunning(s.id), We(s.lifecycle.isVisible, (h) => {
      h && Ke.markRunning(s.id);
    }, { immediate: !0, flush: "sync" });
    const a = te(() => !!nt[s.id]);
    function r() {
      try {
        s.lifecycle.hide();
      } catch {
      }
      (yt.activeId === s.id || yt.activeId === s.rootId) && (yt.activeId = null), Ke.hideApp(s.id), ns(yt.activeId);
    }
    function m() {
      Ke.reloadApp(s.id);
    }
    function f() {
      typeof window < "u" && window.location.reload();
    }
    const d = X({
      loader: s.loadView,
      onError(h, b, E, g) {
        g <= 2 ? b() : E();
      },
      errorComponent: fe({
        setup: () => () => s.lifecycle.isVisible() ? Ye("section", { class: "card wide card-fullscreen", role: "alert" }, [
          Ye("h2", s.title),
          Ye("p", "工作区切片加载受阻（可能因插件重载或切片更新）。可点击「重新加载模块」，或返回首页。"),
          Ye("div", { style: "display: flex; gap: 10px; margin-top: 14px;" }, [
            Ye("button", {
              type: "button",
              style: "padding: 6px 14px; border-radius: 999px; border: 1px solid var(--border); background: var(--primary, #3b82f6); color: #fff; cursor: pointer; font-size: 12px; font-weight: 500;",
              onClick: f
            }, "⟳ 刷新标签页 (加载最新版)"),
            Ye("button", {
              type: "button",
              style: "padding: 6px 14px; border-radius: 999px; border: 1px solid var(--border); background: var(--surface); color: var(--text); cursor: pointer; font-size: 12px;",
              onClick: m
            }, "↻ 重新加载模块"),
            Ye("button", {
              type: "button",
              style: "padding: 6px 14px; border-radius: 999px; border: 1px solid var(--border); background: var(--surface); color: var(--text); cursor: pointer; font-size: 12px;",
              onClick: r
            }, "返回首页")
          ])
        ]) : null
      })
    });
    return Yt(() => {
      r(), ho.delete(s.id), delete nt[s.id];
    }), (h, b) => a.value ? (l(), pe(Yi(i(d)), {
      key: i(Ke).getRenderKey(i(s).id)
    })) : P("", !0);
  }
}), zu = { class: "logicweaver-workspaces-layer" }, Gu = {
  key: 0,
  id: "daily-section",
  class: "wrap"
}, Uu = { id: "vue-todoist-root" }, Yu = { id: "vue-bili-favorites-root" }, Xu = { id: "vue-aihot-root" }, qu = ["hidden"], Ju = /* @__PURE__ */ fe({
  __name: "AppWorkspaces",
  setup(e) {
    const t = z(!!yt.activeId);
    return qe(() => {
      t.value || (typeof window < "u" && "requestIdleCallback" in window ? window.requestIdleCallback(() => {
        t.value = !0;
      }, { timeout: 80 }) : setTimeout(() => {
        t.value = !0;
      }, 40));
    }), (o, s) => (l(), p("div", zu, [
      t.value ? (l(), p("main", Gu, [
        n("div", Uu, [
          Z($o, { id: "todoist" })
        ]),
        n("div", Yu, [
          Z($o, { id: "daily-bilibili" })
        ]),
        n("div", Xu, [
          Z($o, { id: "daily-aihot" })
        ]),
        n("div", {
          id: "vue-multica-root",
          hidden: i(yt).activeId !== "multica"
        }, [
          Z($o, { id: "multica" })
        ], 8, qu),
        Z($o, { id: "card-github" })
      ])) : P("", !0)
    ]));
  }
}), Zu = /* @__PURE__ */ Re(Ju, [["__scopeId", "data-v-0799b753"]]), Qu = ["aria-label"], ep = { class: "dock-menu-head" }, tp = { class: "dock-menu-title" }, op = ["src", "alt"], np = {
  key: 1,
  class: "dock-menu-emoji"
}, ip = { class: "dock-menu-text" }, sp = { class: "dock-menu-text" }, ap = { class: "dock-menu-text" }, rp = /* @__PURE__ */ fe({
  __name: "DockContextMenu",
  props: {
    target: {}
  },
  emits: ["close", "action"],
  setup(e, { emit: t }) {
    const o = e, s = t, a = te(() => !o.target || o.target.type !== "tool" ? !1 : Ke.isRunning(o.target.id)), r = te(() => !o.target || o.target.type !== "tool" ? !1 : Ke.isVisible(o.target.id)), { menuRef: m, style: f } = di({
      visible: () => !!o.target,
      anchor: () => o.target || { x: 0, y: 0 },
      placement: ao.position === "top" ? "below" : "above",
      align: "center",
      gap: 12,
      dismiss: () => s("close")
    });
    function d() {
      o.target && (Ke.openApp(o.target.id), s("close"));
    }
    function h() {
      o.target && (Ke.hideApp(o.target.id), s("close"));
    }
    async function b() {
      o.target && (await Ke.reloadApp(o.target.id), s("close"));
    }
    async function E() {
      if (!o.target) return;
      const v = o.target;
      if ((await Ke.quitApp(v.id))?.ok === !1) {
        s("close");
        return;
      }
      ke.show({
        appName: v.title,
        title: c("dock.quitDone"),
        subtitle: c("dock.quitSubtitle"),
        icon: v.icon || "assets/logo.png",
        duration: 2800
      }), s("close");
    }
    async function g() {
      if (!o.target) return;
      const v = o.target, w = Oo.uninstall(v.id);
      s("close"), await w || ke.show({
        appName: v.title,
        title: "入口停用未确认",
        subtitle: Oo.state.errorMessage || "请打开模块管理核对当前启用状态",
        icon: v.icon || "assets/logo.png",
        duration: 4e3
      });
    }
    function M() {
      if (!o.target) return;
      const w = {
        "daily-bilibili": "https://www.bilibili.com",
        "card-github": "https://github.com",
        "daily-aihot": "https://news.ycombinator.com"
      }[o.target.id] || "https://www.bilibili.com";
      window.open(w, "_blank"), s("close");
    }
    return (v, w) => (l(), pe(bt, { to: "body" }, [
      e.target ? (l(), p("div", {
        key: 0,
        ref_key: "menuRef",
        ref: m,
        role: "group",
        "aria-label": `${e.target.title}操作`,
        class: "dock-context-menu",
        style: Se(i(f)),
        onClick: w[1] || (w[1] = V(() => {
        }, ["stop"])),
        onContextmenu: w[2] || (w[2] = V(() => {
        }, ["prevent"]))
      }, [
        n("div", ep, [
          n("div", tp, [
            e.target.icon ? (l(), p("img", {
              key: 0,
              class: "dock-menu-icon",
              src: e.target.icon,
              alt: e.target.title
            }, null, 8, op)) : e.target.emoji ? (l(), p("span", np, u(e.target.emoji), 1)) : P("", !0),
            n("strong", null, u(e.target.title), 1)
          ]),
          e.target.type === "tool" ? (l(), p("span", {
            key: 0,
            class: ce(["dock-status-tag", { "is-running": a.value }])
          }, [
            w[3] || (w[3] = n("span", { class: "dock-status-dot" }, null, -1)),
            tt(" " + u(a.value ? i(c)("dock.menu.running") : i(c)("dock.menu.notStarted")), 1)
          ], 2)) : P("", !0)
        ]),
        w[12] || (w[12] = n("div", { class: "dock-menu-divider" }, null, -1)),
        e.target.type === "tool" ? (l(), p(Q, { key: 0 }, [
          r.value ? (l(), p("button", {
            key: 1,
            type: "button",
            class: "dock-menu-item",
            onClick: h
          }, [
            w[5] || (w[5] = n("span", { class: "dock-menu-symbol" }, "−", -1)),
            n("span", null, u(i(c)("dock.menu.hideWindow")), 1)
          ])) : (l(), p("button", {
            key: 0,
            type: "button",
            class: "dock-menu-item",
            onClick: d
          }, [
            w[4] || (w[4] = n("span", { class: "dock-menu-symbol" }, "↗", -1)),
            n("span", null, u(i(c)("dock.menu.openWindow")), 1)
          ])),
          n("button", {
            type: "button",
            class: "dock-menu-item",
            onClick: b
          }, [
            w[6] || (w[6] = n("span", { class: "dock-menu-symbol" }, "⟲", -1)),
            n("div", ip, [
              n("span", null, u(i(c)("dock.menu.reloadApp")), 1),
              n("small", null, u(i(c)("dock.menu.reloadSub")), 1)
            ])
          ]),
          w[9] || (w[9] = n("div", { class: "dock-menu-divider" }, null, -1)),
          n("button", {
            type: "button",
            class: "dock-menu-item",
            onClick: g
          }, [
            w[7] || (w[7] = n("span", { class: "dock-menu-symbol" }, "📌", -1)),
            n("div", sp, [
              n("span", null, u(i(c)("dock.menu.removeFromDock")), 1),
              n("small", null, u(i(c)("dock.menu.removeSub")), 1)
            ])
          ]),
          n("button", {
            type: "button",
            class: "dock-menu-item item-danger",
            onClick: E
          }, [
            w[8] || (w[8] = n("span", { class: "dock-menu-symbol" }, "✕", -1)),
            n("div", ap, [
              n("span", null, u(i(c)("dock.menu.quitApp")), 1),
              n("small", null, u(i(c)("dock.menu.quitSub")), 1)
            ])
          ])
        ], 64)) : e.target.type === "card" ? (l(), p("button", {
          key: 1,
          type: "button",
          class: "dock-menu-item",
          onClick: M
        }, [
          w[10] || (w[10] = n("span", { class: "dock-menu-symbol" }, "↗", -1)),
          n("span", null, u(i(c)("dock.menu.openOfficial")), 1)
        ])) : (l(), p("button", {
          key: 2,
          type: "button",
          class: "dock-menu-item",
          onClick: w[0] || (w[0] = (T) => s("close"))
        }, [...w[11] || (w[11] = [
          n("span", { class: "dock-menu-symbol" }, "🏠", -1),
          n("span", null, "返回常用主页", -1)
        ])]))
      ], 44, Qu)) : P("", !0)
    ]));
  }
}), lp = /* @__PURE__ */ Re(rp, [["__scopeId", "data-v-1db4d5bf"]]), cp = { class: "mac-dock-shelf" }, dp = ["data-dock-target", "title", "onPointerdown", "onClick", "onContextmenu"], up = ["src", "alt"], pp = {
  key: 0,
  class: "mac-dock-dot",
  "aria-hidden": "true"
}, hp = ["title"], fp = ["alt"], gp = ["data-dock-tool", "title", "onPointerdown", "onClick", "onContextmenu"], mp = ["src", "alt"], vp = {
  key: 1,
  class: "mac-dock-emoji",
  "aria-hidden": "true"
}, yp = {
  key: 2,
  class: "mac-dock-dot",
  "aria-hidden": "true"
}, wp = {
  key: 3,
  class: "mac-dock-badge"
}, bp = ["title"], kp = ["src"], _p = {
  key: 1,
  class: "mac-dock-emoji"
}, Cp = /* @__PURE__ */ fe({
  __name: "MacDock",
  setup(e) {
    const t = te(() => ao), o = z(null), s = te(() => Object.fromEntries(ao.tools.map((R) => {
      const Y = it(R.id)?.badgeCount?.() || 0;
      return [R.id, Number.isFinite(Y) ? Math.max(0, Math.floor(Y)) : 0];
    })));
    function a(R) {
      R.stopPropagation(), o.value = null, E(R.currentTarget), Oo.open();
    }
    function r(R, Y) {
      Y.stopPropagation(), o.value = null, E(Y.currentTarget), Lt.triggerItem("target", R);
    }
    function m(R, Y) {
      const U = Y.currentTarget.getBoundingClientRect(), ve = ao.position, $e = ve === "left" || ve === "right";
      o.value = {
        type: "card",
        id: R.id,
        title: R.title,
        icon: R.icon,
        x: $e ? ve === "left" ? U.right + 8 : U.left - 8 : U.left + U.width / 2,
        y: $e ? U.top + U.height / 2 : ve === "top" ? U.bottom + 8 : U.top
      };
    }
    function f(R) {
      R.stopPropagation(), o.value = null, E(R.currentTarget), Lt.triggerItem("home", "home-launcher");
    }
    function d(R, Y) {
      Y.stopPropagation(), o.value = null, E(Y.currentTarget), it(R) || Ke.markRunning(R), Lt.triggerItem("tool", R);
    }
    function h(R, Y) {
      const U = Y.currentTarget.getBoundingClientRect(), ve = ao.position, $e = ve === "left" || ve === "right";
      o.value = {
        type: "tool",
        id: R.id,
        title: R.title,
        icon: R.icon,
        emoji: R.emoji,
        x: $e ? ve === "left" ? U.right + 8 : U.left - 8 : U.left + U.width / 2,
        y: $e ? U.top + U.height / 2 : ve === "top" ? U.bottom + 8 : U.top
      };
    }
    const b = /* @__PURE__ */ new Map();
    function E(R) {
      if (!R || (b.get(R)?.cancel(), window.matchMedia("(prefers-reduced-motion: reduce)").matches)) return;
      const Y = R.animate([
        { translate: "0 0", offset: 0 },
        { translate: "0 -8px", offset: 0.35 },
        { translate: "0 0", offset: 0.65 },
        { translate: "0 -2px", offset: 0.85 },
        { translate: "0 0", offset: 1 }
      ], { duration: 350, easing: "ease" });
      b.set(R, Y);
      const N = () => {
        b.get(R) === Y && b.delete(R);
      };
      Y.onfinish = N, Y.oncancel = N;
    }
    const g = z(null), M = Le({
      visible: !1,
      x: 0,
      y: 0,
      width: 40,
      height: 40,
      item: null,
      type: "tool"
    }), v = z(null), w = z(null), T = te(() => v.value || t.value.cards), y = te(() => w.value || t.value.tools);
    let C = "", L = 0, B = !1, H = 0;
    function G(R, Y, N) {
      if (N.button !== 0 || N.target.closest(".mac-dock-market-btn")) return;
      const $e = N.currentTarget.getBoundingClientRect();
      B = !1, g.value = {
        type: R,
        id: Y.id,
        item: Y,
        startX: N.clientX,
        startY: N.clientY,
        initialLeft: $e.left,
        initialTop: $e.top,
        width: $e.width,
        height: $e.height
      }, window.addEventListener("pointermove", A), window.addEventListener("pointerup", _), window.addEventListener("pointercancel", _);
    }
    function A(R) {
      if (!g.value) return;
      const Y = R.clientX - g.value.startX, N = R.clientY - g.value.startY, U = Math.hypot(Y, N);
      if (!B && U > 5 && (B = !0, M.visible = !0, M.item = g.value.item, M.type = g.value.type, M.width = g.value.width, M.height = g.value.height, g.value.type === "card" ? v.value = [...t.value.cards] : w.value = [...t.value.tools]), !B) return;
      M.x = R.clientX - M.width / 2, M.y = R.clientY - M.height / 2;
      const $e = document.elementsFromPoint(R.clientX, R.clientY).find(
        (Me) => Me.classList.contains("mac-dock-item") && !Me.classList.contains("mac-dock-market-btn")
      );
      if (!$e) return;
      const j = $e.getAttribute("data-dock-target"), I = $e.getAttribute("data-dock-tool"), F = g.value.type, ye = g.value.id, Ie = Date.now();
      if (F === "card" && j && j !== ye && j !== "home-launcher") {
        const Me = $e.getBoundingClientRect(), Ce = Me.left + Me.width / 2;
        if (Math.abs(R.clientX - Ce) > Me.width * 0.55 || j === C && Ie - L < 180) return;
        const be = [...v.value || t.value.cards], Ge = be.findIndex((Be) => Be.id === ye), et = be.findIndex((Be) => Be.id === j);
        if (Ge >= 0 && et >= 0 && Ge !== et) {
          const Be = be.splice(Ge, 1)[0];
          be.splice(et, 0, Be), v.value = be, C = j, L = Ie;
        }
      } else if (F === "tool" && I && I !== ye) {
        const Me = $e.getBoundingClientRect(), Ce = Me.left + Me.width / 2;
        if (Math.abs(R.clientX - Ce) > Me.width * 0.55 || I === C && Ie - L < 180) return;
        const be = [...w.value || t.value.tools], Ge = be.findIndex((Be) => Be.id === ye), et = be.findIndex((Be) => Be.id === I);
        if (Ge >= 0 && et >= 0 && Ge !== et) {
          const Be = be.splice(Ge, 1)[0];
          be.splice(et, 0, Be), w.value = be, C = I, L = Ie;
        }
      }
    }
    function _() {
      window.removeEventListener("pointermove", A), window.removeEventListener("pointerup", _), window.removeEventListener("pointercancel", _), B && g.value && (H = Date.now() + 250, g.value.type === "card" && v.value ? Lt.reorderCards(v.value.map((R) => R.id)) : g.value.type === "tool" && w.value && Lt.reorderTools(w.value.map((R) => R.id))), M.visible = !1, M.item = null, v.value = null, w.value = null, g.value = null, B = !1, C = "";
    }
    function $(R, Y) {
      Date.now() < H || r(R, Y);
    }
    function ee(R, Y) {
      Date.now() < H || d(R, Y);
    }
    return Yt(() => {
      for (const R of b.values()) R.cancel();
      b.clear(), window.removeEventListener("pointermove", A), window.removeEventListener("pointerup", _), window.removeEventListener("pointercancel", _);
    }), (R, Y) => (l(), p(Q, null, [
      n("div", cp, [
        Z(No, {
          tag: "div",
          class: "mac-dock-group mac-dock-cards-group",
          name: "dock-item-motion"
        }, {
          default: Et(() => [
            (l(!0), p(Q, null, we(T.value, (N) => (l(), p("button", {
              key: N.id,
              class: ce(["mac-dock-item", {
                "is-active": t.value.activeTargetId === N.id,
                "is-drag-origin": g.value && g.value.id === N.id
              }]),
              type: "button",
              "data-dock-target": N.id,
              title: N.title,
              onPointerdown: (U) => G("card", N, U),
              onClick: V((U) => $(N.id, U), ["stop"]),
              onContextmenu: V((U) => m(N, U), ["prevent"])
            }, [
              n("img", {
                class: "mac-dock-icon",
                src: N.icon,
                alt: N.title
              }, null, 8, up),
              t.value.activeTargetId === N.id ? (l(), p("span", pp)) : P("", !0)
            ], 42, dp))), 128))
          ]),
          _: 1
        }),
        Y[4] || (Y[4] = n("div", {
          class: "mac-dock-divider",
          "aria-hidden": "true"
        }, null, -1)),
        n("button", {
          class: "mac-dock-item",
          type: "button",
          "data-dock-target": "home-launcher",
          title: i(c)("dock.home"),
          onClick: Y[0] || (Y[0] = V((N) => f(N), ["stop"]))
        }, [
          n("img", {
            class: "mac-dock-icon",
            src: "assets/nav-home.svg",
            alt: i(c)("dock.home")
          }, null, 8, fp)
        ], 8, hp),
        Y[5] || (Y[5] = n("div", {
          class: "mac-dock-divider mac-dock-divider-dark",
          "aria-hidden": "true"
        }, null, -1)),
        Z(No, {
          tag: "div",
          class: "mac-dock-group mac-dock-tools-group",
          name: "dock-item-motion"
        }, {
          default: Et(() => [
            (l(!0), p(Q, null, we(y.value, (N) => (l(), p("button", {
              key: N.id,
              class: ce(["mac-dock-item", {
                "is-active": i(Ke).isRunning(N.id),
                "is-drag-origin": g.value && g.value.id === N.id
              }]),
              type: "button",
              "data-dock-tool": N.id,
              title: N.title,
              onPointerdown: (U) => G("tool", N, U),
              onClick: V((U) => ee(N.id, U), ["stop"]),
              onContextmenu: V((U) => h(N, U), ["prevent"])
            }, [
              N.icon ? (l(), p("img", {
                key: 0,
                class: "mac-dock-icon",
                src: N.icon,
                alt: N.title
              }, null, 8, mp)) : N.emoji ? (l(), p("span", vp, u(N.emoji), 1)) : P("", !0),
              i(Ke).isRunning(N.id) ? (l(), p("span", yp)) : P("", !0),
              s.value[N.id] > 0 ? (l(), p("span", wp, u(s.value[N.id] > 99 ? "99+" : s.value[N.id]), 1)) : P("", !0)
            ], 42, gp))), 128))
          ]),
          _: 1
        }),
        n("button", {
          class: ce(["mac-dock-item mac-dock-market-btn", { "is-active": i(Oo).state.isOpen }]),
          type: "button",
          title: i(c)("dock.market"),
          onClick: Y[1] || (Y[1] = V((N) => a(N), ["stop"]))
        }, [...Y[3] || (Y[3] = [
          n("span", {
            class: "mac-dock-market-icon",
            "aria-hidden": "true"
          }, "🧩", -1)
        ])], 10, bp)
      ]),
      (l(), pe(bt, { to: "body" }, [
        M.visible && M.item ? (l(), p("div", {
          key: 0,
          class: "mac-dock-drag-ghost",
          style: Se({
            width: M.width + "px",
            height: M.height + "px",
            transform: "translate3d(" + M.x + "px," + M.y + "px, 0)"
          }),
          "aria-hidden": "true"
        }, [
          M.item.icon ? (l(), p("img", {
            key: 0,
            class: "mac-dock-icon",
            src: M.item.icon,
            alt: ""
          }, null, 8, kp)) : M.item.emoji ? (l(), p("span", _p, u(M.item.emoji), 1)) : P("", !0)
        ], 4)) : P("", !0)
      ])),
      Z(lp, {
        target: o.value,
        onClose: Y[2] || (Y[2] = (N) => o.value = null)
      }, null, 8, ["target"])
    ], 64));
  }
}), Ts = /* @__PURE__ */ Re(Cp, [["__scopeId", "data-v-ede6cdc8"]]), xp = {
  id: "win-toast-container",
  class: "win-toast-container",
  "aria-live": "polite",
  "aria-relevant": "additions"
}, Lp = ["data-toast-fingerprint", "onMouseenter", "onMouseleave"], $p = { class: "win-toast-head" }, Sp = ["src"], Tp = { class: "win-toast-app" }, Ip = { class: "win-toast-time" }, Mp = ["title", "aria-label", "onClick"], Dp = ["onClick"], Ap = { class: "win-toast-title" }, Ep = {
  key: 0,
  class: "win-toast-subtitle"
}, Pp = {
  key: 1,
  class: "win-toast-snippet"
}, Wp = {
  key: 0,
  class: "win-toast-actions"
}, Rp = ["onClick"], Np = ["onClick"], Op = /* @__PURE__ */ fe({
  __name: "NotificationHost",
  setup(e) {
    const t = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Map(), a = z({}), r = z({});
    let m = null;
    function f(v) {
      const w = t.get(v);
      w !== void 0 && clearTimeout(w), t.delete(v);
    }
    function d(v, w = v.duration) {
      f(v.id), s.set(v.id, w), o.set(v.id, Date.now()), r.value[v.id] = !1, a.value[v.id] = Math.max(0, Math.min(100, w / v.duration * 100)), Tt(() => requestAnimationFrame(() => {
        a.value[v.id] = 0;
      })), t.set(v.id, window.setTimeout(() => {
        t.delete(v.id), ke.close(v.id);
      }, w));
    }
    function h(v) {
      f(v.id);
      const w = Date.now() - (o.get(v.id) || Date.now()), T = Math.max(0, (s.get(v.id) ?? v.duration) - w);
      s.set(v.id, T), r.value[v.id] = !0, a.value[v.id] = Math.max(0, Math.min(100, T / v.duration * 100));
    }
    function b(v) {
      d(v, Math.max(1500, s.get(v.id) ?? v.duration));
    }
    function E(v) {
      f(v.id), ke.close(v.id);
    }
    function g(v) {
      if (Wt.markRead(v.historyId || v.id), E(v), !v.onClick) {
        v.target && Wt.openTarget(v.target);
        return;
      }
      try {
        Promise.resolve(v.onClick()).catch((w) => console.warn("Notification action failed", w));
      } catch (w) {
        console.warn("Notification action failed", w);
      }
    }
    function M(v) {
      const w = Math.max(500, s.get(v.id) ?? v.duration);
      return {
        width: `${a.value[v.id] ?? 100}%`,
        transition: r.value[v.id] ? "none" : `width ${w}ms linear`
      };
    }
    return qe(() => {
      m = new MutationObserver(() => {
        const w = new Set(Go.map((T) => T.id));
        for (const T of Go)
          !T.closing && !t.has(T.id) && !s.has(T.id) && d(T);
        for (const T of s.keys())
          w.has(T) || (f(T), s.delete(T), o.delete(T), delete a.value[T], delete r.value[T]);
      });
      const v = document.getElementById("win-toast-container");
      v && m.observe(v, { childList: !0 });
      for (const w of Go) d(w);
    }), Yt(() => {
      m?.disconnect(), m = null;
      for (const v of t.values()) clearTimeout(v);
      t.clear();
    }), (v, w) => (l(), pe(bt, { to: "body" }, [
      n("div", xp, [
        Z(No, { name: "win-toast" }, {
          default: Et(() => [
            (l(!0), p(Q, null, we(i(Go), (T) => (l(), p("article", {
              key: T.id,
              class: ce(["win-toast-card", [T.appType, { closing: T.closing }]]),
              "data-toast-fingerprint": T.fingerprint,
              onMouseenter: (y) => h(T),
              onMouseleave: (y) => b(T)
            }, [
              n("header", $p, [
                n("img", {
                  src: T.icon,
                  class: "win-toast-icon",
                  alt: ""
                }, null, 8, Sp),
                n("span", Tp, u(T.appName), 1),
                n("span", Ip, u(i(c)("notifications.justNow")), 1),
                n("button", {
                  type: "button",
                  class: "win-toast-close",
                  title: i(c)("common.close"),
                  "aria-label": i(c)("common.close"),
                  onClick: (y) => E(T)
                }, "✕", 8, Mp)
              ]),
              n("button", {
                type: "button",
                class: "win-toast-body win-toast-body-button",
                onClick: (y) => g(T)
              }, [
                n("span", Ap, u(T.title), 1),
                T.subtitle ? (l(), p("span", Ep, u(T.subtitle), 1)) : P("", !0),
                T.message ? (l(), p("span", Pp, u(T.message), 1)) : P("", !0)
              ], 8, Dp),
              T.showActions && T.actionLabel ? (l(), p("footer", Wp, [
                n("button", {
                  type: "button",
                  class: "win-toast-btn primary",
                  onClick: (y) => g(T)
                }, u(T.actionLabel), 9, Rp),
                n("button", {
                  type: "button",
                  class: "win-toast-btn",
                  onClick: (y) => E(T)
                }, u(i(c)("common.close")), 9, Np)
              ])) : P("", !0),
              n("div", {
                class: "win-toast-progress",
                style: Se(M(T))
              }, null, 4)
            ], 42, Lp))), 128))
          ]),
          _: 1
        })
      ])
    ]));
  }
}), Is = /* @__PURE__ */ Re(Op, [["__scopeId", "data-v-d1eb92c2"]]), Bp = ["id"], Fp = /* @__PURE__ */ fe({
  __name: "DockModuleHost",
  setup(e) {
    const t = es().filter((o) => o.presentation !== "card").map((o) => {
      We(o.lifecycle.isVisible, (a) => {
        a && Ke.markRunning(o.id);
      }, { immediate: !0, flush: "sync" });
      const s = fe({
        setup: () => () => Ye("section", { class: "dock-module-load-error", role: "alert" }, [
          Ye("div", { style: "display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;" }, [
            Ye("strong", { style: "font-size: 13px; color: var(--heading);" }, `${o.title} 加载受阻`),
            Ye("span", { style: "font-size: 11px; padding: 2px 6px; border-radius: 4px; background: var(--surface); color: var(--muted); border: 1px solid var(--border);" }, "代码可能已更新")
          ]),
          Ye("p", { style: "font-size: 12px; line-height: 1.5; color: var(--muted); margin: 0 0 12px 0;" }, "模块分块代码未就绪。若刚才在终端编写或重新构建了扩展，点击「刷新标签页」即可立即同步最新切片。"),
          Ye("div", { style: "display: flex; gap: 8px;" }, [
            Ye("button", {
              type: "button",
              style: "padding: 5px 12px; border-radius: 6px; border: 1px solid var(--border); background: var(--primary, #3b82f6); color: #fff; cursor: pointer; font-size: 12px; font-weight: 500;",
              onClick: () => {
                typeof window < "u" && window.location.reload();
              }
            }, "⟳ 刷新标签页"),
            Ye("button", {
              type: "button",
              style: "padding: 5px 10px; border-radius: 6px; border: 1px solid var(--border); background: var(--surface); color: var(--text); cursor: pointer; font-size: 12px;",
              onClick: () => {
                Ke.reloadApp(o.id);
              }
            }, "↻ 重试"),
            Ye("button", {
              type: "button",
              style: "padding: 5px 10px; border-radius: 6px; border: 1px solid var(--border); background: var(--surface); color: var(--text); cursor: pointer; font-size: 12px;",
              onClick: () => {
                Ke.hideApp(o.id);
              }
            }, "隐藏")
          ])
        ])
      });
      return {
        definition: o,
        mounted: te(() => !!nt[o.id]),
        view: X({
          loader: o.loadView,
          onError(a, r, m, f) {
            f <= 2 ? r() : m();
          },
          errorComponent: s
        })
      };
    });
    return Yt(() => {
      for (const { definition: o } of t)
        Oe.close(o.id), ho.delete(o.id), nt[o.id] = !1;
    }), (o, s) => (l(!0), p(Q, null, we(i(t), (a) => st((l(), p("div", {
      id: a.definition.rootId,
      key: a.definition.id
    }, [
      a.mounted.value ? (l(), pe(Yi(a.view), {
        key: i(Ke).getRenderKey(a.definition.id)
      })) : P("", !0)
    ], 8, Bp)), [
      [Ro, a.definition.lifecycle.isVisible()]
    ])), 128));
  }
}), Hp = /* @__PURE__ */ Re(Fp, [["__scopeId", "data-v-fc77be0a"]]);
function Ze(e, t) {
  const o = z(!1);
  return We(
    e,
    (s) => {
      s && (o.value = !0);
    },
    { immediate: !0, flush: "sync" }
  ), Rt(o);
}
const Kp = ["onKeydown"], jp = { class: "fo-up-preview-head" }, Vp = ["src"], zp = { class: "fo-up-preview-meta" }, Gp = { class: "fo-up-preview-name-row" }, Up = ["href"], Yp = ["disabled"], Xp = { class: "fo-up-preview-sign" }, qp = { class: "fo-up-preview-videos" }, Jp = {
  key: 0,
  class: "fo-up-preview-loading"
}, Zp = {
  key: 1,
  class: "fo-up-preview-empty"
}, Qp = {
  key: 2,
  class: "fo-up-preview-empty"
}, eh = ["href", "title", "onClick"], th = ["src"], oh = {
  key: 0,
  class: "fo-bili-duration"
}, nh = { class: "fo-up-preview-video-info" }, ih = ["href", "title", "onClick"], sh = { class: "fo-up-preview-video-meta" }, ah = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2394a3b8'%3E%3Cpath d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/%3E%3C/svg%3E", rh = /* @__PURE__ */ fe({
  __name: "BiliUpPreview",
  setup(e) {
    const t = z(!1);
    function o() {
      if (!me.submitting) {
        if (!me.followed) {
          t.value = !1, un.toggleFollow();
          return;
        }
        if (!t.value) {
          t.value = !0;
          return;
        }
        t.value = !1, un.toggleFollow();
      }
    }
    function s() {
      t.value = !1, un.close();
    }
    function a(r, m) {
      r.ctrlKey || r.metaKey || (r.preventDefault(), r.stopPropagation(), m.bvid ? (sn.openVideo({
        bvid: m.bvid,
        title: m.title,
        cover: m.cover,
        author: me.name,
        authorFace: me.face,
        mid: me.mid,
        url: m.url
      }), s()) : m.url && m.url !== "#" && window.open(m.url, "_blank"));
    }
    return (r, m) => i(me).open ? (l(), p("div", {
      key: 0,
      class: "fo-up-preview-backdrop",
      onPointerdown: V(s, ["self"])
    }, [
      n("aside", {
        class: "fo-up-preview-popover",
        style: Se({ left: `${i(me).left}px`, top: `${i(me).top}px` }),
        onKeydown: Wo(V(s, ["stop", "prevent"]), ["esc"])
      }, [
        n("div", jp, [
          n("img", {
            class: "fo-up-preview-avatar",
            src: i(me).face || ah,
            alt: "",
            referrerpolicy: "no-referrer"
          }, null, 8, Vp),
          n("div", zp, [
            n("div", Gp, [
              n("a", {
                class: "fo-up-preview-name",
                href: `https://space.bilibili.com/${i(me).mid}`,
                target: "_blank",
                rel: "noreferrer"
              }, u(i(me).name), 9, Up),
              n("button", {
                type: "button",
                class: ce([
                  i(me).followed ? "fo-up-preview-unfollow" : "fo-up-preview-follow",
                  { "is-armed": t.value }
                ]),
                disabled: i(me).submitting,
                onClick: o
              }, u(i(me).submitting ? "处理中…" : t.value ? "确定取消？" : i(me).followed ? "取消关注" : "＋ 关注"), 11, Yp)
            ]),
            n("p", Xp, u(i(me).sign || "暂无个人简介"), 1)
          ]),
          n("button", {
            type: "button",
            class: "fo-up-preview-close",
            "aria-label": "关闭预览",
            onClick: s
          }, "✕")
        ]),
        m[1] || (m[1] = n("div", { class: "fo-up-preview-title-tag" }, "近期投稿视频（最新 2~3 个）", -1)),
        n("div", qp, [
          i(me).loading ? (l(), p("div", Jp, [...m[0] || (m[0] = [
            n("i", null, null, -1),
            n("span", null, "正在读取近期投稿…", -1)
          ])])) : i(me).error ? (l(), p("p", Zp, u(i(me).error), 1)) : i(me).videos.length ? (l(!0), p(Q, { key: 3 }, we(i(me).videos, (f) => (l(), p("article", {
            key: f.bvid,
            class: "fo-up-preview-video"
          }, [
            n("a", {
              class: "fo-up-preview-thumb",
              href: f.url,
              title: `就地播放「${f.title}」（Ctrl+点击在网页打开）`,
              onClick: (d) => a(d, f)
            }, [
              n("img", {
                src: f.cover,
                alt: "",
                loading: "lazy",
                referrerpolicy: "no-referrer"
              }, null, 8, th),
              f.duration ? (l(), p("span", oh, u(f.duration), 1)) : P("", !0)
            ], 8, eh),
            n("div", nh, [
              n("a", {
                class: "fo-up-preview-video-title",
                href: f.url,
                title: `就地播放「${f.title}」（Ctrl+点击在网页打开）`,
                onClick: (d) => a(d, f)
              }, u(f.title), 9, ih),
              n("div", sh, [
                n("span", null, "▣ " + u(f.playCount), 1),
                n("span", null, u(f.published), 1)
              ])
            ])
          ]))), 128)) : (l(), p("p", Qp, "该 UP 主近期暂无视频动态"))
        ])
      ], 44, Kp)
    ], 32)) : P("", !0);
  }
}), lh = /* @__PURE__ */ Re(rh, [["__scopeId", "data-v-bf6dab49"]]), ch = { class: "logicweaver-overlays-layer" }, dh = { id: "vue-notification-root" }, uh = {
  id: "bili-profile-menu",
  class: "bili-profile-menu",
  hidden: ""
}, ph = { id: "vue-bili-message-panel-root" }, hh = { id: "vue-notification-center-root" }, fh = { id: "vue-tab-manager-root" }, gh = { id: "vue-bookmark-menu-root" }, mh = { id: "vue-bookmark-panel-root" }, vh = { id: "vue-launcher-dialogs-root" }, yh = { id: "vue-launcher-folder-root" }, wh = { id: "vue-launcher-menus-root" }, bh = { id: "vue-settings-dialog-root" }, kh = { id: "vue-clock-settings-root" }, _h = { id: "vue-bili-theater-root" }, Ch = { id: "vue-bili-mini-player-root" }, xh = { id: "vue-ai-dialog-root" }, Lh = { id: "vue-aihot-viewer-root" }, $h = { id: "vue-nav-wheel-root" }, Sh = { id: "vue-github-detail-root" }, Th = { id: "vue-bili-subtitle-modal-root" }, Ih = { id: "vue-bili-video-task-modal-root" }, Mh = { id: "vue-github-task-modal-root" }, Dh = { id: "vue-web-task-modal-root" }, Ah = { id: "vue-firecrawl-modal-root" }, Eh = { id: "vue-floating-image-viewer-root" }, Ph = { id: "vue-command-palette-root" }, Wh = /* @__PURE__ */ fe({
  __name: "AppOverlays",
  setup(e) {
    const t = Ze(() => Oo.state.isOpen), o = Ze(() => Xi.isOpen), s = Ze(() => dn.isOpen), a = Ze(() => Gt.state.isOpen), r = Ze(() => Sa.open), m = Ze(() => Ao.state.isOpen), f = Ze(() => Gs.isOpen), d = Ze(() => xa.isOpen), h = Ze(() => pi.state.isOpen), b = Ze(() => ha.isOpen), E = Ze(() => Ve.isOpen), g = Ze(() => ti.isOpen);
    let M;
    qe(() => {
      M = hl();
    }), Nt(() => {
      M?.();
    });
    const v = Ze(() => ai.state.isOpen), w = Ze(() => Ct.isOpen), T = Ze(() => wo.editDialog.isOpen || wo.linkMove.isOpen || wo.folderMove.isOpen || wo.groupMerge.isOpen || wo.folderDelete.isOpen), y = X(() => import("./ProfileMenu-DFlFtzWy.js")), C = X(() => import("./BookmarkNoteMenu-DXrAJcZj.js")), L = X(() => import("./BookmarkPanel-DQd7Nooc.js")), B = X(() => import("./ClockSettingsMenu-qSU0PoiU.js")), H = X(() => import("./NotificationCenter-H_UQnH4v.js")), G = X(() => import("./TabManagerPanel-BBxZEsJi.js")), A = X(() => import("./LauncherDialogs-GAZGCZsm.js")), _ = X(() => import("./LauncherFolderDialog-DqhyM460.js")), $ = X(() => import("./LauncherMenus-BFJT6zs3.js")), ee = X(() => import("./SettingsDialog-Bfuz8wlC.js")), R = X(() => import("./BiliMiniPlayer-BLbmEKkE.js")), Y = X(() => import("./BiliTheaterDialog-ss_rZXix.js")), N = X(() => import("./BiliMessagePanel-BdHT7DZE.js")), U = X(() => import("./AiDialog-D1JzcdCH.js")), ve = X(() => import("./AihotViewer-FGTHeo4G.js")), $e = X(() => import("./NavWheelOverlay-uaCzj24x.js")), j = X(() => import("./GitHubRepoDetailDrawer-Bde2SS0i.js")), I = X(() => import("./InPageSideDrawer-DioRLBEi.js")), F = X(() => import("./BiliSubtitleModal-zEbSVkUx.js")), ye = X(() => import("./BiliVideoTaskModal-C4Vf5BtU.js")), Ie = X(() => import("./GitHubTaskModal-DEilx8O0.js")), Me = X(() => import("./WebSiteTaskModal-Fn9lud3E.js")), Ce = X(() => import("./FirecrawlModal-CMJSNhfm.js")), be = X(() => import("./FloatingImageViewer-CO2YmNVd.js")), Ge = X(() => import("./CommandPalette-RI4RIGzr.js")), et = X(() => import("./AppPromptModal-Cd7woz49.js")), Be = X(async () => {
      const [It, Ot] = await Promise.all([
        import("./PluginMarketDialog-BQ40KNvy.js"),
        import("./plugin-market-B6zN10fA.js")
      ]);
      return ta("logicweaver-market-styles", Ot.default), It.default;
    });
    return (It, Ot) => (l(), p("div", ch, [
      n("div", dh, [
        Z(Is)
      ]),
      n("div", uh, [
        Z(i(y))
      ]),
      n("div", ph, [
        i(d) ? (l(), pe(i(N), { key: 0 })) : P("", !0)
      ]),
      n("div", hh, [
        i(o) ? (l(), pe(i(H), { key: 0 })) : P("", !0)
      ]),
      n("div", fh, [
        i(s) ? (l(), pe(i(G), { key: 0 })) : P("", !0)
      ]),
      n("div", gh, [
        i(v) ? (l(), pe(i(C), { key: 0 })) : P("", !0)
      ]),
      n("div", mh, [
        Z(i(L))
      ]),
      n("div", vh, [
        i(T) ? (l(), pe(i(A), { key: 0 })) : P("", !0)
      ]),
      n("div", yh, [
        i(w) ? (l(), pe(i(_), { key: 0 })) : P("", !0)
      ]),
      n("div", wh, [
        Z(i($))
      ]),
      n("div", bh, [
        Z(i(ee))
      ]),
      n("div", kh, [
        i(a) ? (l(), pe(i(B), { key: 0 })) : P("", !0)
      ]),
      n("div", _h, [
        i(m) ? (l(), pe(i(Y), { key: 0 })) : P("", !0)
      ]),
      n("div", Ch, [
        i(f) ? (l(), pe(i(R), { key: 0 })) : P("", !0)
      ]),
      n("div", xh, [
        i(h) ? (l(), pe(i(U), { key: 0 })) : P("", !0)
      ]),
      n("div", Lh, [
        i(r) ? (l(), pe(i(ve), { key: 0 })) : P("", !0)
      ]),
      n("div", $h, [
        Z(i($e))
      ]),
      Z(Hp),
      n("div", Sh, [
        i(b) ? (l(), pe(i(j), { key: 0 })) : P("", !0)
      ]),
      n("div", Th, [
        Z(i(F))
      ]),
      n("div", Ih, [
        Z(i(ye))
      ]),
      n("div", Mh, [
        Z(i(Ie))
      ]),
      n("div", Dh, [
        Z(i(Me))
      ]),
      n("div", Ah, [
        Z(i(Ce))
      ]),
      n("div", Eh, [
        Z(i(be))
      ]),
      n("div", Ph, [
        i(E) ? (l(), pe(i(Ge), { key: 0 })) : P("", !0)
      ]),
      i(g) ? (l(), pe(i(I), { key: 0 })) : P("", !0),
      Z(lh),
      Z(i(et)),
      i(t) ? (l(), pe(i(Be), { key: 1 })) : P("", !0)
    ]));
  }
});
let zn = !1;
function Rh(e = 1800) {
  if (zn || typeof window > "u") return;
  const t = () => {
    if (zn) return;
    zn = !0;
    const o = es();
    for (const s of o)
      if (typeof s.loadView == "function")
        try {
          s.loadView().catch(() => {
          });
        } catch {
        }
  };
  "requestIdleCallback" in window ? setTimeout(() => {
    window.requestIdleCallback(t, { timeout: 4e3 });
  }, e) : setTimeout(t, e);
}
const Nh = ["data-active-workspace"], Oh = /* @__PURE__ */ fe({
  __name: "App",
  setup(e, { expose: t }) {
    const o = typeof document > "u" ? "" : document.title, s = {
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
      multica: {
        title: "AI 工作区",
        icon: "assets/nav-multica.png",
        iconType: "image/png"
      },
      "daily-aihot": {
        title: "AI Hot · 今日热榜",
        icon: "assets/nav-aihot.svg",
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
    let a = "", r, m;
    function f(E) {
      E.target === "github" && E.githubRule && He.setSearchRule(E.githubRule), qs(E.target, E.keyword), E.target === "netease" ? Oe.open("music") : zt.enter(E.target === "github" ? "card-github" : "daily-bilibili");
    }
    function d(E, g = "image/svg+xml") {
      if (typeof document > "u") return;
      const M = typeof chrome < "u" && chrome.runtime?.getURL ? chrome.runtime.getURL(E) : E;
      if (a === M) return;
      a = M;
      const v = document.querySelectorAll("link[rel*='icon']");
      if (v.length > 0)
        v.forEach((w) => {
          w.type = g, w.href = M;
        });
      else {
        const w = document.createElement("link");
        w.rel = "icon", w.type = g, w.href = M, document.head.appendChild(w);
      }
    }
    function h() {
      if (typeof document > "u") return;
      const E = s[Uo.value] || s.home;
      if (d(E.icon, E.iconType), oe.playing && oe.title) {
        const g = oe.artist ? ` - ${oe.artist}` : "";
        document.title = `▶ ${oe.title}${g}`;
        return;
      }
      if (ko.playing && ko.title) {
        document.title = `▶ ${ko.title} · 电台`;
        return;
      }
      document.title = E.title;
    }
    We(
      [
        () => Uo.value,
        () => oe.playing,
        () => oe.title,
        () => oe.artist,
        () => ko.playing,
        () => ko.title
      ],
      () => {
        h();
      },
      { immediate: !0 }
    );
    const b = te(() => Uo.value === "home" ? "" : Uo.value);
    return We(() => yt.activeId, ns, { immediate: !0, flush: "sync" }), qe(() => {
      typeof chrome < "u" && chrome.runtime?.onMessage && (m = Xs(f)), typeof document < "u" && (document.body.dataset.spa = "1");
      try {
        ei.bindGlobalListener(), Xe.start(), Fi.start(), Xn.init().catch((E) => console.warn("[Launcher] 初始化失败", E)), Rh(), r = setTimeout(() => {
          import("./webdav-auto-sync-Cj01sA6L.js").then(async (E) => {
            const g = await E.runWebDavAutoSync();
            g.status === "error" || g.status === "conflict" ? ke.show({ appType: "sync", appName: "WebDAV 同步", title: "自动同步已暂停", message: g.message || "请检查同步设置。", level: "warning", history: !0, target: { type: "module", moduleId: "sync" }, actionLabel: "查看设置", showActions: !0, duration: 12e3, onClick: () => Fo.open("sync") }) : g.status === "downloaded" && ke.show({ appType: "sync", appName: "WebDAV 同步", title: "已恢复云端更新", message: "请刷新已打开的页面以查看同步后的配置。", level: "info", showActions: !1, duration: 6e3 });
          }).catch(() => {
          });
        }, 8e3), typeof chrome < "u" && chrome?.runtime?.sendMessage && setTimeout(() => {
          try {
            chrome.runtime.sendMessage({ type: "cleanupNativeTabs" }, () => {
              chrome.runtime?.lastError;
            });
          } catch {
          }
        }, 400);
      } catch (E) {
        console.warn("[App] Runtime start error:", E);
      }
    }), Nt(() => {
      m?.(), r && clearTimeout(r), Xe.stop(), Xn.stop(), Fi.stop(), document.body.classList.remove("has-card-fullscreen"), typeof document < "u" && o && (document.title = o);
    }), t({
      activeWorkspaceId: b,
      windowManagerController: Oe
    }), (E, g) => (l(), p("div", {
      id: "logicweaver-spa-root",
      class: "logicweaver-spa-root",
      "data-active-workspace": b.value || ""
    }, [
      Z(xl),
      Z(Vu),
      Z(Zu),
      n("nav", {
        id: "mac-dock",
        class: ce(["mac-dock", "dock-" + i(ao).position]),
        "aria-label": "快捷应用栏"
      }, [
        Z(Ts)
      ], 2),
      Z(Wh)
    ], 8, Nh));
  }
}), Bh = /* @__PURE__ */ Re(Oh, [["__scopeId", "data-v-b390e6d5"]]), Fh = {
  class: "endfield-stage",
  "aria-hidden": "true"
}, Hh = {
  class: "rhinelab-stage",
  "aria-hidden": "true"
}, Kh = { class: "rhine-scaler" }, jh = { class: "rhine-center-group" }, Vh = { class: "rhine-auth-status" }, zh = { class: "rhine-auth-text" }, Gh = ["hidden"], Uh = { class: "rhine-cinema-caption" }, Yh = /* @__PURE__ */ fe({
  __name: "IntroAnimation",
  setup(e) {
    const t = z(window.innerHeight), o = z(window.innerWidth), s = z(!1), a = z(!1), r = z(10), m = z(1), f = z(0), d = /* @__PURE__ */ new Set();
    let h = 0, b = () => {
    };
    const E = te(() => `${String(Math.round(lt.renderedProgress)).padStart(2, "0")}%`), g = te(() => {
      const A = lt.renderedProgress / 100 * t.value + 10;
      return `${Math.min(A, Math.max(0, t.value - 102)).toFixed(1)}px`;
    }), M = te(() => lt.renderedProgress >= 75 ? "START PROCESSING..." : lt.renderedProgress >= 35 ? "REQUEST RECEIVED" : "ID CONFIRMED : JOYCE MOORE"), v = te(() => lt.finished ? "身份验证通过 · 欢迎进入终端" : lt.status ? `身份信息确认 · ${lt.status.replace(/^.*?\/\s*/, "")}` : "身份信息确认：JOYCE MOORE"), w = te(() => String(Math.max(0.35, Math.min(o.value / 1920, t.value / 1080))));
    function T(A, _) {
      const $ = window.setTimeout(() => {
        d.delete($), A();
      }, _);
      d.add($);
    }
    function y() {
      window.dispatchEvent(new CustomEvent("logicweaver:intro-complete"));
    }
    function C(A) {
      if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
        y();
        return;
      }
      const _ = A ? 180 : 260, $ = A ? 200 : 280, ee = performance.now(), R = (Y) => {
        const N = Y - ee, U = Math.min(1, N / _), ve = 1 - Math.pow(1 - U, 3);
        if (r.value = 10 + ve * Math.max(0, o.value - 10), N > _ && (m.value = Math.max(0, 1 - (N - _) / $)), N >= _ + $) {
          y();
          return;
        }
        h = requestAnimationFrame(R);
      };
      T(() => {
        h = requestAnimationFrame(R);
      }, A ? 60 : 120);
    }
    function L(A) {
      A || (s.value = !0), T(() => {
        a.value = !0, f.value = 6, m.value = 0, T(y, 380);
      }, A ? 40 : 420);
    }
    function B(A) {
      lt.style === "rhinelab" ? L(A) : C(A);
    }
    function H() {
      o.value = window.innerWidth, t.value = window.innerHeight;
    }
    function G(A) {
      lt.finished || (A.key === "Enter" || A.key === " " || A.key === "Escape") && (A.preventDefault(), wt.skip("KEYBOARD SKIP"));
    }
    return qe(() => {
      document.documentElement.dataset.startupStyle = lt.style, document.documentElement.style.setProperty("--rhine-scale", w.value), window.addEventListener("resize", H, { passive: !0 }), window.addEventListener("keydown", G, !0), b = Ka(B), as();
    }), Yt(() => {
      b(), window.removeEventListener("resize", H), window.removeEventListener("keydown", G, !0), cancelAnimationFrame(h);
      for (const A of d) clearTimeout(A);
      d.clear();
    }), (A, _) => (l(), p("div", {
      class: "intro-vue-content",
      style: Se({ "--rhine-scale": w.value, opacity: m.value, filter: `blur(${f.value}px)` })
    }, [
      n("div", Fh, [
        _[2] || (_[2] = n("div", { class: "endfield-loader-texture" }, null, -1)),
        _[3] || (_[3] = n("div", { class: "endfield-loader-rail" }, null, -1)),
        n("div", {
          class: "endfield-loader-fill",
          style: Se({ height: `${i(lt).renderedProgress}%` })
        }, null, 4),
        n("div", {
          class: "endfield-loader-meter",
          style: Se({ top: g.value })
        }, [
          _[1] || (_[1] = n("span", { class: "endfield-loader-tick" }, null, -1)),
          n("b", null, u(E.value), 1),
          n("small", null, u(i(lt).status), 1)
        ], 4),
        _[4] || (_[4] = So('<section class="endfield-loader-brand"><span class="endfield-loader-kicker">DEEPSEEK HARNESS</span><strong>END</strong><strong>FIELD</strong><span class="endfield-loader-detail"><i class="endfield-loader-chevron"></i><span>EDGE INTELLIGENCE THEME</span><small>TERRA RESEARCH COMMISSION / BOOT SEQUENCE</small><span class="endfield-loader-squares"><i class="on"></i><i class="on"></i><i class="on"></i><i></i><i></i><i></i><i class="on"></i><i class="on"></i><i></i><i></i><i></i><i></i></span></span><em>OVER THE FRONTIER / INTO THE FRONT</em></section>', 1)),
        n("div", {
          class: "endfield-loader-wipe",
          style: Se({ width: `${r.value}px`, opacity: r.value > 10 ? 1 : 0 })
        }, null, 4)
      ]),
      n("div", Hh, [
        _[12] || (_[12] = So('<div class="rhine-background"><svg viewBox="0 0 1920 1080" preserveAspectRatio="none"><g fill="none" stroke="#ffffff" stroke-width="2.5"><path class="rhine-drift-path1" d="M-210 705C-45 705 182 704 247 567C337 377 99 306 4 435S27 680 169 631C309 584 227 314 279 111S568-113 568-113"></path><path class="rhine-drift-path2" d="M1560-80C1374 114 1671 168 1601 323S1371 367 1431 480S1692 666 1559 787S1329 886 1498 1130"></path><circle class="rhine-drift-circle" cx="1450" cy="648" r="346"></circle><circle class="rhine-drift-circle2" cx="1450" cy="648" r="348"></circle></g></svg></div>', 1)),
        n("div", Kh, [
          _[10] || (_[10] = So('<header class="rhine-brand"><h1>RHINE LAB</h1><div class="rhine-brand-sub">SYNTHESIZE INFORMATION</div><p class="rhine-brand-os"><span class="rhine-brand-analysis"><span style="left:2px;">A</span><span style="left:28px;">N</span><span style="left:55px;">A</span><span style="left:81px;">L</span><span style="left:103px;">Y</span><span style="left:129px;">S</span><span style="left:154px;">I</span><span style="left:166px;">S</span></span><b>OS</b></p></header>', 1)),
          n("button", {
            class: "rhine-skip",
            type: "button",
            title: "点击进入系统 (或按 Enter)",
            onClick: _[0] || (_[0] = ($) => i(wt).skip("ENTER SYSTEM"))
          }, [..._[5] || (_[5] = [
            tt("ENTER SYSTEM ", -1),
            n("span", null, "↗", -1)
          ])]),
          n("div", jh, [
            _[8] || (_[8] = n("div", { class: "rhine-logo-box" }, [
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
            n("div", Vh, [
              _[6] || (_[6] = n("span", { class: "rhine-auth-dot" }, "·", -1)),
              n("span", zh, u(M.value), 1),
              _[7] || (_[7] = n("i", {
                class: "rhine-cursor",
                "aria-hidden": "true"
              }, null, -1))
            ])
          ]),
          n("div", {
            class: ce(["rhine-scan", { active: s.value }]),
            hidden: !s.value
          }, [..._[9] || (_[9] = [
            So('<svg viewBox="0 0 1920 1080" aria-hidden="true"><g fill="none" stroke="#080a08" stroke-linecap="round"><circle class="rhine-scan-circle ring-outer" cx="960" cy="540" r="280" stroke-width="2.5"></circle><circle class="rhine-scan-circle ring-white" cx="960" cy="540" r="260" stroke="#fff" stroke-width="3.5"></circle><circle class="rhine-scan-circle ring-inner" cx="960" cy="540" r="220" stroke-width="2"></circle><circle class="rhine-orbit-dot dot-1" cx="960" cy="260" r="8" fill="#ed821b" stroke="none"></circle><circle class="rhine-orbit-dot dot-2" cx="960" cy="820" r="8" fill="#ed821b" stroke="none"></circle><circle class="rhine-scan-core" cx="960" cy="540" r="6" fill="#080a08" stroke="none"></circle></g></svg><span class="rhine-scan-label">PERMISSION AUTHORIZED</span>', 2)
          ])], 10, Gh),
          n("div", Uh, u(v.value), 1),
          _[11] || (_[11] = n("div", { class: "rhine-powered" }, [
            tt("POWERED BY "),
            n("b", null, "RHINE LAB"),
            n("i")
          ], -1))
        ]),
        n("div", {
          class: ce(["rhine-white", { flash: a.value }]),
          "aria-hidden": "true"
        }, null, 2)
      ])
    ], 4));
  }
}), Xh = /* @__PURE__ */ fe({
  __name: "ProfileMenu",
  setup(e) {
    function t(o) {
      Bo.trigger(o);
    }
    return (o, s) => (l(), p(Q, null, [
      n("button", {
        type: "button",
        "data-action": "messages",
        onClick: s[0] || (s[0] = V((a) => t("messages"), ["stop"]))
      }, u(i(c)("profile.menu.notifications")), 1),
      n("button", {
        type: "button",
        "data-action": "tabs",
        onClick: s[1] || (s[1] = V((a) => t("tabs"), ["stop"]))
      }, u(i(c)("profile.menu.tabs")), 1),
      n("button", {
        type: "button",
        "data-action": "refresh",
        onClick: s[2] || (s[2] = V((a) => t("refresh"), ["stop"]))
      }, u(i(c)("profile.menu.refreshBili")), 1),
      n("button", {
        type: "button",
        "data-action": "switch",
        onClick: s[3] || (s[3] = V((a) => t("switch"), ["stop"]))
      }, u(i(c)("profile.menu.switchUser")), 1),
      n("button", {
        type: "button",
        "data-action": "web",
        onClick: s[4] || (s[4] = V((a) => t("web"), ["stop"]))
      }, u(i(c)("profile.menu.biliCenter")), 1)
    ], 64));
  }
}), qh = /* @__PURE__ */ fe({
  __name: "WorkspaceLaunchers",
  setup(e) {
    function t(o) {
      ui.openWorkspace(o, !0);
    }
    return (o, s) => (l(), p(Q, null, [
      n("button", {
        id: "ai-top-open",
        type: "button",
        onClick: s[0] || (s[0] = (a) => t("ai"))
      }, "AI 助手"),
      n("button", {
        id: "todoist-top-open",
        type: "button",
        onClick: s[1] || (s[1] = (a) => t("todoist"))
      }, "Todoist"),
      n("button", {
        id: "stickers-top-open",
        type: "button",
        onClick: s[2] || (s[2] = (a) => t("stickers"))
      }, "表情包"),
      n("button", {
        id: "calcom-top-open",
        type: "button",
        onClick: s[3] || (s[3] = (a) => t("calcom"))
      }, "预约"),
      n("button", {
        id: "wallpaper-top-open",
        type: "button",
        onClick: s[4] || (s[4] = (a) => t("wallpaper"))
      }, "壁纸库"),
      hn(o.$slots, "default")
    ], 64));
  }
}), Jh = {
  key: 0,
  "aria-label": "AI 分析任务"
}, Zh = { role: "status" }, Qh = ["disabled"], ef = ["disabled"], tf = /* @__PURE__ */ fe({
  __name: "GitHubStatus",
  setup(e) {
    return (t, o) => i(rt).message || i(rt).busy ? (l(), p("section", Jh, [
      n("p", Zh, u(i(rt).repo ? `原任务仓库：${i(rt).repo}。 ` : "") + u(i(rt).message), 1),
      i(rt).busy ? (l(), p("button", {
        key: 0,
        type: "button",
        onClick: o[0] || (o[0] = (s) => i(He).stopAiAnalysis())
      }, "停止后续分析 / 中断等待")) : P("", !0),
      i(rt).uncertain ? (l(), p(Q, { key: 1 }, [
        o[5] || (o[5] = n("p", null, "AI 结果未确认，已阻止本页再次提交。请到供应商核对请求和计费；本页记录在整页关闭或重载后会丢失。", -1)),
        i(rt).unlockConfirmation ? (l(), p(Q, { key: 1 }, [
          o[4] || (o[4] = n("p", null, "扩展不能验证供应商任务；确认只解除本页限制，不代表成功，也不会重发请求。", -1)),
          n("button", {
            type: "button",
            disabled: i(rt).busy,
            onClick: o[2] || (o[2] = (s) => i(He).acknowledgeAiChecked())
          }, "确认解除本页限制", 8, ef),
          n("button", {
            type: "button",
            onClick: o[3] || (o[3] = (s) => i(rt).unlockConfirmation = !1)
          }, "保持限制")
        ], 64)) : (l(), p("button", {
          key: 0,
          type: "button",
          disabled: i(rt).busy,
          onClick: o[1] || (o[1] = (s) => i(rt).unlockConfirmation = !0)
        }, "我已核对供应商记录", 8, Qh))
      ], 64)) : P("", !0)
    ])) : P("", !0);
  }
});
function nn(e) {
  return {
    id: e.full_name,
    title: e.name,
    url: e.html_url || `https://github.com/${e.full_name}`,
    customIcon: e.owner?.avatar_url || "assets/github-star.svg"
  };
}
function of(e, t, o, s, a) {
  const r = a || "默认", f = t.filter((h) => (h.section || "默认") === r).map((h) => ({
    key: `list:${h.id}`,
    kind: "folder",
    title: h.name,
    list: h,
    repos: e.filter((b) => o.get(b.full_name.toLowerCase())?.includes(h.name))
  }));
  for (const h of e)
    o.get(h.full_name.toLowerCase())?.length || f.push({ key: `repo:${h.full_name.toLowerCase()}`, kind: "repo", title: h.name, repo: h });
  const d = new Map(s.map((h, b) => [h, b]));
  return f.sort((h, b) => (d.get(h.key) ?? s.length) - (d.get(b.key) ?? s.length));
}
function Hi(e, t, o) {
  const s = e.indexOf(t), a = e.indexOf(o);
  if (s < 0 || a < 0 || s === a) return [...e];
  const r = [...e];
  return r.splice(s, 1), r.splice(a, 0, t), r;
}
function nf(e) {
  return Array.isArray(e) ? [...new Set(e.filter((t) => typeof t == "string" && t.length <= 300 && /^(list|repo):.+/.test(t)))].slice(0, 2e3) : [];
}
const sf = {
  key: 0,
  class: "gh-shortcut-status",
  role: "status"
}, af = ["data-gh-tile", "data-gh-list-drop", "onDragover", "onDrop"], rf = ["aria-label", "title", "onContextmenu", "onClick", "onPointerdown", "onKeydown"], lf = {
  key: 1,
  class: "gh-shortcut-help"
}, cf = ["disabled"], df = ["data-gh-list-drop"], uf = { class: "gh-shortcut-help" }, pf = { class: "gh-folder-repo-grid" }, hf = ["title", "onContextmenu", "onClick", "onPointerdown"], ff = {
  key: 0,
  class: "gh-shortcut-help"
}, gf = ["aria-label"], mf = { class: "gh-shortcut-menu-title" }, vf = ["disabled"], yf = /* @__PURE__ */ fe({
  __name: "GitHubFolders",
  props: {
    active: { type: Boolean, default: !0 }
  },
  emits: ["select"],
  setup(e, { emit: t }) {
    const o = e, s = t, a = z(null), r = z(""), m = z(""), f = z([]), d = z(""), h = z(null), b = te(() => h.value?.ownerKey === Te.ownerKey ? Te.repos.find((D) => D.full_name === h.value?.fullName) : void 0), E = te(() => !!(b.value && Te.repoListNames.get(b.value.full_name.toLowerCase())?.length));
    function g() {
      h.value = null;
    }
    const { menuRef: M, style: v } = di({
      visible: () => o.active && !!b.value,
      anchor: () => h.value || { x: 0, y: 0 },
      dismiss: g
    });
    function w(D, O) {
      D.preventDefault(), D.stopPropagation(), o.active && (ot(), h.value = { fullName: O.full_name, ownerKey: Te.ownerKey, x: D.clientX, y: D.clientY });
    }
    function T() {
      const D = b.value;
      !D || !E.value || dt.busy || !o.active || (g(), U(D.full_name, "未分类"));
    }
    function y() {
      const D = b.value;
      g(), D && R(D);
    }
    let C = 0, L = 0, B = Promise.resolve();
    const H = te(() => of(Te.repos, Te.lists, Te.repoListNames, f.value, Te.activeSection)), G = te(() => H.value.find((D) => D.kind === "folder" && D.list.id === r.value)), A = te(() => G.value?.kind === "folder" ? G.value.repos : []);
    function _(D) {
      return D.kind === "folder" ? { title: D.title, preview: D.repos.slice(0, 4).map(nn), count: Math.max(D.repos.length, D.list.totalCount) } : void 0;
    }
    const $ = () => Te.ownerKey ? `ghSidebarTileOrderV1:${Te.ownerKey}:${Te.activeSection || "default"}` : "";
    function ee() {
      ++C;
      const D = $(), O = [...f.value];
      D && (B = B.catch(() => {
      }).then(async () => {
        try {
          typeof chrome < "u" && chrome.storage?.local ? await chrome.storage.local.set({ [D]: O }) : localStorage.setItem(D, JSON.stringify(O)), D === $() && (d.value = "");
        } catch {
          D === $() && (d.value = "顺序暂未保存，本页仍可使用。");
        }
      }));
    }
    function R(D) {
      !o.active || Date.now() < ye || (g(), r.value = "", s("select"), Zi.open(D.full_name, void 0, D));
    }
    function Y(D) {
      if (!(!o.active || Date.now() < ye)) {
        if (D.kind === "repo") {
          R(D.repo);
          return;
        }
        g(), r.value = r.value === D.list.id ? "" : D.list.id, Io.select(D.title), s("select");
      }
    }
    function N(D) {
      return o.active && !dt.busy && Qi.folders.some((O) => O.title === D && (O.kind === "custom" || O.kind === "uncategorized"));
    }
    function U(D, O) {
      N(O) && Te.repos.some((K) => K.full_name.toLowerCase() === D.toLowerCase()) && Io.dropRepository(D, O);
    }
    function ve(D, O) {
      !N(O) || !Array.from(D.dataTransfer?.types || []).includes(fa) || (D.preventDefault(), D.stopPropagation(), D.dataTransfer && (D.dataTransfer.dropEffect = "move"), m.value = O);
    }
    function $e(D, O) {
      m.value = "";
      const K = ga(D.dataTransfer);
      !K || !N(O) || (D.preventDefault(), D.stopPropagation(), U(K, O));
    }
    function j(D) {
      const O = D.currentTarget;
      O instanceof Node && D.relatedTarget instanceof Node && O.contains(D.relatedTarget) || (m.value = "");
    }
    const I = Le({ visible: !1, x: 0, y: 0, offsetX: 0, offsetY: 0, tile: null });
    let F = null, ye = 0, Ie = 0, Me = "", Ce, be = null;
    function Ge() {
      be?.classList.remove("gh-sidebar-pointer-drop"), be = null;
    }
    function et(D, O) {
      if (D.button !== 0 || !o.active || dt.busy) return;
      ot(), g();
      const K = D.currentTarget.getBoundingClientRect();
      F = { pointer: D.pointerId, x: D.clientX, y: D.clientY, owner: Te.ownerKey, tile: O, original: [...f.value] }, I.x = D.clientX, I.y = D.clientY, I.offsetX = D.clientX - K.left, I.offsetY = D.clientY - K.top, I.tile = O, window.addEventListener("pointermove", Ot, { passive: !1 }), window.addEventListener("pointerup", Xt), window.addEventListener("pointercancel", ot);
    }
    function Be(D, O) {
      et(D, { key: `repo:${O.full_name.toLowerCase()}`, kind: "repo", title: O.name, repo: O });
    }
    function It() {
      if (Ge(), m.value = "", !F || !I.visible) return;
      const D = document.elementFromPoint(I.x, I.y), O = D?.closest("[data-gh-list-drop]"), K = O?.dataset.ghListDrop;
      if (F.tile.kind === "repo" && K && N(K) && O && (!O.hasAttribute("data-gh-tile") || Ls(O.getBoundingClientRect(), I.x, I.y))) {
        m.value = K, be = O, O.classList.add("gh-sidebar-pointer-drop");
        return;
      }
      const he = D?.closest("[data-gh-tile]"), ft = he?.dataset.ghTile;
      if (!ft || !he || ft === F.tile.key || !$s(he.getBoundingClientRect(), I.x, I.y) || ft === Me || Date.now() - Ie < xs) return;
      const kt = H.value.map((Bt) => Bt.key);
      kt.includes(F.tile.key) && (f.value = Hi(kt, F.tile.key, ft), Me = ft, Ie = Date.now());
    }
    function Ot(D) {
      !F || D.pointerId !== F.pointer || (I.x = D.clientX, I.y = D.clientY, !(!I.visible && Math.hypot(D.clientX - F.x, D.clientY - F.y) < Cs) && (D.preventDefault(), I.visible || (++C, I.visible = !0, Ce = setInterval(() => {
        const K = document.elementFromPoint(I.x, I.y)?.closest(".gh-bili-folder-list, .gh-shortcut-window-content");
        if (K) {
          const he = K.getBoundingClientRect();
          I.y < he.top + 36 ? K.scrollTop -= 12 : I.y > he.bottom - 36 && (K.scrollTop += 12);
        }
        It();
      }, 32)), It()));
    }
    function Xt(D) {
      if (!F || D.pointerId !== F.pointer) return;
      I.visible && (I.x = D.clientX, I.y = D.clientY, It());
      const O = F, K = I.visible, he = m.value;
      if (K) {
        D.preventDefault(), ye = Date.now() + 300, O.owner === Te.ownerKey && he && O.tile.kind === "repo" && U(O.tile.repo.full_name, he);
        const ft = O.original.length !== f.value.length || O.original.some((kt, Bt) => f.value[Bt] !== kt);
        O.owner === Te.ownerKey && !he && ft && ee();
      }
      he && (f.value = O.original), mo();
    }
    function mo() {
      Ge(), clearInterval(Ce), Ce = void 0, window.removeEventListener("pointermove", Ot), window.removeEventListener("pointerup", Xt), window.removeEventListener("pointercancel", ot), I.visible = !1, I.tile = null, F = null, m.value = "", Me = "", Ie = 0;
    }
    function ot() {
      F && (f.value = F.original, I.visible && (ye = Date.now() + 300)), mo();
    }
    function Ko(D, O) {
      if (!D.altKey || !["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(D.key)) return;
      D.preventDefault();
      const K = H.value.map((Bt) => Bt.key), he = K.indexOf(O.key), ft = D.key === "ArrowLeft" ? -1 : D.key === "ArrowRight" ? 1 : D.key === "ArrowUp" ? -2 : 2, kt = K[he + ft];
      kt && (f.value = Hi(K, O.key, kt), ee());
    }
    function jo(D) {
      const O = D.target;
      !F && !a.value?.contains(O) && !O?.closest("#gh-list-shortcut-window, .gh-shortcut-context-menu") && (r.value = "");
    }
    function vo(D) {
      D.key === "Escape" && (ot(), g(), r.value = "");
    }
    function Vo() {
      document.hidden && (ot(), g(), r.value = "");
    }
    function qt() {
      m.value = "";
    }
    We(() => [Te.ownerKey, Te.activeSection], async () => {
      const D = ++L;
      ot(), g(), r.value = "", f.value = [], d.value = "";
      const O = $(), K = ++C;
      if (O)
        try {
          const he = typeof chrome < "u" && chrome.storage?.local ? (await chrome.storage.local.get(O))[O] : JSON.parse(localStorage.getItem(O) || "[]");
          D === L && K === C && (f.value = nf(he));
        } catch {
          D === L && (d.value = "图标顺序读取失败，可继续操作。");
        }
    }, { immediate: !0 });
    const zo = /* @__PURE__ */ new Set();
    return We(() => [o.active, Te.ownerKey, Te.loading], ([D, O, K]) => {
      !D || !O || K || zo.has(O) || (zo.add(O), He.ensureAllStarsLoaded());
    }, { immediate: !0 }), We(() => o.active, (D) => {
      D || (ot(), g(), r.value = "");
    }), We(() => G.value, (D) => {
      D || (r.value = "");
    }), We(b, (D) => {
      D || g();
    }), qe(() => {
      window.addEventListener("pointerdown", jo), window.addEventListener("keydown", vo), window.addEventListener("blur", ot), window.addEventListener("dragend", qt), window.addEventListener("drop", qt), document.addEventListener("visibilitychange", Vo);
    }), Yt(() => {
      ++L, ot(), window.removeEventListener("pointerdown", jo), window.removeEventListener("keydown", vo), window.removeEventListener("blur", ot), window.removeEventListener("dragend", qt), window.removeEventListener("drop", qt), document.removeEventListener("visibilitychange", Vo);
    }), (D, O) => (l(), p("div", {
      ref_key: "root",
      ref: a,
      class: "gh-shortcut-sidebar"
    }, [
      i(dt).message || d.value ? (l(), p("p", sf, u(i(dt).message || d.value), 1)) : P("", !0),
      Z(No, {
        name: "gh-shortcut",
        tag: "div",
        class: "gh-shortcut-grid"
      }, {
        default: Et(() => [
          (l(!0), p(Q, null, we(H.value, (K) => (l(), p("div", {
            key: K.key,
            class: ce(["gh-shortcut-cell", { "is-dragging": I.visible && I.tile?.key === K.key, "drop-into": K.kind === "folder" && m.value === K.title }]),
            "data-gh-tile": K.key,
            "data-gh-list-drop": K.kind === "folder" ? K.title : void 0,
            onDragover: (he) => K.kind === "folder" && ve(he, K.title),
            onDragleave: j,
            onDrop: (he) => K.kind === "folder" && $e(he, K.title)
          }, [
            n("button", {
              type: "button",
              class: "gh-shortcut-tile",
              "aria-label": K.kind === "folder" ? `打开本地分组 ${K.title}` : `查看仓库 ${K.repo.full_name}`,
              title: K.kind === "folder" ? `${K.title}（拖入将加入本地分组，保留其他归属）` : K.repo.full_name,
              onContextmenu: (he) => K.kind === "repo" && w(he, K.repo),
              onClick: (he) => Y(K),
              onPointerdown: (he) => et(he, K),
              onDragstart: O[0] || (O[0] = V(() => {
              }, ["prevent"])),
              onKeydown: (he) => Ko(he, K)
            }, [
              Z(Po, {
                link: K.kind === "repo" ? i(nn)(K.repo) : void 0,
                folder: _(K)
              }, null, 8, ["link", "folder"])
            ], 40, rf)
          ], 42, af))), 128))
        ]),
        _: 1
      }),
      H.value.length ? P("", !0) : (l(), p("p", lf, u(i(Te).loading ? "正在读取仓库与列表…" : "暂无本地分组或未分类仓库"), 1)),
      (l(), pe(bt, { to: "body" }, [
        G.value && e.active ? (l(), pe(i(Aa), {
          key: 0,
          id: "gh-list-shortcut-window",
          "window-id": "gh-list-shortcut",
          title: G.value.title,
          icon: "📁",
          "default-width": 420,
          "default-height": 420,
          "min-width": 300,
          "min-height": 260,
          "show-minimize": !1,
          "show-maximize": !1,
          "custom-class": "gh-shortcut-folder-window",
          "custom-style": { background: "var(--panel)" },
          onClose: O[5] || (O[5] = (K) => {
            r.value = "", g();
          })
        }, {
          "header-actions": Et(() => [
            n("button", {
              type: "button",
              class: "gh-folder-delete-action",
              disabled: i(dt).busy,
              title: "删除本地分组（不会取消 Star）",
              onClick: O[1] || (O[1] = (K) => i(Io).delete(G.value.title))
            }, "删除分组", 8, cf)
          ]),
          default: Et(() => [
            n("div", {
              class: ce(["gh-shortcut-window-content", { "drop-into": m.value === G.value.title }]),
              "data-gh-list-drop": G.value.title,
              onDragover: O[3] || (O[3] = (K) => ve(K, G.value.title)),
              onDragleave: j,
              onDrop: O[4] || (O[4] = (K) => $e(K, G.value.title))
            }, [
              n("p", uf, u(A.value.length) + " 个已加载仓库 · 可拖到其他文件夹以加入本地分组", 1),
              n("div", pf, [
                (l(!0), p(Q, null, we(A.value, (K) => (l(), p("div", {
                  key: K.full_name,
                  class: "gh-folder-repo-cell"
                }, [
                  n("button", {
                    type: "button",
                    class: "gh-shortcut-tile",
                    title: K.full_name,
                    onContextmenu: (he) => w(he, K),
                    onClick: (he) => R(K),
                    onPointerdown: (he) => Be(he, K),
                    onDragstart: O[2] || (O[2] = V(() => {
                    }, ["prevent"]))
                  }, [
                    Z(Po, {
                      link: i(nn)(K)
                    }, null, 8, ["link"])
                  ], 40, hf)
                ]))), 128))
              ]),
              A.value.length ? P("", !0) : (l(), p("p", ff, u(i(Te).loading ? "正在读取…" : "空文件夹，可拖入仓库"), 1))
            ], 42, df)
          ]),
          _: 1
        }, 8, ["title"])) : P("", !0),
        b.value && e.active ? (l(), p("div", {
          key: 1,
          ref_key: "menuRef",
          ref: M,
          class: "gh-shortcut-context-menu",
          style: Se(i(v)),
          role: "menu",
          "aria-label": b.value.full_name + " 操作",
          onPointerdown: O[6] || (O[6] = V(() => {
          }, ["stop"])),
          onClick: O[7] || (O[7] = V(() => {
          }, ["stop"])),
          onContextmenu: O[8] || (O[8] = V(() => {
          }, ["prevent"]))
        }, [
          n("div", mf, u(b.value.full_name), 1),
          n("button", {
            type: "button",
            role: "menuitem",
            onClick: y
          }, "查看仓库详情"),
          n("button", {
            type: "button",
            role: "menuitem",
            disabled: i(dt).busy || !E.value,
            title: "从所有本地分组移出，保留 GitHub 收藏",
            onClick: T
          }, "移到未分组", 8, vf)
        ], 44, gf)) : P("", !0),
        I.visible && I.tile ? (l(), p("div", {
          key: 2,
          class: "gh-shortcut-ghost gh-shortcut-tile",
          style: Se({ left: `${I.x - I.offsetX}px`, top: `${I.y - I.offsetY}px` })
        }, [
          Z(Po, {
            link: I.tile.kind === "repo" ? i(nn)(I.tile.repo) : void 0,
            folder: _(I.tile)
          }, null, 8, ["link", "folder"])
        ], 4)) : P("", !0)
      ]))
    ], 512));
  }
}), wf = /* @__PURE__ */ Re(yf, [["__scopeId", "data-v-5b72c353"]]), bf = { class: "gh-hero-left" }, kf = {
  id: "gh-hero-cover",
  class: "gh-bili-cover"
}, _f = { key: 0 }, Cf = { key: 1 }, xf = {
  key: 2,
  class: "fo-folder-icon"
}, Lf = { class: "gh-bili-heading" }, $f = { class: "gh-hero-title-row" }, Sf = ["title"], Tf = {
  class: "gh-hero-sections-tabs",
  role: "tablist",
  "aria-label": "收藏大分组标签"
}, If = ["title", "onClick", "onContextmenu"], Mf = ["role", "aria-live"], Df = ["title"], Af = ["title", "aria-label"], Ef = { id: "gh-hero-desc" }, Pf = { class: "gh-hero-search-area" }, Wf = { class: "gh-bili-actions" }, Rf = ["title"], Nf = { class: "gh-batch-btn-text" }, Of = ["title"], Bf = ["title"], Ff = /* @__PURE__ */ fe({
  __name: "GitHubHero",
  emits: ["open-ai-settings", "open-guide"],
  setup(e, { emit: t }) {
    const o = t;
    async function s() {
      let r;
      try {
        r = await ki.prompt({
          title: "新建分组标签",
          message: "创建一个新的顶层分组标签（类似常用网站的分区）：",
          placeholder: "分组名称（如：工作区、AI、工具）…"
        });
      } catch {
        return;
      }
      const m = r?.trim();
      m && await He.createSection(m);
    }
    async function a(r, m) {
      if (r.preventDefault(), r.stopPropagation(), m === "默认" && Te.sections.length === 1) return;
      await ki.confirm({
        title: "删除分组标签",
        message: `确定删除分组标签「${m}」吗？里面的文件夹会自动合并至默认分组，仓库不会丢失。`,
        danger: !0
      }) && await He.deleteSection(m);
    }
    return (r, m) => (l(), p(Q, null, [
      n("div", bf, [
        n("div", kf, [
          i(Ft).kind === "all" ? (l(), p("span", _f, "⭐")) : i(Ft).kind === "uncategorized" ? (l(), p("span", Cf, "📄")) : (l(), p("i", xf))
        ]),
        n("div", Lf, [
          n("div", $f, [
            n("h3", {
              id: "gh-hero-title",
              title: i(Ft).title
            }, u(i(Ft).title), 9, Sf),
            n("div", Tf, [
              (l(!0), p(Q, null, we(i(Te).sections, (f) => (l(), p("button", {
                key: f,
                type: "button",
                class: ce(["gh-section-tab", { active: f === i(Te).activeSection }]),
                title: `切换到分组「${f}」；右键可删除此标签`,
                onClick: (d) => i(He).switchSection(f),
                onContextmenu: (d) => a(d, f)
              }, u(f), 43, If))), 128)),
              n("button", {
                type: "button",
                class: "gh-section-add-btn",
                title: "添加新分组标签",
                "aria-label": "添加新分组标签",
                onClick: s
              }, " ＋ ")
            ]),
            i(jt).actionText ? (l(), p("div", {
              key: 0,
              class: ce(["gh-hero-inline-status", { "is-error": i(jt).actionError }]),
              role: i(jt).actionError ? "alert" : "status",
              "aria-live": i(jt).actionError ? "assertive" : "polite",
              "aria-atomic": "true"
            }, [
              n("span", {
                class: "gh-hero-status-text",
                title: i(jt).actionText
              }, u(i(jt).actionText), 9, Df),
              n("button", {
                type: "button",
                title: i(c)("github.hero.closeTip"),
                "aria-label": i(c)("github.hero.closeTip"),
                onClick: m[0] || (m[0] = (f) => i(ri).update({ actionText: "", actionError: !1 }))
              }, "×", 8, Af)
            ], 10, Mf)) : P("", !0)
          ]),
          n("p", Ef, u(i(Ft).description), 1)
        ])
      ]),
      n("div", Pf, [
        hn(r.$slots, "search", {}, void 0, !0)
      ]),
      n("div", Wf, [
        hn(r.$slots, "actions-prefix", {}, void 0, !0),
        n("button", {
          type: "button",
          class: "gh-hero-btn gh-github-help-btn",
          title: "GitHub 使用手册",
          "aria-label": "打开 GitHub 使用手册",
          onClick: m[1] || (m[1] = (f) => o("open-guide"))
        }, "?"),
        n("button", {
          id: "gh-batch-toggle-btn",
          type: "button",
          class: ce(["gh-hero-btn gh-batch-toggle-btn", { active: i(Ft).batchMode }]),
          title: i(c)("github.hero.batchToggle"),
          onClick: m[2] || (m[2] = (f) => i(Mo).toggleBatch())
        }, [
          m[5] || (m[5] = n("span", { class: "gh-batch-btn-icon" }, "☑", -1)),
          n("span", Nf, u(i(Ft).batchMode ? i(c)("github.hero.batchBack") : i(c)("github.hero.batch")), 1)
        ], 10, Rf),
        n("button", {
          id: "gh-refresh-btn",
          type: "button",
          class: "gh-hero-btn",
          title: i(c)("github.hero.refreshTitle"),
          onClick: m[3] || (m[3] = (f) => i(Mo).refresh())
        }, u(i(c)("github.hero.refresh")), 9, Of),
        n("button", {
          id: "gh-hero-add-folder-btn",
          type: "button",
          class: "gh-hero-btn primary",
          title: i(c)("github.hero.addFolderTitle"),
          onClick: m[4] || (m[4] = (f) => i(Mo).createFolder())
        }, u(i(c)("github.hero.addFolder")), 9, Bf)
      ])
    ], 64));
  }
}), Hf = /* @__PURE__ */ Re(Ff, [["__scopeId", "data-v-2869cb71"]]), ae = Le({ repo: "", text: "", baseline: "", busy: !1, message: "", storedValue: null });
function Ki(e, t = !1) {
  if (!e || ae.busy) return;
  if (ae.repo && ae.text !== ae.baseline) {
    ae.message = "请先保存或明确取消当前草稿，再编辑或清除其它备注。";
    return;
  }
  const o = He.remarks[e]?.userRemark, s = typeof o == "string" ? o : "";
  Object.assign(ae, {
    repo: e,
    baseline: s,
    text: t ? "" : s,
    storedValue: null,
    message: t ? "清除已准备；点击保存才会清除手写备注，AI 简介不变。" : "仅点击保存或 Enter 才写入；草稿只保留在本页内存。"
  });
}
function Gn() {
  ae.busy || Object.assign(ae, { repo: "", text: "", baseline: "", storedValue: null, message: "" });
}
async function Un() {
  if (ae.busy || !ae.repo) return;
  const { repo: e, text: t, baseline: o } = ae;
  ae.busy = !0;
  try {
    await He.updateRepoRemark(e, { userRemark: t.trim() }, o), Object.assign(ae, { repo: "", text: "", baseline: "", storedValue: null, message: `${e} 的备注已保存并回读核对。` });
  } catch (s) {
    ae.message = s instanceof Error ? s.message : "保存未确认，草稿保留，请先读取已保存值核对。";
  } finally {
    ae.busy = !1;
  }
}
async function ji() {
  if (ae.busy || !ae.repo) return;
  const e = ae.repo;
  ae.busy = !0;
  try {
    const o = (await He.reloadRepoRemarks())[e]?.userRemark;
    if (o !== void 0 && typeof o != "string") throw new Error("保存值格式异常，未变更草稿或覆盖基准。");
    ae.storedValue = o ?? "", ae.baseline = o ?? "", ae.message = "已读取保存值，草稿没有替换。请对比下方保存值；再次点击保存将以草稿替换它。";
  } catch (t) {
    ae.message = t instanceof Error ? t.message : "读取失败，草稿保留。";
  } finally {
    ae.busy = !1;
  }
}
const Kf = ["disabled"], jf = ["disabled"], Vf = ["disabled"], zf = ["disabled"], Gf = {
  key: 0,
  style: { width: "100%", "white-space": "pre-wrap", "overflow-wrap": "anywhere" }
}, Vi = /* @__PURE__ */ fe({
  __name: "GitHubRemarkEditor",
  props: {
    active: { type: Boolean }
  },
  setup(e) {
    const t = e, o = z(null);
    return qe(() => {
      Tt(() => {
        t.active && !ae.busy && o.value?.focus();
      });
    }), (s, a) => (l(), p("div", {
      class: "gh-inline-remark-box",
      style: { "flex-wrap": "wrap", "max-width": "100%" },
      onClick: a[6] || (a[6] = V(() => {
      }, ["stop"]))
    }, [
      st(n("input", {
        ref_key: "input",
        ref: o,
        "onUpdate:modelValue": a[0] || (a[0] = (r) => i(ae).text = r),
        class: "gh-inline-remark-input",
        type: "text",
        maxlength: "100",
        "aria-label": "手写仓库备注",
        placeholder: "备注说明…",
        disabled: i(ae).busy || !e.active,
        onKeydown: [
          a[1] || (a[1] = Wo(V((r) => !r.isComposing && e.active && i(Un)(), ["prevent"]), ["enter"])),
          a[2] || (a[2] = Wo(V((r) => !r.isComposing && e.active && i(Gn)(), ["prevent", "stop"]), ["esc"]))
        ]
      }, null, 40, Kf), [
        [fo, i(ae).text]
      ]),
      n("button", {
        type: "button",
        class: "gh-inline-remark-btn save",
        title: "保存备注",
        disabled: i(ae).busy || !e.active,
        onClick: a[3] || (a[3] = //@ts-ignore
        (...r) => i(Un) && i(Un)(...r))
      }, "✓", 8, jf),
      n("button", {
        type: "button",
        class: "gh-inline-remark-btn cancel",
        title: "取消草稿",
        disabled: i(ae).busy || !e.active,
        onClick: a[4] || (a[4] = //@ts-ignore
        (...r) => i(Gn) && i(Gn)(...r))
      }, "✕", 8, Vf),
      n("button", {
        type: "button",
        disabled: i(ae).busy || !e.active,
        onClick: a[5] || (a[5] = //@ts-ignore
        (...r) => i(ji) && i(ji)(...r))
      }, "读取已保存值", 8, zf),
      i(ae).storedValue !== null ? (l(), p("p", Gf, "已保存值：" + u(i(ae).storedValue || "（空）"), 1)) : P("", !0)
    ]));
  }
}), Yn = Le({
  isOpen: !1,
  repository: null
}), Uf = {
  open(e) {
    Yn.repository = e, Yn.isOpen = !0;
  },
  close() {
    Yn.isOpen = !1;
  }
}, Yf = {
  key: 0,
  role: "status"
}, Xf = {
  key: 1,
  "aria-label": "未显示仓库的备注草稿"
}, qf = {
  key: 2,
  class: "gh-search-options",
  style: { margin: "0 0 10px" }
}, Jf = { style: { "font-size": "12px", color: "var(--dim)" } }, Zf = {
  key: 3,
  class: "gh-repos-loading"
}, Qf = {
  key: 4,
  class: "muted small",
  style: { "text-align": "center", padding: "40px 0", "font-size": "13px" }
}, eg = ["data-repo-name", "onClick", "onContextmenu", "onDragstart"], tg = ["onClick"], og = { class: "gh-card-head" }, ng = ["checked", "onChange"], ig = ["src"], sg = ["href", "title"], ag = { class: "owner" }, rg = { class: "gh-card-body" }, lg = { class: "gh-card-badges" }, cg = ["title", "onClick"], dg = ["onClick"], ug = ["title", "onClick"], pg = { class: "gh-badge-remark-text" }, hg = {
  key: 0,
  class: "desc gh-desc-analyzing",
  title: "正在使用 AI 分析仓库…"
}, fg = {
  key: 1,
  class: "desc gh-desc-ai",
  title: "AI 中文简介（点击可直接修改，右键可重新分析）"
}, gg = ["title"], mg = {
  key: 3,
  class: "desc dim"
}, vg = { class: "meta" }, yg = { class: "gh-stars" }, wg = {
  key: 0,
  class: "gh-lang"
}, bg = {
  key: 1,
  class: "gh-updated"
}, kg = {
  key: 6,
  class: "gh-pager"
}, _g = ["disabled"], Cg = { class: "gh-page-info" }, xg = ["disabled"], Lg = ["onClick"], $g = /* @__PURE__ */ fe({
  __name: "GitHubRepositories",
  props: {
    active: { type: Boolean, default: !0 }
  },
  setup(e) {
    const t = e, o = te(() => !!ae.repo && !De.cards.some((A) => A.fullName === ae.repo)), s = Le({
      visible: !1,
      x: 0,
      y: 0,
      fullName: "",
      folders: [],
      hasRemark: !1,
      url: ""
    }), a = z(null), r = z(!1);
    function m(A, _) {
      const $ = A.target;
      if ($ instanceof Element) {
        if (De.batchMode) {
          if ($.closest(".fo-card-more,.gh-badge-folder,.gh-badge-remark,.gh-inline-remark-box")) return;
          A.preventDefault(), A.stopPropagation(), At.toggleSelection(_.fullName);
          return;
        }
        $.closest("a,button,.gh-badge-folder,.gh-badge-remark,.fo-card-more,.gh-card-hole,.gh-card-checkbox,.gh-inline-remark-box") || (A.preventDefault(), A.stopPropagation(), Zi.open(_.fullName, void 0, _));
      }
    }
    function f(A, _) {
      if (!t.active) return;
      A.preventDefault(), A.stopPropagation();
      const $ = 12, ee = 160, R = 280, Y = Math.min(window.innerWidth - ee - $, Math.max($, A.clientX)), N = Math.min(window.innerHeight - R - $, Math.max($, A.clientY));
      s.x = Y, s.y = N, s.fullName = _.fullName, s.folders = [..._.folders || (_.folder ? [_.folder] : [])], s.hasRemark = !!_.customRemark, s.url = _.url, s.visible = !0, a.value = null, r.value = Y > window.innerWidth - 380;
    }
    function d(A, _) {
      f(_, A), a.value = "folder";
    }
    function h() {
      s.visible = !1, a.value = null;
    }
    function b(A) {
      s.folders.includes(A) ? s.folders = s.folders.filter((_) => _ !== A) : s.folders.push(A), He.toggleRepoList(s.fullName, A);
    }
    function E() {
      s.folders = [], He.clearRepoLists(s.fullName), h();
    }
    function g(A) {
      if (!t.active) return;
      const _ = typeof A == "string" ? A : A?.fullName || s.fullName;
      h(), Ki(_);
    }
    function M() {
      if (!t.active) return;
      const A = s.fullName;
      h(), Ki(A, !0);
    }
    async function v() {
      const A = s.url;
      if (h(), A && t.active)
        try {
          await navigator.clipboard.writeText(A);
        } catch {
        }
    }
    function w(A) {
      const _ = He.findRepository(s.fullName);
      h(), _ && oa.sendGitHubShare({
        fullName: _.full_name,
        name: _.name,
        owner: _.owner?.login,
        ownerAvatar: _.owner?.avatar_url,
        desc: _.description || void 0,
        language: _.language || void 0,
        stars: _.stargazers_count,
        category: s.folders && s.folders.length ? s.folders.join(", ") : "未分类",
        url: _.html_url || `https://github.com/${_.full_name}`,
        updatedAt: _.updated_at ? _.updated_at.split("T")[0] : void 0
      }, A);
    }
    function T() {
      const A = He.findRepository(s.fullName);
      h(), A && Uf.open({
        fullName: A.full_name,
        description: A.description || "",
        stars: A.stargazers_count,
        language: A.language || void 0,
        updated: A.updated_at
      });
    }
    function y() {
      s.url && window.open(s.url, "_blank", "noreferrer"), h();
    }
    async function C() {
      const A = He.findRepository(s.fullName);
      if (!A) {
        h();
        return;
      }
      h(), await He.confirmUnstarRepository(A);
    }
    function L(A) {
      const _ = A.target;
      _?.closest(".gh-repo-context-menu") || _?.closest(".gh-inline-remark-box") || h();
    }
    function B(A) {
      A.key === "Escape" && s.visible && h();
    }
    We(() => t.active, (A) => {
      window.removeEventListener("pointerdown", L), window.removeEventListener("keydown", B), h(), A && (window.addEventListener("pointerdown", L), window.addEventListener("keydown", B));
    }, { immediate: !0 }), Nt(() => {
      window.removeEventListener("pointerdown", L), window.removeEventListener("keydown", B);
    });
    function H(A, _) {
      const $ = A.target;
      if ($ instanceof Element && $.closest("button,a,input,textarea,select,[contenteditable='true']")) {
        A.preventDefault();
        return;
      }
      At.startDrag(_, A);
    }
    const G = te(() => {
      if (De.cards.length > 0) return !1;
      const A = jt.actionText || "";
      return !!(A.includes("正在读取") || A.includes("正在加载") || A.includes("正在统计") || A.includes("正在同步"));
    });
    return (A, _) => (l(), p(Q, null, [
      i(ae).message ? (l(), p("p", Yf, u(i(ae).repo ? `${i(ae).repo}：` : "") + u(i(ae).message), 1)) : P("", !0),
      o.value ? (l(), p("section", Xf, [
        n("p", null, "备注草稿：" + u(i(ae).repo) + "（仓库不在当前列表中，草稿仍保留）", 1),
        Z(Vi, {
          active: t.active
        }, null, 8, ["active"])
      ])) : P("", !0),
      i(De).searchMessage ? (l(), p("div", qf, [
        n("span", Jf, u(i(De).searchMessage), 1),
        n("button", {
          type: "button",
          class: "gh-tab",
          style: { padding: "2px 8px", "font-size": "11px", "margin-left": "8px" },
          onClick: _[0] || (_[0] = ($) => i(At).resetSearch())
        }, "清空搜索")
      ])) : P("", !0),
      G.value ? (l(), p("div", Zf, [..._[17] || (_[17] = [
        n("div", {
          class: "gh-spinner",
          "aria-hidden": "true"
        }, null, -1),
        n("span", { class: "gh-loading-label" }, "正在读取 GitHub 仓库列表中…", -1)
      ])])) : i(De).emptyMessage ? (l(), p("p", Qf, u(i(De).emptyMessage), 1)) : P("", !0),
      i(De).cards.length ? (l(), p("div", {
        key: 5,
        class: ce(["repos gh-grid", { "gh-batch-active": i(De).batchMode }])
      }, [
        (l(!0), p(Q, null, we(i(De).cards, ($) => (l(), p("article", {
          key: $.fullName,
          class: ce(["repo gh-card", { selected: $.selected }]),
          "data-repo-name": $.fullName,
          draggable: "true",
          onClick: (ee) => m(ee, $),
          onContextmenu: (ee) => f(ee, $),
          onDragstart: (ee) => H(ee, $.fullName)
        }, [
          n("button", {
            class: "fo-card-more",
            type: "button",
            "aria-label": "更多操作",
            title: "更多操作",
            onClick: V((ee) => f(ee, $), ["stop"])
          }, "⋮", 8, tg),
          n("div", og, [
            n("label", {
              class: "gh-card-hole",
              title: "点击勾选此仓库",
              onClick: _[1] || (_[1] = V(() => {
              }, ["stop"]))
            }, [
              n("input", {
                class: "gh-card-checkbox",
                type: "checkbox",
                checked: $.selected,
                onChange: (ee) => i(At).setSelection($.fullName, ee.target.checked)
              }, null, 40, ng),
              _[18] || (_[18] = n("span", { class: "gh-hole-inner" }, null, -1))
            ]),
            n("img", {
              class: "gh-owner-avatar",
              src: $.avatarUrl || "assets/github-star.svg",
              alt: "",
              loading: "lazy",
              referrerpolicy: "no-referrer",
              onError: _[2] || (_[2] = (ee) => ee.target.src = "assets/github-star.svg")
            }, null, 40, ig),
            n("a", {
              href: $.url,
              target: "_blank",
              rel: "noreferrer",
              class: "name",
              title: $.fullName
            }, [
              n("span", ag, u($.owner) + "/", 1),
              tt(u($.name), 1)
            ], 8, sg)
          ]),
          n("div", rg, [
            n("div", lg, [
              $.folders && $.folders.length ? (l(!0), p(Q, { key: 0 }, we($.folders, (ee) => (l(), p("span", {
                key: ee,
                class: "gh-badge-folder",
                title: `本地分组：${ee}（点击管理所属列表）`,
                onClick: V((R) => d($, R), ["stop"])
              }, " 📁 " + u(ee), 9, cg))), 128)) : (l(), p("span", {
                key: 1,
                class: "gh-badge-folder uncat",
                title: "未分类（点击加入 本地分组）",
                onClick: V((ee) => d($, ee), ["stop"])
              }, " ＋ 未分类 ", 8, dg)),
              i(ae).repo === $.fullName ? (l(), pe(Vi, {
                key: 2,
                active: t.active
              }, null, 8, ["active"])) : $.customRemark ? (l(), p("span", {
                key: 3,
                class: "gh-badge-remark",
                title: `备注：${$.customRemark}（点击就地修改）`,
                onClick: V((ee) => g($), ["stop"])
              }, [
                _[19] || (_[19] = n("span", { class: "gh-badge-remark-icon" }, "💬", -1)),
                n("span", pg, u($.customRemark), 1)
              ], 8, ug)) : P("", !0)
            ]),
            $.descriptionKind === "analyzing" ? (l(), p("p", hg, [..._[20] || (_[20] = [
              n("span", { class: "gh-ai-sparkle" }, "✨", -1),
              tt(" 正在使用 AI 分析仓库并提炼中文介绍…", -1)
            ])])) : $.descriptionKind === "ai" ? (l(), p("p", fg, [
              _[21] || (_[21] = n("span", { class: "gh-ai-tag-flag" }, "🤖", -1)),
              tt(u($.description), 1)
            ])) : $.descriptionKind === "plain" ? (l(), p("p", {
              key: 2,
              class: "desc",
              title: $.description
            }, u($.description), 9, gg)) : (l(), p("p", mg, "暂无描述"))
          ]),
          n("div", vg, [
            n("span", yg, "★ " + u($.stars), 1),
            $.language ? (l(), p("span", wg, u($.language), 1)) : P("", !0),
            $.updated ? (l(), p("span", bg, "更新 " + u($.updated), 1)) : P("", !0)
          ])
        ], 42, eg))), 128))
      ], 2)) : P("", !0),
      i(De).totalPages > 1 ? (l(), p("div", kg, [
        n("button", {
          class: "gh-page-btn",
          type: "button",
          disabled: i(De).page <= 1,
          onClick: _[3] || (_[3] = ($) => i(At).changePage(i(De).page - 1))
        }, "‹ 上一页", 8, _g),
        n("span", Cg, u(i(De).page) + " / " + u(i(De).totalPages) + " · 共 " + u(i(De).totalItems) + " 个" + u(i(De).serverPaged ? ` · 已加载 ${i(De).loadedItems}` : ""), 1),
        n("button", {
          class: "gh-page-btn",
          type: "button",
          disabled: i(De).page >= i(De).totalPages,
          onClick: _[4] || (_[4] = ($) => i(At).changePage(i(De).page + 1))
        }, "下一页 ›", 8, xg)
      ])) : P("", !0),
      (l(), pe(bt, { to: "body" }, [
        t.active && s.visible ? (l(), p("div", {
          key: 0,
          class: "fo-cover-context-menu gh-repo-context-menu",
          style: Se({ left: `${s.x}px`, top: `${s.y}px` }),
          onClick: _[15] || (_[15] = V(() => {
          }, ["stop"])),
          onContextmenu: _[16] || (_[16] = V(() => {
          }, ["prevent"]))
        }, [
          n("div", {
            class: ce(["gh-menu-has-sub", { "is-active": a.value === "folder" }]),
            onMouseenter: _[6] || (_[6] = ($) => a.value = "folder")
          }, [
            _[22] || (_[22] = n("button", {
              class: "fo-cover-menu-item with-sub-arrow",
              type: "button"
            }, [
              n("span", null, "📁 所属 本地分组"),
              n("span", { class: "sub-arrow" }, "›")
            ], -1)),
            n("div", {
              class: ce(["gh-sub-flyout", { "flyout-left": r.value }]),
              onClick: _[5] || (_[5] = V(() => {
              }, ["stop"]))
            }, [
              n("button", {
                class: ce(["fo-cover-menu-item", { primary: s.folders.length === 0 }]),
                type: "button",
                onClick: E
              }, u(s.folders.length === 0 ? "✓ " : "  ") + "＋ 设为未分类（清空列表） ", 3),
              (l(!0), p(Q, null, we(i(He).cats, ($) => (l(), p("button", {
                key: $,
                class: ce(["fo-cover-menu-item", { primary: s.folders.includes($) }]),
                type: "button",
                onClick: (ee) => b($)
              }, u(s.folders.includes($) ? "✓ " : "  ") + "📁 " + u($), 11, Lg))), 128))
            ], 2)
          ], 34),
          n("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: _[7] || (_[7] = ($) => a.value = null),
            onClick: _[8] || (_[8] = ($) => g())
          }, " ✏️ 编辑备注… ", 32),
          n("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: _[9] || (_[9] = ($) => a.value = null),
            onClick: T
          }, " 创建任务 ", 32),
          Z(Ea, {
            label: "💬 发送到聊天室",
            visible: s.visible,
            onOpen: _[10] || (_[10] = ($) => a.value = null),
            onSelect: w
          }, null, 8, ["visible"]),
          s.hasRemark ? (l(), p("button", {
            key: 0,
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: _[11] || (_[11] = ($) => a.value = null),
            onClick: M
          }, " 🗑️ 清除备注 ", 32)) : P("", !0),
          n("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: _[12] || (_[12] = ($) => a.value = null),
            onClick: v
          }, " 📋 复制仓库链接 ", 32),
          n("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: _[13] || (_[13] = ($) => a.value = null),
            onClick: y
          }, " ↗ 在 GitHub 打开 ", 32),
          n("button", {
            class: "fo-cover-menu-item danger",
            type: "button",
            onMouseenter: _[14] || (_[14] = ($) => a.value = null),
            onClick: C
          }, " ⭐ 取消 Star ", 32)
        ], 36)) : P("", !0)
      ]))
    ], 64));
  }
}), Sg = /* @__PURE__ */ Re($g, [["__scopeId", "data-v-93d09653"]]), Tg = { class: "gh-batch-bar-left" }, Ig = { class: "gh-batch-count-tip" }, Mg = { id: "gh-batch-selected-count" }, Dg = {
  key: 0,
  "aria-label": "批量归属列表确认"
}, Ag = ["disabled"], Eg = ["disabled"], Pg = { class: "gh-batch-bar-right" }, Wg = ["disabled"], Rg = ["disabled"], Ng = ["disabled"], Og = /* @__PURE__ */ fe({
  __name: "GitHubBatchBar",
  props: {
    active: { type: Boolean, default: !0 }
  },
  setup(e) {
    const t = e, o = Vs(), s = z(null), a = te(() => {
      const f = [
        { value: "", label: "未分类（清空所选仓库的所有列表所属）", icon: "🌐" }
      ];
      return Qi.folders.filter((d) => d.kind === "custom").forEach((d) => {
        f.push({ value: d.title, label: d.title, icon: "📁" });
      }), f;
    });
    function r() {
      t.active && (o.value = He.prepareBatchMove(), s.value = null);
    }
    async function m() {
      const f = o.value, d = s.value;
      if (!t.active || !f || d === null || dt.busy) return;
      await f.submit(d) && o.value === f && (o.value = void 0);
    }
    return We(() => t.active && Qt.active, (f) => {
      f || (o.value = void 0);
    }), (f, d) => (l(), p(Q, null, [
      n("div", Tg, [
        n("button", {
          type: "button",
          class: "gh-batch-action-btn",
          id: "gh-batch-select-all-btn",
          onClick: d[0] || (d[0] = (h) => i(Do).toggleSelectAll())
        }, u(i(Qt).allSelected ? "取消全选" : "全选"), 1),
        n("span", Ig, [
          d[5] || (d[5] = tt("已选择 ", -1)),
          n("b", Mg, u(i(Qt).selectedCount), 1),
          d[6] || (d[6] = tt(" 项", -1))
        ])
      ]),
      o.value ? (l(), p("section", Dg, [
        n("p", null, "仅操作打开选择器时的 " + u(o.value.names.length) + " 个仓库；后来勾选的仓库不加入。", 1),
        n("details", null, [
          d[7] || (d[7] = n("summary", null, "查看本次仓库清单", -1)),
          n("ul", null, [
            (l(!0), p(Q, null, we(o.value.names, (h) => (l(), p("li", { key: h }, u(h), 1))), 128))
          ])
        ]),
        Z(qi, {
          "model-value": s.value ?? "",
          options: a.value,
          disabled: i(dt).busy,
          placeholder: "请选择目标列表",
          size: "sm",
          style: { "max-width": "260px" },
          "onUpdate:modelValue": d[1] || (d[1] = (h) => s.value = String(h))
        }, null, 8, ["model-value", "options", "disabled"]),
        n("button", {
          type: "button",
          disabled: !t.active || i(dt).busy || s.value === null,
          onClick: m
        }, "确认加入列表", 8, Ag),
        n("button", {
          type: "button",
          disabled: i(dt).busy,
          onClick: d[2] || (d[2] = (h) => o.value = void 0)
        }, "取消", 8, Eg)
      ])) : P("", !0),
      n("div", Pg, [
        n("button", {
          type: "button",
          class: "gh-batch-action-btn",
          id: "gh-batch-move-btn",
          disabled: !t.active || i(dt).busy || i(Qt).selectedCount === 0,
          title: "固定当前选择，批量加入所选本地分组",
          onClick: r
        }, " 📁 归入本地分组 ", 8, Wg),
        n("button", {
          type: "button",
          class: "gh-batch-action-btn",
          id: "gh-batch-ai-btn",
          disabled: i(Qt).selectedCount === 0,
          title: "批量使用 AI 生成中文介绍",
          onClick: d[3] || (d[3] = (h) => i(Do).analyzeAi())
        }, " ✨ 批量 AI 分析 ", 8, Rg),
        n("button", {
          type: "button",
          class: "gh-batch-action-btn danger",
          id: "gh-batch-unstar-btn",
          disabled: i(Qt).selectedCount === 0,
          title: "从 GitHub 批量取消 Star 收藏",
          onClick: d[4] || (d[4] = (h) => i(Do).unstar())
        }, " 🗑 取消收藏 ", 8, Ng)
      ])
    ], 64));
  }
}), Bg = X(() => import("./GitHubWorkspaceCard-CyzGZg-T.js")), Fg = X(() => import("./NotificationCenter-H_UQnH4v.js")), Hg = X(() => import("./TabManagerPanel-BBxZEsJi.js")), Kg = X(() => import("./BookmarkNoteMenu-DXrAJcZj.js")), jg = X(() => import("./BookmarkPanel-DQd7Nooc.js")), Vg = X(() => import("./LauncherDialogs-GAZGCZsm.js")), zg = X(() => import("./SettingsDialog-Bfuz8wlC.js")), Gg = X(() => import("./SettingsView-u1kSZfZh.js")), Ug = X(() => import("./ClockSettingsMenu-qSU0PoiU.js")), Yg = X(() => import("./BiliTheaterDialog-ss_rZXix.js")), Xg = X(() => import("./BiliMiniPlayer-BLbmEKkE.js")), qg = X(() => import("./BiliMessagePanel-BdHT7DZE.js")), Jg = X(() => import("./BilibiliWorkspace-DPskTmew.js")), Zg = X(() => import("./AihotFeed-DknCnPBW.js")), Qg = X(() => import("./GitHubTrending-Dup2VwIM.js")), em = X(() => import("./AiDialog-D1JzcdCH.js")), tm = X(() => import("./AihotViewer-FGTHeo4G.js")), om = X(() => import("./NavWheelOverlay-uaCzj24x.js")), nm = X(() => import("./StandaloneHost-CdZXkHYJ.js")), im = X(() => import("./LauncherFolderDialog-DqhyM460.js")), sm = X(() => import("./LauncherMenus-BFJT6zs3.js"));
function de(e, t, o, s) {
  t.spaOwned && document.getElementById("vue-spa-root") || t.id !== "github-workspace" && t.id.startsWith("github-") && document.getElementById("vue-github-workspace-root") || e.register({
    id: t.id,
    title: t.title,
    order: t.order,
    eager: !0,
    roots: [t.root],
    capabilities: t.capabilities,
    mount: ({ getRoot: a }) => {
      const r = a(t.root);
      if (!r) return;
      if (document.getElementById("vue-spa-root") && t.id !== "spa-app")
        return s?.setMounted?.(!0), () => {
          s?.setMounted?.(!1);
        };
      const m = r.innerHTML, f = ii(o);
      f.config.errorHandler = (d, h, b) => {
        console.error(`LogicWeaver Vue feature failed: ${t.id} (${b})`, d), r.dataset.vueError = "1";
      };
      try {
        f.mount(r), s?.setMounted?.(!0);
      } catch (d) {
        throw s?.setMounted?.(!1), r.innerHTML = m, d;
      }
      return () => {
        s?.setMounted?.(!1), f.unmount();
      };
    }
  });
}
function am(e) {
  e.register({
    id: "intro",
    title: "启动动画",
    order: 10,
    eager: !0,
    roots: ["endfield-loader"],
    capabilities: ["ui:intro", "boot:progress"],
    mount: () => {
      const t = document.getElementById("endfield-loader");
      if (!wt.enabled) {
        t?.remove(), document.body.classList.remove("is-starting");
        return;
      }
      if (!t) return;
      const o = ii(Yh);
      let s = !1;
      const a = () => {
        e.stop("intro");
      };
      window.addEventListener("logicweaver:intro-complete", a, { once: !0 }), o.mount(t);
      const r = window.setTimeout(() => {
        wt.finish("基础界面已就绪，在线服务继续后台加载", !0), window.setTimeout(() => {
          s || (a(), t?.remove(), document.body.classList.remove("is-starting"));
        }, 600);
      }, 8e3);
      return () => {
        s || (s = !0, clearTimeout(r), window.removeEventListener("logicweaver:intro-complete", a), o.unmount(), t.remove(), document.body.classList.remove("is-starting"));
      };
    }
  }), de(e, { id: "spa-app", title: "纯血 SPA 单根调度器", order: 15, root: "vue-spa-root", capabilities: ["ui:spa-root", "workspace:keepalive"] }, Bh), document.getElementById("vue-spa-root") || de(e, { id: "bili-companions", title: "b站伴随窗口", order: 19, root: "vue-bili-companions-root", capabilities: ["ui:dock-companion"] }, nm), de(e, { id: "notifications", title: "通知中心", order: 20, root: "vue-notification-root", capabilities: ["ui:toast", "notification:dedupe"] }, Is), de(e, { id: "profile-menu", title: "头像右键菜单", order: 21, root: "bili-profile-menu", capabilities: ["ui:profile-menu", "profile:actions"] }, Xh, Bo), de(e, { id: "workspace-launchers", title: "常用工作区启动项", order: 22, root: "workspace-launchers", capabilities: ["ui:workspace-launchers", "workspace:launch"] }, qh, ui), de(e, { id: "mac-dock", title: "底部快捷应用 Dock 栏", order: 23, root: "mac-dock", capabilities: ["ui:mac-dock", "dock:navigate"] }, Ts, Lt), de(e, { id: "hero-clock", title: "首屏中央时钟", order: 26, root: "hero-clock", capabilities: ["ui:hero-clock", "clock:read"] }, ks), de(e, { id: "search-box", title: "首屏搜索框", order: 27, root: "search", capabilities: ["ui:search-box", "search:actions"] }, Ui), de(e, { id: "home-music", title: "首屏音乐播放器", order: 28, root: "task-thread-home", capabilities: ["ui:home-music", "music:playback"] }, _s, Qe), de(e, { id: "launcher-groups", title: "常用网站分组架", order: 29, root: "launcher-groups", capabilities: ["ui:launcher-groups", "launcher:navigate"] }, Ss, Fe), de(e, { id: "weather-widget", title: "首屏天气小部件", order: 39, root: "weather-body", capabilities: ["ui:weather-widget", "weather:read"] }, bs), de(e, { id: "github-workspace", title: "GitHub 独立页 Vue 工作台", order: 49, root: "vue-github-workspace-root", capabilities: ["ui:github-workspace"] }, Bg), de(e, { id: "github-status", title: "GitHub 同步状态", order: 50, root: "vue-github-status-root", capabilities: ["ui:github-status", "github:sync-read"] }, tf, ri), de(e, { id: "github-folders", title: "GitHub 文件夹导航", order: 55, root: "gh-folder-list", capabilities: ["ui:github-folders", "github:categorize-drop"] }, wf, Io), de(e, { id: "github-hero", title: "GitHub 分类摘要", order: 56, root: "gh-hero", capabilities: ["ui:github-summary", "github:actions"] }, Hf, Mo), de(e, { id: "github-repositories", title: "GitHub 仓库列表", order: 57, root: "vue-github-repositories-root", capabilities: ["ui:github-repositories", "github:repository-actions", "github:paging"] }, Sg, At), de(e, { id: "github-batch-bar", title: "GitHub Star 批量操作工具栏", order: 58, root: "gh-batch-bar", capabilities: ["ui:github-batch-bar", "github:batch-actions"] }, Og, Do), de(e, { id: "notification-center", spaOwned: !0, title: "持久通知中心", order: 71, root: "vue-notification-center-root", capabilities: ["ui:notification-history", "notification:read"] }, Fg, Wt), de(e, { id: "tab-manager", spaOwned: !0, title: "独立标签页管理", order: 71, root: "vue-tab-manager-root", capabilities: ["ui:tab-manager", "tabs:explicit"] }, Hg, ds), de(e, { id: "bookmark-menu", title: "书签上下文操作与备注菜单", order: 72, root: "vue-bookmark-menu-root", capabilities: ["ui:bookmark-menu", "bookmark:edit"] }, Kg, ai), de(e, { id: "launcher-dialogs", title: "快捷启动器管理弹窗族", order: 73, root: "vue-launcher-dialogs-root", capabilities: ["ui:launcher-dialogs", "launcher:manage"] }, Vg, zi), de(e, { id: "launcher-folder-dialog", title: "大文件夹展开视窗", order: 74, root: "vue-launcher-folder-root", capabilities: ["ui:launcher-folder", "launcher:folder-dialog"] }, im, Gi), de(e, { id: "launcher-menus", title: "启动器快捷上下文菜单族", order: 76, root: "vue-launcher-menus-root", capabilities: ["ui:launcher-menus", "launcher:context-menu"] }, sm, ni), de(e, { id: "bookmark-panel", title: "浏览器书签侧边滑动视窗", order: 77, root: "vue-bookmark-panel-root", capabilities: ["ui:bookmark-panel", "bookmarks:panel"] }, jg, bn), de(e, { id: "bookmark-folder-strip", spaOwned: !0, title: "顶栏书签快捷文件夹横条", order: 78, root: "vue-bookmark-folder-strip-root", capabilities: ["ui:bookmark-folder-strip", "bookmarks:strip"] }, null, fn), de(e, { id: "settings-page", title: "独立设置页 Vue 工作台", order: 79, root: "vue-options-root", capabilities: ["ui:settings-page"] }, Gg), de(e, { id: "settings-dialog", title: "全局设置中心视窗", order: 80, root: "vue-settings-dialog-root", capabilities: ["ui:settings-dialog", "settings:manage"] }, zg, Fo), de(e, { id: "clock-settings-menu", spaOwned: !0, title: "中央时钟偏好配置菜单", order: 82, root: "vue-clock-settings-root", capabilities: ["ui:clock-settings", "clock:preference-edit"] }, Ug, Gt), de(e, { id: "bili-theater-dialog", title: "Bilibili 沉浸剧场与评论区弹窗", order: 85, root: "vue-bili-theater-root", capabilities: ["ui:bili-theater", "bili:playback"] }, Yg, Ao), de(e, { id: "bili-mini-player", title: "Bilibili 悬浮迷你播放器", order: 85, root: "vue-bili-mini-player-root", capabilities: ["ui:bili-mini-player", "bili:playback"] }, Xg), de(e, { id: "ai-dialog", title: "AI 助手对话框与知识点抽屉", order: 86, root: "vue-ai-dialog-root", capabilities: ["ui:ai-dialog", "ai:chat"] }, em, pi), de(e, { id: "aihot-viewer", spaOwned: !0, title: "AI HOT 资讯文章阅读器", order: 88, root: "vue-aihot-viewer-root", capabilities: ["ui:aihot-viewer", "viewer:aihot"] }, tm, ci), de(e, { id: "nav-wheel", title: "辐射状快捷动作轮盘与悬浮球", order: 95, root: "vue-nav-wheel-root", capabilities: ["ui:nav-wheel", "nav:radial-menu"] }, om, Pe), de(e, { id: "bili-message-panel", spaOwned: !0, title: "Bilibili 消息与互动通知中心", order: 102, root: "vue-bili-message-panel-root", capabilities: ["ui:bili-message-panel", "bili:messages"] }, qg, Vt), de(e, { id: "bili-favorites", spaOwned: !0, title: "b站插件 Vue 外壳", order: 110, root: "vue-bili-favorites-root", capabilities: ["ui:bili-favorites-shell", "bilibili:favorites"] }, Jg, ts), de(e, { id: "aihot-feed", spaOwned: !0, title: "AI HOT 资讯流全功能聚合看板", order: 112, root: "vue-aihot-root", capabilities: ["ui:aihot-feed", "aihot:aggregate"] }, Zg, os), de(e, { id: "github-trending", spaOwned: !0, title: "GitHub 趋势榜与热门流", order: 114, root: "vue-github-trending-root", capabilities: ["ui:github-trending", "github:trending"] }, Qg, hs);
}
Hs();
const Cn = Na(kn);
hr(kn, Cn);
fr(kn);
am(Cn);
si.loadBookmarks();
(async () => {
  document.getElementById("vue-bili-favorites-root") && !document.getElementById("vue-spa-root") && await import("./bilibili-channel.service-CGchsDLR.js"), await Ha(), await Cn.startEager(), wt.notifyBootReady();
})().catch((e) => console.error("[LogicWeaver] 页面启动失败", e));
window.addEventListener("pagehide", () => {
  Cn.stopAll();
}, { once: !0 });
export {
  xi as C,
  Hp as D,
  wf as G,
  Po as L,
  Cs as T,
  Yh as _,
  Hf as a,
  hs as b,
  ds as c,
  Gt as d,
  Li as e,
  Pm as f,
  Uf as g,
  Ne as h,
  pi as i,
  Xe as j,
  Pe as k,
  wn as l,
  Ls as m,
  ne as n,
  $s as o,
  xs as p,
  qh as q,
  Xh as r,
  ws as s,
  dn as t,
  ti as u,
  Yn as v,
  Ve as w,
  ys as x,
  kn as y
};
