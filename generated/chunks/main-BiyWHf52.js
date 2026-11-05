import { l as Xn, S as ji, i as Rs } from "./SearchBox-CGNkxmu-.js";
/* empty css                */
import { c as si, r as $e, a as Wt, w as Pe, b as z, d as ge, o as r, e as fe, f as It, u as s, g as p, h as n, i as E, T as Ns, t as u, F as ee, j as be, k as G, l as bt, m as No, n as tt, v as Os, p as ot, q as go, s as X, x as Bs, y as te, z as Rt, A as mo, B as xe, C as pe, D as Xe, E as Y, G as Tt, H as Mo, I as zi, J as Oo, K as Ue, L as yo, M as Gi, N as Fs } from "./vendor-vue-D8gPZiit.js";
import { W as hn, t as io, p as Ln, n as Le, a as Fo, b as Pt, h as Qe, m as Lt, c as vi, d as qn, s as $n, e as yi, f as Hs, g as Ks, i as js, j as zs, C as Vi, k as ne, l as Ui, o as Co, q as Yi, r as yt, u as Gs, v as wo, w as so, x as Uo, y as Vs, z as Us, A as Yo, B as Ys } from "./view-styles-CqDruLr2.js";
import { l as Xs, r as qs, G as Js, a as Ae, b as wn, c as ai, s as Zs, d as Qs, e as ri, f as fn, g as li, h as ao, i as Ao, j as At, k as Eo, m as ro, n as Fe, o as wi, p as ea, q as rt, t as et, u as dt, v as Xi, w as Be, x as Jn, R as ta, y as oa, z as Ft, A as jt, B as Me, C as Zt } from "./search.service-D7gCRfDH.js";
import { l as ze, a as qi, b as Ji, c as ci, d as he, f as Ct, e as xo } from "./store-CqU2q98B.js";
import { c as na, a as ia, t as sa, b as aa, d as ra, e as la, f as lo, g as ca } from "./calendar.service-BdldCM6E.js";
import { w as Oe, s as di, P as da, i as gn, D as Sn, a as bi, g as st, p as ua, L as pa, b as Ht, c as ha, d as Tn, t as ki, e as fa, f as ga, h as Bo, l as Zi } from "./window-manager.store-B8yz4j-E.js";
import { s as bn, a as ma, b as va } from "./stickers.service-DDI7EXIX.js";
import { b as Po, a as ya, c as wa } from "./up-group-manager-store-5JNR73iW.js";
import { biliMessagePanelController as zt, biliMessagePanelState as ba } from "./message-panel-store-BNIwMVQ6.js";
import { b as Qi, r as ka, a as Lo } from "./bili-favorites-store-B4rBrSjT.js";
import { a as ui, b as es, c as _a } from "./aihot-feed-store-BhbhXdBq.js";
import { p as ts } from "./pricing-store-NB8GBNHF.js";
import { y as os } from "./youtube-store-CnZHK3Uu.js";
import { R as Ca, u as pi } from "./InlineEditStatus.vue_vue_type_style_index_0_scoped_28642927_lang-HdrLv0sz.js";
import { t as d, c as mt, _ as We } from "./_plugin-vue_export-helper-qhyPkMid.js";
import { f as Gt } from "./fullscreen-cards.store-dqzORWtM.js";
import { k as xa, m as La } from "./core-utils-DYgSCp9X.js";
import { t as gt } from "./together-listen.store-CWIjwrb_.js";
import { A as $a } from "./AppWindowFrame-CHe-eBXv.js";
/* empty css                                                                             */
import { C as Sa } from "./ChatShareMenu-jRzX27bi.js";
const Ta = /^[a-z][a-z0-9]*(?:[.:-][a-z0-9]+)*$/;
function Ia() {
  const e = /* @__PURE__ */ new Map(), t = /* @__PURE__ */ new Map();
  function o(c) {
    if (!c || !Ta.test(c.id)) throw new TypeError(`Invalid command id: ${c?.id || ""}`);
    if (!c.title?.trim() || !c.category?.trim() || typeof c.run != "function")
      throw new TypeError(`Command ${c.id} requires title, category and run()`);
    if (e.has(c.id)) throw new Error(`Command already registered: ${c.id}`);
    return e.set(c.id, Object.freeze({
      ...c,
      description: c.description || "",
      keywords: Object.freeze([...c.keywords || []]),
      concurrency: c.concurrency || "replace"
    })), () => {
      i(c.id), e.delete(c.id);
    };
  }
  function i(c) {
    const h = t.get(c);
    return h ? (h.abort(), t.delete(c), !0) : !1;
  }
  async function a(c, h, L = "api") {
    const F = e.get(c);
    if (!F) throw new Error(`Unknown command: ${c}`);
    if (F.enabled && !F.enabled()) return;
    const m = F.concurrency || "replace";
    if (t.has(c)) {
      if (m === "drop") return;
      m === "replace" && i(c);
    }
    const D = new AbortController();
    m !== "parallel" && t.set(c, D);
    try {
      return await F.run(h, { signal: D.signal, source: L });
    } finally {
      t.get(c) === D && t.delete(c);
    }
  }
  function l(c) {
    return Object.freeze({
      id: c.id,
      title: c.title,
      category: c.category,
      description: c.description || "",
      keywords: Object.freeze([...c.keywords || []]),
      concurrency: c.concurrency || "replace",
      enabled: c.enabled ? !!c.enabled() : !0,
      running: t.has(c.id)
    });
  }
  function g() {
    return Object.freeze([...e.values()].map(l).sort((c, h) => c.category.localeCompare(h.category, "zh") || c.title.localeCompare(h.title, "zh")));
  }
  function f(c, h = 20) {
    const L = String(c || "").trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
    if (!L.length) return g().slice(0, h);
    const F = [...e.values()].map((m) => {
      const D = l(m), v = D.title.toLocaleLowerCase(), w = `${D.id} ${v} ${D.category} ${D.description} ${D.keywords.join(" ")}`.toLocaleLowerCase();
      if (!L.every((y) => w.includes(y))) return null;
      let T = 0;
      for (const y of L)
        D.id === y ? T += 200 : D.id.startsWith(y) && (T += 120), v === y ? T += 160 : v.startsWith(y) ? T += 100 : v.includes(y) && (T += 60), D.keywords.some((_) => _.toLocaleLowerCase().startsWith(y)) && (T += 40);
      return { item: D, score: T };
    }).filter((m) => !!m);
    return F.sort((m, D) => D.score - m.score || m.item.title.localeCompare(D.item.title, "zh")), Object.freeze(F.slice(0, Math.max(1, h)).map((m) => m.item));
  }
  return Object.freeze({ register: o, execute: a, cancel: i, has: (c) => e.has(c), list: g, search: f });
}
const kn = Ia(), Ma = /^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/;
function Da(e) {
  const t = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map();
  function l(m) {
    if (!m || !Ma.test(m.id)) throw new TypeError(`Invalid feature id: ${m?.id || ""}`);
    if (!m.title?.trim() || typeof m.mount != "function") throw new TypeError(`Feature ${m.id} requires title and mount()`);
    if (t.has(m.id)) throw new Error(`Feature already registered: ${m.id}`);
    return t.set(m.id, Object.freeze({
      ...m,
      order: Number(m.order) || 100,
      eager: m.eager === !0,
      roots: Object.freeze([...m.roots || []]),
      capabilities: Object.freeze([...m.capabilities || []])
    })), () => {
      c(m.id), a.delete(m.id), t.delete(m.id);
    };
  }
  function g(m) {
    return typeof m == "function" ? m : m && typeof m.unmount == "function" ? () => m.unmount() : () => {
    };
  }
  function f(m) {
    if (o.has(m)) return Promise.resolve(o.get(m)?.cleanup);
    if (i.has(m)) return i.get(m);
    const D = t.get(m);
    if (!D) return Promise.reject(new Error(`Unknown feature: ${m}`));
    a.delete(m);
    const v = new AbortController(), w = Object.freeze({
      signal: v.signal,
      commands: e,
      getRoot: (y) => document.getElementById(y)
    }), T = Promise.resolve().then(() => D.mount(w)).then((y) => (i.delete(m), o.set(m, { cleanup: y, controller: v }), y), (y) => {
      throw i.delete(m), a.set(m, y), v.abort(), y;
    });
    return i.set(m, T), T;
  }
  async function c(m) {
    const D = i.get(m);
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
  async function L() {
    const m = [...o.keys()].reverse();
    await Promise.allSettled(m.map(c));
  }
  function F() {
    return Object.freeze([...t.values()].map((m) => Object.freeze({
      id: m.id,
      title: m.title,
      order: m.order || 100,
      eager: m.eager === !0,
      roots: Object.freeze([...m.roots || []]),
      capabilities: Object.freeze([...m.capabilities || []]),
      status: i.has(m.id) ? "mounting" : o.has(m.id) ? "mounted" : a.has(m.id) ? "failed" : "registered",
      error: a.has(m.id) ? String(a.get(m.id)?.message || a.get(m.id) || "Feature mount failed") : ""
    })).sort((m, D) => m.order - D.order));
  }
  return Object.freeze({ register: l, start: f, startEager: h, stop: c, stopAll: L, has: (m) => t.has(m), list: F });
}
const Aa = localStorage.getItem("startupAnimationStyle") || localStorage.getItem("logicweaverStartupStyle") || "endfield", _i = (() => {
  try {
    const e = localStorage.getItem("showStartupAnimation"), t = localStorage.getItem("logicweaverEndfieldLoader"), o = e ?? t;
    return o === "1" || o === "true";
  } catch {
    return !1;
  }
})(), se = $e({
  enabled: _i,
  style: Aa === "rhinelab" ? "rhinelab" : "endfield",
  renderedProgress: 4,
  targetProgress: 4,
  status: "CORE SHELL...",
  finished: !_i,
  exiting: !1,
  forced: !1
});
let vo = 0, mn = 4, ns = performance.now(), Zn = 0, an = null, Qn = !1;
function is(e) {
  const t = e - ns, o = Zn ? Math.min(1, t / Zn) : 1, i = o * o * (3 - 2 * o);
  se.renderedProgress = mn + (se.targetProgress - mn) * i, o < 1 && !se.finished ? vo = requestAnimationFrame(is) : vo = 0;
}
function rn(e, t) {
  if (!se.enabled || se.finished) return;
  const o = Math.max(se.targetProgress, Math.max(4, Math.min(100, Number(e) || 4)));
  t && (se.status = t), mn = se.renderedProgress, se.targetProgress = o, ns = performance.now(), Zn = Math.max(280, Math.min(920, 220 + Math.abs(o - mn) * 7.5)), cancelAnimationFrame(vo), vo = requestAnimationFrame(is);
}
function _n(e = "Ready", t = !1) {
  se.finished || (se.finished = !0, se.forced = t, se.status = e, se.targetProgress = 100, cancelAnimationFrame(vo), vo = 0, se.renderedProgress = 100, an?.(t));
}
function Ea(e = "KEYBOARD SKIP") {
  _n(e, !0);
}
function Pa() {
  se.enabled || _n("BOOT COMPLETE", !0);
}
function ss() {
  !se.enabled || se.finished || Qn || (Qn = !0, rn(38, "INITIALIZING CORE SHELL..."), setTimeout(() => {
    se.finished || rn(76, "SYNTHESIZING RUNTIME...");
  }, 400), setTimeout(() => {
    se.finished || rn(100, se.style === "rhinelab" ? "ID CONFIRMED : JOYCE MOORE" : "TERRA LINK READY / 终端就绪");
  }, 900), setTimeout(() => {
    se.finished || _n("BOOT COMPLETE / 首页就绪", !1);
  }, 1650));
}
async function Wa() {
  if (document.getElementById("vue-spa-root")) {
    try {
      const e = await chrome.storage.local.get(["showStartupAnimation", "startupAnimationStyle"]);
      typeof e.showStartupAnimation == "boolean" && (se.enabled = e.showStartupAnimation, localStorage.setItem("showStartupAnimation", se.enabled ? "1" : "0"), localStorage.setItem("logicweaverEndfieldLoader", se.enabled ? "1" : "0")), (e.startupAnimationStyle === "endfield" || e.startupAnimationStyle === "rhinelab") && (se.style = e.startupAnimationStyle, localStorage.setItem("startupAnimationStyle", se.style));
    } catch {
      console.warn("[Intro] Startup preferences unavailable; using first-paint preference.");
    }
    se.finished = !se.enabled, document.documentElement.dataset.startupStyle = se.style, document.documentElement.classList.toggle("skip-endfield-loader", !se.enabled), document.body.classList.toggle("is-starting", se.enabled);
  }
}
const lt = Wt(se), wt = Object.freeze({
  update: rn,
  finish: _n,
  skip: Ea,
  notifyBootReady: Pa,
  async playIntro(e) {
    if (e?.style && (se.style = e.style), typeof document < "u" && (document.documentElement.dataset.startupStyle = se.style, document.documentElement.classList.remove("skip-endfield-loader"), document.body.classList.add("is-starting")), se.enabled = !0, se.finished = !1, se.forced = !!e?.force, se.renderedProgress = 4, se.targetProgress = 4, Qn = !1, typeof document < "u") {
      let t = document.getElementById("endfield-loader");
      if (!t) {
        t = document.createElement("div"), t.id = "endfield-loader", t.className = "endfield-loader notranslate", document.body.appendChild(t);
        const { default: o } = await import("./IntroAnimation-DjxJEDDZ.js"), i = si(o), a = () => {
          window.removeEventListener("logicweaver:intro-complete", a), i.unmount(), t?.remove(), document.body.classList.remove("is-starting");
        };
        window.addEventListener("logicweaver:intro-complete", a, { once: !0 }), i.mount(t);
      }
    }
    ss();
  },
  get enabled() {
    return se.enabled;
  },
  get finished() {
    return se.finished;
  }
});
function Ra(e) {
  return an = e, se.finished && e(se.forced), () => {
    an === e && (an = null);
  };
}
const as = [
  { date: "今天", dayName: "周四", emoji: "🌤️", condition: "多云", highTemp: 26, lowTemp: 18, rainProb: 15 },
  { date: "明天", dayName: "周五", emoji: "⛅", condition: "阴天", highTemp: 24, lowTemp: 17, rainProb: 30 },
  { date: "后天", dayName: "周六", emoji: "🌧️", condition: "小雨", highTemp: 21, lowTemp: 16, rainProb: 75 },
  { date: "周日", dayName: "周日", emoji: "🌦️", condition: "阵雨", highTemp: 23, lowTemp: 15, rainProb: 45 },
  { date: "周一", dayName: "周一", emoji: "☀️", condition: "晴天", highTemp: 27, lowTemp: 18, rainProb: 10 },
  { date: "周二", dayName: "周二", emoji: "🌤️", condition: "多云", highTemp: 28, lowTemp: 19, rainProb: 15 },
  { date: "周三", dayName: "周三", emoji: "☀️", condition: "晴天", highTemp: 29, lowTemp: 20, rainProb: 5 }
], rs = "lw_weather_snapshot_v1";
function Na() {
  if (typeof window > "u" || typeof localStorage > "u") return null;
  try {
    const e = localStorage.getItem(rs);
    if (!e) return null;
    const t = JSON.parse(e);
    if (t && t.data && t.data.currentTemp !== void 0)
      return {
        state: "ready",
        city: t.city || t.data.cityName || "",
        data: t.data,
        forecastDays: Array.isArray(t.forecastDays) && t.forecastDays.length ? t.forecastDays : as,
        detailInfo: t.detailInfo || null,
        updatedAt: t.savedAt || Date.now()
      };
  } catch {
  }
  return null;
}
function Xo(e) {
  if (!(typeof window > "u" || typeof localStorage > "u"))
    try {
      e.data && localStorage.setItem(
        rs,
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
    forecastDays: e?.forecastDays || as,
    detailInfo: e?.detailInfo || {
      humidity: "62%",
      wind: "东北风 2级",
      uvIndex: "中等 (4)",
      airQuality: "优 (32)"
    }
  };
}, J = $e(Oa());
let In = null, Mn = null;
const ut = {
  get snapshot() {
    return Wt(J);
  },
  update(e) {
    Object.assign(J, e), Xo(J);
  },
  unconfigured() {
    Object.assign(J, {
      state: "unconfigured",
      city: "",
      errorMessage: "",
      data: null,
      updatedAt: Date.now()
    });
  },
  loading(e = "") {
    if (J.data) {
      e && (J.city = e);
      return;
    }
    Object.assign(J, {
      state: "loading",
      city: e,
      errorMessage: "",
      updatedAt: Date.now()
    });
  },
  ready(e, t = "") {
    Object.assign(J, {
      state: "ready",
      city: t || e.cityName,
      errorMessage: "",
      data: e,
      updatedAt: Date.now()
    }), Xo(J);
  },
  notFound(e = "") {
    Object.assign(J, {
      state: "not_found",
      city: e,
      errorMessage: `找不到城市「${e}」，右键可重新选择地点。`,
      data: null,
      updatedAt: Date.now()
    });
  },
  error(e = "天气加载失败，右键此处可重新选择地点。", t = "") {
    J.data || Object.assign(J, {
      state: "error",
      city: t,
      errorMessage: e,
      data: null,
      updatedAt: Date.now()
    });
  },
  openForecastModal(e) {
    e && (J.city = e), J.forecastModalOpen = !0;
  },
  closeForecastModal() {
    J.forecastModalOpen = !1;
  },
  setForecastDays(e) {
    J.forecastDays = Array.isArray(e) ? e.map((t) => ({
      dayName: t.dayName || t.day || "",
      date: t.date || "",
      emoji: t.emoji || "🌤️",
      condition: t.condition || t.text || "",
      rainProb: t.rainProb ?? 0,
      lowTemp: t.lowTemp ?? t.tempMin ?? 0,
      highTemp: t.highTemp ?? t.tempMax ?? 0
    })) : [], Xo(J);
  },
  setDetailInfo(e) {
    J.detailInfo = { ...e }, Xo(J);
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
}), Te = $e(Ba());
let Dn = null;
const co = {
  get snapshot() {
    return Wt(Te);
  },
  update(e) {
    Object.assign(Te, e);
  },
  updateTime(e, t, o, i) {
    Te.timeText = e, Te.secsText = t, Te.greetingText = o, Te.dateText = i, Te.updatedAt = Date.now();
  },
  applyConfig(e) {
    e.fontFamily !== void 0 && (Te.fontFamily = e.fontFamily), e.colorHex !== void 0 && (Te.colorHex = e.colorHex), e.greetColor !== void 0 && (Te.greetColor = e.greetColor), e.dateColor !== void 0 && (Te.dateColor = e.dateColor), e.isBlack !== void 0 && (Te.isBlack = e.isBlack), e.isCustomColor !== void 0 && (Te.isCustomColor = e.isCustomColor), Te.updatedAt = Date.now();
  },
  openSettings(e) {
    Dn ? Dn(e) : window.dispatchEvent(new CustomEvent("logicweaver:clock-open-settings", { detail: { clientX: e?.clientX, clientY: e?.clientY } }));
  },
  setOpenSettingsAction(e) {
    Dn = e;
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
}), An = $e(Ha());
let qo = {};
const hi = {
  getSnapshot() {
    return Wt(An);
  },
  update(e) {
    Object.assign(An, e);
  },
  setMounted(e) {
    An.mounted = e;
  },
  openWorkspace(e, t = !1) {
    if (qo.open) {
      qo.open(e);
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
    qo = { ...qo, ...e };
  }
}, En = $e({ visible: !1, pendingWrites: 0 });
async function Ka(e) {
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
    return Ka(() => hn.clearWallpaper());
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
], Sm = [
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
let Pn = null;
const Vt = {
  state: De,
  setMounted(e) {
    De.mounted = e;
  },
  onAction(e) {
    Pn = e;
  },
  dispatch(e, t) {
    if (Pn)
      return Pn(e, t);
  },
  open(e) {
    const i = typeof window < "u" ? window.innerWidth : 1280, a = typeof window < "u" ? window.innerHeight : 800, l = e?.clientX ?? e?.x ?? i / 2, g = e?.clientY ?? e?.y ?? a / 2, f = Math.max(12, Math.min(l - 40, i - 290 - 12)), c = Math.max(12, Math.min(g + 10, a - 420 - 12));
    De.x = f, De.y = c, De.isOpen = !0, this.dispatch("open", { x: f, y: c });
  },
  close() {
    De.isOpen = !1, this.dispatch("close");
  },
  setFont(e) {
    De.font = e;
    const t = xi.find((o) => o.id === e);
    if (t) {
      co.applyConfig({ fontFamily: t.font });
      try {
        localStorage.setItem("lw_clock_font", e);
      } catch {
      }
    }
    this.dispatch("change", { font: e, color: De.color, timezone: De.timezone });
  },
  setColor(e) {
    De.color = e;
    const t = Li.find((o) => o.id === e);
    if (t) {
      co.applyConfig({
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
        const i = xi.find((a) => a.id === e);
        i && co.applyConfig({ fontFamily: i.font });
      }
      const t = localStorage.getItem("lw_clock_color");
      if (t) {
        De.color = t;
        const i = Li.find((a) => a.id === t);
        i && co.applyConfig({ colorHex: i.hex, greetColor: i.hex, dateColor: i.hex, isCustomColor: !0 });
      }
      const o = localStorage.getItem("lw_clock_tz");
      o && (De.timezone = o);
    } catch {
    }
  },
  syncConfig(e) {
    e.font && (De.font = e.font), e.color && (De.color = e.color), e.timezone && (De.timezone = e.timezone);
  }
}, ve = $e({
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
  if (e === "poll") return { state: "ready", model: ve.model };
  if (e === "connect") return { state: "ready", model: ve.model };
  throw new Error("旧版 AI 对话桥接已退役，请使用「海狸聊天室」开启智能会话。");
}
function ls(e) {
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
  o || (e.state === "connecting" ? o = "正在连接本机 Codex 与 ChatGPT…" : e.state === "disconnected" ? o = "已待命（打开面板自动连接）" : e.authenticated ? o = `就绪 · ChatGPT ${e.plan || "已登录"}` : e.state === "ready" ? o = "就绪 · 尚未登录 ChatGPT" : o = t[e.state] || e.state), ve.statusText = o, ve.authHidden = !e.loginUrl, ve.authCode = e.loginCode || "", ve.authLink = e.loginUrl || "https://auth.openai.com/codex/device", ve.isStreaming = ln || e.busy || e.state === "running";
}
async function ja() {
  try {
    const e = await cn("poll");
    ls(e);
  } catch {
  }
}
async function za(e, t) {
  if (e === "open" || e === "connect")
    try {
      ve.statusText = "正在连接本机 Codex 与 ChatGPT…";
      const o = await cn("connect");
      ls(o);
    } catch (o) {
      ve.statusText = o?.message || "连接失败";
    }
  else if (e === "send" && t?.text) {
    const o = t.text;
    ve.messages.push({
      id: `msg-${Date.now()}`,
      role: "user",
      content: o
    }), ve.inputText = "", ve.isStreaming = !0, ln = !0;
    try {
      await cn("send", { text: o }), await ja();
    } catch (i) {
      ve.statusText = i?.message || "发送失败";
    } finally {
      ln = !1, ve.isStreaming = !1;
    }
  } else if (e === "stop") {
    try {
      await cn("stop");
    } catch {
    }
    ve.isStreaming = !1, ln = !1;
  }
}
const fi = {
  state: ve,
  setMounted(e) {
    ve.mounted = e;
  },
  onAction(e) {
    Wn = e;
  },
  dispatch(e, t) {
    if (Wn)
      return Wn(e, t);
    za(e, t);
  },
  open() {
    ve.isOpen = !0, this.dispatch("open");
  },
  close() {
    ve.isOpen = !1, this.dispatch("close");
  },
  newChat() {
    ve.messages = [], ve.inputText = "", ve.kwShelfHidden = !0, ve.keywords = [], this.dispatch("newChat");
  },
  send() {
    const e = ve.inputText.trim();
    !e || ve.isStreaming || this.dispatch("send", { text: e });
  },
  stop() {
    ve.isStreaming = !1, this.dispatch("stop");
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
    ve.keywords.forEach((t) => t.selected = e), this.dispatch("selectAllKeywords", { all: e });
  },
  toggleKeyword(e) {
    ve.keywords[e] && (ve.keywords[e].selected = !ve.keywords[e].selected, this.dispatch("toggleKeyword", { index: e, selected: ve.keywords[e].selected }));
  },
  deepDiveKeywords() {
    const e = ve.keywords.filter((t) => t.selected).map((t) => t.text);
    this.dispatch("deepDiveKeywords", { selected: e });
  }
}, Rn = $e({
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
}), Jo = /* @__PURE__ */ new Set(), Ga = {
  state: Rn,
  open(e) {
    Object.assign(Rn, e, { open: !0 });
  },
  update(e) {
    Object.assign(Rn, e);
  },
  close() {
    Jo.forEach((e) => e("close"));
  },
  save(e) {
    Jo.forEach((t) => t("save", e));
  },
  onAction(e) {
    return Jo.add(e), () => Jo.delete(e);
  }
}, dn = $e({ isOpen: !1 }), cs = {
  state: dn,
  open() {
    dn.isOpen = !0;
  },
  close() {
    dn.isOpen = !1;
  }
}, Nn = "biliProfileCacheV1", _t = "biliLocallyKnownMessageIdsV1", Zo = "biliMessageUserCacheV1", $o = "githubKnownReleaseVersionsV1", Qo = "customNewtabAvatar", $i = "biliToastKnownCountsV1";
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
    !t?.repository || !t?.version || (this.githubKnownVersions[t.repository] = t.version, typeof chrome < "u" && chrome?.storage?.local && await chrome.storage.local.set({ [$o]: this.githubKnownVersions }), this.notifyGitHubListeners());
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
      let g = Array.isArray(this.locallyKnownIds?.[a]) ? this.locallyKnownIds[a] : [];
      l < g.length && (g = [], this.locallyKnownIds[a] = [], o = !0), t[a] = Math.max(0, l - g.length);
    }), o && typeof chrome < "u" && chrome?.storage?.local && chrome.storage.local.set({ [_t]: this.locallyKnownIds }).catch(() => {
    }), t;
  }
  markKnown(t, o, i) {
    this.locallyKnownIds[t] || (this.locallyKnownIds[t] = []);
    let a = !1;
    o && !this.locallyKnownIds[t].includes(o) && (this.locallyKnownIds[t].push(o), a = !0), i && !this.locallyKnownIds[t].includes(i) && (this.locallyKnownIds[t].push(i), a = !0), a && typeof chrome < "u" && chrome?.storage?.local && chrome.storage.local.set({ [_t]: this.locallyKnownIds }).catch(() => {
    }), this.applyBiliProfile(this.profile, this.unread);
  }
  markAllKnown(t, o = []) {
    this.locallyKnownIds[t] || (this.locallyKnownIds[t] = []);
    const i = new Set(this.locallyKnownIds[t]);
    for (const l of o) l && i.add(l);
    const a = Math.max(0, Number(this.unread?.[t] || 0));
    if (i.size < a) {
      const l = a - i.size;
      for (let g = 0; g < l; g++) i.add(`__pad_${Date.now()}_${g}`);
    }
    this.locallyKnownIds[t] = Array.from(i), typeof chrome < "u" && chrome?.storage?.local && chrome.storage.local.set({ [_t]: this.locallyKnownIds }).catch(() => {
    }), this.applyBiliProfile(this.profile, this.unread);
  }
  applyBiliProfile(t, o = {}) {
    this.profile = t || null, this.unread = o || {};
    const a = this.customAvatar || String(t?.face || "assets/bilibili.svg").replace(/^http:/, "https:"), l = this.getVisibleUnread();
    if (io.avatarUrl = a, io.userName = t?.uname || "哔哩哔哩用户", io.buttonTitle = "通知中心", Ln.avatarUrl = a, Ln.userName = t?.uname || "用户", Ln.mid = t?.mid, typeof document < "u") {
      const g = document.getElementById("bili-profile-avatar");
      g && (g.src = a);
      const f = document.getElementById("bili-profile-button");
      f && (f.title = io.buttonTitle);
    }
    zt.updateState({
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
        }, [a, l, g] = await Promise.allSettled([
          fetch("https://api.bilibili.com/x/msgfeed/unread?build=0&mobi_app=web", { credentials: "include" }).then((D) => D.json()),
          fetch("https://api.vc.bilibili.com/x/im/web/msgfeed/unread", { credentials: "include" }).then((D) => D.json()),
          fetch("https://api.vc.bilibili.com/session_svr/v1/session_svr/single_unread", { credentials: "include" }).then((D) => D.json())
        ]), f = a.status === "fulfilled" ? a.value?.data || {} : {}, c = l.status === "fulfilled" ? l.value?.data || {} : {}, h = g.status === "fulfilled" ? g.value?.data || {} : {}, L = Number(c.at || 0), F = c.reply != null ? Number(c.reply || 0) : Math.max(0, Number(c.recv_reply || 0) - L), m = {
          reply: Math.max(Number(f.reply || 0), F),
          at: Math.max(Number(f.at || 0), L),
          like: Math.max(
            Number(f.like || f.praise || 0),
            Number(c.like || c.recv_like || 0)
          ),
          system: Math.max(Number(f.sys_msg || f.system || 0), Number(c.sys_msg || 0)),
          private: Number(
            f.chat || c.chat || Number(h.follow_unread || 0) + Number(h.unfollow_unread || 0) + Number(h.dustbin_push_msg || 0)
          )
        };
        this.applyBiliProfile(i, m), typeof chrome < "u" && chrome?.storage?.local && await chrome.storage.local.set({ [Nn]: { profile: i, unread: m, savedAt: Date.now() } }), this.checkAndNotifyBiliInteractions(m);
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
    const i = o.private - Number(this.biliToastKnownCounts.private || 0);
    o.like - Number(this.biliToastKnownCounts.like || 0);
    const a = o.reply - Number(this.biliToastKnownCounts.reply || 0), l = o.at - Number(this.biliToastKnownCounts.at || 0);
    o.system - Number(this.biliToastKnownCounts.system || 0), this.biliToastKnownCounts = { ...o }, typeof chrome < "u" && chrome?.storage?.local && chrome.storage.local.set({ [$i]: this.biliToastKnownCounts }).catch(() => {
    }), i > 0 && Le.show({
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
    }), l > 0 && Le.show({
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
        zt.openPanel();
      }
    });
  }
  init() {
    this.initialized || (this.initialized = !0, Fo.setActions({
      onAction: async (t) => {
        if (t === "messages")
          Pt.open();
        else if (t === "tabs")
          cs.open();
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
      Nn,
      _t,
      Zo,
      $o,
      Qo
    ]).then((t) => {
      this.customAvatar = t[Qo] || "", this.locallyKnownIds = t[_t] && typeof t[_t] == "object" ? t[_t] : {}, this.userCache = t[Zo] && typeof t[Zo] == "object" ? t[Zo] : {}, this.githubKnownVersions = t[$o] && typeof t[$o] == "object" ? t[$o] : {};
      const o = t[Nn];
      o?.profile ? this.applyBiliProfile(o.profile, o.unread || {}) : this.applyBiliProfile(null, {});
    }).catch(() => {
    }), chrome.storage.onChanged && chrome.storage.onChanged.addListener((t, o) => {
      o === "local" && (t[Qo] && (this.customAvatar = t[Qo].newValue || "", this.applyBiliProfile(this.profile, this.unread)), t[_t] && (this.locallyKnownIds = t[_t].newValue || {}, this.applyBiliProfile(this.profile, this.unread)));
    })), zt.onAction((t, o) => {
      t === "mark-known" ? this.markKnown(o.kind, o.id, o.talkerId) : t === "mark-all-known" && this.markAllKnown(o.kind, o.ids);
    }), this.refreshBiliProfile(), setTimeout(() => {
      this.loadGitHubUpdates();
    }, 3500));
  }
}
const Si = new Va(), ye = $e({ open: !1, loading: !1, error: "", mid: "", name: "", face: "", sign: "", followed: !1, submitting: !1, left: 12, top: 12, videos: [] });
let en = null;
const un = {
  state: ye,
  open(e, t) {
    en = t, Object.assign(ye, { open: !0, loading: !0, error: "", submitting: !1, videos: [] }, e);
  },
  update(e) {
    Object.assign(ye, e);
  },
  close() {
    ye.submitting || (ye.open = !1, en = null);
  },
  async toggleFollow() {
    if (!(!en || ye.submitting)) {
      ye.submitting = !0;
      try {
        const e = !ye.followed;
        await en(e) && (ye.followed = e);
      } finally {
        ye.submitting = !1;
      }
    }
  }
}, Ne = $e({
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
let Qt;
const Bn = new Ca();
async function Ua(e, t) {
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
    const g = l.body.getReader(), f = new TextDecoder("utf-8", { fatal: !0 });
    let c = 0, h = "";
    try {
      for (; ; ) {
        o.signal.throwIfAborted();
        const L = await g.read();
        if (L.done) break;
        if (c += L.value.byteLength, c > 2 * 1024 * 1024) throw new Error("Public source exceeds limit");
        h += f.decode(L.value, { stream: !0 });
      }
      return o.signal.throwIfAborted(), JSON.parse(h + f.decode());
    } finally {
      g.cancel().catch(() => {
      }), g.releaseLock();
    }
  } finally {
    clearTimeout(a), t.removeEventListener("abort", i);
  }
}
function Ti(e, t) {
  const o = e?.name || e?.repository, i = t ? e?.full_name || (typeof o == "string" && o.includes("/") ? o : e?.author && o ? `${e.author}/${o}` : "") : e?.full_name;
  if (typeof i != "string" || !/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(i) || i.split("/").some((f) => f === "." || f === "..")) throw new Error("Invalid repository");
  const [a, l] = i.split("/"), g = (f) => typeof f == "number" && Number.isFinite(f) && f >= 0 ? f : void 0;
  return {
    name: l,
    full_name: i,
    owner: { login: a },
    description: typeof e.description == "string" ? e.description : "",
    language: typeof e.language == "string" ? e.language : "",
    stargazers_count: g(t ? e.stars ?? e.stargazers_count : e.stargazers_count),
    forks_count: g(t ? e.forks ?? e.forks_count : e.forks_count),
    html_url: `https://github.com/${encodeURIComponent(a)}/${encodeURIComponent(l)}`
  };
}
async function Ya(e, t) {
  const o = new Date(Date.now() - e * 864e5).toISOString().slice(0, 10);
  let i = "";
  try {
    const g = await Xs(t), { data: f } = await qs(`/search/repositories?q=${encodeURIComponent(`is:public created:>${o}`)}&sort=stars&order=desc&per_page=30`, { headers: g, signal: t, maxBytes: 2 * 1024 * 1024 });
    if (t.throwIfAborted(), !Array.isArray(f?.items)) throw new Error("Invalid search response");
    return {
      repos: f.items.slice(0, 30).map((c) => Ti(c, !1)),
      sourceText: `GitHub Search：UTC 日期 ${o} 之后新建的仓库，按累计 Star 排序；不是官方 Trending 榜。${f.incomplete_results ? " API 标记为不完整结果。" : ""}`
    };
  } catch (g) {
    t.throwIfAborted(), i = g instanceof Js ? g.message : "主源响应格式无效。";
  }
  const a = e === 1 ? "daily" : e === 7 ? "weekly" : "monthly", l = await Ua(`https://ghapi.h11.dev/repositories?since=${a}`, t);
  if (t.throwIfAborted(), !Array.isArray(l)) throw new Error("Invalid fallback response");
  return {
    repos: l.slice(0, 30).map((g) => Ti(g, !0)),
    sourceText: `GitHub Search 不可用：${i} 改用第三方 ghapi.h11.dev 的 ${a} 趋势快照（不发送账号凭据）；口径与新建仓库搜索不同，源更新时间未提供。`
  };
}
const ds = {
  get state() {
    return Ne;
  },
  // View attachment permits starting reads; detaching does not cancel an
  // already requested read. Range changes still replace the old session.
  attachView(e) {
    return Qt = e, !e.aborted && !Ne.hasLoaded && !Bn.pending && this.refresh(), () => {
      Qt === e && (Qt = void 0);
    };
  },
  switchTab(e) {
    Ne.currentTab = e, this.dispatch("switch-tab", e);
  },
  async switchRange(e, t) {
    !Qt || Qt.aborted || ![1, 7, 30].includes(e) || e === Ne.sinceDays || (Bn.cancel(), Object.assign(Ne, {
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
    const e = Qt;
    if (!e || e.aborted || Ne.isLoading) return;
    const t = Ne.sinceDays, o = Bn.begin({
      timeoutMs: 45e3,
      isCurrent: () => Ne.sinceDays === t,
      onStop: (a) => {
        Ne.isLoading = !1, a === "timeout" && (Ne.errorMessage = "数据源读取超过整体45秒上限，请手动刷新；没有继续请求备用源。");
      }
    }), i = o.current;
    if (i()) {
      Ne.isLoading = !0, Ne.errorMessage = "";
      try {
        const a = await o.wait(() => Ya(t, o.signal));
        if (!i()) return;
        Ne.repos = a.repos, Ne.sourceText = a.sourceText, Ne.fetchedAt = Date.now(), Ne.hasLoaded = !0;
      } catch {
        i() && (Ne.errorMessage = Ne.hasLoaded ? "刷新失败，保留同一时间范围的上次读取结果；请检查网络或额度后手动刷新。" : "数据源读取失败或超时；未使用内置样例，请稍后手动刷新。");
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
}, ei = () => ({
  icon: "🧭",
  title: "快捷轮盘",
  desc: "移动鼠标选择",
  active: !1
}), gi = () => ({
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
  hub: ei(),
  activeSectorId: null,
  sectors: [],
  beam: gi()
});
let Ii = null;
function Xa(e, t) {
  if (typeof e != "number" || !t)
    return gi();
  const o = 160, i = 160, a = 26, l = 154, g = 360 / t, f = e - g / 2, c = e + g / 2, h = f * Math.PI / 180, L = c * Math.PI / 180, F = o + a * Math.cos(h), m = i + a * Math.sin(h), D = o + l * Math.cos(h), v = i + l * Math.sin(h), w = o + a * Math.cos(L), T = i + a * Math.sin(L), y = o + l * Math.cos(L), _ = i + l * Math.sin(L), x = g > 180 ? 1 : 0, B = `M ${F.toFixed(1)} ${m.toFixed(1)} L ${D.toFixed(1)} ${v.toFixed(1)} A ${l} ${l} 0 ${x} 1 ${y.toFixed(1)} ${_.toFixed(1)} L ${w.toFixed(1)} ${T.toFixed(1)} A ${a} ${a} 0 ${x} 0 ${F.toFixed(1)} ${m.toFixed(1)} Z`, K = `M ${D.toFixed(1)} ${v.toFixed(1)} A ${l} ${l} 0 ${x} 1 ${y.toFixed(1)} ${_.toFixed(1)}`;
  return {
    visible: !0,
    wedgePath: B,
    arcPath: K,
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
    } : ie.hub = ei();
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
    ie.isExpanded = !1, ie.mode = "main", ie.activeSectorId = null, ie.beam = gi(), ie.hub = ei();
  },
  setWheelMode(e) {
    ie.mode = e;
  },
  setActionHandler(e) {
    Ii = e;
  },
  dispatch(e, t) {
    Ii?.(e, t);
  }
}, us = [
  { id: "daily-bilibili", title: "b站插件", desc: "B站收藏夹与追番视频", icon: "assets/bilibili.svg" },
  { id: "daily-pricing", title: "模型插件", desc: "AI 模型定价与排行榜", icon: "assets/nav-pricing.svg" },
  { id: "daily-aihot", title: "ai hot插件", desc: "全网 AI 与前沿科技资讯", icon: "assets/nav-aihot.svg" },
  { id: "folder", title: "常用网站", desc: "点击展开快捷网站子轮盘", icon: "assets/nav-folder.svg", mode: "shortcuts" },
  { id: "card-github", title: "github插件", desc: "GitHub 趋势与星标项目", icon: "assets/nav-github.svg" },
  { id: "launcher", title: "首页", desc: "返回主屏常用应用台", icon: "assets/nav-home.svg" }
];
function qa() {
  return us.filter((e) => e.mode || e.id === "launcher" || gn(e.id));
}
function Ja() {
  return da.filter((e) => e.kind === "module" && gn(e.id)).map((e) => ({
    id: e.id,
    title: e.title,
    desc: e.isDev ? "已启用的实验性组件" : e.categoryLabel,
    icon: e.icon || e.emoji || "🧩",
    tool: e.id
  }));
}
function Mi() {
  ie.isExpanded && ht();
}
let ti = [], Wo = us, xt = { x: 400, y: 300 }, ps = !1, So = !1, Fn = null, To = null, pt = !1;
const Za = $e(/* @__PURE__ */ new Set()), Qa = /* @__PURE__ */ new Map();
function Et() {
  return globalThis.chrome?.storage;
}
function hs(e, t) {
  const o = ie.isExpanded ? 160 : 24;
  Ee.setBallPosition(
    Math.max(o + 8, Math.min(window.innerWidth - o - 8, e)),
    Math.max(o + 8, Math.min(window.innerHeight - o - 8, t))
  );
}
function ht() {
  const e = ie.mode;
  let t = [];
  e === "shortcuts" && (t = [...ti], t.push({
    id: "toggle-edit-shortcuts",
    title: pt ? d("navwheel.finishEdit") : d("navwheel.editSites"),
    desc: pt ? d("navwheel.finishEditDesc") : d("navwheel.editSitesDesc"),
    icon: pt ? "✅" : "✏️"
  })), Wo = e === "tools" ? Ja() : e === "shortcuts" ? [
    ...t,
    { id: "back-to-main", title: d("navwheel.back"), desc: d("navwheel.backDesc"), icon: "🔙", mode: "main" }
  ] : qa();
  const o = Wo.length, i = o > 12 ? 118 : o > 9 ? 114 : 110, a = o > 12 ? 46 : o > 9 ? 50 : 56;
  Ee.setSectors(Wo.map((l, g) => {
    const f = -90 + 360 / o * g, c = f * Math.PI / 180;
    return {
      id: l.id,
      title: l.title,
      desc: l.desc,
      icon: l.icon,
      angleDeg: f,
      x: Math.round(160 + Math.cos(c) * i),
      y: Math.round(160 + Math.sin(c) * i),
      size: a,
      isShortcut: !!l.url
    };
  })), Ee.setWheelMode(e), Ee.setActiveSector(null), Ee.setBeam(null, 0), Ee.setHub(e === "shortcuts" ? pt ? { icon: "✏️", title: d("navwheel.editing") } : { icon: "🔙", title: d("navwheel.shortcuts") } : e === "tools" ? { icon: "🧰", title: d("navwheel.tools") } : null);
}
function vn(e) {
  ie.mode = e, ht();
}
function Ut() {
  Ee.collapse(), hs(ie.ballPosition.x, ie.ballPosition.y), Ee.setVisibility(ps);
}
function oo(e = ie.ballPosition.x, t = ie.ballPosition.y, o = "main") {
  Ee.expand(void 0, void 0, o), hs(e, t), ht(), Ee.setVisibility(!0);
}
function er(e) {
  if (e.id === "toggle-edit-shortcuts") {
    fs();
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
  if (!(e.tool && !gn(e.tool) || !e.url && !e.mode && e.id !== "launcher" && !gn(e.id))) {
    if (e.mode) {
      vn(e.mode);
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
function fs() {
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
async function tr(e) {
  if (!pt || !e || !e.url) return !1;
  try {
    const t = await Et()?.local?.get(["siteShelfLinks", "logicweaverNavWheelShortcutsV1"]), o = Array.isArray(t?.siteShelfLinks) ? t.siteShelfLinks : Array.isArray(t?.logicweaverNavWheelShortcutsV1) ? t.logicweaverNavWheelShortcutsV1 : [], i = o.findIndex((g) => g.url === e.url);
    if (i >= 0) {
      const g = o.filter((f, c) => c !== i);
      return await Et()?.local?.set({ siteShelfLinks: g, logicweaverNavWheelShortcutsV1: g }), await Ye.loadShortcuts(), ht(), Le.show({
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
    }, l = [...o, a];
    return await Et()?.local?.set({ siteShelfLinks: l, logicweaverNavWheelShortcutsV1: l }), await Ye.loadShortcuts(), ht(), Le.show({
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
    const t = await Et()?.local?.get(["siteShelfLinks", "logicweaverNavWheelShortcutsV1"]), o = Array.isArray(t?.siteShelfLinks) ? t.siteShelfLinks : Array.isArray(t?.logicweaverNavWheelShortcutsV1) ? t.logicweaverNavWheelShortcutsV1 : [], i = o.find((l) => String(l.id) === String(e)), a = o.filter((l) => String(l.id) !== String(e));
    await Et()?.local?.set({ siteShelfLinks: a, logicweaverNavWheelShortcutsV1: a }), await Ye.loadShortcuts(), ht(), i && Le.show({
      appName: d("navwheel.appName"),
      title: d("navwheel.removedNotice"),
      message: d("navwheel.removedSite", { name: i.title || d("navwheel.site") }),
      duration: 2500
    });
  } catch (t) {
    console.warn("[NavWheel] 删除快捷方式失败", t);
  }
}
function Di(e) {
  xt = { x: e.clientX, y: e.clientY };
}
function Ai(e) {
  e.button === 1 && (e.preventDefault(), e.stopPropagation(), xt = { x: e.clientX, y: e.clientY }, ie.isExpanded ? Ut() : oo(e.clientX, e.clientY));
}
function Ei(e) {
  e.button === 1 && e.preventDefault();
}
function Pi(e) {
  if (e.key === "Escape") {
    if (pt) {
      e.preventDefault(), e.stopPropagation(), pt = !1, Za.clear(), Qa.clear(), ht(), Le.show({
        appName: d("navwheel.appName"),
        title: d("navwheel.exitedEditing"),
        duration: 1500
      });
      return;
    }
    if (!ie.isExpanded || di.active) return;
    e.preventDefault(), e.stopPropagation(), ie.mode === "shortcuts" ? vn("main") : Ut();
  }
}
function nr(e) {
  try {
    const t = globalThis.chrome;
    if (typeof t?.runtime?.getURL == "function")
      return t.runtime.getURL("_favicon/?pageUrl=" + encodeURIComponent(e) + "&size=64");
  } catch {
  }
  return "";
}
function ir(e) {
  const t = e.customIcon || e.icon;
  if (t && typeof t == "string" && !/google\.com\/s2\/favicons|icons\.duckduckgo/i.test(t))
    return t;
  if (e.url) {
    const o = Ae.getCachedIcon(e.url);
    if (o) return o;
    const i = nr(e.url);
    if (i) return i;
  }
  return e.icon || "🔗";
}
const Ye = {
  async start() {
    if (!So) {
      So = !0, Fn = Pe(mt, () => {
        ie.isExpanded && ht();
      }), xt = { x: Math.round(window.innerWidth / 2), y: Math.round(window.innerHeight / 2) }, Ee.setActionHandler((e, t) => {
        if (e === "hub:click")
          ie.isExpanded ? ie.mode === "shortcuts" ? vn("main") : Ut() : oo();
        else if (e === "sector:click" || e === "container:click") {
          const o = Wo.find((i) => i.id === t?.id || e === "container:click" && i.id === ie.activeSectorId);
          o && er(o);
        } else if (e === "sector:hover") {
          const o = ie.sectors.find((i) => i.id === t?.id);
          o && (Ee.setHub({ icon: o.icon, title: o.title, desc: o.desc, active: !0 }), Ee.setActiveSector(o.id), Ee.setBeam(o.angleDeg, Wo.length));
        } else e === "sector:leave" && (Ee.setActiveSector(null), Ee.setBeam(null, 0), Ee.setHub(ie.mode === "shortcuts" ? { icon: "🔙", title: d("navwheel.shortcuts") } : ie.mode === "tools" ? { icon: "🧰", title: d("navwheel.tools") } : null));
      }), window.addEventListener("logicweaver:dock-modules-changed", Mi), window.addEventListener("pointermove", Di, { passive: !0 }), window.addEventListener("mousedown", Ai, !0), window.addEventListener("auxclick", Ei, !0), window.addEventListener("keydown", Pi, !0), To = (e, t) => {
        t === "local" && (e.siteShelfLinks || e.logicweaverNavWheelShortcutsV1) && this.loadShortcuts();
      }, Et()?.onChanged?.addListener(To);
      try {
        if (!So) return;
        ps = !1, Ee.setVisibility(!1);
      } catch {
      }
      await this.loadShortcuts(), ht();
    }
  },
  stop() {
    So = !1, Fn?.(), Fn = null, Ee.setActionHandler(null), window.removeEventListener("logicweaver:dock-modules-changed", Mi), window.removeEventListener("pointermove", Di), window.removeEventListener("mousedown", Ai, !0), window.removeEventListener("auxclick", Ei, !0), window.removeEventListener("keydown", Pi, !0), To && Et()?.onChanged?.removeListener(To), To = null;
  },
  async loadShortcuts() {
    try {
      const e = await Et()?.local?.get(["siteShelfLinks", "logicweaverNavWheelShortcutsV1"]);
      if (!So) return;
      const t = e?.siteShelfLinks?.length ? e.siteShelfLinks : e?.logicweaverNavWheelShortcutsV1;
      ti = (Array.isArray(t) ? t : []).map((o, i) => ({
        id: String(o.id || `wheel-${i}`),
        title: String(o.title || o.url || d("navwheel.site")),
        desc: String(o.url || ""),
        url: String(o.url || ""),
        icon: ir(o)
      })), ie.mode === "shortcuts" && ht();
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
    return e ? ti.some((t) => t.url === e) : !1;
  },
  toggleEditingShortcuts: fs,
  handleLinkSelection: tr,
  removeShortcut: or,
  toggle(e = !1) {
    ie.isExpanded ? Ut() : e ? oo(xt.x, xt.y) : oo();
  },
  toggleTools(e = !0) {
    ie.isExpanded && ie.mode === "tools" ? Ut() : oo(
      e ? xt.x : ie.ballPosition.x,
      e ? xt.y : ie.ballPosition.y,
      "tools"
    );
  },
  setMode(e) {
    vn(e);
  }
};
class uo {
  constructor() {
    this.activeShortcuts = { ...Sn }, this.isListenerBound = !1, this.storageListenerBound = !1, this.shortcutReadVersion = 0, this.initShortcuts();
  }
  static getInstance() {
    return uo.instance || (uo.instance = new uo()), uo.instance;
  }
  getShortcuts() {
    return { ...this.activeShortcuts };
  }
  async setShortcut(t, o) {
    if (typeof t != "string" || !t || typeof o != "string")
      throw new Error("快捷键参数无效，未保存");
    if (typeof chrome > "u" || !chrome.storage?.local)
      throw new Error("快捷键存储不可用，未保存");
    const { optionsService: i, SHORTCUT_STORAGE_KEY: a } = await import("./options.service-iuvph8od.js").then((L) => L.g), g = (await chrome.storage.local.get(a))[a], f = { ...g || {}, [t]: o }, c = this.shortcutReadVersion, h = await i.saveSettings(
      { [a]: f },
      { [a]: g }
    );
    c === this.shortcutReadVersion && (++this.shortcutReadVersion, this.applyShortcutOverrides(h[a]));
  }
  applyShortcutOverrides(t) {
    const o = t && typeof t == "object" && !Array.isArray(t) ? Object.entries(t).filter((i) => Object.prototype.hasOwnProperty.call(Sn, i[0]) && typeof i[1] == "string") : [];
    this.activeShortcuts = { ...Sn, ...Object.fromEntries(o) };
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
    if (!t || !bi(t)) return !1;
    if (st(t))
      return Oe.handleToolClick(t), !0;
    switch (t) {
      case "bookmarks":
        return wn.toggle(), !0;
      case "settings":
        return bn.open(), !0;
      case "nav-wheel":
        return Ye.toggle(!0), !0;
      case "toolbox":
        return Ye.toggleTools(!0), !0;
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
        if (di.active || t.defaultPrevented || t.isComposing || t.repeat || t.target && (t.target.matches("input, textarea, select") || t.target.isContentEditable) && !t.altKey && !t.ctrlKey && !t.metaKey)
          return;
        const i = ua(t);
        if (!i) return;
        const a = i.toLowerCase();
        for (const [l, g] of Object.entries(this.activeShortcuts))
          if (!(!g || !bi(l)) && g.toLowerCase().replace(/^cmd\+/, "meta+") === a) {
            t.preventDefault(), t.stopPropagation(), this.triggerToolShortcut(l);
            break;
          }
      },
      !0
    ));
  }
}
const oi = uo.getInstance();
class po {
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
        } catch (i) {
          console.warn("[PageVisibility] callback error:", i);
        }
    });
  }
  static getInstance() {
    return po.instance || (po.instance = new po()), po.instance;
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
const sr = po.getInstance(), Wi = [
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
function tn(e) {
  return e === 0 ? { emoji: "☀️", label: d("weather.condition.clear") } : e <= 2 ? { emoji: "🌤️", label: d("weather.condition.mainlyClear") } : e === 3 ? { emoji: "☁️", label: d("weather.condition.cloudy") } : e === 45 || e === 48 ? { emoji: "🌫️", label: d("weather.condition.fog") } : e >= 51 && e <= 57 ? { emoji: "🌦️", label: d("weather.condition.drizzle") } : e >= 61 && e <= 67 ? { emoji: "🌧️", label: d("weather.condition.rain") } : e >= 71 && e <= 77 ? { emoji: "🌨️", label: d("weather.condition.snow") } : e >= 80 && e <= 82 ? { emoji: "🌧️", label: d("weather.condition.rainShower") } : e >= 85 && e <= 86 ? { emoji: "🌨️", label: d("weather.condition.snowShower") } : e >= 95 ? { emoji: "⛈️", label: d("weather.condition.thunderstorm") } : { emoji: "🌡️", label: d("weather.condition.unknown") };
}
class ho {
  constructor() {
    this.currentCity = "武汉", this.isRefreshing = !1, this.activeRequestId = 0, this.lastRawForecastData = null, this.initStorage();
  }
  static getInstance() {
    return ho.instance || (ho.instance = new ho()), ho.instance;
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
    const a = tn(i.current?.weather_code ?? 0), l = Math.round(i.current?.temperature_2m ?? 0), g = i.hourly?.time || [], f = Date.now();
    let c = g.findIndex((x) => new Date(x).getTime() >= f);
    c < 0 && (c = 0);
    const h = [];
    for (let x = c; x < Math.min(c + 5, g.length); x++) {
      const B = x === c ? d("weather.now") : d("weather.hourSuffix", { hour: new Date(g[x]).getHours() }), K = tn(i.hourly.weather_code[x]), U = Math.round(i.hourly.temperature_2m[x]);
      h.push({ time: B, emoji: K.emoji, temp: U });
    }
    let L = d("weather.noRain12h");
    for (let x = c; x < Math.min(c + 12, g.length); x++) {
      const B = i.hourly.weather_code[x], K = i.hourly.precipitation_probability?.[x] || 0;
      if (B >= 51 || K >= 60) {
        const U = new Date(g[x]).getHours(), k = B >= 71 && B <= 77 || B === 85 || B === 86 ? d("weather.snow") : d("weather.rain"), $ = K ? ` (${K}%)` : "";
        L = d("weather.expectPrecip", { time: `${U}:00`, type: k, prob: $ });
        break;
      }
    }
    const F = [d("weather.today"), d("weather.tomorrow"), d("weather.afterTomorrow")], m = [], D = i.daily?.time?.length || 0;
    for (let x = 1; x < Math.min(3, D); x++) {
      const B = F[x] || d("weather.plusDays", { count: x }), K = tn(i.daily.weather_code[x]), U = `${Math.round(i.daily.temperature_2m_max[x])}°/${Math.round(i.daily.temperature_2m_min[x])}°`;
      m.push({ label: B, emoji: K.emoji, tempRange: U });
    }
    const v = Math.round(i.daily?.temperature_2m_max?.[0] ?? l), w = Math.round(i.daily?.temperature_2m_min?.[0] ?? l), T = d("weather.tempRange", { cond: a.label, max: v, min: w }), y = {
      cityName: o.name || t,
      currentEmoji: a.emoji,
      currentTemp: l,
      subText: T,
      rainText: L,
      hours: h,
      days: m
    };
    if (ut.ready(y, t), i.daily?.time) {
      const x = [
        d("weather.weekday.sun"),
        d("weather.weekday.mon"),
        d("weather.weekday.tue"),
        d("weather.weekday.wed"),
        d("weather.weekday.thu"),
        d("weather.weekday.fri"),
        d("weather.weekday.sat")
      ], B = [];
      for (let K = 0; K < i.daily.time.length; K++) {
        const U = new Date(i.daily.time[K]), M = K === 0 ? d("weather.today") : K === 1 ? d("weather.tomorrow") : K === 2 ? d("weather.afterTomorrow") : x[U.getDay()], k = tn(i.daily.weather_code[K]);
        B.push({
          date: `${U.getMonth() + 1}/${U.getDate()}`,
          dayName: M,
          emoji: k.emoji,
          condition: k.label,
          highTemp: Math.round(i.daily.temperature_2m_max[K]),
          lowTemp: Math.round(i.daily.temperature_2m_min[K]),
          rainProb: i.daily.precipitation_probability_max?.[K] || 0
        });
      }
      ut.setForecastDays(B);
    }
    const _ = {
      humidity: i.current?.relative_humidity_2m ? `${i.current.relative_humidity_2m}%` : "60%",
      wind: i.current?.wind_speed_10m ? `${Math.round(i.current.wind_speed_10m)} km/h` : d("weather.detail.windLight"),
      uvIndex: d("weather.detail.uvNormal"),
      airQuality: d("weather.detail.airGood")
    };
    ut.setDetailInfo(_);
  }
  filterCities(t, o = 8) {
    const i = t.trim().toLowerCase();
    if (!i) return Wi.slice(0, o);
    const a = [];
    for (const l of Wi) {
      const g = l.name.toLowerCase(), f = l.pinyin.toLowerCase(), c = l.admin.toLowerCase();
      if ((g.startsWith(i) || f.startsWith(i) || g.includes(i) || f.includes(i) || c.includes(i)) && a.push(l), a.length >= o) break;
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
    const i = ++this.activeRequestId;
    ut.loading(o);
    try {
      const a = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(o)}&count=1&language=zh&format=json`, l = await fetch(a);
      if (i !== this.activeRequestId || J.state === "unconfigured") {
        this.isRefreshing = !1;
        return;
      }
      const f = (await l.json()).results?.[0];
      if (!f) {
        i === this.activeRequestId && J.state !== "unconfigured" && ut.notFound(o), this.isRefreshing = !1;
        return;
      }
      const c = `https://api.open-meteo.com/v1/forecast?latitude=${f.latitude}&longitude=${f.longitude}&current=temperature_2m,weather_code,relative_humidity_2m,wind_speed_10m&hourly=temperature_2m,weather_code,precipitation_probability&daily=temperature_2m_max,temperature_2m_min,weather_code,precipitation_probability_max&forecast_days=7&timezone=auto`, h = await fetch(c);
      if (i !== this.activeRequestId || J.state === "unconfigured") {
        this.isRefreshing = !1;
        return;
      }
      const L = await h.json();
      this.lastRawForecastData = { city: o, loc: f, d: L }, i === this.activeRequestId && J.state !== "unconfigured" && this.applyForecastPayload(o, f, L);
    } catch (a) {
      i === this.activeRequestId && J.state !== "unconfigured" && ut.error(a?.message || "天气加载失败，右键此处可重新选择地点。", o);
    } finally {
      i === this.activeRequestId && (this.isRefreshing = !1);
    }
  }
}
const no = ho.getInstance();
function ar(e, t) {
  window.LogicWeaverIntro = wt, window.LogicWeaverStartupIntro = wt, window.LogicWeaverNotifications = Le, window.LogicWeaverWindowManager = Oe, window.LogicWeaverWindowTabs = Oe, window.LogicWeaverDomFreezer = pa, window.LogicWeaverWallpaperService = hn, window.LogicWeaverLauncherService = Ae, window.LogicWeaverLauncherRuntime = Xn, window.LogicWeaverProfileService = Si;
  try {
    Si.init();
  } catch (o) {
    console.error("[ProfileService] init failed:", o);
  }
  window.LogicWeaverBookmarksService = ai, window.LogicWeaverCalendarService = na, window.LogicWeaverWeather = ut, window.LogicWeaverWeatherService = no, window.LogicWeaverClock = co, window.LogicWeaverSearch = Zs, window.LogicWeaverSearchService = Qs, Object.defineProperty(window, "LogicWeaverAiHotService", {
    configurable: !0,
    get: () => {
      import("./aihot.service-DHdofX6S.js").then(({ aiHotService: o }) => {
        window.LogicWeaverAiHotService = o;
      });
    }
  }), window.LogicWeaverHomeMusic = Qe, window.LogicWeaverLauncherGroups = ze, window.LogicWeaverProfileMenu = Fo, window.LogicWeaverWorkspaceLaunchers = hi, window.LogicWeaverMacDock = Lt, window.LogicWeaverFullscreen = Gt, window.enterFullscreenCard = (o) => Gt.enter(o), window.exitFullscreenCard = () => Gt.exit(), window.cycleFullscreenCard = () => Gt.cycle(), window.LogicWeaverPageVisibility = sr, window.LogicWeaverBackgroundLibrary = Ci, window.LogicWeaverNotificationCenter = Pt, window.LogicWeaverBookmarkMenu = ri, window.LogicWeaverBookmarkPanel = wn, window.LogicWeaverBookmarkFolderStrip = fn, window.LogicWeaverLauncherDialogs = qi, window.LogicWeaverLauncherFolder = Ji, window.LogicWeaverLauncherMenus = ci, window.LogicWeaverSettings = bn, window.LogicWeaverClockSettings = Vt, window.LogicWeaverBiliTheater = Po, window.LogicWeaverBilibiliService = vi, window.getBiliJct = () => vi.getBiliJct(), window.LogicWeaverBiliMiniPlayer = qn, window.openBiliMiniPlayer = (o) => qn.openVideo(o), window.LogicWeaverAiDialog = fi, window.LogicWeaverAihotViewer = ui, window.LogicWeaverNavWheel = Ee, window.openNavWheel = (o, i) => Ye.open(o, i), window.closeNavWheel = () => Ye.close(), window.toggleNavWheel = (o) => Ye.toggle(o), window.toggleToolWheel = (o) => Ye.toggleTools(o), window.setNavWheelMode = (o) => Ye.setMode(o), window.LogicWeaverShortcuts = oi, window.triggerToolShortcut = (o) => oi.triggerToolShortcut(o), window.LogicWeaverCommands = e, window.LogicWeaverFeatures = t, window.LogicWeaverCalendarView = ia, window.LogicWeaverGitHubStatus = li, window.LogicWeaverGitHubFolders = ao, window.LogicWeaverGitHubHero = Ao, window.LogicWeaverGitHubRepositories = At, window.LogicWeaverGitHubBatchBar = Eo, window.LogicWeaverTodoistLabels = sa, window.LogicWeaverTodoistWorkspace = aa, window.LogicWeaverTodoistCalendarSidebar = ra, window.LogicWeaverTodoistTaskList = la, window.LogicWeaverBiliMessagePanel = zt, window.LogicWeaverStickerBoard = ma, window.LogicWeaverStickersService = va, window.LogicWeaverPricing = ts, window.LogicWeaverBiliFavorites = Qi, window.LogicWeaverBiliRadioTape = ka, window.LogicWeaverBiliOrganizerDialogs = ya, window.LogicWeaverBiliUpGroupManager = wa, window.LogicWeaverBiliUpPreview = un, window.LogicWeaverYouTube = os, window.LogicWeaverAihotFeed = es, window.LogicWeaverGitHubTrending = ds, window.LogicWeaverCalendarWorkspace = lo, window.LogicWeaverCalendar = lo, window.LogicWeaverTodoistMainWorkspace = ca, window.LogicWeaverTodoistTaskDetail = Ga, window.openBiliTheater = (o) => Po.openVideo(o), window.closeBiliTheater = () => Po.close(), window.showWindowsToast = (o) => {
    if (!o) return null;
    const i = $n(o.target) || yi(o.url) || (o.appType === "bili" ? Hs([o.title, o.subtitle, o.message].filter((a) => typeof a == "string").join(" ")) : void 0);
    return Le.show({
      ...o,
      target: i,
      onClick: () => {
        if (typeof o?.onClick == "function") return o.onClick();
        if (i) return Pt.openTarget(i);
        if (o?.url) {
          window.open(o.url, "_blank");
          return;
        }
      }
    });
  }, window.showToast = (o, i = !1, a = 3200) => window.showWindowsToast({
    appName: "系统提醒",
    icon: i ? "assets/error.svg" : "assets/logo.png",
    title: i ? "操作提醒" : "系统提醒",
    subtitle: o,
    duration: a
  }), window.showBiliToast = (o, i = 3200, a = {}) => {
    const l = typeof i == "object" && i ? i : a, g = typeof i == "number" ? i : 3200, f = l.isError || /失败|错误|异常|未获取|未找到/i.test(o), c = l.title || (f ? "B站操作未完成" : "哔哩哔哩"), h = l.subtitle || (o.length > 36 ? "" : o), L = l.message || (l.subtitle || o.length > 36 ? o : ""), F = {
      id: l.id || `bili_toast_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      appType: "bili",
      appName: "哔哩哔哩",
      icon: "assets/bilibili.svg",
      title: c,
      subtitle: h || o,
      message: L && L !== h ? L : "",
      showActions: !!(l.showActions || l.actionLabel),
      actionLabel: l.actionLabel || "",
      onClick: l.onClick || null,
      target: $n(l.target) || yi(l.url) || $n({ type: "bili-video", bvid: l.bvid, aid: l.aid ? String(l.aid) : void 0 }),
      url: l.url,
      duration: Math.max(3e3, g)
    };
    return window.showWindowsToast(F);
  }, window.showFetchToast = (o, i, a = "", l = "assets/logo.png", g = 3200) => window.showWindowsToast({
    appName: o,
    title: i,
    subtitle: a,
    icon: l || "assets/logo.png",
    duration: g,
    showActions: !1,
    actionLabel: "",
    appType: "fetch"
  }), window.LogicWeaverKineticDrag = xa, window.LogicWeaverMarkdownAst = La, window.setLauncherBackground = (o) => hn.setWallpaper(o), window.backgroundDbClear = (o) => Ks(o), window.openBackgroundHistory = () => Ci.openDialog();
}
const je = $e({
  isOpen: !1,
  query: "",
  selectedIndex: 0
});
let on = null;
const gs = {
  get state() {
    return je;
  },
  open() {
    je.isOpen || (je.isOpen = !0, je.query = "", je.selectedIndex = 0, on = Oe.pushModalCloser(() => (this.close(), !0)));
  },
  close() {
    je.isOpen && (je.isOpen = !1, je.query = "", je.selectedIndex = 0, on && (on(), on = null));
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
      await kn.execute(e.id, void 0, "command-palette");
    } catch (t) {
      console.warn(`[CommandPalette] Failed to execute ${e.id}:`, t);
    }
  }
};
typeof window < "u" && window.addEventListener("keydown", (e) => {
  if (di.active || e.defaultPrevented || e.isComposing || e.repeat) return;
  const t = (e.key || "").toLowerCase(), o = (e.ctrlKey || e.metaKey) && t === "k", i = e.altKey && (e.code === "Space" || t === " ");
  (o || i) && (e.preventDefault(), e.stopPropagation(), gs.toggle());
}, !0);
function rr(e) {
  e.register({
    id: "palette.toggle",
    title: "打开全局命令中心 (Spotlight)",
    category: "界面",
    keywords: ["命令", "palette", "spotlight", "raycast", "搜索", "cmd"],
    concurrency: "drop",
    run: () => gs.toggle()
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
    enabled: () => lo.ready,
    run: () => lo.refresh()
  }), e.register({
    id: "calendar.today",
    title: "日历跳转到今天",
    category: "日历",
    keywords: ["今日", "today", "日期"],
    concurrency: "drop",
    enabled: () => lo.ready,
    run: () => lo.goToday()
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
}, cr = /* @__PURE__ */ ge({
  __name: "GuestPreviewBanner",
  setup(e) {
    function t() {
      zs.exit();
    }
    return (o, i) => (r(), fe(Ns, { name: "guest-banner-slide" }, {
      default: It(() => [
        s(js) ? (r(), p("aside", lr, [
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
        ])) : E("", !0)
      ]),
      _: 1
    }));
  }
}), dr = /* @__PURE__ */ We(cr, [["__scopeId", "data-v-a2f2ca5f"]]), ur = ["hidden"], pr = {
  key: 0,
  class: "bookmark-folder-strip-empty"
}, hr = ["title", "data-bookmark-folder-id", "onClick", "onContextmenu"], fr = /* @__PURE__ */ ge({
  __name: "BookmarkFolderStrip",
  setup(e) {
    const t = z(null);
    function o(l) {
      const g = t.value;
      !g || g.scrollWidth <= g.clientWidth || !l.deltaY || (l.preventDefault(), g.scrollLeft += l.deltaY);
    }
    function i(l) {
      fn.openFolder(l.id);
    }
    function a(l, g) {
      fn.openContextMenu(g, l.clientX, l.clientY);
    }
    return (l, g) => (r(), p("nav", {
      id: "bookmark-folder-strip",
      ref_key: "stripRef",
      ref: t,
      class: "bookmark-folder-strip",
      "aria-label": "书签栏文件夹",
      hidden: !s(ro).enabled,
      onWheel: o
    }, [
      s(ro).folders.length ? E("", !0) : (r(), p("span", pr, u(s(ro).emptyMessage || "书签栏没有文件夹"), 1)),
      (r(!0), p(ee, null, be(s(ro).folders, (f) => (r(), p("button", {
        key: f.id,
        class: "bookmark-folder-chip",
        type: "button",
        title: `打开书签文件夹：${f.title || "未命名"}`,
        "data-bookmark-folder-id": f.id,
        onClick: (c) => i(f),
        onContextmenu: G((c) => a(c, f), ["prevent"])
      }, [
        g[0] || (g[0] = n("span", { "aria-hidden": "true" }, "📁", -1)),
        n("span", null, u(f.title || "未命名"), 1)
      ], 40, hr))), 128))
    ], 40, ur));
  }
}), gr = /* @__PURE__ */ We(fr, [["__scopeId", "data-v-5e71cc7c"]]), mr = ["aria-label"], vr = { class: "cube-manager-body" }, yr = ["disabled", "onClick", "title"], wr = ["disabled", "onClick", "title"], br = ["onClick"], kr = ["onClick"], _r = ["onClick"], Cr = ["type", "placeholder"], xr = { type: "submit" }, Lr = {
  key: 0,
  role: "alert"
}, $r = /* @__PURE__ */ ge({
  __name: "CubeConfigDialog",
  setup(e) {
    const t = Fe.state, o = te(() => Fe.getActiveFaces()), i = te(() => t.registeredFaces.filter((D) => !t.activeFaceIds.includes(D.id))), a = z(""), l = z("memo"), g = te(() => [
      { value: "memo", label: d("cube.manager.typeMemo"), icon: "📝" },
      { value: "countdown", label: d("cube.manager.typeCountdown"), icon: "⏳" },
      { value: "link", label: d("cube.manager.typeLink"), icon: "🔗" }
    ]), f = z(""), c = z(!1), h = z(JSON.stringify({ title: "每日一句", icon: "📝", customType: "memo", customData: { text: "今天也要记得休息" } }, null, 2)), L = z("");
    function F(D) {
      L.value = "";
      try {
        D();
      } catch (v) {
        L.value = v instanceof Error ? v.message : "操作失败";
      }
    }
    function m() {
      F(() => {
        const D = c.value ? JSON.parse(h.value) : {
          title: a.value,
          customType: l.value,
          customData: { text: f.value, targetDate: f.value, url: f.value }
        };
        Fe.addCustomFace(D), a.value = "", f.value = "";
      });
    }
    return (D, v) => (r(), fe(bt, { to: "body" }, [
      s(t).isConfigDialogOpen ? (r(), p("section", {
        key: 0,
        class: "cube-manager",
        role: "dialog",
        "aria-label": s(d)("cube.manager.title"),
        onKeydown: v[8] || (v[8] = No(G((w) => s(Fe).closeConfigDialog(), ["stop"]), ["esc"]))
      }, [
        n("header", null, [
          n("strong", null, u(s(d)("cube.manager.title")), 1),
          n("button", {
            type: "button",
            "aria-label": "关闭",
            onClick: v[0] || (v[0] = (w) => s(Fe).closeConfigDialog())
          }, "×")
        ]),
        n("div", vr, [
          n("p", null, u(s(d)("cube.manager.desc")), 1),
          (r(!0), p(ee, null, be(o.value, (w, T) => (r(), p("div", {
            key: w.id,
            class: "cube-row"
          }, [
            n("span", null, u(w.icon) + " " + u(w.title), 1),
            n("button", {
              type: "button",
              disabled: T === 0,
              onClick: (y) => F(() => s(Fe).moveUp(w.id)),
              title: s(d)("cube.manager.moveUp")
            }, "↑", 8, yr),
            n("button", {
              type: "button",
              disabled: T === o.value.length - 1,
              onClick: (y) => F(() => s(Fe).moveDown(w.id)),
              title: s(d)("cube.manager.moveDown")
            }, "↓", 8, wr),
            n("button", {
              type: "button",
              onClick: (y) => F(() => s(Fe).removeCustomFace(w.id))
            }, u(s(d)("cube.manager.removeFace")), 9, br)
          ]))), 128)),
          (r(!0), p(ee, null, be(i.value, (w) => (r(), p("div", {
            key: w.id,
            class: "cube-row"
          }, [
            n("span", null, u(w.title) + u(s(d)("cube.manager.inactiveSuffix")), 1),
            n("button", {
              type: "button",
              onClick: (T) => F(() => s(Fe).toggleActive(w.id, !0))
            }, u(s(d)("cube.manager.add")), 9, kr),
            w.builtIn ? E("", !0) : (r(), p("button", {
              key: 0,
              type: "button",
              onClick: (T) => F(() => s(Fe).removeCustomFace(w.id))
            }, u(s(d)("cube.manager.delete")), 9, _r))
          ]))), 128)),
          n("h3", null, u(s(d)("cube.manager.addFace")), 1),
          n("label", null, [
            tt(n("input", {
              "onUpdate:modelValue": v[1] || (v[1] = (w) => c.value = w),
              type: "checkbox"
            }, null, 512), [
              [Os, c.value]
            ]),
            ot(" " + u(s(d)("cube.manager.pasteJson")), 1)
          ]),
          n("form", {
            onSubmit: G(m, ["prevent"])
          }, [
            c.value ? (r(), p(ee, { key: 1 }, [
              n("p", null, u(s(d)("cube.manager.securityNotice")), 1),
              tt(n("textarea", {
                "onUpdate:modelValue": v[6] || (v[6] = (w) => h.value = w),
                rows: "9",
                maxlength: "10000",
                "aria-label": "面的 JSON 配置",
                spellcheck: "false"
              }, null, 512), [
                [go, h.value]
              ])
            ], 64)) : (r(), p(ee, { key: 0 }, [
              n("label", null, [
                ot(u(s(d)("cube.manager.fieldTitle")), 1),
                tt(n("input", {
                  "onUpdate:modelValue": v[2] || (v[2] = (w) => a.value = w),
                  maxlength: "60",
                  required: ""
                }, null, 512), [
                  [go, a.value]
                ])
              ]),
              n("label", null, [
                ot(u(s(d)("cube.manager.fieldType")) + " ", 1),
                X(Vi, {
                  modelValue: l.value,
                  "onUpdate:modelValue": v[3] || (v[3] = (w) => l.value = w),
                  options: g.value,
                  size: "sm",
                  onChange: v[4] || (v[4] = (w) => l.value = w)
                }, null, 8, ["modelValue", "options"])
              ]),
              n("label", null, [
                ot(u(s(d)("cube.manager.fieldContent")), 1),
                tt(n("input", {
                  "onUpdate:modelValue": v[5] || (v[5] = (w) => f.value = w),
                  type: l.value === "countdown" ? "date" : "text",
                  placeholder: l.value === "link" ? "https://…" : s(d)("cube.manager.contentPlaceholderText"),
                  maxlength: "500",
                  required: ""
                }, null, 8, Cr), [
                  [Bs, f.value]
                ])
              ])
            ], 64)),
            n("button", xr, u(s(d)("cube.manager.submitAdd")), 1)
          ], 32),
          L.value ? (r(), p("p", Lr, u(L.value), 1)) : E("", !0)
        ]),
        n("footer", null, [
          n("button", {
            type: "button",
            onClick: v[7] || (v[7] = (w) => F(() => s(Fe).resetDefaults()))
          }, u(s(d)("cube.manager.resetDefault")), 1),
          n("small", null, u(s(d)("cube.manager.resetNotice")), 1)
        ])
      ], 40, mr)) : E("", !0)
    ]));
  }
}), Sr = /* @__PURE__ */ We($r, [["__scopeId", "data-v-8ab459ee"]]), Tr = ["data-face"], Ir = ["aria-label"], Mr = { class: "ms-top-side" }, Dr = ["title"], Ar = ["title"], Er = ["title"], Pr = {
  key: 0,
  class: "ms-top-meta"
}, Wr = {
  class: "ms-top-title",
  style: { color: "#10b981", "font-weight": "700" }
}, Rr = { class: "ms-top-artist" }, Nr = { class: "ms-top-meta" }, Or = ["title"], Br = ["title"], Fr = {
  key: 0,
  class: "ms-top-divider"
}, Hr = ["title"], Kr = { class: "ms-top-mini-progress" }, jr = { class: "ms-top-side" }, zr = ["title"], Gr = ["title"], Vr = ["aria-label"], Ur = ["title"], Yr = { class: "ms-cube-custom-icon" }, Xr = { class: "ms-cube-custom-title" }, qr = ["title"], Jr = {
  key: 1,
  class: "ms-cube-custom-text countdown"
}, Zr = ["href"], Qr = {
  class: "ms-cube-dots",
  "aria-hidden": "true"
}, el = ["title", "onClick"], tl = { class: "ms-cube-cm-header" }, ol = { class: "ms-cube-cm-list" }, nl = ["onClick"], il = { class: "ms-cube-cm-icon" }, sl = { class: "ms-cube-cm-title" }, al = {
  key: 0,
  class: "ms-cube-cm-check"
}, rl = /* @__PURE__ */ ge({
  __name: "TopInfoCube",
  props: {
    active: { type: Boolean, default: !0 }
  },
  setup(e) {
    const t = e, o = te(() => Ui.visible || gt.djModalOpen || gt.isActive && gt.isJoined), i = te(() => gt.isActive && gt.isJoined), a = te(() => Fe.getActiveFaces()), l = z("music"), g = z(0);
    let f = !1, c;
    Pe(
      () => a.value,
      (j) => {
        j.some((H) => H.id === l.value) || (l.value = j[0]?.id || "");
      },
      { immediate: !0 }
    );
    const h = te(() => a.value.filter((j) => !j.builtIn)), L = z(!1), F = z({ x: 0, y: 0 });
    Pe(() => t.active, (j) => {
      j || (L.value = !1, Fe.closeConfigDialog(), clearTimeout(c), f = !1);
    }, { immediate: !0 });
    const { menuRef: m, style: D } = pi({
      visible: () => L.value,
      anchor: () => F.value,
      dismiss: () => {
        L.value = !1;
      }
    });
    function v(j) {
      j.preventDefault(), j.stopPropagation(), F.value = { x: j.clientX, y: j.clientY }, L.value = !0;
    }
    function w(j) {
      N(j), L.value = !1;
    }
    function T() {
      L.value = !1, Fe.openConfigDialog();
    }
    function y() {
      L.value = !1, _(() => Fe.resetDefaults()), N("music");
    }
    function _(j) {
      L.value = !1;
      try {
        j();
      } catch (H) {
        Le.show({ appName: "滚动立方体", title: "保存失败", message: H instanceof Error ? H.message : "请检查浏览器存储" });
      }
    }
    function x(j) {
      if (!j) return d("cube.countdown.noTarget");
      const A = new Date(j).getTime() - $.value, oe = Math.ceil(A / (1e3 * 60 * 60 * 24));
      return oe > 0 ? d("cube.countdown.remaining", { days: oe }) : oe === 0 ? d("cube.countdown.today") : d("cube.countdown.passed", { days: Math.abs(oe) });
    }
    const B = te(() => !ne.title || ne.title === "点击播放" ? d("home.music.defaultTitle") : ne.title), K = te(() => !ne.artist || ne.artist === "作者" ? d("home.music.defaultArtist") : ne.artist), U = te(() => ne.isBiliRadio ? d("cube.source.biliRadio") : ne.isNetease ? d("cube.source.netease") : ne.playing ? d("cube.source.siren") : d("cube.source.idle")), M = te(() => ne.currentLyric ? ne.currentLyric : ne.playing ? d("cube.defaultPlayingLyric") : d("cube.defaultIdleLyric"));
    function k() {
      Oe.handleToolClick("music");
    }
    const $ = z(Date.now());
    let Z;
    Pe(() => t.active && a.value.some((j) => j.id === l.value && j.customType === "countdown"), (j) => {
      j && ($.value = Date.now()), clearInterval(Z), Z = j ? window.setInterval(() => {
        document.hidden || ($.value = Date.now());
      }, 6e4) : void 0;
    }, { immediate: !0 });
    function N(j, H = null) {
      const A = a.value, oe = A.find((ke) => ke.id === j) || A[0];
      if (oe) {
        if (Number.isFinite(H))
          g.value = H;
        else if (oe.id !== l.value) {
          const ke = A.findIndex((Ie) => Ie.id === l.value);
          let we = (A.findIndex((Ie) => Ie.id === oe.id) - ke + A.length) % A.length;
          we > A.length / 2 && (we -= A.length), g.value += we * 90;
        }
        l.value = oe.id;
      }
    }
    function V(j) {
      const H = a.value;
      if (H.length <= 1) return;
      const A = H.findIndex((we) => we.id === l.value), ke = ((A >= 0 ? A : 0) + j + H.length) % H.length, Se = H[ke];
      Se && N(Se.id, g.value + j * 90);
    }
    function O(j) {
      a.value.length <= 1 || j.altKey || Math.abs(j.deltaY) < 2 || (j.preventDefault(), !f && (f = !0, V(j.deltaY > 0 ? 1 : -1), c = setTimeout(() => {
        f = !1;
      }, 420)));
    }
    function q(j) {
      !["ArrowUp", "ArrowDown", "PageUp", "PageDown"].includes(j.key) || j.target?.closest?.("input") || (j.preventDefault(), V(["ArrowDown", "PageDown"].includes(j.key) ? 1 : -1));
    }
    function me(j, H) {
      return l.value === j ? {
        transform: `rotateX(${-g.value}deg) translateZ(22px)`,
        visibility: "visible"
      } : {
        transform: `rotateX(-${H}deg) translateZ(22px)`,
        visibility: "hidden"
      };
    }
    function _e(j) {
      const H = j.target;
      H && (H.tagName === "INPUT" || H.tagName === "TEXTAREA" || H.isContentEditable) || (j.preventDefault(), j.stopPropagation());
    }
    function Ge(j) {
      const H = j.target;
      H && (H.tagName === "INPUT" || H.tagName === "TEXTAREA" || H.isContentEditable) || j.preventDefault();
    }
    return Rt(() => {
      clearInterval(Z), clearTimeout(c);
    }), (j, H) => tt((r(), p("div", {
      class: "ms-top-player",
      "data-face": l.value,
      tabindex: "0",
      title: "滚动立方体 · 滚轮切换面板，右键可自由增删与排序",
      "aria-label": "滚动立方体",
      onWheel: O,
      onKeydown: q,
      onContextmenu: v,
      onCopy: _e,
      onSelectstart: Ge
    }, [
      a.value.length ? E("", !0) : (r(), p("button", {
        key: 0,
        type: "button",
        class: "ms-cube-cm-action",
        onClick: T
      }, "＋ 添加面（右键管理）")),
      n("div", {
        class: "ms-top-cube",
        style: xe({ transform: `translateZ(-22px) rotateX(${g.value}deg)` })
      }, [
        s(Fe).isActive("music") && l.value === "music" ? (r(), p("section", {
          key: 0,
          class: "ms-top-face ms-top-face-music",
          "aria-label": s(d)("cube.musicFaceAria"),
          style: xe(me("music", 0))
        }, [
          n("div", Mr, [
            n("button", {
              class: "ms-top-prev",
              title: s(d)("cube.prevTrack"),
              type: "button",
              onClick: H[0] || (H[0] = G((A) => s(Qe).prev(), ["stop"]))
            }, "⏮", 8, Dr),
            n("button", {
              class: "ms-top-play",
              title: s(d)("cube.playPause"),
              type: "button",
              onClick: H[1] || (H[1] = G((A) => s(Qe).togglePlay(), ["stop"]))
            }, u(s(ne).playing ? "⏸" : "▶"), 9, Ar)
          ]),
          n("button", {
            class: "ms-top-main",
            title: s(d)("cube.openMusicPicker"),
            type: "button",
            onClick: G(k, ["stop"])
          }, [
            o.value ? (r(), p("div", Pr, [
              n("span", Wr, " 🎧 " + u(i.value ? s(d)("cube.listeningTogether") : s(d)("cube.listening")) + "：" + u(B.value), 1),
              n("span", Rr, u(K.value), 1)
            ])) : (r(), p(ee, { key: 1 }, [
              n("div", Nr, [
                n("span", {
                  class: "ms-top-title",
                  title: B.value
                }, u(B.value), 9, Or),
                n("span", {
                  class: "ms-top-artist",
                  title: K.value
                }, u(K.value), 9, Br),
                n("span", {
                  class: pe(["ms-top-source", { idle: !s(ne).playing }])
                }, u(U.value), 3),
                M.value ? (r(), p("span", Fr)) : E("", !0)
              ]),
              M.value ? (r(), p("span", {
                key: 0,
                class: "ms-top-lyric",
                title: M.value
              }, u(M.value), 9, Hr)) : E("", !0)
            ], 64)),
            n("div", Kr, [
              n("div", {
                class: "ms-top-mini-fill",
                style: xe({ width: s(ne).progressPercent + "%" })
              }, null, 4)
            ])
          ], 8, Er),
          n("div", jr, [
            n("button", {
              class: "ms-top-next",
              title: s(d)("cube.nextTrack"),
              type: "button",
              onClick: H[2] || (H[2] = G((A) => s(Qe).next(), ["stop"]))
            }, "⏭", 8, zr),
            n("button", {
              class: "ms-top-open",
              title: s(d)("cube.openPlaylist"),
              type: "button",
              onClick: G(k, ["stop"])
            }, "🎵", 8, Gr)
          ])
        ], 12, Ir)) : E("", !0),
        (r(!0), p(ee, null, be(h.value, (A, oe) => (r(), p("section", {
          key: A.id,
          class: "ms-top-face ms-top-face-custom",
          "aria-label": A.title,
          style: xe(me(A.id, (oe + 1) * 90))
        }, [
          l.value === A.id ? (r(), p("div", {
            key: 0,
            class: "ms-cube-custom-body",
            title: A.desc
          }, [
            n("span", Yr, u(A.icon), 1),
            n("strong", Xr, u(A.title), 1),
            H[10] || (H[10] = n("span", { class: "ms-cube-divider" }, null, -1)),
            A.customType === "memo" ? (r(), p("span", {
              key: 0,
              class: "ms-cube-custom-text",
              title: A.customData?.text
            }, u(A.customData?.text || s(d)("cube.memo.clickToConfig")), 9, qr)) : A.customType === "countdown" ? (r(), p("span", Jr, u(x(A.customData?.targetDate)), 1)) : A.customType === "link" ? (r(), p("a", {
              key: 2,
              href: A.customData?.url,
              target: "_blank",
              rel: "noreferrer",
              class: "ms-cube-custom-link",
              onClick: H[3] || (H[3] = G(() => {
              }, ["stop"]))
            }, u(A.customData?.url) + " ↗ ", 9, Zr)) : E("", !0)
          ], 8, Ur)) : E("", !0),
          n("button", {
            type: "button",
            class: "ms-cube-config-trigger",
            title: "管理立方体面",
            onClick: H[4] || (H[4] = G((ke) => s(Fe).openConfigDialog(), ["stop"]))
          }, " ⚙ ")
        ], 12, Vr))), 128))
      ], 4),
      n("div", Qr, [
        (r(!0), p(ee, null, be(a.value, (A) => (r(), p("i", {
          key: A.id,
          class: pe({ on: l.value === A.id }),
          title: A.title,
          onClick: G((oe) => N(A.id), ["stop"])
        }, null, 10, el))), 128))
      ]),
      (r(), fe(bt, { to: "body" }, [
        t.active && L.value ? (r(), p("div", {
          key: 0,
          ref_key: "menuRef",
          ref: m,
          class: "ms-cube-context-menu",
          style: xe(s(D)),
          onClick: H[9] || (H[9] = G(() => {
          }, ["stop"]))
        }, [
          n("div", tl, [
            H[11] || (H[11] = n("span", null, "🎲 滚动立方体面", -1)),
            n("button", {
              type: "button",
              class: "ms-cube-cm-close",
              onClick: H[5] || (H[5] = (A) => L.value = !1)
            }, "×")
          ]),
          n("div", ol, [
            (r(!0), p(ee, null, be(a.value, (A) => (r(), p("button", {
              key: A.id,
              type: "button",
              class: pe(["ms-cube-cm-item", { active: l.value === A.id }]),
              onClick: (oe) => w(A.id)
            }, [
              n("span", il, u(A.icon), 1),
              n("span", sl, u(A.title), 1),
              l.value === A.id ? (r(), p("span", al, "✓")) : E("", !0)
            ], 10, nl))), 128))
          ]),
          H[16] || (H[16] = n("div", { class: "ms-cube-cm-divider" }, null, -1)),
          n("button", {
            type: "button",
            class: "ms-cube-cm-action",
            onClick: T
          }, [...H[12] || (H[12] = [
            n("span", null, "＋ 添加面 / 管理面", -1)
          ])]),
          n("button", {
            type: "button",
            class: "ms-cube-cm-action",
            onClick: H[6] || (H[6] = (A) => {
              V(-1), L.value = !1;
            })
          }, [...H[13] || (H[13] = [
            n("span", null, "⏮ 上一个面板", -1)
          ])]),
          n("button", {
            type: "button",
            class: "ms-cube-cm-action",
            onClick: H[7] || (H[7] = (A) => {
              V(1), L.value = !1;
            })
          }, [...H[14] || (H[14] = [
            n("span", null, "⏭ 下一个面板", -1)
          ])]),
          l.value ? (r(), p("button", {
            key: 0,
            type: "button",
            class: "ms-cube-cm-action danger",
            onClick: H[8] || (H[8] = (A) => _(() => s(Fe).removeCustomFace(l.value)))
          }, "删除当前面")) : E("", !0),
          n("button", {
            type: "button",
            class: "ms-cube-cm-action danger",
            onClick: y
          }, [...H[15] || (H[15] = [
            n("span", null, "↺ 恢复默认（仅音乐）", -1)
          ])])
        ], 4)) : E("", !0)
      ])),
      t.active ? (r(), fe(Sr, { key: 1 })) : E("", !0)
    ], 40, Tr)), [
      [mo, t.active]
    ]);
  }
}), ll = /* @__PURE__ */ We(rl, [["__scopeId", "data-v-591e9de8"]]), Do = $e({
  isOpen: !1
}), ms = {
  open() {
    Do.isOpen = !0;
  },
  close() {
    Do.isOpen = !1;
  },
  toggle() {
    Do.isOpen = !Do.isOpen;
  }
}, ni = Wt(Do);
function cl() {
  if (typeof chrome > "u" || !chrome.runtime?.onMessage) return () => {
  };
  let e = !1, t;
  const o = (i, a, l) => {
    a.id !== chrome.runtime.id || i?.type !== "TOGGLE_SIDE_DRAWER" || t === void 0 || i.targetTabId !== t || (ms.toggle(), l({ ok: !0 }));
  };
  return chrome.tabs.getCurrent().then((i) => {
    e || (t = i?.id, chrome.runtime.onMessage.addListener(o));
  }).catch(() => console.warn("[SideDrawer] Could not bind the home-page command.")), () => {
    e = !0, chrome.runtime.onMessage.removeListener(o);
  };
}
const dl = { class: "tb-brand" }, ul = ["title", "aria-expanded", "aria-label"], pl = ["src", "alt"], hl = ["hidden"], fl = ["title", "hidden"], gl = { id: "vue-bookmark-folder-strip-root" }, ml = { class: "tb-actions" }, vl = {
  id: "workspace-launchers",
  hidden: ""
}, yl = ["title", "aria-expanded"], wl = ["title"], bl = /* @__PURE__ */ ge({
  __name: "AppTopBar",
  setup(e) {
    const t = Y(() => import("./WorkspaceLaunchers-DNvzwbOC.js"));
    function o(c) {
      c.preventDefault(), c.stopPropagation();
      const h = typeof window < "u" ? window : null;
      h?.LogicWeaverWindowManager?.open ? h.LogicWeaverWindowManager.open("settings") : h?.LogicWeaverWindowTabs?.open ? h.LogicWeaverWindowTabs.open("settings") : bn.open();
    }
    function i(c) {
      c.preventDefault();
      const h = typeof window < "u" ? window : null;
      typeof h?.toggleBookmarkPanel == "function" ? h.toggleBookmarkPanel() : h?.LogicWeaverBookmarkPanel?.toggle ? h.LogicWeaverBookmarkPanel.toggle() : ai.toggleBookmarkPanel();
    }
    function a(c) {
      c.preventDefault(), Pt.toggle();
    }
    function l(c) {
      c.preventDefault(), Fo.open(c.clientX, c.clientY);
    }
    function g(c) {
      const h = c.target;
      h && (h.tagName === "INPUT" || h.tagName === "TEXTAREA" || h.isContentEditable) || (c.preventDefault(), c.stopPropagation());
    }
    function f(c) {
      const h = c.target;
      h && (h.tagName === "INPUT" || h.tagName === "TEXTAREA" || h.isContentEditable) || c.preventDefault();
    }
    return Xe(() => {
      Pt.start();
      const c = localStorage.getItem("theme") || "light";
      document.documentElement.dataset.theme = c, document.documentElement.setAttribute("data-theme", c);
    }), (c, h) => (r(), p("header", {
      class: pe(["topbar", { "bookmark-folders-mode": s(ro).enabled }]),
      onCopy: g,
      onSelectstart: f
    }, [
      n("div", dl, [
        n("button", {
          id: "bili-profile-button",
          class: "bili-profile-button",
          type: "button",
          title: s(d)("topbar.notifications"),
          "aria-controls": "notification-center",
          "aria-expanded": s(Yi).isOpen,
          "aria-label": s(Co) ? s(d)("topbar.notificationsUnread", { count: s(Co) }) : s(d)("topbar.notifications"),
          onClick: a,
          onContextmenu: h[0] || (h[0] = G((L) => l(L), ["prevent"]))
        }, [
          n("img", {
            id: "bili-profile-avatar",
            src: s(io).avatarUrl || "assets/bilibili.svg",
            alt: s(io).userName || s(d)("topbar.notifications")
          }, null, 8, pl),
          n("span", {
            id: "bili-profile-badge",
            class: "bili-profile-badge",
            hidden: s(Co) <= 0
          }, u(s(Co) > 99 ? "99+" : s(Co)), 9, hl)
        ], 40, ul),
        n("button", {
          id: "bookmark-handle",
          class: "bookmark-handle",
          type: "button",
          "aria-expanded": "false",
          title: s(d)("topbar.bookmarks"),
          hidden: s(ro).enabled,
          onClick: i
        }, [
          h[2] || (h[2] = n("span", { id: "bookmark-handle-icon" }, "📁", -1)),
          n("span", null, u(s(d)("topbar.bookmarks")), 1)
        ], 8, fl),
        n("div", gl, [
          X(gr)
        ])
      ]),
      X(ll, {
        active: !s(yt).activeId
      }, null, 8, ["active"]),
      n("div", ml, [
        h[3] || (h[3] = n("button", {
          id: "daily-toggle",
          class: "tb-pill",
          type: "button",
          hidden: "",
          title: "查看日报"
        }, "📰 日报", -1)),
        n("span", vl, [
          X(s(t))
        ]),
        n("button", {
          id: "side-drawer-toggle",
          class: pe(["tb-btn", { active: s(ni).isOpen }]),
          type: "button",
          title: s(d)("topbar.sidebar"),
          "aria-controls": "in-page-side-drawer",
          "aria-expanded": s(ni).isOpen,
          onClick: h[1] || (h[1] = (L) => s(ms).toggle())
        }, " 📑 ", 10, yl),
        n("button", {
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
}, Ll = { class: "wx-cur" }, $l = { class: "wx-emoji" }, Sl = { class: "wx-temp" }, Tl = { class: "wx-sub" }, Il = { class: "wx-rain" }, Ml = { class: "wx-hours" }, Dl = { class: "hh" }, Al = { class: "he" }, El = { class: "ht" }, Pl = { class: "wx-days" }, Wl = ["open"], Rl = { class: "weather-forecast-head" }, Nl = { class: "weather-forecast-city-info" }, Ol = { class: "weather-forecast-icon" }, Bl = { id: "weather-forecast-city-title" }, Fl = { class: "small muted" }, Hl = { class: "weather-forecast-actions" }, Kl = ["title"], jl = ["title"], zl = {
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
}, nc = {
  class: "weather-forecast-list",
  id: "weather-forecast-days-list"
}, ic = { class: "day-date-col" }, sc = { class: "day-name" }, ac = { class: "day-date small muted" }, rc = { class: "day-weather-col" }, lc = { class: "day-emoji" }, cc = { class: "day-cond" }, dc = { class: "day-rain-col" }, uc = {
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
}, Ac = { key: 1 }, Ec = { class: "weather-section-subtitle" }, Pc = { class: "weather-quick-chips-grid" }, Wc = ["onClick"], Rc = /* @__PURE__ */ ge({
  __name: "WeatherWidget",
  setup(e) {
    const t = z(!1), o = z({ x: 0, y: 0 }), i = z(""), a = z(null), l = z(null), g = ["深圳", "武汉", "北京", "上海", "广州", "成都", "杭州", "南京", "西安", "重庆", "苏州", "天津"], f = te(() => {
      const y = i.value.trim();
      return y ? no.filterCities(y, 6) : [];
    });
    function c(y) {
      const K = y?.clientX ?? window.innerWidth / 2 - 140, U = y?.clientY ?? window.innerHeight / 2 - 320 / 2, M = Math.max(12, Math.min(window.innerWidth - 280 - 12, K)), k = Math.max(12, Math.min(window.innerHeight - 320 - 12, U));
      o.value = { x: M, y: k }, t.value = !0, i.value = "", Tt(() => {
        l.value?.focus();
      });
    }
    function h() {
      t.value = !1, i.value = "";
    }
    async function L(y) {
      const _ = y.trim();
      _ && (h(), await no.changeCity(_));
    }
    function F() {
      const y = i.value.trim();
      y && L(y);
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
        no.loadWeather();
      }), ut.setChangeLocationAction((y) => {
        c(y);
      }), no.loadWeather(), Pe(mt, () => {
        no.reformatCurrentWeather();
      }), window.addEventListener("pointerdown", m, !0), window.addEventListener("keydown", D, !0);
    }), Rt(() => {
      window.removeEventListener("pointerdown", m, !0), window.removeEventListener("keydown", D, !0);
    });
    function v(y) {
      y.preventDefault(), c(y);
    }
    function w() {
      ut.closeForecastModal();
    }
    function T(y) {
      y.target?.id === "weather-forecast-dialog" && w();
    }
    return (y, _) => (r(), p("div", {
      class: "weather-widget-container",
      onContextmenu: v
    }, [
      s(J).state === "unconfigured" ? (r(), p("p", kl, u(s(d)("weather.noCitySet")), 1)) : s(J).state === "loading" ? (r(), p("p", _l, u(s(d)("common.loading")), 1)) : s(J).state === "not_found" ? (r(), p("p", Cl, u(s(d)("weather.cityNotFound", { city: s(J).city })), 1)) : s(J).state === "error" ? (r(), p("p", xl, u(s(J).errorMessage || s(d)("weather.loadFailed")), 1)) : s(J).state === "ready" && s(J).data ? (r(), p(ee, { key: 4 }, [
        n("div", Ll, [
          n("span", $l, u(s(J).data.currentEmoji), 1),
          n("span", Sl, u(s(J).data.currentTemp) + "°", 1)
        ]),
        n("p", Tl, u(s(J).data.subText), 1),
        n("p", Il, u(s(J).data.rainText), 1),
        n("div", Ml, [
          (r(!0), p(ee, null, be(s(J).data.hours, (x, B) => (r(), p("div", {
            key: B,
            class: "wx-h"
          }, [
            n("span", Dl, u(x.time), 1),
            n("span", Al, u(x.emoji), 1),
            n("span", El, u(x.temp) + "°", 1)
          ]))), 128))
        ]),
        n("div", Pl, [
          (r(!0), p(ee, null, be(s(J).data.days, (x, B) => (r(), p("span", { key: B }, u(x.label) + " " + u(x.emoji) + " " + u(x.tempRange), 1))), 128))
        ])
      ], 64)) : E("", !0),
      n("dialog", {
        id: "weather-forecast-dialog",
        class: "weather-forecast-dialog",
        open: s(J).forecastModalOpen,
        onClick: T
      }, [
        n("div", {
          class: "weather-forecast-shell",
          onClick: _[1] || (_[1] = G(() => {
          }, ["stop"]))
        }, [
          n("header", Rl, [
            n("div", Nl, [
              n("span", Ol, u(s(J).data?.currentEmoji || "🌤️"), 1),
              n("div", null, [
                n("h3", Bl, u(s(J).city || s(J).data?.cityName || s(d)("weather.forecastTitle")), 1),
                n("p", Fl, u(s(J).data?.subText || s(d)("weather.forecastSub")), 1)
              ])
            ]),
            n("div", Hl, [
              n("button", {
                id: "weather-forecast-refresh-btn",
                type: "button",
                class: "weather-forecast-btn",
                title: s(d)("weather.refreshTitle"),
                onClick: _[0] || (_[0] = (x) => s(ut).refresh())
              }, u(s(d)("weather.refresh")), 9, Kl),
              n("button", {
                id: "weather-forecast-close-btn",
                type: "button",
                class: "weather-forecast-close",
                title: s(d)("common.close"),
                onClick: w
              }, " ✕ ", 8, jl)
            ])
          ]),
          s(J).detailInfo ? (r(), p("div", zl, [
            n("div", Gl, [
              n("span", Vl, u(s(d)("weather.metric.humidity")), 1),
              n("span", Ul, u(s(J).detailInfo.humidity || "50%"), 1)
            ]),
            n("div", Yl, [
              n("span", Xl, u(s(d)("weather.metric.wind")), 1),
              n("span", ql, u(s(J).detailInfo.wind || (s(mt) === "en" ? "Breeze" : "微风")), 1)
            ]),
            n("div", Jl, [
              n("span", Zl, u(s(d)("weather.metric.uv")), 1),
              n("span", Ql, u(s(J).detailInfo.uvIndex || (s(mt) === "en" ? "Moderate" : "中等")), 1)
            ]),
            n("div", ec, [
              n("span", tc, u(s(d)("weather.metric.aqi")), 1),
              n("span", oc, u(s(J).detailInfo.airQuality || (s(mt) === "en" ? "Good" : "良")), 1)
            ])
          ])) : E("", !0),
          n("div", nc, [
            (r(!0), p(ee, null, be(s(J).forecastDays, (x, B) => (r(), p("div", {
              key: B,
              class: "weather-forecast-day-row forecast-day-item"
            }, [
              n("div", ic, [
                n("span", sc, u(x.dayName), 1),
                n("span", ac, u(x.date), 1)
              ]),
              n("div", rc, [
                n("span", lc, u(x.emoji), 1),
                n("span", cc, u(x.condition), 1)
              ]),
              n("div", dc, [
                x.rainProb > 0 ? (r(), p("span", uc, "☂️ " + u(x.rainProb) + "%", 1)) : (r(), p("span", pc, u(s(d)("weather.metric.noRain")), 1))
              ]),
              n("div", hc, [
                n("span", fc, u(x.lowTemp) + "°", 1),
                n("div", gc, [
                  n("div", {
                    class: "temp-range-fill",
                    style: xe({
                      left: `${Math.max(0, Math.min(100, (x.lowTemp + 10) * 2))}%`,
                      width: `${Math.max(20, Math.min(80, (x.highTemp - x.lowTemp) * 6))}%`
                    })
                  }, null, 4)
                ]),
                n("span", mc, u(x.highTemp) + "°", 1)
              ])
            ]))), 128))
          ])
        ])
      ], 8, Wl),
      (r(), fe(bt, { to: "body" }, [
        t.value ? (r(), p("div", {
          key: 0,
          ref_key: "contextMenuRef",
          ref: a,
          class: "weather-location-context-menu",
          style: xe({ left: `${o.value.x}px`, top: `${o.value.y}px` }),
          onClick: _[4] || (_[4] = G(() => {
          }, ["stop"])),
          onContextmenu: _[5] || (_[5] = G(() => {
          }, ["prevent"]))
        }, [
          n("div", vc, [
            n("div", yc, [
              n("span", wc, u(s(d)("weather.menu.changeLocation")), 1),
              n("span", {
                class: "weather-location-curr-badge",
                title: s(J).city
              }, [
                _[6] || (_[6] = n("span", { class: "weather-curr-dot" }, null, -1)),
                ot(" " + u(s(J).city || s(d)("weather.menu.unset")), 1)
              ], 8, bc)
            ])
          ]),
          n("form", {
            class: "weather-location-form",
            onSubmit: G(F, ["prevent"])
          }, [
            n("div", kc, [
              _[7] || (_[7] = n("span", { class: "weather-input-icon" }, "🔍", -1)),
              tt(n("input", {
                ref_key: "inputRef",
                ref: l,
                class: "weather-location-input",
                placeholder: s(d)("weather.menu.inputPlaceholder"),
                "onUpdate:modelValue": _[2] || (_[2] = (x) => i.value = x),
                onKeydown: No(G(F, ["prevent"]), ["enter"]),
                autocomplete: "off"
              }, null, 40, _c), [
                [go, i.value]
              ]),
              i.value ? (r(), p("button", {
                key: 0,
                type: "button",
                class: "weather-input-clear",
                onClick: _[3] || (_[3] = (x) => i.value = ""),
                title: s(d)("weather.menu.clearInput")
              }, "✕", 8, Cc)) : E("", !0)
            ]),
            n("button", xc, u(s(d)("weather.menu.submit")), 1)
          ], 32),
          i.value.trim() ? (r(), p("div", Lc, [
            n("div", $c, u(s(d)("weather.menu.suggestions")), 1),
            f.value.length ? (r(), p("div", Sc, [
              (r(!0), p(ee, null, be(f.value, (x) => (r(), p("button", {
                key: x.name + x.admin,
                type: "button",
                class: "weather-suggestion-item",
                onClick: (B) => L(x.name)
              }, [
                n("span", Ic, u(x.name), 1),
                n("span", Mc, u(x.admin), 1)
              ], 8, Tc))), 128))
            ])) : (r(), p("div", Dc, u(s(d)("weather.menu.emptySuggestion")), 1))
          ])) : (r(), p("div", Ac, [
            n("div", Ec, u(s(d)("weather.menu.commonCities")), 1),
            n("div", Pc, [
              (r(), p(ee, null, be(g, (x) => n("button", {
                key: x,
                type: "button",
                class: pe(["weather-quick-chip", { active: s(J).city === x }]),
                onClick: (B) => L(x)
              }, u(x), 11, Wc)), 64))
            ])
          ]))
        ], 36)) : E("", !0)
      ]))
    ], 32));
  }
}), vs = /* @__PURE__ */ We(Rc, [["__scopeId", "data-v-5aae12b5"]]), ii = "heroCustomMottoV1";
function Nc() {
  try {
    if (typeof localStorage < "u") {
      const e = localStorage.getItem(ii);
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
const eo = Nc(), Q = $e({
  loaded: !1,
  customText: eo.customText,
  history: eo.history,
  currentIndex: eo.customText && eo.history.length ? eo.history.findIndex((e) => e.text === eo.customText) : -1,
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
  const t = (a) => String(a).padStart(2, "0"), o = `${e.getFullYear()}-${t(e.getMonth() + 1)}-${t(e.getDate())}`, i = `${t(e.getHours())}:${t(e.getMinutes())}`;
  return { date: o, time: i };
}
const ct = {
  async init() {
    try {
      const e = await Oc(ii);
      if (e && typeof e == "object") {
        const t = Array.isArray(e.history) ? e.history : [];
        t.length >= Q.history.length && (Q.history = t, e.customText !== void 0 && (Q.customText = e.customText));
      }
    } catch (e) {
      console.warn("[HeroMotto] Sync chrome.storage failed:", e);
    } finally {
      Q.loaded = !0, Q.customText && Q.history.length && (Q.currentIndex = Q.history.findIndex(
        (e) => e.text === Q.customText
      ));
    }
  },
  async persist() {
    const e = {
      customText: Q.customText,
      history: Q.history
    };
    await Bc(ii, e);
  },
  setCustomMotto(e) {
    const t = e.trim();
    if (!t) {
      this.resetToSystem();
      return;
    }
    const { date: o, time: i } = Fc(/* @__PURE__ */ new Date());
    Q.customText = t;
    const a = Q.history.findIndex((l) => l.text === t);
    if (a !== -1) {
      const l = Q.history.splice(a, 1)[0];
      l.date = o, l.time = i, Q.history.unshift(l);
    } else
      Q.history.unshift({
        id: `motto_${Date.now()}`,
        date: o,
        time: i,
        text: t,
        createdAt: Date.now()
      });
    Q.history.length > 50 && (Q.history = Q.history.slice(0, 50)), Q.currentIndex = 0, this.persist();
  },
  selectHistory(e) {
    Q.customText = e.text, Q.currentIndex = Q.history.findIndex((t) => t.id === e.id), this.closeMenu(), this.persist();
  },
  resetToSystem() {
    Q.customText = null, Q.currentIndex = -1, this.closeMenu(), this.persist();
  },
  deleteEntry(e) {
    const t = Q.history.findIndex((o) => o.id === e);
    t !== -1 && (Q.history.splice(t, 1), Q.currentIndex === t && (Q.history.length > 0 ? this.selectHistory(Q.history[0]) : this.resetToSystem()), this.persist());
  },
  clearHistory() {
    Q.history = [], this.resetToSystem();
  },
  stepHistory(e) {
    if (!Q.history.length) return;
    let t = Q.currentIndex + e;
    if (t < 0) {
      this.resetToSystem();
      return;
    }
    t >= Q.history.length && (t = 0), this.selectHistory(Q.history[t]);
  },
  openMenu(e, t) {
    Q.menuPos = { x: e, y: t }, Q.menuOpen = !0;
  },
  closeMenu() {
    Q.menuOpen = !1;
  }
}, Hc = ["title"], Kc = ["placeholder"], jc = { class: "motto-content" }, zc = ["title"], Gc = { class: "motto-menu-header" }, Vc = { class: "dim" }, Uc = { class: "motto-history-label" }, Yc = { class: "motto-history-list" }, Xc = {
  key: 0,
  class: "motto-history-empty dim"
}, qc = ["onClick"], Jc = { class: "motto-item-date" }, Zc = ["title"], Qc = ["title", "onClick"], ed = /* @__PURE__ */ ge({
  __name: "HeroMotto",
  setup(e) {
    const t = z(!1), o = z(""), i = z(null), a = {
      夜深了: "clock.greeting.lateNight",
      早上好: "clock.greeting.morning",
      上午好: "clock.greeting.forenoon",
      中午好: "clock.greeting.noon",
      下午好: "clock.greeting.afternoon",
      晚上好: "clock.greeting.evening",
      你好: "clock.greeting.hello"
    };
    function l(v) {
      const w = a[v];
      return w ? d(w) : v;
    }
    const g = te(() => Q.customText ? l(Q.customText) : Te.greetingText);
    function f() {
      ct.closeMenu(), o.value = Q.customText || Te.greetingText, t.value = !0, Tt(() => {
        i.value?.focus(), i.value?.select();
      });
    }
    function c() {
      if (!t.value) return;
      t.value = !1;
      const v = o.value.trim();
      ct.setCustomMotto(v), v && Le.fetch(d("motto.appName"), d("motto.updated", { text: v }));
    }
    function h() {
      t.value = !1;
    }
    function L(v) {
      v.key === "Enter" ? (v.preventDefault(), c()) : v.key === "Escape" && (v.preventDefault(), h());
    }
    function F(v) {
      t.value || (v.preventDefault(), v.stopPropagation(), ct.stepHistory(v.deltaY > 0 ? 1 : -1));
    }
    function m(v) {
      v.preventDefault(), v.stopPropagation(), ct.openMenu(v.clientX, v.clientY);
    }
    function D(v) {
      Q.menuOpen && (v.target.closest(".motto-context-menu") || ct.closeMenu());
    }
    return Xe(() => {
      ct.init(), window.addEventListener("click", D);
    }), Rt(() => {
      window.removeEventListener("click", D);
    }), (v, w) => (r(), p(ee, null, [
      n("div", {
        class: "hero-motto-wrapper",
        title: s(d)("motto.hint"),
        onWheel: F,
        onContextmenu: m
      }, [
        t.value ? tt((r(), p("input", {
          key: 0,
          ref_key: "mottoInputRef",
          ref: i,
          "onUpdate:modelValue": w[0] || (w[0] = (T) => o.value = T),
          class: "hero-motto-input",
          type: "text",
          placeholder: s(d)("motto.placeholder"),
          maxlength: "60",
          onBlur: c,
          onKeydown: L
        }, null, 40, Kc)), [
          [go, o.value]
        ]) : (r(), p("p", {
          key: 1,
          id: "greeting",
          class: "hero-motto-text",
          style: xe({ color: s(Te).greetColor }),
          onClick: f
        }, [
          n("span", jc, u(g.value), 1),
          s(Q).history.length > 1 ? (r(), p("span", {
            key: 0,
            class: "motto-scroll-hint",
            title: s(d)("motto.scrollHint")
          }, "⇕", 8, zc)) : E("", !0)
        ], 4))
      ], 40, Hc),
      (r(), fe(bt, { to: "body" }, [
        s(Q).menuOpen ? (r(), p("div", {
          key: 0,
          class: "motto-context-menu",
          style: xe({ left: `${s(Q).menuPos.x}px`, top: `${s(Q).menuPos.y}px` }),
          onClick: w[3] || (w[3] = G(() => {
          }, ["stop"])),
          onContextmenu: w[4] || (w[4] = G(() => {
          }, ["prevent"]))
        }, [
          n("div", Gc, [
            n("span", null, u(s(d)("motto.customTitle")), 1),
            n("small", Vc, u(s(d)("motto.recordsCount", { count: s(Q).history.length })), 1)
          ]),
          n("button", {
            type: "button",
            class: "motto-menu-action",
            onClick: f
          }, [
            w[5] || (w[5] = n("i", null, "✎", -1)),
            n("span", null, u(s(d)("motto.editCurrent")), 1)
          ]),
          w[8] || (w[8] = n("div", { class: "motto-menu-divider" }, null, -1)),
          n("div", Uc, u(s(d)("motto.historyLabel")), 1),
          n("div", Yc, [
            s(Q).history.length ? (r(!0), p(ee, { key: 1 }, be(s(Q).history, (T) => (r(), p("div", {
              key: T.id,
              class: pe(["motto-history-item", { active: s(Q).customText === T.text }]),
              onClick: (y) => s(ct).selectHistory(T)
            }, [
              n("span", Jc, u(T.date), 1),
              n("span", {
                class: "motto-item-text",
                title: l(T.text)
              }, u(l(T.text)), 9, Zc),
              n("button", {
                type: "button",
                class: "motto-item-del",
                title: s(d)("motto.deleteEntry"),
                onClick: G((y) => s(ct).deleteEntry(T.id), ["stop"])
              }, "×", 8, Qc)
            ], 10, qc))), 128)) : (r(), p("div", Xc, u(s(d)("motto.historyEmpty")), 1))
          ]),
          w[9] || (w[9] = n("div", { class: "motto-menu-divider" }, null, -1)),
          n("button", {
            type: "button",
            class: "motto-menu-action reset-btn",
            onClick: w[1] || (w[1] = //@ts-ignore
            (...T) => s(ct).resetToSystem && s(ct).resetToSystem(...T))
          }, [
            w[6] || (w[6] = n("i", null, "↻", -1)),
            n("span", null, u(s(d)("motto.resetGreeting")), 1)
          ]),
          s(Q).history.length ? (r(), p("button", {
            key: 0,
            type: "button",
            class: "motto-menu-action danger-btn",
            onClick: w[2] || (w[2] = //@ts-ignore
            (...T) => s(ct).clearHistory && s(ct).clearHistory(...T))
          }, [
            w[7] || (w[7] = n("i", null, "🗑", -1)),
            n("span", null, u(s(d)("motto.clearAll")), 1)
          ])) : E("", !0)
        ], 36)) : E("", !0)
      ]))
    ], 64));
  }
}), td = /* @__PURE__ */ We(ed, [["__scopeId", "data-v-a65048d3"]]), od = /* @__PURE__ */ ge({
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
    function o(c) {
      return c < 5 ? d("clock.greeting.lateNight") : c < 9 ? d("clock.greeting.morning") : c < 12 ? d("clock.greeting.forenoon") : c < 14 ? d("clock.greeting.noon") : c < 18 ? d("clock.greeting.afternoon") : c < 23 ? d("clock.greeting.evening") : d("clock.greeting.lateNight");
    }
    function i() {
      const c = Vt.state.timezone;
      if (!c || c === "local") return /* @__PURE__ */ new Date();
      try {
        const h = (/* @__PURE__ */ new Date()).toLocaleString("en-US", { timeZone: c });
        return new Date(h);
      } catch {
        return /* @__PURE__ */ new Date();
      }
    }
    function a() {
      const c = (U) => String(U).padStart(2, "0"), h = i(), L = h.getHours(), F = h.getMinutes(), m = h.getSeconds(), D = h.getFullYear(), v = h.getMonth() + 1, w = h.getDate(), T = h.getDay(), y = `${c(L)}:${c(F)}`, _ = `:${c(m)}`, x = o(L), B = d(t[T]), K = d("clock.datePattern", {
        year: D,
        month: v,
        day: w,
        week: B
      });
      co.updateTime(y, _, x, K);
    }
    function l(c) {
      c.preventDefault(), Vt.open({ clientX: c.clientX, clientY: c.clientY });
    }
    function g() {
      document.hidden ? f && (clearInterval(f), f = null) : (a(), f || (f = setInterval(a, 1e3)));
    }
    let f = null;
    return Vt.initPreferences(), a(), Xe(() => {
      Vt.initPreferences(), Pe(mt, () => {
        a();
      }), yt.activeId || (a(), f = setInterval(a, 1e3)), document.addEventListener("visibilitychange", g);
    }), Pe(
      () => yt.activeId,
      (c) => {
        c ? f && (clearInterval(f), f = null) : document.hidden || (a(), f || (f = setInterval(a, 1e3)));
      }
    ), Rt(() => {
      f && (clearInterval(f), f = null), document.removeEventListener("visibilitychange", g);
    }), (c, h) => (r(), p("div", {
      class: "hero-clock-vue-container",
      onContextmenu: l
    }, [
      n("p", {
        id: "clock",
        class: "clock",
        style: xe({ fontFamily: s(Te).fontFamily, color: s(Te).colorHex })
      }, [
        ot(u(s(Te).timeText), 1),
        n("span", {
          id: "secs",
          style: xe({ color: s(Te).colorHex })
        }, u(s(Te).secsText), 5)
      ], 4),
      n("p", {
        id: "date",
        class: "date",
        style: xe({ color: s(Te).dateColor })
      }, u(s(Te).dateText), 5)
    ], 32));
  }
}), ys = /* @__PURE__ */ We(od, [["__scopeId", "data-v-f946341c"]]), nd = {
  key: 0,
  class: "home-music-degraded-box"
}, id = { class: "degraded-badge-row" }, sd = { class: "degraded-status" }, ad = {
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
}, xd = { class: "home-music-actions" }, Ld = ["title"], $d = ["title"], Sd = ["title"], Td = ["title"], Id = ["title"], Md = /* @__PURE__ */ ge({
  __name: "HomeMusicCard",
  setup(e) {
    Xe(() => {
      setTimeout(() => {
        Gs();
      }, 200);
    });
    const t = te(() => Ui.visible || gt.djModalOpen || gt.isActive && gt.isJoined), o = te(() => gt.isActive && gt.isJoined), i = te(() => !ne.title || ne.title === "点击播放" ? d("home.music.defaultTitle") : ne.title), a = te(() => !ne.artist || ne.artist === "作者" ? d("home.music.defaultArtist") : ne.artist), l = te(() => ne.mode === "shuffle" ? "🔀" : ne.mode === "one" ? "🔂" : "🔁");
    function g(c) {
      const h = c.target, L = Number(h.value);
      Qe.seek(L);
    }
    function f() {
      Qe.update({ coverUrl: "" });
    }
    return (c, h) => (r(), p("div", {
      id: "home-music-player-view",
      class: pe(["home-music-player-view", { "is-degraded": t.value }])
    }, [
      t.value ? (r(), p("div", nd, [
        n("div", id, [
          h[7] || (h[7] = n("span", { class: "degraded-icon" }, "🎧", -1)),
          n("strong", sd, u(o.value ? s(d)("home.music.togetherListening") : s(d)("home.music.backgroundListening")), 1),
          o.value ? (r(), p("span", ad, " DJ: " + u(s(gt).hostName), 1)) : (r(), p("span", rd, u(s(d)("home.music.workspaceReady")), 1))
        ]),
        n("div", ld, [
          n("h3", {
            class: "degraded-track-title",
            title: i.value
          }, u(i.value || s(d)("home.music.standby")), 9, cd),
          n("p", dd, u(a.value), 1)
        ]),
        n("div", ud, [
          n("div", {
            class: "degraded-progress-bar-fill",
            style: xe({ width: s(ne).progressPercent + "%" })
          }, null, 4)
        ]),
        n("div", pd, [
          n("button", {
            type: "button",
            class: "degraded-btn",
            onClick: h[0] || (h[0] = (L) => s(Qe).togglePlay())
          }, u(s(ne).playing ? s(d)("home.music.pause") : s(d)("home.music.play")), 1),
          n("span", hd, u(s(ne).formattedCurrent) + " / " + u(s(ne).formattedDuration), 1)
        ])
      ])) : (r(), p(ee, { key: 1 }, [
        n("div", fd, [
          n("div", {
            id: "home-vinyl-needle",
            class: pe(["home-vinyl-needle", { playing: s(ne).playing }])
          }, [...h[8] || (h[8] = [
            Mo('<svg viewBox="0 0 32 52" fill="none" data-v-b7cbb119><circle cx="26" cy="4" r="3.5" fill="#e2e8f0" stroke="#475569" stroke-width="1.5" data-v-b7cbb119></circle><circle cx="26" cy="4" r="1.5" fill="#64748b" data-v-b7cbb119></circle><path d="M26 4 L14 26 L11 44" stroke="#cbd5e1" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" data-v-b7cbb119></path><rect x="7" y="42" width="8" height="9" rx="1.5" fill="#f43f5e" transform="rotate(-15 11 46)" data-v-b7cbb119></rect></svg>', 1)
          ])], 2),
          n("div", {
            id: "home-vinyl-disc",
            class: pe(["home-vinyl-disc", { playing: s(ne).playing }]),
            title: s(d)("home.music.togglePlay"),
            onClick: h[1] || (h[1] = (L) => s(Qe).togglePlay())
          }, [
            s(ne).coverUrl ? (r(), p("img", {
              key: 0,
              id: "home-vinyl-cover",
              class: "home-vinyl-cover",
              referrerpolicy: "no-referrer",
              src: s(ne).coverUrl,
              alt: s(d)("home.music.coverAlt"),
              onError: f
            }, null, 40, md)) : E("", !0),
            h[9] || (h[9] = n("div", { class: "home-vinyl-hole" }, null, -1))
          ], 10, gd)
        ]),
        n("div", vd, [
          n("h3", {
            id: "home-music-title",
            class: "home-music-meta-title",
            title: i.value
          }, u(i.value), 9, yd),
          n("p", wd, u(a.value), 1),
          n("div", bd, [
            n("span", kd, u(s(ne).formattedCurrent), 1),
            n("input", {
              id: "home-music-seek",
              class: "home-music-seek-bar",
              type: "range",
              min: "0",
              max: "100",
              value: s(ne).progressPercent,
              onInput: g
            }, null, 40, _d),
            n("span", Cd, u(s(ne).formattedDuration), 1)
          ]),
          n("div", xd, [
            n("button", {
              id: "home-music-prev",
              class: "home-music-btn",
              type: "button",
              title: s(d)("home.music.prevTrack"),
              onClick: h[2] || (h[2] = (L) => s(Qe).prev())
            }, " ⏮ ", 8, Ld),
            n("button", {
              id: "home-music-play",
              class: "home-music-btn play-btn",
              type: "button",
              title: s(d)("home.music.togglePlay"),
              onClick: h[3] || (h[3] = (L) => s(Qe).togglePlay())
            }, u(s(ne).playing ? "⏸" : "▶"), 9, $d),
            n("button", {
              id: "home-music-next",
              class: "home-music-btn",
              type: "button",
              title: s(d)("home.music.nextTrack"),
              onClick: h[4] || (h[4] = (L) => s(Qe).next())
            }, " ⏭ ", 8, Sd),
            n("button", {
              id: "home-music-like",
              class: pe(["home-music-btn like-btn", { liked: s(ne).liked }]),
              type: "button",
              title: s(d)("home.music.favorite"),
              onClick: h[5] || (h[5] = (L) => s(Qe).toggleLike())
            }, u(s(ne).liked ? "♥" : "♡"), 11, Td),
            n("button", {
              id: "home-music-mode",
              class: "home-music-btn",
              type: "button",
              title: s(d)("home.music.playMode"),
              onClick: h[6] || (h[6] = (L) => s(Qe).cycleMode())
            }, u(l.value), 9, Id)
          ])
        ])
      ], 64))
    ], 2));
  }
}), ws = /* @__PURE__ */ We(Md, [["__scopeId", "data-v-b7cbb119"]]), $t = /* @__PURE__ */ new Map(), St = /* @__PURE__ */ new Set();
function Dd(e, t) {
  for ($t.delete(e), $t.set(e, t), St.delete(t), St.add(t); $t.size > 512; )
    $t.delete($t.keys().next().value);
  for (; St.size > 512; )
    St.delete(St.values().next().value);
}
const Ad = {
  key: 0,
  class: "launcher-fallback"
}, Ed = ["src"], Hn = "lw_resolved_icon:", Pd = /* @__PURE__ */ ge({
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
    function o(y, _) {
      try {
        localStorage.setItem(Hn + y, _);
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
    const c = te(() => {
      const y = a.link, _ = (y.title || l(y.url)).trim();
      return _ ? _.slice(0, 1).toUpperCase() : "🔗";
    }), h = z([]), L = z(0), F = z(!1), m = z(!1), D = te(() => m.value || L.value >= h.value.length ? "" : h.value[L.value] || "");
    function v() {
      const y = a.link;
      if (!y?.url) {
        h.value = [], m.value = !0, F.value = !1;
        return;
      }
      const _ = [], x = i(y.url);
      x && _.push(x);
      const B = $t.get(y.url) || t(y.url);
      B && !_.includes(B) && _.push(B);
      const K = (N) => N ? /google\.com\/s2\/favicons|icons\.duckduckgo\.com|unavatar\.io|icon\.horse/i.test(N) : !1;
      y.customIcon && !K(y.customIcon) && _.push(y.customIcon), y.icon && !K(y.icon) && _.push(y.icon);
      const U = f(y.url);
      U && !_.includes(U) && _.push(U);
      const M = Ae.getCachedIcon(y.url);
      M && !_.includes(M) && _.push(M);
      const k = g(y.url);
      k && !k.startsWith("http://1.") && !k.startsWith("http://192.") && !k.startsWith("http://127.") && _.push(`${k}/favicon.ico`), y.customIcon && !K(y.customIcon) && _.unshift(y.customIcon);
      const $ = [...new Set(_.filter(Boolean))];
      h.value = $, L.value = 0, m.value = $.length === 0;
      const Z = $[0];
      Z && (Z.startsWith("data:") || St.has(Z)) && (F.value = !0);
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
        const x = St.has(_), B = $t.get(a.link.url);
        Dd(a.link.url, _), B !== _ && t(a.link.url) !== _ && o(a.link.url, _);
        const K = y.target;
        if (!x && !_.startsWith("data:")) {
          const U = a.link.url;
          setTimeout(() => {
            Ae.cacheIcon(U, _, K?.getAttribute("src") === _ ? K : null);
          }, 0);
        }
      }
    }
    function T() {
      const y = D.value;
      if (y) {
        St.delete(y), $t.get(a.link.url) === y && $t.delete(a.link.url);
        try {
          localStorage.removeItem(Hn + a.link.url), localStorage.removeItem("lw_sync_dataurl:" + a.link.url);
        } catch {
        }
      }
      if (y && Ae.getCachedIcon(a.link.url) === y && Ae.evictCachedIcon(a.link.url), L.value + 1 < h.value.length) {
        L.value += 1;
        const _ = h.value[L.value];
        _ && (_.startsWith("data:") || St.has(_)) && (F.value = !0);
      } else
        m.value = !0, F.value = !1;
    }
    return (y, _) => (r(), p("span", {
      class: pe(e.mini ? "launcher-folder-mini" : "launcher-favicon")
    }, [
      m.value || !D.value ? (r(), p("span", Ad, u(c.value), 1)) : (r(), p("img", {
        key: 1,
        src: D.value,
        alt: "",
        draggable: "false",
        referrerpolicy: "no-referrer",
        decoding: "async",
        style: { "pointer-events": "none", "user-select": "none" },
        onLoad: w,
        onError: T
      }, null, 40, Ed))
    ], 2));
  }
}), yn = /* @__PURE__ */ We(Pd, [["__scopeId", "data-v-bc41d0d8"]]), Wd = { class: "launcher-label launcher-title" }, Rd = ["title"], Nd = {
  key: 0,
  class: "launcher-folder-more"
}, Od = {
  key: 1,
  class: "empty-folder",
  "aria-hidden": "true"
}, Bd = { class: "launcher-folder-label launcher-title" }, Fd = /* @__PURE__ */ ge({
  __name: "LauncherTileContent",
  props: {
    link: {},
    folder: {},
    size: { default: "small" }
  },
  setup(e) {
    const t = e, o = te(() => t.size === "large" ? 9 : 4), i = te(() => t.folder?.preview.slice(0, t.folder.count > o.value ? o.value - 1 : o.value) || []);
    return (a, l) => e.link ? (r(), p(ee, { key: 0 }, [
      X(yn, { link: e.link }, null, 8, ["link"]),
      n("span", Wd, u(e.link.title), 1)
    ], 64)) : e.folder ? (r(), p(ee, { key: 1 }, [
      n("div", {
        class: "launcher-folder-preview",
        title: `打开${e.folder.title}`
      }, [
        (r(!0), p(ee, null, be(i.value, (g) => (r(), fe(yn, {
          key: g.id,
          link: g,
          mini: !0
        }, null, 8, ["link"]))), 128)),
        e.folder.count > o.value ? (r(), p("span", Nd, "+" + u(e.folder.count - (o.value - 1)), 1)) : E("", !0),
        i.value.length ? E("", !0) : (r(), p("span", Od, "📁")),
        zi(a.$slots, "default", {}, void 0, !0)
      ], 8, Rd),
      n("span", Bd, u(e.folder.title), 1)
    ], 64)) : E("", !0);
  }
}), Ro = /* @__PURE__ */ We(Fd, [["__scopeId", "data-v-7f513029"]]), bs = 5, ks = 180;
function _s(e, t, o) {
  const i = t - e.left, a = o - e.top;
  return i > e.width * 0.25 && i < e.width * 0.75 && a > e.height * 0.25 && a < e.height * 0.75;
}
function Cs(e, t, o) {
  return Math.hypot(t - (e.left + e.width / 2), o - (e.top + e.height / 2)) <= Math.max(e.width, e.height) * 0.55;
}
const Hd = {
  class: "launcher-group launcher-aihot launcher-todoist size-large",
  id: "launcher-todoist"
}, Kd = { class: "card-head aihot-home-head" }, jd = { class: "title" }, zd = ["title"], Gd = ["title"], Vd = {
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
}, tu = { class: "aihot-home-rich-meta" }, ou = { class: "aihot-home-rich-meta-left" }, nu = {
  key: 0,
  class: "aihot-home-rich-tag"
}, iu = { class: "aihot-home-rich-source" }, su = { class: "aihot-home-rich-time" }, Ri = 6, au = /* @__PURE__ */ ge({
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
    }, o = z([]), i = z(0), a = z(!0), l = z("");
    function g(y) {
      return mt.value === "en" && y.originalTitle ? y.originalTitle : y.title;
    }
    function f(y) {
      const _ = y.source?.name || y.sourceName || "AI HOT";
      return mt.value === "en" && _.includes("：") ? _.split("：")[0].trim() : _;
    }
    function c(y) {
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
      const x = !!(y.originalTitle && /[a-zA-Z]{3,}/.test(y.originalTitle)), B = !!(_.originalTitle && /[a-zA-Z]{3,}/.test(_.originalTitle));
      return x && !B ? -1 : !x && B ? 1 : 0;
    }));
    function L(y) {
      const _ = y.publishedAt || y.published || "";
      if (!_) return mt.value === "en" ? "Latest" : "最新";
      const x = Number(_), B = Number.isFinite(x) && x > 0 ? new Date(x > 1e12 ? x : x * 1e3) : new Date(_);
      if (isNaN(B.getTime())) return String(_).slice(0, 16) || (mt.value === "en" ? "Latest" : "最新");
      const K = (N) => String(N).padStart(2, "0"), U = B.getFullYear(), M = K(B.getMonth() + 1), k = K(B.getDate()), $ = K(B.getHours()), Z = K(B.getMinutes());
      return `${U}-${M}-${k} ${$}:${Z}`;
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
      const x = [
        "newtab_aihot_items_v2",
        "lw-aihot-cached-feed-all-24h-v1",
        "lw-aihot-cached-feed-v1"
      ];
      for (const B of x)
        try {
          const K = localStorage.getItem(B);
          if (K) {
            const U = JSON.parse(K);
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
        })).json(), K = Array.isArray(B) ? B : B.items || B.data || B.results || [];
        if (K.length) {
          o.value = K, i.value = 0, l.value = "";
          try {
            localStorage.setItem("newtab_aihot_items_v2", JSON.stringify(K.slice(0, 30)));
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
      i.value += Ri, i.value >= h.value.length && (i.value = 0);
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
      const x = y.links?.original || y.links?.aihot || y.url || "#";
      ui.openArticle(
        {
          id: y.id,
          title: g(y),
          summary: y.summary,
          sourceName: f(y),
          published: L(y),
          url: x
        },
        ""
      );
    }
    return Xe(() => {
      D();
    }), (y, _) => (r(), p("section", Hd, [
      n("header", Kd, [
        _[0] || (_[0] = n("span", { class: "bar cyan" }, null, -1)),
        n("strong", jd, u(s(d)("aihot.card.title")), 1),
        _[1] || (_[1] = n("span", { class: "grow" }, null, -1)),
        n("button", {
          class: "aihot-home-btn",
          type: "button",
          title: s(d)("aihot.card.refreshBtnTip"),
          onClick: v
        }, u(s(d)("aihot.card.refreshBtn")), 9, zd),
        n("button", {
          class: "aihot-home-btn aihot-home-more-btn",
          type: "button",
          title: s(d)("aihot.card.hotlistBtnTip"),
          onClick: w
        }, u(s(d)("aihot.card.hotlistBtn")), 9, Gd)
      ]),
      n("div", Vd, [
        a.value && !h.value.length ? (r(), p("p", Ud, u(s(d)("aihot.card.loading")), 1)) : l.value && !h.value.length ? (r(), p("p", Yd, u(l.value), 1)) : h.value.length ? (r(), p("div", qd, [
          (r(!0), p(ee, null, be(h.value.slice(i.value, i.value + Ri), (x, B) => (r(), p("a", {
            key: x.id || x.title,
            class: "aihot-home-rich-card",
            href: x.links?.original || x.links?.aihot || x.url || "#",
            target: "_blank",
            rel: "noreferrer",
            title: `${g(x)}
${x.summary || ""}
${s(d)("aihot.card.viewInReader")}`,
            onClick: (K) => T(x, K)
          }, [
            n("span", {
              class: pe(["aihot-home-rich-rank", { top: i.value + B < 3 }])
            }, u(i.value + B + 1), 3),
            n("div", Zd, [
              n("h3", Qd, u(g(x)), 1),
              x.summary ? (r(), p("p", eu, u(x.summary), 1)) : E("", !0),
              n("div", tu, [
                n("div", ou, [
                  c(x) ? (r(), p("span", nu, u(c(x)), 1)) : E("", !0),
                  n("span", iu, u(f(x)), 1)
                ]),
                n("time", su, u(L(x)), 1)
              ])
            ])
          ], 8, Jd))), 128))
        ])) : (r(), p("p", Xd, u(s(d)("aihot.card.empty")), 1))
      ])
    ]));
  }
}), ru = /* @__PURE__ */ We(au, [["__scopeId", "data-v-5b229fc1"]]), lu = ["aria-label"], cu = ["disabled", "aria-pressed"], du = ["disabled", "aria-pressed"], uu = ["aria-label"], pu = ["data-page", "title", "onClick", "onContextmenu", "onDragover", "onDrop"], hu = {
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
}, _u = { class: "launcher-folder-preview" }, Cu = { class: "launcher-folder-label launcher-title" }, xu = { class: "launcher-label launcher-title" }, Lu = /* @__PURE__ */ ge({
  __name: "FavoriteSites",
  setup(e) {
    const t = Y(() => import("./BookmarkBoard-PNZbbxiw.js")), o = Y(() => import("./LauncherBookGuideDialog-sS0oIcG4.js")), i = z("sites"), a = z(!1), l = z(!1);
    function g() {
      l.value = !0;
    }
    function f() {
      l.value = !1;
    }
    function c() {
      we(), w = !1, me = !1;
    }
    Xe(() => {
      ze.setExternalDragHandler(M), ze.setExternalDropHandler(k), window.addEventListener("blur", c), window.addEventListener("pagehide", c), document.addEventListener("visibilitychange", c);
      const b = window;
      he.hasBili && typeof b.ensureLauncherMediaCards == "function" && b.ensureLauncherMediaCards();
    });
    const h = z(!1), L = z(""), F = z(null), m = z(null), D = z(null), v = z(null);
    let w = !1, T = 0, y = 0, _ = 0, x = "", B = 0, K = "", U = 0;
    function M(b) {
      if (i.value !== "sites") return;
      if (!b || Ct.isOpen) {
        v.value && (v.value = null), K = "";
        return;
      }
      const C = document.elementsFromPoint(b.clientX, b.clientY);
      if (!C.some(
        (Ve) => Ve.classList.contains("launcher-site-items") || !!Ve.closest?.(".launcher-site-items")
      )) {
        v.value && (v.value = null), K = "";
        return;
      }
      const P = C.find((Ve) => Ve.classList.contains("launcher-link") && Ve.getAttribute("data-launcher-id") !== String(b.link.id) || Ve.classList.contains("launcher-folder"));
      if (!P) return;
      const ae = P.classList.contains("launcher-link"), Ce = ae ? P.getAttribute("data-launcher-id") : null, Ke = ae ? null : P.getAttribute("data-launcher-folder"), le = ae ? `link-${Ce}` : `folder-${Ke}`, ue = P.getBoundingClientRect(), Je = ue.left + ue.width / 2, xn = ue.top + ue.height / 2, _o = Math.hypot(b.clientX - Je, b.clientY - xn), qt = Date.now();
      if (_o > Math.max(ue.width, ue.height) * 0.55 || le === K && qt - U < 180) return;
      const Jt = Ot.value.filter(
        (Ve) => Ve.type !== "link" || String(Ve.link.id) !== String(b.link.id)
      ), vt = [...v.value || Jt], Mt = vt.findIndex(
        (Ve) => Ve.type === "link" && String(Ve.link.id) === String(b.link.id)
      ), Dt = vt.findIndex((Ve) => Ve.key === le);
      if (Dt < 0) return;
      const at = {
        key: `link-${b.link.id}`,
        type: "link",
        link: b.link
      };
      Mt >= 0 ? Mt !== Dt && (vt.splice(Mt, 1), vt.splice(Dt, 0, at), v.value = vt, K = le, U = qt) : (vt.splice(Dt, 0, at), v.value = vt, K = le, U = qt);
    }
    async function k(b) {
      if (i.value !== "sites" || Ct.isOpen) return !1;
      if (v.value) {
        const C = v.value.map((S) => ({
          type: S.type,
          id: S.type === "link" ? String(S.link.id) : void 0,
          groupName: S.type === "folder" ? S.folder.groupName : void 0
        }));
        return await Ae.moveLinkTo(String(b.id), he.activePage, "常用网站"), await Ae.reorderPageItems(he.activePage, C), v.value = null, K = "", !0;
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
    let Z = null, N = 0, V = 0, O = null, q = null, me = !1;
    function _e(b, C) {
      if (C.button !== 0) return;
      Z = C.pointerId, N = C.clientX, V = C.clientY, y = C.clientX, _ = C.clientY, O = String(b.id), q = null, me = !1;
      const S = C.currentTarget.getBoundingClientRect();
      $.offsetX = C.clientX - S.left, $.offsetY = C.clientY - S.top, $.type = "link", $.link = b, $.folder = null, window.addEventListener("pointermove", oe, { passive: !1 }), window.addEventListener("pointerup", Se), window.addEventListener("pointercancel", Se);
    }
    function Ge(b, C, S) {
      if (S.button !== 0 || S.target.closest(".launcher-folder-del-btn")) return;
      Z = S.pointerId, N = S.clientX, V = S.clientY, y = S.clientX, _ = S.clientY, O = null, q = b, me = !1;
      const P = S.currentTarget.getBoundingClientRect();
      $.offsetX = S.clientX - P.left, $.offsetY = S.clientY - P.top, $.type = "folder", $.folder = {
        groupName: b,
        size: Re(b),
        links: C?.links || []
      }, $.link = null, window.addEventListener("pointermove", oe, { passive: !1 }), window.addEventListener("pointerup", Se), window.addEventListener("pointercancel", Se);
    }
    let j = 0, H = null;
    function A() {
      cancelAnimationFrame(j), j = 0, H = null;
    }
    function oe(b) {
      b.pointerId === Z && (me && b.cancelable && b.preventDefault(), H = b, !j && (j = requestAnimationFrame(() => {
        j = 0;
        const C = H;
        H = null, C && ke(C);
      })));
    }
    function ke(b) {
      if (b.pointerId !== Z || !O && !q) return;
      const C = Math.hypot(b.clientX - N, b.clientY - V);
      if (!me && C > bs && (me = !0, w = !0, O ? m.value = O : q && (D.value = q)), !me) return;
      ($.link || $.folder) && ($.visible = !0, $.x = b.clientX - $.offsetX, $.y = b.clientY - $.offsetY);
      const S = document.elementsFromPoint(b.clientX, b.clientY);
      if (mi()) {
        const le = S.some(
          (Je) => Je.id === "launcher-folder-dialog" || !!Je.closest?.("#launcher-folder-dialog")
        ), ue = document.querySelector("#launcher-folder-dialog");
        if (le && ue) {
          ue.classList.add("drop-hover-valid"), Ct.dropHoverValid = !0;
          return;
        } else
          ue?.classList.remove("drop-hover-valid"), Ct.dropHoverValid = !1;
        v.value = null;
        return;
      }
      const ae = v.value || Ot.value, Ce = O ? `link-${O}` : `folder-${q}`;
      if (ae.length) {
        const le = S.find((ue) => {
          if (ue.classList.contains("launcher-link")) {
            const Je = ue.getAttribute("data-launcher-id");
            return Je && `link-${Je}` !== Ce;
          }
          if (ue.classList.contains("launcher-folder")) {
            const Je = ue.getAttribute("data-launcher-folder");
            return Je && `folder-${Je}` !== Ce;
          }
          return !1;
        });
        if (le) {
          const ue = le.classList.contains("launcher-link"), Je = ue ? le.getAttribute("data-launcher-id") : null, xn = ue ? null : le.getAttribute("data-launcher-folder"), _o = ue ? `link-${Je}` : `folder-${xn}`, qt = le.getBoundingClientRect();
          let Jt = !0;
          O && !ue && (_s(qt, b.clientX, b.clientY) ? (Jt = !1, le.classList.add("drop-target")) : le.classList.remove("drop-target"));
          const vt = Date.now();
          if (Cs(qt, b.clientX, b.clientY) || (Jt = !1), _o === x && vt - B < ks && (Jt = !1), Jt) {
            document.querySelectorAll(".launcher-folder.drop-target").forEach((at) => at.classList.remove("drop-target"));
            const Mt = ae.findIndex((at) => at.key === Ce), Dt = ae.findIndex((at) => at.key === _o);
            if (Mt >= 0 && Dt >= 0 && Mt !== Dt) {
              const at = ae.slice(), Ve = at.splice(Mt, 1)[0];
              at.splice(Dt, 0, Ve), v.value = at, x = _o, B = vt;
            }
          }
        }
      }
      const Ke = S.find((le) => le.classList.contains("launcher-page-tab"));
      if (Ke) {
        const le = Ke.getAttribute("data-page");
        le && le !== he.activePage && Ke.classList.add("drop-target");
      } else
        document.querySelectorAll(".launcher-page-tab.drop-target").forEach((le) => le.classList.remove("drop-target"));
    }
    async function Se(b) {
      if (b.pointerId === Z) {
        A(), b.type === "pointercancel" ? we() : ke(b), window.removeEventListener("pointermove", oe), window.removeEventListener("pointerup", Se), window.removeEventListener("pointercancel", Se);
        try {
          if (me) {
            T = Date.now(), w = !1;
            const C = document.elementsFromPoint(b.clientX, b.clientY);
            if (document.querySelectorAll(".launcher-page-tab.drop-target").forEach((P) => P.classList.remove("drop-target")), document.querySelectorAll(".launcher-folder.drop-target").forEach((P) => P.classList.remove("drop-target")), mi() && Ct.activeFolder) {
              if (C.some(
                (ae) => ae.id === "launcher-folder-dialog" || !!ae.closest?.("#launcher-folder-dialog")
              )) {
                const Ce = C.find((Ke) => Ke.hasAttribute("data-child-folder"))?.getAttribute("data-child-folder") || Ct.activeFolder;
                O ? await Ae.moveLinkTo(O, void 0, Ce) : q && await Ae.moveFolderInto(q, Ce);
              }
              return;
            }
            const S = C.find((P) => P.classList.contains("launcher-page-tab"));
            if (S) {
              const P = S.getAttribute("data-page");
              if (P) {
                O ? (await Ae.moveLinkTo(O, P, "常用网站"), await Ae.setPage(P)) : q && await Ae.moveFolderToPage(q, P), we();
                return;
              }
            }
            if (O) {
              const P = C.find((ae) => ae.classList.contains("launcher-folder"));
              if (P) {
                const ae = P.getAttribute("data-launcher-folder");
                if (ae) {
                  await Ae.moveLinkTo(O, he.activePage, ae), we();
                  return;
                }
              }
            }
            if (v.value) {
              const P = v.value.map((ae) => ({
                type: ae.type,
                id: ae.type === "link" ? String(ae.link.id) : void 0,
                groupName: ae.type === "folder" ? ae.folder.groupName : void 0
              }));
              await Ae.reorderPageItems(he.activePage, P);
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
      A(), Z = null, O = null, q = null, me = !1, w = !1, m.value = null, D.value = null, v.value = null, $.visible = !1, $.link = null, $.folder = null, x = "", document.querySelector("#launcher-folder-dialog")?.classList.remove("drop-hover-valid"), Ct.dropHoverValid = !1, window.removeEventListener("pointermove", oe), window.removeEventListener("pointerup", Se), window.removeEventListener("pointercancel", Se);
    }
    Rt(() => {
      ze.setExternalDragHandler(null), ze.setExternalDropHandler(null), we(), window.removeEventListener("blur", c), window.removeEventListener("pagehide", c), document.removeEventListener("visibilitychange", c), window.removeEventListener("pointermove", oe), window.removeEventListener("pointerup", Se), window.removeEventListener("pointercancel", Se);
    });
    function Ie(b) {
      const C = he.pageLabels;
      return C && C[b] ? C[b] : b || "常用网站";
    }
    function qe(b, C) {
      const S = String(b.page || "").trim(), P = String(C).trim(), ae = he.pageLabels || {}, Ce = !S || S === "常用网站" || S === "默认";
      if (!P || P === "常用网站" || P === "默认") return Ce;
      if (Ce) return !1;
      if (S === P) return !0;
      const le = ae[S] || S, ue = ae[P] || P;
      return le === ue || S === ue || le === P;
    }
    function Re(b) {
      const C = he.groupSizes;
      return C && C[b] === "large" ? "large" : "small";
    }
    function Nt(b) {
      return b === "large" ? 9 : 4;
    }
    function Yt(b, C) {
      const S = Nt(C), P = b.length > S ? S - 1 : S;
      return b.slice(0, P);
    }
    const Ot = te(() => {
      const b = he.activePage || "常用网站", S = he.links.filter(
        (le) => qe(le, b)
      ), P = /* @__PURE__ */ new Map();
      S.forEach((le) => {
        const ue = le.group || "常用网站";
        ue !== "常用网站" && (P.has(ue) || P.set(ue, []), P.get(ue).push(le));
      });
      const ae = /* @__PURE__ */ new Set(), Ce = [];
      S.forEach((le) => {
        const ue = le.group || "常用网站";
        wi(he.folders, ue) || (ue === "常用网站" ? Ce.push({ key: `link-${le.id}`, type: "link", link: le }) : ae.has(ue) || (ae.add(ue), Ce.push({
          key: `folder-${ue}`,
          type: "folder",
          folder: {
            groupName: ue,
            pageName: b,
            links: P.get(ue) || []
          }
        })));
      });
      const Ke = he.folders;
      return Ke && Object.entries(Ke).forEach(([le, ue]) => {
        if (wi(he.folders, le)) return;
        const Je = ue?.page || "常用网站";
        (Je === b || b === "常用网站" && Je === "默认") && !ae.has(le) && (ae.add(le), Ce.push({
          key: `folder-${le}`,
          type: "folder",
          folder: {
            groupName: le,
            pageName: b,
            links: P.get(le) || []
          }
        }));
      }), Ce;
    }), bo = te(() => v.value && v.value.length ? v.value : Ot.value), Ho = te(() => {
      const b = he.activePage || "常用网站", C = Ie(b);
      return C === "默认" || b === "常用网站" ? "还没有快捷入口，点击“编辑入口”后添加。" : `“${C}”还是空的，把网站拖到这里。`;
    });
    function ko(b) {
      v.value = null, m.value = null, D.value = null, ze.switchPage(b);
    }
    function nt() {
      h.value = !0, L.value = "", Tt(() => {
        F.value?.focus();
      });
    }
    function Ko() {
      if (!h.value) return;
      const b = L.value.trim();
      h.value = !1, b && ze.addPage(b);
    }
    function jo(b) {
      b.key === "Enter" ? (b.preventDefault(), Ko()) : b.key === "Escape" && (h.value = !1);
    }
    function zo(b, C) {
      ze.openPageMenu(b, C);
    }
    function Go(b) {
      const C = b.target;
      if (!C || C.closest(".launcher-link") || C.closest(".launcher-folder") || C.closest(".launcher-page-tab") || C.closest("button") || C.closest("input"))
        return;
      b.preventDefault();
      const S = he.activePage || "常用网站";
      ci.openBlankMenu(S, b.clientX, b.clientY);
    }
    function Xt(b) {
      i.value === "sites" && (!b.shiftKey || he.pages.length < 2 || (b.preventDefault(), b.deltaY > 0 || b.deltaX > 0 ? ze.nextPage() : ze.prevPage()));
    }
    function Vo(b) {
      b.target.closest(".launcher-page-tab") || b.stopPropagation();
    }
    function I(b) {
      b.button === 0 && (y = b.clientX, _ = b.clientY);
    }
    function R(b, C) {
      if (C.preventDefault(), C.stopPropagation(), Ye.isEditingShortcuts) {
        Ye.handleLinkSelection(b);
        return;
      }
      Z || (w = !1), !(Math.hypot(C.clientX - y, C.clientY - _) >= 6 || w || Date.now() - T < 600) && ze.openLink(b, C);
    }
    function W(b, C) {
      ze.openLinkMenu(b, C);
    }
    function de(b, C) {
      if (Z || (w = !1), w || Date.now() - T < 450) {
        C.preventDefault(), C.stopPropagation();
        return;
      }
      ze.openFolder(b, C);
    }
    function ft(b, C, S) {
      ze.openFolderMenu(b, C, S);
    }
    function kt(b) {
      ze.deleteFolder(b);
    }
    function Bt(b, C) {
      const S = Array.from(C.dataTransfer?.types || []);
      if (!S.includes("application/x-newtab-launcher") && !S.includes("application/x-newtab-bookmark") && !S.includes("text/uri-list") && !S.includes("text/plain")) return;
      C.preventDefault(), C.dataTransfer && (C.dataTransfer.dropEffect = "move"), he.activePage !== b && ko(b), C.currentTarget?.classList.add("drop-target");
    }
    function Ss(b) {
      b.currentTarget?.classList.remove("drop-target");
    }
    async function Ts(b, C) {
      C.currentTarget?.classList.remove("drop-target");
      let P = "";
      const ae = C.dataTransfer?.getData("application/x-newtab-launcher");
      if (ae)
        try {
          P = String(JSON.parse(ae)?.id || "");
        } catch {
        }
      if (!P && (m.value || window.__activeLauncherLink) && (P = String(window.__activeLauncherLink?.id || m.value || "")), P) {
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
      let S = "";
      const P = b.dataTransfer?.getData("application/x-newtab-launcher");
      if (P)
        try {
          S = String(JSON.parse(P)?.id || "");
        } catch {
        }
      if (!S && (m.value || window.__activeLauncherLink) && (S = String(window.__activeLauncherLink?.id || m.value || "")), S) {
        b.preventDefault(), b.stopPropagation(), await Ae.moveLinkTo(S, he.activePage, "常用网站");
        return;
      }
      const ae = window;
      if (typeof ae.importDroppedLauncherItem == "function") {
        b.preventDefault(), b.stopPropagation(), await ae.importDroppedLauncherItem(b, "常用网站", he.activePage);
        return;
      }
      const Ce = b.dataTransfer?.getData("text/plain");
      Ce && /^https?:\/\//i.test(Ce.trim()) && (b.preventDefault(), b.stopPropagation(), await Ae.addLink({
        title: "",
        url: Ce.trim(),
        page: he.activePage
      }));
    }
    function mi() {
      if (!Ct.isOpen) return !1;
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
        } catch (Ke) {
          Le.show({ appName: "常用网站", title: "移动未完成", message: Ke instanceof Error ? Ke.message : "请刷新后核对。" });
        }
        return;
      }
      let ae = "";
      const Ce = C.dataTransfer?.getData("application/x-newtab-launcher");
      if (Ce)
        try {
          ae = String(JSON.parse(Ce)?.id || "");
        } catch {
        }
      !ae && (m.value || window.__activeLauncherLink) && (ae = String(window.__activeLauncherLink?.id || m.value || "")), ae && await Ae.moveLinkTo(ae, he.activePage, b);
    }
    return (b, C) => (r(), p(ee, null, [
      s(he).showSites ? (r(), p("section", {
        key: 0,
        class: "launcher-group launcher-sites size-large",
        onWheel: Xt
      }, [
        n("header", {
          class: "launcher-group-head launcher-sites-head",
          onPointerdown: C[5] || (C[5] = G(() => {
          }, ["stop"])),
          onContextmenu: Vo
        }, [
          n("div", {
            class: "sites-view-switch",
            role: "group",
            "aria-label": s(d)("home.sites.switchAria")
          }, [
            n("button", {
              type: "button",
              disabled: a.value,
              "aria-pressed": i.value === "sites",
              onClick: C[0] || (C[0] = (S) => i.value = "sites")
            }, u(s(d)("home.sites.favoriteSites")), 9, cu),
            n("button", {
              type: "button",
              disabled: a.value,
              "aria-pressed": i.value === "bookmarks",
              onClick: C[1] || (C[1] = (S) => i.value = "bookmarks")
            }, u(s(d)("home.sites.bookmarks")), 9, du)
          ], 8, lu),
          tt(n("div", {
            class: "launcher-page-tabs",
            role: "tablist",
            "aria-label": s(d)("home.sites.pagesAria")
          }, [
            (r(!0), p(ee, null, be(s(he).pages, (S) => (r(), p("button", {
              key: S,
              type: "button",
              class: pe(["launcher-page-tab", { active: S === s(he).activePage }]),
              "data-page": S,
              role: "tab",
              title: s(d)("home.sites.pageTabTitle", { label: Ie(S) }),
              onPointerdown: C[2] || (C[2] = G(() => {
              }, ["stop"])),
              onClick: G((P) => ko(S), ["prevent", "stop"]),
              onContextmenu: G((P) => zo(S, P), ["prevent", "stop"]),
              onDragover: (P) => Bt(S, P),
              onDragleave: C[3] || (C[3] = (P) => Ss(P)),
              onDrop: (P) => Ts(S, P)
            }, u(Ie(S)), 43, pu))), 128)),
            h.value ? tt((r(), p("input", {
              key: 1,
              ref_key: "pageInputRef",
              ref: F,
              class: "launcher-page-input",
              maxlength: "12",
              placeholder: "例如：游戏区",
              "onUpdate:modelValue": C[4] || (C[4] = (S) => L.value = S),
              onKeydown: jo,
              onBlur: Ko
            }, null, 544)), [
              [go, L.value]
            ]) : (r(), p("button", {
              key: 0,
              class: "launcher-page-add",
              type: "button",
              title: "添加网站分区，例如游戏区",
              "aria-label": "添加网站分区",
              onClick: nt
            }, " + "))
          ], 8, uu), [
            [mo, i.value === "sites"]
          ]),
          i.value === "bookmarks" ? (r(), p("div", hu)) : E("", !0),
          n("button", {
            class: "launcher-page-help",
            type: "button",
            title: "使用指南：如何创建文件夹与整理网站",
            "aria-label": "使用指南与技巧",
            onClick: g
          }, " ? ")
        ], 32),
        i.value === "bookmarks" ? (r(), fe(s(t), {
          key: 0,
          "header-target": "#bookmark-board-header",
          onBusy: C[6] || (C[6] = (S) => a.value = S)
        })) : E("", !0),
        tt(n("div", {
          class: "launcher-page-panel",
          "data-page": s(he).activePage,
          hidden: !1,
          role: "tabpanel",
          onContextmenu: Go,
          onDragover: C[12] || (C[12] = (S) => Is(S)),
          onDragleave: C[13] || (C[13] = (S) => Ms(S)),
          onDrop: C[14] || (C[14] = (S) => Ds(S))
        }, [
          (r(), fe(Oo, {
            tag: "div",
            class: "launcher-items launcher-site-items",
            key: s(he).activePage,
            name: m.value || D.value ? "launcher-grid" : ""
          }, {
            default: It(() => [
              (r(!0), p(ee, null, be(bo.value, (S) => (r(), p(ee, {
                key: S.key
              }, [
                S.type === "link" ? (r(), p("a", {
                  key: S.key,
                  class: pe(["launcher-link", {
                    "is-dragging": m.value === String(S.link.id),
                    "is-wheel-picked": s(Ye).isEditingShortcuts && s(Ye).isLinkInWheel(S.link.url)
                  }]),
                  href: S.link.url,
                  title: S.link.title + (S.link.note ? `
📝 ` + S.link.note : "") + `
🔗 ` + S.link.url,
                  "data-launcher-id": String(S.link.id),
                  target: "_blank",
                  rel: "noreferrer",
                  draggable: "false",
                  onDragstart: C[7] || (C[7] = G(() => {
                  }, ["prevent"])),
                  onPointerdown: (P) => _e(S.link, P),
                  onMousedown: C[8] || (C[8] = (P) => I(P)),
                  onClick: G((P) => R(S.link, P), ["prevent"]),
                  onContextmenu: G((P) => W(S.link, P), ["prevent"])
                }, [
                  X(Ro, {
                    link: S.link
                  }, null, 8, ["link"])
                ], 42, gu)) : S.type === "folder" ? (r(), p("div", {
                  key: S.key,
                  class: pe(["launcher-folder", [
                    `size-${Re(S.folder.groupName)}`,
                    { "is-dragging": D.value === S.folder.groupName }
                  ]]),
                  title: `${S.folder.groupName}
可拖动调整位置；右键调整收藏夹大小`,
                  role: "button",
                  tabindex: "0",
                  "data-launcher-folder": String(S.folder.groupName),
                  draggable: "true",
                  onPointerdown: (P) => Ge(S.folder.groupName, S.folder, P),
                  onDragstart: (P) => As(S.folder.groupName, P),
                  onDragover: C[10] || (C[10] = (P) => Es(P)),
                  onDragleave: C[11] || (C[11] = (P) => Ps(P)),
                  onDrop: (P) => Ws(S.folder.groupName, P),
                  onClick: (P) => de(S.folder.groupName, P),
                  onContextmenu: G((P) => ft(S.folder.groupName, S.folder.pageName, P), ["prevent"])
                }, [
                  X(Ro, {
                    folder: { title: S.folder.groupName, preview: S.folder.links, count: S.folder.links.length },
                    size: Re(S.folder.groupName)
                  }, {
                    default: It(() => [
                      n("button", {
                        class: "launcher-folder-del-btn",
                        type: "button",
                        title: `删除文件夹「${S.folder.groupName}」`,
                        "aria-label": "删除文件夹",
                        onPointerdown: C[9] || (C[9] = G(() => {
                        }, ["stop"])),
                        onClick: G((P) => kt(S.folder.groupName), ["stop", "prevent"])
                      }, " ✕ ", 40, vu)
                    ]),
                    _: 2
                  }, 1032, ["folder", "size"]),
                  n("span", yu, u(S.folder.links.length), 1)
                ], 42, mu)) : E("", !0)
              ], 64))), 128)),
              bo.value.length ? E("", !0) : (r(), p("p", wu, u(Ho.value), 1))
            ]),
            _: 1
          }, 8, ["name"]))
        ], 40, fu), [
          [mo, i.value === "sites"]
        ])
      ], 32)) : E("", !0),
      s(he).hasTodo || s(he).hasBili ? (r(), p("div", bu, [
        s(he).hasTodo ? (r(), fe(ru, { key: 0 })) : s(he).hasBili ? (r(), p("div", ku)) : E("", !0)
      ])) : E("", !0),
      (r(), fe(bt, { to: "body" }, [
        $.visible ? (r(), p("div", {
          key: 0,
          class: pe(["launcher-drag-ghost", [
            $.type === "folder" ? `folder-ghost size-${$.folder?.size}` : "link-ghost"
          ]]),
          style: xe({
            left: `${$.x}px`,
            top: `${$.y}px`
          })
        }, [
          $.type === "folder" && $.folder ? (r(), p(ee, { key: 0 }, [
            n("div", _u, [
              (r(!0), p(ee, null, be(Yt($.folder.links, $.folder.size), (S, P) => (r(), fe(yn, {
                key: S.id || P,
                link: S,
                mini: !0
              }, null, 8, ["link"]))), 128))
            ]),
            n("span", Cu, u($.folder.groupName), 1)
          ], 64)) : $.link ? (r(), p(ee, { key: 1 }, [
            X(yn, {
              link: $.link
            }, null, 8, ["link"]),
            n("span", xu, u($.link.title), 1)
          ], 64)) : E("", !0)
        ], 6)) : E("", !0)
      ])),
      X(s(o), {
        open: l.value,
        onClose: f
      }, null, 8, ["open"])
    ], 64));
  }
}), xs = /* @__PURE__ */ We(Lu, [["__scopeId", "data-v-63287e7b"]]), pn = Object.keys(wo);
let nn = !1, Kn = 0, Io, jn;
function Ni(e) {
  for (const t of pn)
    Object.prototype.hasOwnProperty.call(e, t) && (wo[t] = e[t] !== !1);
}
function $u() {
  const e = wo;
  ze.setPrefs(e.showSites, e.showTodo, !e.showTodo && e.showBili), document.body.classList.toggle("hide-weather", !e.showWeather), document.body.classList.toggle("hide-sites", !e.showSites), document.body.classList.toggle("hide-bili", !e.showBili), document.body.classList.toggle("hide-youtube", !e.showYouTube), document.body.classList.toggle("hide-todo", !e.showTodo), document.body.classList.toggle("hide-bookmarks", !e.showBookmarkPanel), e.showBookmarkPanel || wn.close();
}
const Oi = {
  start() {
    if (nn) return;
    nn = !0;
    const e = ++Kn;
    jn = Pe(() => pn.map((o) => wo[o]), $u, { immediate: !0, flush: "sync" });
    const t = globalThis.chrome;
    Io = (o, i) => {
      if (i !== "local") return;
      const a = {};
      for (const l of pn) o[l] && (a[l] = o[l].newValue);
      Ni(a);
    }, t?.storage?.onChanged?.addListener(Io), t?.storage?.local && t.storage.local.get(pn).then((o) => {
      nn && Kn === e && Ni(o || {});
    }).catch((o) => console.warn("[HomePrefs] 读取首页设置失败", o));
  },
  stop() {
    nn = !1, Kn++, jn?.(), jn = void 0, Io && globalThis.chrome?.storage?.onChanged?.removeListener(Io), Io = void 0;
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
}, Fu = /* @__PURE__ */ ge({
  __name: "AppLauncher",
  setup(e) {
    Xe(() => {
      hn.initWallpaper();
    });
    function t() {
      Oe.handleToolClick("music");
    }
    return (o, i) => (r(), p("section", Su, [
      i[4] || (i[4] = n("div", {
        id: "hero-background-media",
        class: "hero-background-media",
        "aria-hidden": "true"
      }, null, -1)),
      n("div", Tu, [
        n("div", Iu, [
          tt(n("section", {
            class: "launcher-widget launcher-weather",
            "data-home-module": "weather",
            title: s(d)("weather.widgetSwitchTip")
          }, [
            n("header", Du, [
              i[1] || (i[1] = n("span", {
                class: "bar",
                style: { background: "linear-gradient(180deg,#38bdf8,#818cf8)" }
              }, null, -1)),
              n("h2", Au, u(s(d)("weather.widgetTitle")), 1)
            ]),
            n("div", Eu, [
              X(vs)
            ])
          ], 8, Mu), [
            [mo, s(wo).showWeather]
          ]),
          n("div", Pu, [
            n("div", Wu, [
              X(td),
              X(ys)
            ]),
            n("form", {
              id: "search",
              class: "search",
              onSubmit: i[0] || (i[0] = G(() => {
              }, ["prevent"]))
            }, [
              X(ji)
            ], 32)
          ]),
          n("section", Ru, [
            n("header", Nu, [
              i[2] || (i[2] = n("span", { class: "bar music-purple" }, null, -1)),
              n("h2", null, u(s(d)("home.music.player")), 1),
              i[3] || (i[3] = n("span", { class: "grow" }, null, -1)),
              n("button", {
                id: "home-music-open-panel",
                class: "home-music-head-btn",
                type: "button",
                title: s(d)("home.music.openNeteaseTip"),
                onClick: t
              }, u(s(d)("home.music.openNetease")), 9, Ou)
            ]),
            n("div", Bu, [
              X(ws)
            ])
          ])
        ]),
        n("div", {
          id: "launcher-groups",
          class: pe(["launcher-groups", { "has-sites": s(he).showSites, "has-todoist": s(he).hasTodo, "has-bili": s(he).hasBili, "has-media": s(he).hasTodo || s(he).hasBili }])
        }, [
          X(xs)
        ], 2)
      ]),
      i[5] || (i[5] = n("input", {
        id: "background-input",
        type: "file",
        accept: "image/*,video/mp4,video/webm,.gif,.mp4,.webm",
        multiple: "",
        hidden: ""
      }, null, -1))
    ]));
  }
}), fo = $e(/* @__PURE__ */ new Set()), Kt = $e({}), it = $e({});
function zn(e) {
  const t = st(e);
  if (!t?.lifecycle.canUnmount || t.lifecycle.canUnmount()) return { ok: !0 };
  const o = t.lifecycle.unmountBlockedMessage || "模块操作尚未结束，不能退出或重载。";
  return Le.show({ appName: t.title, title: "操作进行中", message: o, showActions: !1 }), { ok: !1, error: o };
}
const He = {
  // 检查应用是否处于运行显示状态（驱动 Dock 上的小圆点：关闭即熄灭，不保留 macOS 风格后台悬浮绿点）
  isRunning(e) {
    return this.isVisible(e);
  },
  // 检查应用当前是否在屏幕上可见（窗口是否打开）
  isVisible(e) {
    const t = st(e);
    return t ? t.lifecycle.isVisible() : Tn(e) ? !!fa[e] : ga(e);
  },
  // 标记应用启动
  markRunning(e) {
    fo.add(e), (e in it || st(e)) && (it[e] = !0);
  },
  // 获取组件当前的 render key
  getRenderKey(e) {
    return Kt[e] || 0;
  },
  // 打开 / 显示应用窗口
  openApp(e) {
    const t = st(e);
    if (t) {
      Oe.open(e), t.lifecycle.isVisible() && this.markRunning(e);
      return;
    }
    if (this.markRunning(e), Tn(e)) {
      ki.open(e);
      return;
    }
    Oe.open(e);
  },
  // 隐藏/关闭窗口：立即退出可见运行态并熄灭 Dock 指示绿点
  hideApp(e) {
    if (fo.delete(e), st(e)) {
      Oe.close(e);
      return;
    }
    if (Tn(e)) {
      ki.close(e);
      return;
    }
    Oe.close(e);
  },
  // 真正的关闭（Quit / 彻底从内存与 DOM 中卸载销毁，熄灭小圆点）
  async quitApp(e) {
    if (st(e)) {
      const a = zn(e);
      if (!a.ok) return a;
      const l = st(e)?.lifecycle.beforeQuit;
      if (l) {
        const c = Ht(e);
        try {
          await l();
        } catch {
          const L = "后台停止未确认，窗口保留；未自动重试，请检查后台状态。";
          return Le.show({ appName: st(e).title, title: "未退出", message: L, showActions: !1 }), { ok: !1, error: L };
        }
        if (Ht(e) !== c) return { ok: !1, error: "窗口已有后续操作，未卸载。" };
        const h = zn(e);
        if (!h.ok) return h;
      }
      const g = Oe.close(e), f = Ht(e);
      return fo.delete(e), it[e] = !1, Lt.removeActiveTool(e), await g, await Tt(), Ht(e) === f ? { ok: !0 } : { ok: !1, error: "模块已有后续操作，退出状态已变化。" };
    }
    this.hideApp(e), fo.delete(e), Lt.removeActiveTool(e), e in it && (it[e] = !1);
    const t = ha;
    t.activeId === e && (t.activeId = "");
    const o = t.openOrder.indexOf(e);
    o >= 0 && t.openOrder.splice(o, 1);
    const i = t.activeTools.indexOf(e);
    i >= 0 && t.activeTools.splice(i, 1), Oe.render();
  },
  // 重新加载（Reload / 单应用热重启，重新初始化组件）
  async reloadApp(e) {
    const t = st(e);
    if (t) {
      if (t.lifecycle.canOpen && !t.lifecycle.canOpen()) return { ok: !1, error: "模块当前不能打开，未重载窗口。" };
      const o = zn(e);
      if (!o.ok) return o;
      const i = Oe.close(e), a = Ht(e);
      return await i, Ht(e) !== a ? { ok: !1, error: "模块已有后续操作，重载已取消。" } : (it[e] = !1, await Tt(), Ht(e) !== a ? { ok: !1, error: "模块已有后续操作，未重新打开。" } : (Kt[e] = (Kt[e] || 0) + 1, Oe.open(e), t.lifecycle.isVisible() ? (this.markRunning(e), { ok: !0 }) : { ok: !1, error: "模块当前不能打开，未重新显示窗口。" }));
    }
    this.hideApp(e), e in it ? (it[e] = !1, await Tt(), Kt[e] = (Kt[e] || 0) + 1, it[e] = !0) : Kt[e] = (Kt[e] || 0) + 1, await Tt(), this.openApp(e);
  }
}, to = /* @__PURE__ */ ge({
  __name: "DockCardModuleHost",
  props: {
    id: {}
  },
  setup(e) {
    const o = st(e.id);
    if (!o || o.presentation !== "card") throw new Error("Unknown registered workspace card");
    const i = o;
    i.mountPolicy === "workspace-ready" && He.markRunning(i.id), Pe(i.lifecycle.isVisible, (h) => {
      h && He.markRunning(i.id);
    }, { immediate: !0, flush: "sync" });
    const a = te(() => !!it[i.id]);
    function l() {
      try {
        i.lifecycle.hide();
      } catch {
      }
      (yt.activeId === i.id || yt.activeId === i.rootId) && (yt.activeId = null), He.hideApp(i.id), typeof document < "u" && (document.body.classList.toggle("has-card-fullscreen", !!yt.activeId), document.body.dataset.page = yt.activeId ? "daily" : "home");
    }
    function g() {
      He.reloadApp(i.id);
    }
    function f() {
      typeof window < "u" && window.location.reload();
    }
    const c = Y({
      loader: i.loadView,
      onError(h, L, F, m) {
        m <= 2 ? L() : F();
      },
      errorComponent: ge({
        setup: () => () => i.lifecycle.isVisible() ? Ue("section", { class: "card wide card-fullscreen", role: "alert" }, [
          Ue("h2", i.title),
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
              onClick: l
            }, "返回首页")
          ])
        ]) : null
      })
    });
    return yo(() => {
      l(), fo.delete(i.id), delete it[i.id];
    }), (h, L) => a.value ? (r(), fe(Gi(s(c)), {
      key: s(He).getRenderKey(s(i).id)
    })) : E("", !0);
  }
}), Hu = { class: "logicweaver-workspaces-layer" }, Ku = {
  key: 0,
  id: "daily-section",
  class: "wrap"
}, ju = { id: "vue-todoist-root" }, zu = { id: "vue-bili-favorites-root" }, Gu = { id: "vue-youtube-root" }, Vu = { id: "vue-pricing-root" }, Uu = { id: "vue-aihot-root" }, Yu = /* @__PURE__ */ ge({
  __name: "AppWorkspaces",
  setup(e) {
    const t = z(!!yt.activeId);
    return Xe(() => {
      t.value || (typeof window < "u" && "requestIdleCallback" in window ? window.requestIdleCallback(() => {
        t.value = !0;
      }, { timeout: 80 }) : setTimeout(() => {
        t.value = !0;
      }, 40));
    }), (o, i) => (r(), p("div", Hu, [
      t.value ? (r(), p("main", Ku, [
        n("div", ju, [
          X(to, { id: "todoist" })
        ]),
        n("div", zu, [
          X(to, { id: "daily-bilibili" })
        ]),
        tt(n("div", Gu, [
          X(to, { id: "daily-youtube" })
        ], 512), [
          [mo, s(wo).showYouTube]
        ]),
        n("div", Vu, [
          X(to, { id: "daily-pricing" })
        ]),
        n("div", Uu, [
          X(to, { id: "daily-aihot" })
        ]),
        X(to, { id: "card-github" })
      ])) : E("", !0)
    ]));
  }
}), Xu = ["aria-label"], qu = { class: "dock-menu-head" }, Ju = { class: "dock-menu-title" }, Zu = ["src", "alt"], Qu = {
  key: 1,
  class: "dock-menu-emoji"
}, ep = { class: "dock-menu-text" }, tp = { class: "dock-menu-text" }, op = { class: "dock-menu-text" }, np = /* @__PURE__ */ ge({
  __name: "DockContextMenu",
  props: {
    target: {}
  },
  emits: ["close", "action"],
  setup(e, { emit: t }) {
    const o = e, i = t, a = te(() => !o.target || o.target.type !== "tool" ? !1 : He.isRunning(o.target.id)), l = te(() => !o.target || o.target.type !== "tool" ? !1 : He.isVisible(o.target.id)), { menuRef: g, style: f } = pi({
      visible: () => !!o.target,
      anchor: () => o.target || { x: 0, y: 0 },
      placement: so.position === "top" ? "below" : "above",
      align: "center",
      gap: 12,
      dismiss: () => i("close")
    });
    function c() {
      o.target && (He.openApp(o.target.id), i("close"));
    }
    function h() {
      o.target && (He.hideApp(o.target.id), i("close"));
    }
    async function L() {
      o.target && (await He.reloadApp(o.target.id), i("close"));
    }
    async function F() {
      if (!o.target) return;
      const v = o.target;
      if ((await He.quitApp(v.id))?.ok === !1) {
        i("close");
        return;
      }
      Le.show({
        appName: v.title,
        title: d("dock.quitDone"),
        subtitle: d("dock.quitSubtitle"),
        icon: v.icon || "assets/logo.png",
        duration: 2800
      }), i("close");
    }
    async function m() {
      if (!o.target) return;
      const v = o.target, w = Bo.uninstall(v.id);
      i("close"), await w || Le.show({
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
        "daily-youtube": "https://www.youtube.com",
        "daily-pricing": "https://openai.com/api/pricing"
      }[o.target.id] || "https://www.bilibili.com";
      window.open(w, "_blank"), i("close");
    }
    return (v, w) => (r(), fe(bt, { to: "body" }, [
      e.target ? (r(), p("div", {
        key: 0,
        ref_key: "menuRef",
        ref: g,
        role: "group",
        "aria-label": `${e.target.title}操作`,
        class: "dock-context-menu",
        style: xe(s(f)),
        onClick: w[1] || (w[1] = G(() => {
        }, ["stop"])),
        onContextmenu: w[2] || (w[2] = G(() => {
        }, ["prevent"]))
      }, [
        n("div", qu, [
          n("div", Ju, [
            e.target.icon ? (r(), p("img", {
              key: 0,
              class: "dock-menu-icon",
              src: e.target.icon,
              alt: e.target.title
            }, null, 8, Zu)) : e.target.emoji ? (r(), p("span", Qu, u(e.target.emoji), 1)) : E("", !0),
            n("strong", null, u(e.target.title), 1)
          ]),
          e.target.type === "tool" ? (r(), p("span", {
            key: 0,
            class: pe(["dock-status-tag", { "is-running": a.value }])
          }, [
            w[3] || (w[3] = n("span", { class: "dock-status-dot" }, null, -1)),
            ot(" " + u(a.value ? s(d)("dock.menu.running") : s(d)("dock.menu.notStarted")), 1)
          ], 2)) : E("", !0)
        ]),
        w[12] || (w[12] = n("div", { class: "dock-menu-divider" }, null, -1)),
        e.target.type === "tool" ? (r(), p(ee, { key: 0 }, [
          l.value ? (r(), p("button", {
            key: 1,
            type: "button",
            class: "dock-menu-item",
            onClick: h
          }, [
            w[5] || (w[5] = n("span", { class: "dock-menu-symbol" }, "−", -1)),
            n("span", null, u(s(d)("dock.menu.hideWindow")), 1)
          ])) : (r(), p("button", {
            key: 0,
            type: "button",
            class: "dock-menu-item",
            onClick: c
          }, [
            w[4] || (w[4] = n("span", { class: "dock-menu-symbol" }, "↗", -1)),
            n("span", null, u(s(d)("dock.menu.openWindow")), 1)
          ])),
          n("button", {
            type: "button",
            class: "dock-menu-item",
            onClick: L
          }, [
            w[6] || (w[6] = n("span", { class: "dock-menu-symbol" }, "⟲", -1)),
            n("div", ep, [
              n("span", null, u(s(d)("dock.menu.reloadApp")), 1),
              n("small", null, u(s(d)("dock.menu.reloadSub")), 1)
            ])
          ]),
          w[9] || (w[9] = n("div", { class: "dock-menu-divider" }, null, -1)),
          n("button", {
            type: "button",
            class: "dock-menu-item",
            onClick: m
          }, [
            w[7] || (w[7] = n("span", { class: "dock-menu-symbol" }, "📌", -1)),
            n("div", tp, [
              n("span", null, u(s(d)("dock.menu.removeFromDock")), 1),
              n("small", null, u(s(d)("dock.menu.removeSub")), 1)
            ])
          ]),
          n("button", {
            type: "button",
            class: "dock-menu-item item-danger",
            onClick: F
          }, [
            w[8] || (w[8] = n("span", { class: "dock-menu-symbol" }, "✕", -1)),
            n("div", op, [
              n("span", null, u(s(d)("dock.menu.quitApp")), 1),
              n("small", null, u(s(d)("dock.menu.quitSub")), 1)
            ])
          ])
        ], 64)) : e.target.type === "card" ? (r(), p("button", {
          key: 1,
          type: "button",
          class: "dock-menu-item",
          onClick: D
        }, [
          w[10] || (w[10] = n("span", { class: "dock-menu-symbol" }, "↗", -1)),
          n("span", null, u(s(d)("dock.menu.openOfficial")), 1)
        ])) : (r(), p("button", {
          key: 2,
          type: "button",
          class: "dock-menu-item",
          onClick: w[0] || (w[0] = (T) => i("close"))
        }, [...w[11] || (w[11] = [
          n("span", { class: "dock-menu-symbol" }, "🏠", -1),
          n("span", null, "返回常用主页", -1)
        ])]))
      ], 44, Xu)) : E("", !0)
    ]));
  }
}), ip = /* @__PURE__ */ We(np, [["__scopeId", "data-v-3973d271"]]), sp = { class: "mac-dock-shelf" }, ap = ["data-dock-target", "title", "onPointerdown", "onClick", "onContextmenu"], rp = ["src", "alt"], lp = {
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
}, wp = /* @__PURE__ */ ge({
  __name: "MacDock",
  setup(e) {
    const t = te(() => so), o = z(null), i = te(() => Object.fromEntries(so.tools.map((N) => {
      const V = st(N.id)?.badgeCount?.() || 0;
      return [N.id, Number.isFinite(V) ? Math.max(0, Math.floor(V)) : 0];
    })));
    function a(N) {
      N.stopPropagation(), o.value = null, F(N.currentTarget), Bo.open();
    }
    function l(N, V) {
      V.stopPropagation(), o.value = null, F(V.currentTarget), Lt.triggerItem("target", N);
    }
    function g(N, V) {
      const q = V.currentTarget.getBoundingClientRect(), me = so.position, _e = me === "left" || me === "right";
      o.value = {
        type: "card",
        id: N.id,
        title: N.title,
        icon: N.icon,
        x: _e ? me === "left" ? q.right + 8 : q.left - 8 : q.left + q.width / 2,
        y: _e ? q.top + q.height / 2 : me === "top" ? q.bottom + 8 : q.top
      };
    }
    function f(N) {
      N.stopPropagation(), o.value = null, F(N.currentTarget), Lt.triggerItem("home", "home-launcher");
    }
    function c(N, V) {
      V.stopPropagation(), o.value = null, F(V.currentTarget), st(N) || He.markRunning(N), Lt.triggerItem("tool", N);
    }
    function h(N, V) {
      const q = V.currentTarget.getBoundingClientRect(), me = so.position, _e = me === "left" || me === "right";
      o.value = {
        type: "tool",
        id: N.id,
        title: N.title,
        icon: N.icon,
        emoji: N.emoji,
        x: _e ? me === "left" ? q.right + 8 : q.left - 8 : q.left + q.width / 2,
        y: _e ? q.top + q.height / 2 : me === "top" ? q.bottom + 8 : q.top
      };
    }
    const L = /* @__PURE__ */ new Map();
    function F(N) {
      if (!N || (L.get(N)?.cancel(), window.matchMedia("(prefers-reduced-motion: reduce)").matches)) return;
      const V = N.animate([
        { translate: "0 0", offset: 0 },
        { translate: "0 -8px", offset: 0.35 },
        { translate: "0 0", offset: 0.65 },
        { translate: "0 -2px", offset: 0.85 },
        { translate: "0 0", offset: 1 }
      ], { duration: 350, easing: "ease" });
      L.set(N, V);
      const O = () => {
        L.get(N) === V && L.delete(N);
      };
      V.onfinish = O, V.oncancel = O;
    }
    const m = z(null), D = $e({
      visible: !1,
      x: 0,
      y: 0,
      width: 40,
      height: 40,
      item: null,
      type: "tool"
    }), v = z(null), w = z(null), T = te(() => v.value || t.value.cards), y = te(() => w.value || t.value.tools);
    let _ = "", x = 0, B = !1, K = 0;
    function U(N, V, O) {
      if (O.button !== 0 || O.target.closest(".mac-dock-market-btn")) return;
      const _e = O.currentTarget.getBoundingClientRect();
      B = !1, m.value = {
        type: N,
        id: V.id,
        item: V,
        startX: O.clientX,
        startY: O.clientY,
        initialLeft: _e.left,
        initialTop: _e.top,
        width: _e.width,
        height: _e.height
      }, window.addEventListener("pointermove", M), window.addEventListener("pointerup", k), window.addEventListener("pointercancel", k);
    }
    function M(N) {
      if (!m.value) return;
      const V = N.clientX - m.value.startX, O = N.clientY - m.value.startY, q = Math.hypot(V, O);
      if (!B && q > 5 && (B = !0, D.visible = !0, D.item = m.value.item, D.type = m.value.type, D.width = m.value.width, D.height = m.value.height, m.value.type === "card" ? v.value = [...t.value.cards] : w.value = [...t.value.tools]), !B) return;
      D.x = N.clientX - D.width / 2, D.y = N.clientY - D.height / 2;
      const _e = document.elementsFromPoint(N.clientX, N.clientY).find(
        (ke) => ke.classList.contains("mac-dock-item") && !ke.classList.contains("mac-dock-market-btn")
      );
      if (!_e) return;
      const Ge = _e.getAttribute("data-dock-target"), j = _e.getAttribute("data-dock-tool"), H = m.value.type, A = m.value.id, oe = Date.now();
      if (H === "card" && Ge && Ge !== A && Ge !== "home-launcher") {
        const ke = _e.getBoundingClientRect(), Se = ke.left + ke.width / 2;
        if (Math.abs(N.clientX - Se) > ke.width * 0.55 || Ge === _ && oe - x < 180) return;
        const we = [...v.value || t.value.cards], Ie = we.findIndex((Re) => Re.id === A), qe = we.findIndex((Re) => Re.id === Ge);
        if (Ie >= 0 && qe >= 0 && Ie !== qe) {
          const Re = we.splice(Ie, 1)[0];
          we.splice(qe, 0, Re), v.value = we, _ = Ge, x = oe;
        }
      } else if (H === "tool" && j && j !== A) {
        const ke = _e.getBoundingClientRect(), Se = ke.left + ke.width / 2;
        if (Math.abs(N.clientX - Se) > ke.width * 0.55 || j === _ && oe - x < 180) return;
        const we = [...w.value || t.value.tools], Ie = we.findIndex((Re) => Re.id === A), qe = we.findIndex((Re) => Re.id === j);
        if (Ie >= 0 && qe >= 0 && Ie !== qe) {
          const Re = we.splice(Ie, 1)[0];
          we.splice(qe, 0, Re), w.value = we, _ = j, x = oe;
        }
      }
    }
    function k() {
      window.removeEventListener("pointermove", M), window.removeEventListener("pointerup", k), window.removeEventListener("pointercancel", k), B && m.value && (K = Date.now() + 250, m.value.type === "card" && v.value ? Lt.reorderCards(v.value.map((N) => N.id)) : m.value.type === "tool" && w.value && Lt.reorderTools(w.value.map((N) => N.id))), D.visible = !1, D.item = null, v.value = null, w.value = null, m.value = null, B = !1, _ = "";
    }
    function $(N, V) {
      Date.now() < K || l(N, V);
    }
    function Z(N, V) {
      Date.now() < K || c(N, V);
    }
    return yo(() => {
      for (const N of L.values()) N.cancel();
      L.clear(), window.removeEventListener("pointermove", M), window.removeEventListener("pointerup", k), window.removeEventListener("pointercancel", k);
    }), (N, V) => (r(), p(ee, null, [
      n("div", sp, [
        X(Oo, {
          tag: "div",
          class: "mac-dock-group mac-dock-cards-group",
          name: "dock-item-motion"
        }, {
          default: It(() => [
            (r(!0), p(ee, null, be(T.value, (O) => (r(), p("button", {
              key: O.id,
              class: pe(["mac-dock-item", {
                "is-active": t.value.activeTargetId === O.id,
                "is-drag-origin": m.value && m.value.id === O.id
              }]),
              type: "button",
              "data-dock-target": O.id,
              title: O.title,
              onPointerdown: (q) => U("card", O, q),
              onClick: G((q) => $(O.id, q), ["stop"]),
              onContextmenu: G((q) => g(O, q), ["prevent"])
            }, [
              n("img", {
                class: "mac-dock-icon",
                src: O.icon,
                alt: O.title
              }, null, 8, rp),
              t.value.activeTargetId === O.id ? (r(), p("span", lp)) : E("", !0)
            ], 42, ap))), 128))
          ]),
          _: 1
        }),
        V[4] || (V[4] = n("div", {
          class: "mac-dock-divider",
          "aria-hidden": "true"
        }, null, -1)),
        n("button", {
          class: "mac-dock-item",
          type: "button",
          "data-dock-target": "home-launcher",
          title: s(d)("dock.home"),
          onClick: V[0] || (V[0] = G((O) => f(O), ["stop"]))
        }, [
          n("img", {
            class: "mac-dock-icon",
            src: "assets/nav-home.svg",
            alt: s(d)("dock.home")
          }, null, 8, dp)
        ], 8, cp),
        V[5] || (V[5] = n("div", {
          class: "mac-dock-divider mac-dock-divider-dark",
          "aria-hidden": "true"
        }, null, -1)),
        X(Oo, {
          tag: "div",
          class: "mac-dock-group mac-dock-tools-group",
          name: "dock-item-motion"
        }, {
          default: It(() => [
            (r(!0), p(ee, null, be(y.value, (O) => (r(), p("button", {
              key: O.id,
              class: pe(["mac-dock-item", {
                "is-active": s(He).isRunning(O.id),
                "is-drag-origin": m.value && m.value.id === O.id
              }]),
              type: "button",
              "data-dock-tool": O.id,
              title: O.title,
              onPointerdown: (q) => U("tool", O, q),
              onClick: G((q) => Z(O.id, q), ["stop"]),
              onContextmenu: G((q) => h(O, q), ["prevent"])
            }, [
              O.icon ? (r(), p("img", {
                key: 0,
                class: "mac-dock-icon",
                src: O.icon,
                alt: O.title
              }, null, 8, pp)) : O.emoji ? (r(), p("span", hp, u(O.emoji), 1)) : E("", !0),
              s(He).isRunning(O.id) ? (r(), p("span", fp)) : E("", !0),
              i.value[O.id] > 0 ? (r(), p("span", gp, u(i.value[O.id] > 99 ? "99+" : i.value[O.id]), 1)) : E("", !0)
            ], 42, up))), 128))
          ]),
          _: 1
        }),
        n("button", {
          class: pe(["mac-dock-item mac-dock-market-btn", { "is-active": s(Bo).state.isOpen }]),
          type: "button",
          title: s(d)("dock.market"),
          onClick: V[1] || (V[1] = G((O) => a(O), ["stop"]))
        }, [...V[3] || (V[3] = [
          n("span", {
            class: "mac-dock-market-icon",
            "aria-hidden": "true"
          }, "🧩", -1)
        ])], 10, mp)
      ]),
      (r(), fe(bt, { to: "body" }, [
        D.visible && D.item ? (r(), p("div", {
          key: 0,
          class: "mac-dock-drag-ghost",
          style: xe({
            width: D.width + "px",
            height: D.height + "px",
            transform: "translate3d(" + D.x + "px," + D.y + "px, 0)"
          }),
          "aria-hidden": "true"
        }, [
          D.item.icon ? (r(), p("img", {
            key: 0,
            class: "mac-dock-icon",
            src: D.item.icon,
            alt: ""
          }, null, 8, vp)) : D.item.emoji ? (r(), p("span", yp, u(D.item.emoji), 1)) : E("", !0)
        ], 4)) : E("", !0)
      ])),
      X(ip, {
        target: o.value,
        onClose: V[2] || (V[2] = (O) => o.value = null)
      }, null, 8, ["target"])
    ], 64));
  }
}), Ls = /* @__PURE__ */ We(wp, [["__scopeId", "data-v-b7c583e6"]]), bp = {
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
}, Ap = ["onClick"], Ep = ["onClick"], Pp = /* @__PURE__ */ ge({
  __name: "NotificationHost",
  setup(e) {
    const t = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), a = z({}), l = z({});
    let g = null;
    function f(v) {
      const w = t.get(v);
      w !== void 0 && clearTimeout(w), t.delete(v);
    }
    function c(v, w = v.duration) {
      f(v.id), i.set(v.id, w), o.set(v.id, Date.now()), l.value[v.id] = !1, a.value[v.id] = Math.max(0, Math.min(100, w / v.duration * 100)), Tt(() => requestAnimationFrame(() => {
        a.value[v.id] = 0;
      })), t.set(v.id, window.setTimeout(() => {
        t.delete(v.id), Le.close(v.id);
      }, w));
    }
    function h(v) {
      f(v.id);
      const w = Date.now() - (o.get(v.id) || Date.now()), T = Math.max(0, (i.get(v.id) ?? v.duration) - w);
      i.set(v.id, T), l.value[v.id] = !0, a.value[v.id] = Math.max(0, Math.min(100, T / v.duration * 100));
    }
    function L(v) {
      c(v, Math.max(1500, i.get(v.id) ?? v.duration));
    }
    function F(v) {
      f(v.id), Le.close(v.id);
    }
    function m(v) {
      if (Pt.markRead(v.id), F(v), !v.onClick) {
        v.target && Pt.openTarget(v.target);
        return;
      }
      try {
        Promise.resolve(v.onClick()).catch((w) => console.warn("Notification action failed", w));
      } catch (w) {
        console.warn("Notification action failed", w);
      }
    }
    function D(v) {
      const w = Math.max(500, i.get(v.id) ?? v.duration);
      return {
        width: `${a.value[v.id] ?? 100}%`,
        transition: l.value[v.id] ? "none" : `width ${w}ms linear`
      };
    }
    return Xe(() => {
      g = new MutationObserver(() => {
        const w = new Set(Uo.map((T) => T.id));
        for (const T of Uo)
          !T.closing && !t.has(T.id) && !i.has(T.id) && c(T);
        for (const T of i.keys())
          w.has(T) || (f(T), i.delete(T), o.delete(T), delete a.value[T], delete l.value[T]);
      });
      const v = document.getElementById("win-toast-container");
      v && g.observe(v, { childList: !0 });
      for (const w of Uo) c(w);
    }), yo(() => {
      g?.disconnect(), g = null;
      for (const v of t.values()) clearTimeout(v);
      t.clear();
    }), (v, w) => (r(), fe(bt, { to: "body" }, [
      n("div", bp, [
        X(Oo, { name: "win-toast" }, {
          default: It(() => [
            (r(!0), p(ee, null, be(s(Uo), (T) => (r(), p("article", {
              key: T.id,
              class: pe(["win-toast-card", [T.appType, { closing: T.closing }]]),
              "data-toast-fingerprint": T.fingerprint,
              onMouseenter: (y) => h(T),
              onMouseleave: (y) => L(T)
            }, [
              n("header", _p, [
                n("img", {
                  src: T.icon,
                  class: "win-toast-icon",
                  alt: ""
                }, null, 8, Cp),
                n("span", xp, u(T.appName), 1),
                n("span", Lp, u(s(d)("notifications.justNow")), 1),
                n("button", {
                  type: "button",
                  class: "win-toast-close",
                  title: s(d)("common.close"),
                  "aria-label": s(d)("common.close"),
                  onClick: (y) => F(T)
                }, "✕", 8, $p)
              ]),
              n("button", {
                type: "button",
                class: "win-toast-body win-toast-body-button",
                onClick: (y) => m(T)
              }, [
                n("span", Tp, u(T.title), 1),
                T.subtitle ? (r(), p("span", Ip, u(T.subtitle), 1)) : E("", !0),
                T.message ? (r(), p("span", Mp, u(T.message), 1)) : E("", !0)
              ], 8, Sp),
              T.showActions && T.actionLabel ? (r(), p("footer", Dp, [
                n("button", {
                  type: "button",
                  class: "win-toast-btn primary",
                  onClick: (y) => m(T)
                }, u(T.actionLabel), 9, Ap),
                n("button", {
                  type: "button",
                  class: "win-toast-btn",
                  onClick: (y) => F(T)
                }, u(s(d)("common.close")), 9, Ep)
              ])) : E("", !0),
              n("div", {
                class: "win-toast-progress",
                style: xe(D(T))
              }, null, 4)
            ], 42, kp))), 128))
          ]),
          _: 1
        })
      ])
    ]));
  }
}), $s = /* @__PURE__ */ We(Pp, [["__scopeId", "data-v-71b51a1a"]]), Wp = ["id"], Rp = /* @__PURE__ */ ge({
  __name: "DockModuleHost",
  setup(e) {
    const t = Zi().filter((o) => o.presentation !== "card").map((o) => {
      Pe(o.lifecycle.isVisible, (a) => {
        a && He.markRunning(o.id);
      }, { immediate: !0, flush: "sync" });
      const i = ge({
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
                He.reloadApp(o.id);
              }
            }, "↻ 重试"),
            Ue("button", {
              type: "button",
              style: "padding: 5px 10px; border-radius: 6px; border: 1px solid var(--border); background: var(--surface); color: var(--text); cursor: pointer; font-size: 12px;",
              onClick: () => {
                He.hideApp(o.id);
              }
            }, "隐藏")
          ])
        ])
      });
      return {
        definition: o,
        mounted: te(() => !!it[o.id]),
        view: Y({
          loader: o.loadView,
          onError(a, l, g, f) {
            f <= 2 ? l() : g();
          },
          errorComponent: i
        })
      };
    });
    return yo(() => {
      for (const { definition: o } of t)
        Oe.close(o.id), fo.delete(o.id), it[o.id] = !1;
    }), (o, i) => (r(!0), p(ee, null, be(s(t), (a) => tt((r(), p("div", {
      id: a.definition.rootId,
      key: a.definition.id
    }, [
      a.mounted.value ? (r(), fe(Gi(a.view), {
        key: s(He).getRenderKey(a.definition.id)
      })) : E("", !0)
    ], 8, Wp)), [
      [mo, a.definition.lifecycle.isVisible()]
    ])), 128));
  }
}), Np = /* @__PURE__ */ We(Rp, [["__scopeId", "data-v-3f131313"]]);
function Ze(e, t) {
  const o = z(!1);
  return Pe(
    e,
    (i) => {
      i && (o.value = !0);
    },
    { immediate: !0, flush: "sync" }
  ), Wt(o);
}
const Op = ["onKeydown"], Bp = { class: "fo-up-preview-head" }, Fp = ["src"], Hp = { class: "fo-up-preview-meta" }, Kp = { class: "fo-up-preview-name-row" }, jp = ["href"], zp = ["disabled"], Gp = { class: "fo-up-preview-sign" }, Vp = { class: "fo-up-preview-videos" }, Up = {
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
}, Qp = { class: "fo-up-preview-video-info" }, eh = ["href", "title", "onClick"], th = { class: "fo-up-preview-video-meta" }, oh = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2394a3b8'%3E%3Cpath d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/%3E%3C/svg%3E", nh = /* @__PURE__ */ ge({
  __name: "BiliUpPreview",
  setup(e) {
    const t = z(!1);
    function o() {
      if (!ye.submitting) {
        if (!ye.followed) {
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
    function i() {
      t.value = !1, un.close();
    }
    function a(l, g) {
      l.ctrlKey || l.metaKey || (l.preventDefault(), l.stopPropagation(), g.bvid ? (qn.openVideo({
        bvid: g.bvid,
        title: g.title,
        cover: g.cover,
        author: ye.name,
        authorFace: ye.face,
        mid: ye.mid,
        url: g.url
      }), i()) : g.url && g.url !== "#" && window.open(g.url, "_blank"));
    }
    return (l, g) => s(ye).open ? (r(), p("div", {
      key: 0,
      class: "fo-up-preview-backdrop",
      onPointerdown: G(i, ["self"])
    }, [
      n("aside", {
        class: "fo-up-preview-popover",
        style: xe({ left: `${s(ye).left}px`, top: `${s(ye).top}px` }),
        onKeydown: No(G(i, ["stop", "prevent"]), ["esc"])
      }, [
        n("div", Bp, [
          n("img", {
            class: "fo-up-preview-avatar",
            src: s(ye).face || oh,
            alt: "",
            referrerpolicy: "no-referrer"
          }, null, 8, Fp),
          n("div", Hp, [
            n("div", Kp, [
              n("a", {
                class: "fo-up-preview-name",
                href: `https://space.bilibili.com/${s(ye).mid}`,
                target: "_blank",
                rel: "noreferrer"
              }, u(s(ye).name), 9, jp),
              n("button", {
                type: "button",
                class: pe([
                  s(ye).followed ? "fo-up-preview-unfollow" : "fo-up-preview-follow",
                  { "is-armed": t.value }
                ]),
                disabled: s(ye).submitting,
                onClick: o
              }, u(s(ye).submitting ? "处理中…" : t.value ? "确定取消？" : s(ye).followed ? "取消关注" : "＋ 关注"), 11, zp)
            ]),
            n("p", Gp, u(s(ye).sign || "暂无个人简介"), 1)
          ]),
          n("button", {
            type: "button",
            class: "fo-up-preview-close",
            "aria-label": "关闭预览",
            onClick: i
          }, "✕")
        ]),
        g[1] || (g[1] = n("div", { class: "fo-up-preview-title-tag" }, "近期投稿视频（最新 2~3 个）", -1)),
        n("div", Vp, [
          s(ye).loading ? (r(), p("div", Up, [...g[0] || (g[0] = [
            n("i", null, null, -1),
            n("span", null, "正在读取近期投稿…", -1)
          ])])) : s(ye).error ? (r(), p("p", Yp, u(s(ye).error), 1)) : s(ye).videos.length ? (r(!0), p(ee, { key: 3 }, be(s(ye).videos, (f) => (r(), p("article", {
            key: f.bvid,
            class: "fo-up-preview-video"
          }, [
            n("a", {
              class: "fo-up-preview-thumb",
              href: f.url,
              title: `就地播放「${f.title}」（Ctrl+点击在网页打开）`,
              onClick: (c) => a(c, f)
            }, [
              n("img", {
                src: f.cover,
                alt: "",
                loading: "lazy",
                referrerpolicy: "no-referrer"
              }, null, 8, Jp),
              f.duration ? (r(), p("span", Zp, u(f.duration), 1)) : E("", !0)
            ], 8, qp),
            n("div", Qp, [
              n("a", {
                class: "fo-up-preview-video-title",
                href: f.url,
                title: `就地播放「${f.title}」（Ctrl+点击在网页打开）`,
                onClick: (c) => a(c, f)
              }, u(f.title), 9, eh),
              n("div", th, [
                n("span", null, "▣ " + u(f.playCount), 1),
                n("span", null, u(f.published), 1)
              ])
            ])
          ]))), 128)) : (r(), p("p", Xp, "该 UP 主近期暂无视频动态"))
        ])
      ], 44, Op)
    ], 32)) : E("", !0);
  }
}), ih = /* @__PURE__ */ We(nh, [["__scopeId", "data-v-3fedd7f1"]]), sh = { class: "logicweaver-overlays-layer" }, ah = { id: "vue-notification-root" }, rh = {
  id: "bili-profile-menu",
  class: "bili-profile-menu",
  hidden: ""
}, lh = { id: "vue-bili-message-panel-root" }, ch = { id: "vue-notification-center-root" }, dh = { id: "vue-tab-manager-root" }, uh = { id: "vue-bookmark-menu-root" }, ph = { id: "vue-bookmark-panel-root" }, hh = { id: "vue-launcher-dialogs-root" }, fh = { id: "vue-launcher-folder-root" }, gh = { id: "vue-launcher-menus-root" }, mh = { id: "vue-settings-dialog-root" }, vh = { id: "vue-clock-settings-root" }, yh = { id: "vue-bili-theater-root" }, wh = { id: "vue-bili-mini-player-root" }, bh = { id: "vue-ai-dialog-root" }, kh = { id: "vue-aihot-viewer-root" }, _h = { id: "vue-nav-wheel-root" }, Ch = { id: "vue-github-detail-root" }, xh = { id: "vue-bili-subtitle-modal-root" }, Lh = { id: "vue-bili-video-task-modal-root" }, $h = { id: "vue-github-task-modal-root" }, Sh = { id: "vue-web-task-modal-root" }, Th = { id: "vue-firecrawl-modal-root" }, Ih = { id: "vue-floating-image-viewer-root" }, Mh = { id: "vue-command-palette-root" }, Dh = /* @__PURE__ */ ge({
  __name: "AppOverlays",
  setup(e) {
    const t = Ze(() => Bo.state.isOpen), o = Ze(() => Yi.isOpen), i = Ze(() => dn.isOpen), a = Ze(() => Vt.state.isOpen), l = Ze(() => _a.open), g = Ze(() => Po.state.isOpen), f = Ze(() => Us.isOpen), c = Ze(() => ba.isOpen), h = Ze(() => fi.state.isOpen), L = Ze(() => ea.isOpen), F = Ze(() => je.isOpen), m = Ze(() => ni.isOpen);
    let D;
    Xe(() => {
      D = cl();
    }), Rt(() => {
      D?.();
    });
    const v = Ze(() => ri.state.isOpen), w = Ze(() => Ct.isOpen), T = Ze(() => xo.editDialog.isOpen || xo.linkMove.isOpen || xo.folderMove.isOpen || xo.groupMerge.isOpen || xo.folderDelete.isOpen), y = Y(() => import("./ProfileMenu-lDCkLT3z.js")), _ = Y(() => import("./BookmarkNoteMenu-BUlLsOcW.js")), x = Y(() => import("./BookmarkPanel-Bn0og8YT.js")), B = Y(() => import("./ClockSettingsMenu-C2191c7g.js")), K = Y(() => import("./NotificationCenter-Dcijo_0X.js")), U = Y(() => import("./TabManagerPanel-s5LWu5uO.js")), M = Y(() => import("./LauncherDialogs-uUxd-mMx.js")), k = Y(() => import("./LauncherFolderDialog-CaesVN5A.js")), $ = Y(() => import("./LauncherMenus-CGXjDr8J.js")), Z = Y(() => import("./SettingsDialog-BtD568hA.js")), N = Y(() => import("./BiliMiniPlayer-D1cA7uxz.js")), V = Y(() => import("./BiliTheaterDialog-BC1Wvdmh.js")), O = Y(() => import("./BiliMessagePanel-2Ic2UP1S.js")), q = Y(() => import("./AiDialog-Dkm0ShfZ.js")), me = Y(() => import("./AihotViewer-Beh8FWe7.js")), _e = Y(() => import("./NavWheelOverlay-Cvnqbrcg.js")), Ge = Y(() => import("./GitHubRepoDetailDrawer-MdruVt7K.js")), j = Y(() => import("./InPageSideDrawer-tFq7gkTA.js")), H = Y(() => import("./BiliSubtitleModal-BQwZosjF.js")), A = Y(() => import("./BiliVideoTaskModal-gdbAfs4E.js")), oe = Y(() => import("./GitHubTaskModal-BEV5Ukwx.js")), ke = Y(() => import("./WebSiteTaskModal-BEzCyRSE.js")), Se = Y(() => import("./FirecrawlModal-D8RCmxaU.js")), we = Y(() => import("./FloatingImageViewer-LWH6NR8U.js")), Ie = Y(() => import("./CommandPalette-DeX75O7o.js")), qe = Y(() => import("./AppPromptModal-B6f-vqWY.js")), Re = Y(async () => {
      const [Nt, Yt] = await Promise.all([
        import("./PluginMarketDialog-bupbBaIA.js"),
        import("./plugin-market-B6zN10fA.js")
      ]);
      return Vs("logicweaver-market-styles", Yt.default), Nt.default;
    });
    return (Nt, Yt) => (r(), p("div", sh, [
      n("div", ah, [
        X($s)
      ]),
      n("div", rh, [
        X(s(y))
      ]),
      n("div", lh, [
        s(c) ? (r(), fe(s(O), { key: 0 })) : E("", !0)
      ]),
      n("div", ch, [
        s(o) ? (r(), fe(s(K), { key: 0 })) : E("", !0)
      ]),
      n("div", dh, [
        s(i) ? (r(), fe(s(U), { key: 0 })) : E("", !0)
      ]),
      n("div", uh, [
        s(v) ? (r(), fe(s(_), { key: 0 })) : E("", !0)
      ]),
      n("div", ph, [
        X(s(x))
      ]),
      n("div", hh, [
        s(T) ? (r(), fe(s(M), { key: 0 })) : E("", !0)
      ]),
      n("div", fh, [
        s(w) ? (r(), fe(s(k), { key: 0 })) : E("", !0)
      ]),
      n("div", gh, [
        X(s($))
      ]),
      n("div", mh, [
        X(s(Z))
      ]),
      n("div", vh, [
        s(a) ? (r(), fe(s(B), { key: 0 })) : E("", !0)
      ]),
      n("div", yh, [
        s(g) ? (r(), fe(s(V), { key: 0 })) : E("", !0)
      ]),
      n("div", wh, [
        s(f) ? (r(), fe(s(N), { key: 0 })) : E("", !0)
      ]),
      n("div", bh, [
        s(h) ? (r(), fe(s(q), { key: 0 })) : E("", !0)
      ]),
      n("div", kh, [
        s(l) ? (r(), fe(s(me), { key: 0 })) : E("", !0)
      ]),
      n("div", _h, [
        X(s(_e))
      ]),
      X(Np),
      n("div", Ch, [
        s(L) ? (r(), fe(s(Ge), { key: 0 })) : E("", !0)
      ]),
      n("div", xh, [
        X(s(H))
      ]),
      n("div", Lh, [
        X(s(A))
      ]),
      n("div", $h, [
        X(s(oe))
      ]),
      n("div", Sh, [
        X(s(ke))
      ]),
      n("div", Th, [
        X(s(Se))
      ]),
      n("div", Ih, [
        X(s(we))
      ]),
      n("div", Mh, [
        s(F) ? (r(), fe(s(Ie), { key: 0 })) : E("", !0)
      ]),
      s(m) ? (r(), fe(s(j), { key: 0 })) : E("", !0),
      X(ih),
      X(s(qe)),
      s(t) ? (r(), fe(s(Re), { key: 1 })) : E("", !0)
    ]));
  }
});
let Gn = !1;
function Ah(e = 1800) {
  if (Gn || typeof window > "u") return;
  const t = () => {
    if (Gn) return;
    Gn = !0;
    const o = Zi();
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
const Eh = ["data-active-workspace"], Ph = /* @__PURE__ */ ge({
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
    function l(c, h = "image/svg+xml") {
      if (typeof document > "u") return;
      const L = typeof chrome < "u" && chrome.runtime?.getURL ? chrome.runtime.getURL(c) : c;
      if (a === L) return;
      a = L;
      const F = document.querySelectorAll("link[rel*='icon']");
      if (F.length > 0)
        F.forEach((m) => {
          m.type = h, m.href = L;
        });
      else {
        const m = document.createElement("link");
        m.rel = "icon", m.type = h, m.href = L, document.head.appendChild(m);
      }
    }
    function g() {
      if (typeof document > "u") return;
      const c = i[Yo.value] || i.home;
      if (l(c.icon, c.iconType), ne.playing && ne.title) {
        const h = ne.artist ? ` - ${ne.artist}` : "";
        document.title = `▶ ${ne.title}${h}`;
        return;
      }
      if (Lo.playing && Lo.title) {
        document.title = `▶ ${Lo.title} · 电台`;
        return;
      }
      document.title = c.title;
    }
    Pe(
      [
        () => Yo.value,
        () => ne.playing,
        () => ne.title,
        () => ne.artist,
        () => Lo.playing,
        () => Lo.title
      ],
      () => {
        g();
      },
      { immediate: !0 }
    );
    const f = te(() => Yo.value === "home" ? "" : Yo.value);
    return Pe(() => yt.activeId, (c) => {
      document.body.classList.toggle("has-card-fullscreen", !!c), document.body.dataset.page = c ? "daily" : "home";
    }, { immediate: !0, flush: "sync" }), Xe(() => {
      typeof document < "u" && (document.body.dataset.spa = "1");
      try {
        oi.bindGlobalListener(), Ye.start(), Oi.start(), Xn.init().catch((c) => console.warn("[Launcher] 初始化失败", c)), Ah(), typeof chrome < "u" && chrome?.runtime?.sendMessage && setTimeout(() => {
          try {
            chrome.runtime.sendMessage({ type: "cleanupNativeTabs" }, () => {
              chrome.runtime?.lastError;
            });
          } catch {
          }
        }, 400);
      } catch (c) {
        console.warn("[App] Runtime start error:", c);
      }
    }), Rt(() => {
      Ye.stop(), Xn.stop(), Oi.stop(), document.body.classList.remove("has-card-fullscreen"), typeof document < "u" && o && (document.title = o);
    }), t({
      activeWorkspaceId: f,
      windowManagerController: Oe
    }), (c, h) => (r(), p("div", {
      id: "logicweaver-spa-root",
      class: "logicweaver-spa-root",
      "data-active-workspace": f.value || ""
    }, [
      X(dr),
      X(bl),
      X(Fu),
      X(Yu),
      n("nav", {
        id: "mac-dock",
        class: pe(["mac-dock", "dock-" + s(so).position]),
        "aria-label": "快捷应用栏"
      }, [
        X(Ls)
      ], 2),
      X(Dh)
    ], 8, Eh));
  }
}), Wh = /* @__PURE__ */ We(Ph, [["__scopeId", "data-v-add79781"]]), Rh = {
  class: "endfield-stage",
  "aria-hidden": "true"
}, Nh = {
  class: "rhinelab-stage",
  "aria-hidden": "true"
}, Oh = { class: "rhine-scaler" }, Bh = { class: "rhine-center-group" }, Fh = { class: "rhine-auth-status" }, Hh = { class: "rhine-auth-text" }, Kh = ["hidden"], jh = { class: "rhine-cinema-caption" }, zh = /* @__PURE__ */ ge({
  __name: "IntroAnimation",
  setup(e) {
    const t = z(window.innerHeight), o = z(window.innerWidth), i = z(!1), a = z(!1), l = z(10), g = z(1), f = z(0), c = /* @__PURE__ */ new Set();
    let h = 0, L = () => {
    };
    const F = te(() => `${String(Math.round(lt.renderedProgress)).padStart(2, "0")}%`), m = te(() => {
      const M = lt.renderedProgress / 100 * t.value + 10;
      return `${Math.min(M, Math.max(0, t.value - 102)).toFixed(1)}px`;
    }), D = te(() => lt.renderedProgress >= 75 ? "START PROCESSING..." : lt.renderedProgress >= 35 ? "REQUEST RECEIVED" : "ID CONFIRMED : JOYCE MOORE"), v = te(() => lt.finished ? "身份验证通过 · 欢迎进入终端" : lt.status ? `身份信息确认 · ${lt.status.replace(/^.*?\/\s*/, "")}` : "身份信息确认：JOYCE MOORE"), w = te(() => String(Math.max(0.35, Math.min(o.value / 1920, t.value / 1080))));
    function T(M, k) {
      const $ = window.setTimeout(() => {
        c.delete($), M();
      }, k);
      c.add($);
    }
    function y() {
      window.dispatchEvent(new CustomEvent("logicweaver:intro-complete"));
    }
    function _(M) {
      if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
        y();
        return;
      }
      const k = M ? 180 : 260, $ = M ? 200 : 280, Z = performance.now(), N = (V) => {
        const O = V - Z, q = Math.min(1, O / k), me = 1 - Math.pow(1 - q, 3);
        if (l.value = 10 + me * Math.max(0, o.value - 10), O > k && (g.value = Math.max(0, 1 - (O - k) / $)), O >= k + $) {
          y();
          return;
        }
        h = requestAnimationFrame(N);
      };
      T(() => {
        h = requestAnimationFrame(N);
      }, M ? 60 : 120);
    }
    function x(M) {
      M || (i.value = !0), T(() => {
        a.value = !0, f.value = 6, g.value = 0, T(y, 380);
      }, M ? 40 : 420);
    }
    function B(M) {
      lt.style === "rhinelab" ? x(M) : _(M);
    }
    function K() {
      o.value = window.innerWidth, t.value = window.innerHeight;
    }
    function U(M) {
      lt.finished || (M.key === "Enter" || M.key === " " || M.key === "Escape") && (M.preventDefault(), wt.skip("KEYBOARD SKIP"));
    }
    return Xe(() => {
      document.documentElement.dataset.startupStyle = lt.style, document.documentElement.style.setProperty("--rhine-scale", w.value), window.addEventListener("resize", K, { passive: !0 }), window.addEventListener("keydown", U, !0), L = Ra(B), ss();
    }), yo(() => {
      L(), window.removeEventListener("resize", K), window.removeEventListener("keydown", U, !0), cancelAnimationFrame(h);
      for (const M of c) clearTimeout(M);
      c.clear();
    }), (M, k) => (r(), p("div", {
      class: "intro-vue-content",
      style: xe({ "--rhine-scale": w.value, opacity: g.value, filter: `blur(${f.value}px)` })
    }, [
      n("div", Rh, [
        k[2] || (k[2] = n("div", { class: "endfield-loader-texture" }, null, -1)),
        k[3] || (k[3] = n("div", { class: "endfield-loader-rail" }, null, -1)),
        n("div", {
          class: "endfield-loader-fill",
          style: xe({ height: `${s(lt).renderedProgress}%` })
        }, null, 4),
        n("div", {
          class: "endfield-loader-meter",
          style: xe({ top: m.value })
        }, [
          k[1] || (k[1] = n("span", { class: "endfield-loader-tick" }, null, -1)),
          n("b", null, u(F.value), 1),
          n("small", null, u(s(lt).status), 1)
        ], 4),
        k[4] || (k[4] = Mo('<section class="endfield-loader-brand"><span class="endfield-loader-kicker">DEEPSEEK HARNESS</span><strong>END</strong><strong>FIELD</strong><span class="endfield-loader-detail"><i class="endfield-loader-chevron"></i><span>EDGE INTELLIGENCE THEME</span><small>TERRA RESEARCH COMMISSION / BOOT SEQUENCE</small><span class="endfield-loader-squares"><i class="on"></i><i class="on"></i><i class="on"></i><i></i><i></i><i></i><i class="on"></i><i class="on"></i><i></i><i></i><i></i><i></i></span></span><em>OVER THE FRONTIER / INTO THE FRONT</em></section>', 1)),
        n("div", {
          class: "endfield-loader-wipe",
          style: xe({ width: `${l.value}px`, opacity: l.value > 10 ? 1 : 0 })
        }, null, 4)
      ]),
      n("div", Nh, [
        k[12] || (k[12] = Mo('<div class="rhine-background"><svg viewBox="0 0 1920 1080" preserveAspectRatio="none"><g fill="none" stroke="#ffffff" stroke-width="2.5"><path class="rhine-drift-path1" d="M-210 705C-45 705 182 704 247 567C337 377 99 306 4 435S27 680 169 631C309 584 227 314 279 111S568-113 568-113"></path><path class="rhine-drift-path2" d="M1560-80C1374 114 1671 168 1601 323S1371 367 1431 480S1692 666 1559 787S1329 886 1498 1130"></path><circle class="rhine-drift-circle" cx="1450" cy="648" r="346"></circle><circle class="rhine-drift-circle2" cx="1450" cy="648" r="348"></circle></g></svg></div>', 1)),
        n("div", Oh, [
          k[10] || (k[10] = Mo('<header class="rhine-brand"><h1>RHINE LAB</h1><div class="rhine-brand-sub">SYNTHESIZE INFORMATION</div><p class="rhine-brand-os"><span class="rhine-brand-analysis"><span style="left:2px;">A</span><span style="left:28px;">N</span><span style="left:55px;">A</span><span style="left:81px;">L</span><span style="left:103px;">Y</span><span style="left:129px;">S</span><span style="left:154px;">I</span><span style="left:166px;">S</span></span><b>OS</b></p></header>', 1)),
          n("button", {
            class: "rhine-skip",
            type: "button",
            title: "点击进入系统 (或按 Enter)",
            onClick: k[0] || (k[0] = ($) => s(wt).skip("ENTER SYSTEM"))
          }, [...k[5] || (k[5] = [
            ot("ENTER SYSTEM ", -1),
            n("span", null, "↗", -1)
          ])]),
          n("div", Bh, [
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
            n("div", Fh, [
              k[6] || (k[6] = n("span", { class: "rhine-auth-dot" }, "·", -1)),
              n("span", Hh, u(D.value), 1),
              k[7] || (k[7] = n("i", {
                class: "rhine-cursor",
                "aria-hidden": "true"
              }, null, -1))
            ])
          ]),
          n("div", {
            class: pe(["rhine-scan", { active: i.value }]),
            hidden: !i.value
          }, [...k[9] || (k[9] = [
            Mo('<svg viewBox="0 0 1920 1080" aria-hidden="true"><g fill="none" stroke="#080a08" stroke-linecap="round"><circle class="rhine-scan-circle ring-outer" cx="960" cy="540" r="280" stroke-width="2.5"></circle><circle class="rhine-scan-circle ring-white" cx="960" cy="540" r="260" stroke="#fff" stroke-width="3.5"></circle><circle class="rhine-scan-circle ring-inner" cx="960" cy="540" r="220" stroke-width="2"></circle><circle class="rhine-orbit-dot dot-1" cx="960" cy="260" r="8" fill="#ed821b" stroke="none"></circle><circle class="rhine-orbit-dot dot-2" cx="960" cy="820" r="8" fill="#ed821b" stroke="none"></circle><circle class="rhine-scan-core" cx="960" cy="540" r="6" fill="#080a08" stroke="none"></circle></g></svg><span class="rhine-scan-label">PERMISSION AUTHORIZED</span>', 2)
          ])], 10, Kh),
          n("div", jh, u(v.value), 1),
          k[11] || (k[11] = n("div", { class: "rhine-powered" }, [
            ot("POWERED BY "),
            n("b", null, "RHINE LAB"),
            n("i")
          ], -1))
        ]),
        n("div", {
          class: pe(["rhine-white", { flash: a.value }]),
          "aria-hidden": "true"
        }, null, 2)
      ])
    ], 4));
  }
}), Gh = /* @__PURE__ */ ge({
  __name: "ProfileMenu",
  setup(e) {
    function t(o) {
      Fo.trigger(o);
    }
    return (o, i) => (r(), p(ee, null, [
      n("button", {
        type: "button",
        "data-action": "messages",
        onClick: i[0] || (i[0] = G((a) => t("messages"), ["stop"]))
      }, u(s(d)("profile.menu.notifications")), 1),
      n("button", {
        type: "button",
        "data-action": "tabs",
        onClick: i[1] || (i[1] = G((a) => t("tabs"), ["stop"]))
      }, u(s(d)("profile.menu.tabs")), 1),
      n("button", {
        type: "button",
        "data-action": "refresh",
        onClick: i[2] || (i[2] = G((a) => t("refresh"), ["stop"]))
      }, u(s(d)("profile.menu.refreshBili")), 1),
      n("button", {
        type: "button",
        "data-action": "switch",
        onClick: i[3] || (i[3] = G((a) => t("switch"), ["stop"]))
      }, u(s(d)("profile.menu.switchUser")), 1),
      n("button", {
        type: "button",
        "data-action": "web",
        onClick: i[4] || (i[4] = G((a) => t("web"), ["stop"]))
      }, u(s(d)("profile.menu.biliCenter")), 1)
    ], 64));
  }
}), Vh = /* @__PURE__ */ ge({
  __name: "WorkspaceLaunchers",
  setup(e) {
    function t(o) {
      hi.openWorkspace(o, !0);
    }
    return (o, i) => (r(), p(ee, null, [
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
      zi(o.$slots, "default")
    ], 64));
  }
}), Uh = {
  key: 0,
  "aria-label": "AI 分析任务"
}, Yh = { role: "status" }, Xh = ["disabled"], qh = ["disabled"], Jh = /* @__PURE__ */ ge({
  __name: "GitHubStatus",
  setup(e) {
    return (t, o) => s(rt).message || s(rt).busy ? (r(), p("section", Uh, [
      n("p", Yh, u(s(rt).repo ? `原任务仓库：${s(rt).repo}。 ` : "") + u(s(rt).message), 1),
      s(rt).busy ? (r(), p("button", {
        key: 0,
        type: "button",
        onClick: o[0] || (o[0] = (i) => s(et).stopAiAnalysis())
      }, "停止后续分析 / 中断等待")) : E("", !0),
      s(rt).uncertain ? (r(), p(ee, { key: 1 }, [
        o[5] || (o[5] = n("p", null, "AI 结果未确认，已阻止本页再次提交。请到供应商核对请求和计费；本页记录在整页关闭或重载后会丢失。", -1)),
        s(rt).unlockConfirmation ? (r(), p(ee, { key: 1 }, [
          o[4] || (o[4] = n("p", null, "扩展不能验证供应商任务；确认只解除本页限制，不代表成功，也不会重发请求。", -1)),
          n("button", {
            type: "button",
            disabled: s(rt).busy,
            onClick: o[2] || (o[2] = (i) => s(et).acknowledgeAiChecked())
          }, "确认解除本页限制", 8, qh),
          n("button", {
            type: "button",
            onClick: o[3] || (o[3] = (i) => s(rt).unlockConfirmation = !1)
          }, "保持限制")
        ], 64)) : (r(), p("button", {
          key: 0,
          type: "button",
          disabled: s(rt).busy,
          onClick: o[1] || (o[1] = (i) => s(rt).unlockConfirmation = !0)
        }, "我已核对供应商记录", 8, Xh))
      ], 64)) : E("", !0)
    ])) : E("", !0);
  }
});
function sn(e) {
  return {
    id: e.full_name,
    title: e.name,
    url: e.html_url || `https://github.com/${e.full_name}`,
    customIcon: e.owner?.avatar_url || "assets/github-star.svg"
  };
}
function Zh(e, t, o, i) {
  const a = t.map((g) => ({
    key: `list:${g.id}`,
    kind: "folder",
    title: g.name,
    list: g,
    repos: e.filter((f) => o.get(f.full_name.toLowerCase())?.includes(g.name))
  }));
  for (const g of e)
    o.get(g.full_name.toLowerCase())?.length || a.push({ key: `repo:${g.full_name.toLowerCase()}`, kind: "repo", title: g.name, repo: g });
  const l = new Map(i.map((g, f) => [g, f]));
  return a.sort((g, f) => (l.get(g.key) ?? i.length) - (l.get(f.key) ?? i.length));
}
function Bi(e, t, o) {
  const i = e.indexOf(t), a = e.indexOf(o);
  if (i < 0 || a < 0 || i === a) return [...e];
  const l = [...e];
  return l.splice(i, 1), l.splice(a, 0, t), l;
}
function Qh(e) {
  return Array.isArray(e) ? [...new Set(e.filter((t) => typeof t == "string" && t.length <= 300 && /^(list|repo):.+/.test(t)))].slice(0, 2e3) : [];
}
const ef = {
  key: 0,
  class: "gh-shortcut-status",
  role: "status"
}, tf = { class: "gh-shortcut-navigation" }, of = ["data-gh-list-drop", "onClick", "onDragover", "onDrop"], nf = ["data-gh-tile", "data-gh-list-drop", "onDragover", "onDrop"], sf = ["aria-label", "title", "onContextmenu", "onClick", "onPointerdown", "onKeydown"], af = {
  key: 0,
  class: "gh-shortcut-count"
}, rf = {
  key: 1,
  class: "gh-shortcut-help"
}, lf = ["disabled"], cf = ["data-gh-list-drop"], df = { class: "gh-shortcut-help" }, uf = { class: "gh-folder-repo-grid" }, pf = ["title", "onContextmenu", "onClick", "onPointerdown"], hf = {
  key: 0,
  class: "gh-shortcut-help"
}, ff = ["aria-label"], gf = { class: "gh-shortcut-menu-title" }, mf = ["disabled"], vf = /* @__PURE__ */ ge({
  __name: "GitHubFolders",
  props: {
    active: { type: Boolean, default: !0 }
  },
  emits: ["select"],
  setup(e, { emit: t }) {
    const o = e, i = t, a = z(null), l = z(""), g = z(""), f = z([]), c = z(""), h = z(null), L = te(() => h.value?.ownerKey === Be.ownerKey ? Be.repos.find((I) => I.full_name === h.value?.fullName) : void 0), F = te(() => !!(L.value && Be.repoListNames.get(L.value.full_name.toLowerCase())?.length));
    function m() {
      h.value = null;
    }
    const { menuRef: D, style: v } = pi({
      visible: () => o.active && !!L.value,
      anchor: () => h.value || { x: 0, y: 0 },
      dismiss: m
    });
    function w(I, R) {
      I.preventDefault(), I.stopPropagation(), o.active && (nt(), h.value = { fullName: R.full_name, ownerKey: Be.ownerKey, x: I.clientX, y: I.clientY });
    }
    function T() {
      const I = L.value;
      !I || !F.value || dt.busy || !o.active || (m(), _e(I.full_name, "未分类"));
    }
    function y() {
      const I = L.value;
      m(), I && O(I);
    }
    let _ = 0, x = 0, B = Promise.resolve();
    const K = te(() => Zh(Be.repos, Be.lists, Be.repoListNames, f.value)), U = te(() => K.value.find((I) => I.kind === "folder" && I.list.id === l.value)), M = te(() => U.value?.kind === "folder" ? U.value.repos : []), k = te(() => Jn.folders.filter((I) => I.kind === "all" || I.kind === "uncategorized"));
    function $(I) {
      return I.kind === "folder" ? { title: I.title, preview: I.repos.slice(0, 4).map(sn), count: Math.max(I.repos.length, I.list.totalCount) } : void 0;
    }
    const Z = () => Be.ownerKey ? `ghSidebarTileOrderV1:${Be.ownerKey}` : "";
    function N() {
      ++_;
      const I = Z(), R = [...f.value];
      I && (B = B.catch(() => {
      }).then(async () => {
        try {
          typeof chrome < "u" && chrome.storage?.local ? await chrome.storage.local.set({ [I]: R }) : localStorage.setItem(I, JSON.stringify(R)), I === Z() && (c.value = "");
        } catch {
          I === Z() && (c.value = "顺序暂未保存，本页仍可使用。");
        }
      }));
    }
    function V(I) {
      m(), l.value = "", ao.select(I), i("select");
    }
    function O(I) {
      !o.active || Date.now() < ke || (m(), l.value = "", i("select"), Xi.open(I.full_name, void 0, I));
    }
    function q(I) {
      if (!(!o.active || Date.now() < ke)) {
        if (I.kind === "repo") {
          O(I.repo);
          return;
        }
        m(), l.value = l.value === I.list.id ? "" : I.list.id, ao.select(I.title), i("select");
      }
    }
    function me(I) {
      return o.active && !dt.busy && Jn.folders.some((R) => R.title === I && (R.kind === "custom" || R.kind === "uncategorized"));
    }
    function _e(I, R) {
      me(R) && Be.repos.some((W) => W.full_name.toLowerCase() === I.toLowerCase()) && ao.dropRepository(I, R);
    }
    function Ge(I, R) {
      !me(R) || !Array.from(I.dataTransfer?.types || []).includes(ta) || (I.preventDefault(), I.stopPropagation(), I.dataTransfer && (I.dataTransfer.dropEffect = "move"), g.value = R);
    }
    function j(I, R) {
      g.value = "";
      const W = oa(I.dataTransfer);
      !W || !me(R) || (I.preventDefault(), I.stopPropagation(), _e(W, R));
    }
    function H(I) {
      const R = I.currentTarget;
      R instanceof Node && I.relatedTarget instanceof Node && R.contains(I.relatedTarget) || (g.value = "");
    }
    const A = $e({ visible: !1, x: 0, y: 0, offsetX: 0, offsetY: 0, tile: null });
    let oe = null, ke = 0, Se = 0, we = "", Ie, qe = null;
    function Re() {
      qe?.classList.remove("gh-sidebar-pointer-drop"), qe = null;
    }
    function Nt(I, R) {
      if (I.button !== 0 || !o.active || dt.busy) return;
      nt(), m();
      const W = I.currentTarget.getBoundingClientRect();
      oe = { pointer: I.pointerId, x: I.clientX, y: I.clientY, owner: Be.ownerKey, tile: R, original: [...f.value] }, A.x = I.clientX, A.y = I.clientY, A.offsetX = I.clientX - W.left, A.offsetY = I.clientY - W.top, A.tile = R, window.addEventListener("pointermove", bo, { passive: !1 }), window.addEventListener("pointerup", Ho), window.addEventListener("pointercancel", nt);
    }
    function Yt(I, R) {
      Nt(I, { key: `repo:${R.full_name.toLowerCase()}`, kind: "repo", title: R.name, repo: R });
    }
    function Ot() {
      if (Re(), g.value = "", !oe || !A.visible) return;
      const I = document.elementFromPoint(A.x, A.y), R = I?.closest("[data-gh-list-drop]"), W = R?.dataset.ghListDrop;
      if (oe.tile.kind === "repo" && W && me(W) && R && (!R.hasAttribute("data-gh-tile") || _s(R.getBoundingClientRect(), A.x, A.y))) {
        g.value = W, qe = R, R.classList.add("gh-sidebar-pointer-drop");
        return;
      }
      const de = I?.closest("[data-gh-tile]"), ft = de?.dataset.ghTile;
      if (!ft || !de || ft === oe.tile.key || !Cs(de.getBoundingClientRect(), A.x, A.y) || ft === we || Date.now() - Se < ks) return;
      const kt = K.value.map((Bt) => Bt.key);
      kt.includes(oe.tile.key) && (f.value = Bi(kt, oe.tile.key, ft), we = ft, Se = Date.now());
    }
    function bo(I) {
      !oe || I.pointerId !== oe.pointer || (A.x = I.clientX, A.y = I.clientY, !(!A.visible && Math.hypot(I.clientX - oe.x, I.clientY - oe.y) < bs) && (I.preventDefault(), A.visible || (++_, A.visible = !0, Ie = setInterval(() => {
        const W = document.elementFromPoint(A.x, A.y)?.closest(".gh-bili-folder-list, .gh-shortcut-window-content");
        if (W) {
          const de = W.getBoundingClientRect();
          A.y < de.top + 36 ? W.scrollTop -= 12 : A.y > de.bottom - 36 && (W.scrollTop += 12);
        }
        Ot();
      }, 32)), Ot()));
    }
    function Ho(I) {
      if (!oe || I.pointerId !== oe.pointer) return;
      A.visible && (A.x = I.clientX, A.y = I.clientY, Ot());
      const R = oe, W = A.visible, de = g.value;
      if (W) {
        I.preventDefault(), ke = Date.now() + 300, R.owner === Be.ownerKey && de && R.tile.kind === "repo" && _e(R.tile.repo.full_name, de);
        const ft = R.original.length !== f.value.length || R.original.some((kt, Bt) => f.value[Bt] !== kt);
        R.owner === Be.ownerKey && !de && ft && N();
      }
      de && (f.value = R.original), ko();
    }
    function ko() {
      Re(), clearInterval(Ie), Ie = void 0, window.removeEventListener("pointermove", bo), window.removeEventListener("pointerup", Ho), window.removeEventListener("pointercancel", nt), A.visible = !1, A.tile = null, oe = null, g.value = "", we = "", Se = 0;
    }
    function nt() {
      oe && (f.value = oe.original, A.visible && (ke = Date.now() + 300)), ko();
    }
    function Ko(I, R) {
      if (!I.altKey || !["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(I.key)) return;
      I.preventDefault();
      const W = K.value.map((Bt) => Bt.key), de = W.indexOf(R.key), ft = I.key === "ArrowLeft" ? -1 : I.key === "ArrowRight" ? 1 : I.key === "ArrowUp" ? -2 : 2, kt = W[de + ft];
      kt && (f.value = Bi(W, R.key, kt), N());
    }
    function jo(I) {
      const R = I.target;
      !oe && !a.value?.contains(R) && !R?.closest("#gh-list-shortcut-window, .gh-shortcut-context-menu") && (l.value = "");
    }
    function zo(I) {
      I.key === "Escape" && (nt(), m(), l.value = "");
    }
    function Go() {
      document.hidden && (nt(), m(), l.value = "");
    }
    function Xt() {
      g.value = "";
    }
    Pe(() => Be.ownerKey, async () => {
      const I = ++x;
      nt(), m(), l.value = "", f.value = [], c.value = "";
      const R = Z(), W = ++_;
      if (R)
        try {
          const de = typeof chrome < "u" && chrome.storage?.local ? (await chrome.storage.local.get(R))[R] : JSON.parse(localStorage.getItem(R) || "[]");
          I === x && W === _ && (f.value = Qh(de));
        } catch {
          I === x && (c.value = "图标顺序读取失败，可继续操作。");
        }
    }, { immediate: !0 });
    const Vo = /* @__PURE__ */ new Set();
    return Pe(() => [o.active, Be.ownerKey, Be.loading], ([I, R, W]) => {
      !I || !R || W || Vo.has(R) || (Vo.add(R), et.ensureAllStarsLoaded());
    }, { immediate: !0 }), Pe(() => o.active, (I) => {
      I || (nt(), m(), l.value = "");
    }), Pe(() => U.value, (I) => {
      I || (l.value = "");
    }), Pe(L, (I) => {
      I || m();
    }), Xe(() => {
      window.addEventListener("pointerdown", jo), window.addEventListener("keydown", zo), window.addEventListener("blur", nt), window.addEventListener("dragend", Xt), window.addEventListener("drop", Xt), document.addEventListener("visibilitychange", Go);
    }), yo(() => {
      ++x, nt(), window.removeEventListener("pointerdown", jo), window.removeEventListener("keydown", zo), window.removeEventListener("blur", nt), window.removeEventListener("dragend", Xt), window.removeEventListener("drop", Xt), document.removeEventListener("visibilitychange", Go);
    }), (I, R) => (r(), p("div", {
      ref_key: "root",
      ref: a,
      class: "gh-shortcut-sidebar"
    }, [
      s(dt).message || c.value ? (r(), p("p", ef, u(s(dt).message || c.value), 1)) : E("", !0),
      n("div", tf, [
        (r(!0), p(ee, null, be(k.value, (W) => (r(), p("button", {
          key: W.title,
          type: "button",
          class: pe(["gh-shortcut-nav", { on: W.active, "drop-into": g.value === W.title }]),
          "data-gh-list-drop": W.kind === "uncategorized" ? W.title : void 0,
          onClick: (de) => V(W.title),
          onDragover: (de) => Ge(de, W.title),
          onDragleave: H,
          onDrop: (de) => j(de, W.title)
        }, [
          n("span", null, u(W.kind === "all" ? "⭐" : "📄") + " " + u(W.title), 1),
          n("small", null, u(W.count), 1)
        ], 42, of))), 128))
      ]),
      R[9] || (R[9] = n("p", { class: "gh-shortcut-help" }, "拖进文件夹归类 · 拖到边缘排序", -1)),
      X(Oo, {
        name: "gh-shortcut",
        tag: "div",
        class: "gh-shortcut-grid"
      }, {
        default: It(() => [
          (r(!0), p(ee, null, be(K.value, (W) => (r(), p("div", {
            key: W.key,
            class: pe(["gh-shortcut-cell", { "is-dragging": A.visible && A.tile?.key === W.key, "drop-into": W.kind === "folder" && g.value === W.title }]),
            "data-gh-tile": W.key,
            "data-gh-list-drop": W.kind === "folder" ? W.title : void 0,
            onDragover: (de) => W.kind === "folder" && Ge(de, W.title),
            onDragleave: H,
            onDrop: (de) => W.kind === "folder" && j(de, W.title)
          }, [
            n("button", {
              type: "button",
              class: "gh-shortcut-tile",
              "aria-label": W.kind === "folder" ? `打开列表 ${W.title}` : `查看仓库 ${W.repo.full_name}`,
              title: W.kind === "folder" ? `${W.title}（拖入将加入该列表，保留其他归属）` : W.repo.full_name,
              onContextmenu: (de) => W.kind === "repo" && w(de, W.repo),
              onClick: (de) => q(W),
              onPointerdown: (de) => Nt(de, W),
              onDragstart: R[0] || (R[0] = G(() => {
              }, ["prevent"])),
              onKeydown: (de) => Ko(de, W)
            }, [
              X(Ro, {
                link: W.kind === "repo" ? s(sn)(W.repo) : void 0,
                folder: $(W)
              }, null, 8, ["link", "folder"]),
              W.kind === "folder" ? (r(), p("small", af, u(Math.max(W.repos.length, W.list.totalCount)), 1)) : E("", !0)
            ], 40, sf)
          ], 42, nf))), 128))
        ]),
        _: 1
      }),
      K.value.length ? E("", !0) : (r(), p("p", rf, u(s(Be).loading ? "正在读取仓库与列表…" : "暂无列表或未分类仓库"), 1)),
      (r(), fe(bt, { to: "body" }, [
        U.value && e.active ? (r(), fe(s($a), {
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
          onClose: R[5] || (R[5] = (W) => {
            l.value = "", m();
          })
        }, {
          "header-actions": It(() => [
            n("button", {
              type: "button",
              class: "gh-folder-delete-action",
              disabled: s(dt).busy,
              title: "删除 GitHub 列表（不会取消 Star）",
              onClick: R[1] || (R[1] = (W) => s(ao).delete(U.value.title))
            }, "删除列表", 8, lf)
          ]),
          default: It(() => [
            n("div", {
              class: pe(["gh-shortcut-window-content", { "drop-into": g.value === U.value.title }]),
              "data-gh-list-drop": U.value.title,
              onDragover: R[3] || (R[3] = (W) => Ge(W, U.value.title)),
              onDragleave: H,
              onDrop: R[4] || (R[4] = (W) => j(W, U.value.title))
            }, [
              n("p", df, u(M.value.length) + " 个已加载仓库 · 可拖到其他文件夹以加入列表", 1),
              n("div", uf, [
                (r(!0), p(ee, null, be(M.value, (W) => (r(), p("div", {
                  key: W.full_name,
                  class: "gh-folder-repo-cell"
                }, [
                  n("button", {
                    type: "button",
                    class: "gh-shortcut-tile",
                    title: W.full_name,
                    onContextmenu: (de) => w(de, W),
                    onClick: (de) => O(W),
                    onPointerdown: (de) => Yt(de, W),
                    onDragstart: R[2] || (R[2] = G(() => {
                    }, ["prevent"]))
                  }, [
                    X(Ro, {
                      link: s(sn)(W)
                    }, null, 8, ["link"])
                  ], 40, pf)
                ]))), 128))
              ]),
              M.value.length ? E("", !0) : (r(), p("p", hf, u(s(Be).loading ? "正在读取…" : "空文件夹，可拖入仓库"), 1))
            ], 42, cf)
          ]),
          _: 1
        }, 8, ["title"])) : E("", !0),
        L.value && e.active ? (r(), p("div", {
          key: 1,
          ref_key: "menuRef",
          ref: D,
          class: "gh-shortcut-context-menu",
          style: xe(s(v)),
          role: "menu",
          "aria-label": L.value.full_name + " 操作",
          onPointerdown: R[6] || (R[6] = G(() => {
          }, ["stop"])),
          onClick: R[7] || (R[7] = G(() => {
          }, ["stop"])),
          onContextmenu: R[8] || (R[8] = G(() => {
          }, ["prevent"]))
        }, [
          n("div", gf, u(L.value.full_name), 1),
          n("button", {
            type: "button",
            role: "menuitem",
            onClick: y
          }, "查看仓库详情"),
          n("button", {
            type: "button",
            role: "menuitem",
            disabled: s(dt).busy || !F.value,
            title: "从所有 GitHub Lists 移出，保留 Star",
            onClick: T
          }, "移到未分组", 8, mf)
        ], 44, ff)) : E("", !0),
        A.visible && A.tile ? (r(), p("div", {
          key: 2,
          class: "gh-shortcut-ghost gh-shortcut-tile",
          style: xe({ left: `${A.x - A.offsetX}px`, top: `${A.y - A.offsetY}px` })
        }, [
          X(Ro, {
            link: A.tile.kind === "repo" ? s(sn)(A.tile.repo) : void 0,
            folder: $(A.tile)
          }, null, 8, ["link", "folder"])
        ], 4)) : E("", !0)
      ]))
    ], 512));
  }
}), yf = /* @__PURE__ */ We(vf, [["__scopeId", "data-v-58555fcf"]]), wf = {
  id: "gh-hero-cover",
  class: "gh-bili-cover"
}, bf = { key: 0 }, kf = { key: 1 }, _f = {
  key: 2,
  class: "fo-folder-icon"
}, Cf = { class: "gh-bili-heading" }, xf = { class: "gh-hero-title-row" }, Lf = ["title"], $f = ["role", "aria-live"], Sf = ["title"], Tf = ["title", "aria-label"], If = { id: "gh-hero-desc" }, Mf = { class: "gh-bili-actions" }, Df = ["title"], Af = { class: "gh-batch-btn-text" }, Ef = ["title"], Pf = ["title"], Wf = /* @__PURE__ */ ge({
  __name: "GitHubHero",
  emits: ["open-ai-settings"],
  setup(e, { emit: t }) {
    return (o, i) => (r(), p(ee, null, [
      n("div", wf, [
        s(Ft).kind === "all" ? (r(), p("span", bf, "⭐")) : s(Ft).kind === "uncategorized" ? (r(), p("span", kf, "📄")) : (r(), p("i", _f))
      ]),
      n("div", Cf, [
        n("div", xf, [
          n("h3", {
            id: "gh-hero-title",
            title: s(Ft).title
          }, u(s(Ft).title), 9, Lf),
          s(jt).actionText ? (r(), p("div", {
            key: 0,
            class: pe(["gh-hero-inline-status", { "is-error": s(jt).actionError }]),
            role: s(jt).actionError ? "alert" : "status",
            "aria-live": s(jt).actionError ? "assertive" : "polite",
            "aria-atomic": "true"
          }, [
            n("span", {
              class: "gh-hero-status-text",
              title: s(jt).actionText
            }, u(s(jt).actionText), 9, Sf),
            n("button", {
              type: "button",
              title: s(d)("github.hero.closeTip"),
              "aria-label": s(d)("github.hero.closeTip"),
              onClick: i[0] || (i[0] = (a) => s(li).update({ actionText: "", actionError: !1 }))
            }, "×", 8, Tf)
          ], 10, $f)) : E("", !0)
        ]),
        n("p", If, u(s(Ft).description), 1)
      ]),
      n("div", Mf, [
        n("button", {
          id: "gh-batch-toggle-btn",
          type: "button",
          class: pe(["gh-hero-btn gh-batch-toggle-btn", { active: s(Ft).batchMode }]),
          title: s(d)("github.hero.batchToggle"),
          onClick: i[1] || (i[1] = (a) => s(Ao).toggleBatch())
        }, [
          i[4] || (i[4] = n("span", { class: "gh-batch-btn-icon" }, "☑", -1)),
          n("span", Af, u(s(Ft).batchMode ? s(d)("github.hero.batchBack") : s(d)("github.hero.batch")), 1)
        ], 10, Df),
        n("button", {
          id: "gh-refresh-btn",
          type: "button",
          class: "gh-hero-btn",
          title: s(d)("github.hero.refreshTitle"),
          onClick: i[2] || (i[2] = (a) => s(Ao).refresh())
        }, u(s(d)("github.hero.refresh")), 9, Ef),
        n("button", {
          id: "gh-hero-add-folder-btn",
          type: "button",
          class: "gh-hero-btn primary",
          title: s(d)("github.hero.addFolderTitle"),
          onClick: i[3] || (i[3] = (a) => s(Ao).createFolder())
        }, u(s(d)("github.hero.addFolder")), 9, Pf)
      ])
    ], 64));
  }
}), Rf = /* @__PURE__ */ We(Wf, [["__scopeId", "data-v-1c3e37db"]]), re = $e({ repo: "", text: "", baseline: "", busy: !1, message: "", storedValue: null });
function Fi(e, t = !1) {
  if (!e || re.busy) return;
  if (re.repo && re.text !== re.baseline) {
    re.message = "请先保存或明确取消当前草稿，再编辑或清除其它备注。";
    return;
  }
  const o = et.remarks[e]?.userRemark, i = typeof o == "string" ? o : "";
  Object.assign(re, {
    repo: e,
    baseline: i,
    text: t ? "" : i,
    storedValue: null,
    message: t ? "清除已准备；点击保存才会清除手写备注，AI 简介不变。" : "仅点击保存或 Enter 才写入；草稿只保留在本页内存。"
  });
}
function Vn() {
  re.busy || Object.assign(re, { repo: "", text: "", baseline: "", storedValue: null, message: "" });
}
async function Un() {
  if (re.busy || !re.repo) return;
  const { repo: e, text: t, baseline: o } = re;
  re.busy = !0;
  try {
    await et.updateRepoRemark(e, { userRemark: t.trim() }, o), Object.assign(re, { repo: "", text: "", baseline: "", storedValue: null, message: `${e} 的备注已保存并回读核对。` });
  } catch (i) {
    re.message = i instanceof Error ? i.message : "保存未确认，草稿保留，请先读取已保存值核对。";
  } finally {
    re.busy = !1;
  }
}
async function Hi() {
  if (re.busy || !re.repo) return;
  const e = re.repo;
  re.busy = !0;
  try {
    const o = (await et.reloadRepoRemarks())[e]?.userRemark;
    if (o !== void 0 && typeof o != "string") throw new Error("保存值格式异常，未变更草稿或覆盖基准。");
    re.storedValue = o ?? "", re.baseline = o ?? "", re.message = "已读取保存值，草稿没有替换。请对比下方保存值；再次点击保存将以草稿替换它。";
  } catch (t) {
    re.message = t instanceof Error ? t.message : "读取失败，草稿保留。";
  } finally {
    re.busy = !1;
  }
}
const Nf = ["disabled"], Of = ["disabled"], Bf = ["disabled"], Ff = ["disabled"], Hf = {
  key: 0,
  style: { width: "100%", "white-space": "pre-wrap", "overflow-wrap": "anywhere" }
}, Ki = /* @__PURE__ */ ge({
  __name: "GitHubRemarkEditor",
  props: {
    active: { type: Boolean }
  },
  setup(e) {
    const t = e, o = z(null);
    return Xe(() => {
      Tt(() => {
        t.active && !re.busy && o.value?.focus();
      });
    }), (i, a) => (r(), p("div", {
      class: "gh-inline-remark-box",
      style: { "flex-wrap": "wrap", "max-width": "100%" },
      onClick: a[6] || (a[6] = G(() => {
      }, ["stop"]))
    }, [
      tt(n("input", {
        ref_key: "input",
        ref: o,
        "onUpdate:modelValue": a[0] || (a[0] = (l) => s(re).text = l),
        class: "gh-inline-remark-input",
        type: "text",
        maxlength: "100",
        "aria-label": "手写仓库备注",
        placeholder: "备注说明…",
        disabled: s(re).busy || !e.active,
        onKeydown: [
          a[1] || (a[1] = No(G((l) => !l.isComposing && e.active && s(Un)(), ["prevent"]), ["enter"])),
          a[2] || (a[2] = No(G((l) => !l.isComposing && e.active && s(Vn)(), ["prevent", "stop"]), ["esc"]))
        ]
      }, null, 40, Nf), [
        [go, s(re).text]
      ]),
      n("button", {
        type: "button",
        class: "gh-inline-remark-btn save",
        title: "保存备注",
        disabled: s(re).busy || !e.active,
        onClick: a[3] || (a[3] = //@ts-ignore
        (...l) => s(Un) && s(Un)(...l))
      }, "✓", 8, Of),
      n("button", {
        type: "button",
        class: "gh-inline-remark-btn cancel",
        title: "取消草稿",
        disabled: s(re).busy || !e.active,
        onClick: a[4] || (a[4] = //@ts-ignore
        (...l) => s(Vn) && s(Vn)(...l))
      }, "✕", 8, Bf),
      n("button", {
        type: "button",
        disabled: s(re).busy || !e.active,
        onClick: a[5] || (a[5] = //@ts-ignore
        (...l) => s(Hi) && s(Hi)(...l))
      }, "读取已保存值", 8, Ff),
      s(re).storedValue !== null ? (r(), p("p", Hf, "已保存值：" + u(s(re).storedValue || "（空）"), 1)) : E("", !0)
    ]));
  }
}), Yn = $e({
  isOpen: !1,
  repository: null
}), Kf = {
  open(e) {
    Yn.repository = e, Yn.isOpen = !0;
  },
  close() {
    Yn.isOpen = !1;
  }
}, jf = {
  key: 0,
  role: "status"
}, zf = {
  key: 1,
  "aria-label": "未显示仓库的备注草稿"
}, Gf = {
  key: 2,
  class: "gh-search-options",
  style: { margin: "0 0 10px" }
}, Vf = { style: { "font-size": "12px", color: "var(--dim)" } }, Uf = {
  key: 3,
  class: "gh-repos-loading"
}, Yf = {
  key: 4,
  class: "muted small",
  style: { "text-align": "center", padding: "40px 0", "font-size": "13px" }
}, Xf = ["data-repo-name", "onClick", "onContextmenu", "onDragstart"], qf = ["onClick"], Jf = { class: "gh-card-head" }, Zf = ["checked", "onChange"], Qf = ["src"], eg = ["href", "title"], tg = { class: "owner" }, og = { class: "gh-card-body" }, ng = { class: "gh-card-badges" }, ig = ["title", "onClick"], sg = ["onClick"], ag = ["title", "onClick"], rg = { class: "gh-badge-remark-text" }, lg = {
  key: 0,
  class: "desc gh-desc-analyzing",
  title: "正在使用 AI 分析仓库…"
}, cg = {
  key: 1,
  class: "desc gh-desc-ai",
  title: "AI 中文简介（点击可直接修改，右键可重新分析）"
}, dg = ["title"], ug = {
  key: 3,
  class: "desc dim"
}, pg = { class: "meta" }, hg = { class: "gh-stars" }, fg = {
  key: 0,
  class: "gh-lang"
}, gg = {
  key: 1,
  class: "gh-updated"
}, mg = {
  key: 6,
  class: "gh-pager"
}, vg = ["disabled"], yg = { class: "gh-page-info" }, wg = ["disabled"], bg = ["onClick"], kg = /* @__PURE__ */ ge({
  __name: "GitHubRepositories",
  props: {
    active: { type: Boolean, default: !0 }
  },
  setup(e) {
    const t = e, o = te(() => !!re.repo && !Me.cards.some((M) => M.fullName === re.repo)), i = $e({
      visible: !1,
      x: 0,
      y: 0,
      fullName: "",
      folders: [],
      hasRemark: !1,
      url: ""
    }), a = z(null), l = z(!1);
    function g(M, k) {
      const $ = M.target;
      if ($ instanceof Element) {
        if (Me.batchMode) {
          if ($.closest(".fo-card-more,.gh-badge-folder,.gh-badge-remark,.gh-inline-remark-box")) return;
          M.preventDefault(), M.stopPropagation(), At.toggleSelection(k.fullName);
          return;
        }
        $.closest("a,button,.gh-badge-folder,.gh-badge-remark,.fo-card-more,.gh-card-hole,.gh-card-checkbox,.gh-inline-remark-box") || (M.preventDefault(), M.stopPropagation(), Xi.open(k.fullName, void 0, k));
      }
    }
    function f(M, k) {
      if (!t.active) return;
      M.preventDefault(), M.stopPropagation();
      const $ = 12, Z = 160, N = 280, V = Math.min(window.innerWidth - Z - $, Math.max($, M.clientX)), O = Math.min(window.innerHeight - N - $, Math.max($, M.clientY));
      i.x = V, i.y = O, i.fullName = k.fullName, i.folders = [...k.folders || (k.folder ? [k.folder] : [])], i.hasRemark = !!k.customRemark, i.url = k.url, i.visible = !0, a.value = null, l.value = V > window.innerWidth - 380;
    }
    function c(M, k) {
      f(k, M), a.value = "folder";
    }
    function h() {
      i.visible = !1, a.value = null;
    }
    function L(M) {
      i.folders.includes(M) ? i.folders = i.folders.filter((k) => k !== M) : i.folders.push(M), et.toggleRepoList(i.fullName, M);
    }
    function F() {
      i.folders = [], et.clearRepoLists(i.fullName), h();
    }
    function m(M) {
      if (!t.active) return;
      const k = typeof M == "string" ? M : M?.fullName || i.fullName;
      h(), Fi(k);
    }
    function D() {
      if (!t.active) return;
      const M = i.fullName;
      h(), Fi(M, !0);
    }
    async function v() {
      const M = i.url;
      if (h(), M && t.active)
        try {
          await navigator.clipboard.writeText(M);
        } catch {
        }
    }
    function w(M) {
      const k = et.findRepository(i.fullName);
      h(), k && Ys.sendGitHubShare({
        fullName: k.full_name,
        name: k.name,
        owner: k.owner?.login,
        ownerAvatar: k.owner?.avatar_url,
        desc: k.description || void 0,
        language: k.language || void 0,
        stars: k.stargazers_count,
        category: i.folders && i.folders.length ? i.folders.join(", ") : "未分类",
        url: k.html_url || `https://github.com/${k.full_name}`,
        updatedAt: k.updated_at ? k.updated_at.split("T")[0] : void 0
      }, M);
    }
    function T() {
      const M = et.findRepository(i.fullName);
      h(), M && Kf.open({
        fullName: M.full_name,
        description: M.description || "",
        stars: M.stargazers_count,
        language: M.language || void 0,
        updated: M.updated_at
      });
    }
    function y() {
      i.url && window.open(i.url, "_blank", "noreferrer"), h();
    }
    async function _() {
      const M = et.findRepository(i.fullName);
      if (!M) {
        h();
        return;
      }
      h(), await et.confirmUnstarRepository(M);
    }
    function x(M) {
      const k = M.target;
      k?.closest(".gh-repo-context-menu") || k?.closest(".gh-inline-remark-box") || h();
    }
    function B(M) {
      M.key === "Escape" && i.visible && h();
    }
    Pe(() => t.active, (M) => {
      window.removeEventListener("pointerdown", x), window.removeEventListener("keydown", B), h(), M && (window.addEventListener("pointerdown", x), window.addEventListener("keydown", B));
    }, { immediate: !0 }), Rt(() => {
      window.removeEventListener("pointerdown", x), window.removeEventListener("keydown", B);
    });
    function K(M, k) {
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
    return (M, k) => (r(), p(ee, null, [
      s(re).message ? (r(), p("p", jf, u(s(re).repo ? `${s(re).repo}：` : "") + u(s(re).message), 1)) : E("", !0),
      o.value ? (r(), p("section", zf, [
        n("p", null, "备注草稿：" + u(s(re).repo) + "（仓库不在当前列表中，草稿仍保留）", 1),
        X(Ki, {
          active: t.active
        }, null, 8, ["active"])
      ])) : E("", !0),
      s(Me).searchMessage ? (r(), p("div", Gf, [
        n("span", Vf, u(s(Me).searchMessage), 1),
        n("button", {
          type: "button",
          class: "gh-tab",
          style: { padding: "2px 8px", "font-size": "11px", "margin-left": "8px" },
          onClick: k[0] || (k[0] = ($) => s(At).resetSearch())
        }, "清空搜索")
      ])) : E("", !0),
      U.value ? (r(), p("div", Uf, [...k[17] || (k[17] = [
        n("div", {
          class: "gh-spinner",
          "aria-hidden": "true"
        }, null, -1),
        n("span", { class: "gh-loading-label" }, "正在读取 GitHub 仓库列表中…", -1)
      ])])) : s(Me).emptyMessage ? (r(), p("p", Yf, u(s(Me).emptyMessage), 1)) : E("", !0),
      s(Me).cards.length ? (r(), p("div", {
        key: 5,
        class: pe(["repos gh-grid", { "gh-batch-active": s(Me).batchMode }])
      }, [
        (r(!0), p(ee, null, be(s(Me).cards, ($) => (r(), p("article", {
          key: $.fullName,
          class: pe(["repo gh-card", { selected: $.selected }]),
          "data-repo-name": $.fullName,
          draggable: "true",
          onClick: (Z) => g(Z, $),
          onContextmenu: (Z) => f(Z, $),
          onDragstart: (Z) => K(Z, $.fullName)
        }, [
          n("button", {
            class: "fo-card-more",
            type: "button",
            "aria-label": "更多操作",
            title: "更多操作",
            onClick: G((Z) => f(Z, $), ["stop"])
          }, "⋮", 8, qf),
          n("div", Jf, [
            n("label", {
              class: "gh-card-hole",
              title: "点击勾选此仓库",
              onClick: k[1] || (k[1] = G(() => {
              }, ["stop"]))
            }, [
              n("input", {
                class: "gh-card-checkbox",
                type: "checkbox",
                checked: $.selected,
                onChange: (Z) => s(At).setSelection($.fullName, Z.target.checked)
              }, null, 40, Zf),
              k[18] || (k[18] = n("span", { class: "gh-hole-inner" }, null, -1))
            ]),
            n("img", {
              class: "gh-owner-avatar",
              src: $.avatarUrl || "assets/github-star.svg",
              alt: "",
              loading: "lazy",
              referrerpolicy: "no-referrer",
              onError: k[2] || (k[2] = (Z) => Z.target.src = "assets/github-star.svg")
            }, null, 40, Qf),
            n("a", {
              href: $.url,
              target: "_blank",
              rel: "noreferrer",
              class: "name",
              title: $.fullName
            }, [
              n("span", tg, u($.owner) + "/", 1),
              ot(u($.name), 1)
            ], 8, eg)
          ]),
          n("div", og, [
            n("div", ng, [
              $.folders && $.folders.length ? (r(!0), p(ee, { key: 0 }, be($.folders, (Z) => (r(), p("span", {
                key: Z,
                class: "gh-badge-folder",
                title: `GitHub 列表：${Z}（点击管理所属列表）`,
                onClick: G((N) => c($, N), ["stop"])
              }, " 📁 " + u(Z), 9, ig))), 128)) : (r(), p("span", {
                key: 1,
                class: "gh-badge-folder uncat",
                title: "未分类（点击加入 GitHub 列表）",
                onClick: G((Z) => c($, Z), ["stop"])
              }, " ＋ 未分类 ", 8, sg)),
              s(re).repo === $.fullName ? (r(), fe(Ki, {
                key: 2,
                active: t.active
              }, null, 8, ["active"])) : $.customRemark ? (r(), p("span", {
                key: 3,
                class: "gh-badge-remark",
                title: `备注：${$.customRemark}（点击就地修改）`,
                onClick: G((Z) => m($), ["stop"])
              }, [
                k[19] || (k[19] = n("span", { class: "gh-badge-remark-icon" }, "💬", -1)),
                n("span", rg, u($.customRemark), 1)
              ], 8, ag)) : E("", !0)
            ]),
            $.descriptionKind === "analyzing" ? (r(), p("p", lg, [...k[20] || (k[20] = [
              n("span", { class: "gh-ai-sparkle" }, "✨", -1),
              ot(" 正在使用 AI 分析仓库并提炼中文介绍…", -1)
            ])])) : $.descriptionKind === "ai" ? (r(), p("p", cg, [
              k[21] || (k[21] = n("span", { class: "gh-ai-tag-flag" }, "🤖", -1)),
              ot(u($.description), 1)
            ])) : $.descriptionKind === "plain" ? (r(), p("p", {
              key: 2,
              class: "desc",
              title: $.description
            }, u($.description), 9, dg)) : (r(), p("p", ug, "暂无描述"))
          ]),
          n("div", pg, [
            n("span", hg, "★ " + u($.stars), 1),
            $.language ? (r(), p("span", fg, u($.language), 1)) : E("", !0),
            $.updated ? (r(), p("span", gg, "更新 " + u($.updated), 1)) : E("", !0)
          ])
        ], 42, Xf))), 128))
      ], 2)) : E("", !0),
      s(Me).totalPages > 1 ? (r(), p("div", mg, [
        n("button", {
          class: "gh-page-btn",
          type: "button",
          disabled: s(Me).page <= 1,
          onClick: k[3] || (k[3] = ($) => s(At).changePage(s(Me).page - 1))
        }, "‹ 上一页", 8, vg),
        n("span", yg, u(s(Me).page) + " / " + u(s(Me).totalPages) + " · 共 " + u(s(Me).totalItems) + " 个" + u(s(Me).serverPaged ? ` · 已加载 ${s(Me).loadedItems}` : ""), 1),
        n("button", {
          class: "gh-page-btn",
          type: "button",
          disabled: s(Me).page >= s(Me).totalPages,
          onClick: k[4] || (k[4] = ($) => s(At).changePage(s(Me).page + 1))
        }, "下一页 ›", 8, wg)
      ])) : E("", !0),
      (r(), fe(bt, { to: "body" }, [
        t.active && i.visible ? (r(), p("div", {
          key: 0,
          class: "fo-cover-context-menu gh-repo-context-menu",
          style: xe({ left: `${i.x}px`, top: `${i.y}px` }),
          onClick: k[15] || (k[15] = G(() => {
          }, ["stop"])),
          onContextmenu: k[16] || (k[16] = G(() => {
          }, ["prevent"]))
        }, [
          n("div", {
            class: pe(["gh-menu-has-sub", { "is-active": a.value === "folder" }]),
            onMouseenter: k[6] || (k[6] = ($) => a.value = "folder")
          }, [
            k[22] || (k[22] = n("button", {
              class: "fo-cover-menu-item with-sub-arrow",
              type: "button"
            }, [
              n("span", null, "📁 所属 GitHub 列表"),
              n("span", { class: "sub-arrow" }, "›")
            ], -1)),
            n("div", {
              class: pe(["gh-sub-flyout", { "flyout-left": l.value }]),
              onClick: k[5] || (k[5] = G(() => {
              }, ["stop"]))
            }, [
              n("button", {
                class: pe(["fo-cover-menu-item", { primary: i.folders.length === 0 }]),
                type: "button",
                onClick: F
              }, u(i.folders.length === 0 ? "✓ " : "  ") + "＋ 设为未分类（清空列表） ", 3),
              (r(!0), p(ee, null, be(s(et).cats, ($) => (r(), p("button", {
                key: $,
                class: pe(["fo-cover-menu-item", { primary: i.folders.includes($) }]),
                type: "button",
                onClick: (Z) => L($)
              }, u(i.folders.includes($) ? "✓ " : "  ") + "📁 " + u($), 11, bg))), 128))
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
          X(Sa, {
            label: "💬 发送到聊天室",
            visible: i.visible,
            onOpen: k[10] || (k[10] = ($) => a.value = null),
            onSelect: w
          }, null, 8, ["visible"]),
          i.hasRemark ? (r(), p("button", {
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
}), _g = /* @__PURE__ */ We(kg, [["__scopeId", "data-v-7db72d19"]]), Cg = { class: "gh-batch-bar-left" }, xg = { class: "gh-batch-count-tip" }, Lg = { id: "gh-batch-selected-count" }, $g = {
  key: 0,
  "aria-label": "批量归属列表确认"
}, Sg = ["disabled"], Tg = ["disabled"], Ig = { class: "gh-batch-bar-right" }, Mg = ["disabled"], Dg = ["disabled"], Ag = ["disabled"], Eg = /* @__PURE__ */ ge({
  __name: "GitHubBatchBar",
  props: {
    active: { type: Boolean, default: !0 }
  },
  setup(e) {
    const t = e, o = Fs(), i = z(null), a = te(() => {
      const f = [
        { value: "", label: "未分类（清空所选仓库的所有列表所属）", icon: "🌐" }
      ];
      return Jn.folders.filter((c) => c.kind === "custom").forEach((c) => {
        f.push({ value: c.title, label: c.title, icon: "📁" });
      }), f;
    });
    function l() {
      t.active && (o.value = et.prepareBatchMove(), i.value = null);
    }
    async function g() {
      const f = o.value, c = i.value;
      if (!t.active || !f || c === null || dt.busy) return;
      await f.submit(c) && o.value === f && (o.value = void 0);
    }
    return Pe(() => t.active && Zt.active, (f) => {
      f || (o.value = void 0);
    }), (f, c) => (r(), p(ee, null, [
      n("div", Cg, [
        n("button", {
          type: "button",
          class: "gh-batch-action-btn",
          id: "gh-batch-select-all-btn",
          onClick: c[0] || (c[0] = (h) => s(Eo).toggleSelectAll())
        }, u(s(Zt).allSelected ? "取消全选" : "全选"), 1),
        n("span", xg, [
          c[5] || (c[5] = ot("已选择 ", -1)),
          n("b", Lg, u(s(Zt).selectedCount), 1),
          c[6] || (c[6] = ot(" 项", -1))
        ])
      ]),
      o.value ? (r(), p("section", $g, [
        n("p", null, "仅操作打开选择器时的 " + u(o.value.names.length) + " 个仓库；后来勾选的仓库不加入。", 1),
        n("details", null, [
          c[7] || (c[7] = n("summary", null, "查看本次仓库清单", -1)),
          n("ul", null, [
            (r(!0), p(ee, null, be(o.value.names, (h) => (r(), p("li", { key: h }, u(h), 1))), 128))
          ])
        ]),
        X(Vi, {
          "model-value": i.value ?? "",
          options: a.value,
          disabled: s(dt).busy,
          placeholder: "请选择目标列表",
          size: "sm",
          style: { "max-width": "260px" },
          "onUpdate:modelValue": c[1] || (c[1] = (h) => i.value = String(h))
        }, null, 8, ["model-value", "options", "disabled"]),
        n("button", {
          type: "button",
          disabled: !t.active || s(dt).busy || i.value === null,
          onClick: g
        }, "确认加入列表", 8, Sg),
        n("button", {
          type: "button",
          disabled: s(dt).busy,
          onClick: c[2] || (c[2] = (h) => o.value = void 0)
        }, "取消", 8, Tg)
      ])) : E("", !0),
      n("div", Ig, [
        n("button", {
          type: "button",
          class: "gh-batch-action-btn",
          id: "gh-batch-move-btn",
          disabled: !t.active || s(dt).busy || s(Zt).selectedCount === 0,
          title: "固定当前选择，批量加入所选 GitHub 列表",
          onClick: l
        }, " 📁 归入 GitHub 列表 ", 8, Mg),
        n("button", {
          type: "button",
          class: "gh-batch-action-btn",
          id: "gh-batch-ai-btn",
          disabled: s(Zt).selectedCount === 0,
          title: "批量使用 AI 生成中文介绍",
          onClick: c[3] || (c[3] = (h) => s(Eo).analyzeAi())
        }, " ✨ 批量 AI 分析 ", 8, Dg),
        n("button", {
          type: "button",
          class: "gh-batch-action-btn danger",
          id: "gh-batch-unstar-btn",
          disabled: s(Zt).selectedCount === 0,
          title: "从 GitHub 批量取消 Star 收藏",
          onClick: c[4] || (c[4] = (h) => s(Eo).unstar())
        }, " 🗑 取消收藏 ", 8, Ag)
      ])
    ], 64));
  }
}), Pg = Y(() => import("./GitHubWorkspaceCard-B6PRQdra.js")), Wg = Y(() => import("./NotificationCenter-Dcijo_0X.js")), Rg = Y(() => import("./TabManagerPanel-s5LWu5uO.js")), Ng = Y(() => import("./BookmarkNoteMenu-BUlLsOcW.js")), Og = Y(() => import("./BookmarkPanel-Bn0og8YT.js")), Bg = Y(() => import("./LauncherDialogs-uUxd-mMx.js")), Fg = Y(() => import("./SettingsDialog-BtD568hA.js")), Hg = Y(() => import("./SettingsView-BV3S7fD1.js")), Kg = Y(() => import("./ClockSettingsMenu-C2191c7g.js")), jg = Y(() => import("./BiliTheaterDialog-BC1Wvdmh.js")), zg = Y(() => import("./BiliMiniPlayer-D1cA7uxz.js")), Gg = Y(() => import("./BiliMessagePanel-2Ic2UP1S.js")), Vg = Y(() => import("./ModelPricingCard-Bx1JbbkL.js")), Ug = Y(() => import("./BilibiliWorkspace-3mKKzOCc.js")), Yg = Y(() => import("./YouTubeCard-yb4RGuQ8.js").then((e) => e.Y)), Xg = Y(() => import("./AihotFeed-7JLLGkMx.js")), qg = Y(() => import("./GitHubTrending-CJkKPnJm.js")), Jg = Y(() => import("./AiDialog-Dkm0ShfZ.js")), Zg = Y(() => import("./AihotViewer-Beh8FWe7.js")), Qg = Y(() => import("./NavWheelOverlay-Cvnqbrcg.js")), em = Y(() => import("./StandaloneHost-Cb9Y6vV8.js")), tm = Y(() => import("./LauncherFolderDialog-CaesVN5A.js")), om = Y(() => import("./LauncherMenus-CGXjDr8J.js"));
function ce(e, t, o, i) {
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
      const g = l.innerHTML, f = si(o);
      f.config.errorHandler = (c, h, L) => {
        console.error(`LogicWeaver Vue feature failed: ${t.id} (${L})`, c), l.dataset.vueError = "1";
      };
      try {
        f.mount(l), i?.setMounted?.(!0);
      } catch (c) {
        throw i?.setMounted?.(!1), l.innerHTML = g, c;
      }
      return () => {
        i?.setMounted?.(!1), f.unmount();
      };
    }
  });
}
function nm(e) {
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
      const o = si(zh);
      let i = !1;
      const a = () => {
        e.stop("intro");
      };
      window.addEventListener("logicweaver:intro-complete", a, { once: !0 }), o.mount(t);
      const l = window.setTimeout(() => {
        wt.finish("基础界面已就绪，在线服务继续后台加载", !0), window.setTimeout(() => {
          i || (a(), t?.remove(), document.body.classList.remove("is-starting"));
        }, 600);
      }, 8e3);
      return () => {
        i || (i = !0, clearTimeout(l), window.removeEventListener("logicweaver:intro-complete", a), o.unmount(), t.remove(), document.body.classList.remove("is-starting"));
      };
    }
  }), ce(e, { id: "spa-app", title: "纯血 SPA 单根调度器", order: 15, root: "vue-spa-root", capabilities: ["ui:spa-root", "workspace:keepalive"] }, Wh), document.getElementById("vue-spa-root") || ce(e, { id: "bili-companions", title: "b站伴随窗口", order: 19, root: "vue-bili-companions-root", capabilities: ["ui:dock-companion"] }, em), ce(e, { id: "notifications", title: "通知中心", order: 20, root: "vue-notification-root", capabilities: ["ui:toast", "notification:dedupe"] }, $s), ce(e, { id: "profile-menu", title: "头像右键菜单", order: 21, root: "bili-profile-menu", capabilities: ["ui:profile-menu", "profile:actions"] }, Gh, Fo), ce(e, { id: "workspace-launchers", title: "常用工作区启动项", order: 22, root: "workspace-launchers", capabilities: ["ui:workspace-launchers", "workspace:launch"] }, Vh, hi), ce(e, { id: "mac-dock", title: "底部快捷应用 Dock 栏", order: 23, root: "mac-dock", capabilities: ["ui:mac-dock", "dock:navigate"] }, Ls, Lt), ce(e, { id: "hero-clock", title: "首屏中央时钟", order: 26, root: "hero-clock", capabilities: ["ui:hero-clock", "clock:read"] }, ys), ce(e, { id: "search-box", title: "首屏搜索框", order: 27, root: "search", capabilities: ["ui:search-box", "search:actions"] }, ji), ce(e, { id: "home-music", title: "首屏音乐播放器", order: 28, root: "task-thread-home", capabilities: ["ui:home-music", "music:playback"] }, ws, Qe), ce(e, { id: "launcher-groups", title: "常用网站分组架", order: 29, root: "launcher-groups", capabilities: ["ui:launcher-groups", "launcher:navigate"] }, xs, ze), ce(e, { id: "weather-widget", title: "首屏天气小部件", order: 39, root: "weather-body", capabilities: ["ui:weather-widget", "weather:read"] }, vs), ce(e, { id: "github-workspace", title: "GitHub 独立页 Vue 工作台", order: 49, root: "vue-github-workspace-root", capabilities: ["ui:github-workspace"] }, Pg), ce(e, { id: "github-status", title: "GitHub 同步状态", order: 50, root: "vue-github-status-root", capabilities: ["ui:github-status", "github:sync-read"] }, Jh, li), ce(e, { id: "github-folders", title: "GitHub 文件夹导航", order: 55, root: "gh-folder-list", capabilities: ["ui:github-folders", "github:categorize-drop"] }, yf, ao), ce(e, { id: "github-hero", title: "GitHub 分类摘要", order: 56, root: "gh-hero", capabilities: ["ui:github-summary", "github:actions"] }, Rf, Ao), ce(e, { id: "github-repositories", title: "GitHub 仓库列表", order: 57, root: "vue-github-repositories-root", capabilities: ["ui:github-repositories", "github:repository-actions", "github:paging"] }, _g, At), ce(e, { id: "github-batch-bar", title: "GitHub Star 批量操作工具栏", order: 58, root: "gh-batch-bar", capabilities: ["ui:github-batch-bar", "github:batch-actions"] }, Eg, Eo), ce(e, { id: "notification-center", spaOwned: !0, title: "持久通知中心", order: 71, root: "vue-notification-center-root", capabilities: ["ui:notification-history", "notification:read"] }, Wg, Pt), ce(e, { id: "tab-manager", spaOwned: !0, title: "独立标签页管理", order: 71, root: "vue-tab-manager-root", capabilities: ["ui:tab-manager", "tabs:explicit"] }, Rg, cs), ce(e, { id: "bookmark-menu", title: "书签上下文操作与备注菜单", order: 72, root: "vue-bookmark-menu-root", capabilities: ["ui:bookmark-menu", "bookmark:edit"] }, Ng, ri), ce(e, { id: "launcher-dialogs", title: "快捷启动器管理弹窗族", order: 73, root: "vue-launcher-dialogs-root", capabilities: ["ui:launcher-dialogs", "launcher:manage"] }, Bg, qi), ce(e, { id: "launcher-folder-dialog", title: "大文件夹展开视窗", order: 74, root: "vue-launcher-folder-root", capabilities: ["ui:launcher-folder", "launcher:folder-dialog"] }, tm, Ji), ce(e, { id: "launcher-menus", title: "启动器快捷上下文菜单族", order: 76, root: "vue-launcher-menus-root", capabilities: ["ui:launcher-menus", "launcher:context-menu"] }, om, ci), ce(e, { id: "bookmark-panel", title: "浏览器书签侧边滑动视窗", order: 77, root: "vue-bookmark-panel-root", capabilities: ["ui:bookmark-panel", "bookmarks:panel"] }, Og, wn), ce(e, { id: "bookmark-folder-strip", spaOwned: !0, title: "顶栏书签快捷文件夹横条", order: 78, root: "vue-bookmark-folder-strip-root", capabilities: ["ui:bookmark-folder-strip", "bookmarks:strip"] }, null, fn), ce(e, { id: "settings-page", title: "独立设置页 Vue 工作台", order: 79, root: "vue-options-root", capabilities: ["ui:settings-page"] }, Hg), ce(e, { id: "settings-dialog", title: "全局设置中心视窗", order: 80, root: "vue-settings-dialog-root", capabilities: ["ui:settings-dialog", "settings:manage"] }, Fg, bn), ce(e, { id: "clock-settings-menu", spaOwned: !0, title: "中央时钟偏好配置菜单", order: 82, root: "vue-clock-settings-root", capabilities: ["ui:clock-settings", "clock:preference-edit"] }, Kg, Vt), ce(e, { id: "bili-theater-dialog", title: "Bilibili 沉浸剧场与评论区弹窗", order: 85, root: "vue-bili-theater-root", capabilities: ["ui:bili-theater", "bili:playback"] }, jg, Po), ce(e, { id: "bili-mini-player", title: "Bilibili 悬浮迷你播放器", order: 85, root: "vue-bili-mini-player-root", capabilities: ["ui:bili-mini-player", "bili:playback"] }, zg), ce(e, { id: "ai-dialog", title: "AI 助手对话框与知识点抽屉", order: 86, root: "vue-ai-dialog-root", capabilities: ["ui:ai-dialog", "ai:chat"] }, Jg, fi), ce(e, { id: "aihot-viewer", spaOwned: !0, title: "AI HOT 资讯文章阅读器", order: 88, root: "vue-aihot-viewer-root", capabilities: ["ui:aihot-viewer", "viewer:aihot"] }, Zg, ui), ce(e, { id: "nav-wheel", title: "辐射状快捷动作轮盘与悬浮球", order: 95, root: "vue-nav-wheel-root", capabilities: ["ui:nav-wheel", "nav:radial-menu"] }, Qg, Ee), ce(e, { id: "bili-message-panel", spaOwned: !0, title: "Bilibili 消息与互动通知中心", order: 102, root: "vue-bili-message-panel-root", capabilities: ["ui:bili-message-panel", "bili:messages"] }, Gg, zt), ce(e, { id: "pricing-radar", spaOwned: !0, title: "模型插件 (AI 定价与排行榜)", order: 108, root: "vue-pricing-root", capabilities: ["ui:pricing-radar", "pricing:read"] }, Vg, ts), ce(e, { id: "bili-favorites", spaOwned: !0, title: "b站插件 Vue 外壳", order: 110, root: "vue-bili-favorites-root", capabilities: ["ui:bili-favorites-shell", "bilibili:favorites"] }, Ug, Qi), ce(e, { id: "youtube-card", spaOwned: !0, title: "YouTube 订阅与探索工作台", order: 111, root: "vue-youtube-root", capabilities: ["ui:youtube-card", "youtube:updates"] }, Yg, os), ce(e, { id: "aihot-feed", spaOwned: !0, title: "AI HOT 资讯流全功能聚合看板", order: 112, root: "vue-aihot-root", capabilities: ["ui:aihot-feed", "aihot:aggregate"] }, Xg, es), ce(e, { id: "github-trending", spaOwned: !0, title: "GitHub 趋势榜与热门流", order: 114, root: "vue-github-trending-root", capabilities: ["ui:github-trending", "github:trending"] }, qg, ds);
}
Rs();
const Cn = Da(kn);
ar(kn, Cn);
rr(kn);
nm(Cn);
ai.loadBookmarks();
(async () => {
  document.getElementById("vue-bili-favorites-root") && !document.getElementById("vue-spa-root") && await import("./bilibili-channel.service-B92QWCQV.js"), await Wa(), await Cn.startEager(), wt.notifyBootReady();
})().catch((e) => console.error("[LogicWeaver] 页面启动失败", e));
window.addEventListener("pagehide", () => {
  Cn.stopAll();
}, { once: !0 });
export {
  xi as C,
  Np as D,
  yf as G,
  Ro as L,
  bs as T,
  zh as _,
  ds as a,
  Rf as b,
  cs as c,
  Vt as d,
  Li as e,
  Sm as f,
  Kf as g,
  Ne as h,
  fi as i,
  Ye as j,
  Ee as k,
  yn as l,
  _s as m,
  ie as n,
  Cs as o,
  ks as p,
  Vh as q,
  Gh as r,
  ms as s,
  dn as t,
  ni as u,
  Yn as v,
  je as w,
  gs as x,
  kn as y
};
