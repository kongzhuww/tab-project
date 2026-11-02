import { S as Si, i as Ms } from "./SearchBox-DK6WgUav.js";
/* empty css                */
import { c as Hn, r as we, a as Ct, b as F, d as de, o as a, e as ce, w as Qt, u as s, f as d, g as n, h as M, T as Ds, t as v, F as G, i as fe, j as N, k as gt, l as Wt, m as Fe, v as Es, n as Ne, p as eo, q as Ii, s as As, x as ae, y as Ue, z as xt, A as to, B as ye, C as le, D as Ge, E as q, G as z, H as ft, I as mo, J as Mi, K as Vo, L as Re, M as no, N as Di, O as Ps } from "./vendor-vue-wIH4jcna.js";
import { W as Uo, t as zt, p as ln, n as Pe, a as To, b as _t, h as Ve, m as ct, c as ei, d as En, s as cn, e as ti, f as Ws, g as Os, i as Bs, j as Rs, k as U, l as Ei, o as ro, q as Ai, r as kt, u as Fs, v as io, w as Gt, x as So, y as Ns, z as Hs, A as Io, B as js } from "./view-styles-BjedH3XK.js";
import { l as zs, r as Gs, G as Ks, a as oe, b as en, f as Yo, c as jn, s as Vs, d as Us, e as zn, g as qo, h as Gn, i as Mt, j as wo, k as yt, m as ko, n as Kt, o as Me, p as Ys, q as Qe, t as nt, u as bt, v as vo, R as qs, w as Xs, x as Lt, y as It, z as _e, A as Js, B as Rt } from "./search.service-B8FaDQLd.js";
import { f as qe, l as wt, a as Te, p as Zs, b as _o, c as Zt, y as Pi, d as re, e as Ft } from "./youtube-store-OptmPj2X.js";
import { c as Qs, a as er, t as tr, b as or, d as nr, e as ir, f as Vt, g as sr } from "./calendar.service-_YumC_hP.js";
import { w as Ie, s as Kn, P as rr, i as Xo, D as dn, a as oi, g as Xe, p as ar, L as lr, b as $t, c as cr, d as un, t as ni, e as dr, f as ur, h as Lo, l as Wi } from "./window-manager.store-DgNn9Rtk.js";
import { s as tn, a as pr, b as fr, u as Oi } from "./InlineEditStatus.vue_vue_type_style_index_0_scoped_28642927_lang-BiNio4cP.js";
import { b as Co, a as gr, c as hr } from "./up-group-manager-store-Be8DP4k5.js";
import { biliMessagePanelController as Dt, biliMessagePanelState as mr } from "./message-panel-store-vj0FmLJh.js";
import { b as Bi, r as vr, a as ao } from "./bili-favorites-store-6AoGqrPw.js";
import { a as Vn, b as Ri, c as yr } from "./aihot-feed-store-DYKldREI.js";
import { p as Fi } from "./pricing-store-7Kn4RVvy.js";
import { R as br } from "./read-session-DQk1qcgF.js";
import { f as Et } from "./fullscreen-cards.store-DP7gUPru.js";
import { k as wr, m as kr } from "./core-utils-Ccz-tarm.js";
import { _ as Se } from "./_plugin-vue_export-helper-CHgC5LLL.js";
import { t as it } from "./together-listen.store-DbJPQDU6.js";
import { C as _r } from "./ChatShareMenu-i6OtkGdJ.js";
const Cr = /^[a-z][a-z0-9]*(?:[.:-][a-z0-9]+)*$/;
function xr() {
  const e = /* @__PURE__ */ new Map(), t = /* @__PURE__ */ new Map();
  function o(p) {
    if (!p || !Cr.test(p.id)) throw new TypeError(`Invalid command id: ${p?.id || ""}`);
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
  async function r(p, x, k = "api") {
    const S = e.get(p);
    if (!S) throw new Error(`Unknown command: ${p}`);
    if (S.enabled && !S.enabled()) return;
    const g = S.concurrency || "replace";
    if (t.has(p)) {
      if (g === "drop") return;
      g === "replace" && i(p);
    }
    const u = new AbortController();
    g !== "parallel" && t.set(p, u);
    try {
      return await S.run(x, { signal: u.signal, source: k });
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
  function f(p, x = 20) {
    const k = String(p || "").trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
    if (!k.length) return h().slice(0, x);
    const S = [...e.values()].map((g) => {
      const u = l(g), c = u.title.toLocaleLowerCase(), y = `${u.id} ${c} ${u.category} ${u.description} ${u.keywords.join(" ")}`.toLocaleLowerCase();
      if (!k.every((w) => y.includes(w))) return null;
      let $ = 0;
      for (const w of k)
        u.id === w ? $ += 200 : u.id.startsWith(w) && ($ += 120), c === w ? $ += 160 : c.startsWith(w) ? $ += 100 : c.includes(w) && ($ += 60), u.keywords.some((L) => L.toLocaleLowerCase().startsWith(w)) && ($ += 40);
      return { item: u, score: $ };
    }).filter((g) => !!g);
    return S.sort((g, u) => u.score - g.score || g.item.title.localeCompare(u.item.title, "zh")), Object.freeze(S.slice(0, Math.max(1, x)).map((g) => g.item));
  }
  return Object.freeze({ register: o, execute: r, cancel: i, has: (p) => e.has(p), list: h, search: f });
}
const on = xr(), Lr = /^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/;
function $r(e) {
  const t = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
  function l(g) {
    if (!g || !Lr.test(g.id)) throw new TypeError(`Invalid feature id: ${g?.id || ""}`);
    if (!g.title?.trim() || typeof g.mount != "function") throw new TypeError(`Feature ${g.id} requires title and mount()`);
    if (t.has(g.id)) throw new Error(`Feature already registered: ${g.id}`);
    return t.set(g.id, Object.freeze({
      ...g,
      order: Number(g.order) || 100,
      eager: g.eager === !0,
      roots: Object.freeze([...g.roots || []]),
      capabilities: Object.freeze([...g.capabilities || []])
    })), () => {
      p(g.id), r.delete(g.id), t.delete(g.id);
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
    r.delete(g);
    const c = new AbortController(), y = Object.freeze({
      signal: c.signal,
      commands: e,
      getRoot: (w) => document.getElementById(w)
    }), $ = Promise.resolve().then(() => u.mount(y)).then((w) => (i.delete(g), o.set(g, { cleanup: w, controller: c }), w), (w) => {
      throw i.delete(g), r.set(g, w), c.abort(), w;
    });
    return i.set(g, $), $;
  }
  async function p(g) {
    const u = i.get(g);
    if (u)
      try {
        await u;
      } catch {
        return;
      }
    const c = o.get(g);
    c && (o.delete(g), c.controller.abort(), await h(c.cleanup)());
  }
  async function x() {
    const g = typeof document < "u" && !!(document.getElementById("vue-spa-root") || document.getElementById("logicweaver-spa-root")), u = [...t.values()].filter(($) => !(!$.eager || !g && $.roots && $.roots.length > 0 && !$.roots.some((L) => !!document.getElementById(L)))).sort(($, w) => ($.order || 100) - (w.order || 100)), y = (await Promise.allSettled(u.map(($) => f($.id)))).flatMap(($, w) => $.status === "rejected" ? [{ id: u[w].id, reason: $.reason }] : []);
    y.length && console.warn("LogicWeaver Vue features failed to mount", y);
  }
  async function k() {
    const g = [...o.keys()].reverse();
    await Promise.allSettled(g.map(p));
  }
  function S() {
    return Object.freeze([...t.values()].map((g) => Object.freeze({
      id: g.id,
      title: g.title,
      order: g.order || 100,
      eager: g.eager === !0,
      roots: Object.freeze([...g.roots || []]),
      capabilities: Object.freeze([...g.capabilities || []]),
      status: i.has(g.id) ? "mounting" : o.has(g.id) ? "mounted" : r.has(g.id) ? "failed" : "registered",
      error: r.has(g.id) ? String(r.get(g.id)?.message || r.get(g.id) || "Feature mount failed") : ""
    })).sort((g, u) => g.order - u.order));
  }
  return Object.freeze({ register: l, start: f, startEager: x, stop: p, stopAll: k, has: (g) => t.has(g), list: S });
}
const Tr = localStorage.getItem("startupAnimationStyle") || localStorage.getItem("logicweaverStartupStyle") || "endfield", ii = (() => {
  try {
    const e = localStorage.getItem("showStartupAnimation"), t = localStorage.getItem("logicweaverEndfieldLoader"), o = e ?? t;
    return o === "1" || o === "true";
  } catch {
    return !1;
  }
})(), X = we({
  enabled: ii,
  style: Tr === "rhinelab" ? "rhinelab" : "endfield",
  renderedProgress: 4,
  targetProgress: 4,
  status: "CORE SHELL...",
  finished: !ii,
  exiting: !1,
  forced: !1
});
let oo = 0, Jo = 4, Ni = performance.now(), An = 0, Fo = null, Pn = !1;
function Hi(e) {
  const t = e - Ni, o = An ? Math.min(1, t / An) : 1, i = o * o * (3 - 2 * o);
  X.renderedProgress = Jo + (X.targetProgress - Jo) * i, o < 1 && !X.finished ? oo = requestAnimationFrame(Hi) : oo = 0;
}
function No(e, t) {
  if (!X.enabled || X.finished) return;
  const o = Math.max(X.targetProgress, Math.max(4, Math.min(100, Number(e) || 4)));
  t && (X.status = t), Jo = X.renderedProgress, X.targetProgress = o, Ni = performance.now(), An = Math.max(280, Math.min(920, 220 + Math.abs(o - Jo) * 7.5)), cancelAnimationFrame(oo), oo = requestAnimationFrame(Hi);
}
function nn(e = "Ready", t = !1) {
  X.finished || (X.finished = !0, X.forced = t, X.status = e, X.targetProgress = 100, cancelAnimationFrame(oo), oo = 0, X.renderedProgress = 100, Fo?.(t));
}
function Sr(e = "KEYBOARD SKIP") {
  nn(e, !0);
}
function Ir() {
  X.enabled || nn("BOOT COMPLETE", !0);
}
function ji() {
  !X.enabled || X.finished || Pn || (Pn = !0, No(38, "INITIALIZING CORE SHELL..."), setTimeout(() => {
    X.finished || No(76, "SYNTHESIZING RUNTIME...");
  }, 400), setTimeout(() => {
    X.finished || No(100, X.style === "rhinelab" ? "ID CONFIRMED : JOYCE MOORE" : "TERRA LINK READY / 终端就绪");
  }, 900), setTimeout(() => {
    X.finished || nn("BOOT COMPLETE / 首页就绪", !1);
  }, 1650));
}
async function Mr() {
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
  skip: Sr,
  notifyBootReady: Ir,
  async playIntro(e) {
    if (e?.style && (X.style = e.style), typeof document < "u" && (document.documentElement.dataset.startupStyle = X.style, document.documentElement.classList.remove("skip-endfield-loader"), document.body.classList.add("is-starting")), X.enabled = !0, X.finished = !1, X.forced = !!e?.force, X.renderedProgress = 4, X.targetProgress = 4, Pn = !1, typeof document < "u") {
      let t = document.getElementById("endfield-loader");
      if (!t) {
        t = document.createElement("div"), t.id = "endfield-loader", t.className = "endfield-loader notranslate", document.body.appendChild(t);
        const { default: o } = await import("./IntroAnimation-Cx2FEwZu.js"), i = Hn(o), r = () => {
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
function Dr(e) {
  return Fo = e, X.finished && e(X.forced), () => {
    Fo === e && (Fo = null);
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
function Er() {
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
function Mo(e) {
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
const Ar = () => {
  const e = Er();
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
}, j = we(Ar());
let pn = null, fn = null;
const ot = {
  get snapshot() {
    return Ct(j);
  },
  update(e) {
    Object.assign(j, e), Mo(j);
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
    }), Mo(j);
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
    })) : [], Mo(j);
  },
  setDetailInfo(e) {
    j.detailInfo = { ...e }, Mo(j);
  },
  applyCity(e) {
    typeof window < "u" && window.dispatchEvent(new CustomEvent("logicweaver:weather-city-selected", { detail: { city: e } })), this.refresh();
  },
  refresh() {
    pn ? pn() : typeof window < "u" && window.dispatchEvent(new CustomEvent("logicweaver:weather-refresh"));
  },
  changeLocation(e) {
    fn ? fn(e) : typeof window < "u" && window.dispatchEvent(new CustomEvent("logicweaver:weather-change-location", { detail: { clientX: e?.clientX, clientY: e?.clientY } }));
  },
  setRefreshAction(e) {
    pn = e;
  },
  setChangeLocationAction(e) {
    fn = e;
  }
}, Pr = () => ({
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
}), ve = we(Pr());
let gn = null;
const Ut = {
  get snapshot() {
    return Ct(ve);
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
    gn ? gn(e) : window.dispatchEvent(new CustomEvent("logicweaver:clock-open-settings", { detail: { clientX: e?.clientX, clientY: e?.clientY } }));
  },
  setOpenSettingsAction(e) {
    gn = e;
  }
}, Wr = [
  { id: "ai", title: "AI 助手" },
  { id: "todoist", title: "Todoist" },
  { id: "stickers", title: "表情包" },
  { id: "calcom", title: "预约" },
  { id: "wallpaper", title: "壁纸库" }
], Or = () => ({
  mounted: !1,
  visible: !1,
  items: [...Wr]
}), hn = we(Or());
let Do = {};
const Un = {
  getSnapshot() {
    return Ct(hn);
  },
  update(e) {
    Object.assign(hn, e);
  },
  setMounted(e) {
    hn.mounted = e;
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
}, mn = we({ visible: !1, pendingWrites: 0 });
async function Br(e) {
  if (mn.pendingWrites) throw new Error("壁纸操作正在处理，未自动排队");
  mn.pendingWrites++;
  try {
    return await e();
  } finally {
    mn.pendingWrites--;
  }
}
const si = {
  openDialog() {
    Ie.open("wallpaper");
  },
  closeDialog() {
    Ie.close("wallpaper");
  },
  resetDefault() {
    return Br(() => Uo.clearWallpaper());
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
], hh = [
  { id: "local", label: "📍 本地系统时区", offset: "Local" },
  { id: "Asia/Shanghai", label: "🇨🇳 北京 / 香港", offset: "UTC+8" },
  { id: "Asia/Tokyo", label: "🇯🇵 东京 / 首尔", offset: "UTC+9" },
  { id: "Europe/London", label: "🇬🇧 伦敦 / 格林威治", offset: "UTC+0/+1" },
  { id: "Europe/Paris", label: "🇫🇷 巴黎 / 柏林", offset: "UTC+1/+2" },
  { id: "America/New_York", label: "🇺🇸 纽约 / 东部时间", offset: "UTC-5/-4" },
  { id: "America/Los_Angeles", label: "🇺🇸 洛杉矶 / 西部时间", offset: "UTC-8/-7" },
  { id: "Australia/Sydney", label: "🇦🇺 悉尼", offset: "UTC+10/+11" },
  { id: "UTC", label: "🌐 协调世界时 (UTC)", offset: "UTC" }
], Ce = we({
  mounted: !1,
  isOpen: !1,
  x: 200,
  y: 200,
  font: "mono",
  color: "white",
  timezone: "local"
});
let vn = null;
const At = {
  state: Ce,
  setMounted(e) {
    Ce.mounted = e;
  },
  onAction(e) {
    vn = e;
  },
  dispatch(e, t) {
    if (vn)
      return vn(e, t);
  },
  open(e) {
    const i = typeof window < "u" ? window.innerWidth : 1280, r = typeof window < "u" ? window.innerHeight : 800, l = e?.clientX ?? e?.x ?? i / 2, h = e?.clientY ?? e?.y ?? r / 2, f = Math.max(12, Math.min(l - 40, i - 290 - 12)), p = Math.max(12, Math.min(h + 10, r - 420 - 12));
    Ce.x = f, Ce.y = p, Ce.isOpen = !0, this.dispatch("open", { x: f, y: p });
  },
  close() {
    Ce.isOpen = !1, this.dispatch("close");
  },
  setFont(e) {
    Ce.font = e;
    const t = ri.find((o) => o.id === e);
    if (t) {
      Ut.applyConfig({ fontFamily: t.font });
      try {
        localStorage.setItem("lw_clock_font", e);
      } catch {
      }
    }
    this.dispatch("change", { font: e, color: Ce.color, timezone: Ce.timezone });
  },
  setColor(e) {
    Ce.color = e;
    const t = ai.find((o) => o.id === e);
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
    this.dispatch("change", { font: Ce.font, color: e, timezone: Ce.timezone });
  },
  setTimezone(e) {
    Ce.timezone = e;
    try {
      localStorage.setItem("lw_clock_tz", e);
    } catch {
    }
    this.dispatch("change", { font: Ce.font, color: Ce.color, timezone: e });
  },
  initPreferences() {
    try {
      const e = localStorage.getItem("lw_clock_font");
      if (e) {
        Ce.font = e;
        const i = ri.find((r) => r.id === e);
        i && Ut.applyConfig({ fontFamily: i.font });
      }
      const t = localStorage.getItem("lw_clock_color");
      if (t) {
        Ce.color = t;
        const i = ai.find((r) => r.id === t);
        i && Ut.applyConfig({ colorHex: i.hex, greetColor: i.hex, dateColor: i.hex, isCustomColor: !0 });
      }
      const o = localStorage.getItem("lw_clock_tz");
      o && (Ce.timezone = o);
    } catch {
    }
  },
  syncConfig(e) {
    e.font && (Ce.font = e.font), e.color && (Ce.color = e.color), e.timezone && (Ce.timezone = e.timezone);
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
let yn = null, Ho = !1;
async function jo(e, t = {}) {
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
  o || (e.state === "connecting" ? o = "正在连接本机 Codex 与 ChatGPT…" : e.state === "disconnected" ? o = "已待命（打开面板自动连接）" : e.authenticated ? o = `就绪 · ChatGPT ${e.plan || "已登录"}` : e.state === "ready" ? o = "就绪 · 尚未登录 ChatGPT" : o = t[e.state] || e.state), ue.statusText = o, ue.authHidden = !e.loginUrl, ue.authCode = e.loginCode || "", ue.authLink = e.loginUrl || "https://auth.openai.com/codex/device", ue.isStreaming = Ho || e.busy || e.state === "running";
}
async function Rr() {
  try {
    const e = await jo("poll");
    Ki(e);
  } catch {
  }
}
async function Fr(e, t) {
  if (e === "open" || e === "connect")
    try {
      ue.statusText = "正在连接本机 Codex 与 ChatGPT…";
      const o = await jo("connect");
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
    }), ue.inputText = "", ue.isStreaming = !0, Ho = !0;
    try {
      await jo("send", { text: o }), await Rr();
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
const Yn = {
  state: ue,
  setMounted(e) {
    ue.mounted = e;
  },
  onAction(e) {
    yn = e;
  },
  dispatch(e, t) {
    if (yn)
      return yn(e, t);
    Fr(e, t);
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
}, bn = we({
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
}), Eo = /* @__PURE__ */ new Set(), Nr = {
  state: bn,
  open(e) {
    Object.assign(bn, e, { open: !0 });
  },
  update(e) {
    Object.assign(bn, e);
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
}, zo = we({ isOpen: !1 }), Vi = {
  state: zo,
  open() {
    zo.isOpen = !0;
  },
  close() {
    zo.isOpen = !1;
  }
}, wn = "biliProfileCacheV1", at = "biliLocallyKnownMessageIdsV1", Ao = "biliMessageUserCacheV1", lo = "githubKnownReleaseVersionsV1", Po = "customNewtabAvatar", li = "biliToastKnownCountsV1";
class Hr {
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
    if (zt.avatarUrl = r, zt.userName = t?.uname || "哔哩哔哩用户", zt.buttonTitle = "通知中心", ln.avatarUrl = r, ln.userName = t?.uname || "用户", ln.mid = t?.mid, typeof document < "u") {
      const h = document.getElementById("bili-profile-avatar");
      h && (h.src = r);
      const f = document.getElementById("bili-profile-button");
      f && (f.title = zt.buttonTitle);
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
        ]), f = r.status === "fulfilled" ? r.value?.data || {} : {}, p = l.status === "fulfilled" ? l.value?.data || {} : {}, x = h.status === "fulfilled" ? h.value?.data || {} : {}, k = Number(p.at || 0), S = p.reply != null ? Number(p.reply || 0) : Math.max(0, Number(p.recv_reply || 0) - k), g = {
          reply: Math.max(Number(f.reply || 0), S),
          at: Math.max(Number(f.at || 0), k),
          like: Math.max(
            Number(f.like || f.praise || 0),
            Number(p.like || p.recv_like || 0)
          ),
          system: Math.max(Number(f.sys_msg || f.system || 0), Number(p.sys_msg || 0)),
          private: Number(
            f.chat || p.chat || Number(x.follow_unread || 0) + Number(x.unfollow_unread || 0) + Number(x.dustbin_push_msg || 0)
          )
        };
        this.applyBiliProfile(i, g), typeof chrome < "u" && chrome?.storage?.local && await chrome.storage.local.set({ [wn]: { profile: i, unread: g, savedAt: Date.now() } }), this.checkAndNotifyBiliInteractions(g);
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
    const r = o.reply - Number(this.biliToastKnownCounts.reply || 0), l = o.at - Number(this.biliToastKnownCounts.at || 0);
    o.system - Number(this.biliToastKnownCounts.system || 0), this.biliToastKnownCounts = { ...o }, typeof chrome < "u" && chrome?.storage?.local && chrome.storage.local.set({ [li]: this.biliToastKnownCounts }).catch(() => {
    }), i > 0 && Pe.show({
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
    }), r > 0 && Pe.show({
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
    }), l > 0 && Pe.show({
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
      wn,
      at,
      Ao,
      lo,
      Po
    ]).then((t) => {
      this.customAvatar = t[Po] || "", this.locallyKnownIds = t[at] && typeof t[at] == "object" ? t[at] : {}, this.userCache = t[Ao] && typeof t[Ao] == "object" ? t[Ao] : {}, this.githubKnownVersions = t[lo] && typeof t[lo] == "object" ? t[lo] : {};
      const o = t[wn];
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
const ci = new Hr(), pe = we({ open: !1, loading: !1, error: "", mid: "", name: "", face: "", sign: "", followed: !1, submitting: !1, left: 12, top: 12, videos: [] });
let Wo = null;
const Go = {
  state: pe,
  open(e, t) {
    Wo = t, Object.assign(pe, { open: !0, loading: !0, error: "", submitting: !1, videos: [] }, e);
  },
  update(e) {
    Object.assign(pe, e);
  },
  close() {
    pe.submitting || (pe.open = !1, Wo = null);
  },
  async toggleFollow() {
    if (!(!Wo || pe.submitting)) {
      pe.submitting = !0;
      try {
        const e = !pe.followed;
        await Wo(e) && (pe.followed = e);
      } finally {
        pe.submitting = !1;
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
}), kn = /* @__PURE__ */ new Set();
let vt;
const co = new br();
let di = !1;
async function jr(e, t) {
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
    const h = l.body.getReader(), f = new TextDecoder("utf-8", { fatal: !0 });
    let p = 0, x = "";
    try {
      for (; ; ) {
        o.signal.throwIfAborted();
        const k = await h.read();
        if (k.done) break;
        if (p += k.value.byteLength, p > 2 * 1024 * 1024) throw new Error("Public source exceeds limit");
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
  const [r, l] = i.split("/"), h = (f) => typeof f == "number" && Number.isFinite(f) && f >= 0 ? f : void 0;
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
async function zr(e, t) {
  const o = new Date(Date.now() - e * 864e5).toISOString().slice(0, 10);
  let i = "";
  try {
    const h = await zs(t), { data: f } = await Gs(`/search/repositories?q=${encodeURIComponent(`is:public created:>${o}`)}&sort=stars&order=desc&per_page=30`, { headers: h, signal: t, maxBytes: 2 * 1024 * 1024 });
    if (t.throwIfAborted(), !Array.isArray(f?.items)) throw new Error("Invalid search response");
    return {
      repos: f.items.slice(0, 30).map((p) => ui(p, !1)),
      sourceText: `GitHub Search：UTC 日期 ${o} 之后新建的仓库，按累计 Star 排序；不是官方 Trending 榜。${f.incomplete_results ? " API 标记为不完整结果。" : ""}`
    };
  } catch (h) {
    t.throwIfAborted(), i = h instanceof Ks ? h.message : "主源响应格式无效。";
  }
  const r = e === 1 ? "daily" : e === 7 ? "weekly" : "monthly", l = await jr(`https://ghapi.h11.dev/repositories?since=${r}`, t);
  if (t.throwIfAborted(), !Array.isArray(l)) throw new Error("Invalid fallback response");
  return {
    repos: l.slice(0, 30).map((h) => ui(h, !0)),
    sourceText: `GitHub Search 不可用：${i} 改用第三方 ghapi.h11.dev 的 ${r} 趋势快照（不发送账号凭据）；口径与新建仓库搜索不同，源更新时间未提供。`
  };
}
const Ui = {
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
    return e.addEventListener("abort", t, { once: !0 }), !e.aborted && !di && this.refresh(), () => {
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
      di = !0, be.isLoading = !0, be.errorMessage = "";
      try {
        const r = await o.wait(() => zr(t, o.signal));
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
    return kn.add(e), () => {
      kn.delete(e);
    };
  },
  dispatch(e, t) {
    for (const o of kn)
      try {
        o(e, t);
      } catch {
      }
  }
}, Wn = () => ({
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
}), Z = we({
  mounted: !1,
  isOpen: !1,
  isExpanded: !1,
  mode: "main",
  ballPosition: { x: 0, y: 0 },
  hub: Wn(),
  activeSectorId: null,
  sectors: [],
  beam: qn()
});
let pi = null;
function Gr(e, t) {
  if (typeof e != "number" || !t)
    return qn();
  const o = 160, i = 160, r = 26, l = 154, h = 360 / t, f = e - h / 2, p = e + h / 2, x = f * Math.PI / 180, k = p * Math.PI / 180, S = o + r * Math.cos(x), g = i + r * Math.sin(x), u = o + l * Math.cos(x), c = i + l * Math.sin(x), y = o + r * Math.cos(k), $ = i + r * Math.sin(k), w = o + l * Math.cos(k), L = i + l * Math.sin(k), E = h > 180 ? 1 : 0, ee = `M ${S.toFixed(1)} ${g.toFixed(1)} L ${u.toFixed(1)} ${c.toFixed(1)} A ${l} ${l} 0 ${E} 1 ${w.toFixed(1)} ${L.toFixed(1)} L ${y.toFixed(1)} ${$.toFixed(1)} A ${r} ${r} 0 ${E} 0 ${S.toFixed(1)} ${g.toFixed(1)} Z`, ne = `M ${u.toFixed(1)} ${c.toFixed(1)} A ${l} ${l} 0 ${E} 1 ${w.toFixed(1)} ${L.toFixed(1)}`;
  return {
    visible: !0,
    wedgePath: ee,
    arcPath: ne,
    line1: {
      x1: parseFloat(S.toFixed(1)),
      y1: parseFloat(g.toFixed(1)),
      x2: parseFloat(u.toFixed(1)),
      y2: parseFloat(c.toFixed(1))
    },
    line2: {
      x1: parseFloat(y.toFixed(1)),
      y1: parseFloat($.toFixed(1)),
      x2: parseFloat(w.toFixed(1)),
      y2: parseFloat(L.toFixed(1))
    }
  };
}
const xe = {
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
    } : Z.hub = Wn();
  },
  setBeam(e, t) {
    Z.beam = Gr(e, t);
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
    Z.isExpanded = !1, Z.mode = "main", Z.activeSectorId = null, Z.beam = qn(), Z.hub = Wn();
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
function Kr() {
  return Yi.filter((e) => e.mode || e.id === "launcher" || Xo(e.id));
}
function Vr() {
  return rr.filter((e) => e.kind === "module" && Xo(e.id)).map((e) => ({
    id: e.id,
    title: e.title,
    desc: e.isDev ? "已启用的实验性组件" : e.categoryLabel,
    icon: e.icon || e.emoji || "🧩",
    tool: e.id
  }));
}
function fi() {
  Z.isExpanded && $o();
}
let On = [], xo = Yi, lt = { x: 400, y: 300 }, qi = !1, uo = !1, po = null;
function _n() {
  return globalThis.chrome?.storage;
}
function Xi(e, t) {
  const o = Z.isExpanded ? 160 : 24;
  xe.setBallPosition(
    Math.max(o + 8, Math.min(window.innerWidth - o - 8, e)),
    Math.max(o + 8, Math.min(window.innerHeight - o - 8, t))
  );
}
function $o() {
  const e = Z.mode;
  xo = e === "tools" ? Vr() : e === "shortcuts" ? [
    ...On.length ? On : [{ id: "shortcut-empty", title: "暂无快捷项", desc: "常用网站可放入快捷轮盘", icon: "📭" }],
    { id: "back-to-main", title: "返回主轮盘", desc: "返回页面电梯导航", icon: "🔙", mode: "main" }
  ] : Kr();
  const t = xo.length, o = t > 12 ? 118 : t > 9 ? 114 : 110, i = t > 12 ? 46 : t > 9 ? 50 : 56;
  xe.setSectors(xo.map((r, l) => {
    const h = -90 + 360 / t * l, f = h * Math.PI / 180;
    return {
      id: r.id,
      title: r.title,
      desc: r.desc,
      icon: r.icon,
      angleDeg: h,
      x: Math.round(160 + Math.cos(f) * o),
      y: Math.round(160 + Math.sin(f) * o),
      size: i,
      isShortcut: !!r.url
    };
  })), xe.setWheelMode(e), xe.setActiveSector(null), xe.setBeam(null, 0), xe.setHub(e === "shortcuts" ? { icon: "🔙", title: "快捷方式" } : e === "tools" ? { icon: "🧰", title: "常用工具" } : null);
}
function Zo(e) {
  Z.mode = e, $o();
}
function Pt() {
  xe.collapse(), Xi(Z.ballPosition.x, Z.ballPosition.y), xe.setVisibility(qi);
}
function jt(e = Z.ballPosition.x, t = Z.ballPosition.y, o = "main") {
  xe.expand(void 0, void 0, o), Xi(e, t), $o(), xe.setVisibility(!0);
}
function Ur(e) {
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
function gi(e) {
  lt = { x: e.clientX, y: e.clientY };
}
function hi(e) {
  e.button === 1 && (e.preventDefault(), e.stopPropagation(), lt = { x: e.clientX, y: e.clientY }, Z.isExpanded ? Pt() : jt(e.clientX, e.clientY));
}
function mi(e) {
  e.button === 1 && e.preventDefault();
}
function vi(e) {
  !Z.isExpanded || Kn.active || e.key === "Escape" && (e.preventDefault(), e.stopPropagation(), Z.mode === "shortcuts" ? Zo("main") : Pt());
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
    const o = oe.getCachedIcon(e.url);
    if (o) return o;
    const i = Yr(e.url);
    if (i) return i;
  }
  return e.icon || "🔗";
}
const dt = {
  async start() {
    if (!uo) {
      uo = !0, lt = { x: Math.round(window.innerWidth / 2), y: Math.round(window.innerHeight / 2) }, xe.setActionHandler((e, t) => {
        if (e === "hub:click")
          Z.isExpanded ? Z.mode === "shortcuts" ? Zo("main") : Pt() : jt();
        else if (e === "sector:click" || e === "container:click") {
          const o = xo.find((i) => i.id === t?.id || e === "container:click" && i.id === Z.activeSectorId);
          o && Ur(o);
        } else if (e === "sector:hover") {
          const o = Z.sectors.find((i) => i.id === t?.id);
          o && (xe.setHub({ icon: o.icon, title: o.title, desc: o.desc, active: !0 }), xe.setActiveSector(o.id), xe.setBeam(o.angleDeg, xo.length));
        } else e === "sector:leave" && (xe.setActiveSector(null), xe.setBeam(null, 0), xe.setHub(Z.mode === "shortcuts" ? { icon: "🔙", title: "快捷方式" } : Z.mode === "tools" ? { icon: "🧰", title: "常用工具" } : null));
      }), window.addEventListener("logicweaver:dock-modules-changed", fi), window.addEventListener("pointermove", gi, { passive: !0 }), window.addEventListener("mousedown", hi, !0), window.addEventListener("auxclick", mi, !0), window.addEventListener("keydown", vi, !0), po = (e, t) => {
        t === "local" && (e.siteShelfLinks || e.logicweaverNavWheelShortcutsV1) && this.loadShortcuts();
      }, _n()?.onChanged?.addListener(po);
      try {
        if (!uo) return;
        qi = !1, xe.setVisibility(!1);
      } catch {
      }
      await this.loadShortcuts(), $o();
    }
  },
  stop() {
    uo = !1, xe.setActionHandler(null), window.removeEventListener("logicweaver:dock-modules-changed", fi), window.removeEventListener("pointermove", gi), window.removeEventListener("mousedown", hi, !0), window.removeEventListener("auxclick", mi, !0), window.removeEventListener("keydown", vi, !0), po && _n()?.onChanged?.removeListener(po), po = null;
  },
  async loadShortcuts() {
    try {
      const e = await _n()?.local?.get(["siteShelfLinks", "logicweaverNavWheelShortcutsV1"]);
      if (!uo) return;
      const t = e?.siteShelfLinks?.length ? e.siteShelfLinks : e?.logicweaverNavWheelShortcutsV1;
      On = (Array.isArray(t) ? t : []).map((o, i) => ({
        id: String(o.id || `wheel-${i}`),
        title: String(o.title || o.url || "快捷网站"),
        desc: String(o.url || ""),
        url: String(o.url || ""),
        icon: qr(o)
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
    this.activeShortcuts = { ...dn }, this.isListenerBound = !1, this.storageListenerBound = !1, this.shortcutReadVersion = 0, this.initShortcuts();
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
    const { optionsService: i, SHORTCUT_STORAGE_KEY: r } = await import("./options.service-N98g5mDC.js").then((k) => k.g), h = (await chrome.storage.local.get(r))[r], f = { ...h || {}, [t]: o }, p = this.shortcutReadVersion, x = await i.saveSettings(
      { [r]: f },
      { [r]: h }
    );
    p === this.shortcutReadVersion && (++this.shortcutReadVersion, this.applyShortcutOverrides(x[r]));
  }
  applyShortcutOverrides(t) {
    const o = t && typeof t == "object" && !Array.isArray(t) ? Object.entries(t).filter((i) => Object.prototype.hasOwnProperty.call(dn, i[0]) && typeof i[1] == "string") : [];
    this.activeShortcuts = { ...dn, ...Object.fromEntries(o) };
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
      return Ie.handleToolClick(t), !0;
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
        return typeof window < "u" && typeof window.triggerTodoistQuickAdd == "function" ? window.triggerTodoistQuickAdd() : Ie.handleToolClick("todoist"), !0;
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
        const i = ar(t);
        if (!i) return;
        const r = i.toLowerCase();
        for (const [l, h] of Object.entries(this.activeShortcuts))
          if (!(!h || !oi(l)) && h.toLowerCase().replace(/^cmd\+/, "meta+") === r) {
            t.preventDefault(), t.stopPropagation(), this.triggerToolShortcut(l);
            break;
          }
      },
      !0
    ));
  }
}
const Bn = Yt.getInstance();
class qt {
  constructor() {
    this._isVisible = F(typeof document < "u" ? !document.hidden : !0), this.callbacks = /* @__PURE__ */ new Set(), this.activeIntervals = /* @__PURE__ */ new Set(), typeof document < "u" && document.addEventListener("visibilitychange", () => {
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
const Xr = qt.getInstance(), Cn = () => window;
let Tt = !1, fo, xn, go;
function yi(e) {
  return oe.getPageNames().filter((t) => t !== e).map((t) => ({ id: t, name: oe.getPageLabel(t) }));
}
function bi() {
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
const Rn = {
  openEditor(e) {
    _o.openEditDialog(e || {});
  },
  openFolder(e = qe.activeFolder) {
    if (!e) return;
    const o = oe.getState().links.filter((i) => (i.group || "常用网站") === e);
    wt.openFolder(e, o), bi();
  },
  openLinkMenu(e, t) {
    t?.preventDefault?.(), Zt.openLinkMenu(e, yi(e.page || "常用网站"), t?.clientX || 0, t?.clientY || 0);
  },
  openFolderMenu(e, t, o) {
    t?.preventDefault?.();
    const i = oe.getState(), r = o || i.activePage;
    Zt.openFolderMenu(
      e,
      oe.getGroupSize(e) === "small" ? "扩大为大收藏夹" : "缩小为小收藏夹",
      yi(r),
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
    Te.update({
      ...e,
      pages: t,
      activePage: t.includes(e.activePage) ? e.activePage : t[0]
    }), bi();
  },
  start() {
    Tt || (Tt = !0, Te.setActions({
      openFolder: (e) => this.openFolder(e),
      deleteFolder: Zs,
      openLinkMenu: (e, t) => this.openLinkMenu(e, t),
      openFolderMenu: (e, t, o) => this.openFolderMenu(e, o, t),
      openPageMenu: (e, t) => this.openPageMenu(e, t)
    }), wt.setActionHandler((e, t) => {
      e === "close" ? wt.closeFolder() : e === "folder:open" && typeof t == "string" ? this.openFolder(t) : e === "link:contextmenu" && t?.link && this.openLinkMenu(t.link, t);
    }), xn = oe.subscribe(() => {
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
    }, Cn().chrome?.storage?.onChanged?.addListener(go));
  },
  init() {
    return this.start(), fo || (fo = (async () => {
      await oe.ready;
      const e = Cn().chrome;
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
    Tt = !1, xn?.(), xn = void 0, go && Cn().chrome?.storage?.onChanged?.removeListener(go), go = void 0, wt.setActionHandler(null), Te.setActions({
      openFolder: void 0,
      deleteFolder: void 0,
      openLinkMenu: void 0,
      openFolderMenu: void 0,
      openPageMenu: void 0
    });
  }
}, wi = [
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
    if (!i) return wi.slice(0, o);
    const r = [];
    for (const l of wi) {
      const h = l.name.toLowerCase(), f = l.pinyin.toLowerCase(), p = l.admin.toLowerCase();
      if ((h.startsWith(i) || f.startsWith(i) || h.includes(i) || f.includes(i) || p.includes(i)) && r.push(l), r.length >= o) break;
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
      if (i !== this.activeRequestId || j.state === "unconfigured") {
        this.isRefreshing = !1;
        return;
      }
      const f = (await l.json()).results?.[0];
      if (!f) {
        i === this.activeRequestId && j.state !== "unconfigured" && ot.notFound(o), this.isRefreshing = !1;
        return;
      }
      const p = `https://api.open-meteo.com/v1/forecast?latitude=${f.latitude}&longitude=${f.longitude}&current=temperature_2m,weather_code,relative_humidity_2m,wind_speed_10m&hourly=temperature_2m,weather_code,precipitation_probability&daily=temperature_2m_max,temperature_2m_min,weather_code,precipitation_probability_max&forecast_days=7&timezone=auto`, x = await fetch(p);
      if (i !== this.activeRequestId || j.state === "unconfigured") {
        this.isRefreshing = !1;
        return;
      }
      const k = await x.json(), S = Oo(k.current?.weather_code ?? 0), g = Math.round(k.current?.temperature_2m ?? 0), u = k.hourly?.time || [], c = Date.now();
      let y = u.findIndex((b) => new Date(b).getTime() >= c);
      y < 0 && (y = 0);
      const $ = [];
      for (let b = y; b < Math.min(y + 5, u.length); b++) {
        const _ = b === y ? "现在" : new Date(u[b]).getHours() + "时", D = Oo(k.hourly.weather_code[b]), Y = Math.round(k.hourly.temperature_2m[b]);
        $.push({ time: _, emoji: D.emoji, temp: Y });
      }
      let w = "未来 12 小时暂无降水 ☂️";
      for (let b = y; b < Math.min(y + 12, u.length); b++) {
        const _ = k.hourly.weather_code[b], D = k.hourly.precipitation_probability?.[b] || 0;
        if (_ >= 51 || D >= 60) {
          const Y = new Date(u[b]).getHours(), W = _ >= 71 && _ <= 77 || _ === 85 || _ === 86;
          w = `预计 ${Y}:00 ${W ? "有雪" : "有雨"}${D ? `（${D}%）` : ""} 🌧️`;
          break;
        }
      }
      const L = ["今天", "明天", "后天"], E = [], ee = k.daily?.time?.length || 0;
      for (let b = 1; b < Math.min(3, ee); b++) {
        const _ = L[b] || `+${b}天`, D = Oo(k.daily.weather_code[b]), Y = `${Math.round(k.daily.temperature_2m_max[b])}°/${Math.round(k.daily.temperature_2m_min[b])}°`;
        E.push({ label: _, emoji: D.emoji, tempRange: Y });
      }
      const ne = `${S.label} · 最高 ${Math.round(k.daily?.temperature_2m_max?.[0] ?? g)}° / 最低 ${Math.round(k.daily?.temperature_2m_min?.[0] ?? g)}°`, A = {
        cityName: f.name || o,
        currentEmoji: S.emoji,
        currentTemp: g,
        subText: ne,
        rainText: w,
        hours: $,
        days: E
      };
      if (i === this.activeRequestId && j.state !== "unconfigured") {
        if (ot.ready(A, o), k.daily?.time) {
          const _ = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"], D = [];
          for (let Y = 0; Y < k.daily.time.length; Y++) {
            const W = new Date(k.daily.time[Y]), H = Y === 0 ? "今天" : Y === 1 ? "明天" : Y === 2 ? "后天" : _[W.getDay()], P = Oo(k.daily.weather_code[Y]);
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
          ot.setForecastDays(D);
        }
        const b = {
          humidity: k.current?.relative_humidity_2m ? `${k.current.relative_humidity_2m}%` : "60%",
          wind: k.current?.wind_speed_10m ? `${Math.round(k.current.wind_speed_10m)} km/h` : "微风",
          uvIndex: "正常",
          airQuality: "优良"
        };
        ot.setDetailInfo(b);
      }
    } catch (r) {
      i === this.activeRequestId && j.state !== "unconfigured" && ot.error(r?.message || "天气加载失败，右键此处可重新选择地点。", o);
    } finally {
      i === this.activeRequestId && (this.isRefreshing = !1);
    }
  }
}
const yo = Xt.getInstance();
function Jr(e, t) {
  window.LogicWeaverIntro = rt, window.LogicWeaverStartupIntro = rt, window.LogicWeaverNotifications = Pe, window.LogicWeaverWindowManager = Ie, window.LogicWeaverWindowTabs = Ie, window.LogicWeaverDomFreezer = lr, window.LogicWeaverWallpaperService = Uo, window.LogicWeaverLauncherService = oe, window.LogicWeaverLauncherRuntime = Rn, window.LogicWeaverProfileService = ci;
  try {
    ci.init();
  } catch (o) {
    console.error("[ProfileService] init failed:", o);
  }
  window.LogicWeaverBookmarksService = jn, window.LogicWeaverCalendarService = Qs, window.LogicWeaverWeather = ot, window.LogicWeaverWeatherService = yo, window.LogicWeaverClock = Ut, window.LogicWeaverSearch = Vs, window.LogicWeaverSearchService = Us, Object.defineProperty(window, "LogicWeaverAiHotService", {
    configurable: !0,
    get: () => {
      import("./aihot.service-l4gGelhr.js").then(({ aiHotService: o }) => {
        window.LogicWeaverAiHotService = o;
      });
    }
  }), window.LogicWeaverHomeMusic = Ve, window.LogicWeaverLauncherGroups = Te, window.LogicWeaverProfileMenu = To, window.LogicWeaverWorkspaceLaunchers = Un, window.LogicWeaverMacDock = ct, window.LogicWeaverFullscreen = Et, window.enterFullscreenCard = (o) => Et.enter(o), window.exitFullscreenCard = () => Et.exit(), window.cycleFullscreenCard = () => Et.cycle(), window.LogicWeaverPageVisibility = Xr, window.LogicWeaverBackgroundLibrary = si, window.LogicWeaverNotificationCenter = _t, window.LogicWeaverBookmarkMenu = zn, window.LogicWeaverBookmarkPanel = en, window.LogicWeaverBookmarkFolderStrip = qo, window.LogicWeaverLauncherDialogs = _o, window.LogicWeaverLauncherFolder = wt, window.LogicWeaverLauncherMenus = Zt, window.LogicWeaverSettings = tn, window.LogicWeaverClockSettings = At, window.LogicWeaverBiliTheater = Co, window.LogicWeaverBilibiliService = ei, window.getBiliJct = () => ei.getBiliJct(), window.LogicWeaverBiliMiniPlayer = En, window.openBiliMiniPlayer = (o) => En.openVideo(o), window.LogicWeaverAiDialog = Yn, window.LogicWeaverAihotViewer = Vn, window.LogicWeaverNavWheel = xe, window.openNavWheel = (o, i) => dt.open(o, i), window.closeNavWheel = () => dt.close(), window.toggleNavWheel = (o) => dt.toggle(o), window.toggleToolWheel = (o) => dt.toggleTools(o), window.setNavWheelMode = (o) => dt.setMode(o), window.LogicWeaverShortcuts = Bn, window.triggerToolShortcut = (o) => Bn.triggerToolShortcut(o), window.LogicWeaverCommands = e, window.LogicWeaverFeatures = t, window.LogicWeaverCalendarView = er, window.LogicWeaverGitHubStatus = Gn, window.LogicWeaverGitHubFolders = Mt, window.LogicWeaverGitHubHero = wo, window.LogicWeaverGitHubRepositories = yt, window.LogicWeaverGitHubBatchBar = ko, window.LogicWeaverTodoistLabels = tr, window.LogicWeaverTodoistWorkspace = or, window.LogicWeaverTodoistCalendarSidebar = nr, window.LogicWeaverTodoistTaskList = ir, window.LogicWeaverBiliMessagePanel = Dt, window.LogicWeaverStickerBoard = pr, window.LogicWeaverStickersService = fr, window.LogicWeaverPricing = Fi, window.LogicWeaverBiliFavorites = Bi, window.LogicWeaverBiliRadioTape = vr, window.LogicWeaverBiliOrganizerDialogs = gr, window.LogicWeaverBiliUpGroupManager = hr, window.LogicWeaverBiliUpPreview = Go, window.LogicWeaverYouTube = Pi, window.LogicWeaverAihotFeed = Ri, window.LogicWeaverGitHubTrending = Ui, window.LogicWeaverCalendarWorkspace = Vt, window.LogicWeaverCalendar = Vt, window.LogicWeaverTodoistMainWorkspace = sr, window.LogicWeaverTodoistTaskDetail = Nr, window.openBiliTheater = (o) => Co.openVideo(o), window.closeBiliTheater = () => Co.close(), window.showWindowsToast = (o) => {
    if (!o) return null;
    const i = cn(o.target) || ti(o.url) || (o.appType === "bili" ? Ws([o.title, o.subtitle, o.message].filter((r) => typeof r == "string").join(" ")) : void 0);
    return Pe.show({
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
    const l = typeof i == "object" && i ? i : r, h = typeof i == "number" ? i : 3200, f = l.isError || /失败|错误|异常|未获取|未找到/i.test(o), p = l.title || (f ? "B站操作未完成" : "哔哩哔哩"), x = l.subtitle || (o.length > 36 ? "" : o), k = l.message || (l.subtitle || o.length > 36 ? o : ""), S = {
      id: l.id || `bili_toast_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      appType: "bili",
      appName: "哔哩哔哩",
      icon: "assets/bilibili.svg",
      title: p,
      subtitle: x || o,
      message: k && k !== x ? k : "",
      showActions: !!(l.showActions || l.actionLabel),
      actionLabel: l.actionLabel || "",
      onClick: l.onClick || null,
      target: cn(l.target) || ti(l.url) || cn({ type: "bili-video", bvid: l.bvid, aid: l.aid ? String(l.aid) : void 0 }),
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
  }), window.LogicWeaverKineticDrag = wr, window.LogicWeaverMarkdownAst = kr, window.setLauncherBackground = (o) => Uo.setWallpaper(o), window.backgroundDbClear = (o) => Os(o), window.openBackgroundHistory = () => si.openDialog();
}
const Ae = we({
  isOpen: !1,
  query: "",
  selectedIndex: 0
});
let Bo = null;
const Ji = {
  get state() {
    return Ae;
  },
  open() {
    Ae.isOpen || (Ae.isOpen = !0, Ae.query = "", Ae.selectedIndex = 0, Bo = Ie.pushModalCloser(() => (this.close(), !0)));
  },
  close() {
    Ae.isOpen && (Ae.isOpen = !1, Ae.query = "", Ae.selectedIndex = 0, Bo && (Bo(), Bo = null));
  },
  toggle() {
    Ae.isOpen ? this.close() : this.open();
  },
  setQuery(e) {
    Ae.query = e, Ae.selectedIndex = 0;
  },
  selectNext(e) {
    e <= 0 || (Ae.selectedIndex = (Ae.selectedIndex + 1) % e);
  },
  selectPrev(e) {
    e <= 0 || (Ae.selectedIndex = (Ae.selectedIndex - 1 + e) % e);
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
  if (Kn.active || e.defaultPrevented || e.isComposing || e.repeat) return;
  const t = (e.key || "").toLowerCase(), o = (e.ctrlKey || e.metaKey) && t === "k", i = e.altKey && (e.code === "Space" || t === " ");
  (o || i) && (e.preventDefault(), e.stopPropagation(), Ji.toggle());
}, !0);
function Zr(e) {
  e.register({
    id: "palette.toggle",
    title: "打开全局命令中心 (Spotlight)",
    category: "界面",
    keywords: ["命令", "palette", "spotlight", "raycast", "搜索", "cmd"],
    concurrency: "drop",
    run: () => Ji.toggle()
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
    enabled: () => Pe.size > 0,
    run: () => Pe.clear()
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
const Qr = {
  key: 0,
  id: "guest-preview-banner",
  class: "guest-preview-banner",
  role: "alert",
  "aria-label": "新用户开箱视角预览提示"
}, ea = /* @__PURE__ */ de({
  __name: "GuestPreviewBanner",
  setup(e) {
    function t() {
      Rs.exit();
    }
    return (o, i) => (a(), ce(Ds, { name: "guest-banner-slide" }, {
      default: Qt(() => [
        s(Bs) ? (a(), d("aside", Qr, [
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
}), ta = /* @__PURE__ */ Se(ea, [["__scopeId", "data-v-a2f2ca5f"]]), oa = ["hidden"], na = {
  key: 0,
  class: "bookmark-folder-strip-empty"
}, ia = ["title", "data-bookmark-folder-id", "onClick", "onContextmenu"], sa = /* @__PURE__ */ de({
  __name: "BookmarkFolderStrip",
  setup(e) {
    const t = F(null);
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
    return (l, h) => (a(), d("nav", {
      id: "bookmark-folder-strip",
      ref_key: "stripRef",
      ref: t,
      class: "bookmark-folder-strip",
      "aria-label": "书签栏文件夹",
      hidden: !s(Kt).enabled,
      onWheel: o
    }, [
      s(Kt).folders.length ? M("", !0) : (a(), d("span", na, v(s(Kt).emptyMessage || "书签栏没有文件夹"), 1)),
      (a(!0), d(G, null, fe(s(Kt).folders, (f) => (a(), d("button", {
        key: f.id,
        class: "bookmark-folder-chip",
        type: "button",
        title: `打开书签文件夹：${f.title || "未命名"}`,
        "data-bookmark-folder-id": f.id,
        onClick: (p) => i(f),
        onContextmenu: N((p) => r(p, f), ["prevent"])
      }, [
        h[0] || (h[0] = n("span", { "aria-hidden": "true" }, "📁", -1)),
        n("span", null, v(f.title || "未命名"), 1)
      ], 40, ia))), 128))
    ], 40, oa));
  }
}), ra = /* @__PURE__ */ Se(sa, [["__scopeId", "data-v-5e71cc7c"]]), aa = { class: "cube-manager-body" }, la = ["disabled", "onClick"], ca = ["disabled", "onClick"], da = ["onClick"], ua = ["onClick"], pa = ["onClick"], fa = ["type", "placeholder"], ga = {
  key: 0,
  role: "alert"
}, ha = /* @__PURE__ */ de({
  __name: "CubeConfigDialog",
  setup(e) {
    const t = Me.state, o = ae(() => Me.getActiveFaces()), i = ae(() => t.registeredFaces.filter((g) => !t.activeFaceIds.includes(g.id))), r = F(""), l = F("memo"), h = F(""), f = F(!1), p = F(JSON.stringify({ title: "每日一句", icon: "📝", customType: "memo", customData: { text: "今天也要记得休息" } }, null, 2)), x = F("");
    function k(g) {
      x.value = "";
      try {
        g();
      } catch (u) {
        x.value = u instanceof Error ? u.message : "操作失败";
      }
    }
    function S() {
      k(() => {
        const g = f.value ? JSON.parse(p.value) : {
          title: r.value,
          customType: l.value,
          customData: { text: h.value, targetDate: h.value, url: h.value }
        };
        Me.addCustomFace(g), r.value = "", h.value = "";
      });
    }
    return (g, u) => (a(), ce(gt, { to: "body" }, [
      s(t).isConfigDialogOpen ? (a(), d("section", {
        key: 0,
        class: "cube-manager",
        role: "dialog",
        "aria-label": "管理立方体面",
        onKeydown: u[7] || (u[7] = Wt(N((c) => s(Me).closeConfigDialog(), ["stop"]), ["esc"]))
      }, [
        n("header", null, [
          u[8] || (u[8] = n("strong", null, "管理立方体面", -1)),
          n("button", {
            type: "button",
            "aria-label": "关闭",
            onClick: u[0] || (u[0] = (c) => s(Me).closeConfigDialog())
          }, "×")
        ]),
        n("div", aa, [
          u[16] || (u[16] = n("p", null, "默认只有音乐。可以删除所有面，空位仍可添加。", -1)),
          (a(!0), d(G, null, fe(o.value, (c, y) => (a(), d("div", {
            key: c.id,
            class: "cube-row"
          }, [
            n("span", null, v(c.icon) + " " + v(c.title), 1),
            n("button", {
              type: "button",
              disabled: y === 0,
              onClick: ($) => k(() => s(Me).moveUp(c.id)),
              title: "上移"
            }, "↑", 8, la),
            n("button", {
              type: "button",
              disabled: y === o.value.length - 1,
              onClick: ($) => k(() => s(Me).moveDown(c.id)),
              title: "下移"
            }, "↓", 8, ca),
            n("button", {
              type: "button",
              onClick: ($) => k(() => s(Me).removeCustomFace(c.id))
            }, "删除面", 8, da)
          ]))), 128)),
          (a(!0), d(G, null, fe(i.value, (c) => (a(), d("div", {
            key: c.id,
            class: "cube-row"
          }, [
            n("span", null, v(c.title) + "（未启用）", 1),
            n("button", {
              type: "button",
              onClick: (y) => k(() => s(Me).toggleActive(c.id, !0))
            }, "添加", 8, ua),
            c.builtIn ? M("", !0) : (a(), d("button", {
              key: 0,
              type: "button",
              onClick: (y) => k(() => s(Me).removeCustomFace(c.id))
            }, "删除", 8, pa))
          ]))), 128)),
          u[17] || (u[17] = n("h3", null, "添加面", -1)),
          n("label", null, [
            Fe(n("input", {
              "onUpdate:modelValue": u[1] || (u[1] = (c) => f.value = c),
              type: "checkbox"
            }, null, 512), [
              [Es, f.value]
            ]),
            u[9] || (u[9] = Ne(" 粘贴 JSON 配置", -1))
          ]),
          n("form", {
            onSubmit: N(S, ["prevent"])
          }, [
            f.value ? (a(), d(G, { key: 1 }, [
              u[14] || (u[14] = n("p", null, "仅支持文本、倒数日和链接配置，不执行 JavaScript / HTML。开发者动态注册说明见 SDK 文档。", -1)),
              Fe(n("textarea", {
                "onUpdate:modelValue": u[5] || (u[5] = (c) => p.value = c),
                rows: "9",
                maxlength: "10000",
                "aria-label": "面的 JSON 配置",
                spellcheck: "false"
              }, null, 512), [
                [eo, p.value]
              ])
            ], 64)) : (a(), d(G, { key: 0 }, [
              n("label", null, [
                u[10] || (u[10] = Ne("标题", -1)),
                Fe(n("input", {
                  "onUpdate:modelValue": u[2] || (u[2] = (c) => r.value = c),
                  maxlength: "60",
                  required: ""
                }, null, 512), [
                  [eo, r.value]
                ])
              ]),
              n("label", null, [
                u[12] || (u[12] = Ne("类型", -1)),
                Fe(n("select", {
                  "onUpdate:modelValue": u[3] || (u[3] = (c) => l.value = c)
                }, [...u[11] || (u[11] = [
                  n("option", { value: "memo" }, "文本", -1),
                  n("option", { value: "countdown" }, "倒数日", -1),
                  n("option", { value: "link" }, "链接", -1)
                ])], 512), [
                  [Ii, l.value]
                ])
              ]),
              n("label", null, [
                u[13] || (u[13] = Ne("内容", -1)),
                Fe(n("input", {
                  "onUpdate:modelValue": u[4] || (u[4] = (c) => h.value = c),
                  type: l.value === "countdown" ? "date" : "text",
                  placeholder: l.value === "link" ? "https://…" : "输入内容",
                  maxlength: "500",
                  required: ""
                }, null, 8, fa), [
                  [As, h.value]
                ])
              ])
            ], 64)),
            u[15] || (u[15] = n("button", { type: "submit" }, "添加面", -1))
          ], 32),
          x.value ? (a(), d("p", ga, v(x.value), 1)) : M("", !0)
        ]),
        n("footer", null, [
          n("button", {
            type: "button",
            onClick: u[6] || (u[6] = (c) => k(() => s(Me).resetDefaults()))
          }, "恢复默认（仅音乐）"),
          u[18] || (u[18] = n("small", null, "自定义配置保留，但退出轮播", -1))
        ])
      ], 32)) : M("", !0)
    ]));
  }
}), ma = /* @__PURE__ */ Se(ha, [["__scopeId", "data-v-15dd5487"]]), va = ["data-face"], ya = { class: "ms-top-side" }, ba = {
  key: 0,
  class: "ms-top-meta"
}, wa = {
  class: "ms-top-title",
  style: { color: "#10b981", "font-weight": "700" }
}, ka = { class: "ms-top-artist" }, _a = { class: "ms-top-meta" }, Ca = ["title"], xa = ["title"], La = {
  key: 0,
  class: "ms-top-divider"
}, $a = ["title"], Ta = { class: "ms-top-mini-progress" }, Sa = { class: "ms-top-side" }, Ia = ["aria-label"], Ma = ["title"], Da = { class: "ms-cube-custom-icon" }, Ea = { class: "ms-cube-custom-title" }, Aa = ["title"], Pa = {
  key: 1,
  class: "ms-cube-custom-text countdown"
}, Wa = ["href"], Oa = {
  class: "ms-cube-dots",
  "aria-hidden": "true"
}, Ba = ["title", "onClick"], Ra = { class: "ms-cube-cm-header" }, Fa = { class: "ms-cube-cm-list" }, Na = ["onClick"], Ha = { class: "ms-cube-cm-icon" }, ja = { class: "ms-cube-cm-title" }, za = {
  key: 0,
  class: "ms-cube-cm-check"
}, Ga = /* @__PURE__ */ de({
  __name: "TopInfoCube",
  props: {
    active: { type: Boolean, default: !0 }
  },
  setup(e) {
    const t = e, o = ae(() => Ei.visible || it.djModalOpen || it.isActive && it.isJoined), i = ae(() => it.isActive && it.isJoined), r = ae(() => Me.getActiveFaces()), l = F("music"), h = F(0);
    let f = !1, p;
    Ue(
      () => r.value,
      (B) => {
        B.some((O) => O.id === l.value) || (l.value = B[0]?.id || "");
      },
      { immediate: !0 }
    );
    const x = ae(() => r.value.filter((B) => !B.builtIn)), k = F(!1), S = F({ x: 0, y: 0 });
    Ue(() => t.active, (B) => {
      B || (k.value = !1, Me.closeConfigDialog(), clearTimeout(p), f = !1);
    }, { immediate: !0 });
    const { menuRef: g, style: u } = Oi({
      visible: () => k.value,
      anchor: () => S.value,
      dismiss: () => {
        k.value = !1;
      }
    });
    function c(B) {
      B.preventDefault(), B.stopPropagation(), S.value = { x: B.clientX, y: B.clientY }, k.value = !0;
    }
    function y(B) {
      D(B), k.value = !1;
    }
    function $() {
      k.value = !1, Me.openConfigDialog();
    }
    function w() {
      k.value = !1, L(() => Me.resetDefaults()), D("music");
    }
    function L(B) {
      k.value = !1;
      try {
        B();
      } catch (O) {
        Pe.show({ appName: "滚动立方体", title: "保存失败", message: O instanceof Error ? O.message : "请检查浏览器存储" });
      }
    }
    function E(B) {
      if (!B) return "未设置目标日";
      const R = new Date(B).getTime() - b.value, me = Math.ceil(R / (1e3 * 60 * 60 * 24));
      return me > 0 ? `还剩 ${me} 天` : me === 0 ? "就是今天！" : `已过去 ${Math.abs(me)} 天`;
    }
    const ee = ae(() => U.isBiliRadio ? "B站电台" : U.isNetease ? "网易云" : U.playing ? "塞壬" : "待机"), ne = ae(() => U.currentLyric ? U.currentLyric : U.playing ? "♪ 伴奏播放中…" : "选择塞壬歌曲、网易云或B站电台后在这里显示歌词");
    function A() {
      Ie.handleToolClick("music");
    }
    const b = F(Date.now());
    let _;
    Ue(() => t.active && r.value.some((B) => B.id === l.value && B.customType === "countdown"), (B) => {
      B && (b.value = Date.now()), clearInterval(_), _ = B ? window.setInterval(() => {
        document.hidden || (b.value = Date.now());
      }, 6e4) : void 0;
    }, { immediate: !0 });
    function D(B, O = null) {
      const R = r.value, me = R.find((We) => We.id === B) || R[0];
      if (me) {
        if (Number.isFinite(O))
          h.value = O;
        else if (me.id !== l.value) {
          const We = R.findIndex((Le) => Le.id === l.value);
          let ke = (R.findIndex((Le) => Le.id === me.id) - We + R.length) % R.length;
          ke > R.length / 2 && (ke -= R.length), h.value += ke * 90;
        }
        l.value = me.id;
      }
    }
    function Y(B) {
      const O = r.value;
      if (O.length <= 1) return;
      const R = O.findIndex((ke) => ke.id === l.value), We = ((R >= 0 ? R : 0) + B + O.length) % O.length, Oe = O[We];
      Oe && D(Oe.id, h.value + B * 90);
    }
    function W(B) {
      r.value.length <= 1 || B.altKey || Math.abs(B.deltaY) < 2 || (B.preventDefault(), !f && (f = !0, Y(B.deltaY > 0 ? 1 : -1), p = setTimeout(() => {
        f = !1;
      }, 420)));
    }
    function H(B) {
      !["ArrowUp", "ArrowDown", "PageUp", "PageDown"].includes(B.key) || B.target?.closest?.("input") || (B.preventDefault(), Y(["ArrowDown", "PageDown"].includes(B.key) ? 1 : -1));
    }
    function P(B, O) {
      return l.value === B ? {
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
    return xt(() => {
      clearInterval(_), clearTimeout(p);
    }), (B, O) => Fe((a(), d("div", {
      class: "ms-top-player",
      "data-face": l.value,
      tabindex: "0",
      title: "滚动立方体 · 滚轮切换面板，右键可自由增删与排序",
      "aria-label": "滚动立方体",
      onWheel: W,
      onKeydown: H,
      onContextmenu: c,
      onCopy: K,
      onSelectstart: ge
    }, [
      r.value.length ? M("", !0) : (a(), d("button", {
        key: 0,
        type: "button",
        class: "ms-cube-cm-action",
        onClick: $
      }, "＋ 添加面（右键管理）")),
      n("div", {
        class: "ms-top-cube",
        style: ye({ transform: `translateZ(-22px) rotateX(${h.value}deg)` })
      }, [
        s(Me).isActive("music") && l.value === "music" ? (a(), d("section", {
          key: 0,
          class: "ms-top-face ms-top-face-music",
          "aria-label": "音乐歌词面",
          style: ye(P("music", 0))
        }, [
          n("div", ya, [
            n("button", {
              class: "ms-top-prev",
              title: "上一首",
              type: "button",
              onClick: O[0] || (O[0] = N((R) => s(Ve).prev(), ["stop"]))
            }, "⏮"),
            n("button", {
              class: "ms-top-play",
              title: "播放/暂停",
              type: "button",
              onClick: O[1] || (O[1] = N((R) => s(Ve).togglePlay(), ["stop"]))
            }, v(s(U).playing ? "⏸" : "▶"), 1)
          ]),
          n("button", {
            class: "ms-top-main",
            title: "打开音乐播放器",
            type: "button",
            onClick: N(A, ["stop"])
          }, [
            o.value ? (a(), d("div", ba, [
              n("span", wa, " 🎧 " + v(i.value ? "正在一起听" : "正在收听") + "：" + v(s(U).title || "待机中"), 1),
              n("span", ka, v(s(U).artist), 1)
            ])) : (a(), d(G, { key: 1 }, [
              n("div", _a, [
                n("span", {
                  class: "ms-top-title",
                  title: s(U).title || "音乐播放器"
                }, v(s(U).title || "音乐播放器"), 9, Ca),
                n("span", {
                  class: "ms-top-artist",
                  title: s(U).artist || "待机中"
                }, v(s(U).artist || "待机中"), 9, xa),
                n("span", {
                  class: le(["ms-top-source", { idle: !s(U).playing }])
                }, v(ee.value), 3),
                ne.value ? (a(), d("span", La)) : M("", !0)
              ]),
              ne.value ? (a(), d("span", {
                key: 0,
                class: "ms-top-lyric",
                title: ne.value
              }, v(ne.value), 9, $a)) : M("", !0)
            ], 64)),
            n("div", Ta, [
              n("div", {
                class: "ms-top-mini-fill",
                style: ye({ width: s(U).progressPercent + "%" })
              }, null, 4)
            ])
          ]),
          n("div", Sa, [
            n("button", {
              class: "ms-top-next",
              title: "下一首",
              type: "button",
              onClick: O[2] || (O[2] = N((R) => s(Ve).next(), ["stop"]))
            }, "⏭"),
            n("button", {
              class: "ms-top-open",
              title: "打开歌单",
              type: "button",
              onClick: N(A, ["stop"])
            }, "🎵")
          ])
        ], 4)) : M("", !0),
        (a(!0), d(G, null, fe(x.value, (R, me) => (a(), d("section", {
          key: R.id,
          class: "ms-top-face ms-top-face-custom",
          "aria-label": R.title,
          style: ye(P(R.id, (me + 1) * 90))
        }, [
          l.value === R.id ? (a(), d("div", {
            key: 0,
            class: "ms-cube-custom-body",
            title: R.desc
          }, [
            n("span", Da, v(R.icon), 1),
            n("strong", Ea, v(R.title), 1),
            O[10] || (O[10] = n("span", { class: "ms-cube-divider" }, null, -1)),
            R.customType === "memo" ? (a(), d("span", {
              key: 0,
              class: "ms-cube-custom-text",
              title: R.customData?.text
            }, v(R.customData?.text || "（点击右键配置便签内容）"), 9, Aa)) : R.customType === "countdown" ? (a(), d("span", Pa, v(E(R.customData?.targetDate)), 1)) : R.customType === "link" ? (a(), d("a", {
              key: 2,
              href: R.customData?.url,
              target: "_blank",
              rel: "noreferrer",
              class: "ms-cube-custom-link",
              onClick: O[3] || (O[3] = N(() => {
              }, ["stop"]))
            }, v(R.customData?.url) + " ↗ ", 9, Wa)) : M("", !0)
          ], 8, Ma)) : M("", !0),
          n("button", {
            type: "button",
            class: "ms-cube-config-trigger",
            title: "管理立方体面",
            onClick: O[4] || (O[4] = N((We) => s(Me).openConfigDialog(), ["stop"]))
          }, " ⚙ ")
        ], 12, Ia))), 128))
      ], 4),
      n("div", Oa, [
        (a(!0), d(G, null, fe(r.value, (R) => (a(), d("i", {
          key: R.id,
          class: le({ on: l.value === R.id }),
          title: R.title,
          onClick: N((me) => D(R.id), ["stop"])
        }, null, 10, Ba))), 128))
      ]),
      (a(), ce(gt, { to: "body" }, [
        t.active && k.value ? (a(), d("div", {
          key: 0,
          ref_key: "menuRef",
          ref: g,
          class: "ms-cube-context-menu",
          style: ye(s(u)),
          onClick: O[9] || (O[9] = N(() => {
          }, ["stop"]))
        }, [
          n("div", Ra, [
            O[11] || (O[11] = n("span", null, "🎲 滚动立方体面", -1)),
            n("button", {
              type: "button",
              class: "ms-cube-cm-close",
              onClick: O[5] || (O[5] = (R) => k.value = !1)
            }, "×")
          ]),
          n("div", Fa, [
            (a(!0), d(G, null, fe(r.value, (R) => (a(), d("button", {
              key: R.id,
              type: "button",
              class: le(["ms-cube-cm-item", { active: l.value === R.id }]),
              onClick: (me) => y(R.id)
            }, [
              n("span", Ha, v(R.icon), 1),
              n("span", ja, v(R.title), 1),
              l.value === R.id ? (a(), d("span", za, "✓")) : M("", !0)
            ], 10, Na))), 128))
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
          l.value ? (a(), d("button", {
            key: 0,
            type: "button",
            class: "ms-cube-cm-action danger",
            onClick: O[8] || (O[8] = (R) => L(() => s(Me).removeCustomFace(l.value)))
          }, "删除当前面")) : M("", !0),
          n("button", {
            type: "button",
            class: "ms-cube-cm-action danger",
            onClick: w
          }, [...O[15] || (O[15] = [
            n("span", null, "↺ 恢复默认（仅音乐）", -1)
          ])])
        ], 4)) : M("", !0)
      ])),
      t.active ? (a(), ce(ma, { key: 1 })) : M("", !0)
    ], 40, va)), [
      [to, t.active]
    ]);
  }
}), Ka = /* @__PURE__ */ Se(Ga, [["__scopeId", "data-v-c3454bdf"]]), bo = we({
  isOpen: !1
}), Zi = {
  open() {
    bo.isOpen = !0;
  },
  close() {
    bo.isOpen = !1;
  },
  toggle() {
    bo.isOpen = !bo.isOpen;
  }
}, Fn = Ct(bo);
function Va() {
  if (typeof chrome > "u" || !chrome.runtime?.onMessage) return () => {
  };
  let e = !1, t;
  const o = (i, r, l) => {
    r.id !== chrome.runtime.id || i?.type !== "TOGGLE_SIDE_DRAWER" || t === void 0 || i.targetTabId !== t || (Zi.toggle(), l({ ok: !0 }));
  };
  return chrome.tabs.getCurrent().then((i) => {
    e || (t = i?.id, chrome.runtime.onMessage.addListener(o));
  }).catch(() => console.warn("[SideDrawer] Could not bind the home-page command.")), () => {
    e = !0, chrome.runtime.onMessage.removeListener(o);
  };
}
const Ua = { class: "tb-brand" }, Ya = ["aria-expanded", "aria-label"], qa = ["src", "alt"], Xa = ["hidden"], Ja = ["hidden"], Za = { id: "vue-bookmark-folder-strip-root" }, Qa = { class: "tb-actions" }, el = {
  id: "workspace-launchers",
  hidden: ""
}, tl = ["aria-expanded"], ol = /* @__PURE__ */ de({
  __name: "AppTopBar",
  setup(e) {
    const t = z(() => import("./WorkspaceLaunchers-DBh3v_4e.js"));
    function o(u) {
      u.preventDefault(), u.stopPropagation();
      const c = typeof window < "u" ? window : null;
      c?.LogicWeaverWindowManager?.open ? c.LogicWeaverWindowManager.open("settings") : c?.LogicWeaverWindowTabs?.open ? c.LogicWeaverWindowTabs.open("settings") : tn.open();
    }
    function i(u) {
      u.preventDefault();
      const c = typeof window < "u" ? window : null;
      typeof c?.toggleBookmarkPanel == "function" ? c.toggleBookmarkPanel() : c?.LogicWeaverBookmarkPanel?.toggle ? c.LogicWeaverBookmarkPanel.toggle() : jn.toggleBookmarkPanel();
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
    ], f = F("☀️"), p = F("切换主题");
    function x() {
      if (typeof document > "u") return;
      const u = document.documentElement.dataset.theme || "light", c = h.find((y) => y.id === u) || h.find((y) => y.id === "light") || h[0];
      f.value = c.icon, p.value = `主题：${c.label}（点击更换）`;
    }
    function k(u) {
      if (u.preventDefault(), typeof document > "u") return;
      const c = document.documentElement.dataset.theme || "light", y = h.findIndex((w) => w.id === c), $ = h[(y + 1) % h.length];
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
      const c = u.target;
      c && (c.tagName === "INPUT" || c.tagName === "TEXTAREA" || c.isContentEditable) || (u.preventDefault(), u.stopPropagation());
    }
    function g(u) {
      const c = u.target;
      c && (c.tagName === "INPUT" || c.tagName === "TEXTAREA" || c.isContentEditable) || u.preventDefault();
    }
    return Ge(() => {
      _t.start();
      const u = localStorage.getItem("theme") || "light";
      document.documentElement.dataset.theme = u, document.documentElement.setAttribute("data-theme", u), x();
    }), (u, c) => (a(), d("header", {
      class: le(["topbar", { "bookmark-folders-mode": s(Kt).enabled }]),
      onCopy: S,
      onSelectstart: g
    }, [
      n("div", Ua, [
        n("button", {
          id: "bili-profile-button",
          class: "bili-profile-button",
          type: "button",
          title: "通知中心",
          "aria-controls": "notification-center",
          "aria-expanded": s(Ai).isOpen,
          "aria-label": s(ro) ? `通知中心，${s(ro)} 条未读` : "通知中心",
          onClick: r,
          onContextmenu: c[0] || (c[0] = N((y) => l(y), ["prevent"]))
        }, [
          n("img", {
            id: "bili-profile-avatar",
            src: s(zt).avatarUrl || "assets/bilibili.svg",
            alt: s(zt).userName || "通知中心头像"
          }, null, 8, qa),
          n("span", {
            id: "bili-profile-badge",
            class: "bili-profile-badge",
            hidden: s(ro) <= 0
          }, v(s(ro) > 99 ? "99+" : s(ro)), 9, Xa)
        ], 40, Ya),
        n("button", {
          id: "bookmark-handle",
          class: "bookmark-handle",
          type: "button",
          "aria-expanded": "false",
          title: "书签",
          hidden: s(Kt).enabled,
          onClick: i
        }, [...c[2] || (c[2] = [
          n("span", { id: "bookmark-handle-icon" }, "📁", -1),
          n("span", null, "书签", -1)
        ])], 8, Ja),
        n("div", Za, [
          q(ra)
        ])
      ]),
      q(Ka, {
        active: !s(kt).activeId
      }, null, 8, ["active"]),
      n("div", Qa, [
        c[3] || (c[3] = n("button", {
          id: "daily-toggle",
          class: "tb-pill",
          type: "button",
          hidden: "",
          title: "查看日报"
        }, "📰 日报", -1)),
        n("span", el, [
          q(s(t))
        ]),
        n("button", {
          id: "side-drawer-toggle",
          class: le(["tb-btn", { active: s(Fn).isOpen }]),
          type: "button",
          title: "侧栏 · 标签页聚合与待办",
          "aria-controls": "in-page-side-drawer",
          "aria-expanded": s(Fn).isOpen,
          onClick: c[1] || (c[1] = (y) => s(Zi).toggle())
        }, " 📑 ", 10, tl),
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
}), nl = {
  key: 0,
  class: "notice"
}, il = {
  key: 1,
  class: "muted small"
}, sl = {
  key: 2,
  class: "notice"
}, rl = {
  key: 3,
  class: "notice"
}, al = { class: "wx-cur" }, ll = { class: "wx-emoji" }, cl = { class: "wx-temp" }, dl = { class: "wx-sub" }, ul = { class: "wx-rain" }, pl = { class: "wx-hours" }, fl = { class: "hh" }, gl = { class: "he" }, hl = { class: "ht" }, ml = { class: "wx-days" }, vl = ["open"], yl = { class: "weather-forecast-head" }, bl = { class: "weather-forecast-city-info" }, wl = { class: "weather-forecast-icon" }, kl = { id: "weather-forecast-city-title" }, _l = { class: "small muted" }, Cl = { class: "weather-forecast-actions" }, xl = {
  key: 0,
  class: "weather-metrics-grid"
}, Ll = { class: "weather-metric-item" }, $l = {
  class: "metric-val",
  id: "weather-forecast-humidity"
}, Tl = { class: "weather-metric-item" }, Sl = {
  class: "metric-val",
  id: "weather-forecast-wind"
}, Il = { class: "weather-metric-item" }, Ml = {
  class: "metric-val",
  id: "weather-forecast-uv"
}, Dl = { class: "weather-metric-item" }, El = {
  class: "metric-val",
  id: "weather-forecast-aqi"
}, Al = {
  class: "weather-forecast-list",
  id: "weather-forecast-days-list"
}, Pl = { class: "day-date-col" }, Wl = { class: "day-name" }, Ol = { class: "day-date small muted" }, Bl = { class: "day-weather-col" }, Rl = { class: "day-emoji" }, Fl = { class: "day-cond" }, Nl = { class: "day-rain-col" }, Hl = {
  key: 0,
  class: "rain-tag"
}, jl = {
  key: 1,
  class: "rain-tag empty"
}, zl = { class: "day-temp-bar-col" }, Gl = { class: "low-temp" }, Kl = { class: "temp-track" }, Vl = { class: "high-temp" }, Ul = { class: "weather-location-head" }, Yl = { class: "weather-location-title-row" }, ql = ["title"], Xl = { class: "weather-input-wrapper" }, Jl = ["onKeydown"], Zl = { key: 0 }, Ql = {
  key: 0,
  class: "weather-location-suggestions"
}, ec = ["onClick"], tc = { class: "weather-suggestion-name" }, oc = { class: "weather-suggestion-sub" }, nc = {
  key: 1,
  class: "weather-suggestion-empty"
}, ic = { key: 1 }, sc = { class: "weather-quick-chips-grid" }, rc = ["onClick"], ac = /* @__PURE__ */ de({
  __name: "WeatherWidget",
  setup(e) {
    const t = F(!1), o = F({ x: 0, y: 0 }), i = F(""), r = F(null), l = F(null), h = ["深圳", "武汉", "北京", "上海", "广州", "成都", "杭州", "南京", "西安", "重庆", "苏州", "天津"], f = ae(() => {
      const w = i.value.trim();
      return w ? yo.filterCities(w, 6) : [];
    });
    function p(w) {
      const ne = w?.clientX ?? window.innerWidth / 2 - 140, A = w?.clientY ?? window.innerHeight / 2 - 320 / 2, b = Math.max(12, Math.min(window.innerWidth - 280 - 12, ne)), _ = Math.max(12, Math.min(window.innerHeight - 320 - 12, A));
      o.value = { x: b, y: _ }, t.value = !0, i.value = "", ft(() => {
        l.value?.focus();
      });
    }
    function x() {
      t.value = !1, i.value = "";
    }
    async function k(w) {
      const L = w.trim();
      L && (x(), await yo.changeCity(L));
    }
    function S() {
      const w = i.value.trim();
      w && k(w);
    }
    function g(w) {
      if (!t.value) return;
      const L = w.target;
      r.value && !r.value.contains(L) && x();
    }
    function u(w) {
      t.value && w.key === "Escape" && (w.preventDefault(), x());
    }
    Ge(() => {
      ot.setRefreshAction(() => {
        yo.loadWeather();
      }), ot.setChangeLocationAction((w) => {
        p(w);
      }), yo.loadWeather(), window.addEventListener("pointerdown", g, !0), window.addEventListener("keydown", u, !0);
    }), xt(() => {
      window.removeEventListener("pointerdown", g, !0), window.removeEventListener("keydown", u, !0);
    });
    function c(w) {
      w.preventDefault(), p(w);
    }
    function y() {
      ot.closeForecastModal();
    }
    function $(w) {
      w.target?.id === "weather-forecast-dialog" && y();
    }
    return (w, L) => (a(), d("div", {
      class: "weather-widget-container",
      onContextmenu: c
    }, [
      s(j).state === "unconfigured" ? (a(), d("p", nl, [...L[6] || (L[6] = [
        Ne(" 未设置城市。右键此处快速设置，或到 ", -1),
        n("a", { href: "options.html" }, "设置", -1),
        Ne(" 填写城市名（如 武汉 / Tokyo）。 ", -1)
      ])])) : s(j).state === "loading" ? (a(), d("p", il, "加载中…")) : s(j).state === "not_found" ? (a(), d("p", sl, "找不到城市「" + v(s(j).city) + "」，右键可重新选择地点。", 1)) : s(j).state === "error" ? (a(), d("p", rl, v(s(j).errorMessage || "天气加载失败，右键此处可重新选择地点。"), 1)) : s(j).state === "ready" && s(j).data ? (a(), d(G, { key: 4 }, [
        n("div", al, [
          n("span", ll, v(s(j).data.currentEmoji), 1),
          n("span", cl, v(s(j).data.currentTemp) + "°", 1)
        ]),
        n("p", dl, v(s(j).data.subText), 1),
        n("p", ul, v(s(j).data.rainText), 1),
        n("div", pl, [
          (a(!0), d(G, null, fe(s(j).data.hours, (E, ee) => (a(), d("div", {
            key: ee,
            class: "wx-h"
          }, [
            n("span", fl, v(E.time), 1),
            n("span", gl, v(E.emoji), 1),
            n("span", hl, v(E.temp) + "°", 1)
          ]))), 128))
        ]),
        n("div", ml, [
          (a(!0), d(G, null, fe(s(j).data.days, (E, ee) => (a(), d("span", { key: ee }, v(E.label) + " " + v(E.emoji) + " " + v(E.tempRange), 1))), 128))
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
          onClick: L[1] || (L[1] = N(() => {
          }, ["stop"]))
        }, [
          n("header", yl, [
            n("div", bl, [
              n("span", wl, v(s(j).data?.currentEmoji || "🌤️"), 1),
              n("div", null, [
                n("h3", kl, v(s(j).city || s(j).data?.cityName || "天气预报"), 1),
                n("p", _l, v(s(j).data?.subText || "未来多日天气趋势与生活气象指数"), 1)
              ])
            ]),
            n("div", Cl, [
              n("button", {
                id: "weather-forecast-refresh-btn",
                type: "button",
                class: "weather-forecast-btn",
                title: "刷新天气数据",
                onClick: L[0] || (L[0] = (E) => s(ot).refresh())
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
          s(j).detailInfo ? (a(), d("div", xl, [
            n("div", Ll, [
              L[7] || (L[7] = n("span", { class: "metric-label" }, "💧 相对湿度", -1)),
              n("span", $l, v(s(j).detailInfo.humidity || "50%"), 1)
            ]),
            n("div", Tl, [
              L[8] || (L[8] = n("span", { class: "metric-label" }, "💨 风力风向", -1)),
              n("span", Sl, v(s(j).detailInfo.wind || "微风"), 1)
            ]),
            n("div", Il, [
              L[9] || (L[9] = n("span", { class: "metric-label" }, "☀️ 紫外线指数", -1)),
              n("span", Ml, v(s(j).detailInfo.uvIndex || "中等"), 1)
            ]),
            n("div", Dl, [
              L[10] || (L[10] = n("span", { class: "metric-label" }, "🍃 空气质量", -1)),
              n("span", El, v(s(j).detailInfo.airQuality || "良"), 1)
            ])
          ])) : M("", !0),
          n("div", Al, [
            (a(!0), d(G, null, fe(s(j).forecastDays, (E, ee) => (a(), d("div", {
              key: ee,
              class: "weather-forecast-day-row forecast-day-item"
            }, [
              n("div", Pl, [
                n("span", Wl, v(E.dayName), 1),
                n("span", Ol, v(E.date), 1)
              ]),
              n("div", Bl, [
                n("span", Rl, v(E.emoji), 1),
                n("span", Fl, v(E.condition), 1)
              ]),
              n("div", Nl, [
                E.rainProb > 0 ? (a(), d("span", Hl, "☂️ " + v(E.rainProb) + "%", 1)) : (a(), d("span", jl, "无降水"))
              ]),
              n("div", zl, [
                n("span", Gl, v(E.lowTemp) + "°", 1),
                n("div", Kl, [
                  n("div", {
                    class: "temp-range-fill",
                    style: ye({
                      left: `${Math.max(0, Math.min(100, (E.lowTemp + 10) * 2))}%`,
                      width: `${Math.max(20, Math.min(80, (E.highTemp - E.lowTemp) * 6))}%`
                    })
                  }, null, 4)
                ]),
                n("span", Vl, v(E.highTemp) + "°", 1)
              ])
            ]))), 128))
          ])
        ])
      ], 8, vl),
      (a(), ce(gt, { to: "body" }, [
        t.value ? (a(), d("div", {
          key: 0,
          ref_key: "contextMenuRef",
          ref: r,
          class: "weather-location-context-menu",
          style: ye({ left: `${o.value.x}px`, top: `${o.value.y}px` }),
          onClick: L[4] || (L[4] = N(() => {
          }, ["stop"])),
          onContextmenu: L[5] || (L[5] = N(() => {
          }, ["prevent"]))
        }, [
          n("div", Ul, [
            n("div", Yl, [
              L[12] || (L[12] = n("span", { class: "weather-location-title" }, "切换天气地点", -1)),
              n("span", {
                class: "weather-location-curr-badge",
                title: s(j).city
              }, [
                L[11] || (L[11] = n("span", { class: "weather-curr-dot" }, null, -1)),
                Ne(" " + v(s(j).city || "未设置"), 1)
              ], 8, ql)
            ])
          ]),
          n("form", {
            class: "weather-location-form",
            onSubmit: N(S, ["prevent"])
          }, [
            n("div", Xl, [
              L[13] || (L[13] = n("span", { class: "weather-input-icon" }, "🔍", -1)),
              Fe(n("input", {
                ref_key: "inputRef",
                ref: l,
                class: "weather-location-input",
                placeholder: "输入城市名或拼音…",
                "onUpdate:modelValue": L[2] || (L[2] = (E) => i.value = E),
                onKeydown: Wt(N(S, ["prevent"]), ["enter"]),
                autocomplete: "off"
              }, null, 40, Jl), [
                [eo, i.value]
              ]),
              i.value ? (a(), d("button", {
                key: 0,
                type: "button",
                class: "weather-input-clear",
                onClick: L[3] || (L[3] = (E) => i.value = ""),
                title: "清除输入"
              }, "✕")) : M("", !0)
            ]),
            L[14] || (L[14] = n("button", {
              type: "submit",
              class: "weather-location-submit"
            }, "确定", -1))
          ], 32),
          i.value.trim() ? (a(), d("div", Zl, [
            L[15] || (L[15] = n("div", { class: "weather-section-subtitle" }, "匹配建议", -1)),
            f.value.length ? (a(), d("div", Ql, [
              (a(!0), d(G, null, fe(f.value, (E) => (a(), d("button", {
                key: E.name + E.admin,
                type: "button",
                class: "weather-suggestion-item",
                onClick: (ee) => k(E.name)
              }, [
                n("span", tc, v(E.name), 1),
                n("span", oc, v(E.admin), 1)
              ], 8, ec))), 128))
            ])) : (a(), d("div", nc, " 未找到完全匹配城市，回车或点击「确定」直接尝试检索 "))
          ])) : (a(), d("div", ic, [
            L[16] || (L[16] = n("div", { class: "weather-section-subtitle" }, "常用城市", -1)),
            n("div", sc, [
              (a(), d(G, null, fe(h, (E) => n("button", {
                key: E,
                type: "button",
                class: le(["weather-quick-chip", { active: s(j).city === E }]),
                onClick: (ee) => k(E)
              }, v(E), 11, rc)), 64))
            ])
          ]))
        ], 36)) : M("", !0)
      ]))
    ], 32));
  }
}), Qi = /* @__PURE__ */ Se(ac, [["__scopeId", "data-v-51b21266"]]), Nn = "heroCustomMottoV1";
function lc() {
  try {
    if (typeof localStorage < "u") {
      const e = localStorage.getItem(Nn);
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
const Nt = lc(), V = we({
  loaded: !1,
  customText: Nt.customText,
  history: Nt.history,
  currentIndex: Nt.customText && Nt.history.length ? Nt.history.findIndex((e) => e.text === Nt.customText) : -1,
  menuOpen: !1,
  menuPos: { x: 0, y: 0 }
});
function cc(e) {
  return new Promise((t) => {
    typeof chrome < "u" && chrome?.storage?.local?.get ? chrome.storage.local.get([e], (o) => t(o?.[e])) : t(null);
  });
}
function dc(e, t) {
  try {
    typeof localStorage < "u" && localStorage.setItem(e, JSON.stringify(t));
  } catch {
  }
  return new Promise((o) => {
    typeof chrome < "u" && chrome?.storage?.local?.set ? chrome.storage.local.set({ [e]: t }, () => o()) : o();
  });
}
function uc(e) {
  const t = (r) => String(r).padStart(2, "0"), o = `${e.getFullYear()}-${t(e.getMonth() + 1)}-${t(e.getDate())}`, i = `${t(e.getHours())}:${t(e.getMinutes())}`;
  return { date: o, time: i };
}
const tt = {
  async init() {
    try {
      const e = await cc(Nn);
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
    await dc(Nn, e);
  },
  setCustomMotto(e) {
    const t = e.trim();
    if (!t) {
      this.resetToSystem();
      return;
    }
    const { date: o, time: i } = uc(/* @__PURE__ */ new Date());
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
}, pc = { class: "motto-content" }, fc = {
  key: 0,
  class: "motto-scroll-hint",
  title: "滚动鼠标滚轮快速切换历史标语"
}, gc = { class: "motto-menu-header" }, hc = { class: "dim" }, mc = { class: "motto-history-list" }, vc = {
  key: 0,
  class: "motto-history-empty dim"
}, yc = ["onClick"], bc = { class: "motto-item-date" }, wc = ["title"], kc = ["onClick"], _c = /* @__PURE__ */ de({
  __name: "HeroMotto",
  setup(e) {
    const t = F(!1), o = F(""), i = F(null), r = ae(() => V.customText || ve.greetingText);
    function l() {
      tt.closeMenu(), o.value = V.customText || ve.greetingText, t.value = !0, ft(() => {
        i.value?.focus(), i.value?.select();
      });
    }
    function h() {
      if (!t.value) return;
      t.value = !1;
      const g = o.value.trim();
      tt.setCustomMotto(g), g && Pe.fetch("标语", `已更新标语: ${g}`);
    }
    function f() {
      t.value = !1;
    }
    function p(g) {
      g.key === "Enter" ? (g.preventDefault(), h()) : g.key === "Escape" && (g.preventDefault(), f());
    }
    function x(g) {
      t.value || (g.preventDefault(), g.stopPropagation(), tt.stepHistory(g.deltaY > 0 ? 1 : -1));
    }
    function k(g) {
      g.preventDefault(), g.stopPropagation(), tt.openMenu(g.clientX, g.clientY);
    }
    function S(g) {
      V.menuOpen && (g.target.closest(".motto-context-menu") || tt.closeMenu());
    }
    return Ge(() => {
      tt.init(), window.addEventListener("click", S);
    }), xt(() => {
      window.removeEventListener("click", S);
    }), (g, u) => (a(), d(G, null, [
      n("div", {
        class: "hero-motto-wrapper",
        title: "点击直接编辑标语 · 滚轮切换历史标语 · 右键查看标语菜单",
        onWheel: x,
        onContextmenu: k
      }, [
        t.value ? Fe((a(), d("input", {
          key: 0,
          ref_key: "mottoInputRef",
          ref: i,
          "onUpdate:modelValue": u[0] || (u[0] = (c) => o.value = c),
          class: "hero-motto-input",
          type: "text",
          placeholder: "写下你此刻的个性标语…",
          maxlength: "60",
          onBlur: h,
          onKeydown: p
        }, null, 544)), [
          [eo, o.value]
        ]) : (a(), d("p", {
          key: 1,
          id: "greeting",
          class: "hero-motto-text",
          style: ye({ color: s(ve).greetColor }),
          onClick: l
        }, [
          n("span", pc, v(r.value), 1),
          s(V).history.length > 1 ? (a(), d("span", fc, "⇕")) : M("", !0)
        ], 4))
      ], 32),
      (a(), ce(gt, { to: "body" }, [
        s(V).menuOpen ? (a(), d("div", {
          key: 0,
          class: "motto-context-menu",
          style: ye({ left: `${s(V).menuPos.x}px`, top: `${s(V).menuPos.y}px` }),
          onClick: u[3] || (u[3] = N(() => {
          }, ["stop"])),
          onContextmenu: u[4] || (u[4] = N(() => {
          }, ["prevent"]))
        }, [
          n("div", gc, [
            u[5] || (u[5] = n("span", null, "🏷️ 自定义标语", -1)),
            n("small", hc, v(s(V).history.length) + " 条记录", 1)
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
          n("div", mc, [
            s(V).history.length ? (a(!0), d(G, { key: 1 }, fe(s(V).history, (c) => (a(), d("div", {
              key: c.id,
              class: le(["motto-history-item", { active: s(V).customText === c.text }]),
              onClick: (y) => s(tt).selectHistory(c)
            }, [
              n("span", bc, v(c.date), 1),
              n("span", {
                class: "motto-item-text",
                title: c.text
              }, v(c.text), 9, wc),
              n("button", {
                type: "button",
                class: "motto-item-del",
                title: "删除此条标语",
                onClick: N((y) => s(tt).deleteEntry(c.id), ["stop"])
              }, "×", 8, kc)
            ], 10, yc))), 128)) : (a(), d("div", vc, " 暂无历史标语，自定义的每一条标语都会沉淀在此 "))
          ]),
          u[11] || (u[11] = n("div", { class: "motto-menu-divider" }, null, -1)),
          n("button", {
            type: "button",
            class: "motto-menu-action reset-btn",
            onClick: u[1] || (u[1] = //@ts-ignore
            (...c) => s(tt).resetToSystem && s(tt).resetToSystem(...c))
          }, [...u[7] || (u[7] = [
            n("i", null, "↻", -1),
            n("span", null, "恢复系统自动问候（早安/午安/晚安）", -1)
          ])]),
          s(V).history.length ? (a(), d("button", {
            key: 0,
            type: "button",
            class: "motto-menu-action danger-btn",
            onClick: u[2] || (u[2] = //@ts-ignore
            (...c) => s(tt).clearHistory && s(tt).clearHistory(...c))
          }, [...u[8] || (u[8] = [
            n("i", null, "🗑", -1),
            n("span", null, "清空全部历史标语", -1)
          ])])) : M("", !0)
        ], 36)) : M("", !0)
      ]))
    ], 64));
  }
}), Cc = /* @__PURE__ */ Se(_c, [["__scopeId", "data-v-0514f22a"]]), xc = /* @__PURE__ */ de({
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
      const p = (ne) => String(ne).padStart(2, "0"), x = i(), k = x.getHours(), S = x.getMinutes(), g = x.getSeconds(), u = x.getFullYear(), c = x.getMonth() + 1, y = x.getDate(), $ = x.getDay(), w = `${p(k)}:${p(S)}`, L = `:${p(g)}`, E = o(k), ee = `${u}年${c}月${y}日 · ${t[$]}`;
      Ut.updateTime(w, L, E, ee);
    }
    function l(p) {
      p.preventDefault(), At.open({ clientX: p.clientX, clientY: p.clientY });
    }
    function h() {
      document.hidden ? f && (clearInterval(f), f = null) : (r(), f || (f = setInterval(r, 1e3)));
    }
    let f = null;
    return At.initPreferences(), r(), Ge(() => {
      At.initPreferences(), kt.activeId || (r(), f = setInterval(r, 1e3)), document.addEventListener("visibilitychange", h);
    }), Ue(
      () => kt.activeId,
      (p) => {
        p ? f && (clearInterval(f), f = null) : document.hidden || (r(), f || (f = setInterval(r, 1e3)));
      }
    ), xt(() => {
      f && (clearInterval(f), f = null), document.removeEventListener("visibilitychange", h);
    }), (p, x) => (a(), d("div", {
      class: "hero-clock-vue-container",
      onContextmenu: l
    }, [
      n("p", {
        id: "clock",
        class: "clock",
        style: ye({ fontFamily: s(ve).fontFamily, color: s(ve).colorHex })
      }, [
        Ne(v(s(ve).timeText), 1),
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
}), es = /* @__PURE__ */ Se(xc, [["__scopeId", "data-v-38840808"]]), Lc = {
  key: 0,
  class: "home-music-degraded-box"
}, $c = { class: "degraded-badge-row" }, Tc = { class: "degraded-status" }, Sc = {
  key: 0,
  class: "degraded-host-tag"
}, Ic = {
  key: 1,
  class: "degraded-host-tag"
}, Mc = { class: "degraded-title-row" }, Dc = ["title"], Ec = { class: "degraded-track-artist" }, Ac = { class: "degraded-progress-bar-wrap" }, Pc = { class: "degraded-actions" }, Wc = { class: "degraded-time" }, Oc = { class: "home-vinyl-box" }, Bc = ["src"], Rc = { class: "home-music-right" }, Fc = ["title"], Nc = {
  id: "home-music-artist",
  class: "home-music-meta-artist"
}, Hc = { class: "home-music-seek-row" }, jc = {
  id: "home-music-cur",
  class: "home-music-time"
}, zc = ["value"], Gc = {
  id: "home-music-dur",
  class: "home-music-time"
}, Kc = { class: "home-music-actions" }, Vc = /* @__PURE__ */ de({
  __name: "HomeMusicCard",
  setup(e) {
    Ge(() => {
      setTimeout(() => {
        Fs();
      }, 200);
    });
    const t = ae(() => Ei.visible || it.djModalOpen || it.isActive && it.isJoined), o = ae(() => it.isActive && it.isJoined), i = ae(() => U.mode === "shuffle" ? "🔀" : U.mode === "one" ? "🔂" : "🔁");
    function r(h) {
      const f = h.target, p = Number(f.value);
      Ve.seek(p);
    }
    function l() {
      Ve.update({ coverUrl: "" });
    }
    return (h, f) => (a(), d("div", {
      id: "home-music-player-view",
      class: le(["home-music-player-view", { "is-degraded": t.value }])
    }, [
      t.value ? (a(), d("div", Lc, [
        n("div", $c, [
          f[7] || (f[7] = n("span", { class: "degraded-icon" }, "🎧", -1)),
          n("strong", Tc, v(o.value ? "正在一起听" : "后台收听中"), 1),
          o.value ? (a(), d("span", Sc, " DJ: " + v(s(it).hostName), 1)) : (a(), d("span", Ic, " 工作区就绪 "))
        ]),
        n("div", Mc, [
          n("h3", {
            class: "degraded-track-title",
            title: s(U).title
          }, v(s(U).title || "待机中"), 9, Dc),
          n("p", Ec, v(s(U).artist), 1)
        ]),
        n("div", Ac, [
          n("div", {
            class: "degraded-progress-bar-fill",
            style: ye({ width: s(U).progressPercent + "%" })
          }, null, 4)
        ]),
        n("div", Pc, [
          n("button", {
            type: "button",
            class: "degraded-btn",
            onClick: f[0] || (f[0] = (p) => s(Ve).togglePlay())
          }, v(s(U).playing ? "⏸ 暂停" : "▶ 播放"), 1),
          n("span", Wc, v(s(U).formattedCurrent) + " / " + v(s(U).formattedDuration), 1)
        ])
      ])) : (a(), d(G, { key: 1 }, [
        n("div", Oc, [
          n("div", {
            id: "home-vinyl-needle",
            class: le(["home-vinyl-needle", { playing: s(U).playing }])
          }, [...f[8] || (f[8] = [
            mo('<svg viewBox="0 0 32 52" fill="none" data-v-25a69816><circle cx="26" cy="4" r="3.5" fill="#e2e8f0" stroke="#475569" stroke-width="1.5" data-v-25a69816></circle><circle cx="26" cy="4" r="1.5" fill="#64748b" data-v-25a69816></circle><path d="M26 4 L14 26 L11 44" stroke="#cbd5e1" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" data-v-25a69816></path><rect x="7" y="42" width="8" height="9" rx="1.5" fill="#f43f5e" transform="rotate(-15 11 46)" data-v-25a69816></rect></svg>', 1)
          ])], 2),
          n("div", {
            id: "home-vinyl-disc",
            class: le(["home-vinyl-disc", { playing: s(U).playing }]),
            title: "点击播放 / 暂停",
            onClick: f[1] || (f[1] = (p) => s(Ve).togglePlay())
          }, [
            s(U).coverUrl ? (a(), d("img", {
              key: 0,
              id: "home-vinyl-cover",
              class: "home-vinyl-cover",
              referrerpolicy: "no-referrer",
              src: s(U).coverUrl,
              alt: "音乐封面",
              onError: l
            }, null, 40, Bc)) : M("", !0),
            f[9] || (f[9] = n("div", { class: "home-vinyl-hole" }, null, -1))
          ], 2)
        ]),
        n("div", Rc, [
          n("h3", {
            id: "home-music-title",
            class: "home-music-meta-title",
            title: s(U).title
          }, v(s(U).title), 9, Fc),
          n("p", Nc, v(s(U).artist), 1),
          n("div", Hc, [
            n("span", jc, v(s(U).formattedCurrent), 1),
            n("input", {
              id: "home-music-seek",
              class: "home-music-seek-bar",
              type: "range",
              min: "0",
              max: "100",
              value: s(U).progressPercent,
              onInput: r
            }, null, 40, zc),
            n("span", Gc, v(s(U).formattedDuration), 1)
          ]),
          n("div", Kc, [
            n("button", {
              id: "home-music-prev",
              class: "home-music-btn",
              type: "button",
              title: "上一首",
              onClick: f[2] || (f[2] = (p) => s(Ve).prev())
            }, " ⏮ "),
            n("button", {
              id: "home-music-play",
              class: "home-music-btn play-btn",
              type: "button",
              title: "播放 / 暂停",
              onClick: f[3] || (f[3] = (p) => s(Ve).togglePlay())
            }, v(s(U).playing ? "⏸" : "▶"), 1),
            n("button", {
              id: "home-music-next",
              class: "home-music-btn",
              type: "button",
              title: "下一首",
              onClick: f[4] || (f[4] = (p) => s(Ve).next())
            }, " ⏭ "),
            n("button", {
              id: "home-music-like",
              class: le(["home-music-btn like-btn", { liked: s(U).liked }]),
              type: "button",
              title: "收藏",
              onClick: f[5] || (f[5] = (p) => s(Ve).toggleLike())
            }, v(s(U).liked ? "♥" : "♡"), 3),
            n("button", {
              id: "home-music-mode",
              class: "home-music-btn",
              type: "button",
              title: "播放模式",
              onClick: f[6] || (f[6] = (p) => s(Ve).cycleMode())
            }, v(i.value), 1)
          ])
        ])
      ], 64))
    ], 2));
  }
}), ts = /* @__PURE__ */ Se(Vc, [["__scopeId", "data-v-25a69816"]]), ut = /* @__PURE__ */ new Map(), pt = /* @__PURE__ */ new Set();
function Uc(e, t) {
  for (ut.delete(e), ut.set(e, t), pt.delete(t), pt.add(t); ut.size > 512; )
    ut.delete(ut.keys().next().value);
  for (; pt.size > 512; )
    pt.delete(pt.values().next().value);
}
const Yc = {
  key: 0,
  class: "launcher-fallback"
}, qc = ["src"], Ln = "lw_resolved_icon:", Xc = /* @__PURE__ */ de({
  __name: "LauncherFavicon",
  props: {
    link: {},
    mini: { type: Boolean, default: !1 }
  },
  setup(e) {
    function t(w) {
      try {
        return localStorage.getItem(Ln + w) || "";
      } catch {
        return "";
      }
    }
    function o(w, L) {
      try {
        localStorage.setItem(Ln + w, L);
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
    function f(w) {
      try {
        const L = window, E = typeof L.chrome < "u" ? L.chrome : globalThis.chrome;
        if (typeof E?.runtime?.getURL == "function")
          return E.runtime.getURL("_favicon/?pageUrl=" + encodeURIComponent(w) + "&size=64");
      } catch {
      }
      return "";
    }
    const p = ae(() => {
      const w = r.link, L = (w.title || l(w.url)).trim();
      return L ? L.slice(0, 1).toUpperCase() : "🔗";
    }), x = F([]), k = F(0), S = F(!1), g = F(!1), u = ae(() => g.value || k.value >= x.value.length ? "" : x.value[k.value] || "");
    function c() {
      const w = r.link;
      if (!w?.url) {
        x.value = [], g.value = !0, S.value = !1;
        return;
      }
      const L = [], E = i(w.url);
      E && L.push(E);
      const ee = ut.get(w.url) || t(w.url);
      ee && !L.includes(ee) && L.push(ee);
      const ne = (W) => W ? /google\.com\/s2\/favicons|icons\.duckduckgo\.com|unavatar\.io|icon\.horse/i.test(W) : !1;
      w.customIcon && !ne(w.customIcon) && L.push(w.customIcon), w.icon && !ne(w.icon) && L.push(w.icon);
      const A = f(w.url);
      A && !L.includes(A) && L.push(A);
      const b = oe.getCachedIcon(w.url);
      b && !L.includes(b) && L.push(b);
      const _ = h(w.url);
      _ && !_.startsWith("http://1.") && !_.startsWith("http://192.") && !_.startsWith("http://127.") && L.push(`${_}/favicon.ico`), w.customIcon && !ne(w.customIcon) && L.unshift(w.customIcon);
      const D = [...new Set(L.filter(Boolean))];
      x.value = D, k.value = 0, g.value = D.length === 0;
      const Y = D[0];
      Y && (Y.startsWith("data:") || pt.has(Y)) && (S.value = !0);
    }
    Ue(
      () => [r.link?.url, r.link?.icon, r.link?.customIcon],
      (w, L) => {
        L && w[0] === L[0] && w[1] === L[1] && w[2] === L[2] || c();
      },
      { immediate: !0 }
    ), Ge(() => {
      x.value.length === 0 && c();
    });
    function y(w) {
      S.value = !0, g.value = !1;
      const L = u.value;
      if (L) {
        const E = pt.has(L), ee = ut.get(r.link.url);
        Uc(r.link.url, L), ee !== L && t(r.link.url) !== L && o(r.link.url, L);
        const ne = w.target;
        if (!E && !L.startsWith("data:")) {
          const A = r.link.url;
          setTimeout(() => {
            oe.cacheIcon(A, L, ne?.getAttribute("src") === L ? ne : null);
          }, 0);
        }
      }
    }
    function $() {
      const w = u.value;
      if (w) {
        pt.delete(w), ut.get(r.link.url) === w && ut.delete(r.link.url);
        try {
          localStorage.removeItem(Ln + r.link.url), localStorage.removeItem("lw_sync_dataurl:" + r.link.url);
        } catch {
        }
      }
      if (w && oe.getCachedIcon(r.link.url) === w && oe.evictCachedIcon(r.link.url), k.value + 1 < x.value.length) {
        k.value += 1;
        const L = x.value[k.value];
        L && (L.startsWith("data:") || pt.has(L)) && (S.value = !0);
      } else
        g.value = !0, S.value = !1;
    }
    return (w, L) => (a(), d("span", {
      class: le(e.mini ? "launcher-folder-mini" : "launcher-favicon")
    }, [
      g.value || !u.value ? (a(), d("span", Yc, v(p.value), 1)) : (a(), d("img", {
        key: 1,
        src: u.value,
        alt: "",
        draggable: "false",
        referrerpolicy: "no-referrer",
        decoding: "async",
        style: { "pointer-events": "none", "user-select": "none" },
        onLoad: y,
        onError: $
      }, null, 40, qc))
    ], 2));
  }
}), Qo = /* @__PURE__ */ Se(Xc, [["__scopeId", "data-v-bc41d0d8"]]), Jc = { class: "launcher-label launcher-title" }, Zc = ["title"], Qc = {
  key: 0,
  class: "launcher-folder-more"
}, ed = {
  key: 1,
  class: "empty-folder",
  "aria-hidden": "true"
}, td = { class: "launcher-folder-label launcher-title" }, od = /* @__PURE__ */ de({
  __name: "LauncherTileContent",
  props: {
    link: {},
    folder: {},
    size: { default: "small" }
  },
  setup(e) {
    const t = e, o = ae(() => t.size === "large" ? 9 : 4), i = ae(() => t.folder?.preview.slice(0, t.folder.count > o.value ? o.value - 1 : o.value) || []);
    return (r, l) => e.link ? (a(), d(G, { key: 0 }, [
      q(Qo, { link: e.link }, null, 8, ["link"]),
      n("span", Jc, v(e.link.title), 1)
    ], 64)) : e.folder ? (a(), d(G, { key: 1 }, [
      n("div", {
        class: "launcher-folder-preview",
        title: `打开${e.folder.title}`
      }, [
        (a(!0), d(G, null, fe(i.value, (h) => (a(), ce(Qo, {
          key: h.id,
          link: h,
          mini: !0
        }, null, 8, ["link"]))), 128)),
        e.folder.count > o.value ? (a(), d("span", Qc, "+" + v(e.folder.count - (o.value - 1)), 1)) : M("", !0),
        i.value.length ? M("", !0) : (a(), d("span", ed, "📁")),
        Mi(r.$slots, "default", {}, void 0, !0)
      ], 8, Zc),
      n("span", td, v(e.folder.title), 1)
    ], 64)) : M("", !0);
  }
}), ki = /* @__PURE__ */ Se(od, [["__scopeId", "data-v-7f513029"]]), nd = 5, id = 180;
function sd(e, t, o) {
  const i = t - e.left, r = o - e.top;
  return i > e.width * 0.25 && i < e.width * 0.75 && r > e.height * 0.25 && r < e.height * 0.75;
}
function rd(e, t, o) {
  return Math.hypot(t - (e.left + e.width / 2), o - (e.top + e.height / 2)) <= Math.max(e.width, e.height) * 0.55;
}
const ad = {
  class: "launcher-group launcher-aihot launcher-todoist size-large",
  id: "launcher-todoist"
}, ld = {
  class: "aihot-home-body",
  id: "aihot-home-body"
}, cd = {
  key: 0,
  class: "muted small"
}, dd = {
  key: 1,
  class: "notice small"
}, ud = {
  key: 2,
  class: "muted small aihot-home-empty"
}, pd = {
  key: 3,
  class: "aihot-home-rich-list"
}, fd = ["href", "title", "onClick"], gd = { class: "aihot-home-rich-main" }, hd = { class: "aihot-home-rich-title" }, md = {
  key: 0,
  class: "aihot-home-rich-summary"
}, vd = { class: "aihot-home-rich-meta" }, yd = { class: "aihot-home-rich-meta-left" }, bd = {
  key: 0,
  class: "aihot-home-rich-tag"
}, wd = { class: "aihot-home-rich-source" }, kd = { class: "aihot-home-rich-time" }, _i = 6, _d = /* @__PURE__ */ de({
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
    }, o = F([]), i = F(0), r = F(!0), l = F("");
    function h(c) {
      return c.category ? t[c.category] || c.category : "";
    }
    function f(c) {
      const y = c.publishedAt || c.published || "";
      if (!y) return "最新";
      const $ = Number(y), w = Number.isFinite($) && $ > 0 ? new Date($ > 1e12 ? $ : $ * 1e3) : new Date(y);
      if (isNaN(w.getTime())) return String(y).slice(0, 16) || "最新";
      const L = (_) => String(_).padStart(2, "0"), E = w.getFullYear(), ee = L(w.getMonth() + 1), ne = L(w.getDate()), A = L(w.getHours()), b = L(w.getMinutes());
      return `${E}-${ee}-${ne} ${A}:${b}`;
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
      const y = (typeof window < "u" ? window : null)?.LogicWeaverAihotFeed?.getState?.()?.feedArticles;
      if (Array.isArray(y) && y.length)
        return y;
      const $ = [
        "newtab_aihot_items_v2",
        "lw-aihot-cached-feed-all-24h-v1",
        "lw-aihot-cached-feed-v1"
      ];
      for (const w of $)
        try {
          const L = localStorage.getItem(w);
          if (L) {
            const E = JSON.parse(L);
            if (Array.isArray(E) && E.length) return E;
            if (E && Array.isArray(E.items) && E.items.length) return E.items;
          }
        } catch {
        }
      return [];
    }
    async function k(c = !1) {
      if (!c && o.value.length > 0) return;
      const y = x();
      y.length ? (o.value = y, r.value = !1) : o.value.length || (o.value = [...p], r.value = !1);
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
    function u(c, y) {
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
    }), (c, y) => (a(), d("section", ad, [
      n("header", { class: "card-head aihot-home-head" }, [
        y[0] || (y[0] = n("span", { class: "bar cyan" }, null, -1)),
        y[1] || (y[1] = n("strong", { class: "title" }, "AI HOT 资讯", -1)),
        y[2] || (y[2] = n("span", { class: "grow" }, null, -1)),
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
          onClick: g
        }, " 热榜 ↗ ")
      ]),
      n("div", ld, [
        r.value && !o.value.length ? (a(), d("p", cd, "正在加载精选资讯…")) : l.value && !o.value.length ? (a(), d("p", dd, v(l.value), 1)) : o.value.length ? (a(), d("div", pd, [
          (a(!0), d(G, null, fe(o.value.slice(i.value, i.value + _i), ($, w) => (a(), d("a", {
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
            }, v(i.value + w + 1), 3),
            n("div", gd, [
              n("h3", hd, v($.title), 1),
              $.summary ? (a(), d("p", md, v($.summary), 1)) : M("", !0),
              n("div", vd, [
                n("div", yd, [
                  h($) ? (a(), d("span", bd, v(h($)), 1)) : M("", !0),
                  n("span", wd, v($.source?.name || $.sourceName || "AI HOT"), 1)
                ]),
                n("time", kd, v(f($)), 1)
              ])
            ])
          ], 8, fd))), 128))
        ])) : (a(), d("p", ud, "暂无精选资讯，请点击换一批重试"))
      ])
    ]));
  }
}), Cd = /* @__PURE__ */ Se(_d, [["__scopeId", "data-v-cc4398a8"]]), xd = {
  class: "sites-view-switch",
  role: "group",
  "aria-label": "网站与书签切换"
}, Ld = ["disabled", "aria-pressed"], $d = ["disabled", "aria-pressed"], Td = {
  class: "launcher-page-tabs",
  role: "tablist",
  "aria-label": "常用网站分区"
}, Sd = ["data-page", "title", "onClick", "onContextmenu", "onDragover", "onDrop"], Id = {
  key: 0,
  id: "bookmark-board-header",
  class: "launcher-page-tabs"
}, Md = ["data-page"], Dd = ["href", "title", "data-launcher-id", "onPointerdown", "onClick", "onContextmenu"], Ed = ["title", "data-launcher-folder", "onPointerdown", "onDragstart", "onDrop", "onClick", "onContextmenu"], Ad = ["title", "onClick"], Pd = {
  class: "launcher-folder-count",
  hidden: ""
}, Wd = {
  class: "launcher-empty",
  key: "empty-msg"
}, Od = {
  key: 1,
  class: "launcher-media-stack"
}, Bd = {
  key: 1,
  id: "launcher-bili"
}, Rd = { class: "launcher-folder-preview" }, Fd = { class: "launcher-folder-label launcher-title" }, Nd = { class: "launcher-label launcher-title" }, Hd = /* @__PURE__ */ de({
  __name: "FavoriteSites",
  setup(e) {
    const t = z(() => import("./BookmarkBoard-C3FjU6NJ.js")), o = z(() => import("./LauncherBookGuideDialog-CMq5Zlg5.js")), i = F("sites"), r = F(!1), l = F(!1);
    function h() {
      l.value = !0;
    }
    function f() {
      l.value = !1;
    }
    function p() {
      $e(), y = !1, ge = !1;
    }
    Ge(() => {
      Te.setExternalDragHandler(b), Te.setExternalDropHandler(_), window.addEventListener("blur", p), window.addEventListener("pagehide", p), document.addEventListener("visibilitychange", p);
      const m = window;
      re.hasBili && typeof m.ensureLauncherMediaCards == "function" && m.ensureLauncherMediaCards();
    });
    const x = F(!1), k = F(""), S = F(null), g = F(null), u = F(null), c = F(null);
    let y = !1, $ = 0, w = 0, L = 0, E = "", ee = 0, ne = "", A = 0;
    function b(m) {
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
      const J = I.classList.contains("launcher-link"), he = J ? I.getAttribute("data-launcher-id") : null, Ee = J ? null : I.getAttribute("data-launcher-folder"), te = J ? `link-${he}` : `folder-${Ee}`, se = I.getBoundingClientRect(), je = se.left + se.width / 2, an = se.top + se.height / 2, so = Math.hypot(m.clientX - je, m.clientY - an), Ot = Date.now();
      if (so > Math.max(se.width, se.height) * 0.55 || te === ne && Ot - A < 180) return;
      const Bt = rn.value.filter(
        (Be) => Be.type !== "link" || String(Be.link.id) !== String(m.link.id)
      ), st = [...c.value || Bt], ht = st.findIndex(
        (Be) => Be.type === "link" && String(Be.link.id) === String(m.link.id)
      ), mt = st.findIndex((Be) => Be.key === te);
      if (mt < 0) return;
      const Ze = {
        key: `link-${m.link.id}`,
        type: "link",
        link: m.link
      };
      ht >= 0 ? ht !== mt && (st.splice(ht, 1), st.splice(mt, 0, Ze), c.value = st, ne = te, A = Ot) : (st.splice(mt, 0, Ze), c.value = st, ne = te, A = Ot);
    }
    async function _(m) {
      if (i.value !== "sites" || qe.isOpen) return !1;
      if (c.value) {
        const C = c.value.map((T) => ({
          type: T.type,
          id: T.type === "link" ? String(T.link.id) : void 0,
          groupName: T.type === "folder" ? T.folder.groupName : void 0
        }));
        return await oe.moveLinkTo(String(m.id), re.activePage, "常用网站"), await oe.reorderPageItems(re.activePage, C), c.value = null, ne = "", !0;
      }
      return !1;
    }
    const D = we({
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
      Y = C.pointerId, W = C.clientX, H = C.clientY, w = C.clientX, L = C.clientY, P = String(m.id), K = null, ge = !1;
      const T = C.currentTarget.getBoundingClientRect();
      D.offsetX = C.clientX - T.left, D.offsetY = C.clientY - T.top, D.type = "link", D.link = m, D.folder = null, window.addEventListener("pointermove", Oe, { passive: !1 }), window.addEventListener("pointerup", Le), window.addEventListener("pointercancel", Le);
    }
    function O(m, C, T) {
      if (T.button !== 0 || T.target.closest(".launcher-folder-del-btn")) return;
      Y = T.pointerId, W = T.clientX, H = T.clientY, w = T.clientX, L = T.clientY, P = null, K = m, ge = !1;
      const I = T.currentTarget.getBoundingClientRect();
      D.offsetX = T.clientX - I.left, D.offsetY = T.clientY - I.top, D.type = "folder", D.folder = {
        groupName: m,
        size: He(m),
        links: C?.links || []
      }, D.link = null, window.addEventListener("pointermove", Oe, { passive: !1 }), window.addEventListener("pointerup", Le), window.addEventListener("pointercancel", Le);
    }
    let R = 0, me = null;
    function We() {
      cancelAnimationFrame(R), R = 0, me = null;
    }
    function Oe(m) {
      m.pointerId === Y && (ge && m.cancelable && m.preventDefault(), me = m, !R && (R = requestAnimationFrame(() => {
        R = 0;
        const C = me;
        me = null, C && ke(C);
      })));
    }
    function ke(m) {
      if (m.pointerId !== Y || !P && !K) return;
      const C = Math.hypot(m.clientX - W, m.clientY - H);
      if (!ge && C > nd && (ge = !0, y = !0, P ? g.value = P : K && (u.value = K)), !ge) return;
      (D.link || D.folder) && (D.visible = !0, D.x = m.clientX - D.offsetX, D.y = m.clientY - D.offsetY);
      const T = document.elementsFromPoint(m.clientX, m.clientY);
      if (Qn()) {
        const te = T.some(
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
      const J = c.value || rn.value, he = P ? `link-${P}` : `folder-${K}`;
      if (J.length) {
        const te = T.find((se) => {
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
          const se = te.classList.contains("launcher-link"), je = se ? te.getAttribute("data-launcher-id") : null, an = se ? null : te.getAttribute("data-launcher-folder"), so = se ? `link-${je}` : `folder-${an}`, Ot = te.getBoundingClientRect();
          let Bt = !0;
          P && !se && (sd(Ot, m.clientX, m.clientY) ? (Bt = !1, te.classList.add("drop-target")) : te.classList.remove("drop-target"));
          const st = Date.now();
          if (rd(Ot, m.clientX, m.clientY) || (Bt = !1), so === E && st - ee < id && (Bt = !1), Bt) {
            document.querySelectorAll(".launcher-folder.drop-target").forEach((Ze) => Ze.classList.remove("drop-target"));
            const ht = J.findIndex((Ze) => Ze.key === he), mt = J.findIndex((Ze) => Ze.key === so);
            if (ht >= 0 && mt >= 0 && ht !== mt) {
              const Ze = J.slice(), Be = Ze.splice(ht, 1)[0];
              Ze.splice(mt, 0, Be), c.value = Ze, E = so, ee = st;
            }
          }
        }
      }
      const Ee = T.find((te) => te.classList.contains("launcher-page-tab"));
      if (Ee) {
        const te = Ee.getAttribute("data-page");
        te && te !== re.activePage && Ee.classList.add("drop-target");
      } else
        document.querySelectorAll(".launcher-page-tab.drop-target").forEach((te) => te.classList.remove("drop-target"));
    }
    async function Le(m) {
      if (m.pointerId === Y) {
        We(), m.type === "pointercancel" ? $e() : ke(m), window.removeEventListener("pointermove", Oe), window.removeEventListener("pointerup", Le), window.removeEventListener("pointercancel", Le);
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
            const T = C.find((I) => I.classList.contains("launcher-page-tab"));
            if (T) {
              const I = T.getAttribute("data-page");
              if (I) {
                P ? (await oe.moveLinkTo(P, I, "常用网站"), await oe.setPage(I)) : K && await oe.moveFolderToPage(K, I), $e();
                return;
              }
            }
            if (P) {
              const I = C.find((J) => J.classList.contains("launcher-folder"));
              if (I) {
                const J = I.getAttribute("data-launcher-folder");
                if (J) {
                  await oe.moveLinkTo(P, re.activePage, J), $e();
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
          Pe.show({ appName: "常用网站", title: "移动未完成", message: C instanceof Error ? C.message : "请刷新核对，未自动重试。" });
        } finally {
          $e();
        }
      }
    }
    function $e() {
      We(), Y = null, P = null, K = null, ge = !1, y = !1, g.value = null, u.value = null, c.value = null, D.visible = !1, D.link = null, D.folder = null, E = "", document.querySelector("#launcher-folder-dialog")?.classList.remove("drop-hover-valid"), qe.dropHoverValid = !1, window.removeEventListener("pointermove", Oe), window.removeEventListener("pointerup", Le), window.removeEventListener("pointercancel", Le);
    }
    xt(() => {
      Te.setExternalDragHandler(null), Te.setExternalDropHandler(null), $e(), window.removeEventListener("blur", p), window.removeEventListener("pagehide", p), document.removeEventListener("visibilitychange", p), window.removeEventListener("pointermove", Oe), window.removeEventListener("pointerup", Le), window.removeEventListener("pointercancel", Le);
    });
    function Ke(m) {
      const C = re.pageLabels;
      return C && C[m] ? C[m] : m || "常用网站";
    }
    function Je(m, C) {
      const T = String(m.page || "").trim(), I = String(C).trim(), J = re.pageLabels || {}, he = !T || T === "常用网站" || T === "默认";
      if (!I || I === "常用网站" || I === "默认") return he;
      if (he) return !1;
      if (T === I) return !0;
      const te = J[T] || T, se = J[I] || I;
      return te === se || T === se || te === I;
    }
    function He(m) {
      const C = re.groupSizes;
      return C && C[m] === "large" ? "large" : "small";
    }
    function ss(m) {
      return m === "large" ? 9 : 4;
    }
    function rs(m, C) {
      const T = ss(C), I = m.length > T ? T - 1 : T;
      return m.slice(0, I);
    }
    const rn = ae(() => {
      const m = re.activePage || "常用网站", T = re.links.filter(
        (te) => Je(te, m)
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
            pageName: m,
            links: I.get(se) || []
          }
        })));
      });
      const Ee = re.folders;
      return Ee && Object.entries(Ee).forEach(([te, se]) => {
        if (Yo(re.folders, te)) return;
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
    }), Xn = ae(() => c.value && c.value.length ? c.value : rn.value), as = ae(() => {
      const m = re.activePage || "常用网站", C = Ke(m);
      return C === "默认" || m === "常用网站" ? "还没有快捷入口，点击“编辑入口”后添加。" : `“${C}”还是空的，把网站拖到这里。`;
    });
    function Jn(m) {
      c.value = null, g.value = null, u.value = null, Te.switchPage(m);
    }
    function ls() {
      x.value = !0, k.value = "", ft(() => {
        S.value?.focus();
      });
    }
    function Zn() {
      if (!x.value) return;
      const m = k.value.trim();
      x.value = !1, m && Te.addPage(m);
    }
    function cs(m) {
      m.key === "Enter" ? (m.preventDefault(), Zn()) : m.key === "Escape" && (x.value = !1);
    }
    function ds(m, C) {
      Te.openPageMenu(m, C);
    }
    function us(m) {
      const C = m.target;
      if (!C || C.closest(".launcher-link") || C.closest(".launcher-folder") || C.closest(".launcher-page-tab") || C.closest("button") || C.closest("input"))
        return;
      m.preventDefault();
      const T = re.activePage || "常用网站";
      Zt.openBlankMenu(T, m.clientX, m.clientY);
    }
    function ps(m) {
      i.value === "sites" && (!m.shiftKey || re.pages.length < 2 || (m.preventDefault(), m.deltaY > 0 || m.deltaX > 0 ? Te.nextPage() : Te.prevPage()));
    }
    function fs(m) {
      m.target.closest(".launcher-page-tab") || m.stopPropagation();
    }
    function gs(m) {
      m.button === 0 && (w = m.clientX, L = m.clientY);
    }
    function hs(m, C) {
      C.preventDefault(), C.stopPropagation(), Y || (y = !1), !(Math.hypot(C.clientX - w, C.clientY - L) >= 6 || y || Date.now() - $ < 600) && Te.openLink(m, C);
    }
    function ms(m, C) {
      Te.openLinkMenu(m, C);
    }
    function vs(m, C) {
      if (Y || (y = !1), y || Date.now() - $ < 450) {
        C.preventDefault(), C.stopPropagation();
        return;
      }
      Te.openFolder(m, C);
    }
    function ys(m, C, T) {
      Te.openFolderMenu(m, C, T);
    }
    function bs(m) {
      Te.deleteFolder(m);
    }
    function ws(m, C) {
      const T = Array.from(C.dataTransfer?.types || []);
      if (!T.includes("application/x-newtab-launcher") && !T.includes("application/x-newtab-bookmark") && !T.includes("text/uri-list") && !T.includes("text/plain")) return;
      C.preventDefault(), C.dataTransfer && (C.dataTransfer.dropEffect = "move"), re.activePage !== m && Jn(m), C.currentTarget?.classList.add("drop-target");
    }
    function ks(m) {
      m.currentTarget?.classList.remove("drop-target");
    }
    async function _s(m, C) {
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
    function Cs(m) {
      const C = Array.from(m.dataTransfer?.types || []);
      if (!C.includes("application/x-newtab-launcher") && !C.includes("application/x-newtab-bookmark") && !C.includes("text/uri-list") && !C.includes("text/plain")) return;
      m.preventDefault(), m.dataTransfer && (m.dataTransfer.dropEffect = C.includes("application/x-newtab-launcher") ? "move" : "copy"), m.currentTarget?.classList.add("drop-target");
    }
    function xs(m) {
      const C = m.currentTarget;
      C?.contains(m.relatedTarget) || C?.classList.remove("drop-target");
    }
    async function Ls(m) {
      m.currentTarget?.classList.remove("drop-target");
      let T = "";
      const I = m.dataTransfer?.getData("application/x-newtab-launcher");
      if (I)
        try {
          T = String(JSON.parse(I)?.id || "");
        } catch {
        }
      if (!T && (g.value || window.__activeLauncherLink) && (T = String(window.__activeLauncherLink?.id || g.value || "")), T) {
        m.preventDefault(), m.stopPropagation(), await oe.moveLinkTo(T, re.activePage, "常用网站");
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
    function $s(m, C) {
      C.preventDefault();
    }
    function Ts(m) {
      m.preventDefault(), m.dataTransfer && (m.dataTransfer.dropEffect = "move"), m.currentTarget?.classList.add("drop-target");
    }
    function Ss(m) {
      m.currentTarget?.classList.remove("drop-target");
    }
    async function Is(m, C) {
      C.currentTarget?.classList.remove("drop-target"), C.preventDefault(), C.stopPropagation();
      const I = C.dataTransfer?.getData("application/x-newtab-launcher-folder");
      if (I && I !== m) {
        try {
          await oe.moveFolderInto(I, m);
        } catch (Ee) {
          Pe.show({ appName: "常用网站", title: "移动未完成", message: Ee instanceof Error ? Ee.message : "请刷新后核对。" });
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
    return (m, C) => (a(), d(G, null, [
      s(re).showSites ? (a(), d("section", {
        key: 0,
        class: "launcher-group launcher-sites size-large",
        onWheel: ps
      }, [
        n("header", {
          class: "launcher-group-head launcher-sites-head",
          onPointerdown: C[5] || (C[5] = N(() => {
          }, ["stop"])),
          onContextmenu: fs
        }, [
          n("div", xd, [
            n("button", {
              type: "button",
              disabled: r.value,
              "aria-pressed": i.value === "sites",
              onClick: C[0] || (C[0] = (T) => i.value = "sites")
            }, "常用网站", 8, Ld),
            n("button", {
              type: "button",
              disabled: r.value,
              "aria-pressed": i.value === "bookmarks",
              onClick: C[1] || (C[1] = (T) => i.value = "bookmarks")
            }, "书签", 8, $d)
          ]),
          Fe(n("div", Td, [
            (a(!0), d(G, null, fe(s(re).pages, (T) => (a(), d("button", {
              key: T,
              type: "button",
              class: le(["launcher-page-tab", { active: T === s(re).activePage }]),
              "data-page": T,
              role: "tab",
              title: `切换到${Ke(T)}；拖动网站到这里可移动分区；右键管理分区`,
              onPointerdown: C[2] || (C[2] = N(() => {
              }, ["stop"])),
              onClick: N((I) => Jn(T), ["prevent", "stop"]),
              onContextmenu: N((I) => ds(T, I), ["prevent", "stop"]),
              onDragover: (I) => ws(T, I),
              onDragleave: C[3] || (C[3] = (I) => ks(I)),
              onDrop: (I) => _s(T, I)
            }, v(Ke(T)), 43, Sd))), 128)),
            x.value ? Fe((a(), d("input", {
              key: 1,
              ref_key: "pageInputRef",
              ref: S,
              class: "launcher-page-input",
              maxlength: "12",
              placeholder: "例如：游戏区",
              "onUpdate:modelValue": C[4] || (C[4] = (T) => k.value = T),
              onKeydown: cs,
              onBlur: Zn
            }, null, 544)), [
              [eo, k.value]
            ]) : (a(), d("button", {
              key: 0,
              class: "launcher-page-add",
              type: "button",
              title: "添加网站分区，例如游戏区",
              "aria-label": "添加网站分区",
              onClick: ls
            }, " + "))
          ], 512), [
            [to, i.value === "sites"]
          ]),
          i.value === "bookmarks" ? (a(), d("div", Id)) : M("", !0),
          n("button", {
            class: "launcher-page-help",
            type: "button",
            title: "使用指南：如何创建文件夹与整理网站",
            "aria-label": "使用指南与技巧",
            onClick: h
          }, " ? ")
        ], 32),
        i.value === "bookmarks" ? (a(), ce(s(t), {
          key: 0,
          "header-target": "#bookmark-board-header",
          onBusy: C[6] || (C[6] = (T) => r.value = T)
        })) : M("", !0),
        Fe(n("div", {
          class: "launcher-page-panel",
          "data-page": s(re).activePage,
          hidden: !1,
          role: "tabpanel",
          onContextmenu: us,
          onDragover: C[12] || (C[12] = (T) => Cs(T)),
          onDragleave: C[13] || (C[13] = (T) => xs(T)),
          onDrop: C[14] || (C[14] = (T) => Ls(T))
        }, [
          (a(), ce(Vo, {
            tag: "div",
            class: "launcher-items launcher-site-items",
            key: s(re).activePage,
            name: g.value || u.value ? "launcher-grid" : ""
          }, {
            default: Qt(() => [
              (a(!0), d(G, null, fe(Xn.value, (T) => (a(), d(G, {
                key: T.key
              }, [
                T.type === "link" ? (a(), d("a", {
                  key: T.key,
                  class: le(["launcher-link", {
                    "is-dragging": g.value === String(T.link.id)
                  }]),
                  href: T.link.url,
                  title: T.link.title + (T.link.note ? `
📝 ` + T.link.note : "") + `
🔗 ` + T.link.url,
                  "data-launcher-id": String(T.link.id),
                  target: "_blank",
                  rel: "noreferrer",
                  draggable: "false",
                  onDragstart: C[7] || (C[7] = N(() => {
                  }, ["prevent"])),
                  onPointerdown: (I) => B(T.link, I),
                  onMousedown: C[8] || (C[8] = (I) => gs(I)),
                  onClick: N((I) => hs(T.link, I), ["prevent"]),
                  onContextmenu: N((I) => ms(T.link, I), ["prevent"])
                }, [
                  q(ki, {
                    link: T.link
                  }, null, 8, ["link"])
                ], 42, Dd)) : T.type === "folder" ? (a(), d("div", {
                  key: T.key,
                  class: le(["launcher-folder", [
                    `size-${He(T.folder.groupName)}`,
                    { "is-dragging": u.value === T.folder.groupName }
                  ]]),
                  title: `${T.folder.groupName}
可拖动调整位置；右键调整收藏夹大小`,
                  role: "button",
                  tabindex: "0",
                  "data-launcher-folder": String(T.folder.groupName),
                  draggable: "true",
                  onPointerdown: (I) => O(T.folder.groupName, T.folder, I),
                  onDragstart: (I) => $s(T.folder.groupName, I),
                  onDragover: C[10] || (C[10] = (I) => Ts(I)),
                  onDragleave: C[11] || (C[11] = (I) => Ss(I)),
                  onDrop: (I) => Is(T.folder.groupName, I),
                  onClick: (I) => vs(T.folder.groupName, I),
                  onContextmenu: N((I) => ys(T.folder.groupName, T.folder.pageName, I), ["prevent"])
                }, [
                  q(ki, {
                    folder: { title: T.folder.groupName, preview: T.folder.links, count: T.folder.links.length },
                    size: He(T.folder.groupName)
                  }, {
                    default: Qt(() => [
                      n("button", {
                        class: "launcher-folder-del-btn",
                        type: "button",
                        title: `删除文件夹「${T.folder.groupName}」`,
                        "aria-label": "删除文件夹",
                        onPointerdown: C[9] || (C[9] = N(() => {
                        }, ["stop"])),
                        onClick: N((I) => bs(T.folder.groupName), ["stop", "prevent"])
                      }, " ✕ ", 40, Ad)
                    ]),
                    _: 2
                  }, 1032, ["folder", "size"]),
                  n("span", Pd, v(T.folder.links.length), 1)
                ], 42, Ed)) : M("", !0)
              ], 64))), 128)),
              Xn.value.length ? M("", !0) : (a(), d("p", Wd, v(as.value), 1))
            ]),
            _: 1
          }, 8, ["name"]))
        ], 40, Md), [
          [to, i.value === "sites"]
        ])
      ], 32)) : M("", !0),
      s(re).hasTodo || s(re).hasBili ? (a(), d("div", Od, [
        s(re).hasTodo ? (a(), ce(Cd, { key: 0 })) : s(re).hasBili ? (a(), d("div", Bd)) : M("", !0)
      ])) : M("", !0),
      (a(), ce(gt, { to: "body" }, [
        D.visible ? (a(), d("div", {
          key: 0,
          class: le(["launcher-drag-ghost", [
            D.type === "folder" ? `folder-ghost size-${D.folder?.size}` : "link-ghost"
          ]]),
          style: ye({
            left: `${D.x}px`,
            top: `${D.y}px`
          })
        }, [
          D.type === "folder" && D.folder ? (a(), d(G, { key: 0 }, [
            n("div", Rd, [
              (a(!0), d(G, null, fe(rs(D.folder.links, D.folder.size), (T, I) => (a(), ce(Qo, {
                key: T.id || I,
                link: T,
                mini: !0
              }, null, 8, ["link"]))), 128))
            ]),
            n("span", Fd, v(D.folder.groupName), 1)
          ], 64)) : D.link ? (a(), d(G, { key: 1 }, [
            q(Qo, {
              link: D.link
            }, null, 8, ["link"]),
            n("span", Nd, v(D.link.title), 1)
          ], 64)) : M("", !0)
        ], 6)) : M("", !0)
      ])),
      q(s(o), {
        open: l.value,
        onClose: f
      }, null, 8, ["open"])
    ], 64));
  }
}), os = /* @__PURE__ */ Se(Hd, [["__scopeId", "data-v-d1f47c7e"]]), Ko = Object.keys(io);
let Ro = !1, $n = 0, ho, Tn;
function Ci(e) {
  for (const t of Ko)
    Object.prototype.hasOwnProperty.call(e, t) && (io[t] = e[t] !== !1);
}
function jd() {
  const e = io;
  Te.setPrefs(e.showSites, e.showTodo, !e.showTodo && e.showBili), document.body.classList.toggle("hide-weather", !e.showWeather), document.body.classList.toggle("hide-sites", !e.showSites), document.body.classList.toggle("hide-bili", !e.showBili), document.body.classList.toggle("hide-youtube", !e.showYouTube), document.body.classList.toggle("hide-todo", !e.showTodo), document.body.classList.toggle("hide-bookmarks", !e.showBookmarkPanel), e.showBookmarkPanel || en.close();
}
const xi = {
  start() {
    if (Ro) return;
    Ro = !0;
    const e = ++$n;
    Tn = Ue(() => Ko.map((o) => io[o]), jd, { immediate: !0, flush: "sync" });
    const t = globalThis.chrome;
    ho = (o, i) => {
      if (i !== "local") return;
      const r = {};
      for (const l of Ko) o[l] && (r[l] = o[l].newValue);
      Ci(r);
    }, t?.storage?.onChanged?.addListener(ho), t?.storage?.local && t.storage.local.get(Ko).then((o) => {
      Ro && $n === e && Ci(o || {});
    }).catch((o) => console.warn("[HomePrefs] 读取首页设置失败", o));
  },
  stop() {
    Ro = !1, $n++, Tn?.(), Tn = void 0, ho && globalThis.chrome?.storage?.onChanged?.removeListener(ho), ho = void 0;
  }
}, zd = {
  id: "launcher",
  class: "launcher",
  "aria-label": "快捷入口"
}, Gd = { class: "launcher-inner" }, Kd = { class: "launcher-overview" }, Vd = {
  class: "launcher-widget launcher-weather",
  "data-home-module": "weather",
  title: "右键此处可快速切换天气地点"
}, Ud = { id: "weather-body" }, Yd = { class: "launcher-center" }, qd = {
  class: "hero-clock",
  id: "hero-clock"
}, Xd = {
  class: "launcher-widget launcher-task-threads launcher-music-card",
  "data-home-module": "taskThreads"
}, Jd = {
  id: "task-thread-home",
  class: "task-thread-home home-music-body"
}, Zd = /* @__PURE__ */ de({
  __name: "AppLauncher",
  setup(e) {
    Ge(() => {
      Uo.initWallpaper();
    });
    function t() {
      Ie.handleToolClick("music");
    }
    return (o, i) => (a(), d("section", zd, [
      i[5] || (i[5] = n("div", {
        id: "hero-background-media",
        class: "hero-background-media",
        "aria-hidden": "true"
      }, null, -1)),
      n("div", Gd, [
        n("div", Kd, [
          Fe(n("section", Vd, [
            i[1] || (i[1] = n("header", { class: "card-head" }, [
              n("span", {
                class: "bar",
                style: { background: "linear-gradient(180deg,#38bdf8,#818cf8)" }
              }),
              n("h2", { id: "wx-title" }, "天气")
            ], -1)),
            n("div", Ud, [
              q(Qi)
            ])
          ], 512), [
            [to, s(io).showWeather]
          ]),
          n("div", Yd, [
            n("div", qd, [
              q(Cc),
              q(es)
            ]),
            n("form", {
              id: "search",
              class: "search",
              onSubmit: i[0] || (i[0] = N(() => {
              }, ["prevent"]))
            }, [
              q(Si)
            ], 32)
          ]),
          n("section", Xd, [
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
            n("div", Jd, [
              q(ts)
            ])
          ])
        ]),
        n("div", {
          id: "launcher-groups",
          class: le(["launcher-groups", { "has-sites": s(re).showSites, "has-todoist": s(re).hasTodo, "has-bili": s(re).hasBili, "has-media": s(re).hasTodo || s(re).hasBili }])
        }, [
          q(os)
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
function Sn(e) {
  const t = Xe(e);
  if (!t?.lifecycle.canUnmount || t.lifecycle.canUnmount()) return { ok: !0 };
  const o = t.lifecycle.unmountBlockedMessage || "模块操作尚未结束，不能退出或重载。";
  return Pe.show({ appName: t.title, title: "操作进行中", message: o, showActions: !1 }), { ok: !1, error: o };
}
const De = {
  // 检查应用是否处于运行显示状态（驱动 Dock 上的小圆点：关闭即熄灭，不保留 macOS 风格后台悬浮绿点）
  isRunning(e) {
    return this.isVisible(e);
  },
  // 检查应用当前是否在屏幕上可见（窗口是否打开）
  isVisible(e) {
    const t = Xe(e);
    return t ? t.lifecycle.isVisible() : un(e) ? !!dr[e] : ur(e);
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
      Ie.open(e), t.lifecycle.isVisible() && this.markRunning(e);
      return;
    }
    if (this.markRunning(e), un(e)) {
      ni.open(e);
      return;
    }
    Ie.open(e);
  },
  // 隐藏/关闭窗口：立即退出可见运行态并熄灭 Dock 指示绿点
  hideApp(e) {
    if (Jt.delete(e), Xe(e)) {
      Ie.close(e);
      return;
    }
    if (un(e)) {
      ni.close(e);
      return;
    }
    Ie.close(e);
  },
  // 真正的关闭（Quit / 彻底从内存与 DOM 中卸载销毁，熄灭小圆点）
  async quitApp(e) {
    if (Xe(e)) {
      const r = Sn(e);
      if (!r.ok) return r;
      const l = Xe(e)?.lifecycle.beforeQuit;
      if (l) {
        const p = $t(e);
        try {
          await l();
        } catch {
          const k = "后台停止未确认，窗口保留；未自动重试，请检查后台状态。";
          return Pe.show({ appName: Xe(e).title, title: "未退出", message: k, showActions: !1 }), { ok: !1, error: k };
        }
        if ($t(e) !== p) return { ok: !1, error: "窗口已有后续操作，未卸载。" };
        const x = Sn(e);
        if (!x.ok) return x;
      }
      const h = Ie.close(e), f = $t(e);
      return Jt.delete(e), Ye[e] = !1, ct.removeActiveTool(e), await h, await ft(), $t(e) === f ? { ok: !0 } : { ok: !1, error: "模块已有后续操作，退出状态已变化。" };
    }
    this.hideApp(e), Jt.delete(e), ct.removeActiveTool(e), e in Ye && (Ye[e] = !1);
    const t = cr;
    t.activeId === e && (t.activeId = "");
    const o = t.openOrder.indexOf(e);
    o >= 0 && t.openOrder.splice(o, 1);
    const i = t.activeTools.indexOf(e);
    i >= 0 && t.activeTools.splice(i, 1), Ie.render();
  },
  // 重新加载（Reload / 单应用热重启，重新初始化组件）
  async reloadApp(e) {
    const t = Xe(e);
    if (t) {
      if (t.lifecycle.canOpen && !t.lifecycle.canOpen()) return { ok: !1, error: "模块当前不能打开，未重载窗口。" };
      const o = Sn(e);
      if (!o.ok) return o;
      const i = Ie.close(e), r = $t(e);
      return await i, $t(e) !== r ? { ok: !1, error: "模块已有后续操作，重载已取消。" } : (Ye[e] = !1, await ft(), $t(e) !== r ? { ok: !1, error: "模块已有后续操作，未重新打开。" } : (St[e] = (St[e] || 0) + 1, Ie.open(e), t.lifecycle.isVisible() ? (this.markRunning(e), { ok: !0 }) : { ok: !1, error: "模块当前不能打开，未重新显示窗口。" }));
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
    i.mountPolicy === "workspace-ready" && De.markRunning(i.id), Ue(i.lifecycle.isVisible, (x) => {
      x && De.markRunning(i.id);
    }, { immediate: !0, flush: "sync" });
    const r = ae(() => !!Ye[i.id]);
    function l() {
      try {
        i.lifecycle.hide();
      } catch {
      }
      (kt.activeId === i.id || kt.activeId === i.rootId) && (kt.activeId = null), De.hideApp(i.id), typeof document < "u" && document.body.classList.remove("has-card-fullscreen");
    }
    function h() {
      De.reloadApp(i.id);
    }
    function f() {
      typeof window < "u" && window.location.reload();
    }
    const p = z({
      loader: i.loadView,
      onError(x, k, S, g) {
        g <= 2 ? k() : S();
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
              onClick: l
            }, "返回首页")
          ])
        ]) : null
      })
    });
    return no(() => {
      l(), Jt.delete(i.id), delete Ye[i.id];
    }), (x, k) => r.value ? (a(), ce(Di(s(p)), {
      key: s(De).getRenderKey(s(i).id)
    })) : M("", !0);
  }
}), Qd = { class: "logicweaver-workspaces-layer" }, eu = {
  key: 0,
  id: "daily-section",
  class: "wrap"
}, tu = { id: "vue-todoist-root" }, ou = { id: "vue-bili-favorites-root" }, nu = { id: "vue-youtube-root" }, iu = { id: "vue-pricing-root" }, su = { id: "vue-aihot-root" }, ru = /* @__PURE__ */ de({
  __name: "AppWorkspaces",
  setup(e) {
    const t = F(!!kt.activeId);
    return Ge(() => {
      t.value || (typeof window < "u" && "requestIdleCallback" in window ? window.requestIdleCallback(() => {
        t.value = !0;
      }, { timeout: 80 }) : setTimeout(() => {
        t.value = !0;
      }, 40));
    }), (o, i) => (a(), d("div", Qd, [
      t.value ? (a(), d("main", eu, [
        n("div", tu, [
          q(Ht, { id: "todoist" })
        ]),
        n("div", ou, [
          q(Ht, { id: "daily-bilibili" })
        ]),
        Fe(n("div", nu, [
          q(Ht, { id: "daily-youtube" })
        ], 512), [
          [to, s(io).showYouTube]
        ]),
        n("div", iu, [
          q(Ht, { id: "daily-pricing" })
        ]),
        n("div", su, [
          q(Ht, { id: "daily-aihot" })
        ]),
        q(Ht, { id: "card-github" })
      ])) : M("", !0)
    ]));
  }
}), au = ["aria-label"], lu = { class: "dock-menu-head" }, cu = { class: "dock-menu-title" }, du = ["src", "alt"], uu = {
  key: 1,
  class: "dock-menu-emoji"
}, pu = /* @__PURE__ */ de({
  __name: "DockContextMenu",
  props: {
    target: {}
  },
  emits: ["close", "action"],
  setup(e, { emit: t }) {
    const o = e, i = t, r = ae(() => !o.target || o.target.type !== "tool" ? !1 : De.isRunning(o.target.id)), l = ae(() => !o.target || o.target.type !== "tool" ? !1 : De.isVisible(o.target.id)), { menuRef: h, style: f } = Oi({
      visible: () => !!o.target,
      anchor: () => o.target || { x: 0, y: 0 },
      placement: Gt.position === "top" ? "below" : "above",
      align: "center",
      gap: 12,
      dismiss: () => i("close")
    });
    function p() {
      o.target && (De.openApp(o.target.id), i("close"));
    }
    function x() {
      o.target && (De.hideApp(o.target.id), i("close"));
    }
    async function k() {
      o.target && (await De.reloadApp(o.target.id), i("close"));
    }
    async function S() {
      if (!o.target) return;
      const c = o.target;
      if ((await De.quitApp(c.id))?.ok === !1) {
        i("close");
        return;
      }
      Pe.show({
        appName: c.title,
        title: "已退出应用",
        subtitle: "当前页面的应用已请求退出，不代表外部进程或远端任务已停止",
        icon: c.icon || "assets/logo.png",
        duration: 2800
      }), i("close");
    }
    async function g() {
      if (!o.target) return;
      const c = o.target, y = Lo.uninstall(c.id);
      i("close"), await y || Pe.show({
        appName: c.title,
        title: "入口停用未确认",
        subtitle: Lo.state.errorMessage || "请打开模块管理核对当前启用状态",
        icon: c.icon || "assets/logo.png",
        duration: 4e3
      });
    }
    function u() {
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
    return (c, y) => (a(), ce(gt, { to: "body" }, [
      e.target ? (a(), d("div", {
        key: 0,
        ref_key: "menuRef",
        ref: h,
        role: "group",
        "aria-label": `${e.target.title}操作`,
        class: "dock-context-menu",
        style: ye(s(f)),
        onClick: y[1] || (y[1] = N(() => {
        }, ["stop"])),
        onContextmenu: y[2] || (y[2] = N(() => {
        }, ["prevent"]))
      }, [
        n("div", lu, [
          n("div", cu, [
            e.target.icon ? (a(), d("img", {
              key: 0,
              class: "dock-menu-icon",
              src: e.target.icon,
              alt: e.target.title
            }, null, 8, du)) : e.target.emoji ? (a(), d("span", uu, v(e.target.emoji), 1)) : M("", !0),
            n("strong", null, v(e.target.title), 1)
          ]),
          e.target.type === "tool" ? (a(), d("span", {
            key: 0,
            class: le(["dock-status-tag", { "is-running": r.value }])
          }, [
            y[3] || (y[3] = n("span", { class: "dock-status-dot" }, null, -1)),
            Ne(" " + v(r.value ? "运行中" : "未启动"), 1)
          ], 2)) : M("", !0)
        ]),
        y[12] || (y[12] = n("div", { class: "dock-menu-divider" }, null, -1)),
        e.target.type === "tool" ? (a(), d(G, { key: 0 }, [
          l.value ? (a(), d("button", {
            key: 1,
            type: "button",
            class: "dock-menu-item",
            onClick: x
          }, [...y[5] || (y[5] = [
            n("span", { class: "dock-menu-symbol" }, "−", -1),
            n("span", null, "隐藏窗口", -1)
          ])])) : (a(), d("button", {
            key: 0,
            type: "button",
            class: "dock-menu-item",
            onClick: p
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
            onClick: S
          }, [...y[8] || (y[8] = [
            n("span", { class: "dock-menu-symbol" }, "✕", -1),
            n("div", { class: "dock-menu-text" }, [
              n("span", null, "真正的关闭"),
              n("small", null, "退出并释放内存")
            ], -1)
          ])])
        ], 64)) : e.target.type === "card" ? (a(), d("button", {
          key: 1,
          type: "button",
          class: "dock-menu-item",
          onClick: u
        }, [...y[10] || (y[10] = [
          n("span", { class: "dock-menu-symbol" }, "↗", -1),
          n("span", null, "在新标签页打开官网", -1)
        ])])) : (a(), d("button", {
          key: 2,
          type: "button",
          class: "dock-menu-item",
          onClick: y[0] || (y[0] = ($) => i("close"))
        }, [...y[11] || (y[11] = [
          n("span", { class: "dock-menu-symbol" }, "🏠", -1),
          n("span", null, "返回常用主页", -1)
        ])]))
      ], 44, au)) : M("", !0)
    ]));
  }
}), fu = /* @__PURE__ */ Se(pu, [["__scopeId", "data-v-3aa85877"]]), gu = { class: "mac-dock-shelf" }, hu = ["data-dock-target", "title", "onPointerdown", "onClick", "onContextmenu"], mu = ["src", "alt"], vu = {
  key: 0,
  class: "mac-dock-dot",
  "aria-hidden": "true"
}, yu = ["data-dock-tool", "title", "onPointerdown", "onClick", "onContextmenu"], bu = ["src", "alt"], wu = {
  key: 1,
  class: "mac-dock-emoji",
  "aria-hidden": "true"
}, ku = {
  key: 2,
  class: "mac-dock-dot",
  "aria-hidden": "true"
}, _u = {
  key: 3,
  class: "mac-dock-badge"
}, Cu = ["src"], xu = {
  key: 1,
  class: "mac-dock-emoji"
}, Lu = /* @__PURE__ */ de({
  __name: "MacDock",
  setup(e) {
    const t = ae(() => Gt), o = F(null), i = ae(() => Object.fromEntries(Gt.tools.map((W) => {
      const H = Xe(W.id)?.badgeCount?.() || 0;
      return [W.id, Number.isFinite(H) ? Math.max(0, Math.floor(H)) : 0];
    })));
    function r(W) {
      W.stopPropagation(), o.value = null, S(W.currentTarget), Lo.open();
    }
    function l(W, H) {
      H.stopPropagation(), o.value = null, S(H.currentTarget), ct.triggerItem("target", W);
    }
    function h(W, H) {
      const K = H.currentTarget.getBoundingClientRect(), ge = Gt.position, B = ge === "left" || ge === "right";
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
      W.stopPropagation(), o.value = null, S(W.currentTarget), ct.triggerItem("home", "home-launcher");
    }
    function p(W, H) {
      H.stopPropagation(), o.value = null, S(H.currentTarget), Xe(W) || De.markRunning(W), ct.triggerItem("tool", W);
    }
    function x(W, H) {
      const K = H.currentTarget.getBoundingClientRect(), ge = Gt.position, B = ge === "left" || ge === "right";
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
    function S(W) {
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
    const g = F(null), u = we({
      visible: !1,
      x: 0,
      y: 0,
      width: 40,
      height: 40,
      item: null,
      type: "tool"
    }), c = F(null), y = F(null), $ = ae(() => c.value || t.value.cards), w = ae(() => y.value || t.value.tools);
    let L = "", E = 0, ee = !1, ne = 0;
    function A(W, H, P) {
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
      }, window.addEventListener("pointermove", b), window.addEventListener("pointerup", _), window.addEventListener("pointercancel", _);
    }
    function b(W) {
      if (!g.value) return;
      const H = W.clientX - g.value.startX, P = W.clientY - g.value.startY, K = Math.hypot(H, P);
      if (!ee && K > 5 && (ee = !0, u.visible = !0, u.item = g.value.item, u.type = g.value.type, u.width = g.value.width, u.height = g.value.height, g.value.type === "card" ? c.value = [...t.value.cards] : y.value = [...t.value.tools]), !ee) return;
      u.x = W.clientX - u.width / 2, u.y = W.clientY - u.height / 2;
      const B = document.elementsFromPoint(W.clientX, W.clientY).find(
        (ke) => ke.classList.contains("mac-dock-item") && !ke.classList.contains("mac-dock-market-btn")
      );
      if (!B) return;
      const O = B.getAttribute("data-dock-target"), R = B.getAttribute("data-dock-tool"), me = g.value.type, We = g.value.id, Oe = Date.now();
      if (me === "card" && O && O !== We && O !== "home-launcher") {
        const ke = B.getBoundingClientRect(), Le = ke.left + ke.width / 2;
        if (Math.abs(W.clientX - Le) > ke.width * 0.55 || O === L && Oe - E < 180) return;
        const $e = [...c.value || t.value.cards], Ke = $e.findIndex((He) => He.id === We), Je = $e.findIndex((He) => He.id === O);
        if (Ke >= 0 && Je >= 0 && Ke !== Je) {
          const He = $e.splice(Ke, 1)[0];
          $e.splice(Je, 0, He), c.value = $e, L = O, E = Oe;
        }
      } else if (me === "tool" && R && R !== We) {
        const ke = B.getBoundingClientRect(), Le = ke.left + ke.width / 2;
        if (Math.abs(W.clientX - Le) > ke.width * 0.55 || R === L && Oe - E < 180) return;
        const $e = [...y.value || t.value.tools], Ke = $e.findIndex((He) => He.id === We), Je = $e.findIndex((He) => He.id === R);
        if (Ke >= 0 && Je >= 0 && Ke !== Je) {
          const He = $e.splice(Ke, 1)[0];
          $e.splice(Je, 0, He), y.value = $e, L = R, E = Oe;
        }
      }
    }
    function _() {
      window.removeEventListener("pointermove", b), window.removeEventListener("pointerup", _), window.removeEventListener("pointercancel", _), ee && g.value && (ne = Date.now() + 250, g.value.type === "card" && c.value ? ct.reorderCards(c.value.map((W) => W.id)) : g.value.type === "tool" && y.value && ct.reorderTools(y.value.map((W) => W.id))), u.visible = !1, u.item = null, c.value = null, y.value = null, g.value = null, ee = !1, L = "";
    }
    function D(W, H) {
      Date.now() < ne || l(W, H);
    }
    function Y(W, H) {
      Date.now() < ne || p(W, H);
    }
    return no(() => {
      for (const W of k.values()) W.cancel();
      k.clear(), window.removeEventListener("pointermove", b), window.removeEventListener("pointerup", _), window.removeEventListener("pointercancel", _);
    }), (W, H) => (a(), d(G, null, [
      n("div", gu, [
        q(Vo, {
          tag: "div",
          class: "mac-dock-group mac-dock-cards-group",
          name: "dock-item-motion"
        }, {
          default: Qt(() => [
            (a(!0), d(G, null, fe($.value, (P) => (a(), d("button", {
              key: P.id,
              class: le(["mac-dock-item", {
                "is-active": t.value.activeTargetId === P.id,
                "is-drag-origin": g.value && g.value.id === P.id
              }]),
              type: "button",
              "data-dock-target": P.id,
              title: P.title,
              onPointerdown: (K) => A("card", P, K),
              onClick: N((K) => D(P.id, K), ["stop"]),
              onContextmenu: N((K) => h(P, K), ["prevent"])
            }, [
              n("img", {
                class: "mac-dock-icon",
                src: P.icon,
                alt: P.title
              }, null, 8, mu),
              t.value.activeTargetId === P.id ? (a(), d("span", vu)) : M("", !0)
            ], 42, hu))), 128))
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
          onClick: H[0] || (H[0] = N((P) => f(P), ["stop"]))
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
        q(Vo, {
          tag: "div",
          class: "mac-dock-group mac-dock-tools-group",
          name: "dock-item-motion"
        }, {
          default: Qt(() => [
            (a(!0), d(G, null, fe(w.value, (P) => (a(), d("button", {
              key: P.id,
              class: le(["mac-dock-item", {
                "is-active": s(De).isRunning(P.id),
                "is-drag-origin": g.value && g.value.id === P.id
              }]),
              type: "button",
              "data-dock-tool": P.id,
              title: P.title,
              onPointerdown: (K) => A("tool", P, K),
              onClick: N((K) => Y(P.id, K), ["stop"]),
              onContextmenu: N((K) => x(P, K), ["prevent"])
            }, [
              P.icon ? (a(), d("img", {
                key: 0,
                class: "mac-dock-icon",
                src: P.icon,
                alt: P.title
              }, null, 8, bu)) : P.emoji ? (a(), d("span", wu, v(P.emoji), 1)) : M("", !0),
              s(De).isRunning(P.id) ? (a(), d("span", ku)) : M("", !0),
              i.value[P.id] > 0 ? (a(), d("span", _u, v(i.value[P.id] > 99 ? "99+" : i.value[P.id]), 1)) : M("", !0)
            ], 42, yu))), 128))
          ]),
          _: 1
        }),
        n("button", {
          class: le(["mac-dock-item mac-dock-market-btn", { "is-active": s(Lo).state.isOpen }]),
          type: "button",
          title: "模块与全屏插件管理",
          onClick: H[1] || (H[1] = N((P) => r(P), ["stop"]))
        }, [...H[4] || (H[4] = [
          n("span", {
            class: "mac-dock-market-icon",
            "aria-hidden": "true"
          }, "🧩", -1)
        ])], 2)
      ]),
      (a(), ce(gt, { to: "body" }, [
        u.visible && u.item ? (a(), d("div", {
          key: 0,
          class: "mac-dock-drag-ghost",
          style: ye({
            width: u.width + "px",
            height: u.height + "px",
            transform: "translate3d(" + u.x + "px," + u.y + "px, 0)"
          }),
          "aria-hidden": "true"
        }, [
          u.item.icon ? (a(), d("img", {
            key: 0,
            class: "mac-dock-icon",
            src: u.item.icon,
            alt: ""
          }, null, 8, Cu)) : u.item.emoji ? (a(), d("span", xu, v(u.item.emoji), 1)) : M("", !0)
        ], 4)) : M("", !0)
      ])),
      q(fu, {
        target: o.value,
        onClose: H[2] || (H[2] = (P) => o.value = null)
      }, null, 8, ["target"])
    ], 64));
  }
}), ns = /* @__PURE__ */ Se(Lu, [["__scopeId", "data-v-4528a5df"]]), $u = {
  id: "win-toast-container",
  class: "win-toast-container",
  "aria-live": "polite",
  "aria-relevant": "additions"
}, Tu = ["data-toast-fingerprint", "onMouseenter", "onMouseleave"], Su = { class: "win-toast-head" }, Iu = ["src"], Mu = { class: "win-toast-app" }, Du = ["onClick"], Eu = ["onClick"], Au = { class: "win-toast-title" }, Pu = {
  key: 0,
  class: "win-toast-subtitle"
}, Wu = {
  key: 1,
  class: "win-toast-snippet"
}, Ou = {
  key: 0,
  class: "win-toast-actions"
}, Bu = ["onClick"], Ru = ["onClick"], Fu = /* @__PURE__ */ de({
  __name: "NotificationHost",
  setup(e) {
    const t = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), r = F({}), l = F({});
    let h = null;
    function f(c) {
      const y = t.get(c);
      y !== void 0 && clearTimeout(y), t.delete(c);
    }
    function p(c, y = c.duration) {
      f(c.id), i.set(c.id, y), o.set(c.id, Date.now()), l.value[c.id] = !1, r.value[c.id] = Math.max(0, Math.min(100, y / c.duration * 100)), ft(() => requestAnimationFrame(() => {
        r.value[c.id] = 0;
      })), t.set(c.id, window.setTimeout(() => {
        t.delete(c.id), Pe.close(c.id);
      }, y));
    }
    function x(c) {
      f(c.id);
      const y = Date.now() - (o.get(c.id) || Date.now()), $ = Math.max(0, (i.get(c.id) ?? c.duration) - y);
      i.set(c.id, $), l.value[c.id] = !0, r.value[c.id] = Math.max(0, Math.min(100, $ / c.duration * 100));
    }
    function k(c) {
      p(c, Math.max(1500, i.get(c.id) ?? c.duration));
    }
    function S(c) {
      f(c.id), Pe.close(c.id);
    }
    function g(c) {
      if (_t.markRead(c.id), S(c), !c.onClick) {
        c.target && _t.openTarget(c.target);
        return;
      }
      try {
        Promise.resolve(c.onClick()).catch((y) => console.warn("Notification action failed", y));
      } catch (y) {
        console.warn("Notification action failed", y);
      }
    }
    function u(c) {
      const y = Math.max(500, i.get(c.id) ?? c.duration);
      return {
        width: `${r.value[c.id] ?? 100}%`,
        transition: l.value[c.id] ? "none" : `width ${y}ms linear`
      };
    }
    return Ge(() => {
      h = new MutationObserver(() => {
        const y = new Set(So.map(($) => $.id));
        for (const $ of So)
          !$.closing && !t.has($.id) && !i.has($.id) && p($);
        for (const $ of i.keys())
          y.has($) || (f($), i.delete($), o.delete($), delete r.value[$], delete l.value[$]);
      });
      const c = document.getElementById("win-toast-container");
      c && h.observe(c, { childList: !0 });
      for (const y of So) p(y);
    }), no(() => {
      h?.disconnect(), h = null;
      for (const c of t.values()) clearTimeout(c);
      t.clear();
    }), (c, y) => (a(), ce(gt, { to: "body" }, [
      n("div", $u, [
        q(Vo, { name: "win-toast" }, {
          default: Qt(() => [
            (a(!0), d(G, null, fe(s(So), ($) => (a(), d("article", {
              key: $.id,
              class: le(["win-toast-card", [$.appType, { closing: $.closing }]]),
              "data-toast-fingerprint": $.fingerprint,
              onMouseenter: (w) => x($),
              onMouseleave: (w) => k($)
            }, [
              n("header", Su, [
                n("img", {
                  src: $.icon,
                  class: "win-toast-icon",
                  alt: ""
                }, null, 8, Iu),
                n("span", Mu, v($.appName), 1),
                y[0] || (y[0] = n("span", { class: "win-toast-time" }, "刚刚", -1)),
                n("button", {
                  type: "button",
                  class: "win-toast-close",
                  title: "关闭",
                  "aria-label": "关闭通知",
                  onClick: (w) => S($)
                }, "✕", 8, Du)
              ]),
              n("button", {
                type: "button",
                class: "win-toast-body win-toast-body-button",
                onClick: (w) => g($)
              }, [
                n("span", Au, v($.title), 1),
                $.subtitle ? (a(), d("span", Pu, v($.subtitle), 1)) : M("", !0),
                $.message ? (a(), d("span", Wu, v($.message), 1)) : M("", !0)
              ], 8, Eu),
              $.showActions && $.actionLabel ? (a(), d("footer", Ou, [
                n("button", {
                  type: "button",
                  class: "win-toast-btn primary",
                  onClick: (w) => g($)
                }, v($.actionLabel), 9, Bu),
                n("button", {
                  type: "button",
                  class: "win-toast-btn",
                  onClick: (w) => S($)
                }, "关闭", 8, Ru)
              ])) : M("", !0),
              n("div", {
                class: "win-toast-progress",
                style: ye(u($))
              }, null, 4)
            ], 42, Tu))), 128))
          ]),
          _: 1
        })
      ])
    ]));
  }
}), is = /* @__PURE__ */ Se(Fu, [["__scopeId", "data-v-8ecd30bd"]]), Nu = ["id"], Hu = /* @__PURE__ */ de({
  __name: "DockModuleHost",
  setup(e) {
    const t = Wi().filter((o) => o.presentation !== "card").map((o) => {
      Ue(o.lifecycle.isVisible, (r) => {
        r && De.markRunning(o.id);
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
                De.reloadApp(o.id);
              }
            }, "↻ 重试"),
            Re("button", {
              type: "button",
              style: "padding: 5px 10px; border-radius: 6px; border: 1px solid var(--border); background: var(--surface); color: var(--text); cursor: pointer; font-size: 12px;",
              onClick: () => {
                De.hideApp(o.id);
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
          onError(r, l, h, f) {
            f <= 2 ? l() : h();
          },
          errorComponent: i
        })
      };
    });
    return no(() => {
      for (const { definition: o } of t)
        Ie.close(o.id), Jt.delete(o.id), Ye[o.id] = !1;
    }), (o, i) => (a(!0), d(G, null, fe(s(t), (r) => Fe((a(), d("div", {
      id: r.definition.rootId,
      key: r.definition.id
    }, [
      r.mounted.value ? (a(), ce(Di(r.view), {
        key: s(De).getRenderKey(r.definition.id)
      })) : M("", !0)
    ], 8, Nu)), [
      [to, r.definition.lifecycle.isVisible()]
    ])), 128));
  }
}), ju = /* @__PURE__ */ Se(Hu, [["__scopeId", "data-v-3f131313"]]);
function ze(e, t) {
  const o = F(!1);
  return Ue(
    e,
    (i) => {
      i && (o.value = !0);
    },
    { immediate: !0, flush: "sync" }
  ), Ct(o);
}
const zu = ["onKeydown"], Gu = { class: "fo-up-preview-head" }, Ku = ["src"], Vu = { class: "fo-up-preview-meta" }, Uu = { class: "fo-up-preview-name-row" }, Yu = ["href"], qu = ["disabled"], Xu = { class: "fo-up-preview-sign" }, Ju = { class: "fo-up-preview-videos" }, Zu = {
  key: 0,
  class: "fo-up-preview-loading"
}, Qu = {
  key: 1,
  class: "fo-up-preview-empty"
}, ep = {
  key: 2,
  class: "fo-up-preview-empty"
}, tp = ["href", "title", "onClick"], op = ["src"], np = {
  key: 0,
  class: "fo-bili-duration"
}, ip = { class: "fo-up-preview-video-info" }, sp = ["href", "title", "onClick"], rp = { class: "fo-up-preview-video-meta" }, ap = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2394a3b8'%3E%3Cpath d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/%3E%3C/svg%3E", lp = /* @__PURE__ */ de({
  __name: "BiliUpPreview",
  setup(e) {
    const t = F(!1);
    function o() {
      if (!pe.submitting) {
        if (!pe.followed) {
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
    function r(l, h) {
      l.ctrlKey || l.metaKey || (l.preventDefault(), l.stopPropagation(), h.bvid ? (En.openVideo({
        bvid: h.bvid,
        title: h.title,
        cover: h.cover,
        author: pe.name,
        authorFace: pe.face,
        mid: pe.mid,
        url: h.url
      }), i()) : h.url && h.url !== "#" && window.open(h.url, "_blank"));
    }
    return (l, h) => s(pe).open ? (a(), d("div", {
      key: 0,
      class: "fo-up-preview-backdrop",
      onPointerdown: N(i, ["self"])
    }, [
      n("aside", {
        class: "fo-up-preview-popover",
        style: ye({ left: `${s(pe).left}px`, top: `${s(pe).top}px` }),
        onKeydown: Wt(N(i, ["stop", "prevent"]), ["esc"])
      }, [
        n("div", Gu, [
          n("img", {
            class: "fo-up-preview-avatar",
            src: s(pe).face || ap,
            alt: "",
            referrerpolicy: "no-referrer"
          }, null, 8, Ku),
          n("div", Vu, [
            n("div", Uu, [
              n("a", {
                class: "fo-up-preview-name",
                href: `https://space.bilibili.com/${s(pe).mid}`,
                target: "_blank",
                rel: "noreferrer"
              }, v(s(pe).name), 9, Yu),
              n("button", {
                type: "button",
                class: le([
                  s(pe).followed ? "fo-up-preview-unfollow" : "fo-up-preview-follow",
                  { "is-armed": t.value }
                ]),
                disabled: s(pe).submitting,
                onClick: o
              }, v(s(pe).submitting ? "处理中…" : t.value ? "确定取消？" : s(pe).followed ? "取消关注" : "＋ 关注"), 11, qu)
            ]),
            n("p", Xu, v(s(pe).sign || "暂无个人简介"), 1)
          ]),
          n("button", {
            type: "button",
            class: "fo-up-preview-close",
            "aria-label": "关闭预览",
            onClick: i
          }, "✕")
        ]),
        h[1] || (h[1] = n("div", { class: "fo-up-preview-title-tag" }, "近期投稿视频（最新 2~3 个）", -1)),
        n("div", Ju, [
          s(pe).loading ? (a(), d("div", Zu, [...h[0] || (h[0] = [
            n("i", null, null, -1),
            n("span", null, "正在读取近期投稿…", -1)
          ])])) : s(pe).error ? (a(), d("p", Qu, v(s(pe).error), 1)) : s(pe).videos.length ? (a(!0), d(G, { key: 3 }, fe(s(pe).videos, (f) => (a(), d("article", {
            key: f.bvid,
            class: "fo-up-preview-video"
          }, [
            n("a", {
              class: "fo-up-preview-thumb",
              href: f.url,
              title: `就地播放「${f.title}」（Ctrl+点击在网页打开）`,
              onClick: (p) => r(p, f)
            }, [
              n("img", {
                src: f.cover,
                alt: "",
                loading: "lazy",
                referrerpolicy: "no-referrer"
              }, null, 8, op),
              f.duration ? (a(), d("span", np, v(f.duration), 1)) : M("", !0)
            ], 8, tp),
            n("div", ip, [
              n("a", {
                class: "fo-up-preview-video-title",
                href: f.url,
                title: `就地播放「${f.title}」（Ctrl+点击在网页打开）`,
                onClick: (p) => r(p, f)
              }, v(f.title), 9, sp),
              n("div", rp, [
                n("span", null, "▣ " + v(f.playCount), 1),
                n("span", null, v(f.published), 1)
              ])
            ])
          ]))), 128)) : (a(), d("p", ep, "该 UP 主近期暂无视频动态"))
        ])
      ], 44, zu)
    ], 32)) : M("", !0);
  }
}), cp = /* @__PURE__ */ Se(lp, [["__scopeId", "data-v-3fedd7f1"]]), dp = { class: "logicweaver-overlays-layer" }, up = { id: "vue-notification-root" }, pp = {
  id: "bili-profile-menu",
  class: "bili-profile-menu",
  hidden: ""
}, fp = { id: "vue-bili-message-panel-root" }, gp = { id: "vue-notification-center-root" }, hp = { id: "vue-tab-manager-root" }, mp = { id: "vue-bookmark-menu-root" }, vp = { id: "vue-bookmark-panel-root" }, yp = { id: "vue-launcher-dialogs-root" }, bp = { id: "vue-launcher-folder-root" }, wp = { id: "vue-launcher-menus-root" }, kp = { id: "vue-settings-dialog-root" }, _p = { id: "vue-clock-settings-root" }, Cp = { id: "vue-bili-theater-root" }, xp = { id: "vue-bili-mini-player-root" }, Lp = { id: "vue-ai-dialog-root" }, $p = { id: "vue-aihot-viewer-root" }, Tp = { id: "vue-nav-wheel-root" }, Sp = { id: "vue-github-detail-root" }, Ip = { id: "vue-bili-subtitle-modal-root" }, Mp = { id: "vue-firecrawl-modal-root" }, Dp = { id: "vue-floating-image-viewer-root" }, Ep = { id: "vue-command-palette-root" }, Ap = /* @__PURE__ */ de({
  __name: "AppOverlays",
  setup(e) {
    const t = ze(() => Lo.state.isOpen), o = ze(() => Ai.isOpen), i = ze(() => zo.isOpen), r = ze(() => At.state.isOpen), l = ze(() => yr.open), h = ze(() => Co.state.isOpen), f = ze(() => Hs.isOpen), p = ze(() => mr.isOpen), x = ze(() => Yn.state.isOpen), k = ze(() => Ys.isOpen), S = ze(() => Ae.isOpen), g = ze(() => Fn.isOpen);
    let u;
    Ge(() => {
      u = Va();
    }), xt(() => {
      u?.();
    });
    const c = ze(() => zn.state.isOpen), y = ze(() => qe.isOpen), $ = ze(() => Ft.editDialog.isOpen || Ft.iconPicker.isOpen || Ft.linkMove.isOpen || Ft.folderMove.isOpen || Ft.groupMerge.isOpen || Ft.folderDelete.isOpen), w = z(() => import("./ProfileMenu-S1rtO3fU.js")), L = z(() => import("./BookmarkNoteMenu-C9OAO2ZF.js")), E = z(() => import("./BookmarkPanel-CkbynGXf.js")), ee = z(() => import("./ClockSettingsMenu-CN17n6Zw.js")), ne = z(() => import("./NotificationCenter-fMO9Isee.js")), A = z(() => import("./TabManagerPanel-DdSZcynw.js")), b = z(() => import("./LauncherDialogs-DgENn3l3.js")), _ = z(() => import("./LauncherFolderDialog-DzbLowKc.js")), D = z(() => import("./LauncherMenus-ByXYMfz2.js")), Y = z(() => import("./SettingsDialog-PjAOssFw.js")), W = z(() => import("./BiliMiniPlayer-BmaM8Eiv.js")), H = z(() => import("./BiliTheaterDialog--0HwLmGw.js")), P = z(() => import("./BiliMessagePanel-D44tKAfO.js")), K = z(() => import("./AiDialog-BrVTtOuT.js")), ge = z(() => import("./AihotViewer-BEdldf2-.js")), B = z(() => import("./NavWheelOverlay-DH7hCWsU.js")), O = z(() => import("./GitHubRepoDetailDrawer-pAw-ZiPk.js")), R = z(() => import("./InPageSideDrawer-CpEjO58z.js")), me = z(() => import("./BiliSubtitleModal-BtkhgKLt.js")), We = z(() => import("./FirecrawlModal-BdqjT2FL.js")), Oe = z(() => import("./FloatingImageViewer-BNceYhqR.js")), ke = z(() => import("./CommandPalette-CBH-aOwo.js")), Le = z(() => import("./AppPromptModal-BQMu9TVI.js")), $e = z(async () => {
      const [Ke, Je] = await Promise.all([
        import("./PluginMarketDialog-DUyGCA0i.js"),
        import("./plugin-market-B6zN10fA.js")
      ]);
      return Ns("logicweaver-market-styles", Je.default), Ke.default;
    });
    return (Ke, Je) => (a(), d("div", dp, [
      n("div", up, [
        q(is)
      ]),
      n("div", pp, [
        q(s(w))
      ]),
      n("div", fp, [
        s(p) ? (a(), ce(s(P), { key: 0 })) : M("", !0)
      ]),
      n("div", gp, [
        s(o) ? (a(), ce(s(ne), { key: 0 })) : M("", !0)
      ]),
      n("div", hp, [
        s(i) ? (a(), ce(s(A), { key: 0 })) : M("", !0)
      ]),
      n("div", mp, [
        s(c) ? (a(), ce(s(L), { key: 0 })) : M("", !0)
      ]),
      n("div", vp, [
        q(s(E))
      ]),
      n("div", yp, [
        s($) ? (a(), ce(s(b), { key: 0 })) : M("", !0)
      ]),
      n("div", bp, [
        s(y) ? (a(), ce(s(_), { key: 0 })) : M("", !0)
      ]),
      n("div", wp, [
        q(s(D))
      ]),
      n("div", kp, [
        q(s(Y))
      ]),
      n("div", _p, [
        s(r) ? (a(), ce(s(ee), { key: 0 })) : M("", !0)
      ]),
      n("div", Cp, [
        s(h) ? (a(), ce(s(H), { key: 0 })) : M("", !0)
      ]),
      n("div", xp, [
        s(f) ? (a(), ce(s(W), { key: 0 })) : M("", !0)
      ]),
      n("div", Lp, [
        s(x) ? (a(), ce(s(K), { key: 0 })) : M("", !0)
      ]),
      n("div", $p, [
        s(l) ? (a(), ce(s(ge), { key: 0 })) : M("", !0)
      ]),
      n("div", Tp, [
        q(s(B))
      ]),
      q(ju),
      n("div", Sp, [
        s(k) ? (a(), ce(s(O), { key: 0 })) : M("", !0)
      ]),
      n("div", Ip, [
        q(s(me))
      ]),
      n("div", Mp, [
        q(s(We))
      ]),
      n("div", Dp, [
        q(s(Oe))
      ]),
      n("div", Ep, [
        s(S) ? (a(), ce(s(ke), { key: 0 })) : M("", !0)
      ]),
      s(g) ? (a(), ce(s(R), { key: 0 })) : M("", !0),
      q(cp),
      q(s(Le)),
      s(t) ? (a(), ce(s($e), { key: 1 })) : M("", !0)
    ]));
  }
});
let In = !1;
function Pp(e = 1800) {
  if (In || typeof window > "u") return;
  const t = () => {
    if (In) return;
    In = !0;
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
const Wp = ["data-active-workspace"], Op = /* @__PURE__ */ de({
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
      const k = typeof chrome < "u" && chrome.runtime?.getURL ? chrome.runtime.getURL(p) : p;
      if (r === k) return;
      r = k;
      const S = document.querySelectorAll("link[rel*='icon']");
      if (S.length > 0)
        S.forEach((g) => {
          g.type = x, g.href = k;
        });
      else {
        const g = document.createElement("link");
        g.rel = "icon", g.type = x, g.href = k, document.head.appendChild(g);
      }
    }
    function h() {
      if (typeof document > "u") return;
      const p = i[Io.value] || i.home;
      if (l(p.icon, p.iconType), U.playing && U.title) {
        const x = U.artist ? ` - ${U.artist}` : "";
        document.title = `▶ ${U.title}${x}`;
        return;
      }
      if (ao.playing && ao.title) {
        document.title = `▶ ${ao.title} · 电台`;
        return;
      }
      document.title = p.title;
    }
    Ue(
      [
        () => Io.value,
        () => U.playing,
        () => U.title,
        () => U.artist,
        () => ao.playing,
        () => ao.title
      ],
      () => {
        h();
      },
      { immediate: !0 }
    );
    const f = ae(() => Io.value === "home" ? "" : Io.value);
    return Ue(() => kt.activeId, (p) => {
      document.body.classList.toggle("has-card-fullscreen", !!p);
    }, { immediate: !0, flush: "sync" }), Ge(() => {
      typeof document < "u" && (document.body.dataset.spa = "1");
      try {
        Bn.bindGlobalListener(), dt.start(), xi.start(), Rn.init().catch((p) => console.warn("[Launcher] 初始化失败", p)), Pp(), typeof chrome < "u" && chrome?.runtime?.sendMessage && setTimeout(() => {
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
      dt.stop(), Rn.stop(), xi.stop(), document.body.classList.remove("has-card-fullscreen"), typeof document < "u" && o && (document.title = o);
    }), t({
      activeWorkspaceId: f,
      windowManagerController: Ie
    }), (p, x) => (a(), d("div", {
      id: "logicweaver-spa-root",
      class: "logicweaver-spa-root",
      "data-active-workspace": f.value || ""
    }, [
      q(ta),
      q(ol),
      q(Zd),
      q(ru),
      n("nav", {
        id: "mac-dock",
        class: le(["mac-dock", "dock-" + s(Gt).position]),
        "aria-label": "快捷应用栏"
      }, [
        q(ns)
      ], 2),
      q(Ap)
    ], 8, Wp));
  }
}), Bp = /* @__PURE__ */ Se(Op, [["__scopeId", "data-v-5d2f948f"]]), Rp = {
  class: "endfield-stage",
  "aria-hidden": "true"
}, Fp = {
  class: "rhinelab-stage",
  "aria-hidden": "true"
}, Np = { class: "rhine-scaler" }, Hp = { class: "rhine-center-group" }, jp = { class: "rhine-auth-status" }, zp = { class: "rhine-auth-text" }, Gp = ["hidden"], Kp = { class: "rhine-cinema-caption" }, Vp = /* @__PURE__ */ de({
  __name: "IntroAnimation",
  setup(e) {
    const t = F(window.innerHeight), o = F(window.innerWidth), i = F(!1), r = F(!1), l = F(10), h = F(1), f = F(0), p = /* @__PURE__ */ new Set();
    let x = 0, k = () => {
    };
    const S = ae(() => `${String(Math.round(et.renderedProgress)).padStart(2, "0")}%`), g = ae(() => {
      const b = et.renderedProgress / 100 * t.value + 10;
      return `${Math.min(b, Math.max(0, t.value - 102)).toFixed(1)}px`;
    }), u = ae(() => et.renderedProgress >= 75 ? "START PROCESSING..." : et.renderedProgress >= 35 ? "REQUEST RECEIVED" : "ID CONFIRMED : JOYCE MOORE"), c = ae(() => et.finished ? "身份验证通过 · 欢迎进入终端" : et.status ? `身份信息确认 · ${et.status.replace(/^.*?\/\s*/, "")}` : "身份信息确认：JOYCE MOORE"), y = ae(() => String(Math.max(0.35, Math.min(o.value / 1920, t.value / 1080))));
    function $(b, _) {
      const D = window.setTimeout(() => {
        p.delete(D), b();
      }, _);
      p.add(D);
    }
    function w() {
      window.dispatchEvent(new CustomEvent("logicweaver:intro-complete"));
    }
    function L(b) {
      if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
        w();
        return;
      }
      const _ = b ? 180 : 260, D = b ? 200 : 280, Y = performance.now(), W = (H) => {
        const P = H - Y, K = Math.min(1, P / _), ge = 1 - Math.pow(1 - K, 3);
        if (l.value = 10 + ge * Math.max(0, o.value - 10), P > _ && (h.value = Math.max(0, 1 - (P - _) / D)), P >= _ + D) {
          w();
          return;
        }
        x = requestAnimationFrame(W);
      };
      $(() => {
        x = requestAnimationFrame(W);
      }, b ? 60 : 120);
    }
    function E(b) {
      b || (i.value = !0), $(() => {
        r.value = !0, f.value = 6, h.value = 0, $(w, 380);
      }, b ? 40 : 420);
    }
    function ee(b) {
      et.style === "rhinelab" ? E(b) : L(b);
    }
    function ne() {
      o.value = window.innerWidth, t.value = window.innerHeight;
    }
    function A(b) {
      et.finished || (b.key === "Enter" || b.key === " " || b.key === "Escape") && (b.preventDefault(), rt.skip("KEYBOARD SKIP"));
    }
    return Ge(() => {
      document.documentElement.dataset.startupStyle = et.style, document.documentElement.style.setProperty("--rhine-scale", y.value), window.addEventListener("resize", ne, { passive: !0 }), window.addEventListener("keydown", A, !0), k = Dr(ee), ji();
    }), no(() => {
      k(), window.removeEventListener("resize", ne), window.removeEventListener("keydown", A, !0), cancelAnimationFrame(x);
      for (const b of p) clearTimeout(b);
      p.clear();
    }), (b, _) => (a(), d("div", {
      class: "intro-vue-content",
      style: ye({ "--rhine-scale": y.value, opacity: h.value, filter: `blur(${f.value}px)` })
    }, [
      n("div", Rp, [
        _[2] || (_[2] = n("div", { class: "endfield-loader-texture" }, null, -1)),
        _[3] || (_[3] = n("div", { class: "endfield-loader-rail" }, null, -1)),
        n("div", {
          class: "endfield-loader-fill",
          style: ye({ height: `${s(et).renderedProgress}%` })
        }, null, 4),
        n("div", {
          class: "endfield-loader-meter",
          style: ye({ top: g.value })
        }, [
          _[1] || (_[1] = n("span", { class: "endfield-loader-tick" }, null, -1)),
          n("b", null, v(S.value), 1),
          n("small", null, v(s(et).status), 1)
        ], 4),
        _[4] || (_[4] = mo('<section class="endfield-loader-brand"><span class="endfield-loader-kicker">DEEPSEEK HARNESS</span><strong>END</strong><strong>FIELD</strong><span class="endfield-loader-detail"><i class="endfield-loader-chevron"></i><span>EDGE INTELLIGENCE THEME</span><small>TERRA RESEARCH COMMISSION / BOOT SEQUENCE</small><span class="endfield-loader-squares"><i class="on"></i><i class="on"></i><i class="on"></i><i></i><i></i><i></i><i class="on"></i><i class="on"></i><i></i><i></i><i></i><i></i></span></span><em>OVER THE FRONTIER / INTO THE FRONT</em></section>', 1)),
        n("div", {
          class: "endfield-loader-wipe",
          style: ye({ width: `${l.value}px`, opacity: l.value > 10 ? 1 : 0 })
        }, null, 4)
      ]),
      n("div", Fp, [
        _[12] || (_[12] = mo('<div class="rhine-background"><svg viewBox="0 0 1920 1080" preserveAspectRatio="none"><g fill="none" stroke="#ffffff" stroke-width="2.5"><path class="rhine-drift-path1" d="M-210 705C-45 705 182 704 247 567C337 377 99 306 4 435S27 680 169 631C309 584 227 314 279 111S568-113 568-113"></path><path class="rhine-drift-path2" d="M1560-80C1374 114 1671 168 1601 323S1371 367 1431 480S1692 666 1559 787S1329 886 1498 1130"></path><circle class="rhine-drift-circle" cx="1450" cy="648" r="346"></circle><circle class="rhine-drift-circle2" cx="1450" cy="648" r="348"></circle></g></svg></div>', 1)),
        n("div", Np, [
          _[10] || (_[10] = mo('<header class="rhine-brand"><h1>RHINE LAB</h1><div class="rhine-brand-sub">SYNTHESIZE INFORMATION</div><p class="rhine-brand-os"><span class="rhine-brand-analysis"><span style="left:2px;">A</span><span style="left:28px;">N</span><span style="left:55px;">A</span><span style="left:81px;">L</span><span style="left:103px;">Y</span><span style="left:129px;">S</span><span style="left:154px;">I</span><span style="left:166px;">S</span></span><b>OS</b></p></header>', 1)),
          n("button", {
            class: "rhine-skip",
            type: "button",
            title: "点击进入系统 (或按 Enter)",
            onClick: _[0] || (_[0] = (D) => s(rt).skip("ENTER SYSTEM"))
          }, [..._[5] || (_[5] = [
            Ne("ENTER SYSTEM ", -1),
            n("span", null, "↗", -1)
          ])]),
          n("div", Hp, [
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
            n("div", jp, [
              _[6] || (_[6] = n("span", { class: "rhine-auth-dot" }, "·", -1)),
              n("span", zp, v(u.value), 1),
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
          ])], 10, Gp),
          n("div", Kp, v(c.value), 1),
          _[11] || (_[11] = n("div", { class: "rhine-powered" }, [
            Ne("POWERED BY "),
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
}), Up = /* @__PURE__ */ de({
  __name: "ProfileMenu",
  setup(e) {
    function t(o) {
      To.trigger(o);
    }
    return (o, i) => (a(), d(G, null, [
      n("button", {
        type: "button",
        "data-action": "messages",
        onClick: i[0] || (i[0] = N((r) => t("messages"), ["stop"]))
      }, " 通知中心 "),
      n("button", {
        type: "button",
        "data-action": "tabs",
        onClick: i[1] || (i[1] = N((r) => t("tabs"), ["stop"]))
      }, "标签页管理"),
      n("button", {
        type: "button",
        "data-action": "refresh",
        onClick: i[2] || (i[2] = N((r) => t("refresh"), ["stop"]))
      }, " 刷新 B站账号信息 "),
      n("button", {
        type: "button",
        "data-action": "switch",
        onClick: i[3] || (i[3] = N((r) => t("switch"), ["stop"]))
      }, " 切换用户（打开 B站） "),
      n("button", {
        type: "button",
        "data-action": "web",
        onClick: i[4] || (i[4] = N((r) => t("web"), ["stop"]))
      }, " 打开 B站个人中心 ")
    ], 64));
  }
}), Yp = /* @__PURE__ */ de({
  __name: "WorkspaceLaunchers",
  setup(e) {
    function t(o) {
      Un.openWorkspace(o, !0);
    }
    return (o, i) => (a(), d(G, null, [
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
}), qp = {
  key: 0,
  "aria-label": "AI 分析任务"
}, Xp = { role: "status" }, Jp = ["disabled"], Zp = ["disabled"], Qp = /* @__PURE__ */ de({
  __name: "GitHubStatus",
  setup(e) {
    return (t, o) => s(Qe).message || s(Qe).busy ? (a(), d("section", qp, [
      n("p", Xp, v(s(Qe).repo ? `原任务仓库：${s(Qe).repo}。 ` : "") + v(s(Qe).message), 1),
      s(Qe).busy ? (a(), d("button", {
        key: 0,
        type: "button",
        onClick: o[0] || (o[0] = (i) => s(nt).stopAiAnalysis())
      }, "停止后续分析 / 中断等待")) : M("", !0),
      s(Qe).uncertain ? (a(), d(G, { key: 1 }, [
        o[5] || (o[5] = n("p", null, "AI 结果未确认，已阻止本页再次提交。请到供应商核对请求和计费；本页记录在整页关闭或重载后会丢失。", -1)),
        s(Qe).unlockConfirmation ? (a(), d(G, { key: 1 }, [
          o[4] || (o[4] = n("p", null, "扩展不能验证供应商任务；确认只解除本页限制，不代表成功，也不会重发请求。", -1)),
          n("button", {
            type: "button",
            disabled: s(Qe).busy,
            onClick: o[2] || (o[2] = (i) => s(nt).acknowledgeAiChecked())
          }, "确认解除本页限制", 8, Zp),
          n("button", {
            type: "button",
            onClick: o[3] || (o[3] = (i) => s(Qe).unlockConfirmation = !1)
          }, "保持限制")
        ], 64)) : (a(), d("button", {
          key: 0,
          type: "button",
          disabled: s(Qe).busy,
          onClick: o[1] || (o[1] = (i) => s(Qe).unlockConfirmation = !0)
        }, "我已核对供应商记录", 8, Jp))
      ], 64)) : M("", !0)
    ])) : M("", !0);
  }
}), ef = {
  key: 0,
  role: "status",
  style: { "font-size": "12px", color: "var(--danger,#ef4444)", padding: "4px 8px", margin: "0 0 6px 0", "border-radius": "6px", background: "var(--surface)" }
}, tf = {
  key: 0,
  class: "gh-sidebar-divider"
}, of = {
  key: 1,
  class: "gh-sidebar-caption"
}, nf = ["data-folder", "onClick", "onDragover", "onDragleave", "onDrop"], sf = {
  class: "gh-folder-icon-wrap",
  style: { "font-size": "13px", display: "grid", "place-items": "center" }
}, rf = { key: 0 }, af = { key: 1 }, lf = {
  key: 2,
  class: "fo-folder-icon",
  style: { color: "currentColor" }
}, cf = ["title"], df = { class: "gh-folder-count" }, uf = ["data-del", "onClick", "onKeydown"], pf = /* @__PURE__ */ de({
  __name: "GitHubFolders",
  props: {
    active: { type: Boolean, default: !0 }
  },
  setup(e) {
    const t = e, o = F(""), i = () => {
      o.value = "";
    };
    function r(x) {
      return t.active && !bt.busy && vo.folders.some((k) => k.title === x && (k.kind === "custom" || k.kind === "uncategorized"));
    }
    Ue(() => t.active, (x) => {
      i(), window.removeEventListener("dragend", i), window.removeEventListener("drop", i), x && (window.addEventListener("dragend", i), window.addEventListener("drop", i));
    }, { immediate: !0 }), no(() => {
      window.removeEventListener("dragend", i), window.removeEventListener("drop", i);
    });
    function l(x, k) {
      x.stopPropagation(), Mt.delete(k);
    }
    function h(x, k) {
      if (!r(k) || !Array.from(x.dataTransfer?.types || []).includes(qs)) {
        i();
        return;
      }
      x.preventDefault(), x.dataTransfer && (x.dataTransfer.dropEffect = "move"), o.value = k;
    }
    function f(x, k) {
      const S = x.currentTarget;
      S instanceof Node && x.relatedTarget instanceof Node && S.contains(x.relatedTarget) || o.value === k && (o.value = "");
    }
    function p(x, k) {
      if (i(), !r(k)) return;
      const S = Xs(x.dataTransfer);
      S && (x.preventDefault(), x.stopPropagation(), Mt.dropRepository(S, k));
    }
    return (x, k) => (a(), d(G, null, [
      s(bt).message ? (a(), d("p", ef, v(s(bt).message), 1)) : M("", !0),
      (a(!0), d(G, null, fe(s(vo).folders, (S, g) => (a(), d(G, {
        key: S.title
      }, [
        S.kind === "custom" && s(vo).folders[g - 1]?.kind !== "custom" ? (a(), d("div", tf)) : M("", !0),
        S.kind === "custom" && s(vo).folders[g - 1]?.kind !== "custom" ? (a(), d("div", of, "GitHub 列表 (Lists)")) : M("", !0),
        n("button", {
          type: "button",
          class: le(["gh-bili-folder", { on: S.active, "drag-into": o.value === S.title }]),
          "data-folder": S.title,
          onClick: (u) => s(Mt).select(S.title),
          onDragover: (u) => h(u, S.title),
          onDragleave: (u) => f(u, S.title),
          onDrop: (u) => p(u, S.title)
        }, [
          n("span", sf, [
            S.kind === "all" ? (a(), d("span", rf, "⭐")) : S.kind === "uncategorized" ? (a(), d("span", af, "📄")) : (a(), d("i", lf))
          ]),
          n("span", {
            class: "gh-folder-name",
            title: S.title
          }, v(S.title), 9, cf),
          n("small", df, v(S.count), 1),
          S.kind === "custom" ? (a(), d("span", {
            key: 0,
            class: "gh-folder-delete",
            title: "删除 GitHub 列表",
            "data-del": S.title,
            role: "button",
            tabindex: "0",
            onClick: (u) => l(u, S.title),
            onKeydown: [
              Wt(N((u) => s(Mt).delete(S.title), ["prevent", "stop"]), ["enter"]),
              Wt(N((u) => s(Mt).delete(S.title), ["prevent", "stop"]), ["space"])
            ]
          }, "✕", 40, uf)) : M("", !0)
        ], 42, nf)
      ], 64))), 128))
    ], 64));
  }
}), ff = {
  id: "gh-hero-cover",
  class: "gh-bili-cover"
}, gf = { key: 0 }, hf = { key: 1 }, mf = {
  key: 2,
  class: "fo-folder-icon"
}, vf = { class: "gh-bili-heading" }, yf = { class: "gh-hero-title-row" }, bf = ["title"], wf = ["role", "aria-live"], kf = ["title"], _f = { id: "gh-hero-desc" }, Cf = { class: "gh-bili-actions" }, xf = { class: "gh-batch-btn-text" }, Lf = /* @__PURE__ */ de({
  __name: "GitHubHero",
  emits: ["open-ai-settings"],
  setup(e, { emit: t }) {
    return (o, i) => (a(), d(G, null, [
      n("div", ff, [
        s(Lt).kind === "all" ? (a(), d("span", gf, "⭐")) : s(Lt).kind === "uncategorized" ? (a(), d("span", hf, "📄")) : (a(), d("i", mf))
      ]),
      n("div", vf, [
        n("div", yf, [
          n("h3", {
            id: "gh-hero-title",
            title: s(Lt).title
          }, v(s(Lt).title), 9, bf),
          s(It).actionText ? (a(), d("div", {
            key: 0,
            class: le(["gh-hero-inline-status", { "is-error": s(It).actionError }]),
            role: s(It).actionError ? "alert" : "status",
            "aria-live": s(It).actionError ? "assertive" : "polite",
            "aria-atomic": "true"
          }, [
            n("span", {
              class: "gh-hero-status-text",
              title: s(It).actionText
            }, v(s(It).actionText), 9, kf),
            n("button", {
              type: "button",
              title: "关闭提示",
              "aria-label": "关闭状态提示",
              onClick: i[0] || (i[0] = (r) => s(Gn).update({ actionText: "", actionError: !1 }))
            }, "×")
          ], 10, wf)) : M("", !0)
        ]),
        n("p", _f, v(s(Lt).description), 1)
      ]),
      n("div", Cf, [
        n("button", {
          id: "gh-batch-toggle-btn",
          type: "button",
          class: le(["gh-hero-btn gh-batch-toggle-btn", { active: s(Lt).batchMode }]),
          title: "批量多选操作",
          onClick: i[1] || (i[1] = (r) => s(wo).toggleBatch())
        }, [
          i[4] || (i[4] = n("span", { class: "gh-batch-btn-icon" }, "☑", -1)),
          n("span", xf, v(s(Lt).batchMode ? "返回" : "批量操作"), 1)
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
}), $f = /* @__PURE__ */ Se(Lf, [["__scopeId", "data-v-d116f39c"]]), Q = we({ repo: "", text: "", baseline: "", busy: !1, message: "", storedValue: null });
function Li(e, t = !1) {
  if (!e || Q.busy) return;
  if (Q.repo && Q.text !== Q.baseline) {
    Q.message = "请先保存或明确取消当前草稿，再编辑或清除其它备注。";
    return;
  }
  const o = nt.remarks[e]?.userRemark, i = typeof o == "string" ? o : "";
  Object.assign(Q, {
    repo: e,
    baseline: i,
    text: t ? "" : i,
    storedValue: null,
    message: t ? "清除已准备；点击保存才会清除手写备注，AI 简介不变。" : "仅点击保存或 Enter 才写入；草稿只保留在本页内存。"
  });
}
function Mn() {
  Q.busy || Object.assign(Q, { repo: "", text: "", baseline: "", storedValue: null, message: "" });
}
async function Dn() {
  if (Q.busy || !Q.repo) return;
  const { repo: e, text: t, baseline: o } = Q;
  Q.busy = !0;
  try {
    await nt.updateRepoRemark(e, { userRemark: t.trim() }, o), Object.assign(Q, { repo: "", text: "", baseline: "", storedValue: null, message: `${e} 的备注已保存并回读核对。` });
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
    const o = (await nt.reloadRepoRemarks())[e]?.userRemark;
    if (o !== void 0 && typeof o != "string") throw new Error("保存值格式异常，未变更草稿或覆盖基准。");
    Q.storedValue = o ?? "", Q.baseline = o ?? "", Q.message = "已读取保存值，草稿没有替换。请对比下方保存值；再次点击保存将以草稿替换它。";
  } catch (t) {
    Q.message = t instanceof Error ? t.message : "读取失败，草稿保留。";
  } finally {
    Q.busy = !1;
  }
}
const Tf = ["disabled"], Sf = ["disabled"], If = ["disabled"], Mf = ["disabled"], Df = {
  key: 0,
  style: { width: "100%", "white-space": "pre-wrap", "overflow-wrap": "anywhere" }
}, Ti = /* @__PURE__ */ de({
  __name: "GitHubRemarkEditor",
  props: {
    active: { type: Boolean }
  },
  setup(e) {
    const t = e, o = F(null);
    return Ge(() => {
      ft(() => {
        t.active && !Q.busy && o.value?.focus();
      });
    }), (i, r) => (a(), d("div", {
      class: "gh-inline-remark-box",
      style: { "flex-wrap": "wrap", "max-width": "100%" },
      onClick: r[6] || (r[6] = N(() => {
      }, ["stop"]))
    }, [
      Fe(n("input", {
        ref_key: "input",
        ref: o,
        "onUpdate:modelValue": r[0] || (r[0] = (l) => s(Q).text = l),
        class: "gh-inline-remark-input",
        type: "text",
        maxlength: "100",
        "aria-label": "手写仓库备注",
        placeholder: "备注说明…",
        disabled: s(Q).busy || !e.active,
        onKeydown: [
          r[1] || (r[1] = Wt(N((l) => !l.isComposing && e.active && s(Dn)(), ["prevent"]), ["enter"])),
          r[2] || (r[2] = Wt(N((l) => !l.isComposing && e.active && s(Mn)(), ["prevent", "stop"]), ["esc"]))
        ]
      }, null, 40, Tf), [
        [eo, s(Q).text]
      ]),
      n("button", {
        type: "button",
        class: "gh-inline-remark-btn save",
        title: "保存备注",
        disabled: s(Q).busy || !e.active,
        onClick: r[3] || (r[3] = //@ts-ignore
        (...l) => s(Dn) && s(Dn)(...l))
      }, "✓", 8, Sf),
      n("button", {
        type: "button",
        class: "gh-inline-remark-btn cancel",
        title: "取消草稿",
        disabled: s(Q).busy || !e.active,
        onClick: r[4] || (r[4] = //@ts-ignore
        (...l) => s(Mn) && s(Mn)(...l))
      }, "✕", 8, If),
      n("button", {
        type: "button",
        disabled: s(Q).busy || !e.active,
        onClick: r[5] || (r[5] = //@ts-ignore
        (...l) => s($i) && s($i)(...l))
      }, "读取已保存值", 8, Mf),
      s(Q).storedValue !== null ? (a(), d("p", Df, "已保存值：" + v(s(Q).storedValue || "（空）"), 1)) : M("", !0)
    ]));
  }
}), Ef = {
  key: 0,
  role: "status"
}, Af = {
  key: 1,
  "aria-label": "未显示仓库的备注草稿"
}, Pf = {
  key: 2,
  class: "gh-search-options",
  style: { margin: "0 0 10px" }
}, Wf = { style: { "font-size": "12px", color: "var(--dim)" } }, Of = {
  key: 3,
  class: "gh-repos-loading"
}, Bf = {
  key: 4,
  class: "muted small",
  style: { "text-align": "center", padding: "40px 0", "font-size": "13px" }
}, Rf = ["data-repo-name", "onClick", "onContextmenu", "onDragstart"], Ff = ["onClick"], Nf = { class: "gh-card-head" }, Hf = ["checked", "onChange"], jf = ["src"], zf = ["href", "title"], Gf = { class: "owner" }, Kf = { class: "gh-card-body" }, Vf = { class: "gh-card-badges" }, Uf = ["title", "onClick"], Yf = ["onClick"], qf = ["title", "onClick"], Xf = { class: "gh-badge-remark-text" }, Jf = {
  key: 0,
  class: "desc gh-desc-analyzing",
  title: "正在使用 AI 分析仓库…"
}, Zf = {
  key: 1,
  class: "desc gh-desc-ai",
  title: "AI 中文简介（点击可直接修改，右键可重新分析）"
}, Qf = ["title"], eg = {
  key: 3,
  class: "desc dim"
}, tg = { class: "meta" }, og = { class: "gh-stars" }, ng = {
  key: 0,
  class: "gh-lang"
}, ig = {
  key: 1,
  class: "gh-updated"
}, sg = {
  key: 6,
  class: "gh-pager"
}, rg = ["disabled"], ag = { class: "gh-page-info" }, lg = ["disabled"], cg = ["onClick"], dg = /* @__PURE__ */ de({
  __name: "GitHubRepositories",
  props: {
    active: { type: Boolean, default: !0 }
  },
  setup(e) {
    const t = e, o = ae(() => !!Q.repo && !_e.cards.some((A) => A.fullName === Q.repo)), i = we({
      visible: !1,
      x: 0,
      y: 0,
      fullName: "",
      folders: [],
      hasRemark: !1,
      url: ""
    }), r = F(null), l = F(!1);
    function h(A, b) {
      const _ = A.target;
      if (_ instanceof Element) {
        if (_e.batchMode) {
          if (_.closest(".fo-card-more,.gh-badge-folder,.gh-badge-remark,.gh-inline-remark-box")) return;
          A.preventDefault(), A.stopPropagation(), yt.toggleSelection(b.fullName);
          return;
        }
        _.closest("a,button,.gh-badge-folder,.gh-badge-remark,.fo-card-more,.gh-card-hole,.gh-card-checkbox,.gh-inline-remark-box") || (A.preventDefault(), A.stopPropagation(), Js.open(b.fullName, void 0, b));
      }
    }
    function f(A, b) {
      if (!t.active) return;
      A.preventDefault(), A.stopPropagation();
      const _ = 12, D = 160, Y = 280, W = Math.min(window.innerWidth - D - _, Math.max(_, A.clientX)), H = Math.min(window.innerHeight - Y - _, Math.max(_, A.clientY));
      i.x = W, i.y = H, i.fullName = b.fullName, i.folders = [...b.folders || (b.folder ? [b.folder] : [])], i.hasRemark = !!b.customRemark, i.url = b.url, i.visible = !0, r.value = null, l.value = W > window.innerWidth - 380;
    }
    function p(A, b) {
      f(b, A), r.value = "folder";
    }
    function x() {
      i.visible = !1, r.value = null;
    }
    function k(A) {
      i.folders.includes(A) ? i.folders = i.folders.filter((b) => b !== A) : i.folders.push(A), nt.toggleRepoList(i.fullName, A);
    }
    function S() {
      i.folders = [], nt.clearRepoLists(i.fullName), x();
    }
    function g(A) {
      if (!t.active) return;
      const b = typeof A == "string" ? A : A?.fullName || i.fullName;
      x(), Li(b);
    }
    function u() {
      if (!t.active) return;
      const A = i.fullName;
      x(), Li(A, !0);
    }
    async function c() {
      const A = i.url;
      if (x(), A && t.active)
        try {
          await navigator.clipboard.writeText(A);
        } catch {
        }
    }
    function y(A) {
      const b = nt.findRepository(i.fullName);
      x(), b && js.sendGitHubShare({
        fullName: b.full_name,
        name: b.name,
        owner: b.owner?.login,
        ownerAvatar: b.owner?.avatar_url,
        desc: b.description || void 0,
        language: b.language || void 0,
        stars: b.stargazers_count,
        category: i.folders && i.folders.length ? i.folders.join(", ") : "未分类",
        url: b.html_url || `https://github.com/${b.full_name}`,
        updatedAt: b.updated_at ? b.updated_at.split("T")[0] : void 0
      }, A);
    }
    function $() {
      i.url && window.open(i.url, "_blank", "noreferrer"), x();
    }
    async function w() {
      const A = nt.findRepository(i.fullName);
      if (!A) {
        x();
        return;
      }
      x(), await nt.confirmUnstarRepository(A);
    }
    function L(A) {
      const b = A.target;
      b?.closest(".gh-repo-context-menu") || b?.closest(".gh-inline-remark-box") || x();
    }
    function E(A) {
      A.key === "Escape" && i.visible && x();
    }
    Ue(() => t.active, (A) => {
      window.removeEventListener("pointerdown", L), window.removeEventListener("keydown", E), x(), A && (window.addEventListener("pointerdown", L), window.addEventListener("keydown", E));
    }, { immediate: !0 }), xt(() => {
      window.removeEventListener("pointerdown", L), window.removeEventListener("keydown", E);
    });
    function ee(A, b) {
      const _ = A.target;
      if (_ instanceof Element && _.closest("button,a,input,textarea,select,[contenteditable='true']")) {
        A.preventDefault();
        return;
      }
      yt.startDrag(b, A);
    }
    const ne = ae(() => {
      if (_e.cards.length > 0) return !1;
      const A = It.actionText || "";
      return !!(A.includes("正在读取") || A.includes("正在加载") || A.includes("正在统计") || A.includes("正在同步"));
    });
    return (A, b) => (a(), d(G, null, [
      s(Q).message ? (a(), d("p", Ef, v(s(Q).repo ? `${s(Q).repo}：` : "") + v(s(Q).message), 1)) : M("", !0),
      o.value ? (a(), d("section", Af, [
        n("p", null, "备注草稿：" + v(s(Q).repo) + "（仓库不在当前列表中，草稿仍保留）", 1),
        q(Ti, {
          active: t.active
        }, null, 8, ["active"])
      ])) : M("", !0),
      s(_e).searchMessage ? (a(), d("div", Pf, [
        n("span", Wf, v(s(_e).searchMessage), 1),
        n("button", {
          type: "button",
          class: "gh-tab",
          style: { padding: "2px 8px", "font-size": "11px", "margin-left": "8px" },
          onClick: b[0] || (b[0] = (_) => s(yt).resetSearch())
        }, "清空搜索")
      ])) : M("", !0),
      ne.value ? (a(), d("div", Of, [...b[16] || (b[16] = [
        n("div", {
          class: "gh-spinner",
          "aria-hidden": "true"
        }, null, -1),
        n("span", { class: "gh-loading-label" }, "正在读取 GitHub 仓库列表中…", -1)
      ])])) : s(_e).emptyMessage ? (a(), d("p", Bf, v(s(_e).emptyMessage), 1)) : M("", !0),
      s(_e).cards.length ? (a(), d("div", {
        key: 5,
        class: le(["repos gh-grid", { "gh-batch-active": s(_e).batchMode }])
      }, [
        (a(!0), d(G, null, fe(s(_e).cards, (_) => (a(), d("article", {
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
            onClick: N((D) => f(D, _), ["stop"])
          }, "⋮", 8, Ff),
          n("div", Nf, [
            n("label", {
              class: "gh-card-hole",
              title: "点击勾选此仓库",
              onClick: b[1] || (b[1] = N(() => {
              }, ["stop"]))
            }, [
              n("input", {
                class: "gh-card-checkbox",
                type: "checkbox",
                checked: _.selected,
                onChange: (D) => s(yt).setSelection(_.fullName, D.target.checked)
              }, null, 40, Hf),
              b[17] || (b[17] = n("span", { class: "gh-hole-inner" }, null, -1))
            ]),
            n("img", {
              class: "gh-owner-avatar",
              src: _.avatarUrl || "assets/github-star.svg",
              alt: "",
              loading: "lazy",
              referrerpolicy: "no-referrer",
              onError: b[2] || (b[2] = (D) => D.target.src = "assets/github-star.svg")
            }, null, 40, jf),
            n("a", {
              href: _.url,
              target: "_blank",
              rel: "noreferrer",
              class: "name",
              title: _.fullName
            }, [
              n("span", Gf, v(_.owner) + "/", 1),
              Ne(v(_.name), 1)
            ], 8, zf)
          ]),
          n("div", Kf, [
            n("div", Vf, [
              _.folders && _.folders.length ? (a(!0), d(G, { key: 0 }, fe(_.folders, (D) => (a(), d("span", {
                key: D,
                class: "gh-badge-folder",
                title: `GitHub 列表：${D}（点击管理所属列表）`,
                onClick: N((Y) => p(_, Y), ["stop"])
              }, " 📁 " + v(D), 9, Uf))), 128)) : (a(), d("span", {
                key: 1,
                class: "gh-badge-folder uncat",
                title: "未分类（点击加入 GitHub 列表）",
                onClick: N((D) => p(_, D), ["stop"])
              }, " ＋ 未分类 ", 8, Yf)),
              s(Q).repo === _.fullName ? (a(), ce(Ti, {
                key: 2,
                active: t.active
              }, null, 8, ["active"])) : _.customRemark ? (a(), d("span", {
                key: 3,
                class: "gh-badge-remark",
                title: `备注：${_.customRemark}（点击就地修改）`,
                onClick: N((D) => g(_), ["stop"])
              }, [
                b[18] || (b[18] = n("span", { class: "gh-badge-remark-icon" }, "💬", -1)),
                n("span", Xf, v(_.customRemark), 1)
              ], 8, qf)) : M("", !0)
            ]),
            _.descriptionKind === "analyzing" ? (a(), d("p", Jf, [...b[19] || (b[19] = [
              n("span", { class: "gh-ai-sparkle" }, "✨", -1),
              Ne(" 正在使用 AI 分析仓库并提炼中文介绍…", -1)
            ])])) : _.descriptionKind === "ai" ? (a(), d("p", Zf, [
              b[20] || (b[20] = n("span", { class: "gh-ai-tag-flag" }, "🤖", -1)),
              Ne(v(_.description), 1)
            ])) : _.descriptionKind === "plain" ? (a(), d("p", {
              key: 2,
              class: "desc",
              title: _.description
            }, v(_.description), 9, Qf)) : (a(), d("p", eg, "暂无描述"))
          ]),
          n("div", tg, [
            n("span", og, "★ " + v(_.stars), 1),
            _.language ? (a(), d("span", ng, v(_.language), 1)) : M("", !0),
            _.updated ? (a(), d("span", ig, "更新 " + v(_.updated), 1)) : M("", !0)
          ])
        ], 42, Rf))), 128))
      ], 2)) : M("", !0),
      s(_e).totalPages > 1 ? (a(), d("div", sg, [
        n("button", {
          class: "gh-page-btn",
          type: "button",
          disabled: s(_e).page <= 1,
          onClick: b[3] || (b[3] = (_) => s(yt).changePage(s(_e).page - 1))
        }, "‹ 上一页", 8, rg),
        n("span", ag, v(s(_e).page) + " / " + v(s(_e).totalPages) + " · 共 " + v(s(_e).totalItems) + " 个" + v(s(_e).serverPaged ? ` · 已加载 ${s(_e).loadedItems}` : ""), 1),
        n("button", {
          class: "gh-page-btn",
          type: "button",
          disabled: s(_e).page >= s(_e).totalPages,
          onClick: b[4] || (b[4] = (_) => s(yt).changePage(s(_e).page + 1))
        }, "下一页 ›", 8, lg)
      ])) : M("", !0),
      (a(), ce(gt, { to: "body" }, [
        t.active && i.visible ? (a(), d("div", {
          key: 0,
          class: "fo-cover-context-menu gh-repo-context-menu",
          style: ye({ left: `${i.x}px`, top: `${i.y}px` }),
          onClick: b[14] || (b[14] = N(() => {
          }, ["stop"])),
          onContextmenu: b[15] || (b[15] = N(() => {
          }, ["prevent"]))
        }, [
          n("div", {
            class: le(["gh-menu-has-sub", { "is-active": r.value === "folder" }]),
            onMouseenter: b[6] || (b[6] = (_) => r.value = "folder")
          }, [
            b[21] || (b[21] = n("button", {
              class: "fo-cover-menu-item with-sub-arrow",
              type: "button"
            }, [
              n("span", null, "📁 所属 GitHub 列表"),
              n("span", { class: "sub-arrow" }, "›")
            ], -1)),
            n("div", {
              class: le(["gh-sub-flyout", { "flyout-left": l.value }]),
              onClick: b[5] || (b[5] = N(() => {
              }, ["stop"]))
            }, [
              n("button", {
                class: le(["fo-cover-menu-item", { primary: i.folders.length === 0 }]),
                type: "button",
                onClick: S
              }, v(i.folders.length === 0 ? "✓ " : "  ") + "＋ 设为未分类（清空列表） ", 3),
              (a(!0), d(G, null, fe(s(nt).cats, (_) => (a(), d("button", {
                key: _,
                class: le(["fo-cover-menu-item", { primary: i.folders.includes(_) }]),
                type: "button",
                onClick: (D) => k(_)
              }, v(i.folders.includes(_) ? "✓ " : "  ") + "📁 " + v(_), 11, cg))), 128))
            ], 2)
          ], 34),
          n("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: b[7] || (b[7] = (_) => r.value = null),
            onClick: b[8] || (b[8] = (_) => g())
          }, " ✏️ 编辑备注… ", 32),
          q(_r, {
            label: "💬 发送到聊天室",
            visible: i.visible,
            onOpen: b[9] || (b[9] = (_) => r.value = null),
            onSelect: y
          }, null, 8, ["visible"]),
          i.hasRemark ? (a(), d("button", {
            key: 0,
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: b[10] || (b[10] = (_) => r.value = null),
            onClick: u
          }, " 🗑️ 清除备注 ", 32)) : M("", !0),
          n("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: b[11] || (b[11] = (_) => r.value = null),
            onClick: c
          }, " 📋 复制仓库链接 ", 32),
          n("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: b[12] || (b[12] = (_) => r.value = null),
            onClick: $
          }, " ↗ 在 GitHub 打开 ", 32),
          n("button", {
            class: "fo-cover-menu-item danger",
            type: "button",
            onMouseenter: b[13] || (b[13] = (_) => r.value = null),
            onClick: w
          }, " ⭐ 取消 Star ", 32)
        ], 36)) : M("", !0)
      ]))
    ], 64));
  }
}), ug = /* @__PURE__ */ Se(dg, [["__scopeId", "data-v-048d3839"]]), pg = { class: "gh-batch-bar-left" }, fg = { class: "gh-batch-count-tip" }, gg = { id: "gh-batch-selected-count" }, hg = {
  key: 0,
  "aria-label": "批量归属列表确认"
}, mg = ["disabled"], vg = ["value"], yg = ["disabled"], bg = ["disabled"], wg = { class: "gh-batch-bar-right" }, kg = ["disabled"], _g = ["disabled"], Cg = ["disabled"], xg = /* @__PURE__ */ de({
  __name: "GitHubBatchBar",
  props: {
    active: { type: Boolean, default: !0 }
  },
  setup(e) {
    const t = e, o = Ps(), i = F(null);
    function r() {
      t.active && (o.value = nt.prepareBatchMove(), i.value = null);
    }
    async function l() {
      const h = o.value, f = i.value;
      if (!t.active || !h || f === null || bt.busy) return;
      await h.submit(f) && o.value === h && (o.value = void 0);
    }
    return Ue(() => t.active && Rt.active, (h) => {
      h || (o.value = void 0);
    }), (h, f) => (a(), d(G, null, [
      n("div", pg, [
        n("button", {
          type: "button",
          class: "gh-batch-action-btn",
          id: "gh-batch-select-all-btn",
          onClick: f[0] || (f[0] = (p) => s(ko).toggleSelectAll())
        }, v(s(Rt).allSelected ? "取消全选" : "全选"), 1),
        n("span", fg, [
          f[5] || (f[5] = Ne("已选择 ", -1)),
          n("b", gg, v(s(Rt).selectedCount), 1),
          f[6] || (f[6] = Ne(" 项", -1))
        ])
      ]),
      o.value ? (a(), d("section", hg, [
        n("p", null, "仅操作打开选择器时的 " + v(o.value.names.length) + " 个仓库；后来勾选的仓库不加入。", 1),
        n("details", null, [
          f[7] || (f[7] = n("summary", null, "查看本次仓库清单", -1)),
          n("ul", null, [
            (a(!0), d(G, null, fe(o.value.names, (p) => (a(), d("li", { key: p }, v(p), 1))), 128))
          ])
        ]),
        Fe(n("select", {
          "onUpdate:modelValue": f[1] || (f[1] = (p) => i.value = p),
          "aria-label": "目标列表",
          disabled: s(bt).busy
        }, [
          f[8] || (f[8] = n("option", {
            value: null,
            disabled: ""
          }, "请选择目标列表", -1)),
          f[9] || (f[9] = n("option", { value: "" }, "未分类（清空所选仓库的所有列表所属）", -1)),
          (a(!0), d(G, null, fe(s(vo).folders.filter((p) => p.kind === "custom"), (p) => (a(), d("option", {
            key: p.title,
            value: p.title
          }, v(p.title), 9, vg))), 128))
        ], 8, mg), [
          [Ii, i.value]
        ]),
        n("button", {
          type: "button",
          disabled: !t.active || s(bt).busy || i.value === null,
          onClick: l
        }, "确认加入列表", 8, yg),
        n("button", {
          type: "button",
          disabled: s(bt).busy,
          onClick: f[2] || (f[2] = (p) => o.value = void 0)
        }, "取消", 8, bg)
      ])) : M("", !0),
      n("div", wg, [
        n("button", {
          type: "button",
          class: "gh-batch-action-btn",
          id: "gh-batch-move-btn",
          disabled: !t.active || s(bt).busy || s(Rt).selectedCount === 0,
          title: "固定当前选择，批量加入所选 GitHub 列表",
          onClick: r
        }, " 📁 归入 GitHub 列表 ", 8, kg),
        n("button", {
          type: "button",
          class: "gh-batch-action-btn",
          id: "gh-batch-ai-btn",
          disabled: s(Rt).selectedCount === 0,
          title: "批量使用 AI 生成中文介绍",
          onClick: f[3] || (f[3] = (p) => s(ko).analyzeAi())
        }, " ✨ 批量 AI 分析 ", 8, _g),
        n("button", {
          type: "button",
          class: "gh-batch-action-btn danger",
          id: "gh-batch-unstar-btn",
          disabled: s(Rt).selectedCount === 0,
          title: "从 GitHub 批量取消 Star 收藏",
          onClick: f[4] || (f[4] = (p) => s(ko).unstar())
        }, " 🗑 取消收藏 ", 8, Cg)
      ])
    ], 64));
  }
}), Lg = z(() => import("./GitHubWorkspaceCard-Dsy06lUi.js")), $g = z(() => import("./NotificationCenter-fMO9Isee.js")), Tg = z(() => import("./TabManagerPanel-DdSZcynw.js")), Sg = z(() => import("./BookmarkNoteMenu-C9OAO2ZF.js")), Ig = z(() => import("./BookmarkPanel-CkbynGXf.js")), Mg = z(() => import("./LauncherDialogs-DgENn3l3.js")), Dg = z(() => import("./SettingsDialog-PjAOssFw.js")), Eg = z(() => import("./SettingsView-Bs_vFSjl.js")), Ag = z(() => import("./ClockSettingsMenu-CN17n6Zw.js")), Pg = z(() => import("./BiliTheaterDialog--0HwLmGw.js")), Wg = z(() => import("./BiliMiniPlayer-BmaM8Eiv.js")), Og = z(() => import("./BiliMessagePanel-D44tKAfO.js")), Bg = z(() => import("./ModelPricingCard-_j8gZ256.js")), Rg = z(() => import("./BilibiliWorkspace-B0tMpxeh.js")), Fg = z(() => import("./YouTubeCard-o9eWMycJ.js").then((e) => e.Y)), Ng = z(() => import("./AihotFeed-B251d8jc.js")), Hg = z(() => import("./GitHubTrending-A1_HuzHd.js")), jg = z(() => import("./AiDialog-BrVTtOuT.js")), zg = z(() => import("./AihotViewer-BEdldf2-.js")), Gg = z(() => import("./NavWheelOverlay-DH7hCWsU.js")), Kg = z(() => import("./StandaloneHost-C-4fcJf5.js")), Vg = z(() => import("./LauncherFolderDialog-DzbLowKc.js")), Ug = z(() => import("./LauncherMenus-ByXYMfz2.js"));
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
      const h = l.innerHTML, f = Hn(o);
      f.config.errorHandler = (p, x, k) => {
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
function Yg(e) {
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
      const o = Hn(Vp);
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
  }), ie(e, { id: "spa-app", title: "纯血 SPA 单根调度器", order: 15, root: "vue-spa-root", capabilities: ["ui:spa-root", "workspace:keepalive"] }, Bp), document.getElementById("vue-spa-root") || ie(e, { id: "bili-companions", title: "b站伴随窗口", order: 19, root: "vue-bili-companions-root", capabilities: ["ui:dock-companion"] }, Kg), ie(e, { id: "notifications", title: "通知中心", order: 20, root: "vue-notification-root", capabilities: ["ui:toast", "notification:dedupe"] }, is), ie(e, { id: "profile-menu", title: "头像右键菜单", order: 21, root: "bili-profile-menu", capabilities: ["ui:profile-menu", "profile:actions"] }, Up, To), ie(e, { id: "workspace-launchers", title: "常用工作区启动项", order: 22, root: "workspace-launchers", capabilities: ["ui:workspace-launchers", "workspace:launch"] }, Yp, Un), ie(e, { id: "mac-dock", title: "底部快捷应用 Dock 栏", order: 23, root: "mac-dock", capabilities: ["ui:mac-dock", "dock:navigate"] }, ns, ct), ie(e, { id: "hero-clock", title: "首屏中央时钟", order: 26, root: "hero-clock", capabilities: ["ui:hero-clock", "clock:read"] }, es), ie(e, { id: "search-box", title: "首屏搜索框", order: 27, root: "search", capabilities: ["ui:search-box", "search:actions"] }, Si), ie(e, { id: "home-music", title: "首屏音乐播放器", order: 28, root: "task-thread-home", capabilities: ["ui:home-music", "music:playback"] }, ts, Ve), ie(e, { id: "launcher-groups", title: "常用网站分组架", order: 29, root: "launcher-groups", capabilities: ["ui:launcher-groups", "launcher:navigate"] }, os, Te), ie(e, { id: "weather-widget", title: "首屏天气小部件", order: 39, root: "weather-body", capabilities: ["ui:weather-widget", "weather:read"] }, Qi), ie(e, { id: "github-workspace", title: "GitHub 独立页 Vue 工作台", order: 49, root: "vue-github-workspace-root", capabilities: ["ui:github-workspace"] }, Lg), ie(e, { id: "github-status", title: "GitHub 同步状态", order: 50, root: "vue-github-status-root", capabilities: ["ui:github-status", "github:sync-read"] }, Qp, Gn), ie(e, { id: "github-folders", title: "GitHub 文件夹导航", order: 55, root: "gh-folder-list", capabilities: ["ui:github-folders", "github:categorize-drop"] }, pf, Mt), ie(e, { id: "github-hero", title: "GitHub 分类摘要", order: 56, root: "gh-hero", capabilities: ["ui:github-summary", "github:actions"] }, $f, wo), ie(e, { id: "github-repositories", title: "GitHub 仓库列表", order: 57, root: "vue-github-repositories-root", capabilities: ["ui:github-repositories", "github:repository-actions", "github:paging"] }, ug, yt), ie(e, { id: "github-batch-bar", title: "GitHub Star 批量操作工具栏", order: 58, root: "gh-batch-bar", capabilities: ["ui:github-batch-bar", "github:batch-actions"] }, xg, ko), ie(e, { id: "notification-center", spaOwned: !0, title: "持久通知中心", order: 71, root: "vue-notification-center-root", capabilities: ["ui:notification-history", "notification:read"] }, $g, _t), ie(e, { id: "tab-manager", spaOwned: !0, title: "独立标签页管理", order: 71, root: "vue-tab-manager-root", capabilities: ["ui:tab-manager", "tabs:explicit"] }, Tg, Vi), ie(e, { id: "bookmark-menu", title: "书签上下文操作与备注菜单", order: 72, root: "vue-bookmark-menu-root", capabilities: ["ui:bookmark-menu", "bookmark:edit"] }, Sg, zn), ie(e, { id: "launcher-dialogs", title: "快捷启动器管理弹窗族", order: 73, root: "vue-launcher-dialogs-root", capabilities: ["ui:launcher-dialogs", "launcher:manage"] }, Mg, _o), ie(e, { id: "launcher-folder-dialog", title: "大文件夹展开视窗", order: 74, root: "vue-launcher-folder-root", capabilities: ["ui:launcher-folder", "launcher:folder-dialog"] }, Vg, wt), ie(e, { id: "launcher-menus", title: "启动器快捷上下文菜单族", order: 76, root: "vue-launcher-menus-root", capabilities: ["ui:launcher-menus", "launcher:context-menu"] }, Ug, Zt), ie(e, { id: "bookmark-panel", title: "浏览器书签侧边滑动视窗", order: 77, root: "vue-bookmark-panel-root", capabilities: ["ui:bookmark-panel", "bookmarks:panel"] }, Ig, en), ie(e, { id: "bookmark-folder-strip", spaOwned: !0, title: "顶栏书签快捷文件夹横条", order: 78, root: "vue-bookmark-folder-strip-root", capabilities: ["ui:bookmark-folder-strip", "bookmarks:strip"] }, null, qo), ie(e, { id: "settings-page", title: "独立设置页 Vue 工作台", order: 79, root: "vue-options-root", capabilities: ["ui:settings-page"] }, Eg), ie(e, { id: "settings-dialog", title: "全局设置中心视窗", order: 80, root: "vue-settings-dialog-root", capabilities: ["ui:settings-dialog", "settings:manage"] }, Dg, tn), ie(e, { id: "clock-settings-menu", spaOwned: !0, title: "中央时钟偏好配置菜单", order: 82, root: "vue-clock-settings-root", capabilities: ["ui:clock-settings", "clock:preference-edit"] }, Ag, At), ie(e, { id: "bili-theater-dialog", title: "Bilibili 沉浸剧场与评论区弹窗", order: 85, root: "vue-bili-theater-root", capabilities: ["ui:bili-theater", "bili:playback"] }, Pg, Co), ie(e, { id: "bili-mini-player", title: "Bilibili 悬浮迷你播放器", order: 85, root: "vue-bili-mini-player-root", capabilities: ["ui:bili-mini-player", "bili:playback"] }, Wg), ie(e, { id: "ai-dialog", title: "AI 助手对话框与知识点抽屉", order: 86, root: "vue-ai-dialog-root", capabilities: ["ui:ai-dialog", "ai:chat"] }, jg, Yn), ie(e, { id: "aihot-viewer", spaOwned: !0, title: "AI HOT 资讯文章阅读器", order: 88, root: "vue-aihot-viewer-root", capabilities: ["ui:aihot-viewer", "viewer:aihot"] }, zg, Vn), ie(e, { id: "nav-wheel", title: "辐射状快捷动作轮盘与悬浮球", order: 95, root: "vue-nav-wheel-root", capabilities: ["ui:nav-wheel", "nav:radial-menu"] }, Gg, xe), ie(e, { id: "bili-message-panel", spaOwned: !0, title: "Bilibili 消息与互动通知中心", order: 102, root: "vue-bili-message-panel-root", capabilities: ["ui:bili-message-panel", "bili:messages"] }, Og, Dt), ie(e, { id: "pricing-radar", spaOwned: !0, title: "模型插件 (AI 定价与排行榜)", order: 108, root: "vue-pricing-root", capabilities: ["ui:pricing-radar", "pricing:read"] }, Bg, Fi), ie(e, { id: "bili-favorites", spaOwned: !0, title: "b站插件 Vue 外壳", order: 110, root: "vue-bili-favorites-root", capabilities: ["ui:bili-favorites-shell", "bilibili:favorites"] }, Rg, Bi), ie(e, { id: "youtube-card", spaOwned: !0, title: "YouTube 订阅与探索工作台", order: 111, root: "vue-youtube-root", capabilities: ["ui:youtube-card", "youtube:updates"] }, Fg, Pi), ie(e, { id: "aihot-feed", spaOwned: !0, title: "AI HOT 资讯流全功能聚合看板", order: 112, root: "vue-aihot-root", capabilities: ["ui:aihot-feed", "aihot:aggregate"] }, Ng, Ri), ie(e, { id: "github-trending", spaOwned: !0, title: "GitHub 趋势榜与热门流", order: 114, root: "vue-github-trending-root", capabilities: ["ui:github-trending", "github:trending"] }, Hg, Ui);
}
Ms();
const sn = $r(on);
Jr(on, sn);
Zr(on);
Yg(sn);
jn.loadBookmarks();
(async () => {
  document.getElementById("vue-bili-favorites-root") && !document.getElementById("vue-spa-root") && await import("./bilibili-channel.service-B-i2GOiP.js"), await Mr(), await sn.startEager(), rt.notifyBootReady();
})().catch((e) => console.error("[LogicWeaver] 页面启动失败", e));
window.addEventListener("pagehide", () => {
  sn.stopAll();
}, { once: !0 });
export {
  ri as C,
  ju as D,
  ug as G,
  ki as L,
  nd as T,
  pf as _,
  xg as a,
  $f as b,
  Qp as c,
  Vi as d,
  At as e,
  ai as f,
  Ui as g,
  hh as h,
  be as i,
  Yn as j,
  xe as k,
  Qo as l,
  Vp as m,
  Z as n,
  sd as o,
  rd as p,
  id as q,
  Yp as r,
  Up as s,
  zo as t,
  Zi as u,
  Fn as v,
  Ae as w,
  Ji as x,
  on as y
};
