import { l as li, a as xe, b as tn, c as on, d as mi, e as le, f as ct, S as nn, u as Ne, s as rs, g as ls, h as zt, i as cs } from "./drawer-store-_pRLHpRr.js";
/* empty css                */
import { c as wi, r as fe, a as Vt, w as tt, b as q, d as he, o as Ve, e as yt, f as c, g as m, u as s, t as u, F as ee, h as n, i as be, j as P, k as j, n as ke, l as ne, T as Tt, m as nt, p as St, v as Po, q as $o, s as re, x as ae, y as pt, z as Zt, A as ci, B as io, C as X, D as Mo, E as H, G as Ae, H as so, I as sn, J as ds, K as us } from "./vendor-vue-BbmU9NUg.js";
import { n as ue, b as $i, a as bo, g as an, c as rn, d as ln, e as mt, f as eo, s as jo, h as Mi, i as ps, j as ro, k as hs, l as fs, m as Oe, o as Ue, p as ge, q as gs, r as ms, t as It, u as Gt, v as ws } from "./github.service-mYu1TuZI.js";
import { t as lo, p as Vo, a as Wo, n as no, l as $e, b as No, c as cn, s as ys, d as vs, h as Ze, m as ut, e as yi, f as dn, g as ht, i as bs, j as te, k as ks, o as Ii, q as un, r as Wt, u as co, v as _s, w as xs, x as Cs } from "./search.service-DiFFcmm2.js";
import { c as Ls, a as Ss, t as Ts, b as $s, d as Ms, e as Is, f as Nt, g as As } from "./calendar.service-Dd5V2338.js";
import { W as Io, b as Es } from "./wallpaper.service-B98QLBwb.js";
import { w as Ce, s as vi, P as Ds, i as Ao, D as Ko, a as Ai, g as je, p as Ps, L as Ws, b as vt, c as Ns, d as zo, t as Ei, e as Os, f as Rs, h as _t, l as pn } from "./window-manager.store-D9RSYghK.js";
import { s as ao } from "./store-DT9WoYYx.js";
import { b as to, a as Bs, c as Hs, C as Fs } from "./ChatShareMenu-BJRg07tg.js";
import { biliMessagePanelController as kt, biliMessagePanelState as js } from "./message-panel-store-BBZYrIRP.js";
import { r as Vs, a as Ut } from "./radio-player-BcHY7tnw.js";
import { s as Ks, a as zs } from "./stickers.service-DwyFQlqA.js";
import { a as bi, b as Gs } from "./store-DLW5A5XY.js";
import { b as hn } from "./bili-favorites-store-CdbdVJvS.js";
import { a as fn } from "./aihot-feed-store-Q9eysfNQ.js";
import { g as gn, T as Us, i as Ys, a as qs, b as Xs, c as Js, G as Qs, d as Zs } from "./github-task-modal-store-BmukMkrV.js";
import { t as d, c as et, _ as Re } from "./_plugin-vue_export-helper-Dzz2LC3-.js";
import { fullscreenCardsController as xt } from "./fullscreen-cards.store-CoZ6dUIZ.js";
import { k as ea, m as ta } from "./core-utils-KTt-RZby.js";
import { t as At } from "./together-listen.store-DvvGQKc-.js";
import { L as Di, a as Pi } from "./LauncherTileContent-DDJOD3Wm.js";
import { u as oa } from "./InlineEditStatus.vue_vue_type_style_index_0_scoped_c63d0c6d_lang-DwclBqWw.js";
import { e as ia, C as na } from "./CustomSelect-BXOGViH6.js";
const sa = /^[a-z][a-z0-9]*(?:[.:-][a-z0-9]+)*$/;
function aa() {
  const e = /* @__PURE__ */ new Map(), t = /* @__PURE__ */ new Map();
  function o(l) {
    if (!l || !sa.test(l.id)) throw new TypeError(`Invalid command id: ${l?.id || ""}`);
    if (!l.title?.trim() || !l.category?.trim() || typeof l.run != "function")
      throw new TypeError(`Command ${l.id} requires title, category and run()`);
    if (e.has(l.id)) throw new Error(`Command already registered: ${l.id}`);
    return e.set(l.id, Object.freeze({
      ...l,
      description: l.description || "",
      keywords: Object.freeze([...l.keywords || []]),
      concurrency: l.concurrency || "replace"
    })), () => {
      i(l.id), e.delete(l.id);
    };
  }
  function i(l) {
    const _ = t.get(l);
    return _ ? (_.abort(), t.delete(l), !0) : !1;
  }
  async function a(l, _, I = "api") {
    const A = e.get(l);
    if (!A) throw new Error(`Unknown command: ${l}`);
    if (A.enabled && !A.enabled()) return;
    const f = A.concurrency || "replace";
    if (t.has(l)) {
      if (f === "drop") return;
      f === "replace" && i(l);
    }
    const $ = new AbortController();
    f !== "parallel" && t.set(l, $);
    try {
      return await A.run(_, { signal: $.signal, source: I });
    } finally {
      t.get(l) === $ && t.delete(l);
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
  function v() {
    return Object.freeze([...e.values()].map(r).sort((l, _) => l.category.localeCompare(_.category, "zh") || l.title.localeCompare(_.title, "zh")));
  }
  function k(l, _ = 20) {
    const I = String(l || "").trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
    if (!I.length) return v().slice(0, _);
    const A = [...e.values()].map((f) => {
      const $ = r(f), g = $.title.toLocaleLowerCase(), p = `${$.id} ${g} ${$.category} ${$.description} ${$.keywords.join(" ")}`.toLocaleLowerCase();
      if (!I.every((L) => p.includes(L))) return null;
      let b = 0;
      for (const L of I)
        $.id === L ? b += 200 : $.id.startsWith(L) && (b += 120), g === L ? b += 160 : g.startsWith(L) ? b += 100 : g.includes(L) && (b += 60), $.keywords.some((D) => D.toLocaleLowerCase().startsWith(L)) && (b += 40);
      return { item: $, score: b };
    }).filter((f) => !!f);
    return A.sort((f, $) => $.score - f.score || f.item.title.localeCompare($.item.title, "zh")), Object.freeze(A.slice(0, Math.max(1, _)).map((f) => f.item));
  }
  return Object.freeze({ register: o, execute: a, cancel: i, has: (l) => e.has(l), list: v, search: k });
}
const Oo = aa(), ra = /^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/;
function la(e) {
  const t = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map();
  function r(f) {
    if (!f || !ra.test(f.id)) throw new TypeError(`Invalid feature id: ${f?.id || ""}`);
    if (!f.title?.trim() || typeof f.mount != "function") throw new TypeError(`Feature ${f.id} requires title and mount()`);
    if (t.has(f.id)) throw new Error(`Feature already registered: ${f.id}`);
    return t.set(f.id, Object.freeze({
      ...f,
      order: Number(f.order) || 100,
      eager: f.eager === !0,
      roots: Object.freeze([...f.roots || []]),
      capabilities: Object.freeze([...f.capabilities || []])
    })), () => {
      l(f.id), a.delete(f.id), t.delete(f.id);
    };
  }
  function v(f) {
    return typeof f == "function" ? f : f && typeof f.unmount == "function" ? () => f.unmount() : () => {
    };
  }
  function k(f) {
    if (o.has(f)) return Promise.resolve(o.get(f)?.cleanup);
    if (i.has(f)) return i.get(f);
    const $ = t.get(f);
    if (!$) return Promise.reject(new Error(`Unknown feature: ${f}`));
    a.delete(f);
    const g = new AbortController(), p = Object.freeze({
      signal: g.signal,
      commands: e,
      getRoot: (L) => document.getElementById(L)
    }), b = Promise.resolve().then(() => $.mount(p)).then((L) => (i.delete(f), o.set(f, { cleanup: L, controller: g }), L), (L) => {
      throw i.delete(f), a.set(f, L), g.abort(), L;
    });
    return i.set(f, b), b;
  }
  async function l(f) {
    const $ = i.get(f);
    if ($)
      try {
        await $;
      } catch {
        return;
      }
    const g = o.get(f);
    g && (o.delete(f), g.controller.abort(), await v(g.cleanup)());
  }
  async function _() {
    const f = typeof document < "u" && !!(document.getElementById("vue-spa-root") || document.getElementById("logicweaver-spa-root")), $ = [...t.values()].filter((b) => !(!b.eager || !f && b.roots && b.roots.length > 0 && !b.roots.some((D) => !!document.getElementById(D)))).sort((b, L) => (b.order || 100) - (L.order || 100)), p = (await Promise.allSettled($.map((b) => k(b.id)))).flatMap((b, L) => b.status === "rejected" ? [{ id: $[L].id, reason: b.reason }] : []);
    p.length && console.warn("LogicWeaver Vue features failed to mount", p);
  }
  async function I() {
    const f = [...o.keys()].reverse();
    await Promise.allSettled(f.map(l));
  }
  function A() {
    return Object.freeze([...t.values()].map((f) => Object.freeze({
      id: f.id,
      title: f.title,
      order: f.order || 100,
      eager: f.eager === !0,
      roots: Object.freeze([...f.roots || []]),
      capabilities: Object.freeze([...f.capabilities || []]),
      status: i.has(f.id) ? "mounting" : o.has(f.id) ? "mounted" : a.has(f.id) ? "failed" : "registered",
      error: a.has(f.id) ? String(a.get(f.id)?.message || a.get(f.id) || "Feature mount failed") : ""
    })).sort((f, $) => f.order - $.order));
  }
  return Object.freeze({ register: r, start: k, startEager: _, stop: l, stopAll: I, has: (f) => t.has(f), list: A });
}
const ca = localStorage.getItem("startupAnimationStyle") || localStorage.getItem("logicweaverStartupStyle") || "endfield", Wi = (() => {
  try {
    const e = localStorage.getItem("showStartupAnimation"), t = localStorage.getItem("logicweaverEndfieldLoader"), o = e ?? t;
    return o === "1" || o === "true";
  } catch {
    return !1;
  }
})(), z = fe({
  enabled: Wi,
  style: ca === "rhinelab" ? "rhinelab" : "endfield",
  renderedProgress: 4,
  targetProgress: 4,
  status: "CORE SHELL...",
  finished: !Wi,
  exiting: !1,
  forced: !1
});
let jt = 0, Eo = 4, mn = performance.now(), di = 0, ko = null, ui = !1;
function wn(e) {
  const t = e - mn, o = di ? Math.min(1, t / di) : 1, i = o * o * (3 - 2 * o);
  z.renderedProgress = Eo + (z.targetProgress - Eo) * i, o < 1 && !z.finished ? jt = requestAnimationFrame(wn) : jt = 0;
}
function _o(e, t) {
  if (!z.enabled || z.finished) return;
  const o = Math.max(z.targetProgress, Math.max(4, Math.min(100, Number(e) || 4)));
  t && (z.status = t), Eo = z.renderedProgress, z.targetProgress = o, mn = performance.now(), di = Math.max(280, Math.min(920, 220 + Math.abs(o - Eo) * 7.5)), cancelAnimationFrame(jt), jt = requestAnimationFrame(wn);
}
function Ro(e = "Ready", t = !1) {
  z.finished || (z.finished = !0, z.forced = t, z.status = e, z.targetProgress = 100, cancelAnimationFrame(jt), jt = 0, z.renderedProgress = 100, ko?.(t));
}
function da(e = "KEYBOARD SKIP") {
  Ro(e, !0);
}
function ua() {
  z.enabled || Ro("BOOT COMPLETE", !0);
}
function yn() {
  !z.enabled || z.finished || ui || (ui = !0, _o(38, "INITIALIZING CORE SHELL..."), setTimeout(() => {
    z.finished || _o(76, "SYNTHESIZING RUNTIME...");
  }, 400), setTimeout(() => {
    z.finished || _o(100, z.style === "rhinelab" ? "ID CONFIRMED : JOYCE MOORE" : "TERRA LINK READY / 终端就绪");
  }, 900), setTimeout(() => {
    z.finished || Ro("BOOT COMPLETE / 首页就绪", !1);
  }, 1650));
}
async function pa() {
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
const Ye = Vt(z), st = Object.freeze({
  update: _o,
  finish: Ro,
  skip: da,
  notifyBootReady: ua,
  async playIntro(e) {
    if (e?.style && (z.style = e.style), typeof document < "u" && (document.documentElement.dataset.startupStyle = z.style, document.documentElement.classList.remove("skip-endfield-loader"), document.body.classList.add("is-starting")), z.enabled = !0, z.finished = !1, z.forced = !!e?.force, z.renderedProgress = 4, z.targetProgress = 4, ui = !1, typeof document < "u") {
      let t = document.getElementById("endfield-loader");
      if (!t) {
        t = document.createElement("div"), t.id = "endfield-loader", t.className = "endfield-loader notranslate", document.body.appendChild(t);
        const { default: o } = await import("./IntroAnimation-BIhS3Sea.js"), i = wi(o), a = () => {
          window.removeEventListener("logicweaver:intro-complete", a), i.unmount(), t?.remove(), document.body.classList.remove("is-starting");
        };
        window.addEventListener("logicweaver:intro-complete", a, { once: !0 }), i.mount(t);
      }
    }
    yn();
  },
  get enabled() {
    return z.enabled;
  },
  get finished() {
    return z.finished;
  }
});
function ha(e) {
  return ko = e, z.finished && e(z.forced), () => {
    ko === e && (ko = null);
  };
}
const vn = [
  { date: "今天", dayName: "周四", emoji: "🌤️", condition: "多云", highTemp: 26, lowTemp: 18, rainProb: 15 },
  { date: "明天", dayName: "周五", emoji: "⛅", condition: "阴天", highTemp: 24, lowTemp: 17, rainProb: 30 },
  { date: "后天", dayName: "周六", emoji: "🌧️", condition: "小雨", highTemp: 21, lowTemp: 16, rainProb: 75 },
  { date: "周日", dayName: "周日", emoji: "🌦️", condition: "阵雨", highTemp: 23, lowTemp: 15, rainProb: 45 },
  { date: "周一", dayName: "周一", emoji: "☀️", condition: "晴天", highTemp: 27, lowTemp: 18, rainProb: 10 },
  { date: "周二", dayName: "周二", emoji: "🌤️", condition: "多云", highTemp: 28, lowTemp: 19, rainProb: 15 },
  { date: "周三", dayName: "周三", emoji: "☀️", condition: "晴天", highTemp: 29, lowTemp: 20, rainProb: 5 }
], bn = "lw_weather_snapshot_v1";
function fa() {
  if (typeof window > "u" || typeof localStorage > "u") return null;
  try {
    const e = localStorage.getItem(bn);
    if (!e) return null;
    const t = JSON.parse(e);
    if (t && t.data && t.data.currentTemp !== void 0)
      return {
        state: "ready",
        city: t.city || t.data.cityName || "",
        data: t.data,
        forecastDays: Array.isArray(t.forecastDays) && t.forecastDays.length ? t.forecastDays : vn,
        detailInfo: t.detailInfo || null,
        updatedAt: t.savedAt || Date.now()
      };
  } catch {
  }
  return null;
}
function uo(e) {
  if (!(typeof window > "u" || typeof localStorage > "u"))
    try {
      e.data && localStorage.setItem(
        bn,
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
const ga = () => {
  const e = fa();
  return {
    state: e?.state || "loading",
    city: e?.city || "",
    errorMessage: "",
    data: e?.data || null,
    updatedAt: e?.updatedAt || null,
    forecastModalOpen: !1,
    forecastDays: e?.forecastDays || vn,
    detailInfo: e?.detailInfo || {
      humidity: "62%",
      wind: "东北风 2级",
      uvIndex: "中等 (4)",
      airQuality: "优 (32)"
    }
  };
}, R = fe(ga());
let Go = null, Uo = null;
const Xe = {
  get snapshot() {
    return Vt(R);
  },
  update(e) {
    Object.assign(R, e), uo(R);
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
    }), uo(R);
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
    })) : [], uo(R);
  },
  setDetailInfo(e) {
    R.detailInfo = { ...e }, uo(R);
  },
  applyCity(e) {
    typeof window < "u" && window.dispatchEvent(new CustomEvent("logicweaver:weather-city-selected", { detail: { city: e } })), this.refresh();
  },
  refresh() {
    Go ? Go() : typeof window < "u" && window.dispatchEvent(new CustomEvent("logicweaver:weather-refresh"));
  },
  changeLocation(e) {
    Uo ? Uo(e) : typeof window < "u" && window.dispatchEvent(new CustomEvent("logicweaver:weather-change-location", { detail: { clientX: e?.clientX, clientY: e?.clientY } }));
  },
  setRefreshAction(e) {
    Go = e;
  },
  setChangeLocationAction(e) {
    Uo = e;
  }
}, ma = () => ({
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
}), ce = fe(ma());
let Yo = null;
const Ot = {
  get snapshot() {
    return Vt(ce);
  },
  update(e) {
    Object.assign(ce, e);
  },
  updateTime(e, t, o, i) {
    ce.timeText = e, ce.secsText = t, ce.greetingText = o, ce.dateText = i, ce.updatedAt = Date.now();
  },
  applyConfig(e) {
    e.fontFamily !== void 0 && (ce.fontFamily = e.fontFamily), e.colorHex !== void 0 && (ce.colorHex = e.colorHex), e.greetColor !== void 0 && (ce.greetColor = e.greetColor), e.dateColor !== void 0 && (ce.dateColor = e.dateColor), e.isBlack !== void 0 && (ce.isBlack = e.isBlack), e.isCustomColor !== void 0 && (ce.isCustomColor = e.isCustomColor), ce.updatedAt = Date.now();
  },
  openSettings(e) {
    Yo ? Yo(e) : window.dispatchEvent(new CustomEvent("logicweaver:clock-open-settings", { detail: { clientX: e?.clientX, clientY: e?.clientY } }));
  },
  setOpenSettingsAction(e) {
    Yo = e;
  }
}, wa = [
  { id: "ai", title: "AI 助手" },
  { id: "todoist", title: "Todoist" },
  { id: "stickers", title: "表情包" },
  { id: "calcom", title: "预约" },
  { id: "wallpaper", title: "壁纸库" }
], ya = () => ({
  mounted: !1,
  visible: !1,
  items: [...wa]
}), qo = fe(ya());
let po = {};
const ki = {
  getSnapshot() {
    return Vt(qo);
  },
  update(e) {
    Object.assign(qo, e);
  },
  setMounted(e) {
    qo.mounted = e;
  },
  openWorkspace(e, t = !1) {
    if (po.open) {
      po.open(e);
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
    po = { ...po, ...e };
  }
}, Xo = fe({ visible: !1, pendingWrites: 0 });
async function va(e) {
  if (Xo.pendingWrites) throw new Error("壁纸操作正在处理，未自动排队");
  Xo.pendingWrites++;
  try {
    return await e();
  } finally {
    Xo.pendingWrites--;
  }
}
const Ni = {
  openDialog() {
    Ce.open("wallpaper");
  },
  closeDialog() {
    Ce.close("wallpaper");
  },
  resetDefault() {
    return va(() => Io.clearWallpaper());
  }
}, Oi = [
  { id: "mono", label: "极简等宽", font: "ui-monospace, 'SF Mono', 'JetBrains Mono', Menlo, Consolas, monospace", sample: "15:50:10" },
  { id: "sans", label: "现代无衬线", font: "-apple-system, BlinkMacSystemFont, 'Segoe UI Variable Display', 'Segoe UI', Roboto, 'PingFang SC', sans-serif", sample: "15:50:10" },
  { id: "din", label: "经典几何", font: "'DIN Alternate', 'DIN Pro', 'Franklin Gothic Medium', Futura, sans-serif", sample: "15:50:10" },
  { id: "digital", label: "数码管等宽", font: "'Courier New', Courier, monospace", sample: "15:50:10" },
  { id: "impact", label: "硬派力量", font: "Impact, 'Arial Black', 'Trebuchet MS', sans-serif", sample: "15:50:10" },
  { id: "serif", label: "典雅衬线", font: "'Playfair Display', Georgia, 'Times New Roman', serif", sample: "15:50:10" },
  { id: "rounded", label: "圆润亲和", font: "'Quicksand', 'Comic Sans MS', 'Segoe UI', sans-serif", sample: "15:50:10" }
], Ri = [
  { id: "white", label: "纯净皓白 (默认)", hex: "#ffffff" },
  { id: "black", label: "曜石极黑", hex: "#0f172a" },
  { id: "gold", label: "香槟金砂", hex: "#f59e0b" },
  { id: "cyan", label: "科技青蓝", hex: "#38bdf8" },
  { id: "emerald", label: "翡翠竹绿", hex: "#10b981" },
  { id: "rose", label: "淡雅樱粉", hex: "#fb7185" }
], Kh = [
  { id: "local", label: "📍 本地系统时区", offset: "Local" },
  { id: "Asia/Shanghai", label: "🇨🇳 北京 / 香港", offset: "UTC+8" },
  { id: "Asia/Tokyo", label: "🇯🇵 东京 / 首尔", offset: "UTC+9" },
  { id: "Europe/London", label: "🇬🇧 伦敦 / 格林威治", offset: "UTC+0/+1" },
  { id: "Europe/Paris", label: "🇫🇷 巴黎 / 柏林", offset: "UTC+1/+2" },
  { id: "America/New_York", label: "🇺🇸 纽约 / 东部时间", offset: "UTC-5/-4" },
  { id: "America/Los_Angeles", label: "🇺🇸 洛杉矶 / 西部时间", offset: "UTC-8/-7" },
  { id: "Australia/Sydney", label: "🇦🇺 悉尼", offset: "UTC+10/+11" },
  { id: "UTC", label: "🌐 协调世界时 (UTC)", offset: "UTC" }
], me = fe({
  mounted: !1,
  isOpen: !1,
  x: 200,
  y: 200,
  font: "mono",
  color: "white",
  timezone: "local"
});
let Jo = null;
const Ct = {
  state: me,
  setMounted(e) {
    me.mounted = e;
  },
  onAction(e) {
    Jo = e;
  },
  dispatch(e, t) {
    if (Jo)
      return Jo(e, t);
  },
  open(e) {
    const i = typeof window < "u" ? window.innerWidth : 1280, a = typeof window < "u" ? window.innerHeight : 800, r = e?.clientX ?? e?.x ?? i / 2, v = e?.clientY ?? e?.y ?? a / 2, k = Math.max(12, Math.min(r - 40, i - 290 - 12)), l = Math.max(12, Math.min(v + 10, a - 420 - 12));
    me.x = k, me.y = l, me.isOpen = !0, this.dispatch("open", { x: k, y: l });
  },
  close() {
    me.isOpen = !1, this.dispatch("close");
  },
  setFont(e) {
    me.font = e;
    const t = Oi.find((o) => o.id === e);
    if (t) {
      Ot.applyConfig({ fontFamily: t.font });
      try {
        localStorage.setItem("lw_clock_font", e);
      } catch {
      }
    }
    this.dispatch("change", { font: e, color: me.color, timezone: me.timezone });
  },
  setColor(e) {
    me.color = e;
    const t = Ri.find((o) => o.id === e);
    if (t) {
      Ot.applyConfig({
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
    this.dispatch("change", { font: me.font, color: e, timezone: me.timezone });
  },
  setTimezone(e) {
    me.timezone = e;
    try {
      localStorage.setItem("lw_clock_tz", e);
    } catch {
    }
    this.dispatch("change", { font: me.font, color: me.color, timezone: e });
  },
  initPreferences() {
    try {
      const e = localStorage.getItem("lw_clock_font");
      if (e) {
        me.font = e;
        const i = Oi.find((a) => a.id === e);
        i && Ot.applyConfig({ fontFamily: i.font });
      }
      const t = localStorage.getItem("lw_clock_color");
      if (t) {
        me.color = t;
        const i = Ri.find((a) => a.id === t);
        i && Ot.applyConfig({ colorHex: i.hex, greetColor: i.hex, dateColor: i.hex, isCustomColor: !0 });
      }
      const o = localStorage.getItem("lw_clock_tz");
      o && (me.timezone = o);
    } catch {
    }
  },
  syncConfig(e) {
    e.font && (me.font = e.font), e.color && (me.color = e.color), e.timezone && (me.timezone = e.timezone);
  }
}, oe = fe({
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
let Qo = null, xo = !1;
async function Co(e, t = {}) {
  if (e === "poll") return { state: "ready", model: oe.model };
  if (e === "connect") return { state: "ready", model: oe.model };
  throw new Error("旧版 AI 对话桥接已退役，请使用「海狸聊天室」开启智能会话。");
}
function kn(e) {
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
  o || (e.state === "connecting" ? o = "正在连接本机 Codex 与 ChatGPT…" : e.state === "disconnected" ? o = "已待命（打开面板自动连接）" : e.authenticated ? o = `就绪 · ChatGPT ${e.plan || "已登录"}` : e.state === "ready" ? o = "就绪 · 尚未登录 ChatGPT" : o = t[e.state] || e.state), oe.statusText = o, oe.authHidden = !e.loginUrl, oe.authCode = e.loginCode || "", oe.authLink = e.loginUrl || "https://auth.openai.com/codex/device", oe.isStreaming = xo || e.busy || e.state === "running";
}
async function ba() {
  try {
    const e = await Co("poll");
    kn(e);
  } catch {
  }
}
async function ka(e, t) {
  if (e === "open" || e === "connect")
    try {
      oe.statusText = "正在连接本机 Codex 与 ChatGPT…";
      const o = await Co("connect");
      kn(o);
    } catch (o) {
      oe.statusText = o?.message || "连接失败";
    }
  else if (e === "send" && t?.text) {
    const o = t.text;
    oe.messages.push({
      id: `msg-${Date.now()}`,
      role: "user",
      content: o
    }), oe.inputText = "", oe.isStreaming = !0, xo = !0;
    try {
      await Co("send", { text: o }), await ba();
    } catch (i) {
      oe.statusText = i?.message || "发送失败";
    } finally {
      xo = !1, oe.isStreaming = !1;
    }
  } else if (e === "stop") {
    try {
      await Co("stop");
    } catch {
    }
    oe.isStreaming = !1, xo = !1;
  }
}
const _i = {
  state: oe,
  setMounted(e) {
    oe.mounted = e;
  },
  onAction(e) {
    Qo = e;
  },
  dispatch(e, t) {
    if (Qo)
      return Qo(e, t);
    ka(e, t);
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
}, Zo = fe({
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
}), ho = /* @__PURE__ */ new Set(), _a = {
  state: Zo,
  open(e) {
    Object.assign(Zo, e, { open: !0 });
  },
  update(e) {
    Object.assign(Zo, e);
  },
  close() {
    ho.forEach((e) => e("close"));
  },
  save(e) {
    ho.forEach((t) => t("save", e));
  },
  onAction(e) {
    return ho.add(e), () => ho.delete(e);
  }
}, Lo = fe({ isOpen: !1 }), _n = {
  state: Lo,
  open() {
    Lo.isOpen = !0;
  },
  close() {
    Lo.isOpen = !1;
  }
}, ei = "biliProfileCacheV1", lt = "biliLocallyKnownMessageIdsV1", fo = "biliMessageUserCacheV1", Yt = "githubKnownReleaseVersionsV1", go = "customNewtabAvatar", Bi = "biliToastKnownCountsV1";
class xa {
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
    !t?.repository || !t?.version || (this.githubKnownVersions[t.repository] = t.version, typeof chrome < "u" && chrome?.storage?.local && await chrome.storage.local.set({ [Yt]: this.githubKnownVersions }), this.notifyGitHubListeners());
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
      let v = Array.isArray(this.locallyKnownIds?.[a]) ? this.locallyKnownIds[a] : [];
      r < v.length && (v = [], this.locallyKnownIds[a] = [], o = !0), t[a] = Math.max(0, r - v.length);
    }), o && typeof chrome < "u" && chrome?.storage?.local && chrome.storage.local.set({ [lt]: this.locallyKnownIds }).catch(() => {
    }), t;
  }
  markKnown(t, o, i) {
    this.locallyKnownIds[t] || (this.locallyKnownIds[t] = []);
    let a = !1;
    o && !this.locallyKnownIds[t].includes(o) && (this.locallyKnownIds[t].push(o), a = !0), i && !this.locallyKnownIds[t].includes(i) && (this.locallyKnownIds[t].push(i), a = !0), a && typeof chrome < "u" && chrome?.storage?.local && chrome.storage.local.set({ [lt]: this.locallyKnownIds }).catch(() => {
    }), this.applyBiliProfile(this.profile, this.unread);
  }
  markAllKnown(t, o = []) {
    this.locallyKnownIds[t] || (this.locallyKnownIds[t] = []);
    const i = new Set(this.locallyKnownIds[t]);
    for (const r of o) r && i.add(r);
    const a = Math.max(0, Number(this.unread?.[t] || 0));
    if (i.size < a) {
      const r = a - i.size;
      for (let v = 0; v < r; v++) i.add(`__pad_${Date.now()}_${v}`);
    }
    this.locallyKnownIds[t] = Array.from(i), typeof chrome < "u" && chrome?.storage?.local && chrome.storage.local.set({ [lt]: this.locallyKnownIds }).catch(() => {
    }), this.applyBiliProfile(this.profile, this.unread);
  }
  applyBiliProfile(t, o = {}) {
    this.profile = t || null, this.unread = o || {};
    const a = this.customAvatar || String(t?.face || "assets/bilibili.svg").replace(/^http:/, "https:"), r = this.getVisibleUnread();
    if (lo.avatarUrl = a, lo.userName = t?.uname || "哔哩哔哩用户", lo.buttonTitle = "通知中心", Vo.avatarUrl = a, Vo.userName = t?.uname || "用户", Vo.mid = t?.mid, typeof document < "u") {
      const v = document.getElementById("bili-profile-avatar");
      v && (v.src = a);
      const k = document.getElementById("bili-profile-button");
      k && (k.title = lo.buttonTitle);
    }
    kt.updateState({
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
        }, [a, r, v] = await Promise.allSettled([
          fetch("https://api.bilibili.com/x/msgfeed/unread?build=0&mobi_app=web", { credentials: "include" }).then(($) => $.json()),
          fetch("https://api.vc.bilibili.com/x/im/web/msgfeed/unread", { credentials: "include" }).then(($) => $.json()),
          fetch("https://api.vc.bilibili.com/session_svr/v1/session_svr/single_unread", { credentials: "include" }).then(($) => $.json())
        ]), k = a.status === "fulfilled" ? a.value?.data || {} : {}, l = r.status === "fulfilled" ? r.value?.data || {} : {}, _ = v.status === "fulfilled" ? v.value?.data || {} : {}, I = Number(l.at || 0), A = l.reply != null ? Number(l.reply || 0) : Math.max(0, Number(l.recv_reply || 0) - I), f = {
          reply: Math.max(Number(k.reply || 0), A),
          at: Math.max(Number(k.at || 0), I),
          like: Math.max(
            Number(k.like || k.praise || 0),
            Number(l.like || l.recv_like || 0)
          ),
          system: Math.max(Number(k.sys_msg || k.system || 0), Number(l.sys_msg || 0)),
          private: Number(
            k.chat || l.chat || Number(_.follow_unread || 0) + Number(_.unfollow_unread || 0) + Number(_.dustbin_push_msg || 0)
          )
        };
        this.applyBiliProfile(i, f), typeof chrome < "u" && chrome?.storage?.local && await chrome.storage.local.set({ [ei]: { profile: i, unread: f, savedAt: Date.now() } }), this.checkAndNotifyBiliInteractions(f);
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
      this.biliToastKnownCounts = { ...o }, typeof chrome < "u" && chrome?.storage?.local && chrome.storage.local.set({ [Bi]: this.biliToastKnownCounts }).catch(() => {
      });
      return;
    }
    const i = o.private - Number(this.biliToastKnownCounts.private || 0);
    o.like - Number(this.biliToastKnownCounts.like || 0);
    const a = o.reply - Number(this.biliToastKnownCounts.reply || 0), r = o.at - Number(this.biliToastKnownCounts.at || 0);
    o.system - Number(this.biliToastKnownCounts.system || 0), this.biliToastKnownCounts = { ...o }, typeof chrome < "u" && chrome?.storage?.local && chrome.storage.local.set({ [Bi]: this.biliToastKnownCounts }).catch(() => {
    }), i > 0 && ue.show({
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
        kt.openPanel();
      }
    }), a > 0 && ue.show({
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
        kt.openPanel();
      }
    }), r > 0 && ue.show({
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
        kt.openPanel();
      }
    });
  }
  init() {
    this.initialized || (this.initialized = !0, Wo.setActions({
      onAction: async (t) => {
        if (t === "messages")
          no.open();
        else if (t === "tabs")
          _n.open();
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
      ei,
      lt,
      fo,
      Yt,
      go
    ]).then((t) => {
      this.customAvatar = t[go] || "", this.locallyKnownIds = t[lt] && typeof t[lt] == "object" ? t[lt] : {}, this.userCache = t[fo] && typeof t[fo] == "object" ? t[fo] : {}, this.githubKnownVersions = t[Yt] && typeof t[Yt] == "object" ? t[Yt] : {};
      const o = t[ei];
      o?.profile ? this.applyBiliProfile(o.profile, o.unread || {}) : this.applyBiliProfile(null, {});
    }).catch(() => {
    }), chrome.storage.onChanged && chrome.storage.onChanged.addListener((t, o) => {
      o === "local" && (t[go] && (this.customAvatar = t[go].newValue || "", this.applyBiliProfile(this.profile, this.unread)), t[lt] && (this.locallyKnownIds = t[lt].newValue || {}, this.applyBiliProfile(this.profile, this.unread)));
    })), kt.onAction((t, o) => {
      t === "mark-known" ? this.markKnown(o.kind, o.id, o.talkerId) : t === "mark-all-known" && this.markAllKnown(o.kind, o.ids);
    }), this.refreshBiliProfile(), setTimeout(() => {
      this.loadGitHubUpdates();
    }, 3500));
  }
}
const Hi = new xa(), ie = fe({ open: !1, loading: !1, error: "", mid: "", name: "", face: "", sign: "", followed: !1, submitting: !1, left: 12, top: 12, videos: [] });
let mo = null;
const So = {
  state: ie,
  open(e, t) {
    mo = t, Object.assign(ie, { open: !0, loading: !0, error: "", submitting: !1, videos: [] }, e);
  },
  update(e) {
    Object.assign(ie, e);
  },
  close() {
    ie.submitting || (ie.open = !1, mo = null);
  },
  async toggleFollow() {
    if (!(!mo || ie.submitting)) {
      ie.submitting = !0;
      try {
        const e = !ie.followed;
        await mo(e) && (ie.followed = e);
      } finally {
        ie.submitting = !1;
      }
    }
  }
}, xn = {}, Fi = /* @__PURE__ */ new Set();
function Cn() {
  return new Proxy(xn, {
    get(e, t) {
      return t === "get" ? (o) => e[o] : t === "list" ? () => {
        const o = {};
        for (const [i, a] of Object.entries(e))
          o[i] = a?.state ?? a;
        return o;
      } : t === "snapshot" ? () => {
        const o = {};
        for (const [i, a] of Object.entries(e)) {
          const r = a?.history || [];
          o[i] = {
            state: a?.state ?? a,
            historyLength: r.length,
            lastTransition: r.length ? r[r.length - 1] : void 0
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
        for (const [i, a] of Object.entries(e)) {
          const r = a?.history || [];
          o.machines[i] = {
            state: a?.state ?? a,
            historyCount: r.length,
            history: [...r]
          };
        }
        return o;
      } : t === "subscribeAll" ? (o) => (Fi.add(o), () => {
        Fi.delete(o);
      }) : e[t];
    }
  });
}
function ji(e, t) {
  xn[e] = t, typeof window < "u" && (window.__TAB_MACHINES__ = Cn());
}
function Ca() {
  return Cn();
}
const pi = () => ({
  icon: "🧭",
  title: "快捷轮盘",
  desc: "移动鼠标选择",
  active: !1
}), xi = () => ({
  visible: !1,
  wedgePath: "",
  arcPath: "",
  line1: { x1: 0, y1: 0, x2: 0, y2: 0 },
  line2: { x1: 0, y1: 0, x2: 0, y2: 0 }
}), K = fe({
  mounted: !1,
  isOpen: !1,
  isExpanded: !1,
  mode: "main",
  ballPosition: { x: 0, y: 0 },
  hub: pi(),
  activeSectorId: null,
  sectors: [],
  beam: xi()
});
let Vi = null;
function La(e, t) {
  if (typeof e != "number" || !t)
    return xi();
  const o = 160, i = 160, a = 26, r = 154, v = 360 / t, k = e - v / 2, l = e + v / 2, _ = k * Math.PI / 180, I = l * Math.PI / 180, A = o + a * Math.cos(_), f = i + a * Math.sin(_), $ = o + r * Math.cos(_), g = i + r * Math.sin(_), p = o + a * Math.cos(I), b = i + a * Math.sin(I), L = o + r * Math.cos(I), D = i + r * Math.sin(I), S = v > 180 ? 1 : 0, O = `M ${A.toFixed(1)} ${f.toFixed(1)} L ${$.toFixed(1)} ${g.toFixed(1)} A ${r} ${r} 0 ${S} 1 ${L.toFixed(1)} ${D.toFixed(1)} L ${p.toFixed(1)} ${b.toFixed(1)} A ${a} ${a} 0 ${S} 0 ${A.toFixed(1)} ${f.toFixed(1)} Z`, V = `M ${$.toFixed(1)} ${g.toFixed(1)} A ${r} ${r} 0 ${S} 1 ${L.toFixed(1)} ${D.toFixed(1)}`;
  return {
    visible: !0,
    wedgePath: O,
    arcPath: V,
    line1: {
      x1: parseFloat(A.toFixed(1)),
      y1: parseFloat(f.toFixed(1)),
      x2: parseFloat($.toFixed(1)),
      y2: parseFloat(g.toFixed(1))
    },
    line2: {
      x1: parseFloat(p.toFixed(1)),
      y1: parseFloat(b.toFixed(1)),
      x2: parseFloat(L.toFixed(1)),
      y2: parseFloat(D.toFixed(1))
    }
  };
}
const we = {
  get state() {
    return K;
  },
  getSnapshot() {
    return Vt(K);
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
    } : K.hub = pi();
  },
  setBeam(e, t) {
    K.beam = La(e, t);
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
    K.isExpanded = !1, K.mode = "main", K.activeSectorId = null, K.beam = xi(), K.hub = pi();
  },
  setWheelMode(e) {
    K.mode = e;
  },
  setActionHandler(e) {
    Vi = e;
  },
  dispatch(e, t) {
    Vi?.(e, t);
  }
}, Ln = [
  { id: "daily-bilibili", title: "b站插件", desc: "B站收藏夹与追番视频", icon: "assets/bilibili.svg" },
  { id: "daily-aihot", title: "ai hot插件", desc: "全网 AI 与前沿科技资讯", icon: "assets/nav-aihot.svg" },
  { id: "folder", title: "常用网站", desc: "点击展开快捷网站子轮盘", icon: "assets/nav-folder.svg", mode: "shortcuts" },
  { id: "card-github", title: "github插件", desc: "GitHub 趋势与星标项目", icon: "assets/nav-github.svg" },
  { id: "launcher", title: "首页", desc: "返回主屏常用应用台", icon: "assets/nav-home.svg" }
];
function Sa() {
  return Ln.filter((e) => e.mode || e.id === "launcher" || Ao(e.id));
}
function Ta() {
  return Ds.filter((e) => e.kind === "module" && Ao(e.id)).map((e) => ({
    id: e.id,
    title: e.title,
    desc: e.isDev ? "已启用的实验性组件" : e.categoryLabel,
    icon: e.icon || e.emoji || "🧩",
    tool: e.id
  }));
}
function Ki() {
  K.isExpanded && Qe();
}
let hi = [], oo = Ln, dt = { x: 400, y: 300 }, Sn = !1, qt = !1, ti = null, Xt = null, Je = !1;
const $a = fe(/* @__PURE__ */ new Set()), Ma = /* @__PURE__ */ new Map();
function wt() {
  return globalThis.chrome?.storage;
}
function Tn(e, t) {
  const o = K.isExpanded ? 160 : 24;
  we.setBallPosition(
    Math.max(o + 8, Math.min(window.innerWidth - o - 8, e)),
    Math.max(o + 8, Math.min(window.innerHeight - o - 8, t))
  );
}
function Qe() {
  const e = K.mode;
  let t = [];
  e === "shortcuts" && (t = [...hi], t.push({
    id: "toggle-edit-shortcuts",
    title: Je ? d("navwheel.finishEdit") : d("navwheel.editSites"),
    desc: Je ? d("navwheel.finishEditDesc") : d("navwheel.editSitesDesc"),
    icon: Je ? "✅" : "✏️"
  })), oo = e === "tools" ? Ta() : e === "shortcuts" ? [
    ...t,
    { id: "back-to-main", title: d("navwheel.back"), desc: d("navwheel.backDesc"), icon: "🔙", mode: "main" }
  ] : Sa();
  const o = oo.length, i = o > 12 ? 118 : o > 9 ? 114 : 110, a = o > 12 ? 46 : o > 9 ? 50 : 56;
  we.setSectors(oo.map((r, v) => {
    const k = -90 + 360 / o * v, l = k * Math.PI / 180;
    return {
      id: r.id,
      title: r.title,
      desc: r.desc,
      icon: r.icon,
      angleDeg: k,
      x: Math.round(160 + Math.cos(l) * i),
      y: Math.round(160 + Math.sin(l) * i),
      size: a,
      isShortcut: !!r.url
    };
  })), we.setWheelMode(e), we.setActiveSector(null), we.setBeam(null, 0), we.setHub(e === "shortcuts" ? Je ? { icon: "✏️", title: d("navwheel.editing") } : { icon: "🔙", title: d("navwheel.shortcuts") } : e === "tools" ? { icon: "🧰", title: d("navwheel.tools") } : null);
}
function Do(e) {
  K.mode = e, Qe();
}
function Lt() {
  we.collapse(), Tn(K.ballPosition.x, K.ballPosition.y), we.setVisibility(Sn);
}
function Dt(e = K.ballPosition.x, t = K.ballPosition.y, o = "main") {
  we.expand(void 0, void 0, o), Tn(e, t), Qe(), we.setVisibility(!0);
}
function Ia(e) {
  if (e.id === "toggle-edit-shortcuts") {
    $n();
    return;
  }
  if (Je && e.url) {
    ue.show({
      appName: d("navwheel.appName"),
      title: d("navwheel.editingNotice"),
      message: d("navwheel.editingHint"),
      duration: 2500
    });
    return;
  }
  if (!(e.tool && !Ao(e.tool) || !e.url && !e.mode && e.id !== "launcher" && !Ao(e.id))) {
    if (e.mode) {
      Do(e.mode);
      return;
    }
    if (Lt(), e.url) {
      window.open(e.url, "_blank");
      return;
    }
    if (e.tool) {
      window.triggerToolShortcut?.(e.tool);
      return;
    }
    e.id === "launcher" ? (typeof window < "u" && window.scrollTo({ top: 0, left: 0, behavior: "instant" }), xt.exit(), document.body && (document.body.dataset.page = "home")) : xt.enter(e.id);
  }
}
function $n() {
  Je = !Je, Je ? (ue.show({
    appName: d("navwheel.appName"),
    title: d("navwheel.enterEditMode"),
    message: d("navwheel.editModeDesc"),
    duration: 5e3
  }), Qe()) : (ue.show({
    appName: d("navwheel.appName"),
    title: d("navwheel.editDone"),
    message: d("navwheel.editSaved"),
    duration: 2e3
  }), Qe());
}
async function Aa(e) {
  if (!Je || !e || !e.url) return !1;
  try {
    const t = await wt()?.local?.get(["siteShelfLinks", "logicweaverNavWheelShortcutsV1"]), o = Array.isArray(t?.siteShelfLinks) ? t.siteShelfLinks : Array.isArray(t?.logicweaverNavWheelShortcutsV1) ? t.logicweaverNavWheelShortcutsV1 : [], i = o.findIndex((v) => v.url === e.url);
    if (i >= 0) {
      const v = o.filter((k, l) => l !== i);
      return await wt()?.local?.set({ siteShelfLinks: v, logicweaverNavWheelShortcutsV1: v }), await De.loadShortcuts(), Qe(), ue.show({
        appName: d("navwheel.appName"),
        title: d("navwheel.removedNotice"),
        message: d("navwheel.removedSite", { name: e.title || e.url }),
        duration: 2e3
      }), !0;
    }
    if (o.length >= 12)
      return ue.show({
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
    return await wt()?.local?.set({ siteShelfLinks: r, logicweaverNavWheelShortcutsV1: r }), await De.loadShortcuts(), Qe(), ue.show({
      appName: d("navwheel.appName"),
      title: d("navwheel.addedTitle"),
      message: d("navwheel.addedNotice", { name: a.title }),
      duration: 2500
    }), !0;
  } catch (t) {
    return console.warn("[NavWheel] 即时处理快捷方式失败", t), !1;
  }
}
async function Ea(e) {
  try {
    const t = await wt()?.local?.get(["siteShelfLinks", "logicweaverNavWheelShortcutsV1"]), o = Array.isArray(t?.siteShelfLinks) ? t.siteShelfLinks : Array.isArray(t?.logicweaverNavWheelShortcutsV1) ? t.logicweaverNavWheelShortcutsV1 : [], i = o.find((r) => String(r.id) === String(e)), a = o.filter((r) => String(r.id) !== String(e));
    await wt()?.local?.set({ siteShelfLinks: a, logicweaverNavWheelShortcutsV1: a }), await De.loadShortcuts(), Qe(), i && ue.show({
      appName: d("navwheel.appName"),
      title: d("navwheel.removedNotice"),
      message: d("navwheel.removedSite", { name: i.title || d("navwheel.site") }),
      duration: 2500
    });
  } catch (t) {
    console.warn("[NavWheel] 删除快捷方式失败", t);
  }
}
function zi(e) {
  dt = { x: e.clientX, y: e.clientY };
}
function Gi(e) {
  e.button === 1 && (e.preventDefault(), e.stopPropagation(), dt = { x: e.clientX, y: e.clientY }, K.isExpanded ? Lt() : Dt(e.clientX, e.clientY));
}
function Ui(e) {
  e.button === 1 && e.preventDefault();
}
function Yi(e) {
  if (e.key === "Escape") {
    if (Je) {
      e.preventDefault(), e.stopPropagation(), Je = !1, $a.clear(), Ma.clear(), Qe(), ue.show({
        appName: d("navwheel.appName"),
        title: d("navwheel.exitedEditing"),
        duration: 1500
      });
      return;
    }
    if (!K.isExpanded || vi.active) return;
    e.preventDefault(), e.stopPropagation(), K.mode === "shortcuts" ? Do("main") : Lt();
  }
}
function Da(e) {
  try {
    const t = globalThis.chrome;
    if (typeof t?.runtime?.getURL == "function")
      return t.runtime.getURL("_favicon/?pageUrl=" + encodeURIComponent(e) + "&size=64");
  } catch {
  }
  return "";
}
function Pa(e) {
  const t = e.customIcon || e.icon;
  if (t && typeof t == "string" && !/google\.com\/s2\/favicons|icons\.duckduckgo/i.test(t))
    return t;
  if (e.url) {
    const o = $e.getCachedIcon(e.url);
    if (o) return o;
    const i = Da(e.url);
    if (i) return i;
  }
  return e.icon || "🔗";
}
const De = {
  async start() {
    if (!qt) {
      qt = !0, ti = tt(et, () => {
        K.isExpanded && Qe();
      }), dt = { x: Math.round(window.innerWidth / 2), y: Math.round(window.innerHeight / 2) }, we.setActionHandler((e, t) => {
        if (e === "hub:click")
          K.isExpanded ? K.mode === "shortcuts" ? Do("main") : Lt() : Dt();
        else if (e === "sector:click" || e === "container:click") {
          const o = oo.find((i) => i.id === t?.id || e === "container:click" && i.id === K.activeSectorId);
          o && Ia(o);
        } else if (e === "sector:hover") {
          const o = K.sectors.find((i) => i.id === t?.id);
          o && (we.setHub({ icon: o.icon, title: o.title, desc: o.desc, active: !0 }), we.setActiveSector(o.id), we.setBeam(o.angleDeg, oo.length));
        } else e === "sector:leave" && (we.setActiveSector(null), we.setBeam(null, 0), we.setHub(K.mode === "shortcuts" ? { icon: "🔙", title: d("navwheel.shortcuts") } : K.mode === "tools" ? { icon: "🧰", title: d("navwheel.tools") } : null));
      }), window.addEventListener("logicweaver:dock-modules-changed", Ki), window.addEventListener("pointermove", zi, { passive: !0 }), window.addEventListener("mousedown", Gi, !0), window.addEventListener("auxclick", Ui, !0), window.addEventListener("keydown", Yi, !0), Xt = (e, t) => {
        t === "local" && (e.siteShelfLinks || e.logicweaverNavWheelShortcutsV1) && this.loadShortcuts();
      }, wt()?.onChanged?.addListener(Xt);
      try {
        if (!qt) return;
        Sn = !1, we.setVisibility(!1);
      } catch {
      }
      await this.loadShortcuts(), Qe();
    }
  },
  stop() {
    qt = !1, ti?.(), ti = null, we.setActionHandler(null), window.removeEventListener("logicweaver:dock-modules-changed", Ki), window.removeEventListener("pointermove", zi), window.removeEventListener("mousedown", Gi, !0), window.removeEventListener("auxclick", Ui, !0), window.removeEventListener("keydown", Yi, !0), Xt && wt()?.onChanged?.removeListener(Xt), Xt = null;
  },
  async loadShortcuts() {
    try {
      const e = await wt()?.local?.get(["siteShelfLinks", "logicweaverNavWheelShortcutsV1"]);
      if (!qt) return;
      const t = e?.siteShelfLinks?.length ? e.siteShelfLinks : e?.logicweaverNavWheelShortcutsV1;
      hi = (Array.isArray(t) ? t : []).map((o, i) => ({
        id: String(o.id || `wheel-${i}`),
        title: String(o.title || o.url || d("navwheel.site")),
        desc: String(o.url || ""),
        url: String(o.url || ""),
        icon: Pa(o)
      })), K.mode === "shortcuts" && Qe();
    } catch (e) {
      console.warn("[NavWheel] 读取快捷方式失败", e);
    }
  },
  open(e, t) {
    Dt(e ?? dt.x, t ?? dt.y);
  },
  close: Lt,
  get isEditingShortcuts() {
    return Je;
  },
  isLinkInWheel(e) {
    return e ? hi.some((t) => t.url === e) : !1;
  },
  toggleEditingShortcuts: $n,
  handleLinkSelection: Aa,
  removeShortcut: Ea,
  toggle(e = !1) {
    K.isExpanded ? Lt() : e ? Dt(dt.x, dt.y) : Dt();
  },
  toggleTools(e = !0) {
    K.isExpanded && K.mode === "tools" ? Lt() : Dt(
      e ? dt.x : K.ballPosition.x,
      e ? dt.y : K.ballPosition.y,
      "tools"
    );
  },
  setMode(e) {
    Do(e);
  }
};
class Rt {
  constructor() {
    this.activeShortcuts = { ...Ko }, this.isListenerBound = !1, this.storageListenerBound = !1, this.shortcutReadVersion = 0, this.initShortcuts();
  }
  static getInstance() {
    return Rt.instance || (Rt.instance = new Rt()), Rt.instance;
  }
  getShortcuts() {
    return { ...this.activeShortcuts };
  }
  async setShortcut(t, o) {
    if (typeof t != "string" || !t || typeof o != "string")
      throw new Error("快捷键参数无效，未保存");
    if (typeof chrome > "u" || !chrome.storage?.local)
      throw new Error("快捷键存储不可用，未保存");
    const { optionsService: i, SHORTCUT_STORAGE_KEY: a } = await import("./options.service-BdcvCKuT.js").then((I) => I.b), v = (await chrome.storage.local.get(a))[a], k = { ...v || {}, [t]: o }, l = this.shortcutReadVersion, _ = await i.saveSettings(
      { [a]: k },
      { [a]: v }
    );
    l === this.shortcutReadVersion && (++this.shortcutReadVersion, this.applyShortcutOverrides(_[a]));
  }
  applyShortcutOverrides(t) {
    const o = t && typeof t == "object" && !Array.isArray(t) ? Object.entries(t).filter((i) => Object.prototype.hasOwnProperty.call(Ko, i[0]) && typeof i[1] == "string") : [];
    this.activeShortcuts = { ...Ko, ...Object.fromEntries(o) };
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
    if (!t || !Ai(t)) return !1;
    if (je(t))
      return Ce.handleToolClick(t), !0;
    switch (t) {
      case "bookmarks":
        return No.toggle(), !0;
      case "settings":
        return ao.open(), !0;
      case "nav-wheel":
        return De.toggle(!0), !0;
      case "toolbox":
        return De.toggleTools(!0), !0;
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
        if (vi.active || t.defaultPrevented || t.isComposing || t.repeat || t.target && (t.target.matches("input, textarea, select") || t.target.isContentEditable) && !t.altKey && !t.ctrlKey && !t.metaKey)
          return;
        const i = Ps(t);
        if (!i) return;
        const a = i.toLowerCase();
        for (const [r, v] of Object.entries(this.activeShortcuts))
          if (!(!v || !Ai(r)) && v.toLowerCase().replace(/^cmd\+/, "meta+") === a) {
            t.preventDefault(), t.stopPropagation(), this.triggerToolShortcut(r);
            break;
          }
      },
      !0
    ));
  }
}
const fi = Rt.getInstance();
class Bt {
  constructor() {
    this._isVisible = q(typeof document < "u" ? !document.hidden : !0), this.callbacks = /* @__PURE__ */ new Set(), this.activeIntervals = /* @__PURE__ */ new Set(), typeof document < "u" && document.addEventListener("visibilitychange", () => {
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
    return Bt.instance || (Bt.instance = new Bt()), Bt.instance;
  }
  get isVisible() {
    return Vt(this._isVisible);
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
const Wa = Bt.getInstance(), qi = [
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
function wo(e) {
  return e === 0 ? { emoji: "☀️", label: d("weather.condition.clear") } : e <= 2 ? { emoji: "🌤️", label: d("weather.condition.mainlyClear") } : e === 3 ? { emoji: "☁️", label: d("weather.condition.cloudy") } : e === 45 || e === 48 ? { emoji: "🌫️", label: d("weather.condition.fog") } : e >= 51 && e <= 57 ? { emoji: "🌦️", label: d("weather.condition.drizzle") } : e >= 61 && e <= 67 ? { emoji: "🌧️", label: d("weather.condition.rain") } : e >= 71 && e <= 77 ? { emoji: "🌨️", label: d("weather.condition.snow") } : e >= 80 && e <= 82 ? { emoji: "🌧️", label: d("weather.condition.rainShower") } : e >= 85 && e <= 86 ? { emoji: "🌨️", label: d("weather.condition.snowShower") } : e >= 95 ? { emoji: "⛈️", label: d("weather.condition.thunderstorm") } : { emoji: "🌡️", label: d("weather.condition.unknown") };
}
class Ht {
  constructor() {
    this.currentCity = "武汉", this.isRefreshing = !1, this.activeRequestId = 0, this.lastRawForecastData = null, this.initStorage();
  }
  static getInstance() {
    return Ht.instance || (Ht.instance = new Ht()), Ht.instance;
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
    const a = wo(i.current?.weather_code ?? 0), r = Math.round(i.current?.temperature_2m ?? 0), v = i.hourly?.time || [], k = Date.now();
    let l = v.findIndex((S) => new Date(S).getTime() >= k);
    l < 0 && (l = 0);
    const _ = [];
    for (let S = l; S < Math.min(l + 5, v.length); S++) {
      const O = S === l ? d("weather.now") : d("weather.hourSuffix", { hour: new Date(v[S]).getHours() }), V = wo(i.hourly.weather_code[S]), se = Math.round(i.hourly.temperature_2m[S]);
      _.push({ time: O, emoji: V.emoji, temp: se });
    }
    let I = d("weather.noRain12h");
    for (let S = l; S < Math.min(l + 12, v.length); S++) {
      const O = i.hourly.weather_code[S], V = i.hourly.precipitation_probability?.[S] || 0;
      if (O >= 51 || V >= 60) {
        const se = new Date(v[S]).getHours(), w = O >= 71 && O <= 77 || O === 85 || O === 86 ? d("weather.snow") : d("weather.rain"), C = V ? ` (${V}%)` : "";
        I = d("weather.expectPrecip", { time: `${se}:00`, type: w, prob: C });
        break;
      }
    }
    const A = [d("weather.today"), d("weather.tomorrow"), d("weather.afterTomorrow")], f = [], $ = i.daily?.time?.length || 0;
    for (let S = 1; S < Math.min(3, $); S++) {
      const O = A[S] || d("weather.plusDays", { count: S }), V = wo(i.daily.weather_code[S]), se = `${Math.round(i.daily.temperature_2m_max[S])}°/${Math.round(i.daily.temperature_2m_min[S])}°`;
      f.push({ label: O, emoji: V.emoji, tempRange: se });
    }
    const g = Math.round(i.daily?.temperature_2m_max?.[0] ?? r), p = Math.round(i.daily?.temperature_2m_min?.[0] ?? r), b = d("weather.tempRange", { cond: a.label, max: g, min: p }), L = {
      cityName: o.name || t,
      currentEmoji: a.emoji,
      currentTemp: r,
      subText: b,
      rainText: I,
      hours: _,
      days: f
    };
    if (Xe.ready(L, t), i.daily?.time) {
      const S = [
        d("weather.weekday.sun"),
        d("weather.weekday.mon"),
        d("weather.weekday.tue"),
        d("weather.weekday.wed"),
        d("weather.weekday.thu"),
        d("weather.weekday.fri"),
        d("weather.weekday.sat")
      ], O = [];
      for (let V = 0; V < i.daily.time.length; V++) {
        const se = new Date(i.daily.time[V]), T = V === 0 ? d("weather.today") : V === 1 ? d("weather.tomorrow") : V === 2 ? d("weather.afterTomorrow") : S[se.getDay()], w = wo(i.daily.weather_code[V]);
        O.push({
          date: `${se.getMonth() + 1}/${se.getDate()}`,
          dayName: T,
          emoji: w.emoji,
          condition: w.label,
          highTemp: Math.round(i.daily.temperature_2m_max[V]),
          lowTemp: Math.round(i.daily.temperature_2m_min[V]),
          rainProb: i.daily.precipitation_probability_max?.[V] || 0
        });
      }
      Xe.setForecastDays(O);
    }
    const D = {
      humidity: i.current?.relative_humidity_2m ? `${i.current.relative_humidity_2m}%` : "60%",
      wind: i.current?.wind_speed_10m ? `${Math.round(i.current.wind_speed_10m)} km/h` : d("weather.detail.windLight"),
      uvIndex: d("weather.detail.uvNormal"),
      airQuality: d("weather.detail.airGood")
    };
    Xe.setDetailInfo(D);
  }
  filterCities(t, o = 8) {
    const i = t.trim().toLowerCase();
    if (!i) return qi.slice(0, o);
    const a = [];
    for (const r of qi) {
      const v = r.name.toLowerCase(), k = r.pinyin.toLowerCase(), l = r.admin.toLowerCase();
      if ((v.startsWith(i) || k.startsWith(i) || v.includes(i) || k.includes(i) || l.includes(i)) && a.push(r), a.length >= o) break;
    }
    return a;
  }
  async loadWeather(t) {
    const o = (t || this.currentCity || "").trim();
    if (!o) {
      Xe.unconfigured();
      return;
    }
    if (this.isRefreshing) return;
    this.isRefreshing = !0;
    const i = ++this.activeRequestId;
    Xe.loading(o);
    try {
      const a = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(o)}&count=1&language=zh&format=json`, r = await fetch(a);
      if (i !== this.activeRequestId || R.state === "unconfigured") {
        this.isRefreshing = !1;
        return;
      }
      const k = (await r.json()).results?.[0];
      if (!k) {
        i === this.activeRequestId && R.state !== "unconfigured" && Xe.notFound(o), this.isRefreshing = !1;
        return;
      }
      const l = `https://api.open-meteo.com/v1/forecast?latitude=${k.latitude}&longitude=${k.longitude}&current=temperature_2m,weather_code,relative_humidity_2m,wind_speed_10m&hourly=temperature_2m,weather_code,precipitation_probability&daily=temperature_2m_max,temperature_2m_min,weather_code,precipitation_probability_max&forecast_days=7&timezone=auto`, _ = await fetch(l);
      if (i !== this.activeRequestId || R.state === "unconfigured") {
        this.isRefreshing = !1;
        return;
      }
      const I = await _.json();
      this.lastRawForecastData = { city: o, loc: k, d: I }, i === this.activeRequestId && R.state !== "unconfigured" && this.applyForecastPayload(o, k, I);
    } catch (a) {
      i === this.activeRequestId && R.state !== "unconfigured" && Xe.error(a?.message || "天气加载失败，右键此处可重新选择地点。", o);
    } finally {
      i === this.activeRequestId && (this.isRefreshing = !1);
    }
  }
}
const Pt = Ht.getInstance();
function Na(e, t) {
  window.LogicWeaverIntro = st, window.LogicWeaverStartupIntro = st, window.LogicWeaverNotifications = ue, window.LogicWeaverWindowManager = Ce, window.LogicWeaverWindowTabs = Ce, window.LogicWeaverDomFreezer = Ws, window.LogicWeaverWallpaperService = Io, window.LogicWeaverLauncherService = $e, window.LogicWeaverLauncherRuntime = li, window.LogicWeaverProfileService = Hi;
  try {
    Hi.init();
  } catch (o) {
    console.error("[ProfileService] init failed:", o);
  }
  window.LogicWeaverBookmarksService = cn, window.LogicWeaverCalendarService = Ls, window.LogicWeaverWeather = Xe, window.LogicWeaverWeatherService = Pt, window.LogicWeaverClock = Ot, window.LogicWeaverSearch = ys, window.LogicWeaverSearchService = vs, Object.defineProperty(window, "LogicWeaverAiHotService", {
    configurable: !0,
    get: () => {
      import("./aihot.service-XT9iM_fb.js").then(({ aiHotService: o }) => {
        window.LogicWeaverAiHotService = o;
      });
    }
  }), window.LogicWeaverHomeMusic = Ze, window.LogicWeaverLauncherGroups = xe, window.LogicWeaverProfileMenu = Wo, window.LogicWeaverWorkspaceLaunchers = ki, window.LogicWeaverMacDock = ut, window.LogicWeaverFullscreen = xt, window.enterFullscreenCard = (o) => xt.enter(o), window.exitFullscreenCard = () => xt.exit(), window.cycleFullscreenCard = () => xt.cycle(), window.LogicWeaverPageVisibility = Wa, window.LogicWeaverBackgroundLibrary = Ni, window.LogicWeaverNotificationCenter = no, window.LogicWeaverBookmarkMenu = yi, window.LogicWeaverBookmarkPanel = No, window.LogicWeaverBookmarkFolderStrip = dn, window.LogicWeaverLauncherDialogs = tn, window.LogicWeaverLauncherFolder = on, window.LogicWeaverLauncherMenus = mi, window.LogicWeaverSettings = ao, window.LogicWeaverClockSettings = Ct, window.LogicWeaverBiliTheater = to, window.LogicWeaverBilibiliService = $i, window.getBiliJct = () => $i.getBiliJct(), window.LogicWeaverBiliMiniPlayer = bo, window.openBiliMiniPlayer = (o) => bo.openVideo(o), window.LogicWeaverAiDialog = _i, window.LogicWeaverAihotViewer = bi, window.LogicWeaverNavWheel = we, window.openNavWheel = (o, i) => De.open(o, i), window.closeNavWheel = () => De.close(), window.toggleNavWheel = (o) => De.toggle(o), window.toggleToolWheel = (o) => De.toggleTools(o), window.setNavWheelMode = (o) => De.setMode(o), window.LogicWeaverShortcuts = fi, window.triggerToolShortcut = (o) => fi.triggerToolShortcut(o), window.LogicWeaverCommands = e, window.LogicWeaverFeatures = t, window.LogicWeaverCalendarView = Ss, window.LogicWeaverGitHubStatus = an, window.LogicWeaverGitHubFolders = rn, window.LogicWeaverGitHubHero = ln, window.LogicWeaverGitHubRepositories = mt, window.LogicWeaverGitHubBatchBar = eo, window.LogicWeaverTodoistLabels = Ts, window.LogicWeaverTodoistWorkspace = $s, window.LogicWeaverTodoistCalendarSidebar = Ms, window.LogicWeaverTodoistTaskList = Is, window.LogicWeaverBiliMessagePanel = kt, window.LogicWeaverStickerBoard = Ks, window.LogicWeaverStickersService = zs, window.LogicWeaverBiliFavorites = hn, window.LogicWeaverBiliRadioTape = Vs, window.LogicWeaverBiliOrganizerDialogs = Bs, window.LogicWeaverBiliUpGroupManager = Hs, window.LogicWeaverBiliUpPreview = So, window.LogicWeaverAihotFeed = fn, window.LogicWeaverGitHubTrending = gn, window.LogicWeaverCalendarWorkspace = Nt, window.LogicWeaverCalendar = Nt, window.LogicWeaverTodoistMainWorkspace = As, window.LogicWeaverTodoistTaskDetail = _a, window.openBiliTheater = (o) => to.openVideo(o), window.closeBiliTheater = () => to.close(), window.showWindowsToast = (o) => {
    if (!o) return null;
    const i = jo(o.target) || Mi(o.url) || (o.appType === "bili" ? ps([o.title, o.subtitle, o.message].filter((a) => typeof a == "string").join(" ")) : void 0);
    return ue.show({
      ...o,
      target: i,
      onClick: () => {
        if (typeof o?.onClick == "function") return o.onClick();
        if (i) return no.openTarget(i);
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
    const r = typeof i == "object" && i ? i : a, v = typeof i == "number" ? i : 3200, k = r.isError || /失败|错误|异常|未获取|未找到/i.test(o), l = r.title || (k ? "B站操作未完成" : "哔哩哔哩"), _ = r.subtitle || (o.length > 36 ? "" : o), I = r.message || (r.subtitle || o.length > 36 ? o : ""), A = {
      id: r.id || `bili_toast_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      appType: "bili",
      appName: "哔哩哔哩",
      icon: "assets/bilibili.svg",
      title: l,
      subtitle: _ || o,
      message: I && I !== _ ? I : "",
      showActions: !!(r.showActions || r.actionLabel),
      actionLabel: r.actionLabel || "",
      onClick: r.onClick || null,
      target: jo(r.target) || Mi(r.url) || jo({ type: "bili-video", bvid: r.bvid, aid: r.aid ? String(r.aid) : void 0 }),
      url: r.url,
      duration: Math.max(3e3, v)
    };
    return window.showWindowsToast(A);
  }, window.showFetchToast = (o, i, a = "", r = "assets/logo.png", v = 3200) => window.showWindowsToast({
    appName: o,
    title: i,
    subtitle: a,
    icon: r || "assets/logo.png",
    duration: v,
    showActions: !1,
    actionLabel: "",
    appType: "fetch"
  }), window.LogicWeaverKineticDrag = ea, window.LogicWeaverMarkdownAst = ta, window.setLauncherBackground = (o) => Io.setWallpaper(o), window.backgroundDbClear = (o) => Es(o), window.openBackgroundHistory = () => Ni.openDialog(), ji("biliMiniPlayer", bo.machine), ji("neteaseAuth", Ze.authMachine), window.__TAB_MACHINES__ = Ca();
}
const Te = fe({
  isOpen: !1,
  query: "",
  selectedIndex: 0
});
let yo = null;
const Mn = {
  get state() {
    return Te;
  },
  open() {
    Te.isOpen || (Te.isOpen = !0, Te.query = "", Te.selectedIndex = 0, yo = Ce.pushModalCloser(() => (this.close(), !0)));
  },
  close() {
    Te.isOpen && (Te.isOpen = !1, Te.query = "", Te.selectedIndex = 0, yo && (yo(), yo = null));
  },
  toggle() {
    Te.isOpen ? this.close() : this.open();
  },
  setQuery(e) {
    Te.query = e, Te.selectedIndex = 0;
  },
  selectNext(e) {
    e <= 0 || (Te.selectedIndex = (Te.selectedIndex + 1) % e);
  },
  selectPrev(e) {
    e <= 0 || (Te.selectedIndex = (Te.selectedIndex - 1 + e) % e);
  },
  async executeCommand(e) {
    this.close();
    try {
      await Oo.execute(e.id, void 0, "command-palette");
    } catch (t) {
      console.warn(`[CommandPalette] Failed to execute ${e.id}:`, t);
    }
  }
};
typeof window < "u" && window.addEventListener("keydown", (e) => {
  if (vi.active || e.defaultPrevented || e.isComposing || e.repeat) return;
  const t = (e.key || "").toLowerCase(), o = (e.ctrlKey || e.metaKey) && t === "k", i = e.altKey && (e.code === "Space" || t === " ");
  (o || i) && (e.preventDefault(), e.stopPropagation(), Mn.toggle());
}, !0);
function Oa(e) {
  e.register({
    id: "palette.toggle",
    title: "打开全局命令中心 (Spotlight)",
    category: "界面",
    keywords: ["命令", "palette", "spotlight", "raycast", "搜索", "cmd"],
    concurrency: "drop",
    run: () => Mn.toggle()
  }), e.register({
    id: "intro.skip",
    title: "跳过开屏动画",
    category: "界面",
    keywords: ["开屏", "启动", "skip"],
    concurrency: "drop",
    enabled: () => st.enabled && !st.finished,
    run: () => st.skip("COMMAND SKIP")
  }), e.register({
    id: "notifications.clear",
    title: "关闭当前 Toast",
    category: "通知",
    keywords: ["toast", "关闭"],
    description: "只关闭浮动提示，不删除通知中心历史",
    concurrency: "drop",
    enabled: () => ue.size > 0,
    run: () => ue.clear()
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
    enabled: () => Nt.ready,
    run: () => Nt.refresh()
  }), e.register({
    id: "calendar.today",
    title: "日历跳转到今天",
    category: "日历",
    keywords: ["今日", "today", "日期"],
    concurrency: "drop",
    enabled: () => Nt.ready,
    run: () => Nt.goToday()
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
const Ra = {
  key: 0,
  class: "notice"
}, Ba = {
  key: 1,
  class: "muted small"
}, Ha = {
  key: 2,
  class: "notice"
}, Fa = {
  key: 3,
  class: "notice"
}, ja = { class: "wx-cur" }, Va = { class: "wx-emoji" }, Ka = { class: "wx-temp" }, za = { class: "wx-sub" }, Ga = { class: "wx-rain" }, Ua = { class: "wx-hours" }, Ya = { class: "hh" }, qa = { class: "he" }, Xa = { class: "ht" }, Ja = { class: "wx-days" }, Qa = ["open"], Za = { class: "weather-forecast-head" }, er = { class: "weather-forecast-city-info" }, tr = { class: "weather-forecast-icon" }, or = { id: "weather-forecast-city-title" }, ir = { class: "small muted" }, nr = { class: "weather-forecast-actions" }, sr = ["title"], ar = ["title"], rr = {
  key: 0,
  class: "weather-metrics-grid"
}, lr = { class: "weather-metric-item" }, cr = { class: "metric-label" }, dr = {
  class: "metric-val",
  id: "weather-forecast-humidity"
}, ur = { class: "weather-metric-item" }, pr = { class: "metric-label" }, hr = {
  class: "metric-val",
  id: "weather-forecast-wind"
}, fr = { class: "weather-metric-item" }, gr = { class: "metric-label" }, mr = {
  class: "metric-val",
  id: "weather-forecast-uv"
}, wr = { class: "weather-metric-item" }, yr = { class: "metric-label" }, vr = {
  class: "metric-val",
  id: "weather-forecast-aqi"
}, br = {
  class: "weather-forecast-list",
  id: "weather-forecast-days-list"
}, kr = { class: "day-date-col" }, _r = { class: "day-name" }, xr = { class: "day-date small muted" }, Cr = { class: "day-weather-col" }, Lr = { class: "day-emoji" }, Sr = { class: "day-cond" }, Tr = { class: "day-rain-col" }, $r = {
  key: 0,
  class: "rain-tag"
}, Mr = {
  key: 1,
  class: "rain-tag empty"
}, Ir = { class: "day-temp-bar-col" }, Ar = { class: "low-temp" }, Er = { class: "temp-track" }, Dr = { class: "high-temp" }, Pr = { class: "weather-location-head" }, Wr = { class: "weather-location-title-row" }, Nr = { class: "weather-location-title" }, Or = ["title"], Rr = { class: "weather-input-wrapper" }, Br = ["placeholder", "onKeydown"], Hr = ["title"], Fr = {
  type: "submit",
  class: "weather-location-submit"
}, jr = { key: 0 }, Vr = { class: "weather-section-subtitle" }, Kr = {
  key: 0,
  class: "weather-location-suggestions"
}, zr = ["onClick"], Gr = { class: "weather-suggestion-name" }, Ur = { class: "weather-suggestion-sub" }, Yr = {
  key: 1,
  class: "weather-suggestion-empty"
}, qr = { key: 1 }, Xr = { class: "weather-section-subtitle" }, Jr = { class: "weather-quick-chips-grid" }, Qr = ["onClick"], Zr = /* @__PURE__ */ he({
  __name: "WeatherWidget",
  setup(e) {
    const t = q(!1), o = q({ x: 0, y: 0 }), i = q(""), a = q(null), r = q(null), v = ["深圳", "武汉", "北京", "上海", "广州", "成都", "杭州", "南京", "西安", "重庆", "苏州", "天津"], k = ae(() => {
      const L = i.value.trim();
      return L ? Pt.filterCities(L, 6) : [];
    });
    function l(L) {
      const V = L?.clientX ?? window.innerWidth / 2 - 140, se = L?.clientY ?? window.innerHeight / 2 - 320 / 2, T = Math.max(12, Math.min(window.innerWidth - 280 - 12, V)), w = Math.max(12, Math.min(window.innerHeight - 320 - 12, se));
      o.value = { x: T, y: w }, t.value = !0, i.value = "", pt(() => {
        r.value?.focus();
      });
    }
    function _() {
      t.value = !1, i.value = "";
    }
    async function I(L) {
      const D = L.trim();
      D && (_(), await Pt.changeCity(D));
    }
    function A() {
      const L = i.value.trim();
      L && I(L);
    }
    function f(L) {
      if (!t.value) return;
      const D = L.target;
      a.value && !a.value.contains(D) && _();
    }
    function $(L) {
      t.value && L.key === "Escape" && (L.preventDefault(), _());
    }
    Ve(() => {
      Xe.setRefreshAction(() => {
        Pt.loadWeather();
      }), Xe.setChangeLocationAction((L) => {
        l(L);
      }), Pt.loadWeather(), tt(et, () => {
        Pt.reformatCurrentWeather();
      }), window.addEventListener("pointerdown", f, !0), window.addEventListener("keydown", $, !0);
    }), yt(() => {
      window.removeEventListener("pointerdown", f, !0), window.removeEventListener("keydown", $, !0);
    });
    function g(L) {
      L.preventDefault(), l(L);
    }
    function p() {
      Xe.closeForecastModal();
    }
    function b(L) {
      L.target?.id === "weather-forecast-dialog" && p();
    }
    return (L, D) => (c(), m("div", {
      class: "weather-widget-container",
      onContextmenu: g
    }, [
      s(R).state === "unconfigured" ? (c(), m("p", Ra, u(s(d)("weather.noCitySet")), 1)) : s(R).state === "loading" ? (c(), m("p", Ba, u(s(d)("common.loading")), 1)) : s(R).state === "not_found" ? (c(), m("p", Ha, u(s(d)("weather.cityNotFound", { city: s(R).city })), 1)) : s(R).state === "error" ? (c(), m("p", Fa, u(s(R).errorMessage || s(d)("weather.loadFailed")), 1)) : s(R).state === "ready" && s(R).data ? (c(), m(ee, { key: 4 }, [
        n("div", ja, [
          n("span", Va, u(s(R).data.currentEmoji), 1),
          n("span", Ka, u(s(R).data.currentTemp) + "°", 1)
        ]),
        n("p", za, u(s(R).data.subText), 1),
        n("p", Ga, u(s(R).data.rainText), 1),
        n("div", Ua, [
          (c(!0), m(ee, null, be(s(R).data.hours, (S, O) => (c(), m("div", {
            key: O,
            class: "wx-h"
          }, [
            n("span", Ya, u(S.time), 1),
            n("span", qa, u(S.emoji), 1),
            n("span", Xa, u(S.temp) + "°", 1)
          ]))), 128))
        ]),
        n("div", Ja, [
          (c(!0), m(ee, null, be(s(R).data.days, (S, O) => (c(), m("span", { key: O }, u(S.label) + " " + u(S.emoji) + " " + u(S.tempRange), 1))), 128))
        ])
      ], 64)) : P("", !0),
      n("dialog", {
        id: "weather-forecast-dialog",
        class: "weather-forecast-dialog",
        open: s(R).forecastModalOpen,
        onClick: b
      }, [
        n("div", {
          class: "weather-forecast-shell",
          onClick: D[1] || (D[1] = j(() => {
          }, ["stop"]))
        }, [
          n("header", Za, [
            n("div", er, [
              n("span", tr, u(s(R).data?.currentEmoji || "🌤️"), 1),
              n("div", null, [
                n("h3", or, u(s(R).city || s(R).data?.cityName || s(d)("weather.forecastTitle")), 1),
                n("p", ir, u(s(R).data?.subText || s(d)("weather.forecastSub")), 1)
              ])
            ]),
            n("div", nr, [
              n("button", {
                id: "weather-forecast-refresh-btn",
                type: "button",
                class: "weather-forecast-btn",
                title: s(d)("weather.refreshTitle"),
                onClick: D[0] || (D[0] = (S) => s(Xe).refresh())
              }, u(s(d)("weather.refresh")), 9, sr),
              n("button", {
                id: "weather-forecast-close-btn",
                type: "button",
                class: "weather-forecast-close",
                title: s(d)("common.close"),
                onClick: p
              }, " ✕ ", 8, ar)
            ])
          ]),
          s(R).detailInfo ? (c(), m("div", rr, [
            n("div", lr, [
              n("span", cr, u(s(d)("weather.metric.humidity")), 1),
              n("span", dr, u(s(R).detailInfo.humidity || "50%"), 1)
            ]),
            n("div", ur, [
              n("span", pr, u(s(d)("weather.metric.wind")), 1),
              n("span", hr, u(s(R).detailInfo.wind || (s(et) === "en" ? "Breeze" : "微风")), 1)
            ]),
            n("div", fr, [
              n("span", gr, u(s(d)("weather.metric.uv")), 1),
              n("span", mr, u(s(R).detailInfo.uvIndex || (s(et) === "en" ? "Moderate" : "中等")), 1)
            ]),
            n("div", wr, [
              n("span", yr, u(s(d)("weather.metric.aqi")), 1),
              n("span", vr, u(s(R).detailInfo.airQuality || (s(et) === "en" ? "Good" : "良")), 1)
            ])
          ])) : P("", !0),
          n("div", br, [
            (c(!0), m(ee, null, be(s(R).forecastDays, (S, O) => (c(), m("div", {
              key: O,
              class: "weather-forecast-day-row forecast-day-item"
            }, [
              n("div", kr, [
                n("span", _r, u(S.dayName), 1),
                n("span", xr, u(S.date), 1)
              ]),
              n("div", Cr, [
                n("span", Lr, u(S.emoji), 1),
                n("span", Sr, u(S.condition), 1)
              ]),
              n("div", Tr, [
                S.rainProb > 0 ? (c(), m("span", $r, "☂️ " + u(S.rainProb) + "%", 1)) : (c(), m("span", Mr, u(s(d)("weather.metric.noRain")), 1))
              ]),
              n("div", Ir, [
                n("span", Ar, u(S.lowTemp) + "°", 1),
                n("div", Er, [
                  n("div", {
                    class: "temp-range-fill",
                    style: ke({
                      left: `${Math.max(0, Math.min(100, (S.lowTemp + 10) * 2))}%`,
                      width: `${Math.max(20, Math.min(80, (S.highTemp - S.lowTemp) * 6))}%`
                    })
                  }, null, 4)
                ]),
                n("span", Dr, u(S.highTemp) + "°", 1)
              ])
            ]))), 128))
          ])
        ])
      ], 8, Qa),
      (c(), ne(Tt, { to: "body" }, [
        t.value ? (c(), m("div", {
          key: 0,
          ref_key: "contextMenuRef",
          ref: a,
          class: "weather-location-context-menu",
          style: ke({ left: `${o.value.x}px`, top: `${o.value.y}px` }),
          onClick: D[4] || (D[4] = j(() => {
          }, ["stop"])),
          onContextmenu: D[5] || (D[5] = j(() => {
          }, ["prevent"]))
        }, [
          n("div", Pr, [
            n("div", Wr, [
              n("span", Nr, u(s(d)("weather.menu.changeLocation")), 1),
              n("span", {
                class: "weather-location-curr-badge",
                title: s(R).city
              }, [
                D[6] || (D[6] = n("span", { class: "weather-curr-dot" }, null, -1)),
                nt(" " + u(s(R).city || s(d)("weather.menu.unset")), 1)
              ], 8, Or)
            ])
          ]),
          n("form", {
            class: "weather-location-form",
            onSubmit: j(A, ["prevent"])
          }, [
            n("div", Rr, [
              D[7] || (D[7] = n("span", { class: "weather-input-icon" }, "🔍", -1)),
              St(n("input", {
                ref_key: "inputRef",
                ref: r,
                class: "weather-location-input",
                placeholder: s(d)("weather.menu.inputPlaceholder"),
                "onUpdate:modelValue": D[2] || (D[2] = (S) => i.value = S),
                onKeydown: $o(j(A, ["prevent"]), ["enter"]),
                autocomplete: "off"
              }, null, 40, Br), [
                [Po, i.value]
              ]),
              i.value ? (c(), m("button", {
                key: 0,
                type: "button",
                class: "weather-input-clear",
                onClick: D[3] || (D[3] = (S) => i.value = ""),
                title: s(d)("weather.menu.clearInput")
              }, "✕", 8, Hr)) : P("", !0)
            ]),
            n("button", Fr, u(s(d)("weather.menu.submit")), 1)
          ], 32),
          i.value.trim() ? (c(), m("div", jr, [
            n("div", Vr, u(s(d)("weather.menu.suggestions")), 1),
            k.value.length ? (c(), m("div", Kr, [
              (c(!0), m(ee, null, be(k.value, (S) => (c(), m("button", {
                key: S.name + S.admin,
                type: "button",
                class: "weather-suggestion-item",
                onClick: (O) => I(S.name)
              }, [
                n("span", Gr, u(S.name), 1),
                n("span", Ur, u(S.admin), 1)
              ], 8, zr))), 128))
            ])) : (c(), m("div", Yr, u(s(d)("weather.menu.emptySuggestion")), 1))
          ])) : (c(), m("div", qr, [
            n("div", Xr, u(s(d)("weather.menu.commonCities")), 1),
            n("div", Jr, [
              (c(), m(ee, null, be(v, (S) => n("button", {
                key: S,
                type: "button",
                class: re(["weather-quick-chip", { active: s(R).city === S }]),
                onClick: (O) => I(S)
              }, u(S), 11, Qr)), 64))
            ])
          ]))
        ], 36)) : P("", !0)
      ]))
    ], 32));
  }
}), In = /* @__PURE__ */ Re(Zr, [["__scopeId", "data-v-bf1a1ba5"]]), gi = "heroCustomMottoV1";
function el() {
  try {
    if (typeof localStorage < "u") {
      const e = localStorage.getItem(gi);
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
const Et = el(), B = fe({
  loaded: !1,
  customText: Et.customText,
  history: Et.history,
  currentIndex: Et.customText && Et.history.length ? Et.history.findIndex((e) => e.text === Et.customText) : -1,
  menuOpen: !1,
  menuPos: { x: 0, y: 0 }
});
function tl(e) {
  return new Promise((t) => {
    typeof chrome < "u" && chrome?.storage?.local?.get ? chrome.storage.local.get([e], (o) => t(o?.[e])) : t(null);
  });
}
function ol(e, t) {
  try {
    typeof localStorage < "u" && localStorage.setItem(e, JSON.stringify(t));
  } catch {
  }
  return new Promise((o) => {
    typeof chrome < "u" && chrome?.storage?.local?.set ? chrome.storage.local.set({ [e]: t }, () => o()) : o();
  });
}
function il(e) {
  const t = (a) => String(a).padStart(2, "0"), o = `${e.getFullYear()}-${t(e.getMonth() + 1)}-${t(e.getDate())}`, i = `${t(e.getHours())}:${t(e.getMinutes())}`;
  return { date: o, time: i };
}
const qe = {
  async init() {
    try {
      const e = await tl(gi);
      if (e && typeof e == "object") {
        const t = Array.isArray(e.history) ? e.history : [];
        t.length >= B.history.length && (B.history = t, e.customText !== void 0 && (B.customText = e.customText));
      }
    } catch (e) {
      console.warn("[HeroMotto] Sync chrome.storage failed:", e);
    } finally {
      B.loaded = !0, B.customText && B.history.length && (B.currentIndex = B.history.findIndex(
        (e) => e.text === B.customText
      ));
    }
  },
  async persist() {
    const e = {
      customText: B.customText,
      history: B.history
    };
    await ol(gi, e);
  },
  setCustomMotto(e) {
    const t = e.trim();
    if (!t) {
      this.resetToSystem();
      return;
    }
    const { date: o, time: i } = il(/* @__PURE__ */ new Date());
    B.customText = t;
    const a = B.history.findIndex((r) => r.text === t);
    if (a !== -1) {
      const r = B.history.splice(a, 1)[0];
      r.date = o, r.time = i, B.history.unshift(r);
    } else
      B.history.unshift({
        id: `motto_${Date.now()}`,
        date: o,
        time: i,
        text: t,
        createdAt: Date.now()
      });
    B.history.length > 50 && (B.history = B.history.slice(0, 50)), B.currentIndex = 0, this.persist();
  },
  selectHistory(e) {
    B.customText = e.text, B.currentIndex = B.history.findIndex((t) => t.id === e.id), this.closeMenu(), this.persist();
  },
  resetToSystem() {
    B.customText = null, B.currentIndex = -1, this.closeMenu(), this.persist();
  },
  deleteEntry(e) {
    const t = B.history.findIndex((o) => o.id === e);
    t !== -1 && (B.history.splice(t, 1), B.currentIndex === t && (B.history.length > 0 ? this.selectHistory(B.history[0]) : this.resetToSystem()), this.persist());
  },
  clearHistory() {
    B.history = [], this.resetToSystem();
  },
  stepHistory(e) {
    if (!B.history.length) return;
    let t = B.currentIndex + e;
    if (t < 0) {
      this.resetToSystem();
      return;
    }
    t >= B.history.length && (t = 0), this.selectHistory(B.history[t]);
  },
  openMenu(e, t) {
    B.menuPos = { x: e, y: t }, B.menuOpen = !0;
  },
  closeMenu() {
    B.menuOpen = !1;
  }
}, nl = ["title"], sl = ["placeholder"], al = { class: "motto-content" }, rl = ["title"], ll = { class: "motto-menu-header" }, cl = { class: "dim" }, dl = { class: "motto-history-label" }, ul = { class: "motto-history-list" }, pl = {
  key: 0,
  class: "motto-history-empty dim"
}, hl = ["onClick"], fl = { class: "motto-item-date" }, gl = ["title"], ml = ["title", "onClick"], wl = /* @__PURE__ */ he({
  __name: "HeroMotto",
  setup(e) {
    const t = q(!1), o = q(""), i = q(null), a = {
      夜深了: "clock.greeting.lateNight",
      早上好: "clock.greeting.morning",
      上午好: "clock.greeting.forenoon",
      中午好: "clock.greeting.noon",
      下午好: "clock.greeting.afternoon",
      晚上好: "clock.greeting.evening",
      你好: "clock.greeting.hello"
    };
    function r(g) {
      const p = a[g];
      return p ? d(p) : g;
    }
    const v = ae(() => B.customText ? r(B.customText) : ce.greetingText);
    function k() {
      qe.closeMenu(), o.value = B.customText || ce.greetingText, t.value = !0, pt(() => {
        i.value?.focus(), i.value?.select();
      });
    }
    function l() {
      if (!t.value) return;
      t.value = !1;
      const g = o.value.trim();
      qe.setCustomMotto(g), g && ue.fetch(d("motto.appName"), d("motto.updated", { text: g }));
    }
    function _() {
      t.value = !1;
    }
    function I(g) {
      g.key === "Enter" ? (g.preventDefault(), l()) : g.key === "Escape" && (g.preventDefault(), _());
    }
    function A(g) {
      t.value || (g.preventDefault(), g.stopPropagation(), qe.stepHistory(g.deltaY > 0 ? 1 : -1));
    }
    function f(g) {
      g.preventDefault(), g.stopPropagation(), qe.openMenu(g.clientX, g.clientY);
    }
    function $(g) {
      B.menuOpen && (g.target.closest(".motto-context-menu") || qe.closeMenu());
    }
    return Ve(() => {
      qe.init(), window.addEventListener("click", $);
    }), yt(() => {
      window.removeEventListener("click", $);
    }), (g, p) => (c(), m(ee, null, [
      n("div", {
        class: "hero-motto-wrapper",
        title: s(d)("motto.hint"),
        onWheel: A,
        onContextmenu: f
      }, [
        t.value ? St((c(), m("input", {
          key: 0,
          ref_key: "mottoInputRef",
          ref: i,
          "onUpdate:modelValue": p[0] || (p[0] = (b) => o.value = b),
          class: "hero-motto-input",
          type: "text",
          placeholder: s(d)("motto.placeholder"),
          maxlength: "60",
          onBlur: l,
          onKeydown: I
        }, null, 40, sl)), [
          [Po, o.value]
        ]) : (c(), m("p", {
          key: 1,
          id: "greeting",
          class: "hero-motto-text",
          style: ke({
            color: s(ce).greetColor,
            textShadow: s(ce).greetColor === "#0f172a" ? "none" : "0 1px 8px rgba(0, 0, 0, 0.35)"
          }),
          onClick: k
        }, [
          n("span", al, u(v.value), 1),
          s(B).history.length > 1 ? (c(), m("span", {
            key: 0,
            class: "motto-scroll-hint",
            title: s(d)("motto.scrollHint")
          }, "⇕", 8, rl)) : P("", !0)
        ], 4))
      ], 40, nl),
      (c(), ne(Tt, { to: "body" }, [
        s(B).menuOpen ? (c(), m("div", {
          key: 0,
          class: "motto-context-menu",
          style: ke({ left: `${s(B).menuPos.x}px`, top: `${s(B).menuPos.y}px` }),
          onClick: p[3] || (p[3] = j(() => {
          }, ["stop"])),
          onContextmenu: p[4] || (p[4] = j(() => {
          }, ["prevent"]))
        }, [
          n("div", ll, [
            n("span", null, u(s(d)("motto.customTitle")), 1),
            n("small", cl, u(s(d)("motto.recordsCount", { count: s(B).history.length })), 1)
          ]),
          n("button", {
            type: "button",
            class: "motto-menu-action",
            onClick: k
          }, [
            p[5] || (p[5] = n("i", null, "✎", -1)),
            n("span", null, u(s(d)("motto.editCurrent")), 1)
          ]),
          p[8] || (p[8] = n("div", { class: "motto-menu-divider" }, null, -1)),
          n("div", dl, u(s(d)("motto.historyLabel")), 1),
          n("div", ul, [
            s(B).history.length ? (c(!0), m(ee, { key: 1 }, be(s(B).history, (b) => (c(), m("div", {
              key: b.id,
              class: re(["motto-history-item", { active: s(B).customText === b.text }]),
              onClick: (L) => s(qe).selectHistory(b)
            }, [
              n("span", fl, u(b.date), 1),
              n("span", {
                class: "motto-item-text",
                title: r(b.text)
              }, u(r(b.text)), 9, gl),
              n("button", {
                type: "button",
                class: "motto-item-del",
                title: s(d)("motto.deleteEntry"),
                onClick: j((L) => s(qe).deleteEntry(b.id), ["stop"])
              }, "×", 8, ml)
            ], 10, hl))), 128)) : (c(), m("div", pl, u(s(d)("motto.historyEmpty")), 1))
          ]),
          p[9] || (p[9] = n("div", { class: "motto-menu-divider" }, null, -1)),
          n("button", {
            type: "button",
            class: "motto-menu-action reset-btn",
            onClick: p[1] || (p[1] = //@ts-ignore
            (...b) => s(qe).resetToSystem && s(qe).resetToSystem(...b))
          }, [
            p[6] || (p[6] = n("i", null, "↻", -1)),
            n("span", null, u(s(d)("motto.resetGreeting")), 1)
          ]),
          s(B).history.length ? (c(), m("button", {
            key: 0,
            type: "button",
            class: "motto-menu-action danger-btn",
            onClick: p[2] || (p[2] = //@ts-ignore
            (...b) => s(qe).clearHistory && s(qe).clearHistory(...b))
          }, [
            p[7] || (p[7] = n("i", null, "🗑", -1)),
            n("span", null, u(s(d)("motto.clearAll")), 1)
          ])) : P("", !0)
        ], 36)) : P("", !0)
      ]))
    ], 64));
  }
}), yl = /* @__PURE__ */ Re(wl, [["__scopeId", "data-v-afc4beae"]]), vl = /* @__PURE__ */ he({
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
    function i() {
      const l = Ct.state.timezone;
      if (!l || l === "local") return /* @__PURE__ */ new Date();
      try {
        const _ = (/* @__PURE__ */ new Date()).toLocaleString("en-US", { timeZone: l });
        return new Date(_);
      } catch {
        return /* @__PURE__ */ new Date();
      }
    }
    function a() {
      const l = (se) => String(se).padStart(2, "0"), _ = i(), I = _.getHours(), A = _.getMinutes(), f = _.getSeconds(), $ = _.getFullYear(), g = _.getMonth() + 1, p = _.getDate(), b = _.getDay(), L = `${l(I)}:${l(A)}`, D = `:${l(f)}`, S = o(I), O = d(t[b]), V = d("clock.datePattern", {
        year: $,
        month: g,
        day: p,
        week: O
      });
      Ot.updateTime(L, D, S, V);
    }
    function r(l) {
      l.preventDefault(), Ct.open({ clientX: l.clientX, clientY: l.clientY });
    }
    function v() {
      document.hidden ? k && (clearInterval(k), k = null) : (a(), k || (k = setInterval(a, 1e3)));
    }
    let k = null;
    return Ct.initPreferences(), a(), Ve(() => {
      Ct.initPreferences(), tt(et, () => {
        a();
      }), ht.activeId || (a(), k = setInterval(a, 1e3)), document.addEventListener("visibilitychange", v);
    }), tt(
      () => ht.activeId,
      (l) => {
        l ? k && (clearInterval(k), k = null) : document.hidden || (a(), k || (k = setInterval(a, 1e3)));
      }
    ), yt(() => {
      k && (clearInterval(k), k = null), document.removeEventListener("visibilitychange", v);
    }), (l, _) => (c(), m("div", {
      class: "hero-clock-vue-container",
      onContextmenu: r
    }, [
      n("p", {
        id: "clock",
        class: "clock",
        style: ke({
          fontFamily: s(ce).fontFamily,
          color: s(ce).colorHex,
          textShadow: s(ce).colorHex === "#0f172a" ? "none" : "0 2px 14px rgba(0, 0, 0, 0.45)"
        })
      }, [
        nt(u(s(ce).timeText), 1),
        n("span", {
          id: "secs",
          style: ke({ color: s(ce).colorHex })
        }, u(s(ce).secsText), 5)
      ], 4),
      n("p", {
        id: "date",
        class: "date",
        style: ke({
          color: s(ce).dateColor,
          textShadow: s(ce).dateColor === "#0f172a" ? "none" : "0 1px 8px rgba(0, 0, 0, 0.35)"
        })
      }, u(s(ce).dateText), 5)
    ], 32));
  }
}), An = /* @__PURE__ */ Re(vl, [["__scopeId", "data-v-16c004bb"]]), bl = {
  key: 0,
  class: "home-music-degraded-box"
}, kl = { class: "degraded-badge-row" }, _l = { class: "degraded-status" }, xl = {
  key: 0,
  class: "degraded-host-tag"
}, Cl = {
  key: 1,
  class: "degraded-host-tag"
}, Ll = { class: "degraded-title-row" }, Sl = ["title"], Tl = { class: "degraded-track-artist" }, $l = ["title"], Ml = { class: "degraded-progress-bar-wrap" }, Il = { class: "degraded-actions" }, Al = { class: "degraded-time" }, El = { class: "home-vinyl-box" }, Dl = ["title"], Pl = ["src", "alt"], Wl = { class: "home-music-right" }, Nl = ["title"], Ol = {
  id: "home-music-artist",
  class: "home-music-meta-artist"
}, Rl = ["title"], Bl = { class: "home-music-seek-row" }, Hl = {
  id: "home-music-cur",
  class: "home-music-time"
}, Fl = ["value"], jl = {
  id: "home-music-dur",
  class: "home-music-time"
}, Vl = { class: "home-music-actions" }, Kl = ["title"], zl = ["title"], Gl = ["title"], Ul = ["title"], Yl = /* @__PURE__ */ he({
  __name: "HomeMusicCard",
  setup(e) {
    Ve(() => {
      setTimeout(() => {
        bs();
      }, 200);
    });
    const t = ae(() => ks.visible || At.djModalOpen || At.isActive && At.isJoined), o = ae(() => At.isActive && At.isJoined), i = ae(() => !te.title || te.title === "点击播放" ? d("home.music.defaultTitle") : te.title), a = ae(() => !te.artist || te.artist === "作者" ? d("home.music.defaultArtist") : te.artist), r = ae(() => te.mode === "shuffle" ? "🔀" : te.mode === "one" ? "🔂" : "🔁");
    function v(l) {
      const _ = l.target, I = Number(_.value);
      Ze.seek(I);
    }
    function k() {
      Ze.update({ coverUrl: "" });
    }
    return (l, _) => (c(), m("div", {
      id: "home-music-player-view",
      class: re(["home-music-player-view", { "is-degraded": t.value }])
    }, [
      t.value ? (c(), m("div", bl, [
        n("div", kl, [
          _[6] || (_[6] = n("span", { class: "degraded-icon" }, "🎧", -1)),
          n("strong", _l, u(o.value ? s(d)("home.music.togetherListening") : s(d)("home.music.backgroundListening")), 1),
          o.value ? (c(), m("span", xl, " DJ: " + u(s(At).hostName), 1)) : (c(), m("span", Cl, u(s(d)("home.music.workspaceReady")), 1))
        ]),
        n("div", Ll, [
          n("h3", {
            class: "degraded-track-title",
            title: i.value
          }, u(i.value || s(d)("home.music.standby")), 9, Sl),
          n("p", Tl, u(a.value), 1),
          n("p", {
            class: "home-music-current-lyric",
            title: s(te).currentLyric || ""
          }, u(s(te).currentLyric || "暂无歌词"), 9, $l)
        ]),
        n("div", Ml, [
          n("div", {
            class: "degraded-progress-bar-fill",
            style: ke({ width: s(te).progressPercent + "%" })
          }, null, 4)
        ]),
        n("div", Il, [
          n("button", {
            type: "button",
            class: "degraded-btn",
            onClick: _[0] || (_[0] = (I) => s(Ze).togglePlay())
          }, u(s(te).playing ? s(d)("home.music.pause") : s(d)("home.music.play")), 1),
          n("span", Al, u(s(te).formattedCurrent) + " / " + u(s(te).formattedDuration), 1)
        ])
      ])) : (c(), m(ee, { key: 1 }, [
        n("div", El, [
          n("div", {
            id: "home-vinyl-needle",
            class: re(["home-vinyl-needle", { playing: s(te).playing }])
          }, [..._[7] || (_[7] = [
            Zt('<svg viewBox="0 0 32 52" fill="none" data-v-78f4a141><circle cx="26" cy="4" r="3.5" fill="#e2e8f0" stroke="#475569" stroke-width="1.5" data-v-78f4a141></circle><circle cx="26" cy="4" r="1.5" fill="#64748b" data-v-78f4a141></circle><path d="M26 4 L14 26 L11 44" stroke="#cbd5e1" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" data-v-78f4a141></path><rect x="7" y="42" width="8" height="9" rx="1.5" fill="#f43f5e" transform="rotate(-15 11 46)" data-v-78f4a141></rect></svg>', 1)
          ])], 2),
          n("div", {
            id: "home-vinyl-disc",
            class: re(["home-vinyl-disc", { playing: s(te).playing }]),
            title: s(d)("home.music.togglePlay"),
            onClick: _[1] || (_[1] = (I) => s(Ze).togglePlay())
          }, [
            s(te).coverUrl ? (c(), m("img", {
              key: 0,
              id: "home-vinyl-cover",
              class: "home-vinyl-cover",
              referrerpolicy: "no-referrer",
              src: s(te).coverUrl,
              alt: s(d)("home.music.coverAlt"),
              onError: k
            }, null, 40, Pl)) : P("", !0),
            _[8] || (_[8] = n("div", { class: "home-vinyl-hole" }, null, -1))
          ], 10, Dl)
        ]),
        n("div", Wl, [
          n("h3", {
            id: "home-music-title",
            class: "home-music-meta-title",
            title: i.value
          }, u(i.value), 9, Nl),
          n("p", Ol, u(a.value), 1),
          n("p", {
            class: "home-music-current-lyric",
            title: s(te).currentLyric || ""
          }, u(s(te).currentLyric || "暂无歌词"), 9, Rl),
          n("div", Bl, [
            n("span", Hl, u(s(te).formattedCurrent), 1),
            n("input", {
              id: "home-music-seek",
              class: "home-music-seek-bar",
              type: "range",
              min: "0",
              max: "100",
              value: s(te).progressPercent,
              onInput: v
            }, null, 40, Fl),
            n("span", jl, u(s(te).formattedDuration), 1)
          ]),
          n("div", Vl, [
            n("button", {
              id: "home-music-prev",
              class: "home-music-btn",
              type: "button",
              title: s(d)("home.music.prevTrack"),
              onClick: _[2] || (_[2] = (I) => s(Ze).prev())
            }, " ⏮ ", 8, Kl),
            n("button", {
              id: "home-music-play",
              class: "home-music-btn play-btn",
              type: "button",
              title: s(d)("home.music.togglePlay"),
              onClick: _[3] || (_[3] = (I) => s(Ze).togglePlay())
            }, u(s(te).playing ? "⏸" : "▶"), 9, zl),
            n("button", {
              id: "home-music-next",
              class: "home-music-btn",
              type: "button",
              title: s(d)("home.music.nextTrack"),
              onClick: _[4] || (_[4] = (I) => s(Ze).next())
            }, " ⏭ ", 8, Gl),
            n("button", {
              id: "home-music-mode",
              class: "home-music-btn",
              type: "button",
              title: s(d)("home.music.playMode"),
              onClick: _[5] || (_[5] = (I) => s(Ze).cycleMode())
            }, u(r.value), 9, Ul)
          ])
        ])
      ], 64))
    ], 2));
  }
}), En = /* @__PURE__ */ Re(Yl, [["__scopeId", "data-v-78f4a141"]]), ql = {
  class: "launcher-group launcher-aihot launcher-todoist size-large",
  id: "launcher-todoist"
}, Xl = { class: "card-head aihot-home-head" }, Jl = { class: "title" }, Ql = {
  class: "aihot-home-body",
  id: "aihot-home-body"
}, Zl = {
  key: 0,
  class: "muted small"
}, ec = {
  key: 1,
  class: "notice small"
}, tc = {
  key: 2,
  class: "muted small aihot-home-empty"
}, oc = {
  key: 3,
  class: "aihot-home-rich-list"
}, ic = ["href", "title", "onClick"], nc = { class: "aihot-home-rich-main" }, sc = { class: "aihot-home-rich-title" }, ac = {
  key: 0,
  class: "aihot-home-rich-summary"
}, rc = { class: "aihot-home-rich-meta" }, lc = { class: "aihot-home-rich-meta-left" }, cc = {
  key: 0,
  class: "aihot-home-rich-tag"
}, dc = { class: "aihot-home-rich-source" }, uc = { class: "aihot-home-rich-time" }, pc = 6, hc = /* @__PURE__ */ he({
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
    }, o = q([]), i = q(0), a = q(!0), r = q("");
    function v(p) {
      return et.value === "en" && p.originalTitle ? p.originalTitle : p.title;
    }
    function k(p) {
      const b = p.source?.name || p.sourceName || "AI HOT";
      return et.value === "en" && b.includes("：") ? b.split("：")[0].trim() : b;
    }
    function l(p) {
      if (!p.category) return "";
      const b = t[p.category];
      if (b)
        try {
          return d(b);
        } catch {
        }
      return p.category;
    }
    const _ = ae(() => et.value !== "en" ? o.value : [...o.value].sort((p, b) => {
      const L = !!(p.originalTitle && /[a-zA-Z]{3,}/.test(p.originalTitle)), D = !!(b.originalTitle && /[a-zA-Z]{3,}/.test(b.originalTitle));
      return L && !D ? -1 : !L && D ? 1 : 0;
    }));
    function I(p) {
      const b = p.publishedAt || p.published || "";
      if (!b) return et.value === "en" ? "Latest" : "最新";
      const L = Number(b), D = Number.isFinite(L) && L > 0 ? new Date(L > 1e12 ? L : L * 1e3) : new Date(b);
      if (isNaN(D.getTime())) return String(b).slice(0, 16) || (et.value === "en" ? "Latest" : "最新");
      const S = (C) => String(C).padStart(2, "0"), O = D.getFullYear(), V = S(D.getMonth() + 1), se = S(D.getDate()), T = S(D.getHours()), w = S(D.getMinutes());
      return `${O}-${V}-${se} ${T}:${w}`;
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
      const L = [
        "newtab_aihot_items_v2",
        "lw-aihot-cached-feed-all-24h-v1",
        "lw-aihot-cached-feed-v1"
      ];
      for (const D of L)
        try {
          const S = localStorage.getItem(D);
          if (S) {
            const O = JSON.parse(S);
            if (Array.isArray(O) && O.length) return O;
            if (O && Array.isArray(O.items) && O.items.length) return O.items;
          }
        } catch {
        }
      return [];
    }
    async function $(p = !1) {
      if (!p && o.value.length > 0) return;
      const b = f();
      b.length ? (o.value = b, a.value = !1) : o.value.length || (o.value = [...A], a.value = !1);
      try {
        const D = await (await fetch("https://aihot.news/api/v1/items?mode=selected&window=24h&limit=24", {
          headers: { Accept: "application/json" },
          signal: AbortSignal.timeout(5e3)
        })).json(), S = Array.isArray(D) ? D : D.items || D.data || D.results || [];
        if (S.length) {
          o.value = S, i.value = 0, r.value = "";
          try {
            localStorage.setItem("newtab_aihot_items_v2", JSON.stringify(S.slice(0, 30)));
          } catch {
          }
        }
      } catch {
        o.value.length || (o.value = [...A]);
      } finally {
        a.value = !1;
      }
    }
    function g(p, b) {
      if (b.ctrlKey || b.metaKey || b.shiftKey || b.button === 1) return;
      b.preventDefault();
      const L = p.links?.original || p.links?.aihot || p.url || "#";
      bi.openArticle(
        {
          id: p.id,
          title: v(p),
          summary: p.summary,
          sourceName: k(p),
          published: I(p),
          url: L
        },
        ""
      );
    }
    return Ve(() => {
      $();
    }), (p, b) => (c(), m("section", ql, [
      n("header", Xl, [
        b[0] || (b[0] = n("span", { class: "bar cyan" }, null, -1)),
        n("strong", Jl, u(s(d)("aihot.card.title")), 1)
      ]),
      n("div", Ql, [
        a.value && !_.value.length ? (c(), m("p", Zl, u(s(d)("aihot.card.loading")), 1)) : r.value && !_.value.length ? (c(), m("p", ec, u(r.value), 1)) : _.value.length ? (c(), m("div", oc, [
          (c(!0), m(ee, null, be(_.value.slice(i.value, i.value + pc), (L, D) => (c(), m("a", {
            key: L.id || L.title,
            class: "aihot-home-rich-card",
            href: L.links?.original || L.links?.aihot || L.url || "#",
            target: "_blank",
            rel: "noreferrer",
            title: `${v(L)}
${L.summary || ""}
${s(d)("aihot.card.viewInReader")}`,
            onClick: (S) => g(L, S)
          }, [
            n("span", {
              class: re(["aihot-home-rich-rank", { top: i.value + D < 3 }])
            }, u(i.value + D + 1), 3),
            n("div", nc, [
              n("h3", sc, u(v(L)), 1),
              L.summary ? (c(), m("p", ac, u(L.summary), 1)) : P("", !0),
              n("div", rc, [
                n("div", lc, [
                  l(L) ? (c(), m("span", cc, u(l(L)), 1)) : P("", !0),
                  n("span", dc, u(k(L)), 1)
                ]),
                n("time", uc, u(I(L)), 1)
              ])
            ])
          ], 8, ic))), 128))
        ])) : (c(), m("p", tc, u(s(d)("aihot.card.empty")), 1))
      ])
    ]));
  }
}), fc = /* @__PURE__ */ Re(hc, [["__scopeId", "data-v-f4287f9a"]]), Ee = fe({
  showWeather: !0,
  showSites: !0,
  showHomeNews: !0,
  showHomePlayer: !0,
  showBili: !0,
  showTodo: !0,
  showBookmarkPanel: !0
}), gc = ["aria-hidden", "inert"], mc = ["aria-label"], wc = ["disabled", "aria-pressed"], yc = ["disabled", "aria-pressed"], vc = ["aria-label"], bc = ["data-page", "title", "onClick", "onContextmenu", "onDragover", "onDrop"], kc = {
  key: 0,
  id: "bookmark-board-header",
  class: "launcher-page-tabs"
}, _c = ["data-page"], xc = ["href", "title", "data-launcher-id", "onPointerdown", "onClick", "onContextmenu"], Cc = ["title", "data-launcher-folder", "onPointerdown", "onDragstart", "onDrop", "onClick", "onContextmenu"], Lc = ["title", "onClick"], Sc = {
  class: "launcher-folder-count",
  hidden: ""
}, Tc = {
  class: "launcher-empty",
  key: "empty-msg"
}, $c = { class: "launcher-media-stack" }, Mc = { class: "launcher-folder-preview" }, Ic = { class: "launcher-folder-label launcher-title" }, Ac = { class: "launcher-label launcher-title" }, Ec = /* @__PURE__ */ he({
  __name: "FavoriteSites",
  setup(e) {
    const t = H(() => import("./BookmarkBoard-D7HS-m7X.js")), o = H(() => import("./LauncherBookGuideDialog-BTDkrb5Q.js")), i = ae({
      get: () => le.sitesView || "sites",
      set: (h) => xe.setSitesView(h)
    }), a = q(!1), r = q(!1);
    function v() {
      r.value = !0;
    }
    function k() {
      r.value = !1;
    }
    function l() {
      ve(), p = !1, pe = !1;
    }
    Ve(() => {
      typeof chrome < "u" && chrome.storage?.local ? chrome.storage.local.get("defaultSitesView").then((y) => {
        i.value = y.defaultSitesView === "sites" ? "sites" : "bookmarks";
      }) : i.value = "bookmarks", xe.setExternalDragHandler(T), xe.setExternalDropHandler(w), window.addEventListener("blur", l), window.addEventListener("pagehide", l), document.addEventListener("visibilitychange", l);
      const h = window;
      le.hasBili && typeof h.ensureLauncherMediaCards == "function" && h.ensureLauncherMediaCards();
    });
    const _ = q(!1), I = q(""), A = q(null), f = q(null), $ = q(null), g = q(null);
    let p = !1, b = 0, L = 0, D = 0, S = "", O = 0, V = "", se = 0;
    function T(h) {
      if (i.value !== "sites") return;
      if (!h || ct.isOpen) {
        g.value && (g.value = null), V = "";
        return;
      }
      const y = document.elementsFromPoint(h.clientX, h.clientY);
      if (!y.some(
        (Ie) => Ie.classList.contains("launcher-site-items") || !!Ie.closest?.(".launcher-site-items")
      )) {
        g.value && (g.value = null), V = "";
        return;
      }
      const M = y.find((Ie) => Ie.classList.contains("launcher-link") && Ie.getAttribute("data-launcher-id") !== String(h.link.id) || Ie.classList.contains("launcher-folder"));
      if (!M) return;
      const G = M.classList.contains("launcher-link"), de = G ? M.getAttribute("data-launcher-id") : null, Se = G ? null : M.getAttribute("data-launcher-folder"), Y = G ? `link-${de}` : `folder-${Se}`, J = M.getBoundingClientRect(), We = J.left + J.width / 2, Fo = J.top + J.height / 2, Kt = Math.hypot(h.clientX - We, h.clientY - Fo), $t = Date.now();
      if (Kt > Math.max(J.width, J.height) * 0.55 || Y === V && $t - se < 180) return;
      const Mt = Ho.value.filter(
        (Ie) => Ie.type !== "link" || String(Ie.link.id) !== String(h.link.id)
      ), it = [...g.value || Mt], ft = it.findIndex(
        (Ie) => Ie.type === "link" && String(Ie.link.id) === String(h.link.id)
      ), gt = it.findIndex((Ie) => Ie.key === Y);
      if (gt < 0) return;
      const Ge = {
        key: `link-${h.link.id}`,
        type: "link",
        link: h.link
      };
      ft >= 0 ? ft !== gt && (it.splice(ft, 1), it.splice(gt, 0, Ge), g.value = it, V = Y, se = $t) : (it.splice(gt, 0, Ge), g.value = it, V = Y, se = $t);
    }
    async function w(h) {
      if (i.value !== "sites" || ct.isOpen) return !1;
      if (g.value) {
        const y = g.value.map((x) => ({
          type: x.type,
          id: x.type === "link" ? String(x.link.id) : void 0,
          groupName: x.type === "folder" ? x.folder.groupName : void 0
        }));
        return await $e.moveLinkTo(String(h.id), le.activePage, "常用网站"), await $e.reorderPageItems(le.activePage, y), g.value = null, V = "", !0;
      }
      return !1;
    }
    const C = fe({
      visible: !1,
      x: 0,
      y: 0,
      type: "link",
      link: null,
      folder: null,
      offsetX: 34,
      offsetY: 38
    });
    let Q = null, W = 0, N = 0, E = null, F = null, pe = !1;
    function ye(h, y) {
      if (y.button !== 0) return;
      Q = y.pointerId, W = y.clientX, N = y.clientY, L = y.clientX, D = y.clientY, E = String(h.id), F = null, pe = !1;
      const x = y.currentTarget.getBoundingClientRect();
      C.offsetX = y.clientX - x.left, C.offsetY = y.clientY - x.top, C.type = "link", C.link = h, C.folder = null, window.addEventListener("pointermove", Ke, { passive: !1 }), window.addEventListener("pointerup", Me), window.addEventListener("pointercancel", Me);
    }
    function ot(h, y, x) {
      if (x.button !== 0 || x.target.closest(".launcher-folder-del-btn")) return;
      Q = x.pointerId, W = x.clientX, N = x.clientY, L = x.clientX, D = x.clientY, E = null, F = h, pe = !1;
      const M = x.currentTarget.getBoundingClientRect();
      C.offsetX = x.clientX - M.left, C.offsetY = x.clientY - M.top, C.type = "folder", C.folder = {
        groupName: h,
        size: _e(h),
        links: y?.links || []
      }, C.link = null, window.addEventListener("pointermove", Ke, { passive: !1 }), window.addEventListener("pointerup", Me), window.addEventListener("pointercancel", Me);
    }
    let Be = 0, at = null;
    function rt() {
      cancelAnimationFrame(Be), Be = 0, at = null;
    }
    function Ke(h) {
      h.pointerId === Q && (pe && h.cancelable && h.preventDefault(), at = h, !Be && (Be = requestAnimationFrame(() => {
        Be = 0;
        const y = at;
        at = null, y && Pe(y);
      })));
    }
    function Pe(h) {
      if (h.pointerId !== Q || !E && !F) return;
      const y = Math.hypot(h.clientX - W, h.clientY - N);
      if (!pe && y > Us && (pe = !0, p = !0, E ? f.value = E : F && ($.value = F)), !pe) return;
      (C.link || C.folder) && (C.visible = !0, C.x = h.clientX - C.offsetX, C.y = h.clientY - C.offsetY);
      const x = document.elementsFromPoint(h.clientX, h.clientY);
      if (Ti()) {
        const Y = x.some(
          (We) => We.id === "launcher-folder-dialog" || !!We.closest?.("#launcher-folder-dialog")
        ), J = document.querySelector("#launcher-folder-dialog");
        if (Y && J) {
          J.classList.add("drop-hover-valid"), ct.dropHoverValid = !0;
          return;
        } else
          J?.classList.remove("drop-hover-valid"), ct.dropHoverValid = !1;
        g.value = null;
        return;
      }
      const G = g.value || Ho.value, de = E ? `link-${E}` : `folder-${F}`;
      if (G.length) {
        const Y = x.find((J) => {
          if (J.classList.contains("launcher-link")) {
            const We = J.getAttribute("data-launcher-id");
            return We && `link-${We}` !== de;
          }
          if (J.classList.contains("launcher-folder")) {
            const We = J.getAttribute("data-launcher-folder");
            return We && `folder-${We}` !== de;
          }
          return !1;
        });
        if (Y) {
          const J = Y.classList.contains("launcher-link"), We = J ? Y.getAttribute("data-launcher-id") : null, Fo = J ? null : Y.getAttribute("data-launcher-folder"), Kt = J ? `link-${We}` : `folder-${Fo}`, $t = Y.getBoundingClientRect();
          let Mt = !0;
          E && !J && (Ys($t, h.clientX, h.clientY) ? (Mt = !1, Y.classList.add("drop-target")) : Y.classList.remove("drop-target"));
          const it = Date.now();
          if (qs($t, h.clientX, h.clientY) || (Mt = !1), Kt === S && it - O < Xs && (Mt = !1), Mt) {
            document.querySelectorAll(".launcher-folder.drop-target").forEach((Ge) => Ge.classList.remove("drop-target"));
            const ft = G.findIndex((Ge) => Ge.key === de), gt = G.findIndex((Ge) => Ge.key === Kt);
            if (ft >= 0 && gt >= 0 && ft !== gt) {
              const Ge = G.slice(), Ie = Ge.splice(ft, 1)[0];
              Ge.splice(gt, 0, Ie), g.value = Ge, S = Kt, O = it;
            }
          }
        }
      }
      const Se = x.find((Y) => Y.classList.contains("launcher-page-tab"));
      if (Se) {
        const Y = Se.getAttribute("data-page");
        Y && Y !== le.activePage && Se.classList.add("drop-target");
      } else
        document.querySelectorAll(".launcher-page-tab.drop-target").forEach((Y) => Y.classList.remove("drop-target"));
    }
    async function Me(h) {
      if (h.pointerId === Q) {
        rt(), h.type === "pointercancel" ? ve() : Pe(h), window.removeEventListener("pointermove", Ke), window.removeEventListener("pointerup", Me), window.removeEventListener("pointercancel", Me);
        try {
          if (pe) {
            b = Date.now(), p = !1;
            const y = document.elementsFromPoint(h.clientX, h.clientY);
            if (document.querySelectorAll(".launcher-page-tab.drop-target").forEach((M) => M.classList.remove("drop-target")), document.querySelectorAll(".launcher-folder.drop-target").forEach((M) => M.classList.remove("drop-target")), Ti() && ct.activeFolder) {
              if (y.some(
                (G) => G.id === "launcher-folder-dialog" || !!G.closest?.("#launcher-folder-dialog")
              )) {
                const de = y.find((Se) => Se.hasAttribute("data-child-folder"))?.getAttribute("data-child-folder") || ct.activeFolder;
                E ? await $e.moveLinkTo(E, void 0, de) : F && await $e.moveFolderInto(F, de);
              }
              return;
            }
            const x = y.find((M) => M.classList.contains("launcher-page-tab"));
            if (x) {
              const M = x.getAttribute("data-page");
              if (M) {
                E ? (await $e.moveLinkTo(E, M, "常用网站"), await $e.setPage(M)) : F && await $e.moveFolderToPage(F, M), ve();
                return;
              }
            }
            if (E) {
              const M = y.find((G) => G.classList.contains("launcher-folder"));
              if (M) {
                const G = M.getAttribute("data-launcher-folder");
                if (G) {
                  await $e.moveLinkTo(E, le.activePage, G), ve();
                  return;
                }
              }
            }
            if (g.value) {
              const M = g.value.map((G) => ({
                type: G.type,
                id: G.type === "link" ? String(G.link.id) : void 0,
                groupName: G.type === "folder" ? G.folder.groupName : void 0
              }));
              await $e.reorderPageItems(le.activePage, M);
            }
          }
        } catch (y) {
          ue.show({ appName: "常用网站", title: "移动未完成", message: y instanceof Error ? y.message : "请刷新核对，未自动重试。" });
        } finally {
          ve();
        }
      }
    }
    function ve() {
      rt(), Q = null, E = null, F = null, pe = !1, p = !1, f.value = null, $.value = null, g.value = null, C.visible = !1, C.link = null, C.folder = null, S = "", document.querySelector("#launcher-folder-dialog")?.classList.remove("drop-hover-valid"), ct.dropHoverValid = !1, window.removeEventListener("pointermove", Ke), window.removeEventListener("pointerup", Me), window.removeEventListener("pointercancel", Me);
    }
    yt(() => {
      xe.setExternalDragHandler(null), xe.setExternalDropHandler(null), ve(), window.removeEventListener("blur", l), window.removeEventListener("pagehide", l), document.removeEventListener("visibilitychange", l), window.removeEventListener("pointermove", Ke), window.removeEventListener("pointerup", Me), window.removeEventListener("pointercancel", Me);
    });
    function He(h) {
      const y = le.pageLabels;
      return y && y[h] ? y[h] : h || "常用网站";
    }
    function ze(h, y) {
      const x = String(h.page || "").trim(), M = String(y).trim(), G = le.pageLabels || {}, de = !x || x === "常用网站" || x === "默认";
      if (!M || M === "常用网站" || M === "默认") return de;
      if (de) return !1;
      if (x === M) return !0;
      const Y = G[x] || x, J = G[M] || M;
      return Y === J || x === J || Y === M;
    }
    function _e(h) {
      const y = le.groupSizes;
      return y && y[h] === "large" ? "large" : "small";
    }
    function Nn(h) {
      return h === "large" ? 9 : 4;
    }
    function On(h, y) {
      const x = Nn(y), M = h.length > x ? x - 1 : x;
      return h.slice(0, M);
    }
    const Ho = ae(() => {
      const h = le.activePage || "常用网站", x = le.links.filter(
        (Y) => ze(Y, h)
      ), M = /* @__PURE__ */ new Map();
      x.forEach((Y) => {
        const J = Y.group || "常用网站";
        J !== "常用网站" && (M.has(J) || M.set(J, []), M.get(J).push(Y));
      });
      const G = /* @__PURE__ */ new Set(), de = [];
      x.forEach((Y) => {
        const J = Y.group || "常用网站";
        Ii(le.folders, J) || (J === "常用网站" ? de.push({ key: `link-${Y.id}`, type: "link", link: Y }) : G.has(J) || (G.add(J), de.push({
          key: `folder-${J}`,
          type: "folder",
          folder: {
            groupName: J,
            pageName: h,
            links: M.get(J) || []
          }
        })));
      });
      const Se = le.folders;
      return Se && Object.entries(Se).forEach(([Y, J]) => {
        if (Ii(le.folders, Y)) return;
        const We = J?.page || "常用网站";
        (We === h || h === "常用网站" && We === "默认") && !G.has(Y) && (G.add(Y), de.push({
          key: `folder-${Y}`,
          type: "folder",
          folder: {
            groupName: Y,
            pageName: h,
            links: M.get(Y) || []
          }
        }));
      }), de;
    }), Ci = ae(() => g.value && g.value.length ? g.value : Ho.value), Rn = ae(() => {
      const h = le.activePage || "常用网站", y = He(h);
      return y === "默认" || h === "常用网站" ? "还没有快捷入口，点击“编辑入口”后添加。" : `“${y}”还是空的，把网站拖到这里。`;
    });
    function Li(h) {
      g.value = null, f.value = null, $.value = null, xe.switchPage(h);
    }
    function Bn() {
      _.value = !0, I.value = "", pt(() => {
        A.value?.focus();
      });
    }
    function Si() {
      if (!_.value) return;
      const h = I.value.trim();
      _.value = !1, h && xe.addPage(h);
    }
    function Hn(h) {
      h.key === "Enter" ? (h.preventDefault(), Si()) : h.key === "Escape" && (_.value = !1);
    }
    function Fn(h, y) {
      xe.openPageMenu(h, y);
    }
    function jn(h) {
      const y = h.target;
      if (!y || y.closest(".launcher-link") || y.closest(".launcher-folder") || y.closest(".launcher-page-tab") || y.closest("button") || y.closest("input"))
        return;
      h.preventDefault();
      const x = le.activePage || "常用网站";
      mi.openBlankMenu(x, h.clientX, h.clientY);
    }
    function Vn(h) {
      i.value === "sites" && (!h.shiftKey || le.pages.length < 2 || (h.preventDefault(), h.deltaY > 0 || h.deltaX > 0 ? xe.nextPage() : xe.prevPage()));
    }
    function Kn(h) {
      h.target.closest(".launcher-page-tab") || h.stopPropagation();
    }
    function zn(h) {
      h.button === 0 && (L = h.clientX, D = h.clientY);
    }
    function Gn(h, y) {
      if (y.preventDefault(), y.stopPropagation(), De.isEditingShortcuts) {
        De.handleLinkSelection(h);
        return;
      }
      Q || (p = !1), !(Math.hypot(y.clientX - L, y.clientY - D) >= 6 || p || Date.now() - b < 600) && xe.openLink(h, y);
    }
    function Un(h, y) {
      xe.openLinkMenu(h, y);
    }
    function Yn(h, y) {
      if (Q || (p = !1), p || Date.now() - b < 450) {
        y.preventDefault(), y.stopPropagation();
        return;
      }
      xe.openFolder(h, y);
    }
    function qn(h, y, x) {
      xe.openFolderMenu(h, y, x);
    }
    function Xn(h) {
      xe.deleteFolder(h);
    }
    function Jn(h, y) {
      const x = Array.from(y.dataTransfer?.types || []);
      if (!x.includes("application/x-newtab-launcher") && !x.includes("application/x-newtab-bookmark") && !x.includes("text/uri-list") && !x.includes("text/plain")) return;
      y.preventDefault(), y.dataTransfer && (y.dataTransfer.dropEffect = "move"), le.activePage !== h && Li(h), y.currentTarget?.classList.add("drop-target");
    }
    function Qn(h) {
      h.currentTarget?.classList.remove("drop-target");
    }
    async function Zn(h, y) {
      y.currentTarget?.classList.remove("drop-target");
      let M = "";
      const G = y.dataTransfer?.getData("application/x-newtab-launcher");
      if (G)
        try {
          M = String(JSON.parse(G)?.id || "");
        } catch {
        }
      if (!M && (f.value || window.__activeLauncherLink) && (M = String(window.__activeLauncherLink?.id || f.value || "")), M) {
        y.preventDefault(), y.stopPropagation(), await $e.moveLinkTo(M, h, "常用网站"), await $e.setPage(h);
        return;
      }
      const de = window;
      typeof de.importDroppedLauncherItem == "function" && (y.preventDefault(), y.stopPropagation(), await de.importDroppedLauncherItem(y, "常用网站", h));
    }
    function es(h) {
      const y = Array.from(h.dataTransfer?.types || []);
      if (!y.includes("application/x-newtab-launcher") && !y.includes("application/x-newtab-bookmark") && !y.includes("text/uri-list") && !y.includes("text/plain")) return;
      h.preventDefault(), h.dataTransfer && (h.dataTransfer.dropEffect = y.includes("application/x-newtab-launcher") ? "move" : "copy"), h.currentTarget?.classList.add("drop-target");
    }
    function ts(h) {
      const y = h.currentTarget;
      y?.contains(h.relatedTarget) || y?.classList.remove("drop-target");
    }
    async function os(h) {
      h.currentTarget?.classList.remove("drop-target");
      let x = "";
      const M = h.dataTransfer?.getData("application/x-newtab-launcher");
      if (M)
        try {
          x = String(JSON.parse(M)?.id || "");
        } catch {
        }
      if (!x && (f.value || window.__activeLauncherLink) && (x = String(window.__activeLauncherLink?.id || f.value || "")), x) {
        h.preventDefault(), h.stopPropagation(), await $e.moveLinkTo(x, le.activePage, "常用网站");
        return;
      }
      const G = window;
      if (typeof G.importDroppedLauncherItem == "function") {
        h.preventDefault(), h.stopPropagation(), await G.importDroppedLauncherItem(h, "常用网站", le.activePage);
        return;
      }
      const de = h.dataTransfer?.getData("text/plain");
      de && /^https?:\/\//i.test(de.trim()) && (h.preventDefault(), h.stopPropagation(), await $e.addLink({
        title: "",
        url: de.trim(),
        page: le.activePage
      }));
    }
    function Ti() {
      if (!ct.isOpen) return !1;
      if (typeof document < "u") {
        const h = document.querySelector("#launcher-folder-dialog");
        return !!(h && h.open);
      }
      return !1;
    }
    function is(h, y) {
      y.preventDefault();
    }
    function ns(h) {
      h.preventDefault(), h.dataTransfer && (h.dataTransfer.dropEffect = "move"), h.currentTarget?.classList.add("drop-target");
    }
    function ss(h) {
      h.currentTarget?.classList.remove("drop-target");
    }
    async function as(h, y) {
      y.currentTarget?.classList.remove("drop-target"), y.preventDefault(), y.stopPropagation();
      const M = y.dataTransfer?.getData("application/x-newtab-launcher-folder");
      if (M && M !== h) {
        try {
          await $e.moveFolderInto(M, h);
        } catch (Se) {
          ue.show({ appName: "常用网站", title: "移动未完成", message: Se instanceof Error ? Se.message : "请刷新后核对。" });
        }
        return;
      }
      let G = "";
      const de = y.dataTransfer?.getData("application/x-newtab-launcher");
      if (de)
        try {
          G = String(JSON.parse(de)?.id || "");
        } catch {
        }
      !G && (f.value || window.__activeLauncherLink) && (G = String(window.__activeLauncherLink?.id || f.value || "")), G && await $e.moveLinkTo(G, le.activePage, h);
    }
    return (h, y) => (c(), m(ee, null, [
      n("section", {
        class: re(["launcher-group launcher-sites size-large", { "home-module-hidden": !s(Ee).showSites }]),
        "aria-hidden": !s(Ee).showSites,
        inert: !s(Ee).showSites,
        onWheel: Vn
      }, [
        n("header", {
          class: "launcher-group-head launcher-sites-head",
          onPointerdown: y[5] || (y[5] = j(() => {
          }, ["stop"])),
          onContextmenu: Kn
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
              onClick: y[0] || (y[0] = (x) => i.value = "sites")
            }, u(s(d)("home.sites.favoriteSites")), 9, wc),
            n("button", {
              type: "button",
              disabled: a.value,
              "aria-pressed": i.value === "bookmarks",
              onClick: y[1] || (y[1] = (x) => i.value = "bookmarks")
            }, u(s(d)("home.sites.bookmarks")), 9, yc)
          ], 8, mc),
          St(n("div", {
            class: "launcher-page-tabs",
            role: "tablist",
            "aria-label": s(d)("home.sites.pagesAria")
          }, [
            (c(!0), m(ee, null, be(s(le).pages, (x) => (c(), m("button", {
              key: x,
              type: "button",
              class: re(["launcher-page-tab", { active: x === s(le).activePage }]),
              "data-page": x,
              role: "tab",
              title: s(d)("home.sites.pageTabTitle", { label: He(x) }),
              onPointerdown: y[2] || (y[2] = j(() => {
              }, ["stop"])),
              onClick: j((M) => Li(x), ["prevent", "stop"]),
              onContextmenu: j((M) => Fn(x, M), ["prevent", "stop"]),
              onDragover: (M) => Jn(x, M),
              onDragleave: y[3] || (y[3] = (M) => Qn(M)),
              onDrop: (M) => Zn(x, M)
            }, u(He(x)), 43, bc))), 128)),
            _.value ? St((c(), m("input", {
              key: 1,
              ref_key: "pageInputRef",
              ref: A,
              class: "launcher-page-input",
              maxlength: "12",
              placeholder: "例如：游戏区",
              "onUpdate:modelValue": y[4] || (y[4] = (x) => I.value = x),
              onKeydown: Hn,
              onBlur: Si
            }, null, 544)), [
              [Po, I.value]
            ]) : (c(), m("button", {
              key: 0,
              class: "launcher-page-add",
              type: "button",
              title: "添加网站分区，例如游戏区",
              "aria-label": "添加网站分区",
              onClick: Bn
            }, " + "))
          ], 8, vc), [
            [ci, i.value === "sites"]
          ]),
          i.value === "bookmarks" ? (c(), m("div", kc)) : P("", !0),
          n("button", {
            class: "launcher-page-help",
            type: "button",
            title: "使用指南：如何创建文件夹与整理网站",
            "aria-label": "使用指南与技巧",
            onClick: v
          }, " ? ")
        ], 32),
        i.value === "bookmarks" ? (c(), ne(s(t), {
          key: 0,
          "header-target": "#bookmark-board-header",
          onBusy: y[6] || (y[6] = (x) => a.value = x)
        })) : P("", !0),
        St(n("div", {
          class: "launcher-page-panel",
          "data-page": s(le).activePage,
          hidden: !1,
          role: "tabpanel",
          onContextmenu: jn,
          onDragover: y[12] || (y[12] = (x) => es(x)),
          onDragleave: y[13] || (y[13] = (x) => ts(x)),
          onDrop: y[14] || (y[14] = (x) => os(x))
        }, [
          (c(), ne(Mo, {
            tag: "div",
            class: "launcher-items launcher-site-items",
            key: s(le).activePage,
            name: f.value || $.value ? "launcher-grid" : ""
          }, {
            default: io(() => [
              (c(!0), m(ee, null, be(Ci.value, (x) => (c(), m(ee, {
                key: x.key
              }, [
                x.type === "link" ? (c(), m("a", {
                  key: x.key,
                  class: re(["launcher-link", {
                    "is-dragging": f.value === String(x.link.id),
                    "is-wheel-picked": s(De).isEditingShortcuts && s(De).isLinkInWheel(x.link.url)
                  }]),
                  href: x.link.url,
                  title: x.link.title + (x.link.note ? `
📝 ` + x.link.note : "") + `
🔗 ` + x.link.url,
                  "data-launcher-id": String(x.link.id),
                  target: "_blank",
                  rel: "noreferrer",
                  draggable: "false",
                  onDragstart: y[7] || (y[7] = j(() => {
                  }, ["prevent"])),
                  onPointerdown: (M) => ye(x.link, M),
                  onMousedown: y[8] || (y[8] = (M) => zn(M)),
                  onClick: j((M) => Gn(x.link, M), ["prevent"]),
                  onContextmenu: j((M) => Un(x.link, M), ["prevent"])
                }, [
                  X(Di, {
                    link: x.link
                  }, null, 8, ["link"])
                ], 42, xc)) : x.type === "folder" ? (c(), m("div", {
                  key: x.key,
                  class: re(["launcher-folder", [
                    `size-${_e(x.folder.groupName)}`,
                    { "is-dragging": $.value === x.folder.groupName }
                  ]]),
                  title: `${x.folder.groupName}
可拖动调整位置；右键调整收藏夹大小`,
                  role: "button",
                  tabindex: "0",
                  "data-launcher-folder": String(x.folder.groupName),
                  draggable: "true",
                  onPointerdown: (M) => ot(x.folder.groupName, x.folder, M),
                  onDragstart: (M) => is(x.folder.groupName, M),
                  onDragover: y[10] || (y[10] = (M) => ns(M)),
                  onDragleave: y[11] || (y[11] = (M) => ss(M)),
                  onDrop: (M) => as(x.folder.groupName, M),
                  onClick: (M) => Yn(x.folder.groupName, M),
                  onContextmenu: j((M) => qn(x.folder.groupName, x.folder.pageName, M), ["prevent"])
                }, [
                  X(Di, {
                    folder: { title: x.folder.groupName, preview: x.folder.links, count: x.folder.links.length },
                    size: _e(x.folder.groupName)
                  }, {
                    default: io(() => [
                      n("button", {
                        class: "launcher-folder-del-btn",
                        type: "button",
                        title: `删除文件夹「${x.folder.groupName}」`,
                        "aria-label": "删除文件夹",
                        onPointerdown: y[9] || (y[9] = j(() => {
                        }, ["stop"])),
                        onClick: j((M) => Xn(x.folder.groupName), ["stop", "prevent"])
                      }, " ✕ ", 40, Lc)
                    ]),
                    _: 2
                  }, 1032, ["folder", "size"]),
                  n("span", Sc, u(x.folder.links.length), 1)
                ], 42, Cc)) : P("", !0)
              ], 64))), 128)),
              Ci.value.length ? P("", !0) : (c(), m("p", Tc, u(Rn.value), 1))
            ]),
            _: 1
          }, 8, ["name"]))
        ], 40, _c), [
          [ci, i.value === "sites"]
        ])
      ], 42, gc),
      n("div", $c, [
        s(Ee).showHomeNews ? (c(), ne(fc, { key: 0 })) : P("", !0)
      ]),
      (c(), ne(Tt, { to: "body" }, [
        C.visible ? (c(), m("div", {
          key: 0,
          class: re(["launcher-drag-ghost", [
            C.type === "folder" ? `folder-ghost size-${C.folder?.size}` : "link-ghost"
          ]]),
          style: ke({
            left: `${C.x}px`,
            top: `${C.y}px`
          })
        }, [
          C.type === "folder" && C.folder ? (c(), m(ee, { key: 0 }, [
            n("div", Mc, [
              (c(!0), m(ee, null, be(On(C.folder.links, C.folder.size), (x, M) => (c(), ne(Pi, {
                key: x.id || M,
                link: x,
                mini: !0
              }, null, 8, ["link"]))), 128))
            ]),
            n("span", Ic, u(C.folder.groupName), 1)
          ], 64)) : C.link ? (c(), m(ee, { key: 1 }, [
            X(Pi, {
              link: C.link
            }, null, 8, ["link"]),
            n("span", Ac, u(C.link.title), 1)
          ], 64)) : P("", !0)
        ], 6)) : P("", !0)
      ])),
      X(s(o), {
        open: r.value,
        onClose: k
      }, null, 8, ["open"])
    ], 64));
  }
}), Dn = /* @__PURE__ */ Re(Ec, [["__scopeId", "data-v-0770683e"]]), To = Object.keys(Ee);
let vo = !1, oi = 0, Jt, ii;
function Xi(e) {
  for (const t of To)
    Object.prototype.hasOwnProperty.call(e, t) && (Ee[t] = e[t] !== !1);
}
function Dc() {
  const e = Ee;
  xe.setPrefs(e.showSites, e.showTodo, !e.showTodo && e.showBili), document.body.classList.toggle("hide-weather", !e.showWeather), document.body.classList.toggle("hide-sites", !e.showSites), document.body.classList.toggle("hide-bili", !e.showBili), document.body.classList.toggle("hide-todo", !e.showTodo), document.body.classList.toggle("hide-bookmarks", !e.showBookmarkPanel), e.showBookmarkPanel || No.close();
}
const Ji = {
  start() {
    if (vo) return;
    vo = !0;
    const e = ++oi;
    ii = tt(() => To.map((o) => Ee[o]), Dc, { immediate: !0, flush: "sync" });
    const t = globalThis.chrome;
    Jt = (o, i) => {
      if (i !== "local") return;
      const a = {};
      for (const r of To) o[r] && (a[r] = o[r].newValue);
      Xi(a);
    }, t?.storage?.onChanged?.addListener(Jt), t?.storage?.local && t.storage.local.get(To).then((o) => {
      vo && oi === e && Xi(o || {});
    }).catch((o) => console.warn("[HomePrefs] 读取首页设置失败", o));
  },
  stop() {
    vo = !1, oi++, ii?.(), ii = void 0, Jt && globalThis.chrome?.storage?.onChanged?.removeListener(Jt), Jt = void 0;
  }
}, Pc = { class: "launcher-inner" }, Wc = { class: "launcher-overview" }, Nc = ["aria-hidden", "inert", "title"], Oc = { class: "card-head" }, Rc = { id: "wx-title" }, Bc = { id: "weather-body" }, Hc = { class: "launcher-center" }, Fc = {
  class: "hero-clock",
  id: "hero-clock"
}, jc = ["aria-hidden", "inert"], Vc = { class: "card-head" }, Kc = {
  id: "task-thread-home",
  class: "task-thread-home home-music-body"
}, zc = {
  id: "launcher-groups",
  class: "launcher-groups has-sites has-media"
}, Gc = /* @__PURE__ */ he({
  __name: "AppLauncher",
  setup(e) {
    const t = fe({ sitesTransparency: 6, weatherTransparency: 6, newsTransparency: 6, playerTransparency: 6 }), o = Object.keys(t);
    function i(r, v) {
      t[r] = typeof v == "number" && Number.isFinite(v) ? Math.max(0, Math.min(80, v)) : 6;
    }
    function a(r, v) {
      if (v === "local")
        for (const k of o) r[k] && i(k, r[k].newValue);
    }
    return Ve(() => {
      Io.initWallpaper(), typeof chrome < "u" && chrome.storage?.local && (chrome.storage.local.get(o).then((r) => {
        for (const v of o) i(v, r[v]);
      }), chrome.storage.onChanged.addListener(a));
    }), yt(() => {
      typeof chrome < "u" && chrome.storage?.onChanged && chrome.storage.onChanged.removeListener(a);
    }), (r, v) => (c(), m("section", {
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
      v[3] || (v[3] = n("div", {
        id: "hero-background-media",
        class: "hero-background-media",
        "aria-hidden": "true"
      }, null, -1)),
      n("div", Pc, [
        n("div", Wc, [
          n("section", {
            class: re(["launcher-widget launcher-weather", { "home-module-hidden": !s(Ee).showWeather }]),
            "aria-hidden": !s(Ee).showWeather,
            inert: !s(Ee).showWeather,
            "data-home-module": "weather",
            title: s(d)("weather.widgetSwitchTip")
          }, [
            n("header", Oc, [
              v[1] || (v[1] = n("span", {
                class: "bar",
                style: { background: "linear-gradient(180deg,#38bdf8,#818cf8)" }
              }, null, -1)),
              n("h2", Rc, u(s(d)("weather.widgetTitle")), 1)
            ]),
            n("div", Bc, [
              s(Ee).showWeather ? (c(), ne(In, { key: 0 })) : P("", !0)
            ])
          ], 10, Nc),
          n("div", Hc, [
            n("div", Fc, [
              X(yl),
              X(An)
            ]),
            n("form", {
              id: "search",
              class: "search",
              onSubmit: v[0] || (v[0] = j(() => {
              }, ["prevent"]))
            }, [
              X(nn)
            ], 32)
          ]),
          n("section", {
            class: re(["launcher-widget launcher-task-threads launcher-music-card", { "home-module-hidden": !s(Ee).showHomePlayer }]),
            "aria-hidden": !s(Ee).showHomePlayer,
            inert: !s(Ee).showHomePlayer,
            "data-home-module": "taskThreads"
          }, [
            n("header", Vc, [
              v[2] || (v[2] = n("span", { class: "bar music-purple" }, null, -1)),
              n("h2", null, u(s(d)("home.music.player")), 1)
            ]),
            n("div", Kc, [
              s(Ee).showHomePlayer ? (c(), ne(En, { key: 0 })) : P("", !0)
            ])
          ], 10, jc)
        ]),
        n("div", zc, [
          X(Dn)
        ])
      ]),
      v[4] || (v[4] = n("input", {
        id: "background-input",
        type: "file",
        accept: "image/*,video/mp4,video/webm,.gif,.mp4,.webm",
        multiple: "",
        hidden: ""
      }, null, -1))
    ], 4));
  }
}), Ft = fe(/* @__PURE__ */ new Set()), bt = fe({}), Fe = fe({});
function ni(e) {
  const t = je(e);
  if (!t?.lifecycle.canUnmount || t.lifecycle.canUnmount()) return { ok: !0 };
  const o = t.lifecycle.unmountBlockedMessage || "模块操作尚未结束，不能退出或重载。";
  return ue.show({ appName: t.title, title: "操作进行中", message: o, showActions: !1 }), { ok: !1, error: o };
}
const Le = {
  // 检查应用是否处于运行显示状态（驱动 Dock 上的小圆点：关闭即熄灭，不保留 macOS 风格后台悬浮绿点）
  isRunning(e) {
    return this.isVisible(e);
  },
  // 检查应用当前是否在屏幕上可见（窗口是否打开）
  isVisible(e) {
    const t = je(e);
    return t ? t.lifecycle.isVisible() : zo(e) ? !!Os[e] : Rs(e);
  },
  // 标记应用启动
  markRunning(e) {
    Ft.add(e), (e in Fe || je(e)) && (Fe[e] = !0);
  },
  // 获取组件当前的 render key
  getRenderKey(e) {
    return bt[e] || 0;
  },
  // 打开 / 显示应用窗口
  openApp(e) {
    const t = je(e);
    if (t) {
      Ce.open(e), t.lifecycle.isVisible() && this.markRunning(e);
      return;
    }
    if (this.markRunning(e), zo(e)) {
      Ei.open(e);
      return;
    }
    Ce.open(e);
  },
  // 隐藏/关闭窗口：立即退出可见运行态并熄灭 Dock 指示绿点
  hideApp(e) {
    if (Ft.delete(e), je(e)) {
      Ce.close(e);
      return;
    }
    if (zo(e)) {
      Ei.close(e);
      return;
    }
    Ce.close(e);
  },
  // 真正的关闭（Quit / 彻底从内存与 DOM 中卸载销毁，熄灭小圆点）
  async quitApp(e) {
    if (je(e)) {
      const a = ni(e);
      if (!a.ok) return a;
      const r = je(e)?.lifecycle.beforeQuit;
      if (r) {
        const l = vt(e);
        try {
          await r();
        } catch {
          const I = "后台停止未确认，窗口保留；未自动重试，请检查后台状态。";
          return ue.show({ appName: je(e).title, title: "未退出", message: I, showActions: !1 }), { ok: !1, error: I };
        }
        if (vt(e) !== l) return { ok: !1, error: "窗口已有后续操作，未卸载。" };
        const _ = ni(e);
        if (!_.ok) return _;
      }
      const v = Ce.close(e), k = vt(e);
      return Ft.delete(e), Fe[e] = !1, ut.removeActiveTool(e), await v, await pt(), vt(e) === k ? { ok: !0 } : { ok: !1, error: "模块已有后续操作，退出状态已变化。" };
    }
    this.hideApp(e), Ft.delete(e), ut.removeActiveTool(e), e in Fe && (Fe[e] = !1);
    const t = Ns;
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
      const o = ni(e);
      if (!o.ok) return o;
      const i = Ce.close(e), a = vt(e);
      return await i, vt(e) !== a ? { ok: !1, error: "模块已有后续操作，重载已取消。" } : (Fe[e] = !1, await pt(), vt(e) !== a ? { ok: !1, error: "模块已有后续操作，未重新打开。" } : (bt[e] = (bt[e] || 0) + 1, Ce.open(e), t.lifecycle.isVisible() ? (this.markRunning(e), { ok: !0 }) : { ok: !1, error: "模块当前不能打开，未重新显示窗口。" }));
    }
    this.hideApp(e), e in Fe ? (Fe[e] = !1, await pt(), bt[e] = (bt[e] || 0) + 1, Fe[e] = !0) : bt[e] = (bt[e] || 0) + 1, await pt(), this.openApp(e);
  }
}, Qt = /* @__PURE__ */ he({
  __name: "DockCardModuleHost",
  props: {
    id: {}
  },
  setup(e) {
    const o = je(e.id);
    if (!o || o.presentation !== "card") throw new Error("Unknown registered workspace card");
    const i = o;
    i.mountPolicy === "workspace-ready" && Le.markRunning(i.id), tt(i.lifecycle.isVisible, (_) => {
      _ && Le.markRunning(i.id);
    }, { immediate: !0, flush: "sync" });
    const a = ae(() => !!Fe[i.id]);
    function r() {
      try {
        i.lifecycle.hide();
      } catch {
      }
      (ht.activeId === i.id || ht.activeId === i.rootId) && (ht.activeId = null), Le.hideApp(i.id), un(ht.activeId);
    }
    function v() {
      Le.reloadApp(i.id);
    }
    function k() {
      typeof window < "u" && window.location.reload();
    }
    const l = H({
      loader: i.loadView,
      onError(_, I, A, f) {
        f <= 2 ? I() : A();
      },
      errorComponent: he({
        setup: () => () => i.lifecycle.isVisible() ? Ae("section", { class: "card wide card-fullscreen", role: "alert" }, [
          Ae("h2", i.title),
          Ae("p", "工作区切片加载受阻（可能因插件重载或切片更新）。可点击「重新加载模块」，或返回首页。"),
          Ae("div", { style: "display: flex; gap: 10px; margin-top: 14px;" }, [
            Ae("button", {
              type: "button",
              style: "padding: 6px 14px; border-radius: 999px; border: 1px solid var(--border); background: var(--primary, #3b82f6); color: #fff; cursor: pointer; font-size: 12px; font-weight: 500;",
              onClick: k
            }, "⟳ 刷新标签页 (加载最新版)"),
            Ae("button", {
              type: "button",
              style: "padding: 6px 14px; border-radius: 999px; border: 1px solid var(--border); background: var(--surface); color: var(--text); cursor: pointer; font-size: 12px;",
              onClick: v
            }, "↻ 重新加载模块"),
            Ae("button", {
              type: "button",
              style: "padding: 6px 14px; border-radius: 999px; border: 1px solid var(--border); background: var(--surface); color: var(--text); cursor: pointer; font-size: 12px;",
              onClick: r
            }, "返回首页")
          ])
        ]) : null
      })
    });
    return so(() => {
      r(), Ft.delete(i.id), delete Fe[i.id];
    }), (_, I) => a.value ? (c(), ne(sn(s(l)), {
      key: s(Le).getRenderKey(s(i).id)
    })) : P("", !0);
  }
}), Uc = { class: "logicweaver-workspaces-layer" }, Yc = {
  key: 0,
  id: "daily-section",
  class: "wrap"
}, qc = { id: "vue-todoist-root" }, Xc = { id: "vue-bili-favorites-root" }, Jc = { id: "vue-aihot-root" }, Qc = ["hidden"], Zc = /* @__PURE__ */ he({
  __name: "AppWorkspaces",
  setup(e) {
    const t = q(!!ht.activeId);
    return Ve(() => {
      t.value || (typeof window < "u" && "requestIdleCallback" in window ? window.requestIdleCallback(() => {
        t.value = !0;
      }, { timeout: 80 }) : setTimeout(() => {
        t.value = !0;
      }, 40));
    }), (o, i) => (c(), m("div", Uc, [
      t.value ? (c(), m("main", Yc, [
        n("div", qc, [
          X(Qt, { id: "todoist" })
        ]),
        n("div", Xc, [
          X(Qt, { id: "daily-bilibili" })
        ]),
        n("div", Jc, [
          X(Qt, { id: "daily-aihot" })
        ]),
        n("div", {
          id: "vue-multica-root",
          hidden: s(ht).activeId !== "multica"
        }, [
          X(Qt, { id: "multica" })
        ], 8, Qc),
        X(Qt, { id: "card-github" })
      ])) : P("", !0)
    ]));
  }
}), ed = /* @__PURE__ */ Re(Zc, [["__scopeId", "data-v-0799b753"]]), td = ["aria-label"], od = { class: "dock-menu-head" }, id = { class: "dock-menu-title" }, nd = ["src", "alt"], sd = {
  key: 1,
  class: "dock-menu-emoji"
}, ad = { class: "dock-menu-text" }, rd = { class: "dock-menu-text" }, ld = { class: "dock-menu-text" }, cd = /* @__PURE__ */ he({
  __name: "DockContextMenu",
  props: {
    target: {}
  },
  emits: ["close", "action"],
  setup(e, { emit: t }) {
    const o = e, i = t, a = ae(() => !o.target || o.target.type !== "tool" ? !1 : Le.isRunning(o.target.id)), r = ae(() => !o.target || o.target.type !== "tool" ? !1 : Le.isVisible(o.target.id)), { menuRef: v, style: k } = oa({
      visible: () => !!o.target,
      anchor: () => o.target || { x: 0, y: 0 },
      placement: Wt.position === "top" ? "below" : "above",
      align: "center",
      gap: 12,
      dismiss: () => i("close")
    });
    function l() {
      o.target && (Le.openApp(o.target.id), i("close"));
    }
    function _() {
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
      ue.show({
        appName: g.title,
        title: d("dock.quitDone"),
        subtitle: d("dock.quitSubtitle"),
        icon: g.icon || "assets/logo.png",
        duration: 2800
      }), i("close");
    }
    async function f() {
      if (!o.target) return;
      const g = o.target, p = _t.uninstall(g.id);
      i("close"), await p || ue.show({
        appName: g.title,
        title: "入口停用未确认",
        subtitle: _t.state.errorMessage || "请打开模块管理核对当前启用状态",
        icon: g.icon || "assets/logo.png",
        duration: 4e3
      });
    }
    function $() {
      if (!o.target) return;
      const p = {
        "daily-bilibili": "https://www.bilibili.com",
        "card-github": "https://github.com",
        "daily-aihot": "https://news.ycombinator.com"
      }[o.target.id] || "https://www.bilibili.com";
      window.open(p, "_blank"), i("close");
    }
    return (g, p) => (c(), ne(Tt, { to: "body" }, [
      e.target ? (c(), m("div", {
        key: 0,
        ref_key: "menuRef",
        ref: v,
        role: "group",
        "aria-label": `${e.target.title}操作`,
        class: "dock-context-menu",
        style: ke(s(k)),
        onClick: p[1] || (p[1] = j(() => {
        }, ["stop"])),
        onContextmenu: p[2] || (p[2] = j(() => {
        }, ["prevent"]))
      }, [
        n("div", od, [
          n("div", id, [
            e.target.icon ? (c(), m("img", {
              key: 0,
              class: "dock-menu-icon",
              src: e.target.icon,
              alt: e.target.title
            }, null, 8, nd)) : e.target.emoji ? (c(), m("span", sd, u(e.target.emoji), 1)) : P("", !0),
            n("strong", null, u(e.target.title), 1)
          ]),
          e.target.type === "tool" ? (c(), m("span", {
            key: 0,
            class: re(["dock-status-tag", { "is-running": a.value }])
          }, [
            p[3] || (p[3] = n("span", { class: "dock-status-dot" }, null, -1)),
            nt(" " + u(a.value ? s(d)("dock.menu.running") : s(d)("dock.menu.notStarted")), 1)
          ], 2)) : P("", !0)
        ]),
        p[12] || (p[12] = n("div", { class: "dock-menu-divider" }, null, -1)),
        e.target.type === "tool" ? (c(), m(ee, { key: 0 }, [
          r.value ? (c(), m("button", {
            key: 1,
            type: "button",
            class: "dock-menu-item",
            onClick: _
          }, [
            p[5] || (p[5] = n("span", { class: "dock-menu-symbol" }, "−", -1)),
            n("span", null, u(s(d)("dock.menu.hideWindow")), 1)
          ])) : (c(), m("button", {
            key: 0,
            type: "button",
            class: "dock-menu-item",
            onClick: l
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
            n("div", ad, [
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
            n("div", rd, [
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
            n("div", ld, [
              n("span", null, u(s(d)("dock.menu.quitApp")), 1),
              n("small", null, u(s(d)("dock.menu.quitSub")), 1)
            ])
          ])
        ], 64)) : e.target.type === "card" ? (c(), m("button", {
          key: 1,
          type: "button",
          class: "dock-menu-item",
          onClick: $
        }, [
          p[10] || (p[10] = n("span", { class: "dock-menu-symbol" }, "↗", -1)),
          n("span", null, u(s(d)("dock.menu.openOfficial")), 1)
        ])) : (c(), m("button", {
          key: 2,
          type: "button",
          class: "dock-menu-item",
          onClick: p[0] || (p[0] = (b) => i("close"))
        }, [...p[11] || (p[11] = [
          n("span", { class: "dock-menu-symbol" }, "🏠", -1),
          n("span", null, "返回常用主页", -1)
        ])]))
      ], 44, td)) : P("", !0)
    ]));
  }
}), dd = /* @__PURE__ */ Re(cd, [["__scopeId", "data-v-1db4d5bf"]]), ud = { class: "mac-dock-shelf" }, pd = ["data-dock-target", "title", "onPointerdown", "onClick", "onContextmenu"], hd = ["src", "alt"], fd = {
  key: 0,
  class: "mac-dock-dot",
  "aria-hidden": "true"
}, gd = ["title"], md = ["alt"], wd = ["data-dock-tool", "title", "onPointerdown", "onClick", "onContextmenu"], yd = ["src", "alt"], vd = {
  key: 1,
  class: "mac-dock-emoji",
  "aria-hidden": "true"
}, bd = {
  key: 2,
  class: "mac-dock-dot",
  "aria-hidden": "true"
}, kd = {
  key: 3,
  class: "mac-dock-badge"
}, _d = ["title"], xd = ["src"], Cd = {
  key: 1,
  class: "mac-dock-emoji"
}, Ld = /* @__PURE__ */ he({
  __name: "MacDock",
  setup(e) {
    const t = ae(() => Wt), o = q(null), i = ae(() => Object.fromEntries(Wt.tools.map((W) => {
      const N = je(W.id)?.badgeCount?.() || 0;
      return [W.id, Number.isFinite(N) ? Math.max(0, Math.floor(N)) : 0];
    })));
    function a(W) {
      W.stopPropagation(), o.value = null, A(W.currentTarget), _t.state.isOpen ? _t.close() : _t.open();
    }
    function r(W, N) {
      N.stopPropagation(), o.value = null, A(N.currentTarget), ut.triggerItem("target", W);
    }
    function v(W, N) {
      const F = N.currentTarget.getBoundingClientRect(), pe = Wt.position, ye = pe === "left" || pe === "right";
      o.value = {
        type: "card",
        id: W.id,
        title: W.title,
        icon: W.icon,
        x: ye ? pe === "left" ? F.right + 8 : F.left - 8 : F.left + F.width / 2,
        y: ye ? F.top + F.height / 2 : pe === "top" ? F.bottom + 8 : F.top
      };
    }
    function k(W) {
      W.stopPropagation(), o.value = null, A(W.currentTarget), ut.triggerItem("home", "home-launcher");
    }
    function l(W, N) {
      N.stopPropagation(), o.value = null, A(N.currentTarget), je(W) || Le.markRunning(W), ut.triggerItem("tool", W);
    }
    function _(W, N) {
      const F = N.currentTarget.getBoundingClientRect(), pe = Wt.position, ye = pe === "left" || pe === "right";
      o.value = {
        type: "tool",
        id: W.id,
        title: W.title,
        icon: W.icon,
        emoji: W.emoji,
        x: ye ? pe === "left" ? F.right + 8 : F.left - 8 : F.left + F.width / 2,
        y: ye ? F.top + F.height / 2 : pe === "top" ? F.bottom + 8 : F.top
      };
    }
    const I = /* @__PURE__ */ new Map();
    function A(W) {
      if (!W || (I.get(W)?.cancel(), window.matchMedia("(prefers-reduced-motion: reduce)").matches)) return;
      const N = W.animate([
        { translate: "0 0", offset: 0 },
        { translate: "0 -8px", offset: 0.35 },
        { translate: "0 0", offset: 0.65 },
        { translate: "0 -2px", offset: 0.85 },
        { translate: "0 0", offset: 1 }
      ], { duration: 350, easing: "ease" });
      I.set(W, N);
      const E = () => {
        I.get(W) === N && I.delete(W);
      };
      N.onfinish = E, N.oncancel = E;
    }
    const f = q(null), $ = fe({
      visible: !1,
      x: 0,
      y: 0,
      width: 40,
      height: 40,
      item: null,
      type: "tool"
    }), g = q(null), p = q(null), b = ae(() => g.value || t.value.cards), L = ae(() => p.value || t.value.tools);
    let D = "", S = 0, O = !1, V = 0;
    function se(W, N, E) {
      if (E.button !== 0 || E.target.closest(".mac-dock-market-btn")) return;
      const ye = E.currentTarget.getBoundingClientRect();
      O = !1, f.value = {
        type: W,
        id: N.id,
        item: N,
        startX: E.clientX,
        startY: E.clientY,
        initialLeft: ye.left,
        initialTop: ye.top,
        width: ye.width,
        height: ye.height
      }, window.addEventListener("pointermove", T), window.addEventListener("pointerup", w), window.addEventListener("pointercancel", w);
    }
    function T(W) {
      if (!f.value) return;
      const N = W.clientX - f.value.startX, E = W.clientY - f.value.startY, F = Math.hypot(N, E);
      if (!O && F > 5 && (O = !0, $.visible = !0, $.item = f.value.item, $.type = f.value.type, $.width = f.value.width, $.height = f.value.height, f.value.type === "card" ? g.value = [...t.value.cards] : p.value = [...t.value.tools]), !O) return;
      $.x = W.clientX - $.width / 2, $.y = W.clientY - $.height / 2;
      const ye = document.elementsFromPoint(W.clientX, W.clientY).find(
        (Pe) => Pe.classList.contains("mac-dock-item") && !Pe.classList.contains("mac-dock-market-btn")
      );
      if (!ye) return;
      const ot = ye.getAttribute("data-dock-target"), Be = ye.getAttribute("data-dock-tool"), at = f.value.type, rt = f.value.id, Ke = Date.now();
      if (at === "card" && ot && ot !== rt && ot !== "home-launcher") {
        const Pe = ye.getBoundingClientRect(), Me = Pe.left + Pe.width / 2;
        if (Math.abs(W.clientX - Me) > Pe.width * 0.55 || ot === D && Ke - S < 180) return;
        const ve = [...g.value || t.value.cards], He = ve.findIndex((_e) => _e.id === rt), ze = ve.findIndex((_e) => _e.id === ot);
        if (He >= 0 && ze >= 0 && He !== ze) {
          const _e = ve.splice(He, 1)[0];
          ve.splice(ze, 0, _e), g.value = ve, D = ot, S = Ke;
        }
      } else if (at === "tool" && Be && Be !== rt) {
        const Pe = ye.getBoundingClientRect(), Me = Pe.left + Pe.width / 2;
        if (Math.abs(W.clientX - Me) > Pe.width * 0.55 || Be === D && Ke - S < 180) return;
        const ve = [...p.value || t.value.tools], He = ve.findIndex((_e) => _e.id === rt), ze = ve.findIndex((_e) => _e.id === Be);
        if (He >= 0 && ze >= 0 && He !== ze) {
          const _e = ve.splice(He, 1)[0];
          ve.splice(ze, 0, _e), p.value = ve, D = Be, S = Ke;
        }
      }
    }
    function w() {
      window.removeEventListener("pointermove", T), window.removeEventListener("pointerup", w), window.removeEventListener("pointercancel", w), O && f.value && (V = Date.now() + 250, f.value.type === "card" && g.value ? ut.reorderCards(g.value.map((W) => W.id)) : f.value.type === "tool" && p.value && ut.reorderTools(p.value.map((W) => W.id))), $.visible = !1, $.item = null, g.value = null, p.value = null, f.value = null, O = !1, D = "";
    }
    function C(W, N) {
      Date.now() < V || r(W, N);
    }
    function Q(W, N) {
      Date.now() < V || l(W, N);
    }
    return so(() => {
      for (const W of I.values()) W.cancel();
      I.clear(), window.removeEventListener("pointermove", T), window.removeEventListener("pointerup", w), window.removeEventListener("pointercancel", w);
    }), (W, N) => (c(), m(ee, null, [
      n("div", ud, [
        X(Mo, {
          tag: "div",
          class: "mac-dock-group mac-dock-cards-group",
          name: "dock-item-motion"
        }, {
          default: io(() => [
            (c(!0), m(ee, null, be(b.value, (E) => (c(), m("button", {
              key: E.id,
              class: re(["mac-dock-item", {
                "is-active": t.value.activeTargetId === E.id,
                "is-drag-origin": f.value && f.value.id === E.id
              }]),
              type: "button",
              "data-dock-target": E.id,
              title: E.title,
              onPointerdown: (F) => se("card", E, F),
              onClick: j((F) => C(E.id, F), ["stop"]),
              onContextmenu: j((F) => v(E, F), ["prevent"])
            }, [
              n("img", {
                class: "mac-dock-icon",
                src: E.icon,
                alt: E.title
              }, null, 8, hd),
              t.value.activeTargetId === E.id ? (c(), m("span", fd)) : P("", !0)
            ], 42, pd))), 128))
          ]),
          _: 1
        }),
        N[6] || (N[6] = n("div", {
          class: "mac-dock-divider",
          "aria-hidden": "true"
        }, null, -1)),
        n("button", {
          class: "mac-dock-item",
          type: "button",
          "data-dock-target": "home-launcher",
          title: s(d)("dock.home"),
          onClick: N[0] || (N[0] = j((E) => k(E), ["stop"]))
        }, [
          n("img", {
            class: "mac-dock-icon",
            src: "assets/nav-home.svg",
            alt: s(d)("dock.home")
          }, null, 8, md)
        ], 8, gd),
        N[7] || (N[7] = n("div", {
          class: "mac-dock-divider mac-dock-divider-dark",
          "aria-hidden": "true"
        }, null, -1)),
        X(Mo, {
          tag: "div",
          class: "mac-dock-group mac-dock-tools-group",
          name: "dock-item-motion"
        }, {
          default: io(() => [
            (c(!0), m(ee, null, be(L.value, (E) => (c(), m("button", {
              key: E.id,
              class: re(["mac-dock-item", {
                "is-active": s(Le).isRunning(E.id),
                "is-drag-origin": f.value && f.value.id === E.id
              }]),
              type: "button",
              "data-dock-tool": E.id,
              title: E.title,
              onPointerdown: (F) => se("tool", E, F),
              onClick: j((F) => Q(E.id, F), ["stop"]),
              onContextmenu: j((F) => _(E, F), ["prevent"])
            }, [
              E.icon ? (c(), m("img", {
                key: 0,
                class: "mac-dock-icon",
                src: E.icon,
                alt: E.title
              }, null, 8, yd)) : E.emoji ? (c(), m("span", vd, u(E.emoji), 1)) : P("", !0),
              s(Le).isRunning(E.id) ? (c(), m("span", bd)) : P("", !0),
              i.value[E.id] > 0 ? (c(), m("span", kd, u(i.value[E.id] > 99 ? "99+" : i.value[E.id]), 1)) : P("", !0)
            ], 42, wd))), 128))
          ]),
          _: 1
        }),
        n("button", {
          class: "mac-dock-item",
          type: "button",
          title: "设置",
          "aria-label": "设置",
          onClick: N[1] || (N[1] = j((E) => s(ao).toggle(), ["stop"]))
        }, [...N[4] || (N[4] = [
          n("span", {
            class: "mac-dock-emoji",
            "aria-hidden": "true"
          }, "⚙️", -1)
        ])]),
        n("button", {
          class: re(["mac-dock-item mac-dock-market-btn", { "is-active": s(_t).state.isOpen }]),
          type: "button",
          title: s(d)("dock.market"),
          onClick: N[2] || (N[2] = j((E) => a(E), ["stop"]))
        }, [...N[5] || (N[5] = [
          n("span", {
            class: "mac-dock-market-icon",
            "aria-hidden": "true"
          }, "🧩", -1)
        ])], 10, _d)
      ]),
      (c(), ne(Tt, { to: "body" }, [
        $.visible && $.item ? (c(), m("div", {
          key: 0,
          class: "mac-dock-drag-ghost",
          style: ke({
            width: $.width + "px",
            height: $.height + "px",
            transform: "translate3d(" + $.x + "px," + $.y + "px, 0)"
          }),
          "aria-hidden": "true"
        }, [
          $.item.icon ? (c(), m("img", {
            key: 0,
            class: "mac-dock-icon",
            src: $.item.icon,
            alt: ""
          }, null, 8, xd)) : $.item.emoji ? (c(), m("span", Cd, u($.item.emoji), 1)) : P("", !0)
        ], 4)) : P("", !0)
      ])),
      X(dd, {
        target: o.value,
        onClose: N[3] || (N[3] = (E) => o.value = null)
      }, null, 8, ["target"])
    ], 64));
  }
}), Pn = /* @__PURE__ */ Re(Ld, [["__scopeId", "data-v-be0b1a30"]]), Sd = {
  id: "win-toast-container",
  class: "win-toast-container",
  "aria-live": "polite",
  "aria-relevant": "additions"
}, Td = ["data-toast-fingerprint", "onMouseenter", "onMouseleave"], $d = { class: "win-toast-head" }, Md = ["src"], Id = { class: "win-toast-app" }, Ad = { class: "win-toast-time" }, Ed = ["title", "aria-label", "onClick"], Dd = ["onClick"], Pd = { class: "win-toast-title" }, Wd = {
  key: 0,
  class: "win-toast-subtitle"
}, Nd = {
  key: 1,
  class: "win-toast-snippet"
}, Od = {
  key: 0,
  class: "win-toast-actions"
}, Rd = ["onClick"], Bd = ["onClick"], Hd = /* @__PURE__ */ he({
  __name: "NotificationHost",
  setup(e) {
    const t = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), a = q({}), r = q({});
    let v = null;
    function k(g) {
      const p = t.get(g);
      p !== void 0 && clearTimeout(p), t.delete(g);
    }
    function l(g, p = g.duration) {
      k(g.id), i.set(g.id, p), o.set(g.id, Date.now()), r.value[g.id] = !1, a.value[g.id] = Math.max(0, Math.min(100, p / g.duration * 100)), pt(() => requestAnimationFrame(() => {
        a.value[g.id] = 0;
      })), t.set(g.id, window.setTimeout(() => {
        t.delete(g.id), ue.close(g.id);
      }, p));
    }
    function _(g) {
      k(g.id);
      const p = Date.now() - (o.get(g.id) || Date.now()), b = Math.max(0, (i.get(g.id) ?? g.duration) - p);
      i.set(g.id, b), r.value[g.id] = !0, a.value[g.id] = Math.max(0, Math.min(100, b / g.duration * 100));
    }
    function I(g) {
      l(g, Math.max(1500, i.get(g.id) ?? g.duration));
    }
    function A(g) {
      k(g.id), ue.close(g.id);
    }
    function f(g) {
      if (no.markRead(g.historyId || g.id), A(g), !g.onClick) {
        g.target && no.openTarget(g.target);
        return;
      }
      try {
        Promise.resolve(g.onClick()).catch((p) => console.warn("Notification action failed", p));
      } catch (p) {
        console.warn("Notification action failed", p);
      }
    }
    function $(g) {
      const p = Math.max(500, i.get(g.id) ?? g.duration);
      return {
        width: `${a.value[g.id] ?? 100}%`,
        transition: r.value[g.id] ? "none" : `width ${p}ms linear`
      };
    }
    return Ve(() => {
      v = new MutationObserver(() => {
        const p = new Set(ro.map((b) => b.id));
        for (const b of ro)
          !b.closing && !t.has(b.id) && !i.has(b.id) && l(b);
        for (const b of i.keys())
          p.has(b) || (k(b), i.delete(b), o.delete(b), delete a.value[b], delete r.value[b]);
      });
      const g = document.getElementById("win-toast-container");
      g && v.observe(g, { childList: !0 });
      for (const p of ro) l(p);
    }), so(() => {
      v?.disconnect(), v = null;
      for (const g of t.values()) clearTimeout(g);
      t.clear();
    }), (g, p) => (c(), ne(Tt, { to: "body" }, [
      n("div", Sd, [
        X(Mo, { name: "win-toast" }, {
          default: io(() => [
            (c(!0), m(ee, null, be(s(ro), (b) => (c(), m("article", {
              key: b.id,
              class: re(["win-toast-card", [b.appType, { closing: b.closing }]]),
              "data-toast-fingerprint": b.fingerprint,
              onMouseenter: (L) => _(b),
              onMouseleave: (L) => I(b)
            }, [
              n("header", $d, [
                n("img", {
                  src: b.icon,
                  class: "win-toast-icon",
                  alt: ""
                }, null, 8, Md),
                n("span", Id, u(b.appName), 1),
                n("span", Ad, u(s(d)("notifications.justNow")), 1),
                n("button", {
                  type: "button",
                  class: "win-toast-close",
                  title: s(d)("common.close"),
                  "aria-label": s(d)("common.close"),
                  onClick: (L) => A(b)
                }, "✕", 8, Ed)
              ]),
              n("button", {
                type: "button",
                class: "win-toast-body win-toast-body-button",
                onClick: (L) => f(b)
              }, [
                n("span", Pd, u(b.title), 1),
                b.subtitle ? (c(), m("span", Wd, u(b.subtitle), 1)) : P("", !0),
                b.message ? (c(), m("span", Nd, u(b.message), 1)) : P("", !0)
              ], 8, Dd),
              b.showActions && b.actionLabel ? (c(), m("footer", Od, [
                n("button", {
                  type: "button",
                  class: "win-toast-btn primary",
                  onClick: (L) => f(b)
                }, u(b.actionLabel), 9, Rd),
                n("button", {
                  type: "button",
                  class: "win-toast-btn",
                  onClick: (L) => A(b)
                }, u(s(d)("common.close")), 9, Bd)
              ])) : P("", !0),
              n("div", {
                class: "win-toast-progress",
                style: ke($(b))
              }, null, 4)
            ], 42, Td))), 128))
          ]),
          _: 1
        })
      ])
    ]));
  }
}), Wn = /* @__PURE__ */ Re(Hd, [["__scopeId", "data-v-d1eb92c2"]]), Fd = ["id"], jd = /* @__PURE__ */ he({
  __name: "DockModuleHost",
  setup(e) {
    const t = pn().filter((o) => o.presentation !== "card").map((o) => {
      tt(o.lifecycle.isVisible, (a) => {
        a && Le.markRunning(o.id);
      }, { immediate: !0, flush: "sync" });
      const i = he({
        setup: () => () => Ae("section", { class: "dock-module-load-error", role: "alert" }, [
          Ae("div", { style: "display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;" }, [
            Ae("strong", { style: "font-size: 13px; color: var(--heading);" }, `${o.title} 加载受阻`),
            Ae("span", { style: "font-size: 11px; padding: 2px 6px; border-radius: 4px; background: var(--surface); color: var(--muted); border: 1px solid var(--border);" }, "代码可能已更新")
          ]),
          Ae("p", { style: "font-size: 12px; line-height: 1.5; color: var(--muted); margin: 0 0 12px 0;" }, "模块分块代码未就绪。若刚才在终端编写或重新构建了扩展，点击「刷新标签页」即可立即同步最新切片。"),
          Ae("div", { style: "display: flex; gap: 8px;" }, [
            Ae("button", {
              type: "button",
              style: "padding: 5px 12px; border-radius: 6px; border: 1px solid var(--border); background: var(--primary, #3b82f6); color: #fff; cursor: pointer; font-size: 12px; font-weight: 500;",
              onClick: () => {
                typeof window < "u" && window.location.reload();
              }
            }, "⟳ 刷新标签页"),
            Ae("button", {
              type: "button",
              style: "padding: 5px 10px; border-radius: 6px; border: 1px solid var(--border); background: var(--surface); color: var(--text); cursor: pointer; font-size: 12px;",
              onClick: () => {
                Le.reloadApp(o.id);
              }
            }, "↻ 重试"),
            Ae("button", {
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
        mounted: ae(() => !!Fe[o.id]),
        view: H({
          loader: o.loadView,
          onError(a, r, v, k) {
            k <= 2 ? r() : v();
          },
          errorComponent: i
        })
      };
    });
    return so(() => {
      for (const { definition: o } of t)
        Ce.close(o.id), Ft.delete(o.id), Fe[o.id] = !1;
    }), (o, i) => (c(!0), m(ee, null, be(s(t), (a) => St((c(), m("div", {
      id: a.definition.rootId,
      key: a.definition.id
    }, [
      a.mounted.value ? (c(), ne(sn(a.view), {
        key: s(Le).getRenderKey(a.definition.id)
      })) : P("", !0)
    ], 8, Fd)), [
      [ci, a.definition.lifecycle.isVisible()]
    ])), 128));
  }
}), Vd = /* @__PURE__ */ Re(jd, [["__scopeId", "data-v-fc77be0a"]]), Kd = ["onKeydown"], zd = { class: "fo-up-preview-head" }, Gd = ["src"], Ud = { class: "fo-up-preview-meta" }, Yd = { class: "fo-up-preview-name-row" }, qd = ["href"], Xd = ["disabled"], Jd = { class: "fo-up-preview-sign" }, Qd = { class: "fo-up-preview-videos" }, Zd = {
  key: 0,
  class: "fo-up-preview-loading"
}, eu = {
  key: 1,
  class: "fo-up-preview-empty"
}, tu = {
  key: 2,
  class: "fo-up-preview-empty"
}, ou = ["href", "title", "onClick"], iu = ["src"], nu = {
  key: 0,
  class: "fo-bili-duration"
}, su = { class: "fo-up-preview-video-info" }, au = ["href", "title", "onClick"], ru = { class: "fo-up-preview-video-meta" }, lu = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2394a3b8'%3E%3Cpath d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/%3E%3C/svg%3E", cu = /* @__PURE__ */ he({
  __name: "BiliUpPreview",
  setup(e) {
    const t = q(!1);
    function o() {
      if (!ie.submitting) {
        if (!ie.followed) {
          t.value = !1, So.toggleFollow();
          return;
        }
        if (!t.value) {
          t.value = !0;
          return;
        }
        t.value = !1, So.toggleFollow();
      }
    }
    function i() {
      t.value = !1, So.close();
    }
    function a(r, v) {
      r.ctrlKey || r.metaKey || (r.preventDefault(), r.stopPropagation(), v.bvid ? (bo.openVideo({
        bvid: v.bvid,
        title: v.title,
        cover: v.cover,
        author: ie.name,
        authorFace: ie.face,
        mid: ie.mid,
        url: v.url
      }), i()) : v.url && v.url !== "#" && window.open(v.url, "_blank"));
    }
    return (r, v) => s(ie).open ? (c(), m("div", {
      key: 0,
      class: "fo-up-preview-backdrop",
      onPointerdown: j(i, ["self"])
    }, [
      n("aside", {
        class: "fo-up-preview-popover",
        style: ke({ left: `${s(ie).left}px`, top: `${s(ie).top}px` }),
        onKeydown: $o(j(i, ["stop", "prevent"]), ["esc"])
      }, [
        n("div", zd, [
          n("img", {
            class: "fo-up-preview-avatar",
            src: s(ie).face || lu,
            alt: "",
            referrerpolicy: "no-referrer"
          }, null, 8, Gd),
          n("div", Ud, [
            n("div", Yd, [
              n("a", {
                class: "fo-up-preview-name",
                href: `https://space.bilibili.com/${s(ie).mid}`,
                target: "_blank",
                rel: "noreferrer"
              }, u(s(ie).name), 9, qd),
              n("button", {
                type: "button",
                class: re([
                  s(ie).followed ? "fo-up-preview-unfollow" : "fo-up-preview-follow",
                  { "is-armed": t.value }
                ]),
                disabled: s(ie).submitting,
                onClick: o
              }, u(s(ie).submitting ? "处理中…" : t.value ? "确定取消？" : s(ie).followed ? "取消关注" : "＋ 关注"), 11, Xd)
            ]),
            n("p", Jd, u(s(ie).sign || "暂无个人简介"), 1)
          ]),
          n("button", {
            type: "button",
            class: "fo-up-preview-close",
            "aria-label": "关闭预览",
            onClick: i
          }, "✕")
        ]),
        v[1] || (v[1] = n("div", { class: "fo-up-preview-title-tag" }, "近期投稿视频（最新 2~3 个）", -1)),
        n("div", Qd, [
          s(ie).loading ? (c(), m("div", Zd, [...v[0] || (v[0] = [
            n("i", null, null, -1),
            n("span", null, "正在读取近期投稿…", -1)
          ])])) : s(ie).error ? (c(), m("p", eu, u(s(ie).error), 1)) : s(ie).videos.length ? (c(!0), m(ee, { key: 3 }, be(s(ie).videos, (k) => (c(), m("article", {
            key: k.bvid,
            class: "fo-up-preview-video"
          }, [
            n("a", {
              class: "fo-up-preview-thumb",
              href: k.url,
              title: `就地播放「${k.title}」（Ctrl+点击在网页打开）`,
              onClick: (l) => a(l, k)
            }, [
              n("img", {
                src: k.cover,
                alt: "",
                loading: "lazy",
                referrerpolicy: "no-referrer"
              }, null, 8, iu),
              k.duration ? (c(), m("span", nu, u(k.duration), 1)) : P("", !0)
            ], 8, ou),
            n("div", su, [
              n("a", {
                class: "fo-up-preview-video-title",
                href: k.url,
                title: `就地播放「${k.title}」（Ctrl+点击在网页打开）`,
                onClick: (l) => a(l, k)
              }, u(k.title), 9, au),
              n("div", ru, [
                n("span", null, "▣ " + u(k.playCount), 1),
                n("span", null, u(k.published), 1)
              ])
            ])
          ]))), 128)) : (c(), m("p", tu, "该 UP 主近期暂无视频动态"))
        ])
      ], 44, Kd)
    ], 32)) : P("", !0);
  }
}), du = /* @__PURE__ */ Re(cu, [["__scopeId", "data-v-bf6dab49"]]), uu = { class: "logicweaver-overlays-layer" }, pu = { id: "vue-notification-root" }, hu = {
  id: "bili-profile-menu",
  class: "bili-profile-menu",
  hidden: ""
}, fu = { id: "vue-bili-message-panel-root" }, gu = { id: "vue-tab-manager-root" }, mu = { id: "vue-bookmark-menu-root" }, wu = { id: "vue-bookmark-panel-root" }, yu = { id: "vue-launcher-dialogs-root" }, vu = { id: "vue-launcher-folder-root" }, bu = { id: "vue-launcher-menus-root" }, ku = { id: "vue-settings-dialog-root" }, _u = { id: "vue-clock-settings-root" }, xu = { id: "vue-bili-theater-root" }, Cu = { id: "vue-bili-mini-player-root" }, Lu = { id: "vue-ai-dialog-root" }, Su = { id: "vue-aihot-viewer-root" }, Tu = { id: "vue-nav-wheel-root" }, $u = { id: "vue-github-detail-root" }, Mu = { id: "vue-bili-subtitle-modal-root" }, Iu = { id: "vue-bili-video-task-modal-root" }, Au = { id: "vue-github-task-modal-root" }, Eu = { id: "vue-web-task-modal-root" }, Du = { id: "vue-firecrawl-modal-root" }, Pu = { id: "vue-floating-image-viewer-root" }, Wu = { id: "vue-command-palette-root" }, Nu = /* @__PURE__ */ he({
  __name: "AppOverlays",
  setup(e) {
    const t = Ne(() => _t.state.isOpen), o = Ne(() => Lo.isOpen), i = Ne(() => Ct.state.isOpen), a = Ne(() => Gs.open), r = Ne(() => to.state.isOpen), v = Ne(() => hs.isOpen), k = Ne(() => js.isOpen), l = Ne(() => _i.state.isOpen), _ = Ne(() => fs.isOpen), I = Ne(() => Te.isOpen), A = Ne(() => rs.isOpen);
    let f;
    Ve(() => {
      f = ls();
    }), yt(() => {
      f?.();
    });
    const $ = Ne(() => yi.state.isOpen), g = Ne(() => ct.isOpen), p = Ne(() => zt.editDialog.isOpen || zt.linkMove.isOpen || zt.folderMove.isOpen || zt.groupMerge.isOpen || zt.folderDelete.isOpen), b = H(() => import("./ProfileMenu-CeCjAudJ.js")), L = H(() => import("./BookmarkNoteMenu-C9tZQxc5.js")), D = H(() => import("./BookmarkPanel-CIS0wveF.js")), S = H(() => import("./ClockSettingsMenu-Bs5UwP2Y.js")), O = H(() => import("./TabManagerPanel-DOx3J7yx.js")), V = H(() => import("./LauncherDialogs-2BphnIU2.js")), se = H(() => import("./LauncherFolderDialog-DlZK_Ukx.js")), T = H(() => import("./LauncherMenus-BPkmzolQ.js")), w = H(() => import("./SettingsDialog-BsT2mC7g.js")), C = H(() => import("./BiliMiniPlayer-D9EmBlEi.js")), Q = H(() => import("./BiliTheaterDialog-DPZyt8DL.js")), W = H(() => import("./BiliMessagePanel-DvddWRDM.js")), N = H(() => import("./AiDialog-3aJ-NyoO.js")), E = H(() => import("./AihotViewer-Ggc0niSX.js")), F = H(() => import("./NavWheelOverlay-CzkE2Zeg.js")), pe = H(() => import("./GitHubRepoDetailDrawer-D26YYc25.js")), ye = H(() => import("./InPageSideDrawer-BqsaPTOr.js")), ot = H(() => import("./BiliSubtitleModal-Df8Wywxh.js")), Be = H(() => import("./BiliVideoTaskModal-DDrwUoPk.js")), at = H(() => import("./GitHubTaskModal-DcP-Lkym.js")), rt = H(() => import("./WebSiteTaskModal-DEK8T8nk.js")), Ke = H(() => import("./FirecrawlModal-CICld4Jd.js")), Pe = H(() => import("./FloatingImageViewer-BADjayU7.js")), Me = H(() => import("./CommandPalette-BfWpIo39.js")), ve = H(() => import("./AppPromptModal-Tn-L0vs0.js")), He = H(async () => {
      const [ze, _e] = await Promise.all([
        import("./PluginMarketDialog-psYUn7h8.js"),
        import("./plugin-market-Dbkvvkyi.js")
      ]);
      return ia("logicweaver-market-styles", _e.default), ze.default;
    });
    return (ze, _e) => (c(), m("div", uu, [
      n("div", pu, [
        X(Wn)
      ]),
      n("div", hu, [
        X(s(b))
      ]),
      n("div", fu, [
        s(k) ? (c(), ne(s(W), { key: 0 })) : P("", !0)
      ]),
      n("div", gu, [
        s(o) ? (c(), ne(s(O), { key: 0 })) : P("", !0)
      ]),
      n("div", mu, [
        s($) ? (c(), ne(s(L), { key: 0 })) : P("", !0)
      ]),
      n("div", wu, [
        X(s(D))
      ]),
      n("div", yu, [
        s(p) ? (c(), ne(s(V), { key: 0 })) : P("", !0)
      ]),
      n("div", vu, [
        s(g) ? (c(), ne(s(se), { key: 0 })) : P("", !0)
      ]),
      n("div", bu, [
        X(s(T))
      ]),
      n("div", ku, [
        X(s(w))
      ]),
      n("div", _u, [
        s(i) ? (c(), ne(s(S), { key: 0 })) : P("", !0)
      ]),
      n("div", xu, [
        s(r) ? (c(), ne(s(Q), { key: 0 })) : P("", !0)
      ]),
      n("div", Cu, [
        s(v) ? (c(), ne(s(C), { key: 0 })) : P("", !0)
      ]),
      n("div", Lu, [
        s(l) ? (c(), ne(s(N), { key: 0 })) : P("", !0)
      ]),
      n("div", Su, [
        s(a) ? (c(), ne(s(E), { key: 0 })) : P("", !0)
      ]),
      n("div", Tu, [
        X(s(F))
      ]),
      X(Vd),
      n("div", $u, [
        s(_) ? (c(), ne(s(pe), { key: 0 })) : P("", !0)
      ]),
      n("div", Mu, [
        X(s(ot))
      ]),
      n("div", Iu, [
        X(s(Be))
      ]),
      n("div", Au, [
        X(s(at))
      ]),
      n("div", Eu, [
        X(s(rt))
      ]),
      n("div", Du, [
        X(s(Ke))
      ]),
      n("div", Pu, [
        X(s(Pe))
      ]),
      n("div", Wu, [
        s(I) ? (c(), ne(s(Me), { key: 0 })) : P("", !0)
      ]),
      s(A) ? (c(), ne(s(ye), { key: 0 })) : P("", !0),
      X(du),
      X(s(ve)),
      s(t) ? (c(), ne(s(He), { key: 1 })) : P("", !0)
    ]));
  }
});
let si = !1;
function Ou(e = 1800) {
  if (si || typeof window > "u") return;
  const t = () => {
    if (si) return;
    si = !0;
    const o = pn();
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
const Ru = ["data-active-workspace"], Bu = /* @__PURE__ */ he({
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
    let a = "", r, v;
    function k(A) {
      A.target === "github" && A.githubRule && Oe.setSearchRule(A.githubRule), xs(A.target, A.keyword), A.target === "netease" ? Ce.open("music") : xt.enter(A.target === "github" ? "card-github" : "daily-bilibili");
    }
    function l(A, f = "image/svg+xml") {
      if (typeof document > "u") return;
      const $ = typeof chrome < "u" && chrome.runtime?.getURL ? chrome.runtime.getURL(A) : A;
      if (a === $) return;
      a = $;
      const g = document.querySelectorAll("link[rel*='icon']");
      if (g.length > 0)
        g.forEach((p) => {
          p.type = f, p.href = $;
        });
      else {
        const p = document.createElement("link");
        p.rel = "icon", p.type = f, p.href = $, document.head.appendChild(p);
      }
    }
    function _() {
      if (typeof document > "u") return;
      const A = i[co.value] || i.home;
      if (l(A.icon, A.iconType), te.playing && te.title) {
        const f = te.artist ? ` - ${te.artist}` : "";
        document.title = `▶ ${te.title}${f}`;
        return;
      }
      if (Ut.playing && Ut.title) {
        document.title = `▶ ${Ut.title} · 电台`;
        return;
      }
      document.title = A.title;
    }
    tt(
      [
        () => co.value,
        () => te.playing,
        () => te.title,
        () => te.artist,
        () => Ut.playing,
        () => Ut.title
      ],
      () => {
        _();
      },
      { immediate: !0 }
    );
    const I = ae(() => co.value === "home" ? "" : co.value);
    return tt(() => ht.activeId, un, { immediate: !0, flush: "sync" }), Ve(() => {
      typeof chrome < "u" && chrome.runtime?.onMessage && (v = _s(k)), typeof document < "u" && (document.body.dataset.spa = "1");
      try {
        fi.bindGlobalListener(), De.start(), Ji.start(), li.init().catch((A) => console.warn("[Launcher] 初始化失败", A)), Ou(), r = setTimeout(() => {
          import("./webdav-auto-sync-C-Jdbk7P.js").then(async (A) => {
            const f = await A.runWebDavAutoSync();
            f.status === "error" || f.status === "conflict" ? ue.show({ appType: "sync", appName: "WebDAV 同步", title: "自动同步已暂停", message: f.message || "请检查同步设置。", level: "warning", history: !0, target: { type: "module", moduleId: "sync" }, actionLabel: "查看设置", showActions: !0, duration: 12e3, onClick: () => ao.open("sync") }) : f.status === "downloaded" && ue.show({ appType: "sync", appName: "WebDAV 同步", title: "已恢复云端更新", message: "请刷新已打开的页面以查看同步后的配置。", level: "info", showActions: !1, duration: 6e3 });
          }).catch(() => {
          });
        }, 8e3), typeof chrome < "u" && chrome?.runtime?.sendMessage && setTimeout(() => {
          try {
            chrome.runtime.sendMessage({ type: "cleanupNativeTabs" }, () => {
              chrome.runtime?.lastError;
            });
          } catch {
          }
        }, 400);
      } catch (A) {
        console.warn("[App] Runtime start error:", A);
      }
    }), yt(() => {
      v?.(), r && clearTimeout(r), De.stop(), li.stop(), Ji.stop(), document.body.classList.remove("has-card-fullscreen"), typeof document < "u" && o && (document.title = o);
    }), t({
      activeWorkspaceId: I,
      windowManagerController: Ce
    }), (A, f) => (c(), m("div", {
      id: "logicweaver-spa-root",
      class: "logicweaver-spa-root",
      "data-active-workspace": I.value || ""
    }, [
      X(Gc),
      X(ed),
      n("nav", {
        id: "mac-dock",
        class: re(["mac-dock", "dock-" + s(Wt).position]),
        "aria-label": "快捷应用栏"
      }, [
        X(Pn)
      ], 2),
      X(Nu)
    ], 8, Ru));
  }
}), Hu = /* @__PURE__ */ Re(Bu, [["__scopeId", "data-v-a54ecb8b"]]), Fu = {
  class: "endfield-stage",
  "aria-hidden": "true"
}, ju = {
  class: "rhinelab-stage",
  "aria-hidden": "true"
}, Vu = { class: "rhine-scaler" }, Ku = { class: "rhine-center-group" }, zu = { class: "rhine-auth-status" }, Gu = { class: "rhine-auth-text" }, Uu = ["hidden"], Yu = { class: "rhine-cinema-caption" }, qu = /* @__PURE__ */ he({
  __name: "IntroAnimation",
  setup(e) {
    const t = q(window.innerHeight), o = q(window.innerWidth), i = q(!1), a = q(!1), r = q(10), v = q(1), k = q(0), l = /* @__PURE__ */ new Set();
    let _ = 0, I = () => {
    };
    const A = ae(() => `${String(Math.round(Ye.renderedProgress)).padStart(2, "0")}%`), f = ae(() => {
      const T = Ye.renderedProgress / 100 * t.value + 10;
      return `${Math.min(T, Math.max(0, t.value - 102)).toFixed(1)}px`;
    }), $ = ae(() => Ye.renderedProgress >= 75 ? "START PROCESSING..." : Ye.renderedProgress >= 35 ? "REQUEST RECEIVED" : "ID CONFIRMED : JOYCE MOORE"), g = ae(() => Ye.finished ? "身份验证通过 · 欢迎进入终端" : Ye.status ? `身份信息确认 · ${Ye.status.replace(/^.*?\/\s*/, "")}` : "身份信息确认：JOYCE MOORE"), p = ae(() => String(Math.max(0.35, Math.min(o.value / 1920, t.value / 1080))));
    function b(T, w) {
      const C = window.setTimeout(() => {
        l.delete(C), T();
      }, w);
      l.add(C);
    }
    function L() {
      window.dispatchEvent(new CustomEvent("logicweaver:intro-complete"));
    }
    function D(T) {
      if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
        L();
        return;
      }
      const w = T ? 180 : 260, C = T ? 200 : 280, Q = performance.now(), W = (N) => {
        const E = N - Q, F = Math.min(1, E / w), pe = 1 - Math.pow(1 - F, 3);
        if (r.value = 10 + pe * Math.max(0, o.value - 10), E > w && (v.value = Math.max(0, 1 - (E - w) / C)), E >= w + C) {
          L();
          return;
        }
        _ = requestAnimationFrame(W);
      };
      b(() => {
        _ = requestAnimationFrame(W);
      }, T ? 60 : 120);
    }
    function S(T) {
      T || (i.value = !0), b(() => {
        a.value = !0, k.value = 6, v.value = 0, b(L, 380);
      }, T ? 40 : 420);
    }
    function O(T) {
      Ye.style === "rhinelab" ? S(T) : D(T);
    }
    function V() {
      o.value = window.innerWidth, t.value = window.innerHeight;
    }
    function se(T) {
      Ye.finished || (T.key === "Enter" || T.key === " " || T.key === "Escape") && (T.preventDefault(), st.skip("KEYBOARD SKIP"));
    }
    return Ve(() => {
      document.documentElement.dataset.startupStyle = Ye.style, document.documentElement.style.setProperty("--rhine-scale", p.value), window.addEventListener("resize", V, { passive: !0 }), window.addEventListener("keydown", se, !0), I = ha(O), yn();
    }), so(() => {
      I(), window.removeEventListener("resize", V), window.removeEventListener("keydown", se, !0), cancelAnimationFrame(_);
      for (const T of l) clearTimeout(T);
      l.clear();
    }), (T, w) => (c(), m("div", {
      class: "intro-vue-content",
      style: ke({ "--rhine-scale": p.value, opacity: v.value, filter: `blur(${k.value}px)` })
    }, [
      n("div", Fu, [
        w[2] || (w[2] = n("div", { class: "endfield-loader-texture" }, null, -1)),
        w[3] || (w[3] = n("div", { class: "endfield-loader-rail" }, null, -1)),
        n("div", {
          class: "endfield-loader-fill",
          style: ke({ height: `${s(Ye).renderedProgress}%` })
        }, null, 4),
        n("div", {
          class: "endfield-loader-meter",
          style: ke({ top: f.value })
        }, [
          w[1] || (w[1] = n("span", { class: "endfield-loader-tick" }, null, -1)),
          n("b", null, u(A.value), 1),
          n("small", null, u(s(Ye).status), 1)
        ], 4),
        w[4] || (w[4] = Zt('<section class="endfield-loader-brand"><span class="endfield-loader-kicker">DEEPSEEK HARNESS</span><strong>END</strong><strong>FIELD</strong><span class="endfield-loader-detail"><i class="endfield-loader-chevron"></i><span>EDGE INTELLIGENCE THEME</span><small>TERRA RESEARCH COMMISSION / BOOT SEQUENCE</small><span class="endfield-loader-squares"><i class="on"></i><i class="on"></i><i class="on"></i><i></i><i></i><i></i><i class="on"></i><i class="on"></i><i></i><i></i><i></i><i></i></span></span><em>OVER THE FRONTIER / INTO THE FRONT</em></section>', 1)),
        n("div", {
          class: "endfield-loader-wipe",
          style: ke({ width: `${r.value}px`, opacity: r.value > 10 ? 1 : 0 })
        }, null, 4)
      ]),
      n("div", ju, [
        w[12] || (w[12] = Zt('<div class="rhine-background"><svg viewBox="0 0 1920 1080" preserveAspectRatio="none"><g fill="none" stroke="#ffffff" stroke-width="2.5"><path class="rhine-drift-path1" d="M-210 705C-45 705 182 704 247 567C337 377 99 306 4 435S27 680 169 631C309 584 227 314 279 111S568-113 568-113"></path><path class="rhine-drift-path2" d="M1560-80C1374 114 1671 168 1601 323S1371 367 1431 480S1692 666 1559 787S1329 886 1498 1130"></path><circle class="rhine-drift-circle" cx="1450" cy="648" r="346"></circle><circle class="rhine-drift-circle2" cx="1450" cy="648" r="348"></circle></g></svg></div>', 1)),
        n("div", Vu, [
          w[10] || (w[10] = Zt('<header class="rhine-brand"><h1>RHINE LAB</h1><div class="rhine-brand-sub">SYNTHESIZE INFORMATION</div><p class="rhine-brand-os"><span class="rhine-brand-analysis"><span style="left:2px;">A</span><span style="left:28px;">N</span><span style="left:55px;">A</span><span style="left:81px;">L</span><span style="left:103px;">Y</span><span style="left:129px;">S</span><span style="left:154px;">I</span><span style="left:166px;">S</span></span><b>OS</b></p></header>', 1)),
          n("button", {
            class: "rhine-skip",
            type: "button",
            title: "点击进入系统 (或按 Enter)",
            onClick: w[0] || (w[0] = (C) => s(st).skip("ENTER SYSTEM"))
          }, [...w[5] || (w[5] = [
            nt("ENTER SYSTEM ", -1),
            n("span", null, "↗", -1)
          ])]),
          n("div", Ku, [
            w[8] || (w[8] = n("div", { class: "rhine-logo-box" }, [
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
            n("div", zu, [
              w[6] || (w[6] = n("span", { class: "rhine-auth-dot" }, "·", -1)),
              n("span", Gu, u($.value), 1),
              w[7] || (w[7] = n("i", {
                class: "rhine-cursor",
                "aria-hidden": "true"
              }, null, -1))
            ])
          ]),
          n("div", {
            class: re(["rhine-scan", { active: i.value }]),
            hidden: !i.value
          }, [...w[9] || (w[9] = [
            Zt('<svg viewBox="0 0 1920 1080" aria-hidden="true"><g fill="none" stroke="#080a08" stroke-linecap="round"><circle class="rhine-scan-circle ring-outer" cx="960" cy="540" r="280" stroke-width="2.5"></circle><circle class="rhine-scan-circle ring-white" cx="960" cy="540" r="260" stroke="#fff" stroke-width="3.5"></circle><circle class="rhine-scan-circle ring-inner" cx="960" cy="540" r="220" stroke-width="2"></circle><circle class="rhine-orbit-dot dot-1" cx="960" cy="260" r="8" fill="#ed821b" stroke="none"></circle><circle class="rhine-orbit-dot dot-2" cx="960" cy="820" r="8" fill="#ed821b" stroke="none"></circle><circle class="rhine-scan-core" cx="960" cy="540" r="6" fill="#080a08" stroke="none"></circle></g></svg><span class="rhine-scan-label">PERMISSION AUTHORIZED</span>', 2)
          ])], 10, Uu),
          n("div", Yu, u(g.value), 1),
          w[11] || (w[11] = n("div", { class: "rhine-powered" }, [
            nt("POWERED BY "),
            n("b", null, "RHINE LAB"),
            n("i")
          ], -1))
        ]),
        n("div", {
          class: re(["rhine-white", { flash: a.value }]),
          "aria-hidden": "true"
        }, null, 2)
      ])
    ], 4));
  }
}), Xu = /* @__PURE__ */ he({
  __name: "ProfileMenu",
  setup(e) {
    function t(o) {
      Wo.trigger(o);
    }
    return (o, i) => (c(), m(ee, null, [
      n("button", {
        type: "button",
        "data-action": "messages",
        onClick: i[0] || (i[0] = j((a) => t("messages"), ["stop"]))
      }, u(s(d)("profile.menu.notifications")), 1),
      n("button", {
        type: "button",
        "data-action": "tabs",
        onClick: i[1] || (i[1] = j((a) => t("tabs"), ["stop"]))
      }, u(s(d)("profile.menu.tabs")), 1),
      n("button", {
        type: "button",
        "data-action": "refresh",
        onClick: i[2] || (i[2] = j((a) => t("refresh"), ["stop"]))
      }, u(s(d)("profile.menu.refreshBili")), 1),
      n("button", {
        type: "button",
        "data-action": "switch",
        onClick: i[3] || (i[3] = j((a) => t("switch"), ["stop"]))
      }, u(s(d)("profile.menu.switchUser")), 1),
      n("button", {
        type: "button",
        "data-action": "web",
        onClick: i[4] || (i[4] = j((a) => t("web"), ["stop"]))
      }, u(s(d)("profile.menu.biliCenter")), 1)
    ], 64));
  }
}), Ju = /* @__PURE__ */ he({
  __name: "WorkspaceLaunchers",
  setup(e) {
    function t(o) {
      ki.openWorkspace(o, !0);
    }
    return (o, i) => (c(), m(ee, null, [
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
      ds(o.$slots, "default")
    ], 64));
  }
}), Qu = {
  key: 0,
  "aria-label": "AI 分析任务"
}, Zu = { role: "status" }, ep = ["disabled"], tp = ["disabled"], op = /* @__PURE__ */ he({
  __name: "GitHubStatus",
  setup(e) {
    return (t, o) => s(Ue).message || s(Ue).busy ? (c(), m("section", Qu, [
      n("p", Zu, u(s(Ue).repo ? `原任务仓库：${s(Ue).repo}。 ` : "") + u(s(Ue).message), 1),
      s(Ue).busy ? (c(), m("button", {
        key: 0,
        type: "button",
        onClick: o[0] || (o[0] = (i) => s(Oe).stopAiAnalysis())
      }, "停止后续分析 / 中断等待")) : P("", !0),
      s(Ue).uncertain ? (c(), m(ee, { key: 1 }, [
        o[5] || (o[5] = n("p", null, "AI 结果未确认，已阻止本页再次提交。请到供应商核对请求和计费；本页记录在整页关闭或重载后会丢失。", -1)),
        s(Ue).unlockConfirmation ? (c(), m(ee, { key: 1 }, [
          o[4] || (o[4] = n("p", null, "扩展不能验证供应商任务；确认只解除本页限制，不代表成功，也不会重发请求。", -1)),
          n("button", {
            type: "button",
            disabled: s(Ue).busy,
            onClick: o[2] || (o[2] = (i) => s(Oe).acknowledgeAiChecked())
          }, "确认解除本页限制", 8, tp),
          n("button", {
            type: "button",
            onClick: o[3] || (o[3] = (i) => s(Ue).unlockConfirmation = !1)
          }, "保持限制")
        ], 64)) : (c(), m("button", {
          key: 0,
          type: "button",
          disabled: s(Ue).busy,
          onClick: o[1] || (o[1] = (i) => s(Ue).unlockConfirmation = !0)
        }, "我已核对供应商记录", 8, ep))
      ], 64)) : P("", !0)
    ])) : P("", !0);
  }
}), U = fe({ repo: "", text: "", baseline: "", busy: !1, message: "", storedValue: null });
function Qi(e, t = !1) {
  if (!e || U.busy) return;
  if (U.repo && U.text !== U.baseline) {
    U.message = "请先保存或明确取消当前草稿，再编辑或清除其它备注。";
    return;
  }
  const o = Oe.remarks[e]?.userRemark, i = typeof o == "string" ? o : "";
  Object.assign(U, {
    repo: e,
    baseline: i,
    text: t ? "" : i,
    storedValue: null,
    message: t ? "清除已准备；点击保存才会清除手写备注，AI 简介不变。" : "仅点击保存或 Enter 才写入；草稿只保留在本页内存。"
  });
}
function ai() {
  U.busy || Object.assign(U, { repo: "", text: "", baseline: "", storedValue: null, message: "" });
}
async function ri() {
  if (U.busy || !U.repo) return;
  const { repo: e, text: t, baseline: o } = U;
  U.busy = !0;
  try {
    await Oe.updateRepoRemark(e, { userRemark: t.trim() }, o), Object.assign(U, { repo: "", text: "", baseline: "", storedValue: null, message: `${e} 的备注已保存并回读核对。` });
  } catch (i) {
    U.message = i instanceof Error ? i.message : "保存未确认，草稿保留，请先读取已保存值核对。";
  } finally {
    U.busy = !1;
  }
}
async function Zi() {
  if (U.busy || !U.repo) return;
  const e = U.repo;
  U.busy = !0;
  try {
    const o = (await Oe.reloadRepoRemarks())[e]?.userRemark;
    if (o !== void 0 && typeof o != "string") throw new Error("保存值格式异常，未变更草稿或覆盖基准。");
    U.storedValue = o ?? "", U.baseline = o ?? "", U.message = "已读取保存值，草稿没有替换。请对比下方保存值；再次点击保存将以草稿替换它。";
  } catch (t) {
    U.message = t instanceof Error ? t.message : "读取失败，草稿保留。";
  } finally {
    U.busy = !1;
  }
}
const ip = ["disabled"], np = ["disabled"], sp = ["disabled"], ap = ["disabled"], rp = {
  key: 0,
  style: { width: "100%", "white-space": "pre-wrap", "overflow-wrap": "anywhere" }
}, en = /* @__PURE__ */ he({
  __name: "GitHubRemarkEditor",
  props: {
    active: { type: Boolean }
  },
  setup(e) {
    const t = e, o = q(null);
    return Ve(() => {
      pt(() => {
        t.active && !U.busy && o.value?.focus();
      });
    }), (i, a) => (c(), m("div", {
      class: "gh-inline-remark-box",
      style: { "flex-wrap": "wrap", "max-width": "100%" },
      onClick: a[6] || (a[6] = j(() => {
      }, ["stop"]))
    }, [
      St(n("input", {
        ref_key: "input",
        ref: o,
        "onUpdate:modelValue": a[0] || (a[0] = (r) => s(U).text = r),
        class: "gh-inline-remark-input",
        type: "text",
        maxlength: "100",
        "aria-label": "手写仓库备注",
        placeholder: "备注说明…",
        disabled: s(U).busy || !e.active,
        onKeydown: [
          a[1] || (a[1] = $o(j((r) => !r.isComposing && e.active && s(ri)(), ["prevent"]), ["enter"])),
          a[2] || (a[2] = $o(j((r) => !r.isComposing && e.active && s(ai)(), ["prevent", "stop"]), ["esc"]))
        ]
      }, null, 40, ip), [
        [Po, s(U).text]
      ]),
      n("button", {
        type: "button",
        class: "gh-inline-remark-btn save",
        title: "保存备注",
        disabled: s(U).busy || !e.active,
        onClick: a[3] || (a[3] = //@ts-ignore
        (...r) => s(ri) && s(ri)(...r))
      }, "✓", 8, np),
      n("button", {
        type: "button",
        class: "gh-inline-remark-btn cancel",
        title: "取消草稿",
        disabled: s(U).busy || !e.active,
        onClick: a[4] || (a[4] = //@ts-ignore
        (...r) => s(ai) && s(ai)(...r))
      }, "✕", 8, sp),
      n("button", {
        type: "button",
        disabled: s(U).busy || !e.active,
        onClick: a[5] || (a[5] = //@ts-ignore
        (...r) => s(Zi) && s(Zi)(...r))
      }, "读取已保存值", 8, ap),
      s(U).storedValue !== null ? (c(), m("p", rp, "已保存值：" + u(s(U).storedValue || "（空）"), 1)) : P("", !0)
    ]));
  }
}), lp = {
  key: 0,
  role: "status"
}, cp = {
  key: 1,
  "aria-label": "未显示仓库的备注草稿"
}, dp = {
  key: 2,
  class: "gh-search-options",
  style: { margin: "0 0 10px" }
}, up = { style: { "font-size": "12px", color: "var(--dim)" } }, pp = {
  key: 3,
  class: "gh-repos-loading"
}, hp = {
  key: 4,
  class: "muted small",
  style: { "text-align": "center", padding: "40px 0", "font-size": "13px" }
}, fp = ["data-repo-name", "onClick", "onContextmenu", "onDragstart"], gp = ["onClick"], mp = { class: "gh-card-head" }, wp = ["checked", "onChange"], yp = ["src"], vp = ["href", "title"], bp = { class: "owner" }, kp = { class: "gh-card-body" }, _p = { class: "gh-card-badges" }, xp = ["title", "onClick"], Cp = ["onClick"], Lp = ["title", "onClick"], Sp = { class: "gh-badge-remark-text" }, Tp = {
  key: 0,
  class: "desc gh-desc-analyzing",
  title: "正在使用 AI 分析仓库…"
}, $p = {
  key: 1,
  class: "desc gh-desc-ai",
  title: "AI 中文简介（点击可直接修改，右键可重新分析）"
}, Mp = ["title"], Ip = {
  key: 3,
  class: "desc dim"
}, Ap = { class: "meta" }, Ep = { class: "gh-stars" }, Dp = {
  key: 0,
  class: "gh-lang"
}, Pp = {
  key: 1,
  class: "gh-updated"
}, Wp = {
  key: 6,
  class: "gh-pager"
}, Np = ["disabled"], Op = { class: "gh-page-info" }, Rp = ["disabled"], Bp = ["onClick"], Hp = /* @__PURE__ */ he({
  __name: "GitHubRepositories",
  props: {
    active: { type: Boolean, default: !0 }
  },
  setup(e) {
    const t = e, o = ae(() => !!U.repo && !ge.cards.some((T) => T.fullName === U.repo)), i = fe({
      visible: !1,
      x: 0,
      y: 0,
      fullName: "",
      folders: [],
      hasRemark: !1,
      url: ""
    }), a = q(null), r = q(!1);
    function v(T, w) {
      const C = T.target;
      if (C instanceof Element) {
        if (ge.batchMode) {
          if (C.closest(".fo-card-more,.gh-badge-folder,.gh-badge-remark,.gh-inline-remark-box")) return;
          T.preventDefault(), T.stopPropagation(), mt.toggleSelection(w.fullName);
          return;
        }
        C.closest("a,button,.gh-badge-folder,.gh-badge-remark,.fo-card-more,.gh-card-hole,.gh-card-checkbox,.gh-inline-remark-box") || (T.preventDefault(), T.stopPropagation(), gs.open(w.fullName, void 0, w));
      }
    }
    function k(T, w) {
      if (!t.active) return;
      T.preventDefault(), T.stopPropagation();
      const C = 12, Q = 160, W = 280, N = Math.min(window.innerWidth - Q - C, Math.max(C, T.clientX)), E = Math.min(window.innerHeight - W - C, Math.max(C, T.clientY));
      i.x = N, i.y = E, i.fullName = w.fullName, i.folders = [...w.folders || (w.folder ? [w.folder] : [])], i.hasRemark = !!w.customRemark, i.url = w.url, i.visible = !0, a.value = null, r.value = N > window.innerWidth - 380;
    }
    function l(T, w) {
      k(w, T), a.value = "folder";
    }
    function _() {
      i.visible = !1, a.value = null;
    }
    function I(T) {
      i.folders.includes(T) ? i.folders = i.folders.filter((w) => w !== T) : i.folders.push(T), Oe.toggleRepoList(i.fullName, T);
    }
    function A() {
      i.folders = [], Oe.clearRepoLists(i.fullName), _();
    }
    function f(T) {
      if (!t.active) return;
      const w = typeof T == "string" ? T : T?.fullName || i.fullName;
      _(), Qi(w);
    }
    function $() {
      if (!t.active) return;
      const T = i.fullName;
      _(), Qi(T, !0);
    }
    async function g() {
      const T = i.url;
      if (_(), T && t.active)
        try {
          await navigator.clipboard.writeText(T);
        } catch {
        }
    }
    function p(T) {
      const w = Oe.findRepository(i.fullName);
      _(), w && Cs.sendGitHubShare({
        fullName: w.full_name,
        name: w.name,
        owner: w.owner?.login,
        ownerAvatar: w.owner?.avatar_url,
        desc: w.description || void 0,
        language: w.language || void 0,
        stars: w.stargazers_count,
        category: i.folders && i.folders.length ? i.folders.join(", ") : "未分类",
        url: w.html_url || `https://github.com/${w.full_name}`,
        updatedAt: w.updated_at ? w.updated_at.split("T")[0] : void 0
      }, T);
    }
    function b() {
      const T = Oe.findRepository(i.fullName);
      _(), T && Js.open({
        fullName: T.full_name,
        description: T.description || "",
        stars: T.stargazers_count,
        language: T.language || void 0,
        updated: T.updated_at
      });
    }
    function L() {
      i.url && window.open(i.url, "_blank", "noreferrer"), _();
    }
    async function D() {
      const T = Oe.findRepository(i.fullName);
      if (!T) {
        _();
        return;
      }
      _(), await Oe.confirmUnstarRepository(T);
    }
    function S(T) {
      const w = T.target;
      w?.closest(".gh-repo-context-menu") || w?.closest(".gh-inline-remark-box") || _();
    }
    function O(T) {
      T.key === "Escape" && i.visible && _();
    }
    tt(() => t.active, (T) => {
      window.removeEventListener("pointerdown", S), window.removeEventListener("keydown", O), _(), T && (window.addEventListener("pointerdown", S), window.addEventListener("keydown", O));
    }, { immediate: !0 }), yt(() => {
      window.removeEventListener("pointerdown", S), window.removeEventListener("keydown", O);
    });
    function V(T, w) {
      const C = T.target;
      if (C instanceof Element && C.closest("button,a,input,textarea,select,[contenteditable='true']")) {
        T.preventDefault();
        return;
      }
      mt.startDrag(w, T);
    }
    const se = ae(() => {
      if (ge.cards.length > 0) return !1;
      const T = ms.actionText || "";
      return !!(T.includes("正在读取") || T.includes("正在加载") || T.includes("正在统计") || T.includes("正在同步"));
    });
    return (T, w) => (c(), m(ee, null, [
      s(U).message ? (c(), m("p", lp, u(s(U).repo ? `${s(U).repo}：` : "") + u(s(U).message), 1)) : P("", !0),
      o.value ? (c(), m("section", cp, [
        n("p", null, "备注草稿：" + u(s(U).repo) + "（仓库不在当前列表中，草稿仍保留）", 1),
        X(en, {
          active: t.active
        }, null, 8, ["active"])
      ])) : P("", !0),
      s(ge).searchMessage ? (c(), m("div", dp, [
        n("span", up, u(s(ge).searchMessage), 1),
        n("button", {
          type: "button",
          class: "gh-tab",
          style: { padding: "2px 8px", "font-size": "11px", "margin-left": "8px" },
          onClick: w[0] || (w[0] = (C) => s(mt).resetSearch())
        }, "清空搜索")
      ])) : P("", !0),
      se.value ? (c(), m("div", pp, [...w[17] || (w[17] = [
        n("div", {
          class: "gh-spinner",
          "aria-hidden": "true"
        }, null, -1),
        n("span", { class: "gh-loading-label" }, "正在读取 GitHub 仓库列表中…", -1)
      ])])) : s(ge).emptyMessage ? (c(), m("p", hp, u(s(ge).emptyMessage), 1)) : P("", !0),
      s(ge).cards.length ? (c(), m("div", {
        key: 5,
        class: re(["repos gh-grid", { "gh-batch-active": s(ge).batchMode }])
      }, [
        (c(!0), m(ee, null, be(s(ge).cards, (C) => (c(), m("article", {
          key: C.fullName,
          class: re(["repo gh-card", { selected: C.selected }]),
          "data-repo-name": C.fullName,
          draggable: "true",
          onClick: (Q) => v(Q, C),
          onContextmenu: (Q) => k(Q, C),
          onDragstart: (Q) => V(Q, C.fullName)
        }, [
          n("button", {
            class: "fo-card-more",
            type: "button",
            "aria-label": "更多操作",
            title: "更多操作",
            onClick: j((Q) => k(Q, C), ["stop"])
          }, "⋮", 8, gp),
          n("div", mp, [
            n("label", {
              class: "gh-card-hole",
              title: "点击勾选此仓库",
              onClick: w[1] || (w[1] = j(() => {
              }, ["stop"]))
            }, [
              n("input", {
                class: "gh-card-checkbox",
                type: "checkbox",
                checked: C.selected,
                onChange: (Q) => s(mt).setSelection(C.fullName, Q.target.checked)
              }, null, 40, wp),
              w[18] || (w[18] = n("span", { class: "gh-hole-inner" }, null, -1))
            ]),
            n("img", {
              class: "gh-owner-avatar",
              src: C.avatarUrl || "assets/github-star.svg",
              alt: "",
              loading: "lazy",
              referrerpolicy: "no-referrer",
              onError: w[2] || (w[2] = (Q) => Q.target.src = "assets/github-star.svg")
            }, null, 40, yp),
            n("a", {
              href: C.url,
              target: "_blank",
              rel: "noreferrer",
              class: "name",
              title: C.fullName
            }, [
              n("span", bp, u(C.owner) + "/", 1),
              nt(u(C.name), 1)
            ], 8, vp)
          ]),
          n("div", kp, [
            n("div", _p, [
              C.folders && C.folders.length ? (c(!0), m(ee, { key: 0 }, be(C.folders, (Q) => (c(), m("span", {
                key: Q,
                class: "gh-badge-folder",
                title: `本地分组：${Q}（点击管理所属列表）`,
                onClick: j((W) => l(C, W), ["stop"])
              }, " 📁 " + u(Q), 9, xp))), 128)) : (c(), m("span", {
                key: 1,
                class: "gh-badge-folder uncat",
                title: "未分类（点击加入 本地分组）",
                onClick: j((Q) => l(C, Q), ["stop"])
              }, " ＋ 未分类 ", 8, Cp)),
              s(U).repo === C.fullName ? (c(), ne(en, {
                key: 2,
                active: t.active
              }, null, 8, ["active"])) : C.customRemark ? (c(), m("span", {
                key: 3,
                class: "gh-badge-remark",
                title: `备注：${C.customRemark}（点击就地修改）`,
                onClick: j((Q) => f(C), ["stop"])
              }, [
                w[19] || (w[19] = n("span", { class: "gh-badge-remark-icon" }, "💬", -1)),
                n("span", Sp, u(C.customRemark), 1)
              ], 8, Lp)) : P("", !0)
            ]),
            C.descriptionKind === "analyzing" ? (c(), m("p", Tp, [...w[20] || (w[20] = [
              n("span", { class: "gh-ai-sparkle" }, "✨", -1),
              nt(" 正在使用 AI 分析仓库并提炼中文介绍…", -1)
            ])])) : C.descriptionKind === "ai" ? (c(), m("p", $p, [
              w[21] || (w[21] = n("span", { class: "gh-ai-tag-flag" }, "🤖", -1)),
              nt(u(C.description), 1)
            ])) : C.descriptionKind === "plain" ? (c(), m("p", {
              key: 2,
              class: "desc",
              title: C.description
            }, u(C.description), 9, Mp)) : (c(), m("p", Ip, "暂无描述"))
          ]),
          n("div", Ap, [
            n("span", Ep, "★ " + u(C.stars), 1),
            C.language ? (c(), m("span", Dp, u(C.language), 1)) : P("", !0),
            C.updated ? (c(), m("span", Pp, "更新 " + u(C.updated), 1)) : P("", !0)
          ])
        ], 42, fp))), 128))
      ], 2)) : P("", !0),
      s(ge).totalPages > 1 ? (c(), m("div", Wp, [
        n("button", {
          class: "gh-page-btn",
          type: "button",
          disabled: s(ge).page <= 1,
          onClick: w[3] || (w[3] = (C) => s(mt).changePage(s(ge).page - 1))
        }, "‹ 上一页", 8, Np),
        n("span", Op, u(s(ge).page) + " / " + u(s(ge).totalPages) + " · 共 " + u(s(ge).totalItems) + " 个" + u(s(ge).serverPaged ? ` · 已加载 ${s(ge).loadedItems}` : ""), 1),
        n("button", {
          class: "gh-page-btn",
          type: "button",
          disabled: s(ge).page >= s(ge).totalPages,
          onClick: w[4] || (w[4] = (C) => s(mt).changePage(s(ge).page + 1))
        }, "下一页 ›", 8, Rp)
      ])) : P("", !0),
      (c(), ne(Tt, { to: "body" }, [
        t.active && i.visible ? (c(), m("div", {
          key: 0,
          class: "fo-cover-context-menu gh-repo-context-menu",
          style: ke({ left: `${i.x}px`, top: `${i.y}px` }),
          onClick: w[15] || (w[15] = j(() => {
          }, ["stop"])),
          onContextmenu: w[16] || (w[16] = j(() => {
          }, ["prevent"]))
        }, [
          n("div", {
            class: re(["gh-menu-has-sub", { "is-active": a.value === "folder" }]),
            onMouseenter: w[6] || (w[6] = (C) => a.value = "folder")
          }, [
            w[22] || (w[22] = n("button", {
              class: "fo-cover-menu-item with-sub-arrow",
              type: "button"
            }, [
              n("span", null, "📁 所属 本地分组"),
              n("span", { class: "sub-arrow" }, "›")
            ], -1)),
            n("div", {
              class: re(["gh-sub-flyout", { "flyout-left": r.value }]),
              onClick: w[5] || (w[5] = j(() => {
              }, ["stop"]))
            }, [
              n("button", {
                class: re(["fo-cover-menu-item", { primary: i.folders.length === 0 }]),
                type: "button",
                onClick: A
              }, u(i.folders.length === 0 ? "✓ " : "  ") + "＋ 设为未分类（清空列表） ", 3),
              (c(!0), m(ee, null, be(s(Oe).cats, (C) => (c(), m("button", {
                key: C,
                class: re(["fo-cover-menu-item", { primary: i.folders.includes(C) }]),
                type: "button",
                onClick: (Q) => I(C)
              }, u(i.folders.includes(C) ? "✓ " : "  ") + "📁 " + u(C), 11, Bp))), 128))
            ], 2)
          ], 34),
          n("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: w[7] || (w[7] = (C) => a.value = null),
            onClick: w[8] || (w[8] = (C) => f())
          }, " ✏️ 编辑备注… ", 32),
          n("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: w[9] || (w[9] = (C) => a.value = null),
            onClick: b
          }, " 创建任务 ", 32),
          X(Fs, {
            label: "💬 发送到聊天室",
            visible: i.visible,
            onOpen: w[10] || (w[10] = (C) => a.value = null),
            onSelect: p
          }, null, 8, ["visible"]),
          i.hasRemark ? (c(), m("button", {
            key: 0,
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: w[11] || (w[11] = (C) => a.value = null),
            onClick: $
          }, " 🗑️ 清除备注 ", 32)) : P("", !0),
          n("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: w[12] || (w[12] = (C) => a.value = null),
            onClick: g
          }, " 📋 复制仓库链接 ", 32),
          n("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: w[13] || (w[13] = (C) => a.value = null),
            onClick: L
          }, " ↗ 在 GitHub 打开 ", 32),
          n("button", {
            class: "fo-cover-menu-item danger",
            type: "button",
            onMouseenter: w[14] || (w[14] = (C) => a.value = null),
            onClick: D
          }, " ⭐ 取消 Star ", 32)
        ], 36)) : P("", !0)
      ]))
    ], 64));
  }
}), Fp = /* @__PURE__ */ Re(Hp, [["__scopeId", "data-v-93d09653"]]), jp = { class: "gh-batch-bar-left" }, Vp = { class: "gh-batch-count-tip" }, Kp = { id: "gh-batch-selected-count" }, zp = {
  key: 0,
  "aria-label": "批量归属列表确认"
}, Gp = ["disabled"], Up = ["disabled"], Yp = { class: "gh-batch-bar-right" }, qp = ["disabled"], Xp = ["disabled"], Jp = ["disabled"], Qp = /* @__PURE__ */ he({
  __name: "GitHubBatchBar",
  props: {
    active: { type: Boolean, default: !0 }
  },
  setup(e) {
    const t = e, o = us(), i = q(null), a = ae(() => {
      const k = [
        { value: "", label: "未分类（清空所选仓库的所有列表所属）", icon: "🌐" }
      ];
      return ws.folders.filter((l) => l.kind === "custom").forEach((l) => {
        k.push({ value: l.title, label: l.title, icon: "📁" });
      }), k;
    });
    function r() {
      t.active && (o.value = Oe.prepareBatchMove(), i.value = null);
    }
    async function v() {
      const k = o.value, l = i.value;
      if (!t.active || !k || l === null || Gt.busy) return;
      await k.submit(l) && o.value === k && (o.value = void 0);
    }
    return tt(() => t.active && It.active, (k) => {
      k || (o.value = void 0);
    }), (k, l) => (c(), m(ee, null, [
      n("div", jp, [
        n("button", {
          type: "button",
          class: "gh-batch-action-btn",
          id: "gh-batch-select-all-btn",
          onClick: l[0] || (l[0] = (_) => s(eo).toggleSelectAll())
        }, u(s(It).allSelected ? "取消全选" : "全选"), 1),
        n("span", Vp, [
          l[5] || (l[5] = nt("已选择 ", -1)),
          n("b", Kp, u(s(It).selectedCount), 1),
          l[6] || (l[6] = nt(" 项", -1))
        ])
      ]),
      o.value ? (c(), m("section", zp, [
        n("p", null, "仅操作打开选择器时的 " + u(o.value.names.length) + " 个仓库；后来勾选的仓库不加入。", 1),
        n("details", null, [
          l[7] || (l[7] = n("summary", null, "查看本次仓库清单", -1)),
          n("ul", null, [
            (c(!0), m(ee, null, be(o.value.names, (_) => (c(), m("li", { key: _ }, u(_), 1))), 128))
          ])
        ]),
        X(na, {
          "model-value": i.value ?? "",
          options: a.value,
          disabled: s(Gt).busy,
          placeholder: "请选择目标列表",
          size: "sm",
          style: { "max-width": "260px" },
          "onUpdate:modelValue": l[1] || (l[1] = (_) => i.value = String(_))
        }, null, 8, ["model-value", "options", "disabled"]),
        n("button", {
          type: "button",
          disabled: !t.active || s(Gt).busy || i.value === null,
          onClick: v
        }, "确认加入列表", 8, Gp),
        n("button", {
          type: "button",
          disabled: s(Gt).busy,
          onClick: l[2] || (l[2] = (_) => o.value = void 0)
        }, "取消", 8, Up)
      ])) : P("", !0),
      n("div", Yp, [
        n("button", {
          type: "button",
          class: "gh-batch-action-btn",
          id: "gh-batch-move-btn",
          disabled: !t.active || s(Gt).busy || s(It).selectedCount === 0,
          title: "固定当前选择，批量加入所选本地分组",
          onClick: r
        }, " 📁 归入本地分组 ", 8, qp),
        n("button", {
          type: "button",
          class: "gh-batch-action-btn",
          id: "gh-batch-ai-btn",
          disabled: s(It).selectedCount === 0,
          title: "批量使用 AI 生成中文介绍",
          onClick: l[3] || (l[3] = (_) => s(eo).analyzeAi())
        }, " ✨ 批量 AI 分析 ", 8, Xp),
        n("button", {
          type: "button",
          class: "gh-batch-action-btn danger",
          id: "gh-batch-unstar-btn",
          disabled: s(It).selectedCount === 0,
          title: "从 GitHub 批量取消 Star 收藏",
          onClick: l[4] || (l[4] = (_) => s(eo).unstar())
        }, " 🗑 取消收藏 ", 8, Jp)
      ])
    ], 64));
  }
}), Zp = H(() => import("./GitHubWorkspaceCard-BtXVBK1K.js")), eh = H(() => import("./TabManagerPanel-DOx3J7yx.js")), th = H(() => import("./BookmarkNoteMenu-C9tZQxc5.js")), oh = H(() => import("./BookmarkPanel-CIS0wveF.js")), ih = H(() => import("./LauncherDialogs-2BphnIU2.js")), nh = H(() => import("./SettingsDialog-BsT2mC7g.js")), sh = H(() => import("./SettingsView-Dm7a7KoU.js")), ah = H(() => import("./ClockSettingsMenu-Bs5UwP2Y.js")), rh = H(() => import("./BiliTheaterDialog-DPZyt8DL.js")), lh = H(() => import("./BiliMiniPlayer-D9EmBlEi.js")), ch = H(() => import("./BiliMessagePanel-DvddWRDM.js")), dh = H(() => import("./BilibiliWorkspace-C5X94u7O.js")), uh = H(() => import("./AihotFeed-OGXqezzt.js")), ph = H(() => import("./GitHubTrending-BrXaP9kK.js")), hh = H(() => import("./AiDialog-3aJ-NyoO.js")), fh = H(() => import("./AihotViewer-Ggc0niSX.js")), gh = H(() => import("./NavWheelOverlay-CzkE2Zeg.js")), mh = H(() => import("./StandaloneHost-DGAowFcI.js")), wh = H(() => import("./LauncherFolderDialog-DlZK_Ukx.js")), yh = H(() => import("./LauncherMenus-BPkmzolQ.js"));
function Z(e, t, o, i) {
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
      const v = r.innerHTML, k = wi(o);
      k.config.errorHandler = (l, _, I) => {
        console.error(`LogicWeaver Vue feature failed: ${t.id} (${I})`, l), r.dataset.vueError = "1";
      };
      try {
        k.mount(r), i?.setMounted?.(!0);
      } catch (l) {
        throw i?.setMounted?.(!1), r.innerHTML = v, l;
      }
      return () => {
        i?.setMounted?.(!1), k.unmount();
      };
    }
  });
}
function vh(e) {
  e.register({
    id: "intro",
    title: "启动动画",
    order: 10,
    eager: !0,
    roots: ["endfield-loader"],
    capabilities: ["ui:intro", "boot:progress"],
    mount: () => {
      const t = document.getElementById("endfield-loader");
      if (!st.enabled) {
        t?.remove(), document.body.classList.remove("is-starting");
        return;
      }
      if (!t) return;
      const o = wi(qu);
      let i = !1;
      const a = () => {
        e.stop("intro");
      };
      window.addEventListener("logicweaver:intro-complete", a, { once: !0 }), o.mount(t);
      const r = window.setTimeout(() => {
        st.finish("基础界面已就绪，在线服务继续后台加载", !0), window.setTimeout(() => {
          i || (a(), t?.remove(), document.body.classList.remove("is-starting"));
        }, 600);
      }, 8e3);
      return () => {
        i || (i = !0, clearTimeout(r), window.removeEventListener("logicweaver:intro-complete", a), o.unmount(), t.remove(), document.body.classList.remove("is-starting"));
      };
    }
  }), Z(e, { id: "spa-app", title: "纯血 SPA 单根调度器", order: 15, root: "vue-spa-root", capabilities: ["ui:spa-root", "workspace:keepalive"] }, Hu), document.getElementById("vue-spa-root") || Z(e, { id: "bili-companions", title: "b站伴随窗口", order: 19, root: "vue-bili-companions-root", capabilities: ["ui:dock-companion"] }, mh), Z(e, { id: "notifications", title: "通知中心", order: 20, root: "vue-notification-root", capabilities: ["ui:toast", "notification:dedupe"] }, Wn), Z(e, { id: "profile-menu", title: "头像右键菜单", order: 21, root: "bili-profile-menu", capabilities: ["ui:profile-menu", "profile:actions"] }, Xu, Wo), Z(e, { id: "workspace-launchers", title: "常用工作区启动项", order: 22, root: "workspace-launchers", capabilities: ["ui:workspace-launchers", "workspace:launch"] }, Ju, ki), Z(e, { id: "mac-dock", title: "底部快捷应用 Dock 栏", order: 23, root: "mac-dock", capabilities: ["ui:mac-dock", "dock:navigate"] }, Pn, ut), Z(e, { id: "hero-clock", title: "首屏中央时钟", order: 26, root: "hero-clock", capabilities: ["ui:hero-clock", "clock:read"] }, An), Z(e, { id: "search-box", title: "首屏搜索框", order: 27, root: "search", capabilities: ["ui:search-box", "search:actions"] }, nn), Z(e, { id: "home-music", title: "首屏音乐播放器", order: 28, root: "task-thread-home", capabilities: ["ui:home-music", "music:playback"] }, En, Ze), Z(e, { id: "launcher-groups", title: "常用网站分组架", order: 29, root: "launcher-groups", capabilities: ["ui:launcher-groups", "launcher:navigate"] }, Dn, xe), Z(e, { id: "weather-widget", title: "首屏天气小部件", order: 39, root: "weather-body", capabilities: ["ui:weather-widget", "weather:read"] }, In), Z(e, { id: "github-workspace", title: "GitHub 独立页 Vue 工作台", order: 49, root: "vue-github-workspace-root", capabilities: ["ui:github-workspace"] }, Zp), Z(e, { id: "github-status", title: "GitHub 同步状态", order: 50, root: "vue-github-status-root", capabilities: ["ui:github-status", "github:sync-read"] }, op, an), Z(e, { id: "github-folders", title: "GitHub 文件夹导航", order: 55, root: "gh-folder-list", capabilities: ["ui:github-folders", "github:categorize-drop"] }, Qs, rn), Z(e, { id: "github-hero", title: "GitHub 分类摘要", order: 56, root: "gh-hero", capabilities: ["ui:github-summary", "github:actions"] }, Zs, ln), Z(e, { id: "github-repositories", title: "GitHub 仓库列表", order: 57, root: "vue-github-repositories-root", capabilities: ["ui:github-repositories", "github:repository-actions", "github:paging"] }, Fp, mt), Z(e, { id: "github-batch-bar", title: "GitHub Star 批量操作工具栏", order: 58, root: "gh-batch-bar", capabilities: ["ui:github-batch-bar", "github:batch-actions"] }, Qp, eo), Z(e, { id: "tab-manager", spaOwned: !0, title: "独立标签页管理", order: 71, root: "vue-tab-manager-root", capabilities: ["ui:tab-manager", "tabs:explicit"] }, eh, _n), Z(e, { id: "bookmark-menu", title: "书签上下文操作与备注菜单", order: 72, root: "vue-bookmark-menu-root", capabilities: ["ui:bookmark-menu", "bookmark:edit"] }, th, yi), Z(e, { id: "launcher-dialogs", title: "快捷启动器管理弹窗族", order: 73, root: "vue-launcher-dialogs-root", capabilities: ["ui:launcher-dialogs", "launcher:manage"] }, ih, tn), Z(e, { id: "launcher-folder-dialog", title: "大文件夹展开视窗", order: 74, root: "vue-launcher-folder-root", capabilities: ["ui:launcher-folder", "launcher:folder-dialog"] }, wh, on), Z(e, { id: "launcher-menus", title: "启动器快捷上下文菜单族", order: 76, root: "vue-launcher-menus-root", capabilities: ["ui:launcher-menus", "launcher:context-menu"] }, yh, mi), Z(e, { id: "bookmark-panel", title: "浏览器书签侧边滑动视窗", order: 77, root: "vue-bookmark-panel-root", capabilities: ["ui:bookmark-panel", "bookmarks:panel"] }, oh, No), Z(e, { id: "bookmark-folder-strip", spaOwned: !0, title: "顶栏书签快捷文件夹横条", order: 78, root: "vue-bookmark-folder-strip-root", capabilities: ["ui:bookmark-folder-strip", "bookmarks:strip"] }, null, dn), Z(e, { id: "settings-page", title: "独立设置页 Vue 工作台", order: 79, root: "vue-options-root", capabilities: ["ui:settings-page"] }, sh), Z(e, { id: "settings-dialog", title: "全局设置中心视窗", order: 80, root: "vue-settings-dialog-root", capabilities: ["ui:settings-dialog", "settings:manage"] }, nh, ao), Z(e, { id: "clock-settings-menu", spaOwned: !0, title: "中央时钟偏好配置菜单", order: 82, root: "vue-clock-settings-root", capabilities: ["ui:clock-settings", "clock:preference-edit"] }, ah, Ct), Z(e, { id: "bili-theater-dialog", title: "Bilibili 沉浸剧场与评论区弹窗", order: 85, root: "vue-bili-theater-root", capabilities: ["ui:bili-theater", "bili:playback"] }, rh, to), Z(e, { id: "bili-mini-player", title: "Bilibili 悬浮迷你播放器", order: 85, root: "vue-bili-mini-player-root", capabilities: ["ui:bili-mini-player", "bili:playback"] }, lh), Z(e, { id: "ai-dialog", title: "AI 助手对话框与知识点抽屉", order: 86, root: "vue-ai-dialog-root", capabilities: ["ui:ai-dialog", "ai:chat"] }, hh, _i), Z(e, { id: "aihot-viewer", spaOwned: !0, title: "AI HOT 资讯文章阅读器", order: 88, root: "vue-aihot-viewer-root", capabilities: ["ui:aihot-viewer", "viewer:aihot"] }, fh, bi), Z(e, { id: "nav-wheel", title: "辐射状快捷动作轮盘与悬浮球", order: 95, root: "vue-nav-wheel-root", capabilities: ["ui:nav-wheel", "nav:radial-menu"] }, gh, we), Z(e, { id: "bili-message-panel", spaOwned: !0, title: "Bilibili 消息与互动通知中心", order: 102, root: "vue-bili-message-panel-root", capabilities: ["ui:bili-message-panel", "bili:messages"] }, ch, kt), Z(e, { id: "bili-favorites", spaOwned: !0, title: "b站插件 Vue 外壳", order: 110, root: "vue-bili-favorites-root", capabilities: ["ui:bili-favorites-shell", "bilibili:favorites"] }, dh, hn), Z(e, { id: "aihot-feed", spaOwned: !0, title: "AI HOT 资讯流全功能聚合看板", order: 112, root: "vue-aihot-root", capabilities: ["ui:aihot-feed", "aihot:aggregate"] }, uh, fn), Z(e, { id: "github-trending", spaOwned: !0, title: "GitHub 趋势榜与热门流", order: 114, root: "vue-github-trending-root", capabilities: ["ui:github-trending", "github:trending"] }, ph, gn);
}
cs();
const Bo = la(Oo);
Na(Oo, Bo);
Oa(Oo);
vh(Bo);
cn.loadBookmarks();
(async () => {
  document.getElementById("vue-bili-favorites-root") && !document.getElementById("vue-spa-root") && await import("./bilibili-channel.service-B4hNPH3G.js"), await pa(), await Bo.startEager(), st.notifyBootReady();
})().catch((e) => console.error("[LogicWeaver] 页面启动失败", e));
window.addEventListener("pagehide", () => {
  Bo.stopAll();
}, { once: !0 });
export {
  Oi as C,
  Vd as D,
  qu as _,
  _n as a,
  Ri as b,
  Ct as c,
  Kh as d,
  _i as e,
  De as f,
  we as g,
  Xu as h,
  Te as i,
  Mn as j,
  Oo as k,
  K as n,
  Lo as t
};
