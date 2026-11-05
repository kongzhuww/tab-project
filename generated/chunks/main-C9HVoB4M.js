import { l as Bi, S as En, i as Rs } from "./SearchBox-s4e6zkc4.js";
/* empty css                */
import { c as Xi, r as $e, a as Wt, w as Ne, b as z, d as fe, o as c, e as he, f as Tt, u as s, g as p, h as i, i as E, T as Ns, t as u, F as ee, j as be, k as V, l as wt, m as Po, n as et, v as Os, p as tt, q as ho, s as X, x as Bs, y as te, z as Rt, A as fo, B as Te, C as de, D as Ye, E as U, G as St, H as So, I as Pn, J as Wo, K as Ve, L as mo, M as Wn, N as Fs } from "./vendor-vue-D8gPZiit.js";
import { W as ii, t as oo, p as gi, n as Le, a as No, b as Pt, h as Ze, m as xt, c as rn, d as Fi, s as mi, e as ln, f as Hs, g as js, i as Ks, j as zs, C as Rn, k as oe, l as Nn, o as bo, q as On, r as vt, u as Gs, v as vo, w as io, x as Oo, y as Vs, z as Us, A as Bo, B as Ys } from "./view-styles-B9A93e0a.js";
import { l as Xs, r as qs, G as Js, a as Ae, b as ci, c as qi, s as Zs, d as Qs, e as Ji, f as ni, g as Zi, h as no, i as Io, j as At, k as Mo, m as so, n as Be, o as cn, p as ea, q as at, t as Qe, u as ht, v as Je, w as Bn, R as ta, x as oa, y as Hi, z as Ft, A as Kt, B as Me, C as qt } from "./search.service-BrT3O7pL.js";
import { l as Ke, a as Fn, b as Hn, c as Qi, d as pe, f as _t, e as ko } from "./store-CA5cW_cr.js";
import { c as ia, a as na, t as sa, b as aa, d as ra, e as la, f as ao, g as ca } from "./calendar.service-BdldCM6E.js";
import { w as Oe, s as en, P as da, i as si, D as vi, a as dn, g as nt, p as ua, L as pa, b as Ht, c as ha, d as yi, t as un, e as fa, f as ga, h as Ro, l as jn } from "./window-manager.store-B8yz4j-E.js";
import { s as di, a as ma, b as va } from "./stickers.service-DDI7EXIX.js";
import { b as Do, a as ya, c as wa } from "./up-group-manager-store-CTLD7wnA.js";
import { biliMessagePanelController as zt, biliMessagePanelState as ba } from "./message-panel-store-o6RkccRN.js";
import { b as Kn, r as ka, a as _o } from "./bili-favorites-store-iNW1Mz2J.js";
import { a as tn, b as zn, c as _a } from "./aihot-feed-store-BhbhXdBq.js";
import { p as Gn } from "./pricing-store-NB8GBNHF.js";
import { y as Vn } from "./youtube-store-CnZHK3Uu.js";
import { R as Ca, u as Un } from "./InlineEditStatus.vue_vue_type_style_index_0_scoped_28642927_lang-HdrLv0sz.js";
import { t as d, c as gt, _ as Pe } from "./_plugin-vue_export-helper-qhyPkMid.js";
import { f as Gt } from "./fullscreen-cards.store-DDtaCW6m.js";
import { k as xa, m as La } from "./core-utils-DYgSCp9X.js";
import { t as ft } from "./together-listen.store-BgjJBaJ6.js";
import { A as $a } from "./AppWindowFrame-CHe-eBXv.js";
/* empty css                                                                             */
import { C as Sa } from "./ChatShareMenu-BHBL6gC0.js";
const Ta = /^[a-z][a-z0-9]*(?:[.:-][a-z0-9]+)*$/;
function Ia() {
  const e = /* @__PURE__ */ new Map(), t = /* @__PURE__ */ new Map();
  function o(l) {
    if (!l || !Ta.test(l.id)) throw new TypeError(`Invalid command id: ${l?.id || ""}`);
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
  async function a(l, h, S = "api") {
    const O = e.get(l);
    if (!O) throw new Error(`Unknown command: ${l}`);
    if (O.enabled && !O.enabled()) return;
    const v = O.concurrency || "replace";
    if (t.has(l)) {
      if (v === "drop") return;
      v === "replace" && n(l);
    }
    const I = new AbortController();
    v !== "parallel" && t.set(l, I);
    try {
      return await O.run(h, { signal: I.signal, source: S });
    } finally {
      t.get(l) === I && t.delete(l);
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
    const S = String(l || "").trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
    if (!S.length) return g().slice(0, h);
    const O = [...e.values()].map((v) => {
      const I = r(v), m = I.title.toLocaleLowerCase(), w = `${I.id} ${m} ${I.category} ${I.description} ${I.keywords.join(" ")}`.toLocaleLowerCase();
      if (!S.every((y) => w.includes(y))) return null;
      let M = 0;
      for (const y of S)
        I.id === y ? M += 200 : I.id.startsWith(y) && (M += 120), m === y ? M += 160 : m.startsWith(y) ? M += 100 : m.includes(y) && (M += 60), I.keywords.some((_) => _.toLocaleLowerCase().startsWith(y)) && (M += 40);
      return { item: I, score: M };
    }).filter((v) => !!v);
    return O.sort((v, I) => I.score - v.score || v.item.title.localeCompare(I.item.title, "zh")), Object.freeze(O.slice(0, Math.max(1, h)).map((v) => v.item));
  }
  return Object.freeze({ register: o, execute: a, cancel: n, has: (l) => e.has(l), list: g, search: f });
}
const ui = Ia(), Ma = /^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/;
function Da(e) {
  const t = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map();
  function r(v) {
    if (!v || !Ma.test(v.id)) throw new TypeError(`Invalid feature id: ${v?.id || ""}`);
    if (!v.title?.trim() || typeof v.mount != "function") throw new TypeError(`Feature ${v.id} requires title and mount()`);
    if (t.has(v.id)) throw new Error(`Feature already registered: ${v.id}`);
    return t.set(v.id, Object.freeze({
      ...v,
      order: Number(v.order) || 100,
      eager: v.eager === !0,
      roots: Object.freeze([...v.roots || []]),
      capabilities: Object.freeze([...v.capabilities || []])
    })), () => {
      l(v.id), a.delete(v.id), t.delete(v.id);
    };
  }
  function g(v) {
    return typeof v == "function" ? v : v && typeof v.unmount == "function" ? () => v.unmount() : () => {
    };
  }
  function f(v) {
    if (o.has(v)) return Promise.resolve(o.get(v)?.cleanup);
    if (n.has(v)) return n.get(v);
    const I = t.get(v);
    if (!I) return Promise.reject(new Error(`Unknown feature: ${v}`));
    a.delete(v);
    const m = new AbortController(), w = Object.freeze({
      signal: m.signal,
      commands: e,
      getRoot: (y) => document.getElementById(y)
    }), M = Promise.resolve().then(() => I.mount(w)).then((y) => (n.delete(v), o.set(v, { cleanup: y, controller: m }), y), (y) => {
      throw n.delete(v), a.set(v, y), m.abort(), y;
    });
    return n.set(v, M), M;
  }
  async function l(v) {
    const I = n.get(v);
    if (I)
      try {
        await I;
      } catch {
        return;
      }
    const m = o.get(v);
    m && (o.delete(v), m.controller.abort(), await g(m.cleanup)());
  }
  async function h() {
    const v = typeof document < "u" && !!(document.getElementById("vue-spa-root") || document.getElementById("logicweaver-spa-root")), I = [...t.values()].filter((M) => !(!M.eager || !v && M.roots && M.roots.length > 0 && !M.roots.some((_) => !!document.getElementById(_)))).sort((M, y) => (M.order || 100) - (y.order || 100)), w = (await Promise.allSettled(I.map((M) => f(M.id)))).flatMap((M, y) => M.status === "rejected" ? [{ id: I[y].id, reason: M.reason }] : []);
    w.length && console.warn("LogicWeaver Vue features failed to mount", w);
  }
  async function S() {
    const v = [...o.keys()].reverse();
    await Promise.allSettled(v.map(l));
  }
  function O() {
    return Object.freeze([...t.values()].map((v) => Object.freeze({
      id: v.id,
      title: v.title,
      order: v.order || 100,
      eager: v.eager === !0,
      roots: Object.freeze([...v.roots || []]),
      capabilities: Object.freeze([...v.capabilities || []]),
      status: n.has(v.id) ? "mounting" : o.has(v.id) ? "mounted" : a.has(v.id) ? "failed" : "registered",
      error: a.has(v.id) ? String(a.get(v.id)?.message || a.get(v.id) || "Feature mount failed") : ""
    })).sort((v, I) => v.order - I.order));
  }
  return Object.freeze({ register: r, start: f, startEager: h, stop: l, stopAll: S, has: (v) => t.has(v), list: O });
}
const Aa = localStorage.getItem("startupAnimationStyle") || localStorage.getItem("logicweaverStartupStyle") || "endfield", pn = (() => {
  try {
    const e = localStorage.getItem("showStartupAnimation"), t = localStorage.getItem("logicweaverEndfieldLoader"), o = e ?? t;
    return o === "1" || o === "true";
  } catch {
    return !1;
  }
})(), ne = $e({
  enabled: pn,
  style: Aa === "rhinelab" ? "rhinelab" : "endfield",
  renderedProgress: 4,
  targetProgress: 4,
  status: "CORE SHELL...",
  finished: !pn,
  exiting: !1,
  forced: !1
});
let go = 0, ai = 4, Yn = performance.now(), ji = 0, qo = null, Ki = !1;
function Xn(e) {
  const t = e - Yn, o = ji ? Math.min(1, t / ji) : 1, n = o * o * (3 - 2 * o);
  ne.renderedProgress = ai + (ne.targetProgress - ai) * n, o < 1 && !ne.finished ? go = requestAnimationFrame(Xn) : go = 0;
}
function Jo(e, t) {
  if (!ne.enabled || ne.finished) return;
  const o = Math.max(ne.targetProgress, Math.max(4, Math.min(100, Number(e) || 4)));
  t && (ne.status = t), ai = ne.renderedProgress, ne.targetProgress = o, Yn = performance.now(), ji = Math.max(280, Math.min(920, 220 + Math.abs(o - ai) * 7.5)), cancelAnimationFrame(go), go = requestAnimationFrame(Xn);
}
function pi(e = "Ready", t = !1) {
  ne.finished || (ne.finished = !0, ne.forced = t, ne.status = e, ne.targetProgress = 100, cancelAnimationFrame(go), go = 0, ne.renderedProgress = 100, qo?.(t));
}
function Ea(e = "KEYBOARD SKIP") {
  pi(e, !0);
}
function Pa() {
  ne.enabled || pi("BOOT COMPLETE", !0);
}
function qn() {
  !ne.enabled || ne.finished || Ki || (Ki = !0, Jo(38, "INITIALIZING CORE SHELL..."), setTimeout(() => {
    ne.finished || Jo(76, "SYNTHESIZING RUNTIME...");
  }, 400), setTimeout(() => {
    ne.finished || Jo(100, ne.style === "rhinelab" ? "ID CONFIRMED : JOYCE MOORE" : "TERRA LINK READY / 终端就绪");
  }, 900), setTimeout(() => {
    ne.finished || pi("BOOT COMPLETE / 首页就绪", !1);
  }, 1650));
}
async function Wa() {
  if (document.getElementById("vue-spa-root")) {
    try {
      const e = await chrome.storage.local.get(["showStartupAnimation", "startupAnimationStyle"]);
      typeof e.showStartupAnimation == "boolean" && (ne.enabled = e.showStartupAnimation, localStorage.setItem("showStartupAnimation", ne.enabled ? "1" : "0"), localStorage.setItem("logicweaverEndfieldLoader", ne.enabled ? "1" : "0")), (e.startupAnimationStyle === "endfield" || e.startupAnimationStyle === "rhinelab") && (ne.style = e.startupAnimationStyle, localStorage.setItem("startupAnimationStyle", ne.style));
    } catch {
      console.warn("[Intro] Startup preferences unavailable; using first-paint preference.");
    }
    ne.finished = !ne.enabled, document.documentElement.dataset.startupStyle = ne.style, document.documentElement.classList.toggle("skip-endfield-loader", !ne.enabled), document.body.classList.toggle("is-starting", ne.enabled);
  }
}
const rt = Wt(ne), yt = Object.freeze({
  update: Jo,
  finish: pi,
  skip: Ea,
  notifyBootReady: Pa,
  async playIntro(e) {
    if (e?.style && (ne.style = e.style), typeof document < "u" && (document.documentElement.dataset.startupStyle = ne.style, document.documentElement.classList.remove("skip-endfield-loader"), document.body.classList.add("is-starting")), ne.enabled = !0, ne.finished = !1, ne.forced = !!e?.force, ne.renderedProgress = 4, ne.targetProgress = 4, Ki = !1, typeof document < "u") {
      let t = document.getElementById("endfield-loader");
      if (!t) {
        t = document.createElement("div"), t.id = "endfield-loader", t.className = "endfield-loader notranslate", document.body.appendChild(t);
        const { default: o } = await import("./IntroAnimation-DkcWvelN.js"), n = Xi(o), a = () => {
          window.removeEventListener("logicweaver:intro-complete", a), n.unmount(), t?.remove(), document.body.classList.remove("is-starting");
        };
        window.addEventListener("logicweaver:intro-complete", a, { once: !0 }), n.mount(t);
      }
    }
    qn();
  },
  get enabled() {
    return ne.enabled;
  },
  get finished() {
    return ne.finished;
  }
});
function Ra(e) {
  return qo = e, ne.finished && e(ne.forced), () => {
    qo === e && (qo = null);
  };
}
const Jn = [
  { date: "今天", dayName: "周四", emoji: "🌤️", condition: "多云", highTemp: 26, lowTemp: 18, rainProb: 15 },
  { date: "明天", dayName: "周五", emoji: "⛅", condition: "阴天", highTemp: 24, lowTemp: 17, rainProb: 30 },
  { date: "后天", dayName: "周六", emoji: "🌧️", condition: "小雨", highTemp: 21, lowTemp: 16, rainProb: 75 },
  { date: "周日", dayName: "周日", emoji: "🌦️", condition: "阵雨", highTemp: 23, lowTemp: 15, rainProb: 45 },
  { date: "周一", dayName: "周一", emoji: "☀️", condition: "晴天", highTemp: 27, lowTemp: 18, rainProb: 10 },
  { date: "周二", dayName: "周二", emoji: "🌤️", condition: "多云", highTemp: 28, lowTemp: 19, rainProb: 15 },
  { date: "周三", dayName: "周三", emoji: "☀️", condition: "晴天", highTemp: 29, lowTemp: 20, rainProb: 5 }
], Zn = "lw_weather_snapshot_v1";
function Na() {
  if (typeof window > "u" || typeof localStorage > "u") return null;
  try {
    const e = localStorage.getItem(Zn);
    if (!e) return null;
    const t = JSON.parse(e);
    if (t && t.data && t.data.currentTemp !== void 0)
      return {
        state: "ready",
        city: t.city || t.data.cityName || "",
        data: t.data,
        forecastDays: Array.isArray(t.forecastDays) && t.forecastDays.length ? t.forecastDays : Jn,
        detailInfo: t.detailInfo || null,
        updatedAt: t.savedAt || Date.now()
      };
  } catch {
  }
  return null;
}
function Fo(e) {
  if (!(typeof window > "u" || typeof localStorage > "u"))
    try {
      e.data && localStorage.setItem(
        Zn,
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
const Oa = () => {
  const e = Na();
  return {
    state: e?.state || "loading",
    city: e?.city || "",
    errorMessage: "",
    data: e?.data || null,
    updatedAt: e?.updatedAt || null,
    forecastModalOpen: !1,
    forecastDays: e?.forecastDays || Jn,
    detailInfo: e?.detailInfo || {
      humidity: "62%",
      wind: "东北风 2级",
      uvIndex: "中等 (4)",
      airQuality: "优 (32)"
    }
  };
}, q = $e(Oa());
let wi = null, bi = null;
const ct = {
  get snapshot() {
    return Wt(q);
  },
  update(e) {
    Object.assign(q, e), Fo(q);
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
    }), Fo(q);
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
    })) : [], Fo(q);
  },
  setDetailInfo(e) {
    q.detailInfo = { ...e }, Fo(q);
  },
  applyCity(e) {
    typeof window < "u" && window.dispatchEvent(new CustomEvent("logicweaver:weather-city-selected", { detail: { city: e } })), this.refresh();
  },
  refresh() {
    wi ? wi() : typeof window < "u" && window.dispatchEvent(new CustomEvent("logicweaver:weather-refresh"));
  },
  changeLocation(e) {
    bi ? bi(e) : typeof window < "u" && window.dispatchEvent(new CustomEvent("logicweaver:weather-change-location", { detail: { clientX: e?.clientX, clientY: e?.clientY } }));
  },
  setRefreshAction(e) {
    wi = e;
  },
  setChangeLocationAction(e) {
    bi = e;
  }
}, Ba = () => ({
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
}), Se = $e(Ba());
let ki = null;
const ro = {
  get snapshot() {
    return Wt(Se);
  },
  update(e) {
    Object.assign(Se, e);
  },
  updateTime(e, t, o, n) {
    Se.timeText = e, Se.secsText = t, Se.greetingText = o, Se.dateText = n, Se.updatedAt = Date.now();
  },
  applyConfig(e) {
    e.fontFamily !== void 0 && (Se.fontFamily = e.fontFamily), e.colorHex !== void 0 && (Se.colorHex = e.colorHex), e.greetColor !== void 0 && (Se.greetColor = e.greetColor), e.dateColor !== void 0 && (Se.dateColor = e.dateColor), e.isBlack !== void 0 && (Se.isBlack = e.isBlack), e.isCustomColor !== void 0 && (Se.isCustomColor = e.isCustomColor), Se.updatedAt = Date.now();
  },
  openSettings(e) {
    ki ? ki(e) : window.dispatchEvent(new CustomEvent("logicweaver:clock-open-settings", { detail: { clientX: e?.clientX, clientY: e?.clientY } }));
  },
  setOpenSettingsAction(e) {
    ki = e;
  }
}, Fa = [
  { id: "ai", title: "AI 助手" },
  { id: "todoist", title: "Todoist" },
  { id: "stickers", title: "表情包" },
  { id: "calcom", title: "预约" },
  { id: "wallpaper", title: "壁纸库" }
], Ha = () => ({
  mounted: !1,
  visible: !1,
  items: [...Fa]
}), _i = $e(Ha());
let Ho = {};
const on = {
  getSnapshot() {
    return Wt(_i);
  },
  update(e) {
    Object.assign(_i, e);
  },
  setMounted(e) {
    _i.mounted = e;
  },
  openWorkspace(e, t = !1) {
    if (Ho.open) {
      Ho.open(e);
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
    Ho = { ...Ho, ...e };
  }
}, Ci = $e({ visible: !1, pendingWrites: 0 });
async function ja(e) {
  if (Ci.pendingWrites) throw new Error("壁纸操作正在处理，未自动排队");
  Ci.pendingWrites++;
  try {
    return await e();
  } finally {
    Ci.pendingWrites--;
  }
}
const hn = {
  openDialog() {
    Oe.open("wallpaper");
  },
  closeDialog() {
    Oe.close("wallpaper");
  },
  resetDefault() {
    return ja(() => ii.clearWallpaper());
  }
}, fn = [
  { id: "mono", label: "极简等宽", font: "ui-monospace, 'SF Mono', 'JetBrains Mono', Menlo, Consolas, monospace", sample: "15:50:10" },
  { id: "sans", label: "现代无衬线", font: "-apple-system, BlinkMacSystemFont, 'Segoe UI Variable Display', 'Segoe UI', Roboto, 'PingFang SC', sans-serif", sample: "15:50:10" },
  { id: "din", label: "经典几何", font: "'DIN Alternate', 'DIN Pro', 'Franklin Gothic Medium', Futura, sans-serif", sample: "15:50:10" },
  { id: "digital", label: "数码管等宽", font: "'Courier New', Courier, monospace", sample: "15:50:10" },
  { id: "impact", label: "硬派力量", font: "Impact, 'Arial Black', 'Trebuchet MS', sans-serif", sample: "15:50:10" },
  { id: "serif", label: "典雅衬线", font: "'Playfair Display', Georgia, 'Times New Roman', serif", sample: "15:50:10" },
  { id: "rounded", label: "圆润亲和", font: "'Quicksand', 'Comic Sans MS', 'Segoe UI', sans-serif", sample: "15:50:10" }
], gn = [
  { id: "white", label: "纯净皓白 (默认)", hex: "#ffffff" },
  { id: "black", label: "曜石极黑", hex: "#0f172a" },
  { id: "gold", label: "香槟金砂", hex: "#f59e0b" },
  { id: "cyan", label: "科技青蓝", hex: "#38bdf8" },
  { id: "emerald", label: "翡翠竹绿", hex: "#10b981" },
  { id: "rose", label: "淡雅樱粉", hex: "#fb7185" }
], Lm = [
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
let xi = null;
const Vt = {
  state: De,
  setMounted(e) {
    De.mounted = e;
  },
  onAction(e) {
    xi = e;
  },
  dispatch(e, t) {
    if (xi)
      return xi(e, t);
  },
  open(e) {
    const n = typeof window < "u" ? window.innerWidth : 1280, a = typeof window < "u" ? window.innerHeight : 800, r = e?.clientX ?? e?.x ?? n / 2, g = e?.clientY ?? e?.y ?? a / 2, f = Math.max(12, Math.min(r - 40, n - 290 - 12)), l = Math.max(12, Math.min(g + 10, a - 420 - 12));
    De.x = f, De.y = l, De.isOpen = !0, this.dispatch("open", { x: f, y: l });
  },
  close() {
    De.isOpen = !1, this.dispatch("close");
  },
  setFont(e) {
    De.font = e;
    const t = fn.find((o) => o.id === e);
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
    const t = gn.find((o) => o.id === e);
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
        const n = fn.find((a) => a.id === e);
        n && ro.applyConfig({ fontFamily: n.font });
      }
      const t = localStorage.getItem("lw_clock_color");
      if (t) {
        De.color = t;
        const n = gn.find((a) => a.id === t);
        n && ro.applyConfig({ colorHex: n.hex, greetColor: n.hex, dateColor: n.hex, isCustomColor: !0 });
      }
      const o = localStorage.getItem("lw_clock_tz");
      o && (De.timezone = o);
    } catch {
    }
  },
  syncConfig(e) {
    e.font && (De.font = e.font), e.color && (De.color = e.color), e.timezone && (De.timezone = e.timezone);
  }
}, me = $e({
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
let Li = null, Zo = !1;
async function Qo(e, t = {}) {
  if (e === "poll") return { state: "ready", model: me.model };
  if (e === "connect") return { state: "ready", model: me.model };
  throw new Error("旧版 AI 对话桥接已退役，请使用「海狸聊天室」开启智能会话。");
}
function Qn(e) {
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
  o || (e.state === "connecting" ? o = "正在连接本机 Codex 与 ChatGPT…" : e.state === "disconnected" ? o = "已待命（打开面板自动连接）" : e.authenticated ? o = `就绪 · ChatGPT ${e.plan || "已登录"}` : e.state === "ready" ? o = "就绪 · 尚未登录 ChatGPT" : o = t[e.state] || e.state), me.statusText = o, me.authHidden = !e.loginUrl, me.authCode = e.loginCode || "", me.authLink = e.loginUrl || "https://auth.openai.com/codex/device", me.isStreaming = Zo || e.busy || e.state === "running";
}
async function Ka() {
  try {
    const e = await Qo("poll");
    Qn(e);
  } catch {
  }
}
async function za(e, t) {
  if (e === "open" || e === "connect")
    try {
      me.statusText = "正在连接本机 Codex 与 ChatGPT…";
      const o = await Qo("connect");
      Qn(o);
    } catch (o) {
      me.statusText = o?.message || "连接失败";
    }
  else if (e === "send" && t?.text) {
    const o = t.text;
    me.messages.push({
      id: `msg-${Date.now()}`,
      role: "user",
      content: o
    }), me.inputText = "", me.isStreaming = !0, Zo = !0;
    try {
      await Qo("send", { text: o }), await Ka();
    } catch (n) {
      me.statusText = n?.message || "发送失败";
    } finally {
      Zo = !1, me.isStreaming = !1;
    }
  } else if (e === "stop") {
    try {
      await Qo("stop");
    } catch {
    }
    me.isStreaming = !1, Zo = !1;
  }
}
const nn = {
  state: me,
  setMounted(e) {
    me.mounted = e;
  },
  onAction(e) {
    Li = e;
  },
  dispatch(e, t) {
    if (Li)
      return Li(e, t);
    za(e, t);
  },
  open() {
    me.isOpen = !0, this.dispatch("open");
  },
  close() {
    me.isOpen = !1, this.dispatch("close");
  },
  newChat() {
    me.messages = [], me.inputText = "", me.kwShelfHidden = !0, me.keywords = [], this.dispatch("newChat");
  },
  send() {
    const e = me.inputText.trim();
    !e || me.isStreaming || this.dispatch("send", { text: e });
  },
  stop() {
    me.isStreaming = !1, this.dispatch("stop");
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
    me.keywords.forEach((t) => t.selected = e), this.dispatch("selectAllKeywords", { all: e });
  },
  toggleKeyword(e) {
    me.keywords[e] && (me.keywords[e].selected = !me.keywords[e].selected, this.dispatch("toggleKeyword", { index: e, selected: me.keywords[e].selected }));
  },
  deepDiveKeywords() {
    const e = me.keywords.filter((t) => t.selected).map((t) => t.text);
    this.dispatch("deepDiveKeywords", { selected: e });
  }
}, $i = $e({
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
}), jo = /* @__PURE__ */ new Set(), Ga = {
  state: $i,
  open(e) {
    Object.assign($i, e, { open: !0 });
  },
  update(e) {
    Object.assign($i, e);
  },
  close() {
    jo.forEach((e) => e("close"));
  },
  save(e) {
    jo.forEach((t) => t("save", e));
  },
  onAction(e) {
    return jo.add(e), () => jo.delete(e);
  }
}, ei = $e({ isOpen: !1 }), es = {
  state: ei,
  open() {
    ei.isOpen = !0;
  },
  close() {
    ei.isOpen = !1;
  }
}, Si = "biliProfileCacheV1", kt = "biliLocallyKnownMessageIdsV1", Ko = "biliMessageUserCacheV1", Co = "githubKnownReleaseVersionsV1", zo = "customNewtabAvatar", mn = "biliToastKnownCountsV1";
class Va {
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
    !t?.repository || !t?.version || (this.githubKnownVersions[t.repository] = t.version, typeof chrome < "u" && chrome?.storage?.local && await chrome.storage.local.set({ [Co]: this.githubKnownVersions }), this.notifyGitHubListeners());
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
  markKnown(t, o, n) {
    this.locallyKnownIds[t] || (this.locallyKnownIds[t] = []);
    let a = !1;
    o && !this.locallyKnownIds[t].includes(o) && (this.locallyKnownIds[t].push(o), a = !0), n && !this.locallyKnownIds[t].includes(n) && (this.locallyKnownIds[t].push(n), a = !0), a && typeof chrome < "u" && chrome?.storage?.local && chrome.storage.local.set({ [kt]: this.locallyKnownIds }).catch(() => {
    }), this.applyBiliProfile(this.profile, this.unread);
  }
  markAllKnown(t, o = []) {
    this.locallyKnownIds[t] || (this.locallyKnownIds[t] = []);
    const n = new Set(this.locallyKnownIds[t]);
    for (const r of o) r && n.add(r);
    const a = Math.max(0, Number(this.unread?.[t] || 0));
    if (n.size < a) {
      const r = a - n.size;
      for (let g = 0; g < r; g++) n.add(`__pad_${Date.now()}_${g}`);
    }
    this.locallyKnownIds[t] = Array.from(n), typeof chrome < "u" && chrome?.storage?.local && chrome.storage.local.set({ [kt]: this.locallyKnownIds }).catch(() => {
    }), this.applyBiliProfile(this.profile, this.unread);
  }
  applyBiliProfile(t, o = {}) {
    this.profile = t || null, this.unread = o || {};
    const a = this.customAvatar || String(t?.face || "assets/bilibili.svg").replace(/^http:/, "https:"), r = this.getVisibleUnread();
    if (oo.avatarUrl = a, oo.userName = t?.uname || "哔哩哔哩用户", oo.buttonTitle = "通知中心", gi.avatarUrl = a, gi.userName = t?.uname || "用户", gi.mid = t?.mid, typeof document < "u") {
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
        const n = {
          mid: o.data.mid,
          uname: o.data.uname,
          face: o.data.face
        }, [a, r, g] = await Promise.allSettled([
          fetch("https://api.bilibili.com/x/msgfeed/unread?build=0&mobi_app=web", { credentials: "include" }).then((I) => I.json()),
          fetch("https://api.vc.bilibili.com/x/im/web/msgfeed/unread", { credentials: "include" }).then((I) => I.json()),
          fetch("https://api.vc.bilibili.com/session_svr/v1/session_svr/single_unread", { credentials: "include" }).then((I) => I.json())
        ]), f = a.status === "fulfilled" ? a.value?.data || {} : {}, l = r.status === "fulfilled" ? r.value?.data || {} : {}, h = g.status === "fulfilled" ? g.value?.data || {} : {}, S = Number(l.at || 0), O = l.reply != null ? Number(l.reply || 0) : Math.max(0, Number(l.recv_reply || 0) - S), v = {
          reply: Math.max(Number(f.reply || 0), O),
          at: Math.max(Number(f.at || 0), S),
          like: Math.max(
            Number(f.like || f.praise || 0),
            Number(l.like || l.recv_like || 0)
          ),
          system: Math.max(Number(f.sys_msg || f.system || 0), Number(l.sys_msg || 0)),
          private: Number(
            f.chat || l.chat || Number(h.follow_unread || 0) + Number(h.unfollow_unread || 0) + Number(h.dustbin_push_msg || 0)
          )
        };
        this.applyBiliProfile(n, v), typeof chrome < "u" && chrome?.storage?.local && await chrome.storage.local.set({ [Si]: { profile: n, unread: v, savedAt: Date.now() } }), this.checkAndNotifyBiliInteractions(v);
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
      this.biliToastKnownCounts = { ...o }, typeof chrome < "u" && chrome?.storage?.local && chrome.storage.local.set({ [mn]: this.biliToastKnownCounts }).catch(() => {
      });
      return;
    }
    const n = o.private - Number(this.biliToastKnownCounts.private || 0);
    o.like - Number(this.biliToastKnownCounts.like || 0);
    const a = o.reply - Number(this.biliToastKnownCounts.reply || 0), r = o.at - Number(this.biliToastKnownCounts.at || 0);
    o.system - Number(this.biliToastKnownCounts.system || 0), this.biliToastKnownCounts = { ...o }, typeof chrome < "u" && chrome?.storage?.local && chrome.storage.local.set({ [mn]: this.biliToastKnownCounts }).catch(() => {
    }), n > 0 && Le.show({
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
    this.initialized || (this.initialized = !0, No.setActions({
      onAction: async (t) => {
        if (t === "messages")
          Pt.open();
        else if (t === "tabs")
          es.open();
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
      Si,
      kt,
      Ko,
      Co,
      zo
    ]).then((t) => {
      this.customAvatar = t[zo] || "", this.locallyKnownIds = t[kt] && typeof t[kt] == "object" ? t[kt] : {}, this.userCache = t[Ko] && typeof t[Ko] == "object" ? t[Ko] : {}, this.githubKnownVersions = t[Co] && typeof t[Co] == "object" ? t[Co] : {};
      const o = t[Si];
      o?.profile ? this.applyBiliProfile(o.profile, o.unread || {}) : this.applyBiliProfile(null, {});
    }).catch(() => {
    }), chrome.storage.onChanged && chrome.storage.onChanged.addListener((t, o) => {
      o === "local" && (t[zo] && (this.customAvatar = t[zo].newValue || "", this.applyBiliProfile(this.profile, this.unread)), t[kt] && (this.locallyKnownIds = t[kt].newValue || {}, this.applyBiliProfile(this.profile, this.unread)));
    })), zt.onAction((t, o) => {
      t === "mark-known" ? this.markKnown(o.kind, o.id, o.talkerId) : t === "mark-all-known" && this.markAllKnown(o.kind, o.ids);
    }), this.refreshBiliProfile(), setTimeout(() => {
      this.loadGitHubUpdates();
    }, 3500));
  }
}
const vn = new Va(), ye = $e({ open: !1, loading: !1, error: "", mid: "", name: "", face: "", sign: "", followed: !1, submitting: !1, left: 12, top: 12, videos: [] });
let Go = null;
const ti = {
  state: ye,
  open(e, t) {
    Go = t, Object.assign(ye, { open: !0, loading: !0, error: "", submitting: !1, videos: [] }, e);
  },
  update(e) {
    Object.assign(ye, e);
  },
  close() {
    ye.submitting || (ye.open = !1, Go = null);
  },
  async toggleFollow() {
    if (!(!Go || ye.submitting)) {
      ye.submitting = !0;
      try {
        const e = !ye.followed;
        await Go(e) && (ye.followed = e);
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
}), Ti = /* @__PURE__ */ new Set();
let Jt;
const Ii = new Ca();
async function Ua(e, t) {
  if (t.throwIfAborted(), new URL(e).origin !== "https://ghapi.h11.dev") throw new Error("Unexpected public source");
  const o = new AbortController(), n = () => o.abort();
  t.addEventListener("abort", n, { once: !0 });
  const a = setTimeout(n, 15e3);
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
        const S = await g.read();
        if (S.done) break;
        if (l += S.value.byteLength, l > 2 * 1024 * 1024) throw new Error("Public source exceeds limit");
        h += f.decode(S.value, { stream: !0 });
      }
      return o.signal.throwIfAborted(), JSON.parse(h + f.decode());
    } finally {
      g.cancel().catch(() => {
      }), g.releaseLock();
    }
  } finally {
    clearTimeout(a), t.removeEventListener("abort", n);
  }
}
function yn(e, t) {
  const o = e?.name || e?.repository, n = t ? e?.full_name || (typeof o == "string" && o.includes("/") ? o : e?.author && o ? `${e.author}/${o}` : "") : e?.full_name;
  if (typeof n != "string" || !/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(n) || n.split("/").some((f) => f === "." || f === "..")) throw new Error("Invalid repository");
  const [a, r] = n.split("/"), g = (f) => typeof f == "number" && Number.isFinite(f) && f >= 0 ? f : void 0;
  return {
    name: r,
    full_name: n,
    owner: { login: a },
    description: typeof e.description == "string" ? e.description : "",
    language: typeof e.language == "string" ? e.language : "",
    stargazers_count: g(t ? e.stars ?? e.stargazers_count : e.stargazers_count),
    forks_count: g(t ? e.forks ?? e.forks_count : e.forks_count),
    html_url: `https://github.com/${encodeURIComponent(a)}/${encodeURIComponent(r)}`
  };
}
async function Ya(e, t) {
  const o = new Date(Date.now() - e * 864e5).toISOString().slice(0, 10);
  let n = "";
  try {
    const g = await Xs(t), { data: f } = await qs(`/search/repositories?q=${encodeURIComponent(`is:public created:>${o}`)}&sort=stars&order=desc&per_page=30`, { headers: g, signal: t, maxBytes: 2 * 1024 * 1024 });
    if (t.throwIfAborted(), !Array.isArray(f?.items)) throw new Error("Invalid search response");
    return {
      repos: f.items.slice(0, 30).map((l) => yn(l, !1)),
      sourceText: `GitHub Search：UTC 日期 ${o} 之后新建的仓库，按累计 Star 排序；不是官方 Trending 榜。${f.incomplete_results ? " API 标记为不完整结果。" : ""}`
    };
  } catch (g) {
    t.throwIfAborted(), n = g instanceof Js ? g.message : "主源响应格式无效。";
  }
  const a = e === 1 ? "daily" : e === 7 ? "weekly" : "monthly", r = await Ua(`https://ghapi.h11.dev/repositories?since=${a}`, t);
  if (t.throwIfAborted(), !Array.isArray(r)) throw new Error("Invalid fallback response");
  return {
    repos: r.slice(0, 30).map((g) => yn(g, !0)),
    sourceText: `GitHub Search 不可用：${n} 改用第三方 ghapi.h11.dev 的 ${a} 趋势快照（不发送账号凭据）；口径与新建仓库搜索不同，源更新时间未提供。`
  };
}
const ts = {
  get state() {
    return Re;
  },
  // View attachment permits starting reads; detaching does not cancel an
  // already requested read. Range changes still replace the old session.
  attachView(e) {
    return Jt = e, !e.aborted && !Re.hasLoaded && !Ii.pending && this.refresh(), () => {
      Jt === e && (Jt = void 0);
    };
  },
  switchTab(e) {
    Re.currentTab = e, this.dispatch("switch-tab", e);
  },
  async switchRange(e, t) {
    !Jt || Jt.aborted || ![1, 7, 30].includes(e) || e === Re.sinceDays || (Ii.cancel(), Object.assign(Re, {
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
    const e = Jt;
    if (!e || e.aborted || Re.isLoading) return;
    const t = Re.sinceDays, o = Ii.begin({
      timeoutMs: 45e3,
      isCurrent: () => Re.sinceDays === t,
      onStop: (a) => {
        Re.isLoading = !1, a === "timeout" && (Re.errorMessage = "数据源读取超过整体45秒上限，请手动刷新；没有继续请求备用源。");
      }
    }), n = o.current;
    if (n()) {
      Re.isLoading = !0, Re.errorMessage = "";
      try {
        const a = await o.wait(() => Ya(t, o.signal));
        if (!n()) return;
        Re.repos = a.repos, Re.sourceText = a.sourceText, Re.fetchedAt = Date.now(), Re.hasLoaded = !0;
      } catch {
        n() && (Re.errorMessage = Re.hasLoaded ? "刷新失败，保留同一时间范围的上次读取结果；请检查网络或额度后手动刷新。" : "数据源读取失败或超时；未使用内置样例，请稍后手动刷新。");
      } finally {
        o.finish() && (Re.isLoading = !1, this.dispatch("refresh"));
      }
    }
  },
  selectRepo(e) {
    this.dispatch("select-repo", e);
  },
  onAction(e) {
    return Ti.add(e), () => {
      Ti.delete(e);
    };
  },
  dispatch(e, t) {
    for (const o of Ti)
      try {
        o(e, t);
      } catch {
      }
  }
}, zi = () => ({
  icon: "🧭",
  title: "快捷轮盘",
  desc: "移动鼠标选择",
  active: !1
}), sn = () => ({
  visible: !1,
  wedgePath: "",
  arcPath: "",
  line1: { x1: 0, y1: 0, x2: 0, y2: 0 },
  line2: { x1: 0, y1: 0, x2: 0, y2: 0 }
}), ie = $e({
  mounted: !1,
  isOpen: !1,
  isExpanded: !1,
  mode: "main",
  ballPosition: { x: 0, y: 0 },
  hub: zi(),
  activeSectorId: null,
  sectors: [],
  beam: sn()
});
let wn = null;
function Xa(e, t) {
  if (typeof e != "number" || !t)
    return sn();
  const o = 160, n = 160, a = 26, r = 154, g = 360 / t, f = e - g / 2, l = e + g / 2, h = f * Math.PI / 180, S = l * Math.PI / 180, O = o + a * Math.cos(h), v = n + a * Math.sin(h), I = o + r * Math.cos(h), m = n + r * Math.sin(h), w = o + a * Math.cos(S), M = n + a * Math.sin(S), y = o + r * Math.cos(S), _ = n + r * Math.sin(S), x = g > 180 ? 1 : 0, N = `M ${O.toFixed(1)} ${v.toFixed(1)} L ${I.toFixed(1)} ${m.toFixed(1)} A ${r} ${r} 0 ${x} 1 ${y.toFixed(1)} ${_.toFixed(1)} L ${w.toFixed(1)} ${M.toFixed(1)} A ${a} ${a} 0 ${x} 0 ${O.toFixed(1)} ${v.toFixed(1)} Z`, j = `M ${I.toFixed(1)} ${m.toFixed(1)} A ${r} ${r} 0 ${x} 1 ${y.toFixed(1)} ${_.toFixed(1)}`;
  return {
    visible: !0,
    wedgePath: N,
    arcPath: j,
    line1: {
      x1: parseFloat(O.toFixed(1)),
      y1: parseFloat(v.toFixed(1)),
      x2: parseFloat(I.toFixed(1)),
      y2: parseFloat(m.toFixed(1))
    },
    line2: {
      x1: parseFloat(w.toFixed(1)),
      y1: parseFloat(M.toFixed(1)),
      x2: parseFloat(y.toFixed(1)),
      y2: parseFloat(_.toFixed(1))
    }
  };
}
const Ee = {
  get state() {
    return ie;
  },
  getSnapshot() {
    return Wt(ie);
  },
  setMounted(e) {
    ie.mounted = e;
  },
  setBallPosition(e, t) {
    ie.ballPosition.x = e, ie.ballPosition.y = t;
  },
  setVisibility(e) {
    ie.isOpen = e;
  },
  setHub(e) {
    e ? ie.hub = {
      icon: e.icon || "🧭",
      title: e.title || "快捷轮盘",
      desc: e.desc || "移动鼠标选择",
      active: !!e.active
    } : ie.hub = zi();
  },
  setBeam(e, t) {
    ie.beam = Xa(e, t);
  },
  setActiveSector(e) {
    ie.activeSectorId = e;
  },
  setSectors(e) {
    ie.sectors = [...e];
  },
  expand(e, t, o = "main") {
    ie.isOpen = !0, ie.isExpanded = !0, ie.mode = o, typeof e == "number" && typeof t == "number" && this.setBallPosition(e, t);
  },
  collapse() {
    ie.isExpanded = !1, ie.mode = "main", ie.activeSectorId = null, ie.beam = sn(), ie.hub = zi();
  },
  setWheelMode(e) {
    ie.mode = e;
  },
  setActionHandler(e) {
    wn = e;
  },
  dispatch(e, t) {
    wn?.(e, t);
  }
}, os = [
  { id: "daily-bilibili", title: "b站插件", desc: "B站收藏夹与追番视频", icon: "assets/bilibili.svg" },
  { id: "daily-pricing", title: "模型插件", desc: "AI 模型定价与排行榜", icon: "assets/nav-pricing.svg" },
  { id: "daily-aihot", title: "ai hot插件", desc: "全网 AI 与前沿科技资讯", icon: "assets/nav-aihot.svg" },
  { id: "folder", title: "常用网站", desc: "点击展开快捷网站子轮盘", icon: "assets/nav-folder.svg", mode: "shortcuts" },
  { id: "card-github", title: "github插件", desc: "GitHub 趋势与星标项目", icon: "assets/nav-github.svg" },
  { id: "launcher", title: "首页", desc: "返回主屏常用应用台", icon: "assets/nav-home.svg" }
];
function qa() {
  return os.filter((e) => e.mode || e.id === "launcher" || si(e.id));
}
function Ja() {
  return da.filter((e) => e.kind === "module" && si(e.id)).map((e) => ({
    id: e.id,
    title: e.title,
    desc: e.isDev ? "已启用的实验性组件" : e.categoryLabel,
    icon: e.icon || e.emoji || "🧩",
    tool: e.id
  }));
}
function bn() {
  ie.isExpanded && ut();
}
let Gi = [], Ao = os, Ct = { x: 400, y: 300 }, is = !1, xo = !1, Mi = null, Lo = null, dt = !1;
const Za = $e(/* @__PURE__ */ new Set()), Qa = /* @__PURE__ */ new Map();
function Et() {
  return globalThis.chrome?.storage;
}
function ns(e, t) {
  const o = ie.isExpanded ? 160 : 24;
  Ee.setBallPosition(
    Math.max(o + 8, Math.min(window.innerWidth - o - 8, e)),
    Math.max(o + 8, Math.min(window.innerHeight - o - 8, t))
  );
}
function ut() {
  const e = ie.mode;
  let t = [];
  e === "shortcuts" && (t = [...Gi], t.push({
    id: "toggle-edit-shortcuts",
    title: dt ? d("navwheel.finishEdit") : d("navwheel.editSites"),
    desc: dt ? d("navwheel.finishEditDesc") : d("navwheel.editSitesDesc"),
    icon: dt ? "✅" : "✏️"
  })), Ao = e === "tools" ? Ja() : e === "shortcuts" ? [
    ...t,
    { id: "back-to-main", title: d("navwheel.back"), desc: d("navwheel.backDesc"), icon: "🔙", mode: "main" }
  ] : qa();
  const o = Ao.length, n = o > 12 ? 118 : o > 9 ? 114 : 110, a = o > 12 ? 46 : o > 9 ? 50 : 56;
  Ee.setSectors(Ao.map((r, g) => {
    const f = -90 + 360 / o * g, l = f * Math.PI / 180;
    return {
      id: r.id,
      title: r.title,
      desc: r.desc,
      icon: r.icon,
      angleDeg: f,
      x: Math.round(160 + Math.cos(l) * n),
      y: Math.round(160 + Math.sin(l) * n),
      size: a,
      isShortcut: !!r.url
    };
  })), Ee.setWheelMode(e), Ee.setActiveSector(null), Ee.setBeam(null, 0), Ee.setHub(e === "shortcuts" ? dt ? { icon: "✏️", title: d("navwheel.editing") } : { icon: "🔙", title: d("navwheel.shortcuts") } : e === "tools" ? { icon: "🧰", title: d("navwheel.tools") } : null);
}
function ri(e) {
  ie.mode = e, ut();
}
function Ut() {
  Ee.collapse(), ns(ie.ballPosition.x, ie.ballPosition.y), Ee.setVisibility(is);
}
function eo(e = ie.ballPosition.x, t = ie.ballPosition.y, o = "main") {
  Ee.expand(void 0, void 0, o), ns(e, t), ut(), Ee.setVisibility(!0);
}
function er(e) {
  if (e.id === "toggle-edit-shortcuts") {
    ss();
    return;
  }
  if (dt && e.url) {
    Le.show({
      appName: d("navwheel.appName"),
      title: d("navwheel.editingNotice"),
      message: d("navwheel.editingHint"),
      duration: 2500
    });
    return;
  }
  if (!(e.tool && !si(e.tool) || !e.url && !e.mode && e.id !== "launcher" && !si(e.id))) {
    if (e.mode) {
      ri(e.mode);
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
    e.id === "launcher" ? (typeof window < "u" && window.scrollTo({ top: 0, left: 0, behavior: "instant" }), Gt.exit(), document.body && (document.body.dataset.page = "home")) : Gt.enter(e.id);
  }
}
function ss() {
  dt = !dt, dt ? (Le.show({
    appName: d("navwheel.appName"),
    title: d("navwheel.enterEditMode"),
    message: d("navwheel.editModeDesc"),
    duration: 5e3
  }), ut()) : (Le.show({
    appName: d("navwheel.appName"),
    title: d("navwheel.editDone"),
    message: d("navwheel.editSaved"),
    duration: 2e3
  }), ut());
}
async function tr(e) {
  if (!dt || !e || !e.url) return !1;
  try {
    const t = await Et()?.local?.get(["siteShelfLinks", "logicweaverNavWheelShortcutsV1"]), o = Array.isArray(t?.siteShelfLinks) ? t.siteShelfLinks : Array.isArray(t?.logicweaverNavWheelShortcutsV1) ? t.logicweaverNavWheelShortcutsV1 : [], n = o.findIndex((g) => g.url === e.url);
    if (n >= 0) {
      const g = o.filter((f, l) => l !== n);
      return await Et()?.local?.set({ siteShelfLinks: g, logicweaverNavWheelShortcutsV1: g }), await Ue.loadShortcuts(), ut(), Le.show({
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
    return await Et()?.local?.set({ siteShelfLinks: r, logicweaverNavWheelShortcutsV1: r }), await Ue.loadShortcuts(), ut(), Le.show({
      appName: d("navwheel.appName"),
      title: d("navwheel.addedTitle"),
      message: d("navwheel.addedNotice", { name: a.title }),
      duration: 2500
    }), !0;
  } catch (t) {
    return console.warn("[NavWheel] 即时处理快捷方式失败", t), !1;
  }
}
async function or(e) {
  try {
    const t = await Et()?.local?.get(["siteShelfLinks", "logicweaverNavWheelShortcutsV1"]), o = Array.isArray(t?.siteShelfLinks) ? t.siteShelfLinks : Array.isArray(t?.logicweaverNavWheelShortcutsV1) ? t.logicweaverNavWheelShortcutsV1 : [], n = o.find((r) => String(r.id) === String(e)), a = o.filter((r) => String(r.id) !== String(e));
    await Et()?.local?.set({ siteShelfLinks: a, logicweaverNavWheelShortcutsV1: a }), await Ue.loadShortcuts(), ut(), n && Le.show({
      appName: d("navwheel.appName"),
      title: d("navwheel.removedNotice"),
      message: d("navwheel.removedSite", { name: n.title || d("navwheel.site") }),
      duration: 2500
    });
  } catch (t) {
    console.warn("[NavWheel] 删除快捷方式失败", t);
  }
}
function kn(e) {
  Ct = { x: e.clientX, y: e.clientY };
}
function _n(e) {
  e.button === 1 && (e.preventDefault(), e.stopPropagation(), Ct = { x: e.clientX, y: e.clientY }, ie.isExpanded ? Ut() : eo(e.clientX, e.clientY));
}
function Cn(e) {
  e.button === 1 && e.preventDefault();
}
function xn(e) {
  if (e.key === "Escape") {
    if (dt) {
      e.preventDefault(), e.stopPropagation(), dt = !1, Za.clear(), Qa.clear(), ut(), Le.show({
        appName: d("navwheel.appName"),
        title: d("navwheel.exitedEditing"),
        duration: 1500
      });
      return;
    }
    if (!ie.isExpanded || en.active) return;
    e.preventDefault(), e.stopPropagation(), ie.mode === "shortcuts" ? ri("main") : Ut();
  }
}
function ir(e) {
  try {
    const t = globalThis.chrome;
    if (typeof t?.runtime?.getURL == "function")
      return t.runtime.getURL("_favicon/?pageUrl=" + encodeURIComponent(e) + "&size=64");
  } catch {
  }
  return "";
}
function nr(e) {
  const t = e.customIcon || e.icon;
  if (t && typeof t == "string" && !/google\.com\/s2\/favicons|icons\.duckduckgo/i.test(t))
    return t;
  if (e.url) {
    const o = Ae.getCachedIcon(e.url);
    if (o) return o;
    const n = ir(e.url);
    if (n) return n;
  }
  return e.icon || "🔗";
}
const Ue = {
  async start() {
    if (!xo) {
      xo = !0, Mi = Ne(gt, () => {
        ie.isExpanded && ut();
      }), Ct = { x: Math.round(window.innerWidth / 2), y: Math.round(window.innerHeight / 2) }, Ee.setActionHandler((e, t) => {
        if (e === "hub:click")
          ie.isExpanded ? ie.mode === "shortcuts" ? ri("main") : Ut() : eo();
        else if (e === "sector:click" || e === "container:click") {
          const o = Ao.find((n) => n.id === t?.id || e === "container:click" && n.id === ie.activeSectorId);
          o && er(o);
        } else if (e === "sector:hover") {
          const o = ie.sectors.find((n) => n.id === t?.id);
          o && (Ee.setHub({ icon: o.icon, title: o.title, desc: o.desc, active: !0 }), Ee.setActiveSector(o.id), Ee.setBeam(o.angleDeg, Ao.length));
        } else e === "sector:leave" && (Ee.setActiveSector(null), Ee.setBeam(null, 0), Ee.setHub(ie.mode === "shortcuts" ? { icon: "🔙", title: d("navwheel.shortcuts") } : ie.mode === "tools" ? { icon: "🧰", title: d("navwheel.tools") } : null));
      }), window.addEventListener("logicweaver:dock-modules-changed", bn), window.addEventListener("pointermove", kn, { passive: !0 }), window.addEventListener("mousedown", _n, !0), window.addEventListener("auxclick", Cn, !0), window.addEventListener("keydown", xn, !0), Lo = (e, t) => {
        t === "local" && (e.siteShelfLinks || e.logicweaverNavWheelShortcutsV1) && this.loadShortcuts();
      }, Et()?.onChanged?.addListener(Lo);
      try {
        if (!xo) return;
        is = !1, Ee.setVisibility(!1);
      } catch {
      }
      await this.loadShortcuts(), ut();
    }
  },
  stop() {
    xo = !1, Mi?.(), Mi = null, Ee.setActionHandler(null), window.removeEventListener("logicweaver:dock-modules-changed", bn), window.removeEventListener("pointermove", kn), window.removeEventListener("mousedown", _n, !0), window.removeEventListener("auxclick", Cn, !0), window.removeEventListener("keydown", xn, !0), Lo && Et()?.onChanged?.removeListener(Lo), Lo = null;
  },
  async loadShortcuts() {
    try {
      const e = await Et()?.local?.get(["siteShelfLinks", "logicweaverNavWheelShortcutsV1"]);
      if (!xo) return;
      const t = e?.siteShelfLinks?.length ? e.siteShelfLinks : e?.logicweaverNavWheelShortcutsV1;
      Gi = (Array.isArray(t) ? t : []).map((o, n) => ({
        id: String(o.id || `wheel-${n}`),
        title: String(o.title || o.url || d("navwheel.site")),
        desc: String(o.url || ""),
        url: String(o.url || ""),
        icon: nr(o)
      })), ie.mode === "shortcuts" && ut();
    } catch (e) {
      console.warn("[NavWheel] 读取快捷方式失败", e);
    }
  },
  open(e, t) {
    eo(e ?? Ct.x, t ?? Ct.y);
  },
  close: Ut,
  get isEditingShortcuts() {
    return dt;
  },
  isLinkInWheel(e) {
    return e ? Gi.some((t) => t.url === e) : !1;
  },
  toggleEditingShortcuts: ss,
  handleLinkSelection: tr,
  removeShortcut: or,
  toggle(e = !1) {
    ie.isExpanded ? Ut() : e ? eo(Ct.x, Ct.y) : eo();
  },
  toggleTools(e = !0) {
    ie.isExpanded && ie.mode === "tools" ? Ut() : eo(
      e ? Ct.x : ie.ballPosition.x,
      e ? Ct.y : ie.ballPosition.y,
      "tools"
    );
  },
  setMode(e) {
    ri(e);
  }
};
class lo {
  constructor() {
    this.activeShortcuts = { ...vi }, this.isListenerBound = !1, this.storageListenerBound = !1, this.shortcutReadVersion = 0, this.initShortcuts();
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
    const { optionsService: n, SHORTCUT_STORAGE_KEY: a } = await import("./options.service-gZWq53jo.js").then((S) => S.g), g = (await chrome.storage.local.get(a))[a], f = { ...g || {}, [t]: o }, l = this.shortcutReadVersion, h = await n.saveSettings(
      { [a]: f },
      { [a]: g }
    );
    l === this.shortcutReadVersion && (++this.shortcutReadVersion, this.applyShortcutOverrides(h[a]));
  }
  applyShortcutOverrides(t) {
    const o = t && typeof t == "object" && !Array.isArray(t) ? Object.entries(t).filter((n) => Object.prototype.hasOwnProperty.call(vi, n[0]) && typeof n[1] == "string") : [];
    this.activeShortcuts = { ...vi, ...Object.fromEntries(o) };
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
    if (!t || !dn(t)) return !1;
    if (nt(t))
      return Oe.handleToolClick(t), !0;
    switch (t) {
      case "bookmarks":
        return ci.toggle(), !0;
      case "settings":
        return di.open(), !0;
      case "nav-wheel":
        return Ue.toggle(!0), !0;
      case "toolbox":
        return Ue.toggleTools(!0), !0;
      case "pricing":
        return Gt.enter("daily-pricing"), !0;
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
        if (en.active || t.defaultPrevented || t.isComposing || t.repeat || t.target && (t.target.matches("input, textarea, select") || t.target.isContentEditable) && !t.altKey && !t.ctrlKey && !t.metaKey)
          return;
        const n = ua(t);
        if (!n) return;
        const a = n.toLowerCase();
        for (const [r, g] of Object.entries(this.activeShortcuts))
          if (!(!g || !dn(r)) && g.toLowerCase().replace(/^cmd\+/, "meta+") === a) {
            t.preventDefault(), t.stopPropagation(), this.triggerToolShortcut(r);
            break;
          }
      },
      !0
    ));
  }
}
const Vi = lo.getInstance();
class co {
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
        } catch (n) {
          console.warn("[PageVisibility] callback error:", n);
        }
    });
  }
  static getInstance() {
    return co.instance || (co.instance = new co()), co.instance;
  }
  get isVisible() {
    return Wt(this._isVisible);
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
const sr = co.getInstance(), Ln = [
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
function Vo(e) {
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
    const { city: t, loc: o, d: n } = this.lastRawForecastData;
    this.applyForecastPayload(t, o, n);
  }
  applyForecastPayload(t, o, n) {
    const a = Vo(n.current?.weather_code ?? 0), r = Math.round(n.current?.temperature_2m ?? 0), g = n.hourly?.time || [], f = Date.now();
    let l = g.findIndex((x) => new Date(x).getTime() >= f);
    l < 0 && (l = 0);
    const h = [];
    for (let x = l; x < Math.min(l + 5, g.length); x++) {
      const N = x === l ? d("weather.now") : d("weather.hourSuffix", { hour: new Date(g[x]).getHours() }), j = Vo(n.hourly.weather_code[x]), Z = Math.round(n.hourly.temperature_2m[x]);
      h.push({ time: N, emoji: j.emoji, temp: Z });
    }
    let S = d("weather.noRain12h");
    for (let x = l; x < Math.min(l + 12, g.length); x++) {
      const N = n.hourly.weather_code[x], j = n.hourly.precipitation_probability?.[x] || 0;
      if (N >= 51 || j >= 60) {
        const Z = new Date(g[x]).getHours(), k = N >= 71 && N <= 77 || N === 85 || N === 86 ? d("weather.snow") : d("weather.rain"), L = j ? ` (${j}%)` : "";
        S = d("weather.expectPrecip", { time: `${Z}:00`, type: k, prob: L });
        break;
      }
    }
    const O = [d("weather.today"), d("weather.tomorrow"), d("weather.afterTomorrow")], v = [], I = n.daily?.time?.length || 0;
    for (let x = 1; x < Math.min(3, I); x++) {
      const N = O[x] || d("weather.plusDays", { count: x }), j = Vo(n.daily.weather_code[x]), Z = `${Math.round(n.daily.temperature_2m_max[x])}°/${Math.round(n.daily.temperature_2m_min[x])}°`;
      v.push({ label: N, emoji: j.emoji, tempRange: Z });
    }
    const m = Math.round(n.daily?.temperature_2m_max?.[0] ?? r), w = Math.round(n.daily?.temperature_2m_min?.[0] ?? r), M = d("weather.tempRange", { cond: a.label, max: m, min: w }), y = {
      cityName: o.name || t,
      currentEmoji: a.emoji,
      currentTemp: r,
      subText: M,
      rainText: S,
      hours: h,
      days: v
    };
    if (ct.ready(y, t), n.daily?.time) {
      const x = [
        d("weather.weekday.sun"),
        d("weather.weekday.mon"),
        d("weather.weekday.tue"),
        d("weather.weekday.wed"),
        d("weather.weekday.thu"),
        d("weather.weekday.fri"),
        d("weather.weekday.sat")
      ], N = [];
      for (let j = 0; j < n.daily.time.length; j++) {
        const Z = new Date(n.daily.time[j]), D = j === 0 ? d("weather.today") : j === 1 ? d("weather.tomorrow") : j === 2 ? d("weather.afterTomorrow") : x[Z.getDay()], k = Vo(n.daily.weather_code[j]);
        N.push({
          date: `${Z.getMonth() + 1}/${Z.getDate()}`,
          dayName: D,
          emoji: k.emoji,
          condition: k.label,
          highTemp: Math.round(n.daily.temperature_2m_max[j]),
          lowTemp: Math.round(n.daily.temperature_2m_min[j]),
          rainProb: n.daily.precipitation_probability_max?.[j] || 0
        });
      }
      ct.setForecastDays(N);
    }
    const _ = {
      humidity: n.current?.relative_humidity_2m ? `${n.current.relative_humidity_2m}%` : "60%",
      wind: n.current?.wind_speed_10m ? `${Math.round(n.current.wind_speed_10m)} km/h` : d("weather.detail.windLight"),
      uvIndex: d("weather.detail.uvNormal"),
      airQuality: d("weather.detail.airGood")
    };
    ct.setDetailInfo(_);
  }
  filterCities(t, o = 8) {
    const n = t.trim().toLowerCase();
    if (!n) return Ln.slice(0, o);
    const a = [];
    for (const r of Ln) {
      const g = r.name.toLowerCase(), f = r.pinyin.toLowerCase(), l = r.admin.toLowerCase();
      if ((g.startsWith(n) || f.startsWith(n) || g.includes(n) || f.includes(n) || l.includes(n)) && a.push(r), a.length >= o) break;
    }
    return a;
  }
  async loadWeather(t) {
    const o = (t || this.currentCity || "").trim();
    if (!o) {
      ct.unconfigured();
      return;
    }
    if (this.isRefreshing) return;
    this.isRefreshing = !0;
    const n = ++this.activeRequestId;
    ct.loading(o);
    try {
      const a = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(o)}&count=1&language=zh&format=json`, r = await fetch(a);
      if (n !== this.activeRequestId || q.state === "unconfigured") {
        this.isRefreshing = !1;
        return;
      }
      const f = (await r.json()).results?.[0];
      if (!f) {
        n === this.activeRequestId && q.state !== "unconfigured" && ct.notFound(o), this.isRefreshing = !1;
        return;
      }
      const l = `https://api.open-meteo.com/v1/forecast?latitude=${f.latitude}&longitude=${f.longitude}&current=temperature_2m,weather_code,relative_humidity_2m,wind_speed_10m&hourly=temperature_2m,weather_code,precipitation_probability&daily=temperature_2m_max,temperature_2m_min,weather_code,precipitation_probability_max&forecast_days=7&timezone=auto`, h = await fetch(l);
      if (n !== this.activeRequestId || q.state === "unconfigured") {
        this.isRefreshing = !1;
        return;
      }
      const S = await h.json();
      this.lastRawForecastData = { city: o, loc: f, d: S }, n === this.activeRequestId && q.state !== "unconfigured" && this.applyForecastPayload(o, f, S);
    } catch (a) {
      n === this.activeRequestId && q.state !== "unconfigured" && ct.error(a?.message || "天气加载失败，右键此处可重新选择地点。", o);
    } finally {
      n === this.activeRequestId && (this.isRefreshing = !1);
    }
  }
}
const to = uo.getInstance();
function ar(e, t) {
  window.LogicWeaverIntro = yt, window.LogicWeaverStartupIntro = yt, window.LogicWeaverNotifications = Le, window.LogicWeaverWindowManager = Oe, window.LogicWeaverWindowTabs = Oe, window.LogicWeaverDomFreezer = pa, window.LogicWeaverWallpaperService = ii, window.LogicWeaverLauncherService = Ae, window.LogicWeaverLauncherRuntime = Bi, window.LogicWeaverProfileService = vn;
  try {
    vn.init();
  } catch (o) {
    console.error("[ProfileService] init failed:", o);
  }
  window.LogicWeaverBookmarksService = qi, window.LogicWeaverCalendarService = ia, window.LogicWeaverWeather = ct, window.LogicWeaverWeatherService = to, window.LogicWeaverClock = ro, window.LogicWeaverSearch = Zs, window.LogicWeaverSearchService = Qs, Object.defineProperty(window, "LogicWeaverAiHotService", {
    configurable: !0,
    get: () => {
      import("./aihot.service-DHdofX6S.js").then(({ aiHotService: o }) => {
        window.LogicWeaverAiHotService = o;
      });
    }
  }), window.LogicWeaverHomeMusic = Ze, window.LogicWeaverLauncherGroups = Ke, window.LogicWeaverProfileMenu = No, window.LogicWeaverWorkspaceLaunchers = on, window.LogicWeaverMacDock = xt, window.LogicWeaverFullscreen = Gt, window.enterFullscreenCard = (o) => Gt.enter(o), window.exitFullscreenCard = () => Gt.exit(), window.cycleFullscreenCard = () => Gt.cycle(), window.LogicWeaverPageVisibility = sr, window.LogicWeaverBackgroundLibrary = hn, window.LogicWeaverNotificationCenter = Pt, window.LogicWeaverBookmarkMenu = Ji, window.LogicWeaverBookmarkPanel = ci, window.LogicWeaverBookmarkFolderStrip = ni, window.LogicWeaverLauncherDialogs = Fn, window.LogicWeaverLauncherFolder = Hn, window.LogicWeaverLauncherMenus = Qi, window.LogicWeaverSettings = di, window.LogicWeaverClockSettings = Vt, window.LogicWeaverBiliTheater = Do, window.LogicWeaverBilibiliService = rn, window.getBiliJct = () => rn.getBiliJct(), window.LogicWeaverBiliMiniPlayer = Fi, window.openBiliMiniPlayer = (o) => Fi.openVideo(o), window.LogicWeaverAiDialog = nn, window.LogicWeaverAihotViewer = tn, window.LogicWeaverNavWheel = Ee, window.openNavWheel = (o, n) => Ue.open(o, n), window.closeNavWheel = () => Ue.close(), window.toggleNavWheel = (o) => Ue.toggle(o), window.toggleToolWheel = (o) => Ue.toggleTools(o), window.setNavWheelMode = (o) => Ue.setMode(o), window.LogicWeaverShortcuts = Vi, window.triggerToolShortcut = (o) => Vi.triggerToolShortcut(o), window.LogicWeaverCommands = e, window.LogicWeaverFeatures = t, window.LogicWeaverCalendarView = na, window.LogicWeaverGitHubStatus = Zi, window.LogicWeaverGitHubFolders = no, window.LogicWeaverGitHubHero = Io, window.LogicWeaverGitHubRepositories = At, window.LogicWeaverGitHubBatchBar = Mo, window.LogicWeaverTodoistLabels = sa, window.LogicWeaverTodoistWorkspace = aa, window.LogicWeaverTodoistCalendarSidebar = ra, window.LogicWeaverTodoistTaskList = la, window.LogicWeaverBiliMessagePanel = zt, window.LogicWeaverStickerBoard = ma, window.LogicWeaverStickersService = va, window.LogicWeaverPricing = Gn, window.LogicWeaverBiliFavorites = Kn, window.LogicWeaverBiliRadioTape = ka, window.LogicWeaverBiliOrganizerDialogs = ya, window.LogicWeaverBiliUpGroupManager = wa, window.LogicWeaverBiliUpPreview = ti, window.LogicWeaverYouTube = Vn, window.LogicWeaverAihotFeed = zn, window.LogicWeaverGitHubTrending = ts, window.LogicWeaverCalendarWorkspace = ao, window.LogicWeaverCalendar = ao, window.LogicWeaverTodoistMainWorkspace = ca, window.LogicWeaverTodoistTaskDetail = Ga, window.openBiliTheater = (o) => Do.openVideo(o), window.closeBiliTheater = () => Do.close(), window.showWindowsToast = (o) => {
    if (!o) return null;
    const n = mi(o.target) || ln(o.url) || (o.appType === "bili" ? Hs([o.title, o.subtitle, o.message].filter((a) => typeof a == "string").join(" ")) : void 0);
    return Le.show({
      ...o,
      target: n,
      onClick: () => {
        if (typeof o?.onClick == "function") return o.onClick();
        if (n) return Pt.openTarget(n);
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
    const r = typeof n == "object" && n ? n : a, g = typeof n == "number" ? n : 3200, f = r.isError || /失败|错误|异常|未获取|未找到/i.test(o), l = r.title || (f ? "B站操作未完成" : "哔哩哔哩"), h = r.subtitle || (o.length > 36 ? "" : o), S = r.message || (r.subtitle || o.length > 36 ? o : ""), O = {
      id: r.id || `bili_toast_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      appType: "bili",
      appName: "哔哩哔哩",
      icon: "assets/bilibili.svg",
      title: l,
      subtitle: h || o,
      message: S && S !== h ? S : "",
      showActions: !!(r.showActions || r.actionLabel),
      actionLabel: r.actionLabel || "",
      onClick: r.onClick || null,
      target: mi(r.target) || ln(r.url) || mi({ type: "bili-video", bvid: r.bvid, aid: r.aid ? String(r.aid) : void 0 }),
      url: r.url,
      duration: Math.max(3e3, g)
    };
    return window.showWindowsToast(O);
  }, window.showFetchToast = (o, n, a = "", r = "assets/logo.png", g = 3200) => window.showWindowsToast({
    appName: o,
    title: n,
    subtitle: a,
    icon: r || "assets/logo.png",
    duration: g,
    showActions: !1,
    actionLabel: "",
    appType: "fetch"
  }), window.LogicWeaverKineticDrag = xa, window.LogicWeaverMarkdownAst = La, window.setLauncherBackground = (o) => ii.setWallpaper(o), window.backgroundDbClear = (o) => js(o), window.openBackgroundHistory = () => hn.openDialog();
}
const je = $e({
  isOpen: !1,
  query: "",
  selectedIndex: 0
});
let Uo = null;
const as = {
  get state() {
    return je;
  },
  open() {
    je.isOpen || (je.isOpen = !0, je.query = "", je.selectedIndex = 0, Uo = Oe.pushModalCloser(() => (this.close(), !0)));
  },
  close() {
    je.isOpen && (je.isOpen = !1, je.query = "", je.selectedIndex = 0, Uo && (Uo(), Uo = null));
  },
  toggle() {
    je.isOpen ? this.close() : this.open();
  },
  setQuery(e) {
    je.query = e, je.selectedIndex = 0;
  },
  selectNext(e) {
    e <= 0 || (je.selectedIndex = (je.selectedIndex + 1) % e);
  },
  selectPrev(e) {
    e <= 0 || (je.selectedIndex = (je.selectedIndex - 1 + e) % e);
  },
  async executeCommand(e) {
    this.close();
    try {
      await ui.execute(e.id, void 0, "command-palette");
    } catch (t) {
      console.warn(`[CommandPalette] Failed to execute ${e.id}:`, t);
    }
  }
};
typeof window < "u" && window.addEventListener("keydown", (e) => {
  if (en.active || e.defaultPrevented || e.isComposing || e.repeat) return;
  const t = (e.key || "").toLowerCase(), o = (e.ctrlKey || e.metaKey) && t === "k", n = e.altKey && (e.code === "Space" || t === " ");
  (o || n) && (e.preventDefault(), e.stopPropagation(), as.toggle());
}, !0);
function rr(e) {
  e.register({
    id: "palette.toggle",
    title: "打开全局命令中心 (Spotlight)",
    category: "界面",
    keywords: ["命令", "palette", "spotlight", "raycast", "搜索", "cmd"],
    concurrency: "drop",
    run: () => as.toggle()
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
    enabled: () => ao.ready,
    run: () => ao.refresh()
  }), e.register({
    id: "calendar.today",
    title: "日历跳转到今天",
    category: "日历",
    keywords: ["今日", "today", "日期"],
    concurrency: "drop",
    enabled: () => ao.ready,
    run: () => ao.goToday()
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
const lr = {
  key: 0,
  id: "guest-preview-banner",
  class: "guest-preview-banner",
  role: "alert",
  "aria-label": "新用户开箱视角预览提示"
}, cr = /* @__PURE__ */ fe({
  __name: "GuestPreviewBanner",
  setup(e) {
    function t() {
      zs.exit();
    }
    return (o, n) => (c(), he(Ns, { name: "guest-banner-slide" }, {
      default: Tt(() => [
        s(Ks) ? (c(), p("aside", lr, [
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
}), dr = /* @__PURE__ */ Pe(cr, [["__scopeId", "data-v-a2f2ca5f"]]), ur = ["hidden"], pr = {
  key: 0,
  class: "bookmark-folder-strip-empty"
}, hr = ["title", "data-bookmark-folder-id", "onClick", "onContextmenu"], fr = /* @__PURE__ */ fe({
  __name: "BookmarkFolderStrip",
  setup(e) {
    const t = z(null);
    function o(r) {
      const g = t.value;
      !g || g.scrollWidth <= g.clientWidth || !r.deltaY || (r.preventDefault(), g.scrollLeft += r.deltaY);
    }
    function n(r) {
      ni.openFolder(r.id);
    }
    function a(r, g) {
      ni.openContextMenu(g, r.clientX, r.clientY);
    }
    return (r, g) => (c(), p("nav", {
      id: "bookmark-folder-strip",
      ref_key: "stripRef",
      ref: t,
      class: "bookmark-folder-strip",
      "aria-label": "书签栏文件夹",
      hidden: !s(so).enabled,
      onWheel: o
    }, [
      s(so).folders.length ? E("", !0) : (c(), p("span", pr, u(s(so).emptyMessage || "书签栏没有文件夹"), 1)),
      (c(!0), p(ee, null, be(s(so).folders, (f) => (c(), p("button", {
        key: f.id,
        class: "bookmark-folder-chip",
        type: "button",
        title: `打开书签文件夹：${f.title || "未命名"}`,
        "data-bookmark-folder-id": f.id,
        onClick: (l) => n(f),
        onContextmenu: V((l) => a(l, f), ["prevent"])
      }, [
        g[0] || (g[0] = i("span", { "aria-hidden": "true" }, "📁", -1)),
        i("span", null, u(f.title || "未命名"), 1)
      ], 40, hr))), 128))
    ], 40, ur));
  }
}), gr = /* @__PURE__ */ Pe(fr, [["__scopeId", "data-v-5e71cc7c"]]), mr = ["aria-label"], vr = { class: "cube-manager-body" }, yr = ["disabled", "onClick", "title"], wr = ["disabled", "onClick", "title"], br = ["onClick"], kr = ["onClick"], _r = ["onClick"], Cr = ["type", "placeholder"], xr = { type: "submit" }, Lr = {
  key: 0,
  role: "alert"
}, $r = /* @__PURE__ */ fe({
  __name: "CubeConfigDialog",
  setup(e) {
    const t = Be.state, o = te(() => Be.getActiveFaces()), n = te(() => t.registeredFaces.filter((I) => !t.activeFaceIds.includes(I.id))), a = z(""), r = z("memo"), g = te(() => [
      { value: "memo", label: d("cube.manager.typeMemo"), icon: "📝" },
      { value: "countdown", label: d("cube.manager.typeCountdown"), icon: "⏳" },
      { value: "link", label: d("cube.manager.typeLink"), icon: "🔗" }
    ]), f = z(""), l = z(!1), h = z(JSON.stringify({ title: "每日一句", icon: "📝", customType: "memo", customData: { text: "今天也要记得休息" } }, null, 2)), S = z("");
    function O(I) {
      S.value = "";
      try {
        I();
      } catch (m) {
        S.value = m instanceof Error ? m.message : "操作失败";
      }
    }
    function v() {
      O(() => {
        const I = l.value ? JSON.parse(h.value) : {
          title: a.value,
          customType: r.value,
          customData: { text: f.value, targetDate: f.value, url: f.value }
        };
        Be.addCustomFace(I), a.value = "", f.value = "";
      });
    }
    return (I, m) => (c(), he(wt, { to: "body" }, [
      s(t).isConfigDialogOpen ? (c(), p("section", {
        key: 0,
        class: "cube-manager",
        role: "dialog",
        "aria-label": s(d)("cube.manager.title"),
        onKeydown: m[8] || (m[8] = Po(V((w) => s(Be).closeConfigDialog(), ["stop"]), ["esc"]))
      }, [
        i("header", null, [
          i("strong", null, u(s(d)("cube.manager.title")), 1),
          i("button", {
            type: "button",
            "aria-label": "关闭",
            onClick: m[0] || (m[0] = (w) => s(Be).closeConfigDialog())
          }, "×")
        ]),
        i("div", vr, [
          i("p", null, u(s(d)("cube.manager.desc")), 1),
          (c(!0), p(ee, null, be(o.value, (w, M) => (c(), p("div", {
            key: w.id,
            class: "cube-row"
          }, [
            i("span", null, u(w.icon) + " " + u(w.title), 1),
            i("button", {
              type: "button",
              disabled: M === 0,
              onClick: (y) => O(() => s(Be).moveUp(w.id)),
              title: s(d)("cube.manager.moveUp")
            }, "↑", 8, yr),
            i("button", {
              type: "button",
              disabled: M === o.value.length - 1,
              onClick: (y) => O(() => s(Be).moveDown(w.id)),
              title: s(d)("cube.manager.moveDown")
            }, "↓", 8, wr),
            i("button", {
              type: "button",
              onClick: (y) => O(() => s(Be).removeCustomFace(w.id))
            }, u(s(d)("cube.manager.removeFace")), 9, br)
          ]))), 128)),
          (c(!0), p(ee, null, be(n.value, (w) => (c(), p("div", {
            key: w.id,
            class: "cube-row"
          }, [
            i("span", null, u(w.title) + u(s(d)("cube.manager.inactiveSuffix")), 1),
            i("button", {
              type: "button",
              onClick: (M) => O(() => s(Be).toggleActive(w.id, !0))
            }, u(s(d)("cube.manager.add")), 9, kr),
            w.builtIn ? E("", !0) : (c(), p("button", {
              key: 0,
              type: "button",
              onClick: (M) => O(() => s(Be).removeCustomFace(w.id))
            }, u(s(d)("cube.manager.delete")), 9, _r))
          ]))), 128)),
          i("h3", null, u(s(d)("cube.manager.addFace")), 1),
          i("label", null, [
            et(i("input", {
              "onUpdate:modelValue": m[1] || (m[1] = (w) => l.value = w),
              type: "checkbox"
            }, null, 512), [
              [Os, l.value]
            ]),
            tt(" " + u(s(d)("cube.manager.pasteJson")), 1)
          ]),
          i("form", {
            onSubmit: V(v, ["prevent"])
          }, [
            l.value ? (c(), p(ee, { key: 1 }, [
              i("p", null, u(s(d)("cube.manager.securityNotice")), 1),
              et(i("textarea", {
                "onUpdate:modelValue": m[6] || (m[6] = (w) => h.value = w),
                rows: "9",
                maxlength: "10000",
                "aria-label": "面的 JSON 配置",
                spellcheck: "false"
              }, null, 512), [
                [ho, h.value]
              ])
            ], 64)) : (c(), p(ee, { key: 0 }, [
              i("label", null, [
                tt(u(s(d)("cube.manager.fieldTitle")), 1),
                et(i("input", {
                  "onUpdate:modelValue": m[2] || (m[2] = (w) => a.value = w),
                  maxlength: "60",
                  required: ""
                }, null, 512), [
                  [ho, a.value]
                ])
              ]),
              i("label", null, [
                tt(u(s(d)("cube.manager.fieldType")) + " ", 1),
                X(Rn, {
                  modelValue: r.value,
                  "onUpdate:modelValue": m[3] || (m[3] = (w) => r.value = w),
                  options: g.value,
                  size: "sm",
                  onChange: m[4] || (m[4] = (w) => r.value = w)
                }, null, 8, ["modelValue", "options"])
              ]),
              i("label", null, [
                tt(u(s(d)("cube.manager.fieldContent")), 1),
                et(i("input", {
                  "onUpdate:modelValue": m[5] || (m[5] = (w) => f.value = w),
                  type: r.value === "countdown" ? "date" : "text",
                  placeholder: r.value === "link" ? "https://…" : s(d)("cube.manager.contentPlaceholderText"),
                  maxlength: "500",
                  required: ""
                }, null, 8, Cr), [
                  [Bs, f.value]
                ])
              ])
            ], 64)),
            i("button", xr, u(s(d)("cube.manager.submitAdd")), 1)
          ], 32),
          S.value ? (c(), p("p", Lr, u(S.value), 1)) : E("", !0)
        ]),
        i("footer", null, [
          i("button", {
            type: "button",
            onClick: m[7] || (m[7] = (w) => O(() => s(Be).resetDefaults()))
          }, u(s(d)("cube.manager.resetDefault")), 1),
          i("small", null, u(s(d)("cube.manager.resetNotice")), 1)
        ])
      ], 40, mr)) : E("", !0)
    ]));
  }
}), Sr = /* @__PURE__ */ Pe($r, [["__scopeId", "data-v-8ab459ee"]]), Tr = ["data-face"], Ir = ["aria-label"], Mr = { class: "ms-top-side" }, Dr = ["title"], Ar = ["title"], Er = ["title"], Pr = {
  key: 0,
  class: "ms-top-meta"
}, Wr = {
  class: "ms-top-title",
  style: { color: "#10b981", "font-weight": "700" }
}, Rr = { class: "ms-top-artist" }, Nr = { class: "ms-top-meta" }, Or = ["title"], Br = ["title"], Fr = {
  key: 0,
  class: "ms-top-divider"
}, Hr = ["title"], jr = { class: "ms-top-mini-progress" }, Kr = { class: "ms-top-side" }, zr = ["title"], Gr = ["title"], Vr = ["aria-label"], Ur = ["title"], Yr = { class: "ms-cube-custom-icon" }, Xr = { class: "ms-cube-custom-title" }, qr = ["title"], Jr = {
  key: 1,
  class: "ms-cube-custom-text countdown"
}, Zr = ["href"], Qr = {
  class: "ms-cube-dots",
  "aria-hidden": "true"
}, el = ["title", "onClick"], tl = { class: "ms-cube-cm-header" }, ol = { class: "ms-cube-cm-list" }, il = ["onClick"], nl = { class: "ms-cube-cm-icon" }, sl = { class: "ms-cube-cm-title" }, al = {
  key: 0,
  class: "ms-cube-cm-check"
}, rl = /* @__PURE__ */ fe({
  __name: "TopInfoCube",
  props: {
    active: { type: Boolean, default: !0 }
  },
  setup(e) {
    const t = e, o = te(() => Nn.visible || ft.djModalOpen || ft.isActive && ft.isJoined), n = te(() => ft.isActive && ft.isJoined), a = te(() => Be.getActiveFaces()), r = z("music"), g = z(0);
    let f = !1, l;
    Ne(
      () => a.value,
      (K) => {
        K.some((B) => B.id === r.value) || (r.value = K[0]?.id || "");
      },
      { immediate: !0 }
    );
    const h = te(() => a.value.filter((K) => !K.builtIn)), S = z(!1), O = z({ x: 0, y: 0 });
    Ne(() => t.active, (K) => {
      K || (S.value = !1, Be.closeConfigDialog(), clearTimeout(l), f = !1);
    }, { immediate: !0 });
    const { menuRef: v, style: I } = Un({
      visible: () => S.value,
      anchor: () => O.value,
      dismiss: () => {
        S.value = !1;
      }
    });
    function m(K) {
      K.preventDefault(), K.stopPropagation(), O.value = { x: K.clientX, y: K.clientY }, S.value = !0;
    }
    function w(K) {
      T(K), S.value = !1;
    }
    function M() {
      S.value = !1, Be.openConfigDialog();
    }
    function y() {
      S.value = !1, _(() => Be.resetDefaults()), T("music");
    }
    function _(K) {
      S.value = !1;
      try {
        K();
      } catch (B) {
        Le.show({ appName: "滚动立方体", title: "保存失败", message: B instanceof Error ? B.message : "请检查浏览器存储" });
      }
    }
    function x(K) {
      if (!K) return d("cube.countdown.noTarget");
      const G = new Date(K).getTime() - L.value, ve = Math.ceil(G / (1e3 * 60 * 60 * 24));
      return ve > 0 ? d("cube.countdown.remaining", { days: ve }) : ve === 0 ? d("cube.countdown.today") : d("cube.countdown.passed", { days: Math.abs(ve) });
    }
    const N = te(() => !oe.title || oe.title === "点击播放" ? d("home.music.defaultTitle") : oe.title), j = te(() => !oe.artist || oe.artist === "作者" ? d("home.music.defaultArtist") : oe.artist), Z = te(() => oe.isBiliRadio ? d("cube.source.biliRadio") : oe.isNetease ? d("cube.source.netease") : oe.playing ? d("cube.source.siren") : d("cube.source.idle")), D = te(() => oe.currentLyric ? oe.currentLyric : oe.playing ? d("cube.defaultPlayingLyric") : d("cube.defaultIdleLyric"));
    function k() {
      Oe.handleToolClick("music");
    }
    const L = z(Date.now());
    let Q;
    Ne(() => t.active && a.value.some((K) => K.id === r.value && K.customType === "countdown"), (K) => {
      K && (L.value = Date.now()), clearInterval(Q), Q = K ? window.setInterval(() => {
        document.hidden || (L.value = Date.now());
      }, 6e4) : void 0;
    }, { immediate: !0 });
    function T(K, B = null) {
      const G = a.value, ve = G.find((xe) => xe.id === K) || G[0];
      if (ve) {
        if (Number.isFinite(B))
          g.value = B;
        else if (ve.id !== r.value) {
          const xe = G.findIndex((ke) => ke.id === r.value);
          let we = (G.findIndex((ke) => ke.id === ve.id) - xe + G.length) % G.length;
          we > G.length / 2 && (we -= G.length), g.value += we * 90;
        }
        r.value = ve.id;
      }
    }
    function H(K) {
      const B = a.value;
      if (B.length <= 1) return;
      const G = B.findIndex((we) => we.id === r.value), xe = ((G >= 0 ? G : 0) + K + B.length) % B.length, Ie = B[xe];
      Ie && T(Ie.id, g.value + K * 90);
    }
    function R(K) {
      a.value.length <= 1 || K.altKey || Math.abs(K.deltaY) < 2 || (K.preventDefault(), !f && (f = !0, H(K.deltaY > 0 ? 1 : -1), l = setTimeout(() => {
        f = !1;
      }, 420)));
    }
    function Y(K) {
      !["ArrowUp", "ArrowDown", "PageUp", "PageDown"].includes(K.key) || K.target?.closest?.("input") || (K.preventDefault(), H(["ArrowDown", "PageDown"].includes(K.key) ? 1 : -1));
    }
    function ge(K, B) {
      return r.value === K ? {
        transform: `rotateX(${-g.value}deg) translateZ(22px)`,
        visibility: "visible"
      } : {
        transform: `rotateX(-${B}deg) translateZ(22px)`,
        visibility: "hidden"
      };
    }
    function _e(K) {
      const B = K.target;
      B && (B.tagName === "INPUT" || B.tagName === "TEXTAREA" || B.isContentEditable) || (K.preventDefault(), K.stopPropagation());
    }
    function ze(K) {
      const B = K.target;
      B && (B.tagName === "INPUT" || B.tagName === "TEXTAREA" || B.isContentEditable) || K.preventDefault();
    }
    return Rt(() => {
      clearInterval(Q), clearTimeout(l);
    }), (K, B) => et((c(), p("div", {
      class: "ms-top-player",
      "data-face": r.value,
      tabindex: "0",
      title: "滚动立方体 · 滚轮切换面板，右键可自由增删与排序",
      "aria-label": "滚动立方体",
      onWheel: R,
      onKeydown: Y,
      onContextmenu: m,
      onCopy: _e,
      onSelectstart: ze
    }, [
      a.value.length ? E("", !0) : (c(), p("button", {
        key: 0,
        type: "button",
        class: "ms-cube-cm-action",
        onClick: M
      }, "＋ 添加面（右键管理）")),
      i("div", {
        class: "ms-top-cube",
        style: Te({ transform: `translateZ(-22px) rotateX(${g.value}deg)` })
      }, [
        s(Be).isActive("music") && r.value === "music" ? (c(), p("section", {
          key: 0,
          class: "ms-top-face ms-top-face-music",
          "aria-label": s(d)("cube.musicFaceAria"),
          style: Te(ge("music", 0))
        }, [
          i("div", Mr, [
            i("button", {
              class: "ms-top-prev",
              title: s(d)("cube.prevTrack"),
              type: "button",
              onClick: B[0] || (B[0] = V((G) => s(Ze).prev(), ["stop"]))
            }, "⏮", 8, Dr),
            i("button", {
              class: "ms-top-play",
              title: s(d)("cube.playPause"),
              type: "button",
              onClick: B[1] || (B[1] = V((G) => s(Ze).togglePlay(), ["stop"]))
            }, u(s(oe).playing ? "⏸" : "▶"), 9, Ar)
          ]),
          i("button", {
            class: "ms-top-main",
            title: s(d)("cube.openMusicPicker"),
            type: "button",
            onClick: V(k, ["stop"])
          }, [
            o.value ? (c(), p("div", Pr, [
              i("span", Wr, " 🎧 " + u(n.value ? s(d)("cube.listeningTogether") : s(d)("cube.listening")) + "：" + u(N.value), 1),
              i("span", Rr, u(j.value), 1)
            ])) : (c(), p(ee, { key: 1 }, [
              i("div", Nr, [
                i("span", {
                  class: "ms-top-title",
                  title: N.value
                }, u(N.value), 9, Or),
                i("span", {
                  class: "ms-top-artist",
                  title: j.value
                }, u(j.value), 9, Br),
                i("span", {
                  class: de(["ms-top-source", { idle: !s(oe).playing }])
                }, u(Z.value), 3),
                D.value ? (c(), p("span", Fr)) : E("", !0)
              ]),
              D.value ? (c(), p("span", {
                key: 0,
                class: "ms-top-lyric",
                title: D.value
              }, u(D.value), 9, Hr)) : E("", !0)
            ], 64)),
            i("div", jr, [
              i("div", {
                class: "ms-top-mini-fill",
                style: Te({ width: s(oe).progressPercent + "%" })
              }, null, 4)
            ])
          ], 8, Er),
          i("div", Kr, [
            i("button", {
              class: "ms-top-next",
              title: s(d)("cube.nextTrack"),
              type: "button",
              onClick: B[2] || (B[2] = V((G) => s(Ze).next(), ["stop"]))
            }, "⏭", 8, zr),
            i("button", {
              class: "ms-top-open",
              title: s(d)("cube.openPlaylist"),
              type: "button",
              onClick: V(k, ["stop"])
            }, "🎵", 8, Gr)
          ])
        ], 12, Ir)) : E("", !0),
        (c(!0), p(ee, null, be(h.value, (G, ve) => (c(), p("section", {
          key: G.id,
          class: "ms-top-face ms-top-face-custom",
          "aria-label": G.title,
          style: Te(ge(G.id, (ve + 1) * 90))
        }, [
          r.value === G.id ? (c(), p("div", {
            key: 0,
            class: "ms-cube-custom-body",
            title: G.desc
          }, [
            i("span", Yr, u(G.icon), 1),
            i("strong", Xr, u(G.title), 1),
            B[10] || (B[10] = i("span", { class: "ms-cube-divider" }, null, -1)),
            G.customType === "memo" ? (c(), p("span", {
              key: 0,
              class: "ms-cube-custom-text",
              title: G.customData?.text
            }, u(G.customData?.text || s(d)("cube.memo.clickToConfig")), 9, qr)) : G.customType === "countdown" ? (c(), p("span", Jr, u(x(G.customData?.targetDate)), 1)) : G.customType === "link" ? (c(), p("a", {
              key: 2,
              href: G.customData?.url,
              target: "_blank",
              rel: "noreferrer",
              class: "ms-cube-custom-link",
              onClick: B[3] || (B[3] = V(() => {
              }, ["stop"]))
            }, u(G.customData?.url) + " ↗ ", 9, Zr)) : E("", !0)
          ], 8, Ur)) : E("", !0),
          i("button", {
            type: "button",
            class: "ms-cube-config-trigger",
            title: "管理立方体面",
            onClick: B[4] || (B[4] = V((xe) => s(Be).openConfigDialog(), ["stop"]))
          }, " ⚙ ")
        ], 12, Vr))), 128))
      ], 4),
      i("div", Qr, [
        (c(!0), p(ee, null, be(a.value, (G) => (c(), p("i", {
          key: G.id,
          class: de({ on: r.value === G.id }),
          title: G.title,
          onClick: V((ve) => T(G.id), ["stop"])
        }, null, 10, el))), 128))
      ]),
      (c(), he(wt, { to: "body" }, [
        t.active && S.value ? (c(), p("div", {
          key: 0,
          ref_key: "menuRef",
          ref: v,
          class: "ms-cube-context-menu",
          style: Te(s(I)),
          onClick: B[9] || (B[9] = V(() => {
          }, ["stop"]))
        }, [
          i("div", tl, [
            B[11] || (B[11] = i("span", null, "🎲 滚动立方体面", -1)),
            i("button", {
              type: "button",
              class: "ms-cube-cm-close",
              onClick: B[5] || (B[5] = (G) => S.value = !1)
            }, "×")
          ]),
          i("div", ol, [
            (c(!0), p(ee, null, be(a.value, (G) => (c(), p("button", {
              key: G.id,
              type: "button",
              class: de(["ms-cube-cm-item", { active: r.value === G.id }]),
              onClick: (ve) => w(G.id)
            }, [
              i("span", nl, u(G.icon), 1),
              i("span", sl, u(G.title), 1),
              r.value === G.id ? (c(), p("span", al, "✓")) : E("", !0)
            ], 10, il))), 128))
          ]),
          B[16] || (B[16] = i("div", { class: "ms-cube-cm-divider" }, null, -1)),
          i("button", {
            type: "button",
            class: "ms-cube-cm-action",
            onClick: M
          }, [...B[12] || (B[12] = [
            i("span", null, "＋ 添加面 / 管理面", -1)
          ])]),
          i("button", {
            type: "button",
            class: "ms-cube-cm-action",
            onClick: B[6] || (B[6] = (G) => {
              H(-1), S.value = !1;
            })
          }, [...B[13] || (B[13] = [
            i("span", null, "⏮ 上一个面板", -1)
          ])]),
          i("button", {
            type: "button",
            class: "ms-cube-cm-action",
            onClick: B[7] || (B[7] = (G) => {
              H(1), S.value = !1;
            })
          }, [...B[14] || (B[14] = [
            i("span", null, "⏭ 下一个面板", -1)
          ])]),
          r.value ? (c(), p("button", {
            key: 0,
            type: "button",
            class: "ms-cube-cm-action danger",
            onClick: B[8] || (B[8] = (G) => _(() => s(Be).removeCustomFace(r.value)))
          }, "删除当前面")) : E("", !0),
          i("button", {
            type: "button",
            class: "ms-cube-cm-action danger",
            onClick: y
          }, [...B[15] || (B[15] = [
            i("span", null, "↺ 恢复默认（仅音乐）", -1)
          ])])
        ], 4)) : E("", !0)
      ])),
      t.active ? (c(), he(Sr, { key: 1 })) : E("", !0)
    ], 40, Tr)), [
      [fo, t.active]
    ]);
  }
}), ll = /* @__PURE__ */ Pe(rl, [["__scopeId", "data-v-591e9de8"]]), To = $e({
  isOpen: !1
}), rs = {
  open() {
    To.isOpen = !0;
  },
  close() {
    To.isOpen = !1;
  },
  toggle() {
    To.isOpen = !To.isOpen;
  }
}, Ui = Wt(To);
function cl() {
  if (typeof chrome > "u" || !chrome.runtime?.onMessage) return () => {
  };
  let e = !1, t;
  const o = (n, a, r) => {
    a.id !== chrome.runtime.id || n?.type !== "TOGGLE_SIDE_DRAWER" || t === void 0 || n.targetTabId !== t || (rs.toggle(), r({ ok: !0 }));
  };
  return chrome.tabs.getCurrent().then((n) => {
    e || (t = n?.id, chrome.runtime.onMessage.addListener(o));
  }).catch(() => console.warn("[SideDrawer] Could not bind the home-page command.")), () => {
    e = !0, chrome.runtime.onMessage.removeListener(o);
  };
}
const dl = { class: "tb-brand" }, ul = ["title", "aria-expanded", "aria-label"], pl = ["src", "alt"], hl = ["hidden"], fl = ["title", "hidden"], gl = { id: "vue-bookmark-folder-strip-root" }, ml = { class: "tb-actions" }, vl = {
  id: "workspace-launchers",
  hidden: ""
}, yl = ["title", "aria-expanded"], wl = ["title"], bl = /* @__PURE__ */ fe({
  __name: "AppTopBar",
  setup(e) {
    const t = U(() => import("./WorkspaceLaunchers-XP1E5qMS.js"));
    function o(l) {
      l.preventDefault(), l.stopPropagation();
      const h = typeof window < "u" ? window : null;
      h?.LogicWeaverWindowManager?.open ? h.LogicWeaverWindowManager.open("settings") : h?.LogicWeaverWindowTabs?.open ? h.LogicWeaverWindowTabs.open("settings") : di.open();
    }
    function n(l) {
      l.preventDefault();
      const h = typeof window < "u" ? window : null;
      typeof h?.toggleBookmarkPanel == "function" ? h.toggleBookmarkPanel() : h?.LogicWeaverBookmarkPanel?.toggle ? h.LogicWeaverBookmarkPanel.toggle() : qi.toggleBookmarkPanel();
    }
    function a(l) {
      l.preventDefault(), Pt.toggle();
    }
    function r(l) {
      l.preventDefault(), No.open(l.clientX, l.clientY);
    }
    function g(l) {
      const h = l.target;
      h && (h.tagName === "INPUT" || h.tagName === "TEXTAREA" || h.isContentEditable) || (l.preventDefault(), l.stopPropagation());
    }
    function f(l) {
      const h = l.target;
      h && (h.tagName === "INPUT" || h.tagName === "TEXTAREA" || h.isContentEditable) || l.preventDefault();
    }
    return Ye(() => {
      Pt.start();
      const l = localStorage.getItem("theme") || "light";
      document.documentElement.dataset.theme = l, document.documentElement.setAttribute("data-theme", l);
    }), (l, h) => (c(), p("header", {
      class: de(["topbar", { "bookmark-folders-mode": s(so).enabled }]),
      onCopy: g,
      onSelectstart: f
    }, [
      i("div", dl, [
        i("button", {
          id: "bili-profile-button",
          class: "bili-profile-button",
          type: "button",
          title: s(d)("topbar.notifications"),
          "aria-controls": "notification-center",
          "aria-expanded": s(On).isOpen,
          "aria-label": s(bo) ? s(d)("topbar.notificationsUnread", { count: s(bo) }) : s(d)("topbar.notifications"),
          onClick: a,
          onContextmenu: h[0] || (h[0] = V((S) => r(S), ["prevent"]))
        }, [
          i("img", {
            id: "bili-profile-avatar",
            src: s(oo).avatarUrl || "assets/bilibili.svg",
            alt: s(oo).userName || s(d)("topbar.notifications")
          }, null, 8, pl),
          i("span", {
            id: "bili-profile-badge",
            class: "bili-profile-badge",
            hidden: s(bo) <= 0
          }, u(s(bo) > 99 ? "99+" : s(bo)), 9, hl)
        ], 40, ul),
        i("button", {
          id: "bookmark-handle",
          class: "bookmark-handle",
          type: "button",
          "aria-expanded": "false",
          title: s(d)("topbar.bookmarks"),
          hidden: s(so).enabled,
          onClick: n
        }, [
          h[2] || (h[2] = i("span", { id: "bookmark-handle-icon" }, "📁", -1)),
          i("span", null, u(s(d)("topbar.bookmarks")), 1)
        ], 8, fl),
        i("div", gl, [
          X(gr)
        ])
      ]),
      X(ll, {
        active: !s(vt).activeId
      }, null, 8, ["active"]),
      i("div", ml, [
        h[3] || (h[3] = i("button", {
          id: "daily-toggle",
          class: "tb-pill",
          type: "button",
          hidden: "",
          title: "查看日报"
        }, "📰 日报", -1)),
        i("span", vl, [
          X(s(t))
        ]),
        i("button", {
          id: "side-drawer-toggle",
          class: de(["tb-btn", { active: s(Ui).isOpen }]),
          type: "button",
          title: s(d)("topbar.sidebar"),
          "aria-controls": "in-page-side-drawer",
          "aria-expanded": s(Ui).isOpen,
          onClick: h[1] || (h[1] = (S) => s(rs).toggle())
        }, " 📑 ", 10, yl),
        i("button", {
          id: "settings-open",
          class: "tb-btn",
          title: s(d)("topbar.settings"),
          onClick: o
        }, "⚙", 8, wl)
      ])
    ], 34));
  }
}), kl = {
  key: 0,
  class: "notice"
}, _l = {
  key: 1,
  class: "muted small"
}, Cl = {
  key: 2,
  class: "notice"
}, xl = {
  key: 3,
  class: "notice"
}, Ll = { class: "wx-cur" }, $l = { class: "wx-emoji" }, Sl = { class: "wx-temp" }, Tl = { class: "wx-sub" }, Il = { class: "wx-rain" }, Ml = { class: "wx-hours" }, Dl = { class: "hh" }, Al = { class: "he" }, El = { class: "ht" }, Pl = { class: "wx-days" }, Wl = ["open"], Rl = { class: "weather-forecast-head" }, Nl = { class: "weather-forecast-city-info" }, Ol = { class: "weather-forecast-icon" }, Bl = { id: "weather-forecast-city-title" }, Fl = { class: "small muted" }, Hl = { class: "weather-forecast-actions" }, jl = ["title"], Kl = ["title"], zl = {
  key: 0,
  class: "weather-metrics-grid"
}, Gl = { class: "weather-metric-item" }, Vl = { class: "metric-label" }, Ul = {
  class: "metric-val",
  id: "weather-forecast-humidity"
}, Yl = { class: "weather-metric-item" }, Xl = { class: "metric-label" }, ql = {
  class: "metric-val",
  id: "weather-forecast-wind"
}, Jl = { class: "weather-metric-item" }, Zl = { class: "metric-label" }, Ql = {
  class: "metric-val",
  id: "weather-forecast-uv"
}, ec = { class: "weather-metric-item" }, tc = { class: "metric-label" }, oc = {
  class: "metric-val",
  id: "weather-forecast-aqi"
}, ic = {
  class: "weather-forecast-list",
  id: "weather-forecast-days-list"
}, nc = { class: "day-date-col" }, sc = { class: "day-name" }, ac = { class: "day-date small muted" }, rc = { class: "day-weather-col" }, lc = { class: "day-emoji" }, cc = { class: "day-cond" }, dc = { class: "day-rain-col" }, uc = {
  key: 0,
  class: "rain-tag"
}, pc = {
  key: 1,
  class: "rain-tag empty"
}, hc = { class: "day-temp-bar-col" }, fc = { class: "low-temp" }, gc = { class: "temp-track" }, mc = { class: "high-temp" }, vc = { class: "weather-location-head" }, yc = { class: "weather-location-title-row" }, wc = { class: "weather-location-title" }, bc = ["title"], kc = { class: "weather-input-wrapper" }, _c = ["placeholder", "onKeydown"], Cc = ["title"], xc = {
  type: "submit",
  class: "weather-location-submit"
}, Lc = { key: 0 }, $c = { class: "weather-section-subtitle" }, Sc = {
  key: 0,
  class: "weather-location-suggestions"
}, Tc = ["onClick"], Ic = { class: "weather-suggestion-name" }, Mc = { class: "weather-suggestion-sub" }, Dc = {
  key: 1,
  class: "weather-suggestion-empty"
}, Ac = { key: 1 }, Ec = { class: "weather-section-subtitle" }, Pc = { class: "weather-quick-chips-grid" }, Wc = ["onClick"], Rc = /* @__PURE__ */ fe({
  __name: "WeatherWidget",
  setup(e) {
    const t = z(!1), o = z({ x: 0, y: 0 }), n = z(""), a = z(null), r = z(null), g = ["深圳", "武汉", "北京", "上海", "广州", "成都", "杭州", "南京", "西安", "重庆", "苏州", "天津"], f = te(() => {
      const y = n.value.trim();
      return y ? to.filterCities(y, 6) : [];
    });
    function l(y) {
      const j = y?.clientX ?? window.innerWidth / 2 - 140, Z = y?.clientY ?? window.innerHeight / 2 - 320 / 2, D = Math.max(12, Math.min(window.innerWidth - 280 - 12, j)), k = Math.max(12, Math.min(window.innerHeight - 320 - 12, Z));
      o.value = { x: D, y: k }, t.value = !0, n.value = "", St(() => {
        r.value?.focus();
      });
    }
    function h() {
      t.value = !1, n.value = "";
    }
    async function S(y) {
      const _ = y.trim();
      _ && (h(), await to.changeCity(_));
    }
    function O() {
      const y = n.value.trim();
      y && S(y);
    }
    function v(y) {
      if (!t.value) return;
      const _ = y.target;
      a.value && !a.value.contains(_) && h();
    }
    function I(y) {
      t.value && y.key === "Escape" && (y.preventDefault(), h());
    }
    Ye(() => {
      ct.setRefreshAction(() => {
        to.loadWeather();
      }), ct.setChangeLocationAction((y) => {
        l(y);
      }), to.loadWeather(), Ne(gt, () => {
        to.reformatCurrentWeather();
      }), window.addEventListener("pointerdown", v, !0), window.addEventListener("keydown", I, !0);
    }), Rt(() => {
      window.removeEventListener("pointerdown", v, !0), window.removeEventListener("keydown", I, !0);
    });
    function m(y) {
      y.preventDefault(), l(y);
    }
    function w() {
      ct.closeForecastModal();
    }
    function M(y) {
      y.target?.id === "weather-forecast-dialog" && w();
    }
    return (y, _) => (c(), p("div", {
      class: "weather-widget-container",
      onContextmenu: m
    }, [
      s(q).state === "unconfigured" ? (c(), p("p", kl, u(s(d)("weather.noCitySet")), 1)) : s(q).state === "loading" ? (c(), p("p", _l, u(s(d)("common.loading")), 1)) : s(q).state === "not_found" ? (c(), p("p", Cl, u(s(d)("weather.cityNotFound", { city: s(q).city })), 1)) : s(q).state === "error" ? (c(), p("p", xl, u(s(q).errorMessage || s(d)("weather.loadFailed")), 1)) : s(q).state === "ready" && s(q).data ? (c(), p(ee, { key: 4 }, [
        i("div", Ll, [
          i("span", $l, u(s(q).data.currentEmoji), 1),
          i("span", Sl, u(s(q).data.currentTemp) + "°", 1)
        ]),
        i("p", Tl, u(s(q).data.subText), 1),
        i("p", Il, u(s(q).data.rainText), 1),
        i("div", Ml, [
          (c(!0), p(ee, null, be(s(q).data.hours, (x, N) => (c(), p("div", {
            key: N,
            class: "wx-h"
          }, [
            i("span", Dl, u(x.time), 1),
            i("span", Al, u(x.emoji), 1),
            i("span", El, u(x.temp) + "°", 1)
          ]))), 128))
        ]),
        i("div", Pl, [
          (c(!0), p(ee, null, be(s(q).data.days, (x, N) => (c(), p("span", { key: N }, u(x.label) + " " + u(x.emoji) + " " + u(x.tempRange), 1))), 128))
        ])
      ], 64)) : E("", !0),
      i("dialog", {
        id: "weather-forecast-dialog",
        class: "weather-forecast-dialog",
        open: s(q).forecastModalOpen,
        onClick: M
      }, [
        i("div", {
          class: "weather-forecast-shell",
          onClick: _[1] || (_[1] = V(() => {
          }, ["stop"]))
        }, [
          i("header", Rl, [
            i("div", Nl, [
              i("span", Ol, u(s(q).data?.currentEmoji || "🌤️"), 1),
              i("div", null, [
                i("h3", Bl, u(s(q).city || s(q).data?.cityName || s(d)("weather.forecastTitle")), 1),
                i("p", Fl, u(s(q).data?.subText || s(d)("weather.forecastSub")), 1)
              ])
            ]),
            i("div", Hl, [
              i("button", {
                id: "weather-forecast-refresh-btn",
                type: "button",
                class: "weather-forecast-btn",
                title: s(d)("weather.refreshTitle"),
                onClick: _[0] || (_[0] = (x) => s(ct).refresh())
              }, u(s(d)("weather.refresh")), 9, jl),
              i("button", {
                id: "weather-forecast-close-btn",
                type: "button",
                class: "weather-forecast-close",
                title: s(d)("common.close"),
                onClick: w
              }, " ✕ ", 8, Kl)
            ])
          ]),
          s(q).detailInfo ? (c(), p("div", zl, [
            i("div", Gl, [
              i("span", Vl, u(s(d)("weather.metric.humidity")), 1),
              i("span", Ul, u(s(q).detailInfo.humidity || "50%"), 1)
            ]),
            i("div", Yl, [
              i("span", Xl, u(s(d)("weather.metric.wind")), 1),
              i("span", ql, u(s(q).detailInfo.wind || (s(gt) === "en" ? "Breeze" : "微风")), 1)
            ]),
            i("div", Jl, [
              i("span", Zl, u(s(d)("weather.metric.uv")), 1),
              i("span", Ql, u(s(q).detailInfo.uvIndex || (s(gt) === "en" ? "Moderate" : "中等")), 1)
            ]),
            i("div", ec, [
              i("span", tc, u(s(d)("weather.metric.aqi")), 1),
              i("span", oc, u(s(q).detailInfo.airQuality || (s(gt) === "en" ? "Good" : "良")), 1)
            ])
          ])) : E("", !0),
          i("div", ic, [
            (c(!0), p(ee, null, be(s(q).forecastDays, (x, N) => (c(), p("div", {
              key: N,
              class: "weather-forecast-day-row forecast-day-item"
            }, [
              i("div", nc, [
                i("span", sc, u(x.dayName), 1),
                i("span", ac, u(x.date), 1)
              ]),
              i("div", rc, [
                i("span", lc, u(x.emoji), 1),
                i("span", cc, u(x.condition), 1)
              ]),
              i("div", dc, [
                x.rainProb > 0 ? (c(), p("span", uc, "☂️ " + u(x.rainProb) + "%", 1)) : (c(), p("span", pc, u(s(d)("weather.metric.noRain")), 1))
              ]),
              i("div", hc, [
                i("span", fc, u(x.lowTemp) + "°", 1),
                i("div", gc, [
                  i("div", {
                    class: "temp-range-fill",
                    style: Te({
                      left: `${Math.max(0, Math.min(100, (x.lowTemp + 10) * 2))}%`,
                      width: `${Math.max(20, Math.min(80, (x.highTemp - x.lowTemp) * 6))}%`
                    })
                  }, null, 4)
                ]),
                i("span", mc, u(x.highTemp) + "°", 1)
              ])
            ]))), 128))
          ])
        ])
      ], 8, Wl),
      (c(), he(wt, { to: "body" }, [
        t.value ? (c(), p("div", {
          key: 0,
          ref_key: "contextMenuRef",
          ref: a,
          class: "weather-location-context-menu",
          style: Te({ left: `${o.value.x}px`, top: `${o.value.y}px` }),
          onClick: _[4] || (_[4] = V(() => {
          }, ["stop"])),
          onContextmenu: _[5] || (_[5] = V(() => {
          }, ["prevent"]))
        }, [
          i("div", vc, [
            i("div", yc, [
              i("span", wc, u(s(d)("weather.menu.changeLocation")), 1),
              i("span", {
                class: "weather-location-curr-badge",
                title: s(q).city
              }, [
                _[6] || (_[6] = i("span", { class: "weather-curr-dot" }, null, -1)),
                tt(" " + u(s(q).city || s(d)("weather.menu.unset")), 1)
              ], 8, bc)
            ])
          ]),
          i("form", {
            class: "weather-location-form",
            onSubmit: V(O, ["prevent"])
          }, [
            i("div", kc, [
              _[7] || (_[7] = i("span", { class: "weather-input-icon" }, "🔍", -1)),
              et(i("input", {
                ref_key: "inputRef",
                ref: r,
                class: "weather-location-input",
                placeholder: s(d)("weather.menu.inputPlaceholder"),
                "onUpdate:modelValue": _[2] || (_[2] = (x) => n.value = x),
                onKeydown: Po(V(O, ["prevent"]), ["enter"]),
                autocomplete: "off"
              }, null, 40, _c), [
                [ho, n.value]
              ]),
              n.value ? (c(), p("button", {
                key: 0,
                type: "button",
                class: "weather-input-clear",
                onClick: _[3] || (_[3] = (x) => n.value = ""),
                title: s(d)("weather.menu.clearInput")
              }, "✕", 8, Cc)) : E("", !0)
            ]),
            i("button", xc, u(s(d)("weather.menu.submit")), 1)
          ], 32),
          n.value.trim() ? (c(), p("div", Lc, [
            i("div", $c, u(s(d)("weather.menu.suggestions")), 1),
            f.value.length ? (c(), p("div", Sc, [
              (c(!0), p(ee, null, be(f.value, (x) => (c(), p("button", {
                key: x.name + x.admin,
                type: "button",
                class: "weather-suggestion-item",
                onClick: (N) => S(x.name)
              }, [
                i("span", Ic, u(x.name), 1),
                i("span", Mc, u(x.admin), 1)
              ], 8, Tc))), 128))
            ])) : (c(), p("div", Dc, u(s(d)("weather.menu.emptySuggestion")), 1))
          ])) : (c(), p("div", Ac, [
            i("div", Ec, u(s(d)("weather.menu.commonCities")), 1),
            i("div", Pc, [
              (c(), p(ee, null, be(g, (x) => i("button", {
                key: x,
                type: "button",
                class: de(["weather-quick-chip", { active: s(q).city === x }]),
                onClick: (N) => S(x)
              }, u(x), 11, Wc)), 64))
            ])
          ]))
        ], 36)) : E("", !0)
      ]))
    ], 32));
  }
}), ls = /* @__PURE__ */ Pe(Rc, [["__scopeId", "data-v-5aae12b5"]]), Yi = "heroCustomMottoV1";
function Nc() {
  try {
    if (typeof localStorage < "u") {
      const e = localStorage.getItem(Yi);
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
const Zt = Nc(), J = $e({
  loaded: !1,
  customText: Zt.customText,
  history: Zt.history,
  currentIndex: Zt.customText && Zt.history.length ? Zt.history.findIndex((e) => e.text === Zt.customText) : -1,
  menuOpen: !1,
  menuPos: { x: 0, y: 0 }
});
function Oc(e) {
  return new Promise((t) => {
    typeof chrome < "u" && chrome?.storage?.local?.get ? chrome.storage.local.get([e], (o) => t(o?.[e])) : t(null);
  });
}
function Bc(e, t) {
  try {
    typeof localStorage < "u" && localStorage.setItem(e, JSON.stringify(t));
  } catch {
  }
  return new Promise((o) => {
    typeof chrome < "u" && chrome?.storage?.local?.set ? chrome.storage.local.set({ [e]: t }, () => o()) : o();
  });
}
function Fc(e) {
  const t = (a) => String(a).padStart(2, "0"), o = `${e.getFullYear()}-${t(e.getMonth() + 1)}-${t(e.getDate())}`, n = `${t(e.getHours())}:${t(e.getMinutes())}`;
  return { date: o, time: n };
}
const lt = {
  async init() {
    try {
      const e = await Oc(Yi);
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
    await Bc(Yi, e);
  },
  setCustomMotto(e) {
    const t = e.trim();
    if (!t) {
      this.resetToSystem();
      return;
    }
    const { date: o, time: n } = Fc(/* @__PURE__ */ new Date());
    J.customText = t;
    const a = J.history.findIndex((r) => r.text === t);
    if (a !== -1) {
      const r = J.history.splice(a, 1)[0];
      r.date = o, r.time = n, J.history.unshift(r);
    } else
      J.history.unshift({
        id: `motto_${Date.now()}`,
        date: o,
        time: n,
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
}, Hc = ["title"], jc = ["placeholder"], Kc = { class: "motto-content" }, zc = ["title"], Gc = { class: "motto-menu-header" }, Vc = { class: "dim" }, Uc = { class: "motto-history-label" }, Yc = { class: "motto-history-list" }, Xc = {
  key: 0,
  class: "motto-history-empty dim"
}, qc = ["onClick"], Jc = { class: "motto-item-date" }, Zc = ["title"], Qc = ["title", "onClick"], ed = /* @__PURE__ */ fe({
  __name: "HeroMotto",
  setup(e) {
    const t = z(!1), o = z(""), n = z(null), a = {
      夜深了: "clock.greeting.lateNight",
      早上好: "clock.greeting.morning",
      上午好: "clock.greeting.forenoon",
      中午好: "clock.greeting.noon",
      下午好: "clock.greeting.afternoon",
      晚上好: "clock.greeting.evening",
      你好: "clock.greeting.hello"
    };
    function r(m) {
      const w = a[m];
      return w ? d(w) : m;
    }
    const g = te(() => J.customText ? r(J.customText) : Se.greetingText);
    function f() {
      lt.closeMenu(), o.value = J.customText || Se.greetingText, t.value = !0, St(() => {
        n.value?.focus(), n.value?.select();
      });
    }
    function l() {
      if (!t.value) return;
      t.value = !1;
      const m = o.value.trim();
      lt.setCustomMotto(m), m && Le.fetch(d("motto.appName"), d("motto.updated", { text: m }));
    }
    function h() {
      t.value = !1;
    }
    function S(m) {
      m.key === "Enter" ? (m.preventDefault(), l()) : m.key === "Escape" && (m.preventDefault(), h());
    }
    function O(m) {
      t.value || (m.preventDefault(), m.stopPropagation(), lt.stepHistory(m.deltaY > 0 ? 1 : -1));
    }
    function v(m) {
      m.preventDefault(), m.stopPropagation(), lt.openMenu(m.clientX, m.clientY);
    }
    function I(m) {
      J.menuOpen && (m.target.closest(".motto-context-menu") || lt.closeMenu());
    }
    return Ye(() => {
      lt.init(), window.addEventListener("click", I);
    }), Rt(() => {
      window.removeEventListener("click", I);
    }), (m, w) => (c(), p(ee, null, [
      i("div", {
        class: "hero-motto-wrapper",
        title: s(d)("motto.hint"),
        onWheel: O,
        onContextmenu: v
      }, [
        t.value ? et((c(), p("input", {
          key: 0,
          ref_key: "mottoInputRef",
          ref: n,
          "onUpdate:modelValue": w[0] || (w[0] = (M) => o.value = M),
          class: "hero-motto-input",
          type: "text",
          placeholder: s(d)("motto.placeholder"),
          maxlength: "60",
          onBlur: l,
          onKeydown: S
        }, null, 40, jc)), [
          [ho, o.value]
        ]) : (c(), p("p", {
          key: 1,
          id: "greeting",
          class: "hero-motto-text",
          style: Te({ color: s(Se).greetColor }),
          onClick: f
        }, [
          i("span", Kc, u(g.value), 1),
          s(J).history.length > 1 ? (c(), p("span", {
            key: 0,
            class: "motto-scroll-hint",
            title: s(d)("motto.scrollHint")
          }, "⇕", 8, zc)) : E("", !0)
        ], 4))
      ], 40, Hc),
      (c(), he(wt, { to: "body" }, [
        s(J).menuOpen ? (c(), p("div", {
          key: 0,
          class: "motto-context-menu",
          style: Te({ left: `${s(J).menuPos.x}px`, top: `${s(J).menuPos.y}px` }),
          onClick: w[3] || (w[3] = V(() => {
          }, ["stop"])),
          onContextmenu: w[4] || (w[4] = V(() => {
          }, ["prevent"]))
        }, [
          i("div", Gc, [
            i("span", null, u(s(d)("motto.customTitle")), 1),
            i("small", Vc, u(s(d)("motto.recordsCount", { count: s(J).history.length })), 1)
          ]),
          i("button", {
            type: "button",
            class: "motto-menu-action",
            onClick: f
          }, [
            w[5] || (w[5] = i("i", null, "✎", -1)),
            i("span", null, u(s(d)("motto.editCurrent")), 1)
          ]),
          w[8] || (w[8] = i("div", { class: "motto-menu-divider" }, null, -1)),
          i("div", Uc, u(s(d)("motto.historyLabel")), 1),
          i("div", Yc, [
            s(J).history.length ? (c(!0), p(ee, { key: 1 }, be(s(J).history, (M) => (c(), p("div", {
              key: M.id,
              class: de(["motto-history-item", { active: s(J).customText === M.text }]),
              onClick: (y) => s(lt).selectHistory(M)
            }, [
              i("span", Jc, u(M.date), 1),
              i("span", {
                class: "motto-item-text",
                title: r(M.text)
              }, u(r(M.text)), 9, Zc),
              i("button", {
                type: "button",
                class: "motto-item-del",
                title: s(d)("motto.deleteEntry"),
                onClick: V((y) => s(lt).deleteEntry(M.id), ["stop"])
              }, "×", 8, Qc)
            ], 10, qc))), 128)) : (c(), p("div", Xc, u(s(d)("motto.historyEmpty")), 1))
          ]),
          w[9] || (w[9] = i("div", { class: "motto-menu-divider" }, null, -1)),
          i("button", {
            type: "button",
            class: "motto-menu-action reset-btn",
            onClick: w[1] || (w[1] = //@ts-ignore
            (...M) => s(lt).resetToSystem && s(lt).resetToSystem(...M))
          }, [
            w[6] || (w[6] = i("i", null, "↻", -1)),
            i("span", null, u(s(d)("motto.resetGreeting")), 1)
          ]),
          s(J).history.length ? (c(), p("button", {
            key: 0,
            type: "button",
            class: "motto-menu-action danger-btn",
            onClick: w[2] || (w[2] = //@ts-ignore
            (...M) => s(lt).clearHistory && s(lt).clearHistory(...M))
          }, [
            w[7] || (w[7] = i("i", null, "🗑", -1)),
            i("span", null, u(s(d)("motto.clearAll")), 1)
          ])) : E("", !0)
        ], 36)) : E("", !0)
      ]))
    ], 64));
  }
}), td = /* @__PURE__ */ Pe(ed, [["__scopeId", "data-v-a65048d3"]]), od = /* @__PURE__ */ fe({
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
    function n() {
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
      const l = (Z) => String(Z).padStart(2, "0"), h = n(), S = h.getHours(), O = h.getMinutes(), v = h.getSeconds(), I = h.getFullYear(), m = h.getMonth() + 1, w = h.getDate(), M = h.getDay(), y = `${l(S)}:${l(O)}`, _ = `:${l(v)}`, x = o(S), N = d(t[M]), j = d("clock.datePattern", {
        year: I,
        month: m,
        day: w,
        week: N
      });
      ro.updateTime(y, _, x, j);
    }
    function r(l) {
      l.preventDefault(), Vt.open({ clientX: l.clientX, clientY: l.clientY });
    }
    function g() {
      document.hidden ? f && (clearInterval(f), f = null) : (a(), f || (f = setInterval(a, 1e3)));
    }
    let f = null;
    return Vt.initPreferences(), a(), Ye(() => {
      Vt.initPreferences(), Ne(gt, () => {
        a();
      }), vt.activeId || (a(), f = setInterval(a, 1e3)), document.addEventListener("visibilitychange", g);
    }), Ne(
      () => vt.activeId,
      (l) => {
        l ? f && (clearInterval(f), f = null) : document.hidden || (a(), f || (f = setInterval(a, 1e3)));
      }
    ), Rt(() => {
      f && (clearInterval(f), f = null), document.removeEventListener("visibilitychange", g);
    }), (l, h) => (c(), p("div", {
      class: "hero-clock-vue-container",
      onContextmenu: r
    }, [
      i("p", {
        id: "clock",
        class: "clock",
        style: Te({ fontFamily: s(Se).fontFamily, color: s(Se).colorHex })
      }, [
        tt(u(s(Se).timeText), 1),
        i("span", {
          id: "secs",
          style: Te({ color: s(Se).colorHex })
        }, u(s(Se).secsText), 5)
      ], 4),
      i("p", {
        id: "date",
        class: "date",
        style: Te({ color: s(Se).dateColor })
      }, u(s(Se).dateText), 5)
    ], 32));
  }
}), cs = /* @__PURE__ */ Pe(od, [["__scopeId", "data-v-f946341c"]]), id = {
  key: 0,
  class: "home-music-degraded-box"
}, nd = { class: "degraded-badge-row" }, sd = { class: "degraded-status" }, ad = {
  key: 0,
  class: "degraded-host-tag"
}, rd = {
  key: 1,
  class: "degraded-host-tag"
}, ld = { class: "degraded-title-row" }, cd = ["title"], dd = { class: "degraded-track-artist" }, ud = { class: "degraded-progress-bar-wrap" }, pd = { class: "degraded-actions" }, hd = { class: "degraded-time" }, fd = { class: "home-vinyl-box" }, gd = ["title"], md = ["src", "alt"], vd = { class: "home-music-right" }, yd = ["title"], wd = {
  id: "home-music-artist",
  class: "home-music-meta-artist"
}, bd = { class: "home-music-seek-row" }, kd = {
  id: "home-music-cur",
  class: "home-music-time"
}, _d = ["value"], Cd = {
  id: "home-music-dur",
  class: "home-music-time"
}, xd = { class: "home-music-actions" }, Ld = ["title"], $d = ["title"], Sd = ["title"], Td = ["title"], Id = ["title"], Md = /* @__PURE__ */ fe({
  __name: "HomeMusicCard",
  setup(e) {
    Ye(() => {
      setTimeout(() => {
        Gs();
      }, 200);
    });
    const t = te(() => Nn.visible || ft.djModalOpen || ft.isActive && ft.isJoined), o = te(() => ft.isActive && ft.isJoined), n = te(() => !oe.title || oe.title === "点击播放" ? d("home.music.defaultTitle") : oe.title), a = te(() => !oe.artist || oe.artist === "作者" ? d("home.music.defaultArtist") : oe.artist), r = te(() => oe.mode === "shuffle" ? "🔀" : oe.mode === "one" ? "🔂" : "🔁");
    function g(l) {
      const h = l.target, S = Number(h.value);
      Ze.seek(S);
    }
    function f() {
      Ze.update({ coverUrl: "" });
    }
    return (l, h) => (c(), p("div", {
      id: "home-music-player-view",
      class: de(["home-music-player-view", { "is-degraded": t.value }])
    }, [
      t.value ? (c(), p("div", id, [
        i("div", nd, [
          h[7] || (h[7] = i("span", { class: "degraded-icon" }, "🎧", -1)),
          i("strong", sd, u(o.value ? s(d)("home.music.togetherListening") : s(d)("home.music.backgroundListening")), 1),
          o.value ? (c(), p("span", ad, " DJ: " + u(s(ft).hostName), 1)) : (c(), p("span", rd, u(s(d)("home.music.workspaceReady")), 1))
        ]),
        i("div", ld, [
          i("h3", {
            class: "degraded-track-title",
            title: n.value
          }, u(n.value || s(d)("home.music.standby")), 9, cd),
          i("p", dd, u(a.value), 1)
        ]),
        i("div", ud, [
          i("div", {
            class: "degraded-progress-bar-fill",
            style: Te({ width: s(oe).progressPercent + "%" })
          }, null, 4)
        ]),
        i("div", pd, [
          i("button", {
            type: "button",
            class: "degraded-btn",
            onClick: h[0] || (h[0] = (S) => s(Ze).togglePlay())
          }, u(s(oe).playing ? s(d)("home.music.pause") : s(d)("home.music.play")), 1),
          i("span", hd, u(s(oe).formattedCurrent) + " / " + u(s(oe).formattedDuration), 1)
        ])
      ])) : (c(), p(ee, { key: 1 }, [
        i("div", fd, [
          i("div", {
            id: "home-vinyl-needle",
            class: de(["home-vinyl-needle", { playing: s(oe).playing }])
          }, [...h[8] || (h[8] = [
            So('<svg viewBox="0 0 32 52" fill="none" data-v-b7cbb119><circle cx="26" cy="4" r="3.5" fill="#e2e8f0" stroke="#475569" stroke-width="1.5" data-v-b7cbb119></circle><circle cx="26" cy="4" r="1.5" fill="#64748b" data-v-b7cbb119></circle><path d="M26 4 L14 26 L11 44" stroke="#cbd5e1" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" data-v-b7cbb119></path><rect x="7" y="42" width="8" height="9" rx="1.5" fill="#f43f5e" transform="rotate(-15 11 46)" data-v-b7cbb119></rect></svg>', 1)
          ])], 2),
          i("div", {
            id: "home-vinyl-disc",
            class: de(["home-vinyl-disc", { playing: s(oe).playing }]),
            title: s(d)("home.music.togglePlay"),
            onClick: h[1] || (h[1] = (S) => s(Ze).togglePlay())
          }, [
            s(oe).coverUrl ? (c(), p("img", {
              key: 0,
              id: "home-vinyl-cover",
              class: "home-vinyl-cover",
              referrerpolicy: "no-referrer",
              src: s(oe).coverUrl,
              alt: s(d)("home.music.coverAlt"),
              onError: f
            }, null, 40, md)) : E("", !0),
            h[9] || (h[9] = i("div", { class: "home-vinyl-hole" }, null, -1))
          ], 10, gd)
        ]),
        i("div", vd, [
          i("h3", {
            id: "home-music-title",
            class: "home-music-meta-title",
            title: n.value
          }, u(n.value), 9, yd),
          i("p", wd, u(a.value), 1),
          i("div", bd, [
            i("span", kd, u(s(oe).formattedCurrent), 1),
            i("input", {
              id: "home-music-seek",
              class: "home-music-seek-bar",
              type: "range",
              min: "0",
              max: "100",
              value: s(oe).progressPercent,
              onInput: g
            }, null, 40, _d),
            i("span", Cd, u(s(oe).formattedDuration), 1)
          ]),
          i("div", xd, [
            i("button", {
              id: "home-music-prev",
              class: "home-music-btn",
              type: "button",
              title: s(d)("home.music.prevTrack"),
              onClick: h[2] || (h[2] = (S) => s(Ze).prev())
            }, " ⏮ ", 8, Ld),
            i("button", {
              id: "home-music-play",
              class: "home-music-btn play-btn",
              type: "button",
              title: s(d)("home.music.togglePlay"),
              onClick: h[3] || (h[3] = (S) => s(Ze).togglePlay())
            }, u(s(oe).playing ? "⏸" : "▶"), 9, $d),
            i("button", {
              id: "home-music-next",
              class: "home-music-btn",
              type: "button",
              title: s(d)("home.music.nextTrack"),
              onClick: h[4] || (h[4] = (S) => s(Ze).next())
            }, " ⏭ ", 8, Sd),
            i("button", {
              id: "home-music-like",
              class: de(["home-music-btn like-btn", { liked: s(oe).liked }]),
              type: "button",
              title: s(d)("home.music.favorite"),
              onClick: h[5] || (h[5] = (S) => s(Ze).toggleLike())
            }, u(s(oe).liked ? "♥" : "♡"), 11, Td),
            i("button", {
              id: "home-music-mode",
              class: "home-music-btn",
              type: "button",
              title: s(d)("home.music.playMode"),
              onClick: h[6] || (h[6] = (S) => s(Ze).cycleMode())
            }, u(r.value), 9, Id)
          ])
        ])
      ], 64))
    ], 2));
  }
}), ds = /* @__PURE__ */ Pe(Md, [["__scopeId", "data-v-b7cbb119"]]), Lt = /* @__PURE__ */ new Map(), $t = /* @__PURE__ */ new Set();
function Dd(e, t) {
  for (Lt.delete(e), Lt.set(e, t), $t.delete(t), $t.add(t); Lt.size > 512; )
    Lt.delete(Lt.keys().next().value);
  for (; $t.size > 512; )
    $t.delete($t.values().next().value);
}
const Ad = {
  key: 0,
  class: "launcher-fallback"
}, Ed = ["src"], Di = "lw_resolved_icon:", Pd = /* @__PURE__ */ fe({
  __name: "LauncherFavicon",
  props: {
    link: {},
    mini: { type: Boolean, default: !1 }
  },
  setup(e) {
    function t(y) {
      try {
        return localStorage.getItem(Di + y) || "";
      } catch {
        return "";
      }
    }
    function o(y, _) {
      try {
        localStorage.setItem(Di + y, _);
      } catch {
      }
    }
    function n(y) {
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
        const _ = window, x = typeof _.chrome < "u" ? _.chrome : globalThis.chrome;
        if (typeof x?.runtime?.getURL == "function")
          return x.runtime.getURL("_favicon/?pageUrl=" + encodeURIComponent(y) + "&size=64");
      } catch {
      }
      return "";
    }
    const l = te(() => {
      const y = a.link, _ = (y.title || r(y.url)).trim();
      return _ ? _.slice(0, 1).toUpperCase() : "🔗";
    }), h = z([]), S = z(0), O = z(!1), v = z(!1), I = te(() => v.value || S.value >= h.value.length ? "" : h.value[S.value] || "");
    function m() {
      const y = a.link;
      if (!y?.url) {
        h.value = [], v.value = !0, O.value = !1;
        return;
      }
      const _ = [], x = n(y.url);
      x && _.push(x);
      const N = Lt.get(y.url) || t(y.url);
      N && !_.includes(N) && _.push(N);
      const j = (T) => T ? /google\.com\/s2\/favicons|icons\.duckduckgo\.com|unavatar\.io|icon\.horse/i.test(T) : !1;
      y.customIcon && !j(y.customIcon) && _.push(y.customIcon), y.icon && !j(y.icon) && _.push(y.icon);
      const Z = f(y.url);
      Z && !_.includes(Z) && _.push(Z);
      const D = Ae.getCachedIcon(y.url);
      D && !_.includes(D) && _.push(D);
      const k = g(y.url);
      k && !k.startsWith("http://1.") && !k.startsWith("http://192.") && !k.startsWith("http://127.") && _.push(`${k}/favicon.ico`), y.customIcon && !j(y.customIcon) && _.unshift(y.customIcon);
      const L = [...new Set(_.filter(Boolean))];
      h.value = L, S.value = 0, v.value = L.length === 0;
      const Q = L[0];
      Q && (Q.startsWith("data:") || $t.has(Q)) && (O.value = !0);
    }
    Ne(
      () => [a.link?.url, a.link?.icon, a.link?.customIcon],
      (y, _) => {
        _ && y[0] === _[0] && y[1] === _[1] && y[2] === _[2] || m();
      },
      { immediate: !0 }
    ), Ye(() => {
      h.value.length === 0 && m();
    });
    function w(y) {
      O.value = !0, v.value = !1;
      const _ = I.value;
      if (_) {
        const x = $t.has(_), N = Lt.get(a.link.url);
        Dd(a.link.url, _), N !== _ && t(a.link.url) !== _ && o(a.link.url, _);
        const j = y.target;
        if (!x && !_.startsWith("data:")) {
          const Z = a.link.url;
          setTimeout(() => {
            Ae.cacheIcon(Z, _, j?.getAttribute("src") === _ ? j : null);
          }, 0);
        }
      }
    }
    function M() {
      const y = I.value;
      if (y) {
        $t.delete(y), Lt.get(a.link.url) === y && Lt.delete(a.link.url);
        try {
          localStorage.removeItem(Di + a.link.url), localStorage.removeItem("lw_sync_dataurl:" + a.link.url);
        } catch {
        }
      }
      if (y && Ae.getCachedIcon(a.link.url) === y && Ae.evictCachedIcon(a.link.url), S.value + 1 < h.value.length) {
        S.value += 1;
        const _ = h.value[S.value];
        _ && (_.startsWith("data:") || $t.has(_)) && (O.value = !0);
      } else
        v.value = !0, O.value = !1;
    }
    return (y, _) => (c(), p("span", {
      class: de(e.mini ? "launcher-folder-mini" : "launcher-favicon")
    }, [
      v.value || !I.value ? (c(), p("span", Ad, u(l.value), 1)) : (c(), p("img", {
        key: 1,
        src: I.value,
        alt: "",
        draggable: "false",
        referrerpolicy: "no-referrer",
        decoding: "async",
        style: { "pointer-events": "none", "user-select": "none" },
        onLoad: w,
        onError: M
      }, null, 40, Ed))
    ], 2));
  }
}), li = /* @__PURE__ */ Pe(Pd, [["__scopeId", "data-v-bc41d0d8"]]), Wd = { class: "launcher-label launcher-title" }, Rd = ["title"], Nd = {
  key: 0,
  class: "launcher-folder-more"
}, Od = {
  key: 1,
  class: "empty-folder",
  "aria-hidden": "true"
}, Bd = { class: "launcher-folder-label launcher-title" }, Fd = /* @__PURE__ */ fe({
  __name: "LauncherTileContent",
  props: {
    link: {},
    folder: {},
    size: { default: "small" }
  },
  setup(e) {
    const t = e, o = te(() => t.size === "large" ? 9 : 4), n = te(() => t.folder?.preview.slice(0, t.folder.count > o.value ? o.value - 1 : o.value) || []);
    return (a, r) => e.link ? (c(), p(ee, { key: 0 }, [
      X(li, { link: e.link }, null, 8, ["link"]),
      i("span", Wd, u(e.link.title), 1)
    ], 64)) : e.folder ? (c(), p(ee, { key: 1 }, [
      i("div", {
        class: "launcher-folder-preview",
        title: `打开${e.folder.title}`
      }, [
        (c(!0), p(ee, null, be(n.value, (g) => (c(), he(li, {
          key: g.id,
          link: g,
          mini: !0
        }, null, 8, ["link"]))), 128)),
        e.folder.count > o.value ? (c(), p("span", Nd, "+" + u(e.folder.count - (o.value - 1)), 1)) : E("", !0),
        n.value.length ? E("", !0) : (c(), p("span", Od, "📁")),
        Pn(a.$slots, "default", {}, void 0, !0)
      ], 8, Rd),
      i("span", Bd, u(e.folder.title), 1)
    ], 64)) : E("", !0);
  }
}), Eo = /* @__PURE__ */ Pe(Fd, [["__scopeId", "data-v-7f513029"]]), us = 5, ps = 180;
function hs(e, t, o) {
  const n = t - e.left, a = o - e.top;
  return n > e.width * 0.25 && n < e.width * 0.75 && a > e.height * 0.25 && a < e.height * 0.75;
}
function fs(e, t, o) {
  return Math.hypot(t - (e.left + e.width / 2), o - (e.top + e.height / 2)) <= Math.max(e.width, e.height) * 0.55;
}
const Hd = {
  class: "launcher-group launcher-aihot launcher-todoist size-large",
  id: "launcher-todoist"
}, jd = { class: "card-head aihot-home-head" }, Kd = { class: "title" }, zd = ["title"], Gd = ["title"], Vd = {
  class: "aihot-home-body",
  id: "aihot-home-body"
}, Ud = {
  key: 0,
  class: "muted small"
}, Yd = {
  key: 1,
  class: "notice small"
}, Xd = {
  key: 2,
  class: "muted small aihot-home-empty"
}, qd = {
  key: 3,
  class: "aihot-home-rich-list"
}, Jd = ["href", "title", "onClick"], Zd = { class: "aihot-home-rich-main" }, Qd = { class: "aihot-home-rich-title" }, eu = {
  key: 0,
  class: "aihot-home-rich-summary"
}, tu = { class: "aihot-home-rich-meta" }, ou = { class: "aihot-home-rich-meta-left" }, iu = {
  key: 0,
  class: "aihot-home-rich-tag"
}, nu = { class: "aihot-home-rich-source" }, su = { class: "aihot-home-rich-time" }, $n = 6, au = /* @__PURE__ */ fe({
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
    }, o = z([]), n = z(0), a = z(!0), r = z("");
    function g(y) {
      return gt.value === "en" && y.originalTitle ? y.originalTitle : y.title;
    }
    function f(y) {
      const _ = y.source?.name || y.sourceName || "AI HOT";
      return gt.value === "en" && _.includes("：") ? _.split("：")[0].trim() : _;
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
    const h = te(() => gt.value !== "en" ? o.value : [...o.value].sort((y, _) => {
      const x = !!(y.originalTitle && /[a-zA-Z]{3,}/.test(y.originalTitle)), N = !!(_.originalTitle && /[a-zA-Z]{3,}/.test(_.originalTitle));
      return x && !N ? -1 : !x && N ? 1 : 0;
    }));
    function S(y) {
      const _ = y.publishedAt || y.published || "";
      if (!_) return gt.value === "en" ? "Latest" : "最新";
      const x = Number(_), N = Number.isFinite(x) && x > 0 ? new Date(x > 1e12 ? x : x * 1e3) : new Date(_);
      if (isNaN(N.getTime())) return String(_).slice(0, 16) || (gt.value === "en" ? "Latest" : "最新");
      const j = (T) => String(T).padStart(2, "0"), Z = N.getFullYear(), D = j(N.getMonth() + 1), k = j(N.getDate()), L = j(N.getHours()), Q = j(N.getMinutes());
      return `${Z}-${D}-${k} ${L}:${Q}`;
    }
    const O = [
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
    function v() {
      const _ = (typeof window < "u" ? window : null)?.LogicWeaverAihotFeed?.getState?.()?.feedArticles;
      if (Array.isArray(_) && _.length)
        return _;
      const x = [
        "newtab_aihot_items_v2",
        "lw-aihot-cached-feed-all-24h-v1",
        "lw-aihot-cached-feed-v1"
      ];
      for (const N of x)
        try {
          const j = localStorage.getItem(N);
          if (j) {
            const Z = JSON.parse(j);
            if (Array.isArray(Z) && Z.length) return Z;
            if (Z && Array.isArray(Z.items) && Z.items.length) return Z.items;
          }
        } catch {
        }
      return [];
    }
    async function I(y = !1) {
      if (!y && o.value.length > 0) return;
      const _ = v();
      _.length ? (o.value = _, a.value = !1) : o.value.length || (o.value = [...O], a.value = !1);
      try {
        const N = await (await fetch("https://aihot.virxact.com/api/v1/items?mode=selected&window=24h&limit=24", {
          headers: { Accept: "application/json" },
          signal: AbortSignal.timeout(5e3)
        })).json(), j = Array.isArray(N) ? N : N.items || N.data || N.results || [];
        if (j.length) {
          o.value = j, n.value = 0, r.value = "";
          try {
            localStorage.setItem("newtab_aihot_items_v2", JSON.stringify(j.slice(0, 30)));
          } catch {
          }
        }
      } catch {
        o.value.length || (o.value = [...O]);
      } finally {
        a.value = !1;
      }
    }
    function m() {
      if (!h.value.length) {
        a.value = !0, I(!0);
        return;
      }
      n.value += $n, n.value >= h.value.length && (n.value = 0);
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
    function M(y, _) {
      if (_.ctrlKey || _.metaKey || _.shiftKey || _.button === 1) return;
      _.preventDefault();
      const x = y.links?.original || y.links?.aihot || y.url || "#";
      tn.openArticle(
        {
          id: y.id,
          title: g(y),
          summary: y.summary,
          sourceName: f(y),
          published: S(y),
          url: x
        },
        ""
      );
    }
    return Ye(() => {
      I();
    }), (y, _) => (c(), p("section", Hd, [
      i("header", jd, [
        _[0] || (_[0] = i("span", { class: "bar cyan" }, null, -1)),
        i("strong", Kd, u(s(d)("aihot.card.title")), 1),
        _[1] || (_[1] = i("span", { class: "grow" }, null, -1)),
        i("button", {
          class: "aihot-home-btn",
          type: "button",
          title: s(d)("aihot.card.refreshBtnTip"),
          onClick: m
        }, u(s(d)("aihot.card.refreshBtn")), 9, zd),
        i("button", {
          class: "aihot-home-btn aihot-home-more-btn",
          type: "button",
          title: s(d)("aihot.card.hotlistBtnTip"),
          onClick: w
        }, u(s(d)("aihot.card.hotlistBtn")), 9, Gd)
      ]),
      i("div", Vd, [
        a.value && !h.value.length ? (c(), p("p", Ud, u(s(d)("aihot.card.loading")), 1)) : r.value && !h.value.length ? (c(), p("p", Yd, u(r.value), 1)) : h.value.length ? (c(), p("div", qd, [
          (c(!0), p(ee, null, be(h.value.slice(n.value, n.value + $n), (x, N) => (c(), p("a", {
            key: x.id || x.title,
            class: "aihot-home-rich-card",
            href: x.links?.original || x.links?.aihot || x.url || "#",
            target: "_blank",
            rel: "noreferrer",
            title: `${g(x)}
${x.summary || ""}
${s(d)("aihot.card.viewInReader")}`,
            onClick: (j) => M(x, j)
          }, [
            i("span", {
              class: de(["aihot-home-rich-rank", { top: n.value + N < 3 }])
            }, u(n.value + N + 1), 3),
            i("div", Zd, [
              i("h3", Qd, u(g(x)), 1),
              x.summary ? (c(), p("p", eu, u(x.summary), 1)) : E("", !0),
              i("div", tu, [
                i("div", ou, [
                  l(x) ? (c(), p("span", iu, u(l(x)), 1)) : E("", !0),
                  i("span", nu, u(f(x)), 1)
                ]),
                i("time", su, u(S(x)), 1)
              ])
            ])
          ], 8, Jd))), 128))
        ])) : (c(), p("p", Xd, u(s(d)("aihot.card.empty")), 1))
      ])
    ]));
  }
}), ru = /* @__PURE__ */ Pe(au, [["__scopeId", "data-v-5b229fc1"]]), lu = ["aria-label"], cu = ["disabled", "aria-pressed"], du = ["disabled", "aria-pressed"], uu = ["aria-label"], pu = ["data-page", "title", "onClick", "onContextmenu", "onDragover", "onDrop"], hu = {
  key: 0,
  id: "bookmark-board-header",
  class: "launcher-page-tabs"
}, fu = ["data-page"], gu = ["href", "title", "data-launcher-id", "onPointerdown", "onClick", "onContextmenu"], mu = ["title", "data-launcher-folder", "onPointerdown", "onDragstart", "onDrop", "onClick", "onContextmenu"], vu = ["title", "onClick"], yu = {
  class: "launcher-folder-count",
  hidden: ""
}, wu = {
  class: "launcher-empty",
  key: "empty-msg"
}, bu = {
  key: 1,
  class: "launcher-media-stack"
}, ku = {
  key: 1,
  id: "launcher-bili"
}, _u = { class: "launcher-folder-preview" }, Cu = { class: "launcher-folder-label launcher-title" }, xu = { class: "launcher-label launcher-title" }, Lu = /* @__PURE__ */ fe({
  __name: "FavoriteSites",
  setup(e) {
    const t = U(() => import("./BookmarkBoard-CXbPwbOD.js")), o = U(() => import("./LauncherBookGuideDialog-sS0oIcG4.js")), n = z("sites"), a = z(!1), r = z(!1);
    function g() {
      r.value = !0;
    }
    function f() {
      r.value = !1;
    }
    function l() {
      we(), w = !1, ge = !1;
    }
    Ye(() => {
      Ke.setExternalDragHandler(D), Ke.setExternalDropHandler(k), window.addEventListener("blur", l), window.addEventListener("pagehide", l), document.addEventListener("visibilitychange", l);
      const b = window;
      pe.hasBili && typeof b.ensureLauncherMediaCards == "function" && b.ensureLauncherMediaCards();
    });
    const h = z(!1), S = z(""), O = z(null), v = z(null), I = z(null), m = z(null);
    let w = !1, M = 0, y = 0, _ = 0, x = "", N = 0, j = "", Z = 0;
    function D(b) {
      if (n.value !== "sites") return;
      if (!b || _t.isOpen) {
        m.value && (m.value = null), j = "";
        return;
      }
      const C = document.elementsFromPoint(b.clientX, b.clientY);
      if (!C.some(
        (Ge) => Ge.classList.contains("launcher-site-items") || !!Ge.closest?.(".launcher-site-items")
      )) {
        m.value && (m.value = null), j = "";
        return;
      }
      const P = C.find((Ge) => Ge.classList.contains("launcher-link") && Ge.getAttribute("data-launcher-id") !== String(b.link.id) || Ge.classList.contains("launcher-folder"));
      if (!P) return;
      const se = P.classList.contains("launcher-link"), Ce = se ? P.getAttribute("data-launcher-id") : null, He = se ? null : P.getAttribute("data-launcher-folder"), re = se ? `link-${Ce}` : `folder-${He}`, ce = P.getBoundingClientRect(), Xe = ce.left + ce.width / 2, fi = ce.top + ce.height / 2, wo = Math.hypot(b.clientX - Xe, b.clientY - fi), Yt = Date.now();
      if (wo > Math.max(ce.width, ce.height) * 0.55 || re === j && Yt - Z < 180) return;
      const Xt = It.value.filter(
        (Ge) => Ge.type !== "link" || String(Ge.link.id) !== String(b.link.id)
      ), mt = [...m.value || Xt], Mt = mt.findIndex(
        (Ge) => Ge.type === "link" && String(Ge.link.id) === String(b.link.id)
      ), Dt = mt.findIndex((Ge) => Ge.key === re);
      if (Dt < 0) return;
      const st = {
        key: `link-${b.link.id}`,
        type: "link",
        link: b.link
      };
      Mt >= 0 ? Mt !== Dt && (mt.splice(Mt, 1), mt.splice(Dt, 0, st), m.value = mt, j = re, Z = Yt) : (mt.splice(Dt, 0, st), m.value = mt, j = re, Z = Yt);
    }
    async function k(b) {
      if (n.value !== "sites" || _t.isOpen) return !1;
      if (m.value) {
        const C = m.value.map(($) => ({
          type: $.type,
          id: $.type === "link" ? String($.link.id) : void 0,
          groupName: $.type === "folder" ? $.folder.groupName : void 0
        }));
        return await Ae.moveLinkTo(String(b.id), pe.activePage, "常用网站"), await Ae.reorderPageItems(pe.activePage, C), m.value = null, j = "", !0;
      }
      return !1;
    }
    const L = $e({
      visible: !1,
      x: 0,
      y: 0,
      type: "link",
      link: null,
      folder: null,
      offsetX: 34,
      offsetY: 38
    });
    let Q = null, T = 0, H = 0, R = null, Y = null, ge = !1;
    function _e(b, C) {
      if (C.button !== 0) return;
      Q = C.pointerId, T = C.clientX, H = C.clientY, y = C.clientX, _ = C.clientY, R = String(b.id), Y = null, ge = !1;
      const $ = C.currentTarget.getBoundingClientRect();
      L.offsetX = C.clientX - $.left, L.offsetY = C.clientY - $.top, L.type = "link", L.link = b, L.folder = null, window.addEventListener("pointermove", ve, { passive: !1 }), window.addEventListener("pointerup", Ie), window.addEventListener("pointercancel", Ie);
    }
    function ze(b, C, $) {
      if ($.button !== 0 || $.target.closest(".launcher-folder-del-btn")) return;
      Q = $.pointerId, T = $.clientX, H = $.clientY, y = $.clientX, _ = $.clientY, R = null, Y = b, ge = !1;
      const P = $.currentTarget.getBoundingClientRect();
      L.offsetX = $.clientX - P.left, L.offsetY = $.clientY - P.top, L.type = "folder", L.folder = {
        groupName: b,
        size: We(b),
        links: C?.links || []
      }, L.link = null, window.addEventListener("pointermove", ve, { passive: !1 }), window.addEventListener("pointerup", Ie), window.addEventListener("pointercancel", Ie);
    }
    let K = 0, B = null;
    function G() {
      cancelAnimationFrame(K), K = 0, B = null;
    }
    function ve(b) {
      b.pointerId === Q && (ge && b.cancelable && b.preventDefault(), B = b, !K && (K = requestAnimationFrame(() => {
        K = 0;
        const C = B;
        B = null, C && xe(C);
      })));
    }
    function xe(b) {
      if (b.pointerId !== Q || !R && !Y) return;
      const C = Math.hypot(b.clientX - T, b.clientY - H);
      if (!ge && C > us && (ge = !0, w = !0, R ? v.value = R : Y && (I.value = Y)), !ge) return;
      (L.link || L.folder) && (L.visible = !0, L.x = b.clientX - L.offsetX, L.y = b.clientY - L.offsetY);
      const $ = document.elementsFromPoint(b.clientX, b.clientY);
      if (an()) {
        const re = $.some(
          (Xe) => Xe.id === "launcher-folder-dialog" || !!Xe.closest?.("#launcher-folder-dialog")
        ), ce = document.querySelector("#launcher-folder-dialog");
        if (re && ce) {
          ce.classList.add("drop-hover-valid"), _t.dropHoverValid = !0;
          return;
        } else
          ce?.classList.remove("drop-hover-valid"), _t.dropHoverValid = !1;
        m.value = null;
        return;
      }
      const se = m.value || It.value, Ce = R ? `link-${R}` : `folder-${Y}`;
      if (se.length) {
        const re = $.find((ce) => {
          if (ce.classList.contains("launcher-link")) {
            const Xe = ce.getAttribute("data-launcher-id");
            return Xe && `link-${Xe}` !== Ce;
          }
          if (ce.classList.contains("launcher-folder")) {
            const Xe = ce.getAttribute("data-launcher-folder");
            return Xe && `folder-${Xe}` !== Ce;
          }
          return !1;
        });
        if (re) {
          const ce = re.classList.contains("launcher-link"), Xe = ce ? re.getAttribute("data-launcher-id") : null, fi = ce ? null : re.getAttribute("data-launcher-folder"), wo = ce ? `link-${Xe}` : `folder-${fi}`, Yt = re.getBoundingClientRect();
          let Xt = !0;
          R && !ce && (hs(Yt, b.clientX, b.clientY) ? (Xt = !1, re.classList.add("drop-target")) : re.classList.remove("drop-target"));
          const mt = Date.now();
          if (fs(Yt, b.clientX, b.clientY) || (Xt = !1), wo === x && mt - N < ps && (Xt = !1), Xt) {
            document.querySelectorAll(".launcher-folder.drop-target").forEach((st) => st.classList.remove("drop-target"));
            const Mt = se.findIndex((st) => st.key === Ce), Dt = se.findIndex((st) => st.key === wo);
            if (Mt >= 0 && Dt >= 0 && Mt !== Dt) {
              const st = se.slice(), Ge = st.splice(Mt, 1)[0];
              st.splice(Dt, 0, Ge), m.value = st, x = wo, N = mt;
            }
          }
        }
      }
      const He = $.find((re) => re.classList.contains("launcher-page-tab"));
      if (He) {
        const re = He.getAttribute("data-page");
        re && re !== pe.activePage && He.classList.add("drop-target");
      } else
        document.querySelectorAll(".launcher-page-tab.drop-target").forEach((re) => re.classList.remove("drop-target"));
    }
    async function Ie(b) {
      if (b.pointerId === Q) {
        G(), b.type === "pointercancel" ? we() : xe(b), window.removeEventListener("pointermove", ve), window.removeEventListener("pointerup", Ie), window.removeEventListener("pointercancel", Ie);
        try {
          if (ge) {
            M = Date.now(), w = !1;
            const C = document.elementsFromPoint(b.clientX, b.clientY);
            if (document.querySelectorAll(".launcher-page-tab.drop-target").forEach((P) => P.classList.remove("drop-target")), document.querySelectorAll(".launcher-folder.drop-target").forEach((P) => P.classList.remove("drop-target")), an() && _t.activeFolder) {
              if (C.some(
                (se) => se.id === "launcher-folder-dialog" || !!se.closest?.("#launcher-folder-dialog")
              )) {
                const Ce = C.find((He) => He.hasAttribute("data-child-folder"))?.getAttribute("data-child-folder") || _t.activeFolder;
                R ? await Ae.moveLinkTo(R, void 0, Ce) : Y && await Ae.moveFolderInto(Y, Ce);
              }
              return;
            }
            const $ = C.find((P) => P.classList.contains("launcher-page-tab"));
            if ($) {
              const P = $.getAttribute("data-page");
              if (P) {
                R ? (await Ae.moveLinkTo(R, P, "常用网站"), await Ae.setPage(P)) : Y && await Ae.moveFolderToPage(Y, P), we();
                return;
              }
            }
            if (R) {
              const P = C.find((se) => se.classList.contains("launcher-folder"));
              if (P) {
                const se = P.getAttribute("data-launcher-folder");
                if (se) {
                  await Ae.moveLinkTo(R, pe.activePage, se), we();
                  return;
                }
              }
            }
            if (m.value) {
              const P = m.value.map((se) => ({
                type: se.type,
                id: se.type === "link" ? String(se.link.id) : void 0,
                groupName: se.type === "folder" ? se.folder.groupName : void 0
              }));
              await Ae.reorderPageItems(pe.activePage, P);
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
      G(), Q = null, R = null, Y = null, ge = !1, w = !1, v.value = null, I.value = null, m.value = null, L.visible = !1, L.link = null, L.folder = null, x = "", document.querySelector("#launcher-folder-dialog")?.classList.remove("drop-hover-valid"), _t.dropHoverValid = !1, window.removeEventListener("pointermove", ve), window.removeEventListener("pointerup", Ie), window.removeEventListener("pointercancel", Ie);
    }
    Rt(() => {
      Ke.setExternalDragHandler(null), Ke.setExternalDropHandler(null), we(), window.removeEventListener("blur", l), window.removeEventListener("pagehide", l), document.removeEventListener("visibilitychange", l), window.removeEventListener("pointermove", ve), window.removeEventListener("pointerup", Ie), window.removeEventListener("pointercancel", Ie);
    });
    function ke(b) {
      const C = pe.pageLabels;
      return C && C[b] ? C[b] : b || "常用网站";
    }
    function ot(b, C) {
      const $ = String(b.page || "").trim(), P = String(C).trim(), se = pe.pageLabels || {}, Ce = !$ || $ === "常用网站" || $ === "默认";
      if (!P || P === "常用网站" || P === "默认") return Ce;
      if (Ce) return !1;
      if ($ === P) return !0;
      const re = se[$] || $, ce = se[P] || P;
      return re === ce || $ === ce || re === P;
    }
    function We(b) {
      const C = pe.groupSizes;
      return C && C[b] === "large" ? "large" : "small";
    }
    function Nt(b) {
      return b === "large" ? 9 : 4;
    }
    function Ot(b, C) {
      const $ = Nt(C), P = b.length > $ ? $ - 1 : $;
      return b.slice(0, P);
    }
    const It = te(() => {
      const b = pe.activePage || "常用网站", $ = pe.links.filter(
        (re) => ot(re, b)
      ), P = /* @__PURE__ */ new Map();
      $.forEach((re) => {
        const ce = re.group || "常用网站";
        ce !== "常用网站" && (P.has(ce) || P.set(ce, []), P.get(ce).push(re));
      });
      const se = /* @__PURE__ */ new Set(), Ce = [];
      $.forEach((re) => {
        const ce = re.group || "常用网站";
        cn(pe.folders, ce) || (ce === "常用网站" ? Ce.push({ key: `link-${re.id}`, type: "link", link: re }) : se.has(ce) || (se.add(ce), Ce.push({
          key: `folder-${ce}`,
          type: "folder",
          folder: {
            groupName: ce,
            pageName: b,
            links: P.get(ce) || []
          }
        })));
      });
      const He = pe.folders;
      return He && Object.entries(He).forEach(([re, ce]) => {
        if (cn(pe.folders, re)) return;
        const Xe = ce?.page || "常用网站";
        (Xe === b || b === "常用网站" && Xe === "默认") && !se.has(re) && (se.add(re), Ce.push({
          key: `folder-${re}`,
          type: "folder",
          folder: {
            groupName: re,
            pageName: b,
            links: P.get(re) || []
          }
        }));
      }), Ce;
    }), yo = te(() => m.value && m.value.length ? m.value : It.value), A = te(() => {
      const b = pe.activePage || "常用网站", C = ke(b);
      return C === "默认" || b === "常用网站" ? "还没有快捷入口，点击“编辑入口”后添加。" : `“${C}”还是空的，把网站拖到这里。`;
    });
    function F(b) {
      m.value = null, v.value = null, I.value = null, Ke.switchPage(b);
    }
    function W() {
      h.value = !0, S.value = "", St(() => {
        O.value?.focus();
      });
    }
    function ue() {
      if (!h.value) return;
      const b = S.value.trim();
      h.value = !1, b && Ke.addPage(b);
    }
    function pt(b) {
      b.key === "Enter" ? (b.preventDefault(), ue()) : b.key === "Escape" && (h.value = !1);
    }
    function bt(b, C) {
      Ke.openPageMenu(b, C);
    }
    function Bt(b) {
      const C = b.target;
      if (!C || C.closest(".launcher-link") || C.closest(".launcher-folder") || C.closest(".launcher-page-tab") || C.closest("button") || C.closest("input"))
        return;
      b.preventDefault();
      const $ = pe.activePage || "常用网站";
      Qi.openBlankMenu($, b.clientX, b.clientY);
    }
    function ys(b) {
      n.value === "sites" && (!b.shiftKey || pe.pages.length < 2 || (b.preventDefault(), b.deltaY > 0 || b.deltaX > 0 ? Ke.nextPage() : Ke.prevPage()));
    }
    function ws(b) {
      b.target.closest(".launcher-page-tab") || b.stopPropagation();
    }
    function bs(b) {
      b.button === 0 && (y = b.clientX, _ = b.clientY);
    }
    function ks(b, C) {
      if (C.preventDefault(), C.stopPropagation(), Ue.isEditingShortcuts) {
        Ue.handleLinkSelection(b);
        return;
      }
      Q || (w = !1), !(Math.hypot(C.clientX - y, C.clientY - _) >= 6 || w || Date.now() - M < 600) && Ke.openLink(b, C);
    }
    function _s(b, C) {
      Ke.openLinkMenu(b, C);
    }
    function Cs(b, C) {
      if (Q || (w = !1), w || Date.now() - M < 450) {
        C.preventDefault(), C.stopPropagation();
        return;
      }
      Ke.openFolder(b, C);
    }
    function xs(b, C, $) {
      Ke.openFolderMenu(b, C, $);
    }
    function Ls(b) {
      Ke.deleteFolder(b);
    }
    function $s(b, C) {
      const $ = Array.from(C.dataTransfer?.types || []);
      if (!$.includes("application/x-newtab-launcher") && !$.includes("application/x-newtab-bookmark") && !$.includes("text/uri-list") && !$.includes("text/plain")) return;
      C.preventDefault(), C.dataTransfer && (C.dataTransfer.dropEffect = "move"), pe.activePage !== b && F(b), C.currentTarget?.classList.add("drop-target");
    }
    function Ss(b) {
      b.currentTarget?.classList.remove("drop-target");
    }
    async function Ts(b, C) {
      C.currentTarget?.classList.remove("drop-target");
      let P = "";
      const se = C.dataTransfer?.getData("application/x-newtab-launcher");
      if (se)
        try {
          P = String(JSON.parse(se)?.id || "");
        } catch {
        }
      if (!P && (v.value || window.__activeLauncherLink) && (P = String(window.__activeLauncherLink?.id || v.value || "")), P) {
        C.preventDefault(), C.stopPropagation(), await Ae.moveLinkTo(P, b, "常用网站"), await Ae.setPage(b);
        return;
      }
      const Ce = window;
      typeof Ce.importDroppedLauncherItem == "function" && (C.preventDefault(), C.stopPropagation(), await Ce.importDroppedLauncherItem(C, "常用网站", b));
    }
    function Is(b) {
      const C = Array.from(b.dataTransfer?.types || []);
      if (!C.includes("application/x-newtab-launcher") && !C.includes("application/x-newtab-bookmark") && !C.includes("text/uri-list") && !C.includes("text/plain")) return;
      b.preventDefault(), b.dataTransfer && (b.dataTransfer.dropEffect = C.includes("application/x-newtab-launcher") ? "move" : "copy"), b.currentTarget?.classList.add("drop-target");
    }
    function Ms(b) {
      const C = b.currentTarget;
      C?.contains(b.relatedTarget) || C?.classList.remove("drop-target");
    }
    async function Ds(b) {
      b.currentTarget?.classList.remove("drop-target");
      let $ = "";
      const P = b.dataTransfer?.getData("application/x-newtab-launcher");
      if (P)
        try {
          $ = String(JSON.parse(P)?.id || "");
        } catch {
        }
      if (!$ && (v.value || window.__activeLauncherLink) && ($ = String(window.__activeLauncherLink?.id || v.value || "")), $) {
        b.preventDefault(), b.stopPropagation(), await Ae.moveLinkTo($, pe.activePage, "常用网站");
        return;
      }
      const se = window;
      if (typeof se.importDroppedLauncherItem == "function") {
        b.preventDefault(), b.stopPropagation(), await se.importDroppedLauncherItem(b, "常用网站", pe.activePage);
        return;
      }
      const Ce = b.dataTransfer?.getData("text/plain");
      Ce && /^https?:\/\//i.test(Ce.trim()) && (b.preventDefault(), b.stopPropagation(), await Ae.addLink({
        title: "",
        url: Ce.trim(),
        page: pe.activePage
      }));
    }
    function an() {
      if (!_t.isOpen) return !1;
      if (typeof document < "u") {
        const b = document.querySelector("#launcher-folder-dialog");
        return !!(b && b.open);
      }
      return !1;
    }
    function As(b, C) {
      C.preventDefault();
    }
    function Es(b) {
      b.preventDefault(), b.dataTransfer && (b.dataTransfer.dropEffect = "move"), b.currentTarget?.classList.add("drop-target");
    }
    function Ps(b) {
      b.currentTarget?.classList.remove("drop-target");
    }
    async function Ws(b, C) {
      C.currentTarget?.classList.remove("drop-target"), C.preventDefault(), C.stopPropagation();
      const P = C.dataTransfer?.getData("application/x-newtab-launcher-folder");
      if (P && P !== b) {
        try {
          await Ae.moveFolderInto(P, b);
        } catch (He) {
          Le.show({ appName: "常用网站", title: "移动未完成", message: He instanceof Error ? He.message : "请刷新后核对。" });
        }
        return;
      }
      let se = "";
      const Ce = C.dataTransfer?.getData("application/x-newtab-launcher");
      if (Ce)
        try {
          se = String(JSON.parse(Ce)?.id || "");
        } catch {
        }
      !se && (v.value || window.__activeLauncherLink) && (se = String(window.__activeLauncherLink?.id || v.value || "")), se && await Ae.moveLinkTo(se, pe.activePage, b);
    }
    return (b, C) => (c(), p(ee, null, [
      s(pe).showSites ? (c(), p("section", {
        key: 0,
        class: "launcher-group launcher-sites size-large",
        onWheel: ys
      }, [
        i("header", {
          class: "launcher-group-head launcher-sites-head",
          onPointerdown: C[5] || (C[5] = V(() => {
          }, ["stop"])),
          onContextmenu: ws
        }, [
          i("div", {
            class: "sites-view-switch",
            role: "group",
            "aria-label": s(d)("home.sites.switchAria")
          }, [
            i("button", {
              type: "button",
              disabled: a.value,
              "aria-pressed": n.value === "sites",
              onClick: C[0] || (C[0] = ($) => n.value = "sites")
            }, u(s(d)("home.sites.favoriteSites")), 9, cu),
            i("button", {
              type: "button",
              disabled: a.value,
              "aria-pressed": n.value === "bookmarks",
              onClick: C[1] || (C[1] = ($) => n.value = "bookmarks")
            }, u(s(d)("home.sites.bookmarks")), 9, du)
          ], 8, lu),
          et(i("div", {
            class: "launcher-page-tabs",
            role: "tablist",
            "aria-label": s(d)("home.sites.pagesAria")
          }, [
            (c(!0), p(ee, null, be(s(pe).pages, ($) => (c(), p("button", {
              key: $,
              type: "button",
              class: de(["launcher-page-tab", { active: $ === s(pe).activePage }]),
              "data-page": $,
              role: "tab",
              title: s(d)("home.sites.pageTabTitle", { label: ke($) }),
              onPointerdown: C[2] || (C[2] = V(() => {
              }, ["stop"])),
              onClick: V((P) => F($), ["prevent", "stop"]),
              onContextmenu: V((P) => bt($, P), ["prevent", "stop"]),
              onDragover: (P) => $s($, P),
              onDragleave: C[3] || (C[3] = (P) => Ss(P)),
              onDrop: (P) => Ts($, P)
            }, u(ke($)), 43, pu))), 128)),
            h.value ? et((c(), p("input", {
              key: 1,
              ref_key: "pageInputRef",
              ref: O,
              class: "launcher-page-input",
              maxlength: "12",
              placeholder: "例如：游戏区",
              "onUpdate:modelValue": C[4] || (C[4] = ($) => S.value = $),
              onKeydown: pt,
              onBlur: ue
            }, null, 544)), [
              [ho, S.value]
            ]) : (c(), p("button", {
              key: 0,
              class: "launcher-page-add",
              type: "button",
              title: "添加网站分区，例如游戏区",
              "aria-label": "添加网站分区",
              onClick: W
            }, " + "))
          ], 8, uu), [
            [fo, n.value === "sites"]
          ]),
          n.value === "bookmarks" ? (c(), p("div", hu)) : E("", !0),
          i("button", {
            class: "launcher-page-help",
            type: "button",
            title: "使用指南：如何创建文件夹与整理网站",
            "aria-label": "使用指南与技巧",
            onClick: g
          }, " ? ")
        ], 32),
        n.value === "bookmarks" ? (c(), he(s(t), {
          key: 0,
          "header-target": "#bookmark-board-header",
          onBusy: C[6] || (C[6] = ($) => a.value = $)
        })) : E("", !0),
        et(i("div", {
          class: "launcher-page-panel",
          "data-page": s(pe).activePage,
          hidden: !1,
          role: "tabpanel",
          onContextmenu: Bt,
          onDragover: C[12] || (C[12] = ($) => Is($)),
          onDragleave: C[13] || (C[13] = ($) => Ms($)),
          onDrop: C[14] || (C[14] = ($) => Ds($))
        }, [
          (c(), he(Wo, {
            tag: "div",
            class: "launcher-items launcher-site-items",
            key: s(pe).activePage,
            name: v.value || I.value ? "launcher-grid" : ""
          }, {
            default: Tt(() => [
              (c(!0), p(ee, null, be(yo.value, ($) => (c(), p(ee, {
                key: $.key
              }, [
                $.type === "link" ? (c(), p("a", {
                  key: $.key,
                  class: de(["launcher-link", {
                    "is-dragging": v.value === String($.link.id),
                    "is-wheel-picked": s(Ue).isEditingShortcuts && s(Ue).isLinkInWheel($.link.url)
                  }]),
                  href: $.link.url,
                  title: $.link.title + ($.link.note ? `
📝 ` + $.link.note : "") + `
🔗 ` + $.link.url,
                  "data-launcher-id": String($.link.id),
                  target: "_blank",
                  rel: "noreferrer",
                  draggable: "false",
                  onDragstart: C[7] || (C[7] = V(() => {
                  }, ["prevent"])),
                  onPointerdown: (P) => _e($.link, P),
                  onMousedown: C[8] || (C[8] = (P) => bs(P)),
                  onClick: V((P) => ks($.link, P), ["prevent"]),
                  onContextmenu: V((P) => _s($.link, P), ["prevent"])
                }, [
                  X(Eo, {
                    link: $.link
                  }, null, 8, ["link"])
                ], 42, gu)) : $.type === "folder" ? (c(), p("div", {
                  key: $.key,
                  class: de(["launcher-folder", [
                    `size-${We($.folder.groupName)}`,
                    { "is-dragging": I.value === $.folder.groupName }
                  ]]),
                  title: `${$.folder.groupName}
可拖动调整位置；右键调整收藏夹大小`,
                  role: "button",
                  tabindex: "0",
                  "data-launcher-folder": String($.folder.groupName),
                  draggable: "true",
                  onPointerdown: (P) => ze($.folder.groupName, $.folder, P),
                  onDragstart: (P) => As($.folder.groupName, P),
                  onDragover: C[10] || (C[10] = (P) => Es(P)),
                  onDragleave: C[11] || (C[11] = (P) => Ps(P)),
                  onDrop: (P) => Ws($.folder.groupName, P),
                  onClick: (P) => Cs($.folder.groupName, P),
                  onContextmenu: V((P) => xs($.folder.groupName, $.folder.pageName, P), ["prevent"])
                }, [
                  X(Eo, {
                    folder: { title: $.folder.groupName, preview: $.folder.links, count: $.folder.links.length },
                    size: We($.folder.groupName)
                  }, {
                    default: Tt(() => [
                      i("button", {
                        class: "launcher-folder-del-btn",
                        type: "button",
                        title: `删除文件夹「${$.folder.groupName}」`,
                        "aria-label": "删除文件夹",
                        onPointerdown: C[9] || (C[9] = V(() => {
                        }, ["stop"])),
                        onClick: V((P) => Ls($.folder.groupName), ["stop", "prevent"])
                      }, " ✕ ", 40, vu)
                    ]),
                    _: 2
                  }, 1032, ["folder", "size"]),
                  i("span", yu, u($.folder.links.length), 1)
                ], 42, mu)) : E("", !0)
              ], 64))), 128)),
              yo.value.length ? E("", !0) : (c(), p("p", wu, u(A.value), 1))
            ]),
            _: 1
          }, 8, ["name"]))
        ], 40, fu), [
          [fo, n.value === "sites"]
        ])
      ], 32)) : E("", !0),
      s(pe).hasTodo || s(pe).hasBili ? (c(), p("div", bu, [
        s(pe).hasTodo ? (c(), he(ru, { key: 0 })) : s(pe).hasBili ? (c(), p("div", ku)) : E("", !0)
      ])) : E("", !0),
      (c(), he(wt, { to: "body" }, [
        L.visible ? (c(), p("div", {
          key: 0,
          class: de(["launcher-drag-ghost", [
            L.type === "folder" ? `folder-ghost size-${L.folder?.size}` : "link-ghost"
          ]]),
          style: Te({
            left: `${L.x}px`,
            top: `${L.y}px`
          })
        }, [
          L.type === "folder" && L.folder ? (c(), p(ee, { key: 0 }, [
            i("div", _u, [
              (c(!0), p(ee, null, be(Ot(L.folder.links, L.folder.size), ($, P) => (c(), he(li, {
                key: $.id || P,
                link: $,
                mini: !0
              }, null, 8, ["link"]))), 128))
            ]),
            i("span", Cu, u(L.folder.groupName), 1)
          ], 64)) : L.link ? (c(), p(ee, { key: 1 }, [
            X(li, {
              link: L.link
            }, null, 8, ["link"]),
            i("span", xu, u(L.link.title), 1)
          ], 64)) : E("", !0)
        ], 6)) : E("", !0)
      ])),
      X(s(o), {
        open: r.value,
        onClose: f
      }, null, 8, ["open"])
    ], 64));
  }
}), gs = /* @__PURE__ */ Pe(Lu, [["__scopeId", "data-v-63287e7b"]]), oi = Object.keys(vo);
let Yo = !1, Ai = 0, $o, Ei;
function Sn(e) {
  for (const t of oi)
    Object.prototype.hasOwnProperty.call(e, t) && (vo[t] = e[t] !== !1);
}
function $u() {
  const e = vo;
  Ke.setPrefs(e.showSites, e.showTodo, !e.showTodo && e.showBili), document.body.classList.toggle("hide-weather", !e.showWeather), document.body.classList.toggle("hide-sites", !e.showSites), document.body.classList.toggle("hide-bili", !e.showBili), document.body.classList.toggle("hide-youtube", !e.showYouTube), document.body.classList.toggle("hide-todo", !e.showTodo), document.body.classList.toggle("hide-bookmarks", !e.showBookmarkPanel), e.showBookmarkPanel || ci.close();
}
const Tn = {
  start() {
    if (Yo) return;
    Yo = !0;
    const e = ++Ai;
    Ei = Ne(() => oi.map((o) => vo[o]), $u, { immediate: !0, flush: "sync" });
    const t = globalThis.chrome;
    $o = (o, n) => {
      if (n !== "local") return;
      const a = {};
      for (const r of oi) o[r] && (a[r] = o[r].newValue);
      Sn(a);
    }, t?.storage?.onChanged?.addListener($o), t?.storage?.local && t.storage.local.get(oi).then((o) => {
      Yo && Ai === e && Sn(o || {});
    }).catch((o) => console.warn("[HomePrefs] 读取首页设置失败", o));
  },
  stop() {
    Yo = !1, Ai++, Ei?.(), Ei = void 0, $o && globalThis.chrome?.storage?.onChanged?.removeListener($o), $o = void 0;
  }
}, Su = {
  id: "launcher",
  class: "launcher",
  "aria-label": "快捷入口"
}, Tu = { class: "launcher-inner" }, Iu = { class: "launcher-overview" }, Mu = ["title"], Du = { class: "card-head" }, Au = { id: "wx-title" }, Eu = { id: "weather-body" }, Pu = { class: "launcher-center" }, Wu = {
  class: "hero-clock",
  id: "hero-clock"
}, Ru = {
  class: "launcher-widget launcher-task-threads launcher-music-card",
  "data-home-module": "taskThreads"
}, Nu = { class: "card-head" }, Ou = ["title"], Bu = {
  id: "task-thread-home",
  class: "task-thread-home home-music-body"
}, Fu = /* @__PURE__ */ fe({
  __name: "AppLauncher",
  setup(e) {
    Ye(() => {
      ii.initWallpaper();
    });
    function t() {
      Oe.handleToolClick("music");
    }
    return (o, n) => (c(), p("section", Su, [
      n[4] || (n[4] = i("div", {
        id: "hero-background-media",
        class: "hero-background-media",
        "aria-hidden": "true"
      }, null, -1)),
      i("div", Tu, [
        i("div", Iu, [
          et(i("section", {
            class: "launcher-widget launcher-weather",
            "data-home-module": "weather",
            title: s(d)("weather.widgetSwitchTip")
          }, [
            i("header", Du, [
              n[1] || (n[1] = i("span", {
                class: "bar",
                style: { background: "linear-gradient(180deg,#38bdf8,#818cf8)" }
              }, null, -1)),
              i("h2", Au, u(s(d)("weather.widgetTitle")), 1)
            ]),
            i("div", Eu, [
              X(ls)
            ])
          ], 8, Mu), [
            [fo, s(vo).showWeather]
          ]),
          i("div", Pu, [
            i("div", Wu, [
              X(td),
              X(cs)
            ]),
            i("form", {
              id: "search",
              class: "search",
              onSubmit: n[0] || (n[0] = V(() => {
              }, ["prevent"]))
            }, [
              X(En)
            ], 32)
          ]),
          i("section", Ru, [
            i("header", Nu, [
              n[2] || (n[2] = i("span", { class: "bar music-purple" }, null, -1)),
              i("h2", null, u(s(d)("home.music.player")), 1),
              n[3] || (n[3] = i("span", { class: "grow" }, null, -1)),
              i("button", {
                id: "home-music-open-panel",
                class: "home-music-head-btn",
                type: "button",
                title: s(d)("home.music.openNeteaseTip"),
                onClick: t
              }, u(s(d)("home.music.openNetease")), 9, Ou)
            ]),
            i("div", Bu, [
              X(ds)
            ])
          ])
        ]),
        i("div", {
          id: "launcher-groups",
          class: de(["launcher-groups", { "has-sites": s(pe).showSites, "has-todoist": s(pe).hasTodo, "has-bili": s(pe).hasBili, "has-media": s(pe).hasTodo || s(pe).hasBili }])
        }, [
          X(gs)
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
}), po = $e(/* @__PURE__ */ new Set()), jt = $e({}), it = $e({});
function Pi(e) {
  const t = nt(e);
  if (!t?.lifecycle.canUnmount || t.lifecycle.canUnmount()) return { ok: !0 };
  const o = t.lifecycle.unmountBlockedMessage || "模块操作尚未结束，不能退出或重载。";
  return Le.show({ appName: t.title, title: "操作进行中", message: o, showActions: !1 }), { ok: !1, error: o };
}
const Fe = {
  // 检查应用是否处于运行显示状态（驱动 Dock 上的小圆点：关闭即熄灭，不保留 macOS 风格后台悬浮绿点）
  isRunning(e) {
    return this.isVisible(e);
  },
  // 检查应用当前是否在屏幕上可见（窗口是否打开）
  isVisible(e) {
    const t = nt(e);
    return t ? t.lifecycle.isVisible() : yi(e) ? !!fa[e] : ga(e);
  },
  // 标记应用启动
  markRunning(e) {
    po.add(e), (e in it || nt(e)) && (it[e] = !0);
  },
  // 获取组件当前的 render key
  getRenderKey(e) {
    return jt[e] || 0;
  },
  // 打开 / 显示应用窗口
  openApp(e) {
    const t = nt(e);
    if (t) {
      Oe.open(e), t.lifecycle.isVisible() && this.markRunning(e);
      return;
    }
    if (this.markRunning(e), yi(e)) {
      un.open(e);
      return;
    }
    Oe.open(e);
  },
  // 隐藏/关闭窗口：立即退出可见运行态并熄灭 Dock 指示绿点
  hideApp(e) {
    if (po.delete(e), nt(e)) {
      Oe.close(e);
      return;
    }
    if (yi(e)) {
      un.close(e);
      return;
    }
    Oe.close(e);
  },
  // 真正的关闭（Quit / 彻底从内存与 DOM 中卸载销毁，熄灭小圆点）
  async quitApp(e) {
    if (nt(e)) {
      const a = Pi(e);
      if (!a.ok) return a;
      const r = nt(e)?.lifecycle.beforeQuit;
      if (r) {
        const l = Ht(e);
        try {
          await r();
        } catch {
          const S = "后台停止未确认，窗口保留；未自动重试，请检查后台状态。";
          return Le.show({ appName: nt(e).title, title: "未退出", message: S, showActions: !1 }), { ok: !1, error: S };
        }
        if (Ht(e) !== l) return { ok: !1, error: "窗口已有后续操作，未卸载。" };
        const h = Pi(e);
        if (!h.ok) return h;
      }
      const g = Oe.close(e), f = Ht(e);
      return po.delete(e), it[e] = !1, xt.removeActiveTool(e), await g, await St(), Ht(e) === f ? { ok: !0 } : { ok: !1, error: "模块已有后续操作，退出状态已变化。" };
    }
    this.hideApp(e), po.delete(e), xt.removeActiveTool(e), e in it && (it[e] = !1);
    const t = ha;
    t.activeId === e && (t.activeId = "");
    const o = t.openOrder.indexOf(e);
    o >= 0 && t.openOrder.splice(o, 1);
    const n = t.activeTools.indexOf(e);
    n >= 0 && t.activeTools.splice(n, 1), Oe.render();
  },
  // 重新加载（Reload / 单应用热重启，重新初始化组件）
  async reloadApp(e) {
    const t = nt(e);
    if (t) {
      if (t.lifecycle.canOpen && !t.lifecycle.canOpen()) return { ok: !1, error: "模块当前不能打开，未重载窗口。" };
      const o = Pi(e);
      if (!o.ok) return o;
      const n = Oe.close(e), a = Ht(e);
      return await n, Ht(e) !== a ? { ok: !1, error: "模块已有后续操作，重载已取消。" } : (it[e] = !1, await St(), Ht(e) !== a ? { ok: !1, error: "模块已有后续操作，未重新打开。" } : (jt[e] = (jt[e] || 0) + 1, Oe.open(e), t.lifecycle.isVisible() ? (this.markRunning(e), { ok: !0 }) : { ok: !1, error: "模块当前不能打开，未重新显示窗口。" }));
    }
    this.hideApp(e), e in it ? (it[e] = !1, await St(), jt[e] = (jt[e] || 0) + 1, it[e] = !0) : jt[e] = (jt[e] || 0) + 1, await St(), this.openApp(e);
  }
}, Qt = /* @__PURE__ */ fe({
  __name: "DockCardModuleHost",
  props: {
    id: {}
  },
  setup(e) {
    const o = nt(e.id);
    if (!o || o.presentation !== "card") throw new Error("Unknown registered workspace card");
    const n = o;
    n.mountPolicy === "workspace-ready" && Fe.markRunning(n.id), Ne(n.lifecycle.isVisible, (h) => {
      h && Fe.markRunning(n.id);
    }, { immediate: !0, flush: "sync" });
    const a = te(() => !!it[n.id]);
    function r() {
      try {
        n.lifecycle.hide();
      } catch {
      }
      (vt.activeId === n.id || vt.activeId === n.rootId) && (vt.activeId = null), Fe.hideApp(n.id), typeof document < "u" && (document.body.classList.toggle("has-card-fullscreen", !!vt.activeId), document.body.dataset.page = vt.activeId ? "daily" : "home");
    }
    function g() {
      Fe.reloadApp(n.id);
    }
    function f() {
      typeof window < "u" && window.location.reload();
    }
    const l = U({
      loader: n.loadView,
      onError(h, S, O, v) {
        v <= 2 ? S() : O();
      },
      errorComponent: fe({
        setup: () => () => n.lifecycle.isVisible() ? Ve("section", { class: "card wide card-fullscreen", role: "alert" }, [
          Ve("h2", n.title),
          Ve("p", "工作区切片加载受阻（可能因插件重载或切片更新）。可点击「重新加载模块」，或返回首页。"),
          Ve("div", { style: "display: flex; gap: 10px; margin-top: 14px;" }, [
            Ve("button", {
              type: "button",
              style: "padding: 6px 14px; border-radius: 999px; border: 1px solid var(--border); background: var(--primary, #3b82f6); color: #fff; cursor: pointer; font-size: 12px; font-weight: 500;",
              onClick: f
            }, "⟳ 刷新标签页 (加载最新版)"),
            Ve("button", {
              type: "button",
              style: "padding: 6px 14px; border-radius: 999px; border: 1px solid var(--border); background: var(--surface); color: var(--text); cursor: pointer; font-size: 12px;",
              onClick: g
            }, "↻ 重新加载模块"),
            Ve("button", {
              type: "button",
              style: "padding: 6px 14px; border-radius: 999px; border: 1px solid var(--border); background: var(--surface); color: var(--text); cursor: pointer; font-size: 12px;",
              onClick: r
            }, "返回首页")
          ])
        ]) : null
      })
    });
    return mo(() => {
      r(), po.delete(n.id), delete it[n.id];
    }), (h, S) => a.value ? (c(), he(Wn(s(l)), {
      key: s(Fe).getRenderKey(s(n).id)
    })) : E("", !0);
  }
}), Hu = { class: "logicweaver-workspaces-layer" }, ju = {
  key: 0,
  id: "daily-section",
  class: "wrap"
}, Ku = { id: "vue-todoist-root" }, zu = { id: "vue-bili-favorites-root" }, Gu = { id: "vue-youtube-root" }, Vu = { id: "vue-pricing-root" }, Uu = { id: "vue-aihot-root" }, Yu = /* @__PURE__ */ fe({
  __name: "AppWorkspaces",
  setup(e) {
    const t = z(!!vt.activeId);
    return Ye(() => {
      t.value || (typeof window < "u" && "requestIdleCallback" in window ? window.requestIdleCallback(() => {
        t.value = !0;
      }, { timeout: 80 }) : setTimeout(() => {
        t.value = !0;
      }, 40));
    }), (o, n) => (c(), p("div", Hu, [
      t.value ? (c(), p("main", ju, [
        i("div", Ku, [
          X(Qt, { id: "todoist" })
        ]),
        i("div", zu, [
          X(Qt, { id: "daily-bilibili" })
        ]),
        et(i("div", Gu, [
          X(Qt, { id: "daily-youtube" })
        ], 512), [
          [fo, s(vo).showYouTube]
        ]),
        i("div", Vu, [
          X(Qt, { id: "daily-pricing" })
        ]),
        i("div", Uu, [
          X(Qt, { id: "daily-aihot" })
        ]),
        X(Qt, { id: "card-github" })
      ])) : E("", !0)
    ]));
  }
}), Xu = ["aria-label"], qu = { class: "dock-menu-head" }, Ju = { class: "dock-menu-title" }, Zu = ["src", "alt"], Qu = {
  key: 1,
  class: "dock-menu-emoji"
}, ep = { class: "dock-menu-text" }, tp = { class: "dock-menu-text" }, op = { class: "dock-menu-text" }, ip = /* @__PURE__ */ fe({
  __name: "DockContextMenu",
  props: {
    target: {}
  },
  emits: ["close", "action"],
  setup(e, { emit: t }) {
    const o = e, n = t, a = te(() => !o.target || o.target.type !== "tool" ? !1 : Fe.isRunning(o.target.id)), r = te(() => !o.target || o.target.type !== "tool" ? !1 : Fe.isVisible(o.target.id)), { menuRef: g, style: f } = Un({
      visible: () => !!o.target,
      anchor: () => o.target || { x: 0, y: 0 },
      placement: io.position === "top" ? "below" : "above",
      align: "center",
      gap: 12,
      dismiss: () => n("close")
    });
    function l() {
      o.target && (Fe.openApp(o.target.id), n("close"));
    }
    function h() {
      o.target && (Fe.hideApp(o.target.id), n("close"));
    }
    async function S() {
      o.target && (await Fe.reloadApp(o.target.id), n("close"));
    }
    async function O() {
      if (!o.target) return;
      const m = o.target;
      if ((await Fe.quitApp(m.id))?.ok === !1) {
        n("close");
        return;
      }
      Le.show({
        appName: m.title,
        title: d("dock.quitDone"),
        subtitle: d("dock.quitSubtitle"),
        icon: m.icon || "assets/logo.png",
        duration: 2800
      }), n("close");
    }
    async function v() {
      if (!o.target) return;
      const m = o.target, w = Ro.uninstall(m.id);
      n("close"), await w || Le.show({
        appName: m.title,
        title: "入口停用未确认",
        subtitle: Ro.state.errorMessage || "请打开模块管理核对当前启用状态",
        icon: m.icon || "assets/logo.png",
        duration: 4e3
      });
    }
    function I() {
      if (!o.target) return;
      const w = {
        "daily-bilibili": "https://www.bilibili.com",
        "card-github": "https://github.com",
        "daily-aihot": "https://news.ycombinator.com",
        "daily-youtube": "https://www.youtube.com",
        "daily-pricing": "https://openai.com/api/pricing"
      }[o.target.id] || "https://www.bilibili.com";
      window.open(w, "_blank"), n("close");
    }
    return (m, w) => (c(), he(wt, { to: "body" }, [
      e.target ? (c(), p("div", {
        key: 0,
        ref_key: "menuRef",
        ref: g,
        role: "group",
        "aria-label": `${e.target.title}操作`,
        class: "dock-context-menu",
        style: Te(s(f)),
        onClick: w[1] || (w[1] = V(() => {
        }, ["stop"])),
        onContextmenu: w[2] || (w[2] = V(() => {
        }, ["prevent"]))
      }, [
        i("div", qu, [
          i("div", Ju, [
            e.target.icon ? (c(), p("img", {
              key: 0,
              class: "dock-menu-icon",
              src: e.target.icon,
              alt: e.target.title
            }, null, 8, Zu)) : e.target.emoji ? (c(), p("span", Qu, u(e.target.emoji), 1)) : E("", !0),
            i("strong", null, u(e.target.title), 1)
          ]),
          e.target.type === "tool" ? (c(), p("span", {
            key: 0,
            class: de(["dock-status-tag", { "is-running": a.value }])
          }, [
            w[3] || (w[3] = i("span", { class: "dock-status-dot" }, null, -1)),
            tt(" " + u(a.value ? s(d)("dock.menu.running") : s(d)("dock.menu.notStarted")), 1)
          ], 2)) : E("", !0)
        ]),
        w[12] || (w[12] = i("div", { class: "dock-menu-divider" }, null, -1)),
        e.target.type === "tool" ? (c(), p(ee, { key: 0 }, [
          r.value ? (c(), p("button", {
            key: 1,
            type: "button",
            class: "dock-menu-item",
            onClick: h
          }, [
            w[5] || (w[5] = i("span", { class: "dock-menu-symbol" }, "−", -1)),
            i("span", null, u(s(d)("dock.menu.hideWindow")), 1)
          ])) : (c(), p("button", {
            key: 0,
            type: "button",
            class: "dock-menu-item",
            onClick: l
          }, [
            w[4] || (w[4] = i("span", { class: "dock-menu-symbol" }, "↗", -1)),
            i("span", null, u(s(d)("dock.menu.openWindow")), 1)
          ])),
          i("button", {
            type: "button",
            class: "dock-menu-item",
            onClick: S
          }, [
            w[6] || (w[6] = i("span", { class: "dock-menu-symbol" }, "⟲", -1)),
            i("div", ep, [
              i("span", null, u(s(d)("dock.menu.reloadApp")), 1),
              i("small", null, u(s(d)("dock.menu.reloadSub")), 1)
            ])
          ]),
          w[9] || (w[9] = i("div", { class: "dock-menu-divider" }, null, -1)),
          i("button", {
            type: "button",
            class: "dock-menu-item",
            onClick: v
          }, [
            w[7] || (w[7] = i("span", { class: "dock-menu-symbol" }, "📌", -1)),
            i("div", tp, [
              i("span", null, u(s(d)("dock.menu.removeFromDock")), 1),
              i("small", null, u(s(d)("dock.menu.removeSub")), 1)
            ])
          ]),
          i("button", {
            type: "button",
            class: "dock-menu-item item-danger",
            onClick: O
          }, [
            w[8] || (w[8] = i("span", { class: "dock-menu-symbol" }, "✕", -1)),
            i("div", op, [
              i("span", null, u(s(d)("dock.menu.quitApp")), 1),
              i("small", null, u(s(d)("dock.menu.quitSub")), 1)
            ])
          ])
        ], 64)) : e.target.type === "card" ? (c(), p("button", {
          key: 1,
          type: "button",
          class: "dock-menu-item",
          onClick: I
        }, [
          w[10] || (w[10] = i("span", { class: "dock-menu-symbol" }, "↗", -1)),
          i("span", null, u(s(d)("dock.menu.openOfficial")), 1)
        ])) : (c(), p("button", {
          key: 2,
          type: "button",
          class: "dock-menu-item",
          onClick: w[0] || (w[0] = (M) => n("close"))
        }, [...w[11] || (w[11] = [
          i("span", { class: "dock-menu-symbol" }, "🏠", -1),
          i("span", null, "返回常用主页", -1)
        ])]))
      ], 44, Xu)) : E("", !0)
    ]));
  }
}), np = /* @__PURE__ */ Pe(ip, [["__scopeId", "data-v-3973d271"]]), sp = { class: "mac-dock-shelf" }, ap = ["data-dock-target", "title", "onPointerdown", "onClick", "onContextmenu"], rp = ["src", "alt"], lp = {
  key: 0,
  class: "mac-dock-dot",
  "aria-hidden": "true"
}, cp = ["title"], dp = ["alt"], up = ["data-dock-tool", "title", "onPointerdown", "onClick", "onContextmenu"], pp = ["src", "alt"], hp = {
  key: 1,
  class: "mac-dock-emoji",
  "aria-hidden": "true"
}, fp = {
  key: 2,
  class: "mac-dock-dot",
  "aria-hidden": "true"
}, gp = {
  key: 3,
  class: "mac-dock-badge"
}, mp = ["title"], vp = ["src"], yp = {
  key: 1,
  class: "mac-dock-emoji"
}, wp = /* @__PURE__ */ fe({
  __name: "MacDock",
  setup(e) {
    const t = te(() => io), o = z(null), n = te(() => Object.fromEntries(io.tools.map((T) => {
      const H = nt(T.id)?.badgeCount?.() || 0;
      return [T.id, Number.isFinite(H) ? Math.max(0, Math.floor(H)) : 0];
    })));
    function a(T) {
      T.stopPropagation(), o.value = null, O(T.currentTarget), Ro.open();
    }
    function r(T, H) {
      H.stopPropagation(), o.value = null, O(H.currentTarget), xt.triggerItem("target", T);
    }
    function g(T, H) {
      const Y = H.currentTarget.getBoundingClientRect(), ge = io.position, _e = ge === "left" || ge === "right";
      o.value = {
        type: "card",
        id: T.id,
        title: T.title,
        icon: T.icon,
        x: _e ? ge === "left" ? Y.right + 8 : Y.left - 8 : Y.left + Y.width / 2,
        y: _e ? Y.top + Y.height / 2 : ge === "top" ? Y.bottom + 8 : Y.top
      };
    }
    function f(T) {
      T.stopPropagation(), o.value = null, O(T.currentTarget), xt.triggerItem("home", "home-launcher");
    }
    function l(T, H) {
      H.stopPropagation(), o.value = null, O(H.currentTarget), nt(T) || Fe.markRunning(T), xt.triggerItem("tool", T);
    }
    function h(T, H) {
      const Y = H.currentTarget.getBoundingClientRect(), ge = io.position, _e = ge === "left" || ge === "right";
      o.value = {
        type: "tool",
        id: T.id,
        title: T.title,
        icon: T.icon,
        emoji: T.emoji,
        x: _e ? ge === "left" ? Y.right + 8 : Y.left - 8 : Y.left + Y.width / 2,
        y: _e ? Y.top + Y.height / 2 : ge === "top" ? Y.bottom + 8 : Y.top
      };
    }
    const S = /* @__PURE__ */ new Map();
    function O(T) {
      if (!T || (S.get(T)?.cancel(), window.matchMedia("(prefers-reduced-motion: reduce)").matches)) return;
      const H = T.animate([
        { translate: "0 0", offset: 0 },
        { translate: "0 -8px", offset: 0.35 },
        { translate: "0 0", offset: 0.65 },
        { translate: "0 -2px", offset: 0.85 },
        { translate: "0 0", offset: 1 }
      ], { duration: 350, easing: "ease" });
      S.set(T, H);
      const R = () => {
        S.get(T) === H && S.delete(T);
      };
      H.onfinish = R, H.oncancel = R;
    }
    const v = z(null), I = $e({
      visible: !1,
      x: 0,
      y: 0,
      width: 40,
      height: 40,
      item: null,
      type: "tool"
    }), m = z(null), w = z(null), M = te(() => m.value || t.value.cards), y = te(() => w.value || t.value.tools);
    let _ = "", x = 0, N = !1, j = 0;
    function Z(T, H, R) {
      if (R.button !== 0 || R.target.closest(".mac-dock-market-btn")) return;
      const _e = R.currentTarget.getBoundingClientRect();
      N = !1, v.value = {
        type: T,
        id: H.id,
        item: H,
        startX: R.clientX,
        startY: R.clientY,
        initialLeft: _e.left,
        initialTop: _e.top,
        width: _e.width,
        height: _e.height
      }, window.addEventListener("pointermove", D), window.addEventListener("pointerup", k), window.addEventListener("pointercancel", k);
    }
    function D(T) {
      if (!v.value) return;
      const H = T.clientX - v.value.startX, R = T.clientY - v.value.startY, Y = Math.hypot(H, R);
      if (!N && Y > 5 && (N = !0, I.visible = !0, I.item = v.value.item, I.type = v.value.type, I.width = v.value.width, I.height = v.value.height, v.value.type === "card" ? m.value = [...t.value.cards] : w.value = [...t.value.tools]), !N) return;
      I.x = T.clientX - I.width / 2, I.y = T.clientY - I.height / 2;
      const _e = document.elementsFromPoint(T.clientX, T.clientY).find(
        (xe) => xe.classList.contains("mac-dock-item") && !xe.classList.contains("mac-dock-market-btn")
      );
      if (!_e) return;
      const ze = _e.getAttribute("data-dock-target"), K = _e.getAttribute("data-dock-tool"), B = v.value.type, G = v.value.id, ve = Date.now();
      if (B === "card" && ze && ze !== G && ze !== "home-launcher") {
        const xe = _e.getBoundingClientRect(), Ie = xe.left + xe.width / 2;
        if (Math.abs(T.clientX - Ie) > xe.width * 0.55 || ze === _ && ve - x < 180) return;
        const we = [...m.value || t.value.cards], ke = we.findIndex((We) => We.id === G), ot = we.findIndex((We) => We.id === ze);
        if (ke >= 0 && ot >= 0 && ke !== ot) {
          const We = we.splice(ke, 1)[0];
          we.splice(ot, 0, We), m.value = we, _ = ze, x = ve;
        }
      } else if (B === "tool" && K && K !== G) {
        const xe = _e.getBoundingClientRect(), Ie = xe.left + xe.width / 2;
        if (Math.abs(T.clientX - Ie) > xe.width * 0.55 || K === _ && ve - x < 180) return;
        const we = [...w.value || t.value.tools], ke = we.findIndex((We) => We.id === G), ot = we.findIndex((We) => We.id === K);
        if (ke >= 0 && ot >= 0 && ke !== ot) {
          const We = we.splice(ke, 1)[0];
          we.splice(ot, 0, We), w.value = we, _ = K, x = ve;
        }
      }
    }
    function k() {
      window.removeEventListener("pointermove", D), window.removeEventListener("pointerup", k), window.removeEventListener("pointercancel", k), N && v.value && (j = Date.now() + 250, v.value.type === "card" && m.value ? xt.reorderCards(m.value.map((T) => T.id)) : v.value.type === "tool" && w.value && xt.reorderTools(w.value.map((T) => T.id))), I.visible = !1, I.item = null, m.value = null, w.value = null, v.value = null, N = !1, _ = "";
    }
    function L(T, H) {
      Date.now() < j || r(T, H);
    }
    function Q(T, H) {
      Date.now() < j || l(T, H);
    }
    return mo(() => {
      for (const T of S.values()) T.cancel();
      S.clear(), window.removeEventListener("pointermove", D), window.removeEventListener("pointerup", k), window.removeEventListener("pointercancel", k);
    }), (T, H) => (c(), p(ee, null, [
      i("div", sp, [
        X(Wo, {
          tag: "div",
          class: "mac-dock-group mac-dock-cards-group",
          name: "dock-item-motion"
        }, {
          default: Tt(() => [
            (c(!0), p(ee, null, be(M.value, (R) => (c(), p("button", {
              key: R.id,
              class: de(["mac-dock-item", {
                "is-active": t.value.activeTargetId === R.id,
                "is-drag-origin": v.value && v.value.id === R.id
              }]),
              type: "button",
              "data-dock-target": R.id,
              title: R.title,
              onPointerdown: (Y) => Z("card", R, Y),
              onClick: V((Y) => L(R.id, Y), ["stop"]),
              onContextmenu: V((Y) => g(R, Y), ["prevent"])
            }, [
              i("img", {
                class: "mac-dock-icon",
                src: R.icon,
                alt: R.title
              }, null, 8, rp),
              t.value.activeTargetId === R.id ? (c(), p("span", lp)) : E("", !0)
            ], 42, ap))), 128))
          ]),
          _: 1
        }),
        H[4] || (H[4] = i("div", {
          class: "mac-dock-divider",
          "aria-hidden": "true"
        }, null, -1)),
        i("button", {
          class: "mac-dock-item",
          type: "button",
          "data-dock-target": "home-launcher",
          title: s(d)("dock.home"),
          onClick: H[0] || (H[0] = V((R) => f(R), ["stop"]))
        }, [
          i("img", {
            class: "mac-dock-icon",
            src: "assets/nav-home.svg",
            alt: s(d)("dock.home")
          }, null, 8, dp)
        ], 8, cp),
        H[5] || (H[5] = i("div", {
          class: "mac-dock-divider mac-dock-divider-dark",
          "aria-hidden": "true"
        }, null, -1)),
        X(Wo, {
          tag: "div",
          class: "mac-dock-group mac-dock-tools-group",
          name: "dock-item-motion"
        }, {
          default: Tt(() => [
            (c(!0), p(ee, null, be(y.value, (R) => (c(), p("button", {
              key: R.id,
              class: de(["mac-dock-item", {
                "is-active": s(Fe).isRunning(R.id),
                "is-drag-origin": v.value && v.value.id === R.id
              }]),
              type: "button",
              "data-dock-tool": R.id,
              title: R.title,
              onPointerdown: (Y) => Z("tool", R, Y),
              onClick: V((Y) => Q(R.id, Y), ["stop"]),
              onContextmenu: V((Y) => h(R, Y), ["prevent"])
            }, [
              R.icon ? (c(), p("img", {
                key: 0,
                class: "mac-dock-icon",
                src: R.icon,
                alt: R.title
              }, null, 8, pp)) : R.emoji ? (c(), p("span", hp, u(R.emoji), 1)) : E("", !0),
              s(Fe).isRunning(R.id) ? (c(), p("span", fp)) : E("", !0),
              n.value[R.id] > 0 ? (c(), p("span", gp, u(n.value[R.id] > 99 ? "99+" : n.value[R.id]), 1)) : E("", !0)
            ], 42, up))), 128))
          ]),
          _: 1
        }),
        i("button", {
          class: de(["mac-dock-item mac-dock-market-btn", { "is-active": s(Ro).state.isOpen }]),
          type: "button",
          title: s(d)("dock.market"),
          onClick: H[1] || (H[1] = V((R) => a(R), ["stop"]))
        }, [...H[3] || (H[3] = [
          i("span", {
            class: "mac-dock-market-icon",
            "aria-hidden": "true"
          }, "🧩", -1)
        ])], 10, mp)
      ]),
      (c(), he(wt, { to: "body" }, [
        I.visible && I.item ? (c(), p("div", {
          key: 0,
          class: "mac-dock-drag-ghost",
          style: Te({
            width: I.width + "px",
            height: I.height + "px",
            transform: "translate3d(" + I.x + "px," + I.y + "px, 0)"
          }),
          "aria-hidden": "true"
        }, [
          I.item.icon ? (c(), p("img", {
            key: 0,
            class: "mac-dock-icon",
            src: I.item.icon,
            alt: ""
          }, null, 8, vp)) : I.item.emoji ? (c(), p("span", yp, u(I.item.emoji), 1)) : E("", !0)
        ], 4)) : E("", !0)
      ])),
      X(np, {
        target: o.value,
        onClose: H[2] || (H[2] = (R) => o.value = null)
      }, null, 8, ["target"])
    ], 64));
  }
}), ms = /* @__PURE__ */ Pe(wp, [["__scopeId", "data-v-b7c583e6"]]), bp = {
  id: "win-toast-container",
  class: "win-toast-container",
  "aria-live": "polite",
  "aria-relevant": "additions"
}, kp = ["data-toast-fingerprint", "onMouseenter", "onMouseleave"], _p = { class: "win-toast-head" }, Cp = ["src"], xp = { class: "win-toast-app" }, Lp = { class: "win-toast-time" }, $p = ["title", "aria-label", "onClick"], Sp = ["onClick"], Tp = { class: "win-toast-title" }, Ip = {
  key: 0,
  class: "win-toast-subtitle"
}, Mp = {
  key: 1,
  class: "win-toast-snippet"
}, Dp = {
  key: 0,
  class: "win-toast-actions"
}, Ap = ["onClick"], Ep = ["onClick"], Pp = /* @__PURE__ */ fe({
  __name: "NotificationHost",
  setup(e) {
    const t = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map(), a = z({}), r = z({});
    let g = null;
    function f(m) {
      const w = t.get(m);
      w !== void 0 && clearTimeout(w), t.delete(m);
    }
    function l(m, w = m.duration) {
      f(m.id), n.set(m.id, w), o.set(m.id, Date.now()), r.value[m.id] = !1, a.value[m.id] = Math.max(0, Math.min(100, w / m.duration * 100)), St(() => requestAnimationFrame(() => {
        a.value[m.id] = 0;
      })), t.set(m.id, window.setTimeout(() => {
        t.delete(m.id), Le.close(m.id);
      }, w));
    }
    function h(m) {
      f(m.id);
      const w = Date.now() - (o.get(m.id) || Date.now()), M = Math.max(0, (n.get(m.id) ?? m.duration) - w);
      n.set(m.id, M), r.value[m.id] = !0, a.value[m.id] = Math.max(0, Math.min(100, M / m.duration * 100));
    }
    function S(m) {
      l(m, Math.max(1500, n.get(m.id) ?? m.duration));
    }
    function O(m) {
      f(m.id), Le.close(m.id);
    }
    function v(m) {
      if (Pt.markRead(m.id), O(m), !m.onClick) {
        m.target && Pt.openTarget(m.target);
        return;
      }
      try {
        Promise.resolve(m.onClick()).catch((w) => console.warn("Notification action failed", w));
      } catch (w) {
        console.warn("Notification action failed", w);
      }
    }
    function I(m) {
      const w = Math.max(500, n.get(m.id) ?? m.duration);
      return {
        width: `${a.value[m.id] ?? 100}%`,
        transition: r.value[m.id] ? "none" : `width ${w}ms linear`
      };
    }
    return Ye(() => {
      g = new MutationObserver(() => {
        const w = new Set(Oo.map((M) => M.id));
        for (const M of Oo)
          !M.closing && !t.has(M.id) && !n.has(M.id) && l(M);
        for (const M of n.keys())
          w.has(M) || (f(M), n.delete(M), o.delete(M), delete a.value[M], delete r.value[M]);
      });
      const m = document.getElementById("win-toast-container");
      m && g.observe(m, { childList: !0 });
      for (const w of Oo) l(w);
    }), mo(() => {
      g?.disconnect(), g = null;
      for (const m of t.values()) clearTimeout(m);
      t.clear();
    }), (m, w) => (c(), he(wt, { to: "body" }, [
      i("div", bp, [
        X(Wo, { name: "win-toast" }, {
          default: Tt(() => [
            (c(!0), p(ee, null, be(s(Oo), (M) => (c(), p("article", {
              key: M.id,
              class: de(["win-toast-card", [M.appType, { closing: M.closing }]]),
              "data-toast-fingerprint": M.fingerprint,
              onMouseenter: (y) => h(M),
              onMouseleave: (y) => S(M)
            }, [
              i("header", _p, [
                i("img", {
                  src: M.icon,
                  class: "win-toast-icon",
                  alt: ""
                }, null, 8, Cp),
                i("span", xp, u(M.appName), 1),
                i("span", Lp, u(s(d)("notifications.justNow")), 1),
                i("button", {
                  type: "button",
                  class: "win-toast-close",
                  title: s(d)("common.close"),
                  "aria-label": s(d)("common.close"),
                  onClick: (y) => O(M)
                }, "✕", 8, $p)
              ]),
              i("button", {
                type: "button",
                class: "win-toast-body win-toast-body-button",
                onClick: (y) => v(M)
              }, [
                i("span", Tp, u(M.title), 1),
                M.subtitle ? (c(), p("span", Ip, u(M.subtitle), 1)) : E("", !0),
                M.message ? (c(), p("span", Mp, u(M.message), 1)) : E("", !0)
              ], 8, Sp),
              M.showActions && M.actionLabel ? (c(), p("footer", Dp, [
                i("button", {
                  type: "button",
                  class: "win-toast-btn primary",
                  onClick: (y) => v(M)
                }, u(M.actionLabel), 9, Ap),
                i("button", {
                  type: "button",
                  class: "win-toast-btn",
                  onClick: (y) => O(M)
                }, u(s(d)("common.close")), 9, Ep)
              ])) : E("", !0),
              i("div", {
                class: "win-toast-progress",
                style: Te(I(M))
              }, null, 4)
            ], 42, kp))), 128))
          ]),
          _: 1
        })
      ])
    ]));
  }
}), vs = /* @__PURE__ */ Pe(Pp, [["__scopeId", "data-v-71b51a1a"]]), Wp = ["id"], Rp = /* @__PURE__ */ fe({
  __name: "DockModuleHost",
  setup(e) {
    const t = jn().filter((o) => o.presentation !== "card").map((o) => {
      Ne(o.lifecycle.isVisible, (a) => {
        a && Fe.markRunning(o.id);
      }, { immediate: !0, flush: "sync" });
      const n = fe({
        setup: () => () => Ve("section", { class: "dock-module-load-error", role: "alert" }, [
          Ve("div", { style: "display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;" }, [
            Ve("strong", { style: "font-size: 13px; color: var(--heading);" }, `${o.title} 加载受阻`),
            Ve("span", { style: "font-size: 11px; padding: 2px 6px; border-radius: 4px; background: var(--surface); color: var(--muted); border: 1px solid var(--border);" }, "代码可能已更新")
          ]),
          Ve("p", { style: "font-size: 12px; line-height: 1.5; color: var(--muted); margin: 0 0 12px 0;" }, "模块分块代码未就绪。若刚才在终端编写或重新构建了扩展，点击「刷新标签页」即可立即同步最新切片。"),
          Ve("div", { style: "display: flex; gap: 8px;" }, [
            Ve("button", {
              type: "button",
              style: "padding: 5px 12px; border-radius: 6px; border: 1px solid var(--border); background: var(--primary, #3b82f6); color: #fff; cursor: pointer; font-size: 12px; font-weight: 500;",
              onClick: () => {
                typeof window < "u" && window.location.reload();
              }
            }, "⟳ 刷新标签页"),
            Ve("button", {
              type: "button",
              style: "padding: 5px 10px; border-radius: 6px; border: 1px solid var(--border); background: var(--surface); color: var(--text); cursor: pointer; font-size: 12px;",
              onClick: () => {
                Fe.reloadApp(o.id);
              }
            }, "↻ 重试"),
            Ve("button", {
              type: "button",
              style: "padding: 5px 10px; border-radius: 6px; border: 1px solid var(--border); background: var(--surface); color: var(--text); cursor: pointer; font-size: 12px;",
              onClick: () => {
                Fe.hideApp(o.id);
              }
            }, "隐藏")
          ])
        ])
      });
      return {
        definition: o,
        mounted: te(() => !!it[o.id]),
        view: U({
          loader: o.loadView,
          onError(a, r, g, f) {
            f <= 2 ? r() : g();
          },
          errorComponent: n
        })
      };
    });
    return mo(() => {
      for (const { definition: o } of t)
        Oe.close(o.id), po.delete(o.id), it[o.id] = !1;
    }), (o, n) => (c(!0), p(ee, null, be(s(t), (a) => et((c(), p("div", {
      id: a.definition.rootId,
      key: a.definition.id
    }, [
      a.mounted.value ? (c(), he(Wn(a.view), {
        key: s(Fe).getRenderKey(a.definition.id)
      })) : E("", !0)
    ], 8, Wp)), [
      [fo, a.definition.lifecycle.isVisible()]
    ])), 128));
  }
}), Np = /* @__PURE__ */ Pe(Rp, [["__scopeId", "data-v-3f131313"]]);
function qe(e, t) {
  const o = z(!1);
  return Ne(
    e,
    (n) => {
      n && (o.value = !0);
    },
    { immediate: !0, flush: "sync" }
  ), Wt(o);
}
const Op = ["onKeydown"], Bp = { class: "fo-up-preview-head" }, Fp = ["src"], Hp = { class: "fo-up-preview-meta" }, jp = { class: "fo-up-preview-name-row" }, Kp = ["href"], zp = ["disabled"], Gp = { class: "fo-up-preview-sign" }, Vp = { class: "fo-up-preview-videos" }, Up = {
  key: 0,
  class: "fo-up-preview-loading"
}, Yp = {
  key: 1,
  class: "fo-up-preview-empty"
}, Xp = {
  key: 2,
  class: "fo-up-preview-empty"
}, qp = ["href", "title", "onClick"], Jp = ["src"], Zp = {
  key: 0,
  class: "fo-bili-duration"
}, Qp = { class: "fo-up-preview-video-info" }, eh = ["href", "title", "onClick"], th = { class: "fo-up-preview-video-meta" }, oh = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2394a3b8'%3E%3Cpath d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/%3E%3C/svg%3E", ih = /* @__PURE__ */ fe({
  __name: "BiliUpPreview",
  setup(e) {
    const t = z(!1);
    function o() {
      if (!ye.submitting) {
        if (!ye.followed) {
          t.value = !1, ti.toggleFollow();
          return;
        }
        if (!t.value) {
          t.value = !0;
          return;
        }
        t.value = !1, ti.toggleFollow();
      }
    }
    function n() {
      t.value = !1, ti.close();
    }
    function a(r, g) {
      r.ctrlKey || r.metaKey || (r.preventDefault(), r.stopPropagation(), g.bvid ? (Fi.openVideo({
        bvid: g.bvid,
        title: g.title,
        cover: g.cover,
        author: ye.name,
        authorFace: ye.face,
        mid: ye.mid,
        url: g.url
      }), n()) : g.url && g.url !== "#" && window.open(g.url, "_blank"));
    }
    return (r, g) => s(ye).open ? (c(), p("div", {
      key: 0,
      class: "fo-up-preview-backdrop",
      onPointerdown: V(n, ["self"])
    }, [
      i("aside", {
        class: "fo-up-preview-popover",
        style: Te({ left: `${s(ye).left}px`, top: `${s(ye).top}px` }),
        onKeydown: Po(V(n, ["stop", "prevent"]), ["esc"])
      }, [
        i("div", Bp, [
          i("img", {
            class: "fo-up-preview-avatar",
            src: s(ye).face || oh,
            alt: "",
            referrerpolicy: "no-referrer"
          }, null, 8, Fp),
          i("div", Hp, [
            i("div", jp, [
              i("a", {
                class: "fo-up-preview-name",
                href: `https://space.bilibili.com/${s(ye).mid}`,
                target: "_blank",
                rel: "noreferrer"
              }, u(s(ye).name), 9, Kp),
              i("button", {
                type: "button",
                class: de([
                  s(ye).followed ? "fo-up-preview-unfollow" : "fo-up-preview-follow",
                  { "is-armed": t.value }
                ]),
                disabled: s(ye).submitting,
                onClick: o
              }, u(s(ye).submitting ? "处理中…" : t.value ? "确定取消？" : s(ye).followed ? "取消关注" : "＋ 关注"), 11, zp)
            ]),
            i("p", Gp, u(s(ye).sign || "暂无个人简介"), 1)
          ]),
          i("button", {
            type: "button",
            class: "fo-up-preview-close",
            "aria-label": "关闭预览",
            onClick: n
          }, "✕")
        ]),
        g[1] || (g[1] = i("div", { class: "fo-up-preview-title-tag" }, "近期投稿视频（最新 2~3 个）", -1)),
        i("div", Vp, [
          s(ye).loading ? (c(), p("div", Up, [...g[0] || (g[0] = [
            i("i", null, null, -1),
            i("span", null, "正在读取近期投稿…", -1)
          ])])) : s(ye).error ? (c(), p("p", Yp, u(s(ye).error), 1)) : s(ye).videos.length ? (c(!0), p(ee, { key: 3 }, be(s(ye).videos, (f) => (c(), p("article", {
            key: f.bvid,
            class: "fo-up-preview-video"
          }, [
            i("a", {
              class: "fo-up-preview-thumb",
              href: f.url,
              title: `就地播放「${f.title}」（Ctrl+点击在网页打开）`,
              onClick: (l) => a(l, f)
            }, [
              i("img", {
                src: f.cover,
                alt: "",
                loading: "lazy",
                referrerpolicy: "no-referrer"
              }, null, 8, Jp),
              f.duration ? (c(), p("span", Zp, u(f.duration), 1)) : E("", !0)
            ], 8, qp),
            i("div", Qp, [
              i("a", {
                class: "fo-up-preview-video-title",
                href: f.url,
                title: `就地播放「${f.title}」（Ctrl+点击在网页打开）`,
                onClick: (l) => a(l, f)
              }, u(f.title), 9, eh),
              i("div", th, [
                i("span", null, "▣ " + u(f.playCount), 1),
                i("span", null, u(f.published), 1)
              ])
            ])
          ]))), 128)) : (c(), p("p", Xp, "该 UP 主近期暂无视频动态"))
        ])
      ], 44, Op)
    ], 32)) : E("", !0);
  }
}), nh = /* @__PURE__ */ Pe(ih, [["__scopeId", "data-v-3fedd7f1"]]), sh = { class: "logicweaver-overlays-layer" }, ah = { id: "vue-notification-root" }, rh = {
  id: "bili-profile-menu",
  class: "bili-profile-menu",
  hidden: ""
}, lh = { id: "vue-bili-message-panel-root" }, ch = { id: "vue-notification-center-root" }, dh = { id: "vue-tab-manager-root" }, uh = { id: "vue-bookmark-menu-root" }, ph = { id: "vue-bookmark-panel-root" }, hh = { id: "vue-launcher-dialogs-root" }, fh = { id: "vue-launcher-folder-root" }, gh = { id: "vue-launcher-menus-root" }, mh = { id: "vue-settings-dialog-root" }, vh = { id: "vue-clock-settings-root" }, yh = { id: "vue-bili-theater-root" }, wh = { id: "vue-bili-mini-player-root" }, bh = { id: "vue-ai-dialog-root" }, kh = { id: "vue-aihot-viewer-root" }, _h = { id: "vue-nav-wheel-root" }, Ch = { id: "vue-github-detail-root" }, xh = { id: "vue-bili-subtitle-modal-root" }, Lh = { id: "vue-bili-video-task-modal-root" }, $h = { id: "vue-github-task-modal-root" }, Sh = { id: "vue-web-task-modal-root" }, Th = { id: "vue-firecrawl-modal-root" }, Ih = { id: "vue-floating-image-viewer-root" }, Mh = { id: "vue-command-palette-root" }, Dh = /* @__PURE__ */ fe({
  __name: "AppOverlays",
  setup(e) {
    const t = qe(() => Ro.state.isOpen), o = qe(() => On.isOpen), n = qe(() => ei.isOpen), a = qe(() => Vt.state.isOpen), r = qe(() => _a.open), g = qe(() => Do.state.isOpen), f = qe(() => Us.isOpen), l = qe(() => ba.isOpen), h = qe(() => nn.state.isOpen), S = qe(() => ea.isOpen), O = qe(() => je.isOpen), v = qe(() => Ui.isOpen);
    let I;
    Ye(() => {
      I = cl();
    }), Rt(() => {
      I?.();
    });
    const m = qe(() => Ji.state.isOpen), w = qe(() => _t.isOpen), M = qe(() => ko.editDialog.isOpen || ko.linkMove.isOpen || ko.folderMove.isOpen || ko.groupMerge.isOpen || ko.folderDelete.isOpen), y = U(() => import("./ProfileMenu-CWRKRHu6.js")), _ = U(() => import("./BookmarkNoteMenu-BG2Wa8Fq.js")), x = U(() => import("./BookmarkPanel-B5xpA-vm.js")), N = U(() => import("./ClockSettingsMenu-mlskdUOF.js")), j = U(() => import("./NotificationCenter-gWxlbYim.js")), Z = U(() => import("./TabManagerPanel-m2vbEYWJ.js")), D = U(() => import("./LauncherDialogs-BQ0rj8px.js")), k = U(() => import("./LauncherFolderDialog-CQHY2I0E.js")), L = U(() => import("./LauncherMenus-BPZ0Pe07.js")), Q = U(() => import("./SettingsDialog-CKhu-ATo.js")), T = U(() => import("./BiliMiniPlayer-a3W0SG9H.js")), H = U(() => import("./BiliTheaterDialog-BEMhc6PT.js")), R = U(() => import("./BiliMessagePanel-D6VUJoe1.js")), Y = U(() => import("./AiDialog-DULcIg3R.js")), ge = U(() => import("./AihotViewer-Beh8FWe7.js")), _e = U(() => import("./NavWheelOverlay-C26inghQ.js")), ze = U(() => import("./GitHubRepoDetailDrawer-DpbYT2xM.js")), K = U(() => import("./InPageSideDrawer-z9Bq42EJ.js")), B = U(() => import("./BiliSubtitleModal-CZyiO2nd.js")), G = U(() => import("./BiliVideoTaskModal-BVDEgBng.js")), ve = U(() => import("./GitHubTaskModal-DX5f9UuD.js")), xe = U(() => import("./WebSiteTaskModal-D8SUwYOm.js")), Ie = U(() => import("./FirecrawlModal-mRYY9rSS.js")), we = U(() => import("./FloatingImageViewer-UFS2ODbB.js")), ke = U(() => import("./CommandPalette-BlOAw7je.js")), ot = U(() => import("./AppPromptModal-B6f-vqWY.js")), We = U(async () => {
      const [Nt, Ot] = await Promise.all([
        import("./PluginMarketDialog-B_GXLKhY.js"),
        import("./plugin-market-B6zN10fA.js")
      ]);
      return Vs("logicweaver-market-styles", Ot.default), Nt.default;
    });
    return (Nt, Ot) => (c(), p("div", sh, [
      i("div", ah, [
        X(vs)
      ]),
      i("div", rh, [
        X(s(y))
      ]),
      i("div", lh, [
        s(l) ? (c(), he(s(R), { key: 0 })) : E("", !0)
      ]),
      i("div", ch, [
        s(o) ? (c(), he(s(j), { key: 0 })) : E("", !0)
      ]),
      i("div", dh, [
        s(n) ? (c(), he(s(Z), { key: 0 })) : E("", !0)
      ]),
      i("div", uh, [
        s(m) ? (c(), he(s(_), { key: 0 })) : E("", !0)
      ]),
      i("div", ph, [
        X(s(x))
      ]),
      i("div", hh, [
        s(M) ? (c(), he(s(D), { key: 0 })) : E("", !0)
      ]),
      i("div", fh, [
        s(w) ? (c(), he(s(k), { key: 0 })) : E("", !0)
      ]),
      i("div", gh, [
        X(s(L))
      ]),
      i("div", mh, [
        X(s(Q))
      ]),
      i("div", vh, [
        s(a) ? (c(), he(s(N), { key: 0 })) : E("", !0)
      ]),
      i("div", yh, [
        s(g) ? (c(), he(s(H), { key: 0 })) : E("", !0)
      ]),
      i("div", wh, [
        s(f) ? (c(), he(s(T), { key: 0 })) : E("", !0)
      ]),
      i("div", bh, [
        s(h) ? (c(), he(s(Y), { key: 0 })) : E("", !0)
      ]),
      i("div", kh, [
        s(r) ? (c(), he(s(ge), { key: 0 })) : E("", !0)
      ]),
      i("div", _h, [
        X(s(_e))
      ]),
      X(Np),
      i("div", Ch, [
        s(S) ? (c(), he(s(ze), { key: 0 })) : E("", !0)
      ]),
      i("div", xh, [
        X(s(B))
      ]),
      i("div", Lh, [
        X(s(G))
      ]),
      i("div", $h, [
        X(s(ve))
      ]),
      i("div", Sh, [
        X(s(xe))
      ]),
      i("div", Th, [
        X(s(Ie))
      ]),
      i("div", Ih, [
        X(s(we))
      ]),
      i("div", Mh, [
        s(O) ? (c(), he(s(ke), { key: 0 })) : E("", !0)
      ]),
      s(v) ? (c(), he(s(K), { key: 0 })) : E("", !0),
      X(nh),
      X(s(ot)),
      s(t) ? (c(), he(s(We), { key: 1 })) : E("", !0)
    ]));
  }
});
let Wi = !1;
function Ah(e = 1800) {
  if (Wi || typeof window > "u") return;
  const t = () => {
    if (Wi) return;
    Wi = !0;
    const o = jn();
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
const Eh = ["data-active-workspace"], Ph = /* @__PURE__ */ fe({
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
    function r(l, h = "image/svg+xml") {
      if (typeof document > "u") return;
      const S = typeof chrome < "u" && chrome.runtime?.getURL ? chrome.runtime.getURL(l) : l;
      if (a === S) return;
      a = S;
      const O = document.querySelectorAll("link[rel*='icon']");
      if (O.length > 0)
        O.forEach((v) => {
          v.type = h, v.href = S;
        });
      else {
        const v = document.createElement("link");
        v.rel = "icon", v.type = h, v.href = S, document.head.appendChild(v);
      }
    }
    function g() {
      if (typeof document > "u") return;
      const l = n[Bo.value] || n.home;
      if (r(l.icon, l.iconType), oe.playing && oe.title) {
        const h = oe.artist ? ` - ${oe.artist}` : "";
        document.title = `▶ ${oe.title}${h}`;
        return;
      }
      if (_o.playing && _o.title) {
        document.title = `▶ ${_o.title} · 电台`;
        return;
      }
      document.title = l.title;
    }
    Ne(
      [
        () => Bo.value,
        () => oe.playing,
        () => oe.title,
        () => oe.artist,
        () => _o.playing,
        () => _o.title
      ],
      () => {
        g();
      },
      { immediate: !0 }
    );
    const f = te(() => Bo.value === "home" ? "" : Bo.value);
    return Ne(() => vt.activeId, (l) => {
      document.body.classList.toggle("has-card-fullscreen", !!l), document.body.dataset.page = l ? "daily" : "home";
    }, { immediate: !0, flush: "sync" }), Ye(() => {
      typeof document < "u" && (document.body.dataset.spa = "1");
      try {
        Vi.bindGlobalListener(), Ue.start(), Tn.start(), Bi.init().catch((l) => console.warn("[Launcher] 初始化失败", l)), Ah(), typeof chrome < "u" && chrome?.runtime?.sendMessage && setTimeout(() => {
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
    }), Rt(() => {
      Ue.stop(), Bi.stop(), Tn.stop(), document.body.classList.remove("has-card-fullscreen"), typeof document < "u" && o && (document.title = o);
    }), t({
      activeWorkspaceId: f,
      windowManagerController: Oe
    }), (l, h) => (c(), p("div", {
      id: "logicweaver-spa-root",
      class: "logicweaver-spa-root",
      "data-active-workspace": f.value || ""
    }, [
      X(dr),
      X(bl),
      X(Fu),
      X(Yu),
      i("nav", {
        id: "mac-dock",
        class: de(["mac-dock", "dock-" + s(io).position]),
        "aria-label": "快捷应用栏"
      }, [
        X(ms)
      ], 2),
      X(Dh)
    ], 8, Eh));
  }
}), Wh = /* @__PURE__ */ Pe(Ph, [["__scopeId", "data-v-add79781"]]), Rh = {
  class: "endfield-stage",
  "aria-hidden": "true"
}, Nh = {
  class: "rhinelab-stage",
  "aria-hidden": "true"
}, Oh = { class: "rhine-scaler" }, Bh = { class: "rhine-center-group" }, Fh = { class: "rhine-auth-status" }, Hh = { class: "rhine-auth-text" }, jh = ["hidden"], Kh = { class: "rhine-cinema-caption" }, zh = /* @__PURE__ */ fe({
  __name: "IntroAnimation",
  setup(e) {
    const t = z(window.innerHeight), o = z(window.innerWidth), n = z(!1), a = z(!1), r = z(10), g = z(1), f = z(0), l = /* @__PURE__ */ new Set();
    let h = 0, S = () => {
    };
    const O = te(() => `${String(Math.round(rt.renderedProgress)).padStart(2, "0")}%`), v = te(() => {
      const D = rt.renderedProgress / 100 * t.value + 10;
      return `${Math.min(D, Math.max(0, t.value - 102)).toFixed(1)}px`;
    }), I = te(() => rt.renderedProgress >= 75 ? "START PROCESSING..." : rt.renderedProgress >= 35 ? "REQUEST RECEIVED" : "ID CONFIRMED : JOYCE MOORE"), m = te(() => rt.finished ? "身份验证通过 · 欢迎进入终端" : rt.status ? `身份信息确认 · ${rt.status.replace(/^.*?\/\s*/, "")}` : "身份信息确认：JOYCE MOORE"), w = te(() => String(Math.max(0.35, Math.min(o.value / 1920, t.value / 1080))));
    function M(D, k) {
      const L = window.setTimeout(() => {
        l.delete(L), D();
      }, k);
      l.add(L);
    }
    function y() {
      window.dispatchEvent(new CustomEvent("logicweaver:intro-complete"));
    }
    function _(D) {
      if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
        y();
        return;
      }
      const k = D ? 180 : 260, L = D ? 200 : 280, Q = performance.now(), T = (H) => {
        const R = H - Q, Y = Math.min(1, R / k), ge = 1 - Math.pow(1 - Y, 3);
        if (r.value = 10 + ge * Math.max(0, o.value - 10), R > k && (g.value = Math.max(0, 1 - (R - k) / L)), R >= k + L) {
          y();
          return;
        }
        h = requestAnimationFrame(T);
      };
      M(() => {
        h = requestAnimationFrame(T);
      }, D ? 60 : 120);
    }
    function x(D) {
      D || (n.value = !0), M(() => {
        a.value = !0, f.value = 6, g.value = 0, M(y, 380);
      }, D ? 40 : 420);
    }
    function N(D) {
      rt.style === "rhinelab" ? x(D) : _(D);
    }
    function j() {
      o.value = window.innerWidth, t.value = window.innerHeight;
    }
    function Z(D) {
      rt.finished || (D.key === "Enter" || D.key === " " || D.key === "Escape") && (D.preventDefault(), yt.skip("KEYBOARD SKIP"));
    }
    return Ye(() => {
      document.documentElement.dataset.startupStyle = rt.style, document.documentElement.style.setProperty("--rhine-scale", w.value), window.addEventListener("resize", j, { passive: !0 }), window.addEventListener("keydown", Z, !0), S = Ra(N), qn();
    }), mo(() => {
      S(), window.removeEventListener("resize", j), window.removeEventListener("keydown", Z, !0), cancelAnimationFrame(h);
      for (const D of l) clearTimeout(D);
      l.clear();
    }), (D, k) => (c(), p("div", {
      class: "intro-vue-content",
      style: Te({ "--rhine-scale": w.value, opacity: g.value, filter: `blur(${f.value}px)` })
    }, [
      i("div", Rh, [
        k[2] || (k[2] = i("div", { class: "endfield-loader-texture" }, null, -1)),
        k[3] || (k[3] = i("div", { class: "endfield-loader-rail" }, null, -1)),
        i("div", {
          class: "endfield-loader-fill",
          style: Te({ height: `${s(rt).renderedProgress}%` })
        }, null, 4),
        i("div", {
          class: "endfield-loader-meter",
          style: Te({ top: v.value })
        }, [
          k[1] || (k[1] = i("span", { class: "endfield-loader-tick" }, null, -1)),
          i("b", null, u(O.value), 1),
          i("small", null, u(s(rt).status), 1)
        ], 4),
        k[4] || (k[4] = So('<section class="endfield-loader-brand"><span class="endfield-loader-kicker">DEEPSEEK HARNESS</span><strong>END</strong><strong>FIELD</strong><span class="endfield-loader-detail"><i class="endfield-loader-chevron"></i><span>EDGE INTELLIGENCE THEME</span><small>TERRA RESEARCH COMMISSION / BOOT SEQUENCE</small><span class="endfield-loader-squares"><i class="on"></i><i class="on"></i><i class="on"></i><i></i><i></i><i></i><i class="on"></i><i class="on"></i><i></i><i></i><i></i><i></i></span></span><em>OVER THE FRONTIER / INTO THE FRONT</em></section>', 1)),
        i("div", {
          class: "endfield-loader-wipe",
          style: Te({ width: `${r.value}px`, opacity: r.value > 10 ? 1 : 0 })
        }, null, 4)
      ]),
      i("div", Nh, [
        k[12] || (k[12] = So('<div class="rhine-background"><svg viewBox="0 0 1920 1080" preserveAspectRatio="none"><g fill="none" stroke="#ffffff" stroke-width="2.5"><path class="rhine-drift-path1" d="M-210 705C-45 705 182 704 247 567C337 377 99 306 4 435S27 680 169 631C309 584 227 314 279 111S568-113 568-113"></path><path class="rhine-drift-path2" d="M1560-80C1374 114 1671 168 1601 323S1371 367 1431 480S1692 666 1559 787S1329 886 1498 1130"></path><circle class="rhine-drift-circle" cx="1450" cy="648" r="346"></circle><circle class="rhine-drift-circle2" cx="1450" cy="648" r="348"></circle></g></svg></div>', 1)),
        i("div", Oh, [
          k[10] || (k[10] = So('<header class="rhine-brand"><h1>RHINE LAB</h1><div class="rhine-brand-sub">SYNTHESIZE INFORMATION</div><p class="rhine-brand-os"><span class="rhine-brand-analysis"><span style="left:2px;">A</span><span style="left:28px;">N</span><span style="left:55px;">A</span><span style="left:81px;">L</span><span style="left:103px;">Y</span><span style="left:129px;">S</span><span style="left:154px;">I</span><span style="left:166px;">S</span></span><b>OS</b></p></header>', 1)),
          i("button", {
            class: "rhine-skip",
            type: "button",
            title: "点击进入系统 (或按 Enter)",
            onClick: k[0] || (k[0] = (L) => s(yt).skip("ENTER SYSTEM"))
          }, [...k[5] || (k[5] = [
            tt("ENTER SYSTEM ", -1),
            i("span", null, "↗", -1)
          ])]),
          i("div", Bh, [
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
            i("div", Fh, [
              k[6] || (k[6] = i("span", { class: "rhine-auth-dot" }, "·", -1)),
              i("span", Hh, u(I.value), 1),
              k[7] || (k[7] = i("i", {
                class: "rhine-cursor",
                "aria-hidden": "true"
              }, null, -1))
            ])
          ]),
          i("div", {
            class: de(["rhine-scan", { active: n.value }]),
            hidden: !n.value
          }, [...k[9] || (k[9] = [
            So('<svg viewBox="0 0 1920 1080" aria-hidden="true"><g fill="none" stroke="#080a08" stroke-linecap="round"><circle class="rhine-scan-circle ring-outer" cx="960" cy="540" r="280" stroke-width="2.5"></circle><circle class="rhine-scan-circle ring-white" cx="960" cy="540" r="260" stroke="#fff" stroke-width="3.5"></circle><circle class="rhine-scan-circle ring-inner" cx="960" cy="540" r="220" stroke-width="2"></circle><circle class="rhine-orbit-dot dot-1" cx="960" cy="260" r="8" fill="#ed821b" stroke="none"></circle><circle class="rhine-orbit-dot dot-2" cx="960" cy="820" r="8" fill="#ed821b" stroke="none"></circle><circle class="rhine-scan-core" cx="960" cy="540" r="6" fill="#080a08" stroke="none"></circle></g></svg><span class="rhine-scan-label">PERMISSION AUTHORIZED</span>', 2)
          ])], 10, jh),
          i("div", Kh, u(m.value), 1),
          k[11] || (k[11] = i("div", { class: "rhine-powered" }, [
            tt("POWERED BY "),
            i("b", null, "RHINE LAB"),
            i("i")
          ], -1))
        ]),
        i("div", {
          class: de(["rhine-white", { flash: a.value }]),
          "aria-hidden": "true"
        }, null, 2)
      ])
    ], 4));
  }
}), Gh = /* @__PURE__ */ fe({
  __name: "ProfileMenu",
  setup(e) {
    function t(o) {
      No.trigger(o);
    }
    return (o, n) => (c(), p(ee, null, [
      i("button", {
        type: "button",
        "data-action": "messages",
        onClick: n[0] || (n[0] = V((a) => t("messages"), ["stop"]))
      }, u(s(d)("profile.menu.notifications")), 1),
      i("button", {
        type: "button",
        "data-action": "tabs",
        onClick: n[1] || (n[1] = V((a) => t("tabs"), ["stop"]))
      }, u(s(d)("profile.menu.tabs")), 1),
      i("button", {
        type: "button",
        "data-action": "refresh",
        onClick: n[2] || (n[2] = V((a) => t("refresh"), ["stop"]))
      }, u(s(d)("profile.menu.refreshBili")), 1),
      i("button", {
        type: "button",
        "data-action": "switch",
        onClick: n[3] || (n[3] = V((a) => t("switch"), ["stop"]))
      }, u(s(d)("profile.menu.switchUser")), 1),
      i("button", {
        type: "button",
        "data-action": "web",
        onClick: n[4] || (n[4] = V((a) => t("web"), ["stop"]))
      }, u(s(d)("profile.menu.biliCenter")), 1)
    ], 64));
  }
}), Vh = /* @__PURE__ */ fe({
  __name: "WorkspaceLaunchers",
  setup(e) {
    function t(o) {
      on.openWorkspace(o, !0);
    }
    return (o, n) => (c(), p(ee, null, [
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
      Pn(o.$slots, "default")
    ], 64));
  }
}), Uh = {
  key: 0,
  "aria-label": "AI 分析任务"
}, Yh = { role: "status" }, Xh = ["disabled"], qh = ["disabled"], Jh = /* @__PURE__ */ fe({
  __name: "GitHubStatus",
  setup(e) {
    return (t, o) => s(at).message || s(at).busy ? (c(), p("section", Uh, [
      i("p", Yh, u(s(at).repo ? `原任务仓库：${s(at).repo}。 ` : "") + u(s(at).message), 1),
      s(at).busy ? (c(), p("button", {
        key: 0,
        type: "button",
        onClick: o[0] || (o[0] = (n) => s(Qe).stopAiAnalysis())
      }, "停止后续分析 / 中断等待")) : E("", !0),
      s(at).uncertain ? (c(), p(ee, { key: 1 }, [
        o[5] || (o[5] = i("p", null, "AI 结果未确认，已阻止本页再次提交。请到供应商核对请求和计费；本页记录在整页关闭或重载后会丢失。", -1)),
        s(at).unlockConfirmation ? (c(), p(ee, { key: 1 }, [
          o[4] || (o[4] = i("p", null, "扩展不能验证供应商任务；确认只解除本页限制，不代表成功，也不会重发请求。", -1)),
          i("button", {
            type: "button",
            disabled: s(at).busy,
            onClick: o[2] || (o[2] = (n) => s(Qe).acknowledgeAiChecked())
          }, "确认解除本页限制", 8, qh),
          i("button", {
            type: "button",
            onClick: o[3] || (o[3] = (n) => s(at).unlockConfirmation = !1)
          }, "保持限制")
        ], 64)) : (c(), p("button", {
          key: 0,
          type: "button",
          disabled: s(at).busy,
          onClick: o[1] || (o[1] = (n) => s(at).unlockConfirmation = !0)
        }, "我已核对供应商记录", 8, Xh))
      ], 64)) : E("", !0)
    ])) : E("", !0);
  }
});
function Xo(e) {
  return {
    id: e.full_name,
    title: e.name,
    url: e.html_url || `https://github.com/${e.full_name}`,
    customIcon: e.owner?.avatar_url || "assets/github-star.svg"
  };
}
function Zh(e, t, o, n) {
  const a = t.map((g) => ({
    key: `list:${g.id}`,
    kind: "folder",
    title: g.name,
    list: g,
    repos: e.filter((f) => o.get(f.full_name.toLowerCase())?.includes(g.name))
  }));
  for (const g of e)
    o.get(g.full_name.toLowerCase())?.length || a.push({ key: `repo:${g.full_name.toLowerCase()}`, kind: "repo", title: g.name, repo: g });
  const r = new Map(n.map((g, f) => [g, f]));
  return a.sort((g, f) => (r.get(g.key) ?? n.length) - (r.get(f.key) ?? n.length));
}
function In(e, t, o) {
  const n = e.indexOf(t), a = e.indexOf(o);
  if (n < 0 || a < 0 || n === a) return [...e];
  const r = [...e];
  return r.splice(n, 1), r.splice(a, 0, t), r;
}
function Qh(e) {
  return Array.isArray(e) ? [...new Set(e.filter((t) => typeof t == "string" && t.length <= 300 && /^(list|repo):.+/.test(t)))].slice(0, 2e3) : [];
}
const ef = {
  key: 0,
  class: "gh-shortcut-status",
  role: "status"
}, tf = { class: "gh-shortcut-navigation" }, of = ["data-gh-list-drop", "onClick", "onDragover", "onDrop"], nf = ["data-gh-tile", "data-gh-list-drop", "onDragover", "onDrop"], sf = ["aria-label", "title", "onClick", "onPointerdown", "onKeydown"], af = {
  key: 0,
  class: "gh-shortcut-count"
}, rf = {
  key: 1,
  class: "gh-shortcut-help"
}, lf = ["disabled"], cf = ["data-gh-list-drop"], df = { class: "gh-shortcut-help" }, uf = { class: "gh-folder-repo-grid" }, pf = ["title", "onClick", "onPointerdown"], hf = ["disabled", "onClick"], ff = {
  key: 0,
  class: "gh-shortcut-help"
}, gf = /* @__PURE__ */ fe({
  __name: "GitHubFolders",
  props: {
    active: { type: Boolean, default: !0 }
  },
  emits: ["select"],
  setup(e, { emit: t }) {
    const o = e, n = t, a = z(null), r = z(""), g = z(""), f = z([]), l = z("");
    let h = 0, S = 0, O = Promise.resolve();
    const v = te(() => Zh(Je.repos, Je.lists, Je.repoListNames, f.value)), I = te(() => v.value.find((A) => A.kind === "folder" && A.list.id === r.value)), m = te(() => I.value?.kind === "folder" ? I.value.repos : []), w = te(() => Hi.folders.filter((A) => A.kind === "all" || A.kind === "uncategorized"));
    function M(A) {
      return A.kind === "folder" ? { title: A.title, preview: A.repos.slice(0, 4).map(Xo), count: Math.max(A.repos.length, A.list.totalCount) } : void 0;
    }
    const y = () => Je.ownerKey ? `ghSidebarTileOrderV1:${Je.ownerKey}` : "";
    function _() {
      ++h;
      const A = y(), F = [...f.value];
      A && (O = O.catch(() => {
      }).then(async () => {
        try {
          typeof chrome < "u" && chrome.storage?.local ? await chrome.storage.local.set({ [A]: F }) : localStorage.setItem(A, JSON.stringify(F)), A === y() && (l.value = "");
        } catch {
          A === y() && (l.value = "顺序暂未保存，本页仍可使用。");
        }
      }));
    }
    function x(A) {
      r.value = "", no.select(A), n("select");
    }
    function N(A) {
      !o.active || Date.now() < R || (r.value = "", n("select"), Bn.open(A.full_name, void 0, A));
    }
    function j(A) {
      if (!(!o.active || Date.now() < R)) {
        if (A.kind === "repo") {
          N(A.repo);
          return;
        }
        r.value = r.value === A.list.id ? "" : A.list.id, no.select(A.title), n("select");
      }
    }
    function Z(A) {
      return o.active && !ht.busy && Hi.folders.some((F) => F.title === A && (F.kind === "custom" || F.kind === "uncategorized"));
    }
    function D(A, F) {
      Z(F) && Je.repos.some((W) => W.full_name.toLowerCase() === A.toLowerCase()) && no.dropRepository(A, F);
    }
    function k(A, F) {
      !Z(F) || !Array.from(A.dataTransfer?.types || []).includes(ta) || (A.preventDefault(), A.stopPropagation(), A.dataTransfer && (A.dataTransfer.dropEffect = "move"), g.value = F);
    }
    function L(A, F) {
      g.value = "";
      const W = oa(A.dataTransfer);
      !W || !Z(F) || (A.preventDefault(), A.stopPropagation(), D(W, F));
    }
    function Q(A) {
      const F = A.currentTarget;
      F instanceof Node && A.relatedTarget instanceof Node && F.contains(A.relatedTarget) || (g.value = "");
    }
    const T = $e({ visible: !1, x: 0, y: 0, offsetX: 0, offsetY: 0, tile: null });
    let H = null, R = 0, Y = 0, ge = "", _e, ze = null;
    function K() {
      ze?.classList.remove("gh-sidebar-pointer-drop"), ze = null;
    }
    function B(A, F) {
      if (A.button !== 0 || !o.active || ht.busy || A.target.closest(".gh-tile-actions")) return;
      ke();
      const W = A.currentTarget.getBoundingClientRect();
      H = { pointer: A.pointerId, x: A.clientX, y: A.clientY, owner: Je.ownerKey, tile: F, original: [...f.value] }, T.x = A.clientX, T.y = A.clientY, T.offsetX = A.clientX - W.left, T.offsetY = A.clientY - W.top, T.tile = F, window.addEventListener("pointermove", xe, { passive: !1 }), window.addEventListener("pointerup", Ie), window.addEventListener("pointercancel", ke);
    }
    function G(A, F) {
      B(A, { key: `repo:${F.full_name.toLowerCase()}`, kind: "repo", title: F.name, repo: F });
    }
    function ve() {
      if (K(), g.value = "", !H || !T.visible) return;
      const A = document.elementFromPoint(T.x, T.y), F = A?.closest("[data-gh-list-drop]"), W = F?.dataset.ghListDrop;
      if (H.tile.kind === "repo" && W && Z(W) && F && (!F.hasAttribute("data-gh-tile") || hs(F.getBoundingClientRect(), T.x, T.y))) {
        g.value = W, ze = F, F.classList.add("gh-sidebar-pointer-drop");
        return;
      }
      const ue = A?.closest("[data-gh-tile]"), pt = ue?.dataset.ghTile;
      if (!pt || !ue || pt === H.tile.key || !fs(ue.getBoundingClientRect(), T.x, T.y) || pt === ge || Date.now() - Y < ps) return;
      const bt = v.value.map((Bt) => Bt.key);
      bt.includes(H.tile.key) && (f.value = In(bt, H.tile.key, pt), ge = pt, Y = Date.now());
    }
    function xe(A) {
      !H || A.pointerId !== H.pointer || (T.x = A.clientX, T.y = A.clientY, !(!T.visible && Math.hypot(A.clientX - H.x, A.clientY - H.y) < us) && (A.preventDefault(), T.visible || (++h, T.visible = !0, _e = setInterval(() => {
        const W = document.elementFromPoint(T.x, T.y)?.closest(".gh-bili-folder-list, .gh-shortcut-window-content");
        if (W) {
          const ue = W.getBoundingClientRect();
          T.y < ue.top + 36 ? W.scrollTop -= 12 : T.y > ue.bottom - 36 && (W.scrollTop += 12);
        }
        ve();
      }, 32)), ve()));
    }
    function Ie(A) {
      if (!H || A.pointerId !== H.pointer) return;
      T.visible && (T.x = A.clientX, T.y = A.clientY, ve());
      const F = H, W = T.visible, ue = g.value;
      if (W) {
        A.preventDefault(), R = Date.now() + 300, F.owner === Je.ownerKey && ue && F.tile.kind === "repo" && D(F.tile.repo.full_name, ue);
        const pt = F.original.length !== f.value.length || F.original.some((bt, Bt) => f.value[Bt] !== bt);
        F.owner === Je.ownerKey && !ue && pt && _();
      }
      ue && (f.value = F.original), we();
    }
    function we() {
      K(), clearInterval(_e), _e = void 0, window.removeEventListener("pointermove", xe), window.removeEventListener("pointerup", Ie), window.removeEventListener("pointercancel", ke), T.visible = !1, T.tile = null, H = null, g.value = "", ge = "", Y = 0;
    }
    function ke() {
      H && (f.value = H.original, T.visible && (R = Date.now() + 300)), we();
    }
    function ot(A, F) {
      if (!A.altKey || !["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(A.key)) return;
      A.preventDefault();
      const W = v.value.map((Bt) => Bt.key), ue = W.indexOf(F.key), pt = A.key === "ArrowLeft" ? -1 : A.key === "ArrowRight" ? 1 : A.key === "ArrowUp" ? -2 : 2, bt = W[ue + pt];
      bt && (f.value = In(W, F.key, bt), _());
    }
    function We(A) {
      const F = A.target;
      !H && !a.value?.contains(F) && !F?.closest("#gh-list-shortcut-window") && (r.value = "");
    }
    function Nt(A) {
      A.key === "Escape" && (ke(), r.value = "");
    }
    function Ot() {
      document.hidden && (ke(), r.value = "");
    }
    function It() {
      g.value = "";
    }
    Ne(() => Je.ownerKey, async () => {
      const A = ++S;
      ke(), r.value = "", f.value = [], l.value = "";
      const F = y(), W = ++h;
      if (F)
        try {
          const ue = typeof chrome < "u" && chrome.storage?.local ? (await chrome.storage.local.get(F))[F] : JSON.parse(localStorage.getItem(F) || "[]");
          A === S && W === h && (f.value = Qh(ue));
        } catch {
          A === S && (l.value = "图标顺序读取失败，可继续操作。");
        }
    }, { immediate: !0 });
    const yo = /* @__PURE__ */ new Set();
    return Ne(() => [o.active, Je.ownerKey, Je.loading], ([A, F, W]) => {
      !A || !F || W || yo.has(F) || (yo.add(F), Qe.ensureAllStarsLoaded());
    }, { immediate: !0 }), Ne(() => o.active, (A) => {
      A || (ke(), r.value = "");
    }), Ne(() => I.value, (A) => {
      A || (r.value = "");
    }), Ye(() => {
      window.addEventListener("pointerdown", We), window.addEventListener("keydown", Nt), window.addEventListener("blur", ke), window.addEventListener("dragend", It), window.addEventListener("drop", It), document.addEventListener("visibilitychange", Ot);
    }), mo(() => {
      ++S, ke(), window.removeEventListener("pointerdown", We), window.removeEventListener("keydown", Nt), window.removeEventListener("blur", ke), window.removeEventListener("dragend", It), window.removeEventListener("drop", It), document.removeEventListener("visibilitychange", Ot);
    }), (A, F) => (c(), p("div", {
      ref_key: "root",
      ref: a,
      class: "gh-shortcut-sidebar"
    }, [
      s(ht).message || l.value ? (c(), p("p", ef, u(s(ht).message || l.value), 1)) : E("", !0),
      i("div", tf, [
        (c(!0), p(ee, null, be(w.value, (W) => (c(), p("button", {
          key: W.title,
          type: "button",
          class: de(["gh-shortcut-nav", { on: W.active, "drop-into": g.value === W.title }]),
          "data-gh-list-drop": W.kind === "uncategorized" ? W.title : void 0,
          onClick: (ue) => x(W.title),
          onDragover: (ue) => k(ue, W.title),
          onDragleave: Q,
          onDrop: (ue) => L(ue, W.title)
        }, [
          i("span", null, u(W.kind === "all" ? "⭐" : "📄") + " " + u(W.title), 1),
          i("small", null, u(W.count), 1)
        ], 42, of))), 128))
      ]),
      F[6] || (F[6] = i("p", { class: "gh-shortcut-help" }, "拖进文件夹归类 · 拖到边缘排序", -1)),
      X(Wo, {
        name: "gh-shortcut",
        tag: "div",
        class: "gh-shortcut-grid"
      }, {
        default: Tt(() => [
          (c(!0), p(ee, null, be(v.value, (W) => (c(), p("div", {
            key: W.key,
            class: de(["gh-shortcut-cell", { "is-dragging": T.visible && T.tile?.key === W.key, "drop-into": W.kind === "folder" && g.value === W.title }]),
            "data-gh-tile": W.key,
            "data-gh-list-drop": W.kind === "folder" ? W.title : void 0,
            onDragover: (ue) => W.kind === "folder" && k(ue, W.title),
            onDragleave: Q,
            onDrop: (ue) => W.kind === "folder" && L(ue, W.title)
          }, [
            i("button", {
              type: "button",
              class: "gh-shortcut-tile",
              "aria-label": W.kind === "folder" ? `打开列表 ${W.title}` : `查看仓库 ${W.repo.full_name}`,
              title: W.kind === "folder" ? `${W.title}（拖入将加入该列表，保留其他归属）` : W.repo.full_name,
              onClick: (ue) => j(W),
              onPointerdown: (ue) => B(ue, W),
              onDragstart: F[0] || (F[0] = V(() => {
              }, ["prevent"])),
              onKeydown: (ue) => ot(ue, W)
            }, [
              X(Eo, {
                link: W.kind === "repo" ? s(Xo)(W.repo) : void 0,
                folder: M(W)
              }, null, 8, ["link", "folder"]),
              W.kind === "folder" ? (c(), p("small", af, u(Math.max(W.repos.length, W.list.totalCount)), 1)) : E("", !0)
            ], 40, sf)
          ], 42, nf))), 128))
        ]),
        _: 1
      }),
      v.value.length ? E("", !0) : (c(), p("p", rf, u(s(Je).loading ? "正在读取仓库与列表…" : "暂无列表或未分类仓库"), 1)),
      (c(), he(wt, { to: "body" }, [
        I.value && e.active ? (c(), he(s($a), {
          key: 0,
          id: "gh-list-shortcut-window",
          "window-id": "gh-list-shortcut",
          title: I.value.title,
          icon: "📁",
          "default-width": 420,
          "default-height": 420,
          "min-width": 300,
          "min-height": 260,
          "show-minimize": !1,
          "show-maximize": !1,
          "custom-class": "gh-shortcut-folder-window",
          "custom-style": { background: "var(--panel)" },
          onClose: F[5] || (F[5] = (W) => r.value = "")
        }, {
          "header-actions": Tt(() => [
            i("button", {
              type: "button",
              class: "gh-folder-delete-action",
              disabled: s(ht).busy,
              title: "删除 GitHub 列表（不会取消 Star）",
              onClick: F[1] || (F[1] = (W) => s(no).delete(I.value.title))
            }, "删除列表", 8, lf)
          ]),
          default: Tt(() => [
            i("div", {
              class: de(["gh-shortcut-window-content", { "drop-into": g.value === I.value.title }]),
              "data-gh-list-drop": I.value.title,
              onDragover: F[3] || (F[3] = (W) => k(W, I.value.title)),
              onDragleave: Q,
              onDrop: F[4] || (F[4] = (W) => L(W, I.value.title))
            }, [
              i("p", df, u(m.value.length) + " 个已加载仓库 · 可拖到其他文件夹以加入列表", 1),
              i("div", uf, [
                (c(!0), p(ee, null, be(m.value, (W) => (c(), p("div", {
                  key: W.full_name,
                  class: "gh-folder-repo-cell"
                }, [
                  i("button", {
                    type: "button",
                    class: "gh-shortcut-tile",
                    title: W.full_name,
                    onClick: (ue) => N(W),
                    onPointerdown: (ue) => G(ue, W),
                    onDragstart: F[2] || (F[2] = V(() => {
                    }, ["prevent"]))
                  }, [
                    X(Eo, {
                      link: s(Xo)(W)
                    }, null, 8, ["link"])
                  ], 40, pf),
                  i("button", {
                    type: "button",
                    class: "gh-tile-actions",
                    title: "从所有 Lists 移出，保留 Star",
                    disabled: s(ht).busy,
                    onClick: (ue) => D(W.full_name, "未分类")
                  }, "移到未分类", 8, hf)
                ]))), 128))
              ]),
              m.value.length ? E("", !0) : (c(), p("p", ff, u(s(Je).loading ? "正在读取…" : "空文件夹，可拖入仓库"), 1))
            ], 42, cf)
          ]),
          _: 1
        }, 8, ["title"])) : E("", !0),
        T.visible && T.tile ? (c(), p("div", {
          key: 1,
          class: "gh-shortcut-ghost gh-shortcut-tile",
          style: Te({ left: `${T.x - T.offsetX}px`, top: `${T.y - T.offsetY}px` })
        }, [
          X(Eo, {
            link: T.tile.kind === "repo" ? s(Xo)(T.tile.repo) : void 0,
            folder: M(T.tile)
          }, null, 8, ["link", "folder"])
        ], 4)) : E("", !0)
      ]))
    ], 512));
  }
}), mf = /* @__PURE__ */ Pe(gf, [["__scopeId", "data-v-8bfd51d6"]]), vf = {
  id: "gh-hero-cover",
  class: "gh-bili-cover"
}, yf = { key: 0 }, wf = { key: 1 }, bf = {
  key: 2,
  class: "fo-folder-icon"
}, kf = { class: "gh-bili-heading" }, _f = { class: "gh-hero-title-row" }, Cf = ["title"], xf = ["role", "aria-live"], Lf = ["title"], $f = ["title", "aria-label"], Sf = { id: "gh-hero-desc" }, Tf = { class: "gh-bili-actions" }, If = ["title"], Mf = { class: "gh-batch-btn-text" }, Df = ["title"], Af = ["title"], Ef = /* @__PURE__ */ fe({
  __name: "GitHubHero",
  emits: ["open-ai-settings"],
  setup(e, { emit: t }) {
    return (o, n) => (c(), p(ee, null, [
      i("div", vf, [
        s(Ft).kind === "all" ? (c(), p("span", yf, "⭐")) : s(Ft).kind === "uncategorized" ? (c(), p("span", wf, "📄")) : (c(), p("i", bf))
      ]),
      i("div", kf, [
        i("div", _f, [
          i("h3", {
            id: "gh-hero-title",
            title: s(Ft).title
          }, u(s(Ft).title), 9, Cf),
          s(Kt).actionText ? (c(), p("div", {
            key: 0,
            class: de(["gh-hero-inline-status", { "is-error": s(Kt).actionError }]),
            role: s(Kt).actionError ? "alert" : "status",
            "aria-live": s(Kt).actionError ? "assertive" : "polite",
            "aria-atomic": "true"
          }, [
            i("span", {
              class: "gh-hero-status-text",
              title: s(Kt).actionText
            }, u(s(Kt).actionText), 9, Lf),
            i("button", {
              type: "button",
              title: s(d)("github.hero.closeTip"),
              "aria-label": s(d)("github.hero.closeTip"),
              onClick: n[0] || (n[0] = (a) => s(Zi).update({ actionText: "", actionError: !1 }))
            }, "×", 8, $f)
          ], 10, xf)) : E("", !0)
        ]),
        i("p", Sf, u(s(Ft).description), 1)
      ]),
      i("div", Tf, [
        i("button", {
          id: "gh-batch-toggle-btn",
          type: "button",
          class: de(["gh-hero-btn gh-batch-toggle-btn", { active: s(Ft).batchMode }]),
          title: s(d)("github.hero.batchToggle"),
          onClick: n[1] || (n[1] = (a) => s(Io).toggleBatch())
        }, [
          n[4] || (n[4] = i("span", { class: "gh-batch-btn-icon" }, "☑", -1)),
          i("span", Mf, u(s(Ft).batchMode ? s(d)("github.hero.batchBack") : s(d)("github.hero.batch")), 1)
        ], 10, If),
        i("button", {
          id: "gh-refresh-btn",
          type: "button",
          class: "gh-hero-btn",
          title: s(d)("github.hero.refreshTitle"),
          onClick: n[2] || (n[2] = (a) => s(Io).refresh())
        }, u(s(d)("github.hero.refresh")), 9, Df),
        i("button", {
          id: "gh-hero-add-folder-btn",
          type: "button",
          class: "gh-hero-btn primary",
          title: s(d)("github.hero.addFolderTitle"),
          onClick: n[3] || (n[3] = (a) => s(Io).createFolder())
        }, u(s(d)("github.hero.addFolder")), 9, Af)
      ])
    ], 64));
  }
}), Pf = /* @__PURE__ */ Pe(Ef, [["__scopeId", "data-v-1c3e37db"]]), ae = $e({ repo: "", text: "", baseline: "", busy: !1, message: "", storedValue: null });
function Mn(e, t = !1) {
  if (!e || ae.busy) return;
  if (ae.repo && ae.text !== ae.baseline) {
    ae.message = "请先保存或明确取消当前草稿，再编辑或清除其它备注。";
    return;
  }
  const o = Qe.remarks[e]?.userRemark, n = typeof o == "string" ? o : "";
  Object.assign(ae, {
    repo: e,
    baseline: n,
    text: t ? "" : n,
    storedValue: null,
    message: t ? "清除已准备；点击保存才会清除手写备注，AI 简介不变。" : "仅点击保存或 Enter 才写入；草稿只保留在本页内存。"
  });
}
function Ri() {
  ae.busy || Object.assign(ae, { repo: "", text: "", baseline: "", storedValue: null, message: "" });
}
async function Ni() {
  if (ae.busy || !ae.repo) return;
  const { repo: e, text: t, baseline: o } = ae;
  ae.busy = !0;
  try {
    await Qe.updateRepoRemark(e, { userRemark: t.trim() }, o), Object.assign(ae, { repo: "", text: "", baseline: "", storedValue: null, message: `${e} 的备注已保存并回读核对。` });
  } catch (n) {
    ae.message = n instanceof Error ? n.message : "保存未确认，草稿保留，请先读取已保存值核对。";
  } finally {
    ae.busy = !1;
  }
}
async function Dn() {
  if (ae.busy || !ae.repo) return;
  const e = ae.repo;
  ae.busy = !0;
  try {
    const o = (await Qe.reloadRepoRemarks())[e]?.userRemark;
    if (o !== void 0 && typeof o != "string") throw new Error("保存值格式异常，未变更草稿或覆盖基准。");
    ae.storedValue = o ?? "", ae.baseline = o ?? "", ae.message = "已读取保存值，草稿没有替换。请对比下方保存值；再次点击保存将以草稿替换它。";
  } catch (t) {
    ae.message = t instanceof Error ? t.message : "读取失败，草稿保留。";
  } finally {
    ae.busy = !1;
  }
}
const Wf = ["disabled"], Rf = ["disabled"], Nf = ["disabled"], Of = ["disabled"], Bf = {
  key: 0,
  style: { width: "100%", "white-space": "pre-wrap", "overflow-wrap": "anywhere" }
}, An = /* @__PURE__ */ fe({
  __name: "GitHubRemarkEditor",
  props: {
    active: { type: Boolean }
  },
  setup(e) {
    const t = e, o = z(null);
    return Ye(() => {
      St(() => {
        t.active && !ae.busy && o.value?.focus();
      });
    }), (n, a) => (c(), p("div", {
      class: "gh-inline-remark-box",
      style: { "flex-wrap": "wrap", "max-width": "100%" },
      onClick: a[6] || (a[6] = V(() => {
      }, ["stop"]))
    }, [
      et(i("input", {
        ref_key: "input",
        ref: o,
        "onUpdate:modelValue": a[0] || (a[0] = (r) => s(ae).text = r),
        class: "gh-inline-remark-input",
        type: "text",
        maxlength: "100",
        "aria-label": "手写仓库备注",
        placeholder: "备注说明…",
        disabled: s(ae).busy || !e.active,
        onKeydown: [
          a[1] || (a[1] = Po(V((r) => !r.isComposing && e.active && s(Ni)(), ["prevent"]), ["enter"])),
          a[2] || (a[2] = Po(V((r) => !r.isComposing && e.active && s(Ri)(), ["prevent", "stop"]), ["esc"]))
        ]
      }, null, 40, Wf), [
        [ho, s(ae).text]
      ]),
      i("button", {
        type: "button",
        class: "gh-inline-remark-btn save",
        title: "保存备注",
        disabled: s(ae).busy || !e.active,
        onClick: a[3] || (a[3] = //@ts-ignore
        (...r) => s(Ni) && s(Ni)(...r))
      }, "✓", 8, Rf),
      i("button", {
        type: "button",
        class: "gh-inline-remark-btn cancel",
        title: "取消草稿",
        disabled: s(ae).busy || !e.active,
        onClick: a[4] || (a[4] = //@ts-ignore
        (...r) => s(Ri) && s(Ri)(...r))
      }, "✕", 8, Nf),
      i("button", {
        type: "button",
        disabled: s(ae).busy || !e.active,
        onClick: a[5] || (a[5] = //@ts-ignore
        (...r) => s(Dn) && s(Dn)(...r))
      }, "读取已保存值", 8, Of),
      s(ae).storedValue !== null ? (c(), p("p", Bf, "已保存值：" + u(s(ae).storedValue || "（空）"), 1)) : E("", !0)
    ]));
  }
}), Oi = $e({
  isOpen: !1,
  repository: null
}), Ff = {
  open(e) {
    Oi.repository = e, Oi.isOpen = !0;
  },
  close() {
    Oi.isOpen = !1;
  }
}, Hf = {
  key: 0,
  role: "status"
}, jf = {
  key: 1,
  "aria-label": "未显示仓库的备注草稿"
}, Kf = {
  key: 2,
  class: "gh-search-options",
  style: { margin: "0 0 10px" }
}, zf = { style: { "font-size": "12px", color: "var(--dim)" } }, Gf = {
  key: 3,
  class: "gh-repos-loading"
}, Vf = {
  key: 4,
  class: "muted small",
  style: { "text-align": "center", padding: "40px 0", "font-size": "13px" }
}, Uf = ["data-repo-name", "onClick", "onContextmenu", "onDragstart"], Yf = ["onClick"], Xf = { class: "gh-card-head" }, qf = ["checked", "onChange"], Jf = ["src"], Zf = ["href", "title"], Qf = { class: "owner" }, eg = { class: "gh-card-body" }, tg = { class: "gh-card-badges" }, og = ["title", "onClick"], ig = ["onClick"], ng = ["title", "onClick"], sg = { class: "gh-badge-remark-text" }, ag = {
  key: 0,
  class: "desc gh-desc-analyzing",
  title: "正在使用 AI 分析仓库…"
}, rg = {
  key: 1,
  class: "desc gh-desc-ai",
  title: "AI 中文简介（点击可直接修改，右键可重新分析）"
}, lg = ["title"], cg = {
  key: 3,
  class: "desc dim"
}, dg = { class: "meta" }, ug = { class: "gh-stars" }, pg = {
  key: 0,
  class: "gh-lang"
}, hg = {
  key: 1,
  class: "gh-updated"
}, fg = {
  key: 6,
  class: "gh-pager"
}, gg = ["disabled"], mg = { class: "gh-page-info" }, vg = ["disabled"], yg = ["onClick"], wg = /* @__PURE__ */ fe({
  __name: "GitHubRepositories",
  props: {
    active: { type: Boolean, default: !0 }
  },
  setup(e) {
    const t = e, o = te(() => !!ae.repo && !Me.cards.some((D) => D.fullName === ae.repo)), n = $e({
      visible: !1,
      x: 0,
      y: 0,
      fullName: "",
      folders: [],
      hasRemark: !1,
      url: ""
    }), a = z(null), r = z(!1);
    function g(D, k) {
      const L = D.target;
      if (L instanceof Element) {
        if (Me.batchMode) {
          if (L.closest(".fo-card-more,.gh-badge-folder,.gh-badge-remark,.gh-inline-remark-box")) return;
          D.preventDefault(), D.stopPropagation(), At.toggleSelection(k.fullName);
          return;
        }
        L.closest("a,button,.gh-badge-folder,.gh-badge-remark,.fo-card-more,.gh-card-hole,.gh-card-checkbox,.gh-inline-remark-box") || (D.preventDefault(), D.stopPropagation(), Bn.open(k.fullName, void 0, k));
      }
    }
    function f(D, k) {
      if (!t.active) return;
      D.preventDefault(), D.stopPropagation();
      const L = 12, Q = 160, T = 280, H = Math.min(window.innerWidth - Q - L, Math.max(L, D.clientX)), R = Math.min(window.innerHeight - T - L, Math.max(L, D.clientY));
      n.x = H, n.y = R, n.fullName = k.fullName, n.folders = [...k.folders || (k.folder ? [k.folder] : [])], n.hasRemark = !!k.customRemark, n.url = k.url, n.visible = !0, a.value = null, r.value = H > window.innerWidth - 380;
    }
    function l(D, k) {
      f(k, D), a.value = "folder";
    }
    function h() {
      n.visible = !1, a.value = null;
    }
    function S(D) {
      n.folders.includes(D) ? n.folders = n.folders.filter((k) => k !== D) : n.folders.push(D), Qe.toggleRepoList(n.fullName, D);
    }
    function O() {
      n.folders = [], Qe.clearRepoLists(n.fullName), h();
    }
    function v(D) {
      if (!t.active) return;
      const k = typeof D == "string" ? D : D?.fullName || n.fullName;
      h(), Mn(k);
    }
    function I() {
      if (!t.active) return;
      const D = n.fullName;
      h(), Mn(D, !0);
    }
    async function m() {
      const D = n.url;
      if (h(), D && t.active)
        try {
          await navigator.clipboard.writeText(D);
        } catch {
        }
    }
    function w(D) {
      const k = Qe.findRepository(n.fullName);
      h(), k && Ys.sendGitHubShare({
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
      }, D);
    }
    function M() {
      const D = Qe.findRepository(n.fullName);
      h(), D && Ff.open({
        fullName: D.full_name,
        description: D.description || "",
        stars: D.stargazers_count,
        language: D.language || void 0,
        updated: D.updated_at
      });
    }
    function y() {
      n.url && window.open(n.url, "_blank", "noreferrer"), h();
    }
    async function _() {
      const D = Qe.findRepository(n.fullName);
      if (!D) {
        h();
        return;
      }
      h(), await Qe.confirmUnstarRepository(D);
    }
    function x(D) {
      const k = D.target;
      k?.closest(".gh-repo-context-menu") || k?.closest(".gh-inline-remark-box") || h();
    }
    function N(D) {
      D.key === "Escape" && n.visible && h();
    }
    Ne(() => t.active, (D) => {
      window.removeEventListener("pointerdown", x), window.removeEventListener("keydown", N), h(), D && (window.addEventListener("pointerdown", x), window.addEventListener("keydown", N));
    }, { immediate: !0 }), Rt(() => {
      window.removeEventListener("pointerdown", x), window.removeEventListener("keydown", N);
    });
    function j(D, k) {
      const L = D.target;
      if (L instanceof Element && L.closest("button,a,input,textarea,select,[contenteditable='true']")) {
        D.preventDefault();
        return;
      }
      At.startDrag(k, D);
    }
    const Z = te(() => {
      if (Me.cards.length > 0) return !1;
      const D = Kt.actionText || "";
      return !!(D.includes("正在读取") || D.includes("正在加载") || D.includes("正在统计") || D.includes("正在同步"));
    });
    return (D, k) => (c(), p(ee, null, [
      s(ae).message ? (c(), p("p", Hf, u(s(ae).repo ? `${s(ae).repo}：` : "") + u(s(ae).message), 1)) : E("", !0),
      o.value ? (c(), p("section", jf, [
        i("p", null, "备注草稿：" + u(s(ae).repo) + "（仓库不在当前列表中，草稿仍保留）", 1),
        X(An, {
          active: t.active
        }, null, 8, ["active"])
      ])) : E("", !0),
      s(Me).searchMessage ? (c(), p("div", Kf, [
        i("span", zf, u(s(Me).searchMessage), 1),
        i("button", {
          type: "button",
          class: "gh-tab",
          style: { padding: "2px 8px", "font-size": "11px", "margin-left": "8px" },
          onClick: k[0] || (k[0] = (L) => s(At).resetSearch())
        }, "清空搜索")
      ])) : E("", !0),
      Z.value ? (c(), p("div", Gf, [...k[17] || (k[17] = [
        i("div", {
          class: "gh-spinner",
          "aria-hidden": "true"
        }, null, -1),
        i("span", { class: "gh-loading-label" }, "正在读取 GitHub 仓库列表中…", -1)
      ])])) : s(Me).emptyMessage ? (c(), p("p", Vf, u(s(Me).emptyMessage), 1)) : E("", !0),
      s(Me).cards.length ? (c(), p("div", {
        key: 5,
        class: de(["repos gh-grid", { "gh-batch-active": s(Me).batchMode }])
      }, [
        (c(!0), p(ee, null, be(s(Me).cards, (L) => (c(), p("article", {
          key: L.fullName,
          class: de(["repo gh-card", { selected: L.selected }]),
          "data-repo-name": L.fullName,
          draggable: "true",
          onClick: (Q) => g(Q, L),
          onContextmenu: (Q) => f(Q, L),
          onDragstart: (Q) => j(Q, L.fullName)
        }, [
          i("button", {
            class: "fo-card-more",
            type: "button",
            "aria-label": "更多操作",
            title: "更多操作",
            onClick: V((Q) => f(Q, L), ["stop"])
          }, "⋮", 8, Yf),
          i("div", Xf, [
            i("label", {
              class: "gh-card-hole",
              title: "点击勾选此仓库",
              onClick: k[1] || (k[1] = V(() => {
              }, ["stop"]))
            }, [
              i("input", {
                class: "gh-card-checkbox",
                type: "checkbox",
                checked: L.selected,
                onChange: (Q) => s(At).setSelection(L.fullName, Q.target.checked)
              }, null, 40, qf),
              k[18] || (k[18] = i("span", { class: "gh-hole-inner" }, null, -1))
            ]),
            i("img", {
              class: "gh-owner-avatar",
              src: L.avatarUrl || "assets/github-star.svg",
              alt: "",
              loading: "lazy",
              referrerpolicy: "no-referrer",
              onError: k[2] || (k[2] = (Q) => Q.target.src = "assets/github-star.svg")
            }, null, 40, Jf),
            i("a", {
              href: L.url,
              target: "_blank",
              rel: "noreferrer",
              class: "name",
              title: L.fullName
            }, [
              i("span", Qf, u(L.owner) + "/", 1),
              tt(u(L.name), 1)
            ], 8, Zf)
          ]),
          i("div", eg, [
            i("div", tg, [
              L.folders && L.folders.length ? (c(!0), p(ee, { key: 0 }, be(L.folders, (Q) => (c(), p("span", {
                key: Q,
                class: "gh-badge-folder",
                title: `GitHub 列表：${Q}（点击管理所属列表）`,
                onClick: V((T) => l(L, T), ["stop"])
              }, " 📁 " + u(Q), 9, og))), 128)) : (c(), p("span", {
                key: 1,
                class: "gh-badge-folder uncat",
                title: "未分类（点击加入 GitHub 列表）",
                onClick: V((Q) => l(L, Q), ["stop"])
              }, " ＋ 未分类 ", 8, ig)),
              s(ae).repo === L.fullName ? (c(), he(An, {
                key: 2,
                active: t.active
              }, null, 8, ["active"])) : L.customRemark ? (c(), p("span", {
                key: 3,
                class: "gh-badge-remark",
                title: `备注：${L.customRemark}（点击就地修改）`,
                onClick: V((Q) => v(L), ["stop"])
              }, [
                k[19] || (k[19] = i("span", { class: "gh-badge-remark-icon" }, "💬", -1)),
                i("span", sg, u(L.customRemark), 1)
              ], 8, ng)) : E("", !0)
            ]),
            L.descriptionKind === "analyzing" ? (c(), p("p", ag, [...k[20] || (k[20] = [
              i("span", { class: "gh-ai-sparkle" }, "✨", -1),
              tt(" 正在使用 AI 分析仓库并提炼中文介绍…", -1)
            ])])) : L.descriptionKind === "ai" ? (c(), p("p", rg, [
              k[21] || (k[21] = i("span", { class: "gh-ai-tag-flag" }, "🤖", -1)),
              tt(u(L.description), 1)
            ])) : L.descriptionKind === "plain" ? (c(), p("p", {
              key: 2,
              class: "desc",
              title: L.description
            }, u(L.description), 9, lg)) : (c(), p("p", cg, "暂无描述"))
          ]),
          i("div", dg, [
            i("span", ug, "★ " + u(L.stars), 1),
            L.language ? (c(), p("span", pg, u(L.language), 1)) : E("", !0),
            L.updated ? (c(), p("span", hg, "更新 " + u(L.updated), 1)) : E("", !0)
          ])
        ], 42, Uf))), 128))
      ], 2)) : E("", !0),
      s(Me).totalPages > 1 ? (c(), p("div", fg, [
        i("button", {
          class: "gh-page-btn",
          type: "button",
          disabled: s(Me).page <= 1,
          onClick: k[3] || (k[3] = (L) => s(At).changePage(s(Me).page - 1))
        }, "‹ 上一页", 8, gg),
        i("span", mg, u(s(Me).page) + " / " + u(s(Me).totalPages) + " · 共 " + u(s(Me).totalItems) + " 个" + u(s(Me).serverPaged ? ` · 已加载 ${s(Me).loadedItems}` : ""), 1),
        i("button", {
          class: "gh-page-btn",
          type: "button",
          disabled: s(Me).page >= s(Me).totalPages,
          onClick: k[4] || (k[4] = (L) => s(At).changePage(s(Me).page + 1))
        }, "下一页 ›", 8, vg)
      ])) : E("", !0),
      (c(), he(wt, { to: "body" }, [
        t.active && n.visible ? (c(), p("div", {
          key: 0,
          class: "fo-cover-context-menu gh-repo-context-menu",
          style: Te({ left: `${n.x}px`, top: `${n.y}px` }),
          onClick: k[15] || (k[15] = V(() => {
          }, ["stop"])),
          onContextmenu: k[16] || (k[16] = V(() => {
          }, ["prevent"]))
        }, [
          i("div", {
            class: de(["gh-menu-has-sub", { "is-active": a.value === "folder" }]),
            onMouseenter: k[6] || (k[6] = (L) => a.value = "folder")
          }, [
            k[22] || (k[22] = i("button", {
              class: "fo-cover-menu-item with-sub-arrow",
              type: "button"
            }, [
              i("span", null, "📁 所属 GitHub 列表"),
              i("span", { class: "sub-arrow" }, "›")
            ], -1)),
            i("div", {
              class: de(["gh-sub-flyout", { "flyout-left": r.value }]),
              onClick: k[5] || (k[5] = V(() => {
              }, ["stop"]))
            }, [
              i("button", {
                class: de(["fo-cover-menu-item", { primary: n.folders.length === 0 }]),
                type: "button",
                onClick: O
              }, u(n.folders.length === 0 ? "✓ " : "  ") + "＋ 设为未分类（清空列表） ", 3),
              (c(!0), p(ee, null, be(s(Qe).cats, (L) => (c(), p("button", {
                key: L,
                class: de(["fo-cover-menu-item", { primary: n.folders.includes(L) }]),
                type: "button",
                onClick: (Q) => S(L)
              }, u(n.folders.includes(L) ? "✓ " : "  ") + "📁 " + u(L), 11, yg))), 128))
            ], 2)
          ], 34),
          i("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: k[7] || (k[7] = (L) => a.value = null),
            onClick: k[8] || (k[8] = (L) => v())
          }, " ✏️ 编辑备注… ", 32),
          i("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: k[9] || (k[9] = (L) => a.value = null),
            onClick: M
          }, " 创建任务 ", 32),
          X(Sa, {
            label: "💬 发送到聊天室",
            visible: n.visible,
            onOpen: k[10] || (k[10] = (L) => a.value = null),
            onSelect: w
          }, null, 8, ["visible"]),
          n.hasRemark ? (c(), p("button", {
            key: 0,
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: k[11] || (k[11] = (L) => a.value = null),
            onClick: I
          }, " 🗑️ 清除备注 ", 32)) : E("", !0),
          i("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: k[12] || (k[12] = (L) => a.value = null),
            onClick: m
          }, " 📋 复制仓库链接 ", 32),
          i("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: k[13] || (k[13] = (L) => a.value = null),
            onClick: y
          }, " ↗ 在 GitHub 打开 ", 32),
          i("button", {
            class: "fo-cover-menu-item danger",
            type: "button",
            onMouseenter: k[14] || (k[14] = (L) => a.value = null),
            onClick: _
          }, " ⭐ 取消 Star ", 32)
        ], 36)) : E("", !0)
      ]))
    ], 64));
  }
}), bg = /* @__PURE__ */ Pe(wg, [["__scopeId", "data-v-7db72d19"]]), kg = { class: "gh-batch-bar-left" }, _g = { class: "gh-batch-count-tip" }, Cg = { id: "gh-batch-selected-count" }, xg = {
  key: 0,
  "aria-label": "批量归属列表确认"
}, Lg = ["disabled"], $g = ["disabled"], Sg = { class: "gh-batch-bar-right" }, Tg = ["disabled"], Ig = ["disabled"], Mg = ["disabled"], Dg = /* @__PURE__ */ fe({
  __name: "GitHubBatchBar",
  props: {
    active: { type: Boolean, default: !0 }
  },
  setup(e) {
    const t = e, o = Fs(), n = z(null), a = te(() => {
      const f = [
        { value: "", label: "未分类（清空所选仓库的所有列表所属）", icon: "🌐" }
      ];
      return Hi.folders.filter((l) => l.kind === "custom").forEach((l) => {
        f.push({ value: l.title, label: l.title, icon: "📁" });
      }), f;
    });
    function r() {
      t.active && (o.value = Qe.prepareBatchMove(), n.value = null);
    }
    async function g() {
      const f = o.value, l = n.value;
      if (!t.active || !f || l === null || ht.busy) return;
      await f.submit(l) && o.value === f && (o.value = void 0);
    }
    return Ne(() => t.active && qt.active, (f) => {
      f || (o.value = void 0);
    }), (f, l) => (c(), p(ee, null, [
      i("div", kg, [
        i("button", {
          type: "button",
          class: "gh-batch-action-btn",
          id: "gh-batch-select-all-btn",
          onClick: l[0] || (l[0] = (h) => s(Mo).toggleSelectAll())
        }, u(s(qt).allSelected ? "取消全选" : "全选"), 1),
        i("span", _g, [
          l[5] || (l[5] = tt("已选择 ", -1)),
          i("b", Cg, u(s(qt).selectedCount), 1),
          l[6] || (l[6] = tt(" 项", -1))
        ])
      ]),
      o.value ? (c(), p("section", xg, [
        i("p", null, "仅操作打开选择器时的 " + u(o.value.names.length) + " 个仓库；后来勾选的仓库不加入。", 1),
        i("details", null, [
          l[7] || (l[7] = i("summary", null, "查看本次仓库清单", -1)),
          i("ul", null, [
            (c(!0), p(ee, null, be(o.value.names, (h) => (c(), p("li", { key: h }, u(h), 1))), 128))
          ])
        ]),
        X(Rn, {
          "model-value": n.value ?? "",
          options: a.value,
          disabled: s(ht).busy,
          placeholder: "请选择目标列表",
          size: "sm",
          style: { "max-width": "260px" },
          "onUpdate:modelValue": l[1] || (l[1] = (h) => n.value = String(h))
        }, null, 8, ["model-value", "options", "disabled"]),
        i("button", {
          type: "button",
          disabled: !t.active || s(ht).busy || n.value === null,
          onClick: g
        }, "确认加入列表", 8, Lg),
        i("button", {
          type: "button",
          disabled: s(ht).busy,
          onClick: l[2] || (l[2] = (h) => o.value = void 0)
        }, "取消", 8, $g)
      ])) : E("", !0),
      i("div", Sg, [
        i("button", {
          type: "button",
          class: "gh-batch-action-btn",
          id: "gh-batch-move-btn",
          disabled: !t.active || s(ht).busy || s(qt).selectedCount === 0,
          title: "固定当前选择，批量加入所选 GitHub 列表",
          onClick: r
        }, " 📁 归入 GitHub 列表 ", 8, Tg),
        i("button", {
          type: "button",
          class: "gh-batch-action-btn",
          id: "gh-batch-ai-btn",
          disabled: s(qt).selectedCount === 0,
          title: "批量使用 AI 生成中文介绍",
          onClick: l[3] || (l[3] = (h) => s(Mo).analyzeAi())
        }, " ✨ 批量 AI 分析 ", 8, Ig),
        i("button", {
          type: "button",
          class: "gh-batch-action-btn danger",
          id: "gh-batch-unstar-btn",
          disabled: s(qt).selectedCount === 0,
          title: "从 GitHub 批量取消 Star 收藏",
          onClick: l[4] || (l[4] = (h) => s(Mo).unstar())
        }, " 🗑 取消收藏 ", 8, Mg)
      ])
    ], 64));
  }
}), Ag = U(() => import("./GitHubWorkspaceCard-DGNubGXm.js")), Eg = U(() => import("./NotificationCenter-gWxlbYim.js")), Pg = U(() => import("./TabManagerPanel-m2vbEYWJ.js")), Wg = U(() => import("./BookmarkNoteMenu-BG2Wa8Fq.js")), Rg = U(() => import("./BookmarkPanel-B5xpA-vm.js")), Ng = U(() => import("./LauncherDialogs-BQ0rj8px.js")), Og = U(() => import("./SettingsDialog-CKhu-ATo.js")), Bg = U(() => import("./SettingsView-dBPZH_zr.js")), Fg = U(() => import("./ClockSettingsMenu-mlskdUOF.js")), Hg = U(() => import("./BiliTheaterDialog-BEMhc6PT.js")), jg = U(() => import("./BiliMiniPlayer-a3W0SG9H.js")), Kg = U(() => import("./BiliMessagePanel-D6VUJoe1.js")), zg = U(() => import("./ModelPricingCard-VmQ0qTAj.js")), Gg = U(() => import("./BilibiliWorkspace-Cyw5gEvs.js")), Vg = U(() => import("./YouTubeCard-CAf03AsF.js").then((e) => e.Y)), Ug = U(() => import("./AihotFeed-WbwA1bb-.js")), Yg = U(() => import("./GitHubTrending-C4uDx89d.js")), Xg = U(() => import("./AiDialog-DULcIg3R.js")), qg = U(() => import("./AihotViewer-Beh8FWe7.js")), Jg = U(() => import("./NavWheelOverlay-C26inghQ.js")), Zg = U(() => import("./StandaloneHost-Da58cP_I.js")), Qg = U(() => import("./LauncherFolderDialog-CQHY2I0E.js")), em = U(() => import("./LauncherMenus-BPZ0Pe07.js"));
function le(e, t, o, n) {
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
        return n?.setMounted?.(!0), () => {
          n?.setMounted?.(!1);
        };
      const g = r.innerHTML, f = Xi(o);
      f.config.errorHandler = (l, h, S) => {
        console.error(`LogicWeaver Vue feature failed: ${t.id} (${S})`, l), r.dataset.vueError = "1";
      };
      try {
        f.mount(r), n?.setMounted?.(!0);
      } catch (l) {
        throw n?.setMounted?.(!1), r.innerHTML = g, l;
      }
      return () => {
        n?.setMounted?.(!1), f.unmount();
      };
    }
  });
}
function tm(e) {
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
      const o = Xi(zh);
      let n = !1;
      const a = () => {
        e.stop("intro");
      };
      window.addEventListener("logicweaver:intro-complete", a, { once: !0 }), o.mount(t);
      const r = window.setTimeout(() => {
        yt.finish("基础界面已就绪，在线服务继续后台加载", !0), window.setTimeout(() => {
          n || (a(), t?.remove(), document.body.classList.remove("is-starting"));
        }, 600);
      }, 8e3);
      return () => {
        n || (n = !0, clearTimeout(r), window.removeEventListener("logicweaver:intro-complete", a), o.unmount(), t.remove(), document.body.classList.remove("is-starting"));
      };
    }
  }), le(e, { id: "spa-app", title: "纯血 SPA 单根调度器", order: 15, root: "vue-spa-root", capabilities: ["ui:spa-root", "workspace:keepalive"] }, Wh), document.getElementById("vue-spa-root") || le(e, { id: "bili-companions", title: "b站伴随窗口", order: 19, root: "vue-bili-companions-root", capabilities: ["ui:dock-companion"] }, Zg), le(e, { id: "notifications", title: "通知中心", order: 20, root: "vue-notification-root", capabilities: ["ui:toast", "notification:dedupe"] }, vs), le(e, { id: "profile-menu", title: "头像右键菜单", order: 21, root: "bili-profile-menu", capabilities: ["ui:profile-menu", "profile:actions"] }, Gh, No), le(e, { id: "workspace-launchers", title: "常用工作区启动项", order: 22, root: "workspace-launchers", capabilities: ["ui:workspace-launchers", "workspace:launch"] }, Vh, on), le(e, { id: "mac-dock", title: "底部快捷应用 Dock 栏", order: 23, root: "mac-dock", capabilities: ["ui:mac-dock", "dock:navigate"] }, ms, xt), le(e, { id: "hero-clock", title: "首屏中央时钟", order: 26, root: "hero-clock", capabilities: ["ui:hero-clock", "clock:read"] }, cs), le(e, { id: "search-box", title: "首屏搜索框", order: 27, root: "search", capabilities: ["ui:search-box", "search:actions"] }, En), le(e, { id: "home-music", title: "首屏音乐播放器", order: 28, root: "task-thread-home", capabilities: ["ui:home-music", "music:playback"] }, ds, Ze), le(e, { id: "launcher-groups", title: "常用网站分组架", order: 29, root: "launcher-groups", capabilities: ["ui:launcher-groups", "launcher:navigate"] }, gs, Ke), le(e, { id: "weather-widget", title: "首屏天气小部件", order: 39, root: "weather-body", capabilities: ["ui:weather-widget", "weather:read"] }, ls), le(e, { id: "github-workspace", title: "GitHub 独立页 Vue 工作台", order: 49, root: "vue-github-workspace-root", capabilities: ["ui:github-workspace"] }, Ag), le(e, { id: "github-status", title: "GitHub 同步状态", order: 50, root: "vue-github-status-root", capabilities: ["ui:github-status", "github:sync-read"] }, Jh, Zi), le(e, { id: "github-folders", title: "GitHub 文件夹导航", order: 55, root: "gh-folder-list", capabilities: ["ui:github-folders", "github:categorize-drop"] }, mf, no), le(e, { id: "github-hero", title: "GitHub 分类摘要", order: 56, root: "gh-hero", capabilities: ["ui:github-summary", "github:actions"] }, Pf, Io), le(e, { id: "github-repositories", title: "GitHub 仓库列表", order: 57, root: "vue-github-repositories-root", capabilities: ["ui:github-repositories", "github:repository-actions", "github:paging"] }, bg, At), le(e, { id: "github-batch-bar", title: "GitHub Star 批量操作工具栏", order: 58, root: "gh-batch-bar", capabilities: ["ui:github-batch-bar", "github:batch-actions"] }, Dg, Mo), le(e, { id: "notification-center", spaOwned: !0, title: "持久通知中心", order: 71, root: "vue-notification-center-root", capabilities: ["ui:notification-history", "notification:read"] }, Eg, Pt), le(e, { id: "tab-manager", spaOwned: !0, title: "独立标签页管理", order: 71, root: "vue-tab-manager-root", capabilities: ["ui:tab-manager", "tabs:explicit"] }, Pg, es), le(e, { id: "bookmark-menu", title: "书签上下文操作与备注菜单", order: 72, root: "vue-bookmark-menu-root", capabilities: ["ui:bookmark-menu", "bookmark:edit"] }, Wg, Ji), le(e, { id: "launcher-dialogs", title: "快捷启动器管理弹窗族", order: 73, root: "vue-launcher-dialogs-root", capabilities: ["ui:launcher-dialogs", "launcher:manage"] }, Ng, Fn), le(e, { id: "launcher-folder-dialog", title: "大文件夹展开视窗", order: 74, root: "vue-launcher-folder-root", capabilities: ["ui:launcher-folder", "launcher:folder-dialog"] }, Qg, Hn), le(e, { id: "launcher-menus", title: "启动器快捷上下文菜单族", order: 76, root: "vue-launcher-menus-root", capabilities: ["ui:launcher-menus", "launcher:context-menu"] }, em, Qi), le(e, { id: "bookmark-panel", title: "浏览器书签侧边滑动视窗", order: 77, root: "vue-bookmark-panel-root", capabilities: ["ui:bookmark-panel", "bookmarks:panel"] }, Rg, ci), le(e, { id: "bookmark-folder-strip", spaOwned: !0, title: "顶栏书签快捷文件夹横条", order: 78, root: "vue-bookmark-folder-strip-root", capabilities: ["ui:bookmark-folder-strip", "bookmarks:strip"] }, null, ni), le(e, { id: "settings-page", title: "独立设置页 Vue 工作台", order: 79, root: "vue-options-root", capabilities: ["ui:settings-page"] }, Bg), le(e, { id: "settings-dialog", title: "全局设置中心视窗", order: 80, root: "vue-settings-dialog-root", capabilities: ["ui:settings-dialog", "settings:manage"] }, Og, di), le(e, { id: "clock-settings-menu", spaOwned: !0, title: "中央时钟偏好配置菜单", order: 82, root: "vue-clock-settings-root", capabilities: ["ui:clock-settings", "clock:preference-edit"] }, Fg, Vt), le(e, { id: "bili-theater-dialog", title: "Bilibili 沉浸剧场与评论区弹窗", order: 85, root: "vue-bili-theater-root", capabilities: ["ui:bili-theater", "bili:playback"] }, Hg, Do), le(e, { id: "bili-mini-player", title: "Bilibili 悬浮迷你播放器", order: 85, root: "vue-bili-mini-player-root", capabilities: ["ui:bili-mini-player", "bili:playback"] }, jg), le(e, { id: "ai-dialog", title: "AI 助手对话框与知识点抽屉", order: 86, root: "vue-ai-dialog-root", capabilities: ["ui:ai-dialog", "ai:chat"] }, Xg, nn), le(e, { id: "aihot-viewer", spaOwned: !0, title: "AI HOT 资讯文章阅读器", order: 88, root: "vue-aihot-viewer-root", capabilities: ["ui:aihot-viewer", "viewer:aihot"] }, qg, tn), le(e, { id: "nav-wheel", title: "辐射状快捷动作轮盘与悬浮球", order: 95, root: "vue-nav-wheel-root", capabilities: ["ui:nav-wheel", "nav:radial-menu"] }, Jg, Ee), le(e, { id: "bili-message-panel", spaOwned: !0, title: "Bilibili 消息与互动通知中心", order: 102, root: "vue-bili-message-panel-root", capabilities: ["ui:bili-message-panel", "bili:messages"] }, Kg, zt), le(e, { id: "pricing-radar", spaOwned: !0, title: "模型插件 (AI 定价与排行榜)", order: 108, root: "vue-pricing-root", capabilities: ["ui:pricing-radar", "pricing:read"] }, zg, Gn), le(e, { id: "bili-favorites", spaOwned: !0, title: "b站插件 Vue 外壳", order: 110, root: "vue-bili-favorites-root", capabilities: ["ui:bili-favorites-shell", "bilibili:favorites"] }, Gg, Kn), le(e, { id: "youtube-card", spaOwned: !0, title: "YouTube 订阅与探索工作台", order: 111, root: "vue-youtube-root", capabilities: ["ui:youtube-card", "youtube:updates"] }, Vg, Vn), le(e, { id: "aihot-feed", spaOwned: !0, title: "AI HOT 资讯流全功能聚合看板", order: 112, root: "vue-aihot-root", capabilities: ["ui:aihot-feed", "aihot:aggregate"] }, Ug, zn), le(e, { id: "github-trending", spaOwned: !0, title: "GitHub 趋势榜与热门流", order: 114, root: "vue-github-trending-root", capabilities: ["ui:github-trending", "github:trending"] }, Yg, ts);
}
Rs();
const hi = Da(ui);
ar(ui, hi);
rr(ui);
tm(hi);
qi.loadBookmarks();
(async () => {
  document.getElementById("vue-bili-favorites-root") && !document.getElementById("vue-spa-root") && await import("./bilibili-channel.service-C6SH0b2-.js"), await Wa(), await hi.startEager(), yt.notifyBootReady();
})().catch((e) => console.error("[LogicWeaver] 页面启动失败", e));
window.addEventListener("pagehide", () => {
  hi.stopAll();
}, { once: !0 });
export {
  fn as C,
  Np as D,
  mf as G,
  Eo as L,
  us as T,
  zh as _,
  ts as a,
  Pf as b,
  es as c,
  Vt as d,
  gn as e,
  Lm as f,
  Ff as g,
  Re as h,
  nn as i,
  Ue as j,
  Ee as k,
  li as l,
  hs as m,
  ie as n,
  fs as o,
  ps as p,
  Vh as q,
  Gh as r,
  rs as s,
  ei as t,
  Ui as u,
  Oi as v,
  je as w,
  as as x,
  ui as y
};
