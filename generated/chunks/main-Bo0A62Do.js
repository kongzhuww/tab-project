import { l as fi, a as Ce, b as un, c as pn, d as _i, e as le, f as dt, S as hn, u as Oe, s as ms, g as ws, h as Ut, i as ys } from "./drawer-store-BkfYIYhg.js";
import { t as d, c as tt, o as fn, _ as Be, i as Ci, e as vs } from "./_plugin-vue_export-helper-CUD1GoS1.js";
/* empty css                */
import { c as xi, r as fe, a as zt, w as ot, b as q, d as he, o as Ke, e as vt, f as c, g as w, u as s, t as u, F as ee, h as n, i as ke, j as P, k as G, n as _e, l as ne, T as $t, m as st, p as Tt, v as Ho, q as re, s as ae, x as ht, y as oo, z as gi, A as ao, B as X, C as Wo, D as H, E as Ee, G as lo, H as gn, I as bs, J as ks, K as _s } from "./vendor-vue-C-_ocEUS.js";
import { n as ue, b as Wi, a as To, g as mn, c as wn, d as yn, e as wt, f as io, s as Yo, h as Ni, i as Cs, j as ho, k as xs, l as Ls, m as Re, o as Ue, p as ge, q as Ss, r as Ts, t as At, u as Yt, v as $s } from "./github.service-BkChs4sP.js";
import { t as fo, p as qo, a as Fo, n as ro, l as Me, b as jo, c as vn, s as Ms, d as Is, h as et, m as pt, e as Li, f as bn, g as ft, i as As, j as te, k as Es, o as Oi, q as kn, r as Nt, u as go, v as Ds, w as Ps, x as Ws } from "./search.service-gzbpg5BD.js";
import { c as Ns, a as Os, t as Rs, b as Bs, d as Hs, e as Fs, f as Ot, g as js } from "./calendar.service-Bm_mVIJW.js";
import { W as No, b as Vs } from "./wallpaper.service-ABQWPi7D.js";
import { w as xe, s as Si, P as Ks, i as Oo, D as Xo, a as Ri, g as Ve, p as zs, L as Gs, b as bt, c as Us, d as Jo, t as Bi, e as Ys, f as qs, h as Ct, l as _n } from "./window-manager.store-BoJtJrk7.js";
import { s as co } from "./store-B3c18loz.js";
import { b as no, a as Xs, c as Js, C as Qs } from "./ChatShareMenu-mUBr85SQ.js";
import { biliMessagePanelController as _t, biliMessagePanelState as Zs } from "./message-panel-store-B13S8f2C.js";
import { r as ea, a as qt } from "./radio-player-CCUSmV1E.js";
import { s as ta, a as oa } from "./stickers.service-BHqjZdvX.js";
import { a as Ti, b as ia } from "./store-BGGDiG-m.js";
import { b as Cn } from "./bili-favorites-store-DclRPAm4.js";
import { a as xn } from "./aihot-feed-store-C5Cd4xns.js";
import { g as Ln, T as na, i as sa, a as aa, b as ra, c as la, G as ca, d as da } from "./github-task-modal-store-CWGp282C.js";
import { fullscreenCardsController as xt } from "./fullscreen-cards.store-BDo2TeNB.js";
import { k as ua, m as pa } from "./core-utils-KTt-RZby.js";
import { t as Et } from "./together-listen.store-BaqEtApu.js";
import { L as Hi, a as Fi } from "./LauncherTileContent-BVdCmBbe.js";
import { u as ha } from "./InlineEditStatus.vue_vue_type_style_index_0_scoped_c63d0c6d_lang-Bk2ztKZ7.js";
import { e as fa, C as ga } from "./CustomSelect-DWkYhvBA.js";
const ma = /^[a-z][a-z0-9]*(?:[.:-][a-z0-9]+)*$/;
function wa() {
  const e = /* @__PURE__ */ new Map(), t = /* @__PURE__ */ new Map();
  function o(l) {
    if (!l || !ma.test(l.id)) throw new TypeError(`Invalid command id: ${l?.id || ""}`);
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
  function m() {
    return Object.freeze([...e.values()].map(r).sort((l, _) => l.category.localeCompare(_.category, "zh") || l.title.localeCompare(_.title, "zh")));
  }
  function b(l, _ = 20) {
    const I = String(l || "").trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
    if (!I.length) return m().slice(0, _);
    const A = [...e.values()].map((f) => {
      const $ = r(f), g = $.title.toLocaleLowerCase(), p = `${$.id} ${g} ${$.category} ${$.description} ${$.keywords.join(" ")}`.toLocaleLowerCase();
      if (!I.every((L) => p.includes(L))) return null;
      let k = 0;
      for (const L of I)
        $.id === L ? k += 200 : $.id.startsWith(L) && (k += 120), g === L ? k += 160 : g.startsWith(L) ? k += 100 : g.includes(L) && (k += 60), $.keywords.some((E) => E.toLocaleLowerCase().startsWith(L)) && (k += 40);
      return { item: $, score: k };
    }).filter((f) => !!f);
    return A.sort((f, $) => $.score - f.score || f.item.title.localeCompare($.item.title, "zh")), Object.freeze(A.slice(0, Math.max(1, _)).map((f) => f.item));
  }
  return Object.freeze({ register: o, execute: a, cancel: i, has: (l) => e.has(l), list: m, search: b });
}
const Vo = wa(), ya = /^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/;
function va(e) {
  const t = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map();
  function r(f) {
    if (!f || !ya.test(f.id)) throw new TypeError(`Invalid feature id: ${f?.id || ""}`);
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
  function m(f) {
    return typeof f == "function" ? f : f && typeof f.unmount == "function" ? () => f.unmount() : () => {
    };
  }
  function b(f) {
    if (o.has(f)) return Promise.resolve(o.get(f)?.cleanup);
    if (i.has(f)) return i.get(f);
    const $ = t.get(f);
    if (!$) return Promise.reject(new Error(`Unknown feature: ${f}`));
    a.delete(f);
    const g = new AbortController(), p = Object.freeze({
      signal: g.signal,
      commands: e,
      getRoot: (L) => document.getElementById(L)
    }), k = Promise.resolve().then(() => $.mount(p)).then((L) => (i.delete(f), o.set(f, { cleanup: L, controller: g }), L), (L) => {
      throw i.delete(f), a.set(f, L), g.abort(), L;
    });
    return i.set(f, k), k;
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
    g && (o.delete(f), g.controller.abort(), await m(g.cleanup)());
  }
  async function _() {
    const f = typeof document < "u" && !!(document.getElementById("vue-spa-root") || document.getElementById("logicweaver-spa-root")), $ = [...t.values()].filter((k) => !(!k.eager || !f && k.roots && k.roots.length > 0 && !k.roots.some((E) => !!document.getElementById(E)))).sort((k, L) => (k.order || 100) - (L.order || 100)), p = (await Promise.allSettled($.map((k) => b(k.id)))).flatMap((k, L) => k.status === "rejected" ? [{ id: $[L].id, reason: k.reason }] : []);
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
  return Object.freeze({ register: r, start: b, startEager: _, stop: l, stopAll: I, has: (f) => t.has(f), list: A });
}
const ba = localStorage.getItem("startupAnimationStyle") || localStorage.getItem("logicweaverStartupStyle") || "endfield", ji = (() => {
  try {
    const e = localStorage.getItem("showStartupAnimation"), t = localStorage.getItem("logicweaverEndfieldLoader"), o = e ?? t;
    return o === "1" || o === "true";
  } catch {
    return !1;
  }
})(), K = fe({
  enabled: ji,
  style: ba === "rhinelab" ? "rhinelab" : "endfield",
  renderedProgress: 4,
  targetProgress: 4,
  status: "CORE SHELL...",
  finished: !ji,
  exiting: !1,
  forced: !1
});
let Kt = 0, Ro = 4, Sn = performance.now(), mi = 0, $o = null, wi = !1;
function Tn(e) {
  const t = e - Sn, o = mi ? Math.min(1, t / mi) : 1, i = o * o * (3 - 2 * o);
  K.renderedProgress = Ro + (K.targetProgress - Ro) * i, o < 1 && !K.finished ? Kt = requestAnimationFrame(Tn) : Kt = 0;
}
function Mo(e, t) {
  if (!K.enabled || K.finished) return;
  const o = Math.max(K.targetProgress, Math.max(4, Math.min(100, Number(e) || 4)));
  t && (K.status = t), Ro = K.renderedProgress, K.targetProgress = o, Sn = performance.now(), mi = Math.max(280, Math.min(920, 220 + Math.abs(o - Ro) * 7.5)), cancelAnimationFrame(Kt), Kt = requestAnimationFrame(Tn);
}
function Ko(e = "Ready", t = !1) {
  K.finished || (K.finished = !0, K.forced = t, K.status = e, K.targetProgress = 100, cancelAnimationFrame(Kt), Kt = 0, K.renderedProgress = 100, $o?.(t));
}
function ka(e = "KEYBOARD SKIP") {
  Ko(e, !0);
}
function _a() {
  K.enabled || Ko("BOOT COMPLETE", !0);
}
function $n() {
  !K.enabled || K.finished || wi || (wi = !0, Mo(38, "INITIALIZING CORE SHELL..."), setTimeout(() => {
    K.finished || Mo(76, "SYNTHESIZING RUNTIME...");
  }, 400), setTimeout(() => {
    K.finished || Mo(100, K.style === "rhinelab" ? "ID CONFIRMED : JOYCE MOORE" : "TERRA LINK READY / 终端就绪");
  }, 900), setTimeout(() => {
    K.finished || Ko("BOOT COMPLETE / 首页就绪", !1);
  }, 1650));
}
async function Ca() {
  if (document.getElementById("vue-spa-root")) {
    try {
      const e = await chrome.storage.local.get(["showStartupAnimation", "startupAnimationStyle"]);
      typeof e.showStartupAnimation == "boolean" && (K.enabled = e.showStartupAnimation, localStorage.setItem("showStartupAnimation", K.enabled ? "1" : "0"), localStorage.setItem("logicweaverEndfieldLoader", K.enabled ? "1" : "0")), (e.startupAnimationStyle === "endfield" || e.startupAnimationStyle === "rhinelab") && (K.style = e.startupAnimationStyle, localStorage.setItem("startupAnimationStyle", K.style));
    } catch {
      console.warn("[Intro] Startup preferences unavailable; using first-paint preference.");
    }
    K.finished = !K.enabled, document.documentElement.dataset.startupStyle = K.style, document.documentElement.classList.toggle("skip-endfield-loader", !K.enabled), document.body.classList.toggle("is-starting", K.enabled);
  }
}
const Ye = zt(K), at = Object.freeze({
  update: Mo,
  finish: Ko,
  skip: ka,
  notifyBootReady: _a,
  async playIntro(e) {
    if (e?.style && (K.style = e.style), typeof document < "u" && (document.documentElement.dataset.startupStyle = K.style, document.documentElement.classList.remove("skip-endfield-loader"), document.body.classList.add("is-starting")), K.enabled = !0, K.finished = !1, K.forced = !!e?.force, K.renderedProgress = 4, K.targetProgress = 4, wi = !1, typeof document < "u") {
      let t = document.getElementById("endfield-loader");
      if (!t) {
        t = document.createElement("div"), t.id = "endfield-loader", t.className = "endfield-loader notranslate", document.body.appendChild(t);
        const { default: o } = await import("./IntroAnimation-YpUI-U_T.js"), i = xi(o), a = () => {
          window.removeEventListener("logicweaver:intro-complete", a), i.unmount(), t?.remove(), document.body.classList.remove("is-starting");
        };
        window.addEventListener("logicweaver:intro-complete", a, { once: !0 }), i.mount(t);
      }
    }
    $n();
  },
  get enabled() {
    return K.enabled;
  },
  get finished() {
    return K.finished;
  }
});
function xa(e) {
  return $o = e, K.finished && e(K.forced), () => {
    $o === e && ($o = null);
  };
}
const Mn = [
  { date: "今天", dayName: "周四", emoji: "🌤️", condition: "多云", highTemp: 26, lowTemp: 18, rainProb: 15 },
  { date: "明天", dayName: "周五", emoji: "⛅", condition: "阴天", highTemp: 24, lowTemp: 17, rainProb: 30 },
  { date: "后天", dayName: "周六", emoji: "🌧️", condition: "小雨", highTemp: 21, lowTemp: 16, rainProb: 75 },
  { date: "周日", dayName: "周日", emoji: "🌦️", condition: "阵雨", highTemp: 23, lowTemp: 15, rainProb: 45 },
  { date: "周一", dayName: "周一", emoji: "☀️", condition: "晴天", highTemp: 27, lowTemp: 18, rainProb: 10 },
  { date: "周二", dayName: "周二", emoji: "🌤️", condition: "多云", highTemp: 28, lowTemp: 19, rainProb: 15 },
  { date: "周三", dayName: "周三", emoji: "☀️", condition: "晴天", highTemp: 29, lowTemp: 20, rainProb: 5 }
], In = "lw_weather_snapshot_v1";
function La() {
  if (typeof window > "u" || typeof localStorage > "u") return null;
  try {
    const e = localStorage.getItem(In);
    if (!e) return null;
    const t = JSON.parse(e);
    if (t && t.data && t.data.currentTemp !== void 0)
      return {
        state: "ready",
        city: t.city || t.data.cityName || "",
        data: t.data,
        forecastDays: Array.isArray(t.forecastDays) && t.forecastDays.length ? t.forecastDays : Mn,
        detailInfo: t.detailInfo || null,
        updatedAt: t.savedAt || Date.now()
      };
  } catch {
  }
  return null;
}
function mo(e) {
  if (!(typeof window > "u" || typeof localStorage > "u"))
    try {
      e.data && localStorage.setItem(
        In,
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
const Sa = () => {
  const e = La();
  return {
    state: e?.state || "loading",
    city: e?.city || "",
    errorMessage: "",
    data: e?.data || null,
    updatedAt: e?.updatedAt || null,
    forecastModalOpen: !1,
    forecastDays: e?.forecastDays || Mn,
    detailInfo: e?.detailInfo || {
      humidity: "62%",
      wind: "东北风 2级",
      uvIndex: "中等 (4)",
      airQuality: "优 (32)"
    }
  };
}, R = fe(Sa());
let Qo = null, Zo = null;
const Xe = {
  get snapshot() {
    return zt(R);
  },
  update(e) {
    Object.assign(R, e), mo(R);
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
    }), mo(R);
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
    })) : [], mo(R);
  },
  setDetailInfo(e) {
    R.detailInfo = { ...e }, mo(R);
  },
  applyCity(e) {
    typeof window < "u" && window.dispatchEvent(new CustomEvent("logicweaver:weather-city-selected", { detail: { city: e } })), this.refresh();
  },
  refresh() {
    Qo ? Qo() : typeof window < "u" && window.dispatchEvent(new CustomEvent("logicweaver:weather-refresh"));
  },
  changeLocation(e) {
    Zo ? Zo(e) : typeof window < "u" && window.dispatchEvent(new CustomEvent("logicweaver:weather-change-location", { detail: { clientX: e?.clientX, clientY: e?.clientY } }));
  },
  setRefreshAction(e) {
    Qo = e;
  },
  setChangeLocationAction(e) {
    Zo = e;
  }
}, Ta = () => ({
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
}), ce = fe(Ta());
let ei = null;
const Rt = {
  get snapshot() {
    return zt(ce);
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
    ei ? ei(e) : window.dispatchEvent(new CustomEvent("logicweaver:clock-open-settings", { detail: { clientX: e?.clientX, clientY: e?.clientY } }));
  },
  setOpenSettingsAction(e) {
    ei = e;
  }
}, $a = [
  { id: "ai", title: "AI 助手" },
  { id: "todoist", title: "Todoist" },
  { id: "stickers", title: "表情包" },
  { id: "calcom", title: "预约" },
  { id: "wallpaper", title: "壁纸库" }
], Ma = () => ({
  mounted: !1,
  visible: !1,
  items: [...$a]
}), ti = fe(Ma());
let wo = {};
const $i = {
  getSnapshot() {
    return zt(ti);
  },
  update(e) {
    Object.assign(ti, e);
  },
  setMounted(e) {
    ti.mounted = e;
  },
  openWorkspace(e, t = !1) {
    if (wo.open) {
      wo.open(e);
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
    wo = { ...wo, ...e };
  }
}, oi = fe({ visible: !1, pendingWrites: 0 });
async function Ia(e) {
  if (oi.pendingWrites) throw new Error("壁纸操作正在处理，未自动排队");
  oi.pendingWrites++;
  try {
    return await e();
  } finally {
    oi.pendingWrites--;
  }
}
const Vi = {
  openDialog() {
    xe.open("wallpaper");
  },
  closeDialog() {
    xe.close("wallpaper");
  },
  resetDefault() {
    return Ia(() => No.clearWallpaper());
  }
}, Ki = [
  { id: "mono", label: "极简等宽", font: "ui-monospace, 'SF Mono', 'JetBrains Mono', Menlo, Consolas, monospace", sample: "15:50:10" },
  { id: "sans", label: "现代无衬线", font: "-apple-system, BlinkMacSystemFont, 'Segoe UI Variable Display', 'Segoe UI', Roboto, 'PingFang SC', sans-serif", sample: "15:50:10" },
  { id: "din", label: "经典几何", font: "'DIN Alternate', 'DIN Pro', 'Franklin Gothic Medium', Futura, sans-serif", sample: "15:50:10" },
  { id: "digital", label: "数码管等宽", font: "'Courier New', Courier, monospace", sample: "15:50:10" },
  { id: "impact", label: "硬派力量", font: "Impact, 'Arial Black', 'Trebuchet MS', sans-serif", sample: "15:50:10" },
  { id: "serif", label: "典雅衬线", font: "'Playfair Display', Georgia, 'Times New Roman', serif", sample: "15:50:10" },
  { id: "rounded", label: "圆润亲和", font: "'Quicksand', 'Comic Sans MS', 'Segoe UI', sans-serif", sample: "15:50:10" }
], zi = [
  { id: "white", label: "纯净皓白 (默认)", hex: "#ffffff" },
  { id: "black", label: "曜石极黑", hex: "#0f172a" },
  { id: "gold", label: "香槟金砂", hex: "#f59e0b" },
  { id: "cyan", label: "科技青蓝", hex: "#38bdf8" },
  { id: "emerald", label: "翡翠竹绿", hex: "#10b981" },
  { id: "rose", label: "淡雅樱粉", hex: "#fb7185" }
], sf = [
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
let ii = null;
const Lt = {
  state: me,
  setMounted(e) {
    me.mounted = e;
  },
  onAction(e) {
    ii = e;
  },
  dispatch(e, t) {
    if (ii)
      return ii(e, t);
  },
  open(e) {
    const i = typeof window < "u" ? window.innerWidth : 1280, a = typeof window < "u" ? window.innerHeight : 800, r = e?.clientX ?? e?.x ?? i / 2, m = e?.clientY ?? e?.y ?? a / 2, b = Math.max(12, Math.min(r - 40, i - 290 - 12)), l = Math.max(12, Math.min(m + 10, a - 420 - 12));
    me.x = b, me.y = l, me.isOpen = !0, this.dispatch("open", { x: b, y: l });
  },
  close() {
    me.isOpen = !1, this.dispatch("close");
  },
  setFont(e) {
    me.font = e;
    const t = Ki.find((o) => o.id === e);
    if (t) {
      Rt.applyConfig({ fontFamily: t.font });
      try {
        localStorage.setItem("lw_clock_font", e);
      } catch {
      }
    }
    this.dispatch("change", { font: e, color: me.color, timezone: me.timezone });
  },
  setColor(e) {
    me.color = e;
    const t = zi.find((o) => o.id === e);
    if (t) {
      Rt.applyConfig({
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
        const i = Ki.find((a) => a.id === e);
        i && Rt.applyConfig({ fontFamily: i.font });
      }
      const t = localStorage.getItem("lw_clock_color");
      if (t) {
        me.color = t;
        const i = zi.find((a) => a.id === t);
        i && Rt.applyConfig({ colorHex: i.hex, greetColor: i.hex, dateColor: i.hex, isCustomColor: !0 });
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
let ni = null, Io = !1;
async function Ao(e, t = {}) {
  if (e === "poll") return { state: "ready", model: oe.model };
  if (e === "connect") return { state: "ready", model: oe.model };
  throw new Error("旧版 AI 对话桥接已退役，请使用「海狸聊天室」开启智能会话。");
}
function An(e) {
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
  o || (e.state === "connecting" ? o = "正在连接本机 Codex 与 ChatGPT…" : e.state === "disconnected" ? o = "已待命（打开面板自动连接）" : e.authenticated ? o = `就绪 · ChatGPT ${e.plan || "已登录"}` : e.state === "ready" ? o = "就绪 · 尚未登录 ChatGPT" : o = t[e.state] || e.state), oe.statusText = o, oe.authHidden = !e.loginUrl, oe.authCode = e.loginCode || "", oe.authLink = e.loginUrl || "https://auth.openai.com/codex/device", oe.isStreaming = Io || e.busy || e.state === "running";
}
async function Aa() {
  try {
    const e = await Ao("poll");
    An(e);
  } catch {
  }
}
async function Ea(e, t) {
  if (e === "open" || e === "connect")
    try {
      oe.statusText = "正在连接本机 Codex 与 ChatGPT…";
      const o = await Ao("connect");
      An(o);
    } catch (o) {
      oe.statusText = o?.message || "连接失败";
    }
  else if (e === "send" && t?.text) {
    const o = t.text;
    oe.messages.push({
      id: `msg-${Date.now()}`,
      role: "user",
      content: o
    }), oe.inputText = "", oe.isStreaming = !0, Io = !0;
    try {
      await Ao("send", { text: o }), await Aa();
    } catch (i) {
      oe.statusText = i?.message || "发送失败";
    } finally {
      Io = !1, oe.isStreaming = !1;
    }
  } else if (e === "stop") {
    try {
      await Ao("stop");
    } catch {
    }
    oe.isStreaming = !1, Io = !1;
  }
}
const Mi = {
  state: oe,
  setMounted(e) {
    oe.mounted = e;
  },
  onAction(e) {
    ni = e;
  },
  dispatch(e, t) {
    if (ni)
      return ni(e, t);
    Ea(e, t);
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
}, si = fe({
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
}), yo = /* @__PURE__ */ new Set(), Da = {
  state: si,
  open(e) {
    Object.assign(si, e, { open: !0 });
  },
  update(e) {
    Object.assign(si, e);
  },
  close() {
    yo.forEach((e) => e("close"));
  },
  save(e) {
    yo.forEach((t) => t("save", e));
  },
  onAction(e) {
    return yo.add(e), () => yo.delete(e);
  }
}, Eo = fe({ isOpen: !1 }), En = {
  state: Eo,
  open() {
    Eo.isOpen = !0;
  },
  close() {
    Eo.isOpen = !1;
  }
}, ai = "biliProfileCacheV1", ct = "biliLocallyKnownMessageIdsV1", vo = "biliMessageUserCacheV1", Xt = "githubKnownReleaseVersionsV1", bo = "customNewtabAvatar", Gi = "biliToastKnownCountsV1";
class Pa {
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
    !t?.repository || !t?.version || (this.githubKnownVersions[t.repository] = t.version, typeof chrome < "u" && chrome?.storage?.local && await chrome.storage.local.set({ [Xt]: this.githubKnownVersions }), this.notifyGitHubListeners());
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
    }), o && typeof chrome < "u" && chrome?.storage?.local && chrome.storage.local.set({ [ct]: this.locallyKnownIds }).catch(() => {
    }), t;
  }
  markKnown(t, o, i) {
    this.locallyKnownIds[t] || (this.locallyKnownIds[t] = []);
    let a = !1;
    o && !this.locallyKnownIds[t].includes(o) && (this.locallyKnownIds[t].push(o), a = !0), i && !this.locallyKnownIds[t].includes(i) && (this.locallyKnownIds[t].push(i), a = !0), a && typeof chrome < "u" && chrome?.storage?.local && chrome.storage.local.set({ [ct]: this.locallyKnownIds }).catch(() => {
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
    this.locallyKnownIds[t] = Array.from(i), typeof chrome < "u" && chrome?.storage?.local && chrome.storage.local.set({ [ct]: this.locallyKnownIds }).catch(() => {
    }), this.applyBiliProfile(this.profile, this.unread);
  }
  applyBiliProfile(t, o = {}) {
    this.profile = t || null, this.unread = o || {};
    const a = this.customAvatar || String(t?.face || "assets/bilibili.svg").replace(/^http:/, "https:"), r = this.getVisibleUnread();
    if (fo.avatarUrl = a, fo.userName = t?.uname || "哔哩哔哩用户", fo.buttonTitle = "通知中心", qo.avatarUrl = a, qo.userName = t?.uname || "用户", qo.mid = t?.mid, typeof document < "u") {
      const m = document.getElementById("bili-profile-avatar");
      m && (m.src = a);
      const b = document.getElementById("bili-profile-button");
      b && (b.title = fo.buttonTitle);
    }
    _t.updateState({
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
          fetch("https://api.bilibili.com/x/msgfeed/unread?build=0&mobi_app=web", { credentials: "include" }).then(($) => $.json()),
          fetch("https://api.vc.bilibili.com/x/im/web/msgfeed/unread", { credentials: "include" }).then(($) => $.json()),
          fetch("https://api.vc.bilibili.com/session_svr/v1/session_svr/single_unread", { credentials: "include" }).then(($) => $.json())
        ]), b = a.status === "fulfilled" ? a.value?.data || {} : {}, l = r.status === "fulfilled" ? r.value?.data || {} : {}, _ = m.status === "fulfilled" ? m.value?.data || {} : {}, I = Number(l.at || 0), A = l.reply != null ? Number(l.reply || 0) : Math.max(0, Number(l.recv_reply || 0) - I), f = {
          reply: Math.max(Number(b.reply || 0), A),
          at: Math.max(Number(b.at || 0), I),
          like: Math.max(
            Number(b.like || b.praise || 0),
            Number(l.like || l.recv_like || 0)
          ),
          system: Math.max(Number(b.sys_msg || b.system || 0), Number(l.sys_msg || 0)),
          private: Number(
            b.chat || l.chat || Number(_.follow_unread || 0) + Number(_.unfollow_unread || 0) + Number(_.dustbin_push_msg || 0)
          )
        };
        this.applyBiliProfile(i, f), typeof chrome < "u" && chrome?.storage?.local && await chrome.storage.local.set({ [ai]: { profile: i, unread: f, savedAt: Date.now() } }), this.checkAndNotifyBiliInteractions(f);
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
      this.biliToastKnownCounts = { ...o }, typeof chrome < "u" && chrome?.storage?.local && chrome.storage.local.set({ [Gi]: this.biliToastKnownCounts }).catch(() => {
      });
      return;
    }
    const i = o.private - Number(this.biliToastKnownCounts.private || 0);
    o.like - Number(this.biliToastKnownCounts.like || 0);
    const a = o.reply - Number(this.biliToastKnownCounts.reply || 0), r = o.at - Number(this.biliToastKnownCounts.at || 0);
    o.system - Number(this.biliToastKnownCounts.system || 0), this.biliToastKnownCounts = { ...o }, typeof chrome < "u" && chrome?.storage?.local && chrome.storage.local.set({ [Gi]: this.biliToastKnownCounts }).catch(() => {
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
        _t.openPanel();
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
        _t.openPanel();
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
        _t.openPanel();
      }
    });
  }
  init() {
    this.initialized || (this.initialized = !0, Fo.setActions({
      onAction: async (t) => {
        if (t === "messages")
          ro.open();
        else if (t === "tabs")
          En.open();
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
      ai,
      ct,
      vo,
      Xt,
      bo
    ]).then((t) => {
      this.customAvatar = t[bo] || "", this.locallyKnownIds = t[ct] && typeof t[ct] == "object" ? t[ct] : {}, this.userCache = t[vo] && typeof t[vo] == "object" ? t[vo] : {}, this.githubKnownVersions = t[Xt] && typeof t[Xt] == "object" ? t[Xt] : {};
      const o = t[ai];
      o?.profile ? this.applyBiliProfile(o.profile, o.unread || {}) : this.applyBiliProfile(null, {});
    }).catch(() => {
    }), chrome.storage.onChanged && chrome.storage.onChanged.addListener((t, o) => {
      o === "local" && (t[bo] && (this.customAvatar = t[bo].newValue || "", this.applyBiliProfile(this.profile, this.unread)), t[ct] && (this.locallyKnownIds = t[ct].newValue || {}, this.applyBiliProfile(this.profile, this.unread)));
    })), _t.onAction((t, o) => {
      t === "mark-known" ? this.markKnown(o.kind, o.id, o.talkerId) : t === "mark-all-known" && this.markAllKnown(o.kind, o.ids);
    }), this.refreshBiliProfile(), setTimeout(() => {
      this.loadGitHubUpdates();
    }, 3500));
  }
}
const Ui = new Pa(), ie = fe({ open: !1, loading: !1, error: "", mid: "", name: "", face: "", sign: "", followed: !1, submitting: !1, left: 12, top: 12, videos: [] });
let ko = null;
const Do = {
  state: ie,
  open(e, t) {
    ko = t, Object.assign(ie, { open: !0, loading: !0, error: "", submitting: !1, videos: [] }, e);
  },
  update(e) {
    Object.assign(ie, e);
  },
  close() {
    ie.submitting || (ie.open = !1, ko = null);
  },
  async toggleFollow() {
    if (!(!ko || ie.submitting)) {
      ie.submitting = !0;
      try {
        const e = !ie.followed;
        await ko(e) && (ie.followed = e);
      } finally {
        ie.submitting = !1;
      }
    }
  }
}, Dn = {}, Yi = /* @__PURE__ */ new Set();
function Pn() {
  return new Proxy(Dn, {
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
      } : t === "subscribeAll" ? (o) => (Yi.add(o), () => {
        Yi.delete(o);
      }) : e[t];
    }
  });
}
function qi(e, t) {
  Dn[e] = t, typeof window < "u" && (window.__TAB_MACHINES__ = Pn());
}
function Wa() {
  return Pn();
}
const yi = () => ({
  icon: "🧭",
  title: "快捷轮盘",
  desc: "移动鼠标选择",
  active: !1
}), Ii = () => ({
  visible: !1,
  wedgePath: "",
  arcPath: "",
  line1: { x1: 0, y1: 0, x2: 0, y2: 0 },
  line2: { x1: 0, y1: 0, x2: 0, y2: 0 }
}), V = fe({
  mounted: !1,
  isOpen: !1,
  isExpanded: !1,
  mode: "main",
  ballPosition: { x: 0, y: 0 },
  hub: yi(),
  activeSectorId: null,
  sectors: [],
  beam: Ii()
});
let Xi = null;
function Na(e, t) {
  if (typeof e != "number" || !t)
    return Ii();
  const o = 160, i = 160, a = 26, r = 154, m = 360 / t, b = e - m / 2, l = e + m / 2, _ = b * Math.PI / 180, I = l * Math.PI / 180, A = o + a * Math.cos(_), f = i + a * Math.sin(_), $ = o + r * Math.cos(_), g = i + r * Math.sin(_), p = o + a * Math.cos(I), k = i + a * Math.sin(I), L = o + r * Math.cos(I), E = i + r * Math.sin(I), S = m > 180 ? 1 : 0, O = `M ${A.toFixed(1)} ${f.toFixed(1)} L ${$.toFixed(1)} ${g.toFixed(1)} A ${r} ${r} 0 ${S} 1 ${L.toFixed(1)} ${E.toFixed(1)} L ${p.toFixed(1)} ${k.toFixed(1)} A ${a} ${a} 0 ${S} 0 ${A.toFixed(1)} ${f.toFixed(1)} Z`, j = `M ${$.toFixed(1)} ${g.toFixed(1)} A ${r} ${r} 0 ${S} 1 ${L.toFixed(1)} ${E.toFixed(1)}`;
  return {
    visible: !0,
    wedgePath: O,
    arcPath: j,
    line1: {
      x1: parseFloat(A.toFixed(1)),
      y1: parseFloat(f.toFixed(1)),
      x2: parseFloat($.toFixed(1)),
      y2: parseFloat(g.toFixed(1))
    },
    line2: {
      x1: parseFloat(p.toFixed(1)),
      y1: parseFloat(k.toFixed(1)),
      x2: parseFloat(L.toFixed(1)),
      y2: parseFloat(E.toFixed(1))
    }
  };
}
const we = {
  get state() {
    return V;
  },
  getSnapshot() {
    return zt(V);
  },
  setMounted(e) {
    V.mounted = e;
  },
  setBallPosition(e, t) {
    V.ballPosition.x = e, V.ballPosition.y = t;
  },
  setVisibility(e) {
    V.isOpen = e;
  },
  setHub(e) {
    e ? V.hub = {
      icon: e.icon || "🧭",
      title: e.title || "快捷轮盘",
      desc: e.desc || "移动鼠标选择",
      active: !!e.active
    } : V.hub = yi();
  },
  setBeam(e, t) {
    V.beam = Na(e, t);
  },
  setActiveSector(e) {
    V.activeSectorId = e;
  },
  setSectors(e) {
    V.sectors = [...e];
  },
  expand(e, t, o = "main") {
    V.isOpen = !0, V.isExpanded = !0, V.mode = o, typeof e == "number" && typeof t == "number" && this.setBallPosition(e, t);
  },
  collapse() {
    V.isExpanded = !1, V.mode = "main", V.activeSectorId = null, V.beam = Ii(), V.hub = yi();
  },
  setWheelMode(e) {
    V.mode = e;
  },
  setActionHandler(e) {
    Xi = e;
  },
  dispatch(e, t) {
    Xi?.(e, t);
  }
}, Wn = [
  { id: "daily-bilibili", title: "b站插件", desc: "B站收藏夹与追番视频", icon: "assets/bilibili.svg" },
  { id: "daily-aihot", title: "ai hot插件", desc: "全网 AI 与前沿科技资讯", icon: "assets/nav-aihot.svg" },
  { id: "folder", title: "常用网站", desc: "点击展开快捷网站子轮盘", icon: "assets/nav-folder.svg", mode: "shortcuts" },
  { id: "card-github", title: "github插件", desc: "GitHub 趋势与星标项目", icon: "assets/nav-github.svg" },
  { id: "launcher", title: "首页", desc: "返回主屏常用应用台", icon: "assets/nav-home.svg" }
];
function Oa() {
  return Wn.filter((e) => e.mode || e.id === "launcher" || Oo(e.id));
}
function Ra() {
  return Ks.filter((e) => e.kind === "module" && Oo(e.id)).map((e) => ({
    id: e.id,
    title: e.title,
    desc: e.isDev ? "已启用的实验性组件" : e.categoryLabel,
    icon: e.icon || e.emoji || "🧩",
    tool: e.id
  }));
}
function Ji() {
  V.isExpanded && Qe();
}
let vi = [], so = Wn, ut = { x: 400, y: 300 }, Nn = !1, Jt = !1, ri = null, Qt = null, Je = !1;
const Ba = fe(/* @__PURE__ */ new Set()), Ha = /* @__PURE__ */ new Map();
function yt() {
  return globalThis.chrome?.storage;
}
function On(e, t) {
  const o = V.isExpanded ? 160 : 24;
  we.setBallPosition(
    Math.max(o + 8, Math.min(window.innerWidth - o - 8, e)),
    Math.max(o + 8, Math.min(window.innerHeight - o - 8, t))
  );
}
function Qe() {
  const e = V.mode;
  let t = [];
  e === "shortcuts" && (t = [...vi], t.push({
    id: "toggle-edit-shortcuts",
    title: Je ? d("navwheel.finishEdit") : d("navwheel.editSites"),
    desc: Je ? d("navwheel.finishEditDesc") : d("navwheel.editSitesDesc"),
    icon: Je ? "✅" : "✏️"
  })), so = e === "tools" ? Ra() : e === "shortcuts" ? [
    ...t,
    { id: "back-to-main", title: d("navwheel.back"), desc: d("navwheel.backDesc"), icon: "🔙", mode: "main" }
  ] : Oa();
  const o = so.length, i = o > 12 ? 118 : o > 9 ? 114 : 110, a = o > 12 ? 46 : o > 9 ? 50 : 56;
  we.setSectors(so.map((r, m) => {
    const b = -90 + 360 / o * m, l = b * Math.PI / 180;
    return {
      id: r.id,
      title: r.title,
      desc: r.desc,
      icon: r.icon,
      angleDeg: b,
      x: Math.round(160 + Math.cos(l) * i),
      y: Math.round(160 + Math.sin(l) * i),
      size: a,
      isShortcut: !!r.url
    };
  })), we.setWheelMode(e), we.setActiveSector(null), we.setBeam(null, 0), we.setHub(e === "shortcuts" ? Je ? { icon: "✏️", title: d("navwheel.editing") } : { icon: "🔙", title: d("navwheel.shortcuts") } : e === "tools" ? { icon: "🧰", title: d("navwheel.tools") } : null);
}
function Bo(e) {
  V.mode = e, Qe();
}
function St() {
  we.collapse(), On(V.ballPosition.x, V.ballPosition.y), we.setVisibility(Nn);
}
function Pt(e = V.ballPosition.x, t = V.ballPosition.y, o = "main") {
  we.expand(void 0, void 0, o), On(e, t), Qe(), we.setVisibility(!0);
}
function Fa(e) {
  if (e.id === "toggle-edit-shortcuts") {
    Rn();
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
  if (!(e.tool && !Oo(e.tool) || !e.url && !e.mode && e.id !== "launcher" && !Oo(e.id))) {
    if (e.mode) {
      Bo(e.mode);
      return;
    }
    if (St(), e.url) {
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
function Rn() {
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
async function ja(e) {
  if (!Je || !e || !e.url) return !1;
  try {
    const t = await yt()?.local?.get(["siteShelfLinks", "logicweaverNavWheelShortcutsV1"]), o = Array.isArray(t?.siteShelfLinks) ? t.siteShelfLinks : Array.isArray(t?.logicweaverNavWheelShortcutsV1) ? t.logicweaverNavWheelShortcutsV1 : [], i = o.findIndex((m) => m.url === e.url);
    if (i >= 0) {
      const m = o.filter((b, l) => l !== i);
      return await yt()?.local?.set({ siteShelfLinks: m, logicweaverNavWheelShortcutsV1: m }), await Pe.loadShortcuts(), Qe(), ue.show({
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
    return await yt()?.local?.set({ siteShelfLinks: r, logicweaverNavWheelShortcutsV1: r }), await Pe.loadShortcuts(), Qe(), ue.show({
      appName: d("navwheel.appName"),
      title: d("navwheel.addedTitle"),
      message: d("navwheel.addedNotice", { name: a.title }),
      duration: 2500
    }), !0;
  } catch (t) {
    return console.warn("[NavWheel] 即时处理快捷方式失败", t), !1;
  }
}
async function Va(e) {
  try {
    const t = await yt()?.local?.get(["siteShelfLinks", "logicweaverNavWheelShortcutsV1"]), o = Array.isArray(t?.siteShelfLinks) ? t.siteShelfLinks : Array.isArray(t?.logicweaverNavWheelShortcutsV1) ? t.logicweaverNavWheelShortcutsV1 : [], i = o.find((r) => String(r.id) === String(e)), a = o.filter((r) => String(r.id) !== String(e));
    await yt()?.local?.set({ siteShelfLinks: a, logicweaverNavWheelShortcutsV1: a }), await Pe.loadShortcuts(), Qe(), i && ue.show({
      appName: d("navwheel.appName"),
      title: d("navwheel.removedNotice"),
      message: d("navwheel.removedSite", { name: i.title || d("navwheel.site") }),
      duration: 2500
    });
  } catch (t) {
    console.warn("[NavWheel] 删除快捷方式失败", t);
  }
}
function Qi(e) {
  ut = { x: e.clientX, y: e.clientY };
}
function Zi(e) {
  e.button === 1 && (e.preventDefault(), e.stopPropagation(), ut = { x: e.clientX, y: e.clientY }, V.isExpanded ? St() : Pt(e.clientX, e.clientY));
}
function en(e) {
  e.button === 1 && e.preventDefault();
}
function tn(e) {
  if (e.key === "Escape") {
    if (Je) {
      e.preventDefault(), e.stopPropagation(), Je = !1, Ba.clear(), Ha.clear(), Qe(), ue.show({
        appName: d("navwheel.appName"),
        title: d("navwheel.exitedEditing"),
        duration: 1500
      });
      return;
    }
    if (!V.isExpanded || Si.active) return;
    e.preventDefault(), e.stopPropagation(), V.mode === "shortcuts" ? Bo("main") : St();
  }
}
function Ka(e) {
  try {
    const t = globalThis.chrome;
    if (typeof t?.runtime?.getURL == "function")
      return t.runtime.getURL("_favicon/?pageUrl=" + encodeURIComponent(e) + "&size=64");
  } catch {
  }
  return "";
}
function za(e) {
  const t = e.customIcon || e.icon;
  if (t && typeof t == "string" && !/google\.com\/s2\/favicons|icons\.duckduckgo/i.test(t))
    return t;
  if (e.url) {
    const o = Me.getCachedIcon(e.url);
    if (o) return o;
    const i = Ka(e.url);
    if (i) return i;
  }
  return e.icon || "🔗";
}
const Pe = {
  async start() {
    if (!Jt) {
      Jt = !0, ri = ot(tt, () => {
        V.isExpanded && Qe();
      }), ut = { x: Math.round(window.innerWidth / 2), y: Math.round(window.innerHeight / 2) }, we.setActionHandler((e, t) => {
        if (e === "hub:click")
          V.isExpanded ? V.mode === "shortcuts" ? Bo("main") : St() : Pt();
        else if (e === "sector:click" || e === "container:click") {
          const o = so.find((i) => i.id === t?.id || e === "container:click" && i.id === V.activeSectorId);
          o && Fa(o);
        } else if (e === "sector:hover") {
          const o = V.sectors.find((i) => i.id === t?.id);
          o && (we.setHub({ icon: o.icon, title: o.title, desc: o.desc, active: !0 }), we.setActiveSector(o.id), we.setBeam(o.angleDeg, so.length));
        } else e === "sector:leave" && (we.setActiveSector(null), we.setBeam(null, 0), we.setHub(V.mode === "shortcuts" ? { icon: "🔙", title: d("navwheel.shortcuts") } : V.mode === "tools" ? { icon: "🧰", title: d("navwheel.tools") } : null));
      }), window.addEventListener("logicweaver:dock-modules-changed", Ji), window.addEventListener("pointermove", Qi, { passive: !0 }), window.addEventListener("mousedown", Zi, !0), window.addEventListener("auxclick", en, !0), window.addEventListener("keydown", tn, !0), Qt = (e, t) => {
        t === "local" && (e.siteShelfLinks || e.logicweaverNavWheelShortcutsV1) && this.loadShortcuts();
      }, yt()?.onChanged?.addListener(Qt);
      try {
        if (!Jt) return;
        Nn = !1, we.setVisibility(!1);
      } catch {
      }
      await this.loadShortcuts(), Qe();
    }
  },
  stop() {
    Jt = !1, ri?.(), ri = null, we.setActionHandler(null), window.removeEventListener("logicweaver:dock-modules-changed", Ji), window.removeEventListener("pointermove", Qi), window.removeEventListener("mousedown", Zi, !0), window.removeEventListener("auxclick", en, !0), window.removeEventListener("keydown", tn, !0), Qt && yt()?.onChanged?.removeListener(Qt), Qt = null;
  },
  async loadShortcuts() {
    try {
      const e = await yt()?.local?.get(["siteShelfLinks", "logicweaverNavWheelShortcutsV1"]);
      if (!Jt) return;
      const t = e?.siteShelfLinks?.length ? e.siteShelfLinks : e?.logicweaverNavWheelShortcutsV1;
      vi = (Array.isArray(t) ? t : []).map((o, i) => ({
        id: String(o.id || `wheel-${i}`),
        title: String(o.title || o.url || d("navwheel.site")),
        desc: String(o.url || ""),
        url: String(o.url || ""),
        icon: za(o)
      })), V.mode === "shortcuts" && Qe();
    } catch (e) {
      console.warn("[NavWheel] 读取快捷方式失败", e);
    }
  },
  open(e, t) {
    Pt(e ?? ut.x, t ?? ut.y);
  },
  close: St,
  get isEditingShortcuts() {
    return Je;
  },
  isLinkInWheel(e) {
    return e ? vi.some((t) => t.url === e) : !1;
  },
  toggleEditingShortcuts: Rn,
  handleLinkSelection: ja,
  removeShortcut: Va,
  toggle(e = !1) {
    V.isExpanded ? St() : e ? Pt(ut.x, ut.y) : Pt();
  },
  toggleTools(e = !0) {
    V.isExpanded && V.mode === "tools" ? St() : Pt(
      e ? ut.x : V.ballPosition.x,
      e ? ut.y : V.ballPosition.y,
      "tools"
    );
  },
  setMode(e) {
    Bo(e);
  }
};
class Bt {
  constructor() {
    this.activeShortcuts = { ...Xo }, this.isListenerBound = !1, this.storageListenerBound = !1, this.shortcutReadVersion = 0, this.initShortcuts();
  }
  static getInstance() {
    return Bt.instance || (Bt.instance = new Bt()), Bt.instance;
  }
  getShortcuts() {
    return { ...this.activeShortcuts };
  }
  async setShortcut(t, o) {
    if (typeof t != "string" || !t || typeof o != "string")
      throw new Error("快捷键参数无效，未保存");
    if (typeof chrome > "u" || !chrome.storage?.local)
      throw new Error("快捷键存储不可用，未保存");
    const { optionsService: i, SHORTCUT_STORAGE_KEY: a } = await import("./options.service-C6Wx_t-q.js").then((I) => I.b), m = (await chrome.storage.local.get(a))[a], b = { ...m || {}, [t]: o }, l = this.shortcutReadVersion, _ = await i.saveSettings(
      { [a]: b },
      { [a]: m }
    );
    l === this.shortcutReadVersion && (++this.shortcutReadVersion, this.applyShortcutOverrides(_[a]));
  }
  applyShortcutOverrides(t) {
    const o = t && typeof t == "object" && !Array.isArray(t) ? Object.entries(t).filter((i) => Object.prototype.hasOwnProperty.call(Xo, i[0]) && typeof i[1] == "string") : [];
    this.activeShortcuts = { ...Xo, ...Object.fromEntries(o) };
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
    if (!t || !Ri(t)) return !1;
    if (Ve(t))
      return xe.handleToolClick(t), !0;
    switch (t) {
      case "bookmarks":
        return jo.toggle(), !0;
      case "settings":
        return co.open(), !0;
      case "nav-wheel":
        return Pe.toggle(!0), !0;
      case "toolbox":
        return Pe.toggleTools(!0), !0;
      case "search": {
        if (typeof document < "u") {
          const o = document.getElementById("search-input");
          if (o)
            return o.focus(), o.select(), !0;
        }
        return !1;
      }
      case "todoist-new-task":
        return typeof window < "u" && typeof window.triggerTodoistQuickAdd == "function" ? window.triggerTodoistQuickAdd() : xe.handleToolClick("todoist"), !0;
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
        if (Si.active || t.defaultPrevented || t.isComposing || t.repeat || t.target && (t.target.matches("input, textarea, select") || t.target.isContentEditable) && !t.altKey && !t.ctrlKey && !t.metaKey)
          return;
        const i = zs(t);
        if (!i) return;
        const a = i.toLowerCase();
        for (const [r, m] of Object.entries(this.activeShortcuts))
          if (!(!m || !Ri(r)) && m.toLowerCase().replace(/^cmd\+/, "meta+") === a) {
            t.preventDefault(), t.stopPropagation(), this.triggerToolShortcut(r);
            break;
          }
      },
      !0
    ));
  }
}
const bi = Bt.getInstance();
class Ht {
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
    return Ht.instance || (Ht.instance = new Ht()), Ht.instance;
  }
  get isVisible() {
    return zt(this._isVisible);
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
const Ga = Ht.getInstance(), on = [
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
function _o(e) {
  return e === 0 ? { emoji: "☀️", label: d("weather.condition.clear") } : e <= 2 ? { emoji: "🌤️", label: d("weather.condition.mainlyClear") } : e === 3 ? { emoji: "☁️", label: d("weather.condition.cloudy") } : e === 45 || e === 48 ? { emoji: "🌫️", label: d("weather.condition.fog") } : e >= 51 && e <= 57 ? { emoji: "🌦️", label: d("weather.condition.drizzle") } : e >= 61 && e <= 67 ? { emoji: "🌧️", label: d("weather.condition.rain") } : e >= 71 && e <= 77 ? { emoji: "🌨️", label: d("weather.condition.snow") } : e >= 80 && e <= 82 ? { emoji: "🌧️", label: d("weather.condition.rainShower") } : e >= 85 && e <= 86 ? { emoji: "🌨️", label: d("weather.condition.snowShower") } : e >= 95 ? { emoji: "⛈️", label: d("weather.condition.thunderstorm") } : { emoji: "🌡️", label: d("weather.condition.unknown") };
}
class Ft {
  constructor() {
    this.currentCity = "武汉", this.isRefreshing = !1, this.activeRequestId = 0, this.lastRawForecastData = null, this.initStorage();
  }
  static getInstance() {
    return Ft.instance || (Ft.instance = new Ft()), Ft.instance;
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
    const a = _o(i.current?.weather_code ?? 0), r = Math.round(i.current?.temperature_2m ?? 0), m = i.hourly?.time || [], b = Date.now();
    let l = m.findIndex((S) => new Date(S).getTime() >= b);
    l < 0 && (l = 0);
    const _ = [];
    for (let S = l; S < Math.min(l + 5, m.length); S++) {
      const O = S === l ? d("weather.now") : d("weather.hourSuffix", { hour: new Date(m[S]).getHours() }), j = _o(i.hourly.weather_code[S]), se = Math.round(i.hourly.temperature_2m[S]);
      _.push({ time: O, emoji: j.emoji, temp: se });
    }
    let I = d("weather.noRain12h");
    for (let S = l; S < Math.min(l + 12, m.length); S++) {
      const O = i.hourly.weather_code[S], j = i.hourly.precipitation_probability?.[S] || 0;
      if (O >= 51 || j >= 60) {
        const se = new Date(m[S]).getHours(), y = O >= 71 && O <= 77 || O === 85 || O === 86 ? d("weather.snow") : d("weather.rain"), x = j ? ` (${j}%)` : "";
        I = d("weather.expectPrecip", { time: `${se}:00`, type: y, prob: x });
        break;
      }
    }
    const A = [d("weather.today"), d("weather.tomorrow"), d("weather.afterTomorrow")], f = [], $ = i.daily?.time?.length || 0;
    for (let S = 1; S < Math.min(3, $); S++) {
      const O = A[S] || d("weather.plusDays", { count: S }), j = _o(i.daily.weather_code[S]), se = `${Math.round(i.daily.temperature_2m_max[S])}°/${Math.round(i.daily.temperature_2m_min[S])}°`;
      f.push({ label: O, emoji: j.emoji, tempRange: se });
    }
    const g = Math.round(i.daily?.temperature_2m_max?.[0] ?? r), p = Math.round(i.daily?.temperature_2m_min?.[0] ?? r), k = d("weather.tempRange", { cond: a.label, max: g, min: p }), L = {
      cityName: o.name || t,
      currentEmoji: a.emoji,
      currentTemp: r,
      subText: k,
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
      for (let j = 0; j < i.daily.time.length; j++) {
        const se = new Date(i.daily.time[j]), T = j === 0 ? d("weather.today") : j === 1 ? d("weather.tomorrow") : j === 2 ? d("weather.afterTomorrow") : S[se.getDay()], y = _o(i.daily.weather_code[j]);
        O.push({
          date: `${se.getMonth() + 1}/${se.getDate()}`,
          dayName: T,
          emoji: y.emoji,
          condition: y.label,
          highTemp: Math.round(i.daily.temperature_2m_max[j]),
          lowTemp: Math.round(i.daily.temperature_2m_min[j]),
          rainProb: i.daily.precipitation_probability_max?.[j] || 0
        });
      }
      Xe.setForecastDays(O);
    }
    const E = {
      humidity: i.current?.relative_humidity_2m ? `${i.current.relative_humidity_2m}%` : "60%",
      wind: i.current?.wind_speed_10m ? `${Math.round(i.current.wind_speed_10m)} km/h` : d("weather.detail.windLight"),
      uvIndex: d("weather.detail.uvNormal"),
      airQuality: d("weather.detail.airGood")
    };
    Xe.setDetailInfo(E);
  }
  filterCities(t, o = 8) {
    const i = t.trim().toLowerCase();
    if (!i) return on.slice(0, o);
    const a = [];
    for (const r of on) {
      const m = r.name.toLowerCase(), b = r.pinyin.toLowerCase(), l = r.admin.toLowerCase();
      if ((m.startsWith(i) || b.startsWith(i) || m.includes(i) || b.includes(i) || l.includes(i)) && a.push(r), a.length >= o) break;
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
      const b = (await r.json()).results?.[0];
      if (!b) {
        i === this.activeRequestId && R.state !== "unconfigured" && Xe.notFound(o), this.isRefreshing = !1;
        return;
      }
      const l = `https://api.open-meteo.com/v1/forecast?latitude=${b.latitude}&longitude=${b.longitude}&current=temperature_2m,weather_code,relative_humidity_2m,wind_speed_10m&hourly=temperature_2m,weather_code,precipitation_probability&daily=temperature_2m_max,temperature_2m_min,weather_code,precipitation_probability_max&forecast_days=7&timezone=auto`, _ = await fetch(l);
      if (i !== this.activeRequestId || R.state === "unconfigured") {
        this.isRefreshing = !1;
        return;
      }
      const I = await _.json();
      this.lastRawForecastData = { city: o, loc: b, d: I }, i === this.activeRequestId && R.state !== "unconfigured" && this.applyForecastPayload(o, b, I);
    } catch (a) {
      i === this.activeRequestId && R.state !== "unconfigured" && Xe.error(a?.message || "天气加载失败，右键此处可重新选择地点。", o);
    } finally {
      i === this.activeRequestId && (this.isRefreshing = !1);
    }
  }
}
const Wt = Ft.getInstance();
function Ua(e, t) {
  window.LogicWeaverIntro = at, window.LogicWeaverStartupIntro = at, window.LogicWeaverNotifications = ue, window.LogicWeaverWindowManager = xe, window.LogicWeaverWindowTabs = xe, window.LogicWeaverDomFreezer = Gs, window.LogicWeaverWallpaperService = No, window.LogicWeaverLauncherService = Me, window.LogicWeaverLauncherRuntime = fi, window.LogicWeaverProfileService = Ui;
  try {
    Ui.init();
  } catch (o) {
    console.error("[ProfileService] init failed:", o);
  }
  window.LogicWeaverBookmarksService = vn, window.LogicWeaverCalendarService = Ns, window.LogicWeaverWeather = Xe, window.LogicWeaverWeatherService = Wt, window.LogicWeaverClock = Rt, window.LogicWeaverSearch = Ms, window.LogicWeaverSearchService = Is, Object.defineProperty(window, "LogicWeaverAiHotService", {
    configurable: !0,
    get: () => {
      import("./aihot.service-BPfLNnTQ.js").then(({ aiHotService: o }) => {
        window.LogicWeaverAiHotService = o;
      });
    }
  }), window.LogicWeaverHomeMusic = et, window.LogicWeaverLauncherGroups = Ce, window.LogicWeaverProfileMenu = Fo, window.LogicWeaverWorkspaceLaunchers = $i, window.LogicWeaverMacDock = pt, window.LogicWeaverFullscreen = xt, window.enterFullscreenCard = (o) => xt.enter(o), window.exitFullscreenCard = () => xt.exit(), window.cycleFullscreenCard = () => xt.cycle(), window.LogicWeaverPageVisibility = Ga, window.LogicWeaverBackgroundLibrary = Vi, window.LogicWeaverNotificationCenter = ro, window.LogicWeaverBookmarkMenu = Li, window.LogicWeaverBookmarkPanel = jo, window.LogicWeaverBookmarkFolderStrip = bn, window.LogicWeaverLauncherDialogs = un, window.LogicWeaverLauncherFolder = pn, window.LogicWeaverLauncherMenus = _i, window.LogicWeaverSettings = co, window.LogicWeaverClockSettings = Lt, window.LogicWeaverBiliTheater = no, window.LogicWeaverBilibiliService = Wi, window.getBiliJct = () => Wi.getBiliJct(), window.LogicWeaverBiliMiniPlayer = To, window.openBiliMiniPlayer = (o) => To.openVideo(o), window.LogicWeaverAiDialog = Mi, window.LogicWeaverAihotViewer = Ti, window.LogicWeaverNavWheel = we, window.openNavWheel = (o, i) => Pe.open(o, i), window.closeNavWheel = () => Pe.close(), window.toggleNavWheel = (o) => Pe.toggle(o), window.toggleToolWheel = (o) => Pe.toggleTools(o), window.setNavWheelMode = (o) => Pe.setMode(o), window.LogicWeaverShortcuts = bi, window.triggerToolShortcut = (o) => bi.triggerToolShortcut(o), window.LogicWeaverCommands = e, window.LogicWeaverFeatures = t, window.LogicWeaverCalendarView = Os, window.LogicWeaverGitHubStatus = mn, window.LogicWeaverGitHubFolders = wn, window.LogicWeaverGitHubHero = yn, window.LogicWeaverGitHubRepositories = wt, window.LogicWeaverGitHubBatchBar = io, window.LogicWeaverTodoistLabels = Rs, window.LogicWeaverTodoistWorkspace = Bs, window.LogicWeaverTodoistCalendarSidebar = Hs, window.LogicWeaverTodoistTaskList = Fs, window.LogicWeaverBiliMessagePanel = _t, window.LogicWeaverStickerBoard = ta, window.LogicWeaverStickersService = oa, window.LogicWeaverBiliFavorites = Cn, window.LogicWeaverBiliRadioTape = ea, window.LogicWeaverBiliOrganizerDialogs = Xs, window.LogicWeaverBiliUpGroupManager = Js, window.LogicWeaverBiliUpPreview = Do, window.LogicWeaverAihotFeed = xn, window.LogicWeaverGitHubTrending = Ln, window.LogicWeaverCalendarWorkspace = Ot, window.LogicWeaverCalendar = Ot, window.LogicWeaverTodoistMainWorkspace = js, window.LogicWeaverTodoistTaskDetail = Da, window.openBiliTheater = (o) => no.openVideo(o), window.closeBiliTheater = () => no.close(), window.showWindowsToast = (o) => {
    if (!o) return null;
    const i = Yo(o.target) || Ni(o.url) || (o.appType === "bili" ? Cs([o.title, o.subtitle, o.message].filter((a) => typeof a == "string").join(" ")) : void 0);
    return ue.show({
      ...o,
      target: i,
      onClick: () => {
        if (typeof o?.onClick == "function") return o.onClick();
        if (i) return ro.openTarget(i);
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
    const r = typeof i == "object" && i ? i : a, m = typeof i == "number" ? i : 3200, b = r.isError || /失败|错误|异常|未获取|未找到/i.test(o), l = r.title || (b ? "B站操作未完成" : "哔哩哔哩"), _ = r.subtitle || (o.length > 36 ? "" : o), I = r.message || (r.subtitle || o.length > 36 ? o : ""), A = {
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
      target: Yo(r.target) || Ni(r.url) || Yo({ type: "bili-video", bvid: r.bvid, aid: r.aid ? String(r.aid) : void 0 }),
      url: r.url,
      duration: Math.max(3e3, m)
    };
    return window.showWindowsToast(A);
  }, window.showFetchToast = (o, i, a = "", r = "assets/logo.png", m = 3200) => window.showWindowsToast({
    appName: o,
    title: i,
    subtitle: a,
    icon: r || "assets/logo.png",
    duration: m,
    showActions: !1,
    actionLabel: "",
    appType: "fetch"
  }), window.LogicWeaverKineticDrag = ua, window.LogicWeaverMarkdownAst = pa, window.setLauncherBackground = (o) => No.setWallpaper(o), window.backgroundDbClear = (o) => Vs(o), window.openBackgroundHistory = () => Vi.openDialog(), qi("biliMiniPlayer", To.machine), qi("neteaseAuth", et.authMachine), window.__TAB_MACHINES__ = Wa();
}
const $e = fe({
  isOpen: !1,
  query: "",
  selectedIndex: 0
});
let Co = null;
const Bn = {
  get state() {
    return $e;
  },
  open() {
    $e.isOpen || ($e.isOpen = !0, $e.query = "", $e.selectedIndex = 0, Co = xe.pushModalCloser(() => (this.close(), !0)));
  },
  close() {
    $e.isOpen && ($e.isOpen = !1, $e.query = "", $e.selectedIndex = 0, Co && (Co(), Co = null));
  },
  toggle() {
    $e.isOpen ? this.close() : this.open();
  },
  setQuery(e) {
    $e.query = e, $e.selectedIndex = 0;
  },
  selectNext(e) {
    e <= 0 || ($e.selectedIndex = ($e.selectedIndex + 1) % e);
  },
  selectPrev(e) {
    e <= 0 || ($e.selectedIndex = ($e.selectedIndex - 1 + e) % e);
  },
  async executeCommand(e) {
    this.close();
    try {
      await Vo.execute(e.id, void 0, "command-palette");
    } catch (t) {
      console.warn(`[CommandPalette] Failed to execute ${e.id}:`, t);
    }
  }
};
typeof window < "u" && window.addEventListener("keydown", (e) => {
  if (Si.active || e.defaultPrevented || e.isComposing || e.repeat) return;
  const t = (e.key || "").toLowerCase(), o = (e.ctrlKey || e.metaKey) && t === "k", i = e.altKey && (e.code === "Space" || t === " ");
  (o || i) && (e.preventDefault(), e.stopPropagation(), Bn.toggle());
}, !0);
function Ya(e) {
  e.register({
    id: "palette.toggle",
    title: "打开全局命令中心 (Spotlight)",
    category: "界面",
    keywords: ["命令", "palette", "spotlight", "raycast", "搜索", "cmd"],
    concurrency: "drop",
    run: () => Bn.toggle()
  }), e.register({
    id: "intro.skip",
    title: "跳过开屏动画",
    category: "界面",
    keywords: ["开屏", "启动", "skip"],
    concurrency: "drop",
    enabled: () => at.enabled && !at.finished,
    run: () => at.skip("COMMAND SKIP")
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
    enabled: () => Ot.ready,
    run: () => Ot.refresh()
  }), e.register({
    id: "calendar.today",
    title: "日历跳转到今天",
    category: "日历",
    keywords: ["今日", "today", "日期"],
    concurrency: "drop",
    enabled: () => Ot.ready,
    run: () => Ot.goToday()
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
const qa = {
  key: 0,
  class: "notice"
}, Xa = {
  key: 1,
  class: "muted small"
}, Ja = {
  key: 2,
  class: "notice"
}, Qa = {
  key: 3,
  class: "notice"
}, Za = { class: "wx-cur" }, er = { class: "wx-emoji" }, tr = { class: "wx-temp" }, or = { class: "wx-sub" }, ir = { class: "wx-rain" }, nr = { class: "wx-hours" }, sr = { class: "hh" }, ar = { class: "he" }, rr = { class: "ht" }, lr = { class: "wx-days" }, cr = ["open"], dr = { class: "weather-forecast-head" }, ur = { class: "weather-forecast-city-info" }, pr = { class: "weather-forecast-icon" }, hr = { id: "weather-forecast-city-title" }, fr = { class: "small muted" }, gr = { class: "weather-forecast-actions" }, mr = ["title"], wr = ["title"], yr = {
  key: 0,
  class: "weather-metrics-grid"
}, vr = { class: "weather-metric-item" }, br = { class: "metric-label" }, kr = {
  class: "metric-val",
  id: "weather-forecast-humidity"
}, _r = { class: "weather-metric-item" }, Cr = { class: "metric-label" }, xr = {
  class: "metric-val",
  id: "weather-forecast-wind"
}, Lr = { class: "weather-metric-item" }, Sr = { class: "metric-label" }, Tr = {
  class: "metric-val",
  id: "weather-forecast-uv"
}, $r = { class: "weather-metric-item" }, Mr = { class: "metric-label" }, Ir = {
  class: "metric-val",
  id: "weather-forecast-aqi"
}, Ar = {
  class: "weather-forecast-list",
  id: "weather-forecast-days-list"
}, Er = { class: "day-date-col" }, Dr = { class: "day-name" }, Pr = { class: "day-date small muted" }, Wr = { class: "day-weather-col" }, Nr = { class: "day-emoji" }, Or = { class: "day-cond" }, Rr = { class: "day-rain-col" }, Br = {
  key: 0,
  class: "rain-tag"
}, Hr = {
  key: 1,
  class: "rain-tag empty"
}, Fr = { class: "day-temp-bar-col" }, jr = { class: "low-temp" }, Vr = { class: "temp-track" }, Kr = { class: "high-temp" }, zr = { class: "weather-location-head" }, Gr = { class: "weather-location-title-row" }, Ur = { class: "weather-location-title" }, Yr = ["title"], qr = { class: "weather-input-wrapper" }, Xr = ["placeholder"], Jr = ["title"], Qr = {
  type: "submit",
  class: "weather-location-submit"
}, Zr = { key: 0 }, el = { class: "weather-section-subtitle" }, tl = {
  key: 0,
  class: "weather-location-suggestions"
}, ol = ["onClick"], il = { class: "weather-suggestion-name" }, nl = { class: "weather-suggestion-sub" }, sl = {
  key: 1,
  class: "weather-suggestion-empty"
}, al = { key: 1 }, rl = { class: "weather-section-subtitle" }, ll = { class: "weather-quick-chips-grid" }, cl = ["onClick"], dl = /* @__PURE__ */ he({
  __name: "WeatherWidget",
  setup(e) {
    const t = q(!1), o = q({ x: 0, y: 0 }), i = q(""), a = q(null), r = q(null), m = ["深圳", "武汉", "北京", "上海", "广州", "成都", "杭州", "南京", "西安", "重庆", "苏州", "天津"], b = ae(() => {
      const L = i.value.trim();
      return L ? Wt.filterCities(L, 6) : [];
    });
    function l(L) {
      const j = L?.clientX ?? window.innerWidth / 2 - 140, se = L?.clientY ?? window.innerHeight / 2 - 320 / 2, T = Math.max(12, Math.min(window.innerWidth - 280 - 12, j)), y = Math.max(12, Math.min(window.innerHeight - 320 - 12, se));
      o.value = { x: T, y }, t.value = !0, i.value = "", ht(() => {
        r.value?.focus();
      });
    }
    function _() {
      t.value = !1, i.value = "";
    }
    async function I(L) {
      const E = L.trim();
      E && (_(), await Wt.changeCity(E));
    }
    function A() {
      const L = i.value.trim();
      L && I(L);
    }
    function f(L) {
      if (!t.value) return;
      const E = L.target;
      a.value && !a.value.contains(E) && _();
    }
    function $(L) {
      t.value && L.key === "Escape" && (L.preventDefault(), _());
    }
    Ke(() => {
      Xe.setRefreshAction(() => {
        Wt.loadWeather();
      }), Xe.setChangeLocationAction((L) => {
        l(L);
      }), Wt.loadWeather(), ot(tt, () => {
        Wt.reformatCurrentWeather();
      }), window.addEventListener("pointerdown", f, !0), window.addEventListener("keydown", $, !0);
    }), vt(() => {
      window.removeEventListener("pointerdown", f, !0), window.removeEventListener("keydown", $, !0);
    });
    function g(L) {
      L.preventDefault(), l(L);
    }
    function p() {
      Xe.closeForecastModal();
    }
    function k(L) {
      L.target?.id === "weather-forecast-dialog" && p();
    }
    return (L, E) => (c(), w("div", {
      class: "weather-widget-container",
      onContextmenu: g
    }, [
      s(R).state === "unconfigured" ? (c(), w("p", qa, u(s(d)("weather.noCitySet")), 1)) : s(R).state === "loading" ? (c(), w("p", Xa, u(s(d)("common.loading")), 1)) : s(R).state === "not_found" ? (c(), w("p", Ja, u(s(d)("weather.cityNotFound", { city: s(R).city })), 1)) : s(R).state === "error" ? (c(), w("p", Qa, u(s(R).errorMessage || s(d)("weather.loadFailed")), 1)) : s(R).state === "ready" && s(R).data ? (c(), w(ee, { key: 4 }, [
        n("div", Za, [
          n("span", er, u(s(R).data.currentEmoji), 1),
          n("span", tr, u(s(R).data.currentTemp) + "°", 1)
        ]),
        n("p", or, u(s(R).data.subText), 1),
        n("p", ir, u(s(R).data.rainText), 1),
        n("div", nr, [
          (c(!0), w(ee, null, ke(s(R).data.hours, (S, O) => (c(), w("div", {
            key: O,
            class: "wx-h"
          }, [
            n("span", sr, u(S.time), 1),
            n("span", ar, u(S.emoji), 1),
            n("span", rr, u(S.temp) + "°", 1)
          ]))), 128))
        ]),
        n("div", lr, [
          (c(!0), w(ee, null, ke(s(R).data.days, (S, O) => (c(), w("span", { key: O }, u(S.label) + " " + u(S.emoji) + " " + u(S.tempRange), 1))), 128))
        ])
      ], 64)) : P("", !0),
      n("dialog", {
        id: "weather-forecast-dialog",
        class: "weather-forecast-dialog",
        open: s(R).forecastModalOpen,
        onClick: k
      }, [
        n("div", {
          class: "weather-forecast-shell",
          onClick: E[1] || (E[1] = G(() => {
          }, ["stop"]))
        }, [
          n("header", dr, [
            n("div", ur, [
              n("span", pr, u(s(R).data?.currentEmoji || "🌤️"), 1),
              n("div", null, [
                n("h3", hr, u(s(R).city || s(R).data?.cityName || s(d)("weather.forecastTitle")), 1),
                n("p", fr, u(s(R).data?.subText || s(d)("weather.forecastSub")), 1)
              ])
            ]),
            n("div", gr, [
              n("button", {
                id: "weather-forecast-refresh-btn",
                type: "button",
                class: "weather-forecast-btn",
                title: s(d)("weather.refreshTitle"),
                onClick: E[0] || (E[0] = (S) => s(Xe).refresh())
              }, u(s(d)("weather.refresh")), 9, mr),
              n("button", {
                id: "weather-forecast-close-btn",
                type: "button",
                class: "weather-forecast-close",
                title: s(d)("common.close"),
                onClick: p
              }, " ✕ ", 8, wr)
            ])
          ]),
          s(R).detailInfo ? (c(), w("div", yr, [
            n("div", vr, [
              n("span", br, u(s(d)("weather.metric.humidity")), 1),
              n("span", kr, u(s(R).detailInfo.humidity || "50%"), 1)
            ]),
            n("div", _r, [
              n("span", Cr, u(s(d)("weather.metric.wind")), 1),
              n("span", xr, u(s(R).detailInfo.wind || (s(tt) === "en" ? "Breeze" : "微风")), 1)
            ]),
            n("div", Lr, [
              n("span", Sr, u(s(d)("weather.metric.uv")), 1),
              n("span", Tr, u(s(R).detailInfo.uvIndex || (s(tt) === "en" ? "Moderate" : "中等")), 1)
            ]),
            n("div", $r, [
              n("span", Mr, u(s(d)("weather.metric.aqi")), 1),
              n("span", Ir, u(s(R).detailInfo.airQuality || (s(tt) === "en" ? "Good" : "良")), 1)
            ])
          ])) : P("", !0),
          n("div", Ar, [
            (c(!0), w(ee, null, ke(s(R).forecastDays, (S, O) => (c(), w("div", {
              key: O,
              class: "weather-forecast-day-row forecast-day-item"
            }, [
              n("div", Er, [
                n("span", Dr, u(S.dayName), 1),
                n("span", Pr, u(S.date), 1)
              ]),
              n("div", Wr, [
                n("span", Nr, u(S.emoji), 1),
                n("span", Or, u(S.condition), 1)
              ]),
              n("div", Rr, [
                S.rainProb > 0 ? (c(), w("span", Br, "☂️ " + u(S.rainProb) + "%", 1)) : (c(), w("span", Hr, u(s(d)("weather.metric.noRain")), 1))
              ]),
              n("div", Fr, [
                n("span", jr, u(S.lowTemp) + "°", 1),
                n("div", Vr, [
                  n("div", {
                    class: "temp-range-fill",
                    style: _e({
                      left: `${Math.max(0, Math.min(100, (S.lowTemp + 10) * 2))}%`,
                      width: `${Math.max(20, Math.min(80, (S.highTemp - S.lowTemp) * 6))}%`
                    })
                  }, null, 4)
                ]),
                n("span", Kr, u(S.highTemp) + "°", 1)
              ])
            ]))), 128))
          ])
        ])
      ], 8, cr),
      (c(), ne($t, { to: "body" }, [
        t.value ? (c(), w("div", {
          key: 0,
          ref_key: "contextMenuRef",
          ref: a,
          class: "weather-location-context-menu",
          style: _e({ left: `${o.value.x}px`, top: `${o.value.y}px` }),
          onClick: E[5] || (E[5] = G(() => {
          }, ["stop"])),
          onContextmenu: E[6] || (E[6] = G(() => {
          }, ["prevent"]))
        }, [
          n("div", zr, [
            n("div", Gr, [
              n("span", Ur, u(s(d)("weather.menu.changeLocation")), 1),
              n("span", {
                class: "weather-location-curr-badge",
                title: s(R).city
              }, [
                E[7] || (E[7] = n("span", { class: "weather-curr-dot" }, null, -1)),
                st(" " + u(s(R).city || s(d)("weather.menu.unset")), 1)
              ], 8, Yr)
            ])
          ]),
          n("form", {
            class: "weather-location-form",
            onSubmit: G(A, ["prevent"])
          }, [
            n("div", qr, [
              E[8] || (E[8] = n("span", { class: "weather-input-icon" }, "🔍", -1)),
              Tt(n("input", {
                ref_key: "inputRef",
                ref: r,
                class: "weather-location-input",
                placeholder: s(d)("weather.menu.inputPlaceholder"),
                "onUpdate:modelValue": E[2] || (E[2] = (S) => i.value = S),
                onKeydown: E[3] || (E[3] = (S) => s(fn)(S, A)),
                autocomplete: "off"
              }, null, 40, Xr), [
                [Ho, i.value]
              ]),
              i.value ? (c(), w("button", {
                key: 0,
                type: "button",
                class: "weather-input-clear",
                onClick: E[4] || (E[4] = (S) => i.value = ""),
                title: s(d)("weather.menu.clearInput")
              }, "✕", 8, Jr)) : P("", !0)
            ]),
            n("button", Qr, u(s(d)("weather.menu.submit")), 1)
          ], 32),
          i.value.trim() ? (c(), w("div", Zr, [
            n("div", el, u(s(d)("weather.menu.suggestions")), 1),
            b.value.length ? (c(), w("div", tl, [
              (c(!0), w(ee, null, ke(b.value, (S) => (c(), w("button", {
                key: S.name + S.admin,
                type: "button",
                class: "weather-suggestion-item",
                onClick: (O) => I(S.name)
              }, [
                n("span", il, u(S.name), 1),
                n("span", nl, u(S.admin), 1)
              ], 8, ol))), 128))
            ])) : (c(), w("div", sl, u(s(d)("weather.menu.emptySuggestion")), 1))
          ])) : (c(), w("div", al, [
            n("div", rl, u(s(d)("weather.menu.commonCities")), 1),
            n("div", ll, [
              (c(), w(ee, null, ke(m, (S) => n("button", {
                key: S,
                type: "button",
                class: re(["weather-quick-chip", { active: s(R).city === S }]),
                onClick: (O) => I(S)
              }, u(S), 11, cl)), 64))
            ])
          ]))
        ], 36)) : P("", !0)
      ]))
    ], 32));
  }
}), Hn = /* @__PURE__ */ Be(dl, [["__scopeId", "data-v-a544e8f8"]]), ki = "heroCustomMottoV1";
function ul() {
  try {
    if (typeof localStorage < "u") {
      const e = localStorage.getItem(ki);
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
const Dt = ul(), B = fe({
  loaded: !1,
  customText: Dt.customText,
  history: Dt.history,
  currentIndex: Dt.customText && Dt.history.length ? Dt.history.findIndex((e) => e.text === Dt.customText) : -1,
  menuOpen: !1,
  menuPos: { x: 0, y: 0 }
});
function pl(e) {
  return new Promise((t) => {
    typeof chrome < "u" && chrome?.storage?.local?.get ? chrome.storage.local.get([e], (o) => t(o?.[e])) : t(null);
  });
}
function hl(e, t) {
  try {
    typeof localStorage < "u" && localStorage.setItem(e, JSON.stringify(t));
  } catch {
  }
  return new Promise((o) => {
    typeof chrome < "u" && chrome?.storage?.local?.set ? chrome.storage.local.set({ [e]: t }, () => o()) : o();
  });
}
function fl(e) {
  const t = (a) => String(a).padStart(2, "0"), o = `${e.getFullYear()}-${t(e.getMonth() + 1)}-${t(e.getDate())}`, i = `${t(e.getHours())}:${t(e.getMinutes())}`;
  return { date: o, time: i };
}
const qe = {
  async init() {
    try {
      const e = await pl(ki);
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
    await hl(ki, e);
  },
  setCustomMotto(e) {
    const t = e.trim();
    if (!t) {
      this.resetToSystem();
      return;
    }
    const { date: o, time: i } = fl(/* @__PURE__ */ new Date());
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
}, gl = ["title"], ml = ["placeholder"], wl = { class: "motto-content" }, yl = ["title"], vl = { class: "motto-menu-header" }, bl = { class: "dim" }, kl = { class: "motto-history-label" }, _l = { class: "motto-history-list" }, Cl = {
  key: 0,
  class: "motto-history-empty dim"
}, xl = ["onClick"], Ll = { class: "motto-item-date" }, Sl = ["title"], Tl = ["title", "onClick"], $l = /* @__PURE__ */ he({
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
    const m = ae(() => B.customText ? r(B.customText) : ce.greetingText);
    function b() {
      qe.closeMenu(), o.value = B.customText || ce.greetingText, t.value = !0, ht(() => {
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
      Ci(g) || (g.key === "Enter" ? (g.preventDefault(), l()) : g.key === "Escape" && (g.preventDefault(), _()));
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
    return Ke(() => {
      qe.init(), window.addEventListener("click", $);
    }), vt(() => {
      window.removeEventListener("click", $);
    }), (g, p) => (c(), w(ee, null, [
      n("div", {
        class: "hero-motto-wrapper",
        title: s(d)("motto.hint"),
        onWheel: A,
        onContextmenu: f
      }, [
        t.value ? Tt((c(), w("input", {
          key: 0,
          ref_key: "mottoInputRef",
          ref: i,
          "onUpdate:modelValue": p[0] || (p[0] = (k) => o.value = k),
          class: "hero-motto-input",
          type: "text",
          placeholder: s(d)("motto.placeholder"),
          maxlength: "60",
          onBlur: l,
          onKeydown: I
        }, null, 40, ml)), [
          [Ho, o.value]
        ]) : (c(), w("p", {
          key: 1,
          id: "greeting",
          class: "hero-motto-text",
          style: _e({
            color: s(ce).greetColor,
            textShadow: s(ce).greetColor === "#0f172a" ? "none" : "0 1px 8px rgba(0, 0, 0, 0.35)"
          }),
          onClick: b
        }, [
          n("span", wl, u(m.value), 1),
          s(B).history.length > 1 ? (c(), w("span", {
            key: 0,
            class: "motto-scroll-hint",
            title: s(d)("motto.scrollHint")
          }, "⇕", 8, yl)) : P("", !0)
        ], 4))
      ], 40, gl),
      (c(), ne($t, { to: "body" }, [
        s(B).menuOpen ? (c(), w("div", {
          key: 0,
          class: "motto-context-menu",
          style: _e({ left: `${s(B).menuPos.x}px`, top: `${s(B).menuPos.y}px` }),
          onClick: p[3] || (p[3] = G(() => {
          }, ["stop"])),
          onContextmenu: p[4] || (p[4] = G(() => {
          }, ["prevent"]))
        }, [
          n("div", vl, [
            n("span", null, u(s(d)("motto.customTitle")), 1),
            n("small", bl, u(s(d)("motto.recordsCount", { count: s(B).history.length })), 1)
          ]),
          n("button", {
            type: "button",
            class: "motto-menu-action",
            onClick: b
          }, [
            p[5] || (p[5] = n("i", null, "✎", -1)),
            n("span", null, u(s(d)("motto.editCurrent")), 1)
          ]),
          p[8] || (p[8] = n("div", { class: "motto-menu-divider" }, null, -1)),
          n("div", kl, u(s(d)("motto.historyLabel")), 1),
          n("div", _l, [
            s(B).history.length ? (c(!0), w(ee, { key: 1 }, ke(s(B).history, (k) => (c(), w("div", {
              key: k.id,
              class: re(["motto-history-item", { active: s(B).customText === k.text }]),
              onClick: (L) => s(qe).selectHistory(k)
            }, [
              n("span", Ll, u(k.date), 1),
              n("span", {
                class: "motto-item-text",
                title: r(k.text)
              }, u(r(k.text)), 9, Sl),
              n("button", {
                type: "button",
                class: "motto-item-del",
                title: s(d)("motto.deleteEntry"),
                onClick: G((L) => s(qe).deleteEntry(k.id), ["stop"])
              }, "×", 8, Tl)
            ], 10, xl))), 128)) : (c(), w("div", Cl, u(s(d)("motto.historyEmpty")), 1))
          ]),
          p[9] || (p[9] = n("div", { class: "motto-menu-divider" }, null, -1)),
          n("button", {
            type: "button",
            class: "motto-menu-action reset-btn",
            onClick: p[1] || (p[1] = //@ts-ignore
            (...k) => s(qe).resetToSystem && s(qe).resetToSystem(...k))
          }, [
            p[6] || (p[6] = n("i", null, "↻", -1)),
            n("span", null, u(s(d)("motto.resetGreeting")), 1)
          ]),
          s(B).history.length ? (c(), w("button", {
            key: 0,
            type: "button",
            class: "motto-menu-action danger-btn",
            onClick: p[2] || (p[2] = //@ts-ignore
            (...k) => s(qe).clearHistory && s(qe).clearHistory(...k))
          }, [
            p[7] || (p[7] = n("i", null, "🗑", -1)),
            n("span", null, u(s(d)("motto.clearAll")), 1)
          ])) : P("", !0)
        ], 36)) : P("", !0)
      ]))
    ], 64));
  }
}), Ml = /* @__PURE__ */ Be($l, [["__scopeId", "data-v-d112214f"]]), Il = /* @__PURE__ */ he({
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
      const l = Lt.state.timezone;
      if (!l || l === "local") return /* @__PURE__ */ new Date();
      try {
        const _ = (/* @__PURE__ */ new Date()).toLocaleString("en-US", { timeZone: l });
        return new Date(_);
      } catch {
        return /* @__PURE__ */ new Date();
      }
    }
    function a() {
      const l = (se) => String(se).padStart(2, "0"), _ = i(), I = _.getHours(), A = _.getMinutes(), f = _.getSeconds(), $ = _.getFullYear(), g = _.getMonth() + 1, p = _.getDate(), k = _.getDay(), L = `${l(I)}:${l(A)}`, E = `:${l(f)}`, S = o(I), O = d(t[k]), j = d("clock.datePattern", {
        year: $,
        month: g,
        day: p,
        week: O
      });
      Rt.updateTime(L, E, S, j);
    }
    function r(l) {
      l.preventDefault(), Lt.open({ clientX: l.clientX, clientY: l.clientY });
    }
    function m() {
      document.hidden ? b && (clearInterval(b), b = null) : (a(), b || (b = setInterval(a, 1e3)));
    }
    let b = null;
    return Lt.initPreferences(), a(), Ke(() => {
      Lt.initPreferences(), ot(tt, () => {
        a();
      }), ft.activeId || (a(), b = setInterval(a, 1e3)), document.addEventListener("visibilitychange", m);
    }), ot(
      () => ft.activeId,
      (l) => {
        l ? b && (clearInterval(b), b = null) : document.hidden || (a(), b || (b = setInterval(a, 1e3)));
      }
    ), vt(() => {
      b && (clearInterval(b), b = null), document.removeEventListener("visibilitychange", m);
    }), (l, _) => (c(), w("div", {
      class: "hero-clock-vue-container",
      onContextmenu: r
    }, [
      n("p", {
        id: "clock",
        class: "clock",
        style: _e({
          fontFamily: s(ce).fontFamily,
          color: s(ce).colorHex,
          textShadow: s(ce).colorHex === "#0f172a" ? "none" : "0 2px 14px rgba(0, 0, 0, 0.45)"
        })
      }, [
        st(u(s(ce).timeText), 1),
        n("span", {
          id: "secs",
          style: _e({ color: s(ce).colorHex })
        }, u(s(ce).secsText), 5)
      ], 4),
      n("p", {
        id: "date",
        class: "date",
        style: _e({
          color: s(ce).dateColor,
          textShadow: s(ce).dateColor === "#0f172a" ? "none" : "0 1px 8px rgba(0, 0, 0, 0.35)"
        })
      }, u(s(ce).dateText), 5)
    ], 32));
  }
}), Fn = /* @__PURE__ */ Be(Il, [["__scopeId", "data-v-16c004bb"]]), Al = {
  key: 0,
  class: "home-music-degraded-box"
}, El = { class: "degraded-badge-row" }, Dl = { class: "degraded-status" }, Pl = {
  key: 0,
  class: "degraded-host-tag"
}, Wl = {
  key: 1,
  class: "degraded-host-tag"
}, Nl = { class: "degraded-title-row" }, Ol = ["title"], Rl = { class: "degraded-track-artist" }, Bl = ["title"], Hl = { class: "degraded-progress-bar-wrap" }, Fl = { class: "degraded-actions" }, jl = { class: "degraded-time" }, Vl = { class: "home-vinyl-box" }, Kl = ["title"], zl = ["src", "alt"], Gl = { class: "home-music-right" }, Ul = ["title"], Yl = {
  id: "home-music-artist",
  class: "home-music-meta-artist"
}, ql = ["title"], Xl = { class: "home-music-seek-row" }, Jl = {
  id: "home-music-cur",
  class: "home-music-time"
}, Ql = ["value"], Zl = {
  id: "home-music-dur",
  class: "home-music-time"
}, ec = { class: "home-music-actions" }, tc = ["title"], oc = ["title"], ic = ["title"], nc = ["title"], sc = /* @__PURE__ */ he({
  __name: "HomeMusicCard",
  setup(e) {
    Ke(() => {
      setTimeout(() => {
        As();
      }, 200);
    });
    const t = ae(() => Es.visible || Et.djModalOpen || Et.isActive && Et.isJoined), o = ae(() => Et.isActive && Et.isJoined), i = ae(() => !te.title || te.title === "点击播放" ? d("home.music.defaultTitle") : te.title), a = ae(() => !te.artist || te.artist === "作者" ? d("home.music.defaultArtist") : te.artist), r = ae(() => te.mode === "shuffle" ? "🔀" : te.mode === "one" ? "🔂" : "🔁");
    function m(l) {
      const _ = l.target, I = Number(_.value);
      et.seek(I);
    }
    function b() {
      et.update({ coverUrl: "" });
    }
    return (l, _) => (c(), w("div", {
      id: "home-music-player-view",
      class: re(["home-music-player-view", { "is-degraded": t.value }])
    }, [
      t.value ? (c(), w("div", Al, [
        n("div", El, [
          _[6] || (_[6] = n("span", { class: "degraded-icon" }, "🎧", -1)),
          n("strong", Dl, u(o.value ? s(d)("home.music.togetherListening") : s(d)("home.music.backgroundListening")), 1),
          o.value ? (c(), w("span", Pl, " DJ: " + u(s(Et).hostName), 1)) : (c(), w("span", Wl, u(s(d)("home.music.workspaceReady")), 1))
        ]),
        n("div", Nl, [
          n("h3", {
            class: "degraded-track-title",
            title: i.value
          }, u(i.value || s(d)("home.music.standby")), 9, Ol),
          n("p", Rl, u(a.value), 1),
          n("p", {
            class: "home-music-current-lyric",
            title: s(te).currentLyric || ""
          }, u(s(te).currentLyric || "暂无歌词"), 9, Bl)
        ]),
        n("div", Hl, [
          n("div", {
            class: "degraded-progress-bar-fill",
            style: _e({ width: s(te).progressPercent + "%" })
          }, null, 4)
        ]),
        n("div", Fl, [
          n("button", {
            type: "button",
            class: "degraded-btn",
            onClick: _[0] || (_[0] = (I) => s(et).togglePlay())
          }, u(s(te).playing ? s(d)("home.music.pause") : s(d)("home.music.play")), 1),
          n("span", jl, u(s(te).formattedCurrent) + " / " + u(s(te).formattedDuration), 1)
        ])
      ])) : (c(), w(ee, { key: 1 }, [
        n("div", Vl, [
          n("div", {
            id: "home-vinyl-needle",
            class: re(["home-vinyl-needle", { playing: s(te).playing }])
          }, [..._[7] || (_[7] = [
            oo('<svg viewBox="0 0 32 52" fill="none" data-v-78f4a141><circle cx="26" cy="4" r="3.5" fill="#e2e8f0" stroke="#475569" stroke-width="1.5" data-v-78f4a141></circle><circle cx="26" cy="4" r="1.5" fill="#64748b" data-v-78f4a141></circle><path d="M26 4 L14 26 L11 44" stroke="#cbd5e1" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" data-v-78f4a141></path><rect x="7" y="42" width="8" height="9" rx="1.5" fill="#f43f5e" transform="rotate(-15 11 46)" data-v-78f4a141></rect></svg>', 1)
          ])], 2),
          n("div", {
            id: "home-vinyl-disc",
            class: re(["home-vinyl-disc", { playing: s(te).playing }]),
            title: s(d)("home.music.togglePlay"),
            onClick: _[1] || (_[1] = (I) => s(et).togglePlay())
          }, [
            s(te).coverUrl ? (c(), w("img", {
              key: 0,
              id: "home-vinyl-cover",
              class: "home-vinyl-cover",
              referrerpolicy: "no-referrer",
              src: s(te).coverUrl,
              alt: s(d)("home.music.coverAlt"),
              onError: b
            }, null, 40, zl)) : P("", !0),
            _[8] || (_[8] = n("div", { class: "home-vinyl-hole" }, null, -1))
          ], 10, Kl)
        ]),
        n("div", Gl, [
          n("h3", {
            id: "home-music-title",
            class: "home-music-meta-title",
            title: i.value
          }, u(i.value), 9, Ul),
          n("p", Yl, u(a.value), 1),
          n("p", {
            class: "home-music-current-lyric",
            title: s(te).currentLyric || ""
          }, u(s(te).currentLyric || "暂无歌词"), 9, ql),
          n("div", Xl, [
            n("span", Jl, u(s(te).formattedCurrent), 1),
            n("input", {
              id: "home-music-seek",
              class: "home-music-seek-bar",
              type: "range",
              min: "0",
              max: "100",
              value: s(te).progressPercent,
              onInput: m
            }, null, 40, Ql),
            n("span", Zl, u(s(te).formattedDuration), 1)
          ]),
          n("div", ec, [
            n("button", {
              id: "home-music-prev",
              class: "home-music-btn",
              type: "button",
              title: s(d)("home.music.prevTrack"),
              onClick: _[2] || (_[2] = (I) => s(et).prev())
            }, " ⏮ ", 8, tc),
            n("button", {
              id: "home-music-play",
              class: "home-music-btn play-btn",
              type: "button",
              title: s(d)("home.music.togglePlay"),
              onClick: _[3] || (_[3] = (I) => s(et).togglePlay())
            }, u(s(te).playing ? "⏸" : "▶"), 9, oc),
            n("button", {
              id: "home-music-next",
              class: "home-music-btn",
              type: "button",
              title: s(d)("home.music.nextTrack"),
              onClick: _[4] || (_[4] = (I) => s(et).next())
            }, " ⏭ ", 8, ic),
            n("button", {
              id: "home-music-mode",
              class: "home-music-btn",
              type: "button",
              title: s(d)("home.music.playMode"),
              onClick: _[5] || (_[5] = (I) => s(et).cycleMode())
            }, u(r.value), 9, nc)
          ])
        ])
      ], 64))
    ], 2));
  }
}), jn = /* @__PURE__ */ Be(sc, [["__scopeId", "data-v-78f4a141"]]), ac = {
  class: "launcher-group launcher-aihot launcher-todoist size-large",
  id: "launcher-todoist"
}, rc = { class: "card-head aihot-home-head" }, lc = { class: "title" }, cc = {
  class: "aihot-home-body",
  id: "aihot-home-body"
}, dc = {
  key: 0,
  class: "muted small"
}, uc = {
  key: 1,
  class: "notice small"
}, pc = {
  key: 2,
  class: "muted small aihot-home-empty"
}, hc = {
  key: 3,
  class: "aihot-home-rich-list"
}, fc = ["href", "title", "onClick"], gc = { class: "aihot-home-rich-main" }, mc = { class: "aihot-home-rich-title" }, wc = {
  key: 0,
  class: "aihot-home-rich-summary"
}, yc = { class: "aihot-home-rich-meta" }, vc = { class: "aihot-home-rich-meta-left" }, bc = {
  key: 0,
  class: "aihot-home-rich-tag"
}, kc = { class: "aihot-home-rich-source" }, _c = { class: "aihot-home-rich-time" }, Cc = 6, xc = /* @__PURE__ */ he({
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
    function m(p) {
      return tt.value === "en" && p.originalTitle ? p.originalTitle : p.title;
    }
    function b(p) {
      const k = p.source?.name || p.sourceName || "AI HOT";
      return tt.value === "en" && k.includes("：") ? k.split("：")[0].trim() : k;
    }
    function l(p) {
      if (!p.category) return "";
      const k = t[p.category];
      if (k)
        try {
          return d(k);
        } catch {
        }
      return p.category;
    }
    const _ = ae(() => tt.value !== "en" ? o.value : [...o.value].sort((p, k) => {
      const L = !!(p.originalTitle && /[a-zA-Z]{3,}/.test(p.originalTitle)), E = !!(k.originalTitle && /[a-zA-Z]{3,}/.test(k.originalTitle));
      return L && !E ? -1 : !L && E ? 1 : 0;
    }));
    function I(p) {
      const k = p.publishedAt || p.published || "";
      if (!k) return tt.value === "en" ? "Latest" : "最新";
      const L = Number(k), E = Number.isFinite(L) && L > 0 ? new Date(L > 1e12 ? L : L * 1e3) : new Date(k);
      if (isNaN(E.getTime())) return String(k).slice(0, 16) || (tt.value === "en" ? "Latest" : "最新");
      const S = (x) => String(x).padStart(2, "0"), O = E.getFullYear(), j = S(E.getMonth() + 1), se = S(E.getDate()), T = S(E.getHours()), y = S(E.getMinutes());
      return `${O}-${j}-${se} ${T}:${y}`;
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
      const k = (typeof window < "u" ? window : null)?.LogicWeaverAihotFeed?.getState?.()?.feedArticles;
      if (Array.isArray(k) && k.length)
        return k;
      const L = [
        "newtab_aihot_items_v2",
        "lw-aihot-cached-feed-all-24h-v1",
        "lw-aihot-cached-feed-v1"
      ];
      for (const E of L)
        try {
          const S = localStorage.getItem(E);
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
      const k = f();
      k.length ? (o.value = k, a.value = !1) : o.value.length || (o.value = [...A], a.value = !1);
      try {
        const E = await (await fetch("https://aihot.news/api/v1/items?mode=selected&window=24h&limit=24", {
          headers: { Accept: "application/json" },
          signal: AbortSignal.timeout(5e3)
        })).json(), S = Array.isArray(E) ? E : E.items || E.data || E.results || [];
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
    function g(p, k) {
      if (k.ctrlKey || k.metaKey || k.shiftKey || k.button === 1) return;
      k.preventDefault();
      const L = p.links?.original || p.links?.aihot || p.url || "#";
      Ti.openArticle(
        {
          id: p.id,
          title: m(p),
          summary: p.summary,
          sourceName: b(p),
          published: I(p),
          url: L
        },
        ""
      );
    }
    return Ke(() => {
      $();
    }), (p, k) => (c(), w("section", ac, [
      n("header", rc, [
        k[0] || (k[0] = n("span", { class: "bar cyan" }, null, -1)),
        n("strong", lc, u(s(d)("aihot.card.title")), 1)
      ]),
      n("div", cc, [
        a.value && !_.value.length ? (c(), w("p", dc, u(s(d)("aihot.card.loading")), 1)) : r.value && !_.value.length ? (c(), w("p", uc, u(r.value), 1)) : _.value.length ? (c(), w("div", hc, [
          (c(!0), w(ee, null, ke(_.value.slice(i.value, i.value + Cc), (L, E) => (c(), w("a", {
            key: L.id || L.title,
            class: "aihot-home-rich-card",
            href: L.links?.original || L.links?.aihot || L.url || "#",
            target: "_blank",
            rel: "noreferrer",
            title: `${m(L)}
${L.summary || ""}
${s(d)("aihot.card.viewInReader")}`,
            onClick: (S) => g(L, S)
          }, [
            n("span", {
              class: re(["aihot-home-rich-rank", { top: i.value + E < 3 }])
            }, u(i.value + E + 1), 3),
            n("div", gc, [
              n("h3", mc, u(m(L)), 1),
              L.summary ? (c(), w("p", wc, u(L.summary), 1)) : P("", !0),
              n("div", yc, [
                n("div", vc, [
                  l(L) ? (c(), w("span", bc, u(l(L)), 1)) : P("", !0),
                  n("span", kc, u(b(L)), 1)
                ]),
                n("time", _c, u(I(L)), 1)
              ])
            ])
          ], 8, fc))), 128))
        ])) : (c(), w("p", pc, u(s(d)("aihot.card.empty")), 1))
      ])
    ]));
  }
}), Lc = /* @__PURE__ */ Be(xc, [["__scopeId", "data-v-f4287f9a"]]), De = fe({
  showWeather: !0,
  showSites: !0,
  showHomeNews: !0,
  showHomePlayer: !0,
  showBili: !0,
  showTodo: !0,
  showBookmarkPanel: !0
}), Sc = ["aria-hidden", "inert"], Tc = ["aria-label"], $c = ["disabled", "aria-pressed"], Mc = ["disabled", "aria-pressed"], Ic = ["aria-label"], Ac = ["data-page", "title", "onClick", "onContextmenu", "onDragover", "onDrop"], Ec = {
  key: 0,
  id: "bookmark-board-header",
  class: "launcher-page-tabs"
}, Dc = ["data-page"], Pc = ["href", "title", "data-launcher-id", "onPointerdown", "onClick", "onContextmenu"], Wc = ["title", "data-launcher-folder", "onPointerdown", "onDragstart", "onDrop", "onClick", "onContextmenu"], Nc = ["title", "onClick"], Oc = {
  class: "launcher-folder-count",
  hidden: ""
}, Rc = {
  class: "launcher-empty",
  key: "empty-msg"
}, Bc = { class: "launcher-media-stack" }, Hc = { class: "launcher-folder-preview" }, Fc = { class: "launcher-folder-label launcher-title" }, jc = { class: "launcher-label launcher-title" }, Vc = /* @__PURE__ */ he({
  __name: "FavoriteSites",
  setup(e) {
    const t = H(() => import("./BookmarkBoard-CuxLYFut.js")), o = H(() => import("./LauncherBookGuideDialog-_f6OUezf.js")), i = ae({
      get: () => le.sitesView || "sites",
      set: (h) => Ce.setSitesView(h)
    }), a = q(!1), r = q(!1);
    function m() {
      r.value = !0;
    }
    function b() {
      r.value = !1;
    }
    function l() {
      ve(), p = !1, pe = !1;
    }
    Ke(() => {
      typeof chrome < "u" && chrome.storage?.local ? chrome.storage.local.get("defaultSitesView").then((v) => {
        i.value = v.defaultSitesView === "sites" ? "sites" : "bookmarks";
      }) : i.value = "bookmarks", Ce.setExternalDragHandler(T), Ce.setExternalDropHandler(y), window.addEventListener("blur", l), window.addEventListener("pagehide", l), document.addEventListener("visibilitychange", l);
      const h = window;
      le.hasBili && typeof h.ensureLauncherMediaCards == "function" && h.ensureLauncherMediaCards();
    });
    const _ = q(!1), I = q(""), A = q(null), f = q(null), $ = q(null), g = q(null);
    let p = !1, k = 0, L = 0, E = 0, S = "", O = 0, j = "", se = 0;
    function T(h) {
      if (i.value !== "sites") return;
      if (!h || dt.isOpen) {
        g.value && (g.value = null), j = "";
        return;
      }
      const v = document.elementsFromPoint(h.clientX, h.clientY);
      if (!v.some(
        (Ae) => Ae.classList.contains("launcher-site-items") || !!Ae.closest?.(".launcher-site-items")
      )) {
        g.value && (g.value = null), j = "";
        return;
      }
      const M = v.find((Ae) => Ae.classList.contains("launcher-link") && Ae.getAttribute("data-launcher-id") !== String(h.link.id) || Ae.classList.contains("launcher-folder"));
      if (!M) return;
      const z = M.classList.contains("launcher-link"), de = z ? M.getAttribute("data-launcher-id") : null, Te = z ? null : M.getAttribute("data-launcher-folder"), Y = z ? `link-${de}` : `folder-${Te}`, J = M.getBoundingClientRect(), Ne = J.left + J.width / 2, Uo = J.top + J.height / 2, Gt = Math.hypot(h.clientX - Ne, h.clientY - Uo), Mt = Date.now();
      if (Gt > Math.max(J.width, J.height) * 0.55 || Y === j && Mt - se < 180) return;
      const It = Go.value.filter(
        (Ae) => Ae.type !== "link" || String(Ae.link.id) !== String(h.link.id)
      ), nt = [...g.value || It], gt = nt.findIndex(
        (Ae) => Ae.type === "link" && String(Ae.link.id) === String(h.link.id)
      ), mt = nt.findIndex((Ae) => Ae.key === Y);
      if (mt < 0) return;
      const Ge = {
        key: `link-${h.link.id}`,
        type: "link",
        link: h.link
      };
      gt >= 0 ? gt !== mt && (nt.splice(gt, 1), nt.splice(mt, 0, Ge), g.value = nt, j = Y, se = Mt) : (nt.splice(mt, 0, Ge), g.value = nt, j = Y, se = Mt);
    }
    async function y(h) {
      if (i.value !== "sites" || dt.isOpen) return !1;
      if (g.value) {
        const v = g.value.map((C) => ({
          type: C.type,
          id: C.type === "link" ? String(C.link.id) : void 0,
          groupName: C.type === "folder" ? C.folder.groupName : void 0
        }));
        return await Me.moveLinkTo(String(h.id), le.activePage, "常用网站"), await Me.reorderPageItems(le.activePage, v), g.value = null, j = "", !0;
      }
      return !1;
    }
    const x = fe({
      visible: !1,
      x: 0,
      y: 0,
      type: "link",
      link: null,
      folder: null,
      offsetX: 34,
      offsetY: 38
    });
    let Q = null, W = 0, N = 0, D = null, F = null, pe = !1;
    function ye(h, v) {
      if (v.button !== 0) return;
      Q = v.pointerId, W = v.clientX, N = v.clientY, L = v.clientX, E = v.clientY, D = String(h.id), F = null, pe = !1;
      const C = v.currentTarget.getBoundingClientRect();
      x.offsetX = v.clientX - C.left, x.offsetY = v.clientY - C.top, x.type = "link", x.link = h, x.folder = null, window.addEventListener("pointermove", ze, { passive: !1 }), window.addEventListener("pointerup", Ie), window.addEventListener("pointercancel", Ie);
    }
    function it(h, v, C) {
      if (C.button !== 0 || C.target.closest(".launcher-folder-del-btn")) return;
      Q = C.pointerId, W = C.clientX, N = C.clientY, L = C.clientX, E = C.clientY, D = null, F = h, pe = !1;
      const M = C.currentTarget.getBoundingClientRect();
      x.offsetX = C.clientX - M.left, x.offsetY = C.clientY - M.top, x.type = "folder", x.folder = {
        groupName: h,
        size: Se(h),
        links: v?.links || []
      }, x.link = null, window.addEventListener("pointermove", ze, { passive: !1 }), window.addEventListener("pointerup", Ie), window.addEventListener("pointercancel", Ie);
    }
    let He = 0, rt = null;
    function lt() {
      cancelAnimationFrame(He), He = 0, rt = null;
    }
    function ze(h) {
      h.pointerId === Q && (pe && h.cancelable && h.preventDefault(), rt = h, !He && (He = requestAnimationFrame(() => {
        He = 0;
        const v = rt;
        rt = null, v && We(v);
      })));
    }
    function We(h) {
      if (h.pointerId !== Q || !D && !F) return;
      const v = Math.hypot(h.clientX - W, h.clientY - N);
      if (!pe && v > na && (pe = !0, p = !0, D ? f.value = D : F && ($.value = F)), !pe) return;
      (x.link || x.folder) && (x.visible = !0, x.x = h.clientX - x.offsetX, x.y = h.clientY - x.offsetY);
      const C = document.elementsFromPoint(h.clientX, h.clientY);
      if (Pi()) {
        const Y = C.some(
          (Ne) => Ne.id === "launcher-folder-dialog" || !!Ne.closest?.("#launcher-folder-dialog")
        ), J = document.querySelector("#launcher-folder-dialog");
        if (Y && J) {
          J.classList.add("drop-hover-valid"), dt.dropHoverValid = !0;
          return;
        } else
          J?.classList.remove("drop-hover-valid"), dt.dropHoverValid = !1;
        g.value = null;
        return;
      }
      const z = g.value || Go.value, de = D ? `link-${D}` : `folder-${F}`;
      if (z.length) {
        const Y = C.find((J) => {
          if (J.classList.contains("launcher-link")) {
            const Ne = J.getAttribute("data-launcher-id");
            return Ne && `link-${Ne}` !== de;
          }
          if (J.classList.contains("launcher-folder")) {
            const Ne = J.getAttribute("data-launcher-folder");
            return Ne && `folder-${Ne}` !== de;
          }
          return !1;
        });
        if (Y) {
          const J = Y.classList.contains("launcher-link"), Ne = J ? Y.getAttribute("data-launcher-id") : null, Uo = J ? null : Y.getAttribute("data-launcher-folder"), Gt = J ? `link-${Ne}` : `folder-${Uo}`, Mt = Y.getBoundingClientRect();
          let It = !0;
          D && !J && (sa(Mt, h.clientX, h.clientY) ? (It = !1, Y.classList.add("drop-target")) : Y.classList.remove("drop-target"));
          const nt = Date.now();
          if (aa(Mt, h.clientX, h.clientY) || (It = !1), Gt === S && nt - O < ra && (It = !1), It) {
            document.querySelectorAll(".launcher-folder.drop-target").forEach((Ge) => Ge.classList.remove("drop-target"));
            const gt = z.findIndex((Ge) => Ge.key === de), mt = z.findIndex((Ge) => Ge.key === Gt);
            if (gt >= 0 && mt >= 0 && gt !== mt) {
              const Ge = z.slice(), Ae = Ge.splice(gt, 1)[0];
              Ge.splice(mt, 0, Ae), g.value = Ge, S = Gt, O = nt;
            }
          }
        }
      }
      const Te = C.find((Y) => Y.classList.contains("launcher-page-tab"));
      if (Te) {
        const Y = Te.getAttribute("data-page");
        Y && Y !== le.activePage && Te.classList.add("drop-target");
      } else
        document.querySelectorAll(".launcher-page-tab.drop-target").forEach((Y) => Y.classList.remove("drop-target"));
    }
    async function Ie(h) {
      if (h.pointerId === Q) {
        lt(), h.type === "pointercancel" ? ve() : We(h), window.removeEventListener("pointermove", ze), window.removeEventListener("pointerup", Ie), window.removeEventListener("pointercancel", Ie);
        try {
          if (pe) {
            k = Date.now(), p = !1;
            const v = document.elementsFromPoint(h.clientX, h.clientY);
            if (document.querySelectorAll(".launcher-page-tab.drop-target").forEach((M) => M.classList.remove("drop-target")), document.querySelectorAll(".launcher-folder.drop-target").forEach((M) => M.classList.remove("drop-target")), Pi() && dt.activeFolder) {
              if (v.some(
                (z) => z.id === "launcher-folder-dialog" || !!z.closest?.("#launcher-folder-dialog")
              )) {
                const de = v.find((Te) => Te.hasAttribute("data-child-folder"))?.getAttribute("data-child-folder") || dt.activeFolder;
                D ? await Me.moveLinkTo(D, void 0, de) : F && await Me.moveFolderInto(F, de);
              }
              return;
            }
            const C = v.find((M) => M.classList.contains("launcher-page-tab"));
            if (C) {
              const M = C.getAttribute("data-page");
              if (M) {
                D ? (await Me.moveLinkTo(D, M, "常用网站"), await Me.setPage(M)) : F && await Me.moveFolderToPage(F, M), ve();
                return;
              }
            }
            if (D) {
              const M = v.find((z) => z.classList.contains("launcher-folder"));
              if (M) {
                const z = M.getAttribute("data-launcher-folder");
                if (z) {
                  await Me.moveLinkTo(D, le.activePage, z), ve();
                  return;
                }
              }
            }
            if (g.value) {
              const M = g.value.map((z) => ({
                type: z.type,
                id: z.type === "link" ? String(z.link.id) : void 0,
                groupName: z.type === "folder" ? z.folder.groupName : void 0
              }));
              await Me.reorderPageItems(le.activePage, M);
            }
          }
        } catch (v) {
          ue.show({ appName: "常用网站", title: "移动未完成", message: v instanceof Error ? v.message : "请刷新核对，未自动重试。" });
        } finally {
          ve();
        }
      }
    }
    function ve() {
      lt(), Q = null, D = null, F = null, pe = !1, p = !1, f.value = null, $.value = null, g.value = null, x.visible = !1, x.link = null, x.folder = null, S = "", document.querySelector("#launcher-folder-dialog")?.classList.remove("drop-hover-valid"), dt.dropHoverValid = !1, window.removeEventListener("pointermove", ze), window.removeEventListener("pointerup", Ie), window.removeEventListener("pointercancel", Ie);
    }
    vt(() => {
      Ce.setExternalDragHandler(null), Ce.setExternalDropHandler(null), ve(), window.removeEventListener("blur", l), window.removeEventListener("pagehide", l), document.removeEventListener("visibilitychange", l), window.removeEventListener("pointermove", ze), window.removeEventListener("pointerup", Ie), window.removeEventListener("pointercancel", Ie);
    });
    function Fe(h) {
      const v = le.pageLabels;
      return v && v[h] ? v[h] : h || "常用网站";
    }
    function Ze(h, v) {
      const C = String(h.page || "").trim(), M = String(v).trim(), z = le.pageLabels || {}, de = !C || C === "常用网站" || C === "默认";
      if (!M || M === "常用网站" || M === "默认") return de;
      if (de) return !1;
      if (C === M) return !0;
      const Y = z[C] || C, J = z[M] || M;
      return Y === J || C === J || Y === M;
    }
    function Se(h) {
      const v = le.groupSizes;
      return v && v[h] === "large" ? "large" : "small";
    }
    function uo(h) {
      return h === "large" ? 9 : 4;
    }
    function po(h, v) {
      const C = uo(v), M = h.length > C ? C - 1 : C;
      return h.slice(0, M);
    }
    const Go = ae(() => {
      const h = le.activePage || "常用网站", C = le.links.filter(
        (Y) => Ze(Y, h)
      ), M = /* @__PURE__ */ new Map();
      C.forEach((Y) => {
        const J = Y.group || "常用网站";
        J !== "常用网站" && (M.has(J) || M.set(J, []), M.get(J).push(Y));
      });
      const z = /* @__PURE__ */ new Set(), de = [];
      C.forEach((Y) => {
        const J = Y.group || "常用网站";
        Oi(le.folders, J) || (J === "常用网站" ? de.push({ key: `link-${Y.id}`, type: "link", link: Y }) : z.has(J) || (z.add(J), de.push({
          key: `folder-${J}`,
          type: "folder",
          folder: {
            groupName: J,
            pageName: h,
            links: M.get(J) || []
          }
        })));
      });
      const Te = le.folders;
      return Te && Object.entries(Te).forEach(([Y, J]) => {
        if (Oi(le.folders, Y)) return;
        const Ne = J?.page || "常用网站";
        (Ne === h || h === "常用网站" && Ne === "默认") && !z.has(Y) && (z.add(Y), de.push({
          key: `folder-${Y}`,
          type: "folder",
          folder: {
            groupName: Y,
            pageName: h,
            links: M.get(Y) || []
          }
        }));
      }), de;
    }), Ai = ae(() => g.value && g.value.length ? g.value : Go.value), Un = ae(() => {
      const h = le.activePage || "常用网站", v = Fe(h);
      return v === "默认" || h === "常用网站" ? "还没有快捷入口，点击“编辑入口”后添加。" : `“${v}”还是空的，把网站拖到这里。`;
    });
    function Ei(h) {
      g.value = null, f.value = null, $.value = null, Ce.switchPage(h);
    }
    function Yn() {
      _.value = !0, I.value = "", ht(() => {
        A.value?.focus();
      });
    }
    function Di() {
      if (!_.value) return;
      const h = I.value.trim();
      _.value = !1, h && Ce.addPage(h);
    }
    function qn(h) {
      Ci(h) || (h.key === "Enter" ? (h.preventDefault(), Di()) : h.key === "Escape" && (_.value = !1));
    }
    function Xn(h, v) {
      Ce.openPageMenu(h, v);
    }
    function Jn(h) {
      const v = h.target;
      if (!v || v.closest(".launcher-link") || v.closest(".launcher-folder") || v.closest(".launcher-page-tab") || v.closest("button") || v.closest("input"))
        return;
      h.preventDefault();
      const C = le.activePage || "常用网站";
      _i.openBlankMenu(C, h.clientX, h.clientY);
    }
    function Qn(h) {
      i.value === "sites" && (!h.shiftKey || le.pages.length < 2 || (h.preventDefault(), h.deltaY > 0 || h.deltaX > 0 ? Ce.nextPage() : Ce.prevPage()));
    }
    function Zn(h) {
      h.target.closest(".launcher-page-tab") || h.stopPropagation();
    }
    function es(h) {
      h.button === 0 && (L = h.clientX, E = h.clientY);
    }
    function ts(h, v) {
      if (v.preventDefault(), v.stopPropagation(), Pe.isEditingShortcuts) {
        Pe.handleLinkSelection(h);
        return;
      }
      Q || (p = !1), !(Math.hypot(v.clientX - L, v.clientY - E) >= 6 || p || Date.now() - k < 600) && Ce.openLink(h, v);
    }
    function os(h, v) {
      Ce.openLinkMenu(h, v);
    }
    function is(h, v) {
      if (Q || (p = !1), p || Date.now() - k < 450) {
        v.preventDefault(), v.stopPropagation();
        return;
      }
      Ce.openFolder(h, v);
    }
    function ns(h, v, C) {
      Ce.openFolderMenu(h, v, C);
    }
    function ss(h) {
      Ce.deleteFolder(h);
    }
    function as(h, v) {
      const C = Array.from(v.dataTransfer?.types || []);
      if (!C.includes("application/x-newtab-launcher") && !C.includes("application/x-newtab-bookmark") && !C.includes("text/uri-list") && !C.includes("text/plain")) return;
      v.preventDefault(), v.dataTransfer && (v.dataTransfer.dropEffect = "move"), le.activePage !== h && Ei(h), v.currentTarget?.classList.add("drop-target");
    }
    function rs(h) {
      h.currentTarget?.classList.remove("drop-target");
    }
    async function ls(h, v) {
      v.currentTarget?.classList.remove("drop-target");
      let M = "";
      const z = v.dataTransfer?.getData("application/x-newtab-launcher");
      if (z)
        try {
          M = String(JSON.parse(z)?.id || "");
        } catch {
        }
      if (!M && (f.value || window.__activeLauncherLink) && (M = String(window.__activeLauncherLink?.id || f.value || "")), M) {
        v.preventDefault(), v.stopPropagation(), await Me.moveLinkTo(M, h, "常用网站"), await Me.setPage(h);
        return;
      }
      const de = window;
      typeof de.importDroppedLauncherItem == "function" && (v.preventDefault(), v.stopPropagation(), await de.importDroppedLauncherItem(v, "常用网站", h));
    }
    function cs(h) {
      const v = Array.from(h.dataTransfer?.types || []);
      if (!v.includes("application/x-newtab-launcher") && !v.includes("application/x-newtab-bookmark") && !v.includes("text/uri-list") && !v.includes("text/plain")) return;
      h.preventDefault(), h.dataTransfer && (h.dataTransfer.dropEffect = v.includes("application/x-newtab-launcher") ? "move" : "copy"), h.currentTarget?.classList.add("drop-target");
    }
    function ds(h) {
      const v = h.currentTarget;
      v?.contains(h.relatedTarget) || v?.classList.remove("drop-target");
    }
    async function us(h) {
      h.currentTarget?.classList.remove("drop-target");
      let C = "";
      const M = h.dataTransfer?.getData("application/x-newtab-launcher");
      if (M)
        try {
          C = String(JSON.parse(M)?.id || "");
        } catch {
        }
      if (!C && (f.value || window.__activeLauncherLink) && (C = String(window.__activeLauncherLink?.id || f.value || "")), C) {
        h.preventDefault(), h.stopPropagation(), await Me.moveLinkTo(C, le.activePage, "常用网站");
        return;
      }
      const z = window;
      if (typeof z.importDroppedLauncherItem == "function") {
        h.preventDefault(), h.stopPropagation(), await z.importDroppedLauncherItem(h, "常用网站", le.activePage);
        return;
      }
      const de = h.dataTransfer?.getData("text/plain");
      de && /^https?:\/\//i.test(de.trim()) && (h.preventDefault(), h.stopPropagation(), await Me.addLink({
        title: "",
        url: de.trim(),
        page: le.activePage
      }));
    }
    function Pi() {
      if (!dt.isOpen) return !1;
      if (typeof document < "u") {
        const h = document.querySelector("#launcher-folder-dialog");
        return !!(h && h.open);
      }
      return !1;
    }
    function ps(h, v) {
      v.preventDefault();
    }
    function hs(h) {
      h.preventDefault(), h.dataTransfer && (h.dataTransfer.dropEffect = "move"), h.currentTarget?.classList.add("drop-target");
    }
    function fs(h) {
      h.currentTarget?.classList.remove("drop-target");
    }
    async function gs(h, v) {
      v.currentTarget?.classList.remove("drop-target"), v.preventDefault(), v.stopPropagation();
      const M = v.dataTransfer?.getData("application/x-newtab-launcher-folder");
      if (M && M !== h) {
        try {
          await Me.moveFolderInto(M, h);
        } catch (Te) {
          ue.show({ appName: "常用网站", title: "移动未完成", message: Te instanceof Error ? Te.message : "请刷新后核对。" });
        }
        return;
      }
      let z = "";
      const de = v.dataTransfer?.getData("application/x-newtab-launcher");
      if (de)
        try {
          z = String(JSON.parse(de)?.id || "");
        } catch {
        }
      !z && (f.value || window.__activeLauncherLink) && (z = String(window.__activeLauncherLink?.id || f.value || "")), z && await Me.moveLinkTo(z, le.activePage, h);
    }
    return (h, v) => (c(), w(ee, null, [
      n("section", {
        class: re(["launcher-group launcher-sites size-large", { "home-module-hidden": !s(De).showSites }]),
        "aria-hidden": !s(De).showSites,
        inert: !s(De).showSites,
        onWheel: Qn
      }, [
        n("header", {
          class: "launcher-group-head launcher-sites-head",
          onPointerdown: v[5] || (v[5] = G(() => {
          }, ["stop"])),
          onContextmenu: Zn
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
              onClick: v[0] || (v[0] = (C) => i.value = "sites")
            }, u(s(d)("home.sites.favoriteSites")), 9, $c),
            n("button", {
              type: "button",
              disabled: a.value,
              "aria-pressed": i.value === "bookmarks",
              onClick: v[1] || (v[1] = (C) => i.value = "bookmarks")
            }, u(s(d)("home.sites.bookmarks")), 9, Mc)
          ], 8, Tc),
          Tt(n("div", {
            class: "launcher-page-tabs",
            role: "tablist",
            "aria-label": s(d)("home.sites.pagesAria")
          }, [
            (c(!0), w(ee, null, ke(s(le).pages, (C) => (c(), w("button", {
              key: C,
              type: "button",
              class: re(["launcher-page-tab", { active: C === s(le).activePage }]),
              "data-page": C,
              role: "tab",
              title: s(d)("home.sites.pageTabTitle", { label: Fe(C) }),
              onPointerdown: v[2] || (v[2] = G(() => {
              }, ["stop"])),
              onClick: G((M) => Ei(C), ["prevent", "stop"]),
              onContextmenu: G((M) => Xn(C, M), ["prevent", "stop"]),
              onDragover: (M) => as(C, M),
              onDragleave: v[3] || (v[3] = (M) => rs(M)),
              onDrop: (M) => ls(C, M)
            }, u(Fe(C)), 43, Ac))), 128)),
            _.value ? Tt((c(), w("input", {
              key: 1,
              ref_key: "pageInputRef",
              ref: A,
              class: "launcher-page-input",
              maxlength: "12",
              placeholder: "例如：游戏区",
              "onUpdate:modelValue": v[4] || (v[4] = (C) => I.value = C),
              onKeydown: qn,
              onBlur: Di
            }, null, 544)), [
              [Ho, I.value]
            ]) : (c(), w("button", {
              key: 0,
              class: "launcher-page-add",
              type: "button",
              title: "添加网站分区，例如游戏区",
              "aria-label": "添加网站分区",
              onClick: Yn
            }, " + "))
          ], 8, Ic), [
            [gi, i.value === "sites"]
          ]),
          i.value === "bookmarks" ? (c(), w("div", Ec)) : P("", !0),
          n("button", {
            class: "launcher-page-help",
            type: "button",
            title: "使用指南：如何创建文件夹与整理网站",
            "aria-label": "使用指南与技巧",
            onClick: m
          }, " ? ")
        ], 32),
        i.value === "bookmarks" ? (c(), ne(s(t), {
          key: 0,
          "header-target": "#bookmark-board-header",
          onBusy: v[6] || (v[6] = (C) => a.value = C)
        })) : P("", !0),
        Tt(n("div", {
          class: "launcher-page-panel",
          "data-page": s(le).activePage,
          hidden: !1,
          role: "tabpanel",
          onContextmenu: Jn,
          onDragover: v[12] || (v[12] = (C) => cs(C)),
          onDragleave: v[13] || (v[13] = (C) => ds(C)),
          onDrop: v[14] || (v[14] = (C) => us(C))
        }, [
          (c(), ne(Wo, {
            tag: "div",
            class: "launcher-items launcher-site-items",
            key: s(le).activePage,
            name: f.value || $.value ? "launcher-grid" : ""
          }, {
            default: ao(() => [
              (c(!0), w(ee, null, ke(Ai.value, (C) => (c(), w(ee, {
                key: C.key
              }, [
                C.type === "link" ? (c(), w("a", {
                  key: C.key,
                  class: re(["launcher-link", {
                    "is-dragging": f.value === String(C.link.id),
                    "is-wheel-picked": s(Pe).isEditingShortcuts && s(Pe).isLinkInWheel(C.link.url)
                  }]),
                  href: C.link.url,
                  title: C.link.title + (C.link.note ? `
📝 ` + C.link.note : "") + `
🔗 ` + C.link.url,
                  "data-launcher-id": String(C.link.id),
                  target: "_blank",
                  rel: "noreferrer",
                  draggable: "false",
                  onDragstart: v[7] || (v[7] = G(() => {
                  }, ["prevent"])),
                  onPointerdown: (M) => ye(C.link, M),
                  onMousedown: v[8] || (v[8] = (M) => es(M)),
                  onClick: G((M) => ts(C.link, M), ["prevent"]),
                  onContextmenu: G((M) => os(C.link, M), ["prevent"])
                }, [
                  X(Hi, {
                    link: C.link
                  }, null, 8, ["link"])
                ], 42, Pc)) : C.type === "folder" ? (c(), w("div", {
                  key: C.key,
                  class: re(["launcher-folder", [
                    `size-${Se(C.folder.groupName)}`,
                    { "is-dragging": $.value === C.folder.groupName }
                  ]]),
                  title: `${C.folder.groupName}
可拖动调整位置；右键调整收藏夹大小`,
                  role: "button",
                  tabindex: "0",
                  "data-launcher-folder": String(C.folder.groupName),
                  draggable: "true",
                  onPointerdown: (M) => it(C.folder.groupName, C.folder, M),
                  onDragstart: (M) => ps(C.folder.groupName, M),
                  onDragover: v[10] || (v[10] = (M) => hs(M)),
                  onDragleave: v[11] || (v[11] = (M) => fs(M)),
                  onDrop: (M) => gs(C.folder.groupName, M),
                  onClick: (M) => is(C.folder.groupName, M),
                  onContextmenu: G((M) => ns(C.folder.groupName, C.folder.pageName, M), ["prevent"])
                }, [
                  X(Hi, {
                    folder: { title: C.folder.groupName, preview: C.folder.links, count: C.folder.links.length },
                    size: Se(C.folder.groupName)
                  }, {
                    default: ao(() => [
                      n("button", {
                        class: "launcher-folder-del-btn",
                        type: "button",
                        title: `删除文件夹「${C.folder.groupName}」`,
                        "aria-label": "删除文件夹",
                        onPointerdown: v[9] || (v[9] = G(() => {
                        }, ["stop"])),
                        onClick: G((M) => ss(C.folder.groupName), ["stop", "prevent"])
                      }, " ✕ ", 40, Nc)
                    ]),
                    _: 2
                  }, 1032, ["folder", "size"]),
                  n("span", Oc, u(C.folder.links.length), 1)
                ], 42, Wc)) : P("", !0)
              ], 64))), 128)),
              Ai.value.length ? P("", !0) : (c(), w("p", Rc, u(Un.value), 1))
            ]),
            _: 1
          }, 8, ["name"]))
        ], 40, Dc), [
          [gi, i.value === "sites"]
        ])
      ], 42, Sc),
      n("div", Bc, [
        s(De).showHomeNews ? (c(), ne(Lc, { key: 0 })) : P("", !0)
      ]),
      (c(), ne($t, { to: "body" }, [
        x.visible ? (c(), w("div", {
          key: 0,
          class: re(["launcher-drag-ghost", [
            x.type === "folder" ? `folder-ghost size-${x.folder?.size}` : "link-ghost"
          ]]),
          style: _e({
            left: `${x.x}px`,
            top: `${x.y}px`
          })
        }, [
          x.type === "folder" && x.folder ? (c(), w(ee, { key: 0 }, [
            n("div", Hc, [
              (c(!0), w(ee, null, ke(po(x.folder.links, x.folder.size), (C, M) => (c(), ne(Fi, {
                key: C.id || M,
                link: C,
                mini: !0
              }, null, 8, ["link"]))), 128))
            ]),
            n("span", Fc, u(x.folder.groupName), 1)
          ], 64)) : x.link ? (c(), w(ee, { key: 1 }, [
            X(Fi, {
              link: x.link
            }, null, 8, ["link"]),
            n("span", jc, u(x.link.title), 1)
          ], 64)) : P("", !0)
        ], 6)) : P("", !0)
      ])),
      X(s(o), {
        open: r.value,
        onClose: b
      }, null, 8, ["open"])
    ], 64));
  }
}), Vn = /* @__PURE__ */ Be(Vc, [["__scopeId", "data-v-d8ee25c8"]]), Po = Object.keys(De);
let xo = !1, li = 0, Zt, ci;
function nn(e) {
  for (const t of Po)
    Object.prototype.hasOwnProperty.call(e, t) && (De[t] = e[t] !== !1);
}
function Kc() {
  const e = De;
  Ce.setPrefs(e.showSites, e.showTodo, !e.showTodo && e.showBili), document.body.classList.toggle("hide-weather", !e.showWeather), document.body.classList.toggle("hide-sites", !e.showSites), document.body.classList.toggle("hide-bili", !e.showBili), document.body.classList.toggle("hide-todo", !e.showTodo), document.body.classList.toggle("hide-bookmarks", !e.showBookmarkPanel), e.showBookmarkPanel || jo.close();
}
const sn = {
  start() {
    if (xo) return;
    xo = !0;
    const e = ++li;
    ci = ot(() => Po.map((o) => De[o]), Kc, { immediate: !0, flush: "sync" });
    const t = globalThis.chrome;
    Zt = (o, i) => {
      if (i !== "local") return;
      const a = {};
      for (const r of Po) o[r] && (a[r] = o[r].newValue);
      nn(a);
    }, t?.storage?.onChanged?.addListener(Zt), t?.storage?.local && t.storage.local.get(Po).then((o) => {
      xo && li === e && nn(o || {});
    }).catch((o) => console.warn("[HomePrefs] 读取首页设置失败", o));
  },
  stop() {
    xo = !1, li++, ci?.(), ci = void 0, Zt && globalThis.chrome?.storage?.onChanged?.removeListener(Zt), Zt = void 0;
  }
}, zc = { class: "launcher-inner" }, Gc = { class: "launcher-overview" }, Uc = ["aria-hidden", "inert", "title"], Yc = { class: "card-head" }, qc = { id: "wx-title" }, Xc = { id: "weather-body" }, Jc = { class: "launcher-center" }, Qc = {
  class: "hero-clock",
  id: "hero-clock"
}, Zc = ["aria-hidden", "inert"], ed = { class: "card-head" }, td = {
  id: "task-thread-home",
  class: "task-thread-home home-music-body"
}, od = {
  id: "launcher-groups",
  class: "launcher-groups has-sites has-media"
}, id = /* @__PURE__ */ he({
  __name: "AppLauncher",
  setup(e) {
    const t = fe({ sitesTransparency: 6, weatherTransparency: 6, newsTransparency: 6, playerTransparency: 6 }), o = Object.keys(t);
    function i(r, m) {
      t[r] = typeof m == "number" && Number.isFinite(m) ? Math.max(0, Math.min(80, m)) : 6;
    }
    function a(r, m) {
      if (m === "local")
        for (const b of o) r[b] && i(b, r[b].newValue);
    }
    return Ke(() => {
      No.initWallpaper(), typeof chrome < "u" && chrome.storage?.local && (chrome.storage.local.get(o).then((r) => {
        for (const m of o) i(m, r[m]);
      }), chrome.storage.onChanged.addListener(a));
    }), vt(() => {
      typeof chrome < "u" && chrome.storage?.onChanged && chrome.storage.onChanged.removeListener(a);
    }), (r, m) => (c(), w("section", {
      id: "launcher",
      class: "launcher",
      "aria-label": "快捷入口",
      style: _e({
        "--sites-opacity": (100 - t.sitesTransparency) / 100,
        "--weather-opacity": (100 - t.weatherTransparency) / 100,
        "--news-opacity": (100 - t.newsTransparency) / 100,
        "--player-opacity": (100 - t.playerTransparency) / 100
      })
    }, [
      m[3] || (m[3] = n("div", {
        id: "hero-background-media",
        class: "hero-background-media",
        "aria-hidden": "true"
      }, null, -1)),
      n("div", zc, [
        n("div", Gc, [
          n("section", {
            class: re(["launcher-widget launcher-weather", { "home-module-hidden": !s(De).showWeather }]),
            "aria-hidden": !s(De).showWeather,
            inert: !s(De).showWeather,
            "data-home-module": "weather",
            title: s(d)("weather.widgetSwitchTip")
          }, [
            n("header", Yc, [
              m[1] || (m[1] = n("span", {
                class: "bar",
                style: { background: "linear-gradient(180deg,#38bdf8,#818cf8)" }
              }, null, -1)),
              n("h2", qc, u(s(d)("weather.widgetTitle")), 1)
            ]),
            n("div", Xc, [
              s(De).showWeather ? (c(), ne(Hn, { key: 0 })) : P("", !0)
            ])
          ], 10, Uc),
          n("div", Jc, [
            n("div", Qc, [
              X(Ml),
              X(Fn)
            ]),
            n("form", {
              id: "search",
              class: "search",
              onSubmit: m[0] || (m[0] = G(() => {
              }, ["prevent"]))
            }, [
              X(hn)
            ], 32)
          ]),
          n("section", {
            class: re(["launcher-widget launcher-task-threads launcher-music-card", { "home-module-hidden": !s(De).showHomePlayer }]),
            "aria-hidden": !s(De).showHomePlayer,
            inert: !s(De).showHomePlayer,
            "data-home-module": "taskThreads"
          }, [
            n("header", ed, [
              m[2] || (m[2] = n("span", { class: "bar music-purple" }, null, -1)),
              n("h2", null, u(s(d)("home.music.player")), 1)
            ]),
            n("div", td, [
              s(De).showHomePlayer ? (c(), ne(jn, { key: 0 })) : P("", !0)
            ])
          ], 10, Zc)
        ]),
        n("div", od, [
          X(Vn)
        ])
      ]),
      m[4] || (m[4] = n("input", {
        id: "background-input",
        type: "file",
        accept: "image/*,video/mp4,video/webm,.gif,.mp4,.webm",
        multiple: "",
        hidden: ""
      }, null, -1))
    ], 4));
  }
}), jt = fe(/* @__PURE__ */ new Set()), kt = fe({}), je = fe({});
function di(e) {
  const t = Ve(e);
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
    const t = Ve(e);
    return t ? t.lifecycle.isVisible() : Jo(e) ? !!Ys[e] : qs(e);
  },
  // 标记应用启动
  markRunning(e) {
    jt.add(e), (e in je || Ve(e)) && (je[e] = !0);
  },
  // 获取组件当前的 render key
  getRenderKey(e) {
    return kt[e] || 0;
  },
  // 打开 / 显示应用窗口
  openApp(e) {
    const t = Ve(e);
    if (t) {
      xe.open(e), t.lifecycle.isVisible() && this.markRunning(e);
      return;
    }
    if (this.markRunning(e), Jo(e)) {
      Bi.open(e);
      return;
    }
    xe.open(e);
  },
  // 隐藏/关闭窗口：立即退出可见运行态并熄灭 Dock 指示绿点
  hideApp(e) {
    if (jt.delete(e), Ve(e)) {
      xe.close(e);
      return;
    }
    if (Jo(e)) {
      Bi.close(e);
      return;
    }
    xe.close(e);
  },
  // 真正的关闭（Quit / 彻底从内存与 DOM 中卸载销毁，熄灭小圆点）
  async quitApp(e) {
    if (Ve(e)) {
      const a = di(e);
      if (!a.ok) return a;
      const r = Ve(e)?.lifecycle.beforeQuit;
      if (r) {
        const l = bt(e);
        try {
          await r();
        } catch {
          const I = "后台停止未确认，窗口保留；未自动重试，请检查后台状态。";
          return ue.show({ appName: Ve(e).title, title: "未退出", message: I, showActions: !1 }), { ok: !1, error: I };
        }
        if (bt(e) !== l) return { ok: !1, error: "窗口已有后续操作，未卸载。" };
        const _ = di(e);
        if (!_.ok) return _;
      }
      const m = xe.close(e), b = bt(e);
      return jt.delete(e), je[e] = !1, pt.removeActiveTool(e), await m, await ht(), bt(e) === b ? { ok: !0 } : { ok: !1, error: "模块已有后续操作，退出状态已变化。" };
    }
    this.hideApp(e), jt.delete(e), pt.removeActiveTool(e), e in je && (je[e] = !1);
    const t = Us;
    t.activeId === e && (t.activeId = "");
    const o = t.openOrder.indexOf(e);
    o >= 0 && t.openOrder.splice(o, 1);
    const i = t.activeTools.indexOf(e);
    i >= 0 && t.activeTools.splice(i, 1), xe.render();
  },
  // 重新加载（Reload / 单应用热重启，重新初始化组件）
  async reloadApp(e) {
    const t = Ve(e);
    if (t) {
      if (t.lifecycle.canOpen && !t.lifecycle.canOpen()) return { ok: !1, error: "模块当前不能打开，未重载窗口。" };
      const o = di(e);
      if (!o.ok) return o;
      const i = xe.close(e), a = bt(e);
      return await i, bt(e) !== a ? { ok: !1, error: "模块已有后续操作，重载已取消。" } : (je[e] = !1, await ht(), bt(e) !== a ? { ok: !1, error: "模块已有后续操作，未重新打开。" } : (kt[e] = (kt[e] || 0) + 1, xe.open(e), t.lifecycle.isVisible() ? (this.markRunning(e), { ok: !0 }) : { ok: !1, error: "模块当前不能打开，未重新显示窗口。" }));
    }
    this.hideApp(e), e in je ? (je[e] = !1, await ht(), kt[e] = (kt[e] || 0) + 1, je[e] = !0) : kt[e] = (kt[e] || 0) + 1, await ht(), this.openApp(e);
  }
}, eo = /* @__PURE__ */ he({
  __name: "DockCardModuleHost",
  props: {
    id: {}
  },
  setup(e) {
    const o = Ve(e.id);
    if (!o || o.presentation !== "card") throw new Error("Unknown registered workspace card");
    const i = o;
    i.mountPolicy === "workspace-ready" && Le.markRunning(i.id), ot(i.lifecycle.isVisible, (_) => {
      _ && Le.markRunning(i.id);
    }, { immediate: !0, flush: "sync" });
    const a = ae(() => !!je[i.id]);
    function r() {
      try {
        i.lifecycle.hide();
      } catch {
      }
      (ft.activeId === i.id || ft.activeId === i.rootId) && (ft.activeId = null), Le.hideApp(i.id), kn(ft.activeId);
    }
    function m() {
      Le.reloadApp(i.id);
    }
    function b() {
      typeof window < "u" && window.location.reload();
    }
    const l = H({
      loader: i.loadView,
      onError(_, I, A, f) {
        f <= 2 ? I() : A();
      },
      errorComponent: he({
        setup: () => () => i.lifecycle.isVisible() ? Ee("section", { class: "card wide card-fullscreen", role: "alert" }, [
          Ee("h2", i.title),
          Ee("p", "工作区切片加载受阻（可能因插件重载或切片更新）。可点击「重新加载模块」，或返回首页。"),
          Ee("div", { style: "display: flex; gap: 10px; margin-top: 14px;" }, [
            Ee("button", {
              type: "button",
              style: "padding: 6px 14px; border-radius: 999px; border: 1px solid var(--border); background: var(--primary, #3b82f6); color: #fff; cursor: pointer; font-size: 12px; font-weight: 500;",
              onClick: b
            }, "⟳ 刷新标签页 (加载最新版)"),
            Ee("button", {
              type: "button",
              style: "padding: 6px 14px; border-radius: 999px; border: 1px solid var(--border); background: var(--surface); color: var(--text); cursor: pointer; font-size: 12px;",
              onClick: m
            }, "↻ 重新加载模块"),
            Ee("button", {
              type: "button",
              style: "padding: 6px 14px; border-radius: 999px; border: 1px solid var(--border); background: var(--surface); color: var(--text); cursor: pointer; font-size: 12px;",
              onClick: r
            }, "返回首页")
          ])
        ]) : null
      })
    });
    return lo(() => {
      r(), jt.delete(i.id), delete je[i.id];
    }), (_, I) => a.value ? (c(), ne(gn(s(l)), {
      key: s(Le).getRenderKey(s(i).id)
    })) : P("", !0);
  }
}), nd = { class: "logicweaver-workspaces-layer" }, sd = {
  key: 0,
  id: "daily-section",
  class: "wrap"
}, ad = { id: "vue-todoist-root" }, rd = { id: "vue-bili-favorites-root" }, ld = { id: "vue-aihot-root" }, cd = ["hidden"], dd = /* @__PURE__ */ he({
  __name: "AppWorkspaces",
  setup(e) {
    const t = q(!!ft.activeId);
    return Ke(() => {
      t.value || (typeof window < "u" && "requestIdleCallback" in window ? window.requestIdleCallback(() => {
        t.value = !0;
      }, { timeout: 80 }) : setTimeout(() => {
        t.value = !0;
      }, 40));
    }), (o, i) => (c(), w("div", nd, [
      t.value ? (c(), w("main", sd, [
        n("div", ad, [
          X(eo, { id: "todoist" })
        ]),
        n("div", rd, [
          X(eo, { id: "daily-bilibili" })
        ]),
        n("div", ld, [
          X(eo, { id: "daily-aihot" })
        ]),
        n("div", {
          id: "vue-multica-root",
          hidden: s(ft).activeId !== "multica"
        }, [
          X(eo, { id: "multica" })
        ], 8, cd),
        X(eo, { id: "card-github" })
      ])) : P("", !0)
    ]));
  }
}), ud = /* @__PURE__ */ Be(dd, [["__scopeId", "data-v-0799b753"]]), pd = ["aria-label"], hd = { class: "dock-menu-head" }, fd = { class: "dock-menu-title" }, gd = ["src", "alt"], md = {
  key: 1,
  class: "dock-menu-emoji"
}, wd = { class: "dock-menu-text" }, yd = { class: "dock-menu-text" }, vd = { class: "dock-menu-text" }, bd = /* @__PURE__ */ he({
  __name: "DockContextMenu",
  props: {
    target: {}
  },
  emits: ["close", "action"],
  setup(e, { emit: t }) {
    const o = e, i = t, a = ae(() => !o.target || o.target.type !== "tool" ? !1 : Le.isRunning(o.target.id)), r = ae(() => !o.target || o.target.type !== "tool" ? !1 : Le.isVisible(o.target.id)), { menuRef: m, style: b } = ha({
      visible: () => !!o.target,
      anchor: () => o.target || { x: 0, y: 0 },
      placement: Nt.position === "top" ? "below" : "above",
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
      const g = o.target, p = Ct.uninstall(g.id);
      i("close"), await p || ue.show({
        appName: g.title,
        title: "入口停用未确认",
        subtitle: Ct.state.errorMessage || "请打开模块管理核对当前启用状态",
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
    return (g, p) => (c(), ne($t, { to: "body" }, [
      e.target ? (c(), w("div", {
        key: 0,
        ref_key: "menuRef",
        ref: m,
        role: "group",
        "aria-label": `${e.target.title}操作`,
        class: "dock-context-menu",
        style: _e(s(b)),
        onClick: p[1] || (p[1] = G(() => {
        }, ["stop"])),
        onContextmenu: p[2] || (p[2] = G(() => {
        }, ["prevent"]))
      }, [
        n("div", hd, [
          n("div", fd, [
            e.target.icon ? (c(), w("img", {
              key: 0,
              class: "dock-menu-icon",
              src: e.target.icon,
              alt: e.target.title
            }, null, 8, gd)) : e.target.emoji ? (c(), w("span", md, u(e.target.emoji), 1)) : P("", !0),
            n("strong", null, u(e.target.title), 1)
          ]),
          e.target.type === "tool" ? (c(), w("span", {
            key: 0,
            class: re(["dock-status-tag", { "is-running": a.value }])
          }, [
            p[3] || (p[3] = n("span", { class: "dock-status-dot" }, null, -1)),
            st(" " + u(a.value ? s(d)("dock.menu.running") : s(d)("dock.menu.notStarted")), 1)
          ], 2)) : P("", !0)
        ]),
        p[12] || (p[12] = n("div", { class: "dock-menu-divider" }, null, -1)),
        e.target.type === "tool" ? (c(), w(ee, { key: 0 }, [
          r.value ? (c(), w("button", {
            key: 1,
            type: "button",
            class: "dock-menu-item",
            onClick: _
          }, [
            p[5] || (p[5] = n("span", { class: "dock-menu-symbol" }, "−", -1)),
            n("span", null, u(s(d)("dock.menu.hideWindow")), 1)
          ])) : (c(), w("button", {
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
            n("div", wd, [
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
            n("div", yd, [
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
            n("div", vd, [
              n("span", null, u(s(d)("dock.menu.quitApp")), 1),
              n("small", null, u(s(d)("dock.menu.quitSub")), 1)
            ])
          ])
        ], 64)) : e.target.type === "card" ? (c(), w("button", {
          key: 1,
          type: "button",
          class: "dock-menu-item",
          onClick: $
        }, [
          p[10] || (p[10] = n("span", { class: "dock-menu-symbol" }, "↗", -1)),
          n("span", null, u(s(d)("dock.menu.openOfficial")), 1)
        ])) : (c(), w("button", {
          key: 2,
          type: "button",
          class: "dock-menu-item",
          onClick: p[0] || (p[0] = (k) => i("close"))
        }, [...p[11] || (p[11] = [
          n("span", { class: "dock-menu-symbol" }, "🏠", -1),
          n("span", null, "返回常用主页", -1)
        ])]))
      ], 44, pd)) : P("", !0)
    ]));
  }
}), kd = /* @__PURE__ */ Be(bd, [["__scopeId", "data-v-1db4d5bf"]]), _d = { class: "mac-dock-shelf" }, Cd = ["data-dock-target", "title", "onPointerdown", "onClick", "onContextmenu"], xd = ["src", "alt"], Ld = {
  key: 0,
  class: "mac-dock-dot",
  "aria-hidden": "true"
}, Sd = ["title"], Td = ["alt"], $d = ["data-dock-tool", "title", "onPointerdown", "onClick", "onContextmenu"], Md = ["src", "alt"], Id = {
  key: 1,
  class: "mac-dock-emoji",
  "aria-hidden": "true"
}, Ad = {
  key: 2,
  class: "mac-dock-dot",
  "aria-hidden": "true"
}, Ed = {
  key: 3,
  class: "mac-dock-badge"
}, Dd = ["title"], Pd = ["src"], Wd = {
  key: 1,
  class: "mac-dock-emoji"
}, Nd = /* @__PURE__ */ he({
  __name: "MacDock",
  setup(e) {
    const t = ae(() => Nt), o = q(null), i = ae(() => Object.fromEntries(Nt.tools.map((W) => {
      const N = Ve(W.id)?.badgeCount?.() || 0;
      return [W.id, Number.isFinite(N) ? Math.max(0, Math.floor(N)) : 0];
    })));
    function a(W) {
      W.stopPropagation(), o.value = null, A(W.currentTarget), Ct.state.isOpen ? Ct.close() : Ct.open();
    }
    function r(W, N) {
      N.stopPropagation(), o.value = null, A(N.currentTarget), pt.triggerItem("target", W);
    }
    function m(W, N) {
      const F = N.currentTarget.getBoundingClientRect(), pe = Nt.position, ye = pe === "left" || pe === "right";
      o.value = {
        type: "card",
        id: W.id,
        title: W.title,
        icon: W.icon,
        x: ye ? pe === "left" ? F.right + 8 : F.left - 8 : F.left + F.width / 2,
        y: ye ? F.top + F.height / 2 : pe === "top" ? F.bottom + 8 : F.top
      };
    }
    function b(W) {
      W.stopPropagation(), o.value = null, A(W.currentTarget), pt.triggerItem("home", "home-launcher");
    }
    function l(W, N) {
      N.stopPropagation(), o.value = null, A(N.currentTarget), Ve(W) || Le.markRunning(W), pt.triggerItem("tool", W);
    }
    function _(W, N) {
      const F = N.currentTarget.getBoundingClientRect(), pe = Nt.position, ye = pe === "left" || pe === "right";
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
      const D = () => {
        I.get(W) === N && I.delete(W);
      };
      N.onfinish = D, N.oncancel = D;
    }
    const f = q(null), $ = fe({
      visible: !1,
      x: 0,
      y: 0,
      width: 40,
      height: 40,
      item: null,
      type: "tool"
    }), g = q(null), p = q(null), k = ae(() => g.value || t.value.cards), L = ae(() => p.value || t.value.tools);
    let E = "", S = 0, O = !1, j = 0;
    function se(W, N, D) {
      if (D.button !== 0 || D.target.closest(".mac-dock-market-btn")) return;
      const ye = D.currentTarget.getBoundingClientRect();
      O = !1, f.value = {
        type: W,
        id: N.id,
        item: N,
        startX: D.clientX,
        startY: D.clientY,
        initialLeft: ye.left,
        initialTop: ye.top,
        width: ye.width,
        height: ye.height
      }, window.addEventListener("pointermove", T), window.addEventListener("pointerup", y), window.addEventListener("pointercancel", y);
    }
    function T(W) {
      if (!f.value) return;
      const N = W.clientX - f.value.startX, D = W.clientY - f.value.startY, F = Math.hypot(N, D);
      if (!O && F > 5 && (O = !0, $.visible = !0, $.item = f.value.item, $.type = f.value.type, $.width = f.value.width, $.height = f.value.height, f.value.type === "card" ? g.value = [...t.value.cards] : p.value = [...t.value.tools]), !O) return;
      $.x = W.clientX - $.width / 2, $.y = W.clientY - $.height / 2;
      const ye = document.elementsFromPoint(W.clientX, W.clientY).find(
        (We) => We.classList.contains("mac-dock-item") && !We.classList.contains("mac-dock-market-btn")
      );
      if (!ye) return;
      const it = ye.getAttribute("data-dock-target"), He = ye.getAttribute("data-dock-tool"), rt = f.value.type, lt = f.value.id, ze = Date.now();
      if (rt === "card" && it && it !== lt && it !== "home-launcher") {
        const We = ye.getBoundingClientRect(), Ie = We.left + We.width / 2;
        if (Math.abs(W.clientX - Ie) > We.width * 0.55 || it === E && ze - S < 180) return;
        const ve = [...g.value || t.value.cards], Fe = ve.findIndex((Se) => Se.id === lt), Ze = ve.findIndex((Se) => Se.id === it);
        if (Fe >= 0 && Ze >= 0 && Fe !== Ze) {
          const Se = ve.splice(Fe, 1)[0];
          ve.splice(Ze, 0, Se), g.value = ve, E = it, S = ze;
        }
      } else if (rt === "tool" && He && He !== lt) {
        const We = ye.getBoundingClientRect(), Ie = We.left + We.width / 2;
        if (Math.abs(W.clientX - Ie) > We.width * 0.55 || He === E && ze - S < 180) return;
        const ve = [...p.value || t.value.tools], Fe = ve.findIndex((Se) => Se.id === lt), Ze = ve.findIndex((Se) => Se.id === He);
        if (Fe >= 0 && Ze >= 0 && Fe !== Ze) {
          const Se = ve.splice(Fe, 1)[0];
          ve.splice(Ze, 0, Se), p.value = ve, E = He, S = ze;
        }
      }
    }
    function y() {
      window.removeEventListener("pointermove", T), window.removeEventListener("pointerup", y), window.removeEventListener("pointercancel", y), O && f.value && (j = Date.now() + 250, f.value.type === "card" && g.value ? pt.reorderCards(g.value.map((W) => W.id)) : f.value.type === "tool" && p.value && pt.reorderTools(p.value.map((W) => W.id))), $.visible = !1, $.item = null, g.value = null, p.value = null, f.value = null, O = !1, E = "";
    }
    function x(W, N) {
      Date.now() < j || r(W, N);
    }
    function Q(W, N) {
      Date.now() < j || l(W, N);
    }
    return lo(() => {
      for (const W of I.values()) W.cancel();
      I.clear(), window.removeEventListener("pointermove", T), window.removeEventListener("pointerup", y), window.removeEventListener("pointercancel", y);
    }), (W, N) => (c(), w(ee, null, [
      n("div", _d, [
        X(Wo, {
          tag: "div",
          class: "mac-dock-group mac-dock-cards-group",
          name: "dock-item-motion"
        }, {
          default: ao(() => [
            (c(!0), w(ee, null, ke(k.value, (D) => (c(), w("button", {
              key: D.id,
              class: re(["mac-dock-item", {
                "is-active": t.value.activeTargetId === D.id,
                "is-drag-origin": f.value && f.value.id === D.id
              }]),
              type: "button",
              "data-dock-target": D.id,
              title: D.title,
              onPointerdown: (F) => se("card", D, F),
              onClick: G((F) => x(D.id, F), ["stop"]),
              onContextmenu: G((F) => m(D, F), ["prevent"])
            }, [
              n("img", {
                class: "mac-dock-icon",
                src: D.icon,
                alt: D.title
              }, null, 8, xd),
              t.value.activeTargetId === D.id ? (c(), w("span", Ld)) : P("", !0)
            ], 42, Cd))), 128))
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
          onClick: N[0] || (N[0] = G((D) => b(D), ["stop"]))
        }, [
          n("img", {
            class: "mac-dock-icon",
            src: "assets/nav-home.svg",
            alt: s(d)("dock.home")
          }, null, 8, Td)
        ], 8, Sd),
        N[7] || (N[7] = n("div", {
          class: "mac-dock-divider mac-dock-divider-dark",
          "aria-hidden": "true"
        }, null, -1)),
        X(Wo, {
          tag: "div",
          class: "mac-dock-group mac-dock-tools-group",
          name: "dock-item-motion"
        }, {
          default: ao(() => [
            (c(!0), w(ee, null, ke(L.value, (D) => (c(), w("button", {
              key: D.id,
              class: re(["mac-dock-item", {
                "is-active": s(Le).isRunning(D.id),
                "is-drag-origin": f.value && f.value.id === D.id
              }]),
              type: "button",
              "data-dock-tool": D.id,
              title: D.title,
              onPointerdown: (F) => se("tool", D, F),
              onClick: G((F) => Q(D.id, F), ["stop"]),
              onContextmenu: G((F) => _(D, F), ["prevent"])
            }, [
              D.icon ? (c(), w("img", {
                key: 0,
                class: "mac-dock-icon",
                src: D.icon,
                alt: D.title
              }, null, 8, Md)) : D.emoji ? (c(), w("span", Id, u(D.emoji), 1)) : P("", !0),
              s(Le).isRunning(D.id) ? (c(), w("span", Ad)) : P("", !0),
              i.value[D.id] > 0 ? (c(), w("span", Ed, u(i.value[D.id] > 99 ? "99+" : i.value[D.id]), 1)) : P("", !0)
            ], 42, $d))), 128))
          ]),
          _: 1
        }),
        n("button", {
          class: "mac-dock-item",
          type: "button",
          title: "设置",
          "aria-label": "设置",
          onClick: N[1] || (N[1] = G((D) => s(co).toggle(), ["stop"]))
        }, [...N[4] || (N[4] = [
          n("span", {
            class: "mac-dock-emoji",
            "aria-hidden": "true"
          }, "⚙️", -1)
        ])]),
        n("button", {
          class: re(["mac-dock-item mac-dock-market-btn", { "is-active": s(Ct).state.isOpen }]),
          type: "button",
          title: s(d)("dock.market"),
          onClick: N[2] || (N[2] = G((D) => a(D), ["stop"]))
        }, [...N[5] || (N[5] = [
          n("span", {
            class: "mac-dock-market-icon",
            "aria-hidden": "true"
          }, "🧩", -1)
        ])], 10, Dd)
      ]),
      (c(), ne($t, { to: "body" }, [
        $.visible && $.item ? (c(), w("div", {
          key: 0,
          class: "mac-dock-drag-ghost",
          style: _e({
            width: $.width + "px",
            height: $.height + "px",
            transform: "translate3d(" + $.x + "px," + $.y + "px, 0)"
          }),
          "aria-hidden": "true"
        }, [
          $.item.icon ? (c(), w("img", {
            key: 0,
            class: "mac-dock-icon",
            src: $.item.icon,
            alt: ""
          }, null, 8, Pd)) : $.item.emoji ? (c(), w("span", Wd, u($.item.emoji), 1)) : P("", !0)
        ], 4)) : P("", !0)
      ])),
      X(kd, {
        target: o.value,
        onClose: N[3] || (N[3] = (D) => o.value = null)
      }, null, 8, ["target"])
    ], 64));
  }
}), Kn = /* @__PURE__ */ Be(Nd, [["__scopeId", "data-v-be0b1a30"]]), Od = {
  id: "win-toast-container",
  class: "win-toast-container",
  "aria-live": "polite",
  "aria-relevant": "additions"
}, Rd = ["data-toast-fingerprint", "onMouseenter", "onMouseleave"], Bd = { class: "win-toast-head" }, Hd = ["src"], Fd = { class: "win-toast-app" }, jd = { class: "win-toast-time" }, Vd = ["title", "aria-label", "onClick"], Kd = ["onClick"], zd = { class: "win-toast-title" }, Gd = {
  key: 0,
  class: "win-toast-subtitle"
}, Ud = {
  key: 1,
  class: "win-toast-snippet"
}, Yd = {
  key: 0,
  class: "win-toast-actions"
}, qd = ["onClick"], Xd = ["onClick"], Jd = /* @__PURE__ */ he({
  __name: "NotificationHost",
  setup(e) {
    const t = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), a = q({}), r = q({});
    let m = null;
    function b(g) {
      const p = t.get(g);
      p !== void 0 && clearTimeout(p), t.delete(g);
    }
    function l(g, p = g.duration) {
      b(g.id), i.set(g.id, p), o.set(g.id, Date.now()), r.value[g.id] = !1, a.value[g.id] = Math.max(0, Math.min(100, p / g.duration * 100)), ht(() => requestAnimationFrame(() => {
        a.value[g.id] = 0;
      })), t.set(g.id, window.setTimeout(() => {
        t.delete(g.id), ue.close(g.id);
      }, p));
    }
    function _(g) {
      b(g.id);
      const p = Date.now() - (o.get(g.id) || Date.now()), k = Math.max(0, (i.get(g.id) ?? g.duration) - p);
      i.set(g.id, k), r.value[g.id] = !0, a.value[g.id] = Math.max(0, Math.min(100, k / g.duration * 100));
    }
    function I(g) {
      l(g, Math.max(1500, i.get(g.id) ?? g.duration));
    }
    function A(g) {
      b(g.id), ue.close(g.id);
    }
    function f(g) {
      if (ro.markRead(g.historyId || g.id), A(g), !g.onClick) {
        g.target && ro.openTarget(g.target);
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
    return Ke(() => {
      m = new MutationObserver(() => {
        const p = new Set(ho.map((k) => k.id));
        for (const k of ho)
          !k.closing && !t.has(k.id) && !i.has(k.id) && l(k);
        for (const k of i.keys())
          p.has(k) || (b(k), i.delete(k), o.delete(k), delete a.value[k], delete r.value[k]);
      });
      const g = document.getElementById("win-toast-container");
      g && m.observe(g, { childList: !0 });
      for (const p of ho) l(p);
    }), lo(() => {
      m?.disconnect(), m = null;
      for (const g of t.values()) clearTimeout(g);
      t.clear();
    }), (g, p) => (c(), ne($t, { to: "body" }, [
      n("div", Od, [
        X(Wo, { name: "win-toast" }, {
          default: ao(() => [
            (c(!0), w(ee, null, ke(s(ho), (k) => (c(), w("article", {
              key: k.id,
              class: re(["win-toast-card", [k.appType, { closing: k.closing }]]),
              "data-toast-fingerprint": k.fingerprint,
              onMouseenter: (L) => _(k),
              onMouseleave: (L) => I(k)
            }, [
              n("header", Bd, [
                n("img", {
                  src: k.icon,
                  class: "win-toast-icon",
                  alt: ""
                }, null, 8, Hd),
                n("span", Fd, u(k.appName), 1),
                n("span", jd, u(s(d)("notifications.justNow")), 1),
                n("button", {
                  type: "button",
                  class: "win-toast-close",
                  title: s(d)("common.close"),
                  "aria-label": s(d)("common.close"),
                  onClick: (L) => A(k)
                }, "✕", 8, Vd)
              ]),
              n("button", {
                type: "button",
                class: "win-toast-body win-toast-body-button",
                onClick: (L) => f(k)
              }, [
                n("span", zd, u(k.title), 1),
                k.subtitle ? (c(), w("span", Gd, u(k.subtitle), 1)) : P("", !0),
                k.message ? (c(), w("span", Ud, u(k.message), 1)) : P("", !0)
              ], 8, Kd),
              k.showActions && k.actionLabel ? (c(), w("footer", Yd, [
                n("button", {
                  type: "button",
                  class: "win-toast-btn primary",
                  onClick: (L) => f(k)
                }, u(k.actionLabel), 9, qd),
                n("button", {
                  type: "button",
                  class: "win-toast-btn",
                  onClick: (L) => A(k)
                }, u(s(d)("common.close")), 9, Xd)
              ])) : P("", !0),
              n("div", {
                class: "win-toast-progress",
                style: _e($(k))
              }, null, 4)
            ], 42, Rd))), 128))
          ]),
          _: 1
        })
      ])
    ]));
  }
}), zn = /* @__PURE__ */ Be(Jd, [["__scopeId", "data-v-d1eb92c2"]]), Qd = ["id"], Zd = /* @__PURE__ */ he({
  __name: "DockModuleHost",
  setup(e) {
    const t = _n().filter((o) => o.presentation !== "card").map((o) => {
      ot(o.lifecycle.isVisible, (a) => {
        a && Le.markRunning(o.id);
      }, { immediate: !0, flush: "sync" });
      const i = he({
        setup: () => () => Ee("section", { class: "dock-module-load-error", role: "alert" }, [
          Ee("div", { style: "display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;" }, [
            Ee("strong", { style: "font-size: 13px; color: var(--heading);" }, `${o.title} 加载受阻`),
            Ee("span", { style: "font-size: 11px; padding: 2px 6px; border-radius: 4px; background: var(--surface); color: var(--muted); border: 1px solid var(--border);" }, "代码可能已更新")
          ]),
          Ee("p", { style: "font-size: 12px; line-height: 1.5; color: var(--muted); margin: 0 0 12px 0;" }, "模块分块代码未就绪。若刚才在终端编写或重新构建了扩展，点击「刷新标签页」即可立即同步最新切片。"),
          Ee("div", { style: "display: flex; gap: 8px;" }, [
            Ee("button", {
              type: "button",
              style: "padding: 5px 12px; border-radius: 6px; border: 1px solid var(--border); background: var(--primary, #3b82f6); color: #fff; cursor: pointer; font-size: 12px; font-weight: 500;",
              onClick: () => {
                typeof window < "u" && window.location.reload();
              }
            }, "⟳ 刷新标签页"),
            Ee("button", {
              type: "button",
              style: "padding: 5px 10px; border-radius: 6px; border: 1px solid var(--border); background: var(--surface); color: var(--text); cursor: pointer; font-size: 12px;",
              onClick: () => {
                Le.reloadApp(o.id);
              }
            }, "↻ 重试"),
            Ee("button", {
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
        mounted: ae(() => !!je[o.id]),
        view: H({
          loader: o.loadView,
          onError(a, r, m, b) {
            b <= 2 ? r() : m();
          },
          errorComponent: i
        })
      };
    });
    return lo(() => {
      for (const { definition: o } of t)
        xe.close(o.id), jt.delete(o.id), je[o.id] = !1;
    }), (o, i) => (c(!0), w(ee, null, ke(s(t), (a) => Tt((c(), w("div", {
      id: a.definition.rootId,
      key: a.definition.id
    }, [
      a.mounted.value ? (c(), ne(gn(a.view), {
        key: s(Le).getRenderKey(a.definition.id)
      })) : P("", !0)
    ], 8, Qd)), [
      [gi, a.definition.lifecycle.isVisible()]
    ])), 128));
  }
}), eu = /* @__PURE__ */ Be(Zd, [["__scopeId", "data-v-fc77be0a"]]);
function an(e) {
  const t = String(e || "").trim();
  if (!t) return "";
  const o = /^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(t) ? t : `https://${t}`;
  try {
    const i = new URL(o);
    return i.protocol !== "http:" && i.protocol !== "https:" ? "" : i.href;
  } catch {
    return "";
  }
}
function tu(e, t) {
  const o = String(e || "").trim();
  if (o)
    try {
      const i = new URL(o, t);
      return i.protocol !== "http:" && i.protocol !== "https:" ? void 0 : i.href;
    } catch {
      return;
    }
}
function Gn(e) {
  return e.replace(/&amp;/gi, "&").replace(/&lt;/gi, "<").replace(/&gt;/gi, ">").replace(/&quot;/gi, '"').replace(/&#39;|&apos;/gi, "'").replace(/&#(\d+);/g, (t, o) => {
    const i = Number(o);
    return Number.isFinite(i) ? String.fromCodePoint(i) : "";
  }).replace(/&#x([0-9a-f]+);/gi, (t, o) => {
    const i = parseInt(o, 16);
    return Number.isFinite(i) ? String.fromCodePoint(i) : "";
  }).replace(/\s+/g, " ").trim();
}
function Lo(e, t) {
  const o = /<meta\b[^>]*>/gi;
  let i;
  for (; (i = o.exec(e)) !== null; ) {
    const a = i[0], r = a.match(/\b(?:property|name)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/i), m = (r?.[1] ?? r?.[2] ?? r?.[3] ?? "").toLowerCase();
    if (!m || !t.includes(m)) continue;
    const b = a.match(/\bcontent\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/i), l = b?.[1] ?? b?.[2] ?? b?.[3];
    if (l && l.trim())
      return Gn(l);
  }
}
function ou(e, t) {
  const o = String(e || "").slice(0, 12e4), i = o.match(/<title[^>]*>([\s\S]*?)<\/title>/i), a = Lo(o, ["og:title", "twitter:title"]), r = i ? Gn(i[1]) : void 0, m = Lo(o, ["og:description", "twitter:description", "description"]), b = Lo(o, ["og:image", "twitter:image", "twitter:image:src"]), l = Lo(o, ["og:site_name", "application-name"]);
  return {
    title: a || r || void 0,
    description: m,
    imageUrl: tu(b, t),
    siteName: l
  };
}
const be = fe({
  isOpen: !1,
  target: null,
  metaLoading: !1,
  meta: null
}), So = /* @__PURE__ */ new Map();
let Vt, to = 0;
async function rn(e, t = !1) {
  if (!e) return;
  if (!t && So.has(e)) {
    be.meta = So.get(e), be.metaLoading = !1;
    return;
  }
  Vt?.abort();
  const o = new AbortController();
  Vt = o;
  const i = ++to;
  be.metaLoading = !0, be.meta = null;
  const a = setTimeout(() => o.abort(), 8e3);
  try {
    const r = await fetch(e, {
      method: "GET",
      signal: o.signal,
      credentials: "omit",
      redirect: "follow"
    });
    if (i !== to || o.signal.aborted) return;
    if (!r.ok)
      throw new Error(`HTTP ${r.status}`);
    const m = r.headers.get("content-type") || "";
    if (m && !/html|xml|text/i.test(m)) {
      const I = {
        siteName: new URL(e).hostname,
        fetchedAt: Date.now()
      };
      So.set(e, I), be.meta = I;
      return;
    }
    const b = await r.text();
    if (i !== to || o.signal.aborted) return;
    const _ = { ...ou(b, r.url || e), fetchedAt: Date.now() };
    So.set(e, _), be.meta = _;
  } catch (r) {
    if (i !== to || o.signal.aborted) return;
    be.meta = {
      fetchedAt: Date.now(),
      error: r?.message || "未能读取站点元信息"
    };
  } finally {
    clearTimeout(a), Vt === o && (Vt = void 0), i === to && (be.metaLoading = !1);
  }
}
const af = {
  open(e) {
    const t = an(e.url);
    be.target = {
      ...e,
      url: t || e.url
    }, be.isOpen = !0, t ? rn(t) : (be.metaLoading = !1, be.meta = { fetchedAt: Date.now(), error: "仅支持预览 HTTP/HTTPS 网址" });
  },
  refreshMeta() {
    const e = an(be.target?.url || "");
    e && rn(e, !0);
  },
  updateNote(e) {
    be.target && (be.target = { ...be.target, note: e });
  },
  close() {
    Vt?.abort(), Vt = void 0, be.isOpen = !1, be.metaLoading = !1;
  }
}, iu = ["onKeydown"], nu = { class: "fo-up-preview-head" }, su = ["src"], au = { class: "fo-up-preview-meta" }, ru = { class: "fo-up-preview-name-row" }, lu = ["href"], cu = ["disabled"], du = { class: "fo-up-preview-sign" }, uu = { class: "fo-up-preview-videos" }, pu = {
  key: 0,
  class: "fo-up-preview-loading"
}, hu = {
  key: 1,
  class: "fo-up-preview-empty"
}, fu = {
  key: 2,
  class: "fo-up-preview-empty"
}, gu = ["href", "title", "onClick"], mu = ["src"], wu = {
  key: 0,
  class: "fo-bili-duration"
}, yu = { class: "fo-up-preview-video-info" }, vu = ["href", "title", "onClick"], bu = { class: "fo-up-preview-video-meta" }, ku = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2394a3b8'%3E%3Cpath d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/%3E%3C/svg%3E", _u = /* @__PURE__ */ he({
  __name: "BiliUpPreview",
  setup(e) {
    const t = q(!1);
    function o() {
      if (!ie.submitting) {
        if (!ie.followed) {
          t.value = !1, Do.toggleFollow();
          return;
        }
        if (!t.value) {
          t.value = !0;
          return;
        }
        t.value = !1, Do.toggleFollow();
      }
    }
    function i() {
      t.value = !1, Do.close();
    }
    function a(r, m) {
      r.ctrlKey || r.metaKey || (r.preventDefault(), r.stopPropagation(), m.bvid ? (To.openVideo({
        bvid: m.bvid,
        title: m.title,
        cover: m.cover,
        author: ie.name,
        authorFace: ie.face,
        mid: ie.mid,
        url: m.url
      }), i()) : m.url && m.url !== "#" && window.open(m.url, "_blank"));
    }
    return (r, m) => s(ie).open ? (c(), w("div", {
      key: 0,
      class: "fo-up-preview-backdrop",
      onPointerdown: G(i, ["self"])
    }, [
      n("aside", {
        class: "fo-up-preview-popover",
        style: _e({ left: `${s(ie).left}px`, top: `${s(ie).top}px` }),
        onKeydown: bs(G(i, ["stop", "prevent"]), ["esc"])
      }, [
        n("div", nu, [
          n("img", {
            class: "fo-up-preview-avatar",
            src: s(ie).face || ku,
            alt: "",
            referrerpolicy: "no-referrer"
          }, null, 8, su),
          n("div", au, [
            n("div", ru, [
              n("a", {
                class: "fo-up-preview-name",
                href: `https://space.bilibili.com/${s(ie).mid}`,
                target: "_blank",
                rel: "noreferrer"
              }, u(s(ie).name), 9, lu),
              n("button", {
                type: "button",
                class: re([
                  s(ie).followed ? "fo-up-preview-unfollow" : "fo-up-preview-follow",
                  { "is-armed": t.value }
                ]),
                disabled: s(ie).submitting,
                onClick: o
              }, u(s(ie).submitting ? "处理中…" : t.value ? "确定取消？" : s(ie).followed ? "取消关注" : "＋ 关注"), 11, cu)
            ]),
            n("p", du, u(s(ie).sign || "暂无个人简介"), 1)
          ]),
          n("button", {
            type: "button",
            class: "fo-up-preview-close",
            "aria-label": "关闭预览",
            onClick: i
          }, "✕")
        ]),
        m[1] || (m[1] = n("div", { class: "fo-up-preview-title-tag" }, "近期投稿视频（最新 2~3 个）", -1)),
        n("div", uu, [
          s(ie).loading ? (c(), w("div", pu, [...m[0] || (m[0] = [
            n("i", null, null, -1),
            n("span", null, "正在读取近期投稿…", -1)
          ])])) : s(ie).error ? (c(), w("p", hu, u(s(ie).error), 1)) : s(ie).videos.length ? (c(!0), w(ee, { key: 3 }, ke(s(ie).videos, (b) => (c(), w("article", {
            key: b.bvid,
            class: "fo-up-preview-video"
          }, [
            n("a", {
              class: "fo-up-preview-thumb",
              href: b.url,
              title: `就地播放「${b.title}」（Ctrl+点击在网页打开）`,
              onClick: (l) => a(l, b)
            }, [
              n("img", {
                src: b.cover,
                alt: "",
                loading: "lazy",
                referrerpolicy: "no-referrer"
              }, null, 8, mu),
              b.duration ? (c(), w("span", wu, u(b.duration), 1)) : P("", !0)
            ], 8, gu),
            n("div", yu, [
              n("a", {
                class: "fo-up-preview-video-title",
                href: b.url,
                title: `就地播放「${b.title}」（Ctrl+点击在网页打开）`,
                onClick: (l) => a(l, b)
              }, u(b.title), 9, vu),
              n("div", bu, [
                n("span", null, "▣ " + u(b.playCount), 1),
                n("span", null, u(b.published), 1)
              ])
            ])
          ]))), 128)) : (c(), w("p", fu, "该 UP 主近期暂无视频动态"))
        ])
      ], 44, iu)
    ], 32)) : P("", !0);
  }
}), Cu = /* @__PURE__ */ Be(_u, [["__scopeId", "data-v-bf6dab49"]]), xu = { class: "logicweaver-overlays-layer" }, Lu = { id: "vue-notification-root" }, Su = {
  id: "bili-profile-menu",
  class: "bili-profile-menu",
  hidden: ""
}, Tu = { id: "vue-bili-message-panel-root" }, $u = { id: "vue-tab-manager-root" }, Mu = { id: "vue-bookmark-menu-root" }, Iu = { id: "vue-bookmark-panel-root" }, Au = { id: "vue-launcher-dialogs-root" }, Eu = { id: "vue-launcher-folder-root" }, Du = { id: "vue-launcher-menus-root" }, Pu = { id: "vue-settings-dialog-root" }, Wu = { id: "vue-clock-settings-root" }, Nu = { id: "vue-bili-theater-root" }, Ou = { id: "vue-bili-mini-player-root" }, Ru = { id: "vue-ai-dialog-root" }, Bu = { id: "vue-aihot-viewer-root" }, Hu = { id: "vue-nav-wheel-root" }, Fu = { id: "vue-github-detail-root" }, ju = { id: "vue-bili-subtitle-modal-root" }, Vu = { id: "vue-bili-video-task-modal-root" }, Ku = { id: "vue-github-task-modal-root" }, zu = { id: "vue-web-task-modal-root" }, Gu = { id: "vue-web-preview-modal-root" }, Uu = { id: "vue-firecrawl-modal-root" }, Yu = { id: "vue-floating-image-viewer-root" }, qu = { id: "vue-command-palette-root" }, Xu = /* @__PURE__ */ he({
  __name: "AppOverlays",
  setup(e) {
    const t = Oe(() => Ct.state.isOpen), o = Oe(() => Eo.isOpen), i = Oe(() => Lt.state.isOpen), a = Oe(() => ia.open), r = Oe(() => no.state.isOpen), m = Oe(() => xs.isOpen), b = Oe(() => Zs.isOpen), l = Oe(() => Mi.state.isOpen), _ = Oe(() => Ls.isOpen), I = Oe(() => $e.isOpen), A = Oe(() => ms.isOpen);
    let f;
    Ke(() => {
      f = ws();
    }), vt(() => {
      f?.();
    });
    const $ = Oe(() => Li.state.isOpen), g = Oe(() => dt.isOpen), p = Oe(() => be.isOpen), k = Oe(() => Ut.editDialog.isOpen || Ut.linkMove.isOpen || Ut.folderMove.isOpen || Ut.groupMerge.isOpen || Ut.folderDelete.isOpen), L = H(() => import("./ProfileMenu-BQFYSFiv.js")), E = H(() => import("./BookmarkNoteMenu-CeYGYmwM.js")), S = H(() => import("./BookmarkPanel-BaxyF1Ky.js")), O = H(() => import("./ClockSettingsMenu-C4_L70DS.js")), j = H(() => import("./TabManagerPanel-kqpHpqU4.js")), se = H(() => import("./LauncherDialogs-BLKiEetL.js")), T = H(() => import("./LauncherFolderDialog-BSKh-4np.js")), y = H(() => import("./LauncherMenus-D-wFtysx.js")), x = H(() => import("./SettingsDialog-Bop3AG7S.js")), Q = H(() => import("./BiliMiniPlayer-r4R5DqRi.js")), W = H(() => import("./BiliTheaterDialog-CkYDLNuq.js")), N = H(() => import("./BiliMessagePanel-BUmd7bjd.js")), D = H(() => import("./AiDialog-DG-TFaoO.js")), F = H(() => import("./AihotViewer-CIxPrp8w.js")), pe = H(() => import("./NavWheelOverlay-C1x8t8eX.js")), ye = H(() => import("./GitHubRepoDetailDrawer-CKVaalx5.js")), it = H(() => import("./InPageSideDrawer-DvRmoY00.js")), He = H(() => import("./BiliSubtitleModal-Dxo_vLzY.js")), rt = H(() => import("./BiliVideoTaskModal-Cz5Mtfio.js")), lt = H(() => import("./GitHubTaskModal-CxyRQpBk.js")), ze = H(() => import("./WebSiteTaskModal-DSp-uDNA.js")), We = H(() => import("./WebSitePreviewModal-JVYaaeSG.js")), Ie = H(() => import("./FirecrawlModal-BTUaWxd_.js")), ve = H(() => import("./FloatingImageViewer-CqR95Nhr.js")), Fe = H(() => import("./CommandPalette-2ZhDip2w.js")), Ze = H(() => import("./AppPromptModal-K1q5dpLz.js")), Se = H(async () => {
      const [uo, po] = await Promise.all([
        import("./PluginMarketDialog-BOUc-XlJ.js"),
        import("./plugin-market-Dbkvvkyi.js")
      ]);
      return fa("logicweaver-market-styles", po.default), uo.default;
    });
    return (uo, po) => (c(), w("div", xu, [
      n("div", Lu, [
        X(zn)
      ]),
      n("div", Su, [
        X(s(L))
      ]),
      n("div", Tu, [
        s(b) ? (c(), ne(s(N), { key: 0 })) : P("", !0)
      ]),
      n("div", $u, [
        s(o) ? (c(), ne(s(j), { key: 0 })) : P("", !0)
      ]),
      n("div", Mu, [
        s($) ? (c(), ne(s(E), { key: 0 })) : P("", !0)
      ]),
      n("div", Iu, [
        X(s(S))
      ]),
      n("div", Au, [
        s(k) ? (c(), ne(s(se), { key: 0 })) : P("", !0)
      ]),
      n("div", Eu, [
        s(g) ? (c(), ne(s(T), { key: 0 })) : P("", !0)
      ]),
      n("div", Du, [
        X(s(y))
      ]),
      n("div", Pu, [
        X(s(x))
      ]),
      n("div", Wu, [
        s(i) ? (c(), ne(s(O), { key: 0 })) : P("", !0)
      ]),
      n("div", Nu, [
        s(r) ? (c(), ne(s(W), { key: 0 })) : P("", !0)
      ]),
      n("div", Ou, [
        s(m) ? (c(), ne(s(Q), { key: 0 })) : P("", !0)
      ]),
      n("div", Ru, [
        s(l) ? (c(), ne(s(D), { key: 0 })) : P("", !0)
      ]),
      n("div", Bu, [
        s(a) ? (c(), ne(s(F), { key: 0 })) : P("", !0)
      ]),
      n("div", Hu, [
        X(s(pe))
      ]),
      X(eu),
      n("div", Fu, [
        s(_) ? (c(), ne(s(ye), { key: 0 })) : P("", !0)
      ]),
      n("div", ju, [
        X(s(He))
      ]),
      n("div", Vu, [
        X(s(rt))
      ]),
      n("div", Ku, [
        X(s(lt))
      ]),
      n("div", zu, [
        X(s(ze))
      ]),
      n("div", Gu, [
        s(p) ? (c(), ne(s(We), { key: 0 })) : P("", !0)
      ]),
      n("div", Uu, [
        X(s(Ie))
      ]),
      n("div", Yu, [
        X(s(ve))
      ]),
      n("div", qu, [
        s(I) ? (c(), ne(s(Fe), { key: 0 })) : P("", !0)
      ]),
      s(A) ? (c(), ne(s(it), { key: 0 })) : P("", !0),
      X(Cu),
      X(s(Ze)),
      s(t) ? (c(), ne(s(Se), { key: 1 })) : P("", !0)
    ]));
  }
});
let ui = !1;
function Ju(e = 1800) {
  if (ui || typeof window > "u") return;
  const t = () => {
    if (ui) return;
    ui = !0;
    const o = _n();
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
const Qu = ["data-active-workspace"], Zu = /* @__PURE__ */ he({
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
    let a = "", r, m;
    function b(A) {
      A.target === "github" && A.githubRule && Re.setSearchRule(A.githubRule), Ps(A.target, A.keyword), A.target === "netease" ? xe.open("music") : xt.enter(A.target === "github" ? "card-github" : "daily-bilibili");
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
      const A = i[go.value] || i.home;
      if (l(A.icon, A.iconType), te.playing && te.title) {
        const f = te.artist ? ` - ${te.artist}` : "";
        document.title = `▶ ${te.title}${f}`;
        return;
      }
      if (qt.playing && qt.title) {
        document.title = `▶ ${qt.title} · 电台`;
        return;
      }
      document.title = A.title;
    }
    ot(
      [
        () => go.value,
        () => te.playing,
        () => te.title,
        () => te.artist,
        () => qt.playing,
        () => qt.title
      ],
      () => {
        _();
      },
      { immediate: !0 }
    );
    const I = ae(() => go.value === "home" ? "" : go.value);
    return ot(() => ft.activeId, kn, { immediate: !0, flush: "sync" }), Ke(() => {
      typeof chrome < "u" && chrome.runtime?.onMessage && (m = Ds(b)), typeof document < "u" && (document.body.dataset.spa = "1");
      try {
        bi.bindGlobalListener(), Pe.start(), sn.start(), fi.init().catch((A) => console.warn("[Launcher] 初始化失败", A)), Ju(), r = setTimeout(() => {
          import("./webdav-auto-sync-C-Jdbk7P.js").then(async (A) => {
            const f = await A.runWebDavAutoSync();
            f.status === "error" || f.status === "conflict" ? ue.show({ appType: "sync", appName: "WebDAV 同步", title: "自动同步已暂停", message: f.message || "请检查同步设置。", level: "warning", history: !0, target: { type: "module", moduleId: "sync" }, actionLabel: "查看设置", showActions: !0, duration: 12e3, onClick: () => co.open("sync") }) : f.status === "downloaded" && ue.show({ appType: "sync", appName: "WebDAV 同步", title: "已恢复云端更新", message: "请刷新已打开的页面以查看同步后的配置。", level: "info", showActions: !1, duration: 6e3 });
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
    }), vt(() => {
      m?.(), r && clearTimeout(r), Pe.stop(), fi.stop(), sn.stop(), document.body.classList.remove("has-card-fullscreen"), typeof document < "u" && o && (document.title = o);
    }), t({
      activeWorkspaceId: I,
      windowManagerController: xe
    }), (A, f) => (c(), w("div", {
      id: "logicweaver-spa-root",
      class: "logicweaver-spa-root",
      "data-active-workspace": I.value || ""
    }, [
      X(id),
      X(ud),
      n("nav", {
        id: "mac-dock",
        class: re(["mac-dock", "dock-" + s(Nt).position]),
        "aria-label": "快捷应用栏"
      }, [
        X(Kn)
      ], 2),
      X(Xu)
    ], 8, Qu));
  }
}), ep = /* @__PURE__ */ Be(Zu, [["__scopeId", "data-v-a54ecb8b"]]), tp = {
  class: "endfield-stage",
  "aria-hidden": "true"
}, op = {
  class: "rhinelab-stage",
  "aria-hidden": "true"
}, ip = { class: "rhine-scaler" }, np = { class: "rhine-center-group" }, sp = { class: "rhine-auth-status" }, ap = { class: "rhine-auth-text" }, rp = ["hidden"], lp = { class: "rhine-cinema-caption" }, cp = /* @__PURE__ */ he({
  __name: "IntroAnimation",
  setup(e) {
    const t = q(window.innerHeight), o = q(window.innerWidth), i = q(!1), a = q(!1), r = q(10), m = q(1), b = q(0), l = /* @__PURE__ */ new Set();
    let _ = 0, I = () => {
    };
    const A = ae(() => `${String(Math.round(Ye.renderedProgress)).padStart(2, "0")}%`), f = ae(() => {
      const T = Ye.renderedProgress / 100 * t.value + 10;
      return `${Math.min(T, Math.max(0, t.value - 102)).toFixed(1)}px`;
    }), $ = ae(() => Ye.renderedProgress >= 75 ? "START PROCESSING..." : Ye.renderedProgress >= 35 ? "REQUEST RECEIVED" : "ID CONFIRMED : JOYCE MOORE"), g = ae(() => Ye.finished ? "身份验证通过 · 欢迎进入终端" : Ye.status ? `身份信息确认 · ${Ye.status.replace(/^.*?\/\s*/, "")}` : "身份信息确认：JOYCE MOORE"), p = ae(() => String(Math.max(0.35, Math.min(o.value / 1920, t.value / 1080))));
    function k(T, y) {
      const x = window.setTimeout(() => {
        l.delete(x), T();
      }, y);
      l.add(x);
    }
    function L() {
      window.dispatchEvent(new CustomEvent("logicweaver:intro-complete"));
    }
    function E(T) {
      if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
        L();
        return;
      }
      const y = T ? 180 : 260, x = T ? 200 : 280, Q = performance.now(), W = (N) => {
        const D = N - Q, F = Math.min(1, D / y), pe = 1 - Math.pow(1 - F, 3);
        if (r.value = 10 + pe * Math.max(0, o.value - 10), D > y && (m.value = Math.max(0, 1 - (D - y) / x)), D >= y + x) {
          L();
          return;
        }
        _ = requestAnimationFrame(W);
      };
      k(() => {
        _ = requestAnimationFrame(W);
      }, T ? 60 : 120);
    }
    function S(T) {
      T || (i.value = !0), k(() => {
        a.value = !0, b.value = 6, m.value = 0, k(L, 380);
      }, T ? 40 : 420);
    }
    function O(T) {
      Ye.style === "rhinelab" ? S(T) : E(T);
    }
    function j() {
      o.value = window.innerWidth, t.value = window.innerHeight;
    }
    function se(T) {
      Ye.finished || (T.key === "Enter" || T.key === " " || T.key === "Escape") && (T.preventDefault(), at.skip("KEYBOARD SKIP"));
    }
    return Ke(() => {
      document.documentElement.dataset.startupStyle = Ye.style, document.documentElement.style.setProperty("--rhine-scale", p.value), window.addEventListener("resize", j, { passive: !0 }), window.addEventListener("keydown", se, !0), I = xa(O), $n();
    }), lo(() => {
      I(), window.removeEventListener("resize", j), window.removeEventListener("keydown", se, !0), cancelAnimationFrame(_);
      for (const T of l) clearTimeout(T);
      l.clear();
    }), (T, y) => (c(), w("div", {
      class: "intro-vue-content",
      style: _e({ "--rhine-scale": p.value, opacity: m.value, filter: `blur(${b.value}px)` })
    }, [
      n("div", tp, [
        y[2] || (y[2] = n("div", { class: "endfield-loader-texture" }, null, -1)),
        y[3] || (y[3] = n("div", { class: "endfield-loader-rail" }, null, -1)),
        n("div", {
          class: "endfield-loader-fill",
          style: _e({ height: `${s(Ye).renderedProgress}%` })
        }, null, 4),
        n("div", {
          class: "endfield-loader-meter",
          style: _e({ top: f.value })
        }, [
          y[1] || (y[1] = n("span", { class: "endfield-loader-tick" }, null, -1)),
          n("b", null, u(A.value), 1),
          n("small", null, u(s(Ye).status), 1)
        ], 4),
        y[4] || (y[4] = oo('<section class="endfield-loader-brand"><span class="endfield-loader-kicker">DEEPSEEK HARNESS</span><strong>END</strong><strong>FIELD</strong><span class="endfield-loader-detail"><i class="endfield-loader-chevron"></i><span>EDGE INTELLIGENCE THEME</span><small>TERRA RESEARCH COMMISSION / BOOT SEQUENCE</small><span class="endfield-loader-squares"><i class="on"></i><i class="on"></i><i class="on"></i><i></i><i></i><i></i><i class="on"></i><i class="on"></i><i></i><i></i><i></i><i></i></span></span><em>OVER THE FRONTIER / INTO THE FRONT</em></section>', 1)),
        n("div", {
          class: "endfield-loader-wipe",
          style: _e({ width: `${r.value}px`, opacity: r.value > 10 ? 1 : 0 })
        }, null, 4)
      ]),
      n("div", op, [
        y[12] || (y[12] = oo('<div class="rhine-background"><svg viewBox="0 0 1920 1080" preserveAspectRatio="none"><g fill="none" stroke="#ffffff" stroke-width="2.5"><path class="rhine-drift-path1" d="M-210 705C-45 705 182 704 247 567C337 377 99 306 4 435S27 680 169 631C309 584 227 314 279 111S568-113 568-113"></path><path class="rhine-drift-path2" d="M1560-80C1374 114 1671 168 1601 323S1371 367 1431 480S1692 666 1559 787S1329 886 1498 1130"></path><circle class="rhine-drift-circle" cx="1450" cy="648" r="346"></circle><circle class="rhine-drift-circle2" cx="1450" cy="648" r="348"></circle></g></svg></div>', 1)),
        n("div", ip, [
          y[10] || (y[10] = oo('<header class="rhine-brand"><h1>RHINE LAB</h1><div class="rhine-brand-sub">SYNTHESIZE INFORMATION</div><p class="rhine-brand-os"><span class="rhine-brand-analysis"><span style="left:2px;">A</span><span style="left:28px;">N</span><span style="left:55px;">A</span><span style="left:81px;">L</span><span style="left:103px;">Y</span><span style="left:129px;">S</span><span style="left:154px;">I</span><span style="left:166px;">S</span></span><b>OS</b></p></header>', 1)),
          n("button", {
            class: "rhine-skip",
            type: "button",
            title: "点击进入系统 (或按 Enter)",
            onClick: y[0] || (y[0] = (x) => s(at).skip("ENTER SYSTEM"))
          }, [...y[5] || (y[5] = [
            st("ENTER SYSTEM ", -1),
            n("span", null, "↗", -1)
          ])]),
          n("div", np, [
            y[8] || (y[8] = n("div", { class: "rhine-logo-box" }, [
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
            n("div", sp, [
              y[6] || (y[6] = n("span", { class: "rhine-auth-dot" }, "·", -1)),
              n("span", ap, u($.value), 1),
              y[7] || (y[7] = n("i", {
                class: "rhine-cursor",
                "aria-hidden": "true"
              }, null, -1))
            ])
          ]),
          n("div", {
            class: re(["rhine-scan", { active: i.value }]),
            hidden: !i.value
          }, [...y[9] || (y[9] = [
            oo('<svg viewBox="0 0 1920 1080" aria-hidden="true"><g fill="none" stroke="#080a08" stroke-linecap="round"><circle class="rhine-scan-circle ring-outer" cx="960" cy="540" r="280" stroke-width="2.5"></circle><circle class="rhine-scan-circle ring-white" cx="960" cy="540" r="260" stroke="#fff" stroke-width="3.5"></circle><circle class="rhine-scan-circle ring-inner" cx="960" cy="540" r="220" stroke-width="2"></circle><circle class="rhine-orbit-dot dot-1" cx="960" cy="260" r="8" fill="#ed821b" stroke="none"></circle><circle class="rhine-orbit-dot dot-2" cx="960" cy="820" r="8" fill="#ed821b" stroke="none"></circle><circle class="rhine-scan-core" cx="960" cy="540" r="6" fill="#080a08" stroke="none"></circle></g></svg><span class="rhine-scan-label">PERMISSION AUTHORIZED</span>', 2)
          ])], 10, rp),
          n("div", lp, u(g.value), 1),
          y[11] || (y[11] = n("div", { class: "rhine-powered" }, [
            st("POWERED BY "),
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
}), dp = /* @__PURE__ */ he({
  __name: "ProfileMenu",
  setup(e) {
    function t(o) {
      Fo.trigger(o);
    }
    return (o, i) => (c(), w(ee, null, [
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
}), up = /* @__PURE__ */ he({
  __name: "WorkspaceLaunchers",
  setup(e) {
    function t(o) {
      $i.openWorkspace(o, !0);
    }
    return (o, i) => (c(), w(ee, null, [
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
      ks(o.$slots, "default")
    ], 64));
  }
}), pp = {
  key: 0,
  "aria-label": "AI 分析任务"
}, hp = { role: "status" }, fp = ["disabled"], gp = ["disabled"], mp = /* @__PURE__ */ he({
  __name: "GitHubStatus",
  setup(e) {
    return (t, o) => s(Ue).message || s(Ue).busy ? (c(), w("section", pp, [
      n("p", hp, u(s(Ue).repo ? `原任务仓库：${s(Ue).repo}。 ` : "") + u(s(Ue).message), 1),
      s(Ue).busy ? (c(), w("button", {
        key: 0,
        type: "button",
        onClick: o[0] || (o[0] = (i) => s(Re).stopAiAnalysis())
      }, "停止后续分析 / 中断等待")) : P("", !0),
      s(Ue).uncertain ? (c(), w(ee, { key: 1 }, [
        o[5] || (o[5] = n("p", null, "AI 结果未确认，已阻止本页再次提交。请到供应商核对请求和计费；本页记录在整页关闭或重载后会丢失。", -1)),
        s(Ue).unlockConfirmation ? (c(), w(ee, { key: 1 }, [
          o[4] || (o[4] = n("p", null, "扩展不能验证供应商任务；确认只解除本页限制，不代表成功，也不会重发请求。", -1)),
          n("button", {
            type: "button",
            disabled: s(Ue).busy,
            onClick: o[2] || (o[2] = (i) => s(Re).acknowledgeAiChecked())
          }, "确认解除本页限制", 8, gp),
          n("button", {
            type: "button",
            onClick: o[3] || (o[3] = (i) => s(Ue).unlockConfirmation = !1)
          }, "保持限制")
        ], 64)) : (c(), w("button", {
          key: 0,
          type: "button",
          disabled: s(Ue).busy,
          onClick: o[1] || (o[1] = (i) => s(Ue).unlockConfirmation = !0)
        }, "我已核对供应商记录", 8, fp))
      ], 64)) : P("", !0)
    ])) : P("", !0);
  }
}), U = fe({ repo: "", text: "", baseline: "", busy: !1, message: "", storedValue: null });
function ln(e, t = !1) {
  if (!e || U.busy) return;
  if (U.repo && U.text !== U.baseline) {
    U.message = "请先保存或明确取消当前草稿，再编辑或清除其它备注。";
    return;
  }
  const o = Re.remarks[e]?.userRemark, i = typeof o == "string" ? o : "";
  Object.assign(U, {
    repo: e,
    baseline: i,
    text: t ? "" : i,
    storedValue: null,
    message: t ? "清除已准备；点击保存才会清除手写备注，AI 简介不变。" : "仅点击保存或 Enter 才写入；草稿只保留在本页内存。"
  });
}
function pi() {
  U.busy || Object.assign(U, { repo: "", text: "", baseline: "", storedValue: null, message: "" });
}
async function hi() {
  if (U.busy || !U.repo) return;
  const { repo: e, text: t, baseline: o } = U;
  U.busy = !0;
  try {
    await Re.updateRepoRemark(e, { userRemark: t.trim() }, o), Object.assign(U, { repo: "", text: "", baseline: "", storedValue: null, message: `${e} 的备注已保存并回读核对。` });
  } catch (i) {
    U.message = i instanceof Error ? i.message : "保存未确认，草稿保留，请先读取已保存值核对。";
  } finally {
    U.busy = !1;
  }
}
async function cn() {
  if (U.busy || !U.repo) return;
  const e = U.repo;
  U.busy = !0;
  try {
    const o = (await Re.reloadRepoRemarks())[e]?.userRemark;
    if (o !== void 0 && typeof o != "string") throw new Error("保存值格式异常，未变更草稿或覆盖基准。");
    U.storedValue = o ?? "", U.baseline = o ?? "", U.message = "已读取保存值，草稿没有替换。请对比下方保存值；再次点击保存将以草稿替换它。";
  } catch (t) {
    U.message = t instanceof Error ? t.message : "读取失败，草稿保留。";
  } finally {
    U.busy = !1;
  }
}
const wp = ["disabled"], yp = ["disabled"], vp = ["disabled"], bp = ["disabled"], kp = {
  key: 0,
  style: { width: "100%", "white-space": "pre-wrap", "overflow-wrap": "anywhere" }
}, dn = /* @__PURE__ */ he({
  __name: "GitHubRemarkEditor",
  props: {
    active: { type: Boolean }
  },
  setup(e) {
    const t = e, o = q(null);
    function i(a) {
      if (!(Ci(a) || !t.active)) {
        if (a.key === "Escape") {
          a.preventDefault(), a.stopPropagation(), pi();
          return;
        }
        fn(a, hi);
      }
    }
    return Ke(() => {
      ht(() => {
        t.active && !U.busy && o.value?.focus();
      });
    }), (a, r) => (c(), w("div", {
      class: "gh-inline-remark-box",
      style: { "flex-wrap": "wrap", "max-width": "100%" },
      onClick: r[4] || (r[4] = G(() => {
      }, ["stop"]))
    }, [
      Tt(n("input", {
        ref_key: "input",
        ref: o,
        "onUpdate:modelValue": r[0] || (r[0] = (m) => s(U).text = m),
        class: "gh-inline-remark-input",
        type: "text",
        maxlength: "100",
        "aria-label": "手写仓库备注",
        placeholder: "备注说明…",
        disabled: s(U).busy || !e.active,
        onKeydown: i
      }, null, 40, wp), [
        [Ho, s(U).text]
      ]),
      n("button", {
        type: "button",
        class: "gh-inline-remark-btn save",
        title: "保存备注",
        disabled: s(U).busy || !e.active,
        onClick: r[1] || (r[1] = //@ts-ignore
        (...m) => s(hi) && s(hi)(...m))
      }, "✓", 8, yp),
      n("button", {
        type: "button",
        class: "gh-inline-remark-btn cancel",
        title: "取消草稿",
        disabled: s(U).busy || !e.active,
        onClick: r[2] || (r[2] = //@ts-ignore
        (...m) => s(pi) && s(pi)(...m))
      }, "✕", 8, vp),
      n("button", {
        type: "button",
        disabled: s(U).busy || !e.active,
        onClick: r[3] || (r[3] = //@ts-ignore
        (...m) => s(cn) && s(cn)(...m))
      }, "读取已保存值", 8, bp),
      s(U).storedValue !== null ? (c(), w("p", kp, "已保存值：" + u(s(U).storedValue || "（空）"), 1)) : P("", !0)
    ]));
  }
}), _p = {
  key: 0,
  role: "status"
}, Cp = {
  key: 1,
  "aria-label": "未显示仓库的备注草稿"
}, xp = {
  key: 2,
  class: "gh-search-options",
  style: { margin: "0 0 10px" }
}, Lp = { style: { "font-size": "12px", color: "var(--dim)" } }, Sp = {
  key: 3,
  class: "gh-repos-loading"
}, Tp = {
  key: 4,
  class: "muted small",
  style: { "text-align": "center", padding: "40px 0", "font-size": "13px" }
}, $p = ["data-repo-name", "onClick", "onContextmenu", "onDragstart"], Mp = ["onClick"], Ip = { class: "gh-card-head" }, Ap = ["checked", "onChange"], Ep = ["src"], Dp = ["href", "title"], Pp = { class: "owner" }, Wp = { class: "gh-card-body" }, Np = { class: "gh-card-badges" }, Op = ["title", "onClick"], Rp = ["onClick"], Bp = ["title", "onClick"], Hp = { class: "gh-badge-remark-text" }, Fp = {
  key: 0,
  class: "desc gh-desc-analyzing",
  title: "正在使用 AI 分析仓库…"
}, jp = {
  key: 1,
  class: "desc gh-desc-ai",
  title: "AI 中文简介（点击可直接修改，右键可重新分析）"
}, Vp = ["title"], Kp = {
  key: 3,
  class: "desc dim"
}, zp = { class: "meta" }, Gp = { class: "gh-stars" }, Up = {
  key: 0,
  class: "gh-lang"
}, Yp = {
  key: 1,
  class: "gh-updated"
}, qp = {
  key: 6,
  class: "gh-pager"
}, Xp = ["disabled"], Jp = { class: "gh-page-info" }, Qp = ["disabled"], Zp = ["onClick"], eh = /* @__PURE__ */ he({
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
    function m(T, y) {
      const x = T.target;
      if (x instanceof Element) {
        if (ge.batchMode) {
          if (x.closest(".fo-card-more,.gh-badge-folder,.gh-badge-remark,.gh-inline-remark-box")) return;
          T.preventDefault(), T.stopPropagation(), wt.toggleSelection(y.fullName);
          return;
        }
        x.closest("a,button,.gh-badge-folder,.gh-badge-remark,.fo-card-more,.gh-card-hole,.gh-card-checkbox,.gh-inline-remark-box") || (T.preventDefault(), T.stopPropagation(), Ss.open(y.fullName, void 0, y));
      }
    }
    function b(T, y) {
      if (!t.active) return;
      T.preventDefault(), T.stopPropagation();
      const x = 12, Q = 160, W = 280, N = Math.min(window.innerWidth - Q - x, Math.max(x, T.clientX)), D = Math.min(window.innerHeight - W - x, Math.max(x, T.clientY));
      i.x = N, i.y = D, i.fullName = y.fullName, i.folders = [...y.folders || (y.folder ? [y.folder] : [])], i.hasRemark = !!y.customRemark, i.url = y.url, i.visible = !0, a.value = null, r.value = N > window.innerWidth - 380;
    }
    function l(T, y) {
      b(y, T), a.value = "folder";
    }
    function _() {
      i.visible = !1, a.value = null;
    }
    function I(T) {
      i.folders.includes(T) ? i.folders = i.folders.filter((y) => y !== T) : i.folders.push(T), Re.toggleRepoList(i.fullName, T);
    }
    function A() {
      i.folders = [], Re.clearRepoLists(i.fullName), _();
    }
    function f(T) {
      if (!t.active) return;
      const y = typeof T == "string" ? T : T?.fullName || i.fullName;
      _(), ln(y);
    }
    function $() {
      if (!t.active) return;
      const T = i.fullName;
      _(), ln(T, !0);
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
      const y = Re.findRepository(i.fullName);
      _(), y && Ws.sendGitHubShare({
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
      }, T);
    }
    function k() {
      const T = Re.findRepository(i.fullName);
      _(), T && la.open({
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
    async function E() {
      const T = Re.findRepository(i.fullName);
      if (!T) {
        _();
        return;
      }
      _(), await Re.confirmUnstarRepository(T);
    }
    function S(T) {
      const y = T.target;
      y?.closest(".gh-repo-context-menu") || y?.closest(".gh-inline-remark-box") || _();
    }
    function O(T) {
      T.key === "Escape" && i.visible && _();
    }
    ot(() => t.active, (T) => {
      window.removeEventListener("pointerdown", S), window.removeEventListener("keydown", O), _(), T && (window.addEventListener("pointerdown", S), window.addEventListener("keydown", O));
    }, { immediate: !0 }), vt(() => {
      window.removeEventListener("pointerdown", S), window.removeEventListener("keydown", O);
    });
    function j(T, y) {
      const x = T.target;
      if (x instanceof Element && x.closest("button,a,input,textarea,select,[contenteditable='true']")) {
        T.preventDefault();
        return;
      }
      wt.startDrag(y, T);
    }
    const se = ae(() => {
      if (ge.cards.length > 0) return !1;
      const T = Ts.actionText || "";
      return !!(T.includes("正在读取") || T.includes("正在加载") || T.includes("正在统计") || T.includes("正在同步"));
    });
    return (T, y) => (c(), w(ee, null, [
      s(U).message ? (c(), w("p", _p, u(s(U).repo ? `${s(U).repo}：` : "") + u(s(U).message), 1)) : P("", !0),
      o.value ? (c(), w("section", Cp, [
        n("p", null, "备注草稿：" + u(s(U).repo) + "（仓库不在当前列表中，草稿仍保留）", 1),
        X(dn, {
          active: t.active
        }, null, 8, ["active"])
      ])) : P("", !0),
      s(ge).searchMessage ? (c(), w("div", xp, [
        n("span", Lp, u(s(ge).searchMessage), 1),
        n("button", {
          type: "button",
          class: "gh-tab",
          style: { padding: "2px 8px", "font-size": "11px", "margin-left": "8px" },
          onClick: y[0] || (y[0] = (x) => s(wt).resetSearch())
        }, "清空搜索")
      ])) : P("", !0),
      se.value ? (c(), w("div", Sp, [...y[17] || (y[17] = [
        n("div", {
          class: "gh-spinner",
          "aria-hidden": "true"
        }, null, -1),
        n("span", { class: "gh-loading-label" }, "正在读取 GitHub 仓库列表中…", -1)
      ])])) : s(ge).emptyMessage ? (c(), w("p", Tp, u(s(ge).emptyMessage), 1)) : P("", !0),
      s(ge).cards.length ? (c(), w("div", {
        key: 5,
        class: re(["repos gh-grid", { "gh-batch-active": s(ge).batchMode }])
      }, [
        (c(!0), w(ee, null, ke(s(ge).cards, (x) => (c(), w("article", {
          key: x.fullName,
          class: re(["repo gh-card", { selected: x.selected }]),
          "data-repo-name": x.fullName,
          draggable: "true",
          onClick: (Q) => m(Q, x),
          onContextmenu: (Q) => b(Q, x),
          onDragstart: (Q) => j(Q, x.fullName)
        }, [
          n("button", {
            class: "fo-card-more",
            type: "button",
            "aria-label": "更多操作",
            title: "更多操作",
            onClick: G((Q) => b(Q, x), ["stop"])
          }, "⋮", 8, Mp),
          n("div", Ip, [
            n("label", {
              class: "gh-card-hole",
              title: "点击勾选此仓库",
              onClick: y[1] || (y[1] = G(() => {
              }, ["stop"]))
            }, [
              n("input", {
                class: "gh-card-checkbox",
                type: "checkbox",
                checked: x.selected,
                onChange: (Q) => s(wt).setSelection(x.fullName, Q.target.checked)
              }, null, 40, Ap),
              y[18] || (y[18] = n("span", { class: "gh-hole-inner" }, null, -1))
            ]),
            n("img", {
              class: "gh-owner-avatar",
              src: x.avatarUrl || "assets/github-star.svg",
              alt: "",
              loading: "lazy",
              referrerpolicy: "no-referrer",
              onError: y[2] || (y[2] = (Q) => Q.target.src = "assets/github-star.svg")
            }, null, 40, Ep),
            n("a", {
              href: x.url,
              target: "_blank",
              rel: "noreferrer",
              class: "name",
              title: x.fullName
            }, [
              n("span", Pp, u(x.owner) + "/", 1),
              st(u(x.name), 1)
            ], 8, Dp)
          ]),
          n("div", Wp, [
            n("div", Np, [
              x.folders && x.folders.length ? (c(!0), w(ee, { key: 0 }, ke(x.folders, (Q) => (c(), w("span", {
                key: Q,
                class: "gh-badge-folder",
                title: `本地分组：${Q}（点击管理所属列表）`,
                onClick: G((W) => l(x, W), ["stop"])
              }, " 📁 " + u(Q), 9, Op))), 128)) : (c(), w("span", {
                key: 1,
                class: "gh-badge-folder uncat",
                title: "未分类（点击加入 本地分组）",
                onClick: G((Q) => l(x, Q), ["stop"])
              }, " ＋ 未分类 ", 8, Rp)),
              s(U).repo === x.fullName ? (c(), ne(dn, {
                key: 2,
                active: t.active
              }, null, 8, ["active"])) : x.customRemark ? (c(), w("span", {
                key: 3,
                class: "gh-badge-remark",
                title: `备注：${x.customRemark}（点击就地修改）`,
                onClick: G((Q) => f(x), ["stop"])
              }, [
                y[19] || (y[19] = n("span", { class: "gh-badge-remark-icon" }, "💬", -1)),
                n("span", Hp, u(x.customRemark), 1)
              ], 8, Bp)) : P("", !0)
            ]),
            x.descriptionKind === "analyzing" ? (c(), w("p", Fp, [...y[20] || (y[20] = [
              n("span", { class: "gh-ai-sparkle" }, "✨", -1),
              st(" 正在使用 AI 分析仓库并提炼中文介绍…", -1)
            ])])) : x.descriptionKind === "ai" ? (c(), w("p", jp, [
              y[21] || (y[21] = n("span", { class: "gh-ai-tag-flag" }, "🤖", -1)),
              st(u(x.description), 1)
            ])) : x.descriptionKind === "plain" ? (c(), w("p", {
              key: 2,
              class: "desc",
              title: x.description
            }, u(x.description), 9, Vp)) : (c(), w("p", Kp, "暂无描述"))
          ]),
          n("div", zp, [
            n("span", Gp, "★ " + u(x.stars), 1),
            x.language ? (c(), w("span", Up, u(x.language), 1)) : P("", !0),
            x.updated ? (c(), w("span", Yp, "更新 " + u(x.updated), 1)) : P("", !0)
          ])
        ], 42, $p))), 128))
      ], 2)) : P("", !0),
      s(ge).totalPages > 1 ? (c(), w("div", qp, [
        n("button", {
          class: "gh-page-btn",
          type: "button",
          disabled: s(ge).page <= 1,
          onClick: y[3] || (y[3] = (x) => s(wt).changePage(s(ge).page - 1))
        }, "‹ 上一页", 8, Xp),
        n("span", Jp, u(s(ge).page) + " / " + u(s(ge).totalPages) + " · 共 " + u(s(ge).totalItems) + " 个" + u(s(ge).serverPaged ? ` · 已加载 ${s(ge).loadedItems}` : ""), 1),
        n("button", {
          class: "gh-page-btn",
          type: "button",
          disabled: s(ge).page >= s(ge).totalPages,
          onClick: y[4] || (y[4] = (x) => s(wt).changePage(s(ge).page + 1))
        }, "下一页 ›", 8, Qp)
      ])) : P("", !0),
      (c(), ne($t, { to: "body" }, [
        t.active && i.visible ? (c(), w("div", {
          key: 0,
          class: "fo-cover-context-menu gh-repo-context-menu",
          style: _e({ left: `${i.x}px`, top: `${i.y}px` }),
          onClick: y[15] || (y[15] = G(() => {
          }, ["stop"])),
          onContextmenu: y[16] || (y[16] = G(() => {
          }, ["prevent"]))
        }, [
          n("div", {
            class: re(["gh-menu-has-sub", { "is-active": a.value === "folder" }]),
            onMouseenter: y[6] || (y[6] = (x) => a.value = "folder")
          }, [
            y[22] || (y[22] = n("button", {
              class: "fo-cover-menu-item with-sub-arrow",
              type: "button"
            }, [
              n("span", null, "📁 所属 本地分组"),
              n("span", { class: "sub-arrow" }, "›")
            ], -1)),
            n("div", {
              class: re(["gh-sub-flyout", { "flyout-left": r.value }]),
              onClick: y[5] || (y[5] = G(() => {
              }, ["stop"]))
            }, [
              n("button", {
                class: re(["fo-cover-menu-item", { primary: i.folders.length === 0 }]),
                type: "button",
                onClick: A
              }, u(i.folders.length === 0 ? "✓ " : "  ") + "＋ 设为未分类（清空列表） ", 3),
              (c(!0), w(ee, null, ke(s(Re).cats, (x) => (c(), w("button", {
                key: x,
                class: re(["fo-cover-menu-item", { primary: i.folders.includes(x) }]),
                type: "button",
                onClick: (Q) => I(x)
              }, u(i.folders.includes(x) ? "✓ " : "  ") + "📁 " + u(x), 11, Zp))), 128))
            ], 2)
          ], 34),
          n("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: y[7] || (y[7] = (x) => a.value = null),
            onClick: y[8] || (y[8] = (x) => f())
          }, " ✏️ 编辑备注… ", 32),
          n("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: y[9] || (y[9] = (x) => a.value = null),
            onClick: k
          }, " 创建任务 ", 32),
          X(Qs, {
            label: "💬 发送到聊天室",
            visible: i.visible,
            onOpen: y[10] || (y[10] = (x) => a.value = null),
            onSelect: p
          }, null, 8, ["visible"]),
          i.hasRemark ? (c(), w("button", {
            key: 0,
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: y[11] || (y[11] = (x) => a.value = null),
            onClick: $
          }, " 🗑️ 清除备注 ", 32)) : P("", !0),
          n("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: y[12] || (y[12] = (x) => a.value = null),
            onClick: g
          }, " 📋 复制仓库链接 ", 32),
          n("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: y[13] || (y[13] = (x) => a.value = null),
            onClick: L
          }, " ↗ 在 GitHub 打开 ", 32),
          n("button", {
            class: "fo-cover-menu-item danger",
            type: "button",
            onMouseenter: y[14] || (y[14] = (x) => a.value = null),
            onClick: E
          }, " ⭐ 取消 Star ", 32)
        ], 36)) : P("", !0)
      ]))
    ], 64));
  }
}), th = /* @__PURE__ */ Be(eh, [["__scopeId", "data-v-93d09653"]]), oh = { class: "gh-batch-bar-left" }, ih = { class: "gh-batch-count-tip" }, nh = { id: "gh-batch-selected-count" }, sh = {
  key: 0,
  "aria-label": "批量归属列表确认"
}, ah = ["disabled"], rh = ["disabled"], lh = { class: "gh-batch-bar-right" }, ch = ["disabled"], dh = ["disabled"], uh = ["disabled"], ph = /* @__PURE__ */ he({
  __name: "GitHubBatchBar",
  props: {
    active: { type: Boolean, default: !0 }
  },
  setup(e) {
    const t = e, o = _s(), i = q(null), a = ae(() => {
      const b = [
        { value: "", label: "未分类（清空所选仓库的所有列表所属）", icon: "🌐" }
      ];
      return $s.folders.filter((l) => l.kind === "custom").forEach((l) => {
        b.push({ value: l.title, label: l.title, icon: "📁" });
      }), b;
    });
    function r() {
      t.active && (o.value = Re.prepareBatchMove(), i.value = null);
    }
    async function m() {
      const b = o.value, l = i.value;
      if (!t.active || !b || l === null || Yt.busy) return;
      await b.submit(l) && o.value === b && (o.value = void 0);
    }
    return ot(() => t.active && At.active, (b) => {
      b || (o.value = void 0);
    }), (b, l) => (c(), w(ee, null, [
      n("div", oh, [
        n("button", {
          type: "button",
          class: "gh-batch-action-btn",
          id: "gh-batch-select-all-btn",
          onClick: l[0] || (l[0] = (_) => s(io).toggleSelectAll())
        }, u(s(At).allSelected ? "取消全选" : "全选"), 1),
        n("span", ih, [
          l[5] || (l[5] = st("已选择 ", -1)),
          n("b", nh, u(s(At).selectedCount), 1),
          l[6] || (l[6] = st(" 项", -1))
        ])
      ]),
      o.value ? (c(), w("section", sh, [
        n("p", null, "仅操作打开选择器时的 " + u(o.value.names.length) + " 个仓库；后来勾选的仓库不加入。", 1),
        n("details", null, [
          l[7] || (l[7] = n("summary", null, "查看本次仓库清单", -1)),
          n("ul", null, [
            (c(!0), w(ee, null, ke(o.value.names, (_) => (c(), w("li", { key: _ }, u(_), 1))), 128))
          ])
        ]),
        X(ga, {
          "model-value": i.value ?? "",
          options: a.value,
          disabled: s(Yt).busy,
          placeholder: "请选择目标列表",
          size: "sm",
          style: { "max-width": "260px" },
          "onUpdate:modelValue": l[1] || (l[1] = (_) => i.value = String(_))
        }, null, 8, ["model-value", "options", "disabled"]),
        n("button", {
          type: "button",
          disabled: !t.active || s(Yt).busy || i.value === null,
          onClick: m
        }, "确认加入列表", 8, ah),
        n("button", {
          type: "button",
          disabled: s(Yt).busy,
          onClick: l[2] || (l[2] = (_) => o.value = void 0)
        }, "取消", 8, rh)
      ])) : P("", !0),
      n("div", lh, [
        n("button", {
          type: "button",
          class: "gh-batch-action-btn",
          id: "gh-batch-move-btn",
          disabled: !t.active || s(Yt).busy || s(At).selectedCount === 0,
          title: "固定当前选择，批量加入所选本地分组",
          onClick: r
        }, " 📁 归入本地分组 ", 8, ch),
        n("button", {
          type: "button",
          class: "gh-batch-action-btn",
          id: "gh-batch-ai-btn",
          disabled: s(At).selectedCount === 0,
          title: "批量使用 AI 生成中文介绍",
          onClick: l[3] || (l[3] = (_) => s(io).analyzeAi())
        }, " ✨ 批量 AI 分析 ", 8, dh),
        n("button", {
          type: "button",
          class: "gh-batch-action-btn danger",
          id: "gh-batch-unstar-btn",
          disabled: s(At).selectedCount === 0,
          title: "从 GitHub 批量取消 Star 收藏",
          onClick: l[4] || (l[4] = (_) => s(io).unstar())
        }, " 🗑 取消收藏 ", 8, uh)
      ])
    ], 64));
  }
}), hh = H(() => import("./GitHubWorkspaceCard-DqODtjb1.js")), fh = H(() => import("./TabManagerPanel-kqpHpqU4.js")), gh = H(() => import("./BookmarkNoteMenu-CeYGYmwM.js")), mh = H(() => import("./BookmarkPanel-BaxyF1Ky.js")), wh = H(() => import("./LauncherDialogs-BLKiEetL.js")), yh = H(() => import("./SettingsDialog-Bop3AG7S.js")), vh = H(() => import("./SettingsView-RwERD3Fy.js")), bh = H(() => import("./ClockSettingsMenu-C4_L70DS.js")), kh = H(() => import("./BiliTheaterDialog-CkYDLNuq.js")), _h = H(() => import("./BiliMiniPlayer-r4R5DqRi.js")), Ch = H(() => import("./BiliMessagePanel-BUmd7bjd.js")), xh = H(() => import("./BilibiliWorkspace-C4xSZTEa.js")), Lh = H(() => import("./AihotFeed-C7g01HiZ.js")), Sh = H(() => import("./GitHubTrending-B0hD-rGV.js")), Th = H(() => import("./AiDialog-DG-TFaoO.js")), $h = H(() => import("./AihotViewer-CIxPrp8w.js")), Mh = H(() => import("./NavWheelOverlay-C1x8t8eX.js")), Ih = H(() => import("./StandaloneHost-B4R3B3W5.js")), Ah = H(() => import("./LauncherFolderDialog-BSKh-4np.js")), Eh = H(() => import("./LauncherMenus-D-wFtysx.js"));
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
      const m = r.innerHTML, b = xi(o);
      b.config.errorHandler = (l, _, I) => {
        console.error(`LogicWeaver Vue feature failed: ${t.id} (${I})`, l), r.dataset.vueError = "1";
      };
      try {
        b.mount(r), i?.setMounted?.(!0);
      } catch (l) {
        throw i?.setMounted?.(!1), r.innerHTML = m, l;
      }
      return () => {
        i?.setMounted?.(!1), b.unmount();
      };
    }
  });
}
function Dh(e) {
  e.register({
    id: "intro",
    title: "启动动画",
    order: 10,
    eager: !0,
    roots: ["endfield-loader"],
    capabilities: ["ui:intro", "boot:progress"],
    mount: () => {
      const t = document.getElementById("endfield-loader");
      if (!at.enabled) {
        t?.remove(), document.body.classList.remove("is-starting");
        return;
      }
      if (!t) return;
      const o = xi(cp);
      let i = !1;
      const a = () => {
        e.stop("intro");
      };
      window.addEventListener("logicweaver:intro-complete", a, { once: !0 }), o.mount(t);
      const r = window.setTimeout(() => {
        at.finish("基础界面已就绪，在线服务继续后台加载", !0), window.setTimeout(() => {
          i || (a(), t?.remove(), document.body.classList.remove("is-starting"));
        }, 600);
      }, 8e3);
      return () => {
        i || (i = !0, clearTimeout(r), window.removeEventListener("logicweaver:intro-complete", a), o.unmount(), t.remove(), document.body.classList.remove("is-starting"));
      };
    }
  }), Z(e, { id: "spa-app", title: "纯血 SPA 单根调度器", order: 15, root: "vue-spa-root", capabilities: ["ui:spa-root", "workspace:keepalive"] }, ep), document.getElementById("vue-spa-root") || Z(e, { id: "bili-companions", title: "b站伴随窗口", order: 19, root: "vue-bili-companions-root", capabilities: ["ui:dock-companion"] }, Ih), Z(e, { id: "notifications", title: "通知中心", order: 20, root: "vue-notification-root", capabilities: ["ui:toast", "notification:dedupe"] }, zn), Z(e, { id: "profile-menu", title: "头像右键菜单", order: 21, root: "bili-profile-menu", capabilities: ["ui:profile-menu", "profile:actions"] }, dp, Fo), Z(e, { id: "workspace-launchers", title: "常用工作区启动项", order: 22, root: "workspace-launchers", capabilities: ["ui:workspace-launchers", "workspace:launch"] }, up, $i), Z(e, { id: "mac-dock", title: "底部快捷应用 Dock 栏", order: 23, root: "mac-dock", capabilities: ["ui:mac-dock", "dock:navigate"] }, Kn, pt), Z(e, { id: "hero-clock", title: "首屏中央时钟", order: 26, root: "hero-clock", capabilities: ["ui:hero-clock", "clock:read"] }, Fn), Z(e, { id: "search-box", title: "首屏搜索框", order: 27, root: "search", capabilities: ["ui:search-box", "search:actions"] }, hn), Z(e, { id: "home-music", title: "首屏音乐播放器", order: 28, root: "task-thread-home", capabilities: ["ui:home-music", "music:playback"] }, jn, et), Z(e, { id: "launcher-groups", title: "常用网站分组架", order: 29, root: "launcher-groups", capabilities: ["ui:launcher-groups", "launcher:navigate"] }, Vn, Ce), Z(e, { id: "weather-widget", title: "首屏天气小部件", order: 39, root: "weather-body", capabilities: ["ui:weather-widget", "weather:read"] }, Hn), Z(e, { id: "github-workspace", title: "GitHub 独立页 Vue 工作台", order: 49, root: "vue-github-workspace-root", capabilities: ["ui:github-workspace"] }, hh), Z(e, { id: "github-status", title: "GitHub 同步状态", order: 50, root: "vue-github-status-root", capabilities: ["ui:github-status", "github:sync-read"] }, mp, mn), Z(e, { id: "github-folders", title: "GitHub 文件夹导航", order: 55, root: "gh-folder-list", capabilities: ["ui:github-folders", "github:categorize-drop"] }, ca, wn), Z(e, { id: "github-hero", title: "GitHub 分类摘要", order: 56, root: "gh-hero", capabilities: ["ui:github-summary", "github:actions"] }, da, yn), Z(e, { id: "github-repositories", title: "GitHub 仓库列表", order: 57, root: "vue-github-repositories-root", capabilities: ["ui:github-repositories", "github:repository-actions", "github:paging"] }, th, wt), Z(e, { id: "github-batch-bar", title: "GitHub Star 批量操作工具栏", order: 58, root: "gh-batch-bar", capabilities: ["ui:github-batch-bar", "github:batch-actions"] }, ph, io), Z(e, { id: "tab-manager", spaOwned: !0, title: "独立标签页管理", order: 71, root: "vue-tab-manager-root", capabilities: ["ui:tab-manager", "tabs:explicit"] }, fh, En), Z(e, { id: "bookmark-menu", title: "书签上下文操作与备注菜单", order: 72, root: "vue-bookmark-menu-root", capabilities: ["ui:bookmark-menu", "bookmark:edit"] }, gh, Li), Z(e, { id: "launcher-dialogs", title: "快捷启动器管理弹窗族", order: 73, root: "vue-launcher-dialogs-root", capabilities: ["ui:launcher-dialogs", "launcher:manage"] }, wh, un), Z(e, { id: "launcher-folder-dialog", title: "大文件夹展开视窗", order: 74, root: "vue-launcher-folder-root", capabilities: ["ui:launcher-folder", "launcher:folder-dialog"] }, Ah, pn), Z(e, { id: "launcher-menus", title: "启动器快捷上下文菜单族", order: 76, root: "vue-launcher-menus-root", capabilities: ["ui:launcher-menus", "launcher:context-menu"] }, Eh, _i), Z(e, { id: "bookmark-panel", title: "浏览器书签侧边滑动视窗", order: 77, root: "vue-bookmark-panel-root", capabilities: ["ui:bookmark-panel", "bookmarks:panel"] }, mh, jo), Z(e, { id: "bookmark-folder-strip", spaOwned: !0, title: "顶栏书签快捷文件夹横条", order: 78, root: "vue-bookmark-folder-strip-root", capabilities: ["ui:bookmark-folder-strip", "bookmarks:strip"] }, null, bn), Z(e, { id: "settings-page", title: "独立设置页 Vue 工作台", order: 79, root: "vue-options-root", capabilities: ["ui:settings-page"] }, vh), Z(e, { id: "settings-dialog", title: "全局设置中心视窗", order: 80, root: "vue-settings-dialog-root", capabilities: ["ui:settings-dialog", "settings:manage"] }, yh, co), Z(e, { id: "clock-settings-menu", spaOwned: !0, title: "中央时钟偏好配置菜单", order: 82, root: "vue-clock-settings-root", capabilities: ["ui:clock-settings", "clock:preference-edit"] }, bh, Lt), Z(e, { id: "bili-theater-dialog", title: "Bilibili 沉浸剧场与评论区弹窗", order: 85, root: "vue-bili-theater-root", capabilities: ["ui:bili-theater", "bili:playback"] }, kh, no), Z(e, { id: "bili-mini-player", title: "Bilibili 悬浮迷你播放器", order: 85, root: "vue-bili-mini-player-root", capabilities: ["ui:bili-mini-player", "bili:playback"] }, _h), Z(e, { id: "ai-dialog", title: "AI 助手对话框与知识点抽屉", order: 86, root: "vue-ai-dialog-root", capabilities: ["ui:ai-dialog", "ai:chat"] }, Th, Mi), Z(e, { id: "aihot-viewer", spaOwned: !0, title: "AI HOT 资讯文章阅读器", order: 88, root: "vue-aihot-viewer-root", capabilities: ["ui:aihot-viewer", "viewer:aihot"] }, $h, Ti), Z(e, { id: "nav-wheel", title: "辐射状快捷动作轮盘与悬浮球", order: 95, root: "vue-nav-wheel-root", capabilities: ["ui:nav-wheel", "nav:radial-menu"] }, Mh, we), Z(e, { id: "bili-message-panel", spaOwned: !0, title: "Bilibili 消息与互动通知中心", order: 102, root: "vue-bili-message-panel-root", capabilities: ["ui:bili-message-panel", "bili:messages"] }, Ch, _t), Z(e, { id: "bili-favorites", spaOwned: !0, title: "b站插件 Vue 外壳", order: 110, root: "vue-bili-favorites-root", capabilities: ["ui:bili-favorites-shell", "bilibili:favorites"] }, xh, Cn), Z(e, { id: "aihot-feed", spaOwned: !0, title: "AI HOT 资讯流全功能聚合看板", order: 112, root: "vue-aihot-root", capabilities: ["ui:aihot-feed", "aihot:aggregate"] }, Lh, xn), Z(e, { id: "github-trending", spaOwned: !0, title: "GitHub 趋势榜与热门流", order: 114, root: "vue-github-trending-root", capabilities: ["ui:github-trending", "github:trending"] }, Sh, Ln);
}
ys();
vs();
const zo = va(Vo);
Ua(Vo, zo);
Ya(Vo);
Dh(zo);
vn.loadBookmarks();
(async () => {
  document.getElementById("vue-bili-favorites-root") && !document.getElementById("vue-spa-root") && await import("./bilibili-channel.service-DjZBb2vd.js"), await Ca(), await zo.startEager(), at.notifyBootReady();
})().catch((e) => console.error("[LogicWeaver] 页面启动失败", e));
window.addEventListener("pagehide", () => {
  zo.stopAll();
}, { once: !0 });
export {
  Ki as C,
  eu as D,
  cp as _,
  En as a,
  zi as b,
  Lt as c,
  sf as d,
  Mi as e,
  Pe as f,
  we as g,
  dp as h,
  be as i,
  an as j,
  $e as k,
  Bn as l,
  Vo as m,
  V as n,
  Eo as t,
  af as w
};
