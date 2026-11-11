import { l as Yn, S as Ki, i as Ns } from "./SearchBox-BeDnlW3N.js";
/* empty css                */
import { c as ni, r as $e, a as Rt, w as Pe, b as V, d as fe, o as c, e as p, u as i, t as u, f as E, F as Q, g as be, h as z, i as n, j as pe, T as wt, k as No, l as tt, v as Os, m as ot, n as ho, p as Z, q as Bs, s as te, x as Nt, y as fo, z as xe, A as de, B as Xe, C as X, D as St, E as Io, G as un, H as Et, I as Oo, J as Ue, K as mo, L as ji, M as Fs } from "./vendor-vue-9b0eS4bW.js";
import { W as pn, t as oo, p as xn, n as Le, a as Fo, b as Wt, h as et, m as xt, c as gi, d as Xn, s as Ln, e as mi, f as Hs, g as Ks, C as zi, i as oe, j as Vi, k as ko, l as Gi, o as Tt, q as js, r as vo, u as Ui, v as no, w as Vo, x as zs, y as Vs, z as Go, A as Gs } from "./view-styles-DUJo4UgX.js";
import { l as Us, r as Ys, G as Xs, a as Ae, b as yn, c as ii, s as qs, d as Js, e as si, f as hn, g as ai, h as Do, i as Ao, j as At, k as Eo, m as io, n as He, o as vi, p as Zs, q as rt, t as Ve, u as dt, v as Yi, w as Te, x as Xi, R as Qs, y as ea, z as Ft, A as jt, B as Me, C as Jt } from "./search.service-BG_n92VW.js";
import { l as Fe, a as qi, b as Ji, c as ri, d as ue, f as _t, e as _o } from "./store-Rcl2gkeK.js";
import { c as ta, a as oa, t as na, b as ia, d as sa, e as aa, f as so, g as ra } from "./calendar.service-DnkbEAru.js";
import { w as Be, s as li, P as la, i as fn, D as $n, a as yi, g as st, p as ca, L as da, b as Ht, c as ua, d as Sn, t as wi, e as pa, f as ha, h as Bo, l as Zi } from "./window-manager.store-BdI_8a-H.js";
import { s as wn } from "./store-DBO9PHsb.js";
import { b as Po, a as fa, c as ga } from "./up-group-manager-store-B7d-4cpP.js";
import { biliMessagePanelController as zt, biliMessagePanelState as ma } from "./message-panel-store-B_f8bq5b.js";
import { b as Qi, r as va, a as Co } from "./bili-favorites-store-BQbhPPPP.js";
import { s as ya, a as wa } from "./stickers.service-Bdd21-le.js";
import { a as ci, b as es, c as ba } from "./aihot-feed-store-DuV-koWZ.js";
import { y as ts } from "./youtube-store-DNBjW6Yp.js";
import { R as ka, u as di, a as bi } from "./InlineEditStatus.vue_vue_type_style_index_0_scoped_c63d0c6d_lang-9z3_WNrf.js";
import { t as d, c as mt, _ as Ne } from "./_plugin-vue_export-helper-BxikU0LD.js";
import { f as ao, C as _a } from "./ChatShareMenu-Wtcxfl99.js";
import { k as Ca, m as xa } from "./core-utils-DYgSCp9X.js";
import { t as gt } from "./together-listen.store-3mOs8yTE.js";
import { A as La } from "./AppWindowFrame-7RspgAYO.js";
/* empty css                                                                             */
const $a = /^[a-z][a-z0-9]*(?:[.:-][a-z0-9]+)*$/;
function Sa() {
  const e = /* @__PURE__ */ new Map(), t = /* @__PURE__ */ new Map();
  function o(l) {
    if (!l || !$a.test(l.id)) throw new TypeError(`Invalid command id: ${l?.id || ""}`);
    if (!l.title?.trim() || !l.category?.trim() || typeof l.run != "function")
      throw new TypeError(`Command ${l.id} requires title, category and run()`);
    if (e.has(l.id)) throw new Error(`Command already registered: ${l.id}`);
    return e.set(l.id, Object.freeze({
      ...l,
      description: l.description || "",
      keywords: Object.freeze([...l.keywords || []]),
      concurrency: l.concurrency || "replace"
    })), () => {
      s(l.id), e.delete(l.id);
    };
  }
  function s(l) {
    const h = t.get(l);
    return h ? (h.abort(), t.delete(l), !0) : !1;
  }
  async function a(l, h, x = "api") {
    const F = e.get(l);
    if (!F) throw new Error(`Unknown command: ${l}`);
    if (F.enabled && !F.enabled()) return;
    const m = F.concurrency || "replace";
    if (t.has(l)) {
      if (m === "drop") return;
      m === "replace" && s(l);
    }
    const D = new AbortController();
    m !== "parallel" && t.set(l, D);
    try {
      return await F.run(h, { signal: D.signal, source: x });
    } finally {
      t.get(l) === D && t.delete(l);
    }
  }
  function r(l) {
    return Object.freeze({
      id: l.id,
      title: l.title,
      category: l.category,
      description: l.description || "",
      keywords: Object.freeze([...l.keywords || []]),
      concurrency: l.concurrency || "replace",
      enabled: l.enabled ? !!l.enabled() : !0,
      running: t.has(l.id)
    });
  }
  function g() {
    return Object.freeze([...e.values()].map(r).sort((l, h) => l.category.localeCompare(h.category, "zh") || l.title.localeCompare(h.title, "zh")));
  }
  function f(l, h = 20) {
    const x = String(l || "").trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
    if (!x.length) return g().slice(0, h);
    const F = [...e.values()].map((m) => {
      const D = r(m), v = D.title.toLocaleLowerCase(), w = `${D.id} ${v} ${D.category} ${D.description} ${D.keywords.join(" ")}`.toLocaleLowerCase();
      if (!x.every((y) => w.includes(y))) return null;
      let T = 0;
      for (const y of x)
        D.id === y ? T += 200 : D.id.startsWith(y) && (T += 120), v === y ? T += 160 : v.startsWith(y) ? T += 100 : v.includes(y) && (T += 60), D.keywords.some((_) => _.toLocaleLowerCase().startsWith(y)) && (T += 40);
      return { item: D, score: T };
    }).filter((m) => !!m);
    return F.sort((m, D) => D.score - m.score || m.item.title.localeCompare(D.item.title, "zh")), Object.freeze(F.slice(0, Math.max(1, h)).map((m) => m.item));
  }
  return Object.freeze({ register: o, execute: a, cancel: s, has: (l) => e.has(l), list: g, search: f });
}
const bn = Sa(), Ta = /^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/;
function Ia(e) {
  const t = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map();
  function r(m) {
    if (!m || !Ta.test(m.id)) throw new TypeError(`Invalid feature id: ${m?.id || ""}`);
    if (!m.title?.trim() || typeof m.mount != "function") throw new TypeError(`Feature ${m.id} requires title and mount()`);
    if (t.has(m.id)) throw new Error(`Feature already registered: ${m.id}`);
    return t.set(m.id, Object.freeze({
      ...m,
      order: Number(m.order) || 100,
      eager: m.eager === !0,
      roots: Object.freeze([...m.roots || []]),
      capabilities: Object.freeze([...m.capabilities || []])
    })), () => {
      l(m.id), a.delete(m.id), t.delete(m.id);
    };
  }
  function g(m) {
    return typeof m == "function" ? m : m && typeof m.unmount == "function" ? () => m.unmount() : () => {
    };
  }
  function f(m) {
    if (o.has(m)) return Promise.resolve(o.get(m)?.cleanup);
    if (s.has(m)) return s.get(m);
    const D = t.get(m);
    if (!D) return Promise.reject(new Error(`Unknown feature: ${m}`));
    a.delete(m);
    const v = new AbortController(), w = Object.freeze({
      signal: v.signal,
      commands: e,
      getRoot: (y) => document.getElementById(y)
    }), T = Promise.resolve().then(() => D.mount(w)).then((y) => (s.delete(m), o.set(m, { cleanup: y, controller: v }), y), (y) => {
      throw s.delete(m), a.set(m, y), v.abort(), y;
    });
    return s.set(m, T), T;
  }
  async function l(m) {
    const D = s.get(m);
    if (D)
      try {
        await D;
      } catch {
        return;
      }
    const v = o.get(m);
    v && (o.delete(m), v.controller.abort(), await g(v.cleanup)());
  }
  async function h() {
    const m = typeof document < "u" && !!(document.getElementById("vue-spa-root") || document.getElementById("logicweaver-spa-root")), D = [...t.values()].filter((T) => !(!T.eager || !m && T.roots && T.roots.length > 0 && !T.roots.some((_) => !!document.getElementById(_)))).sort((T, y) => (T.order || 100) - (y.order || 100)), w = (await Promise.allSettled(D.map((T) => f(T.id)))).flatMap((T, y) => T.status === "rejected" ? [{ id: D[y].id, reason: T.reason }] : []);
    w.length && console.warn("LogicWeaver Vue features failed to mount", w);
  }
  async function x() {
    const m = [...o.keys()].reverse();
    await Promise.allSettled(m.map(l));
  }
  function F() {
    return Object.freeze([...t.values()].map((m) => Object.freeze({
      id: m.id,
      title: m.title,
      order: m.order || 100,
      eager: m.eager === !0,
      roots: Object.freeze([...m.roots || []]),
      capabilities: Object.freeze([...m.capabilities || []]),
      status: s.has(m.id) ? "mounting" : o.has(m.id) ? "mounted" : a.has(m.id) ? "failed" : "registered",
      error: a.has(m.id) ? String(a.get(m.id)?.message || a.get(m.id) || "Feature mount failed") : ""
    })).sort((m, D) => m.order - D.order));
  }
  return Object.freeze({ register: r, start: f, startEager: h, stop: l, stopAll: x, has: (m) => t.has(m), list: F });
}
const Ma = localStorage.getItem("startupAnimationStyle") || localStorage.getItem("logicweaverStartupStyle") || "endfield", ki = (() => {
  try {
    const e = localStorage.getItem("showStartupAnimation"), t = localStorage.getItem("logicweaverEndfieldLoader"), o = e ?? t;
    return o === "1" || o === "true";
  } catch {
    return !1;
  }
})(), ie = $e({
  enabled: ki,
  style: Ma === "rhinelab" ? "rhinelab" : "endfield",
  renderedProgress: 4,
  targetProgress: 4,
  status: "CORE SHELL...",
  finished: !ki,
  exiting: !1,
  forced: !1
});
let go = 0, gn = 4, os = performance.now(), qn = 0, nn = null, Jn = !1;
function ns(e) {
  const t = e - os, o = qn ? Math.min(1, t / qn) : 1, s = o * o * (3 - 2 * o);
  ie.renderedProgress = gn + (ie.targetProgress - gn) * s, o < 1 && !ie.finished ? go = requestAnimationFrame(ns) : go = 0;
}
function sn(e, t) {
  if (!ie.enabled || ie.finished) return;
  const o = Math.max(ie.targetProgress, Math.max(4, Math.min(100, Number(e) || 4)));
  t && (ie.status = t), gn = ie.renderedProgress, ie.targetProgress = o, os = performance.now(), qn = Math.max(280, Math.min(920, 220 + Math.abs(o - gn) * 7.5)), cancelAnimationFrame(go), go = requestAnimationFrame(ns);
}
function kn(e = "Ready", t = !1) {
  ie.finished || (ie.finished = !0, ie.forced = t, ie.status = e, ie.targetProgress = 100, cancelAnimationFrame(go), go = 0, ie.renderedProgress = 100, nn?.(t));
}
function Da(e = "KEYBOARD SKIP") {
  kn(e, !0);
}
function Aa() {
  ie.enabled || kn("BOOT COMPLETE", !0);
}
function is() {
  !ie.enabled || ie.finished || Jn || (Jn = !0, sn(38, "INITIALIZING CORE SHELL..."), setTimeout(() => {
    ie.finished || sn(76, "SYNTHESIZING RUNTIME...");
  }, 400), setTimeout(() => {
    ie.finished || sn(100, ie.style === "rhinelab" ? "ID CONFIRMED : JOYCE MOORE" : "TERRA LINK READY / 终端就绪");
  }, 900), setTimeout(() => {
    ie.finished || kn("BOOT COMPLETE / 首页就绪", !1);
  }, 1650));
}
async function Ea() {
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
const lt = Rt(ie), yt = Object.freeze({
  update: sn,
  finish: kn,
  skip: Da,
  notifyBootReady: Aa,
  async playIntro(e) {
    if (e?.style && (ie.style = e.style), typeof document < "u" && (document.documentElement.dataset.startupStyle = ie.style, document.documentElement.classList.remove("skip-endfield-loader"), document.body.classList.add("is-starting")), ie.enabled = !0, ie.finished = !1, ie.forced = !!e?.force, ie.renderedProgress = 4, ie.targetProgress = 4, Jn = !1, typeof document < "u") {
      let t = document.getElementById("endfield-loader");
      if (!t) {
        t = document.createElement("div"), t.id = "endfield-loader", t.className = "endfield-loader notranslate", document.body.appendChild(t);
        const { default: o } = await import("./IntroAnimation-Bs84b2QS.js"), s = ni(o), a = () => {
          window.removeEventListener("logicweaver:intro-complete", a), s.unmount(), t?.remove(), document.body.classList.remove("is-starting");
        };
        window.addEventListener("logicweaver:intro-complete", a, { once: !0 }), s.mount(t);
      }
    }
    is();
  },
  get enabled() {
    return ie.enabled;
  },
  get finished() {
    return ie.finished;
  }
});
function Pa(e) {
  return nn = e, ie.finished && e(ie.forced), () => {
    nn === e && (nn = null);
  };
}
const ss = [
  { date: "今天", dayName: "周四", emoji: "🌤️", condition: "多云", highTemp: 26, lowTemp: 18, rainProb: 15 },
  { date: "明天", dayName: "周五", emoji: "⛅", condition: "阴天", highTemp: 24, lowTemp: 17, rainProb: 30 },
  { date: "后天", dayName: "周六", emoji: "🌧️", condition: "小雨", highTemp: 21, lowTemp: 16, rainProb: 75 },
  { date: "周日", dayName: "周日", emoji: "🌦️", condition: "阵雨", highTemp: 23, lowTemp: 15, rainProb: 45 },
  { date: "周一", dayName: "周一", emoji: "☀️", condition: "晴天", highTemp: 27, lowTemp: 18, rainProb: 10 },
  { date: "周二", dayName: "周二", emoji: "🌤️", condition: "多云", highTemp: 28, lowTemp: 19, rainProb: 15 },
  { date: "周三", dayName: "周三", emoji: "☀️", condition: "晴天", highTemp: 29, lowTemp: 20, rainProb: 5 }
], as = "lw_weather_snapshot_v1";
function Wa() {
  if (typeof window > "u" || typeof localStorage > "u") return null;
  try {
    const e = localStorage.getItem(as);
    if (!e) return null;
    const t = JSON.parse(e);
    if (t && t.data && t.data.currentTemp !== void 0)
      return {
        state: "ready",
        city: t.city || t.data.cityName || "",
        data: t.data,
        forecastDays: Array.isArray(t.forecastDays) && t.forecastDays.length ? t.forecastDays : ss,
        detailInfo: t.detailInfo || null,
        updatedAt: t.savedAt || Date.now()
      };
  } catch {
  }
  return null;
}
function Uo(e) {
  if (!(typeof window > "u" || typeof localStorage > "u"))
    try {
      e.data && localStorage.setItem(
        as,
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
const Ra = () => {
  const e = Wa();
  return {
    state: e?.state || "loading",
    city: e?.city || "",
    errorMessage: "",
    data: e?.data || null,
    updatedAt: e?.updatedAt || null,
    forecastModalOpen: !1,
    forecastDays: e?.forecastDays || ss,
    detailInfo: e?.detailInfo || {
      humidity: "62%",
      wind: "东北风 2级",
      uvIndex: "中等 (4)",
      airQuality: "优 (32)"
    }
  };
}, q = $e(Ra());
let Tn = null, In = null;
const ut = {
  get snapshot() {
    return Rt(q);
  },
  update(e) {
    Object.assign(q, e), Uo(q);
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
    }), Uo(q);
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
    })) : [], Uo(q);
  },
  setDetailInfo(e) {
    q.detailInfo = { ...e }, Uo(q);
  },
  applyCity(e) {
    typeof window < "u" && window.dispatchEvent(new CustomEvent("logicweaver:weather-city-selected", { detail: { city: e } })), this.refresh();
  },
  refresh() {
    Tn ? Tn() : typeof window < "u" && window.dispatchEvent(new CustomEvent("logicweaver:weather-refresh"));
  },
  changeLocation(e) {
    In ? In(e) : typeof window < "u" && window.dispatchEvent(new CustomEvent("logicweaver:weather-change-location", { detail: { clientX: e?.clientX, clientY: e?.clientY } }));
  },
  setRefreshAction(e) {
    Tn = e;
  },
  setChangeLocationAction(e) {
    In = e;
  }
}, Na = () => ({
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
}), Ie = $e(Na());
let Mn = null;
const ro = {
  get snapshot() {
    return Rt(Ie);
  },
  update(e) {
    Object.assign(Ie, e);
  },
  updateTime(e, t, o, s) {
    Ie.timeText = e, Ie.secsText = t, Ie.greetingText = o, Ie.dateText = s, Ie.updatedAt = Date.now();
  },
  applyConfig(e) {
    e.fontFamily !== void 0 && (Ie.fontFamily = e.fontFamily), e.colorHex !== void 0 && (Ie.colorHex = e.colorHex), e.greetColor !== void 0 && (Ie.greetColor = e.greetColor), e.dateColor !== void 0 && (Ie.dateColor = e.dateColor), e.isBlack !== void 0 && (Ie.isBlack = e.isBlack), e.isCustomColor !== void 0 && (Ie.isCustomColor = e.isCustomColor), Ie.updatedAt = Date.now();
  },
  openSettings(e) {
    Mn ? Mn(e) : window.dispatchEvent(new CustomEvent("logicweaver:clock-open-settings", { detail: { clientX: e?.clientX, clientY: e?.clientY } }));
  },
  setOpenSettingsAction(e) {
    Mn = e;
  }
}, Oa = [
  { id: "ai", title: "AI 助手" },
  { id: "todoist", title: "Todoist" },
  { id: "stickers", title: "表情包" },
  { id: "calcom", title: "预约" },
  { id: "wallpaper", title: "壁纸库" }
], Ba = () => ({
  mounted: !1,
  visible: !1,
  items: [...Oa]
}), Dn = $e(Ba());
let Yo = {};
const ui = {
  getSnapshot() {
    return Rt(Dn);
  },
  update(e) {
    Object.assign(Dn, e);
  },
  setMounted(e) {
    Dn.mounted = e;
  },
  openWorkspace(e, t = !1) {
    if (Yo.open) {
      Yo.open(e);
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
    Yo = { ...Yo, ...e };
  }
}, An = $e({ visible: !1, pendingWrites: 0 });
async function Fa(e) {
  if (An.pendingWrites) throw new Error("壁纸操作正在处理，未自动排队");
  An.pendingWrites++;
  try {
    return await e();
  } finally {
    An.pendingWrites--;
  }
}
const _i = {
  openDialog() {
    Be.open("wallpaper");
  },
  closeDialog() {
    Be.close("wallpaper");
  },
  resetDefault() {
    return Fa(() => pn.clearWallpaper());
  }
}, Ci = [
  { id: "mono", label: "极简等宽", font: "ui-monospace, 'SF Mono', 'JetBrains Mono', Menlo, Consolas, monospace", sample: "15:50:10" },
  { id: "sans", label: "现代无衬线", font: "-apple-system, BlinkMacSystemFont, 'Segoe UI Variable Display', 'Segoe UI', Roboto, 'PingFang SC', sans-serif", sample: "15:50:10" },
  { id: "din", label: "经典几何", font: "'DIN Alternate', 'DIN Pro', 'Franklin Gothic Medium', Futura, sans-serif", sample: "15:50:10" },
  { id: "digital", label: "数码管等宽", font: "'Courier New', Courier, monospace", sample: "15:50:10" },
  { id: "impact", label: "硬派力量", font: "Impact, 'Arial Black', 'Trebuchet MS', sans-serif", sample: "15:50:10" },
  { id: "serif", label: "典雅衬线", font: "'Playfair Display', Georgia, 'Times New Roman', serif", sample: "15:50:10" },
  { id: "rounded", label: "圆润亲和", font: "'Quicksand', 'Comic Sans MS', 'Segoe UI', sans-serif", sample: "15:50:10" }
], xi = [
  { id: "white", label: "纯净皓白 (默认)", hex: "#ffffff" },
  { id: "black", label: "曜石极黑", hex: "#0f172a" },
  { id: "gold", label: "香槟金砂", hex: "#f59e0b" },
  { id: "cyan", label: "科技青蓝", hex: "#38bdf8" },
  { id: "emerald", label: "翡翠竹绿", hex: "#10b981" },
  { id: "rose", label: "淡雅樱粉", hex: "#fb7185" }
], bm = [
  { id: "local", label: "📍 本地系统时区", offset: "Local" },
  { id: "Asia/Shanghai", label: "🇨🇳 北京 / 香港", offset: "UTC+8" },
  { id: "Asia/Tokyo", label: "🇯🇵 东京 / 首尔", offset: "UTC+9" },
  { id: "Europe/London", label: "🇬🇧 伦敦 / 格林威治", offset: "UTC+0/+1" },
  { id: "Europe/Paris", label: "🇫🇷 巴黎 / 柏林", offset: "UTC+1/+2" },
  { id: "America/New_York", label: "🇺🇸 纽约 / 东部时间", offset: "UTC-5/-4" },
  { id: "America/Los_Angeles", label: "🇺🇸 洛杉矶 / 西部时间", offset: "UTC-8/-7" },
  { id: "Australia/Sydney", label: "🇦🇺 悉尼", offset: "UTC+10/+11" },
  { id: "UTC", label: "🌐 协调世界时 (UTC)", offset: "UTC" }
], De = $e({
  mounted: !1,
  isOpen: !1,
  x: 200,
  y: 200,
  font: "mono",
  color: "white",
  timezone: "local"
});
let En = null;
const Vt = {
  state: De,
  setMounted(e) {
    De.mounted = e;
  },
  onAction(e) {
    En = e;
  },
  dispatch(e, t) {
    if (En)
      return En(e, t);
  },
  open(e) {
    const s = typeof window < "u" ? window.innerWidth : 1280, a = typeof window < "u" ? window.innerHeight : 800, r = e?.clientX ?? e?.x ?? s / 2, g = e?.clientY ?? e?.y ?? a / 2, f = Math.max(12, Math.min(r - 40, s - 290 - 12)), l = Math.max(12, Math.min(g + 10, a - 420 - 12));
    De.x = f, De.y = l, De.isOpen = !0, this.dispatch("open", { x: f, y: l });
  },
  close() {
    De.isOpen = !1, this.dispatch("close");
  },
  setFont(e) {
    De.font = e;
    const t = Ci.find((o) => o.id === e);
    if (t) {
      ro.applyConfig({ fontFamily: t.font });
      try {
        localStorage.setItem("lw_clock_font", e);
      } catch {
      }
    }
    this.dispatch("change", { font: e, color: De.color, timezone: De.timezone });
  },
  setColor(e) {
    De.color = e;
    const t = xi.find((o) => o.id === e);
    if (t) {
      ro.applyConfig({
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
    this.dispatch("change", { font: De.font, color: e, timezone: De.timezone });
  },
  setTimezone(e) {
    De.timezone = e;
    try {
      localStorage.setItem("lw_clock_tz", e);
    } catch {
    }
    this.dispatch("change", { font: De.font, color: De.color, timezone: e });
  },
  initPreferences() {
    try {
      const e = localStorage.getItem("lw_clock_font");
      if (e) {
        De.font = e;
        const s = Ci.find((a) => a.id === e);
        s && ro.applyConfig({ fontFamily: s.font });
      }
      const t = localStorage.getItem("lw_clock_color");
      if (t) {
        De.color = t;
        const s = xi.find((a) => a.id === t);
        s && ro.applyConfig({ colorHex: s.hex, greetColor: s.hex, dateColor: s.hex, isCustomColor: !0 });
      }
      const o = localStorage.getItem("lw_clock_tz");
      o && (De.timezone = o);
    } catch {
    }
  },
  syncConfig(e) {
    e.font && (De.font = e.font), e.color && (De.color = e.color), e.timezone && (De.timezone = e.timezone);
  }
}, ge = $e({
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
let Pn = null, an = !1;
async function rn(e, t = {}) {
  if (e === "poll") return { state: "ready", model: ge.model };
  if (e === "connect") return { state: "ready", model: ge.model };
  throw new Error("旧版 AI 对话桥接已退役，请使用「海狸聊天室」开启智能会话。");
}
function rs(e) {
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
  o || (e.state === "connecting" ? o = "正在连接本机 Codex 与 ChatGPT…" : e.state === "disconnected" ? o = "已待命（打开面板自动连接）" : e.authenticated ? o = `就绪 · ChatGPT ${e.plan || "已登录"}` : e.state === "ready" ? o = "就绪 · 尚未登录 ChatGPT" : o = t[e.state] || e.state), ge.statusText = o, ge.authHidden = !e.loginUrl, ge.authCode = e.loginCode || "", ge.authLink = e.loginUrl || "https://auth.openai.com/codex/device", ge.isStreaming = an || e.busy || e.state === "running";
}
async function Ha() {
  try {
    const e = await rn("poll");
    rs(e);
  } catch {
  }
}
async function Ka(e, t) {
  if (e === "open" || e === "connect")
    try {
      ge.statusText = "正在连接本机 Codex 与 ChatGPT…";
      const o = await rn("connect");
      rs(o);
    } catch (o) {
      ge.statusText = o?.message || "连接失败";
    }
  else if (e === "send" && t?.text) {
    const o = t.text;
    ge.messages.push({
      id: `msg-${Date.now()}`,
      role: "user",
      content: o
    }), ge.inputText = "", ge.isStreaming = !0, an = !0;
    try {
      await rn("send", { text: o }), await Ha();
    } catch (s) {
      ge.statusText = s?.message || "发送失败";
    } finally {
      an = !1, ge.isStreaming = !1;
    }
  } else if (e === "stop") {
    try {
      await rn("stop");
    } catch {
    }
    ge.isStreaming = !1, an = !1;
  }
}
const pi = {
  state: ge,
  setMounted(e) {
    ge.mounted = e;
  },
  onAction(e) {
    Pn = e;
  },
  dispatch(e, t) {
    if (Pn)
      return Pn(e, t);
    Ka(e, t);
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
}, Wn = $e({
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
}), Xo = /* @__PURE__ */ new Set(), ja = {
  state: Wn,
  open(e) {
    Object.assign(Wn, e, { open: !0 });
  },
  update(e) {
    Object.assign(Wn, e);
  },
  close() {
    Xo.forEach((e) => e("close"));
  },
  save(e) {
    Xo.forEach((t) => t("save", e));
  },
  onAction(e) {
    return Xo.add(e), () => Xo.delete(e);
  }
}, ln = $e({ isOpen: !1 }), ls = {
  state: ln,
  open() {
    ln.isOpen = !0;
  },
  close() {
    ln.isOpen = !1;
  }
}, Rn = "biliProfileCacheV1", kt = "biliLocallyKnownMessageIdsV1", qo = "biliMessageUserCacheV1", xo = "githubKnownReleaseVersionsV1", Jo = "customNewtabAvatar", Li = "biliToastKnownCountsV1";
class za {
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
    !t?.repository || !t?.version || (this.githubKnownVersions[t.repository] = t.version, typeof chrome < "u" && chrome?.storage?.local && await chrome.storage.local.set({ [xo]: this.githubKnownVersions }), this.notifyGitHubListeners());
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
      let g = Array.isArray(this.locallyKnownIds?.[a]) ? this.locallyKnownIds[a] : [];
      r < g.length && (g = [], this.locallyKnownIds[a] = [], o = !0), t[a] = Math.max(0, r - g.length);
    }), o && typeof chrome < "u" && chrome?.storage?.local && chrome.storage.local.set({ [kt]: this.locallyKnownIds }).catch(() => {
    }), t;
  }
  markKnown(t, o, s) {
    this.locallyKnownIds[t] || (this.locallyKnownIds[t] = []);
    let a = !1;
    o && !this.locallyKnownIds[t].includes(o) && (this.locallyKnownIds[t].push(o), a = !0), s && !this.locallyKnownIds[t].includes(s) && (this.locallyKnownIds[t].push(s), a = !0), a && typeof chrome < "u" && chrome?.storage?.local && chrome.storage.local.set({ [kt]: this.locallyKnownIds }).catch(() => {
    }), this.applyBiliProfile(this.profile, this.unread);
  }
  markAllKnown(t, o = []) {
    this.locallyKnownIds[t] || (this.locallyKnownIds[t] = []);
    const s = new Set(this.locallyKnownIds[t]);
    for (const r of o) r && s.add(r);
    const a = Math.max(0, Number(this.unread?.[t] || 0));
    if (s.size < a) {
      const r = a - s.size;
      for (let g = 0; g < r; g++) s.add(`__pad_${Date.now()}_${g}`);
    }
    this.locallyKnownIds[t] = Array.from(s), typeof chrome < "u" && chrome?.storage?.local && chrome.storage.local.set({ [kt]: this.locallyKnownIds }).catch(() => {
    }), this.applyBiliProfile(this.profile, this.unread);
  }
  applyBiliProfile(t, o = {}) {
    this.profile = t || null, this.unread = o || {};
    const a = this.customAvatar || String(t?.face || "assets/bilibili.svg").replace(/^http:/, "https:"), r = this.getVisibleUnread();
    if (oo.avatarUrl = a, oo.userName = t?.uname || "哔哩哔哩用户", oo.buttonTitle = "通知中心", xn.avatarUrl = a, xn.userName = t?.uname || "用户", xn.mid = t?.mid, typeof document < "u") {
      const g = document.getElementById("bili-profile-avatar");
      g && (g.src = a);
      const f = document.getElementById("bili-profile-button");
      f && (f.title = oo.buttonTitle);
    }
    zt.updateState({
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
        }, [a, r, g] = await Promise.allSettled([
          fetch("https://api.bilibili.com/x/msgfeed/unread?build=0&mobi_app=web", { credentials: "include" }).then((D) => D.json()),
          fetch("https://api.vc.bilibili.com/x/im/web/msgfeed/unread", { credentials: "include" }).then((D) => D.json()),
          fetch("https://api.vc.bilibili.com/session_svr/v1/session_svr/single_unread", { credentials: "include" }).then((D) => D.json())
        ]), f = a.status === "fulfilled" ? a.value?.data || {} : {}, l = r.status === "fulfilled" ? r.value?.data || {} : {}, h = g.status === "fulfilled" ? g.value?.data || {} : {}, x = Number(l.at || 0), F = l.reply != null ? Number(l.reply || 0) : Math.max(0, Number(l.recv_reply || 0) - x), m = {
          reply: Math.max(Number(f.reply || 0), F),
          at: Math.max(Number(f.at || 0), x),
          like: Math.max(
            Number(f.like || f.praise || 0),
            Number(l.like || l.recv_like || 0)
          ),
          system: Math.max(Number(f.sys_msg || f.system || 0), Number(l.sys_msg || 0)),
          private: Number(
            f.chat || l.chat || Number(h.follow_unread || 0) + Number(h.unfollow_unread || 0) + Number(h.dustbin_push_msg || 0)
          )
        };
        this.applyBiliProfile(s, m), typeof chrome < "u" && chrome?.storage?.local && await chrome.storage.local.set({ [Rn]: { profile: s, unread: m, savedAt: Date.now() } }), this.checkAndNotifyBiliInteractions(m);
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
      this.biliToastKnownCounts = { ...o }, typeof chrome < "u" && chrome?.storage?.local && chrome.storage.local.set({ [Li]: this.biliToastKnownCounts }).catch(() => {
      });
      return;
    }
    const s = o.private - Number(this.biliToastKnownCounts.private || 0);
    o.like - Number(this.biliToastKnownCounts.like || 0);
    const a = o.reply - Number(this.biliToastKnownCounts.reply || 0), r = o.at - Number(this.biliToastKnownCounts.at || 0);
    o.system - Number(this.biliToastKnownCounts.system || 0), this.biliToastKnownCounts = { ...o }, typeof chrome < "u" && chrome?.storage?.local && chrome.storage.local.set({ [Li]: this.biliToastKnownCounts }).catch(() => {
    }), s > 0 && Le.show({
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
        zt.openPanel();
      }
    }), a > 0 && Le.show({
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
        zt.openPanel();
      }
    }), r > 0 && Le.show({
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
        zt.openPanel();
      }
    });
  }
  init() {
    this.initialized || (this.initialized = !0, Fo.setActions({
      onAction: async (t) => {
        if (t === "messages")
          Wt.open();
        else if (t === "tabs")
          ls.open();
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
      Rn,
      kt,
      qo,
      xo,
      Jo
    ]).then((t) => {
      this.customAvatar = t[Jo] || "", this.locallyKnownIds = t[kt] && typeof t[kt] == "object" ? t[kt] : {}, this.userCache = t[qo] && typeof t[qo] == "object" ? t[qo] : {}, this.githubKnownVersions = t[xo] && typeof t[xo] == "object" ? t[xo] : {};
      const o = t[Rn];
      o?.profile ? this.applyBiliProfile(o.profile, o.unread || {}) : this.applyBiliProfile(null, {});
    }).catch(() => {
    }), chrome.storage.onChanged && chrome.storage.onChanged.addListener((t, o) => {
      o === "local" && (t[Jo] && (this.customAvatar = t[Jo].newValue || "", this.applyBiliProfile(this.profile, this.unread)), t[kt] && (this.locallyKnownIds = t[kt].newValue || {}, this.applyBiliProfile(this.profile, this.unread)));
    })), zt.onAction((t, o) => {
      t === "mark-known" ? this.markKnown(o.kind, o.id, o.talkerId) : t === "mark-all-known" && this.markAllKnown(o.kind, o.ids);
    }), this.refreshBiliProfile(), setTimeout(() => {
      this.loadGitHubUpdates();
    }, 3500));
  }
}
const $i = new za(), ye = $e({ open: !1, loading: !1, error: "", mid: "", name: "", face: "", sign: "", followed: !1, submitting: !1, left: 12, top: 12, videos: [] });
let Zo = null;
const cn = {
  state: ye,
  open(e, t) {
    Zo = t, Object.assign(ye, { open: !0, loading: !0, error: "", submitting: !1, videos: [] }, e);
  },
  update(e) {
    Object.assign(ye, e);
  },
  close() {
    ye.submitting || (ye.open = !1, Zo = null);
  },
  async toggleFollow() {
    if (!(!Zo || ye.submitting)) {
      ye.submitting = !0;
      try {
        const e = !ye.followed;
        await Zo(e) && (ye.followed = e);
      } finally {
        ye.submitting = !1;
      }
    }
  }
}, Re = $e({
  currentTab: "stars",
  rangeText: "近 7 天",
  sinceDays: 7,
  repos: [],
  isLoading: !1,
  errorMessage: "",
  sourceText: "",
  fetchedAt: 0,
  hasLoaded: !1
}), Nn = /* @__PURE__ */ new Set();
let Zt;
const On = new ka();
async function Va(e, t) {
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
    const g = r.body.getReader(), f = new TextDecoder("utf-8", { fatal: !0 });
    let l = 0, h = "";
    try {
      for (; ; ) {
        o.signal.throwIfAborted();
        const x = await g.read();
        if (x.done) break;
        if (l += x.value.byteLength, l > 2 * 1024 * 1024) throw new Error("Public source exceeds limit");
        h += f.decode(x.value, { stream: !0 });
      }
      return o.signal.throwIfAborted(), JSON.parse(h + f.decode());
    } finally {
      g.cancel().catch(() => {
      }), g.releaseLock();
    }
  } finally {
    clearTimeout(a), t.removeEventListener("abort", s);
  }
}
function Si(e, t) {
  const o = e?.name || e?.repository, s = t ? e?.full_name || (typeof o == "string" && o.includes("/") ? o : e?.author && o ? `${e.author}/${o}` : "") : e?.full_name;
  if (typeof s != "string" || !/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(s) || s.split("/").some((f) => f === "." || f === "..")) throw new Error("Invalid repository");
  const [a, r] = s.split("/"), g = (f) => typeof f == "number" && Number.isFinite(f) && f >= 0 ? f : void 0;
  return {
    name: r,
    full_name: s,
    owner: { login: a },
    description: typeof e.description == "string" ? e.description : "",
    language: typeof e.language == "string" ? e.language : "",
    stargazers_count: g(t ? e.stars ?? e.stargazers_count : e.stargazers_count),
    forks_count: g(t ? e.forks ?? e.forks_count : e.forks_count),
    html_url: `https://github.com/${encodeURIComponent(a)}/${encodeURIComponent(r)}`
  };
}
async function Ga(e, t) {
  const o = new Date(Date.now() - e * 864e5).toISOString().slice(0, 10);
  let s = "";
  try {
    const g = await Us(t), { data: f } = await Ys(`/search/repositories?q=${encodeURIComponent(`is:public created:>${o}`)}&sort=stars&order=desc&per_page=30`, { headers: g, signal: t, maxBytes: 2 * 1024 * 1024 });
    if (t.throwIfAborted(), !Array.isArray(f?.items)) throw new Error("Invalid search response");
    return {
      repos: f.items.slice(0, 30).map((l) => Si(l, !1)),
      sourceText: `GitHub Search：UTC 日期 ${o} 之后新建的仓库，按累计 Star 排序；不是官方 Trending 榜。${f.incomplete_results ? " API 标记为不完整结果。" : ""}`
    };
  } catch (g) {
    t.throwIfAborted(), s = g instanceof Xs ? g.message : "主源响应格式无效。";
  }
  const a = e === 1 ? "daily" : e === 7 ? "weekly" : "monthly", r = await Va(`https://ghapi.h11.dev/repositories?since=${a}`, t);
  if (t.throwIfAborted(), !Array.isArray(r)) throw new Error("Invalid fallback response");
  return {
    repos: r.slice(0, 30).map((g) => Si(g, !0)),
    sourceText: `GitHub Search 不可用：${s} 改用第三方 ghapi.h11.dev 的 ${a} 趋势快照（不发送账号凭据）；口径与新建仓库搜索不同，源更新时间未提供。`
  };
}
const cs = {
  get state() {
    return Re;
  },
  // View attachment permits starting reads; detaching does not cancel an
  // already requested read. Range changes still replace the old session.
  attachView(e) {
    return Zt = e, !e.aborted && !Re.hasLoaded && !On.pending && this.refresh(), () => {
      Zt === e && (Zt = void 0);
    };
  },
  switchTab(e) {
    Re.currentTab = e, this.dispatch("switch-tab", e);
  },
  async switchRange(e, t) {
    !Zt || Zt.aborted || ![1, 7, 30].includes(e) || e === Re.sinceDays || (On.cancel(), Object.assign(Re, {
      sinceDays: e,
      rangeText: `近 ${e} 天`,
      repos: [],
      sourceText: "",
      fetchedAt: 0,
      hasLoaded: !1,
      errorMessage: "",
      isLoading: !1
    }), this.dispatch("switch-range", { days: e, text: Re.rangeText }), await this.refresh());
  },
  async refresh() {
    const e = Zt;
    if (!e || e.aborted || Re.isLoading) return;
    const t = Re.sinceDays, o = On.begin({
      timeoutMs: 45e3,
      isCurrent: () => Re.sinceDays === t,
      onStop: (a) => {
        Re.isLoading = !1, a === "timeout" && (Re.errorMessage = "数据源读取超过整体45秒上限，请手动刷新；没有继续请求备用源。");
      }
    }), s = o.current;
    if (s()) {
      Re.isLoading = !0, Re.errorMessage = "";
      try {
        const a = await o.wait(() => Ga(t, o.signal));
        if (!s()) return;
        Re.repos = a.repos, Re.sourceText = a.sourceText, Re.fetchedAt = Date.now(), Re.hasLoaded = !0;
      } catch {
        s() && (Re.errorMessage = Re.hasLoaded ? "刷新失败，保留同一时间范围的上次读取结果；请检查网络或额度后手动刷新。" : "数据源读取失败或超时；未使用内置样例，请稍后手动刷新。");
      } finally {
        o.finish() && (Re.isLoading = !1, this.dispatch("refresh"));
      }
    }
  },
  selectRepo(e) {
    this.dispatch("select-repo", e);
  },
  onAction(e) {
    return Nn.add(e), () => {
      Nn.delete(e);
    };
  },
  dispatch(e, t) {
    for (const o of Nn)
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
}), ne = $e({
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
let Ti = null;
function Ua(e, t) {
  if (typeof e != "number" || !t)
    return hi();
  const o = 160, s = 160, a = 26, r = 154, g = 360 / t, f = e - g / 2, l = e + g / 2, h = f * Math.PI / 180, x = l * Math.PI / 180, F = o + a * Math.cos(h), m = s + a * Math.sin(h), D = o + r * Math.cos(h), v = s + r * Math.sin(h), w = o + a * Math.cos(x), T = s + a * Math.sin(x), y = o + r * Math.cos(x), _ = s + r * Math.sin(x), L = g > 180 ? 1 : 0, B = `M ${F.toFixed(1)} ${m.toFixed(1)} L ${D.toFixed(1)} ${v.toFixed(1)} A ${r} ${r} 0 ${L} 1 ${y.toFixed(1)} ${_.toFixed(1)} L ${w.toFixed(1)} ${T.toFixed(1)} A ${a} ${a} 0 ${L} 0 ${F.toFixed(1)} ${m.toFixed(1)} Z`, H = `M ${D.toFixed(1)} ${v.toFixed(1)} A ${r} ${r} 0 ${L} 1 ${y.toFixed(1)} ${_.toFixed(1)}`;
  return {
    visible: !0,
    wedgePath: B,
    arcPath: H,
    line1: {
      x1: parseFloat(F.toFixed(1)),
      y1: parseFloat(m.toFixed(1)),
      x2: parseFloat(D.toFixed(1)),
      y2: parseFloat(v.toFixed(1))
    },
    line2: {
      x1: parseFloat(w.toFixed(1)),
      y1: parseFloat(T.toFixed(1)),
      x2: parseFloat(y.toFixed(1)),
      y2: parseFloat(_.toFixed(1))
    }
  };
}
const Ee = {
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
    ne.beam = Ua(e, t);
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
    Ti = e;
  },
  dispatch(e, t) {
    Ti?.(e, t);
  }
}, ds = [
  { id: "daily-bilibili", title: "b站插件", desc: "B站收藏夹与追番视频", icon: "assets/bilibili.svg" },
  { id: "daily-aihot", title: "ai hot插件", desc: "全网 AI 与前沿科技资讯", icon: "assets/nav-aihot.svg" },
  { id: "folder", title: "常用网站", desc: "点击展开快捷网站子轮盘", icon: "assets/nav-folder.svg", mode: "shortcuts" },
  { id: "card-github", title: "github插件", desc: "GitHub 趋势与星标项目", icon: "assets/nav-github.svg" },
  { id: "launcher", title: "首页", desc: "返回主屏常用应用台", icon: "assets/nav-home.svg" }
];
function Ya() {
  return ds.filter((e) => e.mode || e.id === "launcher" || fn(e.id));
}
function Xa() {
  return la.filter((e) => e.kind === "module" && fn(e.id)).map((e) => ({
    id: e.id,
    title: e.title,
    desc: e.isDev ? "已启用的实验性组件" : e.categoryLabel,
    icon: e.icon || e.emoji || "🧩",
    tool: e.id
  }));
}
function Ii() {
  ne.isExpanded && ht();
}
let Qn = [], Wo = ds, Ct = { x: 400, y: 300 }, us = !1, Lo = !1, Bn = null, $o = null, pt = !1;
const qa = $e(/* @__PURE__ */ new Set()), Ja = /* @__PURE__ */ new Map();
function Pt() {
  return globalThis.chrome?.storage;
}
function ps(e, t) {
  const o = ne.isExpanded ? 160 : 24;
  Ee.setBallPosition(
    Math.max(o + 8, Math.min(window.innerWidth - o - 8, e)),
    Math.max(o + 8, Math.min(window.innerHeight - o - 8, t))
  );
}
function ht() {
  const e = ne.mode;
  let t = [];
  e === "shortcuts" && (t = [...Qn], t.push({
    id: "toggle-edit-shortcuts",
    title: pt ? d("navwheel.finishEdit") : d("navwheel.editSites"),
    desc: pt ? d("navwheel.finishEditDesc") : d("navwheel.editSitesDesc"),
    icon: pt ? "✅" : "✏️"
  })), Wo = e === "tools" ? Xa() : e === "shortcuts" ? [
    ...t,
    { id: "back-to-main", title: d("navwheel.back"), desc: d("navwheel.backDesc"), icon: "🔙", mode: "main" }
  ] : Ya();
  const o = Wo.length, s = o > 12 ? 118 : o > 9 ? 114 : 110, a = o > 12 ? 46 : o > 9 ? 50 : 56;
  Ee.setSectors(Wo.map((r, g) => {
    const f = -90 + 360 / o * g, l = f * Math.PI / 180;
    return {
      id: r.id,
      title: r.title,
      desc: r.desc,
      icon: r.icon,
      angleDeg: f,
      x: Math.round(160 + Math.cos(l) * s),
      y: Math.round(160 + Math.sin(l) * s),
      size: a,
      isShortcut: !!r.url
    };
  })), Ee.setWheelMode(e), Ee.setActiveSector(null), Ee.setBeam(null, 0), Ee.setHub(e === "shortcuts" ? pt ? { icon: "✏️", title: d("navwheel.editing") } : { icon: "🔙", title: d("navwheel.shortcuts") } : e === "tools" ? { icon: "🧰", title: d("navwheel.tools") } : null);
}
function mn(e) {
  ne.mode = e, ht();
}
function Gt() {
  Ee.collapse(), ps(ne.ballPosition.x, ne.ballPosition.y), Ee.setVisibility(us);
}
function eo(e = ne.ballPosition.x, t = ne.ballPosition.y, o = "main") {
  Ee.expand(void 0, void 0, o), ps(e, t), ht(), Ee.setVisibility(!0);
}
function Za(e) {
  if (e.id === "toggle-edit-shortcuts") {
    hs();
    return;
  }
  if (pt && e.url) {
    Le.show({
      appName: d("navwheel.appName"),
      title: d("navwheel.editingNotice"),
      message: d("navwheel.editingHint"),
      duration: 2500
    });
    return;
  }
  if (!(e.tool && !fn(e.tool) || !e.url && !e.mode && e.id !== "launcher" && !fn(e.id))) {
    if (e.mode) {
      mn(e.mode);
      return;
    }
    if (Gt(), e.url) {
      window.open(e.url, "_blank");
      return;
    }
    if (e.tool) {
      window.triggerToolShortcut?.(e.tool);
      return;
    }
    e.id === "launcher" ? (typeof window < "u" && window.scrollTo({ top: 0, left: 0, behavior: "instant" }), ao.exit(), document.body && (document.body.dataset.page = "home")) : ao.enter(e.id);
  }
}
function hs() {
  pt = !pt, pt ? (Le.show({
    appName: d("navwheel.appName"),
    title: d("navwheel.enterEditMode"),
    message: d("navwheel.editModeDesc"),
    duration: 5e3
  }), ht()) : (Le.show({
    appName: d("navwheel.appName"),
    title: d("navwheel.editDone"),
    message: d("navwheel.editSaved"),
    duration: 2e3
  }), ht());
}
async function Qa(e) {
  if (!pt || !e || !e.url) return !1;
  try {
    const t = await Pt()?.local?.get(["siteShelfLinks", "logicweaverNavWheelShortcutsV1"]), o = Array.isArray(t?.siteShelfLinks) ? t.siteShelfLinks : Array.isArray(t?.logicweaverNavWheelShortcutsV1) ? t.logicweaverNavWheelShortcutsV1 : [], s = o.findIndex((g) => g.url === e.url);
    if (s >= 0) {
      const g = o.filter((f, l) => l !== s);
      return await Pt()?.local?.set({ siteShelfLinks: g, logicweaverNavWheelShortcutsV1: g }), await Ye.loadShortcuts(), ht(), Le.show({
        appName: d("navwheel.appName"),
        title: d("navwheel.removedNotice"),
        message: d("navwheel.removedSite", { name: e.title || e.url }),
        duration: 2e3
      }), !0;
    }
    if (o.length >= 12)
      return Le.show({
        appName: d("navwheel.appName"),
        title: d("navwheel.limitTitle"),
        message: d("navwheel.maxLimitNotice"),
        duration: 2500
      }), !0;
    const a = {
      id: String(e.id || `wheel-${Date.now()}`),
      title: e.title || d("navwheel.site"),
      url: e.url,
      icon: e.icon || "",
      customIcon: e.customIcon || ""
    }, r = [...o, a];
    return await Pt()?.local?.set({ siteShelfLinks: r, logicweaverNavWheelShortcutsV1: r }), await Ye.loadShortcuts(), ht(), Le.show({
      appName: d("navwheel.appName"),
      title: d("navwheel.addedTitle"),
      message: d("navwheel.addedNotice", { name: a.title }),
      duration: 2500
    }), !0;
  } catch (t) {
    return console.warn("[NavWheel] 即时处理快捷方式失败", t), !1;
  }
}
async function er(e) {
  try {
    const t = await Pt()?.local?.get(["siteShelfLinks", "logicweaverNavWheelShortcutsV1"]), o = Array.isArray(t?.siteShelfLinks) ? t.siteShelfLinks : Array.isArray(t?.logicweaverNavWheelShortcutsV1) ? t.logicweaverNavWheelShortcutsV1 : [], s = o.find((r) => String(r.id) === String(e)), a = o.filter((r) => String(r.id) !== String(e));
    await Pt()?.local?.set({ siteShelfLinks: a, logicweaverNavWheelShortcutsV1: a }), await Ye.loadShortcuts(), ht(), s && Le.show({
      appName: d("navwheel.appName"),
      title: d("navwheel.removedNotice"),
      message: d("navwheel.removedSite", { name: s.title || d("navwheel.site") }),
      duration: 2500
    });
  } catch (t) {
    console.warn("[NavWheel] 删除快捷方式失败", t);
  }
}
function Mi(e) {
  Ct = { x: e.clientX, y: e.clientY };
}
function Di(e) {
  e.button === 1 && (e.preventDefault(), e.stopPropagation(), Ct = { x: e.clientX, y: e.clientY }, ne.isExpanded ? Gt() : eo(e.clientX, e.clientY));
}
function Ai(e) {
  e.button === 1 && e.preventDefault();
}
function Ei(e) {
  if (e.key === "Escape") {
    if (pt) {
      e.preventDefault(), e.stopPropagation(), pt = !1, qa.clear(), Ja.clear(), ht(), Le.show({
        appName: d("navwheel.appName"),
        title: d("navwheel.exitedEditing"),
        duration: 1500
      });
      return;
    }
    if (!ne.isExpanded || li.active) return;
    e.preventDefault(), e.stopPropagation(), ne.mode === "shortcuts" ? mn("main") : Gt();
  }
}
function tr(e) {
  try {
    const t = globalThis.chrome;
    if (typeof t?.runtime?.getURL == "function")
      return t.runtime.getURL("_favicon/?pageUrl=" + encodeURIComponent(e) + "&size=64");
  } catch {
  }
  return "";
}
function or(e) {
  const t = e.customIcon || e.icon;
  if (t && typeof t == "string" && !/google\.com\/s2\/favicons|icons\.duckduckgo/i.test(t))
    return t;
  if (e.url) {
    const o = Ae.getCachedIcon(e.url);
    if (o) return o;
    const s = tr(e.url);
    if (s) return s;
  }
  return e.icon || "🔗";
}
const Ye = {
  async start() {
    if (!Lo) {
      Lo = !0, Bn = Pe(mt, () => {
        ne.isExpanded && ht();
      }), Ct = { x: Math.round(window.innerWidth / 2), y: Math.round(window.innerHeight / 2) }, Ee.setActionHandler((e, t) => {
        if (e === "hub:click")
          ne.isExpanded ? ne.mode === "shortcuts" ? mn("main") : Gt() : eo();
        else if (e === "sector:click" || e === "container:click") {
          const o = Wo.find((s) => s.id === t?.id || e === "container:click" && s.id === ne.activeSectorId);
          o && Za(o);
        } else if (e === "sector:hover") {
          const o = ne.sectors.find((s) => s.id === t?.id);
          o && (Ee.setHub({ icon: o.icon, title: o.title, desc: o.desc, active: !0 }), Ee.setActiveSector(o.id), Ee.setBeam(o.angleDeg, Wo.length));
        } else e === "sector:leave" && (Ee.setActiveSector(null), Ee.setBeam(null, 0), Ee.setHub(ne.mode === "shortcuts" ? { icon: "🔙", title: d("navwheel.shortcuts") } : ne.mode === "tools" ? { icon: "🧰", title: d("navwheel.tools") } : null));
      }), window.addEventListener("logicweaver:dock-modules-changed", Ii), window.addEventListener("pointermove", Mi, { passive: !0 }), window.addEventListener("mousedown", Di, !0), window.addEventListener("auxclick", Ai, !0), window.addEventListener("keydown", Ei, !0), $o = (e, t) => {
        t === "local" && (e.siteShelfLinks || e.logicweaverNavWheelShortcutsV1) && this.loadShortcuts();
      }, Pt()?.onChanged?.addListener($o);
      try {
        if (!Lo) return;
        us = !1, Ee.setVisibility(!1);
      } catch {
      }
      await this.loadShortcuts(), ht();
    }
  },
  stop() {
    Lo = !1, Bn?.(), Bn = null, Ee.setActionHandler(null), window.removeEventListener("logicweaver:dock-modules-changed", Ii), window.removeEventListener("pointermove", Mi), window.removeEventListener("mousedown", Di, !0), window.removeEventListener("auxclick", Ai, !0), window.removeEventListener("keydown", Ei, !0), $o && Pt()?.onChanged?.removeListener($o), $o = null;
  },
  async loadShortcuts() {
    try {
      const e = await Pt()?.local?.get(["siteShelfLinks", "logicweaverNavWheelShortcutsV1"]);
      if (!Lo) return;
      const t = e?.siteShelfLinks?.length ? e.siteShelfLinks : e?.logicweaverNavWheelShortcutsV1;
      Qn = (Array.isArray(t) ? t : []).map((o, s) => ({
        id: String(o.id || `wheel-${s}`),
        title: String(o.title || o.url || d("navwheel.site")),
        desc: String(o.url || ""),
        url: String(o.url || ""),
        icon: or(o)
      })), ne.mode === "shortcuts" && ht();
    } catch (e) {
      console.warn("[NavWheel] 读取快捷方式失败", e);
    }
  },
  open(e, t) {
    eo(e ?? Ct.x, t ?? Ct.y);
  },
  close: Gt,
  get isEditingShortcuts() {
    return pt;
  },
  isLinkInWheel(e) {
    return e ? Qn.some((t) => t.url === e) : !1;
  },
  toggleEditingShortcuts: hs,
  handleLinkSelection: Qa,
  removeShortcut: er,
  toggle(e = !1) {
    ne.isExpanded ? Gt() : e ? eo(Ct.x, Ct.y) : eo();
  },
  toggleTools(e = !0) {
    ne.isExpanded && ne.mode === "tools" ? Gt() : eo(
      e ? Ct.x : ne.ballPosition.x,
      e ? Ct.y : ne.ballPosition.y,
      "tools"
    );
  },
  setMode(e) {
    mn(e);
  }
};
class lo {
  constructor() {
    this.activeShortcuts = { ...$n }, this.isListenerBound = !1, this.storageListenerBound = !1, this.shortcutReadVersion = 0, this.initShortcuts();
  }
  static getInstance() {
    return lo.instance || (lo.instance = new lo()), lo.instance;
  }
  getShortcuts() {
    return { ...this.activeShortcuts };
  }
  async setShortcut(t, o) {
    if (typeof t != "string" || !t || typeof o != "string")
      throw new Error("快捷键参数无效，未保存");
    if (typeof chrome > "u" || !chrome.storage?.local)
      throw new Error("快捷键存储不可用，未保存");
    const { optionsService: s, SHORTCUT_STORAGE_KEY: a } = await import("./options.service-BgfbCBNY.js").then((x) => x.g), g = (await chrome.storage.local.get(a))[a], f = { ...g || {}, [t]: o }, l = this.shortcutReadVersion, h = await s.saveSettings(
      { [a]: f },
      { [a]: g }
    );
    l === this.shortcutReadVersion && (++this.shortcutReadVersion, this.applyShortcutOverrides(h[a]));
  }
  applyShortcutOverrides(t) {
    const o = t && typeof t == "object" && !Array.isArray(t) ? Object.entries(t).filter((s) => Object.prototype.hasOwnProperty.call($n, s[0]) && typeof s[1] == "string") : [];
    this.activeShortcuts = { ...$n, ...Object.fromEntries(o) };
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
    if (!t || !yi(t)) return !1;
    if (st(t))
      return Be.handleToolClick(t), !0;
    switch (t) {
      case "bookmarks":
        return yn.toggle(), !0;
      case "settings":
        return wn.open(), !0;
      case "nav-wheel":
        return Ye.toggle(!0), !0;
      case "toolbox":
        return Ye.toggleTools(!0), !0;
      case "search": {
        if (typeof document < "u") {
          const o = document.getElementById("search-input");
          if (o)
            return o.focus(), o.select(), !0;
        }
        return !1;
      }
      case "todoist-new-task":
        return typeof window < "u" && typeof window.triggerTodoistQuickAdd == "function" ? window.triggerTodoistQuickAdd() : Be.handleToolClick("todoist"), !0;
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
        const s = ca(t);
        if (!s) return;
        const a = s.toLowerCase();
        for (const [r, g] of Object.entries(this.activeShortcuts))
          if (!(!g || !yi(r)) && g.toLowerCase().replace(/^cmd\+/, "meta+") === a) {
            t.preventDefault(), t.stopPropagation(), this.triggerToolShortcut(r);
            break;
          }
      },
      !0
    ));
  }
}
const ei = lo.getInstance();
class co {
  constructor() {
    this._isVisible = V(typeof document < "u" ? !document.hidden : !0), this.callbacks = /* @__PURE__ */ new Set(), this.activeIntervals = /* @__PURE__ */ new Set(), typeof document < "u" && document.addEventListener("visibilitychange", () => {
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
    return co.instance || (co.instance = new co()), co.instance;
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
const nr = co.getInstance(), Pi = [
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
function Qo(e) {
  return e === 0 ? { emoji: "☀️", label: d("weather.condition.clear") } : e <= 2 ? { emoji: "🌤️", label: d("weather.condition.mainlyClear") } : e === 3 ? { emoji: "☁️", label: d("weather.condition.cloudy") } : e === 45 || e === 48 ? { emoji: "🌫️", label: d("weather.condition.fog") } : e >= 51 && e <= 57 ? { emoji: "🌦️", label: d("weather.condition.drizzle") } : e >= 61 && e <= 67 ? { emoji: "🌧️", label: d("weather.condition.rain") } : e >= 71 && e <= 77 ? { emoji: "🌨️", label: d("weather.condition.snow") } : e >= 80 && e <= 82 ? { emoji: "🌧️", label: d("weather.condition.rainShower") } : e >= 85 && e <= 86 ? { emoji: "🌨️", label: d("weather.condition.snowShower") } : e >= 95 ? { emoji: "⛈️", label: d("weather.condition.thunderstorm") } : { emoji: "🌡️", label: d("weather.condition.unknown") };
}
class uo {
  constructor() {
    this.currentCity = "武汉", this.isRefreshing = !1, this.activeRequestId = 0, this.lastRawForecastData = null, this.initStorage();
  }
  static getInstance() {
    return uo.instance || (uo.instance = new uo()), uo.instance;
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
    const a = Qo(s.current?.weather_code ?? 0), r = Math.round(s.current?.temperature_2m ?? 0), g = s.hourly?.time || [], f = Date.now();
    let l = g.findIndex((L) => new Date(L).getTime() >= f);
    l < 0 && (l = 0);
    const h = [];
    for (let L = l; L < Math.min(l + 5, g.length); L++) {
      const B = L === l ? d("weather.now") : d("weather.hourSuffix", { hour: new Date(g[L]).getHours() }), H = Qo(s.hourly.weather_code[L]), U = Math.round(s.hourly.temperature_2m[L]);
      h.push({ time: B, emoji: H.emoji, temp: U });
    }
    let x = d("weather.noRain12h");
    for (let L = l; L < Math.min(l + 12, g.length); L++) {
      const B = s.hourly.weather_code[L], H = s.hourly.precipitation_probability?.[L] || 0;
      if (B >= 51 || H >= 60) {
        const U = new Date(g[L]).getHours(), k = B >= 71 && B <= 77 || B === 85 || B === 86 ? d("weather.snow") : d("weather.rain"), $ = H ? ` (${H}%)` : "";
        x = d("weather.expectPrecip", { time: `${U}:00`, type: k, prob: $ });
        break;
      }
    }
    const F = [d("weather.today"), d("weather.tomorrow"), d("weather.afterTomorrow")], m = [], D = s.daily?.time?.length || 0;
    for (let L = 1; L < Math.min(3, D); L++) {
      const B = F[L] || d("weather.plusDays", { count: L }), H = Qo(s.daily.weather_code[L]), U = `${Math.round(s.daily.temperature_2m_max[L])}°/${Math.round(s.daily.temperature_2m_min[L])}°`;
      m.push({ label: B, emoji: H.emoji, tempRange: U });
    }
    const v = Math.round(s.daily?.temperature_2m_max?.[0] ?? r), w = Math.round(s.daily?.temperature_2m_min?.[0] ?? r), T = d("weather.tempRange", { cond: a.label, max: v, min: w }), y = {
      cityName: o.name || t,
      currentEmoji: a.emoji,
      currentTemp: r,
      subText: T,
      rainText: x,
      hours: h,
      days: m
    };
    if (ut.ready(y, t), s.daily?.time) {
      const L = [
        d("weather.weekday.sun"),
        d("weather.weekday.mon"),
        d("weather.weekday.tue"),
        d("weather.weekday.wed"),
        d("weather.weekday.thu"),
        d("weather.weekday.fri"),
        d("weather.weekday.sat")
      ], B = [];
      for (let H = 0; H < s.daily.time.length; H++) {
        const U = new Date(s.daily.time[H]), M = H === 0 ? d("weather.today") : H === 1 ? d("weather.tomorrow") : H === 2 ? d("weather.afterTomorrow") : L[U.getDay()], k = Qo(s.daily.weather_code[H]);
        B.push({
          date: `${U.getMonth() + 1}/${U.getDate()}`,
          dayName: M,
          emoji: k.emoji,
          condition: k.label,
          highTemp: Math.round(s.daily.temperature_2m_max[H]),
          lowTemp: Math.round(s.daily.temperature_2m_min[H]),
          rainProb: s.daily.precipitation_probability_max?.[H] || 0
        });
      }
      ut.setForecastDays(B);
    }
    const _ = {
      humidity: s.current?.relative_humidity_2m ? `${s.current.relative_humidity_2m}%` : "60%",
      wind: s.current?.wind_speed_10m ? `${Math.round(s.current.wind_speed_10m)} km/h` : d("weather.detail.windLight"),
      uvIndex: d("weather.detail.uvNormal"),
      airQuality: d("weather.detail.airGood")
    };
    ut.setDetailInfo(_);
  }
  filterCities(t, o = 8) {
    const s = t.trim().toLowerCase();
    if (!s) return Pi.slice(0, o);
    const a = [];
    for (const r of Pi) {
      const g = r.name.toLowerCase(), f = r.pinyin.toLowerCase(), l = r.admin.toLowerCase();
      if ((g.startsWith(s) || f.startsWith(s) || g.includes(s) || f.includes(s) || l.includes(s)) && a.push(r), a.length >= o) break;
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
      const l = `https://api.open-meteo.com/v1/forecast?latitude=${f.latitude}&longitude=${f.longitude}&current=temperature_2m,weather_code,relative_humidity_2m,wind_speed_10m&hourly=temperature_2m,weather_code,precipitation_probability&daily=temperature_2m_max,temperature_2m_min,weather_code,precipitation_probability_max&forecast_days=7&timezone=auto`, h = await fetch(l);
      if (s !== this.activeRequestId || q.state === "unconfigured") {
        this.isRefreshing = !1;
        return;
      }
      const x = await h.json();
      this.lastRawForecastData = { city: o, loc: f, d: x }, s === this.activeRequestId && q.state !== "unconfigured" && this.applyForecastPayload(o, f, x);
    } catch (a) {
      s === this.activeRequestId && q.state !== "unconfigured" && ut.error(a?.message || "天气加载失败，右键此处可重新选择地点。", o);
    } finally {
      s === this.activeRequestId && (this.isRefreshing = !1);
    }
  }
}
const to = uo.getInstance();
function ir(e, t) {
  window.LogicWeaverIntro = yt, window.LogicWeaverStartupIntro = yt, window.LogicWeaverNotifications = Le, window.LogicWeaverWindowManager = Be, window.LogicWeaverWindowTabs = Be, window.LogicWeaverDomFreezer = da, window.LogicWeaverWallpaperService = pn, window.LogicWeaverLauncherService = Ae, window.LogicWeaverLauncherRuntime = Yn, window.LogicWeaverProfileService = $i;
  try {
    $i.init();
  } catch (o) {
    console.error("[ProfileService] init failed:", o);
  }
  window.LogicWeaverBookmarksService = ii, window.LogicWeaverCalendarService = ta, window.LogicWeaverWeather = ut, window.LogicWeaverWeatherService = to, window.LogicWeaverClock = ro, window.LogicWeaverSearch = qs, window.LogicWeaverSearchService = Js, Object.defineProperty(window, "LogicWeaverAiHotService", {
    configurable: !0,
    get: () => {
      import("./aihot.service-CXXKpxSC.js").then(({ aiHotService: o }) => {
        window.LogicWeaverAiHotService = o;
      });
    }
  }), window.LogicWeaverHomeMusic = et, window.LogicWeaverLauncherGroups = Fe, window.LogicWeaverProfileMenu = Fo, window.LogicWeaverWorkspaceLaunchers = ui, window.LogicWeaverMacDock = xt, window.LogicWeaverFullscreen = ao, window.enterFullscreenCard = (o) => ao.enter(o), window.exitFullscreenCard = () => ao.exit(), window.cycleFullscreenCard = () => ao.cycle(), window.LogicWeaverPageVisibility = nr, window.LogicWeaverBackgroundLibrary = _i, window.LogicWeaverNotificationCenter = Wt, window.LogicWeaverBookmarkMenu = si, window.LogicWeaverBookmarkPanel = yn, window.LogicWeaverBookmarkFolderStrip = hn, window.LogicWeaverLauncherDialogs = qi, window.LogicWeaverLauncherFolder = Ji, window.LogicWeaverLauncherMenus = ri, window.LogicWeaverSettings = wn, window.LogicWeaverClockSettings = Vt, window.LogicWeaverBiliTheater = Po, window.LogicWeaverBilibiliService = gi, window.getBiliJct = () => gi.getBiliJct(), window.LogicWeaverBiliMiniPlayer = Xn, window.openBiliMiniPlayer = (o) => Xn.openVideo(o), window.LogicWeaverAiDialog = pi, window.LogicWeaverAihotViewer = ci, window.LogicWeaverNavWheel = Ee, window.openNavWheel = (o, s) => Ye.open(o, s), window.closeNavWheel = () => Ye.close(), window.toggleNavWheel = (o) => Ye.toggle(o), window.toggleToolWheel = (o) => Ye.toggleTools(o), window.setNavWheelMode = (o) => Ye.setMode(o), window.LogicWeaverShortcuts = ei, window.triggerToolShortcut = (o) => ei.triggerToolShortcut(o), window.LogicWeaverCommands = e, window.LogicWeaverFeatures = t, window.LogicWeaverCalendarView = oa, window.LogicWeaverGitHubStatus = ai, window.LogicWeaverGitHubFolders = Do, window.LogicWeaverGitHubHero = Ao, window.LogicWeaverGitHubRepositories = At, window.LogicWeaverGitHubBatchBar = Eo, window.LogicWeaverTodoistLabels = na, window.LogicWeaverTodoistWorkspace = ia, window.LogicWeaverTodoistCalendarSidebar = sa, window.LogicWeaverTodoistTaskList = aa, window.LogicWeaverBiliMessagePanel = zt, window.LogicWeaverStickerBoard = ya, window.LogicWeaverStickersService = wa, window.LogicWeaverBiliFavorites = Qi, window.LogicWeaverBiliRadioTape = va, window.LogicWeaverBiliOrganizerDialogs = fa, window.LogicWeaverBiliUpGroupManager = ga, window.LogicWeaverBiliUpPreview = cn, window.LogicWeaverYouTube = ts, window.LogicWeaverAihotFeed = es, window.LogicWeaverGitHubTrending = cs, window.LogicWeaverCalendarWorkspace = so, window.LogicWeaverCalendar = so, window.LogicWeaverTodoistMainWorkspace = ra, window.LogicWeaverTodoistTaskDetail = ja, window.openBiliTheater = (o) => Po.openVideo(o), window.closeBiliTheater = () => Po.close(), window.showWindowsToast = (o) => {
    if (!o) return null;
    const s = Ln(o.target) || mi(o.url) || (o.appType === "bili" ? Hs([o.title, o.subtitle, o.message].filter((a) => typeof a == "string").join(" ")) : void 0);
    return Le.show({
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
    const r = typeof s == "object" && s ? s : a, g = typeof s == "number" ? s : 3200, f = r.isError || /失败|错误|异常|未获取|未找到/i.test(o), l = r.title || (f ? "B站操作未完成" : "哔哩哔哩"), h = r.subtitle || (o.length > 36 ? "" : o), x = r.message || (r.subtitle || o.length > 36 ? o : ""), F = {
      id: r.id || `bili_toast_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      appType: "bili",
      appName: "哔哩哔哩",
      icon: "assets/bilibili.svg",
      title: l,
      subtitle: h || o,
      message: x && x !== h ? x : "",
      showActions: !!(r.showActions || r.actionLabel),
      actionLabel: r.actionLabel || "",
      onClick: r.onClick || null,
      target: Ln(r.target) || mi(r.url) || Ln({ type: "bili-video", bvid: r.bvid, aid: r.aid ? String(r.aid) : void 0 }),
      url: r.url,
      duration: Math.max(3e3, g)
    };
    return window.showWindowsToast(F);
  }, window.showFetchToast = (o, s, a = "", r = "assets/logo.png", g = 3200) => window.showWindowsToast({
    appName: o,
    title: s,
    subtitle: a,
    icon: r || "assets/logo.png",
    duration: g,
    showActions: !1,
    actionLabel: "",
    appType: "fetch"
  }), window.LogicWeaverKineticDrag = Ca, window.LogicWeaverMarkdownAst = xa, window.setLauncherBackground = (o) => pn.setWallpaper(o), window.backgroundDbClear = (o) => Ks(o), window.openBackgroundHistory = () => _i.openDialog();
}
const ze = $e({
  isOpen: !1,
  query: "",
  selectedIndex: 0
});
let en = null;
const fs = {
  get state() {
    return ze;
  },
  open() {
    ze.isOpen || (ze.isOpen = !0, ze.query = "", ze.selectedIndex = 0, en = Be.pushModalCloser(() => (this.close(), !0)));
  },
  close() {
    ze.isOpen && (ze.isOpen = !1, ze.query = "", ze.selectedIndex = 0, en && (en(), en = null));
  },
  toggle() {
    ze.isOpen ? this.close() : this.open();
  },
  setQuery(e) {
    ze.query = e, ze.selectedIndex = 0;
  },
  selectNext(e) {
    e <= 0 || (ze.selectedIndex = (ze.selectedIndex + 1) % e);
  },
  selectPrev(e) {
    e <= 0 || (ze.selectedIndex = (ze.selectedIndex - 1 + e) % e);
  },
  async executeCommand(e) {
    this.close();
    try {
      await bn.execute(e.id, void 0, "command-palette");
    } catch (t) {
      console.warn(`[CommandPalette] Failed to execute ${e.id}:`, t);
    }
  }
};
typeof window < "u" && window.addEventListener("keydown", (e) => {
  if (li.active || e.defaultPrevented || e.isComposing || e.repeat) return;
  const t = (e.key || "").toLowerCase(), o = (e.ctrlKey || e.metaKey) && t === "k", s = e.altKey && (e.code === "Space" || t === " ");
  (o || s) && (e.preventDefault(), e.stopPropagation(), fs.toggle());
}, !0);
function sr(e) {
  e.register({
    id: "palette.toggle",
    title: "打开全局命令中心 (Spotlight)",
    category: "界面",
    keywords: ["命令", "palette", "spotlight", "raycast", "搜索", "cmd"],
    concurrency: "drop",
    run: () => fs.toggle()
  }), e.register({
    id: "intro.skip",
    title: "跳过开屏动画",
    category: "界面",
    keywords: ["开屏", "启动", "skip"],
    concurrency: "drop",
    enabled: () => yt.enabled && !yt.finished,
    run: () => yt.skip("COMMAND SKIP")
  }), e.register({
    id: "notifications.clear",
    title: "关闭当前 Toast",
    category: "通知",
    keywords: ["toast", "关闭"],
    description: "只关闭浮动提示，不删除通知中心历史",
    concurrency: "drop",
    enabled: () => Le.size > 0,
    run: () => Le.clear()
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
    enabled: () => so.ready,
    run: () => so.refresh()
  }), e.register({
    id: "calendar.today",
    title: "日历跳转到今天",
    category: "日历",
    keywords: ["今日", "today", "日期"],
    concurrency: "drop",
    enabled: () => so.ready,
    run: () => so.goToday()
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
const ar = ["hidden"], rr = {
  key: 0,
  class: "bookmark-folder-strip-empty"
}, lr = ["title", "data-bookmark-folder-id", "onClick", "onContextmenu"], cr = /* @__PURE__ */ fe({
  __name: "BookmarkFolderStrip",
  setup(e) {
    const t = V(null);
    function o(r) {
      const g = t.value;
      !g || g.scrollWidth <= g.clientWidth || !r.deltaY || (r.preventDefault(), g.scrollLeft += r.deltaY);
    }
    function s(r) {
      hn.openFolder(r.id);
    }
    function a(r, g) {
      hn.openContextMenu(g, r.clientX, r.clientY);
    }
    return (r, g) => (c(), p("nav", {
      id: "bookmark-folder-strip",
      ref_key: "stripRef",
      ref: t,
      class: "bookmark-folder-strip",
      "aria-label": "书签栏文件夹",
      hidden: !i(io).enabled,
      onWheel: o
    }, [
      i(io).folders.length ? E("", !0) : (c(), p("span", rr, u(i(io).emptyMessage || "书签栏没有文件夹"), 1)),
      (c(!0), p(Q, null, be(i(io).folders, (f) => (c(), p("button", {
        key: f.id,
        class: "bookmark-folder-chip",
        type: "button",
        title: `打开书签文件夹：${f.title || "未命名"}`,
        "data-bookmark-folder-id": f.id,
        onClick: (l) => s(f),
        onContextmenu: z((l) => a(l, f), ["prevent"])
      }, [
        g[0] || (g[0] = n("span", { "aria-hidden": "true" }, "📁", -1)),
        n("span", null, u(f.title || "未命名"), 1)
      ], 40, lr))), 128))
    ], 40, ar));
  }
}), dr = /* @__PURE__ */ Ne(cr, [["__scopeId", "data-v-df99d10f"]]), ur = ["aria-label"], pr = { class: "cube-manager-body" }, hr = ["disabled", "onClick", "title"], fr = ["disabled", "onClick", "title"], gr = ["onClick"], mr = ["onClick"], vr = ["onClick"], yr = ["type", "placeholder"], wr = { type: "submit" }, br = {
  key: 0,
  role: "alert"
}, kr = /* @__PURE__ */ fe({
  __name: "CubeConfigDialog",
  setup(e) {
    const t = He.state, o = te(() => He.getActiveFaces()), s = te(() => t.registeredFaces.filter((D) => !t.activeFaceIds.includes(D.id))), a = V(""), r = V("memo"), g = te(() => [
      { value: "memo", label: d("cube.manager.typeMemo"), icon: "📝" },
      { value: "countdown", label: d("cube.manager.typeCountdown"), icon: "⏳" },
      { value: "link", label: d("cube.manager.typeLink"), icon: "🔗" }
    ]), f = V(""), l = V(!1), h = V(JSON.stringify({ title: "每日一句", icon: "📝", customType: "memo", customData: { text: "今天也要记得休息" } }, null, 2)), x = V("");
    function F(D) {
      x.value = "";
      try {
        D();
      } catch (v) {
        x.value = v instanceof Error ? v.message : "操作失败";
      }
    }
    function m() {
      F(() => {
        const D = l.value ? JSON.parse(h.value) : {
          title: a.value,
          customType: r.value,
          customData: { text: f.value, targetDate: f.value, url: f.value }
        };
        He.addCustomFace(D), a.value = "", f.value = "";
      });
    }
    return (D, v) => (c(), pe(wt, { to: "body" }, [
      i(t).isConfigDialogOpen ? (c(), p("section", {
        key: 0,
        class: "cube-manager",
        role: "dialog",
        "aria-label": i(d)("cube.manager.title"),
        onKeydown: v[8] || (v[8] = No(z((w) => i(He).closeConfigDialog(), ["stop"]), ["esc"]))
      }, [
        n("header", null, [
          n("strong", null, u(i(d)("cube.manager.title")), 1),
          n("button", {
            type: "button",
            "aria-label": "关闭",
            onClick: v[0] || (v[0] = (w) => i(He).closeConfigDialog())
          }, "×")
        ]),
        n("div", pr, [
          n("p", null, u(i(d)("cube.manager.desc")), 1),
          (c(!0), p(Q, null, be(o.value, (w, T) => (c(), p("div", {
            key: w.id,
            class: "cube-row"
          }, [
            n("span", null, u(w.icon) + " " + u(w.title), 1),
            n("button", {
              type: "button",
              disabled: T === 0,
              onClick: (y) => F(() => i(He).moveUp(w.id)),
              title: i(d)("cube.manager.moveUp")
            }, "↑", 8, hr),
            n("button", {
              type: "button",
              disabled: T === o.value.length - 1,
              onClick: (y) => F(() => i(He).moveDown(w.id)),
              title: i(d)("cube.manager.moveDown")
            }, "↓", 8, fr),
            n("button", {
              type: "button",
              onClick: (y) => F(() => i(He).removeCustomFace(w.id))
            }, u(i(d)("cube.manager.removeFace")), 9, gr)
          ]))), 128)),
          (c(!0), p(Q, null, be(s.value, (w) => (c(), p("div", {
            key: w.id,
            class: "cube-row"
          }, [
            n("span", null, u(w.title) + u(i(d)("cube.manager.inactiveSuffix")), 1),
            n("button", {
              type: "button",
              onClick: (T) => F(() => i(He).toggleActive(w.id, !0))
            }, u(i(d)("cube.manager.add")), 9, mr),
            w.builtIn ? E("", !0) : (c(), p("button", {
              key: 0,
              type: "button",
              onClick: (T) => F(() => i(He).removeCustomFace(w.id))
            }, u(i(d)("cube.manager.delete")), 9, vr))
          ]))), 128)),
          n("h3", null, u(i(d)("cube.manager.addFace")), 1),
          n("label", null, [
            tt(n("input", {
              "onUpdate:modelValue": v[1] || (v[1] = (w) => l.value = w),
              type: "checkbox"
            }, null, 512), [
              [Os, l.value]
            ]),
            ot(" " + u(i(d)("cube.manager.pasteJson")), 1)
          ]),
          n("form", {
            onSubmit: z(m, ["prevent"])
          }, [
            l.value ? (c(), p(Q, { key: 1 }, [
              n("p", null, u(i(d)("cube.manager.securityNotice")), 1),
              tt(n("textarea", {
                "onUpdate:modelValue": v[6] || (v[6] = (w) => h.value = w),
                rows: "9",
                maxlength: "10000",
                "aria-label": "面的 JSON 配置",
                spellcheck: "false"
              }, null, 512), [
                [ho, h.value]
              ])
            ], 64)) : (c(), p(Q, { key: 0 }, [
              n("label", null, [
                ot(u(i(d)("cube.manager.fieldTitle")), 1),
                tt(n("input", {
                  "onUpdate:modelValue": v[2] || (v[2] = (w) => a.value = w),
                  maxlength: "60",
                  required: ""
                }, null, 512), [
                  [ho, a.value]
                ])
              ]),
              n("label", null, [
                ot(u(i(d)("cube.manager.fieldType")) + " ", 1),
                Z(zi, {
                  modelValue: r.value,
                  "onUpdate:modelValue": v[3] || (v[3] = (w) => r.value = w),
                  options: g.value,
                  size: "sm",
                  onChange: v[4] || (v[4] = (w) => r.value = w)
                }, null, 8, ["modelValue", "options"])
              ]),
              n("label", null, [
                ot(u(i(d)("cube.manager.fieldContent")), 1),
                tt(n("input", {
                  "onUpdate:modelValue": v[5] || (v[5] = (w) => f.value = w),
                  type: r.value === "countdown" ? "date" : "text",
                  placeholder: r.value === "link" ? "https://…" : i(d)("cube.manager.contentPlaceholderText"),
                  maxlength: "500",
                  required: ""
                }, null, 8, yr), [
                  [Bs, f.value]
                ])
              ])
            ], 64)),
            n("button", wr, u(i(d)("cube.manager.submitAdd")), 1)
          ], 32),
          x.value ? (c(), p("p", br, u(x.value), 1)) : E("", !0)
        ]),
        n("footer", null, [
          n("button", {
            type: "button",
            onClick: v[7] || (v[7] = (w) => F(() => i(He).resetDefaults()))
          }, u(i(d)("cube.manager.resetDefault")), 1),
          n("small", null, u(i(d)("cube.manager.resetNotice")), 1)
        ])
      ], 40, ur)) : E("", !0)
    ]));
  }
}), _r = /* @__PURE__ */ Ne(kr, [["__scopeId", "data-v-4cfc2436"]]), Cr = ["data-face"], xr = ["aria-label"], Lr = { class: "ms-top-side" }, $r = ["title"], Sr = ["title"], Tr = ["title"], Ir = {
  key: 0,
  class: "ms-top-meta"
}, Mr = {
  class: "ms-top-title",
  style: { color: "#10b981", "font-weight": "700" }
}, Dr = { class: "ms-top-artist" }, Ar = { class: "ms-top-meta" }, Er = ["title"], Pr = ["title"], Wr = {
  key: 0,
  class: "ms-top-divider"
}, Rr = ["title"], Nr = { class: "ms-top-mini-progress" }, Or = { class: "ms-top-side" }, Br = ["title"], Fr = ["title"], Hr = ["aria-label"], Kr = ["title"], jr = { class: "ms-cube-custom-icon" }, zr = { class: "ms-cube-custom-title" }, Vr = ["title"], Gr = {
  key: 1,
  class: "ms-cube-custom-text countdown"
}, Ur = ["href"], Yr = {
  class: "ms-cube-dots",
  "aria-hidden": "true"
}, Xr = ["title", "onClick"], qr = { class: "ms-cube-cm-header" }, Jr = { class: "ms-cube-cm-list" }, Zr = ["onClick"], Qr = { class: "ms-cube-cm-icon" }, el = { class: "ms-cube-cm-title" }, tl = {
  key: 0,
  class: "ms-cube-cm-check"
}, ol = /* @__PURE__ */ fe({
  __name: "TopInfoCube",
  props: {
    active: { type: Boolean, default: !0 }
  },
  setup(e) {
    const t = e, o = te(() => Vi.visible || gt.djModalOpen || gt.isActive && gt.isJoined), s = te(() => gt.isActive && gt.isJoined), a = te(() => He.getActiveFaces()), r = V("music"), g = V(0);
    let f = !1, l;
    Pe(
      () => a.value,
      (A) => {
        A.some((W) => W.id === r.value) || (r.value = A[0]?.id || "");
      },
      { immediate: !0 }
    );
    const h = te(() => a.value.filter((A) => !A.builtIn)), x = V(!1), F = V({ x: 0, y: 0 });
    Pe(() => t.active, (A) => {
      A || (x.value = !1, He.closeConfigDialog(), clearTimeout(l), f = !1);
    }, { immediate: !0 });
    const { menuRef: m, style: D } = di({
      visible: () => x.value,
      anchor: () => F.value,
      dismiss: () => {
        x.value = !1;
      }
    });
    function v(A) {
      A.preventDefault(), A.stopPropagation(), F.value = { x: A.clientX, y: A.clientY }, x.value = !0;
    }
    function w(A) {
      R(A), x.value = !1;
    }
    function T() {
      x.value = !1, He.openConfigDialog();
    }
    function y() {
      x.value = !1, _(() => He.resetDefaults()), R("music");
    }
    function _(A) {
      x.value = !1;
      try {
        A();
      } catch (W) {
        Le.show({ appName: "滚动立方体", title: "保存失败", message: W instanceof Error ? W.message : "请检查浏览器存储" });
      }
    }
    function L(A) {
      if (!A) return d("cube.countdown.noTarget");
      const j = new Date(A).getTime() - $.value, ve = Math.ceil(j / (1e3 * 60 * 60 * 24));
      return ve > 0 ? d("cube.countdown.remaining", { days: ve }) : ve === 0 ? d("cube.countdown.today") : d("cube.countdown.passed", { days: Math.abs(ve) });
    }
    const B = te(() => !oe.title || oe.title === "点击播放" ? d("home.music.defaultTitle") : oe.title), H = te(() => !oe.artist || oe.artist === "作者" ? d("home.music.defaultArtist") : oe.artist), U = te(() => oe.isBiliRadio ? d("cube.source.biliRadio") : oe.isNetease ? d("cube.source.netease") : oe.playing ? d("cube.source.siren") : d("cube.source.idle")), M = te(() => oe.currentLyric ? oe.currentLyric : oe.playing ? d("cube.defaultPlayingLyric") : d("cube.defaultIdleLyric"));
    function k() {
      Be.handleToolClick("music");
    }
    const $ = V(Date.now());
    let ee;
    Pe(() => t.active && a.value.some((A) => A.id === r.value && A.customType === "countdown"), (A) => {
      A && ($.value = Date.now()), clearInterval(ee), ee = A ? window.setInterval(() => {
        document.hidden || ($.value = Date.now());
      }, 6e4) : void 0;
    }, { immediate: !0 });
    function R(A, W = null) {
      const j = a.value, ve = j.find((ke) => ke.id === A) || j[0];
      if (ve) {
        if (Number.isFinite(W))
          g.value = W;
        else if (ve.id !== r.value) {
          const ke = j.findIndex((We) => We.id === r.value);
          let we = (j.findIndex((We) => We.id === ve.id) - ke + j.length) % j.length;
          we > j.length / 2 && (we -= j.length), g.value += we * 90;
        }
        r.value = ve.id;
      }
    }
    function G(A) {
      const W = a.value;
      if (W.length <= 1) return;
      const j = W.findIndex((we) => we.id === r.value), ke = ((j >= 0 ? j : 0) + A + W.length) % W.length, Se = W[ke];
      Se && R(Se.id, g.value + A * 90);
    }
    function N(A) {
      a.value.length <= 1 || A.altKey || Math.abs(A.deltaY) < 2 || (A.preventDefault(), !f && (f = !0, G(A.deltaY > 0 ? 1 : -1), l = setTimeout(() => {
        f = !1;
      }, 420)));
    }
    function Y(A) {
      !["ArrowUp", "ArrowDown", "PageUp", "PageDown"].includes(A.key) || A.target?.closest?.("input") || (A.preventDefault(), G(["ArrowDown", "PageDown"].includes(A.key) ? 1 : -1));
    }
    function me(A, W) {
      return r.value === A ? {
        transform: `rotateX(${-g.value}deg) translateZ(22px)`,
        visibility: "visible"
      } : {
        transform: `rotateX(-${W}deg) translateZ(22px)`,
        visibility: "hidden"
      };
    }
    function Ce(A) {
      const W = A.target;
      W && (W.tagName === "INPUT" || W.tagName === "TEXTAREA" || W.isContentEditable) || (A.preventDefault(), A.stopPropagation());
    }
    function qe(A) {
      const W = A.target;
      W && (W.tagName === "INPUT" || W.tagName === "TEXTAREA" || W.isContentEditable) || A.preventDefault();
    }
    return Nt(() => {
      clearInterval(ee), clearTimeout(l);
    }), (A, W) => tt((c(), p("div", {
      class: "ms-top-player",
      "data-face": r.value,
      tabindex: "0",
      title: "滚动立方体 · 滚轮切换面板，右键可自由增删与排序",
      "aria-label": "滚动立方体",
      onWheel: N,
      onKeydown: Y,
      onContextmenu: v,
      onCopy: Ce,
      onSelectstart: qe
    }, [
      a.value.length ? E("", !0) : (c(), p("button", {
        key: 0,
        type: "button",
        class: "ms-cube-cm-action",
        onClick: T
      }, "＋ 添加面（右键管理）")),
      n("div", {
        class: "ms-top-cube",
        style: xe({ transform: `translateZ(-22px) rotateX(${g.value}deg)` })
      }, [
        i(He).isActive("music") && r.value === "music" ? (c(), p("section", {
          key: 0,
          class: "ms-top-face ms-top-face-music",
          "aria-label": i(d)("cube.musicFaceAria"),
          style: xe(me("music", 0))
        }, [
          n("div", Lr, [
            n("button", {
              class: "ms-top-prev",
              title: i(d)("cube.prevTrack"),
              type: "button",
              onClick: W[0] || (W[0] = z((j) => i(et).prev(), ["stop"]))
            }, "⏮", 8, $r),
            n("button", {
              class: "ms-top-play",
              title: i(d)("cube.playPause"),
              type: "button",
              onClick: W[1] || (W[1] = z((j) => i(et).togglePlay(), ["stop"]))
            }, u(i(oe).playing ? "⏸" : "▶"), 9, Sr)
          ]),
          n("button", {
            class: "ms-top-main",
            title: i(d)("cube.openMusicPicker"),
            type: "button",
            onClick: z(k, ["stop"])
          }, [
            o.value ? (c(), p("div", Ir, [
              n("span", Mr, " 🎧 " + u(s.value ? i(d)("cube.listeningTogether") : i(d)("cube.listening")) + "：" + u(B.value), 1),
              n("span", Dr, u(H.value), 1)
            ])) : (c(), p(Q, { key: 1 }, [
              n("div", Ar, [
                n("span", {
                  class: "ms-top-title",
                  title: B.value
                }, u(B.value), 9, Er),
                n("span", {
                  class: "ms-top-artist",
                  title: H.value
                }, u(H.value), 9, Pr),
                n("span", {
                  class: de(["ms-top-source", { idle: !i(oe).playing }])
                }, u(U.value), 3),
                M.value ? (c(), p("span", Wr)) : E("", !0)
              ]),
              M.value ? (c(), p("span", {
                key: 0,
                class: "ms-top-lyric",
                title: M.value
              }, u(M.value), 9, Rr)) : E("", !0)
            ], 64)),
            n("div", Nr, [
              n("div", {
                class: "ms-top-mini-fill",
                style: xe({ width: i(oe).progressPercent + "%" })
              }, null, 4)
            ])
          ], 8, Tr),
          n("div", Or, [
            n("button", {
              class: "ms-top-next",
              title: i(d)("cube.nextTrack"),
              type: "button",
              onClick: W[2] || (W[2] = z((j) => i(et).next(), ["stop"]))
            }, "⏭", 8, Br),
            n("button", {
              class: "ms-top-open",
              title: i(d)("cube.openPlaylist"),
              type: "button",
              onClick: z(k, ["stop"])
            }, "🎵", 8, Fr)
          ])
        ], 12, xr)) : E("", !0),
        (c(!0), p(Q, null, be(h.value, (j, ve) => (c(), p("section", {
          key: j.id,
          class: "ms-top-face ms-top-face-custom",
          "aria-label": j.title,
          style: xe(me(j.id, (ve + 1) * 90))
        }, [
          r.value === j.id ? (c(), p("div", {
            key: 0,
            class: "ms-cube-custom-body",
            title: j.desc
          }, [
            n("span", jr, u(j.icon), 1),
            n("strong", zr, u(j.title), 1),
            W[10] || (W[10] = n("span", { class: "ms-cube-divider" }, null, -1)),
            j.customType === "memo" ? (c(), p("span", {
              key: 0,
              class: "ms-cube-custom-text",
              title: j.customData?.text
            }, u(j.customData?.text || i(d)("cube.memo.clickToConfig")), 9, Vr)) : j.customType === "countdown" ? (c(), p("span", Gr, u(L(j.customData?.targetDate)), 1)) : j.customType === "link" ? (c(), p("a", {
              key: 2,
              href: j.customData?.url,
              target: "_blank",
              rel: "noreferrer",
              class: "ms-cube-custom-link",
              onClick: W[3] || (W[3] = z(() => {
              }, ["stop"]))
            }, u(j.customData?.url) + " ↗ ", 9, Ur)) : E("", !0)
          ], 8, Kr)) : E("", !0),
          n("button", {
            type: "button",
            class: "ms-cube-config-trigger",
            title: "管理立方体面",
            onClick: W[4] || (W[4] = z((ke) => i(He).openConfigDialog(), ["stop"]))
          }, " ⚙ ")
        ], 12, Hr))), 128))
      ], 4),
      n("div", Yr, [
        (c(!0), p(Q, null, be(a.value, (j) => (c(), p("i", {
          key: j.id,
          class: de({ on: r.value === j.id }),
          title: j.title,
          onClick: z((ve) => R(j.id), ["stop"])
        }, null, 10, Xr))), 128))
      ]),
      (c(), pe(wt, { to: "body" }, [
        t.active && x.value ? (c(), p("div", {
          key: 0,
          ref_key: "menuRef",
          ref: m,
          class: "ms-cube-context-menu",
          style: xe(i(D)),
          onClick: W[9] || (W[9] = z(() => {
          }, ["stop"]))
        }, [
          n("div", qr, [
            W[11] || (W[11] = n("span", null, "🎲 滚动立方体面", -1)),
            n("button", {
              type: "button",
              class: "ms-cube-cm-close",
              onClick: W[5] || (W[5] = (j) => x.value = !1)
            }, "×")
          ]),
          n("div", Jr, [
            (c(!0), p(Q, null, be(a.value, (j) => (c(), p("button", {
              key: j.id,
              type: "button",
              class: de(["ms-cube-cm-item", { active: r.value === j.id }]),
              onClick: (ve) => w(j.id)
            }, [
              n("span", Qr, u(j.icon), 1),
              n("span", el, u(j.title), 1),
              r.value === j.id ? (c(), p("span", tl, "✓")) : E("", !0)
            ], 10, Zr))), 128))
          ]),
          W[16] || (W[16] = n("div", { class: "ms-cube-cm-divider" }, null, -1)),
          n("button", {
            type: "button",
            class: "ms-cube-cm-action",
            onClick: T
          }, [...W[12] || (W[12] = [
            n("span", null, "＋ 添加面 / 管理面", -1)
          ])]),
          n("button", {
            type: "button",
            class: "ms-cube-cm-action",
            onClick: W[6] || (W[6] = (j) => {
              G(-1), x.value = !1;
            })
          }, [...W[13] || (W[13] = [
            n("span", null, "⏮ 上一个面板", -1)
          ])]),
          n("button", {
            type: "button",
            class: "ms-cube-cm-action",
            onClick: W[7] || (W[7] = (j) => {
              G(1), x.value = !1;
            })
          }, [...W[14] || (W[14] = [
            n("span", null, "⏭ 下一个面板", -1)
          ])]),
          r.value ? (c(), p("button", {
            key: 0,
            type: "button",
            class: "ms-cube-cm-action danger",
            onClick: W[8] || (W[8] = (j) => _(() => i(He).removeCustomFace(r.value)))
          }, "删除当前面")) : E("", !0),
          n("button", {
            type: "button",
            class: "ms-cube-cm-action danger",
            onClick: y
          }, [...W[15] || (W[15] = [
            n("span", null, "↺ 恢复默认（仅音乐）", -1)
          ])])
        ], 4)) : E("", !0)
      ])),
      t.active ? (c(), pe(_r, { key: 1 })) : E("", !0)
    ], 40, Cr)), [
      [fo, t.active]
    ]);
  }
}), nl = /* @__PURE__ */ Ne(ol, [["__scopeId", "data-v-1ff8eea7"]]), Mo = $e({
  isOpen: !1
}), gs = {
  open() {
    Mo.isOpen = !0;
  },
  close() {
    Mo.isOpen = !1;
  },
  toggle() {
    Mo.isOpen = !Mo.isOpen;
  }
}, ti = Rt(Mo);
function il() {
  if (typeof chrome > "u" || !chrome.runtime?.onMessage) return () => {
  };
  let e = !1, t;
  const o = (s, a, r) => {
    a.id !== chrome.runtime.id || s?.type !== "TOGGLE_SIDE_DRAWER" || t === void 0 || s.targetTabId !== t || (gs.toggle(), r({ ok: !0 }));
  };
  return chrome.tabs.getCurrent().then((s) => {
    e || (t = s?.id, chrome.runtime.onMessage.addListener(o));
  }).catch(() => console.warn("[SideDrawer] Could not bind the home-page command.")), () => {
    e = !0, chrome.runtime.onMessage.removeListener(o);
  };
}
const sl = { class: "tb-brand" }, al = ["title", "aria-expanded", "aria-label"], rl = ["src", "alt"], ll = ["hidden"], cl = ["title", "hidden"], dl = { id: "vue-bookmark-folder-strip-root" }, ul = { class: "tb-actions" }, pl = {
  id: "workspace-launchers",
  hidden: ""
}, hl = ["title", "aria-expanded"], fl = ["title"], gl = /* @__PURE__ */ fe({
  __name: "AppTopBar",
  setup(e) {
    const t = X(() => import("./WorkspaceLaunchers-DdhPAeRi.js"));
    function o(l) {
      l.preventDefault(), l.stopPropagation();
      const h = typeof window < "u" ? window : null;
      h?.LogicWeaverWindowManager?.open ? h.LogicWeaverWindowManager.open("settings") : h?.LogicWeaverWindowTabs?.open ? h.LogicWeaverWindowTabs.open("settings") : wn.open();
    }
    function s(l) {
      l.preventDefault();
      const h = typeof window < "u" ? window : null;
      typeof h?.toggleBookmarkPanel == "function" ? h.toggleBookmarkPanel() : h?.LogicWeaverBookmarkPanel?.toggle ? h.LogicWeaverBookmarkPanel.toggle() : ii.toggleBookmarkPanel();
    }
    function a(l) {
      l.preventDefault(), Wt.toggle();
    }
    function r(l) {
      l.preventDefault(), Fo.open(l.clientX, l.clientY);
    }
    function g(l) {
      const h = l.target;
      h && (h.tagName === "INPUT" || h.tagName === "TEXTAREA" || h.isContentEditable) || (l.preventDefault(), l.stopPropagation());
    }
    function f(l) {
      const h = l.target;
      h && (h.tagName === "INPUT" || h.tagName === "TEXTAREA" || h.isContentEditable) || l.preventDefault();
    }
    return Xe(() => {
      Wt.start();
      const l = localStorage.getItem("theme") || "light";
      document.documentElement.dataset.theme = l, document.documentElement.setAttribute("data-theme", l);
    }), (l, h) => (c(), p("header", {
      class: de(["topbar", { "bookmark-folders-mode": i(io).enabled }]),
      onCopy: g,
      onSelectstart: f
    }, [
      n("div", sl, [
        n("button", {
          id: "bili-profile-button",
          class: "bili-profile-button",
          type: "button",
          title: i(d)("topbar.notifications"),
          "aria-controls": "notification-center",
          "aria-expanded": i(Gi).isOpen,
          "aria-label": i(ko) ? i(d)("topbar.notificationsUnread", { count: i(ko) }) : i(d)("topbar.notifications"),
          onClick: a,
          onContextmenu: h[0] || (h[0] = z((x) => r(x), ["prevent"]))
        }, [
          n("img", {
            id: "bili-profile-avatar",
            src: i(oo).avatarUrl || "assets/bilibili.svg",
            alt: i(oo).userName || i(d)("topbar.notifications")
          }, null, 8, rl),
          n("span", {
            id: "bili-profile-badge",
            class: "bili-profile-badge",
            hidden: i(ko) <= 0
          }, u(i(ko) > 99 ? "99+" : i(ko)), 9, ll)
        ], 40, al),
        n("button", {
          id: "bookmark-handle",
          class: "bookmark-handle",
          type: "button",
          "aria-expanded": "false",
          title: i(d)("topbar.bookmarks"),
          hidden: i(io).enabled,
          onClick: s
        }, [
          h[2] || (h[2] = n("span", { id: "bookmark-handle-icon" }, "📁", -1)),
          n("span", null, u(i(d)("topbar.bookmarks")), 1)
        ], 8, cl),
        n("div", dl, [
          Z(dr)
        ])
      ]),
      Z(nl, {
        active: !i(Tt).activeId
      }, null, 8, ["active"]),
      n("div", ul, [
        h[3] || (h[3] = n("button", {
          id: "daily-toggle",
          class: "tb-pill",
          type: "button",
          hidden: "",
          title: "查看日报"
        }, "📰 日报", -1)),
        n("span", pl, [
          Z(i(t))
        ]),
        n("button", {
          id: "side-drawer-toggle",
          class: de(["tb-btn", { active: i(ti).isOpen }]),
          type: "button",
          title: i(d)("topbar.sidebar"),
          "aria-controls": "in-page-side-drawer",
          "aria-expanded": i(ti).isOpen,
          onClick: h[1] || (h[1] = (x) => i(gs).toggle())
        }, " 📑 ", 10, hl),
        n("button", {
          id: "settings-open",
          class: "tb-btn",
          title: i(d)("topbar.settings"),
          onClick: o
        }, "⚙", 8, fl)
      ])
    ], 34));
  }
}), ml = {
  key: 0,
  class: "notice"
}, vl = {
  key: 1,
  class: "muted small"
}, yl = {
  key: 2,
  class: "notice"
}, wl = {
  key: 3,
  class: "notice"
}, bl = { class: "wx-cur" }, kl = { class: "wx-emoji" }, _l = { class: "wx-temp" }, Cl = { class: "wx-sub" }, xl = { class: "wx-rain" }, Ll = { class: "wx-hours" }, $l = { class: "hh" }, Sl = { class: "he" }, Tl = { class: "ht" }, Il = { class: "wx-days" }, Ml = ["open"], Dl = { class: "weather-forecast-head" }, Al = { class: "weather-forecast-city-info" }, El = { class: "weather-forecast-icon" }, Pl = { id: "weather-forecast-city-title" }, Wl = { class: "small muted" }, Rl = { class: "weather-forecast-actions" }, Nl = ["title"], Ol = ["title"], Bl = {
  key: 0,
  class: "weather-metrics-grid"
}, Fl = { class: "weather-metric-item" }, Hl = { class: "metric-label" }, Kl = {
  class: "metric-val",
  id: "weather-forecast-humidity"
}, jl = { class: "weather-metric-item" }, zl = { class: "metric-label" }, Vl = {
  class: "metric-val",
  id: "weather-forecast-wind"
}, Gl = { class: "weather-metric-item" }, Ul = { class: "metric-label" }, Yl = {
  class: "metric-val",
  id: "weather-forecast-uv"
}, Xl = { class: "weather-metric-item" }, ql = { class: "metric-label" }, Jl = {
  class: "metric-val",
  id: "weather-forecast-aqi"
}, Zl = {
  class: "weather-forecast-list",
  id: "weather-forecast-days-list"
}, Ql = { class: "day-date-col" }, ec = { class: "day-name" }, tc = { class: "day-date small muted" }, oc = { class: "day-weather-col" }, nc = { class: "day-emoji" }, ic = { class: "day-cond" }, sc = { class: "day-rain-col" }, ac = {
  key: 0,
  class: "rain-tag"
}, rc = {
  key: 1,
  class: "rain-tag empty"
}, lc = { class: "day-temp-bar-col" }, cc = { class: "low-temp" }, dc = { class: "temp-track" }, uc = { class: "high-temp" }, pc = { class: "weather-location-head" }, hc = { class: "weather-location-title-row" }, fc = { class: "weather-location-title" }, gc = ["title"], mc = { class: "weather-input-wrapper" }, vc = ["placeholder", "onKeydown"], yc = ["title"], wc = {
  type: "submit",
  class: "weather-location-submit"
}, bc = { key: 0 }, kc = { class: "weather-section-subtitle" }, _c = {
  key: 0,
  class: "weather-location-suggestions"
}, Cc = ["onClick"], xc = { class: "weather-suggestion-name" }, Lc = { class: "weather-suggestion-sub" }, $c = {
  key: 1,
  class: "weather-suggestion-empty"
}, Sc = { key: 1 }, Tc = { class: "weather-section-subtitle" }, Ic = { class: "weather-quick-chips-grid" }, Mc = ["onClick"], Dc = /* @__PURE__ */ fe({
  __name: "WeatherWidget",
  setup(e) {
    const t = V(!1), o = V({ x: 0, y: 0 }), s = V(""), a = V(null), r = V(null), g = ["深圳", "武汉", "北京", "上海", "广州", "成都", "杭州", "南京", "西安", "重庆", "苏州", "天津"], f = te(() => {
      const y = s.value.trim();
      return y ? to.filterCities(y, 6) : [];
    });
    function l(y) {
      const H = y?.clientX ?? window.innerWidth / 2 - 140, U = y?.clientY ?? window.innerHeight / 2 - 320 / 2, M = Math.max(12, Math.min(window.innerWidth - 280 - 12, H)), k = Math.max(12, Math.min(window.innerHeight - 320 - 12, U));
      o.value = { x: M, y: k }, t.value = !0, s.value = "", St(() => {
        r.value?.focus();
      });
    }
    function h() {
      t.value = !1, s.value = "";
    }
    async function x(y) {
      const _ = y.trim();
      _ && (h(), await to.changeCity(_));
    }
    function F() {
      const y = s.value.trim();
      y && x(y);
    }
    function m(y) {
      if (!t.value) return;
      const _ = y.target;
      a.value && !a.value.contains(_) && h();
    }
    function D(y) {
      t.value && y.key === "Escape" && (y.preventDefault(), h());
    }
    Xe(() => {
      ut.setRefreshAction(() => {
        to.loadWeather();
      }), ut.setChangeLocationAction((y) => {
        l(y);
      }), to.loadWeather(), Pe(mt, () => {
        to.reformatCurrentWeather();
      }), window.addEventListener("pointerdown", m, !0), window.addEventListener("keydown", D, !0);
    }), Nt(() => {
      window.removeEventListener("pointerdown", m, !0), window.removeEventListener("keydown", D, !0);
    });
    function v(y) {
      y.preventDefault(), l(y);
    }
    function w() {
      ut.closeForecastModal();
    }
    function T(y) {
      y.target?.id === "weather-forecast-dialog" && w();
    }
    return (y, _) => (c(), p("div", {
      class: "weather-widget-container",
      onContextmenu: v
    }, [
      i(q).state === "unconfigured" ? (c(), p("p", ml, u(i(d)("weather.noCitySet")), 1)) : i(q).state === "loading" ? (c(), p("p", vl, u(i(d)("common.loading")), 1)) : i(q).state === "not_found" ? (c(), p("p", yl, u(i(d)("weather.cityNotFound", { city: i(q).city })), 1)) : i(q).state === "error" ? (c(), p("p", wl, u(i(q).errorMessage || i(d)("weather.loadFailed")), 1)) : i(q).state === "ready" && i(q).data ? (c(), p(Q, { key: 4 }, [
        n("div", bl, [
          n("span", kl, u(i(q).data.currentEmoji), 1),
          n("span", _l, u(i(q).data.currentTemp) + "°", 1)
        ]),
        n("p", Cl, u(i(q).data.subText), 1),
        n("p", xl, u(i(q).data.rainText), 1),
        n("div", Ll, [
          (c(!0), p(Q, null, be(i(q).data.hours, (L, B) => (c(), p("div", {
            key: B,
            class: "wx-h"
          }, [
            n("span", $l, u(L.time), 1),
            n("span", Sl, u(L.emoji), 1),
            n("span", Tl, u(L.temp) + "°", 1)
          ]))), 128))
        ]),
        n("div", Il, [
          (c(!0), p(Q, null, be(i(q).data.days, (L, B) => (c(), p("span", { key: B }, u(L.label) + " " + u(L.emoji) + " " + u(L.tempRange), 1))), 128))
        ])
      ], 64)) : E("", !0),
      n("dialog", {
        id: "weather-forecast-dialog",
        class: "weather-forecast-dialog",
        open: i(q).forecastModalOpen,
        onClick: T
      }, [
        n("div", {
          class: "weather-forecast-shell",
          onClick: _[1] || (_[1] = z(() => {
          }, ["stop"]))
        }, [
          n("header", Dl, [
            n("div", Al, [
              n("span", El, u(i(q).data?.currentEmoji || "🌤️"), 1),
              n("div", null, [
                n("h3", Pl, u(i(q).city || i(q).data?.cityName || i(d)("weather.forecastTitle")), 1),
                n("p", Wl, u(i(q).data?.subText || i(d)("weather.forecastSub")), 1)
              ])
            ]),
            n("div", Rl, [
              n("button", {
                id: "weather-forecast-refresh-btn",
                type: "button",
                class: "weather-forecast-btn",
                title: i(d)("weather.refreshTitle"),
                onClick: _[0] || (_[0] = (L) => i(ut).refresh())
              }, u(i(d)("weather.refresh")), 9, Nl),
              n("button", {
                id: "weather-forecast-close-btn",
                type: "button",
                class: "weather-forecast-close",
                title: i(d)("common.close"),
                onClick: w
              }, " ✕ ", 8, Ol)
            ])
          ]),
          i(q).detailInfo ? (c(), p("div", Bl, [
            n("div", Fl, [
              n("span", Hl, u(i(d)("weather.metric.humidity")), 1),
              n("span", Kl, u(i(q).detailInfo.humidity || "50%"), 1)
            ]),
            n("div", jl, [
              n("span", zl, u(i(d)("weather.metric.wind")), 1),
              n("span", Vl, u(i(q).detailInfo.wind || (i(mt) === "en" ? "Breeze" : "微风")), 1)
            ]),
            n("div", Gl, [
              n("span", Ul, u(i(d)("weather.metric.uv")), 1),
              n("span", Yl, u(i(q).detailInfo.uvIndex || (i(mt) === "en" ? "Moderate" : "中等")), 1)
            ]),
            n("div", Xl, [
              n("span", ql, u(i(d)("weather.metric.aqi")), 1),
              n("span", Jl, u(i(q).detailInfo.airQuality || (i(mt) === "en" ? "Good" : "良")), 1)
            ])
          ])) : E("", !0),
          n("div", Zl, [
            (c(!0), p(Q, null, be(i(q).forecastDays, (L, B) => (c(), p("div", {
              key: B,
              class: "weather-forecast-day-row forecast-day-item"
            }, [
              n("div", Ql, [
                n("span", ec, u(L.dayName), 1),
                n("span", tc, u(L.date), 1)
              ]),
              n("div", oc, [
                n("span", nc, u(L.emoji), 1),
                n("span", ic, u(L.condition), 1)
              ]),
              n("div", sc, [
                L.rainProb > 0 ? (c(), p("span", ac, "☂️ " + u(L.rainProb) + "%", 1)) : (c(), p("span", rc, u(i(d)("weather.metric.noRain")), 1))
              ]),
              n("div", lc, [
                n("span", cc, u(L.lowTemp) + "°", 1),
                n("div", dc, [
                  n("div", {
                    class: "temp-range-fill",
                    style: xe({
                      left: `${Math.max(0, Math.min(100, (L.lowTemp + 10) * 2))}%`,
                      width: `${Math.max(20, Math.min(80, (L.highTemp - L.lowTemp) * 6))}%`
                    })
                  }, null, 4)
                ]),
                n("span", uc, u(L.highTemp) + "°", 1)
              ])
            ]))), 128))
          ])
        ])
      ], 8, Ml),
      (c(), pe(wt, { to: "body" }, [
        t.value ? (c(), p("div", {
          key: 0,
          ref_key: "contextMenuRef",
          ref: a,
          class: "weather-location-context-menu",
          style: xe({ left: `${o.value.x}px`, top: `${o.value.y}px` }),
          onClick: _[4] || (_[4] = z(() => {
          }, ["stop"])),
          onContextmenu: _[5] || (_[5] = z(() => {
          }, ["prevent"]))
        }, [
          n("div", pc, [
            n("div", hc, [
              n("span", fc, u(i(d)("weather.menu.changeLocation")), 1),
              n("span", {
                class: "weather-location-curr-badge",
                title: i(q).city
              }, [
                _[6] || (_[6] = n("span", { class: "weather-curr-dot" }, null, -1)),
                ot(" " + u(i(q).city || i(d)("weather.menu.unset")), 1)
              ], 8, gc)
            ])
          ]),
          n("form", {
            class: "weather-location-form",
            onSubmit: z(F, ["prevent"])
          }, [
            n("div", mc, [
              _[7] || (_[7] = n("span", { class: "weather-input-icon" }, "🔍", -1)),
              tt(n("input", {
                ref_key: "inputRef",
                ref: r,
                class: "weather-location-input",
                placeholder: i(d)("weather.menu.inputPlaceholder"),
                "onUpdate:modelValue": _[2] || (_[2] = (L) => s.value = L),
                onKeydown: No(z(F, ["prevent"]), ["enter"]),
                autocomplete: "off"
              }, null, 40, vc), [
                [ho, s.value]
              ]),
              s.value ? (c(), p("button", {
                key: 0,
                type: "button",
                class: "weather-input-clear",
                onClick: _[3] || (_[3] = (L) => s.value = ""),
                title: i(d)("weather.menu.clearInput")
              }, "✕", 8, yc)) : E("", !0)
            ]),
            n("button", wc, u(i(d)("weather.menu.submit")), 1)
          ], 32),
          s.value.trim() ? (c(), p("div", bc, [
            n("div", kc, u(i(d)("weather.menu.suggestions")), 1),
            f.value.length ? (c(), p("div", _c, [
              (c(!0), p(Q, null, be(f.value, (L) => (c(), p("button", {
                key: L.name + L.admin,
                type: "button",
                class: "weather-suggestion-item",
                onClick: (B) => x(L.name)
              }, [
                n("span", xc, u(L.name), 1),
                n("span", Lc, u(L.admin), 1)
              ], 8, Cc))), 128))
            ])) : (c(), p("div", $c, u(i(d)("weather.menu.emptySuggestion")), 1))
          ])) : (c(), p("div", Sc, [
            n("div", Tc, u(i(d)("weather.menu.commonCities")), 1),
            n("div", Ic, [
              (c(), p(Q, null, be(g, (L) => n("button", {
                key: L,
                type: "button",
                class: de(["weather-quick-chip", { active: i(q).city === L }]),
                onClick: (B) => x(L)
              }, u(L), 11, Mc)), 64))
            ])
          ]))
        ], 36)) : E("", !0)
      ]))
    ], 32));
  }
}), ms = /* @__PURE__ */ Ne(Dc, [["__scopeId", "data-v-bf1a1ba5"]]), oi = "heroCustomMottoV1";
function Ac() {
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
const Qt = Ac(), J = $e({
  loaded: !1,
  customText: Qt.customText,
  history: Qt.history,
  currentIndex: Qt.customText && Qt.history.length ? Qt.history.findIndex((e) => e.text === Qt.customText) : -1,
  menuOpen: !1,
  menuPos: { x: 0, y: 0 }
});
function Ec(e) {
  return new Promise((t) => {
    typeof chrome < "u" && chrome?.storage?.local?.get ? chrome.storage.local.get([e], (o) => t(o?.[e])) : t(null);
  });
}
function Pc(e, t) {
  try {
    typeof localStorage < "u" && localStorage.setItem(e, JSON.stringify(t));
  } catch {
  }
  return new Promise((o) => {
    typeof chrome < "u" && chrome?.storage?.local?.set ? chrome.storage.local.set({ [e]: t }, () => o()) : o();
  });
}
function Wc(e) {
  const t = (a) => String(a).padStart(2, "0"), o = `${e.getFullYear()}-${t(e.getMonth() + 1)}-${t(e.getDate())}`, s = `${t(e.getHours())}:${t(e.getMinutes())}`;
  return { date: o, time: s };
}
const ct = {
  async init() {
    try {
      const e = await Ec(oi);
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
    await Pc(oi, e);
  },
  setCustomMotto(e) {
    const t = e.trim();
    if (!t) {
      this.resetToSystem();
      return;
    }
    const { date: o, time: s } = Wc(/* @__PURE__ */ new Date());
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
}, Rc = ["title"], Nc = ["placeholder"], Oc = { class: "motto-content" }, Bc = ["title"], Fc = { class: "motto-menu-header" }, Hc = { class: "dim" }, Kc = { class: "motto-history-label" }, jc = { class: "motto-history-list" }, zc = {
  key: 0,
  class: "motto-history-empty dim"
}, Vc = ["onClick"], Gc = { class: "motto-item-date" }, Uc = ["title"], Yc = ["title", "onClick"], Xc = /* @__PURE__ */ fe({
  __name: "HeroMotto",
  setup(e) {
    const t = V(!1), o = V(""), s = V(null), a = {
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
      return w ? d(w) : v;
    }
    const g = te(() => J.customText ? r(J.customText) : Ie.greetingText);
    function f() {
      ct.closeMenu(), o.value = J.customText || Ie.greetingText, t.value = !0, St(() => {
        s.value?.focus(), s.value?.select();
      });
    }
    function l() {
      if (!t.value) return;
      t.value = !1;
      const v = o.value.trim();
      ct.setCustomMotto(v), v && Le.fetch(d("motto.appName"), d("motto.updated", { text: v }));
    }
    function h() {
      t.value = !1;
    }
    function x(v) {
      v.key === "Enter" ? (v.preventDefault(), l()) : v.key === "Escape" && (v.preventDefault(), h());
    }
    function F(v) {
      t.value || (v.preventDefault(), v.stopPropagation(), ct.stepHistory(v.deltaY > 0 ? 1 : -1));
    }
    function m(v) {
      v.preventDefault(), v.stopPropagation(), ct.openMenu(v.clientX, v.clientY);
    }
    function D(v) {
      J.menuOpen && (v.target.closest(".motto-context-menu") || ct.closeMenu());
    }
    return Xe(() => {
      ct.init(), window.addEventListener("click", D);
    }), Nt(() => {
      window.removeEventListener("click", D);
    }), (v, w) => (c(), p(Q, null, [
      n("div", {
        class: "hero-motto-wrapper",
        title: i(d)("motto.hint"),
        onWheel: F,
        onContextmenu: m
      }, [
        t.value ? tt((c(), p("input", {
          key: 0,
          ref_key: "mottoInputRef",
          ref: s,
          "onUpdate:modelValue": w[0] || (w[0] = (T) => o.value = T),
          class: "hero-motto-input",
          type: "text",
          placeholder: i(d)("motto.placeholder"),
          maxlength: "60",
          onBlur: l,
          onKeydown: x
        }, null, 40, Nc)), [
          [ho, o.value]
        ]) : (c(), p("p", {
          key: 1,
          id: "greeting",
          class: "hero-motto-text",
          style: xe({ color: i(Ie).greetColor }),
          onClick: f
        }, [
          n("span", Oc, u(g.value), 1),
          i(J).history.length > 1 ? (c(), p("span", {
            key: 0,
            class: "motto-scroll-hint",
            title: i(d)("motto.scrollHint")
          }, "⇕", 8, Bc)) : E("", !0)
        ], 4))
      ], 40, Rc),
      (c(), pe(wt, { to: "body" }, [
        i(J).menuOpen ? (c(), p("div", {
          key: 0,
          class: "motto-context-menu",
          style: xe({ left: `${i(J).menuPos.x}px`, top: `${i(J).menuPos.y}px` }),
          onClick: w[3] || (w[3] = z(() => {
          }, ["stop"])),
          onContextmenu: w[4] || (w[4] = z(() => {
          }, ["prevent"]))
        }, [
          n("div", Fc, [
            n("span", null, u(i(d)("motto.customTitle")), 1),
            n("small", Hc, u(i(d)("motto.recordsCount", { count: i(J).history.length })), 1)
          ]),
          n("button", {
            type: "button",
            class: "motto-menu-action",
            onClick: f
          }, [
            w[5] || (w[5] = n("i", null, "✎", -1)),
            n("span", null, u(i(d)("motto.editCurrent")), 1)
          ]),
          w[8] || (w[8] = n("div", { class: "motto-menu-divider" }, null, -1)),
          n("div", Kc, u(i(d)("motto.historyLabel")), 1),
          n("div", jc, [
            i(J).history.length ? (c(!0), p(Q, { key: 1 }, be(i(J).history, (T) => (c(), p("div", {
              key: T.id,
              class: de(["motto-history-item", { active: i(J).customText === T.text }]),
              onClick: (y) => i(ct).selectHistory(T)
            }, [
              n("span", Gc, u(T.date), 1),
              n("span", {
                class: "motto-item-text",
                title: r(T.text)
              }, u(r(T.text)), 9, Uc),
              n("button", {
                type: "button",
                class: "motto-item-del",
                title: i(d)("motto.deleteEntry"),
                onClick: z((y) => i(ct).deleteEntry(T.id), ["stop"])
              }, "×", 8, Yc)
            ], 10, Vc))), 128)) : (c(), p("div", zc, u(i(d)("motto.historyEmpty")), 1))
          ]),
          w[9] || (w[9] = n("div", { class: "motto-menu-divider" }, null, -1)),
          n("button", {
            type: "button",
            class: "motto-menu-action reset-btn",
            onClick: w[1] || (w[1] = //@ts-ignore
            (...T) => i(ct).resetToSystem && i(ct).resetToSystem(...T))
          }, [
            w[6] || (w[6] = n("i", null, "↻", -1)),
            n("span", null, u(i(d)("motto.resetGreeting")), 1)
          ]),
          i(J).history.length ? (c(), p("button", {
            key: 0,
            type: "button",
            class: "motto-menu-action danger-btn",
            onClick: w[2] || (w[2] = //@ts-ignore
            (...T) => i(ct).clearHistory && i(ct).clearHistory(...T))
          }, [
            w[7] || (w[7] = n("i", null, "🗑", -1)),
            n("span", null, u(i(d)("motto.clearAll")), 1)
          ])) : E("", !0)
        ], 36)) : E("", !0)
      ]))
    ], 64));
  }
}), qc = /* @__PURE__ */ Ne(Xc, [["__scopeId", "data-v-603c2e1e"]]), Jc = /* @__PURE__ */ fe({
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
    function o(l) {
      return l < 5 ? d("clock.greeting.lateNight") : l < 9 ? d("clock.greeting.morning") : l < 12 ? d("clock.greeting.forenoon") : l < 14 ? d("clock.greeting.noon") : l < 18 ? d("clock.greeting.afternoon") : l < 23 ? d("clock.greeting.evening") : d("clock.greeting.lateNight");
    }
    function s() {
      const l = Vt.state.timezone;
      if (!l || l === "local") return /* @__PURE__ */ new Date();
      try {
        const h = (/* @__PURE__ */ new Date()).toLocaleString("en-US", { timeZone: l });
        return new Date(h);
      } catch {
        return /* @__PURE__ */ new Date();
      }
    }
    function a() {
      const l = (U) => String(U).padStart(2, "0"), h = s(), x = h.getHours(), F = h.getMinutes(), m = h.getSeconds(), D = h.getFullYear(), v = h.getMonth() + 1, w = h.getDate(), T = h.getDay(), y = `${l(x)}:${l(F)}`, _ = `:${l(m)}`, L = o(x), B = d(t[T]), H = d("clock.datePattern", {
        year: D,
        month: v,
        day: w,
        week: B
      });
      ro.updateTime(y, _, L, H);
    }
    function r(l) {
      l.preventDefault(), Vt.open({ clientX: l.clientX, clientY: l.clientY });
    }
    function g() {
      document.hidden ? f && (clearInterval(f), f = null) : (a(), f || (f = setInterval(a, 1e3)));
    }
    let f = null;
    return Vt.initPreferences(), a(), Xe(() => {
      Vt.initPreferences(), Pe(mt, () => {
        a();
      }), Tt.activeId || (a(), f = setInterval(a, 1e3)), document.addEventListener("visibilitychange", g);
    }), Pe(
      () => Tt.activeId,
      (l) => {
        l ? f && (clearInterval(f), f = null) : document.hidden || (a(), f || (f = setInterval(a, 1e3)));
      }
    ), Nt(() => {
      f && (clearInterval(f), f = null), document.removeEventListener("visibilitychange", g);
    }), (l, h) => (c(), p("div", {
      class: "hero-clock-vue-container",
      onContextmenu: r
    }, [
      n("p", {
        id: "clock",
        class: "clock",
        style: xe({ fontFamily: i(Ie).fontFamily, color: i(Ie).colorHex })
      }, [
        ot(u(i(Ie).timeText), 1),
        n("span", {
          id: "secs",
          style: xe({ color: i(Ie).colorHex })
        }, u(i(Ie).secsText), 5)
      ], 4),
      n("p", {
        id: "date",
        class: "date",
        style: xe({ color: i(Ie).dateColor })
      }, u(i(Ie).dateText), 5)
    ], 32));
  }
}), vs = /* @__PURE__ */ Ne(Jc, [["__scopeId", "data-v-8ce2e6cf"]]), Zc = {
  key: 0,
  class: "home-music-degraded-box"
}, Qc = { class: "degraded-badge-row" }, ed = { class: "degraded-status" }, td = {
  key: 0,
  class: "degraded-host-tag"
}, od = {
  key: 1,
  class: "degraded-host-tag"
}, nd = { class: "degraded-title-row" }, id = ["title"], sd = { class: "degraded-track-artist" }, ad = { class: "degraded-progress-bar-wrap" }, rd = { class: "degraded-actions" }, ld = { class: "degraded-time" }, cd = { class: "home-vinyl-box" }, dd = ["title"], ud = ["src", "alt"], pd = { class: "home-music-right" }, hd = ["title"], fd = {
  id: "home-music-artist",
  class: "home-music-meta-artist"
}, gd = { class: "home-music-seek-row" }, md = {
  id: "home-music-cur",
  class: "home-music-time"
}, vd = ["value"], yd = {
  id: "home-music-dur",
  class: "home-music-time"
}, wd = { class: "home-music-actions" }, bd = ["title"], kd = ["title"], _d = ["title"], Cd = ["title"], xd = ["title"], Ld = /* @__PURE__ */ fe({
  __name: "HomeMusicCard",
  setup(e) {
    Xe(() => {
      setTimeout(() => {
        js();
      }, 200);
    });
    const t = te(() => Vi.visible || gt.djModalOpen || gt.isActive && gt.isJoined), o = te(() => gt.isActive && gt.isJoined), s = te(() => !oe.title || oe.title === "点击播放" ? d("home.music.defaultTitle") : oe.title), a = te(() => !oe.artist || oe.artist === "作者" ? d("home.music.defaultArtist") : oe.artist), r = te(() => oe.mode === "shuffle" ? "🔀" : oe.mode === "one" ? "🔂" : "🔁");
    function g(l) {
      const h = l.target, x = Number(h.value);
      et.seek(x);
    }
    function f() {
      et.update({ coverUrl: "" });
    }
    return (l, h) => (c(), p("div", {
      id: "home-music-player-view",
      class: de(["home-music-player-view", { "is-degraded": t.value }])
    }, [
      t.value ? (c(), p("div", Zc, [
        n("div", Qc, [
          h[7] || (h[7] = n("span", { class: "degraded-icon" }, "🎧", -1)),
          n("strong", ed, u(o.value ? i(d)("home.music.togetherListening") : i(d)("home.music.backgroundListening")), 1),
          o.value ? (c(), p("span", td, " DJ: " + u(i(gt).hostName), 1)) : (c(), p("span", od, u(i(d)("home.music.workspaceReady")), 1))
        ]),
        n("div", nd, [
          n("h3", {
            class: "degraded-track-title",
            title: s.value
          }, u(s.value || i(d)("home.music.standby")), 9, id),
          n("p", sd, u(a.value), 1)
        ]),
        n("div", ad, [
          n("div", {
            class: "degraded-progress-bar-fill",
            style: xe({ width: i(oe).progressPercent + "%" })
          }, null, 4)
        ]),
        n("div", rd, [
          n("button", {
            type: "button",
            class: "degraded-btn",
            onClick: h[0] || (h[0] = (x) => i(et).togglePlay())
          }, u(i(oe).playing ? i(d)("home.music.pause") : i(d)("home.music.play")), 1),
          n("span", ld, u(i(oe).formattedCurrent) + " / " + u(i(oe).formattedDuration), 1)
        ])
      ])) : (c(), p(Q, { key: 1 }, [
        n("div", cd, [
          n("div", {
            id: "home-vinyl-needle",
            class: de(["home-vinyl-needle", { playing: i(oe).playing }])
          }, [...h[8] || (h[8] = [
            Io('<svg viewBox="0 0 32 52" fill="none" data-v-6f1e9a8e><circle cx="26" cy="4" r="3.5" fill="#e2e8f0" stroke="#475569" stroke-width="1.5" data-v-6f1e9a8e></circle><circle cx="26" cy="4" r="1.5" fill="#64748b" data-v-6f1e9a8e></circle><path d="M26 4 L14 26 L11 44" stroke="#cbd5e1" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" data-v-6f1e9a8e></path><rect x="7" y="42" width="8" height="9" rx="1.5" fill="#f43f5e" transform="rotate(-15 11 46)" data-v-6f1e9a8e></rect></svg>', 1)
          ])], 2),
          n("div", {
            id: "home-vinyl-disc",
            class: de(["home-vinyl-disc", { playing: i(oe).playing }]),
            title: i(d)("home.music.togglePlay"),
            onClick: h[1] || (h[1] = (x) => i(et).togglePlay())
          }, [
            i(oe).coverUrl ? (c(), p("img", {
              key: 0,
              id: "home-vinyl-cover",
              class: "home-vinyl-cover",
              referrerpolicy: "no-referrer",
              src: i(oe).coverUrl,
              alt: i(d)("home.music.coverAlt"),
              onError: f
            }, null, 40, ud)) : E("", !0),
            h[9] || (h[9] = n("div", { class: "home-vinyl-hole" }, null, -1))
          ], 10, dd)
        ]),
        n("div", pd, [
          n("h3", {
            id: "home-music-title",
            class: "home-music-meta-title",
            title: s.value
          }, u(s.value), 9, hd),
          n("p", fd, u(a.value), 1),
          n("div", gd, [
            n("span", md, u(i(oe).formattedCurrent), 1),
            n("input", {
              id: "home-music-seek",
              class: "home-music-seek-bar",
              type: "range",
              min: "0",
              max: "100",
              value: i(oe).progressPercent,
              onInput: g
            }, null, 40, vd),
            n("span", yd, u(i(oe).formattedDuration), 1)
          ]),
          n("div", wd, [
            n("button", {
              id: "home-music-prev",
              class: "home-music-btn",
              type: "button",
              title: i(d)("home.music.prevTrack"),
              onClick: h[2] || (h[2] = (x) => i(et).prev())
            }, " ⏮ ", 8, bd),
            n("button", {
              id: "home-music-play",
              class: "home-music-btn play-btn",
              type: "button",
              title: i(d)("home.music.togglePlay"),
              onClick: h[3] || (h[3] = (x) => i(et).togglePlay())
            }, u(i(oe).playing ? "⏸" : "▶"), 9, kd),
            n("button", {
              id: "home-music-next",
              class: "home-music-btn",
              type: "button",
              title: i(d)("home.music.nextTrack"),
              onClick: h[4] || (h[4] = (x) => i(et).next())
            }, " ⏭ ", 8, _d),
            n("button", {
              id: "home-music-like",
              class: de(["home-music-btn like-btn", { liked: i(oe).liked }]),
              type: "button",
              title: i(d)("home.music.favorite"),
              onClick: h[5] || (h[5] = (x) => i(et).toggleLike())
            }, u(i(oe).liked ? "♥" : "♡"), 11, Cd),
            n("button", {
              id: "home-music-mode",
              class: "home-music-btn",
              type: "button",
              title: i(d)("home.music.playMode"),
              onClick: h[6] || (h[6] = (x) => i(et).cycleMode())
            }, u(r.value), 9, xd)
          ])
        ])
      ], 64))
    ], 2));
  }
}), ys = /* @__PURE__ */ Ne(Ld, [["__scopeId", "data-v-6f1e9a8e"]]), Lt = /* @__PURE__ */ new Map(), $t = /* @__PURE__ */ new Set();
function $d(e, t) {
  for (Lt.delete(e), Lt.set(e, t), $t.delete(t), $t.add(t); Lt.size > 512; )
    Lt.delete(Lt.keys().next().value);
  for (; $t.size > 512; )
    $t.delete($t.values().next().value);
}
const Sd = {
  key: 0,
  class: "launcher-fallback"
}, Td = ["src"], Fn = "lw_resolved_icon:", Id = /* @__PURE__ */ fe({
  __name: "LauncherFavicon",
  props: {
    link: {},
    mini: { type: Boolean, default: !1 }
  },
  setup(e) {
    function t(y) {
      try {
        return localStorage.getItem(Fn + y) || "";
      } catch {
        return "";
      }
    }
    function o(y, _) {
      try {
        localStorage.setItem(Fn + y, _);
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
    function g(y) {
      try {
        return new URL(y).origin;
      } catch {
        return "";
      }
    }
    function f(y) {
      try {
        const _ = window, L = typeof _.chrome < "u" ? _.chrome : globalThis.chrome;
        if (typeof L?.runtime?.getURL == "function")
          return L.runtime.getURL("_favicon/?pageUrl=" + encodeURIComponent(y) + "&size=64");
      } catch {
      }
      return "";
    }
    const l = te(() => {
      const y = a.link, _ = (y.title || r(y.url)).trim();
      return _ ? _.slice(0, 1).toUpperCase() : "🔗";
    }), h = V([]), x = V(0), F = V(!1), m = V(!1), D = te(() => m.value || x.value >= h.value.length ? "" : h.value[x.value] || "");
    function v() {
      const y = a.link;
      if (!y?.url) {
        h.value = [], m.value = !0, F.value = !1;
        return;
      }
      const _ = [], L = s(y.url);
      L && _.push(L);
      const B = Lt.get(y.url) || t(y.url);
      B && !_.includes(B) && _.push(B);
      const H = (R) => R ? /google\.com\/s2\/favicons|icons\.duckduckgo\.com|unavatar\.io|icon\.horse/i.test(R) : !1;
      y.customIcon && !H(y.customIcon) && _.push(y.customIcon), y.icon && !H(y.icon) && _.push(y.icon);
      const U = f(y.url);
      U && !_.includes(U) && _.push(U);
      const M = Ae.getCachedIcon(y.url);
      M && !_.includes(M) && _.push(M);
      const k = g(y.url);
      k && !k.startsWith("http://1.") && !k.startsWith("http://192.") && !k.startsWith("http://127.") && _.push(`${k}/favicon.ico`), y.customIcon && !H(y.customIcon) && _.unshift(y.customIcon);
      const $ = [...new Set(_.filter(Boolean))];
      h.value = $, x.value = 0, m.value = $.length === 0;
      const ee = $[0];
      ee && (ee.startsWith("data:") || $t.has(ee)) && (F.value = !0);
    }
    Pe(
      () => [a.link?.url, a.link?.icon, a.link?.customIcon],
      (y, _) => {
        _ && y[0] === _[0] && y[1] === _[1] && y[2] === _[2] || v();
      },
      { immediate: !0 }
    ), Xe(() => {
      h.value.length === 0 && v();
    });
    function w(y) {
      F.value = !0, m.value = !1;
      const _ = D.value;
      if (_) {
        const L = $t.has(_), B = Lt.get(a.link.url);
        $d(a.link.url, _), B !== _ && t(a.link.url) !== _ && o(a.link.url, _);
        const H = y.target;
        if (!L && !_.startsWith("data:")) {
          const U = a.link.url;
          setTimeout(() => {
            Ae.cacheIcon(U, _, H?.getAttribute("src") === _ ? H : null);
          }, 0);
        }
      }
    }
    function T() {
      const y = D.value;
      if (y) {
        $t.delete(y), Lt.get(a.link.url) === y && Lt.delete(a.link.url);
        try {
          localStorage.removeItem(Fn + a.link.url), localStorage.removeItem("lw_sync_dataurl:" + a.link.url);
        } catch {
        }
      }
      if (y && Ae.getCachedIcon(a.link.url) === y && Ae.evictCachedIcon(a.link.url), x.value + 1 < h.value.length) {
        x.value += 1;
        const _ = h.value[x.value];
        _ && (_.startsWith("data:") || $t.has(_)) && (F.value = !0);
      } else
        m.value = !0, F.value = !1;
    }
    return (y, _) => (c(), p("span", {
      class: de(e.mini ? "launcher-folder-mini" : "launcher-favicon")
    }, [
      m.value || !D.value ? (c(), p("span", Sd, u(l.value), 1)) : (c(), p("img", {
        key: 1,
        src: D.value,
        alt: "",
        draggable: "false",
        referrerpolicy: "no-referrer",
        decoding: "async",
        style: { "pointer-events": "none", "user-select": "none" },
        onLoad: w,
        onError: T
      }, null, 40, Td))
    ], 2));
  }
}), vn = /* @__PURE__ */ Ne(Id, [["__scopeId", "data-v-49e611bb"]]), Md = { class: "launcher-label launcher-title" }, Dd = ["title"], Ad = {
  key: 0,
  class: "launcher-folder-more"
}, Ed = {
  key: 1,
  class: "empty-folder",
  "aria-hidden": "true"
}, Pd = { class: "launcher-folder-label launcher-title" }, Wd = /* @__PURE__ */ fe({
  __name: "LauncherTileContent",
  props: {
    link: {},
    folder: {},
    size: { default: "small" }
  },
  setup(e) {
    const t = e, o = te(() => t.size === "large" ? 9 : 4), s = te(() => t.folder?.preview.slice(0, t.folder.count > o.value ? o.value - 1 : o.value) || []);
    return (a, r) => e.link ? (c(), p(Q, { key: 0 }, [
      Z(vn, { link: e.link }, null, 8, ["link"]),
      n("span", Md, u(e.link.title), 1)
    ], 64)) : e.folder ? (c(), p(Q, { key: 1 }, [
      n("div", {
        class: "launcher-folder-preview",
        title: `打开${e.folder.title}`
      }, [
        (c(!0), p(Q, null, be(s.value, (g) => (c(), pe(vn, {
          key: g.id,
          link: g,
          mini: !0
        }, null, 8, ["link"]))), 128)),
        e.folder.count > o.value ? (c(), p("span", Ad, "+" + u(e.folder.count - (o.value - 1)), 1)) : E("", !0),
        s.value.length ? E("", !0) : (c(), p("span", Ed, "📁")),
        un(a.$slots, "default", {}, void 0, !0)
      ], 8, Dd),
      n("span", Pd, u(e.folder.title), 1)
    ], 64)) : E("", !0);
  }
}), Ro = /* @__PURE__ */ Ne(Wd, [["__scopeId", "data-v-289b8350"]]), ws = 5, bs = 180;
function ks(e, t, o) {
  const s = t - e.left, a = o - e.top;
  return s > e.width * 0.25 && s < e.width * 0.75 && a > e.height * 0.25 && a < e.height * 0.75;
}
function _s(e, t, o) {
  return Math.hypot(t - (e.left + e.width / 2), o - (e.top + e.height / 2)) <= Math.max(e.width, e.height) * 0.55;
}
const Rd = {
  class: "launcher-group launcher-aihot launcher-todoist size-large",
  id: "launcher-todoist"
}, Nd = { class: "card-head aihot-home-head" }, Od = { class: "title" }, Bd = ["title"], Fd = ["title"], Hd = {
  class: "aihot-home-body",
  id: "aihot-home-body"
}, Kd = {
  key: 0,
  class: "muted small"
}, jd = {
  key: 1,
  class: "notice small"
}, zd = {
  key: 2,
  class: "muted small aihot-home-empty"
}, Vd = {
  key: 3,
  class: "aihot-home-rich-list"
}, Gd = ["href", "title", "onClick"], Ud = { class: "aihot-home-rich-main" }, Yd = { class: "aihot-home-rich-title" }, Xd = {
  key: 0,
  class: "aihot-home-rich-summary"
}, qd = { class: "aihot-home-rich-meta" }, Jd = { class: "aihot-home-rich-meta-left" }, Zd = {
  key: 0,
  class: "aihot-home-rich-tag"
}, Qd = { class: "aihot-home-rich-source" }, eu = { class: "aihot-home-rich-time" }, Wi = 6, tu = /* @__PURE__ */ fe({
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
    }, o = V([]), s = V(0), a = V(!0), r = V("");
    function g(y) {
      return mt.value === "en" && y.originalTitle ? y.originalTitle : y.title;
    }
    function f(y) {
      const _ = y.source?.name || y.sourceName || "AI HOT";
      return mt.value === "en" && _.includes("：") ? _.split("：")[0].trim() : _;
    }
    function l(y) {
      if (!y.category) return "";
      const _ = t[y.category];
      if (_)
        try {
          return d(_);
        } catch {
        }
      return y.category;
    }
    const h = te(() => mt.value !== "en" ? o.value : [...o.value].sort((y, _) => {
      const L = !!(y.originalTitle && /[a-zA-Z]{3,}/.test(y.originalTitle)), B = !!(_.originalTitle && /[a-zA-Z]{3,}/.test(_.originalTitle));
      return L && !B ? -1 : !L && B ? 1 : 0;
    }));
    function x(y) {
      const _ = y.publishedAt || y.published || "";
      if (!_) return mt.value === "en" ? "Latest" : "最新";
      const L = Number(_), B = Number.isFinite(L) && L > 0 ? new Date(L > 1e12 ? L : L * 1e3) : new Date(_);
      if (isNaN(B.getTime())) return String(_).slice(0, 16) || (mt.value === "en" ? "Latest" : "最新");
      const H = (R) => String(R).padStart(2, "0"), U = B.getFullYear(), M = H(B.getMonth() + 1), k = H(B.getDate()), $ = H(B.getHours()), ee = H(B.getMinutes());
      return `${U}-${M}-${k} ${$}:${ee}`;
    }
    const F = [
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
    function m() {
      const _ = (typeof window < "u" ? window : null)?.LogicWeaverAihotFeed?.getState?.()?.feedArticles;
      if (Array.isArray(_) && _.length)
        return _;
      const L = [
        "newtab_aihot_items_v2",
        "lw-aihot-cached-feed-all-24h-v1",
        "lw-aihot-cached-feed-v1"
      ];
      for (const B of L)
        try {
          const H = localStorage.getItem(B);
          if (H) {
            const U = JSON.parse(H);
            if (Array.isArray(U) && U.length) return U;
            if (U && Array.isArray(U.items) && U.items.length) return U.items;
          }
        } catch {
        }
      return [];
    }
    async function D(y = !1) {
      if (!y && o.value.length > 0) return;
      const _ = m();
      _.length ? (o.value = _, a.value = !1) : o.value.length || (o.value = [...F], a.value = !1);
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
        o.value.length || (o.value = [...F]);
      } finally {
        a.value = !1;
      }
    }
    function v() {
      if (!h.value.length) {
        a.value = !0, D(!0);
        return;
      }
      s.value += Wi, s.value >= h.value.length && (s.value = 0);
    }
    function w() {
      const y = window;
      if (typeof y.enterFullscreenCard == "function") {
        y.enterFullscreenCard("daily-aihot");
        return;
      }
      const _ = document.querySelector("#daily-aihot, [data-dock-id='daily-aihot']");
      _ ? _.scrollIntoView({ behavior: "smooth", block: "start" }) : window.open("https://aihot.virxact.com", "_blank", "noreferrer");
    }
    function T(y, _) {
      if (_.ctrlKey || _.metaKey || _.shiftKey || _.button === 1) return;
      _.preventDefault();
      const L = y.links?.original || y.links?.aihot || y.url || "#";
      ci.openArticle(
        {
          id: y.id,
          title: g(y),
          summary: y.summary,
          sourceName: f(y),
          published: x(y),
          url: L
        },
        ""
      );
    }
    return Xe(() => {
      D();
    }), (y, _) => (c(), p("section", Rd, [
      n("header", Nd, [
        _[0] || (_[0] = n("span", { class: "bar cyan" }, null, -1)),
        n("strong", Od, u(i(d)("aihot.card.title")), 1),
        _[1] || (_[1] = n("span", { class: "grow" }, null, -1)),
        n("button", {
          class: "aihot-home-btn",
          type: "button",
          title: i(d)("aihot.card.refreshBtnTip"),
          onClick: v
        }, u(i(d)("aihot.card.refreshBtn")), 9, Bd),
        n("button", {
          class: "aihot-home-btn aihot-home-more-btn",
          type: "button",
          title: i(d)("aihot.card.hotlistBtnTip"),
          onClick: w
        }, u(i(d)("aihot.card.hotlistBtn")), 9, Fd)
      ]),
      n("div", Hd, [
        a.value && !h.value.length ? (c(), p("p", Kd, u(i(d)("aihot.card.loading")), 1)) : r.value && !h.value.length ? (c(), p("p", jd, u(r.value), 1)) : h.value.length ? (c(), p("div", Vd, [
          (c(!0), p(Q, null, be(h.value.slice(s.value, s.value + Wi), (L, B) => (c(), p("a", {
            key: L.id || L.title,
            class: "aihot-home-rich-card",
            href: L.links?.original || L.links?.aihot || L.url || "#",
            target: "_blank",
            rel: "noreferrer",
            title: `${g(L)}
${L.summary || ""}
${i(d)("aihot.card.viewInReader")}`,
            onClick: (H) => T(L, H)
          }, [
            n("span", {
              class: de(["aihot-home-rich-rank", { top: s.value + B < 3 }])
            }, u(s.value + B + 1), 3),
            n("div", Ud, [
              n("h3", Yd, u(g(L)), 1),
              L.summary ? (c(), p("p", Xd, u(L.summary), 1)) : E("", !0),
              n("div", qd, [
                n("div", Jd, [
                  l(L) ? (c(), p("span", Zd, u(l(L)), 1)) : E("", !0),
                  n("span", Qd, u(f(L)), 1)
                ]),
                n("time", eu, u(x(L)), 1)
              ])
            ])
          ], 8, Gd))), 128))
        ])) : (c(), p("p", zd, u(i(d)("aihot.card.empty")), 1))
      ])
    ]));
  }
}), ou = /* @__PURE__ */ Ne(tu, [["__scopeId", "data-v-01e71b65"]]), nu = ["aria-label"], iu = ["disabled", "aria-pressed"], su = ["disabled", "aria-pressed"], au = ["aria-label"], ru = ["data-page", "title", "onClick", "onContextmenu", "onDragover", "onDrop"], lu = {
  key: 0,
  id: "bookmark-board-header",
  class: "launcher-page-tabs"
}, cu = ["data-page"], du = ["href", "title", "data-launcher-id", "onPointerdown", "onClick", "onContextmenu"], uu = ["title", "data-launcher-folder", "onPointerdown", "onDragstart", "onDrop", "onClick", "onContextmenu"], pu = ["title", "onClick"], hu = {
  class: "launcher-folder-count",
  hidden: ""
}, fu = {
  class: "launcher-empty",
  key: "empty-msg"
}, gu = {
  key: 1,
  class: "launcher-media-stack"
}, mu = {
  key: 1,
  id: "launcher-bili"
}, vu = { class: "launcher-folder-preview" }, yu = { class: "launcher-folder-label launcher-title" }, wu = { class: "launcher-label launcher-title" }, bu = /* @__PURE__ */ fe({
  __name: "FavoriteSites",
  setup(e) {
    const t = X(() => import("./BookmarkBoard-CjilKNtv.js")), o = X(() => import("./LauncherBookGuideDialog-C1G_ik3R.js")), s = te({
      get: () => ue.sitesView || "sites",
      set: (b) => Fe.setSitesView(b)
    }), a = V(!1), r = V(!1);
    function g() {
      r.value = !0;
    }
    function f() {
      r.value = !1;
    }
    function l() {
      we(), w = !1, me = !1;
    }
    Xe(() => {
      Fe.setExternalDragHandler(M), Fe.setExternalDropHandler(k), window.addEventListener("blur", l), window.addEventListener("pagehide", l), document.addEventListener("visibilitychange", l);
      const b = window;
      ue.hasBili && typeof b.ensureLauncherMediaCards == "function" && b.ensureLauncherMediaCards();
    });
    const h = V(!1), x = V(""), F = V(null), m = V(null), D = V(null), v = V(null);
    let w = !1, T = 0, y = 0, _ = 0, L = "", B = 0, H = "", U = 0;
    function M(b) {
      if (s.value !== "sites") return;
      if (!b || _t.isOpen) {
        v.value && (v.value = null), H = "";
        return;
      }
      const C = document.elementsFromPoint(b.clientX, b.clientY);
      if (!C.some(
        (Ge) => Ge.classList.contains("launcher-site-items") || !!Ge.closest?.(".launcher-site-items")
      )) {
        v.value && (v.value = null), H = "";
        return;
      }
      const P = C.find((Ge) => Ge.classList.contains("launcher-link") && Ge.getAttribute("data-launcher-id") !== String(b.link.id) || Ge.classList.contains("launcher-folder"));
      if (!P) return;
      const se = P.classList.contains("launcher-link"), _e = se ? P.getAttribute("data-launcher-id") : null, je = se ? null : P.getAttribute("data-launcher-folder"), re = se ? `link-${_e}` : `folder-${je}`, le = P.getBoundingClientRect(), Je = le.left + le.width / 2, Cn = le.top + le.height / 2, bo = Math.hypot(b.clientX - Je, b.clientY - Cn), Xt = Date.now();
      if (bo > Math.max(le.width, le.height) * 0.55 || re === H && Xt - U < 180) return;
      const qt = Ut.value.filter(
        (Ge) => Ge.type !== "link" || String(Ge.link.id) !== String(b.link.id)
      ), vt = [...v.value || qt], Mt = vt.findIndex(
        (Ge) => Ge.type === "link" && String(Ge.link.id) === String(b.link.id)
      ), Dt = vt.findIndex((Ge) => Ge.key === re);
      if (Dt < 0) return;
      const at = {
        key: `link-${b.link.id}`,
        type: "link",
        link: b.link
      };
      Mt >= 0 ? Mt !== Dt && (vt.splice(Mt, 1), vt.splice(Dt, 0, at), v.value = vt, H = re, U = Xt) : (vt.splice(Dt, 0, at), v.value = vt, H = re, U = Xt);
    }
    async function k(b) {
      if (s.value !== "sites" || _t.isOpen) return !1;
      if (v.value) {
        const C = v.value.map((S) => ({
          type: S.type,
          id: S.type === "link" ? String(S.link.id) : void 0,
          groupName: S.type === "folder" ? S.folder.groupName : void 0
        }));
        return await Ae.moveLinkTo(String(b.id), ue.activePage, "常用网站"), await Ae.reorderPageItems(ue.activePage, C), v.value = null, H = "", !0;
      }
      return !1;
    }
    const $ = $e({
      visible: !1,
      x: 0,
      y: 0,
      type: "link",
      link: null,
      folder: null,
      offsetX: 34,
      offsetY: 38
    });
    let ee = null, R = 0, G = 0, N = null, Y = null, me = !1;
    function Ce(b, C) {
      if (C.button !== 0) return;
      ee = C.pointerId, R = C.clientX, G = C.clientY, y = C.clientX, _ = C.clientY, N = String(b.id), Y = null, me = !1;
      const S = C.currentTarget.getBoundingClientRect();
      $.offsetX = C.clientX - S.left, $.offsetY = C.clientY - S.top, $.type = "link", $.link = b, $.folder = null, window.addEventListener("pointermove", ve, { passive: !1 }), window.addEventListener("pointerup", Se), window.addEventListener("pointercancel", Se);
    }
    function qe(b, C, S) {
      if (S.button !== 0 || S.target.closest(".launcher-folder-del-btn")) return;
      ee = S.pointerId, R = S.clientX, G = S.clientY, y = S.clientX, _ = S.clientY, N = null, Y = b, me = !1;
      const P = S.currentTarget.getBoundingClientRect();
      $.offsetX = S.clientX - P.left, $.offsetY = S.clientY - P.top, $.type = "folder", $.folder = {
        groupName: b,
        size: Oe(b),
        links: C?.links || []
      }, $.link = null, window.addEventListener("pointermove", ve, { passive: !1 }), window.addEventListener("pointerup", Se), window.addEventListener("pointercancel", Se);
    }
    let A = 0, W = null;
    function j() {
      cancelAnimationFrame(A), A = 0, W = null;
    }
    function ve(b) {
      b.pointerId === ee && (me && b.cancelable && b.preventDefault(), W = b, !A && (A = requestAnimationFrame(() => {
        A = 0;
        const C = W;
        W = null, C && ke(C);
      })));
    }
    function ke(b) {
      if (b.pointerId !== ee || !N && !Y) return;
      const C = Math.hypot(b.clientX - R, b.clientY - G);
      if (!me && C > ws && (me = !0, w = !0, N ? m.value = N : Y && (D.value = Y)), !me) return;
      ($.link || $.folder) && ($.visible = !0, $.x = b.clientX - $.offsetX, $.y = b.clientY - $.offsetY);
      const S = document.elementsFromPoint(b.clientX, b.clientY);
      if (fi()) {
        const re = S.some(
          (Je) => Je.id === "launcher-folder-dialog" || !!Je.closest?.("#launcher-folder-dialog")
        ), le = document.querySelector("#launcher-folder-dialog");
        if (re && le) {
          le.classList.add("drop-hover-valid"), _t.dropHoverValid = !0;
          return;
        } else
          le?.classList.remove("drop-hover-valid"), _t.dropHoverValid = !1;
        v.value = null;
        return;
      }
      const se = v.value || Ut.value, _e = N ? `link-${N}` : `folder-${Y}`;
      if (se.length) {
        const re = S.find((le) => {
          if (le.classList.contains("launcher-link")) {
            const Je = le.getAttribute("data-launcher-id");
            return Je && `link-${Je}` !== _e;
          }
          if (le.classList.contains("launcher-folder")) {
            const Je = le.getAttribute("data-launcher-folder");
            return Je && `folder-${Je}` !== _e;
          }
          return !1;
        });
        if (re) {
          const le = re.classList.contains("launcher-link"), Je = le ? re.getAttribute("data-launcher-id") : null, Cn = le ? null : re.getAttribute("data-launcher-folder"), bo = le ? `link-${Je}` : `folder-${Cn}`, Xt = re.getBoundingClientRect();
          let qt = !0;
          N && !le && (ks(Xt, b.clientX, b.clientY) ? (qt = !1, re.classList.add("drop-target")) : re.classList.remove("drop-target"));
          const vt = Date.now();
          if (_s(Xt, b.clientX, b.clientY) || (qt = !1), bo === L && vt - B < bs && (qt = !1), qt) {
            document.querySelectorAll(".launcher-folder.drop-target").forEach((at) => at.classList.remove("drop-target"));
            const Mt = se.findIndex((at) => at.key === _e), Dt = se.findIndex((at) => at.key === bo);
            if (Mt >= 0 && Dt >= 0 && Mt !== Dt) {
              const at = se.slice(), Ge = at.splice(Mt, 1)[0];
              at.splice(Dt, 0, Ge), v.value = at, L = bo, B = vt;
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
    async function Se(b) {
      if (b.pointerId === ee) {
        j(), b.type === "pointercancel" ? we() : ke(b), window.removeEventListener("pointermove", ve), window.removeEventListener("pointerup", Se), window.removeEventListener("pointercancel", Se);
        try {
          if (me) {
            T = Date.now(), w = !1;
            const C = document.elementsFromPoint(b.clientX, b.clientY);
            if (document.querySelectorAll(".launcher-page-tab.drop-target").forEach((P) => P.classList.remove("drop-target")), document.querySelectorAll(".launcher-folder.drop-target").forEach((P) => P.classList.remove("drop-target")), fi() && _t.activeFolder) {
              if (C.some(
                (se) => se.id === "launcher-folder-dialog" || !!se.closest?.("#launcher-folder-dialog")
              )) {
                const _e = C.find((je) => je.hasAttribute("data-child-folder"))?.getAttribute("data-child-folder") || _t.activeFolder;
                N ? await Ae.moveLinkTo(N, void 0, _e) : Y && await Ae.moveFolderInto(Y, _e);
              }
              return;
            }
            const S = C.find((P) => P.classList.contains("launcher-page-tab"));
            if (S) {
              const P = S.getAttribute("data-page");
              if (P) {
                N ? (await Ae.moveLinkTo(N, P, "常用网站"), await Ae.setPage(P)) : Y && await Ae.moveFolderToPage(Y, P), we();
                return;
              }
            }
            if (N) {
              const P = C.find((se) => se.classList.contains("launcher-folder"));
              if (P) {
                const se = P.getAttribute("data-launcher-folder");
                if (se) {
                  await Ae.moveLinkTo(N, ue.activePage, se), we();
                  return;
                }
              }
            }
            if (v.value) {
              const P = v.value.map((se) => ({
                type: se.type,
                id: se.type === "link" ? String(se.link.id) : void 0,
                groupName: se.type === "folder" ? se.folder.groupName : void 0
              }));
              await Ae.reorderPageItems(ue.activePage, P);
            }
          }
        } catch (C) {
          Le.show({ appName: "常用网站", title: "移动未完成", message: C instanceof Error ? C.message : "请刷新核对，未自动重试。" });
        } finally {
          we();
        }
      }
    }
    function we() {
      j(), ee = null, N = null, Y = null, me = !1, w = !1, m.value = null, D.value = null, v.value = null, $.visible = !1, $.link = null, $.folder = null, L = "", document.querySelector("#launcher-folder-dialog")?.classList.remove("drop-hover-valid"), _t.dropHoverValid = !1, window.removeEventListener("pointermove", ve), window.removeEventListener("pointerup", Se), window.removeEventListener("pointercancel", Se);
    }
    Nt(() => {
      Fe.setExternalDragHandler(null), Fe.setExternalDropHandler(null), we(), window.removeEventListener("blur", l), window.removeEventListener("pagehide", l), document.removeEventListener("visibilitychange", l), window.removeEventListener("pointermove", ve), window.removeEventListener("pointerup", Se), window.removeEventListener("pointercancel", Se);
    });
    function We(b) {
      const C = ue.pageLabels;
      return C && C[b] ? C[b] : b || "常用网站";
    }
    function Qe(b, C) {
      const S = String(b.page || "").trim(), P = String(C).trim(), se = ue.pageLabels || {}, _e = !S || S === "常用网站" || S === "默认";
      if (!P || P === "常用网站" || P === "默认") return _e;
      if (_e) return !1;
      if (S === P) return !0;
      const re = se[S] || S, le = se[P] || P;
      return re === le || S === le || re === P;
    }
    function Oe(b) {
      const C = ue.groupSizes;
      return C && C[b] === "large" ? "large" : "small";
    }
    function It(b) {
      return b === "large" ? 9 : 4;
    }
    function Ot(b, C) {
      const S = It(C), P = b.length > S ? S - 1 : S;
      return b.slice(0, P);
    }
    const Ut = te(() => {
      const b = ue.activePage || "常用网站", S = ue.links.filter(
        (re) => Qe(re, b)
      ), P = /* @__PURE__ */ new Map();
      S.forEach((re) => {
        const le = re.group || "常用网站";
        le !== "常用网站" && (P.has(le) || P.set(le, []), P.get(le).push(re));
      });
      const se = /* @__PURE__ */ new Set(), _e = [];
      S.forEach((re) => {
        const le = re.group || "常用网站";
        vi(ue.folders, le) || (le === "常用网站" ? _e.push({ key: `link-${re.id}`, type: "link", link: re }) : se.has(le) || (se.add(le), _e.push({
          key: `folder-${le}`,
          type: "folder",
          folder: {
            groupName: le,
            pageName: b,
            links: P.get(le) || []
          }
        })));
      });
      const je = ue.folders;
      return je && Object.entries(je).forEach(([re, le]) => {
        if (vi(ue.folders, re)) return;
        const Je = le?.page || "常用网站";
        (Je === b || b === "常用网站" && Je === "默认") && !se.has(re) && (se.add(re), _e.push({
          key: `folder-${re}`,
          type: "folder",
          folder: {
            groupName: re,
            pageName: b,
            links: P.get(re) || []
          }
        }));
      }), _e;
    }), yo = te(() => v.value && v.value.length ? v.value : Ut.value), nt = te(() => {
      const b = ue.activePage || "常用网站", C = We(b);
      return C === "默认" || b === "常用网站" ? "还没有快捷入口，点击“编辑入口”后添加。" : `“${C}”还是空的，把网站拖到这里。`;
    });
    function Ho(b) {
      v.value = null, m.value = null, D.value = null, Fe.switchPage(b);
    }
    function Ko() {
      h.value = !0, x.value = "", St(() => {
        F.value?.focus();
      });
    }
    function wo() {
      if (!h.value) return;
      const b = x.value.trim();
      h.value = !1, b && Fe.addPage(b);
    }
    function jo(b) {
      b.key === "Enter" ? (b.preventDefault(), wo()) : b.key === "Escape" && (h.value = !1);
    }
    function Yt(b, C) {
      Fe.openPageMenu(b, C);
    }
    function zo(b) {
      const C = b.target;
      if (!C || C.closest(".launcher-link") || C.closest(".launcher-folder") || C.closest(".launcher-page-tab") || C.closest("button") || C.closest("input"))
        return;
      b.preventDefault();
      const S = ue.activePage || "常用网站";
      ri.openBlankMenu(S, b.clientX, b.clientY);
    }
    function I(b) {
      s.value === "sites" && (!b.shiftKey || ue.pages.length < 2 || (b.preventDefault(), b.deltaY > 0 || b.deltaX > 0 ? Fe.nextPage() : Fe.prevPage()));
    }
    function O(b) {
      b.target.closest(".launcher-page-tab") || b.stopPropagation();
    }
    function K(b) {
      b.button === 0 && (y = b.clientX, _ = b.clientY);
    }
    function he(b, C) {
      if (C.preventDefault(), C.stopPropagation(), Ye.isEditingShortcuts) {
        Ye.handleLinkSelection(b);
        return;
      }
      ee || (w = !1), !(Math.hypot(C.clientX - y, C.clientY - _) >= 6 || w || Date.now() - T < 600) && Fe.openLink(b, C);
    }
    function ft(b, C) {
      Fe.openLinkMenu(b, C);
    }
    function bt(b, C) {
      if (ee || (w = !1), w || Date.now() - T < 450) {
        C.preventDefault(), C.stopPropagation();
        return;
      }
      Fe.openFolder(b, C);
    }
    function Bt(b, C, S) {
      Fe.openFolderMenu(b, C, S);
    }
    function $s(b) {
      Fe.deleteFolder(b);
    }
    function Ss(b, C) {
      const S = Array.from(C.dataTransfer?.types || []);
      if (!S.includes("application/x-newtab-launcher") && !S.includes("application/x-newtab-bookmark") && !S.includes("text/uri-list") && !S.includes("text/plain")) return;
      C.preventDefault(), C.dataTransfer && (C.dataTransfer.dropEffect = "move"), ue.activePage !== b && Ho(b), C.currentTarget?.classList.add("drop-target");
    }
    function Ts(b) {
      b.currentTarget?.classList.remove("drop-target");
    }
    async function Is(b, C) {
      C.currentTarget?.classList.remove("drop-target");
      let P = "";
      const se = C.dataTransfer?.getData("application/x-newtab-launcher");
      if (se)
        try {
          P = String(JSON.parse(se)?.id || "");
        } catch {
        }
      if (!P && (m.value || window.__activeLauncherLink) && (P = String(window.__activeLauncherLink?.id || m.value || "")), P) {
        C.preventDefault(), C.stopPropagation(), await Ae.moveLinkTo(P, b, "常用网站"), await Ae.setPage(b);
        return;
      }
      const _e = window;
      typeof _e.importDroppedLauncherItem == "function" && (C.preventDefault(), C.stopPropagation(), await _e.importDroppedLauncherItem(C, "常用网站", b));
    }
    function Ms(b) {
      const C = Array.from(b.dataTransfer?.types || []);
      if (!C.includes("application/x-newtab-launcher") && !C.includes("application/x-newtab-bookmark") && !C.includes("text/uri-list") && !C.includes("text/plain")) return;
      b.preventDefault(), b.dataTransfer && (b.dataTransfer.dropEffect = C.includes("application/x-newtab-launcher") ? "move" : "copy"), b.currentTarget?.classList.add("drop-target");
    }
    function Ds(b) {
      const C = b.currentTarget;
      C?.contains(b.relatedTarget) || C?.classList.remove("drop-target");
    }
    async function As(b) {
      b.currentTarget?.classList.remove("drop-target");
      let S = "";
      const P = b.dataTransfer?.getData("application/x-newtab-launcher");
      if (P)
        try {
          S = String(JSON.parse(P)?.id || "");
        } catch {
        }
      if (!S && (m.value || window.__activeLauncherLink) && (S = String(window.__activeLauncherLink?.id || m.value || "")), S) {
        b.preventDefault(), b.stopPropagation(), await Ae.moveLinkTo(S, ue.activePage, "常用网站");
        return;
      }
      const se = window;
      if (typeof se.importDroppedLauncherItem == "function") {
        b.preventDefault(), b.stopPropagation(), await se.importDroppedLauncherItem(b, "常用网站", ue.activePage);
        return;
      }
      const _e = b.dataTransfer?.getData("text/plain");
      _e && /^https?:\/\//i.test(_e.trim()) && (b.preventDefault(), b.stopPropagation(), await Ae.addLink({
        title: "",
        url: _e.trim(),
        page: ue.activePage
      }));
    }
    function fi() {
      if (!_t.isOpen) return !1;
      if (typeof document < "u") {
        const b = document.querySelector("#launcher-folder-dialog");
        return !!(b && b.open);
      }
      return !1;
    }
    function Es(b, C) {
      C.preventDefault();
    }
    function Ps(b) {
      b.preventDefault(), b.dataTransfer && (b.dataTransfer.dropEffect = "move"), b.currentTarget?.classList.add("drop-target");
    }
    function Ws(b) {
      b.currentTarget?.classList.remove("drop-target");
    }
    async function Rs(b, C) {
      C.currentTarget?.classList.remove("drop-target"), C.preventDefault(), C.stopPropagation();
      const P = C.dataTransfer?.getData("application/x-newtab-launcher-folder");
      if (P && P !== b) {
        try {
          await Ae.moveFolderInto(P, b);
        } catch (je) {
          Le.show({ appName: "常用网站", title: "移动未完成", message: je instanceof Error ? je.message : "请刷新后核对。" });
        }
        return;
      }
      let se = "";
      const _e = C.dataTransfer?.getData("application/x-newtab-launcher");
      if (_e)
        try {
          se = String(JSON.parse(_e)?.id || "");
        } catch {
        }
      !se && (m.value || window.__activeLauncherLink) && (se = String(window.__activeLauncherLink?.id || m.value || "")), se && await Ae.moveLinkTo(se, ue.activePage, b);
    }
    return (b, C) => (c(), p(Q, null, [
      i(ue).showSites ? (c(), p("section", {
        key: 0,
        class: "launcher-group launcher-sites size-large",
        onWheel: I
      }, [
        n("header", {
          class: "launcher-group-head launcher-sites-head",
          onPointerdown: C[5] || (C[5] = z(() => {
          }, ["stop"])),
          onContextmenu: O
        }, [
          n("div", {
            class: "sites-view-switch",
            role: "group",
            "aria-label": i(d)("home.sites.switchAria")
          }, [
            n("button", {
              type: "button",
              disabled: a.value,
              "aria-pressed": s.value === "sites",
              onClick: C[0] || (C[0] = (S) => s.value = "sites")
            }, u(i(d)("home.sites.favoriteSites")), 9, iu),
            n("button", {
              type: "button",
              disabled: a.value,
              "aria-pressed": s.value === "bookmarks",
              onClick: C[1] || (C[1] = (S) => s.value = "bookmarks")
            }, u(i(d)("home.sites.bookmarks")), 9, su)
          ], 8, nu),
          tt(n("div", {
            class: "launcher-page-tabs",
            role: "tablist",
            "aria-label": i(d)("home.sites.pagesAria")
          }, [
            (c(!0), p(Q, null, be(i(ue).pages, (S) => (c(), p("button", {
              key: S,
              type: "button",
              class: de(["launcher-page-tab", { active: S === i(ue).activePage }]),
              "data-page": S,
              role: "tab",
              title: i(d)("home.sites.pageTabTitle", { label: We(S) }),
              onPointerdown: C[2] || (C[2] = z(() => {
              }, ["stop"])),
              onClick: z((P) => Ho(S), ["prevent", "stop"]),
              onContextmenu: z((P) => Yt(S, P), ["prevent", "stop"]),
              onDragover: (P) => Ss(S, P),
              onDragleave: C[3] || (C[3] = (P) => Ts(P)),
              onDrop: (P) => Is(S, P)
            }, u(We(S)), 43, ru))), 128)),
            h.value ? tt((c(), p("input", {
              key: 1,
              ref_key: "pageInputRef",
              ref: F,
              class: "launcher-page-input",
              maxlength: "12",
              placeholder: "例如：游戏区",
              "onUpdate:modelValue": C[4] || (C[4] = (S) => x.value = S),
              onKeydown: jo,
              onBlur: wo
            }, null, 544)), [
              [ho, x.value]
            ]) : (c(), p("button", {
              key: 0,
              class: "launcher-page-add",
              type: "button",
              title: "添加网站分区，例如游戏区",
              "aria-label": "添加网站分区",
              onClick: Ko
            }, " + "))
          ], 8, au), [
            [fo, s.value === "sites"]
          ]),
          s.value === "bookmarks" ? (c(), p("div", lu)) : E("", !0),
          n("button", {
            class: "launcher-page-help",
            type: "button",
            title: "使用指南：如何创建文件夹与整理网站",
            "aria-label": "使用指南与技巧",
            onClick: g
          }, " ? ")
        ], 32),
        s.value === "bookmarks" ? (c(), pe(i(t), {
          key: 0,
          "header-target": "#bookmark-board-header",
          onBusy: C[6] || (C[6] = (S) => a.value = S)
        })) : E("", !0),
        tt(n("div", {
          class: "launcher-page-panel",
          "data-page": i(ue).activePage,
          hidden: !1,
          role: "tabpanel",
          onContextmenu: zo,
          onDragover: C[12] || (C[12] = (S) => Ms(S)),
          onDragleave: C[13] || (C[13] = (S) => Ds(S)),
          onDrop: C[14] || (C[14] = (S) => As(S))
        }, [
          (c(), pe(Oo, {
            tag: "div",
            class: "launcher-items launcher-site-items",
            key: i(ue).activePage,
            name: m.value || D.value ? "launcher-grid" : ""
          }, {
            default: Et(() => [
              (c(!0), p(Q, null, be(yo.value, (S) => (c(), p(Q, {
                key: S.key
              }, [
                S.type === "link" ? (c(), p("a", {
                  key: S.key,
                  class: de(["launcher-link", {
                    "is-dragging": m.value === String(S.link.id),
                    "is-wheel-picked": i(Ye).isEditingShortcuts && i(Ye).isLinkInWheel(S.link.url)
                  }]),
                  href: S.link.url,
                  title: S.link.title + (S.link.note ? `
📝 ` + S.link.note : "") + `
🔗 ` + S.link.url,
                  "data-launcher-id": String(S.link.id),
                  target: "_blank",
                  rel: "noreferrer",
                  draggable: "false",
                  onDragstart: C[7] || (C[7] = z(() => {
                  }, ["prevent"])),
                  onPointerdown: (P) => Ce(S.link, P),
                  onMousedown: C[8] || (C[8] = (P) => K(P)),
                  onClick: z((P) => he(S.link, P), ["prevent"]),
                  onContextmenu: z((P) => ft(S.link, P), ["prevent"])
                }, [
                  Z(Ro, {
                    link: S.link
                  }, null, 8, ["link"])
                ], 42, du)) : S.type === "folder" ? (c(), p("div", {
                  key: S.key,
                  class: de(["launcher-folder", [
                    `size-${Oe(S.folder.groupName)}`,
                    { "is-dragging": D.value === S.folder.groupName }
                  ]]),
                  title: `${S.folder.groupName}
可拖动调整位置；右键调整收藏夹大小`,
                  role: "button",
                  tabindex: "0",
                  "data-launcher-folder": String(S.folder.groupName),
                  draggable: "true",
                  onPointerdown: (P) => qe(S.folder.groupName, S.folder, P),
                  onDragstart: (P) => Es(S.folder.groupName, P),
                  onDragover: C[10] || (C[10] = (P) => Ps(P)),
                  onDragleave: C[11] || (C[11] = (P) => Ws(P)),
                  onDrop: (P) => Rs(S.folder.groupName, P),
                  onClick: (P) => bt(S.folder.groupName, P),
                  onContextmenu: z((P) => Bt(S.folder.groupName, S.folder.pageName, P), ["prevent"])
                }, [
                  Z(Ro, {
                    folder: { title: S.folder.groupName, preview: S.folder.links, count: S.folder.links.length },
                    size: Oe(S.folder.groupName)
                  }, {
                    default: Et(() => [
                      n("button", {
                        class: "launcher-folder-del-btn",
                        type: "button",
                        title: `删除文件夹「${S.folder.groupName}」`,
                        "aria-label": "删除文件夹",
                        onPointerdown: C[9] || (C[9] = z(() => {
                        }, ["stop"])),
                        onClick: z((P) => $s(S.folder.groupName), ["stop", "prevent"])
                      }, " ✕ ", 40, pu)
                    ]),
                    _: 2
                  }, 1032, ["folder", "size"]),
                  n("span", hu, u(S.folder.links.length), 1)
                ], 42, uu)) : E("", !0)
              ], 64))), 128)),
              yo.value.length ? E("", !0) : (c(), p("p", fu, u(nt.value), 1))
            ]),
            _: 1
          }, 8, ["name"]))
        ], 40, cu), [
          [fo, s.value === "sites"]
        ])
      ], 32)) : E("", !0),
      i(ue).hasTodo || i(ue).hasBili ? (c(), p("div", gu, [
        i(ue).hasTodo ? (c(), pe(ou, { key: 0 })) : i(ue).hasBili ? (c(), p("div", mu)) : E("", !0)
      ])) : E("", !0),
      (c(), pe(wt, { to: "body" }, [
        $.visible ? (c(), p("div", {
          key: 0,
          class: de(["launcher-drag-ghost", [
            $.type === "folder" ? `folder-ghost size-${$.folder?.size}` : "link-ghost"
          ]]),
          style: xe({
            left: `${$.x}px`,
            top: `${$.y}px`
          })
        }, [
          $.type === "folder" && $.folder ? (c(), p(Q, { key: 0 }, [
            n("div", vu, [
              (c(!0), p(Q, null, be(Ot($.folder.links, $.folder.size), (S, P) => (c(), pe(vn, {
                key: S.id || P,
                link: S,
                mini: !0
              }, null, 8, ["link"]))), 128))
            ]),
            n("span", yu, u($.folder.groupName), 1)
          ], 64)) : $.link ? (c(), p(Q, { key: 1 }, [
            Z(vn, {
              link: $.link
            }, null, 8, ["link"]),
            n("span", wu, u($.link.title), 1)
          ], 64)) : E("", !0)
        ], 6)) : E("", !0)
      ])),
      Z(i(o), {
        open: r.value,
        onClose: f
      }, null, 8, ["open"])
    ], 64));
  }
}), Cs = /* @__PURE__ */ Ne(bu, [["__scopeId", "data-v-142d9c79"]]), dn = Object.keys(vo);
let tn = !1, Hn = 0, So, Kn;
function Ri(e) {
  for (const t of dn)
    Object.prototype.hasOwnProperty.call(e, t) && (vo[t] = e[t] !== !1);
}
function ku() {
  const e = vo;
  Fe.setPrefs(e.showSites, e.showTodo, !e.showTodo && e.showBili), document.body.classList.toggle("hide-weather", !e.showWeather), document.body.classList.toggle("hide-sites", !e.showSites), document.body.classList.toggle("hide-bili", !e.showBili), document.body.classList.toggle("hide-youtube", !e.showYouTube), document.body.classList.toggle("hide-todo", !e.showTodo), document.body.classList.toggle("hide-bookmarks", !e.showBookmarkPanel), e.showBookmarkPanel || yn.close();
}
const Ni = {
  start() {
    if (tn) return;
    tn = !0;
    const e = ++Hn;
    Kn = Pe(() => dn.map((o) => vo[o]), ku, { immediate: !0, flush: "sync" });
    const t = globalThis.chrome;
    So = (o, s) => {
      if (s !== "local") return;
      const a = {};
      for (const r of dn) o[r] && (a[r] = o[r].newValue);
      Ri(a);
    }, t?.storage?.onChanged?.addListener(So), t?.storage?.local && t.storage.local.get(dn).then((o) => {
      tn && Hn === e && Ri(o || {});
    }).catch((o) => console.warn("[HomePrefs] 读取首页设置失败", o));
  },
  stop() {
    tn = !1, Hn++, Kn?.(), Kn = void 0, So && globalThis.chrome?.storage?.onChanged?.removeListener(So), So = void 0;
  }
}, _u = {
  id: "launcher",
  class: "launcher",
  "aria-label": "快捷入口"
}, Cu = { class: "launcher-inner" }, xu = { class: "launcher-overview" }, Lu = ["title"], $u = { class: "card-head" }, Su = { id: "wx-title" }, Tu = { id: "weather-body" }, Iu = { class: "launcher-center" }, Mu = {
  class: "hero-clock",
  id: "hero-clock"
}, Du = {
  class: "launcher-widget launcher-task-threads launcher-music-card",
  "data-home-module": "taskThreads"
}, Au = { class: "card-head" }, Eu = ["title"], Pu = {
  id: "task-thread-home",
  class: "task-thread-home home-music-body"
}, Wu = /* @__PURE__ */ fe({
  __name: "AppLauncher",
  setup(e) {
    Xe(() => {
      pn.initWallpaper();
    });
    function t() {
      Be.handleToolClick("music");
    }
    return (o, s) => (c(), p("section", _u, [
      s[4] || (s[4] = n("div", {
        id: "hero-background-media",
        class: "hero-background-media",
        "aria-hidden": "true"
      }, null, -1)),
      n("div", Cu, [
        n("div", xu, [
          tt(n("section", {
            class: "launcher-widget launcher-weather",
            "data-home-module": "weather",
            title: i(d)("weather.widgetSwitchTip")
          }, [
            n("header", $u, [
              s[1] || (s[1] = n("span", {
                class: "bar",
                style: { background: "linear-gradient(180deg,#38bdf8,#818cf8)" }
              }, null, -1)),
              n("h2", Su, u(i(d)("weather.widgetTitle")), 1)
            ]),
            n("div", Tu, [
              Z(ms)
            ])
          ], 8, Lu), [
            [fo, i(vo).showWeather]
          ]),
          n("div", Iu, [
            n("div", Mu, [
              Z(qc),
              Z(vs)
            ]),
            n("form", {
              id: "search",
              class: "search",
              onSubmit: s[0] || (s[0] = z(() => {
              }, ["prevent"]))
            }, [
              Z(Ki)
            ], 32)
          ]),
          n("section", Du, [
            n("header", Au, [
              s[2] || (s[2] = n("span", { class: "bar music-purple" }, null, -1)),
              n("h2", null, u(i(d)("home.music.player")), 1),
              s[3] || (s[3] = n("span", { class: "grow" }, null, -1)),
              n("button", {
                id: "home-music-open-panel",
                class: "home-music-head-btn",
                type: "button",
                title: i(d)("home.music.openNeteaseTip"),
                onClick: t
              }, u(i(d)("home.music.openNetease")), 9, Eu)
            ]),
            n("div", Pu, [
              Z(ys)
            ])
          ])
        ]),
        n("div", {
          id: "launcher-groups",
          class: de(["launcher-groups", { "has-sites": i(ue).showSites, "has-todoist": i(ue).hasTodo, "has-bili": i(ue).hasBili, "has-media": i(ue).hasTodo || i(ue).hasBili }])
        }, [
          Z(Cs)
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
}), po = $e(/* @__PURE__ */ new Set()), Kt = $e({}), it = $e({});
function jn(e) {
  const t = st(e);
  if (!t?.lifecycle.canUnmount || t.lifecycle.canUnmount()) return { ok: !0 };
  const o = t.lifecycle.unmountBlockedMessage || "模块操作尚未结束，不能退出或重载。";
  return Le.show({ appName: t.title, title: "操作进行中", message: o, showActions: !1 }), { ok: !1, error: o };
}
const Ke = {
  // 检查应用是否处于运行显示状态（驱动 Dock 上的小圆点：关闭即熄灭，不保留 macOS 风格后台悬浮绿点）
  isRunning(e) {
    return this.isVisible(e);
  },
  // 检查应用当前是否在屏幕上可见（窗口是否打开）
  isVisible(e) {
    const t = st(e);
    return t ? t.lifecycle.isVisible() : Sn(e) ? !!pa[e] : ha(e);
  },
  // 标记应用启动
  markRunning(e) {
    po.add(e), (e in it || st(e)) && (it[e] = !0);
  },
  // 获取组件当前的 render key
  getRenderKey(e) {
    return Kt[e] || 0;
  },
  // 打开 / 显示应用窗口
  openApp(e) {
    const t = st(e);
    if (t) {
      Be.open(e), t.lifecycle.isVisible() && this.markRunning(e);
      return;
    }
    if (this.markRunning(e), Sn(e)) {
      wi.open(e);
      return;
    }
    Be.open(e);
  },
  // 隐藏/关闭窗口：立即退出可见运行态并熄灭 Dock 指示绿点
  hideApp(e) {
    if (po.delete(e), st(e)) {
      Be.close(e);
      return;
    }
    if (Sn(e)) {
      wi.close(e);
      return;
    }
    Be.close(e);
  },
  // 真正的关闭（Quit / 彻底从内存与 DOM 中卸载销毁，熄灭小圆点）
  async quitApp(e) {
    if (st(e)) {
      const a = jn(e);
      if (!a.ok) return a;
      const r = st(e)?.lifecycle.beforeQuit;
      if (r) {
        const l = Ht(e);
        try {
          await r();
        } catch {
          const x = "后台停止未确认，窗口保留；未自动重试，请检查后台状态。";
          return Le.show({ appName: st(e).title, title: "未退出", message: x, showActions: !1 }), { ok: !1, error: x };
        }
        if (Ht(e) !== l) return { ok: !1, error: "窗口已有后续操作，未卸载。" };
        const h = jn(e);
        if (!h.ok) return h;
      }
      const g = Be.close(e), f = Ht(e);
      return po.delete(e), it[e] = !1, xt.removeActiveTool(e), await g, await St(), Ht(e) === f ? { ok: !0 } : { ok: !1, error: "模块已有后续操作，退出状态已变化。" };
    }
    this.hideApp(e), po.delete(e), xt.removeActiveTool(e), e in it && (it[e] = !1);
    const t = ua;
    t.activeId === e && (t.activeId = "");
    const o = t.openOrder.indexOf(e);
    o >= 0 && t.openOrder.splice(o, 1);
    const s = t.activeTools.indexOf(e);
    s >= 0 && t.activeTools.splice(s, 1), Be.render();
  },
  // 重新加载（Reload / 单应用热重启，重新初始化组件）
  async reloadApp(e) {
    const t = st(e);
    if (t) {
      if (t.lifecycle.canOpen && !t.lifecycle.canOpen()) return { ok: !1, error: "模块当前不能打开，未重载窗口。" };
      const o = jn(e);
      if (!o.ok) return o;
      const s = Be.close(e), a = Ht(e);
      return await s, Ht(e) !== a ? { ok: !1, error: "模块已有后续操作，重载已取消。" } : (it[e] = !1, await St(), Ht(e) !== a ? { ok: !1, error: "模块已有后续操作，未重新打开。" } : (Kt[e] = (Kt[e] || 0) + 1, Be.open(e), t.lifecycle.isVisible() ? (this.markRunning(e), { ok: !0 }) : { ok: !1, error: "模块当前不能打开，未重新显示窗口。" }));
    }
    this.hideApp(e), e in it ? (it[e] = !1, await St(), Kt[e] = (Kt[e] || 0) + 1, it[e] = !0) : Kt[e] = (Kt[e] || 0) + 1, await St(), this.openApp(e);
  }
}, To = /* @__PURE__ */ fe({
  __name: "DockCardModuleHost",
  props: {
    id: {}
  },
  setup(e) {
    const o = st(e.id);
    if (!o || o.presentation !== "card") throw new Error("Unknown registered workspace card");
    const s = o;
    s.mountPolicy === "workspace-ready" && Ke.markRunning(s.id), Pe(s.lifecycle.isVisible, (h) => {
      h && Ke.markRunning(s.id);
    }, { immediate: !0, flush: "sync" });
    const a = te(() => !!it[s.id]);
    function r() {
      try {
        s.lifecycle.hide();
      } catch {
      }
      (Tt.activeId === s.id || Tt.activeId === s.rootId) && (Tt.activeId = null), Ke.hideApp(s.id), Ui(Tt.activeId);
    }
    function g() {
      Ke.reloadApp(s.id);
    }
    function f() {
      typeof window < "u" && window.location.reload();
    }
    const l = X({
      loader: s.loadView,
      onError(h, x, F, m) {
        m <= 2 ? x() : F();
      },
      errorComponent: fe({
        setup: () => () => s.lifecycle.isVisible() ? Ue("section", { class: "card wide card-fullscreen", role: "alert" }, [
          Ue("h2", s.title),
          Ue("p", "工作区切片加载受阻（可能因插件重载或切片更新）。可点击「重新加载模块」，或返回首页。"),
          Ue("div", { style: "display: flex; gap: 10px; margin-top: 14px;" }, [
            Ue("button", {
              type: "button",
              style: "padding: 6px 14px; border-radius: 999px; border: 1px solid var(--border); background: var(--primary, #3b82f6); color: #fff; cursor: pointer; font-size: 12px; font-weight: 500;",
              onClick: f
            }, "⟳ 刷新标签页 (加载最新版)"),
            Ue("button", {
              type: "button",
              style: "padding: 6px 14px; border-radius: 999px; border: 1px solid var(--border); background: var(--surface); color: var(--text); cursor: pointer; font-size: 12px;",
              onClick: g
            }, "↻ 重新加载模块"),
            Ue("button", {
              type: "button",
              style: "padding: 6px 14px; border-radius: 999px; border: 1px solid var(--border); background: var(--surface); color: var(--text); cursor: pointer; font-size: 12px;",
              onClick: r
            }, "返回首页")
          ])
        ]) : null
      })
    });
    return mo(() => {
      r(), po.delete(s.id), delete it[s.id];
    }), (h, x) => a.value ? (c(), pe(ji(i(l)), {
      key: i(Ke).getRenderKey(i(s).id)
    })) : E("", !0);
  }
}), Ru = { class: "logicweaver-workspaces-layer" }, Nu = {
  key: 0,
  id: "daily-section",
  class: "wrap"
}, Ou = { id: "vue-todoist-root" }, Bu = { id: "vue-bili-favorites-root" }, Fu = { id: "vue-youtube-root" }, Hu = { id: "vue-aihot-root" }, Ku = /* @__PURE__ */ fe({
  __name: "AppWorkspaces",
  setup(e) {
    const t = V(!!Tt.activeId);
    return Xe(() => {
      t.value || (typeof window < "u" && "requestIdleCallback" in window ? window.requestIdleCallback(() => {
        t.value = !0;
      }, { timeout: 80 }) : setTimeout(() => {
        t.value = !0;
      }, 40));
    }), (o, s) => (c(), p("div", Ru, [
      t.value ? (c(), p("main", Nu, [
        n("div", Ou, [
          Z(To, { id: "todoist" })
        ]),
        n("div", Bu, [
          Z(To, { id: "daily-bilibili" })
        ]),
        tt(n("div", Fu, [
          Z(To, { id: "daily-youtube" })
        ], 512), [
          [fo, i(vo).showYouTube]
        ]),
        n("div", Hu, [
          Z(To, { id: "daily-aihot" })
        ]),
        Z(To, { id: "card-github" })
      ])) : E("", !0)
    ]));
  }
}), ju = ["aria-label"], zu = { class: "dock-menu-head" }, Vu = { class: "dock-menu-title" }, Gu = ["src", "alt"], Uu = {
  key: 1,
  class: "dock-menu-emoji"
}, Yu = { class: "dock-menu-text" }, Xu = { class: "dock-menu-text" }, qu = { class: "dock-menu-text" }, Ju = /* @__PURE__ */ fe({
  __name: "DockContextMenu",
  props: {
    target: {}
  },
  emits: ["close", "action"],
  setup(e, { emit: t }) {
    const o = e, s = t, a = te(() => !o.target || o.target.type !== "tool" ? !1 : Ke.isRunning(o.target.id)), r = te(() => !o.target || o.target.type !== "tool" ? !1 : Ke.isVisible(o.target.id)), { menuRef: g, style: f } = di({
      visible: () => !!o.target,
      anchor: () => o.target || { x: 0, y: 0 },
      placement: no.position === "top" ? "below" : "above",
      align: "center",
      gap: 12,
      dismiss: () => s("close")
    });
    function l() {
      o.target && (Ke.openApp(o.target.id), s("close"));
    }
    function h() {
      o.target && (Ke.hideApp(o.target.id), s("close"));
    }
    async function x() {
      o.target && (await Ke.reloadApp(o.target.id), s("close"));
    }
    async function F() {
      if (!o.target) return;
      const v = o.target;
      if ((await Ke.quitApp(v.id))?.ok === !1) {
        s("close");
        return;
      }
      Le.show({
        appName: v.title,
        title: d("dock.quitDone"),
        subtitle: d("dock.quitSubtitle"),
        icon: v.icon || "assets/logo.png",
        duration: 2800
      }), s("close");
    }
    async function m() {
      if (!o.target) return;
      const v = o.target, w = Bo.uninstall(v.id);
      s("close"), await w || Le.show({
        appName: v.title,
        title: "入口停用未确认",
        subtitle: Bo.state.errorMessage || "请打开模块管理核对当前启用状态",
        icon: v.icon || "assets/logo.png",
        duration: 4e3
      });
    }
    function D() {
      if (!o.target) return;
      const w = {
        "daily-bilibili": "https://www.bilibili.com",
        "card-github": "https://github.com",
        "daily-aihot": "https://news.ycombinator.com",
        "daily-youtube": "https://www.youtube.com"
      }[o.target.id] || "https://www.bilibili.com";
      window.open(w, "_blank"), s("close");
    }
    return (v, w) => (c(), pe(wt, { to: "body" }, [
      e.target ? (c(), p("div", {
        key: 0,
        ref_key: "menuRef",
        ref: g,
        role: "group",
        "aria-label": `${e.target.title}操作`,
        class: "dock-context-menu",
        style: xe(i(f)),
        onClick: w[1] || (w[1] = z(() => {
        }, ["stop"])),
        onContextmenu: w[2] || (w[2] = z(() => {
        }, ["prevent"]))
      }, [
        n("div", zu, [
          n("div", Vu, [
            e.target.icon ? (c(), p("img", {
              key: 0,
              class: "dock-menu-icon",
              src: e.target.icon,
              alt: e.target.title
            }, null, 8, Gu)) : e.target.emoji ? (c(), p("span", Uu, u(e.target.emoji), 1)) : E("", !0),
            n("strong", null, u(e.target.title), 1)
          ]),
          e.target.type === "tool" ? (c(), p("span", {
            key: 0,
            class: de(["dock-status-tag", { "is-running": a.value }])
          }, [
            w[3] || (w[3] = n("span", { class: "dock-status-dot" }, null, -1)),
            ot(" " + u(a.value ? i(d)("dock.menu.running") : i(d)("dock.menu.notStarted")), 1)
          ], 2)) : E("", !0)
        ]),
        w[12] || (w[12] = n("div", { class: "dock-menu-divider" }, null, -1)),
        e.target.type === "tool" ? (c(), p(Q, { key: 0 }, [
          r.value ? (c(), p("button", {
            key: 1,
            type: "button",
            class: "dock-menu-item",
            onClick: h
          }, [
            w[5] || (w[5] = n("span", { class: "dock-menu-symbol" }, "−", -1)),
            n("span", null, u(i(d)("dock.menu.hideWindow")), 1)
          ])) : (c(), p("button", {
            key: 0,
            type: "button",
            class: "dock-menu-item",
            onClick: l
          }, [
            w[4] || (w[4] = n("span", { class: "dock-menu-symbol" }, "↗", -1)),
            n("span", null, u(i(d)("dock.menu.openWindow")), 1)
          ])),
          n("button", {
            type: "button",
            class: "dock-menu-item",
            onClick: x
          }, [
            w[6] || (w[6] = n("span", { class: "dock-menu-symbol" }, "⟲", -1)),
            n("div", Yu, [
              n("span", null, u(i(d)("dock.menu.reloadApp")), 1),
              n("small", null, u(i(d)("dock.menu.reloadSub")), 1)
            ])
          ]),
          w[9] || (w[9] = n("div", { class: "dock-menu-divider" }, null, -1)),
          n("button", {
            type: "button",
            class: "dock-menu-item",
            onClick: m
          }, [
            w[7] || (w[7] = n("span", { class: "dock-menu-symbol" }, "📌", -1)),
            n("div", Xu, [
              n("span", null, u(i(d)("dock.menu.removeFromDock")), 1),
              n("small", null, u(i(d)("dock.menu.removeSub")), 1)
            ])
          ]),
          n("button", {
            type: "button",
            class: "dock-menu-item item-danger",
            onClick: F
          }, [
            w[8] || (w[8] = n("span", { class: "dock-menu-symbol" }, "✕", -1)),
            n("div", qu, [
              n("span", null, u(i(d)("dock.menu.quitApp")), 1),
              n("small", null, u(i(d)("dock.menu.quitSub")), 1)
            ])
          ])
        ], 64)) : e.target.type === "card" ? (c(), p("button", {
          key: 1,
          type: "button",
          class: "dock-menu-item",
          onClick: D
        }, [
          w[10] || (w[10] = n("span", { class: "dock-menu-symbol" }, "↗", -1)),
          n("span", null, u(i(d)("dock.menu.openOfficial")), 1)
        ])) : (c(), p("button", {
          key: 2,
          type: "button",
          class: "dock-menu-item",
          onClick: w[0] || (w[0] = (T) => s("close"))
        }, [...w[11] || (w[11] = [
          n("span", { class: "dock-menu-symbol" }, "🏠", -1),
          n("span", null, "返回常用主页", -1)
        ])]))
      ], 44, ju)) : E("", !0)
    ]));
  }
}), Zu = /* @__PURE__ */ Ne(Ju, [["__scopeId", "data-v-513ee784"]]), Qu = { class: "mac-dock-shelf" }, ep = ["data-dock-target", "title", "onPointerdown", "onClick", "onContextmenu"], tp = ["src", "alt"], op = {
  key: 0,
  class: "mac-dock-dot",
  "aria-hidden": "true"
}, np = ["title"], ip = ["alt"], sp = ["data-dock-tool", "title", "onPointerdown", "onClick", "onContextmenu"], ap = ["src", "alt"], rp = {
  key: 1,
  class: "mac-dock-emoji",
  "aria-hidden": "true"
}, lp = {
  key: 2,
  class: "mac-dock-dot",
  "aria-hidden": "true"
}, cp = {
  key: 3,
  class: "mac-dock-badge"
}, dp = ["title"], up = ["src"], pp = {
  key: 1,
  class: "mac-dock-emoji"
}, hp = /* @__PURE__ */ fe({
  __name: "MacDock",
  setup(e) {
    const t = te(() => no), o = V(null), s = te(() => Object.fromEntries(no.tools.map((R) => {
      const G = st(R.id)?.badgeCount?.() || 0;
      return [R.id, Number.isFinite(G) ? Math.max(0, Math.floor(G)) : 0];
    })));
    function a(R) {
      R.stopPropagation(), o.value = null, F(R.currentTarget), Bo.open();
    }
    function r(R, G) {
      G.stopPropagation(), o.value = null, F(G.currentTarget), xt.triggerItem("target", R);
    }
    function g(R, G) {
      const Y = G.currentTarget.getBoundingClientRect(), me = no.position, Ce = me === "left" || me === "right";
      o.value = {
        type: "card",
        id: R.id,
        title: R.title,
        icon: R.icon,
        x: Ce ? me === "left" ? Y.right + 8 : Y.left - 8 : Y.left + Y.width / 2,
        y: Ce ? Y.top + Y.height / 2 : me === "top" ? Y.bottom + 8 : Y.top
      };
    }
    function f(R) {
      R.stopPropagation(), o.value = null, F(R.currentTarget), xt.triggerItem("home", "home-launcher");
    }
    function l(R, G) {
      G.stopPropagation(), o.value = null, F(G.currentTarget), st(R) || Ke.markRunning(R), xt.triggerItem("tool", R);
    }
    function h(R, G) {
      const Y = G.currentTarget.getBoundingClientRect(), me = no.position, Ce = me === "left" || me === "right";
      o.value = {
        type: "tool",
        id: R.id,
        title: R.title,
        icon: R.icon,
        emoji: R.emoji,
        x: Ce ? me === "left" ? Y.right + 8 : Y.left - 8 : Y.left + Y.width / 2,
        y: Ce ? Y.top + Y.height / 2 : me === "top" ? Y.bottom + 8 : Y.top
      };
    }
    const x = /* @__PURE__ */ new Map();
    function F(R) {
      if (!R || (x.get(R)?.cancel(), window.matchMedia("(prefers-reduced-motion: reduce)").matches)) return;
      const G = R.animate([
        { translate: "0 0", offset: 0 },
        { translate: "0 -8px", offset: 0.35 },
        { translate: "0 0", offset: 0.65 },
        { translate: "0 -2px", offset: 0.85 },
        { translate: "0 0", offset: 1 }
      ], { duration: 350, easing: "ease" });
      x.set(R, G);
      const N = () => {
        x.get(R) === G && x.delete(R);
      };
      G.onfinish = N, G.oncancel = N;
    }
    const m = V(null), D = $e({
      visible: !1,
      x: 0,
      y: 0,
      width: 40,
      height: 40,
      item: null,
      type: "tool"
    }), v = V(null), w = V(null), T = te(() => v.value || t.value.cards), y = te(() => w.value || t.value.tools);
    let _ = "", L = 0, B = !1, H = 0;
    function U(R, G, N) {
      if (N.button !== 0 || N.target.closest(".mac-dock-market-btn")) return;
      const Ce = N.currentTarget.getBoundingClientRect();
      B = !1, m.value = {
        type: R,
        id: G.id,
        item: G,
        startX: N.clientX,
        startY: N.clientY,
        initialLeft: Ce.left,
        initialTop: Ce.top,
        width: Ce.width,
        height: Ce.height
      }, window.addEventListener("pointermove", M), window.addEventListener("pointerup", k), window.addEventListener("pointercancel", k);
    }
    function M(R) {
      if (!m.value) return;
      const G = R.clientX - m.value.startX, N = R.clientY - m.value.startY, Y = Math.hypot(G, N);
      if (!B && Y > 5 && (B = !0, D.visible = !0, D.item = m.value.item, D.type = m.value.type, D.width = m.value.width, D.height = m.value.height, m.value.type === "card" ? v.value = [...t.value.cards] : w.value = [...t.value.tools]), !B) return;
      D.x = R.clientX - D.width / 2, D.y = R.clientY - D.height / 2;
      const Ce = document.elementsFromPoint(R.clientX, R.clientY).find(
        (ke) => ke.classList.contains("mac-dock-item") && !ke.classList.contains("mac-dock-market-btn")
      );
      if (!Ce) return;
      const qe = Ce.getAttribute("data-dock-target"), A = Ce.getAttribute("data-dock-tool"), W = m.value.type, j = m.value.id, ve = Date.now();
      if (W === "card" && qe && qe !== j && qe !== "home-launcher") {
        const ke = Ce.getBoundingClientRect(), Se = ke.left + ke.width / 2;
        if (Math.abs(R.clientX - Se) > ke.width * 0.55 || qe === _ && ve - L < 180) return;
        const we = [...v.value || t.value.cards], We = we.findIndex((Oe) => Oe.id === j), Qe = we.findIndex((Oe) => Oe.id === qe);
        if (We >= 0 && Qe >= 0 && We !== Qe) {
          const Oe = we.splice(We, 1)[0];
          we.splice(Qe, 0, Oe), v.value = we, _ = qe, L = ve;
        }
      } else if (W === "tool" && A && A !== j) {
        const ke = Ce.getBoundingClientRect(), Se = ke.left + ke.width / 2;
        if (Math.abs(R.clientX - Se) > ke.width * 0.55 || A === _ && ve - L < 180) return;
        const we = [...w.value || t.value.tools], We = we.findIndex((Oe) => Oe.id === j), Qe = we.findIndex((Oe) => Oe.id === A);
        if (We >= 0 && Qe >= 0 && We !== Qe) {
          const Oe = we.splice(We, 1)[0];
          we.splice(Qe, 0, Oe), w.value = we, _ = A, L = ve;
        }
      }
    }
    function k() {
      window.removeEventListener("pointermove", M), window.removeEventListener("pointerup", k), window.removeEventListener("pointercancel", k), B && m.value && (H = Date.now() + 250, m.value.type === "card" && v.value ? xt.reorderCards(v.value.map((R) => R.id)) : m.value.type === "tool" && w.value && xt.reorderTools(w.value.map((R) => R.id))), D.visible = !1, D.item = null, v.value = null, w.value = null, m.value = null, B = !1, _ = "";
    }
    function $(R, G) {
      Date.now() < H || r(R, G);
    }
    function ee(R, G) {
      Date.now() < H || l(R, G);
    }
    return mo(() => {
      for (const R of x.values()) R.cancel();
      x.clear(), window.removeEventListener("pointermove", M), window.removeEventListener("pointerup", k), window.removeEventListener("pointercancel", k);
    }), (R, G) => (c(), p(Q, null, [
      n("div", Qu, [
        Z(Oo, {
          tag: "div",
          class: "mac-dock-group mac-dock-cards-group",
          name: "dock-item-motion"
        }, {
          default: Et(() => [
            (c(!0), p(Q, null, be(T.value, (N) => (c(), p("button", {
              key: N.id,
              class: de(["mac-dock-item", {
                "is-active": t.value.activeTargetId === N.id,
                "is-drag-origin": m.value && m.value.id === N.id
              }]),
              type: "button",
              "data-dock-target": N.id,
              title: N.title,
              onPointerdown: (Y) => U("card", N, Y),
              onClick: z((Y) => $(N.id, Y), ["stop"]),
              onContextmenu: z((Y) => g(N, Y), ["prevent"])
            }, [
              n("img", {
                class: "mac-dock-icon",
                src: N.icon,
                alt: N.title
              }, null, 8, tp),
              t.value.activeTargetId === N.id ? (c(), p("span", op)) : E("", !0)
            ], 42, ep))), 128))
          ]),
          _: 1
        }),
        G[4] || (G[4] = n("div", {
          class: "mac-dock-divider",
          "aria-hidden": "true"
        }, null, -1)),
        n("button", {
          class: "mac-dock-item",
          type: "button",
          "data-dock-target": "home-launcher",
          title: i(d)("dock.home"),
          onClick: G[0] || (G[0] = z((N) => f(N), ["stop"]))
        }, [
          n("img", {
            class: "mac-dock-icon",
            src: "assets/nav-home.svg",
            alt: i(d)("dock.home")
          }, null, 8, ip)
        ], 8, np),
        G[5] || (G[5] = n("div", {
          class: "mac-dock-divider mac-dock-divider-dark",
          "aria-hidden": "true"
        }, null, -1)),
        Z(Oo, {
          tag: "div",
          class: "mac-dock-group mac-dock-tools-group",
          name: "dock-item-motion"
        }, {
          default: Et(() => [
            (c(!0), p(Q, null, be(y.value, (N) => (c(), p("button", {
              key: N.id,
              class: de(["mac-dock-item", {
                "is-active": i(Ke).isRunning(N.id),
                "is-drag-origin": m.value && m.value.id === N.id
              }]),
              type: "button",
              "data-dock-tool": N.id,
              title: N.title,
              onPointerdown: (Y) => U("tool", N, Y),
              onClick: z((Y) => ee(N.id, Y), ["stop"]),
              onContextmenu: z((Y) => h(N, Y), ["prevent"])
            }, [
              N.icon ? (c(), p("img", {
                key: 0,
                class: "mac-dock-icon",
                src: N.icon,
                alt: N.title
              }, null, 8, ap)) : N.emoji ? (c(), p("span", rp, u(N.emoji), 1)) : E("", !0),
              i(Ke).isRunning(N.id) ? (c(), p("span", lp)) : E("", !0),
              s.value[N.id] > 0 ? (c(), p("span", cp, u(s.value[N.id] > 99 ? "99+" : s.value[N.id]), 1)) : E("", !0)
            ], 42, sp))), 128))
          ]),
          _: 1
        }),
        n("button", {
          class: de(["mac-dock-item mac-dock-market-btn", { "is-active": i(Bo).state.isOpen }]),
          type: "button",
          title: i(d)("dock.market"),
          onClick: G[1] || (G[1] = z((N) => a(N), ["stop"]))
        }, [...G[3] || (G[3] = [
          n("span", {
            class: "mac-dock-market-icon",
            "aria-hidden": "true"
          }, "🧩", -1)
        ])], 10, dp)
      ]),
      (c(), pe(wt, { to: "body" }, [
        D.visible && D.item ? (c(), p("div", {
          key: 0,
          class: "mac-dock-drag-ghost",
          style: xe({
            width: D.width + "px",
            height: D.height + "px",
            transform: "translate3d(" + D.x + "px," + D.y + "px, 0)"
          }),
          "aria-hidden": "true"
        }, [
          D.item.icon ? (c(), p("img", {
            key: 0,
            class: "mac-dock-icon",
            src: D.item.icon,
            alt: ""
          }, null, 8, up)) : D.item.emoji ? (c(), p("span", pp, u(D.item.emoji), 1)) : E("", !0)
        ], 4)) : E("", !0)
      ])),
      Z(Zu, {
        target: o.value,
        onClose: G[2] || (G[2] = (N) => o.value = null)
      }, null, 8, ["target"])
    ], 64));
  }
}), xs = /* @__PURE__ */ Ne(hp, [["__scopeId", "data-v-ede6cdc8"]]), fp = {
  id: "win-toast-container",
  class: "win-toast-container",
  "aria-live": "polite",
  "aria-relevant": "additions"
}, gp = ["data-toast-fingerprint", "onMouseenter", "onMouseleave"], mp = { class: "win-toast-head" }, vp = ["src"], yp = { class: "win-toast-app" }, wp = { class: "win-toast-time" }, bp = ["title", "aria-label", "onClick"], kp = ["onClick"], _p = { class: "win-toast-title" }, Cp = {
  key: 0,
  class: "win-toast-subtitle"
}, xp = {
  key: 1,
  class: "win-toast-snippet"
}, Lp = {
  key: 0,
  class: "win-toast-actions"
}, $p = ["onClick"], Sp = ["onClick"], Tp = /* @__PURE__ */ fe({
  __name: "NotificationHost",
  setup(e) {
    const t = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Map(), a = V({}), r = V({});
    let g = null;
    function f(v) {
      const w = t.get(v);
      w !== void 0 && clearTimeout(w), t.delete(v);
    }
    function l(v, w = v.duration) {
      f(v.id), s.set(v.id, w), o.set(v.id, Date.now()), r.value[v.id] = !1, a.value[v.id] = Math.max(0, Math.min(100, w / v.duration * 100)), St(() => requestAnimationFrame(() => {
        a.value[v.id] = 0;
      })), t.set(v.id, window.setTimeout(() => {
        t.delete(v.id), Le.close(v.id);
      }, w));
    }
    function h(v) {
      f(v.id);
      const w = Date.now() - (o.get(v.id) || Date.now()), T = Math.max(0, (s.get(v.id) ?? v.duration) - w);
      s.set(v.id, T), r.value[v.id] = !0, a.value[v.id] = Math.max(0, Math.min(100, T / v.duration * 100));
    }
    function x(v) {
      l(v, Math.max(1500, s.get(v.id) ?? v.duration));
    }
    function F(v) {
      f(v.id), Le.close(v.id);
    }
    function m(v) {
      if (Wt.markRead(v.id), F(v), !v.onClick) {
        v.target && Wt.openTarget(v.target);
        return;
      }
      try {
        Promise.resolve(v.onClick()).catch((w) => console.warn("Notification action failed", w));
      } catch (w) {
        console.warn("Notification action failed", w);
      }
    }
    function D(v) {
      const w = Math.max(500, s.get(v.id) ?? v.duration);
      return {
        width: `${a.value[v.id] ?? 100}%`,
        transition: r.value[v.id] ? "none" : `width ${w}ms linear`
      };
    }
    return Xe(() => {
      g = new MutationObserver(() => {
        const w = new Set(Vo.map((T) => T.id));
        for (const T of Vo)
          !T.closing && !t.has(T.id) && !s.has(T.id) && l(T);
        for (const T of s.keys())
          w.has(T) || (f(T), s.delete(T), o.delete(T), delete a.value[T], delete r.value[T]);
      });
      const v = document.getElementById("win-toast-container");
      v && g.observe(v, { childList: !0 });
      for (const w of Vo) l(w);
    }), mo(() => {
      g?.disconnect(), g = null;
      for (const v of t.values()) clearTimeout(v);
      t.clear();
    }), (v, w) => (c(), pe(wt, { to: "body" }, [
      n("div", fp, [
        Z(Oo, { name: "win-toast" }, {
          default: Et(() => [
            (c(!0), p(Q, null, be(i(Vo), (T) => (c(), p("article", {
              key: T.id,
              class: de(["win-toast-card", [T.appType, { closing: T.closing }]]),
              "data-toast-fingerprint": T.fingerprint,
              onMouseenter: (y) => h(T),
              onMouseleave: (y) => x(T)
            }, [
              n("header", mp, [
                n("img", {
                  src: T.icon,
                  class: "win-toast-icon",
                  alt: ""
                }, null, 8, vp),
                n("span", yp, u(T.appName), 1),
                n("span", wp, u(i(d)("notifications.justNow")), 1),
                n("button", {
                  type: "button",
                  class: "win-toast-close",
                  title: i(d)("common.close"),
                  "aria-label": i(d)("common.close"),
                  onClick: (y) => F(T)
                }, "✕", 8, bp)
              ]),
              n("button", {
                type: "button",
                class: "win-toast-body win-toast-body-button",
                onClick: (y) => m(T)
              }, [
                n("span", _p, u(T.title), 1),
                T.subtitle ? (c(), p("span", Cp, u(T.subtitle), 1)) : E("", !0),
                T.message ? (c(), p("span", xp, u(T.message), 1)) : E("", !0)
              ], 8, kp),
              T.showActions && T.actionLabel ? (c(), p("footer", Lp, [
                n("button", {
                  type: "button",
                  class: "win-toast-btn primary",
                  onClick: (y) => m(T)
                }, u(T.actionLabel), 9, $p),
                n("button", {
                  type: "button",
                  class: "win-toast-btn",
                  onClick: (y) => F(T)
                }, u(i(d)("common.close")), 9, Sp)
              ])) : E("", !0),
              n("div", {
                class: "win-toast-progress",
                style: xe(D(T))
              }, null, 4)
            ], 42, gp))), 128))
          ]),
          _: 1
        })
      ])
    ]));
  }
}), Ls = /* @__PURE__ */ Ne(Tp, [["__scopeId", "data-v-55714354"]]), Ip = ["id"], Mp = /* @__PURE__ */ fe({
  __name: "DockModuleHost",
  setup(e) {
    const t = Zi().filter((o) => o.presentation !== "card").map((o) => {
      Pe(o.lifecycle.isVisible, (a) => {
        a && Ke.markRunning(o.id);
      }, { immediate: !0, flush: "sync" });
      const s = fe({
        setup: () => () => Ue("section", { class: "dock-module-load-error", role: "alert" }, [
          Ue("div", { style: "display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;" }, [
            Ue("strong", { style: "font-size: 13px; color: var(--heading);" }, `${o.title} 加载受阻`),
            Ue("span", { style: "font-size: 11px; padding: 2px 6px; border-radius: 4px; background: var(--surface); color: var(--muted); border: 1px solid var(--border);" }, "代码可能已更新")
          ]),
          Ue("p", { style: "font-size: 12px; line-height: 1.5; color: var(--muted); margin: 0 0 12px 0;" }, "模块分块代码未就绪。若刚才在终端编写或重新构建了扩展，点击「刷新标签页」即可立即同步最新切片。"),
          Ue("div", { style: "display: flex; gap: 8px;" }, [
            Ue("button", {
              type: "button",
              style: "padding: 5px 12px; border-radius: 6px; border: 1px solid var(--border); background: var(--primary, #3b82f6); color: #fff; cursor: pointer; font-size: 12px; font-weight: 500;",
              onClick: () => {
                typeof window < "u" && window.location.reload();
              }
            }, "⟳ 刷新标签页"),
            Ue("button", {
              type: "button",
              style: "padding: 5px 10px; border-radius: 6px; border: 1px solid var(--border); background: var(--surface); color: var(--text); cursor: pointer; font-size: 12px;",
              onClick: () => {
                Ke.reloadApp(o.id);
              }
            }, "↻ 重试"),
            Ue("button", {
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
        mounted: te(() => !!it[o.id]),
        view: X({
          loader: o.loadView,
          onError(a, r, g, f) {
            f <= 2 ? r() : g();
          },
          errorComponent: s
        })
      };
    });
    return mo(() => {
      for (const { definition: o } of t)
        Be.close(o.id), po.delete(o.id), it[o.id] = !1;
    }), (o, s) => (c(!0), p(Q, null, be(i(t), (a) => tt((c(), p("div", {
      id: a.definition.rootId,
      key: a.definition.id
    }, [
      a.mounted.value ? (c(), pe(ji(a.view), {
        key: i(Ke).getRenderKey(a.definition.id)
      })) : E("", !0)
    ], 8, Ip)), [
      [fo, a.definition.lifecycle.isVisible()]
    ])), 128));
  }
}), Dp = /* @__PURE__ */ Ne(Mp, [["__scopeId", "data-v-fc77be0a"]]);
function Ze(e, t) {
  const o = V(!1);
  return Pe(
    e,
    (s) => {
      s && (o.value = !0);
    },
    { immediate: !0, flush: "sync" }
  ), Rt(o);
}
const Ap = ["onKeydown"], Ep = { class: "fo-up-preview-head" }, Pp = ["src"], Wp = { class: "fo-up-preview-meta" }, Rp = { class: "fo-up-preview-name-row" }, Np = ["href"], Op = ["disabled"], Bp = { class: "fo-up-preview-sign" }, Fp = { class: "fo-up-preview-videos" }, Hp = {
  key: 0,
  class: "fo-up-preview-loading"
}, Kp = {
  key: 1,
  class: "fo-up-preview-empty"
}, jp = {
  key: 2,
  class: "fo-up-preview-empty"
}, zp = ["href", "title", "onClick"], Vp = ["src"], Gp = {
  key: 0,
  class: "fo-bili-duration"
}, Up = { class: "fo-up-preview-video-info" }, Yp = ["href", "title", "onClick"], Xp = { class: "fo-up-preview-video-meta" }, qp = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2394a3b8'%3E%3Cpath d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/%3E%3C/svg%3E", Jp = /* @__PURE__ */ fe({
  __name: "BiliUpPreview",
  setup(e) {
    const t = V(!1);
    function o() {
      if (!ye.submitting) {
        if (!ye.followed) {
          t.value = !1, cn.toggleFollow();
          return;
        }
        if (!t.value) {
          t.value = !0;
          return;
        }
        t.value = !1, cn.toggleFollow();
      }
    }
    function s() {
      t.value = !1, cn.close();
    }
    function a(r, g) {
      r.ctrlKey || r.metaKey || (r.preventDefault(), r.stopPropagation(), g.bvid ? (Xn.openVideo({
        bvid: g.bvid,
        title: g.title,
        cover: g.cover,
        author: ye.name,
        authorFace: ye.face,
        mid: ye.mid,
        url: g.url
      }), s()) : g.url && g.url !== "#" && window.open(g.url, "_blank"));
    }
    return (r, g) => i(ye).open ? (c(), p("div", {
      key: 0,
      class: "fo-up-preview-backdrop",
      onPointerdown: z(s, ["self"])
    }, [
      n("aside", {
        class: "fo-up-preview-popover",
        style: xe({ left: `${i(ye).left}px`, top: `${i(ye).top}px` }),
        onKeydown: No(z(s, ["stop", "prevent"]), ["esc"])
      }, [
        n("div", Ep, [
          n("img", {
            class: "fo-up-preview-avatar",
            src: i(ye).face || qp,
            alt: "",
            referrerpolicy: "no-referrer"
          }, null, 8, Pp),
          n("div", Wp, [
            n("div", Rp, [
              n("a", {
                class: "fo-up-preview-name",
                href: `https://space.bilibili.com/${i(ye).mid}`,
                target: "_blank",
                rel: "noreferrer"
              }, u(i(ye).name), 9, Np),
              n("button", {
                type: "button",
                class: de([
                  i(ye).followed ? "fo-up-preview-unfollow" : "fo-up-preview-follow",
                  { "is-armed": t.value }
                ]),
                disabled: i(ye).submitting,
                onClick: o
              }, u(i(ye).submitting ? "处理中…" : t.value ? "确定取消？" : i(ye).followed ? "取消关注" : "＋ 关注"), 11, Op)
            ]),
            n("p", Bp, u(i(ye).sign || "暂无个人简介"), 1)
          ]),
          n("button", {
            type: "button",
            class: "fo-up-preview-close",
            "aria-label": "关闭预览",
            onClick: s
          }, "✕")
        ]),
        g[1] || (g[1] = n("div", { class: "fo-up-preview-title-tag" }, "近期投稿视频（最新 2~3 个）", -1)),
        n("div", Fp, [
          i(ye).loading ? (c(), p("div", Hp, [...g[0] || (g[0] = [
            n("i", null, null, -1),
            n("span", null, "正在读取近期投稿…", -1)
          ])])) : i(ye).error ? (c(), p("p", Kp, u(i(ye).error), 1)) : i(ye).videos.length ? (c(!0), p(Q, { key: 3 }, be(i(ye).videos, (f) => (c(), p("article", {
            key: f.bvid,
            class: "fo-up-preview-video"
          }, [
            n("a", {
              class: "fo-up-preview-thumb",
              href: f.url,
              title: `就地播放「${f.title}」（Ctrl+点击在网页打开）`,
              onClick: (l) => a(l, f)
            }, [
              n("img", {
                src: f.cover,
                alt: "",
                loading: "lazy",
                referrerpolicy: "no-referrer"
              }, null, 8, Vp),
              f.duration ? (c(), p("span", Gp, u(f.duration), 1)) : E("", !0)
            ], 8, zp),
            n("div", Up, [
              n("a", {
                class: "fo-up-preview-video-title",
                href: f.url,
                title: `就地播放「${f.title}」（Ctrl+点击在网页打开）`,
                onClick: (l) => a(l, f)
              }, u(f.title), 9, Yp),
              n("div", Xp, [
                n("span", null, "▣ " + u(f.playCount), 1),
                n("span", null, u(f.published), 1)
              ])
            ])
          ]))), 128)) : (c(), p("p", jp, "该 UP 主近期暂无视频动态"))
        ])
      ], 44, Ap)
    ], 32)) : E("", !0);
  }
}), Zp = /* @__PURE__ */ Ne(Jp, [["__scopeId", "data-v-c36c969f"]]), Qp = { class: "logicweaver-overlays-layer" }, eh = { id: "vue-notification-root" }, th = {
  id: "bili-profile-menu",
  class: "bili-profile-menu",
  hidden: ""
}, oh = { id: "vue-bili-message-panel-root" }, nh = { id: "vue-notification-center-root" }, ih = { id: "vue-tab-manager-root" }, sh = { id: "vue-bookmark-menu-root" }, ah = { id: "vue-bookmark-panel-root" }, rh = { id: "vue-launcher-dialogs-root" }, lh = { id: "vue-launcher-folder-root" }, ch = { id: "vue-launcher-menus-root" }, dh = { id: "vue-settings-dialog-root" }, uh = { id: "vue-clock-settings-root" }, ph = { id: "vue-bili-theater-root" }, hh = { id: "vue-bili-mini-player-root" }, fh = { id: "vue-ai-dialog-root" }, gh = { id: "vue-aihot-viewer-root" }, mh = { id: "vue-nav-wheel-root" }, vh = { id: "vue-github-detail-root" }, yh = { id: "vue-bili-subtitle-modal-root" }, wh = { id: "vue-bili-video-task-modal-root" }, bh = { id: "vue-github-task-modal-root" }, kh = { id: "vue-web-task-modal-root" }, _h = { id: "vue-firecrawl-modal-root" }, Ch = { id: "vue-floating-image-viewer-root" }, xh = { id: "vue-command-palette-root" }, Lh = /* @__PURE__ */ fe({
  __name: "AppOverlays",
  setup(e) {
    const t = Ze(() => Bo.state.isOpen), o = Ze(() => Gi.isOpen), s = Ze(() => ln.isOpen), a = Ze(() => Vt.state.isOpen), r = Ze(() => ba.open), g = Ze(() => Po.state.isOpen), f = Ze(() => Vs.isOpen), l = Ze(() => ma.isOpen), h = Ze(() => pi.state.isOpen), x = Ze(() => Zs.isOpen), F = Ze(() => ze.isOpen), m = Ze(() => ti.isOpen);
    let D;
    Xe(() => {
      D = il();
    }), Nt(() => {
      D?.();
    });
    const v = Ze(() => si.state.isOpen), w = Ze(() => _t.isOpen), T = Ze(() => _o.editDialog.isOpen || _o.linkMove.isOpen || _o.folderMove.isOpen || _o.groupMerge.isOpen || _o.folderDelete.isOpen), y = X(() => import("./ProfileMenu-Drs_My19.js")), _ = X(() => import("./BookmarkNoteMenu-CFGL4ZSK.js")), L = X(() => import("./BookmarkPanel-vNEaGUXV.js")), B = X(() => import("./ClockSettingsMenu-aXwHbOwp.js")), H = X(() => import("./NotificationCenter-BqCfbdZU.js")), U = X(() => import("./TabManagerPanel-D9d90eVl.js")), M = X(() => import("./LauncherDialogs-DKal0Xwu.js")), k = X(() => import("./LauncherFolderDialog-DeSdbUKa.js")), $ = X(() => import("./LauncherMenus-CaevPA4U.js")), ee = X(() => import("./SettingsDialog-UOkGQ9-H.js")), R = X(() => import("./BiliMiniPlayer-DbxGLqEX.js")), G = X(() => import("./BiliTheaterDialog-DrDV37re.js")), N = X(() => import("./BiliMessagePanel-B4ShqeTo.js")), Y = X(() => import("./AiDialog-D2IHNZB6.js")), me = X(() => import("./AihotViewer-Bv7sBwox.js")), Ce = X(() => import("./NavWheelOverlay-CzCEfE0D.js")), qe = X(() => import("./GitHubRepoDetailDrawer-CraxhblG.js")), A = X(() => import("./InPageSideDrawer-CADTSjWm.js")), W = X(() => import("./BiliSubtitleModal-Dul1r9K3.js")), j = X(() => import("./BiliVideoTaskModal-4Obiwv-R.js")), ve = X(() => import("./GitHubTaskModal-CJa-j_t1.js")), ke = X(() => import("./WebSiteTaskModal-CXu85Wap.js")), Se = X(() => import("./FirecrawlModal-pKGZhw2U.js")), we = X(() => import("./FloatingImageViewer-C3qQL9Qn.js")), We = X(() => import("./CommandPalette-r5ydooSN.js")), Qe = X(() => import("./AppPromptModal-B4AzoAKC.js")), Oe = X(async () => {
      const [It, Ot] = await Promise.all([
        import("./PluginMarketDialog-DmdoKbQQ.js"),
        import("./plugin-market-B6zN10fA.js")
      ]);
      return zs("logicweaver-market-styles", Ot.default), It.default;
    });
    return (It, Ot) => (c(), p("div", Qp, [
      n("div", eh, [
        Z(Ls)
      ]),
      n("div", th, [
        Z(i(y))
      ]),
      n("div", oh, [
        i(l) ? (c(), pe(i(N), { key: 0 })) : E("", !0)
      ]),
      n("div", nh, [
        i(o) ? (c(), pe(i(H), { key: 0 })) : E("", !0)
      ]),
      n("div", ih, [
        i(s) ? (c(), pe(i(U), { key: 0 })) : E("", !0)
      ]),
      n("div", sh, [
        i(v) ? (c(), pe(i(_), { key: 0 })) : E("", !0)
      ]),
      n("div", ah, [
        Z(i(L))
      ]),
      n("div", rh, [
        i(T) ? (c(), pe(i(M), { key: 0 })) : E("", !0)
      ]),
      n("div", lh, [
        i(w) ? (c(), pe(i(k), { key: 0 })) : E("", !0)
      ]),
      n("div", ch, [
        Z(i($))
      ]),
      n("div", dh, [
        Z(i(ee))
      ]),
      n("div", uh, [
        i(a) ? (c(), pe(i(B), { key: 0 })) : E("", !0)
      ]),
      n("div", ph, [
        i(g) ? (c(), pe(i(G), { key: 0 })) : E("", !0)
      ]),
      n("div", hh, [
        i(f) ? (c(), pe(i(R), { key: 0 })) : E("", !0)
      ]),
      n("div", fh, [
        i(h) ? (c(), pe(i(Y), { key: 0 })) : E("", !0)
      ]),
      n("div", gh, [
        i(r) ? (c(), pe(i(me), { key: 0 })) : E("", !0)
      ]),
      n("div", mh, [
        Z(i(Ce))
      ]),
      Z(Dp),
      n("div", vh, [
        i(x) ? (c(), pe(i(qe), { key: 0 })) : E("", !0)
      ]),
      n("div", yh, [
        Z(i(W))
      ]),
      n("div", wh, [
        Z(i(j))
      ]),
      n("div", bh, [
        Z(i(ve))
      ]),
      n("div", kh, [
        Z(i(ke))
      ]),
      n("div", _h, [
        Z(i(Se))
      ]),
      n("div", Ch, [
        Z(i(we))
      ]),
      n("div", xh, [
        i(F) ? (c(), pe(i(We), { key: 0 })) : E("", !0)
      ]),
      i(m) ? (c(), pe(i(A), { key: 0 })) : E("", !0),
      Z(Zp),
      Z(i(Qe)),
      i(t) ? (c(), pe(i(Oe), { key: 1 })) : E("", !0)
    ]));
  }
});
let zn = !1;
function $h(e = 1800) {
  if (zn || typeof window > "u") return;
  const t = () => {
    if (zn) return;
    zn = !0;
    const o = Zi();
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
const Sh = ["data-active-workspace"], Th = /* @__PURE__ */ fe({
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
    function r(l, h = "image/svg+xml") {
      if (typeof document > "u") return;
      const x = typeof chrome < "u" && chrome.runtime?.getURL ? chrome.runtime.getURL(l) : l;
      if (a === x) return;
      a = x;
      const F = document.querySelectorAll("link[rel*='icon']");
      if (F.length > 0)
        F.forEach((m) => {
          m.type = h, m.href = x;
        });
      else {
        const m = document.createElement("link");
        m.rel = "icon", m.type = h, m.href = x, document.head.appendChild(m);
      }
    }
    function g() {
      if (typeof document > "u") return;
      const l = s[Go.value] || s.home;
      if (r(l.icon, l.iconType), oe.playing && oe.title) {
        const h = oe.artist ? ` - ${oe.artist}` : "";
        document.title = `▶ ${oe.title}${h}`;
        return;
      }
      if (Co.playing && Co.title) {
        document.title = `▶ ${Co.title} · 电台`;
        return;
      }
      document.title = l.title;
    }
    Pe(
      [
        () => Go.value,
        () => oe.playing,
        () => oe.title,
        () => oe.artist,
        () => Co.playing,
        () => Co.title
      ],
      () => {
        g();
      },
      { immediate: !0 }
    );
    const f = te(() => Go.value === "home" ? "" : Go.value);
    return Pe(() => Tt.activeId, Ui, { immediate: !0, flush: "sync" }), Xe(() => {
      typeof document < "u" && (document.body.dataset.spa = "1");
      try {
        ei.bindGlobalListener(), Ye.start(), Ni.start(), Yn.init().catch((l) => console.warn("[Launcher] 初始化失败", l)), $h(), typeof chrome < "u" && chrome?.runtime?.sendMessage && setTimeout(() => {
          try {
            chrome.runtime.sendMessage({ type: "cleanupNativeTabs" }, () => {
              chrome.runtime?.lastError;
            });
          } catch {
          }
        }, 400);
      } catch (l) {
        console.warn("[App] Runtime start error:", l);
      }
    }), Nt(() => {
      Ye.stop(), Yn.stop(), Ni.stop(), document.body.classList.remove("has-card-fullscreen"), typeof document < "u" && o && (document.title = o);
    }), t({
      activeWorkspaceId: f,
      windowManagerController: Be
    }), (l, h) => (c(), p("div", {
      id: "logicweaver-spa-root",
      class: "logicweaver-spa-root",
      "data-active-workspace": f.value || ""
    }, [
      Z(gl),
      Z(Wu),
      Z(Ku),
      n("nav", {
        id: "mac-dock",
        class: de(["mac-dock", "dock-" + i(no).position]),
        "aria-label": "快捷应用栏"
      }, [
        Z(xs)
      ], 2),
      Z(Lh)
    ], 8, Sh));
  }
}), Ih = /* @__PURE__ */ Ne(Th, [["__scopeId", "data-v-7c00288c"]]), Mh = {
  class: "endfield-stage",
  "aria-hidden": "true"
}, Dh = {
  class: "rhinelab-stage",
  "aria-hidden": "true"
}, Ah = { class: "rhine-scaler" }, Eh = { class: "rhine-center-group" }, Ph = { class: "rhine-auth-status" }, Wh = { class: "rhine-auth-text" }, Rh = ["hidden"], Nh = { class: "rhine-cinema-caption" }, Oh = /* @__PURE__ */ fe({
  __name: "IntroAnimation",
  setup(e) {
    const t = V(window.innerHeight), o = V(window.innerWidth), s = V(!1), a = V(!1), r = V(10), g = V(1), f = V(0), l = /* @__PURE__ */ new Set();
    let h = 0, x = () => {
    };
    const F = te(() => `${String(Math.round(lt.renderedProgress)).padStart(2, "0")}%`), m = te(() => {
      const M = lt.renderedProgress / 100 * t.value + 10;
      return `${Math.min(M, Math.max(0, t.value - 102)).toFixed(1)}px`;
    }), D = te(() => lt.renderedProgress >= 75 ? "START PROCESSING..." : lt.renderedProgress >= 35 ? "REQUEST RECEIVED" : "ID CONFIRMED : JOYCE MOORE"), v = te(() => lt.finished ? "身份验证通过 · 欢迎进入终端" : lt.status ? `身份信息确认 · ${lt.status.replace(/^.*?\/\s*/, "")}` : "身份信息确认：JOYCE MOORE"), w = te(() => String(Math.max(0.35, Math.min(o.value / 1920, t.value / 1080))));
    function T(M, k) {
      const $ = window.setTimeout(() => {
        l.delete($), M();
      }, k);
      l.add($);
    }
    function y() {
      window.dispatchEvent(new CustomEvent("logicweaver:intro-complete"));
    }
    function _(M) {
      if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
        y();
        return;
      }
      const k = M ? 180 : 260, $ = M ? 200 : 280, ee = performance.now(), R = (G) => {
        const N = G - ee, Y = Math.min(1, N / k), me = 1 - Math.pow(1 - Y, 3);
        if (r.value = 10 + me * Math.max(0, o.value - 10), N > k && (g.value = Math.max(0, 1 - (N - k) / $)), N >= k + $) {
          y();
          return;
        }
        h = requestAnimationFrame(R);
      };
      T(() => {
        h = requestAnimationFrame(R);
      }, M ? 60 : 120);
    }
    function L(M) {
      M || (s.value = !0), T(() => {
        a.value = !0, f.value = 6, g.value = 0, T(y, 380);
      }, M ? 40 : 420);
    }
    function B(M) {
      lt.style === "rhinelab" ? L(M) : _(M);
    }
    function H() {
      o.value = window.innerWidth, t.value = window.innerHeight;
    }
    function U(M) {
      lt.finished || (M.key === "Enter" || M.key === " " || M.key === "Escape") && (M.preventDefault(), yt.skip("KEYBOARD SKIP"));
    }
    return Xe(() => {
      document.documentElement.dataset.startupStyle = lt.style, document.documentElement.style.setProperty("--rhine-scale", w.value), window.addEventListener("resize", H, { passive: !0 }), window.addEventListener("keydown", U, !0), x = Pa(B), is();
    }), mo(() => {
      x(), window.removeEventListener("resize", H), window.removeEventListener("keydown", U, !0), cancelAnimationFrame(h);
      for (const M of l) clearTimeout(M);
      l.clear();
    }), (M, k) => (c(), p("div", {
      class: "intro-vue-content",
      style: xe({ "--rhine-scale": w.value, opacity: g.value, filter: `blur(${f.value}px)` })
    }, [
      n("div", Mh, [
        k[2] || (k[2] = n("div", { class: "endfield-loader-texture" }, null, -1)),
        k[3] || (k[3] = n("div", { class: "endfield-loader-rail" }, null, -1)),
        n("div", {
          class: "endfield-loader-fill",
          style: xe({ height: `${i(lt).renderedProgress}%` })
        }, null, 4),
        n("div", {
          class: "endfield-loader-meter",
          style: xe({ top: m.value })
        }, [
          k[1] || (k[1] = n("span", { class: "endfield-loader-tick" }, null, -1)),
          n("b", null, u(F.value), 1),
          n("small", null, u(i(lt).status), 1)
        ], 4),
        k[4] || (k[4] = Io('<section class="endfield-loader-brand"><span class="endfield-loader-kicker">DEEPSEEK HARNESS</span><strong>END</strong><strong>FIELD</strong><span class="endfield-loader-detail"><i class="endfield-loader-chevron"></i><span>EDGE INTELLIGENCE THEME</span><small>TERRA RESEARCH COMMISSION / BOOT SEQUENCE</small><span class="endfield-loader-squares"><i class="on"></i><i class="on"></i><i class="on"></i><i></i><i></i><i></i><i class="on"></i><i class="on"></i><i></i><i></i><i></i><i></i></span></span><em>OVER THE FRONTIER / INTO THE FRONT</em></section>', 1)),
        n("div", {
          class: "endfield-loader-wipe",
          style: xe({ width: `${r.value}px`, opacity: r.value > 10 ? 1 : 0 })
        }, null, 4)
      ]),
      n("div", Dh, [
        k[12] || (k[12] = Io('<div class="rhine-background"><svg viewBox="0 0 1920 1080" preserveAspectRatio="none"><g fill="none" stroke="#ffffff" stroke-width="2.5"><path class="rhine-drift-path1" d="M-210 705C-45 705 182 704 247 567C337 377 99 306 4 435S27 680 169 631C309 584 227 314 279 111S568-113 568-113"></path><path class="rhine-drift-path2" d="M1560-80C1374 114 1671 168 1601 323S1371 367 1431 480S1692 666 1559 787S1329 886 1498 1130"></path><circle class="rhine-drift-circle" cx="1450" cy="648" r="346"></circle><circle class="rhine-drift-circle2" cx="1450" cy="648" r="348"></circle></g></svg></div>', 1)),
        n("div", Ah, [
          k[10] || (k[10] = Io('<header class="rhine-brand"><h1>RHINE LAB</h1><div class="rhine-brand-sub">SYNTHESIZE INFORMATION</div><p class="rhine-brand-os"><span class="rhine-brand-analysis"><span style="left:2px;">A</span><span style="left:28px;">N</span><span style="left:55px;">A</span><span style="left:81px;">L</span><span style="left:103px;">Y</span><span style="left:129px;">S</span><span style="left:154px;">I</span><span style="left:166px;">S</span></span><b>OS</b></p></header>', 1)),
          n("button", {
            class: "rhine-skip",
            type: "button",
            title: "点击进入系统 (或按 Enter)",
            onClick: k[0] || (k[0] = ($) => i(yt).skip("ENTER SYSTEM"))
          }, [...k[5] || (k[5] = [
            ot("ENTER SYSTEM ", -1),
            n("span", null, "↗", -1)
          ])]),
          n("div", Eh, [
            k[8] || (k[8] = n("div", { class: "rhine-logo-box" }, [
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
            n("div", Ph, [
              k[6] || (k[6] = n("span", { class: "rhine-auth-dot" }, "·", -1)),
              n("span", Wh, u(D.value), 1),
              k[7] || (k[7] = n("i", {
                class: "rhine-cursor",
                "aria-hidden": "true"
              }, null, -1))
            ])
          ]),
          n("div", {
            class: de(["rhine-scan", { active: s.value }]),
            hidden: !s.value
          }, [...k[9] || (k[9] = [
            Io('<svg viewBox="0 0 1920 1080" aria-hidden="true"><g fill="none" stroke="#080a08" stroke-linecap="round"><circle class="rhine-scan-circle ring-outer" cx="960" cy="540" r="280" stroke-width="2.5"></circle><circle class="rhine-scan-circle ring-white" cx="960" cy="540" r="260" stroke="#fff" stroke-width="3.5"></circle><circle class="rhine-scan-circle ring-inner" cx="960" cy="540" r="220" stroke-width="2"></circle><circle class="rhine-orbit-dot dot-1" cx="960" cy="260" r="8" fill="#ed821b" stroke="none"></circle><circle class="rhine-orbit-dot dot-2" cx="960" cy="820" r="8" fill="#ed821b" stroke="none"></circle><circle class="rhine-scan-core" cx="960" cy="540" r="6" fill="#080a08" stroke="none"></circle></g></svg><span class="rhine-scan-label">PERMISSION AUTHORIZED</span>', 2)
          ])], 10, Rh),
          n("div", Nh, u(v.value), 1),
          k[11] || (k[11] = n("div", { class: "rhine-powered" }, [
            ot("POWERED BY "),
            n("b", null, "RHINE LAB"),
            n("i")
          ], -1))
        ]),
        n("div", {
          class: de(["rhine-white", { flash: a.value }]),
          "aria-hidden": "true"
        }, null, 2)
      ])
    ], 4));
  }
}), Bh = /* @__PURE__ */ fe({
  __name: "ProfileMenu",
  setup(e) {
    function t(o) {
      Fo.trigger(o);
    }
    return (o, s) => (c(), p(Q, null, [
      n("button", {
        type: "button",
        "data-action": "messages",
        onClick: s[0] || (s[0] = z((a) => t("messages"), ["stop"]))
      }, u(i(d)("profile.menu.notifications")), 1),
      n("button", {
        type: "button",
        "data-action": "tabs",
        onClick: s[1] || (s[1] = z((a) => t("tabs"), ["stop"]))
      }, u(i(d)("profile.menu.tabs")), 1),
      n("button", {
        type: "button",
        "data-action": "refresh",
        onClick: s[2] || (s[2] = z((a) => t("refresh"), ["stop"]))
      }, u(i(d)("profile.menu.refreshBili")), 1),
      n("button", {
        type: "button",
        "data-action": "switch",
        onClick: s[3] || (s[3] = z((a) => t("switch"), ["stop"]))
      }, u(i(d)("profile.menu.switchUser")), 1),
      n("button", {
        type: "button",
        "data-action": "web",
        onClick: s[4] || (s[4] = z((a) => t("web"), ["stop"]))
      }, u(i(d)("profile.menu.biliCenter")), 1)
    ], 64));
  }
}), Fh = /* @__PURE__ */ fe({
  __name: "WorkspaceLaunchers",
  setup(e) {
    function t(o) {
      ui.openWorkspace(o, !0);
    }
    return (o, s) => (c(), p(Q, null, [
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
      un(o.$slots, "default")
    ], 64));
  }
}), Hh = {
  key: 0,
  "aria-label": "AI 分析任务"
}, Kh = { role: "status" }, jh = ["disabled"], zh = ["disabled"], Vh = /* @__PURE__ */ fe({
  __name: "GitHubStatus",
  setup(e) {
    return (t, o) => i(rt).message || i(rt).busy ? (c(), p("section", Hh, [
      n("p", Kh, u(i(rt).repo ? `原任务仓库：${i(rt).repo}。 ` : "") + u(i(rt).message), 1),
      i(rt).busy ? (c(), p("button", {
        key: 0,
        type: "button",
        onClick: o[0] || (o[0] = (s) => i(Ve).stopAiAnalysis())
      }, "停止后续分析 / 中断等待")) : E("", !0),
      i(rt).uncertain ? (c(), p(Q, { key: 1 }, [
        o[5] || (o[5] = n("p", null, "AI 结果未确认，已阻止本页再次提交。请到供应商核对请求和计费；本页记录在整页关闭或重载后会丢失。", -1)),
        i(rt).unlockConfirmation ? (c(), p(Q, { key: 1 }, [
          o[4] || (o[4] = n("p", null, "扩展不能验证供应商任务；确认只解除本页限制，不代表成功，也不会重发请求。", -1)),
          n("button", {
            type: "button",
            disabled: i(rt).busy,
            onClick: o[2] || (o[2] = (s) => i(Ve).acknowledgeAiChecked())
          }, "确认解除本页限制", 8, zh),
          n("button", {
            type: "button",
            onClick: o[3] || (o[3] = (s) => i(rt).unlockConfirmation = !1)
          }, "保持限制")
        ], 64)) : (c(), p("button", {
          key: 0,
          type: "button",
          disabled: i(rt).busy,
          onClick: o[1] || (o[1] = (s) => i(rt).unlockConfirmation = !0)
        }, "我已核对供应商记录", 8, jh))
      ], 64)) : E("", !0)
    ])) : E("", !0);
  }
});
function on(e) {
  return {
    id: e.full_name,
    title: e.name,
    url: e.html_url || `https://github.com/${e.full_name}`,
    customIcon: e.owner?.avatar_url || "assets/github-star.svg"
  };
}
function Gh(e, t, o, s, a) {
  const r = a || "默认", f = t.filter((h) => (h.section || "默认") === r).map((h) => ({
    key: `list:${h.id}`,
    kind: "folder",
    title: h.name,
    list: h,
    repos: e.filter((x) => o.get(x.full_name.toLowerCase())?.includes(h.name))
  }));
  for (const h of e)
    o.get(h.full_name.toLowerCase())?.length || f.push({ key: `repo:${h.full_name.toLowerCase()}`, kind: "repo", title: h.name, repo: h });
  const l = new Map(s.map((h, x) => [h, x]));
  return f.sort((h, x) => (l.get(h.key) ?? s.length) - (l.get(x.key) ?? s.length));
}
function Oi(e, t, o) {
  const s = e.indexOf(t), a = e.indexOf(o);
  if (s < 0 || a < 0 || s === a) return [...e];
  const r = [...e];
  return r.splice(s, 1), r.splice(a, 0, t), r;
}
function Uh(e) {
  return Array.isArray(e) ? [...new Set(e.filter((t) => typeof t == "string" && t.length <= 300 && /^(list|repo):.+/.test(t)))].slice(0, 2e3) : [];
}
const Yh = {
  key: 0,
  class: "gh-shortcut-status",
  role: "status"
}, Xh = ["data-gh-tile", "data-gh-list-drop", "onDragover", "onDrop"], qh = ["aria-label", "title", "onContextmenu", "onClick", "onPointerdown", "onKeydown"], Jh = {
  key: 1,
  class: "gh-shortcut-help"
}, Zh = ["disabled"], Qh = ["data-gh-list-drop"], ef = { class: "gh-shortcut-help" }, tf = { class: "gh-folder-repo-grid" }, of = ["title", "onContextmenu", "onClick", "onPointerdown"], nf = {
  key: 0,
  class: "gh-shortcut-help"
}, sf = ["aria-label"], af = { class: "gh-shortcut-menu-title" }, rf = ["disabled"], lf = /* @__PURE__ */ fe({
  __name: "GitHubFolders",
  props: {
    active: { type: Boolean, default: !0 }
  },
  emits: ["select"],
  setup(e, { emit: t }) {
    const o = e, s = t, a = V(null), r = V(""), g = V(""), f = V([]), l = V(""), h = V(null), x = te(() => h.value?.ownerKey === Te.ownerKey ? Te.repos.find((I) => I.full_name === h.value?.fullName) : void 0), F = te(() => !!(x.value && Te.repoListNames.get(x.value.full_name.toLowerCase())?.length));
    function m() {
      h.value = null;
    }
    const { menuRef: D, style: v } = di({
      visible: () => o.active && !!x.value,
      anchor: () => h.value || { x: 0, y: 0 },
      dismiss: m
    });
    function w(I, O) {
      I.preventDefault(), I.stopPropagation(), o.active && (nt(), h.value = { fullName: O.full_name, ownerKey: Te.ownerKey, x: I.clientX, y: I.clientY });
    }
    function T() {
      const I = x.value;
      !I || !F.value || dt.busy || !o.active || (m(), Y(I.full_name, "未分类"));
    }
    function y() {
      const I = x.value;
      m(), I && R(I);
    }
    let _ = 0, L = 0, B = Promise.resolve();
    const H = te(() => Gh(Te.repos, Te.lists, Te.repoListNames, f.value, Te.activeSection)), U = te(() => H.value.find((I) => I.kind === "folder" && I.list.id === r.value)), M = te(() => U.value?.kind === "folder" ? U.value.repos : []);
    function k(I) {
      return I.kind === "folder" ? { title: I.title, preview: I.repos.slice(0, 4).map(on), count: Math.max(I.repos.length, I.list.totalCount) } : void 0;
    }
    const $ = () => Te.ownerKey ? `ghSidebarTileOrderV1:${Te.ownerKey}:${Te.activeSection || "default"}` : "";
    function ee() {
      ++_;
      const I = $(), O = [...f.value];
      I && (B = B.catch(() => {
      }).then(async () => {
        try {
          typeof chrome < "u" && chrome.storage?.local ? await chrome.storage.local.set({ [I]: O }) : localStorage.setItem(I, JSON.stringify(O)), I === $() && (l.value = "");
        } catch {
          I === $() && (l.value = "顺序暂未保存，本页仍可使用。");
        }
      }));
    }
    function R(I) {
      !o.active || Date.now() < j || (m(), r.value = "", s("select"), Yi.open(I.full_name, void 0, I));
    }
    function G(I) {
      if (!(!o.active || Date.now() < j)) {
        if (I.kind === "repo") {
          R(I.repo);
          return;
        }
        m(), r.value = r.value === I.list.id ? "" : I.list.id, Do.select(I.title), s("select");
      }
    }
    function N(I) {
      return o.active && !dt.busy && Xi.folders.some((O) => O.title === I && (O.kind === "custom" || O.kind === "uncategorized"));
    }
    function Y(I, O) {
      N(O) && Te.repos.some((K) => K.full_name.toLowerCase() === I.toLowerCase()) && Do.dropRepository(I, O);
    }
    function me(I, O) {
      !N(O) || !Array.from(I.dataTransfer?.types || []).includes(Qs) || (I.preventDefault(), I.stopPropagation(), I.dataTransfer && (I.dataTransfer.dropEffect = "move"), g.value = O);
    }
    function Ce(I, O) {
      g.value = "";
      const K = ea(I.dataTransfer);
      !K || !N(O) || (I.preventDefault(), I.stopPropagation(), Y(K, O));
    }
    function qe(I) {
      const O = I.currentTarget;
      O instanceof Node && I.relatedTarget instanceof Node && O.contains(I.relatedTarget) || (g.value = "");
    }
    const A = $e({ visible: !1, x: 0, y: 0, offsetX: 0, offsetY: 0, tile: null });
    let W = null, j = 0, ve = 0, ke = "", Se, we = null;
    function We() {
      we?.classList.remove("gh-sidebar-pointer-drop"), we = null;
    }
    function Qe(I, O) {
      if (I.button !== 0 || !o.active || dt.busy) return;
      nt(), m();
      const K = I.currentTarget.getBoundingClientRect();
      W = { pointer: I.pointerId, x: I.clientX, y: I.clientY, owner: Te.ownerKey, tile: O, original: [...f.value] }, A.x = I.clientX, A.y = I.clientY, A.offsetX = I.clientX - K.left, A.offsetY = I.clientY - K.top, A.tile = O, window.addEventListener("pointermove", Ot, { passive: !1 }), window.addEventListener("pointerup", Ut), window.addEventListener("pointercancel", nt);
    }
    function Oe(I, O) {
      Qe(I, { key: `repo:${O.full_name.toLowerCase()}`, kind: "repo", title: O.name, repo: O });
    }
    function It() {
      if (We(), g.value = "", !W || !A.visible) return;
      const I = document.elementFromPoint(A.x, A.y), O = I?.closest("[data-gh-list-drop]"), K = O?.dataset.ghListDrop;
      if (W.tile.kind === "repo" && K && N(K) && O && (!O.hasAttribute("data-gh-tile") || ks(O.getBoundingClientRect(), A.x, A.y))) {
        g.value = K, we = O, O.classList.add("gh-sidebar-pointer-drop");
        return;
      }
      const he = I?.closest("[data-gh-tile]"), ft = he?.dataset.ghTile;
      if (!ft || !he || ft === W.tile.key || !_s(he.getBoundingClientRect(), A.x, A.y) || ft === ke || Date.now() - ve < bs) return;
      const bt = H.value.map((Bt) => Bt.key);
      bt.includes(W.tile.key) && (f.value = Oi(bt, W.tile.key, ft), ke = ft, ve = Date.now());
    }
    function Ot(I) {
      !W || I.pointerId !== W.pointer || (A.x = I.clientX, A.y = I.clientY, !(!A.visible && Math.hypot(I.clientX - W.x, I.clientY - W.y) < ws) && (I.preventDefault(), A.visible || (++_, A.visible = !0, Se = setInterval(() => {
        const K = document.elementFromPoint(A.x, A.y)?.closest(".gh-bili-folder-list, .gh-shortcut-window-content");
        if (K) {
          const he = K.getBoundingClientRect();
          A.y < he.top + 36 ? K.scrollTop -= 12 : A.y > he.bottom - 36 && (K.scrollTop += 12);
        }
        It();
      }, 32)), It()));
    }
    function Ut(I) {
      if (!W || I.pointerId !== W.pointer) return;
      A.visible && (A.x = I.clientX, A.y = I.clientY, It());
      const O = W, K = A.visible, he = g.value;
      if (K) {
        I.preventDefault(), j = Date.now() + 300, O.owner === Te.ownerKey && he && O.tile.kind === "repo" && Y(O.tile.repo.full_name, he);
        const ft = O.original.length !== f.value.length || O.original.some((bt, Bt) => f.value[Bt] !== bt);
        O.owner === Te.ownerKey && !he && ft && ee();
      }
      he && (f.value = O.original), yo();
    }
    function yo() {
      We(), clearInterval(Se), Se = void 0, window.removeEventListener("pointermove", Ot), window.removeEventListener("pointerup", Ut), window.removeEventListener("pointercancel", nt), A.visible = !1, A.tile = null, W = null, g.value = "", ke = "", ve = 0;
    }
    function nt() {
      W && (f.value = W.original, A.visible && (j = Date.now() + 300)), yo();
    }
    function Ho(I, O) {
      if (!I.altKey || !["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(I.key)) return;
      I.preventDefault();
      const K = H.value.map((Bt) => Bt.key), he = K.indexOf(O.key), ft = I.key === "ArrowLeft" ? -1 : I.key === "ArrowRight" ? 1 : I.key === "ArrowUp" ? -2 : 2, bt = K[he + ft];
      bt && (f.value = Oi(K, O.key, bt), ee());
    }
    function Ko(I) {
      const O = I.target;
      !W && !a.value?.contains(O) && !O?.closest("#gh-list-shortcut-window, .gh-shortcut-context-menu") && (r.value = "");
    }
    function wo(I) {
      I.key === "Escape" && (nt(), m(), r.value = "");
    }
    function jo() {
      document.hidden && (nt(), m(), r.value = "");
    }
    function Yt() {
      g.value = "";
    }
    Pe(() => [Te.ownerKey, Te.activeSection], async () => {
      const I = ++L;
      nt(), m(), r.value = "", f.value = [], l.value = "";
      const O = $(), K = ++_;
      if (O)
        try {
          const he = typeof chrome < "u" && chrome.storage?.local ? (await chrome.storage.local.get(O))[O] : JSON.parse(localStorage.getItem(O) || "[]");
          I === L && K === _ && (f.value = Uh(he));
        } catch {
          I === L && (l.value = "图标顺序读取失败，可继续操作。");
        }
    }, { immediate: !0 });
    const zo = /* @__PURE__ */ new Set();
    return Pe(() => [o.active, Te.ownerKey, Te.loading], ([I, O, K]) => {
      !I || !O || K || zo.has(O) || (zo.add(O), Ve.ensureAllStarsLoaded());
    }, { immediate: !0 }), Pe(() => o.active, (I) => {
      I || (nt(), m(), r.value = "");
    }), Pe(() => U.value, (I) => {
      I || (r.value = "");
    }), Pe(x, (I) => {
      I || m();
    }), Xe(() => {
      window.addEventListener("pointerdown", Ko), window.addEventListener("keydown", wo), window.addEventListener("blur", nt), window.addEventListener("dragend", Yt), window.addEventListener("drop", Yt), document.addEventListener("visibilitychange", jo);
    }), mo(() => {
      ++L, nt(), window.removeEventListener("pointerdown", Ko), window.removeEventListener("keydown", wo), window.removeEventListener("blur", nt), window.removeEventListener("dragend", Yt), window.removeEventListener("drop", Yt), document.removeEventListener("visibilitychange", jo);
    }), (I, O) => (c(), p("div", {
      ref_key: "root",
      ref: a,
      class: "gh-shortcut-sidebar"
    }, [
      i(dt).message || l.value ? (c(), p("p", Yh, u(i(dt).message || l.value), 1)) : E("", !0),
      Z(Oo, {
        name: "gh-shortcut",
        tag: "div",
        class: "gh-shortcut-grid"
      }, {
        default: Et(() => [
          (c(!0), p(Q, null, be(H.value, (K) => (c(), p("div", {
            key: K.key,
            class: de(["gh-shortcut-cell", { "is-dragging": A.visible && A.tile?.key === K.key, "drop-into": K.kind === "folder" && g.value === K.title }]),
            "data-gh-tile": K.key,
            "data-gh-list-drop": K.kind === "folder" ? K.title : void 0,
            onDragover: (he) => K.kind === "folder" && me(he, K.title),
            onDragleave: qe,
            onDrop: (he) => K.kind === "folder" && Ce(he, K.title)
          }, [
            n("button", {
              type: "button",
              class: "gh-shortcut-tile",
              "aria-label": K.kind === "folder" ? `打开本地分组 ${K.title}` : `查看仓库 ${K.repo.full_name}`,
              title: K.kind === "folder" ? `${K.title}（拖入将加入本地分组，保留其他归属）` : K.repo.full_name,
              onContextmenu: (he) => K.kind === "repo" && w(he, K.repo),
              onClick: (he) => G(K),
              onPointerdown: (he) => Qe(he, K),
              onDragstart: O[0] || (O[0] = z(() => {
              }, ["prevent"])),
              onKeydown: (he) => Ho(he, K)
            }, [
              Z(Ro, {
                link: K.kind === "repo" ? i(on)(K.repo) : void 0,
                folder: k(K)
              }, null, 8, ["link", "folder"])
            ], 40, qh)
          ], 42, Xh))), 128))
        ]),
        _: 1
      }),
      H.value.length ? E("", !0) : (c(), p("p", Jh, u(i(Te).loading ? "正在读取仓库与列表…" : "暂无本地分组或未分类仓库"), 1)),
      (c(), pe(wt, { to: "body" }, [
        U.value && e.active ? (c(), pe(i(La), {
          key: 0,
          id: "gh-list-shortcut-window",
          "window-id": "gh-list-shortcut",
          title: U.value.title,
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
            r.value = "", m();
          })
        }, {
          "header-actions": Et(() => [
            n("button", {
              type: "button",
              class: "gh-folder-delete-action",
              disabled: i(dt).busy,
              title: "删除本地分组（不会取消 Star）",
              onClick: O[1] || (O[1] = (K) => i(Do).delete(U.value.title))
            }, "删除分组", 8, Zh)
          ]),
          default: Et(() => [
            n("div", {
              class: de(["gh-shortcut-window-content", { "drop-into": g.value === U.value.title }]),
              "data-gh-list-drop": U.value.title,
              onDragover: O[3] || (O[3] = (K) => me(K, U.value.title)),
              onDragleave: qe,
              onDrop: O[4] || (O[4] = (K) => Ce(K, U.value.title))
            }, [
              n("p", ef, u(M.value.length) + " 个已加载仓库 · 可拖到其他文件夹以加入本地分组", 1),
              n("div", tf, [
                (c(!0), p(Q, null, be(M.value, (K) => (c(), p("div", {
                  key: K.full_name,
                  class: "gh-folder-repo-cell"
                }, [
                  n("button", {
                    type: "button",
                    class: "gh-shortcut-tile",
                    title: K.full_name,
                    onContextmenu: (he) => w(he, K),
                    onClick: (he) => R(K),
                    onPointerdown: (he) => Oe(he, K),
                    onDragstart: O[2] || (O[2] = z(() => {
                    }, ["prevent"]))
                  }, [
                    Z(Ro, {
                      link: i(on)(K)
                    }, null, 8, ["link"])
                  ], 40, of)
                ]))), 128))
              ]),
              M.value.length ? E("", !0) : (c(), p("p", nf, u(i(Te).loading ? "正在读取…" : "空文件夹，可拖入仓库"), 1))
            ], 42, Qh)
          ]),
          _: 1
        }, 8, ["title"])) : E("", !0),
        x.value && e.active ? (c(), p("div", {
          key: 1,
          ref_key: "menuRef",
          ref: D,
          class: "gh-shortcut-context-menu",
          style: xe(i(v)),
          role: "menu",
          "aria-label": x.value.full_name + " 操作",
          onPointerdown: O[6] || (O[6] = z(() => {
          }, ["stop"])),
          onClick: O[7] || (O[7] = z(() => {
          }, ["stop"])),
          onContextmenu: O[8] || (O[8] = z(() => {
          }, ["prevent"]))
        }, [
          n("div", af, u(x.value.full_name), 1),
          n("button", {
            type: "button",
            role: "menuitem",
            onClick: y
          }, "查看仓库详情"),
          n("button", {
            type: "button",
            role: "menuitem",
            disabled: i(dt).busy || !F.value,
            title: "从所有本地分组移出，保留 GitHub 收藏",
            onClick: T
          }, "移到未分组", 8, rf)
        ], 44, sf)) : E("", !0),
        A.visible && A.tile ? (c(), p("div", {
          key: 2,
          class: "gh-shortcut-ghost gh-shortcut-tile",
          style: xe({ left: `${A.x - A.offsetX}px`, top: `${A.y - A.offsetY}px` })
        }, [
          Z(Ro, {
            link: A.tile.kind === "repo" ? i(on)(A.tile.repo) : void 0,
            folder: k(A.tile)
          }, null, 8, ["link", "folder"])
        ], 4)) : E("", !0)
      ]))
    ], 512));
  }
}), cf = /* @__PURE__ */ Ne(lf, [["__scopeId", "data-v-5b72c353"]]), df = { class: "gh-hero-left" }, uf = {
  id: "gh-hero-cover",
  class: "gh-bili-cover"
}, pf = { key: 0 }, hf = { key: 1 }, ff = {
  key: 2,
  class: "fo-folder-icon"
}, gf = { class: "gh-bili-heading" }, mf = { class: "gh-hero-title-row" }, vf = ["title"], yf = {
  class: "gh-hero-sections-tabs",
  role: "tablist",
  "aria-label": "收藏大分组标签"
}, wf = ["title", "onClick", "onContextmenu"], bf = ["role", "aria-live"], kf = ["title"], _f = ["title", "aria-label"], Cf = { id: "gh-hero-desc" }, xf = { class: "gh-hero-search-area" }, Lf = { class: "gh-bili-actions" }, $f = ["title"], Sf = { class: "gh-batch-btn-text" }, Tf = ["title"], If = ["title"], Mf = /* @__PURE__ */ fe({
  __name: "GitHubHero",
  emits: ["open-ai-settings", "open-guide"],
  setup(e, { emit: t }) {
    const o = t;
    async function s() {
      let r;
      try {
        r = await bi.prompt({
          title: "新建分组标签",
          message: "创建一个新的顶层分组标签（类似常用网站的分区）：",
          placeholder: "分组名称（如：工作区、AI、工具）…"
        });
      } catch {
        return;
      }
      const g = r?.trim();
      g && await Ve.createSection(g);
    }
    async function a(r, g) {
      if (r.preventDefault(), r.stopPropagation(), g === "默认" && Te.sections.length === 1) return;
      await bi.confirm({
        title: "删除分组标签",
        message: `确定删除分组标签「${g}」吗？里面的文件夹会自动合并至默认分组，仓库不会丢失。`,
        danger: !0
      }) && await Ve.deleteSection(g);
    }
    return (r, g) => (c(), p(Q, null, [
      n("div", df, [
        n("div", uf, [
          i(Ft).kind === "all" ? (c(), p("span", pf, "⭐")) : i(Ft).kind === "uncategorized" ? (c(), p("span", hf, "📄")) : (c(), p("i", ff))
        ]),
        n("div", gf, [
          n("div", mf, [
            n("h3", {
              id: "gh-hero-title",
              title: i(Ft).title
            }, u(i(Ft).title), 9, vf),
            n("div", yf, [
              (c(!0), p(Q, null, be(i(Te).sections, (f) => (c(), p("button", {
                key: f,
                type: "button",
                class: de(["gh-section-tab", { active: f === i(Te).activeSection }]),
                title: `切换到分组「${f}」；右键可删除此标签`,
                onClick: (l) => i(Ve).switchSection(f),
                onContextmenu: (l) => a(l, f)
              }, u(f), 43, wf))), 128)),
              n("button", {
                type: "button",
                class: "gh-section-add-btn",
                title: "添加新分组标签",
                "aria-label": "添加新分组标签",
                onClick: s
              }, " ＋ ")
            ]),
            i(jt).actionText ? (c(), p("div", {
              key: 0,
              class: de(["gh-hero-inline-status", { "is-error": i(jt).actionError }]),
              role: i(jt).actionError ? "alert" : "status",
              "aria-live": i(jt).actionError ? "assertive" : "polite",
              "aria-atomic": "true"
            }, [
              n("span", {
                class: "gh-hero-status-text",
                title: i(jt).actionText
              }, u(i(jt).actionText), 9, kf),
              n("button", {
                type: "button",
                title: i(d)("github.hero.closeTip"),
                "aria-label": i(d)("github.hero.closeTip"),
                onClick: g[0] || (g[0] = (f) => i(ai).update({ actionText: "", actionError: !1 }))
              }, "×", 8, _f)
            ], 10, bf)) : E("", !0)
          ]),
          n("p", Cf, u(i(Ft).description), 1)
        ])
      ]),
      n("div", xf, [
        un(r.$slots, "search", {}, void 0, !0)
      ]),
      n("div", Lf, [
        un(r.$slots, "actions-prefix", {}, void 0, !0),
        n("button", {
          type: "button",
          class: "gh-hero-btn gh-github-help-btn",
          title: "GitHub 使用手册",
          "aria-label": "打开 GitHub 使用手册",
          onClick: g[1] || (g[1] = (f) => o("open-guide"))
        }, "?"),
        n("button", {
          id: "gh-batch-toggle-btn",
          type: "button",
          class: de(["gh-hero-btn gh-batch-toggle-btn", { active: i(Ft).batchMode }]),
          title: i(d)("github.hero.batchToggle"),
          onClick: g[2] || (g[2] = (f) => i(Ao).toggleBatch())
        }, [
          g[5] || (g[5] = n("span", { class: "gh-batch-btn-icon" }, "☑", -1)),
          n("span", Sf, u(i(Ft).batchMode ? i(d)("github.hero.batchBack") : i(d)("github.hero.batch")), 1)
        ], 10, $f),
        n("button", {
          id: "gh-refresh-btn",
          type: "button",
          class: "gh-hero-btn",
          title: i(d)("github.hero.refreshTitle"),
          onClick: g[3] || (g[3] = (f) => i(Ao).refresh())
        }, u(i(d)("github.hero.refresh")), 9, Tf),
        n("button", {
          id: "gh-hero-add-folder-btn",
          type: "button",
          class: "gh-hero-btn primary",
          title: i(d)("github.hero.addFolderTitle"),
          onClick: g[4] || (g[4] = (f) => i(Ao).createFolder())
        }, u(i(d)("github.hero.addFolder")), 9, If)
      ])
    ], 64));
  }
}), Df = /* @__PURE__ */ Ne(Mf, [["__scopeId", "data-v-2869cb71"]]), ae = $e({ repo: "", text: "", baseline: "", busy: !1, message: "", storedValue: null });
function Bi(e, t = !1) {
  if (!e || ae.busy) return;
  if (ae.repo && ae.text !== ae.baseline) {
    ae.message = "请先保存或明确取消当前草稿，再编辑或清除其它备注。";
    return;
  }
  const o = Ve.remarks[e]?.userRemark, s = typeof o == "string" ? o : "";
  Object.assign(ae, {
    repo: e,
    baseline: s,
    text: t ? "" : s,
    storedValue: null,
    message: t ? "清除已准备；点击保存才会清除手写备注，AI 简介不变。" : "仅点击保存或 Enter 才写入；草稿只保留在本页内存。"
  });
}
function Vn() {
  ae.busy || Object.assign(ae, { repo: "", text: "", baseline: "", storedValue: null, message: "" });
}
async function Gn() {
  if (ae.busy || !ae.repo) return;
  const { repo: e, text: t, baseline: o } = ae;
  ae.busy = !0;
  try {
    await Ve.updateRepoRemark(e, { userRemark: t.trim() }, o), Object.assign(ae, { repo: "", text: "", baseline: "", storedValue: null, message: `${e} 的备注已保存并回读核对。` });
  } catch (s) {
    ae.message = s instanceof Error ? s.message : "保存未确认，草稿保留，请先读取已保存值核对。";
  } finally {
    ae.busy = !1;
  }
}
async function Fi() {
  if (ae.busy || !ae.repo) return;
  const e = ae.repo;
  ae.busy = !0;
  try {
    const o = (await Ve.reloadRepoRemarks())[e]?.userRemark;
    if (o !== void 0 && typeof o != "string") throw new Error("保存值格式异常，未变更草稿或覆盖基准。");
    ae.storedValue = o ?? "", ae.baseline = o ?? "", ae.message = "已读取保存值，草稿没有替换。请对比下方保存值；再次点击保存将以草稿替换它。";
  } catch (t) {
    ae.message = t instanceof Error ? t.message : "读取失败，草稿保留。";
  } finally {
    ae.busy = !1;
  }
}
const Af = ["disabled"], Ef = ["disabled"], Pf = ["disabled"], Wf = ["disabled"], Rf = {
  key: 0,
  style: { width: "100%", "white-space": "pre-wrap", "overflow-wrap": "anywhere" }
}, Hi = /* @__PURE__ */ fe({
  __name: "GitHubRemarkEditor",
  props: {
    active: { type: Boolean }
  },
  setup(e) {
    const t = e, o = V(null);
    return Xe(() => {
      St(() => {
        t.active && !ae.busy && o.value?.focus();
      });
    }), (s, a) => (c(), p("div", {
      class: "gh-inline-remark-box",
      style: { "flex-wrap": "wrap", "max-width": "100%" },
      onClick: a[6] || (a[6] = z(() => {
      }, ["stop"]))
    }, [
      tt(n("input", {
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
          a[1] || (a[1] = No(z((r) => !r.isComposing && e.active && i(Gn)(), ["prevent"]), ["enter"])),
          a[2] || (a[2] = No(z((r) => !r.isComposing && e.active && i(Vn)(), ["prevent", "stop"]), ["esc"]))
        ]
      }, null, 40, Af), [
        [ho, i(ae).text]
      ]),
      n("button", {
        type: "button",
        class: "gh-inline-remark-btn save",
        title: "保存备注",
        disabled: i(ae).busy || !e.active,
        onClick: a[3] || (a[3] = //@ts-ignore
        (...r) => i(Gn) && i(Gn)(...r))
      }, "✓", 8, Ef),
      n("button", {
        type: "button",
        class: "gh-inline-remark-btn cancel",
        title: "取消草稿",
        disabled: i(ae).busy || !e.active,
        onClick: a[4] || (a[4] = //@ts-ignore
        (...r) => i(Vn) && i(Vn)(...r))
      }, "✕", 8, Pf),
      n("button", {
        type: "button",
        disabled: i(ae).busy || !e.active,
        onClick: a[5] || (a[5] = //@ts-ignore
        (...r) => i(Fi) && i(Fi)(...r))
      }, "读取已保存值", 8, Wf),
      i(ae).storedValue !== null ? (c(), p("p", Rf, "已保存值：" + u(i(ae).storedValue || "（空）"), 1)) : E("", !0)
    ]));
  }
}), Un = $e({
  isOpen: !1,
  repository: null
}), Nf = {
  open(e) {
    Un.repository = e, Un.isOpen = !0;
  },
  close() {
    Un.isOpen = !1;
  }
}, Of = {
  key: 0,
  role: "status"
}, Bf = {
  key: 1,
  "aria-label": "未显示仓库的备注草稿"
}, Ff = {
  key: 2,
  class: "gh-search-options",
  style: { margin: "0 0 10px" }
}, Hf = { style: { "font-size": "12px", color: "var(--dim)" } }, Kf = {
  key: 3,
  class: "gh-repos-loading"
}, jf = {
  key: 4,
  class: "muted small",
  style: { "text-align": "center", padding: "40px 0", "font-size": "13px" }
}, zf = ["data-repo-name", "onClick", "onContextmenu", "onDragstart"], Vf = ["onClick"], Gf = { class: "gh-card-head" }, Uf = ["checked", "onChange"], Yf = ["src"], Xf = ["href", "title"], qf = { class: "owner" }, Jf = { class: "gh-card-body" }, Zf = { class: "gh-card-badges" }, Qf = ["title", "onClick"], eg = ["onClick"], tg = ["title", "onClick"], og = { class: "gh-badge-remark-text" }, ng = {
  key: 0,
  class: "desc gh-desc-analyzing",
  title: "正在使用 AI 分析仓库…"
}, ig = {
  key: 1,
  class: "desc gh-desc-ai",
  title: "AI 中文简介（点击可直接修改，右键可重新分析）"
}, sg = ["title"], ag = {
  key: 3,
  class: "desc dim"
}, rg = { class: "meta" }, lg = { class: "gh-stars" }, cg = {
  key: 0,
  class: "gh-lang"
}, dg = {
  key: 1,
  class: "gh-updated"
}, ug = {
  key: 6,
  class: "gh-pager"
}, pg = ["disabled"], hg = { class: "gh-page-info" }, fg = ["disabled"], gg = ["onClick"], mg = /* @__PURE__ */ fe({
  __name: "GitHubRepositories",
  props: {
    active: { type: Boolean, default: !0 }
  },
  setup(e) {
    const t = e, o = te(() => !!ae.repo && !Me.cards.some((M) => M.fullName === ae.repo)), s = $e({
      visible: !1,
      x: 0,
      y: 0,
      fullName: "",
      folders: [],
      hasRemark: !1,
      url: ""
    }), a = V(null), r = V(!1);
    function g(M, k) {
      const $ = M.target;
      if ($ instanceof Element) {
        if (Me.batchMode) {
          if ($.closest(".fo-card-more,.gh-badge-folder,.gh-badge-remark,.gh-inline-remark-box")) return;
          M.preventDefault(), M.stopPropagation(), At.toggleSelection(k.fullName);
          return;
        }
        $.closest("a,button,.gh-badge-folder,.gh-badge-remark,.fo-card-more,.gh-card-hole,.gh-card-checkbox,.gh-inline-remark-box") || (M.preventDefault(), M.stopPropagation(), Yi.open(k.fullName, void 0, k));
      }
    }
    function f(M, k) {
      if (!t.active) return;
      M.preventDefault(), M.stopPropagation();
      const $ = 12, ee = 160, R = 280, G = Math.min(window.innerWidth - ee - $, Math.max($, M.clientX)), N = Math.min(window.innerHeight - R - $, Math.max($, M.clientY));
      s.x = G, s.y = N, s.fullName = k.fullName, s.folders = [...k.folders || (k.folder ? [k.folder] : [])], s.hasRemark = !!k.customRemark, s.url = k.url, s.visible = !0, a.value = null, r.value = G > window.innerWidth - 380;
    }
    function l(M, k) {
      f(k, M), a.value = "folder";
    }
    function h() {
      s.visible = !1, a.value = null;
    }
    function x(M) {
      s.folders.includes(M) ? s.folders = s.folders.filter((k) => k !== M) : s.folders.push(M), Ve.toggleRepoList(s.fullName, M);
    }
    function F() {
      s.folders = [], Ve.clearRepoLists(s.fullName), h();
    }
    function m(M) {
      if (!t.active) return;
      const k = typeof M == "string" ? M : M?.fullName || s.fullName;
      h(), Bi(k);
    }
    function D() {
      if (!t.active) return;
      const M = s.fullName;
      h(), Bi(M, !0);
    }
    async function v() {
      const M = s.url;
      if (h(), M && t.active)
        try {
          await navigator.clipboard.writeText(M);
        } catch {
        }
    }
    function w(M) {
      const k = Ve.findRepository(s.fullName);
      h(), k && Gs.sendGitHubShare({
        fullName: k.full_name,
        name: k.name,
        owner: k.owner?.login,
        ownerAvatar: k.owner?.avatar_url,
        desc: k.description || void 0,
        language: k.language || void 0,
        stars: k.stargazers_count,
        category: s.folders && s.folders.length ? s.folders.join(", ") : "未分类",
        url: k.html_url || `https://github.com/${k.full_name}`,
        updatedAt: k.updated_at ? k.updated_at.split("T")[0] : void 0
      }, M);
    }
    function T() {
      const M = Ve.findRepository(s.fullName);
      h(), M && Nf.open({
        fullName: M.full_name,
        description: M.description || "",
        stars: M.stargazers_count,
        language: M.language || void 0,
        updated: M.updated_at
      });
    }
    function y() {
      s.url && window.open(s.url, "_blank", "noreferrer"), h();
    }
    async function _() {
      const M = Ve.findRepository(s.fullName);
      if (!M) {
        h();
        return;
      }
      h(), await Ve.confirmUnstarRepository(M);
    }
    function L(M) {
      const k = M.target;
      k?.closest(".gh-repo-context-menu") || k?.closest(".gh-inline-remark-box") || h();
    }
    function B(M) {
      M.key === "Escape" && s.visible && h();
    }
    Pe(() => t.active, (M) => {
      window.removeEventListener("pointerdown", L), window.removeEventListener("keydown", B), h(), M && (window.addEventListener("pointerdown", L), window.addEventListener("keydown", B));
    }, { immediate: !0 }), Nt(() => {
      window.removeEventListener("pointerdown", L), window.removeEventListener("keydown", B);
    });
    function H(M, k) {
      const $ = M.target;
      if ($ instanceof Element && $.closest("button,a,input,textarea,select,[contenteditable='true']")) {
        M.preventDefault();
        return;
      }
      At.startDrag(k, M);
    }
    const U = te(() => {
      if (Me.cards.length > 0) return !1;
      const M = jt.actionText || "";
      return !!(M.includes("正在读取") || M.includes("正在加载") || M.includes("正在统计") || M.includes("正在同步"));
    });
    return (M, k) => (c(), p(Q, null, [
      i(ae).message ? (c(), p("p", Of, u(i(ae).repo ? `${i(ae).repo}：` : "") + u(i(ae).message), 1)) : E("", !0),
      o.value ? (c(), p("section", Bf, [
        n("p", null, "备注草稿：" + u(i(ae).repo) + "（仓库不在当前列表中，草稿仍保留）", 1),
        Z(Hi, {
          active: t.active
        }, null, 8, ["active"])
      ])) : E("", !0),
      i(Me).searchMessage ? (c(), p("div", Ff, [
        n("span", Hf, u(i(Me).searchMessage), 1),
        n("button", {
          type: "button",
          class: "gh-tab",
          style: { padding: "2px 8px", "font-size": "11px", "margin-left": "8px" },
          onClick: k[0] || (k[0] = ($) => i(At).resetSearch())
        }, "清空搜索")
      ])) : E("", !0),
      U.value ? (c(), p("div", Kf, [...k[17] || (k[17] = [
        n("div", {
          class: "gh-spinner",
          "aria-hidden": "true"
        }, null, -1),
        n("span", { class: "gh-loading-label" }, "正在读取 GitHub 仓库列表中…", -1)
      ])])) : i(Me).emptyMessage ? (c(), p("p", jf, u(i(Me).emptyMessage), 1)) : E("", !0),
      i(Me).cards.length ? (c(), p("div", {
        key: 5,
        class: de(["repos gh-grid", { "gh-batch-active": i(Me).batchMode }])
      }, [
        (c(!0), p(Q, null, be(i(Me).cards, ($) => (c(), p("article", {
          key: $.fullName,
          class: de(["repo gh-card", { selected: $.selected }]),
          "data-repo-name": $.fullName,
          draggable: "true",
          onClick: (ee) => g(ee, $),
          onContextmenu: (ee) => f(ee, $),
          onDragstart: (ee) => H(ee, $.fullName)
        }, [
          n("button", {
            class: "fo-card-more",
            type: "button",
            "aria-label": "更多操作",
            title: "更多操作",
            onClick: z((ee) => f(ee, $), ["stop"])
          }, "⋮", 8, Vf),
          n("div", Gf, [
            n("label", {
              class: "gh-card-hole",
              title: "点击勾选此仓库",
              onClick: k[1] || (k[1] = z(() => {
              }, ["stop"]))
            }, [
              n("input", {
                class: "gh-card-checkbox",
                type: "checkbox",
                checked: $.selected,
                onChange: (ee) => i(At).setSelection($.fullName, ee.target.checked)
              }, null, 40, Uf),
              k[18] || (k[18] = n("span", { class: "gh-hole-inner" }, null, -1))
            ]),
            n("img", {
              class: "gh-owner-avatar",
              src: $.avatarUrl || "assets/github-star.svg",
              alt: "",
              loading: "lazy",
              referrerpolicy: "no-referrer",
              onError: k[2] || (k[2] = (ee) => ee.target.src = "assets/github-star.svg")
            }, null, 40, Yf),
            n("a", {
              href: $.url,
              target: "_blank",
              rel: "noreferrer",
              class: "name",
              title: $.fullName
            }, [
              n("span", qf, u($.owner) + "/", 1),
              ot(u($.name), 1)
            ], 8, Xf)
          ]),
          n("div", Jf, [
            n("div", Zf, [
              $.folders && $.folders.length ? (c(!0), p(Q, { key: 0 }, be($.folders, (ee) => (c(), p("span", {
                key: ee,
                class: "gh-badge-folder",
                title: `本地分组：${ee}（点击管理所属列表）`,
                onClick: z((R) => l($, R), ["stop"])
              }, " 📁 " + u(ee), 9, Qf))), 128)) : (c(), p("span", {
                key: 1,
                class: "gh-badge-folder uncat",
                title: "未分类（点击加入 本地分组）",
                onClick: z((ee) => l($, ee), ["stop"])
              }, " ＋ 未分类 ", 8, eg)),
              i(ae).repo === $.fullName ? (c(), pe(Hi, {
                key: 2,
                active: t.active
              }, null, 8, ["active"])) : $.customRemark ? (c(), p("span", {
                key: 3,
                class: "gh-badge-remark",
                title: `备注：${$.customRemark}（点击就地修改）`,
                onClick: z((ee) => m($), ["stop"])
              }, [
                k[19] || (k[19] = n("span", { class: "gh-badge-remark-icon" }, "💬", -1)),
                n("span", og, u($.customRemark), 1)
              ], 8, tg)) : E("", !0)
            ]),
            $.descriptionKind === "analyzing" ? (c(), p("p", ng, [...k[20] || (k[20] = [
              n("span", { class: "gh-ai-sparkle" }, "✨", -1),
              ot(" 正在使用 AI 分析仓库并提炼中文介绍…", -1)
            ])])) : $.descriptionKind === "ai" ? (c(), p("p", ig, [
              k[21] || (k[21] = n("span", { class: "gh-ai-tag-flag" }, "🤖", -1)),
              ot(u($.description), 1)
            ])) : $.descriptionKind === "plain" ? (c(), p("p", {
              key: 2,
              class: "desc",
              title: $.description
            }, u($.description), 9, sg)) : (c(), p("p", ag, "暂无描述"))
          ]),
          n("div", rg, [
            n("span", lg, "★ " + u($.stars), 1),
            $.language ? (c(), p("span", cg, u($.language), 1)) : E("", !0),
            $.updated ? (c(), p("span", dg, "更新 " + u($.updated), 1)) : E("", !0)
          ])
        ], 42, zf))), 128))
      ], 2)) : E("", !0),
      i(Me).totalPages > 1 ? (c(), p("div", ug, [
        n("button", {
          class: "gh-page-btn",
          type: "button",
          disabled: i(Me).page <= 1,
          onClick: k[3] || (k[3] = ($) => i(At).changePage(i(Me).page - 1))
        }, "‹ 上一页", 8, pg),
        n("span", hg, u(i(Me).page) + " / " + u(i(Me).totalPages) + " · 共 " + u(i(Me).totalItems) + " 个" + u(i(Me).serverPaged ? ` · 已加载 ${i(Me).loadedItems}` : ""), 1),
        n("button", {
          class: "gh-page-btn",
          type: "button",
          disabled: i(Me).page >= i(Me).totalPages,
          onClick: k[4] || (k[4] = ($) => i(At).changePage(i(Me).page + 1))
        }, "下一页 ›", 8, fg)
      ])) : E("", !0),
      (c(), pe(wt, { to: "body" }, [
        t.active && s.visible ? (c(), p("div", {
          key: 0,
          class: "fo-cover-context-menu gh-repo-context-menu",
          style: xe({ left: `${s.x}px`, top: `${s.y}px` }),
          onClick: k[15] || (k[15] = z(() => {
          }, ["stop"])),
          onContextmenu: k[16] || (k[16] = z(() => {
          }, ["prevent"]))
        }, [
          n("div", {
            class: de(["gh-menu-has-sub", { "is-active": a.value === "folder" }]),
            onMouseenter: k[6] || (k[6] = ($) => a.value = "folder")
          }, [
            k[22] || (k[22] = n("button", {
              class: "fo-cover-menu-item with-sub-arrow",
              type: "button"
            }, [
              n("span", null, "📁 所属 本地分组"),
              n("span", { class: "sub-arrow" }, "›")
            ], -1)),
            n("div", {
              class: de(["gh-sub-flyout", { "flyout-left": r.value }]),
              onClick: k[5] || (k[5] = z(() => {
              }, ["stop"]))
            }, [
              n("button", {
                class: de(["fo-cover-menu-item", { primary: s.folders.length === 0 }]),
                type: "button",
                onClick: F
              }, u(s.folders.length === 0 ? "✓ " : "  ") + "＋ 设为未分类（清空列表） ", 3),
              (c(!0), p(Q, null, be(i(Ve).cats, ($) => (c(), p("button", {
                key: $,
                class: de(["fo-cover-menu-item", { primary: s.folders.includes($) }]),
                type: "button",
                onClick: (ee) => x($)
              }, u(s.folders.includes($) ? "✓ " : "  ") + "📁 " + u($), 11, gg))), 128))
            ], 2)
          ], 34),
          n("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: k[7] || (k[7] = ($) => a.value = null),
            onClick: k[8] || (k[8] = ($) => m())
          }, " ✏️ 编辑备注… ", 32),
          n("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: k[9] || (k[9] = ($) => a.value = null),
            onClick: T
          }, " 创建任务 ", 32),
          Z(_a, {
            label: "💬 发送到聊天室",
            visible: s.visible,
            onOpen: k[10] || (k[10] = ($) => a.value = null),
            onSelect: w
          }, null, 8, ["visible"]),
          s.hasRemark ? (c(), p("button", {
            key: 0,
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: k[11] || (k[11] = ($) => a.value = null),
            onClick: D
          }, " 🗑️ 清除备注 ", 32)) : E("", !0),
          n("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: k[12] || (k[12] = ($) => a.value = null),
            onClick: v
          }, " 📋 复制仓库链接 ", 32),
          n("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: k[13] || (k[13] = ($) => a.value = null),
            onClick: y
          }, " ↗ 在 GitHub 打开 ", 32),
          n("button", {
            class: "fo-cover-menu-item danger",
            type: "button",
            onMouseenter: k[14] || (k[14] = ($) => a.value = null),
            onClick: _
          }, " ⭐ 取消 Star ", 32)
        ], 36)) : E("", !0)
      ]))
    ], 64));
  }
}), vg = /* @__PURE__ */ Ne(mg, [["__scopeId", "data-v-93d09653"]]), yg = { class: "gh-batch-bar-left" }, wg = { class: "gh-batch-count-tip" }, bg = { id: "gh-batch-selected-count" }, kg = {
  key: 0,
  "aria-label": "批量归属列表确认"
}, _g = ["disabled"], Cg = ["disabled"], xg = { class: "gh-batch-bar-right" }, Lg = ["disabled"], $g = ["disabled"], Sg = ["disabled"], Tg = /* @__PURE__ */ fe({
  __name: "GitHubBatchBar",
  props: {
    active: { type: Boolean, default: !0 }
  },
  setup(e) {
    const t = e, o = Fs(), s = V(null), a = te(() => {
      const f = [
        { value: "", label: "未分类（清空所选仓库的所有列表所属）", icon: "🌐" }
      ];
      return Xi.folders.filter((l) => l.kind === "custom").forEach((l) => {
        f.push({ value: l.title, label: l.title, icon: "📁" });
      }), f;
    });
    function r() {
      t.active && (o.value = Ve.prepareBatchMove(), s.value = null);
    }
    async function g() {
      const f = o.value, l = s.value;
      if (!t.active || !f || l === null || dt.busy) return;
      await f.submit(l) && o.value === f && (o.value = void 0);
    }
    return Pe(() => t.active && Jt.active, (f) => {
      f || (o.value = void 0);
    }), (f, l) => (c(), p(Q, null, [
      n("div", yg, [
        n("button", {
          type: "button",
          class: "gh-batch-action-btn",
          id: "gh-batch-select-all-btn",
          onClick: l[0] || (l[0] = (h) => i(Eo).toggleSelectAll())
        }, u(i(Jt).allSelected ? "取消全选" : "全选"), 1),
        n("span", wg, [
          l[5] || (l[5] = ot("已选择 ", -1)),
          n("b", bg, u(i(Jt).selectedCount), 1),
          l[6] || (l[6] = ot(" 项", -1))
        ])
      ]),
      o.value ? (c(), p("section", kg, [
        n("p", null, "仅操作打开选择器时的 " + u(o.value.names.length) + " 个仓库；后来勾选的仓库不加入。", 1),
        n("details", null, [
          l[7] || (l[7] = n("summary", null, "查看本次仓库清单", -1)),
          n("ul", null, [
            (c(!0), p(Q, null, be(o.value.names, (h) => (c(), p("li", { key: h }, u(h), 1))), 128))
          ])
        ]),
        Z(zi, {
          "model-value": s.value ?? "",
          options: a.value,
          disabled: i(dt).busy,
          placeholder: "请选择目标列表",
          size: "sm",
          style: { "max-width": "260px" },
          "onUpdate:modelValue": l[1] || (l[1] = (h) => s.value = String(h))
        }, null, 8, ["model-value", "options", "disabled"]),
        n("button", {
          type: "button",
          disabled: !t.active || i(dt).busy || s.value === null,
          onClick: g
        }, "确认加入列表", 8, _g),
        n("button", {
          type: "button",
          disabled: i(dt).busy,
          onClick: l[2] || (l[2] = (h) => o.value = void 0)
        }, "取消", 8, Cg)
      ])) : E("", !0),
      n("div", xg, [
        n("button", {
          type: "button",
          class: "gh-batch-action-btn",
          id: "gh-batch-move-btn",
          disabled: !t.active || i(dt).busy || i(Jt).selectedCount === 0,
          title: "固定当前选择，批量加入所选本地分组",
          onClick: r
        }, " 📁 归入本地分组 ", 8, Lg),
        n("button", {
          type: "button",
          class: "gh-batch-action-btn",
          id: "gh-batch-ai-btn",
          disabled: i(Jt).selectedCount === 0,
          title: "批量使用 AI 生成中文介绍",
          onClick: l[3] || (l[3] = (h) => i(Eo).analyzeAi())
        }, " ✨ 批量 AI 分析 ", 8, $g),
        n("button", {
          type: "button",
          class: "gh-batch-action-btn danger",
          id: "gh-batch-unstar-btn",
          disabled: i(Jt).selectedCount === 0,
          title: "从 GitHub 批量取消 Star 收藏",
          onClick: l[4] || (l[4] = (h) => i(Eo).unstar())
        }, " 🗑 取消收藏 ", 8, Sg)
      ])
    ], 64));
  }
}), Ig = X(() => import("./GitHubWorkspaceCard-Dguzd9AR.js")), Mg = X(() => import("./NotificationCenter-BqCfbdZU.js")), Dg = X(() => import("./TabManagerPanel-D9d90eVl.js")), Ag = X(() => import("./BookmarkNoteMenu-CFGL4ZSK.js")), Eg = X(() => import("./BookmarkPanel-vNEaGUXV.js")), Pg = X(() => import("./LauncherDialogs-DKal0Xwu.js")), Wg = X(() => import("./SettingsDialog-UOkGQ9-H.js")), Rg = X(() => import("./SettingsView-DL3Wdw51.js")), Ng = X(() => import("./ClockSettingsMenu-aXwHbOwp.js")), Og = X(() => import("./BiliTheaterDialog-DrDV37re.js")), Bg = X(() => import("./BiliMiniPlayer-DbxGLqEX.js")), Fg = X(() => import("./BiliMessagePanel-B4ShqeTo.js")), Hg = X(() => import("./BilibiliWorkspace-B6J7t09H.js")), Kg = X(() => import("./YouTubeCard-nWANiuYJ.js").then((e) => e.Y)), jg = X(() => import("./AihotFeed-D44lTFO6.js")), zg = X(() => import("./GitHubTrending-DQZ3VV7u.js")), Vg = X(() => import("./AiDialog-D2IHNZB6.js")), Gg = X(() => import("./AihotViewer-Bv7sBwox.js")), Ug = X(() => import("./NavWheelOverlay-CzCEfE0D.js")), Yg = X(() => import("./StandaloneHost-BYhfSPFL.js")), Xg = X(() => import("./LauncherFolderDialog-DeSdbUKa.js")), qg = X(() => import("./LauncherMenus-CaevPA4U.js"));
function ce(e, t, o, s) {
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
      const g = r.innerHTML, f = ni(o);
      f.config.errorHandler = (l, h, x) => {
        console.error(`LogicWeaver Vue feature failed: ${t.id} (${x})`, l), r.dataset.vueError = "1";
      };
      try {
        f.mount(r), s?.setMounted?.(!0);
      } catch (l) {
        throw s?.setMounted?.(!1), r.innerHTML = g, l;
      }
      return () => {
        s?.setMounted?.(!1), f.unmount();
      };
    }
  });
}
function Jg(e) {
  e.register({
    id: "intro",
    title: "启动动画",
    order: 10,
    eager: !0,
    roots: ["endfield-loader"],
    capabilities: ["ui:intro", "boot:progress"],
    mount: () => {
      const t = document.getElementById("endfield-loader");
      if (!yt.enabled) {
        t?.remove(), document.body.classList.remove("is-starting");
        return;
      }
      if (!t) return;
      const o = ni(Oh);
      let s = !1;
      const a = () => {
        e.stop("intro");
      };
      window.addEventListener("logicweaver:intro-complete", a, { once: !0 }), o.mount(t);
      const r = window.setTimeout(() => {
        yt.finish("基础界面已就绪，在线服务继续后台加载", !0), window.setTimeout(() => {
          s || (a(), t?.remove(), document.body.classList.remove("is-starting"));
        }, 600);
      }, 8e3);
      return () => {
        s || (s = !0, clearTimeout(r), window.removeEventListener("logicweaver:intro-complete", a), o.unmount(), t.remove(), document.body.classList.remove("is-starting"));
      };
    }
  }), ce(e, { id: "spa-app", title: "纯血 SPA 单根调度器", order: 15, root: "vue-spa-root", capabilities: ["ui:spa-root", "workspace:keepalive"] }, Ih), document.getElementById("vue-spa-root") || ce(e, { id: "bili-companions", title: "b站伴随窗口", order: 19, root: "vue-bili-companions-root", capabilities: ["ui:dock-companion"] }, Yg), ce(e, { id: "notifications", title: "通知中心", order: 20, root: "vue-notification-root", capabilities: ["ui:toast", "notification:dedupe"] }, Ls), ce(e, { id: "profile-menu", title: "头像右键菜单", order: 21, root: "bili-profile-menu", capabilities: ["ui:profile-menu", "profile:actions"] }, Bh, Fo), ce(e, { id: "workspace-launchers", title: "常用工作区启动项", order: 22, root: "workspace-launchers", capabilities: ["ui:workspace-launchers", "workspace:launch"] }, Fh, ui), ce(e, { id: "mac-dock", title: "底部快捷应用 Dock 栏", order: 23, root: "mac-dock", capabilities: ["ui:mac-dock", "dock:navigate"] }, xs, xt), ce(e, { id: "hero-clock", title: "首屏中央时钟", order: 26, root: "hero-clock", capabilities: ["ui:hero-clock", "clock:read"] }, vs), ce(e, { id: "search-box", title: "首屏搜索框", order: 27, root: "search", capabilities: ["ui:search-box", "search:actions"] }, Ki), ce(e, { id: "home-music", title: "首屏音乐播放器", order: 28, root: "task-thread-home", capabilities: ["ui:home-music", "music:playback"] }, ys, et), ce(e, { id: "launcher-groups", title: "常用网站分组架", order: 29, root: "launcher-groups", capabilities: ["ui:launcher-groups", "launcher:navigate"] }, Cs, Fe), ce(e, { id: "weather-widget", title: "首屏天气小部件", order: 39, root: "weather-body", capabilities: ["ui:weather-widget", "weather:read"] }, ms), ce(e, { id: "github-workspace", title: "GitHub 独立页 Vue 工作台", order: 49, root: "vue-github-workspace-root", capabilities: ["ui:github-workspace"] }, Ig), ce(e, { id: "github-status", title: "GitHub 同步状态", order: 50, root: "vue-github-status-root", capabilities: ["ui:github-status", "github:sync-read"] }, Vh, ai), ce(e, { id: "github-folders", title: "GitHub 文件夹导航", order: 55, root: "gh-folder-list", capabilities: ["ui:github-folders", "github:categorize-drop"] }, cf, Do), ce(e, { id: "github-hero", title: "GitHub 分类摘要", order: 56, root: "gh-hero", capabilities: ["ui:github-summary", "github:actions"] }, Df, Ao), ce(e, { id: "github-repositories", title: "GitHub 仓库列表", order: 57, root: "vue-github-repositories-root", capabilities: ["ui:github-repositories", "github:repository-actions", "github:paging"] }, vg, At), ce(e, { id: "github-batch-bar", title: "GitHub Star 批量操作工具栏", order: 58, root: "gh-batch-bar", capabilities: ["ui:github-batch-bar", "github:batch-actions"] }, Tg, Eo), ce(e, { id: "notification-center", spaOwned: !0, title: "持久通知中心", order: 71, root: "vue-notification-center-root", capabilities: ["ui:notification-history", "notification:read"] }, Mg, Wt), ce(e, { id: "tab-manager", spaOwned: !0, title: "独立标签页管理", order: 71, root: "vue-tab-manager-root", capabilities: ["ui:tab-manager", "tabs:explicit"] }, Dg, ls), ce(e, { id: "bookmark-menu", title: "书签上下文操作与备注菜单", order: 72, root: "vue-bookmark-menu-root", capabilities: ["ui:bookmark-menu", "bookmark:edit"] }, Ag, si), ce(e, { id: "launcher-dialogs", title: "快捷启动器管理弹窗族", order: 73, root: "vue-launcher-dialogs-root", capabilities: ["ui:launcher-dialogs", "launcher:manage"] }, Pg, qi), ce(e, { id: "launcher-folder-dialog", title: "大文件夹展开视窗", order: 74, root: "vue-launcher-folder-root", capabilities: ["ui:launcher-folder", "launcher:folder-dialog"] }, Xg, Ji), ce(e, { id: "launcher-menus", title: "启动器快捷上下文菜单族", order: 76, root: "vue-launcher-menus-root", capabilities: ["ui:launcher-menus", "launcher:context-menu"] }, qg, ri), ce(e, { id: "bookmark-panel", title: "浏览器书签侧边滑动视窗", order: 77, root: "vue-bookmark-panel-root", capabilities: ["ui:bookmark-panel", "bookmarks:panel"] }, Eg, yn), ce(e, { id: "bookmark-folder-strip", spaOwned: !0, title: "顶栏书签快捷文件夹横条", order: 78, root: "vue-bookmark-folder-strip-root", capabilities: ["ui:bookmark-folder-strip", "bookmarks:strip"] }, null, hn), ce(e, { id: "settings-page", title: "独立设置页 Vue 工作台", order: 79, root: "vue-options-root", capabilities: ["ui:settings-page"] }, Rg), ce(e, { id: "settings-dialog", title: "全局设置中心视窗", order: 80, root: "vue-settings-dialog-root", capabilities: ["ui:settings-dialog", "settings:manage"] }, Wg, wn), ce(e, { id: "clock-settings-menu", spaOwned: !0, title: "中央时钟偏好配置菜单", order: 82, root: "vue-clock-settings-root", capabilities: ["ui:clock-settings", "clock:preference-edit"] }, Ng, Vt), ce(e, { id: "bili-theater-dialog", title: "Bilibili 沉浸剧场与评论区弹窗", order: 85, root: "vue-bili-theater-root", capabilities: ["ui:bili-theater", "bili:playback"] }, Og, Po), ce(e, { id: "bili-mini-player", title: "Bilibili 悬浮迷你播放器", order: 85, root: "vue-bili-mini-player-root", capabilities: ["ui:bili-mini-player", "bili:playback"] }, Bg), ce(e, { id: "ai-dialog", title: "AI 助手对话框与知识点抽屉", order: 86, root: "vue-ai-dialog-root", capabilities: ["ui:ai-dialog", "ai:chat"] }, Vg, pi), ce(e, { id: "aihot-viewer", spaOwned: !0, title: "AI HOT 资讯文章阅读器", order: 88, root: "vue-aihot-viewer-root", capabilities: ["ui:aihot-viewer", "viewer:aihot"] }, Gg, ci), ce(e, { id: "nav-wheel", title: "辐射状快捷动作轮盘与悬浮球", order: 95, root: "vue-nav-wheel-root", capabilities: ["ui:nav-wheel", "nav:radial-menu"] }, Ug, Ee), ce(e, { id: "bili-message-panel", spaOwned: !0, title: "Bilibili 消息与互动通知中心", order: 102, root: "vue-bili-message-panel-root", capabilities: ["ui:bili-message-panel", "bili:messages"] }, Fg, zt), ce(e, { id: "bili-favorites", spaOwned: !0, title: "b站插件 Vue 外壳", order: 110, root: "vue-bili-favorites-root", capabilities: ["ui:bili-favorites-shell", "bilibili:favorites"] }, Hg, Qi), ce(e, { id: "youtube-card", spaOwned: !0, title: "YouTube 订阅与探索工作台", order: 111, root: "vue-youtube-root", capabilities: ["ui:youtube-card", "youtube:updates"] }, Kg, ts), ce(e, { id: "aihot-feed", spaOwned: !0, title: "AI HOT 资讯流全功能聚合看板", order: 112, root: "vue-aihot-root", capabilities: ["ui:aihot-feed", "aihot:aggregate"] }, jg, es), ce(e, { id: "github-trending", spaOwned: !0, title: "GitHub 趋势榜与热门流", order: 114, root: "vue-github-trending-root", capabilities: ["ui:github-trending", "github:trending"] }, zg, cs);
}
Ns();
const _n = Ia(bn);
ir(bn, _n);
sr(bn);
Jg(_n);
ii.loadBookmarks();
(async () => {
  document.getElementById("vue-bili-favorites-root") && !document.getElementById("vue-spa-root") && await import("./bilibili-channel.service-DizAJ-rZ.js"), await Ea(), await _n.startEager(), yt.notifyBootReady();
})().catch((e) => console.error("[LogicWeaver] 页面启动失败", e));
window.addEventListener("pagehide", () => {
  _n.stopAll();
}, { once: !0 });
export {
  Ci as C,
  Dp as D,
  cf as G,
  Ro as L,
  ws as T,
  Oh as _,
  Df as a,
  cs as b,
  ls as c,
  Vt as d,
  xi as e,
  bm as f,
  Nf as g,
  Re as h,
  pi as i,
  Ye as j,
  Ee as k,
  vn as l,
  ks as m,
  ne as n,
  _s as o,
  bs as p,
  Fh as q,
  Bh as r,
  gs as s,
  ln as t,
  ti as u,
  Un as v,
  ze as w,
  fs as x,
  bn as y
};
