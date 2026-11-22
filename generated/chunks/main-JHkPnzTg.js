import { l as gi, a as xe, b as hn, c as fn, d as Ci, e as ae, f as pt, S as gn, u as Oe, s as ys, g as vs, h as qt, i as bs } from "./drawer-store-Bgl7wnLO.js";
import { t as d, c as ot, o as mn, _ as Re, i as Li, e as ks } from "./_plugin-vue_export-helper-DtNgUcga.js";
/* empty css                */
import { c as Si, r as ue, a as At, w as it, b as X, d as he, o as Ke, e as kt, f as c, g as w, u as s, t as u, F as ee, h as n, i as be, j as W, k as U, n as ke, l as ne, T as Et, m as at, p as It, v as Vo, q as se, s as re, x as gt, y as no, z as mi, A as lo, B as Q, C as Ro, D as F, E as Ee, G as uo, H as wn, I as _s, J as xs, K as Cs } from "./vendor-vue-_upDT3S_.js";
import { n as de, a as mo } from "./store-BodPoZPS.js";
import { g as yn, a as vn, b as bn, c as vt, d as so, s as Xo, e as Oi, f as Ls, h as Ss, i as Ve, j as Ue, k as fe, l as Ts, m as $s, n as Wt, o as Xt, p as Ms } from "./github.service-CyBcxOSX.js";
import { n as co, l as Me, b as Ko, a as kn, s as Is, c as As, m as ft, d as Ti, e as _n, f as mt, g as Es, h as Ri, i as xn, j as Bt, k as wo, o as Ds, r as Ps } from "./search.service-I5ZPPxGy.js";
import { h as tt, i as Ws, a as te } from "./store-DnPgWHLm.js";
import { c as Ns, a as Os, t as Rs, b as Bs, d as Hs, e as Fs, f as Ht, g as js } from "./calendar.service-l2hESSGs.js";
import { W as Bo, b as Vs } from "./wallpaper.service-Bv45Nhfa.js";
import { w as Ce, s as $i, P as Ks, i as Ho, D as Jo, a as Bi, g as je, p as zs, L as Gs, b as _t, c as Us, d as Qo, t as Hi, e as Ys, f as qs, h as St, l as Cn } from "./window-manager.store-D2fEf4ic.js";
import { s as po } from "./store-tFNiieYG.js";
import { b as ro, a as Ln, c as Xs, d as Js } from "./up-group-manager-store-sHkUiUZ4.js";
import { b as Fi } from "./bilibili.service-Brip_1AT.js";
import { biliMiniPlayerController as Io, biliMiniPlayerState as Qs } from "./mini-player-store-mh4dZhnt.js";
import { biliMessagePanelController as Lt, biliMessagePanelState as Zs } from "./message-panel-store-B5uQTbg4.js";
import { r as er, a as Jt } from "./radio-player-DI0qcwfC.js";
import { s as tr, a as or } from "./stickers.service-BwfsLlup.js";
import { a as Mi, b as ir } from "./store-CVDmnbEi.js";
import { w as xt, h as nr, r as wi } from "./storage-repo-CeKQXDMh.js";
import { a as Sn, b as sr } from "./aihot.service-PIUO0HmZ.js";
import { g as Tn, T as rr, i as ar, a as lr, b as cr, c as dr, G as ur, d as pr } from "./github-task-modal-store-miYA1g6t.js";
import { fullscreenCardsController as Tt } from "./fullscreen-cards.store-CjKJLz-g.js";
import { k as hr, m as fr } from "./core-utils-KTt-RZby.js";
import { s as gr } from "./runtime-protocol-C_r09aKr.js";
import { L as ji, a as Vi } from "./LauncherTileContent-CmFcZvhQ.js";
import { u as mr } from "./InlineEditStatus.vue_vue_type_style_index_0_scoped_c63d0c6d_lang-D41c1nko.js";
import { e as wr, C as yr } from "./CustomSelect-DO3yQybc.js";
const vr = /^[a-z][a-z0-9]*(?:[.:-][a-z0-9]+)*$/;
function br() {
  const e = /* @__PURE__ */ new Map(), t = /* @__PURE__ */ new Map();
  function o(a) {
    if (!a || !vr.test(a.id)) throw new TypeError(`Invalid command id: ${a?.id || ""}`);
    if (!a.title?.trim() || !a.category?.trim() || typeof a.run != "function")
      throw new TypeError(`Command ${a.id} requires title, category and run()`);
    if (e.has(a.id)) throw new Error(`Command already registered: ${a.id}`);
    return e.set(a.id, Object.freeze({
      ...a,
      description: a.description || "",
      keywords: Object.freeze([...a.keywords || []]),
      concurrency: a.concurrency || "replace"
    })), () => {
      i(a.id), e.delete(a.id);
    };
  }
  function i(a) {
    const x = t.get(a);
    return x ? (x.abort(), t.delete(a), !0) : !1;
  }
  async function r(a, x, I = "api") {
    const A = e.get(a);
    if (!A) throw new Error(`Unknown command: ${a}`);
    if (A.enabled && !A.enabled()) return;
    const f = A.concurrency || "replace";
    if (t.has(a)) {
      if (f === "drop") return;
      f === "replace" && i(a);
    }
    const T = new AbortController();
    f !== "parallel" && t.set(a, T);
    try {
      return await A.run(x, { signal: T.signal, source: I });
    } finally {
      t.get(a) === T && t.delete(a);
    }
  }
  function l(a) {
    return Object.freeze({
      id: a.id,
      title: a.title,
      category: a.category,
      description: a.description || "",
      keywords: Object.freeze([...a.keywords || []]),
      concurrency: a.concurrency || "replace",
      enabled: a.enabled ? !!a.enabled() : !0,
      running: t.has(a.id)
    });
  }
  function m() {
    return Object.freeze([...e.values()].map(l).sort((a, x) => a.category.localeCompare(x.category, "zh") || a.title.localeCompare(x.title, "zh")));
  }
  function v(a, x = 20) {
    const I = String(a || "").trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
    if (!I.length) return m().slice(0, x);
    const A = [...e.values()].map((f) => {
      const T = l(f), g = T.title.toLocaleLowerCase(), p = `${T.id} ${g} ${T.category} ${T.description} ${T.keywords.join(" ")}`.toLocaleLowerCase();
      if (!I.every((C) => p.includes(C))) return null;
      let b = 0;
      for (const C of I)
        T.id === C ? b += 200 : T.id.startsWith(C) && (b += 120), g === C ? b += 160 : g.startsWith(C) ? b += 100 : g.includes(C) && (b += 60), T.keywords.some((D) => D.toLocaleLowerCase().startsWith(C)) && (b += 40);
      return { item: T, score: b };
    }).filter((f) => !!f);
    return A.sort((f, T) => T.score - f.score || f.item.title.localeCompare(T.item.title, "zh")), Object.freeze(A.slice(0, Math.max(1, x)).map((f) => f.item));
  }
  return Object.freeze({ register: o, execute: r, cancel: i, has: (a) => e.has(a), list: m, search: v });
}
const zo = br(), kr = /^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/;
function _r(e) {
  const t = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
  function l(f) {
    if (!f || !kr.test(f.id)) throw new TypeError(`Invalid feature id: ${f?.id || ""}`);
    if (!f.title?.trim() || typeof f.mount != "function") throw new TypeError(`Feature ${f.id} requires title and mount()`);
    if (t.has(f.id)) throw new Error(`Feature already registered: ${f.id}`);
    return t.set(f.id, Object.freeze({
      ...f,
      order: Number(f.order) || 100,
      eager: f.eager === !0,
      roots: Object.freeze([...f.roots || []]),
      capabilities: Object.freeze([...f.capabilities || []])
    })), () => {
      a(f.id), r.delete(f.id), t.delete(f.id);
    };
  }
  function m(f) {
    return typeof f == "function" ? f : f && typeof f.unmount == "function" ? () => f.unmount() : () => {
    };
  }
  function v(f) {
    if (o.has(f)) return Promise.resolve(o.get(f)?.cleanup);
    if (i.has(f)) return i.get(f);
    const T = t.get(f);
    if (!T) return Promise.reject(new Error(`Unknown feature: ${f}`));
    r.delete(f);
    const g = new AbortController(), p = Object.freeze({
      signal: g.signal,
      commands: e,
      getRoot: (C) => document.getElementById(C)
    }), b = Promise.resolve().then(() => T.mount(p)).then((C) => (i.delete(f), o.set(f, { cleanup: C, controller: g }), C), (C) => {
      throw i.delete(f), r.set(f, C), g.abort(), C;
    });
    return i.set(f, b), b;
  }
  async function a(f) {
    const T = i.get(f);
    if (T)
      try {
        await T;
      } catch {
        return;
      }
    const g = o.get(f);
    g && (o.delete(f), g.controller.abort(), await m(g.cleanup)());
  }
  async function x() {
    const f = typeof document < "u" && !!(document.getElementById("vue-spa-root") || document.getElementById("logicweaver-spa-root")), T = [...t.values()].filter((b) => !(!b.eager || !f && b.roots && b.roots.length > 0 && !b.roots.some((D) => !!document.getElementById(D)))).sort((b, C) => (b.order || 100) - (C.order || 100)), p = (await Promise.allSettled(T.map((b) => v(b.id)))).flatMap((b, C) => b.status === "rejected" ? [{ id: T[C].id, reason: b.reason }] : []);
    p.length && console.warn("LogicWeaver Vue features failed to mount", p);
  }
  async function I() {
    const f = [...o.keys()].reverse();
    await Promise.allSettled(f.map(a));
  }
  function A() {
    return Object.freeze([...t.values()].map((f) => Object.freeze({
      id: f.id,
      title: f.title,
      order: f.order || 100,
      eager: f.eager === !0,
      roots: Object.freeze([...f.roots || []]),
      capabilities: Object.freeze([...f.capabilities || []]),
      status: i.has(f.id) ? "mounting" : o.has(f.id) ? "mounted" : r.has(f.id) ? "failed" : "registered",
      error: r.has(f.id) ? String(r.get(f.id)?.message || r.get(f.id) || "Feature mount failed") : ""
    })).sort((f, T) => f.order - T.order));
  }
  return Object.freeze({ register: l, start: v, startEager: x, stop: a, stopAll: I, has: (f) => t.has(f), list: A });
}
const xr = localStorage.getItem("startupAnimationStyle") || localStorage.getItem("logicweaverStartupStyle") || "endfield", Ki = (() => {
  try {
    const e = localStorage.getItem("showStartupAnimation"), t = localStorage.getItem("logicweaverEndfieldLoader"), o = e ?? t;
    return o === "1" || o === "true";
  } catch {
    return !1;
  }
})(), z = ue({
  enabled: Ki,
  style: xr === "rhinelab" ? "rhinelab" : "endfield",
  renderedProgress: 4,
  targetProgress: 4,
  status: "CORE SHELL...",
  finished: !Ki,
  exiting: !1,
  forced: !1
});
let Ut = 0, Fo = 4, $n = performance.now(), yi = 0, Ao = null, vi = !1;
function Mn(e) {
  const t = e - $n, o = yi ? Math.min(1, t / yi) : 1, i = o * o * (3 - 2 * o);
  z.renderedProgress = Fo + (z.targetProgress - Fo) * i, o < 1 && !z.finished ? Ut = requestAnimationFrame(Mn) : Ut = 0;
}
function Eo(e, t) {
  if (!z.enabled || z.finished) return;
  const o = Math.max(z.targetProgress, Math.max(4, Math.min(100, Number(e) || 4)));
  t && (z.status = t), Fo = z.renderedProgress, z.targetProgress = o, $n = performance.now(), yi = Math.max(280, Math.min(920, 220 + Math.abs(o - Fo) * 7.5)), cancelAnimationFrame(Ut), Ut = requestAnimationFrame(Mn);
}
function Go(e = "Ready", t = !1) {
  z.finished || (z.finished = !0, z.forced = t, z.status = e, z.targetProgress = 100, cancelAnimationFrame(Ut), Ut = 0, z.renderedProgress = 100, Ao?.(t));
}
function Cr(e = "KEYBOARD SKIP") {
  Go(e, !0);
}
function Lr() {
  z.enabled || Go("BOOT COMPLETE", !0);
}
function In() {
  !z.enabled || z.finished || vi || (vi = !0, Eo(38, "INITIALIZING CORE SHELL..."), setTimeout(() => {
    z.finished || Eo(76, "SYNTHESIZING RUNTIME...");
  }, 400), setTimeout(() => {
    z.finished || Eo(100, z.style === "rhinelab" ? "ID CONFIRMED : JOYCE MOORE" : "TERRA LINK READY / 终端就绪");
  }, 900), setTimeout(() => {
    z.finished || Go("BOOT COMPLETE / 首页就绪", !1);
  }, 1650));
}
async function Sr() {
  if (document.getElementById("vue-spa-root")) {
    try {
      const e = await chrome.storage.local.get(["showStartupAnimation", "startupAnimationStyle"]);
      typeof e.showStartupAnimation == "boolean" && (z.enabled = e.showStartupAnimation, localStorage.setItem("showStartupAnimation", z.enabled ? "1" : "0"), localStorage.setItem("logicweaverEndfieldLoader", z.enabled ? "1" : "0")), (e.startupAnimationStyle === "endfield" || e.startupAnimationStyle === "rhinelab") && (z.style = e.startupAnimationStyle, localStorage.setItem("startupAnimationStyle", z.style));
    } catch {
      console.warn("[Intro] Startup preferences unavailable; using first-paint preference.");
    }
    z.finished = !z.enabled, document.documentElement.dataset.startupStyle = z.style, document.documentElement.classList.toggle("skip-endfield-loader", !z.enabled), document.body.classList.toggle("is-starting", z.enabled);
  }
}
const Ye = At(z), lt = Object.freeze({
  update: Eo,
  finish: Go,
  skip: Cr,
  notifyBootReady: Lr,
  async playIntro(e) {
    if (e?.style && (z.style = e.style), typeof document < "u" && (document.documentElement.dataset.startupStyle = z.style, document.documentElement.classList.remove("skip-endfield-loader"), document.body.classList.add("is-starting")), z.enabled = !0, z.finished = !1, z.forced = !!e?.force, z.renderedProgress = 4, z.targetProgress = 4, vi = !1, typeof document < "u") {
      let t = document.getElementById("endfield-loader");
      if (!t) {
        t = document.createElement("div"), t.id = "endfield-loader", t.className = "endfield-loader notranslate", document.body.appendChild(t);
        const { default: o } = await import("./IntroAnimation-TVPWJJVT.js"), i = Si(o), r = () => {
          window.removeEventListener("logicweaver:intro-complete", r), i.unmount(), t?.remove(), document.body.classList.remove("is-starting");
        };
        window.addEventListener("logicweaver:intro-complete", r, { once: !0 }), i.mount(t);
      }
    }
    In();
  },
  get enabled() {
    return z.enabled;
  },
  get finished() {
    return z.finished;
  }
});
function Tr(e) {
  return Ao = e, z.finished && e(z.forced), () => {
    Ao === e && (Ao = null);
  };
}
const An = [
  { date: "今天", dayName: "周四", emoji: "🌤️", condition: "多云", highTemp: 26, lowTemp: 18, rainProb: 15 },
  { date: "明天", dayName: "周五", emoji: "⛅", condition: "阴天", highTemp: 24, lowTemp: 17, rainProb: 30 },
  { date: "后天", dayName: "周六", emoji: "🌧️", condition: "小雨", highTemp: 21, lowTemp: 16, rainProb: 75 },
  { date: "周日", dayName: "周日", emoji: "🌦️", condition: "阵雨", highTemp: 23, lowTemp: 15, rainProb: 45 },
  { date: "周一", dayName: "周一", emoji: "☀️", condition: "晴天", highTemp: 27, lowTemp: 18, rainProb: 10 },
  { date: "周二", dayName: "周二", emoji: "🌤️", condition: "多云", highTemp: 28, lowTemp: 19, rainProb: 15 },
  { date: "周三", dayName: "周三", emoji: "☀️", condition: "晴天", highTemp: 29, lowTemp: 20, rainProb: 5 }
], En = "lw_weather_snapshot_v1";
function $r() {
  if (typeof window > "u" || typeof localStorage > "u") return null;
  try {
    const e = localStorage.getItem(En);
    if (!e) return null;
    const t = JSON.parse(e);
    if (t && t.data && t.data.currentTemp !== void 0)
      return {
        state: "ready",
        city: t.city || t.data.cityName || "",
        data: t.data,
        forecastDays: Array.isArray(t.forecastDays) && t.forecastDays.length ? t.forecastDays : An,
        detailInfo: t.detailInfo || null,
        updatedAt: t.savedAt || Date.now()
      };
  } catch {
  }
  return null;
}
function yo(e) {
  if (!(typeof window > "u" || typeof localStorage > "u"))
    try {
      e.data && localStorage.setItem(
        En,
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
const Mr = () => {
  const e = $r();
  return {
    state: e?.state || "loading",
    city: e?.city || "",
    errorMessage: "",
    data: e?.data || null,
    updatedAt: e?.updatedAt || null,
    forecastModalOpen: !1,
    forecastDays: e?.forecastDays || An,
    detailInfo: e?.detailInfo || {
      humidity: "62%",
      wind: "东北风 2级",
      uvIndex: "中等 (4)",
      airQuality: "优 (32)"
    }
  };
}, R = ue(Mr());
let Zo = null, ei = null;
const Je = {
  get snapshot() {
    return At(R);
  },
  update(e) {
    Object.assign(R, e), yo(R);
  },
  unconfigured() {
    Object.assign(R, {
      state: "unconfigured",
      city: "",
      errorMessage: "",
      data: null,
      updatedAt: Date.now()
    });
  },
  loading(e = "") {
    if (R.data) {
      e && (R.city = e);
      return;
    }
    Object.assign(R, {
      state: "loading",
      city: e,
      errorMessage: "",
      updatedAt: Date.now()
    });
  },
  ready(e, t = "") {
    Object.assign(R, {
      state: "ready",
      city: t || e.cityName,
      errorMessage: "",
      data: e,
      updatedAt: Date.now()
    }), yo(R);
  },
  notFound(e = "") {
    Object.assign(R, {
      state: "not_found",
      city: e,
      errorMessage: `找不到城市「${e}」，右键可重新选择地点。`,
      data: null,
      updatedAt: Date.now()
    });
  },
  error(e = "天气加载失败，右键此处可重新选择地点。", t = "") {
    R.data || Object.assign(R, {
      state: "error",
      city: t,
      errorMessage: e,
      data: null,
      updatedAt: Date.now()
    });
  },
  openForecastModal(e) {
    e && (R.city = e), R.forecastModalOpen = !0;
  },
  closeForecastModal() {
    R.forecastModalOpen = !1;
  },
  setForecastDays(e) {
    R.forecastDays = Array.isArray(e) ? e.map((t) => ({
      dayName: t.dayName || t.day || "",
      date: t.date || "",
      emoji: t.emoji || "🌤️",
      condition: t.condition || t.text || "",
      rainProb: t.rainProb ?? 0,
      lowTemp: t.lowTemp ?? t.tempMin ?? 0,
      highTemp: t.highTemp ?? t.tempMax ?? 0
    })) : [], yo(R);
  },
  setDetailInfo(e) {
    R.detailInfo = { ...e }, yo(R);
  },
  applyCity(e) {
    typeof window < "u" && window.dispatchEvent(new CustomEvent("logicweaver:weather-city-selected", { detail: { city: e } })), this.refresh();
  },
  refresh() {
    Zo ? Zo() : typeof window < "u" && window.dispatchEvent(new CustomEvent("logicweaver:weather-refresh"));
  },
  changeLocation(e) {
    ei ? ei(e) : typeof window < "u" && window.dispatchEvent(new CustomEvent("logicweaver:weather-change-location", { detail: { clientX: e?.clientX, clientY: e?.clientY } }));
  },
  setRefreshAction(e) {
    Zo = e;
  },
  setChangeLocationAction(e) {
    ei = e;
  }
}, Ir = () => ({
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
}), le = ue(Ir());
let ti = null;
const Ft = {
  get snapshot() {
    return At(le);
  },
  update(e) {
    Object.assign(le, e);
  },
  updateTime(e, t, o, i) {
    le.timeText = e, le.secsText = t, le.greetingText = o, le.dateText = i, le.updatedAt = Date.now();
  },
  applyConfig(e) {
    e.fontFamily !== void 0 && (le.fontFamily = e.fontFamily), e.colorHex !== void 0 && (le.colorHex = e.colorHex), e.greetColor !== void 0 && (le.greetColor = e.greetColor), e.dateColor !== void 0 && (le.dateColor = e.dateColor), e.isBlack !== void 0 && (le.isBlack = e.isBlack), e.isCustomColor !== void 0 && (le.isCustomColor = e.isCustomColor), le.updatedAt = Date.now();
  },
  openSettings(e) {
    ti ? ti(e) : window.dispatchEvent(new CustomEvent("logicweaver:clock-open-settings", { detail: { clientX: e?.clientX, clientY: e?.clientY } }));
  },
  setOpenSettingsAction(e) {
    ti = e;
  }
}, vo = ue({
  avatarUrl: "assets/bilibili.svg",
  userName: "哔哩哔哩用户",
  buttonTitle: "通知中心"
}), Ar = () => ({
  mounted: !1,
  visible: !1,
  x: 0,
  y: 0,
  avatarUrl: "assets/bilibili.svg",
  userName: "用户"
}), rt = ue(Ar());
let qe = {};
const ho = {
  getSnapshot() {
    return At(rt);
  },
  update(e) {
    Object.assign(rt, e);
  },
  setMounted(e) {
    rt.mounted = e;
  },
  open(e, t) {
    rt.x = e, rt.y = t, rt.visible = !0;
    const o = document.getElementById("bili-profile-menu");
    o && (o.hidden = !1, o.style.left = `${Math.min(window.innerWidth - 205, e)}px`, o.style.top = `${Math.min(window.innerHeight - 150, t)}px`);
  },
  close() {
    rt.visible = !1;
    const e = document.getElementById("bili-profile-menu");
    e && (e.hidden = !0);
  },
  trigger(e) {
    if (ho.close(), qe.onAction) {
      qe.onAction(e);
      return;
    }
    e === "messages" && qe.showInfo ? qe.showInfo() : e === "refresh" && qe.refresh ? qe.refresh() : e === "switch" && qe.switchUser ? qe.switchUser() : e === "web" && qe.openWeb ? qe.openWeb() : window.dispatchEvent(new CustomEvent("logicweaver:profile-menu-action", { detail: { action: e } }));
  },
  setActions(e) {
    qe = { ...qe, ...e };
  }
}, Er = [
  { id: "ai", title: "AI 助手" },
  { id: "todoist", title: "Todoist" },
  { id: "stickers", title: "表情包" },
  { id: "calcom", title: "预约" },
  { id: "wallpaper", title: "壁纸库" }
], Dr = () => ({
  mounted: !1,
  visible: !1,
  items: [...Er]
}), oi = ue(Dr());
let bo = {};
const Ii = {
  getSnapshot() {
    return At(oi);
  },
  update(e) {
    Object.assign(oi, e);
  },
  setMounted(e) {
    oi.mounted = e;
  },
  openWorkspace(e, t = !1) {
    if (bo.open) {
      bo.open(e);
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
    bo = { ...bo, ...e };
  }
}, ii = ue({ visible: !1, pendingWrites: 0 });
async function Pr(e) {
  if (ii.pendingWrites) throw new Error("壁纸操作正在处理，未自动排队");
  ii.pendingWrites++;
  try {
    return await e();
  } finally {
    ii.pendingWrites--;
  }
}
const zi = {
  openDialog() {
    Ce.open("wallpaper");
  },
  closeDialog() {
    Ce.close("wallpaper");
  },
  resetDefault() {
    return Pr(() => Bo.clearWallpaper());
  }
}, Gi = [
  { id: "mono", label: "极简等宽", font: "ui-monospace, 'SF Mono', 'JetBrains Mono', Menlo, Consolas, monospace", sample: "15:50:10" },
  { id: "sans", label: "现代无衬线", font: "-apple-system, BlinkMacSystemFont, 'Segoe UI Variable Display', 'Segoe UI', Roboto, 'PingFang SC', sans-serif", sample: "15:50:10" },
  { id: "din", label: "经典几何", font: "'DIN Alternate', 'DIN Pro', 'Franklin Gothic Medium', Futura, sans-serif", sample: "15:50:10" },
  { id: "digital", label: "数码管等宽", font: "'Courier New', Courier, monospace", sample: "15:50:10" },
  { id: "impact", label: "硬派力量", font: "Impact, 'Arial Black', 'Trebuchet MS', sans-serif", sample: "15:50:10" },
  { id: "serif", label: "典雅衬线", font: "'Playfair Display', Georgia, 'Times New Roman', serif", sample: "15:50:10" },
  { id: "rounded", label: "圆润亲和", font: "'Quicksand', 'Comic Sans MS', 'Segoe UI', sans-serif", sample: "15:50:10" }
], Ui = [
  { id: "white", label: "纯净皓白 (默认)", hex: "#ffffff" },
  { id: "black", label: "曜石极黑", hex: "#0f172a" },
  { id: "gold", label: "香槟金砂", hex: "#f59e0b" },
  { id: "cyan", label: "科技青蓝", hex: "#38bdf8" },
  { id: "emerald", label: "翡翠竹绿", hex: "#10b981" },
  { id: "rose", label: "淡雅樱粉", hex: "#fb7185" }
], pf = [
  { id: "local", label: "📍 本地系统时区", offset: "Local" },
  { id: "Asia/Shanghai", label: "🇨🇳 北京 / 香港", offset: "UTC+8" },
  { id: "Asia/Tokyo", label: "🇯🇵 东京 / 首尔", offset: "UTC+9" },
  { id: "Europe/London", label: "🇬🇧 伦敦 / 格林威治", offset: "UTC+0/+1" },
  { id: "Europe/Paris", label: "🇫🇷 巴黎 / 柏林", offset: "UTC+1/+2" },
  { id: "America/New_York", label: "🇺🇸 纽约 / 东部时间", offset: "UTC-5/-4" },
  { id: "America/Los_Angeles", label: "🇺🇸 洛杉矶 / 西部时间", offset: "UTC-8/-7" },
  { id: "Australia/Sydney", label: "🇦🇺 悉尼", offset: "UTC+10/+11" },
  { id: "UTC", label: "🌐 协调世界时 (UTC)", offset: "UTC" }
], ge = ue({
  mounted: !1,
  isOpen: !1,
  x: 200,
  y: 200,
  font: "mono",
  color: "white",
  timezone: "local"
});
let ni = null;
const $t = {
  state: ge,
  setMounted(e) {
    ge.mounted = e;
  },
  onAction(e) {
    ni = e;
  },
  dispatch(e, t) {
    if (ni)
      return ni(e, t);
  },
  open(e) {
    const i = typeof window < "u" ? window.innerWidth : 1280, r = typeof window < "u" ? window.innerHeight : 800, l = e?.clientX ?? e?.x ?? i / 2, m = e?.clientY ?? e?.y ?? r / 2, v = Math.max(12, Math.min(l - 40, i - 290 - 12)), a = Math.max(12, Math.min(m + 10, r - 420 - 12));
    ge.x = v, ge.y = a, ge.isOpen = !0, this.dispatch("open", { x: v, y: a });
  },
  close() {
    ge.isOpen = !1, this.dispatch("close");
  },
  setFont(e) {
    ge.font = e;
    const t = Gi.find((o) => o.id === e);
    if (t) {
      Ft.applyConfig({ fontFamily: t.font });
      try {
        localStorage.setItem("lw_clock_font", e);
      } catch {
      }
    }
    this.dispatch("change", { font: e, color: ge.color, timezone: ge.timezone });
  },
  setColor(e) {
    ge.color = e;
    const t = Ui.find((o) => o.id === e);
    if (t) {
      Ft.applyConfig({
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
    this.dispatch("change", { font: ge.font, color: e, timezone: ge.timezone });
  },
  setTimezone(e) {
    ge.timezone = e;
    try {
      localStorage.setItem("lw_clock_tz", e);
    } catch {
    }
    this.dispatch("change", { font: ge.font, color: ge.color, timezone: e });
  },
  initPreferences() {
    try {
      const e = localStorage.getItem("lw_clock_font");
      if (e) {
        ge.font = e;
        const i = Gi.find((r) => r.id === e);
        i && Ft.applyConfig({ fontFamily: i.font });
      }
      const t = localStorage.getItem("lw_clock_color");
      if (t) {
        ge.color = t;
        const i = Ui.find((r) => r.id === t);
        i && Ft.applyConfig({ colorHex: i.hex, greetColor: i.hex, dateColor: i.hex, isCustomColor: !0 });
      }
      const o = localStorage.getItem("lw_clock_tz");
      o && (ge.timezone = o);
    } catch {
    }
  },
  syncConfig(e) {
    e.font && (ge.font = e.font), e.color && (ge.color = e.color), e.timezone && (ge.timezone = e.timezone);
  }
}, oe = ue({
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
let si = null, Do = !1;
async function Po(e, t = {}) {
  if (e === "poll") return { state: "ready", model: oe.model };
  if (e === "connect") return { state: "ready", model: oe.model };
  throw new Error("旧版 AI 对话桥接已退役，请使用 Multica / AI 助手开启会话。");
}
function Dn(e) {
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
  o || (e.state === "connecting" ? o = "正在连接本机 Codex 与 ChatGPT…" : e.state === "disconnected" ? o = "已待命（打开面板自动连接）" : e.authenticated ? o = `就绪 · ChatGPT ${e.plan || "已登录"}` : e.state === "ready" ? o = "就绪 · 尚未登录 ChatGPT" : o = t[e.state] || e.state), oe.statusText = o, oe.authHidden = !e.loginUrl, oe.authCode = e.loginCode || "", oe.authLink = e.loginUrl || "https://auth.openai.com/codex/device", oe.isStreaming = Do || e.busy || e.state === "running";
}
async function Wr() {
  try {
    const e = await Po("poll");
    Dn(e);
  } catch {
  }
}
async function Nr(e, t) {
  if (e === "open" || e === "connect")
    try {
      oe.statusText = "正在连接本机 Codex 与 ChatGPT…";
      const o = await Po("connect");
      Dn(o);
    } catch (o) {
      oe.statusText = o?.message || "连接失败";
    }
  else if (e === "send" && t?.text) {
    const o = t.text;
    oe.messages.push({
      id: `msg-${Date.now()}`,
      role: "user",
      content: o
    }), oe.inputText = "", oe.isStreaming = !0, Do = !0;
    try {
      await Po("send", { text: o }), await Wr();
    } catch (i) {
      oe.statusText = i?.message || "发送失败";
    } finally {
      Do = !1, oe.isStreaming = !1;
    }
  } else if (e === "stop") {
    try {
      await Po("stop");
    } catch {
    }
    oe.isStreaming = !1, Do = !1;
  }
}
const Ai = {
  state: oe,
  setMounted(e) {
    oe.mounted = e;
  },
  onAction(e) {
    si = e;
  },
  dispatch(e, t) {
    if (si)
      return si(e, t);
    Nr(e, t);
  },
  open() {
    oe.isOpen = !0, this.dispatch("open");
  },
  close() {
    oe.isOpen = !1, this.dispatch("close");
  },
  newChat() {
    oe.messages = [], oe.inputText = "", oe.kwShelfHidden = !0, oe.keywords = [], this.dispatch("newChat");
  },
  send() {
    const e = oe.inputText.trim();
    !e || oe.isStreaming || this.dispatch("send", { text: e });
  },
  stop() {
    oe.isStreaming = !1, this.dispatch("stop");
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
    oe.keywords.forEach((t) => t.selected = e), this.dispatch("selectAllKeywords", { all: e });
  },
  toggleKeyword(e) {
    oe.keywords[e] && (oe.keywords[e].selected = !oe.keywords[e].selected, this.dispatch("toggleKeyword", { index: e, selected: oe.keywords[e].selected }));
  },
  deepDiveKeywords() {
    const e = oe.keywords.filter((t) => t.selected).map((t) => t.text);
    this.dispatch("deepDiveKeywords", { selected: e });
  }
}, ri = ue({
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
}), ko = /* @__PURE__ */ new Set(), Or = {
  state: ri,
  open(e) {
    Object.assign(ri, e, { open: !0 });
  },
  update(e) {
    Object.assign(ri, e);
  },
  close() {
    ko.forEach((e) => e("close"));
  },
  save(e) {
    ko.forEach((t) => t("save", e));
  },
  onAction(e) {
    return ko.add(e), () => ko.delete(e);
  }
}, Wo = ue({ isOpen: !1 }), Pn = {
  state: Wo,
  open() {
    Wo.isOpen = !0;
  },
  close() {
    Wo.isOpen = !1;
  }
}, ai = "biliProfileCacheV1", ut = "biliLocallyKnownMessageIdsV1", _o = "biliMessageUserCacheV1", Qt = "githubKnownReleaseVersionsV1", xo = "customNewtabAvatar", Yi = "biliToastKnownCountsV1";
class Rr {
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
    !t?.repository || !t?.version || (this.githubKnownVersions[t.repository] = t.version, await xt({ [Qt]: this.githubKnownVersions }), this.notifyGitHubListeners());
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
      const l = Math.max(0, Number(this.unread?.[r] || 0));
      let m = Array.isArray(this.locallyKnownIds?.[r]) ? this.locallyKnownIds[r] : [];
      l < m.length && (m = [], this.locallyKnownIds[r] = [], o = !0), t[r] = Math.max(0, l - m.length);
    }), o && xt({ [ut]: this.locallyKnownIds }).catch(() => {
    }), t;
  }
  markKnown(t, o, i) {
    this.locallyKnownIds[t] || (this.locallyKnownIds[t] = []);
    let r = !1;
    o && !this.locallyKnownIds[t].includes(o) && (this.locallyKnownIds[t].push(o), r = !0), i && !this.locallyKnownIds[t].includes(i) && (this.locallyKnownIds[t].push(i), r = !0), r && xt({ [ut]: this.locallyKnownIds }).catch(() => {
    }), this.applyBiliProfile(this.profile, this.unread);
  }
  markAllKnown(t, o = []) {
    this.locallyKnownIds[t] || (this.locallyKnownIds[t] = []);
    const i = new Set(this.locallyKnownIds[t]);
    for (const l of o) l && i.add(l);
    const r = Math.max(0, Number(this.unread?.[t] || 0));
    if (i.size < r) {
      const l = r - i.size;
      for (let m = 0; m < l; m++) i.add(`__pad_${Date.now()}_${m}`);
    }
    this.locallyKnownIds[t] = Array.from(i), xt({ [ut]: this.locallyKnownIds }).catch(() => {
    }), this.applyBiliProfile(this.profile, this.unread);
  }
  applyBiliProfile(t, o = {}) {
    this.profile = t || null, this.unread = o || {};
    const r = this.customAvatar || String(t?.face || "assets/bilibili.svg").replace(/^http:/, "https:"), l = this.getVisibleUnread();
    if (vo.avatarUrl = r, vo.userName = t?.uname || "哔哩哔哩用户", vo.buttonTitle = "通知中心", rt.avatarUrl = r, rt.userName = t?.uname || "用户", rt.mid = t?.mid, typeof document < "u") {
      const m = document.getElementById("bili-profile-avatar");
      m && (m.src = r);
      const v = document.getElementById("bili-profile-button");
      v && (v.title = vo.buttonTitle);
    }
    Lt.updateState({
      userName: t?.uname || "哔哩哔哩用户",
      userMid: t?.mid ? String(t.mid) : "",
      userAvatar: r,
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
        }, [r, l, m] = await Promise.allSettled([
          fetch("https://api.bilibili.com/x/msgfeed/unread?build=0&mobi_app=web", { credentials: "include" }).then((T) => T.json()),
          fetch("https://api.vc.bilibili.com/x/im/web/msgfeed/unread", { credentials: "include" }).then((T) => T.json()),
          fetch("https://api.vc.bilibili.com/session_svr/v1/session_svr/single_unread", { credentials: "include" }).then((T) => T.json())
        ]), v = r.status === "fulfilled" ? r.value?.data || {} : {}, a = l.status === "fulfilled" ? l.value?.data || {} : {}, x = m.status === "fulfilled" ? m.value?.data || {} : {}, I = Number(a.at || 0), A = a.reply != null ? Number(a.reply || 0) : Math.max(0, Number(a.recv_reply || 0) - I), f = {
          reply: Math.max(Number(v.reply || 0), A),
          at: Math.max(Number(v.at || 0), I),
          like: Math.max(
            Number(v.like || v.praise || 0),
            Number(a.like || a.recv_like || 0)
          ),
          system: Math.max(Number(v.sys_msg || v.system || 0), Number(a.sys_msg || 0)),
          private: Number(
            v.chat || a.chat || Number(x.follow_unread || 0) + Number(x.unfollow_unread || 0) + Number(x.dustbin_push_msg || 0)
          )
        };
        this.applyBiliProfile(i, f), await xt({ [ai]: { profile: i, unread: f, savedAt: Date.now() } }), this.checkAndNotifyBiliInteractions(f);
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
      this.biliToastKnownCounts = { ...o }, xt({ [Yi]: this.biliToastKnownCounts }).catch(() => {
      });
      return;
    }
    const i = o.private - Number(this.biliToastKnownCounts.private || 0);
    o.like - Number(this.biliToastKnownCounts.like || 0);
    const r = o.reply - Number(this.biliToastKnownCounts.reply || 0), l = o.at - Number(this.biliToastKnownCounts.at || 0);
    o.system - Number(this.biliToastKnownCounts.system || 0), this.biliToastKnownCounts = { ...o }, xt({ [Yi]: this.biliToastKnownCounts }).catch(() => {
    }), i > 0 && de.show({
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
        Lt.openPanel();
      }
    }), r > 0 && de.show({
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
        Lt.openPanel();
      }
    }), l > 0 && de.show({
      appType: "bili",
      appName: "哔哩哔哩",
      icon: "assets/bilibili.svg",
      title: l > 1 ? `收到 ${l} 次新提及` : "有人 @了你",
      subtitle: "提到我的通知",
      message: "有人在动态或评论中 @了你",
      target: { type: "bili-messages" },
      actionLabel: "查看提及",
      showActions: !0,
      onClick: () => {
        Lt.openPanel();
      }
    });
  }
  init() {
    this.initialized || (this.initialized = !0, ho.setActions({
      onAction: async (t) => {
        if (t === "messages")
          co.open();
        else if (t === "tabs")
          Pn.open();
        else if (t === "refresh")
          await this.refreshBiliProfile();
        else if (t === "switch")
          typeof chrome < "u" && chrome?.tabs?.create ? chrome.tabs.create({ url: "https://passport.bilibili.com/login?gourl=https%3A%2F%2Fwww.bilibili.com%2F", active: !0 }) : window.open("https://passport.bilibili.com/login?gourl=https%3A%2F%2Fwww.bilibili.com%2F", "_blank");
        else if (t === "web") {
          const o = this.profile?.mid, i = o ? `https://space.bilibili.com/${o}` : "https://www.bilibili.com/";
          typeof chrome < "u" && chrome?.tabs?.create ? chrome.tabs.create({ url: i, active: !0 }) : window.open(i, "_blank");
        }
      }
    }), nr() && (wi([
      ai,
      ut,
      _o,
      Qt,
      xo
    ]).then((t) => {
      this.customAvatar = t[xo] || "", this.locallyKnownIds = t[ut] && typeof t[ut] == "object" ? t[ut] : {}, this.userCache = t[_o] && typeof t[_o] == "object" ? t[_o] : {}, this.githubKnownVersions = t[Qt] && typeof t[Qt] == "object" ? t[Qt] : {};
      const o = t[ai];
      o?.profile ? this.applyBiliProfile(o.profile, o.unread || {}) : this.applyBiliProfile(null, {});
    }).catch(() => {
    }), chrome.storage.onChanged && chrome.storage.onChanged.addListener((t, o) => {
      o === "local" && (t[xo] && (this.customAvatar = t[xo].newValue || "", this.applyBiliProfile(this.profile, this.unread)), t[ut] && (this.locallyKnownIds = t[ut].newValue || {}, this.applyBiliProfile(this.profile, this.unread)));
    })), Lt.onAction((t, o) => {
      t === "mark-known" ? this.markKnown(o.kind, o.id, o.talkerId) : t === "mark-all-known" && this.markAllKnown(o.kind, o.ids);
    }), this.refreshBiliProfile(), setTimeout(() => {
      this.loadGitHubUpdates();
    }, 3500));
  }
}
const qi = new Rr(), ie = ue({ open: !1, loading: !1, error: "", mid: "", name: "", face: "", sign: "", followed: !1, submitting: !1, left: 12, top: 12, videos: [] });
let Co = null;
const No = {
  state: ie,
  open(e, t) {
    Co = t, Object.assign(ie, { open: !0, loading: !0, error: "", submitting: !1, videos: [] }, e);
  },
  update(e) {
    Object.assign(ie, e);
  },
  close() {
    ie.submitting || (ie.open = !1, Co = null);
  },
  async toggleFollow() {
    if (!(!Co || ie.submitting)) {
      ie.submitting = !0;
      try {
        const e = !ie.followed;
        await Co(e) && (ie.followed = e);
      } finally {
        ie.submitting = !1;
      }
    }
  }
}, Wn = {}, Xi = /* @__PURE__ */ new Set();
function Nn() {
  return new Proxy(Wn, {
    get(e, t) {
      return t === "get" ? (o) => e[o] : t === "list" ? () => {
        const o = {};
        for (const [i, r] of Object.entries(e))
          o[i] = r?.state ?? r;
        return o;
      } : t === "snapshot" ? () => {
        const o = {};
        for (const [i, r] of Object.entries(e)) {
          const l = r?.history || [];
          o[i] = {
            state: r?.state ?? r,
            historyLength: l.length,
            lastTransition: l.length ? l[l.length - 1] : void 0
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
        for (const [i, r] of Object.entries(e)) {
          const l = r?.history || [];
          o.machines[i] = {
            state: r?.state ?? r,
            historyCount: l.length,
            history: [...l]
          };
        }
        return o;
      } : t === "subscribeAll" ? (o) => (Xi.add(o), () => {
        Xi.delete(o);
      }) : e[t];
    }
  });
}
function Ji(e, t) {
  Wn[e] = t, typeof window < "u" && (window.__TAB_MACHINES__ = Nn());
}
function Br() {
  return Nn();
}
const bi = () => ({
  icon: "🧭",
  title: "快捷轮盘",
  desc: "移动鼠标选择",
  active: !1
}), Ei = () => ({
  visible: !1,
  wedgePath: "",
  arcPath: "",
  line1: { x1: 0, y1: 0, x2: 0, y2: 0 },
  line2: { x1: 0, y1: 0, x2: 0, y2: 0 }
}), K = ue({
  mounted: !1,
  isOpen: !1,
  isExpanded: !1,
  mode: "main",
  ballPosition: { x: 0, y: 0 },
  hub: bi(),
  activeSectorId: null,
  sectors: [],
  beam: Ei()
});
let Qi = null;
function Hr(e, t) {
  if (typeof e != "number" || !t)
    return Ei();
  const o = 160, i = 160, r = 26, l = 154, m = 360 / t, v = e - m / 2, a = e + m / 2, x = v * Math.PI / 180, I = a * Math.PI / 180, A = o + r * Math.cos(x), f = i + r * Math.sin(x), T = o + l * Math.cos(x), g = i + l * Math.sin(x), p = o + r * Math.cos(I), b = i + r * Math.sin(I), C = o + l * Math.cos(I), D = i + l * Math.sin(I), S = m > 180 ? 1 : 0, B = `M ${A.toFixed(1)} ${f.toFixed(1)} L ${T.toFixed(1)} ${g.toFixed(1)} A ${l} ${l} 0 ${S} 1 ${C.toFixed(1)} ${D.toFixed(1)} L ${p.toFixed(1)} ${b.toFixed(1)} A ${r} ${r} 0 ${S} 0 ${A.toFixed(1)} ${f.toFixed(1)} Z`, V = `M ${T.toFixed(1)} ${g.toFixed(1)} A ${l} ${l} 0 ${S} 1 ${C.toFixed(1)} ${D.toFixed(1)}`;
  return {
    visible: !0,
    wedgePath: B,
    arcPath: V,
    line1: {
      x1: parseFloat(A.toFixed(1)),
      y1: parseFloat(f.toFixed(1)),
      x2: parseFloat(T.toFixed(1)),
      y2: parseFloat(g.toFixed(1))
    },
    line2: {
      x1: parseFloat(p.toFixed(1)),
      y1: parseFloat(b.toFixed(1)),
      x2: parseFloat(C.toFixed(1)),
      y2: parseFloat(D.toFixed(1))
    }
  };
}
const me = {
  get state() {
    return K;
  },
  getSnapshot() {
    return At(K);
  },
  setMounted(e) {
    K.mounted = e;
  },
  setBallPosition(e, t) {
    K.ballPosition.x = e, K.ballPosition.y = t;
  },
  setVisibility(e) {
    K.isOpen = e;
  },
  setHub(e) {
    e ? K.hub = {
      icon: e.icon || "🧭",
      title: e.title || "快捷轮盘",
      desc: e.desc || "移动鼠标选择",
      active: !!e.active
    } : K.hub = bi();
  },
  setBeam(e, t) {
    K.beam = Hr(e, t);
  },
  setActiveSector(e) {
    K.activeSectorId = e;
  },
  setSectors(e) {
    K.sectors = [...e];
  },
  expand(e, t, o = "main") {
    K.isOpen = !0, K.isExpanded = !0, K.mode = o, typeof e == "number" && typeof t == "number" && this.setBallPosition(e, t);
  },
  collapse() {
    K.isExpanded = !1, K.mode = "main", K.activeSectorId = null, K.beam = Ei(), K.hub = bi();
  },
  setWheelMode(e) {
    K.mode = e;
  },
  setActionHandler(e) {
    Qi = e;
  },
  dispatch(e, t) {
    Qi?.(e, t);
  }
}, On = [
  { id: "daily-bilibili", title: "b站插件", desc: "B站收藏夹与追番视频", icon: "assets/bilibili.svg" },
  { id: "daily-aihot", title: "ai hot插件", desc: "全网 AI 与前沿科技资讯", icon: "assets/nav-aihot.svg" },
  { id: "folder", title: "常用网站", desc: "点击展开快捷网站子轮盘", icon: "assets/nav-folder.svg", mode: "shortcuts" },
  { id: "card-github", title: "github插件", desc: "GitHub 趋势与星标项目", icon: "assets/nav-github.svg" },
  { id: "launcher", title: "首页", desc: "返回主屏常用应用台", icon: "assets/nav-home.svg" }
];
function Fr() {
  return On.filter((e) => e.mode || e.id === "launcher" || Ho(e.id));
}
function jr() {
  return Ks.filter((e) => e.kind === "module" && Ho(e.id)).map((e) => ({
    id: e.id,
    title: e.title,
    desc: e.isDev ? "已启用的实验性组件" : e.categoryLabel,
    icon: e.icon || e.emoji || "🧩",
    tool: e.id
  }));
}
function Zi() {
  K.isExpanded && Ze();
}
let ki = [], ao = On, ht = { x: 400, y: 300 }, Rn = !1, Zt = !1, li = null, eo = null, Qe = !1;
const Vr = ue(/* @__PURE__ */ new Set()), Kr = /* @__PURE__ */ new Map();
function bt() {
  return globalThis.chrome?.storage;
}
function Bn(e, t) {
  const o = K.isExpanded ? 160 : 24;
  me.setBallPosition(
    Math.max(o + 8, Math.min(window.innerWidth - o - 8, e)),
    Math.max(o + 8, Math.min(window.innerHeight - o - 8, t))
  );
}
function Ze() {
  const e = K.mode;
  let t = [];
  e === "shortcuts" && (t = [...ki], t.push({
    id: "toggle-edit-shortcuts",
    title: Qe ? d("navwheel.finishEdit") : d("navwheel.editSites"),
    desc: Qe ? d("navwheel.finishEditDesc") : d("navwheel.editSitesDesc"),
    icon: Qe ? "✅" : "✏️"
  })), ao = e === "tools" ? jr() : e === "shortcuts" ? [
    ...t,
    { id: "back-to-main", title: d("navwheel.back"), desc: d("navwheel.backDesc"), icon: "🔙", mode: "main" }
  ] : Fr();
  const o = ao.length, i = o > 12 ? 118 : o > 9 ? 114 : 110, r = o > 12 ? 46 : o > 9 ? 50 : 56;
  me.setSectors(ao.map((l, m) => {
    const v = -90 + 360 / o * m, a = v * Math.PI / 180;
    return {
      id: l.id,
      title: l.title,
      desc: l.desc,
      icon: l.icon,
      angleDeg: v,
      x: Math.round(160 + Math.cos(a) * i),
      y: Math.round(160 + Math.sin(a) * i),
      size: r,
      isShortcut: !!l.url
    };
  })), me.setWheelMode(e), me.setActiveSector(null), me.setBeam(null, 0), me.setHub(e === "shortcuts" ? Qe ? { icon: "✏️", title: d("navwheel.editing") } : { icon: "🔙", title: d("navwheel.shortcuts") } : e === "tools" ? { icon: "🧰", title: d("navwheel.tools") } : null);
}
function jo(e) {
  K.mode = e, Ze();
}
function Mt() {
  me.collapse(), Bn(K.ballPosition.x, K.ballPosition.y), me.setVisibility(Rn);
}
function Ot(e = K.ballPosition.x, t = K.ballPosition.y, o = "main") {
  me.expand(void 0, void 0, o), Bn(e, t), Ze(), me.setVisibility(!0);
}
function zr(e) {
  if (e.id === "toggle-edit-shortcuts") {
    Hn();
    return;
  }
  if (Qe && e.url) {
    de.show({
      appName: d("navwheel.appName"),
      title: d("navwheel.editingNotice"),
      message: d("navwheel.editingHint"),
      duration: 2500
    });
    return;
  }
  if (!(e.tool && !Ho(e.tool) || !e.url && !e.mode && e.id !== "launcher" && !Ho(e.id))) {
    if (e.mode) {
      jo(e.mode);
      return;
    }
    if (Mt(), e.url) {
      window.open(e.url, "_blank");
      return;
    }
    if (e.tool) {
      window.triggerToolShortcut?.(e.tool);
      return;
    }
    e.id === "launcher" ? (typeof window < "u" && window.scrollTo({ top: 0, left: 0, behavior: "instant" }), Tt.exit(), document.body && (document.body.dataset.page = "home")) : Tt.enter(e.id);
  }
}
function Hn() {
  Qe = !Qe, Qe ? (de.show({
    appName: d("navwheel.appName"),
    title: d("navwheel.enterEditMode"),
    message: d("navwheel.editModeDesc"),
    duration: 5e3
  }), Ze()) : (de.show({
    appName: d("navwheel.appName"),
    title: d("navwheel.editDone"),
    message: d("navwheel.editSaved"),
    duration: 2e3
  }), Ze());
}
async function Gr(e) {
  if (!Qe || !e || !e.url) return !1;
  try {
    const t = await bt()?.local?.get(["siteShelfLinks", "logicweaverNavWheelShortcutsV1"]), o = Array.isArray(t?.siteShelfLinks) ? t.siteShelfLinks : Array.isArray(t?.logicweaverNavWheelShortcutsV1) ? t.logicweaverNavWheelShortcutsV1 : [], i = o.findIndex((m) => m.url === e.url);
    if (i >= 0) {
      const m = o.filter((v, a) => a !== i);
      return await bt()?.local?.set({ siteShelfLinks: m, logicweaverNavWheelShortcutsV1: m }), await Pe.loadShortcuts(), Ze(), de.show({
        appName: d("navwheel.appName"),
        title: d("navwheel.removedNotice"),
        message: d("navwheel.removedSite", { name: e.title || e.url }),
        duration: 2e3
      }), !0;
    }
    if (o.length >= 12)
      return de.show({
        appName: d("navwheel.appName"),
        title: d("navwheel.limitTitle"),
        message: d("navwheel.maxLimitNotice"),
        duration: 2500
      }), !0;
    const r = {
      id: String(e.id || `wheel-${Date.now()}`),
      title: e.title || d("navwheel.site"),
      url: e.url,
      icon: e.icon || "",
      customIcon: e.customIcon || ""
    }, l = [...o, r];
    return await bt()?.local?.set({ siteShelfLinks: l, logicweaverNavWheelShortcutsV1: l }), await Pe.loadShortcuts(), Ze(), de.show({
      appName: d("navwheel.appName"),
      title: d("navwheel.addedTitle"),
      message: d("navwheel.addedNotice", { name: r.title }),
      duration: 2500
    }), !0;
  } catch (t) {
    return console.warn("[NavWheel] 即时处理快捷方式失败", t), !1;
  }
}
async function Ur(e) {
  try {
    const t = await bt()?.local?.get(["siteShelfLinks", "logicweaverNavWheelShortcutsV1"]), o = Array.isArray(t?.siteShelfLinks) ? t.siteShelfLinks : Array.isArray(t?.logicweaverNavWheelShortcutsV1) ? t.logicweaverNavWheelShortcutsV1 : [], i = o.find((l) => String(l.id) === String(e)), r = o.filter((l) => String(l.id) !== String(e));
    await bt()?.local?.set({ siteShelfLinks: r, logicweaverNavWheelShortcutsV1: r }), await Pe.loadShortcuts(), Ze(), i && de.show({
      appName: d("navwheel.appName"),
      title: d("navwheel.removedNotice"),
      message: d("navwheel.removedSite", { name: i.title || d("navwheel.site") }),
      duration: 2500
    });
  } catch (t) {
    console.warn("[NavWheel] 删除快捷方式失败", t);
  }
}
function en(e) {
  ht = { x: e.clientX, y: e.clientY };
}
function tn(e) {
  e.button === 1 && (e.preventDefault(), e.stopPropagation(), ht = { x: e.clientX, y: e.clientY }, K.isExpanded ? Mt() : Ot(e.clientX, e.clientY));
}
function on(e) {
  e.button === 1 && e.preventDefault();
}
function nn(e) {
  if (e.key === "Escape") {
    if (Qe) {
      e.preventDefault(), e.stopPropagation(), Qe = !1, Vr.clear(), Kr.clear(), Ze(), de.show({
        appName: d("navwheel.appName"),
        title: d("navwheel.exitedEditing"),
        duration: 1500
      });
      return;
    }
    if (!K.isExpanded || $i.active) return;
    e.preventDefault(), e.stopPropagation(), K.mode === "shortcuts" ? jo("main") : Mt();
  }
}
function Yr(e) {
  try {
    const t = globalThis.chrome;
    if (typeof t?.runtime?.getURL == "function")
      return t.runtime.getURL("_favicon/?pageUrl=" + encodeURIComponent(e) + "&size=64");
  } catch {
  }
  return "";
}
function qr(e) {
  const t = e.customIcon || e.icon;
  if (t && typeof t == "string" && !/google\.com\/s2\/favicons|icons\.duckduckgo/i.test(t))
    return t;
  if (e.url) {
    const o = Me.getCachedIcon(e.url);
    if (o) return o;
    const i = Yr(e.url);
    if (i) return i;
  }
  return e.icon || "🔗";
}
const Pe = {
  async start() {
    if (!Zt) {
      Zt = !0, li = it(ot, () => {
        K.isExpanded && Ze();
      }), ht = { x: Math.round(window.innerWidth / 2), y: Math.round(window.innerHeight / 2) }, me.setActionHandler((e, t) => {
        if (e === "hub:click")
          K.isExpanded ? K.mode === "shortcuts" ? jo("main") : Mt() : Ot();
        else if (e === "sector:click" || e === "container:click") {
          const o = ao.find((i) => i.id === t?.id || e === "container:click" && i.id === K.activeSectorId);
          o && zr(o);
        } else if (e === "sector:hover") {
          const o = K.sectors.find((i) => i.id === t?.id);
          o && (me.setHub({ icon: o.icon, title: o.title, desc: o.desc, active: !0 }), me.setActiveSector(o.id), me.setBeam(o.angleDeg, ao.length));
        } else e === "sector:leave" && (me.setActiveSector(null), me.setBeam(null, 0), me.setHub(K.mode === "shortcuts" ? { icon: "🔙", title: d("navwheel.shortcuts") } : K.mode === "tools" ? { icon: "🧰", title: d("navwheel.tools") } : null));
      }), window.addEventListener("logicweaver:dock-modules-changed", Zi), window.addEventListener("pointermove", en, { passive: !0 }), window.addEventListener("mousedown", tn, !0), window.addEventListener("auxclick", on, !0), window.addEventListener("keydown", nn, !0), eo = (e, t) => {
        t === "local" && (e.siteShelfLinks || e.logicweaverNavWheelShortcutsV1) && this.loadShortcuts();
      }, bt()?.onChanged?.addListener(eo);
      try {
        if (!Zt) return;
        Rn = !1, me.setVisibility(!1);
      } catch {
      }
      await this.loadShortcuts(), Ze();
    }
  },
  stop() {
    Zt = !1, li?.(), li = null, me.setActionHandler(null), window.removeEventListener("logicweaver:dock-modules-changed", Zi), window.removeEventListener("pointermove", en), window.removeEventListener("mousedown", tn, !0), window.removeEventListener("auxclick", on, !0), window.removeEventListener("keydown", nn, !0), eo && bt()?.onChanged?.removeListener(eo), eo = null;
  },
  async loadShortcuts() {
    try {
      const e = await bt()?.local?.get(["siteShelfLinks", "logicweaverNavWheelShortcutsV1"]);
      if (!Zt) return;
      const t = e?.siteShelfLinks?.length ? e.siteShelfLinks : e?.logicweaverNavWheelShortcutsV1;
      ki = (Array.isArray(t) ? t : []).map((o, i) => ({
        id: String(o.id || `wheel-${i}`),
        title: String(o.title || o.url || d("navwheel.site")),
        desc: String(o.url || ""),
        url: String(o.url || ""),
        icon: qr(o)
      })), K.mode === "shortcuts" && Ze();
    } catch (e) {
      console.warn("[NavWheel] 读取快捷方式失败", e);
    }
  },
  open(e, t) {
    Ot(e ?? ht.x, t ?? ht.y);
  },
  close: Mt,
  get isEditingShortcuts() {
    return Qe;
  },
  isLinkInWheel(e) {
    return e ? ki.some((t) => t.url === e) : !1;
  },
  toggleEditingShortcuts: Hn,
  handleLinkSelection: Gr,
  removeShortcut: Ur,
  toggle(e = !1) {
    K.isExpanded ? Mt() : e ? Ot(ht.x, ht.y) : Ot();
  },
  toggleTools(e = !0) {
    K.isExpanded && K.mode === "tools" ? Mt() : Ot(
      e ? ht.x : K.ballPosition.x,
      e ? ht.y : K.ballPosition.y,
      "tools"
    );
  },
  setMode(e) {
    jo(e);
  }
};
class jt {
  constructor() {
    this.activeShortcuts = { ...Jo }, this.isListenerBound = !1, this.storageListenerBound = !1, this.shortcutReadVersion = 0, this.initShortcuts();
  }
  static getInstance() {
    return jt.instance || (jt.instance = new jt()), jt.instance;
  }
  getShortcuts() {
    return { ...this.activeShortcuts };
  }
  async setShortcut(t, o) {
    if (typeof t != "string" || !t || typeof o != "string")
      throw new Error("快捷键参数无效，未保存");
    if (typeof chrome > "u" || !chrome.storage?.local)
      throw new Error("快捷键存储不可用，未保存");
    const { optionsService: i, SHORTCUT_STORAGE_KEY: r } = await import("./options.service-0zKxEmHY.js").then((I) => I.b), m = (await wi(r))[r], v = { ...m || {}, [t]: o }, a = this.shortcutReadVersion, x = await i.saveSettings(
      { [r]: v },
      { [r]: m }
    );
    a === this.shortcutReadVersion && (++this.shortcutReadVersion, this.applyShortcutOverrides(x[r]));
  }
  applyShortcutOverrides(t) {
    const o = t && typeof t == "object" && !Array.isArray(t) ? Object.entries(t).filter((i) => Object.prototype.hasOwnProperty.call(Jo, i[0]) && typeof i[1] == "string") : [];
    this.activeShortcuts = { ...Jo, ...Object.fromEntries(o) };
  }
  async initShortcuts() {
    if (!(typeof chrome > "u" || !chrome.storage?.local))
      try {
        !this.storageListenerBound && chrome.storage?.onChanged?.addListener && (chrome.storage.onChanged.addListener((i, r) => {
          r === "local" && Object.prototype.hasOwnProperty.call(i, "customShortcuts") && (++this.shortcutReadVersion, this.applyShortcutOverrides(i.customShortcuts.newValue));
        }), this.storageListenerBound = !0);
        const t = ++this.shortcutReadVersion, o = await wi("customShortcuts");
        t === this.shortcutReadVersion && this.applyShortcutOverrides(o?.customShortcuts);
      } catch {
      }
  }
  /**
   * 分发触发指定工具的快捷动作
   */
  triggerToolShortcut(t) {
    if (!t || !Bi(t)) return !1;
    if (je(t))
      return Ce.handleToolClick(t), !0;
    switch (t) {
      case "bookmarks":
        return Ko.toggle(), !0;
      case "settings":
        return po.open(), !0;
      case "nav-wheel":
        return Pe.toggle(!0), !0;
      case "toolbox":
        return Pe.toggleTools(!0), !0;
      case "search": {
        if (typeof document < "u") {
          const o = document.getElementById("search-input");
          if (o)
            return o.focus(), o.select(), !0;
        }
        return !1;
      }
      case "todoist-new-task":
        return typeof window < "u" && typeof window.triggerTodoistQuickAdd == "function" ? window.triggerTodoistQuickAdd() : Ce.handleToolClick("todoist"), !0;
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
        if ($i.active || t.defaultPrevented || t.isComposing || t.repeat || t.target && (t.target.matches("input, textarea, select") || t.target.isContentEditable) && !t.altKey && !t.ctrlKey && !t.metaKey)
          return;
        const i = zs(t);
        if (!i) return;
        const r = i.toLowerCase();
        for (const [l, m] of Object.entries(this.activeShortcuts))
          if (!(!m || !Bi(l)) && m.toLowerCase().replace(/^cmd\+/, "meta+") === r) {
            t.preventDefault(), t.stopPropagation(), this.triggerToolShortcut(l);
            break;
          }
      },
      !0
    ));
  }
}
const _i = jt.getInstance();
class Vt {
  constructor() {
    this._isVisible = X(typeof document < "u" ? !document.hidden : !0), this.callbacks = /* @__PURE__ */ new Set(), this.activeIntervals = /* @__PURE__ */ new Set(), typeof document < "u" && document.addEventListener("visibilitychange", () => {
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
    return Vt.instance || (Vt.instance = new Vt()), Vt.instance;
  }
  get isVisible() {
    return At(this._isVisible);
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
const Xr = Vt.getInstance(), sn = [
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
function Lo(e) {
  return e === 0 ? { emoji: "☀️", label: d("weather.condition.clear") } : e <= 2 ? { emoji: "🌤️", label: d("weather.condition.mainlyClear") } : e === 3 ? { emoji: "☁️", label: d("weather.condition.cloudy") } : e === 45 || e === 48 ? { emoji: "🌫️", label: d("weather.condition.fog") } : e >= 51 && e <= 57 ? { emoji: "🌦️", label: d("weather.condition.drizzle") } : e >= 61 && e <= 67 ? { emoji: "🌧️", label: d("weather.condition.rain") } : e >= 71 && e <= 77 ? { emoji: "🌨️", label: d("weather.condition.snow") } : e >= 80 && e <= 82 ? { emoji: "🌧️", label: d("weather.condition.rainShower") } : e >= 85 && e <= 86 ? { emoji: "🌨️", label: d("weather.condition.snowShower") } : e >= 95 ? { emoji: "⛈️", label: d("weather.condition.thunderstorm") } : { emoji: "🌡️", label: d("weather.condition.unknown") };
}
class Kt {
  constructor() {
    this.currentCity = "武汉", this.isRefreshing = !1, this.activeRequestId = 0, this.lastRawForecastData = null, this.initStorage();
  }
  static getInstance() {
    return Kt.instance || (Kt.instance = new Kt()), Kt.instance;
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
    const { city: t, loc: o, d: i } = this.lastRawForecastData;
    this.applyForecastPayload(t, o, i);
  }
  applyForecastPayload(t, o, i) {
    const r = Lo(i.current?.weather_code ?? 0), l = Math.round(i.current?.temperature_2m ?? 0), m = i.hourly?.time || [], v = Date.now();
    let a = m.findIndex((S) => new Date(S).getTime() >= v);
    a < 0 && (a = 0);
    const x = [];
    for (let S = a; S < Math.min(a + 5, m.length); S++) {
      const B = S === a ? d("weather.now") : d("weather.hourSuffix", { hour: new Date(m[S]).getHours() }), V = Lo(i.hourly.weather_code[S]), M = Math.round(i.hourly.temperature_2m[S]);
      x.push({ time: B, emoji: V.emoji, temp: M });
    }
    let I = d("weather.noRain12h");
    for (let S = a; S < Math.min(a + 12, m.length); S++) {
      const B = i.hourly.weather_code[S], V = i.hourly.precipitation_probability?.[S] || 0;
      if (B >= 51 || V >= 60) {
        const M = new Date(m[S]).getHours(), _ = B >= 71 && B <= 77 || B === 85 || B === 86 ? d("weather.snow") : d("weather.rain"), P = V ? ` (${V}%)` : "";
        I = d("weather.expectPrecip", { time: `${M}:00`, type: _, prob: P });
        break;
      }
    }
    const A = [d("weather.today"), d("weather.tomorrow"), d("weather.afterTomorrow")], f = [], T = i.daily?.time?.length || 0;
    for (let S = 1; S < Math.min(3, T); S++) {
      const B = A[S] || d("weather.plusDays", { count: S }), V = Lo(i.daily.weather_code[S]), M = `${Math.round(i.daily.temperature_2m_max[S])}°/${Math.round(i.daily.temperature_2m_min[S])}°`;
      f.push({ label: B, emoji: V.emoji, tempRange: M });
    }
    const g = Math.round(i.daily?.temperature_2m_max?.[0] ?? l), p = Math.round(i.daily?.temperature_2m_min?.[0] ?? l), b = d("weather.tempRange", { cond: r.label, max: g, min: p }), C = {
      cityName: o.name || t,
      currentEmoji: r.emoji,
      currentTemp: l,
      subText: b,
      rainText: I,
      hours: x,
      days: f
    };
    if (Je.ready(C, t), i.daily?.time) {
      const S = [
        d("weather.weekday.sun"),
        d("weather.weekday.mon"),
        d("weather.weekday.tue"),
        d("weather.weekday.wed"),
        d("weather.weekday.thu"),
        d("weather.weekday.fri"),
        d("weather.weekday.sat")
      ], B = [];
      for (let V = 0; V < i.daily.time.length; V++) {
        const M = new Date(i.daily.time[V]), L = V === 0 ? d("weather.today") : V === 1 ? d("weather.tomorrow") : V === 2 ? d("weather.afterTomorrow") : S[M.getDay()], _ = Lo(i.daily.weather_code[V]);
        B.push({
          date: `${M.getMonth() + 1}/${M.getDate()}`,
          dayName: L,
          emoji: _.emoji,
          condition: _.label,
          highTemp: Math.round(i.daily.temperature_2m_max[V]),
          lowTemp: Math.round(i.daily.temperature_2m_min[V]),
          rainProb: i.daily.precipitation_probability_max?.[V] || 0
        });
      }
      Je.setForecastDays(B);
    }
    const D = {
      humidity: i.current?.relative_humidity_2m ? `${i.current.relative_humidity_2m}%` : "60%",
      wind: i.current?.wind_speed_10m ? `${Math.round(i.current.wind_speed_10m)} km/h` : d("weather.detail.windLight"),
      uvIndex: d("weather.detail.uvNormal"),
      airQuality: d("weather.detail.airGood")
    };
    Je.setDetailInfo(D);
  }
  filterCities(t, o = 8) {
    const i = t.trim().toLowerCase();
    if (!i) return sn.slice(0, o);
    const r = [];
    for (const l of sn) {
      const m = l.name.toLowerCase(), v = l.pinyin.toLowerCase(), a = l.admin.toLowerCase();
      if ((m.startsWith(i) || v.startsWith(i) || m.includes(i) || v.includes(i) || a.includes(i)) && r.push(l), r.length >= o) break;
    }
    return r;
  }
  async loadWeather(t) {
    const o = (t || this.currentCity || "").trim();
    if (!o) {
      Je.unconfigured();
      return;
    }
    if (this.isRefreshing) return;
    this.isRefreshing = !0;
    const i = ++this.activeRequestId;
    Je.loading(o);
    try {
      const r = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(o)}&count=1&language=zh&format=json`, l = await fetch(r);
      if (i !== this.activeRequestId || R.state === "unconfigured") {
        this.isRefreshing = !1;
        return;
      }
      const v = (await l.json()).results?.[0];
      if (!v) {
        i === this.activeRequestId && R.state !== "unconfigured" && Je.notFound(o), this.isRefreshing = !1;
        return;
      }
      const a = `https://api.open-meteo.com/v1/forecast?latitude=${v.latitude}&longitude=${v.longitude}&current=temperature_2m,weather_code,relative_humidity_2m,wind_speed_10m&hourly=temperature_2m,weather_code,precipitation_probability&daily=temperature_2m_max,temperature_2m_min,weather_code,precipitation_probability_max&forecast_days=7&timezone=auto`, x = await fetch(a);
      if (i !== this.activeRequestId || R.state === "unconfigured") {
        this.isRefreshing = !1;
        return;
      }
      const I = await x.json();
      this.lastRawForecastData = { city: o, loc: v, d: I }, i === this.activeRequestId && R.state !== "unconfigured" && this.applyForecastPayload(o, v, I);
    } catch (r) {
      i === this.activeRequestId && R.state !== "unconfigured" && Je.error(r?.message || "天气加载失败，右键此处可重新选择地点。", o);
    } finally {
      i === this.activeRequestId && (this.isRefreshing = !1);
    }
  }
}
const Rt = Kt.getInstance();
function Jr(e, t) {
  window.LogicWeaverIntro = lt, window.LogicWeaverStartupIntro = lt, window.LogicWeaverNotifications = de, window.LogicWeaverWindowManager = Ce, window.LogicWeaverWindowTabs = Ce, window.LogicWeaverDomFreezer = Gs, window.LogicWeaverWallpaperService = Bo, window.LogicWeaverLauncherService = Me, window.LogicWeaverLauncherRuntime = gi, window.LogicWeaverProfileService = qi;
  try {
    qi.init();
  } catch (o) {
    console.error("[ProfileService] init failed:", o);
  }
  window.LogicWeaverBookmarksService = kn, window.LogicWeaverCalendarService = Ns, window.LogicWeaverWeather = Je, window.LogicWeaverWeatherService = Rt, window.LogicWeaverClock = Ft, window.LogicWeaverSearch = Is, window.LogicWeaverSearchService = As, Object.defineProperty(window, "LogicWeaverAiHotService", {
    configurable: !0,
    get: () => {
      import("./aihot.service-PIUO0HmZ.js").then((o) => o.d).then(({ aiHotService: o }) => {
        window.LogicWeaverAiHotService = o;
      });
    }
  }), window.LogicWeaverHomeMusic = tt, window.LogicWeaverLauncherGroups = xe, window.LogicWeaverProfileMenu = ho, window.LogicWeaverWorkspaceLaunchers = Ii, window.LogicWeaverMacDock = ft, window.LogicWeaverFullscreen = Tt, window.enterFullscreenCard = (o) => Tt.enter(o), window.exitFullscreenCard = () => Tt.exit(), window.cycleFullscreenCard = () => Tt.cycle(), window.LogicWeaverPageVisibility = Xr, window.LogicWeaverBackgroundLibrary = zi, window.LogicWeaverNotificationCenter = co, window.LogicWeaverBookmarkMenu = Ti, window.LogicWeaverBookmarkPanel = Ko, window.LogicWeaverBookmarkFolderStrip = _n, window.LogicWeaverLauncherDialogs = hn, window.LogicWeaverLauncherFolder = fn, window.LogicWeaverLauncherMenus = Ci, window.LogicWeaverSettings = po, window.LogicWeaverClockSettings = $t, window.LogicWeaverBiliTheater = ro, window.LogicWeaverBilibiliService = Fi, window.getBiliJct = () => Fi.getBiliJct(), window.LogicWeaverBiliMiniPlayer = Io, window.openBiliMiniPlayer = (o) => Io.openVideo(o), window.LogicWeaverAiDialog = Ai, window.LogicWeaverAihotViewer = Mi, window.LogicWeaverNavWheel = me, window.openNavWheel = (o, i) => Pe.open(o, i), window.closeNavWheel = () => Pe.close(), window.toggleNavWheel = (o) => Pe.toggle(o), window.toggleToolWheel = (o) => Pe.toggleTools(o), window.setNavWheelMode = (o) => Pe.setMode(o), window.LogicWeaverShortcuts = _i, window.triggerToolShortcut = (o) => _i.triggerToolShortcut(o), window.LogicWeaverCommands = e, window.LogicWeaverFeatures = t, window.LogicWeaverCalendarView = Os, window.LogicWeaverGitHubStatus = yn, window.LogicWeaverGitHubFolders = vn, window.LogicWeaverGitHubHero = bn, window.LogicWeaverGitHubRepositories = vt, window.LogicWeaverGitHubBatchBar = so, window.LogicWeaverTodoistLabels = Rs, window.LogicWeaverTodoistWorkspace = Bs, window.LogicWeaverTodoistCalendarSidebar = Hs, window.LogicWeaverTodoistTaskList = Fs, window.LogicWeaverBiliMessagePanel = Lt, window.LogicWeaverStickerBoard = tr, window.LogicWeaverStickersService = or, window.LogicWeaverBiliFavorites = Ln, window.LogicWeaverBiliRadioTape = er, window.LogicWeaverBiliOrganizerDialogs = Xs, window.LogicWeaverBiliUpGroupManager = Js, window.LogicWeaverBiliUpPreview = No, window.LogicWeaverAihotFeed = Sn, window.LogicWeaverGitHubTrending = Tn, window.LogicWeaverCalendarWorkspace = Ht, window.LogicWeaverCalendar = Ht, window.LogicWeaverTodoistMainWorkspace = js, window.LogicWeaverTodoistTaskDetail = Or, window.openBiliTheater = (o) => ro.openVideo(o), window.closeBiliTheater = () => ro.close(), window.showWindowsToast = (o) => {
    if (!o) return null;
    const i = Xo(o.target) || Oi(o.url) || (o.appType === "bili" ? Ls([o.title, o.subtitle, o.message].filter((r) => typeof r == "string").join(" ")) : void 0);
    return de.show({
      ...o,
      target: i,
      onClick: () => {
        if (typeof o?.onClick == "function") return o.onClick();
        if (i) return co.openTarget(i);
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
    const l = typeof i == "object" && i ? i : r, m = typeof i == "number" ? i : 3200, v = l.isError || /失败|错误|异常|未获取|未找到/i.test(o), a = l.title || (v ? "B站操作未完成" : "哔哩哔哩"), x = l.subtitle || (o.length > 36 ? "" : o), I = l.message || (l.subtitle || o.length > 36 ? o : ""), A = {
      id: l.id || `bili_toast_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      appType: "bili",
      appName: "哔哩哔哩",
      icon: "assets/bilibili.svg",
      title: a,
      subtitle: x || o,
      message: I && I !== x ? I : "",
      showActions: !!(l.showActions || l.actionLabel),
      actionLabel: l.actionLabel || "",
      onClick: l.onClick || null,
      target: Xo(l.target) || Oi(l.url) || Xo({ type: "bili-video", bvid: l.bvid, aid: l.aid ? String(l.aid) : void 0 }),
      url: l.url,
      duration: Math.max(3e3, m)
    };
    return window.showWindowsToast(A);
  }, window.showFetchToast = (o, i, r = "", l = "assets/logo.png", m = 3200) => window.showWindowsToast({
    appName: o,
    title: i,
    subtitle: r,
    icon: l || "assets/logo.png",
    duration: m,
    showActions: !1,
    actionLabel: "",
    appType: "fetch"
  }), window.LogicWeaverKineticDrag = hr, window.LogicWeaverMarkdownAst = fr, window.setLauncherBackground = (o) => Bo.setWallpaper(o), window.backgroundDbClear = (o) => Vs(o), window.openBackgroundHistory = () => zi.openDialog(), Ji("biliMiniPlayer", Io.machine), Ji("neteaseAuth", tt.authMachine), window.__TAB_MACHINES__ = Br();
}
const $e = ue({
  isOpen: !1,
  query: "",
  selectedIndex: 0
});
let So = null;
const Fn = {
  get state() {
    return $e;
  },
  open() {
    $e.isOpen || ($e.isOpen = !0, $e.query = "", $e.selectedIndex = 0, So = Ce.pushModalCloser(() => (this.close(), !0)));
  },
  close() {
    $e.isOpen && ($e.isOpen = !1, $e.query = "", $e.selectedIndex = 0, So && (So(), So = null));
  },
  toggle() {
    $e.isOpen ? this.close() : this.open();
  },
  setQuery(e) {
    $e.query = e, $e.selectedIndex = 0;
  },
  selectNext(e) {
    e <= 0 || ($e.selectedIndex = ($e.selectedIndex + 1) % e);
  },
  selectPrev(e) {
    e <= 0 || ($e.selectedIndex = ($e.selectedIndex - 1 + e) % e);
  },
  async executeCommand(e) {
    this.close();
    try {
      await zo.execute(e.id, void 0, "command-palette");
    } catch (t) {
      console.warn(`[CommandPalette] Failed to execute ${e.id}:`, t);
    }
  }
};
typeof window < "u" && window.addEventListener("keydown", (e) => {
  if ($i.active || e.defaultPrevented || e.isComposing || e.repeat) return;
  const t = (e.key || "").toLowerCase(), o = (e.ctrlKey || e.metaKey) && t === "k", i = e.altKey && (e.code === "Space" || t === " ");
  (o || i) && (e.preventDefault(), e.stopPropagation(), Fn.toggle());
}, !0);
function Qr(e) {
  e.register({
    id: "palette.toggle",
    title: "打开全局命令中心 (Spotlight)",
    category: "界面",
    keywords: ["命令", "palette", "spotlight", "raycast", "搜索", "cmd"],
    concurrency: "drop",
    run: () => Fn.toggle()
  }), e.register({
    id: "intro.skip",
    title: "跳过开屏动画",
    category: "界面",
    keywords: ["开屏", "启动", "skip"],
    concurrency: "drop",
    enabled: () => lt.enabled && !lt.finished,
    run: () => lt.skip("COMMAND SKIP")
  }), e.register({
    id: "notifications.clear",
    title: "关闭当前 Toast",
    category: "通知",
    keywords: ["toast", "关闭"],
    description: "只关闭浮动提示，不删除通知中心历史",
    concurrency: "drop",
    enabled: () => de.size > 0,
    run: () => de.clear()
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
    enabled: () => Ht.ready,
    run: () => Ht.refresh()
  }), e.register({
    id: "calendar.today",
    title: "日历跳转到今天",
    category: "日历",
    keywords: ["今日", "today", "日期"],
    concurrency: "drop",
    enabled: () => Ht.ready,
    run: () => Ht.goToday()
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
const Zr = {
  key: 0,
  class: "notice"
}, ea = {
  key: 1,
  class: "muted small"
}, ta = {
  key: 2,
  class: "notice"
}, oa = {
  key: 3,
  class: "notice"
}, ia = { class: "wx-cur" }, na = { class: "wx-emoji" }, sa = { class: "wx-temp" }, ra = { class: "wx-sub" }, aa = { class: "wx-rain" }, la = { class: "wx-hours" }, ca = { class: "hh" }, da = { class: "he" }, ua = { class: "ht" }, pa = { class: "wx-days" }, ha = ["open"], fa = { class: "weather-forecast-head" }, ga = { class: "weather-forecast-city-info" }, ma = { class: "weather-forecast-icon" }, wa = { id: "weather-forecast-city-title" }, ya = { class: "small muted" }, va = { class: "weather-forecast-actions" }, ba = ["title"], ka = ["title"], _a = {
  key: 0,
  class: "weather-metrics-grid"
}, xa = { class: "weather-metric-item" }, Ca = { class: "metric-label" }, La = {
  class: "metric-val",
  id: "weather-forecast-humidity"
}, Sa = { class: "weather-metric-item" }, Ta = { class: "metric-label" }, $a = {
  class: "metric-val",
  id: "weather-forecast-wind"
}, Ma = { class: "weather-metric-item" }, Ia = { class: "metric-label" }, Aa = {
  class: "metric-val",
  id: "weather-forecast-uv"
}, Ea = { class: "weather-metric-item" }, Da = { class: "metric-label" }, Pa = {
  class: "metric-val",
  id: "weather-forecast-aqi"
}, Wa = {
  class: "weather-forecast-list",
  id: "weather-forecast-days-list"
}, Na = { class: "day-date-col" }, Oa = { class: "day-name" }, Ra = { class: "day-date small muted" }, Ba = { class: "day-weather-col" }, Ha = { class: "day-emoji" }, Fa = { class: "day-cond" }, ja = { class: "day-rain-col" }, Va = {
  key: 0,
  class: "rain-tag"
}, Ka = {
  key: 1,
  class: "rain-tag empty"
}, za = { class: "day-temp-bar-col" }, Ga = { class: "low-temp" }, Ua = { class: "temp-track" }, Ya = { class: "high-temp" }, qa = { class: "weather-location-head" }, Xa = { class: "weather-location-title-row" }, Ja = { class: "weather-location-title" }, Qa = ["title"], Za = { class: "weather-input-wrapper" }, el = ["placeholder"], tl = ["title"], ol = {
  type: "submit",
  class: "weather-location-submit"
}, il = { key: 0 }, nl = { class: "weather-section-subtitle" }, sl = {
  key: 0,
  class: "weather-location-suggestions"
}, rl = ["onClick"], al = { class: "weather-suggestion-name" }, ll = { class: "weather-suggestion-sub" }, cl = {
  key: 1,
  class: "weather-suggestion-empty"
}, dl = { key: 1 }, ul = { class: "weather-section-subtitle" }, pl = { class: "weather-quick-chips-grid" }, hl = ["onClick"], fl = /* @__PURE__ */ he({
  __name: "WeatherWidget",
  setup(e) {
    const t = X(!1), o = X({ x: 0, y: 0 }), i = X(""), r = X(null), l = X(null), m = ["深圳", "武汉", "北京", "上海", "广州", "成都", "杭州", "南京", "西安", "重庆", "苏州", "天津"], v = re(() => {
      const C = i.value.trim();
      return C ? Rt.filterCities(C, 6) : [];
    });
    function a(C) {
      const V = C?.clientX ?? window.innerWidth / 2 - 140, M = C?.clientY ?? window.innerHeight / 2 - 320 / 2, L = Math.max(12, Math.min(window.innerWidth - 280 - 12, V)), _ = Math.max(12, Math.min(window.innerHeight - 320 - 12, M));
      o.value = { x: L, y: _ }, t.value = !0, i.value = "", gt(() => {
        l.value?.focus();
      });
    }
    function x() {
      t.value = !1, i.value = "";
    }
    async function I(C) {
      const D = C.trim();
      D && (x(), await Rt.changeCity(D));
    }
    function A() {
      const C = i.value.trim();
      C && I(C);
    }
    function f(C) {
      if (!t.value) return;
      const D = C.target;
      r.value && !r.value.contains(D) && x();
    }
    function T(C) {
      t.value && C.key === "Escape" && (C.preventDefault(), x());
    }
    Ke(() => {
      Je.setRefreshAction(() => {
        Rt.loadWeather();
      }), Je.setChangeLocationAction((C) => {
        a(C);
      }), Rt.loadWeather(), it(ot, () => {
        Rt.reformatCurrentWeather();
      }), window.addEventListener("pointerdown", f, !0), window.addEventListener("keydown", T, !0);
    }), kt(() => {
      window.removeEventListener("pointerdown", f, !0), window.removeEventListener("keydown", T, !0);
    });
    function g(C) {
      C.preventDefault(), a(C);
    }
    function p() {
      Je.closeForecastModal();
    }
    function b(C) {
      C.target?.id === "weather-forecast-dialog" && p();
    }
    return (C, D) => (c(), w("div", {
      class: "weather-widget-container",
      onContextmenu: g
    }, [
      s(R).state === "unconfigured" ? (c(), w("p", Zr, u(s(d)("weather.noCitySet")), 1)) : s(R).state === "loading" ? (c(), w("p", ea, u(s(d)("common.loading")), 1)) : s(R).state === "not_found" ? (c(), w("p", ta, u(s(d)("weather.cityNotFound", { city: s(R).city })), 1)) : s(R).state === "error" ? (c(), w("p", oa, u(s(R).errorMessage || s(d)("weather.loadFailed")), 1)) : s(R).state === "ready" && s(R).data ? (c(), w(ee, { key: 4 }, [
        n("div", ia, [
          n("span", na, u(s(R).data.currentEmoji), 1),
          n("span", sa, u(s(R).data.currentTemp) + "°", 1)
        ]),
        n("p", ra, u(s(R).data.subText), 1),
        n("p", aa, u(s(R).data.rainText), 1),
        n("div", la, [
          (c(!0), w(ee, null, be(s(R).data.hours, (S, B) => (c(), w("div", {
            key: B,
            class: "wx-h"
          }, [
            n("span", ca, u(S.time), 1),
            n("span", da, u(S.emoji), 1),
            n("span", ua, u(S.temp) + "°", 1)
          ]))), 128))
        ]),
        n("div", pa, [
          (c(!0), w(ee, null, be(s(R).data.days, (S, B) => (c(), w("span", { key: B }, u(S.label) + " " + u(S.emoji) + " " + u(S.tempRange), 1))), 128))
        ])
      ], 64)) : W("", !0),
      n("dialog", {
        id: "weather-forecast-dialog",
        class: "weather-forecast-dialog",
        open: s(R).forecastModalOpen,
        onClick: b
      }, [
        n("div", {
          class: "weather-forecast-shell",
          onClick: D[1] || (D[1] = U(() => {
          }, ["stop"]))
        }, [
          n("header", fa, [
            n("div", ga, [
              n("span", ma, u(s(R).data?.currentEmoji || "🌤️"), 1),
              n("div", null, [
                n("h3", wa, u(s(R).city || s(R).data?.cityName || s(d)("weather.forecastTitle")), 1),
                n("p", ya, u(s(R).data?.subText || s(d)("weather.forecastSub")), 1)
              ])
            ]),
            n("div", va, [
              n("button", {
                id: "weather-forecast-refresh-btn",
                type: "button",
                class: "weather-forecast-btn",
                title: s(d)("weather.refreshTitle"),
                onClick: D[0] || (D[0] = (S) => s(Je).refresh())
              }, u(s(d)("weather.refresh")), 9, ba),
              n("button", {
                id: "weather-forecast-close-btn",
                type: "button",
                class: "weather-forecast-close",
                title: s(d)("common.close"),
                onClick: p
              }, " ✕ ", 8, ka)
            ])
          ]),
          s(R).detailInfo ? (c(), w("div", _a, [
            n("div", xa, [
              n("span", Ca, u(s(d)("weather.metric.humidity")), 1),
              n("span", La, u(s(R).detailInfo.humidity || "50%"), 1)
            ]),
            n("div", Sa, [
              n("span", Ta, u(s(d)("weather.metric.wind")), 1),
              n("span", $a, u(s(R).detailInfo.wind || (s(ot) === "en" ? "Breeze" : "微风")), 1)
            ]),
            n("div", Ma, [
              n("span", Ia, u(s(d)("weather.metric.uv")), 1),
              n("span", Aa, u(s(R).detailInfo.uvIndex || (s(ot) === "en" ? "Moderate" : "中等")), 1)
            ]),
            n("div", Ea, [
              n("span", Da, u(s(d)("weather.metric.aqi")), 1),
              n("span", Pa, u(s(R).detailInfo.airQuality || (s(ot) === "en" ? "Good" : "良")), 1)
            ])
          ])) : W("", !0),
          n("div", Wa, [
            (c(!0), w(ee, null, be(s(R).forecastDays, (S, B) => (c(), w("div", {
              key: B,
              class: "weather-forecast-day-row forecast-day-item"
            }, [
              n("div", Na, [
                n("span", Oa, u(S.dayName), 1),
                n("span", Ra, u(S.date), 1)
              ]),
              n("div", Ba, [
                n("span", Ha, u(S.emoji), 1),
                n("span", Fa, u(S.condition), 1)
              ]),
              n("div", ja, [
                S.rainProb > 0 ? (c(), w("span", Va, "☂️ " + u(S.rainProb) + "%", 1)) : (c(), w("span", Ka, u(s(d)("weather.metric.noRain")), 1))
              ]),
              n("div", za, [
                n("span", Ga, u(S.lowTemp) + "°", 1),
                n("div", Ua, [
                  n("div", {
                    class: "temp-range-fill",
                    style: ke({
                      left: `${Math.max(0, Math.min(100, (S.lowTemp + 10) * 2))}%`,
                      width: `${Math.max(20, Math.min(80, (S.highTemp - S.lowTemp) * 6))}%`
                    })
                  }, null, 4)
                ]),
                n("span", Ya, u(S.highTemp) + "°", 1)
              ])
            ]))), 128))
          ])
        ])
      ], 8, ha),
      (c(), ne(Et, { to: "body" }, [
        t.value ? (c(), w("div", {
          key: 0,
          ref_key: "contextMenuRef",
          ref: r,
          class: "weather-location-context-menu",
          style: ke({ left: `${o.value.x}px`, top: `${o.value.y}px` }),
          onClick: D[5] || (D[5] = U(() => {
          }, ["stop"])),
          onContextmenu: D[6] || (D[6] = U(() => {
          }, ["prevent"]))
        }, [
          n("div", qa, [
            n("div", Xa, [
              n("span", Ja, u(s(d)("weather.menu.changeLocation")), 1),
              n("span", {
                class: "weather-location-curr-badge",
                title: s(R).city
              }, [
                D[7] || (D[7] = n("span", { class: "weather-curr-dot" }, null, -1)),
                at(" " + u(s(R).city || s(d)("weather.menu.unset")), 1)
              ], 8, Qa)
            ])
          ]),
          n("form", {
            class: "weather-location-form",
            onSubmit: U(A, ["prevent"])
          }, [
            n("div", Za, [
              D[8] || (D[8] = n("span", { class: "weather-input-icon" }, "🔍", -1)),
              It(n("input", {
                ref_key: "inputRef",
                ref: l,
                class: "weather-location-input",
                placeholder: s(d)("weather.menu.inputPlaceholder"),
                "onUpdate:modelValue": D[2] || (D[2] = (S) => i.value = S),
                onKeydown: D[3] || (D[3] = (S) => s(mn)(S, A)),
                autocomplete: "off"
              }, null, 40, el), [
                [Vo, i.value]
              ]),
              i.value ? (c(), w("button", {
                key: 0,
                type: "button",
                class: "weather-input-clear",
                onClick: D[4] || (D[4] = (S) => i.value = ""),
                title: s(d)("weather.menu.clearInput")
              }, "✕", 8, tl)) : W("", !0)
            ]),
            n("button", ol, u(s(d)("weather.menu.submit")), 1)
          ], 32),
          i.value.trim() ? (c(), w("div", il, [
            n("div", nl, u(s(d)("weather.menu.suggestions")), 1),
            v.value.length ? (c(), w("div", sl, [
              (c(!0), w(ee, null, be(v.value, (S) => (c(), w("button", {
                key: S.name + S.admin,
                type: "button",
                class: "weather-suggestion-item",
                onClick: (B) => I(S.name)
              }, [
                n("span", al, u(S.name), 1),
                n("span", ll, u(S.admin), 1)
              ], 8, rl))), 128))
            ])) : (c(), w("div", cl, u(s(d)("weather.menu.emptySuggestion")), 1))
          ])) : (c(), w("div", dl, [
            n("div", ul, u(s(d)("weather.menu.commonCities")), 1),
            n("div", pl, [
              (c(), w(ee, null, be(m, (S) => n("button", {
                key: S,
                type: "button",
                class: se(["weather-quick-chip", { active: s(R).city === S }]),
                onClick: (B) => I(S)
              }, u(S), 11, hl)), 64))
            ])
          ]))
        ], 36)) : W("", !0)
      ]))
    ], 32));
  }
}), jn = /* @__PURE__ */ Re(fl, [["__scopeId", "data-v-a544e8f8"]]), xi = "heroCustomMottoV1";
function gl() {
  try {
    if (typeof localStorage < "u") {
      const e = localStorage.getItem(xi);
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
const Nt = gl(), H = ue({
  loaded: !1,
  customText: Nt.customText,
  history: Nt.history,
  currentIndex: Nt.customText && Nt.history.length ? Nt.history.findIndex((e) => e.text === Nt.customText) : -1,
  menuOpen: !1,
  menuPos: { x: 0, y: 0 }
});
function ml(e) {
  return new Promise((t) => {
    typeof chrome < "u" && chrome?.storage?.local?.get ? chrome.storage.local.get([e], (o) => t(o?.[e])) : t(null);
  });
}
function wl(e, t) {
  try {
    typeof localStorage < "u" && localStorage.setItem(e, JSON.stringify(t));
  } catch {
  }
  return new Promise((o) => {
    typeof chrome < "u" && chrome?.storage?.local?.set ? chrome.storage.local.set({ [e]: t }, () => o()) : o();
  });
}
function yl(e) {
  const t = (r) => String(r).padStart(2, "0"), o = `${e.getFullYear()}-${t(e.getMonth() + 1)}-${t(e.getDate())}`, i = `${t(e.getHours())}:${t(e.getMinutes())}`;
  return { date: o, time: i };
}
const Xe = {
  async init() {
    try {
      const e = await ml(xi);
      if (e && typeof e == "object") {
        const t = Array.isArray(e.history) ? e.history : [];
        t.length >= H.history.length && (H.history = t, e.customText !== void 0 && (H.customText = e.customText));
      }
    } catch (e) {
      console.warn("[HeroMotto] Sync chrome.storage failed:", e);
    } finally {
      H.loaded = !0, H.customText && H.history.length && (H.currentIndex = H.history.findIndex(
        (e) => e.text === H.customText
      ));
    }
  },
  async persist() {
    const e = {
      customText: H.customText,
      history: H.history
    };
    await wl(xi, e);
  },
  setCustomMotto(e) {
    const t = e.trim();
    if (!t) {
      this.resetToSystem();
      return;
    }
    const { date: o, time: i } = yl(/* @__PURE__ */ new Date());
    H.customText = t;
    const r = H.history.findIndex((l) => l.text === t);
    if (r !== -1) {
      const l = H.history.splice(r, 1)[0];
      l.date = o, l.time = i, H.history.unshift(l);
    } else
      H.history.unshift({
        id: `motto_${Date.now()}`,
        date: o,
        time: i,
        text: t,
        createdAt: Date.now()
      });
    H.history.length > 50 && (H.history = H.history.slice(0, 50)), H.currentIndex = 0, this.persist();
  },
  selectHistory(e) {
    H.customText = e.text, H.currentIndex = H.history.findIndex((t) => t.id === e.id), this.closeMenu(), this.persist();
  },
  resetToSystem() {
    H.customText = null, H.currentIndex = -1, this.closeMenu(), this.persist();
  },
  deleteEntry(e) {
    const t = H.history.findIndex((o) => o.id === e);
    t !== -1 && (H.history.splice(t, 1), H.currentIndex === t && (H.history.length > 0 ? this.selectHistory(H.history[0]) : this.resetToSystem()), this.persist());
  },
  clearHistory() {
    H.history = [], this.resetToSystem();
  },
  stepHistory(e) {
    if (!H.history.length) return;
    let t = H.currentIndex + e;
    if (t < 0) {
      this.resetToSystem();
      return;
    }
    t >= H.history.length && (t = 0), this.selectHistory(H.history[t]);
  },
  openMenu(e, t) {
    H.menuPos = { x: e, y: t }, H.menuOpen = !0;
  },
  closeMenu() {
    H.menuOpen = !1;
  }
}, vl = ["title"], bl = ["placeholder"], kl = { class: "motto-content" }, _l = ["title"], xl = { class: "motto-menu-header" }, Cl = { class: "dim" }, Ll = { class: "motto-history-label" }, Sl = { class: "motto-history-list" }, Tl = {
  key: 0,
  class: "motto-history-empty dim"
}, $l = ["onClick"], Ml = { class: "motto-item-date" }, Il = ["title"], Al = ["title", "onClick"], El = /* @__PURE__ */ he({
  __name: "HeroMotto",
  setup(e) {
    const t = X(!1), o = X(""), i = X(null), r = {
      夜深了: "clock.greeting.lateNight",
      早上好: "clock.greeting.morning",
      上午好: "clock.greeting.forenoon",
      中午好: "clock.greeting.noon",
      下午好: "clock.greeting.afternoon",
      晚上好: "clock.greeting.evening",
      你好: "clock.greeting.hello"
    };
    function l(g) {
      const p = r[g];
      return p ? d(p) : g;
    }
    const m = re(() => H.customText ? l(H.customText) : le.greetingText);
    function v() {
      Xe.closeMenu(), o.value = H.customText || le.greetingText, t.value = !0, gt(() => {
        i.value?.focus(), i.value?.select();
      });
    }
    function a() {
      if (!t.value) return;
      t.value = !1;
      const g = o.value.trim();
      Xe.setCustomMotto(g), g && de.fetch(d("motto.appName"), d("motto.updated", { text: g }));
    }
    function x() {
      t.value = !1;
    }
    function I(g) {
      Li(g) || (g.key === "Enter" ? (g.preventDefault(), a()) : g.key === "Escape" && (g.preventDefault(), x()));
    }
    function A(g) {
      t.value || (g.preventDefault(), g.stopPropagation(), Xe.stepHistory(g.deltaY > 0 ? 1 : -1));
    }
    function f(g) {
      g.preventDefault(), g.stopPropagation(), Xe.openMenu(g.clientX, g.clientY);
    }
    function T(g) {
      H.menuOpen && (g.target.closest(".motto-context-menu") || Xe.closeMenu());
    }
    return Ke(() => {
      Xe.init(), window.addEventListener("click", T);
    }), kt(() => {
      window.removeEventListener("click", T);
    }), (g, p) => (c(), w(ee, null, [
      n("div", {
        class: "hero-motto-wrapper",
        title: s(d)("motto.hint"),
        onWheel: A,
        onContextmenu: f
      }, [
        t.value ? It((c(), w("input", {
          key: 0,
          ref_key: "mottoInputRef",
          ref: i,
          "onUpdate:modelValue": p[0] || (p[0] = (b) => o.value = b),
          class: "hero-motto-input",
          type: "text",
          placeholder: s(d)("motto.placeholder"),
          maxlength: "60",
          onBlur: a,
          onKeydown: I
        }, null, 40, bl)), [
          [Vo, o.value]
        ]) : (c(), w("p", {
          key: 1,
          id: "greeting",
          class: "hero-motto-text",
          style: ke({
            color: s(le).greetColor,
            textShadow: s(le).greetColor === "#0f172a" ? "none" : "0 1px 8px rgba(0, 0, 0, 0.35)"
          }),
          onClick: v
        }, [
          n("span", kl, u(m.value), 1),
          s(H).history.length > 1 ? (c(), w("span", {
            key: 0,
            class: "motto-scroll-hint",
            title: s(d)("motto.scrollHint")
          }, "⇕", 8, _l)) : W("", !0)
        ], 4))
      ], 40, vl),
      (c(), ne(Et, { to: "body" }, [
        s(H).menuOpen ? (c(), w("div", {
          key: 0,
          class: "motto-context-menu",
          style: ke({ left: `${s(H).menuPos.x}px`, top: `${s(H).menuPos.y}px` }),
          onClick: p[3] || (p[3] = U(() => {
          }, ["stop"])),
          onContextmenu: p[4] || (p[4] = U(() => {
          }, ["prevent"]))
        }, [
          n("div", xl, [
            n("span", null, u(s(d)("motto.customTitle")), 1),
            n("small", Cl, u(s(d)("motto.recordsCount", { count: s(H).history.length })), 1)
          ]),
          n("button", {
            type: "button",
            class: "motto-menu-action",
            onClick: v
          }, [
            p[5] || (p[5] = n("i", null, "✎", -1)),
            n("span", null, u(s(d)("motto.editCurrent")), 1)
          ]),
          p[8] || (p[8] = n("div", { class: "motto-menu-divider" }, null, -1)),
          n("div", Ll, u(s(d)("motto.historyLabel")), 1),
          n("div", Sl, [
            s(H).history.length ? (c(!0), w(ee, { key: 1 }, be(s(H).history, (b) => (c(), w("div", {
              key: b.id,
              class: se(["motto-history-item", { active: s(H).customText === b.text }]),
              onClick: (C) => s(Xe).selectHistory(b)
            }, [
              n("span", Ml, u(b.date), 1),
              n("span", {
                class: "motto-item-text",
                title: l(b.text)
              }, u(l(b.text)), 9, Il),
              n("button", {
                type: "button",
                class: "motto-item-del",
                title: s(d)("motto.deleteEntry"),
                onClick: U((C) => s(Xe).deleteEntry(b.id), ["stop"])
              }, "×", 8, Al)
            ], 10, $l))), 128)) : (c(), w("div", Tl, u(s(d)("motto.historyEmpty")), 1))
          ]),
          p[9] || (p[9] = n("div", { class: "motto-menu-divider" }, null, -1)),
          n("button", {
            type: "button",
            class: "motto-menu-action reset-btn",
            onClick: p[1] || (p[1] = //@ts-ignore
            (...b) => s(Xe).resetToSystem && s(Xe).resetToSystem(...b))
          }, [
            p[6] || (p[6] = n("i", null, "↻", -1)),
            n("span", null, u(s(d)("motto.resetGreeting")), 1)
          ]),
          s(H).history.length ? (c(), w("button", {
            key: 0,
            type: "button",
            class: "motto-menu-action danger-btn",
            onClick: p[2] || (p[2] = //@ts-ignore
            (...b) => s(Xe).clearHistory && s(Xe).clearHistory(...b))
          }, [
            p[7] || (p[7] = n("i", null, "🗑", -1)),
            n("span", null, u(s(d)("motto.clearAll")), 1)
          ])) : W("", !0)
        ], 36)) : W("", !0)
      ]))
    ], 64));
  }
}), Dl = /* @__PURE__ */ Re(El, [["__scopeId", "data-v-d112214f"]]), Pl = /* @__PURE__ */ he({
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
    function o(a) {
      return a < 5 ? d("clock.greeting.lateNight") : a < 9 ? d("clock.greeting.morning") : a < 12 ? d("clock.greeting.forenoon") : a < 14 ? d("clock.greeting.noon") : a < 18 ? d("clock.greeting.afternoon") : a < 23 ? d("clock.greeting.evening") : d("clock.greeting.lateNight");
    }
    function i() {
      const a = $t.state.timezone;
      if (!a || a === "local") return /* @__PURE__ */ new Date();
      try {
        const x = (/* @__PURE__ */ new Date()).toLocaleString("en-US", { timeZone: a });
        return new Date(x);
      } catch {
        return /* @__PURE__ */ new Date();
      }
    }
    function r() {
      const a = (M) => String(M).padStart(2, "0"), x = i(), I = x.getHours(), A = x.getMinutes(), f = x.getSeconds(), T = x.getFullYear(), g = x.getMonth() + 1, p = x.getDate(), b = x.getDay(), C = `${a(I)}:${a(A)}`, D = `:${a(f)}`, S = o(I), B = d(t[b]), V = d("clock.datePattern", {
        year: T,
        month: g,
        day: p,
        week: B
      });
      Ft.updateTime(C, D, S, V);
    }
    function l(a) {
      a.preventDefault(), $t.open({ clientX: a.clientX, clientY: a.clientY });
    }
    function m() {
      document.hidden ? v && (clearInterval(v), v = null) : (r(), v || (v = setInterval(r, 1e3)));
    }
    let v = null;
    return $t.initPreferences(), r(), Ke(() => {
      $t.initPreferences(), it(ot, () => {
        r();
      }), mt.activeId || (r(), v = setInterval(r, 1e3)), document.addEventListener("visibilitychange", m);
    }), it(
      () => mt.activeId,
      (a) => {
        a ? v && (clearInterval(v), v = null) : document.hidden || (r(), v || (v = setInterval(r, 1e3)));
      }
    ), kt(() => {
      v && (clearInterval(v), v = null), document.removeEventListener("visibilitychange", m);
    }), (a, x) => (c(), w("div", {
      class: "hero-clock-vue-container",
      onContextmenu: l
    }, [
      n("p", {
        id: "clock",
        class: "clock",
        style: ke({
          fontFamily: s(le).fontFamily,
          color: s(le).colorHex,
          textShadow: s(le).colorHex === "#0f172a" ? "none" : "0 2px 14px rgba(0, 0, 0, 0.45)"
        })
      }, [
        at(u(s(le).timeText), 1),
        n("span", {
          id: "secs",
          style: ke({ color: s(le).colorHex })
        }, u(s(le).secsText), 5)
      ], 4),
      n("p", {
        id: "date",
        class: "date",
        style: ke({
          color: s(le).dateColor,
          textShadow: s(le).dateColor === "#0f172a" ? "none" : "0 1px 8px rgba(0, 0, 0, 0.35)"
        })
      }, u(s(le).dateText), 5)
    ], 32));
  }
}), Vn = /* @__PURE__ */ Re(Pl, [["__scopeId", "data-v-16c004bb"]]), Wl = {
  key: 0,
  class: "home-music-degraded-box"
}, Nl = { class: "degraded-badge-row" }, Ol = { class: "degraded-status" }, Rl = { class: "degraded-host-tag" }, Bl = { class: "degraded-title-row" }, Hl = ["title"], Fl = { class: "degraded-track-artist" }, jl = ["title"], Vl = { class: "degraded-progress-bar-wrap" }, Kl = { class: "degraded-actions" }, zl = { class: "degraded-time" }, Gl = { class: "home-vinyl-box" }, Ul = ["title"], Yl = ["src", "alt"], ql = { class: "home-music-right" }, Xl = ["title"], Jl = {
  id: "home-music-artist",
  class: "home-music-meta-artist"
}, Ql = ["title"], Zl = { class: "home-music-seek-row" }, ec = {
  id: "home-music-cur",
  class: "home-music-time"
}, tc = ["value"], oc = {
  id: "home-music-dur",
  class: "home-music-time"
}, ic = { class: "home-music-actions" }, nc = ["title"], sc = ["title"], rc = ["title"], ac = ["title"], lc = /* @__PURE__ */ he({
  __name: "HomeMusicCard",
  setup(e) {
    Ke(() => {
      setTimeout(() => {
        Ws();
      }, 200);
    });
    const t = re(() => Es.visible), o = re(() => !te.title || te.title === "点击播放" ? d("home.music.defaultTitle") : te.title), i = re(() => !te.artist || te.artist === "作者" ? d("home.music.defaultArtist") : te.artist), r = re(() => te.mode === "shuffle" ? "🔀" : te.mode === "one" ? "🔂" : "🔁");
    function l(v) {
      const a = v.target, x = Number(a.value);
      tt.seek(x);
    }
    function m() {
      tt.update({ coverUrl: "" });
    }
    return (v, a) => (c(), w("div", {
      id: "home-music-player-view",
      class: se(["home-music-player-view", { "is-degraded": t.value }])
    }, [
      t.value ? (c(), w("div", Wl, [
        n("div", Nl, [
          a[6] || (a[6] = n("span", { class: "degraded-icon" }, "🎧", -1)),
          n("strong", Ol, u(s(d)("home.music.backgroundListening")), 1),
          n("span", Rl, u(s(d)("home.music.workspaceReady")), 1)
        ]),
        n("div", Bl, [
          n("h3", {
            class: "degraded-track-title",
            title: o.value
          }, u(o.value || s(d)("home.music.standby")), 9, Hl),
          n("p", Fl, u(i.value), 1),
          n("p", {
            class: "home-music-current-lyric",
            title: s(te).currentLyric || ""
          }, u(s(te).currentLyric || "暂无歌词"), 9, jl)
        ]),
        n("div", Vl, [
          n("div", {
            class: "degraded-progress-bar-fill",
            style: ke({ width: s(te).progressPercent + "%" })
          }, null, 4)
        ]),
        n("div", Kl, [
          n("button", {
            type: "button",
            class: "degraded-btn",
            onClick: a[0] || (a[0] = (x) => s(tt).togglePlay())
          }, u(s(te).playing ? s(d)("home.music.pause") : s(d)("home.music.play")), 1),
          n("span", zl, u(s(te).formattedCurrent) + " / " + u(s(te).formattedDuration), 1)
        ])
      ])) : (c(), w(ee, { key: 1 }, [
        n("div", Gl, [
          n("div", {
            id: "home-vinyl-needle",
            class: se(["home-vinyl-needle", { playing: s(te).playing }])
          }, [...a[7] || (a[7] = [
            no('<svg viewBox="0 0 32 52" fill="none" data-v-08356072><circle cx="26" cy="4" r="3.5" fill="#e2e8f0" stroke="#475569" stroke-width="1.5" data-v-08356072></circle><circle cx="26" cy="4" r="1.5" fill="#64748b" data-v-08356072></circle><path d="M26 4 L14 26 L11 44" stroke="#cbd5e1" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" data-v-08356072></path><rect x="7" y="42" width="8" height="9" rx="1.5" fill="#f43f5e" transform="rotate(-15 11 46)" data-v-08356072></rect></svg>', 1)
          ])], 2),
          n("div", {
            id: "home-vinyl-disc",
            class: se(["home-vinyl-disc", { playing: s(te).playing }]),
            title: s(d)("home.music.togglePlay"),
            onClick: a[1] || (a[1] = (x) => s(tt).togglePlay())
          }, [
            s(te).coverUrl ? (c(), w("img", {
              key: 0,
              id: "home-vinyl-cover",
              class: "home-vinyl-cover",
              referrerpolicy: "no-referrer",
              src: s(te).coverUrl,
              alt: s(d)("home.music.coverAlt"),
              onError: m
            }, null, 40, Yl)) : W("", !0),
            a[8] || (a[8] = n("div", { class: "home-vinyl-hole" }, null, -1))
          ], 10, Ul)
        ]),
        n("div", ql, [
          n("h3", {
            id: "home-music-title",
            class: "home-music-meta-title",
            title: o.value
          }, u(o.value), 9, Xl),
          n("p", Jl, u(i.value), 1),
          n("p", {
            class: "home-music-current-lyric",
            title: s(te).currentLyric || ""
          }, u(s(te).currentLyric || "暂无歌词"), 9, Ql),
          n("div", Zl, [
            n("span", ec, u(s(te).formattedCurrent), 1),
            n("input", {
              id: "home-music-seek",
              class: "home-music-seek-bar",
              type: "range",
              min: "0",
              max: "100",
              value: s(te).progressPercent,
              onInput: l
            }, null, 40, tc),
            n("span", oc, u(s(te).formattedDuration), 1)
          ]),
          n("div", ic, [
            n("button", {
              id: "home-music-prev",
              class: "home-music-btn",
              type: "button",
              title: s(d)("home.music.prevTrack"),
              onClick: a[2] || (a[2] = (x) => s(tt).prev())
            }, " ⏮ ", 8, nc),
            n("button", {
              id: "home-music-play",
              class: "home-music-btn play-btn",
              type: "button",
              title: s(d)("home.music.togglePlay"),
              onClick: a[3] || (a[3] = (x) => s(tt).togglePlay())
            }, u(s(te).playing ? "⏸" : "▶"), 9, sc),
            n("button", {
              id: "home-music-next",
              class: "home-music-btn",
              type: "button",
              title: s(d)("home.music.nextTrack"),
              onClick: a[4] || (a[4] = (x) => s(tt).next())
            }, " ⏭ ", 8, rc),
            n("button", {
              id: "home-music-mode",
              class: "home-music-btn",
              type: "button",
              title: s(d)("home.music.playMode"),
              onClick: a[5] || (a[5] = (x) => s(tt).cycleMode())
            }, u(r.value), 9, ac)
          ])
        ])
      ], 64))
    ], 2));
  }
}), Kn = /* @__PURE__ */ Re(lc, [["__scopeId", "data-v-08356072"]]), cc = {
  class: "launcher-group launcher-aihot launcher-todoist size-large",
  id: "launcher-todoist"
}, dc = { class: "card-head aihot-home-head" }, uc = { class: "title" }, pc = {
  class: "aihot-home-body",
  id: "aihot-home-body"
}, hc = {
  key: 0,
  class: "muted small"
}, fc = {
  key: 1,
  class: "notice small"
}, gc = {
  key: 2,
  class: "muted small aihot-home-empty"
}, mc = {
  key: 3,
  class: "aihot-home-rich-list"
}, wc = ["href", "title", "onClick"], yc = { class: "aihot-home-rich-main" }, vc = { class: "aihot-home-rich-title" }, bc = {
  key: 0,
  class: "aihot-home-rich-summary"
}, kc = { class: "aihot-home-rich-meta" }, _c = { class: "aihot-home-rich-meta-left" }, xc = {
  key: 0,
  class: "aihot-home-rich-tag"
}, Cc = { class: "aihot-home-rich-source" }, Lc = { class: "aihot-home-rich-time" }, Sc = 6, Tc = /* @__PURE__ */ he({
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
    }, o = X([]), i = X(0), r = X(!0), l = X("");
    function m(p) {
      return ot.value === "en" && p.originalTitle ? p.originalTitle : p.title;
    }
    function v(p) {
      const b = p.source?.name || p.sourceName || "AI HOT";
      return ot.value === "en" && b.includes("：") ? b.split("：")[0].trim() : b;
    }
    function a(p) {
      if (!p.category) return "";
      const b = t[p.category];
      if (b)
        try {
          return d(b);
        } catch {
        }
      return p.category;
    }
    const x = re(() => ot.value !== "en" ? o.value : [...o.value].sort((p, b) => {
      const C = !!(p.originalTitle && /[a-zA-Z]{3,}/.test(p.originalTitle)), D = !!(b.originalTitle && /[a-zA-Z]{3,}/.test(b.originalTitle));
      return C && !D ? -1 : !C && D ? 1 : 0;
    }));
    function I(p) {
      const b = p.publishedAt || p.published || "";
      if (!b) return ot.value === "en" ? "Latest" : "最新";
      const C = Number(b), D = Number.isFinite(C) && C > 0 ? new Date(C > 1e12 ? C : C * 1e3) : new Date(b);
      if (isNaN(D.getTime())) return String(b).slice(0, 16) || (ot.value === "en" ? "Latest" : "最新");
      const S = (P) => String(P).padStart(2, "0"), B = D.getFullYear(), V = S(D.getMonth() + 1), M = S(D.getDate()), L = S(D.getHours()), _ = S(D.getMinutes());
      return `${B}-${V}-${M} ${L}:${_}`;
    }
    const A = [
      {
        id: "fb-1",
        title: "DeepSeek 发布新一代推理与开源模型架构，算力能效与推理表现获全球瞩目",
        originalTitle: "DeepSeek Unveils Next-Generation Open Reasoning Architecture",
        summary: "新一代模型在长文本理解、复杂数学推导与代码生成领域实现大幅跃升，全面革新开源生态格局与部署成本。",
        category: "ai-models",
        sourceName: "AI Research",
        publishedAt: new Date(Date.now() - 36e5).toISOString(),
        links: { original: "https://aihot.news" },
        url: "https://aihot.news"
      },
      {
        id: "fb-2",
        title: "Anthropic 正式推出 Claude 3.7 Sonnet 混合推理模型与交互演进",
        originalTitle: "Anthropic Releases Claude 3.7 Sonnet with Hybrid Reasoning",
        summary: "业界首创结合瞬时直答与长思维链展开模式，兼顾极速响应与深层次逻辑推理，编码能力刷新多项基准。",
        category: "ai-models",
        sourceName: "Anthropic Blog",
        publishedAt: new Date(Date.now() - 72e5).toISOString(),
        links: { original: "https://aihot.news" },
        url: "https://aihot.news"
      },
      {
        id: "fb-3",
        title: "OpenAI 发布 GPT-4.5 预研与多模态感知前沿技术进展报告",
        originalTitle: "OpenAI Frontier Multimodal & System Progress Technical Brief",
        summary: "更大规模的世界知识储备与常识对齐，进一步缩减幻觉率，带来更自然的上下文情感感知与工具调用精度。",
        category: "industry",
        sourceName: "OpenAI Research",
        publishedAt: new Date(Date.now() - 108e5).toISOString(),
        links: { original: "https://aihot.news" },
        url: "https://aihot.news"
      },
      {
        id: "fb-4",
        title: "具身智能开源机器人开源框架发布，多模态大模型进入物理现实交互新阶段",
        originalTitle: "End-to-End Embodied AI Framework Advances Dexterous Manipulation",
        summary: "从视觉语言感知到肢体灵巧操作的端到端神经驱动方案，大幅降低机器人动作泛化与仿真学习门槛。",
        category: "robot",
        sourceName: "Robotics Weekly",
        publishedAt: new Date(Date.now() - 144e5).toISOString(),
        links: { original: "https://aihot.news" },
        url: "https://aihot.news"
      },
      {
        id: "fb-5",
        title: "AI 编程智能体大规模落地开发团队，软件工程流水线迈向全面自动化",
        originalTitle: "Autonomous Coding Agents Reshape Modern Software Engineering Pipelines",
        summary: "代码检索、自动修复测试用例、全景架构审查及一键重构工具已无缝嵌入主流 IDE 与 Git 工作流。",
        category: "code",
        sourceName: "Hacker News",
        publishedAt: new Date(Date.now() - 18e6).toISOString(),
        links: { original: "https://aihot.news" },
        url: "https://aihot.news"
      },
      {
        id: "fb-6",
        title: "多模态大模型芯片与集群能效优化报告：端侧低功耗推理成为新焦点",
        originalTitle: "Edge LLM Acceleration & Speculative Decoding Efficiency Report",
        summary: "混合量化与投机解码技术走向成熟，在普通消费级终端与嵌入式边缘硬件上实现高质量全尺寸模型流畅运行。",
        category: "hardware",
        sourceName: "Semiconductor Insights",
        publishedAt: new Date(Date.now() - 216e5).toISOString(),
        links: { original: "https://aihot.news" },
        url: "https://aihot.news"
      }
    ];
    function f() {
      const b = (typeof window < "u" ? window : null)?.LogicWeaverAihotFeed?.getState?.()?.feedArticles;
      if (Array.isArray(b) && b.length)
        return b;
      const C = [
        "newtab_aihot_items_v2",
        "lw-aihot-cached-feed-all-24h-v1",
        "lw-aihot-cached-feed-v1"
      ];
      for (const D of C)
        try {
          const S = localStorage.getItem(D);
          if (S) {
            const B = JSON.parse(S);
            if (Array.isArray(B) && B.length) return B;
            if (B && Array.isArray(B.items) && B.items.length) return B.items;
          }
        } catch {
        }
      return [];
    }
    async function T(p = !1) {
      if (!p && o.value.length > 0) return;
      const b = f();
      b.length ? (o.value = b, r.value = !1) : o.value.length || (o.value = [...A], r.value = !1);
      try {
        const C = await sr.fetchQuickSelectedItems(24, AbortSignal.timeout(5e3));
        if (C.length) {
          o.value = C, i.value = 0, l.value = "";
          try {
            localStorage.setItem("newtab_aihot_items_v2", JSON.stringify(C.slice(0, 30)));
          } catch {
          }
        }
      } catch {
        o.value.length || (o.value = [...A]);
      } finally {
        r.value = !1;
      }
    }
    function g(p, b) {
      if (b.ctrlKey || b.metaKey || b.shiftKey || b.button === 1) return;
      b.preventDefault();
      const C = p.links?.original || p.links?.aihot || p.url || "#";
      Mi.openArticle(
        {
          id: p.id,
          title: m(p),
          summary: p.summary,
          sourceName: v(p),
          published: I(p),
          url: C
        },
        ""
      );
    }
    return Ke(() => {
      T();
    }), (p, b) => (c(), w("section", cc, [
      n("header", dc, [
        b[0] || (b[0] = n("span", { class: "bar cyan" }, null, -1)),
        n("strong", uc, u(s(d)("aihot.card.title")), 1)
      ]),
      n("div", pc, [
        r.value && !x.value.length ? (c(), w("p", hc, u(s(d)("aihot.card.loading")), 1)) : l.value && !x.value.length ? (c(), w("p", fc, u(l.value), 1)) : x.value.length ? (c(), w("div", mc, [
          (c(!0), w(ee, null, be(x.value.slice(i.value, i.value + Sc), (C, D) => (c(), w("a", {
            key: C.id || C.title,
            class: "aihot-home-rich-card",
            href: C.links?.original || C.links?.aihot || C.url || "#",
            target: "_blank",
            rel: "noreferrer",
            title: `${m(C)}
${C.summary || ""}
${s(d)("aihot.card.viewInReader")}`,
            onClick: (S) => g(C, S)
          }, [
            n("span", {
              class: se(["aihot-home-rich-rank", { top: i.value + D < 3 }])
            }, u(i.value + D + 1), 3),
            n("div", yc, [
              n("h3", vc, u(m(C)), 1),
              C.summary ? (c(), w("p", bc, u(C.summary), 1)) : W("", !0),
              n("div", kc, [
                n("div", _c, [
                  a(C) ? (c(), w("span", xc, u(a(C)), 1)) : W("", !0),
                  n("span", Cc, u(v(C)), 1)
                ]),
                n("time", Lc, u(I(C)), 1)
              ])
            ])
          ], 8, wc))), 128))
        ])) : (c(), w("p", gc, u(s(d)("aihot.card.empty")), 1))
      ])
    ]));
  }
}), $c = /* @__PURE__ */ Re(Tc, [["__scopeId", "data-v-81649349"]]), De = ue({
  showWeather: !0,
  showSites: !0,
  showHomeNews: !0,
  showHomePlayer: !0,
  showBili: !0,
  showTodo: !0,
  showBookmarkPanel: !0
}), Mc = ["aria-hidden", "inert"], Ic = ["aria-label"], Ac = ["disabled", "aria-pressed"], Ec = ["disabled", "aria-pressed"], Dc = ["aria-label"], Pc = ["data-page", "title", "onClick", "onContextmenu", "onDragover", "onDrop"], Wc = {
  key: 0,
  id: "bookmark-board-header",
  class: "launcher-page-tabs"
}, Nc = ["data-page"], Oc = ["href", "title", "data-launcher-id", "onPointerdown", "onClick", "onContextmenu"], Rc = ["title", "data-launcher-folder", "onPointerdown", "onDragstart", "onDrop", "onClick", "onContextmenu"], Bc = ["title", "onClick"], Hc = {
  class: "launcher-folder-count",
  hidden: ""
}, Fc = {
  class: "launcher-empty",
  key: "empty-msg"
}, jc = { class: "launcher-media-stack" }, Vc = { class: "launcher-folder-preview" }, Kc = { class: "launcher-folder-label launcher-title" }, zc = { class: "launcher-label launcher-title" }, Gc = /* @__PURE__ */ he({
  __name: "FavoriteSites",
  setup(e) {
    const t = F(() => import("./BookmarkBoard-DLkq1fbg.js")), o = F(() => import("./LauncherBookGuideDialog-BztpRGim.js")), i = re({
      get: () => ae.sitesView || "sites",
      set: (h) => xe.setSitesView(h)
    }), r = X(!1), l = X(!1);
    function m() {
      l.value = !0;
    }
    function v() {
      l.value = !1;
    }
    function a() {
      ye(), p = !1, pe = !1;
    }
    Ke(() => {
      typeof chrome < "u" && chrome.storage?.local ? chrome.storage.local.get("defaultSitesView").then((y) => {
        i.value = y.defaultSitesView === "sites" ? "sites" : "bookmarks";
      }) : i.value = "bookmarks", xe.setExternalDragHandler(L), xe.setExternalDropHandler(_), window.addEventListener("blur", a), window.addEventListener("pagehide", a), document.addEventListener("visibilitychange", a);
      const h = window;
      ae.hasBili && typeof h.ensureLauncherMediaCards == "function" && h.ensureLauncherMediaCards();
    });
    const x = X(!1), I = X(""), A = X(null), f = X(null), T = X(null), g = X(null);
    let p = !1, b = 0, C = 0, D = 0, S = "", B = 0, V = "", M = 0;
    function L(h) {
      if (i.value !== "sites") return;
      if (!h || pt.isOpen) {
        g.value && (g.value = null), V = "";
        return;
      }
      const y = document.elementsFromPoint(h.clientX, h.clientY);
      if (!y.some(
        (Ae) => Ae.classList.contains("launcher-site-items") || !!Ae.closest?.(".launcher-site-items")
      )) {
        g.value && (g.value = null), V = "";
        return;
      }
      const $ = y.find((Ae) => Ae.classList.contains("launcher-link") && Ae.getAttribute("data-launcher-id") !== String(h.link.id) || Ae.classList.contains("launcher-folder"));
      if (!$) return;
      const G = $.classList.contains("launcher-link"), ce = G ? $.getAttribute("data-launcher-id") : null, Te = G ? null : $.getAttribute("data-launcher-folder"), q = G ? `link-${ce}` : `folder-${Te}`, J = $.getBoundingClientRect(), Ne = J.left + J.width / 2, qo = J.top + J.height / 2, Yt = Math.hypot(h.clientX - Ne, h.clientY - qo), Dt = Date.now();
      if (Yt > Math.max(J.width, J.height) * 0.55 || q === V && Dt - M < 180) return;
      const Pt = Yo.value.filter(
        (Ae) => Ae.type !== "link" || String(Ae.link.id) !== String(h.link.id)
      ), st = [...g.value || Pt], wt = st.findIndex(
        (Ae) => Ae.type === "link" && String(Ae.link.id) === String(h.link.id)
      ), yt = st.findIndex((Ae) => Ae.key === q);
      if (yt < 0) return;
      const Ge = {
        key: `link-${h.link.id}`,
        type: "link",
        link: h.link
      };
      wt >= 0 ? wt !== yt && (st.splice(wt, 1), st.splice(yt, 0, Ge), g.value = st, V = q, M = Dt) : (st.splice(yt, 0, Ge), g.value = st, V = q, M = Dt);
    }
    async function _(h) {
      if (i.value !== "sites" || pt.isOpen) return !1;
      if (g.value) {
        const y = g.value.map((k) => ({
          type: k.type,
          id: k.type === "link" ? String(k.link.id) : void 0,
          groupName: k.type === "folder" ? k.folder.groupName : void 0
        }));
        return await Me.moveLinkTo(String(h.id), ae.activePage, "常用网站"), await Me.reorderPageItems(ae.activePage, y), g.value = null, V = "", !0;
      }
      return !1;
    }
    const P = ue({
      visible: !1,
      x: 0,
      y: 0,
      type: "link",
      link: null,
      folder: null,
      offsetX: 34,
      offsetY: 38
    });
    let _e = null, N = 0, O = 0, E = null, j = null, pe = !1;
    function we(h, y) {
      if (y.button !== 0) return;
      _e = y.pointerId, N = y.clientX, O = y.clientY, C = y.clientX, D = y.clientY, E = String(h.id), j = null, pe = !1;
      const k = y.currentTarget.getBoundingClientRect();
      P.offsetX = y.clientX - k.left, P.offsetY = y.clientY - k.top, P.type = "link", P.link = h, P.folder = null, window.addEventListener("pointermove", ze, { passive: !1 }), window.addEventListener("pointerup", Ie), window.addEventListener("pointercancel", Ie);
    }
    function nt(h, y, k) {
      if (k.button !== 0 || k.target.closest(".launcher-folder-del-btn")) return;
      _e = k.pointerId, N = k.clientX, O = k.clientY, C = k.clientX, D = k.clientY, E = null, j = h, pe = !1;
      const $ = k.currentTarget.getBoundingClientRect();
      P.offsetX = k.clientX - $.left, P.offsetY = k.clientY - $.top, P.type = "folder", P.folder = {
        groupName: h,
        size: Se(h),
        links: y?.links || []
      }, P.link = null, window.addEventListener("pointermove", ze, { passive: !1 }), window.addEventListener("pointerup", Ie), window.addEventListener("pointercancel", Ie);
    }
    let Be = 0, ct = null;
    function dt() {
      cancelAnimationFrame(Be), Be = 0, ct = null;
    }
    function ze(h) {
      h.pointerId === _e && (pe && h.cancelable && h.preventDefault(), ct = h, !Be && (Be = requestAnimationFrame(() => {
        Be = 0;
        const y = ct;
        ct = null, y && We(y);
      })));
    }
    function We(h) {
      if (h.pointerId !== _e || !E && !j) return;
      const y = Math.hypot(h.clientX - N, h.clientY - O);
      if (!pe && y > rr && (pe = !0, p = !0, E ? f.value = E : j && (T.value = j)), !pe) return;
      (P.link || P.folder) && (P.visible = !0, P.x = h.clientX - P.offsetX, P.y = h.clientY - P.offsetY);
      const k = document.elementsFromPoint(h.clientX, h.clientY);
      if (Ni()) {
        const q = k.some(
          (Ne) => Ne.id === "launcher-folder-dialog" || !!Ne.closest?.("#launcher-folder-dialog")
        ), J = document.querySelector("#launcher-folder-dialog");
        if (q && J) {
          J.classList.add("drop-hover-valid"), pt.dropHoverValid = !0;
          return;
        } else
          J?.classList.remove("drop-hover-valid"), pt.dropHoverValid = !1;
        g.value = null;
        return;
      }
      const G = g.value || Yo.value, ce = E ? `link-${E}` : `folder-${j}`;
      if (G.length) {
        const q = k.find((J) => {
          if (J.classList.contains("launcher-link")) {
            const Ne = J.getAttribute("data-launcher-id");
            return Ne && `link-${Ne}` !== ce;
          }
          if (J.classList.contains("launcher-folder")) {
            const Ne = J.getAttribute("data-launcher-folder");
            return Ne && `folder-${Ne}` !== ce;
          }
          return !1;
        });
        if (q) {
          const J = q.classList.contains("launcher-link"), Ne = J ? q.getAttribute("data-launcher-id") : null, qo = J ? null : q.getAttribute("data-launcher-folder"), Yt = J ? `link-${Ne}` : `folder-${qo}`, Dt = q.getBoundingClientRect();
          let Pt = !0;
          E && !J && (ar(Dt, h.clientX, h.clientY) ? (Pt = !1, q.classList.add("drop-target")) : q.classList.remove("drop-target"));
          const st = Date.now();
          if (lr(Dt, h.clientX, h.clientY) || (Pt = !1), Yt === S && st - B < cr && (Pt = !1), Pt) {
            document.querySelectorAll(".launcher-folder.drop-target").forEach((Ge) => Ge.classList.remove("drop-target"));
            const wt = G.findIndex((Ge) => Ge.key === ce), yt = G.findIndex((Ge) => Ge.key === Yt);
            if (wt >= 0 && yt >= 0 && wt !== yt) {
              const Ge = G.slice(), Ae = Ge.splice(wt, 1)[0];
              Ge.splice(yt, 0, Ae), g.value = Ge, S = Yt, B = st;
            }
          }
        }
      }
      const Te = k.find((q) => q.classList.contains("launcher-page-tab"));
      if (Te) {
        const q = Te.getAttribute("data-page");
        q && q !== ae.activePage && Te.classList.add("drop-target");
      } else
        document.querySelectorAll(".launcher-page-tab.drop-target").forEach((q) => q.classList.remove("drop-target"));
    }
    async function Ie(h) {
      if (h.pointerId === _e) {
        dt(), h.type === "pointercancel" ? ye() : We(h), window.removeEventListener("pointermove", ze), window.removeEventListener("pointerup", Ie), window.removeEventListener("pointercancel", Ie);
        try {
          if (pe) {
            b = Date.now(), p = !1;
            const y = document.elementsFromPoint(h.clientX, h.clientY);
            if (document.querySelectorAll(".launcher-page-tab.drop-target").forEach(($) => $.classList.remove("drop-target")), document.querySelectorAll(".launcher-folder.drop-target").forEach(($) => $.classList.remove("drop-target")), Ni() && pt.activeFolder) {
              if (y.some(
                (G) => G.id === "launcher-folder-dialog" || !!G.closest?.("#launcher-folder-dialog")
              )) {
                const ce = y.find((Te) => Te.hasAttribute("data-child-folder"))?.getAttribute("data-child-folder") || pt.activeFolder;
                E ? await Me.moveLinkTo(E, void 0, ce) : j && await Me.moveFolderInto(j, ce);
              }
              return;
            }
            const k = y.find(($) => $.classList.contains("launcher-page-tab"));
            if (k) {
              const $ = k.getAttribute("data-page");
              if ($) {
                E ? (await Me.moveLinkTo(E, $, "常用网站"), await Me.setPage($)) : j && await Me.moveFolderToPage(j, $), ye();
                return;
              }
            }
            if (E) {
              const $ = y.find((G) => G.classList.contains("launcher-folder"));
              if ($) {
                const G = $.getAttribute("data-launcher-folder");
                if (G) {
                  await Me.moveLinkTo(E, ae.activePage, G), ye();
                  return;
                }
              }
            }
            if (g.value) {
              const $ = g.value.map((G) => ({
                type: G.type,
                id: G.type === "link" ? String(G.link.id) : void 0,
                groupName: G.type === "folder" ? G.folder.groupName : void 0
              }));
              await Me.reorderPageItems(ae.activePage, $);
            }
          }
        } catch (y) {
          de.show({ appName: "常用网站", title: "移动未完成", message: y instanceof Error ? y.message : "请刷新核对，未自动重试。" });
        } finally {
          ye();
        }
      }
    }
    function ye() {
      dt(), _e = null, E = null, j = null, pe = !1, p = !1, f.value = null, T.value = null, g.value = null, P.visible = !1, P.link = null, P.folder = null, S = "", document.querySelector("#launcher-folder-dialog")?.classList.remove("drop-hover-valid"), pt.dropHoverValid = !1, window.removeEventListener("pointermove", ze), window.removeEventListener("pointerup", Ie), window.removeEventListener("pointercancel", Ie);
    }
    kt(() => {
      xe.setExternalDragHandler(null), xe.setExternalDropHandler(null), ye(), window.removeEventListener("blur", a), window.removeEventListener("pagehide", a), document.removeEventListener("visibilitychange", a), window.removeEventListener("pointermove", ze), window.removeEventListener("pointerup", Ie), window.removeEventListener("pointercancel", Ie);
    });
    function He(h) {
      const y = ae.pageLabels;
      return y && y[h] ? y[h] : h || "常用网站";
    }
    function et(h, y) {
      const k = String(h.page || "").trim(), $ = String(y).trim(), G = ae.pageLabels || {}, ce = !k || k === "常用网站" || k === "默认";
      if (!$ || $ === "常用网站" || $ === "默认") return ce;
      if (ce) return !1;
      if (k === $) return !0;
      const q = G[k] || k, J = G[$] || $;
      return q === J || k === J || q === $;
    }
    function Se(h) {
      const y = ae.groupSizes;
      return y && y[h] === "large" ? "large" : "small";
    }
    function fo(h) {
      return h === "large" ? 9 : 4;
    }
    function go(h, y) {
      const k = fo(y), $ = h.length > k ? k - 1 : k;
      return h.slice(0, $);
    }
    const Yo = re(() => {
      const h = ae.activePage || "常用网站", k = ae.links.filter(
        (q) => et(q, h)
      ), $ = /* @__PURE__ */ new Map();
      k.forEach((q) => {
        const J = q.group || "常用网站";
        J !== "常用网站" && ($.has(J) || $.set(J, []), $.get(J).push(q));
      });
      const G = /* @__PURE__ */ new Set(), ce = [];
      k.forEach((q) => {
        const J = q.group || "常用网站";
        Ri(ae.folders, J) || (J === "常用网站" ? ce.push({ key: `link-${q.id}`, type: "link", link: q }) : G.has(J) || (G.add(J), ce.push({
          key: `folder-${J}`,
          type: "folder",
          folder: {
            groupName: J,
            pageName: h,
            links: $.get(J) || []
          }
        })));
      });
      const Te = ae.folders;
      return Te && Object.entries(Te).forEach(([q, J]) => {
        if (Ri(ae.folders, q)) return;
        const Ne = J?.page || "常用网站";
        (Ne === h || h === "常用网站" && Ne === "默认") && !G.has(q) && (G.add(q), ce.push({
          key: `folder-${q}`,
          type: "folder",
          folder: {
            groupName: q,
            pageName: h,
            links: $.get(q) || []
          }
        }));
      }), ce;
    }), Di = re(() => g.value && g.value.length ? g.value : Yo.value), qn = re(() => {
      const h = ae.activePage || "常用网站", y = He(h);
      return y === "默认" || h === "常用网站" ? "还没有快捷入口，点击“编辑入口”后添加。" : `“${y}”还是空的，把网站拖到这里。`;
    });
    function Pi(h) {
      g.value = null, f.value = null, T.value = null, xe.switchPage(h);
    }
    function Xn() {
      x.value = !0, I.value = "", gt(() => {
        A.value?.focus();
      });
    }
    function Wi() {
      if (!x.value) return;
      const h = I.value.trim();
      x.value = !1, h && xe.addPage(h);
    }
    function Jn(h) {
      Li(h) || (h.key === "Enter" ? (h.preventDefault(), Wi()) : h.key === "Escape" && (x.value = !1));
    }
    function Qn(h, y) {
      xe.openPageMenu(h, y);
    }
    function Zn(h) {
      const y = h.target;
      if (!y || y.closest(".launcher-link") || y.closest(".launcher-folder") || y.closest(".launcher-page-tab") || y.closest("button") || y.closest("input"))
        return;
      h.preventDefault();
      const k = ae.activePage || "常用网站";
      Ci.openBlankMenu(k, h.clientX, h.clientY);
    }
    function es(h) {
      i.value === "sites" && (!h.shiftKey || ae.pages.length < 2 || (h.preventDefault(), h.deltaY > 0 || h.deltaX > 0 ? xe.nextPage() : xe.prevPage()));
    }
    function ts(h) {
      h.target.closest(".launcher-page-tab") || h.stopPropagation();
    }
    function os(h) {
      h.button === 0 && (C = h.clientX, D = h.clientY);
    }
    function is(h, y) {
      if (y.preventDefault(), y.stopPropagation(), Pe.isEditingShortcuts) {
        Pe.handleLinkSelection(h);
        return;
      }
      _e || (p = !1), !(Math.hypot(y.clientX - C, y.clientY - D) >= 6 || p || Date.now() - b < 600) && xe.openLink(h, y);
    }
    function ns(h, y) {
      xe.openLinkMenu(h, y);
    }
    function ss(h, y) {
      if (_e || (p = !1), p || Date.now() - b < 450) {
        y.preventDefault(), y.stopPropagation();
        return;
      }
      xe.openFolder(h, y);
    }
    function rs(h, y, k) {
      xe.openFolderMenu(h, y, k);
    }
    function as(h) {
      xe.deleteFolder(h);
    }
    function ls(h, y) {
      const k = Array.from(y.dataTransfer?.types || []);
      if (!k.includes("application/x-newtab-launcher") && !k.includes("application/x-newtab-bookmark") && !k.includes("text/uri-list") && !k.includes("text/plain")) return;
      y.preventDefault(), y.dataTransfer && (y.dataTransfer.dropEffect = "move"), ae.activePage !== h && Pi(h), y.currentTarget?.classList.add("drop-target");
    }
    function cs(h) {
      h.currentTarget?.classList.remove("drop-target");
    }
    async function ds(h, y) {
      y.currentTarget?.classList.remove("drop-target");
      let $ = "";
      const G = y.dataTransfer?.getData("application/x-newtab-launcher");
      if (G)
        try {
          $ = String(JSON.parse(G)?.id || "");
        } catch {
        }
      if (!$ && (f.value || window.__activeLauncherLink) && ($ = String(window.__activeLauncherLink?.id || f.value || "")), $) {
        y.preventDefault(), y.stopPropagation(), await Me.moveLinkTo($, h, "常用网站"), await Me.setPage(h);
        return;
      }
      const ce = window;
      typeof ce.importDroppedLauncherItem == "function" && (y.preventDefault(), y.stopPropagation(), await ce.importDroppedLauncherItem(y, "常用网站", h));
    }
    function us(h) {
      const y = Array.from(h.dataTransfer?.types || []);
      if (!y.includes("application/x-newtab-launcher") && !y.includes("application/x-newtab-bookmark") && !y.includes("text/uri-list") && !y.includes("text/plain")) return;
      h.preventDefault(), h.dataTransfer && (h.dataTransfer.dropEffect = y.includes("application/x-newtab-launcher") ? "move" : "copy"), h.currentTarget?.classList.add("drop-target");
    }
    function ps(h) {
      const y = h.currentTarget;
      y?.contains(h.relatedTarget) || y?.classList.remove("drop-target");
    }
    async function hs(h) {
      h.currentTarget?.classList.remove("drop-target");
      let k = "";
      const $ = h.dataTransfer?.getData("application/x-newtab-launcher");
      if ($)
        try {
          k = String(JSON.parse($)?.id || "");
        } catch {
        }
      if (!k && (f.value || window.__activeLauncherLink) && (k = String(window.__activeLauncherLink?.id || f.value || "")), k) {
        h.preventDefault(), h.stopPropagation(), await Me.moveLinkTo(k, ae.activePage, "常用网站");
        return;
      }
      const G = window;
      if (typeof G.importDroppedLauncherItem == "function") {
        h.preventDefault(), h.stopPropagation(), await G.importDroppedLauncherItem(h, "常用网站", ae.activePage);
        return;
      }
      const ce = h.dataTransfer?.getData("text/plain");
      ce && /^https?:\/\//i.test(ce.trim()) && (h.preventDefault(), h.stopPropagation(), await Me.addLink({
        title: "",
        url: ce.trim(),
        page: ae.activePage
      }));
    }
    function Ni() {
      if (!pt.isOpen) return !1;
      if (typeof document < "u") {
        const h = document.querySelector("#launcher-folder-dialog");
        return !!(h && h.open);
      }
      return !1;
    }
    function fs(h, y) {
      y.preventDefault();
    }
    function gs(h) {
      h.preventDefault(), h.dataTransfer && (h.dataTransfer.dropEffect = "move"), h.currentTarget?.classList.add("drop-target");
    }
    function ms(h) {
      h.currentTarget?.classList.remove("drop-target");
    }
    async function ws(h, y) {
      y.currentTarget?.classList.remove("drop-target"), y.preventDefault(), y.stopPropagation();
      const $ = y.dataTransfer?.getData("application/x-newtab-launcher-folder");
      if ($ && $ !== h) {
        try {
          await Me.moveFolderInto($, h);
        } catch (Te) {
          de.show({ appName: "常用网站", title: "移动未完成", message: Te instanceof Error ? Te.message : "请刷新后核对。" });
        }
        return;
      }
      let G = "";
      const ce = y.dataTransfer?.getData("application/x-newtab-launcher");
      if (ce)
        try {
          G = String(JSON.parse(ce)?.id || "");
        } catch {
        }
      !G && (f.value || window.__activeLauncherLink) && (G = String(window.__activeLauncherLink?.id || f.value || "")), G && await Me.moveLinkTo(G, ae.activePage, h);
    }
    return (h, y) => (c(), w(ee, null, [
      n("section", {
        class: se(["launcher-group launcher-sites size-large", { "home-module-hidden": !s(De).showSites }]),
        "aria-hidden": !s(De).showSites,
        inert: !s(De).showSites,
        onWheel: es
      }, [
        n("header", {
          class: "launcher-group-head launcher-sites-head",
          onPointerdown: y[5] || (y[5] = U(() => {
          }, ["stop"])),
          onContextmenu: ts
        }, [
          n("div", {
            class: "sites-view-switch",
            role: "group",
            "aria-label": s(d)("home.sites.switchAria")
          }, [
            n("button", {
              type: "button",
              disabled: r.value,
              "aria-pressed": i.value === "sites",
              onClick: y[0] || (y[0] = (k) => i.value = "sites")
            }, u(s(d)("home.sites.favoriteSites")), 9, Ac),
            n("button", {
              type: "button",
              disabled: r.value,
              "aria-pressed": i.value === "bookmarks",
              onClick: y[1] || (y[1] = (k) => i.value = "bookmarks")
            }, u(s(d)("home.sites.bookmarks")), 9, Ec)
          ], 8, Ic),
          It(n("div", {
            class: "launcher-page-tabs",
            role: "tablist",
            "aria-label": s(d)("home.sites.pagesAria")
          }, [
            (c(!0), w(ee, null, be(s(ae).pages, (k) => (c(), w("button", {
              key: k,
              type: "button",
              class: se(["launcher-page-tab", { active: k === s(ae).activePage }]),
              "data-page": k,
              role: "tab",
              title: s(d)("home.sites.pageTabTitle", { label: He(k) }),
              onPointerdown: y[2] || (y[2] = U(() => {
              }, ["stop"])),
              onClick: U(($) => Pi(k), ["prevent", "stop"]),
              onContextmenu: U(($) => Qn(k, $), ["prevent", "stop"]),
              onDragover: ($) => ls(k, $),
              onDragleave: y[3] || (y[3] = ($) => cs($)),
              onDrop: ($) => ds(k, $)
            }, u(He(k)), 43, Pc))), 128)),
            x.value ? It((c(), w("input", {
              key: 1,
              ref_key: "pageInputRef",
              ref: A,
              class: "launcher-page-input",
              maxlength: "12",
              placeholder: "例如：游戏区",
              "onUpdate:modelValue": y[4] || (y[4] = (k) => I.value = k),
              onKeydown: Jn,
              onBlur: Wi
            }, null, 544)), [
              [Vo, I.value]
            ]) : (c(), w("button", {
              key: 0,
              class: "launcher-page-add",
              type: "button",
              title: "添加网站分区，例如游戏区",
              "aria-label": "添加网站分区",
              onClick: Xn
            }, " + "))
          ], 8, Dc), [
            [mi, i.value === "sites"]
          ]),
          i.value === "bookmarks" ? (c(), w("div", Wc)) : W("", !0),
          n("button", {
            class: "launcher-page-help",
            type: "button",
            title: "使用指南：如何创建文件夹与整理网站",
            "aria-label": "使用指南与技巧",
            onClick: m
          }, " ? ")
        ], 32),
        i.value === "bookmarks" ? (c(), ne(s(t), {
          key: 0,
          "header-target": "#bookmark-board-header",
          onBusy: y[6] || (y[6] = (k) => r.value = k)
        })) : W("", !0),
        It(n("div", {
          class: "launcher-page-panel",
          "data-page": s(ae).activePage,
          hidden: !1,
          role: "tabpanel",
          onContextmenu: Zn,
          onDragover: y[12] || (y[12] = (k) => us(k)),
          onDragleave: y[13] || (y[13] = (k) => ps(k)),
          onDrop: y[14] || (y[14] = (k) => hs(k))
        }, [
          (c(), ne(Ro, {
            tag: "div",
            class: "launcher-items launcher-site-items",
            key: s(ae).activePage,
            name: f.value || T.value ? "launcher-grid" : ""
          }, {
            default: lo(() => [
              (c(!0), w(ee, null, be(Di.value, (k) => (c(), w(ee, {
                key: k.key
              }, [
                k.type === "link" ? (c(), w("a", {
                  key: k.key,
                  class: se(["launcher-link", {
                    "is-dragging": f.value === String(k.link.id),
                    "is-wheel-picked": s(Pe).isEditingShortcuts && s(Pe).isLinkInWheel(k.link.url)
                  }]),
                  href: k.link.url,
                  title: k.link.title + (k.link.note ? `
📝 ` + k.link.note : "") + `
🔗 ` + k.link.url,
                  "data-launcher-id": String(k.link.id),
                  target: "_blank",
                  rel: "noreferrer",
                  draggable: "false",
                  onDragstart: y[7] || (y[7] = U(() => {
                  }, ["prevent"])),
                  onPointerdown: ($) => we(k.link, $),
                  onMousedown: y[8] || (y[8] = ($) => os($)),
                  onClick: U(($) => is(k.link, $), ["prevent"]),
                  onContextmenu: U(($) => ns(k.link, $), ["prevent"])
                }, [
                  Q(ji, {
                    link: k.link
                  }, null, 8, ["link"])
                ], 42, Oc)) : k.type === "folder" ? (c(), w("div", {
                  key: k.key,
                  class: se(["launcher-folder", [
                    `size-${Se(k.folder.groupName)}`,
                    { "is-dragging": T.value === k.folder.groupName }
                  ]]),
                  title: `${k.folder.groupName}
可拖动调整位置；右键调整收藏夹大小`,
                  role: "button",
                  tabindex: "0",
                  "data-launcher-folder": String(k.folder.groupName),
                  draggable: "true",
                  onPointerdown: ($) => nt(k.folder.groupName, k.folder, $),
                  onDragstart: ($) => fs(k.folder.groupName, $),
                  onDragover: y[10] || (y[10] = ($) => gs($)),
                  onDragleave: y[11] || (y[11] = ($) => ms($)),
                  onDrop: ($) => ws(k.folder.groupName, $),
                  onClick: ($) => ss(k.folder.groupName, $),
                  onContextmenu: U(($) => rs(k.folder.groupName, k.folder.pageName, $), ["prevent"])
                }, [
                  Q(ji, {
                    folder: { title: k.folder.groupName, preview: k.folder.links, count: k.folder.links.length },
                    size: Se(k.folder.groupName)
                  }, {
                    default: lo(() => [
                      n("button", {
                        class: "launcher-folder-del-btn",
                        type: "button",
                        title: `删除文件夹「${k.folder.groupName}」`,
                        "aria-label": "删除文件夹",
                        onPointerdown: y[9] || (y[9] = U(() => {
                        }, ["stop"])),
                        onClick: U(($) => as(k.folder.groupName), ["stop", "prevent"])
                      }, " ✕ ", 40, Bc)
                    ]),
                    _: 2
                  }, 1032, ["folder", "size"]),
                  n("span", Hc, u(k.folder.links.length), 1)
                ], 42, Rc)) : W("", !0)
              ], 64))), 128)),
              Di.value.length ? W("", !0) : (c(), w("p", Fc, u(qn.value), 1))
            ]),
            _: 1
          }, 8, ["name"]))
        ], 40, Nc), [
          [mi, i.value === "sites"]
        ])
      ], 42, Mc),
      n("div", jc, [
        s(De).showHomeNews ? (c(), ne($c, { key: 0 })) : W("", !0)
      ]),
      (c(), ne(Et, { to: "body" }, [
        P.visible ? (c(), w("div", {
          key: 0,
          class: se(["launcher-drag-ghost", [
            P.type === "folder" ? `folder-ghost size-${P.folder?.size}` : "link-ghost"
          ]]),
          style: ke({
            left: `${P.x}px`,
            top: `${P.y}px`
          })
        }, [
          P.type === "folder" && P.folder ? (c(), w(ee, { key: 0 }, [
            n("div", Vc, [
              (c(!0), w(ee, null, be(go(P.folder.links, P.folder.size), (k, $) => (c(), ne(Vi, {
                key: k.id || $,
                link: k,
                mini: !0
              }, null, 8, ["link"]))), 128))
            ]),
            n("span", Kc, u(P.folder.groupName), 1)
          ], 64)) : P.link ? (c(), w(ee, { key: 1 }, [
            Q(Vi, {
              link: P.link
            }, null, 8, ["link"]),
            n("span", zc, u(P.link.title), 1)
          ], 64)) : W("", !0)
        ], 6)) : W("", !0)
      ])),
      Q(s(o), {
        open: l.value,
        onClose: v
      }, null, 8, ["open"])
    ], 64));
  }
}), zn = /* @__PURE__ */ Re(Gc, [["__scopeId", "data-v-d8ee25c8"]]), Oo = Object.keys(De);
let To = !1, ci = 0, to, di;
function rn(e) {
  for (const t of Oo)
    Object.prototype.hasOwnProperty.call(e, t) && (De[t] = e[t] !== !1);
}
function Uc() {
  const e = De;
  xe.setPrefs(e.showSites, e.showTodo, !e.showTodo && e.showBili), document.body.classList.toggle("hide-weather", !e.showWeather), document.body.classList.toggle("hide-sites", !e.showSites), document.body.classList.toggle("hide-bili", !e.showBili), document.body.classList.toggle("hide-todo", !e.showTodo), document.body.classList.toggle("hide-bookmarks", !e.showBookmarkPanel), e.showBookmarkPanel || Ko.close();
}
const an = {
  start() {
    if (To) return;
    To = !0;
    const e = ++ci;
    di = it(() => Oo.map((o) => De[o]), Uc, { immediate: !0, flush: "sync" });
    const t = globalThis.chrome;
    to = (o, i) => {
      if (i !== "local") return;
      const r = {};
      for (const l of Oo) o[l] && (r[l] = o[l].newValue);
      rn(r);
    }, t?.storage?.onChanged?.addListener(to), t?.storage?.local && t.storage.local.get(Oo).then((o) => {
      To && ci === e && rn(o || {});
    }).catch((o) => console.warn("[HomePrefs] 读取首页设置失败", o));
  },
  stop() {
    To = !1, ci++, di?.(), di = void 0, to && globalThis.chrome?.storage?.onChanged?.removeListener(to), to = void 0;
  }
}, Yc = { class: "launcher-inner" }, qc = { class: "launcher-overview" }, Xc = ["aria-hidden", "inert", "title"], Jc = { class: "card-head" }, Qc = { id: "wx-title" }, Zc = { id: "weather-body" }, ed = { class: "launcher-center" }, td = {
  class: "hero-clock",
  id: "hero-clock"
}, od = ["aria-hidden", "inert"], id = { class: "card-head" }, nd = {
  id: "task-thread-home",
  class: "task-thread-home home-music-body"
}, sd = {
  id: "launcher-groups",
  class: "launcher-groups has-sites has-media"
}, rd = /* @__PURE__ */ he({
  __name: "AppLauncher",
  setup(e) {
    const t = ue({ sitesTransparency: 6, weatherTransparency: 6, newsTransparency: 6, playerTransparency: 6 }), o = Object.keys(t);
    function i(l, m) {
      t[l] = typeof m == "number" && Number.isFinite(m) ? Math.max(0, Math.min(80, m)) : 6;
    }
    function r(l, m) {
      if (m === "local")
        for (const v of o) l[v] && i(v, l[v].newValue);
    }
    return Ke(() => {
      Bo.initWallpaper(), typeof chrome < "u" && chrome.storage?.local && (chrome.storage.local.get(o).then((l) => {
        for (const m of o) i(m, l[m]);
      }), chrome.storage.onChanged.addListener(r));
    }), kt(() => {
      typeof chrome < "u" && chrome.storage?.onChanged && chrome.storage.onChanged.removeListener(r);
    }), (l, m) => (c(), w("section", {
      id: "launcher",
      class: "launcher",
      "aria-label": "快捷入口",
      style: ke({
        "--sites-opacity": (100 - t.sitesTransparency) / 100,
        "--weather-opacity": (100 - t.weatherTransparency) / 100,
        "--news-opacity": (100 - t.newsTransparency) / 100,
        "--player-opacity": (100 - t.playerTransparency) / 100
      })
    }, [
      m[3] || (m[3] = n("div", {
        id: "hero-background-media",
        class: "hero-background-media",
        "aria-hidden": "true"
      }, null, -1)),
      n("div", Yc, [
        n("div", qc, [
          n("section", {
            class: se(["launcher-widget launcher-weather", { "home-module-hidden": !s(De).showWeather }]),
            "aria-hidden": !s(De).showWeather,
            inert: !s(De).showWeather,
            "data-home-module": "weather",
            title: s(d)("weather.widgetSwitchTip")
          }, [
            n("header", Jc, [
              m[1] || (m[1] = n("span", {
                class: "bar",
                style: { background: "linear-gradient(180deg,#38bdf8,#818cf8)" }
              }, null, -1)),
              n("h2", Qc, u(s(d)("weather.widgetTitle")), 1)
            ]),
            n("div", Zc, [
              s(De).showWeather ? (c(), ne(jn, { key: 0 })) : W("", !0)
            ])
          ], 10, Xc),
          n("div", ed, [
            n("div", td, [
              Q(Dl),
              Q(Vn)
            ]),
            n("form", {
              id: "search",
              class: "search",
              onSubmit: m[0] || (m[0] = U(() => {
              }, ["prevent"]))
            }, [
              Q(gn)
            ], 32)
          ]),
          n("section", {
            class: se(["launcher-widget launcher-task-threads launcher-music-card", { "home-module-hidden": !s(De).showHomePlayer }]),
            "aria-hidden": !s(De).showHomePlayer,
            inert: !s(De).showHomePlayer,
            "data-home-module": "taskThreads"
          }, [
            n("header", id, [
              m[2] || (m[2] = n("span", { class: "bar music-purple" }, null, -1)),
              n("h2", null, u(s(d)("home.music.player")), 1)
            ]),
            n("div", nd, [
              s(De).showHomePlayer ? (c(), ne(Kn, { key: 0 })) : W("", !0)
            ])
          ], 10, od)
        ]),
        n("div", sd, [
          Q(zn)
        ])
      ]),
      m[4] || (m[4] = n("input", {
        id: "background-input",
        type: "file",
        accept: "image/*,video/mp4,video/webm,.gif,.mp4,.webm",
        multiple: "",
        hidden: ""
      }, null, -1))
    ], 4));
  }
}), zt = ue(/* @__PURE__ */ new Set()), Ct = ue({}), Fe = ue({});
function ui(e) {
  const t = je(e);
  if (!t?.lifecycle.canUnmount || t.lifecycle.canUnmount()) return { ok: !0 };
  const o = t.lifecycle.unmountBlockedMessage || "模块操作尚未结束，不能退出或重载。";
  return de.show({ appName: t.title, title: "操作进行中", message: o, showActions: !1 }), { ok: !1, error: o };
}
const Le = {
  // 检查应用是否处于运行显示状态（驱动 Dock 上的小圆点：关闭即熄灭，不保留 macOS 风格后台悬浮绿点）
  isRunning(e) {
    return this.isVisible(e);
  },
  // 检查应用当前是否在屏幕上可见（窗口是否打开）
  isVisible(e) {
    const t = je(e);
    return t ? t.lifecycle.isVisible() : Qo(e) ? !!Ys[e] : qs(e);
  },
  // 标记应用启动
  markRunning(e) {
    zt.add(e), (e in Fe || je(e)) && (Fe[e] = !0);
  },
  // 获取组件当前的 render key
  getRenderKey(e) {
    return Ct[e] || 0;
  },
  // 打开 / 显示应用窗口
  openApp(e) {
    const t = je(e);
    if (t) {
      Ce.open(e), t.lifecycle.isVisible() && this.markRunning(e);
      return;
    }
    if (this.markRunning(e), Qo(e)) {
      Hi.open(e);
      return;
    }
    Ce.open(e);
  },
  // 隐藏/关闭窗口：立即退出可见运行态并熄灭 Dock 指示绿点
  hideApp(e) {
    if (zt.delete(e), je(e)) {
      Ce.close(e);
      return;
    }
    if (Qo(e)) {
      Hi.close(e);
      return;
    }
    Ce.close(e);
  },
  // 真正的关闭（Quit / 彻底从内存与 DOM 中卸载销毁，熄灭小圆点）
  async quitApp(e) {
    if (je(e)) {
      const r = ui(e);
      if (!r.ok) return r;
      const l = je(e)?.lifecycle.beforeQuit;
      if (l) {
        const a = _t(e);
        try {
          await l();
        } catch {
          const I = "后台停止未确认，窗口保留；未自动重试，请检查后台状态。";
          return de.show({ appName: je(e).title, title: "未退出", message: I, showActions: !1 }), { ok: !1, error: I };
        }
        if (_t(e) !== a) return { ok: !1, error: "窗口已有后续操作，未卸载。" };
        const x = ui(e);
        if (!x.ok) return x;
      }
      const m = Ce.close(e), v = _t(e);
      return zt.delete(e), Fe[e] = !1, ft.removeActiveTool(e), await m, await gt(), _t(e) === v ? { ok: !0 } : { ok: !1, error: "模块已有后续操作，退出状态已变化。" };
    }
    this.hideApp(e), zt.delete(e), ft.removeActiveTool(e), e in Fe && (Fe[e] = !1);
    const t = Us;
    t.activeId === e && (t.activeId = "");
    const o = t.openOrder.indexOf(e);
    o >= 0 && t.openOrder.splice(o, 1);
    const i = t.activeTools.indexOf(e);
    i >= 0 && t.activeTools.splice(i, 1), Ce.render();
  },
  // 重新加载（Reload / 单应用热重启，重新初始化组件）
  async reloadApp(e) {
    const t = je(e);
    if (t) {
      if (t.lifecycle.canOpen && !t.lifecycle.canOpen()) return { ok: !1, error: "模块当前不能打开，未重载窗口。" };
      const o = ui(e);
      if (!o.ok) return o;
      const i = Ce.close(e), r = _t(e);
      return await i, _t(e) !== r ? { ok: !1, error: "模块已有后续操作，重载已取消。" } : (Fe[e] = !1, await gt(), _t(e) !== r ? { ok: !1, error: "模块已有后续操作，未重新打开。" } : (Ct[e] = (Ct[e] || 0) + 1, Ce.open(e), t.lifecycle.isVisible() ? (this.markRunning(e), { ok: !0 }) : { ok: !1, error: "模块当前不能打开，未重新显示窗口。" }));
    }
    this.hideApp(e), e in Fe ? (Fe[e] = !1, await gt(), Ct[e] = (Ct[e] || 0) + 1, Fe[e] = !0) : Ct[e] = (Ct[e] || 0) + 1, await gt(), this.openApp(e);
  }
}, oo = /* @__PURE__ */ he({
  __name: "DockCardModuleHost",
  props: {
    id: {}
  },
  setup(e) {
    const o = je(e.id);
    if (!o || o.presentation !== "card") throw new Error("Unknown registered workspace card");
    const i = o;
    i.mountPolicy === "workspace-ready" && Le.markRunning(i.id), it(i.lifecycle.isVisible, (x) => {
      x && Le.markRunning(i.id);
    }, { immediate: !0, flush: "sync" });
    const r = re(() => !!Fe[i.id]);
    function l() {
      try {
        i.lifecycle.hide();
      } catch {
      }
      (mt.activeId === i.id || mt.activeId === i.rootId) && (mt.activeId = null), Le.hideApp(i.id), xn(mt.activeId);
    }
    function m() {
      Le.reloadApp(i.id);
    }
    function v() {
      typeof window < "u" && window.location.reload();
    }
    const a = F({
      loader: i.loadView,
      onError(x, I, A, f) {
        f <= 2 ? I() : A();
      },
      errorComponent: he({
        setup: () => () => i.lifecycle.isVisible() ? Ee("section", { class: "card wide card-fullscreen", role: "alert" }, [
          Ee("h2", i.title),
          Ee("p", "工作区切片加载受阻（可能因插件重载或切片更新）。可点击「重新加载模块」，或返回首页。"),
          Ee("div", { style: "display: flex; gap: 10px; margin-top: 14px;" }, [
            Ee("button", {
              type: "button",
              style: "padding: 6px 14px; border-radius: 999px; border: 1px solid var(--border); background: var(--primary, #3b82f6); color: #fff; cursor: pointer; font-size: 12px; font-weight: 500;",
              onClick: v
            }, "⟳ 刷新标签页 (加载最新版)"),
            Ee("button", {
              type: "button",
              style: "padding: 6px 14px; border-radius: 999px; border: 1px solid var(--border); background: var(--surface); color: var(--text); cursor: pointer; font-size: 12px;",
              onClick: m
            }, "↻ 重新加载模块"),
            Ee("button", {
              type: "button",
              style: "padding: 6px 14px; border-radius: 999px; border: 1px solid var(--border); background: var(--surface); color: var(--text); cursor: pointer; font-size: 12px;",
              onClick: l
            }, "返回首页")
          ])
        ]) : null
      })
    });
    return uo(() => {
      l(), zt.delete(i.id), delete Fe[i.id];
    }), (x, I) => r.value ? (c(), ne(wn(s(a)), {
      key: s(Le).getRenderKey(s(i).id)
    })) : W("", !0);
  }
}), ad = { class: "logicweaver-workspaces-layer" }, ld = {
  key: 0,
  id: "daily-section",
  class: "wrap"
}, cd = { id: "vue-todoist-root" }, dd = { id: "vue-bili-favorites-root" }, ud = { id: "vue-aihot-root" }, pd = ["hidden"], hd = /* @__PURE__ */ he({
  __name: "AppWorkspaces",
  setup(e) {
    const t = X(!!mt.activeId);
    return Ke(() => {
      t.value || (typeof window < "u" && "requestIdleCallback" in window ? window.requestIdleCallback(() => {
        t.value = !0;
      }, { timeout: 80 }) : setTimeout(() => {
        t.value = !0;
      }, 40));
    }), (o, i) => (c(), w("div", ad, [
      t.value ? (c(), w("main", ld, [
        n("div", cd, [
          Q(oo, { id: "todoist" })
        ]),
        n("div", dd, [
          Q(oo, { id: "daily-bilibili" })
        ]),
        n("div", ud, [
          Q(oo, { id: "daily-aihot" })
        ]),
        n("div", {
          id: "vue-multica-root",
          hidden: s(mt).activeId !== "multica"
        }, [
          Q(oo, { id: "multica" })
        ], 8, pd),
        Q(oo, { id: "card-github" })
      ])) : W("", !0)
    ]));
  }
}), fd = /* @__PURE__ */ Re(hd, [["__scopeId", "data-v-0799b753"]]), gd = ["aria-label"], md = { class: "dock-menu-head" }, wd = { class: "dock-menu-title" }, yd = ["src", "alt"], vd = {
  key: 1,
  class: "dock-menu-emoji"
}, bd = { class: "dock-menu-text" }, kd = { class: "dock-menu-text" }, _d = { class: "dock-menu-text" }, xd = /* @__PURE__ */ he({
  __name: "DockContextMenu",
  props: {
    target: {}
  },
  emits: ["close", "action"],
  setup(e, { emit: t }) {
    const o = e, i = t, r = re(() => !o.target || o.target.type !== "tool" ? !1 : Le.isRunning(o.target.id)), l = re(() => !o.target || o.target.type !== "tool" ? !1 : Le.isVisible(o.target.id)), { menuRef: m, style: v } = mr({
      visible: () => !!o.target,
      anchor: () => o.target || { x: 0, y: 0 },
      placement: Bt.position === "top" ? "below" : "above",
      align: "center",
      gap: 12,
      dismiss: () => i("close")
    });
    function a() {
      o.target && (Le.openApp(o.target.id), i("close"));
    }
    function x() {
      o.target && (Le.hideApp(o.target.id), i("close"));
    }
    async function I() {
      o.target && (await Le.reloadApp(o.target.id), i("close"));
    }
    async function A() {
      if (!o.target) return;
      const g = o.target;
      if ((await Le.quitApp(g.id))?.ok === !1) {
        i("close");
        return;
      }
      de.show({
        appName: g.title,
        title: d("dock.quitDone"),
        subtitle: d("dock.quitSubtitle"),
        icon: g.icon || "assets/logo.png",
        duration: 2800
      }), i("close");
    }
    async function f() {
      if (!o.target) return;
      const g = o.target, p = St.uninstall(g.id);
      i("close"), await p || de.show({
        appName: g.title,
        title: "入口停用未确认",
        subtitle: St.state.errorMessage || "请打开模块管理核对当前启用状态",
        icon: g.icon || "assets/logo.png",
        duration: 4e3
      });
    }
    function T() {
      if (!o.target) return;
      const p = {
        "daily-bilibili": "https://www.bilibili.com",
        "card-github": "https://github.com",
        "daily-aihot": "https://news.ycombinator.com"
      }[o.target.id] || "https://www.bilibili.com";
      window.open(p, "_blank"), i("close");
    }
    return (g, p) => (c(), ne(Et, { to: "body" }, [
      e.target ? (c(), w("div", {
        key: 0,
        ref_key: "menuRef",
        ref: m,
        role: "group",
        "aria-label": `${e.target.title}操作`,
        class: "dock-context-menu",
        style: ke(s(v)),
        onClick: p[1] || (p[1] = U(() => {
        }, ["stop"])),
        onContextmenu: p[2] || (p[2] = U(() => {
        }, ["prevent"]))
      }, [
        n("div", md, [
          n("div", wd, [
            e.target.icon ? (c(), w("img", {
              key: 0,
              class: "dock-menu-icon",
              src: e.target.icon,
              alt: e.target.title
            }, null, 8, yd)) : e.target.emoji ? (c(), w("span", vd, u(e.target.emoji), 1)) : W("", !0),
            n("strong", null, u(e.target.title), 1)
          ]),
          e.target.type === "tool" ? (c(), w("span", {
            key: 0,
            class: se(["dock-status-tag", { "is-running": r.value }])
          }, [
            p[3] || (p[3] = n("span", { class: "dock-status-dot" }, null, -1)),
            at(" " + u(r.value ? s(d)("dock.menu.running") : s(d)("dock.menu.notStarted")), 1)
          ], 2)) : W("", !0)
        ]),
        p[12] || (p[12] = n("div", { class: "dock-menu-divider" }, null, -1)),
        e.target.type === "tool" ? (c(), w(ee, { key: 0 }, [
          l.value ? (c(), w("button", {
            key: 1,
            type: "button",
            class: "dock-menu-item",
            onClick: x
          }, [
            p[5] || (p[5] = n("span", { class: "dock-menu-symbol" }, "−", -1)),
            n("span", null, u(s(d)("dock.menu.hideWindow")), 1)
          ])) : (c(), w("button", {
            key: 0,
            type: "button",
            class: "dock-menu-item",
            onClick: a
          }, [
            p[4] || (p[4] = n("span", { class: "dock-menu-symbol" }, "↗", -1)),
            n("span", null, u(s(d)("dock.menu.openWindow")), 1)
          ])),
          n("button", {
            type: "button",
            class: "dock-menu-item",
            onClick: I
          }, [
            p[6] || (p[6] = n("span", { class: "dock-menu-symbol" }, "⟲", -1)),
            n("div", bd, [
              n("span", null, u(s(d)("dock.menu.reloadApp")), 1),
              n("small", null, u(s(d)("dock.menu.reloadSub")), 1)
            ])
          ]),
          p[9] || (p[9] = n("div", { class: "dock-menu-divider" }, null, -1)),
          n("button", {
            type: "button",
            class: "dock-menu-item",
            onClick: f
          }, [
            p[7] || (p[7] = n("span", { class: "dock-menu-symbol" }, "📌", -1)),
            n("div", kd, [
              n("span", null, u(s(d)("dock.menu.removeFromDock")), 1),
              n("small", null, u(s(d)("dock.menu.removeSub")), 1)
            ])
          ]),
          n("button", {
            type: "button",
            class: "dock-menu-item item-danger",
            onClick: A
          }, [
            p[8] || (p[8] = n("span", { class: "dock-menu-symbol" }, "✕", -1)),
            n("div", _d, [
              n("span", null, u(s(d)("dock.menu.quitApp")), 1),
              n("small", null, u(s(d)("dock.menu.quitSub")), 1)
            ])
          ])
        ], 64)) : e.target.type === "card" ? (c(), w("button", {
          key: 1,
          type: "button",
          class: "dock-menu-item",
          onClick: T
        }, [
          p[10] || (p[10] = n("span", { class: "dock-menu-symbol" }, "↗", -1)),
          n("span", null, u(s(d)("dock.menu.openOfficial")), 1)
        ])) : (c(), w("button", {
          key: 2,
          type: "button",
          class: "dock-menu-item",
          onClick: p[0] || (p[0] = (b) => i("close"))
        }, [...p[11] || (p[11] = [
          n("span", { class: "dock-menu-symbol" }, "🏠", -1),
          n("span", null, "返回常用主页", -1)
        ])]))
      ], 44, gd)) : W("", !0)
    ]));
  }
}), Cd = /* @__PURE__ */ Re(xd, [["__scopeId", "data-v-1db4d5bf"]]), Ld = { class: "mac-dock-shelf" }, Sd = ["data-dock-target", "title", "onPointerdown", "onClick", "onContextmenu"], Td = ["src", "alt"], $d = {
  key: 0,
  class: "mac-dock-dot",
  "aria-hidden": "true"
}, Md = ["title"], Id = ["alt"], Ad = ["data-dock-tool", "title", "onPointerdown", "onClick", "onContextmenu"], Ed = ["src", "alt"], Dd = {
  key: 1,
  class: "mac-dock-emoji",
  "aria-hidden": "true"
}, Pd = {
  key: 2,
  class: "mac-dock-dot",
  "aria-hidden": "true"
}, Wd = {
  key: 3,
  class: "mac-dock-badge"
}, Nd = ["title"], Od = ["src"], Rd = {
  key: 1,
  class: "mac-dock-emoji"
}, Bd = /* @__PURE__ */ he({
  __name: "MacDock",
  setup(e) {
    const t = re(() => Bt), o = X(null), i = re(() => Object.fromEntries(Bt.tools.map((N) => {
      const O = je(N.id)?.badgeCount?.() || 0;
      return [N.id, Number.isFinite(O) ? Math.max(0, Math.floor(O)) : 0];
    })));
    function r(N) {
      N.stopPropagation(), o.value = null, A(N.currentTarget), St.state.isOpen ? St.close() : St.open();
    }
    function l(N, O) {
      O.stopPropagation(), o.value = null, A(O.currentTarget), ft.triggerItem("target", N);
    }
    function m(N, O) {
      const j = O.currentTarget.getBoundingClientRect(), pe = Bt.position, we = pe === "left" || pe === "right";
      o.value = {
        type: "card",
        id: N.id,
        title: N.title,
        icon: N.icon,
        x: we ? pe === "left" ? j.right + 8 : j.left - 8 : j.left + j.width / 2,
        y: we ? j.top + j.height / 2 : pe === "top" ? j.bottom + 8 : j.top
      };
    }
    function v(N) {
      N.stopPropagation(), o.value = null, A(N.currentTarget), ft.triggerItem("home", "home-launcher");
    }
    function a(N, O) {
      O.stopPropagation(), o.value = null, A(O.currentTarget), je(N) || Le.markRunning(N), ft.triggerItem("tool", N);
    }
    function x(N, O) {
      const j = O.currentTarget.getBoundingClientRect(), pe = Bt.position, we = pe === "left" || pe === "right";
      o.value = {
        type: "tool",
        id: N.id,
        title: N.title,
        icon: N.icon,
        emoji: N.emoji,
        x: we ? pe === "left" ? j.right + 8 : j.left - 8 : j.left + j.width / 2,
        y: we ? j.top + j.height / 2 : pe === "top" ? j.bottom + 8 : j.top
      };
    }
    const I = /* @__PURE__ */ new Map();
    function A(N) {
      if (!N || (I.get(N)?.cancel(), window.matchMedia("(prefers-reduced-motion: reduce)").matches)) return;
      const O = N.animate([
        { translate: "0 0", offset: 0 },
        { translate: "0 -8px", offset: 0.35 },
        { translate: "0 0", offset: 0.65 },
        { translate: "0 -2px", offset: 0.85 },
        { translate: "0 0", offset: 1 }
      ], { duration: 350, easing: "ease" });
      I.set(N, O);
      const E = () => {
        I.get(N) === O && I.delete(N);
      };
      O.onfinish = E, O.oncancel = E;
    }
    const f = X(null), T = ue({
      visible: !1,
      x: 0,
      y: 0,
      width: 40,
      height: 40,
      item: null,
      type: "tool"
    }), g = X(null), p = X(null), b = re(() => g.value || t.value.cards), C = re(() => p.value || t.value.tools);
    let D = "", S = 0, B = !1, V = 0;
    function M(N, O, E) {
      if (E.button !== 0 || E.target.closest(".mac-dock-market-btn")) return;
      const we = E.currentTarget.getBoundingClientRect();
      B = !1, f.value = {
        type: N,
        id: O.id,
        item: O,
        startX: E.clientX,
        startY: E.clientY,
        initialLeft: we.left,
        initialTop: we.top,
        width: we.width,
        height: we.height
      }, window.addEventListener("pointermove", L), window.addEventListener("pointerup", _), window.addEventListener("pointercancel", _);
    }
    function L(N) {
      if (!f.value) return;
      const O = N.clientX - f.value.startX, E = N.clientY - f.value.startY, j = Math.hypot(O, E);
      if (!B && j > 5 && (B = !0, T.visible = !0, T.item = f.value.item, T.type = f.value.type, T.width = f.value.width, T.height = f.value.height, f.value.type === "card" ? g.value = [...t.value.cards] : p.value = [...t.value.tools]), !B) return;
      T.x = N.clientX - T.width / 2, T.y = N.clientY - T.height / 2;
      const we = document.elementsFromPoint(N.clientX, N.clientY).find(
        (We) => We.classList.contains("mac-dock-item") && !We.classList.contains("mac-dock-market-btn")
      );
      if (!we) return;
      const nt = we.getAttribute("data-dock-target"), Be = we.getAttribute("data-dock-tool"), ct = f.value.type, dt = f.value.id, ze = Date.now();
      if (ct === "card" && nt && nt !== dt && nt !== "home-launcher") {
        const We = we.getBoundingClientRect(), Ie = We.left + We.width / 2;
        if (Math.abs(N.clientX - Ie) > We.width * 0.55 || nt === D && ze - S < 180) return;
        const ye = [...g.value || t.value.cards], He = ye.findIndex((Se) => Se.id === dt), et = ye.findIndex((Se) => Se.id === nt);
        if (He >= 0 && et >= 0 && He !== et) {
          const Se = ye.splice(He, 1)[0];
          ye.splice(et, 0, Se), g.value = ye, D = nt, S = ze;
        }
      } else if (ct === "tool" && Be && Be !== dt) {
        const We = we.getBoundingClientRect(), Ie = We.left + We.width / 2;
        if (Math.abs(N.clientX - Ie) > We.width * 0.55 || Be === D && ze - S < 180) return;
        const ye = [...p.value || t.value.tools], He = ye.findIndex((Se) => Se.id === dt), et = ye.findIndex((Se) => Se.id === Be);
        if (He >= 0 && et >= 0 && He !== et) {
          const Se = ye.splice(He, 1)[0];
          ye.splice(et, 0, Se), p.value = ye, D = Be, S = ze;
        }
      }
    }
    function _() {
      window.removeEventListener("pointermove", L), window.removeEventListener("pointerup", _), window.removeEventListener("pointercancel", _), B && f.value && (V = Date.now() + 250, f.value.type === "card" && g.value ? ft.reorderCards(g.value.map((N) => N.id)) : f.value.type === "tool" && p.value && ft.reorderTools(p.value.map((N) => N.id))), T.visible = !1, T.item = null, g.value = null, p.value = null, f.value = null, B = !1, D = "";
    }
    function P(N, O) {
      Date.now() < V || l(N, O);
    }
    function _e(N, O) {
      Date.now() < V || a(N, O);
    }
    return uo(() => {
      for (const N of I.values()) N.cancel();
      I.clear(), window.removeEventListener("pointermove", L), window.removeEventListener("pointerup", _), window.removeEventListener("pointercancel", _);
    }), (N, O) => (c(), w(ee, null, [
      n("div", Ld, [
        Q(Ro, {
          tag: "div",
          class: "mac-dock-group mac-dock-cards-group",
          name: "dock-item-motion"
        }, {
          default: lo(() => [
            (c(!0), w(ee, null, be(b.value, (E) => (c(), w("button", {
              key: E.id,
              class: se(["mac-dock-item", {
                "is-active": t.value.activeTargetId === E.id,
                "is-drag-origin": f.value && f.value.id === E.id
              }]),
              type: "button",
              "data-dock-target": E.id,
              title: E.title,
              onPointerdown: (j) => M("card", E, j),
              onClick: U((j) => P(E.id, j), ["stop"]),
              onContextmenu: U((j) => m(E, j), ["prevent"])
            }, [
              n("img", {
                class: "mac-dock-icon",
                src: E.icon,
                alt: E.title
              }, null, 8, Td),
              t.value.activeTargetId === E.id ? (c(), w("span", $d)) : W("", !0)
            ], 42, Sd))), 128))
          ]),
          _: 1
        }),
        O[6] || (O[6] = n("div", {
          class: "mac-dock-divider",
          "aria-hidden": "true"
        }, null, -1)),
        n("button", {
          class: "mac-dock-item",
          type: "button",
          "data-dock-target": "home-launcher",
          title: s(d)("dock.home"),
          onClick: O[0] || (O[0] = U((E) => v(E), ["stop"]))
        }, [
          n("img", {
            class: "mac-dock-icon",
            src: "assets/nav-home.svg",
            alt: s(d)("dock.home")
          }, null, 8, Id)
        ], 8, Md),
        O[7] || (O[7] = n("div", {
          class: "mac-dock-divider mac-dock-divider-dark",
          "aria-hidden": "true"
        }, null, -1)),
        Q(Ro, {
          tag: "div",
          class: "mac-dock-group mac-dock-tools-group",
          name: "dock-item-motion"
        }, {
          default: lo(() => [
            (c(!0), w(ee, null, be(C.value, (E) => (c(), w("button", {
              key: E.id,
              class: se(["mac-dock-item", {
                "is-active": s(Le).isRunning(E.id),
                "is-drag-origin": f.value && f.value.id === E.id
              }]),
              type: "button",
              "data-dock-tool": E.id,
              title: E.title,
              onPointerdown: (j) => M("tool", E, j),
              onClick: U((j) => _e(E.id, j), ["stop"]),
              onContextmenu: U((j) => x(E, j), ["prevent"])
            }, [
              E.icon ? (c(), w("img", {
                key: 0,
                class: "mac-dock-icon",
                src: E.icon,
                alt: E.title
              }, null, 8, Ed)) : E.emoji ? (c(), w("span", Dd, u(E.emoji), 1)) : W("", !0),
              s(Le).isRunning(E.id) ? (c(), w("span", Pd)) : W("", !0),
              i.value[E.id] > 0 ? (c(), w("span", Wd, u(i.value[E.id] > 99 ? "99+" : i.value[E.id]), 1)) : W("", !0)
            ], 42, Ad))), 128))
          ]),
          _: 1
        }),
        n("button", {
          class: "mac-dock-item",
          type: "button",
          title: "设置",
          "aria-label": "设置",
          onClick: O[1] || (O[1] = U((E) => s(po).toggle(), ["stop"]))
        }, [...O[4] || (O[4] = [
          n("span", {
            class: "mac-dock-emoji",
            "aria-hidden": "true"
          }, "⚙️", -1)
        ])]),
        n("button", {
          class: se(["mac-dock-item mac-dock-market-btn", { "is-active": s(St).state.isOpen }]),
          type: "button",
          title: s(d)("dock.market"),
          onClick: O[2] || (O[2] = U((E) => r(E), ["stop"]))
        }, [...O[5] || (O[5] = [
          n("span", {
            class: "mac-dock-market-icon",
            "aria-hidden": "true"
          }, "🧩", -1)
        ])], 10, Nd)
      ]),
      (c(), ne(Et, { to: "body" }, [
        T.visible && T.item ? (c(), w("div", {
          key: 0,
          class: "mac-dock-drag-ghost",
          style: ke({
            width: T.width + "px",
            height: T.height + "px",
            transform: "translate3d(" + T.x + "px," + T.y + "px, 0)"
          }),
          "aria-hidden": "true"
        }, [
          T.item.icon ? (c(), w("img", {
            key: 0,
            class: "mac-dock-icon",
            src: T.item.icon,
            alt: ""
          }, null, 8, Od)) : T.item.emoji ? (c(), w("span", Rd, u(T.item.emoji), 1)) : W("", !0)
        ], 4)) : W("", !0)
      ])),
      Q(Cd, {
        target: o.value,
        onClose: O[3] || (O[3] = (E) => o.value = null)
      }, null, 8, ["target"])
    ], 64));
  }
}), Gn = /* @__PURE__ */ Re(Bd, [["__scopeId", "data-v-556caabc"]]), Hd = {
  id: "win-toast-container",
  class: "win-toast-container",
  "aria-live": "polite",
  "aria-relevant": "additions"
}, Fd = ["data-toast-fingerprint", "onMouseenter", "onMouseleave"], jd = { class: "win-toast-head" }, Vd = ["src"], Kd = { class: "win-toast-app" }, zd = { class: "win-toast-time" }, Gd = ["title", "aria-label", "onClick"], Ud = ["onClick"], Yd = { class: "win-toast-title" }, qd = {
  key: 0,
  class: "win-toast-subtitle"
}, Xd = {
  key: 1,
  class: "win-toast-snippet"
}, Jd = {
  key: 0,
  class: "win-toast-actions"
}, Qd = ["onClick"], Zd = ["onClick"], eu = /* @__PURE__ */ he({
  __name: "NotificationHost",
  setup(e) {
    const t = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), r = X({}), l = X({});
    let m = null;
    function v(g) {
      const p = t.get(g);
      p !== void 0 && clearTimeout(p), t.delete(g);
    }
    function a(g, p = g.duration) {
      v(g.id), i.set(g.id, p), o.set(g.id, Date.now()), l.value[g.id] = !1, r.value[g.id] = Math.max(0, Math.min(100, p / g.duration * 100)), gt(() => requestAnimationFrame(() => {
        r.value[g.id] = 0;
      })), t.set(g.id, window.setTimeout(() => {
        t.delete(g.id), de.close(g.id);
      }, p));
    }
    function x(g) {
      v(g.id);
      const p = Date.now() - (o.get(g.id) || Date.now()), b = Math.max(0, (i.get(g.id) ?? g.duration) - p);
      i.set(g.id, b), l.value[g.id] = !0, r.value[g.id] = Math.max(0, Math.min(100, b / g.duration * 100));
    }
    function I(g) {
      a(g, Math.max(1500, i.get(g.id) ?? g.duration));
    }
    function A(g) {
      v(g.id), de.close(g.id);
    }
    function f(g) {
      if (co.markRead(g.historyId || g.id), A(g), !g.onClick) {
        g.target && co.openTarget(g.target);
        return;
      }
      try {
        Promise.resolve(g.onClick()).catch((p) => console.warn("Notification action failed", p));
      } catch (p) {
        console.warn("Notification action failed", p);
      }
    }
    function T(g) {
      const p = Math.max(500, i.get(g.id) ?? g.duration);
      return {
        width: `${r.value[g.id] ?? 100}%`,
        transition: l.value[g.id] ? "none" : `width ${p}ms linear`
      };
    }
    return Ke(() => {
      m = new MutationObserver(() => {
        const p = new Set(mo.map((b) => b.id));
        for (const b of mo)
          !b.closing && !t.has(b.id) && !i.has(b.id) && a(b);
        for (const b of i.keys())
          p.has(b) || (v(b), i.delete(b), o.delete(b), delete r.value[b], delete l.value[b]);
      });
      const g = document.getElementById("win-toast-container");
      g && m.observe(g, { childList: !0 });
      for (const p of mo) a(p);
    }), uo(() => {
      m?.disconnect(), m = null;
      for (const g of t.values()) clearTimeout(g);
      t.clear();
    }), (g, p) => (c(), ne(Et, { to: "body" }, [
      n("div", Hd, [
        Q(Ro, { name: "win-toast" }, {
          default: lo(() => [
            (c(!0), w(ee, null, be(s(mo), (b) => (c(), w("article", {
              key: b.id,
              class: se(["win-toast-card", [b.appType, { closing: b.closing }]]),
              "data-toast-fingerprint": b.fingerprint,
              onMouseenter: (C) => x(b),
              onMouseleave: (C) => I(b)
            }, [
              n("header", jd, [
                n("img", {
                  src: b.icon,
                  class: "win-toast-icon",
                  alt: ""
                }, null, 8, Vd),
                n("span", Kd, u(b.appName), 1),
                n("span", zd, u(s(d)("notifications.justNow")), 1),
                n("button", {
                  type: "button",
                  class: "win-toast-close",
                  title: s(d)("common.close"),
                  "aria-label": s(d)("common.close"),
                  onClick: (C) => A(b)
                }, "✕", 8, Gd)
              ]),
              n("button", {
                type: "button",
                class: "win-toast-body win-toast-body-button",
                onClick: (C) => f(b)
              }, [
                n("span", Yd, u(b.title), 1),
                b.subtitle ? (c(), w("span", qd, u(b.subtitle), 1)) : W("", !0),
                b.message ? (c(), w("span", Xd, u(b.message), 1)) : W("", !0)
              ], 8, Ud),
              b.showActions && b.actionLabel ? (c(), w("footer", Jd, [
                n("button", {
                  type: "button",
                  class: "win-toast-btn primary",
                  onClick: (C) => f(b)
                }, u(b.actionLabel), 9, Qd),
                n("button", {
                  type: "button",
                  class: "win-toast-btn",
                  onClick: (C) => A(b)
                }, u(s(d)("common.close")), 9, Zd)
              ])) : W("", !0),
              n("div", {
                class: "win-toast-progress",
                style: ke(T(b))
              }, null, 4)
            ], 42, Fd))), 128))
          ]),
          _: 1
        })
      ])
    ]));
  }
}), Un = /* @__PURE__ */ Re(eu, [["__scopeId", "data-v-d1eb92c2"]]), tu = ["id"], ou = /* @__PURE__ */ he({
  __name: "DockModuleHost",
  setup(e) {
    const t = Cn().filter((o) => o.presentation !== "card").map((o) => {
      it(o.lifecycle.isVisible, (r) => {
        r && Le.markRunning(o.id);
      }, { immediate: !0, flush: "sync" });
      const i = he({
        setup: () => () => Ee("section", { class: "dock-module-load-error", role: "alert" }, [
          Ee("div", { style: "display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;" }, [
            Ee("strong", { style: "font-size: 13px; color: var(--heading);" }, `${o.title} 加载受阻`),
            Ee("span", { style: "font-size: 11px; padding: 2px 6px; border-radius: 4px; background: var(--surface); color: var(--muted); border: 1px solid var(--border);" }, "代码可能已更新")
          ]),
          Ee("p", { style: "font-size: 12px; line-height: 1.5; color: var(--muted); margin: 0 0 12px 0;" }, "模块分块代码未就绪。若刚才在终端编写或重新构建了扩展，点击「刷新标签页」即可立即同步最新切片。"),
          Ee("div", { style: "display: flex; gap: 8px;" }, [
            Ee("button", {
              type: "button",
              style: "padding: 5px 12px; border-radius: 6px; border: 1px solid var(--border); background: var(--primary, #3b82f6); color: #fff; cursor: pointer; font-size: 12px; font-weight: 500;",
              onClick: () => {
                typeof window < "u" && window.location.reload();
              }
            }, "⟳ 刷新标签页"),
            Ee("button", {
              type: "button",
              style: "padding: 5px 10px; border-radius: 6px; border: 1px solid var(--border); background: var(--surface); color: var(--text); cursor: pointer; font-size: 12px;",
              onClick: () => {
                Le.reloadApp(o.id);
              }
            }, "↻ 重试"),
            Ee("button", {
              type: "button",
              style: "padding: 5px 10px; border-radius: 6px; border: 1px solid var(--border); background: var(--surface); color: var(--text); cursor: pointer; font-size: 12px;",
              onClick: () => {
                Le.hideApp(o.id);
              }
            }, "隐藏")
          ])
        ])
      });
      return {
        definition: o,
        mounted: re(() => !!Fe[o.id]),
        view: F({
          loader: o.loadView,
          onError(r, l, m, v) {
            v <= 2 ? l() : m();
          },
          errorComponent: i
        })
      };
    });
    return uo(() => {
      for (const { definition: o } of t)
        Ce.close(o.id), zt.delete(o.id), Fe[o.id] = !1;
    }), (o, i) => (c(!0), w(ee, null, be(s(t), (r) => It((c(), w("div", {
      id: r.definition.rootId,
      key: r.definition.id
    }, [
      r.mounted.value ? (c(), ne(wn(r.view), {
        key: s(Le).getRenderKey(r.definition.id)
      })) : W("", !0)
    ], 8, tu)), [
      [mi, r.definition.lifecycle.isVisible()]
    ])), 128));
  }
}), iu = /* @__PURE__ */ Re(ou, [["__scopeId", "data-v-fc77be0a"]]);
function ln(e) {
  const t = String(e || "").trim();
  if (!t) return "";
  const o = /^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(t) ? t : `https://${t}`;
  try {
    const i = new URL(o);
    return i.protocol !== "http:" && i.protocol !== "https:" ? "" : i.href;
  } catch {
    return "";
  }
}
function nu(e, t) {
  const o = String(e || "").trim();
  if (o)
    try {
      const i = new URL(o, t);
      return i.protocol !== "http:" && i.protocol !== "https:" ? void 0 : i.href;
    } catch {
      return;
    }
}
function Yn(e) {
  return e.replace(/&amp;/gi, "&").replace(/&lt;/gi, "<").replace(/&gt;/gi, ">").replace(/&quot;/gi, '"').replace(/&#39;|&apos;/gi, "'").replace(/&#(\d+);/g, (t, o) => {
    const i = Number(o);
    return Number.isFinite(i) ? String.fromCodePoint(i) : "";
  }).replace(/&#x([0-9a-f]+);/gi, (t, o) => {
    const i = parseInt(o, 16);
    return Number.isFinite(i) ? String.fromCodePoint(i) : "";
  }).replace(/\s+/g, " ").trim();
}
function $o(e, t) {
  const o = /<meta\b[^>]*>/gi;
  let i;
  for (; (i = o.exec(e)) !== null; ) {
    const r = i[0], l = r.match(/\b(?:property|name)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/i), m = (l?.[1] ?? l?.[2] ?? l?.[3] ?? "").toLowerCase();
    if (!m || !t.includes(m)) continue;
    const v = r.match(/\bcontent\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/i), a = v?.[1] ?? v?.[2] ?? v?.[3];
    if (a && a.trim())
      return Yn(a);
  }
}
function su(e, t) {
  const o = String(e || "").slice(0, 12e4), i = o.match(/<title[^>]*>([\s\S]*?)<\/title>/i), r = $o(o, ["og:title", "twitter:title"]), l = i ? Yn(i[1]) : void 0, m = $o(o, ["og:description", "twitter:description", "description"]), v = $o(o, ["og:image", "twitter:image", "twitter:image:src"]), a = $o(o, ["og:site_name", "application-name"]);
  return {
    title: r || l || void 0,
    description: m,
    imageUrl: nu(v, t),
    siteName: a
  };
}
const ve = ue({
  isOpen: !1,
  target: null,
  metaLoading: !1,
  meta: null
}), Mo = /* @__PURE__ */ new Map();
let Gt, io = 0;
async function cn(e, t = !1) {
  if (!e) return;
  if (!t && Mo.has(e)) {
    ve.meta = Mo.get(e), ve.metaLoading = !1;
    return;
  }
  Gt?.abort();
  const o = new AbortController();
  Gt = o;
  const i = ++io;
  ve.metaLoading = !0, ve.meta = null;
  const r = setTimeout(() => o.abort(), 8e3);
  try {
    const l = await fetch(e, {
      method: "GET",
      signal: o.signal,
      credentials: "omit",
      redirect: "follow"
    });
    if (i !== io || o.signal.aborted) return;
    if (!l.ok)
      throw new Error(`HTTP ${l.status}`);
    const m = l.headers.get("content-type") || "";
    if (m && !/html|xml|text/i.test(m)) {
      const I = {
        siteName: new URL(e).hostname,
        fetchedAt: Date.now()
      };
      Mo.set(e, I), ve.meta = I;
      return;
    }
    const v = await l.text();
    if (i !== io || o.signal.aborted) return;
    const x = { ...su(v, l.url || e), fetchedAt: Date.now() };
    Mo.set(e, x), ve.meta = x;
  } catch (l) {
    if (i !== io || o.signal.aborted) return;
    ve.meta = {
      fetchedAt: Date.now(),
      error: l?.message || "未能读取站点元信息"
    };
  } finally {
    clearTimeout(r), Gt === o && (Gt = void 0), i === io && (ve.metaLoading = !1);
  }
}
const hf = {
  open(e) {
    const t = ln(e.url);
    ve.target = {
      ...e,
      url: t || e.url
    }, ve.isOpen = !0, t ? cn(t) : (ve.metaLoading = !1, ve.meta = { fetchedAt: Date.now(), error: "仅支持预览 HTTP/HTTPS 网址" });
  },
  refreshMeta() {
    const e = ln(ve.target?.url || "");
    e && cn(e, !0);
  },
  updateNote(e) {
    ve.target && (ve.target = { ...ve.target, note: e });
  },
  close() {
    Gt?.abort(), Gt = void 0, ve.isOpen = !1, ve.metaLoading = !1;
  }
}, ru = ["onKeydown"], au = { class: "fo-up-preview-head" }, lu = ["src"], cu = { class: "fo-up-preview-meta" }, du = { class: "fo-up-preview-name-row" }, uu = ["href"], pu = ["disabled"], hu = { class: "fo-up-preview-sign" }, fu = { class: "fo-up-preview-videos" }, gu = {
  key: 0,
  class: "fo-up-preview-loading"
}, mu = {
  key: 1,
  class: "fo-up-preview-empty"
}, wu = {
  key: 2,
  class: "fo-up-preview-empty"
}, yu = ["href", "title", "onClick"], vu = ["src"], bu = {
  key: 0,
  class: "fo-bili-duration"
}, ku = { class: "fo-up-preview-video-info" }, _u = ["href", "title", "onClick"], xu = { class: "fo-up-preview-video-meta" }, Cu = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2394a3b8'%3E%3Cpath d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/%3E%3C/svg%3E", Lu = /* @__PURE__ */ he({
  __name: "BiliUpPreview",
  setup(e) {
    const t = X(!1);
    function o() {
      if (!ie.submitting) {
        if (!ie.followed) {
          t.value = !1, No.toggleFollow();
          return;
        }
        if (!t.value) {
          t.value = !0;
          return;
        }
        t.value = !1, No.toggleFollow();
      }
    }
    function i() {
      t.value = !1, No.close();
    }
    function r(l, m) {
      l.ctrlKey || l.metaKey || (l.preventDefault(), l.stopPropagation(), m.bvid ? (Io.openVideo({
        bvid: m.bvid,
        title: m.title,
        cover: m.cover,
        author: ie.name,
        authorFace: ie.face,
        mid: ie.mid,
        url: m.url
      }), i()) : m.url && m.url !== "#" && window.open(m.url, "_blank"));
    }
    return (l, m) => s(ie).open ? (c(), w("div", {
      key: 0,
      class: "fo-up-preview-backdrop",
      onPointerdown: U(i, ["self"])
    }, [
      n("aside", {
        class: "fo-up-preview-popover",
        style: ke({ left: `${s(ie).left}px`, top: `${s(ie).top}px` }),
        onKeydown: _s(U(i, ["stop", "prevent"]), ["esc"])
      }, [
        n("div", au, [
          n("img", {
            class: "fo-up-preview-avatar",
            src: s(ie).face || Cu,
            alt: "",
            referrerpolicy: "no-referrer"
          }, null, 8, lu),
          n("div", cu, [
            n("div", du, [
              n("a", {
                class: "fo-up-preview-name",
                href: `https://space.bilibili.com/${s(ie).mid}`,
                target: "_blank",
                rel: "noreferrer"
              }, u(s(ie).name), 9, uu),
              n("button", {
                type: "button",
                class: se([
                  s(ie).followed ? "fo-up-preview-unfollow" : "fo-up-preview-follow",
                  { "is-armed": t.value }
                ]),
                disabled: s(ie).submitting,
                onClick: o
              }, u(s(ie).submitting ? "处理中…" : t.value ? "确定取消？" : s(ie).followed ? "取消关注" : "＋ 关注"), 11, pu)
            ]),
            n("p", hu, u(s(ie).sign || "暂无个人简介"), 1)
          ]),
          n("button", {
            type: "button",
            class: "fo-up-preview-close",
            "aria-label": "关闭预览",
            onClick: i
          }, "✕")
        ]),
        m[1] || (m[1] = n("div", { class: "fo-up-preview-title-tag" }, "近期投稿视频（最新 2~3 个）", -1)),
        n("div", fu, [
          s(ie).loading ? (c(), w("div", gu, [...m[0] || (m[0] = [
            n("i", null, null, -1),
            n("span", null, "正在读取近期投稿…", -1)
          ])])) : s(ie).error ? (c(), w("p", mu, u(s(ie).error), 1)) : s(ie).videos.length ? (c(!0), w(ee, { key: 3 }, be(s(ie).videos, (v) => (c(), w("article", {
            key: v.bvid,
            class: "fo-up-preview-video"
          }, [
            n("a", {
              class: "fo-up-preview-thumb",
              href: v.url,
              title: `就地播放「${v.title}」（Ctrl+点击在网页打开）`,
              onClick: (a) => r(a, v)
            }, [
              n("img", {
                src: v.cover,
                alt: "",
                loading: "lazy",
                referrerpolicy: "no-referrer"
              }, null, 8, vu),
              v.duration ? (c(), w("span", bu, u(v.duration), 1)) : W("", !0)
            ], 8, yu),
            n("div", ku, [
              n("a", {
                class: "fo-up-preview-video-title",
                href: v.url,
                title: `就地播放「${v.title}」（Ctrl+点击在网页打开）`,
                onClick: (a) => r(a, v)
              }, u(v.title), 9, _u),
              n("div", xu, [
                n("span", null, "▣ " + u(v.playCount), 1),
                n("span", null, u(v.published), 1)
              ])
            ])
          ]))), 128)) : (c(), w("p", wu, "该 UP 主近期暂无视频动态"))
        ])
      ], 44, ru)
    ], 32)) : W("", !0);
  }
}), Su = /* @__PURE__ */ Re(Lu, [["__scopeId", "data-v-bf6dab49"]]), Tu = { class: "logicweaver-overlays-layer" }, $u = { id: "vue-notification-root" }, Mu = {
  id: "bili-profile-menu",
  class: "bili-profile-menu",
  hidden: ""
}, Iu = { id: "vue-bili-message-panel-root" }, Au = { id: "vue-tab-manager-root" }, Eu = { id: "vue-bookmark-menu-root" }, Du = { id: "vue-bookmark-panel-root" }, Pu = { id: "vue-launcher-dialogs-root" }, Wu = { id: "vue-launcher-folder-root" }, Nu = { id: "vue-launcher-menus-root" }, Ou = { id: "vue-settings-dialog-root" }, Ru = { id: "vue-clock-settings-root" }, Bu = { id: "vue-bili-theater-root" }, Hu = { id: "vue-bili-mini-player-root" }, Fu = { id: "vue-ai-dialog-root" }, ju = { id: "vue-aihot-viewer-root" }, Vu = { id: "vue-nav-wheel-root" }, Ku = { id: "vue-github-detail-root" }, zu = { id: "vue-bili-subtitle-modal-root" }, Gu = { id: "vue-bili-video-task-modal-root" }, Uu = { id: "vue-github-task-modal-root" }, Yu = { id: "vue-web-task-modal-root" }, qu = { id: "vue-web-preview-modal-root" }, Xu = { id: "vue-firecrawl-modal-root" }, Ju = { id: "vue-floating-image-viewer-root" }, Qu = { id: "vue-command-palette-root" }, Zu = /* @__PURE__ */ he({
  __name: "AppOverlays",
  setup(e) {
    const t = Oe(() => St.state.isOpen), o = Oe(() => Wo.isOpen), i = Oe(() => $t.state.isOpen), r = Oe(() => ir.open), l = Oe(() => ro.state.isOpen), m = Oe(() => Qs.isOpen), v = Oe(() => Zs.isOpen), a = Oe(() => Ai.state.isOpen), x = Oe(() => Ss.isOpen), I = Oe(() => $e.isOpen), A = Oe(() => ys.isOpen);
    let f;
    Ke(() => {
      f = vs();
    }), kt(() => {
      f?.();
    });
    const T = Oe(() => Ti.state.isOpen), g = Oe(() => pt.isOpen), p = Oe(() => ve.isOpen), b = Oe(() => qt.editDialog.isOpen || qt.linkMove.isOpen || qt.folderMove.isOpen || qt.groupMerge.isOpen || qt.folderDelete.isOpen), C = F(() => import("./ProfileMenu-BKKiuKE4.js")), D = F(() => import("./BookmarkNoteMenu-SEdS5Jqo.js")), S = F(() => import("./BookmarkPanel-C-vifH-L.js")), B = F(() => import("./ClockSettingsMenu-cUFblzEB.js")), V = F(() => import("./TabManagerPanel-CRnNIbsR.js")), M = F(() => import("./LauncherDialogs-BA4QlY4b.js")), L = F(() => import("./LauncherFolderDialog-CvEIkFbX.js")), _ = F(() => import("./LauncherMenus-CtGNtWCI.js")), P = F(() => import("./SettingsDialog-oeAnMYp2.js")), _e = F(() => import("./BiliMiniPlayer-BtWdfkq4.js")), N = F(() => import("./BiliTheaterDialog-CJQ4aBgZ.js")), O = F(() => import("./BiliMessagePanel-wVla69aK.js")), E = F(() => import("./AiDialog-D987iczm.js")), j = F(() => import("./AihotViewer-61kqrSLW.js")), pe = F(() => import("./NavWheelOverlay-C08KumFD.js")), we = F(() => import("./GitHubRepoDetailDrawer-B1qbq-N1.js")), nt = F(() => import("./InPageSideDrawer-O98gJrHG.js")), Be = F(() => import("./BiliSubtitleModal-yIl7Ea_G.js")), ct = F(() => import("./BiliVideoTaskModal-9aM4WsBu.js")), dt = F(() => import("./GitHubTaskModal-DjShlEFV.js")), ze = F(() => import("./WebSiteTaskModal-BRz-e09Y.js")), We = F(() => import("./WebSitePreviewModal-DAktj5qC.js")), Ie = F(() => import("./FirecrawlModal-CduwAFgT.js")), ye = F(() => import("./FloatingImageViewer-8hfurQL6.js")), He = F(() => import("./CommandPalette-C7nh0ICb.js")), et = F(() => import("./AppPromptModal-Cy4fFeAF.js")), Se = F(async () => {
      const [fo, go] = await Promise.all([
        import("./PluginMarketDialog-CkXmFmc-.js"),
        import("./plugin-market-Dbkvvkyi.js")
      ]);
      return wr("logicweaver-market-styles", go.default), fo.default;
    });
    return (fo, go) => (c(), w("div", Tu, [
      n("div", $u, [
        Q(Un)
      ]),
      n("div", Mu, [
        Q(s(C))
      ]),
      n("div", Iu, [
        s(v) ? (c(), ne(s(O), { key: 0 })) : W("", !0)
      ]),
      n("div", Au, [
        s(o) ? (c(), ne(s(V), { key: 0 })) : W("", !0)
      ]),
      n("div", Eu, [
        s(T) ? (c(), ne(s(D), { key: 0 })) : W("", !0)
      ]),
      n("div", Du, [
        Q(s(S))
      ]),
      n("div", Pu, [
        s(b) ? (c(), ne(s(M), { key: 0 })) : W("", !0)
      ]),
      n("div", Wu, [
        s(g) ? (c(), ne(s(L), { key: 0 })) : W("", !0)
      ]),
      n("div", Nu, [
        Q(s(_))
      ]),
      n("div", Ou, [
        Q(s(P))
      ]),
      n("div", Ru, [
        s(i) ? (c(), ne(s(B), { key: 0 })) : W("", !0)
      ]),
      n("div", Bu, [
        s(l) ? (c(), ne(s(N), { key: 0 })) : W("", !0)
      ]),
      n("div", Hu, [
        s(m) ? (c(), ne(s(_e), { key: 0 })) : W("", !0)
      ]),
      n("div", Fu, [
        s(a) ? (c(), ne(s(E), { key: 0 })) : W("", !0)
      ]),
      n("div", ju, [
        s(r) ? (c(), ne(s(j), { key: 0 })) : W("", !0)
      ]),
      n("div", Vu, [
        Q(s(pe))
      ]),
      Q(iu),
      n("div", Ku, [
        s(x) ? (c(), ne(s(we), { key: 0 })) : W("", !0)
      ]),
      n("div", zu, [
        Q(s(Be))
      ]),
      n("div", Gu, [
        Q(s(ct))
      ]),
      n("div", Uu, [
        Q(s(dt))
      ]),
      n("div", Yu, [
        Q(s(ze))
      ]),
      n("div", qu, [
        s(p) ? (c(), ne(s(We), { key: 0 })) : W("", !0)
      ]),
      n("div", Xu, [
        Q(s(Ie))
      ]),
      n("div", Ju, [
        Q(s(ye))
      ]),
      n("div", Qu, [
        s(I) ? (c(), ne(s(He), { key: 0 })) : W("", !0)
      ]),
      s(A) ? (c(), ne(s(nt), { key: 0 })) : W("", !0),
      Q(Su),
      Q(s(et)),
      s(t) ? (c(), ne(s(Se), { key: 1 })) : W("", !0)
    ]));
  }
});
let pi = !1;
function ep(e = 1800) {
  if (pi || typeof window > "u") return;
  const t = () => {
    if (pi) return;
    pi = !0;
    const o = Cn();
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
const tp = ["data-active-workspace"], op = /* @__PURE__ */ he({
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
      multica: {
        title: "AI 工作区",
        icon: "assets/nav-ai.svg",
        iconType: "image/svg+xml"
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
    let r = "", l, m;
    function v(A) {
      A.target === "github" && A.githubRule && Ve.setSearchRule(A.githubRule), Ps(A.target, A.keyword), A.target === "netease" ? Ce.open("music") : Tt.enter(A.target === "github" ? "card-github" : "daily-bilibili");
    }
    function a(A, f = "image/svg+xml") {
      if (typeof document > "u") return;
      const T = typeof chrome < "u" && chrome.runtime?.getURL ? chrome.runtime.getURL(A) : A;
      if (r === T) return;
      r = T;
      const g = document.querySelectorAll("link[rel*='icon']");
      if (g.length > 0)
        g.forEach((p) => {
          p.type = f, p.href = T;
        });
      else {
        const p = document.createElement("link");
        p.rel = "icon", p.type = f, p.href = T, document.head.appendChild(p);
      }
    }
    function x() {
      if (typeof document > "u") return;
      const A = i[wo.value] || i.home;
      if (a(A.icon, A.iconType), te.playing && te.title) {
        const f = te.artist ? ` - ${te.artist}` : "";
        document.title = `▶ ${te.title}${f}`;
        return;
      }
      if (Jt.playing && Jt.title) {
        document.title = `▶ ${Jt.title} · 电台`;
        return;
      }
      document.title = A.title;
    }
    it(
      [
        () => wo.value,
        () => te.playing,
        () => te.title,
        () => te.artist,
        () => Jt.playing,
        () => Jt.title
      ],
      () => {
        x();
      },
      { immediate: !0 }
    );
    const I = re(() => wo.value === "home" ? "" : wo.value);
    return it(() => mt.activeId, xn, { immediate: !0, flush: "sync" }), Ke(() => {
      typeof chrome < "u" && chrome.runtime?.onMessage && (m = Ds(v)), typeof document < "u" && (document.body.dataset.spa = "1");
      try {
        _i.bindGlobalListener(), Pe.start(), an.start(), gi.init().catch((A) => console.warn("[Launcher] 初始化失败", A)), ep(), l = setTimeout(() => {
          import("./webdav-auto-sync-Ccqsjq8m.js").then(async (A) => {
            const f = await A.runWebDavAutoSync();
            f.status === "error" || f.status === "conflict" ? de.show({ appType: "sync", appName: "WebDAV 同步", title: "自动同步已暂停", message: f.message || "请检查同步设置。", level: "warning", history: !0, target: { type: "module", moduleId: "sync" }, actionLabel: "查看设置", showActions: !0, duration: 12e3, onClick: () => po.open("sync") }) : f.status === "downloaded" && de.show({ appType: "sync", appName: "WebDAV 同步", title: "已恢复云端更新", message: "请刷新已打开的页面以查看同步后的配置。", level: "info", showActions: !1, duration: 6e3 });
          }).catch(() => {
          });
        }, 8e3), setTimeout(() => {
          gr({ type: "cleanupNativeTabs" });
        }, 400);
      } catch (A) {
        console.warn("[App] Runtime start error:", A);
      }
    }), kt(() => {
      m?.(), l && clearTimeout(l), Pe.stop(), gi.stop(), an.stop(), document.body.classList.remove("has-card-fullscreen"), typeof document < "u" && o && (document.title = o);
    }), t({
      activeWorkspaceId: I,
      windowManagerController: Ce
    }), (A, f) => (c(), w("div", {
      id: "logicweaver-spa-root",
      class: "logicweaver-spa-root",
      "data-active-workspace": I.value || ""
    }, [
      Q(rd),
      Q(fd),
      n("nav", {
        id: "mac-dock",
        class: se(["mac-dock", "dock-" + s(Bt).position]),
        "aria-label": "快捷应用栏"
      }, [
        Q(Gn)
      ], 2),
      Q(Zu)
    ], 8, tp));
  }
}), ip = /* @__PURE__ */ Re(op, [["__scopeId", "data-v-7f44ffd3"]]), np = {
  class: "endfield-stage",
  "aria-hidden": "true"
}, sp = {
  class: "rhinelab-stage",
  "aria-hidden": "true"
}, rp = { class: "rhine-scaler" }, ap = { class: "rhine-center-group" }, lp = { class: "rhine-auth-status" }, cp = { class: "rhine-auth-text" }, dp = ["hidden"], up = { class: "rhine-cinema-caption" }, pp = /* @__PURE__ */ he({
  __name: "IntroAnimation",
  setup(e) {
    const t = X(window.innerHeight), o = X(window.innerWidth), i = X(!1), r = X(!1), l = X(10), m = X(1), v = X(0), a = /* @__PURE__ */ new Set();
    let x = 0, I = () => {
    };
    const A = re(() => `${String(Math.round(Ye.renderedProgress)).padStart(2, "0")}%`), f = re(() => {
      const L = Ye.renderedProgress / 100 * t.value + 10;
      return `${Math.min(L, Math.max(0, t.value - 102)).toFixed(1)}px`;
    }), T = re(() => Ye.renderedProgress >= 75 ? "START PROCESSING..." : Ye.renderedProgress >= 35 ? "REQUEST RECEIVED" : "ID CONFIRMED : JOYCE MOORE"), g = re(() => Ye.finished ? "身份验证通过 · 欢迎进入终端" : Ye.status ? `身份信息确认 · ${Ye.status.replace(/^.*?\/\s*/, "")}` : "身份信息确认：JOYCE MOORE"), p = re(() => String(Math.max(0.35, Math.min(o.value / 1920, t.value / 1080))));
    function b(L, _) {
      const P = window.setTimeout(() => {
        a.delete(P), L();
      }, _);
      a.add(P);
    }
    function C() {
      window.dispatchEvent(new CustomEvent("logicweaver:intro-complete"));
    }
    function D(L) {
      if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
        C();
        return;
      }
      const _ = L ? 180 : 260, P = L ? 200 : 280, _e = performance.now(), N = (O) => {
        const E = O - _e, j = Math.min(1, E / _), pe = 1 - Math.pow(1 - j, 3);
        if (l.value = 10 + pe * Math.max(0, o.value - 10), E > _ && (m.value = Math.max(0, 1 - (E - _) / P)), E >= _ + P) {
          C();
          return;
        }
        x = requestAnimationFrame(N);
      };
      b(() => {
        x = requestAnimationFrame(N);
      }, L ? 60 : 120);
    }
    function S(L) {
      L || (i.value = !0), b(() => {
        r.value = !0, v.value = 6, m.value = 0, b(C, 380);
      }, L ? 40 : 420);
    }
    function B(L) {
      Ye.style === "rhinelab" ? S(L) : D(L);
    }
    function V() {
      o.value = window.innerWidth, t.value = window.innerHeight;
    }
    function M(L) {
      Ye.finished || (L.key === "Enter" || L.key === " " || L.key === "Escape") && (L.preventDefault(), lt.skip("KEYBOARD SKIP"));
    }
    return Ke(() => {
      document.documentElement.dataset.startupStyle = Ye.style, document.documentElement.style.setProperty("--rhine-scale", p.value), window.addEventListener("resize", V, { passive: !0 }), window.addEventListener("keydown", M, !0), I = Tr(B), In();
    }), uo(() => {
      I(), window.removeEventListener("resize", V), window.removeEventListener("keydown", M, !0), cancelAnimationFrame(x);
      for (const L of a) clearTimeout(L);
      a.clear();
    }), (L, _) => (c(), w("div", {
      class: "intro-vue-content",
      style: ke({ "--rhine-scale": p.value, opacity: m.value, filter: `blur(${v.value}px)` })
    }, [
      n("div", np, [
        _[2] || (_[2] = n("div", { class: "endfield-loader-texture" }, null, -1)),
        _[3] || (_[3] = n("div", { class: "endfield-loader-rail" }, null, -1)),
        n("div", {
          class: "endfield-loader-fill",
          style: ke({ height: `${s(Ye).renderedProgress}%` })
        }, null, 4),
        n("div", {
          class: "endfield-loader-meter",
          style: ke({ top: f.value })
        }, [
          _[1] || (_[1] = n("span", { class: "endfield-loader-tick" }, null, -1)),
          n("b", null, u(A.value), 1),
          n("small", null, u(s(Ye).status), 1)
        ], 4),
        _[4] || (_[4] = no('<section class="endfield-loader-brand"><span class="endfield-loader-kicker">DEEPSEEK HARNESS</span><strong>END</strong><strong>FIELD</strong><span class="endfield-loader-detail"><i class="endfield-loader-chevron"></i><span>EDGE INTELLIGENCE THEME</span><small>TERRA RESEARCH COMMISSION / BOOT SEQUENCE</small><span class="endfield-loader-squares"><i class="on"></i><i class="on"></i><i class="on"></i><i></i><i></i><i></i><i class="on"></i><i class="on"></i><i></i><i></i><i></i><i></i></span></span><em>OVER THE FRONTIER / INTO THE FRONT</em></section>', 1)),
        n("div", {
          class: "endfield-loader-wipe",
          style: ke({ width: `${l.value}px`, opacity: l.value > 10 ? 1 : 0 })
        }, null, 4)
      ]),
      n("div", sp, [
        _[12] || (_[12] = no('<div class="rhine-background"><svg viewBox="0 0 1920 1080" preserveAspectRatio="none"><g fill="none" stroke="#ffffff" stroke-width="2.5"><path class="rhine-drift-path1" d="M-210 705C-45 705 182 704 247 567C337 377 99 306 4 435S27 680 169 631C309 584 227 314 279 111S568-113 568-113"></path><path class="rhine-drift-path2" d="M1560-80C1374 114 1671 168 1601 323S1371 367 1431 480S1692 666 1559 787S1329 886 1498 1130"></path><circle class="rhine-drift-circle" cx="1450" cy="648" r="346"></circle><circle class="rhine-drift-circle2" cx="1450" cy="648" r="348"></circle></g></svg></div>', 1)),
        n("div", rp, [
          _[10] || (_[10] = no('<header class="rhine-brand"><h1>RHINE LAB</h1><div class="rhine-brand-sub">SYNTHESIZE INFORMATION</div><p class="rhine-brand-os"><span class="rhine-brand-analysis"><span style="left:2px;">A</span><span style="left:28px;">N</span><span style="left:55px;">A</span><span style="left:81px;">L</span><span style="left:103px;">Y</span><span style="left:129px;">S</span><span style="left:154px;">I</span><span style="left:166px;">S</span></span><b>OS</b></p></header>', 1)),
          n("button", {
            class: "rhine-skip",
            type: "button",
            title: "点击进入系统 (或按 Enter)",
            onClick: _[0] || (_[0] = (P) => s(lt).skip("ENTER SYSTEM"))
          }, [..._[5] || (_[5] = [
            at("ENTER SYSTEM ", -1),
            n("span", null, "↗", -1)
          ])]),
          n("div", ap, [
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
            n("div", lp, [
              _[6] || (_[6] = n("span", { class: "rhine-auth-dot" }, "·", -1)),
              n("span", cp, u(T.value), 1),
              _[7] || (_[7] = n("i", {
                class: "rhine-cursor",
                "aria-hidden": "true"
              }, null, -1))
            ])
          ]),
          n("div", {
            class: se(["rhine-scan", { active: i.value }]),
            hidden: !i.value
          }, [..._[9] || (_[9] = [
            no('<svg viewBox="0 0 1920 1080" aria-hidden="true"><g fill="none" stroke="#080a08" stroke-linecap="round"><circle class="rhine-scan-circle ring-outer" cx="960" cy="540" r="280" stroke-width="2.5"></circle><circle class="rhine-scan-circle ring-white" cx="960" cy="540" r="260" stroke="#fff" stroke-width="3.5"></circle><circle class="rhine-scan-circle ring-inner" cx="960" cy="540" r="220" stroke-width="2"></circle><circle class="rhine-orbit-dot dot-1" cx="960" cy="260" r="8" fill="#ed821b" stroke="none"></circle><circle class="rhine-orbit-dot dot-2" cx="960" cy="820" r="8" fill="#ed821b" stroke="none"></circle><circle class="rhine-scan-core" cx="960" cy="540" r="6" fill="#080a08" stroke="none"></circle></g></svg><span class="rhine-scan-label">PERMISSION AUTHORIZED</span>', 2)
          ])], 10, dp),
          n("div", up, u(g.value), 1),
          _[11] || (_[11] = n("div", { class: "rhine-powered" }, [
            at("POWERED BY "),
            n("b", null, "RHINE LAB"),
            n("i")
          ], -1))
        ]),
        n("div", {
          class: se(["rhine-white", { flash: r.value }]),
          "aria-hidden": "true"
        }, null, 2)
      ])
    ], 4));
  }
}), hp = /* @__PURE__ */ he({
  __name: "ProfileMenu",
  setup(e) {
    function t(o) {
      ho.trigger(o);
    }
    return (o, i) => (c(), w(ee, null, [
      n("button", {
        type: "button",
        "data-action": "messages",
        onClick: i[0] || (i[0] = U((r) => t("messages"), ["stop"]))
      }, u(s(d)("profile.menu.notifications")), 1),
      n("button", {
        type: "button",
        "data-action": "tabs",
        onClick: i[1] || (i[1] = U((r) => t("tabs"), ["stop"]))
      }, u(s(d)("profile.menu.tabs")), 1),
      n("button", {
        type: "button",
        "data-action": "refresh",
        onClick: i[2] || (i[2] = U((r) => t("refresh"), ["stop"]))
      }, u(s(d)("profile.menu.refreshBili")), 1),
      n("button", {
        type: "button",
        "data-action": "switch",
        onClick: i[3] || (i[3] = U((r) => t("switch"), ["stop"]))
      }, u(s(d)("profile.menu.switchUser")), 1),
      n("button", {
        type: "button",
        "data-action": "web",
        onClick: i[4] || (i[4] = U((r) => t("web"), ["stop"]))
      }, u(s(d)("profile.menu.biliCenter")), 1)
    ], 64));
  }
}), fp = /* @__PURE__ */ he({
  __name: "WorkspaceLaunchers",
  setup(e) {
    function t(o) {
      Ii.openWorkspace(o, !0);
    }
    return (o, i) => (c(), w(ee, null, [
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
      xs(o.$slots, "default")
    ], 64));
  }
}), gp = {
  key: 0,
  "aria-label": "AI 分析任务"
}, mp = { role: "status" }, wp = ["disabled"], yp = ["disabled"], vp = /* @__PURE__ */ he({
  __name: "GitHubStatus",
  setup(e) {
    return (t, o) => s(Ue).message || s(Ue).busy ? (c(), w("section", gp, [
      n("p", mp, u(s(Ue).repo ? `原任务仓库：${s(Ue).repo}。 ` : "") + u(s(Ue).message), 1),
      s(Ue).busy ? (c(), w("button", {
        key: 0,
        type: "button",
        onClick: o[0] || (o[0] = (i) => s(Ve).stopAiAnalysis())
      }, "停止后续分析 / 中断等待")) : W("", !0),
      s(Ue).uncertain ? (c(), w(ee, { key: 1 }, [
        o[5] || (o[5] = n("p", null, "AI 结果未确认，已阻止本页再次提交。请到供应商核对请求和计费；本页记录在整页关闭或重载后会丢失。", -1)),
        s(Ue).unlockConfirmation ? (c(), w(ee, { key: 1 }, [
          o[4] || (o[4] = n("p", null, "扩展不能验证供应商任务；确认只解除本页限制，不代表成功，也不会重发请求。", -1)),
          n("button", {
            type: "button",
            disabled: s(Ue).busy,
            onClick: o[2] || (o[2] = (i) => s(Ve).acknowledgeAiChecked())
          }, "确认解除本页限制", 8, yp),
          n("button", {
            type: "button",
            onClick: o[3] || (o[3] = (i) => s(Ue).unlockConfirmation = !1)
          }, "保持限制")
        ], 64)) : (c(), w("button", {
          key: 0,
          type: "button",
          disabled: s(Ue).busy,
          onClick: o[1] || (o[1] = (i) => s(Ue).unlockConfirmation = !0)
        }, "我已核对供应商记录", 8, wp))
      ], 64)) : W("", !0)
    ])) : W("", !0);
  }
}), Y = ue({ repo: "", text: "", baseline: "", busy: !1, message: "", storedValue: null });
function dn(e, t = !1) {
  if (!e || Y.busy) return;
  if (Y.repo && Y.text !== Y.baseline) {
    Y.message = "请先保存或明确取消当前草稿，再编辑或清除其它备注。";
    return;
  }
  const o = Ve.remarks[e]?.userRemark, i = typeof o == "string" ? o : "";
  Object.assign(Y, {
    repo: e,
    baseline: i,
    text: t ? "" : i,
    storedValue: null,
    message: t ? "清除已准备；点击保存才会清除手写备注，AI 简介不变。" : "仅点击保存或 Enter 才写入；草稿只保留在本页内存。"
  });
}
function hi() {
  Y.busy || Object.assign(Y, { repo: "", text: "", baseline: "", storedValue: null, message: "" });
}
async function fi() {
  if (Y.busy || !Y.repo) return;
  const { repo: e, text: t, baseline: o } = Y;
  Y.busy = !0;
  try {
    await Ve.updateRepoRemark(e, { userRemark: t.trim() }, o), Object.assign(Y, { repo: "", text: "", baseline: "", storedValue: null, message: `${e} 的备注已保存并回读核对。` });
  } catch (i) {
    Y.message = i instanceof Error ? i.message : "保存未确认，草稿保留，请先读取已保存值核对。";
  } finally {
    Y.busy = !1;
  }
}
async function un() {
  if (Y.busy || !Y.repo) return;
  const e = Y.repo;
  Y.busy = !0;
  try {
    const o = (await Ve.reloadRepoRemarks())[e]?.userRemark;
    if (o !== void 0 && typeof o != "string") throw new Error("保存值格式异常，未变更草稿或覆盖基准。");
    Y.storedValue = o ?? "", Y.baseline = o ?? "", Y.message = "已读取保存值，草稿没有替换。请对比下方保存值；再次点击保存将以草稿替换它。";
  } catch (t) {
    Y.message = t instanceof Error ? t.message : "读取失败，草稿保留。";
  } finally {
    Y.busy = !1;
  }
}
const bp = ["disabled"], kp = ["disabled"], _p = ["disabled"], xp = ["disabled"], Cp = {
  key: 0,
  style: { width: "100%", "white-space": "pre-wrap", "overflow-wrap": "anywhere" }
}, pn = /* @__PURE__ */ he({
  __name: "GitHubRemarkEditor",
  props: {
    active: { type: Boolean }
  },
  setup(e) {
    const t = e, o = X(null);
    function i(r) {
      if (!(Li(r) || !t.active)) {
        if (r.key === "Escape") {
          r.preventDefault(), r.stopPropagation(), hi();
          return;
        }
        mn(r, fi);
      }
    }
    return Ke(() => {
      gt(() => {
        t.active && !Y.busy && o.value?.focus();
      });
    }), (r, l) => (c(), w("div", {
      class: "gh-inline-remark-box",
      style: { "flex-wrap": "wrap", "max-width": "100%" },
      onClick: l[4] || (l[4] = U(() => {
      }, ["stop"]))
    }, [
      It(n("input", {
        ref_key: "input",
        ref: o,
        "onUpdate:modelValue": l[0] || (l[0] = (m) => s(Y).text = m),
        class: "gh-inline-remark-input",
        type: "text",
        maxlength: "100",
        "aria-label": "手写仓库备注",
        placeholder: "备注说明…",
        disabled: s(Y).busy || !e.active,
        onKeydown: i
      }, null, 40, bp), [
        [Vo, s(Y).text]
      ]),
      n("button", {
        type: "button",
        class: "gh-inline-remark-btn save",
        title: "保存备注",
        disabled: s(Y).busy || !e.active,
        onClick: l[1] || (l[1] = //@ts-ignore
        (...m) => s(fi) && s(fi)(...m))
      }, "✓", 8, kp),
      n("button", {
        type: "button",
        class: "gh-inline-remark-btn cancel",
        title: "取消草稿",
        disabled: s(Y).busy || !e.active,
        onClick: l[2] || (l[2] = //@ts-ignore
        (...m) => s(hi) && s(hi)(...m))
      }, "✕", 8, _p),
      n("button", {
        type: "button",
        disabled: s(Y).busy || !e.active,
        onClick: l[3] || (l[3] = //@ts-ignore
        (...m) => s(un) && s(un)(...m))
      }, "读取已保存值", 8, xp),
      s(Y).storedValue !== null ? (c(), w("p", Cp, "已保存值：" + u(s(Y).storedValue || "（空）"), 1)) : W("", !0)
    ]));
  }
}), Lp = {
  key: 0,
  role: "status"
}, Sp = {
  key: 1,
  "aria-label": "未显示仓库的备注草稿"
}, Tp = {
  key: 2,
  class: "gh-search-options",
  style: { margin: "0 0 10px" }
}, $p = { style: { "font-size": "12px", color: "var(--dim)" } }, Mp = {
  key: 3,
  class: "gh-repos-loading"
}, Ip = {
  key: 4,
  class: "muted small",
  style: { "text-align": "center", padding: "40px 0", "font-size": "13px" }
}, Ap = ["data-repo-name", "onClick", "onContextmenu", "onDragstart"], Ep = ["onClick"], Dp = { class: "gh-card-head" }, Pp = ["checked", "onChange"], Wp = ["src"], Np = ["href", "title"], Op = { class: "owner" }, Rp = { class: "gh-card-body" }, Bp = { class: "gh-card-badges" }, Hp = ["title", "onClick"], Fp = ["onClick"], jp = ["title", "onClick"], Vp = { class: "gh-badge-remark-text" }, Kp = {
  key: 0,
  class: "desc gh-desc-analyzing",
  title: "正在使用 AI 分析仓库…"
}, zp = {
  key: 1,
  class: "desc gh-desc-ai",
  title: "AI 中文简介（点击可直接修改，右键可重新分析）"
}, Gp = ["title"], Up = {
  key: 3,
  class: "desc dim"
}, Yp = { class: "meta" }, qp = { class: "gh-stars" }, Xp = {
  key: 0,
  class: "gh-lang"
}, Jp = {
  key: 1,
  class: "gh-updated"
}, Qp = {
  key: 6,
  class: "gh-pager"
}, Zp = ["disabled"], eh = { class: "gh-page-info" }, th = ["disabled"], oh = ["onClick"], ih = /* @__PURE__ */ he({
  __name: "GitHubRepositories",
  props: {
    active: { type: Boolean, default: !0 }
  },
  setup(e) {
    const t = e, o = re(() => !!Y.repo && !fe.cards.some((M) => M.fullName === Y.repo)), i = ue({
      visible: !1,
      x: 0,
      y: 0,
      fullName: "",
      folders: [],
      hasRemark: !1,
      url: ""
    }), r = X(null), l = X(!1);
    function m(M, L) {
      const _ = M.target;
      if (_ instanceof Element) {
        if (fe.batchMode) {
          if (_.closest(".fo-card-more,.gh-badge-folder,.gh-badge-remark,.gh-inline-remark-box")) return;
          M.preventDefault(), M.stopPropagation(), vt.toggleSelection(L.fullName);
          return;
        }
        _.closest("a,button,.gh-badge-folder,.gh-badge-remark,.fo-card-more,.gh-card-hole,.gh-card-checkbox,.gh-inline-remark-box") || (M.preventDefault(), M.stopPropagation(), Ts.open(L.fullName, void 0, L));
      }
    }
    function v(M, L) {
      if (!t.active) return;
      M.preventDefault(), M.stopPropagation();
      const _ = 12, P = 160, _e = 280, N = Math.min(window.innerWidth - P - _, Math.max(_, M.clientX)), O = Math.min(window.innerHeight - _e - _, Math.max(_, M.clientY));
      i.x = N, i.y = O, i.fullName = L.fullName, i.folders = [...L.folders || (L.folder ? [L.folder] : [])], i.hasRemark = !!L.customRemark, i.url = L.url, i.visible = !0, r.value = null, l.value = N > window.innerWidth - 380;
    }
    function a(M, L) {
      v(L, M), r.value = "folder";
    }
    function x() {
      i.visible = !1, r.value = null;
    }
    function I(M) {
      i.folders.includes(M) ? i.folders = i.folders.filter((L) => L !== M) : i.folders.push(M), Ve.toggleRepoList(i.fullName, M);
    }
    function A() {
      i.folders = [], Ve.clearRepoLists(i.fullName), x();
    }
    function f(M) {
      if (!t.active) return;
      const L = typeof M == "string" ? M : M?.fullName || i.fullName;
      x(), dn(L);
    }
    function T() {
      if (!t.active) return;
      const M = i.fullName;
      x(), dn(M, !0);
    }
    async function g() {
      const M = i.url;
      if (x(), M && t.active)
        try {
          await navigator.clipboard.writeText(M);
        } catch {
        }
    }
    function p() {
      const M = Ve.findRepository(i.fullName);
      x(), M && dr.open({
        fullName: M.full_name,
        description: M.description || "",
        stars: M.stargazers_count,
        language: M.language || void 0,
        updated: M.updated_at
      });
    }
    function b() {
      i.url && window.open(i.url, "_blank", "noreferrer"), x();
    }
    async function C() {
      const M = Ve.findRepository(i.fullName);
      if (!M) {
        x();
        return;
      }
      x(), await Ve.confirmUnstarRepository(M);
    }
    function D(M) {
      const L = M.target;
      L?.closest(".gh-repo-context-menu") || L?.closest(".gh-inline-remark-box") || x();
    }
    function S(M) {
      M.key === "Escape" && i.visible && x();
    }
    it(() => t.active, (M) => {
      window.removeEventListener("pointerdown", D), window.removeEventListener("keydown", S), x(), M && (window.addEventListener("pointerdown", D), window.addEventListener("keydown", S));
    }, { immediate: !0 }), kt(() => {
      window.removeEventListener("pointerdown", D), window.removeEventListener("keydown", S);
    });
    function B(M, L) {
      const _ = M.target;
      if (_ instanceof Element && _.closest("button,a,input,textarea,select,[contenteditable='true']")) {
        M.preventDefault();
        return;
      }
      vt.startDrag(L, M);
    }
    const V = re(() => {
      if (fe.cards.length > 0) return !1;
      const M = $s.actionText || "";
      return !!(M.includes("正在读取") || M.includes("正在加载") || M.includes("正在统计") || M.includes("正在同步"));
    });
    return (M, L) => (c(), w(ee, null, [
      s(Y).message ? (c(), w("p", Lp, u(s(Y).repo ? `${s(Y).repo}：` : "") + u(s(Y).message), 1)) : W("", !0),
      o.value ? (c(), w("section", Sp, [
        n("p", null, "备注草稿：" + u(s(Y).repo) + "（仓库不在当前列表中，草稿仍保留）", 1),
        Q(pn, {
          active: t.active
        }, null, 8, ["active"])
      ])) : W("", !0),
      s(fe).searchMessage ? (c(), w("div", Tp, [
        n("span", $p, u(s(fe).searchMessage), 1),
        n("button", {
          type: "button",
          class: "gh-tab",
          style: { padding: "2px 8px", "font-size": "11px", "margin-left": "8px" },
          onClick: L[0] || (L[0] = (_) => s(vt).resetSearch())
        }, "清空搜索")
      ])) : W("", !0),
      V.value ? (c(), w("div", Mp, [...L[16] || (L[16] = [
        n("div", {
          class: "gh-spinner",
          "aria-hidden": "true"
        }, null, -1),
        n("span", { class: "gh-loading-label" }, "正在读取 GitHub 仓库列表中…", -1)
      ])])) : s(fe).emptyMessage ? (c(), w("p", Ip, u(s(fe).emptyMessage), 1)) : W("", !0),
      s(fe).cards.length ? (c(), w("div", {
        key: 5,
        class: se(["repos gh-grid", { "gh-batch-active": s(fe).batchMode }])
      }, [
        (c(!0), w(ee, null, be(s(fe).cards, (_) => (c(), w("article", {
          key: _.fullName,
          class: se(["repo gh-card", { selected: _.selected }]),
          "data-repo-name": _.fullName,
          draggable: "true",
          onClick: (P) => m(P, _),
          onContextmenu: (P) => v(P, _),
          onDragstart: (P) => B(P, _.fullName)
        }, [
          n("button", {
            class: "fo-card-more",
            type: "button",
            "aria-label": "更多操作",
            title: "更多操作",
            onClick: U((P) => v(P, _), ["stop"])
          }, "⋮", 8, Ep),
          n("div", Dp, [
            n("label", {
              class: "gh-card-hole",
              title: "点击勾选此仓库",
              onClick: L[1] || (L[1] = U(() => {
              }, ["stop"]))
            }, [
              n("input", {
                class: "gh-card-checkbox",
                type: "checkbox",
                checked: _.selected,
                onChange: (P) => s(vt).setSelection(_.fullName, P.target.checked)
              }, null, 40, Pp),
              L[17] || (L[17] = n("span", { class: "gh-hole-inner" }, null, -1))
            ]),
            n("img", {
              class: "gh-owner-avatar",
              src: _.avatarUrl || "assets/github-star.svg",
              alt: "",
              loading: "lazy",
              referrerpolicy: "no-referrer",
              onError: L[2] || (L[2] = (P) => P.target.src = "assets/github-star.svg")
            }, null, 40, Wp),
            n("a", {
              href: _.url,
              target: "_blank",
              rel: "noreferrer",
              class: "name",
              title: _.fullName
            }, [
              n("span", Op, u(_.owner) + "/", 1),
              at(u(_.name), 1)
            ], 8, Np)
          ]),
          n("div", Rp, [
            n("div", Bp, [
              _.folders && _.folders.length ? (c(!0), w(ee, { key: 0 }, be(_.folders, (P) => (c(), w("span", {
                key: P,
                class: "gh-badge-folder",
                title: `本地分组：${P}（点击管理所属列表）`,
                onClick: U((_e) => a(_, _e), ["stop"])
              }, " 📁 " + u(P), 9, Hp))), 128)) : (c(), w("span", {
                key: 1,
                class: "gh-badge-folder uncat",
                title: "未分类（点击加入 本地分组）",
                onClick: U((P) => a(_, P), ["stop"])
              }, " ＋ 未分类 ", 8, Fp)),
              s(Y).repo === _.fullName ? (c(), ne(pn, {
                key: 2,
                active: t.active
              }, null, 8, ["active"])) : _.customRemark ? (c(), w("span", {
                key: 3,
                class: "gh-badge-remark",
                title: `备注：${_.customRemark}（点击就地修改）`,
                onClick: U((P) => f(_), ["stop"])
              }, [
                L[18] || (L[18] = n("span", { class: "gh-badge-remark-icon" }, "💬", -1)),
                n("span", Vp, u(_.customRemark), 1)
              ], 8, jp)) : W("", !0)
            ]),
            _.descriptionKind === "analyzing" ? (c(), w("p", Kp, [...L[19] || (L[19] = [
              n("span", { class: "gh-ai-sparkle" }, "✨", -1),
              at(" 正在使用 AI 分析仓库并提炼中文介绍…", -1)
            ])])) : _.descriptionKind === "ai" ? (c(), w("p", zp, [
              L[20] || (L[20] = n("span", { class: "gh-ai-tag-flag" }, "🤖", -1)),
              at(u(_.description), 1)
            ])) : _.descriptionKind === "plain" ? (c(), w("p", {
              key: 2,
              class: "desc",
              title: _.description
            }, u(_.description), 9, Gp)) : (c(), w("p", Up, "暂无描述"))
          ]),
          n("div", Yp, [
            n("span", qp, "★ " + u(_.stars), 1),
            _.language ? (c(), w("span", Xp, u(_.language), 1)) : W("", !0),
            _.updated ? (c(), w("span", Jp, "更新 " + u(_.updated), 1)) : W("", !0)
          ])
        ], 42, Ap))), 128))
      ], 2)) : W("", !0),
      s(fe).totalPages > 1 ? (c(), w("div", Qp, [
        n("button", {
          class: "gh-page-btn",
          type: "button",
          disabled: s(fe).page <= 1,
          onClick: L[3] || (L[3] = (_) => s(vt).changePage(s(fe).page - 1))
        }, "‹ 上一页", 8, Zp),
        n("span", eh, u(s(fe).page) + " / " + u(s(fe).totalPages) + " · 共 " + u(s(fe).totalItems) + " 个" + u(s(fe).serverPaged ? ` · 已加载 ${s(fe).loadedItems}` : ""), 1),
        n("button", {
          class: "gh-page-btn",
          type: "button",
          disabled: s(fe).page >= s(fe).totalPages,
          onClick: L[4] || (L[4] = (_) => s(vt).changePage(s(fe).page + 1))
        }, "下一页 ›", 8, th)
      ])) : W("", !0),
      (c(), ne(Et, { to: "body" }, [
        t.active && i.visible ? (c(), w("div", {
          key: 0,
          class: "fo-cover-context-menu gh-repo-context-menu",
          style: ke({ left: `${i.x}px`, top: `${i.y}px` }),
          onClick: L[14] || (L[14] = U(() => {
          }, ["stop"])),
          onContextmenu: L[15] || (L[15] = U(() => {
          }, ["prevent"]))
        }, [
          n("div", {
            class: se(["gh-menu-has-sub", { "is-active": r.value === "folder" }]),
            onMouseenter: L[6] || (L[6] = (_) => r.value = "folder")
          }, [
            L[21] || (L[21] = n("button", {
              class: "fo-cover-menu-item with-sub-arrow",
              type: "button"
            }, [
              n("span", null, "📁 所属 本地分组"),
              n("span", { class: "sub-arrow" }, "›")
            ], -1)),
            n("div", {
              class: se(["gh-sub-flyout", { "flyout-left": l.value }]),
              onClick: L[5] || (L[5] = U(() => {
              }, ["stop"]))
            }, [
              n("button", {
                class: se(["fo-cover-menu-item", { primary: i.folders.length === 0 }]),
                type: "button",
                onClick: A
              }, u(i.folders.length === 0 ? "✓ " : "  ") + "＋ 设为未分类（清空列表） ", 3),
              (c(!0), w(ee, null, be(s(Ve).cats, (_) => (c(), w("button", {
                key: _,
                class: se(["fo-cover-menu-item", { primary: i.folders.includes(_) }]),
                type: "button",
                onClick: (P) => I(_)
              }, u(i.folders.includes(_) ? "✓ " : "  ") + "📁 " + u(_), 11, oh))), 128))
            ], 2)
          ], 34),
          n("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: L[7] || (L[7] = (_) => r.value = null),
            onClick: L[8] || (L[8] = (_) => f())
          }, " ✏️ 编辑备注… ", 32),
          n("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: L[9] || (L[9] = (_) => r.value = null),
            onClick: p
          }, " 创建任务 ", 32),
          i.hasRemark ? (c(), w("button", {
            key: 0,
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: L[10] || (L[10] = (_) => r.value = null),
            onClick: T
          }, " 🗑️ 清除备注 ", 32)) : W("", !0),
          n("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: L[11] || (L[11] = (_) => r.value = null),
            onClick: g
          }, " 📋 复制仓库链接 ", 32),
          n("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: L[12] || (L[12] = (_) => r.value = null),
            onClick: b
          }, " ↗ 在 GitHub 打开 ", 32),
          n("button", {
            class: "fo-cover-menu-item danger",
            type: "button",
            onMouseenter: L[13] || (L[13] = (_) => r.value = null),
            onClick: C
          }, " ⭐ 取消 Star ", 32)
        ], 36)) : W("", !0)
      ]))
    ], 64));
  }
}), nh = /* @__PURE__ */ Re(ih, [["__scopeId", "data-v-779e37c6"]]), sh = { class: "gh-batch-bar-left" }, rh = { class: "gh-batch-count-tip" }, ah = { id: "gh-batch-selected-count" }, lh = {
  key: 0,
  "aria-label": "批量归属列表确认"
}, ch = ["disabled"], dh = ["disabled"], uh = { class: "gh-batch-bar-right" }, ph = ["disabled"], hh = ["disabled"], fh = ["disabled"], gh = /* @__PURE__ */ he({
  __name: "GitHubBatchBar",
  props: {
    active: { type: Boolean, default: !0 }
  },
  setup(e) {
    const t = e, o = Cs(), i = X(null), r = re(() => {
      const v = [
        { value: "", label: "未分类（清空所选仓库的所有列表所属）", icon: "🌐" }
      ];
      return Ms.folders.filter((a) => a.kind === "custom").forEach((a) => {
        v.push({ value: a.title, label: a.title, icon: "📁" });
      }), v;
    });
    function l() {
      t.active && (o.value = Ve.prepareBatchMove(), i.value = null);
    }
    async function m() {
      const v = o.value, a = i.value;
      if (!t.active || !v || a === null || Xt.busy) return;
      await v.submit(a) && o.value === v && (o.value = void 0);
    }
    return it(() => t.active && Wt.active, (v) => {
      v || (o.value = void 0);
    }), (v, a) => (c(), w(ee, null, [
      n("div", sh, [
        n("button", {
          type: "button",
          class: "gh-batch-action-btn",
          id: "gh-batch-select-all-btn",
          onClick: a[0] || (a[0] = (x) => s(so).toggleSelectAll())
        }, u(s(Wt).allSelected ? "取消全选" : "全选"), 1),
        n("span", rh, [
          a[5] || (a[5] = at("已选择 ", -1)),
          n("b", ah, u(s(Wt).selectedCount), 1),
          a[6] || (a[6] = at(" 项", -1))
        ])
      ]),
      o.value ? (c(), w("section", lh, [
        n("p", null, "仅操作打开选择器时的 " + u(o.value.names.length) + " 个仓库；后来勾选的仓库不加入。", 1),
        n("details", null, [
          a[7] || (a[7] = n("summary", null, "查看本次仓库清单", -1)),
          n("ul", null, [
            (c(!0), w(ee, null, be(o.value.names, (x) => (c(), w("li", { key: x }, u(x), 1))), 128))
          ])
        ]),
        Q(yr, {
          "model-value": i.value ?? "",
          options: r.value,
          disabled: s(Xt).busy,
          placeholder: "请选择目标列表",
          size: "sm",
          style: { "max-width": "260px" },
          "onUpdate:modelValue": a[1] || (a[1] = (x) => i.value = String(x))
        }, null, 8, ["model-value", "options", "disabled"]),
        n("button", {
          type: "button",
          disabled: !t.active || s(Xt).busy || i.value === null,
          onClick: m
        }, "确认加入列表", 8, ch),
        n("button", {
          type: "button",
          disabled: s(Xt).busy,
          onClick: a[2] || (a[2] = (x) => o.value = void 0)
        }, "取消", 8, dh)
      ])) : W("", !0),
      n("div", uh, [
        n("button", {
          type: "button",
          class: "gh-batch-action-btn",
          id: "gh-batch-move-btn",
          disabled: !t.active || s(Xt).busy || s(Wt).selectedCount === 0,
          title: "固定当前选择，批量加入所选本地分组",
          onClick: l
        }, " 📁 归入本地分组 ", 8, ph),
        n("button", {
          type: "button",
          class: "gh-batch-action-btn",
          id: "gh-batch-ai-btn",
          disabled: s(Wt).selectedCount === 0,
          title: "批量使用 AI 生成中文介绍",
          onClick: a[3] || (a[3] = (x) => s(so).analyzeAi())
        }, " ✨ 批量 AI 分析 ", 8, hh),
        n("button", {
          type: "button",
          class: "gh-batch-action-btn danger",
          id: "gh-batch-unstar-btn",
          disabled: s(Wt).selectedCount === 0,
          title: "从 GitHub 批量取消 Star 收藏",
          onClick: a[4] || (a[4] = (x) => s(so).unstar())
        }, " 🗑 取消收藏 ", 8, fh)
      ])
    ], 64));
  }
}), mh = F(() => import("./GitHubWorkspaceCard-BtqC41Ng.js")), wh = F(() => import("./TabManagerPanel-CRnNIbsR.js")), yh = F(() => import("./BookmarkNoteMenu-SEdS5Jqo.js")), vh = F(() => import("./BookmarkPanel-C-vifH-L.js")), bh = F(() => import("./LauncherDialogs-BA4QlY4b.js")), kh = F(() => import("./SettingsDialog-oeAnMYp2.js")), _h = F(() => import("./SettingsView-De4vobQn.js").then((e) => e.S)), xh = F(() => import("./ClockSettingsMenu-cUFblzEB.js")), Ch = F(() => import("./BiliTheaterDialog-CJQ4aBgZ.js")), Lh = F(() => import("./BiliMiniPlayer-BtWdfkq4.js")), Sh = F(() => import("./BiliMessagePanel-wVla69aK.js")), Th = F(() => import("./BilibiliWorkspace-DW9eR0xd.js")), $h = F(() => import("./AihotFeed-vnntMQQ2.js")), Mh = F(() => import("./GitHubTrending-kmCKHAY1.js")), Ih = F(() => import("./AiDialog-D987iczm.js")), Ah = F(() => import("./AihotViewer-61kqrSLW.js")), Eh = F(() => import("./NavWheelOverlay-C08KumFD.js")), Dh = F(() => import("./StandaloneHost-Dz9SZauH.js")), Ph = F(() => import("./LauncherFolderDialog-CvEIkFbX.js")), Wh = F(() => import("./LauncherMenus-CtGNtWCI.js"));
function Z(e, t, o, i) {
  t.spaOwned && document.getElementById("vue-spa-root") || t.id !== "github-workspace" && t.id.startsWith("github-") && document.getElementById("vue-github-workspace-root") || e.register({
    id: t.id,
    title: t.title,
    order: t.order,
    eager: !0,
    roots: [t.root],
    capabilities: t.capabilities,
    mount: ({ getRoot: r }) => {
      const l = r(t.root);
      if (!l) return;
      if (document.getElementById("vue-spa-root") && t.id !== "spa-app")
        return i?.setMounted?.(!0), () => {
          i?.setMounted?.(!1);
        };
      const m = l.innerHTML, v = Si(o);
      v.config.errorHandler = (a, x, I) => {
        console.error(`LogicWeaver Vue feature failed: ${t.id} (${I})`, a), l.dataset.vueError = "1";
      };
      try {
        v.mount(l), i?.setMounted?.(!0);
      } catch (a) {
        throw i?.setMounted?.(!1), l.innerHTML = m, a;
      }
      return () => {
        i?.setMounted?.(!1), v.unmount();
      };
    }
  });
}
function Nh(e) {
  e.register({
    id: "intro",
    title: "启动动画",
    order: 10,
    eager: !0,
    roots: ["endfield-loader"],
    capabilities: ["ui:intro", "boot:progress"],
    mount: () => {
      const t = document.getElementById("endfield-loader");
      if (!lt.enabled) {
        t?.remove(), document.body.classList.remove("is-starting");
        return;
      }
      if (!t) return;
      const o = Si(pp);
      let i = !1;
      const r = () => {
        e.stop("intro");
      };
      window.addEventListener("logicweaver:intro-complete", r, { once: !0 }), o.mount(t);
      const l = window.setTimeout(() => {
        lt.finish("基础界面已就绪，在线服务继续后台加载", !0), window.setTimeout(() => {
          i || (r(), t?.remove(), document.body.classList.remove("is-starting"));
        }, 600);
      }, 8e3);
      return () => {
        i || (i = !0, clearTimeout(l), window.removeEventListener("logicweaver:intro-complete", r), o.unmount(), t.remove(), document.body.classList.remove("is-starting"));
      };
    }
  }), Z(e, { id: "spa-app", title: "纯血 SPA 单根调度器", order: 15, root: "vue-spa-root", capabilities: ["ui:spa-root", "workspace:keepalive"] }, ip), document.getElementById("vue-spa-root") || Z(e, { id: "bili-companions", title: "b站伴随窗口", order: 19, root: "vue-bili-companions-root", capabilities: ["ui:dock-companion"] }, Dh), Z(e, { id: "notifications", title: "通知中心", order: 20, root: "vue-notification-root", capabilities: ["ui:toast", "notification:dedupe"] }, Un), Z(e, { id: "profile-menu", title: "头像右键菜单", order: 21, root: "bili-profile-menu", capabilities: ["ui:profile-menu", "profile:actions"] }, hp, ho), Z(e, { id: "workspace-launchers", title: "常用工作区启动项", order: 22, root: "workspace-launchers", capabilities: ["ui:workspace-launchers", "workspace:launch"] }, fp, Ii), Z(e, { id: "mac-dock", title: "底部快捷应用 Dock 栏", order: 23, root: "mac-dock", capabilities: ["ui:mac-dock", "dock:navigate"] }, Gn, ft), Z(e, { id: "hero-clock", title: "首屏中央时钟", order: 26, root: "hero-clock", capabilities: ["ui:hero-clock", "clock:read"] }, Vn), Z(e, { id: "search-box", title: "首屏搜索框", order: 27, root: "search", capabilities: ["ui:search-box", "search:actions"] }, gn), Z(e, { id: "home-music", title: "首屏音乐播放器", order: 28, root: "task-thread-home", capabilities: ["ui:home-music", "music:playback"] }, Kn, tt), Z(e, { id: "launcher-groups", title: "常用网站分组架", order: 29, root: "launcher-groups", capabilities: ["ui:launcher-groups", "launcher:navigate"] }, zn, xe), Z(e, { id: "weather-widget", title: "首屏天气小部件", order: 39, root: "weather-body", capabilities: ["ui:weather-widget", "weather:read"] }, jn), Z(e, { id: "github-workspace", title: "GitHub 独立页 Vue 工作台", order: 49, root: "vue-github-workspace-root", capabilities: ["ui:github-workspace"] }, mh), Z(e, { id: "github-status", title: "GitHub 同步状态", order: 50, root: "vue-github-status-root", capabilities: ["ui:github-status", "github:sync-read"] }, vp, yn), Z(e, { id: "github-folders", title: "GitHub 文件夹导航", order: 55, root: "gh-folder-list", capabilities: ["ui:github-folders", "github:categorize-drop"] }, ur, vn), Z(e, { id: "github-hero", title: "GitHub 分类摘要", order: 56, root: "gh-hero", capabilities: ["ui:github-summary", "github:actions"] }, pr, bn), Z(e, { id: "github-repositories", title: "GitHub 仓库列表", order: 57, root: "vue-github-repositories-root", capabilities: ["ui:github-repositories", "github:repository-actions", "github:paging"] }, nh, vt), Z(e, { id: "github-batch-bar", title: "GitHub Star 批量操作工具栏", order: 58, root: "gh-batch-bar", capabilities: ["ui:github-batch-bar", "github:batch-actions"] }, gh, so), Z(e, { id: "tab-manager", spaOwned: !0, title: "独立标签页管理", order: 71, root: "vue-tab-manager-root", capabilities: ["ui:tab-manager", "tabs:explicit"] }, wh, Pn), Z(e, { id: "bookmark-menu", title: "书签上下文操作与备注菜单", order: 72, root: "vue-bookmark-menu-root", capabilities: ["ui:bookmark-menu", "bookmark:edit"] }, yh, Ti), Z(e, { id: "launcher-dialogs", title: "快捷启动器管理弹窗族", order: 73, root: "vue-launcher-dialogs-root", capabilities: ["ui:launcher-dialogs", "launcher:manage"] }, bh, hn), Z(e, { id: "launcher-folder-dialog", title: "大文件夹展开视窗", order: 74, root: "vue-launcher-folder-root", capabilities: ["ui:launcher-folder", "launcher:folder-dialog"] }, Ph, fn), Z(e, { id: "launcher-menus", title: "启动器快捷上下文菜单族", order: 76, root: "vue-launcher-menus-root", capabilities: ["ui:launcher-menus", "launcher:context-menu"] }, Wh, Ci), Z(e, { id: "bookmark-panel", title: "浏览器书签侧边滑动视窗", order: 77, root: "vue-bookmark-panel-root", capabilities: ["ui:bookmark-panel", "bookmarks:panel"] }, vh, Ko), Z(e, { id: "bookmark-folder-strip", spaOwned: !0, title: "顶栏书签快捷文件夹横条", order: 78, root: "vue-bookmark-folder-strip-root", capabilities: ["ui:bookmark-folder-strip", "bookmarks:strip"] }, null, _n), Z(e, { id: "settings-page", title: "独立设置页 Vue 工作台", order: 79, root: "vue-options-root", capabilities: ["ui:settings-page"] }, _h), Z(e, { id: "settings-dialog", title: "全局设置中心视窗", order: 80, root: "vue-settings-dialog-root", capabilities: ["ui:settings-dialog", "settings:manage"] }, kh, po), Z(e, { id: "clock-settings-menu", spaOwned: !0, title: "中央时钟偏好配置菜单", order: 82, root: "vue-clock-settings-root", capabilities: ["ui:clock-settings", "clock:preference-edit"] }, xh, $t), Z(e, { id: "bili-theater-dialog", title: "Bilibili 沉浸剧场与评论区弹窗", order: 85, root: "vue-bili-theater-root", capabilities: ["ui:bili-theater", "bili:playback"] }, Ch, ro), Z(e, { id: "bili-mini-player", title: "Bilibili 悬浮迷你播放器", order: 85, root: "vue-bili-mini-player-root", capabilities: ["ui:bili-mini-player", "bili:playback"] }, Lh), Z(e, { id: "ai-dialog", title: "AI 助手对话框与知识点抽屉", order: 86, root: "vue-ai-dialog-root", capabilities: ["ui:ai-dialog", "ai:chat"] }, Ih, Ai), Z(e, { id: "aihot-viewer", spaOwned: !0, title: "AI HOT 资讯文章阅读器", order: 88, root: "vue-aihot-viewer-root", capabilities: ["ui:aihot-viewer", "viewer:aihot"] }, Ah, Mi), Z(e, { id: "nav-wheel", title: "辐射状快捷动作轮盘与悬浮球", order: 95, root: "vue-nav-wheel-root", capabilities: ["ui:nav-wheel", "nav:radial-menu"] }, Eh, me), Z(e, { id: "bili-message-panel", spaOwned: !0, title: "Bilibili 消息与互动通知中心", order: 102, root: "vue-bili-message-panel-root", capabilities: ["ui:bili-message-panel", "bili:messages"] }, Sh, Lt), Z(e, { id: "bili-favorites", spaOwned: !0, title: "b站插件 Vue 外壳", order: 110, root: "vue-bili-favorites-root", capabilities: ["ui:bili-favorites-shell", "bilibili:favorites"] }, Th, Ln), Z(e, { id: "aihot-feed", spaOwned: !0, title: "AI HOT 资讯流全功能聚合看板", order: 112, root: "vue-aihot-root", capabilities: ["ui:aihot-feed", "aihot:aggregate"] }, $h, Sn), Z(e, { id: "github-trending", spaOwned: !0, title: "GitHub 趋势榜与热门流", order: 114, root: "vue-github-trending-root", capabilities: ["ui:github-trending", "github:trending"] }, Mh, Tn);
}
bs();
ks();
const Uo = _r(zo);
Jr(zo, Uo);
Qr(zo);
Nh(Uo);
kn.loadBookmarks();
(async () => {
  document.getElementById("vue-bili-favorites-root") && !document.getElementById("vue-spa-root") && await import("./bilibili-channel.service-BBBASZOl.js"), await Sr(), await Uo.startEager(), lt.notifyBootReady();
})().catch((e) => console.error("[LogicWeaver] 页面启动失败", e));
window.addEventListener("pagehide", () => {
  Uo.stopAll();
}, { once: !0 });
export {
  Gi as C,
  iu as D,
  pp as _,
  Pn as a,
  Ui as b,
  $t as c,
  pf as d,
  Ai as e,
  Pe as f,
  me as g,
  hp as h,
  ve as i,
  ln as j,
  $e as k,
  Fn as l,
  zo as m,
  K as n,
  Wo as t,
  hf as w
};
