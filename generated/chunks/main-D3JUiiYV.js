import { l as Un, S as Fi, i as Rs } from "./SearchBox-BVFz_06q.js";
/* empty css                */
import { c as oi, r as $e, a as Rt, w as Ee, b as j, d as he, o as c, e as pe, f as It, u as s, g as p, h as n, i as E, T as Ns, t as u, F as ee, j as be, k as G, l as bt, m as No, n as tt, v as Os, p as ot, q as fo, s as q, x as Bs, y as te, z as Nt, A as go, B as xe, C as de, D as Ye, E as Y, G as St, H as Io, I as Hi, J as Oo, K as Ve, L as vo, M as Ki, N as Fs } from "./vendor-vue-D8gPZiit.js";
import { W as un, t as io, p as Cn, n as Le, a as Fo, b as Wt, h as Qe, m as Lt, c as fi, d as Yn, s as xn, e as gi, f as Hs, g as Ks, i as js, j as zs, C as ji, k as oe, l as zi, o as _o, q as Gi, r as yt, u as Gs, v as yo, w as so, x as Go, y as Vs, z as Us, A as Vo, B as Ys } from "./view-styles-D76pmMV8.js";
import { l as Xs, r as qs, G as Js, a as De, b as vn, c as ni, s as Zs, d as Qs, e as ii, f as pn, g as si, h as Do, i as Ao, j as Et, k as Eo, m as ao, n as Fe, o as mi, p as ea, q as rt, t as et, u as dt, v as Vi, w as Be, x as Ui, R as ta, y as oa, z as Ft, A as jt, B as Ie, C as Zt } from "./search.service-Boal8ceH.js";
import { l as ze, a as Yi, b as Xi, c as ai, d as ue, f as Ct, e as Co } from "./store-Cmd2Crsq.js";
import { c as na, a as ia, t as sa, b as aa, d as ra, e as la, f as ro, g as ca } from "./calendar.service-DCNfvWwV.js";
import { w as Oe, s as ri, P as da, i as hn, D as Ln, a as vi, g as st, p as ua, L as pa, b as Ht, c as ha, d as $n, t as yi, e as fa, f as ga, h as Bo, l as qi } from "./window-manager.store-B8yz4j-E.js";
import { s as yn, a as ma, b as va } from "./stickers.service-DDI7EXIX.js";
import { b as Po, a as ya, c as wa } from "./up-group-manager-store-BClilUjY.js";
import { biliMessagePanelController as zt, biliMessagePanelState as ba } from "./message-panel-store-T5ZVABB9.js";
import { b as Ji, r as ka, a as xo } from "./bili-favorites-store-CAG3hlWK.js";
import { a as li, b as Zi, c as _a } from "./aihot-feed-store-BhbhXdBq.js";
import { p as Qi } from "./pricing-store-NB8GBNHF.js";
import { y as es } from "./youtube-store-CnZHK3Uu.js";
import { R as Ca, u as ci } from "./InlineEditStatus.vue_vue_type_style_index_0_scoped_28642927_lang-HdrLv0sz.js";
import { t as d, c as mt, _ as Pe } from "./_plugin-vue_export-helper-aCvtv1YP.js";
import { f as Gt } from "./fullscreen-cards.store-DwyxiA7W.js";
import { k as xa, m as La } from "./core-utils-DYgSCp9X.js";
import { t as gt } from "./together-listen.store-CY5WlWal.js";
import { A as $a } from "./AppWindowFrame-BUeVsWBT.js";
/* empty css                                                                             */
import { C as Ta } from "./ChatShareMenu-CyOPFzwe.js";
const Sa = /^[a-z][a-z0-9]*(?:[.:-][a-z0-9]+)*$/;
function Ia() {
  const e = /* @__PURE__ */ new Map(), t = /* @__PURE__ */ new Map();
  function o(r) {
    if (!r || !Sa.test(r.id)) throw new TypeError(`Invalid command id: ${r?.id || ""}`);
    if (!r.title?.trim() || !r.category?.trim() || typeof r.run != "function")
      throw new TypeError(`Command ${r.id} requires title, category and run()`);
    if (e.has(r.id)) throw new Error(`Command already registered: ${r.id}`);
    return e.set(r.id, Object.freeze({
      ...r,
      description: r.description || "",
      keywords: Object.freeze([...r.keywords || []]),
      concurrency: r.concurrency || "replace"
    })), () => {
      i(r.id), e.delete(r.id);
    };
  }
  function i(r) {
    const h = t.get(r);
    return h ? (h.abort(), t.delete(r), !0) : !1;
  }
  async function a(r, h, $ = "api") {
    const F = e.get(r);
    if (!F) throw new Error(`Unknown command: ${r}`);
    if (F.enabled && !F.enabled()) return;
    const m = F.concurrency || "replace";
    if (t.has(r)) {
      if (m === "drop") return;
      m === "replace" && i(r);
    }
    const D = new AbortController();
    m !== "parallel" && t.set(r, D);
    try {
      return await F.run(h, { signal: D.signal, source: $ });
    } finally {
      t.get(r) === D && t.delete(r);
    }
  }
  function l(r) {
    return Object.freeze({
      id: r.id,
      title: r.title,
      category: r.category,
      description: r.description || "",
      keywords: Object.freeze([...r.keywords || []]),
      concurrency: r.concurrency || "replace",
      enabled: r.enabled ? !!r.enabled() : !0,
      running: t.has(r.id)
    });
  }
  function g() {
    return Object.freeze([...e.values()].map(l).sort((r, h) => r.category.localeCompare(h.category, "zh") || r.title.localeCompare(h.title, "zh")));
  }
  function f(r, h = 20) {
    const $ = String(r || "").trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
    if (!$.length) return g().slice(0, h);
    const F = [...e.values()].map((m) => {
      const D = l(m), v = D.title.toLocaleLowerCase(), w = `${D.id} ${v} ${D.category} ${D.description} ${D.keywords.join(" ")}`.toLocaleLowerCase();
      if (!$.every((y) => w.includes(y))) return null;
      let S = 0;
      for (const y of $)
        D.id === y ? S += 200 : D.id.startsWith(y) && (S += 120), v === y ? S += 160 : v.startsWith(y) ? S += 100 : v.includes(y) && (S += 60), D.keywords.some((_) => _.toLocaleLowerCase().startsWith(y)) && (S += 40);
      return { item: D, score: S };
    }).filter((m) => !!m);
    return F.sort((m, D) => D.score - m.score || m.item.title.localeCompare(D.item.title, "zh")), Object.freeze(F.slice(0, Math.max(1, h)).map((m) => m.item));
  }
  return Object.freeze({ register: o, execute: a, cancel: i, has: (r) => e.has(r), list: g, search: f });
}
const wn = Ia(), Ma = /^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/;
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
      r(m.id), a.delete(m.id), t.delete(m.id);
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
    }), S = Promise.resolve().then(() => D.mount(w)).then((y) => (i.delete(m), o.set(m, { cleanup: y, controller: v }), y), (y) => {
      throw i.delete(m), a.set(m, y), v.abort(), y;
    });
    return i.set(m, S), S;
  }
  async function r(m) {
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
    const m = typeof document < "u" && !!(document.getElementById("vue-spa-root") || document.getElementById("logicweaver-spa-root")), D = [...t.values()].filter((S) => !(!S.eager || !m && S.roots && S.roots.length > 0 && !S.roots.some((_) => !!document.getElementById(_)))).sort((S, y) => (S.order || 100) - (y.order || 100)), w = (await Promise.allSettled(D.map((S) => f(S.id)))).flatMap((S, y) => S.status === "rejected" ? [{ id: D[y].id, reason: S.reason }] : []);
    w.length && console.warn("LogicWeaver Vue features failed to mount", w);
  }
  async function $() {
    const m = [...o.keys()].reverse();
    await Promise.allSettled(m.map(r));
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
  return Object.freeze({ register: l, start: f, startEager: h, stop: r, stopAll: $, has: (m) => t.has(m), list: F });
}
const Aa = localStorage.getItem("startupAnimationStyle") || localStorage.getItem("logicweaverStartupStyle") || "endfield", wi = (() => {
  try {
    const e = localStorage.getItem("showStartupAnimation"), t = localStorage.getItem("logicweaverEndfieldLoader"), o = e ?? t;
    return o === "1" || o === "true";
  } catch {
    return !1;
  }
})(), ie = $e({
  enabled: wi,
  style: Aa === "rhinelab" ? "rhinelab" : "endfield",
  renderedProgress: 4,
  targetProgress: 4,
  status: "CORE SHELL...",
  finished: !wi,
  exiting: !1,
  forced: !1
});
let mo = 0, fn = 4, ts = performance.now(), Xn = 0, nn = null, qn = !1;
function os(e) {
  const t = e - ts, o = Xn ? Math.min(1, t / Xn) : 1, i = o * o * (3 - 2 * o);
  ie.renderedProgress = fn + (ie.targetProgress - fn) * i, o < 1 && !ie.finished ? mo = requestAnimationFrame(os) : mo = 0;
}
function sn(e, t) {
  if (!ie.enabled || ie.finished) return;
  const o = Math.max(ie.targetProgress, Math.max(4, Math.min(100, Number(e) || 4)));
  t && (ie.status = t), fn = ie.renderedProgress, ie.targetProgress = o, ts = performance.now(), Xn = Math.max(280, Math.min(920, 220 + Math.abs(o - fn) * 7.5)), cancelAnimationFrame(mo), mo = requestAnimationFrame(os);
}
function bn(e = "Ready", t = !1) {
  ie.finished || (ie.finished = !0, ie.forced = t, ie.status = e, ie.targetProgress = 100, cancelAnimationFrame(mo), mo = 0, ie.renderedProgress = 100, nn?.(t));
}
function Ea(e = "KEYBOARD SKIP") {
  bn(e, !0);
}
function Pa() {
  ie.enabled || bn("BOOT COMPLETE", !0);
}
function ns() {
  !ie.enabled || ie.finished || qn || (qn = !0, sn(38, "INITIALIZING CORE SHELL..."), setTimeout(() => {
    ie.finished || sn(76, "SYNTHESIZING RUNTIME...");
  }, 400), setTimeout(() => {
    ie.finished || sn(100, ie.style === "rhinelab" ? "ID CONFIRMED : JOYCE MOORE" : "TERRA LINK READY / 终端就绪");
  }, 900), setTimeout(() => {
    ie.finished || bn("BOOT COMPLETE / 首页就绪", !1);
  }, 1650));
}
async function Wa() {
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
  update: sn,
  finish: bn,
  skip: Ea,
  notifyBootReady: Pa,
  async playIntro(e) {
    if (e?.style && (ie.style = e.style), typeof document < "u" && (document.documentElement.dataset.startupStyle = ie.style, document.documentElement.classList.remove("skip-endfield-loader"), document.body.classList.add("is-starting")), ie.enabled = !0, ie.finished = !1, ie.forced = !!e?.force, ie.renderedProgress = 4, ie.targetProgress = 4, qn = !1, typeof document < "u") {
      let t = document.getElementById("endfield-loader");
      if (!t) {
        t = document.createElement("div"), t.id = "endfield-loader", t.className = "endfield-loader notranslate", document.body.appendChild(t);
        const { default: o } = await import("./IntroAnimation-BwnAZ5C8.js"), i = oi(o), a = () => {
          window.removeEventListener("logicweaver:intro-complete", a), i.unmount(), t?.remove(), document.body.classList.remove("is-starting");
        };
        window.addEventListener("logicweaver:intro-complete", a, { once: !0 }), i.mount(t);
      }
    }
    ns();
  },
  get enabled() {
    return ie.enabled;
  },
  get finished() {
    return ie.finished;
  }
});
function Ra(e) {
  return nn = e, ie.finished && e(ie.forced), () => {
    nn === e && (nn = null);
  };
}
const is = [
  { date: "今天", dayName: "周四", emoji: "🌤️", condition: "多云", highTemp: 26, lowTemp: 18, rainProb: 15 },
  { date: "明天", dayName: "周五", emoji: "⛅", condition: "阴天", highTemp: 24, lowTemp: 17, rainProb: 30 },
  { date: "后天", dayName: "周六", emoji: "🌧️", condition: "小雨", highTemp: 21, lowTemp: 16, rainProb: 75 },
  { date: "周日", dayName: "周日", emoji: "🌦️", condition: "阵雨", highTemp: 23, lowTemp: 15, rainProb: 45 },
  { date: "周一", dayName: "周一", emoji: "☀️", condition: "晴天", highTemp: 27, lowTemp: 18, rainProb: 10 },
  { date: "周二", dayName: "周二", emoji: "🌤️", condition: "多云", highTemp: 28, lowTemp: 19, rainProb: 15 },
  { date: "周三", dayName: "周三", emoji: "☀️", condition: "晴天", highTemp: 29, lowTemp: 20, rainProb: 5 }
], ss = "lw_weather_snapshot_v1";
function Na() {
  if (typeof window > "u" || typeof localStorage > "u") return null;
  try {
    const e = localStorage.getItem(ss);
    if (!e) return null;
    const t = JSON.parse(e);
    if (t && t.data && t.data.currentTemp !== void 0)
      return {
        state: "ready",
        city: t.city || t.data.cityName || "",
        data: t.data,
        forecastDays: Array.isArray(t.forecastDays) && t.forecastDays.length ? t.forecastDays : is,
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
        ss,
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
    forecastDays: e?.forecastDays || is,
    detailInfo: e?.detailInfo || {
      humidity: "62%",
      wind: "东北风 2级",
      uvIndex: "中等 (4)",
      airQuality: "优 (32)"
    }
  };
}, J = $e(Oa());
let Tn = null, Sn = null;
const ut = {
  get snapshot() {
    return Rt(J);
  },
  update(e) {
    Object.assign(J, e), Uo(J);
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
    }), Uo(J);
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
    })) : [], Uo(J);
  },
  setDetailInfo(e) {
    J.detailInfo = { ...e }, Uo(J);
  },
  applyCity(e) {
    typeof window < "u" && window.dispatchEvent(new CustomEvent("logicweaver:weather-city-selected", { detail: { city: e } })), this.refresh();
  },
  refresh() {
    Tn ? Tn() : typeof window < "u" && window.dispatchEvent(new CustomEvent("logicweaver:weather-refresh"));
  },
  changeLocation(e) {
    Sn ? Sn(e) : typeof window < "u" && window.dispatchEvent(new CustomEvent("logicweaver:weather-change-location", { detail: { clientX: e?.clientX, clientY: e?.clientY } }));
  },
  setRefreshAction(e) {
    Tn = e;
  },
  setChangeLocationAction(e) {
    Sn = e;
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
let In = null;
const lo = {
  get snapshot() {
    return Rt(Se);
  },
  update(e) {
    Object.assign(Se, e);
  },
  updateTime(e, t, o, i) {
    Se.timeText = e, Se.secsText = t, Se.greetingText = o, Se.dateText = i, Se.updatedAt = Date.now();
  },
  applyConfig(e) {
    e.fontFamily !== void 0 && (Se.fontFamily = e.fontFamily), e.colorHex !== void 0 && (Se.colorHex = e.colorHex), e.greetColor !== void 0 && (Se.greetColor = e.greetColor), e.dateColor !== void 0 && (Se.dateColor = e.dateColor), e.isBlack !== void 0 && (Se.isBlack = e.isBlack), e.isCustomColor !== void 0 && (Se.isCustomColor = e.isCustomColor), Se.updatedAt = Date.now();
  },
  openSettings(e) {
    In ? In(e) : window.dispatchEvent(new CustomEvent("logicweaver:clock-open-settings", { detail: { clientX: e?.clientX, clientY: e?.clientY } }));
  },
  setOpenSettingsAction(e) {
    In = e;
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
}), Mn = $e(Ha());
let Yo = {};
const di = {
  getSnapshot() {
    return Rt(Mn);
  },
  update(e) {
    Object.assign(Mn, e);
  },
  setMounted(e) {
    Mn.mounted = e;
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
    const i = o.LogicWeaverWindowTabs;
    if (i?.open) {
      i.open(e);
      return;
    }
    const a = document.getElementById(`${e}-top-open`);
    a && !t ? a.click() : window.dispatchEvent(new CustomEvent("logicweaver:open-workspace", { detail: { id: e } }));
  },
  setActions(e) {
    Yo = { ...Yo, ...e };
  }
}, Dn = $e({ visible: !1, pendingWrites: 0 });
async function Ka(e) {
  if (Dn.pendingWrites) throw new Error("壁纸操作正在处理，未自动排队");
  Dn.pendingWrites++;
  try {
    return await e();
  } finally {
    Dn.pendingWrites--;
  }
}
const bi = {
  openDialog() {
    Oe.open("wallpaper");
  },
  closeDialog() {
    Oe.close("wallpaper");
  },
  resetDefault() {
    return Ka(() => un.clearWallpaper());
  }
}, ki = [
  { id: "mono", label: "极简等宽", font: "ui-monospace, 'SF Mono', 'JetBrains Mono', Menlo, Consolas, monospace", sample: "15:50:10" },
  { id: "sans", label: "现代无衬线", font: "-apple-system, BlinkMacSystemFont, 'Segoe UI Variable Display', 'Segoe UI', Roboto, 'PingFang SC', sans-serif", sample: "15:50:10" },
  { id: "din", label: "经典几何", font: "'DIN Alternate', 'DIN Pro', 'Franklin Gothic Medium', Futura, sans-serif", sample: "15:50:10" },
  { id: "digital", label: "数码管等宽", font: "'Courier New', Courier, monospace", sample: "15:50:10" },
  { id: "impact", label: "硬派力量", font: "Impact, 'Arial Black', 'Trebuchet MS', sans-serif", sample: "15:50:10" },
  { id: "serif", label: "典雅衬线", font: "'Playfair Display', Georgia, 'Times New Roman', serif", sample: "15:50:10" },
  { id: "rounded", label: "圆润亲和", font: "'Quicksand', 'Comic Sans MS', 'Segoe UI', sans-serif", sample: "15:50:10" }
], _i = [
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
], Me = $e({
  mounted: !1,
  isOpen: !1,
  x: 200,
  y: 200,
  font: "mono",
  color: "white",
  timezone: "local"
});
let An = null;
const Vt = {
  state: Me,
  setMounted(e) {
    Me.mounted = e;
  },
  onAction(e) {
    An = e;
  },
  dispatch(e, t) {
    if (An)
      return An(e, t);
  },
  open(e) {
    const i = typeof window < "u" ? window.innerWidth : 1280, a = typeof window < "u" ? window.innerHeight : 800, l = e?.clientX ?? e?.x ?? i / 2, g = e?.clientY ?? e?.y ?? a / 2, f = Math.max(12, Math.min(l - 40, i - 290 - 12)), r = Math.max(12, Math.min(g + 10, a - 420 - 12));
    Me.x = f, Me.y = r, Me.isOpen = !0, this.dispatch("open", { x: f, y: r });
  },
  close() {
    Me.isOpen = !1, this.dispatch("close");
  },
  setFont(e) {
    Me.font = e;
    const t = ki.find((o) => o.id === e);
    if (t) {
      lo.applyConfig({ fontFamily: t.font });
      try {
        localStorage.setItem("lw_clock_font", e);
      } catch {
      }
    }
    this.dispatch("change", { font: e, color: Me.color, timezone: Me.timezone });
  },
  setColor(e) {
    Me.color = e;
    const t = _i.find((o) => o.id === e);
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
    this.dispatch("change", { font: Me.font, color: e, timezone: Me.timezone });
  },
  setTimezone(e) {
    Me.timezone = e;
    try {
      localStorage.setItem("lw_clock_tz", e);
    } catch {
    }
    this.dispatch("change", { font: Me.font, color: Me.color, timezone: e });
  },
  initPreferences() {
    try {
      const e = localStorage.getItem("lw_clock_font");
      if (e) {
        Me.font = e;
        const i = ki.find((a) => a.id === e);
        i && lo.applyConfig({ fontFamily: i.font });
      }
      const t = localStorage.getItem("lw_clock_color");
      if (t) {
        Me.color = t;
        const i = _i.find((a) => a.id === t);
        i && lo.applyConfig({ colorHex: i.hex, greetColor: i.hex, dateColor: i.hex, isCustomColor: !0 });
      }
      const o = localStorage.getItem("lw_clock_tz");
      o && (Me.timezone = o);
    } catch {
    }
  },
  syncConfig(e) {
    e.font && (Me.font = e.font), e.color && (Me.color = e.color), e.timezone && (Me.timezone = e.timezone);
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
let En = null, an = !1;
async function rn(e, t = {}) {
  if (e === "poll") return { state: "ready", model: ge.model };
  if (e === "connect") return { state: "ready", model: ge.model };
  throw new Error("旧版 AI 对话桥接已退役，请使用「海狸聊天室」开启智能会话。");
}
function as(e) {
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
async function ja() {
  try {
    const e = await rn("poll");
    as(e);
  } catch {
  }
}
async function za(e, t) {
  if (e === "open" || e === "connect")
    try {
      ge.statusText = "正在连接本机 Codex 与 ChatGPT…";
      const o = await rn("connect");
      as(o);
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
      await rn("send", { text: o }), await ja();
    } catch (i) {
      ge.statusText = i?.message || "发送失败";
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
const ui = {
  state: ge,
  setMounted(e) {
    ge.mounted = e;
  },
  onAction(e) {
    En = e;
  },
  dispatch(e, t) {
    if (En)
      return En(e, t);
    za(e, t);
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
}, Pn = $e({
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
}), Xo = /* @__PURE__ */ new Set(), Ga = {
  state: Pn,
  open(e) {
    Object.assign(Pn, e, { open: !0 });
  },
  update(e) {
    Object.assign(Pn, e);
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
}, ln = $e({ isOpen: !1 }), rs = {
  state: ln,
  open() {
    ln.isOpen = !0;
  },
  close() {
    ln.isOpen = !1;
  }
}, Wn = "biliProfileCacheV1", _t = "biliLocallyKnownMessageIdsV1", qo = "biliMessageUserCacheV1", Lo = "githubKnownReleaseVersionsV1", Jo = "customNewtabAvatar", Ci = "biliToastKnownCountsV1";
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
    !t?.repository || !t?.version || (this.githubKnownVersions[t.repository] = t.version, typeof chrome < "u" && chrome?.storage?.local && await chrome.storage.local.set({ [Lo]: this.githubKnownVersions }), this.notifyGitHubListeners());
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
    if (io.avatarUrl = a, io.userName = t?.uname || "哔哩哔哩用户", io.buttonTitle = "通知中心", Cn.avatarUrl = a, Cn.userName = t?.uname || "用户", Cn.mid = t?.mid, typeof document < "u") {
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
        ]), f = a.status === "fulfilled" ? a.value?.data || {} : {}, r = l.status === "fulfilled" ? l.value?.data || {} : {}, h = g.status === "fulfilled" ? g.value?.data || {} : {}, $ = Number(r.at || 0), F = r.reply != null ? Number(r.reply || 0) : Math.max(0, Number(r.recv_reply || 0) - $), m = {
          reply: Math.max(Number(f.reply || 0), F),
          at: Math.max(Number(f.at || 0), $),
          like: Math.max(
            Number(f.like || f.praise || 0),
            Number(r.like || r.recv_like || 0)
          ),
          system: Math.max(Number(f.sys_msg || f.system || 0), Number(r.sys_msg || 0)),
          private: Number(
            f.chat || r.chat || Number(h.follow_unread || 0) + Number(h.unfollow_unread || 0) + Number(h.dustbin_push_msg || 0)
          )
        };
        this.applyBiliProfile(i, m), typeof chrome < "u" && chrome?.storage?.local && await chrome.storage.local.set({ [Wn]: { profile: i, unread: m, savedAt: Date.now() } }), this.checkAndNotifyBiliInteractions(m);
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
      this.biliToastKnownCounts = { ...o }, typeof chrome < "u" && chrome?.storage?.local && chrome.storage.local.set({ [Ci]: this.biliToastKnownCounts }).catch(() => {
      });
      return;
    }
    const i = o.private - Number(this.biliToastKnownCounts.private || 0);
    o.like - Number(this.biliToastKnownCounts.like || 0);
    const a = o.reply - Number(this.biliToastKnownCounts.reply || 0), l = o.at - Number(this.biliToastKnownCounts.at || 0);
    o.system - Number(this.biliToastKnownCounts.system || 0), this.biliToastKnownCounts = { ...o }, typeof chrome < "u" && chrome?.storage?.local && chrome.storage.local.set({ [Ci]: this.biliToastKnownCounts }).catch(() => {
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
          Wt.open();
        else if (t === "tabs")
          rs.open();
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
      Wn,
      _t,
      qo,
      Lo,
      Jo
    ]).then((t) => {
      this.customAvatar = t[Jo] || "", this.locallyKnownIds = t[_t] && typeof t[_t] == "object" ? t[_t] : {}, this.userCache = t[qo] && typeof t[qo] == "object" ? t[qo] : {}, this.githubKnownVersions = t[Lo] && typeof t[Lo] == "object" ? t[Lo] : {};
      const o = t[Wn];
      o?.profile ? this.applyBiliProfile(o.profile, o.unread || {}) : this.applyBiliProfile(null, {});
    }).catch(() => {
    }), chrome.storage.onChanged && chrome.storage.onChanged.addListener((t, o) => {
      o === "local" && (t[Jo] && (this.customAvatar = t[Jo].newValue || "", this.applyBiliProfile(this.profile, this.unread)), t[_t] && (this.locallyKnownIds = t[_t].newValue || {}, this.applyBiliProfile(this.profile, this.unread)));
    })), zt.onAction((t, o) => {
      t === "mark-known" ? this.markKnown(o.kind, o.id, o.talkerId) : t === "mark-all-known" && this.markAllKnown(o.kind, o.ids);
    }), this.refreshBiliProfile(), setTimeout(() => {
      this.loadGitHubUpdates();
    }, 3500));
  }
}
const xi = new Va(), ye = $e({ open: !1, loading: !1, error: "", mid: "", name: "", face: "", sign: "", followed: !1, submitting: !1, left: 12, top: 12, videos: [] });
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
}), Rn = /* @__PURE__ */ new Set();
let Qt;
const Nn = new Ca();
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
    let r = 0, h = "";
    try {
      for (; ; ) {
        o.signal.throwIfAborted();
        const $ = await g.read();
        if ($.done) break;
        if (r += $.value.byteLength, r > 2 * 1024 * 1024) throw new Error("Public source exceeds limit");
        h += f.decode($.value, { stream: !0 });
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
function Li(e, t) {
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
      repos: f.items.slice(0, 30).map((r) => Li(r, !1)),
      sourceText: `GitHub Search：UTC 日期 ${o} 之后新建的仓库，按累计 Star 排序；不是官方 Trending 榜。${f.incomplete_results ? " API 标记为不完整结果。" : ""}`
    };
  } catch (g) {
    t.throwIfAborted(), i = g instanceof Js ? g.message : "主源响应格式无效。";
  }
  const a = e === 1 ? "daily" : e === 7 ? "weekly" : "monthly", l = await Ua(`https://ghapi.h11.dev/repositories?since=${a}`, t);
  if (t.throwIfAborted(), !Array.isArray(l)) throw new Error("Invalid fallback response");
  return {
    repos: l.slice(0, 30).map((g) => Li(g, !0)),
    sourceText: `GitHub Search 不可用：${i} 改用第三方 ghapi.h11.dev 的 ${a} 趋势快照（不发送账号凭据）；口径与新建仓库搜索不同，源更新时间未提供。`
  };
}
const ls = {
  get state() {
    return Re;
  },
  // View attachment permits starting reads; detaching does not cancel an
  // already requested read. Range changes still replace the old session.
  attachView(e) {
    return Qt = e, !e.aborted && !Re.hasLoaded && !Nn.pending && this.refresh(), () => {
      Qt === e && (Qt = void 0);
    };
  },
  switchTab(e) {
    Re.currentTab = e, this.dispatch("switch-tab", e);
  },
  async switchRange(e, t) {
    !Qt || Qt.aborted || ![1, 7, 30].includes(e) || e === Re.sinceDays || (Nn.cancel(), Object.assign(Re, {
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
    const e = Qt;
    if (!e || e.aborted || Re.isLoading) return;
    const t = Re.sinceDays, o = Nn.begin({
      timeoutMs: 45e3,
      isCurrent: () => Re.sinceDays === t,
      onStop: (a) => {
        Re.isLoading = !1, a === "timeout" && (Re.errorMessage = "数据源读取超过整体45秒上限，请手动刷新；没有继续请求备用源。");
      }
    }), i = o.current;
    if (i()) {
      Re.isLoading = !0, Re.errorMessage = "";
      try {
        const a = await o.wait(() => Ya(t, o.signal));
        if (!i()) return;
        Re.repos = a.repos, Re.sourceText = a.sourceText, Re.fetchedAt = Date.now(), Re.hasLoaded = !0;
      } catch {
        i() && (Re.errorMessage = Re.hasLoaded ? "刷新失败，保留同一时间范围的上次读取结果；请检查网络或额度后手动刷新。" : "数据源读取失败或超时；未使用内置样例，请稍后手动刷新。");
      } finally {
        o.finish() && (Re.isLoading = !1, this.dispatch("refresh"));
      }
    }
  },
  selectRepo(e) {
    this.dispatch("select-repo", e);
  },
  onAction(e) {
    return Rn.add(e), () => {
      Rn.delete(e);
    };
  },
  dispatch(e, t) {
    for (const o of Rn)
      try {
        o(e, t);
      } catch {
      }
  }
}, Jn = () => ({
  icon: "🧭",
  title: "快捷轮盘",
  desc: "移动鼠标选择",
  active: !1
}), pi = () => ({
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
  hub: Jn(),
  activeSectorId: null,
  sectors: [],
  beam: pi()
});
let $i = null;
function Xa(e, t) {
  if (typeof e != "number" || !t)
    return pi();
  const o = 160, i = 160, a = 26, l = 154, g = 360 / t, f = e - g / 2, r = e + g / 2, h = f * Math.PI / 180, $ = r * Math.PI / 180, F = o + a * Math.cos(h), m = i + a * Math.sin(h), D = o + l * Math.cos(h), v = i + l * Math.sin(h), w = o + a * Math.cos($), S = i + a * Math.sin($), y = o + l * Math.cos($), _ = i + l * Math.sin($), x = g > 180 ? 1 : 0, B = `M ${F.toFixed(1)} ${m.toFixed(1)} L ${D.toFixed(1)} ${v.toFixed(1)} A ${l} ${l} 0 ${x} 1 ${y.toFixed(1)} ${_.toFixed(1)} L ${w.toFixed(1)} ${S.toFixed(1)} A ${a} ${a} 0 ${x} 0 ${F.toFixed(1)} ${m.toFixed(1)} Z`, H = `M ${D.toFixed(1)} ${v.toFixed(1)} A ${l} ${l} 0 ${x} 1 ${y.toFixed(1)} ${_.toFixed(1)}`;
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
      y1: parseFloat(S.toFixed(1)),
      x2: parseFloat(y.toFixed(1)),
      y2: parseFloat(_.toFixed(1))
    }
  };
}
const Ae = {
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
    } : ne.hub = Jn();
  },
  setBeam(e, t) {
    ne.beam = Xa(e, t);
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
    ne.isExpanded = !1, ne.mode = "main", ne.activeSectorId = null, ne.beam = pi(), ne.hub = Jn();
  },
  setWheelMode(e) {
    ne.mode = e;
  },
  setActionHandler(e) {
    $i = e;
  },
  dispatch(e, t) {
    $i?.(e, t);
  }
}, cs = [
  { id: "daily-bilibili", title: "b站插件", desc: "B站收藏夹与追番视频", icon: "assets/bilibili.svg" },
  { id: "daily-pricing", title: "模型插件", desc: "AI 模型定价与排行榜", icon: "assets/nav-pricing.svg" },
  { id: "daily-aihot", title: "ai hot插件", desc: "全网 AI 与前沿科技资讯", icon: "assets/nav-aihot.svg" },
  { id: "folder", title: "常用网站", desc: "点击展开快捷网站子轮盘", icon: "assets/nav-folder.svg", mode: "shortcuts" },
  { id: "card-github", title: "github插件", desc: "GitHub 趋势与星标项目", icon: "assets/nav-github.svg" },
  { id: "launcher", title: "首页", desc: "返回主屏常用应用台", icon: "assets/nav-home.svg" }
];
function qa() {
  return cs.filter((e) => e.mode || e.id === "launcher" || hn(e.id));
}
function Ja() {
  return da.filter((e) => e.kind === "module" && hn(e.id)).map((e) => ({
    id: e.id,
    title: e.title,
    desc: e.isDev ? "已启用的实验性组件" : e.categoryLabel,
    icon: e.icon || e.emoji || "🧩",
    tool: e.id
  }));
}
function Ti() {
  ne.isExpanded && ht();
}
let Zn = [], Wo = cs, xt = { x: 400, y: 300 }, ds = !1, $o = !1, On = null, To = null, pt = !1;
const Za = $e(/* @__PURE__ */ new Set()), Qa = /* @__PURE__ */ new Map();
function Pt() {
  return globalThis.chrome?.storage;
}
function us(e, t) {
  const o = ne.isExpanded ? 160 : 24;
  Ae.setBallPosition(
    Math.max(o + 8, Math.min(window.innerWidth - o - 8, e)),
    Math.max(o + 8, Math.min(window.innerHeight - o - 8, t))
  );
}
function ht() {
  const e = ne.mode;
  let t = [];
  e === "shortcuts" && (t = [...Zn], t.push({
    id: "toggle-edit-shortcuts",
    title: pt ? d("navwheel.finishEdit") : d("navwheel.editSites"),
    desc: pt ? d("navwheel.finishEditDesc") : d("navwheel.editSitesDesc"),
    icon: pt ? "✅" : "✏️"
  })), Wo = e === "tools" ? Ja() : e === "shortcuts" ? [
    ...t,
    { id: "back-to-main", title: d("navwheel.back"), desc: d("navwheel.backDesc"), icon: "🔙", mode: "main" }
  ] : qa();
  const o = Wo.length, i = o > 12 ? 118 : o > 9 ? 114 : 110, a = o > 12 ? 46 : o > 9 ? 50 : 56;
  Ae.setSectors(Wo.map((l, g) => {
    const f = -90 + 360 / o * g, r = f * Math.PI / 180;
    return {
      id: l.id,
      title: l.title,
      desc: l.desc,
      icon: l.icon,
      angleDeg: f,
      x: Math.round(160 + Math.cos(r) * i),
      y: Math.round(160 + Math.sin(r) * i),
      size: a,
      isShortcut: !!l.url
    };
  })), Ae.setWheelMode(e), Ae.setActiveSector(null), Ae.setBeam(null, 0), Ae.setHub(e === "shortcuts" ? pt ? { icon: "✏️", title: d("navwheel.editing") } : { icon: "🔙", title: d("navwheel.shortcuts") } : e === "tools" ? { icon: "🧰", title: d("navwheel.tools") } : null);
}
function gn(e) {
  ne.mode = e, ht();
}
function Ut() {
  Ae.collapse(), us(ne.ballPosition.x, ne.ballPosition.y), Ae.setVisibility(ds);
}
function oo(e = ne.ballPosition.x, t = ne.ballPosition.y, o = "main") {
  Ae.expand(void 0, void 0, o), us(e, t), ht(), Ae.setVisibility(!0);
}
function er(e) {
  if (e.id === "toggle-edit-shortcuts") {
    ps();
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
  if (!(e.tool && !hn(e.tool) || !e.url && !e.mode && e.id !== "launcher" && !hn(e.id))) {
    if (e.mode) {
      gn(e.mode);
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
function ps() {
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
    const t = await Pt()?.local?.get(["siteShelfLinks", "logicweaverNavWheelShortcutsV1"]), o = Array.isArray(t?.siteShelfLinks) ? t.siteShelfLinks : Array.isArray(t?.logicweaverNavWheelShortcutsV1) ? t.logicweaverNavWheelShortcutsV1 : [], i = o.findIndex((g) => g.url === e.url);
    if (i >= 0) {
      const g = o.filter((f, r) => r !== i);
      return await Pt()?.local?.set({ siteShelfLinks: g, logicweaverNavWheelShortcutsV1: g }), await Ue.loadShortcuts(), ht(), Le.show({
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
    return await Pt()?.local?.set({ siteShelfLinks: l, logicweaverNavWheelShortcutsV1: l }), await Ue.loadShortcuts(), ht(), Le.show({
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
    const t = await Pt()?.local?.get(["siteShelfLinks", "logicweaverNavWheelShortcutsV1"]), o = Array.isArray(t?.siteShelfLinks) ? t.siteShelfLinks : Array.isArray(t?.logicweaverNavWheelShortcutsV1) ? t.logicweaverNavWheelShortcutsV1 : [], i = o.find((l) => String(l.id) === String(e)), a = o.filter((l) => String(l.id) !== String(e));
    await Pt()?.local?.set({ siteShelfLinks: a, logicweaverNavWheelShortcutsV1: a }), await Ue.loadShortcuts(), ht(), i && Le.show({
      appName: d("navwheel.appName"),
      title: d("navwheel.removedNotice"),
      message: d("navwheel.removedSite", { name: i.title || d("navwheel.site") }),
      duration: 2500
    });
  } catch (t) {
    console.warn("[NavWheel] 删除快捷方式失败", t);
  }
}
function Si(e) {
  xt = { x: e.clientX, y: e.clientY };
}
function Ii(e) {
  e.button === 1 && (e.preventDefault(), e.stopPropagation(), xt = { x: e.clientX, y: e.clientY }, ne.isExpanded ? Ut() : oo(e.clientX, e.clientY));
}
function Mi(e) {
  e.button === 1 && e.preventDefault();
}
function Di(e) {
  if (e.key === "Escape") {
    if (pt) {
      e.preventDefault(), e.stopPropagation(), pt = !1, Za.clear(), Qa.clear(), ht(), Le.show({
        appName: d("navwheel.appName"),
        title: d("navwheel.exitedEditing"),
        duration: 1500
      });
      return;
    }
    if (!ne.isExpanded || ri.active) return;
    e.preventDefault(), e.stopPropagation(), ne.mode === "shortcuts" ? gn("main") : Ut();
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
    const o = De.getCachedIcon(e.url);
    if (o) return o;
    const i = nr(e.url);
    if (i) return i;
  }
  return e.icon || "🔗";
}
const Ue = {
  async start() {
    if (!$o) {
      $o = !0, On = Ee(mt, () => {
        ne.isExpanded && ht();
      }), xt = { x: Math.round(window.innerWidth / 2), y: Math.round(window.innerHeight / 2) }, Ae.setActionHandler((e, t) => {
        if (e === "hub:click")
          ne.isExpanded ? ne.mode === "shortcuts" ? gn("main") : Ut() : oo();
        else if (e === "sector:click" || e === "container:click") {
          const o = Wo.find((i) => i.id === t?.id || e === "container:click" && i.id === ne.activeSectorId);
          o && er(o);
        } else if (e === "sector:hover") {
          const o = ne.sectors.find((i) => i.id === t?.id);
          o && (Ae.setHub({ icon: o.icon, title: o.title, desc: o.desc, active: !0 }), Ae.setActiveSector(o.id), Ae.setBeam(o.angleDeg, Wo.length));
        } else e === "sector:leave" && (Ae.setActiveSector(null), Ae.setBeam(null, 0), Ae.setHub(ne.mode === "shortcuts" ? { icon: "🔙", title: d("navwheel.shortcuts") } : ne.mode === "tools" ? { icon: "🧰", title: d("navwheel.tools") } : null));
      }), window.addEventListener("logicweaver:dock-modules-changed", Ti), window.addEventListener("pointermove", Si, { passive: !0 }), window.addEventListener("mousedown", Ii, !0), window.addEventListener("auxclick", Mi, !0), window.addEventListener("keydown", Di, !0), To = (e, t) => {
        t === "local" && (e.siteShelfLinks || e.logicweaverNavWheelShortcutsV1) && this.loadShortcuts();
      }, Pt()?.onChanged?.addListener(To);
      try {
        if (!$o) return;
        ds = !1, Ae.setVisibility(!1);
      } catch {
      }
      await this.loadShortcuts(), ht();
    }
  },
  stop() {
    $o = !1, On?.(), On = null, Ae.setActionHandler(null), window.removeEventListener("logicweaver:dock-modules-changed", Ti), window.removeEventListener("pointermove", Si), window.removeEventListener("mousedown", Ii, !0), window.removeEventListener("auxclick", Mi, !0), window.removeEventListener("keydown", Di, !0), To && Pt()?.onChanged?.removeListener(To), To = null;
  },
  async loadShortcuts() {
    try {
      const e = await Pt()?.local?.get(["siteShelfLinks", "logicweaverNavWheelShortcutsV1"]);
      if (!$o) return;
      const t = e?.siteShelfLinks?.length ? e.siteShelfLinks : e?.logicweaverNavWheelShortcutsV1;
      Zn = (Array.isArray(t) ? t : []).map((o, i) => ({
        id: String(o.id || `wheel-${i}`),
        title: String(o.title || o.url || d("navwheel.site")),
        desc: String(o.url || ""),
        url: String(o.url || ""),
        icon: ir(o)
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
    return e ? Zn.some((t) => t.url === e) : !1;
  },
  toggleEditingShortcuts: ps,
  handleLinkSelection: tr,
  removeShortcut: or,
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
    gn(e);
  }
};
class co {
  constructor() {
    this.activeShortcuts = { ...Ln }, this.isListenerBound = !1, this.storageListenerBound = !1, this.shortcutReadVersion = 0, this.initShortcuts();
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
    const { optionsService: i, SHORTCUT_STORAGE_KEY: a } = await import("./options.service-C0U4WGhE.js").then(($) => $.g), g = (await chrome.storage.local.get(a))[a], f = { ...g || {}, [t]: o }, r = this.shortcutReadVersion, h = await i.saveSettings(
      { [a]: f },
      { [a]: g }
    );
    r === this.shortcutReadVersion && (++this.shortcutReadVersion, this.applyShortcutOverrides(h[a]));
  }
  applyShortcutOverrides(t) {
    const o = t && typeof t == "object" && !Array.isArray(t) ? Object.entries(t).filter((i) => Object.prototype.hasOwnProperty.call(Ln, i[0]) && typeof i[1] == "string") : [];
    this.activeShortcuts = { ...Ln, ...Object.fromEntries(o) };
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
    if (!t || !vi(t)) return !1;
    if (st(t))
      return Oe.handleToolClick(t), !0;
    switch (t) {
      case "bookmarks":
        return vn.toggle(), !0;
      case "settings":
        return yn.open(), !0;
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
        if (ri.active || t.defaultPrevented || t.isComposing || t.repeat || t.target && (t.target.matches("input, textarea, select") || t.target.isContentEditable) && !t.altKey && !t.ctrlKey && !t.metaKey)
          return;
        const i = ua(t);
        if (!i) return;
        const a = i.toLowerCase();
        for (const [l, g] of Object.entries(this.activeShortcuts))
          if (!(!g || !vi(l)) && g.toLowerCase().replace(/^cmd\+/, "meta+") === a) {
            t.preventDefault(), t.stopPropagation(), this.triggerToolShortcut(l);
            break;
          }
      },
      !0
    ));
  }
}
const Qn = co.getInstance();
class uo {
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
const sr = uo.getInstance(), Ai = [
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
    const { city: t, loc: o, d: i } = this.lastRawForecastData;
    this.applyForecastPayload(t, o, i);
  }
  applyForecastPayload(t, o, i) {
    const a = Qo(i.current?.weather_code ?? 0), l = Math.round(i.current?.temperature_2m ?? 0), g = i.hourly?.time || [], f = Date.now();
    let r = g.findIndex((x) => new Date(x).getTime() >= f);
    r < 0 && (r = 0);
    const h = [];
    for (let x = r; x < Math.min(r + 5, g.length); x++) {
      const B = x === r ? d("weather.now") : d("weather.hourSuffix", { hour: new Date(g[x]).getHours() }), H = Qo(i.hourly.weather_code[x]), U = Math.round(i.hourly.temperature_2m[x]);
      h.push({ time: B, emoji: H.emoji, temp: U });
    }
    let $ = d("weather.noRain12h");
    for (let x = r; x < Math.min(r + 12, g.length); x++) {
      const B = i.hourly.weather_code[x], H = i.hourly.precipitation_probability?.[x] || 0;
      if (B >= 51 || H >= 60) {
        const U = new Date(g[x]).getHours(), k = B >= 71 && B <= 77 || B === 85 || B === 86 ? d("weather.snow") : d("weather.rain"), L = H ? ` (${H}%)` : "";
        $ = d("weather.expectPrecip", { time: `${U}:00`, type: k, prob: L });
        break;
      }
    }
    const F = [d("weather.today"), d("weather.tomorrow"), d("weather.afterTomorrow")], m = [], D = i.daily?.time?.length || 0;
    for (let x = 1; x < Math.min(3, D); x++) {
      const B = F[x] || d("weather.plusDays", { count: x }), H = Qo(i.daily.weather_code[x]), U = `${Math.round(i.daily.temperature_2m_max[x])}°/${Math.round(i.daily.temperature_2m_min[x])}°`;
      m.push({ label: B, emoji: H.emoji, tempRange: U });
    }
    const v = Math.round(i.daily?.temperature_2m_max?.[0] ?? l), w = Math.round(i.daily?.temperature_2m_min?.[0] ?? l), S = d("weather.tempRange", { cond: a.label, max: v, min: w }), y = {
      cityName: o.name || t,
      currentEmoji: a.emoji,
      currentTemp: l,
      subText: S,
      rainText: $,
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
      for (let H = 0; H < i.daily.time.length; H++) {
        const U = new Date(i.daily.time[H]), M = H === 0 ? d("weather.today") : H === 1 ? d("weather.tomorrow") : H === 2 ? d("weather.afterTomorrow") : x[U.getDay()], k = Qo(i.daily.weather_code[H]);
        B.push({
          date: `${U.getMonth() + 1}/${U.getDate()}`,
          dayName: M,
          emoji: k.emoji,
          condition: k.label,
          highTemp: Math.round(i.daily.temperature_2m_max[H]),
          lowTemp: Math.round(i.daily.temperature_2m_min[H]),
          rainProb: i.daily.precipitation_probability_max?.[H] || 0
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
    if (!i) return Ai.slice(0, o);
    const a = [];
    for (const l of Ai) {
      const g = l.name.toLowerCase(), f = l.pinyin.toLowerCase(), r = l.admin.toLowerCase();
      if ((g.startsWith(i) || f.startsWith(i) || g.includes(i) || f.includes(i) || r.includes(i)) && a.push(l), a.length >= o) break;
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
      const r = `https://api.open-meteo.com/v1/forecast?latitude=${f.latitude}&longitude=${f.longitude}&current=temperature_2m,weather_code,relative_humidity_2m,wind_speed_10m&hourly=temperature_2m,weather_code,precipitation_probability&daily=temperature_2m_max,temperature_2m_min,weather_code,precipitation_probability_max&forecast_days=7&timezone=auto`, h = await fetch(r);
      if (i !== this.activeRequestId || J.state === "unconfigured") {
        this.isRefreshing = !1;
        return;
      }
      const $ = await h.json();
      this.lastRawForecastData = { city: o, loc: f, d: $ }, i === this.activeRequestId && J.state !== "unconfigured" && this.applyForecastPayload(o, f, $);
    } catch (a) {
      i === this.activeRequestId && J.state !== "unconfigured" && ut.error(a?.message || "天气加载失败，右键此处可重新选择地点。", o);
    } finally {
      i === this.activeRequestId && (this.isRefreshing = !1);
    }
  }
}
const no = po.getInstance();
function ar(e, t) {
  window.LogicWeaverIntro = wt, window.LogicWeaverStartupIntro = wt, window.LogicWeaverNotifications = Le, window.LogicWeaverWindowManager = Oe, window.LogicWeaverWindowTabs = Oe, window.LogicWeaverDomFreezer = pa, window.LogicWeaverWallpaperService = un, window.LogicWeaverLauncherService = De, window.LogicWeaverLauncherRuntime = Un, window.LogicWeaverProfileService = xi;
  try {
    xi.init();
  } catch (o) {
    console.error("[ProfileService] init failed:", o);
  }
  window.LogicWeaverBookmarksService = ni, window.LogicWeaverCalendarService = na, window.LogicWeaverWeather = ut, window.LogicWeaverWeatherService = no, window.LogicWeaverClock = lo, window.LogicWeaverSearch = Zs, window.LogicWeaverSearchService = Qs, Object.defineProperty(window, "LogicWeaverAiHotService", {
    configurable: !0,
    get: () => {
      import("./aihot.service-DHdofX6S.js").then(({ aiHotService: o }) => {
        window.LogicWeaverAiHotService = o;
      });
    }
  }), window.LogicWeaverHomeMusic = Qe, window.LogicWeaverLauncherGroups = ze, window.LogicWeaverProfileMenu = Fo, window.LogicWeaverWorkspaceLaunchers = di, window.LogicWeaverMacDock = Lt, window.LogicWeaverFullscreen = Gt, window.enterFullscreenCard = (o) => Gt.enter(o), window.exitFullscreenCard = () => Gt.exit(), window.cycleFullscreenCard = () => Gt.cycle(), window.LogicWeaverPageVisibility = sr, window.LogicWeaverBackgroundLibrary = bi, window.LogicWeaverNotificationCenter = Wt, window.LogicWeaverBookmarkMenu = ii, window.LogicWeaverBookmarkPanel = vn, window.LogicWeaverBookmarkFolderStrip = pn, window.LogicWeaverLauncherDialogs = Yi, window.LogicWeaverLauncherFolder = Xi, window.LogicWeaverLauncherMenus = ai, window.LogicWeaverSettings = yn, window.LogicWeaverClockSettings = Vt, window.LogicWeaverBiliTheater = Po, window.LogicWeaverBilibiliService = fi, window.getBiliJct = () => fi.getBiliJct(), window.LogicWeaverBiliMiniPlayer = Yn, window.openBiliMiniPlayer = (o) => Yn.openVideo(o), window.LogicWeaverAiDialog = ui, window.LogicWeaverAihotViewer = li, window.LogicWeaverNavWheel = Ae, window.openNavWheel = (o, i) => Ue.open(o, i), window.closeNavWheel = () => Ue.close(), window.toggleNavWheel = (o) => Ue.toggle(o), window.toggleToolWheel = (o) => Ue.toggleTools(o), window.setNavWheelMode = (o) => Ue.setMode(o), window.LogicWeaverShortcuts = Qn, window.triggerToolShortcut = (o) => Qn.triggerToolShortcut(o), window.LogicWeaverCommands = e, window.LogicWeaverFeatures = t, window.LogicWeaverCalendarView = ia, window.LogicWeaverGitHubStatus = si, window.LogicWeaverGitHubFolders = Do, window.LogicWeaverGitHubHero = Ao, window.LogicWeaverGitHubRepositories = Et, window.LogicWeaverGitHubBatchBar = Eo, window.LogicWeaverTodoistLabels = sa, window.LogicWeaverTodoistWorkspace = aa, window.LogicWeaverTodoistCalendarSidebar = ra, window.LogicWeaverTodoistTaskList = la, window.LogicWeaverBiliMessagePanel = zt, window.LogicWeaverStickerBoard = ma, window.LogicWeaverStickersService = va, window.LogicWeaverPricing = Qi, window.LogicWeaverBiliFavorites = Ji, window.LogicWeaverBiliRadioTape = ka, window.LogicWeaverBiliOrganizerDialogs = ya, window.LogicWeaverBiliUpGroupManager = wa, window.LogicWeaverBiliUpPreview = cn, window.LogicWeaverYouTube = es, window.LogicWeaverAihotFeed = Zi, window.LogicWeaverGitHubTrending = ls, window.LogicWeaverCalendarWorkspace = ro, window.LogicWeaverCalendar = ro, window.LogicWeaverTodoistMainWorkspace = ca, window.LogicWeaverTodoistTaskDetail = Ga, window.openBiliTheater = (o) => Po.openVideo(o), window.closeBiliTheater = () => Po.close(), window.showWindowsToast = (o) => {
    if (!o) return null;
    const i = xn(o.target) || gi(o.url) || (o.appType === "bili" ? Hs([o.title, o.subtitle, o.message].filter((a) => typeof a == "string").join(" ")) : void 0);
    return Le.show({
      ...o,
      target: i,
      onClick: () => {
        if (typeof o?.onClick == "function") return o.onClick();
        if (i) return Wt.openTarget(i);
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
    const l = typeof i == "object" && i ? i : a, g = typeof i == "number" ? i : 3200, f = l.isError || /失败|错误|异常|未获取|未找到/i.test(o), r = l.title || (f ? "B站操作未完成" : "哔哩哔哩"), h = l.subtitle || (o.length > 36 ? "" : o), $ = l.message || (l.subtitle || o.length > 36 ? o : ""), F = {
      id: l.id || `bili_toast_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      appType: "bili",
      appName: "哔哩哔哩",
      icon: "assets/bilibili.svg",
      title: r,
      subtitle: h || o,
      message: $ && $ !== h ? $ : "",
      showActions: !!(l.showActions || l.actionLabel),
      actionLabel: l.actionLabel || "",
      onClick: l.onClick || null,
      target: xn(l.target) || gi(l.url) || xn({ type: "bili-video", bvid: l.bvid, aid: l.aid ? String(l.aid) : void 0 }),
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
  }), window.LogicWeaverKineticDrag = xa, window.LogicWeaverMarkdownAst = La, window.setLauncherBackground = (o) => un.setWallpaper(o), window.backgroundDbClear = (o) => Ks(o), window.openBackgroundHistory = () => bi.openDialog();
}
const je = $e({
  isOpen: !1,
  query: "",
  selectedIndex: 0
});
let en = null;
const hs = {
  get state() {
    return je;
  },
  open() {
    je.isOpen || (je.isOpen = !0, je.query = "", je.selectedIndex = 0, en = Oe.pushModalCloser(() => (this.close(), !0)));
  },
  close() {
    je.isOpen && (je.isOpen = !1, je.query = "", je.selectedIndex = 0, en && (en(), en = null));
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
      await wn.execute(e.id, void 0, "command-palette");
    } catch (t) {
      console.warn(`[CommandPalette] Failed to execute ${e.id}:`, t);
    }
  }
};
typeof window < "u" && window.addEventListener("keydown", (e) => {
  if (ri.active || e.defaultPrevented || e.isComposing || e.repeat) return;
  const t = (e.key || "").toLowerCase(), o = (e.ctrlKey || e.metaKey) && t === "k", i = e.altKey && (e.code === "Space" || t === " ");
  (o || i) && (e.preventDefault(), e.stopPropagation(), hs.toggle());
}, !0);
function rr(e) {
  e.register({
    id: "palette.toggle",
    title: "打开全局命令中心 (Spotlight)",
    category: "界面",
    keywords: ["命令", "palette", "spotlight", "raycast", "搜索", "cmd"],
    concurrency: "drop",
    run: () => hs.toggle()
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
const lr = {
  key: 0,
  id: "guest-preview-banner",
  class: "guest-preview-banner",
  role: "alert",
  "aria-label": "新用户开箱视角预览提示"
}, cr = /* @__PURE__ */ he({
  __name: "GuestPreviewBanner",
  setup(e) {
    function t() {
      zs.exit();
    }
    return (o, i) => (c(), pe(Ns, { name: "guest-banner-slide" }, {
      default: It(() => [
        s(js) ? (c(), p("aside", lr, [
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
}), dr = /* @__PURE__ */ Pe(cr, [["__scopeId", "data-v-a2f2ca5f"]]), ur = ["hidden"], pr = {
  key: 0,
  class: "bookmark-folder-strip-empty"
}, hr = ["title", "data-bookmark-folder-id", "onClick", "onContextmenu"], fr = /* @__PURE__ */ he({
  __name: "BookmarkFolderStrip",
  setup(e) {
    const t = j(null);
    function o(l) {
      const g = t.value;
      !g || g.scrollWidth <= g.clientWidth || !l.deltaY || (l.preventDefault(), g.scrollLeft += l.deltaY);
    }
    function i(l) {
      pn.openFolder(l.id);
    }
    function a(l, g) {
      pn.openContextMenu(g, l.clientX, l.clientY);
    }
    return (l, g) => (c(), p("nav", {
      id: "bookmark-folder-strip",
      ref_key: "stripRef",
      ref: t,
      class: "bookmark-folder-strip",
      "aria-label": "书签栏文件夹",
      hidden: !s(ao).enabled,
      onWheel: o
    }, [
      s(ao).folders.length ? E("", !0) : (c(), p("span", pr, u(s(ao).emptyMessage || "书签栏没有文件夹"), 1)),
      (c(!0), p(ee, null, be(s(ao).folders, (f) => (c(), p("button", {
        key: f.id,
        class: "bookmark-folder-chip",
        type: "button",
        title: `打开书签文件夹：${f.title || "未命名"}`,
        "data-bookmark-folder-id": f.id,
        onClick: (r) => i(f),
        onContextmenu: G((r) => a(r, f), ["prevent"])
      }, [
        g[0] || (g[0] = n("span", { "aria-hidden": "true" }, "📁", -1)),
        n("span", null, u(f.title || "未命名"), 1)
      ], 40, hr))), 128))
    ], 40, ur));
  }
}), gr = /* @__PURE__ */ Pe(fr, [["__scopeId", "data-v-5e71cc7c"]]), mr = ["aria-label"], vr = { class: "cube-manager-body" }, yr = ["disabled", "onClick", "title"], wr = ["disabled", "onClick", "title"], br = ["onClick"], kr = ["onClick"], _r = ["onClick"], Cr = ["type", "placeholder"], xr = { type: "submit" }, Lr = {
  key: 0,
  role: "alert"
}, $r = /* @__PURE__ */ he({
  __name: "CubeConfigDialog",
  setup(e) {
    const t = Fe.state, o = te(() => Fe.getActiveFaces()), i = te(() => t.registeredFaces.filter((D) => !t.activeFaceIds.includes(D.id))), a = j(""), l = j("memo"), g = te(() => [
      { value: "memo", label: d("cube.manager.typeMemo"), icon: "📝" },
      { value: "countdown", label: d("cube.manager.typeCountdown"), icon: "⏳" },
      { value: "link", label: d("cube.manager.typeLink"), icon: "🔗" }
    ]), f = j(""), r = j(!1), h = j(JSON.stringify({ title: "每日一句", icon: "📝", customType: "memo", customData: { text: "今天也要记得休息" } }, null, 2)), $ = j("");
    function F(D) {
      $.value = "";
      try {
        D();
      } catch (v) {
        $.value = v instanceof Error ? v.message : "操作失败";
      }
    }
    function m() {
      F(() => {
        const D = r.value ? JSON.parse(h.value) : {
          title: a.value,
          customType: l.value,
          customData: { text: f.value, targetDate: f.value, url: f.value }
        };
        Fe.addCustomFace(D), a.value = "", f.value = "";
      });
    }
    return (D, v) => (c(), pe(bt, { to: "body" }, [
      s(t).isConfigDialogOpen ? (c(), p("section", {
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
          (c(!0), p(ee, null, be(o.value, (w, S) => (c(), p("div", {
            key: w.id,
            class: "cube-row"
          }, [
            n("span", null, u(w.icon) + " " + u(w.title), 1),
            n("button", {
              type: "button",
              disabled: S === 0,
              onClick: (y) => F(() => s(Fe).moveUp(w.id)),
              title: s(d)("cube.manager.moveUp")
            }, "↑", 8, yr),
            n("button", {
              type: "button",
              disabled: S === o.value.length - 1,
              onClick: (y) => F(() => s(Fe).moveDown(w.id)),
              title: s(d)("cube.manager.moveDown")
            }, "↓", 8, wr),
            n("button", {
              type: "button",
              onClick: (y) => F(() => s(Fe).removeCustomFace(w.id))
            }, u(s(d)("cube.manager.removeFace")), 9, br)
          ]))), 128)),
          (c(!0), p(ee, null, be(i.value, (w) => (c(), p("div", {
            key: w.id,
            class: "cube-row"
          }, [
            n("span", null, u(w.title) + u(s(d)("cube.manager.inactiveSuffix")), 1),
            n("button", {
              type: "button",
              onClick: (S) => F(() => s(Fe).toggleActive(w.id, !0))
            }, u(s(d)("cube.manager.add")), 9, kr),
            w.builtIn ? E("", !0) : (c(), p("button", {
              key: 0,
              type: "button",
              onClick: (S) => F(() => s(Fe).removeCustomFace(w.id))
            }, u(s(d)("cube.manager.delete")), 9, _r))
          ]))), 128)),
          n("h3", null, u(s(d)("cube.manager.addFace")), 1),
          n("label", null, [
            tt(n("input", {
              "onUpdate:modelValue": v[1] || (v[1] = (w) => r.value = w),
              type: "checkbox"
            }, null, 512), [
              [Os, r.value]
            ]),
            ot(" " + u(s(d)("cube.manager.pasteJson")), 1)
          ]),
          n("form", {
            onSubmit: G(m, ["prevent"])
          }, [
            r.value ? (c(), p(ee, { key: 1 }, [
              n("p", null, u(s(d)("cube.manager.securityNotice")), 1),
              tt(n("textarea", {
                "onUpdate:modelValue": v[6] || (v[6] = (w) => h.value = w),
                rows: "9",
                maxlength: "10000",
                "aria-label": "面的 JSON 配置",
                spellcheck: "false"
              }, null, 512), [
                [fo, h.value]
              ])
            ], 64)) : (c(), p(ee, { key: 0 }, [
              n("label", null, [
                ot(u(s(d)("cube.manager.fieldTitle")), 1),
                tt(n("input", {
                  "onUpdate:modelValue": v[2] || (v[2] = (w) => a.value = w),
                  maxlength: "60",
                  required: ""
                }, null, 512), [
                  [fo, a.value]
                ])
              ]),
              n("label", null, [
                ot(u(s(d)("cube.manager.fieldType")) + " ", 1),
                q(ji, {
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
          $.value ? (c(), p("p", Lr, u($.value), 1)) : E("", !0)
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
}), Tr = /* @__PURE__ */ Pe($r, [["__scopeId", "data-v-8ab459ee"]]), Sr = ["data-face"], Ir = ["aria-label"], Mr = { class: "ms-top-side" }, Dr = ["title"], Ar = ["title"], Er = ["title"], Pr = {
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
}, rl = /* @__PURE__ */ he({
  __name: "TopInfoCube",
  props: {
    active: { type: Boolean, default: !0 }
  },
  setup(e) {
    const t = e, o = te(() => zi.visible || gt.djModalOpen || gt.isActive && gt.isJoined), i = te(() => gt.isActive && gt.isJoined), a = te(() => Fe.getActiveFaces()), l = j("music"), g = j(0);
    let f = !1, r;
    Ee(
      () => a.value,
      (A) => {
        A.some((W) => W.id === l.value) || (l.value = A[0]?.id || "");
      },
      { immediate: !0 }
    );
    const h = te(() => a.value.filter((A) => !A.builtIn)), $ = j(!1), F = j({ x: 0, y: 0 });
    Ee(() => t.active, (A) => {
      A || ($.value = !1, Fe.closeConfigDialog(), clearTimeout(r), f = !1);
    }, { immediate: !0 });
    const { menuRef: m, style: D } = ci({
      visible: () => $.value,
      anchor: () => F.value,
      dismiss: () => {
        $.value = !1;
      }
    });
    function v(A) {
      A.preventDefault(), A.stopPropagation(), F.value = { x: A.clientX, y: A.clientY }, $.value = !0;
    }
    function w(A) {
      R(A), $.value = !1;
    }
    function S() {
      $.value = !1, Fe.openConfigDialog();
    }
    function y() {
      $.value = !1, _(() => Fe.resetDefaults()), R("music");
    }
    function _(A) {
      $.value = !1;
      try {
        A();
      } catch (W) {
        Le.show({ appName: "滚动立方体", title: "保存失败", message: W instanceof Error ? W.message : "请检查浏览器存储" });
      }
    }
    function x(A) {
      if (!A) return d("cube.countdown.noTarget");
      const z = new Date(A).getTime() - L.value, ve = Math.ceil(z / (1e3 * 60 * 60 * 24));
      return ve > 0 ? d("cube.countdown.remaining", { days: ve }) : ve === 0 ? d("cube.countdown.today") : d("cube.countdown.passed", { days: Math.abs(ve) });
    }
    const B = te(() => !oe.title || oe.title === "点击播放" ? d("home.music.defaultTitle") : oe.title), H = te(() => !oe.artist || oe.artist === "作者" ? d("home.music.defaultArtist") : oe.artist), U = te(() => oe.isBiliRadio ? d("cube.source.biliRadio") : oe.isNetease ? d("cube.source.netease") : oe.playing ? d("cube.source.siren") : d("cube.source.idle")), M = te(() => oe.currentLyric ? oe.currentLyric : oe.playing ? d("cube.defaultPlayingLyric") : d("cube.defaultIdleLyric"));
    function k() {
      Oe.handleToolClick("music");
    }
    const L = j(Date.now());
    let Q;
    Ee(() => t.active && a.value.some((A) => A.id === l.value && A.customType === "countdown"), (A) => {
      A && (L.value = Date.now()), clearInterval(Q), Q = A ? window.setInterval(() => {
        document.hidden || (L.value = Date.now());
      }, 6e4) : void 0;
    }, { immediate: !0 });
    function R(A, W = null) {
      const z = a.value, ve = z.find((ke) => ke.id === A) || z[0];
      if (ve) {
        if (Number.isFinite(W))
          g.value = W;
        else if (ve.id !== l.value) {
          const ke = z.findIndex((We) => We.id === l.value);
          let we = (z.findIndex((We) => We.id === ve.id) - ke + z.length) % z.length;
          we > z.length / 2 && (we -= z.length), g.value += we * 90;
        }
        l.value = ve.id;
      }
    }
    function V(A) {
      const W = a.value;
      if (W.length <= 1) return;
      const z = W.findIndex((we) => we.id === l.value), ke = ((z >= 0 ? z : 0) + A + W.length) % W.length, Te = W[ke];
      Te && R(Te.id, g.value + A * 90);
    }
    function N(A) {
      a.value.length <= 1 || A.altKey || Math.abs(A.deltaY) < 2 || (A.preventDefault(), !f && (f = !0, V(A.deltaY > 0 ? 1 : -1), r = setTimeout(() => {
        f = !1;
      }, 420)));
    }
    function X(A) {
      !["ArrowUp", "ArrowDown", "PageUp", "PageDown"].includes(A.key) || A.target?.closest?.("input") || (A.preventDefault(), V(["ArrowDown", "PageDown"].includes(A.key) ? 1 : -1));
    }
    function me(A, W) {
      return l.value === A ? {
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
    function Xe(A) {
      const W = A.target;
      W && (W.tagName === "INPUT" || W.tagName === "TEXTAREA" || W.isContentEditable) || A.preventDefault();
    }
    return Nt(() => {
      clearInterval(Q), clearTimeout(r);
    }), (A, W) => tt((c(), p("div", {
      class: "ms-top-player",
      "data-face": l.value,
      tabindex: "0",
      title: "滚动立方体 · 滚轮切换面板，右键可自由增删与排序",
      "aria-label": "滚动立方体",
      onWheel: N,
      onKeydown: X,
      onContextmenu: v,
      onCopy: Ce,
      onSelectstart: Xe
    }, [
      a.value.length ? E("", !0) : (c(), p("button", {
        key: 0,
        type: "button",
        class: "ms-cube-cm-action",
        onClick: S
      }, "＋ 添加面（右键管理）")),
      n("div", {
        class: "ms-top-cube",
        style: xe({ transform: `translateZ(-22px) rotateX(${g.value}deg)` })
      }, [
        s(Fe).isActive("music") && l.value === "music" ? (c(), p("section", {
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
              onClick: W[0] || (W[0] = G((z) => s(Qe).prev(), ["stop"]))
            }, "⏮", 8, Dr),
            n("button", {
              class: "ms-top-play",
              title: s(d)("cube.playPause"),
              type: "button",
              onClick: W[1] || (W[1] = G((z) => s(Qe).togglePlay(), ["stop"]))
            }, u(s(oe).playing ? "⏸" : "▶"), 9, Ar)
          ]),
          n("button", {
            class: "ms-top-main",
            title: s(d)("cube.openMusicPicker"),
            type: "button",
            onClick: G(k, ["stop"])
          }, [
            o.value ? (c(), p("div", Pr, [
              n("span", Wr, " 🎧 " + u(i.value ? s(d)("cube.listeningTogether") : s(d)("cube.listening")) + "：" + u(B.value), 1),
              n("span", Rr, u(H.value), 1)
            ])) : (c(), p(ee, { key: 1 }, [
              n("div", Nr, [
                n("span", {
                  class: "ms-top-title",
                  title: B.value
                }, u(B.value), 9, Or),
                n("span", {
                  class: "ms-top-artist",
                  title: H.value
                }, u(H.value), 9, Br),
                n("span", {
                  class: de(["ms-top-source", { idle: !s(oe).playing }])
                }, u(U.value), 3),
                M.value ? (c(), p("span", Fr)) : E("", !0)
              ]),
              M.value ? (c(), p("span", {
                key: 0,
                class: "ms-top-lyric",
                title: M.value
              }, u(M.value), 9, Hr)) : E("", !0)
            ], 64)),
            n("div", Kr, [
              n("div", {
                class: "ms-top-mini-fill",
                style: xe({ width: s(oe).progressPercent + "%" })
              }, null, 4)
            ])
          ], 8, Er),
          n("div", jr, [
            n("button", {
              class: "ms-top-next",
              title: s(d)("cube.nextTrack"),
              type: "button",
              onClick: W[2] || (W[2] = G((z) => s(Qe).next(), ["stop"]))
            }, "⏭", 8, zr),
            n("button", {
              class: "ms-top-open",
              title: s(d)("cube.openPlaylist"),
              type: "button",
              onClick: G(k, ["stop"])
            }, "🎵", 8, Gr)
          ])
        ], 12, Ir)) : E("", !0),
        (c(!0), p(ee, null, be(h.value, (z, ve) => (c(), p("section", {
          key: z.id,
          class: "ms-top-face ms-top-face-custom",
          "aria-label": z.title,
          style: xe(me(z.id, (ve + 1) * 90))
        }, [
          l.value === z.id ? (c(), p("div", {
            key: 0,
            class: "ms-cube-custom-body",
            title: z.desc
          }, [
            n("span", Yr, u(z.icon), 1),
            n("strong", Xr, u(z.title), 1),
            W[10] || (W[10] = n("span", { class: "ms-cube-divider" }, null, -1)),
            z.customType === "memo" ? (c(), p("span", {
              key: 0,
              class: "ms-cube-custom-text",
              title: z.customData?.text
            }, u(z.customData?.text || s(d)("cube.memo.clickToConfig")), 9, qr)) : z.customType === "countdown" ? (c(), p("span", Jr, u(x(z.customData?.targetDate)), 1)) : z.customType === "link" ? (c(), p("a", {
              key: 2,
              href: z.customData?.url,
              target: "_blank",
              rel: "noreferrer",
              class: "ms-cube-custom-link",
              onClick: W[3] || (W[3] = G(() => {
              }, ["stop"]))
            }, u(z.customData?.url) + " ↗ ", 9, Zr)) : E("", !0)
          ], 8, Ur)) : E("", !0),
          n("button", {
            type: "button",
            class: "ms-cube-config-trigger",
            title: "管理立方体面",
            onClick: W[4] || (W[4] = G((ke) => s(Fe).openConfigDialog(), ["stop"]))
          }, " ⚙ ")
        ], 12, Vr))), 128))
      ], 4),
      n("div", Qr, [
        (c(!0), p(ee, null, be(a.value, (z) => (c(), p("i", {
          key: z.id,
          class: de({ on: l.value === z.id }),
          title: z.title,
          onClick: G((ve) => R(z.id), ["stop"])
        }, null, 10, el))), 128))
      ]),
      (c(), pe(bt, { to: "body" }, [
        t.active && $.value ? (c(), p("div", {
          key: 0,
          ref_key: "menuRef",
          ref: m,
          class: "ms-cube-context-menu",
          style: xe(s(D)),
          onClick: W[9] || (W[9] = G(() => {
          }, ["stop"]))
        }, [
          n("div", tl, [
            W[11] || (W[11] = n("span", null, "🎲 滚动立方体面", -1)),
            n("button", {
              type: "button",
              class: "ms-cube-cm-close",
              onClick: W[5] || (W[5] = (z) => $.value = !1)
            }, "×")
          ]),
          n("div", ol, [
            (c(!0), p(ee, null, be(a.value, (z) => (c(), p("button", {
              key: z.id,
              type: "button",
              class: de(["ms-cube-cm-item", { active: l.value === z.id }]),
              onClick: (ve) => w(z.id)
            }, [
              n("span", il, u(z.icon), 1),
              n("span", sl, u(z.title), 1),
              l.value === z.id ? (c(), p("span", al, "✓")) : E("", !0)
            ], 10, nl))), 128))
          ]),
          W[16] || (W[16] = n("div", { class: "ms-cube-cm-divider" }, null, -1)),
          n("button", {
            type: "button",
            class: "ms-cube-cm-action",
            onClick: S
          }, [...W[12] || (W[12] = [
            n("span", null, "＋ 添加面 / 管理面", -1)
          ])]),
          n("button", {
            type: "button",
            class: "ms-cube-cm-action",
            onClick: W[6] || (W[6] = (z) => {
              V(-1), $.value = !1;
            })
          }, [...W[13] || (W[13] = [
            n("span", null, "⏮ 上一个面板", -1)
          ])]),
          n("button", {
            type: "button",
            class: "ms-cube-cm-action",
            onClick: W[7] || (W[7] = (z) => {
              V(1), $.value = !1;
            })
          }, [...W[14] || (W[14] = [
            n("span", null, "⏭ 下一个面板", -1)
          ])]),
          l.value ? (c(), p("button", {
            key: 0,
            type: "button",
            class: "ms-cube-cm-action danger",
            onClick: W[8] || (W[8] = (z) => _(() => s(Fe).removeCustomFace(l.value)))
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
      t.active ? (c(), pe(Tr, { key: 1 })) : E("", !0)
    ], 40, Sr)), [
      [go, t.active]
    ]);
  }
}), ll = /* @__PURE__ */ Pe(rl, [["__scopeId", "data-v-591e9de8"]]), Mo = $e({
  isOpen: !1
}), fs = {
  open() {
    Mo.isOpen = !0;
  },
  close() {
    Mo.isOpen = !1;
  },
  toggle() {
    Mo.isOpen = !Mo.isOpen;
  }
}, ei = Rt(Mo);
function cl() {
  if (typeof chrome > "u" || !chrome.runtime?.onMessage) return () => {
  };
  let e = !1, t;
  const o = (i, a, l) => {
    a.id !== chrome.runtime.id || i?.type !== "TOGGLE_SIDE_DRAWER" || t === void 0 || i.targetTabId !== t || (fs.toggle(), l({ ok: !0 }));
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
}, yl = ["title", "aria-expanded"], wl = ["title"], bl = /* @__PURE__ */ he({
  __name: "AppTopBar",
  setup(e) {
    const t = Y(() => import("./WorkspaceLaunchers-D5pChN3X.js"));
    function o(r) {
      r.preventDefault(), r.stopPropagation();
      const h = typeof window < "u" ? window : null;
      h?.LogicWeaverWindowManager?.open ? h.LogicWeaverWindowManager.open("settings") : h?.LogicWeaverWindowTabs?.open ? h.LogicWeaverWindowTabs.open("settings") : yn.open();
    }
    function i(r) {
      r.preventDefault();
      const h = typeof window < "u" ? window : null;
      typeof h?.toggleBookmarkPanel == "function" ? h.toggleBookmarkPanel() : h?.LogicWeaverBookmarkPanel?.toggle ? h.LogicWeaverBookmarkPanel.toggle() : ni.toggleBookmarkPanel();
    }
    function a(r) {
      r.preventDefault(), Wt.toggle();
    }
    function l(r) {
      r.preventDefault(), Fo.open(r.clientX, r.clientY);
    }
    function g(r) {
      const h = r.target;
      h && (h.tagName === "INPUT" || h.tagName === "TEXTAREA" || h.isContentEditable) || (r.preventDefault(), r.stopPropagation());
    }
    function f(r) {
      const h = r.target;
      h && (h.tagName === "INPUT" || h.tagName === "TEXTAREA" || h.isContentEditable) || r.preventDefault();
    }
    return Ye(() => {
      Wt.start();
      const r = localStorage.getItem("theme") || "light";
      document.documentElement.dataset.theme = r, document.documentElement.setAttribute("data-theme", r);
    }), (r, h) => (c(), p("header", {
      class: de(["topbar", { "bookmark-folders-mode": s(ao).enabled }]),
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
          "aria-expanded": s(Gi).isOpen,
          "aria-label": s(_o) ? s(d)("topbar.notificationsUnread", { count: s(_o) }) : s(d)("topbar.notifications"),
          onClick: a,
          onContextmenu: h[0] || (h[0] = G(($) => l($), ["prevent"]))
        }, [
          n("img", {
            id: "bili-profile-avatar",
            src: s(io).avatarUrl || "assets/bilibili.svg",
            alt: s(io).userName || s(d)("topbar.notifications")
          }, null, 8, pl),
          n("span", {
            id: "bili-profile-badge",
            class: "bili-profile-badge",
            hidden: s(_o) <= 0
          }, u(s(_o) > 99 ? "99+" : s(_o)), 9, hl)
        ], 40, ul),
        n("button", {
          id: "bookmark-handle",
          class: "bookmark-handle",
          type: "button",
          "aria-expanded": "false",
          title: s(d)("topbar.bookmarks"),
          hidden: s(ao).enabled,
          onClick: i
        }, [
          h[2] || (h[2] = n("span", { id: "bookmark-handle-icon" }, "📁", -1)),
          n("span", null, u(s(d)("topbar.bookmarks")), 1)
        ], 8, fl),
        n("div", gl, [
          q(gr)
        ])
      ]),
      q(ll, {
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
          q(s(t))
        ]),
        n("button", {
          id: "side-drawer-toggle",
          class: de(["tb-btn", { active: s(ei).isOpen }]),
          type: "button",
          title: s(d)("topbar.sidebar"),
          "aria-controls": "in-page-side-drawer",
          "aria-expanded": s(ei).isOpen,
          onClick: h[1] || (h[1] = ($) => s(fs).toggle())
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
}, Ll = { class: "wx-cur" }, $l = { class: "wx-emoji" }, Tl = { class: "wx-temp" }, Sl = { class: "wx-sub" }, Il = { class: "wx-rain" }, Ml = { class: "wx-hours" }, Dl = { class: "hh" }, Al = { class: "he" }, El = { class: "ht" }, Pl = { class: "wx-days" }, Wl = ["open"], Rl = { class: "weather-forecast-head" }, Nl = { class: "weather-forecast-city-info" }, Ol = { class: "weather-forecast-icon" }, Bl = { id: "weather-forecast-city-title" }, Fl = { class: "small muted" }, Hl = { class: "weather-forecast-actions" }, Kl = ["title"], jl = ["title"], zl = {
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
}, Lc = { key: 0 }, $c = { class: "weather-section-subtitle" }, Tc = {
  key: 0,
  class: "weather-location-suggestions"
}, Sc = ["onClick"], Ic = { class: "weather-suggestion-name" }, Mc = { class: "weather-suggestion-sub" }, Dc = {
  key: 1,
  class: "weather-suggestion-empty"
}, Ac = { key: 1 }, Ec = { class: "weather-section-subtitle" }, Pc = { class: "weather-quick-chips-grid" }, Wc = ["onClick"], Rc = /* @__PURE__ */ he({
  __name: "WeatherWidget",
  setup(e) {
    const t = j(!1), o = j({ x: 0, y: 0 }), i = j(""), a = j(null), l = j(null), g = ["深圳", "武汉", "北京", "上海", "广州", "成都", "杭州", "南京", "西安", "重庆", "苏州", "天津"], f = te(() => {
      const y = i.value.trim();
      return y ? no.filterCities(y, 6) : [];
    });
    function r(y) {
      const H = y?.clientX ?? window.innerWidth / 2 - 140, U = y?.clientY ?? window.innerHeight / 2 - 320 / 2, M = Math.max(12, Math.min(window.innerWidth - 280 - 12, H)), k = Math.max(12, Math.min(window.innerHeight - 320 - 12, U));
      o.value = { x: M, y: k }, t.value = !0, i.value = "", St(() => {
        l.value?.focus();
      });
    }
    function h() {
      t.value = !1, i.value = "";
    }
    async function $(y) {
      const _ = y.trim();
      _ && (h(), await no.changeCity(_));
    }
    function F() {
      const y = i.value.trim();
      y && $(y);
    }
    function m(y) {
      if (!t.value) return;
      const _ = y.target;
      a.value && !a.value.contains(_) && h();
    }
    function D(y) {
      t.value && y.key === "Escape" && (y.preventDefault(), h());
    }
    Ye(() => {
      ut.setRefreshAction(() => {
        no.loadWeather();
      }), ut.setChangeLocationAction((y) => {
        r(y);
      }), no.loadWeather(), Ee(mt, () => {
        no.reformatCurrentWeather();
      }), window.addEventListener("pointerdown", m, !0), window.addEventListener("keydown", D, !0);
    }), Nt(() => {
      window.removeEventListener("pointerdown", m, !0), window.removeEventListener("keydown", D, !0);
    });
    function v(y) {
      y.preventDefault(), r(y);
    }
    function w() {
      ut.closeForecastModal();
    }
    function S(y) {
      y.target?.id === "weather-forecast-dialog" && w();
    }
    return (y, _) => (c(), p("div", {
      class: "weather-widget-container",
      onContextmenu: v
    }, [
      s(J).state === "unconfigured" ? (c(), p("p", kl, u(s(d)("weather.noCitySet")), 1)) : s(J).state === "loading" ? (c(), p("p", _l, u(s(d)("common.loading")), 1)) : s(J).state === "not_found" ? (c(), p("p", Cl, u(s(d)("weather.cityNotFound", { city: s(J).city })), 1)) : s(J).state === "error" ? (c(), p("p", xl, u(s(J).errorMessage || s(d)("weather.loadFailed")), 1)) : s(J).state === "ready" && s(J).data ? (c(), p(ee, { key: 4 }, [
        n("div", Ll, [
          n("span", $l, u(s(J).data.currentEmoji), 1),
          n("span", Tl, u(s(J).data.currentTemp) + "°", 1)
        ]),
        n("p", Sl, u(s(J).data.subText), 1),
        n("p", Il, u(s(J).data.rainText), 1),
        n("div", Ml, [
          (c(!0), p(ee, null, be(s(J).data.hours, (x, B) => (c(), p("div", {
            key: B,
            class: "wx-h"
          }, [
            n("span", Dl, u(x.time), 1),
            n("span", Al, u(x.emoji), 1),
            n("span", El, u(x.temp) + "°", 1)
          ]))), 128))
        ]),
        n("div", Pl, [
          (c(!0), p(ee, null, be(s(J).data.days, (x, B) => (c(), p("span", { key: B }, u(x.label) + " " + u(x.emoji) + " " + u(x.tempRange), 1))), 128))
        ])
      ], 64)) : E("", !0),
      n("dialog", {
        id: "weather-forecast-dialog",
        class: "weather-forecast-dialog",
        open: s(J).forecastModalOpen,
        onClick: S
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
          s(J).detailInfo ? (c(), p("div", zl, [
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
            (c(!0), p(ee, null, be(s(J).forecastDays, (x, B) => (c(), p("div", {
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
                x.rainProb > 0 ? (c(), p("span", uc, "☂️ " + u(x.rainProb) + "%", 1)) : (c(), p("span", pc, u(s(d)("weather.metric.noRain")), 1))
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
      (c(), pe(bt, { to: "body" }, [
        t.value ? (c(), p("div", {
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
                [fo, i.value]
              ]),
              i.value ? (c(), p("button", {
                key: 0,
                type: "button",
                class: "weather-input-clear",
                onClick: _[3] || (_[3] = (x) => i.value = ""),
                title: s(d)("weather.menu.clearInput")
              }, "✕", 8, Cc)) : E("", !0)
            ]),
            n("button", xc, u(s(d)("weather.menu.submit")), 1)
          ], 32),
          i.value.trim() ? (c(), p("div", Lc, [
            n("div", $c, u(s(d)("weather.menu.suggestions")), 1),
            f.value.length ? (c(), p("div", Tc, [
              (c(!0), p(ee, null, be(f.value, (x) => (c(), p("button", {
                key: x.name + x.admin,
                type: "button",
                class: "weather-suggestion-item",
                onClick: (B) => $(x.name)
              }, [
                n("span", Ic, u(x.name), 1),
                n("span", Mc, u(x.admin), 1)
              ], 8, Sc))), 128))
            ])) : (c(), p("div", Dc, u(s(d)("weather.menu.emptySuggestion")), 1))
          ])) : (c(), p("div", Ac, [
            n("div", Ec, u(s(d)("weather.menu.commonCities")), 1),
            n("div", Pc, [
              (c(), p(ee, null, be(g, (x) => n("button", {
                key: x,
                type: "button",
                class: de(["weather-quick-chip", { active: s(J).city === x }]),
                onClick: (B) => $(x)
              }, u(x), 11, Wc)), 64))
            ])
          ]))
        ], 36)) : E("", !0)
      ]))
    ], 32));
  }
}), gs = /* @__PURE__ */ Pe(Rc, [["__scopeId", "data-v-5aae12b5"]]), ti = "heroCustomMottoV1";
function Nc() {
  try {
    if (typeof localStorage < "u") {
      const e = localStorage.getItem(ti);
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
const eo = Nc(), Z = $e({
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
      const e = await Oc(ti);
      if (e && typeof e == "object") {
        const t = Array.isArray(e.history) ? e.history : [];
        t.length >= Z.history.length && (Z.history = t, e.customText !== void 0 && (Z.customText = e.customText));
      }
    } catch (e) {
      console.warn("[HeroMotto] Sync chrome.storage failed:", e);
    } finally {
      Z.loaded = !0, Z.customText && Z.history.length && (Z.currentIndex = Z.history.findIndex(
        (e) => e.text === Z.customText
      ));
    }
  },
  async persist() {
    const e = {
      customText: Z.customText,
      history: Z.history
    };
    await Bc(ti, e);
  },
  setCustomMotto(e) {
    const t = e.trim();
    if (!t) {
      this.resetToSystem();
      return;
    }
    const { date: o, time: i } = Fc(/* @__PURE__ */ new Date());
    Z.customText = t;
    const a = Z.history.findIndex((l) => l.text === t);
    if (a !== -1) {
      const l = Z.history.splice(a, 1)[0];
      l.date = o, l.time = i, Z.history.unshift(l);
    } else
      Z.history.unshift({
        id: `motto_${Date.now()}`,
        date: o,
        time: i,
        text: t,
        createdAt: Date.now()
      });
    Z.history.length > 50 && (Z.history = Z.history.slice(0, 50)), Z.currentIndex = 0, this.persist();
  },
  selectHistory(e) {
    Z.customText = e.text, Z.currentIndex = Z.history.findIndex((t) => t.id === e.id), this.closeMenu(), this.persist();
  },
  resetToSystem() {
    Z.customText = null, Z.currentIndex = -1, this.closeMenu(), this.persist();
  },
  deleteEntry(e) {
    const t = Z.history.findIndex((o) => o.id === e);
    t !== -1 && (Z.history.splice(t, 1), Z.currentIndex === t && (Z.history.length > 0 ? this.selectHistory(Z.history[0]) : this.resetToSystem()), this.persist());
  },
  clearHistory() {
    Z.history = [], this.resetToSystem();
  },
  stepHistory(e) {
    if (!Z.history.length) return;
    let t = Z.currentIndex + e;
    if (t < 0) {
      this.resetToSystem();
      return;
    }
    t >= Z.history.length && (t = 0), this.selectHistory(Z.history[t]);
  },
  openMenu(e, t) {
    Z.menuPos = { x: e, y: t }, Z.menuOpen = !0;
  },
  closeMenu() {
    Z.menuOpen = !1;
  }
}, Hc = ["title"], Kc = ["placeholder"], jc = { class: "motto-content" }, zc = ["title"], Gc = { class: "motto-menu-header" }, Vc = { class: "dim" }, Uc = { class: "motto-history-label" }, Yc = { class: "motto-history-list" }, Xc = {
  key: 0,
  class: "motto-history-empty dim"
}, qc = ["onClick"], Jc = { class: "motto-item-date" }, Zc = ["title"], Qc = ["title", "onClick"], ed = /* @__PURE__ */ he({
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
    function l(v) {
      const w = a[v];
      return w ? d(w) : v;
    }
    const g = te(() => Z.customText ? l(Z.customText) : Se.greetingText);
    function f() {
      ct.closeMenu(), o.value = Z.customText || Se.greetingText, t.value = !0, St(() => {
        i.value?.focus(), i.value?.select();
      });
    }
    function r() {
      if (!t.value) return;
      t.value = !1;
      const v = o.value.trim();
      ct.setCustomMotto(v), v && Le.fetch(d("motto.appName"), d("motto.updated", { text: v }));
    }
    function h() {
      t.value = !1;
    }
    function $(v) {
      v.key === "Enter" ? (v.preventDefault(), r()) : v.key === "Escape" && (v.preventDefault(), h());
    }
    function F(v) {
      t.value || (v.preventDefault(), v.stopPropagation(), ct.stepHistory(v.deltaY > 0 ? 1 : -1));
    }
    function m(v) {
      v.preventDefault(), v.stopPropagation(), ct.openMenu(v.clientX, v.clientY);
    }
    function D(v) {
      Z.menuOpen && (v.target.closest(".motto-context-menu") || ct.closeMenu());
    }
    return Ye(() => {
      ct.init(), window.addEventListener("click", D);
    }), Nt(() => {
      window.removeEventListener("click", D);
    }), (v, w) => (c(), p(ee, null, [
      n("div", {
        class: "hero-motto-wrapper",
        title: s(d)("motto.hint"),
        onWheel: F,
        onContextmenu: m
      }, [
        t.value ? tt((c(), p("input", {
          key: 0,
          ref_key: "mottoInputRef",
          ref: i,
          "onUpdate:modelValue": w[0] || (w[0] = (S) => o.value = S),
          class: "hero-motto-input",
          type: "text",
          placeholder: s(d)("motto.placeholder"),
          maxlength: "60",
          onBlur: r,
          onKeydown: $
        }, null, 40, Kc)), [
          [fo, o.value]
        ]) : (c(), p("p", {
          key: 1,
          id: "greeting",
          class: "hero-motto-text",
          style: xe({ color: s(Se).greetColor }),
          onClick: f
        }, [
          n("span", jc, u(g.value), 1),
          s(Z).history.length > 1 ? (c(), p("span", {
            key: 0,
            class: "motto-scroll-hint",
            title: s(d)("motto.scrollHint")
          }, "⇕", 8, zc)) : E("", !0)
        ], 4))
      ], 40, Hc),
      (c(), pe(bt, { to: "body" }, [
        s(Z).menuOpen ? (c(), p("div", {
          key: 0,
          class: "motto-context-menu",
          style: xe({ left: `${s(Z).menuPos.x}px`, top: `${s(Z).menuPos.y}px` }),
          onClick: w[3] || (w[3] = G(() => {
          }, ["stop"])),
          onContextmenu: w[4] || (w[4] = G(() => {
          }, ["prevent"]))
        }, [
          n("div", Gc, [
            n("span", null, u(s(d)("motto.customTitle")), 1),
            n("small", Vc, u(s(d)("motto.recordsCount", { count: s(Z).history.length })), 1)
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
            s(Z).history.length ? (c(!0), p(ee, { key: 1 }, be(s(Z).history, (S) => (c(), p("div", {
              key: S.id,
              class: de(["motto-history-item", { active: s(Z).customText === S.text }]),
              onClick: (y) => s(ct).selectHistory(S)
            }, [
              n("span", Jc, u(S.date), 1),
              n("span", {
                class: "motto-item-text",
                title: l(S.text)
              }, u(l(S.text)), 9, Zc),
              n("button", {
                type: "button",
                class: "motto-item-del",
                title: s(d)("motto.deleteEntry"),
                onClick: G((y) => s(ct).deleteEntry(S.id), ["stop"])
              }, "×", 8, Qc)
            ], 10, qc))), 128)) : (c(), p("div", Xc, u(s(d)("motto.historyEmpty")), 1))
          ]),
          w[9] || (w[9] = n("div", { class: "motto-menu-divider" }, null, -1)),
          n("button", {
            type: "button",
            class: "motto-menu-action reset-btn",
            onClick: w[1] || (w[1] = //@ts-ignore
            (...S) => s(ct).resetToSystem && s(ct).resetToSystem(...S))
          }, [
            w[6] || (w[6] = n("i", null, "↻", -1)),
            n("span", null, u(s(d)("motto.resetGreeting")), 1)
          ]),
          s(Z).history.length ? (c(), p("button", {
            key: 0,
            type: "button",
            class: "motto-menu-action danger-btn",
            onClick: w[2] || (w[2] = //@ts-ignore
            (...S) => s(ct).clearHistory && s(ct).clearHistory(...S))
          }, [
            w[7] || (w[7] = n("i", null, "🗑", -1)),
            n("span", null, u(s(d)("motto.clearAll")), 1)
          ])) : E("", !0)
        ], 36)) : E("", !0)
      ]))
    ], 64));
  }
}), td = /* @__PURE__ */ Pe(ed, [["__scopeId", "data-v-a65048d3"]]), od = /* @__PURE__ */ he({
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
    function o(r) {
      return r < 5 ? d("clock.greeting.lateNight") : r < 9 ? d("clock.greeting.morning") : r < 12 ? d("clock.greeting.forenoon") : r < 14 ? d("clock.greeting.noon") : r < 18 ? d("clock.greeting.afternoon") : r < 23 ? d("clock.greeting.evening") : d("clock.greeting.lateNight");
    }
    function i() {
      const r = Vt.state.timezone;
      if (!r || r === "local") return /* @__PURE__ */ new Date();
      try {
        const h = (/* @__PURE__ */ new Date()).toLocaleString("en-US", { timeZone: r });
        return new Date(h);
      } catch {
        return /* @__PURE__ */ new Date();
      }
    }
    function a() {
      const r = (U) => String(U).padStart(2, "0"), h = i(), $ = h.getHours(), F = h.getMinutes(), m = h.getSeconds(), D = h.getFullYear(), v = h.getMonth() + 1, w = h.getDate(), S = h.getDay(), y = `${r($)}:${r(F)}`, _ = `:${r(m)}`, x = o($), B = d(t[S]), H = d("clock.datePattern", {
        year: D,
        month: v,
        day: w,
        week: B
      });
      lo.updateTime(y, _, x, H);
    }
    function l(r) {
      r.preventDefault(), Vt.open({ clientX: r.clientX, clientY: r.clientY });
    }
    function g() {
      document.hidden ? f && (clearInterval(f), f = null) : (a(), f || (f = setInterval(a, 1e3)));
    }
    let f = null;
    return Vt.initPreferences(), a(), Ye(() => {
      Vt.initPreferences(), Ee(mt, () => {
        a();
      }), yt.activeId || (a(), f = setInterval(a, 1e3)), document.addEventListener("visibilitychange", g);
    }), Ee(
      () => yt.activeId,
      (r) => {
        r ? f && (clearInterval(f), f = null) : document.hidden || (a(), f || (f = setInterval(a, 1e3)));
      }
    ), Nt(() => {
      f && (clearInterval(f), f = null), document.removeEventListener("visibilitychange", g);
    }), (r, h) => (c(), p("div", {
      class: "hero-clock-vue-container",
      onContextmenu: l
    }, [
      n("p", {
        id: "clock",
        class: "clock",
        style: xe({ fontFamily: s(Se).fontFamily, color: s(Se).colorHex })
      }, [
        ot(u(s(Se).timeText), 1),
        n("span", {
          id: "secs",
          style: xe({ color: s(Se).colorHex })
        }, u(s(Se).secsText), 5)
      ], 4),
      n("p", {
        id: "date",
        class: "date",
        style: xe({ color: s(Se).dateColor })
      }, u(s(Se).dateText), 5)
    ], 32));
  }
}), ms = /* @__PURE__ */ Pe(od, [["__scopeId", "data-v-f946341c"]]), nd = {
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
}, xd = { class: "home-music-actions" }, Ld = ["title"], $d = ["title"], Td = ["title"], Sd = ["title"], Id = ["title"], Md = /* @__PURE__ */ he({
  __name: "HomeMusicCard",
  setup(e) {
    Ye(() => {
      setTimeout(() => {
        Gs();
      }, 200);
    });
    const t = te(() => zi.visible || gt.djModalOpen || gt.isActive && gt.isJoined), o = te(() => gt.isActive && gt.isJoined), i = te(() => !oe.title || oe.title === "点击播放" ? d("home.music.defaultTitle") : oe.title), a = te(() => !oe.artist || oe.artist === "作者" ? d("home.music.defaultArtist") : oe.artist), l = te(() => oe.mode === "shuffle" ? "🔀" : oe.mode === "one" ? "🔂" : "🔁");
    function g(r) {
      const h = r.target, $ = Number(h.value);
      Qe.seek($);
    }
    function f() {
      Qe.update({ coverUrl: "" });
    }
    return (r, h) => (c(), p("div", {
      id: "home-music-player-view",
      class: de(["home-music-player-view", { "is-degraded": t.value }])
    }, [
      t.value ? (c(), p("div", nd, [
        n("div", id, [
          h[7] || (h[7] = n("span", { class: "degraded-icon" }, "🎧", -1)),
          n("strong", sd, u(o.value ? s(d)("home.music.togetherListening") : s(d)("home.music.backgroundListening")), 1),
          o.value ? (c(), p("span", ad, " DJ: " + u(s(gt).hostName), 1)) : (c(), p("span", rd, u(s(d)("home.music.workspaceReady")), 1))
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
            style: xe({ width: s(oe).progressPercent + "%" })
          }, null, 4)
        ]),
        n("div", pd, [
          n("button", {
            type: "button",
            class: "degraded-btn",
            onClick: h[0] || (h[0] = ($) => s(Qe).togglePlay())
          }, u(s(oe).playing ? s(d)("home.music.pause") : s(d)("home.music.play")), 1),
          n("span", hd, u(s(oe).formattedCurrent) + " / " + u(s(oe).formattedDuration), 1)
        ])
      ])) : (c(), p(ee, { key: 1 }, [
        n("div", fd, [
          n("div", {
            id: "home-vinyl-needle",
            class: de(["home-vinyl-needle", { playing: s(oe).playing }])
          }, [...h[8] || (h[8] = [
            Io('<svg viewBox="0 0 32 52" fill="none" data-v-b7cbb119><circle cx="26" cy="4" r="3.5" fill="#e2e8f0" stroke="#475569" stroke-width="1.5" data-v-b7cbb119></circle><circle cx="26" cy="4" r="1.5" fill="#64748b" data-v-b7cbb119></circle><path d="M26 4 L14 26 L11 44" stroke="#cbd5e1" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" data-v-b7cbb119></path><rect x="7" y="42" width="8" height="9" rx="1.5" fill="#f43f5e" transform="rotate(-15 11 46)" data-v-b7cbb119></rect></svg>', 1)
          ])], 2),
          n("div", {
            id: "home-vinyl-disc",
            class: de(["home-vinyl-disc", { playing: s(oe).playing }]),
            title: s(d)("home.music.togglePlay"),
            onClick: h[1] || (h[1] = ($) => s(Qe).togglePlay())
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
            n("span", kd, u(s(oe).formattedCurrent), 1),
            n("input", {
              id: "home-music-seek",
              class: "home-music-seek-bar",
              type: "range",
              min: "0",
              max: "100",
              value: s(oe).progressPercent,
              onInput: g
            }, null, 40, _d),
            n("span", Cd, u(s(oe).formattedDuration), 1)
          ]),
          n("div", xd, [
            n("button", {
              id: "home-music-prev",
              class: "home-music-btn",
              type: "button",
              title: s(d)("home.music.prevTrack"),
              onClick: h[2] || (h[2] = ($) => s(Qe).prev())
            }, " ⏮ ", 8, Ld),
            n("button", {
              id: "home-music-play",
              class: "home-music-btn play-btn",
              type: "button",
              title: s(d)("home.music.togglePlay"),
              onClick: h[3] || (h[3] = ($) => s(Qe).togglePlay())
            }, u(s(oe).playing ? "⏸" : "▶"), 9, $d),
            n("button", {
              id: "home-music-next",
              class: "home-music-btn",
              type: "button",
              title: s(d)("home.music.nextTrack"),
              onClick: h[4] || (h[4] = ($) => s(Qe).next())
            }, " ⏭ ", 8, Td),
            n("button", {
              id: "home-music-like",
              class: de(["home-music-btn like-btn", { liked: s(oe).liked }]),
              type: "button",
              title: s(d)("home.music.favorite"),
              onClick: h[5] || (h[5] = ($) => s(Qe).toggleLike())
            }, u(s(oe).liked ? "♥" : "♡"), 11, Sd),
            n("button", {
              id: "home-music-mode",
              class: "home-music-btn",
              type: "button",
              title: s(d)("home.music.playMode"),
              onClick: h[6] || (h[6] = ($) => s(Qe).cycleMode())
            }, u(l.value), 9, Id)
          ])
        ])
      ], 64))
    ], 2));
  }
}), vs = /* @__PURE__ */ Pe(Md, [["__scopeId", "data-v-b7cbb119"]]), $t = /* @__PURE__ */ new Map(), Tt = /* @__PURE__ */ new Set();
function Dd(e, t) {
  for ($t.delete(e), $t.set(e, t), Tt.delete(t), Tt.add(t); $t.size > 512; )
    $t.delete($t.keys().next().value);
  for (; Tt.size > 512; )
    Tt.delete(Tt.values().next().value);
}
const Ad = {
  key: 0,
  class: "launcher-fallback"
}, Ed = ["src"], Bn = "lw_resolved_icon:", Pd = /* @__PURE__ */ he({
  __name: "LauncherFavicon",
  props: {
    link: {},
    mini: { type: Boolean, default: !1 }
  },
  setup(e) {
    function t(y) {
      try {
        return localStorage.getItem(Bn + y) || "";
      } catch {
        return "";
      }
    }
    function o(y, _) {
      try {
        localStorage.setItem(Bn + y, _);
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
    const r = te(() => {
      const y = a.link, _ = (y.title || l(y.url)).trim();
      return _ ? _.slice(0, 1).toUpperCase() : "🔗";
    }), h = j([]), $ = j(0), F = j(!1), m = j(!1), D = te(() => m.value || $.value >= h.value.length ? "" : h.value[$.value] || "");
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
      const H = (R) => R ? /google\.com\/s2\/favicons|icons\.duckduckgo\.com|unavatar\.io|icon\.horse/i.test(R) : !1;
      y.customIcon && !H(y.customIcon) && _.push(y.customIcon), y.icon && !H(y.icon) && _.push(y.icon);
      const U = f(y.url);
      U && !_.includes(U) && _.push(U);
      const M = De.getCachedIcon(y.url);
      M && !_.includes(M) && _.push(M);
      const k = g(y.url);
      k && !k.startsWith("http://1.") && !k.startsWith("http://192.") && !k.startsWith("http://127.") && _.push(`${k}/favicon.ico`), y.customIcon && !H(y.customIcon) && _.unshift(y.customIcon);
      const L = [...new Set(_.filter(Boolean))];
      h.value = L, $.value = 0, m.value = L.length === 0;
      const Q = L[0];
      Q && (Q.startsWith("data:") || Tt.has(Q)) && (F.value = !0);
    }
    Ee(
      () => [a.link?.url, a.link?.icon, a.link?.customIcon],
      (y, _) => {
        _ && y[0] === _[0] && y[1] === _[1] && y[2] === _[2] || v();
      },
      { immediate: !0 }
    ), Ye(() => {
      h.value.length === 0 && v();
    });
    function w(y) {
      F.value = !0, m.value = !1;
      const _ = D.value;
      if (_) {
        const x = Tt.has(_), B = $t.get(a.link.url);
        Dd(a.link.url, _), B !== _ && t(a.link.url) !== _ && o(a.link.url, _);
        const H = y.target;
        if (!x && !_.startsWith("data:")) {
          const U = a.link.url;
          setTimeout(() => {
            De.cacheIcon(U, _, H?.getAttribute("src") === _ ? H : null);
          }, 0);
        }
      }
    }
    function S() {
      const y = D.value;
      if (y) {
        Tt.delete(y), $t.get(a.link.url) === y && $t.delete(a.link.url);
        try {
          localStorage.removeItem(Bn + a.link.url), localStorage.removeItem("lw_sync_dataurl:" + a.link.url);
        } catch {
        }
      }
      if (y && De.getCachedIcon(a.link.url) === y && De.evictCachedIcon(a.link.url), $.value + 1 < h.value.length) {
        $.value += 1;
        const _ = h.value[$.value];
        _ && (_.startsWith("data:") || Tt.has(_)) && (F.value = !0);
      } else
        m.value = !0, F.value = !1;
    }
    return (y, _) => (c(), p("span", {
      class: de(e.mini ? "launcher-folder-mini" : "launcher-favicon")
    }, [
      m.value || !D.value ? (c(), p("span", Ad, u(r.value), 1)) : (c(), p("img", {
        key: 1,
        src: D.value,
        alt: "",
        draggable: "false",
        referrerpolicy: "no-referrer",
        decoding: "async",
        style: { "pointer-events": "none", "user-select": "none" },
        onLoad: w,
        onError: S
      }, null, 40, Ed))
    ], 2));
  }
}), mn = /* @__PURE__ */ Pe(Pd, [["__scopeId", "data-v-bc41d0d8"]]), Wd = { class: "launcher-label launcher-title" }, Rd = ["title"], Nd = {
  key: 0,
  class: "launcher-folder-more"
}, Od = {
  key: 1,
  class: "empty-folder",
  "aria-hidden": "true"
}, Bd = { class: "launcher-folder-label launcher-title" }, Fd = /* @__PURE__ */ he({
  __name: "LauncherTileContent",
  props: {
    link: {},
    folder: {},
    size: { default: "small" }
  },
  setup(e) {
    const t = e, o = te(() => t.size === "large" ? 9 : 4), i = te(() => t.folder?.preview.slice(0, t.folder.count > o.value ? o.value - 1 : o.value) || []);
    return (a, l) => e.link ? (c(), p(ee, { key: 0 }, [
      q(mn, { link: e.link }, null, 8, ["link"]),
      n("span", Wd, u(e.link.title), 1)
    ], 64)) : e.folder ? (c(), p(ee, { key: 1 }, [
      n("div", {
        class: "launcher-folder-preview",
        title: `打开${e.folder.title}`
      }, [
        (c(!0), p(ee, null, be(i.value, (g) => (c(), pe(mn, {
          key: g.id,
          link: g,
          mini: !0
        }, null, 8, ["link"]))), 128)),
        e.folder.count > o.value ? (c(), p("span", Nd, "+" + u(e.folder.count - (o.value - 1)), 1)) : E("", !0),
        i.value.length ? E("", !0) : (c(), p("span", Od, "📁")),
        Hi(a.$slots, "default", {}, void 0, !0)
      ], 8, Rd),
      n("span", Bd, u(e.folder.title), 1)
    ], 64)) : E("", !0);
  }
}), Ro = /* @__PURE__ */ Pe(Fd, [["__scopeId", "data-v-7f513029"]]), ys = 5, ws = 180;
function bs(e, t, o) {
  const i = t - e.left, a = o - e.top;
  return i > e.width * 0.25 && i < e.width * 0.75 && a > e.height * 0.25 && a < e.height * 0.75;
}
function ks(e, t, o) {
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
}, iu = { class: "aihot-home-rich-source" }, su = { class: "aihot-home-rich-time" }, Ei = 6, au = /* @__PURE__ */ he({
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
    }, o = j([]), i = j(0), a = j(!0), l = j("");
    function g(y) {
      return mt.value === "en" && y.originalTitle ? y.originalTitle : y.title;
    }
    function f(y) {
      const _ = y.source?.name || y.sourceName || "AI HOT";
      return mt.value === "en" && _.includes("：") ? _.split("：")[0].trim() : _;
    }
    function r(y) {
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
    function $(y) {
      const _ = y.publishedAt || y.published || "";
      if (!_) return mt.value === "en" ? "Latest" : "最新";
      const x = Number(_), B = Number.isFinite(x) && x > 0 ? new Date(x > 1e12 ? x : x * 1e3) : new Date(_);
      if (isNaN(B.getTime())) return String(_).slice(0, 16) || (mt.value === "en" ? "Latest" : "最新");
      const H = (R) => String(R).padStart(2, "0"), U = B.getFullYear(), M = H(B.getMonth() + 1), k = H(B.getDate()), L = H(B.getHours()), Q = H(B.getMinutes());
      return `${U}-${M}-${k} ${L}:${Q}`;
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
          o.value = H, i.value = 0, l.value = "";
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
      i.value += Ei, i.value >= h.value.length && (i.value = 0);
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
    function S(y, _) {
      if (_.ctrlKey || _.metaKey || _.shiftKey || _.button === 1) return;
      _.preventDefault();
      const x = y.links?.original || y.links?.aihot || y.url || "#";
      li.openArticle(
        {
          id: y.id,
          title: g(y),
          summary: y.summary,
          sourceName: f(y),
          published: $(y),
          url: x
        },
        ""
      );
    }
    return Ye(() => {
      D();
    }), (y, _) => (c(), p("section", Hd, [
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
        a.value && !h.value.length ? (c(), p("p", Ud, u(s(d)("aihot.card.loading")), 1)) : l.value && !h.value.length ? (c(), p("p", Yd, u(l.value), 1)) : h.value.length ? (c(), p("div", qd, [
          (c(!0), p(ee, null, be(h.value.slice(i.value, i.value + Ei), (x, B) => (c(), p("a", {
            key: x.id || x.title,
            class: "aihot-home-rich-card",
            href: x.links?.original || x.links?.aihot || x.url || "#",
            target: "_blank",
            rel: "noreferrer",
            title: `${g(x)}
${x.summary || ""}
${s(d)("aihot.card.viewInReader")}`,
            onClick: (H) => S(x, H)
          }, [
            n("span", {
              class: de(["aihot-home-rich-rank", { top: i.value + B < 3 }])
            }, u(i.value + B + 1), 3),
            n("div", Zd, [
              n("h3", Qd, u(g(x)), 1),
              x.summary ? (c(), p("p", eu, u(x.summary), 1)) : E("", !0),
              n("div", tu, [
                n("div", ou, [
                  r(x) ? (c(), p("span", nu, u(r(x)), 1)) : E("", !0),
                  n("span", iu, u(f(x)), 1)
                ]),
                n("time", su, u($(x)), 1)
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
}, _u = { class: "launcher-folder-preview" }, Cu = { class: "launcher-folder-label launcher-title" }, xu = { class: "launcher-label launcher-title" }, Lu = /* @__PURE__ */ he({
  __name: "FavoriteSites",
  setup(e) {
    const t = Y(() => import("./BookmarkBoard-kmZMOpDm.js")), o = Y(() => import("./LauncherBookGuideDialog-AvNz964d.js")), i = j("sites"), a = j(!1), l = j(!1);
    function g() {
      l.value = !0;
    }
    function f() {
      l.value = !1;
    }
    function r() {
      we(), w = !1, me = !1;
    }
    Ye(() => {
      ze.setExternalDragHandler(M), ze.setExternalDropHandler(k), window.addEventListener("blur", r), window.addEventListener("pagehide", r), document.addEventListener("visibilitychange", r);
      const b = window;
      ue.hasBili && typeof b.ensureLauncherMediaCards == "function" && b.ensureLauncherMediaCards();
    });
    const h = j(!1), $ = j(""), F = j(null), m = j(null), D = j(null), v = j(null);
    let w = !1, S = 0, y = 0, _ = 0, x = "", B = 0, H = "", U = 0;
    function M(b) {
      if (i.value !== "sites") return;
      if (!b || Ct.isOpen) {
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
      const se = P.classList.contains("launcher-link"), _e = se ? P.getAttribute("data-launcher-id") : null, Ke = se ? null : P.getAttribute("data-launcher-folder"), re = se ? `link-${_e}` : `folder-${Ke}`, ce = P.getBoundingClientRect(), qe = ce.left + ce.width / 2, _n = ce.top + ce.height / 2, ko = Math.hypot(b.clientX - qe, b.clientY - _n), qt = Date.now();
      if (ko > Math.max(ce.width, ce.height) * 0.55 || re === H && qt - U < 180) return;
      const Jt = Yt.value.filter(
        (Ge) => Ge.type !== "link" || String(Ge.link.id) !== String(b.link.id)
      ), vt = [...v.value || Jt], Dt = vt.findIndex(
        (Ge) => Ge.type === "link" && String(Ge.link.id) === String(b.link.id)
      ), At = vt.findIndex((Ge) => Ge.key === re);
      if (At < 0) return;
      const at = {
        key: `link-${b.link.id}`,
        type: "link",
        link: b.link
      };
      Dt >= 0 ? Dt !== At && (vt.splice(Dt, 1), vt.splice(At, 0, at), v.value = vt, H = re, U = qt) : (vt.splice(At, 0, at), v.value = vt, H = re, U = qt);
    }
    async function k(b) {
      if (i.value !== "sites" || Ct.isOpen) return !1;
      if (v.value) {
        const C = v.value.map((T) => ({
          type: T.type,
          id: T.type === "link" ? String(T.link.id) : void 0,
          groupName: T.type === "folder" ? T.folder.groupName : void 0
        }));
        return await De.moveLinkTo(String(b.id), ue.activePage, "常用网站"), await De.reorderPageItems(ue.activePage, C), v.value = null, H = "", !0;
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
    let Q = null, R = 0, V = 0, N = null, X = null, me = !1;
    function Ce(b, C) {
      if (C.button !== 0) return;
      Q = C.pointerId, R = C.clientX, V = C.clientY, y = C.clientX, _ = C.clientY, N = String(b.id), X = null, me = !1;
      const T = C.currentTarget.getBoundingClientRect();
      L.offsetX = C.clientX - T.left, L.offsetY = C.clientY - T.top, L.type = "link", L.link = b, L.folder = null, window.addEventListener("pointermove", ve, { passive: !1 }), window.addEventListener("pointerup", Te), window.addEventListener("pointercancel", Te);
    }
    function Xe(b, C, T) {
      if (T.button !== 0 || T.target.closest(".launcher-folder-del-btn")) return;
      Q = T.pointerId, R = T.clientX, V = T.clientY, y = T.clientX, _ = T.clientY, N = null, X = b, me = !1;
      const P = T.currentTarget.getBoundingClientRect();
      L.offsetX = T.clientX - P.left, L.offsetY = T.clientY - P.top, L.type = "folder", L.folder = {
        groupName: b,
        size: Ne(b),
        links: C?.links || []
      }, L.link = null, window.addEventListener("pointermove", ve, { passive: !1 }), window.addEventListener("pointerup", Te), window.addEventListener("pointercancel", Te);
    }
    let A = 0, W = null;
    function z() {
      cancelAnimationFrame(A), A = 0, W = null;
    }
    function ve(b) {
      b.pointerId === Q && (me && b.cancelable && b.preventDefault(), W = b, !A && (A = requestAnimationFrame(() => {
        A = 0;
        const C = W;
        W = null, C && ke(C);
      })));
    }
    function ke(b) {
      if (b.pointerId !== Q || !N && !X) return;
      const C = Math.hypot(b.clientX - R, b.clientY - V);
      if (!me && C > ys && (me = !0, w = !0, N ? m.value = N : X && (D.value = X)), !me) return;
      (L.link || L.folder) && (L.visible = !0, L.x = b.clientX - L.offsetX, L.y = b.clientY - L.offsetY);
      const T = document.elementsFromPoint(b.clientX, b.clientY);
      if (hi()) {
        const re = T.some(
          (qe) => qe.id === "launcher-folder-dialog" || !!qe.closest?.("#launcher-folder-dialog")
        ), ce = document.querySelector("#launcher-folder-dialog");
        if (re && ce) {
          ce.classList.add("drop-hover-valid"), Ct.dropHoverValid = !0;
          return;
        } else
          ce?.classList.remove("drop-hover-valid"), Ct.dropHoverValid = !1;
        v.value = null;
        return;
      }
      const se = v.value || Yt.value, _e = N ? `link-${N}` : `folder-${X}`;
      if (se.length) {
        const re = T.find((ce) => {
          if (ce.classList.contains("launcher-link")) {
            const qe = ce.getAttribute("data-launcher-id");
            return qe && `link-${qe}` !== _e;
          }
          if (ce.classList.contains("launcher-folder")) {
            const qe = ce.getAttribute("data-launcher-folder");
            return qe && `folder-${qe}` !== _e;
          }
          return !1;
        });
        if (re) {
          const ce = re.classList.contains("launcher-link"), qe = ce ? re.getAttribute("data-launcher-id") : null, _n = ce ? null : re.getAttribute("data-launcher-folder"), ko = ce ? `link-${qe}` : `folder-${_n}`, qt = re.getBoundingClientRect();
          let Jt = !0;
          N && !ce && (bs(qt, b.clientX, b.clientY) ? (Jt = !1, re.classList.add("drop-target")) : re.classList.remove("drop-target"));
          const vt = Date.now();
          if (ks(qt, b.clientX, b.clientY) || (Jt = !1), ko === x && vt - B < ws && (Jt = !1), Jt) {
            document.querySelectorAll(".launcher-folder.drop-target").forEach((at) => at.classList.remove("drop-target"));
            const Dt = se.findIndex((at) => at.key === _e), At = se.findIndex((at) => at.key === ko);
            if (Dt >= 0 && At >= 0 && Dt !== At) {
              const at = se.slice(), Ge = at.splice(Dt, 1)[0];
              at.splice(At, 0, Ge), v.value = at, x = ko, B = vt;
            }
          }
        }
      }
      const Ke = T.find((re) => re.classList.contains("launcher-page-tab"));
      if (Ke) {
        const re = Ke.getAttribute("data-page");
        re && re !== ue.activePage && Ke.classList.add("drop-target");
      } else
        document.querySelectorAll(".launcher-page-tab.drop-target").forEach((re) => re.classList.remove("drop-target"));
    }
    async function Te(b) {
      if (b.pointerId === Q) {
        z(), b.type === "pointercancel" ? we() : ke(b), window.removeEventListener("pointermove", ve), window.removeEventListener("pointerup", Te), window.removeEventListener("pointercancel", Te);
        try {
          if (me) {
            S = Date.now(), w = !1;
            const C = document.elementsFromPoint(b.clientX, b.clientY);
            if (document.querySelectorAll(".launcher-page-tab.drop-target").forEach((P) => P.classList.remove("drop-target")), document.querySelectorAll(".launcher-folder.drop-target").forEach((P) => P.classList.remove("drop-target")), hi() && Ct.activeFolder) {
              if (C.some(
                (se) => se.id === "launcher-folder-dialog" || !!se.closest?.("#launcher-folder-dialog")
              )) {
                const _e = C.find((Ke) => Ke.hasAttribute("data-child-folder"))?.getAttribute("data-child-folder") || Ct.activeFolder;
                N ? await De.moveLinkTo(N, void 0, _e) : X && await De.moveFolderInto(X, _e);
              }
              return;
            }
            const T = C.find((P) => P.classList.contains("launcher-page-tab"));
            if (T) {
              const P = T.getAttribute("data-page");
              if (P) {
                N ? (await De.moveLinkTo(N, P, "常用网站"), await De.setPage(P)) : X && await De.moveFolderToPage(X, P), we();
                return;
              }
            }
            if (N) {
              const P = C.find((se) => se.classList.contains("launcher-folder"));
              if (P) {
                const se = P.getAttribute("data-launcher-folder");
                if (se) {
                  await De.moveLinkTo(N, ue.activePage, se), we();
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
              await De.reorderPageItems(ue.activePage, P);
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
      z(), Q = null, N = null, X = null, me = !1, w = !1, m.value = null, D.value = null, v.value = null, L.visible = !1, L.link = null, L.folder = null, x = "", document.querySelector("#launcher-folder-dialog")?.classList.remove("drop-hover-valid"), Ct.dropHoverValid = !1, window.removeEventListener("pointermove", ve), window.removeEventListener("pointerup", Te), window.removeEventListener("pointercancel", Te);
    }
    Nt(() => {
      ze.setExternalDragHandler(null), ze.setExternalDropHandler(null), we(), window.removeEventListener("blur", r), window.removeEventListener("pagehide", r), document.removeEventListener("visibilitychange", r), window.removeEventListener("pointermove", ve), window.removeEventListener("pointerup", Te), window.removeEventListener("pointercancel", Te);
    });
    function We(b) {
      const C = ue.pageLabels;
      return C && C[b] ? C[b] : b || "常用网站";
    }
    function Ze(b, C) {
      const T = String(b.page || "").trim(), P = String(C).trim(), se = ue.pageLabels || {}, _e = !T || T === "常用网站" || T === "默认";
      if (!P || P === "常用网站" || P === "默认") return _e;
      if (_e) return !1;
      if (T === P) return !0;
      const re = se[T] || T, ce = se[P] || P;
      return re === ce || T === ce || re === P;
    }
    function Ne(b) {
      const C = ue.groupSizes;
      return C && C[b] === "large" ? "large" : "small";
    }
    function Mt(b) {
      return b === "large" ? 9 : 4;
    }
    function Ot(b, C) {
      const T = Mt(C), P = b.length > T ? T - 1 : T;
      return b.slice(0, P);
    }
    const Yt = te(() => {
      const b = ue.activePage || "常用网站", T = ue.links.filter(
        (re) => Ze(re, b)
      ), P = /* @__PURE__ */ new Map();
      T.forEach((re) => {
        const ce = re.group || "常用网站";
        ce !== "常用网站" && (P.has(ce) || P.set(ce, []), P.get(ce).push(re));
      });
      const se = /* @__PURE__ */ new Set(), _e = [];
      T.forEach((re) => {
        const ce = re.group || "常用网站";
        mi(ue.folders, ce) || (ce === "常用网站" ? _e.push({ key: `link-${re.id}`, type: "link", link: re }) : se.has(ce) || (se.add(ce), _e.push({
          key: `folder-${ce}`,
          type: "folder",
          folder: {
            groupName: ce,
            pageName: b,
            links: P.get(ce) || []
          }
        })));
      });
      const Ke = ue.folders;
      return Ke && Object.entries(Ke).forEach(([re, ce]) => {
        if (mi(ue.folders, re)) return;
        const qe = ce?.page || "常用网站";
        (qe === b || b === "常用网站" && qe === "默认") && !se.has(re) && (se.add(re), _e.push({
          key: `folder-${re}`,
          type: "folder",
          folder: {
            groupName: re,
            pageName: b,
            links: P.get(re) || []
          }
        }));
      }), _e;
    }), wo = te(() => v.value && v.value.length ? v.value : Yt.value), nt = te(() => {
      const b = ue.activePage || "常用网站", C = We(b);
      return C === "默认" || b === "常用网站" ? "还没有快捷入口，点击“编辑入口”后添加。" : `“${C}”还是空的，把网站拖到这里。`;
    });
    function Ho(b) {
      v.value = null, m.value = null, D.value = null, ze.switchPage(b);
    }
    function Ko() {
      h.value = !0, $.value = "", St(() => {
        F.value?.focus();
      });
    }
    function bo() {
      if (!h.value) return;
      const b = $.value.trim();
      h.value = !1, b && ze.addPage(b);
    }
    function jo(b) {
      b.key === "Enter" ? (b.preventDefault(), bo()) : b.key === "Escape" && (h.value = !1);
    }
    function Xt(b, C) {
      ze.openPageMenu(b, C);
    }
    function zo(b) {
      const C = b.target;
      if (!C || C.closest(".launcher-link") || C.closest(".launcher-folder") || C.closest(".launcher-page-tab") || C.closest("button") || C.closest("input"))
        return;
      b.preventDefault();
      const T = ue.activePage || "常用网站";
      ai.openBlankMenu(T, b.clientX, b.clientY);
    }
    function I(b) {
      i.value === "sites" && (!b.shiftKey || ue.pages.length < 2 || (b.preventDefault(), b.deltaY > 0 || b.deltaX > 0 ? ze.nextPage() : ze.prevPage()));
    }
    function O(b) {
      b.target.closest(".launcher-page-tab") || b.stopPropagation();
    }
    function K(b) {
      b.button === 0 && (y = b.clientX, _ = b.clientY);
    }
    function fe(b, C) {
      if (C.preventDefault(), C.stopPropagation(), Ue.isEditingShortcuts) {
        Ue.handleLinkSelection(b);
        return;
      }
      Q || (w = !1), !(Math.hypot(C.clientX - y, C.clientY - _) >= 6 || w || Date.now() - S < 600) && ze.openLink(b, C);
    }
    function ft(b, C) {
      ze.openLinkMenu(b, C);
    }
    function kt(b, C) {
      if (Q || (w = !1), w || Date.now() - S < 450) {
        C.preventDefault(), C.stopPropagation();
        return;
      }
      ze.openFolder(b, C);
    }
    function Bt(b, C, T) {
      ze.openFolderMenu(b, C, T);
    }
    function Ls(b) {
      ze.deleteFolder(b);
    }
    function $s(b, C) {
      const T = Array.from(C.dataTransfer?.types || []);
      if (!T.includes("application/x-newtab-launcher") && !T.includes("application/x-newtab-bookmark") && !T.includes("text/uri-list") && !T.includes("text/plain")) return;
      C.preventDefault(), C.dataTransfer && (C.dataTransfer.dropEffect = "move"), ue.activePage !== b && Ho(b), C.currentTarget?.classList.add("drop-target");
    }
    function Ts(b) {
      b.currentTarget?.classList.remove("drop-target");
    }
    async function Ss(b, C) {
      C.currentTarget?.classList.remove("drop-target");
      let P = "";
      const se = C.dataTransfer?.getData("application/x-newtab-launcher");
      if (se)
        try {
          P = String(JSON.parse(se)?.id || "");
        } catch {
        }
      if (!P && (m.value || window.__activeLauncherLink) && (P = String(window.__activeLauncherLink?.id || m.value || "")), P) {
        C.preventDefault(), C.stopPropagation(), await De.moveLinkTo(P, b, "常用网站"), await De.setPage(b);
        return;
      }
      const _e = window;
      typeof _e.importDroppedLauncherItem == "function" && (C.preventDefault(), C.stopPropagation(), await _e.importDroppedLauncherItem(C, "常用网站", b));
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
      let T = "";
      const P = b.dataTransfer?.getData("application/x-newtab-launcher");
      if (P)
        try {
          T = String(JSON.parse(P)?.id || "");
        } catch {
        }
      if (!T && (m.value || window.__activeLauncherLink) && (T = String(window.__activeLauncherLink?.id || m.value || "")), T) {
        b.preventDefault(), b.stopPropagation(), await De.moveLinkTo(T, ue.activePage, "常用网站");
        return;
      }
      const se = window;
      if (typeof se.importDroppedLauncherItem == "function") {
        b.preventDefault(), b.stopPropagation(), await se.importDroppedLauncherItem(b, "常用网站", ue.activePage);
        return;
      }
      const _e = b.dataTransfer?.getData("text/plain");
      _e && /^https?:\/\//i.test(_e.trim()) && (b.preventDefault(), b.stopPropagation(), await De.addLink({
        title: "",
        url: _e.trim(),
        page: ue.activePage
      }));
    }
    function hi() {
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
          await De.moveFolderInto(P, b);
        } catch (Ke) {
          Le.show({ appName: "常用网站", title: "移动未完成", message: Ke instanceof Error ? Ke.message : "请刷新后核对。" });
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
      !se && (m.value || window.__activeLauncherLink) && (se = String(window.__activeLauncherLink?.id || m.value || "")), se && await De.moveLinkTo(se, ue.activePage, b);
    }
    return (b, C) => (c(), p(ee, null, [
      s(ue).showSites ? (c(), p("section", {
        key: 0,
        class: "launcher-group launcher-sites size-large",
        onWheel: I
      }, [
        n("header", {
          class: "launcher-group-head launcher-sites-head",
          onPointerdown: C[5] || (C[5] = G(() => {
          }, ["stop"])),
          onContextmenu: O
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
              onClick: C[0] || (C[0] = (T) => i.value = "sites")
            }, u(s(d)("home.sites.favoriteSites")), 9, cu),
            n("button", {
              type: "button",
              disabled: a.value,
              "aria-pressed": i.value === "bookmarks",
              onClick: C[1] || (C[1] = (T) => i.value = "bookmarks")
            }, u(s(d)("home.sites.bookmarks")), 9, du)
          ], 8, lu),
          tt(n("div", {
            class: "launcher-page-tabs",
            role: "tablist",
            "aria-label": s(d)("home.sites.pagesAria")
          }, [
            (c(!0), p(ee, null, be(s(ue).pages, (T) => (c(), p("button", {
              key: T,
              type: "button",
              class: de(["launcher-page-tab", { active: T === s(ue).activePage }]),
              "data-page": T,
              role: "tab",
              title: s(d)("home.sites.pageTabTitle", { label: We(T) }),
              onPointerdown: C[2] || (C[2] = G(() => {
              }, ["stop"])),
              onClick: G((P) => Ho(T), ["prevent", "stop"]),
              onContextmenu: G((P) => Xt(T, P), ["prevent", "stop"]),
              onDragover: (P) => $s(T, P),
              onDragleave: C[3] || (C[3] = (P) => Ts(P)),
              onDrop: (P) => Ss(T, P)
            }, u(We(T)), 43, pu))), 128)),
            h.value ? tt((c(), p("input", {
              key: 1,
              ref_key: "pageInputRef",
              ref: F,
              class: "launcher-page-input",
              maxlength: "12",
              placeholder: "例如：游戏区",
              "onUpdate:modelValue": C[4] || (C[4] = (T) => $.value = T),
              onKeydown: jo,
              onBlur: bo
            }, null, 544)), [
              [fo, $.value]
            ]) : (c(), p("button", {
              key: 0,
              class: "launcher-page-add",
              type: "button",
              title: "添加网站分区，例如游戏区",
              "aria-label": "添加网站分区",
              onClick: Ko
            }, " + "))
          ], 8, uu), [
            [go, i.value === "sites"]
          ]),
          i.value === "bookmarks" ? (c(), p("div", hu)) : E("", !0),
          n("button", {
            class: "launcher-page-help",
            type: "button",
            title: "使用指南：如何创建文件夹与整理网站",
            "aria-label": "使用指南与技巧",
            onClick: g
          }, " ? ")
        ], 32),
        i.value === "bookmarks" ? (c(), pe(s(t), {
          key: 0,
          "header-target": "#bookmark-board-header",
          onBusy: C[6] || (C[6] = (T) => a.value = T)
        })) : E("", !0),
        tt(n("div", {
          class: "launcher-page-panel",
          "data-page": s(ue).activePage,
          hidden: !1,
          role: "tabpanel",
          onContextmenu: zo,
          onDragover: C[12] || (C[12] = (T) => Is(T)),
          onDragleave: C[13] || (C[13] = (T) => Ms(T)),
          onDrop: C[14] || (C[14] = (T) => Ds(T))
        }, [
          (c(), pe(Oo, {
            tag: "div",
            class: "launcher-items launcher-site-items",
            key: s(ue).activePage,
            name: m.value || D.value ? "launcher-grid" : ""
          }, {
            default: It(() => [
              (c(!0), p(ee, null, be(wo.value, (T) => (c(), p(ee, {
                key: T.key
              }, [
                T.type === "link" ? (c(), p("a", {
                  key: T.key,
                  class: de(["launcher-link", {
                    "is-dragging": m.value === String(T.link.id),
                    "is-wheel-picked": s(Ue).isEditingShortcuts && s(Ue).isLinkInWheel(T.link.url)
                  }]),
                  href: T.link.url,
                  title: T.link.title + (T.link.note ? `
📝 ` + T.link.note : "") + `
🔗 ` + T.link.url,
                  "data-launcher-id": String(T.link.id),
                  target: "_blank",
                  rel: "noreferrer",
                  draggable: "false",
                  onDragstart: C[7] || (C[7] = G(() => {
                  }, ["prevent"])),
                  onPointerdown: (P) => Ce(T.link, P),
                  onMousedown: C[8] || (C[8] = (P) => K(P)),
                  onClick: G((P) => fe(T.link, P), ["prevent"]),
                  onContextmenu: G((P) => ft(T.link, P), ["prevent"])
                }, [
                  q(Ro, {
                    link: T.link
                  }, null, 8, ["link"])
                ], 42, gu)) : T.type === "folder" ? (c(), p("div", {
                  key: T.key,
                  class: de(["launcher-folder", [
                    `size-${Ne(T.folder.groupName)}`,
                    { "is-dragging": D.value === T.folder.groupName }
                  ]]),
                  title: `${T.folder.groupName}
可拖动调整位置；右键调整收藏夹大小`,
                  role: "button",
                  tabindex: "0",
                  "data-launcher-folder": String(T.folder.groupName),
                  draggable: "true",
                  onPointerdown: (P) => Xe(T.folder.groupName, T.folder, P),
                  onDragstart: (P) => As(T.folder.groupName, P),
                  onDragover: C[10] || (C[10] = (P) => Es(P)),
                  onDragleave: C[11] || (C[11] = (P) => Ps(P)),
                  onDrop: (P) => Ws(T.folder.groupName, P),
                  onClick: (P) => kt(T.folder.groupName, P),
                  onContextmenu: G((P) => Bt(T.folder.groupName, T.folder.pageName, P), ["prevent"])
                }, [
                  q(Ro, {
                    folder: { title: T.folder.groupName, preview: T.folder.links, count: T.folder.links.length },
                    size: Ne(T.folder.groupName)
                  }, {
                    default: It(() => [
                      n("button", {
                        class: "launcher-folder-del-btn",
                        type: "button",
                        title: `删除文件夹「${T.folder.groupName}」`,
                        "aria-label": "删除文件夹",
                        onPointerdown: C[9] || (C[9] = G(() => {
                        }, ["stop"])),
                        onClick: G((P) => Ls(T.folder.groupName), ["stop", "prevent"])
                      }, " ✕ ", 40, vu)
                    ]),
                    _: 2
                  }, 1032, ["folder", "size"]),
                  n("span", yu, u(T.folder.links.length), 1)
                ], 42, mu)) : E("", !0)
              ], 64))), 128)),
              wo.value.length ? E("", !0) : (c(), p("p", wu, u(nt.value), 1))
            ]),
            _: 1
          }, 8, ["name"]))
        ], 40, fu), [
          [go, i.value === "sites"]
        ])
      ], 32)) : E("", !0),
      s(ue).hasTodo || s(ue).hasBili ? (c(), p("div", bu, [
        s(ue).hasTodo ? (c(), pe(ru, { key: 0 })) : s(ue).hasBili ? (c(), p("div", ku)) : E("", !0)
      ])) : E("", !0),
      (c(), pe(bt, { to: "body" }, [
        L.visible ? (c(), p("div", {
          key: 0,
          class: de(["launcher-drag-ghost", [
            L.type === "folder" ? `folder-ghost size-${L.folder?.size}` : "link-ghost"
          ]]),
          style: xe({
            left: `${L.x}px`,
            top: `${L.y}px`
          })
        }, [
          L.type === "folder" && L.folder ? (c(), p(ee, { key: 0 }, [
            n("div", _u, [
              (c(!0), p(ee, null, be(Ot(L.folder.links, L.folder.size), (T, P) => (c(), pe(mn, {
                key: T.id || P,
                link: T,
                mini: !0
              }, null, 8, ["link"]))), 128))
            ]),
            n("span", Cu, u(L.folder.groupName), 1)
          ], 64)) : L.link ? (c(), p(ee, { key: 1 }, [
            q(mn, {
              link: L.link
            }, null, 8, ["link"]),
            n("span", xu, u(L.link.title), 1)
          ], 64)) : E("", !0)
        ], 6)) : E("", !0)
      ])),
      q(s(o), {
        open: l.value,
        onClose: f
      }, null, 8, ["open"])
    ], 64));
  }
}), _s = /* @__PURE__ */ Pe(Lu, [["__scopeId", "data-v-63287e7b"]]), dn = Object.keys(yo);
let tn = !1, Fn = 0, So, Hn;
function Pi(e) {
  for (const t of dn)
    Object.prototype.hasOwnProperty.call(e, t) && (yo[t] = e[t] !== !1);
}
function $u() {
  const e = yo;
  ze.setPrefs(e.showSites, e.showTodo, !e.showTodo && e.showBili), document.body.classList.toggle("hide-weather", !e.showWeather), document.body.classList.toggle("hide-sites", !e.showSites), document.body.classList.toggle("hide-bili", !e.showBili), document.body.classList.toggle("hide-youtube", !e.showYouTube), document.body.classList.toggle("hide-todo", !e.showTodo), document.body.classList.toggle("hide-bookmarks", !e.showBookmarkPanel), e.showBookmarkPanel || vn.close();
}
const Wi = {
  start() {
    if (tn) return;
    tn = !0;
    const e = ++Fn;
    Hn = Ee(() => dn.map((o) => yo[o]), $u, { immediate: !0, flush: "sync" });
    const t = globalThis.chrome;
    So = (o, i) => {
      if (i !== "local") return;
      const a = {};
      for (const l of dn) o[l] && (a[l] = o[l].newValue);
      Pi(a);
    }, t?.storage?.onChanged?.addListener(So), t?.storage?.local && t.storage.local.get(dn).then((o) => {
      tn && Fn === e && Pi(o || {});
    }).catch((o) => console.warn("[HomePrefs] 读取首页设置失败", o));
  },
  stop() {
    tn = !1, Fn++, Hn?.(), Hn = void 0, So && globalThis.chrome?.storage?.onChanged?.removeListener(So), So = void 0;
  }
}, Tu = {
  id: "launcher",
  class: "launcher",
  "aria-label": "快捷入口"
}, Su = { class: "launcher-inner" }, Iu = { class: "launcher-overview" }, Mu = ["title"], Du = { class: "card-head" }, Au = { id: "wx-title" }, Eu = { id: "weather-body" }, Pu = { class: "launcher-center" }, Wu = {
  class: "hero-clock",
  id: "hero-clock"
}, Ru = {
  class: "launcher-widget launcher-task-threads launcher-music-card",
  "data-home-module": "taskThreads"
}, Nu = { class: "card-head" }, Ou = ["title"], Bu = {
  id: "task-thread-home",
  class: "task-thread-home home-music-body"
}, Fu = /* @__PURE__ */ he({
  __name: "AppLauncher",
  setup(e) {
    Ye(() => {
      un.initWallpaper();
    });
    function t() {
      Oe.handleToolClick("music");
    }
    return (o, i) => (c(), p("section", Tu, [
      i[4] || (i[4] = n("div", {
        id: "hero-background-media",
        class: "hero-background-media",
        "aria-hidden": "true"
      }, null, -1)),
      n("div", Su, [
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
              q(gs)
            ])
          ], 8, Mu), [
            [go, s(yo).showWeather]
          ]),
          n("div", Pu, [
            n("div", Wu, [
              q(td),
              q(ms)
            ]),
            n("form", {
              id: "search",
              class: "search",
              onSubmit: i[0] || (i[0] = G(() => {
              }, ["prevent"]))
            }, [
              q(Fi)
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
              q(vs)
            ])
          ])
        ]),
        n("div", {
          id: "launcher-groups",
          class: de(["launcher-groups", { "has-sites": s(ue).showSites, "has-todoist": s(ue).hasTodo, "has-bili": s(ue).hasBili, "has-media": s(ue).hasTodo || s(ue).hasBili }])
        }, [
          q(_s)
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
}), ho = $e(/* @__PURE__ */ new Set()), Kt = $e({}), it = $e({});
function Kn(e) {
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
    return t ? t.lifecycle.isVisible() : $n(e) ? !!fa[e] : ga(e);
  },
  // 标记应用启动
  markRunning(e) {
    ho.add(e), (e in it || st(e)) && (it[e] = !0);
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
    if (this.markRunning(e), $n(e)) {
      yi.open(e);
      return;
    }
    Oe.open(e);
  },
  // 隐藏/关闭窗口：立即退出可见运行态并熄灭 Dock 指示绿点
  hideApp(e) {
    if (ho.delete(e), st(e)) {
      Oe.close(e);
      return;
    }
    if ($n(e)) {
      yi.close(e);
      return;
    }
    Oe.close(e);
  },
  // 真正的关闭（Quit / 彻底从内存与 DOM 中卸载销毁，熄灭小圆点）
  async quitApp(e) {
    if (st(e)) {
      const a = Kn(e);
      if (!a.ok) return a;
      const l = st(e)?.lifecycle.beforeQuit;
      if (l) {
        const r = Ht(e);
        try {
          await l();
        } catch {
          const $ = "后台停止未确认，窗口保留；未自动重试，请检查后台状态。";
          return Le.show({ appName: st(e).title, title: "未退出", message: $, showActions: !1 }), { ok: !1, error: $ };
        }
        if (Ht(e) !== r) return { ok: !1, error: "窗口已有后续操作，未卸载。" };
        const h = Kn(e);
        if (!h.ok) return h;
      }
      const g = Oe.close(e), f = Ht(e);
      return ho.delete(e), it[e] = !1, Lt.removeActiveTool(e), await g, await St(), Ht(e) === f ? { ok: !0 } : { ok: !1, error: "模块已有后续操作，退出状态已变化。" };
    }
    this.hideApp(e), ho.delete(e), Lt.removeActiveTool(e), e in it && (it[e] = !1);
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
      const o = Kn(e);
      if (!o.ok) return o;
      const i = Oe.close(e), a = Ht(e);
      return await i, Ht(e) !== a ? { ok: !1, error: "模块已有后续操作，重载已取消。" } : (it[e] = !1, await St(), Ht(e) !== a ? { ok: !1, error: "模块已有后续操作，未重新打开。" } : (Kt[e] = (Kt[e] || 0) + 1, Oe.open(e), t.lifecycle.isVisible() ? (this.markRunning(e), { ok: !0 }) : { ok: !1, error: "模块当前不能打开，未重新显示窗口。" }));
    }
    this.hideApp(e), e in it ? (it[e] = !1, await St(), Kt[e] = (Kt[e] || 0) + 1, it[e] = !0) : Kt[e] = (Kt[e] || 0) + 1, await St(), this.openApp(e);
  }
}, to = /* @__PURE__ */ he({
  __name: "DockCardModuleHost",
  props: {
    id: {}
  },
  setup(e) {
    const o = st(e.id);
    if (!o || o.presentation !== "card") throw new Error("Unknown registered workspace card");
    const i = o;
    i.mountPolicy === "workspace-ready" && He.markRunning(i.id), Ee(i.lifecycle.isVisible, (h) => {
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
    const r = Y({
      loader: i.loadView,
      onError(h, $, F, m) {
        m <= 2 ? $() : F();
      },
      errorComponent: he({
        setup: () => () => i.lifecycle.isVisible() ? Ve("section", { class: "card wide card-fullscreen", role: "alert" }, [
          Ve("h2", i.title),
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
              onClick: l
            }, "返回首页")
          ])
        ]) : null
      })
    });
    return vo(() => {
      l(), ho.delete(i.id), delete it[i.id];
    }), (h, $) => a.value ? (c(), pe(Ki(s(r)), {
      key: s(He).getRenderKey(s(i).id)
    })) : E("", !0);
  }
}), Hu = { class: "logicweaver-workspaces-layer" }, Ku = {
  key: 0,
  id: "daily-section",
  class: "wrap"
}, ju = { id: "vue-todoist-root" }, zu = { id: "vue-bili-favorites-root" }, Gu = { id: "vue-youtube-root" }, Vu = { id: "vue-pricing-root" }, Uu = { id: "vue-aihot-root" }, Yu = /* @__PURE__ */ he({
  __name: "AppWorkspaces",
  setup(e) {
    const t = j(!!yt.activeId);
    return Ye(() => {
      t.value || (typeof window < "u" && "requestIdleCallback" in window ? window.requestIdleCallback(() => {
        t.value = !0;
      }, { timeout: 80 }) : setTimeout(() => {
        t.value = !0;
      }, 40));
    }), (o, i) => (c(), p("div", Hu, [
      t.value ? (c(), p("main", Ku, [
        n("div", ju, [
          q(to, { id: "todoist" })
        ]),
        n("div", zu, [
          q(to, { id: "daily-bilibili" })
        ]),
        tt(n("div", Gu, [
          q(to, { id: "daily-youtube" })
        ], 512), [
          [go, s(yo).showYouTube]
        ]),
        n("div", Vu, [
          q(to, { id: "daily-pricing" })
        ]),
        n("div", Uu, [
          q(to, { id: "daily-aihot" })
        ]),
        q(to, { id: "card-github" })
      ])) : E("", !0)
    ]));
  }
}), Xu = ["aria-label"], qu = { class: "dock-menu-head" }, Ju = { class: "dock-menu-title" }, Zu = ["src", "alt"], Qu = {
  key: 1,
  class: "dock-menu-emoji"
}, ep = { class: "dock-menu-text" }, tp = { class: "dock-menu-text" }, op = { class: "dock-menu-text" }, np = /* @__PURE__ */ he({
  __name: "DockContextMenu",
  props: {
    target: {}
  },
  emits: ["close", "action"],
  setup(e, { emit: t }) {
    const o = e, i = t, a = te(() => !o.target || o.target.type !== "tool" ? !1 : He.isRunning(o.target.id)), l = te(() => !o.target || o.target.type !== "tool" ? !1 : He.isVisible(o.target.id)), { menuRef: g, style: f } = ci({
      visible: () => !!o.target,
      anchor: () => o.target || { x: 0, y: 0 },
      placement: so.position === "top" ? "below" : "above",
      align: "center",
      gap: 12,
      dismiss: () => i("close")
    });
    function r() {
      o.target && (He.openApp(o.target.id), i("close"));
    }
    function h() {
      o.target && (He.hideApp(o.target.id), i("close"));
    }
    async function $() {
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
    return (v, w) => (c(), pe(bt, { to: "body" }, [
      e.target ? (c(), p("div", {
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
            e.target.icon ? (c(), p("img", {
              key: 0,
              class: "dock-menu-icon",
              src: e.target.icon,
              alt: e.target.title
            }, null, 8, Zu)) : e.target.emoji ? (c(), p("span", Qu, u(e.target.emoji), 1)) : E("", !0),
            n("strong", null, u(e.target.title), 1)
          ]),
          e.target.type === "tool" ? (c(), p("span", {
            key: 0,
            class: de(["dock-status-tag", { "is-running": a.value }])
          }, [
            w[3] || (w[3] = n("span", { class: "dock-status-dot" }, null, -1)),
            ot(" " + u(a.value ? s(d)("dock.menu.running") : s(d)("dock.menu.notStarted")), 1)
          ], 2)) : E("", !0)
        ]),
        w[12] || (w[12] = n("div", { class: "dock-menu-divider" }, null, -1)),
        e.target.type === "tool" ? (c(), p(ee, { key: 0 }, [
          l.value ? (c(), p("button", {
            key: 1,
            type: "button",
            class: "dock-menu-item",
            onClick: h
          }, [
            w[5] || (w[5] = n("span", { class: "dock-menu-symbol" }, "−", -1)),
            n("span", null, u(s(d)("dock.menu.hideWindow")), 1)
          ])) : (c(), p("button", {
            key: 0,
            type: "button",
            class: "dock-menu-item",
            onClick: r
          }, [
            w[4] || (w[4] = n("span", { class: "dock-menu-symbol" }, "↗", -1)),
            n("span", null, u(s(d)("dock.menu.openWindow")), 1)
          ])),
          n("button", {
            type: "button",
            class: "dock-menu-item",
            onClick: $
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
        ], 64)) : e.target.type === "card" ? (c(), p("button", {
          key: 1,
          type: "button",
          class: "dock-menu-item",
          onClick: D
        }, [
          w[10] || (w[10] = n("span", { class: "dock-menu-symbol" }, "↗", -1)),
          n("span", null, u(s(d)("dock.menu.openOfficial")), 1)
        ])) : (c(), p("button", {
          key: 2,
          type: "button",
          class: "dock-menu-item",
          onClick: w[0] || (w[0] = (S) => i("close"))
        }, [...w[11] || (w[11] = [
          n("span", { class: "dock-menu-symbol" }, "🏠", -1),
          n("span", null, "返回常用主页", -1)
        ])]))
      ], 44, Xu)) : E("", !0)
    ]));
  }
}), ip = /* @__PURE__ */ Pe(np, [["__scopeId", "data-v-3973d271"]]), sp = { class: "mac-dock-shelf" }, ap = ["data-dock-target", "title", "onPointerdown", "onClick", "onContextmenu"], rp = ["src", "alt"], lp = {
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
}, wp = /* @__PURE__ */ he({
  __name: "MacDock",
  setup(e) {
    const t = te(() => so), o = j(null), i = te(() => Object.fromEntries(so.tools.map((R) => {
      const V = st(R.id)?.badgeCount?.() || 0;
      return [R.id, Number.isFinite(V) ? Math.max(0, Math.floor(V)) : 0];
    })));
    function a(R) {
      R.stopPropagation(), o.value = null, F(R.currentTarget), Bo.open();
    }
    function l(R, V) {
      V.stopPropagation(), o.value = null, F(V.currentTarget), Lt.triggerItem("target", R);
    }
    function g(R, V) {
      const X = V.currentTarget.getBoundingClientRect(), me = so.position, Ce = me === "left" || me === "right";
      o.value = {
        type: "card",
        id: R.id,
        title: R.title,
        icon: R.icon,
        x: Ce ? me === "left" ? X.right + 8 : X.left - 8 : X.left + X.width / 2,
        y: Ce ? X.top + X.height / 2 : me === "top" ? X.bottom + 8 : X.top
      };
    }
    function f(R) {
      R.stopPropagation(), o.value = null, F(R.currentTarget), Lt.triggerItem("home", "home-launcher");
    }
    function r(R, V) {
      V.stopPropagation(), o.value = null, F(V.currentTarget), st(R) || He.markRunning(R), Lt.triggerItem("tool", R);
    }
    function h(R, V) {
      const X = V.currentTarget.getBoundingClientRect(), me = so.position, Ce = me === "left" || me === "right";
      o.value = {
        type: "tool",
        id: R.id,
        title: R.title,
        icon: R.icon,
        emoji: R.emoji,
        x: Ce ? me === "left" ? X.right + 8 : X.left - 8 : X.left + X.width / 2,
        y: Ce ? X.top + X.height / 2 : me === "top" ? X.bottom + 8 : X.top
      };
    }
    const $ = /* @__PURE__ */ new Map();
    function F(R) {
      if (!R || ($.get(R)?.cancel(), window.matchMedia("(prefers-reduced-motion: reduce)").matches)) return;
      const V = R.animate([
        { translate: "0 0", offset: 0 },
        { translate: "0 -8px", offset: 0.35 },
        { translate: "0 0", offset: 0.65 },
        { translate: "0 -2px", offset: 0.85 },
        { translate: "0 0", offset: 1 }
      ], { duration: 350, easing: "ease" });
      $.set(R, V);
      const N = () => {
        $.get(R) === V && $.delete(R);
      };
      V.onfinish = N, V.oncancel = N;
    }
    const m = j(null), D = $e({
      visible: !1,
      x: 0,
      y: 0,
      width: 40,
      height: 40,
      item: null,
      type: "tool"
    }), v = j(null), w = j(null), S = te(() => v.value || t.value.cards), y = te(() => w.value || t.value.tools);
    let _ = "", x = 0, B = !1, H = 0;
    function U(R, V, N) {
      if (N.button !== 0 || N.target.closest(".mac-dock-market-btn")) return;
      const Ce = N.currentTarget.getBoundingClientRect();
      B = !1, m.value = {
        type: R,
        id: V.id,
        item: V,
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
      const V = R.clientX - m.value.startX, N = R.clientY - m.value.startY, X = Math.hypot(V, N);
      if (!B && X > 5 && (B = !0, D.visible = !0, D.item = m.value.item, D.type = m.value.type, D.width = m.value.width, D.height = m.value.height, m.value.type === "card" ? v.value = [...t.value.cards] : w.value = [...t.value.tools]), !B) return;
      D.x = R.clientX - D.width / 2, D.y = R.clientY - D.height / 2;
      const Ce = document.elementsFromPoint(R.clientX, R.clientY).find(
        (ke) => ke.classList.contains("mac-dock-item") && !ke.classList.contains("mac-dock-market-btn")
      );
      if (!Ce) return;
      const Xe = Ce.getAttribute("data-dock-target"), A = Ce.getAttribute("data-dock-tool"), W = m.value.type, z = m.value.id, ve = Date.now();
      if (W === "card" && Xe && Xe !== z && Xe !== "home-launcher") {
        const ke = Ce.getBoundingClientRect(), Te = ke.left + ke.width / 2;
        if (Math.abs(R.clientX - Te) > ke.width * 0.55 || Xe === _ && ve - x < 180) return;
        const we = [...v.value || t.value.cards], We = we.findIndex((Ne) => Ne.id === z), Ze = we.findIndex((Ne) => Ne.id === Xe);
        if (We >= 0 && Ze >= 0 && We !== Ze) {
          const Ne = we.splice(We, 1)[0];
          we.splice(Ze, 0, Ne), v.value = we, _ = Xe, x = ve;
        }
      } else if (W === "tool" && A && A !== z) {
        const ke = Ce.getBoundingClientRect(), Te = ke.left + ke.width / 2;
        if (Math.abs(R.clientX - Te) > ke.width * 0.55 || A === _ && ve - x < 180) return;
        const we = [...w.value || t.value.tools], We = we.findIndex((Ne) => Ne.id === z), Ze = we.findIndex((Ne) => Ne.id === A);
        if (We >= 0 && Ze >= 0 && We !== Ze) {
          const Ne = we.splice(We, 1)[0];
          we.splice(Ze, 0, Ne), w.value = we, _ = A, x = ve;
        }
      }
    }
    function k() {
      window.removeEventListener("pointermove", M), window.removeEventListener("pointerup", k), window.removeEventListener("pointercancel", k), B && m.value && (H = Date.now() + 250, m.value.type === "card" && v.value ? Lt.reorderCards(v.value.map((R) => R.id)) : m.value.type === "tool" && w.value && Lt.reorderTools(w.value.map((R) => R.id))), D.visible = !1, D.item = null, v.value = null, w.value = null, m.value = null, B = !1, _ = "";
    }
    function L(R, V) {
      Date.now() < H || l(R, V);
    }
    function Q(R, V) {
      Date.now() < H || r(R, V);
    }
    return vo(() => {
      for (const R of $.values()) R.cancel();
      $.clear(), window.removeEventListener("pointermove", M), window.removeEventListener("pointerup", k), window.removeEventListener("pointercancel", k);
    }), (R, V) => (c(), p(ee, null, [
      n("div", sp, [
        q(Oo, {
          tag: "div",
          class: "mac-dock-group mac-dock-cards-group",
          name: "dock-item-motion"
        }, {
          default: It(() => [
            (c(!0), p(ee, null, be(S.value, (N) => (c(), p("button", {
              key: N.id,
              class: de(["mac-dock-item", {
                "is-active": t.value.activeTargetId === N.id,
                "is-drag-origin": m.value && m.value.id === N.id
              }]),
              type: "button",
              "data-dock-target": N.id,
              title: N.title,
              onPointerdown: (X) => U("card", N, X),
              onClick: G((X) => L(N.id, X), ["stop"]),
              onContextmenu: G((X) => g(N, X), ["prevent"])
            }, [
              n("img", {
                class: "mac-dock-icon",
                src: N.icon,
                alt: N.title
              }, null, 8, rp),
              t.value.activeTargetId === N.id ? (c(), p("span", lp)) : E("", !0)
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
          onClick: V[0] || (V[0] = G((N) => f(N), ["stop"]))
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
        q(Oo, {
          tag: "div",
          class: "mac-dock-group mac-dock-tools-group",
          name: "dock-item-motion"
        }, {
          default: It(() => [
            (c(!0), p(ee, null, be(y.value, (N) => (c(), p("button", {
              key: N.id,
              class: de(["mac-dock-item", {
                "is-active": s(He).isRunning(N.id),
                "is-drag-origin": m.value && m.value.id === N.id
              }]),
              type: "button",
              "data-dock-tool": N.id,
              title: N.title,
              onPointerdown: (X) => U("tool", N, X),
              onClick: G((X) => Q(N.id, X), ["stop"]),
              onContextmenu: G((X) => h(N, X), ["prevent"])
            }, [
              N.icon ? (c(), p("img", {
                key: 0,
                class: "mac-dock-icon",
                src: N.icon,
                alt: N.title
              }, null, 8, pp)) : N.emoji ? (c(), p("span", hp, u(N.emoji), 1)) : E("", !0),
              s(He).isRunning(N.id) ? (c(), p("span", fp)) : E("", !0),
              i.value[N.id] > 0 ? (c(), p("span", gp, u(i.value[N.id] > 99 ? "99+" : i.value[N.id]), 1)) : E("", !0)
            ], 42, up))), 128))
          ]),
          _: 1
        }),
        n("button", {
          class: de(["mac-dock-item mac-dock-market-btn", { "is-active": s(Bo).state.isOpen }]),
          type: "button",
          title: s(d)("dock.market"),
          onClick: V[1] || (V[1] = G((N) => a(N), ["stop"]))
        }, [...V[3] || (V[3] = [
          n("span", {
            class: "mac-dock-market-icon",
            "aria-hidden": "true"
          }, "🧩", -1)
        ])], 10, mp)
      ]),
      (c(), pe(bt, { to: "body" }, [
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
          }, null, 8, vp)) : D.item.emoji ? (c(), p("span", yp, u(D.item.emoji), 1)) : E("", !0)
        ], 4)) : E("", !0)
      ])),
      q(ip, {
        target: o.value,
        onClose: V[2] || (V[2] = (N) => o.value = null)
      }, null, 8, ["target"])
    ], 64));
  }
}), Cs = /* @__PURE__ */ Pe(wp, [["__scopeId", "data-v-b7c583e6"]]), bp = {
  id: "win-toast-container",
  class: "win-toast-container",
  "aria-live": "polite",
  "aria-relevant": "additions"
}, kp = ["data-toast-fingerprint", "onMouseenter", "onMouseleave"], _p = { class: "win-toast-head" }, Cp = ["src"], xp = { class: "win-toast-app" }, Lp = { class: "win-toast-time" }, $p = ["title", "aria-label", "onClick"], Tp = ["onClick"], Sp = { class: "win-toast-title" }, Ip = {
  key: 0,
  class: "win-toast-subtitle"
}, Mp = {
  key: 1,
  class: "win-toast-snippet"
}, Dp = {
  key: 0,
  class: "win-toast-actions"
}, Ap = ["onClick"], Ep = ["onClick"], Pp = /* @__PURE__ */ he({
  __name: "NotificationHost",
  setup(e) {
    const t = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), a = j({}), l = j({});
    let g = null;
    function f(v) {
      const w = t.get(v);
      w !== void 0 && clearTimeout(w), t.delete(v);
    }
    function r(v, w = v.duration) {
      f(v.id), i.set(v.id, w), o.set(v.id, Date.now()), l.value[v.id] = !1, a.value[v.id] = Math.max(0, Math.min(100, w / v.duration * 100)), St(() => requestAnimationFrame(() => {
        a.value[v.id] = 0;
      })), t.set(v.id, window.setTimeout(() => {
        t.delete(v.id), Le.close(v.id);
      }, w));
    }
    function h(v) {
      f(v.id);
      const w = Date.now() - (o.get(v.id) || Date.now()), S = Math.max(0, (i.get(v.id) ?? v.duration) - w);
      i.set(v.id, S), l.value[v.id] = !0, a.value[v.id] = Math.max(0, Math.min(100, S / v.duration * 100));
    }
    function $(v) {
      r(v, Math.max(1500, i.get(v.id) ?? v.duration));
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
      const w = Math.max(500, i.get(v.id) ?? v.duration);
      return {
        width: `${a.value[v.id] ?? 100}%`,
        transition: l.value[v.id] ? "none" : `width ${w}ms linear`
      };
    }
    return Ye(() => {
      g = new MutationObserver(() => {
        const w = new Set(Go.map((S) => S.id));
        for (const S of Go)
          !S.closing && !t.has(S.id) && !i.has(S.id) && r(S);
        for (const S of i.keys())
          w.has(S) || (f(S), i.delete(S), o.delete(S), delete a.value[S], delete l.value[S]);
      });
      const v = document.getElementById("win-toast-container");
      v && g.observe(v, { childList: !0 });
      for (const w of Go) r(w);
    }), vo(() => {
      g?.disconnect(), g = null;
      for (const v of t.values()) clearTimeout(v);
      t.clear();
    }), (v, w) => (c(), pe(bt, { to: "body" }, [
      n("div", bp, [
        q(Oo, { name: "win-toast" }, {
          default: It(() => [
            (c(!0), p(ee, null, be(s(Go), (S) => (c(), p("article", {
              key: S.id,
              class: de(["win-toast-card", [S.appType, { closing: S.closing }]]),
              "data-toast-fingerprint": S.fingerprint,
              onMouseenter: (y) => h(S),
              onMouseleave: (y) => $(S)
            }, [
              n("header", _p, [
                n("img", {
                  src: S.icon,
                  class: "win-toast-icon",
                  alt: ""
                }, null, 8, Cp),
                n("span", xp, u(S.appName), 1),
                n("span", Lp, u(s(d)("notifications.justNow")), 1),
                n("button", {
                  type: "button",
                  class: "win-toast-close",
                  title: s(d)("common.close"),
                  "aria-label": s(d)("common.close"),
                  onClick: (y) => F(S)
                }, "✕", 8, $p)
              ]),
              n("button", {
                type: "button",
                class: "win-toast-body win-toast-body-button",
                onClick: (y) => m(S)
              }, [
                n("span", Sp, u(S.title), 1),
                S.subtitle ? (c(), p("span", Ip, u(S.subtitle), 1)) : E("", !0),
                S.message ? (c(), p("span", Mp, u(S.message), 1)) : E("", !0)
              ], 8, Tp),
              S.showActions && S.actionLabel ? (c(), p("footer", Dp, [
                n("button", {
                  type: "button",
                  class: "win-toast-btn primary",
                  onClick: (y) => m(S)
                }, u(S.actionLabel), 9, Ap),
                n("button", {
                  type: "button",
                  class: "win-toast-btn",
                  onClick: (y) => F(S)
                }, u(s(d)("common.close")), 9, Ep)
              ])) : E("", !0),
              n("div", {
                class: "win-toast-progress",
                style: xe(D(S))
              }, null, 4)
            ], 42, kp))), 128))
          ]),
          _: 1
        })
      ])
    ]));
  }
}), xs = /* @__PURE__ */ Pe(Pp, [["__scopeId", "data-v-71b51a1a"]]), Wp = ["id"], Rp = /* @__PURE__ */ he({
  __name: "DockModuleHost",
  setup(e) {
    const t = qi().filter((o) => o.presentation !== "card").map((o) => {
      Ee(o.lifecycle.isVisible, (a) => {
        a && He.markRunning(o.id);
      }, { immediate: !0, flush: "sync" });
      const i = he({
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
                He.reloadApp(o.id);
              }
            }, "↻ 重试"),
            Ve("button", {
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
    return vo(() => {
      for (const { definition: o } of t)
        Oe.close(o.id), ho.delete(o.id), it[o.id] = !1;
    }), (o, i) => (c(!0), p(ee, null, be(s(t), (a) => tt((c(), p("div", {
      id: a.definition.rootId,
      key: a.definition.id
    }, [
      a.mounted.value ? (c(), pe(Ki(a.view), {
        key: s(He).getRenderKey(a.definition.id)
      })) : E("", !0)
    ], 8, Wp)), [
      [go, a.definition.lifecycle.isVisible()]
    ])), 128));
  }
}), Np = /* @__PURE__ */ Pe(Rp, [["__scopeId", "data-v-3f131313"]]);
function Je(e, t) {
  const o = j(!1);
  return Ee(
    e,
    (i) => {
      i && (o.value = !0);
    },
    { immediate: !0, flush: "sync" }
  ), Rt(o);
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
}, Qp = { class: "fo-up-preview-video-info" }, eh = ["href", "title", "onClick"], th = { class: "fo-up-preview-video-meta" }, oh = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2394a3b8'%3E%3Cpath d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/%3E%3C/svg%3E", nh = /* @__PURE__ */ he({
  __name: "BiliUpPreview",
  setup(e) {
    const t = j(!1);
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
    function i() {
      t.value = !1, cn.close();
    }
    function a(l, g) {
      l.ctrlKey || l.metaKey || (l.preventDefault(), l.stopPropagation(), g.bvid ? (Yn.openVideo({
        bvid: g.bvid,
        title: g.title,
        cover: g.cover,
        author: ye.name,
        authorFace: ye.face,
        mid: ye.mid,
        url: g.url
      }), i()) : g.url && g.url !== "#" && window.open(g.url, "_blank"));
    }
    return (l, g) => s(ye).open ? (c(), p("div", {
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
                class: de([
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
          s(ye).loading ? (c(), p("div", Up, [...g[0] || (g[0] = [
            n("i", null, null, -1),
            n("span", null, "正在读取近期投稿…", -1)
          ])])) : s(ye).error ? (c(), p("p", Yp, u(s(ye).error), 1)) : s(ye).videos.length ? (c(!0), p(ee, { key: 3 }, be(s(ye).videos, (f) => (c(), p("article", {
            key: f.bvid,
            class: "fo-up-preview-video"
          }, [
            n("a", {
              class: "fo-up-preview-thumb",
              href: f.url,
              title: `就地播放「${f.title}」（Ctrl+点击在网页打开）`,
              onClick: (r) => a(r, f)
            }, [
              n("img", {
                src: f.cover,
                alt: "",
                loading: "lazy",
                referrerpolicy: "no-referrer"
              }, null, 8, Jp),
              f.duration ? (c(), p("span", Zp, u(f.duration), 1)) : E("", !0)
            ], 8, qp),
            n("div", Qp, [
              n("a", {
                class: "fo-up-preview-video-title",
                href: f.url,
                title: `就地播放「${f.title}」（Ctrl+点击在网页打开）`,
                onClick: (r) => a(r, f)
              }, u(f.title), 9, eh),
              n("div", th, [
                n("span", null, "▣ " + u(f.playCount), 1),
                n("span", null, u(f.published), 1)
              ])
            ])
          ]))), 128)) : (c(), p("p", Xp, "该 UP 主近期暂无视频动态"))
        ])
      ], 44, Op)
    ], 32)) : E("", !0);
  }
}), ih = /* @__PURE__ */ Pe(nh, [["__scopeId", "data-v-3fedd7f1"]]), sh = { class: "logicweaver-overlays-layer" }, ah = { id: "vue-notification-root" }, rh = {
  id: "bili-profile-menu",
  class: "bili-profile-menu",
  hidden: ""
}, lh = { id: "vue-bili-message-panel-root" }, ch = { id: "vue-notification-center-root" }, dh = { id: "vue-tab-manager-root" }, uh = { id: "vue-bookmark-menu-root" }, ph = { id: "vue-bookmark-panel-root" }, hh = { id: "vue-launcher-dialogs-root" }, fh = { id: "vue-launcher-folder-root" }, gh = { id: "vue-launcher-menus-root" }, mh = { id: "vue-settings-dialog-root" }, vh = { id: "vue-clock-settings-root" }, yh = { id: "vue-bili-theater-root" }, wh = { id: "vue-bili-mini-player-root" }, bh = { id: "vue-ai-dialog-root" }, kh = { id: "vue-aihot-viewer-root" }, _h = { id: "vue-nav-wheel-root" }, Ch = { id: "vue-github-detail-root" }, xh = { id: "vue-bili-subtitle-modal-root" }, Lh = { id: "vue-bili-video-task-modal-root" }, $h = { id: "vue-github-task-modal-root" }, Th = { id: "vue-web-task-modal-root" }, Sh = { id: "vue-firecrawl-modal-root" }, Ih = { id: "vue-floating-image-viewer-root" }, Mh = { id: "vue-command-palette-root" }, Dh = /* @__PURE__ */ he({
  __name: "AppOverlays",
  setup(e) {
    const t = Je(() => Bo.state.isOpen), o = Je(() => Gi.isOpen), i = Je(() => ln.isOpen), a = Je(() => Vt.state.isOpen), l = Je(() => _a.open), g = Je(() => Po.state.isOpen), f = Je(() => Us.isOpen), r = Je(() => ba.isOpen), h = Je(() => ui.state.isOpen), $ = Je(() => ea.isOpen), F = Je(() => je.isOpen), m = Je(() => ei.isOpen);
    let D;
    Ye(() => {
      D = cl();
    }), Nt(() => {
      D?.();
    });
    const v = Je(() => ii.state.isOpen), w = Je(() => Ct.isOpen), S = Je(() => Co.editDialog.isOpen || Co.linkMove.isOpen || Co.folderMove.isOpen || Co.groupMerge.isOpen || Co.folderDelete.isOpen), y = Y(() => import("./ProfileMenu-DJxktqUf.js")), _ = Y(() => import("./BookmarkNoteMenu-pL-bPpp8.js")), x = Y(() => import("./BookmarkPanel-gno_DEbD.js")), B = Y(() => import("./ClockSettingsMenu-BEHwxAO2.js")), H = Y(() => import("./NotificationCenter-C3BNKSZm.js")), U = Y(() => import("./TabManagerPanel-CyWThUtp.js")), M = Y(() => import("./LauncherDialogs-h8VyfY7L.js")), k = Y(() => import("./LauncherFolderDialog-CxSztkLz.js")), L = Y(() => import("./LauncherMenus-C0UK23U2.js")), Q = Y(() => import("./SettingsDialog-Ckeh7ayF.js")), R = Y(() => import("./BiliMiniPlayer-CsEkbRxk.js")), V = Y(() => import("./BiliTheaterDialog-BygqqAqB.js")), N = Y(() => import("./BiliMessagePanel-Dp9TCw5T.js")), X = Y(() => import("./AiDialog-BmH1XcQX.js")), me = Y(() => import("./AihotViewer-Beh8FWe7.js")), Ce = Y(() => import("./NavWheelOverlay-CqU4GEoh.js")), Xe = Y(() => import("./GitHubRepoDetailDrawer-BctZ8JE5.js")), A = Y(() => import("./InPageSideDrawer-DTeypPIb.js")), W = Y(() => import("./BiliSubtitleModal-BEB4qIUk.js")), z = Y(() => import("./BiliVideoTaskModal-ar-thWnw.js")), ve = Y(() => import("./GitHubTaskModal-B-f6JiwY.js")), ke = Y(() => import("./WebSiteTaskModal-DTSPwbye.js")), Te = Y(() => import("./FirecrawlModal-BN690Hvk.js")), we = Y(() => import("./FloatingImageViewer-Nr5LQ-VJ.js")), We = Y(() => import("./CommandPalette-BLYNRW6Z.js")), Ze = Y(() => import("./AppPromptModal-DOPc32Fx.js")), Ne = Y(async () => {
      const [Mt, Ot] = await Promise.all([
        import("./PluginMarketDialog-BnvGbfUr.js"),
        import("./plugin-market-B6zN10fA.js")
      ]);
      return Vs("logicweaver-market-styles", Ot.default), Mt.default;
    });
    return (Mt, Ot) => (c(), p("div", sh, [
      n("div", ah, [
        q(xs)
      ]),
      n("div", rh, [
        q(s(y))
      ]),
      n("div", lh, [
        s(r) ? (c(), pe(s(N), { key: 0 })) : E("", !0)
      ]),
      n("div", ch, [
        s(o) ? (c(), pe(s(H), { key: 0 })) : E("", !0)
      ]),
      n("div", dh, [
        s(i) ? (c(), pe(s(U), { key: 0 })) : E("", !0)
      ]),
      n("div", uh, [
        s(v) ? (c(), pe(s(_), { key: 0 })) : E("", !0)
      ]),
      n("div", ph, [
        q(s(x))
      ]),
      n("div", hh, [
        s(S) ? (c(), pe(s(M), { key: 0 })) : E("", !0)
      ]),
      n("div", fh, [
        s(w) ? (c(), pe(s(k), { key: 0 })) : E("", !0)
      ]),
      n("div", gh, [
        q(s(L))
      ]),
      n("div", mh, [
        q(s(Q))
      ]),
      n("div", vh, [
        s(a) ? (c(), pe(s(B), { key: 0 })) : E("", !0)
      ]),
      n("div", yh, [
        s(g) ? (c(), pe(s(V), { key: 0 })) : E("", !0)
      ]),
      n("div", wh, [
        s(f) ? (c(), pe(s(R), { key: 0 })) : E("", !0)
      ]),
      n("div", bh, [
        s(h) ? (c(), pe(s(X), { key: 0 })) : E("", !0)
      ]),
      n("div", kh, [
        s(l) ? (c(), pe(s(me), { key: 0 })) : E("", !0)
      ]),
      n("div", _h, [
        q(s(Ce))
      ]),
      q(Np),
      n("div", Ch, [
        s($) ? (c(), pe(s(Xe), { key: 0 })) : E("", !0)
      ]),
      n("div", xh, [
        q(s(W))
      ]),
      n("div", Lh, [
        q(s(z))
      ]),
      n("div", $h, [
        q(s(ve))
      ]),
      n("div", Th, [
        q(s(ke))
      ]),
      n("div", Sh, [
        q(s(Te))
      ]),
      n("div", Ih, [
        q(s(we))
      ]),
      n("div", Mh, [
        s(F) ? (c(), pe(s(We), { key: 0 })) : E("", !0)
      ]),
      s(m) ? (c(), pe(s(A), { key: 0 })) : E("", !0),
      q(ih),
      q(s(Ze)),
      s(t) ? (c(), pe(s(Ne), { key: 1 })) : E("", !0)
    ]));
  }
});
let jn = !1;
function Ah(e = 1800) {
  if (jn || typeof window > "u") return;
  const t = () => {
    if (jn) return;
    jn = !0;
    const o = qi();
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
const Eh = ["data-active-workspace"], Ph = /* @__PURE__ */ he({
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
    function l(r, h = "image/svg+xml") {
      if (typeof document > "u") return;
      const $ = typeof chrome < "u" && chrome.runtime?.getURL ? chrome.runtime.getURL(r) : r;
      if (a === $) return;
      a = $;
      const F = document.querySelectorAll("link[rel*='icon']");
      if (F.length > 0)
        F.forEach((m) => {
          m.type = h, m.href = $;
        });
      else {
        const m = document.createElement("link");
        m.rel = "icon", m.type = h, m.href = $, document.head.appendChild(m);
      }
    }
    function g() {
      if (typeof document > "u") return;
      const r = i[Vo.value] || i.home;
      if (l(r.icon, r.iconType), oe.playing && oe.title) {
        const h = oe.artist ? ` - ${oe.artist}` : "";
        document.title = `▶ ${oe.title}${h}`;
        return;
      }
      if (xo.playing && xo.title) {
        document.title = `▶ ${xo.title} · 电台`;
        return;
      }
      document.title = r.title;
    }
    Ee(
      [
        () => Vo.value,
        () => oe.playing,
        () => oe.title,
        () => oe.artist,
        () => xo.playing,
        () => xo.title
      ],
      () => {
        g();
      },
      { immediate: !0 }
    );
    const f = te(() => Vo.value === "home" ? "" : Vo.value);
    return Ee(() => yt.activeId, (r) => {
      document.body.classList.toggle("has-card-fullscreen", !!r), document.body.dataset.page = r ? "daily" : "home";
    }, { immediate: !0, flush: "sync" }), Ye(() => {
      typeof document < "u" && (document.body.dataset.spa = "1");
      try {
        Qn.bindGlobalListener(), Ue.start(), Wi.start(), Un.init().catch((r) => console.warn("[Launcher] 初始化失败", r)), Ah(), typeof chrome < "u" && chrome?.runtime?.sendMessage && setTimeout(() => {
          try {
            chrome.runtime.sendMessage({ type: "cleanupNativeTabs" }, () => {
              chrome.runtime?.lastError;
            });
          } catch {
          }
        }, 400);
      } catch (r) {
        console.warn("[App] Runtime start error:", r);
      }
    }), Nt(() => {
      Ue.stop(), Un.stop(), Wi.stop(), document.body.classList.remove("has-card-fullscreen"), typeof document < "u" && o && (document.title = o);
    }), t({
      activeWorkspaceId: f,
      windowManagerController: Oe
    }), (r, h) => (c(), p("div", {
      id: "logicweaver-spa-root",
      class: "logicweaver-spa-root",
      "data-active-workspace": f.value || ""
    }, [
      q(dr),
      q(bl),
      q(Fu),
      q(Yu),
      n("nav", {
        id: "mac-dock",
        class: de(["mac-dock", "dock-" + s(so).position]),
        "aria-label": "快捷应用栏"
      }, [
        q(Cs)
      ], 2),
      q(Dh)
    ], 8, Eh));
  }
}), Wh = /* @__PURE__ */ Pe(Ph, [["__scopeId", "data-v-add79781"]]), Rh = {
  class: "endfield-stage",
  "aria-hidden": "true"
}, Nh = {
  class: "rhinelab-stage",
  "aria-hidden": "true"
}, Oh = { class: "rhine-scaler" }, Bh = { class: "rhine-center-group" }, Fh = { class: "rhine-auth-status" }, Hh = { class: "rhine-auth-text" }, Kh = ["hidden"], jh = { class: "rhine-cinema-caption" }, zh = /* @__PURE__ */ he({
  __name: "IntroAnimation",
  setup(e) {
    const t = j(window.innerHeight), o = j(window.innerWidth), i = j(!1), a = j(!1), l = j(10), g = j(1), f = j(0), r = /* @__PURE__ */ new Set();
    let h = 0, $ = () => {
    };
    const F = te(() => `${String(Math.round(lt.renderedProgress)).padStart(2, "0")}%`), m = te(() => {
      const M = lt.renderedProgress / 100 * t.value + 10;
      return `${Math.min(M, Math.max(0, t.value - 102)).toFixed(1)}px`;
    }), D = te(() => lt.renderedProgress >= 75 ? "START PROCESSING..." : lt.renderedProgress >= 35 ? "REQUEST RECEIVED" : "ID CONFIRMED : JOYCE MOORE"), v = te(() => lt.finished ? "身份验证通过 · 欢迎进入终端" : lt.status ? `身份信息确认 · ${lt.status.replace(/^.*?\/\s*/, "")}` : "身份信息确认：JOYCE MOORE"), w = te(() => String(Math.max(0.35, Math.min(o.value / 1920, t.value / 1080))));
    function S(M, k) {
      const L = window.setTimeout(() => {
        r.delete(L), M();
      }, k);
      r.add(L);
    }
    function y() {
      window.dispatchEvent(new CustomEvent("logicweaver:intro-complete"));
    }
    function _(M) {
      if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
        y();
        return;
      }
      const k = M ? 180 : 260, L = M ? 200 : 280, Q = performance.now(), R = (V) => {
        const N = V - Q, X = Math.min(1, N / k), me = 1 - Math.pow(1 - X, 3);
        if (l.value = 10 + me * Math.max(0, o.value - 10), N > k && (g.value = Math.max(0, 1 - (N - k) / L)), N >= k + L) {
          y();
          return;
        }
        h = requestAnimationFrame(R);
      };
      S(() => {
        h = requestAnimationFrame(R);
      }, M ? 60 : 120);
    }
    function x(M) {
      M || (i.value = !0), S(() => {
        a.value = !0, f.value = 6, g.value = 0, S(y, 380);
      }, M ? 40 : 420);
    }
    function B(M) {
      lt.style === "rhinelab" ? x(M) : _(M);
    }
    function H() {
      o.value = window.innerWidth, t.value = window.innerHeight;
    }
    function U(M) {
      lt.finished || (M.key === "Enter" || M.key === " " || M.key === "Escape") && (M.preventDefault(), wt.skip("KEYBOARD SKIP"));
    }
    return Ye(() => {
      document.documentElement.dataset.startupStyle = lt.style, document.documentElement.style.setProperty("--rhine-scale", w.value), window.addEventListener("resize", H, { passive: !0 }), window.addEventListener("keydown", U, !0), $ = Ra(B), ns();
    }), vo(() => {
      $(), window.removeEventListener("resize", H), window.removeEventListener("keydown", U, !0), cancelAnimationFrame(h);
      for (const M of r) clearTimeout(M);
      r.clear();
    }), (M, k) => (c(), p("div", {
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
        k[4] || (k[4] = Io('<section class="endfield-loader-brand"><span class="endfield-loader-kicker">DEEPSEEK HARNESS</span><strong>END</strong><strong>FIELD</strong><span class="endfield-loader-detail"><i class="endfield-loader-chevron"></i><span>EDGE INTELLIGENCE THEME</span><small>TERRA RESEARCH COMMISSION / BOOT SEQUENCE</small><span class="endfield-loader-squares"><i class="on"></i><i class="on"></i><i class="on"></i><i></i><i></i><i></i><i class="on"></i><i class="on"></i><i></i><i></i><i></i><i></i></span></span><em>OVER THE FRONTIER / INTO THE FRONT</em></section>', 1)),
        n("div", {
          class: "endfield-loader-wipe",
          style: xe({ width: `${l.value}px`, opacity: l.value > 10 ? 1 : 0 })
        }, null, 4)
      ]),
      n("div", Nh, [
        k[12] || (k[12] = Io('<div class="rhine-background"><svg viewBox="0 0 1920 1080" preserveAspectRatio="none"><g fill="none" stroke="#ffffff" stroke-width="2.5"><path class="rhine-drift-path1" d="M-210 705C-45 705 182 704 247 567C337 377 99 306 4 435S27 680 169 631C309 584 227 314 279 111S568-113 568-113"></path><path class="rhine-drift-path2" d="M1560-80C1374 114 1671 168 1601 323S1371 367 1431 480S1692 666 1559 787S1329 886 1498 1130"></path><circle class="rhine-drift-circle" cx="1450" cy="648" r="346"></circle><circle class="rhine-drift-circle2" cx="1450" cy="648" r="348"></circle></g></svg></div>', 1)),
        n("div", Oh, [
          k[10] || (k[10] = Io('<header class="rhine-brand"><h1>RHINE LAB</h1><div class="rhine-brand-sub">SYNTHESIZE INFORMATION</div><p class="rhine-brand-os"><span class="rhine-brand-analysis"><span style="left:2px;">A</span><span style="left:28px;">N</span><span style="left:55px;">A</span><span style="left:81px;">L</span><span style="left:103px;">Y</span><span style="left:129px;">S</span><span style="left:154px;">I</span><span style="left:166px;">S</span></span><b>OS</b></p></header>', 1)),
          n("button", {
            class: "rhine-skip",
            type: "button",
            title: "点击进入系统 (或按 Enter)",
            onClick: k[0] || (k[0] = (L) => s(wt).skip("ENTER SYSTEM"))
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
            class: de(["rhine-scan", { active: i.value }]),
            hidden: !i.value
          }, [...k[9] || (k[9] = [
            Io('<svg viewBox="0 0 1920 1080" aria-hidden="true"><g fill="none" stroke="#080a08" stroke-linecap="round"><circle class="rhine-scan-circle ring-outer" cx="960" cy="540" r="280" stroke-width="2.5"></circle><circle class="rhine-scan-circle ring-white" cx="960" cy="540" r="260" stroke="#fff" stroke-width="3.5"></circle><circle class="rhine-scan-circle ring-inner" cx="960" cy="540" r="220" stroke-width="2"></circle><circle class="rhine-orbit-dot dot-1" cx="960" cy="260" r="8" fill="#ed821b" stroke="none"></circle><circle class="rhine-orbit-dot dot-2" cx="960" cy="820" r="8" fill="#ed821b" stroke="none"></circle><circle class="rhine-scan-core" cx="960" cy="540" r="6" fill="#080a08" stroke="none"></circle></g></svg><span class="rhine-scan-label">PERMISSION AUTHORIZED</span>', 2)
          ])], 10, Kh),
          n("div", jh, u(v.value), 1),
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
}), Gh = /* @__PURE__ */ he({
  __name: "ProfileMenu",
  setup(e) {
    function t(o) {
      Fo.trigger(o);
    }
    return (o, i) => (c(), p(ee, null, [
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
}), Vh = /* @__PURE__ */ he({
  __name: "WorkspaceLaunchers",
  setup(e) {
    function t(o) {
      di.openWorkspace(o, !0);
    }
    return (o, i) => (c(), p(ee, null, [
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
      Hi(o.$slots, "default")
    ], 64));
  }
}), Uh = {
  key: 0,
  "aria-label": "AI 分析任务"
}, Yh = { role: "status" }, Xh = ["disabled"], qh = ["disabled"], Jh = /* @__PURE__ */ he({
  __name: "GitHubStatus",
  setup(e) {
    return (t, o) => s(rt).message || s(rt).busy ? (c(), p("section", Uh, [
      n("p", Yh, u(s(rt).repo ? `原任务仓库：${s(rt).repo}。 ` : "") + u(s(rt).message), 1),
      s(rt).busy ? (c(), p("button", {
        key: 0,
        type: "button",
        onClick: o[0] || (o[0] = (i) => s(et).stopAiAnalysis())
      }, "停止后续分析 / 中断等待")) : E("", !0),
      s(rt).uncertain ? (c(), p(ee, { key: 1 }, [
        o[5] || (o[5] = n("p", null, "AI 结果未确认，已阻止本页再次提交。请到供应商核对请求和计费；本页记录在整页关闭或重载后会丢失。", -1)),
        s(rt).unlockConfirmation ? (c(), p(ee, { key: 1 }, [
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
        ], 64)) : (c(), p("button", {
          key: 0,
          type: "button",
          disabled: s(rt).busy,
          onClick: o[1] || (o[1] = (i) => s(rt).unlockConfirmation = !0)
        }, "我已核对供应商记录", 8, Xh))
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
function Ri(e, t, o) {
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
}, tf = ["data-gh-tile", "data-gh-list-drop", "onDragover", "onDrop"], of = ["aria-label", "title", "onContextmenu", "onClick", "onPointerdown", "onKeydown"], nf = {
  key: 0,
  class: "gh-shortcut-count"
}, sf = {
  key: 1,
  class: "gh-shortcut-help"
}, af = ["disabled"], rf = ["data-gh-list-drop"], lf = { class: "gh-shortcut-help" }, cf = { class: "gh-folder-repo-grid" }, df = ["title", "onContextmenu", "onClick", "onPointerdown"], uf = {
  key: 0,
  class: "gh-shortcut-help"
}, pf = ["aria-label"], hf = { class: "gh-shortcut-menu-title" }, ff = ["disabled"], gf = /* @__PURE__ */ he({
  __name: "GitHubFolders",
  props: {
    active: { type: Boolean, default: !0 }
  },
  emits: ["select"],
  setup(e, { emit: t }) {
    const o = e, i = t, a = j(null), l = j(""), g = j(""), f = j([]), r = j(""), h = j(null), $ = te(() => h.value?.ownerKey === Be.ownerKey ? Be.repos.find((I) => I.full_name === h.value?.fullName) : void 0), F = te(() => !!($.value && Be.repoListNames.get($.value.full_name.toLowerCase())?.length));
    function m() {
      h.value = null;
    }
    const { menuRef: D, style: v } = ci({
      visible: () => o.active && !!$.value,
      anchor: () => h.value || { x: 0, y: 0 },
      dismiss: m
    });
    function w(I, O) {
      I.preventDefault(), I.stopPropagation(), o.active && (nt(), h.value = { fullName: O.full_name, ownerKey: Be.ownerKey, x: I.clientX, y: I.clientY });
    }
    function S() {
      const I = $.value;
      !I || !F.value || dt.busy || !o.active || (m(), X(I.full_name, "未分类"));
    }
    function y() {
      const I = $.value;
      m(), I && R(I);
    }
    let _ = 0, x = 0, B = Promise.resolve();
    const H = te(() => Zh(Be.repos, Be.lists, Be.repoListNames, f.value)), U = te(() => H.value.find((I) => I.kind === "folder" && I.list.id === l.value)), M = te(() => U.value?.kind === "folder" ? U.value.repos : []);
    function k(I) {
      return I.kind === "folder" ? { title: I.title, preview: I.repos.slice(0, 4).map(on), count: Math.max(I.repos.length, I.list.totalCount) } : void 0;
    }
    const L = () => Be.ownerKey ? `ghSidebarTileOrderV1:${Be.ownerKey}` : "";
    function Q() {
      ++_;
      const I = L(), O = [...f.value];
      I && (B = B.catch(() => {
      }).then(async () => {
        try {
          typeof chrome < "u" && chrome.storage?.local ? await chrome.storage.local.set({ [I]: O }) : localStorage.setItem(I, JSON.stringify(O)), I === L() && (r.value = "");
        } catch {
          I === L() && (r.value = "顺序暂未保存，本页仍可使用。");
        }
      }));
    }
    function R(I) {
      !o.active || Date.now() < z || (m(), l.value = "", i("select"), Vi.open(I.full_name, void 0, I));
    }
    function V(I) {
      if (!(!o.active || Date.now() < z)) {
        if (I.kind === "repo") {
          R(I.repo);
          return;
        }
        m(), l.value = l.value === I.list.id ? "" : I.list.id, Do.select(I.title), i("select");
      }
    }
    function N(I) {
      return o.active && !dt.busy && Ui.folders.some((O) => O.title === I && (O.kind === "custom" || O.kind === "uncategorized"));
    }
    function X(I, O) {
      N(O) && Be.repos.some((K) => K.full_name.toLowerCase() === I.toLowerCase()) && Do.dropRepository(I, O);
    }
    function me(I, O) {
      !N(O) || !Array.from(I.dataTransfer?.types || []).includes(ta) || (I.preventDefault(), I.stopPropagation(), I.dataTransfer && (I.dataTransfer.dropEffect = "move"), g.value = O);
    }
    function Ce(I, O) {
      g.value = "";
      const K = oa(I.dataTransfer);
      !K || !N(O) || (I.preventDefault(), I.stopPropagation(), X(K, O));
    }
    function Xe(I) {
      const O = I.currentTarget;
      O instanceof Node && I.relatedTarget instanceof Node && O.contains(I.relatedTarget) || (g.value = "");
    }
    const A = $e({ visible: !1, x: 0, y: 0, offsetX: 0, offsetY: 0, tile: null });
    let W = null, z = 0, ve = 0, ke = "", Te, we = null;
    function We() {
      we?.classList.remove("gh-sidebar-pointer-drop"), we = null;
    }
    function Ze(I, O) {
      if (I.button !== 0 || !o.active || dt.busy) return;
      nt(), m();
      const K = I.currentTarget.getBoundingClientRect();
      W = { pointer: I.pointerId, x: I.clientX, y: I.clientY, owner: Be.ownerKey, tile: O, original: [...f.value] }, A.x = I.clientX, A.y = I.clientY, A.offsetX = I.clientX - K.left, A.offsetY = I.clientY - K.top, A.tile = O, window.addEventListener("pointermove", Ot, { passive: !1 }), window.addEventListener("pointerup", Yt), window.addEventListener("pointercancel", nt);
    }
    function Ne(I, O) {
      Ze(I, { key: `repo:${O.full_name.toLowerCase()}`, kind: "repo", title: O.name, repo: O });
    }
    function Mt() {
      if (We(), g.value = "", !W || !A.visible) return;
      const I = document.elementFromPoint(A.x, A.y), O = I?.closest("[data-gh-list-drop]"), K = O?.dataset.ghListDrop;
      if (W.tile.kind === "repo" && K && N(K) && O && (!O.hasAttribute("data-gh-tile") || bs(O.getBoundingClientRect(), A.x, A.y))) {
        g.value = K, we = O, O.classList.add("gh-sidebar-pointer-drop");
        return;
      }
      const fe = I?.closest("[data-gh-tile]"), ft = fe?.dataset.ghTile;
      if (!ft || !fe || ft === W.tile.key || !ks(fe.getBoundingClientRect(), A.x, A.y) || ft === ke || Date.now() - ve < ws) return;
      const kt = H.value.map((Bt) => Bt.key);
      kt.includes(W.tile.key) && (f.value = Ri(kt, W.tile.key, ft), ke = ft, ve = Date.now());
    }
    function Ot(I) {
      !W || I.pointerId !== W.pointer || (A.x = I.clientX, A.y = I.clientY, !(!A.visible && Math.hypot(I.clientX - W.x, I.clientY - W.y) < ys) && (I.preventDefault(), A.visible || (++_, A.visible = !0, Te = setInterval(() => {
        const K = document.elementFromPoint(A.x, A.y)?.closest(".gh-bili-folder-list, .gh-shortcut-window-content");
        if (K) {
          const fe = K.getBoundingClientRect();
          A.y < fe.top + 36 ? K.scrollTop -= 12 : A.y > fe.bottom - 36 && (K.scrollTop += 12);
        }
        Mt();
      }, 32)), Mt()));
    }
    function Yt(I) {
      if (!W || I.pointerId !== W.pointer) return;
      A.visible && (A.x = I.clientX, A.y = I.clientY, Mt());
      const O = W, K = A.visible, fe = g.value;
      if (K) {
        I.preventDefault(), z = Date.now() + 300, O.owner === Be.ownerKey && fe && O.tile.kind === "repo" && X(O.tile.repo.full_name, fe);
        const ft = O.original.length !== f.value.length || O.original.some((kt, Bt) => f.value[Bt] !== kt);
        O.owner === Be.ownerKey && !fe && ft && Q();
      }
      fe && (f.value = O.original), wo();
    }
    function wo() {
      We(), clearInterval(Te), Te = void 0, window.removeEventListener("pointermove", Ot), window.removeEventListener("pointerup", Yt), window.removeEventListener("pointercancel", nt), A.visible = !1, A.tile = null, W = null, g.value = "", ke = "", ve = 0;
    }
    function nt() {
      W && (f.value = W.original, A.visible && (z = Date.now() + 300)), wo();
    }
    function Ho(I, O) {
      if (!I.altKey || !["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(I.key)) return;
      I.preventDefault();
      const K = H.value.map((Bt) => Bt.key), fe = K.indexOf(O.key), ft = I.key === "ArrowLeft" ? -1 : I.key === "ArrowRight" ? 1 : I.key === "ArrowUp" ? -2 : 2, kt = K[fe + ft];
      kt && (f.value = Ri(K, O.key, kt), Q());
    }
    function Ko(I) {
      const O = I.target;
      !W && !a.value?.contains(O) && !O?.closest("#gh-list-shortcut-window, .gh-shortcut-context-menu") && (l.value = "");
    }
    function bo(I) {
      I.key === "Escape" && (nt(), m(), l.value = "");
    }
    function jo() {
      document.hidden && (nt(), m(), l.value = "");
    }
    function Xt() {
      g.value = "";
    }
    Ee(() => Be.ownerKey, async () => {
      const I = ++x;
      nt(), m(), l.value = "", f.value = [], r.value = "";
      const O = L(), K = ++_;
      if (O)
        try {
          const fe = typeof chrome < "u" && chrome.storage?.local ? (await chrome.storage.local.get(O))[O] : JSON.parse(localStorage.getItem(O) || "[]");
          I === x && K === _ && (f.value = Qh(fe));
        } catch {
          I === x && (r.value = "图标顺序读取失败，可继续操作。");
        }
    }, { immediate: !0 });
    const zo = /* @__PURE__ */ new Set();
    return Ee(() => [o.active, Be.ownerKey, Be.loading], ([I, O, K]) => {
      !I || !O || K || zo.has(O) || (zo.add(O), et.ensureAllStarsLoaded());
    }, { immediate: !0 }), Ee(() => o.active, (I) => {
      I || (nt(), m(), l.value = "");
    }), Ee(() => U.value, (I) => {
      I || (l.value = "");
    }), Ee($, (I) => {
      I || m();
    }), Ye(() => {
      window.addEventListener("pointerdown", Ko), window.addEventListener("keydown", bo), window.addEventListener("blur", nt), window.addEventListener("dragend", Xt), window.addEventListener("drop", Xt), document.addEventListener("visibilitychange", jo);
    }), vo(() => {
      ++x, nt(), window.removeEventListener("pointerdown", Ko), window.removeEventListener("keydown", bo), window.removeEventListener("blur", nt), window.removeEventListener("dragend", Xt), window.removeEventListener("drop", Xt), document.removeEventListener("visibilitychange", jo);
    }), (I, O) => (c(), p("div", {
      ref_key: "root",
      ref: a,
      class: "gh-shortcut-sidebar"
    }, [
      s(dt).message || r.value ? (c(), p("p", ef, u(s(dt).message || r.value), 1)) : E("", !0),
      q(Oo, {
        name: "gh-shortcut",
        tag: "div",
        class: "gh-shortcut-grid"
      }, {
        default: It(() => [
          (c(!0), p(ee, null, be(H.value, (K) => (c(), p("div", {
            key: K.key,
            class: de(["gh-shortcut-cell", { "is-dragging": A.visible && A.tile?.key === K.key, "drop-into": K.kind === "folder" && g.value === K.title }]),
            "data-gh-tile": K.key,
            "data-gh-list-drop": K.kind === "folder" ? K.title : void 0,
            onDragover: (fe) => K.kind === "folder" && me(fe, K.title),
            onDragleave: Xe,
            onDrop: (fe) => K.kind === "folder" && Ce(fe, K.title)
          }, [
            n("button", {
              type: "button",
              class: "gh-shortcut-tile",
              "aria-label": K.kind === "folder" ? `打开本地分组 ${K.title}` : `查看仓库 ${K.repo.full_name}`,
              title: K.kind === "folder" ? `${K.title}（拖入将加入本地分组，保留其他归属）` : K.repo.full_name,
              onContextmenu: (fe) => K.kind === "repo" && w(fe, K.repo),
              onClick: (fe) => V(K),
              onPointerdown: (fe) => Ze(fe, K),
              onDragstart: O[0] || (O[0] = G(() => {
              }, ["prevent"])),
              onKeydown: (fe) => Ho(fe, K)
            }, [
              q(Ro, {
                link: K.kind === "repo" ? s(on)(K.repo) : void 0,
                folder: k(K)
              }, null, 8, ["link", "folder"]),
              K.kind === "folder" ? (c(), p("small", nf, u(Math.max(K.repos.length, K.list.totalCount)), 1)) : E("", !0)
            ], 40, of)
          ], 42, tf))), 128))
        ]),
        _: 1
      }),
      H.value.length ? E("", !0) : (c(), p("p", sf, u(s(Be).loading ? "正在读取仓库与列表…" : "暂无本地分组或未分类仓库"), 1)),
      (c(), pe(bt, { to: "body" }, [
        U.value && e.active ? (c(), pe(s($a), {
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
            l.value = "", m();
          })
        }, {
          "header-actions": It(() => [
            n("button", {
              type: "button",
              class: "gh-folder-delete-action",
              disabled: s(dt).busy,
              title: "删除本地分组（不会取消 Star）",
              onClick: O[1] || (O[1] = (K) => s(Do).delete(U.value.title))
            }, "删除分组", 8, af)
          ]),
          default: It(() => [
            n("div", {
              class: de(["gh-shortcut-window-content", { "drop-into": g.value === U.value.title }]),
              "data-gh-list-drop": U.value.title,
              onDragover: O[3] || (O[3] = (K) => me(K, U.value.title)),
              onDragleave: Xe,
              onDrop: O[4] || (O[4] = (K) => Ce(K, U.value.title))
            }, [
              n("p", lf, u(M.value.length) + " 个已加载仓库 · 可拖到其他文件夹以加入本地分组", 1),
              n("div", cf, [
                (c(!0), p(ee, null, be(M.value, (K) => (c(), p("div", {
                  key: K.full_name,
                  class: "gh-folder-repo-cell"
                }, [
                  n("button", {
                    type: "button",
                    class: "gh-shortcut-tile",
                    title: K.full_name,
                    onContextmenu: (fe) => w(fe, K),
                    onClick: (fe) => R(K),
                    onPointerdown: (fe) => Ne(fe, K),
                    onDragstart: O[2] || (O[2] = G(() => {
                    }, ["prevent"]))
                  }, [
                    q(Ro, {
                      link: s(on)(K)
                    }, null, 8, ["link"])
                  ], 40, df)
                ]))), 128))
              ]),
              M.value.length ? E("", !0) : (c(), p("p", uf, u(s(Be).loading ? "正在读取…" : "空文件夹，可拖入仓库"), 1))
            ], 42, rf)
          ]),
          _: 1
        }, 8, ["title"])) : E("", !0),
        $.value && e.active ? (c(), p("div", {
          key: 1,
          ref_key: "menuRef",
          ref: D,
          class: "gh-shortcut-context-menu",
          style: xe(s(v)),
          role: "menu",
          "aria-label": $.value.full_name + " 操作",
          onPointerdown: O[6] || (O[6] = G(() => {
          }, ["stop"])),
          onClick: O[7] || (O[7] = G(() => {
          }, ["stop"])),
          onContextmenu: O[8] || (O[8] = G(() => {
          }, ["prevent"]))
        }, [
          n("div", hf, u($.value.full_name), 1),
          n("button", {
            type: "button",
            role: "menuitem",
            onClick: y
          }, "查看仓库详情"),
          n("button", {
            type: "button",
            role: "menuitem",
            disabled: s(dt).busy || !F.value,
            title: "从所有本地分组移出，保留 GitHub 收藏",
            onClick: S
          }, "移到未分组", 8, ff)
        ], 44, pf)) : E("", !0),
        A.visible && A.tile ? (c(), p("div", {
          key: 2,
          class: "gh-shortcut-ghost gh-shortcut-tile",
          style: xe({ left: `${A.x - A.offsetX}px`, top: `${A.y - A.offsetY}px` })
        }, [
          q(Ro, {
            link: A.tile.kind === "repo" ? s(on)(A.tile.repo) : void 0,
            folder: k(A.tile)
          }, null, 8, ["link", "folder"])
        ], 4)) : E("", !0)
      ]))
    ], 512));
  }
}), mf = /* @__PURE__ */ Pe(gf, [["__scopeId", "data-v-0d779316"]]), vf = {
  id: "gh-hero-cover",
  class: "gh-bili-cover"
}, yf = { key: 0 }, wf = { key: 1 }, bf = {
  key: 2,
  class: "fo-folder-icon"
}, kf = { class: "gh-bili-heading" }, _f = { class: "gh-hero-title-row" }, Cf = ["title"], xf = ["role", "aria-live"], Lf = ["title"], $f = ["title", "aria-label"], Tf = { id: "gh-hero-desc" }, Sf = { class: "gh-bili-actions" }, If = ["title"], Mf = { class: "gh-batch-btn-text" }, Df = ["title"], Af = ["title"], Ef = /* @__PURE__ */ he({
  __name: "GitHubHero",
  emits: ["open-ai-settings"],
  setup(e, { emit: t }) {
    return (o, i) => (c(), p(ee, null, [
      n("div", vf, [
        s(Ft).kind === "all" ? (c(), p("span", yf, "⭐")) : s(Ft).kind === "uncategorized" ? (c(), p("span", wf, "📄")) : (c(), p("i", bf))
      ]),
      n("div", kf, [
        n("div", _f, [
          n("h3", {
            id: "gh-hero-title",
            title: s(Ft).title
          }, u(s(Ft).title), 9, Cf),
          s(jt).actionText ? (c(), p("div", {
            key: 0,
            class: de(["gh-hero-inline-status", { "is-error": s(jt).actionError }]),
            role: s(jt).actionError ? "alert" : "status",
            "aria-live": s(jt).actionError ? "assertive" : "polite",
            "aria-atomic": "true"
          }, [
            n("span", {
              class: "gh-hero-status-text",
              title: s(jt).actionText
            }, u(s(jt).actionText), 9, Lf),
            n("button", {
              type: "button",
              title: s(d)("github.hero.closeTip"),
              "aria-label": s(d)("github.hero.closeTip"),
              onClick: i[0] || (i[0] = (a) => s(si).update({ actionText: "", actionError: !1 }))
            }, "×", 8, $f)
          ], 10, xf)) : E("", !0)
        ]),
        n("p", Tf, u(s(Ft).description), 1)
      ]),
      n("div", Sf, [
        n("button", {
          id: "gh-batch-toggle-btn",
          type: "button",
          class: de(["gh-hero-btn gh-batch-toggle-btn", { active: s(Ft).batchMode }]),
          title: s(d)("github.hero.batchToggle"),
          onClick: i[1] || (i[1] = (a) => s(Ao).toggleBatch())
        }, [
          i[4] || (i[4] = n("span", { class: "gh-batch-btn-icon" }, "☑", -1)),
          n("span", Mf, u(s(Ft).batchMode ? s(d)("github.hero.batchBack") : s(d)("github.hero.batch")), 1)
        ], 10, If),
        n("button", {
          id: "gh-refresh-btn",
          type: "button",
          class: "gh-hero-btn",
          title: s(d)("github.hero.refreshTitle"),
          onClick: i[2] || (i[2] = (a) => s(Ao).refresh())
        }, u(s(d)("github.hero.refresh")), 9, Df),
        n("button", {
          id: "gh-hero-add-folder-btn",
          type: "button",
          class: "gh-hero-btn primary",
          title: s(d)("github.hero.addFolderTitle"),
          onClick: i[3] || (i[3] = (a) => s(Ao).createFolder())
        }, u(s(d)("github.hero.addFolder")), 9, Af)
      ])
    ], 64));
  }
}), Pf = /* @__PURE__ */ Pe(Ef, [["__scopeId", "data-v-1c3e37db"]]), ae = $e({ repo: "", text: "", baseline: "", busy: !1, message: "", storedValue: null });
function Ni(e, t = !1) {
  if (!e || ae.busy) return;
  if (ae.repo && ae.text !== ae.baseline) {
    ae.message = "请先保存或明确取消当前草稿，再编辑或清除其它备注。";
    return;
  }
  const o = et.remarks[e]?.userRemark, i = typeof o == "string" ? o : "";
  Object.assign(ae, {
    repo: e,
    baseline: i,
    text: t ? "" : i,
    storedValue: null,
    message: t ? "清除已准备；点击保存才会清除手写备注，AI 简介不变。" : "仅点击保存或 Enter 才写入；草稿只保留在本页内存。"
  });
}
function zn() {
  ae.busy || Object.assign(ae, { repo: "", text: "", baseline: "", storedValue: null, message: "" });
}
async function Gn() {
  if (ae.busy || !ae.repo) return;
  const { repo: e, text: t, baseline: o } = ae;
  ae.busy = !0;
  try {
    await et.updateRepoRemark(e, { userRemark: t.trim() }, o), Object.assign(ae, { repo: "", text: "", baseline: "", storedValue: null, message: `${e} 的备注已保存并回读核对。` });
  } catch (i) {
    ae.message = i instanceof Error ? i.message : "保存未确认，草稿保留，请先读取已保存值核对。";
  } finally {
    ae.busy = !1;
  }
}
async function Oi() {
  if (ae.busy || !ae.repo) return;
  const e = ae.repo;
  ae.busy = !0;
  try {
    const o = (await et.reloadRepoRemarks())[e]?.userRemark;
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
}, Bi = /* @__PURE__ */ he({
  __name: "GitHubRemarkEditor",
  props: {
    active: { type: Boolean }
  },
  setup(e) {
    const t = e, o = j(null);
    return Ye(() => {
      St(() => {
        t.active && !ae.busy && o.value?.focus();
      });
    }), (i, a) => (c(), p("div", {
      class: "gh-inline-remark-box",
      style: { "flex-wrap": "wrap", "max-width": "100%" },
      onClick: a[6] || (a[6] = G(() => {
      }, ["stop"]))
    }, [
      tt(n("input", {
        ref_key: "input",
        ref: o,
        "onUpdate:modelValue": a[0] || (a[0] = (l) => s(ae).text = l),
        class: "gh-inline-remark-input",
        type: "text",
        maxlength: "100",
        "aria-label": "手写仓库备注",
        placeholder: "备注说明…",
        disabled: s(ae).busy || !e.active,
        onKeydown: [
          a[1] || (a[1] = No(G((l) => !l.isComposing && e.active && s(Gn)(), ["prevent"]), ["enter"])),
          a[2] || (a[2] = No(G((l) => !l.isComposing && e.active && s(zn)(), ["prevent", "stop"]), ["esc"]))
        ]
      }, null, 40, Wf), [
        [fo, s(ae).text]
      ]),
      n("button", {
        type: "button",
        class: "gh-inline-remark-btn save",
        title: "保存备注",
        disabled: s(ae).busy || !e.active,
        onClick: a[3] || (a[3] = //@ts-ignore
        (...l) => s(Gn) && s(Gn)(...l))
      }, "✓", 8, Rf),
      n("button", {
        type: "button",
        class: "gh-inline-remark-btn cancel",
        title: "取消草稿",
        disabled: s(ae).busy || !e.active,
        onClick: a[4] || (a[4] = //@ts-ignore
        (...l) => s(zn) && s(zn)(...l))
      }, "✕", 8, Nf),
      n("button", {
        type: "button",
        disabled: s(ae).busy || !e.active,
        onClick: a[5] || (a[5] = //@ts-ignore
        (...l) => s(Oi) && s(Oi)(...l))
      }, "读取已保存值", 8, Of),
      s(ae).storedValue !== null ? (c(), p("p", Bf, "已保存值：" + u(s(ae).storedValue || "（空）"), 1)) : E("", !0)
    ]));
  }
}), Vn = $e({
  isOpen: !1,
  repository: null
}), Ff = {
  open(e) {
    Vn.repository = e, Vn.isOpen = !0;
  },
  close() {
    Vn.isOpen = !1;
  }
}, Hf = {
  key: 0,
  role: "status"
}, Kf = {
  key: 1,
  "aria-label": "未显示仓库的备注草稿"
}, jf = {
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
}, Uf = ["data-repo-name", "onClick", "onContextmenu", "onDragstart"], Yf = ["onClick"], Xf = { class: "gh-card-head" }, qf = ["checked", "onChange"], Jf = ["src"], Zf = ["href", "title"], Qf = { class: "owner" }, eg = { class: "gh-card-body" }, tg = { class: "gh-card-badges" }, og = ["title", "onClick"], ng = ["onClick"], ig = ["title", "onClick"], sg = { class: "gh-badge-remark-text" }, ag = {
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
}, gg = ["disabled"], mg = { class: "gh-page-info" }, vg = ["disabled"], yg = ["onClick"], wg = /* @__PURE__ */ he({
  __name: "GitHubRepositories",
  props: {
    active: { type: Boolean, default: !0 }
  },
  setup(e) {
    const t = e, o = te(() => !!ae.repo && !Ie.cards.some((M) => M.fullName === ae.repo)), i = $e({
      visible: !1,
      x: 0,
      y: 0,
      fullName: "",
      folders: [],
      hasRemark: !1,
      url: ""
    }), a = j(null), l = j(!1);
    function g(M, k) {
      const L = M.target;
      if (L instanceof Element) {
        if (Ie.batchMode) {
          if (L.closest(".fo-card-more,.gh-badge-folder,.gh-badge-remark,.gh-inline-remark-box")) return;
          M.preventDefault(), M.stopPropagation(), Et.toggleSelection(k.fullName);
          return;
        }
        L.closest("a,button,.gh-badge-folder,.gh-badge-remark,.fo-card-more,.gh-card-hole,.gh-card-checkbox,.gh-inline-remark-box") || (M.preventDefault(), M.stopPropagation(), Vi.open(k.fullName, void 0, k));
      }
    }
    function f(M, k) {
      if (!t.active) return;
      M.preventDefault(), M.stopPropagation();
      const L = 12, Q = 160, R = 280, V = Math.min(window.innerWidth - Q - L, Math.max(L, M.clientX)), N = Math.min(window.innerHeight - R - L, Math.max(L, M.clientY));
      i.x = V, i.y = N, i.fullName = k.fullName, i.folders = [...k.folders || (k.folder ? [k.folder] : [])], i.hasRemark = !!k.customRemark, i.url = k.url, i.visible = !0, a.value = null, l.value = V > window.innerWidth - 380;
    }
    function r(M, k) {
      f(k, M), a.value = "folder";
    }
    function h() {
      i.visible = !1, a.value = null;
    }
    function $(M) {
      i.folders.includes(M) ? i.folders = i.folders.filter((k) => k !== M) : i.folders.push(M), et.toggleRepoList(i.fullName, M);
    }
    function F() {
      i.folders = [], et.clearRepoLists(i.fullName), h();
    }
    function m(M) {
      if (!t.active) return;
      const k = typeof M == "string" ? M : M?.fullName || i.fullName;
      h(), Ni(k);
    }
    function D() {
      if (!t.active) return;
      const M = i.fullName;
      h(), Ni(M, !0);
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
    function S() {
      const M = et.findRepository(i.fullName);
      h(), M && Ff.open({
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
    Ee(() => t.active, (M) => {
      window.removeEventListener("pointerdown", x), window.removeEventListener("keydown", B), h(), M && (window.addEventListener("pointerdown", x), window.addEventListener("keydown", B));
    }, { immediate: !0 }), Nt(() => {
      window.removeEventListener("pointerdown", x), window.removeEventListener("keydown", B);
    });
    function H(M, k) {
      const L = M.target;
      if (L instanceof Element && L.closest("button,a,input,textarea,select,[contenteditable='true']")) {
        M.preventDefault();
        return;
      }
      Et.startDrag(k, M);
    }
    const U = te(() => {
      if (Ie.cards.length > 0) return !1;
      const M = jt.actionText || "";
      return !!(M.includes("正在读取") || M.includes("正在加载") || M.includes("正在统计") || M.includes("正在同步"));
    });
    return (M, k) => (c(), p(ee, null, [
      s(ae).message ? (c(), p("p", Hf, u(s(ae).repo ? `${s(ae).repo}：` : "") + u(s(ae).message), 1)) : E("", !0),
      o.value ? (c(), p("section", Kf, [
        n("p", null, "备注草稿：" + u(s(ae).repo) + "（仓库不在当前列表中，草稿仍保留）", 1),
        q(Bi, {
          active: t.active
        }, null, 8, ["active"])
      ])) : E("", !0),
      s(Ie).searchMessage ? (c(), p("div", jf, [
        n("span", zf, u(s(Ie).searchMessage), 1),
        n("button", {
          type: "button",
          class: "gh-tab",
          style: { padding: "2px 8px", "font-size": "11px", "margin-left": "8px" },
          onClick: k[0] || (k[0] = (L) => s(Et).resetSearch())
        }, "清空搜索")
      ])) : E("", !0),
      U.value ? (c(), p("div", Gf, [...k[17] || (k[17] = [
        n("div", {
          class: "gh-spinner",
          "aria-hidden": "true"
        }, null, -1),
        n("span", { class: "gh-loading-label" }, "正在读取 GitHub 仓库列表中…", -1)
      ])])) : s(Ie).emptyMessage ? (c(), p("p", Vf, u(s(Ie).emptyMessage), 1)) : E("", !0),
      s(Ie).cards.length ? (c(), p("div", {
        key: 5,
        class: de(["repos gh-grid", { "gh-batch-active": s(Ie).batchMode }])
      }, [
        (c(!0), p(ee, null, be(s(Ie).cards, (L) => (c(), p("article", {
          key: L.fullName,
          class: de(["repo gh-card", { selected: L.selected }]),
          "data-repo-name": L.fullName,
          draggable: "true",
          onClick: (Q) => g(Q, L),
          onContextmenu: (Q) => f(Q, L),
          onDragstart: (Q) => H(Q, L.fullName)
        }, [
          n("button", {
            class: "fo-card-more",
            type: "button",
            "aria-label": "更多操作",
            title: "更多操作",
            onClick: G((Q) => f(Q, L), ["stop"])
          }, "⋮", 8, Yf),
          n("div", Xf, [
            n("label", {
              class: "gh-card-hole",
              title: "点击勾选此仓库",
              onClick: k[1] || (k[1] = G(() => {
              }, ["stop"]))
            }, [
              n("input", {
                class: "gh-card-checkbox",
                type: "checkbox",
                checked: L.selected,
                onChange: (Q) => s(Et).setSelection(L.fullName, Q.target.checked)
              }, null, 40, qf),
              k[18] || (k[18] = n("span", { class: "gh-hole-inner" }, null, -1))
            ]),
            n("img", {
              class: "gh-owner-avatar",
              src: L.avatarUrl || "assets/github-star.svg",
              alt: "",
              loading: "lazy",
              referrerpolicy: "no-referrer",
              onError: k[2] || (k[2] = (Q) => Q.target.src = "assets/github-star.svg")
            }, null, 40, Jf),
            n("a", {
              href: L.url,
              target: "_blank",
              rel: "noreferrer",
              class: "name",
              title: L.fullName
            }, [
              n("span", Qf, u(L.owner) + "/", 1),
              ot(u(L.name), 1)
            ], 8, Zf)
          ]),
          n("div", eg, [
            n("div", tg, [
              L.folders && L.folders.length ? (c(!0), p(ee, { key: 0 }, be(L.folders, (Q) => (c(), p("span", {
                key: Q,
                class: "gh-badge-folder",
                title: `本地分组：${Q}（点击管理所属列表）`,
                onClick: G((R) => r(L, R), ["stop"])
              }, " 📁 " + u(Q), 9, og))), 128)) : (c(), p("span", {
                key: 1,
                class: "gh-badge-folder uncat",
                title: "未分类（点击加入 本地分组）",
                onClick: G((Q) => r(L, Q), ["stop"])
              }, " ＋ 未分类 ", 8, ng)),
              s(ae).repo === L.fullName ? (c(), pe(Bi, {
                key: 2,
                active: t.active
              }, null, 8, ["active"])) : L.customRemark ? (c(), p("span", {
                key: 3,
                class: "gh-badge-remark",
                title: `备注：${L.customRemark}（点击就地修改）`,
                onClick: G((Q) => m(L), ["stop"])
              }, [
                k[19] || (k[19] = n("span", { class: "gh-badge-remark-icon" }, "💬", -1)),
                n("span", sg, u(L.customRemark), 1)
              ], 8, ig)) : E("", !0)
            ]),
            L.descriptionKind === "analyzing" ? (c(), p("p", ag, [...k[20] || (k[20] = [
              n("span", { class: "gh-ai-sparkle" }, "✨", -1),
              ot(" 正在使用 AI 分析仓库并提炼中文介绍…", -1)
            ])])) : L.descriptionKind === "ai" ? (c(), p("p", rg, [
              k[21] || (k[21] = n("span", { class: "gh-ai-tag-flag" }, "🤖", -1)),
              ot(u(L.description), 1)
            ])) : L.descriptionKind === "plain" ? (c(), p("p", {
              key: 2,
              class: "desc",
              title: L.description
            }, u(L.description), 9, lg)) : (c(), p("p", cg, "暂无描述"))
          ]),
          n("div", dg, [
            n("span", ug, "★ " + u(L.stars), 1),
            L.language ? (c(), p("span", pg, u(L.language), 1)) : E("", !0),
            L.updated ? (c(), p("span", hg, "更新 " + u(L.updated), 1)) : E("", !0)
          ])
        ], 42, Uf))), 128))
      ], 2)) : E("", !0),
      s(Ie).totalPages > 1 ? (c(), p("div", fg, [
        n("button", {
          class: "gh-page-btn",
          type: "button",
          disabled: s(Ie).page <= 1,
          onClick: k[3] || (k[3] = (L) => s(Et).changePage(s(Ie).page - 1))
        }, "‹ 上一页", 8, gg),
        n("span", mg, u(s(Ie).page) + " / " + u(s(Ie).totalPages) + " · 共 " + u(s(Ie).totalItems) + " 个" + u(s(Ie).serverPaged ? ` · 已加载 ${s(Ie).loadedItems}` : ""), 1),
        n("button", {
          class: "gh-page-btn",
          type: "button",
          disabled: s(Ie).page >= s(Ie).totalPages,
          onClick: k[4] || (k[4] = (L) => s(Et).changePage(s(Ie).page + 1))
        }, "下一页 ›", 8, vg)
      ])) : E("", !0),
      (c(), pe(bt, { to: "body" }, [
        t.active && i.visible ? (c(), p("div", {
          key: 0,
          class: "fo-cover-context-menu gh-repo-context-menu",
          style: xe({ left: `${i.x}px`, top: `${i.y}px` }),
          onClick: k[15] || (k[15] = G(() => {
          }, ["stop"])),
          onContextmenu: k[16] || (k[16] = G(() => {
          }, ["prevent"]))
        }, [
          n("div", {
            class: de(["gh-menu-has-sub", { "is-active": a.value === "folder" }]),
            onMouseenter: k[6] || (k[6] = (L) => a.value = "folder")
          }, [
            k[22] || (k[22] = n("button", {
              class: "fo-cover-menu-item with-sub-arrow",
              type: "button"
            }, [
              n("span", null, "📁 所属 本地分组"),
              n("span", { class: "sub-arrow" }, "›")
            ], -1)),
            n("div", {
              class: de(["gh-sub-flyout", { "flyout-left": l.value }]),
              onClick: k[5] || (k[5] = G(() => {
              }, ["stop"]))
            }, [
              n("button", {
                class: de(["fo-cover-menu-item", { primary: i.folders.length === 0 }]),
                type: "button",
                onClick: F
              }, u(i.folders.length === 0 ? "✓ " : "  ") + "＋ 设为未分类（清空列表） ", 3),
              (c(!0), p(ee, null, be(s(et).cats, (L) => (c(), p("button", {
                key: L,
                class: de(["fo-cover-menu-item", { primary: i.folders.includes(L) }]),
                type: "button",
                onClick: (Q) => $(L)
              }, u(i.folders.includes(L) ? "✓ " : "  ") + "📁 " + u(L), 11, yg))), 128))
            ], 2)
          ], 34),
          n("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: k[7] || (k[7] = (L) => a.value = null),
            onClick: k[8] || (k[8] = (L) => m())
          }, " ✏️ 编辑备注… ", 32),
          n("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: k[9] || (k[9] = (L) => a.value = null),
            onClick: S
          }, " 创建任务 ", 32),
          q(Ta, {
            label: "💬 发送到聊天室",
            visible: i.visible,
            onOpen: k[10] || (k[10] = (L) => a.value = null),
            onSelect: w
          }, null, 8, ["visible"]),
          i.hasRemark ? (c(), p("button", {
            key: 0,
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: k[11] || (k[11] = (L) => a.value = null),
            onClick: D
          }, " 🗑️ 清除备注 ", 32)) : E("", !0),
          n("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: k[12] || (k[12] = (L) => a.value = null),
            onClick: v
          }, " 📋 复制仓库链接 ", 32),
          n("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: k[13] || (k[13] = (L) => a.value = null),
            onClick: y
          }, " ↗ 在 GitHub 打开 ", 32),
          n("button", {
            class: "fo-cover-menu-item danger",
            type: "button",
            onMouseenter: k[14] || (k[14] = (L) => a.value = null),
            onClick: _
          }, " ⭐ 取消 Star ", 32)
        ], 36)) : E("", !0)
      ]))
    ], 64));
  }
}), bg = /* @__PURE__ */ Pe(wg, [["__scopeId", "data-v-f2eeeb72"]]), kg = { class: "gh-batch-bar-left" }, _g = { class: "gh-batch-count-tip" }, Cg = { id: "gh-batch-selected-count" }, xg = {
  key: 0,
  "aria-label": "批量归属列表确认"
}, Lg = ["disabled"], $g = ["disabled"], Tg = { class: "gh-batch-bar-right" }, Sg = ["disabled"], Ig = ["disabled"], Mg = ["disabled"], Dg = /* @__PURE__ */ he({
  __name: "GitHubBatchBar",
  props: {
    active: { type: Boolean, default: !0 }
  },
  setup(e) {
    const t = e, o = Fs(), i = j(null), a = te(() => {
      const f = [
        { value: "", label: "未分类（清空所选仓库的所有列表所属）", icon: "🌐" }
      ];
      return Ui.folders.filter((r) => r.kind === "custom").forEach((r) => {
        f.push({ value: r.title, label: r.title, icon: "📁" });
      }), f;
    });
    function l() {
      t.active && (o.value = et.prepareBatchMove(), i.value = null);
    }
    async function g() {
      const f = o.value, r = i.value;
      if (!t.active || !f || r === null || dt.busy) return;
      await f.submit(r) && o.value === f && (o.value = void 0);
    }
    return Ee(() => t.active && Zt.active, (f) => {
      f || (o.value = void 0);
    }), (f, r) => (c(), p(ee, null, [
      n("div", kg, [
        n("button", {
          type: "button",
          class: "gh-batch-action-btn",
          id: "gh-batch-select-all-btn",
          onClick: r[0] || (r[0] = (h) => s(Eo).toggleSelectAll())
        }, u(s(Zt).allSelected ? "取消全选" : "全选"), 1),
        n("span", _g, [
          r[5] || (r[5] = ot("已选择 ", -1)),
          n("b", Cg, u(s(Zt).selectedCount), 1),
          r[6] || (r[6] = ot(" 项", -1))
        ])
      ]),
      o.value ? (c(), p("section", xg, [
        n("p", null, "仅操作打开选择器时的 " + u(o.value.names.length) + " 个仓库；后来勾选的仓库不加入。", 1),
        n("details", null, [
          r[7] || (r[7] = n("summary", null, "查看本次仓库清单", -1)),
          n("ul", null, [
            (c(!0), p(ee, null, be(o.value.names, (h) => (c(), p("li", { key: h }, u(h), 1))), 128))
          ])
        ]),
        q(ji, {
          "model-value": i.value ?? "",
          options: a.value,
          disabled: s(dt).busy,
          placeholder: "请选择目标列表",
          size: "sm",
          style: { "max-width": "260px" },
          "onUpdate:modelValue": r[1] || (r[1] = (h) => i.value = String(h))
        }, null, 8, ["model-value", "options", "disabled"]),
        n("button", {
          type: "button",
          disabled: !t.active || s(dt).busy || i.value === null,
          onClick: g
        }, "确认加入列表", 8, Lg),
        n("button", {
          type: "button",
          disabled: s(dt).busy,
          onClick: r[2] || (r[2] = (h) => o.value = void 0)
        }, "取消", 8, $g)
      ])) : E("", !0),
      n("div", Tg, [
        n("button", {
          type: "button",
          class: "gh-batch-action-btn",
          id: "gh-batch-move-btn",
          disabled: !t.active || s(dt).busy || s(Zt).selectedCount === 0,
          title: "固定当前选择，批量加入所选本地分组",
          onClick: l
        }, " 📁 归入本地分组 ", 8, Sg),
        n("button", {
          type: "button",
          class: "gh-batch-action-btn",
          id: "gh-batch-ai-btn",
          disabled: s(Zt).selectedCount === 0,
          title: "批量使用 AI 生成中文介绍",
          onClick: r[3] || (r[3] = (h) => s(Eo).analyzeAi())
        }, " ✨ 批量 AI 分析 ", 8, Ig),
        n("button", {
          type: "button",
          class: "gh-batch-action-btn danger",
          id: "gh-batch-unstar-btn",
          disabled: s(Zt).selectedCount === 0,
          title: "从 GitHub 批量取消 Star 收藏",
          onClick: r[4] || (r[4] = (h) => s(Eo).unstar())
        }, " 🗑 取消收藏 ", 8, Mg)
      ])
    ], 64));
  }
}), Ag = Y(() => import("./GitHubWorkspaceCard-4VfGVxZQ.js")), Eg = Y(() => import("./NotificationCenter-C3BNKSZm.js")), Pg = Y(() => import("./TabManagerPanel-CyWThUtp.js")), Wg = Y(() => import("./BookmarkNoteMenu-pL-bPpp8.js")), Rg = Y(() => import("./BookmarkPanel-gno_DEbD.js")), Ng = Y(() => import("./LauncherDialogs-h8VyfY7L.js")), Og = Y(() => import("./SettingsDialog-Ckeh7ayF.js")), Bg = Y(() => import("./SettingsView-BarYeH6J.js")), Fg = Y(() => import("./ClockSettingsMenu-BEHwxAO2.js")), Hg = Y(() => import("./BiliTheaterDialog-BygqqAqB.js")), Kg = Y(() => import("./BiliMiniPlayer-CsEkbRxk.js")), jg = Y(() => import("./BiliMessagePanel-Dp9TCw5T.js")), zg = Y(() => import("./ModelPricingCard-zj4vXOfv.js")), Gg = Y(() => import("./BilibiliWorkspace-CsAWQInh.js")), Vg = Y(() => import("./YouTubeCard-DW1Sz7WN.js").then((e) => e.Y)), Ug = Y(() => import("./AihotFeed-cA69tOuR.js")), Yg = Y(() => import("./GitHubTrending-CixJSw-9.js")), Xg = Y(() => import("./AiDialog-BmH1XcQX.js")), qg = Y(() => import("./AihotViewer-Beh8FWe7.js")), Jg = Y(() => import("./NavWheelOverlay-CqU4GEoh.js")), Zg = Y(() => import("./StandaloneHost-CFR1i_g8.js")), Qg = Y(() => import("./LauncherFolderDialog-CxSztkLz.js")), em = Y(() => import("./LauncherMenus-C0UK23U2.js"));
function le(e, t, o, i) {
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
      const g = l.innerHTML, f = oi(o);
      f.config.errorHandler = (r, h, $) => {
        console.error(`LogicWeaver Vue feature failed: ${t.id} (${$})`, r), l.dataset.vueError = "1";
      };
      try {
        f.mount(l), i?.setMounted?.(!0);
      } catch (r) {
        throw i?.setMounted?.(!1), l.innerHTML = g, r;
      }
      return () => {
        i?.setMounted?.(!1), f.unmount();
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
      if (!wt.enabled) {
        t?.remove(), document.body.classList.remove("is-starting");
        return;
      }
      if (!t) return;
      const o = oi(zh);
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
  }), le(e, { id: "spa-app", title: "纯血 SPA 单根调度器", order: 15, root: "vue-spa-root", capabilities: ["ui:spa-root", "workspace:keepalive"] }, Wh), document.getElementById("vue-spa-root") || le(e, { id: "bili-companions", title: "b站伴随窗口", order: 19, root: "vue-bili-companions-root", capabilities: ["ui:dock-companion"] }, Zg), le(e, { id: "notifications", title: "通知中心", order: 20, root: "vue-notification-root", capabilities: ["ui:toast", "notification:dedupe"] }, xs), le(e, { id: "profile-menu", title: "头像右键菜单", order: 21, root: "bili-profile-menu", capabilities: ["ui:profile-menu", "profile:actions"] }, Gh, Fo), le(e, { id: "workspace-launchers", title: "常用工作区启动项", order: 22, root: "workspace-launchers", capabilities: ["ui:workspace-launchers", "workspace:launch"] }, Vh, di), le(e, { id: "mac-dock", title: "底部快捷应用 Dock 栏", order: 23, root: "mac-dock", capabilities: ["ui:mac-dock", "dock:navigate"] }, Cs, Lt), le(e, { id: "hero-clock", title: "首屏中央时钟", order: 26, root: "hero-clock", capabilities: ["ui:hero-clock", "clock:read"] }, ms), le(e, { id: "search-box", title: "首屏搜索框", order: 27, root: "search", capabilities: ["ui:search-box", "search:actions"] }, Fi), le(e, { id: "home-music", title: "首屏音乐播放器", order: 28, root: "task-thread-home", capabilities: ["ui:home-music", "music:playback"] }, vs, Qe), le(e, { id: "launcher-groups", title: "常用网站分组架", order: 29, root: "launcher-groups", capabilities: ["ui:launcher-groups", "launcher:navigate"] }, _s, ze), le(e, { id: "weather-widget", title: "首屏天气小部件", order: 39, root: "weather-body", capabilities: ["ui:weather-widget", "weather:read"] }, gs), le(e, { id: "github-workspace", title: "GitHub 独立页 Vue 工作台", order: 49, root: "vue-github-workspace-root", capabilities: ["ui:github-workspace"] }, Ag), le(e, { id: "github-status", title: "GitHub 同步状态", order: 50, root: "vue-github-status-root", capabilities: ["ui:github-status", "github:sync-read"] }, Jh, si), le(e, { id: "github-folders", title: "GitHub 文件夹导航", order: 55, root: "gh-folder-list", capabilities: ["ui:github-folders", "github:categorize-drop"] }, mf, Do), le(e, { id: "github-hero", title: "GitHub 分类摘要", order: 56, root: "gh-hero", capabilities: ["ui:github-summary", "github:actions"] }, Pf, Ao), le(e, { id: "github-repositories", title: "GitHub 仓库列表", order: 57, root: "vue-github-repositories-root", capabilities: ["ui:github-repositories", "github:repository-actions", "github:paging"] }, bg, Et), le(e, { id: "github-batch-bar", title: "GitHub Star 批量操作工具栏", order: 58, root: "gh-batch-bar", capabilities: ["ui:github-batch-bar", "github:batch-actions"] }, Dg, Eo), le(e, { id: "notification-center", spaOwned: !0, title: "持久通知中心", order: 71, root: "vue-notification-center-root", capabilities: ["ui:notification-history", "notification:read"] }, Eg, Wt), le(e, { id: "tab-manager", spaOwned: !0, title: "独立标签页管理", order: 71, root: "vue-tab-manager-root", capabilities: ["ui:tab-manager", "tabs:explicit"] }, Pg, rs), le(e, { id: "bookmark-menu", title: "书签上下文操作与备注菜单", order: 72, root: "vue-bookmark-menu-root", capabilities: ["ui:bookmark-menu", "bookmark:edit"] }, Wg, ii), le(e, { id: "launcher-dialogs", title: "快捷启动器管理弹窗族", order: 73, root: "vue-launcher-dialogs-root", capabilities: ["ui:launcher-dialogs", "launcher:manage"] }, Ng, Yi), le(e, { id: "launcher-folder-dialog", title: "大文件夹展开视窗", order: 74, root: "vue-launcher-folder-root", capabilities: ["ui:launcher-folder", "launcher:folder-dialog"] }, Qg, Xi), le(e, { id: "launcher-menus", title: "启动器快捷上下文菜单族", order: 76, root: "vue-launcher-menus-root", capabilities: ["ui:launcher-menus", "launcher:context-menu"] }, em, ai), le(e, { id: "bookmark-panel", title: "浏览器书签侧边滑动视窗", order: 77, root: "vue-bookmark-panel-root", capabilities: ["ui:bookmark-panel", "bookmarks:panel"] }, Rg, vn), le(e, { id: "bookmark-folder-strip", spaOwned: !0, title: "顶栏书签快捷文件夹横条", order: 78, root: "vue-bookmark-folder-strip-root", capabilities: ["ui:bookmark-folder-strip", "bookmarks:strip"] }, null, pn), le(e, { id: "settings-page", title: "独立设置页 Vue 工作台", order: 79, root: "vue-options-root", capabilities: ["ui:settings-page"] }, Bg), le(e, { id: "settings-dialog", title: "全局设置中心视窗", order: 80, root: "vue-settings-dialog-root", capabilities: ["ui:settings-dialog", "settings:manage"] }, Og, yn), le(e, { id: "clock-settings-menu", spaOwned: !0, title: "中央时钟偏好配置菜单", order: 82, root: "vue-clock-settings-root", capabilities: ["ui:clock-settings", "clock:preference-edit"] }, Fg, Vt), le(e, { id: "bili-theater-dialog", title: "Bilibili 沉浸剧场与评论区弹窗", order: 85, root: "vue-bili-theater-root", capabilities: ["ui:bili-theater", "bili:playback"] }, Hg, Po), le(e, { id: "bili-mini-player", title: "Bilibili 悬浮迷你播放器", order: 85, root: "vue-bili-mini-player-root", capabilities: ["ui:bili-mini-player", "bili:playback"] }, Kg), le(e, { id: "ai-dialog", title: "AI 助手对话框与知识点抽屉", order: 86, root: "vue-ai-dialog-root", capabilities: ["ui:ai-dialog", "ai:chat"] }, Xg, ui), le(e, { id: "aihot-viewer", spaOwned: !0, title: "AI HOT 资讯文章阅读器", order: 88, root: "vue-aihot-viewer-root", capabilities: ["ui:aihot-viewer", "viewer:aihot"] }, qg, li), le(e, { id: "nav-wheel", title: "辐射状快捷动作轮盘与悬浮球", order: 95, root: "vue-nav-wheel-root", capabilities: ["ui:nav-wheel", "nav:radial-menu"] }, Jg, Ae), le(e, { id: "bili-message-panel", spaOwned: !0, title: "Bilibili 消息与互动通知中心", order: 102, root: "vue-bili-message-panel-root", capabilities: ["ui:bili-message-panel", "bili:messages"] }, jg, zt), le(e, { id: "pricing-radar", spaOwned: !0, title: "模型插件 (AI 定价与排行榜)", order: 108, root: "vue-pricing-root", capabilities: ["ui:pricing-radar", "pricing:read"] }, zg, Qi), le(e, { id: "bili-favorites", spaOwned: !0, title: "b站插件 Vue 外壳", order: 110, root: "vue-bili-favorites-root", capabilities: ["ui:bili-favorites-shell", "bilibili:favorites"] }, Gg, Ji), le(e, { id: "youtube-card", spaOwned: !0, title: "YouTube 订阅与探索工作台", order: 111, root: "vue-youtube-root", capabilities: ["ui:youtube-card", "youtube:updates"] }, Vg, es), le(e, { id: "aihot-feed", spaOwned: !0, title: "AI HOT 资讯流全功能聚合看板", order: 112, root: "vue-aihot-root", capabilities: ["ui:aihot-feed", "aihot:aggregate"] }, Ug, Zi), le(e, { id: "github-trending", spaOwned: !0, title: "GitHub 趋势榜与热门流", order: 114, root: "vue-github-trending-root", capabilities: ["ui:github-trending", "github:trending"] }, Yg, ls);
}
Rs();
const kn = Da(wn);
ar(wn, kn);
rr(wn);
tm(kn);
ni.loadBookmarks();
(async () => {
  document.getElementById("vue-bili-favorites-root") && !document.getElementById("vue-spa-root") && await import("./bilibili-channel.service-DC9LFPwN.js"), await Wa(), await kn.startEager(), wt.notifyBootReady();
})().catch((e) => console.error("[LogicWeaver] 页面启动失败", e));
window.addEventListener("pagehide", () => {
  kn.stopAll();
}, { once: !0 });
export {
  ki as C,
  Np as D,
  mf as G,
  Ro as L,
  ys as T,
  zh as _,
  ls as a,
  Pf as b,
  rs as c,
  Vt as d,
  _i as e,
  Lm as f,
  Ff as g,
  Re as h,
  ui as i,
  Ue as j,
  Ae as k,
  mn as l,
  bs as m,
  ne as n,
  ks as o,
  ws as p,
  Vh as q,
  Gh as r,
  fs as s,
  ln as t,
  ei as u,
  Vn as v,
  je as w,
  hs as x,
  wn as y
};
