import { S as Ai, i as Ws } from "./SearchBox-BOrHTUt_.js";
/* empty css                */
import { c as Gn, r as _e, a as Tt, w as Oe, b as j, d as de, o as l, e as ce, f as io, u as s, g as p, h as n, i as E, T as Rs, t as u, F as Y, j as fe, k as H, l as yt, m as Ft, n as He, v as Ns, p as Ye, q as so, s as Ei, x as Os, y as oe, z as It, A as ao, B as ke, C as le, D as Ve, E as Z, G as V, H as vt, I as _o, J as Pi, K as qo, L as Fe, M as lo, N as Wi, O as Bs } from "./vendor-vue-dDCd4-uG.js";
import { W as Xo, t as Yt, p as un, n as we, a as Mo, b as St, h as Ue, m as gt, c as ii, d as Wn, s as pn, e as si, f as Fs, g as Hs, i as js, j as zs, k as X, l as Ri, o as po, q as Ni, r as Lt, u as Gs, v as co, w as qt, x as Do, y as Ks, z as Vs, A as Ao, B as Us } from "./view-styles-BEWDJ4UY.js";
import { l as Ys, r as qs, G as Xs, a as se, b as nn, f as Jo, c as Kn, s as Js, d as Zs, e as Vn, g as Zo, h as Un, i as Wt, j as Lo, k as _t, m as $o, n as Xt, o as Pe, p as Qs, q as tt, t as st, u as Ct, v as Co, R as ea, w as ta, x as Mt, y as Pt, z as $e, A as oa, B as zt } from "./search.service-CLxaKgY7.js";
import { f as Xe, l as xt, a as Me, p as na, b as no, c as Yn, y as Oi, d as re, e as ho } from "./youtube-store-CnogoW0y.js";
import { c as ia, a as sa, t as aa, b as ra, d as la, e as ca, f as Jt, g as da } from "./calendar.service-WWY1Oc-j.js";
import { w as Ae, s as qn, P as ua, i as Qo, D as hn, a as ai, g as Je, p as pa, L as ha, b as Dt, c as ga, d as gn, t as ri, e as fa, f as ma, h as Io, l as Bi } from "./window-manager.store-BaRzBtVM.js";
import { s as sn, a as va, b as ya, u as Fi } from "./InlineEditStatus.vue_vue_type_style_index_0_scoped_28642927_lang-DMGLRgln.js";
import { b as So, a as wa, c as ba } from "./up-group-manager-store-DlS_MJ_v.js";
import { biliMessagePanelController as Rt, biliMessagePanelState as ka } from "./message-panel-store-DTiaxa8l.js";
import { b as Hi, r as _a, a as go } from "./bili-favorites-store-BrCy3Dtt.js";
import { a as Xn, b as ji, c as Ca } from "./aihot-feed-store-CMoIIxm_.js";
import { p as zi } from "./pricing-store-D3L5FER9.js";
import { R as xa } from "./read-session-Bp6OONld.js";
import { t as c, c as ct, _ as De } from "./_plugin-vue_export-helper-CLaxNhZQ.js";
import { f as Nt } from "./fullscreen-cards.store-2NAh7lrs.js";
import { k as La, m as $a } from "./core-utils-Ccz-tarm.js";
import { t as lt } from "./together-listen.store-xmeq8u2b.js";
import { C as Sa } from "./ChatShareMenu-DfN8XMTI.js";
const Ta = /^[a-z][a-z0-9]*(?:[.:-][a-z0-9]+)*$/;
function Ia() {
  const e = /* @__PURE__ */ new Map(), t = /* @__PURE__ */ new Map();
  function o(d) {
    if (!d || !Ta.test(d.id)) throw new TypeError(`Invalid command id: ${d?.id || ""}`);
    if (!d.title?.trim() || !d.category?.trim() || typeof d.run != "function")
      throw new TypeError(`Command ${d.id} requires title, category and run()`);
    if (e.has(d.id)) throw new Error(`Command already registered: ${d.id}`);
    return e.set(d.id, Object.freeze({
      ...d,
      description: d.description || "",
      keywords: Object.freeze([...d.keywords || []]),
      concurrency: d.concurrency || "replace"
    })), () => {
      i(d.id), e.delete(d.id);
    };
  }
  function i(d) {
    const h = t.get(d);
    return h ? (h.abort(), t.delete(d), !0) : !1;
  }
  async function a(d, h, b = "api") {
    const M = e.get(d);
    if (!M) throw new Error(`Unknown command: ${d}`);
    if (M.enabled && !M.enabled()) return;
    const v = M.concurrency || "replace";
    if (t.has(d)) {
      if (v === "drop") return;
      v === "replace" && i(d);
    }
    const x = new AbortController();
    v !== "parallel" && t.set(d, x);
    try {
      return await M.run(h, { signal: x.signal, source: b });
    } finally {
      t.get(d) === x && t.delete(d);
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
  function g(d, h = 20) {
    const b = String(d || "").trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
    if (!b.length) return m().slice(0, h);
    const M = [...e.values()].map((v) => {
      const x = r(v), f = x.title.toLocaleLowerCase(), C = `${x.id} ${f} ${x.category} ${x.description} ${x.keywords.join(" ")}`.toLocaleLowerCase();
      if (!b.every((y) => C.includes(y))) return null;
      let I = 0;
      for (const y of b)
        x.id === y ? I += 200 : x.id.startsWith(y) && (I += 120), f === y ? I += 160 : f.startsWith(y) ? I += 100 : f.includes(y) && (I += 60), x.keywords.some((_) => _.toLocaleLowerCase().startsWith(y)) && (I += 40);
      return { item: x, score: I };
    }).filter((v) => !!v);
    return M.sort((v, x) => x.score - v.score || v.item.title.localeCompare(x.item.title, "zh")), Object.freeze(M.slice(0, Math.max(1, h)).map((v) => v.item));
  }
  return Object.freeze({ register: o, execute: a, cancel: i, has: (d) => e.has(d), list: m, search: g });
}
const an = Ia(), Ma = /^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/;
function Da(e) {
  const t = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map();
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
      d(v.id), a.delete(v.id), t.delete(v.id);
    };
  }
  function m(v) {
    return typeof v == "function" ? v : v && typeof v.unmount == "function" ? () => v.unmount() : () => {
    };
  }
  function g(v) {
    if (o.has(v)) return Promise.resolve(o.get(v)?.cleanup);
    if (i.has(v)) return i.get(v);
    const x = t.get(v);
    if (!x) return Promise.reject(new Error(`Unknown feature: ${v}`));
    a.delete(v);
    const f = new AbortController(), C = Object.freeze({
      signal: f.signal,
      commands: e,
      getRoot: (y) => document.getElementById(y)
    }), I = Promise.resolve().then(() => x.mount(C)).then((y) => (i.delete(v), o.set(v, { cleanup: y, controller: f }), y), (y) => {
      throw i.delete(v), a.set(v, y), f.abort(), y;
    });
    return i.set(v, I), I;
  }
  async function d(v) {
    const x = i.get(v);
    if (x)
      try {
        await x;
      } catch {
        return;
      }
    const f = o.get(v);
    f && (o.delete(v), f.controller.abort(), await m(f.cleanup)());
  }
  async function h() {
    const v = typeof document < "u" && !!(document.getElementById("vue-spa-root") || document.getElementById("logicweaver-spa-root")), x = [...t.values()].filter((I) => !(!I.eager || !v && I.roots && I.roots.length > 0 && !I.roots.some((_) => !!document.getElementById(_)))).sort((I, y) => (I.order || 100) - (y.order || 100)), C = (await Promise.allSettled(x.map((I) => g(I.id)))).flatMap((I, y) => I.status === "rejected" ? [{ id: x[y].id, reason: I.reason }] : []);
    C.length && console.warn("LogicWeaver Vue features failed to mount", C);
  }
  async function b() {
    const v = [...o.keys()].reverse();
    await Promise.allSettled(v.map(d));
  }
  function M() {
    return Object.freeze([...t.values()].map((v) => Object.freeze({
      id: v.id,
      title: v.title,
      order: v.order || 100,
      eager: v.eager === !0,
      roots: Object.freeze([...v.roots || []]),
      capabilities: Object.freeze([...v.capabilities || []]),
      status: i.has(v.id) ? "mounting" : o.has(v.id) ? "mounted" : a.has(v.id) ? "failed" : "registered",
      error: a.has(v.id) ? String(a.get(v.id)?.message || a.get(v.id) || "Feature mount failed") : ""
    })).sort((v, x) => v.order - x.order));
  }
  return Object.freeze({ register: r, start: g, startEager: h, stop: d, stopAll: b, has: (v) => t.has(v), list: M });
}
const Aa = localStorage.getItem("startupAnimationStyle") || localStorage.getItem("logicweaverStartupStyle") || "endfield", li = (() => {
  try {
    const e = localStorage.getItem("showStartupAnimation"), t = localStorage.getItem("logicweaverEndfieldLoader"), o = e ?? t;
    return o === "1" || o === "true";
  } catch {
    return !1;
  }
})(), Q = _e({
  enabled: li,
  style: Aa === "rhinelab" ? "rhinelab" : "endfield",
  renderedProgress: 4,
  targetProgress: 4,
  status: "CORE SHELL...",
  finished: !li,
  exiting: !1,
  forced: !1
});
let ro = 0, en = 4, Gi = performance.now(), Rn = 0, jo = null, Nn = !1;
function Ki(e) {
  const t = e - Gi, o = Rn ? Math.min(1, t / Rn) : 1, i = o * o * (3 - 2 * o);
  Q.renderedProgress = en + (Q.targetProgress - en) * i, o < 1 && !Q.finished ? ro = requestAnimationFrame(Ki) : ro = 0;
}
function zo(e, t) {
  if (!Q.enabled || Q.finished) return;
  const o = Math.max(Q.targetProgress, Math.max(4, Math.min(100, Number(e) || 4)));
  t && (Q.status = t), en = Q.renderedProgress, Q.targetProgress = o, Gi = performance.now(), Rn = Math.max(280, Math.min(920, 220 + Math.abs(o - en) * 7.5)), cancelAnimationFrame(ro), ro = requestAnimationFrame(Ki);
}
function rn(e = "Ready", t = !1) {
  Q.finished || (Q.finished = !0, Q.forced = t, Q.status = e, Q.targetProgress = 100, cancelAnimationFrame(ro), ro = 0, Q.renderedProgress = 100, jo?.(t));
}
function Ea(e = "KEYBOARD SKIP") {
  rn(e, !0);
}
function Pa() {
  Q.enabled || rn("BOOT COMPLETE", !0);
}
function Vi() {
  !Q.enabled || Q.finished || Nn || (Nn = !0, zo(38, "INITIALIZING CORE SHELL..."), setTimeout(() => {
    Q.finished || zo(76, "SYNTHESIZING RUNTIME...");
  }, 400), setTimeout(() => {
    Q.finished || zo(100, Q.style === "rhinelab" ? "ID CONFIRMED : JOYCE MOORE" : "TERRA LINK READY / 终端就绪");
  }, 900), setTimeout(() => {
    Q.finished || rn("BOOT COMPLETE / 首页就绪", !1);
  }, 1650));
}
async function Wa() {
  if (document.getElementById("vue-spa-root")) {
    try {
      const e = await chrome.storage.local.get(["showStartupAnimation", "startupAnimationStyle"]);
      typeof e.showStartupAnimation == "boolean" && (Q.enabled = e.showStartupAnimation, localStorage.setItem("showStartupAnimation", Q.enabled ? "1" : "0"), localStorage.setItem("logicweaverEndfieldLoader", Q.enabled ? "1" : "0")), (e.startupAnimationStyle === "endfield" || e.startupAnimationStyle === "rhinelab") && (Q.style = e.startupAnimationStyle, localStorage.setItem("startupAnimationStyle", Q.style));
    } catch {
      console.warn("[Intro] Startup preferences unavailable; using first-paint preference.");
    }
    Q.finished = !Q.enabled, document.documentElement.dataset.startupStyle = Q.style, document.documentElement.classList.toggle("skip-endfield-loader", !Q.enabled), document.body.classList.toggle("is-starting", Q.enabled);
  }
}
const ot = Tt(Q), ut = Object.freeze({
  update: zo,
  finish: rn,
  skip: Ea,
  notifyBootReady: Pa,
  async playIntro(e) {
    if (e?.style && (Q.style = e.style), typeof document < "u" && (document.documentElement.dataset.startupStyle = Q.style, document.documentElement.classList.remove("skip-endfield-loader"), document.body.classList.add("is-starting")), Q.enabled = !0, Q.finished = !1, Q.forced = !!e?.force, Q.renderedProgress = 4, Q.targetProgress = 4, Nn = !1, typeof document < "u") {
      let t = document.getElementById("endfield-loader");
      if (!t) {
        t = document.createElement("div"), t.id = "endfield-loader", t.className = "endfield-loader notranslate", document.body.appendChild(t);
        const { default: o } = await import("./IntroAnimation-V4b6cgYl.js"), i = Gn(o), a = () => {
          window.removeEventListener("logicweaver:intro-complete", a), i.unmount(), t?.remove(), document.body.classList.remove("is-starting");
        };
        window.addEventListener("logicweaver:intro-complete", a, { once: !0 }), i.mount(t);
      }
    }
    Vi();
  },
  get enabled() {
    return Q.enabled;
  },
  get finished() {
    return Q.finished;
  }
});
function Ra(e) {
  return jo = e, Q.finished && e(Q.forced), () => {
    jo === e && (jo = null);
  };
}
const Ui = [
  { date: "今天", dayName: "周四", emoji: "🌤️", condition: "多云", highTemp: 26, lowTemp: 18, rainProb: 15 },
  { date: "明天", dayName: "周五", emoji: "⛅", condition: "阴天", highTemp: 24, lowTemp: 17, rainProb: 30 },
  { date: "后天", dayName: "周六", emoji: "🌧️", condition: "小雨", highTemp: 21, lowTemp: 16, rainProb: 75 },
  { date: "周日", dayName: "周日", emoji: "🌦️", condition: "阵雨", highTemp: 23, lowTemp: 15, rainProb: 45 },
  { date: "周一", dayName: "周一", emoji: "☀️", condition: "晴天", highTemp: 27, lowTemp: 18, rainProb: 10 },
  { date: "周二", dayName: "周二", emoji: "🌤️", condition: "多云", highTemp: 28, lowTemp: 19, rainProb: 15 },
  { date: "周三", dayName: "周三", emoji: "☀️", condition: "晴天", highTemp: 29, lowTemp: 20, rainProb: 5 }
], Yi = "lw_weather_snapshot_v1";
function Na() {
  if (typeof window > "u" || typeof localStorage > "u") return null;
  try {
    const e = localStorage.getItem(Yi);
    if (!e) return null;
    const t = JSON.parse(e);
    if (t && t.data && t.data.currentTemp !== void 0)
      return {
        state: "ready",
        city: t.city || t.data.cityName || "",
        data: t.data,
        forecastDays: Array.isArray(t.forecastDays) && t.forecastDays.length ? t.forecastDays : Ui,
        detailInfo: t.detailInfo || null,
        updatedAt: t.savedAt || Date.now()
      };
  } catch {
  }
  return null;
}
function Eo(e) {
  if (!(typeof window > "u" || typeof localStorage > "u"))
    try {
      e.data && localStorage.setItem(
        Yi,
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
    forecastDays: e?.forecastDays || Ui,
    detailInfo: e?.detailInfo || {
      humidity: "62%",
      wind: "东北风 2级",
      uvIndex: "中等 (4)",
      airQuality: "优 (32)"
    }
  };
}, K = _e(Oa());
let fn = null, mn = null;
const it = {
  get snapshot() {
    return Tt(K);
  },
  update(e) {
    Object.assign(K, e), Eo(K);
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
    }), Eo(K);
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
    })) : [], Eo(K);
  },
  setDetailInfo(e) {
    K.detailInfo = { ...e }, Eo(K);
  },
  applyCity(e) {
    typeof window < "u" && window.dispatchEvent(new CustomEvent("logicweaver:weather-city-selected", { detail: { city: e } })), this.refresh();
  },
  refresh() {
    fn ? fn() : typeof window < "u" && window.dispatchEvent(new CustomEvent("logicweaver:weather-refresh"));
  },
  changeLocation(e) {
    mn ? mn(e) : typeof window < "u" && window.dispatchEvent(new CustomEvent("logicweaver:weather-change-location", { detail: { clientX: e?.clientX, clientY: e?.clientY } }));
  },
  setRefreshAction(e) {
    fn = e;
  },
  setChangeLocationAction(e) {
    mn = e;
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
}), be = _e(Ba());
let vn = null;
const Zt = {
  get snapshot() {
    return Tt(be);
  },
  update(e) {
    Object.assign(be, e);
  },
  updateTime(e, t, o, i) {
    be.timeText = e, be.secsText = t, be.greetingText = o, be.dateText = i, be.updatedAt = Date.now();
  },
  applyConfig(e) {
    e.fontFamily !== void 0 && (be.fontFamily = e.fontFamily), e.colorHex !== void 0 && (be.colorHex = e.colorHex), e.greetColor !== void 0 && (be.greetColor = e.greetColor), e.dateColor !== void 0 && (be.dateColor = e.dateColor), e.isBlack !== void 0 && (be.isBlack = e.isBlack), e.isCustomColor !== void 0 && (be.isCustomColor = e.isCustomColor), be.updatedAt = Date.now();
  },
  openSettings(e) {
    vn ? vn(e) : window.dispatchEvent(new CustomEvent("logicweaver:clock-open-settings", { detail: { clientX: e?.clientX, clientY: e?.clientY } }));
  },
  setOpenSettingsAction(e) {
    vn = e;
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
}), yn = _e(Ha());
let Po = {};
const Jn = {
  getSnapshot() {
    return Tt(yn);
  },
  update(e) {
    Object.assign(yn, e);
  },
  setMounted(e) {
    yn.mounted = e;
  },
  openWorkspace(e, t = !1) {
    if (Po.open) {
      Po.open(e);
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
    Po = { ...Po, ...e };
  }
}, wn = _e({ visible: !1, pendingWrites: 0 });
async function ja(e) {
  if (wn.pendingWrites) throw new Error("壁纸操作正在处理，未自动排队");
  wn.pendingWrites++;
  try {
    return await e();
  } finally {
    wn.pendingWrites--;
  }
}
const ci = {
  openDialog() {
    Ae.open("wallpaper");
  },
  closeDialog() {
    Ae.close("wallpaper");
  },
  resetDefault() {
    return ja(() => Xo.clearWallpaper());
  }
}, di = [
  { id: "mono", label: "极简等宽", font: "ui-monospace, 'SF Mono', 'JetBrains Mono', Menlo, Consolas, monospace", sample: "15:50:10" },
  { id: "sans", label: "现代无衬线", font: "-apple-system, BlinkMacSystemFont, 'Segoe UI Variable Display', 'Segoe UI', Roboto, 'PingFang SC', sans-serif", sample: "15:50:10" },
  { id: "din", label: "经典几何", font: "'DIN Alternate', 'DIN Pro', 'Franklin Gothic Medium', Futura, sans-serif", sample: "15:50:10" },
  { id: "digital", label: "数码管等宽", font: "'Courier New', Courier, monospace", sample: "15:50:10" },
  { id: "impact", label: "硬派力量", font: "Impact, 'Arial Black', 'Trebuchet MS', sans-serif", sample: "15:50:10" },
  { id: "serif", label: "典雅衬线", font: "'Playfair Display', Georgia, 'Times New Roman', serif", sample: "15:50:10" },
  { id: "rounded", label: "圆润亲和", font: "'Quicksand', 'Comic Sans MS', 'Segoe UI', sans-serif", sample: "15:50:10" }
], ui = [
  { id: "white", label: "纯净皓白 (默认)", hex: "#ffffff" },
  { id: "black", label: "曜石极黑", hex: "#0f172a" },
  { id: "gold", label: "香槟金砂", hex: "#f59e0b" },
  { id: "cyan", label: "科技青蓝", hex: "#38bdf8" },
  { id: "emerald", label: "翡翠竹绿", hex: "#10b981" },
  { id: "rose", label: "淡雅樱粉", hex: "#fb7185" }
], km = [
  { id: "local", label: "📍 本地系统时区", offset: "Local" },
  { id: "Asia/Shanghai", label: "🇨🇳 北京 / 香港", offset: "UTC+8" },
  { id: "Asia/Tokyo", label: "🇯🇵 东京 / 首尔", offset: "UTC+9" },
  { id: "Europe/London", label: "🇬🇧 伦敦 / 格林威治", offset: "UTC+0/+1" },
  { id: "Europe/Paris", label: "🇫🇷 巴黎 / 柏林", offset: "UTC+1/+2" },
  { id: "America/New_York", label: "🇺🇸 纽约 / 东部时间", offset: "UTC-5/-4" },
  { id: "America/Los_Angeles", label: "🇺🇸 洛杉矶 / 西部时间", offset: "UTC-8/-7" },
  { id: "Australia/Sydney", label: "🇦🇺 悉尼", offset: "UTC+10/+11" },
  { id: "UTC", label: "🌐 协调世界时 (UTC)", offset: "UTC" }
], Se = _e({
  mounted: !1,
  isOpen: !1,
  x: 200,
  y: 200,
  font: "mono",
  color: "white",
  timezone: "local"
});
let bn = null;
const Ot = {
  state: Se,
  setMounted(e) {
    Se.mounted = e;
  },
  onAction(e) {
    bn = e;
  },
  dispatch(e, t) {
    if (bn)
      return bn(e, t);
  },
  open(e) {
    const i = typeof window < "u" ? window.innerWidth : 1280, a = typeof window < "u" ? window.innerHeight : 800, r = e?.clientX ?? e?.x ?? i / 2, m = e?.clientY ?? e?.y ?? a / 2, g = Math.max(12, Math.min(r - 40, i - 290 - 12)), d = Math.max(12, Math.min(m + 10, a - 420 - 12));
    Se.x = g, Se.y = d, Se.isOpen = !0, this.dispatch("open", { x: g, y: d });
  },
  close() {
    Se.isOpen = !1, this.dispatch("close");
  },
  setFont(e) {
    Se.font = e;
    const t = di.find((o) => o.id === e);
    if (t) {
      Zt.applyConfig({ fontFamily: t.font });
      try {
        localStorage.setItem("lw_clock_font", e);
      } catch {
      }
    }
    this.dispatch("change", { font: e, color: Se.color, timezone: Se.timezone });
  },
  setColor(e) {
    Se.color = e;
    const t = ui.find((o) => o.id === e);
    if (t) {
      Zt.applyConfig({
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
    this.dispatch("change", { font: Se.font, color: e, timezone: Se.timezone });
  },
  setTimezone(e) {
    Se.timezone = e;
    try {
      localStorage.setItem("lw_clock_tz", e);
    } catch {
    }
    this.dispatch("change", { font: Se.font, color: Se.color, timezone: e });
  },
  initPreferences() {
    try {
      const e = localStorage.getItem("lw_clock_font");
      if (e) {
        Se.font = e;
        const i = di.find((a) => a.id === e);
        i && Zt.applyConfig({ fontFamily: i.font });
      }
      const t = localStorage.getItem("lw_clock_color");
      if (t) {
        Se.color = t;
        const i = ui.find((a) => a.id === t);
        i && Zt.applyConfig({ colorHex: i.hex, greetColor: i.hex, dateColor: i.hex, isCustomColor: !0 });
      }
      const o = localStorage.getItem("lw_clock_tz");
      o && (Se.timezone = o);
    } catch {
    }
  },
  syncConfig(e) {
    e.font && (Se.font = e.font), e.color && (Se.color = e.color), e.timezone && (Se.timezone = e.timezone);
  }
}, ue = _e({
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
let kn = null, Go = !1;
async function Ko(e, t = {}) {
  if (e === "poll") return { state: "ready", model: ue.model };
  if (e === "connect") return { state: "ready", model: ue.model };
  throw new Error("旧版 AI 对话桥接已退役，请使用「海狸聊天室」开启智能会话。");
}
function qi(e) {
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
  o || (e.state === "connecting" ? o = "正在连接本机 Codex 与 ChatGPT…" : e.state === "disconnected" ? o = "已待命（打开面板自动连接）" : e.authenticated ? o = `就绪 · ChatGPT ${e.plan || "已登录"}` : e.state === "ready" ? o = "就绪 · 尚未登录 ChatGPT" : o = t[e.state] || e.state), ue.statusText = o, ue.authHidden = !e.loginUrl, ue.authCode = e.loginCode || "", ue.authLink = e.loginUrl || "https://auth.openai.com/codex/device", ue.isStreaming = Go || e.busy || e.state === "running";
}
async function za() {
  try {
    const e = await Ko("poll");
    qi(e);
  } catch {
  }
}
async function Ga(e, t) {
  if (e === "open" || e === "connect")
    try {
      ue.statusText = "正在连接本机 Codex 与 ChatGPT…";
      const o = await Ko("connect");
      qi(o);
    } catch (o) {
      ue.statusText = o?.message || "连接失败";
    }
  else if (e === "send" && t?.text) {
    const o = t.text;
    ue.messages.push({
      id: `msg-${Date.now()}`,
      role: "user",
      content: o
    }), ue.inputText = "", ue.isStreaming = !0, Go = !0;
    try {
      await Ko("send", { text: o }), await za();
    } catch (i) {
      ue.statusText = i?.message || "发送失败";
    } finally {
      Go = !1, ue.isStreaming = !1;
    }
  } else if (e === "stop") {
    try {
      await Ko("stop");
    } catch {
    }
    ue.isStreaming = !1, Go = !1;
  }
}
const Zn = {
  state: ue,
  setMounted(e) {
    ue.mounted = e;
  },
  onAction(e) {
    kn = e;
  },
  dispatch(e, t) {
    if (kn)
      return kn(e, t);
    Ga(e, t);
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
}, _n = _e({
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
}), Wo = /* @__PURE__ */ new Set(), Ka = {
  state: _n,
  open(e) {
    Object.assign(_n, e, { open: !0 });
  },
  update(e) {
    Object.assign(_n, e);
  },
  close() {
    Wo.forEach((e) => e("close"));
  },
  save(e) {
    Wo.forEach((t) => t("save", e));
  },
  onAction(e) {
    return Wo.add(e), () => Wo.delete(e);
  }
}, Vo = _e({ isOpen: !1 }), Xi = {
  state: Vo,
  open() {
    Vo.isOpen = !0;
  },
  close() {
    Vo.isOpen = !1;
  }
}, Cn = "biliProfileCacheV1", pt = "biliLocallyKnownMessageIdsV1", Ro = "biliMessageUserCacheV1", fo = "githubKnownReleaseVersionsV1", No = "customNewtabAvatar", pi = "biliToastKnownCountsV1";
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
    !t?.repository || !t?.version || (this.githubKnownVersions[t.repository] = t.version, typeof chrome < "u" && chrome?.storage?.local && await chrome.storage.local.set({ [fo]: this.githubKnownVersions }), this.notifyGitHubListeners());
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
    }), o && typeof chrome < "u" && chrome?.storage?.local && chrome.storage.local.set({ [pt]: this.locallyKnownIds }).catch(() => {
    }), t;
  }
  markKnown(t, o, i) {
    this.locallyKnownIds[t] || (this.locallyKnownIds[t] = []);
    let a = !1;
    o && !this.locallyKnownIds[t].includes(o) && (this.locallyKnownIds[t].push(o), a = !0), i && !this.locallyKnownIds[t].includes(i) && (this.locallyKnownIds[t].push(i), a = !0), a && typeof chrome < "u" && chrome?.storage?.local && chrome.storage.local.set({ [pt]: this.locallyKnownIds }).catch(() => {
    }), this.applyBiliProfile(this.profile, this.unread);
  }
  markAllKnown(t, o = []) {
    this.locallyKnownIds[t] || (this.locallyKnownIds[t] = []);
    const i = new Set(this.locallyKnownIds[t]);
    for (const r of o) r && i.add(r);
    const a = Math.max(0, Number(this.unread?.[t] || 0));
    if (i.size < a) {
      const r = a - i.size;
      for (let m = 0; m < r; m++) i.add(`__pad_${Date.now()}_${m}`);
    }
    this.locallyKnownIds[t] = Array.from(i), typeof chrome < "u" && chrome?.storage?.local && chrome.storage.local.set({ [pt]: this.locallyKnownIds }).catch(() => {
    }), this.applyBiliProfile(this.profile, this.unread);
  }
  applyBiliProfile(t, o = {}) {
    this.profile = t || null, this.unread = o || {};
    const a = this.customAvatar || String(t?.face || "assets/bilibili.svg").replace(/^http:/, "https:"), r = this.getVisibleUnread();
    if (Yt.avatarUrl = a, Yt.userName = t?.uname || "哔哩哔哩用户", Yt.buttonTitle = "通知中心", un.avatarUrl = a, un.userName = t?.uname || "用户", un.mid = t?.mid, typeof document < "u") {
      const m = document.getElementById("bili-profile-avatar");
      m && (m.src = a);
      const g = document.getElementById("bili-profile-button");
      g && (g.title = Yt.buttonTitle);
    }
    Rt.updateState({
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
        const i = {
          mid: o.data.mid,
          uname: o.data.uname,
          face: o.data.face
        }, [a, r, m] = await Promise.allSettled([
          fetch("https://api.bilibili.com/x/msgfeed/unread?build=0&mobi_app=web", { credentials: "include" }).then((x) => x.json()),
          fetch("https://api.vc.bilibili.com/x/im/web/msgfeed/unread", { credentials: "include" }).then((x) => x.json()),
          fetch("https://api.vc.bilibili.com/session_svr/v1/session_svr/single_unread", { credentials: "include" }).then((x) => x.json())
        ]), g = a.status === "fulfilled" ? a.value?.data || {} : {}, d = r.status === "fulfilled" ? r.value?.data || {} : {}, h = m.status === "fulfilled" ? m.value?.data || {} : {}, b = Number(d.at || 0), M = d.reply != null ? Number(d.reply || 0) : Math.max(0, Number(d.recv_reply || 0) - b), v = {
          reply: Math.max(Number(g.reply || 0), M),
          at: Math.max(Number(g.at || 0), b),
          like: Math.max(
            Number(g.like || g.praise || 0),
            Number(d.like || d.recv_like || 0)
          ),
          system: Math.max(Number(g.sys_msg || g.system || 0), Number(d.sys_msg || 0)),
          private: Number(
            g.chat || d.chat || Number(h.follow_unread || 0) + Number(h.unfollow_unread || 0) + Number(h.dustbin_push_msg || 0)
          )
        };
        this.applyBiliProfile(i, v), typeof chrome < "u" && chrome?.storage?.local && await chrome.storage.local.set({ [Cn]: { profile: i, unread: v, savedAt: Date.now() } }), this.checkAndNotifyBiliInteractions(v);
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
      this.biliToastKnownCounts = { ...o }, typeof chrome < "u" && chrome?.storage?.local && chrome.storage.local.set({ [pi]: this.biliToastKnownCounts }).catch(() => {
      });
      return;
    }
    const i = o.private - Number(this.biliToastKnownCounts.private || 0);
    o.like - Number(this.biliToastKnownCounts.like || 0);
    const a = o.reply - Number(this.biliToastKnownCounts.reply || 0), r = o.at - Number(this.biliToastKnownCounts.at || 0);
    o.system - Number(this.biliToastKnownCounts.system || 0), this.biliToastKnownCounts = { ...o }, typeof chrome < "u" && chrome?.storage?.local && chrome.storage.local.set({ [pi]: this.biliToastKnownCounts }).catch(() => {
    }), i > 0 && we.show({
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
        Rt.openPanel();
      }
    }), a > 0 && we.show({
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
        Rt.openPanel();
      }
    }), r > 0 && we.show({
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
        Rt.openPanel();
      }
    });
  }
  init() {
    this.initialized || (this.initialized = !0, Mo.setActions({
      onAction: async (t) => {
        if (t === "messages")
          St.open();
        else if (t === "tabs")
          Xi.open();
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
      Cn,
      pt,
      Ro,
      fo,
      No
    ]).then((t) => {
      this.customAvatar = t[No] || "", this.locallyKnownIds = t[pt] && typeof t[pt] == "object" ? t[pt] : {}, this.userCache = t[Ro] && typeof t[Ro] == "object" ? t[Ro] : {}, this.githubKnownVersions = t[fo] && typeof t[fo] == "object" ? t[fo] : {};
      const o = t[Cn];
      o?.profile ? this.applyBiliProfile(o.profile, o.unread || {}) : this.applyBiliProfile(null, {});
    }).catch(() => {
    }), chrome.storage.onChanged && chrome.storage.onChanged.addListener((t, o) => {
      o === "local" && (t[No] && (this.customAvatar = t[No].newValue || "", this.applyBiliProfile(this.profile, this.unread)), t[pt] && (this.locallyKnownIds = t[pt].newValue || {}, this.applyBiliProfile(this.profile, this.unread)));
    })), Rt.onAction((t, o) => {
      t === "mark-known" ? this.markKnown(o.kind, o.id, o.talkerId) : t === "mark-all-known" && this.markAllKnown(o.kind, o.ids);
    }), this.refreshBiliProfile(), setTimeout(() => {
      this.loadGitHubUpdates();
    }, 3500));
  }
}
const hi = new Va(), pe = _e({ open: !1, loading: !1, error: "", mid: "", name: "", face: "", sign: "", followed: !1, submitting: !1, left: 12, top: 12, videos: [] });
let Oo = null;
const Uo = {
  state: pe,
  open(e, t) {
    Oo = t, Object.assign(pe, { open: !0, loading: !0, error: "", submitting: !1, videos: [] }, e);
  },
  update(e) {
    Object.assign(pe, e);
  },
  close() {
    pe.submitting || (pe.open = !1, Oo = null);
  },
  async toggleFollow() {
    if (!(!Oo || pe.submitting)) {
      pe.submitting = !0;
      try {
        const e = !pe.followed;
        await Oo(e) && (pe.followed = e);
      } finally {
        pe.submitting = !1;
      }
    }
  }
}, Le = _e({
  currentTab: "stars",
  rangeText: "近 7 天",
  sinceDays: 7,
  repos: [],
  isLoading: !1,
  errorMessage: "",
  sourceText: "",
  fetchedAt: 0,
  hasLoaded: !1
}), xn = /* @__PURE__ */ new Set();
let kt;
const mo = new xa();
let gi = !1;
async function Ua(e, t) {
  if (t.throwIfAborted(), new URL(e).origin !== "https://ghapi.h11.dev") throw new Error("Unexpected public source");
  const o = new AbortController(), i = () => o.abort();
  t.addEventListener("abort", i, { once: !0 });
  const a = setTimeout(i, 15e3);
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
    const m = r.body.getReader(), g = new TextDecoder("utf-8", { fatal: !0 });
    let d = 0, h = "";
    try {
      for (; ; ) {
        o.signal.throwIfAborted();
        const b = await m.read();
        if (b.done) break;
        if (d += b.value.byteLength, d > 2 * 1024 * 1024) throw new Error("Public source exceeds limit");
        h += g.decode(b.value, { stream: !0 });
      }
      return o.signal.throwIfAborted(), JSON.parse(h + g.decode());
    } finally {
      m.cancel().catch(() => {
      }), m.releaseLock();
    }
  } finally {
    clearTimeout(a), t.removeEventListener("abort", i);
  }
}
function fi(e, t) {
  const o = e?.name || e?.repository, i = t ? e?.full_name || (typeof o == "string" && o.includes("/") ? o : e?.author && o ? `${e.author}/${o}` : "") : e?.full_name;
  if (typeof i != "string" || !/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(i) || i.split("/").some((g) => g === "." || g === "..")) throw new Error("Invalid repository");
  const [a, r] = i.split("/"), m = (g) => typeof g == "number" && Number.isFinite(g) && g >= 0 ? g : void 0;
  return {
    name: r,
    full_name: i,
    owner: { login: a },
    description: typeof e.description == "string" ? e.description : "",
    language: typeof e.language == "string" ? e.language : "",
    stargazers_count: m(t ? e.stars ?? e.stargazers_count : e.stargazers_count),
    forks_count: m(t ? e.forks ?? e.forks_count : e.forks_count),
    html_url: `https://github.com/${encodeURIComponent(a)}/${encodeURIComponent(r)}`
  };
}
async function Ya(e, t) {
  const o = new Date(Date.now() - e * 864e5).toISOString().slice(0, 10);
  let i = "";
  try {
    const m = await Ys(t), { data: g } = await qs(`/search/repositories?q=${encodeURIComponent(`is:public created:>${o}`)}&sort=stars&order=desc&per_page=30`, { headers: m, signal: t, maxBytes: 2 * 1024 * 1024 });
    if (t.throwIfAborted(), !Array.isArray(g?.items)) throw new Error("Invalid search response");
    return {
      repos: g.items.slice(0, 30).map((d) => fi(d, !1)),
      sourceText: `GitHub Search：UTC 日期 ${o} 之后新建的仓库，按累计 Star 排序；不是官方 Trending 榜。${g.incomplete_results ? " API 标记为不完整结果。" : ""}`
    };
  } catch (m) {
    t.throwIfAborted(), i = m instanceof Xs ? m.message : "主源响应格式无效。";
  }
  const a = e === 1 ? "daily" : e === 7 ? "weekly" : "monthly", r = await Ua(`https://ghapi.h11.dev/repositories?since=${a}`, t);
  if (t.throwIfAborted(), !Array.isArray(r)) throw new Error("Invalid fallback response");
  return {
    repos: r.slice(0, 30).map((m) => fi(m, !0)),
    sourceText: `GitHub Search 不可用：${i} 改用第三方 ghapi.h11.dev 的 ${a} 趋势快照（不发送账号凭据）；口径与新建仓库搜索不同，源更新时间未提供。`
  };
}
const Ji = {
  get state() {
    return Le;
  },
  // Only a mounted, visible View may own network work. Returning keeps the
  // previous result/error; an interrupted request requires explicit refresh.
  attachView(e) {
    mo.cancel(), Le.isLoading = !1, kt = e;
    const t = () => {
      kt === e && mo.pending && (mo.cancel(), Le.isLoading = !1, Le.errorMessage = "读取已暂停，返回后可点击刷新。");
    };
    return e.addEventListener("abort", t, { once: !0 }), !e.aborted && !gi && this.refresh(), () => {
      e.removeEventListener("abort", t), kt === e && (t(), kt = void 0);
    };
  },
  switchTab(e) {
    Le.currentTab = e, this.dispatch("switch-tab", e);
  },
  async switchRange(e, t) {
    !kt || kt.aborted || ![1, 7, 30].includes(e) || e === Le.sinceDays || (mo.cancel(), Object.assign(Le, {
      sinceDays: e,
      rangeText: `近 ${e} 天`,
      repos: [],
      sourceText: "",
      fetchedAt: 0,
      hasLoaded: !1,
      errorMessage: "",
      isLoading: !1
    }), this.dispatch("switch-range", { days: e, text: Le.rangeText }), await this.refresh());
  },
  async refresh() {
    const e = kt;
    if (!e || e.aborted || Le.isLoading) return;
    const t = Le.sinceDays, o = mo.begin({
      signal: e,
      timeoutMs: 45e3,
      isCurrent: () => kt === e && Le.sinceDays === t,
      onStop: (a) => {
        Le.isLoading = !1, a === "timeout" && (Le.errorMessage = "数据源读取超过整体45秒上限，请手动刷新；没有继续请求备用源。");
      }
    }), i = o.current;
    if (i()) {
      gi = !0, Le.isLoading = !0, Le.errorMessage = "";
      try {
        const a = await o.wait(() => Ya(t, o.signal));
        if (!i()) return;
        Le.repos = a.repos, Le.sourceText = a.sourceText, Le.fetchedAt = Date.now(), Le.hasLoaded = !0;
      } catch {
        i() && (Le.errorMessage = Le.hasLoaded ? "刷新失败，保留同一时间范围的上次读取结果；请检查网络或额度后手动刷新。" : "数据源读取失败或超时；未使用内置样例，请稍后手动刷新。");
      } finally {
        o.finish() && (Le.isLoading = !1, this.dispatch("refresh"));
      }
    }
  },
  selectRepo(e) {
    this.dispatch("select-repo", e);
  },
  onAction(e) {
    return xn.add(e), () => {
      xn.delete(e);
    };
  },
  dispatch(e, t) {
    for (const o of xn)
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
}), Qn = () => ({
  visible: !1,
  wedgePath: "",
  arcPath: "",
  line1: { x1: 0, y1: 0, x2: 0, y2: 0 },
  line2: { x1: 0, y1: 0, x2: 0, y2: 0 }
}), J = _e({
  mounted: !1,
  isOpen: !1,
  isExpanded: !1,
  mode: "main",
  ballPosition: { x: 0, y: 0 },
  hub: On(),
  activeSectorId: null,
  sectors: [],
  beam: Qn()
});
let mi = null;
function qa(e, t) {
  if (typeof e != "number" || !t)
    return Qn();
  const o = 160, i = 160, a = 26, r = 154, m = 360 / t, g = e - m / 2, d = e + m / 2, h = g * Math.PI / 180, b = d * Math.PI / 180, M = o + a * Math.cos(h), v = i + a * Math.sin(h), x = o + r * Math.cos(h), f = i + r * Math.sin(h), C = o + a * Math.cos(b), I = i + a * Math.sin(b), y = o + r * Math.cos(b), _ = i + r * Math.sin(b), S = m > 180 ? 1 : 0, R = `M ${M.toFixed(1)} ${v.toFixed(1)} L ${x.toFixed(1)} ${f.toFixed(1)} A ${r} ${r} 0 ${S} 1 ${y.toFixed(1)} ${_.toFixed(1)} L ${C.toFixed(1)} ${I.toFixed(1)} A ${a} ${a} 0 ${S} 0 ${M.toFixed(1)} ${v.toFixed(1)} Z`, B = `M ${x.toFixed(1)} ${f.toFixed(1)} A ${r} ${r} 0 ${S} 1 ${y.toFixed(1)} ${_.toFixed(1)}`;
  return {
    visible: !0,
    wedgePath: R,
    arcPath: B,
    line1: {
      x1: parseFloat(M.toFixed(1)),
      y1: parseFloat(v.toFixed(1)),
      x2: parseFloat(x.toFixed(1)),
      y2: parseFloat(f.toFixed(1))
    },
    line2: {
      x1: parseFloat(C.toFixed(1)),
      y1: parseFloat(I.toFixed(1)),
      x2: parseFloat(y.toFixed(1)),
      y2: parseFloat(_.toFixed(1))
    }
  };
}
const Te = {
  get state() {
    return J;
  },
  getSnapshot() {
    return Tt(J);
  },
  setMounted(e) {
    J.mounted = e;
  },
  setBallPosition(e, t) {
    J.ballPosition.x = e, J.ballPosition.y = t;
  },
  setVisibility(e) {
    J.isOpen = e;
  },
  setHub(e) {
    e ? J.hub = {
      icon: e.icon || "🧭",
      title: e.title || "快捷轮盘",
      desc: e.desc || "移动鼠标选择",
      active: !!e.active
    } : J.hub = On();
  },
  setBeam(e, t) {
    J.beam = qa(e, t);
  },
  setActiveSector(e) {
    J.activeSectorId = e;
  },
  setSectors(e) {
    J.sectors = [...e];
  },
  expand(e, t, o = "main") {
    J.isOpen = !0, J.isExpanded = !0, J.mode = o, typeof e == "number" && typeof t == "number" && this.setBallPosition(e, t);
  },
  collapse() {
    J.isExpanded = !1, J.mode = "main", J.activeSectorId = null, J.beam = Qn(), J.hub = On();
  },
  setWheelMode(e) {
    J.mode = e;
  },
  setActionHandler(e) {
    mi = e;
  },
  dispatch(e, t) {
    mi?.(e, t);
  }
}, Zi = [
  { id: "daily-bilibili", title: "b站插件", desc: "B站收藏夹与追番视频", icon: "assets/bilibili.svg" },
  { id: "daily-pricing", title: "模型插件", desc: "AI 模型定价与排行榜", icon: "assets/nav-pricing.svg" },
  { id: "daily-aihot", title: "ai hot插件", desc: "全网 AI 与前沿科技资讯", icon: "assets/nav-aihot.svg" },
  { id: "folder", title: "常用网站", desc: "点击展开快捷网站子轮盘", icon: "assets/nav-folder.svg", mode: "shortcuts" },
  { id: "card-github", title: "github插件", desc: "GitHub 趋势与星标项目", icon: "assets/nav-github.svg" },
  { id: "launcher", title: "首页", desc: "返回主屏常用应用台", icon: "assets/nav-home.svg" }
];
function Xa() {
  return Zi.filter((e) => e.mode || e.id === "launcher" || Qo(e.id));
}
function Ja() {
  return ua.filter((e) => e.kind === "module" && Qo(e.id)).map((e) => ({
    id: e.id,
    title: e.title,
    desc: e.isDev ? "已启用的实验性组件" : e.categoryLabel,
    icon: e.icon || e.emoji || "🧩",
    tool: e.id
  }));
}
function vi() {
  J.isExpanded && rt();
}
let Bn = [], To = Zi, ht = { x: 400, y: 300 }, Qi = !1, vo = !1, Ln = null, yo = null, at = !1;
const Za = _e(/* @__PURE__ */ new Set()), Qa = /* @__PURE__ */ new Map();
function $t() {
  return globalThis.chrome?.storage;
}
function es(e, t) {
  const o = J.isExpanded ? 160 : 24;
  Te.setBallPosition(
    Math.max(o + 8, Math.min(window.innerWidth - o - 8, e)),
    Math.max(o + 8, Math.min(window.innerHeight - o - 8, t))
  );
}
function rt() {
  const e = J.mode;
  let t = [];
  e === "shortcuts" && (t = [...Bn], t.push({
    id: "toggle-edit-shortcuts",
    title: at ? c("navwheel.finishEdit") : c("navwheel.editSites"),
    desc: at ? c("navwheel.finishEditDesc") : c("navwheel.editSitesDesc"),
    icon: at ? "✅" : "✏️"
  })), To = e === "tools" ? Ja() : e === "shortcuts" ? [
    ...t,
    { id: "back-to-main", title: c("navwheel.back"), desc: c("navwheel.backDesc"), icon: "🔙", mode: "main" }
  ] : Xa();
  const o = To.length, i = o > 12 ? 118 : o > 9 ? 114 : 110, a = o > 12 ? 46 : o > 9 ? 50 : 56;
  Te.setSectors(To.map((r, m) => {
    const g = -90 + 360 / o * m, d = g * Math.PI / 180;
    return {
      id: r.id,
      title: r.title,
      desc: r.desc,
      icon: r.icon,
      angleDeg: g,
      x: Math.round(160 + Math.cos(d) * i),
      y: Math.round(160 + Math.sin(d) * i),
      size: a,
      isShortcut: !!r.url
    };
  })), Te.setWheelMode(e), Te.setActiveSector(null), Te.setBeam(null, 0), Te.setHub(e === "shortcuts" ? at ? { icon: "✏️", title: c("navwheel.editing") } : { icon: "🔙", title: c("navwheel.shortcuts") } : e === "tools" ? { icon: "🧰", title: c("navwheel.tools") } : null);
}
function tn(e) {
  J.mode = e, rt();
}
function Bt() {
  Te.collapse(), es(J.ballPosition.x, J.ballPosition.y), Te.setVisibility(Qi);
}
function Vt(e = J.ballPosition.x, t = J.ballPosition.y, o = "main") {
  Te.expand(void 0, void 0, o), es(e, t), rt(), Te.setVisibility(!0);
}
function er(e) {
  if (e.id === "toggle-edit-shortcuts") {
    ts();
    return;
  }
  if (at && e.url) {
    we.show({
      appName: c("navwheel.appName"),
      title: c("navwheel.editingNotice"),
      message: c("navwheel.editingHint"),
      duration: 2500
    });
    return;
  }
  if (!(e.tool && !Qo(e.tool) || !e.url && !e.mode && e.id !== "launcher" && !Qo(e.id))) {
    if (e.mode) {
      tn(e.mode);
      return;
    }
    if (Bt(), e.url) {
      window.open(e.url, "_blank");
      return;
    }
    if (e.tool) {
      window.triggerToolShortcut?.(e.tool);
      return;
    }
    e.id === "launcher" ? (typeof window < "u" && window.scrollTo({ top: 0, left: 0, behavior: "instant" }), Nt.exit(), document.body && (document.body.dataset.page = "home")) : Nt.enter(e.id);
  }
}
function ts() {
  at = !at, at ? (we.show({
    appName: c("navwheel.appName"),
    title: c("navwheel.enterEditMode"),
    message: c("navwheel.editModeDesc"),
    duration: 5e3
  }), rt()) : (we.show({
    appName: c("navwheel.appName"),
    title: c("navwheel.editDone"),
    message: c("navwheel.editSaved"),
    duration: 2e3
  }), rt());
}
async function tr(e) {
  if (!at || !e || !e.url) return !1;
  try {
    const t = await $t()?.local?.get(["siteShelfLinks", "logicweaverNavWheelShortcutsV1"]), o = Array.isArray(t?.siteShelfLinks) ? t.siteShelfLinks : Array.isArray(t?.logicweaverNavWheelShortcutsV1) ? t.logicweaverNavWheelShortcutsV1 : [], i = o.findIndex((m) => m.url === e.url);
    if (i >= 0) {
      const m = o.filter((g, d) => d !== i);
      return await $t()?.local?.set({ siteShelfLinks: m, logicweaverNavWheelShortcutsV1: m }), await je.loadShortcuts(), rt(), we.show({
        appName: c("navwheel.appName"),
        title: c("navwheel.removedNotice"),
        message: c("navwheel.removedSite", { name: e.title || e.url }),
        duration: 2e3
      }), !0;
    }
    if (o.length >= 12)
      return we.show({
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
    return await $t()?.local?.set({ siteShelfLinks: r, logicweaverNavWheelShortcutsV1: r }), await je.loadShortcuts(), rt(), we.show({
      appName: c("navwheel.appName"),
      title: c("navwheel.addedTitle"),
      message: c("navwheel.addedNotice", { name: a.title }),
      duration: 2500
    }), !0;
  } catch (t) {
    return console.warn("[NavWheel] 即时处理快捷方式失败", t), !1;
  }
}
async function or(e) {
  try {
    const t = await $t()?.local?.get(["siteShelfLinks", "logicweaverNavWheelShortcutsV1"]), o = Array.isArray(t?.siteShelfLinks) ? t.siteShelfLinks : Array.isArray(t?.logicweaverNavWheelShortcutsV1) ? t.logicweaverNavWheelShortcutsV1 : [], i = o.find((r) => String(r.id) === String(e)), a = o.filter((r) => String(r.id) !== String(e));
    await $t()?.local?.set({ siteShelfLinks: a, logicweaverNavWheelShortcutsV1: a }), await je.loadShortcuts(), rt(), i && we.show({
      appName: c("navwheel.appName"),
      title: c("navwheel.removedNotice"),
      message: c("navwheel.removedSite", { name: i.title || c("navwheel.site") }),
      duration: 2500
    });
  } catch (t) {
    console.warn("[NavWheel] 删除快捷方式失败", t);
  }
}
function yi(e) {
  ht = { x: e.clientX, y: e.clientY };
}
function wi(e) {
  e.button === 1 && (e.preventDefault(), e.stopPropagation(), ht = { x: e.clientX, y: e.clientY }, J.isExpanded ? Bt() : Vt(e.clientX, e.clientY));
}
function bi(e) {
  e.button === 1 && e.preventDefault();
}
function ki(e) {
  if (e.key === "Escape") {
    if (at) {
      e.preventDefault(), e.stopPropagation(), at = !1, Za.clear(), Qa.clear(), rt(), we.show({
        appName: c("navwheel.appName"),
        title: c("navwheel.exitedEditing"),
        duration: 1500
      });
      return;
    }
    if (!J.isExpanded || qn.active) return;
    e.preventDefault(), e.stopPropagation(), J.mode === "shortcuts" ? tn("main") : Bt();
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
    const o = se.getCachedIcon(e.url);
    if (o) return o;
    const i = nr(e.url);
    if (i) return i;
  }
  return e.icon || "🔗";
}
const je = {
  async start() {
    if (!vo) {
      vo = !0, Ln = Oe(ct, () => {
        J.isExpanded && rt();
      }), ht = { x: Math.round(window.innerWidth / 2), y: Math.round(window.innerHeight / 2) }, Te.setActionHandler((e, t) => {
        if (e === "hub:click")
          J.isExpanded ? J.mode === "shortcuts" ? tn("main") : Bt() : Vt();
        else if (e === "sector:click" || e === "container:click") {
          const o = To.find((i) => i.id === t?.id || e === "container:click" && i.id === J.activeSectorId);
          o && er(o);
        } else if (e === "sector:hover") {
          const o = J.sectors.find((i) => i.id === t?.id);
          o && (Te.setHub({ icon: o.icon, title: o.title, desc: o.desc, active: !0 }), Te.setActiveSector(o.id), Te.setBeam(o.angleDeg, To.length));
        } else e === "sector:leave" && (Te.setActiveSector(null), Te.setBeam(null, 0), Te.setHub(J.mode === "shortcuts" ? { icon: "🔙", title: c("navwheel.shortcuts") } : J.mode === "tools" ? { icon: "🧰", title: c("navwheel.tools") } : null));
      }), window.addEventListener("logicweaver:dock-modules-changed", vi), window.addEventListener("pointermove", yi, { passive: !0 }), window.addEventListener("mousedown", wi, !0), window.addEventListener("auxclick", bi, !0), window.addEventListener("keydown", ki, !0), yo = (e, t) => {
        t === "local" && (e.siteShelfLinks || e.logicweaverNavWheelShortcutsV1) && this.loadShortcuts();
      }, $t()?.onChanged?.addListener(yo);
      try {
        if (!vo) return;
        Qi = !1, Te.setVisibility(!1);
      } catch {
      }
      await this.loadShortcuts(), rt();
    }
  },
  stop() {
    vo = !1, Ln?.(), Ln = null, Te.setActionHandler(null), window.removeEventListener("logicweaver:dock-modules-changed", vi), window.removeEventListener("pointermove", yi), window.removeEventListener("mousedown", wi, !0), window.removeEventListener("auxclick", bi, !0), window.removeEventListener("keydown", ki, !0), yo && $t()?.onChanged?.removeListener(yo), yo = null;
  },
  async loadShortcuts() {
    try {
      const e = await $t()?.local?.get(["siteShelfLinks", "logicweaverNavWheelShortcutsV1"]);
      if (!vo) return;
      const t = e?.siteShelfLinks?.length ? e.siteShelfLinks : e?.logicweaverNavWheelShortcutsV1;
      Bn = (Array.isArray(t) ? t : []).map((o, i) => ({
        id: String(o.id || `wheel-${i}`),
        title: String(o.title || o.url || c("navwheel.site")),
        desc: String(o.url || ""),
        url: String(o.url || ""),
        icon: ir(o)
      })), J.mode === "shortcuts" && rt();
    } catch (e) {
      console.warn("[NavWheel] 读取快捷方式失败", e);
    }
  },
  open(e, t) {
    Vt(e ?? ht.x, t ?? ht.y);
  },
  close: Bt,
  get isEditingShortcuts() {
    return at;
  },
  isLinkInWheel(e) {
    return e ? Bn.some((t) => t.url === e) : !1;
  },
  toggleEditingShortcuts: ts,
  handleLinkSelection: tr,
  removeShortcut: or,
  toggle(e = !1) {
    J.isExpanded ? Bt() : e ? Vt(ht.x, ht.y) : Vt();
  },
  toggleTools(e = !0) {
    J.isExpanded && J.mode === "tools" ? Bt() : Vt(
      e ? ht.x : J.ballPosition.x,
      e ? ht.y : J.ballPosition.y,
      "tools"
    );
  },
  setMode(e) {
    tn(e);
  }
};
class Qt {
  constructor() {
    this.activeShortcuts = { ...hn }, this.isListenerBound = !1, this.storageListenerBound = !1, this.shortcutReadVersion = 0, this.initShortcuts();
  }
  static getInstance() {
    return Qt.instance || (Qt.instance = new Qt()), Qt.instance;
  }
  getShortcuts() {
    return { ...this.activeShortcuts };
  }
  async setShortcut(t, o) {
    if (typeof t != "string" || !t || typeof o != "string")
      throw new Error("快捷键参数无效，未保存");
    if (typeof chrome > "u" || !chrome.storage?.local)
      throw new Error("快捷键存储不可用，未保存");
    const { optionsService: i, SHORTCUT_STORAGE_KEY: a } = await import("./options.service-DNkfKuan.js").then((b) => b.g), m = (await chrome.storage.local.get(a))[a], g = { ...m || {}, [t]: o }, d = this.shortcutReadVersion, h = await i.saveSettings(
      { [a]: g },
      { [a]: m }
    );
    d === this.shortcutReadVersion && (++this.shortcutReadVersion, this.applyShortcutOverrides(h[a]));
  }
  applyShortcutOverrides(t) {
    const o = t && typeof t == "object" && !Array.isArray(t) ? Object.entries(t).filter((i) => Object.prototype.hasOwnProperty.call(hn, i[0]) && typeof i[1] == "string") : [];
    this.activeShortcuts = { ...hn, ...Object.fromEntries(o) };
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
    if (!t || !ai(t)) return !1;
    if (Je(t))
      return Ae.handleToolClick(t), !0;
    switch (t) {
      case "bookmarks":
        return nn.toggle(), !0;
      case "settings":
        return sn.open(), !0;
      case "nav-wheel":
        return je.toggle(!0), !0;
      case "toolbox":
        return je.toggleTools(!0), !0;
      case "pricing":
        return Nt.enter("daily-pricing"), !0;
      case "search": {
        if (typeof document < "u") {
          const o = document.getElementById("search-input");
          if (o)
            return o.focus(), o.select(), !0;
        }
        return !1;
      }
      case "todoist-new-task":
        return typeof window < "u" && typeof window.triggerTodoistQuickAdd == "function" ? window.triggerTodoistQuickAdd() : Ae.handleToolClick("todoist"), !0;
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
        if (qn.active || t.defaultPrevented || t.isComposing || t.repeat || t.target && (t.target.matches("input, textarea, select") || t.target.isContentEditable) && !t.altKey && !t.ctrlKey && !t.metaKey)
          return;
        const i = pa(t);
        if (!i) return;
        const a = i.toLowerCase();
        for (const [r, m] of Object.entries(this.activeShortcuts))
          if (!(!m || !ai(r)) && m.toLowerCase().replace(/^cmd\+/, "meta+") === a) {
            t.preventDefault(), t.stopPropagation(), this.triggerToolShortcut(r);
            break;
          }
      },
      !0
    ));
  }
}
const Fn = Qt.getInstance();
class eo {
  constructor() {
    this._isVisible = j(typeof document < "u" ? !document.hidden : !0), this.callbacks = /* @__PURE__ */ new Set(), this.activeIntervals = /* @__PURE__ */ new Set(), typeof document < "u" && document.addEventListener("visibilitychange", () => {
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
    return eo.instance || (eo.instance = new eo()), eo.instance;
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
const sr = eo.getInstance(), $n = () => window;
let At = !1, wo, Sn, bo;
function _i(e) {
  return se.getPageNames().filter((t) => t !== e).map((t) => ({ id: t, name: se.getPageLabel(t) }));
}
function Ci() {
  if (!Xe.isOpen || !Xe.activeFolder) return;
  const e = se.getState(), t = Xe.activeFolder;
  xt.setLinks(e.links.filter((r) => (r.group || "常用网站") === t));
  const o = /* @__PURE__ */ new Map();
  for (const r of e.links) {
    const m = r.group || "常用网站";
    o.has(m) || o.set(m, []), o.get(m).push(r);
  }
  const i = new Map(Object.keys(e.folders).map((r) => [r, Jo(e.folders, r)])), a = /* @__PURE__ */ new Map();
  for (const r of i.values()) r && a.set(r, (a.get(r) || 0) + 1);
  xt.setFolders([...i].filter(([, r]) => r === t).map(([r]) => ({
    groupName: r,
    links: o.get(r) || [],
    count: (o.get(r)?.length || 0) + (a.get(r) || 0)
  })), Jo(e.folders, t));
}
const Hn = {
  openEditor(e) {
    Yn.openEditDialog(e || {});
  },
  openFolder(e = Xe.activeFolder) {
    if (!e) return;
    const o = se.getState().links.filter((i) => (i.group || "常用网站") === e);
    xt.openFolder(e, o), Ci();
  },
  openLinkMenu(e, t) {
    t?.preventDefault?.(), no.openLinkMenu(e, _i(e.page || "常用网站"), t?.clientX || 0, t?.clientY || 0);
  },
  openFolderMenu(e, t, o) {
    t?.preventDefault?.();
    const i = se.getState(), a = o || i.activePage;
    no.openFolderMenu(
      e,
      se.getGroupSize(e) === "small" ? "扩大为大收藏夹" : "缩小为小收藏夹",
      _i(a),
      t?.clientX || 0,
      t?.clientY || 0
    );
  },
  openPageMenu(e, t) {
    t?.preventDefault?.(), no.openPageMenu(
      e,
      se.getPageLabel(e),
      se.getPageNames().length > 1,
      t?.clientX || 0,
      t?.clientY || 0
    );
  },
  render() {
    const e = se.getState(), t = se.getPageNames();
    Me.update({
      ...e,
      pages: t,
      activePage: t.includes(e.activePage) ? e.activePage : t[0]
    }), Ci();
  },
  start() {
    At || (At = !0, Me.setActions({
      openFolder: (e) => this.openFolder(e),
      deleteFolder: na,
      openLinkMenu: (e, t) => this.openLinkMenu(e, t),
      openFolderMenu: (e, t, o) => this.openFolderMenu(e, o, t),
      openPageMenu: (e, t) => this.openPageMenu(e, t)
    }), xt.setActionHandler((e, t) => {
      e === "close" ? xt.closeFolder() : e === "folder:open" && typeof t == "string" ? this.openFolder(t) : e === "link:contextmenu" && t?.link && this.openLinkMenu(t.link, t);
    }), Sn = se.subscribe(() => {
      this.render();
    }), bo = (e, t) => {
      if (t !== "local") return;
      const o = {
        quickLinks: "links",
        quickLinkGroupSizes: "groupSizes",
        launcherFolders: "folders",
        launcherPages: "pages",
        launcherPageLabels: "pageLabels",
        launcherActivePage: "activePage"
      }, i = {};
      for (const [a, r] of Object.entries(o)) {
        if (!(a in e)) continue;
        const m = e[a].newValue;
        i[r] = r === "links" ? Array.isArray(m) ? m : [] : r === "pages" ? Array.isArray(m) && m.length ? m : ["常用网站"] : r === "activePage" ? m || "常用网站" : m || {};
      }
      Object.keys(i).length && (se.updateState(i), this.render());
    }, $n().chrome?.storage?.onChanged?.addListener(bo));
  },
  init() {
    return this.start(), wo || (wo = (async () => {
      await se.ready;
      const e = $n().chrome;
      if (!At) return;
      const t = await e?.storage?.local?.get("quickLinksReady") || {};
      if (At) {
        if (!se.getState().links.length && !t.quickLinksReady && e?.topSites) {
          const o = await new Promise((i) => e.topSites.get((a) => i(a || [])));
          if (!At) return;
          se.getState().links.length || (se.updateState({ links: o.slice(0, 14).map((i) => ({
            id: crypto.randomUUID(),
            title: i.title || se.hostOf(i.url),
            url: i.url,
            group: "常用网站"
          })) }), await se.save());
        }
        At && this.render();
      }
    })().catch((e) => {
      throw wo = void 0, e;
    }), wo);
  },
  stop() {
    At = !1, Sn?.(), Sn = void 0, bo && $n().chrome?.storage?.onChanged?.removeListener(bo), bo = void 0, xt.setActionHandler(null), Me.setActions({
      openFolder: void 0,
      deleteFolder: void 0,
      openLinkMenu: void 0,
      openFolderMenu: void 0,
      openPageMenu: void 0
    });
  }
}, xi = [
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
  return e === 0 ? { emoji: "☀️", label: c("weather.condition.clear") } : e <= 2 ? { emoji: "🌤️", label: c("weather.condition.mainlyClear") } : e === 3 ? { emoji: "☁️", label: c("weather.condition.cloudy") } : e === 45 || e === 48 ? { emoji: "🌫️", label: c("weather.condition.fog") } : e >= 51 && e <= 57 ? { emoji: "🌦️", label: c("weather.condition.drizzle") } : e >= 61 && e <= 67 ? { emoji: "🌧️", label: c("weather.condition.rain") } : e >= 71 && e <= 77 ? { emoji: "🌨️", label: c("weather.condition.snow") } : e >= 80 && e <= 82 ? { emoji: "🌧️", label: c("weather.condition.rainShower") } : e >= 85 && e <= 86 ? { emoji: "🌨️", label: c("weather.condition.snowShower") } : e >= 95 ? { emoji: "⛈️", label: c("weather.condition.thunderstorm") } : { emoji: "🌡️", label: c("weather.condition.unknown") };
}
class to {
  constructor() {
    this.currentCity = "武汉", this.isRefreshing = !1, this.activeRequestId = 0, this.lastRawForecastData = null, this.initStorage();
  }
  static getInstance() {
    return to.instance || (to.instance = new to()), to.instance;
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
    const a = Bo(i.current?.weather_code ?? 0), r = Math.round(i.current?.temperature_2m ?? 0), m = i.hourly?.time || [], g = Date.now();
    let d = m.findIndex((S) => new Date(S).getTime() >= g);
    d < 0 && (d = 0);
    const h = [];
    for (let S = d; S < Math.min(d + 5, m.length); S++) {
      const R = S === d ? c("weather.now") : c("weather.hourSuffix", { hour: new Date(m[S]).getHours() }), B = Bo(i.hourly.weather_code[S]), D = Math.round(i.hourly.temperature_2m[S]);
      h.push({ time: R, emoji: B.emoji, temp: D });
    }
    let b = c("weather.noRain12h");
    for (let S = d; S < Math.min(d + 12, m.length); S++) {
      const R = i.hourly.weather_code[S], B = i.hourly.precipitation_probability?.[S] || 0;
      if (R >= 51 || B >= 60) {
        const D = new Date(m[S]).getHours(), L = R >= 71 && R <= 77 || R === 85 || R === 86 ? c("weather.snow") : c("weather.rain"), P = B ? ` (${B}%)` : "";
        b = c("weather.expectPrecip", { time: `${D}:00`, type: L, prob: P });
        break;
      }
    }
    const M = [c("weather.today"), c("weather.tomorrow"), c("weather.afterTomorrow")], v = [], x = i.daily?.time?.length || 0;
    for (let S = 1; S < Math.min(3, x); S++) {
      const R = M[S] || c("weather.plusDays", { count: S }), B = Bo(i.daily.weather_code[S]), D = `${Math.round(i.daily.temperature_2m_max[S])}°/${Math.round(i.daily.temperature_2m_min[S])}°`;
      v.push({ label: R, emoji: B.emoji, tempRange: D });
    }
    const f = Math.round(i.daily?.temperature_2m_max?.[0] ?? r), C = Math.round(i.daily?.temperature_2m_min?.[0] ?? r), I = c("weather.tempRange", { cond: a.label, max: f, min: C }), y = {
      cityName: o.name || t,
      currentEmoji: a.emoji,
      currentTemp: r,
      subText: I,
      rainText: b,
      hours: h,
      days: v
    };
    if (it.ready(y, t), i.daily?.time) {
      const S = [
        c("weather.weekday.sun"),
        c("weather.weekday.mon"),
        c("weather.weekday.tue"),
        c("weather.weekday.wed"),
        c("weather.weekday.thu"),
        c("weather.weekday.fri"),
        c("weather.weekday.sat")
      ], R = [];
      for (let B = 0; B < i.daily.time.length; B++) {
        const D = new Date(i.daily.time[B]), $ = B === 0 ? c("weather.today") : B === 1 ? c("weather.tomorrow") : B === 2 ? c("weather.afterTomorrow") : S[D.getDay()], L = Bo(i.daily.weather_code[B]);
        R.push({
          date: `${D.getMonth() + 1}/${D.getDate()}`,
          dayName: $,
          emoji: L.emoji,
          condition: L.label,
          highTemp: Math.round(i.daily.temperature_2m_max[B]),
          lowTemp: Math.round(i.daily.temperature_2m_min[B]),
          rainProb: i.daily.precipitation_probability_max?.[B] || 0
        });
      }
      it.setForecastDays(R);
    }
    const _ = {
      humidity: i.current?.relative_humidity_2m ? `${i.current.relative_humidity_2m}%` : "60%",
      wind: i.current?.wind_speed_10m ? `${Math.round(i.current.wind_speed_10m)} km/h` : c("weather.detail.windLight"),
      uvIndex: c("weather.detail.uvNormal"),
      airQuality: c("weather.detail.airGood")
    };
    it.setDetailInfo(_);
  }
  filterCities(t, o = 8) {
    const i = t.trim().toLowerCase();
    if (!i) return xi.slice(0, o);
    const a = [];
    for (const r of xi) {
      const m = r.name.toLowerCase(), g = r.pinyin.toLowerCase(), d = r.admin.toLowerCase();
      if ((m.startsWith(i) || g.startsWith(i) || m.includes(i) || g.includes(i) || d.includes(i)) && a.push(r), a.length >= o) break;
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
    const i = ++this.activeRequestId;
    it.loading(o);
    try {
      const a = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(o)}&count=1&language=zh&format=json`, r = await fetch(a);
      if (i !== this.activeRequestId || K.state === "unconfigured") {
        this.isRefreshing = !1;
        return;
      }
      const g = (await r.json()).results?.[0];
      if (!g) {
        i === this.activeRequestId && K.state !== "unconfigured" && it.notFound(o), this.isRefreshing = !1;
        return;
      }
      const d = `https://api.open-meteo.com/v1/forecast?latitude=${g.latitude}&longitude=${g.longitude}&current=temperature_2m,weather_code,relative_humidity_2m,wind_speed_10m&hourly=temperature_2m,weather_code,precipitation_probability&daily=temperature_2m_max,temperature_2m_min,weather_code,precipitation_probability_max&forecast_days=7&timezone=auto`, h = await fetch(d);
      if (i !== this.activeRequestId || K.state === "unconfigured") {
        this.isRefreshing = !1;
        return;
      }
      const b = await h.json();
      this.lastRawForecastData = { city: o, loc: g, d: b }, i === this.activeRequestId && K.state !== "unconfigured" && this.applyForecastPayload(o, g, b);
    } catch (a) {
      i === this.activeRequestId && K.state !== "unconfigured" && it.error(a?.message || "天气加载失败，右键此处可重新选择地点。", o);
    } finally {
      i === this.activeRequestId && (this.isRefreshing = !1);
    }
  }
}
const Ut = to.getInstance();
function ar(e, t) {
  window.LogicWeaverIntro = ut, window.LogicWeaverStartupIntro = ut, window.LogicWeaverNotifications = we, window.LogicWeaverWindowManager = Ae, window.LogicWeaverWindowTabs = Ae, window.LogicWeaverDomFreezer = ha, window.LogicWeaverWallpaperService = Xo, window.LogicWeaverLauncherService = se, window.LogicWeaverLauncherRuntime = Hn, window.LogicWeaverProfileService = hi;
  try {
    hi.init();
  } catch (o) {
    console.error("[ProfileService] init failed:", o);
  }
  window.LogicWeaverBookmarksService = Kn, window.LogicWeaverCalendarService = ia, window.LogicWeaverWeather = it, window.LogicWeaverWeatherService = Ut, window.LogicWeaverClock = Zt, window.LogicWeaverSearch = Js, window.LogicWeaverSearchService = Zs, Object.defineProperty(window, "LogicWeaverAiHotService", {
    configurable: !0,
    get: () => {
      import("./aihot.service-C35UdaAI.js").then(({ aiHotService: o }) => {
        window.LogicWeaverAiHotService = o;
      });
    }
  }), window.LogicWeaverHomeMusic = Ue, window.LogicWeaverLauncherGroups = Me, window.LogicWeaverProfileMenu = Mo, window.LogicWeaverWorkspaceLaunchers = Jn, window.LogicWeaverMacDock = gt, window.LogicWeaverFullscreen = Nt, window.enterFullscreenCard = (o) => Nt.enter(o), window.exitFullscreenCard = () => Nt.exit(), window.cycleFullscreenCard = () => Nt.cycle(), window.LogicWeaverPageVisibility = sr, window.LogicWeaverBackgroundLibrary = ci, window.LogicWeaverNotificationCenter = St, window.LogicWeaverBookmarkMenu = Vn, window.LogicWeaverBookmarkPanel = nn, window.LogicWeaverBookmarkFolderStrip = Zo, window.LogicWeaverLauncherDialogs = Yn, window.LogicWeaverLauncherFolder = xt, window.LogicWeaverLauncherMenus = no, window.LogicWeaverSettings = sn, window.LogicWeaverClockSettings = Ot, window.LogicWeaverBiliTheater = So, window.LogicWeaverBilibiliService = ii, window.getBiliJct = () => ii.getBiliJct(), window.LogicWeaverBiliMiniPlayer = Wn, window.openBiliMiniPlayer = (o) => Wn.openVideo(o), window.LogicWeaverAiDialog = Zn, window.LogicWeaverAihotViewer = Xn, window.LogicWeaverNavWheel = Te, window.openNavWheel = (o, i) => je.open(o, i), window.closeNavWheel = () => je.close(), window.toggleNavWheel = (o) => je.toggle(o), window.toggleToolWheel = (o) => je.toggleTools(o), window.setNavWheelMode = (o) => je.setMode(o), window.LogicWeaverShortcuts = Fn, window.triggerToolShortcut = (o) => Fn.triggerToolShortcut(o), window.LogicWeaverCommands = e, window.LogicWeaverFeatures = t, window.LogicWeaverCalendarView = sa, window.LogicWeaverGitHubStatus = Un, window.LogicWeaverGitHubFolders = Wt, window.LogicWeaverGitHubHero = Lo, window.LogicWeaverGitHubRepositories = _t, window.LogicWeaverGitHubBatchBar = $o, window.LogicWeaverTodoistLabels = aa, window.LogicWeaverTodoistWorkspace = ra, window.LogicWeaverTodoistCalendarSidebar = la, window.LogicWeaverTodoistTaskList = ca, window.LogicWeaverBiliMessagePanel = Rt, window.LogicWeaverStickerBoard = va, window.LogicWeaverStickersService = ya, window.LogicWeaverPricing = zi, window.LogicWeaverBiliFavorites = Hi, window.LogicWeaverBiliRadioTape = _a, window.LogicWeaverBiliOrganizerDialogs = wa, window.LogicWeaverBiliUpGroupManager = ba, window.LogicWeaverBiliUpPreview = Uo, window.LogicWeaverYouTube = Oi, window.LogicWeaverAihotFeed = ji, window.LogicWeaverGitHubTrending = Ji, window.LogicWeaverCalendarWorkspace = Jt, window.LogicWeaverCalendar = Jt, window.LogicWeaverTodoistMainWorkspace = da, window.LogicWeaverTodoistTaskDetail = Ka, window.openBiliTheater = (o) => So.openVideo(o), window.closeBiliTheater = () => So.close(), window.showWindowsToast = (o) => {
    if (!o) return null;
    const i = pn(o.target) || si(o.url) || (o.appType === "bili" ? Fs([o.title, o.subtitle, o.message].filter((a) => typeof a == "string").join(" ")) : void 0);
    return we.show({
      ...o,
      target: i,
      onClick: () => {
        if (typeof o?.onClick == "function") return o.onClick();
        if (i) return St.openTarget(i);
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
    const r = typeof i == "object" && i ? i : a, m = typeof i == "number" ? i : 3200, g = r.isError || /失败|错误|异常|未获取|未找到/i.test(o), d = r.title || (g ? "B站操作未完成" : "哔哩哔哩"), h = r.subtitle || (o.length > 36 ? "" : o), b = r.message || (r.subtitle || o.length > 36 ? o : ""), M = {
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
      target: pn(r.target) || si(r.url) || pn({ type: "bili-video", bvid: r.bvid, aid: r.aid ? String(r.aid) : void 0 }),
      url: r.url,
      duration: Math.max(3e3, m)
    };
    return window.showWindowsToast(M);
  }, window.showFetchToast = (o, i, a = "", r = "assets/logo.png", m = 3200) => window.showWindowsToast({
    appName: o,
    title: i,
    subtitle: a,
    icon: r || "assets/logo.png",
    duration: m,
    showActions: !1,
    actionLabel: "",
    appType: "fetch"
  }), window.LogicWeaverKineticDrag = La, window.LogicWeaverMarkdownAst = $a, window.setLauncherBackground = (o) => Xo.setWallpaper(o), window.backgroundDbClear = (o) => Hs(o), window.openBackgroundHistory = () => ci.openDialog();
}
const Ne = _e({
  isOpen: !1,
  query: "",
  selectedIndex: 0
});
let Fo = null;
const os = {
  get state() {
    return Ne;
  },
  open() {
    Ne.isOpen || (Ne.isOpen = !0, Ne.query = "", Ne.selectedIndex = 0, Fo = Ae.pushModalCloser(() => (this.close(), !0)));
  },
  close() {
    Ne.isOpen && (Ne.isOpen = !1, Ne.query = "", Ne.selectedIndex = 0, Fo && (Fo(), Fo = null));
  },
  toggle() {
    Ne.isOpen ? this.close() : this.open();
  },
  setQuery(e) {
    Ne.query = e, Ne.selectedIndex = 0;
  },
  selectNext(e) {
    e <= 0 || (Ne.selectedIndex = (Ne.selectedIndex + 1) % e);
  },
  selectPrev(e) {
    e <= 0 || (Ne.selectedIndex = (Ne.selectedIndex - 1 + e) % e);
  },
  async executeCommand(e) {
    this.close();
    try {
      await an.execute(e.id, void 0, "command-palette");
    } catch (t) {
      console.warn(`[CommandPalette] Failed to execute ${e.id}:`, t);
    }
  }
};
typeof window < "u" && window.addEventListener("keydown", (e) => {
  if (qn.active || e.defaultPrevented || e.isComposing || e.repeat) return;
  const t = (e.key || "").toLowerCase(), o = (e.ctrlKey || e.metaKey) && t === "k", i = e.altKey && (e.code === "Space" || t === " ");
  (o || i) && (e.preventDefault(), e.stopPropagation(), os.toggle());
}, !0);
function rr(e) {
  e.register({
    id: "palette.toggle",
    title: "打开全局命令中心 (Spotlight)",
    category: "界面",
    keywords: ["命令", "palette", "spotlight", "raycast", "搜索", "cmd"],
    concurrency: "drop",
    run: () => os.toggle()
  }), e.register({
    id: "intro.skip",
    title: "跳过开屏动画",
    category: "界面",
    keywords: ["开屏", "启动", "skip"],
    concurrency: "drop",
    enabled: () => ut.enabled && !ut.finished,
    run: () => ut.skip("COMMAND SKIP")
  }), e.register({
    id: "notifications.clear",
    title: "关闭当前 Toast",
    category: "通知",
    keywords: ["toast", "关闭"],
    description: "只关闭浮动提示，不删除通知中心历史",
    concurrency: "drop",
    enabled: () => we.size > 0,
    run: () => we.clear()
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
    enabled: () => Jt.ready,
    run: () => Jt.refresh()
  }), e.register({
    id: "calendar.today",
    title: "日历跳转到今天",
    category: "日历",
    keywords: ["今日", "today", "日期"],
    concurrency: "drop",
    enabled: () => Jt.ready,
    run: () => Jt.goToday()
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
}, cr = /* @__PURE__ */ de({
  __name: "GuestPreviewBanner",
  setup(e) {
    function t() {
      zs.exit();
    }
    return (o, i) => (l(), ce(Rs, { name: "guest-banner-slide" }, {
      default: io(() => [
        s(js) ? (l(), p("aside", lr, [
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
}), dr = /* @__PURE__ */ De(cr, [["__scopeId", "data-v-a2f2ca5f"]]), ur = ["hidden"], pr = {
  key: 0,
  class: "bookmark-folder-strip-empty"
}, hr = ["title", "data-bookmark-folder-id", "onClick", "onContextmenu"], gr = /* @__PURE__ */ de({
  __name: "BookmarkFolderStrip",
  setup(e) {
    const t = j(null);
    function o(r) {
      const m = t.value;
      !m || m.scrollWidth <= m.clientWidth || !r.deltaY || (r.preventDefault(), m.scrollLeft += r.deltaY);
    }
    function i(r) {
      Zo.openFolder(r.id);
    }
    function a(r, m) {
      Zo.openContextMenu(m, r.clientX, r.clientY);
    }
    return (r, m) => (l(), p("nav", {
      id: "bookmark-folder-strip",
      ref_key: "stripRef",
      ref: t,
      class: "bookmark-folder-strip",
      "aria-label": "书签栏文件夹",
      hidden: !s(Xt).enabled,
      onWheel: o
    }, [
      s(Xt).folders.length ? E("", !0) : (l(), p("span", pr, u(s(Xt).emptyMessage || "书签栏没有文件夹"), 1)),
      (l(!0), p(Y, null, fe(s(Xt).folders, (g) => (l(), p("button", {
        key: g.id,
        class: "bookmark-folder-chip",
        type: "button",
        title: `打开书签文件夹：${g.title || "未命名"}`,
        "data-bookmark-folder-id": g.id,
        onClick: (d) => i(g),
        onContextmenu: H((d) => a(d, g), ["prevent"])
      }, [
        m[0] || (m[0] = n("span", { "aria-hidden": "true" }, "📁", -1)),
        n("span", null, u(g.title || "未命名"), 1)
      ], 40, hr))), 128))
    ], 40, ur));
  }
}), fr = /* @__PURE__ */ De(gr, [["__scopeId", "data-v-5e71cc7c"]]), mr = ["aria-label"], vr = { class: "cube-manager-body" }, yr = ["disabled", "onClick", "title"], wr = ["disabled", "onClick", "title"], br = ["onClick"], kr = ["onClick"], _r = ["onClick"], Cr = { value: "memo" }, xr = { value: "countdown" }, Lr = { value: "link" }, $r = ["type", "placeholder"], Sr = { type: "submit" }, Tr = {
  key: 0,
  role: "alert"
}, Ir = /* @__PURE__ */ de({
  __name: "CubeConfigDialog",
  setup(e) {
    const t = Pe.state, o = oe(() => Pe.getActiveFaces()), i = oe(() => t.registeredFaces.filter((v) => !t.activeFaceIds.includes(v.id))), a = j(""), r = j("memo"), m = j(""), g = j(!1), d = j(JSON.stringify({ title: "每日一句", icon: "📝", customType: "memo", customData: { text: "今天也要记得休息" } }, null, 2)), h = j("");
    function b(v) {
      h.value = "";
      try {
        v();
      } catch (x) {
        h.value = x instanceof Error ? x.message : "操作失败";
      }
    }
    function M() {
      b(() => {
        const v = g.value ? JSON.parse(d.value) : {
          title: a.value,
          customType: r.value,
          customData: { text: m.value, targetDate: m.value, url: m.value }
        };
        Pe.addCustomFace(v), a.value = "", m.value = "";
      });
    }
    return (v, x) => (l(), ce(yt, { to: "body" }, [
      s(t).isConfigDialogOpen ? (l(), p("section", {
        key: 0,
        class: "cube-manager",
        role: "dialog",
        "aria-label": s(c)("cube.manager.title"),
        onKeydown: x[7] || (x[7] = Ft(H((f) => s(Pe).closeConfigDialog(), ["stop"]), ["esc"]))
      }, [
        n("header", null, [
          n("strong", null, u(s(c)("cube.manager.title")), 1),
          n("button", {
            type: "button",
            "aria-label": "关闭",
            onClick: x[0] || (x[0] = (f) => s(Pe).closeConfigDialog())
          }, "×")
        ]),
        n("div", vr, [
          n("p", null, u(s(c)("cube.manager.desc")), 1),
          (l(!0), p(Y, null, fe(o.value, (f, C) => (l(), p("div", {
            key: f.id,
            class: "cube-row"
          }, [
            n("span", null, u(f.icon) + " " + u(f.title), 1),
            n("button", {
              type: "button",
              disabled: C === 0,
              onClick: (I) => b(() => s(Pe).moveUp(f.id)),
              title: s(c)("cube.manager.moveUp")
            }, "↑", 8, yr),
            n("button", {
              type: "button",
              disabled: C === o.value.length - 1,
              onClick: (I) => b(() => s(Pe).moveDown(f.id)),
              title: s(c)("cube.manager.moveDown")
            }, "↓", 8, wr),
            n("button", {
              type: "button",
              onClick: (I) => b(() => s(Pe).removeCustomFace(f.id))
            }, u(s(c)("cube.manager.removeFace")), 9, br)
          ]))), 128)),
          (l(!0), p(Y, null, fe(i.value, (f) => (l(), p("div", {
            key: f.id,
            class: "cube-row"
          }, [
            n("span", null, u(f.title) + u(s(c)("cube.manager.inactiveSuffix")), 1),
            n("button", {
              type: "button",
              onClick: (C) => b(() => s(Pe).toggleActive(f.id, !0))
            }, u(s(c)("cube.manager.add")), 9, kr),
            f.builtIn ? E("", !0) : (l(), p("button", {
              key: 0,
              type: "button",
              onClick: (C) => b(() => s(Pe).removeCustomFace(f.id))
            }, u(s(c)("cube.manager.delete")), 9, _r))
          ]))), 128)),
          n("h3", null, u(s(c)("cube.manager.addFace")), 1),
          n("label", null, [
            He(n("input", {
              "onUpdate:modelValue": x[1] || (x[1] = (f) => g.value = f),
              type: "checkbox"
            }, null, 512), [
              [Ns, g.value]
            ]),
            Ye(" " + u(s(c)("cube.manager.pasteJson")), 1)
          ]),
          n("form", {
            onSubmit: H(M, ["prevent"])
          }, [
            g.value ? (l(), p(Y, { key: 1 }, [
              n("p", null, u(s(c)("cube.manager.securityNotice")), 1),
              He(n("textarea", {
                "onUpdate:modelValue": x[5] || (x[5] = (f) => d.value = f),
                rows: "9",
                maxlength: "10000",
                "aria-label": "面的 JSON 配置",
                spellcheck: "false"
              }, null, 512), [
                [so, d.value]
              ])
            ], 64)) : (l(), p(Y, { key: 0 }, [
              n("label", null, [
                Ye(u(s(c)("cube.manager.fieldTitle")), 1),
                He(n("input", {
                  "onUpdate:modelValue": x[2] || (x[2] = (f) => a.value = f),
                  maxlength: "60",
                  required: ""
                }, null, 512), [
                  [so, a.value]
                ])
              ]),
              n("label", null, [
                Ye(u(s(c)("cube.manager.fieldType")), 1),
                He(n("select", {
                  "onUpdate:modelValue": x[3] || (x[3] = (f) => r.value = f)
                }, [
                  n("option", Cr, u(s(c)("cube.manager.typeMemo")), 1),
                  n("option", xr, u(s(c)("cube.manager.typeCountdown")), 1),
                  n("option", Lr, u(s(c)("cube.manager.typeLink")), 1)
                ], 512), [
                  [Ei, r.value]
                ])
              ]),
              n("label", null, [
                Ye(u(s(c)("cube.manager.fieldContent")), 1),
                He(n("input", {
                  "onUpdate:modelValue": x[4] || (x[4] = (f) => m.value = f),
                  type: r.value === "countdown" ? "date" : "text",
                  placeholder: r.value === "link" ? "https://…" : s(c)("cube.manager.contentPlaceholderText"),
                  maxlength: "500",
                  required: ""
                }, null, 8, $r), [
                  [Os, m.value]
                ])
              ])
            ], 64)),
            n("button", Sr, u(s(c)("cube.manager.submitAdd")), 1)
          ], 32),
          h.value ? (l(), p("p", Tr, u(h.value), 1)) : E("", !0)
        ]),
        n("footer", null, [
          n("button", {
            type: "button",
            onClick: x[6] || (x[6] = (f) => b(() => s(Pe).resetDefaults()))
          }, u(s(c)("cube.manager.resetDefault")), 1),
          n("small", null, u(s(c)("cube.manager.resetNotice")), 1)
        ])
      ], 40, mr)) : E("", !0)
    ]));
  }
}), Mr = /* @__PURE__ */ De(Ir, [["__scopeId", "data-v-490de280"]]), Dr = ["data-face"], Ar = ["aria-label"], Er = { class: "ms-top-side" }, Pr = ["title"], Wr = ["title"], Rr = ["title"], Nr = {
  key: 0,
  class: "ms-top-meta"
}, Or = {
  class: "ms-top-title",
  style: { color: "#10b981", "font-weight": "700" }
}, Br = { class: "ms-top-artist" }, Fr = { class: "ms-top-meta" }, Hr = ["title"], jr = ["title"], zr = {
  key: 0,
  class: "ms-top-divider"
}, Gr = ["title"], Kr = { class: "ms-top-mini-progress" }, Vr = { class: "ms-top-side" }, Ur = ["title"], Yr = ["title"], qr = ["aria-label"], Xr = ["title"], Jr = { class: "ms-cube-custom-icon" }, Zr = { class: "ms-cube-custom-title" }, Qr = ["title"], el = {
  key: 1,
  class: "ms-cube-custom-text countdown"
}, tl = ["href"], ol = {
  class: "ms-cube-dots",
  "aria-hidden": "true"
}, nl = ["title", "onClick"], il = { class: "ms-cube-cm-header" }, sl = { class: "ms-cube-cm-list" }, al = ["onClick"], rl = { class: "ms-cube-cm-icon" }, ll = { class: "ms-cube-cm-title" }, cl = {
  key: 0,
  class: "ms-cube-cm-check"
}, dl = /* @__PURE__ */ de({
  __name: "TopInfoCube",
  props: {
    active: { type: Boolean, default: !0 }
  },
  setup(e) {
    const t = e, o = oe(() => Ri.visible || lt.djModalOpen || lt.isActive && lt.isJoined), i = oe(() => lt.isActive && lt.isJoined), a = oe(() => Pe.getActiveFaces()), r = j("music"), m = j(0);
    let g = !1, d;
    Oe(
      () => a.value,
      (F) => {
        F.some((O) => O.id === r.value) || (r.value = F[0]?.id || "");
      },
      { immediate: !0 }
    );
    const h = oe(() => a.value.filter((F) => !F.builtIn)), b = j(!1), M = j({ x: 0, y: 0 });
    Oe(() => t.active, (F) => {
      F || (b.value = !1, Pe.closeConfigDialog(), clearTimeout(d), g = !1);
    }, { immediate: !0 });
    const { menuRef: v, style: x } = Fi({
      visible: () => b.value,
      anchor: () => M.value,
      dismiss: () => {
        b.value = !1;
      }
    });
    function f(F) {
      F.preventDefault(), F.stopPropagation(), M.value = { x: F.clientX, y: F.clientY }, b.value = !0;
    }
    function C(F) {
      W(F), b.value = !1;
    }
    function I() {
      b.value = !1, Pe.openConfigDialog();
    }
    function y() {
      b.value = !1, _(() => Pe.resetDefaults()), W("music");
    }
    function _(F) {
      b.value = !1;
      try {
        F();
      } catch (O) {
        we.show({ appName: "滚动立方体", title: "保存失败", message: O instanceof Error ? O.message : "请检查浏览器存储" });
      }
    }
    function S(F) {
      if (!F) return c("cube.countdown.noTarget");
      const z = new Date(F).getTime() - P.value, me = Math.ceil(z / (1e3 * 60 * 60 * 24));
      return me > 0 ? c("cube.countdown.remaining", { days: me }) : me === 0 ? c("cube.countdown.today") : c("cube.countdown.passed", { days: Math.abs(me) });
    }
    const R = oe(() => !X.title || X.title === "点击播放" ? c("home.music.defaultTitle") : X.title), B = oe(() => !X.artist || X.artist === "作者" ? c("home.music.defaultArtist") : X.artist), D = oe(() => X.isBiliRadio ? c("cube.source.biliRadio") : X.isNetease ? c("cube.source.netease") : X.playing ? c("cube.source.siren") : c("cube.source.idle")), $ = oe(() => X.currentLyric ? X.currentLyric : X.playing ? c("cube.defaultPlayingLyric") : c("cube.defaultIdleLyric"));
    function L() {
      Ae.handleToolClick("music");
    }
    const P = j(Date.now());
    let he;
    Oe(() => t.active && a.value.some((F) => F.id === r.value && F.customType === "countdown"), (F) => {
      F && (P.value = Date.now()), clearInterval(he), he = F ? window.setInterval(() => {
        document.hidden || (P.value = Date.now());
      }, 6e4) : void 0;
    }, { immediate: !0 });
    function W(F, O = null) {
      const z = a.value, me = z.find((xe) => xe.id === F) || z[0];
      if (me) {
        if (Number.isFinite(O))
          m.value = O;
        else if (me.id !== r.value) {
          const xe = z.findIndex((Ee) => Ee.id === r.value);
          let ve = (z.findIndex((Ee) => Ee.id === me.id) - xe + z.length) % z.length;
          ve > z.length / 2 && (ve -= z.length), m.value += ve * 90;
        }
        r.value = me.id;
      }
    }
    function G(F) {
      const O = a.value;
      if (O.length <= 1) return;
      const z = O.findIndex((ve) => ve.id === r.value), xe = ((z >= 0 ? z : 0) + F + O.length) % O.length, Ie = O[xe];
      Ie && W(Ie.id, m.value + F * 90);
    }
    function N(F) {
      a.value.length <= 1 || F.altKey || Math.abs(F.deltaY) < 2 || (F.preventDefault(), !g && (g = !0, G(F.deltaY > 0 ? 1 : -1), d = setTimeout(() => {
        g = !1;
      }, 420)));
    }
    function q(F) {
      !["ArrowUp", "ArrowDown", "PageUp", "PageDown"].includes(F.key) || F.target?.closest?.("input") || (F.preventDefault(), G(["ArrowDown", "PageDown"].includes(F.key) ? 1 : -1));
    }
    function ge(F, O) {
      return r.value === F ? {
        transform: `rotateX(${-m.value}deg) translateZ(22px)`,
        visibility: "visible"
      } : {
        transform: `rotateX(-${O}deg) translateZ(22px)`,
        visibility: "hidden"
      };
    }
    function Ce(F) {
      const O = F.target;
      O && (O.tagName === "INPUT" || O.tagName === "TEXTAREA" || O.isContentEditable) || (F.preventDefault(), F.stopPropagation());
    }
    function Ze(F) {
      const O = F.target;
      O && (O.tagName === "INPUT" || O.tagName === "TEXTAREA" || O.isContentEditable) || F.preventDefault();
    }
    return It(() => {
      clearInterval(he), clearTimeout(d);
    }), (F, O) => He((l(), p("div", {
      class: "ms-top-player",
      "data-face": r.value,
      tabindex: "0",
      title: "滚动立方体 · 滚轮切换面板，右键可自由增删与排序",
      "aria-label": "滚动立方体",
      onWheel: N,
      onKeydown: q,
      onContextmenu: f,
      onCopy: Ce,
      onSelectstart: Ze
    }, [
      a.value.length ? E("", !0) : (l(), p("button", {
        key: 0,
        type: "button",
        class: "ms-cube-cm-action",
        onClick: I
      }, "＋ 添加面（右键管理）")),
      n("div", {
        class: "ms-top-cube",
        style: ke({ transform: `translateZ(-22px) rotateX(${m.value}deg)` })
      }, [
        s(Pe).isActive("music") && r.value === "music" ? (l(), p("section", {
          key: 0,
          class: "ms-top-face ms-top-face-music",
          "aria-label": s(c)("cube.musicFaceAria"),
          style: ke(ge("music", 0))
        }, [
          n("div", Er, [
            n("button", {
              class: "ms-top-prev",
              title: s(c)("cube.prevTrack"),
              type: "button",
              onClick: O[0] || (O[0] = H((z) => s(Ue).prev(), ["stop"]))
            }, "⏮", 8, Pr),
            n("button", {
              class: "ms-top-play",
              title: s(c)("cube.playPause"),
              type: "button",
              onClick: O[1] || (O[1] = H((z) => s(Ue).togglePlay(), ["stop"]))
            }, u(s(X).playing ? "⏸" : "▶"), 9, Wr)
          ]),
          n("button", {
            class: "ms-top-main",
            title: s(c)("cube.openMusicPicker"),
            type: "button",
            onClick: H(L, ["stop"])
          }, [
            o.value ? (l(), p("div", Nr, [
              n("span", Or, " 🎧 " + u(i.value ? s(c)("cube.listeningTogether") : s(c)("cube.listening")) + "：" + u(R.value), 1),
              n("span", Br, u(B.value), 1)
            ])) : (l(), p(Y, { key: 1 }, [
              n("div", Fr, [
                n("span", {
                  class: "ms-top-title",
                  title: R.value
                }, u(R.value), 9, Hr),
                n("span", {
                  class: "ms-top-artist",
                  title: B.value
                }, u(B.value), 9, jr),
                n("span", {
                  class: le(["ms-top-source", { idle: !s(X).playing }])
                }, u(D.value), 3),
                $.value ? (l(), p("span", zr)) : E("", !0)
              ]),
              $.value ? (l(), p("span", {
                key: 0,
                class: "ms-top-lyric",
                title: $.value
              }, u($.value), 9, Gr)) : E("", !0)
            ], 64)),
            n("div", Kr, [
              n("div", {
                class: "ms-top-mini-fill",
                style: ke({ width: s(X).progressPercent + "%" })
              }, null, 4)
            ])
          ], 8, Rr),
          n("div", Vr, [
            n("button", {
              class: "ms-top-next",
              title: s(c)("cube.nextTrack"),
              type: "button",
              onClick: O[2] || (O[2] = H((z) => s(Ue).next(), ["stop"]))
            }, "⏭", 8, Ur),
            n("button", {
              class: "ms-top-open",
              title: s(c)("cube.openPlaylist"),
              type: "button",
              onClick: H(L, ["stop"])
            }, "🎵", 8, Yr)
          ])
        ], 12, Ar)) : E("", !0),
        (l(!0), p(Y, null, fe(h.value, (z, me) => (l(), p("section", {
          key: z.id,
          class: "ms-top-face ms-top-face-custom",
          "aria-label": z.title,
          style: ke(ge(z.id, (me + 1) * 90))
        }, [
          r.value === z.id ? (l(), p("div", {
            key: 0,
            class: "ms-cube-custom-body",
            title: z.desc
          }, [
            n("span", Jr, u(z.icon), 1),
            n("strong", Zr, u(z.title), 1),
            O[10] || (O[10] = n("span", { class: "ms-cube-divider" }, null, -1)),
            z.customType === "memo" ? (l(), p("span", {
              key: 0,
              class: "ms-cube-custom-text",
              title: z.customData?.text
            }, u(z.customData?.text || s(c)("cube.memo.clickToConfig")), 9, Qr)) : z.customType === "countdown" ? (l(), p("span", el, u(S(z.customData?.targetDate)), 1)) : z.customType === "link" ? (l(), p("a", {
              key: 2,
              href: z.customData?.url,
              target: "_blank",
              rel: "noreferrer",
              class: "ms-cube-custom-link",
              onClick: O[3] || (O[3] = H(() => {
              }, ["stop"]))
            }, u(z.customData?.url) + " ↗ ", 9, tl)) : E("", !0)
          ], 8, Xr)) : E("", !0),
          n("button", {
            type: "button",
            class: "ms-cube-config-trigger",
            title: "管理立方体面",
            onClick: O[4] || (O[4] = H((xe) => s(Pe).openConfigDialog(), ["stop"]))
          }, " ⚙ ")
        ], 12, qr))), 128))
      ], 4),
      n("div", ol, [
        (l(!0), p(Y, null, fe(a.value, (z) => (l(), p("i", {
          key: z.id,
          class: le({ on: r.value === z.id }),
          title: z.title,
          onClick: H((me) => W(z.id), ["stop"])
        }, null, 10, nl))), 128))
      ]),
      (l(), ce(yt, { to: "body" }, [
        t.active && b.value ? (l(), p("div", {
          key: 0,
          ref_key: "menuRef",
          ref: v,
          class: "ms-cube-context-menu",
          style: ke(s(x)),
          onClick: O[9] || (O[9] = H(() => {
          }, ["stop"]))
        }, [
          n("div", il, [
            O[11] || (O[11] = n("span", null, "🎲 滚动立方体面", -1)),
            n("button", {
              type: "button",
              class: "ms-cube-cm-close",
              onClick: O[5] || (O[5] = (z) => b.value = !1)
            }, "×")
          ]),
          n("div", sl, [
            (l(!0), p(Y, null, fe(a.value, (z) => (l(), p("button", {
              key: z.id,
              type: "button",
              class: le(["ms-cube-cm-item", { active: r.value === z.id }]),
              onClick: (me) => C(z.id)
            }, [
              n("span", rl, u(z.icon), 1),
              n("span", ll, u(z.title), 1),
              r.value === z.id ? (l(), p("span", cl, "✓")) : E("", !0)
            ], 10, al))), 128))
          ]),
          O[16] || (O[16] = n("div", { class: "ms-cube-cm-divider" }, null, -1)),
          n("button", {
            type: "button",
            class: "ms-cube-cm-action",
            onClick: I
          }, [...O[12] || (O[12] = [
            n("span", null, "＋ 添加面 / 管理面", -1)
          ])]),
          n("button", {
            type: "button",
            class: "ms-cube-cm-action",
            onClick: O[6] || (O[6] = (z) => {
              G(-1), b.value = !1;
            })
          }, [...O[13] || (O[13] = [
            n("span", null, "⏮ 上一个面板", -1)
          ])]),
          n("button", {
            type: "button",
            class: "ms-cube-cm-action",
            onClick: O[7] || (O[7] = (z) => {
              G(1), b.value = !1;
            })
          }, [...O[14] || (O[14] = [
            n("span", null, "⏭ 下一个面板", -1)
          ])]),
          r.value ? (l(), p("button", {
            key: 0,
            type: "button",
            class: "ms-cube-cm-action danger",
            onClick: O[8] || (O[8] = (z) => _(() => s(Pe).removeCustomFace(r.value)))
          }, "删除当前面")) : E("", !0),
          n("button", {
            type: "button",
            class: "ms-cube-cm-action danger",
            onClick: y
          }, [...O[15] || (O[15] = [
            n("span", null, "↺ 恢复默认（仅音乐）", -1)
          ])])
        ], 4)) : E("", !0)
      ])),
      t.active ? (l(), ce(Mr, { key: 1 })) : E("", !0)
    ], 40, Dr)), [
      [ao, t.active]
    ]);
  }
}), ul = /* @__PURE__ */ De(dl, [["__scopeId", "data-v-591e9de8"]]), xo = _e({
  isOpen: !1
}), ns = {
  open() {
    xo.isOpen = !0;
  },
  close() {
    xo.isOpen = !1;
  },
  toggle() {
    xo.isOpen = !xo.isOpen;
  }
}, jn = Tt(xo);
function pl() {
  if (typeof chrome > "u" || !chrome.runtime?.onMessage) return () => {
  };
  let e = !1, t;
  const o = (i, a, r) => {
    a.id !== chrome.runtime.id || i?.type !== "TOGGLE_SIDE_DRAWER" || t === void 0 || i.targetTabId !== t || (ns.toggle(), r({ ok: !0 }));
  };
  return chrome.tabs.getCurrent().then((i) => {
    e || (t = i?.id, chrome.runtime.onMessage.addListener(o));
  }).catch(() => console.warn("[SideDrawer] Could not bind the home-page command.")), () => {
    e = !0, chrome.runtime.onMessage.removeListener(o);
  };
}
const hl = { class: "tb-brand" }, gl = ["title", "aria-expanded", "aria-label"], fl = ["src", "alt"], ml = ["hidden"], vl = ["title", "hidden"], yl = { id: "vue-bookmark-folder-strip-root" }, wl = { class: "tb-actions" }, bl = {
  id: "workspace-launchers",
  hidden: ""
}, kl = ["title", "aria-expanded"], _l = ["title"], Cl = /* @__PURE__ */ de({
  __name: "AppTopBar",
  setup(e) {
    const t = V(() => import("./WorkspaceLaunchers-C9BeIlkq.js"));
    function o(d) {
      d.preventDefault(), d.stopPropagation();
      const h = typeof window < "u" ? window : null;
      h?.LogicWeaverWindowManager?.open ? h.LogicWeaverWindowManager.open("settings") : h?.LogicWeaverWindowTabs?.open ? h.LogicWeaverWindowTabs.open("settings") : sn.open();
    }
    function i(d) {
      d.preventDefault();
      const h = typeof window < "u" ? window : null;
      typeof h?.toggleBookmarkPanel == "function" ? h.toggleBookmarkPanel() : h?.LogicWeaverBookmarkPanel?.toggle ? h.LogicWeaverBookmarkPanel.toggle() : Kn.toggleBookmarkPanel();
    }
    function a(d) {
      d.preventDefault(), St.toggle();
    }
    function r(d) {
      d.preventDefault(), Mo.open(d.clientX, d.clientY);
    }
    function m(d) {
      const h = d.target;
      h && (h.tagName === "INPUT" || h.tagName === "TEXTAREA" || h.isContentEditable) || (d.preventDefault(), d.stopPropagation());
    }
    function g(d) {
      const h = d.target;
      h && (h.tagName === "INPUT" || h.tagName === "TEXTAREA" || h.isContentEditable) || d.preventDefault();
    }
    return Ve(() => {
      St.start();
      const d = localStorage.getItem("theme") || "light";
      document.documentElement.dataset.theme = d, document.documentElement.setAttribute("data-theme", d);
    }), (d, h) => (l(), p("header", {
      class: le(["topbar", { "bookmark-folders-mode": s(Xt).enabled }]),
      onCopy: m,
      onSelectstart: g
    }, [
      n("div", hl, [
        n("button", {
          id: "bili-profile-button",
          class: "bili-profile-button",
          type: "button",
          title: s(c)("topbar.notifications"),
          "aria-controls": "notification-center",
          "aria-expanded": s(Ni).isOpen,
          "aria-label": s(po) ? s(c)("topbar.notificationsUnread", { count: s(po) }) : s(c)("topbar.notifications"),
          onClick: a,
          onContextmenu: h[0] || (h[0] = H((b) => r(b), ["prevent"]))
        }, [
          n("img", {
            id: "bili-profile-avatar",
            src: s(Yt).avatarUrl || "assets/bilibili.svg",
            alt: s(Yt).userName || s(c)("topbar.notifications")
          }, null, 8, fl),
          n("span", {
            id: "bili-profile-badge",
            class: "bili-profile-badge",
            hidden: s(po) <= 0
          }, u(s(po) > 99 ? "99+" : s(po)), 9, ml)
        ], 40, gl),
        n("button", {
          id: "bookmark-handle",
          class: "bookmark-handle",
          type: "button",
          "aria-expanded": "false",
          title: s(c)("topbar.bookmarks"),
          hidden: s(Xt).enabled,
          onClick: i
        }, [
          h[2] || (h[2] = n("span", { id: "bookmark-handle-icon" }, "📁", -1)),
          n("span", null, u(s(c)("topbar.bookmarks")), 1)
        ], 8, vl),
        n("div", yl, [
          Z(fr)
        ])
      ]),
      Z(ul, {
        active: !s(Lt).activeId
      }, null, 8, ["active"]),
      n("div", wl, [
        h[3] || (h[3] = n("button", {
          id: "daily-toggle",
          class: "tb-pill",
          type: "button",
          hidden: "",
          title: "查看日报"
        }, "📰 日报", -1)),
        n("span", bl, [
          Z(s(t))
        ]),
        n("button", {
          id: "side-drawer-toggle",
          class: le(["tb-btn", { active: s(jn).isOpen }]),
          type: "button",
          title: s(c)("topbar.sidebar"),
          "aria-controls": "in-page-side-drawer",
          "aria-expanded": s(jn).isOpen,
          onClick: h[1] || (h[1] = (b) => s(ns).toggle())
        }, " 📑 ", 10, kl),
        n("button", {
          id: "settings-open",
          class: "tb-btn",
          title: s(c)("topbar.settings"),
          onClick: o
        }, "⚙", 8, _l)
      ])
    ], 34));
  }
}), xl = {
  key: 0,
  class: "notice"
}, Ll = {
  key: 1,
  class: "muted small"
}, $l = {
  key: 2,
  class: "notice"
}, Sl = {
  key: 3,
  class: "notice"
}, Tl = { class: "wx-cur" }, Il = { class: "wx-emoji" }, Ml = { class: "wx-temp" }, Dl = { class: "wx-sub" }, Al = { class: "wx-rain" }, El = { class: "wx-hours" }, Pl = { class: "hh" }, Wl = { class: "he" }, Rl = { class: "ht" }, Nl = { class: "wx-days" }, Ol = ["open"], Bl = { class: "weather-forecast-head" }, Fl = { class: "weather-forecast-city-info" }, Hl = { class: "weather-forecast-icon" }, jl = { id: "weather-forecast-city-title" }, zl = { class: "small muted" }, Gl = { class: "weather-forecast-actions" }, Kl = ["title"], Vl = ["title"], Ul = {
  key: 0,
  class: "weather-metrics-grid"
}, Yl = { class: "weather-metric-item" }, ql = { class: "metric-label" }, Xl = {
  class: "metric-val",
  id: "weather-forecast-humidity"
}, Jl = { class: "weather-metric-item" }, Zl = { class: "metric-label" }, Ql = {
  class: "metric-val",
  id: "weather-forecast-wind"
}, ec = { class: "weather-metric-item" }, tc = { class: "metric-label" }, oc = {
  class: "metric-val",
  id: "weather-forecast-uv"
}, nc = { class: "weather-metric-item" }, ic = { class: "metric-label" }, sc = {
  class: "metric-val",
  id: "weather-forecast-aqi"
}, ac = {
  class: "weather-forecast-list",
  id: "weather-forecast-days-list"
}, rc = { class: "day-date-col" }, lc = { class: "day-name" }, cc = { class: "day-date small muted" }, dc = { class: "day-weather-col" }, uc = { class: "day-emoji" }, pc = { class: "day-cond" }, hc = { class: "day-rain-col" }, gc = {
  key: 0,
  class: "rain-tag"
}, fc = {
  key: 1,
  class: "rain-tag empty"
}, mc = { class: "day-temp-bar-col" }, vc = { class: "low-temp" }, yc = { class: "temp-track" }, wc = { class: "high-temp" }, bc = { class: "weather-location-head" }, kc = { class: "weather-location-title-row" }, _c = { class: "weather-location-title" }, Cc = ["title"], xc = { class: "weather-input-wrapper" }, Lc = ["placeholder", "onKeydown"], $c = ["title"], Sc = {
  type: "submit",
  class: "weather-location-submit"
}, Tc = { key: 0 }, Ic = { class: "weather-section-subtitle" }, Mc = {
  key: 0,
  class: "weather-location-suggestions"
}, Dc = ["onClick"], Ac = { class: "weather-suggestion-name" }, Ec = { class: "weather-suggestion-sub" }, Pc = {
  key: 1,
  class: "weather-suggestion-empty"
}, Wc = { key: 1 }, Rc = { class: "weather-section-subtitle" }, Nc = { class: "weather-quick-chips-grid" }, Oc = ["onClick"], Bc = /* @__PURE__ */ de({
  __name: "WeatherWidget",
  setup(e) {
    const t = j(!1), o = j({ x: 0, y: 0 }), i = j(""), a = j(null), r = j(null), m = ["深圳", "武汉", "北京", "上海", "广州", "成都", "杭州", "南京", "西安", "重庆", "苏州", "天津"], g = oe(() => {
      const y = i.value.trim();
      return y ? Ut.filterCities(y, 6) : [];
    });
    function d(y) {
      const B = y?.clientX ?? window.innerWidth / 2 - 140, D = y?.clientY ?? window.innerHeight / 2 - 320 / 2, $ = Math.max(12, Math.min(window.innerWidth - 280 - 12, B)), L = Math.max(12, Math.min(window.innerHeight - 320 - 12, D));
      o.value = { x: $, y: L }, t.value = !0, i.value = "", vt(() => {
        r.value?.focus();
      });
    }
    function h() {
      t.value = !1, i.value = "";
    }
    async function b(y) {
      const _ = y.trim();
      _ && (h(), await Ut.changeCity(_));
    }
    function M() {
      const y = i.value.trim();
      y && b(y);
    }
    function v(y) {
      if (!t.value) return;
      const _ = y.target;
      a.value && !a.value.contains(_) && h();
    }
    function x(y) {
      t.value && y.key === "Escape" && (y.preventDefault(), h());
    }
    Ve(() => {
      it.setRefreshAction(() => {
        Ut.loadWeather();
      }), it.setChangeLocationAction((y) => {
        d(y);
      }), Ut.loadWeather(), Oe(ct, () => {
        Ut.reformatCurrentWeather();
      }), window.addEventListener("pointerdown", v, !0), window.addEventListener("keydown", x, !0);
    }), It(() => {
      window.removeEventListener("pointerdown", v, !0), window.removeEventListener("keydown", x, !0);
    });
    function f(y) {
      y.preventDefault(), d(y);
    }
    function C() {
      it.closeForecastModal();
    }
    function I(y) {
      y.target?.id === "weather-forecast-dialog" && C();
    }
    return (y, _) => (l(), p("div", {
      class: "weather-widget-container",
      onContextmenu: f
    }, [
      s(K).state === "unconfigured" ? (l(), p("p", xl, u(s(c)("weather.noCitySet")), 1)) : s(K).state === "loading" ? (l(), p("p", Ll, u(s(c)("common.loading")), 1)) : s(K).state === "not_found" ? (l(), p("p", $l, u(s(c)("weather.cityNotFound", { city: s(K).city })), 1)) : s(K).state === "error" ? (l(), p("p", Sl, u(s(K).errorMessage || s(c)("weather.loadFailed")), 1)) : s(K).state === "ready" && s(K).data ? (l(), p(Y, { key: 4 }, [
        n("div", Tl, [
          n("span", Il, u(s(K).data.currentEmoji), 1),
          n("span", Ml, u(s(K).data.currentTemp) + "°", 1)
        ]),
        n("p", Dl, u(s(K).data.subText), 1),
        n("p", Al, u(s(K).data.rainText), 1),
        n("div", El, [
          (l(!0), p(Y, null, fe(s(K).data.hours, (S, R) => (l(), p("div", {
            key: R,
            class: "wx-h"
          }, [
            n("span", Pl, u(S.time), 1),
            n("span", Wl, u(S.emoji), 1),
            n("span", Rl, u(S.temp) + "°", 1)
          ]))), 128))
        ]),
        n("div", Nl, [
          (l(!0), p(Y, null, fe(s(K).data.days, (S, R) => (l(), p("span", { key: R }, u(S.label) + " " + u(S.emoji) + " " + u(S.tempRange), 1))), 128))
        ])
      ], 64)) : E("", !0),
      n("dialog", {
        id: "weather-forecast-dialog",
        class: "weather-forecast-dialog",
        open: s(K).forecastModalOpen,
        onClick: I
      }, [
        n("div", {
          class: "weather-forecast-shell",
          onClick: _[1] || (_[1] = H(() => {
          }, ["stop"]))
        }, [
          n("header", Bl, [
            n("div", Fl, [
              n("span", Hl, u(s(K).data?.currentEmoji || "🌤️"), 1),
              n("div", null, [
                n("h3", jl, u(s(K).city || s(K).data?.cityName || s(c)("weather.forecastTitle")), 1),
                n("p", zl, u(s(K).data?.subText || s(c)("weather.forecastSub")), 1)
              ])
            ]),
            n("div", Gl, [
              n("button", {
                id: "weather-forecast-refresh-btn",
                type: "button",
                class: "weather-forecast-btn",
                title: s(c)("weather.refreshTitle"),
                onClick: _[0] || (_[0] = (S) => s(it).refresh())
              }, u(s(c)("weather.refresh")), 9, Kl),
              n("button", {
                id: "weather-forecast-close-btn",
                type: "button",
                class: "weather-forecast-close",
                title: s(c)("common.close"),
                onClick: C
              }, " ✕ ", 8, Vl)
            ])
          ]),
          s(K).detailInfo ? (l(), p("div", Ul, [
            n("div", Yl, [
              n("span", ql, u(s(c)("weather.metric.humidity")), 1),
              n("span", Xl, u(s(K).detailInfo.humidity || "50%"), 1)
            ]),
            n("div", Jl, [
              n("span", Zl, u(s(c)("weather.metric.wind")), 1),
              n("span", Ql, u(s(K).detailInfo.wind || (s(ct) === "en" ? "Breeze" : "微风")), 1)
            ]),
            n("div", ec, [
              n("span", tc, u(s(c)("weather.metric.uv")), 1),
              n("span", oc, u(s(K).detailInfo.uvIndex || (s(ct) === "en" ? "Moderate" : "中等")), 1)
            ]),
            n("div", nc, [
              n("span", ic, u(s(c)("weather.metric.aqi")), 1),
              n("span", sc, u(s(K).detailInfo.airQuality || (s(ct) === "en" ? "Good" : "良")), 1)
            ])
          ])) : E("", !0),
          n("div", ac, [
            (l(!0), p(Y, null, fe(s(K).forecastDays, (S, R) => (l(), p("div", {
              key: R,
              class: "weather-forecast-day-row forecast-day-item"
            }, [
              n("div", rc, [
                n("span", lc, u(S.dayName), 1),
                n("span", cc, u(S.date), 1)
              ]),
              n("div", dc, [
                n("span", uc, u(S.emoji), 1),
                n("span", pc, u(S.condition), 1)
              ]),
              n("div", hc, [
                S.rainProb > 0 ? (l(), p("span", gc, "☂️ " + u(S.rainProb) + "%", 1)) : (l(), p("span", fc, u(s(c)("weather.metric.noRain")), 1))
              ]),
              n("div", mc, [
                n("span", vc, u(S.lowTemp) + "°", 1),
                n("div", yc, [
                  n("div", {
                    class: "temp-range-fill",
                    style: ke({
                      left: `${Math.max(0, Math.min(100, (S.lowTemp + 10) * 2))}%`,
                      width: `${Math.max(20, Math.min(80, (S.highTemp - S.lowTemp) * 6))}%`
                    })
                  }, null, 4)
                ]),
                n("span", wc, u(S.highTemp) + "°", 1)
              ])
            ]))), 128))
          ])
        ])
      ], 8, Ol),
      (l(), ce(yt, { to: "body" }, [
        t.value ? (l(), p("div", {
          key: 0,
          ref_key: "contextMenuRef",
          ref: a,
          class: "weather-location-context-menu",
          style: ke({ left: `${o.value.x}px`, top: `${o.value.y}px` }),
          onClick: _[4] || (_[4] = H(() => {
          }, ["stop"])),
          onContextmenu: _[5] || (_[5] = H(() => {
          }, ["prevent"]))
        }, [
          n("div", bc, [
            n("div", kc, [
              n("span", _c, u(s(c)("weather.menu.changeLocation")), 1),
              n("span", {
                class: "weather-location-curr-badge",
                title: s(K).city
              }, [
                _[6] || (_[6] = n("span", { class: "weather-curr-dot" }, null, -1)),
                Ye(" " + u(s(K).city || s(c)("weather.menu.unset")), 1)
              ], 8, Cc)
            ])
          ]),
          n("form", {
            class: "weather-location-form",
            onSubmit: H(M, ["prevent"])
          }, [
            n("div", xc, [
              _[7] || (_[7] = n("span", { class: "weather-input-icon" }, "🔍", -1)),
              He(n("input", {
                ref_key: "inputRef",
                ref: r,
                class: "weather-location-input",
                placeholder: s(c)("weather.menu.inputPlaceholder"),
                "onUpdate:modelValue": _[2] || (_[2] = (S) => i.value = S),
                onKeydown: Ft(H(M, ["prevent"]), ["enter"]),
                autocomplete: "off"
              }, null, 40, Lc), [
                [so, i.value]
              ]),
              i.value ? (l(), p("button", {
                key: 0,
                type: "button",
                class: "weather-input-clear",
                onClick: _[3] || (_[3] = (S) => i.value = ""),
                title: s(c)("weather.menu.clearInput")
              }, "✕", 8, $c)) : E("", !0)
            ]),
            n("button", Sc, u(s(c)("weather.menu.submit")), 1)
          ], 32),
          i.value.trim() ? (l(), p("div", Tc, [
            n("div", Ic, u(s(c)("weather.menu.suggestions")), 1),
            g.value.length ? (l(), p("div", Mc, [
              (l(!0), p(Y, null, fe(g.value, (S) => (l(), p("button", {
                key: S.name + S.admin,
                type: "button",
                class: "weather-suggestion-item",
                onClick: (R) => b(S.name)
              }, [
                n("span", Ac, u(S.name), 1),
                n("span", Ec, u(S.admin), 1)
              ], 8, Dc))), 128))
            ])) : (l(), p("div", Pc, u(s(c)("weather.menu.emptySuggestion")), 1))
          ])) : (l(), p("div", Wc, [
            n("div", Rc, u(s(c)("weather.menu.commonCities")), 1),
            n("div", Nc, [
              (l(), p(Y, null, fe(m, (S) => n("button", {
                key: S,
                type: "button",
                class: le(["weather-quick-chip", { active: s(K).city === S }]),
                onClick: (R) => b(S)
              }, u(S), 11, Oc)), 64))
            ])
          ]))
        ], 36)) : E("", !0)
      ]))
    ], 32));
  }
}), is = /* @__PURE__ */ De(Bc, [["__scopeId", "data-v-5aae12b5"]]), zn = "heroCustomMottoV1";
function Fc() {
  try {
    if (typeof localStorage < "u") {
      const e = localStorage.getItem(zn);
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
const Gt = Fc(), U = _e({
  loaded: !1,
  customText: Gt.customText,
  history: Gt.history,
  currentIndex: Gt.customText && Gt.history.length ? Gt.history.findIndex((e) => e.text === Gt.customText) : -1,
  menuOpen: !1,
  menuPos: { x: 0, y: 0 }
});
function Hc(e) {
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
function zc(e) {
  const t = (a) => String(a).padStart(2, "0"), o = `${e.getFullYear()}-${t(e.getMonth() + 1)}-${t(e.getDate())}`, i = `${t(e.getHours())}:${t(e.getMinutes())}`;
  return { date: o, time: i };
}
const nt = {
  async init() {
    try {
      const e = await Hc(zn);
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
    await jc(zn, e);
  },
  setCustomMotto(e) {
    const t = e.trim();
    if (!t) {
      this.resetToSystem();
      return;
    }
    const { date: o, time: i } = zc(/* @__PURE__ */ new Date());
    U.customText = t;
    const a = U.history.findIndex((r) => r.text === t);
    if (a !== -1) {
      const r = U.history.splice(a, 1)[0];
      r.date = o, r.time = i, U.history.unshift(r);
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
}, Gc = ["title"], Kc = ["placeholder"], Vc = { class: "motto-content" }, Uc = ["title"], Yc = { class: "motto-menu-header" }, qc = { class: "dim" }, Xc = { class: "motto-history-label" }, Jc = { class: "motto-history-list" }, Zc = {
  key: 0,
  class: "motto-history-empty dim"
}, Qc = ["onClick"], ed = { class: "motto-item-date" }, td = ["title"], od = ["title", "onClick"], nd = /* @__PURE__ */ de({
  __name: "HeroMotto",
  setup(e) {
    const t = j(!1), o = j(""), i = j(null), a = {
      夜深了: "clock.greeting.lateNight",
      早上好: "clock.greeting.morning",
      上午好: "clock.greeting.forenoon",
      中午好: "clock.greeting.noon",
      下午好: "clock.greeting.afternoon",
      晚上好: "clock.greeting.evening",
      你好: "clock.greeting.hello"
    };
    function r(f) {
      const C = a[f];
      return C ? c(C) : f;
    }
    const m = oe(() => U.customText ? r(U.customText) : be.greetingText);
    function g() {
      nt.closeMenu(), o.value = U.customText || be.greetingText, t.value = !0, vt(() => {
        i.value?.focus(), i.value?.select();
      });
    }
    function d() {
      if (!t.value) return;
      t.value = !1;
      const f = o.value.trim();
      nt.setCustomMotto(f), f && we.fetch(c("motto.appName"), c("motto.updated", { text: f }));
    }
    function h() {
      t.value = !1;
    }
    function b(f) {
      f.key === "Enter" ? (f.preventDefault(), d()) : f.key === "Escape" && (f.preventDefault(), h());
    }
    function M(f) {
      t.value || (f.preventDefault(), f.stopPropagation(), nt.stepHistory(f.deltaY > 0 ? 1 : -1));
    }
    function v(f) {
      f.preventDefault(), f.stopPropagation(), nt.openMenu(f.clientX, f.clientY);
    }
    function x(f) {
      U.menuOpen && (f.target.closest(".motto-context-menu") || nt.closeMenu());
    }
    return Ve(() => {
      nt.init(), window.addEventListener("click", x);
    }), It(() => {
      window.removeEventListener("click", x);
    }), (f, C) => (l(), p(Y, null, [
      n("div", {
        class: "hero-motto-wrapper",
        title: s(c)("motto.hint"),
        onWheel: M,
        onContextmenu: v
      }, [
        t.value ? He((l(), p("input", {
          key: 0,
          ref_key: "mottoInputRef",
          ref: i,
          "onUpdate:modelValue": C[0] || (C[0] = (I) => o.value = I),
          class: "hero-motto-input",
          type: "text",
          placeholder: s(c)("motto.placeholder"),
          maxlength: "60",
          onBlur: d,
          onKeydown: b
        }, null, 40, Kc)), [
          [so, o.value]
        ]) : (l(), p("p", {
          key: 1,
          id: "greeting",
          class: "hero-motto-text",
          style: ke({ color: s(be).greetColor }),
          onClick: g
        }, [
          n("span", Vc, u(m.value), 1),
          s(U).history.length > 1 ? (l(), p("span", {
            key: 0,
            class: "motto-scroll-hint",
            title: s(c)("motto.scrollHint")
          }, "⇕", 8, Uc)) : E("", !0)
        ], 4))
      ], 40, Gc),
      (l(), ce(yt, { to: "body" }, [
        s(U).menuOpen ? (l(), p("div", {
          key: 0,
          class: "motto-context-menu",
          style: ke({ left: `${s(U).menuPos.x}px`, top: `${s(U).menuPos.y}px` }),
          onClick: C[3] || (C[3] = H(() => {
          }, ["stop"])),
          onContextmenu: C[4] || (C[4] = H(() => {
          }, ["prevent"]))
        }, [
          n("div", Yc, [
            n("span", null, u(s(c)("motto.customTitle")), 1),
            n("small", qc, u(s(c)("motto.recordsCount", { count: s(U).history.length })), 1)
          ]),
          n("button", {
            type: "button",
            class: "motto-menu-action",
            onClick: g
          }, [
            C[5] || (C[5] = n("i", null, "✎", -1)),
            n("span", null, u(s(c)("motto.editCurrent")), 1)
          ]),
          C[8] || (C[8] = n("div", { class: "motto-menu-divider" }, null, -1)),
          n("div", Xc, u(s(c)("motto.historyLabel")), 1),
          n("div", Jc, [
            s(U).history.length ? (l(!0), p(Y, { key: 1 }, fe(s(U).history, (I) => (l(), p("div", {
              key: I.id,
              class: le(["motto-history-item", { active: s(U).customText === I.text }]),
              onClick: (y) => s(nt).selectHistory(I)
            }, [
              n("span", ed, u(I.date), 1),
              n("span", {
                class: "motto-item-text",
                title: r(I.text)
              }, u(r(I.text)), 9, td),
              n("button", {
                type: "button",
                class: "motto-item-del",
                title: s(c)("motto.deleteEntry"),
                onClick: H((y) => s(nt).deleteEntry(I.id), ["stop"])
              }, "×", 8, od)
            ], 10, Qc))), 128)) : (l(), p("div", Zc, u(s(c)("motto.historyEmpty")), 1))
          ]),
          C[9] || (C[9] = n("div", { class: "motto-menu-divider" }, null, -1)),
          n("button", {
            type: "button",
            class: "motto-menu-action reset-btn",
            onClick: C[1] || (C[1] = //@ts-ignore
            (...I) => s(nt).resetToSystem && s(nt).resetToSystem(...I))
          }, [
            C[6] || (C[6] = n("i", null, "↻", -1)),
            n("span", null, u(s(c)("motto.resetGreeting")), 1)
          ]),
          s(U).history.length ? (l(), p("button", {
            key: 0,
            type: "button",
            class: "motto-menu-action danger-btn",
            onClick: C[2] || (C[2] = //@ts-ignore
            (...I) => s(nt).clearHistory && s(nt).clearHistory(...I))
          }, [
            C[7] || (C[7] = n("i", null, "🗑", -1)),
            n("span", null, u(s(c)("motto.clearAll")), 1)
          ])) : E("", !0)
        ], 36)) : E("", !0)
      ]))
    ], 64));
  }
}), id = /* @__PURE__ */ De(nd, [["__scopeId", "data-v-a65048d3"]]), sd = /* @__PURE__ */ de({
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
    function i() {
      const d = Ot.state.timezone;
      if (!d || d === "local") return /* @__PURE__ */ new Date();
      try {
        const h = (/* @__PURE__ */ new Date()).toLocaleString("en-US", { timeZone: d });
        return new Date(h);
      } catch {
        return /* @__PURE__ */ new Date();
      }
    }
    function a() {
      const d = (D) => String(D).padStart(2, "0"), h = i(), b = h.getHours(), M = h.getMinutes(), v = h.getSeconds(), x = h.getFullYear(), f = h.getMonth() + 1, C = h.getDate(), I = h.getDay(), y = `${d(b)}:${d(M)}`, _ = `:${d(v)}`, S = o(b), R = c(t[I]), B = c("clock.datePattern", {
        year: x,
        month: f,
        day: C,
        week: R
      });
      Zt.updateTime(y, _, S, B);
    }
    function r(d) {
      d.preventDefault(), Ot.open({ clientX: d.clientX, clientY: d.clientY });
    }
    function m() {
      document.hidden ? g && (clearInterval(g), g = null) : (a(), g || (g = setInterval(a, 1e3)));
    }
    let g = null;
    return Ot.initPreferences(), a(), Ve(() => {
      Ot.initPreferences(), Oe(ct, () => {
        a();
      }), Lt.activeId || (a(), g = setInterval(a, 1e3)), document.addEventListener("visibilitychange", m);
    }), Oe(
      () => Lt.activeId,
      (d) => {
        d ? g && (clearInterval(g), g = null) : document.hidden || (a(), g || (g = setInterval(a, 1e3)));
      }
    ), It(() => {
      g && (clearInterval(g), g = null), document.removeEventListener("visibilitychange", m);
    }), (d, h) => (l(), p("div", {
      class: "hero-clock-vue-container",
      onContextmenu: r
    }, [
      n("p", {
        id: "clock",
        class: "clock",
        style: ke({ fontFamily: s(be).fontFamily, color: s(be).colorHex })
      }, [
        Ye(u(s(be).timeText), 1),
        n("span", {
          id: "secs",
          style: ke({ color: s(be).colorHex })
        }, u(s(be).secsText), 5)
      ], 4),
      n("p", {
        id: "date",
        class: "date",
        style: ke({ color: s(be).dateColor })
      }, u(s(be).dateText), 5)
    ], 32));
  }
}), ss = /* @__PURE__ */ De(sd, [["__scopeId", "data-v-f946341c"]]), ad = {
  key: 0,
  class: "home-music-degraded-box"
}, rd = { class: "degraded-badge-row" }, ld = { class: "degraded-status" }, cd = {
  key: 0,
  class: "degraded-host-tag"
}, dd = {
  key: 1,
  class: "degraded-host-tag"
}, ud = { class: "degraded-title-row" }, pd = ["title"], hd = { class: "degraded-track-artist" }, gd = { class: "degraded-progress-bar-wrap" }, fd = { class: "degraded-actions" }, md = { class: "degraded-time" }, vd = { class: "home-vinyl-box" }, yd = ["title"], wd = ["src", "alt"], bd = { class: "home-music-right" }, kd = ["title"], _d = {
  id: "home-music-artist",
  class: "home-music-meta-artist"
}, Cd = { class: "home-music-seek-row" }, xd = {
  id: "home-music-cur",
  class: "home-music-time"
}, Ld = ["value"], $d = {
  id: "home-music-dur",
  class: "home-music-time"
}, Sd = { class: "home-music-actions" }, Td = ["title"], Id = ["title"], Md = ["title"], Dd = ["title"], Ad = ["title"], Ed = /* @__PURE__ */ de({
  __name: "HomeMusicCard",
  setup(e) {
    Ve(() => {
      setTimeout(() => {
        Gs();
      }, 200);
    });
    const t = oe(() => Ri.visible || lt.djModalOpen || lt.isActive && lt.isJoined), o = oe(() => lt.isActive && lt.isJoined), i = oe(() => !X.title || X.title === "点击播放" ? c("home.music.defaultTitle") : X.title), a = oe(() => !X.artist || X.artist === "作者" ? c("home.music.defaultArtist") : X.artist), r = oe(() => X.mode === "shuffle" ? "🔀" : X.mode === "one" ? "🔂" : "🔁");
    function m(d) {
      const h = d.target, b = Number(h.value);
      Ue.seek(b);
    }
    function g() {
      Ue.update({ coverUrl: "" });
    }
    return (d, h) => (l(), p("div", {
      id: "home-music-player-view",
      class: le(["home-music-player-view", { "is-degraded": t.value }])
    }, [
      t.value ? (l(), p("div", ad, [
        n("div", rd, [
          h[7] || (h[7] = n("span", { class: "degraded-icon" }, "🎧", -1)),
          n("strong", ld, u(o.value ? s(c)("home.music.togetherListening") : s(c)("home.music.backgroundListening")), 1),
          o.value ? (l(), p("span", cd, " DJ: " + u(s(lt).hostName), 1)) : (l(), p("span", dd, u(s(c)("home.music.workspaceReady")), 1))
        ]),
        n("div", ud, [
          n("h3", {
            class: "degraded-track-title",
            title: i.value
          }, u(i.value || s(c)("home.music.standby")), 9, pd),
          n("p", hd, u(a.value), 1)
        ]),
        n("div", gd, [
          n("div", {
            class: "degraded-progress-bar-fill",
            style: ke({ width: s(X).progressPercent + "%" })
          }, null, 4)
        ]),
        n("div", fd, [
          n("button", {
            type: "button",
            class: "degraded-btn",
            onClick: h[0] || (h[0] = (b) => s(Ue).togglePlay())
          }, u(s(X).playing ? s(c)("home.music.pause") : s(c)("home.music.play")), 1),
          n("span", md, u(s(X).formattedCurrent) + " / " + u(s(X).formattedDuration), 1)
        ])
      ])) : (l(), p(Y, { key: 1 }, [
        n("div", vd, [
          n("div", {
            id: "home-vinyl-needle",
            class: le(["home-vinyl-needle", { playing: s(X).playing }])
          }, [...h[8] || (h[8] = [
            _o('<svg viewBox="0 0 32 52" fill="none" data-v-b7cbb119><circle cx="26" cy="4" r="3.5" fill="#e2e8f0" stroke="#475569" stroke-width="1.5" data-v-b7cbb119></circle><circle cx="26" cy="4" r="1.5" fill="#64748b" data-v-b7cbb119></circle><path d="M26 4 L14 26 L11 44" stroke="#cbd5e1" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" data-v-b7cbb119></path><rect x="7" y="42" width="8" height="9" rx="1.5" fill="#f43f5e" transform="rotate(-15 11 46)" data-v-b7cbb119></rect></svg>', 1)
          ])], 2),
          n("div", {
            id: "home-vinyl-disc",
            class: le(["home-vinyl-disc", { playing: s(X).playing }]),
            title: s(c)("home.music.togglePlay"),
            onClick: h[1] || (h[1] = (b) => s(Ue).togglePlay())
          }, [
            s(X).coverUrl ? (l(), p("img", {
              key: 0,
              id: "home-vinyl-cover",
              class: "home-vinyl-cover",
              referrerpolicy: "no-referrer",
              src: s(X).coverUrl,
              alt: s(c)("home.music.coverAlt"),
              onError: g
            }, null, 40, wd)) : E("", !0),
            h[9] || (h[9] = n("div", { class: "home-vinyl-hole" }, null, -1))
          ], 10, yd)
        ]),
        n("div", bd, [
          n("h3", {
            id: "home-music-title",
            class: "home-music-meta-title",
            title: i.value
          }, u(i.value), 9, kd),
          n("p", _d, u(a.value), 1),
          n("div", Cd, [
            n("span", xd, u(s(X).formattedCurrent), 1),
            n("input", {
              id: "home-music-seek",
              class: "home-music-seek-bar",
              type: "range",
              min: "0",
              max: "100",
              value: s(X).progressPercent,
              onInput: m
            }, null, 40, Ld),
            n("span", $d, u(s(X).formattedDuration), 1)
          ]),
          n("div", Sd, [
            n("button", {
              id: "home-music-prev",
              class: "home-music-btn",
              type: "button",
              title: s(c)("home.music.prevTrack"),
              onClick: h[2] || (h[2] = (b) => s(Ue).prev())
            }, " ⏮ ", 8, Td),
            n("button", {
              id: "home-music-play",
              class: "home-music-btn play-btn",
              type: "button",
              title: s(c)("home.music.togglePlay"),
              onClick: h[3] || (h[3] = (b) => s(Ue).togglePlay())
            }, u(s(X).playing ? "⏸" : "▶"), 9, Id),
            n("button", {
              id: "home-music-next",
              class: "home-music-btn",
              type: "button",
              title: s(c)("home.music.nextTrack"),
              onClick: h[4] || (h[4] = (b) => s(Ue).next())
            }, " ⏭ ", 8, Md),
            n("button", {
              id: "home-music-like",
              class: le(["home-music-btn like-btn", { liked: s(X).liked }]),
              type: "button",
              title: s(c)("home.music.favorite"),
              onClick: h[5] || (h[5] = (b) => s(Ue).toggleLike())
            }, u(s(X).liked ? "♥" : "♡"), 11, Dd),
            n("button", {
              id: "home-music-mode",
              class: "home-music-btn",
              type: "button",
              title: s(c)("home.music.playMode"),
              onClick: h[6] || (h[6] = (b) => s(Ue).cycleMode())
            }, u(r.value), 9, Ad)
          ])
        ])
      ], 64))
    ], 2));
  }
}), as = /* @__PURE__ */ De(Ed, [["__scopeId", "data-v-b7cbb119"]]), ft = /* @__PURE__ */ new Map(), mt = /* @__PURE__ */ new Set();
function Pd(e, t) {
  for (ft.delete(e), ft.set(e, t), mt.delete(t), mt.add(t); ft.size > 512; )
    ft.delete(ft.keys().next().value);
  for (; mt.size > 512; )
    mt.delete(mt.values().next().value);
}
const Wd = {
  key: 0,
  class: "launcher-fallback"
}, Rd = ["src"], Tn = "lw_resolved_icon:", Nd = /* @__PURE__ */ de({
  __name: "LauncherFavicon",
  props: {
    link: {},
    mini: { type: Boolean, default: !1 }
  },
  setup(e) {
    function t(y) {
      try {
        return localStorage.getItem(Tn + y) || "";
      } catch {
        return "";
      }
    }
    function o(y, _) {
      try {
        localStorage.setItem(Tn + y, _);
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
    function g(y) {
      try {
        const _ = window, S = typeof _.chrome < "u" ? _.chrome : globalThis.chrome;
        if (typeof S?.runtime?.getURL == "function")
          return S.runtime.getURL("_favicon/?pageUrl=" + encodeURIComponent(y) + "&size=64");
      } catch {
      }
      return "";
    }
    const d = oe(() => {
      const y = a.link, _ = (y.title || r(y.url)).trim();
      return _ ? _.slice(0, 1).toUpperCase() : "🔗";
    }), h = j([]), b = j(0), M = j(!1), v = j(!1), x = oe(() => v.value || b.value >= h.value.length ? "" : h.value[b.value] || "");
    function f() {
      const y = a.link;
      if (!y?.url) {
        h.value = [], v.value = !0, M.value = !1;
        return;
      }
      const _ = [], S = i(y.url);
      S && _.push(S);
      const R = ft.get(y.url) || t(y.url);
      R && !_.includes(R) && _.push(R);
      const B = (W) => W ? /google\.com\/s2\/favicons|icons\.duckduckgo\.com|unavatar\.io|icon\.horse/i.test(W) : !1;
      y.customIcon && !B(y.customIcon) && _.push(y.customIcon), y.icon && !B(y.icon) && _.push(y.icon);
      const D = g(y.url);
      D && !_.includes(D) && _.push(D);
      const $ = se.getCachedIcon(y.url);
      $ && !_.includes($) && _.push($);
      const L = m(y.url);
      L && !L.startsWith("http://1.") && !L.startsWith("http://192.") && !L.startsWith("http://127.") && _.push(`${L}/favicon.ico`), y.customIcon && !B(y.customIcon) && _.unshift(y.customIcon);
      const P = [...new Set(_.filter(Boolean))];
      h.value = P, b.value = 0, v.value = P.length === 0;
      const he = P[0];
      he && (he.startsWith("data:") || mt.has(he)) && (M.value = !0);
    }
    Oe(
      () => [a.link?.url, a.link?.icon, a.link?.customIcon],
      (y, _) => {
        _ && y[0] === _[0] && y[1] === _[1] && y[2] === _[2] || f();
      },
      { immediate: !0 }
    ), Ve(() => {
      h.value.length === 0 && f();
    });
    function C(y) {
      M.value = !0, v.value = !1;
      const _ = x.value;
      if (_) {
        const S = mt.has(_), R = ft.get(a.link.url);
        Pd(a.link.url, _), R !== _ && t(a.link.url) !== _ && o(a.link.url, _);
        const B = y.target;
        if (!S && !_.startsWith("data:")) {
          const D = a.link.url;
          setTimeout(() => {
            se.cacheIcon(D, _, B?.getAttribute("src") === _ ? B : null);
          }, 0);
        }
      }
    }
    function I() {
      const y = x.value;
      if (y) {
        mt.delete(y), ft.get(a.link.url) === y && ft.delete(a.link.url);
        try {
          localStorage.removeItem(Tn + a.link.url), localStorage.removeItem("lw_sync_dataurl:" + a.link.url);
        } catch {
        }
      }
      if (y && se.getCachedIcon(a.link.url) === y && se.evictCachedIcon(a.link.url), b.value + 1 < h.value.length) {
        b.value += 1;
        const _ = h.value[b.value];
        _ && (_.startsWith("data:") || mt.has(_)) && (M.value = !0);
      } else
        v.value = !0, M.value = !1;
    }
    return (y, _) => (l(), p("span", {
      class: le(e.mini ? "launcher-folder-mini" : "launcher-favicon")
    }, [
      v.value || !x.value ? (l(), p("span", Wd, u(d.value), 1)) : (l(), p("img", {
        key: 1,
        src: x.value,
        alt: "",
        draggable: "false",
        referrerpolicy: "no-referrer",
        decoding: "async",
        style: { "pointer-events": "none", "user-select": "none" },
        onLoad: C,
        onError: I
      }, null, 40, Rd))
    ], 2));
  }
}), on = /* @__PURE__ */ De(Nd, [["__scopeId", "data-v-bc41d0d8"]]), Od = { class: "launcher-label launcher-title" }, Bd = ["title"], Fd = {
  key: 0,
  class: "launcher-folder-more"
}, Hd = {
  key: 1,
  class: "empty-folder",
  "aria-hidden": "true"
}, jd = { class: "launcher-folder-label launcher-title" }, zd = /* @__PURE__ */ de({
  __name: "LauncherTileContent",
  props: {
    link: {},
    folder: {},
    size: { default: "small" }
  },
  setup(e) {
    const t = e, o = oe(() => t.size === "large" ? 9 : 4), i = oe(() => t.folder?.preview.slice(0, t.folder.count > o.value ? o.value - 1 : o.value) || []);
    return (a, r) => e.link ? (l(), p(Y, { key: 0 }, [
      Z(on, { link: e.link }, null, 8, ["link"]),
      n("span", Od, u(e.link.title), 1)
    ], 64)) : e.folder ? (l(), p(Y, { key: 1 }, [
      n("div", {
        class: "launcher-folder-preview",
        title: `打开${e.folder.title}`
      }, [
        (l(!0), p(Y, null, fe(i.value, (m) => (l(), ce(on, {
          key: m.id,
          link: m,
          mini: !0
        }, null, 8, ["link"]))), 128)),
        e.folder.count > o.value ? (l(), p("span", Fd, "+" + u(e.folder.count - (o.value - 1)), 1)) : E("", !0),
        i.value.length ? E("", !0) : (l(), p("span", Hd, "📁")),
        Pi(a.$slots, "default", {}, void 0, !0)
      ], 8, Bd),
      n("span", jd, u(e.folder.title), 1)
    ], 64)) : E("", !0);
  }
}), Li = /* @__PURE__ */ De(zd, [["__scopeId", "data-v-7f513029"]]), Gd = 5, Kd = 180;
function Vd(e, t, o) {
  const i = t - e.left, a = o - e.top;
  return i > e.width * 0.25 && i < e.width * 0.75 && a > e.height * 0.25 && a < e.height * 0.75;
}
function Ud(e, t, o) {
  return Math.hypot(t - (e.left + e.width / 2), o - (e.top + e.height / 2)) <= Math.max(e.width, e.height) * 0.55;
}
const Yd = {
  class: "launcher-group launcher-aihot launcher-todoist size-large",
  id: "launcher-todoist"
}, qd = { class: "card-head aihot-home-head" }, Xd = { class: "title" }, Jd = ["title"], Zd = ["title"], Qd = {
  class: "aihot-home-body",
  id: "aihot-home-body"
}, eu = {
  key: 0,
  class: "muted small"
}, tu = {
  key: 1,
  class: "notice small"
}, ou = {
  key: 2,
  class: "muted small aihot-home-empty"
}, nu = {
  key: 3,
  class: "aihot-home-rich-list"
}, iu = ["href", "title", "onClick"], su = { class: "aihot-home-rich-main" }, au = { class: "aihot-home-rich-title" }, ru = {
  key: 0,
  class: "aihot-home-rich-summary"
}, lu = { class: "aihot-home-rich-meta" }, cu = { class: "aihot-home-rich-meta-left" }, du = {
  key: 0,
  class: "aihot-home-rich-tag"
}, uu = { class: "aihot-home-rich-source" }, pu = { class: "aihot-home-rich-time" }, $i = 6, hu = /* @__PURE__ */ de({
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
    }, o = j([]), i = j(0), a = j(!0), r = j("");
    function m(y) {
      return ct.value === "en" && y.originalTitle ? y.originalTitle : y.title;
    }
    function g(y) {
      const _ = y.source?.name || y.sourceName || "AI HOT";
      return ct.value === "en" && _.includes("：") ? _.split("：")[0].trim() : _;
    }
    function d(y) {
      if (!y.category) return "";
      const _ = t[y.category];
      if (_)
        try {
          return c(_);
        } catch {
        }
      return y.category;
    }
    const h = oe(() => ct.value !== "en" ? o.value : [...o.value].sort((y, _) => {
      const S = !!(y.originalTitle && /[a-zA-Z]{3,}/.test(y.originalTitle)), R = !!(_.originalTitle && /[a-zA-Z]{3,}/.test(_.originalTitle));
      return S && !R ? -1 : !S && R ? 1 : 0;
    }));
    function b(y) {
      const _ = y.publishedAt || y.published || "";
      if (!_) return ct.value === "en" ? "Latest" : "最新";
      const S = Number(_), R = Number.isFinite(S) && S > 0 ? new Date(S > 1e12 ? S : S * 1e3) : new Date(_);
      if (isNaN(R.getTime())) return String(_).slice(0, 16) || (ct.value === "en" ? "Latest" : "最新");
      const B = (W) => String(W).padStart(2, "0"), D = R.getFullYear(), $ = B(R.getMonth() + 1), L = B(R.getDate()), P = B(R.getHours()), he = B(R.getMinutes());
      return `${D}-${$}-${L} ${P}:${he}`;
    }
    const M = [
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
      const S = [
        "newtab_aihot_items_v2",
        "lw-aihot-cached-feed-all-24h-v1",
        "lw-aihot-cached-feed-v1"
      ];
      for (const R of S)
        try {
          const B = localStorage.getItem(R);
          if (B) {
            const D = JSON.parse(B);
            if (Array.isArray(D) && D.length) return D;
            if (D && Array.isArray(D.items) && D.items.length) return D.items;
          }
        } catch {
        }
      return [];
    }
    async function x(y = !1) {
      if (!y && o.value.length > 0) return;
      const _ = v();
      _.length ? (o.value = _, a.value = !1) : o.value.length || (o.value = [...M], a.value = !1);
      try {
        const R = await (await fetch("https://aihot.virxact.com/api/v1/items?mode=selected&window=24h&limit=24", {
          headers: { Accept: "application/json" },
          signal: AbortSignal.timeout(5e3)
        })).json(), B = Array.isArray(R) ? R : R.items || R.data || R.results || [];
        if (B.length) {
          o.value = B, i.value = 0, r.value = "";
          try {
            localStorage.setItem("newtab_aihot_items_v2", JSON.stringify(B.slice(0, 30)));
          } catch {
          }
        }
      } catch {
        o.value.length || (o.value = [...M]);
      } finally {
        a.value = !1;
      }
    }
    function f() {
      if (!h.value.length) {
        a.value = !0, x(!0);
        return;
      }
      i.value += $i, i.value >= h.value.length && (i.value = 0);
    }
    function C() {
      const y = window;
      if (typeof y.enterFullscreenCard == "function") {
        y.enterFullscreenCard("daily-aihot");
        return;
      }
      const _ = document.querySelector("#daily-aihot, [data-dock-id='daily-aihot']");
      _ ? _.scrollIntoView({ behavior: "smooth", block: "start" }) : window.open("https://aihot.virxact.com", "_blank", "noreferrer");
    }
    function I(y, _) {
      if (_.ctrlKey || _.metaKey || _.shiftKey || _.button === 1) return;
      _.preventDefault();
      const S = y.links?.original || y.links?.aihot || y.url || "#";
      Xn.openArticle(
        {
          id: y.id,
          title: m(y),
          summary: y.summary,
          sourceName: g(y),
          published: b(y),
          url: S
        },
        ""
      );
    }
    return Ve(() => {
      x();
    }), (y, _) => (l(), p("section", Yd, [
      n("header", qd, [
        _[0] || (_[0] = n("span", { class: "bar cyan" }, null, -1)),
        n("strong", Xd, u(s(c)("aihot.card.title")), 1),
        _[1] || (_[1] = n("span", { class: "grow" }, null, -1)),
        n("button", {
          class: "aihot-home-btn",
          type: "button",
          title: s(c)("aihot.card.refreshBtnTip"),
          onClick: f
        }, u(s(c)("aihot.card.refreshBtn")), 9, Jd),
        n("button", {
          class: "aihot-home-btn aihot-home-more-btn",
          type: "button",
          title: s(c)("aihot.card.hotlistBtnTip"),
          onClick: C
        }, u(s(c)("aihot.card.hotlistBtn")), 9, Zd)
      ]),
      n("div", Qd, [
        a.value && !h.value.length ? (l(), p("p", eu, u(s(c)("aihot.card.loading")), 1)) : r.value && !h.value.length ? (l(), p("p", tu, u(r.value), 1)) : h.value.length ? (l(), p("div", nu, [
          (l(!0), p(Y, null, fe(h.value.slice(i.value, i.value + $i), (S, R) => (l(), p("a", {
            key: S.id || S.title,
            class: "aihot-home-rich-card",
            href: S.links?.original || S.links?.aihot || S.url || "#",
            target: "_blank",
            rel: "noreferrer",
            title: `${m(S)}
${S.summary || ""}
${s(c)("aihot.card.viewInReader")}`,
            onClick: (B) => I(S, B)
          }, [
            n("span", {
              class: le(["aihot-home-rich-rank", { top: i.value + R < 3 }])
            }, u(i.value + R + 1), 3),
            n("div", su, [
              n("h3", au, u(m(S)), 1),
              S.summary ? (l(), p("p", ru, u(S.summary), 1)) : E("", !0),
              n("div", lu, [
                n("div", cu, [
                  d(S) ? (l(), p("span", du, u(d(S)), 1)) : E("", !0),
                  n("span", uu, u(g(S)), 1)
                ]),
                n("time", pu, u(b(S)), 1)
              ])
            ])
          ], 8, iu))), 128))
        ])) : (l(), p("p", ou, u(s(c)("aihot.card.empty")), 1))
      ])
    ]));
  }
}), gu = /* @__PURE__ */ De(hu, [["__scopeId", "data-v-5b229fc1"]]), fu = ["aria-label"], mu = ["disabled", "aria-pressed"], vu = ["disabled", "aria-pressed"], yu = ["aria-label"], wu = ["data-page", "title", "onClick", "onContextmenu", "onDragover", "onDrop"], bu = {
  key: 0,
  id: "bookmark-board-header",
  class: "launcher-page-tabs"
}, ku = ["data-page"], _u = ["href", "title", "data-launcher-id", "onPointerdown", "onClick", "onContextmenu"], Cu = ["title", "data-launcher-folder", "onPointerdown", "onDragstart", "onDrop", "onClick", "onContextmenu"], xu = ["title", "onClick"], Lu = {
  class: "launcher-folder-count",
  hidden: ""
}, $u = {
  class: "launcher-empty",
  key: "empty-msg"
}, Su = {
  key: 1,
  class: "launcher-media-stack"
}, Tu = {
  key: 1,
  id: "launcher-bili"
}, Iu = { class: "launcher-folder-preview" }, Mu = { class: "launcher-folder-label launcher-title" }, Du = { class: "launcher-label launcher-title" }, Au = /* @__PURE__ */ de({
  __name: "FavoriteSites",
  setup(e) {
    const t = V(() => import("./BookmarkBoard-DR6bVqOL.js")), o = V(() => import("./LauncherBookGuideDialog-27hEBQHr.js")), i = j("sites"), a = j(!1), r = j(!1);
    function m() {
      r.value = !0;
    }
    function g() {
      r.value = !1;
    }
    function d() {
      ve(), C = !1, ge = !1;
    }
    Ve(() => {
      Me.setExternalDragHandler($), Me.setExternalDropHandler(L), window.addEventListener("blur", d), window.addEventListener("pagehide", d), document.addEventListener("visibilitychange", d);
      const w = window;
      re.hasBili && typeof w.ensureLauncherMediaCards == "function" && w.ensureLauncherMediaCards();
    });
    const h = j(!1), b = j(""), M = j(null), v = j(null), x = j(null), f = j(null);
    let C = !1, I = 0, y = 0, _ = 0, S = "", R = 0, B = "", D = 0;
    function $(w) {
      if (i.value !== "sites") return;
      if (!w || Xe.isOpen) {
        f.value && (f.value = null), B = "";
        return;
      }
      const k = document.elementsFromPoint(w.clientX, w.clientY);
      if (!k.some(
        (Be) => Be.classList.contains("launcher-site-items") || !!Be.closest?.(".launcher-site-items")
      )) {
        f.value && (f.value = null), B = "";
        return;
      }
      const A = k.find((Be) => Be.classList.contains("launcher-link") && Be.getAttribute("data-launcher-id") !== String(w.link.id) || Be.classList.contains("launcher-folder"));
      if (!A) return;
      const ee = A.classList.contains("launcher-link"), ye = ee ? A.getAttribute("data-launcher-id") : null, Re = ee ? null : A.getAttribute("data-launcher-folder"), ne = ee ? `link-${ye}` : `folder-${Re}`, ae = A.getBoundingClientRect(), Ge = ae.left + ae.width / 2, dn = ae.top + ae.height / 2, uo = Math.hypot(w.clientX - Ge, w.clientY - dn), Ht = Date.now();
      if (uo > Math.max(ae.width, ae.height) * 0.55 || ne === B && Ht - D < 180) return;
      const jt = cn.value.filter(
        (Be) => Be.type !== "link" || String(Be.link.id) !== String(w.link.id)
      ), dt = [...f.value || jt], wt = dt.findIndex(
        (Be) => Be.type === "link" && String(Be.link.id) === String(w.link.id)
      ), bt = dt.findIndex((Be) => Be.key === ne);
      if (bt < 0) return;
      const et = {
        key: `link-${w.link.id}`,
        type: "link",
        link: w.link
      };
      wt >= 0 ? wt !== bt && (dt.splice(wt, 1), dt.splice(bt, 0, et), f.value = dt, B = ne, D = Ht) : (dt.splice(bt, 0, et), f.value = dt, B = ne, D = Ht);
    }
    async function L(w) {
      if (i.value !== "sites" || Xe.isOpen) return !1;
      if (f.value) {
        const k = f.value.map((T) => ({
          type: T.type,
          id: T.type === "link" ? String(T.link.id) : void 0,
          groupName: T.type === "folder" ? T.folder.groupName : void 0
        }));
        return await se.moveLinkTo(String(w.id), re.activePage, "常用网站"), await se.reorderPageItems(re.activePage, k), f.value = null, B = "", !0;
      }
      return !1;
    }
    const P = _e({
      visible: !1,
      x: 0,
      y: 0,
      type: "link",
      link: null,
      folder: null,
      offsetX: 34,
      offsetY: 38
    });
    let he = null, W = 0, G = 0, N = null, q = null, ge = !1;
    function Ce(w, k) {
      if (k.button !== 0) return;
      he = k.pointerId, W = k.clientX, G = k.clientY, y = k.clientX, _ = k.clientY, N = String(w.id), q = null, ge = !1;
      const T = k.currentTarget.getBoundingClientRect();
      P.offsetX = k.clientX - T.left, P.offsetY = k.clientY - T.top, P.type = "link", P.link = w, P.folder = null, window.addEventListener("pointermove", me, { passive: !1 }), window.addEventListener("pointerup", Ie), window.addEventListener("pointercancel", Ie);
    }
    function Ze(w, k, T) {
      if (T.button !== 0 || T.target.closest(".launcher-folder-del-btn")) return;
      he = T.pointerId, W = T.clientX, G = T.clientY, y = T.clientX, _ = T.clientY, N = null, q = w, ge = !1;
      const A = T.currentTarget.getBoundingClientRect();
      P.offsetX = T.clientX - A.left, P.offsetY = T.clientY - A.top, P.type = "folder", P.folder = {
        groupName: w,
        size: ze(w),
        links: k?.links || []
      }, P.link = null, window.addEventListener("pointermove", me, { passive: !1 }), window.addEventListener("pointerup", Ie), window.addEventListener("pointercancel", Ie);
    }
    let F = 0, O = null;
    function z() {
      cancelAnimationFrame(F), F = 0, O = null;
    }
    function me(w) {
      w.pointerId === he && (ge && w.cancelable && w.preventDefault(), O = w, !F && (F = requestAnimationFrame(() => {
        F = 0;
        const k = O;
        O = null, k && xe(k);
      })));
    }
    function xe(w) {
      if (w.pointerId !== he || !N && !q) return;
      const k = Math.hypot(w.clientX - W, w.clientY - G);
      if (!ge && k > Gd && (ge = !0, C = !0, N ? v.value = N : q && (x.value = q)), !ge) return;
      (P.link || P.folder) && (P.visible = !0, P.x = w.clientX - P.offsetX, P.y = w.clientY - P.offsetY);
      const T = document.elementsFromPoint(w.clientX, w.clientY);
      if (ni()) {
        const ne = T.some(
          (Ge) => Ge.id === "launcher-folder-dialog" || !!Ge.closest?.("#launcher-folder-dialog")
        ), ae = document.querySelector("#launcher-folder-dialog");
        if (ne && ae) {
          ae.classList.add("drop-hover-valid"), Xe.dropHoverValid = !0;
          return;
        } else
          ae?.classList.remove("drop-hover-valid"), Xe.dropHoverValid = !1;
        f.value = null;
        return;
      }
      const ee = f.value || cn.value, ye = N ? `link-${N}` : `folder-${q}`;
      if (ee.length) {
        const ne = T.find((ae) => {
          if (ae.classList.contains("launcher-link")) {
            const Ge = ae.getAttribute("data-launcher-id");
            return Ge && `link-${Ge}` !== ye;
          }
          if (ae.classList.contains("launcher-folder")) {
            const Ge = ae.getAttribute("data-launcher-folder");
            return Ge && `folder-${Ge}` !== ye;
          }
          return !1;
        });
        if (ne) {
          const ae = ne.classList.contains("launcher-link"), Ge = ae ? ne.getAttribute("data-launcher-id") : null, dn = ae ? null : ne.getAttribute("data-launcher-folder"), uo = ae ? `link-${Ge}` : `folder-${dn}`, Ht = ne.getBoundingClientRect();
          let jt = !0;
          N && !ae && (Vd(Ht, w.clientX, w.clientY) ? (jt = !1, ne.classList.add("drop-target")) : ne.classList.remove("drop-target"));
          const dt = Date.now();
          if (Ud(Ht, w.clientX, w.clientY) || (jt = !1), uo === S && dt - R < Kd && (jt = !1), jt) {
            document.querySelectorAll(".launcher-folder.drop-target").forEach((et) => et.classList.remove("drop-target"));
            const wt = ee.findIndex((et) => et.key === ye), bt = ee.findIndex((et) => et.key === uo);
            if (wt >= 0 && bt >= 0 && wt !== bt) {
              const et = ee.slice(), Be = et.splice(wt, 1)[0];
              et.splice(bt, 0, Be), f.value = et, S = uo, R = dt;
            }
          }
        }
      }
      const Re = T.find((ne) => ne.classList.contains("launcher-page-tab"));
      if (Re) {
        const ne = Re.getAttribute("data-page");
        ne && ne !== re.activePage && Re.classList.add("drop-target");
      } else
        document.querySelectorAll(".launcher-page-tab.drop-target").forEach((ne) => ne.classList.remove("drop-target"));
    }
    async function Ie(w) {
      if (w.pointerId === he) {
        z(), w.type === "pointercancel" ? ve() : xe(w), window.removeEventListener("pointermove", me), window.removeEventListener("pointerup", Ie), window.removeEventListener("pointercancel", Ie);
        try {
          if (ge) {
            I = Date.now(), C = !1;
            const k = document.elementsFromPoint(w.clientX, w.clientY);
            if (document.querySelectorAll(".launcher-page-tab.drop-target").forEach((A) => A.classList.remove("drop-target")), document.querySelectorAll(".launcher-folder.drop-target").forEach((A) => A.classList.remove("drop-target")), ni() && Xe.activeFolder) {
              if (k.some(
                (ee) => ee.id === "launcher-folder-dialog" || !!ee.closest?.("#launcher-folder-dialog")
              )) {
                const ye = k.find((Re) => Re.hasAttribute("data-child-folder"))?.getAttribute("data-child-folder") || Xe.activeFolder;
                N ? await se.moveLinkTo(N, void 0, ye) : q && await se.moveFolderInto(q, ye);
              }
              return;
            }
            const T = k.find((A) => A.classList.contains("launcher-page-tab"));
            if (T) {
              const A = T.getAttribute("data-page");
              if (A) {
                N ? (await se.moveLinkTo(N, A, "常用网站"), await se.setPage(A)) : q && await se.moveFolderToPage(q, A), ve();
                return;
              }
            }
            if (N) {
              const A = k.find((ee) => ee.classList.contains("launcher-folder"));
              if (A) {
                const ee = A.getAttribute("data-launcher-folder");
                if (ee) {
                  await se.moveLinkTo(N, re.activePage, ee), ve();
                  return;
                }
              }
            }
            if (f.value) {
              const A = f.value.map((ee) => ({
                type: ee.type,
                id: ee.type === "link" ? String(ee.link.id) : void 0,
                groupName: ee.type === "folder" ? ee.folder.groupName : void 0
              }));
              await se.reorderPageItems(re.activePage, A);
            }
          }
        } catch (k) {
          we.show({ appName: "常用网站", title: "移动未完成", message: k instanceof Error ? k.message : "请刷新核对，未自动重试。" });
        } finally {
          ve();
        }
      }
    }
    function ve() {
      z(), he = null, N = null, q = null, ge = !1, C = !1, v.value = null, x.value = null, f.value = null, P.visible = !1, P.link = null, P.folder = null, S = "", document.querySelector("#launcher-folder-dialog")?.classList.remove("drop-hover-valid"), Xe.dropHoverValid = !1, window.removeEventListener("pointermove", me), window.removeEventListener("pointerup", Ie), window.removeEventListener("pointercancel", Ie);
    }
    It(() => {
      Me.setExternalDragHandler(null), Me.setExternalDropHandler(null), ve(), window.removeEventListener("blur", d), window.removeEventListener("pagehide", d), document.removeEventListener("visibilitychange", d), window.removeEventListener("pointermove", me), window.removeEventListener("pointerup", Ie), window.removeEventListener("pointercancel", Ie);
    });
    function Ee(w) {
      const k = re.pageLabels;
      return k && k[w] ? k[w] : w || "常用网站";
    }
    function Qe(w, k) {
      const T = String(w.page || "").trim(), A = String(k).trim(), ee = re.pageLabels || {}, ye = !T || T === "常用网站" || T === "默认";
      if (!A || A === "常用网站" || A === "默认") return ye;
      if (ye) return !1;
      if (T === A) return !0;
      const ne = ee[T] || T, ae = ee[A] || A;
      return ne === ae || T === ae || ne === A;
    }
    function ze(w) {
      const k = re.groupSizes;
      return k && k[w] === "large" ? "large" : "small";
    }
    function ds(w) {
      return w === "large" ? 9 : 4;
    }
    function us(w, k) {
      const T = ds(k), A = w.length > T ? T - 1 : T;
      return w.slice(0, A);
    }
    const cn = oe(() => {
      const w = re.activePage || "常用网站", T = re.links.filter(
        (ne) => Qe(ne, w)
      ), A = /* @__PURE__ */ new Map();
      T.forEach((ne) => {
        const ae = ne.group || "常用网站";
        ae !== "常用网站" && (A.has(ae) || A.set(ae, []), A.get(ae).push(ne));
      });
      const ee = /* @__PURE__ */ new Set(), ye = [];
      T.forEach((ne) => {
        const ae = ne.group || "常用网站";
        Jo(re.folders, ae) || (ae === "常用网站" ? ye.push({ key: `link-${ne.id}`, type: "link", link: ne }) : ee.has(ae) || (ee.add(ae), ye.push({
          key: `folder-${ae}`,
          type: "folder",
          folder: {
            groupName: ae,
            pageName: w,
            links: A.get(ae) || []
          }
        })));
      });
      const Re = re.folders;
      return Re && Object.entries(Re).forEach(([ne, ae]) => {
        if (Jo(re.folders, ne)) return;
        const Ge = ae?.page || "常用网站";
        (Ge === w || w === "常用网站" && Ge === "默认") && !ee.has(ne) && (ee.add(ne), ye.push({
          key: `folder-${ne}`,
          type: "folder",
          folder: {
            groupName: ne,
            pageName: w,
            links: A.get(ne) || []
          }
        }));
      }), ye;
    }), ei = oe(() => f.value && f.value.length ? f.value : cn.value), ps = oe(() => {
      const w = re.activePage || "常用网站", k = Ee(w);
      return k === "默认" || w === "常用网站" ? "还没有快捷入口，点击“编辑入口”后添加。" : `“${k}”还是空的，把网站拖到这里。`;
    });
    function ti(w) {
      f.value = null, v.value = null, x.value = null, Me.switchPage(w);
    }
    function hs() {
      h.value = !0, b.value = "", vt(() => {
        M.value?.focus();
      });
    }
    function oi() {
      if (!h.value) return;
      const w = b.value.trim();
      h.value = !1, w && Me.addPage(w);
    }
    function gs(w) {
      w.key === "Enter" ? (w.preventDefault(), oi()) : w.key === "Escape" && (h.value = !1);
    }
    function fs(w, k) {
      Me.openPageMenu(w, k);
    }
    function ms(w) {
      const k = w.target;
      if (!k || k.closest(".launcher-link") || k.closest(".launcher-folder") || k.closest(".launcher-page-tab") || k.closest("button") || k.closest("input"))
        return;
      w.preventDefault();
      const T = re.activePage || "常用网站";
      no.openBlankMenu(T, w.clientX, w.clientY);
    }
    function vs(w) {
      i.value === "sites" && (!w.shiftKey || re.pages.length < 2 || (w.preventDefault(), w.deltaY > 0 || w.deltaX > 0 ? Me.nextPage() : Me.prevPage()));
    }
    function ys(w) {
      w.target.closest(".launcher-page-tab") || w.stopPropagation();
    }
    function ws(w) {
      w.button === 0 && (y = w.clientX, _ = w.clientY);
    }
    function bs(w, k) {
      if (k.preventDefault(), k.stopPropagation(), je.isEditingShortcuts) {
        je.handleLinkSelection(w);
        return;
      }
      he || (C = !1), !(Math.hypot(k.clientX - y, k.clientY - _) >= 6 || C || Date.now() - I < 600) && Me.openLink(w, k);
    }
    function ks(w, k) {
      Me.openLinkMenu(w, k);
    }
    function _s(w, k) {
      if (he || (C = !1), C || Date.now() - I < 450) {
        k.preventDefault(), k.stopPropagation();
        return;
      }
      Me.openFolder(w, k);
    }
    function Cs(w, k, T) {
      Me.openFolderMenu(w, k, T);
    }
    function xs(w) {
      Me.deleteFolder(w);
    }
    function Ls(w, k) {
      const T = Array.from(k.dataTransfer?.types || []);
      if (!T.includes("application/x-newtab-launcher") && !T.includes("application/x-newtab-bookmark") && !T.includes("text/uri-list") && !T.includes("text/plain")) return;
      k.preventDefault(), k.dataTransfer && (k.dataTransfer.dropEffect = "move"), re.activePage !== w && ti(w), k.currentTarget?.classList.add("drop-target");
    }
    function $s(w) {
      w.currentTarget?.classList.remove("drop-target");
    }
    async function Ss(w, k) {
      k.currentTarget?.classList.remove("drop-target");
      let A = "";
      const ee = k.dataTransfer?.getData("application/x-newtab-launcher");
      if (ee)
        try {
          A = String(JSON.parse(ee)?.id || "");
        } catch {
        }
      if (!A && (v.value || window.__activeLauncherLink) && (A = String(window.__activeLauncherLink?.id || v.value || "")), A) {
        k.preventDefault(), k.stopPropagation(), await se.moveLinkTo(A, w, "常用网站"), await se.setPage(w);
        return;
      }
      const ye = window;
      typeof ye.importDroppedLauncherItem == "function" && (k.preventDefault(), k.stopPropagation(), await ye.importDroppedLauncherItem(k, "常用网站", w));
    }
    function Ts(w) {
      const k = Array.from(w.dataTransfer?.types || []);
      if (!k.includes("application/x-newtab-launcher") && !k.includes("application/x-newtab-bookmark") && !k.includes("text/uri-list") && !k.includes("text/plain")) return;
      w.preventDefault(), w.dataTransfer && (w.dataTransfer.dropEffect = k.includes("application/x-newtab-launcher") ? "move" : "copy"), w.currentTarget?.classList.add("drop-target");
    }
    function Is(w) {
      const k = w.currentTarget;
      k?.contains(w.relatedTarget) || k?.classList.remove("drop-target");
    }
    async function Ms(w) {
      w.currentTarget?.classList.remove("drop-target");
      let T = "";
      const A = w.dataTransfer?.getData("application/x-newtab-launcher");
      if (A)
        try {
          T = String(JSON.parse(A)?.id || "");
        } catch {
        }
      if (!T && (v.value || window.__activeLauncherLink) && (T = String(window.__activeLauncherLink?.id || v.value || "")), T) {
        w.preventDefault(), w.stopPropagation(), await se.moveLinkTo(T, re.activePage, "常用网站");
        return;
      }
      const ee = window;
      if (typeof ee.importDroppedLauncherItem == "function") {
        w.preventDefault(), w.stopPropagation(), await ee.importDroppedLauncherItem(w, "常用网站", re.activePage);
        return;
      }
      const ye = w.dataTransfer?.getData("text/plain");
      ye && /^https?:\/\//i.test(ye.trim()) && (w.preventDefault(), w.stopPropagation(), await se.addLink({
        title: "",
        url: ye.trim(),
        page: re.activePage
      }));
    }
    function ni() {
      if (!Xe.isOpen) return !1;
      if (typeof document < "u") {
        const w = document.querySelector("#launcher-folder-dialog");
        return !!(w && w.open);
      }
      return !1;
    }
    function Ds(w, k) {
      k.preventDefault();
    }
    function As(w) {
      w.preventDefault(), w.dataTransfer && (w.dataTransfer.dropEffect = "move"), w.currentTarget?.classList.add("drop-target");
    }
    function Es(w) {
      w.currentTarget?.classList.remove("drop-target");
    }
    async function Ps(w, k) {
      k.currentTarget?.classList.remove("drop-target"), k.preventDefault(), k.stopPropagation();
      const A = k.dataTransfer?.getData("application/x-newtab-launcher-folder");
      if (A && A !== w) {
        try {
          await se.moveFolderInto(A, w);
        } catch (Re) {
          we.show({ appName: "常用网站", title: "移动未完成", message: Re instanceof Error ? Re.message : "请刷新后核对。" });
        }
        return;
      }
      let ee = "";
      const ye = k.dataTransfer?.getData("application/x-newtab-launcher");
      if (ye)
        try {
          ee = String(JSON.parse(ye)?.id || "");
        } catch {
        }
      !ee && (v.value || window.__activeLauncherLink) && (ee = String(window.__activeLauncherLink?.id || v.value || "")), ee && await se.moveLinkTo(ee, re.activePage, w);
    }
    return (w, k) => (l(), p(Y, null, [
      s(re).showSites ? (l(), p("section", {
        key: 0,
        class: "launcher-group launcher-sites size-large",
        onWheel: vs
      }, [
        n("header", {
          class: "launcher-group-head launcher-sites-head",
          onPointerdown: k[5] || (k[5] = H(() => {
          }, ["stop"])),
          onContextmenu: ys
        }, [
          n("div", {
            class: "sites-view-switch",
            role: "group",
            "aria-label": s(c)("home.sites.switchAria")
          }, [
            n("button", {
              type: "button",
              disabled: a.value,
              "aria-pressed": i.value === "sites",
              onClick: k[0] || (k[0] = (T) => i.value = "sites")
            }, u(s(c)("home.sites.favoriteSites")), 9, mu),
            n("button", {
              type: "button",
              disabled: a.value,
              "aria-pressed": i.value === "bookmarks",
              onClick: k[1] || (k[1] = (T) => i.value = "bookmarks")
            }, u(s(c)("home.sites.bookmarks")), 9, vu)
          ], 8, fu),
          He(n("div", {
            class: "launcher-page-tabs",
            role: "tablist",
            "aria-label": s(c)("home.sites.pagesAria")
          }, [
            (l(!0), p(Y, null, fe(s(re).pages, (T) => (l(), p("button", {
              key: T,
              type: "button",
              class: le(["launcher-page-tab", { active: T === s(re).activePage }]),
              "data-page": T,
              role: "tab",
              title: s(c)("home.sites.pageTabTitle", { label: Ee(T) }),
              onPointerdown: k[2] || (k[2] = H(() => {
              }, ["stop"])),
              onClick: H((A) => ti(T), ["prevent", "stop"]),
              onContextmenu: H((A) => fs(T, A), ["prevent", "stop"]),
              onDragover: (A) => Ls(T, A),
              onDragleave: k[3] || (k[3] = (A) => $s(A)),
              onDrop: (A) => Ss(T, A)
            }, u(Ee(T)), 43, wu))), 128)),
            h.value ? He((l(), p("input", {
              key: 1,
              ref_key: "pageInputRef",
              ref: M,
              class: "launcher-page-input",
              maxlength: "12",
              placeholder: "例如：游戏区",
              "onUpdate:modelValue": k[4] || (k[4] = (T) => b.value = T),
              onKeydown: gs,
              onBlur: oi
            }, null, 544)), [
              [so, b.value]
            ]) : (l(), p("button", {
              key: 0,
              class: "launcher-page-add",
              type: "button",
              title: "添加网站分区，例如游戏区",
              "aria-label": "添加网站分区",
              onClick: hs
            }, " + "))
          ], 8, yu), [
            [ao, i.value === "sites"]
          ]),
          i.value === "bookmarks" ? (l(), p("div", bu)) : E("", !0),
          n("button", {
            class: "launcher-page-help",
            type: "button",
            title: "使用指南：如何创建文件夹与整理网站",
            "aria-label": "使用指南与技巧",
            onClick: m
          }, " ? ")
        ], 32),
        i.value === "bookmarks" ? (l(), ce(s(t), {
          key: 0,
          "header-target": "#bookmark-board-header",
          onBusy: k[6] || (k[6] = (T) => a.value = T)
        })) : E("", !0),
        He(n("div", {
          class: "launcher-page-panel",
          "data-page": s(re).activePage,
          hidden: !1,
          role: "tabpanel",
          onContextmenu: ms,
          onDragover: k[12] || (k[12] = (T) => Ts(T)),
          onDragleave: k[13] || (k[13] = (T) => Is(T)),
          onDrop: k[14] || (k[14] = (T) => Ms(T))
        }, [
          (l(), ce(qo, {
            tag: "div",
            class: "launcher-items launcher-site-items",
            key: s(re).activePage,
            name: v.value || x.value ? "launcher-grid" : ""
          }, {
            default: io(() => [
              (l(!0), p(Y, null, fe(ei.value, (T) => (l(), p(Y, {
                key: T.key
              }, [
                T.type === "link" ? (l(), p("a", {
                  key: T.key,
                  class: le(["launcher-link", {
                    "is-dragging": v.value === String(T.link.id),
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
                  onDragstart: k[7] || (k[7] = H(() => {
                  }, ["prevent"])),
                  onPointerdown: (A) => Ce(T.link, A),
                  onMousedown: k[8] || (k[8] = (A) => ws(A)),
                  onClick: H((A) => bs(T.link, A), ["prevent"]),
                  onContextmenu: H((A) => ks(T.link, A), ["prevent"])
                }, [
                  Z(Li, {
                    link: T.link
                  }, null, 8, ["link"])
                ], 42, _u)) : T.type === "folder" ? (l(), p("div", {
                  key: T.key,
                  class: le(["launcher-folder", [
                    `size-${ze(T.folder.groupName)}`,
                    { "is-dragging": x.value === T.folder.groupName }
                  ]]),
                  title: `${T.folder.groupName}
可拖动调整位置；右键调整收藏夹大小`,
                  role: "button",
                  tabindex: "0",
                  "data-launcher-folder": String(T.folder.groupName),
                  draggable: "true",
                  onPointerdown: (A) => Ze(T.folder.groupName, T.folder, A),
                  onDragstart: (A) => Ds(T.folder.groupName, A),
                  onDragover: k[10] || (k[10] = (A) => As(A)),
                  onDragleave: k[11] || (k[11] = (A) => Es(A)),
                  onDrop: (A) => Ps(T.folder.groupName, A),
                  onClick: (A) => _s(T.folder.groupName, A),
                  onContextmenu: H((A) => Cs(T.folder.groupName, T.folder.pageName, A), ["prevent"])
                }, [
                  Z(Li, {
                    folder: { title: T.folder.groupName, preview: T.folder.links, count: T.folder.links.length },
                    size: ze(T.folder.groupName)
                  }, {
                    default: io(() => [
                      n("button", {
                        class: "launcher-folder-del-btn",
                        type: "button",
                        title: `删除文件夹「${T.folder.groupName}」`,
                        "aria-label": "删除文件夹",
                        onPointerdown: k[9] || (k[9] = H(() => {
                        }, ["stop"])),
                        onClick: H((A) => xs(T.folder.groupName), ["stop", "prevent"])
                      }, " ✕ ", 40, xu)
                    ]),
                    _: 2
                  }, 1032, ["folder", "size"]),
                  n("span", Lu, u(T.folder.links.length), 1)
                ], 42, Cu)) : E("", !0)
              ], 64))), 128)),
              ei.value.length ? E("", !0) : (l(), p("p", $u, u(ps.value), 1))
            ]),
            _: 1
          }, 8, ["name"]))
        ], 40, ku), [
          [ao, i.value === "sites"]
        ])
      ], 32)) : E("", !0),
      s(re).hasTodo || s(re).hasBili ? (l(), p("div", Su, [
        s(re).hasTodo ? (l(), ce(gu, { key: 0 })) : s(re).hasBili ? (l(), p("div", Tu)) : E("", !0)
      ])) : E("", !0),
      (l(), ce(yt, { to: "body" }, [
        P.visible ? (l(), p("div", {
          key: 0,
          class: le(["launcher-drag-ghost", [
            P.type === "folder" ? `folder-ghost size-${P.folder?.size}` : "link-ghost"
          ]]),
          style: ke({
            left: `${P.x}px`,
            top: `${P.y}px`
          })
        }, [
          P.type === "folder" && P.folder ? (l(), p(Y, { key: 0 }, [
            n("div", Iu, [
              (l(!0), p(Y, null, fe(us(P.folder.links, P.folder.size), (T, A) => (l(), ce(on, {
                key: T.id || A,
                link: T,
                mini: !0
              }, null, 8, ["link"]))), 128))
            ]),
            n("span", Mu, u(P.folder.groupName), 1)
          ], 64)) : P.link ? (l(), p(Y, { key: 1 }, [
            Z(on, {
              link: P.link
            }, null, 8, ["link"]),
            n("span", Du, u(P.link.title), 1)
          ], 64)) : E("", !0)
        ], 6)) : E("", !0)
      ])),
      Z(s(o), {
        open: r.value,
        onClose: g
      }, null, 8, ["open"])
    ], 64));
  }
}), rs = /* @__PURE__ */ De(Au, [["__scopeId", "data-v-63287e7b"]]), Yo = Object.keys(co);
let Ho = !1, In = 0, ko, Mn;
function Si(e) {
  for (const t of Yo)
    Object.prototype.hasOwnProperty.call(e, t) && (co[t] = e[t] !== !1);
}
function Eu() {
  const e = co;
  Me.setPrefs(e.showSites, e.showTodo, !e.showTodo && e.showBili), document.body.classList.toggle("hide-weather", !e.showWeather), document.body.classList.toggle("hide-sites", !e.showSites), document.body.classList.toggle("hide-bili", !e.showBili), document.body.classList.toggle("hide-youtube", !e.showYouTube), document.body.classList.toggle("hide-todo", !e.showTodo), document.body.classList.toggle("hide-bookmarks", !e.showBookmarkPanel), e.showBookmarkPanel || nn.close();
}
const Ti = {
  start() {
    if (Ho) return;
    Ho = !0;
    const e = ++In;
    Mn = Oe(() => Yo.map((o) => co[o]), Eu, { immediate: !0, flush: "sync" });
    const t = globalThis.chrome;
    ko = (o, i) => {
      if (i !== "local") return;
      const a = {};
      for (const r of Yo) o[r] && (a[r] = o[r].newValue);
      Si(a);
    }, t?.storage?.onChanged?.addListener(ko), t?.storage?.local && t.storage.local.get(Yo).then((o) => {
      Ho && In === e && Si(o || {});
    }).catch((o) => console.warn("[HomePrefs] 读取首页设置失败", o));
  },
  stop() {
    Ho = !1, In++, Mn?.(), Mn = void 0, ko && globalThis.chrome?.storage?.onChanged?.removeListener(ko), ko = void 0;
  }
}, Pu = {
  id: "launcher",
  class: "launcher",
  "aria-label": "快捷入口"
}, Wu = { class: "launcher-inner" }, Ru = { class: "launcher-overview" }, Nu = ["title"], Ou = { class: "card-head" }, Bu = { id: "wx-title" }, Fu = { id: "weather-body" }, Hu = { class: "launcher-center" }, ju = {
  class: "hero-clock",
  id: "hero-clock"
}, zu = {
  class: "launcher-widget launcher-task-threads launcher-music-card",
  "data-home-module": "taskThreads"
}, Gu = { class: "card-head" }, Ku = ["title"], Vu = {
  id: "task-thread-home",
  class: "task-thread-home home-music-body"
}, Uu = /* @__PURE__ */ de({
  __name: "AppLauncher",
  setup(e) {
    Ve(() => {
      Xo.initWallpaper();
    });
    function t() {
      Ae.handleToolClick("music");
    }
    return (o, i) => (l(), p("section", Pu, [
      i[4] || (i[4] = n("div", {
        id: "hero-background-media",
        class: "hero-background-media",
        "aria-hidden": "true"
      }, null, -1)),
      n("div", Wu, [
        n("div", Ru, [
          He(n("section", {
            class: "launcher-widget launcher-weather",
            "data-home-module": "weather",
            title: s(c)("weather.widgetSwitchTip")
          }, [
            n("header", Ou, [
              i[1] || (i[1] = n("span", {
                class: "bar",
                style: { background: "linear-gradient(180deg,#38bdf8,#818cf8)" }
              }, null, -1)),
              n("h2", Bu, u(s(c)("weather.widgetTitle")), 1)
            ]),
            n("div", Fu, [
              Z(is)
            ])
          ], 8, Nu), [
            [ao, s(co).showWeather]
          ]),
          n("div", Hu, [
            n("div", ju, [
              Z(id),
              Z(ss)
            ]),
            n("form", {
              id: "search",
              class: "search",
              onSubmit: i[0] || (i[0] = H(() => {
              }, ["prevent"]))
            }, [
              Z(Ai)
            ], 32)
          ]),
          n("section", zu, [
            n("header", Gu, [
              i[2] || (i[2] = n("span", { class: "bar music-purple" }, null, -1)),
              n("h2", null, u(s(c)("home.music.player")), 1),
              i[3] || (i[3] = n("span", { class: "grow" }, null, -1)),
              n("button", {
                id: "home-music-open-panel",
                class: "home-music-head-btn",
                type: "button",
                title: s(c)("home.music.openNeteaseTip"),
                onClick: t
              }, u(s(c)("home.music.openNetease")), 9, Ku)
            ]),
            n("div", Vu, [
              Z(as)
            ])
          ])
        ]),
        n("div", {
          id: "launcher-groups",
          class: le(["launcher-groups", { "has-sites": s(re).showSites, "has-todoist": s(re).hasTodo, "has-bili": s(re).hasBili, "has-media": s(re).hasTodo || s(re).hasBili }])
        }, [
          Z(rs)
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
}), oo = _e(/* @__PURE__ */ new Set()), Et = _e({}), qe = _e({});
function Dn(e) {
  const t = Je(e);
  if (!t?.lifecycle.canUnmount || t.lifecycle.canUnmount()) return { ok: !0 };
  const o = t.lifecycle.unmountBlockedMessage || "模块操作尚未结束，不能退出或重载。";
  return we.show({ appName: t.title, title: "操作进行中", message: o, showActions: !1 }), { ok: !1, error: o };
}
const We = {
  // 检查应用是否处于运行显示状态（驱动 Dock 上的小圆点：关闭即熄灭，不保留 macOS 风格后台悬浮绿点）
  isRunning(e) {
    return this.isVisible(e);
  },
  // 检查应用当前是否在屏幕上可见（窗口是否打开）
  isVisible(e) {
    const t = Je(e);
    return t ? t.lifecycle.isVisible() : gn(e) ? !!fa[e] : ma(e);
  },
  // 标记应用启动
  markRunning(e) {
    oo.add(e), (e in qe || Je(e)) && (qe[e] = !0);
  },
  // 获取组件当前的 render key
  getRenderKey(e) {
    return Et[e] || 0;
  },
  // 打开 / 显示应用窗口
  openApp(e) {
    const t = Je(e);
    if (t) {
      Ae.open(e), t.lifecycle.isVisible() && this.markRunning(e);
      return;
    }
    if (this.markRunning(e), gn(e)) {
      ri.open(e);
      return;
    }
    Ae.open(e);
  },
  // 隐藏/关闭窗口：立即退出可见运行态并熄灭 Dock 指示绿点
  hideApp(e) {
    if (oo.delete(e), Je(e)) {
      Ae.close(e);
      return;
    }
    if (gn(e)) {
      ri.close(e);
      return;
    }
    Ae.close(e);
  },
  // 真正的关闭（Quit / 彻底从内存与 DOM 中卸载销毁，熄灭小圆点）
  async quitApp(e) {
    if (Je(e)) {
      const a = Dn(e);
      if (!a.ok) return a;
      const r = Je(e)?.lifecycle.beforeQuit;
      if (r) {
        const d = Dt(e);
        try {
          await r();
        } catch {
          const b = "后台停止未确认，窗口保留；未自动重试，请检查后台状态。";
          return we.show({ appName: Je(e).title, title: "未退出", message: b, showActions: !1 }), { ok: !1, error: b };
        }
        if (Dt(e) !== d) return { ok: !1, error: "窗口已有后续操作，未卸载。" };
        const h = Dn(e);
        if (!h.ok) return h;
      }
      const m = Ae.close(e), g = Dt(e);
      return oo.delete(e), qe[e] = !1, gt.removeActiveTool(e), await m, await vt(), Dt(e) === g ? { ok: !0 } : { ok: !1, error: "模块已有后续操作，退出状态已变化。" };
    }
    this.hideApp(e), oo.delete(e), gt.removeActiveTool(e), e in qe && (qe[e] = !1);
    const t = ga;
    t.activeId === e && (t.activeId = "");
    const o = t.openOrder.indexOf(e);
    o >= 0 && t.openOrder.splice(o, 1);
    const i = t.activeTools.indexOf(e);
    i >= 0 && t.activeTools.splice(i, 1), Ae.render();
  },
  // 重新加载（Reload / 单应用热重启，重新初始化组件）
  async reloadApp(e) {
    const t = Je(e);
    if (t) {
      if (t.lifecycle.canOpen && !t.lifecycle.canOpen()) return { ok: !1, error: "模块当前不能打开，未重载窗口。" };
      const o = Dn(e);
      if (!o.ok) return o;
      const i = Ae.close(e), a = Dt(e);
      return await i, Dt(e) !== a ? { ok: !1, error: "模块已有后续操作，重载已取消。" } : (qe[e] = !1, await vt(), Dt(e) !== a ? { ok: !1, error: "模块已有后续操作，未重新打开。" } : (Et[e] = (Et[e] || 0) + 1, Ae.open(e), t.lifecycle.isVisible() ? (this.markRunning(e), { ok: !0 }) : { ok: !1, error: "模块当前不能打开，未重新显示窗口。" }));
    }
    this.hideApp(e), e in qe ? (qe[e] = !1, await vt(), Et[e] = (Et[e] || 0) + 1, qe[e] = !0) : Et[e] = (Et[e] || 0) + 1, await vt(), this.openApp(e);
  }
}, Kt = /* @__PURE__ */ de({
  __name: "DockCardModuleHost",
  props: {
    id: {}
  },
  setup(e) {
    const o = Je(e.id);
    if (!o || o.presentation !== "card") throw new Error("Unknown registered workspace card");
    const i = o;
    i.mountPolicy === "workspace-ready" && We.markRunning(i.id), Oe(i.lifecycle.isVisible, (h) => {
      h && We.markRunning(i.id);
    }, { immediate: !0, flush: "sync" });
    const a = oe(() => !!qe[i.id]);
    function r() {
      try {
        i.lifecycle.hide();
      } catch {
      }
      (Lt.activeId === i.id || Lt.activeId === i.rootId) && (Lt.activeId = null), We.hideApp(i.id), typeof document < "u" && document.body.classList.remove("has-card-fullscreen");
    }
    function m() {
      We.reloadApp(i.id);
    }
    function g() {
      typeof window < "u" && window.location.reload();
    }
    const d = V({
      loader: i.loadView,
      onError(h, b, M, v) {
        v <= 2 ? b() : M();
      },
      errorComponent: de({
        setup: () => () => i.lifecycle.isVisible() ? Fe("section", { class: "card wide card-fullscreen", role: "alert" }, [
          Fe("h2", i.title),
          Fe("p", "工作区切片加载受阻（可能因插件重载或切片更新）。可点击「重新加载模块」，或返回首页。"),
          Fe("div", { style: "display: flex; gap: 10px; margin-top: 14px;" }, [
            Fe("button", {
              type: "button",
              style: "padding: 6px 14px; border-radius: 999px; border: 1px solid var(--border); background: var(--primary, #3b82f6); color: #fff; cursor: pointer; font-size: 12px; font-weight: 500;",
              onClick: g
            }, "⟳ 刷新标签页 (加载最新版)"),
            Fe("button", {
              type: "button",
              style: "padding: 6px 14px; border-radius: 999px; border: 1px solid var(--border); background: var(--surface); color: var(--text); cursor: pointer; font-size: 12px;",
              onClick: m
            }, "↻ 重新加载模块"),
            Fe("button", {
              type: "button",
              style: "padding: 6px 14px; border-radius: 999px; border: 1px solid var(--border); background: var(--surface); color: var(--text); cursor: pointer; font-size: 12px;",
              onClick: r
            }, "返回首页")
          ])
        ]) : null
      })
    });
    return lo(() => {
      r(), oo.delete(i.id), delete qe[i.id];
    }), (h, b) => a.value ? (l(), ce(Wi(s(d)), {
      key: s(We).getRenderKey(s(i).id)
    })) : E("", !0);
  }
}), Yu = { class: "logicweaver-workspaces-layer" }, qu = {
  key: 0,
  id: "daily-section",
  class: "wrap"
}, Xu = { id: "vue-todoist-root" }, Ju = { id: "vue-bili-favorites-root" }, Zu = { id: "vue-youtube-root" }, Qu = { id: "vue-pricing-root" }, ep = { id: "vue-aihot-root" }, tp = /* @__PURE__ */ de({
  __name: "AppWorkspaces",
  setup(e) {
    const t = j(!!Lt.activeId);
    return Ve(() => {
      t.value || (typeof window < "u" && "requestIdleCallback" in window ? window.requestIdleCallback(() => {
        t.value = !0;
      }, { timeout: 80 }) : setTimeout(() => {
        t.value = !0;
      }, 40));
    }), (o, i) => (l(), p("div", Yu, [
      t.value ? (l(), p("main", qu, [
        n("div", Xu, [
          Z(Kt, { id: "todoist" })
        ]),
        n("div", Ju, [
          Z(Kt, { id: "daily-bilibili" })
        ]),
        He(n("div", Zu, [
          Z(Kt, { id: "daily-youtube" })
        ], 512), [
          [ao, s(co).showYouTube]
        ]),
        n("div", Qu, [
          Z(Kt, { id: "daily-pricing" })
        ]),
        n("div", ep, [
          Z(Kt, { id: "daily-aihot" })
        ]),
        Z(Kt, { id: "card-github" })
      ])) : E("", !0)
    ]));
  }
}), op = ["aria-label"], np = { class: "dock-menu-head" }, ip = { class: "dock-menu-title" }, sp = ["src", "alt"], ap = {
  key: 1,
  class: "dock-menu-emoji"
}, rp = { class: "dock-menu-text" }, lp = { class: "dock-menu-text" }, cp = { class: "dock-menu-text" }, dp = /* @__PURE__ */ de({
  __name: "DockContextMenu",
  props: {
    target: {}
  },
  emits: ["close", "action"],
  setup(e, { emit: t }) {
    const o = e, i = t, a = oe(() => !o.target || o.target.type !== "tool" ? !1 : We.isRunning(o.target.id)), r = oe(() => !o.target || o.target.type !== "tool" ? !1 : We.isVisible(o.target.id)), { menuRef: m, style: g } = Fi({
      visible: () => !!o.target,
      anchor: () => o.target || { x: 0, y: 0 },
      placement: qt.position === "top" ? "below" : "above",
      align: "center",
      gap: 12,
      dismiss: () => i("close")
    });
    function d() {
      o.target && (We.openApp(o.target.id), i("close"));
    }
    function h() {
      o.target && (We.hideApp(o.target.id), i("close"));
    }
    async function b() {
      o.target && (await We.reloadApp(o.target.id), i("close"));
    }
    async function M() {
      if (!o.target) return;
      const f = o.target;
      if ((await We.quitApp(f.id))?.ok === !1) {
        i("close");
        return;
      }
      we.show({
        appName: f.title,
        title: c("dock.quitDone"),
        subtitle: c("dock.quitSubtitle"),
        icon: f.icon || "assets/logo.png",
        duration: 2800
      }), i("close");
    }
    async function v() {
      if (!o.target) return;
      const f = o.target, C = Io.uninstall(f.id);
      i("close"), await C || we.show({
        appName: f.title,
        title: "入口停用未确认",
        subtitle: Io.state.errorMessage || "请打开模块管理核对当前启用状态",
        icon: f.icon || "assets/logo.png",
        duration: 4e3
      });
    }
    function x() {
      if (!o.target) return;
      const C = {
        "daily-bilibili": "https://www.bilibili.com",
        "card-github": "https://github.com",
        "daily-aihot": "https://news.ycombinator.com",
        "daily-youtube": "https://www.youtube.com",
        "daily-pricing": "https://openai.com/api/pricing"
      }[o.target.id] || "https://www.bilibili.com";
      window.open(C, "_blank"), i("close");
    }
    return (f, C) => (l(), ce(yt, { to: "body" }, [
      e.target ? (l(), p("div", {
        key: 0,
        ref_key: "menuRef",
        ref: m,
        role: "group",
        "aria-label": `${e.target.title}操作`,
        class: "dock-context-menu",
        style: ke(s(g)),
        onClick: C[1] || (C[1] = H(() => {
        }, ["stop"])),
        onContextmenu: C[2] || (C[2] = H(() => {
        }, ["prevent"]))
      }, [
        n("div", np, [
          n("div", ip, [
            e.target.icon ? (l(), p("img", {
              key: 0,
              class: "dock-menu-icon",
              src: e.target.icon,
              alt: e.target.title
            }, null, 8, sp)) : e.target.emoji ? (l(), p("span", ap, u(e.target.emoji), 1)) : E("", !0),
            n("strong", null, u(e.target.title), 1)
          ]),
          e.target.type === "tool" ? (l(), p("span", {
            key: 0,
            class: le(["dock-status-tag", { "is-running": a.value }])
          }, [
            C[3] || (C[3] = n("span", { class: "dock-status-dot" }, null, -1)),
            Ye(" " + u(a.value ? s(c)("dock.menu.running") : s(c)("dock.menu.notStarted")), 1)
          ], 2)) : E("", !0)
        ]),
        C[12] || (C[12] = n("div", { class: "dock-menu-divider" }, null, -1)),
        e.target.type === "tool" ? (l(), p(Y, { key: 0 }, [
          r.value ? (l(), p("button", {
            key: 1,
            type: "button",
            class: "dock-menu-item",
            onClick: h
          }, [
            C[5] || (C[5] = n("span", { class: "dock-menu-symbol" }, "−", -1)),
            n("span", null, u(s(c)("dock.menu.hideWindow")), 1)
          ])) : (l(), p("button", {
            key: 0,
            type: "button",
            class: "dock-menu-item",
            onClick: d
          }, [
            C[4] || (C[4] = n("span", { class: "dock-menu-symbol" }, "↗", -1)),
            n("span", null, u(s(c)("dock.menu.openWindow")), 1)
          ])),
          n("button", {
            type: "button",
            class: "dock-menu-item",
            onClick: b
          }, [
            C[6] || (C[6] = n("span", { class: "dock-menu-symbol" }, "⟲", -1)),
            n("div", rp, [
              n("span", null, u(s(c)("dock.menu.reloadApp")), 1),
              n("small", null, u(s(c)("dock.menu.reloadSub")), 1)
            ])
          ]),
          C[9] || (C[9] = n("div", { class: "dock-menu-divider" }, null, -1)),
          n("button", {
            type: "button",
            class: "dock-menu-item",
            onClick: v
          }, [
            C[7] || (C[7] = n("span", { class: "dock-menu-symbol" }, "📌", -1)),
            n("div", lp, [
              n("span", null, u(s(c)("dock.menu.removeFromDock")), 1),
              n("small", null, u(s(c)("dock.menu.removeSub")), 1)
            ])
          ]),
          n("button", {
            type: "button",
            class: "dock-menu-item item-danger",
            onClick: M
          }, [
            C[8] || (C[8] = n("span", { class: "dock-menu-symbol" }, "✕", -1)),
            n("div", cp, [
              n("span", null, u(s(c)("dock.menu.quitApp")), 1),
              n("small", null, u(s(c)("dock.menu.quitSub")), 1)
            ])
          ])
        ], 64)) : e.target.type === "card" ? (l(), p("button", {
          key: 1,
          type: "button",
          class: "dock-menu-item",
          onClick: x
        }, [
          C[10] || (C[10] = n("span", { class: "dock-menu-symbol" }, "↗", -1)),
          n("span", null, u(s(c)("dock.menu.openOfficial")), 1)
        ])) : (l(), p("button", {
          key: 2,
          type: "button",
          class: "dock-menu-item",
          onClick: C[0] || (C[0] = (I) => i("close"))
        }, [...C[11] || (C[11] = [
          n("span", { class: "dock-menu-symbol" }, "🏠", -1),
          n("span", null, "返回常用主页", -1)
        ])]))
      ], 44, op)) : E("", !0)
    ]));
  }
}), up = /* @__PURE__ */ De(dp, [["__scopeId", "data-v-3973d271"]]), pp = { class: "mac-dock-shelf" }, hp = ["data-dock-target", "title", "onPointerdown", "onClick", "onContextmenu"], gp = ["src", "alt"], fp = {
  key: 0,
  class: "mac-dock-dot",
  "aria-hidden": "true"
}, mp = ["title"], vp = ["alt"], yp = ["data-dock-tool", "title", "onPointerdown", "onClick", "onContextmenu"], wp = ["src", "alt"], bp = {
  key: 1,
  class: "mac-dock-emoji",
  "aria-hidden": "true"
}, kp = {
  key: 2,
  class: "mac-dock-dot",
  "aria-hidden": "true"
}, _p = {
  key: 3,
  class: "mac-dock-badge"
}, Cp = ["title"], xp = ["src"], Lp = {
  key: 1,
  class: "mac-dock-emoji"
}, $p = /* @__PURE__ */ de({
  __name: "MacDock",
  setup(e) {
    const t = oe(() => qt), o = j(null), i = oe(() => Object.fromEntries(qt.tools.map((W) => {
      const G = Je(W.id)?.badgeCount?.() || 0;
      return [W.id, Number.isFinite(G) ? Math.max(0, Math.floor(G)) : 0];
    })));
    function a(W) {
      W.stopPropagation(), o.value = null, M(W.currentTarget), Io.open();
    }
    function r(W, G) {
      G.stopPropagation(), o.value = null, M(G.currentTarget), gt.triggerItem("target", W);
    }
    function m(W, G) {
      const q = G.currentTarget.getBoundingClientRect(), ge = qt.position, Ce = ge === "left" || ge === "right";
      o.value = {
        type: "card",
        id: W.id,
        title: W.title,
        icon: W.icon,
        x: Ce ? ge === "left" ? q.right + 8 : q.left - 8 : q.left + q.width / 2,
        y: Ce ? q.top + q.height / 2 : ge === "top" ? q.bottom + 8 : q.top
      };
    }
    function g(W) {
      W.stopPropagation(), o.value = null, M(W.currentTarget), gt.triggerItem("home", "home-launcher");
    }
    function d(W, G) {
      G.stopPropagation(), o.value = null, M(G.currentTarget), Je(W) || We.markRunning(W), gt.triggerItem("tool", W);
    }
    function h(W, G) {
      const q = G.currentTarget.getBoundingClientRect(), ge = qt.position, Ce = ge === "left" || ge === "right";
      o.value = {
        type: "tool",
        id: W.id,
        title: W.title,
        icon: W.icon,
        emoji: W.emoji,
        x: Ce ? ge === "left" ? q.right + 8 : q.left - 8 : q.left + q.width / 2,
        y: Ce ? q.top + q.height / 2 : ge === "top" ? q.bottom + 8 : q.top
      };
    }
    const b = /* @__PURE__ */ new Map();
    function M(W) {
      if (!W || (b.get(W)?.cancel(), window.matchMedia("(prefers-reduced-motion: reduce)").matches)) return;
      const G = W.animate([
        { translate: "0 0", offset: 0 },
        { translate: "0 -8px", offset: 0.35 },
        { translate: "0 0", offset: 0.65 },
        { translate: "0 -2px", offset: 0.85 },
        { translate: "0 0", offset: 1 }
      ], { duration: 350, easing: "ease" });
      b.set(W, G);
      const N = () => {
        b.get(W) === G && b.delete(W);
      };
      G.onfinish = N, G.oncancel = N;
    }
    const v = j(null), x = _e({
      visible: !1,
      x: 0,
      y: 0,
      width: 40,
      height: 40,
      item: null,
      type: "tool"
    }), f = j(null), C = j(null), I = oe(() => f.value || t.value.cards), y = oe(() => C.value || t.value.tools);
    let _ = "", S = 0, R = !1, B = 0;
    function D(W, G, N) {
      if (N.button !== 0 || N.target.closest(".mac-dock-market-btn")) return;
      const Ce = N.currentTarget.getBoundingClientRect();
      R = !1, v.value = {
        type: W,
        id: G.id,
        item: G,
        startX: N.clientX,
        startY: N.clientY,
        initialLeft: Ce.left,
        initialTop: Ce.top,
        width: Ce.width,
        height: Ce.height
      }, window.addEventListener("pointermove", $), window.addEventListener("pointerup", L), window.addEventListener("pointercancel", L);
    }
    function $(W) {
      if (!v.value) return;
      const G = W.clientX - v.value.startX, N = W.clientY - v.value.startY, q = Math.hypot(G, N);
      if (!R && q > 5 && (R = !0, x.visible = !0, x.item = v.value.item, x.type = v.value.type, x.width = v.value.width, x.height = v.value.height, v.value.type === "card" ? f.value = [...t.value.cards] : C.value = [...t.value.tools]), !R) return;
      x.x = W.clientX - x.width / 2, x.y = W.clientY - x.height / 2;
      const Ce = document.elementsFromPoint(W.clientX, W.clientY).find(
        (xe) => xe.classList.contains("mac-dock-item") && !xe.classList.contains("mac-dock-market-btn")
      );
      if (!Ce) return;
      const Ze = Ce.getAttribute("data-dock-target"), F = Ce.getAttribute("data-dock-tool"), O = v.value.type, z = v.value.id, me = Date.now();
      if (O === "card" && Ze && Ze !== z && Ze !== "home-launcher") {
        const xe = Ce.getBoundingClientRect(), Ie = xe.left + xe.width / 2;
        if (Math.abs(W.clientX - Ie) > xe.width * 0.55 || Ze === _ && me - S < 180) return;
        const ve = [...f.value || t.value.cards], Ee = ve.findIndex((ze) => ze.id === z), Qe = ve.findIndex((ze) => ze.id === Ze);
        if (Ee >= 0 && Qe >= 0 && Ee !== Qe) {
          const ze = ve.splice(Ee, 1)[0];
          ve.splice(Qe, 0, ze), f.value = ve, _ = Ze, S = me;
        }
      } else if (O === "tool" && F && F !== z) {
        const xe = Ce.getBoundingClientRect(), Ie = xe.left + xe.width / 2;
        if (Math.abs(W.clientX - Ie) > xe.width * 0.55 || F === _ && me - S < 180) return;
        const ve = [...C.value || t.value.tools], Ee = ve.findIndex((ze) => ze.id === z), Qe = ve.findIndex((ze) => ze.id === F);
        if (Ee >= 0 && Qe >= 0 && Ee !== Qe) {
          const ze = ve.splice(Ee, 1)[0];
          ve.splice(Qe, 0, ze), C.value = ve, _ = F, S = me;
        }
      }
    }
    function L() {
      window.removeEventListener("pointermove", $), window.removeEventListener("pointerup", L), window.removeEventListener("pointercancel", L), R && v.value && (B = Date.now() + 250, v.value.type === "card" && f.value ? gt.reorderCards(f.value.map((W) => W.id)) : v.value.type === "tool" && C.value && gt.reorderTools(C.value.map((W) => W.id))), x.visible = !1, x.item = null, f.value = null, C.value = null, v.value = null, R = !1, _ = "";
    }
    function P(W, G) {
      Date.now() < B || r(W, G);
    }
    function he(W, G) {
      Date.now() < B || d(W, G);
    }
    return lo(() => {
      for (const W of b.values()) W.cancel();
      b.clear(), window.removeEventListener("pointermove", $), window.removeEventListener("pointerup", L), window.removeEventListener("pointercancel", L);
    }), (W, G) => (l(), p(Y, null, [
      n("div", pp, [
        Z(qo, {
          tag: "div",
          class: "mac-dock-group mac-dock-cards-group",
          name: "dock-item-motion"
        }, {
          default: io(() => [
            (l(!0), p(Y, null, fe(I.value, (N) => (l(), p("button", {
              key: N.id,
              class: le(["mac-dock-item", {
                "is-active": t.value.activeTargetId === N.id,
                "is-drag-origin": v.value && v.value.id === N.id
              }]),
              type: "button",
              "data-dock-target": N.id,
              title: N.title,
              onPointerdown: (q) => D("card", N, q),
              onClick: H((q) => P(N.id, q), ["stop"]),
              onContextmenu: H((q) => m(N, q), ["prevent"])
            }, [
              n("img", {
                class: "mac-dock-icon",
                src: N.icon,
                alt: N.title
              }, null, 8, gp),
              t.value.activeTargetId === N.id ? (l(), p("span", fp)) : E("", !0)
            ], 42, hp))), 128))
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
          title: s(c)("dock.home"),
          onClick: G[0] || (G[0] = H((N) => g(N), ["stop"]))
        }, [
          n("img", {
            class: "mac-dock-icon",
            src: "assets/nav-home.svg",
            alt: s(c)("dock.home")
          }, null, 8, vp)
        ], 8, mp),
        G[5] || (G[5] = n("div", {
          class: "mac-dock-divider mac-dock-divider-dark",
          "aria-hidden": "true"
        }, null, -1)),
        Z(qo, {
          tag: "div",
          class: "mac-dock-group mac-dock-tools-group",
          name: "dock-item-motion"
        }, {
          default: io(() => [
            (l(!0), p(Y, null, fe(y.value, (N) => (l(), p("button", {
              key: N.id,
              class: le(["mac-dock-item", {
                "is-active": s(We).isRunning(N.id),
                "is-drag-origin": v.value && v.value.id === N.id
              }]),
              type: "button",
              "data-dock-tool": N.id,
              title: N.title,
              onPointerdown: (q) => D("tool", N, q),
              onClick: H((q) => he(N.id, q), ["stop"]),
              onContextmenu: H((q) => h(N, q), ["prevent"])
            }, [
              N.icon ? (l(), p("img", {
                key: 0,
                class: "mac-dock-icon",
                src: N.icon,
                alt: N.title
              }, null, 8, wp)) : N.emoji ? (l(), p("span", bp, u(N.emoji), 1)) : E("", !0),
              s(We).isRunning(N.id) ? (l(), p("span", kp)) : E("", !0),
              i.value[N.id] > 0 ? (l(), p("span", _p, u(i.value[N.id] > 99 ? "99+" : i.value[N.id]), 1)) : E("", !0)
            ], 42, yp))), 128))
          ]),
          _: 1
        }),
        n("button", {
          class: le(["mac-dock-item mac-dock-market-btn", { "is-active": s(Io).state.isOpen }]),
          type: "button",
          title: s(c)("dock.market"),
          onClick: G[1] || (G[1] = H((N) => a(N), ["stop"]))
        }, [...G[3] || (G[3] = [
          n("span", {
            class: "mac-dock-market-icon",
            "aria-hidden": "true"
          }, "🧩", -1)
        ])], 10, Cp)
      ]),
      (l(), ce(yt, { to: "body" }, [
        x.visible && x.item ? (l(), p("div", {
          key: 0,
          class: "mac-dock-drag-ghost",
          style: ke({
            width: x.width + "px",
            height: x.height + "px",
            transform: "translate3d(" + x.x + "px," + x.y + "px, 0)"
          }),
          "aria-hidden": "true"
        }, [
          x.item.icon ? (l(), p("img", {
            key: 0,
            class: "mac-dock-icon",
            src: x.item.icon,
            alt: ""
          }, null, 8, xp)) : x.item.emoji ? (l(), p("span", Lp, u(x.item.emoji), 1)) : E("", !0)
        ], 4)) : E("", !0)
      ])),
      Z(up, {
        target: o.value,
        onClose: G[2] || (G[2] = (N) => o.value = null)
      }, null, 8, ["target"])
    ], 64));
  }
}), ls = /* @__PURE__ */ De($p, [["__scopeId", "data-v-b7c583e6"]]), Sp = {
  id: "win-toast-container",
  class: "win-toast-container",
  "aria-live": "polite",
  "aria-relevant": "additions"
}, Tp = ["data-toast-fingerprint", "onMouseenter", "onMouseleave"], Ip = { class: "win-toast-head" }, Mp = ["src"], Dp = { class: "win-toast-app" }, Ap = { class: "win-toast-time" }, Ep = ["title", "aria-label", "onClick"], Pp = ["onClick"], Wp = { class: "win-toast-title" }, Rp = {
  key: 0,
  class: "win-toast-subtitle"
}, Np = {
  key: 1,
  class: "win-toast-snippet"
}, Op = {
  key: 0,
  class: "win-toast-actions"
}, Bp = ["onClick"], Fp = ["onClick"], Hp = /* @__PURE__ */ de({
  __name: "NotificationHost",
  setup(e) {
    const t = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), a = j({}), r = j({});
    let m = null;
    function g(f) {
      const C = t.get(f);
      C !== void 0 && clearTimeout(C), t.delete(f);
    }
    function d(f, C = f.duration) {
      g(f.id), i.set(f.id, C), o.set(f.id, Date.now()), r.value[f.id] = !1, a.value[f.id] = Math.max(0, Math.min(100, C / f.duration * 100)), vt(() => requestAnimationFrame(() => {
        a.value[f.id] = 0;
      })), t.set(f.id, window.setTimeout(() => {
        t.delete(f.id), we.close(f.id);
      }, C));
    }
    function h(f) {
      g(f.id);
      const C = Date.now() - (o.get(f.id) || Date.now()), I = Math.max(0, (i.get(f.id) ?? f.duration) - C);
      i.set(f.id, I), r.value[f.id] = !0, a.value[f.id] = Math.max(0, Math.min(100, I / f.duration * 100));
    }
    function b(f) {
      d(f, Math.max(1500, i.get(f.id) ?? f.duration));
    }
    function M(f) {
      g(f.id), we.close(f.id);
    }
    function v(f) {
      if (St.markRead(f.id), M(f), !f.onClick) {
        f.target && St.openTarget(f.target);
        return;
      }
      try {
        Promise.resolve(f.onClick()).catch((C) => console.warn("Notification action failed", C));
      } catch (C) {
        console.warn("Notification action failed", C);
      }
    }
    function x(f) {
      const C = Math.max(500, i.get(f.id) ?? f.duration);
      return {
        width: `${a.value[f.id] ?? 100}%`,
        transition: r.value[f.id] ? "none" : `width ${C}ms linear`
      };
    }
    return Ve(() => {
      m = new MutationObserver(() => {
        const C = new Set(Do.map((I) => I.id));
        for (const I of Do)
          !I.closing && !t.has(I.id) && !i.has(I.id) && d(I);
        for (const I of i.keys())
          C.has(I) || (g(I), i.delete(I), o.delete(I), delete a.value[I], delete r.value[I]);
      });
      const f = document.getElementById("win-toast-container");
      f && m.observe(f, { childList: !0 });
      for (const C of Do) d(C);
    }), lo(() => {
      m?.disconnect(), m = null;
      for (const f of t.values()) clearTimeout(f);
      t.clear();
    }), (f, C) => (l(), ce(yt, { to: "body" }, [
      n("div", Sp, [
        Z(qo, { name: "win-toast" }, {
          default: io(() => [
            (l(!0), p(Y, null, fe(s(Do), (I) => (l(), p("article", {
              key: I.id,
              class: le(["win-toast-card", [I.appType, { closing: I.closing }]]),
              "data-toast-fingerprint": I.fingerprint,
              onMouseenter: (y) => h(I),
              onMouseleave: (y) => b(I)
            }, [
              n("header", Ip, [
                n("img", {
                  src: I.icon,
                  class: "win-toast-icon",
                  alt: ""
                }, null, 8, Mp),
                n("span", Dp, u(I.appName), 1),
                n("span", Ap, u(s(c)("notifications.justNow")), 1),
                n("button", {
                  type: "button",
                  class: "win-toast-close",
                  title: s(c)("common.close"),
                  "aria-label": s(c)("common.close"),
                  onClick: (y) => M(I)
                }, "✕", 8, Ep)
              ]),
              n("button", {
                type: "button",
                class: "win-toast-body win-toast-body-button",
                onClick: (y) => v(I)
              }, [
                n("span", Wp, u(I.title), 1),
                I.subtitle ? (l(), p("span", Rp, u(I.subtitle), 1)) : E("", !0),
                I.message ? (l(), p("span", Np, u(I.message), 1)) : E("", !0)
              ], 8, Pp),
              I.showActions && I.actionLabel ? (l(), p("footer", Op, [
                n("button", {
                  type: "button",
                  class: "win-toast-btn primary",
                  onClick: (y) => v(I)
                }, u(I.actionLabel), 9, Bp),
                n("button", {
                  type: "button",
                  class: "win-toast-btn",
                  onClick: (y) => M(I)
                }, u(s(c)("common.close")), 9, Fp)
              ])) : E("", !0),
              n("div", {
                class: "win-toast-progress",
                style: ke(x(I))
              }, null, 4)
            ], 42, Tp))), 128))
          ]),
          _: 1
        })
      ])
    ]));
  }
}), cs = /* @__PURE__ */ De(Hp, [["__scopeId", "data-v-71b51a1a"]]), jp = ["id"], zp = /* @__PURE__ */ de({
  __name: "DockModuleHost",
  setup(e) {
    const t = Bi().filter((o) => o.presentation !== "card").map((o) => {
      Oe(o.lifecycle.isVisible, (a) => {
        a && We.markRunning(o.id);
      }, { immediate: !0, flush: "sync" });
      const i = de({
        setup: () => () => Fe("section", { class: "dock-module-load-error", role: "alert" }, [
          Fe("div", { style: "display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;" }, [
            Fe("strong", { style: "font-size: 13px; color: var(--heading);" }, `${o.title} 加载受阻`),
            Fe("span", { style: "font-size: 11px; padding: 2px 6px; border-radius: 4px; background: var(--surface); color: var(--muted); border: 1px solid var(--border);" }, "代码可能已更新")
          ]),
          Fe("p", { style: "font-size: 12px; line-height: 1.5; color: var(--muted); margin: 0 0 12px 0;" }, "模块分块代码未就绪。若刚才在终端编写或重新构建了扩展，点击「刷新标签页」即可立即同步最新切片。"),
          Fe("div", { style: "display: flex; gap: 8px;" }, [
            Fe("button", {
              type: "button",
              style: "padding: 5px 12px; border-radius: 6px; border: 1px solid var(--border); background: var(--primary, #3b82f6); color: #fff; cursor: pointer; font-size: 12px; font-weight: 500;",
              onClick: () => {
                typeof window < "u" && window.location.reload();
              }
            }, "⟳ 刷新标签页"),
            Fe("button", {
              type: "button",
              style: "padding: 5px 10px; border-radius: 6px; border: 1px solid var(--border); background: var(--surface); color: var(--text); cursor: pointer; font-size: 12px;",
              onClick: () => {
                We.reloadApp(o.id);
              }
            }, "↻ 重试"),
            Fe("button", {
              type: "button",
              style: "padding: 5px 10px; border-radius: 6px; border: 1px solid var(--border); background: var(--surface); color: var(--text); cursor: pointer; font-size: 12px;",
              onClick: () => {
                We.hideApp(o.id);
              }
            }, "隐藏")
          ])
        ])
      });
      return {
        definition: o,
        mounted: oe(() => !!qe[o.id]),
        view: V({
          loader: o.loadView,
          onError(a, r, m, g) {
            g <= 2 ? r() : m();
          },
          errorComponent: i
        })
      };
    });
    return lo(() => {
      for (const { definition: o } of t)
        Ae.close(o.id), oo.delete(o.id), qe[o.id] = !1;
    }), (o, i) => (l(!0), p(Y, null, fe(s(t), (a) => He((l(), p("div", {
      id: a.definition.rootId,
      key: a.definition.id
    }, [
      a.mounted.value ? (l(), ce(Wi(a.view), {
        key: s(We).getRenderKey(a.definition.id)
      })) : E("", !0)
    ], 8, jp)), [
      [ao, a.definition.lifecycle.isVisible()]
    ])), 128));
  }
}), Gp = /* @__PURE__ */ De(zp, [["__scopeId", "data-v-3f131313"]]);
function Ke(e, t) {
  const o = j(!1);
  return Oe(
    e,
    (i) => {
      i && (o.value = !0);
    },
    { immediate: !0, flush: "sync" }
  ), Tt(o);
}
const Kp = ["onKeydown"], Vp = { class: "fo-up-preview-head" }, Up = ["src"], Yp = { class: "fo-up-preview-meta" }, qp = { class: "fo-up-preview-name-row" }, Xp = ["href"], Jp = ["disabled"], Zp = { class: "fo-up-preview-sign" }, Qp = { class: "fo-up-preview-videos" }, eh = {
  key: 0,
  class: "fo-up-preview-loading"
}, th = {
  key: 1,
  class: "fo-up-preview-empty"
}, oh = {
  key: 2,
  class: "fo-up-preview-empty"
}, nh = ["href", "title", "onClick"], ih = ["src"], sh = {
  key: 0,
  class: "fo-bili-duration"
}, ah = { class: "fo-up-preview-video-info" }, rh = ["href", "title", "onClick"], lh = { class: "fo-up-preview-video-meta" }, ch = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2394a3b8'%3E%3Cpath d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/%3E%3C/svg%3E", dh = /* @__PURE__ */ de({
  __name: "BiliUpPreview",
  setup(e) {
    const t = j(!1);
    function o() {
      if (!pe.submitting) {
        if (!pe.followed) {
          t.value = !1, Uo.toggleFollow();
          return;
        }
        if (!t.value) {
          t.value = !0;
          return;
        }
        t.value = !1, Uo.toggleFollow();
      }
    }
    function i() {
      t.value = !1, Uo.close();
    }
    function a(r, m) {
      r.ctrlKey || r.metaKey || (r.preventDefault(), r.stopPropagation(), m.bvid ? (Wn.openVideo({
        bvid: m.bvid,
        title: m.title,
        cover: m.cover,
        author: pe.name,
        authorFace: pe.face,
        mid: pe.mid,
        url: m.url
      }), i()) : m.url && m.url !== "#" && window.open(m.url, "_blank"));
    }
    return (r, m) => s(pe).open ? (l(), p("div", {
      key: 0,
      class: "fo-up-preview-backdrop",
      onPointerdown: H(i, ["self"])
    }, [
      n("aside", {
        class: "fo-up-preview-popover",
        style: ke({ left: `${s(pe).left}px`, top: `${s(pe).top}px` }),
        onKeydown: Ft(H(i, ["stop", "prevent"]), ["esc"])
      }, [
        n("div", Vp, [
          n("img", {
            class: "fo-up-preview-avatar",
            src: s(pe).face || ch,
            alt: "",
            referrerpolicy: "no-referrer"
          }, null, 8, Up),
          n("div", Yp, [
            n("div", qp, [
              n("a", {
                class: "fo-up-preview-name",
                href: `https://space.bilibili.com/${s(pe).mid}`,
                target: "_blank",
                rel: "noreferrer"
              }, u(s(pe).name), 9, Xp),
              n("button", {
                type: "button",
                class: le([
                  s(pe).followed ? "fo-up-preview-unfollow" : "fo-up-preview-follow",
                  { "is-armed": t.value }
                ]),
                disabled: s(pe).submitting,
                onClick: o
              }, u(s(pe).submitting ? "处理中…" : t.value ? "确定取消？" : s(pe).followed ? "取消关注" : "＋ 关注"), 11, Jp)
            ]),
            n("p", Zp, u(s(pe).sign || "暂无个人简介"), 1)
          ]),
          n("button", {
            type: "button",
            class: "fo-up-preview-close",
            "aria-label": "关闭预览",
            onClick: i
          }, "✕")
        ]),
        m[1] || (m[1] = n("div", { class: "fo-up-preview-title-tag" }, "近期投稿视频（最新 2~3 个）", -1)),
        n("div", Qp, [
          s(pe).loading ? (l(), p("div", eh, [...m[0] || (m[0] = [
            n("i", null, null, -1),
            n("span", null, "正在读取近期投稿…", -1)
          ])])) : s(pe).error ? (l(), p("p", th, u(s(pe).error), 1)) : s(pe).videos.length ? (l(!0), p(Y, { key: 3 }, fe(s(pe).videos, (g) => (l(), p("article", {
            key: g.bvid,
            class: "fo-up-preview-video"
          }, [
            n("a", {
              class: "fo-up-preview-thumb",
              href: g.url,
              title: `就地播放「${g.title}」（Ctrl+点击在网页打开）`,
              onClick: (d) => a(d, g)
            }, [
              n("img", {
                src: g.cover,
                alt: "",
                loading: "lazy",
                referrerpolicy: "no-referrer"
              }, null, 8, ih),
              g.duration ? (l(), p("span", sh, u(g.duration), 1)) : E("", !0)
            ], 8, nh),
            n("div", ah, [
              n("a", {
                class: "fo-up-preview-video-title",
                href: g.url,
                title: `就地播放「${g.title}」（Ctrl+点击在网页打开）`,
                onClick: (d) => a(d, g)
              }, u(g.title), 9, rh),
              n("div", lh, [
                n("span", null, "▣ " + u(g.playCount), 1),
                n("span", null, u(g.published), 1)
              ])
            ])
          ]))), 128)) : (l(), p("p", oh, "该 UP 主近期暂无视频动态"))
        ])
      ], 44, Kp)
    ], 32)) : E("", !0);
  }
}), uh = /* @__PURE__ */ De(dh, [["__scopeId", "data-v-3fedd7f1"]]), ph = { class: "logicweaver-overlays-layer" }, hh = { id: "vue-notification-root" }, gh = {
  id: "bili-profile-menu",
  class: "bili-profile-menu",
  hidden: ""
}, fh = { id: "vue-bili-message-panel-root" }, mh = { id: "vue-notification-center-root" }, vh = { id: "vue-tab-manager-root" }, yh = { id: "vue-bookmark-menu-root" }, wh = { id: "vue-bookmark-panel-root" }, bh = { id: "vue-launcher-dialogs-root" }, kh = { id: "vue-launcher-folder-root" }, _h = { id: "vue-launcher-menus-root" }, Ch = { id: "vue-settings-dialog-root" }, xh = { id: "vue-clock-settings-root" }, Lh = { id: "vue-bili-theater-root" }, $h = { id: "vue-bili-mini-player-root" }, Sh = { id: "vue-ai-dialog-root" }, Th = { id: "vue-aihot-viewer-root" }, Ih = { id: "vue-nav-wheel-root" }, Mh = { id: "vue-github-detail-root" }, Dh = { id: "vue-bili-subtitle-modal-root" }, Ah = { id: "vue-firecrawl-modal-root" }, Eh = { id: "vue-floating-image-viewer-root" }, Ph = { id: "vue-command-palette-root" }, Wh = /* @__PURE__ */ de({
  __name: "AppOverlays",
  setup(e) {
    const t = Ke(() => Io.state.isOpen), o = Ke(() => Ni.isOpen), i = Ke(() => Vo.isOpen), a = Ke(() => Ot.state.isOpen), r = Ke(() => Ca.open), m = Ke(() => So.state.isOpen), g = Ke(() => Vs.isOpen), d = Ke(() => ka.isOpen), h = Ke(() => Zn.state.isOpen), b = Ke(() => Qs.isOpen), M = Ke(() => Ne.isOpen), v = Ke(() => jn.isOpen);
    let x;
    Ve(() => {
      x = pl();
    }), It(() => {
      x?.();
    });
    const f = Ke(() => Vn.state.isOpen), C = Ke(() => Xe.isOpen), I = Ke(() => ho.editDialog.isOpen || ho.linkMove.isOpen || ho.folderMove.isOpen || ho.groupMerge.isOpen || ho.folderDelete.isOpen), y = V(() => import("./ProfileMenu-CWG17TTe.js")), _ = V(() => import("./BookmarkNoteMenu-DFkNLkIk.js")), S = V(() => import("./BookmarkPanel-Cp0197YE.js")), R = V(() => import("./ClockSettingsMenu-uSWMgiZW.js")), B = V(() => import("./NotificationCenter-zNzo7wFm.js")), D = V(() => import("./TabManagerPanel-2feLXUH1.js")), $ = V(() => import("./LauncherDialogs-DyNO1sFE.js")), L = V(() => import("./LauncherFolderDialog-DYh5md2G.js")), P = V(() => import("./LauncherMenus-yZfPsTPT.js")), he = V(() => import("./SettingsDialog-BtMNMHUy.js")), W = V(() => import("./BiliMiniPlayer-Dgng2BeX.js")), G = V(() => import("./BiliTheaterDialog-dMgc6B8D.js")), N = V(() => import("./BiliMessagePanel-B3iN4avl.js")), q = V(() => import("./AiDialog-BVNzAQI0.js")), ge = V(() => import("./AihotViewer-BiYmrtjG.js")), Ce = V(() => import("./NavWheelOverlay-DWaBkvet.js")), Ze = V(() => import("./GitHubRepoDetailDrawer-CCQVj-rB.js")), F = V(() => import("./InPageSideDrawer-fxVX4Z_w.js")), O = V(() => import("./BiliSubtitleModal-DgMgeWFf.js")), z = V(() => import("./FirecrawlModal-CFNwECex.js")), me = V(() => import("./FloatingImageViewer-DQuX_9Cm.js")), xe = V(() => import("./CommandPalette-Bq_PZFIB.js")), Ie = V(() => import("./AppPromptModal-C3oN6boj.js")), ve = V(async () => {
      const [Ee, Qe] = await Promise.all([
        import("./PluginMarketDialog-wngay72k.js"),
        import("./plugin-market-B6zN10fA.js")
      ]);
      return Ks("logicweaver-market-styles", Qe.default), Ee.default;
    });
    return (Ee, Qe) => (l(), p("div", ph, [
      n("div", hh, [
        Z(cs)
      ]),
      n("div", gh, [
        Z(s(y))
      ]),
      n("div", fh, [
        s(d) ? (l(), ce(s(N), { key: 0 })) : E("", !0)
      ]),
      n("div", mh, [
        s(o) ? (l(), ce(s(B), { key: 0 })) : E("", !0)
      ]),
      n("div", vh, [
        s(i) ? (l(), ce(s(D), { key: 0 })) : E("", !0)
      ]),
      n("div", yh, [
        s(f) ? (l(), ce(s(_), { key: 0 })) : E("", !0)
      ]),
      n("div", wh, [
        Z(s(S))
      ]),
      n("div", bh, [
        s(I) ? (l(), ce(s($), { key: 0 })) : E("", !0)
      ]),
      n("div", kh, [
        s(C) ? (l(), ce(s(L), { key: 0 })) : E("", !0)
      ]),
      n("div", _h, [
        Z(s(P))
      ]),
      n("div", Ch, [
        Z(s(he))
      ]),
      n("div", xh, [
        s(a) ? (l(), ce(s(R), { key: 0 })) : E("", !0)
      ]),
      n("div", Lh, [
        s(m) ? (l(), ce(s(G), { key: 0 })) : E("", !0)
      ]),
      n("div", $h, [
        s(g) ? (l(), ce(s(W), { key: 0 })) : E("", !0)
      ]),
      n("div", Sh, [
        s(h) ? (l(), ce(s(q), { key: 0 })) : E("", !0)
      ]),
      n("div", Th, [
        s(r) ? (l(), ce(s(ge), { key: 0 })) : E("", !0)
      ]),
      n("div", Ih, [
        Z(s(Ce))
      ]),
      Z(Gp),
      n("div", Mh, [
        s(b) ? (l(), ce(s(Ze), { key: 0 })) : E("", !0)
      ]),
      n("div", Dh, [
        Z(s(O))
      ]),
      n("div", Ah, [
        Z(s(z))
      ]),
      n("div", Eh, [
        Z(s(me))
      ]),
      n("div", Ph, [
        s(M) ? (l(), ce(s(xe), { key: 0 })) : E("", !0)
      ]),
      s(v) ? (l(), ce(s(F), { key: 0 })) : E("", !0),
      Z(uh),
      Z(s(Ie)),
      s(t) ? (l(), ce(s(ve), { key: 1 })) : E("", !0)
    ]));
  }
});
let An = !1;
function Rh(e = 1800) {
  if (An || typeof window > "u") return;
  const t = () => {
    if (An) return;
    An = !0;
    const o = Bi();
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
const Nh = ["data-active-workspace"], Oh = /* @__PURE__ */ de({
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
    function r(d, h = "image/svg+xml") {
      if (typeof document > "u") return;
      const b = typeof chrome < "u" && chrome.runtime?.getURL ? chrome.runtime.getURL(d) : d;
      if (a === b) return;
      a = b;
      const M = document.querySelectorAll("link[rel*='icon']");
      if (M.length > 0)
        M.forEach((v) => {
          v.type = h, v.href = b;
        });
      else {
        const v = document.createElement("link");
        v.rel = "icon", v.type = h, v.href = b, document.head.appendChild(v);
      }
    }
    function m() {
      if (typeof document > "u") return;
      const d = i[Ao.value] || i.home;
      if (r(d.icon, d.iconType), X.playing && X.title) {
        const h = X.artist ? ` - ${X.artist}` : "";
        document.title = `▶ ${X.title}${h}`;
        return;
      }
      if (go.playing && go.title) {
        document.title = `▶ ${go.title} · 电台`;
        return;
      }
      document.title = d.title;
    }
    Oe(
      [
        () => Ao.value,
        () => X.playing,
        () => X.title,
        () => X.artist,
        () => go.playing,
        () => go.title
      ],
      () => {
        m();
      },
      { immediate: !0 }
    );
    const g = oe(() => Ao.value === "home" ? "" : Ao.value);
    return Oe(() => Lt.activeId, (d) => {
      document.body.classList.toggle("has-card-fullscreen", !!d);
    }, { immediate: !0, flush: "sync" }), Ve(() => {
      typeof document < "u" && (document.body.dataset.spa = "1");
      try {
        Fn.bindGlobalListener(), je.start(), Ti.start(), Hn.init().catch((d) => console.warn("[Launcher] 初始化失败", d)), Rh(), typeof chrome < "u" && chrome?.runtime?.sendMessage && setTimeout(() => {
          try {
            chrome.runtime.sendMessage({ type: "cleanupNativeTabs" }, () => {
              chrome.runtime?.lastError;
            });
          } catch {
          }
        }, 400);
      } catch (d) {
        console.warn("[App] Runtime start error:", d);
      }
    }), It(() => {
      je.stop(), Hn.stop(), Ti.stop(), document.body.classList.remove("has-card-fullscreen"), typeof document < "u" && o && (document.title = o);
    }), t({
      activeWorkspaceId: g,
      windowManagerController: Ae
    }), (d, h) => (l(), p("div", {
      id: "logicweaver-spa-root",
      class: "logicweaver-spa-root",
      "data-active-workspace": g.value || ""
    }, [
      Z(dr),
      Z(Cl),
      Z(Uu),
      Z(tp),
      n("nav", {
        id: "mac-dock",
        class: le(["mac-dock", "dock-" + s(qt).position]),
        "aria-label": "快捷应用栏"
      }, [
        Z(ls)
      ], 2),
      Z(Wh)
    ], 8, Nh));
  }
}), Bh = /* @__PURE__ */ De(Oh, [["__scopeId", "data-v-5d2f948f"]]), Fh = {
  class: "endfield-stage",
  "aria-hidden": "true"
}, Hh = {
  class: "rhinelab-stage",
  "aria-hidden": "true"
}, jh = { class: "rhine-scaler" }, zh = { class: "rhine-center-group" }, Gh = { class: "rhine-auth-status" }, Kh = { class: "rhine-auth-text" }, Vh = ["hidden"], Uh = { class: "rhine-cinema-caption" }, Yh = /* @__PURE__ */ de({
  __name: "IntroAnimation",
  setup(e) {
    const t = j(window.innerHeight), o = j(window.innerWidth), i = j(!1), a = j(!1), r = j(10), m = j(1), g = j(0), d = /* @__PURE__ */ new Set();
    let h = 0, b = () => {
    };
    const M = oe(() => `${String(Math.round(ot.renderedProgress)).padStart(2, "0")}%`), v = oe(() => {
      const $ = ot.renderedProgress / 100 * t.value + 10;
      return `${Math.min($, Math.max(0, t.value - 102)).toFixed(1)}px`;
    }), x = oe(() => ot.renderedProgress >= 75 ? "START PROCESSING..." : ot.renderedProgress >= 35 ? "REQUEST RECEIVED" : "ID CONFIRMED : JOYCE MOORE"), f = oe(() => ot.finished ? "身份验证通过 · 欢迎进入终端" : ot.status ? `身份信息确认 · ${ot.status.replace(/^.*?\/\s*/, "")}` : "身份信息确认：JOYCE MOORE"), C = oe(() => String(Math.max(0.35, Math.min(o.value / 1920, t.value / 1080))));
    function I($, L) {
      const P = window.setTimeout(() => {
        d.delete(P), $();
      }, L);
      d.add(P);
    }
    function y() {
      window.dispatchEvent(new CustomEvent("logicweaver:intro-complete"));
    }
    function _($) {
      if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
        y();
        return;
      }
      const L = $ ? 180 : 260, P = $ ? 200 : 280, he = performance.now(), W = (G) => {
        const N = G - he, q = Math.min(1, N / L), ge = 1 - Math.pow(1 - q, 3);
        if (r.value = 10 + ge * Math.max(0, o.value - 10), N > L && (m.value = Math.max(0, 1 - (N - L) / P)), N >= L + P) {
          y();
          return;
        }
        h = requestAnimationFrame(W);
      };
      I(() => {
        h = requestAnimationFrame(W);
      }, $ ? 60 : 120);
    }
    function S($) {
      $ || (i.value = !0), I(() => {
        a.value = !0, g.value = 6, m.value = 0, I(y, 380);
      }, $ ? 40 : 420);
    }
    function R($) {
      ot.style === "rhinelab" ? S($) : _($);
    }
    function B() {
      o.value = window.innerWidth, t.value = window.innerHeight;
    }
    function D($) {
      ot.finished || ($.key === "Enter" || $.key === " " || $.key === "Escape") && ($.preventDefault(), ut.skip("KEYBOARD SKIP"));
    }
    return Ve(() => {
      document.documentElement.dataset.startupStyle = ot.style, document.documentElement.style.setProperty("--rhine-scale", C.value), window.addEventListener("resize", B, { passive: !0 }), window.addEventListener("keydown", D, !0), b = Ra(R), Vi();
    }), lo(() => {
      b(), window.removeEventListener("resize", B), window.removeEventListener("keydown", D, !0), cancelAnimationFrame(h);
      for (const $ of d) clearTimeout($);
      d.clear();
    }), ($, L) => (l(), p("div", {
      class: "intro-vue-content",
      style: ke({ "--rhine-scale": C.value, opacity: m.value, filter: `blur(${g.value}px)` })
    }, [
      n("div", Fh, [
        L[2] || (L[2] = n("div", { class: "endfield-loader-texture" }, null, -1)),
        L[3] || (L[3] = n("div", { class: "endfield-loader-rail" }, null, -1)),
        n("div", {
          class: "endfield-loader-fill",
          style: ke({ height: `${s(ot).renderedProgress}%` })
        }, null, 4),
        n("div", {
          class: "endfield-loader-meter",
          style: ke({ top: v.value })
        }, [
          L[1] || (L[1] = n("span", { class: "endfield-loader-tick" }, null, -1)),
          n("b", null, u(M.value), 1),
          n("small", null, u(s(ot).status), 1)
        ], 4),
        L[4] || (L[4] = _o('<section class="endfield-loader-brand"><span class="endfield-loader-kicker">DEEPSEEK HARNESS</span><strong>END</strong><strong>FIELD</strong><span class="endfield-loader-detail"><i class="endfield-loader-chevron"></i><span>EDGE INTELLIGENCE THEME</span><small>TERRA RESEARCH COMMISSION / BOOT SEQUENCE</small><span class="endfield-loader-squares"><i class="on"></i><i class="on"></i><i class="on"></i><i></i><i></i><i></i><i class="on"></i><i class="on"></i><i></i><i></i><i></i><i></i></span></span><em>OVER THE FRONTIER / INTO THE FRONT</em></section>', 1)),
        n("div", {
          class: "endfield-loader-wipe",
          style: ke({ width: `${r.value}px`, opacity: r.value > 10 ? 1 : 0 })
        }, null, 4)
      ]),
      n("div", Hh, [
        L[12] || (L[12] = _o('<div class="rhine-background"><svg viewBox="0 0 1920 1080" preserveAspectRatio="none"><g fill="none" stroke="#ffffff" stroke-width="2.5"><path class="rhine-drift-path1" d="M-210 705C-45 705 182 704 247 567C337 377 99 306 4 435S27 680 169 631C309 584 227 314 279 111S568-113 568-113"></path><path class="rhine-drift-path2" d="M1560-80C1374 114 1671 168 1601 323S1371 367 1431 480S1692 666 1559 787S1329 886 1498 1130"></path><circle class="rhine-drift-circle" cx="1450" cy="648" r="346"></circle><circle class="rhine-drift-circle2" cx="1450" cy="648" r="348"></circle></g></svg></div>', 1)),
        n("div", jh, [
          L[10] || (L[10] = _o('<header class="rhine-brand"><h1>RHINE LAB</h1><div class="rhine-brand-sub">SYNTHESIZE INFORMATION</div><p class="rhine-brand-os"><span class="rhine-brand-analysis"><span style="left:2px;">A</span><span style="left:28px;">N</span><span style="left:55px;">A</span><span style="left:81px;">L</span><span style="left:103px;">Y</span><span style="left:129px;">S</span><span style="left:154px;">I</span><span style="left:166px;">S</span></span><b>OS</b></p></header>', 1)),
          n("button", {
            class: "rhine-skip",
            type: "button",
            title: "点击进入系统 (或按 Enter)",
            onClick: L[0] || (L[0] = (P) => s(ut).skip("ENTER SYSTEM"))
          }, [...L[5] || (L[5] = [
            Ye("ENTER SYSTEM ", -1),
            n("span", null, "↗", -1)
          ])]),
          n("div", zh, [
            L[8] || (L[8] = n("div", { class: "rhine-logo-box" }, [
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
            n("div", Gh, [
              L[6] || (L[6] = n("span", { class: "rhine-auth-dot" }, "·", -1)),
              n("span", Kh, u(x.value), 1),
              L[7] || (L[7] = n("i", {
                class: "rhine-cursor",
                "aria-hidden": "true"
              }, null, -1))
            ])
          ]),
          n("div", {
            class: le(["rhine-scan", { active: i.value }]),
            hidden: !i.value
          }, [...L[9] || (L[9] = [
            _o('<svg viewBox="0 0 1920 1080" aria-hidden="true"><g fill="none" stroke="#080a08" stroke-linecap="round"><circle class="rhine-scan-circle ring-outer" cx="960" cy="540" r="280" stroke-width="2.5"></circle><circle class="rhine-scan-circle ring-white" cx="960" cy="540" r="260" stroke="#fff" stroke-width="3.5"></circle><circle class="rhine-scan-circle ring-inner" cx="960" cy="540" r="220" stroke-width="2"></circle><circle class="rhine-orbit-dot dot-1" cx="960" cy="260" r="8" fill="#ed821b" stroke="none"></circle><circle class="rhine-orbit-dot dot-2" cx="960" cy="820" r="8" fill="#ed821b" stroke="none"></circle><circle class="rhine-scan-core" cx="960" cy="540" r="6" fill="#080a08" stroke="none"></circle></g></svg><span class="rhine-scan-label">PERMISSION AUTHORIZED</span>', 2)
          ])], 10, Vh),
          n("div", Uh, u(f.value), 1),
          L[11] || (L[11] = n("div", { class: "rhine-powered" }, [
            Ye("POWERED BY "),
            n("b", null, "RHINE LAB"),
            n("i")
          ], -1))
        ]),
        n("div", {
          class: le(["rhine-white", { flash: a.value }]),
          "aria-hidden": "true"
        }, null, 2)
      ])
    ], 4));
  }
}), qh = /* @__PURE__ */ de({
  __name: "ProfileMenu",
  setup(e) {
    function t(o) {
      Mo.trigger(o);
    }
    return (o, i) => (l(), p(Y, null, [
      n("button", {
        type: "button",
        "data-action": "messages",
        onClick: i[0] || (i[0] = H((a) => t("messages"), ["stop"]))
      }, u(s(c)("profile.menu.notifications")), 1),
      n("button", {
        type: "button",
        "data-action": "tabs",
        onClick: i[1] || (i[1] = H((a) => t("tabs"), ["stop"]))
      }, u(s(c)("profile.menu.tabs")), 1),
      n("button", {
        type: "button",
        "data-action": "refresh",
        onClick: i[2] || (i[2] = H((a) => t("refresh"), ["stop"]))
      }, u(s(c)("profile.menu.refreshBili")), 1),
      n("button", {
        type: "button",
        "data-action": "switch",
        onClick: i[3] || (i[3] = H((a) => t("switch"), ["stop"]))
      }, u(s(c)("profile.menu.switchUser")), 1),
      n("button", {
        type: "button",
        "data-action": "web",
        onClick: i[4] || (i[4] = H((a) => t("web"), ["stop"]))
      }, u(s(c)("profile.menu.biliCenter")), 1)
    ], 64));
  }
}), Xh = /* @__PURE__ */ de({
  __name: "WorkspaceLaunchers",
  setup(e) {
    function t(o) {
      Jn.openWorkspace(o, !0);
    }
    return (o, i) => (l(), p(Y, null, [
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
      Pi(o.$slots, "default")
    ], 64));
  }
}), Jh = {
  key: 0,
  "aria-label": "AI 分析任务"
}, Zh = { role: "status" }, Qh = ["disabled"], eg = ["disabled"], tg = /* @__PURE__ */ de({
  __name: "GitHubStatus",
  setup(e) {
    return (t, o) => s(tt).message || s(tt).busy ? (l(), p("section", Jh, [
      n("p", Zh, u(s(tt).repo ? `原任务仓库：${s(tt).repo}。 ` : "") + u(s(tt).message), 1),
      s(tt).busy ? (l(), p("button", {
        key: 0,
        type: "button",
        onClick: o[0] || (o[0] = (i) => s(st).stopAiAnalysis())
      }, "停止后续分析 / 中断等待")) : E("", !0),
      s(tt).uncertain ? (l(), p(Y, { key: 1 }, [
        o[5] || (o[5] = n("p", null, "AI 结果未确认，已阻止本页再次提交。请到供应商核对请求和计费；本页记录在整页关闭或重载后会丢失。", -1)),
        s(tt).unlockConfirmation ? (l(), p(Y, { key: 1 }, [
          o[4] || (o[4] = n("p", null, "扩展不能验证供应商任务；确认只解除本页限制，不代表成功，也不会重发请求。", -1)),
          n("button", {
            type: "button",
            disabled: s(tt).busy,
            onClick: o[2] || (o[2] = (i) => s(st).acknowledgeAiChecked())
          }, "确认解除本页限制", 8, eg),
          n("button", {
            type: "button",
            onClick: o[3] || (o[3] = (i) => s(tt).unlockConfirmation = !1)
          }, "保持限制")
        ], 64)) : (l(), p("button", {
          key: 0,
          type: "button",
          disabled: s(tt).busy,
          onClick: o[1] || (o[1] = (i) => s(tt).unlockConfirmation = !0)
        }, "我已核对供应商记录", 8, Qh))
      ], 64)) : E("", !0)
    ])) : E("", !0);
  }
}), og = {
  key: 0,
  role: "status",
  style: { "font-size": "12px", color: "var(--danger,#ef4444)", padding: "4px 8px", margin: "0 0 6px 0", "border-radius": "6px", background: "var(--surface)" }
}, ng = {
  key: 0,
  class: "gh-sidebar-divider"
}, ig = {
  key: 1,
  class: "gh-sidebar-caption"
}, sg = ["data-folder", "onClick", "onDragover", "onDragleave", "onDrop"], ag = {
  class: "gh-folder-icon-wrap",
  style: { "font-size": "13px", display: "grid", "place-items": "center" }
}, rg = { key: 0 }, lg = { key: 1 }, cg = {
  key: 2,
  class: "fo-folder-icon",
  style: { color: "currentColor" }
}, dg = ["title"], ug = { class: "gh-folder-count" }, pg = ["data-del", "onClick", "onKeydown"], hg = /* @__PURE__ */ de({
  __name: "GitHubFolders",
  props: {
    active: { type: Boolean, default: !0 }
  },
  setup(e) {
    const t = e, o = j(""), i = () => {
      o.value = "";
    };
    function a(h) {
      return t.active && !Ct.busy && Co.folders.some((b) => b.title === h && (b.kind === "custom" || b.kind === "uncategorized"));
    }
    Oe(() => t.active, (h) => {
      i(), window.removeEventListener("dragend", i), window.removeEventListener("drop", i), h && (window.addEventListener("dragend", i), window.addEventListener("drop", i));
    }, { immediate: !0 }), lo(() => {
      window.removeEventListener("dragend", i), window.removeEventListener("drop", i);
    });
    function r(h, b) {
      h.stopPropagation(), Wt.delete(b);
    }
    function m(h, b) {
      if (!a(b) || !Array.from(h.dataTransfer?.types || []).includes(ea)) {
        i();
        return;
      }
      h.preventDefault(), h.dataTransfer && (h.dataTransfer.dropEffect = "move"), o.value = b;
    }
    function g(h, b) {
      const M = h.currentTarget;
      M instanceof Node && h.relatedTarget instanceof Node && M.contains(h.relatedTarget) || o.value === b && (o.value = "");
    }
    function d(h, b) {
      if (i(), !a(b)) return;
      const M = ta(h.dataTransfer);
      M && (h.preventDefault(), h.stopPropagation(), Wt.dropRepository(M, b));
    }
    return (h, b) => (l(), p(Y, null, [
      s(Ct).message ? (l(), p("p", og, u(s(Ct).message), 1)) : E("", !0),
      (l(!0), p(Y, null, fe(s(Co).folders, (M, v) => (l(), p(Y, {
        key: M.title
      }, [
        M.kind === "custom" && s(Co).folders[v - 1]?.kind !== "custom" ? (l(), p("div", ng)) : E("", !0),
        M.kind === "custom" && s(Co).folders[v - 1]?.kind !== "custom" ? (l(), p("div", ig, "GitHub 列表 (Lists)")) : E("", !0),
        n("button", {
          type: "button",
          class: le(["gh-bili-folder", { on: M.active, "drag-into": o.value === M.title }]),
          "data-folder": M.title,
          onClick: (x) => s(Wt).select(M.title),
          onDragover: (x) => m(x, M.title),
          onDragleave: (x) => g(x, M.title),
          onDrop: (x) => d(x, M.title)
        }, [
          n("span", ag, [
            M.kind === "all" ? (l(), p("span", rg, "⭐")) : M.kind === "uncategorized" ? (l(), p("span", lg, "📄")) : (l(), p("i", cg))
          ]),
          n("span", {
            class: "gh-folder-name",
            title: M.title
          }, u(M.title), 9, dg),
          n("small", ug, u(M.count), 1),
          M.kind === "custom" ? (l(), p("span", {
            key: 0,
            class: "gh-folder-delete",
            title: "删除 GitHub 列表",
            "data-del": M.title,
            role: "button",
            tabindex: "0",
            onClick: (x) => r(x, M.title),
            onKeydown: [
              Ft(H((x) => s(Wt).delete(M.title), ["prevent", "stop"]), ["enter"]),
              Ft(H((x) => s(Wt).delete(M.title), ["prevent", "stop"]), ["space"])
            ]
          }, "✕", 40, pg)) : E("", !0)
        ], 42, sg)
      ], 64))), 128))
    ], 64));
  }
}), gg = {
  id: "gh-hero-cover",
  class: "gh-bili-cover"
}, fg = { key: 0 }, mg = { key: 1 }, vg = {
  key: 2,
  class: "fo-folder-icon"
}, yg = { class: "gh-bili-heading" }, wg = { class: "gh-hero-title-row" }, bg = ["title"], kg = ["role", "aria-live"], _g = ["title"], Cg = ["title", "aria-label"], xg = { id: "gh-hero-desc" }, Lg = { class: "gh-bili-actions" }, $g = ["title"], Sg = { class: "gh-batch-btn-text" }, Tg = ["title"], Ig = ["title"], Mg = /* @__PURE__ */ de({
  __name: "GitHubHero",
  emits: ["open-ai-settings"],
  setup(e, { emit: t }) {
    return (o, i) => (l(), p(Y, null, [
      n("div", gg, [
        s(Mt).kind === "all" ? (l(), p("span", fg, "⭐")) : s(Mt).kind === "uncategorized" ? (l(), p("span", mg, "📄")) : (l(), p("i", vg))
      ]),
      n("div", yg, [
        n("div", wg, [
          n("h3", {
            id: "gh-hero-title",
            title: s(Mt).title
          }, u(s(Mt).title), 9, bg),
          s(Pt).actionText ? (l(), p("div", {
            key: 0,
            class: le(["gh-hero-inline-status", { "is-error": s(Pt).actionError }]),
            role: s(Pt).actionError ? "alert" : "status",
            "aria-live": s(Pt).actionError ? "assertive" : "polite",
            "aria-atomic": "true"
          }, [
            n("span", {
              class: "gh-hero-status-text",
              title: s(Pt).actionText
            }, u(s(Pt).actionText), 9, _g),
            n("button", {
              type: "button",
              title: s(c)("github.hero.closeTip"),
              "aria-label": s(c)("github.hero.closeTip"),
              onClick: i[0] || (i[0] = (a) => s(Un).update({ actionText: "", actionError: !1 }))
            }, "×", 8, Cg)
          ], 10, kg)) : E("", !0)
        ]),
        n("p", xg, u(s(Mt).description), 1)
      ]),
      n("div", Lg, [
        n("button", {
          id: "gh-batch-toggle-btn",
          type: "button",
          class: le(["gh-hero-btn gh-batch-toggle-btn", { active: s(Mt).batchMode }]),
          title: s(c)("github.hero.batchToggle"),
          onClick: i[1] || (i[1] = (a) => s(Lo).toggleBatch())
        }, [
          i[4] || (i[4] = n("span", { class: "gh-batch-btn-icon" }, "☑", -1)),
          n("span", Sg, u(s(Mt).batchMode ? s(c)("github.hero.batchBack") : s(c)("github.hero.batch")), 1)
        ], 10, $g),
        n("button", {
          id: "gh-refresh-btn",
          type: "button",
          class: "gh-hero-btn",
          title: s(c)("github.hero.refreshTitle"),
          onClick: i[2] || (i[2] = (a) => s(Lo).refresh())
        }, u(s(c)("github.hero.refresh")), 9, Tg),
        n("button", {
          id: "gh-hero-add-folder-btn",
          type: "button",
          class: "gh-hero-btn primary",
          title: s(c)("github.hero.addFolderTitle"),
          onClick: i[3] || (i[3] = (a) => s(Lo).createFolder())
        }, u(s(c)("github.hero.addFolder")), 9, Ig)
      ])
    ], 64));
  }
}), Dg = /* @__PURE__ */ De(Mg, [["__scopeId", "data-v-1c3e37db"]]), te = _e({ repo: "", text: "", baseline: "", busy: !1, message: "", storedValue: null });
function Ii(e, t = !1) {
  if (!e || te.busy) return;
  if (te.repo && te.text !== te.baseline) {
    te.message = "请先保存或明确取消当前草稿，再编辑或清除其它备注。";
    return;
  }
  const o = st.remarks[e]?.userRemark, i = typeof o == "string" ? o : "";
  Object.assign(te, {
    repo: e,
    baseline: i,
    text: t ? "" : i,
    storedValue: null,
    message: t ? "清除已准备；点击保存才会清除手写备注，AI 简介不变。" : "仅点击保存或 Enter 才写入；草稿只保留在本页内存。"
  });
}
function En() {
  te.busy || Object.assign(te, { repo: "", text: "", baseline: "", storedValue: null, message: "" });
}
async function Pn() {
  if (te.busy || !te.repo) return;
  const { repo: e, text: t, baseline: o } = te;
  te.busy = !0;
  try {
    await st.updateRepoRemark(e, { userRemark: t.trim() }, o), Object.assign(te, { repo: "", text: "", baseline: "", storedValue: null, message: `${e} 的备注已保存并回读核对。` });
  } catch (i) {
    te.message = i instanceof Error ? i.message : "保存未确认，草稿保留，请先读取已保存值核对。";
  } finally {
    te.busy = !1;
  }
}
async function Mi() {
  if (te.busy || !te.repo) return;
  const e = te.repo;
  te.busy = !0;
  try {
    const o = (await st.reloadRepoRemarks())[e]?.userRemark;
    if (o !== void 0 && typeof o != "string") throw new Error("保存值格式异常，未变更草稿或覆盖基准。");
    te.storedValue = o ?? "", te.baseline = o ?? "", te.message = "已读取保存值，草稿没有替换。请对比下方保存值；再次点击保存将以草稿替换它。";
  } catch (t) {
    te.message = t instanceof Error ? t.message : "读取失败，草稿保留。";
  } finally {
    te.busy = !1;
  }
}
const Ag = ["disabled"], Eg = ["disabled"], Pg = ["disabled"], Wg = ["disabled"], Rg = {
  key: 0,
  style: { width: "100%", "white-space": "pre-wrap", "overflow-wrap": "anywhere" }
}, Di = /* @__PURE__ */ de({
  __name: "GitHubRemarkEditor",
  props: {
    active: { type: Boolean }
  },
  setup(e) {
    const t = e, o = j(null);
    return Ve(() => {
      vt(() => {
        t.active && !te.busy && o.value?.focus();
      });
    }), (i, a) => (l(), p("div", {
      class: "gh-inline-remark-box",
      style: { "flex-wrap": "wrap", "max-width": "100%" },
      onClick: a[6] || (a[6] = H(() => {
      }, ["stop"]))
    }, [
      He(n("input", {
        ref_key: "input",
        ref: o,
        "onUpdate:modelValue": a[0] || (a[0] = (r) => s(te).text = r),
        class: "gh-inline-remark-input",
        type: "text",
        maxlength: "100",
        "aria-label": "手写仓库备注",
        placeholder: "备注说明…",
        disabled: s(te).busy || !e.active,
        onKeydown: [
          a[1] || (a[1] = Ft(H((r) => !r.isComposing && e.active && s(Pn)(), ["prevent"]), ["enter"])),
          a[2] || (a[2] = Ft(H((r) => !r.isComposing && e.active && s(En)(), ["prevent", "stop"]), ["esc"]))
        ]
      }, null, 40, Ag), [
        [so, s(te).text]
      ]),
      n("button", {
        type: "button",
        class: "gh-inline-remark-btn save",
        title: "保存备注",
        disabled: s(te).busy || !e.active,
        onClick: a[3] || (a[3] = //@ts-ignore
        (...r) => s(Pn) && s(Pn)(...r))
      }, "✓", 8, Eg),
      n("button", {
        type: "button",
        class: "gh-inline-remark-btn cancel",
        title: "取消草稿",
        disabled: s(te).busy || !e.active,
        onClick: a[4] || (a[4] = //@ts-ignore
        (...r) => s(En) && s(En)(...r))
      }, "✕", 8, Pg),
      n("button", {
        type: "button",
        disabled: s(te).busy || !e.active,
        onClick: a[5] || (a[5] = //@ts-ignore
        (...r) => s(Mi) && s(Mi)(...r))
      }, "读取已保存值", 8, Wg),
      s(te).storedValue !== null ? (l(), p("p", Rg, "已保存值：" + u(s(te).storedValue || "（空）"), 1)) : E("", !0)
    ]));
  }
}), Ng = {
  key: 0,
  role: "status"
}, Og = {
  key: 1,
  "aria-label": "未显示仓库的备注草稿"
}, Bg = {
  key: 2,
  class: "gh-search-options",
  style: { margin: "0 0 10px" }
}, Fg = { style: { "font-size": "12px", color: "var(--dim)" } }, Hg = {
  key: 3,
  class: "gh-repos-loading"
}, jg = {
  key: 4,
  class: "muted small",
  style: { "text-align": "center", padding: "40px 0", "font-size": "13px" }
}, zg = ["data-repo-name", "onClick", "onContextmenu", "onDragstart"], Gg = ["onClick"], Kg = { class: "gh-card-head" }, Vg = ["checked", "onChange"], Ug = ["src"], Yg = ["href", "title"], qg = { class: "owner" }, Xg = { class: "gh-card-body" }, Jg = { class: "gh-card-badges" }, Zg = ["title", "onClick"], Qg = ["onClick"], ef = ["title", "onClick"], tf = { class: "gh-badge-remark-text" }, of = {
  key: 0,
  class: "desc gh-desc-analyzing",
  title: "正在使用 AI 分析仓库…"
}, nf = {
  key: 1,
  class: "desc gh-desc-ai",
  title: "AI 中文简介（点击可直接修改，右键可重新分析）"
}, sf = ["title"], af = {
  key: 3,
  class: "desc dim"
}, rf = { class: "meta" }, lf = { class: "gh-stars" }, cf = {
  key: 0,
  class: "gh-lang"
}, df = {
  key: 1,
  class: "gh-updated"
}, uf = {
  key: 6,
  class: "gh-pager"
}, pf = ["disabled"], hf = { class: "gh-page-info" }, gf = ["disabled"], ff = ["onClick"], mf = /* @__PURE__ */ de({
  __name: "GitHubRepositories",
  props: {
    active: { type: Boolean, default: !0 }
  },
  setup(e) {
    const t = e, o = oe(() => !!te.repo && !$e.cards.some((D) => D.fullName === te.repo)), i = _e({
      visible: !1,
      x: 0,
      y: 0,
      fullName: "",
      folders: [],
      hasRemark: !1,
      url: ""
    }), a = j(null), r = j(!1);
    function m(D, $) {
      const L = D.target;
      if (L instanceof Element) {
        if ($e.batchMode) {
          if (L.closest(".fo-card-more,.gh-badge-folder,.gh-badge-remark,.gh-inline-remark-box")) return;
          D.preventDefault(), D.stopPropagation(), _t.toggleSelection($.fullName);
          return;
        }
        L.closest("a,button,.gh-badge-folder,.gh-badge-remark,.fo-card-more,.gh-card-hole,.gh-card-checkbox,.gh-inline-remark-box") || (D.preventDefault(), D.stopPropagation(), oa.open($.fullName, void 0, $));
      }
    }
    function g(D, $) {
      if (!t.active) return;
      D.preventDefault(), D.stopPropagation();
      const L = 12, P = 160, he = 280, W = Math.min(window.innerWidth - P - L, Math.max(L, D.clientX)), G = Math.min(window.innerHeight - he - L, Math.max(L, D.clientY));
      i.x = W, i.y = G, i.fullName = $.fullName, i.folders = [...$.folders || ($.folder ? [$.folder] : [])], i.hasRemark = !!$.customRemark, i.url = $.url, i.visible = !0, a.value = null, r.value = W > window.innerWidth - 380;
    }
    function d(D, $) {
      g($, D), a.value = "folder";
    }
    function h() {
      i.visible = !1, a.value = null;
    }
    function b(D) {
      i.folders.includes(D) ? i.folders = i.folders.filter(($) => $ !== D) : i.folders.push(D), st.toggleRepoList(i.fullName, D);
    }
    function M() {
      i.folders = [], st.clearRepoLists(i.fullName), h();
    }
    function v(D) {
      if (!t.active) return;
      const $ = typeof D == "string" ? D : D?.fullName || i.fullName;
      h(), Ii($);
    }
    function x() {
      if (!t.active) return;
      const D = i.fullName;
      h(), Ii(D, !0);
    }
    async function f() {
      const D = i.url;
      if (h(), D && t.active)
        try {
          await navigator.clipboard.writeText(D);
        } catch {
        }
    }
    function C(D) {
      const $ = st.findRepository(i.fullName);
      h(), $ && Us.sendGitHubShare({
        fullName: $.full_name,
        name: $.name,
        owner: $.owner?.login,
        ownerAvatar: $.owner?.avatar_url,
        desc: $.description || void 0,
        language: $.language || void 0,
        stars: $.stargazers_count,
        category: i.folders && i.folders.length ? i.folders.join(", ") : "未分类",
        url: $.html_url || `https://github.com/${$.full_name}`,
        updatedAt: $.updated_at ? $.updated_at.split("T")[0] : void 0
      }, D);
    }
    function I() {
      i.url && window.open(i.url, "_blank", "noreferrer"), h();
    }
    async function y() {
      const D = st.findRepository(i.fullName);
      if (!D) {
        h();
        return;
      }
      h(), await st.confirmUnstarRepository(D);
    }
    function _(D) {
      const $ = D.target;
      $?.closest(".gh-repo-context-menu") || $?.closest(".gh-inline-remark-box") || h();
    }
    function S(D) {
      D.key === "Escape" && i.visible && h();
    }
    Oe(() => t.active, (D) => {
      window.removeEventListener("pointerdown", _), window.removeEventListener("keydown", S), h(), D && (window.addEventListener("pointerdown", _), window.addEventListener("keydown", S));
    }, { immediate: !0 }), It(() => {
      window.removeEventListener("pointerdown", _), window.removeEventListener("keydown", S);
    });
    function R(D, $) {
      const L = D.target;
      if (L instanceof Element && L.closest("button,a,input,textarea,select,[contenteditable='true']")) {
        D.preventDefault();
        return;
      }
      _t.startDrag($, D);
    }
    const B = oe(() => {
      if ($e.cards.length > 0) return !1;
      const D = Pt.actionText || "";
      return !!(D.includes("正在读取") || D.includes("正在加载") || D.includes("正在统计") || D.includes("正在同步"));
    });
    return (D, $) => (l(), p(Y, null, [
      s(te).message ? (l(), p("p", Ng, u(s(te).repo ? `${s(te).repo}：` : "") + u(s(te).message), 1)) : E("", !0),
      o.value ? (l(), p("section", Og, [
        n("p", null, "备注草稿：" + u(s(te).repo) + "（仓库不在当前列表中，草稿仍保留）", 1),
        Z(Di, {
          active: t.active
        }, null, 8, ["active"])
      ])) : E("", !0),
      s($e).searchMessage ? (l(), p("div", Bg, [
        n("span", Fg, u(s($e).searchMessage), 1),
        n("button", {
          type: "button",
          class: "gh-tab",
          style: { padding: "2px 8px", "font-size": "11px", "margin-left": "8px" },
          onClick: $[0] || ($[0] = (L) => s(_t).resetSearch())
        }, "清空搜索")
      ])) : E("", !0),
      B.value ? (l(), p("div", Hg, [...$[16] || ($[16] = [
        n("div", {
          class: "gh-spinner",
          "aria-hidden": "true"
        }, null, -1),
        n("span", { class: "gh-loading-label" }, "正在读取 GitHub 仓库列表中…", -1)
      ])])) : s($e).emptyMessage ? (l(), p("p", jg, u(s($e).emptyMessage), 1)) : E("", !0),
      s($e).cards.length ? (l(), p("div", {
        key: 5,
        class: le(["repos gh-grid", { "gh-batch-active": s($e).batchMode }])
      }, [
        (l(!0), p(Y, null, fe(s($e).cards, (L) => (l(), p("article", {
          key: L.fullName,
          class: le(["repo gh-card", { selected: L.selected }]),
          "data-repo-name": L.fullName,
          draggable: "true",
          onClick: (P) => m(P, L),
          onContextmenu: (P) => g(P, L),
          onDragstart: (P) => R(P, L.fullName)
        }, [
          n("button", {
            class: "fo-card-more",
            type: "button",
            "aria-label": "更多操作",
            title: "更多操作",
            onClick: H((P) => g(P, L), ["stop"])
          }, "⋮", 8, Gg),
          n("div", Kg, [
            n("label", {
              class: "gh-card-hole",
              title: "点击勾选此仓库",
              onClick: $[1] || ($[1] = H(() => {
              }, ["stop"]))
            }, [
              n("input", {
                class: "gh-card-checkbox",
                type: "checkbox",
                checked: L.selected,
                onChange: (P) => s(_t).setSelection(L.fullName, P.target.checked)
              }, null, 40, Vg),
              $[17] || ($[17] = n("span", { class: "gh-hole-inner" }, null, -1))
            ]),
            n("img", {
              class: "gh-owner-avatar",
              src: L.avatarUrl || "assets/github-star.svg",
              alt: "",
              loading: "lazy",
              referrerpolicy: "no-referrer",
              onError: $[2] || ($[2] = (P) => P.target.src = "assets/github-star.svg")
            }, null, 40, Ug),
            n("a", {
              href: L.url,
              target: "_blank",
              rel: "noreferrer",
              class: "name",
              title: L.fullName
            }, [
              n("span", qg, u(L.owner) + "/", 1),
              Ye(u(L.name), 1)
            ], 8, Yg)
          ]),
          n("div", Xg, [
            n("div", Jg, [
              L.folders && L.folders.length ? (l(!0), p(Y, { key: 0 }, fe(L.folders, (P) => (l(), p("span", {
                key: P,
                class: "gh-badge-folder",
                title: `GitHub 列表：${P}（点击管理所属列表）`,
                onClick: H((he) => d(L, he), ["stop"])
              }, " 📁 " + u(P), 9, Zg))), 128)) : (l(), p("span", {
                key: 1,
                class: "gh-badge-folder uncat",
                title: "未分类（点击加入 GitHub 列表）",
                onClick: H((P) => d(L, P), ["stop"])
              }, " ＋ 未分类 ", 8, Qg)),
              s(te).repo === L.fullName ? (l(), ce(Di, {
                key: 2,
                active: t.active
              }, null, 8, ["active"])) : L.customRemark ? (l(), p("span", {
                key: 3,
                class: "gh-badge-remark",
                title: `备注：${L.customRemark}（点击就地修改）`,
                onClick: H((P) => v(L), ["stop"])
              }, [
                $[18] || ($[18] = n("span", { class: "gh-badge-remark-icon" }, "💬", -1)),
                n("span", tf, u(L.customRemark), 1)
              ], 8, ef)) : E("", !0)
            ]),
            L.descriptionKind === "analyzing" ? (l(), p("p", of, [...$[19] || ($[19] = [
              n("span", { class: "gh-ai-sparkle" }, "✨", -1),
              Ye(" 正在使用 AI 分析仓库并提炼中文介绍…", -1)
            ])])) : L.descriptionKind === "ai" ? (l(), p("p", nf, [
              $[20] || ($[20] = n("span", { class: "gh-ai-tag-flag" }, "🤖", -1)),
              Ye(u(L.description), 1)
            ])) : L.descriptionKind === "plain" ? (l(), p("p", {
              key: 2,
              class: "desc",
              title: L.description
            }, u(L.description), 9, sf)) : (l(), p("p", af, "暂无描述"))
          ]),
          n("div", rf, [
            n("span", lf, "★ " + u(L.stars), 1),
            L.language ? (l(), p("span", cf, u(L.language), 1)) : E("", !0),
            L.updated ? (l(), p("span", df, "更新 " + u(L.updated), 1)) : E("", !0)
          ])
        ], 42, zg))), 128))
      ], 2)) : E("", !0),
      s($e).totalPages > 1 ? (l(), p("div", uf, [
        n("button", {
          class: "gh-page-btn",
          type: "button",
          disabled: s($e).page <= 1,
          onClick: $[3] || ($[3] = (L) => s(_t).changePage(s($e).page - 1))
        }, "‹ 上一页", 8, pf),
        n("span", hf, u(s($e).page) + " / " + u(s($e).totalPages) + " · 共 " + u(s($e).totalItems) + " 个" + u(s($e).serverPaged ? ` · 已加载 ${s($e).loadedItems}` : ""), 1),
        n("button", {
          class: "gh-page-btn",
          type: "button",
          disabled: s($e).page >= s($e).totalPages,
          onClick: $[4] || ($[4] = (L) => s(_t).changePage(s($e).page + 1))
        }, "下一页 ›", 8, gf)
      ])) : E("", !0),
      (l(), ce(yt, { to: "body" }, [
        t.active && i.visible ? (l(), p("div", {
          key: 0,
          class: "fo-cover-context-menu gh-repo-context-menu",
          style: ke({ left: `${i.x}px`, top: `${i.y}px` }),
          onClick: $[14] || ($[14] = H(() => {
          }, ["stop"])),
          onContextmenu: $[15] || ($[15] = H(() => {
          }, ["prevent"]))
        }, [
          n("div", {
            class: le(["gh-menu-has-sub", { "is-active": a.value === "folder" }]),
            onMouseenter: $[6] || ($[6] = (L) => a.value = "folder")
          }, [
            $[21] || ($[21] = n("button", {
              class: "fo-cover-menu-item with-sub-arrow",
              type: "button"
            }, [
              n("span", null, "📁 所属 GitHub 列表"),
              n("span", { class: "sub-arrow" }, "›")
            ], -1)),
            n("div", {
              class: le(["gh-sub-flyout", { "flyout-left": r.value }]),
              onClick: $[5] || ($[5] = H(() => {
              }, ["stop"]))
            }, [
              n("button", {
                class: le(["fo-cover-menu-item", { primary: i.folders.length === 0 }]),
                type: "button",
                onClick: M
              }, u(i.folders.length === 0 ? "✓ " : "  ") + "＋ 设为未分类（清空列表） ", 3),
              (l(!0), p(Y, null, fe(s(st).cats, (L) => (l(), p("button", {
                key: L,
                class: le(["fo-cover-menu-item", { primary: i.folders.includes(L) }]),
                type: "button",
                onClick: (P) => b(L)
              }, u(i.folders.includes(L) ? "✓ " : "  ") + "📁 " + u(L), 11, ff))), 128))
            ], 2)
          ], 34),
          n("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: $[7] || ($[7] = (L) => a.value = null),
            onClick: $[8] || ($[8] = (L) => v())
          }, " ✏️ 编辑备注… ", 32),
          Z(Sa, {
            label: "💬 发送到聊天室",
            visible: i.visible,
            onOpen: $[9] || ($[9] = (L) => a.value = null),
            onSelect: C
          }, null, 8, ["visible"]),
          i.hasRemark ? (l(), p("button", {
            key: 0,
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: $[10] || ($[10] = (L) => a.value = null),
            onClick: x
          }, " 🗑️ 清除备注 ", 32)) : E("", !0),
          n("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: $[11] || ($[11] = (L) => a.value = null),
            onClick: f
          }, " 📋 复制仓库链接 ", 32),
          n("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: $[12] || ($[12] = (L) => a.value = null),
            onClick: I
          }, " ↗ 在 GitHub 打开 ", 32),
          n("button", {
            class: "fo-cover-menu-item danger",
            type: "button",
            onMouseenter: $[13] || ($[13] = (L) => a.value = null),
            onClick: y
          }, " ⭐ 取消 Star ", 32)
        ], 36)) : E("", !0)
      ]))
    ], 64));
  }
}), vf = /* @__PURE__ */ De(mf, [["__scopeId", "data-v-048d3839"]]), yf = { class: "gh-batch-bar-left" }, wf = { class: "gh-batch-count-tip" }, bf = { id: "gh-batch-selected-count" }, kf = {
  key: 0,
  "aria-label": "批量归属列表确认"
}, _f = ["disabled"], Cf = ["value"], xf = ["disabled"], Lf = ["disabled"], $f = { class: "gh-batch-bar-right" }, Sf = ["disabled"], Tf = ["disabled"], If = ["disabled"], Mf = /* @__PURE__ */ de({
  __name: "GitHubBatchBar",
  props: {
    active: { type: Boolean, default: !0 }
  },
  setup(e) {
    const t = e, o = Bs(), i = j(null);
    function a() {
      t.active && (o.value = st.prepareBatchMove(), i.value = null);
    }
    async function r() {
      const m = o.value, g = i.value;
      if (!t.active || !m || g === null || Ct.busy) return;
      await m.submit(g) && o.value === m && (o.value = void 0);
    }
    return Oe(() => t.active && zt.active, (m) => {
      m || (o.value = void 0);
    }), (m, g) => (l(), p(Y, null, [
      n("div", yf, [
        n("button", {
          type: "button",
          class: "gh-batch-action-btn",
          id: "gh-batch-select-all-btn",
          onClick: g[0] || (g[0] = (d) => s($o).toggleSelectAll())
        }, u(s(zt).allSelected ? "取消全选" : "全选"), 1),
        n("span", wf, [
          g[5] || (g[5] = Ye("已选择 ", -1)),
          n("b", bf, u(s(zt).selectedCount), 1),
          g[6] || (g[6] = Ye(" 项", -1))
        ])
      ]),
      o.value ? (l(), p("section", kf, [
        n("p", null, "仅操作打开选择器时的 " + u(o.value.names.length) + " 个仓库；后来勾选的仓库不加入。", 1),
        n("details", null, [
          g[7] || (g[7] = n("summary", null, "查看本次仓库清单", -1)),
          n("ul", null, [
            (l(!0), p(Y, null, fe(o.value.names, (d) => (l(), p("li", { key: d }, u(d), 1))), 128))
          ])
        ]),
        He(n("select", {
          "onUpdate:modelValue": g[1] || (g[1] = (d) => i.value = d),
          "aria-label": "目标列表",
          disabled: s(Ct).busy
        }, [
          g[8] || (g[8] = n("option", {
            value: null,
            disabled: ""
          }, "请选择目标列表", -1)),
          g[9] || (g[9] = n("option", { value: "" }, "未分类（清空所选仓库的所有列表所属）", -1)),
          (l(!0), p(Y, null, fe(s(Co).folders.filter((d) => d.kind === "custom"), (d) => (l(), p("option", {
            key: d.title,
            value: d.title
          }, u(d.title), 9, Cf))), 128))
        ], 8, _f), [
          [Ei, i.value]
        ]),
        n("button", {
          type: "button",
          disabled: !t.active || s(Ct).busy || i.value === null,
          onClick: r
        }, "确认加入列表", 8, xf),
        n("button", {
          type: "button",
          disabled: s(Ct).busy,
          onClick: g[2] || (g[2] = (d) => o.value = void 0)
        }, "取消", 8, Lf)
      ])) : E("", !0),
      n("div", $f, [
        n("button", {
          type: "button",
          class: "gh-batch-action-btn",
          id: "gh-batch-move-btn",
          disabled: !t.active || s(Ct).busy || s(zt).selectedCount === 0,
          title: "固定当前选择，批量加入所选 GitHub 列表",
          onClick: a
        }, " 📁 归入 GitHub 列表 ", 8, Sf),
        n("button", {
          type: "button",
          class: "gh-batch-action-btn",
          id: "gh-batch-ai-btn",
          disabled: s(zt).selectedCount === 0,
          title: "批量使用 AI 生成中文介绍",
          onClick: g[3] || (g[3] = (d) => s($o).analyzeAi())
        }, " ✨ 批量 AI 分析 ", 8, Tf),
        n("button", {
          type: "button",
          class: "gh-batch-action-btn danger",
          id: "gh-batch-unstar-btn",
          disabled: s(zt).selectedCount === 0,
          title: "从 GitHub 批量取消 Star 收藏",
          onClick: g[4] || (g[4] = (d) => s($o).unstar())
        }, " 🗑 取消收藏 ", 8, If)
      ])
    ], 64));
  }
}), Df = V(() => import("./GitHubWorkspaceCard-CklEL5vl.js")), Af = V(() => import("./NotificationCenter-zNzo7wFm.js")), Ef = V(() => import("./TabManagerPanel-2feLXUH1.js")), Pf = V(() => import("./BookmarkNoteMenu-DFkNLkIk.js")), Wf = V(() => import("./BookmarkPanel-Cp0197YE.js")), Rf = V(() => import("./LauncherDialogs-DyNO1sFE.js")), Nf = V(() => import("./SettingsDialog-BtMNMHUy.js")), Of = V(() => import("./SettingsView-C1TqBwpZ.js")), Bf = V(() => import("./ClockSettingsMenu-uSWMgiZW.js")), Ff = V(() => import("./BiliTheaterDialog-dMgc6B8D.js")), Hf = V(() => import("./BiliMiniPlayer-Dgng2BeX.js")), jf = V(() => import("./BiliMessagePanel-B3iN4avl.js")), zf = V(() => import("./ModelPricingCard-3PYQD3m1.js")), Gf = V(() => import("./BilibiliWorkspace-BW4h00Dr.js")), Kf = V(() => import("./YouTubeCard-DNrC3fyu.js").then((e) => e.Y)), Vf = V(() => import("./AihotFeed-C3zHCVq5.js")), Uf = V(() => import("./GitHubTrending-1rbzttia.js")), Yf = V(() => import("./AiDialog-BVNzAQI0.js")), qf = V(() => import("./AihotViewer-BiYmrtjG.js")), Xf = V(() => import("./NavWheelOverlay-DWaBkvet.js")), Jf = V(() => import("./StandaloneHost-CeDzxcUq.js")), Zf = V(() => import("./LauncherFolderDialog-DYh5md2G.js")), Qf = V(() => import("./LauncherMenus-yZfPsTPT.js"));
function ie(e, t, o, i) {
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
        return i?.setMounted?.(!0), () => {
          i?.setMounted?.(!1);
        };
      const m = r.innerHTML, g = Gn(o);
      g.config.errorHandler = (d, h, b) => {
        console.error(`LogicWeaver Vue feature failed: ${t.id} (${b})`, d), r.dataset.vueError = "1";
      };
      try {
        g.mount(r), i?.setMounted?.(!0);
      } catch (d) {
        throw i?.setMounted?.(!1), r.innerHTML = m, d;
      }
      return () => {
        i?.setMounted?.(!1), g.unmount();
      };
    }
  });
}
function em(e) {
  e.register({
    id: "intro",
    title: "启动动画",
    order: 10,
    eager: !0,
    roots: ["endfield-loader"],
    capabilities: ["ui:intro", "boot:progress"],
    mount: () => {
      const t = document.getElementById("endfield-loader");
      if (!ut.enabled) {
        t?.remove(), document.body.classList.remove("is-starting");
        return;
      }
      if (!t) return;
      const o = Gn(Yh);
      let i = !1;
      const a = () => {
        e.stop("intro");
      };
      window.addEventListener("logicweaver:intro-complete", a, { once: !0 }), o.mount(t);
      const r = window.setTimeout(() => {
        ut.finish("基础界面已就绪，在线服务继续后台加载", !0), window.setTimeout(() => {
          i || (a(), t?.remove(), document.body.classList.remove("is-starting"));
        }, 600);
      }, 8e3);
      return () => {
        i || (i = !0, clearTimeout(r), window.removeEventListener("logicweaver:intro-complete", a), o.unmount(), t.remove(), document.body.classList.remove("is-starting"));
      };
    }
  }), ie(e, { id: "spa-app", title: "纯血 SPA 单根调度器", order: 15, root: "vue-spa-root", capabilities: ["ui:spa-root", "workspace:keepalive"] }, Bh), document.getElementById("vue-spa-root") || ie(e, { id: "bili-companions", title: "b站伴随窗口", order: 19, root: "vue-bili-companions-root", capabilities: ["ui:dock-companion"] }, Jf), ie(e, { id: "notifications", title: "通知中心", order: 20, root: "vue-notification-root", capabilities: ["ui:toast", "notification:dedupe"] }, cs), ie(e, { id: "profile-menu", title: "头像右键菜单", order: 21, root: "bili-profile-menu", capabilities: ["ui:profile-menu", "profile:actions"] }, qh, Mo), ie(e, { id: "workspace-launchers", title: "常用工作区启动项", order: 22, root: "workspace-launchers", capabilities: ["ui:workspace-launchers", "workspace:launch"] }, Xh, Jn), ie(e, { id: "mac-dock", title: "底部快捷应用 Dock 栏", order: 23, root: "mac-dock", capabilities: ["ui:mac-dock", "dock:navigate"] }, ls, gt), ie(e, { id: "hero-clock", title: "首屏中央时钟", order: 26, root: "hero-clock", capabilities: ["ui:hero-clock", "clock:read"] }, ss), ie(e, { id: "search-box", title: "首屏搜索框", order: 27, root: "search", capabilities: ["ui:search-box", "search:actions"] }, Ai), ie(e, { id: "home-music", title: "首屏音乐播放器", order: 28, root: "task-thread-home", capabilities: ["ui:home-music", "music:playback"] }, as, Ue), ie(e, { id: "launcher-groups", title: "常用网站分组架", order: 29, root: "launcher-groups", capabilities: ["ui:launcher-groups", "launcher:navigate"] }, rs, Me), ie(e, { id: "weather-widget", title: "首屏天气小部件", order: 39, root: "weather-body", capabilities: ["ui:weather-widget", "weather:read"] }, is), ie(e, { id: "github-workspace", title: "GitHub 独立页 Vue 工作台", order: 49, root: "vue-github-workspace-root", capabilities: ["ui:github-workspace"] }, Df), ie(e, { id: "github-status", title: "GitHub 同步状态", order: 50, root: "vue-github-status-root", capabilities: ["ui:github-status", "github:sync-read"] }, tg, Un), ie(e, { id: "github-folders", title: "GitHub 文件夹导航", order: 55, root: "gh-folder-list", capabilities: ["ui:github-folders", "github:categorize-drop"] }, hg, Wt), ie(e, { id: "github-hero", title: "GitHub 分类摘要", order: 56, root: "gh-hero", capabilities: ["ui:github-summary", "github:actions"] }, Dg, Lo), ie(e, { id: "github-repositories", title: "GitHub 仓库列表", order: 57, root: "vue-github-repositories-root", capabilities: ["ui:github-repositories", "github:repository-actions", "github:paging"] }, vf, _t), ie(e, { id: "github-batch-bar", title: "GitHub Star 批量操作工具栏", order: 58, root: "gh-batch-bar", capabilities: ["ui:github-batch-bar", "github:batch-actions"] }, Mf, $o), ie(e, { id: "notification-center", spaOwned: !0, title: "持久通知中心", order: 71, root: "vue-notification-center-root", capabilities: ["ui:notification-history", "notification:read"] }, Af, St), ie(e, { id: "tab-manager", spaOwned: !0, title: "独立标签页管理", order: 71, root: "vue-tab-manager-root", capabilities: ["ui:tab-manager", "tabs:explicit"] }, Ef, Xi), ie(e, { id: "bookmark-menu", title: "书签上下文操作与备注菜单", order: 72, root: "vue-bookmark-menu-root", capabilities: ["ui:bookmark-menu", "bookmark:edit"] }, Pf, Vn), ie(e, { id: "launcher-dialogs", title: "快捷启动器管理弹窗族", order: 73, root: "vue-launcher-dialogs-root", capabilities: ["ui:launcher-dialogs", "launcher:manage"] }, Rf, Yn), ie(e, { id: "launcher-folder-dialog", title: "大文件夹展开视窗", order: 74, root: "vue-launcher-folder-root", capabilities: ["ui:launcher-folder", "launcher:folder-dialog"] }, Zf, xt), ie(e, { id: "launcher-menus", title: "启动器快捷上下文菜单族", order: 76, root: "vue-launcher-menus-root", capabilities: ["ui:launcher-menus", "launcher:context-menu"] }, Qf, no), ie(e, { id: "bookmark-panel", title: "浏览器书签侧边滑动视窗", order: 77, root: "vue-bookmark-panel-root", capabilities: ["ui:bookmark-panel", "bookmarks:panel"] }, Wf, nn), ie(e, { id: "bookmark-folder-strip", spaOwned: !0, title: "顶栏书签快捷文件夹横条", order: 78, root: "vue-bookmark-folder-strip-root", capabilities: ["ui:bookmark-folder-strip", "bookmarks:strip"] }, null, Zo), ie(e, { id: "settings-page", title: "独立设置页 Vue 工作台", order: 79, root: "vue-options-root", capabilities: ["ui:settings-page"] }, Of), ie(e, { id: "settings-dialog", title: "全局设置中心视窗", order: 80, root: "vue-settings-dialog-root", capabilities: ["ui:settings-dialog", "settings:manage"] }, Nf, sn), ie(e, { id: "clock-settings-menu", spaOwned: !0, title: "中央时钟偏好配置菜单", order: 82, root: "vue-clock-settings-root", capabilities: ["ui:clock-settings", "clock:preference-edit"] }, Bf, Ot), ie(e, { id: "bili-theater-dialog", title: "Bilibili 沉浸剧场与评论区弹窗", order: 85, root: "vue-bili-theater-root", capabilities: ["ui:bili-theater", "bili:playback"] }, Ff, So), ie(e, { id: "bili-mini-player", title: "Bilibili 悬浮迷你播放器", order: 85, root: "vue-bili-mini-player-root", capabilities: ["ui:bili-mini-player", "bili:playback"] }, Hf), ie(e, { id: "ai-dialog", title: "AI 助手对话框与知识点抽屉", order: 86, root: "vue-ai-dialog-root", capabilities: ["ui:ai-dialog", "ai:chat"] }, Yf, Zn), ie(e, { id: "aihot-viewer", spaOwned: !0, title: "AI HOT 资讯文章阅读器", order: 88, root: "vue-aihot-viewer-root", capabilities: ["ui:aihot-viewer", "viewer:aihot"] }, qf, Xn), ie(e, { id: "nav-wheel", title: "辐射状快捷动作轮盘与悬浮球", order: 95, root: "vue-nav-wheel-root", capabilities: ["ui:nav-wheel", "nav:radial-menu"] }, Xf, Te), ie(e, { id: "bili-message-panel", spaOwned: !0, title: "Bilibili 消息与互动通知中心", order: 102, root: "vue-bili-message-panel-root", capabilities: ["ui:bili-message-panel", "bili:messages"] }, jf, Rt), ie(e, { id: "pricing-radar", spaOwned: !0, title: "模型插件 (AI 定价与排行榜)", order: 108, root: "vue-pricing-root", capabilities: ["ui:pricing-radar", "pricing:read"] }, zf, zi), ie(e, { id: "bili-favorites", spaOwned: !0, title: "b站插件 Vue 外壳", order: 110, root: "vue-bili-favorites-root", capabilities: ["ui:bili-favorites-shell", "bilibili:favorites"] }, Gf, Hi), ie(e, { id: "youtube-card", spaOwned: !0, title: "YouTube 订阅与探索工作台", order: 111, root: "vue-youtube-root", capabilities: ["ui:youtube-card", "youtube:updates"] }, Kf, Oi), ie(e, { id: "aihot-feed", spaOwned: !0, title: "AI HOT 资讯流全功能聚合看板", order: 112, root: "vue-aihot-root", capabilities: ["ui:aihot-feed", "aihot:aggregate"] }, Vf, ji), ie(e, { id: "github-trending", spaOwned: !0, title: "GitHub 趋势榜与热门流", order: 114, root: "vue-github-trending-root", capabilities: ["ui:github-trending", "github:trending"] }, Uf, Ji);
}
Ws();
const ln = Da(an);
ar(an, ln);
rr(an);
em(ln);
Kn.loadBookmarks();
(async () => {
  document.getElementById("vue-bili-favorites-root") && !document.getElementById("vue-spa-root") && await import("./bilibili-channel.service-BDWWF5bw.js"), await Wa(), await ln.startEager(), ut.notifyBootReady();
})().catch((e) => console.error("[LogicWeaver] 页面启动失败", e));
window.addEventListener("pagehide", () => {
  ln.stopAll();
}, { once: !0 });
export {
  di as C,
  Gp as D,
  vf as G,
  Li as L,
  Gd as T,
  hg as _,
  Mf as a,
  Dg as b,
  tg as c,
  Xi as d,
  Ot as e,
  ui as f,
  Ji as g,
  km as h,
  Le as i,
  Zn as j,
  je as k,
  Te as l,
  on as m,
  J as n,
  Yh as o,
  Vd as p,
  Ud as q,
  Kd as r,
  Xh as s,
  Vo as t,
  qh as u,
  ns as v,
  jn as w,
  Ne as x,
  os as y,
  an as z
};
