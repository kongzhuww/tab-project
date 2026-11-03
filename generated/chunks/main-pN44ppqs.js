import { l as Si, S as Ln, i as Is } from "./SearchBox-BOAayQ6F.js";
/* empty css                */
import { c as Ri, r as be, a as Tt, w as Be, b as H, d as de, o as r, e as ce, f as to, u as s, g as p, h as i, i as E, T as Ms, t as u, F as Y, j as ge, k as F, l as yt, m as Ot, n as Ue, v as Ds, p as Ye, q as oo, s as q, x as As, y as oe, z as St, A as io, B as ke, C as le, D as Ke, E as G, G as vt, H as vo, I as $n, J as Ko, K as He, L as so, M as Tn, N as Es } from "./vendor-vue-FFI3kJnP.js";
import { W as Vo, t as Vt, p as si, n as ye, a as Lo, b as $t, h as Ve, m as ft, c as Ji, d as Ii, s as ai, e as Zi, f as Ps, g as Ws, i as Ns, j as Rs, C as Sn, k as Z, l as In, o as lo, q as Mn, r as xt, u as Os, v as ao, w as Ut, x as To, y as Bs, z as Fs, A as So, B as Hs } from "./view-styles-BecvgcJv.js";
import { l as js, r as zs, G as Gs, a as Te, b as Zo, c as Oi, s as Ks, d as Vs, e as Bi, f as Uo, g as Fi, h as Et, i as bo, j as _t, k as ko, m as Yt, n as Ee, o as Qi, p as Us, q as et, t as Je, u as Ct, v as yo, R as Ys, w as qs, x as It, y as At, z as Le, A as Xs, B as Ht } from "./search.service-DacqWPJU.js";
import { l as Oe, a as Dn, b as An, c as Hi, d as re, f as pt, e as co } from "./store-_XqQ77hc.js";
import { c as Js, a as Zs, t as Qs, b as ea, d as ta, e as oa, f as qt, g as ia } from "./calendar.service-DE6FKh8O.js";
import { w as De, s as ji, P as na, i as Yo, D as ri, a as en, g as Xe, p as sa, L as aa, b as Mt, c as ra, d as li, t as tn, e as la, f as ca, h as xo, l as En } from "./window-manager.store-BD4IokhA.js";
import { s as Qo, a as da, b as ua } from "./stickers.service-s7Amh1xE.js";
import { b as _o, a as pa, c as ha } from "./up-group-manager-store-BoiY4YAY.js";
import { biliMessagePanelController as Pt, biliMessagePanelState as fa } from "./message-panel-store-CtFDC_BT.js";
import { b as Pn, r as ga, a as uo } from "./bili-favorites-store-Do5lsHY0.js";
import { a as zi, b as Wn, c as ma } from "./aihot-feed-store-CHge84-4.js";
import { p as Nn } from "./pricing-store-DjrO_7aH.js";
import { y as Rn } from "./youtube-store-B282fVhP.js";
import { R as va, u as On } from "./InlineEditStatus.vue_vue_type_style_index_0_scoped_28642927_lang-DRvNM_7u.js";
import { t as c, c as lt, _ as Me } from "./_plugin-vue_export-helper-CVWGtx1v.js";
import { f as Wt } from "./fullscreen-cards.store-B44wFBj6.js";
import { k as ya, m as wa } from "./core-utils-Ccz-tarm.js";
import { t as rt } from "./together-listen.store-S8rjDtGo.js";
import { C as ba } from "./ChatShareMenu-D867P6lA.js";
const ka = /^[a-z][a-z0-9]*(?:[.:-][a-z0-9]+)*$/;
function _a() {
  const e = /* @__PURE__ */ new Map(), t = /* @__PURE__ */ new Map();
  function o(l) {
    if (!l || !ka.test(l.id)) throw new TypeError(`Invalid command id: ${l?.id || ""}`);
    if (!l.title?.trim() || !l.category?.trim() || typeof l.run != "function")
      throw new TypeError(`Command ${l.id} requires title, category and run()`);
    if (e.has(l.id)) throw new Error(`Command already registered: ${l.id}`);
    return e.set(l.id, Object.freeze({
      ...l,
      description: l.description || "",
      keywords: Object.freeze([...l.keywords || []]),
      concurrency: l.concurrency || "replace"
    })), () => {
      n(l.id), e.delete(l.id);
    };
  }
  function n(l) {
    const h = t.get(l);
    return h ? (h.abort(), t.delete(l), !0) : !1;
  }
  async function a(l, h, C = "api") {
    const D = e.get(l);
    if (!D) throw new Error(`Unknown command: ${l}`);
    if (D.enabled && !D.enabled()) return;
    const m = D.concurrency || "replace";
    if (t.has(l)) {
      if (m === "drop") return;
      m === "replace" && n(l);
    }
    const S = new AbortController();
    m !== "parallel" && t.set(l, S);
    try {
      return await D.run(h, { signal: S.signal, source: C });
    } finally {
      t.get(l) === S && t.delete(l);
    }
  }
  function d(l) {
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
  function b() {
    return Object.freeze([...e.values()].map(d).sort((l, h) => l.category.localeCompare(h.category, "zh") || l.title.localeCompare(h.title, "zh")));
  }
  function g(l, h = 20) {
    const C = String(l || "").trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
    if (!C.length) return b().slice(0, h);
    const D = [...e.values()].map((m) => {
      const S = d(m), f = S.title.toLocaleLowerCase(), y = `${S.id} ${f} ${S.category} ${S.description} ${S.keywords.join(" ")}`.toLocaleLowerCase();
      if (!C.every((v) => y.includes(v))) return null;
      let I = 0;
      for (const v of C)
        S.id === v ? I += 200 : S.id.startsWith(v) && (I += 120), f === v ? I += 160 : f.startsWith(v) ? I += 100 : f.includes(v) && (I += 60), S.keywords.some((x) => x.toLocaleLowerCase().startsWith(v)) && (I += 40);
      return { item: S, score: I };
    }).filter((m) => !!m);
    return D.sort((m, S) => S.score - m.score || m.item.title.localeCompare(S.item.title, "zh")), Object.freeze(D.slice(0, Math.max(1, h)).map((m) => m.item));
  }
  return Object.freeze({ register: o, execute: a, cancel: n, has: (l) => e.has(l), list: b, search: g });
}
const ei = _a(), Ca = /^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/;
function xa(e) {
  const t = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map();
  function d(m) {
    if (!m || !Ca.test(m.id)) throw new TypeError(`Invalid feature id: ${m?.id || ""}`);
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
  function b(m) {
    return typeof m == "function" ? m : m && typeof m.unmount == "function" ? () => m.unmount() : () => {
    };
  }
  function g(m) {
    if (o.has(m)) return Promise.resolve(o.get(m)?.cleanup);
    if (n.has(m)) return n.get(m);
    const S = t.get(m);
    if (!S) return Promise.reject(new Error(`Unknown feature: ${m}`));
    a.delete(m);
    const f = new AbortController(), y = Object.freeze({
      signal: f.signal,
      commands: e,
      getRoot: (v) => document.getElementById(v)
    }), I = Promise.resolve().then(() => S.mount(y)).then((v) => (n.delete(m), o.set(m, { cleanup: v, controller: f }), v), (v) => {
      throw n.delete(m), a.set(m, v), f.abort(), v;
    });
    return n.set(m, I), I;
  }
  async function l(m) {
    const S = n.get(m);
    if (S)
      try {
        await S;
      } catch {
        return;
      }
    const f = o.get(m);
    f && (o.delete(m), f.controller.abort(), await b(f.cleanup)());
  }
  async function h() {
    const m = typeof document < "u" && !!(document.getElementById("vue-spa-root") || document.getElementById("logicweaver-spa-root")), S = [...t.values()].filter((I) => !(!I.eager || !m && I.roots && I.roots.length > 0 && !I.roots.some((x) => !!document.getElementById(x)))).sort((I, v) => (I.order || 100) - (v.order || 100)), y = (await Promise.allSettled(S.map((I) => g(I.id)))).flatMap((I, v) => I.status === "rejected" ? [{ id: S[v].id, reason: I.reason }] : []);
    y.length && console.warn("LogicWeaver Vue features failed to mount", y);
  }
  async function C() {
    const m = [...o.keys()].reverse();
    await Promise.allSettled(m.map(l));
  }
  function D() {
    return Object.freeze([...t.values()].map((m) => Object.freeze({
      id: m.id,
      title: m.title,
      order: m.order || 100,
      eager: m.eager === !0,
      roots: Object.freeze([...m.roots || []]),
      capabilities: Object.freeze([...m.capabilities || []]),
      status: n.has(m.id) ? "mounting" : o.has(m.id) ? "mounted" : a.has(m.id) ? "failed" : "registered",
      error: a.has(m.id) ? String(a.get(m.id)?.message || a.get(m.id) || "Feature mount failed") : ""
    })).sort((m, S) => m.order - S.order));
  }
  return Object.freeze({ register: d, start: g, startEager: h, stop: l, stopAll: C, has: (m) => t.has(m), list: D });
}
const La = localStorage.getItem("startupAnimationStyle") || localStorage.getItem("logicweaverStartupStyle") || "endfield", on = (() => {
  try {
    const e = localStorage.getItem("showStartupAnimation"), t = localStorage.getItem("logicweaverEndfieldLoader"), o = e ?? t;
    return o === "1" || o === "true";
  } catch {
    return !1;
  }
})(), ee = be({
  enabled: on,
  style: La === "rhinelab" ? "rhinelab" : "endfield",
  renderedProgress: 4,
  targetProgress: 4,
  status: "CORE SHELL...",
  finished: !on,
  exiting: !1,
  forced: !1
});
let no = 0, qo = 4, Bn = performance.now(), Mi = 0, Oo = null, Di = !1;
function Fn(e) {
  const t = e - Bn, o = Mi ? Math.min(1, t / Mi) : 1, n = o * o * (3 - 2 * o);
  ee.renderedProgress = qo + (ee.targetProgress - qo) * n, o < 1 && !ee.finished ? no = requestAnimationFrame(Fn) : no = 0;
}
function Bo(e, t) {
  if (!ee.enabled || ee.finished) return;
  const o = Math.max(ee.targetProgress, Math.max(4, Math.min(100, Number(e) || 4)));
  t && (ee.status = t), qo = ee.renderedProgress, ee.targetProgress = o, Bn = performance.now(), Mi = Math.max(280, Math.min(920, 220 + Math.abs(o - qo) * 7.5)), cancelAnimationFrame(no), no = requestAnimationFrame(Fn);
}
function ti(e = "Ready", t = !1) {
  ee.finished || (ee.finished = !0, ee.forced = t, ee.status = e, ee.targetProgress = 100, cancelAnimationFrame(no), no = 0, ee.renderedProgress = 100, Oo?.(t));
}
function $a(e = "KEYBOARD SKIP") {
  ti(e, !0);
}
function Ta() {
  ee.enabled || ti("BOOT COMPLETE", !0);
}
function Hn() {
  !ee.enabled || ee.finished || Di || (Di = !0, Bo(38, "INITIALIZING CORE SHELL..."), setTimeout(() => {
    ee.finished || Bo(76, "SYNTHESIZING RUNTIME...");
  }, 400), setTimeout(() => {
    ee.finished || Bo(100, ee.style === "rhinelab" ? "ID CONFIRMED : JOYCE MOORE" : "TERRA LINK READY / 终端就绪");
  }, 900), setTimeout(() => {
    ee.finished || ti("BOOT COMPLETE / 首页就绪", !1);
  }, 1650));
}
async function Sa() {
  if (document.getElementById("vue-spa-root")) {
    try {
      const e = await chrome.storage.local.get(["showStartupAnimation", "startupAnimationStyle"]);
      typeof e.showStartupAnimation == "boolean" && (ee.enabled = e.showStartupAnimation, localStorage.setItem("showStartupAnimation", ee.enabled ? "1" : "0"), localStorage.setItem("logicweaverEndfieldLoader", ee.enabled ? "1" : "0")), (e.startupAnimationStyle === "endfield" || e.startupAnimationStyle === "rhinelab") && (ee.style = e.startupAnimationStyle, localStorage.setItem("startupAnimationStyle", ee.style));
    } catch {
      console.warn("[Intro] Startup preferences unavailable; using first-paint preference.");
    }
    ee.finished = !ee.enabled, document.documentElement.dataset.startupStyle = ee.style, document.documentElement.classList.toggle("skip-endfield-loader", !ee.enabled), document.body.classList.toggle("is-starting", ee.enabled);
  }
}
const tt = Tt(ee), dt = Object.freeze({
  update: Bo,
  finish: ti,
  skip: $a,
  notifyBootReady: Ta,
  async playIntro(e) {
    if (e?.style && (ee.style = e.style), typeof document < "u" && (document.documentElement.dataset.startupStyle = ee.style, document.documentElement.classList.remove("skip-endfield-loader"), document.body.classList.add("is-starting")), ee.enabled = !0, ee.finished = !1, ee.forced = !!e?.force, ee.renderedProgress = 4, ee.targetProgress = 4, Di = !1, typeof document < "u") {
      let t = document.getElementById("endfield-loader");
      if (!t) {
        t = document.createElement("div"), t.id = "endfield-loader", t.className = "endfield-loader notranslate", document.body.appendChild(t);
        const { default: o } = await import("./IntroAnimation-DN1re-u0.js"), n = Ri(o), a = () => {
          window.removeEventListener("logicweaver:intro-complete", a), n.unmount(), t?.remove(), document.body.classList.remove("is-starting");
        };
        window.addEventListener("logicweaver:intro-complete", a, { once: !0 }), n.mount(t);
      }
    }
    Hn();
  },
  get enabled() {
    return ee.enabled;
  },
  get finished() {
    return ee.finished;
  }
});
function Ia(e) {
  return Oo = e, ee.finished && e(ee.forced), () => {
    Oo === e && (Oo = null);
  };
}
const jn = [
  { date: "今天", dayName: "周四", emoji: "🌤️", condition: "多云", highTemp: 26, lowTemp: 18, rainProb: 15 },
  { date: "明天", dayName: "周五", emoji: "⛅", condition: "阴天", highTemp: 24, lowTemp: 17, rainProb: 30 },
  { date: "后天", dayName: "周六", emoji: "🌧️", condition: "小雨", highTemp: 21, lowTemp: 16, rainProb: 75 },
  { date: "周日", dayName: "周日", emoji: "🌦️", condition: "阵雨", highTemp: 23, lowTemp: 15, rainProb: 45 },
  { date: "周一", dayName: "周一", emoji: "☀️", condition: "晴天", highTemp: 27, lowTemp: 18, rainProb: 10 },
  { date: "周二", dayName: "周二", emoji: "🌤️", condition: "多云", highTemp: 28, lowTemp: 19, rainProb: 15 },
  { date: "周三", dayName: "周三", emoji: "☀️", condition: "晴天", highTemp: 29, lowTemp: 20, rainProb: 5 }
], zn = "lw_weather_snapshot_v1";
function Ma() {
  if (typeof window > "u" || typeof localStorage > "u") return null;
  try {
    const e = localStorage.getItem(zn);
    if (!e) return null;
    const t = JSON.parse(e);
    if (t && t.data && t.data.currentTemp !== void 0)
      return {
        state: "ready",
        city: t.city || t.data.cityName || "",
        data: t.data,
        forecastDays: Array.isArray(t.forecastDays) && t.forecastDays.length ? t.forecastDays : jn,
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
        zn,
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
const Da = () => {
  const e = Ma();
  return {
    state: e?.state || "loading",
    city: e?.city || "",
    errorMessage: "",
    data: e?.data || null,
    updatedAt: e?.updatedAt || null,
    forecastModalOpen: !1,
    forecastDays: e?.forecastDays || jn,
    detailInfo: e?.detailInfo || {
      humidity: "62%",
      wind: "东北风 2级",
      uvIndex: "中等 (4)",
      airQuality: "优 (32)"
    }
  };
}, K = be(Da());
let ci = null, di = null;
const it = {
  get snapshot() {
    return Tt(K);
  },
  update(e) {
    Object.assign(K, e), Io(K);
  },
  unconfigured() {
    Object.assign(K, {
      state: "unconfigured",
      city: "",
      errorMessage: "",
      data: null,
      updatedAt: Date.now()
    });
  },
  loading(e = "") {
    if (K.data) {
      e && (K.city = e);
      return;
    }
    Object.assign(K, {
      state: "loading",
      city: e,
      errorMessage: "",
      updatedAt: Date.now()
    });
  },
  ready(e, t = "") {
    Object.assign(K, {
      state: "ready",
      city: t || e.cityName,
      errorMessage: "",
      data: e,
      updatedAt: Date.now()
    }), Io(K);
  },
  notFound(e = "") {
    Object.assign(K, {
      state: "not_found",
      city: e,
      errorMessage: `找不到城市「${e}」，右键可重新选择地点。`,
      data: null,
      updatedAt: Date.now()
    });
  },
  error(e = "天气加载失败，右键此处可重新选择地点。", t = "") {
    K.data || Object.assign(K, {
      state: "error",
      city: t,
      errorMessage: e,
      data: null,
      updatedAt: Date.now()
    });
  },
  openForecastModal(e) {
    e && (K.city = e), K.forecastModalOpen = !0;
  },
  closeForecastModal() {
    K.forecastModalOpen = !1;
  },
  setForecastDays(e) {
    K.forecastDays = Array.isArray(e) ? e.map((t) => ({
      dayName: t.dayName || t.day || "",
      date: t.date || "",
      emoji: t.emoji || "🌤️",
      condition: t.condition || t.text || "",
      rainProb: t.rainProb ?? 0,
      lowTemp: t.lowTemp ?? t.tempMin ?? 0,
      highTemp: t.highTemp ?? t.tempMax ?? 0
    })) : [], Io(K);
  },
  setDetailInfo(e) {
    K.detailInfo = { ...e }, Io(K);
  },
  applyCity(e) {
    typeof window < "u" && window.dispatchEvent(new CustomEvent("logicweaver:weather-city-selected", { detail: { city: e } })), this.refresh();
  },
  refresh() {
    ci ? ci() : typeof window < "u" && window.dispatchEvent(new CustomEvent("logicweaver:weather-refresh"));
  },
  changeLocation(e) {
    di ? di(e) : typeof window < "u" && window.dispatchEvent(new CustomEvent("logicweaver:weather-change-location", { detail: { clientX: e?.clientX, clientY: e?.clientY } }));
  },
  setRefreshAction(e) {
    ci = e;
  },
  setChangeLocationAction(e) {
    di = e;
  }
}, Aa = () => ({
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
}), we = be(Aa());
let ui = null;
const Xt = {
  get snapshot() {
    return Tt(we);
  },
  update(e) {
    Object.assign(we, e);
  },
  updateTime(e, t, o, n) {
    we.timeText = e, we.secsText = t, we.greetingText = o, we.dateText = n, we.updatedAt = Date.now();
  },
  applyConfig(e) {
    e.fontFamily !== void 0 && (we.fontFamily = e.fontFamily), e.colorHex !== void 0 && (we.colorHex = e.colorHex), e.greetColor !== void 0 && (we.greetColor = e.greetColor), e.dateColor !== void 0 && (we.dateColor = e.dateColor), e.isBlack !== void 0 && (we.isBlack = e.isBlack), e.isCustomColor !== void 0 && (we.isCustomColor = e.isCustomColor), we.updatedAt = Date.now();
  },
  openSettings(e) {
    ui ? ui(e) : window.dispatchEvent(new CustomEvent("logicweaver:clock-open-settings", { detail: { clientX: e?.clientX, clientY: e?.clientY } }));
  },
  setOpenSettingsAction(e) {
    ui = e;
  }
}, Ea = [
  { id: "ai", title: "AI 助手" },
  { id: "todoist", title: "Todoist" },
  { id: "stickers", title: "表情包" },
  { id: "calcom", title: "预约" },
  { id: "wallpaper", title: "壁纸库" }
], Pa = () => ({
  mounted: !1,
  visible: !1,
  items: [...Ea]
}), pi = be(Pa());
let Mo = {};
const Gi = {
  getSnapshot() {
    return Tt(pi);
  },
  update(e) {
    Object.assign(pi, e);
  },
  setMounted(e) {
    pi.mounted = e;
  },
  openWorkspace(e, t = !1) {
    if (Mo.open) {
      Mo.open(e);
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
    const a = document.getElementById(`${e}-top-open`);
    a && !t ? a.click() : window.dispatchEvent(new CustomEvent("logicweaver:open-workspace", { detail: { id: e } }));
  },
  setActions(e) {
    Mo = { ...Mo, ...e };
  }
}, hi = be({ visible: !1, pendingWrites: 0 });
async function Wa(e) {
  if (hi.pendingWrites) throw new Error("壁纸操作正在处理，未自动排队");
  hi.pendingWrites++;
  try {
    return await e();
  } finally {
    hi.pendingWrites--;
  }
}
const nn = {
  openDialog() {
    De.open("wallpaper");
  },
  closeDialog() {
    De.close("wallpaper");
  },
  resetDefault() {
    return Wa(() => Vo.clearWallpaper());
  }
}, sn = [
  { id: "mono", label: "极简等宽", font: "ui-monospace, 'SF Mono', 'JetBrains Mono', Menlo, Consolas, monospace", sample: "15:50:10" },
  { id: "sans", label: "现代无衬线", font: "-apple-system, BlinkMacSystemFont, 'Segoe UI Variable Display', 'Segoe UI', Roboto, 'PingFang SC', sans-serif", sample: "15:50:10" },
  { id: "din", label: "经典几何", font: "'DIN Alternate', 'DIN Pro', 'Franklin Gothic Medium', Futura, sans-serif", sample: "15:50:10" },
  { id: "digital", label: "数码管等宽", font: "'Courier New', Courier, monospace", sample: "15:50:10" },
  { id: "impact", label: "硬派力量", font: "Impact, 'Arial Black', 'Trebuchet MS', sans-serif", sample: "15:50:10" },
  { id: "serif", label: "典雅衬线", font: "'Playfair Display', Georgia, 'Times New Roman', serif", sample: "15:50:10" },
  { id: "rounded", label: "圆润亲和", font: "'Quicksand', 'Comic Sans MS', 'Segoe UI', sans-serif", sample: "15:50:10" }
], an = [
  { id: "white", label: "纯净皓白 (默认)", hex: "#ffffff" },
  { id: "black", label: "曜石极黑", hex: "#0f172a" },
  { id: "gold", label: "香槟金砂", hex: "#f59e0b" },
  { id: "cyan", label: "科技青蓝", hex: "#38bdf8" },
  { id: "emerald", label: "翡翠竹绿", hex: "#10b981" },
  { id: "rose", label: "淡雅樱粉", hex: "#fb7185" }
], hm = [
  { id: "local", label: "📍 本地系统时区", offset: "Local" },
  { id: "Asia/Shanghai", label: "🇨🇳 北京 / 香港", offset: "UTC+8" },
  { id: "Asia/Tokyo", label: "🇯🇵 东京 / 首尔", offset: "UTC+9" },
  { id: "Europe/London", label: "🇬🇧 伦敦 / 格林威治", offset: "UTC+0/+1" },
  { id: "Europe/Paris", label: "🇫🇷 巴黎 / 柏林", offset: "UTC+1/+2" },
  { id: "America/New_York", label: "🇺🇸 纽约 / 东部时间", offset: "UTC-5/-4" },
  { id: "America/Los_Angeles", label: "🇺🇸 洛杉矶 / 西部时间", offset: "UTC-8/-7" },
  { id: "Australia/Sydney", label: "🇦🇺 悉尼", offset: "UTC+10/+11" },
  { id: "UTC", label: "🌐 协调世界时 (UTC)", offset: "UTC" }
], $e = be({
  mounted: !1,
  isOpen: !1,
  x: 200,
  y: 200,
  font: "mono",
  color: "white",
  timezone: "local"
});
let fi = null;
const Nt = {
  state: $e,
  setMounted(e) {
    $e.mounted = e;
  },
  onAction(e) {
    fi = e;
  },
  dispatch(e, t) {
    if (fi)
      return fi(e, t);
  },
  open(e) {
    const n = typeof window < "u" ? window.innerWidth : 1280, a = typeof window < "u" ? window.innerHeight : 800, d = e?.clientX ?? e?.x ?? n / 2, b = e?.clientY ?? e?.y ?? a / 2, g = Math.max(12, Math.min(d - 40, n - 290 - 12)), l = Math.max(12, Math.min(b + 10, a - 420 - 12));
    $e.x = g, $e.y = l, $e.isOpen = !0, this.dispatch("open", { x: g, y: l });
  },
  close() {
    $e.isOpen = !1, this.dispatch("close");
  },
  setFont(e) {
    $e.font = e;
    const t = sn.find((o) => o.id === e);
    if (t) {
      Xt.applyConfig({ fontFamily: t.font });
      try {
        localStorage.setItem("lw_clock_font", e);
      } catch {
      }
    }
    this.dispatch("change", { font: e, color: $e.color, timezone: $e.timezone });
  },
  setColor(e) {
    $e.color = e;
    const t = an.find((o) => o.id === e);
    if (t) {
      Xt.applyConfig({
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
    this.dispatch("change", { font: $e.font, color: e, timezone: $e.timezone });
  },
  setTimezone(e) {
    $e.timezone = e;
    try {
      localStorage.setItem("lw_clock_tz", e);
    } catch {
    }
    this.dispatch("change", { font: $e.font, color: $e.color, timezone: e });
  },
  initPreferences() {
    try {
      const e = localStorage.getItem("lw_clock_font");
      if (e) {
        $e.font = e;
        const n = sn.find((a) => a.id === e);
        n && Xt.applyConfig({ fontFamily: n.font });
      }
      const t = localStorage.getItem("lw_clock_color");
      if (t) {
        $e.color = t;
        const n = an.find((a) => a.id === t);
        n && Xt.applyConfig({ colorHex: n.hex, greetColor: n.hex, dateColor: n.hex, isCustomColor: !0 });
      }
      const o = localStorage.getItem("lw_clock_tz");
      o && ($e.timezone = o);
    } catch {
    }
  },
  syncConfig(e) {
    e.font && ($e.font = e.font), e.color && ($e.color = e.color), e.timezone && ($e.timezone = e.timezone);
  }
}, ue = be({
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
let gi = null, Fo = !1;
async function Ho(e, t = {}) {
  if (e === "poll") return { state: "ready", model: ue.model };
  if (e === "connect") return { state: "ready", model: ue.model };
  throw new Error("旧版 AI 对话桥接已退役，请使用「海狸聊天室」开启智能会话。");
}
function Gn(e) {
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
  o || (e.state === "connecting" ? o = "正在连接本机 Codex 与 ChatGPT…" : e.state === "disconnected" ? o = "已待命（打开面板自动连接）" : e.authenticated ? o = `就绪 · ChatGPT ${e.plan || "已登录"}` : e.state === "ready" ? o = "就绪 · 尚未登录 ChatGPT" : o = t[e.state] || e.state), ue.statusText = o, ue.authHidden = !e.loginUrl, ue.authCode = e.loginCode || "", ue.authLink = e.loginUrl || "https://auth.openai.com/codex/device", ue.isStreaming = Fo || e.busy || e.state === "running";
}
async function Na() {
  try {
    const e = await Ho("poll");
    Gn(e);
  } catch {
  }
}
async function Ra(e, t) {
  if (e === "open" || e === "connect")
    try {
      ue.statusText = "正在连接本机 Codex 与 ChatGPT…";
      const o = await Ho("connect");
      Gn(o);
    } catch (o) {
      ue.statusText = o?.message || "连接失败";
    }
  else if (e === "send" && t?.text) {
    const o = t.text;
    ue.messages.push({
      id: `msg-${Date.now()}`,
      role: "user",
      content: o
    }), ue.inputText = "", ue.isStreaming = !0, Fo = !0;
    try {
      await Ho("send", { text: o }), await Na();
    } catch (n) {
      ue.statusText = n?.message || "发送失败";
    } finally {
      Fo = !1, ue.isStreaming = !1;
    }
  } else if (e === "stop") {
    try {
      await Ho("stop");
    } catch {
    }
    ue.isStreaming = !1, Fo = !1;
  }
}
const Ki = {
  state: ue,
  setMounted(e) {
    ue.mounted = e;
  },
  onAction(e) {
    gi = e;
  },
  dispatch(e, t) {
    if (gi)
      return gi(e, t);
    Ra(e, t);
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
}, mi = be({
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
}), Do = /* @__PURE__ */ new Set(), Oa = {
  state: mi,
  open(e) {
    Object.assign(mi, e, { open: !0 });
  },
  update(e) {
    Object.assign(mi, e);
  },
  close() {
    Do.forEach((e) => e("close"));
  },
  save(e) {
    Do.forEach((t) => t("save", e));
  },
  onAction(e) {
    return Do.add(e), () => Do.delete(e);
  }
}, jo = be({ isOpen: !1 }), Kn = {
  state: jo,
  open() {
    jo.isOpen = !0;
  },
  close() {
    jo.isOpen = !1;
  }
}, vi = "biliProfileCacheV1", ut = "biliLocallyKnownMessageIdsV1", Ao = "biliMessageUserCacheV1", po = "githubKnownReleaseVersionsV1", Eo = "customNewtabAvatar", rn = "biliToastKnownCountsV1";
class Ba {
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
    return ["reply", "at", "like", "system", "private"].forEach((a) => {
      const d = Math.max(0, Number(this.unread?.[a] || 0));
      let b = Array.isArray(this.locallyKnownIds?.[a]) ? this.locallyKnownIds[a] : [];
      d < b.length && (b = [], this.locallyKnownIds[a] = [], o = !0), t[a] = Math.max(0, d - b.length);
    }), o && typeof chrome < "u" && chrome?.storage?.local && chrome.storage.local.set({ [ut]: this.locallyKnownIds }).catch(() => {
    }), t;
  }
  markKnown(t, o, n) {
    this.locallyKnownIds[t] || (this.locallyKnownIds[t] = []);
    let a = !1;
    o && !this.locallyKnownIds[t].includes(o) && (this.locallyKnownIds[t].push(o), a = !0), n && !this.locallyKnownIds[t].includes(n) && (this.locallyKnownIds[t].push(n), a = !0), a && typeof chrome < "u" && chrome?.storage?.local && chrome.storage.local.set({ [ut]: this.locallyKnownIds }).catch(() => {
    }), this.applyBiliProfile(this.profile, this.unread);
  }
  markAllKnown(t, o = []) {
    this.locallyKnownIds[t] || (this.locallyKnownIds[t] = []);
    const n = new Set(this.locallyKnownIds[t]);
    for (const d of o) d && n.add(d);
    const a = Math.max(0, Number(this.unread?.[t] || 0));
    if (n.size < a) {
      const d = a - n.size;
      for (let b = 0; b < d; b++) n.add(`__pad_${Date.now()}_${b}`);
    }
    this.locallyKnownIds[t] = Array.from(n), typeof chrome < "u" && chrome?.storage?.local && chrome.storage.local.set({ [ut]: this.locallyKnownIds }).catch(() => {
    }), this.applyBiliProfile(this.profile, this.unread);
  }
  applyBiliProfile(t, o = {}) {
    this.profile = t || null, this.unread = o || {};
    const a = this.customAvatar || String(t?.face || "assets/bilibili.svg").replace(/^http:/, "https:"), d = this.getVisibleUnread();
    if (Vt.avatarUrl = a, Vt.userName = t?.uname || "哔哩哔哩用户", Vt.buttonTitle = "通知中心", si.avatarUrl = a, si.userName = t?.uname || "用户", si.mid = t?.mid, typeof document < "u") {
      const b = document.getElementById("bili-profile-avatar");
      b && (b.src = a);
      const g = document.getElementById("bili-profile-button");
      g && (g.title = Vt.buttonTitle);
    }
    Pt.updateState({
      userName: t?.uname || "哔哩哔哩用户",
      userMid: t?.mid ? String(t.mid) : "",
      userAvatar: a,
      unreadCounts: {
        reply: Number(d.reply || 0),
        at: Number(d.at || 0),
        like: Number(d.like || 0),
        system: Number(d.system || 0),
        private: Number(d.private || 0)
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
        }, [a, d, b] = await Promise.allSettled([
          fetch("https://api.bilibili.com/x/msgfeed/unread?build=0&mobi_app=web", { credentials: "include" }).then((S) => S.json()),
          fetch("https://api.vc.bilibili.com/x/im/web/msgfeed/unread", { credentials: "include" }).then((S) => S.json()),
          fetch("https://api.vc.bilibili.com/session_svr/v1/session_svr/single_unread", { credentials: "include" }).then((S) => S.json())
        ]), g = a.status === "fulfilled" ? a.value?.data || {} : {}, l = d.status === "fulfilled" ? d.value?.data || {} : {}, h = b.status === "fulfilled" ? b.value?.data || {} : {}, C = Number(l.at || 0), D = l.reply != null ? Number(l.reply || 0) : Math.max(0, Number(l.recv_reply || 0) - C), m = {
          reply: Math.max(Number(g.reply || 0), D),
          at: Math.max(Number(g.at || 0), C),
          like: Math.max(
            Number(g.like || g.praise || 0),
            Number(l.like || l.recv_like || 0)
          ),
          system: Math.max(Number(g.sys_msg || g.system || 0), Number(l.sys_msg || 0)),
          private: Number(
            g.chat || l.chat || Number(h.follow_unread || 0) + Number(h.unfollow_unread || 0) + Number(h.dustbin_push_msg || 0)
          )
        };
        this.applyBiliProfile(n, m), typeof chrome < "u" && chrome?.storage?.local && await chrome.storage.local.set({ [vi]: { profile: n, unread: m, savedAt: Date.now() } }), this.checkAndNotifyBiliInteractions(m);
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
      this.biliToastKnownCounts = { ...o }, typeof chrome < "u" && chrome?.storage?.local && chrome.storage.local.set({ [rn]: this.biliToastKnownCounts }).catch(() => {
      });
      return;
    }
    const n = o.private - Number(this.biliToastKnownCounts.private || 0);
    o.like - Number(this.biliToastKnownCounts.like || 0);
    const a = o.reply - Number(this.biliToastKnownCounts.reply || 0), d = o.at - Number(this.biliToastKnownCounts.at || 0);
    o.system - Number(this.biliToastKnownCounts.system || 0), this.biliToastKnownCounts = { ...o }, typeof chrome < "u" && chrome?.storage?.local && chrome.storage.local.set({ [rn]: this.biliToastKnownCounts }).catch(() => {
    }), n > 0 && ye.show({
      appType: "bili",
      appName: "哔哩哔哩",
      icon: "assets/bilibili.svg",
      title: n > 1 ? `收到 ${n} 条新私信` : "收到新的私信",
      subtitle: "B站私信消息",
      message: "有人给你发送了私信，点击查看对话",
      target: { type: "bili-messages" },
      actionLabel: "查看私信",
      showActions: !0,
      onClick: () => {
        Pt.openPanel();
      }
    }), a > 0 && ye.show({
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
        Pt.openPanel();
      }
    }), d > 0 && ye.show({
      appType: "bili",
      appName: "哔哩哔哩",
      icon: "assets/bilibili.svg",
      title: d > 1 ? `收到 ${d} 次新提及` : "有人 @了你",
      subtitle: "提到我的通知",
      message: "有人在动态或评论中 @了你",
      target: { type: "bili-messages" },
      actionLabel: "查看提及",
      showActions: !0,
      onClick: () => {
        Pt.openPanel();
      }
    });
  }
  init() {
    this.initialized || (this.initialized = !0, Lo.setActions({
      onAction: async (t) => {
        if (t === "messages")
          $t.open();
        else if (t === "tabs")
          Kn.open();
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
      vi,
      ut,
      Ao,
      po,
      Eo
    ]).then((t) => {
      this.customAvatar = t[Eo] || "", this.locallyKnownIds = t[ut] && typeof t[ut] == "object" ? t[ut] : {}, this.userCache = t[Ao] && typeof t[Ao] == "object" ? t[Ao] : {}, this.githubKnownVersions = t[po] && typeof t[po] == "object" ? t[po] : {};
      const o = t[vi];
      o?.profile ? this.applyBiliProfile(o.profile, o.unread || {}) : this.applyBiliProfile(null, {});
    }).catch(() => {
    }), chrome.storage.onChanged && chrome.storage.onChanged.addListener((t, o) => {
      o === "local" && (t[Eo] && (this.customAvatar = t[Eo].newValue || "", this.applyBiliProfile(this.profile, this.unread)), t[ut] && (this.locallyKnownIds = t[ut].newValue || {}, this.applyBiliProfile(this.profile, this.unread)));
    })), Pt.onAction((t, o) => {
      t === "mark-known" ? this.markKnown(o.kind, o.id, o.talkerId) : t === "mark-all-known" && this.markAllKnown(o.kind, o.ids);
    }), this.refreshBiliProfile(), setTimeout(() => {
      this.loadGitHubUpdates();
    }, 3500));
  }
}
const ln = new Ba(), pe = be({ open: !1, loading: !1, error: "", mid: "", name: "", face: "", sign: "", followed: !1, submitting: !1, left: 12, top: 12, videos: [] });
let Po = null;
const zo = {
  state: pe,
  open(e, t) {
    Po = t, Object.assign(pe, { open: !0, loading: !0, error: "", submitting: !1, videos: [] }, e);
  },
  update(e) {
    Object.assign(pe, e);
  },
  close() {
    pe.submitting || (pe.open = !1, Po = null);
  },
  async toggleFollow() {
    if (!(!Po || pe.submitting)) {
      pe.submitting = !0;
      try {
        const e = !pe.followed;
        await Po(e) && (pe.followed = e);
      } finally {
        pe.submitting = !1;
      }
    }
  }
}, xe = be({
  currentTab: "stars",
  rangeText: "近 7 天",
  sinceDays: 7,
  repos: [],
  isLoading: !1,
  errorMessage: "",
  sourceText: "",
  fetchedAt: 0,
  hasLoaded: !1
}), yi = /* @__PURE__ */ new Set();
let kt;
const ho = new va();
let cn = !1;
async function Fa(e, t) {
  if (t.throwIfAborted(), new URL(e).origin !== "https://ghapi.h11.dev") throw new Error("Unexpected public source");
  const o = new AbortController(), n = () => o.abort();
  t.addEventListener("abort", n, { once: !0 });
  const a = setTimeout(n, 15e3);
  try {
    const d = await fetch(e, {
      signal: o.signal,
      credentials: "omit",
      redirect: "error",
      referrerPolicy: "no-referrer",
      cache: "no-store",
      headers: { Accept: "application/json" }
    });
    if (!d.ok)
      throw d.body?.cancel().catch(() => {
      }), new Error("Source unavailable");
    if (!d.body) throw new Error("Empty public source");
    const b = d.body.getReader(), g = new TextDecoder("utf-8", { fatal: !0 });
    let l = 0, h = "";
    try {
      for (; ; ) {
        o.signal.throwIfAborted();
        const C = await b.read();
        if (C.done) break;
        if (l += C.value.byteLength, l > 2 * 1024 * 1024) throw new Error("Public source exceeds limit");
        h += g.decode(C.value, { stream: !0 });
      }
      return o.signal.throwIfAborted(), JSON.parse(h + g.decode());
    } finally {
      b.cancel().catch(() => {
      }), b.releaseLock();
    }
  } finally {
    clearTimeout(a), t.removeEventListener("abort", n);
  }
}
function dn(e, t) {
  const o = e?.name || e?.repository, n = t ? e?.full_name || (typeof o == "string" && o.includes("/") ? o : e?.author && o ? `${e.author}/${o}` : "") : e?.full_name;
  if (typeof n != "string" || !/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(n) || n.split("/").some((g) => g === "." || g === "..")) throw new Error("Invalid repository");
  const [a, d] = n.split("/"), b = (g) => typeof g == "number" && Number.isFinite(g) && g >= 0 ? g : void 0;
  return {
    name: d,
    full_name: n,
    owner: { login: a },
    description: typeof e.description == "string" ? e.description : "",
    language: typeof e.language == "string" ? e.language : "",
    stargazers_count: b(t ? e.stars ?? e.stargazers_count : e.stargazers_count),
    forks_count: b(t ? e.forks ?? e.forks_count : e.forks_count),
    html_url: `https://github.com/${encodeURIComponent(a)}/${encodeURIComponent(d)}`
  };
}
async function Ha(e, t) {
  const o = new Date(Date.now() - e * 864e5).toISOString().slice(0, 10);
  let n = "";
  try {
    const b = await js(t), { data: g } = await zs(`/search/repositories?q=${encodeURIComponent(`is:public created:>${o}`)}&sort=stars&order=desc&per_page=30`, { headers: b, signal: t, maxBytes: 2 * 1024 * 1024 });
    if (t.throwIfAborted(), !Array.isArray(g?.items)) throw new Error("Invalid search response");
    return {
      repos: g.items.slice(0, 30).map((l) => dn(l, !1)),
      sourceText: `GitHub Search：UTC 日期 ${o} 之后新建的仓库，按累计 Star 排序；不是官方 Trending 榜。${g.incomplete_results ? " API 标记为不完整结果。" : ""}`
    };
  } catch (b) {
    t.throwIfAborted(), n = b instanceof Gs ? b.message : "主源响应格式无效。";
  }
  const a = e === 1 ? "daily" : e === 7 ? "weekly" : "monthly", d = await Fa(`https://ghapi.h11.dev/repositories?since=${a}`, t);
  if (t.throwIfAborted(), !Array.isArray(d)) throw new Error("Invalid fallback response");
  return {
    repos: d.slice(0, 30).map((b) => dn(b, !0)),
    sourceText: `GitHub Search 不可用：${n} 改用第三方 ghapi.h11.dev 的 ${a} 趋势快照（不发送账号凭据）；口径与新建仓库搜索不同，源更新时间未提供。`
  };
}
const Vn = {
  get state() {
    return xe;
  },
  // Only a mounted, visible View may own network work. Returning keeps the
  // previous result/error; an interrupted request requires explicit refresh.
  attachView(e) {
    ho.cancel(), xe.isLoading = !1, kt = e;
    const t = () => {
      kt === e && ho.pending && (ho.cancel(), xe.isLoading = !1, xe.errorMessage = "读取已暂停，返回后可点击刷新。");
    };
    return e.addEventListener("abort", t, { once: !0 }), !e.aborted && !cn && this.refresh(), () => {
      e.removeEventListener("abort", t), kt === e && (t(), kt = void 0);
    };
  },
  switchTab(e) {
    xe.currentTab = e, this.dispatch("switch-tab", e);
  },
  async switchRange(e, t) {
    !kt || kt.aborted || ![1, 7, 30].includes(e) || e === xe.sinceDays || (ho.cancel(), Object.assign(xe, {
      sinceDays: e,
      rangeText: `近 ${e} 天`,
      repos: [],
      sourceText: "",
      fetchedAt: 0,
      hasLoaded: !1,
      errorMessage: "",
      isLoading: !1
    }), this.dispatch("switch-range", { days: e, text: xe.rangeText }), await this.refresh());
  },
  async refresh() {
    const e = kt;
    if (!e || e.aborted || xe.isLoading) return;
    const t = xe.sinceDays, o = ho.begin({
      signal: e,
      timeoutMs: 45e3,
      isCurrent: () => kt === e && xe.sinceDays === t,
      onStop: (a) => {
        xe.isLoading = !1, a === "timeout" && (xe.errorMessage = "数据源读取超过整体45秒上限，请手动刷新；没有继续请求备用源。");
      }
    }), n = o.current;
    if (n()) {
      cn = !0, xe.isLoading = !0, xe.errorMessage = "";
      try {
        const a = await o.wait(() => Ha(t, o.signal));
        if (!n()) return;
        xe.repos = a.repos, xe.sourceText = a.sourceText, xe.fetchedAt = Date.now(), xe.hasLoaded = !0;
      } catch {
        n() && (xe.errorMessage = xe.hasLoaded ? "刷新失败，保留同一时间范围的上次读取结果；请检查网络或额度后手动刷新。" : "数据源读取失败或超时；未使用内置样例，请稍后手动刷新。");
      } finally {
        o.finish() && (xe.isLoading = !1, this.dispatch("refresh"));
      }
    }
  },
  selectRepo(e) {
    this.dispatch("select-repo", e);
  },
  onAction(e) {
    return yi.add(e), () => {
      yi.delete(e);
    };
  },
  dispatch(e, t) {
    for (const o of yi)
      try {
        o(e, t);
      } catch {
      }
  }
}, Ai = () => ({
  icon: "🧭",
  title: "快捷轮盘",
  desc: "移动鼠标选择",
  active: !1
}), Vi = () => ({
  visible: !1,
  wedgePath: "",
  arcPath: "",
  line1: { x1: 0, y1: 0, x2: 0, y2: 0 },
  line2: { x1: 0, y1: 0, x2: 0, y2: 0 }
}), Q = be({
  mounted: !1,
  isOpen: !1,
  isExpanded: !1,
  mode: "main",
  ballPosition: { x: 0, y: 0 },
  hub: Ai(),
  activeSectorId: null,
  sectors: [],
  beam: Vi()
});
let un = null;
function ja(e, t) {
  if (typeof e != "number" || !t)
    return Vi();
  const o = 160, n = 160, a = 26, d = 154, b = 360 / t, g = e - b / 2, l = e + b / 2, h = g * Math.PI / 180, C = l * Math.PI / 180, D = o + a * Math.cos(h), m = n + a * Math.sin(h), S = o + d * Math.cos(h), f = n + d * Math.sin(h), y = o + a * Math.cos(C), I = n + a * Math.sin(C), v = o + d * Math.cos(C), x = n + d * Math.sin(C), L = b > 180 ? 1 : 0, W = `M ${D.toFixed(1)} ${m.toFixed(1)} L ${S.toFixed(1)} ${f.toFixed(1)} A ${d} ${d} 0 ${L} 1 ${v.toFixed(1)} ${x.toFixed(1)} L ${y.toFixed(1)} ${I.toFixed(1)} A ${a} ${a} 0 ${L} 0 ${D.toFixed(1)} ${m.toFixed(1)} Z`, O = `M ${S.toFixed(1)} ${f.toFixed(1)} A ${d} ${d} 0 ${L} 1 ${v.toFixed(1)} ${x.toFixed(1)}`;
  return {
    visible: !0,
    wedgePath: W,
    arcPath: O,
    line1: {
      x1: parseFloat(D.toFixed(1)),
      y1: parseFloat(m.toFixed(1)),
      x2: parseFloat(S.toFixed(1)),
      y2: parseFloat(f.toFixed(1))
    },
    line2: {
      x1: parseFloat(y.toFixed(1)),
      y1: parseFloat(I.toFixed(1)),
      x2: parseFloat(v.toFixed(1)),
      y2: parseFloat(x.toFixed(1))
    }
  };
}
const Se = {
  get state() {
    return Q;
  },
  getSnapshot() {
    return Tt(Q);
  },
  setMounted(e) {
    Q.mounted = e;
  },
  setBallPosition(e, t) {
    Q.ballPosition.x = e, Q.ballPosition.y = t;
  },
  setVisibility(e) {
    Q.isOpen = e;
  },
  setHub(e) {
    e ? Q.hub = {
      icon: e.icon || "🧭",
      title: e.title || "快捷轮盘",
      desc: e.desc || "移动鼠标选择",
      active: !!e.active
    } : Q.hub = Ai();
  },
  setBeam(e, t) {
    Q.beam = ja(e, t);
  },
  setActiveSector(e) {
    Q.activeSectorId = e;
  },
  setSectors(e) {
    Q.sectors = [...e];
  },
  expand(e, t, o = "main") {
    Q.isOpen = !0, Q.isExpanded = !0, Q.mode = o, typeof e == "number" && typeof t == "number" && this.setBallPosition(e, t);
  },
  collapse() {
    Q.isExpanded = !1, Q.mode = "main", Q.activeSectorId = null, Q.beam = Vi(), Q.hub = Ai();
  },
  setWheelMode(e) {
    Q.mode = e;
  },
  setActionHandler(e) {
    un = e;
  },
  dispatch(e, t) {
    un?.(e, t);
  }
}, Un = [
  { id: "daily-bilibili", title: "b站插件", desc: "B站收藏夹与追番视频", icon: "assets/bilibili.svg" },
  { id: "daily-pricing", title: "模型插件", desc: "AI 模型定价与排行榜", icon: "assets/nav-pricing.svg" },
  { id: "daily-aihot", title: "ai hot插件", desc: "全网 AI 与前沿科技资讯", icon: "assets/nav-aihot.svg" },
  { id: "folder", title: "常用网站", desc: "点击展开快捷网站子轮盘", icon: "assets/nav-folder.svg", mode: "shortcuts" },
  { id: "card-github", title: "github插件", desc: "GitHub 趋势与星标项目", icon: "assets/nav-github.svg" },
  { id: "launcher", title: "首页", desc: "返回主屏常用应用台", icon: "assets/nav-home.svg" }
];
function za() {
  return Un.filter((e) => e.mode || e.id === "launcher" || Yo(e.id));
}
function Ga() {
  return na.filter((e) => e.kind === "module" && Yo(e.id)).map((e) => ({
    id: e.id,
    title: e.title,
    desc: e.isDev ? "已启用的实验性组件" : e.categoryLabel,
    icon: e.icon || e.emoji || "🧩",
    tool: e.id
  }));
}
function pn() {
  Q.isExpanded && st();
}
let Ei = [], Co = Un, ht = { x: 400, y: 300 }, Yn = !1, fo = !1, wi = null, go = null, nt = !1;
const Ka = be(/* @__PURE__ */ new Set()), Va = /* @__PURE__ */ new Map();
function Lt() {
  return globalThis.chrome?.storage;
}
function qn(e, t) {
  const o = Q.isExpanded ? 160 : 24;
  Se.setBallPosition(
    Math.max(o + 8, Math.min(window.innerWidth - o - 8, e)),
    Math.max(o + 8, Math.min(window.innerHeight - o - 8, t))
  );
}
function st() {
  const e = Q.mode;
  let t = [];
  e === "shortcuts" && (t = [...Ei], t.push({
    id: "toggle-edit-shortcuts",
    title: nt ? c("navwheel.finishEdit") : c("navwheel.editSites"),
    desc: nt ? c("navwheel.finishEditDesc") : c("navwheel.editSitesDesc"),
    icon: nt ? "✅" : "✏️"
  })), Co = e === "tools" ? Ga() : e === "shortcuts" ? [
    ...t,
    { id: "back-to-main", title: c("navwheel.back"), desc: c("navwheel.backDesc"), icon: "🔙", mode: "main" }
  ] : za();
  const o = Co.length, n = o > 12 ? 118 : o > 9 ? 114 : 110, a = o > 12 ? 46 : o > 9 ? 50 : 56;
  Se.setSectors(Co.map((d, b) => {
    const g = -90 + 360 / o * b, l = g * Math.PI / 180;
    return {
      id: d.id,
      title: d.title,
      desc: d.desc,
      icon: d.icon,
      angleDeg: g,
      x: Math.round(160 + Math.cos(l) * n),
      y: Math.round(160 + Math.sin(l) * n),
      size: a,
      isShortcut: !!d.url
    };
  })), Se.setWheelMode(e), Se.setActiveSector(null), Se.setBeam(null, 0), Se.setHub(e === "shortcuts" ? nt ? { icon: "✏️", title: c("navwheel.editing") } : { icon: "🔙", title: c("navwheel.shortcuts") } : e === "tools" ? { icon: "🧰", title: c("navwheel.tools") } : null);
}
function Xo(e) {
  Q.mode = e, st();
}
function Rt() {
  Se.collapse(), qn(Q.ballPosition.x, Q.ballPosition.y), Se.setVisibility(Yn);
}
function Gt(e = Q.ballPosition.x, t = Q.ballPosition.y, o = "main") {
  Se.expand(void 0, void 0, o), qn(e, t), st(), Se.setVisibility(!0);
}
function Ua(e) {
  if (e.id === "toggle-edit-shortcuts") {
    Xn();
    return;
  }
  if (nt && e.url) {
    ye.show({
      appName: c("navwheel.appName"),
      title: c("navwheel.editingNotice"),
      message: c("navwheel.editingHint"),
      duration: 2500
    });
    return;
  }
  if (!(e.tool && !Yo(e.tool) || !e.url && !e.mode && e.id !== "launcher" && !Yo(e.id))) {
    if (e.mode) {
      Xo(e.mode);
      return;
    }
    if (Rt(), e.url) {
      window.open(e.url, "_blank");
      return;
    }
    if (e.tool) {
      window.triggerToolShortcut?.(e.tool);
      return;
    }
    e.id === "launcher" ? (typeof window < "u" && window.scrollTo({ top: 0, left: 0, behavior: "instant" }), Wt.exit(), document.body && (document.body.dataset.page = "home")) : Wt.enter(e.id);
  }
}
function Xn() {
  nt = !nt, nt ? (ye.show({
    appName: c("navwheel.appName"),
    title: c("navwheel.enterEditMode"),
    message: c("navwheel.editModeDesc"),
    duration: 5e3
  }), st()) : (ye.show({
    appName: c("navwheel.appName"),
    title: c("navwheel.editDone"),
    message: c("navwheel.editSaved"),
    duration: 2e3
  }), st());
}
async function Ya(e) {
  if (!nt || !e || !e.url) return !1;
  try {
    const t = await Lt()?.local?.get(["siteShelfLinks", "logicweaverNavWheelShortcutsV1"]), o = Array.isArray(t?.siteShelfLinks) ? t.siteShelfLinks : Array.isArray(t?.logicweaverNavWheelShortcutsV1) ? t.logicweaverNavWheelShortcutsV1 : [], n = o.findIndex((b) => b.url === e.url);
    if (n >= 0) {
      const b = o.filter((g, l) => l !== n);
      return await Lt()?.local?.set({ siteShelfLinks: b, logicweaverNavWheelShortcutsV1: b }), await je.loadShortcuts(), st(), ye.show({
        appName: c("navwheel.appName"),
        title: c("navwheel.removedNotice"),
        message: c("navwheel.removedSite", { name: e.title || e.url }),
        duration: 2e3
      }), !0;
    }
    if (o.length >= 12)
      return ye.show({
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
    }, d = [...o, a];
    return await Lt()?.local?.set({ siteShelfLinks: d, logicweaverNavWheelShortcutsV1: d }), await je.loadShortcuts(), st(), ye.show({
      appName: c("navwheel.appName"),
      title: c("navwheel.addedTitle"),
      message: c("navwheel.addedNotice", { name: a.title }),
      duration: 2500
    }), !0;
  } catch (t) {
    return console.warn("[NavWheel] 即时处理快捷方式失败", t), !1;
  }
}
async function qa(e) {
  try {
    const t = await Lt()?.local?.get(["siteShelfLinks", "logicweaverNavWheelShortcutsV1"]), o = Array.isArray(t?.siteShelfLinks) ? t.siteShelfLinks : Array.isArray(t?.logicweaverNavWheelShortcutsV1) ? t.logicweaverNavWheelShortcutsV1 : [], n = o.find((d) => String(d.id) === String(e)), a = o.filter((d) => String(d.id) !== String(e));
    await Lt()?.local?.set({ siteShelfLinks: a, logicweaverNavWheelShortcutsV1: a }), await je.loadShortcuts(), st(), n && ye.show({
      appName: c("navwheel.appName"),
      title: c("navwheel.removedNotice"),
      message: c("navwheel.removedSite", { name: n.title || c("navwheel.site") }),
      duration: 2500
    });
  } catch (t) {
    console.warn("[NavWheel] 删除快捷方式失败", t);
  }
}
function hn(e) {
  ht = { x: e.clientX, y: e.clientY };
}
function fn(e) {
  e.button === 1 && (e.preventDefault(), e.stopPropagation(), ht = { x: e.clientX, y: e.clientY }, Q.isExpanded ? Rt() : Gt(e.clientX, e.clientY));
}
function gn(e) {
  e.button === 1 && e.preventDefault();
}
function mn(e) {
  if (e.key === "Escape") {
    if (nt) {
      e.preventDefault(), e.stopPropagation(), nt = !1, Ka.clear(), Va.clear(), st(), ye.show({
        appName: c("navwheel.appName"),
        title: c("navwheel.exitedEditing"),
        duration: 1500
      });
      return;
    }
    if (!Q.isExpanded || ji.active) return;
    e.preventDefault(), e.stopPropagation(), Q.mode === "shortcuts" ? Xo("main") : Rt();
  }
}
function Xa(e) {
  try {
    const t = globalThis.chrome;
    if (typeof t?.runtime?.getURL == "function")
      return t.runtime.getURL("_favicon/?pageUrl=" + encodeURIComponent(e) + "&size=64");
  } catch {
  }
  return "";
}
function Ja(e) {
  const t = e.customIcon || e.icon;
  if (t && typeof t == "string" && !/google\.com\/s2\/favicons|icons\.duckduckgo/i.test(t))
    return t;
  if (e.url) {
    const o = Te.getCachedIcon(e.url);
    if (o) return o;
    const n = Xa(e.url);
    if (n) return n;
  }
  return e.icon || "🔗";
}
const je = {
  async start() {
    if (!fo) {
      fo = !0, wi = Be(lt, () => {
        Q.isExpanded && st();
      }), ht = { x: Math.round(window.innerWidth / 2), y: Math.round(window.innerHeight / 2) }, Se.setActionHandler((e, t) => {
        if (e === "hub:click")
          Q.isExpanded ? Q.mode === "shortcuts" ? Xo("main") : Rt() : Gt();
        else if (e === "sector:click" || e === "container:click") {
          const o = Co.find((n) => n.id === t?.id || e === "container:click" && n.id === Q.activeSectorId);
          o && Ua(o);
        } else if (e === "sector:hover") {
          const o = Q.sectors.find((n) => n.id === t?.id);
          o && (Se.setHub({ icon: o.icon, title: o.title, desc: o.desc, active: !0 }), Se.setActiveSector(o.id), Se.setBeam(o.angleDeg, Co.length));
        } else e === "sector:leave" && (Se.setActiveSector(null), Se.setBeam(null, 0), Se.setHub(Q.mode === "shortcuts" ? { icon: "🔙", title: c("navwheel.shortcuts") } : Q.mode === "tools" ? { icon: "🧰", title: c("navwheel.tools") } : null));
      }), window.addEventListener("logicweaver:dock-modules-changed", pn), window.addEventListener("pointermove", hn, { passive: !0 }), window.addEventListener("mousedown", fn, !0), window.addEventListener("auxclick", gn, !0), window.addEventListener("keydown", mn, !0), go = (e, t) => {
        t === "local" && (e.siteShelfLinks || e.logicweaverNavWheelShortcutsV1) && this.loadShortcuts();
      }, Lt()?.onChanged?.addListener(go);
      try {
        if (!fo) return;
        Yn = !1, Se.setVisibility(!1);
      } catch {
      }
      await this.loadShortcuts(), st();
    }
  },
  stop() {
    fo = !1, wi?.(), wi = null, Se.setActionHandler(null), window.removeEventListener("logicweaver:dock-modules-changed", pn), window.removeEventListener("pointermove", hn), window.removeEventListener("mousedown", fn, !0), window.removeEventListener("auxclick", gn, !0), window.removeEventListener("keydown", mn, !0), go && Lt()?.onChanged?.removeListener(go), go = null;
  },
  async loadShortcuts() {
    try {
      const e = await Lt()?.local?.get(["siteShelfLinks", "logicweaverNavWheelShortcutsV1"]);
      if (!fo) return;
      const t = e?.siteShelfLinks?.length ? e.siteShelfLinks : e?.logicweaverNavWheelShortcutsV1;
      Ei = (Array.isArray(t) ? t : []).map((o, n) => ({
        id: String(o.id || `wheel-${n}`),
        title: String(o.title || o.url || c("navwheel.site")),
        desc: String(o.url || ""),
        url: String(o.url || ""),
        icon: Ja(o)
      })), Q.mode === "shortcuts" && st();
    } catch (e) {
      console.warn("[NavWheel] 读取快捷方式失败", e);
    }
  },
  open(e, t) {
    Gt(e ?? ht.x, t ?? ht.y);
  },
  close: Rt,
  get isEditingShortcuts() {
    return nt;
  },
  isLinkInWheel(e) {
    return e ? Ei.some((t) => t.url === e) : !1;
  },
  toggleEditingShortcuts: Xn,
  handleLinkSelection: Ya,
  removeShortcut: qa,
  toggle(e = !1) {
    Q.isExpanded ? Rt() : e ? Gt(ht.x, ht.y) : Gt();
  },
  toggleTools(e = !0) {
    Q.isExpanded && Q.mode === "tools" ? Rt() : Gt(
      e ? ht.x : Q.ballPosition.x,
      e ? ht.y : Q.ballPosition.y,
      "tools"
    );
  },
  setMode(e) {
    Xo(e);
  }
};
class Jt {
  constructor() {
    this.activeShortcuts = { ...ri }, this.isListenerBound = !1, this.storageListenerBound = !1, this.shortcutReadVersion = 0, this.initShortcuts();
  }
  static getInstance() {
    return Jt.instance || (Jt.instance = new Jt()), Jt.instance;
  }
  getShortcuts() {
    return { ...this.activeShortcuts };
  }
  async setShortcut(t, o) {
    if (typeof t != "string" || !t || typeof o != "string")
      throw new Error("快捷键参数无效，未保存");
    if (typeof chrome > "u" || !chrome.storage?.local)
      throw new Error("快捷键存储不可用，未保存");
    const { optionsService: n, SHORTCUT_STORAGE_KEY: a } = await import("./options.service-BX-l3ws1.js").then((C) => C.g), b = (await chrome.storage.local.get(a))[a], g = { ...b || {}, [t]: o }, l = this.shortcutReadVersion, h = await n.saveSettings(
      { [a]: g },
      { [a]: b }
    );
    l === this.shortcutReadVersion && (++this.shortcutReadVersion, this.applyShortcutOverrides(h[a]));
  }
  applyShortcutOverrides(t) {
    const o = t && typeof t == "object" && !Array.isArray(t) ? Object.entries(t).filter((n) => Object.prototype.hasOwnProperty.call(ri, n[0]) && typeof n[1] == "string") : [];
    this.activeShortcuts = { ...ri, ...Object.fromEntries(o) };
  }
  async initShortcuts() {
    if (!(typeof chrome > "u" || !chrome.storage?.local))
      try {
        !this.storageListenerBound && chrome.storage?.onChanged?.addListener && (chrome.storage.onChanged.addListener((n, a) => {
          a === "local" && Object.prototype.hasOwnProperty.call(n, "customShortcuts") && (++this.shortcutReadVersion, this.applyShortcutOverrides(n.customShortcuts.newValue));
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
    if (!t || !en(t)) return !1;
    if (Xe(t))
      return De.handleToolClick(t), !0;
    switch (t) {
      case "bookmarks":
        return Zo.toggle(), !0;
      case "settings":
        return Qo.open(), !0;
      case "nav-wheel":
        return je.toggle(!0), !0;
      case "toolbox":
        return je.toggleTools(!0), !0;
      case "pricing":
        return Wt.enter("daily-pricing"), !0;
      case "search": {
        if (typeof document < "u") {
          const o = document.getElementById("search-input");
          if (o)
            return o.focus(), o.select(), !0;
        }
        return !1;
      }
      case "todoist-new-task":
        return typeof window < "u" && typeof window.triggerTodoistQuickAdd == "function" ? window.triggerTodoistQuickAdd() : De.handleToolClick("todoist"), !0;
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
        if (ji.active || t.defaultPrevented || t.isComposing || t.repeat || t.target && (t.target.matches("input, textarea, select") || t.target.isContentEditable) && !t.altKey && !t.ctrlKey && !t.metaKey)
          return;
        const n = sa(t);
        if (!n) return;
        const a = n.toLowerCase();
        for (const [d, b] of Object.entries(this.activeShortcuts))
          if (!(!b || !en(d)) && b.toLowerCase().replace(/^cmd\+/, "meta+") === a) {
            t.preventDefault(), t.stopPropagation(), this.triggerToolShortcut(d);
            break;
          }
      },
      !0
    ));
  }
}
const Pi = Jt.getInstance();
class Zt {
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
        } catch (n) {
          console.warn("[PageVisibility] callback error:", n);
        }
    });
  }
  static getInstance() {
    return Zt.instance || (Zt.instance = new Zt()), Zt.instance;
  }
  get isVisible() {
    return Tt(this._isVisible);
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
const Za = Zt.getInstance(), vn = [
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
function Wo(e) {
  return e === 0 ? { emoji: "☀️", label: c("weather.condition.clear") } : e <= 2 ? { emoji: "🌤️", label: c("weather.condition.mainlyClear") } : e === 3 ? { emoji: "☁️", label: c("weather.condition.cloudy") } : e === 45 || e === 48 ? { emoji: "🌫️", label: c("weather.condition.fog") } : e >= 51 && e <= 57 ? { emoji: "🌦️", label: c("weather.condition.drizzle") } : e >= 61 && e <= 67 ? { emoji: "🌧️", label: c("weather.condition.rain") } : e >= 71 && e <= 77 ? { emoji: "🌨️", label: c("weather.condition.snow") } : e >= 80 && e <= 82 ? { emoji: "🌧️", label: c("weather.condition.rainShower") } : e >= 85 && e <= 86 ? { emoji: "🌨️", label: c("weather.condition.snowShower") } : e >= 95 ? { emoji: "⛈️", label: c("weather.condition.thunderstorm") } : { emoji: "🌡️", label: c("weather.condition.unknown") };
}
class Qt {
  constructor() {
    this.currentCity = "武汉", this.isRefreshing = !1, this.activeRequestId = 0, this.lastRawForecastData = null, this.initStorage();
  }
  static getInstance() {
    return Qt.instance || (Qt.instance = new Qt()), Qt.instance;
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
    const { city: t, loc: o, d: n } = this.lastRawForecastData;
    this.applyForecastPayload(t, o, n);
  }
  applyForecastPayload(t, o, n) {
    const a = Wo(n.current?.weather_code ?? 0), d = Math.round(n.current?.temperature_2m ?? 0), b = n.hourly?.time || [], g = Date.now();
    let l = b.findIndex((L) => new Date(L).getTime() >= g);
    l < 0 && (l = 0);
    const h = [];
    for (let L = l; L < Math.min(l + 5, b.length); L++) {
      const W = L === l ? c("weather.now") : c("weather.hourSuffix", { hour: new Date(b[L]).getHours() }), O = Wo(n.hourly.weather_code[L]), J = Math.round(n.hourly.temperature_2m[L]);
      h.push({ time: W, emoji: O.emoji, temp: J });
    }
    let C = c("weather.noRain12h");
    for (let L = l; L < Math.min(l + 12, b.length); L++) {
      const W = n.hourly.weather_code[L], O = n.hourly.precipitation_probability?.[L] || 0;
      if (W >= 51 || O >= 60) {
        const J = new Date(b[L]).getHours(), k = W >= 71 && W <= 77 || W === 85 || W === 86 ? c("weather.snow") : c("weather.rain"), $ = O ? ` (${O}%)` : "";
        C = c("weather.expectPrecip", { time: `${J}:00`, type: k, prob: $ });
        break;
      }
    }
    const D = [c("weather.today"), c("weather.tomorrow"), c("weather.afterTomorrow")], m = [], S = n.daily?.time?.length || 0;
    for (let L = 1; L < Math.min(3, S); L++) {
      const W = D[L] || c("weather.plusDays", { count: L }), O = Wo(n.daily.weather_code[L]), J = `${Math.round(n.daily.temperature_2m_max[L])}°/${Math.round(n.daily.temperature_2m_min[L])}°`;
      m.push({ label: W, emoji: O.emoji, tempRange: J });
    }
    const f = Math.round(n.daily?.temperature_2m_max?.[0] ?? d), y = Math.round(n.daily?.temperature_2m_min?.[0] ?? d), I = c("weather.tempRange", { cond: a.label, max: f, min: y }), v = {
      cityName: o.name || t,
      currentEmoji: a.emoji,
      currentTemp: d,
      subText: I,
      rainText: C,
      hours: h,
      days: m
    };
    if (it.ready(v, t), n.daily?.time) {
      const L = [
        c("weather.weekday.sun"),
        c("weather.weekday.mon"),
        c("weather.weekday.tue"),
        c("weather.weekday.wed"),
        c("weather.weekday.thu"),
        c("weather.weekday.fri"),
        c("weather.weekday.sat")
      ], W = [];
      for (let O = 0; O < n.daily.time.length; O++) {
        const J = new Date(n.daily.time[O]), M = O === 0 ? c("weather.today") : O === 1 ? c("weather.tomorrow") : O === 2 ? c("weather.afterTomorrow") : L[J.getDay()], k = Wo(n.daily.weather_code[O]);
        W.push({
          date: `${J.getMonth() + 1}/${J.getDate()}`,
          dayName: M,
          emoji: k.emoji,
          condition: k.label,
          highTemp: Math.round(n.daily.temperature_2m_max[O]),
          lowTemp: Math.round(n.daily.temperature_2m_min[O]),
          rainProb: n.daily.precipitation_probability_max?.[O] || 0
        });
      }
      it.setForecastDays(W);
    }
    const x = {
      humidity: n.current?.relative_humidity_2m ? `${n.current.relative_humidity_2m}%` : "60%",
      wind: n.current?.wind_speed_10m ? `${Math.round(n.current.wind_speed_10m)} km/h` : c("weather.detail.windLight"),
      uvIndex: c("weather.detail.uvNormal"),
      airQuality: c("weather.detail.airGood")
    };
    it.setDetailInfo(x);
  }
  filterCities(t, o = 8) {
    const n = t.trim().toLowerCase();
    if (!n) return vn.slice(0, o);
    const a = [];
    for (const d of vn) {
      const b = d.name.toLowerCase(), g = d.pinyin.toLowerCase(), l = d.admin.toLowerCase();
      if ((b.startsWith(n) || g.startsWith(n) || b.includes(n) || g.includes(n) || l.includes(n)) && a.push(d), a.length >= o) break;
    }
    return a;
  }
  async loadWeather(t) {
    const o = (t || this.currentCity || "").trim();
    if (!o) {
      it.unconfigured();
      return;
    }
    if (this.isRefreshing) return;
    this.isRefreshing = !0;
    const n = ++this.activeRequestId;
    it.loading(o);
    try {
      const a = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(o)}&count=1&language=zh&format=json`, d = await fetch(a);
      if (n !== this.activeRequestId || K.state === "unconfigured") {
        this.isRefreshing = !1;
        return;
      }
      const g = (await d.json()).results?.[0];
      if (!g) {
        n === this.activeRequestId && K.state !== "unconfigured" && it.notFound(o), this.isRefreshing = !1;
        return;
      }
      const l = `https://api.open-meteo.com/v1/forecast?latitude=${g.latitude}&longitude=${g.longitude}&current=temperature_2m,weather_code,relative_humidity_2m,wind_speed_10m&hourly=temperature_2m,weather_code,precipitation_probability&daily=temperature_2m_max,temperature_2m_min,weather_code,precipitation_probability_max&forecast_days=7&timezone=auto`, h = await fetch(l);
      if (n !== this.activeRequestId || K.state === "unconfigured") {
        this.isRefreshing = !1;
        return;
      }
      const C = await h.json();
      this.lastRawForecastData = { city: o, loc: g, d: C }, n === this.activeRequestId && K.state !== "unconfigured" && this.applyForecastPayload(o, g, C);
    } catch (a) {
      n === this.activeRequestId && K.state !== "unconfigured" && it.error(a?.message || "天气加载失败，右键此处可重新选择地点。", o);
    } finally {
      n === this.activeRequestId && (this.isRefreshing = !1);
    }
  }
}
const Kt = Qt.getInstance();
function Qa(e, t) {
  window.LogicWeaverIntro = dt, window.LogicWeaverStartupIntro = dt, window.LogicWeaverNotifications = ye, window.LogicWeaverWindowManager = De, window.LogicWeaverWindowTabs = De, window.LogicWeaverDomFreezer = aa, window.LogicWeaverWallpaperService = Vo, window.LogicWeaverLauncherService = Te, window.LogicWeaverLauncherRuntime = Si, window.LogicWeaverProfileService = ln;
  try {
    ln.init();
  } catch (o) {
    console.error("[ProfileService] init failed:", o);
  }
  window.LogicWeaverBookmarksService = Oi, window.LogicWeaverCalendarService = Js, window.LogicWeaverWeather = it, window.LogicWeaverWeatherService = Kt, window.LogicWeaverClock = Xt, window.LogicWeaverSearch = Ks, window.LogicWeaverSearchService = Vs, Object.defineProperty(window, "LogicWeaverAiHotService", {
    configurable: !0,
    get: () => {
      import("./aihot.service-DuPJ88JV.js").then(({ aiHotService: o }) => {
        window.LogicWeaverAiHotService = o;
      });
    }
  }), window.LogicWeaverHomeMusic = Ve, window.LogicWeaverLauncherGroups = Oe, window.LogicWeaverProfileMenu = Lo, window.LogicWeaverWorkspaceLaunchers = Gi, window.LogicWeaverMacDock = ft, window.LogicWeaverFullscreen = Wt, window.enterFullscreenCard = (o) => Wt.enter(o), window.exitFullscreenCard = () => Wt.exit(), window.cycleFullscreenCard = () => Wt.cycle(), window.LogicWeaverPageVisibility = Za, window.LogicWeaverBackgroundLibrary = nn, window.LogicWeaverNotificationCenter = $t, window.LogicWeaverBookmarkMenu = Bi, window.LogicWeaverBookmarkPanel = Zo, window.LogicWeaverBookmarkFolderStrip = Uo, window.LogicWeaverLauncherDialogs = Dn, window.LogicWeaverLauncherFolder = An, window.LogicWeaverLauncherMenus = Hi, window.LogicWeaverSettings = Qo, window.LogicWeaverClockSettings = Nt, window.LogicWeaverBiliTheater = _o, window.LogicWeaverBilibiliService = Ji, window.getBiliJct = () => Ji.getBiliJct(), window.LogicWeaverBiliMiniPlayer = Ii, window.openBiliMiniPlayer = (o) => Ii.openVideo(o), window.LogicWeaverAiDialog = Ki, window.LogicWeaverAihotViewer = zi, window.LogicWeaverNavWheel = Se, window.openNavWheel = (o, n) => je.open(o, n), window.closeNavWheel = () => je.close(), window.toggleNavWheel = (o) => je.toggle(o), window.toggleToolWheel = (o) => je.toggleTools(o), window.setNavWheelMode = (o) => je.setMode(o), window.LogicWeaverShortcuts = Pi, window.triggerToolShortcut = (o) => Pi.triggerToolShortcut(o), window.LogicWeaverCommands = e, window.LogicWeaverFeatures = t, window.LogicWeaverCalendarView = Zs, window.LogicWeaverGitHubStatus = Fi, window.LogicWeaverGitHubFolders = Et, window.LogicWeaverGitHubHero = bo, window.LogicWeaverGitHubRepositories = _t, window.LogicWeaverGitHubBatchBar = ko, window.LogicWeaverTodoistLabels = Qs, window.LogicWeaverTodoistWorkspace = ea, window.LogicWeaverTodoistCalendarSidebar = ta, window.LogicWeaverTodoistTaskList = oa, window.LogicWeaverBiliMessagePanel = Pt, window.LogicWeaverStickerBoard = da, window.LogicWeaverStickersService = ua, window.LogicWeaverPricing = Nn, window.LogicWeaverBiliFavorites = Pn, window.LogicWeaverBiliRadioTape = ga, window.LogicWeaverBiliOrganizerDialogs = pa, window.LogicWeaverBiliUpGroupManager = ha, window.LogicWeaverBiliUpPreview = zo, window.LogicWeaverYouTube = Rn, window.LogicWeaverAihotFeed = Wn, window.LogicWeaverGitHubTrending = Vn, window.LogicWeaverCalendarWorkspace = qt, window.LogicWeaverCalendar = qt, window.LogicWeaverTodoistMainWorkspace = ia, window.LogicWeaverTodoistTaskDetail = Oa, window.openBiliTheater = (o) => _o.openVideo(o), window.closeBiliTheater = () => _o.close(), window.showWindowsToast = (o) => {
    if (!o) return null;
    const n = ai(o.target) || Zi(o.url) || (o.appType === "bili" ? Ps([o.title, o.subtitle, o.message].filter((a) => typeof a == "string").join(" ")) : void 0);
    return ye.show({
      ...o,
      target: n,
      onClick: () => {
        if (typeof o?.onClick == "function") return o.onClick();
        if (n) return $t.openTarget(n);
        if (o?.url) {
          window.open(o.url, "_blank");
          return;
        }
      }
    });
  }, window.showToast = (o, n = !1, a = 3200) => window.showWindowsToast({
    appName: "系统提醒",
    icon: n ? "assets/error.svg" : "assets/logo.png",
    title: n ? "操作提醒" : "系统提醒",
    subtitle: o,
    duration: a
  }), window.showBiliToast = (o, n = 3200, a = {}) => {
    const d = typeof n == "object" && n ? n : a, b = typeof n == "number" ? n : 3200, g = d.isError || /失败|错误|异常|未获取|未找到/i.test(o), l = d.title || (g ? "B站操作未完成" : "哔哩哔哩"), h = d.subtitle || (o.length > 36 ? "" : o), C = d.message || (d.subtitle || o.length > 36 ? o : ""), D = {
      id: d.id || `bili_toast_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      appType: "bili",
      appName: "哔哩哔哩",
      icon: "assets/bilibili.svg",
      title: l,
      subtitle: h || o,
      message: C && C !== h ? C : "",
      showActions: !!(d.showActions || d.actionLabel),
      actionLabel: d.actionLabel || "",
      onClick: d.onClick || null,
      target: ai(d.target) || Zi(d.url) || ai({ type: "bili-video", bvid: d.bvid, aid: d.aid ? String(d.aid) : void 0 }),
      url: d.url,
      duration: Math.max(3e3, b)
    };
    return window.showWindowsToast(D);
  }, window.showFetchToast = (o, n, a = "", d = "assets/logo.png", b = 3200) => window.showWindowsToast({
    appName: o,
    title: n,
    subtitle: a,
    icon: d || "assets/logo.png",
    duration: b,
    showActions: !1,
    actionLabel: "",
    appType: "fetch"
  }), window.LogicWeaverKineticDrag = ya, window.LogicWeaverMarkdownAst = wa, window.setLauncherBackground = (o) => Vo.setWallpaper(o), window.backgroundDbClear = (o) => Ws(o), window.openBackgroundHistory = () => nn.openDialog();
}
const Re = be({
  isOpen: !1,
  query: "",
  selectedIndex: 0
});
let No = null;
const Jn = {
  get state() {
    return Re;
  },
  open() {
    Re.isOpen || (Re.isOpen = !0, Re.query = "", Re.selectedIndex = 0, No = De.pushModalCloser(() => (this.close(), !0)));
  },
  close() {
    Re.isOpen && (Re.isOpen = !1, Re.query = "", Re.selectedIndex = 0, No && (No(), No = null));
  },
  toggle() {
    Re.isOpen ? this.close() : this.open();
  },
  setQuery(e) {
    Re.query = e, Re.selectedIndex = 0;
  },
  selectNext(e) {
    e <= 0 || (Re.selectedIndex = (Re.selectedIndex + 1) % e);
  },
  selectPrev(e) {
    e <= 0 || (Re.selectedIndex = (Re.selectedIndex - 1 + e) % e);
  },
  async executeCommand(e) {
    this.close();
    try {
      await ei.execute(e.id, void 0, "command-palette");
    } catch (t) {
      console.warn(`[CommandPalette] Failed to execute ${e.id}:`, t);
    }
  }
};
typeof window < "u" && window.addEventListener("keydown", (e) => {
  if (ji.active || e.defaultPrevented || e.isComposing || e.repeat) return;
  const t = (e.key || "").toLowerCase(), o = (e.ctrlKey || e.metaKey) && t === "k", n = e.altKey && (e.code === "Space" || t === " ");
  (o || n) && (e.preventDefault(), e.stopPropagation(), Jn.toggle());
}, !0);
function er(e) {
  e.register({
    id: "palette.toggle",
    title: "打开全局命令中心 (Spotlight)",
    category: "界面",
    keywords: ["命令", "palette", "spotlight", "raycast", "搜索", "cmd"],
    concurrency: "drop",
    run: () => Jn.toggle()
  }), e.register({
    id: "intro.skip",
    title: "跳过开屏动画",
    category: "界面",
    keywords: ["开屏", "启动", "skip"],
    concurrency: "drop",
    enabled: () => dt.enabled && !dt.finished,
    run: () => dt.skip("COMMAND SKIP")
  }), e.register({
    id: "notifications.clear",
    title: "关闭当前 Toast",
    category: "通知",
    keywords: ["toast", "关闭"],
    description: "只关闭浮动提示，不删除通知中心历史",
    concurrency: "drop",
    enabled: () => ye.size > 0,
    run: () => ye.clear()
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
    enabled: () => qt.ready,
    run: () => qt.refresh()
  }), e.register({
    id: "calendar.today",
    title: "日历跳转到今天",
    category: "日历",
    keywords: ["今日", "today", "日期"],
    concurrency: "drop",
    enabled: () => qt.ready,
    run: () => qt.goToday()
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
const tr = {
  key: 0,
  id: "guest-preview-banner",
  class: "guest-preview-banner",
  role: "alert",
  "aria-label": "新用户开箱视角预览提示"
}, or = /* @__PURE__ */ de({
  __name: "GuestPreviewBanner",
  setup(e) {
    function t() {
      Rs.exit();
    }
    return (o, n) => (r(), ce(Ms, { name: "guest-banner-slide" }, {
      default: to(() => [
        s(Ns) ? (r(), p("aside", tr, [
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
        ])) : E("", !0)
      ]),
      _: 1
    }));
  }
}), ir = /* @__PURE__ */ Me(or, [["__scopeId", "data-v-a2f2ca5f"]]), nr = ["hidden"], sr = {
  key: 0,
  class: "bookmark-folder-strip-empty"
}, ar = ["title", "data-bookmark-folder-id", "onClick", "onContextmenu"], rr = /* @__PURE__ */ de({
  __name: "BookmarkFolderStrip",
  setup(e) {
    const t = H(null);
    function o(d) {
      const b = t.value;
      !b || b.scrollWidth <= b.clientWidth || !d.deltaY || (d.preventDefault(), b.scrollLeft += d.deltaY);
    }
    function n(d) {
      Uo.openFolder(d.id);
    }
    function a(d, b) {
      Uo.openContextMenu(b, d.clientX, d.clientY);
    }
    return (d, b) => (r(), p("nav", {
      id: "bookmark-folder-strip",
      ref_key: "stripRef",
      ref: t,
      class: "bookmark-folder-strip",
      "aria-label": "书签栏文件夹",
      hidden: !s(Yt).enabled,
      onWheel: o
    }, [
      s(Yt).folders.length ? E("", !0) : (r(), p("span", sr, u(s(Yt).emptyMessage || "书签栏没有文件夹"), 1)),
      (r(!0), p(Y, null, ge(s(Yt).folders, (g) => (r(), p("button", {
        key: g.id,
        class: "bookmark-folder-chip",
        type: "button",
        title: `打开书签文件夹：${g.title || "未命名"}`,
        "data-bookmark-folder-id": g.id,
        onClick: (l) => n(g),
        onContextmenu: F((l) => a(l, g), ["prevent"])
      }, [
        b[0] || (b[0] = i("span", { "aria-hidden": "true" }, "📁", -1)),
        i("span", null, u(g.title || "未命名"), 1)
      ], 40, ar))), 128))
    ], 40, nr));
  }
}), lr = /* @__PURE__ */ Me(rr, [["__scopeId", "data-v-5e71cc7c"]]), cr = ["aria-label"], dr = { class: "cube-manager-body" }, ur = ["disabled", "onClick", "title"], pr = ["disabled", "onClick", "title"], hr = ["onClick"], fr = ["onClick"], gr = ["onClick"], mr = ["type", "placeholder"], vr = { type: "submit" }, yr = {
  key: 0,
  role: "alert"
}, wr = /* @__PURE__ */ de({
  __name: "CubeConfigDialog",
  setup(e) {
    const t = Ee.state, o = oe(() => Ee.getActiveFaces()), n = oe(() => t.registeredFaces.filter((S) => !t.activeFaceIds.includes(S.id))), a = H(""), d = H("memo"), b = oe(() => [
      { value: "memo", label: c("cube.manager.typeMemo"), icon: "📝" },
      { value: "countdown", label: c("cube.manager.typeCountdown"), icon: "⏳" },
      { value: "link", label: c("cube.manager.typeLink"), icon: "🔗" }
    ]), g = H(""), l = H(!1), h = H(JSON.stringify({ title: "每日一句", icon: "📝", customType: "memo", customData: { text: "今天也要记得休息" } }, null, 2)), C = H("");
    function D(S) {
      C.value = "";
      try {
        S();
      } catch (f) {
        C.value = f instanceof Error ? f.message : "操作失败";
      }
    }
    function m() {
      D(() => {
        const S = l.value ? JSON.parse(h.value) : {
          title: a.value,
          customType: d.value,
          customData: { text: g.value, targetDate: g.value, url: g.value }
        };
        Ee.addCustomFace(S), a.value = "", g.value = "";
      });
    }
    return (S, f) => (r(), ce(yt, { to: "body" }, [
      s(t).isConfigDialogOpen ? (r(), p("section", {
        key: 0,
        class: "cube-manager",
        role: "dialog",
        "aria-label": s(c)("cube.manager.title"),
        onKeydown: f[8] || (f[8] = Ot(F((y) => s(Ee).closeConfigDialog(), ["stop"]), ["esc"]))
      }, [
        i("header", null, [
          i("strong", null, u(s(c)("cube.manager.title")), 1),
          i("button", {
            type: "button",
            "aria-label": "关闭",
            onClick: f[0] || (f[0] = (y) => s(Ee).closeConfigDialog())
          }, "×")
        ]),
        i("div", dr, [
          i("p", null, u(s(c)("cube.manager.desc")), 1),
          (r(!0), p(Y, null, ge(o.value, (y, I) => (r(), p("div", {
            key: y.id,
            class: "cube-row"
          }, [
            i("span", null, u(y.icon) + " " + u(y.title), 1),
            i("button", {
              type: "button",
              disabled: I === 0,
              onClick: (v) => D(() => s(Ee).moveUp(y.id)),
              title: s(c)("cube.manager.moveUp")
            }, "↑", 8, ur),
            i("button", {
              type: "button",
              disabled: I === o.value.length - 1,
              onClick: (v) => D(() => s(Ee).moveDown(y.id)),
              title: s(c)("cube.manager.moveDown")
            }, "↓", 8, pr),
            i("button", {
              type: "button",
              onClick: (v) => D(() => s(Ee).removeCustomFace(y.id))
            }, u(s(c)("cube.manager.removeFace")), 9, hr)
          ]))), 128)),
          (r(!0), p(Y, null, ge(n.value, (y) => (r(), p("div", {
            key: y.id,
            class: "cube-row"
          }, [
            i("span", null, u(y.title) + u(s(c)("cube.manager.inactiveSuffix")), 1),
            i("button", {
              type: "button",
              onClick: (I) => D(() => s(Ee).toggleActive(y.id, !0))
            }, u(s(c)("cube.manager.add")), 9, fr),
            y.builtIn ? E("", !0) : (r(), p("button", {
              key: 0,
              type: "button",
              onClick: (I) => D(() => s(Ee).removeCustomFace(y.id))
            }, u(s(c)("cube.manager.delete")), 9, gr))
          ]))), 128)),
          i("h3", null, u(s(c)("cube.manager.addFace")), 1),
          i("label", null, [
            Ue(i("input", {
              "onUpdate:modelValue": f[1] || (f[1] = (y) => l.value = y),
              type: "checkbox"
            }, null, 512), [
              [Ds, l.value]
            ]),
            Ye(" " + u(s(c)("cube.manager.pasteJson")), 1)
          ]),
          i("form", {
            onSubmit: F(m, ["prevent"])
          }, [
            l.value ? (r(), p(Y, { key: 1 }, [
              i("p", null, u(s(c)("cube.manager.securityNotice")), 1),
              Ue(i("textarea", {
                "onUpdate:modelValue": f[6] || (f[6] = (y) => h.value = y),
                rows: "9",
                maxlength: "10000",
                "aria-label": "面的 JSON 配置",
                spellcheck: "false"
              }, null, 512), [
                [oo, h.value]
              ])
            ], 64)) : (r(), p(Y, { key: 0 }, [
              i("label", null, [
                Ye(u(s(c)("cube.manager.fieldTitle")), 1),
                Ue(i("input", {
                  "onUpdate:modelValue": f[2] || (f[2] = (y) => a.value = y),
                  maxlength: "60",
                  required: ""
                }, null, 512), [
                  [oo, a.value]
                ])
              ]),
              i("label", null, [
                Ye(u(s(c)("cube.manager.fieldType")) + " ", 1),
                q(Sn, {
                  modelValue: d.value,
                  "onUpdate:modelValue": f[3] || (f[3] = (y) => d.value = y),
                  options: b.value,
                  size: "sm",
                  onChange: f[4] || (f[4] = (y) => d.value = y)
                }, null, 8, ["modelValue", "options"])
              ]),
              i("label", null, [
                Ye(u(s(c)("cube.manager.fieldContent")), 1),
                Ue(i("input", {
                  "onUpdate:modelValue": f[5] || (f[5] = (y) => g.value = y),
                  type: d.value === "countdown" ? "date" : "text",
                  placeholder: d.value === "link" ? "https://…" : s(c)("cube.manager.contentPlaceholderText"),
                  maxlength: "500",
                  required: ""
                }, null, 8, mr), [
                  [As, g.value]
                ])
              ])
            ], 64)),
            i("button", vr, u(s(c)("cube.manager.submitAdd")), 1)
          ], 32),
          C.value ? (r(), p("p", yr, u(C.value), 1)) : E("", !0)
        ]),
        i("footer", null, [
          i("button", {
            type: "button",
            onClick: f[7] || (f[7] = (y) => D(() => s(Ee).resetDefaults()))
          }, u(s(c)("cube.manager.resetDefault")), 1),
          i("small", null, u(s(c)("cube.manager.resetNotice")), 1)
        ])
      ], 40, cr)) : E("", !0)
    ]));
  }
}), br = /* @__PURE__ */ Me(wr, [["__scopeId", "data-v-8ab459ee"]]), kr = ["data-face"], _r = ["aria-label"], Cr = { class: "ms-top-side" }, xr = ["title"], Lr = ["title"], $r = ["title"], Tr = {
  key: 0,
  class: "ms-top-meta"
}, Sr = {
  class: "ms-top-title",
  style: { color: "#10b981", "font-weight": "700" }
}, Ir = { class: "ms-top-artist" }, Mr = { class: "ms-top-meta" }, Dr = ["title"], Ar = ["title"], Er = {
  key: 0,
  class: "ms-top-divider"
}, Pr = ["title"], Wr = { class: "ms-top-mini-progress" }, Nr = { class: "ms-top-side" }, Rr = ["title"], Or = ["title"], Br = ["aria-label"], Fr = ["title"], Hr = { class: "ms-cube-custom-icon" }, jr = { class: "ms-cube-custom-title" }, zr = ["title"], Gr = {
  key: 1,
  class: "ms-cube-custom-text countdown"
}, Kr = ["href"], Vr = {
  class: "ms-cube-dots",
  "aria-hidden": "true"
}, Ur = ["title", "onClick"], Yr = { class: "ms-cube-cm-header" }, qr = { class: "ms-cube-cm-list" }, Xr = ["onClick"], Jr = { class: "ms-cube-cm-icon" }, Zr = { class: "ms-cube-cm-title" }, Qr = {
  key: 0,
  class: "ms-cube-cm-check"
}, el = /* @__PURE__ */ de({
  __name: "TopInfoCube",
  props: {
    active: { type: Boolean, default: !0 }
  },
  setup(e) {
    const t = e, o = oe(() => In.visible || rt.djModalOpen || rt.isActive && rt.isJoined), n = oe(() => rt.isActive && rt.isJoined), a = oe(() => Ee.getActiveFaces()), d = H("music"), b = H(0);
    let g = !1, l;
    Be(
      () => a.value,
      (B) => {
        B.some((R) => R.id === d.value) || (d.value = B[0]?.id || "");
      },
      { immediate: !0 }
    );
    const h = oe(() => a.value.filter((B) => !B.builtIn)), C = H(!1), D = H({ x: 0, y: 0 });
    Be(() => t.active, (B) => {
      B || (C.value = !1, Ee.closeConfigDialog(), clearTimeout(l), g = !1);
    }, { immediate: !0 });
    const { menuRef: m, style: S } = On({
      visible: () => C.value,
      anchor: () => D.value,
      dismiss: () => {
        C.value = !1;
      }
    });
    function f(B) {
      B.preventDefault(), B.stopPropagation(), D.value = { x: B.clientX, y: B.clientY }, C.value = !0;
    }
    function y(B) {
      P(B), C.value = !1;
    }
    function I() {
      C.value = !1, Ee.openConfigDialog();
    }
    function v() {
      C.value = !1, x(() => Ee.resetDefaults()), P("music");
    }
    function x(B) {
      C.value = !1;
      try {
        B();
      } catch (R) {
        ye.show({ appName: "滚动立方体", title: "保存失败", message: R instanceof Error ? R.message : "请检查浏览器存储" });
      }
    }
    function L(B) {
      if (!B) return c("cube.countdown.noTarget");
      const j = new Date(B).getTime() - $.value, fe = Math.ceil(j / (1e3 * 60 * 60 * 24));
      return fe > 0 ? c("cube.countdown.remaining", { days: fe }) : fe === 0 ? c("cube.countdown.today") : c("cube.countdown.passed", { days: Math.abs(fe) });
    }
    const W = oe(() => !Z.title || Z.title === "点击播放" ? c("home.music.defaultTitle") : Z.title), O = oe(() => !Z.artist || Z.artist === "作者" ? c("home.music.defaultArtist") : Z.artist), J = oe(() => Z.isBiliRadio ? c("cube.source.biliRadio") : Z.isNetease ? c("cube.source.netease") : Z.playing ? c("cube.source.siren") : c("cube.source.idle")), M = oe(() => Z.currentLyric ? Z.currentLyric : Z.playing ? c("cube.defaultPlayingLyric") : c("cube.defaultIdleLyric"));
    function k() {
      De.handleToolClick("music");
    }
    const $ = H(Date.now());
    let X;
    Be(() => t.active && a.value.some((B) => B.id === d.value && B.customType === "countdown"), (B) => {
      B && ($.value = Date.now()), clearInterval(X), X = B ? window.setInterval(() => {
        document.hidden || ($.value = Date.now());
      }, 6e4) : void 0;
    }, { immediate: !0 });
    function P(B, R = null) {
      const j = a.value, fe = j.find((Ce) => Ce.id === B) || j[0];
      if (fe) {
        if (Number.isFinite(R))
          b.value = R;
        else if (fe.id !== d.value) {
          const Ce = j.findIndex((We) => We.id === d.value);
          let me = (j.findIndex((We) => We.id === fe.id) - Ce + j.length) % j.length;
          me > j.length / 2 && (me -= j.length), b.value += me * 90;
        }
        d.value = fe.id;
      }
    }
    function z(B) {
      const R = a.value;
      if (R.length <= 1) return;
      const j = R.findIndex((me) => me.id === d.value), Ce = ((j >= 0 ? j : 0) + B + R.length) % R.length, Ie = R[Ce];
      Ie && P(Ie.id, b.value + B * 90);
    }
    function N(B) {
      a.value.length <= 1 || B.altKey || Math.abs(B.deltaY) < 2 || (B.preventDefault(), !g && (g = !0, z(B.deltaY > 0 ? 1 : -1), l = setTimeout(() => {
        g = !1;
      }, 420)));
    }
    function U(B) {
      !["ArrowUp", "ArrowDown", "PageUp", "PageDown"].includes(B.key) || B.target?.closest?.("input") || (B.preventDefault(), z(["ArrowDown", "PageDown"].includes(B.key) ? 1 : -1));
    }
    function he(B, R) {
      return d.value === B ? {
        transform: `rotateX(${-b.value}deg) translateZ(22px)`,
        visibility: "visible"
      } : {
        transform: `rotateX(-${R}deg) translateZ(22px)`,
        visibility: "hidden"
      };
    }
    function _e(B) {
      const R = B.target;
      R && (R.tagName === "INPUT" || R.tagName === "TEXTAREA" || R.isContentEditable) || (B.preventDefault(), B.stopPropagation());
    }
    function Ze(B) {
      const R = B.target;
      R && (R.tagName === "INPUT" || R.tagName === "TEXTAREA" || R.isContentEditable) || B.preventDefault();
    }
    return St(() => {
      clearInterval(X), clearTimeout(l);
    }), (B, R) => Ue((r(), p("div", {
      class: "ms-top-player",
      "data-face": d.value,
      tabindex: "0",
      title: "滚动立方体 · 滚轮切换面板，右键可自由增删与排序",
      "aria-label": "滚动立方体",
      onWheel: N,
      onKeydown: U,
      onContextmenu: f,
      onCopy: _e,
      onSelectstart: Ze
    }, [
      a.value.length ? E("", !0) : (r(), p("button", {
        key: 0,
        type: "button",
        class: "ms-cube-cm-action",
        onClick: I
      }, "＋ 添加面（右键管理）")),
      i("div", {
        class: "ms-top-cube",
        style: ke({ transform: `translateZ(-22px) rotateX(${b.value}deg)` })
      }, [
        s(Ee).isActive("music") && d.value === "music" ? (r(), p("section", {
          key: 0,
          class: "ms-top-face ms-top-face-music",
          "aria-label": s(c)("cube.musicFaceAria"),
          style: ke(he("music", 0))
        }, [
          i("div", Cr, [
            i("button", {
              class: "ms-top-prev",
              title: s(c)("cube.prevTrack"),
              type: "button",
              onClick: R[0] || (R[0] = F((j) => s(Ve).prev(), ["stop"]))
            }, "⏮", 8, xr),
            i("button", {
              class: "ms-top-play",
              title: s(c)("cube.playPause"),
              type: "button",
              onClick: R[1] || (R[1] = F((j) => s(Ve).togglePlay(), ["stop"]))
            }, u(s(Z).playing ? "⏸" : "▶"), 9, Lr)
          ]),
          i("button", {
            class: "ms-top-main",
            title: s(c)("cube.openMusicPicker"),
            type: "button",
            onClick: F(k, ["stop"])
          }, [
            o.value ? (r(), p("div", Tr, [
              i("span", Sr, " 🎧 " + u(n.value ? s(c)("cube.listeningTogether") : s(c)("cube.listening")) + "：" + u(W.value), 1),
              i("span", Ir, u(O.value), 1)
            ])) : (r(), p(Y, { key: 1 }, [
              i("div", Mr, [
                i("span", {
                  class: "ms-top-title",
                  title: W.value
                }, u(W.value), 9, Dr),
                i("span", {
                  class: "ms-top-artist",
                  title: O.value
                }, u(O.value), 9, Ar),
                i("span", {
                  class: le(["ms-top-source", { idle: !s(Z).playing }])
                }, u(J.value), 3),
                M.value ? (r(), p("span", Er)) : E("", !0)
              ]),
              M.value ? (r(), p("span", {
                key: 0,
                class: "ms-top-lyric",
                title: M.value
              }, u(M.value), 9, Pr)) : E("", !0)
            ], 64)),
            i("div", Wr, [
              i("div", {
                class: "ms-top-mini-fill",
                style: ke({ width: s(Z).progressPercent + "%" })
              }, null, 4)
            ])
          ], 8, $r),
          i("div", Nr, [
            i("button", {
              class: "ms-top-next",
              title: s(c)("cube.nextTrack"),
              type: "button",
              onClick: R[2] || (R[2] = F((j) => s(Ve).next(), ["stop"]))
            }, "⏭", 8, Rr),
            i("button", {
              class: "ms-top-open",
              title: s(c)("cube.openPlaylist"),
              type: "button",
              onClick: F(k, ["stop"])
            }, "🎵", 8, Or)
          ])
        ], 12, _r)) : E("", !0),
        (r(!0), p(Y, null, ge(h.value, (j, fe) => (r(), p("section", {
          key: j.id,
          class: "ms-top-face ms-top-face-custom",
          "aria-label": j.title,
          style: ke(he(j.id, (fe + 1) * 90))
        }, [
          d.value === j.id ? (r(), p("div", {
            key: 0,
            class: "ms-cube-custom-body",
            title: j.desc
          }, [
            i("span", Hr, u(j.icon), 1),
            i("strong", jr, u(j.title), 1),
            R[10] || (R[10] = i("span", { class: "ms-cube-divider" }, null, -1)),
            j.customType === "memo" ? (r(), p("span", {
              key: 0,
              class: "ms-cube-custom-text",
              title: j.customData?.text
            }, u(j.customData?.text || s(c)("cube.memo.clickToConfig")), 9, zr)) : j.customType === "countdown" ? (r(), p("span", Gr, u(L(j.customData?.targetDate)), 1)) : j.customType === "link" ? (r(), p("a", {
              key: 2,
              href: j.customData?.url,
              target: "_blank",
              rel: "noreferrer",
              class: "ms-cube-custom-link",
              onClick: R[3] || (R[3] = F(() => {
              }, ["stop"]))
            }, u(j.customData?.url) + " ↗ ", 9, Kr)) : E("", !0)
          ], 8, Fr)) : E("", !0),
          i("button", {
            type: "button",
            class: "ms-cube-config-trigger",
            title: "管理立方体面",
            onClick: R[4] || (R[4] = F((Ce) => s(Ee).openConfigDialog(), ["stop"]))
          }, " ⚙ ")
        ], 12, Br))), 128))
      ], 4),
      i("div", Vr, [
        (r(!0), p(Y, null, ge(a.value, (j) => (r(), p("i", {
          key: j.id,
          class: le({ on: d.value === j.id }),
          title: j.title,
          onClick: F((fe) => P(j.id), ["stop"])
        }, null, 10, Ur))), 128))
      ]),
      (r(), ce(yt, { to: "body" }, [
        t.active && C.value ? (r(), p("div", {
          key: 0,
          ref_key: "menuRef",
          ref: m,
          class: "ms-cube-context-menu",
          style: ke(s(S)),
          onClick: R[9] || (R[9] = F(() => {
          }, ["stop"]))
        }, [
          i("div", Yr, [
            R[11] || (R[11] = i("span", null, "🎲 滚动立方体面", -1)),
            i("button", {
              type: "button",
              class: "ms-cube-cm-close",
              onClick: R[5] || (R[5] = (j) => C.value = !1)
            }, "×")
          ]),
          i("div", qr, [
            (r(!0), p(Y, null, ge(a.value, (j) => (r(), p("button", {
              key: j.id,
              type: "button",
              class: le(["ms-cube-cm-item", { active: d.value === j.id }]),
              onClick: (fe) => y(j.id)
            }, [
              i("span", Jr, u(j.icon), 1),
              i("span", Zr, u(j.title), 1),
              d.value === j.id ? (r(), p("span", Qr, "✓")) : E("", !0)
            ], 10, Xr))), 128))
          ]),
          R[16] || (R[16] = i("div", { class: "ms-cube-cm-divider" }, null, -1)),
          i("button", {
            type: "button",
            class: "ms-cube-cm-action",
            onClick: I
          }, [...R[12] || (R[12] = [
            i("span", null, "＋ 添加面 / 管理面", -1)
          ])]),
          i("button", {
            type: "button",
            class: "ms-cube-cm-action",
            onClick: R[6] || (R[6] = (j) => {
              z(-1), C.value = !1;
            })
          }, [...R[13] || (R[13] = [
            i("span", null, "⏮ 上一个面板", -1)
          ])]),
          i("button", {
            type: "button",
            class: "ms-cube-cm-action",
            onClick: R[7] || (R[7] = (j) => {
              z(1), C.value = !1;
            })
          }, [...R[14] || (R[14] = [
            i("span", null, "⏭ 下一个面板", -1)
          ])]),
          d.value ? (r(), p("button", {
            key: 0,
            type: "button",
            class: "ms-cube-cm-action danger",
            onClick: R[8] || (R[8] = (j) => x(() => s(Ee).removeCustomFace(d.value)))
          }, "删除当前面")) : E("", !0),
          i("button", {
            type: "button",
            class: "ms-cube-cm-action danger",
            onClick: v
          }, [...R[15] || (R[15] = [
            i("span", null, "↺ 恢复默认（仅音乐）", -1)
          ])])
        ], 4)) : E("", !0)
      ])),
      t.active ? (r(), ce(br, { key: 1 })) : E("", !0)
    ], 40, kr)), [
      [io, t.active]
    ]);
  }
}), tl = /* @__PURE__ */ Me(el, [["__scopeId", "data-v-591e9de8"]]), wo = be({
  isOpen: !1
}), Zn = {
  open() {
    wo.isOpen = !0;
  },
  close() {
    wo.isOpen = !1;
  },
  toggle() {
    wo.isOpen = !wo.isOpen;
  }
}, Wi = Tt(wo);
function ol() {
  if (typeof chrome > "u" || !chrome.runtime?.onMessage) return () => {
  };
  let e = !1, t;
  const o = (n, a, d) => {
    a.id !== chrome.runtime.id || n?.type !== "TOGGLE_SIDE_DRAWER" || t === void 0 || n.targetTabId !== t || (Zn.toggle(), d({ ok: !0 }));
  };
  return chrome.tabs.getCurrent().then((n) => {
    e || (t = n?.id, chrome.runtime.onMessage.addListener(o));
  }).catch(() => console.warn("[SideDrawer] Could not bind the home-page command.")), () => {
    e = !0, chrome.runtime.onMessage.removeListener(o);
  };
}
const il = { class: "tb-brand" }, nl = ["title", "aria-expanded", "aria-label"], sl = ["src", "alt"], al = ["hidden"], rl = ["title", "hidden"], ll = { id: "vue-bookmark-folder-strip-root" }, cl = { class: "tb-actions" }, dl = {
  id: "workspace-launchers",
  hidden: ""
}, ul = ["title", "aria-expanded"], pl = ["title"], hl = /* @__PURE__ */ de({
  __name: "AppTopBar",
  setup(e) {
    const t = G(() => import("./WorkspaceLaunchers-pKESr7mk.js"));
    function o(l) {
      l.preventDefault(), l.stopPropagation();
      const h = typeof window < "u" ? window : null;
      h?.LogicWeaverWindowManager?.open ? h.LogicWeaverWindowManager.open("settings") : h?.LogicWeaverWindowTabs?.open ? h.LogicWeaverWindowTabs.open("settings") : Qo.open();
    }
    function n(l) {
      l.preventDefault();
      const h = typeof window < "u" ? window : null;
      typeof h?.toggleBookmarkPanel == "function" ? h.toggleBookmarkPanel() : h?.LogicWeaverBookmarkPanel?.toggle ? h.LogicWeaverBookmarkPanel.toggle() : Oi.toggleBookmarkPanel();
    }
    function a(l) {
      l.preventDefault(), $t.toggle();
    }
    function d(l) {
      l.preventDefault(), Lo.open(l.clientX, l.clientY);
    }
    function b(l) {
      const h = l.target;
      h && (h.tagName === "INPUT" || h.tagName === "TEXTAREA" || h.isContentEditable) || (l.preventDefault(), l.stopPropagation());
    }
    function g(l) {
      const h = l.target;
      h && (h.tagName === "INPUT" || h.tagName === "TEXTAREA" || h.isContentEditable) || l.preventDefault();
    }
    return Ke(() => {
      $t.start();
      const l = localStorage.getItem("theme") || "light";
      document.documentElement.dataset.theme = l, document.documentElement.setAttribute("data-theme", l);
    }), (l, h) => (r(), p("header", {
      class: le(["topbar", { "bookmark-folders-mode": s(Yt).enabled }]),
      onCopy: b,
      onSelectstart: g
    }, [
      i("div", il, [
        i("button", {
          id: "bili-profile-button",
          class: "bili-profile-button",
          type: "button",
          title: s(c)("topbar.notifications"),
          "aria-controls": "notification-center",
          "aria-expanded": s(Mn).isOpen,
          "aria-label": s(lo) ? s(c)("topbar.notificationsUnread", { count: s(lo) }) : s(c)("topbar.notifications"),
          onClick: a,
          onContextmenu: h[0] || (h[0] = F((C) => d(C), ["prevent"]))
        }, [
          i("img", {
            id: "bili-profile-avatar",
            src: s(Vt).avatarUrl || "assets/bilibili.svg",
            alt: s(Vt).userName || s(c)("topbar.notifications")
          }, null, 8, sl),
          i("span", {
            id: "bili-profile-badge",
            class: "bili-profile-badge",
            hidden: s(lo) <= 0
          }, u(s(lo) > 99 ? "99+" : s(lo)), 9, al)
        ], 40, nl),
        i("button", {
          id: "bookmark-handle",
          class: "bookmark-handle",
          type: "button",
          "aria-expanded": "false",
          title: s(c)("topbar.bookmarks"),
          hidden: s(Yt).enabled,
          onClick: n
        }, [
          h[2] || (h[2] = i("span", { id: "bookmark-handle-icon" }, "📁", -1)),
          i("span", null, u(s(c)("topbar.bookmarks")), 1)
        ], 8, rl),
        i("div", ll, [
          q(lr)
        ])
      ]),
      q(tl, {
        active: !s(xt).activeId
      }, null, 8, ["active"]),
      i("div", cl, [
        h[3] || (h[3] = i("button", {
          id: "daily-toggle",
          class: "tb-pill",
          type: "button",
          hidden: "",
          title: "查看日报"
        }, "📰 日报", -1)),
        i("span", dl, [
          q(s(t))
        ]),
        i("button", {
          id: "side-drawer-toggle",
          class: le(["tb-btn", { active: s(Wi).isOpen }]),
          type: "button",
          title: s(c)("topbar.sidebar"),
          "aria-controls": "in-page-side-drawer",
          "aria-expanded": s(Wi).isOpen,
          onClick: h[1] || (h[1] = (C) => s(Zn).toggle())
        }, " 📑 ", 10, ul),
        i("button", {
          id: "settings-open",
          class: "tb-btn",
          title: s(c)("topbar.settings"),
          onClick: o
        }, "⚙", 8, pl)
      ])
    ], 34));
  }
}), fl = {
  key: 0,
  class: "notice"
}, gl = {
  key: 1,
  class: "muted small"
}, ml = {
  key: 2,
  class: "notice"
}, vl = {
  key: 3,
  class: "notice"
}, yl = { class: "wx-cur" }, wl = { class: "wx-emoji" }, bl = { class: "wx-temp" }, kl = { class: "wx-sub" }, _l = { class: "wx-rain" }, Cl = { class: "wx-hours" }, xl = { class: "hh" }, Ll = { class: "he" }, $l = { class: "ht" }, Tl = { class: "wx-days" }, Sl = ["open"], Il = { class: "weather-forecast-head" }, Ml = { class: "weather-forecast-city-info" }, Dl = { class: "weather-forecast-icon" }, Al = { id: "weather-forecast-city-title" }, El = { class: "small muted" }, Pl = { class: "weather-forecast-actions" }, Wl = ["title"], Nl = ["title"], Rl = {
  key: 0,
  class: "weather-metrics-grid"
}, Ol = { class: "weather-metric-item" }, Bl = { class: "metric-label" }, Fl = {
  class: "metric-val",
  id: "weather-forecast-humidity"
}, Hl = { class: "weather-metric-item" }, jl = { class: "metric-label" }, zl = {
  class: "metric-val",
  id: "weather-forecast-wind"
}, Gl = { class: "weather-metric-item" }, Kl = { class: "metric-label" }, Vl = {
  class: "metric-val",
  id: "weather-forecast-uv"
}, Ul = { class: "weather-metric-item" }, Yl = { class: "metric-label" }, ql = {
  class: "metric-val",
  id: "weather-forecast-aqi"
}, Xl = {
  class: "weather-forecast-list",
  id: "weather-forecast-days-list"
}, Jl = { class: "day-date-col" }, Zl = { class: "day-name" }, Ql = { class: "day-date small muted" }, ec = { class: "day-weather-col" }, tc = { class: "day-emoji" }, oc = { class: "day-cond" }, ic = { class: "day-rain-col" }, nc = {
  key: 0,
  class: "rain-tag"
}, sc = {
  key: 1,
  class: "rain-tag empty"
}, ac = { class: "day-temp-bar-col" }, rc = { class: "low-temp" }, lc = { class: "temp-track" }, cc = { class: "high-temp" }, dc = { class: "weather-location-head" }, uc = { class: "weather-location-title-row" }, pc = { class: "weather-location-title" }, hc = ["title"], fc = { class: "weather-input-wrapper" }, gc = ["placeholder", "onKeydown"], mc = ["title"], vc = {
  type: "submit",
  class: "weather-location-submit"
}, yc = { key: 0 }, wc = { class: "weather-section-subtitle" }, bc = {
  key: 0,
  class: "weather-location-suggestions"
}, kc = ["onClick"], _c = { class: "weather-suggestion-name" }, Cc = { class: "weather-suggestion-sub" }, xc = {
  key: 1,
  class: "weather-suggestion-empty"
}, Lc = { key: 1 }, $c = { class: "weather-section-subtitle" }, Tc = { class: "weather-quick-chips-grid" }, Sc = ["onClick"], Ic = /* @__PURE__ */ de({
  __name: "WeatherWidget",
  setup(e) {
    const t = H(!1), o = H({ x: 0, y: 0 }), n = H(""), a = H(null), d = H(null), b = ["深圳", "武汉", "北京", "上海", "广州", "成都", "杭州", "南京", "西安", "重庆", "苏州", "天津"], g = oe(() => {
      const v = n.value.trim();
      return v ? Kt.filterCities(v, 6) : [];
    });
    function l(v) {
      const O = v?.clientX ?? window.innerWidth / 2 - 140, J = v?.clientY ?? window.innerHeight / 2 - 320 / 2, M = Math.max(12, Math.min(window.innerWidth - 280 - 12, O)), k = Math.max(12, Math.min(window.innerHeight - 320 - 12, J));
      o.value = { x: M, y: k }, t.value = !0, n.value = "", vt(() => {
        d.value?.focus();
      });
    }
    function h() {
      t.value = !1, n.value = "";
    }
    async function C(v) {
      const x = v.trim();
      x && (h(), await Kt.changeCity(x));
    }
    function D() {
      const v = n.value.trim();
      v && C(v);
    }
    function m(v) {
      if (!t.value) return;
      const x = v.target;
      a.value && !a.value.contains(x) && h();
    }
    function S(v) {
      t.value && v.key === "Escape" && (v.preventDefault(), h());
    }
    Ke(() => {
      it.setRefreshAction(() => {
        Kt.loadWeather();
      }), it.setChangeLocationAction((v) => {
        l(v);
      }), Kt.loadWeather(), Be(lt, () => {
        Kt.reformatCurrentWeather();
      }), window.addEventListener("pointerdown", m, !0), window.addEventListener("keydown", S, !0);
    }), St(() => {
      window.removeEventListener("pointerdown", m, !0), window.removeEventListener("keydown", S, !0);
    });
    function f(v) {
      v.preventDefault(), l(v);
    }
    function y() {
      it.closeForecastModal();
    }
    function I(v) {
      v.target?.id === "weather-forecast-dialog" && y();
    }
    return (v, x) => (r(), p("div", {
      class: "weather-widget-container",
      onContextmenu: f
    }, [
      s(K).state === "unconfigured" ? (r(), p("p", fl, u(s(c)("weather.noCitySet")), 1)) : s(K).state === "loading" ? (r(), p("p", gl, u(s(c)("common.loading")), 1)) : s(K).state === "not_found" ? (r(), p("p", ml, u(s(c)("weather.cityNotFound", { city: s(K).city })), 1)) : s(K).state === "error" ? (r(), p("p", vl, u(s(K).errorMessage || s(c)("weather.loadFailed")), 1)) : s(K).state === "ready" && s(K).data ? (r(), p(Y, { key: 4 }, [
        i("div", yl, [
          i("span", wl, u(s(K).data.currentEmoji), 1),
          i("span", bl, u(s(K).data.currentTemp) + "°", 1)
        ]),
        i("p", kl, u(s(K).data.subText), 1),
        i("p", _l, u(s(K).data.rainText), 1),
        i("div", Cl, [
          (r(!0), p(Y, null, ge(s(K).data.hours, (L, W) => (r(), p("div", {
            key: W,
            class: "wx-h"
          }, [
            i("span", xl, u(L.time), 1),
            i("span", Ll, u(L.emoji), 1),
            i("span", $l, u(L.temp) + "°", 1)
          ]))), 128))
        ]),
        i("div", Tl, [
          (r(!0), p(Y, null, ge(s(K).data.days, (L, W) => (r(), p("span", { key: W }, u(L.label) + " " + u(L.emoji) + " " + u(L.tempRange), 1))), 128))
        ])
      ], 64)) : E("", !0),
      i("dialog", {
        id: "weather-forecast-dialog",
        class: "weather-forecast-dialog",
        open: s(K).forecastModalOpen,
        onClick: I
      }, [
        i("div", {
          class: "weather-forecast-shell",
          onClick: x[1] || (x[1] = F(() => {
          }, ["stop"]))
        }, [
          i("header", Il, [
            i("div", Ml, [
              i("span", Dl, u(s(K).data?.currentEmoji || "🌤️"), 1),
              i("div", null, [
                i("h3", Al, u(s(K).city || s(K).data?.cityName || s(c)("weather.forecastTitle")), 1),
                i("p", El, u(s(K).data?.subText || s(c)("weather.forecastSub")), 1)
              ])
            ]),
            i("div", Pl, [
              i("button", {
                id: "weather-forecast-refresh-btn",
                type: "button",
                class: "weather-forecast-btn",
                title: s(c)("weather.refreshTitle"),
                onClick: x[0] || (x[0] = (L) => s(it).refresh())
              }, u(s(c)("weather.refresh")), 9, Wl),
              i("button", {
                id: "weather-forecast-close-btn",
                type: "button",
                class: "weather-forecast-close",
                title: s(c)("common.close"),
                onClick: y
              }, " ✕ ", 8, Nl)
            ])
          ]),
          s(K).detailInfo ? (r(), p("div", Rl, [
            i("div", Ol, [
              i("span", Bl, u(s(c)("weather.metric.humidity")), 1),
              i("span", Fl, u(s(K).detailInfo.humidity || "50%"), 1)
            ]),
            i("div", Hl, [
              i("span", jl, u(s(c)("weather.metric.wind")), 1),
              i("span", zl, u(s(K).detailInfo.wind || (s(lt) === "en" ? "Breeze" : "微风")), 1)
            ]),
            i("div", Gl, [
              i("span", Kl, u(s(c)("weather.metric.uv")), 1),
              i("span", Vl, u(s(K).detailInfo.uvIndex || (s(lt) === "en" ? "Moderate" : "中等")), 1)
            ]),
            i("div", Ul, [
              i("span", Yl, u(s(c)("weather.metric.aqi")), 1),
              i("span", ql, u(s(K).detailInfo.airQuality || (s(lt) === "en" ? "Good" : "良")), 1)
            ])
          ])) : E("", !0),
          i("div", Xl, [
            (r(!0), p(Y, null, ge(s(K).forecastDays, (L, W) => (r(), p("div", {
              key: W,
              class: "weather-forecast-day-row forecast-day-item"
            }, [
              i("div", Jl, [
                i("span", Zl, u(L.dayName), 1),
                i("span", Ql, u(L.date), 1)
              ]),
              i("div", ec, [
                i("span", tc, u(L.emoji), 1),
                i("span", oc, u(L.condition), 1)
              ]),
              i("div", ic, [
                L.rainProb > 0 ? (r(), p("span", nc, "☂️ " + u(L.rainProb) + "%", 1)) : (r(), p("span", sc, u(s(c)("weather.metric.noRain")), 1))
              ]),
              i("div", ac, [
                i("span", rc, u(L.lowTemp) + "°", 1),
                i("div", lc, [
                  i("div", {
                    class: "temp-range-fill",
                    style: ke({
                      left: `${Math.max(0, Math.min(100, (L.lowTemp + 10) * 2))}%`,
                      width: `${Math.max(20, Math.min(80, (L.highTemp - L.lowTemp) * 6))}%`
                    })
                  }, null, 4)
                ]),
                i("span", cc, u(L.highTemp) + "°", 1)
              ])
            ]))), 128))
          ])
        ])
      ], 8, Sl),
      (r(), ce(yt, { to: "body" }, [
        t.value ? (r(), p("div", {
          key: 0,
          ref_key: "contextMenuRef",
          ref: a,
          class: "weather-location-context-menu",
          style: ke({ left: `${o.value.x}px`, top: `${o.value.y}px` }),
          onClick: x[4] || (x[4] = F(() => {
          }, ["stop"])),
          onContextmenu: x[5] || (x[5] = F(() => {
          }, ["prevent"]))
        }, [
          i("div", dc, [
            i("div", uc, [
              i("span", pc, u(s(c)("weather.menu.changeLocation")), 1),
              i("span", {
                class: "weather-location-curr-badge",
                title: s(K).city
              }, [
                x[6] || (x[6] = i("span", { class: "weather-curr-dot" }, null, -1)),
                Ye(" " + u(s(K).city || s(c)("weather.menu.unset")), 1)
              ], 8, hc)
            ])
          ]),
          i("form", {
            class: "weather-location-form",
            onSubmit: F(D, ["prevent"])
          }, [
            i("div", fc, [
              x[7] || (x[7] = i("span", { class: "weather-input-icon" }, "🔍", -1)),
              Ue(i("input", {
                ref_key: "inputRef",
                ref: d,
                class: "weather-location-input",
                placeholder: s(c)("weather.menu.inputPlaceholder"),
                "onUpdate:modelValue": x[2] || (x[2] = (L) => n.value = L),
                onKeydown: Ot(F(D, ["prevent"]), ["enter"]),
                autocomplete: "off"
              }, null, 40, gc), [
                [oo, n.value]
              ]),
              n.value ? (r(), p("button", {
                key: 0,
                type: "button",
                class: "weather-input-clear",
                onClick: x[3] || (x[3] = (L) => n.value = ""),
                title: s(c)("weather.menu.clearInput")
              }, "✕", 8, mc)) : E("", !0)
            ]),
            i("button", vc, u(s(c)("weather.menu.submit")), 1)
          ], 32),
          n.value.trim() ? (r(), p("div", yc, [
            i("div", wc, u(s(c)("weather.menu.suggestions")), 1),
            g.value.length ? (r(), p("div", bc, [
              (r(!0), p(Y, null, ge(g.value, (L) => (r(), p("button", {
                key: L.name + L.admin,
                type: "button",
                class: "weather-suggestion-item",
                onClick: (W) => C(L.name)
              }, [
                i("span", _c, u(L.name), 1),
                i("span", Cc, u(L.admin), 1)
              ], 8, kc))), 128))
            ])) : (r(), p("div", xc, u(s(c)("weather.menu.emptySuggestion")), 1))
          ])) : (r(), p("div", Lc, [
            i("div", $c, u(s(c)("weather.menu.commonCities")), 1),
            i("div", Tc, [
              (r(), p(Y, null, ge(b, (L) => i("button", {
                key: L,
                type: "button",
                class: le(["weather-quick-chip", { active: s(K).city === L }]),
                onClick: (W) => C(L)
              }, u(L), 11, Sc)), 64))
            ])
          ]))
        ], 36)) : E("", !0)
      ]))
    ], 32));
  }
}), Qn = /* @__PURE__ */ Me(Ic, [["__scopeId", "data-v-5aae12b5"]]), Ni = "heroCustomMottoV1";
function Mc() {
  try {
    if (typeof localStorage < "u") {
      const e = localStorage.getItem(Ni);
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
const jt = Mc(), V = be({
  loaded: !1,
  customText: jt.customText,
  history: jt.history,
  currentIndex: jt.customText && jt.history.length ? jt.history.findIndex((e) => e.text === jt.customText) : -1,
  menuOpen: !1,
  menuPos: { x: 0, y: 0 }
});
function Dc(e) {
  return new Promise((t) => {
    typeof chrome < "u" && chrome?.storage?.local?.get ? chrome.storage.local.get([e], (o) => t(o?.[e])) : t(null);
  });
}
function Ac(e, t) {
  try {
    typeof localStorage < "u" && localStorage.setItem(e, JSON.stringify(t));
  } catch {
  }
  return new Promise((o) => {
    typeof chrome < "u" && chrome?.storage?.local?.set ? chrome.storage.local.set({ [e]: t }, () => o()) : o();
  });
}
function Ec(e) {
  const t = (a) => String(a).padStart(2, "0"), o = `${e.getFullYear()}-${t(e.getMonth() + 1)}-${t(e.getDate())}`, n = `${t(e.getHours())}:${t(e.getMinutes())}`;
  return { date: o, time: n };
}
const ot = {
  async init() {
    try {
      const e = await Dc(Ni);
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
    await Ac(Ni, e);
  },
  setCustomMotto(e) {
    const t = e.trim();
    if (!t) {
      this.resetToSystem();
      return;
    }
    const { date: o, time: n } = Ec(/* @__PURE__ */ new Date());
    V.customText = t;
    const a = V.history.findIndex((d) => d.text === t);
    if (a !== -1) {
      const d = V.history.splice(a, 1)[0];
      d.date = o, d.time = n, V.history.unshift(d);
    } else
      V.history.unshift({
        id: `motto_${Date.now()}`,
        date: o,
        time: n,
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
}, Pc = ["title"], Wc = ["placeholder"], Nc = { class: "motto-content" }, Rc = ["title"], Oc = { class: "motto-menu-header" }, Bc = { class: "dim" }, Fc = { class: "motto-history-label" }, Hc = { class: "motto-history-list" }, jc = {
  key: 0,
  class: "motto-history-empty dim"
}, zc = ["onClick"], Gc = { class: "motto-item-date" }, Kc = ["title"], Vc = ["title", "onClick"], Uc = /* @__PURE__ */ de({
  __name: "HeroMotto",
  setup(e) {
    const t = H(!1), o = H(""), n = H(null), a = {
      夜深了: "clock.greeting.lateNight",
      早上好: "clock.greeting.morning",
      上午好: "clock.greeting.forenoon",
      中午好: "clock.greeting.noon",
      下午好: "clock.greeting.afternoon",
      晚上好: "clock.greeting.evening",
      你好: "clock.greeting.hello"
    };
    function d(f) {
      const y = a[f];
      return y ? c(y) : f;
    }
    const b = oe(() => V.customText ? d(V.customText) : we.greetingText);
    function g() {
      ot.closeMenu(), o.value = V.customText || we.greetingText, t.value = !0, vt(() => {
        n.value?.focus(), n.value?.select();
      });
    }
    function l() {
      if (!t.value) return;
      t.value = !1;
      const f = o.value.trim();
      ot.setCustomMotto(f), f && ye.fetch(c("motto.appName"), c("motto.updated", { text: f }));
    }
    function h() {
      t.value = !1;
    }
    function C(f) {
      f.key === "Enter" ? (f.preventDefault(), l()) : f.key === "Escape" && (f.preventDefault(), h());
    }
    function D(f) {
      t.value || (f.preventDefault(), f.stopPropagation(), ot.stepHistory(f.deltaY > 0 ? 1 : -1));
    }
    function m(f) {
      f.preventDefault(), f.stopPropagation(), ot.openMenu(f.clientX, f.clientY);
    }
    function S(f) {
      V.menuOpen && (f.target.closest(".motto-context-menu") || ot.closeMenu());
    }
    return Ke(() => {
      ot.init(), window.addEventListener("click", S);
    }), St(() => {
      window.removeEventListener("click", S);
    }), (f, y) => (r(), p(Y, null, [
      i("div", {
        class: "hero-motto-wrapper",
        title: s(c)("motto.hint"),
        onWheel: D,
        onContextmenu: m
      }, [
        t.value ? Ue((r(), p("input", {
          key: 0,
          ref_key: "mottoInputRef",
          ref: n,
          "onUpdate:modelValue": y[0] || (y[0] = (I) => o.value = I),
          class: "hero-motto-input",
          type: "text",
          placeholder: s(c)("motto.placeholder"),
          maxlength: "60",
          onBlur: l,
          onKeydown: C
        }, null, 40, Wc)), [
          [oo, o.value]
        ]) : (r(), p("p", {
          key: 1,
          id: "greeting",
          class: "hero-motto-text",
          style: ke({ color: s(we).greetColor }),
          onClick: g
        }, [
          i("span", Nc, u(b.value), 1),
          s(V).history.length > 1 ? (r(), p("span", {
            key: 0,
            class: "motto-scroll-hint",
            title: s(c)("motto.scrollHint")
          }, "⇕", 8, Rc)) : E("", !0)
        ], 4))
      ], 40, Pc),
      (r(), ce(yt, { to: "body" }, [
        s(V).menuOpen ? (r(), p("div", {
          key: 0,
          class: "motto-context-menu",
          style: ke({ left: `${s(V).menuPos.x}px`, top: `${s(V).menuPos.y}px` }),
          onClick: y[3] || (y[3] = F(() => {
          }, ["stop"])),
          onContextmenu: y[4] || (y[4] = F(() => {
          }, ["prevent"]))
        }, [
          i("div", Oc, [
            i("span", null, u(s(c)("motto.customTitle")), 1),
            i("small", Bc, u(s(c)("motto.recordsCount", { count: s(V).history.length })), 1)
          ]),
          i("button", {
            type: "button",
            class: "motto-menu-action",
            onClick: g
          }, [
            y[5] || (y[5] = i("i", null, "✎", -1)),
            i("span", null, u(s(c)("motto.editCurrent")), 1)
          ]),
          y[8] || (y[8] = i("div", { class: "motto-menu-divider" }, null, -1)),
          i("div", Fc, u(s(c)("motto.historyLabel")), 1),
          i("div", Hc, [
            s(V).history.length ? (r(!0), p(Y, { key: 1 }, ge(s(V).history, (I) => (r(), p("div", {
              key: I.id,
              class: le(["motto-history-item", { active: s(V).customText === I.text }]),
              onClick: (v) => s(ot).selectHistory(I)
            }, [
              i("span", Gc, u(I.date), 1),
              i("span", {
                class: "motto-item-text",
                title: d(I.text)
              }, u(d(I.text)), 9, Kc),
              i("button", {
                type: "button",
                class: "motto-item-del",
                title: s(c)("motto.deleteEntry"),
                onClick: F((v) => s(ot).deleteEntry(I.id), ["stop"])
              }, "×", 8, Vc)
            ], 10, zc))), 128)) : (r(), p("div", jc, u(s(c)("motto.historyEmpty")), 1))
          ]),
          y[9] || (y[9] = i("div", { class: "motto-menu-divider" }, null, -1)),
          i("button", {
            type: "button",
            class: "motto-menu-action reset-btn",
            onClick: y[1] || (y[1] = //@ts-ignore
            (...I) => s(ot).resetToSystem && s(ot).resetToSystem(...I))
          }, [
            y[6] || (y[6] = i("i", null, "↻", -1)),
            i("span", null, u(s(c)("motto.resetGreeting")), 1)
          ]),
          s(V).history.length ? (r(), p("button", {
            key: 0,
            type: "button",
            class: "motto-menu-action danger-btn",
            onClick: y[2] || (y[2] = //@ts-ignore
            (...I) => s(ot).clearHistory && s(ot).clearHistory(...I))
          }, [
            y[7] || (y[7] = i("i", null, "🗑", -1)),
            i("span", null, u(s(c)("motto.clearAll")), 1)
          ])) : E("", !0)
        ], 36)) : E("", !0)
      ]))
    ], 64));
  }
}), Yc = /* @__PURE__ */ Me(Uc, [["__scopeId", "data-v-a65048d3"]]), qc = /* @__PURE__ */ de({
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
      return l < 5 ? c("clock.greeting.lateNight") : l < 9 ? c("clock.greeting.morning") : l < 12 ? c("clock.greeting.forenoon") : l < 14 ? c("clock.greeting.noon") : l < 18 ? c("clock.greeting.afternoon") : l < 23 ? c("clock.greeting.evening") : c("clock.greeting.lateNight");
    }
    function n() {
      const l = Nt.state.timezone;
      if (!l || l === "local") return /* @__PURE__ */ new Date();
      try {
        const h = (/* @__PURE__ */ new Date()).toLocaleString("en-US", { timeZone: l });
        return new Date(h);
      } catch {
        return /* @__PURE__ */ new Date();
      }
    }
    function a() {
      const l = (J) => String(J).padStart(2, "0"), h = n(), C = h.getHours(), D = h.getMinutes(), m = h.getSeconds(), S = h.getFullYear(), f = h.getMonth() + 1, y = h.getDate(), I = h.getDay(), v = `${l(C)}:${l(D)}`, x = `:${l(m)}`, L = o(C), W = c(t[I]), O = c("clock.datePattern", {
        year: S,
        month: f,
        day: y,
        week: W
      });
      Xt.updateTime(v, x, L, O);
    }
    function d(l) {
      l.preventDefault(), Nt.open({ clientX: l.clientX, clientY: l.clientY });
    }
    function b() {
      document.hidden ? g && (clearInterval(g), g = null) : (a(), g || (g = setInterval(a, 1e3)));
    }
    let g = null;
    return Nt.initPreferences(), a(), Ke(() => {
      Nt.initPreferences(), Be(lt, () => {
        a();
      }), xt.activeId || (a(), g = setInterval(a, 1e3)), document.addEventListener("visibilitychange", b);
    }), Be(
      () => xt.activeId,
      (l) => {
        l ? g && (clearInterval(g), g = null) : document.hidden || (a(), g || (g = setInterval(a, 1e3)));
      }
    ), St(() => {
      g && (clearInterval(g), g = null), document.removeEventListener("visibilitychange", b);
    }), (l, h) => (r(), p("div", {
      class: "hero-clock-vue-container",
      onContextmenu: d
    }, [
      i("p", {
        id: "clock",
        class: "clock",
        style: ke({ fontFamily: s(we).fontFamily, color: s(we).colorHex })
      }, [
        Ye(u(s(we).timeText), 1),
        i("span", {
          id: "secs",
          style: ke({ color: s(we).colorHex })
        }, u(s(we).secsText), 5)
      ], 4),
      i("p", {
        id: "date",
        class: "date",
        style: ke({ color: s(we).dateColor })
      }, u(s(we).dateText), 5)
    ], 32));
  }
}), es = /* @__PURE__ */ Me(qc, [["__scopeId", "data-v-f946341c"]]), Xc = {
  key: 0,
  class: "home-music-degraded-box"
}, Jc = { class: "degraded-badge-row" }, Zc = { class: "degraded-status" }, Qc = {
  key: 0,
  class: "degraded-host-tag"
}, ed = {
  key: 1,
  class: "degraded-host-tag"
}, td = { class: "degraded-title-row" }, od = ["title"], id = { class: "degraded-track-artist" }, nd = { class: "degraded-progress-bar-wrap" }, sd = { class: "degraded-actions" }, ad = { class: "degraded-time" }, rd = { class: "home-vinyl-box" }, ld = ["title"], cd = ["src", "alt"], dd = { class: "home-music-right" }, ud = ["title"], pd = {
  id: "home-music-artist",
  class: "home-music-meta-artist"
}, hd = { class: "home-music-seek-row" }, fd = {
  id: "home-music-cur",
  class: "home-music-time"
}, gd = ["value"], md = {
  id: "home-music-dur",
  class: "home-music-time"
}, vd = { class: "home-music-actions" }, yd = ["title"], wd = ["title"], bd = ["title"], kd = ["title"], _d = ["title"], Cd = /* @__PURE__ */ de({
  __name: "HomeMusicCard",
  setup(e) {
    Ke(() => {
      setTimeout(() => {
        Os();
      }, 200);
    });
    const t = oe(() => In.visible || rt.djModalOpen || rt.isActive && rt.isJoined), o = oe(() => rt.isActive && rt.isJoined), n = oe(() => !Z.title || Z.title === "点击播放" ? c("home.music.defaultTitle") : Z.title), a = oe(() => !Z.artist || Z.artist === "作者" ? c("home.music.defaultArtist") : Z.artist), d = oe(() => Z.mode === "shuffle" ? "🔀" : Z.mode === "one" ? "🔂" : "🔁");
    function b(l) {
      const h = l.target, C = Number(h.value);
      Ve.seek(C);
    }
    function g() {
      Ve.update({ coverUrl: "" });
    }
    return (l, h) => (r(), p("div", {
      id: "home-music-player-view",
      class: le(["home-music-player-view", { "is-degraded": t.value }])
    }, [
      t.value ? (r(), p("div", Xc, [
        i("div", Jc, [
          h[7] || (h[7] = i("span", { class: "degraded-icon" }, "🎧", -1)),
          i("strong", Zc, u(o.value ? s(c)("home.music.togetherListening") : s(c)("home.music.backgroundListening")), 1),
          o.value ? (r(), p("span", Qc, " DJ: " + u(s(rt).hostName), 1)) : (r(), p("span", ed, u(s(c)("home.music.workspaceReady")), 1))
        ]),
        i("div", td, [
          i("h3", {
            class: "degraded-track-title",
            title: n.value
          }, u(n.value || s(c)("home.music.standby")), 9, od),
          i("p", id, u(a.value), 1)
        ]),
        i("div", nd, [
          i("div", {
            class: "degraded-progress-bar-fill",
            style: ke({ width: s(Z).progressPercent + "%" })
          }, null, 4)
        ]),
        i("div", sd, [
          i("button", {
            type: "button",
            class: "degraded-btn",
            onClick: h[0] || (h[0] = (C) => s(Ve).togglePlay())
          }, u(s(Z).playing ? s(c)("home.music.pause") : s(c)("home.music.play")), 1),
          i("span", ad, u(s(Z).formattedCurrent) + " / " + u(s(Z).formattedDuration), 1)
        ])
      ])) : (r(), p(Y, { key: 1 }, [
        i("div", rd, [
          i("div", {
            id: "home-vinyl-needle",
            class: le(["home-vinyl-needle", { playing: s(Z).playing }])
          }, [...h[8] || (h[8] = [
            vo('<svg viewBox="0 0 32 52" fill="none" data-v-b7cbb119><circle cx="26" cy="4" r="3.5" fill="#e2e8f0" stroke="#475569" stroke-width="1.5" data-v-b7cbb119></circle><circle cx="26" cy="4" r="1.5" fill="#64748b" data-v-b7cbb119></circle><path d="M26 4 L14 26 L11 44" stroke="#cbd5e1" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" data-v-b7cbb119></path><rect x="7" y="42" width="8" height="9" rx="1.5" fill="#f43f5e" transform="rotate(-15 11 46)" data-v-b7cbb119></rect></svg>', 1)
          ])], 2),
          i("div", {
            id: "home-vinyl-disc",
            class: le(["home-vinyl-disc", { playing: s(Z).playing }]),
            title: s(c)("home.music.togglePlay"),
            onClick: h[1] || (h[1] = (C) => s(Ve).togglePlay())
          }, [
            s(Z).coverUrl ? (r(), p("img", {
              key: 0,
              id: "home-vinyl-cover",
              class: "home-vinyl-cover",
              referrerpolicy: "no-referrer",
              src: s(Z).coverUrl,
              alt: s(c)("home.music.coverAlt"),
              onError: g
            }, null, 40, cd)) : E("", !0),
            h[9] || (h[9] = i("div", { class: "home-vinyl-hole" }, null, -1))
          ], 10, ld)
        ]),
        i("div", dd, [
          i("h3", {
            id: "home-music-title",
            class: "home-music-meta-title",
            title: n.value
          }, u(n.value), 9, ud),
          i("p", pd, u(a.value), 1),
          i("div", hd, [
            i("span", fd, u(s(Z).formattedCurrent), 1),
            i("input", {
              id: "home-music-seek",
              class: "home-music-seek-bar",
              type: "range",
              min: "0",
              max: "100",
              value: s(Z).progressPercent,
              onInput: b
            }, null, 40, gd),
            i("span", md, u(s(Z).formattedDuration), 1)
          ]),
          i("div", vd, [
            i("button", {
              id: "home-music-prev",
              class: "home-music-btn",
              type: "button",
              title: s(c)("home.music.prevTrack"),
              onClick: h[2] || (h[2] = (C) => s(Ve).prev())
            }, " ⏮ ", 8, yd),
            i("button", {
              id: "home-music-play",
              class: "home-music-btn play-btn",
              type: "button",
              title: s(c)("home.music.togglePlay"),
              onClick: h[3] || (h[3] = (C) => s(Ve).togglePlay())
            }, u(s(Z).playing ? "⏸" : "▶"), 9, wd),
            i("button", {
              id: "home-music-next",
              class: "home-music-btn",
              type: "button",
              title: s(c)("home.music.nextTrack"),
              onClick: h[4] || (h[4] = (C) => s(Ve).next())
            }, " ⏭ ", 8, bd),
            i("button", {
              id: "home-music-like",
              class: le(["home-music-btn like-btn", { liked: s(Z).liked }]),
              type: "button",
              title: s(c)("home.music.favorite"),
              onClick: h[5] || (h[5] = (C) => s(Ve).toggleLike())
            }, u(s(Z).liked ? "♥" : "♡"), 11, kd),
            i("button", {
              id: "home-music-mode",
              class: "home-music-btn",
              type: "button",
              title: s(c)("home.music.playMode"),
              onClick: h[6] || (h[6] = (C) => s(Ve).cycleMode())
            }, u(d.value), 9, _d)
          ])
        ])
      ], 64))
    ], 2));
  }
}), ts = /* @__PURE__ */ Me(Cd, [["__scopeId", "data-v-b7cbb119"]]), gt = /* @__PURE__ */ new Map(), mt = /* @__PURE__ */ new Set();
function xd(e, t) {
  for (gt.delete(e), gt.set(e, t), mt.delete(t), mt.add(t); gt.size > 512; )
    gt.delete(gt.keys().next().value);
  for (; mt.size > 512; )
    mt.delete(mt.values().next().value);
}
const Ld = {
  key: 0,
  class: "launcher-fallback"
}, $d = ["src"], bi = "lw_resolved_icon:", Td = /* @__PURE__ */ de({
  __name: "LauncherFavicon",
  props: {
    link: {},
    mini: { type: Boolean, default: !1 }
  },
  setup(e) {
    function t(v) {
      try {
        return localStorage.getItem(bi + v) || "";
      } catch {
        return "";
      }
    }
    function o(v, x) {
      try {
        localStorage.setItem(bi + v, x);
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
    const a = e;
    function d(v) {
      try {
        return new URL(v).hostname.replace(/^www\./, "");
      } catch {
        return v || "";
      }
    }
    function b(v) {
      try {
        return new URL(v).origin;
      } catch {
        return "";
      }
    }
    function g(v) {
      try {
        const x = window, L = typeof x.chrome < "u" ? x.chrome : globalThis.chrome;
        if (typeof L?.runtime?.getURL == "function")
          return L.runtime.getURL("_favicon/?pageUrl=" + encodeURIComponent(v) + "&size=64");
      } catch {
      }
      return "";
    }
    const l = oe(() => {
      const v = a.link, x = (v.title || d(v.url)).trim();
      return x ? x.slice(0, 1).toUpperCase() : "🔗";
    }), h = H([]), C = H(0), D = H(!1), m = H(!1), S = oe(() => m.value || C.value >= h.value.length ? "" : h.value[C.value] || "");
    function f() {
      const v = a.link;
      if (!v?.url) {
        h.value = [], m.value = !0, D.value = !1;
        return;
      }
      const x = [], L = n(v.url);
      L && x.push(L);
      const W = gt.get(v.url) || t(v.url);
      W && !x.includes(W) && x.push(W);
      const O = (P) => P ? /google\.com\/s2\/favicons|icons\.duckduckgo\.com|unavatar\.io|icon\.horse/i.test(P) : !1;
      v.customIcon && !O(v.customIcon) && x.push(v.customIcon), v.icon && !O(v.icon) && x.push(v.icon);
      const J = g(v.url);
      J && !x.includes(J) && x.push(J);
      const M = Te.getCachedIcon(v.url);
      M && !x.includes(M) && x.push(M);
      const k = b(v.url);
      k && !k.startsWith("http://1.") && !k.startsWith("http://192.") && !k.startsWith("http://127.") && x.push(`${k}/favicon.ico`), v.customIcon && !O(v.customIcon) && x.unshift(v.customIcon);
      const $ = [...new Set(x.filter(Boolean))];
      h.value = $, C.value = 0, m.value = $.length === 0;
      const X = $[0];
      X && (X.startsWith("data:") || mt.has(X)) && (D.value = !0);
    }
    Be(
      () => [a.link?.url, a.link?.icon, a.link?.customIcon],
      (v, x) => {
        x && v[0] === x[0] && v[1] === x[1] && v[2] === x[2] || f();
      },
      { immediate: !0 }
    ), Ke(() => {
      h.value.length === 0 && f();
    });
    function y(v) {
      D.value = !0, m.value = !1;
      const x = S.value;
      if (x) {
        const L = mt.has(x), W = gt.get(a.link.url);
        xd(a.link.url, x), W !== x && t(a.link.url) !== x && o(a.link.url, x);
        const O = v.target;
        if (!L && !x.startsWith("data:")) {
          const J = a.link.url;
          setTimeout(() => {
            Te.cacheIcon(J, x, O?.getAttribute("src") === x ? O : null);
          }, 0);
        }
      }
    }
    function I() {
      const v = S.value;
      if (v) {
        mt.delete(v), gt.get(a.link.url) === v && gt.delete(a.link.url);
        try {
          localStorage.removeItem(bi + a.link.url), localStorage.removeItem("lw_sync_dataurl:" + a.link.url);
        } catch {
        }
      }
      if (v && Te.getCachedIcon(a.link.url) === v && Te.evictCachedIcon(a.link.url), C.value + 1 < h.value.length) {
        C.value += 1;
        const x = h.value[C.value];
        x && (x.startsWith("data:") || mt.has(x)) && (D.value = !0);
      } else
        m.value = !0, D.value = !1;
    }
    return (v, x) => (r(), p("span", {
      class: le(e.mini ? "launcher-folder-mini" : "launcher-favicon")
    }, [
      m.value || !S.value ? (r(), p("span", Ld, u(l.value), 1)) : (r(), p("img", {
        key: 1,
        src: S.value,
        alt: "",
        draggable: "false",
        referrerpolicy: "no-referrer",
        decoding: "async",
        style: { "pointer-events": "none", "user-select": "none" },
        onLoad: y,
        onError: I
      }, null, 40, $d))
    ], 2));
  }
}), Jo = /* @__PURE__ */ Me(Td, [["__scopeId", "data-v-bc41d0d8"]]), Sd = { class: "launcher-label launcher-title" }, Id = ["title"], Md = {
  key: 0,
  class: "launcher-folder-more"
}, Dd = {
  key: 1,
  class: "empty-folder",
  "aria-hidden": "true"
}, Ad = { class: "launcher-folder-label launcher-title" }, Ed = /* @__PURE__ */ de({
  __name: "LauncherTileContent",
  props: {
    link: {},
    folder: {},
    size: { default: "small" }
  },
  setup(e) {
    const t = e, o = oe(() => t.size === "large" ? 9 : 4), n = oe(() => t.folder?.preview.slice(0, t.folder.count > o.value ? o.value - 1 : o.value) || []);
    return (a, d) => e.link ? (r(), p(Y, { key: 0 }, [
      q(Jo, { link: e.link }, null, 8, ["link"]),
      i("span", Sd, u(e.link.title), 1)
    ], 64)) : e.folder ? (r(), p(Y, { key: 1 }, [
      i("div", {
        class: "launcher-folder-preview",
        title: `打开${e.folder.title}`
      }, [
        (r(!0), p(Y, null, ge(n.value, (b) => (r(), ce(Jo, {
          key: b.id,
          link: b,
          mini: !0
        }, null, 8, ["link"]))), 128)),
        e.folder.count > o.value ? (r(), p("span", Md, "+" + u(e.folder.count - (o.value - 1)), 1)) : E("", !0),
        n.value.length ? E("", !0) : (r(), p("span", Dd, "📁")),
        $n(a.$slots, "default", {}, void 0, !0)
      ], 8, Id),
      i("span", Ad, u(e.folder.title), 1)
    ], 64)) : E("", !0);
  }
}), yn = /* @__PURE__ */ Me(Ed, [["__scopeId", "data-v-7f513029"]]), Pd = 5, Wd = 180;
function Nd(e, t, o) {
  const n = t - e.left, a = o - e.top;
  return n > e.width * 0.25 && n < e.width * 0.75 && a > e.height * 0.25 && a < e.height * 0.75;
}
function Rd(e, t, o) {
  return Math.hypot(t - (e.left + e.width / 2), o - (e.top + e.height / 2)) <= Math.max(e.width, e.height) * 0.55;
}
const Od = {
  class: "launcher-group launcher-aihot launcher-todoist size-large",
  id: "launcher-todoist"
}, Bd = { class: "card-head aihot-home-head" }, Fd = { class: "title" }, Hd = ["title"], jd = ["title"], zd = {
  class: "aihot-home-body",
  id: "aihot-home-body"
}, Gd = {
  key: 0,
  class: "muted small"
}, Kd = {
  key: 1,
  class: "notice small"
}, Vd = {
  key: 2,
  class: "muted small aihot-home-empty"
}, Ud = {
  key: 3,
  class: "aihot-home-rich-list"
}, Yd = ["href", "title", "onClick"], qd = { class: "aihot-home-rich-main" }, Xd = { class: "aihot-home-rich-title" }, Jd = {
  key: 0,
  class: "aihot-home-rich-summary"
}, Zd = { class: "aihot-home-rich-meta" }, Qd = { class: "aihot-home-rich-meta-left" }, eu = {
  key: 0,
  class: "aihot-home-rich-tag"
}, tu = { class: "aihot-home-rich-source" }, ou = { class: "aihot-home-rich-time" }, wn = 6, iu = /* @__PURE__ */ de({
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
    }, o = H([]), n = H(0), a = H(!0), d = H("");
    function b(v) {
      return lt.value === "en" && v.originalTitle ? v.originalTitle : v.title;
    }
    function g(v) {
      const x = v.source?.name || v.sourceName || "AI HOT";
      return lt.value === "en" && x.includes("：") ? x.split("：")[0].trim() : x;
    }
    function l(v) {
      if (!v.category) return "";
      const x = t[v.category];
      if (x)
        try {
          return c(x);
        } catch {
        }
      return v.category;
    }
    const h = oe(() => lt.value !== "en" ? o.value : [...o.value].sort((v, x) => {
      const L = !!(v.originalTitle && /[a-zA-Z]{3,}/.test(v.originalTitle)), W = !!(x.originalTitle && /[a-zA-Z]{3,}/.test(x.originalTitle));
      return L && !W ? -1 : !L && W ? 1 : 0;
    }));
    function C(v) {
      const x = v.publishedAt || v.published || "";
      if (!x) return lt.value === "en" ? "Latest" : "最新";
      const L = Number(x), W = Number.isFinite(L) && L > 0 ? new Date(L > 1e12 ? L : L * 1e3) : new Date(x);
      if (isNaN(W.getTime())) return String(x).slice(0, 16) || (lt.value === "en" ? "Latest" : "最新");
      const O = (P) => String(P).padStart(2, "0"), J = W.getFullYear(), M = O(W.getMonth() + 1), k = O(W.getDate()), $ = O(W.getHours()), X = O(W.getMinutes());
      return `${J}-${M}-${k} ${$}:${X}`;
    }
    const D = [
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
      const x = (typeof window < "u" ? window : null)?.LogicWeaverAihotFeed?.getState?.()?.feedArticles;
      if (Array.isArray(x) && x.length)
        return x;
      const L = [
        "newtab_aihot_items_v2",
        "lw-aihot-cached-feed-all-24h-v1",
        "lw-aihot-cached-feed-v1"
      ];
      for (const W of L)
        try {
          const O = localStorage.getItem(W);
          if (O) {
            const J = JSON.parse(O);
            if (Array.isArray(J) && J.length) return J;
            if (J && Array.isArray(J.items) && J.items.length) return J.items;
          }
        } catch {
        }
      return [];
    }
    async function S(v = !1) {
      if (!v && o.value.length > 0) return;
      const x = m();
      x.length ? (o.value = x, a.value = !1) : o.value.length || (o.value = [...D], a.value = !1);
      try {
        const W = await (await fetch("https://aihot.virxact.com/api/v1/items?mode=selected&window=24h&limit=24", {
          headers: { Accept: "application/json" },
          signal: AbortSignal.timeout(5e3)
        })).json(), O = Array.isArray(W) ? W : W.items || W.data || W.results || [];
        if (O.length) {
          o.value = O, n.value = 0, d.value = "";
          try {
            localStorage.setItem("newtab_aihot_items_v2", JSON.stringify(O.slice(0, 30)));
          } catch {
          }
        }
      } catch {
        o.value.length || (o.value = [...D]);
      } finally {
        a.value = !1;
      }
    }
    function f() {
      if (!h.value.length) {
        a.value = !0, S(!0);
        return;
      }
      n.value += wn, n.value >= h.value.length && (n.value = 0);
    }
    function y() {
      const v = window;
      if (typeof v.enterFullscreenCard == "function") {
        v.enterFullscreenCard("daily-aihot");
        return;
      }
      const x = document.querySelector("#daily-aihot, [data-dock-id='daily-aihot']");
      x ? x.scrollIntoView({ behavior: "smooth", block: "start" }) : window.open("https://aihot.virxact.com", "_blank", "noreferrer");
    }
    function I(v, x) {
      if (x.ctrlKey || x.metaKey || x.shiftKey || x.button === 1) return;
      x.preventDefault();
      const L = v.links?.original || v.links?.aihot || v.url || "#";
      zi.openArticle(
        {
          id: v.id,
          title: b(v),
          summary: v.summary,
          sourceName: g(v),
          published: C(v),
          url: L
        },
        ""
      );
    }
    return Ke(() => {
      S();
    }), (v, x) => (r(), p("section", Od, [
      i("header", Bd, [
        x[0] || (x[0] = i("span", { class: "bar cyan" }, null, -1)),
        i("strong", Fd, u(s(c)("aihot.card.title")), 1),
        x[1] || (x[1] = i("span", { class: "grow" }, null, -1)),
        i("button", {
          class: "aihot-home-btn",
          type: "button",
          title: s(c)("aihot.card.refreshBtnTip"),
          onClick: f
        }, u(s(c)("aihot.card.refreshBtn")), 9, Hd),
        i("button", {
          class: "aihot-home-btn aihot-home-more-btn",
          type: "button",
          title: s(c)("aihot.card.hotlistBtnTip"),
          onClick: y
        }, u(s(c)("aihot.card.hotlistBtn")), 9, jd)
      ]),
      i("div", zd, [
        a.value && !h.value.length ? (r(), p("p", Gd, u(s(c)("aihot.card.loading")), 1)) : d.value && !h.value.length ? (r(), p("p", Kd, u(d.value), 1)) : h.value.length ? (r(), p("div", Ud, [
          (r(!0), p(Y, null, ge(h.value.slice(n.value, n.value + wn), (L, W) => (r(), p("a", {
            key: L.id || L.title,
            class: "aihot-home-rich-card",
            href: L.links?.original || L.links?.aihot || L.url || "#",
            target: "_blank",
            rel: "noreferrer",
            title: `${b(L)}
${L.summary || ""}
${s(c)("aihot.card.viewInReader")}`,
            onClick: (O) => I(L, O)
          }, [
            i("span", {
              class: le(["aihot-home-rich-rank", { top: n.value + W < 3 }])
            }, u(n.value + W + 1), 3),
            i("div", qd, [
              i("h3", Xd, u(b(L)), 1),
              L.summary ? (r(), p("p", Jd, u(L.summary), 1)) : E("", !0),
              i("div", Zd, [
                i("div", Qd, [
                  l(L) ? (r(), p("span", eu, u(l(L)), 1)) : E("", !0),
                  i("span", tu, u(g(L)), 1)
                ]),
                i("time", ou, u(C(L)), 1)
              ])
            ])
          ], 8, Yd))), 128))
        ])) : (r(), p("p", Vd, u(s(c)("aihot.card.empty")), 1))
      ])
    ]));
  }
}), nu = /* @__PURE__ */ Me(iu, [["__scopeId", "data-v-5b229fc1"]]), su = ["aria-label"], au = ["disabled", "aria-pressed"], ru = ["disabled", "aria-pressed"], lu = ["aria-label"], cu = ["data-page", "title", "onClick", "onContextmenu", "onDragover", "onDrop"], du = {
  key: 0,
  id: "bookmark-board-header",
  class: "launcher-page-tabs"
}, uu = ["data-page"], pu = ["href", "title", "data-launcher-id", "onPointerdown", "onClick", "onContextmenu"], hu = ["title", "data-launcher-folder", "onPointerdown", "onDragstart", "onDrop", "onClick", "onContextmenu"], fu = ["title", "onClick"], gu = {
  class: "launcher-folder-count",
  hidden: ""
}, mu = {
  class: "launcher-empty",
  key: "empty-msg"
}, vu = {
  key: 1,
  class: "launcher-media-stack"
}, yu = {
  key: 1,
  id: "launcher-bili"
}, wu = { class: "launcher-folder-preview" }, bu = { class: "launcher-folder-label launcher-title" }, ku = { class: "launcher-label launcher-title" }, _u = /* @__PURE__ */ de({
  __name: "FavoriteSites",
  setup(e) {
    const t = G(() => import("./BookmarkBoard-za6lDD0R.js")), o = G(() => import("./LauncherBookGuideDialog-5_uIwVKY.js")), n = H("sites"), a = H(!1), d = H(!1);
    function b() {
      d.value = !0;
    }
    function g() {
      d.value = !1;
    }
    function l() {
      me(), y = !1, he = !1;
    }
    Ke(() => {
      Oe.setExternalDragHandler(M), Oe.setExternalDropHandler(k), window.addEventListener("blur", l), window.addEventListener("pagehide", l), document.addEventListener("visibilitychange", l);
      const w = window;
      re.hasBili && typeof w.ensureLauncherMediaCards == "function" && w.ensureLauncherMediaCards();
    });
    const h = H(!1), C = H(""), D = H(null), m = H(null), S = H(null), f = H(null);
    let y = !1, I = 0, v = 0, x = 0, L = "", W = 0, O = "", J = 0;
    function M(w) {
      if (n.value !== "sites") return;
      if (!w || pt.isOpen) {
        f.value && (f.value = null), O = "";
        return;
      }
      const _ = document.elementsFromPoint(w.clientX, w.clientY);
      if (!_.some(
        (Fe) => Fe.classList.contains("launcher-site-items") || !!Fe.closest?.(".launcher-site-items")
      )) {
        f.value && (f.value = null), O = "";
        return;
      }
      const A = _.find((Fe) => Fe.classList.contains("launcher-link") && Fe.getAttribute("data-launcher-id") !== String(w.link.id) || Fe.classList.contains("launcher-folder"));
      if (!A) return;
      const te = A.classList.contains("launcher-link"), ve = te ? A.getAttribute("data-launcher-id") : null, Ne = te ? null : A.getAttribute("data-launcher-folder"), ne = te ? `link-${ve}` : `folder-${Ne}`, ae = A.getBoundingClientRect(), ze = ae.left + ae.width / 2, ni = ae.top + ae.height / 2, ro = Math.hypot(w.clientX - ze, w.clientY - ni), Bt = Date.now();
      if (ro > Math.max(ae.width, ae.height) * 0.55 || ne === O && Bt - J < 180) return;
      const Ft = ii.value.filter(
        (Fe) => Fe.type !== "link" || String(Fe.link.id) !== String(w.link.id)
      ), ct = [...f.value || Ft], wt = ct.findIndex(
        (Fe) => Fe.type === "link" && String(Fe.link.id) === String(w.link.id)
      ), bt = ct.findIndex((Fe) => Fe.key === ne);
      if (bt < 0) return;
      const Qe = {
        key: `link-${w.link.id}`,
        type: "link",
        link: w.link
      };
      wt >= 0 ? wt !== bt && (ct.splice(wt, 1), ct.splice(bt, 0, Qe), f.value = ct, O = ne, J = Bt) : (ct.splice(bt, 0, Qe), f.value = ct, O = ne, J = Bt);
    }
    async function k(w) {
      if (n.value !== "sites" || pt.isOpen) return !1;
      if (f.value) {
        const _ = f.value.map((T) => ({
          type: T.type,
          id: T.type === "link" ? String(T.link.id) : void 0,
          groupName: T.type === "folder" ? T.folder.groupName : void 0
        }));
        return await Te.moveLinkTo(String(w.id), re.activePage, "常用网站"), await Te.reorderPageItems(re.activePage, _), f.value = null, O = "", !0;
      }
      return !1;
    }
    const $ = be({
      visible: !1,
      x: 0,
      y: 0,
      type: "link",
      link: null,
      folder: null,
      offsetX: 34,
      offsetY: 38
    });
    let X = null, P = 0, z = 0, N = null, U = null, he = !1;
    function _e(w, _) {
      if (_.button !== 0) return;
      X = _.pointerId, P = _.clientX, z = _.clientY, v = _.clientX, x = _.clientY, N = String(w.id), U = null, he = !1;
      const T = _.currentTarget.getBoundingClientRect();
      $.offsetX = _.clientX - T.left, $.offsetY = _.clientY - T.top, $.type = "link", $.link = w, $.folder = null, window.addEventListener("pointermove", fe, { passive: !1 }), window.addEventListener("pointerup", Ie), window.addEventListener("pointercancel", Ie);
    }
    function Ze(w, _, T) {
      if (T.button !== 0 || T.target.closest(".launcher-folder-del-btn")) return;
      X = T.pointerId, P = T.clientX, z = T.clientY, v = T.clientX, x = T.clientY, N = null, U = w, he = !1;
      const A = T.currentTarget.getBoundingClientRect();
      $.offsetX = T.clientX - A.left, $.offsetY = T.clientY - A.top, $.type = "folder", $.folder = {
        groupName: w,
        size: Ae(w),
        links: _?.links || []
      }, $.link = null, window.addEventListener("pointermove", fe, { passive: !1 }), window.addEventListener("pointerup", Ie), window.addEventListener("pointercancel", Ie);
    }
    let B = 0, R = null;
    function j() {
      cancelAnimationFrame(B), B = 0, R = null;
    }
    function fe(w) {
      w.pointerId === X && (he && w.cancelable && w.preventDefault(), R = w, !B && (B = requestAnimationFrame(() => {
        B = 0;
        const _ = R;
        R = null, _ && Ce(_);
      })));
    }
    function Ce(w) {
      if (w.pointerId !== X || !N && !U) return;
      const _ = Math.hypot(w.clientX - P, w.clientY - z);
      if (!he && _ > Pd && (he = !0, y = !0, N ? m.value = N : U && (S.value = U)), !he) return;
      ($.link || $.folder) && ($.visible = !0, $.x = w.clientX - $.offsetX, $.y = w.clientY - $.offsetY);
      const T = document.elementsFromPoint(w.clientX, w.clientY);
      if (Xi()) {
        const ne = T.some(
          (ze) => ze.id === "launcher-folder-dialog" || !!ze.closest?.("#launcher-folder-dialog")
        ), ae = document.querySelector("#launcher-folder-dialog");
        if (ne && ae) {
          ae.classList.add("drop-hover-valid"), pt.dropHoverValid = !0;
          return;
        } else
          ae?.classList.remove("drop-hover-valid"), pt.dropHoverValid = !1;
        f.value = null;
        return;
      }
      const te = f.value || ii.value, ve = N ? `link-${N}` : `folder-${U}`;
      if (te.length) {
        const ne = T.find((ae) => {
          if (ae.classList.contains("launcher-link")) {
            const ze = ae.getAttribute("data-launcher-id");
            return ze && `link-${ze}` !== ve;
          }
          if (ae.classList.contains("launcher-folder")) {
            const ze = ae.getAttribute("data-launcher-folder");
            return ze && `folder-${ze}` !== ve;
          }
          return !1;
        });
        if (ne) {
          const ae = ne.classList.contains("launcher-link"), ze = ae ? ne.getAttribute("data-launcher-id") : null, ni = ae ? null : ne.getAttribute("data-launcher-folder"), ro = ae ? `link-${ze}` : `folder-${ni}`, Bt = ne.getBoundingClientRect();
          let Ft = !0;
          N && !ae && (Nd(Bt, w.clientX, w.clientY) ? (Ft = !1, ne.classList.add("drop-target")) : ne.classList.remove("drop-target"));
          const ct = Date.now();
          if (Rd(Bt, w.clientX, w.clientY) || (Ft = !1), ro === L && ct - W < Wd && (Ft = !1), Ft) {
            document.querySelectorAll(".launcher-folder.drop-target").forEach((Qe) => Qe.classList.remove("drop-target"));
            const wt = te.findIndex((Qe) => Qe.key === ve), bt = te.findIndex((Qe) => Qe.key === ro);
            if (wt >= 0 && bt >= 0 && wt !== bt) {
              const Qe = te.slice(), Fe = Qe.splice(wt, 1)[0];
              Qe.splice(bt, 0, Fe), f.value = Qe, L = ro, W = ct;
            }
          }
        }
      }
      const Ne = T.find((ne) => ne.classList.contains("launcher-page-tab"));
      if (Ne) {
        const ne = Ne.getAttribute("data-page");
        ne && ne !== re.activePage && Ne.classList.add("drop-target");
      } else
        document.querySelectorAll(".launcher-page-tab.drop-target").forEach((ne) => ne.classList.remove("drop-target"));
    }
    async function Ie(w) {
      if (w.pointerId === X) {
        j(), w.type === "pointercancel" ? me() : Ce(w), window.removeEventListener("pointermove", fe), window.removeEventListener("pointerup", Ie), window.removeEventListener("pointercancel", Ie);
        try {
          if (he) {
            I = Date.now(), y = !1;
            const _ = document.elementsFromPoint(w.clientX, w.clientY);
            if (document.querySelectorAll(".launcher-page-tab.drop-target").forEach((A) => A.classList.remove("drop-target")), document.querySelectorAll(".launcher-folder.drop-target").forEach((A) => A.classList.remove("drop-target")), Xi() && pt.activeFolder) {
              if (_.some(
                (te) => te.id === "launcher-folder-dialog" || !!te.closest?.("#launcher-folder-dialog")
              )) {
                const ve = _.find((Ne) => Ne.hasAttribute("data-child-folder"))?.getAttribute("data-child-folder") || pt.activeFolder;
                N ? await Te.moveLinkTo(N, void 0, ve) : U && await Te.moveFolderInto(U, ve);
              }
              return;
            }
            const T = _.find((A) => A.classList.contains("launcher-page-tab"));
            if (T) {
              const A = T.getAttribute("data-page");
              if (A) {
                N ? (await Te.moveLinkTo(N, A, "常用网站"), await Te.setPage(A)) : U && await Te.moveFolderToPage(U, A), me();
                return;
              }
            }
            if (N) {
              const A = _.find((te) => te.classList.contains("launcher-folder"));
              if (A) {
                const te = A.getAttribute("data-launcher-folder");
                if (te) {
                  await Te.moveLinkTo(N, re.activePage, te), me();
                  return;
                }
              }
            }
            if (f.value) {
              const A = f.value.map((te) => ({
                type: te.type,
                id: te.type === "link" ? String(te.link.id) : void 0,
                groupName: te.type === "folder" ? te.folder.groupName : void 0
              }));
              await Te.reorderPageItems(re.activePage, A);
            }
          }
        } catch (_) {
          ye.show({ appName: "常用网站", title: "移动未完成", message: _ instanceof Error ? _.message : "请刷新核对，未自动重试。" });
        } finally {
          me();
        }
      }
    }
    function me() {
      j(), X = null, N = null, U = null, he = !1, y = !1, m.value = null, S.value = null, f.value = null, $.visible = !1, $.link = null, $.folder = null, L = "", document.querySelector("#launcher-folder-dialog")?.classList.remove("drop-hover-valid"), pt.dropHoverValid = !1, window.removeEventListener("pointermove", fe), window.removeEventListener("pointerup", Ie), window.removeEventListener("pointercancel", Ie);
    }
    St(() => {
      Oe.setExternalDragHandler(null), Oe.setExternalDropHandler(null), me(), window.removeEventListener("blur", l), window.removeEventListener("pagehide", l), document.removeEventListener("visibilitychange", l), window.removeEventListener("pointermove", fe), window.removeEventListener("pointerup", Ie), window.removeEventListener("pointercancel", Ie);
    });
    function We(w) {
      const _ = re.pageLabels;
      return _ && _[w] ? _[w] : w || "常用网站";
    }
    function at(w, _) {
      const T = String(w.page || "").trim(), A = String(_).trim(), te = re.pageLabels || {}, ve = !T || T === "常用网站" || T === "默认";
      if (!A || A === "常用网站" || A === "默认") return ve;
      if (ve) return !1;
      if (T === A) return !0;
      const ne = te[T] || T, ae = te[A] || A;
      return ne === ae || T === ae || ne === A;
    }
    function Ae(w) {
      const _ = re.groupSizes;
      return _ && _[w] === "large" ? "large" : "small";
    }
    function $o(w) {
      return w === "large" ? 9 : 4;
    }
    function ss(w, _) {
      const T = $o(_), A = w.length > T ? T - 1 : T;
      return w.slice(0, A);
    }
    const ii = oe(() => {
      const w = re.activePage || "常用网站", T = re.links.filter(
        (ne) => at(ne, w)
      ), A = /* @__PURE__ */ new Map();
      T.forEach((ne) => {
        const ae = ne.group || "常用网站";
        ae !== "常用网站" && (A.has(ae) || A.set(ae, []), A.get(ae).push(ne));
      });
      const te = /* @__PURE__ */ new Set(), ve = [];
      T.forEach((ne) => {
        const ae = ne.group || "常用网站";
        Qi(re.folders, ae) || (ae === "常用网站" ? ve.push({ key: `link-${ne.id}`, type: "link", link: ne }) : te.has(ae) || (te.add(ae), ve.push({
          key: `folder-${ae}`,
          type: "folder",
          folder: {
            groupName: ae,
            pageName: w,
            links: A.get(ae) || []
          }
        })));
      });
      const Ne = re.folders;
      return Ne && Object.entries(Ne).forEach(([ne, ae]) => {
        if (Qi(re.folders, ne)) return;
        const ze = ae?.page || "常用网站";
        (ze === w || w === "常用网站" && ze === "默认") && !te.has(ne) && (te.add(ne), ve.push({
          key: `folder-${ne}`,
          type: "folder",
          folder: {
            groupName: ne,
            pageName: w,
            links: A.get(ne) || []
          }
        }));
      }), ve;
    }), Ui = oe(() => f.value && f.value.length ? f.value : ii.value), as = oe(() => {
      const w = re.activePage || "常用网站", _ = We(w);
      return _ === "默认" || w === "常用网站" ? "还没有快捷入口，点击“编辑入口”后添加。" : `“${_}”还是空的，把网站拖到这里。`;
    });
    function Yi(w) {
      f.value = null, m.value = null, S.value = null, Oe.switchPage(w);
    }
    function rs() {
      h.value = !0, C.value = "", vt(() => {
        D.value?.focus();
      });
    }
    function qi() {
      if (!h.value) return;
      const w = C.value.trim();
      h.value = !1, w && Oe.addPage(w);
    }
    function ls(w) {
      w.key === "Enter" ? (w.preventDefault(), qi()) : w.key === "Escape" && (h.value = !1);
    }
    function cs(w, _) {
      Oe.openPageMenu(w, _);
    }
    function ds(w) {
      const _ = w.target;
      if (!_ || _.closest(".launcher-link") || _.closest(".launcher-folder") || _.closest(".launcher-page-tab") || _.closest("button") || _.closest("input"))
        return;
      w.preventDefault();
      const T = re.activePage || "常用网站";
      Hi.openBlankMenu(T, w.clientX, w.clientY);
    }
    function us(w) {
      n.value === "sites" && (!w.shiftKey || re.pages.length < 2 || (w.preventDefault(), w.deltaY > 0 || w.deltaX > 0 ? Oe.nextPage() : Oe.prevPage()));
    }
    function ps(w) {
      w.target.closest(".launcher-page-tab") || w.stopPropagation();
    }
    function hs(w) {
      w.button === 0 && (v = w.clientX, x = w.clientY);
    }
    function fs(w, _) {
      if (_.preventDefault(), _.stopPropagation(), je.isEditingShortcuts) {
        je.handleLinkSelection(w);
        return;
      }
      X || (y = !1), !(Math.hypot(_.clientX - v, _.clientY - x) >= 6 || y || Date.now() - I < 600) && Oe.openLink(w, _);
    }
    function gs(w, _) {
      Oe.openLinkMenu(w, _);
    }
    function ms(w, _) {
      if (X || (y = !1), y || Date.now() - I < 450) {
        _.preventDefault(), _.stopPropagation();
        return;
      }
      Oe.openFolder(w, _);
    }
    function vs(w, _, T) {
      Oe.openFolderMenu(w, _, T);
    }
    function ys(w) {
      Oe.deleteFolder(w);
    }
    function ws(w, _) {
      const T = Array.from(_.dataTransfer?.types || []);
      if (!T.includes("application/x-newtab-launcher") && !T.includes("application/x-newtab-bookmark") && !T.includes("text/uri-list") && !T.includes("text/plain")) return;
      _.preventDefault(), _.dataTransfer && (_.dataTransfer.dropEffect = "move"), re.activePage !== w && Yi(w), _.currentTarget?.classList.add("drop-target");
    }
    function bs(w) {
      w.currentTarget?.classList.remove("drop-target");
    }
    async function ks(w, _) {
      _.currentTarget?.classList.remove("drop-target");
      let A = "";
      const te = _.dataTransfer?.getData("application/x-newtab-launcher");
      if (te)
        try {
          A = String(JSON.parse(te)?.id || "");
        } catch {
        }
      if (!A && (m.value || window.__activeLauncherLink) && (A = String(window.__activeLauncherLink?.id || m.value || "")), A) {
        _.preventDefault(), _.stopPropagation(), await Te.moveLinkTo(A, w, "常用网站"), await Te.setPage(w);
        return;
      }
      const ve = window;
      typeof ve.importDroppedLauncherItem == "function" && (_.preventDefault(), _.stopPropagation(), await ve.importDroppedLauncherItem(_, "常用网站", w));
    }
    function _s(w) {
      const _ = Array.from(w.dataTransfer?.types || []);
      if (!_.includes("application/x-newtab-launcher") && !_.includes("application/x-newtab-bookmark") && !_.includes("text/uri-list") && !_.includes("text/plain")) return;
      w.preventDefault(), w.dataTransfer && (w.dataTransfer.dropEffect = _.includes("application/x-newtab-launcher") ? "move" : "copy"), w.currentTarget?.classList.add("drop-target");
    }
    function Cs(w) {
      const _ = w.currentTarget;
      _?.contains(w.relatedTarget) || _?.classList.remove("drop-target");
    }
    async function xs(w) {
      w.currentTarget?.classList.remove("drop-target");
      let T = "";
      const A = w.dataTransfer?.getData("application/x-newtab-launcher");
      if (A)
        try {
          T = String(JSON.parse(A)?.id || "");
        } catch {
        }
      if (!T && (m.value || window.__activeLauncherLink) && (T = String(window.__activeLauncherLink?.id || m.value || "")), T) {
        w.preventDefault(), w.stopPropagation(), await Te.moveLinkTo(T, re.activePage, "常用网站");
        return;
      }
      const te = window;
      if (typeof te.importDroppedLauncherItem == "function") {
        w.preventDefault(), w.stopPropagation(), await te.importDroppedLauncherItem(w, "常用网站", re.activePage);
        return;
      }
      const ve = w.dataTransfer?.getData("text/plain");
      ve && /^https?:\/\//i.test(ve.trim()) && (w.preventDefault(), w.stopPropagation(), await Te.addLink({
        title: "",
        url: ve.trim(),
        page: re.activePage
      }));
    }
    function Xi() {
      if (!pt.isOpen) return !1;
      if (typeof document < "u") {
        const w = document.querySelector("#launcher-folder-dialog");
        return !!(w && w.open);
      }
      return !1;
    }
    function Ls(w, _) {
      _.preventDefault();
    }
    function $s(w) {
      w.preventDefault(), w.dataTransfer && (w.dataTransfer.dropEffect = "move"), w.currentTarget?.classList.add("drop-target");
    }
    function Ts(w) {
      w.currentTarget?.classList.remove("drop-target");
    }
    async function Ss(w, _) {
      _.currentTarget?.classList.remove("drop-target"), _.preventDefault(), _.stopPropagation();
      const A = _.dataTransfer?.getData("application/x-newtab-launcher-folder");
      if (A && A !== w) {
        try {
          await Te.moveFolderInto(A, w);
        } catch (Ne) {
          ye.show({ appName: "常用网站", title: "移动未完成", message: Ne instanceof Error ? Ne.message : "请刷新后核对。" });
        }
        return;
      }
      let te = "";
      const ve = _.dataTransfer?.getData("application/x-newtab-launcher");
      if (ve)
        try {
          te = String(JSON.parse(ve)?.id || "");
        } catch {
        }
      !te && (m.value || window.__activeLauncherLink) && (te = String(window.__activeLauncherLink?.id || m.value || "")), te && await Te.moveLinkTo(te, re.activePage, w);
    }
    return (w, _) => (r(), p(Y, null, [
      s(re).showSites ? (r(), p("section", {
        key: 0,
        class: "launcher-group launcher-sites size-large",
        onWheel: us
      }, [
        i("header", {
          class: "launcher-group-head launcher-sites-head",
          onPointerdown: _[5] || (_[5] = F(() => {
          }, ["stop"])),
          onContextmenu: ps
        }, [
          i("div", {
            class: "sites-view-switch",
            role: "group",
            "aria-label": s(c)("home.sites.switchAria")
          }, [
            i("button", {
              type: "button",
              disabled: a.value,
              "aria-pressed": n.value === "sites",
              onClick: _[0] || (_[0] = (T) => n.value = "sites")
            }, u(s(c)("home.sites.favoriteSites")), 9, au),
            i("button", {
              type: "button",
              disabled: a.value,
              "aria-pressed": n.value === "bookmarks",
              onClick: _[1] || (_[1] = (T) => n.value = "bookmarks")
            }, u(s(c)("home.sites.bookmarks")), 9, ru)
          ], 8, su),
          Ue(i("div", {
            class: "launcher-page-tabs",
            role: "tablist",
            "aria-label": s(c)("home.sites.pagesAria")
          }, [
            (r(!0), p(Y, null, ge(s(re).pages, (T) => (r(), p("button", {
              key: T,
              type: "button",
              class: le(["launcher-page-tab", { active: T === s(re).activePage }]),
              "data-page": T,
              role: "tab",
              title: s(c)("home.sites.pageTabTitle", { label: We(T) }),
              onPointerdown: _[2] || (_[2] = F(() => {
              }, ["stop"])),
              onClick: F((A) => Yi(T), ["prevent", "stop"]),
              onContextmenu: F((A) => cs(T, A), ["prevent", "stop"]),
              onDragover: (A) => ws(T, A),
              onDragleave: _[3] || (_[3] = (A) => bs(A)),
              onDrop: (A) => ks(T, A)
            }, u(We(T)), 43, cu))), 128)),
            h.value ? Ue((r(), p("input", {
              key: 1,
              ref_key: "pageInputRef",
              ref: D,
              class: "launcher-page-input",
              maxlength: "12",
              placeholder: "例如：游戏区",
              "onUpdate:modelValue": _[4] || (_[4] = (T) => C.value = T),
              onKeydown: ls,
              onBlur: qi
            }, null, 544)), [
              [oo, C.value]
            ]) : (r(), p("button", {
              key: 0,
              class: "launcher-page-add",
              type: "button",
              title: "添加网站分区，例如游戏区",
              "aria-label": "添加网站分区",
              onClick: rs
            }, " + "))
          ], 8, lu), [
            [io, n.value === "sites"]
          ]),
          n.value === "bookmarks" ? (r(), p("div", du)) : E("", !0),
          i("button", {
            class: "launcher-page-help",
            type: "button",
            title: "使用指南：如何创建文件夹与整理网站",
            "aria-label": "使用指南与技巧",
            onClick: b
          }, " ? ")
        ], 32),
        n.value === "bookmarks" ? (r(), ce(s(t), {
          key: 0,
          "header-target": "#bookmark-board-header",
          onBusy: _[6] || (_[6] = (T) => a.value = T)
        })) : E("", !0),
        Ue(i("div", {
          class: "launcher-page-panel",
          "data-page": s(re).activePage,
          hidden: !1,
          role: "tabpanel",
          onContextmenu: ds,
          onDragover: _[12] || (_[12] = (T) => _s(T)),
          onDragleave: _[13] || (_[13] = (T) => Cs(T)),
          onDrop: _[14] || (_[14] = (T) => xs(T))
        }, [
          (r(), ce(Ko, {
            tag: "div",
            class: "launcher-items launcher-site-items",
            key: s(re).activePage,
            name: m.value || S.value ? "launcher-grid" : ""
          }, {
            default: to(() => [
              (r(!0), p(Y, null, ge(Ui.value, (T) => (r(), p(Y, {
                key: T.key
              }, [
                T.type === "link" ? (r(), p("a", {
                  key: T.key,
                  class: le(["launcher-link", {
                    "is-dragging": m.value === String(T.link.id),
                    "is-wheel-picked": s(je).isEditingShortcuts && s(je).isLinkInWheel(T.link.url)
                  }]),
                  href: T.link.url,
                  title: T.link.title + (T.link.note ? `
📝 ` + T.link.note : "") + `
🔗 ` + T.link.url,
                  "data-launcher-id": String(T.link.id),
                  target: "_blank",
                  rel: "noreferrer",
                  draggable: "false",
                  onDragstart: _[7] || (_[7] = F(() => {
                  }, ["prevent"])),
                  onPointerdown: (A) => _e(T.link, A),
                  onMousedown: _[8] || (_[8] = (A) => hs(A)),
                  onClick: F((A) => fs(T.link, A), ["prevent"]),
                  onContextmenu: F((A) => gs(T.link, A), ["prevent"])
                }, [
                  q(yn, {
                    link: T.link
                  }, null, 8, ["link"])
                ], 42, pu)) : T.type === "folder" ? (r(), p("div", {
                  key: T.key,
                  class: le(["launcher-folder", [
                    `size-${Ae(T.folder.groupName)}`,
                    { "is-dragging": S.value === T.folder.groupName }
                  ]]),
                  title: `${T.folder.groupName}
可拖动调整位置；右键调整收藏夹大小`,
                  role: "button",
                  tabindex: "0",
                  "data-launcher-folder": String(T.folder.groupName),
                  draggable: "true",
                  onPointerdown: (A) => Ze(T.folder.groupName, T.folder, A),
                  onDragstart: (A) => Ls(T.folder.groupName, A),
                  onDragover: _[10] || (_[10] = (A) => $s(A)),
                  onDragleave: _[11] || (_[11] = (A) => Ts(A)),
                  onDrop: (A) => Ss(T.folder.groupName, A),
                  onClick: (A) => ms(T.folder.groupName, A),
                  onContextmenu: F((A) => vs(T.folder.groupName, T.folder.pageName, A), ["prevent"])
                }, [
                  q(yn, {
                    folder: { title: T.folder.groupName, preview: T.folder.links, count: T.folder.links.length },
                    size: Ae(T.folder.groupName)
                  }, {
                    default: to(() => [
                      i("button", {
                        class: "launcher-folder-del-btn",
                        type: "button",
                        title: `删除文件夹「${T.folder.groupName}」`,
                        "aria-label": "删除文件夹",
                        onPointerdown: _[9] || (_[9] = F(() => {
                        }, ["stop"])),
                        onClick: F((A) => ys(T.folder.groupName), ["stop", "prevent"])
                      }, " ✕ ", 40, fu)
                    ]),
                    _: 2
                  }, 1032, ["folder", "size"]),
                  i("span", gu, u(T.folder.links.length), 1)
                ], 42, hu)) : E("", !0)
              ], 64))), 128)),
              Ui.value.length ? E("", !0) : (r(), p("p", mu, u(as.value), 1))
            ]),
            _: 1
          }, 8, ["name"]))
        ], 40, uu), [
          [io, n.value === "sites"]
        ])
      ], 32)) : E("", !0),
      s(re).hasTodo || s(re).hasBili ? (r(), p("div", vu, [
        s(re).hasTodo ? (r(), ce(nu, { key: 0 })) : s(re).hasBili ? (r(), p("div", yu)) : E("", !0)
      ])) : E("", !0),
      (r(), ce(yt, { to: "body" }, [
        $.visible ? (r(), p("div", {
          key: 0,
          class: le(["launcher-drag-ghost", [
            $.type === "folder" ? `folder-ghost size-${$.folder?.size}` : "link-ghost"
          ]]),
          style: ke({
            left: `${$.x}px`,
            top: `${$.y}px`
          })
        }, [
          $.type === "folder" && $.folder ? (r(), p(Y, { key: 0 }, [
            i("div", wu, [
              (r(!0), p(Y, null, ge(ss($.folder.links, $.folder.size), (T, A) => (r(), ce(Jo, {
                key: T.id || A,
                link: T,
                mini: !0
              }, null, 8, ["link"]))), 128))
            ]),
            i("span", bu, u($.folder.groupName), 1)
          ], 64)) : $.link ? (r(), p(Y, { key: 1 }, [
            q(Jo, {
              link: $.link
            }, null, 8, ["link"]),
            i("span", ku, u($.link.title), 1)
          ], 64)) : E("", !0)
        ], 6)) : E("", !0)
      ])),
      q(s(o), {
        open: d.value,
        onClose: g
      }, null, 8, ["open"])
    ], 64));
  }
}), os = /* @__PURE__ */ Me(_u, [["__scopeId", "data-v-63287e7b"]]), Go = Object.keys(ao);
let Ro = !1, ki = 0, mo, _i;
function bn(e) {
  for (const t of Go)
    Object.prototype.hasOwnProperty.call(e, t) && (ao[t] = e[t] !== !1);
}
function Cu() {
  const e = ao;
  Oe.setPrefs(e.showSites, e.showTodo, !e.showTodo && e.showBili), document.body.classList.toggle("hide-weather", !e.showWeather), document.body.classList.toggle("hide-sites", !e.showSites), document.body.classList.toggle("hide-bili", !e.showBili), document.body.classList.toggle("hide-youtube", !e.showYouTube), document.body.classList.toggle("hide-todo", !e.showTodo), document.body.classList.toggle("hide-bookmarks", !e.showBookmarkPanel), e.showBookmarkPanel || Zo.close();
}
const kn = {
  start() {
    if (Ro) return;
    Ro = !0;
    const e = ++ki;
    _i = Be(() => Go.map((o) => ao[o]), Cu, { immediate: !0, flush: "sync" });
    const t = globalThis.chrome;
    mo = (o, n) => {
      if (n !== "local") return;
      const a = {};
      for (const d of Go) o[d] && (a[d] = o[d].newValue);
      bn(a);
    }, t?.storage?.onChanged?.addListener(mo), t?.storage?.local && t.storage.local.get(Go).then((o) => {
      Ro && ki === e && bn(o || {});
    }).catch((o) => console.warn("[HomePrefs] 读取首页设置失败", o));
  },
  stop() {
    Ro = !1, ki++, _i?.(), _i = void 0, mo && globalThis.chrome?.storage?.onChanged?.removeListener(mo), mo = void 0;
  }
}, xu = {
  id: "launcher",
  class: "launcher",
  "aria-label": "快捷入口"
}, Lu = { class: "launcher-inner" }, $u = { class: "launcher-overview" }, Tu = ["title"], Su = { class: "card-head" }, Iu = { id: "wx-title" }, Mu = { id: "weather-body" }, Du = { class: "launcher-center" }, Au = {
  class: "hero-clock",
  id: "hero-clock"
}, Eu = {
  class: "launcher-widget launcher-task-threads launcher-music-card",
  "data-home-module": "taskThreads"
}, Pu = { class: "card-head" }, Wu = ["title"], Nu = {
  id: "task-thread-home",
  class: "task-thread-home home-music-body"
}, Ru = /* @__PURE__ */ de({
  __name: "AppLauncher",
  setup(e) {
    Ke(() => {
      Vo.initWallpaper();
    });
    function t() {
      De.handleToolClick("music");
    }
    return (o, n) => (r(), p("section", xu, [
      n[4] || (n[4] = i("div", {
        id: "hero-background-media",
        class: "hero-background-media",
        "aria-hidden": "true"
      }, null, -1)),
      i("div", Lu, [
        i("div", $u, [
          Ue(i("section", {
            class: "launcher-widget launcher-weather",
            "data-home-module": "weather",
            title: s(c)("weather.widgetSwitchTip")
          }, [
            i("header", Su, [
              n[1] || (n[1] = i("span", {
                class: "bar",
                style: { background: "linear-gradient(180deg,#38bdf8,#818cf8)" }
              }, null, -1)),
              i("h2", Iu, u(s(c)("weather.widgetTitle")), 1)
            ]),
            i("div", Mu, [
              q(Qn)
            ])
          ], 8, Tu), [
            [io, s(ao).showWeather]
          ]),
          i("div", Du, [
            i("div", Au, [
              q(Yc),
              q(es)
            ]),
            i("form", {
              id: "search",
              class: "search",
              onSubmit: n[0] || (n[0] = F(() => {
              }, ["prevent"]))
            }, [
              q(Ln)
            ], 32)
          ]),
          i("section", Eu, [
            i("header", Pu, [
              n[2] || (n[2] = i("span", { class: "bar music-purple" }, null, -1)),
              i("h2", null, u(s(c)("home.music.player")), 1),
              n[3] || (n[3] = i("span", { class: "grow" }, null, -1)),
              i("button", {
                id: "home-music-open-panel",
                class: "home-music-head-btn",
                type: "button",
                title: s(c)("home.music.openNeteaseTip"),
                onClick: t
              }, u(s(c)("home.music.openNetease")), 9, Wu)
            ]),
            i("div", Nu, [
              q(ts)
            ])
          ])
        ]),
        i("div", {
          id: "launcher-groups",
          class: le(["launcher-groups", { "has-sites": s(re).showSites, "has-todoist": s(re).hasTodo, "has-bili": s(re).hasBili, "has-media": s(re).hasTodo || s(re).hasBili }])
        }, [
          q(os)
        ], 2)
      ]),
      n[5] || (n[5] = i("input", {
        id: "background-input",
        type: "file",
        accept: "image/*,video/mp4,video/webm,.gif,.mp4,.webm",
        multiple: "",
        hidden: ""
      }, null, -1))
    ]));
  }
}), eo = be(/* @__PURE__ */ new Set()), Dt = be({}), qe = be({});
function Ci(e) {
  const t = Xe(e);
  if (!t?.lifecycle.canUnmount || t.lifecycle.canUnmount()) return { ok: !0 };
  const o = t.lifecycle.unmountBlockedMessage || "模块操作尚未结束，不能退出或重载。";
  return ye.show({ appName: t.title, title: "操作进行中", message: o, showActions: !1 }), { ok: !1, error: o };
}
const Pe = {
  // 检查应用是否处于运行显示状态（驱动 Dock 上的小圆点：关闭即熄灭，不保留 macOS 风格后台悬浮绿点）
  isRunning(e) {
    return this.isVisible(e);
  },
  // 检查应用当前是否在屏幕上可见（窗口是否打开）
  isVisible(e) {
    const t = Xe(e);
    return t ? t.lifecycle.isVisible() : li(e) ? !!la[e] : ca(e);
  },
  // 标记应用启动
  markRunning(e) {
    eo.add(e), (e in qe || Xe(e)) && (qe[e] = !0);
  },
  // 获取组件当前的 render key
  getRenderKey(e) {
    return Dt[e] || 0;
  },
  // 打开 / 显示应用窗口
  openApp(e) {
    const t = Xe(e);
    if (t) {
      De.open(e), t.lifecycle.isVisible() && this.markRunning(e);
      return;
    }
    if (this.markRunning(e), li(e)) {
      tn.open(e);
      return;
    }
    De.open(e);
  },
  // 隐藏/关闭窗口：立即退出可见运行态并熄灭 Dock 指示绿点
  hideApp(e) {
    if (eo.delete(e), Xe(e)) {
      De.close(e);
      return;
    }
    if (li(e)) {
      tn.close(e);
      return;
    }
    De.close(e);
  },
  // 真正的关闭（Quit / 彻底从内存与 DOM 中卸载销毁，熄灭小圆点）
  async quitApp(e) {
    if (Xe(e)) {
      const a = Ci(e);
      if (!a.ok) return a;
      const d = Xe(e)?.lifecycle.beforeQuit;
      if (d) {
        const l = Mt(e);
        try {
          await d();
        } catch {
          const C = "后台停止未确认，窗口保留；未自动重试，请检查后台状态。";
          return ye.show({ appName: Xe(e).title, title: "未退出", message: C, showActions: !1 }), { ok: !1, error: C };
        }
        if (Mt(e) !== l) return { ok: !1, error: "窗口已有后续操作，未卸载。" };
        const h = Ci(e);
        if (!h.ok) return h;
      }
      const b = De.close(e), g = Mt(e);
      return eo.delete(e), qe[e] = !1, ft.removeActiveTool(e), await b, await vt(), Mt(e) === g ? { ok: !0 } : { ok: !1, error: "模块已有后续操作，退出状态已变化。" };
    }
    this.hideApp(e), eo.delete(e), ft.removeActiveTool(e), e in qe && (qe[e] = !1);
    const t = ra;
    t.activeId === e && (t.activeId = "");
    const o = t.openOrder.indexOf(e);
    o >= 0 && t.openOrder.splice(o, 1);
    const n = t.activeTools.indexOf(e);
    n >= 0 && t.activeTools.splice(n, 1), De.render();
  },
  // 重新加载（Reload / 单应用热重启，重新初始化组件）
  async reloadApp(e) {
    const t = Xe(e);
    if (t) {
      if (t.lifecycle.canOpen && !t.lifecycle.canOpen()) return { ok: !1, error: "模块当前不能打开，未重载窗口。" };
      const o = Ci(e);
      if (!o.ok) return o;
      const n = De.close(e), a = Mt(e);
      return await n, Mt(e) !== a ? { ok: !1, error: "模块已有后续操作，重载已取消。" } : (qe[e] = !1, await vt(), Mt(e) !== a ? { ok: !1, error: "模块已有后续操作，未重新打开。" } : (Dt[e] = (Dt[e] || 0) + 1, De.open(e), t.lifecycle.isVisible() ? (this.markRunning(e), { ok: !0 }) : { ok: !1, error: "模块当前不能打开，未重新显示窗口。" }));
    }
    this.hideApp(e), e in qe ? (qe[e] = !1, await vt(), Dt[e] = (Dt[e] || 0) + 1, qe[e] = !0) : Dt[e] = (Dt[e] || 0) + 1, await vt(), this.openApp(e);
  }
}, zt = /* @__PURE__ */ de({
  __name: "DockCardModuleHost",
  props: {
    id: {}
  },
  setup(e) {
    const o = Xe(e.id);
    if (!o || o.presentation !== "card") throw new Error("Unknown registered workspace card");
    const n = o;
    n.mountPolicy === "workspace-ready" && Pe.markRunning(n.id), Be(n.lifecycle.isVisible, (h) => {
      h && Pe.markRunning(n.id);
    }, { immediate: !0, flush: "sync" });
    const a = oe(() => !!qe[n.id]);
    function d() {
      try {
        n.lifecycle.hide();
      } catch {
      }
      (xt.activeId === n.id || xt.activeId === n.rootId) && (xt.activeId = null), Pe.hideApp(n.id), typeof document < "u" && document.body.classList.remove("has-card-fullscreen");
    }
    function b() {
      Pe.reloadApp(n.id);
    }
    function g() {
      typeof window < "u" && window.location.reload();
    }
    const l = G({
      loader: n.loadView,
      onError(h, C, D, m) {
        m <= 2 ? C() : D();
      },
      errorComponent: de({
        setup: () => () => n.lifecycle.isVisible() ? He("section", { class: "card wide card-fullscreen", role: "alert" }, [
          He("h2", n.title),
          He("p", "工作区切片加载受阻（可能因插件重载或切片更新）。可点击「重新加载模块」，或返回首页。"),
          He("div", { style: "display: flex; gap: 10px; margin-top: 14px;" }, [
            He("button", {
              type: "button",
              style: "padding: 6px 14px; border-radius: 999px; border: 1px solid var(--border); background: var(--primary, #3b82f6); color: #fff; cursor: pointer; font-size: 12px; font-weight: 500;",
              onClick: g
            }, "⟳ 刷新标签页 (加载最新版)"),
            He("button", {
              type: "button",
              style: "padding: 6px 14px; border-radius: 999px; border: 1px solid var(--border); background: var(--surface); color: var(--text); cursor: pointer; font-size: 12px;",
              onClick: b
            }, "↻ 重新加载模块"),
            He("button", {
              type: "button",
              style: "padding: 6px 14px; border-radius: 999px; border: 1px solid var(--border); background: var(--surface); color: var(--text); cursor: pointer; font-size: 12px;",
              onClick: d
            }, "返回首页")
          ])
        ]) : null
      })
    });
    return so(() => {
      d(), eo.delete(n.id), delete qe[n.id];
    }), (h, C) => a.value ? (r(), ce(Tn(s(l)), {
      key: s(Pe).getRenderKey(s(n).id)
    })) : E("", !0);
  }
}), Ou = { class: "logicweaver-workspaces-layer" }, Bu = {
  key: 0,
  id: "daily-section",
  class: "wrap"
}, Fu = { id: "vue-todoist-root" }, Hu = { id: "vue-bili-favorites-root" }, ju = { id: "vue-youtube-root" }, zu = { id: "vue-pricing-root" }, Gu = { id: "vue-aihot-root" }, Ku = /* @__PURE__ */ de({
  __name: "AppWorkspaces",
  setup(e) {
    const t = H(!!xt.activeId);
    return Ke(() => {
      t.value || (typeof window < "u" && "requestIdleCallback" in window ? window.requestIdleCallback(() => {
        t.value = !0;
      }, { timeout: 80 }) : setTimeout(() => {
        t.value = !0;
      }, 40));
    }), (o, n) => (r(), p("div", Ou, [
      t.value ? (r(), p("main", Bu, [
        i("div", Fu, [
          q(zt, { id: "todoist" })
        ]),
        i("div", Hu, [
          q(zt, { id: "daily-bilibili" })
        ]),
        Ue(i("div", ju, [
          q(zt, { id: "daily-youtube" })
        ], 512), [
          [io, s(ao).showYouTube]
        ]),
        i("div", zu, [
          q(zt, { id: "daily-pricing" })
        ]),
        i("div", Gu, [
          q(zt, { id: "daily-aihot" })
        ]),
        q(zt, { id: "card-github" })
      ])) : E("", !0)
    ]));
  }
}), Vu = ["aria-label"], Uu = { class: "dock-menu-head" }, Yu = { class: "dock-menu-title" }, qu = ["src", "alt"], Xu = {
  key: 1,
  class: "dock-menu-emoji"
}, Ju = { class: "dock-menu-text" }, Zu = { class: "dock-menu-text" }, Qu = { class: "dock-menu-text" }, ep = /* @__PURE__ */ de({
  __name: "DockContextMenu",
  props: {
    target: {}
  },
  emits: ["close", "action"],
  setup(e, { emit: t }) {
    const o = e, n = t, a = oe(() => !o.target || o.target.type !== "tool" ? !1 : Pe.isRunning(o.target.id)), d = oe(() => !o.target || o.target.type !== "tool" ? !1 : Pe.isVisible(o.target.id)), { menuRef: b, style: g } = On({
      visible: () => !!o.target,
      anchor: () => o.target || { x: 0, y: 0 },
      placement: Ut.position === "top" ? "below" : "above",
      align: "center",
      gap: 12,
      dismiss: () => n("close")
    });
    function l() {
      o.target && (Pe.openApp(o.target.id), n("close"));
    }
    function h() {
      o.target && (Pe.hideApp(o.target.id), n("close"));
    }
    async function C() {
      o.target && (await Pe.reloadApp(o.target.id), n("close"));
    }
    async function D() {
      if (!o.target) return;
      const f = o.target;
      if ((await Pe.quitApp(f.id))?.ok === !1) {
        n("close");
        return;
      }
      ye.show({
        appName: f.title,
        title: c("dock.quitDone"),
        subtitle: c("dock.quitSubtitle"),
        icon: f.icon || "assets/logo.png",
        duration: 2800
      }), n("close");
    }
    async function m() {
      if (!o.target) return;
      const f = o.target, y = xo.uninstall(f.id);
      n("close"), await y || ye.show({
        appName: f.title,
        title: "入口停用未确认",
        subtitle: xo.state.errorMessage || "请打开模块管理核对当前启用状态",
        icon: f.icon || "assets/logo.png",
        duration: 4e3
      });
    }
    function S() {
      if (!o.target) return;
      const y = {
        "daily-bilibili": "https://www.bilibili.com",
        "card-github": "https://github.com",
        "daily-aihot": "https://news.ycombinator.com",
        "daily-youtube": "https://www.youtube.com",
        "daily-pricing": "https://openai.com/api/pricing"
      }[o.target.id] || "https://www.bilibili.com";
      window.open(y, "_blank"), n("close");
    }
    return (f, y) => (r(), ce(yt, { to: "body" }, [
      e.target ? (r(), p("div", {
        key: 0,
        ref_key: "menuRef",
        ref: b,
        role: "group",
        "aria-label": `${e.target.title}操作`,
        class: "dock-context-menu",
        style: ke(s(g)),
        onClick: y[1] || (y[1] = F(() => {
        }, ["stop"])),
        onContextmenu: y[2] || (y[2] = F(() => {
        }, ["prevent"]))
      }, [
        i("div", Uu, [
          i("div", Yu, [
            e.target.icon ? (r(), p("img", {
              key: 0,
              class: "dock-menu-icon",
              src: e.target.icon,
              alt: e.target.title
            }, null, 8, qu)) : e.target.emoji ? (r(), p("span", Xu, u(e.target.emoji), 1)) : E("", !0),
            i("strong", null, u(e.target.title), 1)
          ]),
          e.target.type === "tool" ? (r(), p("span", {
            key: 0,
            class: le(["dock-status-tag", { "is-running": a.value }])
          }, [
            y[3] || (y[3] = i("span", { class: "dock-status-dot" }, null, -1)),
            Ye(" " + u(a.value ? s(c)("dock.menu.running") : s(c)("dock.menu.notStarted")), 1)
          ], 2)) : E("", !0)
        ]),
        y[12] || (y[12] = i("div", { class: "dock-menu-divider" }, null, -1)),
        e.target.type === "tool" ? (r(), p(Y, { key: 0 }, [
          d.value ? (r(), p("button", {
            key: 1,
            type: "button",
            class: "dock-menu-item",
            onClick: h
          }, [
            y[5] || (y[5] = i("span", { class: "dock-menu-symbol" }, "−", -1)),
            i("span", null, u(s(c)("dock.menu.hideWindow")), 1)
          ])) : (r(), p("button", {
            key: 0,
            type: "button",
            class: "dock-menu-item",
            onClick: l
          }, [
            y[4] || (y[4] = i("span", { class: "dock-menu-symbol" }, "↗", -1)),
            i("span", null, u(s(c)("dock.menu.openWindow")), 1)
          ])),
          i("button", {
            type: "button",
            class: "dock-menu-item",
            onClick: C
          }, [
            y[6] || (y[6] = i("span", { class: "dock-menu-symbol" }, "⟲", -1)),
            i("div", Ju, [
              i("span", null, u(s(c)("dock.menu.reloadApp")), 1),
              i("small", null, u(s(c)("dock.menu.reloadSub")), 1)
            ])
          ]),
          y[9] || (y[9] = i("div", { class: "dock-menu-divider" }, null, -1)),
          i("button", {
            type: "button",
            class: "dock-menu-item",
            onClick: m
          }, [
            y[7] || (y[7] = i("span", { class: "dock-menu-symbol" }, "📌", -1)),
            i("div", Zu, [
              i("span", null, u(s(c)("dock.menu.removeFromDock")), 1),
              i("small", null, u(s(c)("dock.menu.removeSub")), 1)
            ])
          ]),
          i("button", {
            type: "button",
            class: "dock-menu-item item-danger",
            onClick: D
          }, [
            y[8] || (y[8] = i("span", { class: "dock-menu-symbol" }, "✕", -1)),
            i("div", Qu, [
              i("span", null, u(s(c)("dock.menu.quitApp")), 1),
              i("small", null, u(s(c)("dock.menu.quitSub")), 1)
            ])
          ])
        ], 64)) : e.target.type === "card" ? (r(), p("button", {
          key: 1,
          type: "button",
          class: "dock-menu-item",
          onClick: S
        }, [
          y[10] || (y[10] = i("span", { class: "dock-menu-symbol" }, "↗", -1)),
          i("span", null, u(s(c)("dock.menu.openOfficial")), 1)
        ])) : (r(), p("button", {
          key: 2,
          type: "button",
          class: "dock-menu-item",
          onClick: y[0] || (y[0] = (I) => n("close"))
        }, [...y[11] || (y[11] = [
          i("span", { class: "dock-menu-symbol" }, "🏠", -1),
          i("span", null, "返回常用主页", -1)
        ])]))
      ], 44, Vu)) : E("", !0)
    ]));
  }
}), tp = /* @__PURE__ */ Me(ep, [["__scopeId", "data-v-3973d271"]]), op = { class: "mac-dock-shelf" }, ip = ["data-dock-target", "title", "onPointerdown", "onClick", "onContextmenu"], np = ["src", "alt"], sp = {
  key: 0,
  class: "mac-dock-dot",
  "aria-hidden": "true"
}, ap = ["title"], rp = ["alt"], lp = ["data-dock-tool", "title", "onPointerdown", "onClick", "onContextmenu"], cp = ["src", "alt"], dp = {
  key: 1,
  class: "mac-dock-emoji",
  "aria-hidden": "true"
}, up = {
  key: 2,
  class: "mac-dock-dot",
  "aria-hidden": "true"
}, pp = {
  key: 3,
  class: "mac-dock-badge"
}, hp = ["title"], fp = ["src"], gp = {
  key: 1,
  class: "mac-dock-emoji"
}, mp = /* @__PURE__ */ de({
  __name: "MacDock",
  setup(e) {
    const t = oe(() => Ut), o = H(null), n = oe(() => Object.fromEntries(Ut.tools.map((P) => {
      const z = Xe(P.id)?.badgeCount?.() || 0;
      return [P.id, Number.isFinite(z) ? Math.max(0, Math.floor(z)) : 0];
    })));
    function a(P) {
      P.stopPropagation(), o.value = null, D(P.currentTarget), xo.open();
    }
    function d(P, z) {
      z.stopPropagation(), o.value = null, D(z.currentTarget), ft.triggerItem("target", P);
    }
    function b(P, z) {
      const U = z.currentTarget.getBoundingClientRect(), he = Ut.position, _e = he === "left" || he === "right";
      o.value = {
        type: "card",
        id: P.id,
        title: P.title,
        icon: P.icon,
        x: _e ? he === "left" ? U.right + 8 : U.left - 8 : U.left + U.width / 2,
        y: _e ? U.top + U.height / 2 : he === "top" ? U.bottom + 8 : U.top
      };
    }
    function g(P) {
      P.stopPropagation(), o.value = null, D(P.currentTarget), ft.triggerItem("home", "home-launcher");
    }
    function l(P, z) {
      z.stopPropagation(), o.value = null, D(z.currentTarget), Xe(P) || Pe.markRunning(P), ft.triggerItem("tool", P);
    }
    function h(P, z) {
      const U = z.currentTarget.getBoundingClientRect(), he = Ut.position, _e = he === "left" || he === "right";
      o.value = {
        type: "tool",
        id: P.id,
        title: P.title,
        icon: P.icon,
        emoji: P.emoji,
        x: _e ? he === "left" ? U.right + 8 : U.left - 8 : U.left + U.width / 2,
        y: _e ? U.top + U.height / 2 : he === "top" ? U.bottom + 8 : U.top
      };
    }
    const C = /* @__PURE__ */ new Map();
    function D(P) {
      if (!P || (C.get(P)?.cancel(), window.matchMedia("(prefers-reduced-motion: reduce)").matches)) return;
      const z = P.animate([
        { translate: "0 0", offset: 0 },
        { translate: "0 -8px", offset: 0.35 },
        { translate: "0 0", offset: 0.65 },
        { translate: "0 -2px", offset: 0.85 },
        { translate: "0 0", offset: 1 }
      ], { duration: 350, easing: "ease" });
      C.set(P, z);
      const N = () => {
        C.get(P) === z && C.delete(P);
      };
      z.onfinish = N, z.oncancel = N;
    }
    const m = H(null), S = be({
      visible: !1,
      x: 0,
      y: 0,
      width: 40,
      height: 40,
      item: null,
      type: "tool"
    }), f = H(null), y = H(null), I = oe(() => f.value || t.value.cards), v = oe(() => y.value || t.value.tools);
    let x = "", L = 0, W = !1, O = 0;
    function J(P, z, N) {
      if (N.button !== 0 || N.target.closest(".mac-dock-market-btn")) return;
      const _e = N.currentTarget.getBoundingClientRect();
      W = !1, m.value = {
        type: P,
        id: z.id,
        item: z,
        startX: N.clientX,
        startY: N.clientY,
        initialLeft: _e.left,
        initialTop: _e.top,
        width: _e.width,
        height: _e.height
      }, window.addEventListener("pointermove", M), window.addEventListener("pointerup", k), window.addEventListener("pointercancel", k);
    }
    function M(P) {
      if (!m.value) return;
      const z = P.clientX - m.value.startX, N = P.clientY - m.value.startY, U = Math.hypot(z, N);
      if (!W && U > 5 && (W = !0, S.visible = !0, S.item = m.value.item, S.type = m.value.type, S.width = m.value.width, S.height = m.value.height, m.value.type === "card" ? f.value = [...t.value.cards] : y.value = [...t.value.tools]), !W) return;
      S.x = P.clientX - S.width / 2, S.y = P.clientY - S.height / 2;
      const _e = document.elementsFromPoint(P.clientX, P.clientY).find(
        (Ce) => Ce.classList.contains("mac-dock-item") && !Ce.classList.contains("mac-dock-market-btn")
      );
      if (!_e) return;
      const Ze = _e.getAttribute("data-dock-target"), B = _e.getAttribute("data-dock-tool"), R = m.value.type, j = m.value.id, fe = Date.now();
      if (R === "card" && Ze && Ze !== j && Ze !== "home-launcher") {
        const Ce = _e.getBoundingClientRect(), Ie = Ce.left + Ce.width / 2;
        if (Math.abs(P.clientX - Ie) > Ce.width * 0.55 || Ze === x && fe - L < 180) return;
        const me = [...f.value || t.value.cards], We = me.findIndex((Ae) => Ae.id === j), at = me.findIndex((Ae) => Ae.id === Ze);
        if (We >= 0 && at >= 0 && We !== at) {
          const Ae = me.splice(We, 1)[0];
          me.splice(at, 0, Ae), f.value = me, x = Ze, L = fe;
        }
      } else if (R === "tool" && B && B !== j) {
        const Ce = _e.getBoundingClientRect(), Ie = Ce.left + Ce.width / 2;
        if (Math.abs(P.clientX - Ie) > Ce.width * 0.55 || B === x && fe - L < 180) return;
        const me = [...y.value || t.value.tools], We = me.findIndex((Ae) => Ae.id === j), at = me.findIndex((Ae) => Ae.id === B);
        if (We >= 0 && at >= 0 && We !== at) {
          const Ae = me.splice(We, 1)[0];
          me.splice(at, 0, Ae), y.value = me, x = B, L = fe;
        }
      }
    }
    function k() {
      window.removeEventListener("pointermove", M), window.removeEventListener("pointerup", k), window.removeEventListener("pointercancel", k), W && m.value && (O = Date.now() + 250, m.value.type === "card" && f.value ? ft.reorderCards(f.value.map((P) => P.id)) : m.value.type === "tool" && y.value && ft.reorderTools(y.value.map((P) => P.id))), S.visible = !1, S.item = null, f.value = null, y.value = null, m.value = null, W = !1, x = "";
    }
    function $(P, z) {
      Date.now() < O || d(P, z);
    }
    function X(P, z) {
      Date.now() < O || l(P, z);
    }
    return so(() => {
      for (const P of C.values()) P.cancel();
      C.clear(), window.removeEventListener("pointermove", M), window.removeEventListener("pointerup", k), window.removeEventListener("pointercancel", k);
    }), (P, z) => (r(), p(Y, null, [
      i("div", op, [
        q(Ko, {
          tag: "div",
          class: "mac-dock-group mac-dock-cards-group",
          name: "dock-item-motion"
        }, {
          default: to(() => [
            (r(!0), p(Y, null, ge(I.value, (N) => (r(), p("button", {
              key: N.id,
              class: le(["mac-dock-item", {
                "is-active": t.value.activeTargetId === N.id,
                "is-drag-origin": m.value && m.value.id === N.id
              }]),
              type: "button",
              "data-dock-target": N.id,
              title: N.title,
              onPointerdown: (U) => J("card", N, U),
              onClick: F((U) => $(N.id, U), ["stop"]),
              onContextmenu: F((U) => b(N, U), ["prevent"])
            }, [
              i("img", {
                class: "mac-dock-icon",
                src: N.icon,
                alt: N.title
              }, null, 8, np),
              t.value.activeTargetId === N.id ? (r(), p("span", sp)) : E("", !0)
            ], 42, ip))), 128))
          ]),
          _: 1
        }),
        z[4] || (z[4] = i("div", {
          class: "mac-dock-divider",
          "aria-hidden": "true"
        }, null, -1)),
        i("button", {
          class: "mac-dock-item",
          type: "button",
          "data-dock-target": "home-launcher",
          title: s(c)("dock.home"),
          onClick: z[0] || (z[0] = F((N) => g(N), ["stop"]))
        }, [
          i("img", {
            class: "mac-dock-icon",
            src: "assets/nav-home.svg",
            alt: s(c)("dock.home")
          }, null, 8, rp)
        ], 8, ap),
        z[5] || (z[5] = i("div", {
          class: "mac-dock-divider mac-dock-divider-dark",
          "aria-hidden": "true"
        }, null, -1)),
        q(Ko, {
          tag: "div",
          class: "mac-dock-group mac-dock-tools-group",
          name: "dock-item-motion"
        }, {
          default: to(() => [
            (r(!0), p(Y, null, ge(v.value, (N) => (r(), p("button", {
              key: N.id,
              class: le(["mac-dock-item", {
                "is-active": s(Pe).isRunning(N.id),
                "is-drag-origin": m.value && m.value.id === N.id
              }]),
              type: "button",
              "data-dock-tool": N.id,
              title: N.title,
              onPointerdown: (U) => J("tool", N, U),
              onClick: F((U) => X(N.id, U), ["stop"]),
              onContextmenu: F((U) => h(N, U), ["prevent"])
            }, [
              N.icon ? (r(), p("img", {
                key: 0,
                class: "mac-dock-icon",
                src: N.icon,
                alt: N.title
              }, null, 8, cp)) : N.emoji ? (r(), p("span", dp, u(N.emoji), 1)) : E("", !0),
              s(Pe).isRunning(N.id) ? (r(), p("span", up)) : E("", !0),
              n.value[N.id] > 0 ? (r(), p("span", pp, u(n.value[N.id] > 99 ? "99+" : n.value[N.id]), 1)) : E("", !0)
            ], 42, lp))), 128))
          ]),
          _: 1
        }),
        i("button", {
          class: le(["mac-dock-item mac-dock-market-btn", { "is-active": s(xo).state.isOpen }]),
          type: "button",
          title: s(c)("dock.market"),
          onClick: z[1] || (z[1] = F((N) => a(N), ["stop"]))
        }, [...z[3] || (z[3] = [
          i("span", {
            class: "mac-dock-market-icon",
            "aria-hidden": "true"
          }, "🧩", -1)
        ])], 10, hp)
      ]),
      (r(), ce(yt, { to: "body" }, [
        S.visible && S.item ? (r(), p("div", {
          key: 0,
          class: "mac-dock-drag-ghost",
          style: ke({
            width: S.width + "px",
            height: S.height + "px",
            transform: "translate3d(" + S.x + "px," + S.y + "px, 0)"
          }),
          "aria-hidden": "true"
        }, [
          S.item.icon ? (r(), p("img", {
            key: 0,
            class: "mac-dock-icon",
            src: S.item.icon,
            alt: ""
          }, null, 8, fp)) : S.item.emoji ? (r(), p("span", gp, u(S.item.emoji), 1)) : E("", !0)
        ], 4)) : E("", !0)
      ])),
      q(tp, {
        target: o.value,
        onClose: z[2] || (z[2] = (N) => o.value = null)
      }, null, 8, ["target"])
    ], 64));
  }
}), is = /* @__PURE__ */ Me(mp, [["__scopeId", "data-v-b7c583e6"]]), vp = {
  id: "win-toast-container",
  class: "win-toast-container",
  "aria-live": "polite",
  "aria-relevant": "additions"
}, yp = ["data-toast-fingerprint", "onMouseenter", "onMouseleave"], wp = { class: "win-toast-head" }, bp = ["src"], kp = { class: "win-toast-app" }, _p = { class: "win-toast-time" }, Cp = ["title", "aria-label", "onClick"], xp = ["onClick"], Lp = { class: "win-toast-title" }, $p = {
  key: 0,
  class: "win-toast-subtitle"
}, Tp = {
  key: 1,
  class: "win-toast-snippet"
}, Sp = {
  key: 0,
  class: "win-toast-actions"
}, Ip = ["onClick"], Mp = ["onClick"], Dp = /* @__PURE__ */ de({
  __name: "NotificationHost",
  setup(e) {
    const t = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map(), a = H({}), d = H({});
    let b = null;
    function g(f) {
      const y = t.get(f);
      y !== void 0 && clearTimeout(y), t.delete(f);
    }
    function l(f, y = f.duration) {
      g(f.id), n.set(f.id, y), o.set(f.id, Date.now()), d.value[f.id] = !1, a.value[f.id] = Math.max(0, Math.min(100, y / f.duration * 100)), vt(() => requestAnimationFrame(() => {
        a.value[f.id] = 0;
      })), t.set(f.id, window.setTimeout(() => {
        t.delete(f.id), ye.close(f.id);
      }, y));
    }
    function h(f) {
      g(f.id);
      const y = Date.now() - (o.get(f.id) || Date.now()), I = Math.max(0, (n.get(f.id) ?? f.duration) - y);
      n.set(f.id, I), d.value[f.id] = !0, a.value[f.id] = Math.max(0, Math.min(100, I / f.duration * 100));
    }
    function C(f) {
      l(f, Math.max(1500, n.get(f.id) ?? f.duration));
    }
    function D(f) {
      g(f.id), ye.close(f.id);
    }
    function m(f) {
      if ($t.markRead(f.id), D(f), !f.onClick) {
        f.target && $t.openTarget(f.target);
        return;
      }
      try {
        Promise.resolve(f.onClick()).catch((y) => console.warn("Notification action failed", y));
      } catch (y) {
        console.warn("Notification action failed", y);
      }
    }
    function S(f) {
      const y = Math.max(500, n.get(f.id) ?? f.duration);
      return {
        width: `${a.value[f.id] ?? 100}%`,
        transition: d.value[f.id] ? "none" : `width ${y}ms linear`
      };
    }
    return Ke(() => {
      b = new MutationObserver(() => {
        const y = new Set(To.map((I) => I.id));
        for (const I of To)
          !I.closing && !t.has(I.id) && !n.has(I.id) && l(I);
        for (const I of n.keys())
          y.has(I) || (g(I), n.delete(I), o.delete(I), delete a.value[I], delete d.value[I]);
      });
      const f = document.getElementById("win-toast-container");
      f && b.observe(f, { childList: !0 });
      for (const y of To) l(y);
    }), so(() => {
      b?.disconnect(), b = null;
      for (const f of t.values()) clearTimeout(f);
      t.clear();
    }), (f, y) => (r(), ce(yt, { to: "body" }, [
      i("div", vp, [
        q(Ko, { name: "win-toast" }, {
          default: to(() => [
            (r(!0), p(Y, null, ge(s(To), (I) => (r(), p("article", {
              key: I.id,
              class: le(["win-toast-card", [I.appType, { closing: I.closing }]]),
              "data-toast-fingerprint": I.fingerprint,
              onMouseenter: (v) => h(I),
              onMouseleave: (v) => C(I)
            }, [
              i("header", wp, [
                i("img", {
                  src: I.icon,
                  class: "win-toast-icon",
                  alt: ""
                }, null, 8, bp),
                i("span", kp, u(I.appName), 1),
                i("span", _p, u(s(c)("notifications.justNow")), 1),
                i("button", {
                  type: "button",
                  class: "win-toast-close",
                  title: s(c)("common.close"),
                  "aria-label": s(c)("common.close"),
                  onClick: (v) => D(I)
                }, "✕", 8, Cp)
              ]),
              i("button", {
                type: "button",
                class: "win-toast-body win-toast-body-button",
                onClick: (v) => m(I)
              }, [
                i("span", Lp, u(I.title), 1),
                I.subtitle ? (r(), p("span", $p, u(I.subtitle), 1)) : E("", !0),
                I.message ? (r(), p("span", Tp, u(I.message), 1)) : E("", !0)
              ], 8, xp),
              I.showActions && I.actionLabel ? (r(), p("footer", Sp, [
                i("button", {
                  type: "button",
                  class: "win-toast-btn primary",
                  onClick: (v) => m(I)
                }, u(I.actionLabel), 9, Ip),
                i("button", {
                  type: "button",
                  class: "win-toast-btn",
                  onClick: (v) => D(I)
                }, u(s(c)("common.close")), 9, Mp)
              ])) : E("", !0),
              i("div", {
                class: "win-toast-progress",
                style: ke(S(I))
              }, null, 4)
            ], 42, yp))), 128))
          ]),
          _: 1
        })
      ])
    ]));
  }
}), ns = /* @__PURE__ */ Me(Dp, [["__scopeId", "data-v-71b51a1a"]]), Ap = ["id"], Ep = /* @__PURE__ */ de({
  __name: "DockModuleHost",
  setup(e) {
    const t = En().filter((o) => o.presentation !== "card").map((o) => {
      Be(o.lifecycle.isVisible, (a) => {
        a && Pe.markRunning(o.id);
      }, { immediate: !0, flush: "sync" });
      const n = de({
        setup: () => () => He("section", { class: "dock-module-load-error", role: "alert" }, [
          He("div", { style: "display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;" }, [
            He("strong", { style: "font-size: 13px; color: var(--heading);" }, `${o.title} 加载受阻`),
            He("span", { style: "font-size: 11px; padding: 2px 6px; border-radius: 4px; background: var(--surface); color: var(--muted); border: 1px solid var(--border);" }, "代码可能已更新")
          ]),
          He("p", { style: "font-size: 12px; line-height: 1.5; color: var(--muted); margin: 0 0 12px 0;" }, "模块分块代码未就绪。若刚才在终端编写或重新构建了扩展，点击「刷新标签页」即可立即同步最新切片。"),
          He("div", { style: "display: flex; gap: 8px;" }, [
            He("button", {
              type: "button",
              style: "padding: 5px 12px; border-radius: 6px; border: 1px solid var(--border); background: var(--primary, #3b82f6); color: #fff; cursor: pointer; font-size: 12px; font-weight: 500;",
              onClick: () => {
                typeof window < "u" && window.location.reload();
              }
            }, "⟳ 刷新标签页"),
            He("button", {
              type: "button",
              style: "padding: 5px 10px; border-radius: 6px; border: 1px solid var(--border); background: var(--surface); color: var(--text); cursor: pointer; font-size: 12px;",
              onClick: () => {
                Pe.reloadApp(o.id);
              }
            }, "↻ 重试"),
            He("button", {
              type: "button",
              style: "padding: 5px 10px; border-radius: 6px; border: 1px solid var(--border); background: var(--surface); color: var(--text); cursor: pointer; font-size: 12px;",
              onClick: () => {
                Pe.hideApp(o.id);
              }
            }, "隐藏")
          ])
        ])
      });
      return {
        definition: o,
        mounted: oe(() => !!qe[o.id]),
        view: G({
          loader: o.loadView,
          onError(a, d, b, g) {
            g <= 2 ? d() : b();
          },
          errorComponent: n
        })
      };
    });
    return so(() => {
      for (const { definition: o } of t)
        De.close(o.id), eo.delete(o.id), qe[o.id] = !1;
    }), (o, n) => (r(!0), p(Y, null, ge(s(t), (a) => Ue((r(), p("div", {
      id: a.definition.rootId,
      key: a.definition.id
    }, [
      a.mounted.value ? (r(), ce(Tn(a.view), {
        key: s(Pe).getRenderKey(a.definition.id)
      })) : E("", !0)
    ], 8, Ap)), [
      [io, a.definition.lifecycle.isVisible()]
    ])), 128));
  }
}), Pp = /* @__PURE__ */ Me(Ep, [["__scopeId", "data-v-3f131313"]]);
function Ge(e, t) {
  const o = H(!1);
  return Be(
    e,
    (n) => {
      n && (o.value = !0);
    },
    { immediate: !0, flush: "sync" }
  ), Tt(o);
}
const Wp = ["onKeydown"], Np = { class: "fo-up-preview-head" }, Rp = ["src"], Op = { class: "fo-up-preview-meta" }, Bp = { class: "fo-up-preview-name-row" }, Fp = ["href"], Hp = ["disabled"], jp = { class: "fo-up-preview-sign" }, zp = { class: "fo-up-preview-videos" }, Gp = {
  key: 0,
  class: "fo-up-preview-loading"
}, Kp = {
  key: 1,
  class: "fo-up-preview-empty"
}, Vp = {
  key: 2,
  class: "fo-up-preview-empty"
}, Up = ["href", "title", "onClick"], Yp = ["src"], qp = {
  key: 0,
  class: "fo-bili-duration"
}, Xp = { class: "fo-up-preview-video-info" }, Jp = ["href", "title", "onClick"], Zp = { class: "fo-up-preview-video-meta" }, Qp = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2394a3b8'%3E%3Cpath d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/%3E%3C/svg%3E", eh = /* @__PURE__ */ de({
  __name: "BiliUpPreview",
  setup(e) {
    const t = H(!1);
    function o() {
      if (!pe.submitting) {
        if (!pe.followed) {
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
    function n() {
      t.value = !1, zo.close();
    }
    function a(d, b) {
      d.ctrlKey || d.metaKey || (d.preventDefault(), d.stopPropagation(), b.bvid ? (Ii.openVideo({
        bvid: b.bvid,
        title: b.title,
        cover: b.cover,
        author: pe.name,
        authorFace: pe.face,
        mid: pe.mid,
        url: b.url
      }), n()) : b.url && b.url !== "#" && window.open(b.url, "_blank"));
    }
    return (d, b) => s(pe).open ? (r(), p("div", {
      key: 0,
      class: "fo-up-preview-backdrop",
      onPointerdown: F(n, ["self"])
    }, [
      i("aside", {
        class: "fo-up-preview-popover",
        style: ke({ left: `${s(pe).left}px`, top: `${s(pe).top}px` }),
        onKeydown: Ot(F(n, ["stop", "prevent"]), ["esc"])
      }, [
        i("div", Np, [
          i("img", {
            class: "fo-up-preview-avatar",
            src: s(pe).face || Qp,
            alt: "",
            referrerpolicy: "no-referrer"
          }, null, 8, Rp),
          i("div", Op, [
            i("div", Bp, [
              i("a", {
                class: "fo-up-preview-name",
                href: `https://space.bilibili.com/${s(pe).mid}`,
                target: "_blank",
                rel: "noreferrer"
              }, u(s(pe).name), 9, Fp),
              i("button", {
                type: "button",
                class: le([
                  s(pe).followed ? "fo-up-preview-unfollow" : "fo-up-preview-follow",
                  { "is-armed": t.value }
                ]),
                disabled: s(pe).submitting,
                onClick: o
              }, u(s(pe).submitting ? "处理中…" : t.value ? "确定取消？" : s(pe).followed ? "取消关注" : "＋ 关注"), 11, Hp)
            ]),
            i("p", jp, u(s(pe).sign || "暂无个人简介"), 1)
          ]),
          i("button", {
            type: "button",
            class: "fo-up-preview-close",
            "aria-label": "关闭预览",
            onClick: n
          }, "✕")
        ]),
        b[1] || (b[1] = i("div", { class: "fo-up-preview-title-tag" }, "近期投稿视频（最新 2~3 个）", -1)),
        i("div", zp, [
          s(pe).loading ? (r(), p("div", Gp, [...b[0] || (b[0] = [
            i("i", null, null, -1),
            i("span", null, "正在读取近期投稿…", -1)
          ])])) : s(pe).error ? (r(), p("p", Kp, u(s(pe).error), 1)) : s(pe).videos.length ? (r(!0), p(Y, { key: 3 }, ge(s(pe).videos, (g) => (r(), p("article", {
            key: g.bvid,
            class: "fo-up-preview-video"
          }, [
            i("a", {
              class: "fo-up-preview-thumb",
              href: g.url,
              title: `就地播放「${g.title}」（Ctrl+点击在网页打开）`,
              onClick: (l) => a(l, g)
            }, [
              i("img", {
                src: g.cover,
                alt: "",
                loading: "lazy",
                referrerpolicy: "no-referrer"
              }, null, 8, Yp),
              g.duration ? (r(), p("span", qp, u(g.duration), 1)) : E("", !0)
            ], 8, Up),
            i("div", Xp, [
              i("a", {
                class: "fo-up-preview-video-title",
                href: g.url,
                title: `就地播放「${g.title}」（Ctrl+点击在网页打开）`,
                onClick: (l) => a(l, g)
              }, u(g.title), 9, Jp),
              i("div", Zp, [
                i("span", null, "▣ " + u(g.playCount), 1),
                i("span", null, u(g.published), 1)
              ])
            ])
          ]))), 128)) : (r(), p("p", Vp, "该 UP 主近期暂无视频动态"))
        ])
      ], 44, Wp)
    ], 32)) : E("", !0);
  }
}), th = /* @__PURE__ */ Me(eh, [["__scopeId", "data-v-3fedd7f1"]]), oh = { class: "logicweaver-overlays-layer" }, ih = { id: "vue-notification-root" }, nh = {
  id: "bili-profile-menu",
  class: "bili-profile-menu",
  hidden: ""
}, sh = { id: "vue-bili-message-panel-root" }, ah = { id: "vue-notification-center-root" }, rh = { id: "vue-tab-manager-root" }, lh = { id: "vue-bookmark-menu-root" }, ch = { id: "vue-bookmark-panel-root" }, dh = { id: "vue-launcher-dialogs-root" }, uh = { id: "vue-launcher-folder-root" }, ph = { id: "vue-launcher-menus-root" }, hh = { id: "vue-settings-dialog-root" }, fh = { id: "vue-clock-settings-root" }, gh = { id: "vue-bili-theater-root" }, mh = { id: "vue-bili-mini-player-root" }, vh = { id: "vue-ai-dialog-root" }, yh = { id: "vue-aihot-viewer-root" }, wh = { id: "vue-nav-wheel-root" }, bh = { id: "vue-github-detail-root" }, kh = { id: "vue-bili-subtitle-modal-root" }, _h = { id: "vue-bili-video-task-modal-root" }, Ch = { id: "vue-github-task-modal-root" }, xh = { id: "vue-firecrawl-modal-root" }, Lh = { id: "vue-floating-image-viewer-root" }, $h = { id: "vue-command-palette-root" }, Th = /* @__PURE__ */ de({
  __name: "AppOverlays",
  setup(e) {
    const t = Ge(() => xo.state.isOpen), o = Ge(() => Mn.isOpen), n = Ge(() => jo.isOpen), a = Ge(() => Nt.state.isOpen), d = Ge(() => ma.open), b = Ge(() => _o.state.isOpen), g = Ge(() => Fs.isOpen), l = Ge(() => fa.isOpen), h = Ge(() => Ki.state.isOpen), C = Ge(() => Us.isOpen), D = Ge(() => Re.isOpen), m = Ge(() => Wi.isOpen);
    let S;
    Ke(() => {
      S = ol();
    }), St(() => {
      S?.();
    });
    const f = Ge(() => Bi.state.isOpen), y = Ge(() => pt.isOpen), I = Ge(() => co.editDialog.isOpen || co.linkMove.isOpen || co.folderMove.isOpen || co.groupMerge.isOpen || co.folderDelete.isOpen), v = G(() => import("./ProfileMenu-CPnlI2Ka.js")), x = G(() => import("./BookmarkNoteMenu-Ci2EezlR.js")), L = G(() => import("./BookmarkPanel-iItx9snI.js")), W = G(() => import("./ClockSettingsMenu-C9QCAiRP.js")), O = G(() => import("./NotificationCenter-CAdRVuzG.js")), J = G(() => import("./TabManagerPanel-BKrAnXl1.js")), M = G(() => import("./LauncherDialogs-D6ChJYQ1.js")), k = G(() => import("./LauncherFolderDialog-BDt9DRql.js")), $ = G(() => import("./LauncherMenus-qKIpXxmw.js")), X = G(() => import("./SettingsDialog-DJp-3nbc.js")), P = G(() => import("./BiliMiniPlayer-BIECBWYP.js")), z = G(() => import("./BiliTheaterDialog-C16Cw0Qp.js")), N = G(() => import("./BiliMessagePanel-CxKoPQLh.js")), U = G(() => import("./AiDialog-Bm8CWDjo.js")), he = G(() => import("./AihotViewer-BrBST1hX.js")), _e = G(() => import("./NavWheelOverlay-DmyXSghq.js")), Ze = G(() => import("./GitHubRepoDetailDrawer-D45NyFK6.js")), B = G(() => import("./InPageSideDrawer-RYnxVjnH.js")), R = G(() => import("./BiliSubtitleModal-Ddht0UJI.js")), j = G(() => import("./BiliVideoTaskModal-BehczfyX.js")), fe = G(() => import("./GitHubTaskModal-BGr6r5ad.js")), Ce = G(() => import("./FirecrawlModal-BUG83Z0C.js")), Ie = G(() => import("./FloatingImageViewer-BOegCiUh.js")), me = G(() => import("./CommandPalette-pVBwJ9yp.js")), We = G(() => import("./AppPromptModal-jdiL1bnB.js")), at = G(async () => {
      const [Ae, $o] = await Promise.all([
        import("./PluginMarketDialog-BA6nCiyi.js"),
        import("./plugin-market-B6zN10fA.js")
      ]);
      return Bs("logicweaver-market-styles", $o.default), Ae.default;
    });
    return (Ae, $o) => (r(), p("div", oh, [
      i("div", ih, [
        q(ns)
      ]),
      i("div", nh, [
        q(s(v))
      ]),
      i("div", sh, [
        s(l) ? (r(), ce(s(N), { key: 0 })) : E("", !0)
      ]),
      i("div", ah, [
        s(o) ? (r(), ce(s(O), { key: 0 })) : E("", !0)
      ]),
      i("div", rh, [
        s(n) ? (r(), ce(s(J), { key: 0 })) : E("", !0)
      ]),
      i("div", lh, [
        s(f) ? (r(), ce(s(x), { key: 0 })) : E("", !0)
      ]),
      i("div", ch, [
        q(s(L))
      ]),
      i("div", dh, [
        s(I) ? (r(), ce(s(M), { key: 0 })) : E("", !0)
      ]),
      i("div", uh, [
        s(y) ? (r(), ce(s(k), { key: 0 })) : E("", !0)
      ]),
      i("div", ph, [
        q(s($))
      ]),
      i("div", hh, [
        q(s(X))
      ]),
      i("div", fh, [
        s(a) ? (r(), ce(s(W), { key: 0 })) : E("", !0)
      ]),
      i("div", gh, [
        s(b) ? (r(), ce(s(z), { key: 0 })) : E("", !0)
      ]),
      i("div", mh, [
        s(g) ? (r(), ce(s(P), { key: 0 })) : E("", !0)
      ]),
      i("div", vh, [
        s(h) ? (r(), ce(s(U), { key: 0 })) : E("", !0)
      ]),
      i("div", yh, [
        s(d) ? (r(), ce(s(he), { key: 0 })) : E("", !0)
      ]),
      i("div", wh, [
        q(s(_e))
      ]),
      q(Pp),
      i("div", bh, [
        s(C) ? (r(), ce(s(Ze), { key: 0 })) : E("", !0)
      ]),
      i("div", kh, [
        q(s(R))
      ]),
      i("div", _h, [
        q(s(j))
      ]),
      i("div", Ch, [
        q(s(fe))
      ]),
      i("div", xh, [
        q(s(Ce))
      ]),
      i("div", Lh, [
        q(s(Ie))
      ]),
      i("div", $h, [
        s(D) ? (r(), ce(s(me), { key: 0 })) : E("", !0)
      ]),
      s(m) ? (r(), ce(s(B), { key: 0 })) : E("", !0),
      q(th),
      q(s(We)),
      s(t) ? (r(), ce(s(at), { key: 1 })) : E("", !0)
    ]));
  }
});
let xi = !1;
function Sh(e = 1800) {
  if (xi || typeof window > "u") return;
  const t = () => {
    if (xi) return;
    xi = !0;
    const o = En();
    for (const n of o)
      if (typeof n.loadView == "function")
        try {
          n.loadView().catch(() => {
          });
        } catch {
        }
  };
  "requestIdleCallback" in window ? setTimeout(() => {
    window.requestIdleCallback(t, { timeout: 4e3 });
  }, e) : setTimeout(t, e);
}
const Ih = ["data-active-workspace"], Mh = /* @__PURE__ */ de({
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
    let a = "";
    function d(l, h = "image/svg+xml") {
      if (typeof document > "u") return;
      const C = typeof chrome < "u" && chrome.runtime?.getURL ? chrome.runtime.getURL(l) : l;
      if (a === C) return;
      a = C;
      const D = document.querySelectorAll("link[rel*='icon']");
      if (D.length > 0)
        D.forEach((m) => {
          m.type = h, m.href = C;
        });
      else {
        const m = document.createElement("link");
        m.rel = "icon", m.type = h, m.href = C, document.head.appendChild(m);
      }
    }
    function b() {
      if (typeof document > "u") return;
      const l = n[So.value] || n.home;
      if (d(l.icon, l.iconType), Z.playing && Z.title) {
        const h = Z.artist ? ` - ${Z.artist}` : "";
        document.title = `▶ ${Z.title}${h}`;
        return;
      }
      if (uo.playing && uo.title) {
        document.title = `▶ ${uo.title} · 电台`;
        return;
      }
      document.title = l.title;
    }
    Be(
      [
        () => So.value,
        () => Z.playing,
        () => Z.title,
        () => Z.artist,
        () => uo.playing,
        () => uo.title
      ],
      () => {
        b();
      },
      { immediate: !0 }
    );
    const g = oe(() => So.value === "home" ? "" : So.value);
    return Be(() => xt.activeId, (l) => {
      document.body.classList.toggle("has-card-fullscreen", !!l);
    }, { immediate: !0, flush: "sync" }), Ke(() => {
      typeof document < "u" && (document.body.dataset.spa = "1");
      try {
        Pi.bindGlobalListener(), je.start(), kn.start(), Si.init().catch((l) => console.warn("[Launcher] 初始化失败", l)), Sh(), typeof chrome < "u" && chrome?.runtime?.sendMessage && setTimeout(() => {
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
    }), St(() => {
      je.stop(), Si.stop(), kn.stop(), document.body.classList.remove("has-card-fullscreen"), typeof document < "u" && o && (document.title = o);
    }), t({
      activeWorkspaceId: g,
      windowManagerController: De
    }), (l, h) => (r(), p("div", {
      id: "logicweaver-spa-root",
      class: "logicweaver-spa-root",
      "data-active-workspace": g.value || ""
    }, [
      q(ir),
      q(hl),
      q(Ru),
      q(Ku),
      i("nav", {
        id: "mac-dock",
        class: le(["mac-dock", "dock-" + s(Ut).position]),
        "aria-label": "快捷应用栏"
      }, [
        q(is)
      ], 2),
      q(Th)
    ], 8, Ih));
  }
}), Dh = /* @__PURE__ */ Me(Mh, [["__scopeId", "data-v-5d2f948f"]]), Ah = {
  class: "endfield-stage",
  "aria-hidden": "true"
}, Eh = {
  class: "rhinelab-stage",
  "aria-hidden": "true"
}, Ph = { class: "rhine-scaler" }, Wh = { class: "rhine-center-group" }, Nh = { class: "rhine-auth-status" }, Rh = { class: "rhine-auth-text" }, Oh = ["hidden"], Bh = { class: "rhine-cinema-caption" }, Fh = /* @__PURE__ */ de({
  __name: "IntroAnimation",
  setup(e) {
    const t = H(window.innerHeight), o = H(window.innerWidth), n = H(!1), a = H(!1), d = H(10), b = H(1), g = H(0), l = /* @__PURE__ */ new Set();
    let h = 0, C = () => {
    };
    const D = oe(() => `${String(Math.round(tt.renderedProgress)).padStart(2, "0")}%`), m = oe(() => {
      const M = tt.renderedProgress / 100 * t.value + 10;
      return `${Math.min(M, Math.max(0, t.value - 102)).toFixed(1)}px`;
    }), S = oe(() => tt.renderedProgress >= 75 ? "START PROCESSING..." : tt.renderedProgress >= 35 ? "REQUEST RECEIVED" : "ID CONFIRMED : JOYCE MOORE"), f = oe(() => tt.finished ? "身份验证通过 · 欢迎进入终端" : tt.status ? `身份信息确认 · ${tt.status.replace(/^.*?\/\s*/, "")}` : "身份信息确认：JOYCE MOORE"), y = oe(() => String(Math.max(0.35, Math.min(o.value / 1920, t.value / 1080))));
    function I(M, k) {
      const $ = window.setTimeout(() => {
        l.delete($), M();
      }, k);
      l.add($);
    }
    function v() {
      window.dispatchEvent(new CustomEvent("logicweaver:intro-complete"));
    }
    function x(M) {
      if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
        v();
        return;
      }
      const k = M ? 180 : 260, $ = M ? 200 : 280, X = performance.now(), P = (z) => {
        const N = z - X, U = Math.min(1, N / k), he = 1 - Math.pow(1 - U, 3);
        if (d.value = 10 + he * Math.max(0, o.value - 10), N > k && (b.value = Math.max(0, 1 - (N - k) / $)), N >= k + $) {
          v();
          return;
        }
        h = requestAnimationFrame(P);
      };
      I(() => {
        h = requestAnimationFrame(P);
      }, M ? 60 : 120);
    }
    function L(M) {
      M || (n.value = !0), I(() => {
        a.value = !0, g.value = 6, b.value = 0, I(v, 380);
      }, M ? 40 : 420);
    }
    function W(M) {
      tt.style === "rhinelab" ? L(M) : x(M);
    }
    function O() {
      o.value = window.innerWidth, t.value = window.innerHeight;
    }
    function J(M) {
      tt.finished || (M.key === "Enter" || M.key === " " || M.key === "Escape") && (M.preventDefault(), dt.skip("KEYBOARD SKIP"));
    }
    return Ke(() => {
      document.documentElement.dataset.startupStyle = tt.style, document.documentElement.style.setProperty("--rhine-scale", y.value), window.addEventListener("resize", O, { passive: !0 }), window.addEventListener("keydown", J, !0), C = Ia(W), Hn();
    }), so(() => {
      C(), window.removeEventListener("resize", O), window.removeEventListener("keydown", J, !0), cancelAnimationFrame(h);
      for (const M of l) clearTimeout(M);
      l.clear();
    }), (M, k) => (r(), p("div", {
      class: "intro-vue-content",
      style: ke({ "--rhine-scale": y.value, opacity: b.value, filter: `blur(${g.value}px)` })
    }, [
      i("div", Ah, [
        k[2] || (k[2] = i("div", { class: "endfield-loader-texture" }, null, -1)),
        k[3] || (k[3] = i("div", { class: "endfield-loader-rail" }, null, -1)),
        i("div", {
          class: "endfield-loader-fill",
          style: ke({ height: `${s(tt).renderedProgress}%` })
        }, null, 4),
        i("div", {
          class: "endfield-loader-meter",
          style: ke({ top: m.value })
        }, [
          k[1] || (k[1] = i("span", { class: "endfield-loader-tick" }, null, -1)),
          i("b", null, u(D.value), 1),
          i("small", null, u(s(tt).status), 1)
        ], 4),
        k[4] || (k[4] = vo('<section class="endfield-loader-brand"><span class="endfield-loader-kicker">DEEPSEEK HARNESS</span><strong>END</strong><strong>FIELD</strong><span class="endfield-loader-detail"><i class="endfield-loader-chevron"></i><span>EDGE INTELLIGENCE THEME</span><small>TERRA RESEARCH COMMISSION / BOOT SEQUENCE</small><span class="endfield-loader-squares"><i class="on"></i><i class="on"></i><i class="on"></i><i></i><i></i><i></i><i class="on"></i><i class="on"></i><i></i><i></i><i></i><i></i></span></span><em>OVER THE FRONTIER / INTO THE FRONT</em></section>', 1)),
        i("div", {
          class: "endfield-loader-wipe",
          style: ke({ width: `${d.value}px`, opacity: d.value > 10 ? 1 : 0 })
        }, null, 4)
      ]),
      i("div", Eh, [
        k[12] || (k[12] = vo('<div class="rhine-background"><svg viewBox="0 0 1920 1080" preserveAspectRatio="none"><g fill="none" stroke="#ffffff" stroke-width="2.5"><path class="rhine-drift-path1" d="M-210 705C-45 705 182 704 247 567C337 377 99 306 4 435S27 680 169 631C309 584 227 314 279 111S568-113 568-113"></path><path class="rhine-drift-path2" d="M1560-80C1374 114 1671 168 1601 323S1371 367 1431 480S1692 666 1559 787S1329 886 1498 1130"></path><circle class="rhine-drift-circle" cx="1450" cy="648" r="346"></circle><circle class="rhine-drift-circle2" cx="1450" cy="648" r="348"></circle></g></svg></div>', 1)),
        i("div", Ph, [
          k[10] || (k[10] = vo('<header class="rhine-brand"><h1>RHINE LAB</h1><div class="rhine-brand-sub">SYNTHESIZE INFORMATION</div><p class="rhine-brand-os"><span class="rhine-brand-analysis"><span style="left:2px;">A</span><span style="left:28px;">N</span><span style="left:55px;">A</span><span style="left:81px;">L</span><span style="left:103px;">Y</span><span style="left:129px;">S</span><span style="left:154px;">I</span><span style="left:166px;">S</span></span><b>OS</b></p></header>', 1)),
          i("button", {
            class: "rhine-skip",
            type: "button",
            title: "点击进入系统 (或按 Enter)",
            onClick: k[0] || (k[0] = ($) => s(dt).skip("ENTER SYSTEM"))
          }, [...k[5] || (k[5] = [
            Ye("ENTER SYSTEM ", -1),
            i("span", null, "↗", -1)
          ])]),
          i("div", Wh, [
            k[8] || (k[8] = i("div", { class: "rhine-logo-box" }, [
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
            i("div", Nh, [
              k[6] || (k[6] = i("span", { class: "rhine-auth-dot" }, "·", -1)),
              i("span", Rh, u(S.value), 1),
              k[7] || (k[7] = i("i", {
                class: "rhine-cursor",
                "aria-hidden": "true"
              }, null, -1))
            ])
          ]),
          i("div", {
            class: le(["rhine-scan", { active: n.value }]),
            hidden: !n.value
          }, [...k[9] || (k[9] = [
            vo('<svg viewBox="0 0 1920 1080" aria-hidden="true"><g fill="none" stroke="#080a08" stroke-linecap="round"><circle class="rhine-scan-circle ring-outer" cx="960" cy="540" r="280" stroke-width="2.5"></circle><circle class="rhine-scan-circle ring-white" cx="960" cy="540" r="260" stroke="#fff" stroke-width="3.5"></circle><circle class="rhine-scan-circle ring-inner" cx="960" cy="540" r="220" stroke-width="2"></circle><circle class="rhine-orbit-dot dot-1" cx="960" cy="260" r="8" fill="#ed821b" stroke="none"></circle><circle class="rhine-orbit-dot dot-2" cx="960" cy="820" r="8" fill="#ed821b" stroke="none"></circle><circle class="rhine-scan-core" cx="960" cy="540" r="6" fill="#080a08" stroke="none"></circle></g></svg><span class="rhine-scan-label">PERMISSION AUTHORIZED</span>', 2)
          ])], 10, Oh),
          i("div", Bh, u(f.value), 1),
          k[11] || (k[11] = i("div", { class: "rhine-powered" }, [
            Ye("POWERED BY "),
            i("b", null, "RHINE LAB"),
            i("i")
          ], -1))
        ]),
        i("div", {
          class: le(["rhine-white", { flash: a.value }]),
          "aria-hidden": "true"
        }, null, 2)
      ])
    ], 4));
  }
}), Hh = /* @__PURE__ */ de({
  __name: "ProfileMenu",
  setup(e) {
    function t(o) {
      Lo.trigger(o);
    }
    return (o, n) => (r(), p(Y, null, [
      i("button", {
        type: "button",
        "data-action": "messages",
        onClick: n[0] || (n[0] = F((a) => t("messages"), ["stop"]))
      }, u(s(c)("profile.menu.notifications")), 1),
      i("button", {
        type: "button",
        "data-action": "tabs",
        onClick: n[1] || (n[1] = F((a) => t("tabs"), ["stop"]))
      }, u(s(c)("profile.menu.tabs")), 1),
      i("button", {
        type: "button",
        "data-action": "refresh",
        onClick: n[2] || (n[2] = F((a) => t("refresh"), ["stop"]))
      }, u(s(c)("profile.menu.refreshBili")), 1),
      i("button", {
        type: "button",
        "data-action": "switch",
        onClick: n[3] || (n[3] = F((a) => t("switch"), ["stop"]))
      }, u(s(c)("profile.menu.switchUser")), 1),
      i("button", {
        type: "button",
        "data-action": "web",
        onClick: n[4] || (n[4] = F((a) => t("web"), ["stop"]))
      }, u(s(c)("profile.menu.biliCenter")), 1)
    ], 64));
  }
}), jh = /* @__PURE__ */ de({
  __name: "WorkspaceLaunchers",
  setup(e) {
    function t(o) {
      Gi.openWorkspace(o, !0);
    }
    return (o, n) => (r(), p(Y, null, [
      i("button", {
        id: "ai-top-open",
        type: "button",
        onClick: n[0] || (n[0] = (a) => t("ai"))
      }, "AI 助手"),
      i("button", {
        id: "todoist-top-open",
        type: "button",
        onClick: n[1] || (n[1] = (a) => t("todoist"))
      }, "Todoist"),
      i("button", {
        id: "stickers-top-open",
        type: "button",
        onClick: n[2] || (n[2] = (a) => t("stickers"))
      }, "表情包"),
      i("button", {
        id: "calcom-top-open",
        type: "button",
        onClick: n[3] || (n[3] = (a) => t("calcom"))
      }, "预约"),
      i("button", {
        id: "wallpaper-top-open",
        type: "button",
        onClick: n[4] || (n[4] = (a) => t("wallpaper"))
      }, "壁纸库"),
      $n(o.$slots, "default")
    ], 64));
  }
}), zh = {
  key: 0,
  "aria-label": "AI 分析任务"
}, Gh = { role: "status" }, Kh = ["disabled"], Vh = ["disabled"], Uh = /* @__PURE__ */ de({
  __name: "GitHubStatus",
  setup(e) {
    return (t, o) => s(et).message || s(et).busy ? (r(), p("section", zh, [
      i("p", Gh, u(s(et).repo ? `原任务仓库：${s(et).repo}。 ` : "") + u(s(et).message), 1),
      s(et).busy ? (r(), p("button", {
        key: 0,
        type: "button",
        onClick: o[0] || (o[0] = (n) => s(Je).stopAiAnalysis())
      }, "停止后续分析 / 中断等待")) : E("", !0),
      s(et).uncertain ? (r(), p(Y, { key: 1 }, [
        o[5] || (o[5] = i("p", null, "AI 结果未确认，已阻止本页再次提交。请到供应商核对请求和计费；本页记录在整页关闭或重载后会丢失。", -1)),
        s(et).unlockConfirmation ? (r(), p(Y, { key: 1 }, [
          o[4] || (o[4] = i("p", null, "扩展不能验证供应商任务；确认只解除本页限制，不代表成功，也不会重发请求。", -1)),
          i("button", {
            type: "button",
            disabled: s(et).busy,
            onClick: o[2] || (o[2] = (n) => s(Je).acknowledgeAiChecked())
          }, "确认解除本页限制", 8, Vh),
          i("button", {
            type: "button",
            onClick: o[3] || (o[3] = (n) => s(et).unlockConfirmation = !1)
          }, "保持限制")
        ], 64)) : (r(), p("button", {
          key: 0,
          type: "button",
          disabled: s(et).busy,
          onClick: o[1] || (o[1] = (n) => s(et).unlockConfirmation = !0)
        }, "我已核对供应商记录", 8, Kh))
      ], 64)) : E("", !0)
    ])) : E("", !0);
  }
}), Yh = {
  key: 0,
  role: "status",
  style: { "font-size": "12px", color: "var(--danger,#ef4444)", padding: "4px 8px", margin: "0 0 6px 0", "border-radius": "6px", background: "var(--surface)" }
}, qh = {
  key: 0,
  class: "gh-sidebar-divider"
}, Xh = {
  key: 1,
  class: "gh-sidebar-caption"
}, Jh = ["data-folder", "onClick", "onDragover", "onDragleave", "onDrop"], Zh = {
  class: "gh-folder-icon-wrap",
  style: { "font-size": "13px", display: "grid", "place-items": "center" }
}, Qh = { key: 0 }, ef = { key: 1 }, tf = {
  key: 2,
  class: "fo-folder-icon",
  style: { color: "currentColor" }
}, of = ["title"], nf = { class: "gh-folder-count" }, sf = ["data-del", "onClick", "onKeydown"], af = /* @__PURE__ */ de({
  __name: "GitHubFolders",
  props: {
    active: { type: Boolean, default: !0 }
  },
  setup(e) {
    const t = e, o = H(""), n = () => {
      o.value = "";
    };
    function a(h) {
      return t.active && !Ct.busy && yo.folders.some((C) => C.title === h && (C.kind === "custom" || C.kind === "uncategorized"));
    }
    Be(() => t.active, (h) => {
      n(), window.removeEventListener("dragend", n), window.removeEventListener("drop", n), h && (window.addEventListener("dragend", n), window.addEventListener("drop", n));
    }, { immediate: !0 }), so(() => {
      window.removeEventListener("dragend", n), window.removeEventListener("drop", n);
    });
    function d(h, C) {
      h.stopPropagation(), Et.delete(C);
    }
    function b(h, C) {
      if (!a(C) || !Array.from(h.dataTransfer?.types || []).includes(Ys)) {
        n();
        return;
      }
      h.preventDefault(), h.dataTransfer && (h.dataTransfer.dropEffect = "move"), o.value = C;
    }
    function g(h, C) {
      const D = h.currentTarget;
      D instanceof Node && h.relatedTarget instanceof Node && D.contains(h.relatedTarget) || o.value === C && (o.value = "");
    }
    function l(h, C) {
      if (n(), !a(C)) return;
      const D = qs(h.dataTransfer);
      D && (h.preventDefault(), h.stopPropagation(), Et.dropRepository(D, C));
    }
    return (h, C) => (r(), p(Y, null, [
      s(Ct).message ? (r(), p("p", Yh, u(s(Ct).message), 1)) : E("", !0),
      (r(!0), p(Y, null, ge(s(yo).folders, (D, m) => (r(), p(Y, {
        key: D.title
      }, [
        D.kind === "custom" && s(yo).folders[m - 1]?.kind !== "custom" ? (r(), p("div", qh)) : E("", !0),
        D.kind === "custom" && s(yo).folders[m - 1]?.kind !== "custom" ? (r(), p("div", Xh, "GitHub 列表 (Lists)")) : E("", !0),
        i("button", {
          type: "button",
          class: le(["gh-bili-folder", { on: D.active, "drag-into": o.value === D.title }]),
          "data-folder": D.title,
          onClick: (S) => s(Et).select(D.title),
          onDragover: (S) => b(S, D.title),
          onDragleave: (S) => g(S, D.title),
          onDrop: (S) => l(S, D.title)
        }, [
          i("span", Zh, [
            D.kind === "all" ? (r(), p("span", Qh, "⭐")) : D.kind === "uncategorized" ? (r(), p("span", ef, "📄")) : (r(), p("i", tf))
          ]),
          i("span", {
            class: "gh-folder-name",
            title: D.title
          }, u(D.title), 9, of),
          i("small", nf, u(D.count), 1),
          D.kind === "custom" ? (r(), p("span", {
            key: 0,
            class: "gh-folder-delete",
            title: "删除 GitHub 列表",
            "data-del": D.title,
            role: "button",
            tabindex: "0",
            onClick: (S) => d(S, D.title),
            onKeydown: [
              Ot(F((S) => s(Et).delete(D.title), ["prevent", "stop"]), ["enter"]),
              Ot(F((S) => s(Et).delete(D.title), ["prevent", "stop"]), ["space"])
            ]
          }, "✕", 40, sf)) : E("", !0)
        ], 42, Jh)
      ], 64))), 128))
    ], 64));
  }
}), rf = {
  id: "gh-hero-cover",
  class: "gh-bili-cover"
}, lf = { key: 0 }, cf = { key: 1 }, df = {
  key: 2,
  class: "fo-folder-icon"
}, uf = { class: "gh-bili-heading" }, pf = { class: "gh-hero-title-row" }, hf = ["title"], ff = ["role", "aria-live"], gf = ["title"], mf = ["title", "aria-label"], vf = { id: "gh-hero-desc" }, yf = { class: "gh-bili-actions" }, wf = ["title"], bf = { class: "gh-batch-btn-text" }, kf = ["title"], _f = ["title"], Cf = /* @__PURE__ */ de({
  __name: "GitHubHero",
  emits: ["open-ai-settings"],
  setup(e, { emit: t }) {
    return (o, n) => (r(), p(Y, null, [
      i("div", rf, [
        s(It).kind === "all" ? (r(), p("span", lf, "⭐")) : s(It).kind === "uncategorized" ? (r(), p("span", cf, "📄")) : (r(), p("i", df))
      ]),
      i("div", uf, [
        i("div", pf, [
          i("h3", {
            id: "gh-hero-title",
            title: s(It).title
          }, u(s(It).title), 9, hf),
          s(At).actionText ? (r(), p("div", {
            key: 0,
            class: le(["gh-hero-inline-status", { "is-error": s(At).actionError }]),
            role: s(At).actionError ? "alert" : "status",
            "aria-live": s(At).actionError ? "assertive" : "polite",
            "aria-atomic": "true"
          }, [
            i("span", {
              class: "gh-hero-status-text",
              title: s(At).actionText
            }, u(s(At).actionText), 9, gf),
            i("button", {
              type: "button",
              title: s(c)("github.hero.closeTip"),
              "aria-label": s(c)("github.hero.closeTip"),
              onClick: n[0] || (n[0] = (a) => s(Fi).update({ actionText: "", actionError: !1 }))
            }, "×", 8, mf)
          ], 10, ff)) : E("", !0)
        ]),
        i("p", vf, u(s(It).description), 1)
      ]),
      i("div", yf, [
        i("button", {
          id: "gh-batch-toggle-btn",
          type: "button",
          class: le(["gh-hero-btn gh-batch-toggle-btn", { active: s(It).batchMode }]),
          title: s(c)("github.hero.batchToggle"),
          onClick: n[1] || (n[1] = (a) => s(bo).toggleBatch())
        }, [
          n[4] || (n[4] = i("span", { class: "gh-batch-btn-icon" }, "☑", -1)),
          i("span", bf, u(s(It).batchMode ? s(c)("github.hero.batchBack") : s(c)("github.hero.batch")), 1)
        ], 10, wf),
        i("button", {
          id: "gh-refresh-btn",
          type: "button",
          class: "gh-hero-btn",
          title: s(c)("github.hero.refreshTitle"),
          onClick: n[2] || (n[2] = (a) => s(bo).refresh())
        }, u(s(c)("github.hero.refresh")), 9, kf),
        i("button", {
          id: "gh-hero-add-folder-btn",
          type: "button",
          class: "gh-hero-btn primary",
          title: s(c)("github.hero.addFolderTitle"),
          onClick: n[3] || (n[3] = (a) => s(bo).createFolder())
        }, u(s(c)("github.hero.addFolder")), 9, _f)
      ])
    ], 64));
  }
}), xf = /* @__PURE__ */ Me(Cf, [["__scopeId", "data-v-1c3e37db"]]), ie = be({ repo: "", text: "", baseline: "", busy: !1, message: "", storedValue: null });
function _n(e, t = !1) {
  if (!e || ie.busy) return;
  if (ie.repo && ie.text !== ie.baseline) {
    ie.message = "请先保存或明确取消当前草稿，再编辑或清除其它备注。";
    return;
  }
  const o = Je.remarks[e]?.userRemark, n = typeof o == "string" ? o : "";
  Object.assign(ie, {
    repo: e,
    baseline: n,
    text: t ? "" : n,
    storedValue: null,
    message: t ? "清除已准备；点击保存才会清除手写备注，AI 简介不变。" : "仅点击保存或 Enter 才写入；草稿只保留在本页内存。"
  });
}
function Li() {
  ie.busy || Object.assign(ie, { repo: "", text: "", baseline: "", storedValue: null, message: "" });
}
async function $i() {
  if (ie.busy || !ie.repo) return;
  const { repo: e, text: t, baseline: o } = ie;
  ie.busy = !0;
  try {
    await Je.updateRepoRemark(e, { userRemark: t.trim() }, o), Object.assign(ie, { repo: "", text: "", baseline: "", storedValue: null, message: `${e} 的备注已保存并回读核对。` });
  } catch (n) {
    ie.message = n instanceof Error ? n.message : "保存未确认，草稿保留，请先读取已保存值核对。";
  } finally {
    ie.busy = !1;
  }
}
async function Cn() {
  if (ie.busy || !ie.repo) return;
  const e = ie.repo;
  ie.busy = !0;
  try {
    const o = (await Je.reloadRepoRemarks())[e]?.userRemark;
    if (o !== void 0 && typeof o != "string") throw new Error("保存值格式异常，未变更草稿或覆盖基准。");
    ie.storedValue = o ?? "", ie.baseline = o ?? "", ie.message = "已读取保存值，草稿没有替换。请对比下方保存值；再次点击保存将以草稿替换它。";
  } catch (t) {
    ie.message = t instanceof Error ? t.message : "读取失败，草稿保留。";
  } finally {
    ie.busy = !1;
  }
}
const Lf = ["disabled"], $f = ["disabled"], Tf = ["disabled"], Sf = ["disabled"], If = {
  key: 0,
  style: { width: "100%", "white-space": "pre-wrap", "overflow-wrap": "anywhere" }
}, xn = /* @__PURE__ */ de({
  __name: "GitHubRemarkEditor",
  props: {
    active: { type: Boolean }
  },
  setup(e) {
    const t = e, o = H(null);
    return Ke(() => {
      vt(() => {
        t.active && !ie.busy && o.value?.focus();
      });
    }), (n, a) => (r(), p("div", {
      class: "gh-inline-remark-box",
      style: { "flex-wrap": "wrap", "max-width": "100%" },
      onClick: a[6] || (a[6] = F(() => {
      }, ["stop"]))
    }, [
      Ue(i("input", {
        ref_key: "input",
        ref: o,
        "onUpdate:modelValue": a[0] || (a[0] = (d) => s(ie).text = d),
        class: "gh-inline-remark-input",
        type: "text",
        maxlength: "100",
        "aria-label": "手写仓库备注",
        placeholder: "备注说明…",
        disabled: s(ie).busy || !e.active,
        onKeydown: [
          a[1] || (a[1] = Ot(F((d) => !d.isComposing && e.active && s($i)(), ["prevent"]), ["enter"])),
          a[2] || (a[2] = Ot(F((d) => !d.isComposing && e.active && s(Li)(), ["prevent", "stop"]), ["esc"]))
        ]
      }, null, 40, Lf), [
        [oo, s(ie).text]
      ]),
      i("button", {
        type: "button",
        class: "gh-inline-remark-btn save",
        title: "保存备注",
        disabled: s(ie).busy || !e.active,
        onClick: a[3] || (a[3] = //@ts-ignore
        (...d) => s($i) && s($i)(...d))
      }, "✓", 8, $f),
      i("button", {
        type: "button",
        class: "gh-inline-remark-btn cancel",
        title: "取消草稿",
        disabled: s(ie).busy || !e.active,
        onClick: a[4] || (a[4] = //@ts-ignore
        (...d) => s(Li) && s(Li)(...d))
      }, "✕", 8, Tf),
      i("button", {
        type: "button",
        disabled: s(ie).busy || !e.active,
        onClick: a[5] || (a[5] = //@ts-ignore
        (...d) => s(Cn) && s(Cn)(...d))
      }, "读取已保存值", 8, Sf),
      s(ie).storedValue !== null ? (r(), p("p", If, "已保存值：" + u(s(ie).storedValue || "（空）"), 1)) : E("", !0)
    ]));
  }
}), Ti = be({
  isOpen: !1,
  repository: null
}), Mf = {
  open(e) {
    Ti.repository = e, Ti.isOpen = !0;
  },
  close() {
    Ti.isOpen = !1;
  }
}, Df = {
  key: 0,
  role: "status"
}, Af = {
  key: 1,
  "aria-label": "未显示仓库的备注草稿"
}, Ef = {
  key: 2,
  class: "gh-search-options",
  style: { margin: "0 0 10px" }
}, Pf = { style: { "font-size": "12px", color: "var(--dim)" } }, Wf = {
  key: 3,
  class: "gh-repos-loading"
}, Nf = {
  key: 4,
  class: "muted small",
  style: { "text-align": "center", padding: "40px 0", "font-size": "13px" }
}, Rf = ["data-repo-name", "onClick", "onContextmenu", "onDragstart"], Of = ["onClick"], Bf = { class: "gh-card-head" }, Ff = ["checked", "onChange"], Hf = ["src"], jf = ["href", "title"], zf = { class: "owner" }, Gf = { class: "gh-card-body" }, Kf = { class: "gh-card-badges" }, Vf = ["title", "onClick"], Uf = ["onClick"], Yf = ["title", "onClick"], qf = { class: "gh-badge-remark-text" }, Xf = {
  key: 0,
  class: "desc gh-desc-analyzing",
  title: "正在使用 AI 分析仓库…"
}, Jf = {
  key: 1,
  class: "desc gh-desc-ai",
  title: "AI 中文简介（点击可直接修改，右键可重新分析）"
}, Zf = ["title"], Qf = {
  key: 3,
  class: "desc dim"
}, eg = { class: "meta" }, tg = { class: "gh-stars" }, og = {
  key: 0,
  class: "gh-lang"
}, ig = {
  key: 1,
  class: "gh-updated"
}, ng = {
  key: 6,
  class: "gh-pager"
}, sg = ["disabled"], ag = { class: "gh-page-info" }, rg = ["disabled"], lg = ["onClick"], cg = /* @__PURE__ */ de({
  __name: "GitHubRepositories",
  props: {
    active: { type: Boolean, default: !0 }
  },
  setup(e) {
    const t = e, o = oe(() => !!ie.repo && !Le.cards.some((M) => M.fullName === ie.repo)), n = be({
      visible: !1,
      x: 0,
      y: 0,
      fullName: "",
      folders: [],
      hasRemark: !1,
      url: ""
    }), a = H(null), d = H(!1);
    function b(M, k) {
      const $ = M.target;
      if ($ instanceof Element) {
        if (Le.batchMode) {
          if ($.closest(".fo-card-more,.gh-badge-folder,.gh-badge-remark,.gh-inline-remark-box")) return;
          M.preventDefault(), M.stopPropagation(), _t.toggleSelection(k.fullName);
          return;
        }
        $.closest("a,button,.gh-badge-folder,.gh-badge-remark,.fo-card-more,.gh-card-hole,.gh-card-checkbox,.gh-inline-remark-box") || (M.preventDefault(), M.stopPropagation(), Xs.open(k.fullName, void 0, k));
      }
    }
    function g(M, k) {
      if (!t.active) return;
      M.preventDefault(), M.stopPropagation();
      const $ = 12, X = 160, P = 280, z = Math.min(window.innerWidth - X - $, Math.max($, M.clientX)), N = Math.min(window.innerHeight - P - $, Math.max($, M.clientY));
      n.x = z, n.y = N, n.fullName = k.fullName, n.folders = [...k.folders || (k.folder ? [k.folder] : [])], n.hasRemark = !!k.customRemark, n.url = k.url, n.visible = !0, a.value = null, d.value = z > window.innerWidth - 380;
    }
    function l(M, k) {
      g(k, M), a.value = "folder";
    }
    function h() {
      n.visible = !1, a.value = null;
    }
    function C(M) {
      n.folders.includes(M) ? n.folders = n.folders.filter((k) => k !== M) : n.folders.push(M), Je.toggleRepoList(n.fullName, M);
    }
    function D() {
      n.folders = [], Je.clearRepoLists(n.fullName), h();
    }
    function m(M) {
      if (!t.active) return;
      const k = typeof M == "string" ? M : M?.fullName || n.fullName;
      h(), _n(k);
    }
    function S() {
      if (!t.active) return;
      const M = n.fullName;
      h(), _n(M, !0);
    }
    async function f() {
      const M = n.url;
      if (h(), M && t.active)
        try {
          await navigator.clipboard.writeText(M);
        } catch {
        }
    }
    function y(M) {
      const k = Je.findRepository(n.fullName);
      h(), k && Hs.sendGitHubShare({
        fullName: k.full_name,
        name: k.name,
        owner: k.owner?.login,
        ownerAvatar: k.owner?.avatar_url,
        desc: k.description || void 0,
        language: k.language || void 0,
        stars: k.stargazers_count,
        category: n.folders && n.folders.length ? n.folders.join(", ") : "未分类",
        url: k.html_url || `https://github.com/${k.full_name}`,
        updatedAt: k.updated_at ? k.updated_at.split("T")[0] : void 0
      }, M);
    }
    function I() {
      const M = Je.findRepository(n.fullName);
      h(), M && Mf.open({
        fullName: M.full_name,
        description: M.description || "",
        stars: M.stargazers_count,
        language: M.language || void 0,
        updated: M.updated_at
      });
    }
    function v() {
      n.url && window.open(n.url, "_blank", "noreferrer"), h();
    }
    async function x() {
      const M = Je.findRepository(n.fullName);
      if (!M) {
        h();
        return;
      }
      h(), await Je.confirmUnstarRepository(M);
    }
    function L(M) {
      const k = M.target;
      k?.closest(".gh-repo-context-menu") || k?.closest(".gh-inline-remark-box") || h();
    }
    function W(M) {
      M.key === "Escape" && n.visible && h();
    }
    Be(() => t.active, (M) => {
      window.removeEventListener("pointerdown", L), window.removeEventListener("keydown", W), h(), M && (window.addEventListener("pointerdown", L), window.addEventListener("keydown", W));
    }, { immediate: !0 }), St(() => {
      window.removeEventListener("pointerdown", L), window.removeEventListener("keydown", W);
    });
    function O(M, k) {
      const $ = M.target;
      if ($ instanceof Element && $.closest("button,a,input,textarea,select,[contenteditable='true']")) {
        M.preventDefault();
        return;
      }
      _t.startDrag(k, M);
    }
    const J = oe(() => {
      if (Le.cards.length > 0) return !1;
      const M = At.actionText || "";
      return !!(M.includes("正在读取") || M.includes("正在加载") || M.includes("正在统计") || M.includes("正在同步"));
    });
    return (M, k) => (r(), p(Y, null, [
      s(ie).message ? (r(), p("p", Df, u(s(ie).repo ? `${s(ie).repo}：` : "") + u(s(ie).message), 1)) : E("", !0),
      o.value ? (r(), p("section", Af, [
        i("p", null, "备注草稿：" + u(s(ie).repo) + "（仓库不在当前列表中，草稿仍保留）", 1),
        q(xn, {
          active: t.active
        }, null, 8, ["active"])
      ])) : E("", !0),
      s(Le).searchMessage ? (r(), p("div", Ef, [
        i("span", Pf, u(s(Le).searchMessage), 1),
        i("button", {
          type: "button",
          class: "gh-tab",
          style: { padding: "2px 8px", "font-size": "11px", "margin-left": "8px" },
          onClick: k[0] || (k[0] = ($) => s(_t).resetSearch())
        }, "清空搜索")
      ])) : E("", !0),
      J.value ? (r(), p("div", Wf, [...k[17] || (k[17] = [
        i("div", {
          class: "gh-spinner",
          "aria-hidden": "true"
        }, null, -1),
        i("span", { class: "gh-loading-label" }, "正在读取 GitHub 仓库列表中…", -1)
      ])])) : s(Le).emptyMessage ? (r(), p("p", Nf, u(s(Le).emptyMessage), 1)) : E("", !0),
      s(Le).cards.length ? (r(), p("div", {
        key: 5,
        class: le(["repos gh-grid", { "gh-batch-active": s(Le).batchMode }])
      }, [
        (r(!0), p(Y, null, ge(s(Le).cards, ($) => (r(), p("article", {
          key: $.fullName,
          class: le(["repo gh-card", { selected: $.selected }]),
          "data-repo-name": $.fullName,
          draggable: "true",
          onClick: (X) => b(X, $),
          onContextmenu: (X) => g(X, $),
          onDragstart: (X) => O(X, $.fullName)
        }, [
          i("button", {
            class: "fo-card-more",
            type: "button",
            "aria-label": "更多操作",
            title: "更多操作",
            onClick: F((X) => g(X, $), ["stop"])
          }, "⋮", 8, Of),
          i("div", Bf, [
            i("label", {
              class: "gh-card-hole",
              title: "点击勾选此仓库",
              onClick: k[1] || (k[1] = F(() => {
              }, ["stop"]))
            }, [
              i("input", {
                class: "gh-card-checkbox",
                type: "checkbox",
                checked: $.selected,
                onChange: (X) => s(_t).setSelection($.fullName, X.target.checked)
              }, null, 40, Ff),
              k[18] || (k[18] = i("span", { class: "gh-hole-inner" }, null, -1))
            ]),
            i("img", {
              class: "gh-owner-avatar",
              src: $.avatarUrl || "assets/github-star.svg",
              alt: "",
              loading: "lazy",
              referrerpolicy: "no-referrer",
              onError: k[2] || (k[2] = (X) => X.target.src = "assets/github-star.svg")
            }, null, 40, Hf),
            i("a", {
              href: $.url,
              target: "_blank",
              rel: "noreferrer",
              class: "name",
              title: $.fullName
            }, [
              i("span", zf, u($.owner) + "/", 1),
              Ye(u($.name), 1)
            ], 8, jf)
          ]),
          i("div", Gf, [
            i("div", Kf, [
              $.folders && $.folders.length ? (r(!0), p(Y, { key: 0 }, ge($.folders, (X) => (r(), p("span", {
                key: X,
                class: "gh-badge-folder",
                title: `GitHub 列表：${X}（点击管理所属列表）`,
                onClick: F((P) => l($, P), ["stop"])
              }, " 📁 " + u(X), 9, Vf))), 128)) : (r(), p("span", {
                key: 1,
                class: "gh-badge-folder uncat",
                title: "未分类（点击加入 GitHub 列表）",
                onClick: F((X) => l($, X), ["stop"])
              }, " ＋ 未分类 ", 8, Uf)),
              s(ie).repo === $.fullName ? (r(), ce(xn, {
                key: 2,
                active: t.active
              }, null, 8, ["active"])) : $.customRemark ? (r(), p("span", {
                key: 3,
                class: "gh-badge-remark",
                title: `备注：${$.customRemark}（点击就地修改）`,
                onClick: F((X) => m($), ["stop"])
              }, [
                k[19] || (k[19] = i("span", { class: "gh-badge-remark-icon" }, "💬", -1)),
                i("span", qf, u($.customRemark), 1)
              ], 8, Yf)) : E("", !0)
            ]),
            $.descriptionKind === "analyzing" ? (r(), p("p", Xf, [...k[20] || (k[20] = [
              i("span", { class: "gh-ai-sparkle" }, "✨", -1),
              Ye(" 正在使用 AI 分析仓库并提炼中文介绍…", -1)
            ])])) : $.descriptionKind === "ai" ? (r(), p("p", Jf, [
              k[21] || (k[21] = i("span", { class: "gh-ai-tag-flag" }, "🤖", -1)),
              Ye(u($.description), 1)
            ])) : $.descriptionKind === "plain" ? (r(), p("p", {
              key: 2,
              class: "desc",
              title: $.description
            }, u($.description), 9, Zf)) : (r(), p("p", Qf, "暂无描述"))
          ]),
          i("div", eg, [
            i("span", tg, "★ " + u($.stars), 1),
            $.language ? (r(), p("span", og, u($.language), 1)) : E("", !0),
            $.updated ? (r(), p("span", ig, "更新 " + u($.updated), 1)) : E("", !0)
          ])
        ], 42, Rf))), 128))
      ], 2)) : E("", !0),
      s(Le).totalPages > 1 ? (r(), p("div", ng, [
        i("button", {
          class: "gh-page-btn",
          type: "button",
          disabled: s(Le).page <= 1,
          onClick: k[3] || (k[3] = ($) => s(_t).changePage(s(Le).page - 1))
        }, "‹ 上一页", 8, sg),
        i("span", ag, u(s(Le).page) + " / " + u(s(Le).totalPages) + " · 共 " + u(s(Le).totalItems) + " 个" + u(s(Le).serverPaged ? ` · 已加载 ${s(Le).loadedItems}` : ""), 1),
        i("button", {
          class: "gh-page-btn",
          type: "button",
          disabled: s(Le).page >= s(Le).totalPages,
          onClick: k[4] || (k[4] = ($) => s(_t).changePage(s(Le).page + 1))
        }, "下一页 ›", 8, rg)
      ])) : E("", !0),
      (r(), ce(yt, { to: "body" }, [
        t.active && n.visible ? (r(), p("div", {
          key: 0,
          class: "fo-cover-context-menu gh-repo-context-menu",
          style: ke({ left: `${n.x}px`, top: `${n.y}px` }),
          onClick: k[15] || (k[15] = F(() => {
          }, ["stop"])),
          onContextmenu: k[16] || (k[16] = F(() => {
          }, ["prevent"]))
        }, [
          i("div", {
            class: le(["gh-menu-has-sub", { "is-active": a.value === "folder" }]),
            onMouseenter: k[6] || (k[6] = ($) => a.value = "folder")
          }, [
            k[22] || (k[22] = i("button", {
              class: "fo-cover-menu-item with-sub-arrow",
              type: "button"
            }, [
              i("span", null, "📁 所属 GitHub 列表"),
              i("span", { class: "sub-arrow" }, "›")
            ], -1)),
            i("div", {
              class: le(["gh-sub-flyout", { "flyout-left": d.value }]),
              onClick: k[5] || (k[5] = F(() => {
              }, ["stop"]))
            }, [
              i("button", {
                class: le(["fo-cover-menu-item", { primary: n.folders.length === 0 }]),
                type: "button",
                onClick: D
              }, u(n.folders.length === 0 ? "✓ " : "  ") + "＋ 设为未分类（清空列表） ", 3),
              (r(!0), p(Y, null, ge(s(Je).cats, ($) => (r(), p("button", {
                key: $,
                class: le(["fo-cover-menu-item", { primary: n.folders.includes($) }]),
                type: "button",
                onClick: (X) => C($)
              }, u(n.folders.includes($) ? "✓ " : "  ") + "📁 " + u($), 11, lg))), 128))
            ], 2)
          ], 34),
          i("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: k[7] || (k[7] = ($) => a.value = null),
            onClick: k[8] || (k[8] = ($) => m())
          }, " ✏️ 编辑备注… ", 32),
          i("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: k[9] || (k[9] = ($) => a.value = null),
            onClick: I
          }, " 📋 创建任务 ", 32),
          q(ba, {
            label: "💬 发送到聊天室",
            visible: n.visible,
            onOpen: k[10] || (k[10] = ($) => a.value = null),
            onSelect: y
          }, null, 8, ["visible"]),
          n.hasRemark ? (r(), p("button", {
            key: 0,
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: k[11] || (k[11] = ($) => a.value = null),
            onClick: S
          }, " 🗑️ 清除备注 ", 32)) : E("", !0),
          i("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: k[12] || (k[12] = ($) => a.value = null),
            onClick: f
          }, " 📋 复制仓库链接 ", 32),
          i("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: k[13] || (k[13] = ($) => a.value = null),
            onClick: v
          }, " ↗ 在 GitHub 打开 ", 32),
          i("button", {
            class: "fo-cover-menu-item danger",
            type: "button",
            onMouseenter: k[14] || (k[14] = ($) => a.value = null),
            onClick: x
          }, " ⭐ 取消 Star ", 32)
        ], 36)) : E("", !0)
      ]))
    ], 64));
  }
}), dg = /* @__PURE__ */ Me(cg, [["__scopeId", "data-v-ad31674f"]]), ug = { class: "gh-batch-bar-left" }, pg = { class: "gh-batch-count-tip" }, hg = { id: "gh-batch-selected-count" }, fg = {
  key: 0,
  "aria-label": "批量归属列表确认"
}, gg = ["disabled"], mg = ["disabled"], vg = { class: "gh-batch-bar-right" }, yg = ["disabled"], wg = ["disabled"], bg = ["disabled"], kg = /* @__PURE__ */ de({
  __name: "GitHubBatchBar",
  props: {
    active: { type: Boolean, default: !0 }
  },
  setup(e) {
    const t = e, o = Es(), n = H(null), a = oe(() => {
      const g = [
        { value: "", label: "未分类（清空所选仓库的所有列表所属）", icon: "🌐" }
      ];
      return yo.folders.filter((l) => l.kind === "custom").forEach((l) => {
        g.push({ value: l.title, label: l.title, icon: "📁" });
      }), g;
    });
    function d() {
      t.active && (o.value = Je.prepareBatchMove(), n.value = null);
    }
    async function b() {
      const g = o.value, l = n.value;
      if (!t.active || !g || l === null || Ct.busy) return;
      await g.submit(l) && o.value === g && (o.value = void 0);
    }
    return Be(() => t.active && Ht.active, (g) => {
      g || (o.value = void 0);
    }), (g, l) => (r(), p(Y, null, [
      i("div", ug, [
        i("button", {
          type: "button",
          class: "gh-batch-action-btn",
          id: "gh-batch-select-all-btn",
          onClick: l[0] || (l[0] = (h) => s(ko).toggleSelectAll())
        }, u(s(Ht).allSelected ? "取消全选" : "全选"), 1),
        i("span", pg, [
          l[5] || (l[5] = Ye("已选择 ", -1)),
          i("b", hg, u(s(Ht).selectedCount), 1),
          l[6] || (l[6] = Ye(" 项", -1))
        ])
      ]),
      o.value ? (r(), p("section", fg, [
        i("p", null, "仅操作打开选择器时的 " + u(o.value.names.length) + " 个仓库；后来勾选的仓库不加入。", 1),
        i("details", null, [
          l[7] || (l[7] = i("summary", null, "查看本次仓库清单", -1)),
          i("ul", null, [
            (r(!0), p(Y, null, ge(o.value.names, (h) => (r(), p("li", { key: h }, u(h), 1))), 128))
          ])
        ]),
        q(Sn, {
          "model-value": n.value ?? "",
          options: a.value,
          disabled: s(Ct).busy,
          placeholder: "请选择目标列表",
          size: "sm",
          style: { "max-width": "260px" },
          "onUpdate:modelValue": l[1] || (l[1] = (h) => n.value = String(h))
        }, null, 8, ["model-value", "options", "disabled"]),
        i("button", {
          type: "button",
          disabled: !t.active || s(Ct).busy || n.value === null,
          onClick: b
        }, "确认加入列表", 8, gg),
        i("button", {
          type: "button",
          disabled: s(Ct).busy,
          onClick: l[2] || (l[2] = (h) => o.value = void 0)
        }, "取消", 8, mg)
      ])) : E("", !0),
      i("div", vg, [
        i("button", {
          type: "button",
          class: "gh-batch-action-btn",
          id: "gh-batch-move-btn",
          disabled: !t.active || s(Ct).busy || s(Ht).selectedCount === 0,
          title: "固定当前选择，批量加入所选 GitHub 列表",
          onClick: d
        }, " 📁 归入 GitHub 列表 ", 8, yg),
        i("button", {
          type: "button",
          class: "gh-batch-action-btn",
          id: "gh-batch-ai-btn",
          disabled: s(Ht).selectedCount === 0,
          title: "批量使用 AI 生成中文介绍",
          onClick: l[3] || (l[3] = (h) => s(ko).analyzeAi())
        }, " ✨ 批量 AI 分析 ", 8, wg),
        i("button", {
          type: "button",
          class: "gh-batch-action-btn danger",
          id: "gh-batch-unstar-btn",
          disabled: s(Ht).selectedCount === 0,
          title: "从 GitHub 批量取消 Star 收藏",
          onClick: l[4] || (l[4] = (h) => s(ko).unstar())
        }, " 🗑 取消收藏 ", 8, bg)
      ])
    ], 64));
  }
}), _g = G(() => import("./GitHubWorkspaceCard-Dsx9Xrmf.js")), Cg = G(() => import("./NotificationCenter-CAdRVuzG.js")), xg = G(() => import("./TabManagerPanel-BKrAnXl1.js")), Lg = G(() => import("./BookmarkNoteMenu-Ci2EezlR.js")), $g = G(() => import("./BookmarkPanel-iItx9snI.js")), Tg = G(() => import("./LauncherDialogs-D6ChJYQ1.js")), Sg = G(() => import("./SettingsDialog-DJp-3nbc.js")), Ig = G(() => import("./SettingsView-BiUDZbze.js")), Mg = G(() => import("./ClockSettingsMenu-C9QCAiRP.js")), Dg = G(() => import("./BiliTheaterDialog-C16Cw0Qp.js")), Ag = G(() => import("./BiliMiniPlayer-BIECBWYP.js")), Eg = G(() => import("./BiliMessagePanel-CxKoPQLh.js")), Pg = G(() => import("./ModelPricingCard-CtKgknTb.js")), Wg = G(() => import("./BilibiliWorkspace-CYctKRSS.js")), Ng = G(() => import("./YouTubeCard-CvLKMUgm.js").then((e) => e.Y)), Rg = G(() => import("./AihotFeed-CaS-qMhq.js")), Og = G(() => import("./GitHubTrending-BgEK0eZq.js")), Bg = G(() => import("./AiDialog-Bm8CWDjo.js")), Fg = G(() => import("./AihotViewer-BrBST1hX.js")), Hg = G(() => import("./NavWheelOverlay-DmyXSghq.js")), jg = G(() => import("./StandaloneHost-BVo0xzOs.js")), zg = G(() => import("./LauncherFolderDialog-BDt9DRql.js")), Gg = G(() => import("./LauncherMenus-qKIpXxmw.js"));
function se(e, t, o, n) {
  t.spaOwned && document.getElementById("vue-spa-root") || t.id !== "github-workspace" && t.id.startsWith("github-") && document.getElementById("vue-github-workspace-root") || e.register({
    id: t.id,
    title: t.title,
    order: t.order,
    eager: !0,
    roots: [t.root],
    capabilities: t.capabilities,
    mount: ({ getRoot: a }) => {
      const d = a(t.root);
      if (!d) return;
      if (document.getElementById("vue-spa-root") && t.id !== "spa-app")
        return n?.setMounted?.(!0), () => {
          n?.setMounted?.(!1);
        };
      const b = d.innerHTML, g = Ri(o);
      g.config.errorHandler = (l, h, C) => {
        console.error(`LogicWeaver Vue feature failed: ${t.id} (${C})`, l), d.dataset.vueError = "1";
      };
      try {
        g.mount(d), n?.setMounted?.(!0);
      } catch (l) {
        throw n?.setMounted?.(!1), d.innerHTML = b, l;
      }
      return () => {
        n?.setMounted?.(!1), g.unmount();
      };
    }
  });
}
function Kg(e) {
  e.register({
    id: "intro",
    title: "启动动画",
    order: 10,
    eager: !0,
    roots: ["endfield-loader"],
    capabilities: ["ui:intro", "boot:progress"],
    mount: () => {
      const t = document.getElementById("endfield-loader");
      if (!dt.enabled) {
        t?.remove(), document.body.classList.remove("is-starting");
        return;
      }
      if (!t) return;
      const o = Ri(Fh);
      let n = !1;
      const a = () => {
        e.stop("intro");
      };
      window.addEventListener("logicweaver:intro-complete", a, { once: !0 }), o.mount(t);
      const d = window.setTimeout(() => {
        dt.finish("基础界面已就绪，在线服务继续后台加载", !0), window.setTimeout(() => {
          n || (a(), t?.remove(), document.body.classList.remove("is-starting"));
        }, 600);
      }, 8e3);
      return () => {
        n || (n = !0, clearTimeout(d), window.removeEventListener("logicweaver:intro-complete", a), o.unmount(), t.remove(), document.body.classList.remove("is-starting"));
      };
    }
  }), se(e, { id: "spa-app", title: "纯血 SPA 单根调度器", order: 15, root: "vue-spa-root", capabilities: ["ui:spa-root", "workspace:keepalive"] }, Dh), document.getElementById("vue-spa-root") || se(e, { id: "bili-companions", title: "b站伴随窗口", order: 19, root: "vue-bili-companions-root", capabilities: ["ui:dock-companion"] }, jg), se(e, { id: "notifications", title: "通知中心", order: 20, root: "vue-notification-root", capabilities: ["ui:toast", "notification:dedupe"] }, ns), se(e, { id: "profile-menu", title: "头像右键菜单", order: 21, root: "bili-profile-menu", capabilities: ["ui:profile-menu", "profile:actions"] }, Hh, Lo), se(e, { id: "workspace-launchers", title: "常用工作区启动项", order: 22, root: "workspace-launchers", capabilities: ["ui:workspace-launchers", "workspace:launch"] }, jh, Gi), se(e, { id: "mac-dock", title: "底部快捷应用 Dock 栏", order: 23, root: "mac-dock", capabilities: ["ui:mac-dock", "dock:navigate"] }, is, ft), se(e, { id: "hero-clock", title: "首屏中央时钟", order: 26, root: "hero-clock", capabilities: ["ui:hero-clock", "clock:read"] }, es), se(e, { id: "search-box", title: "首屏搜索框", order: 27, root: "search", capabilities: ["ui:search-box", "search:actions"] }, Ln), se(e, { id: "home-music", title: "首屏音乐播放器", order: 28, root: "task-thread-home", capabilities: ["ui:home-music", "music:playback"] }, ts, Ve), se(e, { id: "launcher-groups", title: "常用网站分组架", order: 29, root: "launcher-groups", capabilities: ["ui:launcher-groups", "launcher:navigate"] }, os, Oe), se(e, { id: "weather-widget", title: "首屏天气小部件", order: 39, root: "weather-body", capabilities: ["ui:weather-widget", "weather:read"] }, Qn), se(e, { id: "github-workspace", title: "GitHub 独立页 Vue 工作台", order: 49, root: "vue-github-workspace-root", capabilities: ["ui:github-workspace"] }, _g), se(e, { id: "github-status", title: "GitHub 同步状态", order: 50, root: "vue-github-status-root", capabilities: ["ui:github-status", "github:sync-read"] }, Uh, Fi), se(e, { id: "github-folders", title: "GitHub 文件夹导航", order: 55, root: "gh-folder-list", capabilities: ["ui:github-folders", "github:categorize-drop"] }, af, Et), se(e, { id: "github-hero", title: "GitHub 分类摘要", order: 56, root: "gh-hero", capabilities: ["ui:github-summary", "github:actions"] }, xf, bo), se(e, { id: "github-repositories", title: "GitHub 仓库列表", order: 57, root: "vue-github-repositories-root", capabilities: ["ui:github-repositories", "github:repository-actions", "github:paging"] }, dg, _t), se(e, { id: "github-batch-bar", title: "GitHub Star 批量操作工具栏", order: 58, root: "gh-batch-bar", capabilities: ["ui:github-batch-bar", "github:batch-actions"] }, kg, ko), se(e, { id: "notification-center", spaOwned: !0, title: "持久通知中心", order: 71, root: "vue-notification-center-root", capabilities: ["ui:notification-history", "notification:read"] }, Cg, $t), se(e, { id: "tab-manager", spaOwned: !0, title: "独立标签页管理", order: 71, root: "vue-tab-manager-root", capabilities: ["ui:tab-manager", "tabs:explicit"] }, xg, Kn), se(e, { id: "bookmark-menu", title: "书签上下文操作与备注菜单", order: 72, root: "vue-bookmark-menu-root", capabilities: ["ui:bookmark-menu", "bookmark:edit"] }, Lg, Bi), se(e, { id: "launcher-dialogs", title: "快捷启动器管理弹窗族", order: 73, root: "vue-launcher-dialogs-root", capabilities: ["ui:launcher-dialogs", "launcher:manage"] }, Tg, Dn), se(e, { id: "launcher-folder-dialog", title: "大文件夹展开视窗", order: 74, root: "vue-launcher-folder-root", capabilities: ["ui:launcher-folder", "launcher:folder-dialog"] }, zg, An), se(e, { id: "launcher-menus", title: "启动器快捷上下文菜单族", order: 76, root: "vue-launcher-menus-root", capabilities: ["ui:launcher-menus", "launcher:context-menu"] }, Gg, Hi), se(e, { id: "bookmark-panel", title: "浏览器书签侧边滑动视窗", order: 77, root: "vue-bookmark-panel-root", capabilities: ["ui:bookmark-panel", "bookmarks:panel"] }, $g, Zo), se(e, { id: "bookmark-folder-strip", spaOwned: !0, title: "顶栏书签快捷文件夹横条", order: 78, root: "vue-bookmark-folder-strip-root", capabilities: ["ui:bookmark-folder-strip", "bookmarks:strip"] }, null, Uo), se(e, { id: "settings-page", title: "独立设置页 Vue 工作台", order: 79, root: "vue-options-root", capabilities: ["ui:settings-page"] }, Ig), se(e, { id: "settings-dialog", title: "全局设置中心视窗", order: 80, root: "vue-settings-dialog-root", capabilities: ["ui:settings-dialog", "settings:manage"] }, Sg, Qo), se(e, { id: "clock-settings-menu", spaOwned: !0, title: "中央时钟偏好配置菜单", order: 82, root: "vue-clock-settings-root", capabilities: ["ui:clock-settings", "clock:preference-edit"] }, Mg, Nt), se(e, { id: "bili-theater-dialog", title: "Bilibili 沉浸剧场与评论区弹窗", order: 85, root: "vue-bili-theater-root", capabilities: ["ui:bili-theater", "bili:playback"] }, Dg, _o), se(e, { id: "bili-mini-player", title: "Bilibili 悬浮迷你播放器", order: 85, root: "vue-bili-mini-player-root", capabilities: ["ui:bili-mini-player", "bili:playback"] }, Ag), se(e, { id: "ai-dialog", title: "AI 助手对话框与知识点抽屉", order: 86, root: "vue-ai-dialog-root", capabilities: ["ui:ai-dialog", "ai:chat"] }, Bg, Ki), se(e, { id: "aihot-viewer", spaOwned: !0, title: "AI HOT 资讯文章阅读器", order: 88, root: "vue-aihot-viewer-root", capabilities: ["ui:aihot-viewer", "viewer:aihot"] }, Fg, zi), se(e, { id: "nav-wheel", title: "辐射状快捷动作轮盘与悬浮球", order: 95, root: "vue-nav-wheel-root", capabilities: ["ui:nav-wheel", "nav:radial-menu"] }, Hg, Se), se(e, { id: "bili-message-panel", spaOwned: !0, title: "Bilibili 消息与互动通知中心", order: 102, root: "vue-bili-message-panel-root", capabilities: ["ui:bili-message-panel", "bili:messages"] }, Eg, Pt), se(e, { id: "pricing-radar", spaOwned: !0, title: "模型插件 (AI 定价与排行榜)", order: 108, root: "vue-pricing-root", capabilities: ["ui:pricing-radar", "pricing:read"] }, Pg, Nn), se(e, { id: "bili-favorites", spaOwned: !0, title: "b站插件 Vue 外壳", order: 110, root: "vue-bili-favorites-root", capabilities: ["ui:bili-favorites-shell", "bilibili:favorites"] }, Wg, Pn), se(e, { id: "youtube-card", spaOwned: !0, title: "YouTube 订阅与探索工作台", order: 111, root: "vue-youtube-root", capabilities: ["ui:youtube-card", "youtube:updates"] }, Ng, Rn), se(e, { id: "aihot-feed", spaOwned: !0, title: "AI HOT 资讯流全功能聚合看板", order: 112, root: "vue-aihot-root", capabilities: ["ui:aihot-feed", "aihot:aggregate"] }, Rg, Wn), se(e, { id: "github-trending", spaOwned: !0, title: "GitHub 趋势榜与热门流", order: 114, root: "vue-github-trending-root", capabilities: ["ui:github-trending", "github:trending"] }, Og, Vn);
}
Is();
const oi = xa(ei);
Qa(ei, oi);
er(ei);
Kg(oi);
Oi.loadBookmarks();
(async () => {
  document.getElementById("vue-bili-favorites-root") && !document.getElementById("vue-spa-root") && await import("./bilibili-channel.service-lODt1gB9.js"), await Sa(), await oi.startEager(), dt.notifyBootReady();
})().catch((e) => console.error("[LogicWeaver] 页面启动失败", e));
window.addEventListener("pagehide", () => {
  oi.stopAll();
}, { once: !0 });
export {
  Jn as A,
  ei as B,
  sn as C,
  Pp as D,
  dg as G,
  yn as L,
  Pd as T,
  af as _,
  kg as a,
  Vn as b,
  xf as c,
  Uh as d,
  Kn as e,
  Nt as f,
  Mf as g,
  an as h,
  hm as i,
  xe as j,
  Ki as k,
  je as l,
  Se as m,
  Q as n,
  Jo as o,
  Fh as p,
  Nd as q,
  Rd as r,
  Wd as s,
  jo as t,
  jh as u,
  Hh as v,
  Zn as w,
  Wi as x,
  Ti as y,
  Re as z
};
