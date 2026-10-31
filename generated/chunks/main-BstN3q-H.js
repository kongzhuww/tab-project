import { S as $i, i as $s } from "./SearchBox-DK6WgUav.js";
/* empty css                */
import { c as Fn, r as we, a as Ct, b as N, d as de, o as a, e as ce, w as Qt, u as s, f as c, g as n, h as M, T as Ts, t as b, F as K, i as ge, j as F, k as gt, l as Wt, m as Oe, v as Ss, n as Be, p as eo, q as Ti, s as Is, x as ae, y as Ve, z as xt, A as to, B as ve, C as le, D as He, E as Q, G, H as ft, I as mo, J as Si, K as Vo, L as We, M as no, N as Ii, O as Ms } from "./vendor-vue-wIH4jcna.js";
import { W as Uo, t as zt, p as an, n as Ae, a as To, b as _t, h as Ke, m as ct, c as Jn, d as Zn, s as ln, e as Qn, f as Ds, g as Es, i as As, j as Ps, k as Y, l as Mi, o as ro, q as Di, r as kt, u as Ws, v as io, w as Gt, x as So, y as Os, z as Bs, A as Io, B as Rs } from "./view-styles-BcxK8WCo.js";
import { l as Fs, r as Ns, G as Hs, a as oe, b as en, f as Yo, c as Nn, s as js, d as zs, e as Hn, g as qo, h as jn, i as Mt, j as wo, k as yt, m as ko, n as Kt, o as Ie, p as Gs, q as Qe, t as nt, u as bt, v as vo, R as Ks, w as Vs, x as Lt, y as It, z as ke, A as Us, B as Rt } from "./search.service-B8FaDQLd.js";
import { f as qe, l as wt, a as $e, p as Ys, b as _o, c as Zt, y as Ei, d as re, e as Ft } from "./youtube-store-2bEziEDh.js";
import { c as qs, a as Xs, t as Js, b as Zs, d as Qs, e as er, f as Vt, g as tr } from "./calendar.service-_YumC_hP.js";
import { w as Se, s as zn, P as or, i as Xo, D as cn, a as ei, g as Xe, p as nr, L as ir, b as $t, c as sr, d as dn, t as ti, e as rr, f as ar, h as Lo, l as Ai } from "./window-manager.store-DgNn9Rtk.js";
import { s as tn, a as lr, b as cr, u as Pi } from "./InlineEditStatus.vue_vue_type_style_index_0_scoped_28642927_lang-BiNio4cP.js";
import { b as Co, a as dr, c as ur } from "./up-group-manager-store-CzJ1sArR.js";
import { biliMessagePanelController as Dt, biliMessagePanelState as pr } from "./message-panel-store-CatcuDOX.js";
import { b as Wi, r as fr, a as ao } from "./bili-favorites-store-CK6jLXB_.js";
import { a as Gn, b as Oi, c as gr } from "./aihot-feed-store-DYKldREI.js";
import { p as Bi } from "./pricing-store-7Kn4RVvy.js";
import { R as hr } from "./read-session-DQk1qcgF.js";
import { f as Et } from "./fullscreen-cards.store-D6iRiFWV.js";
import { k as mr, m as vr } from "./core-utils-Ccz-tarm.js";
import { _ as Te } from "./_plugin-vue_export-helper-CHgC5LLL.js";
import { t as it } from "./together-listen.store-CE6xeOCa.js";
import { C as yr } from "./ChatShareMenu-Bh1eBnJE.js";
const br = /^[a-z][a-z0-9]*(?:[.:-][a-z0-9]+)*$/;
function wr() {
  const e = /* @__PURE__ */ new Map(), t = /* @__PURE__ */ new Map();
  function o(p) {
    if (!p || !br.test(p.id)) throw new TypeError(`Invalid command id: ${p?.id || ""}`);
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
    const x = t.get(p);
    return x ? (x.abort(), t.delete(p), !0) : !1;
  }
  async function r(p, x, m = "api") {
    const S = e.get(p);
    if (!S) throw new Error(`Unknown command: ${p}`);
    if (S.enabled && !S.enabled()) return;
    const f = S.concurrency || "replace";
    if (t.has(p)) {
      if (f === "drop") return;
      f === "replace" && i(p);
    }
    const u = new AbortController();
    f !== "parallel" && t.set(p, u);
    try {
      return await S.run(x, { signal: u.signal, source: m });
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
    return Object.freeze([...e.values()].map(l).sort((p, x) => p.category.localeCompare(x.category, "zh") || p.title.localeCompare(x.title, "zh")));
  }
  function g(p, x = 20) {
    const m = String(p || "").trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
    if (!m.length) return h().slice(0, x);
    const S = [...e.values()].map((f) => {
      const u = l(f), d = u.title.toLocaleLowerCase(), k = `${u.id} ${d} ${u.category} ${u.description} ${u.keywords.join(" ")}`.toLocaleLowerCase();
      if (!m.every((w) => k.includes(w))) return null;
      let $ = 0;
      for (const w of m)
        u.id === w ? $ += 200 : u.id.startsWith(w) && ($ += 120), d === w ? $ += 160 : d.startsWith(w) ? $ += 100 : d.includes(w) && ($ += 60), u.keywords.some((L) => L.toLocaleLowerCase().startsWith(w)) && ($ += 40);
      return { item: u, score: $ };
    }).filter((f) => !!f);
    return S.sort((f, u) => u.score - f.score || f.item.title.localeCompare(u.item.title, "zh")), Object.freeze(S.slice(0, Math.max(1, x)).map((f) => f.item));
  }
  return Object.freeze({ register: o, execute: r, cancel: i, has: (p) => e.has(p), list: h, search: g });
}
const on = wr(), kr = /^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/;
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
      p(f.id), r.delete(f.id), t.delete(f.id);
    };
  }
  function h(f) {
    return typeof f == "function" ? f : f && typeof f.unmount == "function" ? () => f.unmount() : () => {
    };
  }
  function g(f) {
    if (o.has(f)) return Promise.resolve(o.get(f)?.cleanup);
    if (i.has(f)) return i.get(f);
    const u = t.get(f);
    if (!u) return Promise.reject(new Error(`Unknown feature: ${f}`));
    r.delete(f);
    const d = new AbortController(), k = Object.freeze({
      signal: d.signal,
      commands: e,
      getRoot: (w) => document.getElementById(w)
    }), $ = Promise.resolve().then(() => u.mount(k)).then((w) => (i.delete(f), o.set(f, { cleanup: w, controller: d }), w), (w) => {
      throw i.delete(f), r.set(f, w), d.abort(), w;
    });
    return i.set(f, $), $;
  }
  async function p(f) {
    const u = i.get(f);
    if (u)
      try {
        await u;
      } catch {
        return;
      }
    const d = o.get(f);
    d && (o.delete(f), d.controller.abort(), await h(d.cleanup)());
  }
  async function x() {
    const f = typeof document < "u" && !!(document.getElementById("vue-spa-root") || document.getElementById("logicweaver-spa-root")), u = [...t.values()].filter(($) => !(!$.eager || !f && $.roots && $.roots.length > 0 && !$.roots.some((L) => !!document.getElementById(L)))).sort(($, w) => ($.order || 100) - (w.order || 100)), k = (await Promise.allSettled(u.map(($) => g($.id)))).flatMap(($, w) => $.status === "rejected" ? [{ id: u[w].id, reason: $.reason }] : []);
    k.length && console.warn("LogicWeaver Vue features failed to mount", k);
  }
  async function m() {
    const f = [...o.keys()].reverse();
    await Promise.allSettled(f.map(p));
  }
  function S() {
    return Object.freeze([...t.values()].map((f) => Object.freeze({
      id: f.id,
      title: f.title,
      order: f.order || 100,
      eager: f.eager === !0,
      roots: Object.freeze([...f.roots || []]),
      capabilities: Object.freeze([...f.capabilities || []]),
      status: i.has(f.id) ? "mounting" : o.has(f.id) ? "mounted" : r.has(f.id) ? "failed" : "registered",
      error: r.has(f.id) ? String(r.get(f.id)?.message || r.get(f.id) || "Feature mount failed") : ""
    })).sort((f, u) => f.order - u.order));
  }
  return Object.freeze({ register: l, start: g, startEager: x, stop: p, stopAll: m, has: (f) => t.has(f), list: S });
}
const Cr = localStorage.getItem("startupAnimationStyle") || localStorage.getItem("logicweaverStartupStyle") || "endfield", oi = (() => {
  try {
    const e = localStorage.getItem("showStartupAnimation"), t = localStorage.getItem("logicweaverEndfieldLoader"), o = e ?? t;
    return o === "1" || o === "true";
  } catch {
    return !1;
  }
})(), X = we({
  enabled: oi,
  style: Cr === "rhinelab" ? "rhinelab" : "endfield",
  renderedProgress: 4,
  targetProgress: 4,
  status: "CORE SHELL...",
  finished: !oi,
  exiting: !1,
  forced: !1
});
let oo = 0, Jo = 4, Ri = performance.now(), Dn = 0, Fo = null, En = !1;
function Fi(e) {
  const t = e - Ri, o = Dn ? Math.min(1, t / Dn) : 1, i = o * o * (3 - 2 * o);
  X.renderedProgress = Jo + (X.targetProgress - Jo) * i, o < 1 && !X.finished ? oo = requestAnimationFrame(Fi) : oo = 0;
}
function No(e, t) {
  if (!X.enabled || X.finished) return;
  const o = Math.max(X.targetProgress, Math.max(4, Math.min(100, Number(e) || 4)));
  t && (X.status = t), Jo = X.renderedProgress, X.targetProgress = o, Ri = performance.now(), Dn = Math.max(280, Math.min(920, 220 + Math.abs(o - Jo) * 7.5)), cancelAnimationFrame(oo), oo = requestAnimationFrame(Fi);
}
function nn(e = "Ready", t = !1) {
  X.finished || (X.finished = !0, X.forced = t, X.status = e, X.targetProgress = 100, cancelAnimationFrame(oo), oo = 0, X.renderedProgress = 100, Fo?.(t));
}
function xr(e = "KEYBOARD SKIP") {
  nn(e, !0);
}
function Lr() {
  X.enabled || nn("BOOT COMPLETE", !0);
}
function Ni() {
  !X.enabled || X.finished || En || (En = !0, No(38, "INITIALIZING CORE SHELL..."), setTimeout(() => {
    X.finished || No(76, "SYNTHESIZING RUNTIME...");
  }, 400), setTimeout(() => {
    X.finished || No(100, X.style === "rhinelab" ? "ID CONFIRMED : JOYCE MOORE" : "TERRA LINK READY / 终端就绪");
  }, 900), setTimeout(() => {
    X.finished || nn("BOOT COMPLETE / 首页就绪", !1);
  }, 1650));
}
async function $r() {
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
const et = Ct(X), rt = Object.freeze({
  update: No,
  finish: nn,
  skip: xr,
  notifyBootReady: Lr,
  async playIntro(e) {
    if (e?.style && (X.style = e.style), typeof document < "u" && (document.documentElement.dataset.startupStyle = X.style, document.documentElement.classList.remove("skip-endfield-loader"), document.body.classList.add("is-starting")), X.enabled = !0, X.finished = !1, X.forced = !!e?.force, X.renderedProgress = 4, X.targetProgress = 4, En = !1, typeof document < "u") {
      let t = document.getElementById("endfield-loader");
      if (!t) {
        t = document.createElement("div"), t.id = "endfield-loader", t.className = "endfield-loader notranslate", document.body.appendChild(t);
        const { default: o } = await import("./IntroAnimation-BAsmQtKx.js"), i = Fn(o), r = () => {
          window.removeEventListener("logicweaver:intro-complete", r), i.unmount(), t?.remove(), document.body.classList.remove("is-starting");
        };
        window.addEventListener("logicweaver:intro-complete", r, { once: !0 }), i.mount(t);
      }
    }
    Ni();
  },
  get enabled() {
    return X.enabled;
  },
  get finished() {
    return X.finished;
  }
});
function Tr(e) {
  return Fo = e, X.finished && e(X.forced), () => {
    Fo === e && (Fo = null);
  };
}
const Hi = [
  { date: "今天", dayName: "周四", emoji: "🌤️", condition: "多云", highTemp: 26, lowTemp: 18, rainProb: 15 },
  { date: "明天", dayName: "周五", emoji: "⛅", condition: "阴天", highTemp: 24, lowTemp: 17, rainProb: 30 },
  { date: "后天", dayName: "周六", emoji: "🌧️", condition: "小雨", highTemp: 21, lowTemp: 16, rainProb: 75 },
  { date: "周日", dayName: "周日", emoji: "🌦️", condition: "阵雨", highTemp: 23, lowTemp: 15, rainProb: 45 },
  { date: "周一", dayName: "周一", emoji: "☀️", condition: "晴天", highTemp: 27, lowTemp: 18, rainProb: 10 },
  { date: "周二", dayName: "周二", emoji: "🌤️", condition: "多云", highTemp: 28, lowTemp: 19, rainProb: 15 },
  { date: "周三", dayName: "周三", emoji: "☀️", condition: "晴天", highTemp: 29, lowTemp: 20, rainProb: 5 }
], ji = "lw_weather_snapshot_v1";
function Sr() {
  if (typeof window > "u" || typeof localStorage > "u") return null;
  try {
    const e = localStorage.getItem(ji);
    if (!e) return null;
    const t = JSON.parse(e);
    if (t && t.data && t.data.currentTemp !== void 0)
      return {
        state: "ready",
        city: t.city || t.data.cityName || "",
        data: t.data,
        forecastDays: Array.isArray(t.forecastDays) && t.forecastDays.length ? t.forecastDays : Hi,
        detailInfo: t.detailInfo || null,
        updatedAt: t.savedAt || Date.now()
      };
  } catch {
  }
  return null;
}
function Mo(e) {
  if (!(typeof window > "u" || typeof localStorage > "u"))
    try {
      e.data && localStorage.setItem(
        ji,
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
const Ir = () => {
  const e = Sr();
  return {
    state: e?.state || "loading",
    city: e?.city || "",
    errorMessage: "",
    data: e?.data || null,
    updatedAt: e?.updatedAt || null,
    forecastModalOpen: !1,
    forecastDays: e?.forecastDays || Hi,
    detailInfo: e?.detailInfo || {
      humidity: "62%",
      wind: "东北风 2级",
      uvIndex: "中等 (4)",
      airQuality: "优 (32)"
    }
  };
}, z = we(Ir());
let un = null, pn = null;
const ot = {
  get snapshot() {
    return Ct(z);
  },
  update(e) {
    Object.assign(z, e), Mo(z);
  },
  unconfigured() {
    Object.assign(z, {
      state: "unconfigured",
      city: "",
      errorMessage: "",
      data: null,
      updatedAt: Date.now()
    });
  },
  loading(e = "") {
    if (z.data) {
      e && (z.city = e);
      return;
    }
    Object.assign(z, {
      state: "loading",
      city: e,
      errorMessage: "",
      updatedAt: Date.now()
    });
  },
  ready(e, t = "") {
    Object.assign(z, {
      state: "ready",
      city: t || e.cityName,
      errorMessage: "",
      data: e,
      updatedAt: Date.now()
    }), Mo(z);
  },
  notFound(e = "") {
    Object.assign(z, {
      state: "not_found",
      city: e,
      errorMessage: `找不到城市「${e}」，右键可重新选择地点。`,
      data: null,
      updatedAt: Date.now()
    });
  },
  error(e = "天气加载失败，右键此处可重新选择地点。", t = "") {
    z.data || Object.assign(z, {
      state: "error",
      city: t,
      errorMessage: e,
      data: null,
      updatedAt: Date.now()
    });
  },
  openForecastModal(e) {
    e && (z.city = e), z.forecastModalOpen = !0;
  },
  closeForecastModal() {
    z.forecastModalOpen = !1;
  },
  setForecastDays(e) {
    z.forecastDays = Array.isArray(e) ? e.map((t) => ({
      dayName: t.dayName || t.day || "",
      date: t.date || "",
      emoji: t.emoji || "🌤️",
      condition: t.condition || t.text || "",
      rainProb: t.rainProb ?? 0,
      lowTemp: t.lowTemp ?? t.tempMin ?? 0,
      highTemp: t.highTemp ?? t.tempMax ?? 0
    })) : [], Mo(z);
  },
  setDetailInfo(e) {
    z.detailInfo = { ...e }, Mo(z);
  },
  applyCity(e) {
    typeof window < "u" && window.dispatchEvent(new CustomEvent("logicweaver:weather-city-selected", { detail: { city: e } })), this.refresh();
  },
  refresh() {
    un ? un() : typeof window < "u" && window.dispatchEvent(new CustomEvent("logicweaver:weather-refresh"));
  },
  changeLocation(e) {
    pn ? pn(e) : typeof window < "u" && window.dispatchEvent(new CustomEvent("logicweaver:weather-change-location", { detail: { clientX: e?.clientX, clientY: e?.clientY } }));
  },
  setRefreshAction(e) {
    un = e;
  },
  setChangeLocationAction(e) {
    pn = e;
  }
}, Mr = () => ({
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
}), me = we(Mr());
let fn = null;
const Ut = {
  get snapshot() {
    return Ct(me);
  },
  update(e) {
    Object.assign(me, e);
  },
  updateTime(e, t, o, i) {
    me.timeText = e, me.secsText = t, me.greetingText = o, me.dateText = i, me.updatedAt = Date.now();
  },
  applyConfig(e) {
    e.fontFamily !== void 0 && (me.fontFamily = e.fontFamily), e.colorHex !== void 0 && (me.colorHex = e.colorHex), e.greetColor !== void 0 && (me.greetColor = e.greetColor), e.dateColor !== void 0 && (me.dateColor = e.dateColor), e.isBlack !== void 0 && (me.isBlack = e.isBlack), e.isCustomColor !== void 0 && (me.isCustomColor = e.isCustomColor), me.updatedAt = Date.now();
  },
  openSettings(e) {
    fn ? fn(e) : window.dispatchEvent(new CustomEvent("logicweaver:clock-open-settings", { detail: { clientX: e?.clientX, clientY: e?.clientY } }));
  },
  setOpenSettingsAction(e) {
    fn = e;
  }
}, Dr = [
  { id: "ai", title: "AI 助手" },
  { id: "todoist", title: "Todoist" },
  { id: "stickers", title: "表情包" },
  { id: "calcom", title: "预约" },
  { id: "wallpaper", title: "壁纸库" }
], Er = () => ({
  mounted: !1,
  visible: !1,
  items: [...Dr]
}), gn = we(Er());
let Do = {};
const Kn = {
  getSnapshot() {
    return Ct(gn);
  },
  update(e) {
    Object.assign(gn, e);
  },
  setMounted(e) {
    gn.mounted = e;
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
    const r = document.getElementById(`${e}-top-open`);
    r && !t ? r.click() : window.dispatchEvent(new CustomEvent("logicweaver:open-workspace", { detail: { id: e } }));
  },
  setActions(e) {
    Do = { ...Do, ...e };
  }
}, hn = we({ visible: !1, pendingWrites: 0 });
async function Ar(e) {
  if (hn.pendingWrites) throw new Error("壁纸操作正在处理，未自动排队");
  hn.pendingWrites++;
  try {
    return await e();
  } finally {
    hn.pendingWrites--;
  }
}
const ni = {
  openDialog() {
    Se.open("wallpaper");
  },
  closeDialog() {
    Se.close("wallpaper");
  },
  resetDefault() {
    return Ar(() => Uo.clearWallpaper());
  }
}, ii = [
  { id: "mono", label: "极简等宽", font: "ui-monospace, 'SF Mono', 'JetBrains Mono', Menlo, Consolas, monospace", sample: "15:50:10" },
  { id: "sans", label: "现代无衬线", font: "-apple-system, BlinkMacSystemFont, 'Segoe UI Variable Display', 'Segoe UI', Roboto, 'PingFang SC', sans-serif", sample: "15:50:10" },
  { id: "din", label: "经典几何", font: "'DIN Alternate', 'DIN Pro', 'Franklin Gothic Medium', Futura, sans-serif", sample: "15:50:10" },
  { id: "digital", label: "数码管等宽", font: "'Courier New', Courier, monospace", sample: "15:50:10" },
  { id: "impact", label: "硬派力量", font: "Impact, 'Arial Black', 'Trebuchet MS', sans-serif", sample: "15:50:10" },
  { id: "serif", label: "典雅衬线", font: "'Playfair Display', Georgia, 'Times New Roman', serif", sample: "15:50:10" },
  { id: "rounded", label: "圆润亲和", font: "'Quicksand', 'Comic Sans MS', 'Segoe UI', sans-serif", sample: "15:50:10" }
], si = [
  { id: "white", label: "纯净皓白 (默认)", hex: "#ffffff" },
  { id: "black", label: "曜石极黑", hex: "#0f172a" },
  { id: "gold", label: "香槟金砂", hex: "#f59e0b" },
  { id: "cyan", label: "科技青蓝", hex: "#38bdf8" },
  { id: "emerald", label: "翡翠竹绿", hex: "#10b981" },
  { id: "rose", label: "淡雅樱粉", hex: "#fb7185" }
], uh = [
  { id: "local", label: "📍 本地系统时区", offset: "Local" },
  { id: "Asia/Shanghai", label: "🇨🇳 北京 / 香港", offset: "UTC+8" },
  { id: "Asia/Tokyo", label: "🇯🇵 东京 / 首尔", offset: "UTC+9" },
  { id: "Europe/London", label: "🇬🇧 伦敦 / 格林威治", offset: "UTC+0/+1" },
  { id: "Europe/Paris", label: "🇫🇷 巴黎 / 柏林", offset: "UTC+1/+2" },
  { id: "America/New_York", label: "🇺🇸 纽约 / 东部时间", offset: "UTC-5/-4" },
  { id: "America/Los_Angeles", label: "🇺🇸 洛杉矶 / 西部时间", offset: "UTC-8/-7" },
  { id: "Australia/Sydney", label: "🇦🇺 悉尼", offset: "UTC+10/+11" },
  { id: "UTC", label: "🌐 协调世界时 (UTC)", offset: "UTC" }
], _e = we({
  mounted: !1,
  isOpen: !1,
  x: 200,
  y: 200,
  font: "mono",
  color: "white",
  timezone: "local"
});
let mn = null;
const At = {
  state: _e,
  setMounted(e) {
    _e.mounted = e;
  },
  onAction(e) {
    mn = e;
  },
  dispatch(e, t) {
    if (mn)
      return mn(e, t);
  },
  open(e) {
    const i = typeof window < "u" ? window.innerWidth : 1280, r = typeof window < "u" ? window.innerHeight : 800, l = e?.clientX ?? e?.x ?? i / 2, h = e?.clientY ?? e?.y ?? r / 2, g = Math.max(12, Math.min(l - 40, i - 290 - 12)), p = Math.max(12, Math.min(h + 10, r - 420 - 12));
    _e.x = g, _e.y = p, _e.isOpen = !0, this.dispatch("open", { x: g, y: p });
  },
  close() {
    _e.isOpen = !1, this.dispatch("close");
  },
  setFont(e) {
    _e.font = e;
    const t = ii.find((o) => o.id === e);
    if (t) {
      Ut.applyConfig({ fontFamily: t.font });
      try {
        localStorage.setItem("lw_clock_font", e);
      } catch {
      }
    }
    this.dispatch("change", { font: e, color: _e.color, timezone: _e.timezone });
  },
  setColor(e) {
    _e.color = e;
    const t = si.find((o) => o.id === e);
    if (t) {
      Ut.applyConfig({
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
    this.dispatch("change", { font: _e.font, color: e, timezone: _e.timezone });
  },
  setTimezone(e) {
    _e.timezone = e;
    try {
      localStorage.setItem("lw_clock_tz", e);
    } catch {
    }
    this.dispatch("change", { font: _e.font, color: _e.color, timezone: e });
  },
  initPreferences() {
    try {
      const e = localStorage.getItem("lw_clock_font");
      if (e) {
        _e.font = e;
        const i = ii.find((r) => r.id === e);
        i && Ut.applyConfig({ fontFamily: i.font });
      }
      const t = localStorage.getItem("lw_clock_color");
      if (t) {
        _e.color = t;
        const i = si.find((r) => r.id === t);
        i && Ut.applyConfig({ colorHex: i.hex, greetColor: i.hex, dateColor: i.hex, isCustomColor: !0 });
      }
      const o = localStorage.getItem("lw_clock_tz");
      o && (_e.timezone = o);
    } catch {
    }
  },
  syncConfig(e) {
    e.font && (_e.font = e.font), e.color && (_e.color = e.color), e.timezone && (_e.timezone = e.timezone);
  }
}, ue = we({
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
let vn = null, Ho = !1;
async function jo(e, t = {}) {
  if (e === "poll") return { state: "ready", model: ue.model };
  if (e === "connect") return { state: "ready", model: ue.model };
  throw new Error("旧版 AI 对话桥接已退役，请使用「海狸聊天室」开启智能会话。");
}
function zi(e) {
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
  o || (e.state === "connecting" ? o = "正在连接本机 Codex 与 ChatGPT…" : e.state === "disconnected" ? o = "已待命（打开面板自动连接）" : e.authenticated ? o = `就绪 · ChatGPT ${e.plan || "已登录"}` : e.state === "ready" ? o = "就绪 · 尚未登录 ChatGPT" : o = t[e.state] || e.state), ue.statusText = o, ue.authHidden = !e.loginUrl, ue.authCode = e.loginCode || "", ue.authLink = e.loginUrl || "https://auth.openai.com/codex/device", ue.isStreaming = Ho || e.busy || e.state === "running";
}
async function Pr() {
  try {
    const e = await jo("poll");
    zi(e);
  } catch {
  }
}
async function Wr(e, t) {
  if (e === "open" || e === "connect")
    try {
      ue.statusText = "正在连接本机 Codex 与 ChatGPT…";
      const o = await jo("connect");
      zi(o);
    } catch (o) {
      ue.statusText = o?.message || "连接失败";
    }
  else if (e === "send" && t?.text) {
    const o = t.text;
    ue.messages.push({
      id: `msg-${Date.now()}`,
      role: "user",
      content: o
    }), ue.inputText = "", ue.isStreaming = !0, Ho = !0;
    try {
      await jo("send", { text: o }), await Pr();
    } catch (i) {
      ue.statusText = i?.message || "发送失败";
    } finally {
      Ho = !1, ue.isStreaming = !1;
    }
  } else if (e === "stop") {
    try {
      await jo("stop");
    } catch {
    }
    ue.isStreaming = !1, Ho = !1;
  }
}
const Vn = {
  state: ue,
  setMounted(e) {
    ue.mounted = e;
  },
  onAction(e) {
    vn = e;
  },
  dispatch(e, t) {
    if (vn)
      return vn(e, t);
    Wr(e, t);
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
}, yn = we({
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
}), Eo = /* @__PURE__ */ new Set(), Or = {
  state: yn,
  open(e) {
    Object.assign(yn, e, { open: !0 });
  },
  update(e) {
    Object.assign(yn, e);
  },
  close() {
    Eo.forEach((e) => e("close"));
  },
  save(e) {
    Eo.forEach((t) => t("save", e));
  },
  onAction(e) {
    return Eo.add(e), () => Eo.delete(e);
  }
}, zo = we({ isOpen: !1 }), Gi = {
  state: zo,
  open() {
    zo.isOpen = !0;
  },
  close() {
    zo.isOpen = !1;
  }
}, bn = "biliProfileCacheV1", at = "biliLocallyKnownMessageIdsV1", Ao = "biliMessageUserCacheV1", lo = "githubKnownReleaseVersionsV1", Po = "customNewtabAvatar", ri = "biliToastKnownCountsV1";
class Br {
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
    return ["reply", "at", "like", "system", "private"].forEach((r) => {
      const l = Math.max(0, Number(this.unread?.[r] || 0));
      let h = Array.isArray(this.locallyKnownIds?.[r]) ? this.locallyKnownIds[r] : [];
      l < h.length && (h = [], this.locallyKnownIds[r] = [], o = !0), t[r] = Math.max(0, l - h.length);
    }), o && typeof chrome < "u" && chrome?.storage?.local && chrome.storage.local.set({ [at]: this.locallyKnownIds }).catch(() => {
    }), t;
  }
  markKnown(t, o, i) {
    this.locallyKnownIds[t] || (this.locallyKnownIds[t] = []);
    let r = !1;
    o && !this.locallyKnownIds[t].includes(o) && (this.locallyKnownIds[t].push(o), r = !0), i && !this.locallyKnownIds[t].includes(i) && (this.locallyKnownIds[t].push(i), r = !0), r && typeof chrome < "u" && chrome?.storage?.local && chrome.storage.local.set({ [at]: this.locallyKnownIds }).catch(() => {
    }), this.applyBiliProfile(this.profile, this.unread);
  }
  markAllKnown(t, o = []) {
    this.locallyKnownIds[t] || (this.locallyKnownIds[t] = []);
    const i = new Set(this.locallyKnownIds[t]);
    for (const l of o) l && i.add(l);
    const r = Math.max(0, Number(this.unread?.[t] || 0));
    if (i.size < r) {
      const l = r - i.size;
      for (let h = 0; h < l; h++) i.add(`__pad_${Date.now()}_${h}`);
    }
    this.locallyKnownIds[t] = Array.from(i), typeof chrome < "u" && chrome?.storage?.local && chrome.storage.local.set({ [at]: this.locallyKnownIds }).catch(() => {
    }), this.applyBiliProfile(this.profile, this.unread);
  }
  applyBiliProfile(t, o = {}) {
    this.profile = t || null, this.unread = o || {};
    const r = this.customAvatar || String(t?.face || "assets/bilibili.svg").replace(/^http:/, "https:"), l = this.getVisibleUnread();
    if (zt.avatarUrl = r, zt.userName = t?.uname || "哔哩哔哩用户", zt.buttonTitle = "通知中心", an.avatarUrl = r, an.userName = t?.uname || "用户", an.mid = t?.mid, typeof document < "u") {
      const h = document.getElementById("bili-profile-avatar");
      h && (h.src = r);
      const g = document.getElementById("bili-profile-button");
      g && (g.title = zt.buttonTitle);
    }
    Dt.updateState({
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
        }, [r, l, h] = await Promise.allSettled([
          fetch("https://api.bilibili.com/x/msgfeed/unread?build=0&mobi_app=web", { credentials: "include" }).then((u) => u.json()),
          fetch("https://api.vc.bilibili.com/x/im/web/msgfeed/unread", { credentials: "include" }).then((u) => u.json()),
          fetch("https://api.vc.bilibili.com/session_svr/v1/session_svr/single_unread", { credentials: "include" }).then((u) => u.json())
        ]), g = r.status === "fulfilled" ? r.value?.data || {} : {}, p = l.status === "fulfilled" ? l.value?.data || {} : {}, x = h.status === "fulfilled" ? h.value?.data || {} : {}, m = Number(p.at || 0), S = p.reply != null ? Number(p.reply || 0) : Math.max(0, Number(p.recv_reply || 0) - m), f = {
          reply: Math.max(Number(g.reply || 0), S),
          at: Math.max(Number(g.at || 0), m),
          like: Math.max(
            Number(g.like || g.praise || 0),
            Number(p.like || p.recv_like || 0)
          ),
          system: Math.max(Number(g.sys_msg || g.system || 0), Number(p.sys_msg || 0)),
          private: Number(
            g.chat || p.chat || Number(x.follow_unread || 0) + Number(x.unfollow_unread || 0) + Number(x.dustbin_push_msg || 0)
          )
        };
        this.applyBiliProfile(i, f), typeof chrome < "u" && chrome?.storage?.local && await chrome.storage.local.set({ [bn]: { profile: i, unread: f, savedAt: Date.now() } }), this.checkAndNotifyBiliInteractions(f);
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
      this.biliToastKnownCounts = { ...o }, typeof chrome < "u" && chrome?.storage?.local && chrome.storage.local.set({ [ri]: this.biliToastKnownCounts }).catch(() => {
      });
      return;
    }
    const i = o.private - Number(this.biliToastKnownCounts.private || 0);
    o.like - Number(this.biliToastKnownCounts.like || 0);
    const r = o.reply - Number(this.biliToastKnownCounts.reply || 0), l = o.at - Number(this.biliToastKnownCounts.at || 0);
    o.system - Number(this.biliToastKnownCounts.system || 0), this.biliToastKnownCounts = { ...o }, typeof chrome < "u" && chrome?.storage?.local && chrome.storage.local.set({ [ri]: this.biliToastKnownCounts }).catch(() => {
    }), i > 0 && Ae.show({
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
        Dt.openPanel();
      }
    }), r > 0 && Ae.show({
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
        Dt.openPanel();
      }
    }), l > 0 && Ae.show({
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
        Dt.openPanel();
      }
    });
  }
  init() {
    this.initialized || (this.initialized = !0, To.setActions({
      onAction: async (t) => {
        if (t === "messages")
          _t.open();
        else if (t === "tabs")
          Gi.open();
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
      bn,
      at,
      Ao,
      lo,
      Po
    ]).then((t) => {
      this.customAvatar = t[Po] || "", this.locallyKnownIds = t[at] && typeof t[at] == "object" ? t[at] : {}, this.userCache = t[Ao] && typeof t[Ao] == "object" ? t[Ao] : {}, this.githubKnownVersions = t[lo] && typeof t[lo] == "object" ? t[lo] : {};
      const o = t[bn];
      o?.profile ? this.applyBiliProfile(o.profile, o.unread || {}) : this.applyBiliProfile(null, {});
    }).catch(() => {
    }), chrome.storage.onChanged && chrome.storage.onChanged.addListener((t, o) => {
      o === "local" && (t[Po] && (this.customAvatar = t[Po].newValue || "", this.applyBiliProfile(this.profile, this.unread)), t[at] && (this.locallyKnownIds = t[at].newValue || {}, this.applyBiliProfile(this.profile, this.unread)));
    })), Dt.onAction((t, o) => {
      t === "mark-known" ? this.markKnown(o.kind, o.id, o.talkerId) : t === "mark-all-known" && this.markAllKnown(o.kind, o.ids);
    }), this.refreshBiliProfile(), setTimeout(() => {
      this.loadGitHubUpdates();
    }, 3500));
  }
}
const ai = new Br(), fe = we({ open: !1, loading: !1, error: "", mid: "", name: "", face: "", sign: "", followed: !1, submitting: !1, left: 12, top: 12, videos: [] });
let Wo = null;
const Go = {
  state: fe,
  open(e, t) {
    Wo = t, Object.assign(fe, { open: !0, loading: !0, error: "", submitting: !1, videos: [] }, e);
  },
  update(e) {
    Object.assign(fe, e);
  },
  close() {
    fe.submitting || (fe.open = !1, Wo = null);
  },
  async toggleFollow() {
    if (!(!Wo || fe.submitting)) {
      fe.submitting = !0;
      try {
        const e = !fe.followed;
        await Wo(e) && (fe.followed = e);
      } finally {
        fe.submitting = !1;
      }
    }
  }
}, be = we({
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
let vt;
const co = new hr();
let li = !1;
async function Rr(e, t) {
  if (t.throwIfAborted(), new URL(e).origin !== "https://ghapi.h11.dev") throw new Error("Unexpected public source");
  const o = new AbortController(), i = () => o.abort();
  t.addEventListener("abort", i, { once: !0 });
  const r = setTimeout(i, 15e3);
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
    const h = l.body.getReader(), g = new TextDecoder("utf-8", { fatal: !0 });
    let p = 0, x = "";
    try {
      for (; ; ) {
        o.signal.throwIfAborted();
        const m = await h.read();
        if (m.done) break;
        if (p += m.value.byteLength, p > 2 * 1024 * 1024) throw new Error("Public source exceeds limit");
        x += g.decode(m.value, { stream: !0 });
      }
      return o.signal.throwIfAborted(), JSON.parse(x + g.decode());
    } finally {
      h.cancel().catch(() => {
      }), h.releaseLock();
    }
  } finally {
    clearTimeout(r), t.removeEventListener("abort", i);
  }
}
function ci(e, t) {
  const o = e?.name || e?.repository, i = t ? e?.full_name || (typeof o == "string" && o.includes("/") ? o : e?.author && o ? `${e.author}/${o}` : "") : e?.full_name;
  if (typeof i != "string" || !/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(i) || i.split("/").some((g) => g === "." || g === "..")) throw new Error("Invalid repository");
  const [r, l] = i.split("/"), h = (g) => typeof g == "number" && Number.isFinite(g) && g >= 0 ? g : void 0;
  return {
    name: l,
    full_name: i,
    owner: { login: r },
    description: typeof e.description == "string" ? e.description : "",
    language: typeof e.language == "string" ? e.language : "",
    stargazers_count: h(t ? e.stars ?? e.stargazers_count : e.stargazers_count),
    forks_count: h(t ? e.forks ?? e.forks_count : e.forks_count),
    html_url: `https://github.com/${encodeURIComponent(r)}/${encodeURIComponent(l)}`
  };
}
async function Fr(e, t) {
  const o = new Date(Date.now() - e * 864e5).toISOString().slice(0, 10);
  let i = "";
  try {
    const h = await Fs(t), { data: g } = await Ns(`/search/repositories?q=${encodeURIComponent(`is:public created:>${o}`)}&sort=stars&order=desc&per_page=30`, { headers: h, signal: t, maxBytes: 2 * 1024 * 1024 });
    if (t.throwIfAborted(), !Array.isArray(g?.items)) throw new Error("Invalid search response");
    return {
      repos: g.items.slice(0, 30).map((p) => ci(p, !1)),
      sourceText: `GitHub Search：UTC 日期 ${o} 之后新建的仓库，按累计 Star 排序；不是官方 Trending 榜。${g.incomplete_results ? " API 标记为不完整结果。" : ""}`
    };
  } catch (h) {
    t.throwIfAborted(), i = h instanceof Hs ? h.message : "主源响应格式无效。";
  }
  const r = e === 1 ? "daily" : e === 7 ? "weekly" : "monthly", l = await Rr(`https://ghapi.h11.dev/repositories?since=${r}`, t);
  if (t.throwIfAborted(), !Array.isArray(l)) throw new Error("Invalid fallback response");
  return {
    repos: l.slice(0, 30).map((h) => ci(h, !0)),
    sourceText: `GitHub Search 不可用：${i} 改用第三方 ghapi.h11.dev 的 ${r} 趋势快照（不发送账号凭据）；口径与新建仓库搜索不同，源更新时间未提供。`
  };
}
const Ki = {
  get state() {
    return be;
  },
  // Only a mounted, visible View may own network work. Returning keeps the
  // previous result/error; an interrupted request requires explicit refresh.
  attachView(e) {
    co.cancel(), be.isLoading = !1, vt = e;
    const t = () => {
      vt === e && co.pending && (co.cancel(), be.isLoading = !1, be.errorMessage = "读取已暂停，返回后可点击刷新。");
    };
    return e.addEventListener("abort", t, { once: !0 }), !e.aborted && !li && this.refresh(), () => {
      e.removeEventListener("abort", t), vt === e && (t(), vt = void 0);
    };
  },
  switchTab(e) {
    be.currentTab = e, this.dispatch("switch-tab", e);
  },
  async switchRange(e, t) {
    !vt || vt.aborted || ![1, 7, 30].includes(e) || e === be.sinceDays || (co.cancel(), Object.assign(be, {
      sinceDays: e,
      rangeText: `近 ${e} 天`,
      repos: [],
      sourceText: "",
      fetchedAt: 0,
      hasLoaded: !1,
      errorMessage: "",
      isLoading: !1
    }), this.dispatch("switch-range", { days: e, text: be.rangeText }), await this.refresh());
  },
  async refresh() {
    const e = vt;
    if (!e || e.aborted || be.isLoading) return;
    const t = be.sinceDays, o = co.begin({
      signal: e,
      timeoutMs: 45e3,
      isCurrent: () => vt === e && be.sinceDays === t,
      onStop: (r) => {
        be.isLoading = !1, r === "timeout" && (be.errorMessage = "数据源读取超过整体45秒上限，请手动刷新；没有继续请求备用源。");
      }
    }), i = o.current;
    if (i()) {
      li = !0, be.isLoading = !0, be.errorMessage = "";
      try {
        const r = await o.wait(() => Fr(t, o.signal));
        if (!i()) return;
        be.repos = r.repos, be.sourceText = r.sourceText, be.fetchedAt = Date.now(), be.hasLoaded = !0;
      } catch {
        i() && (be.errorMessage = be.hasLoaded ? "刷新失败，保留同一时间范围的上次读取结果；请检查网络或额度后手动刷新。" : "数据源读取失败或超时；未使用内置样例，请稍后手动刷新。");
      } finally {
        o.finish() && (be.isLoading = !1, this.dispatch("refresh"));
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
}, An = () => ({
  icon: "🧭",
  title: "快捷轮盘",
  desc: "移动鼠标选择",
  active: !1
}), Un = () => ({
  visible: !1,
  wedgePath: "",
  arcPath: "",
  line1: { x1: 0, y1: 0, x2: 0, y2: 0 },
  line2: { x1: 0, y1: 0, x2: 0, y2: 0 }
}), Z = we({
  mounted: !1,
  isOpen: !1,
  isExpanded: !1,
  mode: "main",
  ballPosition: { x: 0, y: 0 },
  hub: An(),
  activeSectorId: null,
  sectors: [],
  beam: Un()
});
let di = null;
function Nr(e, t) {
  if (typeof e != "number" || !t)
    return Un();
  const o = 160, i = 160, r = 26, l = 154, h = 360 / t, g = e - h / 2, p = e + h / 2, x = g * Math.PI / 180, m = p * Math.PI / 180, S = o + r * Math.cos(x), f = i + r * Math.sin(x), u = o + l * Math.cos(x), d = i + l * Math.sin(x), k = o + r * Math.cos(m), $ = i + r * Math.sin(m), w = o + l * Math.cos(m), L = i + l * Math.sin(m), A = h > 180 ? 1 : 0, ne = `M ${S.toFixed(1)} ${f.toFixed(1)} L ${u.toFixed(1)} ${d.toFixed(1)} A ${l} ${l} 0 ${A} 1 ${w.toFixed(1)} ${L.toFixed(1)} L ${k.toFixed(1)} ${$.toFixed(1)} A ${r} ${r} 0 ${A} 0 ${S.toFixed(1)} ${f.toFixed(1)} Z`, B = `M ${u.toFixed(1)} ${d.toFixed(1)} A ${l} ${l} 0 ${A} 1 ${w.toFixed(1)} ${L.toFixed(1)}`;
  return {
    visible: !0,
    wedgePath: ne,
    arcPath: B,
    line1: {
      x1: parseFloat(S.toFixed(1)),
      y1: parseFloat(f.toFixed(1)),
      x2: parseFloat(u.toFixed(1)),
      y2: parseFloat(d.toFixed(1))
    },
    line2: {
      x1: parseFloat(k.toFixed(1)),
      y1: parseFloat($.toFixed(1)),
      x2: parseFloat(w.toFixed(1)),
      y2: parseFloat(L.toFixed(1))
    }
  };
}
const Ce = {
  get state() {
    return Z;
  },
  getSnapshot() {
    return Ct(Z);
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
    } : Z.hub = An();
  },
  setBeam(e, t) {
    Z.beam = Nr(e, t);
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
    Z.isExpanded = !1, Z.mode = "main", Z.activeSectorId = null, Z.beam = Un(), Z.hub = An();
  },
  setWheelMode(e) {
    Z.mode = e;
  },
  setActionHandler(e) {
    di = e;
  },
  dispatch(e, t) {
    di?.(e, t);
  }
}, Vi = [
  { id: "daily-bilibili", title: "b站插件", desc: "B站收藏夹与追番视频", icon: "assets/bilibili.svg" },
  { id: "daily-pricing", title: "模型插件", desc: "AI 模型定价与排行榜", icon: "assets/nav-pricing.svg" },
  { id: "daily-aihot", title: "ai hot插件", desc: "全网 AI 与前沿科技资讯", icon: "assets/nav-aihot.svg" },
  { id: "folder", title: "常用网站", desc: "点击展开快捷网站子轮盘", icon: "assets/nav-folder.svg", mode: "shortcuts" },
  { id: "card-github", title: "github插件", desc: "GitHub 趋势与星标项目", icon: "assets/nav-github.svg" },
  { id: "launcher", title: "首页", desc: "返回主屏常用应用台", icon: "assets/nav-home.svg" }
];
function Hr() {
  return Vi.filter((e) => e.mode || e.id === "launcher" || Xo(e.id));
}
function jr() {
  return or.filter((e) => e.kind === "module" && Xo(e.id)).map((e) => ({
    id: e.id,
    title: e.title,
    desc: e.isDev ? "已启用的实验性组件" : e.categoryLabel,
    icon: e.icon || e.emoji || "🧩",
    tool: e.id
  }));
}
function ui() {
  Z.isExpanded && $o();
}
let Pn = [], xo = Vi, lt = { x: 400, y: 300 }, Ui = !1, uo = !1, po = null;
function kn() {
  return globalThis.chrome?.storage;
}
function Yi(e, t) {
  const o = Z.isExpanded ? 160 : 24;
  Ce.setBallPosition(
    Math.max(o + 8, Math.min(window.innerWidth - o - 8, e)),
    Math.max(o + 8, Math.min(window.innerHeight - o - 8, t))
  );
}
function $o() {
  const e = Z.mode;
  xo = e === "tools" ? jr() : e === "shortcuts" ? [
    ...Pn.length ? Pn : [{ id: "shortcut-empty", title: "暂无快捷项", desc: "常用网站可放入快捷轮盘", icon: "📭" }],
    { id: "back-to-main", title: "返回主轮盘", desc: "返回页面电梯导航", icon: "🔙", mode: "main" }
  ] : Hr();
  const t = xo.length, o = t > 12 ? 118 : t > 9 ? 114 : 110, i = t > 12 ? 46 : t > 9 ? 50 : 56;
  Ce.setSectors(xo.map((r, l) => {
    const h = -90 + 360 / t * l, g = h * Math.PI / 180;
    return {
      id: r.id,
      title: r.title,
      desc: r.desc,
      icon: r.icon,
      angleDeg: h,
      x: Math.round(160 + Math.cos(g) * o),
      y: Math.round(160 + Math.sin(g) * o),
      size: i,
      isShortcut: !!r.url
    };
  })), Ce.setWheelMode(e), Ce.setActiveSector(null), Ce.setBeam(null, 0), Ce.setHub(e === "shortcuts" ? { icon: "🔙", title: "快捷方式" } : e === "tools" ? { icon: "🧰", title: "常用工具" } : null);
}
function Zo(e) {
  Z.mode = e, $o();
}
function Pt() {
  Ce.collapse(), Yi(Z.ballPosition.x, Z.ballPosition.y), Ce.setVisibility(Ui);
}
function jt(e = Z.ballPosition.x, t = Z.ballPosition.y, o = "main") {
  Ce.expand(void 0, void 0, o), Yi(e, t), $o(), Ce.setVisibility(!0);
}
function zr(e) {
  if (!(e.tool && !Xo(e.tool) || !e.url && !e.mode && e.id !== "launcher" && !Xo(e.id))) {
    if (e.mode) {
      Zo(e.mode);
      return;
    }
    if (Pt(), e.url) {
      window.open(e.url, "_blank");
      return;
    }
    if (e.tool) {
      window.triggerToolShortcut?.(e.tool);
      return;
    }
    e.id === "launcher" ? (typeof window < "u" && window.scrollTo({ top: 0, left: 0, behavior: "instant" }), Et.exit(), document.body && (document.body.dataset.page = "home")) : Et.enter(e.id);
  }
}
function pi(e) {
  lt = { x: e.clientX, y: e.clientY };
}
function fi(e) {
  e.button === 1 && (e.preventDefault(), e.stopPropagation(), lt = { x: e.clientX, y: e.clientY }, Z.isExpanded ? Pt() : jt(e.clientX, e.clientY));
}
function gi(e) {
  e.button === 1 && e.preventDefault();
}
function hi(e) {
  !Z.isExpanded || zn.active || e.key === "Escape" && (e.preventDefault(), e.stopPropagation(), Z.mode === "shortcuts" ? Zo("main") : Pt());
}
function Gr(e) {
  try {
    const t = globalThis.chrome;
    if (typeof t?.runtime?.getURL == "function")
      return t.runtime.getURL("_favicon/?pageUrl=" + encodeURIComponent(e) + "&size=64");
  } catch {
  }
  return "";
}
function Kr(e) {
  const t = e.customIcon || e.icon;
  if (t && typeof t == "string" && !/google\.com\/s2\/favicons|icons\.duckduckgo/i.test(t))
    return t;
  if (e.url) {
    const o = oe.getCachedIcon(e.url);
    if (o) return o;
    const i = Gr(e.url);
    if (i) return i;
  }
  return e.icon || "🔗";
}
const dt = {
  async start() {
    if (!uo) {
      uo = !0, lt = { x: Math.round(window.innerWidth / 2), y: Math.round(window.innerHeight / 2) }, Ce.setActionHandler((e, t) => {
        if (e === "hub:click")
          Z.isExpanded ? Z.mode === "shortcuts" ? Zo("main") : Pt() : jt();
        else if (e === "sector:click" || e === "container:click") {
          const o = xo.find((i) => i.id === t?.id || e === "container:click" && i.id === Z.activeSectorId);
          o && zr(o);
        } else if (e === "sector:hover") {
          const o = Z.sectors.find((i) => i.id === t?.id);
          o && (Ce.setHub({ icon: o.icon, title: o.title, desc: o.desc, active: !0 }), Ce.setActiveSector(o.id), Ce.setBeam(o.angleDeg, xo.length));
        } else e === "sector:leave" && (Ce.setActiveSector(null), Ce.setBeam(null, 0), Ce.setHub(Z.mode === "shortcuts" ? { icon: "🔙", title: "快捷方式" } : Z.mode === "tools" ? { icon: "🧰", title: "常用工具" } : null));
      }), window.addEventListener("logicweaver:dock-modules-changed", ui), window.addEventListener("pointermove", pi, { passive: !0 }), window.addEventListener("mousedown", fi, !0), window.addEventListener("auxclick", gi, !0), window.addEventListener("keydown", hi, !0), po = (e, t) => {
        t === "local" && (e.siteShelfLinks || e.logicweaverNavWheelShortcutsV1) && this.loadShortcuts();
      }, kn()?.onChanged?.addListener(po);
      try {
        if (!uo) return;
        Ui = !1, Ce.setVisibility(!1);
      } catch {
      }
      await this.loadShortcuts(), $o();
    }
  },
  stop() {
    uo = !1, Ce.setActionHandler(null), window.removeEventListener("logicweaver:dock-modules-changed", ui), window.removeEventListener("pointermove", pi), window.removeEventListener("mousedown", fi, !0), window.removeEventListener("auxclick", gi, !0), window.removeEventListener("keydown", hi, !0), po && kn()?.onChanged?.removeListener(po), po = null;
  },
  async loadShortcuts() {
    try {
      const e = await kn()?.local?.get(["siteShelfLinks", "logicweaverNavWheelShortcutsV1"]);
      if (!uo) return;
      const t = e?.siteShelfLinks?.length ? e.siteShelfLinks : e?.logicweaverNavWheelShortcutsV1;
      Pn = (Array.isArray(t) ? t : []).map((o, i) => ({
        id: String(o.id || `wheel-${i}`),
        title: String(o.title || o.url || "快捷网站"),
        desc: String(o.url || ""),
        url: String(o.url || ""),
        icon: Kr(o)
      })), Z.mode === "shortcuts" && $o();
    } catch (e) {
      console.warn("[NavWheel] 读取快捷方式失败", e);
    }
  },
  open(e, t) {
    jt(e ?? lt.x, t ?? lt.y);
  },
  close: Pt,
  toggle(e = !1) {
    Z.isExpanded ? Pt() : e ? jt(lt.x, lt.y) : jt();
  },
  toggleTools(e = !0) {
    Z.isExpanded && Z.mode === "tools" ? Pt() : jt(
      e ? lt.x : Z.ballPosition.x,
      e ? lt.y : Z.ballPosition.y,
      "tools"
    );
  },
  setMode(e) {
    Zo(e);
  }
};
class Yt {
  constructor() {
    this.activeShortcuts = { ...cn }, this.isListenerBound = !1, this.storageListenerBound = !1, this.shortcutReadVersion = 0, this.initShortcuts();
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
    const { optionsService: i, SHORTCUT_STORAGE_KEY: r } = await import("./options.service-N98g5mDC.js").then((m) => m.g), h = (await chrome.storage.local.get(r))[r], g = { ...h || {}, [t]: o }, p = this.shortcutReadVersion, x = await i.saveSettings(
      { [r]: g },
      { [r]: h }
    );
    p === this.shortcutReadVersion && (++this.shortcutReadVersion, this.applyShortcutOverrides(x[r]));
  }
  applyShortcutOverrides(t) {
    const o = t && typeof t == "object" && !Array.isArray(t) ? Object.entries(t).filter((i) => Object.prototype.hasOwnProperty.call(cn, i[0]) && typeof i[1] == "string") : [];
    this.activeShortcuts = { ...cn, ...Object.fromEntries(o) };
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
    if (!t || !ei(t)) return !1;
    if (Xe(t))
      return Se.handleToolClick(t), !0;
    switch (t) {
      case "bookmarks":
        return en.toggle(), !0;
      case "settings":
        return tn.open(), !0;
      case "nav-wheel":
        return dt.toggle(!0), !0;
      case "toolbox":
        return dt.toggleTools(!0), !0;
      case "pricing":
        return Et.enter("daily-pricing"), !0;
      case "search": {
        if (typeof document < "u") {
          const o = document.getElementById("search-input");
          if (o)
            return o.focus(), o.select(), !0;
        }
        return !1;
      }
      case "todoist-new-task":
        return typeof window < "u" && typeof window.triggerTodoistQuickAdd == "function" ? window.triggerTodoistQuickAdd() : Se.handleToolClick("todoist"), !0;
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
        if (zn.active || t.defaultPrevented || t.isComposing || t.repeat || t.target && (t.target.matches("input, textarea, select") || t.target.isContentEditable) && !t.altKey && !t.ctrlKey && !t.metaKey)
          return;
        const i = nr(t);
        if (!i) return;
        const r = i.toLowerCase();
        for (const [l, h] of Object.entries(this.activeShortcuts))
          if (!(!h || !ei(l)) && h.toLowerCase().replace(/^cmd\+/, "meta+") === r) {
            t.preventDefault(), t.stopPropagation(), this.triggerToolShortcut(l);
            break;
          }
      },
      !0
    ));
  }
}
const Wn = Yt.getInstance();
class qt {
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
    return qt.instance || (qt.instance = new qt()), qt.instance;
  }
  get isVisible() {
    return Ct(this._isVisible);
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
const Vr = qt.getInstance(), _n = () => window;
let Tt = !1, fo, Cn, go;
function mi(e) {
  return oe.getPageNames().filter((t) => t !== e).map((t) => ({ id: t, name: oe.getPageLabel(t) }));
}
function vi() {
  if (!qe.isOpen || !qe.activeFolder) return;
  const e = oe.getState(), t = qe.activeFolder;
  wt.setLinks(e.links.filter((l) => (l.group || "常用网站") === t));
  const o = /* @__PURE__ */ new Map();
  for (const l of e.links) {
    const h = l.group || "常用网站";
    o.has(h) || o.set(h, []), o.get(h).push(l);
  }
  const i = new Map(Object.keys(e.folders).map((l) => [l, Yo(e.folders, l)])), r = /* @__PURE__ */ new Map();
  for (const l of i.values()) l && r.set(l, (r.get(l) || 0) + 1);
  wt.setFolders([...i].filter(([, l]) => l === t).map(([l]) => ({
    groupName: l,
    links: o.get(l) || [],
    count: (o.get(l)?.length || 0) + (r.get(l) || 0)
  })), Yo(e.folders, t));
}
const On = {
  openEditor(e) {
    _o.openEditDialog(e || {});
  },
  openFolder(e = qe.activeFolder) {
    if (!e) return;
    const o = oe.getState().links.filter((i) => (i.group || "常用网站") === e);
    wt.openFolder(e, o), vi();
  },
  openLinkMenu(e, t) {
    t?.preventDefault?.(), Zt.openLinkMenu(e, mi(e.page || "常用网站"), t?.clientX || 0, t?.clientY || 0);
  },
  openFolderMenu(e, t, o) {
    t?.preventDefault?.();
    const i = oe.getState(), r = o || i.activePage;
    Zt.openFolderMenu(
      e,
      oe.getGroupSize(e) === "small" ? "扩大为大收藏夹" : "缩小为小收藏夹",
      mi(r),
      t?.clientX || 0,
      t?.clientY || 0
    );
  },
  openPageMenu(e, t) {
    t?.preventDefault?.(), Zt.openPageMenu(
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
    _o.openIconPicker(e.title || "网站", t, e.url, String(e.id)), _o.searchIcons(t);
  },
  render() {
    const e = oe.getState(), t = oe.getPageNames();
    $e.update({
      ...e,
      pages: t,
      activePage: t.includes(e.activePage) ? e.activePage : t[0]
    }), vi();
  },
  start() {
    Tt || (Tt = !0, $e.setActions({
      openFolder: (e) => this.openFolder(e),
      deleteFolder: Ys,
      openLinkMenu: (e, t) => this.openLinkMenu(e, t),
      openFolderMenu: (e, t, o) => this.openFolderMenu(e, o, t),
      openPageMenu: (e, t) => this.openPageMenu(e, t)
    }), wt.setActionHandler((e, t) => {
      e === "close" ? wt.closeFolder() : e === "folder:open" && typeof t == "string" ? this.openFolder(t) : e === "link:contextmenu" && t?.link && this.openLinkMenu(t.link, t);
    }), Cn = oe.subscribe(() => {
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
      for (const [r, l] of Object.entries(o)) {
        if (!(r in e)) continue;
        const h = e[r].newValue;
        i[l] = l === "links" ? Array.isArray(h) ? h : [] : l === "pages" ? Array.isArray(h) && h.length ? h : ["常用网站"] : l === "activePage" ? h || "常用网站" : h || {};
      }
      Object.keys(i).length && (oe.updateState(i), this.render());
    }, _n().chrome?.storage?.onChanged?.addListener(go));
  },
  init() {
    return this.start(), fo || (fo = (async () => {
      await oe.ready;
      const e = _n().chrome;
      if (!Tt) return;
      const t = await e?.storage?.local?.get("quickLinksReady") || {};
      if (Tt) {
        if (!oe.getState().links.length && !t.quickLinksReady && e?.topSites) {
          const o = await new Promise((i) => e.topSites.get((r) => i(r || [])));
          if (!Tt) return;
          oe.getState().links.length || (oe.updateState({ links: o.slice(0, 14).map((i) => ({
            id: crypto.randomUUID(),
            title: i.title || oe.hostOf(i.url),
            url: i.url,
            group: "常用网站"
          })) }), await oe.save());
        }
        Tt && this.render();
      }
    })().catch((e) => {
      throw fo = void 0, e;
    }), fo);
  },
  stop() {
    Tt = !1, Cn?.(), Cn = void 0, go && _n().chrome?.storage?.onChanged?.removeListener(go), go = void 0, wt.setActionHandler(null), $e.setActions({
      openFolder: void 0,
      deleteFolder: void 0,
      openLinkMenu: void 0,
      openFolderMenu: void 0,
      openPageMenu: void 0
    });
  }
}, yi = [
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
function Oo(e) {
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
    if (!i) return yi.slice(0, o);
    const r = [];
    for (const l of yi) {
      const h = l.name.toLowerCase(), g = l.pinyin.toLowerCase(), p = l.admin.toLowerCase();
      if ((h.startsWith(i) || g.startsWith(i) || h.includes(i) || g.includes(i) || p.includes(i)) && r.push(l), r.length >= o) break;
    }
    return r;
  }
  async loadWeather(t) {
    const o = (t || this.currentCity || "").trim();
    if (!o) {
      ot.unconfigured();
      return;
    }
    if (this.isRefreshing) return;
    this.isRefreshing = !0;
    const i = ++this.activeRequestId;
    ot.loading(o);
    try {
      const r = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(o)}&count=1&language=zh&format=json`, l = await fetch(r);
      if (i !== this.activeRequestId || z.state === "unconfigured") {
        this.isRefreshing = !1;
        return;
      }
      const g = (await l.json()).results?.[0];
      if (!g) {
        i === this.activeRequestId && z.state !== "unconfigured" && ot.notFound(o), this.isRefreshing = !1;
        return;
      }
      const p = `https://api.open-meteo.com/v1/forecast?latitude=${g.latitude}&longitude=${g.longitude}&current=temperature_2m,weather_code,relative_humidity_2m,wind_speed_10m&hourly=temperature_2m,weather_code,precipitation_probability&daily=temperature_2m_max,temperature_2m_min,weather_code,precipitation_probability_max&forecast_days=7&timezone=auto`, x = await fetch(p);
      if (i !== this.activeRequestId || z.state === "unconfigured") {
        this.isRefreshing = !1;
        return;
      }
      const m = await x.json(), S = Oo(m.current?.weather_code ?? 0), f = Math.round(m.current?.temperature_2m ?? 0), u = m.hourly?.time || [], d = Date.now();
      let k = u.findIndex((y) => new Date(y).getTime() >= d);
      k < 0 && (k = 0);
      const $ = [];
      for (let y = k; y < Math.min(k + 5, u.length); y++) {
        const _ = y === k ? "现在" : new Date(u[y]).getHours() + "时", O = Oo(m.hourly.weather_code[y]), U = Math.round(m.hourly.temperature_2m[y]);
        $.push({ time: _, emoji: O.emoji, temp: U });
      }
      let w = "未来 12 小时暂无降水 ☂️";
      for (let y = k; y < Math.min(k + 12, u.length); y++) {
        const _ = m.hourly.weather_code[y], O = m.hourly.precipitation_probability?.[y] || 0;
        if (_ >= 51 || O >= 60) {
          const U = new Date(u[y]).getHours(), E = _ >= 71 && _ <= 77 || _ === 85 || _ === 86;
          w = `预计 ${U}:00 ${E ? "有雪" : "有雨"}${O ? `（${O}%）` : ""} 🌧️`;
          break;
        }
      }
      const L = ["今天", "明天", "后天"], A = [], ne = m.daily?.time?.length || 0;
      for (let y = 1; y < Math.min(3, ne); y++) {
        const _ = L[y] || `+${y}天`, O = Oo(m.daily.weather_code[y]), U = `${Math.round(m.daily.temperature_2m_max[y])}°/${Math.round(m.daily.temperature_2m_min[y])}°`;
        A.push({ label: _, emoji: O.emoji, tempRange: U });
      }
      const B = `${S.label} · 最高 ${Math.round(m.daily?.temperature_2m_max?.[0] ?? f)}° / 最低 ${Math.round(m.daily?.temperature_2m_min?.[0] ?? f)}°`, D = {
        cityName: g.name || o,
        currentEmoji: S.emoji,
        currentTemp: f,
        subText: B,
        rainText: w,
        hours: $,
        days: A
      };
      if (i === this.activeRequestId && z.state !== "unconfigured") {
        if (ot.ready(D, o), m.daily?.time) {
          const _ = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"], O = [];
          for (let U = 0; U < m.daily.time.length; U++) {
            const E = new Date(m.daily.time[U]), j = U === 0 ? "今天" : U === 1 ? "明天" : U === 2 ? "后天" : _[E.getDay()], R = Oo(m.daily.weather_code[U]);
            O.push({
              date: `${E.getMonth() + 1}/${E.getDate()}`,
              dayName: j,
              emoji: R.emoji,
              condition: R.label,
              highTemp: Math.round(m.daily.temperature_2m_max[U]),
              lowTemp: Math.round(m.daily.temperature_2m_min[U]),
              rainProb: m.daily.precipitation_probability_max?.[U] || 0
            });
          }
          ot.setForecastDays(O);
        }
        const y = {
          humidity: m.current?.relative_humidity_2m ? `${m.current.relative_humidity_2m}%` : "60%",
          wind: m.current?.wind_speed_10m ? `${Math.round(m.current.wind_speed_10m)} km/h` : "微风",
          uvIndex: "正常",
          airQuality: "优良"
        };
        ot.setDetailInfo(y);
      }
    } catch (r) {
      i === this.activeRequestId && z.state !== "unconfigured" && ot.error(r?.message || "天气加载失败，右键此处可重新选择地点。", o);
    } finally {
      i === this.activeRequestId && (this.isRefreshing = !1);
    }
  }
}
const yo = Xt.getInstance();
function Ur(e, t) {
  window.LogicWeaverIntro = rt, window.LogicWeaverStartupIntro = rt, window.LogicWeaverNotifications = Ae, window.LogicWeaverWindowManager = Se, window.LogicWeaverWindowTabs = Se, window.LogicWeaverDomFreezer = ir, window.LogicWeaverWallpaperService = Uo, window.LogicWeaverLauncherService = oe, window.LogicWeaverLauncherRuntime = On, window.LogicWeaverProfileService = ai;
  try {
    ai.init();
  } catch (o) {
    console.error("[ProfileService] init failed:", o);
  }
  window.LogicWeaverBookmarksService = Nn, window.LogicWeaverCalendarService = qs, window.LogicWeaverWeather = ot, window.LogicWeaverWeatherService = yo, window.LogicWeaverClock = Ut, window.LogicWeaverSearch = js, window.LogicWeaverSearchService = zs, Object.defineProperty(window, "LogicWeaverAiHotService", {
    configurable: !0,
    get: () => {
      import("./aihot.service-l4gGelhr.js").then(({ aiHotService: o }) => {
        window.LogicWeaverAiHotService = o;
      });
    }
  }), window.LogicWeaverHomeMusic = Ke, window.LogicWeaverLauncherGroups = $e, window.LogicWeaverProfileMenu = To, window.LogicWeaverWorkspaceLaunchers = Kn, window.LogicWeaverMacDock = ct, window.LogicWeaverFullscreen = Et, window.enterFullscreenCard = (o) => Et.enter(o), window.exitFullscreenCard = () => Et.exit(), window.cycleFullscreenCard = () => Et.cycle(), window.LogicWeaverPageVisibility = Vr, window.LogicWeaverBackgroundLibrary = ni, window.LogicWeaverNotificationCenter = _t, window.LogicWeaverBookmarkMenu = Hn, window.LogicWeaverBookmarkPanel = en, window.LogicWeaverBookmarkFolderStrip = qo, window.LogicWeaverLauncherDialogs = _o, window.LogicWeaverLauncherFolder = wt, window.LogicWeaverLauncherMenus = Zt, window.LogicWeaverSettings = tn, window.LogicWeaverClockSettings = At, window.LogicWeaverBiliTheater = Co, window.LogicWeaverBilibiliService = Jn, window.getBiliJct = () => Jn.getBiliJct(), window.LogicWeaverBiliMiniPlayer = Zn, window.openBiliMiniPlayer = (o) => Zn.openVideo(o), window.LogicWeaverAiDialog = Vn, window.LogicWeaverAihotViewer = Gn, window.LogicWeaverNavWheel = Ce, window.openNavWheel = (o, i) => dt.open(o, i), window.closeNavWheel = () => dt.close(), window.toggleNavWheel = (o) => dt.toggle(o), window.toggleToolWheel = (o) => dt.toggleTools(o), window.setNavWheelMode = (o) => dt.setMode(o), window.LogicWeaverShortcuts = Wn, window.triggerToolShortcut = (o) => Wn.triggerToolShortcut(o), window.LogicWeaverCommands = e, window.LogicWeaverFeatures = t, window.LogicWeaverCalendarView = Xs, window.LogicWeaverGitHubStatus = jn, window.LogicWeaverGitHubFolders = Mt, window.LogicWeaverGitHubHero = wo, window.LogicWeaverGitHubRepositories = yt, window.LogicWeaverGitHubBatchBar = ko, window.LogicWeaverTodoistLabels = Js, window.LogicWeaverTodoistWorkspace = Zs, window.LogicWeaverTodoistCalendarSidebar = Qs, window.LogicWeaverTodoistTaskList = er, window.LogicWeaverBiliMessagePanel = Dt, window.LogicWeaverStickerBoard = lr, window.LogicWeaverStickersService = cr, window.LogicWeaverPricing = Bi, window.LogicWeaverBiliFavorites = Wi, window.LogicWeaverBiliRadioTape = fr, window.LogicWeaverBiliOrganizerDialogs = dr, window.LogicWeaverBiliUpGroupManager = ur, window.LogicWeaverBiliUpPreview = Go, window.LogicWeaverYouTube = Ei, window.LogicWeaverAihotFeed = Oi, window.LogicWeaverGitHubTrending = Ki, window.LogicWeaverCalendarWorkspace = Vt, window.LogicWeaverCalendar = Vt, window.LogicWeaverTodoistMainWorkspace = tr, window.LogicWeaverTodoistTaskDetail = Or, window.openBiliTheater = (o) => Co.openVideo(o), window.closeBiliTheater = () => Co.close(), window.showWindowsToast = (o) => {
    if (!o) return null;
    const i = ln(o.target) || Qn(o.url) || (o.appType === "bili" ? Ds([o.title, o.subtitle, o.message].filter((r) => typeof r == "string").join(" ")) : void 0);
    return Ae.show({
      ...o,
      target: i,
      onClick: () => {
        if (typeof o?.onClick == "function") return o.onClick();
        if (i) return _t.openTarget(i);
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
    const l = typeof i == "object" && i ? i : r, h = typeof i == "number" ? i : 3200, g = l.isError || /失败|错误|异常|未获取|未找到/i.test(o), p = l.title || (g ? "B站操作未完成" : "哔哩哔哩"), x = l.subtitle || (o.length > 36 ? "" : o), m = l.message || (l.subtitle || o.length > 36 ? o : ""), S = {
      id: l.id || `bili_toast_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      appType: "bili",
      appName: "哔哩哔哩",
      icon: "assets/bilibili.svg",
      title: p,
      subtitle: x || o,
      message: m && m !== x ? m : "",
      showActions: !!(l.showActions || l.actionLabel),
      actionLabel: l.actionLabel || "",
      onClick: l.onClick || null,
      target: ln(l.target) || Qn(l.url) || ln({ type: "bili-video", bvid: l.bvid, aid: l.aid ? String(l.aid) : void 0 }),
      url: l.url,
      duration: Math.max(3e3, h)
    };
    return window.showWindowsToast(S);
  }, window.showFetchToast = (o, i, r = "", l = "assets/logo.png", h = 3200) => window.showWindowsToast({
    appName: o,
    title: i,
    subtitle: r,
    icon: l || "assets/logo.png",
    duration: h,
    showActions: !1,
    actionLabel: "",
    appType: "fetch"
  }), window.LogicWeaverKineticDrag = mr, window.LogicWeaverMarkdownAst = vr, window.setLauncherBackground = (o) => Uo.setWallpaper(o), window.backgroundDbClear = (o) => Es(o), window.openBackgroundHistory = () => ni.openDialog();
}
const Ee = we({
  isOpen: !1,
  query: "",
  selectedIndex: 0
});
let Bo = null;
const qi = {
  get state() {
    return Ee;
  },
  open() {
    Ee.isOpen || (Ee.isOpen = !0, Ee.query = "", Ee.selectedIndex = 0, Bo = Se.pushModalCloser(() => (this.close(), !0)));
  },
  close() {
    Ee.isOpen && (Ee.isOpen = !1, Ee.query = "", Ee.selectedIndex = 0, Bo && (Bo(), Bo = null));
  },
  toggle() {
    Ee.isOpen ? this.close() : this.open();
  },
  setQuery(e) {
    Ee.query = e, Ee.selectedIndex = 0;
  },
  selectNext(e) {
    e <= 0 || (Ee.selectedIndex = (Ee.selectedIndex + 1) % e);
  },
  selectPrev(e) {
    e <= 0 || (Ee.selectedIndex = (Ee.selectedIndex - 1 + e) % e);
  },
  async executeCommand(e) {
    this.close();
    try {
      await on.execute(e.id, void 0, "command-palette");
    } catch (t) {
      console.warn(`[CommandPalette] Failed to execute ${e.id}:`, t);
    }
  }
};
typeof window < "u" && window.addEventListener("keydown", (e) => {
  if (zn.active || e.defaultPrevented || e.isComposing || e.repeat) return;
  const t = (e.key || "").toLowerCase(), o = (e.ctrlKey || e.metaKey) && t === "k", i = e.altKey && (e.code === "Space" || t === " ");
  (o || i) && (e.preventDefault(), e.stopPropagation(), qi.toggle());
}, !0);
function Yr(e) {
  e.register({
    id: "palette.toggle",
    title: "打开全局命令中心 (Spotlight)",
    category: "界面",
    keywords: ["命令", "palette", "spotlight", "raycast", "搜索", "cmd"],
    concurrency: "drop",
    run: () => qi.toggle()
  }), e.register({
    id: "intro.skip",
    title: "跳过开屏动画",
    category: "界面",
    keywords: ["开屏", "启动", "skip"],
    concurrency: "drop",
    enabled: () => rt.enabled && !rt.finished,
    run: () => rt.skip("COMMAND SKIP")
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
    enabled: () => Vt.ready,
    run: () => Vt.refresh()
  }), e.register({
    id: "calendar.today",
    title: "日历跳转到今天",
    category: "日历",
    keywords: ["今日", "today", "日期"],
    concurrency: "drop",
    enabled: () => Vt.ready,
    run: () => Vt.goToday()
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
const qr = {
  key: 0,
  id: "guest-preview-banner",
  class: "guest-preview-banner",
  role: "alert",
  "aria-label": "新用户开箱视角预览提示"
}, Xr = /* @__PURE__ */ de({
  __name: "GuestPreviewBanner",
  setup(e) {
    function t() {
      Ps.exit();
    }
    return (o, i) => (a(), ce(Ts, { name: "guest-banner-slide" }, {
      default: Qt(() => [
        s(As) ? (a(), c("aside", qr, [
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
}), Jr = /* @__PURE__ */ Te(Xr, [["__scopeId", "data-v-a2f2ca5f"]]), Zr = ["hidden"], Qr = {
  key: 0,
  class: "bookmark-folder-strip-empty"
}, ea = ["title", "data-bookmark-folder-id", "onClick", "onContextmenu"], ta = /* @__PURE__ */ de({
  __name: "BookmarkFolderStrip",
  setup(e) {
    const t = N(null);
    function o(l) {
      const h = t.value;
      !h || h.scrollWidth <= h.clientWidth || !l.deltaY || (l.preventDefault(), h.scrollLeft += l.deltaY);
    }
    function i(l) {
      qo.openFolder(l.id);
    }
    function r(l, h) {
      qo.openContextMenu(h, l.clientX, l.clientY);
    }
    return (l, h) => (a(), c("nav", {
      id: "bookmark-folder-strip",
      ref_key: "stripRef",
      ref: t,
      class: "bookmark-folder-strip",
      "aria-label": "书签栏文件夹",
      hidden: !s(Kt).enabled,
      onWheel: o
    }, [
      s(Kt).folders.length ? M("", !0) : (a(), c("span", Qr, b(s(Kt).emptyMessage || "书签栏没有文件夹"), 1)),
      (a(!0), c(K, null, ge(s(Kt).folders, (g) => (a(), c("button", {
        key: g.id,
        class: "bookmark-folder-chip",
        type: "button",
        title: `打开书签文件夹：${g.title || "未命名"}`,
        "data-bookmark-folder-id": g.id,
        onClick: (p) => i(g),
        onContextmenu: F((p) => r(p, g), ["prevent"])
      }, [
        h[0] || (h[0] = n("span", { "aria-hidden": "true" }, "📁", -1)),
        n("span", null, b(g.title || "未命名"), 1)
      ], 40, ea))), 128))
    ], 40, Zr));
  }
}), oa = /* @__PURE__ */ Te(ta, [["__scopeId", "data-v-5e71cc7c"]]), na = { class: "cube-manager-body" }, ia = ["disabled", "onClick"], sa = ["disabled", "onClick"], ra = ["onClick"], aa = ["onClick"], la = ["onClick"], ca = ["type", "placeholder"], da = {
  key: 0,
  role: "alert"
}, ua = /* @__PURE__ */ de({
  __name: "CubeConfigDialog",
  setup(e) {
    const t = Ie.state, o = ae(() => Ie.getActiveFaces()), i = ae(() => t.registeredFaces.filter((f) => !t.activeFaceIds.includes(f.id))), r = N(""), l = N("memo"), h = N(""), g = N(!1), p = N(JSON.stringify({ title: "每日一句", icon: "📝", customType: "memo", customData: { text: "今天也要记得休息" } }, null, 2)), x = N("");
    function m(f) {
      x.value = "";
      try {
        f();
      } catch (u) {
        x.value = u instanceof Error ? u.message : "操作失败";
      }
    }
    function S() {
      m(() => {
        const f = g.value ? JSON.parse(p.value) : {
          title: r.value,
          customType: l.value,
          customData: { text: h.value, targetDate: h.value, url: h.value }
        };
        Ie.addCustomFace(f), r.value = "", h.value = "";
      });
    }
    return (f, u) => (a(), ce(gt, { to: "body" }, [
      s(t).isConfigDialogOpen ? (a(), c("section", {
        key: 0,
        class: "cube-manager",
        role: "dialog",
        "aria-label": "管理立方体面",
        onKeydown: u[7] || (u[7] = Wt(F((d) => s(Ie).closeConfigDialog(), ["stop"]), ["esc"]))
      }, [
        n("header", null, [
          u[8] || (u[8] = n("strong", null, "管理立方体面", -1)),
          n("button", {
            type: "button",
            "aria-label": "关闭",
            onClick: u[0] || (u[0] = (d) => s(Ie).closeConfigDialog())
          }, "×")
        ]),
        n("div", na, [
          u[16] || (u[16] = n("p", null, "默认只有音乐。可以删除所有面，空位仍可添加。", -1)),
          (a(!0), c(K, null, ge(o.value, (d, k) => (a(), c("div", {
            key: d.id,
            class: "cube-row"
          }, [
            n("span", null, b(d.icon) + " " + b(d.title), 1),
            n("button", {
              type: "button",
              disabled: k === 0,
              onClick: ($) => m(() => s(Ie).moveUp(d.id)),
              title: "上移"
            }, "↑", 8, ia),
            n("button", {
              type: "button",
              disabled: k === o.value.length - 1,
              onClick: ($) => m(() => s(Ie).moveDown(d.id)),
              title: "下移"
            }, "↓", 8, sa),
            n("button", {
              type: "button",
              onClick: ($) => m(() => s(Ie).removeCustomFace(d.id))
            }, "删除面", 8, ra)
          ]))), 128)),
          (a(!0), c(K, null, ge(i.value, (d) => (a(), c("div", {
            key: d.id,
            class: "cube-row"
          }, [
            n("span", null, b(d.title) + "（未启用）", 1),
            n("button", {
              type: "button",
              onClick: (k) => m(() => s(Ie).toggleActive(d.id, !0))
            }, "添加", 8, aa),
            d.builtIn ? M("", !0) : (a(), c("button", {
              key: 0,
              type: "button",
              onClick: (k) => m(() => s(Ie).removeCustomFace(d.id))
            }, "删除", 8, la))
          ]))), 128)),
          u[17] || (u[17] = n("h3", null, "添加面", -1)),
          n("label", null, [
            Oe(n("input", {
              "onUpdate:modelValue": u[1] || (u[1] = (d) => g.value = d),
              type: "checkbox"
            }, null, 512), [
              [Ss, g.value]
            ]),
            u[9] || (u[9] = Be(" 粘贴 JSON 配置", -1))
          ]),
          n("form", {
            onSubmit: F(S, ["prevent"])
          }, [
            g.value ? (a(), c(K, { key: 1 }, [
              u[14] || (u[14] = n("p", null, "仅支持文本、倒数日和链接配置，不执行 JavaScript / HTML。开发者动态注册说明见 SDK 文档。", -1)),
              Oe(n("textarea", {
                "onUpdate:modelValue": u[5] || (u[5] = (d) => p.value = d),
                rows: "9",
                maxlength: "10000",
                "aria-label": "面的 JSON 配置",
                spellcheck: "false"
              }, null, 512), [
                [eo, p.value]
              ])
            ], 64)) : (a(), c(K, { key: 0 }, [
              n("label", null, [
                u[10] || (u[10] = Be("标题", -1)),
                Oe(n("input", {
                  "onUpdate:modelValue": u[2] || (u[2] = (d) => r.value = d),
                  maxlength: "60",
                  required: ""
                }, null, 512), [
                  [eo, r.value]
                ])
              ]),
              n("label", null, [
                u[12] || (u[12] = Be("类型", -1)),
                Oe(n("select", {
                  "onUpdate:modelValue": u[3] || (u[3] = (d) => l.value = d)
                }, [...u[11] || (u[11] = [
                  n("option", { value: "memo" }, "文本", -1),
                  n("option", { value: "countdown" }, "倒数日", -1),
                  n("option", { value: "link" }, "链接", -1)
                ])], 512), [
                  [Ti, l.value]
                ])
              ]),
              n("label", null, [
                u[13] || (u[13] = Be("内容", -1)),
                Oe(n("input", {
                  "onUpdate:modelValue": u[4] || (u[4] = (d) => h.value = d),
                  type: l.value === "countdown" ? "date" : "text",
                  placeholder: l.value === "link" ? "https://…" : "输入内容",
                  maxlength: "500",
                  required: ""
                }, null, 8, ca), [
                  [Is, h.value]
                ])
              ])
            ], 64)),
            u[15] || (u[15] = n("button", { type: "submit" }, "添加面", -1))
          ], 32),
          x.value ? (a(), c("p", da, b(x.value), 1)) : M("", !0)
        ]),
        n("footer", null, [
          n("button", {
            type: "button",
            onClick: u[6] || (u[6] = (d) => m(() => s(Ie).resetDefaults()))
          }, "恢复默认（仅音乐）"),
          u[18] || (u[18] = n("small", null, "自定义配置保留，但退出轮播", -1))
        ])
      ], 32)) : M("", !0)
    ]));
  }
}), pa = /* @__PURE__ */ Te(ua, [["__scopeId", "data-v-15dd5487"]]), fa = ["data-face"], ga = { class: "ms-top-side" }, ha = {
  key: 0,
  class: "ms-top-meta"
}, ma = {
  class: "ms-top-title",
  style: { color: "#10b981", "font-weight": "700" }
}, va = { class: "ms-top-artist" }, ya = { class: "ms-top-meta" }, ba = ["title"], wa = ["title"], ka = {
  key: 0,
  class: "ms-top-divider"
}, _a = ["title"], Ca = { class: "ms-top-mini-progress" }, xa = { class: "ms-top-side" }, La = ["aria-label"], $a = ["title"], Ta = { class: "ms-cube-custom-icon" }, Sa = { class: "ms-cube-custom-title" }, Ia = ["title"], Ma = {
  key: 1,
  class: "ms-cube-custom-text countdown"
}, Da = ["href"], Ea = {
  class: "ms-cube-dots",
  "aria-hidden": "true"
}, Aa = ["title", "onClick"], Pa = { class: "ms-cube-cm-header" }, Wa = { class: "ms-cube-cm-list" }, Oa = ["onClick"], Ba = { class: "ms-cube-cm-icon" }, Ra = { class: "ms-cube-cm-title" }, Fa = {
  key: 0,
  class: "ms-cube-cm-check"
}, Na = /* @__PURE__ */ de({
  __name: "TopInfoCube",
  props: {
    active: { type: Boolean, default: !0 }
  },
  setup(e) {
    const t = e, o = ae(() => Mi.visible || it.djModalOpen || it.isActive && it.isJoined), i = ae(() => it.isActive && it.isJoined), r = ae(() => Ie.getActiveFaces()), l = N("music"), h = N(0);
    let g = !1, p;
    Ve(
      () => r.value,
      (W) => {
        W.some((P) => P.id === l.value) || (l.value = W[0]?.id || "");
      },
      { immediate: !0 }
    );
    const x = ae(() => r.value.filter((W) => !W.builtIn)), m = N(!1), S = N({ x: 0, y: 0 });
    Ve(() => t.active, (W) => {
      W || (m.value = !1, Ie.closeConfigDialog(), clearTimeout(p), g = !1);
    }, { immediate: !0 });
    const { menuRef: f, style: u } = Pi({
      visible: () => m.value,
      anchor: () => S.value,
      dismiss: () => {
        m.value = !1;
      }
    });
    function d(W) {
      W.preventDefault(), W.stopPropagation(), S.value = { x: W.clientX, y: W.clientY }, m.value = !0;
    }
    function k(W) {
      O(W), m.value = !1;
    }
    function $() {
      m.value = !1, Ie.openConfigDialog();
    }
    function w() {
      m.value = !1, L(() => Ie.resetDefaults()), O("music");
    }
    function L(W) {
      m.value = !1;
      try {
        W();
      } catch (P) {
        Ae.show({ appName: "滚动立方体", title: "保存失败", message: P instanceof Error ? P.message : "请检查浏览器存储" });
      }
    }
    function A(W) {
      if (!W) return "未设置目标日";
      const H = new Date(W).getTime() - y.value, pe = Math.ceil(H / (1e3 * 60 * 60 * 24));
      return pe > 0 ? `还剩 ${pe} 天` : pe === 0 ? "就是今天！" : `已过去 ${Math.abs(pe)} 天`;
    }
    const ne = ae(() => Y.isBiliRadio ? "B站电台" : Y.isNetease ? "网易云" : Y.playing ? "塞壬" : "待机"), B = ae(() => Y.currentLyric ? Y.currentLyric : Y.playing ? "♪ 伴奏播放中…" : "选择塞壬歌曲、网易云或B站电台后在这里显示歌词");
    function D() {
      Se.handleToolClick("music");
    }
    const y = N(Date.now());
    let _;
    Ve(() => t.active && r.value.some((W) => W.id === l.value && W.customType === "countdown"), (W) => {
      W && (y.value = Date.now()), clearInterval(_), _ = W ? window.setInterval(() => {
        document.hidden || (y.value = Date.now());
      }, 6e4) : void 0;
    }, { immediate: !0 });
    function O(W, P = null) {
      const H = r.value, pe = H.find((xe) => xe.id === W) || H[0];
      if (pe) {
        if (Number.isFinite(P))
          h.value = P;
        else if (pe.id !== l.value) {
          const xe = H.findIndex((Ue) => Ue.id === l.value);
          let Le = (H.findIndex((Ue) => Ue.id === pe.id) - xe + H.length) % H.length;
          Le > H.length / 2 && (Le -= H.length), h.value += Le * 90;
        }
        l.value = pe.id;
      }
    }
    function U(W) {
      const P = r.value;
      if (P.length <= 1) return;
      const H = P.findIndex((Le) => Le.id === l.value), xe = ((H >= 0 ? H : 0) + W + P.length) % P.length, je = P[xe];
      je && O(je.id, h.value + W * 90);
    }
    function E(W) {
      r.value.length <= 1 || W.altKey || Math.abs(W.deltaY) < 2 || (W.preventDefault(), !g && (g = !0, U(W.deltaY > 0 ? 1 : -1), p = setTimeout(() => {
        g = !1;
      }, 420)));
    }
    function j(W) {
      !["ArrowUp", "ArrowDown", "PageUp", "PageDown"].includes(W.key) || W.target?.closest?.("input") || (W.preventDefault(), U(["ArrowDown", "PageDown"].includes(W.key) ? 1 : -1));
    }
    function R(W, P) {
      return l.value === W ? {
        transform: `rotateX(${-h.value}deg) translateZ(22px)`,
        visibility: "visible"
      } : {
        transform: `rotateX(-${P}deg) translateZ(22px)`,
        visibility: "hidden"
      };
    }
    function q(W) {
      const P = W.target;
      P && (P.tagName === "INPUT" || P.tagName === "TEXTAREA" || P.isContentEditable) || (W.preventDefault(), W.stopPropagation());
    }
    function ye(W) {
      const P = W.target;
      P && (P.tagName === "INPUT" || P.tagName === "TEXTAREA" || P.isContentEditable) || W.preventDefault();
    }
    return xt(() => {
      clearInterval(_), clearTimeout(p);
    }), (W, P) => Oe((a(), c("div", {
      class: "ms-top-player",
      "data-face": l.value,
      tabindex: "0",
      title: "滚动立方体 · 滚轮切换面板，右键可自由增删与排序",
      "aria-label": "滚动立方体",
      onWheel: E,
      onKeydown: j,
      onContextmenu: d,
      onCopy: q,
      onSelectstart: ye
    }, [
      r.value.length ? M("", !0) : (a(), c("button", {
        key: 0,
        type: "button",
        class: "ms-cube-cm-action",
        onClick: $
      }, "＋ 添加面（右键管理）")),
      n("div", {
        class: "ms-top-cube",
        style: ve({ transform: `translateZ(-22px) rotateX(${h.value}deg)` })
      }, [
        s(Ie).isActive("music") && l.value === "music" ? (a(), c("section", {
          key: 0,
          class: "ms-top-face ms-top-face-music",
          "aria-label": "音乐歌词面",
          style: ve(R("music", 0))
        }, [
          n("div", ga, [
            n("button", {
              class: "ms-top-prev",
              title: "上一首",
              type: "button",
              onClick: P[0] || (P[0] = F((H) => s(Ke).prev(), ["stop"]))
            }, "⏮"),
            n("button", {
              class: "ms-top-play",
              title: "播放/暂停",
              type: "button",
              onClick: P[1] || (P[1] = F((H) => s(Ke).togglePlay(), ["stop"]))
            }, b(s(Y).playing ? "⏸" : "▶"), 1)
          ]),
          n("button", {
            class: "ms-top-main",
            title: "打开音乐播放器",
            type: "button",
            onClick: F(D, ["stop"])
          }, [
            o.value ? (a(), c("div", ha, [
              n("span", ma, " 🎧 " + b(i.value ? "正在一起听" : "正在收听") + "：" + b(s(Y).title || "待机中"), 1),
              n("span", va, b(s(Y).artist), 1)
            ])) : (a(), c(K, { key: 1 }, [
              n("div", ya, [
                n("span", {
                  class: "ms-top-title",
                  title: s(Y).title || "音乐播放器"
                }, b(s(Y).title || "音乐播放器"), 9, ba),
                n("span", {
                  class: "ms-top-artist",
                  title: s(Y).artist || "待机中"
                }, b(s(Y).artist || "待机中"), 9, wa),
                n("span", {
                  class: le(["ms-top-source", { idle: !s(Y).playing }])
                }, b(ne.value), 3),
                B.value ? (a(), c("span", ka)) : M("", !0)
              ]),
              B.value ? (a(), c("span", {
                key: 0,
                class: "ms-top-lyric",
                title: B.value
              }, b(B.value), 9, _a)) : M("", !0)
            ], 64)),
            n("div", Ca, [
              n("div", {
                class: "ms-top-mini-fill",
                style: ve({ width: s(Y).progressPercent + "%" })
              }, null, 4)
            ])
          ]),
          n("div", xa, [
            n("button", {
              class: "ms-top-next",
              title: "下一首",
              type: "button",
              onClick: P[2] || (P[2] = F((H) => s(Ke).next(), ["stop"]))
            }, "⏭"),
            n("button", {
              class: "ms-top-open",
              title: "打开歌单",
              type: "button",
              onClick: F(D, ["stop"])
            }, "🎵")
          ])
        ], 4)) : M("", !0),
        (a(!0), c(K, null, ge(x.value, (H, pe) => (a(), c("section", {
          key: H.id,
          class: "ms-top-face ms-top-face-custom",
          "aria-label": H.title,
          style: ve(R(H.id, (pe + 1) * 90))
        }, [
          l.value === H.id ? (a(), c("div", {
            key: 0,
            class: "ms-cube-custom-body",
            title: H.desc
          }, [
            n("span", Ta, b(H.icon), 1),
            n("strong", Sa, b(H.title), 1),
            P[10] || (P[10] = n("span", { class: "ms-cube-divider" }, null, -1)),
            H.customType === "memo" ? (a(), c("span", {
              key: 0,
              class: "ms-cube-custom-text",
              title: H.customData?.text
            }, b(H.customData?.text || "（点击右键配置便签内容）"), 9, Ia)) : H.customType === "countdown" ? (a(), c("span", Ma, b(A(H.customData?.targetDate)), 1)) : H.customType === "link" ? (a(), c("a", {
              key: 2,
              href: H.customData?.url,
              target: "_blank",
              rel: "noreferrer",
              class: "ms-cube-custom-link",
              onClick: P[3] || (P[3] = F(() => {
              }, ["stop"]))
            }, b(H.customData?.url) + " ↗ ", 9, Da)) : M("", !0)
          ], 8, $a)) : M("", !0),
          n("button", {
            type: "button",
            class: "ms-cube-config-trigger",
            title: "管理立方体面",
            onClick: P[4] || (P[4] = F((xe) => s(Ie).openConfigDialog(), ["stop"]))
          }, " ⚙ ")
        ], 12, La))), 128))
      ], 4),
      n("div", Ea, [
        (a(!0), c(K, null, ge(r.value, (H) => (a(), c("i", {
          key: H.id,
          class: le({ on: l.value === H.id }),
          title: H.title,
          onClick: F((pe) => O(H.id), ["stop"])
        }, null, 10, Aa))), 128))
      ]),
      (a(), ce(gt, { to: "body" }, [
        t.active && m.value ? (a(), c("div", {
          key: 0,
          ref_key: "menuRef",
          ref: f,
          class: "ms-cube-context-menu",
          style: ve(s(u)),
          onClick: P[9] || (P[9] = F(() => {
          }, ["stop"]))
        }, [
          n("div", Pa, [
            P[11] || (P[11] = n("span", null, "🎲 滚动立方体面", -1)),
            n("button", {
              type: "button",
              class: "ms-cube-cm-close",
              onClick: P[5] || (P[5] = (H) => m.value = !1)
            }, "×")
          ]),
          n("div", Wa, [
            (a(!0), c(K, null, ge(r.value, (H) => (a(), c("button", {
              key: H.id,
              type: "button",
              class: le(["ms-cube-cm-item", { active: l.value === H.id }]),
              onClick: (pe) => k(H.id)
            }, [
              n("span", Ba, b(H.icon), 1),
              n("span", Ra, b(H.title), 1),
              l.value === H.id ? (a(), c("span", Fa, "✓")) : M("", !0)
            ], 10, Oa))), 128))
          ]),
          P[16] || (P[16] = n("div", { class: "ms-cube-cm-divider" }, null, -1)),
          n("button", {
            type: "button",
            class: "ms-cube-cm-action",
            onClick: $
          }, [...P[12] || (P[12] = [
            n("span", null, "＋ 添加面 / 管理面", -1)
          ])]),
          n("button", {
            type: "button",
            class: "ms-cube-cm-action",
            onClick: P[6] || (P[6] = (H) => {
              U(-1), m.value = !1;
            })
          }, [...P[13] || (P[13] = [
            n("span", null, "⏮ 上一个面板", -1)
          ])]),
          n("button", {
            type: "button",
            class: "ms-cube-cm-action",
            onClick: P[7] || (P[7] = (H) => {
              U(1), m.value = !1;
            })
          }, [...P[14] || (P[14] = [
            n("span", null, "⏭ 下一个面板", -1)
          ])]),
          l.value ? (a(), c("button", {
            key: 0,
            type: "button",
            class: "ms-cube-cm-action danger",
            onClick: P[8] || (P[8] = (H) => L(() => s(Ie).removeCustomFace(l.value)))
          }, "删除当前面")) : M("", !0),
          n("button", {
            type: "button",
            class: "ms-cube-cm-action danger",
            onClick: w
          }, [...P[15] || (P[15] = [
            n("span", null, "↺ 恢复默认（仅音乐）", -1)
          ])])
        ], 4)) : M("", !0)
      ])),
      t.active ? (a(), ce(pa, { key: 1 })) : M("", !0)
    ], 40, fa)), [
      [to, t.active]
    ]);
  }
}), Ha = /* @__PURE__ */ Te(Na, [["__scopeId", "data-v-c3454bdf"]]), bo = we({
  isOpen: !1
}), Xi = {
  open() {
    bo.isOpen = !0;
  },
  close() {
    bo.isOpen = !1;
  },
  toggle() {
    bo.isOpen = !bo.isOpen;
  }
}, Bn = Ct(bo);
function ja() {
  if (typeof chrome > "u" || !chrome.runtime?.onMessage) return () => {
  };
  let e = !1, t;
  const o = (i, r, l) => {
    r.id !== chrome.runtime.id || i?.type !== "TOGGLE_SIDE_DRAWER" || t === void 0 || i.targetTabId !== t || (Xi.toggle(), l({ ok: !0 }));
  };
  return chrome.tabs.getCurrent().then((i) => {
    e || (t = i?.id, chrome.runtime.onMessage.addListener(o));
  }).catch(() => console.warn("[SideDrawer] Could not bind the home-page command.")), () => {
    e = !0, chrome.runtime.onMessage.removeListener(o);
  };
}
const za = { class: "tb-brand" }, Ga = ["aria-expanded", "aria-label"], Ka = ["src", "alt"], Va = ["hidden"], Ua = ["hidden"], Ya = { id: "vue-bookmark-folder-strip-root" }, qa = { class: "tb-actions" }, Xa = {
  id: "workspace-launchers",
  hidden: ""
}, Ja = ["aria-expanded"], Za = /* @__PURE__ */ de({
  __name: "AppTopBar",
  setup(e) {
    const t = G(() => import("./WorkspaceLaunchers-BrdEUEwS.js"));
    function o(u) {
      u.preventDefault(), u.stopPropagation();
      const d = typeof window < "u" ? window : null;
      d?.LogicWeaverWindowManager?.open ? d.LogicWeaverWindowManager.open("settings") : d?.LogicWeaverWindowTabs?.open ? d.LogicWeaverWindowTabs.open("settings") : tn.open();
    }
    function i(u) {
      u.preventDefault();
      const d = typeof window < "u" ? window : null;
      typeof d?.toggleBookmarkPanel == "function" ? d.toggleBookmarkPanel() : d?.LogicWeaverBookmarkPanel?.toggle ? d.LogicWeaverBookmarkPanel.toggle() : Nn.toggleBookmarkPanel();
    }
    function r(u) {
      u.preventDefault(), _t.toggle();
    }
    function l(u) {
      u.preventDefault(), To.open(u.clientX, u.clientY);
    }
    const h = [
      { id: "light", icon: "☀️", label: "白天模式" },
      { id: "dark", icon: "🌙", label: "夜晚模式" },
      { id: "endfield", icon: "⚡", label: "终末地风格" },
      { id: "lonetrail", icon: "🌌", label: "孤星风格" }
    ], g = N("☀️"), p = N("切换主题");
    function x() {
      if (typeof document > "u") return;
      const u = document.documentElement.dataset.theme || "light", d = h.find((k) => k.id === u) || h.find((k) => k.id === "light") || h[0];
      g.value = d.icon, p.value = `主题：${d.label}（点击更换）`;
    }
    function m(u) {
      if (u.preventDefault(), typeof document > "u") return;
      const d = document.documentElement.dataset.theme || "light", k = h.findIndex((w) => w.id === d), $ = h[(k + 1) % h.length];
      document.documentElement.dataset.theme = $.id;
      try {
        localStorage.setItem("theme", $.id);
      } catch {
      }
      typeof chrome < "u" && chrome?.storage?.local && chrome.storage.local.set({ theme: $.id }), x(), document.querySelectorAll("iframe").forEach((w) => {
        try {
          w.contentWindow?.postMessage({ type: "theme-change", theme: $.id }, "*");
        } catch {
        }
      });
    }
    function S(u) {
      const d = u.target;
      d && (d.tagName === "INPUT" || d.tagName === "TEXTAREA" || d.isContentEditable) || (u.preventDefault(), u.stopPropagation());
    }
    function f(u) {
      const d = u.target;
      d && (d.tagName === "INPUT" || d.tagName === "TEXTAREA" || d.isContentEditable) || u.preventDefault();
    }
    return He(() => {
      _t.start();
      const u = localStorage.getItem("theme") || "light";
      document.documentElement.dataset.theme = u, document.documentElement.setAttribute("data-theme", u), x();
    }), (u, d) => (a(), c("header", {
      class: le(["topbar", { "bookmark-folders-mode": s(Kt).enabled }]),
      onCopy: S,
      onSelectstart: f
    }, [
      n("div", za, [
        n("button", {
          id: "bili-profile-button",
          class: "bili-profile-button",
          type: "button",
          title: "通知中心",
          "aria-controls": "notification-center",
          "aria-expanded": s(Di).isOpen,
          "aria-label": s(ro) ? `通知中心，${s(ro)} 条未读` : "通知中心",
          onClick: r,
          onContextmenu: d[0] || (d[0] = F((k) => l(k), ["prevent"]))
        }, [
          n("img", {
            id: "bili-profile-avatar",
            src: s(zt).avatarUrl || "assets/bilibili.svg",
            alt: s(zt).userName || "通知中心头像"
          }, null, 8, Ka),
          n("span", {
            id: "bili-profile-badge",
            class: "bili-profile-badge",
            hidden: s(ro) <= 0
          }, b(s(ro) > 99 ? "99+" : s(ro)), 9, Va)
        ], 40, Ga),
        n("button", {
          id: "bookmark-handle",
          class: "bookmark-handle",
          type: "button",
          "aria-expanded": "false",
          title: "书签",
          hidden: s(Kt).enabled,
          onClick: i
        }, [...d[2] || (d[2] = [
          n("span", { id: "bookmark-handle-icon" }, "📁", -1),
          n("span", null, "书签", -1)
        ])], 8, Ua),
        n("div", Ya, [
          Q(oa)
        ])
      ]),
      Q(Ha, {
        active: !s(kt).activeId
      }, null, 8, ["active"]),
      n("div", qa, [
        d[3] || (d[3] = n("button", {
          id: "daily-toggle",
          class: "tb-pill",
          type: "button",
          hidden: "",
          title: "查看日报"
        }, "📰 日报", -1)),
        n("span", Xa, [
          Q(s(t))
        ]),
        n("button", {
          id: "side-drawer-toggle",
          class: le(["tb-btn", { active: s(Bn).isOpen }]),
          type: "button",
          title: "侧栏 · 标签页聚合与待办",
          "aria-controls": "in-page-side-drawer",
          "aria-expanded": s(Bn).isOpen,
          onClick: d[1] || (d[1] = (k) => s(Xi).toggle())
        }, " 📑 ", 10, Ja),
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
          onClick: m
        }, b(g.value), 1)
      ])
    ], 34));
  }
}), Qa = {
  key: 0,
  class: "notice"
}, el = {
  key: 1,
  class: "muted small"
}, tl = {
  key: 2,
  class: "notice"
}, ol = {
  key: 3,
  class: "notice"
}, nl = { class: "wx-cur" }, il = { class: "wx-emoji" }, sl = { class: "wx-temp" }, rl = { class: "wx-sub" }, al = { class: "wx-rain" }, ll = { class: "wx-hours" }, cl = { class: "hh" }, dl = { class: "he" }, ul = { class: "ht" }, pl = { class: "wx-days" }, fl = ["open"], gl = { class: "weather-forecast-head" }, hl = { class: "weather-forecast-city-info" }, ml = { class: "weather-forecast-icon" }, vl = { id: "weather-forecast-city-title" }, yl = { class: "small muted" }, bl = { class: "weather-forecast-actions" }, wl = {
  key: 0,
  class: "weather-metrics-grid"
}, kl = { class: "weather-metric-item" }, _l = {
  class: "metric-val",
  id: "weather-forecast-humidity"
}, Cl = { class: "weather-metric-item" }, xl = {
  class: "metric-val",
  id: "weather-forecast-wind"
}, Ll = { class: "weather-metric-item" }, $l = {
  class: "metric-val",
  id: "weather-forecast-uv"
}, Tl = { class: "weather-metric-item" }, Sl = {
  class: "metric-val",
  id: "weather-forecast-aqi"
}, Il = {
  class: "weather-forecast-list",
  id: "weather-forecast-days-list"
}, Ml = { class: "day-date-col" }, Dl = { class: "day-name" }, El = { class: "day-date small muted" }, Al = { class: "day-weather-col" }, Pl = { class: "day-emoji" }, Wl = { class: "day-cond" }, Ol = { class: "day-rain-col" }, Bl = {
  key: 0,
  class: "rain-tag"
}, Rl = {
  key: 1,
  class: "rain-tag empty"
}, Fl = { class: "day-temp-bar-col" }, Nl = { class: "low-temp" }, Hl = { class: "temp-track" }, jl = { class: "high-temp" }, zl = { class: "weather-location-head" }, Gl = { class: "weather-location-title-row" }, Kl = ["title"], Vl = { class: "weather-input-wrapper" }, Ul = ["onKeydown"], Yl = { key: 0 }, ql = {
  key: 0,
  class: "weather-location-suggestions"
}, Xl = ["onClick"], Jl = { class: "weather-suggestion-name" }, Zl = { class: "weather-suggestion-sub" }, Ql = {
  key: 1,
  class: "weather-suggestion-empty"
}, ec = { key: 1 }, tc = { class: "weather-quick-chips-grid" }, oc = ["onClick"], nc = /* @__PURE__ */ de({
  __name: "WeatherWidget",
  setup(e) {
    const t = N(!1), o = N({ x: 0, y: 0 }), i = N(""), r = N(null), l = N(null), h = ["深圳", "武汉", "北京", "上海", "广州", "成都", "杭州", "南京", "西安", "重庆", "苏州", "天津"], g = ae(() => {
      const w = i.value.trim();
      return w ? yo.filterCities(w, 6) : [];
    });
    function p(w) {
      const B = w?.clientX ?? window.innerWidth / 2 - 140, D = w?.clientY ?? window.innerHeight / 2 - 320 / 2, y = Math.max(12, Math.min(window.innerWidth - 280 - 12, B)), _ = Math.max(12, Math.min(window.innerHeight - 320 - 12, D));
      o.value = { x: y, y: _ }, t.value = !0, i.value = "", ft(() => {
        l.value?.focus();
      });
    }
    function x() {
      t.value = !1, i.value = "";
    }
    async function m(w) {
      const L = w.trim();
      L && (x(), await yo.changeCity(L));
    }
    function S() {
      const w = i.value.trim();
      w && m(w);
    }
    function f(w) {
      if (!t.value) return;
      const L = w.target;
      r.value && !r.value.contains(L) && x();
    }
    function u(w) {
      t.value && w.key === "Escape" && (w.preventDefault(), x());
    }
    He(() => {
      ot.setRefreshAction(() => {
        yo.loadWeather();
      }), ot.setChangeLocationAction((w) => {
        p(w);
      }), yo.loadWeather(), window.addEventListener("pointerdown", f, !0), window.addEventListener("keydown", u, !0);
    }), xt(() => {
      window.removeEventListener("pointerdown", f, !0), window.removeEventListener("keydown", u, !0);
    });
    function d(w) {
      w.preventDefault(), p(w);
    }
    function k() {
      ot.closeForecastModal();
    }
    function $(w) {
      w.target?.id === "weather-forecast-dialog" && k();
    }
    return (w, L) => (a(), c("div", {
      class: "weather-widget-container",
      onContextmenu: d
    }, [
      s(z).state === "unconfigured" ? (a(), c("p", Qa, [...L[6] || (L[6] = [
        Be(" 未设置城市。右键此处快速设置，或到 ", -1),
        n("a", { href: "options.html" }, "设置", -1),
        Be(" 填写城市名（如 武汉 / Tokyo）。 ", -1)
      ])])) : s(z).state === "loading" ? (a(), c("p", el, "加载中…")) : s(z).state === "not_found" ? (a(), c("p", tl, "找不到城市「" + b(s(z).city) + "」，右键可重新选择地点。", 1)) : s(z).state === "error" ? (a(), c("p", ol, b(s(z).errorMessage || "天气加载失败，右键此处可重新选择地点。"), 1)) : s(z).state === "ready" && s(z).data ? (a(), c(K, { key: 4 }, [
        n("div", nl, [
          n("span", il, b(s(z).data.currentEmoji), 1),
          n("span", sl, b(s(z).data.currentTemp) + "°", 1)
        ]),
        n("p", rl, b(s(z).data.subText), 1),
        n("p", al, b(s(z).data.rainText), 1),
        n("div", ll, [
          (a(!0), c(K, null, ge(s(z).data.hours, (A, ne) => (a(), c("div", {
            key: ne,
            class: "wx-h"
          }, [
            n("span", cl, b(A.time), 1),
            n("span", dl, b(A.emoji), 1),
            n("span", ul, b(A.temp) + "°", 1)
          ]))), 128))
        ]),
        n("div", pl, [
          (a(!0), c(K, null, ge(s(z).data.days, (A, ne) => (a(), c("span", { key: ne }, b(A.label) + " " + b(A.emoji) + " " + b(A.tempRange), 1))), 128))
        ])
      ], 64)) : M("", !0),
      n("dialog", {
        id: "weather-forecast-dialog",
        class: "weather-forecast-dialog",
        open: s(z).forecastModalOpen,
        onClick: $
      }, [
        n("div", {
          class: "weather-forecast-shell",
          onClick: L[1] || (L[1] = F(() => {
          }, ["stop"]))
        }, [
          n("header", gl, [
            n("div", hl, [
              n("span", ml, b(s(z).data?.currentEmoji || "🌤️"), 1),
              n("div", null, [
                n("h3", vl, b(s(z).city || s(z).data?.cityName || "天气预报"), 1),
                n("p", yl, b(s(z).data?.subText || "未来多日天气趋势与生活气象指数"), 1)
              ])
            ]),
            n("div", bl, [
              n("button", {
                id: "weather-forecast-refresh-btn",
                type: "button",
                class: "weather-forecast-btn",
                title: "刷新天气数据",
                onClick: L[0] || (L[0] = (A) => s(ot).refresh())
              }, " ↻ 刷新 "),
              n("button", {
                id: "weather-forecast-close-btn",
                type: "button",
                class: "weather-forecast-close",
                title: "关闭",
                onClick: k
              }, " ✕ ")
            ])
          ]),
          s(z).detailInfo ? (a(), c("div", wl, [
            n("div", kl, [
              L[7] || (L[7] = n("span", { class: "metric-label" }, "💧 相对湿度", -1)),
              n("span", _l, b(s(z).detailInfo.humidity || "50%"), 1)
            ]),
            n("div", Cl, [
              L[8] || (L[8] = n("span", { class: "metric-label" }, "💨 风力风向", -1)),
              n("span", xl, b(s(z).detailInfo.wind || "微风"), 1)
            ]),
            n("div", Ll, [
              L[9] || (L[9] = n("span", { class: "metric-label" }, "☀️ 紫外线指数", -1)),
              n("span", $l, b(s(z).detailInfo.uvIndex || "中等"), 1)
            ]),
            n("div", Tl, [
              L[10] || (L[10] = n("span", { class: "metric-label" }, "🍃 空气质量", -1)),
              n("span", Sl, b(s(z).detailInfo.airQuality || "良"), 1)
            ])
          ])) : M("", !0),
          n("div", Il, [
            (a(!0), c(K, null, ge(s(z).forecastDays, (A, ne) => (a(), c("div", {
              key: ne,
              class: "weather-forecast-day-row forecast-day-item"
            }, [
              n("div", Ml, [
                n("span", Dl, b(A.dayName), 1),
                n("span", El, b(A.date), 1)
              ]),
              n("div", Al, [
                n("span", Pl, b(A.emoji), 1),
                n("span", Wl, b(A.condition), 1)
              ]),
              n("div", Ol, [
                A.rainProb > 0 ? (a(), c("span", Bl, "☂️ " + b(A.rainProb) + "%", 1)) : (a(), c("span", Rl, "无降水"))
              ]),
              n("div", Fl, [
                n("span", Nl, b(A.lowTemp) + "°", 1),
                n("div", Hl, [
                  n("div", {
                    class: "temp-range-fill",
                    style: ve({
                      left: `${Math.max(0, Math.min(100, (A.lowTemp + 10) * 2))}%`,
                      width: `${Math.max(20, Math.min(80, (A.highTemp - A.lowTemp) * 6))}%`
                    })
                  }, null, 4)
                ]),
                n("span", jl, b(A.highTemp) + "°", 1)
              ])
            ]))), 128))
          ])
        ])
      ], 8, fl),
      (a(), ce(gt, { to: "body" }, [
        t.value ? (a(), c("div", {
          key: 0,
          ref_key: "contextMenuRef",
          ref: r,
          class: "weather-location-context-menu",
          style: ve({ left: `${o.value.x}px`, top: `${o.value.y}px` }),
          onClick: L[4] || (L[4] = F(() => {
          }, ["stop"])),
          onContextmenu: L[5] || (L[5] = F(() => {
          }, ["prevent"]))
        }, [
          n("div", zl, [
            n("div", Gl, [
              L[12] || (L[12] = n("span", { class: "weather-location-title" }, "切换天气地点", -1)),
              n("span", {
                class: "weather-location-curr-badge",
                title: s(z).city
              }, [
                L[11] || (L[11] = n("span", { class: "weather-curr-dot" }, null, -1)),
                Be(" " + b(s(z).city || "未设置"), 1)
              ], 8, Kl)
            ])
          ]),
          n("form", {
            class: "weather-location-form",
            onSubmit: F(S, ["prevent"])
          }, [
            n("div", Vl, [
              L[13] || (L[13] = n("span", { class: "weather-input-icon" }, "🔍", -1)),
              Oe(n("input", {
                ref_key: "inputRef",
                ref: l,
                class: "weather-location-input",
                placeholder: "输入城市名或拼音…",
                "onUpdate:modelValue": L[2] || (L[2] = (A) => i.value = A),
                onKeydown: Wt(F(S, ["prevent"]), ["enter"]),
                autocomplete: "off"
              }, null, 40, Ul), [
                [eo, i.value]
              ]),
              i.value ? (a(), c("button", {
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
          i.value.trim() ? (a(), c("div", Yl, [
            L[15] || (L[15] = n("div", { class: "weather-section-subtitle" }, "匹配建议", -1)),
            g.value.length ? (a(), c("div", ql, [
              (a(!0), c(K, null, ge(g.value, (A) => (a(), c("button", {
                key: A.name + A.admin,
                type: "button",
                class: "weather-suggestion-item",
                onClick: (ne) => m(A.name)
              }, [
                n("span", Jl, b(A.name), 1),
                n("span", Zl, b(A.admin), 1)
              ], 8, Xl))), 128))
            ])) : (a(), c("div", Ql, " 未找到完全匹配城市，回车或点击「确定」直接尝试检索 "))
          ])) : (a(), c("div", ec, [
            L[16] || (L[16] = n("div", { class: "weather-section-subtitle" }, "常用城市", -1)),
            n("div", tc, [
              (a(), c(K, null, ge(h, (A) => n("button", {
                key: A,
                type: "button",
                class: le(["weather-quick-chip", { active: s(z).city === A }]),
                onClick: (ne) => m(A)
              }, b(A), 11, oc)), 64))
            ])
          ]))
        ], 36)) : M("", !0)
      ]))
    ], 32));
  }
}), Ji = /* @__PURE__ */ Te(nc, [["__scopeId", "data-v-51b21266"]]), Rn = "heroCustomMottoV1";
function ic() {
  try {
    if (typeof localStorage < "u") {
      const e = localStorage.getItem(Rn);
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
const Nt = ic(), V = we({
  loaded: !1,
  customText: Nt.customText,
  history: Nt.history,
  currentIndex: Nt.customText && Nt.history.length ? Nt.history.findIndex((e) => e.text === Nt.customText) : -1,
  menuOpen: !1,
  menuPos: { x: 0, y: 0 }
});
function sc(e) {
  return new Promise((t) => {
    typeof chrome < "u" && chrome?.storage?.local?.get ? chrome.storage.local.get([e], (o) => t(o?.[e])) : t(null);
  });
}
function rc(e, t) {
  try {
    typeof localStorage < "u" && localStorage.setItem(e, JSON.stringify(t));
  } catch {
  }
  return new Promise((o) => {
    typeof chrome < "u" && chrome?.storage?.local?.set ? chrome.storage.local.set({ [e]: t }, () => o()) : o();
  });
}
function ac(e) {
  const t = (r) => String(r).padStart(2, "0"), o = `${e.getFullYear()}-${t(e.getMonth() + 1)}-${t(e.getDate())}`, i = `${t(e.getHours())}:${t(e.getMinutes())}`;
  return { date: o, time: i };
}
const tt = {
  async init() {
    try {
      const e = await sc(Rn);
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
    await rc(Rn, e);
  },
  setCustomMotto(e) {
    const t = e.trim();
    if (!t) {
      this.resetToSystem();
      return;
    }
    const { date: o, time: i } = ac(/* @__PURE__ */ new Date());
    V.customText = t;
    const r = V.history.findIndex((l) => l.text === t);
    if (r !== -1) {
      const l = V.history.splice(r, 1)[0];
      l.date = o, l.time = i, V.history.unshift(l);
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
}, lc = { class: "motto-content" }, cc = {
  key: 0,
  class: "motto-scroll-hint",
  title: "滚动鼠标滚轮快速切换历史标语"
}, dc = { class: "motto-menu-header" }, uc = { class: "dim" }, pc = { class: "motto-history-list" }, fc = {
  key: 0,
  class: "motto-history-empty dim"
}, gc = ["onClick"], hc = { class: "motto-item-date" }, mc = ["title"], vc = ["onClick"], yc = /* @__PURE__ */ de({
  __name: "HeroMotto",
  setup(e) {
    const t = N(!1), o = N(""), i = N(null), r = ae(() => V.customText || me.greetingText);
    function l() {
      tt.closeMenu(), o.value = V.customText || me.greetingText, t.value = !0, ft(() => {
        i.value?.focus(), i.value?.select();
      });
    }
    function h() {
      if (!t.value) return;
      t.value = !1;
      const f = o.value.trim();
      tt.setCustomMotto(f), f && Ae.fetch("标语", `已更新标语: ${f}`);
    }
    function g() {
      t.value = !1;
    }
    function p(f) {
      f.key === "Enter" ? (f.preventDefault(), h()) : f.key === "Escape" && (f.preventDefault(), g());
    }
    function x(f) {
      t.value || (f.preventDefault(), f.stopPropagation(), tt.stepHistory(f.deltaY > 0 ? 1 : -1));
    }
    function m(f) {
      f.preventDefault(), f.stopPropagation(), tt.openMenu(f.clientX, f.clientY);
    }
    function S(f) {
      V.menuOpen && (f.target.closest(".motto-context-menu") || tt.closeMenu());
    }
    return He(() => {
      tt.init(), window.addEventListener("click", S);
    }), xt(() => {
      window.removeEventListener("click", S);
    }), (f, u) => (a(), c(K, null, [
      n("div", {
        class: "hero-motto-wrapper",
        title: "点击直接编辑标语 · 滚轮切换历史标语 · 右键查看标语菜单",
        onWheel: x,
        onContextmenu: m
      }, [
        t.value ? Oe((a(), c("input", {
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
        ]) : (a(), c("p", {
          key: 1,
          id: "greeting",
          class: "hero-motto-text",
          style: ve({ color: s(me).greetColor }),
          onClick: l
        }, [
          n("span", lc, b(r.value), 1),
          s(V).history.length > 1 ? (a(), c("span", cc, "⇕")) : M("", !0)
        ], 4))
      ], 32),
      (a(), ce(gt, { to: "body" }, [
        s(V).menuOpen ? (a(), c("div", {
          key: 0,
          class: "motto-context-menu",
          style: ve({ left: `${s(V).menuPos.x}px`, top: `${s(V).menuPos.y}px` }),
          onClick: u[3] || (u[3] = F(() => {
          }, ["stop"])),
          onContextmenu: u[4] || (u[4] = F(() => {
          }, ["prevent"]))
        }, [
          n("div", dc, [
            u[5] || (u[5] = n("span", null, "🏷️ 自定义标语", -1)),
            n("small", uc, b(s(V).history.length) + " 条记录", 1)
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
          n("div", pc, [
            s(V).history.length ? (a(!0), c(K, { key: 1 }, ge(s(V).history, (d) => (a(), c("div", {
              key: d.id,
              class: le(["motto-history-item", { active: s(V).customText === d.text }]),
              onClick: (k) => s(tt).selectHistory(d)
            }, [
              n("span", hc, b(d.date), 1),
              n("span", {
                class: "motto-item-text",
                title: d.text
              }, b(d.text), 9, mc),
              n("button", {
                type: "button",
                class: "motto-item-del",
                title: "删除此条标语",
                onClick: F((k) => s(tt).deleteEntry(d.id), ["stop"])
              }, "×", 8, vc)
            ], 10, gc))), 128)) : (a(), c("div", fc, " 暂无历史标语，自定义的每一条标语都会沉淀在此 "))
          ]),
          u[11] || (u[11] = n("div", { class: "motto-menu-divider" }, null, -1)),
          n("button", {
            type: "button",
            class: "motto-menu-action reset-btn",
            onClick: u[1] || (u[1] = //@ts-ignore
            (...d) => s(tt).resetToSystem && s(tt).resetToSystem(...d))
          }, [...u[7] || (u[7] = [
            n("i", null, "↻", -1),
            n("span", null, "恢复系统自动问候（早安/午安/晚安）", -1)
          ])]),
          s(V).history.length ? (a(), c("button", {
            key: 0,
            type: "button",
            class: "motto-menu-action danger-btn",
            onClick: u[2] || (u[2] = //@ts-ignore
            (...d) => s(tt).clearHistory && s(tt).clearHistory(...d))
          }, [...u[8] || (u[8] = [
            n("i", null, "🗑", -1),
            n("span", null, "清空全部历史标语", -1)
          ])])) : M("", !0)
        ], 36)) : M("", !0)
      ]))
    ], 64));
  }
}), bc = /* @__PURE__ */ Te(yc, [["__scopeId", "data-v-0514f22a"]]), wc = /* @__PURE__ */ de({
  __name: "HeroClock",
  setup(e) {
    const t = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
    function o(p) {
      return p < 5 ? "夜深了" : p < 9 ? "早上好" : p < 12 ? "上午好" : p < 14 ? "中午好" : p < 18 ? "下午好" : p < 23 ? "晚上好" : "夜深了";
    }
    function i() {
      const p = At.state.timezone;
      if (!p || p === "local") return /* @__PURE__ */ new Date();
      try {
        const x = (/* @__PURE__ */ new Date()).toLocaleString("en-US", { timeZone: p });
        return new Date(x);
      } catch {
        return /* @__PURE__ */ new Date();
      }
    }
    function r() {
      const p = (B) => String(B).padStart(2, "0"), x = i(), m = x.getHours(), S = x.getMinutes(), f = x.getSeconds(), u = x.getFullYear(), d = x.getMonth() + 1, k = x.getDate(), $ = x.getDay(), w = `${p(m)}:${p(S)}`, L = `:${p(f)}`, A = o(m), ne = `${u}年${d}月${k}日 · ${t[$]}`;
      Ut.updateTime(w, L, A, ne);
    }
    function l(p) {
      p.preventDefault(), At.open({ clientX: p.clientX, clientY: p.clientY });
    }
    function h() {
      document.hidden ? g && (clearInterval(g), g = null) : (r(), g || (g = setInterval(r, 1e3)));
    }
    let g = null;
    return At.initPreferences(), r(), He(() => {
      At.initPreferences(), kt.activeId || (r(), g = setInterval(r, 1e3)), document.addEventListener("visibilitychange", h);
    }), Ve(
      () => kt.activeId,
      (p) => {
        p ? g && (clearInterval(g), g = null) : document.hidden || (r(), g || (g = setInterval(r, 1e3)));
      }
    ), xt(() => {
      g && (clearInterval(g), g = null), document.removeEventListener("visibilitychange", h);
    }), (p, x) => (a(), c("div", {
      class: "hero-clock-vue-container",
      onContextmenu: l
    }, [
      n("p", {
        id: "clock",
        class: "clock",
        style: ve({ fontFamily: s(me).fontFamily, color: s(me).colorHex })
      }, [
        Be(b(s(me).timeText), 1),
        n("span", {
          id: "secs",
          style: ve({ color: s(me).colorHex })
        }, b(s(me).secsText), 5)
      ], 4),
      n("p", {
        id: "date",
        class: "date",
        style: ve({ color: s(me).dateColor })
      }, b(s(me).dateText), 5)
    ], 32));
  }
}), Zi = /* @__PURE__ */ Te(wc, [["__scopeId", "data-v-38840808"]]), kc = {
  key: 0,
  class: "home-music-degraded-box"
}, _c = { class: "degraded-badge-row" }, Cc = { class: "degraded-status" }, xc = {
  key: 0,
  class: "degraded-host-tag"
}, Lc = {
  key: 1,
  class: "degraded-host-tag"
}, $c = { class: "degraded-title-row" }, Tc = ["title"], Sc = { class: "degraded-track-artist" }, Ic = { class: "degraded-progress-bar-wrap" }, Mc = { class: "degraded-actions" }, Dc = { class: "degraded-time" }, Ec = { class: "home-vinyl-box" }, Ac = ["src"], Pc = { class: "home-music-right" }, Wc = ["title"], Oc = {
  id: "home-music-artist",
  class: "home-music-meta-artist"
}, Bc = { class: "home-music-seek-row" }, Rc = {
  id: "home-music-cur",
  class: "home-music-time"
}, Fc = ["value"], Nc = {
  id: "home-music-dur",
  class: "home-music-time"
}, Hc = { class: "home-music-actions" }, jc = /* @__PURE__ */ de({
  __name: "HomeMusicCard",
  setup(e) {
    He(() => {
      setTimeout(() => {
        Ws();
      }, 200);
    });
    const t = ae(() => Mi.visible || it.djModalOpen || it.isActive && it.isJoined), o = ae(() => it.isActive && it.isJoined), i = ae(() => Y.mode === "shuffle" ? "🔀" : Y.mode === "one" ? "🔂" : "🔁");
    function r(h) {
      const g = h.target, p = Number(g.value);
      Ke.seek(p);
    }
    function l() {
      Ke.update({ coverUrl: "" });
    }
    return (h, g) => (a(), c("div", {
      id: "home-music-player-view",
      class: le(["home-music-player-view", { "is-degraded": t.value }])
    }, [
      t.value ? (a(), c("div", kc, [
        n("div", _c, [
          g[7] || (g[7] = n("span", { class: "degraded-icon" }, "🎧", -1)),
          n("strong", Cc, b(o.value ? "正在一起听" : "后台收听中"), 1),
          o.value ? (a(), c("span", xc, " DJ: " + b(s(it).hostName), 1)) : (a(), c("span", Lc, " 工作区就绪 "))
        ]),
        n("div", $c, [
          n("h3", {
            class: "degraded-track-title",
            title: s(Y).title
          }, b(s(Y).title || "待机中"), 9, Tc),
          n("p", Sc, b(s(Y).artist), 1)
        ]),
        n("div", Ic, [
          n("div", {
            class: "degraded-progress-bar-fill",
            style: ve({ width: s(Y).progressPercent + "%" })
          }, null, 4)
        ]),
        n("div", Mc, [
          n("button", {
            type: "button",
            class: "degraded-btn",
            onClick: g[0] || (g[0] = (p) => s(Ke).togglePlay())
          }, b(s(Y).playing ? "⏸ 暂停" : "▶ 播放"), 1),
          n("span", Dc, b(s(Y).formattedCurrent) + " / " + b(s(Y).formattedDuration), 1)
        ])
      ])) : (a(), c(K, { key: 1 }, [
        n("div", Ec, [
          n("div", {
            id: "home-vinyl-needle",
            class: le(["home-vinyl-needle", { playing: s(Y).playing }])
          }, [...g[8] || (g[8] = [
            mo('<svg viewBox="0 0 32 52" fill="none" data-v-25a69816><circle cx="26" cy="4" r="3.5" fill="#e2e8f0" stroke="#475569" stroke-width="1.5" data-v-25a69816></circle><circle cx="26" cy="4" r="1.5" fill="#64748b" data-v-25a69816></circle><path d="M26 4 L14 26 L11 44" stroke="#cbd5e1" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" data-v-25a69816></path><rect x="7" y="42" width="8" height="9" rx="1.5" fill="#f43f5e" transform="rotate(-15 11 46)" data-v-25a69816></rect></svg>', 1)
          ])], 2),
          n("div", {
            id: "home-vinyl-disc",
            class: le(["home-vinyl-disc", { playing: s(Y).playing }]),
            title: "点击播放 / 暂停",
            onClick: g[1] || (g[1] = (p) => s(Ke).togglePlay())
          }, [
            s(Y).coverUrl ? (a(), c("img", {
              key: 0,
              id: "home-vinyl-cover",
              class: "home-vinyl-cover",
              referrerpolicy: "no-referrer",
              src: s(Y).coverUrl,
              alt: "音乐封面",
              onError: l
            }, null, 40, Ac)) : M("", !0),
            g[9] || (g[9] = n("div", { class: "home-vinyl-hole" }, null, -1))
          ], 2)
        ]),
        n("div", Pc, [
          n("h3", {
            id: "home-music-title",
            class: "home-music-meta-title",
            title: s(Y).title
          }, b(s(Y).title), 9, Wc),
          n("p", Oc, b(s(Y).artist), 1),
          n("div", Bc, [
            n("span", Rc, b(s(Y).formattedCurrent), 1),
            n("input", {
              id: "home-music-seek",
              class: "home-music-seek-bar",
              type: "range",
              min: "0",
              max: "100",
              value: s(Y).progressPercent,
              onInput: r
            }, null, 40, Fc),
            n("span", Nc, b(s(Y).formattedDuration), 1)
          ]),
          n("div", Hc, [
            n("button", {
              id: "home-music-prev",
              class: "home-music-btn",
              type: "button",
              title: "上一首",
              onClick: g[2] || (g[2] = (p) => s(Ke).prev())
            }, " ⏮ "),
            n("button", {
              id: "home-music-play",
              class: "home-music-btn play-btn",
              type: "button",
              title: "播放 / 暂停",
              onClick: g[3] || (g[3] = (p) => s(Ke).togglePlay())
            }, b(s(Y).playing ? "⏸" : "▶"), 1),
            n("button", {
              id: "home-music-next",
              class: "home-music-btn",
              type: "button",
              title: "下一首",
              onClick: g[4] || (g[4] = (p) => s(Ke).next())
            }, " ⏭ "),
            n("button", {
              id: "home-music-like",
              class: le(["home-music-btn like-btn", { liked: s(Y).liked }]),
              type: "button",
              title: "收藏",
              onClick: g[5] || (g[5] = (p) => s(Ke).toggleLike())
            }, b(s(Y).liked ? "♥" : "♡"), 3),
            n("button", {
              id: "home-music-mode",
              class: "home-music-btn",
              type: "button",
              title: "播放模式",
              onClick: g[6] || (g[6] = (p) => s(Ke).cycleMode())
            }, b(i.value), 1)
          ])
        ])
      ], 64))
    ], 2));
  }
}), Qi = /* @__PURE__ */ Te(jc, [["__scopeId", "data-v-25a69816"]]), ut = /* @__PURE__ */ new Map(), pt = /* @__PURE__ */ new Set();
function zc(e, t) {
  for (ut.delete(e), ut.set(e, t), pt.delete(t), pt.add(t); ut.size > 512; )
    ut.delete(ut.keys().next().value);
  for (; pt.size > 512; )
    pt.delete(pt.values().next().value);
}
const Gc = {
  key: 0,
  class: "launcher-fallback"
}, Kc = ["src"], xn = "lw_resolved_icon:", Vc = /* @__PURE__ */ de({
  __name: "LauncherFavicon",
  props: {
    link: {},
    mini: { type: Boolean, default: !1 }
  },
  setup(e) {
    function t(w) {
      try {
        return localStorage.getItem(xn + w) || "";
      } catch {
        return "";
      }
    }
    function o(w, L) {
      try {
        localStorage.setItem(xn + w, L);
      } catch {
      }
    }
    function i(w) {
      try {
        return localStorage.getItem("lw_sync_dataurl:" + w) || "";
      } catch {
        return "";
      }
    }
    const r = e;
    function l(w) {
      try {
        return new URL(w).hostname.replace(/^www\./, "");
      } catch {
        return w || "";
      }
    }
    function h(w) {
      try {
        return new URL(w).origin;
      } catch {
        return "";
      }
    }
    function g(w) {
      try {
        const L = window, A = typeof L.chrome < "u" ? L.chrome : globalThis.chrome;
        if (typeof A?.runtime?.getURL == "function")
          return A.runtime.getURL("_favicon/?pageUrl=" + encodeURIComponent(w) + "&size=64");
      } catch {
      }
      return "";
    }
    const p = ae(() => {
      const w = r.link, L = (w.title || l(w.url)).trim();
      return L ? L.slice(0, 1).toUpperCase() : "🔗";
    }), x = N([]), m = N(0), S = N(!1), f = N(!1), u = ae(() => f.value || m.value >= x.value.length ? "" : x.value[m.value] || "");
    function d() {
      const w = r.link;
      if (!w?.url) {
        x.value = [], f.value = !0, S.value = !1;
        return;
      }
      const L = [], A = i(w.url);
      A && L.push(A);
      const ne = ut.get(w.url) || t(w.url);
      ne && !L.includes(ne) && L.push(ne);
      const B = (E) => E ? /google\.com\/s2\/favicons|icons\.duckduckgo\.com|unavatar\.io|icon\.horse/i.test(E) : !1;
      w.customIcon && !B(w.customIcon) && L.push(w.customIcon), w.icon && !B(w.icon) && L.push(w.icon);
      const D = g(w.url);
      D && !L.includes(D) && L.push(D);
      const y = oe.getCachedIcon(w.url);
      y && !L.includes(y) && L.push(y);
      const _ = h(w.url);
      _ && !_.startsWith("http://1.") && !_.startsWith("http://192.") && !_.startsWith("http://127.") && L.push(`${_}/favicon.ico`), w.customIcon && !B(w.customIcon) && L.unshift(w.customIcon);
      const O = [...new Set(L.filter(Boolean))];
      x.value = O, m.value = 0, f.value = O.length === 0;
      const U = O[0];
      U && (U.startsWith("data:") || pt.has(U)) && (S.value = !0);
    }
    Ve(
      () => [r.link?.url, r.link?.icon, r.link?.customIcon],
      (w, L) => {
        L && w[0] === L[0] && w[1] === L[1] && w[2] === L[2] || d();
      },
      { immediate: !0 }
    ), He(() => {
      x.value.length === 0 && d();
    });
    function k(w) {
      S.value = !0, f.value = !1;
      const L = u.value;
      if (L) {
        const A = pt.has(L), ne = ut.get(r.link.url);
        zc(r.link.url, L), ne !== L && t(r.link.url) !== L && o(r.link.url, L);
        const B = w.target;
        if (!A && !L.startsWith("data:")) {
          const D = r.link.url;
          setTimeout(() => {
            oe.cacheIcon(D, L, B?.getAttribute("src") === L ? B : null);
          }, 0);
        }
      }
    }
    function $() {
      const w = u.value;
      if (w) {
        pt.delete(w), ut.get(r.link.url) === w && ut.delete(r.link.url);
        try {
          localStorage.removeItem(xn + r.link.url), localStorage.removeItem("lw_sync_dataurl:" + r.link.url);
        } catch {
        }
      }
      if (w && oe.getCachedIcon(r.link.url) === w && oe.evictCachedIcon(r.link.url), m.value + 1 < x.value.length) {
        m.value += 1;
        const L = x.value[m.value];
        L && (L.startsWith("data:") || pt.has(L)) && (S.value = !0);
      } else
        f.value = !0, S.value = !1;
    }
    return (w, L) => (a(), c("span", {
      class: le(e.mini ? "launcher-folder-mini" : "launcher-favicon")
    }, [
      f.value || !u.value ? (a(), c("span", Gc, b(p.value), 1)) : (a(), c("img", {
        key: 1,
        src: u.value,
        alt: "",
        draggable: "false",
        referrerpolicy: "no-referrer",
        decoding: "async",
        style: { "pointer-events": "none", "user-select": "none" },
        onLoad: k,
        onError: $
      }, null, 40, Kc))
    ], 2));
  }
}), Qo = /* @__PURE__ */ Te(Vc, [["__scopeId", "data-v-bc41d0d8"]]), Uc = { class: "launcher-label launcher-title" }, Yc = ["title"], qc = {
  key: 0,
  class: "launcher-folder-more"
}, Xc = {
  key: 1,
  class: "empty-folder",
  "aria-hidden": "true"
}, Jc = { class: "launcher-folder-label launcher-title" }, Zc = /* @__PURE__ */ de({
  __name: "LauncherTileContent",
  props: {
    link: {},
    folder: {},
    size: { default: "small" }
  },
  setup(e) {
    const t = e, o = ae(() => t.size === "large" ? 9 : 4), i = ae(() => t.folder?.preview.slice(0, t.folder.count > o.value ? o.value - 1 : o.value) || []);
    return (r, l) => e.link ? (a(), c(K, { key: 0 }, [
      Q(Qo, { link: e.link }, null, 8, ["link"]),
      n("span", Uc, b(e.link.title), 1)
    ], 64)) : e.folder ? (a(), c(K, { key: 1 }, [
      n("div", {
        class: "launcher-folder-preview",
        title: `打开${e.folder.title}`
      }, [
        (a(!0), c(K, null, ge(i.value, (h) => (a(), ce(Qo, {
          key: h.id,
          link: h,
          mini: !0
        }, null, 8, ["link"]))), 128)),
        e.folder.count > o.value ? (a(), c("span", qc, "+" + b(e.folder.count - (o.value - 1)), 1)) : M("", !0),
        i.value.length ? M("", !0) : (a(), c("span", Xc, "📁")),
        Si(r.$slots, "default", {}, void 0, !0)
      ], 8, Yc),
      n("span", Jc, b(e.folder.title), 1)
    ], 64)) : M("", !0);
  }
}), bi = /* @__PURE__ */ Te(Zc, [["__scopeId", "data-v-7f513029"]]), Qc = 5, ed = 180;
function td(e, t, o) {
  const i = t - e.left, r = o - e.top;
  return i > e.width * 0.25 && i < e.width * 0.75 && r > e.height * 0.25 && r < e.height * 0.75;
}
function od(e, t, o) {
  return Math.hypot(t - (e.left + e.width / 2), o - (e.top + e.height / 2)) <= Math.max(e.width, e.height) * 0.55;
}
const nd = {
  class: "launcher-group launcher-aihot launcher-todoist size-large",
  id: "launcher-todoist"
}, id = {
  class: "aihot-home-body",
  id: "aihot-home-body"
}, sd = {
  key: 0,
  class: "muted small"
}, rd = {
  key: 1,
  class: "notice small"
}, ad = {
  key: 2,
  class: "muted small aihot-home-empty"
}, ld = {
  key: 3,
  class: "aihot-home-rich-list"
}, cd = ["href", "title", "onClick"], dd = { class: "aihot-home-rich-main" }, ud = { class: "aihot-home-rich-title" }, pd = {
  key: 0,
  class: "aihot-home-rich-summary"
}, fd = { class: "aihot-home-rich-meta" }, gd = { class: "aihot-home-rich-meta-left" }, hd = {
  key: 0,
  class: "aihot-home-rich-tag"
}, md = { class: "aihot-home-rich-source" }, vd = { class: "aihot-home-rich-time" }, wi = 6, yd = /* @__PURE__ */ de({
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
    }, o = N([]), i = N(0), r = N(!0), l = N("");
    function h(d) {
      return d.category ? t[d.category] || d.category : "";
    }
    function g(d) {
      const k = d.publishedAt || d.published || "";
      if (!k) return "最新";
      const $ = Number(k), w = Number.isFinite($) && $ > 0 ? new Date($ > 1e12 ? $ : $ * 1e3) : new Date(k);
      if (isNaN(w.getTime())) return String(k).slice(0, 16) || "最新";
      const L = (_) => String(_).padStart(2, "0"), A = w.getFullYear(), ne = L(w.getMonth() + 1), B = L(w.getDate()), D = L(w.getHours()), y = L(w.getMinutes());
      return `${A}-${ne}-${B} ${D}:${y}`;
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
    function x() {
      const k = (typeof window < "u" ? window : null)?.LogicWeaverAihotFeed?.getState?.()?.feedArticles;
      if (Array.isArray(k) && k.length)
        return k;
      const $ = [
        "newtab_aihot_items_v2",
        "lw-aihot-cached-feed-all-24h-v1",
        "lw-aihot-cached-feed-v1"
      ];
      for (const w of $)
        try {
          const L = localStorage.getItem(w);
          if (L) {
            const A = JSON.parse(L);
            if (Array.isArray(A) && A.length) return A;
            if (A && Array.isArray(A.items) && A.items.length) return A.items;
          }
        } catch {
        }
      return [];
    }
    async function m(d = !1) {
      if (!d && o.value.length > 0) return;
      const k = x();
      k.length ? (o.value = k, r.value = !1) : o.value.length || (o.value = [...p], r.value = !1);
      try {
        const w = await (await fetch("https://aihot.virxact.com/api/v1/items?mode=selected&window=24h&limit=24", {
          headers: { Accept: "application/json" },
          signal: AbortSignal.timeout(5e3)
        })).json(), L = Array.isArray(w) ? w : w.items || w.data || w.results || [];
        if (L.length) {
          o.value = L, i.value = 0, l.value = "";
          try {
            localStorage.setItem("newtab_aihot_items_v2", JSON.stringify(L.slice(0, 30)));
          } catch {
          }
        }
      } catch {
        o.value.length || (o.value = [...p]);
      } finally {
        r.value = !1;
      }
    }
    function S() {
      if (!o.value.length) {
        r.value = !0, m(!0);
        return;
      }
      i.value += wi, i.value >= o.value.length && (i.value = 0);
    }
    function f() {
      const d = window;
      if (typeof d.enterFullscreenCard == "function") {
        d.enterFullscreenCard("daily-aihot");
        return;
      }
      const k = document.querySelector("#daily-aihot, [data-dock-id='daily-aihot']");
      k ? k.scrollIntoView({ behavior: "smooth", block: "start" }) : window.open("https://aihot.virxact.com", "_blank", "noreferrer");
    }
    function u(d, k) {
      if (k.ctrlKey || k.metaKey || k.shiftKey || k.button === 1) return;
      k.preventDefault();
      const $ = d.links?.original || d.links?.aihot || d.url || "#";
      Gn.openArticle(
        {
          id: d.id,
          title: d.title,
          summary: d.summary,
          sourceName: d.source?.name || d.sourceName || "AI HOT",
          published: g(d),
          url: $
        },
        ""
      );
    }
    return He(() => {
      m();
    }), (d, k) => (a(), c("section", nd, [
      n("header", { class: "card-head aihot-home-head" }, [
        k[0] || (k[0] = n("span", { class: "bar cyan" }, null, -1)),
        k[1] || (k[1] = n("strong", { class: "title" }, "AI HOT 资讯", -1)),
        k[2] || (k[2] = n("span", { class: "grow" }, null, -1)),
        n("button", {
          class: "aihot-home-btn",
          type: "button",
          title: "换一批最新资讯",
          onClick: S
        }, " 换一批 ↻ "),
        n("button", {
          class: "aihot-home-btn aihot-home-more-btn",
          type: "button",
          title: "查看完整 AI HOT 榜单",
          onClick: f
        }, " 热榜 ↗ ")
      ]),
      n("div", id, [
        r.value && !o.value.length ? (a(), c("p", sd, "正在加载精选资讯…")) : l.value && !o.value.length ? (a(), c("p", rd, b(l.value), 1)) : o.value.length ? (a(), c("div", ld, [
          (a(!0), c(K, null, ge(o.value.slice(i.value, i.value + wi), ($, w) => (a(), c("a", {
            key: $.id || $.title,
            class: "aihot-home-rich-card",
            href: $.links?.original || $.links?.aihot || $.url || "#",
            target: "_blank",
            rel: "noreferrer",
            title: `${$.title}
${$.summary || ""}
点击在阅读器中查看`,
            onClick: (L) => u($, L)
          }, [
            n("span", {
              class: le(["aihot-home-rich-rank", { top: i.value + w < 3 }])
            }, b(i.value + w + 1), 3),
            n("div", dd, [
              n("h3", ud, b($.title), 1),
              $.summary ? (a(), c("p", pd, b($.summary), 1)) : M("", !0),
              n("div", fd, [
                n("div", gd, [
                  h($) ? (a(), c("span", hd, b(h($)), 1)) : M("", !0),
                  n("span", md, b($.source?.name || $.sourceName || "AI HOT"), 1)
                ]),
                n("time", vd, b(g($)), 1)
              ])
            ])
          ], 8, cd))), 128))
        ])) : (a(), c("p", ad, "暂无精选资讯，请点击换一批重试"))
      ])
    ]));
  }
}), bd = /* @__PURE__ */ Te(yd, [["__scopeId", "data-v-cc4398a8"]]), wd = {
  class: "sites-view-switch",
  role: "group",
  "aria-label": "网站与书签切换"
}, kd = ["disabled", "aria-pressed"], _d = ["disabled", "aria-pressed"], Cd = {
  class: "launcher-page-tabs",
  role: "tablist",
  "aria-label": "常用网站分区"
}, xd = ["data-page", "title", "onClick", "onContextmenu", "onDragover", "onDrop"], Ld = {
  key: 0,
  id: "bookmark-board-header",
  class: "launcher-page-tabs"
}, $d = ["data-page"], Td = ["href", "title", "data-launcher-id", "onPointerdown", "onClick", "onContextmenu"], Sd = ["title", "data-launcher-folder", "onPointerdown", "onDragstart", "onDrop", "onClick", "onContextmenu"], Id = ["title", "onClick"], Md = {
  class: "launcher-folder-count",
  hidden: ""
}, Dd = {
  class: "launcher-empty",
  key: "empty-msg"
}, Ed = {
  key: 1,
  class: "launcher-media-stack"
}, Ad = {
  key: 1,
  id: "launcher-bili"
}, Pd = { class: "launcher-folder-preview" }, Wd = { class: "launcher-folder-label launcher-title" }, Od = { class: "launcher-label launcher-title" }, Bd = /* @__PURE__ */ de({
  __name: "FavoriteSites",
  setup(e) {
    const t = G(() => import("./BookmarkBoard-7OOexWje.js")), o = N("sites"), i = N(!1);
    function r() {
      xe(), S = !1, E = !1;
    }
    He(() => {
      $e.setExternalDragHandler(A), $e.setExternalDropHandler(ne), window.addEventListener("blur", r), window.addEventListener("pagehide", r), document.addEventListener("visibilitychange", r);
      const v = window;
      re.hasBili && typeof v.ensureLauncherMediaCards == "function" && v.ensureLauncherMediaCards();
    });
    const l = N(!1), h = N(""), g = N(null), p = N(null), x = N(null), m = N(null);
    let S = !1, f = 0, u = 0, d = 0, k = "", $ = 0, w = "", L = 0;
    function A(v) {
      if (o.value !== "sites") return;
      if (!v || qe.isOpen) {
        m.value && (m.value = null), w = "";
        return;
      }
      const C = document.elementsFromPoint(v.clientX, v.clientY);
      if (!C.some(
        (Pe) => Pe.classList.contains("launcher-site-items") || !!Pe.closest?.(".launcher-site-items")
      )) {
        m.value && (m.value = null), w = "";
        return;
      }
      const I = C.find((Pe) => Pe.classList.contains("launcher-link") && Pe.getAttribute("data-launcher-id") !== String(v.link.id) || Pe.classList.contains("launcher-folder"));
      if (!I) return;
      const J = I.classList.contains("launcher-link"), he = J ? I.getAttribute("data-launcher-id") : null, De = J ? null : I.getAttribute("data-launcher-folder"), te = J ? `link-${he}` : `folder-${De}`, se = I.getBoundingClientRect(), Fe = se.left + se.width / 2, rn = se.top + se.height / 2, so = Math.hypot(v.clientX - Fe, v.clientY - rn), Ot = Date.now();
      if (so > Math.max(se.width, se.height) * 0.55 || te === w && Ot - L < 180) return;
      const Bt = ze.value.filter(
        (Pe) => Pe.type !== "link" || String(Pe.link.id) !== String(v.link.id)
      ), st = [...m.value || Bt], ht = st.findIndex(
        (Pe) => Pe.type === "link" && String(Pe.link.id) === String(v.link.id)
      ), mt = st.findIndex((Pe) => Pe.key === te);
      if (mt < 0) return;
      const Ze = {
        key: `link-${v.link.id}`,
        type: "link",
        link: v.link
      };
      ht >= 0 ? ht !== mt && (st.splice(ht, 1), st.splice(mt, 0, Ze), m.value = st, w = te, L = Ot) : (st.splice(mt, 0, Ze), m.value = st, w = te, L = Ot);
    }
    async function ne(v) {
      if (o.value !== "sites" || qe.isOpen) return !1;
      if (m.value) {
        const C = m.value.map((T) => ({
          type: T.type,
          id: T.type === "link" ? String(T.link.id) : void 0,
          groupName: T.type === "folder" ? T.folder.groupName : void 0
        }));
        return await oe.moveLinkTo(String(v.id), re.activePage, "常用网站"), await oe.reorderPageItems(re.activePage, C), m.value = null, w = "", !0;
      }
      return !1;
    }
    const B = we({
      visible: !1,
      x: 0,
      y: 0,
      type: "link",
      link: null,
      folder: null,
      offsetX: 34,
      offsetY: 38
    });
    let D = null, y = 0, _ = 0, O = null, U = null, E = !1;
    function j(v, C) {
      if (C.button !== 0) return;
      D = C.pointerId, y = C.clientX, _ = C.clientY, u = C.clientX, d = C.clientY, O = String(v.id), U = null, E = !1;
      const T = C.currentTarget.getBoundingClientRect();
      B.offsetX = C.clientX - T.left, B.offsetY = C.clientY - T.top, B.type = "link", B.link = v, B.folder = null, window.addEventListener("pointermove", P, { passive: !1 }), window.addEventListener("pointerup", pe), window.addEventListener("pointercancel", pe);
    }
    function R(v, C, T) {
      if (T.button !== 0 || T.target.closest(".launcher-folder-del-btn")) return;
      D = T.pointerId, y = T.clientX, _ = T.clientY, u = T.clientX, d = T.clientY, O = null, U = v, E = !1;
      const I = T.currentTarget.getBoundingClientRect();
      B.offsetX = T.clientX - I.left, B.offsetY = T.clientY - I.top, B.type = "folder", B.folder = {
        groupName: v,
        size: Ue(v),
        links: C?.links || []
      }, B.link = null, window.addEventListener("pointermove", P, { passive: !1 }), window.addEventListener("pointerup", pe), window.addEventListener("pointercancel", pe);
    }
    let q = 0, ye = null;
    function W() {
      cancelAnimationFrame(q), q = 0, ye = null;
    }
    function P(v) {
      v.pointerId === D && (E && v.cancelable && v.preventDefault(), ye = v, !q && (q = requestAnimationFrame(() => {
        q = 0;
        const C = ye;
        ye = null, C && H(C);
      })));
    }
    function H(v) {
      if (v.pointerId !== D || !O && !U) return;
      const C = Math.hypot(v.clientX - y, v.clientY - _);
      if (!E && C > Qc && (E = !0, S = !0, O ? p.value = O : U && (x.value = U)), !E) return;
      (B.link || B.folder) && (B.visible = !0, B.x = v.clientX - B.offsetX, B.y = v.clientY - B.offsetY);
      const T = document.elementsFromPoint(v.clientX, v.clientY);
      if (Xn()) {
        const te = T.some(
          (Fe) => Fe.id === "launcher-folder-dialog" || !!Fe.closest?.("#launcher-folder-dialog")
        ), se = document.querySelector("#launcher-folder-dialog");
        if (te && se) {
          se.classList.add("drop-hover-valid"), qe.dropHoverValid = !0;
          return;
        } else
          se?.classList.remove("drop-hover-valid"), qe.dropHoverValid = !1;
        m.value = null;
        return;
      }
      const J = m.value || ze.value, he = O ? `link-${O}` : `folder-${U}`;
      if (J.length) {
        const te = T.find((se) => {
          if (se.classList.contains("launcher-link")) {
            const Fe = se.getAttribute("data-launcher-id");
            return Fe && `link-${Fe}` !== he;
          }
          if (se.classList.contains("launcher-folder")) {
            const Fe = se.getAttribute("data-launcher-folder");
            return Fe && `folder-${Fe}` !== he;
          }
          return !1;
        });
        if (te) {
          const se = te.classList.contains("launcher-link"), Fe = se ? te.getAttribute("data-launcher-id") : null, rn = se ? null : te.getAttribute("data-launcher-folder"), so = se ? `link-${Fe}` : `folder-${rn}`, Ot = te.getBoundingClientRect();
          let Bt = !0;
          O && !se && (td(Ot, v.clientX, v.clientY) ? (Bt = !1, te.classList.add("drop-target")) : te.classList.remove("drop-target"));
          const st = Date.now();
          if (od(Ot, v.clientX, v.clientY) || (Bt = !1), so === k && st - $ < ed && (Bt = !1), Bt) {
            document.querySelectorAll(".launcher-folder.drop-target").forEach((Ze) => Ze.classList.remove("drop-target"));
            const ht = J.findIndex((Ze) => Ze.key === he), mt = J.findIndex((Ze) => Ze.key === so);
            if (ht >= 0 && mt >= 0 && ht !== mt) {
              const Ze = J.slice(), Pe = Ze.splice(ht, 1)[0];
              Ze.splice(mt, 0, Pe), m.value = Ze, k = so, $ = st;
            }
          }
        }
      }
      const De = T.find((te) => te.classList.contains("launcher-page-tab"));
      if (De) {
        const te = De.getAttribute("data-page");
        te && te !== re.activePage && De.classList.add("drop-target");
      } else
        document.querySelectorAll(".launcher-page-tab.drop-target").forEach((te) => te.classList.remove("drop-target"));
    }
    async function pe(v) {
      if (v.pointerId === D) {
        W(), v.type === "pointercancel" ? xe() : H(v), window.removeEventListener("pointermove", P), window.removeEventListener("pointerup", pe), window.removeEventListener("pointercancel", pe);
        try {
          if (E) {
            f = Date.now(), S = !1;
            const C = document.elementsFromPoint(v.clientX, v.clientY);
            if (document.querySelectorAll(".launcher-page-tab.drop-target").forEach((I) => I.classList.remove("drop-target")), document.querySelectorAll(".launcher-folder.drop-target").forEach((I) => I.classList.remove("drop-target")), Xn() && qe.activeFolder) {
              if (C.some(
                (J) => J.id === "launcher-folder-dialog" || !!J.closest?.("#launcher-folder-dialog")
              )) {
                const he = C.find((De) => De.hasAttribute("data-child-folder"))?.getAttribute("data-child-folder") || qe.activeFolder;
                O ? await oe.moveLinkTo(O, void 0, he) : U && await oe.moveFolderInto(U, he);
              }
              return;
            }
            const T = C.find((I) => I.classList.contains("launcher-page-tab"));
            if (T) {
              const I = T.getAttribute("data-page");
              if (I) {
                O ? (await oe.moveLinkTo(O, I, "常用网站"), await oe.setPage(I)) : U && await oe.moveFolderToPage(U, I), xe();
                return;
              }
            }
            if (O) {
              const I = C.find((J) => J.classList.contains("launcher-folder"));
              if (I) {
                const J = I.getAttribute("data-launcher-folder");
                if (J) {
                  await oe.moveLinkTo(O, re.activePage, J), xe();
                  return;
                }
              }
            }
            if (m.value) {
              const I = m.value.map((J) => ({
                type: J.type,
                id: J.type === "link" ? String(J.link.id) : void 0,
                groupName: J.type === "folder" ? J.folder.groupName : void 0
              }));
              await oe.reorderPageItems(re.activePage, I);
            }
          }
        } catch (C) {
          Ae.show({ appName: "常用网站", title: "移动未完成", message: C instanceof Error ? C.message : "请刷新核对，未自动重试。" });
        } finally {
          xe();
        }
      }
    }
    function xe() {
      W(), D = null, O = null, U = null, E = !1, S = !1, p.value = null, x.value = null, m.value = null, B.visible = !1, B.link = null, B.folder = null, k = "", document.querySelector("#launcher-folder-dialog")?.classList.remove("drop-hover-valid"), qe.dropHoverValid = !1, window.removeEventListener("pointermove", P), window.removeEventListener("pointerup", pe), window.removeEventListener("pointercancel", pe);
    }
    xt(() => {
      $e.setExternalDragHandler(null), $e.setExternalDropHandler(null), xe(), window.removeEventListener("blur", r), window.removeEventListener("pagehide", r), document.removeEventListener("visibilitychange", r), window.removeEventListener("pointermove", P), window.removeEventListener("pointerup", pe), window.removeEventListener("pointercancel", pe);
    });
    function je(v) {
      const C = re.pageLabels;
      return C && C[v] ? C[v] : v || "常用网站";
    }
    function Le(v, C) {
      const T = String(v.page || "").trim(), I = String(C).trim(), J = re.pageLabels || {}, he = !T || T === "常用网站" || T === "默认";
      if (!I || I === "常用网站" || I === "默认") return he;
      if (he) return !1;
      if (T === I) return !0;
      const te = J[T] || T, se = J[I] || I;
      return te === se || T === se || te === I;
    }
    function Ue(v) {
      const C = re.groupSizes;
      return C && C[v] === "large" ? "large" : "small";
    }
    function Re(v) {
      return v === "large" ? 9 : 4;
    }
    function Je(v, C) {
      const T = Re(C), I = v.length > T ? T - 1 : T;
      return v.slice(0, I);
    }
    const ze = ae(() => {
      const v = re.activePage || "常用网站", T = re.links.filter(
        (te) => Le(te, v)
      ), I = /* @__PURE__ */ new Map();
      T.forEach((te) => {
        const se = te.group || "常用网站";
        se !== "常用网站" && (I.has(se) || I.set(se, []), I.get(se).push(te));
      });
      const J = /* @__PURE__ */ new Set(), he = [];
      T.forEach((te) => {
        const se = te.group || "常用网站";
        Yo(re.folders, se) || (se === "常用网站" ? he.push({ key: `link-${te.id}`, type: "link", link: te }) : J.has(se) || (J.add(se), he.push({
          key: `folder-${se}`,
          type: "folder",
          folder: {
            groupName: se,
            pageName: v,
            links: I.get(se) || []
          }
        })));
      });
      const De = re.folders;
      return De && Object.entries(De).forEach(([te, se]) => {
        if (Yo(re.folders, te)) return;
        const Fe = se?.page || "常用网站";
        (Fe === v || v === "常用网站" && Fe === "默认") && !J.has(te) && (J.add(te), he.push({
          key: `folder-${te}`,
          type: "folder",
          folder: {
            groupName: te,
            pageName: v,
            links: I.get(te) || []
          }
        }));
      }), he;
    }), Ge = ae(() => m.value && m.value.length ? m.value : ze.value), ns = ae(() => {
      const v = re.activePage || "常用网站", C = je(v);
      return C === "默认" || v === "常用网站" ? "还没有快捷入口，点击“编辑入口”后添加。" : `“${C}”还是空的，把网站拖到这里。`;
    });
    function Yn(v) {
      m.value = null, p.value = null, x.value = null, $e.switchPage(v);
    }
    function is() {
      l.value = !0, h.value = "", ft(() => {
        g.value?.focus();
      });
    }
    function qn() {
      if (!l.value) return;
      const v = h.value.trim();
      l.value = !1, v && $e.addPage(v);
    }
    function ss(v) {
      v.key === "Enter" ? (v.preventDefault(), qn()) : v.key === "Escape" && (l.value = !1);
    }
    function rs(v, C) {
      $e.openPageMenu(v, C);
    }
    function as(v) {
      const C = v.target;
      if (!C || C.closest(".launcher-link") || C.closest(".launcher-folder") || C.closest(".launcher-page-tab") || C.closest("button") || C.closest("input"))
        return;
      v.preventDefault();
      const T = re.activePage || "常用网站";
      Zt.openBlankMenu(T, v.clientX, v.clientY);
    }
    function ls(v) {
      o.value === "sites" && (!v.shiftKey || re.pages.length < 2 || (v.preventDefault(), v.deltaY > 0 || v.deltaX > 0 ? $e.nextPage() : $e.prevPage()));
    }
    function cs(v) {
      v.target.closest(".launcher-page-tab") || v.stopPropagation();
    }
    function ds(v) {
      v.button === 0 && (u = v.clientX, d = v.clientY);
    }
    function us(v, C) {
      C.preventDefault(), C.stopPropagation(), D || (S = !1), !(Math.hypot(C.clientX - u, C.clientY - d) >= 6 || S || Date.now() - f < 600) && $e.openLink(v, C);
    }
    function ps(v, C) {
      $e.openLinkMenu(v, C);
    }
    function fs(v, C) {
      if (D || (S = !1), S || Date.now() - f < 450) {
        C.preventDefault(), C.stopPropagation();
        return;
      }
      $e.openFolder(v, C);
    }
    function gs(v, C, T) {
      $e.openFolderMenu(v, C, T);
    }
    function hs(v) {
      $e.deleteFolder(v);
    }
    function ms(v, C) {
      const T = Array.from(C.dataTransfer?.types || []);
      if (!T.includes("application/x-newtab-launcher") && !T.includes("application/x-newtab-bookmark") && !T.includes("text/uri-list") && !T.includes("text/plain")) return;
      C.preventDefault(), C.dataTransfer && (C.dataTransfer.dropEffect = "move"), re.activePage !== v && Yn(v), C.currentTarget?.classList.add("drop-target");
    }
    function vs(v) {
      v.currentTarget?.classList.remove("drop-target");
    }
    async function ys(v, C) {
      C.currentTarget?.classList.remove("drop-target");
      let I = "";
      const J = C.dataTransfer?.getData("application/x-newtab-launcher");
      if (J)
        try {
          I = String(JSON.parse(J)?.id || "");
        } catch {
        }
      if (!I && (p.value || window.__activeLauncherLink) && (I = String(window.__activeLauncherLink?.id || p.value || "")), I) {
        C.preventDefault(), C.stopPropagation(), await oe.moveLinkTo(I, v, "常用网站"), await oe.setPage(v);
        return;
      }
      const he = window;
      typeof he.importDroppedLauncherItem == "function" && (C.preventDefault(), C.stopPropagation(), await he.importDroppedLauncherItem(C, "常用网站", v));
    }
    function bs(v) {
      const C = Array.from(v.dataTransfer?.types || []);
      if (!C.includes("application/x-newtab-launcher") && !C.includes("application/x-newtab-bookmark") && !C.includes("text/uri-list") && !C.includes("text/plain")) return;
      v.preventDefault(), v.dataTransfer && (v.dataTransfer.dropEffect = C.includes("application/x-newtab-launcher") ? "move" : "copy"), v.currentTarget?.classList.add("drop-target");
    }
    function ws(v) {
      const C = v.currentTarget;
      C?.contains(v.relatedTarget) || C?.classList.remove("drop-target");
    }
    async function ks(v) {
      v.currentTarget?.classList.remove("drop-target");
      let T = "";
      const I = v.dataTransfer?.getData("application/x-newtab-launcher");
      if (I)
        try {
          T = String(JSON.parse(I)?.id || "");
        } catch {
        }
      if (!T && (p.value || window.__activeLauncherLink) && (T = String(window.__activeLauncherLink?.id || p.value || "")), T) {
        v.preventDefault(), v.stopPropagation(), await oe.moveLinkTo(T, re.activePage, "常用网站");
        return;
      }
      const J = window;
      if (typeof J.importDroppedLauncherItem == "function") {
        v.preventDefault(), v.stopPropagation(), await J.importDroppedLauncherItem(v, "常用网站", re.activePage);
        return;
      }
      const he = v.dataTransfer?.getData("text/plain");
      he && /^https?:\/\//i.test(he.trim()) && (v.preventDefault(), v.stopPropagation(), await oe.addLink({
        title: "",
        url: he.trim(),
        page: re.activePage
      }));
    }
    function Xn() {
      if (!qe.isOpen) return !1;
      if (typeof document < "u") {
        const v = document.querySelector("#launcher-folder-dialog");
        return !!(v && v.open);
      }
      return !1;
    }
    function _s(v, C) {
      C.preventDefault();
    }
    function Cs(v) {
      v.preventDefault(), v.dataTransfer && (v.dataTransfer.dropEffect = "move"), v.currentTarget?.classList.add("drop-target");
    }
    function xs(v) {
      v.currentTarget?.classList.remove("drop-target");
    }
    async function Ls(v, C) {
      C.currentTarget?.classList.remove("drop-target"), C.preventDefault(), C.stopPropagation();
      const I = C.dataTransfer?.getData("application/x-newtab-launcher-folder");
      if (I && I !== v) {
        try {
          await oe.moveFolderInto(I, v);
        } catch (De) {
          Ae.show({ appName: "常用网站", title: "移动未完成", message: De instanceof Error ? De.message : "请刷新后核对。" });
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
      !J && (p.value || window.__activeLauncherLink) && (J = String(window.__activeLauncherLink?.id || p.value || "")), J && await oe.moveLinkTo(J, re.activePage, v);
    }
    return (v, C) => (a(), c(K, null, [
      s(re).showSites ? (a(), c("section", {
        key: 0,
        class: "launcher-group launcher-sites size-large",
        onWheel: ls
      }, [
        n("header", {
          class: "launcher-group-head launcher-sites-head",
          onPointerdown: C[5] || (C[5] = F(() => {
          }, ["stop"])),
          onContextmenu: cs
        }, [
          n("div", wd, [
            n("button", {
              type: "button",
              disabled: i.value,
              "aria-pressed": o.value === "sites",
              onClick: C[0] || (C[0] = (T) => o.value = "sites")
            }, "常用网站", 8, kd),
            n("button", {
              type: "button",
              disabled: i.value,
              "aria-pressed": o.value === "bookmarks",
              onClick: C[1] || (C[1] = (T) => o.value = "bookmarks")
            }, "书签", 8, _d)
          ]),
          Oe(n("div", Cd, [
            (a(!0), c(K, null, ge(s(re).pages, (T) => (a(), c("button", {
              key: T,
              type: "button",
              class: le(["launcher-page-tab", { active: T === s(re).activePage }]),
              "data-page": T,
              role: "tab",
              title: `切换到${je(T)}；拖动网站到这里可移动分区；右键管理分区`,
              onPointerdown: C[2] || (C[2] = F(() => {
              }, ["stop"])),
              onClick: F((I) => Yn(T), ["prevent", "stop"]),
              onContextmenu: F((I) => rs(T, I), ["prevent", "stop"]),
              onDragover: (I) => ms(T, I),
              onDragleave: C[3] || (C[3] = (I) => vs(I)),
              onDrop: (I) => ys(T, I)
            }, b(je(T)), 43, xd))), 128)),
            l.value ? Oe((a(), c("input", {
              key: 1,
              ref_key: "pageInputRef",
              ref: g,
              class: "launcher-page-input",
              maxlength: "12",
              placeholder: "例如：游戏区",
              "onUpdate:modelValue": C[4] || (C[4] = (T) => h.value = T),
              onKeydown: ss,
              onBlur: qn
            }, null, 544)), [
              [eo, h.value]
            ]) : (a(), c("button", {
              key: 0,
              class: "launcher-page-add",
              type: "button",
              title: "添加网站分区，例如游戏区",
              "aria-label": "添加网站分区",
              onClick: is
            }, " + "))
          ], 512), [
            [to, o.value === "sites"]
          ]),
          o.value === "bookmarks" ? (a(), c("div", Ld)) : M("", !0)
        ], 32),
        o.value === "bookmarks" ? (a(), ce(s(t), {
          key: 0,
          "header-target": "#bookmark-board-header",
          onBusy: C[6] || (C[6] = (T) => i.value = T)
        })) : M("", !0),
        Oe(n("div", {
          class: "launcher-page-panel",
          "data-page": s(re).activePage,
          hidden: !1,
          role: "tabpanel",
          onContextmenu: as,
          onDragover: C[12] || (C[12] = (T) => bs(T)),
          onDragleave: C[13] || (C[13] = (T) => ws(T)),
          onDrop: C[14] || (C[14] = (T) => ks(T))
        }, [
          (a(), ce(Vo, {
            tag: "div",
            class: "launcher-items launcher-site-items",
            key: s(re).activePage,
            name: p.value || x.value ? "launcher-grid" : ""
          }, {
            default: Qt(() => [
              (a(!0), c(K, null, ge(Ge.value, (T) => (a(), c(K, {
                key: T.key
              }, [
                T.type === "link" ? (a(), c("a", {
                  key: T.key,
                  class: le(["launcher-link", {
                    "is-dragging": p.value === String(T.link.id)
                  }]),
                  href: T.link.url,
                  title: T.link.title + (T.link.note ? `
📝 ` + T.link.note : "") + `
🔗 ` + T.link.url,
                  "data-launcher-id": String(T.link.id),
                  target: "_blank",
                  rel: "noreferrer",
                  draggable: "false",
                  onDragstart: C[7] || (C[7] = F(() => {
                  }, ["prevent"])),
                  onPointerdown: (I) => j(T.link, I),
                  onMousedown: C[8] || (C[8] = (I) => ds(I)),
                  onClick: F((I) => us(T.link, I), ["prevent"]),
                  onContextmenu: F((I) => ps(T.link, I), ["prevent"])
                }, [
                  Q(bi, {
                    link: T.link
                  }, null, 8, ["link"])
                ], 42, Td)) : T.type === "folder" ? (a(), c("div", {
                  key: T.key,
                  class: le(["launcher-folder", [
                    `size-${Ue(T.folder.groupName)}`,
                    { "is-dragging": x.value === T.folder.groupName }
                  ]]),
                  title: `${T.folder.groupName}
可拖动调整位置；右键调整收藏夹大小`,
                  role: "button",
                  tabindex: "0",
                  "data-launcher-folder": String(T.folder.groupName),
                  draggable: "true",
                  onPointerdown: (I) => R(T.folder.groupName, T.folder, I),
                  onDragstart: (I) => _s(T.folder.groupName, I),
                  onDragover: C[10] || (C[10] = (I) => Cs(I)),
                  onDragleave: C[11] || (C[11] = (I) => xs(I)),
                  onDrop: (I) => Ls(T.folder.groupName, I),
                  onClick: (I) => fs(T.folder.groupName, I),
                  onContextmenu: F((I) => gs(T.folder.groupName, T.folder.pageName, I), ["prevent"])
                }, [
                  Q(bi, {
                    folder: { title: T.folder.groupName, preview: T.folder.links, count: T.folder.links.length },
                    size: Ue(T.folder.groupName)
                  }, {
                    default: Qt(() => [
                      n("button", {
                        class: "launcher-folder-del-btn",
                        type: "button",
                        title: `删除文件夹「${T.folder.groupName}」`,
                        "aria-label": "删除文件夹",
                        onPointerdown: C[9] || (C[9] = F(() => {
                        }, ["stop"])),
                        onClick: F((I) => hs(T.folder.groupName), ["stop", "prevent"])
                      }, " ✕ ", 40, Id)
                    ]),
                    _: 2
                  }, 1032, ["folder", "size"]),
                  n("span", Md, b(T.folder.links.length), 1)
                ], 42, Sd)) : M("", !0)
              ], 64))), 128)),
              Ge.value.length ? M("", !0) : (a(), c("p", Dd, b(ns.value), 1))
            ]),
            _: 1
          }, 8, ["name"]))
        ], 40, $d), [
          [to, o.value === "sites"]
        ])
      ], 32)) : M("", !0),
      s(re).hasTodo || s(re).hasBili ? (a(), c("div", Ed, [
        s(re).hasTodo ? (a(), ce(bd, { key: 0 })) : s(re).hasBili ? (a(), c("div", Ad)) : M("", !0)
      ])) : M("", !0),
      (a(), ce(gt, { to: "body" }, [
        B.visible ? (a(), c("div", {
          key: 0,
          class: le(["launcher-drag-ghost", [
            B.type === "folder" ? `folder-ghost size-${B.folder?.size}` : "link-ghost"
          ]]),
          style: ve({
            left: `${B.x}px`,
            top: `${B.y}px`
          })
        }, [
          B.type === "folder" && B.folder ? (a(), c(K, { key: 0 }, [
            n("div", Pd, [
              (a(!0), c(K, null, ge(Je(B.folder.links, B.folder.size), (T, I) => (a(), ce(Qo, {
                key: T.id || I,
                link: T,
                mini: !0
              }, null, 8, ["link"]))), 128))
            ]),
            n("span", Wd, b(B.folder.groupName), 1)
          ], 64)) : B.link ? (a(), c(K, { key: 1 }, [
            Q(Qo, {
              link: B.link
            }, null, 8, ["link"]),
            n("span", Od, b(B.link.title), 1)
          ], 64)) : M("", !0)
        ], 6)) : M("", !0)
      ]))
    ], 64));
  }
}), es = /* @__PURE__ */ Te(Bd, [["__scopeId", "data-v-d859c57a"]]), Ko = Object.keys(io);
let Ro = !1, Ln = 0, ho, $n;
function ki(e) {
  for (const t of Ko)
    Object.prototype.hasOwnProperty.call(e, t) && (io[t] = e[t] !== !1);
}
function Rd() {
  const e = io;
  $e.setPrefs(e.showSites, e.showTodo, !e.showTodo && e.showBili), document.body.classList.toggle("hide-weather", !e.showWeather), document.body.classList.toggle("hide-sites", !e.showSites), document.body.classList.toggle("hide-bili", !e.showBili), document.body.classList.toggle("hide-youtube", !e.showYouTube), document.body.classList.toggle("hide-todo", !e.showTodo), document.body.classList.toggle("hide-bookmarks", !e.showBookmarkPanel), e.showBookmarkPanel || en.close();
}
const _i = {
  start() {
    if (Ro) return;
    Ro = !0;
    const e = ++Ln;
    $n = Ve(() => Ko.map((o) => io[o]), Rd, { immediate: !0, flush: "sync" });
    const t = globalThis.chrome;
    ho = (o, i) => {
      if (i !== "local") return;
      const r = {};
      for (const l of Ko) o[l] && (r[l] = o[l].newValue);
      ki(r);
    }, t?.storage?.onChanged?.addListener(ho), t?.storage?.local && t.storage.local.get(Ko).then((o) => {
      Ro && Ln === e && ki(o || {});
    }).catch((o) => console.warn("[HomePrefs] 读取首页设置失败", o));
  },
  stop() {
    Ro = !1, Ln++, $n?.(), $n = void 0, ho && globalThis.chrome?.storage?.onChanged?.removeListener(ho), ho = void 0;
  }
}, Fd = {
  id: "launcher",
  class: "launcher",
  "aria-label": "快捷入口"
}, Nd = { class: "launcher-inner" }, Hd = { class: "launcher-overview" }, jd = {
  class: "launcher-widget launcher-weather",
  "data-home-module": "weather",
  title: "右键此处可快速切换天气地点"
}, zd = { id: "weather-body" }, Gd = { class: "launcher-center" }, Kd = {
  class: "hero-clock",
  id: "hero-clock"
}, Vd = {
  class: "launcher-widget launcher-task-threads launcher-music-card",
  "data-home-module": "taskThreads"
}, Ud = {
  id: "task-thread-home",
  class: "task-thread-home home-music-body"
}, Yd = /* @__PURE__ */ de({
  __name: "AppLauncher",
  setup(e) {
    He(() => {
      Uo.initWallpaper();
    });
    function t() {
      Se.handleToolClick("music");
    }
    return (o, i) => (a(), c("section", Fd, [
      i[5] || (i[5] = n("div", {
        id: "hero-background-media",
        class: "hero-background-media",
        "aria-hidden": "true"
      }, null, -1)),
      n("div", Nd, [
        n("div", Hd, [
          Oe(n("section", jd, [
            i[1] || (i[1] = n("header", { class: "card-head" }, [
              n("span", {
                class: "bar",
                style: { background: "linear-gradient(180deg,#38bdf8,#818cf8)" }
              }),
              n("h2", { id: "wx-title" }, "天气")
            ], -1)),
            n("div", zd, [
              Q(Ji)
            ])
          ], 512), [
            [to, s(io).showWeather]
          ]),
          n("div", Gd, [
            n("div", Kd, [
              Q(bc),
              Q(Zi)
            ]),
            n("form", {
              id: "search",
              class: "search",
              onSubmit: i[0] || (i[0] = F(() => {
              }, ["prevent"]))
            }, [
              Q($i)
            ], 32)
          ]),
          n("section", Vd, [
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
            n("div", Ud, [
              Q(Qi)
            ])
          ])
        ]),
        n("div", {
          id: "launcher-groups",
          class: le(["launcher-groups", { "has-sites": s(re).showSites, "has-todoist": s(re).hasTodo, "has-bili": s(re).hasBili, "has-media": s(re).hasTodo || s(re).hasBili }])
        }, [
          Q(es)
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
}), Jt = we(/* @__PURE__ */ new Set()), St = we({}), Ye = we({});
function Tn(e) {
  const t = Xe(e);
  if (!t?.lifecycle.canUnmount || t.lifecycle.canUnmount()) return { ok: !0 };
  const o = t.lifecycle.unmountBlockedMessage || "模块操作尚未结束，不能退出或重载。";
  return Ae.show({ appName: t.title, title: "操作进行中", message: o, showActions: !1 }), { ok: !1, error: o };
}
const Me = {
  // 检查应用是否处于运行显示状态（驱动 Dock 上的小圆点：关闭即熄灭，不保留 macOS 风格后台悬浮绿点）
  isRunning(e) {
    return this.isVisible(e);
  },
  // 检查应用当前是否在屏幕上可见（窗口是否打开）
  isVisible(e) {
    const t = Xe(e);
    return t ? t.lifecycle.isVisible() : dn(e) ? !!rr[e] : ar(e);
  },
  // 标记应用启动
  markRunning(e) {
    Jt.add(e), (e in Ye || Xe(e)) && (Ye[e] = !0);
  },
  // 获取组件当前的 render key
  getRenderKey(e) {
    return St[e] || 0;
  },
  // 打开 / 显示应用窗口
  openApp(e) {
    const t = Xe(e);
    if (t) {
      Se.open(e), t.lifecycle.isVisible() && this.markRunning(e);
      return;
    }
    if (this.markRunning(e), dn(e)) {
      ti.open(e);
      return;
    }
    Se.open(e);
  },
  // 隐藏/关闭窗口：立即退出可见运行态并熄灭 Dock 指示绿点
  hideApp(e) {
    if (Jt.delete(e), Xe(e)) {
      Se.close(e);
      return;
    }
    if (dn(e)) {
      ti.close(e);
      return;
    }
    Se.close(e);
  },
  // 真正的关闭（Quit / 彻底从内存与 DOM 中卸载销毁，熄灭小圆点）
  async quitApp(e) {
    if (Xe(e)) {
      const r = Tn(e);
      if (!r.ok) return r;
      const l = Xe(e)?.lifecycle.beforeQuit;
      if (l) {
        const p = $t(e);
        try {
          await l();
        } catch {
          const m = "后台停止未确认，窗口保留；未自动重试，请检查后台状态。";
          return Ae.show({ appName: Xe(e).title, title: "未退出", message: m, showActions: !1 }), { ok: !1, error: m };
        }
        if ($t(e) !== p) return { ok: !1, error: "窗口已有后续操作，未卸载。" };
        const x = Tn(e);
        if (!x.ok) return x;
      }
      const h = Se.close(e), g = $t(e);
      return Jt.delete(e), Ye[e] = !1, ct.removeActiveTool(e), await h, await ft(), $t(e) === g ? { ok: !0 } : { ok: !1, error: "模块已有后续操作，退出状态已变化。" };
    }
    this.hideApp(e), Jt.delete(e), ct.removeActiveTool(e), e in Ye && (Ye[e] = !1);
    const t = sr;
    t.activeId === e && (t.activeId = "");
    const o = t.openOrder.indexOf(e);
    o >= 0 && t.openOrder.splice(o, 1);
    const i = t.activeTools.indexOf(e);
    i >= 0 && t.activeTools.splice(i, 1), Se.render();
  },
  // 重新加载（Reload / 单应用热重启，重新初始化组件）
  async reloadApp(e) {
    const t = Xe(e);
    if (t) {
      if (t.lifecycle.canOpen && !t.lifecycle.canOpen()) return { ok: !1, error: "模块当前不能打开，未重载窗口。" };
      const o = Tn(e);
      if (!o.ok) return o;
      const i = Se.close(e), r = $t(e);
      return await i, $t(e) !== r ? { ok: !1, error: "模块已有后续操作，重载已取消。" } : (Ye[e] = !1, await ft(), $t(e) !== r ? { ok: !1, error: "模块已有后续操作，未重新打开。" } : (St[e] = (St[e] || 0) + 1, Se.open(e), t.lifecycle.isVisible() ? (this.markRunning(e), { ok: !0 }) : { ok: !1, error: "模块当前不能打开，未重新显示窗口。" }));
    }
    this.hideApp(e), e in Ye ? (Ye[e] = !1, await ft(), St[e] = (St[e] || 0) + 1, Ye[e] = !0) : St[e] = (St[e] || 0) + 1, await ft(), this.openApp(e);
  }
}, Ht = /* @__PURE__ */ de({
  __name: "DockCardModuleHost",
  props: {
    id: {}
  },
  setup(e) {
    const o = Xe(e.id);
    if (!o || o.presentation !== "card") throw new Error("Unknown registered workspace card");
    const i = o;
    i.mountPolicy === "workspace-ready" && Me.markRunning(i.id), Ve(i.lifecycle.isVisible, (x) => {
      x && Me.markRunning(i.id);
    }, { immediate: !0, flush: "sync" });
    const r = ae(() => !!Ye[i.id]);
    function l() {
      try {
        i.lifecycle.hide();
      } catch {
      }
      (kt.activeId === i.id || kt.activeId === i.rootId) && (kt.activeId = null), Me.hideApp(i.id), typeof document < "u" && document.body.classList.remove("has-card-fullscreen");
    }
    function h() {
      Me.reloadApp(i.id);
    }
    function g() {
      typeof window < "u" && window.location.reload();
    }
    const p = G({
      loader: i.loadView,
      onError(x, m, S, f) {
        f <= 2 ? m() : S();
      },
      errorComponent: de({
        setup: () => () => i.lifecycle.isVisible() ? We("section", { class: "card wide card-fullscreen", role: "alert" }, [
          We("h2", i.title),
          We("p", "工作区切片加载受阻（可能因插件重载或切片更新）。可点击「重新加载模块」，或返回首页。"),
          We("div", { style: "display: flex; gap: 10px; margin-top: 14px;" }, [
            We("button", {
              type: "button",
              style: "padding: 6px 14px; border-radius: 999px; border: 1px solid var(--border); background: var(--primary, #3b82f6); color: #fff; cursor: pointer; font-size: 12px; font-weight: 500;",
              onClick: g
            }, "⟳ 刷新标签页 (加载最新版)"),
            We("button", {
              type: "button",
              style: "padding: 6px 14px; border-radius: 999px; border: 1px solid var(--border); background: var(--surface); color: var(--text); cursor: pointer; font-size: 12px;",
              onClick: h
            }, "↻ 重新加载模块"),
            We("button", {
              type: "button",
              style: "padding: 6px 14px; border-radius: 999px; border: 1px solid var(--border); background: var(--surface); color: var(--text); cursor: pointer; font-size: 12px;",
              onClick: l
            }, "返回首页")
          ])
        ]) : null
      })
    });
    return no(() => {
      l(), Jt.delete(i.id), delete Ye[i.id];
    }), (x, m) => r.value ? (a(), ce(Ii(s(p)), {
      key: s(Me).getRenderKey(s(i).id)
    })) : M("", !0);
  }
}), qd = { class: "logicweaver-workspaces-layer" }, Xd = {
  key: 0,
  id: "daily-section",
  class: "wrap"
}, Jd = { id: "vue-todoist-root" }, Zd = { id: "vue-bili-favorites-root" }, Qd = { id: "vue-youtube-root" }, eu = { id: "vue-pricing-root" }, tu = { id: "vue-aihot-root" }, ou = /* @__PURE__ */ de({
  __name: "AppWorkspaces",
  setup(e) {
    const t = N(!!kt.activeId);
    return He(() => {
      t.value || (typeof window < "u" && "requestIdleCallback" in window ? window.requestIdleCallback(() => {
        t.value = !0;
      }, { timeout: 80 }) : setTimeout(() => {
        t.value = !0;
      }, 40));
    }), (o, i) => (a(), c("div", qd, [
      t.value ? (a(), c("main", Xd, [
        n("div", Jd, [
          Q(Ht, { id: "todoist" })
        ]),
        n("div", Zd, [
          Q(Ht, { id: "daily-bilibili" })
        ]),
        Oe(n("div", Qd, [
          Q(Ht, { id: "daily-youtube" })
        ], 512), [
          [to, s(io).showYouTube]
        ]),
        n("div", eu, [
          Q(Ht, { id: "daily-pricing" })
        ]),
        n("div", tu, [
          Q(Ht, { id: "daily-aihot" })
        ]),
        Q(Ht, { id: "card-github" })
      ])) : M("", !0)
    ]));
  }
}), nu = ["aria-label"], iu = { class: "dock-menu-head" }, su = { class: "dock-menu-title" }, ru = ["src", "alt"], au = {
  key: 1,
  class: "dock-menu-emoji"
}, lu = /* @__PURE__ */ de({
  __name: "DockContextMenu",
  props: {
    target: {}
  },
  emits: ["close", "action"],
  setup(e, { emit: t }) {
    const o = e, i = t, r = ae(() => !o.target || o.target.type !== "tool" ? !1 : Me.isRunning(o.target.id)), l = ae(() => !o.target || o.target.type !== "tool" ? !1 : Me.isVisible(o.target.id)), { menuRef: h, style: g } = Pi({
      visible: () => !!o.target,
      anchor: () => o.target || { x: 0, y: 0 },
      placement: Gt.position === "top" ? "below" : "above",
      align: "center",
      gap: 12,
      dismiss: () => i("close")
    });
    function p() {
      o.target && (Me.openApp(o.target.id), i("close"));
    }
    function x() {
      o.target && (Me.hideApp(o.target.id), i("close"));
    }
    async function m() {
      o.target && (await Me.reloadApp(o.target.id), i("close"));
    }
    async function S() {
      if (!o.target) return;
      const d = o.target;
      if ((await Me.quitApp(d.id))?.ok === !1) {
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
    async function f() {
      if (!o.target) return;
      const d = o.target, k = Lo.uninstall(d.id);
      i("close"), await k || Ae.show({
        appName: d.title,
        title: "入口停用未确认",
        subtitle: Lo.state.errorMessage || "请打开模块管理核对当前启用状态",
        icon: d.icon || "assets/logo.png",
        duration: 4e3
      });
    }
    function u() {
      if (!o.target) return;
      const k = {
        "daily-bilibili": "https://www.bilibili.com",
        "card-github": "https://github.com",
        "daily-aihot": "https://news.ycombinator.com",
        "daily-youtube": "https://www.youtube.com",
        "daily-pricing": "https://openai.com/api/pricing"
      }[o.target.id] || "https://www.bilibili.com";
      window.open(k, "_blank"), i("close");
    }
    return (d, k) => (a(), ce(gt, { to: "body" }, [
      e.target ? (a(), c("div", {
        key: 0,
        ref_key: "menuRef",
        ref: h,
        role: "group",
        "aria-label": `${e.target.title}操作`,
        class: "dock-context-menu",
        style: ve(s(g)),
        onClick: k[1] || (k[1] = F(() => {
        }, ["stop"])),
        onContextmenu: k[2] || (k[2] = F(() => {
        }, ["prevent"]))
      }, [
        n("div", iu, [
          n("div", su, [
            e.target.icon ? (a(), c("img", {
              key: 0,
              class: "dock-menu-icon",
              src: e.target.icon,
              alt: e.target.title
            }, null, 8, ru)) : e.target.emoji ? (a(), c("span", au, b(e.target.emoji), 1)) : M("", !0),
            n("strong", null, b(e.target.title), 1)
          ]),
          e.target.type === "tool" ? (a(), c("span", {
            key: 0,
            class: le(["dock-status-tag", { "is-running": r.value }])
          }, [
            k[3] || (k[3] = n("span", { class: "dock-status-dot" }, null, -1)),
            Be(" " + b(r.value ? "运行中" : "未启动"), 1)
          ], 2)) : M("", !0)
        ]),
        k[12] || (k[12] = n("div", { class: "dock-menu-divider" }, null, -1)),
        e.target.type === "tool" ? (a(), c(K, { key: 0 }, [
          l.value ? (a(), c("button", {
            key: 1,
            type: "button",
            class: "dock-menu-item",
            onClick: x
          }, [...k[5] || (k[5] = [
            n("span", { class: "dock-menu-symbol" }, "−", -1),
            n("span", null, "隐藏窗口", -1)
          ])])) : (a(), c("button", {
            key: 0,
            type: "button",
            class: "dock-menu-item",
            onClick: p
          }, [...k[4] || (k[4] = [
            n("span", { class: "dock-menu-symbol" }, "↗", -1),
            n("span", null, "打开窗口", -1)
          ])])),
          n("button", {
            type: "button",
            class: "dock-menu-item",
            onClick: m
          }, [...k[6] || (k[6] = [
            n("span", { class: "dock-menu-symbol" }, "⟲", -1),
            n("div", { class: "dock-menu-text" }, [
              n("span", null, "重新加载"),
              n("small", null, "单应用热重启")
            ], -1)
          ])]),
          k[9] || (k[9] = n("div", { class: "dock-menu-divider" }, null, -1)),
          n("button", {
            type: "button",
            class: "dock-menu-item",
            onClick: f
          }, [...k[7] || (k[7] = [
            n("span", { class: "dock-menu-symbol" }, "📌", -1),
            n("div", { class: "dock-menu-text" }, [
              n("span", null, "从 Dock 栏移出"),
              n("small", null, "可在模块管理中重新添加")
            ], -1)
          ])]),
          n("button", {
            type: "button",
            class: "dock-menu-item item-danger",
            onClick: S
          }, [...k[8] || (k[8] = [
            n("span", { class: "dock-menu-symbol" }, "✕", -1),
            n("div", { class: "dock-menu-text" }, [
              n("span", null, "真正的关闭"),
              n("small", null, "退出并释放内存")
            ], -1)
          ])])
        ], 64)) : e.target.type === "card" ? (a(), c("button", {
          key: 1,
          type: "button",
          class: "dock-menu-item",
          onClick: u
        }, [...k[10] || (k[10] = [
          n("span", { class: "dock-menu-symbol" }, "↗", -1),
          n("span", null, "在新标签页打开官网", -1)
        ])])) : (a(), c("button", {
          key: 2,
          type: "button",
          class: "dock-menu-item",
          onClick: k[0] || (k[0] = ($) => i("close"))
        }, [...k[11] || (k[11] = [
          n("span", { class: "dock-menu-symbol" }, "🏠", -1),
          n("span", null, "返回常用主页", -1)
        ])]))
      ], 44, nu)) : M("", !0)
    ]));
  }
}), cu = /* @__PURE__ */ Te(lu, [["__scopeId", "data-v-3aa85877"]]), du = { class: "mac-dock-shelf" }, uu = ["data-dock-target", "title", "onPointerdown", "onClick", "onContextmenu"], pu = ["src", "alt"], fu = {
  key: 0,
  class: "mac-dock-dot",
  "aria-hidden": "true"
}, gu = ["data-dock-tool", "title", "onPointerdown", "onClick", "onContextmenu"], hu = ["src", "alt"], mu = {
  key: 1,
  class: "mac-dock-emoji",
  "aria-hidden": "true"
}, vu = {
  key: 2,
  class: "mac-dock-dot",
  "aria-hidden": "true"
}, yu = {
  key: 3,
  class: "mac-dock-badge"
}, bu = ["src"], wu = {
  key: 1,
  class: "mac-dock-emoji"
}, ku = /* @__PURE__ */ de({
  __name: "MacDock",
  setup(e) {
    const t = ae(() => Gt), o = N(null), i = ae(() => Object.fromEntries(Gt.tools.map((E) => {
      const j = Xe(E.id)?.badgeCount?.() || 0;
      return [E.id, Number.isFinite(j) ? Math.max(0, Math.floor(j)) : 0];
    })));
    function r(E) {
      E.stopPropagation(), o.value = null, S(E.currentTarget), Lo.open();
    }
    function l(E, j) {
      j.stopPropagation(), o.value = null, S(j.currentTarget), ct.triggerItem("target", E);
    }
    function h(E, j) {
      const q = j.currentTarget.getBoundingClientRect(), ye = Gt.position, W = ye === "left" || ye === "right";
      o.value = {
        type: "card",
        id: E.id,
        title: E.title,
        icon: E.icon,
        x: W ? ye === "left" ? q.right + 8 : q.left - 8 : q.left + q.width / 2,
        y: W ? q.top + q.height / 2 : ye === "top" ? q.bottom + 8 : q.top
      };
    }
    function g(E) {
      E.stopPropagation(), o.value = null, S(E.currentTarget), ct.triggerItem("home", "home-launcher");
    }
    function p(E, j) {
      j.stopPropagation(), o.value = null, S(j.currentTarget), Xe(E) || Me.markRunning(E), ct.triggerItem("tool", E);
    }
    function x(E, j) {
      const q = j.currentTarget.getBoundingClientRect(), ye = Gt.position, W = ye === "left" || ye === "right";
      o.value = {
        type: "tool",
        id: E.id,
        title: E.title,
        icon: E.icon,
        emoji: E.emoji,
        x: W ? ye === "left" ? q.right + 8 : q.left - 8 : q.left + q.width / 2,
        y: W ? q.top + q.height / 2 : ye === "top" ? q.bottom + 8 : q.top
      };
    }
    const m = /* @__PURE__ */ new Map();
    function S(E) {
      if (!E || (m.get(E)?.cancel(), window.matchMedia("(prefers-reduced-motion: reduce)").matches)) return;
      const j = E.animate([
        { translate: "0 0", offset: 0 },
        { translate: "0 -8px", offset: 0.35 },
        { translate: "0 0", offset: 0.65 },
        { translate: "0 -2px", offset: 0.85 },
        { translate: "0 0", offset: 1 }
      ], { duration: 350, easing: "ease" });
      m.set(E, j);
      const R = () => {
        m.get(E) === j && m.delete(E);
      };
      j.onfinish = R, j.oncancel = R;
    }
    const f = N(null), u = we({
      visible: !1,
      x: 0,
      y: 0,
      width: 40,
      height: 40,
      item: null,
      type: "tool"
    }), d = N(null), k = N(null), $ = ae(() => d.value || t.value.cards), w = ae(() => k.value || t.value.tools);
    let L = "", A = 0, ne = !1, B = 0;
    function D(E, j, R) {
      if (R.button !== 0 || R.target.closest(".mac-dock-market-btn")) return;
      const W = R.currentTarget.getBoundingClientRect();
      ne = !1, f.value = {
        type: E,
        id: j.id,
        item: j,
        startX: R.clientX,
        startY: R.clientY,
        initialLeft: W.left,
        initialTop: W.top,
        width: W.width,
        height: W.height
      }, window.addEventListener("pointermove", y), window.addEventListener("pointerup", _), window.addEventListener("pointercancel", _);
    }
    function y(E) {
      if (!f.value) return;
      const j = E.clientX - f.value.startX, R = E.clientY - f.value.startY, q = Math.hypot(j, R);
      if (!ne && q > 5 && (ne = !0, u.visible = !0, u.item = f.value.item, u.type = f.value.type, u.width = f.value.width, u.height = f.value.height, f.value.type === "card" ? d.value = [...t.value.cards] : k.value = [...t.value.tools]), !ne) return;
      u.x = E.clientX - u.width / 2, u.y = E.clientY - u.height / 2;
      const W = document.elementsFromPoint(E.clientX, E.clientY).find(
        (Le) => Le.classList.contains("mac-dock-item") && !Le.classList.contains("mac-dock-market-btn")
      );
      if (!W) return;
      const P = W.getAttribute("data-dock-target"), H = W.getAttribute("data-dock-tool"), pe = f.value.type, xe = f.value.id, je = Date.now();
      if (pe === "card" && P && P !== xe && P !== "home-launcher") {
        const Le = W.getBoundingClientRect(), Ue = Le.left + Le.width / 2;
        if (Math.abs(E.clientX - Ue) > Le.width * 0.55 || P === L && je - A < 180) return;
        const Re = [...d.value || t.value.cards], Je = Re.findIndex((Ge) => Ge.id === xe), ze = Re.findIndex((Ge) => Ge.id === P);
        if (Je >= 0 && ze >= 0 && Je !== ze) {
          const Ge = Re.splice(Je, 1)[0];
          Re.splice(ze, 0, Ge), d.value = Re, L = P, A = je;
        }
      } else if (pe === "tool" && H && H !== xe) {
        const Le = W.getBoundingClientRect(), Ue = Le.left + Le.width / 2;
        if (Math.abs(E.clientX - Ue) > Le.width * 0.55 || H === L && je - A < 180) return;
        const Re = [...k.value || t.value.tools], Je = Re.findIndex((Ge) => Ge.id === xe), ze = Re.findIndex((Ge) => Ge.id === H);
        if (Je >= 0 && ze >= 0 && Je !== ze) {
          const Ge = Re.splice(Je, 1)[0];
          Re.splice(ze, 0, Ge), k.value = Re, L = H, A = je;
        }
      }
    }
    function _() {
      window.removeEventListener("pointermove", y), window.removeEventListener("pointerup", _), window.removeEventListener("pointercancel", _), ne && f.value && (B = Date.now() + 250, f.value.type === "card" && d.value ? ct.reorderCards(d.value.map((E) => E.id)) : f.value.type === "tool" && k.value && ct.reorderTools(k.value.map((E) => E.id))), u.visible = !1, u.item = null, d.value = null, k.value = null, f.value = null, ne = !1, L = "";
    }
    function O(E, j) {
      Date.now() < B || l(E, j);
    }
    function U(E, j) {
      Date.now() < B || p(E, j);
    }
    return no(() => {
      for (const E of m.values()) E.cancel();
      m.clear(), window.removeEventListener("pointermove", y), window.removeEventListener("pointerup", _), window.removeEventListener("pointercancel", _);
    }), (E, j) => (a(), c(K, null, [
      n("div", du, [
        Q(Vo, {
          tag: "div",
          class: "mac-dock-group mac-dock-cards-group",
          name: "dock-item-motion"
        }, {
          default: Qt(() => [
            (a(!0), c(K, null, ge($.value, (R) => (a(), c("button", {
              key: R.id,
              class: le(["mac-dock-item", {
                "is-active": t.value.activeTargetId === R.id,
                "is-drag-origin": f.value && f.value.id === R.id
              }]),
              type: "button",
              "data-dock-target": R.id,
              title: R.title,
              onPointerdown: (q) => D("card", R, q),
              onClick: F((q) => O(R.id, q), ["stop"]),
              onContextmenu: F((q) => h(R, q), ["prevent"])
            }, [
              n("img", {
                class: "mac-dock-icon",
                src: R.icon,
                alt: R.title
              }, null, 8, pu),
              t.value.activeTargetId === R.id ? (a(), c("span", fu)) : M("", !0)
            ], 42, uu))), 128))
          ]),
          _: 1
        }),
        j[5] || (j[5] = n("div", {
          class: "mac-dock-divider",
          "aria-hidden": "true"
        }, null, -1)),
        n("button", {
          class: "mac-dock-item",
          type: "button",
          "data-dock-target": "home-launcher",
          title: "常用主页",
          onClick: j[0] || (j[0] = F((R) => g(R), ["stop"]))
        }, [...j[3] || (j[3] = [
          n("img", {
            class: "mac-dock-icon",
            src: "assets/nav-home.svg",
            alt: "主页"
          }, null, -1)
        ])]),
        j[6] || (j[6] = n("div", {
          class: "mac-dock-divider mac-dock-divider-dark",
          "aria-hidden": "true"
        }, null, -1)),
        Q(Vo, {
          tag: "div",
          class: "mac-dock-group mac-dock-tools-group",
          name: "dock-item-motion"
        }, {
          default: Qt(() => [
            (a(!0), c(K, null, ge(w.value, (R) => (a(), c("button", {
              key: R.id,
              class: le(["mac-dock-item", {
                "is-active": s(Me).isRunning(R.id),
                "is-drag-origin": f.value && f.value.id === R.id
              }]),
              type: "button",
              "data-dock-tool": R.id,
              title: R.title,
              onPointerdown: (q) => D("tool", R, q),
              onClick: F((q) => U(R.id, q), ["stop"]),
              onContextmenu: F((q) => x(R, q), ["prevent"])
            }, [
              R.icon ? (a(), c("img", {
                key: 0,
                class: "mac-dock-icon",
                src: R.icon,
                alt: R.title
              }, null, 8, hu)) : R.emoji ? (a(), c("span", mu, b(R.emoji), 1)) : M("", !0),
              s(Me).isRunning(R.id) ? (a(), c("span", vu)) : M("", !0),
              i.value[R.id] > 0 ? (a(), c("span", yu, b(i.value[R.id] > 99 ? "99+" : i.value[R.id]), 1)) : M("", !0)
            ], 42, gu))), 128))
          ]),
          _: 1
        }),
        n("button", {
          class: le(["mac-dock-item mac-dock-market-btn", { "is-active": s(Lo).state.isOpen }]),
          type: "button",
          title: "模块与全屏插件管理",
          onClick: j[1] || (j[1] = F((R) => r(R), ["stop"]))
        }, [...j[4] || (j[4] = [
          n("span", {
            class: "mac-dock-market-icon",
            "aria-hidden": "true"
          }, "🧩", -1)
        ])], 2)
      ]),
      (a(), ce(gt, { to: "body" }, [
        u.visible && u.item ? (a(), c("div", {
          key: 0,
          class: "mac-dock-drag-ghost",
          style: ve({
            width: u.width + "px",
            height: u.height + "px",
            transform: "translate3d(" + u.x + "px," + u.y + "px, 0)"
          }),
          "aria-hidden": "true"
        }, [
          u.item.icon ? (a(), c("img", {
            key: 0,
            class: "mac-dock-icon",
            src: u.item.icon,
            alt: ""
          }, null, 8, bu)) : u.item.emoji ? (a(), c("span", wu, b(u.item.emoji), 1)) : M("", !0)
        ], 4)) : M("", !0)
      ])),
      Q(cu, {
        target: o.value,
        onClose: j[2] || (j[2] = (R) => o.value = null)
      }, null, 8, ["target"])
    ], 64));
  }
}), ts = /* @__PURE__ */ Te(ku, [["__scopeId", "data-v-4528a5df"]]), _u = {
  id: "win-toast-container",
  class: "win-toast-container",
  "aria-live": "polite",
  "aria-relevant": "additions"
}, Cu = ["data-toast-fingerprint", "onMouseenter", "onMouseleave"], xu = { class: "win-toast-head" }, Lu = ["src"], $u = { class: "win-toast-app" }, Tu = ["onClick"], Su = ["onClick"], Iu = { class: "win-toast-title" }, Mu = {
  key: 0,
  class: "win-toast-subtitle"
}, Du = {
  key: 1,
  class: "win-toast-snippet"
}, Eu = {
  key: 0,
  class: "win-toast-actions"
}, Au = ["onClick"], Pu = ["onClick"], Wu = /* @__PURE__ */ de({
  __name: "NotificationHost",
  setup(e) {
    const t = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), r = N({}), l = N({});
    let h = null;
    function g(d) {
      const k = t.get(d);
      k !== void 0 && clearTimeout(k), t.delete(d);
    }
    function p(d, k = d.duration) {
      g(d.id), i.set(d.id, k), o.set(d.id, Date.now()), l.value[d.id] = !1, r.value[d.id] = Math.max(0, Math.min(100, k / d.duration * 100)), ft(() => requestAnimationFrame(() => {
        r.value[d.id] = 0;
      })), t.set(d.id, window.setTimeout(() => {
        t.delete(d.id), Ae.close(d.id);
      }, k));
    }
    function x(d) {
      g(d.id);
      const k = Date.now() - (o.get(d.id) || Date.now()), $ = Math.max(0, (i.get(d.id) ?? d.duration) - k);
      i.set(d.id, $), l.value[d.id] = !0, r.value[d.id] = Math.max(0, Math.min(100, $ / d.duration * 100));
    }
    function m(d) {
      p(d, Math.max(1500, i.get(d.id) ?? d.duration));
    }
    function S(d) {
      g(d.id), Ae.close(d.id);
    }
    function f(d) {
      if (_t.markRead(d.id), S(d), !d.onClick) {
        d.target && _t.openTarget(d.target);
        return;
      }
      try {
        Promise.resolve(d.onClick()).catch((k) => console.warn("Notification action failed", k));
      } catch (k) {
        console.warn("Notification action failed", k);
      }
    }
    function u(d) {
      const k = Math.max(500, i.get(d.id) ?? d.duration);
      return {
        width: `${r.value[d.id] ?? 100}%`,
        transition: l.value[d.id] ? "none" : `width ${k}ms linear`
      };
    }
    return He(() => {
      h = new MutationObserver(() => {
        const k = new Set(So.map(($) => $.id));
        for (const $ of So)
          !$.closing && !t.has($.id) && !i.has($.id) && p($);
        for (const $ of i.keys())
          k.has($) || (g($), i.delete($), o.delete($), delete r.value[$], delete l.value[$]);
      });
      const d = document.getElementById("win-toast-container");
      d && h.observe(d, { childList: !0 });
      for (const k of So) p(k);
    }), no(() => {
      h?.disconnect(), h = null;
      for (const d of t.values()) clearTimeout(d);
      t.clear();
    }), (d, k) => (a(), ce(gt, { to: "body" }, [
      n("div", _u, [
        Q(Vo, { name: "win-toast" }, {
          default: Qt(() => [
            (a(!0), c(K, null, ge(s(So), ($) => (a(), c("article", {
              key: $.id,
              class: le(["win-toast-card", [$.appType, { closing: $.closing }]]),
              "data-toast-fingerprint": $.fingerprint,
              onMouseenter: (w) => x($),
              onMouseleave: (w) => m($)
            }, [
              n("header", xu, [
                n("img", {
                  src: $.icon,
                  class: "win-toast-icon",
                  alt: ""
                }, null, 8, Lu),
                n("span", $u, b($.appName), 1),
                k[0] || (k[0] = n("span", { class: "win-toast-time" }, "刚刚", -1)),
                n("button", {
                  type: "button",
                  class: "win-toast-close",
                  title: "关闭",
                  "aria-label": "关闭通知",
                  onClick: (w) => S($)
                }, "✕", 8, Tu)
              ]),
              n("button", {
                type: "button",
                class: "win-toast-body win-toast-body-button",
                onClick: (w) => f($)
              }, [
                n("span", Iu, b($.title), 1),
                $.subtitle ? (a(), c("span", Mu, b($.subtitle), 1)) : M("", !0),
                $.message ? (a(), c("span", Du, b($.message), 1)) : M("", !0)
              ], 8, Su),
              $.showActions && $.actionLabel ? (a(), c("footer", Eu, [
                n("button", {
                  type: "button",
                  class: "win-toast-btn primary",
                  onClick: (w) => f($)
                }, b($.actionLabel), 9, Au),
                n("button", {
                  type: "button",
                  class: "win-toast-btn",
                  onClick: (w) => S($)
                }, "关闭", 8, Pu)
              ])) : M("", !0),
              n("div", {
                class: "win-toast-progress",
                style: ve(u($))
              }, null, 4)
            ], 42, Cu))), 128))
          ]),
          _: 1
        })
      ])
    ]));
  }
}), os = /* @__PURE__ */ Te(Wu, [["__scopeId", "data-v-8ecd30bd"]]), Ou = ["id"], Bu = /* @__PURE__ */ de({
  __name: "DockModuleHost",
  setup(e) {
    const t = Ai().filter((o) => o.presentation !== "card").map((o) => {
      Ve(o.lifecycle.isVisible, (r) => {
        r && Me.markRunning(o.id);
      }, { immediate: !0, flush: "sync" });
      const i = de({
        setup: () => () => We("section", { class: "dock-module-load-error", role: "alert" }, [
          We("div", { style: "display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;" }, [
            We("strong", { style: "font-size: 13px; color: var(--heading);" }, `${o.title} 加载受阻`),
            We("span", { style: "font-size: 11px; padding: 2px 6px; border-radius: 4px; background: var(--surface); color: var(--muted); border: 1px solid var(--border);" }, "代码可能已更新")
          ]),
          We("p", { style: "font-size: 12px; line-height: 1.5; color: var(--muted); margin: 0 0 12px 0;" }, "模块分块代码未就绪。若刚才在终端编写或重新构建了扩展，点击「刷新标签页」即可立即同步最新切片。"),
          We("div", { style: "display: flex; gap: 8px;" }, [
            We("button", {
              type: "button",
              style: "padding: 5px 12px; border-radius: 6px; border: 1px solid var(--border); background: var(--primary, #3b82f6); color: #fff; cursor: pointer; font-size: 12px; font-weight: 500;",
              onClick: () => {
                typeof window < "u" && window.location.reload();
              }
            }, "⟳ 刷新标签页"),
            We("button", {
              type: "button",
              style: "padding: 5px 10px; border-radius: 6px; border: 1px solid var(--border); background: var(--surface); color: var(--text); cursor: pointer; font-size: 12px;",
              onClick: () => {
                Me.reloadApp(o.id);
              }
            }, "↻ 重试"),
            We("button", {
              type: "button",
              style: "padding: 5px 10px; border-radius: 6px; border: 1px solid var(--border); background: var(--surface); color: var(--text); cursor: pointer; font-size: 12px;",
              onClick: () => {
                Me.hideApp(o.id);
              }
            }, "隐藏")
          ])
        ])
      });
      return {
        definition: o,
        mounted: ae(() => !!Ye[o.id]),
        view: G({
          loader: o.loadView,
          onError(r, l, h, g) {
            g <= 2 ? l() : h();
          },
          errorComponent: i
        })
      };
    });
    return no(() => {
      for (const { definition: o } of t)
        Se.close(o.id), Jt.delete(o.id), Ye[o.id] = !1;
    }), (o, i) => (a(!0), c(K, null, ge(s(t), (r) => Oe((a(), c("div", {
      id: r.definition.rootId,
      key: r.definition.id
    }, [
      r.mounted.value ? (a(), ce(Ii(r.view), {
        key: s(Me).getRenderKey(r.definition.id)
      })) : M("", !0)
    ], 8, Ou)), [
      [to, r.definition.lifecycle.isVisible()]
    ])), 128));
  }
}), Ru = /* @__PURE__ */ Te(Bu, [["__scopeId", "data-v-3f131313"]]);
function Ne(e, t) {
  const o = N(!1);
  return Ve(
    e,
    (i) => {
      i && (o.value = !0);
    },
    { immediate: !0, flush: "sync" }
  ), Ct(o);
}
const Fu = ["onKeydown"], Nu = { class: "fo-up-preview-head" }, Hu = ["src"], ju = { class: "fo-up-preview-meta" }, zu = { class: "fo-up-preview-name-row" }, Gu = ["href"], Ku = ["disabled"], Vu = { class: "fo-up-preview-sign" }, Uu = { class: "fo-up-preview-videos" }, Yu = {
  key: 0,
  class: "fo-up-preview-loading"
}, qu = {
  key: 1,
  class: "fo-up-preview-empty"
}, Xu = {
  key: 2,
  class: "fo-up-preview-empty"
}, Ju = ["href"], Zu = ["src"], Qu = {
  key: 0,
  class: "fo-bili-duration"
}, ep = { class: "fo-up-preview-video-info" }, tp = ["href"], op = { class: "fo-up-preview-video-meta" }, np = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2394a3b8'%3E%3Cpath d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/%3E%3C/svg%3E", ip = /* @__PURE__ */ de({
  __name: "BiliUpPreview",
  setup(e) {
    const t = N(!1);
    function o() {
      if (!fe.submitting) {
        if (!fe.followed) {
          t.value = !1, Go.toggleFollow();
          return;
        }
        if (!t.value) {
          t.value = !0;
          return;
        }
        t.value = !1, Go.toggleFollow();
      }
    }
    function i() {
      t.value = !1, Go.close();
    }
    return (r, l) => s(fe).open ? (a(), c("div", {
      key: 0,
      class: "fo-up-preview-backdrop",
      onPointerdown: F(i, ["self"])
    }, [
      n("aside", {
        class: "fo-up-preview-popover",
        style: ve({ left: `${s(fe).left}px`, top: `${s(fe).top}px` }),
        onKeydown: Wt(F(i, ["stop", "prevent"]), ["esc"])
      }, [
        n("div", Nu, [
          n("img", {
            class: "fo-up-preview-avatar",
            src: s(fe).face || np,
            alt: "",
            referrerpolicy: "no-referrer"
          }, null, 8, Hu),
          n("div", ju, [
            n("div", zu, [
              n("a", {
                class: "fo-up-preview-name",
                href: `https://space.bilibili.com/${s(fe).mid}`,
                target: "_blank",
                rel: "noreferrer"
              }, b(s(fe).name), 9, Gu),
              n("button", {
                type: "button",
                class: le([
                  s(fe).followed ? "fo-up-preview-unfollow" : "fo-up-preview-follow",
                  { "is-armed": t.value }
                ]),
                disabled: s(fe).submitting,
                onClick: o
              }, b(s(fe).submitting ? "处理中…" : t.value ? "确定取消？" : s(fe).followed ? "取消关注" : "＋ 关注"), 11, Ku)
            ]),
            n("p", Vu, b(s(fe).sign || "暂无个人简介"), 1)
          ]),
          n("button", {
            type: "button",
            class: "fo-up-preview-close",
            "aria-label": "关闭预览",
            onClick: i
          }, "✕")
        ]),
        l[1] || (l[1] = n("div", { class: "fo-up-preview-title-tag" }, "近期投稿视频（最新 2~3 个）", -1)),
        n("div", Uu, [
          s(fe).loading ? (a(), c("div", Yu, [...l[0] || (l[0] = [
            n("i", null, null, -1),
            n("span", null, "正在读取近期投稿…", -1)
          ])])) : s(fe).error ? (a(), c("p", qu, b(s(fe).error), 1)) : s(fe).videos.length ? (a(!0), c(K, { key: 3 }, ge(s(fe).videos, (h) => (a(), c("article", {
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
              }, null, 8, Zu),
              h.duration ? (a(), c("span", Qu, b(h.duration), 1)) : M("", !0)
            ], 8, Ju),
            n("div", ep, [
              n("a", {
                class: "fo-up-preview-video-title",
                href: h.url,
                target: "_blank",
                rel: "noreferrer"
              }, b(h.title), 9, tp),
              n("div", op, [
                n("span", null, "▣ " + b(h.playCount), 1),
                n("span", null, b(h.published), 1)
              ])
            ])
          ]))), 128)) : (a(), c("p", Xu, "该 UP 主近期暂无视频动态"))
        ])
      ], 44, Fu)
    ], 32)) : M("", !0);
  }
}), sp = /* @__PURE__ */ Te(ip, [["__scopeId", "data-v-83b4a8d5"]]), rp = { class: "logicweaver-overlays-layer" }, ap = { id: "vue-notification-root" }, lp = {
  id: "bili-profile-menu",
  class: "bili-profile-menu",
  hidden: ""
}, cp = { id: "vue-bili-message-panel-root" }, dp = { id: "vue-notification-center-root" }, up = { id: "vue-tab-manager-root" }, pp = { id: "vue-bookmark-menu-root" }, fp = { id: "vue-bookmark-panel-root" }, gp = { id: "vue-launcher-dialogs-root" }, hp = { id: "vue-launcher-folder-root" }, mp = { id: "vue-launcher-menus-root" }, vp = { id: "vue-settings-dialog-root" }, yp = { id: "vue-clock-settings-root" }, bp = { id: "vue-bili-theater-root" }, wp = { id: "vue-bili-mini-player-root" }, kp = { id: "vue-ai-dialog-root" }, _p = { id: "vue-aihot-viewer-root" }, Cp = { id: "vue-nav-wheel-root" }, xp = { id: "vue-github-detail-root" }, Lp = { id: "vue-bili-subtitle-modal-root" }, $p = { id: "vue-firecrawl-modal-root" }, Tp = { id: "vue-floating-image-viewer-root" }, Sp = { id: "vue-command-palette-root" }, Ip = /* @__PURE__ */ de({
  __name: "AppOverlays",
  setup(e) {
    const t = Ne(() => Lo.state.isOpen), o = Ne(() => Di.isOpen), i = Ne(() => zo.isOpen), r = Ne(() => At.state.isOpen), l = Ne(() => gr.open), h = Ne(() => Co.state.isOpen), g = Ne(() => Bs.isOpen), p = Ne(() => pr.isOpen), x = Ne(() => Vn.state.isOpen), m = Ne(() => Gs.isOpen), S = Ne(() => Ee.isOpen), f = Ne(() => Bn.isOpen);
    let u;
    He(() => {
      u = ja();
    }), xt(() => {
      u?.();
    });
    const d = Ne(() => Hn.state.isOpen), k = Ne(() => qe.isOpen), $ = Ne(() => Ft.editDialog.isOpen || Ft.iconPicker.isOpen || Ft.linkMove.isOpen || Ft.folderMove.isOpen || Ft.groupMerge.isOpen || Ft.folderDelete.isOpen), w = G(() => import("./ProfileMenu-BDHWcWQg.js")), L = G(() => import("./BookmarkNoteMenu-C9OAO2ZF.js")), A = G(() => import("./BookmarkPanel-CkbynGXf.js")), ne = G(() => import("./ClockSettingsMenu-qHuvWlS8.js")), B = G(() => import("./NotificationCenter-BV4Bs0EG.js")), D = G(() => import("./TabManagerPanel-CYm4ZHXv.js")), y = G(() => import("./LauncherDialogs-Cxd4dPR-.js")), _ = G(() => import("./LauncherFolderDialog-DRKxzNgd.js")), O = G(() => import("./LauncherMenus-DduDI0AX.js")), U = G(() => import("./SettingsDialog-C5kaHExd.js")), E = G(() => import("./BiliMiniPlayer-Dp4k6CtK.js")), j = G(() => import("./BiliTheaterDialog-CDfQE2_x.js")), R = G(() => import("./BiliMessagePanel-D69mUvPd.js")), q = G(() => import("./AiDialog-qECKIMZM.js")), ye = G(() => import("./AihotViewer-BEdldf2-.js")), W = G(() => import("./NavWheelOverlay-CyhjJPAE.js")), P = G(() => import("./GitHubRepoDetailDrawer-Bd1FDk4G.js")), H = G(() => import("./InPageSideDrawer-CET1scc8.js")), pe = G(() => import("./BiliSubtitleModal-CD8mnt9H.js")), xe = G(() => import("./FirecrawlModal-Cvq5VpHu.js")), je = G(() => import("./FloatingImageViewer-Ccz-khHc.js")), Le = G(() => import("./CommandPalette-HWDOzaiU.js")), Ue = G(() => import("./AppPromptModal-BQMu9TVI.js")), Re = G(async () => {
      const [Je, ze] = await Promise.all([
        import("./PluginMarketDialog-BBbp2e0c.js"),
        import("./plugin-market-B6zN10fA.js")
      ]);
      return Os("logicweaver-market-styles", ze.default), Je.default;
    });
    return (Je, ze) => (a(), c("div", rp, [
      n("div", ap, [
        Q(os)
      ]),
      n("div", lp, [
        Q(s(w))
      ]),
      n("div", cp, [
        s(p) ? (a(), ce(s(R), { key: 0 })) : M("", !0)
      ]),
      n("div", dp, [
        s(o) ? (a(), ce(s(B), { key: 0 })) : M("", !0)
      ]),
      n("div", up, [
        s(i) ? (a(), ce(s(D), { key: 0 })) : M("", !0)
      ]),
      n("div", pp, [
        s(d) ? (a(), ce(s(L), { key: 0 })) : M("", !0)
      ]),
      n("div", fp, [
        Q(s(A))
      ]),
      n("div", gp, [
        s($) ? (a(), ce(s(y), { key: 0 })) : M("", !0)
      ]),
      n("div", hp, [
        s(k) ? (a(), ce(s(_), { key: 0 })) : M("", !0)
      ]),
      n("div", mp, [
        Q(s(O))
      ]),
      n("div", vp, [
        Q(s(U))
      ]),
      n("div", yp, [
        s(r) ? (a(), ce(s(ne), { key: 0 })) : M("", !0)
      ]),
      n("div", bp, [
        s(h) ? (a(), ce(s(j), { key: 0 })) : M("", !0)
      ]),
      n("div", wp, [
        s(g) ? (a(), ce(s(E), { key: 0 })) : M("", !0)
      ]),
      n("div", kp, [
        s(x) ? (a(), ce(s(q), { key: 0 })) : M("", !0)
      ]),
      n("div", _p, [
        s(l) ? (a(), ce(s(ye), { key: 0 })) : M("", !0)
      ]),
      n("div", Cp, [
        Q(s(W))
      ]),
      Q(Ru),
      n("div", xp, [
        s(m) ? (a(), ce(s(P), { key: 0 })) : M("", !0)
      ]),
      n("div", Lp, [
        Q(s(pe))
      ]),
      n("div", $p, [
        Q(s(xe))
      ]),
      n("div", Tp, [
        Q(s(je))
      ]),
      n("div", Sp, [
        s(S) ? (a(), ce(s(Le), { key: 0 })) : M("", !0)
      ]),
      s(f) ? (a(), ce(s(H), { key: 0 })) : M("", !0),
      Q(sp),
      Q(s(Ue)),
      s(t) ? (a(), ce(s(Re), { key: 1 })) : M("", !0)
    ]));
  }
});
let Sn = !1;
function Mp(e = 1800) {
  if (Sn || typeof window > "u") return;
  const t = () => {
    if (Sn) return;
    Sn = !0;
    const o = Ai();
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
const Dp = ["data-active-workspace"], Ep = /* @__PURE__ */ de({
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
    function l(p, x = "image/svg+xml") {
      if (typeof document > "u") return;
      const m = typeof chrome < "u" && chrome.runtime?.getURL ? chrome.runtime.getURL(p) : p;
      if (r === m) return;
      r = m;
      const S = document.querySelectorAll("link[rel*='icon']");
      if (S.length > 0)
        S.forEach((f) => {
          f.type = x, f.href = m;
        });
      else {
        const f = document.createElement("link");
        f.rel = "icon", f.type = x, f.href = m, document.head.appendChild(f);
      }
    }
    function h() {
      if (typeof document > "u") return;
      const p = i[Io.value] || i.home;
      if (l(p.icon, p.iconType), Y.playing && Y.title) {
        const x = Y.artist ? ` - ${Y.artist}` : "";
        document.title = `▶ ${Y.title}${x}`;
        return;
      }
      if (ao.playing && ao.title) {
        document.title = `▶ ${ao.title} · 电台`;
        return;
      }
      document.title = p.title;
    }
    Ve(
      [
        () => Io.value,
        () => Y.playing,
        () => Y.title,
        () => Y.artist,
        () => ao.playing,
        () => ao.title
      ],
      () => {
        h();
      },
      { immediate: !0 }
    );
    const g = ae(() => Io.value === "home" ? "" : Io.value);
    return Ve(() => kt.activeId, (p) => {
      document.body.classList.toggle("has-card-fullscreen", !!p);
    }, { immediate: !0, flush: "sync" }), He(() => {
      typeof document < "u" && (document.body.dataset.spa = "1");
      try {
        Wn.bindGlobalListener(), dt.start(), _i.start(), On.init().catch((p) => console.warn("[Launcher] 初始化失败", p)), Mp(), typeof chrome < "u" && chrome?.runtime?.sendMessage && setTimeout(() => {
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
    }), xt(() => {
      dt.stop(), On.stop(), _i.stop(), document.body.classList.remove("has-card-fullscreen"), typeof document < "u" && o && (document.title = o);
    }), t({
      activeWorkspaceId: g,
      windowManagerController: Se
    }), (p, x) => (a(), c("div", {
      id: "logicweaver-spa-root",
      class: "logicweaver-spa-root",
      "data-active-workspace": g.value || ""
    }, [
      Q(Jr),
      Q(Za),
      Q(Yd),
      Q(ou),
      n("nav", {
        id: "mac-dock",
        class: le(["mac-dock", "dock-" + s(Gt).position]),
        "aria-label": "快捷应用栏"
      }, [
        Q(ts)
      ], 2),
      Q(Ip)
    ], 8, Dp));
  }
}), Ap = /* @__PURE__ */ Te(Ep, [["__scopeId", "data-v-5d2f948f"]]), Pp = {
  class: "endfield-stage",
  "aria-hidden": "true"
}, Wp = {
  class: "rhinelab-stage",
  "aria-hidden": "true"
}, Op = { class: "rhine-scaler" }, Bp = { class: "rhine-center-group" }, Rp = { class: "rhine-auth-status" }, Fp = { class: "rhine-auth-text" }, Np = ["hidden"], Hp = { class: "rhine-cinema-caption" }, jp = /* @__PURE__ */ de({
  __name: "IntroAnimation",
  setup(e) {
    const t = N(window.innerHeight), o = N(window.innerWidth), i = N(!1), r = N(!1), l = N(10), h = N(1), g = N(0), p = /* @__PURE__ */ new Set();
    let x = 0, m = () => {
    };
    const S = ae(() => `${String(Math.round(et.renderedProgress)).padStart(2, "0")}%`), f = ae(() => {
      const y = et.renderedProgress / 100 * t.value + 10;
      return `${Math.min(y, Math.max(0, t.value - 102)).toFixed(1)}px`;
    }), u = ae(() => et.renderedProgress >= 75 ? "START PROCESSING..." : et.renderedProgress >= 35 ? "REQUEST RECEIVED" : "ID CONFIRMED : JOYCE MOORE"), d = ae(() => et.finished ? "身份验证通过 · 欢迎进入终端" : et.status ? `身份信息确认 · ${et.status.replace(/^.*?\/\s*/, "")}` : "身份信息确认：JOYCE MOORE"), k = ae(() => String(Math.max(0.35, Math.min(o.value / 1920, t.value / 1080))));
    function $(y, _) {
      const O = window.setTimeout(() => {
        p.delete(O), y();
      }, _);
      p.add(O);
    }
    function w() {
      window.dispatchEvent(new CustomEvent("logicweaver:intro-complete"));
    }
    function L(y) {
      if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
        w();
        return;
      }
      const _ = y ? 180 : 260, O = y ? 200 : 280, U = performance.now(), E = (j) => {
        const R = j - U, q = Math.min(1, R / _), ye = 1 - Math.pow(1 - q, 3);
        if (l.value = 10 + ye * Math.max(0, o.value - 10), R > _ && (h.value = Math.max(0, 1 - (R - _) / O)), R >= _ + O) {
          w();
          return;
        }
        x = requestAnimationFrame(E);
      };
      $(() => {
        x = requestAnimationFrame(E);
      }, y ? 60 : 120);
    }
    function A(y) {
      y || (i.value = !0), $(() => {
        r.value = !0, g.value = 6, h.value = 0, $(w, 380);
      }, y ? 40 : 420);
    }
    function ne(y) {
      et.style === "rhinelab" ? A(y) : L(y);
    }
    function B() {
      o.value = window.innerWidth, t.value = window.innerHeight;
    }
    function D(y) {
      et.finished || (y.key === "Enter" || y.key === " " || y.key === "Escape") && (y.preventDefault(), rt.skip("KEYBOARD SKIP"));
    }
    return He(() => {
      document.documentElement.dataset.startupStyle = et.style, document.documentElement.style.setProperty("--rhine-scale", k.value), window.addEventListener("resize", B, { passive: !0 }), window.addEventListener("keydown", D, !0), m = Tr(ne), Ni();
    }), no(() => {
      m(), window.removeEventListener("resize", B), window.removeEventListener("keydown", D, !0), cancelAnimationFrame(x);
      for (const y of p) clearTimeout(y);
      p.clear();
    }), (y, _) => (a(), c("div", {
      class: "intro-vue-content",
      style: ve({ "--rhine-scale": k.value, opacity: h.value, filter: `blur(${g.value}px)` })
    }, [
      n("div", Pp, [
        _[2] || (_[2] = n("div", { class: "endfield-loader-texture" }, null, -1)),
        _[3] || (_[3] = n("div", { class: "endfield-loader-rail" }, null, -1)),
        n("div", {
          class: "endfield-loader-fill",
          style: ve({ height: `${s(et).renderedProgress}%` })
        }, null, 4),
        n("div", {
          class: "endfield-loader-meter",
          style: ve({ top: f.value })
        }, [
          _[1] || (_[1] = n("span", { class: "endfield-loader-tick" }, null, -1)),
          n("b", null, b(S.value), 1),
          n("small", null, b(s(et).status), 1)
        ], 4),
        _[4] || (_[4] = mo('<section class="endfield-loader-brand"><span class="endfield-loader-kicker">DEEPSEEK HARNESS</span><strong>END</strong><strong>FIELD</strong><span class="endfield-loader-detail"><i class="endfield-loader-chevron"></i><span>EDGE INTELLIGENCE THEME</span><small>TERRA RESEARCH COMMISSION / BOOT SEQUENCE</small><span class="endfield-loader-squares"><i class="on"></i><i class="on"></i><i class="on"></i><i></i><i></i><i></i><i class="on"></i><i class="on"></i><i></i><i></i><i></i><i></i></span></span><em>OVER THE FRONTIER / INTO THE FRONT</em></section>', 1)),
        n("div", {
          class: "endfield-loader-wipe",
          style: ve({ width: `${l.value}px`, opacity: l.value > 10 ? 1 : 0 })
        }, null, 4)
      ]),
      n("div", Wp, [
        _[12] || (_[12] = mo('<div class="rhine-background"><svg viewBox="0 0 1920 1080" preserveAspectRatio="none"><g fill="none" stroke="#ffffff" stroke-width="2.5"><path class="rhine-drift-path1" d="M-210 705C-45 705 182 704 247 567C337 377 99 306 4 435S27 680 169 631C309 584 227 314 279 111S568-113 568-113"></path><path class="rhine-drift-path2" d="M1560-80C1374 114 1671 168 1601 323S1371 367 1431 480S1692 666 1559 787S1329 886 1498 1130"></path><circle class="rhine-drift-circle" cx="1450" cy="648" r="346"></circle><circle class="rhine-drift-circle2" cx="1450" cy="648" r="348"></circle></g></svg></div>', 1)),
        n("div", Op, [
          _[10] || (_[10] = mo('<header class="rhine-brand"><h1>RHINE LAB</h1><div class="rhine-brand-sub">SYNTHESIZE INFORMATION</div><p class="rhine-brand-os"><span class="rhine-brand-analysis"><span style="left:2px;">A</span><span style="left:28px;">N</span><span style="left:55px;">A</span><span style="left:81px;">L</span><span style="left:103px;">Y</span><span style="left:129px;">S</span><span style="left:154px;">I</span><span style="left:166px;">S</span></span><b>OS</b></p></header>', 1)),
          n("button", {
            class: "rhine-skip",
            type: "button",
            title: "点击进入系统 (或按 Enter)",
            onClick: _[0] || (_[0] = (O) => s(rt).skip("ENTER SYSTEM"))
          }, [..._[5] || (_[5] = [
            Be("ENTER SYSTEM ", -1),
            n("span", null, "↗", -1)
          ])]),
          n("div", Bp, [
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
            n("div", Rp, [
              _[6] || (_[6] = n("span", { class: "rhine-auth-dot" }, "·", -1)),
              n("span", Fp, b(u.value), 1),
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
            mo('<svg viewBox="0 0 1920 1080" aria-hidden="true"><g fill="none" stroke="#080a08" stroke-linecap="round"><circle class="rhine-scan-circle ring-outer" cx="960" cy="540" r="280" stroke-width="2.5"></circle><circle class="rhine-scan-circle ring-white" cx="960" cy="540" r="260" stroke="#fff" stroke-width="3.5"></circle><circle class="rhine-scan-circle ring-inner" cx="960" cy="540" r="220" stroke-width="2"></circle><circle class="rhine-orbit-dot dot-1" cx="960" cy="260" r="8" fill="#ed821b" stroke="none"></circle><circle class="rhine-orbit-dot dot-2" cx="960" cy="820" r="8" fill="#ed821b" stroke="none"></circle><circle class="rhine-scan-core" cx="960" cy="540" r="6" fill="#080a08" stroke="none"></circle></g></svg><span class="rhine-scan-label">PERMISSION AUTHORIZED</span>', 2)
          ])], 10, Np),
          n("div", Hp, b(d.value), 1),
          _[11] || (_[11] = n("div", { class: "rhine-powered" }, [
            Be("POWERED BY "),
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
}), zp = /* @__PURE__ */ de({
  __name: "ProfileMenu",
  setup(e) {
    function t(o) {
      To.trigger(o);
    }
    return (o, i) => (a(), c(K, null, [
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
}), Gp = /* @__PURE__ */ de({
  __name: "WorkspaceLaunchers",
  setup(e) {
    function t(o) {
      Kn.openWorkspace(o, !0);
    }
    return (o, i) => (a(), c(K, null, [
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
      Si(o.$slots, "default")
    ], 64));
  }
}), Kp = {
  key: 0,
  "aria-label": "AI 分析任务"
}, Vp = { role: "status" }, Up = ["disabled"], Yp = ["disabled"], qp = /* @__PURE__ */ de({
  __name: "GitHubStatus",
  setup(e) {
    return (t, o) => s(Qe).message || s(Qe).busy ? (a(), c("section", Kp, [
      n("p", Vp, b(s(Qe).repo ? `原任务仓库：${s(Qe).repo}。 ` : "") + b(s(Qe).message), 1),
      s(Qe).busy ? (a(), c("button", {
        key: 0,
        type: "button",
        onClick: o[0] || (o[0] = (i) => s(nt).stopAiAnalysis())
      }, "停止后续分析 / 中断等待")) : M("", !0),
      s(Qe).uncertain ? (a(), c(K, { key: 1 }, [
        o[5] || (o[5] = n("p", null, "AI 结果未确认，已阻止本页再次提交。请到供应商核对请求和计费；本页记录在整页关闭或重载后会丢失。", -1)),
        s(Qe).unlockConfirmation ? (a(), c(K, { key: 1 }, [
          o[4] || (o[4] = n("p", null, "扩展不能验证供应商任务；确认只解除本页限制，不代表成功，也不会重发请求。", -1)),
          n("button", {
            type: "button",
            disabled: s(Qe).busy,
            onClick: o[2] || (o[2] = (i) => s(nt).acknowledgeAiChecked())
          }, "确认解除本页限制", 8, Yp),
          n("button", {
            type: "button",
            onClick: o[3] || (o[3] = (i) => s(Qe).unlockConfirmation = !1)
          }, "保持限制")
        ], 64)) : (a(), c("button", {
          key: 0,
          type: "button",
          disabled: s(Qe).busy,
          onClick: o[1] || (o[1] = (i) => s(Qe).unlockConfirmation = !0)
        }, "我已核对供应商记录", 8, Up))
      ], 64)) : M("", !0)
    ])) : M("", !0);
  }
}), Xp = {
  key: 0,
  role: "status",
  style: { "font-size": "12px", color: "var(--danger,#ef4444)", padding: "4px 8px", margin: "0 0 6px 0", "border-radius": "6px", background: "var(--surface)" }
}, Jp = {
  key: 0,
  class: "gh-sidebar-divider"
}, Zp = {
  key: 1,
  class: "gh-sidebar-caption"
}, Qp = ["data-folder", "onClick", "onDragover", "onDragleave", "onDrop"], ef = {
  class: "gh-folder-icon-wrap",
  style: { "font-size": "13px", display: "grid", "place-items": "center" }
}, tf = { key: 0 }, of = { key: 1 }, nf = {
  key: 2,
  class: "fo-folder-icon",
  style: { color: "currentColor" }
}, sf = ["title"], rf = { class: "gh-folder-count" }, af = ["data-del", "onClick", "onKeydown"], lf = /* @__PURE__ */ de({
  __name: "GitHubFolders",
  props: {
    active: { type: Boolean, default: !0 }
  },
  setup(e) {
    const t = e, o = N(""), i = () => {
      o.value = "";
    };
    function r(x) {
      return t.active && !bt.busy && vo.folders.some((m) => m.title === x && (m.kind === "custom" || m.kind === "uncategorized"));
    }
    Ve(() => t.active, (x) => {
      i(), window.removeEventListener("dragend", i), window.removeEventListener("drop", i), x && (window.addEventListener("dragend", i), window.addEventListener("drop", i));
    }, { immediate: !0 }), no(() => {
      window.removeEventListener("dragend", i), window.removeEventListener("drop", i);
    });
    function l(x, m) {
      x.stopPropagation(), Mt.delete(m);
    }
    function h(x, m) {
      if (!r(m) || !Array.from(x.dataTransfer?.types || []).includes(Ks)) {
        i();
        return;
      }
      x.preventDefault(), x.dataTransfer && (x.dataTransfer.dropEffect = "move"), o.value = m;
    }
    function g(x, m) {
      const S = x.currentTarget;
      S instanceof Node && x.relatedTarget instanceof Node && S.contains(x.relatedTarget) || o.value === m && (o.value = "");
    }
    function p(x, m) {
      if (i(), !r(m)) return;
      const S = Vs(x.dataTransfer);
      S && (x.preventDefault(), x.stopPropagation(), Mt.dropRepository(S, m));
    }
    return (x, m) => (a(), c(K, null, [
      s(bt).message ? (a(), c("p", Xp, b(s(bt).message), 1)) : M("", !0),
      (a(!0), c(K, null, ge(s(vo).folders, (S, f) => (a(), c(K, {
        key: S.title
      }, [
        S.kind === "custom" && s(vo).folders[f - 1]?.kind !== "custom" ? (a(), c("div", Jp)) : M("", !0),
        S.kind === "custom" && s(vo).folders[f - 1]?.kind !== "custom" ? (a(), c("div", Zp, "GitHub 列表 (Lists)")) : M("", !0),
        n("button", {
          type: "button",
          class: le(["gh-bili-folder", { on: S.active, "drag-into": o.value === S.title }]),
          "data-folder": S.title,
          onClick: (u) => s(Mt).select(S.title),
          onDragover: (u) => h(u, S.title),
          onDragleave: (u) => g(u, S.title),
          onDrop: (u) => p(u, S.title)
        }, [
          n("span", ef, [
            S.kind === "all" ? (a(), c("span", tf, "⭐")) : S.kind === "uncategorized" ? (a(), c("span", of, "📄")) : (a(), c("i", nf))
          ]),
          n("span", {
            class: "gh-folder-name",
            title: S.title
          }, b(S.title), 9, sf),
          n("small", rf, b(S.count), 1),
          S.kind === "custom" ? (a(), c("span", {
            key: 0,
            class: "gh-folder-delete",
            title: "删除 GitHub 列表",
            "data-del": S.title,
            role: "button",
            tabindex: "0",
            onClick: (u) => l(u, S.title),
            onKeydown: [
              Wt(F((u) => s(Mt).delete(S.title), ["prevent", "stop"]), ["enter"]),
              Wt(F((u) => s(Mt).delete(S.title), ["prevent", "stop"]), ["space"])
            ]
          }, "✕", 40, af)) : M("", !0)
        ], 42, Qp)
      ], 64))), 128))
    ], 64));
  }
}), cf = {
  id: "gh-hero-cover",
  class: "gh-bili-cover"
}, df = { key: 0 }, uf = { key: 1 }, pf = {
  key: 2,
  class: "fo-folder-icon"
}, ff = { class: "gh-bili-heading" }, gf = { class: "gh-hero-title-row" }, hf = ["title"], mf = ["role", "aria-live"], vf = ["title"], yf = { id: "gh-hero-desc" }, bf = { class: "gh-bili-actions" }, wf = { class: "gh-batch-btn-text" }, kf = /* @__PURE__ */ de({
  __name: "GitHubHero",
  emits: ["open-ai-settings"],
  setup(e, { emit: t }) {
    return (o, i) => (a(), c(K, null, [
      n("div", cf, [
        s(Lt).kind === "all" ? (a(), c("span", df, "⭐")) : s(Lt).kind === "uncategorized" ? (a(), c("span", uf, "📄")) : (a(), c("i", pf))
      ]),
      n("div", ff, [
        n("div", gf, [
          n("h3", {
            id: "gh-hero-title",
            title: s(Lt).title
          }, b(s(Lt).title), 9, hf),
          s(It).actionText ? (a(), c("div", {
            key: 0,
            class: le(["gh-hero-inline-status", { "is-error": s(It).actionError }]),
            role: s(It).actionError ? "alert" : "status",
            "aria-live": s(It).actionError ? "assertive" : "polite",
            "aria-atomic": "true"
          }, [
            n("span", {
              class: "gh-hero-status-text",
              title: s(It).actionText
            }, b(s(It).actionText), 9, vf),
            n("button", {
              type: "button",
              title: "关闭提示",
              "aria-label": "关闭状态提示",
              onClick: i[0] || (i[0] = (r) => s(jn).update({ actionText: "", actionError: !1 }))
            }, "×")
          ], 10, mf)) : M("", !0)
        ]),
        n("p", yf, b(s(Lt).description), 1)
      ]),
      n("div", bf, [
        n("button", {
          id: "gh-batch-toggle-btn",
          type: "button",
          class: le(["gh-hero-btn gh-batch-toggle-btn", { active: s(Lt).batchMode }]),
          title: "批量多选操作",
          onClick: i[1] || (i[1] = (r) => s(wo).toggleBatch())
        }, [
          i[4] || (i[4] = n("span", { class: "gh-batch-btn-icon" }, "☑", -1)),
          n("span", wf, b(s(Lt).batchMode ? "返回" : "批量操作"), 1)
        ], 2),
        n("button", {
          id: "gh-refresh-btn",
          type: "button",
          class: "gh-hero-btn",
          title: "只读核对未确认的 Star 状态并刷新列表，不重发远端操作",
          onClick: i[2] || (i[2] = (r) => s(wo).refresh())
        }, "↻ 刷新 / 核对"),
        n("button", {
          id: "gh-hero-add-folder-btn",
          type: "button",
          class: "gh-hero-btn primary",
          title: "在 GitHub 官网上创建新 List",
          onClick: i[3] || (i[3] = (r) => s(wo).createFolder())
        }, "＋ 新建列表")
      ])
    ], 64));
  }
}), _f = /* @__PURE__ */ Te(kf, [["__scopeId", "data-v-d116f39c"]]), ee = we({ repo: "", text: "", baseline: "", busy: !1, message: "", storedValue: null });
function Ci(e, t = !1) {
  if (!e || ee.busy) return;
  if (ee.repo && ee.text !== ee.baseline) {
    ee.message = "请先保存或明确取消当前草稿，再编辑或清除其它备注。";
    return;
  }
  const o = nt.remarks[e]?.userRemark, i = typeof o == "string" ? o : "";
  Object.assign(ee, {
    repo: e,
    baseline: i,
    text: t ? "" : i,
    storedValue: null,
    message: t ? "清除已准备；点击保存才会清除手写备注，AI 简介不变。" : "仅点击保存或 Enter 才写入；草稿只保留在本页内存。"
  });
}
function In() {
  ee.busy || Object.assign(ee, { repo: "", text: "", baseline: "", storedValue: null, message: "" });
}
async function Mn() {
  if (ee.busy || !ee.repo) return;
  const { repo: e, text: t, baseline: o } = ee;
  ee.busy = !0;
  try {
    await nt.updateRepoRemark(e, { userRemark: t.trim() }, o), Object.assign(ee, { repo: "", text: "", baseline: "", storedValue: null, message: `${e} 的备注已保存并回读核对。` });
  } catch (i) {
    ee.message = i instanceof Error ? i.message : "保存未确认，草稿保留，请先读取已保存值核对。";
  } finally {
    ee.busy = !1;
  }
}
async function xi() {
  if (ee.busy || !ee.repo) return;
  const e = ee.repo;
  ee.busy = !0;
  try {
    const o = (await nt.reloadRepoRemarks())[e]?.userRemark;
    if (o !== void 0 && typeof o != "string") throw new Error("保存值格式异常，未变更草稿或覆盖基准。");
    ee.storedValue = o ?? "", ee.baseline = o ?? "", ee.message = "已读取保存值，草稿没有替换。请对比下方保存值；再次点击保存将以草稿替换它。";
  } catch (t) {
    ee.message = t instanceof Error ? t.message : "读取失败，草稿保留。";
  } finally {
    ee.busy = !1;
  }
}
const Cf = ["disabled"], xf = ["disabled"], Lf = ["disabled"], $f = ["disabled"], Tf = {
  key: 0,
  style: { width: "100%", "white-space": "pre-wrap", "overflow-wrap": "anywhere" }
}, Li = /* @__PURE__ */ de({
  __name: "GitHubRemarkEditor",
  props: {
    active: { type: Boolean }
  },
  setup(e) {
    const t = e, o = N(null);
    return He(() => {
      ft(() => {
        t.active && !ee.busy && o.value?.focus();
      });
    }), (i, r) => (a(), c("div", {
      class: "gh-inline-remark-box",
      style: { "flex-wrap": "wrap", "max-width": "100%" },
      onClick: r[6] || (r[6] = F(() => {
      }, ["stop"]))
    }, [
      Oe(n("input", {
        ref_key: "input",
        ref: o,
        "onUpdate:modelValue": r[0] || (r[0] = (l) => s(ee).text = l),
        class: "gh-inline-remark-input",
        type: "text",
        maxlength: "100",
        "aria-label": "手写仓库备注",
        placeholder: "备注说明…",
        disabled: s(ee).busy || !e.active,
        onKeydown: [
          r[1] || (r[1] = Wt(F((l) => !l.isComposing && e.active && s(Mn)(), ["prevent"]), ["enter"])),
          r[2] || (r[2] = Wt(F((l) => !l.isComposing && e.active && s(In)(), ["prevent", "stop"]), ["esc"]))
        ]
      }, null, 40, Cf), [
        [eo, s(ee).text]
      ]),
      n("button", {
        type: "button",
        class: "gh-inline-remark-btn save",
        title: "保存备注",
        disabled: s(ee).busy || !e.active,
        onClick: r[3] || (r[3] = //@ts-ignore
        (...l) => s(Mn) && s(Mn)(...l))
      }, "✓", 8, xf),
      n("button", {
        type: "button",
        class: "gh-inline-remark-btn cancel",
        title: "取消草稿",
        disabled: s(ee).busy || !e.active,
        onClick: r[4] || (r[4] = //@ts-ignore
        (...l) => s(In) && s(In)(...l))
      }, "✕", 8, Lf),
      n("button", {
        type: "button",
        disabled: s(ee).busy || !e.active,
        onClick: r[5] || (r[5] = //@ts-ignore
        (...l) => s(xi) && s(xi)(...l))
      }, "读取已保存值", 8, $f),
      s(ee).storedValue !== null ? (a(), c("p", Tf, "已保存值：" + b(s(ee).storedValue || "（空）"), 1)) : M("", !0)
    ]));
  }
}), Sf = {
  key: 0,
  role: "status"
}, If = {
  key: 1,
  "aria-label": "未显示仓库的备注草稿"
}, Mf = {
  key: 2,
  class: "gh-search-options",
  style: { margin: "0 0 10px" }
}, Df = { style: { "font-size": "12px", color: "var(--dim)" } }, Ef = {
  key: 3,
  class: "gh-repos-loading"
}, Af = {
  key: 4,
  class: "muted small",
  style: { "text-align": "center", padding: "40px 0", "font-size": "13px" }
}, Pf = ["data-repo-name", "onClick", "onContextmenu", "onDragstart"], Wf = ["onClick"], Of = { class: "gh-card-head" }, Bf = ["checked", "onChange"], Rf = ["src"], Ff = ["href", "title"], Nf = { class: "owner" }, Hf = { class: "gh-card-body" }, jf = { class: "gh-card-badges" }, zf = ["title", "onClick"], Gf = ["onClick"], Kf = ["title", "onClick"], Vf = { class: "gh-badge-remark-text" }, Uf = {
  key: 0,
  class: "desc gh-desc-analyzing",
  title: "正在使用 AI 分析仓库…"
}, Yf = {
  key: 1,
  class: "desc gh-desc-ai",
  title: "AI 中文简介（点击可直接修改，右键可重新分析）"
}, qf = ["title"], Xf = {
  key: 3,
  class: "desc dim"
}, Jf = { class: "meta" }, Zf = { class: "gh-stars" }, Qf = {
  key: 0,
  class: "gh-lang"
}, eg = {
  key: 1,
  class: "gh-updated"
}, tg = {
  key: 6,
  class: "gh-pager"
}, og = ["disabled"], ng = { class: "gh-page-info" }, ig = ["disabled"], sg = ["onClick"], rg = /* @__PURE__ */ de({
  __name: "GitHubRepositories",
  props: {
    active: { type: Boolean, default: !0 }
  },
  setup(e) {
    const t = e, o = ae(() => !!ee.repo && !ke.cards.some((D) => D.fullName === ee.repo)), i = we({
      visible: !1,
      x: 0,
      y: 0,
      fullName: "",
      folders: [],
      hasRemark: !1,
      url: ""
    }), r = N(null), l = N(!1);
    function h(D, y) {
      const _ = D.target;
      if (_ instanceof Element) {
        if (ke.batchMode) {
          if (_.closest(".fo-card-more,.gh-badge-folder,.gh-badge-remark,.gh-inline-remark-box")) return;
          D.preventDefault(), D.stopPropagation(), yt.toggleSelection(y.fullName);
          return;
        }
        _.closest("a,button,.gh-badge-folder,.gh-badge-remark,.fo-card-more,.gh-card-hole,.gh-card-checkbox,.gh-inline-remark-box") || (D.preventDefault(), D.stopPropagation(), Us.open(y.fullName, void 0, y));
      }
    }
    function g(D, y) {
      if (!t.active) return;
      D.preventDefault(), D.stopPropagation();
      const _ = 12, O = 160, U = 280, E = Math.min(window.innerWidth - O - _, Math.max(_, D.clientX)), j = Math.min(window.innerHeight - U - _, Math.max(_, D.clientY));
      i.x = E, i.y = j, i.fullName = y.fullName, i.folders = [...y.folders || (y.folder ? [y.folder] : [])], i.hasRemark = !!y.customRemark, i.url = y.url, i.visible = !0, r.value = null, l.value = E > window.innerWidth - 380;
    }
    function p(D, y) {
      g(y, D), r.value = "folder";
    }
    function x() {
      i.visible = !1, r.value = null;
    }
    function m(D) {
      i.folders.includes(D) ? i.folders = i.folders.filter((y) => y !== D) : i.folders.push(D), nt.toggleRepoList(i.fullName, D);
    }
    function S() {
      i.folders = [], nt.clearRepoLists(i.fullName), x();
    }
    function f(D) {
      if (!t.active) return;
      const y = typeof D == "string" ? D : D?.fullName || i.fullName;
      x(), Ci(y);
    }
    function u() {
      if (!t.active) return;
      const D = i.fullName;
      x(), Ci(D, !0);
    }
    async function d() {
      const D = i.url;
      if (x(), D && t.active)
        try {
          await navigator.clipboard.writeText(D);
        } catch {
        }
    }
    function k(D) {
      const y = nt.findRepository(i.fullName);
      x(), y && Rs.sendGitHubShare({
        fullName: y.full_name,
        name: y.name,
        owner: y.owner?.login,
        ownerAvatar: y.owner?.avatar_url,
        desc: y.description || void 0,
        language: y.language || void 0,
        stars: y.stargazers_count,
        category: i.folders && i.folders.length ? i.folders.join(", ") : "未分类",
        url: y.html_url || `https://github.com/${y.full_name}`,
        updatedAt: y.updated_at ? y.updated_at.split("T")[0] : void 0
      }, D);
    }
    function $() {
      i.url && window.open(i.url, "_blank", "noreferrer"), x();
    }
    async function w() {
      const D = nt.findRepository(i.fullName);
      if (!D) {
        x();
        return;
      }
      x(), await nt.confirmUnstarRepository(D);
    }
    function L(D) {
      const y = D.target;
      y?.closest(".gh-repo-context-menu") || y?.closest(".gh-inline-remark-box") || x();
    }
    function A(D) {
      D.key === "Escape" && i.visible && x();
    }
    Ve(() => t.active, (D) => {
      window.removeEventListener("pointerdown", L), window.removeEventListener("keydown", A), x(), D && (window.addEventListener("pointerdown", L), window.addEventListener("keydown", A));
    }, { immediate: !0 }), xt(() => {
      window.removeEventListener("pointerdown", L), window.removeEventListener("keydown", A);
    });
    function ne(D, y) {
      const _ = D.target;
      if (_ instanceof Element && _.closest("button,a,input,textarea,select,[contenteditable='true']")) {
        D.preventDefault();
        return;
      }
      yt.startDrag(y, D);
    }
    const B = ae(() => {
      if (ke.cards.length > 0) return !1;
      const D = It.actionText || "";
      return !!(D.includes("正在读取") || D.includes("正在加载") || D.includes("正在统计") || D.includes("正在同步"));
    });
    return (D, y) => (a(), c(K, null, [
      s(ee).message ? (a(), c("p", Sf, b(s(ee).repo ? `${s(ee).repo}：` : "") + b(s(ee).message), 1)) : M("", !0),
      o.value ? (a(), c("section", If, [
        n("p", null, "备注草稿：" + b(s(ee).repo) + "（仓库不在当前列表中，草稿仍保留）", 1),
        Q(Li, {
          active: t.active
        }, null, 8, ["active"])
      ])) : M("", !0),
      s(ke).searchMessage ? (a(), c("div", Mf, [
        n("span", Df, b(s(ke).searchMessage), 1),
        n("button", {
          type: "button",
          class: "gh-tab",
          style: { padding: "2px 8px", "font-size": "11px", "margin-left": "8px" },
          onClick: y[0] || (y[0] = (_) => s(yt).resetSearch())
        }, "清空搜索")
      ])) : M("", !0),
      B.value ? (a(), c("div", Ef, [...y[16] || (y[16] = [
        n("div", {
          class: "gh-spinner",
          "aria-hidden": "true"
        }, null, -1),
        n("span", { class: "gh-loading-label" }, "正在读取 GitHub 仓库列表中…", -1)
      ])])) : s(ke).emptyMessage ? (a(), c("p", Af, b(s(ke).emptyMessage), 1)) : M("", !0),
      s(ke).cards.length ? (a(), c("div", {
        key: 5,
        class: le(["repos gh-grid", { "gh-batch-active": s(ke).batchMode }])
      }, [
        (a(!0), c(K, null, ge(s(ke).cards, (_) => (a(), c("article", {
          key: _.fullName,
          class: le(["repo gh-card", { selected: _.selected }]),
          "data-repo-name": _.fullName,
          draggable: "true",
          onClick: (O) => h(O, _),
          onContextmenu: (O) => g(O, _),
          onDragstart: (O) => ne(O, _.fullName)
        }, [
          n("button", {
            class: "fo-card-more",
            type: "button",
            "aria-label": "更多操作",
            title: "更多操作",
            onClick: F((O) => g(O, _), ["stop"])
          }, "⋮", 8, Wf),
          n("div", Of, [
            n("label", {
              class: "gh-card-hole",
              title: "点击勾选此仓库",
              onClick: y[1] || (y[1] = F(() => {
              }, ["stop"]))
            }, [
              n("input", {
                class: "gh-card-checkbox",
                type: "checkbox",
                checked: _.selected,
                onChange: (O) => s(yt).setSelection(_.fullName, O.target.checked)
              }, null, 40, Bf),
              y[17] || (y[17] = n("span", { class: "gh-hole-inner" }, null, -1))
            ]),
            n("img", {
              class: "gh-owner-avatar",
              src: _.avatarUrl || "assets/github-star.svg",
              alt: "",
              loading: "lazy",
              referrerpolicy: "no-referrer",
              onError: y[2] || (y[2] = (O) => O.target.src = "assets/github-star.svg")
            }, null, 40, Rf),
            n("a", {
              href: _.url,
              target: "_blank",
              rel: "noreferrer",
              class: "name",
              title: _.fullName
            }, [
              n("span", Nf, b(_.owner) + "/", 1),
              Be(b(_.name), 1)
            ], 8, Ff)
          ]),
          n("div", Hf, [
            n("div", jf, [
              _.folders && _.folders.length ? (a(!0), c(K, { key: 0 }, ge(_.folders, (O) => (a(), c("span", {
                key: O,
                class: "gh-badge-folder",
                title: `GitHub 列表：${O}（点击管理所属列表）`,
                onClick: F((U) => p(_, U), ["stop"])
              }, " 📁 " + b(O), 9, zf))), 128)) : (a(), c("span", {
                key: 1,
                class: "gh-badge-folder uncat",
                title: "未分类（点击加入 GitHub 列表）",
                onClick: F((O) => p(_, O), ["stop"])
              }, " ＋ 未分类 ", 8, Gf)),
              s(ee).repo === _.fullName ? (a(), ce(Li, {
                key: 2,
                active: t.active
              }, null, 8, ["active"])) : _.customRemark ? (a(), c("span", {
                key: 3,
                class: "gh-badge-remark",
                title: `备注：${_.customRemark}（点击就地修改）`,
                onClick: F((O) => f(_), ["stop"])
              }, [
                y[18] || (y[18] = n("span", { class: "gh-badge-remark-icon" }, "💬", -1)),
                n("span", Vf, b(_.customRemark), 1)
              ], 8, Kf)) : M("", !0)
            ]),
            _.descriptionKind === "analyzing" ? (a(), c("p", Uf, [...y[19] || (y[19] = [
              n("span", { class: "gh-ai-sparkle" }, "✨", -1),
              Be(" 正在使用 AI 分析仓库并提炼中文介绍…", -1)
            ])])) : _.descriptionKind === "ai" ? (a(), c("p", Yf, [
              y[20] || (y[20] = n("span", { class: "gh-ai-tag-flag" }, "🤖", -1)),
              Be(b(_.description), 1)
            ])) : _.descriptionKind === "plain" ? (a(), c("p", {
              key: 2,
              class: "desc",
              title: _.description
            }, b(_.description), 9, qf)) : (a(), c("p", Xf, "暂无描述"))
          ]),
          n("div", Jf, [
            n("span", Zf, "★ " + b(_.stars), 1),
            _.language ? (a(), c("span", Qf, b(_.language), 1)) : M("", !0),
            _.updated ? (a(), c("span", eg, "更新 " + b(_.updated), 1)) : M("", !0)
          ])
        ], 42, Pf))), 128))
      ], 2)) : M("", !0),
      s(ke).totalPages > 1 ? (a(), c("div", tg, [
        n("button", {
          class: "gh-page-btn",
          type: "button",
          disabled: s(ke).page <= 1,
          onClick: y[3] || (y[3] = (_) => s(yt).changePage(s(ke).page - 1))
        }, "‹ 上一页", 8, og),
        n("span", ng, b(s(ke).page) + " / " + b(s(ke).totalPages) + " · 共 " + b(s(ke).totalItems) + " 个" + b(s(ke).serverPaged ? ` · 已加载 ${s(ke).loadedItems}` : ""), 1),
        n("button", {
          class: "gh-page-btn",
          type: "button",
          disabled: s(ke).page >= s(ke).totalPages,
          onClick: y[4] || (y[4] = (_) => s(yt).changePage(s(ke).page + 1))
        }, "下一页 ›", 8, ig)
      ])) : M("", !0),
      (a(), ce(gt, { to: "body" }, [
        t.active && i.visible ? (a(), c("div", {
          key: 0,
          class: "fo-cover-context-menu gh-repo-context-menu",
          style: ve({ left: `${i.x}px`, top: `${i.y}px` }),
          onClick: y[14] || (y[14] = F(() => {
          }, ["stop"])),
          onContextmenu: y[15] || (y[15] = F(() => {
          }, ["prevent"]))
        }, [
          n("div", {
            class: le(["gh-menu-has-sub", { "is-active": r.value === "folder" }]),
            onMouseenter: y[6] || (y[6] = (_) => r.value = "folder")
          }, [
            y[21] || (y[21] = n("button", {
              class: "fo-cover-menu-item with-sub-arrow",
              type: "button"
            }, [
              n("span", null, "📁 所属 GitHub 列表"),
              n("span", { class: "sub-arrow" }, "›")
            ], -1)),
            n("div", {
              class: le(["gh-sub-flyout", { "flyout-left": l.value }]),
              onClick: y[5] || (y[5] = F(() => {
              }, ["stop"]))
            }, [
              n("button", {
                class: le(["fo-cover-menu-item", { primary: i.folders.length === 0 }]),
                type: "button",
                onClick: S
              }, b(i.folders.length === 0 ? "✓ " : "  ") + "＋ 设为未分类（清空列表） ", 3),
              (a(!0), c(K, null, ge(s(nt).cats, (_) => (a(), c("button", {
                key: _,
                class: le(["fo-cover-menu-item", { primary: i.folders.includes(_) }]),
                type: "button",
                onClick: (O) => m(_)
              }, b(i.folders.includes(_) ? "✓ " : "  ") + "📁 " + b(_), 11, sg))), 128))
            ], 2)
          ], 34),
          n("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: y[7] || (y[7] = (_) => r.value = null),
            onClick: y[8] || (y[8] = (_) => f())
          }, " ✏️ 编辑备注… ", 32),
          Q(yr, {
            label: "💬 发送到聊天室",
            visible: i.visible,
            onOpen: y[9] || (y[9] = (_) => r.value = null),
            onSelect: k
          }, null, 8, ["visible"]),
          i.hasRemark ? (a(), c("button", {
            key: 0,
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: y[10] || (y[10] = (_) => r.value = null),
            onClick: u
          }, " 🗑️ 清除备注 ", 32)) : M("", !0),
          n("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: y[11] || (y[11] = (_) => r.value = null),
            onClick: d
          }, " 📋 复制仓库链接 ", 32),
          n("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: y[12] || (y[12] = (_) => r.value = null),
            onClick: $
          }, " ↗ 在 GitHub 打开 ", 32),
          n("button", {
            class: "fo-cover-menu-item danger",
            type: "button",
            onMouseenter: y[13] || (y[13] = (_) => r.value = null),
            onClick: w
          }, " ⭐ 取消 Star ", 32)
        ], 36)) : M("", !0)
      ]))
    ], 64));
  }
}), ag = /* @__PURE__ */ Te(rg, [["__scopeId", "data-v-048d3839"]]), lg = { class: "gh-batch-bar-left" }, cg = { class: "gh-batch-count-tip" }, dg = { id: "gh-batch-selected-count" }, ug = {
  key: 0,
  "aria-label": "批量归属列表确认"
}, pg = ["disabled"], fg = ["value"], gg = ["disabled"], hg = ["disabled"], mg = { class: "gh-batch-bar-right" }, vg = ["disabled"], yg = ["disabled"], bg = ["disabled"], wg = /* @__PURE__ */ de({
  __name: "GitHubBatchBar",
  props: {
    active: { type: Boolean, default: !0 }
  },
  setup(e) {
    const t = e, o = Ms(), i = N(null);
    function r() {
      t.active && (o.value = nt.prepareBatchMove(), i.value = null);
    }
    async function l() {
      const h = o.value, g = i.value;
      if (!t.active || !h || g === null || bt.busy) return;
      await h.submit(g) && o.value === h && (o.value = void 0);
    }
    return Ve(() => t.active && Rt.active, (h) => {
      h || (o.value = void 0);
    }), (h, g) => (a(), c(K, null, [
      n("div", lg, [
        n("button", {
          type: "button",
          class: "gh-batch-action-btn",
          id: "gh-batch-select-all-btn",
          onClick: g[0] || (g[0] = (p) => s(ko).toggleSelectAll())
        }, b(s(Rt).allSelected ? "取消全选" : "全选"), 1),
        n("span", cg, [
          g[5] || (g[5] = Be("已选择 ", -1)),
          n("b", dg, b(s(Rt).selectedCount), 1),
          g[6] || (g[6] = Be(" 项", -1))
        ])
      ]),
      o.value ? (a(), c("section", ug, [
        n("p", null, "仅操作打开选择器时的 " + b(o.value.names.length) + " 个仓库；后来勾选的仓库不加入。", 1),
        n("details", null, [
          g[7] || (g[7] = n("summary", null, "查看本次仓库清单", -1)),
          n("ul", null, [
            (a(!0), c(K, null, ge(o.value.names, (p) => (a(), c("li", { key: p }, b(p), 1))), 128))
          ])
        ]),
        Oe(n("select", {
          "onUpdate:modelValue": g[1] || (g[1] = (p) => i.value = p),
          "aria-label": "目标列表",
          disabled: s(bt).busy
        }, [
          g[8] || (g[8] = n("option", {
            value: null,
            disabled: ""
          }, "请选择目标列表", -1)),
          g[9] || (g[9] = n("option", { value: "" }, "未分类（清空所选仓库的所有列表所属）", -1)),
          (a(!0), c(K, null, ge(s(vo).folders.filter((p) => p.kind === "custom"), (p) => (a(), c("option", {
            key: p.title,
            value: p.title
          }, b(p.title), 9, fg))), 128))
        ], 8, pg), [
          [Ti, i.value]
        ]),
        n("button", {
          type: "button",
          disabled: !t.active || s(bt).busy || i.value === null,
          onClick: l
        }, "确认加入列表", 8, gg),
        n("button", {
          type: "button",
          disabled: s(bt).busy,
          onClick: g[2] || (g[2] = (p) => o.value = void 0)
        }, "取消", 8, hg)
      ])) : M("", !0),
      n("div", mg, [
        n("button", {
          type: "button",
          class: "gh-batch-action-btn",
          id: "gh-batch-move-btn",
          disabled: !t.active || s(bt).busy || s(Rt).selectedCount === 0,
          title: "固定当前选择，批量加入所选 GitHub 列表",
          onClick: r
        }, " 📁 归入 GitHub 列表 ", 8, vg),
        n("button", {
          type: "button",
          class: "gh-batch-action-btn",
          id: "gh-batch-ai-btn",
          disabled: s(Rt).selectedCount === 0,
          title: "批量使用 AI 生成中文介绍",
          onClick: g[3] || (g[3] = (p) => s(ko).analyzeAi())
        }, " ✨ 批量 AI 分析 ", 8, yg),
        n("button", {
          type: "button",
          class: "gh-batch-action-btn danger",
          id: "gh-batch-unstar-btn",
          disabled: s(Rt).selectedCount === 0,
          title: "从 GitHub 批量取消 Star 收藏",
          onClick: g[4] || (g[4] = (p) => s(ko).unstar())
        }, " 🗑 取消收藏 ", 8, bg)
      ])
    ], 64));
  }
}), kg = G(() => import("./GitHubWorkspaceCard-DPiNMfLS.js")), _g = G(() => import("./NotificationCenter-BV4Bs0EG.js")), Cg = G(() => import("./TabManagerPanel-CYm4ZHXv.js")), xg = G(() => import("./BookmarkNoteMenu-C9OAO2ZF.js")), Lg = G(() => import("./BookmarkPanel-CkbynGXf.js")), $g = G(() => import("./LauncherDialogs-Cxd4dPR-.js")), Tg = G(() => import("./SettingsDialog-C5kaHExd.js")), Sg = G(() => import("./SettingsView-Burqm2RU.js")), Ig = G(() => import("./ClockSettingsMenu-qHuvWlS8.js")), Mg = G(() => import("./BiliTheaterDialog-CDfQE2_x.js")), Dg = G(() => import("./BiliMiniPlayer-Dp4k6CtK.js")), Eg = G(() => import("./BiliMessagePanel-D69mUvPd.js")), Ag = G(() => import("./ModelPricingCard-B6Xh0sSB.js")), Pg = G(() => import("./BilibiliWorkspace-BWQnjnMm.js")), Wg = G(() => import("./YouTubeCard-gIE4fgFI.js").then((e) => e.Y)), Og = G(() => import("./AihotFeed-DS8bgFDP.js")), Bg = G(() => import("./GitHubTrending-DzMDjyZY.js")), Rg = G(() => import("./AiDialog-qECKIMZM.js")), Fg = G(() => import("./AihotViewer-BEdldf2-.js")), Ng = G(() => import("./NavWheelOverlay-CyhjJPAE.js")), Hg = G(() => import("./StandaloneHost-D3237d48.js")), jg = G(() => import("./LauncherFolderDialog-DRKxzNgd.js")), zg = G(() => import("./LauncherMenus-DduDI0AX.js"));
function ie(e, t, o, i) {
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
      const h = l.innerHTML, g = Fn(o);
      g.config.errorHandler = (p, x, m) => {
        console.error(`LogicWeaver Vue feature failed: ${t.id} (${m})`, p), l.dataset.vueError = "1";
      };
      try {
        g.mount(l), i?.setMounted?.(!0);
      } catch (p) {
        throw i?.setMounted?.(!1), l.innerHTML = h, p;
      }
      return () => {
        i?.setMounted?.(!1), g.unmount();
      };
    }
  });
}
function Gg(e) {
  e.register({
    id: "intro",
    title: "启动动画",
    order: 10,
    eager: !0,
    roots: ["endfield-loader"],
    capabilities: ["ui:intro", "boot:progress"],
    mount: () => {
      const t = document.getElementById("endfield-loader");
      if (!rt.enabled) {
        t?.remove(), document.body.classList.remove("is-starting");
        return;
      }
      if (!t) return;
      const o = Fn(jp);
      let i = !1;
      const r = () => {
        e.stop("intro");
      };
      window.addEventListener("logicweaver:intro-complete", r, { once: !0 }), o.mount(t);
      const l = window.setTimeout(() => {
        rt.finish("基础界面已就绪，在线服务继续后台加载", !0), window.setTimeout(() => {
          i || (r(), t?.remove(), document.body.classList.remove("is-starting"));
        }, 600);
      }, 8e3);
      return () => {
        i || (i = !0, clearTimeout(l), window.removeEventListener("logicweaver:intro-complete", r), o.unmount(), t.remove(), document.body.classList.remove("is-starting"));
      };
    }
  }), ie(e, { id: "spa-app", title: "纯血 SPA 单根调度器", order: 15, root: "vue-spa-root", capabilities: ["ui:spa-root", "workspace:keepalive"] }, Ap), document.getElementById("vue-spa-root") || ie(e, { id: "bili-companions", title: "b站伴随窗口", order: 19, root: "vue-bili-companions-root", capabilities: ["ui:dock-companion"] }, Hg), ie(e, { id: "notifications", title: "通知中心", order: 20, root: "vue-notification-root", capabilities: ["ui:toast", "notification:dedupe"] }, os), ie(e, { id: "profile-menu", title: "头像右键菜单", order: 21, root: "bili-profile-menu", capabilities: ["ui:profile-menu", "profile:actions"] }, zp, To), ie(e, { id: "workspace-launchers", title: "常用工作区启动项", order: 22, root: "workspace-launchers", capabilities: ["ui:workspace-launchers", "workspace:launch"] }, Gp, Kn), ie(e, { id: "mac-dock", title: "底部快捷应用 Dock 栏", order: 23, root: "mac-dock", capabilities: ["ui:mac-dock", "dock:navigate"] }, ts, ct), ie(e, { id: "hero-clock", title: "首屏中央时钟", order: 26, root: "hero-clock", capabilities: ["ui:hero-clock", "clock:read"] }, Zi), ie(e, { id: "search-box", title: "首屏搜索框", order: 27, root: "search", capabilities: ["ui:search-box", "search:actions"] }, $i), ie(e, { id: "home-music", title: "首屏音乐播放器", order: 28, root: "task-thread-home", capabilities: ["ui:home-music", "music:playback"] }, Qi, Ke), ie(e, { id: "launcher-groups", title: "常用网站分组架", order: 29, root: "launcher-groups", capabilities: ["ui:launcher-groups", "launcher:navigate"] }, es, $e), ie(e, { id: "weather-widget", title: "首屏天气小部件", order: 39, root: "weather-body", capabilities: ["ui:weather-widget", "weather:read"] }, Ji), ie(e, { id: "github-workspace", title: "GitHub 独立页 Vue 工作台", order: 49, root: "vue-github-workspace-root", capabilities: ["ui:github-workspace"] }, kg), ie(e, { id: "github-status", title: "GitHub 同步状态", order: 50, root: "vue-github-status-root", capabilities: ["ui:github-status", "github:sync-read"] }, qp, jn), ie(e, { id: "github-folders", title: "GitHub 文件夹导航", order: 55, root: "gh-folder-list", capabilities: ["ui:github-folders", "github:categorize-drop"] }, lf, Mt), ie(e, { id: "github-hero", title: "GitHub 分类摘要", order: 56, root: "gh-hero", capabilities: ["ui:github-summary", "github:actions"] }, _f, wo), ie(e, { id: "github-repositories", title: "GitHub 仓库列表", order: 57, root: "vue-github-repositories-root", capabilities: ["ui:github-repositories", "github:repository-actions", "github:paging"] }, ag, yt), ie(e, { id: "github-batch-bar", title: "GitHub Star 批量操作工具栏", order: 58, root: "gh-batch-bar", capabilities: ["ui:github-batch-bar", "github:batch-actions"] }, wg, ko), ie(e, { id: "notification-center", spaOwned: !0, title: "持久通知中心", order: 71, root: "vue-notification-center-root", capabilities: ["ui:notification-history", "notification:read"] }, _g, _t), ie(e, { id: "tab-manager", spaOwned: !0, title: "独立标签页管理", order: 71, root: "vue-tab-manager-root", capabilities: ["ui:tab-manager", "tabs:explicit"] }, Cg, Gi), ie(e, { id: "bookmark-menu", title: "书签上下文操作与备注菜单", order: 72, root: "vue-bookmark-menu-root", capabilities: ["ui:bookmark-menu", "bookmark:edit"] }, xg, Hn), ie(e, { id: "launcher-dialogs", title: "快捷启动器管理弹窗族", order: 73, root: "vue-launcher-dialogs-root", capabilities: ["ui:launcher-dialogs", "launcher:manage"] }, $g, _o), ie(e, { id: "launcher-folder-dialog", title: "大文件夹展开视窗", order: 74, root: "vue-launcher-folder-root", capabilities: ["ui:launcher-folder", "launcher:folder-dialog"] }, jg, wt), ie(e, { id: "launcher-menus", title: "启动器快捷上下文菜单族", order: 76, root: "vue-launcher-menus-root", capabilities: ["ui:launcher-menus", "launcher:context-menu"] }, zg, Zt), ie(e, { id: "bookmark-panel", title: "浏览器书签侧边滑动视窗", order: 77, root: "vue-bookmark-panel-root", capabilities: ["ui:bookmark-panel", "bookmarks:panel"] }, Lg, en), ie(e, { id: "bookmark-folder-strip", spaOwned: !0, title: "顶栏书签快捷文件夹横条", order: 78, root: "vue-bookmark-folder-strip-root", capabilities: ["ui:bookmark-folder-strip", "bookmarks:strip"] }, null, qo), ie(e, { id: "settings-page", title: "独立设置页 Vue 工作台", order: 79, root: "vue-options-root", capabilities: ["ui:settings-page"] }, Sg), ie(e, { id: "settings-dialog", title: "全局设置中心视窗", order: 80, root: "vue-settings-dialog-root", capabilities: ["ui:settings-dialog", "settings:manage"] }, Tg, tn), ie(e, { id: "clock-settings-menu", spaOwned: !0, title: "中央时钟偏好配置菜单", order: 82, root: "vue-clock-settings-root", capabilities: ["ui:clock-settings", "clock:preference-edit"] }, Ig, At), ie(e, { id: "bili-theater-dialog", title: "Bilibili 沉浸剧场与评论区弹窗", order: 85, root: "vue-bili-theater-root", capabilities: ["ui:bili-theater", "bili:playback"] }, Mg, Co), ie(e, { id: "bili-mini-player", title: "Bilibili 悬浮迷你播放器", order: 85, root: "vue-bili-mini-player-root", capabilities: ["ui:bili-mini-player", "bili:playback"] }, Dg), ie(e, { id: "ai-dialog", title: "AI 助手对话框与知识点抽屉", order: 86, root: "vue-ai-dialog-root", capabilities: ["ui:ai-dialog", "ai:chat"] }, Rg, Vn), ie(e, { id: "aihot-viewer", spaOwned: !0, title: "AI HOT 资讯文章阅读器", order: 88, root: "vue-aihot-viewer-root", capabilities: ["ui:aihot-viewer", "viewer:aihot"] }, Fg, Gn), ie(e, { id: "nav-wheel", title: "辐射状快捷动作轮盘与悬浮球", order: 95, root: "vue-nav-wheel-root", capabilities: ["ui:nav-wheel", "nav:radial-menu"] }, Ng, Ce), ie(e, { id: "bili-message-panel", spaOwned: !0, title: "Bilibili 消息与互动通知中心", order: 102, root: "vue-bili-message-panel-root", capabilities: ["ui:bili-message-panel", "bili:messages"] }, Eg, Dt), ie(e, { id: "pricing-radar", spaOwned: !0, title: "模型插件 (AI 定价与排行榜)", order: 108, root: "vue-pricing-root", capabilities: ["ui:pricing-radar", "pricing:read"] }, Ag, Bi), ie(e, { id: "bili-favorites", spaOwned: !0, title: "b站插件 Vue 外壳", order: 110, root: "vue-bili-favorites-root", capabilities: ["ui:bili-favorites-shell", "bilibili:favorites"] }, Pg, Wi), ie(e, { id: "youtube-card", spaOwned: !0, title: "YouTube 订阅与探索工作台", order: 111, root: "vue-youtube-root", capabilities: ["ui:youtube-card", "youtube:updates"] }, Wg, Ei), ie(e, { id: "aihot-feed", spaOwned: !0, title: "AI HOT 资讯流全功能聚合看板", order: 112, root: "vue-aihot-root", capabilities: ["ui:aihot-feed", "aihot:aggregate"] }, Og, Oi), ie(e, { id: "github-trending", spaOwned: !0, title: "GitHub 趋势榜与热门流", order: 114, root: "vue-github-trending-root", capabilities: ["ui:github-trending", "github:trending"] }, Bg, Ki);
}
$s();
const sn = _r(on);
Ur(on, sn);
Yr(on);
Gg(sn);
Nn.loadBookmarks();
(async () => {
  document.getElementById("vue-bili-favorites-root") && !document.getElementById("vue-spa-root") && await import("./bilibili-channel.service-BERDRztz.js"), await $r(), await sn.startEager(), rt.notifyBootReady();
})().catch((e) => console.error("[LogicWeaver] 页面启动失败", e));
window.addEventListener("pagehide", () => {
  sn.stopAll();
}, { once: !0 });
export {
  ii as C,
  Ru as D,
  ag as G,
  bi as L,
  Qc as T,
  lf as _,
  wg as a,
  _f as b,
  qp as c,
  Gi as d,
  At as e,
  si as f,
  Ki as g,
  uh as h,
  be as i,
  Vn as j,
  Ce as k,
  Qo as l,
  jp as m,
  Z as n,
  td as o,
  od as p,
  ed as q,
  Gp as r,
  zp as s,
  zo as t,
  Xi as u,
  Bn as v,
  Ee as w,
  qi as x,
  on as y
};
