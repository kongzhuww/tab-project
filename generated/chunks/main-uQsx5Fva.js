import { l as Un, S as Hi, i as Ns } from "./SearchBox-BfwgHiDO.js";
/* empty css                */
import { c as oi, r as $e, a as Rt, w as Pe, b as j, d as he, o as c, e as pe, f as It, u as i, g as p, h as n, i as E, T as Os, t as u, F as Q, j as be, k as G, l as yt, m as No, n as tt, v as Bs, p as ot, q as ho, s as J, x as Fs, y as te, z as Nt, A as fo, B as xe, C as de, D as Xe, E as X, G as St, H as Io, I as Ki, J as Oo, K as Ue, L as mo, M as ji, N as Hs } from "./vendor-vue-D8gPZiit.js";
import { W as un, t as oo, p as Cn, n as Le, a as Fo, b as Wt, h as et, m as xt, c as fi, d as Yn, s as xn, e as gi, f as Ks, g as js, i as zs, j as Gs, C as zi, k as oe, l as Gi, o as ko, q as Vi, r as Tt, u as Vs, v as vo, w as Ui, x as no, y as Go, z as Us, A as Ys, B as Vo, D as Xs } from "./view-styles-65F2WFR1.js";
import { l as qs, r as Js, G as Zs, a as Ae, b as vn, c as ni, s as Qs, d as ea, e as ii, f as pn, g as si, h as Do, i as Ao, j as Et, k as Eo, m as io, n as Fe, o as mi, p as ta, q as rt, t as Ge, u as dt, v as Yi, w as Te, x as Xi, R as oa, y as na, z as Ft, A as jt, B as Me, C as Jt } from "./search.service-DtP_26rI.js";
import { l as ze, a as qi, b as Ji, c as ai, d as ue, f as _t, e as _o } from "./store-I3ZATrZ9.js";
import { c as ia, a as sa, t as aa, b as ra, d as la, e as ca, f as so, g as da } from "./calendar.service-UohbQJyU.js";
import { w as Be, s as ri, P as ua, i as hn, D as Ln, a as vi, g as st, p as pa, L as ha, b as Ht, c as fa, d as $n, t as wi, e as ga, f as ma, h as Bo, l as Zi } from "./window-manager.store-BTl-n_d_.js";
import { s as wn, a as va, b as wa } from "./stickers.service-CM18JWYX.js";
import { b as Po, a as ya, c as ba } from "./up-group-manager-store-Bbwt0u-M.js";
import { biliMessagePanelController as zt, biliMessagePanelState as ka } from "./message-panel-store-CnEgiNiF.js";
import { b as Qi, r as _a, a as Co } from "./bili-favorites-store-CExtRYhd.js";
import { a as li, b as es, c as Ca } from "./aihot-feed-store-BhbhXdBq.js";
import { y as ts } from "./youtube-store-CnZHK3Uu.js";
import { R as xa, u as ci, a as yi } from "./InlineEditStatus.vue_vue_type_style_index_0_scoped_28642927_lang-YyXyKV6C.js";
import { t as d, c as mt, _ as We } from "./_plugin-vue_export-helper-CKPfm2Rd.js";
import { f as ao, C as La } from "./ChatShareMenu--9zuD19D.js";
import { k as $a, m as Sa } from "./core-utils-DYgSCp9X.js";
import { t as gt } from "./together-listen.store-Cw1BTOHC.js";
import { A as Ta } from "./AppWindowFrame-Dj22Xf4y.js";
/* empty css                                                                             */
const Ia = /^[a-z][a-z0-9]*(?:[.:-][a-z0-9]+)*$/;
function Ma() {
  const e = /* @__PURE__ */ new Map(), t = /* @__PURE__ */ new Map();
  function o(l) {
    if (!l || !Ia.test(l.id)) throw new TypeError(`Invalid command id: ${l?.id || ""}`);
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
      const D = r(m), v = D.title.toLocaleLowerCase(), y = `${D.id} ${v} ${D.category} ${D.description} ${D.keywords.join(" ")}`.toLocaleLowerCase();
      if (!x.every((w) => y.includes(w))) return null;
      let T = 0;
      for (const w of x)
        D.id === w ? T += 200 : D.id.startsWith(w) && (T += 120), v === w ? T += 160 : v.startsWith(w) ? T += 100 : v.includes(w) && (T += 60), D.keywords.some((_) => _.toLocaleLowerCase().startsWith(w)) && (T += 40);
      return { item: D, score: T };
    }).filter((m) => !!m);
    return F.sort((m, D) => D.score - m.score || m.item.title.localeCompare(D.item.title, "zh")), Object.freeze(F.slice(0, Math.max(1, h)).map((m) => m.item));
  }
  return Object.freeze({ register: o, execute: a, cancel: s, has: (l) => e.has(l), list: g, search: f });
}
const yn = Ma(), Da = /^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/;
function Aa(e) {
  const t = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map();
  function r(m) {
    if (!m || !Da.test(m.id)) throw new TypeError(`Invalid feature id: ${m?.id || ""}`);
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
    const v = new AbortController(), y = Object.freeze({
      signal: v.signal,
      commands: e,
      getRoot: (w) => document.getElementById(w)
    }), T = Promise.resolve().then(() => D.mount(y)).then((w) => (s.delete(m), o.set(m, { cleanup: w, controller: v }), w), (w) => {
      throw s.delete(m), a.set(m, w), v.abort(), w;
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
    const m = typeof document < "u" && !!(document.getElementById("vue-spa-root") || document.getElementById("logicweaver-spa-root")), D = [...t.values()].filter((T) => !(!T.eager || !m && T.roots && T.roots.length > 0 && !T.roots.some((_) => !!document.getElementById(_)))).sort((T, w) => (T.order || 100) - (w.order || 100)), y = (await Promise.allSettled(D.map((T) => f(T.id)))).flatMap((T, w) => T.status === "rejected" ? [{ id: D[w].id, reason: T.reason }] : []);
    y.length && console.warn("LogicWeaver Vue features failed to mount", y);
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
const Ea = localStorage.getItem("startupAnimationStyle") || localStorage.getItem("logicweaverStartupStyle") || "endfield", bi = (() => {
  try {
    const e = localStorage.getItem("showStartupAnimation"), t = localStorage.getItem("logicweaverEndfieldLoader"), o = e ?? t;
    return o === "1" || o === "true";
  } catch {
    return !1;
  }
})(), ie = $e({
  enabled: bi,
  style: Ea === "rhinelab" ? "rhinelab" : "endfield",
  renderedProgress: 4,
  targetProgress: 4,
  status: "CORE SHELL...",
  finished: !bi,
  exiting: !1,
  forced: !1
});
let go = 0, fn = 4, os = performance.now(), Xn = 0, nn = null, qn = !1;
function ns(e) {
  const t = e - os, o = Xn ? Math.min(1, t / Xn) : 1, s = o * o * (3 - 2 * o);
  ie.renderedProgress = fn + (ie.targetProgress - fn) * s, o < 1 && !ie.finished ? go = requestAnimationFrame(ns) : go = 0;
}
function sn(e, t) {
  if (!ie.enabled || ie.finished) return;
  const o = Math.max(ie.targetProgress, Math.max(4, Math.min(100, Number(e) || 4)));
  t && (ie.status = t), fn = ie.renderedProgress, ie.targetProgress = o, os = performance.now(), Xn = Math.max(280, Math.min(920, 220 + Math.abs(o - fn) * 7.5)), cancelAnimationFrame(go), go = requestAnimationFrame(ns);
}
function bn(e = "Ready", t = !1) {
  ie.finished || (ie.finished = !0, ie.forced = t, ie.status = e, ie.targetProgress = 100, cancelAnimationFrame(go), go = 0, ie.renderedProgress = 100, nn?.(t));
}
function Pa(e = "KEYBOARD SKIP") {
  bn(e, !0);
}
function Wa() {
  ie.enabled || bn("BOOT COMPLETE", !0);
}
function is() {
  !ie.enabled || ie.finished || qn || (qn = !0, sn(38, "INITIALIZING CORE SHELL..."), setTimeout(() => {
    ie.finished || sn(76, "SYNTHESIZING RUNTIME...");
  }, 400), setTimeout(() => {
    ie.finished || sn(100, ie.style === "rhinelab" ? "ID CONFIRMED : JOYCE MOORE" : "TERRA LINK READY / 终端就绪");
  }, 900), setTimeout(() => {
    ie.finished || bn("BOOT COMPLETE / 首页就绪", !1);
  }, 1650));
}
async function Ra() {
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
  skip: Pa,
  notifyBootReady: Wa,
  async playIntro(e) {
    if (e?.style && (ie.style = e.style), typeof document < "u" && (document.documentElement.dataset.startupStyle = ie.style, document.documentElement.classList.remove("skip-endfield-loader"), document.body.classList.add("is-starting")), ie.enabled = !0, ie.finished = !1, ie.forced = !!e?.force, ie.renderedProgress = 4, ie.targetProgress = 4, qn = !1, typeof document < "u") {
      let t = document.getElementById("endfield-loader");
      if (!t) {
        t = document.createElement("div"), t.id = "endfield-loader", t.className = "endfield-loader notranslate", document.body.appendChild(t);
        const { default: o } = await import("./IntroAnimation-CkcHPz8H.js"), s = oi(o), a = () => {
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
function Na(e) {
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
function Oa() {
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
const Ba = () => {
  const e = Oa();
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
}, q = $e(Ba());
let Sn = null, Tn = null;
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
    Sn ? Sn() : typeof window < "u" && window.dispatchEvent(new CustomEvent("logicweaver:weather-refresh"));
  },
  changeLocation(e) {
    Tn ? Tn(e) : typeof window < "u" && window.dispatchEvent(new CustomEvent("logicweaver:weather-change-location", { detail: { clientX: e?.clientX, clientY: e?.clientY } }));
  },
  setRefreshAction(e) {
    Sn = e;
  },
  setChangeLocationAction(e) {
    Tn = e;
  }
}, Fa = () => ({
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
}), Ie = $e(Fa());
let In = null;
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
    In ? In(e) : window.dispatchEvent(new CustomEvent("logicweaver:clock-open-settings", { detail: { clientX: e?.clientX, clientY: e?.clientY } }));
  },
  setOpenSettingsAction(e) {
    In = e;
  }
}, Ha = [
  { id: "ai", title: "AI 助手" },
  { id: "todoist", title: "Todoist" },
  { id: "stickers", title: "表情包" },
  { id: "calcom", title: "预约" },
  { id: "wallpaper", title: "壁纸库" }
], Ka = () => ({
  mounted: !1,
  visible: !1,
  items: [...Ha]
}), Mn = $e(Ka());
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
}, Dn = $e({ visible: !1, pendingWrites: 0 });
async function ja(e) {
  if (Dn.pendingWrites) throw new Error("壁纸操作正在处理，未自动排队");
  Dn.pendingWrites++;
  try {
    return await e();
  } finally {
    Dn.pendingWrites--;
  }
}
const ki = {
  openDialog() {
    Be.open("wallpaper");
  },
  closeDialog() {
    Be.close("wallpaper");
  },
  resetDefault() {
    return ja(() => un.clearWallpaper());
  }
}, _i = [
  { id: "mono", label: "极简等宽", font: "ui-monospace, 'SF Mono', 'JetBrains Mono', Menlo, Consolas, monospace", sample: "15:50:10" },
  { id: "sans", label: "现代无衬线", font: "-apple-system, BlinkMacSystemFont, 'Segoe UI Variable Display', 'Segoe UI', Roboto, 'PingFang SC', sans-serif", sample: "15:50:10" },
  { id: "din", label: "经典几何", font: "'DIN Alternate', 'DIN Pro', 'Franklin Gothic Medium', Futura, sans-serif", sample: "15:50:10" },
  { id: "digital", label: "数码管等宽", font: "'Courier New', Courier, monospace", sample: "15:50:10" },
  { id: "impact", label: "硬派力量", font: "Impact, 'Arial Black', 'Trebuchet MS', sans-serif", sample: "15:50:10" },
  { id: "serif", label: "典雅衬线", font: "'Playfair Display', Georgia, 'Times New Roman', serif", sample: "15:50:10" },
  { id: "rounded", label: "圆润亲和", font: "'Quicksand', 'Comic Sans MS', 'Segoe UI', sans-serif", sample: "15:50:10" }
], Ci = [
  { id: "white", label: "纯净皓白 (默认)", hex: "#ffffff" },
  { id: "black", label: "曜石极黑", hex: "#0f172a" },
  { id: "gold", label: "香槟金砂", hex: "#f59e0b" },
  { id: "cyan", label: "科技青蓝", hex: "#38bdf8" },
  { id: "emerald", label: "翡翠竹绿", hex: "#10b981" },
  { id: "rose", label: "淡雅樱粉", hex: "#fb7185" }
], Cm = [
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
let An = null;
const Gt = {
  state: De,
  setMounted(e) {
    De.mounted = e;
  },
  onAction(e) {
    An = e;
  },
  dispatch(e, t) {
    if (An)
      return An(e, t);
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
    const t = _i.find((o) => o.id === e);
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
    const t = Ci.find((o) => o.id === e);
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
        const s = _i.find((a) => a.id === e);
        s && ro.applyConfig({ fontFamily: s.font });
      }
      const t = localStorage.getItem("lw_clock_color");
      if (t) {
        De.color = t;
        const s = Ci.find((a) => a.id === t);
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
let En = null, an = !1;
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
async function za() {
  try {
    const e = await rn("poll");
    rs(e);
  } catch {
  }
}
async function Ga(e, t) {
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
      await rn("send", { text: o }), await za();
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
    Ga(e, t);
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
}), Xo = /* @__PURE__ */ new Set(), Va = {
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
}, ln = $e({ isOpen: !1 }), ls = {
  state: ln,
  open() {
    ln.isOpen = !0;
  },
  close() {
    ln.isOpen = !1;
  }
}, Wn = "biliProfileCacheV1", kt = "biliLocallyKnownMessageIdsV1", qo = "biliMessageUserCacheV1", xo = "githubKnownReleaseVersionsV1", Jo = "customNewtabAvatar", xi = "biliToastKnownCountsV1";
class Ua {
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
    if (oo.avatarUrl = a, oo.userName = t?.uname || "哔哩哔哩用户", oo.buttonTitle = "通知中心", Cn.avatarUrl = a, Cn.userName = t?.uname || "用户", Cn.mid = t?.mid, typeof document < "u") {
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
        this.applyBiliProfile(s, m), typeof chrome < "u" && chrome?.storage?.local && await chrome.storage.local.set({ [Wn]: { profile: s, unread: m, savedAt: Date.now() } }), this.checkAndNotifyBiliInteractions(m);
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
      this.biliToastKnownCounts = { ...o }, typeof chrome < "u" && chrome?.storage?.local && chrome.storage.local.set({ [xi]: this.biliToastKnownCounts }).catch(() => {
      });
      return;
    }
    const s = o.private - Number(this.biliToastKnownCounts.private || 0);
    o.like - Number(this.biliToastKnownCounts.like || 0);
    const a = o.reply - Number(this.biliToastKnownCounts.reply || 0), r = o.at - Number(this.biliToastKnownCounts.at || 0);
    o.system - Number(this.biliToastKnownCounts.system || 0), this.biliToastKnownCounts = { ...o }, typeof chrome < "u" && chrome?.storage?.local && chrome.storage.local.set({ [xi]: this.biliToastKnownCounts }).catch(() => {
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
      Wn,
      kt,
      qo,
      xo,
      Jo
    ]).then((t) => {
      this.customAvatar = t[Jo] || "", this.locallyKnownIds = t[kt] && typeof t[kt] == "object" ? t[kt] : {}, this.userCache = t[qo] && typeof t[qo] == "object" ? t[qo] : {}, this.githubKnownVersions = t[xo] && typeof t[xo] == "object" ? t[xo] : {};
      const o = t[Wn];
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
const Li = new Ua(), we = $e({ open: !1, loading: !1, error: "", mid: "", name: "", face: "", sign: "", followed: !1, submitting: !1, left: 12, top: 12, videos: [] });
let Zo = null;
const cn = {
  state: we,
  open(e, t) {
    Zo = t, Object.assign(we, { open: !0, loading: !0, error: "", submitting: !1, videos: [] }, e);
  },
  update(e) {
    Object.assign(we, e);
  },
  close() {
    we.submitting || (we.open = !1, Zo = null);
  },
  async toggleFollow() {
    if (!(!Zo || we.submitting)) {
      we.submitting = !0;
      try {
        const e = !we.followed;
        await Zo(e) && (we.followed = e);
      } finally {
        we.submitting = !1;
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
}), Rn = /* @__PURE__ */ new Set();
let Zt;
const Nn = new xa();
async function Ya(e, t) {
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
function $i(e, t) {
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
async function Xa(e, t) {
  const o = new Date(Date.now() - e * 864e5).toISOString().slice(0, 10);
  let s = "";
  try {
    const g = await qs(t), { data: f } = await Js(`/search/repositories?q=${encodeURIComponent(`is:public created:>${o}`)}&sort=stars&order=desc&per_page=30`, { headers: g, signal: t, maxBytes: 2 * 1024 * 1024 });
    if (t.throwIfAborted(), !Array.isArray(f?.items)) throw new Error("Invalid search response");
    return {
      repos: f.items.slice(0, 30).map((l) => $i(l, !1)),
      sourceText: `GitHub Search：UTC 日期 ${o} 之后新建的仓库，按累计 Star 排序；不是官方 Trending 榜。${f.incomplete_results ? " API 标记为不完整结果。" : ""}`
    };
  } catch (g) {
    t.throwIfAborted(), s = g instanceof Zs ? g.message : "主源响应格式无效。";
  }
  const a = e === 1 ? "daily" : e === 7 ? "weekly" : "monthly", r = await Ya(`https://ghapi.h11.dev/repositories?since=${a}`, t);
  if (t.throwIfAborted(), !Array.isArray(r)) throw new Error("Invalid fallback response");
  return {
    repos: r.slice(0, 30).map((g) => $i(g, !0)),
    sourceText: `GitHub Search 不可用：${s} 改用第三方 ghapi.h11.dev 的 ${a} 趋势快照（不发送账号凭据）；口径与新建仓库搜索不同，源更新时间未提供。`
  };
}
const cs = {
  get state() {
    return Ne;
  },
  // View attachment permits starting reads; detaching does not cancel an
  // already requested read. Range changes still replace the old session.
  attachView(e) {
    return Zt = e, !e.aborted && !Ne.hasLoaded && !Nn.pending && this.refresh(), () => {
      Zt === e && (Zt = void 0);
    };
  },
  switchTab(e) {
    Ne.currentTab = e, this.dispatch("switch-tab", e);
  },
  async switchRange(e, t) {
    !Zt || Zt.aborted || ![1, 7, 30].includes(e) || e === Ne.sinceDays || (Nn.cancel(), Object.assign(Ne, {
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
    const e = Zt;
    if (!e || e.aborted || Ne.isLoading) return;
    const t = Ne.sinceDays, o = Nn.begin({
      timeoutMs: 45e3,
      isCurrent: () => Ne.sinceDays === t,
      onStop: (a) => {
        Ne.isLoading = !1, a === "timeout" && (Ne.errorMessage = "数据源读取超过整体45秒上限，请手动刷新；没有继续请求备用源。");
      }
    }), s = o.current;
    if (s()) {
      Ne.isLoading = !0, Ne.errorMessage = "";
      try {
        const a = await o.wait(() => Xa(t, o.signal));
        if (!s()) return;
        Ne.repos = a.repos, Ne.sourceText = a.sourceText, Ne.fetchedAt = Date.now(), Ne.hasLoaded = !0;
      } catch {
        s() && (Ne.errorMessage = Ne.hasLoaded ? "刷新失败，保留同一时间范围的上次读取结果；请检查网络或额度后手动刷新。" : "数据源读取失败或超时；未使用内置样例，请稍后手动刷新。");
      } finally {
        o.finish() && (Ne.isLoading = !1, this.dispatch("refresh"));
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
let Si = null;
function qa(e, t) {
  if (typeof e != "number" || !t)
    return pi();
  const o = 160, s = 160, a = 26, r = 154, g = 360 / t, f = e - g / 2, l = e + g / 2, h = f * Math.PI / 180, x = l * Math.PI / 180, F = o + a * Math.cos(h), m = s + a * Math.sin(h), D = o + r * Math.cos(h), v = s + r * Math.sin(h), y = o + a * Math.cos(x), T = s + a * Math.sin(x), w = o + r * Math.cos(x), _ = s + r * Math.sin(x), L = g > 180 ? 1 : 0, B = `M ${F.toFixed(1)} ${m.toFixed(1)} L ${D.toFixed(1)} ${v.toFixed(1)} A ${r} ${r} 0 ${L} 1 ${w.toFixed(1)} ${_.toFixed(1)} L ${y.toFixed(1)} ${T.toFixed(1)} A ${a} ${a} 0 ${L} 0 ${F.toFixed(1)} ${m.toFixed(1)} Z`, H = `M ${D.toFixed(1)} ${v.toFixed(1)} A ${r} ${r} 0 ${L} 1 ${w.toFixed(1)} ${_.toFixed(1)}`;
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
      x1: parseFloat(y.toFixed(1)),
      y1: parseFloat(T.toFixed(1)),
      x2: parseFloat(w.toFixed(1)),
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
    } : ne.hub = Jn();
  },
  setBeam(e, t) {
    ne.beam = qa(e, t);
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
    Si = e;
  },
  dispatch(e, t) {
    Si?.(e, t);
  }
}, ds = [
  { id: "daily-bilibili", title: "b站插件", desc: "B站收藏夹与追番视频", icon: "assets/bilibili.svg" },
  { id: "daily-aihot", title: "ai hot插件", desc: "全网 AI 与前沿科技资讯", icon: "assets/nav-aihot.svg" },
  { id: "folder", title: "常用网站", desc: "点击展开快捷网站子轮盘", icon: "assets/nav-folder.svg", mode: "shortcuts" },
  { id: "card-github", title: "github插件", desc: "GitHub 趋势与星标项目", icon: "assets/nav-github.svg" },
  { id: "launcher", title: "首页", desc: "返回主屏常用应用台", icon: "assets/nav-home.svg" }
];
function Ja() {
  return ds.filter((e) => e.mode || e.id === "launcher" || hn(e.id));
}
function Za() {
  return ua.filter((e) => e.kind === "module" && hn(e.id)).map((e) => ({
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
let Zn = [], Wo = ds, Ct = { x: 400, y: 300 }, us = !1, Lo = !1, On = null, $o = null, pt = !1;
const Qa = $e(/* @__PURE__ */ new Set()), er = /* @__PURE__ */ new Map();
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
  e === "shortcuts" && (t = [...Zn], t.push({
    id: "toggle-edit-shortcuts",
    title: pt ? d("navwheel.finishEdit") : d("navwheel.editSites"),
    desc: pt ? d("navwheel.finishEditDesc") : d("navwheel.editSitesDesc"),
    icon: pt ? "✅" : "✏️"
  })), Wo = e === "tools" ? Za() : e === "shortcuts" ? [
    ...t,
    { id: "back-to-main", title: d("navwheel.back"), desc: d("navwheel.backDesc"), icon: "🔙", mode: "main" }
  ] : Ja();
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
function gn(e) {
  ne.mode = e, ht();
}
function Vt() {
  Ee.collapse(), ps(ne.ballPosition.x, ne.ballPosition.y), Ee.setVisibility(us);
}
function eo(e = ne.ballPosition.x, t = ne.ballPosition.y, o = "main") {
  Ee.expand(void 0, void 0, o), ps(e, t), ht(), Ee.setVisibility(!0);
}
function tr(e) {
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
  if (!(e.tool && !hn(e.tool) || !e.url && !e.mode && e.id !== "launcher" && !hn(e.id))) {
    if (e.mode) {
      gn(e.mode);
      return;
    }
    if (Vt(), e.url) {
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
async function or(e) {
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
async function nr(e) {
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
function Ii(e) {
  Ct = { x: e.clientX, y: e.clientY };
}
function Mi(e) {
  e.button === 1 && (e.preventDefault(), e.stopPropagation(), Ct = { x: e.clientX, y: e.clientY }, ne.isExpanded ? Vt() : eo(e.clientX, e.clientY));
}
function Di(e) {
  e.button === 1 && e.preventDefault();
}
function Ai(e) {
  if (e.key === "Escape") {
    if (pt) {
      e.preventDefault(), e.stopPropagation(), pt = !1, Qa.clear(), er.clear(), ht(), Le.show({
        appName: d("navwheel.appName"),
        title: d("navwheel.exitedEditing"),
        duration: 1500
      });
      return;
    }
    if (!ne.isExpanded || ri.active) return;
    e.preventDefault(), e.stopPropagation(), ne.mode === "shortcuts" ? gn("main") : Vt();
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
function sr(e) {
  const t = e.customIcon || e.icon;
  if (t && typeof t == "string" && !/google\.com\/s2\/favicons|icons\.duckduckgo/i.test(t))
    return t;
  if (e.url) {
    const o = Ae.getCachedIcon(e.url);
    if (o) return o;
    const s = ir(e.url);
    if (s) return s;
  }
  return e.icon || "🔗";
}
const Ye = {
  async start() {
    if (!Lo) {
      Lo = !0, On = Pe(mt, () => {
        ne.isExpanded && ht();
      }), Ct = { x: Math.round(window.innerWidth / 2), y: Math.round(window.innerHeight / 2) }, Ee.setActionHandler((e, t) => {
        if (e === "hub:click")
          ne.isExpanded ? ne.mode === "shortcuts" ? gn("main") : Vt() : eo();
        else if (e === "sector:click" || e === "container:click") {
          const o = Wo.find((s) => s.id === t?.id || e === "container:click" && s.id === ne.activeSectorId);
          o && tr(o);
        } else if (e === "sector:hover") {
          const o = ne.sectors.find((s) => s.id === t?.id);
          o && (Ee.setHub({ icon: o.icon, title: o.title, desc: o.desc, active: !0 }), Ee.setActiveSector(o.id), Ee.setBeam(o.angleDeg, Wo.length));
        } else e === "sector:leave" && (Ee.setActiveSector(null), Ee.setBeam(null, 0), Ee.setHub(ne.mode === "shortcuts" ? { icon: "🔙", title: d("navwheel.shortcuts") } : ne.mode === "tools" ? { icon: "🧰", title: d("navwheel.tools") } : null));
      }), window.addEventListener("logicweaver:dock-modules-changed", Ti), window.addEventListener("pointermove", Ii, { passive: !0 }), window.addEventListener("mousedown", Mi, !0), window.addEventListener("auxclick", Di, !0), window.addEventListener("keydown", Ai, !0), $o = (e, t) => {
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
    Lo = !1, On?.(), On = null, Ee.setActionHandler(null), window.removeEventListener("logicweaver:dock-modules-changed", Ti), window.removeEventListener("pointermove", Ii), window.removeEventListener("mousedown", Mi, !0), window.removeEventListener("auxclick", Di, !0), window.removeEventListener("keydown", Ai, !0), $o && Pt()?.onChanged?.removeListener($o), $o = null;
  },
  async loadShortcuts() {
    try {
      const e = await Pt()?.local?.get(["siteShelfLinks", "logicweaverNavWheelShortcutsV1"]);
      if (!Lo) return;
      const t = e?.siteShelfLinks?.length ? e.siteShelfLinks : e?.logicweaverNavWheelShortcutsV1;
      Zn = (Array.isArray(t) ? t : []).map((o, s) => ({
        id: String(o.id || `wheel-${s}`),
        title: String(o.title || o.url || d("navwheel.site")),
        desc: String(o.url || ""),
        url: String(o.url || ""),
        icon: sr(o)
      })), ne.mode === "shortcuts" && ht();
    } catch (e) {
      console.warn("[NavWheel] 读取快捷方式失败", e);
    }
  },
  open(e, t) {
    eo(e ?? Ct.x, t ?? Ct.y);
  },
  close: Vt,
  get isEditingShortcuts() {
    return pt;
  },
  isLinkInWheel(e) {
    return e ? Zn.some((t) => t.url === e) : !1;
  },
  toggleEditingShortcuts: hs,
  handleLinkSelection: or,
  removeShortcut: nr,
  toggle(e = !1) {
    ne.isExpanded ? Vt() : e ? eo(Ct.x, Ct.y) : eo();
  },
  toggleTools(e = !0) {
    ne.isExpanded && ne.mode === "tools" ? Vt() : eo(
      e ? Ct.x : ne.ballPosition.x,
      e ? Ct.y : ne.ballPosition.y,
      "tools"
    );
  },
  setMode(e) {
    gn(e);
  }
};
class lo {
  constructor() {
    this.activeShortcuts = { ...Ln }, this.isListenerBound = !1, this.storageListenerBound = !1, this.shortcutReadVersion = 0, this.initShortcuts();
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
    const { optionsService: s, SHORTCUT_STORAGE_KEY: a } = await import("./options.service-vESKdxQ-.js").then((x) => x.g), g = (await chrome.storage.local.get(a))[a], f = { ...g || {}, [t]: o }, l = this.shortcutReadVersion, h = await s.saveSettings(
      { [a]: f },
      { [a]: g }
    );
    l === this.shortcutReadVersion && (++this.shortcutReadVersion, this.applyShortcutOverrides(h[a]));
  }
  applyShortcutOverrides(t) {
    const o = t && typeof t == "object" && !Array.isArray(t) ? Object.entries(t).filter((s) => Object.prototype.hasOwnProperty.call(Ln, s[0]) && typeof s[1] == "string") : [];
    this.activeShortcuts = { ...Ln, ...Object.fromEntries(o) };
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
    if (!t || !vi(t)) return !1;
    if (st(t))
      return Be.handleToolClick(t), !0;
    switch (t) {
      case "bookmarks":
        return vn.toggle(), !0;
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
        if (ri.active || t.defaultPrevented || t.isComposing || t.repeat || t.target && (t.target.matches("input, textarea, select") || t.target.isContentEditable) && !t.altKey && !t.ctrlKey && !t.metaKey)
          return;
        const s = pa(t);
        if (!s) return;
        const a = s.toLowerCase();
        for (const [r, g] of Object.entries(this.activeShortcuts))
          if (!(!g || !vi(r)) && g.toLowerCase().replace(/^cmd\+/, "meta+") === a) {
            t.preventDefault(), t.stopPropagation(), this.triggerToolShortcut(r);
            break;
          }
      },
      !0
    ));
  }
}
const Qn = lo.getInstance();
class co {
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
const ar = co.getInstance(), Ei = [
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
    const v = Math.round(s.daily?.temperature_2m_max?.[0] ?? r), y = Math.round(s.daily?.temperature_2m_min?.[0] ?? r), T = d("weather.tempRange", { cond: a.label, max: v, min: y }), w = {
      cityName: o.name || t,
      currentEmoji: a.emoji,
      currentTemp: r,
      subText: T,
      rainText: x,
      hours: h,
      days: m
    };
    if (ut.ready(w, t), s.daily?.time) {
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
    if (!s) return Ei.slice(0, o);
    const a = [];
    for (const r of Ei) {
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
function rr(e, t) {
  window.LogicWeaverIntro = wt, window.LogicWeaverStartupIntro = wt, window.LogicWeaverNotifications = Le, window.LogicWeaverWindowManager = Be, window.LogicWeaverWindowTabs = Be, window.LogicWeaverDomFreezer = ha, window.LogicWeaverWallpaperService = un, window.LogicWeaverLauncherService = Ae, window.LogicWeaverLauncherRuntime = Un, window.LogicWeaverProfileService = Li;
  try {
    Li.init();
  } catch (o) {
    console.error("[ProfileService] init failed:", o);
  }
  window.LogicWeaverBookmarksService = ni, window.LogicWeaverCalendarService = ia, window.LogicWeaverWeather = ut, window.LogicWeaverWeatherService = to, window.LogicWeaverClock = ro, window.LogicWeaverSearch = Qs, window.LogicWeaverSearchService = ea, Object.defineProperty(window, "LogicWeaverAiHotService", {
    configurable: !0,
    get: () => {
      import("./aihot.service-DHdofX6S.js").then(({ aiHotService: o }) => {
        window.LogicWeaverAiHotService = o;
      });
    }
  }), window.LogicWeaverHomeMusic = et, window.LogicWeaverLauncherGroups = ze, window.LogicWeaverProfileMenu = Fo, window.LogicWeaverWorkspaceLaunchers = di, window.LogicWeaverMacDock = xt, window.LogicWeaverFullscreen = ao, window.enterFullscreenCard = (o) => ao.enter(o), window.exitFullscreenCard = () => ao.exit(), window.cycleFullscreenCard = () => ao.cycle(), window.LogicWeaverPageVisibility = ar, window.LogicWeaverBackgroundLibrary = ki, window.LogicWeaverNotificationCenter = Wt, window.LogicWeaverBookmarkMenu = ii, window.LogicWeaverBookmarkPanel = vn, window.LogicWeaverBookmarkFolderStrip = pn, window.LogicWeaverLauncherDialogs = qi, window.LogicWeaverLauncherFolder = Ji, window.LogicWeaverLauncherMenus = ai, window.LogicWeaverSettings = wn, window.LogicWeaverClockSettings = Gt, window.LogicWeaverBiliTheater = Po, window.LogicWeaverBilibiliService = fi, window.getBiliJct = () => fi.getBiliJct(), window.LogicWeaverBiliMiniPlayer = Yn, window.openBiliMiniPlayer = (o) => Yn.openVideo(o), window.LogicWeaverAiDialog = ui, window.LogicWeaverAihotViewer = li, window.LogicWeaverNavWheel = Ee, window.openNavWheel = (o, s) => Ye.open(o, s), window.closeNavWheel = () => Ye.close(), window.toggleNavWheel = (o) => Ye.toggle(o), window.toggleToolWheel = (o) => Ye.toggleTools(o), window.setNavWheelMode = (o) => Ye.setMode(o), window.LogicWeaverShortcuts = Qn, window.triggerToolShortcut = (o) => Qn.triggerToolShortcut(o), window.LogicWeaverCommands = e, window.LogicWeaverFeatures = t, window.LogicWeaverCalendarView = sa, window.LogicWeaverGitHubStatus = si, window.LogicWeaverGitHubFolders = Do, window.LogicWeaverGitHubHero = Ao, window.LogicWeaverGitHubRepositories = Et, window.LogicWeaverGitHubBatchBar = Eo, window.LogicWeaverTodoistLabels = aa, window.LogicWeaverTodoistWorkspace = ra, window.LogicWeaverTodoistCalendarSidebar = la, window.LogicWeaverTodoistTaskList = ca, window.LogicWeaverBiliMessagePanel = zt, window.LogicWeaverStickerBoard = va, window.LogicWeaverStickersService = wa, window.LogicWeaverBiliFavorites = Qi, window.LogicWeaverBiliRadioTape = _a, window.LogicWeaverBiliOrganizerDialogs = ya, window.LogicWeaverBiliUpGroupManager = ba, window.LogicWeaverBiliUpPreview = cn, window.LogicWeaverYouTube = ts, window.LogicWeaverAihotFeed = es, window.LogicWeaverGitHubTrending = cs, window.LogicWeaverCalendarWorkspace = so, window.LogicWeaverCalendar = so, window.LogicWeaverTodoistMainWorkspace = da, window.LogicWeaverTodoistTaskDetail = Va, window.openBiliTheater = (o) => Po.openVideo(o), window.closeBiliTheater = () => Po.close(), window.showWindowsToast = (o) => {
    if (!o) return null;
    const s = xn(o.target) || gi(o.url) || (o.appType === "bili" ? Ks([o.title, o.subtitle, o.message].filter((a) => typeof a == "string").join(" ")) : void 0);
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
      target: xn(r.target) || gi(r.url) || xn({ type: "bili-video", bvid: r.bvid, aid: r.aid ? String(r.aid) : void 0 }),
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
  }), window.LogicWeaverKineticDrag = $a, window.LogicWeaverMarkdownAst = Sa, window.setLauncherBackground = (o) => un.setWallpaper(o), window.backgroundDbClear = (o) => js(o), window.openBackgroundHistory = () => ki.openDialog();
}
const je = $e({
  isOpen: !1,
  query: "",
  selectedIndex: 0
});
let en = null;
const fs = {
  get state() {
    return je;
  },
  open() {
    je.isOpen || (je.isOpen = !0, je.query = "", je.selectedIndex = 0, en = Be.pushModalCloser(() => (this.close(), !0)));
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
      await yn.execute(e.id, void 0, "command-palette");
    } catch (t) {
      console.warn(`[CommandPalette] Failed to execute ${e.id}:`, t);
    }
  }
};
typeof window < "u" && window.addEventListener("keydown", (e) => {
  if (ri.active || e.defaultPrevented || e.isComposing || e.repeat) return;
  const t = (e.key || "").toLowerCase(), o = (e.ctrlKey || e.metaKey) && t === "k", s = e.altKey && (e.code === "Space" || t === " ");
  (o || s) && (e.preventDefault(), e.stopPropagation(), fs.toggle());
}, !0);
function lr(e) {
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
const cr = {
  key: 0,
  id: "guest-preview-banner",
  class: "guest-preview-banner",
  role: "alert",
  "aria-label": "新用户开箱视角预览提示"
}, dr = /* @__PURE__ */ he({
  __name: "GuestPreviewBanner",
  setup(e) {
    function t() {
      Gs.exit();
    }
    return (o, s) => (c(), pe(Os, { name: "guest-banner-slide" }, {
      default: It(() => [
        i(zs) ? (c(), p("aside", cr, [
          s[1] || (s[1] = n("div", { class: "banner-content" }, [
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
          }, [...s[0] || (s[0] = [
            n("span", null, "✕ 退出预览，恢复我的数据", -1)
          ])])
        ])) : E("", !0)
      ]),
      _: 1
    }));
  }
}), ur = /* @__PURE__ */ We(dr, [["__scopeId", "data-v-a2f2ca5f"]]), pr = ["hidden"], hr = {
  key: 0,
  class: "bookmark-folder-strip-empty"
}, fr = ["title", "data-bookmark-folder-id", "onClick", "onContextmenu"], gr = /* @__PURE__ */ he({
  __name: "BookmarkFolderStrip",
  setup(e) {
    const t = j(null);
    function o(r) {
      const g = t.value;
      !g || g.scrollWidth <= g.clientWidth || !r.deltaY || (r.preventDefault(), g.scrollLeft += r.deltaY);
    }
    function s(r) {
      pn.openFolder(r.id);
    }
    function a(r, g) {
      pn.openContextMenu(g, r.clientX, r.clientY);
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
      i(io).folders.length ? E("", !0) : (c(), p("span", hr, u(i(io).emptyMessage || "书签栏没有文件夹"), 1)),
      (c(!0), p(Q, null, be(i(io).folders, (f) => (c(), p("button", {
        key: f.id,
        class: "bookmark-folder-chip",
        type: "button",
        title: `打开书签文件夹：${f.title || "未命名"}`,
        "data-bookmark-folder-id": f.id,
        onClick: (l) => s(f),
        onContextmenu: G((l) => a(l, f), ["prevent"])
      }, [
        g[0] || (g[0] = n("span", { "aria-hidden": "true" }, "📁", -1)),
        n("span", null, u(f.title || "未命名"), 1)
      ], 40, fr))), 128))
    ], 40, pr));
  }
}), mr = /* @__PURE__ */ We(gr, [["__scopeId", "data-v-5e71cc7c"]]), vr = ["aria-label"], wr = { class: "cube-manager-body" }, yr = ["disabled", "onClick", "title"], br = ["disabled", "onClick", "title"], kr = ["onClick"], _r = ["onClick"], Cr = ["onClick"], xr = ["type", "placeholder"], Lr = { type: "submit" }, $r = {
  key: 0,
  role: "alert"
}, Sr = /* @__PURE__ */ he({
  __name: "CubeConfigDialog",
  setup(e) {
    const t = Fe.state, o = te(() => Fe.getActiveFaces()), s = te(() => t.registeredFaces.filter((D) => !t.activeFaceIds.includes(D.id))), a = j(""), r = j("memo"), g = te(() => [
      { value: "memo", label: d("cube.manager.typeMemo"), icon: "📝" },
      { value: "countdown", label: d("cube.manager.typeCountdown"), icon: "⏳" },
      { value: "link", label: d("cube.manager.typeLink"), icon: "🔗" }
    ]), f = j(""), l = j(!1), h = j(JSON.stringify({ title: "每日一句", icon: "📝", customType: "memo", customData: { text: "今天也要记得休息" } }, null, 2)), x = j("");
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
        Fe.addCustomFace(D), a.value = "", f.value = "";
      });
    }
    return (D, v) => (c(), pe(yt, { to: "body" }, [
      i(t).isConfigDialogOpen ? (c(), p("section", {
        key: 0,
        class: "cube-manager",
        role: "dialog",
        "aria-label": i(d)("cube.manager.title"),
        onKeydown: v[8] || (v[8] = No(G((y) => i(Fe).closeConfigDialog(), ["stop"]), ["esc"]))
      }, [
        n("header", null, [
          n("strong", null, u(i(d)("cube.manager.title")), 1),
          n("button", {
            type: "button",
            "aria-label": "关闭",
            onClick: v[0] || (v[0] = (y) => i(Fe).closeConfigDialog())
          }, "×")
        ]),
        n("div", wr, [
          n("p", null, u(i(d)("cube.manager.desc")), 1),
          (c(!0), p(Q, null, be(o.value, (y, T) => (c(), p("div", {
            key: y.id,
            class: "cube-row"
          }, [
            n("span", null, u(y.icon) + " " + u(y.title), 1),
            n("button", {
              type: "button",
              disabled: T === 0,
              onClick: (w) => F(() => i(Fe).moveUp(y.id)),
              title: i(d)("cube.manager.moveUp")
            }, "↑", 8, yr),
            n("button", {
              type: "button",
              disabled: T === o.value.length - 1,
              onClick: (w) => F(() => i(Fe).moveDown(y.id)),
              title: i(d)("cube.manager.moveDown")
            }, "↓", 8, br),
            n("button", {
              type: "button",
              onClick: (w) => F(() => i(Fe).removeCustomFace(y.id))
            }, u(i(d)("cube.manager.removeFace")), 9, kr)
          ]))), 128)),
          (c(!0), p(Q, null, be(s.value, (y) => (c(), p("div", {
            key: y.id,
            class: "cube-row"
          }, [
            n("span", null, u(y.title) + u(i(d)("cube.manager.inactiveSuffix")), 1),
            n("button", {
              type: "button",
              onClick: (T) => F(() => i(Fe).toggleActive(y.id, !0))
            }, u(i(d)("cube.manager.add")), 9, _r),
            y.builtIn ? E("", !0) : (c(), p("button", {
              key: 0,
              type: "button",
              onClick: (T) => F(() => i(Fe).removeCustomFace(y.id))
            }, u(i(d)("cube.manager.delete")), 9, Cr))
          ]))), 128)),
          n("h3", null, u(i(d)("cube.manager.addFace")), 1),
          n("label", null, [
            tt(n("input", {
              "onUpdate:modelValue": v[1] || (v[1] = (y) => l.value = y),
              type: "checkbox"
            }, null, 512), [
              [Bs, l.value]
            ]),
            ot(" " + u(i(d)("cube.manager.pasteJson")), 1)
          ]),
          n("form", {
            onSubmit: G(m, ["prevent"])
          }, [
            l.value ? (c(), p(Q, { key: 1 }, [
              n("p", null, u(i(d)("cube.manager.securityNotice")), 1),
              tt(n("textarea", {
                "onUpdate:modelValue": v[6] || (v[6] = (y) => h.value = y),
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
                  "onUpdate:modelValue": v[2] || (v[2] = (y) => a.value = y),
                  maxlength: "60",
                  required: ""
                }, null, 512), [
                  [ho, a.value]
                ])
              ]),
              n("label", null, [
                ot(u(i(d)("cube.manager.fieldType")) + " ", 1),
                J(zi, {
                  modelValue: r.value,
                  "onUpdate:modelValue": v[3] || (v[3] = (y) => r.value = y),
                  options: g.value,
                  size: "sm",
                  onChange: v[4] || (v[4] = (y) => r.value = y)
                }, null, 8, ["modelValue", "options"])
              ]),
              n("label", null, [
                ot(u(i(d)("cube.manager.fieldContent")), 1),
                tt(n("input", {
                  "onUpdate:modelValue": v[5] || (v[5] = (y) => f.value = y),
                  type: r.value === "countdown" ? "date" : "text",
                  placeholder: r.value === "link" ? "https://…" : i(d)("cube.manager.contentPlaceholderText"),
                  maxlength: "500",
                  required: ""
                }, null, 8, xr), [
                  [Fs, f.value]
                ])
              ])
            ], 64)),
            n("button", Lr, u(i(d)("cube.manager.submitAdd")), 1)
          ], 32),
          x.value ? (c(), p("p", $r, u(x.value), 1)) : E("", !0)
        ]),
        n("footer", null, [
          n("button", {
            type: "button",
            onClick: v[7] || (v[7] = (y) => F(() => i(Fe).resetDefaults()))
          }, u(i(d)("cube.manager.resetDefault")), 1),
          n("small", null, u(i(d)("cube.manager.resetNotice")), 1)
        ])
      ], 40, vr)) : E("", !0)
    ]));
  }
}), Tr = /* @__PURE__ */ We(Sr, [["__scopeId", "data-v-8ab459ee"]]), Ir = ["data-face"], Mr = ["aria-label"], Dr = { class: "ms-top-side" }, Ar = ["title"], Er = ["title"], Pr = ["title"], Wr = {
  key: 0,
  class: "ms-top-meta"
}, Rr = {
  class: "ms-top-title",
  style: { color: "#10b981", "font-weight": "700" }
}, Nr = { class: "ms-top-artist" }, Or = { class: "ms-top-meta" }, Br = ["title"], Fr = ["title"], Hr = {
  key: 0,
  class: "ms-top-divider"
}, Kr = ["title"], jr = { class: "ms-top-mini-progress" }, zr = { class: "ms-top-side" }, Gr = ["title"], Vr = ["title"], Ur = ["aria-label"], Yr = ["title"], Xr = { class: "ms-cube-custom-icon" }, qr = { class: "ms-cube-custom-title" }, Jr = ["title"], Zr = {
  key: 1,
  class: "ms-cube-custom-text countdown"
}, Qr = ["href"], el = {
  class: "ms-cube-dots",
  "aria-hidden": "true"
}, tl = ["title", "onClick"], ol = { class: "ms-cube-cm-header" }, nl = { class: "ms-cube-cm-list" }, il = ["onClick"], sl = { class: "ms-cube-cm-icon" }, al = { class: "ms-cube-cm-title" }, rl = {
  key: 0,
  class: "ms-cube-cm-check"
}, ll = /* @__PURE__ */ he({
  __name: "TopInfoCube",
  props: {
    active: { type: Boolean, default: !0 }
  },
  setup(e) {
    const t = e, o = te(() => Gi.visible || gt.djModalOpen || gt.isActive && gt.isJoined), s = te(() => gt.isActive && gt.isJoined), a = te(() => Fe.getActiveFaces()), r = j("music"), g = j(0);
    let f = !1, l;
    Pe(
      () => a.value,
      (A) => {
        A.some((W) => W.id === r.value) || (r.value = A[0]?.id || "");
      },
      { immediate: !0 }
    );
    const h = te(() => a.value.filter((A) => !A.builtIn)), x = j(!1), F = j({ x: 0, y: 0 });
    Pe(() => t.active, (A) => {
      A || (x.value = !1, Fe.closeConfigDialog(), clearTimeout(l), f = !1);
    }, { immediate: !0 });
    const { menuRef: m, style: D } = ci({
      visible: () => x.value,
      anchor: () => F.value,
      dismiss: () => {
        x.value = !1;
      }
    });
    function v(A) {
      A.preventDefault(), A.stopPropagation(), F.value = { x: A.clientX, y: A.clientY }, x.value = !0;
    }
    function y(A) {
      R(A), x.value = !1;
    }
    function T() {
      x.value = !1, Fe.openConfigDialog();
    }
    function w() {
      x.value = !1, _(() => Fe.resetDefaults()), R("music");
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
      const z = new Date(A).getTime() - $.value, ve = Math.ceil(z / (1e3 * 60 * 60 * 24));
      return ve > 0 ? d("cube.countdown.remaining", { days: ve }) : ve === 0 ? d("cube.countdown.today") : d("cube.countdown.passed", { days: Math.abs(ve) });
    }
    const B = te(() => !oe.title || oe.title === "点击播放" ? d("home.music.defaultTitle") : oe.title), H = te(() => !oe.artist || oe.artist === "作者" ? d("home.music.defaultArtist") : oe.artist), U = te(() => oe.isBiliRadio ? d("cube.source.biliRadio") : oe.isNetease ? d("cube.source.netease") : oe.playing ? d("cube.source.siren") : d("cube.source.idle")), M = te(() => oe.currentLyric ? oe.currentLyric : oe.playing ? d("cube.defaultPlayingLyric") : d("cube.defaultIdleLyric"));
    function k() {
      Be.handleToolClick("music");
    }
    const $ = j(Date.now());
    let ee;
    Pe(() => t.active && a.value.some((A) => A.id === r.value && A.customType === "countdown"), (A) => {
      A && ($.value = Date.now()), clearInterval(ee), ee = A ? window.setInterval(() => {
        document.hidden || ($.value = Date.now());
      }, 6e4) : void 0;
    }, { immediate: !0 });
    function R(A, W = null) {
      const z = a.value, ve = z.find((ke) => ke.id === A) || z[0];
      if (ve) {
        if (Number.isFinite(W))
          g.value = W;
        else if (ve.id !== r.value) {
          const ke = z.findIndex((Re) => Re.id === r.value);
          let ye = (z.findIndex((Re) => Re.id === ve.id) - ke + z.length) % z.length;
          ye > z.length / 2 && (ye -= z.length), g.value += ye * 90;
        }
        r.value = ve.id;
      }
    }
    function V(A) {
      const W = a.value;
      if (W.length <= 1) return;
      const z = W.findIndex((ye) => ye.id === r.value), ke = ((z >= 0 ? z : 0) + A + W.length) % W.length, Se = W[ke];
      Se && R(Se.id, g.value + A * 90);
    }
    function N(A) {
      a.value.length <= 1 || A.altKey || Math.abs(A.deltaY) < 2 || (A.preventDefault(), !f && (f = !0, V(A.deltaY > 0 ? 1 : -1), l = setTimeout(() => {
        f = !1;
      }, 420)));
    }
    function Y(A) {
      !["ArrowUp", "ArrowDown", "PageUp", "PageDown"].includes(A.key) || A.target?.closest?.("input") || (A.preventDefault(), V(["ArrowDown", "PageDown"].includes(A.key) ? 1 : -1));
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
        i(Fe).isActive("music") && r.value === "music" ? (c(), p("section", {
          key: 0,
          class: "ms-top-face ms-top-face-music",
          "aria-label": i(d)("cube.musicFaceAria"),
          style: xe(me("music", 0))
        }, [
          n("div", Dr, [
            n("button", {
              class: "ms-top-prev",
              title: i(d)("cube.prevTrack"),
              type: "button",
              onClick: W[0] || (W[0] = G((z) => i(et).prev(), ["stop"]))
            }, "⏮", 8, Ar),
            n("button", {
              class: "ms-top-play",
              title: i(d)("cube.playPause"),
              type: "button",
              onClick: W[1] || (W[1] = G((z) => i(et).togglePlay(), ["stop"]))
            }, u(i(oe).playing ? "⏸" : "▶"), 9, Er)
          ]),
          n("button", {
            class: "ms-top-main",
            title: i(d)("cube.openMusicPicker"),
            type: "button",
            onClick: G(k, ["stop"])
          }, [
            o.value ? (c(), p("div", Wr, [
              n("span", Rr, " 🎧 " + u(s.value ? i(d)("cube.listeningTogether") : i(d)("cube.listening")) + "：" + u(B.value), 1),
              n("span", Nr, u(H.value), 1)
            ])) : (c(), p(Q, { key: 1 }, [
              n("div", Or, [
                n("span", {
                  class: "ms-top-title",
                  title: B.value
                }, u(B.value), 9, Br),
                n("span", {
                  class: "ms-top-artist",
                  title: H.value
                }, u(H.value), 9, Fr),
                n("span", {
                  class: de(["ms-top-source", { idle: !i(oe).playing }])
                }, u(U.value), 3),
                M.value ? (c(), p("span", Hr)) : E("", !0)
              ]),
              M.value ? (c(), p("span", {
                key: 0,
                class: "ms-top-lyric",
                title: M.value
              }, u(M.value), 9, Kr)) : E("", !0)
            ], 64)),
            n("div", jr, [
              n("div", {
                class: "ms-top-mini-fill",
                style: xe({ width: i(oe).progressPercent + "%" })
              }, null, 4)
            ])
          ], 8, Pr),
          n("div", zr, [
            n("button", {
              class: "ms-top-next",
              title: i(d)("cube.nextTrack"),
              type: "button",
              onClick: W[2] || (W[2] = G((z) => i(et).next(), ["stop"]))
            }, "⏭", 8, Gr),
            n("button", {
              class: "ms-top-open",
              title: i(d)("cube.openPlaylist"),
              type: "button",
              onClick: G(k, ["stop"])
            }, "🎵", 8, Vr)
          ])
        ], 12, Mr)) : E("", !0),
        (c(!0), p(Q, null, be(h.value, (z, ve) => (c(), p("section", {
          key: z.id,
          class: "ms-top-face ms-top-face-custom",
          "aria-label": z.title,
          style: xe(me(z.id, (ve + 1) * 90))
        }, [
          r.value === z.id ? (c(), p("div", {
            key: 0,
            class: "ms-cube-custom-body",
            title: z.desc
          }, [
            n("span", Xr, u(z.icon), 1),
            n("strong", qr, u(z.title), 1),
            W[10] || (W[10] = n("span", { class: "ms-cube-divider" }, null, -1)),
            z.customType === "memo" ? (c(), p("span", {
              key: 0,
              class: "ms-cube-custom-text",
              title: z.customData?.text
            }, u(z.customData?.text || i(d)("cube.memo.clickToConfig")), 9, Jr)) : z.customType === "countdown" ? (c(), p("span", Zr, u(L(z.customData?.targetDate)), 1)) : z.customType === "link" ? (c(), p("a", {
              key: 2,
              href: z.customData?.url,
              target: "_blank",
              rel: "noreferrer",
              class: "ms-cube-custom-link",
              onClick: W[3] || (W[3] = G(() => {
              }, ["stop"]))
            }, u(z.customData?.url) + " ↗ ", 9, Qr)) : E("", !0)
          ], 8, Yr)) : E("", !0),
          n("button", {
            type: "button",
            class: "ms-cube-config-trigger",
            title: "管理立方体面",
            onClick: W[4] || (W[4] = G((ke) => i(Fe).openConfigDialog(), ["stop"]))
          }, " ⚙ ")
        ], 12, Ur))), 128))
      ], 4),
      n("div", el, [
        (c(!0), p(Q, null, be(a.value, (z) => (c(), p("i", {
          key: z.id,
          class: de({ on: r.value === z.id }),
          title: z.title,
          onClick: G((ve) => R(z.id), ["stop"])
        }, null, 10, tl))), 128))
      ]),
      (c(), pe(yt, { to: "body" }, [
        t.active && x.value ? (c(), p("div", {
          key: 0,
          ref_key: "menuRef",
          ref: m,
          class: "ms-cube-context-menu",
          style: xe(i(D)),
          onClick: W[9] || (W[9] = G(() => {
          }, ["stop"]))
        }, [
          n("div", ol, [
            W[11] || (W[11] = n("span", null, "🎲 滚动立方体面", -1)),
            n("button", {
              type: "button",
              class: "ms-cube-cm-close",
              onClick: W[5] || (W[5] = (z) => x.value = !1)
            }, "×")
          ]),
          n("div", nl, [
            (c(!0), p(Q, null, be(a.value, (z) => (c(), p("button", {
              key: z.id,
              type: "button",
              class: de(["ms-cube-cm-item", { active: r.value === z.id }]),
              onClick: (ve) => y(z.id)
            }, [
              n("span", sl, u(z.icon), 1),
              n("span", al, u(z.title), 1),
              r.value === z.id ? (c(), p("span", rl, "✓")) : E("", !0)
            ], 10, il))), 128))
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
            onClick: W[6] || (W[6] = (z) => {
              V(-1), x.value = !1;
            })
          }, [...W[13] || (W[13] = [
            n("span", null, "⏮ 上一个面板", -1)
          ])]),
          n("button", {
            type: "button",
            class: "ms-cube-cm-action",
            onClick: W[7] || (W[7] = (z) => {
              V(1), x.value = !1;
            })
          }, [...W[14] || (W[14] = [
            n("span", null, "⏭ 下一个面板", -1)
          ])]),
          r.value ? (c(), p("button", {
            key: 0,
            type: "button",
            class: "ms-cube-cm-action danger",
            onClick: W[8] || (W[8] = (z) => _(() => i(Fe).removeCustomFace(r.value)))
          }, "删除当前面")) : E("", !0),
          n("button", {
            type: "button",
            class: "ms-cube-cm-action danger",
            onClick: w
          }, [...W[15] || (W[15] = [
            n("span", null, "↺ 恢复默认（仅音乐）", -1)
          ])])
        ], 4)) : E("", !0)
      ])),
      t.active ? (c(), pe(Tr, { key: 1 })) : E("", !0)
    ], 40, Ir)), [
      [fo, t.active]
    ]);
  }
}), cl = /* @__PURE__ */ We(ll, [["__scopeId", "data-v-591e9de8"]]), Mo = $e({
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
}, ei = Rt(Mo);
function dl() {
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
const ul = { class: "tb-brand" }, pl = ["title", "aria-expanded", "aria-label"], hl = ["src", "alt"], fl = ["hidden"], gl = ["title", "hidden"], ml = { id: "vue-bookmark-folder-strip-root" }, vl = { class: "tb-actions" }, wl = {
  id: "workspace-launchers",
  hidden: ""
}, yl = ["title", "aria-expanded"], bl = ["title"], kl = /* @__PURE__ */ he({
  __name: "AppTopBar",
  setup(e) {
    const t = X(() => import("./WorkspaceLaunchers-DGLsIp71.js"));
    function o(l) {
      l.preventDefault(), l.stopPropagation();
      const h = typeof window < "u" ? window : null;
      h?.LogicWeaverWindowManager?.open ? h.LogicWeaverWindowManager.open("settings") : h?.LogicWeaverWindowTabs?.open ? h.LogicWeaverWindowTabs.open("settings") : wn.open();
    }
    function s(l) {
      l.preventDefault();
      const h = typeof window < "u" ? window : null;
      typeof h?.toggleBookmarkPanel == "function" ? h.toggleBookmarkPanel() : h?.LogicWeaverBookmarkPanel?.toggle ? h.LogicWeaverBookmarkPanel.toggle() : ni.toggleBookmarkPanel();
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
      n("div", ul, [
        n("button", {
          id: "bili-profile-button",
          class: "bili-profile-button",
          type: "button",
          title: i(d)("topbar.notifications"),
          "aria-controls": "notification-center",
          "aria-expanded": i(Vi).isOpen,
          "aria-label": i(ko) ? i(d)("topbar.notificationsUnread", { count: i(ko) }) : i(d)("topbar.notifications"),
          onClick: a,
          onContextmenu: h[0] || (h[0] = G((x) => r(x), ["prevent"]))
        }, [
          n("img", {
            id: "bili-profile-avatar",
            src: i(oo).avatarUrl || "assets/bilibili.svg",
            alt: i(oo).userName || i(d)("topbar.notifications")
          }, null, 8, hl),
          n("span", {
            id: "bili-profile-badge",
            class: "bili-profile-badge",
            hidden: i(ko) <= 0
          }, u(i(ko) > 99 ? "99+" : i(ko)), 9, fl)
        ], 40, pl),
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
        ], 8, gl),
        n("div", ml, [
          J(mr)
        ])
      ]),
      J(cl, {
        active: !i(Tt).activeId
      }, null, 8, ["active"]),
      n("div", vl, [
        h[3] || (h[3] = n("button", {
          id: "daily-toggle",
          class: "tb-pill",
          type: "button",
          hidden: "",
          title: "查看日报"
        }, "📰 日报", -1)),
        n("span", wl, [
          J(i(t))
        ]),
        n("button", {
          id: "side-drawer-toggle",
          class: de(["tb-btn", { active: i(ei).isOpen }]),
          type: "button",
          title: i(d)("topbar.sidebar"),
          "aria-controls": "in-page-side-drawer",
          "aria-expanded": i(ei).isOpen,
          onClick: h[1] || (h[1] = (x) => i(gs).toggle())
        }, " 📑 ", 10, yl),
        n("button", {
          id: "settings-open",
          class: "tb-btn",
          title: i(d)("topbar.settings"),
          onClick: o
        }, "⚙", 8, bl)
      ])
    ], 34));
  }
}), _l = {
  key: 0,
  class: "notice"
}, Cl = {
  key: 1,
  class: "muted small"
}, xl = {
  key: 2,
  class: "notice"
}, Ll = {
  key: 3,
  class: "notice"
}, $l = { class: "wx-cur" }, Sl = { class: "wx-emoji" }, Tl = { class: "wx-temp" }, Il = { class: "wx-sub" }, Ml = { class: "wx-rain" }, Dl = { class: "wx-hours" }, Al = { class: "hh" }, El = { class: "he" }, Pl = { class: "ht" }, Wl = { class: "wx-days" }, Rl = ["open"], Nl = { class: "weather-forecast-head" }, Ol = { class: "weather-forecast-city-info" }, Bl = { class: "weather-forecast-icon" }, Fl = { id: "weather-forecast-city-title" }, Hl = { class: "small muted" }, Kl = { class: "weather-forecast-actions" }, jl = ["title"], zl = ["title"], Gl = {
  key: 0,
  class: "weather-metrics-grid"
}, Vl = { class: "weather-metric-item" }, Ul = { class: "metric-label" }, Yl = {
  class: "metric-val",
  id: "weather-forecast-humidity"
}, Xl = { class: "weather-metric-item" }, ql = { class: "metric-label" }, Jl = {
  class: "metric-val",
  id: "weather-forecast-wind"
}, Zl = { class: "weather-metric-item" }, Ql = { class: "metric-label" }, ec = {
  class: "metric-val",
  id: "weather-forecast-uv"
}, tc = { class: "weather-metric-item" }, oc = { class: "metric-label" }, nc = {
  class: "metric-val",
  id: "weather-forecast-aqi"
}, ic = {
  class: "weather-forecast-list",
  id: "weather-forecast-days-list"
}, sc = { class: "day-date-col" }, ac = { class: "day-name" }, rc = { class: "day-date small muted" }, lc = { class: "day-weather-col" }, cc = { class: "day-emoji" }, dc = { class: "day-cond" }, uc = { class: "day-rain-col" }, pc = {
  key: 0,
  class: "rain-tag"
}, hc = {
  key: 1,
  class: "rain-tag empty"
}, fc = { class: "day-temp-bar-col" }, gc = { class: "low-temp" }, mc = { class: "temp-track" }, vc = { class: "high-temp" }, wc = { class: "weather-location-head" }, yc = { class: "weather-location-title-row" }, bc = { class: "weather-location-title" }, kc = ["title"], _c = { class: "weather-input-wrapper" }, Cc = ["placeholder", "onKeydown"], xc = ["title"], Lc = {
  type: "submit",
  class: "weather-location-submit"
}, $c = { key: 0 }, Sc = { class: "weather-section-subtitle" }, Tc = {
  key: 0,
  class: "weather-location-suggestions"
}, Ic = ["onClick"], Mc = { class: "weather-suggestion-name" }, Dc = { class: "weather-suggestion-sub" }, Ac = {
  key: 1,
  class: "weather-suggestion-empty"
}, Ec = { key: 1 }, Pc = { class: "weather-section-subtitle" }, Wc = { class: "weather-quick-chips-grid" }, Rc = ["onClick"], Nc = /* @__PURE__ */ he({
  __name: "WeatherWidget",
  setup(e) {
    const t = j(!1), o = j({ x: 0, y: 0 }), s = j(""), a = j(null), r = j(null), g = ["深圳", "武汉", "北京", "上海", "广州", "成都", "杭州", "南京", "西安", "重庆", "苏州", "天津"], f = te(() => {
      const w = s.value.trim();
      return w ? to.filterCities(w, 6) : [];
    });
    function l(w) {
      const H = w?.clientX ?? window.innerWidth / 2 - 140, U = w?.clientY ?? window.innerHeight / 2 - 320 / 2, M = Math.max(12, Math.min(window.innerWidth - 280 - 12, H)), k = Math.max(12, Math.min(window.innerHeight - 320 - 12, U));
      o.value = { x: M, y: k }, t.value = !0, s.value = "", St(() => {
        r.value?.focus();
      });
    }
    function h() {
      t.value = !1, s.value = "";
    }
    async function x(w) {
      const _ = w.trim();
      _ && (h(), await to.changeCity(_));
    }
    function F() {
      const w = s.value.trim();
      w && x(w);
    }
    function m(w) {
      if (!t.value) return;
      const _ = w.target;
      a.value && !a.value.contains(_) && h();
    }
    function D(w) {
      t.value && w.key === "Escape" && (w.preventDefault(), h());
    }
    Xe(() => {
      ut.setRefreshAction(() => {
        to.loadWeather();
      }), ut.setChangeLocationAction((w) => {
        l(w);
      }), to.loadWeather(), Pe(mt, () => {
        to.reformatCurrentWeather();
      }), window.addEventListener("pointerdown", m, !0), window.addEventListener("keydown", D, !0);
    }), Nt(() => {
      window.removeEventListener("pointerdown", m, !0), window.removeEventListener("keydown", D, !0);
    });
    function v(w) {
      w.preventDefault(), l(w);
    }
    function y() {
      ut.closeForecastModal();
    }
    function T(w) {
      w.target?.id === "weather-forecast-dialog" && y();
    }
    return (w, _) => (c(), p("div", {
      class: "weather-widget-container",
      onContextmenu: v
    }, [
      i(q).state === "unconfigured" ? (c(), p("p", _l, u(i(d)("weather.noCitySet")), 1)) : i(q).state === "loading" ? (c(), p("p", Cl, u(i(d)("common.loading")), 1)) : i(q).state === "not_found" ? (c(), p("p", xl, u(i(d)("weather.cityNotFound", { city: i(q).city })), 1)) : i(q).state === "error" ? (c(), p("p", Ll, u(i(q).errorMessage || i(d)("weather.loadFailed")), 1)) : i(q).state === "ready" && i(q).data ? (c(), p(Q, { key: 4 }, [
        n("div", $l, [
          n("span", Sl, u(i(q).data.currentEmoji), 1),
          n("span", Tl, u(i(q).data.currentTemp) + "°", 1)
        ]),
        n("p", Il, u(i(q).data.subText), 1),
        n("p", Ml, u(i(q).data.rainText), 1),
        n("div", Dl, [
          (c(!0), p(Q, null, be(i(q).data.hours, (L, B) => (c(), p("div", {
            key: B,
            class: "wx-h"
          }, [
            n("span", Al, u(L.time), 1),
            n("span", El, u(L.emoji), 1),
            n("span", Pl, u(L.temp) + "°", 1)
          ]))), 128))
        ]),
        n("div", Wl, [
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
          onClick: _[1] || (_[1] = G(() => {
          }, ["stop"]))
        }, [
          n("header", Nl, [
            n("div", Ol, [
              n("span", Bl, u(i(q).data?.currentEmoji || "🌤️"), 1),
              n("div", null, [
                n("h3", Fl, u(i(q).city || i(q).data?.cityName || i(d)("weather.forecastTitle")), 1),
                n("p", Hl, u(i(q).data?.subText || i(d)("weather.forecastSub")), 1)
              ])
            ]),
            n("div", Kl, [
              n("button", {
                id: "weather-forecast-refresh-btn",
                type: "button",
                class: "weather-forecast-btn",
                title: i(d)("weather.refreshTitle"),
                onClick: _[0] || (_[0] = (L) => i(ut).refresh())
              }, u(i(d)("weather.refresh")), 9, jl),
              n("button", {
                id: "weather-forecast-close-btn",
                type: "button",
                class: "weather-forecast-close",
                title: i(d)("common.close"),
                onClick: y
              }, " ✕ ", 8, zl)
            ])
          ]),
          i(q).detailInfo ? (c(), p("div", Gl, [
            n("div", Vl, [
              n("span", Ul, u(i(d)("weather.metric.humidity")), 1),
              n("span", Yl, u(i(q).detailInfo.humidity || "50%"), 1)
            ]),
            n("div", Xl, [
              n("span", ql, u(i(d)("weather.metric.wind")), 1),
              n("span", Jl, u(i(q).detailInfo.wind || (i(mt) === "en" ? "Breeze" : "微风")), 1)
            ]),
            n("div", Zl, [
              n("span", Ql, u(i(d)("weather.metric.uv")), 1),
              n("span", ec, u(i(q).detailInfo.uvIndex || (i(mt) === "en" ? "Moderate" : "中等")), 1)
            ]),
            n("div", tc, [
              n("span", oc, u(i(d)("weather.metric.aqi")), 1),
              n("span", nc, u(i(q).detailInfo.airQuality || (i(mt) === "en" ? "Good" : "良")), 1)
            ])
          ])) : E("", !0),
          n("div", ic, [
            (c(!0), p(Q, null, be(i(q).forecastDays, (L, B) => (c(), p("div", {
              key: B,
              class: "weather-forecast-day-row forecast-day-item"
            }, [
              n("div", sc, [
                n("span", ac, u(L.dayName), 1),
                n("span", rc, u(L.date), 1)
              ]),
              n("div", lc, [
                n("span", cc, u(L.emoji), 1),
                n("span", dc, u(L.condition), 1)
              ]),
              n("div", uc, [
                L.rainProb > 0 ? (c(), p("span", pc, "☂️ " + u(L.rainProb) + "%", 1)) : (c(), p("span", hc, u(i(d)("weather.metric.noRain")), 1))
              ]),
              n("div", fc, [
                n("span", gc, u(L.lowTemp) + "°", 1),
                n("div", mc, [
                  n("div", {
                    class: "temp-range-fill",
                    style: xe({
                      left: `${Math.max(0, Math.min(100, (L.lowTemp + 10) * 2))}%`,
                      width: `${Math.max(20, Math.min(80, (L.highTemp - L.lowTemp) * 6))}%`
                    })
                  }, null, 4)
                ]),
                n("span", vc, u(L.highTemp) + "°", 1)
              ])
            ]))), 128))
          ])
        ])
      ], 8, Rl),
      (c(), pe(yt, { to: "body" }, [
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
          n("div", wc, [
            n("div", yc, [
              n("span", bc, u(i(d)("weather.menu.changeLocation")), 1),
              n("span", {
                class: "weather-location-curr-badge",
                title: i(q).city
              }, [
                _[6] || (_[6] = n("span", { class: "weather-curr-dot" }, null, -1)),
                ot(" " + u(i(q).city || i(d)("weather.menu.unset")), 1)
              ], 8, kc)
            ])
          ]),
          n("form", {
            class: "weather-location-form",
            onSubmit: G(F, ["prevent"])
          }, [
            n("div", _c, [
              _[7] || (_[7] = n("span", { class: "weather-input-icon" }, "🔍", -1)),
              tt(n("input", {
                ref_key: "inputRef",
                ref: r,
                class: "weather-location-input",
                placeholder: i(d)("weather.menu.inputPlaceholder"),
                "onUpdate:modelValue": _[2] || (_[2] = (L) => s.value = L),
                onKeydown: No(G(F, ["prevent"]), ["enter"]),
                autocomplete: "off"
              }, null, 40, Cc), [
                [ho, s.value]
              ]),
              s.value ? (c(), p("button", {
                key: 0,
                type: "button",
                class: "weather-input-clear",
                onClick: _[3] || (_[3] = (L) => s.value = ""),
                title: i(d)("weather.menu.clearInput")
              }, "✕", 8, xc)) : E("", !0)
            ]),
            n("button", Lc, u(i(d)("weather.menu.submit")), 1)
          ], 32),
          s.value.trim() ? (c(), p("div", $c, [
            n("div", Sc, u(i(d)("weather.menu.suggestions")), 1),
            f.value.length ? (c(), p("div", Tc, [
              (c(!0), p(Q, null, be(f.value, (L) => (c(), p("button", {
                key: L.name + L.admin,
                type: "button",
                class: "weather-suggestion-item",
                onClick: (B) => x(L.name)
              }, [
                n("span", Mc, u(L.name), 1),
                n("span", Dc, u(L.admin), 1)
              ], 8, Ic))), 128))
            ])) : (c(), p("div", Ac, u(i(d)("weather.menu.emptySuggestion")), 1))
          ])) : (c(), p("div", Ec, [
            n("div", Pc, u(i(d)("weather.menu.commonCities")), 1),
            n("div", Wc, [
              (c(), p(Q, null, be(g, (L) => n("button", {
                key: L,
                type: "button",
                class: de(["weather-quick-chip", { active: i(q).city === L }]),
                onClick: (B) => x(L)
              }, u(L), 11, Rc)), 64))
            ])
          ]))
        ], 36)) : E("", !0)
      ]))
    ], 32));
  }
}), ms = /* @__PURE__ */ We(Nc, [["__scopeId", "data-v-5aae12b5"]]), ti = "heroCustomMottoV1";
function Oc() {
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
const Qt = Oc(), Z = $e({
  loaded: !1,
  customText: Qt.customText,
  history: Qt.history,
  currentIndex: Qt.customText && Qt.history.length ? Qt.history.findIndex((e) => e.text === Qt.customText) : -1,
  menuOpen: !1,
  menuPos: { x: 0, y: 0 }
});
function Bc(e) {
  return new Promise((t) => {
    typeof chrome < "u" && chrome?.storage?.local?.get ? chrome.storage.local.get([e], (o) => t(o?.[e])) : t(null);
  });
}
function Fc(e, t) {
  try {
    typeof localStorage < "u" && localStorage.setItem(e, JSON.stringify(t));
  } catch {
  }
  return new Promise((o) => {
    typeof chrome < "u" && chrome?.storage?.local?.set ? chrome.storage.local.set({ [e]: t }, () => o()) : o();
  });
}
function Hc(e) {
  const t = (a) => String(a).padStart(2, "0"), o = `${e.getFullYear()}-${t(e.getMonth() + 1)}-${t(e.getDate())}`, s = `${t(e.getHours())}:${t(e.getMinutes())}`;
  return { date: o, time: s };
}
const ct = {
  async init() {
    try {
      const e = await Bc(ti);
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
    await Fc(ti, e);
  },
  setCustomMotto(e) {
    const t = e.trim();
    if (!t) {
      this.resetToSystem();
      return;
    }
    const { date: o, time: s } = Hc(/* @__PURE__ */ new Date());
    Z.customText = t;
    const a = Z.history.findIndex((r) => r.text === t);
    if (a !== -1) {
      const r = Z.history.splice(a, 1)[0];
      r.date = o, r.time = s, Z.history.unshift(r);
    } else
      Z.history.unshift({
        id: `motto_${Date.now()}`,
        date: o,
        time: s,
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
}, Kc = ["title"], jc = ["placeholder"], zc = { class: "motto-content" }, Gc = ["title"], Vc = { class: "motto-menu-header" }, Uc = { class: "dim" }, Yc = { class: "motto-history-label" }, Xc = { class: "motto-history-list" }, qc = {
  key: 0,
  class: "motto-history-empty dim"
}, Jc = ["onClick"], Zc = { class: "motto-item-date" }, Qc = ["title"], ed = ["title", "onClick"], td = /* @__PURE__ */ he({
  __name: "HeroMotto",
  setup(e) {
    const t = j(!1), o = j(""), s = j(null), a = {
      夜深了: "clock.greeting.lateNight",
      早上好: "clock.greeting.morning",
      上午好: "clock.greeting.forenoon",
      中午好: "clock.greeting.noon",
      下午好: "clock.greeting.afternoon",
      晚上好: "clock.greeting.evening",
      你好: "clock.greeting.hello"
    };
    function r(v) {
      const y = a[v];
      return y ? d(y) : v;
    }
    const g = te(() => Z.customText ? r(Z.customText) : Ie.greetingText);
    function f() {
      ct.closeMenu(), o.value = Z.customText || Ie.greetingText, t.value = !0, St(() => {
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
      Z.menuOpen && (v.target.closest(".motto-context-menu") || ct.closeMenu());
    }
    return Xe(() => {
      ct.init(), window.addEventListener("click", D);
    }), Nt(() => {
      window.removeEventListener("click", D);
    }), (v, y) => (c(), p(Q, null, [
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
          "onUpdate:modelValue": y[0] || (y[0] = (T) => o.value = T),
          class: "hero-motto-input",
          type: "text",
          placeholder: i(d)("motto.placeholder"),
          maxlength: "60",
          onBlur: l,
          onKeydown: x
        }, null, 40, jc)), [
          [ho, o.value]
        ]) : (c(), p("p", {
          key: 1,
          id: "greeting",
          class: "hero-motto-text",
          style: xe({ color: i(Ie).greetColor }),
          onClick: f
        }, [
          n("span", zc, u(g.value), 1),
          i(Z).history.length > 1 ? (c(), p("span", {
            key: 0,
            class: "motto-scroll-hint",
            title: i(d)("motto.scrollHint")
          }, "⇕", 8, Gc)) : E("", !0)
        ], 4))
      ], 40, Kc),
      (c(), pe(yt, { to: "body" }, [
        i(Z).menuOpen ? (c(), p("div", {
          key: 0,
          class: "motto-context-menu",
          style: xe({ left: `${i(Z).menuPos.x}px`, top: `${i(Z).menuPos.y}px` }),
          onClick: y[3] || (y[3] = G(() => {
          }, ["stop"])),
          onContextmenu: y[4] || (y[4] = G(() => {
          }, ["prevent"]))
        }, [
          n("div", Vc, [
            n("span", null, u(i(d)("motto.customTitle")), 1),
            n("small", Uc, u(i(d)("motto.recordsCount", { count: i(Z).history.length })), 1)
          ]),
          n("button", {
            type: "button",
            class: "motto-menu-action",
            onClick: f
          }, [
            y[5] || (y[5] = n("i", null, "✎", -1)),
            n("span", null, u(i(d)("motto.editCurrent")), 1)
          ]),
          y[8] || (y[8] = n("div", { class: "motto-menu-divider" }, null, -1)),
          n("div", Yc, u(i(d)("motto.historyLabel")), 1),
          n("div", Xc, [
            i(Z).history.length ? (c(!0), p(Q, { key: 1 }, be(i(Z).history, (T) => (c(), p("div", {
              key: T.id,
              class: de(["motto-history-item", { active: i(Z).customText === T.text }]),
              onClick: (w) => i(ct).selectHistory(T)
            }, [
              n("span", Zc, u(T.date), 1),
              n("span", {
                class: "motto-item-text",
                title: r(T.text)
              }, u(r(T.text)), 9, Qc),
              n("button", {
                type: "button",
                class: "motto-item-del",
                title: i(d)("motto.deleteEntry"),
                onClick: G((w) => i(ct).deleteEntry(T.id), ["stop"])
              }, "×", 8, ed)
            ], 10, Jc))), 128)) : (c(), p("div", qc, u(i(d)("motto.historyEmpty")), 1))
          ]),
          y[9] || (y[9] = n("div", { class: "motto-menu-divider" }, null, -1)),
          n("button", {
            type: "button",
            class: "motto-menu-action reset-btn",
            onClick: y[1] || (y[1] = //@ts-ignore
            (...T) => i(ct).resetToSystem && i(ct).resetToSystem(...T))
          }, [
            y[6] || (y[6] = n("i", null, "↻", -1)),
            n("span", null, u(i(d)("motto.resetGreeting")), 1)
          ]),
          i(Z).history.length ? (c(), p("button", {
            key: 0,
            type: "button",
            class: "motto-menu-action danger-btn",
            onClick: y[2] || (y[2] = //@ts-ignore
            (...T) => i(ct).clearHistory && i(ct).clearHistory(...T))
          }, [
            y[7] || (y[7] = n("i", null, "🗑", -1)),
            n("span", null, u(i(d)("motto.clearAll")), 1)
          ])) : E("", !0)
        ], 36)) : E("", !0)
      ]))
    ], 64));
  }
}), od = /* @__PURE__ */ We(td, [["__scopeId", "data-v-a65048d3"]]), nd = /* @__PURE__ */ he({
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
      const l = Gt.state.timezone;
      if (!l || l === "local") return /* @__PURE__ */ new Date();
      try {
        const h = (/* @__PURE__ */ new Date()).toLocaleString("en-US", { timeZone: l });
        return new Date(h);
      } catch {
        return /* @__PURE__ */ new Date();
      }
    }
    function a() {
      const l = (U) => String(U).padStart(2, "0"), h = s(), x = h.getHours(), F = h.getMinutes(), m = h.getSeconds(), D = h.getFullYear(), v = h.getMonth() + 1, y = h.getDate(), T = h.getDay(), w = `${l(x)}:${l(F)}`, _ = `:${l(m)}`, L = o(x), B = d(t[T]), H = d("clock.datePattern", {
        year: D,
        month: v,
        day: y,
        week: B
      });
      ro.updateTime(w, _, L, H);
    }
    function r(l) {
      l.preventDefault(), Gt.open({ clientX: l.clientX, clientY: l.clientY });
    }
    function g() {
      document.hidden ? f && (clearInterval(f), f = null) : (a(), f || (f = setInterval(a, 1e3)));
    }
    let f = null;
    return Gt.initPreferences(), a(), Xe(() => {
      Gt.initPreferences(), Pe(mt, () => {
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
}), vs = /* @__PURE__ */ We(nd, [["__scopeId", "data-v-f946341c"]]), id = {
  key: 0,
  class: "home-music-degraded-box"
}, sd = { class: "degraded-badge-row" }, ad = { class: "degraded-status" }, rd = {
  key: 0,
  class: "degraded-host-tag"
}, ld = {
  key: 1,
  class: "degraded-host-tag"
}, cd = { class: "degraded-title-row" }, dd = ["title"], ud = { class: "degraded-track-artist" }, pd = { class: "degraded-progress-bar-wrap" }, hd = { class: "degraded-actions" }, fd = { class: "degraded-time" }, gd = { class: "home-vinyl-box" }, md = ["title"], vd = ["src", "alt"], wd = { class: "home-music-right" }, yd = ["title"], bd = {
  id: "home-music-artist",
  class: "home-music-meta-artist"
}, kd = { class: "home-music-seek-row" }, _d = {
  id: "home-music-cur",
  class: "home-music-time"
}, Cd = ["value"], xd = {
  id: "home-music-dur",
  class: "home-music-time"
}, Ld = { class: "home-music-actions" }, $d = ["title"], Sd = ["title"], Td = ["title"], Id = ["title"], Md = ["title"], Dd = /* @__PURE__ */ he({
  __name: "HomeMusicCard",
  setup(e) {
    Xe(() => {
      setTimeout(() => {
        Vs();
      }, 200);
    });
    const t = te(() => Gi.visible || gt.djModalOpen || gt.isActive && gt.isJoined), o = te(() => gt.isActive && gt.isJoined), s = te(() => !oe.title || oe.title === "点击播放" ? d("home.music.defaultTitle") : oe.title), a = te(() => !oe.artist || oe.artist === "作者" ? d("home.music.defaultArtist") : oe.artist), r = te(() => oe.mode === "shuffle" ? "🔀" : oe.mode === "one" ? "🔂" : "🔁");
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
      t.value ? (c(), p("div", id, [
        n("div", sd, [
          h[7] || (h[7] = n("span", { class: "degraded-icon" }, "🎧", -1)),
          n("strong", ad, u(o.value ? i(d)("home.music.togetherListening") : i(d)("home.music.backgroundListening")), 1),
          o.value ? (c(), p("span", rd, " DJ: " + u(i(gt).hostName), 1)) : (c(), p("span", ld, u(i(d)("home.music.workspaceReady")), 1))
        ]),
        n("div", cd, [
          n("h3", {
            class: "degraded-track-title",
            title: s.value
          }, u(s.value || i(d)("home.music.standby")), 9, dd),
          n("p", ud, u(a.value), 1)
        ]),
        n("div", pd, [
          n("div", {
            class: "degraded-progress-bar-fill",
            style: xe({ width: i(oe).progressPercent + "%" })
          }, null, 4)
        ]),
        n("div", hd, [
          n("button", {
            type: "button",
            class: "degraded-btn",
            onClick: h[0] || (h[0] = (x) => i(et).togglePlay())
          }, u(i(oe).playing ? i(d)("home.music.pause") : i(d)("home.music.play")), 1),
          n("span", fd, u(i(oe).formattedCurrent) + " / " + u(i(oe).formattedDuration), 1)
        ])
      ])) : (c(), p(Q, { key: 1 }, [
        n("div", gd, [
          n("div", {
            id: "home-vinyl-needle",
            class: de(["home-vinyl-needle", { playing: i(oe).playing }])
          }, [...h[8] || (h[8] = [
            Io('<svg viewBox="0 0 32 52" fill="none" data-v-b7cbb119><circle cx="26" cy="4" r="3.5" fill="#e2e8f0" stroke="#475569" stroke-width="1.5" data-v-b7cbb119></circle><circle cx="26" cy="4" r="1.5" fill="#64748b" data-v-b7cbb119></circle><path d="M26 4 L14 26 L11 44" stroke="#cbd5e1" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" data-v-b7cbb119></path><rect x="7" y="42" width="8" height="9" rx="1.5" fill="#f43f5e" transform="rotate(-15 11 46)" data-v-b7cbb119></rect></svg>', 1)
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
            }, null, 40, vd)) : E("", !0),
            h[9] || (h[9] = n("div", { class: "home-vinyl-hole" }, null, -1))
          ], 10, md)
        ]),
        n("div", wd, [
          n("h3", {
            id: "home-music-title",
            class: "home-music-meta-title",
            title: s.value
          }, u(s.value), 9, yd),
          n("p", bd, u(a.value), 1),
          n("div", kd, [
            n("span", _d, u(i(oe).formattedCurrent), 1),
            n("input", {
              id: "home-music-seek",
              class: "home-music-seek-bar",
              type: "range",
              min: "0",
              max: "100",
              value: i(oe).progressPercent,
              onInput: g
            }, null, 40, Cd),
            n("span", xd, u(i(oe).formattedDuration), 1)
          ]),
          n("div", Ld, [
            n("button", {
              id: "home-music-prev",
              class: "home-music-btn",
              type: "button",
              title: i(d)("home.music.prevTrack"),
              onClick: h[2] || (h[2] = (x) => i(et).prev())
            }, " ⏮ ", 8, $d),
            n("button", {
              id: "home-music-play",
              class: "home-music-btn play-btn",
              type: "button",
              title: i(d)("home.music.togglePlay"),
              onClick: h[3] || (h[3] = (x) => i(et).togglePlay())
            }, u(i(oe).playing ? "⏸" : "▶"), 9, Sd),
            n("button", {
              id: "home-music-next",
              class: "home-music-btn",
              type: "button",
              title: i(d)("home.music.nextTrack"),
              onClick: h[4] || (h[4] = (x) => i(et).next())
            }, " ⏭ ", 8, Td),
            n("button", {
              id: "home-music-like",
              class: de(["home-music-btn like-btn", { liked: i(oe).liked }]),
              type: "button",
              title: i(d)("home.music.favorite"),
              onClick: h[5] || (h[5] = (x) => i(et).toggleLike())
            }, u(i(oe).liked ? "♥" : "♡"), 11, Id),
            n("button", {
              id: "home-music-mode",
              class: "home-music-btn",
              type: "button",
              title: i(d)("home.music.playMode"),
              onClick: h[6] || (h[6] = (x) => i(et).cycleMode())
            }, u(r.value), 9, Md)
          ])
        ])
      ], 64))
    ], 2));
  }
}), ws = /* @__PURE__ */ We(Dd, [["__scopeId", "data-v-b7cbb119"]]), Lt = /* @__PURE__ */ new Map(), $t = /* @__PURE__ */ new Set();
function Ad(e, t) {
  for (Lt.delete(e), Lt.set(e, t), $t.delete(t), $t.add(t); Lt.size > 512; )
    Lt.delete(Lt.keys().next().value);
  for (; $t.size > 512; )
    $t.delete($t.values().next().value);
}
const Ed = {
  key: 0,
  class: "launcher-fallback"
}, Pd = ["src"], Bn = "lw_resolved_icon:", Wd = /* @__PURE__ */ he({
  __name: "LauncherFavicon",
  props: {
    link: {},
    mini: { type: Boolean, default: !1 }
  },
  setup(e) {
    function t(w) {
      try {
        return localStorage.getItem(Bn + w) || "";
      } catch {
        return "";
      }
    }
    function o(w, _) {
      try {
        localStorage.setItem(Bn + w, _);
      } catch {
      }
    }
    function s(w) {
      try {
        return localStorage.getItem("lw_sync_dataurl:" + w) || "";
      } catch {
        return "";
      }
    }
    const a = e;
    function r(w) {
      try {
        return new URL(w).hostname.replace(/^www\./, "");
      } catch {
        return w || "";
      }
    }
    function g(w) {
      try {
        return new URL(w).origin;
      } catch {
        return "";
      }
    }
    function f(w) {
      try {
        const _ = window, L = typeof _.chrome < "u" ? _.chrome : globalThis.chrome;
        if (typeof L?.runtime?.getURL == "function")
          return L.runtime.getURL("_favicon/?pageUrl=" + encodeURIComponent(w) + "&size=64");
      } catch {
      }
      return "";
    }
    const l = te(() => {
      const w = a.link, _ = (w.title || r(w.url)).trim();
      return _ ? _.slice(0, 1).toUpperCase() : "🔗";
    }), h = j([]), x = j(0), F = j(!1), m = j(!1), D = te(() => m.value || x.value >= h.value.length ? "" : h.value[x.value] || "");
    function v() {
      const w = a.link;
      if (!w?.url) {
        h.value = [], m.value = !0, F.value = !1;
        return;
      }
      const _ = [], L = s(w.url);
      L && _.push(L);
      const B = Lt.get(w.url) || t(w.url);
      B && !_.includes(B) && _.push(B);
      const H = (R) => R ? /google\.com\/s2\/favicons|icons\.duckduckgo\.com|unavatar\.io|icon\.horse/i.test(R) : !1;
      w.customIcon && !H(w.customIcon) && _.push(w.customIcon), w.icon && !H(w.icon) && _.push(w.icon);
      const U = f(w.url);
      U && !_.includes(U) && _.push(U);
      const M = Ae.getCachedIcon(w.url);
      M && !_.includes(M) && _.push(M);
      const k = g(w.url);
      k && !k.startsWith("http://1.") && !k.startsWith("http://192.") && !k.startsWith("http://127.") && _.push(`${k}/favicon.ico`), w.customIcon && !H(w.customIcon) && _.unshift(w.customIcon);
      const $ = [...new Set(_.filter(Boolean))];
      h.value = $, x.value = 0, m.value = $.length === 0;
      const ee = $[0];
      ee && (ee.startsWith("data:") || $t.has(ee)) && (F.value = !0);
    }
    Pe(
      () => [a.link?.url, a.link?.icon, a.link?.customIcon],
      (w, _) => {
        _ && w[0] === _[0] && w[1] === _[1] && w[2] === _[2] || v();
      },
      { immediate: !0 }
    ), Xe(() => {
      h.value.length === 0 && v();
    });
    function y(w) {
      F.value = !0, m.value = !1;
      const _ = D.value;
      if (_) {
        const L = $t.has(_), B = Lt.get(a.link.url);
        Ad(a.link.url, _), B !== _ && t(a.link.url) !== _ && o(a.link.url, _);
        const H = w.target;
        if (!L && !_.startsWith("data:")) {
          const U = a.link.url;
          setTimeout(() => {
            Ae.cacheIcon(U, _, H?.getAttribute("src") === _ ? H : null);
          }, 0);
        }
      }
    }
    function T() {
      const w = D.value;
      if (w) {
        $t.delete(w), Lt.get(a.link.url) === w && Lt.delete(a.link.url);
        try {
          localStorage.removeItem(Bn + a.link.url), localStorage.removeItem("lw_sync_dataurl:" + a.link.url);
        } catch {
        }
      }
      if (w && Ae.getCachedIcon(a.link.url) === w && Ae.evictCachedIcon(a.link.url), x.value + 1 < h.value.length) {
        x.value += 1;
        const _ = h.value[x.value];
        _ && (_.startsWith("data:") || $t.has(_)) && (F.value = !0);
      } else
        m.value = !0, F.value = !1;
    }
    return (w, _) => (c(), p("span", {
      class: de(e.mini ? "launcher-folder-mini" : "launcher-favicon")
    }, [
      m.value || !D.value ? (c(), p("span", Ed, u(l.value), 1)) : (c(), p("img", {
        key: 1,
        src: D.value,
        alt: "",
        draggable: "false",
        referrerpolicy: "no-referrer",
        decoding: "async",
        style: { "pointer-events": "none", "user-select": "none" },
        onLoad: y,
        onError: T
      }, null, 40, Pd))
    ], 2));
  }
}), mn = /* @__PURE__ */ We(Wd, [["__scopeId", "data-v-bc41d0d8"]]), Rd = { class: "launcher-label launcher-title" }, Nd = ["title"], Od = {
  key: 0,
  class: "launcher-folder-more"
}, Bd = {
  key: 1,
  class: "empty-folder",
  "aria-hidden": "true"
}, Fd = { class: "launcher-folder-label launcher-title" }, Hd = /* @__PURE__ */ he({
  __name: "LauncherTileContent",
  props: {
    link: {},
    folder: {},
    size: { default: "small" }
  },
  setup(e) {
    const t = e, o = te(() => t.size === "large" ? 9 : 4), s = te(() => t.folder?.preview.slice(0, t.folder.count > o.value ? o.value - 1 : o.value) || []);
    return (a, r) => e.link ? (c(), p(Q, { key: 0 }, [
      J(mn, { link: e.link }, null, 8, ["link"]),
      n("span", Rd, u(e.link.title), 1)
    ], 64)) : e.folder ? (c(), p(Q, { key: 1 }, [
      n("div", {
        class: "launcher-folder-preview",
        title: `打开${e.folder.title}`
      }, [
        (c(!0), p(Q, null, be(s.value, (g) => (c(), pe(mn, {
          key: g.id,
          link: g,
          mini: !0
        }, null, 8, ["link"]))), 128)),
        e.folder.count > o.value ? (c(), p("span", Od, "+" + u(e.folder.count - (o.value - 1)), 1)) : E("", !0),
        s.value.length ? E("", !0) : (c(), p("span", Bd, "📁")),
        Ki(a.$slots, "default", {}, void 0, !0)
      ], 8, Nd),
      n("span", Fd, u(e.folder.title), 1)
    ], 64)) : E("", !0);
  }
}), Ro = /* @__PURE__ */ We(Hd, [["__scopeId", "data-v-7f513029"]]), ys = 5, bs = 180;
function ks(e, t, o) {
  const s = t - e.left, a = o - e.top;
  return s > e.width * 0.25 && s < e.width * 0.75 && a > e.height * 0.25 && a < e.height * 0.75;
}
function _s(e, t, o) {
  return Math.hypot(t - (e.left + e.width / 2), o - (e.top + e.height / 2)) <= Math.max(e.width, e.height) * 0.55;
}
const Kd = {
  class: "launcher-group launcher-aihot launcher-todoist size-large",
  id: "launcher-todoist"
}, jd = { class: "card-head aihot-home-head" }, zd = { class: "title" }, Gd = ["title"], Vd = ["title"], Ud = {
  class: "aihot-home-body",
  id: "aihot-home-body"
}, Yd = {
  key: 0,
  class: "muted small"
}, Xd = {
  key: 1,
  class: "notice small"
}, qd = {
  key: 2,
  class: "muted small aihot-home-empty"
}, Jd = {
  key: 3,
  class: "aihot-home-rich-list"
}, Zd = ["href", "title", "onClick"], Qd = { class: "aihot-home-rich-main" }, eu = { class: "aihot-home-rich-title" }, tu = {
  key: 0,
  class: "aihot-home-rich-summary"
}, ou = { class: "aihot-home-rich-meta" }, nu = { class: "aihot-home-rich-meta-left" }, iu = {
  key: 0,
  class: "aihot-home-rich-tag"
}, su = { class: "aihot-home-rich-source" }, au = { class: "aihot-home-rich-time" }, Pi = 6, ru = /* @__PURE__ */ he({
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
    }, o = j([]), s = j(0), a = j(!0), r = j("");
    function g(w) {
      return mt.value === "en" && w.originalTitle ? w.originalTitle : w.title;
    }
    function f(w) {
      const _ = w.source?.name || w.sourceName || "AI HOT";
      return mt.value === "en" && _.includes("：") ? _.split("：")[0].trim() : _;
    }
    function l(w) {
      if (!w.category) return "";
      const _ = t[w.category];
      if (_)
        try {
          return d(_);
        } catch {
        }
      return w.category;
    }
    const h = te(() => mt.value !== "en" ? o.value : [...o.value].sort((w, _) => {
      const L = !!(w.originalTitle && /[a-zA-Z]{3,}/.test(w.originalTitle)), B = !!(_.originalTitle && /[a-zA-Z]{3,}/.test(_.originalTitle));
      return L && !B ? -1 : !L && B ? 1 : 0;
    }));
    function x(w) {
      const _ = w.publishedAt || w.published || "";
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
    async function D(w = !1) {
      if (!w && o.value.length > 0) return;
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
      s.value += Pi, s.value >= h.value.length && (s.value = 0);
    }
    function y() {
      const w = window;
      if (typeof w.enterFullscreenCard == "function") {
        w.enterFullscreenCard("daily-aihot");
        return;
      }
      const _ = document.querySelector("#daily-aihot, [data-dock-id='daily-aihot']");
      _ ? _.scrollIntoView({ behavior: "smooth", block: "start" }) : window.open("https://aihot.virxact.com", "_blank", "noreferrer");
    }
    function T(w, _) {
      if (_.ctrlKey || _.metaKey || _.shiftKey || _.button === 1) return;
      _.preventDefault();
      const L = w.links?.original || w.links?.aihot || w.url || "#";
      li.openArticle(
        {
          id: w.id,
          title: g(w),
          summary: w.summary,
          sourceName: f(w),
          published: x(w),
          url: L
        },
        ""
      );
    }
    return Xe(() => {
      D();
    }), (w, _) => (c(), p("section", Kd, [
      n("header", jd, [
        _[0] || (_[0] = n("span", { class: "bar cyan" }, null, -1)),
        n("strong", zd, u(i(d)("aihot.card.title")), 1),
        _[1] || (_[1] = n("span", { class: "grow" }, null, -1)),
        n("button", {
          class: "aihot-home-btn",
          type: "button",
          title: i(d)("aihot.card.refreshBtnTip"),
          onClick: v
        }, u(i(d)("aihot.card.refreshBtn")), 9, Gd),
        n("button", {
          class: "aihot-home-btn aihot-home-more-btn",
          type: "button",
          title: i(d)("aihot.card.hotlistBtnTip"),
          onClick: y
        }, u(i(d)("aihot.card.hotlistBtn")), 9, Vd)
      ]),
      n("div", Ud, [
        a.value && !h.value.length ? (c(), p("p", Yd, u(i(d)("aihot.card.loading")), 1)) : r.value && !h.value.length ? (c(), p("p", Xd, u(r.value), 1)) : h.value.length ? (c(), p("div", Jd, [
          (c(!0), p(Q, null, be(h.value.slice(s.value, s.value + Pi), (L, B) => (c(), p("a", {
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
            n("div", Qd, [
              n("h3", eu, u(g(L)), 1),
              L.summary ? (c(), p("p", tu, u(L.summary), 1)) : E("", !0),
              n("div", ou, [
                n("div", nu, [
                  l(L) ? (c(), p("span", iu, u(l(L)), 1)) : E("", !0),
                  n("span", su, u(f(L)), 1)
                ]),
                n("time", au, u(x(L)), 1)
              ])
            ])
          ], 8, Zd))), 128))
        ])) : (c(), p("p", qd, u(i(d)("aihot.card.empty")), 1))
      ])
    ]));
  }
}), lu = /* @__PURE__ */ We(ru, [["__scopeId", "data-v-5b229fc1"]]), cu = ["aria-label"], du = ["disabled", "aria-pressed"], uu = ["disabled", "aria-pressed"], pu = ["aria-label"], hu = ["data-page", "title", "onClick", "onContextmenu", "onDragover", "onDrop"], fu = {
  key: 0,
  id: "bookmark-board-header",
  class: "launcher-page-tabs"
}, gu = ["data-page"], mu = ["href", "title", "data-launcher-id", "onPointerdown", "onClick", "onContextmenu"], vu = ["title", "data-launcher-folder", "onPointerdown", "onDragstart", "onDrop", "onClick", "onContextmenu"], wu = ["title", "onClick"], yu = {
  class: "launcher-folder-count",
  hidden: ""
}, bu = {
  class: "launcher-empty",
  key: "empty-msg"
}, ku = {
  key: 1,
  class: "launcher-media-stack"
}, _u = {
  key: 1,
  id: "launcher-bili"
}, Cu = { class: "launcher-folder-preview" }, xu = { class: "launcher-folder-label launcher-title" }, Lu = { class: "launcher-label launcher-title" }, $u = /* @__PURE__ */ he({
  __name: "FavoriteSites",
  setup(e) {
    const t = X(() => import("./BookmarkBoard-BDspiIka.js")), o = X(() => import("./LauncherBookGuideDialog-DYQT3xnH.js")), s = j("sites"), a = j(!1), r = j(!1);
    function g() {
      r.value = !0;
    }
    function f() {
      r.value = !1;
    }
    function l() {
      ye(), y = !1, me = !1;
    }
    Xe(() => {
      ze.setExternalDragHandler(M), ze.setExternalDropHandler(k), window.addEventListener("blur", l), window.addEventListener("pagehide", l), document.addEventListener("visibilitychange", l);
      const b = window;
      ue.hasBili && typeof b.ensureLauncherMediaCards == "function" && b.ensureLauncherMediaCards();
    });
    const h = j(!1), x = j(""), F = j(null), m = j(null), D = j(null), v = j(null);
    let y = !1, T = 0, w = 0, _ = 0, L = "", B = 0, H = "", U = 0;
    function M(b) {
      if (s.value !== "sites") return;
      if (!b || _t.isOpen) {
        v.value && (v.value = null), H = "";
        return;
      }
      const C = document.elementsFromPoint(b.clientX, b.clientY);
      if (!C.some(
        (Ve) => Ve.classList.contains("launcher-site-items") || !!Ve.closest?.(".launcher-site-items")
      )) {
        v.value && (v.value = null), H = "";
        return;
      }
      const P = C.find((Ve) => Ve.classList.contains("launcher-link") && Ve.getAttribute("data-launcher-id") !== String(b.link.id) || Ve.classList.contains("launcher-folder"));
      if (!P) return;
      const se = P.classList.contains("launcher-link"), _e = se ? P.getAttribute("data-launcher-id") : null, Ke = se ? null : P.getAttribute("data-launcher-folder"), re = se ? `link-${_e}` : `folder-${Ke}`, le = P.getBoundingClientRect(), Je = le.left + le.width / 2, _n = le.top + le.height / 2, bo = Math.hypot(b.clientX - Je, b.clientY - _n), Xt = Date.now();
      if (bo > Math.max(le.width, le.height) * 0.55 || re === H && Xt - U < 180) return;
      const qt = Ut.value.filter(
        (Ve) => Ve.type !== "link" || String(Ve.link.id) !== String(b.link.id)
      ), vt = [...v.value || qt], Dt = vt.findIndex(
        (Ve) => Ve.type === "link" && String(Ve.link.id) === String(b.link.id)
      ), At = vt.findIndex((Ve) => Ve.key === re);
      if (At < 0) return;
      const at = {
        key: `link-${b.link.id}`,
        type: "link",
        link: b.link
      };
      Dt >= 0 ? Dt !== At && (vt.splice(Dt, 1), vt.splice(At, 0, at), v.value = vt, H = re, U = Xt) : (vt.splice(At, 0, at), v.value = vt, H = re, U = Xt);
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
    let ee = null, R = 0, V = 0, N = null, Y = null, me = !1;
    function Ce(b, C) {
      if (C.button !== 0) return;
      ee = C.pointerId, R = C.clientX, V = C.clientY, w = C.clientX, _ = C.clientY, N = String(b.id), Y = null, me = !1;
      const S = C.currentTarget.getBoundingClientRect();
      $.offsetX = C.clientX - S.left, $.offsetY = C.clientY - S.top, $.type = "link", $.link = b, $.folder = null, window.addEventListener("pointermove", ve, { passive: !1 }), window.addEventListener("pointerup", Se), window.addEventListener("pointercancel", Se);
    }
    function qe(b, C, S) {
      if (S.button !== 0 || S.target.closest(".launcher-folder-del-btn")) return;
      ee = S.pointerId, R = S.clientX, V = S.clientY, w = S.clientX, _ = S.clientY, N = null, Y = b, me = !1;
      const P = S.currentTarget.getBoundingClientRect();
      $.offsetX = S.clientX - P.left, $.offsetY = S.clientY - P.top, $.type = "folder", $.folder = {
        groupName: b,
        size: Oe(b),
        links: C?.links || []
      }, $.link = null, window.addEventListener("pointermove", ve, { passive: !1 }), window.addEventListener("pointerup", Se), window.addEventListener("pointercancel", Se);
    }
    let A = 0, W = null;
    function z() {
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
      const C = Math.hypot(b.clientX - R, b.clientY - V);
      if (!me && C > ys && (me = !0, y = !0, N ? m.value = N : Y && (D.value = Y)), !me) return;
      ($.link || $.folder) && ($.visible = !0, $.x = b.clientX - $.offsetX, $.y = b.clientY - $.offsetY);
      const S = document.elementsFromPoint(b.clientX, b.clientY);
      if (hi()) {
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
          const le = re.classList.contains("launcher-link"), Je = le ? re.getAttribute("data-launcher-id") : null, _n = le ? null : re.getAttribute("data-launcher-folder"), bo = le ? `link-${Je}` : `folder-${_n}`, Xt = re.getBoundingClientRect();
          let qt = !0;
          N && !le && (ks(Xt, b.clientX, b.clientY) ? (qt = !1, re.classList.add("drop-target")) : re.classList.remove("drop-target"));
          const vt = Date.now();
          if (_s(Xt, b.clientX, b.clientY) || (qt = !1), bo === L && vt - B < bs && (qt = !1), qt) {
            document.querySelectorAll(".launcher-folder.drop-target").forEach((at) => at.classList.remove("drop-target"));
            const Dt = se.findIndex((at) => at.key === _e), At = se.findIndex((at) => at.key === bo);
            if (Dt >= 0 && At >= 0 && Dt !== At) {
              const at = se.slice(), Ve = at.splice(Dt, 1)[0];
              at.splice(At, 0, Ve), v.value = at, L = bo, B = vt;
            }
          }
        }
      }
      const Ke = S.find((re) => re.classList.contains("launcher-page-tab"));
      if (Ke) {
        const re = Ke.getAttribute("data-page");
        re && re !== ue.activePage && Ke.classList.add("drop-target");
      } else
        document.querySelectorAll(".launcher-page-tab.drop-target").forEach((re) => re.classList.remove("drop-target"));
    }
    async function Se(b) {
      if (b.pointerId === ee) {
        z(), b.type === "pointercancel" ? ye() : ke(b), window.removeEventListener("pointermove", ve), window.removeEventListener("pointerup", Se), window.removeEventListener("pointercancel", Se);
        try {
          if (me) {
            T = Date.now(), y = !1;
            const C = document.elementsFromPoint(b.clientX, b.clientY);
            if (document.querySelectorAll(".launcher-page-tab.drop-target").forEach((P) => P.classList.remove("drop-target")), document.querySelectorAll(".launcher-folder.drop-target").forEach((P) => P.classList.remove("drop-target")), hi() && _t.activeFolder) {
              if (C.some(
                (se) => se.id === "launcher-folder-dialog" || !!se.closest?.("#launcher-folder-dialog")
              )) {
                const _e = C.find((Ke) => Ke.hasAttribute("data-child-folder"))?.getAttribute("data-child-folder") || _t.activeFolder;
                N ? await Ae.moveLinkTo(N, void 0, _e) : Y && await Ae.moveFolderInto(Y, _e);
              }
              return;
            }
            const S = C.find((P) => P.classList.contains("launcher-page-tab"));
            if (S) {
              const P = S.getAttribute("data-page");
              if (P) {
                N ? (await Ae.moveLinkTo(N, P, "常用网站"), await Ae.setPage(P)) : Y && await Ae.moveFolderToPage(Y, P), ye();
                return;
              }
            }
            if (N) {
              const P = C.find((se) => se.classList.contains("launcher-folder"));
              if (P) {
                const se = P.getAttribute("data-launcher-folder");
                if (se) {
                  await Ae.moveLinkTo(N, ue.activePage, se), ye();
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
          ye();
        }
      }
    }
    function ye() {
      z(), ee = null, N = null, Y = null, me = !1, y = !1, m.value = null, D.value = null, v.value = null, $.visible = !1, $.link = null, $.folder = null, L = "", document.querySelector("#launcher-folder-dialog")?.classList.remove("drop-hover-valid"), _t.dropHoverValid = !1, window.removeEventListener("pointermove", ve), window.removeEventListener("pointerup", Se), window.removeEventListener("pointercancel", Se);
    }
    Nt(() => {
      ze.setExternalDragHandler(null), ze.setExternalDropHandler(null), ye(), window.removeEventListener("blur", l), window.removeEventListener("pagehide", l), document.removeEventListener("visibilitychange", l), window.removeEventListener("pointermove", ve), window.removeEventListener("pointerup", Se), window.removeEventListener("pointercancel", Se);
    });
    function Re(b) {
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
    function Mt(b) {
      return b === "large" ? 9 : 4;
    }
    function Ot(b, C) {
      const S = Mt(C), P = b.length > S ? S - 1 : S;
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
        mi(ue.folders, le) || (le === "常用网站" ? _e.push({ key: `link-${re.id}`, type: "link", link: re }) : se.has(le) || (se.add(le), _e.push({
          key: `folder-${le}`,
          type: "folder",
          folder: {
            groupName: le,
            pageName: b,
            links: P.get(le) || []
          }
        })));
      });
      const Ke = ue.folders;
      return Ke && Object.entries(Ke).forEach(([re, le]) => {
        if (mi(ue.folders, re)) return;
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
    }), wo = te(() => v.value && v.value.length ? v.value : Ut.value), nt = te(() => {
      const b = ue.activePage || "常用网站", C = Re(b);
      return C === "默认" || b === "常用网站" ? "还没有快捷入口，点击“编辑入口”后添加。" : `“${C}”还是空的，把网站拖到这里。`;
    });
    function Ho(b) {
      v.value = null, m.value = null, D.value = null, ze.switchPage(b);
    }
    function Ko() {
      h.value = !0, x.value = "", St(() => {
        F.value?.focus();
      });
    }
    function yo() {
      if (!h.value) return;
      const b = x.value.trim();
      h.value = !1, b && ze.addPage(b);
    }
    function jo(b) {
      b.key === "Enter" ? (b.preventDefault(), yo()) : b.key === "Escape" && (h.value = !1);
    }
    function Yt(b, C) {
      ze.openPageMenu(b, C);
    }
    function zo(b) {
      const C = b.target;
      if (!C || C.closest(".launcher-link") || C.closest(".launcher-folder") || C.closest(".launcher-page-tab") || C.closest("button") || C.closest("input"))
        return;
      b.preventDefault();
      const S = ue.activePage || "常用网站";
      ai.openBlankMenu(S, b.clientX, b.clientY);
    }
    function I(b) {
      s.value === "sites" && (!b.shiftKey || ue.pages.length < 2 || (b.preventDefault(), b.deltaY > 0 || b.deltaX > 0 ? ze.nextPage() : ze.prevPage()));
    }
    function O(b) {
      b.target.closest(".launcher-page-tab") || b.stopPropagation();
    }
    function K(b) {
      b.button === 0 && (w = b.clientX, _ = b.clientY);
    }
    function fe(b, C) {
      if (C.preventDefault(), C.stopPropagation(), Ye.isEditingShortcuts) {
        Ye.handleLinkSelection(b);
        return;
      }
      ee || (y = !1), !(Math.hypot(C.clientX - w, C.clientY - _) >= 6 || y || Date.now() - T < 600) && ze.openLink(b, C);
    }
    function ft(b, C) {
      ze.openLinkMenu(b, C);
    }
    function bt(b, C) {
      if (ee || (y = !1), y || Date.now() - T < 450) {
        C.preventDefault(), C.stopPropagation();
        return;
      }
      ze.openFolder(b, C);
    }
    function Bt(b, C, S) {
      ze.openFolderMenu(b, C, S);
    }
    function $s(b) {
      ze.deleteFolder(b);
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
    function hi() {
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
          onPointerdown: C[5] || (C[5] = G(() => {
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
            }, u(i(d)("home.sites.favoriteSites")), 9, du),
            n("button", {
              type: "button",
              disabled: a.value,
              "aria-pressed": s.value === "bookmarks",
              onClick: C[1] || (C[1] = (S) => s.value = "bookmarks")
            }, u(i(d)("home.sites.bookmarks")), 9, uu)
          ], 8, cu),
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
              title: i(d)("home.sites.pageTabTitle", { label: Re(S) }),
              onPointerdown: C[2] || (C[2] = G(() => {
              }, ["stop"])),
              onClick: G((P) => Ho(S), ["prevent", "stop"]),
              onContextmenu: G((P) => Yt(S, P), ["prevent", "stop"]),
              onDragover: (P) => Ss(S, P),
              onDragleave: C[3] || (C[3] = (P) => Ts(P)),
              onDrop: (P) => Is(S, P)
            }, u(Re(S)), 43, hu))), 128)),
            h.value ? tt((c(), p("input", {
              key: 1,
              ref_key: "pageInputRef",
              ref: F,
              class: "launcher-page-input",
              maxlength: "12",
              placeholder: "例如：游戏区",
              "onUpdate:modelValue": C[4] || (C[4] = (S) => x.value = S),
              onKeydown: jo,
              onBlur: yo
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
          ], 8, pu), [
            [fo, s.value === "sites"]
          ]),
          s.value === "bookmarks" ? (c(), p("div", fu)) : E("", !0),
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
            default: It(() => [
              (c(!0), p(Q, null, be(wo.value, (S) => (c(), p(Q, {
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
                  onDragstart: C[7] || (C[7] = G(() => {
                  }, ["prevent"])),
                  onPointerdown: (P) => Ce(S.link, P),
                  onMousedown: C[8] || (C[8] = (P) => K(P)),
                  onClick: G((P) => fe(S.link, P), ["prevent"]),
                  onContextmenu: G((P) => ft(S.link, P), ["prevent"])
                }, [
                  J(Ro, {
                    link: S.link
                  }, null, 8, ["link"])
                ], 42, mu)) : S.type === "folder" ? (c(), p("div", {
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
                  onContextmenu: G((P) => Bt(S.folder.groupName, S.folder.pageName, P), ["prevent"])
                }, [
                  J(Ro, {
                    folder: { title: S.folder.groupName, preview: S.folder.links, count: S.folder.links.length },
                    size: Oe(S.folder.groupName)
                  }, {
                    default: It(() => [
                      n("button", {
                        class: "launcher-folder-del-btn",
                        type: "button",
                        title: `删除文件夹「${S.folder.groupName}」`,
                        "aria-label": "删除文件夹",
                        onPointerdown: C[9] || (C[9] = G(() => {
                        }, ["stop"])),
                        onClick: G((P) => $s(S.folder.groupName), ["stop", "prevent"])
                      }, " ✕ ", 40, wu)
                    ]),
                    _: 2
                  }, 1032, ["folder", "size"]),
                  n("span", yu, u(S.folder.links.length), 1)
                ], 42, vu)) : E("", !0)
              ], 64))), 128)),
              wo.value.length ? E("", !0) : (c(), p("p", bu, u(nt.value), 1))
            ]),
            _: 1
          }, 8, ["name"]))
        ], 40, gu), [
          [fo, s.value === "sites"]
        ])
      ], 32)) : E("", !0),
      i(ue).hasTodo || i(ue).hasBili ? (c(), p("div", ku, [
        i(ue).hasTodo ? (c(), pe(lu, { key: 0 })) : i(ue).hasBili ? (c(), p("div", _u)) : E("", !0)
      ])) : E("", !0),
      (c(), pe(yt, { to: "body" }, [
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
            n("div", Cu, [
              (c(!0), p(Q, null, be(Ot($.folder.links, $.folder.size), (S, P) => (c(), pe(mn, {
                key: S.id || P,
                link: S,
                mini: !0
              }, null, 8, ["link"]))), 128))
            ]),
            n("span", xu, u($.folder.groupName), 1)
          ], 64)) : $.link ? (c(), p(Q, { key: 1 }, [
            J(mn, {
              link: $.link
            }, null, 8, ["link"]),
            n("span", Lu, u($.link.title), 1)
          ], 64)) : E("", !0)
        ], 6)) : E("", !0)
      ])),
      J(i(o), {
        open: r.value,
        onClose: f
      }, null, 8, ["open"])
    ], 64));
  }
}), Cs = /* @__PURE__ */ We($u, [["__scopeId", "data-v-63287e7b"]]), dn = Object.keys(vo);
let tn = !1, Fn = 0, So, Hn;
function Wi(e) {
  for (const t of dn)
    Object.prototype.hasOwnProperty.call(e, t) && (vo[t] = e[t] !== !1);
}
function Su() {
  const e = vo;
  ze.setPrefs(e.showSites, e.showTodo, !e.showTodo && e.showBili), document.body.classList.toggle("hide-weather", !e.showWeather), document.body.classList.toggle("hide-sites", !e.showSites), document.body.classList.toggle("hide-bili", !e.showBili), document.body.classList.toggle("hide-youtube", !e.showYouTube), document.body.classList.toggle("hide-todo", !e.showTodo), document.body.classList.toggle("hide-bookmarks", !e.showBookmarkPanel), e.showBookmarkPanel || vn.close();
}
const Ri = {
  start() {
    if (tn) return;
    tn = !0;
    const e = ++Fn;
    Hn = Pe(() => dn.map((o) => vo[o]), Su, { immediate: !0, flush: "sync" });
    const t = globalThis.chrome;
    So = (o, s) => {
      if (s !== "local") return;
      const a = {};
      for (const r of dn) o[r] && (a[r] = o[r].newValue);
      Wi(a);
    }, t?.storage?.onChanged?.addListener(So), t?.storage?.local && t.storage.local.get(dn).then((o) => {
      tn && Fn === e && Wi(o || {});
    }).catch((o) => console.warn("[HomePrefs] 读取首页设置失败", o));
  },
  stop() {
    tn = !1, Fn++, Hn?.(), Hn = void 0, So && globalThis.chrome?.storage?.onChanged?.removeListener(So), So = void 0;
  }
}, Tu = {
  id: "launcher",
  class: "launcher",
  "aria-label": "快捷入口"
}, Iu = { class: "launcher-inner" }, Mu = { class: "launcher-overview" }, Du = ["title"], Au = { class: "card-head" }, Eu = { id: "wx-title" }, Pu = { id: "weather-body" }, Wu = { class: "launcher-center" }, Ru = {
  class: "hero-clock",
  id: "hero-clock"
}, Nu = {
  class: "launcher-widget launcher-task-threads launcher-music-card",
  "data-home-module": "taskThreads"
}, Ou = { class: "card-head" }, Bu = ["title"], Fu = {
  id: "task-thread-home",
  class: "task-thread-home home-music-body"
}, Hu = /* @__PURE__ */ he({
  __name: "AppLauncher",
  setup(e) {
    Xe(() => {
      un.initWallpaper();
    });
    function t() {
      Be.handleToolClick("music");
    }
    return (o, s) => (c(), p("section", Tu, [
      s[4] || (s[4] = n("div", {
        id: "hero-background-media",
        class: "hero-background-media",
        "aria-hidden": "true"
      }, null, -1)),
      n("div", Iu, [
        n("div", Mu, [
          tt(n("section", {
            class: "launcher-widget launcher-weather",
            "data-home-module": "weather",
            title: i(d)("weather.widgetSwitchTip")
          }, [
            n("header", Au, [
              s[1] || (s[1] = n("span", {
                class: "bar",
                style: { background: "linear-gradient(180deg,#38bdf8,#818cf8)" }
              }, null, -1)),
              n("h2", Eu, u(i(d)("weather.widgetTitle")), 1)
            ]),
            n("div", Pu, [
              J(ms)
            ])
          ], 8, Du), [
            [fo, i(vo).showWeather]
          ]),
          n("div", Wu, [
            n("div", Ru, [
              J(od),
              J(vs)
            ]),
            n("form", {
              id: "search",
              class: "search",
              onSubmit: s[0] || (s[0] = G(() => {
              }, ["prevent"]))
            }, [
              J(Hi)
            ], 32)
          ]),
          n("section", Nu, [
            n("header", Ou, [
              s[2] || (s[2] = n("span", { class: "bar music-purple" }, null, -1)),
              n("h2", null, u(i(d)("home.music.player")), 1),
              s[3] || (s[3] = n("span", { class: "grow" }, null, -1)),
              n("button", {
                id: "home-music-open-panel",
                class: "home-music-head-btn",
                type: "button",
                title: i(d)("home.music.openNeteaseTip"),
                onClick: t
              }, u(i(d)("home.music.openNetease")), 9, Bu)
            ]),
            n("div", Fu, [
              J(ws)
            ])
          ])
        ]),
        n("div", {
          id: "launcher-groups",
          class: de(["launcher-groups", { "has-sites": i(ue).showSites, "has-todoist": i(ue).hasTodo, "has-bili": i(ue).hasBili, "has-media": i(ue).hasTodo || i(ue).hasBili }])
        }, [
          J(Cs)
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
    return t ? t.lifecycle.isVisible() : $n(e) ? !!ga[e] : ma(e);
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
    if (this.markRunning(e), $n(e)) {
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
    if ($n(e)) {
      wi.close(e);
      return;
    }
    Be.close(e);
  },
  // 真正的关闭（Quit / 彻底从内存与 DOM 中卸载销毁，熄灭小圆点）
  async quitApp(e) {
    if (st(e)) {
      const a = Kn(e);
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
        const h = Kn(e);
        if (!h.ok) return h;
      }
      const g = Be.close(e), f = Ht(e);
      return po.delete(e), it[e] = !1, xt.removeActiveTool(e), await g, await St(), Ht(e) === f ? { ok: !0 } : { ok: !1, error: "模块已有后续操作，退出状态已变化。" };
    }
    this.hideApp(e), po.delete(e), xt.removeActiveTool(e), e in it && (it[e] = !1);
    const t = fa;
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
      const o = Kn(e);
      if (!o.ok) return o;
      const s = Be.close(e), a = Ht(e);
      return await s, Ht(e) !== a ? { ok: !1, error: "模块已有后续操作，重载已取消。" } : (it[e] = !1, await St(), Ht(e) !== a ? { ok: !1, error: "模块已有后续操作，未重新打开。" } : (Kt[e] = (Kt[e] || 0) + 1, Be.open(e), t.lifecycle.isVisible() ? (this.markRunning(e), { ok: !0 }) : { ok: !1, error: "模块当前不能打开，未重新显示窗口。" }));
    }
    this.hideApp(e), e in it ? (it[e] = !1, await St(), Kt[e] = (Kt[e] || 0) + 1, it[e] = !0) : Kt[e] = (Kt[e] || 0) + 1, await St(), this.openApp(e);
  }
}, To = /* @__PURE__ */ he({
  __name: "DockCardModuleHost",
  props: {
    id: {}
  },
  setup(e) {
    const o = st(e.id);
    if (!o || o.presentation !== "card") throw new Error("Unknown registered workspace card");
    const s = o;
    s.mountPolicy === "workspace-ready" && He.markRunning(s.id), Pe(s.lifecycle.isVisible, (h) => {
      h && He.markRunning(s.id);
    }, { immediate: !0, flush: "sync" });
    const a = te(() => !!it[s.id]);
    function r() {
      try {
        s.lifecycle.hide();
      } catch {
      }
      (Tt.activeId === s.id || Tt.activeId === s.rootId) && (Tt.activeId = null), He.hideApp(s.id), Ui(Tt.activeId);
    }
    function g() {
      He.reloadApp(s.id);
    }
    function f() {
      typeof window < "u" && window.location.reload();
    }
    const l = X({
      loader: s.loadView,
      onError(h, x, F, m) {
        m <= 2 ? x() : F();
      },
      errorComponent: he({
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
      key: i(He).getRenderKey(i(s).id)
    })) : E("", !0);
  }
}), Ku = { class: "logicweaver-workspaces-layer" }, ju = {
  key: 0,
  id: "daily-section",
  class: "wrap"
}, zu = { id: "vue-todoist-root" }, Gu = { id: "vue-bili-favorites-root" }, Vu = { id: "vue-youtube-root" }, Uu = { id: "vue-aihot-root" }, Yu = /* @__PURE__ */ he({
  __name: "AppWorkspaces",
  setup(e) {
    const t = j(!!Tt.activeId);
    return Xe(() => {
      t.value || (typeof window < "u" && "requestIdleCallback" in window ? window.requestIdleCallback(() => {
        t.value = !0;
      }, { timeout: 80 }) : setTimeout(() => {
        t.value = !0;
      }, 40));
    }), (o, s) => (c(), p("div", Ku, [
      t.value ? (c(), p("main", ju, [
        n("div", zu, [
          J(To, { id: "todoist" })
        ]),
        n("div", Gu, [
          J(To, { id: "daily-bilibili" })
        ]),
        tt(n("div", Vu, [
          J(To, { id: "daily-youtube" })
        ], 512), [
          [fo, i(vo).showYouTube]
        ]),
        n("div", Uu, [
          J(To, { id: "daily-aihot" })
        ]),
        J(To, { id: "card-github" })
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
    const o = e, s = t, a = te(() => !o.target || o.target.type !== "tool" ? !1 : He.isRunning(o.target.id)), r = te(() => !o.target || o.target.type !== "tool" ? !1 : He.isVisible(o.target.id)), { menuRef: g, style: f } = ci({
      visible: () => !!o.target,
      anchor: () => o.target || { x: 0, y: 0 },
      placement: no.position === "top" ? "below" : "above",
      align: "center",
      gap: 12,
      dismiss: () => s("close")
    });
    function l() {
      o.target && (He.openApp(o.target.id), s("close"));
    }
    function h() {
      o.target && (He.hideApp(o.target.id), s("close"));
    }
    async function x() {
      o.target && (await He.reloadApp(o.target.id), s("close"));
    }
    async function F() {
      if (!o.target) return;
      const v = o.target;
      if ((await He.quitApp(v.id))?.ok === !1) {
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
      const v = o.target, y = Bo.uninstall(v.id);
      s("close"), await y || Le.show({
        appName: v.title,
        title: "入口停用未确认",
        subtitle: Bo.state.errorMessage || "请打开模块管理核对当前启用状态",
        icon: v.icon || "assets/logo.png",
        duration: 4e3
      });
    }
    function D() {
      if (!o.target) return;
      const y = {
        "daily-bilibili": "https://www.bilibili.com",
        "card-github": "https://github.com",
        "daily-aihot": "https://news.ycombinator.com",
        "daily-youtube": "https://www.youtube.com"
      }[o.target.id] || "https://www.bilibili.com";
      window.open(y, "_blank"), s("close");
    }
    return (v, y) => (c(), pe(yt, { to: "body" }, [
      e.target ? (c(), p("div", {
        key: 0,
        ref_key: "menuRef",
        ref: g,
        role: "group",
        "aria-label": `${e.target.title}操作`,
        class: "dock-context-menu",
        style: xe(i(f)),
        onClick: y[1] || (y[1] = G(() => {
        }, ["stop"])),
        onContextmenu: y[2] || (y[2] = G(() => {
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
            y[3] || (y[3] = n("span", { class: "dock-status-dot" }, null, -1)),
            ot(" " + u(a.value ? i(d)("dock.menu.running") : i(d)("dock.menu.notStarted")), 1)
          ], 2)) : E("", !0)
        ]),
        y[12] || (y[12] = n("div", { class: "dock-menu-divider" }, null, -1)),
        e.target.type === "tool" ? (c(), p(Q, { key: 0 }, [
          r.value ? (c(), p("button", {
            key: 1,
            type: "button",
            class: "dock-menu-item",
            onClick: h
          }, [
            y[5] || (y[5] = n("span", { class: "dock-menu-symbol" }, "−", -1)),
            n("span", null, u(i(d)("dock.menu.hideWindow")), 1)
          ])) : (c(), p("button", {
            key: 0,
            type: "button",
            class: "dock-menu-item",
            onClick: l
          }, [
            y[4] || (y[4] = n("span", { class: "dock-menu-symbol" }, "↗", -1)),
            n("span", null, u(i(d)("dock.menu.openWindow")), 1)
          ])),
          n("button", {
            type: "button",
            class: "dock-menu-item",
            onClick: x
          }, [
            y[6] || (y[6] = n("span", { class: "dock-menu-symbol" }, "⟲", -1)),
            n("div", ep, [
              n("span", null, u(i(d)("dock.menu.reloadApp")), 1),
              n("small", null, u(i(d)("dock.menu.reloadSub")), 1)
            ])
          ]),
          y[9] || (y[9] = n("div", { class: "dock-menu-divider" }, null, -1)),
          n("button", {
            type: "button",
            class: "dock-menu-item",
            onClick: m
          }, [
            y[7] || (y[7] = n("span", { class: "dock-menu-symbol" }, "📌", -1)),
            n("div", tp, [
              n("span", null, u(i(d)("dock.menu.removeFromDock")), 1),
              n("small", null, u(i(d)("dock.menu.removeSub")), 1)
            ])
          ]),
          n("button", {
            type: "button",
            class: "dock-menu-item item-danger",
            onClick: F
          }, [
            y[8] || (y[8] = n("span", { class: "dock-menu-symbol" }, "✕", -1)),
            n("div", op, [
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
          y[10] || (y[10] = n("span", { class: "dock-menu-symbol" }, "↗", -1)),
          n("span", null, u(i(d)("dock.menu.openOfficial")), 1)
        ])) : (c(), p("button", {
          key: 2,
          type: "button",
          class: "dock-menu-item",
          onClick: y[0] || (y[0] = (T) => s("close"))
        }, [...y[11] || (y[11] = [
          n("span", { class: "dock-menu-symbol" }, "🏠", -1),
          n("span", null, "返回常用主页", -1)
        ])]))
      ], 44, Xu)) : E("", !0)
    ]));
  }
}), ip = /* @__PURE__ */ We(np, [["__scopeId", "data-v-a04a8350"]]), sp = { class: "mac-dock-shelf" }, ap = ["data-dock-target", "title", "onPointerdown", "onClick", "onContextmenu"], rp = ["src", "alt"], lp = {
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
}, mp = ["title"], vp = ["src"], wp = {
  key: 1,
  class: "mac-dock-emoji"
}, yp = /* @__PURE__ */ he({
  __name: "MacDock",
  setup(e) {
    const t = te(() => no), o = j(null), s = te(() => Object.fromEntries(no.tools.map((R) => {
      const V = st(R.id)?.badgeCount?.() || 0;
      return [R.id, Number.isFinite(V) ? Math.max(0, Math.floor(V)) : 0];
    })));
    function a(R) {
      R.stopPropagation(), o.value = null, F(R.currentTarget), Bo.open();
    }
    function r(R, V) {
      V.stopPropagation(), o.value = null, F(V.currentTarget), xt.triggerItem("target", R);
    }
    function g(R, V) {
      const Y = V.currentTarget.getBoundingClientRect(), me = no.position, Ce = me === "left" || me === "right";
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
    function l(R, V) {
      V.stopPropagation(), o.value = null, F(V.currentTarget), st(R) || He.markRunning(R), xt.triggerItem("tool", R);
    }
    function h(R, V) {
      const Y = V.currentTarget.getBoundingClientRect(), me = no.position, Ce = me === "left" || me === "right";
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
      const V = R.animate([
        { translate: "0 0", offset: 0 },
        { translate: "0 -8px", offset: 0.35 },
        { translate: "0 0", offset: 0.65 },
        { translate: "0 -2px", offset: 0.85 },
        { translate: "0 0", offset: 1 }
      ], { duration: 350, easing: "ease" });
      x.set(R, V);
      const N = () => {
        x.get(R) === V && x.delete(R);
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
    }), v = j(null), y = j(null), T = te(() => v.value || t.value.cards), w = te(() => y.value || t.value.tools);
    let _ = "", L = 0, B = !1, H = 0;
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
      const V = R.clientX - m.value.startX, N = R.clientY - m.value.startY, Y = Math.hypot(V, N);
      if (!B && Y > 5 && (B = !0, D.visible = !0, D.item = m.value.item, D.type = m.value.type, D.width = m.value.width, D.height = m.value.height, m.value.type === "card" ? v.value = [...t.value.cards] : y.value = [...t.value.tools]), !B) return;
      D.x = R.clientX - D.width / 2, D.y = R.clientY - D.height / 2;
      const Ce = document.elementsFromPoint(R.clientX, R.clientY).find(
        (ke) => ke.classList.contains("mac-dock-item") && !ke.classList.contains("mac-dock-market-btn")
      );
      if (!Ce) return;
      const qe = Ce.getAttribute("data-dock-target"), A = Ce.getAttribute("data-dock-tool"), W = m.value.type, z = m.value.id, ve = Date.now();
      if (W === "card" && qe && qe !== z && qe !== "home-launcher") {
        const ke = Ce.getBoundingClientRect(), Se = ke.left + ke.width / 2;
        if (Math.abs(R.clientX - Se) > ke.width * 0.55 || qe === _ && ve - L < 180) return;
        const ye = [...v.value || t.value.cards], Re = ye.findIndex((Oe) => Oe.id === z), Qe = ye.findIndex((Oe) => Oe.id === qe);
        if (Re >= 0 && Qe >= 0 && Re !== Qe) {
          const Oe = ye.splice(Re, 1)[0];
          ye.splice(Qe, 0, Oe), v.value = ye, _ = qe, L = ve;
        }
      } else if (W === "tool" && A && A !== z) {
        const ke = Ce.getBoundingClientRect(), Se = ke.left + ke.width / 2;
        if (Math.abs(R.clientX - Se) > ke.width * 0.55 || A === _ && ve - L < 180) return;
        const ye = [...y.value || t.value.tools], Re = ye.findIndex((Oe) => Oe.id === z), Qe = ye.findIndex((Oe) => Oe.id === A);
        if (Re >= 0 && Qe >= 0 && Re !== Qe) {
          const Oe = ye.splice(Re, 1)[0];
          ye.splice(Qe, 0, Oe), y.value = ye, _ = A, L = ve;
        }
      }
    }
    function k() {
      window.removeEventListener("pointermove", M), window.removeEventListener("pointerup", k), window.removeEventListener("pointercancel", k), B && m.value && (H = Date.now() + 250, m.value.type === "card" && v.value ? xt.reorderCards(v.value.map((R) => R.id)) : m.value.type === "tool" && y.value && xt.reorderTools(y.value.map((R) => R.id))), D.visible = !1, D.item = null, v.value = null, y.value = null, m.value = null, B = !1, _ = "";
    }
    function $(R, V) {
      Date.now() < H || r(R, V);
    }
    function ee(R, V) {
      Date.now() < H || l(R, V);
    }
    return mo(() => {
      for (const R of x.values()) R.cancel();
      x.clear(), window.removeEventListener("pointermove", M), window.removeEventListener("pointerup", k), window.removeEventListener("pointercancel", k);
    }), (R, V) => (c(), p(Q, null, [
      n("div", sp, [
        J(Oo, {
          tag: "div",
          class: "mac-dock-group mac-dock-cards-group",
          name: "dock-item-motion"
        }, {
          default: It(() => [
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
              onClick: G((Y) => $(N.id, Y), ["stop"]),
              onContextmenu: G((Y) => g(N, Y), ["prevent"])
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
          title: i(d)("dock.home"),
          onClick: V[0] || (V[0] = G((N) => f(N), ["stop"]))
        }, [
          n("img", {
            class: "mac-dock-icon",
            src: "assets/nav-home.svg",
            alt: i(d)("dock.home")
          }, null, 8, dp)
        ], 8, cp),
        V[5] || (V[5] = n("div", {
          class: "mac-dock-divider mac-dock-divider-dark",
          "aria-hidden": "true"
        }, null, -1)),
        J(Oo, {
          tag: "div",
          class: "mac-dock-group mac-dock-tools-group",
          name: "dock-item-motion"
        }, {
          default: It(() => [
            (c(!0), p(Q, null, be(w.value, (N) => (c(), p("button", {
              key: N.id,
              class: de(["mac-dock-item", {
                "is-active": i(He).isRunning(N.id),
                "is-drag-origin": m.value && m.value.id === N.id
              }]),
              type: "button",
              "data-dock-tool": N.id,
              title: N.title,
              onPointerdown: (Y) => U("tool", N, Y),
              onClick: G((Y) => ee(N.id, Y), ["stop"]),
              onContextmenu: G((Y) => h(N, Y), ["prevent"])
            }, [
              N.icon ? (c(), p("img", {
                key: 0,
                class: "mac-dock-icon",
                src: N.icon,
                alt: N.title
              }, null, 8, pp)) : N.emoji ? (c(), p("span", hp, u(N.emoji), 1)) : E("", !0),
              i(He).isRunning(N.id) ? (c(), p("span", fp)) : E("", !0),
              s.value[N.id] > 0 ? (c(), p("span", gp, u(s.value[N.id] > 99 ? "99+" : s.value[N.id]), 1)) : E("", !0)
            ], 42, up))), 128))
          ]),
          _: 1
        }),
        n("button", {
          class: de(["mac-dock-item mac-dock-market-btn", { "is-active": i(Bo).state.isOpen }]),
          type: "button",
          title: i(d)("dock.market"),
          onClick: V[1] || (V[1] = G((N) => a(N), ["stop"]))
        }, [...V[3] || (V[3] = [
          n("span", {
            class: "mac-dock-market-icon",
            "aria-hidden": "true"
          }, "🧩", -1)
        ])], 10, mp)
      ]),
      (c(), pe(yt, { to: "body" }, [
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
          }, null, 8, vp)) : D.item.emoji ? (c(), p("span", wp, u(D.item.emoji), 1)) : E("", !0)
        ], 4)) : E("", !0)
      ])),
      J(ip, {
        target: o.value,
        onClose: V[2] || (V[2] = (N) => o.value = null)
      }, null, 8, ["target"])
    ], 64));
  }
}), xs = /* @__PURE__ */ We(yp, [["__scopeId", "data-v-b7c583e6"]]), bp = {
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
}, Ap = ["onClick"], Ep = ["onClick"], Pp = /* @__PURE__ */ he({
  __name: "NotificationHost",
  setup(e) {
    const t = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Map(), a = j({}), r = j({});
    let g = null;
    function f(v) {
      const y = t.get(v);
      y !== void 0 && clearTimeout(y), t.delete(v);
    }
    function l(v, y = v.duration) {
      f(v.id), s.set(v.id, y), o.set(v.id, Date.now()), r.value[v.id] = !1, a.value[v.id] = Math.max(0, Math.min(100, y / v.duration * 100)), St(() => requestAnimationFrame(() => {
        a.value[v.id] = 0;
      })), t.set(v.id, window.setTimeout(() => {
        t.delete(v.id), Le.close(v.id);
      }, y));
    }
    function h(v) {
      f(v.id);
      const y = Date.now() - (o.get(v.id) || Date.now()), T = Math.max(0, (s.get(v.id) ?? v.duration) - y);
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
        Promise.resolve(v.onClick()).catch((y) => console.warn("Notification action failed", y));
      } catch (y) {
        console.warn("Notification action failed", y);
      }
    }
    function D(v) {
      const y = Math.max(500, s.get(v.id) ?? v.duration);
      return {
        width: `${a.value[v.id] ?? 100}%`,
        transition: r.value[v.id] ? "none" : `width ${y}ms linear`
      };
    }
    return Xe(() => {
      g = new MutationObserver(() => {
        const y = new Set(Go.map((T) => T.id));
        for (const T of Go)
          !T.closing && !t.has(T.id) && !s.has(T.id) && l(T);
        for (const T of s.keys())
          y.has(T) || (f(T), s.delete(T), o.delete(T), delete a.value[T], delete r.value[T]);
      });
      const v = document.getElementById("win-toast-container");
      v && g.observe(v, { childList: !0 });
      for (const y of Go) l(y);
    }), mo(() => {
      g?.disconnect(), g = null;
      for (const v of t.values()) clearTimeout(v);
      t.clear();
    }), (v, y) => (c(), pe(yt, { to: "body" }, [
      n("div", bp, [
        J(Oo, { name: "win-toast" }, {
          default: It(() => [
            (c(!0), p(Q, null, be(i(Go), (T) => (c(), p("article", {
              key: T.id,
              class: de(["win-toast-card", [T.appType, { closing: T.closing }]]),
              "data-toast-fingerprint": T.fingerprint,
              onMouseenter: (w) => h(T),
              onMouseleave: (w) => x(T)
            }, [
              n("header", _p, [
                n("img", {
                  src: T.icon,
                  class: "win-toast-icon",
                  alt: ""
                }, null, 8, Cp),
                n("span", xp, u(T.appName), 1),
                n("span", Lp, u(i(d)("notifications.justNow")), 1),
                n("button", {
                  type: "button",
                  class: "win-toast-close",
                  title: i(d)("common.close"),
                  "aria-label": i(d)("common.close"),
                  onClick: (w) => F(T)
                }, "✕", 8, $p)
              ]),
              n("button", {
                type: "button",
                class: "win-toast-body win-toast-body-button",
                onClick: (w) => m(T)
              }, [
                n("span", Tp, u(T.title), 1),
                T.subtitle ? (c(), p("span", Ip, u(T.subtitle), 1)) : E("", !0),
                T.message ? (c(), p("span", Mp, u(T.message), 1)) : E("", !0)
              ], 8, Sp),
              T.showActions && T.actionLabel ? (c(), p("footer", Dp, [
                n("button", {
                  type: "button",
                  class: "win-toast-btn primary",
                  onClick: (w) => m(T)
                }, u(T.actionLabel), 9, Ap),
                n("button", {
                  type: "button",
                  class: "win-toast-btn",
                  onClick: (w) => F(T)
                }, u(i(d)("common.close")), 9, Ep)
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
}), Ls = /* @__PURE__ */ We(Pp, [["__scopeId", "data-v-71b51a1a"]]), Wp = ["id"], Rp = /* @__PURE__ */ he({
  __name: "DockModuleHost",
  setup(e) {
    const t = Zi().filter((o) => o.presentation !== "card").map((o) => {
      Pe(o.lifecycle.isVisible, (a) => {
        a && He.markRunning(o.id);
      }, { immediate: !0, flush: "sync" });
      const s = he({
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
        key: i(He).getRenderKey(a.definition.id)
      })) : E("", !0)
    ], 8, Wp)), [
      [fo, a.definition.lifecycle.isVisible()]
    ])), 128));
  }
}), Np = /* @__PURE__ */ We(Rp, [["__scopeId", "data-v-3f131313"]]);
function Ze(e, t) {
  const o = j(!1);
  return Pe(
    e,
    (s) => {
      s && (o.value = !0);
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
      if (!we.submitting) {
        if (!we.followed) {
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
      r.ctrlKey || r.metaKey || (r.preventDefault(), r.stopPropagation(), g.bvid ? (Yn.openVideo({
        bvid: g.bvid,
        title: g.title,
        cover: g.cover,
        author: we.name,
        authorFace: we.face,
        mid: we.mid,
        url: g.url
      }), s()) : g.url && g.url !== "#" && window.open(g.url, "_blank"));
    }
    return (r, g) => i(we).open ? (c(), p("div", {
      key: 0,
      class: "fo-up-preview-backdrop",
      onPointerdown: G(s, ["self"])
    }, [
      n("aside", {
        class: "fo-up-preview-popover",
        style: xe({ left: `${i(we).left}px`, top: `${i(we).top}px` }),
        onKeydown: No(G(s, ["stop", "prevent"]), ["esc"])
      }, [
        n("div", Bp, [
          n("img", {
            class: "fo-up-preview-avatar",
            src: i(we).face || oh,
            alt: "",
            referrerpolicy: "no-referrer"
          }, null, 8, Fp),
          n("div", Hp, [
            n("div", Kp, [
              n("a", {
                class: "fo-up-preview-name",
                href: `https://space.bilibili.com/${i(we).mid}`,
                target: "_blank",
                rel: "noreferrer"
              }, u(i(we).name), 9, jp),
              n("button", {
                type: "button",
                class: de([
                  i(we).followed ? "fo-up-preview-unfollow" : "fo-up-preview-follow",
                  { "is-armed": t.value }
                ]),
                disabled: i(we).submitting,
                onClick: o
              }, u(i(we).submitting ? "处理中…" : t.value ? "确定取消？" : i(we).followed ? "取消关注" : "＋ 关注"), 11, zp)
            ]),
            n("p", Gp, u(i(we).sign || "暂无个人简介"), 1)
          ]),
          n("button", {
            type: "button",
            class: "fo-up-preview-close",
            "aria-label": "关闭预览",
            onClick: s
          }, "✕")
        ]),
        g[1] || (g[1] = n("div", { class: "fo-up-preview-title-tag" }, "近期投稿视频（最新 2~3 个）", -1)),
        n("div", Vp, [
          i(we).loading ? (c(), p("div", Up, [...g[0] || (g[0] = [
            n("i", null, null, -1),
            n("span", null, "正在读取近期投稿…", -1)
          ])])) : i(we).error ? (c(), p("p", Yp, u(i(we).error), 1)) : i(we).videos.length ? (c(!0), p(Q, { key: 3 }, be(i(we).videos, (f) => (c(), p("article", {
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
              }, null, 8, Jp),
              f.duration ? (c(), p("span", Zp, u(f.duration), 1)) : E("", !0)
            ], 8, qp),
            n("div", Qp, [
              n("a", {
                class: "fo-up-preview-video-title",
                href: f.url,
                title: `就地播放「${f.title}」（Ctrl+点击在网页打开）`,
                onClick: (l) => a(l, f)
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
}), ih = /* @__PURE__ */ We(nh, [["__scopeId", "data-v-3fedd7f1"]]), sh = { class: "logicweaver-overlays-layer" }, ah = { id: "vue-notification-root" }, rh = {
  id: "bili-profile-menu",
  class: "bili-profile-menu",
  hidden: ""
}, lh = { id: "vue-bili-message-panel-root" }, ch = { id: "vue-notification-center-root" }, dh = { id: "vue-tab-manager-root" }, uh = { id: "vue-bookmark-menu-root" }, ph = { id: "vue-bookmark-panel-root" }, hh = { id: "vue-launcher-dialogs-root" }, fh = { id: "vue-launcher-folder-root" }, gh = { id: "vue-launcher-menus-root" }, mh = { id: "vue-settings-dialog-root" }, vh = { id: "vue-clock-settings-root" }, wh = { id: "vue-bili-theater-root" }, yh = { id: "vue-bili-mini-player-root" }, bh = { id: "vue-ai-dialog-root" }, kh = { id: "vue-aihot-viewer-root" }, _h = { id: "vue-nav-wheel-root" }, Ch = { id: "vue-github-detail-root" }, xh = { id: "vue-bili-subtitle-modal-root" }, Lh = { id: "vue-bili-video-task-modal-root" }, $h = { id: "vue-github-task-modal-root" }, Sh = { id: "vue-web-task-modal-root" }, Th = { id: "vue-firecrawl-modal-root" }, Ih = { id: "vue-floating-image-viewer-root" }, Mh = { id: "vue-command-palette-root" }, Dh = /* @__PURE__ */ he({
  __name: "AppOverlays",
  setup(e) {
    const t = Ze(() => Bo.state.isOpen), o = Ze(() => Vi.isOpen), s = Ze(() => ln.isOpen), a = Ze(() => Gt.state.isOpen), r = Ze(() => Ca.open), g = Ze(() => Po.state.isOpen), f = Ze(() => Ys.isOpen), l = Ze(() => ka.isOpen), h = Ze(() => ui.state.isOpen), x = Ze(() => ta.isOpen), F = Ze(() => je.isOpen), m = Ze(() => ei.isOpen);
    let D;
    Xe(() => {
      D = dl();
    }), Nt(() => {
      D?.();
    });
    const v = Ze(() => ii.state.isOpen), y = Ze(() => _t.isOpen), T = Ze(() => _o.editDialog.isOpen || _o.linkMove.isOpen || _o.folderMove.isOpen || _o.groupMerge.isOpen || _o.folderDelete.isOpen), w = X(() => import("./ProfileMenu-Cooc33lf.js")), _ = X(() => import("./BookmarkNoteMenu-DJ3h3-47.js")), L = X(() => import("./BookmarkPanel-CkJP4CAE.js")), B = X(() => import("./ClockSettingsMenu-D4ZpKNVT.js")), H = X(() => import("./NotificationCenter-IZkZY90F.js")), U = X(() => import("./TabManagerPanel-DBXvq2jp.js")), M = X(() => import("./LauncherDialogs-CvkmYvuk.js")), k = X(() => import("./LauncherFolderDialog-Bp1h0htc.js")), $ = X(() => import("./LauncherMenus-B7tVIkgq.js")), ee = X(() => import("./SettingsDialog-D86m4ZIS.js")), R = X(() => import("./BiliMiniPlayer-u2d3D1JP.js")), V = X(() => import("./BiliTheaterDialog-4tBcUlZN.js")), N = X(() => import("./BiliMessagePanel-OgO-GF7t.js")), Y = X(() => import("./AiDialog-BmaiQsFH.js")), me = X(() => import("./AihotViewer-Beh8FWe7.js")), Ce = X(() => import("./NavWheelOverlay-Bi0qU-oG.js")), qe = X(() => import("./GitHubRepoDetailDrawer-DTwl1xU_.js")), A = X(() => import("./InPageSideDrawer-B_jnz-97.js")), W = X(() => import("./BiliSubtitleModal-BDe3hoKj.js")), z = X(() => import("./BiliVideoTaskModal-CzMfUZks.js")), ve = X(() => import("./GitHubTaskModal-O-iTPzXD.js")), ke = X(() => import("./WebSiteTaskModal-Bf9zxgNU.js")), Se = X(() => import("./FirecrawlModal-DiDYadwx.js")), ye = X(() => import("./FloatingImageViewer-T1dsU6Td.js")), Re = X(() => import("./CommandPalette-CABJex5w.js")), Qe = X(() => import("./AppPromptModal-DJaTptG7.js")), Oe = X(async () => {
      const [Mt, Ot] = await Promise.all([
        import("./PluginMarketDialog-BrcxpVo7.js"),
        import("./plugin-market-B6zN10fA.js")
      ]);
      return Us("logicweaver-market-styles", Ot.default), Mt.default;
    });
    return (Mt, Ot) => (c(), p("div", sh, [
      n("div", ah, [
        J(Ls)
      ]),
      n("div", rh, [
        J(i(w))
      ]),
      n("div", lh, [
        i(l) ? (c(), pe(i(N), { key: 0 })) : E("", !0)
      ]),
      n("div", ch, [
        i(o) ? (c(), pe(i(H), { key: 0 })) : E("", !0)
      ]),
      n("div", dh, [
        i(s) ? (c(), pe(i(U), { key: 0 })) : E("", !0)
      ]),
      n("div", uh, [
        i(v) ? (c(), pe(i(_), { key: 0 })) : E("", !0)
      ]),
      n("div", ph, [
        J(i(L))
      ]),
      n("div", hh, [
        i(T) ? (c(), pe(i(M), { key: 0 })) : E("", !0)
      ]),
      n("div", fh, [
        i(y) ? (c(), pe(i(k), { key: 0 })) : E("", !0)
      ]),
      n("div", gh, [
        J(i($))
      ]),
      n("div", mh, [
        J(i(ee))
      ]),
      n("div", vh, [
        i(a) ? (c(), pe(i(B), { key: 0 })) : E("", !0)
      ]),
      n("div", wh, [
        i(g) ? (c(), pe(i(V), { key: 0 })) : E("", !0)
      ]),
      n("div", yh, [
        i(f) ? (c(), pe(i(R), { key: 0 })) : E("", !0)
      ]),
      n("div", bh, [
        i(h) ? (c(), pe(i(Y), { key: 0 })) : E("", !0)
      ]),
      n("div", kh, [
        i(r) ? (c(), pe(i(me), { key: 0 })) : E("", !0)
      ]),
      n("div", _h, [
        J(i(Ce))
      ]),
      J(Np),
      n("div", Ch, [
        i(x) ? (c(), pe(i(qe), { key: 0 })) : E("", !0)
      ]),
      n("div", xh, [
        J(i(W))
      ]),
      n("div", Lh, [
        J(i(z))
      ]),
      n("div", $h, [
        J(i(ve))
      ]),
      n("div", Sh, [
        J(i(ke))
      ]),
      n("div", Th, [
        J(i(Se))
      ]),
      n("div", Ih, [
        J(i(ye))
      ]),
      n("div", Mh, [
        i(F) ? (c(), pe(i(Re), { key: 0 })) : E("", !0)
      ]),
      i(m) ? (c(), pe(i(A), { key: 0 })) : E("", !0),
      J(ih),
      J(i(Qe)),
      i(t) ? (c(), pe(i(Oe), { key: 1 })) : E("", !0)
    ]));
  }
});
let jn = !1;
function Ah(e = 1800) {
  if (jn || typeof window > "u") return;
  const t = () => {
    if (jn) return;
    jn = !0;
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
const Eh = ["data-active-workspace"], Ph = /* @__PURE__ */ he({
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
      const l = s[Vo.value] || s.home;
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
        () => Vo.value,
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
    const f = te(() => Vo.value === "home" ? "" : Vo.value);
    return Pe(() => Tt.activeId, Ui, { immediate: !0, flush: "sync" }), Xe(() => {
      typeof document < "u" && (document.body.dataset.spa = "1");
      try {
        Qn.bindGlobalListener(), Ye.start(), Ri.start(), Un.init().catch((l) => console.warn("[Launcher] 初始化失败", l)), Ah(), typeof chrome < "u" && chrome?.runtime?.sendMessage && setTimeout(() => {
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
      Ye.stop(), Un.stop(), Ri.stop(), document.body.classList.remove("has-card-fullscreen"), typeof document < "u" && o && (document.title = o);
    }), t({
      activeWorkspaceId: f,
      windowManagerController: Be
    }), (l, h) => (c(), p("div", {
      id: "logicweaver-spa-root",
      class: "logicweaver-spa-root",
      "data-active-workspace": f.value || ""
    }, [
      J(ur),
      J(kl),
      J(Hu),
      J(Yu),
      n("nav", {
        id: "mac-dock",
        class: de(["mac-dock", "dock-" + i(no).position]),
        "aria-label": "快捷应用栏"
      }, [
        J(xs)
      ], 2),
      J(Dh)
    ], 8, Eh));
  }
}), Wh = /* @__PURE__ */ We(Ph, [["__scopeId", "data-v-354d0390"]]), Rh = {
  class: "endfield-stage",
  "aria-hidden": "true"
}, Nh = {
  class: "rhinelab-stage",
  "aria-hidden": "true"
}, Oh = { class: "rhine-scaler" }, Bh = { class: "rhine-center-group" }, Fh = { class: "rhine-auth-status" }, Hh = { class: "rhine-auth-text" }, Kh = ["hidden"], jh = { class: "rhine-cinema-caption" }, zh = /* @__PURE__ */ he({
  __name: "IntroAnimation",
  setup(e) {
    const t = j(window.innerHeight), o = j(window.innerWidth), s = j(!1), a = j(!1), r = j(10), g = j(1), f = j(0), l = /* @__PURE__ */ new Set();
    let h = 0, x = () => {
    };
    const F = te(() => `${String(Math.round(lt.renderedProgress)).padStart(2, "0")}%`), m = te(() => {
      const M = lt.renderedProgress / 100 * t.value + 10;
      return `${Math.min(M, Math.max(0, t.value - 102)).toFixed(1)}px`;
    }), D = te(() => lt.renderedProgress >= 75 ? "START PROCESSING..." : lt.renderedProgress >= 35 ? "REQUEST RECEIVED" : "ID CONFIRMED : JOYCE MOORE"), v = te(() => lt.finished ? "身份验证通过 · 欢迎进入终端" : lt.status ? `身份信息确认 · ${lt.status.replace(/^.*?\/\s*/, "")}` : "身份信息确认：JOYCE MOORE"), y = te(() => String(Math.max(0.35, Math.min(o.value / 1920, t.value / 1080))));
    function T(M, k) {
      const $ = window.setTimeout(() => {
        l.delete($), M();
      }, k);
      l.add($);
    }
    function w() {
      window.dispatchEvent(new CustomEvent("logicweaver:intro-complete"));
    }
    function _(M) {
      if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
        w();
        return;
      }
      const k = M ? 180 : 260, $ = M ? 200 : 280, ee = performance.now(), R = (V) => {
        const N = V - ee, Y = Math.min(1, N / k), me = 1 - Math.pow(1 - Y, 3);
        if (r.value = 10 + me * Math.max(0, o.value - 10), N > k && (g.value = Math.max(0, 1 - (N - k) / $)), N >= k + $) {
          w();
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
        a.value = !0, f.value = 6, g.value = 0, T(w, 380);
      }, M ? 40 : 420);
    }
    function B(M) {
      lt.style === "rhinelab" ? L(M) : _(M);
    }
    function H() {
      o.value = window.innerWidth, t.value = window.innerHeight;
    }
    function U(M) {
      lt.finished || (M.key === "Enter" || M.key === " " || M.key === "Escape") && (M.preventDefault(), wt.skip("KEYBOARD SKIP"));
    }
    return Xe(() => {
      document.documentElement.dataset.startupStyle = lt.style, document.documentElement.style.setProperty("--rhine-scale", y.value), window.addEventListener("resize", H, { passive: !0 }), window.addEventListener("keydown", U, !0), x = Na(B), is();
    }), mo(() => {
      x(), window.removeEventListener("resize", H), window.removeEventListener("keydown", U, !0), cancelAnimationFrame(h);
      for (const M of l) clearTimeout(M);
      l.clear();
    }), (M, k) => (c(), p("div", {
      class: "intro-vue-content",
      style: xe({ "--rhine-scale": y.value, opacity: g.value, filter: `blur(${f.value}px)` })
    }, [
      n("div", Rh, [
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
      n("div", Nh, [
        k[12] || (k[12] = Io('<div class="rhine-background"><svg viewBox="0 0 1920 1080" preserveAspectRatio="none"><g fill="none" stroke="#ffffff" stroke-width="2.5"><path class="rhine-drift-path1" d="M-210 705C-45 705 182 704 247 567C337 377 99 306 4 435S27 680 169 631C309 584 227 314 279 111S568-113 568-113"></path><path class="rhine-drift-path2" d="M1560-80C1374 114 1671 168 1601 323S1371 367 1431 480S1692 666 1559 787S1329 886 1498 1130"></path><circle class="rhine-drift-circle" cx="1450" cy="648" r="346"></circle><circle class="rhine-drift-circle2" cx="1450" cy="648" r="348"></circle></g></svg></div>', 1)),
        n("div", Oh, [
          k[10] || (k[10] = Io('<header class="rhine-brand"><h1>RHINE LAB</h1><div class="rhine-brand-sub">SYNTHESIZE INFORMATION</div><p class="rhine-brand-os"><span class="rhine-brand-analysis"><span style="left:2px;">A</span><span style="left:28px;">N</span><span style="left:55px;">A</span><span style="left:81px;">L</span><span style="left:103px;">Y</span><span style="left:129px;">S</span><span style="left:154px;">I</span><span style="left:166px;">S</span></span><b>OS</b></p></header>', 1)),
          n("button", {
            class: "rhine-skip",
            type: "button",
            title: "点击进入系统 (或按 Enter)",
            onClick: k[0] || (k[0] = ($) => i(wt).skip("ENTER SYSTEM"))
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
            class: de(["rhine-scan", { active: s.value }]),
            hidden: !s.value
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
    return (o, s) => (c(), p(Q, null, [
      n("button", {
        type: "button",
        "data-action": "messages",
        onClick: s[0] || (s[0] = G((a) => t("messages"), ["stop"]))
      }, u(i(d)("profile.menu.notifications")), 1),
      n("button", {
        type: "button",
        "data-action": "tabs",
        onClick: s[1] || (s[1] = G((a) => t("tabs"), ["stop"]))
      }, u(i(d)("profile.menu.tabs")), 1),
      n("button", {
        type: "button",
        "data-action": "refresh",
        onClick: s[2] || (s[2] = G((a) => t("refresh"), ["stop"]))
      }, u(i(d)("profile.menu.refreshBili")), 1),
      n("button", {
        type: "button",
        "data-action": "switch",
        onClick: s[3] || (s[3] = G((a) => t("switch"), ["stop"]))
      }, u(i(d)("profile.menu.switchUser")), 1),
      n("button", {
        type: "button",
        "data-action": "web",
        onClick: s[4] || (s[4] = G((a) => t("web"), ["stop"]))
      }, u(i(d)("profile.menu.biliCenter")), 1)
    ], 64));
  }
}), Vh = /* @__PURE__ */ he({
  __name: "WorkspaceLaunchers",
  setup(e) {
    function t(o) {
      di.openWorkspace(o, !0);
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
      Ki(o.$slots, "default")
    ], 64));
  }
}), Uh = {
  key: 0,
  "aria-label": "AI 分析任务"
}, Yh = { role: "status" }, Xh = ["disabled"], qh = ["disabled"], Jh = /* @__PURE__ */ he({
  __name: "GitHubStatus",
  setup(e) {
    return (t, o) => i(rt).message || i(rt).busy ? (c(), p("section", Uh, [
      n("p", Yh, u(i(rt).repo ? `原任务仓库：${i(rt).repo}。 ` : "") + u(i(rt).message), 1),
      i(rt).busy ? (c(), p("button", {
        key: 0,
        type: "button",
        onClick: o[0] || (o[0] = (s) => i(Ge).stopAiAnalysis())
      }, "停止后续分析 / 中断等待")) : E("", !0),
      i(rt).uncertain ? (c(), p(Q, { key: 1 }, [
        o[5] || (o[5] = n("p", null, "AI 结果未确认，已阻止本页再次提交。请到供应商核对请求和计费；本页记录在整页关闭或重载后会丢失。", -1)),
        i(rt).unlockConfirmation ? (c(), p(Q, { key: 1 }, [
          o[4] || (o[4] = n("p", null, "扩展不能验证供应商任务；确认只解除本页限制，不代表成功，也不会重发请求。", -1)),
          n("button", {
            type: "button",
            disabled: i(rt).busy,
            onClick: o[2] || (o[2] = (s) => i(Ge).acknowledgeAiChecked())
          }, "确认解除本页限制", 8, qh),
          n("button", {
            type: "button",
            onClick: o[3] || (o[3] = (s) => i(rt).unlockConfirmation = !1)
          }, "保持限制")
        ], 64)) : (c(), p("button", {
          key: 0,
          type: "button",
          disabled: i(rt).busy,
          onClick: o[1] || (o[1] = (s) => i(rt).unlockConfirmation = !0)
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
function Zh(e, t, o, s, a) {
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
function Ni(e, t, o) {
  const s = e.indexOf(t), a = e.indexOf(o);
  if (s < 0 || a < 0 || s === a) return [...e];
  const r = [...e];
  return r.splice(s, 1), r.splice(a, 0, t), r;
}
function Qh(e) {
  return Array.isArray(e) ? [...new Set(e.filter((t) => typeof t == "string" && t.length <= 300 && /^(list|repo):.+/.test(t)))].slice(0, 2e3) : [];
}
const ef = {
  key: 0,
  class: "gh-shortcut-status",
  role: "status"
}, tf = ["data-gh-tile", "data-gh-list-drop", "onDragover", "onDrop"], of = ["aria-label", "title", "onContextmenu", "onClick", "onPointerdown", "onKeydown"], nf = {
  key: 1,
  class: "gh-shortcut-help"
}, sf = ["disabled"], af = ["data-gh-list-drop"], rf = { class: "gh-shortcut-help" }, lf = { class: "gh-folder-repo-grid" }, cf = ["title", "onContextmenu", "onClick", "onPointerdown"], df = {
  key: 0,
  class: "gh-shortcut-help"
}, uf = ["aria-label"], pf = { class: "gh-shortcut-menu-title" }, hf = ["disabled"], ff = /* @__PURE__ */ he({
  __name: "GitHubFolders",
  props: {
    active: { type: Boolean, default: !0 }
  },
  emits: ["select"],
  setup(e, { emit: t }) {
    const o = e, s = t, a = j(null), r = j(""), g = j(""), f = j([]), l = j(""), h = j(null), x = te(() => h.value?.ownerKey === Te.ownerKey ? Te.repos.find((I) => I.full_name === h.value?.fullName) : void 0), F = te(() => !!(x.value && Te.repoListNames.get(x.value.full_name.toLowerCase())?.length));
    function m() {
      h.value = null;
    }
    const { menuRef: D, style: v } = ci({
      visible: () => o.active && !!x.value,
      anchor: () => h.value || { x: 0, y: 0 },
      dismiss: m
    });
    function y(I, O) {
      I.preventDefault(), I.stopPropagation(), o.active && (nt(), h.value = { fullName: O.full_name, ownerKey: Te.ownerKey, x: I.clientX, y: I.clientY });
    }
    function T() {
      const I = x.value;
      !I || !F.value || dt.busy || !o.active || (m(), Y(I.full_name, "未分类"));
    }
    function w() {
      const I = x.value;
      m(), I && R(I);
    }
    let _ = 0, L = 0, B = Promise.resolve();
    const H = te(() => Zh(Te.repos, Te.lists, Te.repoListNames, f.value, Te.activeSection)), U = te(() => H.value.find((I) => I.kind === "folder" && I.list.id === r.value)), M = te(() => U.value?.kind === "folder" ? U.value.repos : []);
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
      !o.active || Date.now() < z || (m(), r.value = "", s("select"), Yi.open(I.full_name, void 0, I));
    }
    function V(I) {
      if (!(!o.active || Date.now() < z)) {
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
      !N(O) || !Array.from(I.dataTransfer?.types || []).includes(oa) || (I.preventDefault(), I.stopPropagation(), I.dataTransfer && (I.dataTransfer.dropEffect = "move"), g.value = O);
    }
    function Ce(I, O) {
      g.value = "";
      const K = na(I.dataTransfer);
      !K || !N(O) || (I.preventDefault(), I.stopPropagation(), Y(K, O));
    }
    function qe(I) {
      const O = I.currentTarget;
      O instanceof Node && I.relatedTarget instanceof Node && O.contains(I.relatedTarget) || (g.value = "");
    }
    const A = $e({ visible: !1, x: 0, y: 0, offsetX: 0, offsetY: 0, tile: null });
    let W = null, z = 0, ve = 0, ke = "", Se, ye = null;
    function Re() {
      ye?.classList.remove("gh-sidebar-pointer-drop"), ye = null;
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
    function Mt() {
      if (Re(), g.value = "", !W || !A.visible) return;
      const I = document.elementFromPoint(A.x, A.y), O = I?.closest("[data-gh-list-drop]"), K = O?.dataset.ghListDrop;
      if (W.tile.kind === "repo" && K && N(K) && O && (!O.hasAttribute("data-gh-tile") || ks(O.getBoundingClientRect(), A.x, A.y))) {
        g.value = K, ye = O, O.classList.add("gh-sidebar-pointer-drop");
        return;
      }
      const fe = I?.closest("[data-gh-tile]"), ft = fe?.dataset.ghTile;
      if (!ft || !fe || ft === W.tile.key || !_s(fe.getBoundingClientRect(), A.x, A.y) || ft === ke || Date.now() - ve < bs) return;
      const bt = H.value.map((Bt) => Bt.key);
      bt.includes(W.tile.key) && (f.value = Ni(bt, W.tile.key, ft), ke = ft, ve = Date.now());
    }
    function Ot(I) {
      !W || I.pointerId !== W.pointer || (A.x = I.clientX, A.y = I.clientY, !(!A.visible && Math.hypot(I.clientX - W.x, I.clientY - W.y) < ys) && (I.preventDefault(), A.visible || (++_, A.visible = !0, Se = setInterval(() => {
        const K = document.elementFromPoint(A.x, A.y)?.closest(".gh-bili-folder-list, .gh-shortcut-window-content");
        if (K) {
          const fe = K.getBoundingClientRect();
          A.y < fe.top + 36 ? K.scrollTop -= 12 : A.y > fe.bottom - 36 && (K.scrollTop += 12);
        }
        Mt();
      }, 32)), Mt()));
    }
    function Ut(I) {
      if (!W || I.pointerId !== W.pointer) return;
      A.visible && (A.x = I.clientX, A.y = I.clientY, Mt());
      const O = W, K = A.visible, fe = g.value;
      if (K) {
        I.preventDefault(), z = Date.now() + 300, O.owner === Te.ownerKey && fe && O.tile.kind === "repo" && Y(O.tile.repo.full_name, fe);
        const ft = O.original.length !== f.value.length || O.original.some((bt, Bt) => f.value[Bt] !== bt);
        O.owner === Te.ownerKey && !fe && ft && ee();
      }
      fe && (f.value = O.original), wo();
    }
    function wo() {
      Re(), clearInterval(Se), Se = void 0, window.removeEventListener("pointermove", Ot), window.removeEventListener("pointerup", Ut), window.removeEventListener("pointercancel", nt), A.visible = !1, A.tile = null, W = null, g.value = "", ke = "", ve = 0;
    }
    function nt() {
      W && (f.value = W.original, A.visible && (z = Date.now() + 300)), wo();
    }
    function Ho(I, O) {
      if (!I.altKey || !["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(I.key)) return;
      I.preventDefault();
      const K = H.value.map((Bt) => Bt.key), fe = K.indexOf(O.key), ft = I.key === "ArrowLeft" ? -1 : I.key === "ArrowRight" ? 1 : I.key === "ArrowUp" ? -2 : 2, bt = K[fe + ft];
      bt && (f.value = Ni(K, O.key, bt), ee());
    }
    function Ko(I) {
      const O = I.target;
      !W && !a.value?.contains(O) && !O?.closest("#gh-list-shortcut-window, .gh-shortcut-context-menu") && (r.value = "");
    }
    function yo(I) {
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
          const fe = typeof chrome < "u" && chrome.storage?.local ? (await chrome.storage.local.get(O))[O] : JSON.parse(localStorage.getItem(O) || "[]");
          I === L && K === _ && (f.value = Qh(fe));
        } catch {
          I === L && (l.value = "图标顺序读取失败，可继续操作。");
        }
    }, { immediate: !0 });
    const zo = /* @__PURE__ */ new Set();
    return Pe(() => [o.active, Te.ownerKey, Te.loading], ([I, O, K]) => {
      !I || !O || K || zo.has(O) || (zo.add(O), Ge.ensureAllStarsLoaded());
    }, { immediate: !0 }), Pe(() => o.active, (I) => {
      I || (nt(), m(), r.value = "");
    }), Pe(() => U.value, (I) => {
      I || (r.value = "");
    }), Pe(x, (I) => {
      I || m();
    }), Xe(() => {
      window.addEventListener("pointerdown", Ko), window.addEventListener("keydown", yo), window.addEventListener("blur", nt), window.addEventListener("dragend", Yt), window.addEventListener("drop", Yt), document.addEventListener("visibilitychange", jo);
    }), mo(() => {
      ++L, nt(), window.removeEventListener("pointerdown", Ko), window.removeEventListener("keydown", yo), window.removeEventListener("blur", nt), window.removeEventListener("dragend", Yt), window.removeEventListener("drop", Yt), document.removeEventListener("visibilitychange", jo);
    }), (I, O) => (c(), p("div", {
      ref_key: "root",
      ref: a,
      class: "gh-shortcut-sidebar"
    }, [
      i(dt).message || l.value ? (c(), p("p", ef, u(i(dt).message || l.value), 1)) : E("", !0),
      J(Oo, {
        name: "gh-shortcut",
        tag: "div",
        class: "gh-shortcut-grid"
      }, {
        default: It(() => [
          (c(!0), p(Q, null, be(H.value, (K) => (c(), p("div", {
            key: K.key,
            class: de(["gh-shortcut-cell", { "is-dragging": A.visible && A.tile?.key === K.key, "drop-into": K.kind === "folder" && g.value === K.title }]),
            "data-gh-tile": K.key,
            "data-gh-list-drop": K.kind === "folder" ? K.title : void 0,
            onDragover: (fe) => K.kind === "folder" && me(fe, K.title),
            onDragleave: qe,
            onDrop: (fe) => K.kind === "folder" && Ce(fe, K.title)
          }, [
            n("button", {
              type: "button",
              class: "gh-shortcut-tile",
              "aria-label": K.kind === "folder" ? `打开本地分组 ${K.title}` : `查看仓库 ${K.repo.full_name}`,
              title: K.kind === "folder" ? `${K.title}（拖入将加入本地分组，保留其他归属）` : K.repo.full_name,
              onContextmenu: (fe) => K.kind === "repo" && y(fe, K.repo),
              onClick: (fe) => V(K),
              onPointerdown: (fe) => Qe(fe, K),
              onDragstart: O[0] || (O[0] = G(() => {
              }, ["prevent"])),
              onKeydown: (fe) => Ho(fe, K)
            }, [
              J(Ro, {
                link: K.kind === "repo" ? i(on)(K.repo) : void 0,
                folder: k(K)
              }, null, 8, ["link", "folder"])
            ], 40, of)
          ], 42, tf))), 128))
        ]),
        _: 1
      }),
      H.value.length ? E("", !0) : (c(), p("p", nf, u(i(Te).loading ? "正在读取仓库与列表…" : "暂无本地分组或未分类仓库"), 1)),
      (c(), pe(yt, { to: "body" }, [
        U.value && e.active ? (c(), pe(i(Ta), {
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
          "header-actions": It(() => [
            n("button", {
              type: "button",
              class: "gh-folder-delete-action",
              disabled: i(dt).busy,
              title: "删除本地分组（不会取消 Star）",
              onClick: O[1] || (O[1] = (K) => i(Do).delete(U.value.title))
            }, "删除分组", 8, sf)
          ]),
          default: It(() => [
            n("div", {
              class: de(["gh-shortcut-window-content", { "drop-into": g.value === U.value.title }]),
              "data-gh-list-drop": U.value.title,
              onDragover: O[3] || (O[3] = (K) => me(K, U.value.title)),
              onDragleave: qe,
              onDrop: O[4] || (O[4] = (K) => Ce(K, U.value.title))
            }, [
              n("p", rf, u(M.value.length) + " 个已加载仓库 · 可拖到其他文件夹以加入本地分组", 1),
              n("div", lf, [
                (c(!0), p(Q, null, be(M.value, (K) => (c(), p("div", {
                  key: K.full_name,
                  class: "gh-folder-repo-cell"
                }, [
                  n("button", {
                    type: "button",
                    class: "gh-shortcut-tile",
                    title: K.full_name,
                    onContextmenu: (fe) => y(fe, K),
                    onClick: (fe) => R(K),
                    onPointerdown: (fe) => Oe(fe, K),
                    onDragstart: O[2] || (O[2] = G(() => {
                    }, ["prevent"]))
                  }, [
                    J(Ro, {
                      link: i(on)(K)
                    }, null, 8, ["link"])
                  ], 40, cf)
                ]))), 128))
              ]),
              M.value.length ? E("", !0) : (c(), p("p", df, u(i(Te).loading ? "正在读取…" : "空文件夹，可拖入仓库"), 1))
            ], 42, af)
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
          onPointerdown: O[6] || (O[6] = G(() => {
          }, ["stop"])),
          onClick: O[7] || (O[7] = G(() => {
          }, ["stop"])),
          onContextmenu: O[8] || (O[8] = G(() => {
          }, ["prevent"]))
        }, [
          n("div", pf, u(x.value.full_name), 1),
          n("button", {
            type: "button",
            role: "menuitem",
            onClick: w
          }, "查看仓库详情"),
          n("button", {
            type: "button",
            role: "menuitem",
            disabled: i(dt).busy || !F.value,
            title: "从所有本地分组移出，保留 GitHub 收藏",
            onClick: T
          }, "移到未分组", 8, hf)
        ], 44, uf)) : E("", !0),
        A.visible && A.tile ? (c(), p("div", {
          key: 2,
          class: "gh-shortcut-ghost gh-shortcut-tile",
          style: xe({ left: `${A.x - A.offsetX}px`, top: `${A.y - A.offsetY}px` })
        }, [
          J(Ro, {
            link: A.tile.kind === "repo" ? i(on)(A.tile.repo) : void 0,
            folder: k(A.tile)
          }, null, 8, ["link", "folder"])
        ], 4)) : E("", !0)
      ]))
    ], 512));
  }
}), gf = /* @__PURE__ */ We(ff, [["__scopeId", "data-v-5b72c353"]]), mf = {
  id: "gh-hero-cover",
  class: "gh-bili-cover"
}, vf = { key: 0 }, wf = { key: 1 }, yf = {
  key: 2,
  class: "fo-folder-icon"
}, bf = { class: "gh-bili-heading" }, kf = { class: "gh-hero-title-row" }, _f = ["title"], Cf = {
  class: "gh-hero-sections-tabs",
  role: "tablist",
  "aria-label": "收藏大分组标签"
}, xf = ["title", "onClick", "onContextmenu"], Lf = ["role", "aria-live"], $f = ["title"], Sf = ["title", "aria-label"], Tf = { id: "gh-hero-desc" }, If = { class: "gh-bili-actions" }, Mf = ["title"], Df = { class: "gh-batch-btn-text" }, Af = ["title"], Ef = ["title"], Pf = /* @__PURE__ */ he({
  __name: "GitHubHero",
  emits: ["open-ai-settings", "open-guide"],
  setup(e, { emit: t }) {
    const o = t;
    async function s() {
      let r;
      try {
        r = await yi.prompt({
          title: "新建分组标签",
          message: "创建一个新的顶层分组标签（类似常用网站的分区）：",
          placeholder: "分组名称（如：工作区、AI、工具）…"
        });
      } catch {
        return;
      }
      const g = r?.trim();
      g && await Ge.createSection(g);
    }
    async function a(r, g) {
      if (r.preventDefault(), r.stopPropagation(), g === "默认" && Te.sections.length === 1) return;
      await yi.confirm({
        title: "删除分组标签",
        message: `确定删除分组标签「${g}」吗？里面的文件夹会自动合并至默认分组，仓库不会丢失。`,
        danger: !0
      }) && await Ge.deleteSection(g);
    }
    return (r, g) => (c(), p(Q, null, [
      n("div", mf, [
        i(Ft).kind === "all" ? (c(), p("span", vf, "⭐")) : i(Ft).kind === "uncategorized" ? (c(), p("span", wf, "📄")) : (c(), p("i", yf))
      ]),
      n("div", bf, [
        n("div", kf, [
          n("h3", {
            id: "gh-hero-title",
            title: i(Ft).title
          }, u(i(Ft).title), 9, _f),
          n("div", Cf, [
            (c(!0), p(Q, null, be(i(Te).sections, (f) => (c(), p("button", {
              key: f,
              type: "button",
              class: de(["gh-section-tab", { active: f === i(Te).activeSection }]),
              title: `切换到分组「${f}」；右键可删除此标签`,
              onClick: (l) => i(Ge).switchSection(f),
              onContextmenu: (l) => a(l, f)
            }, u(f), 43, xf))), 128)),
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
            }, u(i(jt).actionText), 9, $f),
            n("button", {
              type: "button",
              title: i(d)("github.hero.closeTip"),
              "aria-label": i(d)("github.hero.closeTip"),
              onClick: g[0] || (g[0] = (f) => i(si).update({ actionText: "", actionError: !1 }))
            }, "×", 8, Sf)
          ], 10, Lf)) : E("", !0)
        ]),
        n("p", Tf, u(i(Ft).description), 1)
      ]),
      n("div", If, [
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
          n("span", Df, u(i(Ft).batchMode ? i(d)("github.hero.batchBack") : i(d)("github.hero.batch")), 1)
        ], 10, Mf),
        n("button", {
          id: "gh-refresh-btn",
          type: "button",
          class: "gh-hero-btn",
          title: i(d)("github.hero.refreshTitle"),
          onClick: g[3] || (g[3] = (f) => i(Ao).refresh())
        }, u(i(d)("github.hero.refresh")), 9, Af),
        n("button", {
          id: "gh-hero-add-folder-btn",
          type: "button",
          class: "gh-hero-btn primary",
          title: i(d)("github.hero.addFolderTitle"),
          onClick: g[4] || (g[4] = (f) => i(Ao).createFolder())
        }, u(i(d)("github.hero.addFolder")), 9, Ef)
      ])
    ], 64));
  }
}), Wf = /* @__PURE__ */ We(Pf, [["__scopeId", "data-v-2f9cdf4e"]]), ae = $e({ repo: "", text: "", baseline: "", busy: !1, message: "", storedValue: null });
function Oi(e, t = !1) {
  if (!e || ae.busy) return;
  if (ae.repo && ae.text !== ae.baseline) {
    ae.message = "请先保存或明确取消当前草稿，再编辑或清除其它备注。";
    return;
  }
  const o = Ge.remarks[e]?.userRemark, s = typeof o == "string" ? o : "";
  Object.assign(ae, {
    repo: e,
    baseline: s,
    text: t ? "" : s,
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
    await Ge.updateRepoRemark(e, { userRemark: t.trim() }, o), Object.assign(ae, { repo: "", text: "", baseline: "", storedValue: null, message: `${e} 的备注已保存并回读核对。` });
  } catch (s) {
    ae.message = s instanceof Error ? s.message : "保存未确认，草稿保留，请先读取已保存值核对。";
  } finally {
    ae.busy = !1;
  }
}
async function Bi() {
  if (ae.busy || !ae.repo) return;
  const e = ae.repo;
  ae.busy = !0;
  try {
    const o = (await Ge.reloadRepoRemarks())[e]?.userRemark;
    if (o !== void 0 && typeof o != "string") throw new Error("保存值格式异常，未变更草稿或覆盖基准。");
    ae.storedValue = o ?? "", ae.baseline = o ?? "", ae.message = "已读取保存值，草稿没有替换。请对比下方保存值；再次点击保存将以草稿替换它。";
  } catch (t) {
    ae.message = t instanceof Error ? t.message : "读取失败，草稿保留。";
  } finally {
    ae.busy = !1;
  }
}
const Rf = ["disabled"], Nf = ["disabled"], Of = ["disabled"], Bf = ["disabled"], Ff = {
  key: 0,
  style: { width: "100%", "white-space": "pre-wrap", "overflow-wrap": "anywhere" }
}, Fi = /* @__PURE__ */ he({
  __name: "GitHubRemarkEditor",
  props: {
    active: { type: Boolean }
  },
  setup(e) {
    const t = e, o = j(null);
    return Xe(() => {
      St(() => {
        t.active && !ae.busy && o.value?.focus();
      });
    }), (s, a) => (c(), p("div", {
      class: "gh-inline-remark-box",
      style: { "flex-wrap": "wrap", "max-width": "100%" },
      onClick: a[6] || (a[6] = G(() => {
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
          a[1] || (a[1] = No(G((r) => !r.isComposing && e.active && i(Gn)(), ["prevent"]), ["enter"])),
          a[2] || (a[2] = No(G((r) => !r.isComposing && e.active && i(zn)(), ["prevent", "stop"]), ["esc"]))
        ]
      }, null, 40, Rf), [
        [ho, i(ae).text]
      ]),
      n("button", {
        type: "button",
        class: "gh-inline-remark-btn save",
        title: "保存备注",
        disabled: i(ae).busy || !e.active,
        onClick: a[3] || (a[3] = //@ts-ignore
        (...r) => i(Gn) && i(Gn)(...r))
      }, "✓", 8, Nf),
      n("button", {
        type: "button",
        class: "gh-inline-remark-btn cancel",
        title: "取消草稿",
        disabled: i(ae).busy || !e.active,
        onClick: a[4] || (a[4] = //@ts-ignore
        (...r) => i(zn) && i(zn)(...r))
      }, "✕", 8, Of),
      n("button", {
        type: "button",
        disabled: i(ae).busy || !e.active,
        onClick: a[5] || (a[5] = //@ts-ignore
        (...r) => i(Bi) && i(Bi)(...r))
      }, "读取已保存值", 8, Bf),
      i(ae).storedValue !== null ? (c(), p("p", Ff, "已保存值：" + u(i(ae).storedValue || "（空）"), 1)) : E("", !0)
    ]));
  }
}), Vn = $e({
  isOpen: !1,
  repository: null
}), Hf = {
  open(e) {
    Vn.repository = e, Vn.isOpen = !0;
  },
  close() {
    Vn.isOpen = !1;
  }
}, Kf = {
  key: 0,
  role: "status"
}, jf = {
  key: 1,
  "aria-label": "未显示仓库的备注草稿"
}, zf = {
  key: 2,
  class: "gh-search-options",
  style: { margin: "0 0 10px" }
}, Gf = { style: { "font-size": "12px", color: "var(--dim)" } }, Vf = {
  key: 3,
  class: "gh-repos-loading"
}, Uf = {
  key: 4,
  class: "muted small",
  style: { "text-align": "center", padding: "40px 0", "font-size": "13px" }
}, Yf = ["data-repo-name", "onClick", "onContextmenu", "onDragstart"], Xf = ["onClick"], qf = { class: "gh-card-head" }, Jf = ["checked", "onChange"], Zf = ["src"], Qf = ["href", "title"], eg = { class: "owner" }, tg = { class: "gh-card-body" }, og = { class: "gh-card-badges" }, ng = ["title", "onClick"], ig = ["onClick"], sg = ["title", "onClick"], ag = { class: "gh-badge-remark-text" }, rg = {
  key: 0,
  class: "desc gh-desc-analyzing",
  title: "正在使用 AI 分析仓库…"
}, lg = {
  key: 1,
  class: "desc gh-desc-ai",
  title: "AI 中文简介（点击可直接修改，右键可重新分析）"
}, cg = ["title"], dg = {
  key: 3,
  class: "desc dim"
}, ug = { class: "meta" }, pg = { class: "gh-stars" }, hg = {
  key: 0,
  class: "gh-lang"
}, fg = {
  key: 1,
  class: "gh-updated"
}, gg = {
  key: 6,
  class: "gh-pager"
}, mg = ["disabled"], vg = { class: "gh-page-info" }, wg = ["disabled"], yg = ["onClick"], bg = /* @__PURE__ */ he({
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
    }), a = j(null), r = j(!1);
    function g(M, k) {
      const $ = M.target;
      if ($ instanceof Element) {
        if (Me.batchMode) {
          if ($.closest(".fo-card-more,.gh-badge-folder,.gh-badge-remark,.gh-inline-remark-box")) return;
          M.preventDefault(), M.stopPropagation(), Et.toggleSelection(k.fullName);
          return;
        }
        $.closest("a,button,.gh-badge-folder,.gh-badge-remark,.fo-card-more,.gh-card-hole,.gh-card-checkbox,.gh-inline-remark-box") || (M.preventDefault(), M.stopPropagation(), Yi.open(k.fullName, void 0, k));
      }
    }
    function f(M, k) {
      if (!t.active) return;
      M.preventDefault(), M.stopPropagation();
      const $ = 12, ee = 160, R = 280, V = Math.min(window.innerWidth - ee - $, Math.max($, M.clientX)), N = Math.min(window.innerHeight - R - $, Math.max($, M.clientY));
      s.x = V, s.y = N, s.fullName = k.fullName, s.folders = [...k.folders || (k.folder ? [k.folder] : [])], s.hasRemark = !!k.customRemark, s.url = k.url, s.visible = !0, a.value = null, r.value = V > window.innerWidth - 380;
    }
    function l(M, k) {
      f(k, M), a.value = "folder";
    }
    function h() {
      s.visible = !1, a.value = null;
    }
    function x(M) {
      s.folders.includes(M) ? s.folders = s.folders.filter((k) => k !== M) : s.folders.push(M), Ge.toggleRepoList(s.fullName, M);
    }
    function F() {
      s.folders = [], Ge.clearRepoLists(s.fullName), h();
    }
    function m(M) {
      if (!t.active) return;
      const k = typeof M == "string" ? M : M?.fullName || s.fullName;
      h(), Oi(k);
    }
    function D() {
      if (!t.active) return;
      const M = s.fullName;
      h(), Oi(M, !0);
    }
    async function v() {
      const M = s.url;
      if (h(), M && t.active)
        try {
          await navigator.clipboard.writeText(M);
        } catch {
        }
    }
    function y(M) {
      const k = Ge.findRepository(s.fullName);
      h(), k && Xs.sendGitHubShare({
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
      const M = Ge.findRepository(s.fullName);
      h(), M && Hf.open({
        fullName: M.full_name,
        description: M.description || "",
        stars: M.stargazers_count,
        language: M.language || void 0,
        updated: M.updated_at
      });
    }
    function w() {
      s.url && window.open(s.url, "_blank", "noreferrer"), h();
    }
    async function _() {
      const M = Ge.findRepository(s.fullName);
      if (!M) {
        h();
        return;
      }
      h(), await Ge.confirmUnstarRepository(M);
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
      Et.startDrag(k, M);
    }
    const U = te(() => {
      if (Me.cards.length > 0) return !1;
      const M = jt.actionText || "";
      return !!(M.includes("正在读取") || M.includes("正在加载") || M.includes("正在统计") || M.includes("正在同步"));
    });
    return (M, k) => (c(), p(Q, null, [
      i(ae).message ? (c(), p("p", Kf, u(i(ae).repo ? `${i(ae).repo}：` : "") + u(i(ae).message), 1)) : E("", !0),
      o.value ? (c(), p("section", jf, [
        n("p", null, "备注草稿：" + u(i(ae).repo) + "（仓库不在当前列表中，草稿仍保留）", 1),
        J(Fi, {
          active: t.active
        }, null, 8, ["active"])
      ])) : E("", !0),
      i(Me).searchMessage ? (c(), p("div", zf, [
        n("span", Gf, u(i(Me).searchMessage), 1),
        n("button", {
          type: "button",
          class: "gh-tab",
          style: { padding: "2px 8px", "font-size": "11px", "margin-left": "8px" },
          onClick: k[0] || (k[0] = ($) => i(Et).resetSearch())
        }, "清空搜索")
      ])) : E("", !0),
      U.value ? (c(), p("div", Vf, [...k[17] || (k[17] = [
        n("div", {
          class: "gh-spinner",
          "aria-hidden": "true"
        }, null, -1),
        n("span", { class: "gh-loading-label" }, "正在读取 GitHub 仓库列表中…", -1)
      ])])) : i(Me).emptyMessage ? (c(), p("p", Uf, u(i(Me).emptyMessage), 1)) : E("", !0),
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
            onClick: G((ee) => f(ee, $), ["stop"])
          }, "⋮", 8, Xf),
          n("div", qf, [
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
                onChange: (ee) => i(Et).setSelection($.fullName, ee.target.checked)
              }, null, 40, Jf),
              k[18] || (k[18] = n("span", { class: "gh-hole-inner" }, null, -1))
            ]),
            n("img", {
              class: "gh-owner-avatar",
              src: $.avatarUrl || "assets/github-star.svg",
              alt: "",
              loading: "lazy",
              referrerpolicy: "no-referrer",
              onError: k[2] || (k[2] = (ee) => ee.target.src = "assets/github-star.svg")
            }, null, 40, Zf),
            n("a", {
              href: $.url,
              target: "_blank",
              rel: "noreferrer",
              class: "name",
              title: $.fullName
            }, [
              n("span", eg, u($.owner) + "/", 1),
              ot(u($.name), 1)
            ], 8, Qf)
          ]),
          n("div", tg, [
            n("div", og, [
              $.folders && $.folders.length ? (c(!0), p(Q, { key: 0 }, be($.folders, (ee) => (c(), p("span", {
                key: ee,
                class: "gh-badge-folder",
                title: `本地分组：${ee}（点击管理所属列表）`,
                onClick: G((R) => l($, R), ["stop"])
              }, " 📁 " + u(ee), 9, ng))), 128)) : (c(), p("span", {
                key: 1,
                class: "gh-badge-folder uncat",
                title: "未分类（点击加入 本地分组）",
                onClick: G((ee) => l($, ee), ["stop"])
              }, " ＋ 未分类 ", 8, ig)),
              i(ae).repo === $.fullName ? (c(), pe(Fi, {
                key: 2,
                active: t.active
              }, null, 8, ["active"])) : $.customRemark ? (c(), p("span", {
                key: 3,
                class: "gh-badge-remark",
                title: `备注：${$.customRemark}（点击就地修改）`,
                onClick: G((ee) => m($), ["stop"])
              }, [
                k[19] || (k[19] = n("span", { class: "gh-badge-remark-icon" }, "💬", -1)),
                n("span", ag, u($.customRemark), 1)
              ], 8, sg)) : E("", !0)
            ]),
            $.descriptionKind === "analyzing" ? (c(), p("p", rg, [...k[20] || (k[20] = [
              n("span", { class: "gh-ai-sparkle" }, "✨", -1),
              ot(" 正在使用 AI 分析仓库并提炼中文介绍…", -1)
            ])])) : $.descriptionKind === "ai" ? (c(), p("p", lg, [
              k[21] || (k[21] = n("span", { class: "gh-ai-tag-flag" }, "🤖", -1)),
              ot(u($.description), 1)
            ])) : $.descriptionKind === "plain" ? (c(), p("p", {
              key: 2,
              class: "desc",
              title: $.description
            }, u($.description), 9, cg)) : (c(), p("p", dg, "暂无描述"))
          ]),
          n("div", ug, [
            n("span", pg, "★ " + u($.stars), 1),
            $.language ? (c(), p("span", hg, u($.language), 1)) : E("", !0),
            $.updated ? (c(), p("span", fg, "更新 " + u($.updated), 1)) : E("", !0)
          ])
        ], 42, Yf))), 128))
      ], 2)) : E("", !0),
      i(Me).totalPages > 1 ? (c(), p("div", gg, [
        n("button", {
          class: "gh-page-btn",
          type: "button",
          disabled: i(Me).page <= 1,
          onClick: k[3] || (k[3] = ($) => i(Et).changePage(i(Me).page - 1))
        }, "‹ 上一页", 8, mg),
        n("span", vg, u(i(Me).page) + " / " + u(i(Me).totalPages) + " · 共 " + u(i(Me).totalItems) + " 个" + u(i(Me).serverPaged ? ` · 已加载 ${i(Me).loadedItems}` : ""), 1),
        n("button", {
          class: "gh-page-btn",
          type: "button",
          disabled: i(Me).page >= i(Me).totalPages,
          onClick: k[4] || (k[4] = ($) => i(Et).changePage(i(Me).page + 1))
        }, "下一页 ›", 8, wg)
      ])) : E("", !0),
      (c(), pe(yt, { to: "body" }, [
        t.active && s.visible ? (c(), p("div", {
          key: 0,
          class: "fo-cover-context-menu gh-repo-context-menu",
          style: xe({ left: `${s.x}px`, top: `${s.y}px` }),
          onClick: k[15] || (k[15] = G(() => {
          }, ["stop"])),
          onContextmenu: k[16] || (k[16] = G(() => {
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
              onClick: k[5] || (k[5] = G(() => {
              }, ["stop"]))
            }, [
              n("button", {
                class: de(["fo-cover-menu-item", { primary: s.folders.length === 0 }]),
                type: "button",
                onClick: F
              }, u(s.folders.length === 0 ? "✓ " : "  ") + "＋ 设为未分类（清空列表） ", 3),
              (c(!0), p(Q, null, be(i(Ge).cats, ($) => (c(), p("button", {
                key: $,
                class: de(["fo-cover-menu-item", { primary: s.folders.includes($) }]),
                type: "button",
                onClick: (ee) => x($)
              }, u(s.folders.includes($) ? "✓ " : "  ") + "📁 " + u($), 11, yg))), 128))
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
          J(La, {
            label: "💬 发送到聊天室",
            visible: s.visible,
            onOpen: k[10] || (k[10] = ($) => a.value = null),
            onSelect: y
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
            onClick: w
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
}), kg = /* @__PURE__ */ We(bg, [["__scopeId", "data-v-f2eeeb72"]]), _g = { class: "gh-batch-bar-left" }, Cg = { class: "gh-batch-count-tip" }, xg = { id: "gh-batch-selected-count" }, Lg = {
  key: 0,
  "aria-label": "批量归属列表确认"
}, $g = ["disabled"], Sg = ["disabled"], Tg = { class: "gh-batch-bar-right" }, Ig = ["disabled"], Mg = ["disabled"], Dg = ["disabled"], Ag = /* @__PURE__ */ he({
  __name: "GitHubBatchBar",
  props: {
    active: { type: Boolean, default: !0 }
  },
  setup(e) {
    const t = e, o = Hs(), s = j(null), a = te(() => {
      const f = [
        { value: "", label: "未分类（清空所选仓库的所有列表所属）", icon: "🌐" }
      ];
      return Xi.folders.filter((l) => l.kind === "custom").forEach((l) => {
        f.push({ value: l.title, label: l.title, icon: "📁" });
      }), f;
    });
    function r() {
      t.active && (o.value = Ge.prepareBatchMove(), s.value = null);
    }
    async function g() {
      const f = o.value, l = s.value;
      if (!t.active || !f || l === null || dt.busy) return;
      await f.submit(l) && o.value === f && (o.value = void 0);
    }
    return Pe(() => t.active && Jt.active, (f) => {
      f || (o.value = void 0);
    }), (f, l) => (c(), p(Q, null, [
      n("div", _g, [
        n("button", {
          type: "button",
          class: "gh-batch-action-btn",
          id: "gh-batch-select-all-btn",
          onClick: l[0] || (l[0] = (h) => i(Eo).toggleSelectAll())
        }, u(i(Jt).allSelected ? "取消全选" : "全选"), 1),
        n("span", Cg, [
          l[5] || (l[5] = ot("已选择 ", -1)),
          n("b", xg, u(i(Jt).selectedCount), 1),
          l[6] || (l[6] = ot(" 项", -1))
        ])
      ]),
      o.value ? (c(), p("section", Lg, [
        n("p", null, "仅操作打开选择器时的 " + u(o.value.names.length) + " 个仓库；后来勾选的仓库不加入。", 1),
        n("details", null, [
          l[7] || (l[7] = n("summary", null, "查看本次仓库清单", -1)),
          n("ul", null, [
            (c(!0), p(Q, null, be(o.value.names, (h) => (c(), p("li", { key: h }, u(h), 1))), 128))
          ])
        ]),
        J(zi, {
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
        }, "确认加入列表", 8, $g),
        n("button", {
          type: "button",
          disabled: i(dt).busy,
          onClick: l[2] || (l[2] = (h) => o.value = void 0)
        }, "取消", 8, Sg)
      ])) : E("", !0),
      n("div", Tg, [
        n("button", {
          type: "button",
          class: "gh-batch-action-btn",
          id: "gh-batch-move-btn",
          disabled: !t.active || i(dt).busy || i(Jt).selectedCount === 0,
          title: "固定当前选择，批量加入所选本地分组",
          onClick: r
        }, " 📁 归入本地分组 ", 8, Ig),
        n("button", {
          type: "button",
          class: "gh-batch-action-btn",
          id: "gh-batch-ai-btn",
          disabled: i(Jt).selectedCount === 0,
          title: "批量使用 AI 生成中文介绍",
          onClick: l[3] || (l[3] = (h) => i(Eo).analyzeAi())
        }, " ✨ 批量 AI 分析 ", 8, Mg),
        n("button", {
          type: "button",
          class: "gh-batch-action-btn danger",
          id: "gh-batch-unstar-btn",
          disabled: i(Jt).selectedCount === 0,
          title: "从 GitHub 批量取消 Star 收藏",
          onClick: l[4] || (l[4] = (h) => i(Eo).unstar())
        }, " 🗑 取消收藏 ", 8, Dg)
      ])
    ], 64));
  }
}), Eg = X(() => import("./GitHubWorkspaceCard-DLIvNzoV.js")), Pg = X(() => import("./NotificationCenter-IZkZY90F.js")), Wg = X(() => import("./TabManagerPanel-DBXvq2jp.js")), Rg = X(() => import("./BookmarkNoteMenu-DJ3h3-47.js")), Ng = X(() => import("./BookmarkPanel-CkJP4CAE.js")), Og = X(() => import("./LauncherDialogs-CvkmYvuk.js")), Bg = X(() => import("./SettingsDialog-D86m4ZIS.js")), Fg = X(() => import("./SettingsView-vOrrlBqq.js")), Hg = X(() => import("./ClockSettingsMenu-D4ZpKNVT.js")), Kg = X(() => import("./BiliTheaterDialog-4tBcUlZN.js")), jg = X(() => import("./BiliMiniPlayer-u2d3D1JP.js")), zg = X(() => import("./BiliMessagePanel-OgO-GF7t.js")), Gg = X(() => import("./BilibiliWorkspace-YB1gn10f.js")), Vg = X(() => import("./YouTubeCard-BqyKTmFW.js").then((e) => e.Y)), Ug = X(() => import("./AihotFeed-CojIsHVZ.js")), Yg = X(() => import("./GitHubTrending-DFCVpPLa.js")), Xg = X(() => import("./AiDialog-BmaiQsFH.js")), qg = X(() => import("./AihotViewer-Beh8FWe7.js")), Jg = X(() => import("./NavWheelOverlay-Bi0qU-oG.js")), Zg = X(() => import("./StandaloneHost-DIyZvyFk.js")), Qg = X(() => import("./LauncherFolderDialog-Bp1h0htc.js")), em = X(() => import("./LauncherMenus-B7tVIkgq.js"));
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
      const g = r.innerHTML, f = oi(o);
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
      let s = !1;
      const a = () => {
        e.stop("intro");
      };
      window.addEventListener("logicweaver:intro-complete", a, { once: !0 }), o.mount(t);
      const r = window.setTimeout(() => {
        wt.finish("基础界面已就绪，在线服务继续后台加载", !0), window.setTimeout(() => {
          s || (a(), t?.remove(), document.body.classList.remove("is-starting"));
        }, 600);
      }, 8e3);
      return () => {
        s || (s = !0, clearTimeout(r), window.removeEventListener("logicweaver:intro-complete", a), o.unmount(), t.remove(), document.body.classList.remove("is-starting"));
      };
    }
  }), ce(e, { id: "spa-app", title: "纯血 SPA 单根调度器", order: 15, root: "vue-spa-root", capabilities: ["ui:spa-root", "workspace:keepalive"] }, Wh), document.getElementById("vue-spa-root") || ce(e, { id: "bili-companions", title: "b站伴随窗口", order: 19, root: "vue-bili-companions-root", capabilities: ["ui:dock-companion"] }, Zg), ce(e, { id: "notifications", title: "通知中心", order: 20, root: "vue-notification-root", capabilities: ["ui:toast", "notification:dedupe"] }, Ls), ce(e, { id: "profile-menu", title: "头像右键菜单", order: 21, root: "bili-profile-menu", capabilities: ["ui:profile-menu", "profile:actions"] }, Gh, Fo), ce(e, { id: "workspace-launchers", title: "常用工作区启动项", order: 22, root: "workspace-launchers", capabilities: ["ui:workspace-launchers", "workspace:launch"] }, Vh, di), ce(e, { id: "mac-dock", title: "底部快捷应用 Dock 栏", order: 23, root: "mac-dock", capabilities: ["ui:mac-dock", "dock:navigate"] }, xs, xt), ce(e, { id: "hero-clock", title: "首屏中央时钟", order: 26, root: "hero-clock", capabilities: ["ui:hero-clock", "clock:read"] }, vs), ce(e, { id: "search-box", title: "首屏搜索框", order: 27, root: "search", capabilities: ["ui:search-box", "search:actions"] }, Hi), ce(e, { id: "home-music", title: "首屏音乐播放器", order: 28, root: "task-thread-home", capabilities: ["ui:home-music", "music:playback"] }, ws, et), ce(e, { id: "launcher-groups", title: "常用网站分组架", order: 29, root: "launcher-groups", capabilities: ["ui:launcher-groups", "launcher:navigate"] }, Cs, ze), ce(e, { id: "weather-widget", title: "首屏天气小部件", order: 39, root: "weather-body", capabilities: ["ui:weather-widget", "weather:read"] }, ms), ce(e, { id: "github-workspace", title: "GitHub 独立页 Vue 工作台", order: 49, root: "vue-github-workspace-root", capabilities: ["ui:github-workspace"] }, Eg), ce(e, { id: "github-status", title: "GitHub 同步状态", order: 50, root: "vue-github-status-root", capabilities: ["ui:github-status", "github:sync-read"] }, Jh, si), ce(e, { id: "github-folders", title: "GitHub 文件夹导航", order: 55, root: "gh-folder-list", capabilities: ["ui:github-folders", "github:categorize-drop"] }, gf, Do), ce(e, { id: "github-hero", title: "GitHub 分类摘要", order: 56, root: "gh-hero", capabilities: ["ui:github-summary", "github:actions"] }, Wf, Ao), ce(e, { id: "github-repositories", title: "GitHub 仓库列表", order: 57, root: "vue-github-repositories-root", capabilities: ["ui:github-repositories", "github:repository-actions", "github:paging"] }, kg, Et), ce(e, { id: "github-batch-bar", title: "GitHub Star 批量操作工具栏", order: 58, root: "gh-batch-bar", capabilities: ["ui:github-batch-bar", "github:batch-actions"] }, Ag, Eo), ce(e, { id: "notification-center", spaOwned: !0, title: "持久通知中心", order: 71, root: "vue-notification-center-root", capabilities: ["ui:notification-history", "notification:read"] }, Pg, Wt), ce(e, { id: "tab-manager", spaOwned: !0, title: "独立标签页管理", order: 71, root: "vue-tab-manager-root", capabilities: ["ui:tab-manager", "tabs:explicit"] }, Wg, ls), ce(e, { id: "bookmark-menu", title: "书签上下文操作与备注菜单", order: 72, root: "vue-bookmark-menu-root", capabilities: ["ui:bookmark-menu", "bookmark:edit"] }, Rg, ii), ce(e, { id: "launcher-dialogs", title: "快捷启动器管理弹窗族", order: 73, root: "vue-launcher-dialogs-root", capabilities: ["ui:launcher-dialogs", "launcher:manage"] }, Og, qi), ce(e, { id: "launcher-folder-dialog", title: "大文件夹展开视窗", order: 74, root: "vue-launcher-folder-root", capabilities: ["ui:launcher-folder", "launcher:folder-dialog"] }, Qg, Ji), ce(e, { id: "launcher-menus", title: "启动器快捷上下文菜单族", order: 76, root: "vue-launcher-menus-root", capabilities: ["ui:launcher-menus", "launcher:context-menu"] }, em, ai), ce(e, { id: "bookmark-panel", title: "浏览器书签侧边滑动视窗", order: 77, root: "vue-bookmark-panel-root", capabilities: ["ui:bookmark-panel", "bookmarks:panel"] }, Ng, vn), ce(e, { id: "bookmark-folder-strip", spaOwned: !0, title: "顶栏书签快捷文件夹横条", order: 78, root: "vue-bookmark-folder-strip-root", capabilities: ["ui:bookmark-folder-strip", "bookmarks:strip"] }, null, pn), ce(e, { id: "settings-page", title: "独立设置页 Vue 工作台", order: 79, root: "vue-options-root", capabilities: ["ui:settings-page"] }, Fg), ce(e, { id: "settings-dialog", title: "全局设置中心视窗", order: 80, root: "vue-settings-dialog-root", capabilities: ["ui:settings-dialog", "settings:manage"] }, Bg, wn), ce(e, { id: "clock-settings-menu", spaOwned: !0, title: "中央时钟偏好配置菜单", order: 82, root: "vue-clock-settings-root", capabilities: ["ui:clock-settings", "clock:preference-edit"] }, Hg, Gt), ce(e, { id: "bili-theater-dialog", title: "Bilibili 沉浸剧场与评论区弹窗", order: 85, root: "vue-bili-theater-root", capabilities: ["ui:bili-theater", "bili:playback"] }, Kg, Po), ce(e, { id: "bili-mini-player", title: "Bilibili 悬浮迷你播放器", order: 85, root: "vue-bili-mini-player-root", capabilities: ["ui:bili-mini-player", "bili:playback"] }, jg), ce(e, { id: "ai-dialog", title: "AI 助手对话框与知识点抽屉", order: 86, root: "vue-ai-dialog-root", capabilities: ["ui:ai-dialog", "ai:chat"] }, Xg, ui), ce(e, { id: "aihot-viewer", spaOwned: !0, title: "AI HOT 资讯文章阅读器", order: 88, root: "vue-aihot-viewer-root", capabilities: ["ui:aihot-viewer", "viewer:aihot"] }, qg, li), ce(e, { id: "nav-wheel", title: "辐射状快捷动作轮盘与悬浮球", order: 95, root: "vue-nav-wheel-root", capabilities: ["ui:nav-wheel", "nav:radial-menu"] }, Jg, Ee), ce(e, { id: "bili-message-panel", spaOwned: !0, title: "Bilibili 消息与互动通知中心", order: 102, root: "vue-bili-message-panel-root", capabilities: ["ui:bili-message-panel", "bili:messages"] }, zg, zt), ce(e, { id: "bili-favorites", spaOwned: !0, title: "b站插件 Vue 外壳", order: 110, root: "vue-bili-favorites-root", capabilities: ["ui:bili-favorites-shell", "bilibili:favorites"] }, Gg, Qi), ce(e, { id: "youtube-card", spaOwned: !0, title: "YouTube 订阅与探索工作台", order: 111, root: "vue-youtube-root", capabilities: ["ui:youtube-card", "youtube:updates"] }, Vg, ts), ce(e, { id: "aihot-feed", spaOwned: !0, title: "AI HOT 资讯流全功能聚合看板", order: 112, root: "vue-aihot-root", capabilities: ["ui:aihot-feed", "aihot:aggregate"] }, Ug, es), ce(e, { id: "github-trending", spaOwned: !0, title: "GitHub 趋势榜与热门流", order: 114, root: "vue-github-trending-root", capabilities: ["ui:github-trending", "github:trending"] }, Yg, cs);
}
Ns();
const kn = Aa(yn);
rr(yn, kn);
lr(yn);
tm(kn);
ni.loadBookmarks();
(async () => {
  document.getElementById("vue-bili-favorites-root") && !document.getElementById("vue-spa-root") && await import("./bilibili-channel.service-RmSy35Fa.js"), await Ra(), await kn.startEager(), wt.notifyBootReady();
})().catch((e) => console.error("[LogicWeaver] 页面启动失败", e));
window.addEventListener("pagehide", () => {
  kn.stopAll();
}, { once: !0 });
export {
  _i as C,
  Np as D,
  gf as G,
  Ro as L,
  ys as T,
  zh as _,
  Wf as a,
  cs as b,
  ls as c,
  Gt as d,
  Ci as e,
  Cm as f,
  Hf as g,
  Ne as h,
  ui as i,
  Ye as j,
  Ee as k,
  mn as l,
  ks as m,
  ne as n,
  _s as o,
  bs as p,
  Vh as q,
  Gh as r,
  gs as s,
  ln as t,
  ei as u,
  Vn as v,
  je as w,
  fs as x,
  yn as y
};
