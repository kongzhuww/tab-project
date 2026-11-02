import { S as Ti, i as Es } from "./SearchBox-DK6WgUav.js";
/* empty css                */
import { c as Hn, r as ke, a as Lt, b as N, d as de, o as l, e as ce, w as to, u as s, f as d, g as n, h as M, T as Ps, t as v, F as G, i as fe, j as F, k as gt, l as Bt, m as Ne, v as Ws, n as Fe, p as oo, q as Ii, s as Os, x as ae, y as Ue, z as $t, A as no, B as ye, C as le, D as Ge, E as q, G as z, H as ft, I as wo, J as Mi, K as Yo, L as Re, M as ro, N as Di, O as Bs } from "./vendor-vue-wIH4jcna.js";
import { W as qo, t as Kt, p as dn, n as be, a as Io, b as xt, h as Ve, m as dt, c as ei, d as En, s as un, e as ti, f as Rs, g as Ns, i as Fs, j as Hs, k as U, l as Ai, o as co, q as Ei, r as Ct, u as js, v as ao, w as Vt, x as Mo, y as zs, z as Gs, A as Do, B as Ks } from "./view-styles-j4a6MYd3.js";
import { l as Vs, r as Us, G as Ys, a as oe, b as on, f as Xo, c as jn, s as qs, d as Xs, e as zn, g as Jo, h as Gn, i as At, j as Co, k as yt, m as xo, n as Ut, o as De, p as Js, q as et, t as it, u as wt, v as bo, R as Zs, w as Qs, x as St, y as Dt, z as Ce, A as er, B as Ht } from "./search.service-B8FaDQLd.js";
import { f as qe, l as kt, a as Te, p as tr, b as Lo, c as eo, y as Pi, d as re, e as jt } from "./youtube-store-DxCxyYyr.js";
import { c as or, a as nr, t as ir, b as sr, d as rr, e as ar, f as Yt, g as lr } from "./calendar.service-_YumC_hP.js";
import { w as Me, s as Kn, P as cr, i as Zo, D as pn, a as oi, g as Xe, p as dr, L as ur, b as Tt, c as pr, d as fn, t as ni, e as fr, f as gr, h as To, l as Wi } from "./window-manager.store-DgNn9Rtk.js";
import { s as nn, a as hr, b as mr, u as Oi } from "./InlineEditStatus.vue_vue_type_style_index_0_scoped_28642927_lang-BiNio4cP.js";
import { b as $o, a as vr, c as yr } from "./up-group-manager-store-DfmXILJr.js";
import { biliMessagePanelController as Et, biliMessagePanelState as wr } from "./message-panel-store-B2Bs0rB1.js";
import { b as Bi, r as br, a as uo } from "./bili-favorites-store-CesSfjvY.js";
import { a as Vn, b as Ri, c as kr } from "./aihot-feed-store-DYKldREI.js";
import { p as Ni } from "./pricing-store-7Kn4RVvy.js";
import { R as _r } from "./read-session-DQk1qcgF.js";
import { f as Pt } from "./fullscreen-cards.store-DeW7AeHr.js";
import { k as Cr, m as xr } from "./core-utils-Ccz-tarm.js";
import { _ as Ie } from "./_plugin-vue_export-helper-CHgC5LLL.js";
import { t as st } from "./together-listen.store-CZrz5fHj.js";
import { C as Lr } from "./ChatShareMenu-RqZnAxcU.js";
const $r = /^[a-z][a-z0-9]*(?:[.:-][a-z0-9]+)*$/;
function Sr() {
  const e = /* @__PURE__ */ new Map(), t = /* @__PURE__ */ new Map();
  function o(u) {
    if (!u || !$r.test(u.id)) throw new TypeError(`Invalid command id: ${u?.id || ""}`);
    if (!u.title?.trim() || !u.category?.trim() || typeof u.run != "function")
      throw new TypeError(`Command ${u.id} requires title, category and run()`);
    if (e.has(u.id)) throw new Error(`Command already registered: ${u.id}`);
    return e.set(u.id, Object.freeze({
      ...u,
      description: u.description || "",
      keywords: Object.freeze([...u.keywords || []]),
      concurrency: u.concurrency || "replace"
    })), () => {
      i(u.id), e.delete(u.id);
    };
  }
  function i(u) {
    const x = t.get(u);
    return x ? (x.abort(), t.delete(u), !0) : !1;
  }
  async function r(u, x, k = "api") {
    const T = e.get(u);
    if (!T) throw new Error(`Unknown command: ${u}`);
    if (T.enabled && !T.enabled()) return;
    const g = T.concurrency || "replace";
    if (t.has(u)) {
      if (g === "drop") return;
      g === "replace" && i(u);
    }
    const p = new AbortController();
    g !== "parallel" && t.set(u, p);
    try {
      return await T.run(x, { signal: p.signal, source: k });
    } finally {
      t.get(u) === p && t.delete(u);
    }
  }
  function a(u) {
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
  function h() {
    return Object.freeze([...e.values()].map(a).sort((u, x) => u.category.localeCompare(x.category, "zh") || u.title.localeCompare(x.title, "zh")));
  }
  function f(u, x = 20) {
    const k = String(u || "").trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
    if (!k.length) return h().slice(0, x);
    const T = [...e.values()].map((g) => {
      const p = a(g), c = p.title.toLocaleLowerCase(), y = `${p.id} ${c} ${p.category} ${p.description} ${p.keywords.join(" ")}`.toLocaleLowerCase();
      if (!k.every((b) => y.includes(b))) return null;
      let $ = 0;
      for (const b of k)
        p.id === b ? $ += 200 : p.id.startsWith(b) && ($ += 120), c === b ? $ += 160 : c.startsWith(b) ? $ += 100 : c.includes(b) && ($ += 60), p.keywords.some((L) => L.toLocaleLowerCase().startsWith(b)) && ($ += 40);
      return { item: p, score: $ };
    }).filter((g) => !!g);
    return T.sort((g, p) => p.score - g.score || g.item.title.localeCompare(p.item.title, "zh")), Object.freeze(T.slice(0, Math.max(1, x)).map((g) => g.item));
  }
  return Object.freeze({ register: o, execute: r, cancel: i, has: (u) => e.has(u), list: h, search: f });
}
const sn = Sr(), Tr = /^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/;
function Ir(e) {
  const t = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
  function a(g) {
    if (!g || !Tr.test(g.id)) throw new TypeError(`Invalid feature id: ${g?.id || ""}`);
    if (!g.title?.trim() || typeof g.mount != "function") throw new TypeError(`Feature ${g.id} requires title and mount()`);
    if (t.has(g.id)) throw new Error(`Feature already registered: ${g.id}`);
    return t.set(g.id, Object.freeze({
      ...g,
      order: Number(g.order) || 100,
      eager: g.eager === !0,
      roots: Object.freeze([...g.roots || []]),
      capabilities: Object.freeze([...g.capabilities || []])
    })), () => {
      u(g.id), r.delete(g.id), t.delete(g.id);
    };
  }
  function h(g) {
    return typeof g == "function" ? g : g && typeof g.unmount == "function" ? () => g.unmount() : () => {
    };
  }
  function f(g) {
    if (o.has(g)) return Promise.resolve(o.get(g)?.cleanup);
    if (i.has(g)) return i.get(g);
    const p = t.get(g);
    if (!p) return Promise.reject(new Error(`Unknown feature: ${g}`));
    r.delete(g);
    const c = new AbortController(), y = Object.freeze({
      signal: c.signal,
      commands: e,
      getRoot: (b) => document.getElementById(b)
    }), $ = Promise.resolve().then(() => p.mount(y)).then((b) => (i.delete(g), o.set(g, { cleanup: b, controller: c }), b), (b) => {
      throw i.delete(g), r.set(g, b), c.abort(), b;
    });
    return i.set(g, $), $;
  }
  async function u(g) {
    const p = i.get(g);
    if (p)
      try {
        await p;
      } catch {
        return;
      }
    const c = o.get(g);
    c && (o.delete(g), c.controller.abort(), await h(c.cleanup)());
  }
  async function x() {
    const g = typeof document < "u" && !!(document.getElementById("vue-spa-root") || document.getElementById("logicweaver-spa-root")), p = [...t.values()].filter(($) => !(!$.eager || !g && $.roots && $.roots.length > 0 && !$.roots.some((L) => !!document.getElementById(L)))).sort(($, b) => ($.order || 100) - (b.order || 100)), y = (await Promise.allSettled(p.map(($) => f($.id)))).flatMap(($, b) => $.status === "rejected" ? [{ id: p[b].id, reason: $.reason }] : []);
    y.length && console.warn("LogicWeaver Vue features failed to mount", y);
  }
  async function k() {
    const g = [...o.keys()].reverse();
    await Promise.allSettled(g.map(u));
  }
  function T() {
    return Object.freeze([...t.values()].map((g) => Object.freeze({
      id: g.id,
      title: g.title,
      order: g.order || 100,
      eager: g.eager === !0,
      roots: Object.freeze([...g.roots || []]),
      capabilities: Object.freeze([...g.capabilities || []]),
      status: i.has(g.id) ? "mounting" : o.has(g.id) ? "mounted" : r.has(g.id) ? "failed" : "registered",
      error: r.has(g.id) ? String(r.get(g.id)?.message || r.get(g.id) || "Feature mount failed") : ""
    })).sort((g, p) => g.order - p.order));
  }
  return Object.freeze({ register: a, start: f, startEager: x, stop: u, stopAll: k, has: (g) => t.has(g), list: T });
}
const Mr = localStorage.getItem("startupAnimationStyle") || localStorage.getItem("logicweaverStartupStyle") || "endfield", ii = (() => {
  try {
    const e = localStorage.getItem("showStartupAnimation"), t = localStorage.getItem("logicweaverEndfieldLoader"), o = e ?? t;
    return o === "1" || o === "true";
  } catch {
    return !1;
  }
})(), X = ke({
  enabled: ii,
  style: Mr === "rhinelab" ? "rhinelab" : "endfield",
  renderedProgress: 4,
  targetProgress: 4,
  status: "CORE SHELL...",
  finished: !ii,
  exiting: !1,
  forced: !1
});
let io = 0, Qo = 4, Fi = performance.now(), Pn = 0, Ho = null, Wn = !1;
function Hi(e) {
  const t = e - Fi, o = Pn ? Math.min(1, t / Pn) : 1, i = o * o * (3 - 2 * o);
  X.renderedProgress = Qo + (X.targetProgress - Qo) * i, o < 1 && !X.finished ? io = requestAnimationFrame(Hi) : io = 0;
}
function jo(e, t) {
  if (!X.enabled || X.finished) return;
  const o = Math.max(X.targetProgress, Math.max(4, Math.min(100, Number(e) || 4)));
  t && (X.status = t), Qo = X.renderedProgress, X.targetProgress = o, Fi = performance.now(), Pn = Math.max(280, Math.min(920, 220 + Math.abs(o - Qo) * 7.5)), cancelAnimationFrame(io), io = requestAnimationFrame(Hi);
}
function rn(e = "Ready", t = !1) {
  X.finished || (X.finished = !0, X.forced = t, X.status = e, X.targetProgress = 100, cancelAnimationFrame(io), io = 0, X.renderedProgress = 100, Ho?.(t));
}
function Dr(e = "KEYBOARD SKIP") {
  rn(e, !0);
}
function Ar() {
  X.enabled || rn("BOOT COMPLETE", !0);
}
function ji() {
  !X.enabled || X.finished || Wn || (Wn = !0, jo(38, "INITIALIZING CORE SHELL..."), setTimeout(() => {
    X.finished || jo(76, "SYNTHESIZING RUNTIME...");
  }, 400), setTimeout(() => {
    X.finished || jo(100, X.style === "rhinelab" ? "ID CONFIRMED : JOYCE MOORE" : "TERRA LINK READY / 终端就绪");
  }, 900), setTimeout(() => {
    X.finished || rn("BOOT COMPLETE / 首页就绪", !1);
  }, 1650));
}
async function Er() {
  if (document.getElementById("vue-spa-root")) {
    try {
      const e = await chrome.storage.local.get(["showStartupAnimation", "startupAnimationStyle"]);
      typeof e.showStartupAnimation == "boolean" && (X.enabled = e.showStartupAnimation, localStorage.setItem("showStartupAnimation", X.enabled ? "1" : "0"), localStorage.setItem("logicweaverEndfieldLoader", X.enabled ? "1" : "0")), (e.startupAnimationStyle === "endfield" || e.startupAnimationStyle === "rhinelab") && (X.style = e.startupAnimationStyle, localStorage.setItem("startupAnimationStyle", X.style));
    } catch {
      console.warn("[Intro] Startup preferences unavailable; using first-paint preference.");
    }
    X.finished = !X.enabled, document.documentElement.dataset.startupStyle = X.style, document.documentElement.classList.toggle("skip-endfield-loader", !X.enabled), document.body.classList.toggle("is-starting", X.enabled);
  }
}
const tt = Lt(X), at = Object.freeze({
  update: jo,
  finish: rn,
  skip: Dr,
  notifyBootReady: Ar,
  async playIntro(e) {
    if (e?.style && (X.style = e.style), typeof document < "u" && (document.documentElement.dataset.startupStyle = X.style, document.documentElement.classList.remove("skip-endfield-loader"), document.body.classList.add("is-starting")), X.enabled = !0, X.finished = !1, X.forced = !!e?.force, X.renderedProgress = 4, X.targetProgress = 4, Wn = !1, typeof document < "u") {
      let t = document.getElementById("endfield-loader");
      if (!t) {
        t = document.createElement("div"), t.id = "endfield-loader", t.className = "endfield-loader notranslate", document.body.appendChild(t);
        const { default: o } = await import("./IntroAnimation-BwZMbgJf.js"), i = Hn(o), r = () => {
          window.removeEventListener("logicweaver:intro-complete", r), i.unmount(), t?.remove(), document.body.classList.remove("is-starting");
        };
        window.addEventListener("logicweaver:intro-complete", r, { once: !0 }), i.mount(t);
      }
    }
    ji();
  },
  get enabled() {
    return X.enabled;
  },
  get finished() {
    return X.finished;
  }
});
function Pr(e) {
  return Ho = e, X.finished && e(X.forced), () => {
    Ho === e && (Ho = null);
  };
}
const zi = [
  { date: "今天", dayName: "周四", emoji: "🌤️", condition: "多云", highTemp: 26, lowTemp: 18, rainProb: 15 },
  { date: "明天", dayName: "周五", emoji: "⛅", condition: "阴天", highTemp: 24, lowTemp: 17, rainProb: 30 },
  { date: "后天", dayName: "周六", emoji: "🌧️", condition: "小雨", highTemp: 21, lowTemp: 16, rainProb: 75 },
  { date: "周日", dayName: "周日", emoji: "🌦️", condition: "阵雨", highTemp: 23, lowTemp: 15, rainProb: 45 },
  { date: "周一", dayName: "周一", emoji: "☀️", condition: "晴天", highTemp: 27, lowTemp: 18, rainProb: 10 },
  { date: "周二", dayName: "周二", emoji: "🌤️", condition: "多云", highTemp: 28, lowTemp: 19, rainProb: 15 },
  { date: "周三", dayName: "周三", emoji: "☀️", condition: "晴天", highTemp: 29, lowTemp: 20, rainProb: 5 }
], Gi = "lw_weather_snapshot_v1";
function Wr() {
  if (typeof window > "u" || typeof localStorage > "u") return null;
  try {
    const e = localStorage.getItem(Gi);
    if (!e) return null;
    const t = JSON.parse(e);
    if (t && t.data && t.data.currentTemp !== void 0)
      return {
        state: "ready",
        city: t.city || t.data.cityName || "",
        data: t.data,
        forecastDays: Array.isArray(t.forecastDays) && t.forecastDays.length ? t.forecastDays : zi,
        detailInfo: t.detailInfo || null,
        updatedAt: t.savedAt || Date.now()
      };
  } catch {
  }
  return null;
}
function Ao(e) {
  if (!(typeof window > "u" || typeof localStorage > "u"))
    try {
      e.data && localStorage.setItem(
        Gi,
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
const Or = () => {
  const e = Wr();
  return {
    state: e?.state || "loading",
    city: e?.city || "",
    errorMessage: "",
    data: e?.data || null,
    updatedAt: e?.updatedAt || null,
    forecastModalOpen: !1,
    forecastDays: e?.forecastDays || zi,
    detailInfo: e?.detailInfo || {
      humidity: "62%",
      wind: "东北风 2级",
      uvIndex: "中等 (4)",
      airQuality: "优 (32)"
    }
  };
}, j = ke(Or());
let gn = null, hn = null;
const nt = {
  get snapshot() {
    return Lt(j);
  },
  update(e) {
    Object.assign(j, e), Ao(j);
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
    }), Ao(j);
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
    })) : [], Ao(j);
  },
  setDetailInfo(e) {
    j.detailInfo = { ...e }, Ao(j);
  },
  applyCity(e) {
    typeof window < "u" && window.dispatchEvent(new CustomEvent("logicweaver:weather-city-selected", { detail: { city: e } })), this.refresh();
  },
  refresh() {
    gn ? gn() : typeof window < "u" && window.dispatchEvent(new CustomEvent("logicweaver:weather-refresh"));
  },
  changeLocation(e) {
    hn ? hn(e) : typeof window < "u" && window.dispatchEvent(new CustomEvent("logicweaver:weather-change-location", { detail: { clientX: e?.clientX, clientY: e?.clientY } }));
  },
  setRefreshAction(e) {
    gn = e;
  },
  setChangeLocationAction(e) {
    hn = e;
  }
}, Br = () => ({
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
}), ve = ke(Br());
let mn = null;
const qt = {
  get snapshot() {
    return Lt(ve);
  },
  update(e) {
    Object.assign(ve, e);
  },
  updateTime(e, t, o, i) {
    ve.timeText = e, ve.secsText = t, ve.greetingText = o, ve.dateText = i, ve.updatedAt = Date.now();
  },
  applyConfig(e) {
    e.fontFamily !== void 0 && (ve.fontFamily = e.fontFamily), e.colorHex !== void 0 && (ve.colorHex = e.colorHex), e.greetColor !== void 0 && (ve.greetColor = e.greetColor), e.dateColor !== void 0 && (ve.dateColor = e.dateColor), e.isBlack !== void 0 && (ve.isBlack = e.isBlack), e.isCustomColor !== void 0 && (ve.isCustomColor = e.isCustomColor), ve.updatedAt = Date.now();
  },
  openSettings(e) {
    mn ? mn(e) : window.dispatchEvent(new CustomEvent("logicweaver:clock-open-settings", { detail: { clientX: e?.clientX, clientY: e?.clientY } }));
  },
  setOpenSettingsAction(e) {
    mn = e;
  }
}, Rr = [
  { id: "ai", title: "AI 助手" },
  { id: "todoist", title: "Todoist" },
  { id: "stickers", title: "表情包" },
  { id: "calcom", title: "预约" },
  { id: "wallpaper", title: "壁纸库" }
], Nr = () => ({
  mounted: !1,
  visible: !1,
  items: [...Rr]
}), vn = ke(Nr());
let Eo = {};
const Un = {
  getSnapshot() {
    return Lt(vn);
  },
  update(e) {
    Object.assign(vn, e);
  },
  setMounted(e) {
    vn.mounted = e;
  },
  openWorkspace(e, t = !1) {
    if (Eo.open) {
      Eo.open(e);
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
    const r = document.getElementById(`${e}-top-open`);
    r && !t ? r.click() : window.dispatchEvent(new CustomEvent("logicweaver:open-workspace", { detail: { id: e } }));
  },
  setActions(e) {
    Eo = { ...Eo, ...e };
  }
}, yn = ke({ visible: !1, pendingWrites: 0 });
async function Fr(e) {
  if (yn.pendingWrites) throw new Error("壁纸操作正在处理，未自动排队");
  yn.pendingWrites++;
  try {
    return await e();
  } finally {
    yn.pendingWrites--;
  }
}
const si = {
  openDialog() {
    Me.open("wallpaper");
  },
  closeDialog() {
    Me.close("wallpaper");
  },
  resetDefault() {
    return Fr(() => qo.clearWallpaper());
  }
}, ri = [
  { id: "mono", label: "极简等宽", font: "ui-monospace, 'SF Mono', 'JetBrains Mono', Menlo, Consolas, monospace", sample: "15:50:10" },
  { id: "sans", label: "现代无衬线", font: "-apple-system, BlinkMacSystemFont, 'Segoe UI Variable Display', 'Segoe UI', Roboto, 'PingFang SC', sans-serif", sample: "15:50:10" },
  { id: "din", label: "经典几何", font: "'DIN Alternate', 'DIN Pro', 'Franklin Gothic Medium', Futura, sans-serif", sample: "15:50:10" },
  { id: "digital", label: "数码管等宽", font: "'Courier New', Courier, monospace", sample: "15:50:10" },
  { id: "impact", label: "硬派力量", font: "Impact, 'Arial Black', 'Trebuchet MS', sans-serif", sample: "15:50:10" },
  { id: "serif", label: "典雅衬线", font: "'Playfair Display', Georgia, 'Times New Roman', serif", sample: "15:50:10" },
  { id: "rounded", label: "圆润亲和", font: "'Quicksand', 'Comic Sans MS', 'Segoe UI', sans-serif", sample: "15:50:10" }
], ai = [
  { id: "white", label: "纯净皓白 (默认)", hex: "#ffffff" },
  { id: "black", label: "曜石极黑", hex: "#0f172a" },
  { id: "gold", label: "香槟金砂", hex: "#f59e0b" },
  { id: "cyan", label: "科技青蓝", hex: "#38bdf8" },
  { id: "emerald", label: "翡翠竹绿", hex: "#10b981" },
  { id: "rose", label: "淡雅樱粉", hex: "#fb7185" }
], bh = [
  { id: "local", label: "📍 本地系统时区", offset: "Local" },
  { id: "Asia/Shanghai", label: "🇨🇳 北京 / 香港", offset: "UTC+8" },
  { id: "Asia/Tokyo", label: "🇯🇵 东京 / 首尔", offset: "UTC+9" },
  { id: "Europe/London", label: "🇬🇧 伦敦 / 格林威治", offset: "UTC+0/+1" },
  { id: "Europe/Paris", label: "🇫🇷 巴黎 / 柏林", offset: "UTC+1/+2" },
  { id: "America/New_York", label: "🇺🇸 纽约 / 东部时间", offset: "UTC-5/-4" },
  { id: "America/Los_Angeles", label: "🇺🇸 洛杉矶 / 西部时间", offset: "UTC-8/-7" },
  { id: "Australia/Sydney", label: "🇦🇺 悉尼", offset: "UTC+10/+11" },
  { id: "UTC", label: "🌐 协调世界时 (UTC)", offset: "UTC" }
], xe = ke({
  mounted: !1,
  isOpen: !1,
  x: 200,
  y: 200,
  font: "mono",
  color: "white",
  timezone: "local"
});
let wn = null;
const Wt = {
  state: xe,
  setMounted(e) {
    xe.mounted = e;
  },
  onAction(e) {
    wn = e;
  },
  dispatch(e, t) {
    if (wn)
      return wn(e, t);
  },
  open(e) {
    const i = typeof window < "u" ? window.innerWidth : 1280, r = typeof window < "u" ? window.innerHeight : 800, a = e?.clientX ?? e?.x ?? i / 2, h = e?.clientY ?? e?.y ?? r / 2, f = Math.max(12, Math.min(a - 40, i - 290 - 12)), u = Math.max(12, Math.min(h + 10, r - 420 - 12));
    xe.x = f, xe.y = u, xe.isOpen = !0, this.dispatch("open", { x: f, y: u });
  },
  close() {
    xe.isOpen = !1, this.dispatch("close");
  },
  setFont(e) {
    xe.font = e;
    const t = ri.find((o) => o.id === e);
    if (t) {
      qt.applyConfig({ fontFamily: t.font });
      try {
        localStorage.setItem("lw_clock_font", e);
      } catch {
      }
    }
    this.dispatch("change", { font: e, color: xe.color, timezone: xe.timezone });
  },
  setColor(e) {
    xe.color = e;
    const t = ai.find((o) => o.id === e);
    if (t) {
      qt.applyConfig({
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
    this.dispatch("change", { font: xe.font, color: e, timezone: xe.timezone });
  },
  setTimezone(e) {
    xe.timezone = e;
    try {
      localStorage.setItem("lw_clock_tz", e);
    } catch {
    }
    this.dispatch("change", { font: xe.font, color: xe.color, timezone: e });
  },
  initPreferences() {
    try {
      const e = localStorage.getItem("lw_clock_font");
      if (e) {
        xe.font = e;
        const i = ri.find((r) => r.id === e);
        i && qt.applyConfig({ fontFamily: i.font });
      }
      const t = localStorage.getItem("lw_clock_color");
      if (t) {
        xe.color = t;
        const i = ai.find((r) => r.id === t);
        i && qt.applyConfig({ colorHex: i.hex, greetColor: i.hex, dateColor: i.hex, isCustomColor: !0 });
      }
      const o = localStorage.getItem("lw_clock_tz");
      o && (xe.timezone = o);
    } catch {
    }
  },
  syncConfig(e) {
    e.font && (xe.font = e.font), e.color && (xe.color = e.color), e.timezone && (xe.timezone = e.timezone);
  }
}, ue = ke({
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
let bn = null, zo = !1;
async function Go(e, t = {}) {
  if (e === "poll") return { state: "ready", model: ue.model };
  if (e === "connect") return { state: "ready", model: ue.model };
  throw new Error("旧版 AI 对话桥接已退役，请使用「海狸聊天室」开启智能会话。");
}
function Ki(e) {
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
  o || (e.state === "connecting" ? o = "正在连接本机 Codex 与 ChatGPT…" : e.state === "disconnected" ? o = "已待命（打开面板自动连接）" : e.authenticated ? o = `就绪 · ChatGPT ${e.plan || "已登录"}` : e.state === "ready" ? o = "就绪 · 尚未登录 ChatGPT" : o = t[e.state] || e.state), ue.statusText = o, ue.authHidden = !e.loginUrl, ue.authCode = e.loginCode || "", ue.authLink = e.loginUrl || "https://auth.openai.com/codex/device", ue.isStreaming = zo || e.busy || e.state === "running";
}
async function Hr() {
  try {
    const e = await Go("poll");
    Ki(e);
  } catch {
  }
}
async function jr(e, t) {
  if (e === "open" || e === "connect")
    try {
      ue.statusText = "正在连接本机 Codex 与 ChatGPT…";
      const o = await Go("connect");
      Ki(o);
    } catch (o) {
      ue.statusText = o?.message || "连接失败";
    }
  else if (e === "send" && t?.text) {
    const o = t.text;
    ue.messages.push({
      id: `msg-${Date.now()}`,
      role: "user",
      content: o
    }), ue.inputText = "", ue.isStreaming = !0, zo = !0;
    try {
      await Go("send", { text: o }), await Hr();
    } catch (i) {
      ue.statusText = i?.message || "发送失败";
    } finally {
      zo = !1, ue.isStreaming = !1;
    }
  } else if (e === "stop") {
    try {
      await Go("stop");
    } catch {
    }
    ue.isStreaming = !1, zo = !1;
  }
}
const Yn = {
  state: ue,
  setMounted(e) {
    ue.mounted = e;
  },
  onAction(e) {
    bn = e;
  },
  dispatch(e, t) {
    if (bn)
      return bn(e, t);
    jr(e, t);
  },
  open() {
    ue.isOpen = !0, this.dispatch("open");
  },
  close() {
    ue.isOpen = !1, this.dispatch("close");
  },
  newChat() {
    ue.messages = [], ue.inputText = "", ue.kwShelfHidden = !0, ue.keywords = [], this.dispatch("newChat");
  },
  send() {
    const e = ue.inputText.trim();
    !e || ue.isStreaming || this.dispatch("send", { text: e });
  },
  stop() {
    ue.isStreaming = !1, this.dispatch("stop");
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
    ue.keywords.forEach((t) => t.selected = e), this.dispatch("selectAllKeywords", { all: e });
  },
  toggleKeyword(e) {
    ue.keywords[e] && (ue.keywords[e].selected = !ue.keywords[e].selected, this.dispatch("toggleKeyword", { index: e, selected: ue.keywords[e].selected }));
  },
  deepDiveKeywords() {
    const e = ue.keywords.filter((t) => t.selected).map((t) => t.text);
    this.dispatch("deepDiveKeywords", { selected: e });
  }
}, kn = ke({
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
}), Po = /* @__PURE__ */ new Set(), zr = {
  state: kn,
  open(e) {
    Object.assign(kn, e, { open: !0 });
  },
  update(e) {
    Object.assign(kn, e);
  },
  close() {
    Po.forEach((e) => e("close"));
  },
  save(e) {
    Po.forEach((t) => t("save", e));
  },
  onAction(e) {
    return Po.add(e), () => Po.delete(e);
  }
}, Ko = ke({ isOpen: !1 }), Vi = {
  state: Ko,
  open() {
    Ko.isOpen = !0;
  },
  close() {
    Ko.isOpen = !1;
  }
}, _n = "biliProfileCacheV1", lt = "biliLocallyKnownMessageIdsV1", Wo = "biliMessageUserCacheV1", po = "githubKnownReleaseVersionsV1", Oo = "customNewtabAvatar", li = "biliToastKnownCountsV1";
class Gr {
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
    !t?.repository || !t?.version || (this.githubKnownVersions[t.repository] = t.version, typeof chrome < "u" && chrome?.storage?.local && await chrome.storage.local.set({ [po]: this.githubKnownVersions }), this.notifyGitHubListeners());
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
    return ["reply", "at", "like", "system", "private"].forEach((r) => {
      const a = Math.max(0, Number(this.unread?.[r] || 0));
      let h = Array.isArray(this.locallyKnownIds?.[r]) ? this.locallyKnownIds[r] : [];
      a < h.length && (h = [], this.locallyKnownIds[r] = [], o = !0), t[r] = Math.max(0, a - h.length);
    }), o && typeof chrome < "u" && chrome?.storage?.local && chrome.storage.local.set({ [lt]: this.locallyKnownIds }).catch(() => {
    }), t;
  }
  markKnown(t, o, i) {
    this.locallyKnownIds[t] || (this.locallyKnownIds[t] = []);
    let r = !1;
    o && !this.locallyKnownIds[t].includes(o) && (this.locallyKnownIds[t].push(o), r = !0), i && !this.locallyKnownIds[t].includes(i) && (this.locallyKnownIds[t].push(i), r = !0), r && typeof chrome < "u" && chrome?.storage?.local && chrome.storage.local.set({ [lt]: this.locallyKnownIds }).catch(() => {
    }), this.applyBiliProfile(this.profile, this.unread);
  }
  markAllKnown(t, o = []) {
    this.locallyKnownIds[t] || (this.locallyKnownIds[t] = []);
    const i = new Set(this.locallyKnownIds[t]);
    for (const a of o) a && i.add(a);
    const r = Math.max(0, Number(this.unread?.[t] || 0));
    if (i.size < r) {
      const a = r - i.size;
      for (let h = 0; h < a; h++) i.add(`__pad_${Date.now()}_${h}`);
    }
    this.locallyKnownIds[t] = Array.from(i), typeof chrome < "u" && chrome?.storage?.local && chrome.storage.local.set({ [lt]: this.locallyKnownIds }).catch(() => {
    }), this.applyBiliProfile(this.profile, this.unread);
  }
  applyBiliProfile(t, o = {}) {
    this.profile = t || null, this.unread = o || {};
    const r = this.customAvatar || String(t?.face || "assets/bilibili.svg").replace(/^http:/, "https:"), a = this.getVisibleUnread();
    if (Kt.avatarUrl = r, Kt.userName = t?.uname || "哔哩哔哩用户", Kt.buttonTitle = "通知中心", dn.avatarUrl = r, dn.userName = t?.uname || "用户", dn.mid = t?.mid, typeof document < "u") {
      const h = document.getElementById("bili-profile-avatar");
      h && (h.src = r);
      const f = document.getElementById("bili-profile-button");
      f && (f.title = Kt.buttonTitle);
    }
    Et.updateState({
      userName: t?.uname || "哔哩哔哩用户",
      userMid: t?.mid ? String(t.mid) : "",
      userAvatar: r,
      unreadCounts: {
        reply: Number(a.reply || 0),
        at: Number(a.at || 0),
        like: Number(a.like || 0),
        system: Number(a.system || 0),
        private: Number(a.private || 0)
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
        }, [r, a, h] = await Promise.allSettled([
          fetch("https://api.bilibili.com/x/msgfeed/unread?build=0&mobi_app=web", { credentials: "include" }).then((p) => p.json()),
          fetch("https://api.vc.bilibili.com/x/im/web/msgfeed/unread", { credentials: "include" }).then((p) => p.json()),
          fetch("https://api.vc.bilibili.com/session_svr/v1/session_svr/single_unread", { credentials: "include" }).then((p) => p.json())
        ]), f = r.status === "fulfilled" ? r.value?.data || {} : {}, u = a.status === "fulfilled" ? a.value?.data || {} : {}, x = h.status === "fulfilled" ? h.value?.data || {} : {}, k = Number(u.at || 0), T = u.reply != null ? Number(u.reply || 0) : Math.max(0, Number(u.recv_reply || 0) - k), g = {
          reply: Math.max(Number(f.reply || 0), T),
          at: Math.max(Number(f.at || 0), k),
          like: Math.max(
            Number(f.like || f.praise || 0),
            Number(u.like || u.recv_like || 0)
          ),
          system: Math.max(Number(f.sys_msg || f.system || 0), Number(u.sys_msg || 0)),
          private: Number(
            f.chat || u.chat || Number(x.follow_unread || 0) + Number(x.unfollow_unread || 0) + Number(x.dustbin_push_msg || 0)
          )
        };
        this.applyBiliProfile(i, g), typeof chrome < "u" && chrome?.storage?.local && await chrome.storage.local.set({ [_n]: { profile: i, unread: g, savedAt: Date.now() } }), this.checkAndNotifyBiliInteractions(g);
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
      this.biliToastKnownCounts = { ...o }, typeof chrome < "u" && chrome?.storage?.local && chrome.storage.local.set({ [li]: this.biliToastKnownCounts }).catch(() => {
      });
      return;
    }
    const i = o.private - Number(this.biliToastKnownCounts.private || 0);
    o.like - Number(this.biliToastKnownCounts.like || 0);
    const r = o.reply - Number(this.biliToastKnownCounts.reply || 0), a = o.at - Number(this.biliToastKnownCounts.at || 0);
    o.system - Number(this.biliToastKnownCounts.system || 0), this.biliToastKnownCounts = { ...o }, typeof chrome < "u" && chrome?.storage?.local && chrome.storage.local.set({ [li]: this.biliToastKnownCounts }).catch(() => {
    }), i > 0 && be.show({
      appType: "bili",
      appName: "哔哩哔哩",
      icon: "assets/bilibili.svg",
      title: i > 1 ? `收到 ${i} 条新私信` : "收到新的私信",
      subtitle: "B站私信消息",
      message: "有人给你发送了私信，点击查看对话",
      target: { type: "bili-messages" },
      actionLabel: "查看私信",
      showActions: !0,
      onClick: () => {
        Et.openPanel();
      }
    }), r > 0 && be.show({
      appType: "bili",
      appName: "哔哩哔哩",
      icon: "assets/bilibili.svg",
      title: r > 1 ? `收到 ${r} 条新回复` : "收到新的评论回复",
      subtitle: "评论回复通知",
      message: "有人在评论区回复了你",
      target: { type: "bili-messages" },
      actionLabel: "查看回复",
      showActions: !0,
      onClick: () => {
        Et.openPanel();
      }
    }), a > 0 && be.show({
      appType: "bili",
      appName: "哔哩哔哩",
      icon: "assets/bilibili.svg",
      title: a > 1 ? `收到 ${a} 次新提及` : "有人 @了你",
      subtitle: "提到我的通知",
      message: "有人在动态或评论中 @了你",
      target: { type: "bili-messages" },
      actionLabel: "查看提及",
      showActions: !0,
      onClick: () => {
        Et.openPanel();
      }
    });
  }
  init() {
    this.initialized || (this.initialized = !0, Io.setActions({
      onAction: async (t) => {
        if (t === "messages")
          xt.open();
        else if (t === "tabs")
          Vi.open();
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
      _n,
      lt,
      Wo,
      po,
      Oo
    ]).then((t) => {
      this.customAvatar = t[Oo] || "", this.locallyKnownIds = t[lt] && typeof t[lt] == "object" ? t[lt] : {}, this.userCache = t[Wo] && typeof t[Wo] == "object" ? t[Wo] : {}, this.githubKnownVersions = t[po] && typeof t[po] == "object" ? t[po] : {};
      const o = t[_n];
      o?.profile ? this.applyBiliProfile(o.profile, o.unread || {}) : this.applyBiliProfile(null, {});
    }).catch(() => {
    }), chrome.storage.onChanged && chrome.storage.onChanged.addListener((t, o) => {
      o === "local" && (t[Oo] && (this.customAvatar = t[Oo].newValue || "", this.applyBiliProfile(this.profile, this.unread)), t[lt] && (this.locallyKnownIds = t[lt].newValue || {}, this.applyBiliProfile(this.profile, this.unread)));
    })), Et.onAction((t, o) => {
      t === "mark-known" ? this.markKnown(o.kind, o.id, o.talkerId) : t === "mark-all-known" && this.markAllKnown(o.kind, o.ids);
    }), this.refreshBiliProfile(), setTimeout(() => {
      this.loadGitHubUpdates();
    }, 3500));
  }
}
const ci = new Gr(), pe = ke({ open: !1, loading: !1, error: "", mid: "", name: "", face: "", sign: "", followed: !1, submitting: !1, left: 12, top: 12, videos: [] });
let Bo = null;
const Vo = {
  state: pe,
  open(e, t) {
    Bo = t, Object.assign(pe, { open: !0, loading: !0, error: "", submitting: !1, videos: [] }, e);
  },
  update(e) {
    Object.assign(pe, e);
  },
  close() {
    pe.submitting || (pe.open = !1, Bo = null);
  },
  async toggleFollow() {
    if (!(!Bo || pe.submitting)) {
      pe.submitting = !0;
      try {
        const e = !pe.followed;
        await Bo(e) && (pe.followed = e);
      } finally {
        pe.submitting = !1;
      }
    }
  }
}, we = ke({
  currentTab: "stars",
  rangeText: "近 7 天",
  sinceDays: 7,
  repos: [],
  isLoading: !1,
  errorMessage: "",
  sourceText: "",
  fetchedAt: 0,
  hasLoaded: !1
}), Cn = /* @__PURE__ */ new Set();
let vt;
const fo = new _r();
let di = !1;
async function Kr(e, t) {
  if (t.throwIfAborted(), new URL(e).origin !== "https://ghapi.h11.dev") throw new Error("Unexpected public source");
  const o = new AbortController(), i = () => o.abort();
  t.addEventListener("abort", i, { once: !0 });
  const r = setTimeout(i, 15e3);
  try {
    const a = await fetch(e, {
      signal: o.signal,
      credentials: "omit",
      redirect: "error",
      referrerPolicy: "no-referrer",
      cache: "no-store",
      headers: { Accept: "application/json" }
    });
    if (!a.ok)
      throw a.body?.cancel().catch(() => {
      }), new Error("Source unavailable");
    if (!a.body) throw new Error("Empty public source");
    const h = a.body.getReader(), f = new TextDecoder("utf-8", { fatal: !0 });
    let u = 0, x = "";
    try {
      for (; ; ) {
        o.signal.throwIfAborted();
        const k = await h.read();
        if (k.done) break;
        if (u += k.value.byteLength, u > 2 * 1024 * 1024) throw new Error("Public source exceeds limit");
        x += f.decode(k.value, { stream: !0 });
      }
      return o.signal.throwIfAborted(), JSON.parse(x + f.decode());
    } finally {
      h.cancel().catch(() => {
      }), h.releaseLock();
    }
  } finally {
    clearTimeout(r), t.removeEventListener("abort", i);
  }
}
function ui(e, t) {
  const o = e?.name || e?.repository, i = t ? e?.full_name || (typeof o == "string" && o.includes("/") ? o : e?.author && o ? `${e.author}/${o}` : "") : e?.full_name;
  if (typeof i != "string" || !/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(i) || i.split("/").some((f) => f === "." || f === "..")) throw new Error("Invalid repository");
  const [r, a] = i.split("/"), h = (f) => typeof f == "number" && Number.isFinite(f) && f >= 0 ? f : void 0;
  return {
    name: a,
    full_name: i,
    owner: { login: r },
    description: typeof e.description == "string" ? e.description : "",
    language: typeof e.language == "string" ? e.language : "",
    stargazers_count: h(t ? e.stars ?? e.stargazers_count : e.stargazers_count),
    forks_count: h(t ? e.forks ?? e.forks_count : e.forks_count),
    html_url: `https://github.com/${encodeURIComponent(r)}/${encodeURIComponent(a)}`
  };
}
async function Vr(e, t) {
  const o = new Date(Date.now() - e * 864e5).toISOString().slice(0, 10);
  let i = "";
  try {
    const h = await Vs(t), { data: f } = await Us(`/search/repositories?q=${encodeURIComponent(`is:public created:>${o}`)}&sort=stars&order=desc&per_page=30`, { headers: h, signal: t, maxBytes: 2 * 1024 * 1024 });
    if (t.throwIfAborted(), !Array.isArray(f?.items)) throw new Error("Invalid search response");
    return {
      repos: f.items.slice(0, 30).map((u) => ui(u, !1)),
      sourceText: `GitHub Search：UTC 日期 ${o} 之后新建的仓库，按累计 Star 排序；不是官方 Trending 榜。${f.incomplete_results ? " API 标记为不完整结果。" : ""}`
    };
  } catch (h) {
    t.throwIfAborted(), i = h instanceof Ys ? h.message : "主源响应格式无效。";
  }
  const r = e === 1 ? "daily" : e === 7 ? "weekly" : "monthly", a = await Kr(`https://ghapi.h11.dev/repositories?since=${r}`, t);
  if (t.throwIfAborted(), !Array.isArray(a)) throw new Error("Invalid fallback response");
  return {
    repos: a.slice(0, 30).map((h) => ui(h, !0)),
    sourceText: `GitHub Search 不可用：${i} 改用第三方 ghapi.h11.dev 的 ${r} 趋势快照（不发送账号凭据）；口径与新建仓库搜索不同，源更新时间未提供。`
  };
}
const Ui = {
  get state() {
    return we;
  },
  // Only a mounted, visible View may own network work. Returning keeps the
  // previous result/error; an interrupted request requires explicit refresh.
  attachView(e) {
    fo.cancel(), we.isLoading = !1, vt = e;
    const t = () => {
      vt === e && fo.pending && (fo.cancel(), we.isLoading = !1, we.errorMessage = "读取已暂停，返回后可点击刷新。");
    };
    return e.addEventListener("abort", t, { once: !0 }), !e.aborted && !di && this.refresh(), () => {
      e.removeEventListener("abort", t), vt === e && (t(), vt = void 0);
    };
  },
  switchTab(e) {
    we.currentTab = e, this.dispatch("switch-tab", e);
  },
  async switchRange(e, t) {
    !vt || vt.aborted || ![1, 7, 30].includes(e) || e === we.sinceDays || (fo.cancel(), Object.assign(we, {
      sinceDays: e,
      rangeText: `近 ${e} 天`,
      repos: [],
      sourceText: "",
      fetchedAt: 0,
      hasLoaded: !1,
      errorMessage: "",
      isLoading: !1
    }), this.dispatch("switch-range", { days: e, text: we.rangeText }), await this.refresh());
  },
  async refresh() {
    const e = vt;
    if (!e || e.aborted || we.isLoading) return;
    const t = we.sinceDays, o = fo.begin({
      signal: e,
      timeoutMs: 45e3,
      isCurrent: () => vt === e && we.sinceDays === t,
      onStop: (r) => {
        we.isLoading = !1, r === "timeout" && (we.errorMessage = "数据源读取超过整体45秒上限，请手动刷新；没有继续请求备用源。");
      }
    }), i = o.current;
    if (i()) {
      di = !0, we.isLoading = !0, we.errorMessage = "";
      try {
        const r = await o.wait(() => Vr(t, o.signal));
        if (!i()) return;
        we.repos = r.repos, we.sourceText = r.sourceText, we.fetchedAt = Date.now(), we.hasLoaded = !0;
      } catch {
        i() && (we.errorMessage = we.hasLoaded ? "刷新失败，保留同一时间范围的上次读取结果；请检查网络或额度后手动刷新。" : "数据源读取失败或超时；未使用内置样例，请稍后手动刷新。");
      } finally {
        o.finish() && (we.isLoading = !1, this.dispatch("refresh"));
      }
    }
  },
  selectRepo(e) {
    this.dispatch("select-repo", e);
  },
  onAction(e) {
    return Cn.add(e), () => {
      Cn.delete(e);
    };
  },
  dispatch(e, t) {
    for (const o of Cn)
      try {
        o(e, t);
      } catch {
      }
  }
}, On = () => ({
  icon: "🧭",
  title: "快捷轮盘",
  desc: "移动鼠标选择",
  active: !1
}), qn = () => ({
  visible: !1,
  wedgePath: "",
  arcPath: "",
  line1: { x1: 0, y1: 0, x2: 0, y2: 0 },
  line2: { x1: 0, y1: 0, x2: 0, y2: 0 }
}), Z = ke({
  mounted: !1,
  isOpen: !1,
  isExpanded: !1,
  mode: "main",
  ballPosition: { x: 0, y: 0 },
  hub: On(),
  activeSectorId: null,
  sectors: [],
  beam: qn()
});
let pi = null;
function Ur(e, t) {
  if (typeof e != "number" || !t)
    return qn();
  const o = 160, i = 160, r = 26, a = 154, h = 360 / t, f = e - h / 2, u = e + h / 2, x = f * Math.PI / 180, k = u * Math.PI / 180, T = o + r * Math.cos(x), g = i + r * Math.sin(x), p = o + a * Math.cos(x), c = i + a * Math.sin(x), y = o + r * Math.cos(k), $ = i + r * Math.sin(k), b = o + a * Math.cos(k), L = i + a * Math.sin(k), A = h > 180 ? 1 : 0, ee = `M ${T.toFixed(1)} ${g.toFixed(1)} L ${p.toFixed(1)} ${c.toFixed(1)} A ${a} ${a} 0 ${A} 1 ${b.toFixed(1)} ${L.toFixed(1)} L ${y.toFixed(1)} ${$.toFixed(1)} A ${r} ${r} 0 ${A} 0 ${T.toFixed(1)} ${g.toFixed(1)} Z`, ne = `M ${p.toFixed(1)} ${c.toFixed(1)} A ${a} ${a} 0 ${A} 1 ${b.toFixed(1)} ${L.toFixed(1)}`;
  return {
    visible: !0,
    wedgePath: ee,
    arcPath: ne,
    line1: {
      x1: parseFloat(T.toFixed(1)),
      y1: parseFloat(g.toFixed(1)),
      x2: parseFloat(p.toFixed(1)),
      y2: parseFloat(c.toFixed(1))
    },
    line2: {
      x1: parseFloat(y.toFixed(1)),
      y1: parseFloat($.toFixed(1)),
      x2: parseFloat(b.toFixed(1)),
      y2: parseFloat(L.toFixed(1))
    }
  };
}
const Le = {
  get state() {
    return Z;
  },
  getSnapshot() {
    return Lt(Z);
  },
  setMounted(e) {
    Z.mounted = e;
  },
  setBallPosition(e, t) {
    Z.ballPosition.x = e, Z.ballPosition.y = t;
  },
  setVisibility(e) {
    Z.isOpen = e;
  },
  setHub(e) {
    e ? Z.hub = {
      icon: e.icon || "🧭",
      title: e.title || "快捷轮盘",
      desc: e.desc || "移动鼠标选择",
      active: !!e.active
    } : Z.hub = On();
  },
  setBeam(e, t) {
    Z.beam = Ur(e, t);
  },
  setActiveSector(e) {
    Z.activeSectorId = e;
  },
  setSectors(e) {
    Z.sectors = [...e];
  },
  expand(e, t, o = "main") {
    Z.isOpen = !0, Z.isExpanded = !0, Z.mode = o, typeof e == "number" && typeof t == "number" && this.setBallPosition(e, t);
  },
  collapse() {
    Z.isExpanded = !1, Z.mode = "main", Z.activeSectorId = null, Z.beam = qn(), Z.hub = On();
  },
  setWheelMode(e) {
    Z.mode = e;
  },
  setActionHandler(e) {
    pi = e;
  },
  dispatch(e, t) {
    pi?.(e, t);
  }
}, Yi = [
  { id: "daily-bilibili", title: "b站插件", desc: "B站收藏夹与追番视频", icon: "assets/bilibili.svg" },
  { id: "daily-pricing", title: "模型插件", desc: "AI 模型定价与排行榜", icon: "assets/nav-pricing.svg" },
  { id: "daily-aihot", title: "ai hot插件", desc: "全网 AI 与前沿科技资讯", icon: "assets/nav-aihot.svg" },
  { id: "folder", title: "常用网站", desc: "点击展开快捷网站子轮盘", icon: "assets/nav-folder.svg", mode: "shortcuts" },
  { id: "card-github", title: "github插件", desc: "GitHub 趋势与星标项目", icon: "assets/nav-github.svg" },
  { id: "launcher", title: "首页", desc: "返回主屏常用应用台", icon: "assets/nav-home.svg" }
];
function Yr() {
  return Yi.filter((e) => e.mode || e.id === "launcher" || Zo(e.id));
}
function qr() {
  return cr.filter((e) => e.kind === "module" && Zo(e.id)).map((e) => ({
    id: e.id,
    title: e.title,
    desc: e.isDev ? "已启用的实验性组件" : e.categoryLabel,
    icon: e.icon || e.emoji || "🧩",
    tool: e.id
  }));
}
function fi() {
  Z.isExpanded && so();
}
let qi = [], So = Yi, ct = { x: 400, y: 300 }, Xi = !1, go = !1, ho = null, Rt = !1;
function Ot() {
  return globalThis.chrome?.storage;
}
function Ji(e, t) {
  const o = Z.isExpanded ? 160 : 24;
  Le.setBallPosition(
    Math.max(o + 8, Math.min(window.innerWidth - o - 8, e)),
    Math.max(o + 8, Math.min(window.innerHeight - o - 8, t))
  );
}
function so() {
  const e = Z.mode;
  let t = [];
  e === "shortcuts" && (t = [...qi], t.length < 10 && t.push({
    id: "add-shortcut",
    title: "添加网站",
    desc: "点击后点选常用网站或文件夹内网站加入轮盘",
    icon: "➕"
  })), So = e === "tools" ? qr() : e === "shortcuts" ? [
    ...t,
    { id: "back-to-main", title: "返回主轮盘", desc: "返回页面电梯导航", icon: "🔙", mode: "main" }
  ] : Yr();
  const o = So.length, i = o > 12 ? 118 : o > 9 ? 114 : 110, r = o > 12 ? 46 : o > 9 ? 50 : 56;
  Le.setSectors(So.map((a, h) => {
    const f = -90 + 360 / o * h, u = f * Math.PI / 180;
    return {
      id: a.id,
      title: a.title,
      desc: a.desc,
      icon: a.icon,
      angleDeg: f,
      x: Math.round(160 + Math.cos(u) * i),
      y: Math.round(160 + Math.sin(u) * i),
      size: r,
      isShortcut: !!a.url
    };
  })), Le.setWheelMode(e), Le.setActiveSector(null), Le.setBeam(null, 0), Le.setHub(e === "shortcuts" ? { icon: "🔙", title: "快捷方式" } : e === "tools" ? { icon: "🧰", title: "常用工具" } : null);
}
function en(e) {
  Z.mode = e, so();
}
function _t() {
  Le.collapse(), Ji(Z.ballPosition.x, Z.ballPosition.y), Le.setVisibility(Xi);
}
function bt(e = Z.ballPosition.x, t = Z.ballPosition.y, o = "main") {
  Le.expand(void 0, void 0, o), Ji(e, t), so(), Le.setVisibility(!0);
}
function Xr(e) {
  if (e.id === "add-shortcut") {
    Zi();
    return;
  }
  if (!(e.tool && !Zo(e.tool) || !e.url && !e.mode && e.id !== "launcher" && !Zo(e.id))) {
    if (e.mode) {
      en(e.mode);
      return;
    }
    if (_t(), e.url) {
      window.open(e.url, "_blank");
      return;
    }
    if (e.tool) {
      window.triggerToolShortcut?.(e.tool);
      return;
    }
    e.id === "launcher" ? (typeof window < "u" && window.scrollTo({ top: 0, left: 0, behavior: "instant" }), Pt.exit(), document.body && (document.body.dataset.page = "home")) : Pt.enter(e.id);
  }
}
function Zi() {
  Rt = !0, _t(), be.show({
    appName: "快捷轮盘",
    title: "点选添加模式已开启",
    message: "请在常用网站或展开的文件夹中点击要加入的网站（按 Esc 键取消）",
    duration: 8e3
  });
}
function Qi() {
  Rt && (Rt = !1, be.show({
    appName: "快捷轮盘",
    title: "已退出点选模式",
    message: "未添加任何网站",
    duration: 2e3
  }));
}
async function Jr(e) {
  if (!Rt || (Rt = !1, !e || !e.url)) return !1;
  try {
    const t = await Ot()?.local?.get(["siteShelfLinks", "logicweaverNavWheelShortcutsV1"]), o = Array.isArray(t?.siteShelfLinks) ? t.siteShelfLinks : Array.isArray(t?.logicweaverNavWheelShortcutsV1) ? t.logicweaverNavWheelShortcutsV1 : [];
    if (o.some((h) => h.url === e.url))
      return be.show({
        appName: "快捷轮盘",
        title: "已存在",
        message: `「${e.title || e.url}」已经在快捷轮盘中`,
        duration: 3e3
      }), bt(void 0, void 0, "shortcuts"), !0;
    const r = {
      id: String(e.id || `wheel-${Date.now()}`),
      title: e.title || "快捷网站",
      url: e.url,
      icon: e.icon || "",
      customIcon: e.customIcon || ""
    }, a = [...o, r];
    return await Ot()?.local?.set({ siteShelfLinks: a, logicweaverNavWheelShortcutsV1: a }), await Je.loadShortcuts(), be.show({
      appName: "快捷轮盘",
      title: "添加成功",
      message: `已将「${r.title}」添加到快捷轮盘！`,
      duration: 3e3
    }), bt(void 0, void 0, "shortcuts"), !0;
  } catch (t) {
    return console.warn("[NavWheel] 添加快捷方式失败", t), !1;
  }
}
async function Zr(e) {
  try {
    const t = await Ot()?.local?.get(["siteShelfLinks", "logicweaverNavWheelShortcutsV1"]), o = Array.isArray(t?.siteShelfLinks) ? t.siteShelfLinks : Array.isArray(t?.logicweaverNavWheelShortcutsV1) ? t.logicweaverNavWheelShortcutsV1 : [], i = o.find((a) => String(a.id) === String(e)), r = o.filter((a) => String(a.id) !== String(e));
    await Ot()?.local?.set({ siteShelfLinks: r, logicweaverNavWheelShortcutsV1: r }), await Je.loadShortcuts(), so(), i && be.show({
      appName: "快捷轮盘",
      title: "已移除",
      message: `已从轮盘移除「${i.title || "快捷网站"}」`,
      duration: 2500
    });
  } catch (t) {
    console.warn("[NavWheel] 删除快捷方式失败", t);
  }
}
function gi(e) {
  ct = { x: e.clientX, y: e.clientY };
}
function hi(e) {
  e.button === 1 && (e.preventDefault(), e.stopPropagation(), ct = { x: e.clientX, y: e.clientY }, Z.isExpanded ? _t() : bt(e.clientX, e.clientY));
}
function mi(e) {
  e.button === 1 && e.preventDefault();
}
function vi(e) {
  if (e.key === "Escape") {
    if (Rt) {
      e.preventDefault(), e.stopPropagation(), Qi();
      return;
    }
    if (!Z.isExpanded || Kn.active) return;
    e.preventDefault(), e.stopPropagation(), Z.mode === "shortcuts" ? en("main") : _t();
  }
}
function Qr(e) {
  try {
    const t = globalThis.chrome;
    if (typeof t?.runtime?.getURL == "function")
      return t.runtime.getURL("_favicon/?pageUrl=" + encodeURIComponent(e) + "&size=64");
  } catch {
  }
  return "";
}
function ea(e) {
  const t = e.customIcon || e.icon;
  if (t && typeof t == "string" && !/google\.com\/s2\/favicons|icons\.duckduckgo/i.test(t))
    return t;
  if (e.url) {
    const o = oe.getCachedIcon(e.url);
    if (o) return o;
    const i = Qr(e.url);
    if (i) return i;
  }
  return e.icon || "🔗";
}
const Je = {
  async start() {
    if (!go) {
      go = !0, ct = { x: Math.round(window.innerWidth / 2), y: Math.round(window.innerHeight / 2) }, Le.setActionHandler((e, t) => {
        if (e === "hub:click")
          Z.isExpanded ? Z.mode === "shortcuts" ? en("main") : _t() : bt();
        else if (e === "sector:click" || e === "container:click") {
          const o = So.find((i) => i.id === t?.id || e === "container:click" && i.id === Z.activeSectorId);
          o && Xr(o);
        } else if (e === "sector:hover") {
          const o = Z.sectors.find((i) => i.id === t?.id);
          o && (Le.setHub({ icon: o.icon, title: o.title, desc: o.desc, active: !0 }), Le.setActiveSector(o.id), Le.setBeam(o.angleDeg, So.length));
        } else e === "sector:leave" && (Le.setActiveSector(null), Le.setBeam(null, 0), Le.setHub(Z.mode === "shortcuts" ? { icon: "🔙", title: "快捷方式" } : Z.mode === "tools" ? { icon: "🧰", title: "常用工具" } : null));
      }), window.addEventListener("logicweaver:dock-modules-changed", fi), window.addEventListener("pointermove", gi, { passive: !0 }), window.addEventListener("mousedown", hi, !0), window.addEventListener("auxclick", mi, !0), window.addEventListener("keydown", vi, !0), ho = (e, t) => {
        t === "local" && (e.siteShelfLinks || e.logicweaverNavWheelShortcutsV1) && this.loadShortcuts();
      }, Ot()?.onChanged?.addListener(ho);
      try {
        if (!go) return;
        Xi = !1, Le.setVisibility(!1);
      } catch {
      }
      await this.loadShortcuts(), so();
    }
  },
  stop() {
    go = !1, Le.setActionHandler(null), window.removeEventListener("logicweaver:dock-modules-changed", fi), window.removeEventListener("pointermove", gi), window.removeEventListener("mousedown", hi, !0), window.removeEventListener("auxclick", mi, !0), window.removeEventListener("keydown", vi, !0), ho && Ot()?.onChanged?.removeListener(ho), ho = null;
  },
  async loadShortcuts() {
    try {
      const e = await Ot()?.local?.get(["siteShelfLinks", "logicweaverNavWheelShortcutsV1"]);
      if (!go) return;
      const t = e?.siteShelfLinks?.length ? e.siteShelfLinks : e?.logicweaverNavWheelShortcutsV1;
      qi = (Array.isArray(t) ? t : []).map((o, i) => ({
        id: String(o.id || `wheel-${i}`),
        title: String(o.title || o.url || "快捷网站"),
        desc: String(o.url || ""),
        url: String(o.url || ""),
        icon: ea(o)
      })), Z.mode === "shortcuts" && so();
    } catch (e) {
      console.warn("[NavWheel] 读取快捷方式失败", e);
    }
  },
  open(e, t) {
    bt(e ?? ct.x, t ?? ct.y);
  },
  close: _t,
  get isPickingShortcut() {
    return Rt;
  },
  startPickingShortcut: Zi,
  cancelPickingShortcut: Qi,
  handlePickedLink: Jr,
  removeShortcut: Zr,
  toggle(e = !1) {
    Z.isExpanded ? _t() : e ? bt(ct.x, ct.y) : bt();
  },
  toggleTools(e = !0) {
    Z.isExpanded && Z.mode === "tools" ? _t() : bt(
      e ? ct.x : Z.ballPosition.x,
      e ? ct.y : Z.ballPosition.y,
      "tools"
    );
  },
  setMode(e) {
    en(e);
  }
};
class Xt {
  constructor() {
    this.activeShortcuts = { ...pn }, this.isListenerBound = !1, this.storageListenerBound = !1, this.shortcutReadVersion = 0, this.initShortcuts();
  }
  static getInstance() {
    return Xt.instance || (Xt.instance = new Xt()), Xt.instance;
  }
  getShortcuts() {
    return { ...this.activeShortcuts };
  }
  async setShortcut(t, o) {
    if (typeof t != "string" || !t || typeof o != "string")
      throw new Error("快捷键参数无效，未保存");
    if (typeof chrome > "u" || !chrome.storage?.local)
      throw new Error("快捷键存储不可用，未保存");
    const { optionsService: i, SHORTCUT_STORAGE_KEY: r } = await import("./options.service-N98g5mDC.js").then((k) => k.g), h = (await chrome.storage.local.get(r))[r], f = { ...h || {}, [t]: o }, u = this.shortcutReadVersion, x = await i.saveSettings(
      { [r]: f },
      { [r]: h }
    );
    u === this.shortcutReadVersion && (++this.shortcutReadVersion, this.applyShortcutOverrides(x[r]));
  }
  applyShortcutOverrides(t) {
    const o = t && typeof t == "object" && !Array.isArray(t) ? Object.entries(t).filter((i) => Object.prototype.hasOwnProperty.call(pn, i[0]) && typeof i[1] == "string") : [];
    this.activeShortcuts = { ...pn, ...Object.fromEntries(o) };
  }
  async initShortcuts() {
    if (!(typeof chrome > "u" || !chrome.storage?.local))
      try {
        !this.storageListenerBound && chrome.storage?.onChanged?.addListener && (chrome.storage.onChanged.addListener((i, r) => {
          r === "local" && Object.prototype.hasOwnProperty.call(i, "customShortcuts") && (++this.shortcutReadVersion, this.applyShortcutOverrides(i.customShortcuts.newValue));
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
    if (!t || !oi(t)) return !1;
    if (Xe(t))
      return Me.handleToolClick(t), !0;
    switch (t) {
      case "bookmarks":
        return on.toggle(), !0;
      case "settings":
        return nn.open(), !0;
      case "nav-wheel":
        return Je.toggle(!0), !0;
      case "toolbox":
        return Je.toggleTools(!0), !0;
      case "pricing":
        return Pt.enter("daily-pricing"), !0;
      case "search": {
        if (typeof document < "u") {
          const o = document.getElementById("search-input");
          if (o)
            return o.focus(), o.select(), !0;
        }
        return !1;
      }
      case "todoist-new-task":
        return typeof window < "u" && typeof window.triggerTodoistQuickAdd == "function" ? window.triggerTodoistQuickAdd() : Me.handleToolClick("todoist"), !0;
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
        if (Kn.active || t.defaultPrevented || t.isComposing || t.repeat || t.target && (t.target.matches("input, textarea, select") || t.target.isContentEditable) && !t.altKey && !t.ctrlKey && !t.metaKey)
          return;
        const i = dr(t);
        if (!i) return;
        const r = i.toLowerCase();
        for (const [a, h] of Object.entries(this.activeShortcuts))
          if (!(!h || !oi(a)) && h.toLowerCase().replace(/^cmd\+/, "meta+") === r) {
            t.preventDefault(), t.stopPropagation(), this.triggerToolShortcut(a);
            break;
          }
      },
      !0
    ));
  }
}
const Bn = Xt.getInstance();
class Jt {
  constructor() {
    this._isVisible = N(typeof document < "u" ? !document.hidden : !0), this.callbacks = /* @__PURE__ */ new Set(), this.activeIntervals = /* @__PURE__ */ new Set(), typeof document < "u" && document.addEventListener("visibilitychange", () => {
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
    return Jt.instance || (Jt.instance = new Jt()), Jt.instance;
  }
  get isVisible() {
    return Lt(this._isVisible);
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
const ta = Jt.getInstance(), xn = () => window;
let It = !1, mo, Ln, vo;
function yi(e) {
  return oe.getPageNames().filter((t) => t !== e).map((t) => ({ id: t, name: oe.getPageLabel(t) }));
}
function wi() {
  if (!qe.isOpen || !qe.activeFolder) return;
  const e = oe.getState(), t = qe.activeFolder;
  kt.setLinks(e.links.filter((a) => (a.group || "常用网站") === t));
  const o = /* @__PURE__ */ new Map();
  for (const a of e.links) {
    const h = a.group || "常用网站";
    o.has(h) || o.set(h, []), o.get(h).push(a);
  }
  const i = new Map(Object.keys(e.folders).map((a) => [a, Xo(e.folders, a)])), r = /* @__PURE__ */ new Map();
  for (const a of i.values()) a && r.set(a, (r.get(a) || 0) + 1);
  kt.setFolders([...i].filter(([, a]) => a === t).map(([a]) => ({
    groupName: a,
    links: o.get(a) || [],
    count: (o.get(a)?.length || 0) + (r.get(a) || 0)
  })), Xo(e.folders, t));
}
const Rn = {
  openEditor(e) {
    Lo.openEditDialog(e || {});
  },
  openFolder(e = qe.activeFolder) {
    if (!e) return;
    const o = oe.getState().links.filter((i) => (i.group || "常用网站") === e);
    kt.openFolder(e, o), wi();
  },
  openLinkMenu(e, t) {
    t?.preventDefault?.(), eo.openLinkMenu(e, yi(e.page || "常用网站"), t?.clientX || 0, t?.clientY || 0);
  },
  openFolderMenu(e, t, o) {
    t?.preventDefault?.();
    const i = oe.getState(), r = o || i.activePage;
    eo.openFolderMenu(
      e,
      oe.getGroupSize(e) === "small" ? "扩大为大收藏夹" : "缩小为小收藏夹",
      yi(r),
      t?.clientX || 0,
      t?.clientY || 0
    );
  },
  openPageMenu(e, t) {
    t?.preventDefault?.(), eo.openPageMenu(
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
    Lo.openIconPicker(e.title || "网站", t, e.url, String(e.id)), Lo.searchIcons(t);
  },
  render() {
    const e = oe.getState(), t = oe.getPageNames();
    Te.update({
      ...e,
      pages: t,
      activePage: t.includes(e.activePage) ? e.activePage : t[0]
    }), wi();
  },
  start() {
    It || (It = !0, Te.setActions({
      openFolder: (e) => this.openFolder(e),
      deleteFolder: tr,
      openLinkMenu: (e, t) => this.openLinkMenu(e, t),
      openFolderMenu: (e, t, o) => this.openFolderMenu(e, o, t),
      openPageMenu: (e, t) => this.openPageMenu(e, t)
    }), kt.setActionHandler((e, t) => {
      e === "close" ? kt.closeFolder() : e === "folder:open" && typeof t == "string" ? this.openFolder(t) : e === "link:contextmenu" && t?.link && this.openLinkMenu(t.link, t);
    }), Ln = oe.subscribe(() => {
      this.render();
    }), vo = (e, t) => {
      if (t !== "local") return;
      const o = {
        quickLinks: "links",
        quickLinkGroupSizes: "groupSizes",
        launcherFolders: "folders",
        launcherPages: "pages",
        launcherPageLabels: "pageLabels",
        launcherActivePage: "activePage"
      }, i = {};
      for (const [r, a] of Object.entries(o)) {
        if (!(r in e)) continue;
        const h = e[r].newValue;
        i[a] = a === "links" ? Array.isArray(h) ? h : [] : a === "pages" ? Array.isArray(h) && h.length ? h : ["常用网站"] : a === "activePage" ? h || "常用网站" : h || {};
      }
      Object.keys(i).length && (oe.updateState(i), this.render());
    }, xn().chrome?.storage?.onChanged?.addListener(vo));
  },
  init() {
    return this.start(), mo || (mo = (async () => {
      await oe.ready;
      const e = xn().chrome;
      if (!It) return;
      const t = await e?.storage?.local?.get("quickLinksReady") || {};
      if (It) {
        if (!oe.getState().links.length && !t.quickLinksReady && e?.topSites) {
          const o = await new Promise((i) => e.topSites.get((r) => i(r || [])));
          if (!It) return;
          oe.getState().links.length || (oe.updateState({ links: o.slice(0, 14).map((i) => ({
            id: crypto.randomUUID(),
            title: i.title || oe.hostOf(i.url),
            url: i.url,
            group: "常用网站"
          })) }), await oe.save());
        }
        It && this.render();
      }
    })().catch((e) => {
      throw mo = void 0, e;
    }), mo);
  },
  stop() {
    It = !1, Ln?.(), Ln = void 0, vo && xn().chrome?.storage?.onChanged?.removeListener(vo), vo = void 0, kt.setActionHandler(null), Te.setActions({
      openFolder: void 0,
      deleteFolder: void 0,
      openLinkMenu: void 0,
      openFolderMenu: void 0,
      openPageMenu: void 0
    });
  }
}, bi = [
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
function Ro(e) {
  return e === 0 ? { emoji: "☀️", label: "晴" } : e <= 2 ? { emoji: "🌤️", label: "少云" } : e === 3 ? { emoji: "☁️", label: "多云" } : e === 45 || e === 48 ? { emoji: "🌫️", label: "雾" } : e >= 51 && e <= 57 ? { emoji: "🌦️", label: "毛毛雨" } : e >= 61 && e <= 67 ? { emoji: "🌧️", label: "雨" } : e >= 71 && e <= 77 ? { emoji: "🌨️", label: "雪" } : e >= 80 && e <= 82 ? { emoji: "🌧️", label: "阵雨" } : e >= 85 && e <= 86 ? { emoji: "🌨️", label: "阵雪" } : e >= 95 ? { emoji: "⛈️", label: "雷雨" } : { emoji: "🌡️", label: "—" };
}
class Zt {
  constructor() {
    this.currentCity = "武汉", this.isRefreshing = !1, this.activeRequestId = 0, this.initStorage();
  }
  static getInstance() {
    return Zt.instance || (Zt.instance = new Zt()), Zt.instance;
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
    if (!i) return bi.slice(0, o);
    const r = [];
    for (const a of bi) {
      const h = a.name.toLowerCase(), f = a.pinyin.toLowerCase(), u = a.admin.toLowerCase();
      if ((h.startsWith(i) || f.startsWith(i) || h.includes(i) || f.includes(i) || u.includes(i)) && r.push(a), r.length >= o) break;
    }
    return r;
  }
  async loadWeather(t) {
    const o = (t || this.currentCity || "").trim();
    if (!o) {
      nt.unconfigured();
      return;
    }
    if (this.isRefreshing) return;
    this.isRefreshing = !0;
    const i = ++this.activeRequestId;
    nt.loading(o);
    try {
      const r = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(o)}&count=1&language=zh&format=json`, a = await fetch(r);
      if (i !== this.activeRequestId || j.state === "unconfigured") {
        this.isRefreshing = !1;
        return;
      }
      const f = (await a.json()).results?.[0];
      if (!f) {
        i === this.activeRequestId && j.state !== "unconfigured" && nt.notFound(o), this.isRefreshing = !1;
        return;
      }
      const u = `https://api.open-meteo.com/v1/forecast?latitude=${f.latitude}&longitude=${f.longitude}&current=temperature_2m,weather_code,relative_humidity_2m,wind_speed_10m&hourly=temperature_2m,weather_code,precipitation_probability&daily=temperature_2m_max,temperature_2m_min,weather_code,precipitation_probability_max&forecast_days=7&timezone=auto`, x = await fetch(u);
      if (i !== this.activeRequestId || j.state === "unconfigured") {
        this.isRefreshing = !1;
        return;
      }
      const k = await x.json(), T = Ro(k.current?.weather_code ?? 0), g = Math.round(k.current?.temperature_2m ?? 0), p = k.hourly?.time || [], c = Date.now();
      let y = p.findIndex((w) => new Date(w).getTime() >= c);
      y < 0 && (y = 0);
      const $ = [];
      for (let w = y; w < Math.min(y + 5, p.length); w++) {
        const _ = w === y ? "现在" : new Date(p[w]).getHours() + "时", D = Ro(k.hourly.weather_code[w]), Y = Math.round(k.hourly.temperature_2m[w]);
        $.push({ time: _, emoji: D.emoji, temp: Y });
      }
      let b = "未来 12 小时暂无降水 ☂️";
      for (let w = y; w < Math.min(y + 12, p.length); w++) {
        const _ = k.hourly.weather_code[w], D = k.hourly.precipitation_probability?.[w] || 0;
        if (_ >= 51 || D >= 60) {
          const Y = new Date(p[w]).getHours(), W = _ >= 71 && _ <= 77 || _ === 85 || _ === 86;
          b = `预计 ${Y}:00 ${W ? "有雪" : "有雨"}${D ? `（${D}%）` : ""} 🌧️`;
          break;
        }
      }
      const L = ["今天", "明天", "后天"], A = [], ee = k.daily?.time?.length || 0;
      for (let w = 1; w < Math.min(3, ee); w++) {
        const _ = L[w] || `+${w}天`, D = Ro(k.daily.weather_code[w]), Y = `${Math.round(k.daily.temperature_2m_max[w])}°/${Math.round(k.daily.temperature_2m_min[w])}°`;
        A.push({ label: _, emoji: D.emoji, tempRange: Y });
      }
      const ne = `${T.label} · 最高 ${Math.round(k.daily?.temperature_2m_max?.[0] ?? g)}° / 最低 ${Math.round(k.daily?.temperature_2m_min?.[0] ?? g)}°`, E = {
        cityName: f.name || o,
        currentEmoji: T.emoji,
        currentTemp: g,
        subText: ne,
        rainText: b,
        hours: $,
        days: A
      };
      if (i === this.activeRequestId && j.state !== "unconfigured") {
        if (nt.ready(E, o), k.daily?.time) {
          const _ = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"], D = [];
          for (let Y = 0; Y < k.daily.time.length; Y++) {
            const W = new Date(k.daily.time[Y]), H = Y === 0 ? "今天" : Y === 1 ? "明天" : Y === 2 ? "后天" : _[W.getDay()], P = Ro(k.daily.weather_code[Y]);
            D.push({
              date: `${W.getMonth() + 1}/${W.getDate()}`,
              dayName: H,
              emoji: P.emoji,
              condition: P.label,
              highTemp: Math.round(k.daily.temperature_2m_max[Y]),
              lowTemp: Math.round(k.daily.temperature_2m_min[Y]),
              rainProb: k.daily.precipitation_probability_max?.[Y] || 0
            });
          }
          nt.setForecastDays(D);
        }
        const w = {
          humidity: k.current?.relative_humidity_2m ? `${k.current.relative_humidity_2m}%` : "60%",
          wind: k.current?.wind_speed_10m ? `${Math.round(k.current.wind_speed_10m)} km/h` : "微风",
          uvIndex: "正常",
          airQuality: "优良"
        };
        nt.setDetailInfo(w);
      }
    } catch (r) {
      i === this.activeRequestId && j.state !== "unconfigured" && nt.error(r?.message || "天气加载失败，右键此处可重新选择地点。", o);
    } finally {
      i === this.activeRequestId && (this.isRefreshing = !1);
    }
  }
}
const ko = Zt.getInstance();
function oa(e, t) {
  window.LogicWeaverIntro = at, window.LogicWeaverStartupIntro = at, window.LogicWeaverNotifications = be, window.LogicWeaverWindowManager = Me, window.LogicWeaverWindowTabs = Me, window.LogicWeaverDomFreezer = ur, window.LogicWeaverWallpaperService = qo, window.LogicWeaverLauncherService = oe, window.LogicWeaverLauncherRuntime = Rn, window.LogicWeaverProfileService = ci;
  try {
    ci.init();
  } catch (o) {
    console.error("[ProfileService] init failed:", o);
  }
  window.LogicWeaverBookmarksService = jn, window.LogicWeaverCalendarService = or, window.LogicWeaverWeather = nt, window.LogicWeaverWeatherService = ko, window.LogicWeaverClock = qt, window.LogicWeaverSearch = qs, window.LogicWeaverSearchService = Xs, Object.defineProperty(window, "LogicWeaverAiHotService", {
    configurable: !0,
    get: () => {
      import("./aihot.service-l4gGelhr.js").then(({ aiHotService: o }) => {
        window.LogicWeaverAiHotService = o;
      });
    }
  }), window.LogicWeaverHomeMusic = Ve, window.LogicWeaverLauncherGroups = Te, window.LogicWeaverProfileMenu = Io, window.LogicWeaverWorkspaceLaunchers = Un, window.LogicWeaverMacDock = dt, window.LogicWeaverFullscreen = Pt, window.enterFullscreenCard = (o) => Pt.enter(o), window.exitFullscreenCard = () => Pt.exit(), window.cycleFullscreenCard = () => Pt.cycle(), window.LogicWeaverPageVisibility = ta, window.LogicWeaverBackgroundLibrary = si, window.LogicWeaverNotificationCenter = xt, window.LogicWeaverBookmarkMenu = zn, window.LogicWeaverBookmarkPanel = on, window.LogicWeaverBookmarkFolderStrip = Jo, window.LogicWeaverLauncherDialogs = Lo, window.LogicWeaverLauncherFolder = kt, window.LogicWeaverLauncherMenus = eo, window.LogicWeaverSettings = nn, window.LogicWeaverClockSettings = Wt, window.LogicWeaverBiliTheater = $o, window.LogicWeaverBilibiliService = ei, window.getBiliJct = () => ei.getBiliJct(), window.LogicWeaverBiliMiniPlayer = En, window.openBiliMiniPlayer = (o) => En.openVideo(o), window.LogicWeaverAiDialog = Yn, window.LogicWeaverAihotViewer = Vn, window.LogicWeaverNavWheel = Le, window.openNavWheel = (o, i) => Je.open(o, i), window.closeNavWheel = () => Je.close(), window.toggleNavWheel = (o) => Je.toggle(o), window.toggleToolWheel = (o) => Je.toggleTools(o), window.setNavWheelMode = (o) => Je.setMode(o), window.LogicWeaverShortcuts = Bn, window.triggerToolShortcut = (o) => Bn.triggerToolShortcut(o), window.LogicWeaverCommands = e, window.LogicWeaverFeatures = t, window.LogicWeaverCalendarView = nr, window.LogicWeaverGitHubStatus = Gn, window.LogicWeaverGitHubFolders = At, window.LogicWeaverGitHubHero = Co, window.LogicWeaverGitHubRepositories = yt, window.LogicWeaverGitHubBatchBar = xo, window.LogicWeaverTodoistLabels = ir, window.LogicWeaverTodoistWorkspace = sr, window.LogicWeaverTodoistCalendarSidebar = rr, window.LogicWeaverTodoistTaskList = ar, window.LogicWeaverBiliMessagePanel = Et, window.LogicWeaverStickerBoard = hr, window.LogicWeaverStickersService = mr, window.LogicWeaverPricing = Ni, window.LogicWeaverBiliFavorites = Bi, window.LogicWeaverBiliRadioTape = br, window.LogicWeaverBiliOrganizerDialogs = vr, window.LogicWeaverBiliUpGroupManager = yr, window.LogicWeaverBiliUpPreview = Vo, window.LogicWeaverYouTube = Pi, window.LogicWeaverAihotFeed = Ri, window.LogicWeaverGitHubTrending = Ui, window.LogicWeaverCalendarWorkspace = Yt, window.LogicWeaverCalendar = Yt, window.LogicWeaverTodoistMainWorkspace = lr, window.LogicWeaverTodoistTaskDetail = zr, window.openBiliTheater = (o) => $o.openVideo(o), window.closeBiliTheater = () => $o.close(), window.showWindowsToast = (o) => {
    if (!o) return null;
    const i = un(o.target) || ti(o.url) || (o.appType === "bili" ? Rs([o.title, o.subtitle, o.message].filter((r) => typeof r == "string").join(" ")) : void 0);
    return be.show({
      ...o,
      target: i,
      onClick: () => {
        if (typeof o?.onClick == "function") return o.onClick();
        if (i) return xt.openTarget(i);
        if (o?.url) {
          window.open(o.url, "_blank");
          return;
        }
      }
    });
  }, window.showToast = (o, i = !1, r = 3200) => window.showWindowsToast({
    appName: "系统提醒",
    icon: i ? "assets/error.svg" : "assets/logo.png",
    title: i ? "操作提醒" : "系统提醒",
    subtitle: o,
    duration: r
  }), window.showBiliToast = (o, i = 3200, r = {}) => {
    const a = typeof i == "object" && i ? i : r, h = typeof i == "number" ? i : 3200, f = a.isError || /失败|错误|异常|未获取|未找到/i.test(o), u = a.title || (f ? "B站操作未完成" : "哔哩哔哩"), x = a.subtitle || (o.length > 36 ? "" : o), k = a.message || (a.subtitle || o.length > 36 ? o : ""), T = {
      id: a.id || `bili_toast_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      appType: "bili",
      appName: "哔哩哔哩",
      icon: "assets/bilibili.svg",
      title: u,
      subtitle: x || o,
      message: k && k !== x ? k : "",
      showActions: !!(a.showActions || a.actionLabel),
      actionLabel: a.actionLabel || "",
      onClick: a.onClick || null,
      target: un(a.target) || ti(a.url) || un({ type: "bili-video", bvid: a.bvid, aid: a.aid ? String(a.aid) : void 0 }),
      url: a.url,
      duration: Math.max(3e3, h)
    };
    return window.showWindowsToast(T);
  }, window.showFetchToast = (o, i, r = "", a = "assets/logo.png", h = 3200) => window.showWindowsToast({
    appName: o,
    title: i,
    subtitle: r,
    icon: a || "assets/logo.png",
    duration: h,
    showActions: !1,
    actionLabel: "",
    appType: "fetch"
  }), window.LogicWeaverKineticDrag = Cr, window.LogicWeaverMarkdownAst = xr, window.setLauncherBackground = (o) => qo.setWallpaper(o), window.backgroundDbClear = (o) => Ns(o), window.openBackgroundHistory = () => si.openDialog();
}
const Pe = ke({
  isOpen: !1,
  query: "",
  selectedIndex: 0
});
let No = null;
const es = {
  get state() {
    return Pe;
  },
  open() {
    Pe.isOpen || (Pe.isOpen = !0, Pe.query = "", Pe.selectedIndex = 0, No = Me.pushModalCloser(() => (this.close(), !0)));
  },
  close() {
    Pe.isOpen && (Pe.isOpen = !1, Pe.query = "", Pe.selectedIndex = 0, No && (No(), No = null));
  },
  toggle() {
    Pe.isOpen ? this.close() : this.open();
  },
  setQuery(e) {
    Pe.query = e, Pe.selectedIndex = 0;
  },
  selectNext(e) {
    e <= 0 || (Pe.selectedIndex = (Pe.selectedIndex + 1) % e);
  },
  selectPrev(e) {
    e <= 0 || (Pe.selectedIndex = (Pe.selectedIndex - 1 + e) % e);
  },
  async executeCommand(e) {
    this.close();
    try {
      await sn.execute(e.id, void 0, "command-palette");
    } catch (t) {
      console.warn(`[CommandPalette] Failed to execute ${e.id}:`, t);
    }
  }
};
typeof window < "u" && window.addEventListener("keydown", (e) => {
  if (Kn.active || e.defaultPrevented || e.isComposing || e.repeat) return;
  const t = (e.key || "").toLowerCase(), o = (e.ctrlKey || e.metaKey) && t === "k", i = e.altKey && (e.code === "Space" || t === " ");
  (o || i) && (e.preventDefault(), e.stopPropagation(), es.toggle());
}, !0);
function na(e) {
  e.register({
    id: "palette.toggle",
    title: "打开全局命令中心 (Spotlight)",
    category: "界面",
    keywords: ["命令", "palette", "spotlight", "raycast", "搜索", "cmd"],
    concurrency: "drop",
    run: () => es.toggle()
  }), e.register({
    id: "intro.skip",
    title: "跳过开屏动画",
    category: "界面",
    keywords: ["开屏", "启动", "skip"],
    concurrency: "drop",
    enabled: () => at.enabled && !at.finished,
    run: () => at.skip("COMMAND SKIP")
  }), e.register({
    id: "notifications.clear",
    title: "关闭当前 Toast",
    category: "通知",
    keywords: ["toast", "关闭"],
    description: "只关闭浮动提示，不删除通知中心历史",
    concurrency: "drop",
    enabled: () => be.size > 0,
    run: () => be.clear()
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
    enabled: () => Yt.ready,
    run: () => Yt.refresh()
  }), e.register({
    id: "calendar.today",
    title: "日历跳转到今天",
    category: "日历",
    keywords: ["今日", "today", "日期"],
    concurrency: "drop",
    enabled: () => Yt.ready,
    run: () => Yt.goToday()
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
const ia = {
  key: 0,
  id: "guest-preview-banner",
  class: "guest-preview-banner",
  role: "alert",
  "aria-label": "新用户开箱视角预览提示"
}, sa = /* @__PURE__ */ de({
  __name: "GuestPreviewBanner",
  setup(e) {
    function t() {
      Hs.exit();
    }
    return (o, i) => (l(), ce(Ps, { name: "guest-banner-slide" }, {
      default: to(() => [
        s(Fs) ? (l(), d("aside", ia, [
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
        ])) : M("", !0)
      ]),
      _: 1
    }));
  }
}), ra = /* @__PURE__ */ Ie(sa, [["__scopeId", "data-v-a2f2ca5f"]]), aa = ["hidden"], la = {
  key: 0,
  class: "bookmark-folder-strip-empty"
}, ca = ["title", "data-bookmark-folder-id", "onClick", "onContextmenu"], da = /* @__PURE__ */ de({
  __name: "BookmarkFolderStrip",
  setup(e) {
    const t = N(null);
    function o(a) {
      const h = t.value;
      !h || h.scrollWidth <= h.clientWidth || !a.deltaY || (a.preventDefault(), h.scrollLeft += a.deltaY);
    }
    function i(a) {
      Jo.openFolder(a.id);
    }
    function r(a, h) {
      Jo.openContextMenu(h, a.clientX, a.clientY);
    }
    return (a, h) => (l(), d("nav", {
      id: "bookmark-folder-strip",
      ref_key: "stripRef",
      ref: t,
      class: "bookmark-folder-strip",
      "aria-label": "书签栏文件夹",
      hidden: !s(Ut).enabled,
      onWheel: o
    }, [
      s(Ut).folders.length ? M("", !0) : (l(), d("span", la, v(s(Ut).emptyMessage || "书签栏没有文件夹"), 1)),
      (l(!0), d(G, null, fe(s(Ut).folders, (f) => (l(), d("button", {
        key: f.id,
        class: "bookmark-folder-chip",
        type: "button",
        title: `打开书签文件夹：${f.title || "未命名"}`,
        "data-bookmark-folder-id": f.id,
        onClick: (u) => i(f),
        onContextmenu: F((u) => r(u, f), ["prevent"])
      }, [
        h[0] || (h[0] = n("span", { "aria-hidden": "true" }, "📁", -1)),
        n("span", null, v(f.title || "未命名"), 1)
      ], 40, ca))), 128))
    ], 40, aa));
  }
}), ua = /* @__PURE__ */ Ie(da, [["__scopeId", "data-v-5e71cc7c"]]), pa = { class: "cube-manager-body" }, fa = ["disabled", "onClick"], ga = ["disabled", "onClick"], ha = ["onClick"], ma = ["onClick"], va = ["onClick"], ya = ["type", "placeholder"], wa = {
  key: 0,
  role: "alert"
}, ba = /* @__PURE__ */ de({
  __name: "CubeConfigDialog",
  setup(e) {
    const t = De.state, o = ae(() => De.getActiveFaces()), i = ae(() => t.registeredFaces.filter((g) => !t.activeFaceIds.includes(g.id))), r = N(""), a = N("memo"), h = N(""), f = N(!1), u = N(JSON.stringify({ title: "每日一句", icon: "📝", customType: "memo", customData: { text: "今天也要记得休息" } }, null, 2)), x = N("");
    function k(g) {
      x.value = "";
      try {
        g();
      } catch (p) {
        x.value = p instanceof Error ? p.message : "操作失败";
      }
    }
    function T() {
      k(() => {
        const g = f.value ? JSON.parse(u.value) : {
          title: r.value,
          customType: a.value,
          customData: { text: h.value, targetDate: h.value, url: h.value }
        };
        De.addCustomFace(g), r.value = "", h.value = "";
      });
    }
    return (g, p) => (l(), ce(gt, { to: "body" }, [
      s(t).isConfigDialogOpen ? (l(), d("section", {
        key: 0,
        class: "cube-manager",
        role: "dialog",
        "aria-label": "管理立方体面",
        onKeydown: p[7] || (p[7] = Bt(F((c) => s(De).closeConfigDialog(), ["stop"]), ["esc"]))
      }, [
        n("header", null, [
          p[8] || (p[8] = n("strong", null, "管理立方体面", -1)),
          n("button", {
            type: "button",
            "aria-label": "关闭",
            onClick: p[0] || (p[0] = (c) => s(De).closeConfigDialog())
          }, "×")
        ]),
        n("div", pa, [
          p[16] || (p[16] = n("p", null, "默认只有音乐。可以删除所有面，空位仍可添加。", -1)),
          (l(!0), d(G, null, fe(o.value, (c, y) => (l(), d("div", {
            key: c.id,
            class: "cube-row"
          }, [
            n("span", null, v(c.icon) + " " + v(c.title), 1),
            n("button", {
              type: "button",
              disabled: y === 0,
              onClick: ($) => k(() => s(De).moveUp(c.id)),
              title: "上移"
            }, "↑", 8, fa),
            n("button", {
              type: "button",
              disabled: y === o.value.length - 1,
              onClick: ($) => k(() => s(De).moveDown(c.id)),
              title: "下移"
            }, "↓", 8, ga),
            n("button", {
              type: "button",
              onClick: ($) => k(() => s(De).removeCustomFace(c.id))
            }, "删除面", 8, ha)
          ]))), 128)),
          (l(!0), d(G, null, fe(i.value, (c) => (l(), d("div", {
            key: c.id,
            class: "cube-row"
          }, [
            n("span", null, v(c.title) + "（未启用）", 1),
            n("button", {
              type: "button",
              onClick: (y) => k(() => s(De).toggleActive(c.id, !0))
            }, "添加", 8, ma),
            c.builtIn ? M("", !0) : (l(), d("button", {
              key: 0,
              type: "button",
              onClick: (y) => k(() => s(De).removeCustomFace(c.id))
            }, "删除", 8, va))
          ]))), 128)),
          p[17] || (p[17] = n("h3", null, "添加面", -1)),
          n("label", null, [
            Ne(n("input", {
              "onUpdate:modelValue": p[1] || (p[1] = (c) => f.value = c),
              type: "checkbox"
            }, null, 512), [
              [Ws, f.value]
            ]),
            p[9] || (p[9] = Fe(" 粘贴 JSON 配置", -1))
          ]),
          n("form", {
            onSubmit: F(T, ["prevent"])
          }, [
            f.value ? (l(), d(G, { key: 1 }, [
              p[14] || (p[14] = n("p", null, "仅支持文本、倒数日和链接配置，不执行 JavaScript / HTML。开发者动态注册说明见 SDK 文档。", -1)),
              Ne(n("textarea", {
                "onUpdate:modelValue": p[5] || (p[5] = (c) => u.value = c),
                rows: "9",
                maxlength: "10000",
                "aria-label": "面的 JSON 配置",
                spellcheck: "false"
              }, null, 512), [
                [oo, u.value]
              ])
            ], 64)) : (l(), d(G, { key: 0 }, [
              n("label", null, [
                p[10] || (p[10] = Fe("标题", -1)),
                Ne(n("input", {
                  "onUpdate:modelValue": p[2] || (p[2] = (c) => r.value = c),
                  maxlength: "60",
                  required: ""
                }, null, 512), [
                  [oo, r.value]
                ])
              ]),
              n("label", null, [
                p[12] || (p[12] = Fe("类型", -1)),
                Ne(n("select", {
                  "onUpdate:modelValue": p[3] || (p[3] = (c) => a.value = c)
                }, [...p[11] || (p[11] = [
                  n("option", { value: "memo" }, "文本", -1),
                  n("option", { value: "countdown" }, "倒数日", -1),
                  n("option", { value: "link" }, "链接", -1)
                ])], 512), [
                  [Ii, a.value]
                ])
              ]),
              n("label", null, [
                p[13] || (p[13] = Fe("内容", -1)),
                Ne(n("input", {
                  "onUpdate:modelValue": p[4] || (p[4] = (c) => h.value = c),
                  type: a.value === "countdown" ? "date" : "text",
                  placeholder: a.value === "link" ? "https://…" : "输入内容",
                  maxlength: "500",
                  required: ""
                }, null, 8, ya), [
                  [Os, h.value]
                ])
              ])
            ], 64)),
            p[15] || (p[15] = n("button", { type: "submit" }, "添加面", -1))
          ], 32),
          x.value ? (l(), d("p", wa, v(x.value), 1)) : M("", !0)
        ]),
        n("footer", null, [
          n("button", {
            type: "button",
            onClick: p[6] || (p[6] = (c) => k(() => s(De).resetDefaults()))
          }, "恢复默认（仅音乐）"),
          p[18] || (p[18] = n("small", null, "自定义配置保留，但退出轮播", -1))
        ])
      ], 32)) : M("", !0)
    ]));
  }
}), ka = /* @__PURE__ */ Ie(ba, [["__scopeId", "data-v-15dd5487"]]), _a = ["data-face"], Ca = { class: "ms-top-side" }, xa = {
  key: 0,
  class: "ms-top-meta"
}, La = {
  class: "ms-top-title",
  style: { color: "#10b981", "font-weight": "700" }
}, $a = { class: "ms-top-artist" }, Sa = { class: "ms-top-meta" }, Ta = ["title"], Ia = ["title"], Ma = {
  key: 0,
  class: "ms-top-divider"
}, Da = ["title"], Aa = { class: "ms-top-mini-progress" }, Ea = { class: "ms-top-side" }, Pa = ["aria-label"], Wa = ["title"], Oa = { class: "ms-cube-custom-icon" }, Ba = { class: "ms-cube-custom-title" }, Ra = ["title"], Na = {
  key: 1,
  class: "ms-cube-custom-text countdown"
}, Fa = ["href"], Ha = {
  class: "ms-cube-dots",
  "aria-hidden": "true"
}, ja = ["title", "onClick"], za = { class: "ms-cube-cm-header" }, Ga = { class: "ms-cube-cm-list" }, Ka = ["onClick"], Va = { class: "ms-cube-cm-icon" }, Ua = { class: "ms-cube-cm-title" }, Ya = {
  key: 0,
  class: "ms-cube-cm-check"
}, qa = /* @__PURE__ */ de({
  __name: "TopInfoCube",
  props: {
    active: { type: Boolean, default: !0 }
  },
  setup(e) {
    const t = e, o = ae(() => Ai.visible || st.djModalOpen || st.isActive && st.isJoined), i = ae(() => st.isActive && st.isJoined), r = ae(() => De.getActiveFaces()), a = N("music"), h = N(0);
    let f = !1, u;
    Ue(
      () => r.value,
      (B) => {
        B.some((O) => O.id === a.value) || (a.value = B[0]?.id || "");
      },
      { immediate: !0 }
    );
    const x = ae(() => r.value.filter((B) => !B.builtIn)), k = N(!1), T = N({ x: 0, y: 0 });
    Ue(() => t.active, (B) => {
      B || (k.value = !1, De.closeConfigDialog(), clearTimeout(u), f = !1);
    }, { immediate: !0 });
    const { menuRef: g, style: p } = Oi({
      visible: () => k.value,
      anchor: () => T.value,
      dismiss: () => {
        k.value = !1;
      }
    });
    function c(B) {
      B.preventDefault(), B.stopPropagation(), T.value = { x: B.clientX, y: B.clientY }, k.value = !0;
    }
    function y(B) {
      D(B), k.value = !1;
    }
    function $() {
      k.value = !1, De.openConfigDialog();
    }
    function b() {
      k.value = !1, L(() => De.resetDefaults()), D("music");
    }
    function L(B) {
      k.value = !1;
      try {
        B();
      } catch (O) {
        be.show({ appName: "滚动立方体", title: "保存失败", message: O instanceof Error ? O.message : "请检查浏览器存储" });
      }
    }
    function A(B) {
      if (!B) return "未设置目标日";
      const R = new Date(B).getTime() - w.value, me = Math.ceil(R / (1e3 * 60 * 60 * 24));
      return me > 0 ? `还剩 ${me} 天` : me === 0 ? "就是今天！" : `已过去 ${Math.abs(me)} 天`;
    }
    const ee = ae(() => U.isBiliRadio ? "B站电台" : U.isNetease ? "网易云" : U.playing ? "塞壬" : "待机"), ne = ae(() => U.currentLyric ? U.currentLyric : U.playing ? "♪ 伴奏播放中…" : "选择塞壬歌曲、网易云或B站电台后在这里显示歌词");
    function E() {
      Me.handleToolClick("music");
    }
    const w = N(Date.now());
    let _;
    Ue(() => t.active && r.value.some((B) => B.id === a.value && B.customType === "countdown"), (B) => {
      B && (w.value = Date.now()), clearInterval(_), _ = B ? window.setInterval(() => {
        document.hidden || (w.value = Date.now());
      }, 6e4) : void 0;
    }, { immediate: !0 });
    function D(B, O = null) {
      const R = r.value, me = R.find((We) => We.id === B) || R[0];
      if (me) {
        if (Number.isFinite(O))
          h.value = O;
        else if (me.id !== a.value) {
          const We = R.findIndex(($e) => $e.id === a.value);
          let _e = (R.findIndex(($e) => $e.id === me.id) - We + R.length) % R.length;
          _e > R.length / 2 && (_e -= R.length), h.value += _e * 90;
        }
        a.value = me.id;
      }
    }
    function Y(B) {
      const O = r.value;
      if (O.length <= 1) return;
      const R = O.findIndex((_e) => _e.id === a.value), We = ((R >= 0 ? R : 0) + B + O.length) % O.length, Oe = O[We];
      Oe && D(Oe.id, h.value + B * 90);
    }
    function W(B) {
      r.value.length <= 1 || B.altKey || Math.abs(B.deltaY) < 2 || (B.preventDefault(), !f && (f = !0, Y(B.deltaY > 0 ? 1 : -1), u = setTimeout(() => {
        f = !1;
      }, 420)));
    }
    function H(B) {
      !["ArrowUp", "ArrowDown", "PageUp", "PageDown"].includes(B.key) || B.target?.closest?.("input") || (B.preventDefault(), Y(["ArrowDown", "PageDown"].includes(B.key) ? 1 : -1));
    }
    function P(B, O) {
      return a.value === B ? {
        transform: `rotateX(${-h.value}deg) translateZ(22px)`,
        visibility: "visible"
      } : {
        transform: `rotateX(-${O}deg) translateZ(22px)`,
        visibility: "hidden"
      };
    }
    function K(B) {
      const O = B.target;
      O && (O.tagName === "INPUT" || O.tagName === "TEXTAREA" || O.isContentEditable) || (B.preventDefault(), B.stopPropagation());
    }
    function ge(B) {
      const O = B.target;
      O && (O.tagName === "INPUT" || O.tagName === "TEXTAREA" || O.isContentEditable) || B.preventDefault();
    }
    return $t(() => {
      clearInterval(_), clearTimeout(u);
    }), (B, O) => Ne((l(), d("div", {
      class: "ms-top-player",
      "data-face": a.value,
      tabindex: "0",
      title: "滚动立方体 · 滚轮切换面板，右键可自由增删与排序",
      "aria-label": "滚动立方体",
      onWheel: W,
      onKeydown: H,
      onContextmenu: c,
      onCopy: K,
      onSelectstart: ge
    }, [
      r.value.length ? M("", !0) : (l(), d("button", {
        key: 0,
        type: "button",
        class: "ms-cube-cm-action",
        onClick: $
      }, "＋ 添加面（右键管理）")),
      n("div", {
        class: "ms-top-cube",
        style: ye({ transform: `translateZ(-22px) rotateX(${h.value}deg)` })
      }, [
        s(De).isActive("music") && a.value === "music" ? (l(), d("section", {
          key: 0,
          class: "ms-top-face ms-top-face-music",
          "aria-label": "音乐歌词面",
          style: ye(P("music", 0))
        }, [
          n("div", Ca, [
            n("button", {
              class: "ms-top-prev",
              title: "上一首",
              type: "button",
              onClick: O[0] || (O[0] = F((R) => s(Ve).prev(), ["stop"]))
            }, "⏮"),
            n("button", {
              class: "ms-top-play",
              title: "播放/暂停",
              type: "button",
              onClick: O[1] || (O[1] = F((R) => s(Ve).togglePlay(), ["stop"]))
            }, v(s(U).playing ? "⏸" : "▶"), 1)
          ]),
          n("button", {
            class: "ms-top-main",
            title: "打开音乐播放器",
            type: "button",
            onClick: F(E, ["stop"])
          }, [
            o.value ? (l(), d("div", xa, [
              n("span", La, " 🎧 " + v(i.value ? "正在一起听" : "正在收听") + "：" + v(s(U).title || "待机中"), 1),
              n("span", $a, v(s(U).artist), 1)
            ])) : (l(), d(G, { key: 1 }, [
              n("div", Sa, [
                n("span", {
                  class: "ms-top-title",
                  title: s(U).title || "音乐播放器"
                }, v(s(U).title || "音乐播放器"), 9, Ta),
                n("span", {
                  class: "ms-top-artist",
                  title: s(U).artist || "待机中"
                }, v(s(U).artist || "待机中"), 9, Ia),
                n("span", {
                  class: le(["ms-top-source", { idle: !s(U).playing }])
                }, v(ee.value), 3),
                ne.value ? (l(), d("span", Ma)) : M("", !0)
              ]),
              ne.value ? (l(), d("span", {
                key: 0,
                class: "ms-top-lyric",
                title: ne.value
              }, v(ne.value), 9, Da)) : M("", !0)
            ], 64)),
            n("div", Aa, [
              n("div", {
                class: "ms-top-mini-fill",
                style: ye({ width: s(U).progressPercent + "%" })
              }, null, 4)
            ])
          ]),
          n("div", Ea, [
            n("button", {
              class: "ms-top-next",
              title: "下一首",
              type: "button",
              onClick: O[2] || (O[2] = F((R) => s(Ve).next(), ["stop"]))
            }, "⏭"),
            n("button", {
              class: "ms-top-open",
              title: "打开歌单",
              type: "button",
              onClick: F(E, ["stop"])
            }, "🎵")
          ])
        ], 4)) : M("", !0),
        (l(!0), d(G, null, fe(x.value, (R, me) => (l(), d("section", {
          key: R.id,
          class: "ms-top-face ms-top-face-custom",
          "aria-label": R.title,
          style: ye(P(R.id, (me + 1) * 90))
        }, [
          a.value === R.id ? (l(), d("div", {
            key: 0,
            class: "ms-cube-custom-body",
            title: R.desc
          }, [
            n("span", Oa, v(R.icon), 1),
            n("strong", Ba, v(R.title), 1),
            O[10] || (O[10] = n("span", { class: "ms-cube-divider" }, null, -1)),
            R.customType === "memo" ? (l(), d("span", {
              key: 0,
              class: "ms-cube-custom-text",
              title: R.customData?.text
            }, v(R.customData?.text || "（点击右键配置便签内容）"), 9, Ra)) : R.customType === "countdown" ? (l(), d("span", Na, v(A(R.customData?.targetDate)), 1)) : R.customType === "link" ? (l(), d("a", {
              key: 2,
              href: R.customData?.url,
              target: "_blank",
              rel: "noreferrer",
              class: "ms-cube-custom-link",
              onClick: O[3] || (O[3] = F(() => {
              }, ["stop"]))
            }, v(R.customData?.url) + " ↗ ", 9, Fa)) : M("", !0)
          ], 8, Wa)) : M("", !0),
          n("button", {
            type: "button",
            class: "ms-cube-config-trigger",
            title: "管理立方体面",
            onClick: O[4] || (O[4] = F((We) => s(De).openConfigDialog(), ["stop"]))
          }, " ⚙ ")
        ], 12, Pa))), 128))
      ], 4),
      n("div", Ha, [
        (l(!0), d(G, null, fe(r.value, (R) => (l(), d("i", {
          key: R.id,
          class: le({ on: a.value === R.id }),
          title: R.title,
          onClick: F((me) => D(R.id), ["stop"])
        }, null, 10, ja))), 128))
      ]),
      (l(), ce(gt, { to: "body" }, [
        t.active && k.value ? (l(), d("div", {
          key: 0,
          ref_key: "menuRef",
          ref: g,
          class: "ms-cube-context-menu",
          style: ye(s(p)),
          onClick: O[9] || (O[9] = F(() => {
          }, ["stop"]))
        }, [
          n("div", za, [
            O[11] || (O[11] = n("span", null, "🎲 滚动立方体面", -1)),
            n("button", {
              type: "button",
              class: "ms-cube-cm-close",
              onClick: O[5] || (O[5] = (R) => k.value = !1)
            }, "×")
          ]),
          n("div", Ga, [
            (l(!0), d(G, null, fe(r.value, (R) => (l(), d("button", {
              key: R.id,
              type: "button",
              class: le(["ms-cube-cm-item", { active: a.value === R.id }]),
              onClick: (me) => y(R.id)
            }, [
              n("span", Va, v(R.icon), 1),
              n("span", Ua, v(R.title), 1),
              a.value === R.id ? (l(), d("span", Ya, "✓")) : M("", !0)
            ], 10, Ka))), 128))
          ]),
          O[16] || (O[16] = n("div", { class: "ms-cube-cm-divider" }, null, -1)),
          n("button", {
            type: "button",
            class: "ms-cube-cm-action",
            onClick: $
          }, [...O[12] || (O[12] = [
            n("span", null, "＋ 添加面 / 管理面", -1)
          ])]),
          n("button", {
            type: "button",
            class: "ms-cube-cm-action",
            onClick: O[6] || (O[6] = (R) => {
              Y(-1), k.value = !1;
            })
          }, [...O[13] || (O[13] = [
            n("span", null, "⏮ 上一个面板", -1)
          ])]),
          n("button", {
            type: "button",
            class: "ms-cube-cm-action",
            onClick: O[7] || (O[7] = (R) => {
              Y(1), k.value = !1;
            })
          }, [...O[14] || (O[14] = [
            n("span", null, "⏭ 下一个面板", -1)
          ])]),
          a.value ? (l(), d("button", {
            key: 0,
            type: "button",
            class: "ms-cube-cm-action danger",
            onClick: O[8] || (O[8] = (R) => L(() => s(De).removeCustomFace(a.value)))
          }, "删除当前面")) : M("", !0),
          n("button", {
            type: "button",
            class: "ms-cube-cm-action danger",
            onClick: b
          }, [...O[15] || (O[15] = [
            n("span", null, "↺ 恢复默认（仅音乐）", -1)
          ])])
        ], 4)) : M("", !0)
      ])),
      t.active ? (l(), ce(ka, { key: 1 })) : M("", !0)
    ], 40, _a)), [
      [no, t.active]
    ]);
  }
}), Xa = /* @__PURE__ */ Ie(qa, [["__scopeId", "data-v-c3454bdf"]]), _o = ke({
  isOpen: !1
}), ts = {
  open() {
    _o.isOpen = !0;
  },
  close() {
    _o.isOpen = !1;
  },
  toggle() {
    _o.isOpen = !_o.isOpen;
  }
}, Nn = Lt(_o);
function Ja() {
  if (typeof chrome > "u" || !chrome.runtime?.onMessage) return () => {
  };
  let e = !1, t;
  const o = (i, r, a) => {
    r.id !== chrome.runtime.id || i?.type !== "TOGGLE_SIDE_DRAWER" || t === void 0 || i.targetTabId !== t || (ts.toggle(), a({ ok: !0 }));
  };
  return chrome.tabs.getCurrent().then((i) => {
    e || (t = i?.id, chrome.runtime.onMessage.addListener(o));
  }).catch(() => console.warn("[SideDrawer] Could not bind the home-page command.")), () => {
    e = !0, chrome.runtime.onMessage.removeListener(o);
  };
}
const Za = { class: "tb-brand" }, Qa = ["aria-expanded", "aria-label"], el = ["src", "alt"], tl = ["hidden"], ol = ["hidden"], nl = { id: "vue-bookmark-folder-strip-root" }, il = { class: "tb-actions" }, sl = {
  id: "workspace-launchers",
  hidden: ""
}, rl = ["aria-expanded"], al = /* @__PURE__ */ de({
  __name: "AppTopBar",
  setup(e) {
    const t = z(() => import("./WorkspaceLaunchers-QAzOkrns.js"));
    function o(p) {
      p.preventDefault(), p.stopPropagation();
      const c = typeof window < "u" ? window : null;
      c?.LogicWeaverWindowManager?.open ? c.LogicWeaverWindowManager.open("settings") : c?.LogicWeaverWindowTabs?.open ? c.LogicWeaverWindowTabs.open("settings") : nn.open();
    }
    function i(p) {
      p.preventDefault();
      const c = typeof window < "u" ? window : null;
      typeof c?.toggleBookmarkPanel == "function" ? c.toggleBookmarkPanel() : c?.LogicWeaverBookmarkPanel?.toggle ? c.LogicWeaverBookmarkPanel.toggle() : jn.toggleBookmarkPanel();
    }
    function r(p) {
      p.preventDefault(), xt.toggle();
    }
    function a(p) {
      p.preventDefault(), Io.open(p.clientX, p.clientY);
    }
    const h = [
      { id: "light", icon: "☀️", label: "白天模式" },
      { id: "dark", icon: "🌙", label: "夜晚模式" },
      { id: "endfield", icon: "⚡", label: "终末地风格" },
      { id: "lonetrail", icon: "🌌", label: "孤星风格" }
    ], f = N("☀️"), u = N("切换主题");
    function x() {
      if (typeof document > "u") return;
      const p = document.documentElement.dataset.theme || "light", c = h.find((y) => y.id === p) || h.find((y) => y.id === "light") || h[0];
      f.value = c.icon, u.value = `主题：${c.label}（点击更换）`;
    }
    function k(p) {
      if (p.preventDefault(), typeof document > "u") return;
      const c = document.documentElement.dataset.theme || "light", y = h.findIndex((b) => b.id === c), $ = h[(y + 1) % h.length];
      document.documentElement.dataset.theme = $.id;
      try {
        localStorage.setItem("theme", $.id);
      } catch {
      }
      typeof chrome < "u" && chrome?.storage?.local && chrome.storage.local.set({ theme: $.id }), x(), document.querySelectorAll("iframe").forEach((b) => {
        try {
          b.contentWindow?.postMessage({ type: "theme-change", theme: $.id }, "*");
        } catch {
        }
      });
    }
    function T(p) {
      const c = p.target;
      c && (c.tagName === "INPUT" || c.tagName === "TEXTAREA" || c.isContentEditable) || (p.preventDefault(), p.stopPropagation());
    }
    function g(p) {
      const c = p.target;
      c && (c.tagName === "INPUT" || c.tagName === "TEXTAREA" || c.isContentEditable) || p.preventDefault();
    }
    return Ge(() => {
      xt.start();
      const p = localStorage.getItem("theme") || "light";
      document.documentElement.dataset.theme = p, document.documentElement.setAttribute("data-theme", p), x();
    }), (p, c) => (l(), d("header", {
      class: le(["topbar", { "bookmark-folders-mode": s(Ut).enabled }]),
      onCopy: T,
      onSelectstart: g
    }, [
      n("div", Za, [
        n("button", {
          id: "bili-profile-button",
          class: "bili-profile-button",
          type: "button",
          title: "通知中心",
          "aria-controls": "notification-center",
          "aria-expanded": s(Ei).isOpen,
          "aria-label": s(co) ? `通知中心，${s(co)} 条未读` : "通知中心",
          onClick: r,
          onContextmenu: c[0] || (c[0] = F((y) => a(y), ["prevent"]))
        }, [
          n("img", {
            id: "bili-profile-avatar",
            src: s(Kt).avatarUrl || "assets/bilibili.svg",
            alt: s(Kt).userName || "通知中心头像"
          }, null, 8, el),
          n("span", {
            id: "bili-profile-badge",
            class: "bili-profile-badge",
            hidden: s(co) <= 0
          }, v(s(co) > 99 ? "99+" : s(co)), 9, tl)
        ], 40, Qa),
        n("button", {
          id: "bookmark-handle",
          class: "bookmark-handle",
          type: "button",
          "aria-expanded": "false",
          title: "书签",
          hidden: s(Ut).enabled,
          onClick: i
        }, [...c[2] || (c[2] = [
          n("span", { id: "bookmark-handle-icon" }, "📁", -1),
          n("span", null, "书签", -1)
        ])], 8, ol),
        n("div", nl, [
          q(ua)
        ])
      ]),
      q(Xa, {
        active: !s(Ct).activeId
      }, null, 8, ["active"]),
      n("div", il, [
        c[3] || (c[3] = n("button", {
          id: "daily-toggle",
          class: "tb-pill",
          type: "button",
          hidden: "",
          title: "查看日报"
        }, "📰 日报", -1)),
        n("span", sl, [
          q(s(t))
        ]),
        n("button", {
          id: "side-drawer-toggle",
          class: le(["tb-btn", { active: s(Nn).isOpen }]),
          type: "button",
          title: "侧栏 · 标签页聚合与待办",
          "aria-controls": "in-page-side-drawer",
          "aria-expanded": s(Nn).isOpen,
          onClick: c[1] || (c[1] = (y) => s(ts).toggle())
        }, " 📑 ", 10, rl),
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
        }, v(f.value), 1)
      ])
    ], 34));
  }
}), ll = {
  key: 0,
  class: "notice"
}, cl = {
  key: 1,
  class: "muted small"
}, dl = {
  key: 2,
  class: "notice"
}, ul = {
  key: 3,
  class: "notice"
}, pl = { class: "wx-cur" }, fl = { class: "wx-emoji" }, gl = { class: "wx-temp" }, hl = { class: "wx-sub" }, ml = { class: "wx-rain" }, vl = { class: "wx-hours" }, yl = { class: "hh" }, wl = { class: "he" }, bl = { class: "ht" }, kl = { class: "wx-days" }, _l = ["open"], Cl = { class: "weather-forecast-head" }, xl = { class: "weather-forecast-city-info" }, Ll = { class: "weather-forecast-icon" }, $l = { id: "weather-forecast-city-title" }, Sl = { class: "small muted" }, Tl = { class: "weather-forecast-actions" }, Il = {
  key: 0,
  class: "weather-metrics-grid"
}, Ml = { class: "weather-metric-item" }, Dl = {
  class: "metric-val",
  id: "weather-forecast-humidity"
}, Al = { class: "weather-metric-item" }, El = {
  class: "metric-val",
  id: "weather-forecast-wind"
}, Pl = { class: "weather-metric-item" }, Wl = {
  class: "metric-val",
  id: "weather-forecast-uv"
}, Ol = { class: "weather-metric-item" }, Bl = {
  class: "metric-val",
  id: "weather-forecast-aqi"
}, Rl = {
  class: "weather-forecast-list",
  id: "weather-forecast-days-list"
}, Nl = { class: "day-date-col" }, Fl = { class: "day-name" }, Hl = { class: "day-date small muted" }, jl = { class: "day-weather-col" }, zl = { class: "day-emoji" }, Gl = { class: "day-cond" }, Kl = { class: "day-rain-col" }, Vl = {
  key: 0,
  class: "rain-tag"
}, Ul = {
  key: 1,
  class: "rain-tag empty"
}, Yl = { class: "day-temp-bar-col" }, ql = { class: "low-temp" }, Xl = { class: "temp-track" }, Jl = { class: "high-temp" }, Zl = { class: "weather-location-head" }, Ql = { class: "weather-location-title-row" }, ec = ["title"], tc = { class: "weather-input-wrapper" }, oc = ["onKeydown"], nc = { key: 0 }, ic = {
  key: 0,
  class: "weather-location-suggestions"
}, sc = ["onClick"], rc = { class: "weather-suggestion-name" }, ac = { class: "weather-suggestion-sub" }, lc = {
  key: 1,
  class: "weather-suggestion-empty"
}, cc = { key: 1 }, dc = { class: "weather-quick-chips-grid" }, uc = ["onClick"], pc = /* @__PURE__ */ de({
  __name: "WeatherWidget",
  setup(e) {
    const t = N(!1), o = N({ x: 0, y: 0 }), i = N(""), r = N(null), a = N(null), h = ["深圳", "武汉", "北京", "上海", "广州", "成都", "杭州", "南京", "西安", "重庆", "苏州", "天津"], f = ae(() => {
      const b = i.value.trim();
      return b ? ko.filterCities(b, 6) : [];
    });
    function u(b) {
      const ne = b?.clientX ?? window.innerWidth / 2 - 140, E = b?.clientY ?? window.innerHeight / 2 - 320 / 2, w = Math.max(12, Math.min(window.innerWidth - 280 - 12, ne)), _ = Math.max(12, Math.min(window.innerHeight - 320 - 12, E));
      o.value = { x: w, y: _ }, t.value = !0, i.value = "", ft(() => {
        a.value?.focus();
      });
    }
    function x() {
      t.value = !1, i.value = "";
    }
    async function k(b) {
      const L = b.trim();
      L && (x(), await ko.changeCity(L));
    }
    function T() {
      const b = i.value.trim();
      b && k(b);
    }
    function g(b) {
      if (!t.value) return;
      const L = b.target;
      r.value && !r.value.contains(L) && x();
    }
    function p(b) {
      t.value && b.key === "Escape" && (b.preventDefault(), x());
    }
    Ge(() => {
      nt.setRefreshAction(() => {
        ko.loadWeather();
      }), nt.setChangeLocationAction((b) => {
        u(b);
      }), ko.loadWeather(), window.addEventListener("pointerdown", g, !0), window.addEventListener("keydown", p, !0);
    }), $t(() => {
      window.removeEventListener("pointerdown", g, !0), window.removeEventListener("keydown", p, !0);
    });
    function c(b) {
      b.preventDefault(), u(b);
    }
    function y() {
      nt.closeForecastModal();
    }
    function $(b) {
      b.target?.id === "weather-forecast-dialog" && y();
    }
    return (b, L) => (l(), d("div", {
      class: "weather-widget-container",
      onContextmenu: c
    }, [
      s(j).state === "unconfigured" ? (l(), d("p", ll, [...L[6] || (L[6] = [
        Fe(" 未设置城市。右键此处快速设置，或到 ", -1),
        n("a", { href: "options.html" }, "设置", -1),
        Fe(" 填写城市名（如 武汉 / Tokyo）。 ", -1)
      ])])) : s(j).state === "loading" ? (l(), d("p", cl, "加载中…")) : s(j).state === "not_found" ? (l(), d("p", dl, "找不到城市「" + v(s(j).city) + "」，右键可重新选择地点。", 1)) : s(j).state === "error" ? (l(), d("p", ul, v(s(j).errorMessage || "天气加载失败，右键此处可重新选择地点。"), 1)) : s(j).state === "ready" && s(j).data ? (l(), d(G, { key: 4 }, [
        n("div", pl, [
          n("span", fl, v(s(j).data.currentEmoji), 1),
          n("span", gl, v(s(j).data.currentTemp) + "°", 1)
        ]),
        n("p", hl, v(s(j).data.subText), 1),
        n("p", ml, v(s(j).data.rainText), 1),
        n("div", vl, [
          (l(!0), d(G, null, fe(s(j).data.hours, (A, ee) => (l(), d("div", {
            key: ee,
            class: "wx-h"
          }, [
            n("span", yl, v(A.time), 1),
            n("span", wl, v(A.emoji), 1),
            n("span", bl, v(A.temp) + "°", 1)
          ]))), 128))
        ]),
        n("div", kl, [
          (l(!0), d(G, null, fe(s(j).data.days, (A, ee) => (l(), d("span", { key: ee }, v(A.label) + " " + v(A.emoji) + " " + v(A.tempRange), 1))), 128))
        ])
      ], 64)) : M("", !0),
      n("dialog", {
        id: "weather-forecast-dialog",
        class: "weather-forecast-dialog",
        open: s(j).forecastModalOpen,
        onClick: $
      }, [
        n("div", {
          class: "weather-forecast-shell",
          onClick: L[1] || (L[1] = F(() => {
          }, ["stop"]))
        }, [
          n("header", Cl, [
            n("div", xl, [
              n("span", Ll, v(s(j).data?.currentEmoji || "🌤️"), 1),
              n("div", null, [
                n("h3", $l, v(s(j).city || s(j).data?.cityName || "天气预报"), 1),
                n("p", Sl, v(s(j).data?.subText || "未来多日天气趋势与生活气象指数"), 1)
              ])
            ]),
            n("div", Tl, [
              n("button", {
                id: "weather-forecast-refresh-btn",
                type: "button",
                class: "weather-forecast-btn",
                title: "刷新天气数据",
                onClick: L[0] || (L[0] = (A) => s(nt).refresh())
              }, " ↻ 刷新 "),
              n("button", {
                id: "weather-forecast-close-btn",
                type: "button",
                class: "weather-forecast-close",
                title: "关闭",
                onClick: y
              }, " ✕ ")
            ])
          ]),
          s(j).detailInfo ? (l(), d("div", Il, [
            n("div", Ml, [
              L[7] || (L[7] = n("span", { class: "metric-label" }, "💧 相对湿度", -1)),
              n("span", Dl, v(s(j).detailInfo.humidity || "50%"), 1)
            ]),
            n("div", Al, [
              L[8] || (L[8] = n("span", { class: "metric-label" }, "💨 风力风向", -1)),
              n("span", El, v(s(j).detailInfo.wind || "微风"), 1)
            ]),
            n("div", Pl, [
              L[9] || (L[9] = n("span", { class: "metric-label" }, "☀️ 紫外线指数", -1)),
              n("span", Wl, v(s(j).detailInfo.uvIndex || "中等"), 1)
            ]),
            n("div", Ol, [
              L[10] || (L[10] = n("span", { class: "metric-label" }, "🍃 空气质量", -1)),
              n("span", Bl, v(s(j).detailInfo.airQuality || "良"), 1)
            ])
          ])) : M("", !0),
          n("div", Rl, [
            (l(!0), d(G, null, fe(s(j).forecastDays, (A, ee) => (l(), d("div", {
              key: ee,
              class: "weather-forecast-day-row forecast-day-item"
            }, [
              n("div", Nl, [
                n("span", Fl, v(A.dayName), 1),
                n("span", Hl, v(A.date), 1)
              ]),
              n("div", jl, [
                n("span", zl, v(A.emoji), 1),
                n("span", Gl, v(A.condition), 1)
              ]),
              n("div", Kl, [
                A.rainProb > 0 ? (l(), d("span", Vl, "☂️ " + v(A.rainProb) + "%", 1)) : (l(), d("span", Ul, "无降水"))
              ]),
              n("div", Yl, [
                n("span", ql, v(A.lowTemp) + "°", 1),
                n("div", Xl, [
                  n("div", {
                    class: "temp-range-fill",
                    style: ye({
                      left: `${Math.max(0, Math.min(100, (A.lowTemp + 10) * 2))}%`,
                      width: `${Math.max(20, Math.min(80, (A.highTemp - A.lowTemp) * 6))}%`
                    })
                  }, null, 4)
                ]),
                n("span", Jl, v(A.highTemp) + "°", 1)
              ])
            ]))), 128))
          ])
        ])
      ], 8, _l),
      (l(), ce(gt, { to: "body" }, [
        t.value ? (l(), d("div", {
          key: 0,
          ref_key: "contextMenuRef",
          ref: r,
          class: "weather-location-context-menu",
          style: ye({ left: `${o.value.x}px`, top: `${o.value.y}px` }),
          onClick: L[4] || (L[4] = F(() => {
          }, ["stop"])),
          onContextmenu: L[5] || (L[5] = F(() => {
          }, ["prevent"]))
        }, [
          n("div", Zl, [
            n("div", Ql, [
              L[12] || (L[12] = n("span", { class: "weather-location-title" }, "切换天气地点", -1)),
              n("span", {
                class: "weather-location-curr-badge",
                title: s(j).city
              }, [
                L[11] || (L[11] = n("span", { class: "weather-curr-dot" }, null, -1)),
                Fe(" " + v(s(j).city || "未设置"), 1)
              ], 8, ec)
            ])
          ]),
          n("form", {
            class: "weather-location-form",
            onSubmit: F(T, ["prevent"])
          }, [
            n("div", tc, [
              L[13] || (L[13] = n("span", { class: "weather-input-icon" }, "🔍", -1)),
              Ne(n("input", {
                ref_key: "inputRef",
                ref: a,
                class: "weather-location-input",
                placeholder: "输入城市名或拼音…",
                "onUpdate:modelValue": L[2] || (L[2] = (A) => i.value = A),
                onKeydown: Bt(F(T, ["prevent"]), ["enter"]),
                autocomplete: "off"
              }, null, 40, oc), [
                [oo, i.value]
              ]),
              i.value ? (l(), d("button", {
                key: 0,
                type: "button",
                class: "weather-input-clear",
                onClick: L[3] || (L[3] = (A) => i.value = ""),
                title: "清除输入"
              }, "✕")) : M("", !0)
            ]),
            L[14] || (L[14] = n("button", {
              type: "submit",
              class: "weather-location-submit"
            }, "确定", -1))
          ], 32),
          i.value.trim() ? (l(), d("div", nc, [
            L[15] || (L[15] = n("div", { class: "weather-section-subtitle" }, "匹配建议", -1)),
            f.value.length ? (l(), d("div", ic, [
              (l(!0), d(G, null, fe(f.value, (A) => (l(), d("button", {
                key: A.name + A.admin,
                type: "button",
                class: "weather-suggestion-item",
                onClick: (ee) => k(A.name)
              }, [
                n("span", rc, v(A.name), 1),
                n("span", ac, v(A.admin), 1)
              ], 8, sc))), 128))
            ])) : (l(), d("div", lc, " 未找到完全匹配城市，回车或点击「确定」直接尝试检索 "))
          ])) : (l(), d("div", cc, [
            L[16] || (L[16] = n("div", { class: "weather-section-subtitle" }, "常用城市", -1)),
            n("div", dc, [
              (l(), d(G, null, fe(h, (A) => n("button", {
                key: A,
                type: "button",
                class: le(["weather-quick-chip", { active: s(j).city === A }]),
                onClick: (ee) => k(A)
              }, v(A), 11, uc)), 64))
            ])
          ]))
        ], 36)) : M("", !0)
      ]))
    ], 32));
  }
}), os = /* @__PURE__ */ Ie(pc, [["__scopeId", "data-v-51b21266"]]), Fn = "heroCustomMottoV1";
function fc() {
  try {
    if (typeof localStorage < "u") {
      const e = localStorage.getItem(Fn);
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
const zt = fc(), V = ke({
  loaded: !1,
  customText: zt.customText,
  history: zt.history,
  currentIndex: zt.customText && zt.history.length ? zt.history.findIndex((e) => e.text === zt.customText) : -1,
  menuOpen: !1,
  menuPos: { x: 0, y: 0 }
});
function gc(e) {
  return new Promise((t) => {
    typeof chrome < "u" && chrome?.storage?.local?.get ? chrome.storage.local.get([e], (o) => t(o?.[e])) : t(null);
  });
}
function hc(e, t) {
  try {
    typeof localStorage < "u" && localStorage.setItem(e, JSON.stringify(t));
  } catch {
  }
  return new Promise((o) => {
    typeof chrome < "u" && chrome?.storage?.local?.set ? chrome.storage.local.set({ [e]: t }, () => o()) : o();
  });
}
function mc(e) {
  const t = (r) => String(r).padStart(2, "0"), o = `${e.getFullYear()}-${t(e.getMonth() + 1)}-${t(e.getDate())}`, i = `${t(e.getHours())}:${t(e.getMinutes())}`;
  return { date: o, time: i };
}
const ot = {
  async init() {
    try {
      const e = await gc(Fn);
      if (e && typeof e == "object") {
        const t = Array.isArray(e.history) ? e.history : [];
        t.length >= V.history.length && (V.history = t, e.customText !== void 0 && (V.customText = e.customText));
      }
    } catch (e) {
      console.warn("[HeroMotto] Sync chrome.storage failed:", e);
    } finally {
      V.loaded = !0, V.customText && V.history.length && (V.currentIndex = V.history.findIndex(
        (e) => e.text === V.customText
      ));
    }
  },
  async persist() {
    const e = {
      customText: V.customText,
      history: V.history
    };
    await hc(Fn, e);
  },
  setCustomMotto(e) {
    const t = e.trim();
    if (!t) {
      this.resetToSystem();
      return;
    }
    const { date: o, time: i } = mc(/* @__PURE__ */ new Date());
    V.customText = t;
    const r = V.history.findIndex((a) => a.text === t);
    if (r !== -1) {
      const a = V.history.splice(r, 1)[0];
      a.date = o, a.time = i, V.history.unshift(a);
    } else
      V.history.unshift({
        id: `motto_${Date.now()}`,
        date: o,
        time: i,
        text: t,
        createdAt: Date.now()
      });
    V.history.length > 50 && (V.history = V.history.slice(0, 50)), V.currentIndex = 0, this.persist();
  },
  selectHistory(e) {
    V.customText = e.text, V.currentIndex = V.history.findIndex((t) => t.id === e.id), this.closeMenu(), this.persist();
  },
  resetToSystem() {
    V.customText = null, V.currentIndex = -1, this.closeMenu(), this.persist();
  },
  deleteEntry(e) {
    const t = V.history.findIndex((o) => o.id === e);
    t !== -1 && (V.history.splice(t, 1), V.currentIndex === t && (V.history.length > 0 ? this.selectHistory(V.history[0]) : this.resetToSystem()), this.persist());
  },
  clearHistory() {
    V.history = [], this.resetToSystem();
  },
  stepHistory(e) {
    if (!V.history.length) return;
    let t = V.currentIndex + e;
    if (t < 0) {
      this.resetToSystem();
      return;
    }
    t >= V.history.length && (t = 0), this.selectHistory(V.history[t]);
  },
  openMenu(e, t) {
    V.menuPos = { x: e, y: t }, V.menuOpen = !0;
  },
  closeMenu() {
    V.menuOpen = !1;
  }
}, vc = { class: "motto-content" }, yc = {
  key: 0,
  class: "motto-scroll-hint",
  title: "滚动鼠标滚轮快速切换历史标语"
}, wc = { class: "motto-menu-header" }, bc = { class: "dim" }, kc = { class: "motto-history-list" }, _c = {
  key: 0,
  class: "motto-history-empty dim"
}, Cc = ["onClick"], xc = { class: "motto-item-date" }, Lc = ["title"], $c = ["onClick"], Sc = /* @__PURE__ */ de({
  __name: "HeroMotto",
  setup(e) {
    const t = N(!1), o = N(""), i = N(null), r = ae(() => V.customText || ve.greetingText);
    function a() {
      ot.closeMenu(), o.value = V.customText || ve.greetingText, t.value = !0, ft(() => {
        i.value?.focus(), i.value?.select();
      });
    }
    function h() {
      if (!t.value) return;
      t.value = !1;
      const g = o.value.trim();
      ot.setCustomMotto(g), g && be.fetch("标语", `已更新标语: ${g}`);
    }
    function f() {
      t.value = !1;
    }
    function u(g) {
      g.key === "Enter" ? (g.preventDefault(), h()) : g.key === "Escape" && (g.preventDefault(), f());
    }
    function x(g) {
      t.value || (g.preventDefault(), g.stopPropagation(), ot.stepHistory(g.deltaY > 0 ? 1 : -1));
    }
    function k(g) {
      g.preventDefault(), g.stopPropagation(), ot.openMenu(g.clientX, g.clientY);
    }
    function T(g) {
      V.menuOpen && (g.target.closest(".motto-context-menu") || ot.closeMenu());
    }
    return Ge(() => {
      ot.init(), window.addEventListener("click", T);
    }), $t(() => {
      window.removeEventListener("click", T);
    }), (g, p) => (l(), d(G, null, [
      n("div", {
        class: "hero-motto-wrapper",
        title: "点击直接编辑标语 · 滚轮切换历史标语 · 右键查看标语菜单",
        onWheel: x,
        onContextmenu: k
      }, [
        t.value ? Ne((l(), d("input", {
          key: 0,
          ref_key: "mottoInputRef",
          ref: i,
          "onUpdate:modelValue": p[0] || (p[0] = (c) => o.value = c),
          class: "hero-motto-input",
          type: "text",
          placeholder: "写下你此刻的个性标语…",
          maxlength: "60",
          onBlur: h,
          onKeydown: u
        }, null, 544)), [
          [oo, o.value]
        ]) : (l(), d("p", {
          key: 1,
          id: "greeting",
          class: "hero-motto-text",
          style: ye({ color: s(ve).greetColor }),
          onClick: a
        }, [
          n("span", vc, v(r.value), 1),
          s(V).history.length > 1 ? (l(), d("span", yc, "⇕")) : M("", !0)
        ], 4))
      ], 32),
      (l(), ce(gt, { to: "body" }, [
        s(V).menuOpen ? (l(), d("div", {
          key: 0,
          class: "motto-context-menu",
          style: ye({ left: `${s(V).menuPos.x}px`, top: `${s(V).menuPos.y}px` }),
          onClick: p[3] || (p[3] = F(() => {
          }, ["stop"])),
          onContextmenu: p[4] || (p[4] = F(() => {
          }, ["prevent"]))
        }, [
          n("div", wc, [
            p[5] || (p[5] = n("span", null, "🏷️ 自定义标语", -1)),
            n("small", bc, v(s(V).history.length) + " 条记录", 1)
          ]),
          n("button", {
            type: "button",
            class: "motto-menu-action",
            onClick: a
          }, [...p[6] || (p[6] = [
            n("i", null, "✎", -1),
            n("span", null, "编辑当前标语", -1)
          ])]),
          p[9] || (p[9] = n("div", { class: "motto-menu-divider" }, null, -1)),
          p[10] || (p[10] = n("div", { class: "motto-history-label" }, "历史标语记录（点击切换）：", -1)),
          n("div", kc, [
            s(V).history.length ? (l(!0), d(G, { key: 1 }, fe(s(V).history, (c) => (l(), d("div", {
              key: c.id,
              class: le(["motto-history-item", { active: s(V).customText === c.text }]),
              onClick: (y) => s(ot).selectHistory(c)
            }, [
              n("span", xc, v(c.date), 1),
              n("span", {
                class: "motto-item-text",
                title: c.text
              }, v(c.text), 9, Lc),
              n("button", {
                type: "button",
                class: "motto-item-del",
                title: "删除此条标语",
                onClick: F((y) => s(ot).deleteEntry(c.id), ["stop"])
              }, "×", 8, $c)
            ], 10, Cc))), 128)) : (l(), d("div", _c, " 暂无历史标语，自定义的每一条标语都会沉淀在此 "))
          ]),
          p[11] || (p[11] = n("div", { class: "motto-menu-divider" }, null, -1)),
          n("button", {
            type: "button",
            class: "motto-menu-action reset-btn",
            onClick: p[1] || (p[1] = //@ts-ignore
            (...c) => s(ot).resetToSystem && s(ot).resetToSystem(...c))
          }, [...p[7] || (p[7] = [
            n("i", null, "↻", -1),
            n("span", null, "恢复系统自动问候（早安/午安/晚安）", -1)
          ])]),
          s(V).history.length ? (l(), d("button", {
            key: 0,
            type: "button",
            class: "motto-menu-action danger-btn",
            onClick: p[2] || (p[2] = //@ts-ignore
            (...c) => s(ot).clearHistory && s(ot).clearHistory(...c))
          }, [...p[8] || (p[8] = [
            n("i", null, "🗑", -1),
            n("span", null, "清空全部历史标语", -1)
          ])])) : M("", !0)
        ], 36)) : M("", !0)
      ]))
    ], 64));
  }
}), Tc = /* @__PURE__ */ Ie(Sc, [["__scopeId", "data-v-0514f22a"]]), Ic = /* @__PURE__ */ de({
  __name: "HeroClock",
  setup(e) {
    const t = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
    function o(u) {
      return u < 5 ? "夜深了" : u < 9 ? "早上好" : u < 12 ? "上午好" : u < 14 ? "中午好" : u < 18 ? "下午好" : u < 23 ? "晚上好" : "夜深了";
    }
    function i() {
      const u = Wt.state.timezone;
      if (!u || u === "local") return /* @__PURE__ */ new Date();
      try {
        const x = (/* @__PURE__ */ new Date()).toLocaleString("en-US", { timeZone: u });
        return new Date(x);
      } catch {
        return /* @__PURE__ */ new Date();
      }
    }
    function r() {
      const u = (ne) => String(ne).padStart(2, "0"), x = i(), k = x.getHours(), T = x.getMinutes(), g = x.getSeconds(), p = x.getFullYear(), c = x.getMonth() + 1, y = x.getDate(), $ = x.getDay(), b = `${u(k)}:${u(T)}`, L = `:${u(g)}`, A = o(k), ee = `${p}年${c}月${y}日 · ${t[$]}`;
      qt.updateTime(b, L, A, ee);
    }
    function a(u) {
      u.preventDefault(), Wt.open({ clientX: u.clientX, clientY: u.clientY });
    }
    function h() {
      document.hidden ? f && (clearInterval(f), f = null) : (r(), f || (f = setInterval(r, 1e3)));
    }
    let f = null;
    return Wt.initPreferences(), r(), Ge(() => {
      Wt.initPreferences(), Ct.activeId || (r(), f = setInterval(r, 1e3)), document.addEventListener("visibilitychange", h);
    }), Ue(
      () => Ct.activeId,
      (u) => {
        u ? f && (clearInterval(f), f = null) : document.hidden || (r(), f || (f = setInterval(r, 1e3)));
      }
    ), $t(() => {
      f && (clearInterval(f), f = null), document.removeEventListener("visibilitychange", h);
    }), (u, x) => (l(), d("div", {
      class: "hero-clock-vue-container",
      onContextmenu: a
    }, [
      n("p", {
        id: "clock",
        class: "clock",
        style: ye({ fontFamily: s(ve).fontFamily, color: s(ve).colorHex })
      }, [
        Fe(v(s(ve).timeText), 1),
        n("span", {
          id: "secs",
          style: ye({ color: s(ve).colorHex })
        }, v(s(ve).secsText), 5)
      ], 4),
      n("p", {
        id: "date",
        class: "date",
        style: ye({ color: s(ve).dateColor })
      }, v(s(ve).dateText), 5)
    ], 32));
  }
}), ns = /* @__PURE__ */ Ie(Ic, [["__scopeId", "data-v-38840808"]]), Mc = {
  key: 0,
  class: "home-music-degraded-box"
}, Dc = { class: "degraded-badge-row" }, Ac = { class: "degraded-status" }, Ec = {
  key: 0,
  class: "degraded-host-tag"
}, Pc = {
  key: 1,
  class: "degraded-host-tag"
}, Wc = { class: "degraded-title-row" }, Oc = ["title"], Bc = { class: "degraded-track-artist" }, Rc = { class: "degraded-progress-bar-wrap" }, Nc = { class: "degraded-actions" }, Fc = { class: "degraded-time" }, Hc = { class: "home-vinyl-box" }, jc = ["src"], zc = { class: "home-music-right" }, Gc = ["title"], Kc = {
  id: "home-music-artist",
  class: "home-music-meta-artist"
}, Vc = { class: "home-music-seek-row" }, Uc = {
  id: "home-music-cur",
  class: "home-music-time"
}, Yc = ["value"], qc = {
  id: "home-music-dur",
  class: "home-music-time"
}, Xc = { class: "home-music-actions" }, Jc = /* @__PURE__ */ de({
  __name: "HomeMusicCard",
  setup(e) {
    Ge(() => {
      setTimeout(() => {
        js();
      }, 200);
    });
    const t = ae(() => Ai.visible || st.djModalOpen || st.isActive && st.isJoined), o = ae(() => st.isActive && st.isJoined), i = ae(() => U.mode === "shuffle" ? "🔀" : U.mode === "one" ? "🔂" : "🔁");
    function r(h) {
      const f = h.target, u = Number(f.value);
      Ve.seek(u);
    }
    function a() {
      Ve.update({ coverUrl: "" });
    }
    return (h, f) => (l(), d("div", {
      id: "home-music-player-view",
      class: le(["home-music-player-view", { "is-degraded": t.value }])
    }, [
      t.value ? (l(), d("div", Mc, [
        n("div", Dc, [
          f[7] || (f[7] = n("span", { class: "degraded-icon" }, "🎧", -1)),
          n("strong", Ac, v(o.value ? "正在一起听" : "后台收听中"), 1),
          o.value ? (l(), d("span", Ec, " DJ: " + v(s(st).hostName), 1)) : (l(), d("span", Pc, " 工作区就绪 "))
        ]),
        n("div", Wc, [
          n("h3", {
            class: "degraded-track-title",
            title: s(U).title
          }, v(s(U).title || "待机中"), 9, Oc),
          n("p", Bc, v(s(U).artist), 1)
        ]),
        n("div", Rc, [
          n("div", {
            class: "degraded-progress-bar-fill",
            style: ye({ width: s(U).progressPercent + "%" })
          }, null, 4)
        ]),
        n("div", Nc, [
          n("button", {
            type: "button",
            class: "degraded-btn",
            onClick: f[0] || (f[0] = (u) => s(Ve).togglePlay())
          }, v(s(U).playing ? "⏸ 暂停" : "▶ 播放"), 1),
          n("span", Fc, v(s(U).formattedCurrent) + " / " + v(s(U).formattedDuration), 1)
        ])
      ])) : (l(), d(G, { key: 1 }, [
        n("div", Hc, [
          n("div", {
            id: "home-vinyl-needle",
            class: le(["home-vinyl-needle", { playing: s(U).playing }])
          }, [...f[8] || (f[8] = [
            wo('<svg viewBox="0 0 32 52" fill="none" data-v-25a69816><circle cx="26" cy="4" r="3.5" fill="#e2e8f0" stroke="#475569" stroke-width="1.5" data-v-25a69816></circle><circle cx="26" cy="4" r="1.5" fill="#64748b" data-v-25a69816></circle><path d="M26 4 L14 26 L11 44" stroke="#cbd5e1" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" data-v-25a69816></path><rect x="7" y="42" width="8" height="9" rx="1.5" fill="#f43f5e" transform="rotate(-15 11 46)" data-v-25a69816></rect></svg>', 1)
          ])], 2),
          n("div", {
            id: "home-vinyl-disc",
            class: le(["home-vinyl-disc", { playing: s(U).playing }]),
            title: "点击播放 / 暂停",
            onClick: f[1] || (f[1] = (u) => s(Ve).togglePlay())
          }, [
            s(U).coverUrl ? (l(), d("img", {
              key: 0,
              id: "home-vinyl-cover",
              class: "home-vinyl-cover",
              referrerpolicy: "no-referrer",
              src: s(U).coverUrl,
              alt: "音乐封面",
              onError: a
            }, null, 40, jc)) : M("", !0),
            f[9] || (f[9] = n("div", { class: "home-vinyl-hole" }, null, -1))
          ], 2)
        ]),
        n("div", zc, [
          n("h3", {
            id: "home-music-title",
            class: "home-music-meta-title",
            title: s(U).title
          }, v(s(U).title), 9, Gc),
          n("p", Kc, v(s(U).artist), 1),
          n("div", Vc, [
            n("span", Uc, v(s(U).formattedCurrent), 1),
            n("input", {
              id: "home-music-seek",
              class: "home-music-seek-bar",
              type: "range",
              min: "0",
              max: "100",
              value: s(U).progressPercent,
              onInput: r
            }, null, 40, Yc),
            n("span", qc, v(s(U).formattedDuration), 1)
          ]),
          n("div", Xc, [
            n("button", {
              id: "home-music-prev",
              class: "home-music-btn",
              type: "button",
              title: "上一首",
              onClick: f[2] || (f[2] = (u) => s(Ve).prev())
            }, " ⏮ "),
            n("button", {
              id: "home-music-play",
              class: "home-music-btn play-btn",
              type: "button",
              title: "播放 / 暂停",
              onClick: f[3] || (f[3] = (u) => s(Ve).togglePlay())
            }, v(s(U).playing ? "⏸" : "▶"), 1),
            n("button", {
              id: "home-music-next",
              class: "home-music-btn",
              type: "button",
              title: "下一首",
              onClick: f[4] || (f[4] = (u) => s(Ve).next())
            }, " ⏭ "),
            n("button", {
              id: "home-music-like",
              class: le(["home-music-btn like-btn", { liked: s(U).liked }]),
              type: "button",
              title: "收藏",
              onClick: f[5] || (f[5] = (u) => s(Ve).toggleLike())
            }, v(s(U).liked ? "♥" : "♡"), 3),
            n("button", {
              id: "home-music-mode",
              class: "home-music-btn",
              type: "button",
              title: "播放模式",
              onClick: f[6] || (f[6] = (u) => s(Ve).cycleMode())
            }, v(i.value), 1)
          ])
        ])
      ], 64))
    ], 2));
  }
}), is = /* @__PURE__ */ Ie(Jc, [["__scopeId", "data-v-25a69816"]]), ut = /* @__PURE__ */ new Map(), pt = /* @__PURE__ */ new Set();
function Zc(e, t) {
  for (ut.delete(e), ut.set(e, t), pt.delete(t), pt.add(t); ut.size > 512; )
    ut.delete(ut.keys().next().value);
  for (; pt.size > 512; )
    pt.delete(pt.values().next().value);
}
const Qc = {
  key: 0,
  class: "launcher-fallback"
}, ed = ["src"], $n = "lw_resolved_icon:", td = /* @__PURE__ */ de({
  __name: "LauncherFavicon",
  props: {
    link: {},
    mini: { type: Boolean, default: !1 }
  },
  setup(e) {
    function t(b) {
      try {
        return localStorage.getItem($n + b) || "";
      } catch {
        return "";
      }
    }
    function o(b, L) {
      try {
        localStorage.setItem($n + b, L);
      } catch {
      }
    }
    function i(b) {
      try {
        return localStorage.getItem("lw_sync_dataurl:" + b) || "";
      } catch {
        return "";
      }
    }
    const r = e;
    function a(b) {
      try {
        return new URL(b).hostname.replace(/^www\./, "");
      } catch {
        return b || "";
      }
    }
    function h(b) {
      try {
        return new URL(b).origin;
      } catch {
        return "";
      }
    }
    function f(b) {
      try {
        const L = window, A = typeof L.chrome < "u" ? L.chrome : globalThis.chrome;
        if (typeof A?.runtime?.getURL == "function")
          return A.runtime.getURL("_favicon/?pageUrl=" + encodeURIComponent(b) + "&size=64");
      } catch {
      }
      return "";
    }
    const u = ae(() => {
      const b = r.link, L = (b.title || a(b.url)).trim();
      return L ? L.slice(0, 1).toUpperCase() : "🔗";
    }), x = N([]), k = N(0), T = N(!1), g = N(!1), p = ae(() => g.value || k.value >= x.value.length ? "" : x.value[k.value] || "");
    function c() {
      const b = r.link;
      if (!b?.url) {
        x.value = [], g.value = !0, T.value = !1;
        return;
      }
      const L = [], A = i(b.url);
      A && L.push(A);
      const ee = ut.get(b.url) || t(b.url);
      ee && !L.includes(ee) && L.push(ee);
      const ne = (W) => W ? /google\.com\/s2\/favicons|icons\.duckduckgo\.com|unavatar\.io|icon\.horse/i.test(W) : !1;
      b.customIcon && !ne(b.customIcon) && L.push(b.customIcon), b.icon && !ne(b.icon) && L.push(b.icon);
      const E = f(b.url);
      E && !L.includes(E) && L.push(E);
      const w = oe.getCachedIcon(b.url);
      w && !L.includes(w) && L.push(w);
      const _ = h(b.url);
      _ && !_.startsWith("http://1.") && !_.startsWith("http://192.") && !_.startsWith("http://127.") && L.push(`${_}/favicon.ico`), b.customIcon && !ne(b.customIcon) && L.unshift(b.customIcon);
      const D = [...new Set(L.filter(Boolean))];
      x.value = D, k.value = 0, g.value = D.length === 0;
      const Y = D[0];
      Y && (Y.startsWith("data:") || pt.has(Y)) && (T.value = !0);
    }
    Ue(
      () => [r.link?.url, r.link?.icon, r.link?.customIcon],
      (b, L) => {
        L && b[0] === L[0] && b[1] === L[1] && b[2] === L[2] || c();
      },
      { immediate: !0 }
    ), Ge(() => {
      x.value.length === 0 && c();
    });
    function y(b) {
      T.value = !0, g.value = !1;
      const L = p.value;
      if (L) {
        const A = pt.has(L), ee = ut.get(r.link.url);
        Zc(r.link.url, L), ee !== L && t(r.link.url) !== L && o(r.link.url, L);
        const ne = b.target;
        if (!A && !L.startsWith("data:")) {
          const E = r.link.url;
          setTimeout(() => {
            oe.cacheIcon(E, L, ne?.getAttribute("src") === L ? ne : null);
          }, 0);
        }
      }
    }
    function $() {
      const b = p.value;
      if (b) {
        pt.delete(b), ut.get(r.link.url) === b && ut.delete(r.link.url);
        try {
          localStorage.removeItem($n + r.link.url), localStorage.removeItem("lw_sync_dataurl:" + r.link.url);
        } catch {
        }
      }
      if (b && oe.getCachedIcon(r.link.url) === b && oe.evictCachedIcon(r.link.url), k.value + 1 < x.value.length) {
        k.value += 1;
        const L = x.value[k.value];
        L && (L.startsWith("data:") || pt.has(L)) && (T.value = !0);
      } else
        g.value = !0, T.value = !1;
    }
    return (b, L) => (l(), d("span", {
      class: le(e.mini ? "launcher-folder-mini" : "launcher-favicon")
    }, [
      g.value || !p.value ? (l(), d("span", Qc, v(u.value), 1)) : (l(), d("img", {
        key: 1,
        src: p.value,
        alt: "",
        draggable: "false",
        referrerpolicy: "no-referrer",
        decoding: "async",
        style: { "pointer-events": "none", "user-select": "none" },
        onLoad: y,
        onError: $
      }, null, 40, ed))
    ], 2));
  }
}), tn = /* @__PURE__ */ Ie(td, [["__scopeId", "data-v-bc41d0d8"]]), od = { class: "launcher-label launcher-title" }, nd = ["title"], id = {
  key: 0,
  class: "launcher-folder-more"
}, sd = {
  key: 1,
  class: "empty-folder",
  "aria-hidden": "true"
}, rd = { class: "launcher-folder-label launcher-title" }, ad = /* @__PURE__ */ de({
  __name: "LauncherTileContent",
  props: {
    link: {},
    folder: {},
    size: { default: "small" }
  },
  setup(e) {
    const t = e, o = ae(() => t.size === "large" ? 9 : 4), i = ae(() => t.folder?.preview.slice(0, t.folder.count > o.value ? o.value - 1 : o.value) || []);
    return (r, a) => e.link ? (l(), d(G, { key: 0 }, [
      q(tn, { link: e.link }, null, 8, ["link"]),
      n("span", od, v(e.link.title), 1)
    ], 64)) : e.folder ? (l(), d(G, { key: 1 }, [
      n("div", {
        class: "launcher-folder-preview",
        title: `打开${e.folder.title}`
      }, [
        (l(!0), d(G, null, fe(i.value, (h) => (l(), ce(tn, {
          key: h.id,
          link: h,
          mini: !0
        }, null, 8, ["link"]))), 128)),
        e.folder.count > o.value ? (l(), d("span", id, "+" + v(e.folder.count - (o.value - 1)), 1)) : M("", !0),
        i.value.length ? M("", !0) : (l(), d("span", sd, "📁")),
        Mi(r.$slots, "default", {}, void 0, !0)
      ], 8, nd),
      n("span", rd, v(e.folder.title), 1)
    ], 64)) : M("", !0);
  }
}), ki = /* @__PURE__ */ Ie(ad, [["__scopeId", "data-v-7f513029"]]), ld = 5, cd = 180;
function dd(e, t, o) {
  const i = t - e.left, r = o - e.top;
  return i > e.width * 0.25 && i < e.width * 0.75 && r > e.height * 0.25 && r < e.height * 0.75;
}
function ud(e, t, o) {
  return Math.hypot(t - (e.left + e.width / 2), o - (e.top + e.height / 2)) <= Math.max(e.width, e.height) * 0.55;
}
const pd = {
  class: "launcher-group launcher-aihot launcher-todoist size-large",
  id: "launcher-todoist"
}, fd = {
  class: "aihot-home-body",
  id: "aihot-home-body"
}, gd = {
  key: 0,
  class: "muted small"
}, hd = {
  key: 1,
  class: "notice small"
}, md = {
  key: 2,
  class: "muted small aihot-home-empty"
}, vd = {
  key: 3,
  class: "aihot-home-rich-list"
}, yd = ["href", "title", "onClick"], wd = { class: "aihot-home-rich-main" }, bd = { class: "aihot-home-rich-title" }, kd = {
  key: 0,
  class: "aihot-home-rich-summary"
}, _d = { class: "aihot-home-rich-meta" }, Cd = { class: "aihot-home-rich-meta-left" }, xd = {
  key: 0,
  class: "aihot-home-rich-tag"
}, Ld = { class: "aihot-home-rich-source" }, $d = { class: "aihot-home-rich-time" }, _i = 6, Sd = /* @__PURE__ */ de({
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
    }, o = N([]), i = N(0), r = N(!0), a = N("");
    function h(c) {
      return c.category ? t[c.category] || c.category : "";
    }
    function f(c) {
      const y = c.publishedAt || c.published || "";
      if (!y) return "最新";
      const $ = Number(y), b = Number.isFinite($) && $ > 0 ? new Date($ > 1e12 ? $ : $ * 1e3) : new Date(y);
      if (isNaN(b.getTime())) return String(y).slice(0, 16) || "最新";
      const L = (_) => String(_).padStart(2, "0"), A = b.getFullYear(), ee = L(b.getMonth() + 1), ne = L(b.getDate()), E = L(b.getHours()), w = L(b.getMinutes());
      return `${A}-${ee}-${ne} ${E}:${w}`;
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
      const y = (typeof window < "u" ? window : null)?.LogicWeaverAihotFeed?.getState?.()?.feedArticles;
      if (Array.isArray(y) && y.length)
        return y;
      const $ = [
        "newtab_aihot_items_v2",
        "lw-aihot-cached-feed-all-24h-v1",
        "lw-aihot-cached-feed-v1"
      ];
      for (const b of $)
        try {
          const L = localStorage.getItem(b);
          if (L) {
            const A = JSON.parse(L);
            if (Array.isArray(A) && A.length) return A;
            if (A && Array.isArray(A.items) && A.items.length) return A.items;
          }
        } catch {
        }
      return [];
    }
    async function k(c = !1) {
      if (!c && o.value.length > 0) return;
      const y = x();
      y.length ? (o.value = y, r.value = !1) : o.value.length || (o.value = [...u], r.value = !1);
      try {
        const b = await (await fetch("https://aihot.virxact.com/api/v1/items?mode=selected&window=24h&limit=24", {
          headers: { Accept: "application/json" },
          signal: AbortSignal.timeout(5e3)
        })).json(), L = Array.isArray(b) ? b : b.items || b.data || b.results || [];
        if (L.length) {
          o.value = L, i.value = 0, a.value = "";
          try {
            localStorage.setItem("newtab_aihot_items_v2", JSON.stringify(L.slice(0, 30)));
          } catch {
          }
        }
      } catch {
        o.value.length || (o.value = [...u]);
      } finally {
        r.value = !1;
      }
    }
    function T() {
      if (!o.value.length) {
        r.value = !0, k(!0);
        return;
      }
      i.value += _i, i.value >= o.value.length && (i.value = 0);
    }
    function g() {
      const c = window;
      if (typeof c.enterFullscreenCard == "function") {
        c.enterFullscreenCard("daily-aihot");
        return;
      }
      const y = document.querySelector("#daily-aihot, [data-dock-id='daily-aihot']");
      y ? y.scrollIntoView({ behavior: "smooth", block: "start" }) : window.open("https://aihot.virxact.com", "_blank", "noreferrer");
    }
    function p(c, y) {
      if (y.ctrlKey || y.metaKey || y.shiftKey || y.button === 1) return;
      y.preventDefault();
      const $ = c.links?.original || c.links?.aihot || c.url || "#";
      Vn.openArticle(
        {
          id: c.id,
          title: c.title,
          summary: c.summary,
          sourceName: c.source?.name || c.sourceName || "AI HOT",
          published: f(c),
          url: $
        },
        ""
      );
    }
    return Ge(() => {
      k();
    }), (c, y) => (l(), d("section", pd, [
      n("header", { class: "card-head aihot-home-head" }, [
        y[0] || (y[0] = n("span", { class: "bar cyan" }, null, -1)),
        y[1] || (y[1] = n("strong", { class: "title" }, "AI HOT 资讯", -1)),
        y[2] || (y[2] = n("span", { class: "grow" }, null, -1)),
        n("button", {
          class: "aihot-home-btn",
          type: "button",
          title: "换一批最新资讯",
          onClick: T
        }, " 换一批 ↻ "),
        n("button", {
          class: "aihot-home-btn aihot-home-more-btn",
          type: "button",
          title: "查看完整 AI HOT 榜单",
          onClick: g
        }, " 热榜 ↗ ")
      ]),
      n("div", fd, [
        r.value && !o.value.length ? (l(), d("p", gd, "正在加载精选资讯…")) : a.value && !o.value.length ? (l(), d("p", hd, v(a.value), 1)) : o.value.length ? (l(), d("div", vd, [
          (l(!0), d(G, null, fe(o.value.slice(i.value, i.value + _i), ($, b) => (l(), d("a", {
            key: $.id || $.title,
            class: "aihot-home-rich-card",
            href: $.links?.original || $.links?.aihot || $.url || "#",
            target: "_blank",
            rel: "noreferrer",
            title: `${$.title}
${$.summary || ""}
点击在阅读器中查看`,
            onClick: (L) => p($, L)
          }, [
            n("span", {
              class: le(["aihot-home-rich-rank", { top: i.value + b < 3 }])
            }, v(i.value + b + 1), 3),
            n("div", wd, [
              n("h3", bd, v($.title), 1),
              $.summary ? (l(), d("p", kd, v($.summary), 1)) : M("", !0),
              n("div", _d, [
                n("div", Cd, [
                  h($) ? (l(), d("span", xd, v(h($)), 1)) : M("", !0),
                  n("span", Ld, v($.source?.name || $.sourceName || "AI HOT"), 1)
                ]),
                n("time", $d, v(f($)), 1)
              ])
            ])
          ], 8, yd))), 128))
        ])) : (l(), d("p", md, "暂无精选资讯，请点击换一批重试"))
      ])
    ]));
  }
}), Td = /* @__PURE__ */ Ie(Sd, [["__scopeId", "data-v-cc4398a8"]]), Id = {
  class: "sites-view-switch",
  role: "group",
  "aria-label": "网站与书签切换"
}, Md = ["disabled", "aria-pressed"], Dd = ["disabled", "aria-pressed"], Ad = {
  class: "launcher-page-tabs",
  role: "tablist",
  "aria-label": "常用网站分区"
}, Ed = ["data-page", "title", "onClick", "onContextmenu", "onDragover", "onDrop"], Pd = {
  key: 0,
  id: "bookmark-board-header",
  class: "launcher-page-tabs"
}, Wd = ["data-page"], Od = ["href", "title", "data-launcher-id", "onPointerdown", "onClick", "onContextmenu"], Bd = ["title", "data-launcher-folder", "onPointerdown", "onDragstart", "onDrop", "onClick", "onContextmenu"], Rd = ["title", "onClick"], Nd = {
  class: "launcher-folder-count",
  hidden: ""
}, Fd = {
  class: "launcher-empty",
  key: "empty-msg"
}, Hd = {
  key: 1,
  class: "launcher-media-stack"
}, jd = {
  key: 1,
  id: "launcher-bili"
}, zd = { class: "launcher-folder-preview" }, Gd = { class: "launcher-folder-label launcher-title" }, Kd = { class: "launcher-label launcher-title" }, Vd = /* @__PURE__ */ de({
  __name: "FavoriteSites",
  setup(e) {
    const t = z(() => import("./BookmarkBoard-D5ABFsCj.js")), o = z(() => import("./LauncherBookGuideDialog-dpnF4MRe.js")), i = N("sites"), r = N(!1), a = N(!1);
    function h() {
      a.value = !0;
    }
    function f() {
      a.value = !1;
    }
    function u() {
      Se(), y = !1, ge = !1;
    }
    Ge(() => {
      Te.setExternalDragHandler(w), Te.setExternalDropHandler(_), window.addEventListener("blur", u), window.addEventListener("pagehide", u), document.addEventListener("visibilitychange", u);
      const m = window;
      re.hasBili && typeof m.ensureLauncherMediaCards == "function" && m.ensureLauncherMediaCards();
    });
    const x = N(!1), k = N(""), T = N(null), g = N(null), p = N(null), c = N(null);
    let y = !1, $ = 0, b = 0, L = 0, A = "", ee = 0, ne = "", E = 0;
    function w(m) {
      if (i.value !== "sites") return;
      if (!m || qe.isOpen) {
        c.value && (c.value = null), ne = "";
        return;
      }
      const C = document.elementsFromPoint(m.clientX, m.clientY);
      if (!C.some(
        (Be) => Be.classList.contains("launcher-site-items") || !!Be.closest?.(".launcher-site-items")
      )) {
        c.value && (c.value = null), ne = "";
        return;
      }
      const I = C.find((Be) => Be.classList.contains("launcher-link") && Be.getAttribute("data-launcher-id") !== String(m.link.id) || Be.classList.contains("launcher-folder"));
      if (!I) return;
      const J = I.classList.contains("launcher-link"), he = J ? I.getAttribute("data-launcher-id") : null, Ee = J ? null : I.getAttribute("data-launcher-folder"), te = J ? `link-${he}` : `folder-${Ee}`, se = I.getBoundingClientRect(), je = se.left + se.width / 2, cn = se.top + se.height / 2, lo = Math.hypot(m.clientX - je, m.clientY - cn), Nt = Date.now();
      if (lo > Math.max(se.width, se.height) * 0.55 || te === ne && Nt - E < 180) return;
      const Ft = ln.value.filter(
        (Be) => Be.type !== "link" || String(Be.link.id) !== String(m.link.id)
      ), rt = [...c.value || Ft], ht = rt.findIndex(
        (Be) => Be.type === "link" && String(Be.link.id) === String(m.link.id)
      ), mt = rt.findIndex((Be) => Be.key === te);
      if (mt < 0) return;
      const Qe = {
        key: `link-${m.link.id}`,
        type: "link",
        link: m.link
      };
      ht >= 0 ? ht !== mt && (rt.splice(ht, 1), rt.splice(mt, 0, Qe), c.value = rt, ne = te, E = Nt) : (rt.splice(mt, 0, Qe), c.value = rt, ne = te, E = Nt);
    }
    async function _(m) {
      if (i.value !== "sites" || qe.isOpen) return !1;
      if (c.value) {
        const C = c.value.map((S) => ({
          type: S.type,
          id: S.type === "link" ? String(S.link.id) : void 0,
          groupName: S.type === "folder" ? S.folder.groupName : void 0
        }));
        return await oe.moveLinkTo(String(m.id), re.activePage, "常用网站"), await oe.reorderPageItems(re.activePage, C), c.value = null, ne = "", !0;
      }
      return !1;
    }
    const D = ke({
      visible: !1,
      x: 0,
      y: 0,
      type: "link",
      link: null,
      folder: null,
      offsetX: 34,
      offsetY: 38
    });
    let Y = null, W = 0, H = 0, P = null, K = null, ge = !1;
    function B(m, C) {
      if (C.button !== 0) return;
      Y = C.pointerId, W = C.clientX, H = C.clientY, b = C.clientX, L = C.clientY, P = String(m.id), K = null, ge = !1;
      const S = C.currentTarget.getBoundingClientRect();
      D.offsetX = C.clientX - S.left, D.offsetY = C.clientY - S.top, D.type = "link", D.link = m, D.folder = null, window.addEventListener("pointermove", Oe, { passive: !1 }), window.addEventListener("pointerup", $e), window.addEventListener("pointercancel", $e);
    }
    function O(m, C, S) {
      if (S.button !== 0 || S.target.closest(".launcher-folder-del-btn")) return;
      Y = S.pointerId, W = S.clientX, H = S.clientY, b = S.clientX, L = S.clientY, P = null, K = m, ge = !1;
      const I = S.currentTarget.getBoundingClientRect();
      D.offsetX = S.clientX - I.left, D.offsetY = S.clientY - I.top, D.type = "folder", D.folder = {
        groupName: m,
        size: He(m),
        links: C?.links || []
      }, D.link = null, window.addEventListener("pointermove", Oe, { passive: !1 }), window.addEventListener("pointerup", $e), window.addEventListener("pointercancel", $e);
    }
    let R = 0, me = null;
    function We() {
      cancelAnimationFrame(R), R = 0, me = null;
    }
    function Oe(m) {
      m.pointerId === Y && (ge && m.cancelable && m.preventDefault(), me = m, !R && (R = requestAnimationFrame(() => {
        R = 0;
        const C = me;
        me = null, C && _e(C);
      })));
    }
    function _e(m) {
      if (m.pointerId !== Y || !P && !K) return;
      const C = Math.hypot(m.clientX - W, m.clientY - H);
      if (!ge && C > ld && (ge = !0, y = !0, P ? g.value = P : K && (p.value = K)), !ge) return;
      (D.link || D.folder) && (D.visible = !0, D.x = m.clientX - D.offsetX, D.y = m.clientY - D.offsetY);
      const S = document.elementsFromPoint(m.clientX, m.clientY);
      if (Qn()) {
        const te = S.some(
          (je) => je.id === "launcher-folder-dialog" || !!je.closest?.("#launcher-folder-dialog")
        ), se = document.querySelector("#launcher-folder-dialog");
        if (te && se) {
          se.classList.add("drop-hover-valid"), qe.dropHoverValid = !0;
          return;
        } else
          se?.classList.remove("drop-hover-valid"), qe.dropHoverValid = !1;
        c.value = null;
        return;
      }
      const J = c.value || ln.value, he = P ? `link-${P}` : `folder-${K}`;
      if (J.length) {
        const te = S.find((se) => {
          if (se.classList.contains("launcher-link")) {
            const je = se.getAttribute("data-launcher-id");
            return je && `link-${je}` !== he;
          }
          if (se.classList.contains("launcher-folder")) {
            const je = se.getAttribute("data-launcher-folder");
            return je && `folder-${je}` !== he;
          }
          return !1;
        });
        if (te) {
          const se = te.classList.contains("launcher-link"), je = se ? te.getAttribute("data-launcher-id") : null, cn = se ? null : te.getAttribute("data-launcher-folder"), lo = se ? `link-${je}` : `folder-${cn}`, Nt = te.getBoundingClientRect();
          let Ft = !0;
          P && !se && (dd(Nt, m.clientX, m.clientY) ? (Ft = !1, te.classList.add("drop-target")) : te.classList.remove("drop-target"));
          const rt = Date.now();
          if (ud(Nt, m.clientX, m.clientY) || (Ft = !1), lo === A && rt - ee < cd && (Ft = !1), Ft) {
            document.querySelectorAll(".launcher-folder.drop-target").forEach((Qe) => Qe.classList.remove("drop-target"));
            const ht = J.findIndex((Qe) => Qe.key === he), mt = J.findIndex((Qe) => Qe.key === lo);
            if (ht >= 0 && mt >= 0 && ht !== mt) {
              const Qe = J.slice(), Be = Qe.splice(ht, 1)[0];
              Qe.splice(mt, 0, Be), c.value = Qe, A = lo, ee = rt;
            }
          }
        }
      }
      const Ee = S.find((te) => te.classList.contains("launcher-page-tab"));
      if (Ee) {
        const te = Ee.getAttribute("data-page");
        te && te !== re.activePage && Ee.classList.add("drop-target");
      } else
        document.querySelectorAll(".launcher-page-tab.drop-target").forEach((te) => te.classList.remove("drop-target"));
    }
    async function $e(m) {
      if (m.pointerId === Y) {
        We(), m.type === "pointercancel" ? Se() : _e(m), window.removeEventListener("pointermove", Oe), window.removeEventListener("pointerup", $e), window.removeEventListener("pointercancel", $e);
        try {
          if (ge) {
            $ = Date.now(), y = !1;
            const C = document.elementsFromPoint(m.clientX, m.clientY);
            if (document.querySelectorAll(".launcher-page-tab.drop-target").forEach((I) => I.classList.remove("drop-target")), document.querySelectorAll(".launcher-folder.drop-target").forEach((I) => I.classList.remove("drop-target")), Qn() && qe.activeFolder) {
              if (C.some(
                (J) => J.id === "launcher-folder-dialog" || !!J.closest?.("#launcher-folder-dialog")
              )) {
                const he = C.find((Ee) => Ee.hasAttribute("data-child-folder"))?.getAttribute("data-child-folder") || qe.activeFolder;
                P ? await oe.moveLinkTo(P, void 0, he) : K && await oe.moveFolderInto(K, he);
              }
              return;
            }
            const S = C.find((I) => I.classList.contains("launcher-page-tab"));
            if (S) {
              const I = S.getAttribute("data-page");
              if (I) {
                P ? (await oe.moveLinkTo(P, I, "常用网站"), await oe.setPage(I)) : K && await oe.moveFolderToPage(K, I), Se();
                return;
              }
            }
            if (P) {
              const I = C.find((J) => J.classList.contains("launcher-folder"));
              if (I) {
                const J = I.getAttribute("data-launcher-folder");
                if (J) {
                  await oe.moveLinkTo(P, re.activePage, J), Se();
                  return;
                }
              }
            }
            if (c.value) {
              const I = c.value.map((J) => ({
                type: J.type,
                id: J.type === "link" ? String(J.link.id) : void 0,
                groupName: J.type === "folder" ? J.folder.groupName : void 0
              }));
              await oe.reorderPageItems(re.activePage, I);
            }
          }
        } catch (C) {
          be.show({ appName: "常用网站", title: "移动未完成", message: C instanceof Error ? C.message : "请刷新核对，未自动重试。" });
        } finally {
          Se();
        }
      }
    }
    function Se() {
      We(), Y = null, P = null, K = null, ge = !1, y = !1, g.value = null, p.value = null, c.value = null, D.visible = !1, D.link = null, D.folder = null, A = "", document.querySelector("#launcher-folder-dialog")?.classList.remove("drop-hover-valid"), qe.dropHoverValid = !1, window.removeEventListener("pointermove", Oe), window.removeEventListener("pointerup", $e), window.removeEventListener("pointercancel", $e);
    }
    $t(() => {
      Te.setExternalDragHandler(null), Te.setExternalDropHandler(null), Se(), window.removeEventListener("blur", u), window.removeEventListener("pagehide", u), document.removeEventListener("visibilitychange", u), window.removeEventListener("pointermove", Oe), window.removeEventListener("pointerup", $e), window.removeEventListener("pointercancel", $e);
    });
    function Ke(m) {
      const C = re.pageLabels;
      return C && C[m] ? C[m] : m || "常用网站";
    }
    function Ze(m, C) {
      const S = String(m.page || "").trim(), I = String(C).trim(), J = re.pageLabels || {}, he = !S || S === "常用网站" || S === "默认";
      if (!I || I === "常用网站" || I === "默认") return he;
      if (he) return !1;
      if (S === I) return !0;
      const te = J[S] || S, se = J[I] || I;
      return te === se || S === se || te === I;
    }
    function He(m) {
      const C = re.groupSizes;
      return C && C[m] === "large" ? "large" : "small";
    }
    function ls(m) {
      return m === "large" ? 9 : 4;
    }
    function cs(m, C) {
      const S = ls(C), I = m.length > S ? S - 1 : S;
      return m.slice(0, I);
    }
    const ln = ae(() => {
      const m = re.activePage || "常用网站", S = re.links.filter(
        (te) => Ze(te, m)
      ), I = /* @__PURE__ */ new Map();
      S.forEach((te) => {
        const se = te.group || "常用网站";
        se !== "常用网站" && (I.has(se) || I.set(se, []), I.get(se).push(te));
      });
      const J = /* @__PURE__ */ new Set(), he = [];
      S.forEach((te) => {
        const se = te.group || "常用网站";
        Xo(re.folders, se) || (se === "常用网站" ? he.push({ key: `link-${te.id}`, type: "link", link: te }) : J.has(se) || (J.add(se), he.push({
          key: `folder-${se}`,
          type: "folder",
          folder: {
            groupName: se,
            pageName: m,
            links: I.get(se) || []
          }
        })));
      });
      const Ee = re.folders;
      return Ee && Object.entries(Ee).forEach(([te, se]) => {
        if (Xo(re.folders, te)) return;
        const je = se?.page || "常用网站";
        (je === m || m === "常用网站" && je === "默认") && !J.has(te) && (J.add(te), he.push({
          key: `folder-${te}`,
          type: "folder",
          folder: {
            groupName: te,
            pageName: m,
            links: I.get(te) || []
          }
        }));
      }), he;
    }), Xn = ae(() => c.value && c.value.length ? c.value : ln.value), ds = ae(() => {
      const m = re.activePage || "常用网站", C = Ke(m);
      return C === "默认" || m === "常用网站" ? "还没有快捷入口，点击“编辑入口”后添加。" : `“${C}”还是空的，把网站拖到这里。`;
    });
    function Jn(m) {
      c.value = null, g.value = null, p.value = null, Te.switchPage(m);
    }
    function us() {
      x.value = !0, k.value = "", ft(() => {
        T.value?.focus();
      });
    }
    function Zn() {
      if (!x.value) return;
      const m = k.value.trim();
      x.value = !1, m && Te.addPage(m);
    }
    function ps(m) {
      m.key === "Enter" ? (m.preventDefault(), Zn()) : m.key === "Escape" && (x.value = !1);
    }
    function fs(m, C) {
      Te.openPageMenu(m, C);
    }
    function gs(m) {
      const C = m.target;
      if (!C || C.closest(".launcher-link") || C.closest(".launcher-folder") || C.closest(".launcher-page-tab") || C.closest("button") || C.closest("input"))
        return;
      m.preventDefault();
      const S = re.activePage || "常用网站";
      eo.openBlankMenu(S, m.clientX, m.clientY);
    }
    function hs(m) {
      i.value === "sites" && (!m.shiftKey || re.pages.length < 2 || (m.preventDefault(), m.deltaY > 0 || m.deltaX > 0 ? Te.nextPage() : Te.prevPage()));
    }
    function ms(m) {
      m.target.closest(".launcher-page-tab") || m.stopPropagation();
    }
    function vs(m) {
      m.button === 0 && (b = m.clientX, L = m.clientY);
    }
    function ys(m, C) {
      if (C.preventDefault(), C.stopPropagation(), Je.isPickingShortcut) {
        Je.handlePickedLink(m);
        return;
      }
      Y || (y = !1), !(Math.hypot(C.clientX - b, C.clientY - L) >= 6 || y || Date.now() - $ < 600) && Te.openLink(m, C);
    }
    function ws(m, C) {
      Te.openLinkMenu(m, C);
    }
    function bs(m, C) {
      if (Y || (y = !1), y || Date.now() - $ < 450) {
        C.preventDefault(), C.stopPropagation();
        return;
      }
      Te.openFolder(m, C);
    }
    function ks(m, C, S) {
      Te.openFolderMenu(m, C, S);
    }
    function _s(m) {
      Te.deleteFolder(m);
    }
    function Cs(m, C) {
      const S = Array.from(C.dataTransfer?.types || []);
      if (!S.includes("application/x-newtab-launcher") && !S.includes("application/x-newtab-bookmark") && !S.includes("text/uri-list") && !S.includes("text/plain")) return;
      C.preventDefault(), C.dataTransfer && (C.dataTransfer.dropEffect = "move"), re.activePage !== m && Jn(m), C.currentTarget?.classList.add("drop-target");
    }
    function xs(m) {
      m.currentTarget?.classList.remove("drop-target");
    }
    async function Ls(m, C) {
      C.currentTarget?.classList.remove("drop-target");
      let I = "";
      const J = C.dataTransfer?.getData("application/x-newtab-launcher");
      if (J)
        try {
          I = String(JSON.parse(J)?.id || "");
        } catch {
        }
      if (!I && (g.value || window.__activeLauncherLink) && (I = String(window.__activeLauncherLink?.id || g.value || "")), I) {
        C.preventDefault(), C.stopPropagation(), await oe.moveLinkTo(I, m, "常用网站"), await oe.setPage(m);
        return;
      }
      const he = window;
      typeof he.importDroppedLauncherItem == "function" && (C.preventDefault(), C.stopPropagation(), await he.importDroppedLauncherItem(C, "常用网站", m));
    }
    function $s(m) {
      const C = Array.from(m.dataTransfer?.types || []);
      if (!C.includes("application/x-newtab-launcher") && !C.includes("application/x-newtab-bookmark") && !C.includes("text/uri-list") && !C.includes("text/plain")) return;
      m.preventDefault(), m.dataTransfer && (m.dataTransfer.dropEffect = C.includes("application/x-newtab-launcher") ? "move" : "copy"), m.currentTarget?.classList.add("drop-target");
    }
    function Ss(m) {
      const C = m.currentTarget;
      C?.contains(m.relatedTarget) || C?.classList.remove("drop-target");
    }
    async function Ts(m) {
      m.currentTarget?.classList.remove("drop-target");
      let S = "";
      const I = m.dataTransfer?.getData("application/x-newtab-launcher");
      if (I)
        try {
          S = String(JSON.parse(I)?.id || "");
        } catch {
        }
      if (!S && (g.value || window.__activeLauncherLink) && (S = String(window.__activeLauncherLink?.id || g.value || "")), S) {
        m.preventDefault(), m.stopPropagation(), await oe.moveLinkTo(S, re.activePage, "常用网站");
        return;
      }
      const J = window;
      if (typeof J.importDroppedLauncherItem == "function") {
        m.preventDefault(), m.stopPropagation(), await J.importDroppedLauncherItem(m, "常用网站", re.activePage);
        return;
      }
      const he = m.dataTransfer?.getData("text/plain");
      he && /^https?:\/\//i.test(he.trim()) && (m.preventDefault(), m.stopPropagation(), await oe.addLink({
        title: "",
        url: he.trim(),
        page: re.activePage
      }));
    }
    function Qn() {
      if (!qe.isOpen) return !1;
      if (typeof document < "u") {
        const m = document.querySelector("#launcher-folder-dialog");
        return !!(m && m.open);
      }
      return !1;
    }
    function Is(m, C) {
      C.preventDefault();
    }
    function Ms(m) {
      m.preventDefault(), m.dataTransfer && (m.dataTransfer.dropEffect = "move"), m.currentTarget?.classList.add("drop-target");
    }
    function Ds(m) {
      m.currentTarget?.classList.remove("drop-target");
    }
    async function As(m, C) {
      C.currentTarget?.classList.remove("drop-target"), C.preventDefault(), C.stopPropagation();
      const I = C.dataTransfer?.getData("application/x-newtab-launcher-folder");
      if (I && I !== m) {
        try {
          await oe.moveFolderInto(I, m);
        } catch (Ee) {
          be.show({ appName: "常用网站", title: "移动未完成", message: Ee instanceof Error ? Ee.message : "请刷新后核对。" });
        }
        return;
      }
      let J = "";
      const he = C.dataTransfer?.getData("application/x-newtab-launcher");
      if (he)
        try {
          J = String(JSON.parse(he)?.id || "");
        } catch {
        }
      !J && (g.value || window.__activeLauncherLink) && (J = String(window.__activeLauncherLink?.id || g.value || "")), J && await oe.moveLinkTo(J, re.activePage, m);
    }
    return (m, C) => (l(), d(G, null, [
      s(re).showSites ? (l(), d("section", {
        key: 0,
        class: "launcher-group launcher-sites size-large",
        onWheel: hs
      }, [
        n("header", {
          class: "launcher-group-head launcher-sites-head",
          onPointerdown: C[5] || (C[5] = F(() => {
          }, ["stop"])),
          onContextmenu: ms
        }, [
          n("div", Id, [
            n("button", {
              type: "button",
              disabled: r.value,
              "aria-pressed": i.value === "sites",
              onClick: C[0] || (C[0] = (S) => i.value = "sites")
            }, "常用网站", 8, Md),
            n("button", {
              type: "button",
              disabled: r.value,
              "aria-pressed": i.value === "bookmarks",
              onClick: C[1] || (C[1] = (S) => i.value = "bookmarks")
            }, "书签", 8, Dd)
          ]),
          Ne(n("div", Ad, [
            (l(!0), d(G, null, fe(s(re).pages, (S) => (l(), d("button", {
              key: S,
              type: "button",
              class: le(["launcher-page-tab", { active: S === s(re).activePage }]),
              "data-page": S,
              role: "tab",
              title: `切换到${Ke(S)}；拖动网站到这里可移动分区；右键管理分区`,
              onPointerdown: C[2] || (C[2] = F(() => {
              }, ["stop"])),
              onClick: F((I) => Jn(S), ["prevent", "stop"]),
              onContextmenu: F((I) => fs(S, I), ["prevent", "stop"]),
              onDragover: (I) => Cs(S, I),
              onDragleave: C[3] || (C[3] = (I) => xs(I)),
              onDrop: (I) => Ls(S, I)
            }, v(Ke(S)), 43, Ed))), 128)),
            x.value ? Ne((l(), d("input", {
              key: 1,
              ref_key: "pageInputRef",
              ref: T,
              class: "launcher-page-input",
              maxlength: "12",
              placeholder: "例如：游戏区",
              "onUpdate:modelValue": C[4] || (C[4] = (S) => k.value = S),
              onKeydown: ps,
              onBlur: Zn
            }, null, 544)), [
              [oo, k.value]
            ]) : (l(), d("button", {
              key: 0,
              class: "launcher-page-add",
              type: "button",
              title: "添加网站分区，例如游戏区",
              "aria-label": "添加网站分区",
              onClick: us
            }, " + "))
          ], 512), [
            [no, i.value === "sites"]
          ]),
          i.value === "bookmarks" ? (l(), d("div", Pd)) : M("", !0),
          n("button", {
            class: "launcher-page-help",
            type: "button",
            title: "使用指南：如何创建文件夹与整理网站",
            "aria-label": "使用指南与技巧",
            onClick: h
          }, " ? ")
        ], 32),
        i.value === "bookmarks" ? (l(), ce(s(t), {
          key: 0,
          "header-target": "#bookmark-board-header",
          onBusy: C[6] || (C[6] = (S) => r.value = S)
        })) : M("", !0),
        Ne(n("div", {
          class: "launcher-page-panel",
          "data-page": s(re).activePage,
          hidden: !1,
          role: "tabpanel",
          onContextmenu: gs,
          onDragover: C[12] || (C[12] = (S) => $s(S)),
          onDragleave: C[13] || (C[13] = (S) => Ss(S)),
          onDrop: C[14] || (C[14] = (S) => Ts(S))
        }, [
          (l(), ce(Yo, {
            tag: "div",
            class: "launcher-items launcher-site-items",
            key: s(re).activePage,
            name: g.value || p.value ? "launcher-grid" : ""
          }, {
            default: to(() => [
              (l(!0), d(G, null, fe(Xn.value, (S) => (l(), d(G, {
                key: S.key
              }, [
                S.type === "link" ? (l(), d("a", {
                  key: S.key,
                  class: le(["launcher-link", {
                    "is-dragging": g.value === String(S.link.id)
                  }]),
                  href: S.link.url,
                  title: S.link.title + (S.link.note ? `
📝 ` + S.link.note : "") + `
🔗 ` + S.link.url,
                  "data-launcher-id": String(S.link.id),
                  target: "_blank",
                  rel: "noreferrer",
                  draggable: "false",
                  onDragstart: C[7] || (C[7] = F(() => {
                  }, ["prevent"])),
                  onPointerdown: (I) => B(S.link, I),
                  onMousedown: C[8] || (C[8] = (I) => vs(I)),
                  onClick: F((I) => ys(S.link, I), ["prevent"]),
                  onContextmenu: F((I) => ws(S.link, I), ["prevent"])
                }, [
                  q(ki, {
                    link: S.link
                  }, null, 8, ["link"])
                ], 42, Od)) : S.type === "folder" ? (l(), d("div", {
                  key: S.key,
                  class: le(["launcher-folder", [
                    `size-${He(S.folder.groupName)}`,
                    { "is-dragging": p.value === S.folder.groupName }
                  ]]),
                  title: `${S.folder.groupName}
可拖动调整位置；右键调整收藏夹大小`,
                  role: "button",
                  tabindex: "0",
                  "data-launcher-folder": String(S.folder.groupName),
                  draggable: "true",
                  onPointerdown: (I) => O(S.folder.groupName, S.folder, I),
                  onDragstart: (I) => Is(S.folder.groupName, I),
                  onDragover: C[10] || (C[10] = (I) => Ms(I)),
                  onDragleave: C[11] || (C[11] = (I) => Ds(I)),
                  onDrop: (I) => As(S.folder.groupName, I),
                  onClick: (I) => bs(S.folder.groupName, I),
                  onContextmenu: F((I) => ks(S.folder.groupName, S.folder.pageName, I), ["prevent"])
                }, [
                  q(ki, {
                    folder: { title: S.folder.groupName, preview: S.folder.links, count: S.folder.links.length },
                    size: He(S.folder.groupName)
                  }, {
                    default: to(() => [
                      n("button", {
                        class: "launcher-folder-del-btn",
                        type: "button",
                        title: `删除文件夹「${S.folder.groupName}」`,
                        "aria-label": "删除文件夹",
                        onPointerdown: C[9] || (C[9] = F(() => {
                        }, ["stop"])),
                        onClick: F((I) => _s(S.folder.groupName), ["stop", "prevent"])
                      }, " ✕ ", 40, Rd)
                    ]),
                    _: 2
                  }, 1032, ["folder", "size"]),
                  n("span", Nd, v(S.folder.links.length), 1)
                ], 42, Bd)) : M("", !0)
              ], 64))), 128)),
              Xn.value.length ? M("", !0) : (l(), d("p", Fd, v(ds.value), 1))
            ]),
            _: 1
          }, 8, ["name"]))
        ], 40, Wd), [
          [no, i.value === "sites"]
        ])
      ], 32)) : M("", !0),
      s(re).hasTodo || s(re).hasBili ? (l(), d("div", Hd, [
        s(re).hasTodo ? (l(), ce(Td, { key: 0 })) : s(re).hasBili ? (l(), d("div", jd)) : M("", !0)
      ])) : M("", !0),
      (l(), ce(gt, { to: "body" }, [
        D.visible ? (l(), d("div", {
          key: 0,
          class: le(["launcher-drag-ghost", [
            D.type === "folder" ? `folder-ghost size-${D.folder?.size}` : "link-ghost"
          ]]),
          style: ye({
            left: `${D.x}px`,
            top: `${D.y}px`
          })
        }, [
          D.type === "folder" && D.folder ? (l(), d(G, { key: 0 }, [
            n("div", zd, [
              (l(!0), d(G, null, fe(cs(D.folder.links, D.folder.size), (S, I) => (l(), ce(tn, {
                key: S.id || I,
                link: S,
                mini: !0
              }, null, 8, ["link"]))), 128))
            ]),
            n("span", Gd, v(D.folder.groupName), 1)
          ], 64)) : D.link ? (l(), d(G, { key: 1 }, [
            q(tn, {
              link: D.link
            }, null, 8, ["link"]),
            n("span", Kd, v(D.link.title), 1)
          ], 64)) : M("", !0)
        ], 6)) : M("", !0)
      ])),
      q(s(o), {
        open: a.value,
        onClose: f
      }, null, 8, ["open"])
    ], 64));
  }
}), ss = /* @__PURE__ */ Ie(Vd, [["__scopeId", "data-v-f114c6a1"]]), Uo = Object.keys(ao);
let Fo = !1, Sn = 0, yo, Tn;
function Ci(e) {
  for (const t of Uo)
    Object.prototype.hasOwnProperty.call(e, t) && (ao[t] = e[t] !== !1);
}
function Ud() {
  const e = ao;
  Te.setPrefs(e.showSites, e.showTodo, !e.showTodo && e.showBili), document.body.classList.toggle("hide-weather", !e.showWeather), document.body.classList.toggle("hide-sites", !e.showSites), document.body.classList.toggle("hide-bili", !e.showBili), document.body.classList.toggle("hide-youtube", !e.showYouTube), document.body.classList.toggle("hide-todo", !e.showTodo), document.body.classList.toggle("hide-bookmarks", !e.showBookmarkPanel), e.showBookmarkPanel || on.close();
}
const xi = {
  start() {
    if (Fo) return;
    Fo = !0;
    const e = ++Sn;
    Tn = Ue(() => Uo.map((o) => ao[o]), Ud, { immediate: !0, flush: "sync" });
    const t = globalThis.chrome;
    yo = (o, i) => {
      if (i !== "local") return;
      const r = {};
      for (const a of Uo) o[a] && (r[a] = o[a].newValue);
      Ci(r);
    }, t?.storage?.onChanged?.addListener(yo), t?.storage?.local && t.storage.local.get(Uo).then((o) => {
      Fo && Sn === e && Ci(o || {});
    }).catch((o) => console.warn("[HomePrefs] 读取首页设置失败", o));
  },
  stop() {
    Fo = !1, Sn++, Tn?.(), Tn = void 0, yo && globalThis.chrome?.storage?.onChanged?.removeListener(yo), yo = void 0;
  }
}, Yd = {
  id: "launcher",
  class: "launcher",
  "aria-label": "快捷入口"
}, qd = { class: "launcher-inner" }, Xd = { class: "launcher-overview" }, Jd = {
  class: "launcher-widget launcher-weather",
  "data-home-module": "weather",
  title: "右键此处可快速切换天气地点"
}, Zd = { id: "weather-body" }, Qd = { class: "launcher-center" }, eu = {
  class: "hero-clock",
  id: "hero-clock"
}, tu = {
  class: "launcher-widget launcher-task-threads launcher-music-card",
  "data-home-module": "taskThreads"
}, ou = {
  id: "task-thread-home",
  class: "task-thread-home home-music-body"
}, nu = /* @__PURE__ */ de({
  __name: "AppLauncher",
  setup(e) {
    Ge(() => {
      qo.initWallpaper();
    });
    function t() {
      Me.handleToolClick("music");
    }
    return (o, i) => (l(), d("section", Yd, [
      i[5] || (i[5] = n("div", {
        id: "hero-background-media",
        class: "hero-background-media",
        "aria-hidden": "true"
      }, null, -1)),
      n("div", qd, [
        n("div", Xd, [
          Ne(n("section", Jd, [
            i[1] || (i[1] = n("header", { class: "card-head" }, [
              n("span", {
                class: "bar",
                style: { background: "linear-gradient(180deg,#38bdf8,#818cf8)" }
              }),
              n("h2", { id: "wx-title" }, "天气")
            ], -1)),
            n("div", Zd, [
              q(os)
            ])
          ], 512), [
            [no, s(ao).showWeather]
          ]),
          n("div", Qd, [
            n("div", eu, [
              q(Tc),
              q(ns)
            ]),
            n("form", {
              id: "search",
              class: "search",
              onSubmit: i[0] || (i[0] = F(() => {
              }, ["prevent"]))
            }, [
              q(Ti)
            ], 32)
          ]),
          n("section", tu, [
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
            n("div", ou, [
              q(is)
            ])
          ])
        ]),
        n("div", {
          id: "launcher-groups",
          class: le(["launcher-groups", { "has-sites": s(re).showSites, "has-todoist": s(re).hasTodo, "has-bili": s(re).hasBili, "has-media": s(re).hasTodo || s(re).hasBili }])
        }, [
          q(ss)
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
}), Qt = ke(/* @__PURE__ */ new Set()), Mt = ke({}), Ye = ke({});
function In(e) {
  const t = Xe(e);
  if (!t?.lifecycle.canUnmount || t.lifecycle.canUnmount()) return { ok: !0 };
  const o = t.lifecycle.unmountBlockedMessage || "模块操作尚未结束，不能退出或重载。";
  return be.show({ appName: t.title, title: "操作进行中", message: o, showActions: !1 }), { ok: !1, error: o };
}
const Ae = {
  // 检查应用是否处于运行显示状态（驱动 Dock 上的小圆点：关闭即熄灭，不保留 macOS 风格后台悬浮绿点）
  isRunning(e) {
    return this.isVisible(e);
  },
  // 检查应用当前是否在屏幕上可见（窗口是否打开）
  isVisible(e) {
    const t = Xe(e);
    return t ? t.lifecycle.isVisible() : fn(e) ? !!fr[e] : gr(e);
  },
  // 标记应用启动
  markRunning(e) {
    Qt.add(e), (e in Ye || Xe(e)) && (Ye[e] = !0);
  },
  // 获取组件当前的 render key
  getRenderKey(e) {
    return Mt[e] || 0;
  },
  // 打开 / 显示应用窗口
  openApp(e) {
    const t = Xe(e);
    if (t) {
      Me.open(e), t.lifecycle.isVisible() && this.markRunning(e);
      return;
    }
    if (this.markRunning(e), fn(e)) {
      ni.open(e);
      return;
    }
    Me.open(e);
  },
  // 隐藏/关闭窗口：立即退出可见运行态并熄灭 Dock 指示绿点
  hideApp(e) {
    if (Qt.delete(e), Xe(e)) {
      Me.close(e);
      return;
    }
    if (fn(e)) {
      ni.close(e);
      return;
    }
    Me.close(e);
  },
  // 真正的关闭（Quit / 彻底从内存与 DOM 中卸载销毁，熄灭小圆点）
  async quitApp(e) {
    if (Xe(e)) {
      const r = In(e);
      if (!r.ok) return r;
      const a = Xe(e)?.lifecycle.beforeQuit;
      if (a) {
        const u = Tt(e);
        try {
          await a();
        } catch {
          const k = "后台停止未确认，窗口保留；未自动重试，请检查后台状态。";
          return be.show({ appName: Xe(e).title, title: "未退出", message: k, showActions: !1 }), { ok: !1, error: k };
        }
        if (Tt(e) !== u) return { ok: !1, error: "窗口已有后续操作，未卸载。" };
        const x = In(e);
        if (!x.ok) return x;
      }
      const h = Me.close(e), f = Tt(e);
      return Qt.delete(e), Ye[e] = !1, dt.removeActiveTool(e), await h, await ft(), Tt(e) === f ? { ok: !0 } : { ok: !1, error: "模块已有后续操作，退出状态已变化。" };
    }
    this.hideApp(e), Qt.delete(e), dt.removeActiveTool(e), e in Ye && (Ye[e] = !1);
    const t = pr;
    t.activeId === e && (t.activeId = "");
    const o = t.openOrder.indexOf(e);
    o >= 0 && t.openOrder.splice(o, 1);
    const i = t.activeTools.indexOf(e);
    i >= 0 && t.activeTools.splice(i, 1), Me.render();
  },
  // 重新加载（Reload / 单应用热重启，重新初始化组件）
  async reloadApp(e) {
    const t = Xe(e);
    if (t) {
      if (t.lifecycle.canOpen && !t.lifecycle.canOpen()) return { ok: !1, error: "模块当前不能打开，未重载窗口。" };
      const o = In(e);
      if (!o.ok) return o;
      const i = Me.close(e), r = Tt(e);
      return await i, Tt(e) !== r ? { ok: !1, error: "模块已有后续操作，重载已取消。" } : (Ye[e] = !1, await ft(), Tt(e) !== r ? { ok: !1, error: "模块已有后续操作，未重新打开。" } : (Mt[e] = (Mt[e] || 0) + 1, Me.open(e), t.lifecycle.isVisible() ? (this.markRunning(e), { ok: !0 }) : { ok: !1, error: "模块当前不能打开，未重新显示窗口。" }));
    }
    this.hideApp(e), e in Ye ? (Ye[e] = !1, await ft(), Mt[e] = (Mt[e] || 0) + 1, Ye[e] = !0) : Mt[e] = (Mt[e] || 0) + 1, await ft(), this.openApp(e);
  }
}, Gt = /* @__PURE__ */ de({
  __name: "DockCardModuleHost",
  props: {
    id: {}
  },
  setup(e) {
    const o = Xe(e.id);
    if (!o || o.presentation !== "card") throw new Error("Unknown registered workspace card");
    const i = o;
    i.mountPolicy === "workspace-ready" && Ae.markRunning(i.id), Ue(i.lifecycle.isVisible, (x) => {
      x && Ae.markRunning(i.id);
    }, { immediate: !0, flush: "sync" });
    const r = ae(() => !!Ye[i.id]);
    function a() {
      try {
        i.lifecycle.hide();
      } catch {
      }
      (Ct.activeId === i.id || Ct.activeId === i.rootId) && (Ct.activeId = null), Ae.hideApp(i.id), typeof document < "u" && document.body.classList.remove("has-card-fullscreen");
    }
    function h() {
      Ae.reloadApp(i.id);
    }
    function f() {
      typeof window < "u" && window.location.reload();
    }
    const u = z({
      loader: i.loadView,
      onError(x, k, T, g) {
        g <= 2 ? k() : T();
      },
      errorComponent: de({
        setup: () => () => i.lifecycle.isVisible() ? Re("section", { class: "card wide card-fullscreen", role: "alert" }, [
          Re("h2", i.title),
          Re("p", "工作区切片加载受阻（可能因插件重载或切片更新）。可点击「重新加载模块」，或返回首页。"),
          Re("div", { style: "display: flex; gap: 10px; margin-top: 14px;" }, [
            Re("button", {
              type: "button",
              style: "padding: 6px 14px; border-radius: 999px; border: 1px solid var(--border); background: var(--primary, #3b82f6); color: #fff; cursor: pointer; font-size: 12px; font-weight: 500;",
              onClick: f
            }, "⟳ 刷新标签页 (加载最新版)"),
            Re("button", {
              type: "button",
              style: "padding: 6px 14px; border-radius: 999px; border: 1px solid var(--border); background: var(--surface); color: var(--text); cursor: pointer; font-size: 12px;",
              onClick: h
            }, "↻ 重新加载模块"),
            Re("button", {
              type: "button",
              style: "padding: 6px 14px; border-radius: 999px; border: 1px solid var(--border); background: var(--surface); color: var(--text); cursor: pointer; font-size: 12px;",
              onClick: a
            }, "返回首页")
          ])
        ]) : null
      })
    });
    return ro(() => {
      a(), Qt.delete(i.id), delete Ye[i.id];
    }), (x, k) => r.value ? (l(), ce(Di(s(u)), {
      key: s(Ae).getRenderKey(s(i).id)
    })) : M("", !0);
  }
}), iu = { class: "logicweaver-workspaces-layer" }, su = {
  key: 0,
  id: "daily-section",
  class: "wrap"
}, ru = { id: "vue-todoist-root" }, au = { id: "vue-bili-favorites-root" }, lu = { id: "vue-youtube-root" }, cu = { id: "vue-pricing-root" }, du = { id: "vue-aihot-root" }, uu = /* @__PURE__ */ de({
  __name: "AppWorkspaces",
  setup(e) {
    const t = N(!!Ct.activeId);
    return Ge(() => {
      t.value || (typeof window < "u" && "requestIdleCallback" in window ? window.requestIdleCallback(() => {
        t.value = !0;
      }, { timeout: 80 }) : setTimeout(() => {
        t.value = !0;
      }, 40));
    }), (o, i) => (l(), d("div", iu, [
      t.value ? (l(), d("main", su, [
        n("div", ru, [
          q(Gt, { id: "todoist" })
        ]),
        n("div", au, [
          q(Gt, { id: "daily-bilibili" })
        ]),
        Ne(n("div", lu, [
          q(Gt, { id: "daily-youtube" })
        ], 512), [
          [no, s(ao).showYouTube]
        ]),
        n("div", cu, [
          q(Gt, { id: "daily-pricing" })
        ]),
        n("div", du, [
          q(Gt, { id: "daily-aihot" })
        ]),
        q(Gt, { id: "card-github" })
      ])) : M("", !0)
    ]));
  }
}), pu = ["aria-label"], fu = { class: "dock-menu-head" }, gu = { class: "dock-menu-title" }, hu = ["src", "alt"], mu = {
  key: 1,
  class: "dock-menu-emoji"
}, vu = /* @__PURE__ */ de({
  __name: "DockContextMenu",
  props: {
    target: {}
  },
  emits: ["close", "action"],
  setup(e, { emit: t }) {
    const o = e, i = t, r = ae(() => !o.target || o.target.type !== "tool" ? !1 : Ae.isRunning(o.target.id)), a = ae(() => !o.target || o.target.type !== "tool" ? !1 : Ae.isVisible(o.target.id)), { menuRef: h, style: f } = Oi({
      visible: () => !!o.target,
      anchor: () => o.target || { x: 0, y: 0 },
      placement: Vt.position === "top" ? "below" : "above",
      align: "center",
      gap: 12,
      dismiss: () => i("close")
    });
    function u() {
      o.target && (Ae.openApp(o.target.id), i("close"));
    }
    function x() {
      o.target && (Ae.hideApp(o.target.id), i("close"));
    }
    async function k() {
      o.target && (await Ae.reloadApp(o.target.id), i("close"));
    }
    async function T() {
      if (!o.target) return;
      const c = o.target;
      if ((await Ae.quitApp(c.id))?.ok === !1) {
        i("close");
        return;
      }
      be.show({
        appName: c.title,
        title: "已退出应用",
        subtitle: "当前页面的应用已请求退出，不代表外部进程或远端任务已停止",
        icon: c.icon || "assets/logo.png",
        duration: 2800
      }), i("close");
    }
    async function g() {
      if (!o.target) return;
      const c = o.target, y = To.uninstall(c.id);
      i("close"), await y || be.show({
        appName: c.title,
        title: "入口停用未确认",
        subtitle: To.state.errorMessage || "请打开模块管理核对当前启用状态",
        icon: c.icon || "assets/logo.png",
        duration: 4e3
      });
    }
    function p() {
      if (!o.target) return;
      const y = {
        "daily-bilibili": "https://www.bilibili.com",
        "card-github": "https://github.com",
        "daily-aihot": "https://news.ycombinator.com",
        "daily-youtube": "https://www.youtube.com",
        "daily-pricing": "https://openai.com/api/pricing"
      }[o.target.id] || "https://www.bilibili.com";
      window.open(y, "_blank"), i("close");
    }
    return (c, y) => (l(), ce(gt, { to: "body" }, [
      e.target ? (l(), d("div", {
        key: 0,
        ref_key: "menuRef",
        ref: h,
        role: "group",
        "aria-label": `${e.target.title}操作`,
        class: "dock-context-menu",
        style: ye(s(f)),
        onClick: y[1] || (y[1] = F(() => {
        }, ["stop"])),
        onContextmenu: y[2] || (y[2] = F(() => {
        }, ["prevent"]))
      }, [
        n("div", fu, [
          n("div", gu, [
            e.target.icon ? (l(), d("img", {
              key: 0,
              class: "dock-menu-icon",
              src: e.target.icon,
              alt: e.target.title
            }, null, 8, hu)) : e.target.emoji ? (l(), d("span", mu, v(e.target.emoji), 1)) : M("", !0),
            n("strong", null, v(e.target.title), 1)
          ]),
          e.target.type === "tool" ? (l(), d("span", {
            key: 0,
            class: le(["dock-status-tag", { "is-running": r.value }])
          }, [
            y[3] || (y[3] = n("span", { class: "dock-status-dot" }, null, -1)),
            Fe(" " + v(r.value ? "运行中" : "未启动"), 1)
          ], 2)) : M("", !0)
        ]),
        y[12] || (y[12] = n("div", { class: "dock-menu-divider" }, null, -1)),
        e.target.type === "tool" ? (l(), d(G, { key: 0 }, [
          a.value ? (l(), d("button", {
            key: 1,
            type: "button",
            class: "dock-menu-item",
            onClick: x
          }, [...y[5] || (y[5] = [
            n("span", { class: "dock-menu-symbol" }, "−", -1),
            n("span", null, "隐藏窗口", -1)
          ])])) : (l(), d("button", {
            key: 0,
            type: "button",
            class: "dock-menu-item",
            onClick: u
          }, [...y[4] || (y[4] = [
            n("span", { class: "dock-menu-symbol" }, "↗", -1),
            n("span", null, "打开窗口", -1)
          ])])),
          n("button", {
            type: "button",
            class: "dock-menu-item",
            onClick: k
          }, [...y[6] || (y[6] = [
            n("span", { class: "dock-menu-symbol" }, "⟲", -1),
            n("div", { class: "dock-menu-text" }, [
              n("span", null, "重新加载"),
              n("small", null, "单应用热重启")
            ], -1)
          ])]),
          y[9] || (y[9] = n("div", { class: "dock-menu-divider" }, null, -1)),
          n("button", {
            type: "button",
            class: "dock-menu-item",
            onClick: g
          }, [...y[7] || (y[7] = [
            n("span", { class: "dock-menu-symbol" }, "📌", -1),
            n("div", { class: "dock-menu-text" }, [
              n("span", null, "从 Dock 栏移出"),
              n("small", null, "可在模块管理中重新添加")
            ], -1)
          ])]),
          n("button", {
            type: "button",
            class: "dock-menu-item item-danger",
            onClick: T
          }, [...y[8] || (y[8] = [
            n("span", { class: "dock-menu-symbol" }, "✕", -1),
            n("div", { class: "dock-menu-text" }, [
              n("span", null, "真正的关闭"),
              n("small", null, "退出并释放内存")
            ], -1)
          ])])
        ], 64)) : e.target.type === "card" ? (l(), d("button", {
          key: 1,
          type: "button",
          class: "dock-menu-item",
          onClick: p
        }, [...y[10] || (y[10] = [
          n("span", { class: "dock-menu-symbol" }, "↗", -1),
          n("span", null, "在新标签页打开官网", -1)
        ])])) : (l(), d("button", {
          key: 2,
          type: "button",
          class: "dock-menu-item",
          onClick: y[0] || (y[0] = ($) => i("close"))
        }, [...y[11] || (y[11] = [
          n("span", { class: "dock-menu-symbol" }, "🏠", -1),
          n("span", null, "返回常用主页", -1)
        ])]))
      ], 44, pu)) : M("", !0)
    ]));
  }
}), yu = /* @__PURE__ */ Ie(vu, [["__scopeId", "data-v-3aa85877"]]), wu = { class: "mac-dock-shelf" }, bu = ["data-dock-target", "title", "onPointerdown", "onClick", "onContextmenu"], ku = ["src", "alt"], _u = {
  key: 0,
  class: "mac-dock-dot",
  "aria-hidden": "true"
}, Cu = ["data-dock-tool", "title", "onPointerdown", "onClick", "onContextmenu"], xu = ["src", "alt"], Lu = {
  key: 1,
  class: "mac-dock-emoji",
  "aria-hidden": "true"
}, $u = {
  key: 2,
  class: "mac-dock-dot",
  "aria-hidden": "true"
}, Su = {
  key: 3,
  class: "mac-dock-badge"
}, Tu = ["src"], Iu = {
  key: 1,
  class: "mac-dock-emoji"
}, Mu = /* @__PURE__ */ de({
  __name: "MacDock",
  setup(e) {
    const t = ae(() => Vt), o = N(null), i = ae(() => Object.fromEntries(Vt.tools.map((W) => {
      const H = Xe(W.id)?.badgeCount?.() || 0;
      return [W.id, Number.isFinite(H) ? Math.max(0, Math.floor(H)) : 0];
    })));
    function r(W) {
      W.stopPropagation(), o.value = null, T(W.currentTarget), To.open();
    }
    function a(W, H) {
      H.stopPropagation(), o.value = null, T(H.currentTarget), dt.triggerItem("target", W);
    }
    function h(W, H) {
      const K = H.currentTarget.getBoundingClientRect(), ge = Vt.position, B = ge === "left" || ge === "right";
      o.value = {
        type: "card",
        id: W.id,
        title: W.title,
        icon: W.icon,
        x: B ? ge === "left" ? K.right + 8 : K.left - 8 : K.left + K.width / 2,
        y: B ? K.top + K.height / 2 : ge === "top" ? K.bottom + 8 : K.top
      };
    }
    function f(W) {
      W.stopPropagation(), o.value = null, T(W.currentTarget), dt.triggerItem("home", "home-launcher");
    }
    function u(W, H) {
      H.stopPropagation(), o.value = null, T(H.currentTarget), Xe(W) || Ae.markRunning(W), dt.triggerItem("tool", W);
    }
    function x(W, H) {
      const K = H.currentTarget.getBoundingClientRect(), ge = Vt.position, B = ge === "left" || ge === "right";
      o.value = {
        type: "tool",
        id: W.id,
        title: W.title,
        icon: W.icon,
        emoji: W.emoji,
        x: B ? ge === "left" ? K.right + 8 : K.left - 8 : K.left + K.width / 2,
        y: B ? K.top + K.height / 2 : ge === "top" ? K.bottom + 8 : K.top
      };
    }
    const k = /* @__PURE__ */ new Map();
    function T(W) {
      if (!W || (k.get(W)?.cancel(), window.matchMedia("(prefers-reduced-motion: reduce)").matches)) return;
      const H = W.animate([
        { translate: "0 0", offset: 0 },
        { translate: "0 -8px", offset: 0.35 },
        { translate: "0 0", offset: 0.65 },
        { translate: "0 -2px", offset: 0.85 },
        { translate: "0 0", offset: 1 }
      ], { duration: 350, easing: "ease" });
      k.set(W, H);
      const P = () => {
        k.get(W) === H && k.delete(W);
      };
      H.onfinish = P, H.oncancel = P;
    }
    const g = N(null), p = ke({
      visible: !1,
      x: 0,
      y: 0,
      width: 40,
      height: 40,
      item: null,
      type: "tool"
    }), c = N(null), y = N(null), $ = ae(() => c.value || t.value.cards), b = ae(() => y.value || t.value.tools);
    let L = "", A = 0, ee = !1, ne = 0;
    function E(W, H, P) {
      if (P.button !== 0 || P.target.closest(".mac-dock-market-btn")) return;
      const B = P.currentTarget.getBoundingClientRect();
      ee = !1, g.value = {
        type: W,
        id: H.id,
        item: H,
        startX: P.clientX,
        startY: P.clientY,
        initialLeft: B.left,
        initialTop: B.top,
        width: B.width,
        height: B.height
      }, window.addEventListener("pointermove", w), window.addEventListener("pointerup", _), window.addEventListener("pointercancel", _);
    }
    function w(W) {
      if (!g.value) return;
      const H = W.clientX - g.value.startX, P = W.clientY - g.value.startY, K = Math.hypot(H, P);
      if (!ee && K > 5 && (ee = !0, p.visible = !0, p.item = g.value.item, p.type = g.value.type, p.width = g.value.width, p.height = g.value.height, g.value.type === "card" ? c.value = [...t.value.cards] : y.value = [...t.value.tools]), !ee) return;
      p.x = W.clientX - p.width / 2, p.y = W.clientY - p.height / 2;
      const B = document.elementsFromPoint(W.clientX, W.clientY).find(
        (_e) => _e.classList.contains("mac-dock-item") && !_e.classList.contains("mac-dock-market-btn")
      );
      if (!B) return;
      const O = B.getAttribute("data-dock-target"), R = B.getAttribute("data-dock-tool"), me = g.value.type, We = g.value.id, Oe = Date.now();
      if (me === "card" && O && O !== We && O !== "home-launcher") {
        const _e = B.getBoundingClientRect(), $e = _e.left + _e.width / 2;
        if (Math.abs(W.clientX - $e) > _e.width * 0.55 || O === L && Oe - A < 180) return;
        const Se = [...c.value || t.value.cards], Ke = Se.findIndex((He) => He.id === We), Ze = Se.findIndex((He) => He.id === O);
        if (Ke >= 0 && Ze >= 0 && Ke !== Ze) {
          const He = Se.splice(Ke, 1)[0];
          Se.splice(Ze, 0, He), c.value = Se, L = O, A = Oe;
        }
      } else if (me === "tool" && R && R !== We) {
        const _e = B.getBoundingClientRect(), $e = _e.left + _e.width / 2;
        if (Math.abs(W.clientX - $e) > _e.width * 0.55 || R === L && Oe - A < 180) return;
        const Se = [...y.value || t.value.tools], Ke = Se.findIndex((He) => He.id === We), Ze = Se.findIndex((He) => He.id === R);
        if (Ke >= 0 && Ze >= 0 && Ke !== Ze) {
          const He = Se.splice(Ke, 1)[0];
          Se.splice(Ze, 0, He), y.value = Se, L = R, A = Oe;
        }
      }
    }
    function _() {
      window.removeEventListener("pointermove", w), window.removeEventListener("pointerup", _), window.removeEventListener("pointercancel", _), ee && g.value && (ne = Date.now() + 250, g.value.type === "card" && c.value ? dt.reorderCards(c.value.map((W) => W.id)) : g.value.type === "tool" && y.value && dt.reorderTools(y.value.map((W) => W.id))), p.visible = !1, p.item = null, c.value = null, y.value = null, g.value = null, ee = !1, L = "";
    }
    function D(W, H) {
      Date.now() < ne || a(W, H);
    }
    function Y(W, H) {
      Date.now() < ne || u(W, H);
    }
    return ro(() => {
      for (const W of k.values()) W.cancel();
      k.clear(), window.removeEventListener("pointermove", w), window.removeEventListener("pointerup", _), window.removeEventListener("pointercancel", _);
    }), (W, H) => (l(), d(G, null, [
      n("div", wu, [
        q(Yo, {
          tag: "div",
          class: "mac-dock-group mac-dock-cards-group",
          name: "dock-item-motion"
        }, {
          default: to(() => [
            (l(!0), d(G, null, fe($.value, (P) => (l(), d("button", {
              key: P.id,
              class: le(["mac-dock-item", {
                "is-active": t.value.activeTargetId === P.id,
                "is-drag-origin": g.value && g.value.id === P.id
              }]),
              type: "button",
              "data-dock-target": P.id,
              title: P.title,
              onPointerdown: (K) => E("card", P, K),
              onClick: F((K) => D(P.id, K), ["stop"]),
              onContextmenu: F((K) => h(P, K), ["prevent"])
            }, [
              n("img", {
                class: "mac-dock-icon",
                src: P.icon,
                alt: P.title
              }, null, 8, ku),
              t.value.activeTargetId === P.id ? (l(), d("span", _u)) : M("", !0)
            ], 42, bu))), 128))
          ]),
          _: 1
        }),
        H[5] || (H[5] = n("div", {
          class: "mac-dock-divider",
          "aria-hidden": "true"
        }, null, -1)),
        n("button", {
          class: "mac-dock-item",
          type: "button",
          "data-dock-target": "home-launcher",
          title: "常用主页",
          onClick: H[0] || (H[0] = F((P) => f(P), ["stop"]))
        }, [...H[3] || (H[3] = [
          n("img", {
            class: "mac-dock-icon",
            src: "assets/nav-home.svg",
            alt: "主页"
          }, null, -1)
        ])]),
        H[6] || (H[6] = n("div", {
          class: "mac-dock-divider mac-dock-divider-dark",
          "aria-hidden": "true"
        }, null, -1)),
        q(Yo, {
          tag: "div",
          class: "mac-dock-group mac-dock-tools-group",
          name: "dock-item-motion"
        }, {
          default: to(() => [
            (l(!0), d(G, null, fe(b.value, (P) => (l(), d("button", {
              key: P.id,
              class: le(["mac-dock-item", {
                "is-active": s(Ae).isRunning(P.id),
                "is-drag-origin": g.value && g.value.id === P.id
              }]),
              type: "button",
              "data-dock-tool": P.id,
              title: P.title,
              onPointerdown: (K) => E("tool", P, K),
              onClick: F((K) => Y(P.id, K), ["stop"]),
              onContextmenu: F((K) => x(P, K), ["prevent"])
            }, [
              P.icon ? (l(), d("img", {
                key: 0,
                class: "mac-dock-icon",
                src: P.icon,
                alt: P.title
              }, null, 8, xu)) : P.emoji ? (l(), d("span", Lu, v(P.emoji), 1)) : M("", !0),
              s(Ae).isRunning(P.id) ? (l(), d("span", $u)) : M("", !0),
              i.value[P.id] > 0 ? (l(), d("span", Su, v(i.value[P.id] > 99 ? "99+" : i.value[P.id]), 1)) : M("", !0)
            ], 42, Cu))), 128))
          ]),
          _: 1
        }),
        n("button", {
          class: le(["mac-dock-item mac-dock-market-btn", { "is-active": s(To).state.isOpen }]),
          type: "button",
          title: "模块与全屏插件管理",
          onClick: H[1] || (H[1] = F((P) => r(P), ["stop"]))
        }, [...H[4] || (H[4] = [
          n("span", {
            class: "mac-dock-market-icon",
            "aria-hidden": "true"
          }, "🧩", -1)
        ])], 2)
      ]),
      (l(), ce(gt, { to: "body" }, [
        p.visible && p.item ? (l(), d("div", {
          key: 0,
          class: "mac-dock-drag-ghost",
          style: ye({
            width: p.width + "px",
            height: p.height + "px",
            transform: "translate3d(" + p.x + "px," + p.y + "px, 0)"
          }),
          "aria-hidden": "true"
        }, [
          p.item.icon ? (l(), d("img", {
            key: 0,
            class: "mac-dock-icon",
            src: p.item.icon,
            alt: ""
          }, null, 8, Tu)) : p.item.emoji ? (l(), d("span", Iu, v(p.item.emoji), 1)) : M("", !0)
        ], 4)) : M("", !0)
      ])),
      q(yu, {
        target: o.value,
        onClose: H[2] || (H[2] = (P) => o.value = null)
      }, null, 8, ["target"])
    ], 64));
  }
}), rs = /* @__PURE__ */ Ie(Mu, [["__scopeId", "data-v-4528a5df"]]), Du = {
  id: "win-toast-container",
  class: "win-toast-container",
  "aria-live": "polite",
  "aria-relevant": "additions"
}, Au = ["data-toast-fingerprint", "onMouseenter", "onMouseleave"], Eu = { class: "win-toast-head" }, Pu = ["src"], Wu = { class: "win-toast-app" }, Ou = ["onClick"], Bu = ["onClick"], Ru = { class: "win-toast-title" }, Nu = {
  key: 0,
  class: "win-toast-subtitle"
}, Fu = {
  key: 1,
  class: "win-toast-snippet"
}, Hu = {
  key: 0,
  class: "win-toast-actions"
}, ju = ["onClick"], zu = ["onClick"], Gu = /* @__PURE__ */ de({
  __name: "NotificationHost",
  setup(e) {
    const t = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), r = N({}), a = N({});
    let h = null;
    function f(c) {
      const y = t.get(c);
      y !== void 0 && clearTimeout(y), t.delete(c);
    }
    function u(c, y = c.duration) {
      f(c.id), i.set(c.id, y), o.set(c.id, Date.now()), a.value[c.id] = !1, r.value[c.id] = Math.max(0, Math.min(100, y / c.duration * 100)), ft(() => requestAnimationFrame(() => {
        r.value[c.id] = 0;
      })), t.set(c.id, window.setTimeout(() => {
        t.delete(c.id), be.close(c.id);
      }, y));
    }
    function x(c) {
      f(c.id);
      const y = Date.now() - (o.get(c.id) || Date.now()), $ = Math.max(0, (i.get(c.id) ?? c.duration) - y);
      i.set(c.id, $), a.value[c.id] = !0, r.value[c.id] = Math.max(0, Math.min(100, $ / c.duration * 100));
    }
    function k(c) {
      u(c, Math.max(1500, i.get(c.id) ?? c.duration));
    }
    function T(c) {
      f(c.id), be.close(c.id);
    }
    function g(c) {
      if (xt.markRead(c.id), T(c), !c.onClick) {
        c.target && xt.openTarget(c.target);
        return;
      }
      try {
        Promise.resolve(c.onClick()).catch((y) => console.warn("Notification action failed", y));
      } catch (y) {
        console.warn("Notification action failed", y);
      }
    }
    function p(c) {
      const y = Math.max(500, i.get(c.id) ?? c.duration);
      return {
        width: `${r.value[c.id] ?? 100}%`,
        transition: a.value[c.id] ? "none" : `width ${y}ms linear`
      };
    }
    return Ge(() => {
      h = new MutationObserver(() => {
        const y = new Set(Mo.map(($) => $.id));
        for (const $ of Mo)
          !$.closing && !t.has($.id) && !i.has($.id) && u($);
        for (const $ of i.keys())
          y.has($) || (f($), i.delete($), o.delete($), delete r.value[$], delete a.value[$]);
      });
      const c = document.getElementById("win-toast-container");
      c && h.observe(c, { childList: !0 });
      for (const y of Mo) u(y);
    }), ro(() => {
      h?.disconnect(), h = null;
      for (const c of t.values()) clearTimeout(c);
      t.clear();
    }), (c, y) => (l(), ce(gt, { to: "body" }, [
      n("div", Du, [
        q(Yo, { name: "win-toast" }, {
          default: to(() => [
            (l(!0), d(G, null, fe(s(Mo), ($) => (l(), d("article", {
              key: $.id,
              class: le(["win-toast-card", [$.appType, { closing: $.closing }]]),
              "data-toast-fingerprint": $.fingerprint,
              onMouseenter: (b) => x($),
              onMouseleave: (b) => k($)
            }, [
              n("header", Eu, [
                n("img", {
                  src: $.icon,
                  class: "win-toast-icon",
                  alt: ""
                }, null, 8, Pu),
                n("span", Wu, v($.appName), 1),
                y[0] || (y[0] = n("span", { class: "win-toast-time" }, "刚刚", -1)),
                n("button", {
                  type: "button",
                  class: "win-toast-close",
                  title: "关闭",
                  "aria-label": "关闭通知",
                  onClick: (b) => T($)
                }, "✕", 8, Ou)
              ]),
              n("button", {
                type: "button",
                class: "win-toast-body win-toast-body-button",
                onClick: (b) => g($)
              }, [
                n("span", Ru, v($.title), 1),
                $.subtitle ? (l(), d("span", Nu, v($.subtitle), 1)) : M("", !0),
                $.message ? (l(), d("span", Fu, v($.message), 1)) : M("", !0)
              ], 8, Bu),
              $.showActions && $.actionLabel ? (l(), d("footer", Hu, [
                n("button", {
                  type: "button",
                  class: "win-toast-btn primary",
                  onClick: (b) => g($)
                }, v($.actionLabel), 9, ju),
                n("button", {
                  type: "button",
                  class: "win-toast-btn",
                  onClick: (b) => T($)
                }, "关闭", 8, zu)
              ])) : M("", !0),
              n("div", {
                class: "win-toast-progress",
                style: ye(p($))
              }, null, 4)
            ], 42, Au))), 128))
          ]),
          _: 1
        })
      ])
    ]));
  }
}), as = /* @__PURE__ */ Ie(Gu, [["__scopeId", "data-v-8ecd30bd"]]), Ku = ["id"], Vu = /* @__PURE__ */ de({
  __name: "DockModuleHost",
  setup(e) {
    const t = Wi().filter((o) => o.presentation !== "card").map((o) => {
      Ue(o.lifecycle.isVisible, (r) => {
        r && Ae.markRunning(o.id);
      }, { immediate: !0, flush: "sync" });
      const i = de({
        setup: () => () => Re("section", { class: "dock-module-load-error", role: "alert" }, [
          Re("div", { style: "display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;" }, [
            Re("strong", { style: "font-size: 13px; color: var(--heading);" }, `${o.title} 加载受阻`),
            Re("span", { style: "font-size: 11px; padding: 2px 6px; border-radius: 4px; background: var(--surface); color: var(--muted); border: 1px solid var(--border);" }, "代码可能已更新")
          ]),
          Re("p", { style: "font-size: 12px; line-height: 1.5; color: var(--muted); margin: 0 0 12px 0;" }, "模块分块代码未就绪。若刚才在终端编写或重新构建了扩展，点击「刷新标签页」即可立即同步最新切片。"),
          Re("div", { style: "display: flex; gap: 8px;" }, [
            Re("button", {
              type: "button",
              style: "padding: 5px 12px; border-radius: 6px; border: 1px solid var(--border); background: var(--primary, #3b82f6); color: #fff; cursor: pointer; font-size: 12px; font-weight: 500;",
              onClick: () => {
                typeof window < "u" && window.location.reload();
              }
            }, "⟳ 刷新标签页"),
            Re("button", {
              type: "button",
              style: "padding: 5px 10px; border-radius: 6px; border: 1px solid var(--border); background: var(--surface); color: var(--text); cursor: pointer; font-size: 12px;",
              onClick: () => {
                Ae.reloadApp(o.id);
              }
            }, "↻ 重试"),
            Re("button", {
              type: "button",
              style: "padding: 5px 10px; border-radius: 6px; border: 1px solid var(--border); background: var(--surface); color: var(--text); cursor: pointer; font-size: 12px;",
              onClick: () => {
                Ae.hideApp(o.id);
              }
            }, "隐藏")
          ])
        ])
      });
      return {
        definition: o,
        mounted: ae(() => !!Ye[o.id]),
        view: z({
          loader: o.loadView,
          onError(r, a, h, f) {
            f <= 2 ? a() : h();
          },
          errorComponent: i
        })
      };
    });
    return ro(() => {
      for (const { definition: o } of t)
        Me.close(o.id), Qt.delete(o.id), Ye[o.id] = !1;
    }), (o, i) => (l(!0), d(G, null, fe(s(t), (r) => Ne((l(), d("div", {
      id: r.definition.rootId,
      key: r.definition.id
    }, [
      r.mounted.value ? (l(), ce(Di(r.view), {
        key: s(Ae).getRenderKey(r.definition.id)
      })) : M("", !0)
    ], 8, Ku)), [
      [no, r.definition.lifecycle.isVisible()]
    ])), 128));
  }
}), Uu = /* @__PURE__ */ Ie(Vu, [["__scopeId", "data-v-3f131313"]]);
function ze(e, t) {
  const o = N(!1);
  return Ue(
    e,
    (i) => {
      i && (o.value = !0);
    },
    { immediate: !0, flush: "sync" }
  ), Lt(o);
}
const Yu = ["onKeydown"], qu = { class: "fo-up-preview-head" }, Xu = ["src"], Ju = { class: "fo-up-preview-meta" }, Zu = { class: "fo-up-preview-name-row" }, Qu = ["href"], ep = ["disabled"], tp = { class: "fo-up-preview-sign" }, op = { class: "fo-up-preview-videos" }, np = {
  key: 0,
  class: "fo-up-preview-loading"
}, ip = {
  key: 1,
  class: "fo-up-preview-empty"
}, sp = {
  key: 2,
  class: "fo-up-preview-empty"
}, rp = ["href", "title", "onClick"], ap = ["src"], lp = {
  key: 0,
  class: "fo-bili-duration"
}, cp = { class: "fo-up-preview-video-info" }, dp = ["href", "title", "onClick"], up = { class: "fo-up-preview-video-meta" }, pp = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2394a3b8'%3E%3Cpath d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/%3E%3C/svg%3E", fp = /* @__PURE__ */ de({
  __name: "BiliUpPreview",
  setup(e) {
    const t = N(!1);
    function o() {
      if (!pe.submitting) {
        if (!pe.followed) {
          t.value = !1, Vo.toggleFollow();
          return;
        }
        if (!t.value) {
          t.value = !0;
          return;
        }
        t.value = !1, Vo.toggleFollow();
      }
    }
    function i() {
      t.value = !1, Vo.close();
    }
    function r(a, h) {
      a.ctrlKey || a.metaKey || (a.preventDefault(), a.stopPropagation(), h.bvid ? (En.openVideo({
        bvid: h.bvid,
        title: h.title,
        cover: h.cover,
        author: pe.name,
        authorFace: pe.face,
        mid: pe.mid,
        url: h.url
      }), i()) : h.url && h.url !== "#" && window.open(h.url, "_blank"));
    }
    return (a, h) => s(pe).open ? (l(), d("div", {
      key: 0,
      class: "fo-up-preview-backdrop",
      onPointerdown: F(i, ["self"])
    }, [
      n("aside", {
        class: "fo-up-preview-popover",
        style: ye({ left: `${s(pe).left}px`, top: `${s(pe).top}px` }),
        onKeydown: Bt(F(i, ["stop", "prevent"]), ["esc"])
      }, [
        n("div", qu, [
          n("img", {
            class: "fo-up-preview-avatar",
            src: s(pe).face || pp,
            alt: "",
            referrerpolicy: "no-referrer"
          }, null, 8, Xu),
          n("div", Ju, [
            n("div", Zu, [
              n("a", {
                class: "fo-up-preview-name",
                href: `https://space.bilibili.com/${s(pe).mid}`,
                target: "_blank",
                rel: "noreferrer"
              }, v(s(pe).name), 9, Qu),
              n("button", {
                type: "button",
                class: le([
                  s(pe).followed ? "fo-up-preview-unfollow" : "fo-up-preview-follow",
                  { "is-armed": t.value }
                ]),
                disabled: s(pe).submitting,
                onClick: o
              }, v(s(pe).submitting ? "处理中…" : t.value ? "确定取消？" : s(pe).followed ? "取消关注" : "＋ 关注"), 11, ep)
            ]),
            n("p", tp, v(s(pe).sign || "暂无个人简介"), 1)
          ]),
          n("button", {
            type: "button",
            class: "fo-up-preview-close",
            "aria-label": "关闭预览",
            onClick: i
          }, "✕")
        ]),
        h[1] || (h[1] = n("div", { class: "fo-up-preview-title-tag" }, "近期投稿视频（最新 2~3 个）", -1)),
        n("div", op, [
          s(pe).loading ? (l(), d("div", np, [...h[0] || (h[0] = [
            n("i", null, null, -1),
            n("span", null, "正在读取近期投稿…", -1)
          ])])) : s(pe).error ? (l(), d("p", ip, v(s(pe).error), 1)) : s(pe).videos.length ? (l(!0), d(G, { key: 3 }, fe(s(pe).videos, (f) => (l(), d("article", {
            key: f.bvid,
            class: "fo-up-preview-video"
          }, [
            n("a", {
              class: "fo-up-preview-thumb",
              href: f.url,
              title: `就地播放「${f.title}」（Ctrl+点击在网页打开）`,
              onClick: (u) => r(u, f)
            }, [
              n("img", {
                src: f.cover,
                alt: "",
                loading: "lazy",
                referrerpolicy: "no-referrer"
              }, null, 8, ap),
              f.duration ? (l(), d("span", lp, v(f.duration), 1)) : M("", !0)
            ], 8, rp),
            n("div", cp, [
              n("a", {
                class: "fo-up-preview-video-title",
                href: f.url,
                title: `就地播放「${f.title}」（Ctrl+点击在网页打开）`,
                onClick: (u) => r(u, f)
              }, v(f.title), 9, dp),
              n("div", up, [
                n("span", null, "▣ " + v(f.playCount), 1),
                n("span", null, v(f.published), 1)
              ])
            ])
          ]))), 128)) : (l(), d("p", sp, "该 UP 主近期暂无视频动态"))
        ])
      ], 44, Yu)
    ], 32)) : M("", !0);
  }
}), gp = /* @__PURE__ */ Ie(fp, [["__scopeId", "data-v-3fedd7f1"]]), hp = { class: "logicweaver-overlays-layer" }, mp = { id: "vue-notification-root" }, vp = {
  id: "bili-profile-menu",
  class: "bili-profile-menu",
  hidden: ""
}, yp = { id: "vue-bili-message-panel-root" }, wp = { id: "vue-notification-center-root" }, bp = { id: "vue-tab-manager-root" }, kp = { id: "vue-bookmark-menu-root" }, _p = { id: "vue-bookmark-panel-root" }, Cp = { id: "vue-launcher-dialogs-root" }, xp = { id: "vue-launcher-folder-root" }, Lp = { id: "vue-launcher-menus-root" }, $p = { id: "vue-settings-dialog-root" }, Sp = { id: "vue-clock-settings-root" }, Tp = { id: "vue-bili-theater-root" }, Ip = { id: "vue-bili-mini-player-root" }, Mp = { id: "vue-ai-dialog-root" }, Dp = { id: "vue-aihot-viewer-root" }, Ap = { id: "vue-nav-wheel-root" }, Ep = { id: "vue-github-detail-root" }, Pp = { id: "vue-bili-subtitle-modal-root" }, Wp = { id: "vue-firecrawl-modal-root" }, Op = { id: "vue-floating-image-viewer-root" }, Bp = { id: "vue-command-palette-root" }, Rp = /* @__PURE__ */ de({
  __name: "AppOverlays",
  setup(e) {
    const t = ze(() => To.state.isOpen), o = ze(() => Ei.isOpen), i = ze(() => Ko.isOpen), r = ze(() => Wt.state.isOpen), a = ze(() => kr.open), h = ze(() => $o.state.isOpen), f = ze(() => Gs.isOpen), u = ze(() => wr.isOpen), x = ze(() => Yn.state.isOpen), k = ze(() => Js.isOpen), T = ze(() => Pe.isOpen), g = ze(() => Nn.isOpen);
    let p;
    Ge(() => {
      p = Ja();
    }), $t(() => {
      p?.();
    });
    const c = ze(() => zn.state.isOpen), y = ze(() => qe.isOpen), $ = ze(() => jt.editDialog.isOpen || jt.iconPicker.isOpen || jt.linkMove.isOpen || jt.folderMove.isOpen || jt.groupMerge.isOpen || jt.folderDelete.isOpen), b = z(() => import("./ProfileMenu--enlxpxh.js")), L = z(() => import("./BookmarkNoteMenu-C9OAO2ZF.js")), A = z(() => import("./BookmarkPanel-CkbynGXf.js")), ee = z(() => import("./ClockSettingsMenu-Ds70QD54.js")), ne = z(() => import("./NotificationCenter-C6l3FVBR.js")), E = z(() => import("./TabManagerPanel-BczdOoT4.js")), w = z(() => import("./LauncherDialogs-dn7nFBhV.js")), _ = z(() => import("./LauncherFolderDialog-svWeXtrd.js")), D = z(() => import("./LauncherMenus-C5EglRvz.js")), Y = z(() => import("./SettingsDialog-C5_R5gC1.js")), W = z(() => import("./BiliMiniPlayer-BW_sk0HX.js")), H = z(() => import("./BiliTheaterDialog-BmiZXrz5.js")), P = z(() => import("./BiliMessagePanel-Dxoa_W9w.js")), K = z(() => import("./AiDialog-AT8LHt4a.js")), ge = z(() => import("./AihotViewer-BEdldf2-.js")), B = z(() => import("./NavWheelOverlay-g6MgFcxv.js")), O = z(() => import("./GitHubRepoDetailDrawer-CcrD93Sx.js")), R = z(() => import("./InPageSideDrawer-BmwrpP3s.js")), me = z(() => import("./BiliSubtitleModal-Bsv0VQej.js")), We = z(() => import("./FirecrawlModal-BsEtK9_y.js")), Oe = z(() => import("./FloatingImageViewer-CTBbFpMW.js")), _e = z(() => import("./CommandPalette-BgbOL95R.js")), $e = z(() => import("./AppPromptModal-BQMu9TVI.js")), Se = z(async () => {
      const [Ke, Ze] = await Promise.all([
        import("./PluginMarketDialog-Dc4lVtED.js"),
        import("./plugin-market-B6zN10fA.js")
      ]);
      return zs("logicweaver-market-styles", Ze.default), Ke.default;
    });
    return (Ke, Ze) => (l(), d("div", hp, [
      n("div", mp, [
        q(as)
      ]),
      n("div", vp, [
        q(s(b))
      ]),
      n("div", yp, [
        s(u) ? (l(), ce(s(P), { key: 0 })) : M("", !0)
      ]),
      n("div", wp, [
        s(o) ? (l(), ce(s(ne), { key: 0 })) : M("", !0)
      ]),
      n("div", bp, [
        s(i) ? (l(), ce(s(E), { key: 0 })) : M("", !0)
      ]),
      n("div", kp, [
        s(c) ? (l(), ce(s(L), { key: 0 })) : M("", !0)
      ]),
      n("div", _p, [
        q(s(A))
      ]),
      n("div", Cp, [
        s($) ? (l(), ce(s(w), { key: 0 })) : M("", !0)
      ]),
      n("div", xp, [
        s(y) ? (l(), ce(s(_), { key: 0 })) : M("", !0)
      ]),
      n("div", Lp, [
        q(s(D))
      ]),
      n("div", $p, [
        q(s(Y))
      ]),
      n("div", Sp, [
        s(r) ? (l(), ce(s(ee), { key: 0 })) : M("", !0)
      ]),
      n("div", Tp, [
        s(h) ? (l(), ce(s(H), { key: 0 })) : M("", !0)
      ]),
      n("div", Ip, [
        s(f) ? (l(), ce(s(W), { key: 0 })) : M("", !0)
      ]),
      n("div", Mp, [
        s(x) ? (l(), ce(s(K), { key: 0 })) : M("", !0)
      ]),
      n("div", Dp, [
        s(a) ? (l(), ce(s(ge), { key: 0 })) : M("", !0)
      ]),
      n("div", Ap, [
        q(s(B))
      ]),
      q(Uu),
      n("div", Ep, [
        s(k) ? (l(), ce(s(O), { key: 0 })) : M("", !0)
      ]),
      n("div", Pp, [
        q(s(me))
      ]),
      n("div", Wp, [
        q(s(We))
      ]),
      n("div", Op, [
        q(s(Oe))
      ]),
      n("div", Bp, [
        s(T) ? (l(), ce(s(_e), { key: 0 })) : M("", !0)
      ]),
      s(g) ? (l(), ce(s(R), { key: 0 })) : M("", !0),
      q(gp),
      q(s($e)),
      s(t) ? (l(), ce(s(Se), { key: 1 })) : M("", !0)
    ]));
  }
});
let Mn = !1;
function Np(e = 1800) {
  if (Mn || typeof window > "u") return;
  const t = () => {
    if (Mn) return;
    Mn = !0;
    const o = Wi();
    for (const i of o)
      if (typeof i.loadView == "function")
        try {
          i.loadView().catch(() => {
          });
        } catch {
        }
  };
  "requestIdleCallback" in window ? setTimeout(() => {
    window.requestIdleCallback(t, { timeout: 4e3 });
  }, e) : setTimeout(t, e);
}
const Fp = ["data-active-workspace"], Hp = /* @__PURE__ */ de({
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
    let r = "";
    function a(u, x = "image/svg+xml") {
      if (typeof document > "u") return;
      const k = typeof chrome < "u" && chrome.runtime?.getURL ? chrome.runtime.getURL(u) : u;
      if (r === k) return;
      r = k;
      const T = document.querySelectorAll("link[rel*='icon']");
      if (T.length > 0)
        T.forEach((g) => {
          g.type = x, g.href = k;
        });
      else {
        const g = document.createElement("link");
        g.rel = "icon", g.type = x, g.href = k, document.head.appendChild(g);
      }
    }
    function h() {
      if (typeof document > "u") return;
      const u = i[Do.value] || i.home;
      if (a(u.icon, u.iconType), U.playing && U.title) {
        const x = U.artist ? ` - ${U.artist}` : "";
        document.title = `▶ ${U.title}${x}`;
        return;
      }
      if (uo.playing && uo.title) {
        document.title = `▶ ${uo.title} · 电台`;
        return;
      }
      document.title = u.title;
    }
    Ue(
      [
        () => Do.value,
        () => U.playing,
        () => U.title,
        () => U.artist,
        () => uo.playing,
        () => uo.title
      ],
      () => {
        h();
      },
      { immediate: !0 }
    );
    const f = ae(() => Do.value === "home" ? "" : Do.value);
    return Ue(() => Ct.activeId, (u) => {
      document.body.classList.toggle("has-card-fullscreen", !!u);
    }, { immediate: !0, flush: "sync" }), Ge(() => {
      typeof document < "u" && (document.body.dataset.spa = "1");
      try {
        Bn.bindGlobalListener(), Je.start(), xi.start(), Rn.init().catch((u) => console.warn("[Launcher] 初始化失败", u)), Np(), typeof chrome < "u" && chrome?.runtime?.sendMessage && setTimeout(() => {
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
    }), $t(() => {
      Je.stop(), Rn.stop(), xi.stop(), document.body.classList.remove("has-card-fullscreen"), typeof document < "u" && o && (document.title = o);
    }), t({
      activeWorkspaceId: f,
      windowManagerController: Me
    }), (u, x) => (l(), d("div", {
      id: "logicweaver-spa-root",
      class: "logicweaver-spa-root",
      "data-active-workspace": f.value || ""
    }, [
      q(ra),
      q(al),
      q(nu),
      q(uu),
      n("nav", {
        id: "mac-dock",
        class: le(["mac-dock", "dock-" + s(Vt).position]),
        "aria-label": "快捷应用栏"
      }, [
        q(rs)
      ], 2),
      q(Rp)
    ], 8, Fp));
  }
}), jp = /* @__PURE__ */ Ie(Hp, [["__scopeId", "data-v-5d2f948f"]]), zp = {
  class: "endfield-stage",
  "aria-hidden": "true"
}, Gp = {
  class: "rhinelab-stage",
  "aria-hidden": "true"
}, Kp = { class: "rhine-scaler" }, Vp = { class: "rhine-center-group" }, Up = { class: "rhine-auth-status" }, Yp = { class: "rhine-auth-text" }, qp = ["hidden"], Xp = { class: "rhine-cinema-caption" }, Jp = /* @__PURE__ */ de({
  __name: "IntroAnimation",
  setup(e) {
    const t = N(window.innerHeight), o = N(window.innerWidth), i = N(!1), r = N(!1), a = N(10), h = N(1), f = N(0), u = /* @__PURE__ */ new Set();
    let x = 0, k = () => {
    };
    const T = ae(() => `${String(Math.round(tt.renderedProgress)).padStart(2, "0")}%`), g = ae(() => {
      const w = tt.renderedProgress / 100 * t.value + 10;
      return `${Math.min(w, Math.max(0, t.value - 102)).toFixed(1)}px`;
    }), p = ae(() => tt.renderedProgress >= 75 ? "START PROCESSING..." : tt.renderedProgress >= 35 ? "REQUEST RECEIVED" : "ID CONFIRMED : JOYCE MOORE"), c = ae(() => tt.finished ? "身份验证通过 · 欢迎进入终端" : tt.status ? `身份信息确认 · ${tt.status.replace(/^.*?\/\s*/, "")}` : "身份信息确认：JOYCE MOORE"), y = ae(() => String(Math.max(0.35, Math.min(o.value / 1920, t.value / 1080))));
    function $(w, _) {
      const D = window.setTimeout(() => {
        u.delete(D), w();
      }, _);
      u.add(D);
    }
    function b() {
      window.dispatchEvent(new CustomEvent("logicweaver:intro-complete"));
    }
    function L(w) {
      if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
        b();
        return;
      }
      const _ = w ? 180 : 260, D = w ? 200 : 280, Y = performance.now(), W = (H) => {
        const P = H - Y, K = Math.min(1, P / _), ge = 1 - Math.pow(1 - K, 3);
        if (a.value = 10 + ge * Math.max(0, o.value - 10), P > _ && (h.value = Math.max(0, 1 - (P - _) / D)), P >= _ + D) {
          b();
          return;
        }
        x = requestAnimationFrame(W);
      };
      $(() => {
        x = requestAnimationFrame(W);
      }, w ? 60 : 120);
    }
    function A(w) {
      w || (i.value = !0), $(() => {
        r.value = !0, f.value = 6, h.value = 0, $(b, 380);
      }, w ? 40 : 420);
    }
    function ee(w) {
      tt.style === "rhinelab" ? A(w) : L(w);
    }
    function ne() {
      o.value = window.innerWidth, t.value = window.innerHeight;
    }
    function E(w) {
      tt.finished || (w.key === "Enter" || w.key === " " || w.key === "Escape") && (w.preventDefault(), at.skip("KEYBOARD SKIP"));
    }
    return Ge(() => {
      document.documentElement.dataset.startupStyle = tt.style, document.documentElement.style.setProperty("--rhine-scale", y.value), window.addEventListener("resize", ne, { passive: !0 }), window.addEventListener("keydown", E, !0), k = Pr(ee), ji();
    }), ro(() => {
      k(), window.removeEventListener("resize", ne), window.removeEventListener("keydown", E, !0), cancelAnimationFrame(x);
      for (const w of u) clearTimeout(w);
      u.clear();
    }), (w, _) => (l(), d("div", {
      class: "intro-vue-content",
      style: ye({ "--rhine-scale": y.value, opacity: h.value, filter: `blur(${f.value}px)` })
    }, [
      n("div", zp, [
        _[2] || (_[2] = n("div", { class: "endfield-loader-texture" }, null, -1)),
        _[3] || (_[3] = n("div", { class: "endfield-loader-rail" }, null, -1)),
        n("div", {
          class: "endfield-loader-fill",
          style: ye({ height: `${s(tt).renderedProgress}%` })
        }, null, 4),
        n("div", {
          class: "endfield-loader-meter",
          style: ye({ top: g.value })
        }, [
          _[1] || (_[1] = n("span", { class: "endfield-loader-tick" }, null, -1)),
          n("b", null, v(T.value), 1),
          n("small", null, v(s(tt).status), 1)
        ], 4),
        _[4] || (_[4] = wo('<section class="endfield-loader-brand"><span class="endfield-loader-kicker">DEEPSEEK HARNESS</span><strong>END</strong><strong>FIELD</strong><span class="endfield-loader-detail"><i class="endfield-loader-chevron"></i><span>EDGE INTELLIGENCE THEME</span><small>TERRA RESEARCH COMMISSION / BOOT SEQUENCE</small><span class="endfield-loader-squares"><i class="on"></i><i class="on"></i><i class="on"></i><i></i><i></i><i></i><i class="on"></i><i class="on"></i><i></i><i></i><i></i><i></i></span></span><em>OVER THE FRONTIER / INTO THE FRONT</em></section>', 1)),
        n("div", {
          class: "endfield-loader-wipe",
          style: ye({ width: `${a.value}px`, opacity: a.value > 10 ? 1 : 0 })
        }, null, 4)
      ]),
      n("div", Gp, [
        _[12] || (_[12] = wo('<div class="rhine-background"><svg viewBox="0 0 1920 1080" preserveAspectRatio="none"><g fill="none" stroke="#ffffff" stroke-width="2.5"><path class="rhine-drift-path1" d="M-210 705C-45 705 182 704 247 567C337 377 99 306 4 435S27 680 169 631C309 584 227 314 279 111S568-113 568-113"></path><path class="rhine-drift-path2" d="M1560-80C1374 114 1671 168 1601 323S1371 367 1431 480S1692 666 1559 787S1329 886 1498 1130"></path><circle class="rhine-drift-circle" cx="1450" cy="648" r="346"></circle><circle class="rhine-drift-circle2" cx="1450" cy="648" r="348"></circle></g></svg></div>', 1)),
        n("div", Kp, [
          _[10] || (_[10] = wo('<header class="rhine-brand"><h1>RHINE LAB</h1><div class="rhine-brand-sub">SYNTHESIZE INFORMATION</div><p class="rhine-brand-os"><span class="rhine-brand-analysis"><span style="left:2px;">A</span><span style="left:28px;">N</span><span style="left:55px;">A</span><span style="left:81px;">L</span><span style="left:103px;">Y</span><span style="left:129px;">S</span><span style="left:154px;">I</span><span style="left:166px;">S</span></span><b>OS</b></p></header>', 1)),
          n("button", {
            class: "rhine-skip",
            type: "button",
            title: "点击进入系统 (或按 Enter)",
            onClick: _[0] || (_[0] = (D) => s(at).skip("ENTER SYSTEM"))
          }, [..._[5] || (_[5] = [
            Fe("ENTER SYSTEM ", -1),
            n("span", null, "↗", -1)
          ])]),
          n("div", Vp, [
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
            n("div", Up, [
              _[6] || (_[6] = n("span", { class: "rhine-auth-dot" }, "·", -1)),
              n("span", Yp, v(p.value), 1),
              _[7] || (_[7] = n("i", {
                class: "rhine-cursor",
                "aria-hidden": "true"
              }, null, -1))
            ])
          ]),
          n("div", {
            class: le(["rhine-scan", { active: i.value }]),
            hidden: !i.value
          }, [..._[9] || (_[9] = [
            wo('<svg viewBox="0 0 1920 1080" aria-hidden="true"><g fill="none" stroke="#080a08" stroke-linecap="round"><circle class="rhine-scan-circle ring-outer" cx="960" cy="540" r="280" stroke-width="2.5"></circle><circle class="rhine-scan-circle ring-white" cx="960" cy="540" r="260" stroke="#fff" stroke-width="3.5"></circle><circle class="rhine-scan-circle ring-inner" cx="960" cy="540" r="220" stroke-width="2"></circle><circle class="rhine-orbit-dot dot-1" cx="960" cy="260" r="8" fill="#ed821b" stroke="none"></circle><circle class="rhine-orbit-dot dot-2" cx="960" cy="820" r="8" fill="#ed821b" stroke="none"></circle><circle class="rhine-scan-core" cx="960" cy="540" r="6" fill="#080a08" stroke="none"></circle></g></svg><span class="rhine-scan-label">PERMISSION AUTHORIZED</span>', 2)
          ])], 10, qp),
          n("div", Xp, v(c.value), 1),
          _[11] || (_[11] = n("div", { class: "rhine-powered" }, [
            Fe("POWERED BY "),
            n("b", null, "RHINE LAB"),
            n("i")
          ], -1))
        ]),
        n("div", {
          class: le(["rhine-white", { flash: r.value }]),
          "aria-hidden": "true"
        }, null, 2)
      ])
    ], 4));
  }
}), Zp = /* @__PURE__ */ de({
  __name: "ProfileMenu",
  setup(e) {
    function t(o) {
      Io.trigger(o);
    }
    return (o, i) => (l(), d(G, null, [
      n("button", {
        type: "button",
        "data-action": "messages",
        onClick: i[0] || (i[0] = F((r) => t("messages"), ["stop"]))
      }, " 通知中心 "),
      n("button", {
        type: "button",
        "data-action": "tabs",
        onClick: i[1] || (i[1] = F((r) => t("tabs"), ["stop"]))
      }, "标签页管理"),
      n("button", {
        type: "button",
        "data-action": "refresh",
        onClick: i[2] || (i[2] = F((r) => t("refresh"), ["stop"]))
      }, " 刷新 B站账号信息 "),
      n("button", {
        type: "button",
        "data-action": "switch",
        onClick: i[3] || (i[3] = F((r) => t("switch"), ["stop"]))
      }, " 切换用户（打开 B站） "),
      n("button", {
        type: "button",
        "data-action": "web",
        onClick: i[4] || (i[4] = F((r) => t("web"), ["stop"]))
      }, " 打开 B站个人中心 ")
    ], 64));
  }
}), Qp = /* @__PURE__ */ de({
  __name: "WorkspaceLaunchers",
  setup(e) {
    function t(o) {
      Un.openWorkspace(o, !0);
    }
    return (o, i) => (l(), d(G, null, [
      n("button", {
        id: "ai-top-open",
        type: "button",
        onClick: i[0] || (i[0] = (r) => t("ai"))
      }, "AI 助手"),
      n("button", {
        id: "todoist-top-open",
        type: "button",
        onClick: i[1] || (i[1] = (r) => t("todoist"))
      }, "Todoist"),
      n("button", {
        id: "stickers-top-open",
        type: "button",
        onClick: i[2] || (i[2] = (r) => t("stickers"))
      }, "表情包"),
      n("button", {
        id: "calcom-top-open",
        type: "button",
        onClick: i[3] || (i[3] = (r) => t("calcom"))
      }, "预约"),
      n("button", {
        id: "wallpaper-top-open",
        type: "button",
        onClick: i[4] || (i[4] = (r) => t("wallpaper"))
      }, "壁纸库"),
      Mi(o.$slots, "default")
    ], 64));
  }
}), ef = {
  key: 0,
  "aria-label": "AI 分析任务"
}, tf = { role: "status" }, of = ["disabled"], nf = ["disabled"], sf = /* @__PURE__ */ de({
  __name: "GitHubStatus",
  setup(e) {
    return (t, o) => s(et).message || s(et).busy ? (l(), d("section", ef, [
      n("p", tf, v(s(et).repo ? `原任务仓库：${s(et).repo}。 ` : "") + v(s(et).message), 1),
      s(et).busy ? (l(), d("button", {
        key: 0,
        type: "button",
        onClick: o[0] || (o[0] = (i) => s(it).stopAiAnalysis())
      }, "停止后续分析 / 中断等待")) : M("", !0),
      s(et).uncertain ? (l(), d(G, { key: 1 }, [
        o[5] || (o[5] = n("p", null, "AI 结果未确认，已阻止本页再次提交。请到供应商核对请求和计费；本页记录在整页关闭或重载后会丢失。", -1)),
        s(et).unlockConfirmation ? (l(), d(G, { key: 1 }, [
          o[4] || (o[4] = n("p", null, "扩展不能验证供应商任务；确认只解除本页限制，不代表成功，也不会重发请求。", -1)),
          n("button", {
            type: "button",
            disabled: s(et).busy,
            onClick: o[2] || (o[2] = (i) => s(it).acknowledgeAiChecked())
          }, "确认解除本页限制", 8, nf),
          n("button", {
            type: "button",
            onClick: o[3] || (o[3] = (i) => s(et).unlockConfirmation = !1)
          }, "保持限制")
        ], 64)) : (l(), d("button", {
          key: 0,
          type: "button",
          disabled: s(et).busy,
          onClick: o[1] || (o[1] = (i) => s(et).unlockConfirmation = !0)
        }, "我已核对供应商记录", 8, of))
      ], 64)) : M("", !0)
    ])) : M("", !0);
  }
}), rf = {
  key: 0,
  role: "status",
  style: { "font-size": "12px", color: "var(--danger,#ef4444)", padding: "4px 8px", margin: "0 0 6px 0", "border-radius": "6px", background: "var(--surface)" }
}, af = {
  key: 0,
  class: "gh-sidebar-divider"
}, lf = {
  key: 1,
  class: "gh-sidebar-caption"
}, cf = ["data-folder", "onClick", "onDragover", "onDragleave", "onDrop"], df = {
  class: "gh-folder-icon-wrap",
  style: { "font-size": "13px", display: "grid", "place-items": "center" }
}, uf = { key: 0 }, pf = { key: 1 }, ff = {
  key: 2,
  class: "fo-folder-icon",
  style: { color: "currentColor" }
}, gf = ["title"], hf = { class: "gh-folder-count" }, mf = ["data-del", "onClick", "onKeydown"], vf = /* @__PURE__ */ de({
  __name: "GitHubFolders",
  props: {
    active: { type: Boolean, default: !0 }
  },
  setup(e) {
    const t = e, o = N(""), i = () => {
      o.value = "";
    };
    function r(x) {
      return t.active && !wt.busy && bo.folders.some((k) => k.title === x && (k.kind === "custom" || k.kind === "uncategorized"));
    }
    Ue(() => t.active, (x) => {
      i(), window.removeEventListener("dragend", i), window.removeEventListener("drop", i), x && (window.addEventListener("dragend", i), window.addEventListener("drop", i));
    }, { immediate: !0 }), ro(() => {
      window.removeEventListener("dragend", i), window.removeEventListener("drop", i);
    });
    function a(x, k) {
      x.stopPropagation(), At.delete(k);
    }
    function h(x, k) {
      if (!r(k) || !Array.from(x.dataTransfer?.types || []).includes(Zs)) {
        i();
        return;
      }
      x.preventDefault(), x.dataTransfer && (x.dataTransfer.dropEffect = "move"), o.value = k;
    }
    function f(x, k) {
      const T = x.currentTarget;
      T instanceof Node && x.relatedTarget instanceof Node && T.contains(x.relatedTarget) || o.value === k && (o.value = "");
    }
    function u(x, k) {
      if (i(), !r(k)) return;
      const T = Qs(x.dataTransfer);
      T && (x.preventDefault(), x.stopPropagation(), At.dropRepository(T, k));
    }
    return (x, k) => (l(), d(G, null, [
      s(wt).message ? (l(), d("p", rf, v(s(wt).message), 1)) : M("", !0),
      (l(!0), d(G, null, fe(s(bo).folders, (T, g) => (l(), d(G, {
        key: T.title
      }, [
        T.kind === "custom" && s(bo).folders[g - 1]?.kind !== "custom" ? (l(), d("div", af)) : M("", !0),
        T.kind === "custom" && s(bo).folders[g - 1]?.kind !== "custom" ? (l(), d("div", lf, "GitHub 列表 (Lists)")) : M("", !0),
        n("button", {
          type: "button",
          class: le(["gh-bili-folder", { on: T.active, "drag-into": o.value === T.title }]),
          "data-folder": T.title,
          onClick: (p) => s(At).select(T.title),
          onDragover: (p) => h(p, T.title),
          onDragleave: (p) => f(p, T.title),
          onDrop: (p) => u(p, T.title)
        }, [
          n("span", df, [
            T.kind === "all" ? (l(), d("span", uf, "⭐")) : T.kind === "uncategorized" ? (l(), d("span", pf, "📄")) : (l(), d("i", ff))
          ]),
          n("span", {
            class: "gh-folder-name",
            title: T.title
          }, v(T.title), 9, gf),
          n("small", hf, v(T.count), 1),
          T.kind === "custom" ? (l(), d("span", {
            key: 0,
            class: "gh-folder-delete",
            title: "删除 GitHub 列表",
            "data-del": T.title,
            role: "button",
            tabindex: "0",
            onClick: (p) => a(p, T.title),
            onKeydown: [
              Bt(F((p) => s(At).delete(T.title), ["prevent", "stop"]), ["enter"]),
              Bt(F((p) => s(At).delete(T.title), ["prevent", "stop"]), ["space"])
            ]
          }, "✕", 40, mf)) : M("", !0)
        ], 42, cf)
      ], 64))), 128))
    ], 64));
  }
}), yf = {
  id: "gh-hero-cover",
  class: "gh-bili-cover"
}, wf = { key: 0 }, bf = { key: 1 }, kf = {
  key: 2,
  class: "fo-folder-icon"
}, _f = { class: "gh-bili-heading" }, Cf = { class: "gh-hero-title-row" }, xf = ["title"], Lf = ["role", "aria-live"], $f = ["title"], Sf = { id: "gh-hero-desc" }, Tf = { class: "gh-bili-actions" }, If = { class: "gh-batch-btn-text" }, Mf = /* @__PURE__ */ de({
  __name: "GitHubHero",
  emits: ["open-ai-settings"],
  setup(e, { emit: t }) {
    return (o, i) => (l(), d(G, null, [
      n("div", yf, [
        s(St).kind === "all" ? (l(), d("span", wf, "⭐")) : s(St).kind === "uncategorized" ? (l(), d("span", bf, "📄")) : (l(), d("i", kf))
      ]),
      n("div", _f, [
        n("div", Cf, [
          n("h3", {
            id: "gh-hero-title",
            title: s(St).title
          }, v(s(St).title), 9, xf),
          s(Dt).actionText ? (l(), d("div", {
            key: 0,
            class: le(["gh-hero-inline-status", { "is-error": s(Dt).actionError }]),
            role: s(Dt).actionError ? "alert" : "status",
            "aria-live": s(Dt).actionError ? "assertive" : "polite",
            "aria-atomic": "true"
          }, [
            n("span", {
              class: "gh-hero-status-text",
              title: s(Dt).actionText
            }, v(s(Dt).actionText), 9, $f),
            n("button", {
              type: "button",
              title: "关闭提示",
              "aria-label": "关闭状态提示",
              onClick: i[0] || (i[0] = (r) => s(Gn).update({ actionText: "", actionError: !1 }))
            }, "×")
          ], 10, Lf)) : M("", !0)
        ]),
        n("p", Sf, v(s(St).description), 1)
      ]),
      n("div", Tf, [
        n("button", {
          id: "gh-batch-toggle-btn",
          type: "button",
          class: le(["gh-hero-btn gh-batch-toggle-btn", { active: s(St).batchMode }]),
          title: "批量多选操作",
          onClick: i[1] || (i[1] = (r) => s(Co).toggleBatch())
        }, [
          i[4] || (i[4] = n("span", { class: "gh-batch-btn-icon" }, "☑", -1)),
          n("span", If, v(s(St).batchMode ? "返回" : "批量操作"), 1)
        ], 2),
        n("button", {
          id: "gh-refresh-btn",
          type: "button",
          class: "gh-hero-btn",
          title: "只读核对未确认的 Star 状态并刷新列表，不重发远端操作",
          onClick: i[2] || (i[2] = (r) => s(Co).refresh())
        }, "↻ 刷新 / 核对"),
        n("button", {
          id: "gh-hero-add-folder-btn",
          type: "button",
          class: "gh-hero-btn primary",
          title: "在 GitHub 官网上创建新 List",
          onClick: i[3] || (i[3] = (r) => s(Co).createFolder())
        }, "＋ 新建列表")
      ])
    ], 64));
  }
}), Df = /* @__PURE__ */ Ie(Mf, [["__scopeId", "data-v-d116f39c"]]), Q = ke({ repo: "", text: "", baseline: "", busy: !1, message: "", storedValue: null });
function Li(e, t = !1) {
  if (!e || Q.busy) return;
  if (Q.repo && Q.text !== Q.baseline) {
    Q.message = "请先保存或明确取消当前草稿，再编辑或清除其它备注。";
    return;
  }
  const o = it.remarks[e]?.userRemark, i = typeof o == "string" ? o : "";
  Object.assign(Q, {
    repo: e,
    baseline: i,
    text: t ? "" : i,
    storedValue: null,
    message: t ? "清除已准备；点击保存才会清除手写备注，AI 简介不变。" : "仅点击保存或 Enter 才写入；草稿只保留在本页内存。"
  });
}
function Dn() {
  Q.busy || Object.assign(Q, { repo: "", text: "", baseline: "", storedValue: null, message: "" });
}
async function An() {
  if (Q.busy || !Q.repo) return;
  const { repo: e, text: t, baseline: o } = Q;
  Q.busy = !0;
  try {
    await it.updateRepoRemark(e, { userRemark: t.trim() }, o), Object.assign(Q, { repo: "", text: "", baseline: "", storedValue: null, message: `${e} 的备注已保存并回读核对。` });
  } catch (i) {
    Q.message = i instanceof Error ? i.message : "保存未确认，草稿保留，请先读取已保存值核对。";
  } finally {
    Q.busy = !1;
  }
}
async function $i() {
  if (Q.busy || !Q.repo) return;
  const e = Q.repo;
  Q.busy = !0;
  try {
    const o = (await it.reloadRepoRemarks())[e]?.userRemark;
    if (o !== void 0 && typeof o != "string") throw new Error("保存值格式异常，未变更草稿或覆盖基准。");
    Q.storedValue = o ?? "", Q.baseline = o ?? "", Q.message = "已读取保存值，草稿没有替换。请对比下方保存值；再次点击保存将以草稿替换它。";
  } catch (t) {
    Q.message = t instanceof Error ? t.message : "读取失败，草稿保留。";
  } finally {
    Q.busy = !1;
  }
}
const Af = ["disabled"], Ef = ["disabled"], Pf = ["disabled"], Wf = ["disabled"], Of = {
  key: 0,
  style: { width: "100%", "white-space": "pre-wrap", "overflow-wrap": "anywhere" }
}, Si = /* @__PURE__ */ de({
  __name: "GitHubRemarkEditor",
  props: {
    active: { type: Boolean }
  },
  setup(e) {
    const t = e, o = N(null);
    return Ge(() => {
      ft(() => {
        t.active && !Q.busy && o.value?.focus();
      });
    }), (i, r) => (l(), d("div", {
      class: "gh-inline-remark-box",
      style: { "flex-wrap": "wrap", "max-width": "100%" },
      onClick: r[6] || (r[6] = F(() => {
      }, ["stop"]))
    }, [
      Ne(n("input", {
        ref_key: "input",
        ref: o,
        "onUpdate:modelValue": r[0] || (r[0] = (a) => s(Q).text = a),
        class: "gh-inline-remark-input",
        type: "text",
        maxlength: "100",
        "aria-label": "手写仓库备注",
        placeholder: "备注说明…",
        disabled: s(Q).busy || !e.active,
        onKeydown: [
          r[1] || (r[1] = Bt(F((a) => !a.isComposing && e.active && s(An)(), ["prevent"]), ["enter"])),
          r[2] || (r[2] = Bt(F((a) => !a.isComposing && e.active && s(Dn)(), ["prevent", "stop"]), ["esc"]))
        ]
      }, null, 40, Af), [
        [oo, s(Q).text]
      ]),
      n("button", {
        type: "button",
        class: "gh-inline-remark-btn save",
        title: "保存备注",
        disabled: s(Q).busy || !e.active,
        onClick: r[3] || (r[3] = //@ts-ignore
        (...a) => s(An) && s(An)(...a))
      }, "✓", 8, Ef),
      n("button", {
        type: "button",
        class: "gh-inline-remark-btn cancel",
        title: "取消草稿",
        disabled: s(Q).busy || !e.active,
        onClick: r[4] || (r[4] = //@ts-ignore
        (...a) => s(Dn) && s(Dn)(...a))
      }, "✕", 8, Pf),
      n("button", {
        type: "button",
        disabled: s(Q).busy || !e.active,
        onClick: r[5] || (r[5] = //@ts-ignore
        (...a) => s($i) && s($i)(...a))
      }, "读取已保存值", 8, Wf),
      s(Q).storedValue !== null ? (l(), d("p", Of, "已保存值：" + v(s(Q).storedValue || "（空）"), 1)) : M("", !0)
    ]));
  }
}), Bf = {
  key: 0,
  role: "status"
}, Rf = {
  key: 1,
  "aria-label": "未显示仓库的备注草稿"
}, Nf = {
  key: 2,
  class: "gh-search-options",
  style: { margin: "0 0 10px" }
}, Ff = { style: { "font-size": "12px", color: "var(--dim)" } }, Hf = {
  key: 3,
  class: "gh-repos-loading"
}, jf = {
  key: 4,
  class: "muted small",
  style: { "text-align": "center", padding: "40px 0", "font-size": "13px" }
}, zf = ["data-repo-name", "onClick", "onContextmenu", "onDragstart"], Gf = ["onClick"], Kf = { class: "gh-card-head" }, Vf = ["checked", "onChange"], Uf = ["src"], Yf = ["href", "title"], qf = { class: "owner" }, Xf = { class: "gh-card-body" }, Jf = { class: "gh-card-badges" }, Zf = ["title", "onClick"], Qf = ["onClick"], eg = ["title", "onClick"], tg = { class: "gh-badge-remark-text" }, og = {
  key: 0,
  class: "desc gh-desc-analyzing",
  title: "正在使用 AI 分析仓库…"
}, ng = {
  key: 1,
  class: "desc gh-desc-ai",
  title: "AI 中文简介（点击可直接修改，右键可重新分析）"
}, ig = ["title"], sg = {
  key: 3,
  class: "desc dim"
}, rg = { class: "meta" }, ag = { class: "gh-stars" }, lg = {
  key: 0,
  class: "gh-lang"
}, cg = {
  key: 1,
  class: "gh-updated"
}, dg = {
  key: 6,
  class: "gh-pager"
}, ug = ["disabled"], pg = { class: "gh-page-info" }, fg = ["disabled"], gg = ["onClick"], hg = /* @__PURE__ */ de({
  __name: "GitHubRepositories",
  props: {
    active: { type: Boolean, default: !0 }
  },
  setup(e) {
    const t = e, o = ae(() => !!Q.repo && !Ce.cards.some((E) => E.fullName === Q.repo)), i = ke({
      visible: !1,
      x: 0,
      y: 0,
      fullName: "",
      folders: [],
      hasRemark: !1,
      url: ""
    }), r = N(null), a = N(!1);
    function h(E, w) {
      const _ = E.target;
      if (_ instanceof Element) {
        if (Ce.batchMode) {
          if (_.closest(".fo-card-more,.gh-badge-folder,.gh-badge-remark,.gh-inline-remark-box")) return;
          E.preventDefault(), E.stopPropagation(), yt.toggleSelection(w.fullName);
          return;
        }
        _.closest("a,button,.gh-badge-folder,.gh-badge-remark,.fo-card-more,.gh-card-hole,.gh-card-checkbox,.gh-inline-remark-box") || (E.preventDefault(), E.stopPropagation(), er.open(w.fullName, void 0, w));
      }
    }
    function f(E, w) {
      if (!t.active) return;
      E.preventDefault(), E.stopPropagation();
      const _ = 12, D = 160, Y = 280, W = Math.min(window.innerWidth - D - _, Math.max(_, E.clientX)), H = Math.min(window.innerHeight - Y - _, Math.max(_, E.clientY));
      i.x = W, i.y = H, i.fullName = w.fullName, i.folders = [...w.folders || (w.folder ? [w.folder] : [])], i.hasRemark = !!w.customRemark, i.url = w.url, i.visible = !0, r.value = null, a.value = W > window.innerWidth - 380;
    }
    function u(E, w) {
      f(w, E), r.value = "folder";
    }
    function x() {
      i.visible = !1, r.value = null;
    }
    function k(E) {
      i.folders.includes(E) ? i.folders = i.folders.filter((w) => w !== E) : i.folders.push(E), it.toggleRepoList(i.fullName, E);
    }
    function T() {
      i.folders = [], it.clearRepoLists(i.fullName), x();
    }
    function g(E) {
      if (!t.active) return;
      const w = typeof E == "string" ? E : E?.fullName || i.fullName;
      x(), Li(w);
    }
    function p() {
      if (!t.active) return;
      const E = i.fullName;
      x(), Li(E, !0);
    }
    async function c() {
      const E = i.url;
      if (x(), E && t.active)
        try {
          await navigator.clipboard.writeText(E);
        } catch {
        }
    }
    function y(E) {
      const w = it.findRepository(i.fullName);
      x(), w && Ks.sendGitHubShare({
        fullName: w.full_name,
        name: w.name,
        owner: w.owner?.login,
        ownerAvatar: w.owner?.avatar_url,
        desc: w.description || void 0,
        language: w.language || void 0,
        stars: w.stargazers_count,
        category: i.folders && i.folders.length ? i.folders.join(", ") : "未分类",
        url: w.html_url || `https://github.com/${w.full_name}`,
        updatedAt: w.updated_at ? w.updated_at.split("T")[0] : void 0
      }, E);
    }
    function $() {
      i.url && window.open(i.url, "_blank", "noreferrer"), x();
    }
    async function b() {
      const E = it.findRepository(i.fullName);
      if (!E) {
        x();
        return;
      }
      x(), await it.confirmUnstarRepository(E);
    }
    function L(E) {
      const w = E.target;
      w?.closest(".gh-repo-context-menu") || w?.closest(".gh-inline-remark-box") || x();
    }
    function A(E) {
      E.key === "Escape" && i.visible && x();
    }
    Ue(() => t.active, (E) => {
      window.removeEventListener("pointerdown", L), window.removeEventListener("keydown", A), x(), E && (window.addEventListener("pointerdown", L), window.addEventListener("keydown", A));
    }, { immediate: !0 }), $t(() => {
      window.removeEventListener("pointerdown", L), window.removeEventListener("keydown", A);
    });
    function ee(E, w) {
      const _ = E.target;
      if (_ instanceof Element && _.closest("button,a,input,textarea,select,[contenteditable='true']")) {
        E.preventDefault();
        return;
      }
      yt.startDrag(w, E);
    }
    const ne = ae(() => {
      if (Ce.cards.length > 0) return !1;
      const E = Dt.actionText || "";
      return !!(E.includes("正在读取") || E.includes("正在加载") || E.includes("正在统计") || E.includes("正在同步"));
    });
    return (E, w) => (l(), d(G, null, [
      s(Q).message ? (l(), d("p", Bf, v(s(Q).repo ? `${s(Q).repo}：` : "") + v(s(Q).message), 1)) : M("", !0),
      o.value ? (l(), d("section", Rf, [
        n("p", null, "备注草稿：" + v(s(Q).repo) + "（仓库不在当前列表中，草稿仍保留）", 1),
        q(Si, {
          active: t.active
        }, null, 8, ["active"])
      ])) : M("", !0),
      s(Ce).searchMessage ? (l(), d("div", Nf, [
        n("span", Ff, v(s(Ce).searchMessage), 1),
        n("button", {
          type: "button",
          class: "gh-tab",
          style: { padding: "2px 8px", "font-size": "11px", "margin-left": "8px" },
          onClick: w[0] || (w[0] = (_) => s(yt).resetSearch())
        }, "清空搜索")
      ])) : M("", !0),
      ne.value ? (l(), d("div", Hf, [...w[16] || (w[16] = [
        n("div", {
          class: "gh-spinner",
          "aria-hidden": "true"
        }, null, -1),
        n("span", { class: "gh-loading-label" }, "正在读取 GitHub 仓库列表中…", -1)
      ])])) : s(Ce).emptyMessage ? (l(), d("p", jf, v(s(Ce).emptyMessage), 1)) : M("", !0),
      s(Ce).cards.length ? (l(), d("div", {
        key: 5,
        class: le(["repos gh-grid", { "gh-batch-active": s(Ce).batchMode }])
      }, [
        (l(!0), d(G, null, fe(s(Ce).cards, (_) => (l(), d("article", {
          key: _.fullName,
          class: le(["repo gh-card", { selected: _.selected }]),
          "data-repo-name": _.fullName,
          draggable: "true",
          onClick: (D) => h(D, _),
          onContextmenu: (D) => f(D, _),
          onDragstart: (D) => ee(D, _.fullName)
        }, [
          n("button", {
            class: "fo-card-more",
            type: "button",
            "aria-label": "更多操作",
            title: "更多操作",
            onClick: F((D) => f(D, _), ["stop"])
          }, "⋮", 8, Gf),
          n("div", Kf, [
            n("label", {
              class: "gh-card-hole",
              title: "点击勾选此仓库",
              onClick: w[1] || (w[1] = F(() => {
              }, ["stop"]))
            }, [
              n("input", {
                class: "gh-card-checkbox",
                type: "checkbox",
                checked: _.selected,
                onChange: (D) => s(yt).setSelection(_.fullName, D.target.checked)
              }, null, 40, Vf),
              w[17] || (w[17] = n("span", { class: "gh-hole-inner" }, null, -1))
            ]),
            n("img", {
              class: "gh-owner-avatar",
              src: _.avatarUrl || "assets/github-star.svg",
              alt: "",
              loading: "lazy",
              referrerpolicy: "no-referrer",
              onError: w[2] || (w[2] = (D) => D.target.src = "assets/github-star.svg")
            }, null, 40, Uf),
            n("a", {
              href: _.url,
              target: "_blank",
              rel: "noreferrer",
              class: "name",
              title: _.fullName
            }, [
              n("span", qf, v(_.owner) + "/", 1),
              Fe(v(_.name), 1)
            ], 8, Yf)
          ]),
          n("div", Xf, [
            n("div", Jf, [
              _.folders && _.folders.length ? (l(!0), d(G, { key: 0 }, fe(_.folders, (D) => (l(), d("span", {
                key: D,
                class: "gh-badge-folder",
                title: `GitHub 列表：${D}（点击管理所属列表）`,
                onClick: F((Y) => u(_, Y), ["stop"])
              }, " 📁 " + v(D), 9, Zf))), 128)) : (l(), d("span", {
                key: 1,
                class: "gh-badge-folder uncat",
                title: "未分类（点击加入 GitHub 列表）",
                onClick: F((D) => u(_, D), ["stop"])
              }, " ＋ 未分类 ", 8, Qf)),
              s(Q).repo === _.fullName ? (l(), ce(Si, {
                key: 2,
                active: t.active
              }, null, 8, ["active"])) : _.customRemark ? (l(), d("span", {
                key: 3,
                class: "gh-badge-remark",
                title: `备注：${_.customRemark}（点击就地修改）`,
                onClick: F((D) => g(_), ["stop"])
              }, [
                w[18] || (w[18] = n("span", { class: "gh-badge-remark-icon" }, "💬", -1)),
                n("span", tg, v(_.customRemark), 1)
              ], 8, eg)) : M("", !0)
            ]),
            _.descriptionKind === "analyzing" ? (l(), d("p", og, [...w[19] || (w[19] = [
              n("span", { class: "gh-ai-sparkle" }, "✨", -1),
              Fe(" 正在使用 AI 分析仓库并提炼中文介绍…", -1)
            ])])) : _.descriptionKind === "ai" ? (l(), d("p", ng, [
              w[20] || (w[20] = n("span", { class: "gh-ai-tag-flag" }, "🤖", -1)),
              Fe(v(_.description), 1)
            ])) : _.descriptionKind === "plain" ? (l(), d("p", {
              key: 2,
              class: "desc",
              title: _.description
            }, v(_.description), 9, ig)) : (l(), d("p", sg, "暂无描述"))
          ]),
          n("div", rg, [
            n("span", ag, "★ " + v(_.stars), 1),
            _.language ? (l(), d("span", lg, v(_.language), 1)) : M("", !0),
            _.updated ? (l(), d("span", cg, "更新 " + v(_.updated), 1)) : M("", !0)
          ])
        ], 42, zf))), 128))
      ], 2)) : M("", !0),
      s(Ce).totalPages > 1 ? (l(), d("div", dg, [
        n("button", {
          class: "gh-page-btn",
          type: "button",
          disabled: s(Ce).page <= 1,
          onClick: w[3] || (w[3] = (_) => s(yt).changePage(s(Ce).page - 1))
        }, "‹ 上一页", 8, ug),
        n("span", pg, v(s(Ce).page) + " / " + v(s(Ce).totalPages) + " · 共 " + v(s(Ce).totalItems) + " 个" + v(s(Ce).serverPaged ? ` · 已加载 ${s(Ce).loadedItems}` : ""), 1),
        n("button", {
          class: "gh-page-btn",
          type: "button",
          disabled: s(Ce).page >= s(Ce).totalPages,
          onClick: w[4] || (w[4] = (_) => s(yt).changePage(s(Ce).page + 1))
        }, "下一页 ›", 8, fg)
      ])) : M("", !0),
      (l(), ce(gt, { to: "body" }, [
        t.active && i.visible ? (l(), d("div", {
          key: 0,
          class: "fo-cover-context-menu gh-repo-context-menu",
          style: ye({ left: `${i.x}px`, top: `${i.y}px` }),
          onClick: w[14] || (w[14] = F(() => {
          }, ["stop"])),
          onContextmenu: w[15] || (w[15] = F(() => {
          }, ["prevent"]))
        }, [
          n("div", {
            class: le(["gh-menu-has-sub", { "is-active": r.value === "folder" }]),
            onMouseenter: w[6] || (w[6] = (_) => r.value = "folder")
          }, [
            w[21] || (w[21] = n("button", {
              class: "fo-cover-menu-item with-sub-arrow",
              type: "button"
            }, [
              n("span", null, "📁 所属 GitHub 列表"),
              n("span", { class: "sub-arrow" }, "›")
            ], -1)),
            n("div", {
              class: le(["gh-sub-flyout", { "flyout-left": a.value }]),
              onClick: w[5] || (w[5] = F(() => {
              }, ["stop"]))
            }, [
              n("button", {
                class: le(["fo-cover-menu-item", { primary: i.folders.length === 0 }]),
                type: "button",
                onClick: T
              }, v(i.folders.length === 0 ? "✓ " : "  ") + "＋ 设为未分类（清空列表） ", 3),
              (l(!0), d(G, null, fe(s(it).cats, (_) => (l(), d("button", {
                key: _,
                class: le(["fo-cover-menu-item", { primary: i.folders.includes(_) }]),
                type: "button",
                onClick: (D) => k(_)
              }, v(i.folders.includes(_) ? "✓ " : "  ") + "📁 " + v(_), 11, gg))), 128))
            ], 2)
          ], 34),
          n("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: w[7] || (w[7] = (_) => r.value = null),
            onClick: w[8] || (w[8] = (_) => g())
          }, " ✏️ 编辑备注… ", 32),
          q(Lr, {
            label: "💬 发送到聊天室",
            visible: i.visible,
            onOpen: w[9] || (w[9] = (_) => r.value = null),
            onSelect: y
          }, null, 8, ["visible"]),
          i.hasRemark ? (l(), d("button", {
            key: 0,
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: w[10] || (w[10] = (_) => r.value = null),
            onClick: p
          }, " 🗑️ 清除备注 ", 32)) : M("", !0),
          n("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: w[11] || (w[11] = (_) => r.value = null),
            onClick: c
          }, " 📋 复制仓库链接 ", 32),
          n("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: w[12] || (w[12] = (_) => r.value = null),
            onClick: $
          }, " ↗ 在 GitHub 打开 ", 32),
          n("button", {
            class: "fo-cover-menu-item danger",
            type: "button",
            onMouseenter: w[13] || (w[13] = (_) => r.value = null),
            onClick: b
          }, " ⭐ 取消 Star ", 32)
        ], 36)) : M("", !0)
      ]))
    ], 64));
  }
}), mg = /* @__PURE__ */ Ie(hg, [["__scopeId", "data-v-048d3839"]]), vg = { class: "gh-batch-bar-left" }, yg = { class: "gh-batch-count-tip" }, wg = { id: "gh-batch-selected-count" }, bg = {
  key: 0,
  "aria-label": "批量归属列表确认"
}, kg = ["disabled"], _g = ["value"], Cg = ["disabled"], xg = ["disabled"], Lg = { class: "gh-batch-bar-right" }, $g = ["disabled"], Sg = ["disabled"], Tg = ["disabled"], Ig = /* @__PURE__ */ de({
  __name: "GitHubBatchBar",
  props: {
    active: { type: Boolean, default: !0 }
  },
  setup(e) {
    const t = e, o = Bs(), i = N(null);
    function r() {
      t.active && (o.value = it.prepareBatchMove(), i.value = null);
    }
    async function a() {
      const h = o.value, f = i.value;
      if (!t.active || !h || f === null || wt.busy) return;
      await h.submit(f) && o.value === h && (o.value = void 0);
    }
    return Ue(() => t.active && Ht.active, (h) => {
      h || (o.value = void 0);
    }), (h, f) => (l(), d(G, null, [
      n("div", vg, [
        n("button", {
          type: "button",
          class: "gh-batch-action-btn",
          id: "gh-batch-select-all-btn",
          onClick: f[0] || (f[0] = (u) => s(xo).toggleSelectAll())
        }, v(s(Ht).allSelected ? "取消全选" : "全选"), 1),
        n("span", yg, [
          f[5] || (f[5] = Fe("已选择 ", -1)),
          n("b", wg, v(s(Ht).selectedCount), 1),
          f[6] || (f[6] = Fe(" 项", -1))
        ])
      ]),
      o.value ? (l(), d("section", bg, [
        n("p", null, "仅操作打开选择器时的 " + v(o.value.names.length) + " 个仓库；后来勾选的仓库不加入。", 1),
        n("details", null, [
          f[7] || (f[7] = n("summary", null, "查看本次仓库清单", -1)),
          n("ul", null, [
            (l(!0), d(G, null, fe(o.value.names, (u) => (l(), d("li", { key: u }, v(u), 1))), 128))
          ])
        ]),
        Ne(n("select", {
          "onUpdate:modelValue": f[1] || (f[1] = (u) => i.value = u),
          "aria-label": "目标列表",
          disabled: s(wt).busy
        }, [
          f[8] || (f[8] = n("option", {
            value: null,
            disabled: ""
          }, "请选择目标列表", -1)),
          f[9] || (f[9] = n("option", { value: "" }, "未分类（清空所选仓库的所有列表所属）", -1)),
          (l(!0), d(G, null, fe(s(bo).folders.filter((u) => u.kind === "custom"), (u) => (l(), d("option", {
            key: u.title,
            value: u.title
          }, v(u.title), 9, _g))), 128))
        ], 8, kg), [
          [Ii, i.value]
        ]),
        n("button", {
          type: "button",
          disabled: !t.active || s(wt).busy || i.value === null,
          onClick: a
        }, "确认加入列表", 8, Cg),
        n("button", {
          type: "button",
          disabled: s(wt).busy,
          onClick: f[2] || (f[2] = (u) => o.value = void 0)
        }, "取消", 8, xg)
      ])) : M("", !0),
      n("div", Lg, [
        n("button", {
          type: "button",
          class: "gh-batch-action-btn",
          id: "gh-batch-move-btn",
          disabled: !t.active || s(wt).busy || s(Ht).selectedCount === 0,
          title: "固定当前选择，批量加入所选 GitHub 列表",
          onClick: r
        }, " 📁 归入 GitHub 列表 ", 8, $g),
        n("button", {
          type: "button",
          class: "gh-batch-action-btn",
          id: "gh-batch-ai-btn",
          disabled: s(Ht).selectedCount === 0,
          title: "批量使用 AI 生成中文介绍",
          onClick: f[3] || (f[3] = (u) => s(xo).analyzeAi())
        }, " ✨ 批量 AI 分析 ", 8, Sg),
        n("button", {
          type: "button",
          class: "gh-batch-action-btn danger",
          id: "gh-batch-unstar-btn",
          disabled: s(Ht).selectedCount === 0,
          title: "从 GitHub 批量取消 Star 收藏",
          onClick: f[4] || (f[4] = (u) => s(xo).unstar())
        }, " 🗑 取消收藏 ", 8, Tg)
      ])
    ], 64));
  }
}), Mg = z(() => import("./GitHubWorkspaceCard-C4AKuJTs.js")), Dg = z(() => import("./NotificationCenter-C6l3FVBR.js")), Ag = z(() => import("./TabManagerPanel-BczdOoT4.js")), Eg = z(() => import("./BookmarkNoteMenu-C9OAO2ZF.js")), Pg = z(() => import("./BookmarkPanel-CkbynGXf.js")), Wg = z(() => import("./LauncherDialogs-dn7nFBhV.js")), Og = z(() => import("./SettingsDialog-C5_R5gC1.js")), Bg = z(() => import("./SettingsView-C0oItxxm.js")), Rg = z(() => import("./ClockSettingsMenu-Ds70QD54.js")), Ng = z(() => import("./BiliTheaterDialog-BmiZXrz5.js")), Fg = z(() => import("./BiliMiniPlayer-BW_sk0HX.js")), Hg = z(() => import("./BiliMessagePanel-Dxoa_W9w.js")), jg = z(() => import("./ModelPricingCard-3feL6585.js")), zg = z(() => import("./BilibiliWorkspace-CyzULSXk.js")), Gg = z(() => import("./YouTubeCard-BsK8lgXU.js").then((e) => e.Y)), Kg = z(() => import("./AihotFeed-cLsnYu9g.js")), Vg = z(() => import("./GitHubTrending-Dzbxfpl0.js")), Ug = z(() => import("./AiDialog-AT8LHt4a.js")), Yg = z(() => import("./AihotViewer-BEdldf2-.js")), qg = z(() => import("./NavWheelOverlay-g6MgFcxv.js")), Xg = z(() => import("./StandaloneHost-ChGhhWfr.js")), Jg = z(() => import("./LauncherFolderDialog-svWeXtrd.js")), Zg = z(() => import("./LauncherMenus-C5EglRvz.js"));
function ie(e, t, o, i) {
  t.spaOwned && document.getElementById("vue-spa-root") || t.id !== "github-workspace" && t.id.startsWith("github-") && document.getElementById("vue-github-workspace-root") || e.register({
    id: t.id,
    title: t.title,
    order: t.order,
    eager: !0,
    roots: [t.root],
    capabilities: t.capabilities,
    mount: ({ getRoot: r }) => {
      const a = r(t.root);
      if (!a) return;
      if (document.getElementById("vue-spa-root") && t.id !== "spa-app")
        return i?.setMounted?.(!0), () => {
          i?.setMounted?.(!1);
        };
      const h = a.innerHTML, f = Hn(o);
      f.config.errorHandler = (u, x, k) => {
        console.error(`LogicWeaver Vue feature failed: ${t.id} (${k})`, u), a.dataset.vueError = "1";
      };
      try {
        f.mount(a), i?.setMounted?.(!0);
      } catch (u) {
        throw i?.setMounted?.(!1), a.innerHTML = h, u;
      }
      return () => {
        i?.setMounted?.(!1), f.unmount();
      };
    }
  });
}
function Qg(e) {
  e.register({
    id: "intro",
    title: "启动动画",
    order: 10,
    eager: !0,
    roots: ["endfield-loader"],
    capabilities: ["ui:intro", "boot:progress"],
    mount: () => {
      const t = document.getElementById("endfield-loader");
      if (!at.enabled) {
        t?.remove(), document.body.classList.remove("is-starting");
        return;
      }
      if (!t) return;
      const o = Hn(Jp);
      let i = !1;
      const r = () => {
        e.stop("intro");
      };
      window.addEventListener("logicweaver:intro-complete", r, { once: !0 }), o.mount(t);
      const a = window.setTimeout(() => {
        at.finish("基础界面已就绪，在线服务继续后台加载", !0), window.setTimeout(() => {
          i || (r(), t?.remove(), document.body.classList.remove("is-starting"));
        }, 600);
      }, 8e3);
      return () => {
        i || (i = !0, clearTimeout(a), window.removeEventListener("logicweaver:intro-complete", r), o.unmount(), t.remove(), document.body.classList.remove("is-starting"));
      };
    }
  }), ie(e, { id: "spa-app", title: "纯血 SPA 单根调度器", order: 15, root: "vue-spa-root", capabilities: ["ui:spa-root", "workspace:keepalive"] }, jp), document.getElementById("vue-spa-root") || ie(e, { id: "bili-companions", title: "b站伴随窗口", order: 19, root: "vue-bili-companions-root", capabilities: ["ui:dock-companion"] }, Xg), ie(e, { id: "notifications", title: "通知中心", order: 20, root: "vue-notification-root", capabilities: ["ui:toast", "notification:dedupe"] }, as), ie(e, { id: "profile-menu", title: "头像右键菜单", order: 21, root: "bili-profile-menu", capabilities: ["ui:profile-menu", "profile:actions"] }, Zp, Io), ie(e, { id: "workspace-launchers", title: "常用工作区启动项", order: 22, root: "workspace-launchers", capabilities: ["ui:workspace-launchers", "workspace:launch"] }, Qp, Un), ie(e, { id: "mac-dock", title: "底部快捷应用 Dock 栏", order: 23, root: "mac-dock", capabilities: ["ui:mac-dock", "dock:navigate"] }, rs, dt), ie(e, { id: "hero-clock", title: "首屏中央时钟", order: 26, root: "hero-clock", capabilities: ["ui:hero-clock", "clock:read"] }, ns), ie(e, { id: "search-box", title: "首屏搜索框", order: 27, root: "search", capabilities: ["ui:search-box", "search:actions"] }, Ti), ie(e, { id: "home-music", title: "首屏音乐播放器", order: 28, root: "task-thread-home", capabilities: ["ui:home-music", "music:playback"] }, is, Ve), ie(e, { id: "launcher-groups", title: "常用网站分组架", order: 29, root: "launcher-groups", capabilities: ["ui:launcher-groups", "launcher:navigate"] }, ss, Te), ie(e, { id: "weather-widget", title: "首屏天气小部件", order: 39, root: "weather-body", capabilities: ["ui:weather-widget", "weather:read"] }, os), ie(e, { id: "github-workspace", title: "GitHub 独立页 Vue 工作台", order: 49, root: "vue-github-workspace-root", capabilities: ["ui:github-workspace"] }, Mg), ie(e, { id: "github-status", title: "GitHub 同步状态", order: 50, root: "vue-github-status-root", capabilities: ["ui:github-status", "github:sync-read"] }, sf, Gn), ie(e, { id: "github-folders", title: "GitHub 文件夹导航", order: 55, root: "gh-folder-list", capabilities: ["ui:github-folders", "github:categorize-drop"] }, vf, At), ie(e, { id: "github-hero", title: "GitHub 分类摘要", order: 56, root: "gh-hero", capabilities: ["ui:github-summary", "github:actions"] }, Df, Co), ie(e, { id: "github-repositories", title: "GitHub 仓库列表", order: 57, root: "vue-github-repositories-root", capabilities: ["ui:github-repositories", "github:repository-actions", "github:paging"] }, mg, yt), ie(e, { id: "github-batch-bar", title: "GitHub Star 批量操作工具栏", order: 58, root: "gh-batch-bar", capabilities: ["ui:github-batch-bar", "github:batch-actions"] }, Ig, xo), ie(e, { id: "notification-center", spaOwned: !0, title: "持久通知中心", order: 71, root: "vue-notification-center-root", capabilities: ["ui:notification-history", "notification:read"] }, Dg, xt), ie(e, { id: "tab-manager", spaOwned: !0, title: "独立标签页管理", order: 71, root: "vue-tab-manager-root", capabilities: ["ui:tab-manager", "tabs:explicit"] }, Ag, Vi), ie(e, { id: "bookmark-menu", title: "书签上下文操作与备注菜单", order: 72, root: "vue-bookmark-menu-root", capabilities: ["ui:bookmark-menu", "bookmark:edit"] }, Eg, zn), ie(e, { id: "launcher-dialogs", title: "快捷启动器管理弹窗族", order: 73, root: "vue-launcher-dialogs-root", capabilities: ["ui:launcher-dialogs", "launcher:manage"] }, Wg, Lo), ie(e, { id: "launcher-folder-dialog", title: "大文件夹展开视窗", order: 74, root: "vue-launcher-folder-root", capabilities: ["ui:launcher-folder", "launcher:folder-dialog"] }, Jg, kt), ie(e, { id: "launcher-menus", title: "启动器快捷上下文菜单族", order: 76, root: "vue-launcher-menus-root", capabilities: ["ui:launcher-menus", "launcher:context-menu"] }, Zg, eo), ie(e, { id: "bookmark-panel", title: "浏览器书签侧边滑动视窗", order: 77, root: "vue-bookmark-panel-root", capabilities: ["ui:bookmark-panel", "bookmarks:panel"] }, Pg, on), ie(e, { id: "bookmark-folder-strip", spaOwned: !0, title: "顶栏书签快捷文件夹横条", order: 78, root: "vue-bookmark-folder-strip-root", capabilities: ["ui:bookmark-folder-strip", "bookmarks:strip"] }, null, Jo), ie(e, { id: "settings-page", title: "独立设置页 Vue 工作台", order: 79, root: "vue-options-root", capabilities: ["ui:settings-page"] }, Bg), ie(e, { id: "settings-dialog", title: "全局设置中心视窗", order: 80, root: "vue-settings-dialog-root", capabilities: ["ui:settings-dialog", "settings:manage"] }, Og, nn), ie(e, { id: "clock-settings-menu", spaOwned: !0, title: "中央时钟偏好配置菜单", order: 82, root: "vue-clock-settings-root", capabilities: ["ui:clock-settings", "clock:preference-edit"] }, Rg, Wt), ie(e, { id: "bili-theater-dialog", title: "Bilibili 沉浸剧场与评论区弹窗", order: 85, root: "vue-bili-theater-root", capabilities: ["ui:bili-theater", "bili:playback"] }, Ng, $o), ie(e, { id: "bili-mini-player", title: "Bilibili 悬浮迷你播放器", order: 85, root: "vue-bili-mini-player-root", capabilities: ["ui:bili-mini-player", "bili:playback"] }, Fg), ie(e, { id: "ai-dialog", title: "AI 助手对话框与知识点抽屉", order: 86, root: "vue-ai-dialog-root", capabilities: ["ui:ai-dialog", "ai:chat"] }, Ug, Yn), ie(e, { id: "aihot-viewer", spaOwned: !0, title: "AI HOT 资讯文章阅读器", order: 88, root: "vue-aihot-viewer-root", capabilities: ["ui:aihot-viewer", "viewer:aihot"] }, Yg, Vn), ie(e, { id: "nav-wheel", title: "辐射状快捷动作轮盘与悬浮球", order: 95, root: "vue-nav-wheel-root", capabilities: ["ui:nav-wheel", "nav:radial-menu"] }, qg, Le), ie(e, { id: "bili-message-panel", spaOwned: !0, title: "Bilibili 消息与互动通知中心", order: 102, root: "vue-bili-message-panel-root", capabilities: ["ui:bili-message-panel", "bili:messages"] }, Hg, Et), ie(e, { id: "pricing-radar", spaOwned: !0, title: "模型插件 (AI 定价与排行榜)", order: 108, root: "vue-pricing-root", capabilities: ["ui:pricing-radar", "pricing:read"] }, jg, Ni), ie(e, { id: "bili-favorites", spaOwned: !0, title: "b站插件 Vue 外壳", order: 110, root: "vue-bili-favorites-root", capabilities: ["ui:bili-favorites-shell", "bilibili:favorites"] }, zg, Bi), ie(e, { id: "youtube-card", spaOwned: !0, title: "YouTube 订阅与探索工作台", order: 111, root: "vue-youtube-root", capabilities: ["ui:youtube-card", "youtube:updates"] }, Gg, Pi), ie(e, { id: "aihot-feed", spaOwned: !0, title: "AI HOT 资讯流全功能聚合看板", order: 112, root: "vue-aihot-root", capabilities: ["ui:aihot-feed", "aihot:aggregate"] }, Kg, Ri), ie(e, { id: "github-trending", spaOwned: !0, title: "GitHub 趋势榜与热门流", order: 114, root: "vue-github-trending-root", capabilities: ["ui:github-trending", "github:trending"] }, Vg, Ui);
}
Es();
const an = Ir(sn);
oa(sn, an);
na(sn);
Qg(an);
jn.loadBookmarks();
(async () => {
  document.getElementById("vue-bili-favorites-root") && !document.getElementById("vue-spa-root") && await import("./bilibili-channel.service-s27leWHe.js"), await Er(), await an.startEager(), at.notifyBootReady();
})().catch((e) => console.error("[LogicWeaver] 页面启动失败", e));
window.addEventListener("pagehide", () => {
  an.stopAll();
}, { once: !0 });
export {
  ri as C,
  Uu as D,
  mg as G,
  ki as L,
  ld as T,
  vf as _,
  Ig as a,
  Df as b,
  sf as c,
  Vi as d,
  Wt as e,
  ai as f,
  Ui as g,
  bh as h,
  we as i,
  Yn as j,
  Le as k,
  Je as l,
  tn as m,
  Z as n,
  Jp as o,
  dd as p,
  ud as q,
  cd as r,
  Qp as s,
  Ko as t,
  Zp as u,
  ts as v,
  Nn as w,
  Pe as x,
  es as y,
  sn as z
};
