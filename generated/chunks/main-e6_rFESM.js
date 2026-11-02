import { S as Mi, i as Ps } from "./SearchBox-DK6WgUav.js";
/* empty css                */
import { c as zn, r as be, a as $t, b as N, d as de, o as l, e as ce, w as no, u as s, f as d, g as n, h as M, T as Ws, t as v, F as G, i as fe, j as F, k as vt, l as Nt, m as Ne, v as Os, n as Fe, p as io, q as Di, s as Bs, x as ae, y as Ye, z as St, A as so, B as we, C as le, D as Ke, E as q, G as z, H as ht, I as ko, J as Ai, K as Xo, L as Re, M as lo, N as Ei, O as Rs } from "./vendor-vue-wIH4jcna.js";
import { W as Jo, t as Ut, p as pn, n as me, a as Do, b as Lt, h as Ue, m as pt, c as oi, d as Wn, s as fn, e as ni, f as Ns, g as Fs, i as Hs, j as js, k as U, l as Pi, o as po, q as Wi, r as xt, u as zs, v as co, w as Yt, x as Ao, y as Gs, z as Ks, A as Eo, B as Vs } from "./view-styles-hBvMpAue.js";
import { l as Us, r as Ys, G as qs, a as oe, b as sn, f as Zo, c as Gn, s as Xs, d as Js, e as Kn, g as Qo, h as Vn, i as Et, j as Lo, k as kt, m as $o, n as qt, o as De, p as Zs, q as et, t as it, u as _t, v as _o, R as Qs, w as er, x as Tt, y as At, z as Ce, A as tr, B as jt } from "./search.service-B8FaDQLd.js";
import { f as Xe, l as Ct, a as Te, p as or, b as So, c as oo, y as Oi, d as re, e as zt } from "./youtube-store-up9Cye8o.js";
import { c as nr, a as ir, t as sr, b as rr, d as ar, e as lr, f as Xt, g as cr } from "./calendar.service-_YumC_hP.js";
import { w as Me, s as Un, P as dr, i as en, D as gn, a as ii, g as Je, p as ur, L as pr, b as It, c as fr, d as hn, t as si, e as gr, f as hr, h as Mo, l as Bi } from "./window-manager.store-DgNn9Rtk.js";
import { s as rn, a as mr, b as vr, u as Ri } from "./InlineEditStatus.vue_vue_type_style_index_0_scoped_28642927_lang-BiNio4cP.js";
import { b as To, a as yr, c as wr } from "./up-group-manager-store-Be9_ub72.js";
import { biliMessagePanelController as Pt, biliMessagePanelState as br } from "./message-panel-store-DIQllwOR.js";
import { b as Ni, r as kr, a as fo } from "./bili-favorites-store-BKAFElCL.js";
import { a as Yn, b as Fi, c as _r } from "./aihot-feed-store-DYKldREI.js";
import { p as Hi } from "./pricing-store-7Kn4RVvy.js";
import { R as Cr } from "./read-session-DQk1qcgF.js";
import { f as Wt } from "./fullscreen-cards.store-llUoJxpf.js";
import { k as xr, m as Lr } from "./core-utils-Ccz-tarm.js";
import { _ as Ie } from "./_plugin-vue_export-helper-CHgC5LLL.js";
import { t as rt } from "./together-listen.store-C-rVQnIm.js";
import { C as $r } from "./ChatShareMenu-B4Z4XHMI.js";
const Sr = /^[a-z][a-z0-9]*(?:[.:-][a-z0-9]+)*$/;
function Tr() {
  const e = /* @__PURE__ */ new Map(), t = /* @__PURE__ */ new Map();
  function o(u) {
    if (!u || !Sr.test(u.id)) throw new TypeError(`Invalid command id: ${u?.id || ""}`);
    if (!u.title?.trim() || !u.category?.trim() || typeof u.run != "function")
      throw new TypeError(`Command ${u.id} requires title, category and run()`);
    if (e.has(u.id)) throw new Error(`Command already registered: ${u.id}`);
    return e.set(u.id, Object.freeze({
      ...u,
      description: u.description || "",
      keywords: Object.freeze([...u.keywords || []]),
      concurrency: u.concurrency || "replace"
    })), () => {
      i(u.id), e.delete(u.id);
    };
  }
  function i(u) {
    const x = t.get(u);
    return x ? (x.abort(), t.delete(u), !0) : !1;
  }
  async function r(u, x, k = "api") {
    const T = e.get(u);
    if (!T) throw new Error(`Unknown command: ${u}`);
    if (T.enabled && !T.enabled()) return;
    const g = T.concurrency || "replace";
    if (t.has(u)) {
      if (g === "drop") return;
      g === "replace" && i(u);
    }
    const p = new AbortController();
    g !== "parallel" && t.set(u, p);
    try {
      return await T.run(x, { signal: p.signal, source: k });
    } finally {
      t.get(u) === p && t.delete(u);
    }
  }
  function a(u) {
    return Object.freeze({
      id: u.id,
      title: u.title,
      category: u.category,
      description: u.description || "",
      keywords: Object.freeze([...u.keywords || []]),
      concurrency: u.concurrency || "replace",
      enabled: u.enabled ? !!u.enabled() : !0,
      running: t.has(u.id)
    });
  }
  function h() {
    return Object.freeze([...e.values()].map(a).sort((u, x) => u.category.localeCompare(x.category, "zh") || u.title.localeCompare(x.title, "zh")));
  }
  function f(u, x = 20) {
    const k = String(u || "").trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
    if (!k.length) return h().slice(0, x);
    const T = [...e.values()].map((g) => {
      const p = a(g), c = p.title.toLocaleLowerCase(), y = `${p.id} ${c} ${p.category} ${p.description} ${p.keywords.join(" ")}`.toLocaleLowerCase();
      if (!k.every((b) => y.includes(b))) return null;
      let $ = 0;
      for (const b of k)
        p.id === b ? $ += 200 : p.id.startsWith(b) && ($ += 120), c === b ? $ += 160 : c.startsWith(b) ? $ += 100 : c.includes(b) && ($ += 60), p.keywords.some((L) => L.toLocaleLowerCase().startsWith(b)) && ($ += 40);
      return { item: p, score: $ };
    }).filter((g) => !!g);
    return T.sort((g, p) => p.score - g.score || g.item.title.localeCompare(p.item.title, "zh")), Object.freeze(T.slice(0, Math.max(1, x)).map((g) => g.item));
  }
  return Object.freeze({ register: o, execute: r, cancel: i, has: (u) => e.has(u), list: h, search: f });
}
const an = Tr(), Ir = /^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/;
function Mr(e) {
  const t = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
  function a(g) {
    if (!g || !Ir.test(g.id)) throw new TypeError(`Invalid feature id: ${g?.id || ""}`);
    if (!g.title?.trim() || typeof g.mount != "function") throw new TypeError(`Feature ${g.id} requires title and mount()`);
    if (t.has(g.id)) throw new Error(`Feature already registered: ${g.id}`);
    return t.set(g.id, Object.freeze({
      ...g,
      order: Number(g.order) || 100,
      eager: g.eager === !0,
      roots: Object.freeze([...g.roots || []]),
      capabilities: Object.freeze([...g.capabilities || []])
    })), () => {
      u(g.id), r.delete(g.id), t.delete(g.id);
    };
  }
  function h(g) {
    return typeof g == "function" ? g : g && typeof g.unmount == "function" ? () => g.unmount() : () => {
    };
  }
  function f(g) {
    if (o.has(g)) return Promise.resolve(o.get(g)?.cleanup);
    if (i.has(g)) return i.get(g);
    const p = t.get(g);
    if (!p) return Promise.reject(new Error(`Unknown feature: ${g}`));
    r.delete(g);
    const c = new AbortController(), y = Object.freeze({
      signal: c.signal,
      commands: e,
      getRoot: (b) => document.getElementById(b)
    }), $ = Promise.resolve().then(() => p.mount(y)).then((b) => (i.delete(g), o.set(g, { cleanup: b, controller: c }), b), (b) => {
      throw i.delete(g), r.set(g, b), c.abort(), b;
    });
    return i.set(g, $), $;
  }
  async function u(g) {
    const p = i.get(g);
    if (p)
      try {
        await p;
      } catch {
        return;
      }
    const c = o.get(g);
    c && (o.delete(g), c.controller.abort(), await h(c.cleanup)());
  }
  async function x() {
    const g = typeof document < "u" && !!(document.getElementById("vue-spa-root") || document.getElementById("logicweaver-spa-root")), p = [...t.values()].filter(($) => !(!$.eager || !g && $.roots && $.roots.length > 0 && !$.roots.some((L) => !!document.getElementById(L)))).sort(($, b) => ($.order || 100) - (b.order || 100)), y = (await Promise.allSettled(p.map(($) => f($.id)))).flatMap(($, b) => $.status === "rejected" ? [{ id: p[b].id, reason: $.reason }] : []);
    y.length && console.warn("LogicWeaver Vue features failed to mount", y);
  }
  async function k() {
    const g = [...o.keys()].reverse();
    await Promise.allSettled(g.map(u));
  }
  function T() {
    return Object.freeze([...t.values()].map((g) => Object.freeze({
      id: g.id,
      title: g.title,
      order: g.order || 100,
      eager: g.eager === !0,
      roots: Object.freeze([...g.roots || []]),
      capabilities: Object.freeze([...g.capabilities || []]),
      status: i.has(g.id) ? "mounting" : o.has(g.id) ? "mounted" : r.has(g.id) ? "failed" : "registered",
      error: r.has(g.id) ? String(r.get(g.id)?.message || r.get(g.id) || "Feature mount failed") : ""
    })).sort((g, p) => g.order - p.order));
  }
  return Object.freeze({ register: a, start: f, startEager: x, stop: u, stopAll: k, has: (g) => t.has(g), list: T });
}
const Dr = localStorage.getItem("startupAnimationStyle") || localStorage.getItem("logicweaverStartupStyle") || "endfield", ri = (() => {
  try {
    const e = localStorage.getItem("showStartupAnimation"), t = localStorage.getItem("logicweaverEndfieldLoader"), o = e ?? t;
    return o === "1" || o === "true";
  } catch {
    return !1;
  }
})(), X = be({
  enabled: ri,
  style: Dr === "rhinelab" ? "rhinelab" : "endfield",
  renderedProgress: 4,
  targetProgress: 4,
  status: "CORE SHELL...",
  finished: !ri,
  exiting: !1,
  forced: !1
});
let ro = 0, tn = 4, ji = performance.now(), On = 0, zo = null, Bn = !1;
function zi(e) {
  const t = e - ji, o = On ? Math.min(1, t / On) : 1, i = o * o * (3 - 2 * o);
  X.renderedProgress = tn + (X.targetProgress - tn) * i, o < 1 && !X.finished ? ro = requestAnimationFrame(zi) : ro = 0;
}
function Go(e, t) {
  if (!X.enabled || X.finished) return;
  const o = Math.max(X.targetProgress, Math.max(4, Math.min(100, Number(e) || 4)));
  t && (X.status = t), tn = X.renderedProgress, X.targetProgress = o, ji = performance.now(), On = Math.max(280, Math.min(920, 220 + Math.abs(o - tn) * 7.5)), cancelAnimationFrame(ro), ro = requestAnimationFrame(zi);
}
function ln(e = "Ready", t = !1) {
  X.finished || (X.finished = !0, X.forced = t, X.status = e, X.targetProgress = 100, cancelAnimationFrame(ro), ro = 0, X.renderedProgress = 100, zo?.(t));
}
function Ar(e = "KEYBOARD SKIP") {
  ln(e, !0);
}
function Er() {
  X.enabled || ln("BOOT COMPLETE", !0);
}
function Gi() {
  !X.enabled || X.finished || Bn || (Bn = !0, Go(38, "INITIALIZING CORE SHELL..."), setTimeout(() => {
    X.finished || Go(76, "SYNTHESIZING RUNTIME...");
  }, 400), setTimeout(() => {
    X.finished || Go(100, X.style === "rhinelab" ? "ID CONFIRMED : JOYCE MOORE" : "TERRA LINK READY / 终端就绪");
  }, 900), setTimeout(() => {
    X.finished || ln("BOOT COMPLETE / 首页就绪", !1);
  }, 1650));
}
async function Pr() {
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
const tt = $t(X), lt = Object.freeze({
  update: Go,
  finish: ln,
  skip: Ar,
  notifyBootReady: Er,
  async playIntro(e) {
    if (e?.style && (X.style = e.style), typeof document < "u" && (document.documentElement.dataset.startupStyle = X.style, document.documentElement.classList.remove("skip-endfield-loader"), document.body.classList.add("is-starting")), X.enabled = !0, X.finished = !1, X.forced = !!e?.force, X.renderedProgress = 4, X.targetProgress = 4, Bn = !1, typeof document < "u") {
      let t = document.getElementById("endfield-loader");
      if (!t) {
        t = document.createElement("div"), t.id = "endfield-loader", t.className = "endfield-loader notranslate", document.body.appendChild(t);
        const { default: o } = await import("./IntroAnimation-B9h4UM3q.js"), i = zn(o), r = () => {
          window.removeEventListener("logicweaver:intro-complete", r), i.unmount(), t?.remove(), document.body.classList.remove("is-starting");
        };
        window.addEventListener("logicweaver:intro-complete", r, { once: !0 }), i.mount(t);
      }
    }
    Gi();
  },
  get enabled() {
    return X.enabled;
  },
  get finished() {
    return X.finished;
  }
});
function Wr(e) {
  return zo = e, X.finished && e(X.forced), () => {
    zo === e && (zo = null);
  };
}
const Ki = [
  { date: "今天", dayName: "周四", emoji: "🌤️", condition: "多云", highTemp: 26, lowTemp: 18, rainProb: 15 },
  { date: "明天", dayName: "周五", emoji: "⛅", condition: "阴天", highTemp: 24, lowTemp: 17, rainProb: 30 },
  { date: "后天", dayName: "周六", emoji: "🌧️", condition: "小雨", highTemp: 21, lowTemp: 16, rainProb: 75 },
  { date: "周日", dayName: "周日", emoji: "🌦️", condition: "阵雨", highTemp: 23, lowTemp: 15, rainProb: 45 },
  { date: "周一", dayName: "周一", emoji: "☀️", condition: "晴天", highTemp: 27, lowTemp: 18, rainProb: 10 },
  { date: "周二", dayName: "周二", emoji: "🌤️", condition: "多云", highTemp: 28, lowTemp: 19, rainProb: 15 },
  { date: "周三", dayName: "周三", emoji: "☀️", condition: "晴天", highTemp: 29, lowTemp: 20, rainProb: 5 }
], Vi = "lw_weather_snapshot_v1";
function Or() {
  if (typeof window > "u" || typeof localStorage > "u") return null;
  try {
    const e = localStorage.getItem(Vi);
    if (!e) return null;
    const t = JSON.parse(e);
    if (t && t.data && t.data.currentTemp !== void 0)
      return {
        state: "ready",
        city: t.city || t.data.cityName || "",
        data: t.data,
        forecastDays: Array.isArray(t.forecastDays) && t.forecastDays.length ? t.forecastDays : Ki,
        detailInfo: t.detailInfo || null,
        updatedAt: t.savedAt || Date.now()
      };
  } catch {
  }
  return null;
}
function Po(e) {
  if (!(typeof window > "u" || typeof localStorage > "u"))
    try {
      e.data && localStorage.setItem(
        Vi,
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
const Br = () => {
  const e = Or();
  return {
    state: e?.state || "loading",
    city: e?.city || "",
    errorMessage: "",
    data: e?.data || null,
    updatedAt: e?.updatedAt || null,
    forecastModalOpen: !1,
    forecastDays: e?.forecastDays || Ki,
    detailInfo: e?.detailInfo || {
      humidity: "62%",
      wind: "东北风 2级",
      uvIndex: "中等 (4)",
      airQuality: "优 (32)"
    }
  };
}, j = be(Br());
let mn = null, vn = null;
const nt = {
  get snapshot() {
    return $t(j);
  },
  update(e) {
    Object.assign(j, e), Po(j);
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
    }), Po(j);
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
    })) : [], Po(j);
  },
  setDetailInfo(e) {
    j.detailInfo = { ...e }, Po(j);
  },
  applyCity(e) {
    typeof window < "u" && window.dispatchEvent(new CustomEvent("logicweaver:weather-city-selected", { detail: { city: e } })), this.refresh();
  },
  refresh() {
    mn ? mn() : typeof window < "u" && window.dispatchEvent(new CustomEvent("logicweaver:weather-refresh"));
  },
  changeLocation(e) {
    vn ? vn(e) : typeof window < "u" && window.dispatchEvent(new CustomEvent("logicweaver:weather-change-location", { detail: { clientX: e?.clientX, clientY: e?.clientY } }));
  },
  setRefreshAction(e) {
    mn = e;
  },
  setChangeLocationAction(e) {
    vn = e;
  }
}, Rr = () => ({
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
}), ye = be(Rr());
let yn = null;
const Jt = {
  get snapshot() {
    return $t(ye);
  },
  update(e) {
    Object.assign(ye, e);
  },
  updateTime(e, t, o, i) {
    ye.timeText = e, ye.secsText = t, ye.greetingText = o, ye.dateText = i, ye.updatedAt = Date.now();
  },
  applyConfig(e) {
    e.fontFamily !== void 0 && (ye.fontFamily = e.fontFamily), e.colorHex !== void 0 && (ye.colorHex = e.colorHex), e.greetColor !== void 0 && (ye.greetColor = e.greetColor), e.dateColor !== void 0 && (ye.dateColor = e.dateColor), e.isBlack !== void 0 && (ye.isBlack = e.isBlack), e.isCustomColor !== void 0 && (ye.isCustomColor = e.isCustomColor), ye.updatedAt = Date.now();
  },
  openSettings(e) {
    yn ? yn(e) : window.dispatchEvent(new CustomEvent("logicweaver:clock-open-settings", { detail: { clientX: e?.clientX, clientY: e?.clientY } }));
  },
  setOpenSettingsAction(e) {
    yn = e;
  }
}, Nr = [
  { id: "ai", title: "AI 助手" },
  { id: "todoist", title: "Todoist" },
  { id: "stickers", title: "表情包" },
  { id: "calcom", title: "预约" },
  { id: "wallpaper", title: "壁纸库" }
], Fr = () => ({
  mounted: !1,
  visible: !1,
  items: [...Nr]
}), wn = be(Fr());
let Wo = {};
const qn = {
  getSnapshot() {
    return $t(wn);
  },
  update(e) {
    Object.assign(wn, e);
  },
  setMounted(e) {
    wn.mounted = e;
  },
  openWorkspace(e, t = !1) {
    if (Wo.open) {
      Wo.open(e);
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
    Wo = { ...Wo, ...e };
  }
}, bn = be({ visible: !1, pendingWrites: 0 });
async function Hr(e) {
  if (bn.pendingWrites) throw new Error("壁纸操作正在处理，未自动排队");
  bn.pendingWrites++;
  try {
    return await e();
  } finally {
    bn.pendingWrites--;
  }
}
const ai = {
  openDialog() {
    Me.open("wallpaper");
  },
  closeDialog() {
    Me.close("wallpaper");
  },
  resetDefault() {
    return Hr(() => Jo.clearWallpaper());
  }
}, li = [
  { id: "mono", label: "极简等宽", font: "ui-monospace, 'SF Mono', 'JetBrains Mono', Menlo, Consolas, monospace", sample: "15:50:10" },
  { id: "sans", label: "现代无衬线", font: "-apple-system, BlinkMacSystemFont, 'Segoe UI Variable Display', 'Segoe UI', Roboto, 'PingFang SC', sans-serif", sample: "15:50:10" },
  { id: "din", label: "经典几何", font: "'DIN Alternate', 'DIN Pro', 'Franklin Gothic Medium', Futura, sans-serif", sample: "15:50:10" },
  { id: "digital", label: "数码管等宽", font: "'Courier New', Courier, monospace", sample: "15:50:10" },
  { id: "impact", label: "硬派力量", font: "Impact, 'Arial Black', 'Trebuchet MS', sans-serif", sample: "15:50:10" },
  { id: "serif", label: "典雅衬线", font: "'Playfair Display', Georgia, 'Times New Roman', serif", sample: "15:50:10" },
  { id: "rounded", label: "圆润亲和", font: "'Quicksand', 'Comic Sans MS', 'Segoe UI', sans-serif", sample: "15:50:10" }
], ci = [
  { id: "white", label: "纯净皓白 (默认)", hex: "#ffffff" },
  { id: "black", label: "曜石极黑", hex: "#0f172a" },
  { id: "gold", label: "香槟金砂", hex: "#f59e0b" },
  { id: "cyan", label: "科技青蓝", hex: "#38bdf8" },
  { id: "emerald", label: "翡翠竹绿", hex: "#10b981" },
  { id: "rose", label: "淡雅樱粉", hex: "#fb7185" }
], _h = [
  { id: "local", label: "📍 本地系统时区", offset: "Local" },
  { id: "Asia/Shanghai", label: "🇨🇳 北京 / 香港", offset: "UTC+8" },
  { id: "Asia/Tokyo", label: "🇯🇵 东京 / 首尔", offset: "UTC+9" },
  { id: "Europe/London", label: "🇬🇧 伦敦 / 格林威治", offset: "UTC+0/+1" },
  { id: "Europe/Paris", label: "🇫🇷 巴黎 / 柏林", offset: "UTC+1/+2" },
  { id: "America/New_York", label: "🇺🇸 纽约 / 东部时间", offset: "UTC-5/-4" },
  { id: "America/Los_Angeles", label: "🇺🇸 洛杉矶 / 西部时间", offset: "UTC-8/-7" },
  { id: "Australia/Sydney", label: "🇦🇺 悉尼", offset: "UTC+10/+11" },
  { id: "UTC", label: "🌐 协调世界时 (UTC)", offset: "UTC" }
], xe = be({
  mounted: !1,
  isOpen: !1,
  x: 200,
  y: 200,
  font: "mono",
  color: "white",
  timezone: "local"
});
let kn = null;
const Ot = {
  state: xe,
  setMounted(e) {
    xe.mounted = e;
  },
  onAction(e) {
    kn = e;
  },
  dispatch(e, t) {
    if (kn)
      return kn(e, t);
  },
  open(e) {
    const i = typeof window < "u" ? window.innerWidth : 1280, r = typeof window < "u" ? window.innerHeight : 800, a = e?.clientX ?? e?.x ?? i / 2, h = e?.clientY ?? e?.y ?? r / 2, f = Math.max(12, Math.min(a - 40, i - 290 - 12)), u = Math.max(12, Math.min(h + 10, r - 420 - 12));
    xe.x = f, xe.y = u, xe.isOpen = !0, this.dispatch("open", { x: f, y: u });
  },
  close() {
    xe.isOpen = !1, this.dispatch("close");
  },
  setFont(e) {
    xe.font = e;
    const t = li.find((o) => o.id === e);
    if (t) {
      Jt.applyConfig({ fontFamily: t.font });
      try {
        localStorage.setItem("lw_clock_font", e);
      } catch {
      }
    }
    this.dispatch("change", { font: e, color: xe.color, timezone: xe.timezone });
  },
  setColor(e) {
    xe.color = e;
    const t = ci.find((o) => o.id === e);
    if (t) {
      Jt.applyConfig({
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
    this.dispatch("change", { font: xe.font, color: e, timezone: xe.timezone });
  },
  setTimezone(e) {
    xe.timezone = e;
    try {
      localStorage.setItem("lw_clock_tz", e);
    } catch {
    }
    this.dispatch("change", { font: xe.font, color: xe.color, timezone: e });
  },
  initPreferences() {
    try {
      const e = localStorage.getItem("lw_clock_font");
      if (e) {
        xe.font = e;
        const i = li.find((r) => r.id === e);
        i && Jt.applyConfig({ fontFamily: i.font });
      }
      const t = localStorage.getItem("lw_clock_color");
      if (t) {
        xe.color = t;
        const i = ci.find((r) => r.id === t);
        i && Jt.applyConfig({ colorHex: i.hex, greetColor: i.hex, dateColor: i.hex, isCustomColor: !0 });
      }
      const o = localStorage.getItem("lw_clock_tz");
      o && (xe.timezone = o);
    } catch {
    }
  },
  syncConfig(e) {
    e.font && (xe.font = e.font), e.color && (xe.color = e.color), e.timezone && (xe.timezone = e.timezone);
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
let _n = null, Ko = !1;
async function Vo(e, t = {}) {
  if (e === "poll") return { state: "ready", model: ue.model };
  if (e === "connect") return { state: "ready", model: ue.model };
  throw new Error("旧版 AI 对话桥接已退役，请使用「海狸聊天室」开启智能会话。");
}
function Ui(e) {
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
  o || (e.state === "connecting" ? o = "正在连接本机 Codex 与 ChatGPT…" : e.state === "disconnected" ? o = "已待命（打开面板自动连接）" : e.authenticated ? o = `就绪 · ChatGPT ${e.plan || "已登录"}` : e.state === "ready" ? o = "就绪 · 尚未登录 ChatGPT" : o = t[e.state] || e.state), ue.statusText = o, ue.authHidden = !e.loginUrl, ue.authCode = e.loginCode || "", ue.authLink = e.loginUrl || "https://auth.openai.com/codex/device", ue.isStreaming = Ko || e.busy || e.state === "running";
}
async function jr() {
  try {
    const e = await Vo("poll");
    Ui(e);
  } catch {
  }
}
async function zr(e, t) {
  if (e === "open" || e === "connect")
    try {
      ue.statusText = "正在连接本机 Codex 与 ChatGPT…";
      const o = await Vo("connect");
      Ui(o);
    } catch (o) {
      ue.statusText = o?.message || "连接失败";
    }
  else if (e === "send" && t?.text) {
    const o = t.text;
    ue.messages.push({
      id: `msg-${Date.now()}`,
      role: "user",
      content: o
    }), ue.inputText = "", ue.isStreaming = !0, Ko = !0;
    try {
      await Vo("send", { text: o }), await jr();
    } catch (i) {
      ue.statusText = i?.message || "发送失败";
    } finally {
      Ko = !1, ue.isStreaming = !1;
    }
  } else if (e === "stop") {
    try {
      await Vo("stop");
    } catch {
    }
    ue.isStreaming = !1, Ko = !1;
  }
}
const Xn = {
  state: ue,
  setMounted(e) {
    ue.mounted = e;
  },
  onAction(e) {
    _n = e;
  },
  dispatch(e, t) {
    if (_n)
      return _n(e, t);
    zr(e, t);
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
}, Cn = be({
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
}), Oo = /* @__PURE__ */ new Set(), Gr = {
  state: Cn,
  open(e) {
    Object.assign(Cn, e, { open: !0 });
  },
  update(e) {
    Object.assign(Cn, e);
  },
  close() {
    Oo.forEach((e) => e("close"));
  },
  save(e) {
    Oo.forEach((t) => t("save", e));
  },
  onAction(e) {
    return Oo.add(e), () => Oo.delete(e);
  }
}, Uo = be({ isOpen: !1 }), Yi = {
  state: Uo,
  open() {
    Uo.isOpen = !0;
  },
  close() {
    Uo.isOpen = !1;
  }
}, xn = "biliProfileCacheV1", dt = "biliLocallyKnownMessageIdsV1", Bo = "biliMessageUserCacheV1", go = "githubKnownReleaseVersionsV1", Ro = "customNewtabAvatar", di = "biliToastKnownCountsV1";
class Kr {
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
    !t?.repository || !t?.version || (this.githubKnownVersions[t.repository] = t.version, typeof chrome < "u" && chrome?.storage?.local && await chrome.storage.local.set({ [go]: this.githubKnownVersions }), this.notifyGitHubListeners());
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
      const a = Math.max(0, Number(this.unread?.[r] || 0));
      let h = Array.isArray(this.locallyKnownIds?.[r]) ? this.locallyKnownIds[r] : [];
      a < h.length && (h = [], this.locallyKnownIds[r] = [], o = !0), t[r] = Math.max(0, a - h.length);
    }), o && typeof chrome < "u" && chrome?.storage?.local && chrome.storage.local.set({ [dt]: this.locallyKnownIds }).catch(() => {
    }), t;
  }
  markKnown(t, o, i) {
    this.locallyKnownIds[t] || (this.locallyKnownIds[t] = []);
    let r = !1;
    o && !this.locallyKnownIds[t].includes(o) && (this.locallyKnownIds[t].push(o), r = !0), i && !this.locallyKnownIds[t].includes(i) && (this.locallyKnownIds[t].push(i), r = !0), r && typeof chrome < "u" && chrome?.storage?.local && chrome.storage.local.set({ [dt]: this.locallyKnownIds }).catch(() => {
    }), this.applyBiliProfile(this.profile, this.unread);
  }
  markAllKnown(t, o = []) {
    this.locallyKnownIds[t] || (this.locallyKnownIds[t] = []);
    const i = new Set(this.locallyKnownIds[t]);
    for (const a of o) a && i.add(a);
    const r = Math.max(0, Number(this.unread?.[t] || 0));
    if (i.size < r) {
      const a = r - i.size;
      for (let h = 0; h < a; h++) i.add(`__pad_${Date.now()}_${h}`);
    }
    this.locallyKnownIds[t] = Array.from(i), typeof chrome < "u" && chrome?.storage?.local && chrome.storage.local.set({ [dt]: this.locallyKnownIds }).catch(() => {
    }), this.applyBiliProfile(this.profile, this.unread);
  }
  applyBiliProfile(t, o = {}) {
    this.profile = t || null, this.unread = o || {};
    const r = this.customAvatar || String(t?.face || "assets/bilibili.svg").replace(/^http:/, "https:"), a = this.getVisibleUnread();
    if (Ut.avatarUrl = r, Ut.userName = t?.uname || "哔哩哔哩用户", Ut.buttonTitle = "通知中心", pn.avatarUrl = r, pn.userName = t?.uname || "用户", pn.mid = t?.mid, typeof document < "u") {
      const h = document.getElementById("bili-profile-avatar");
      h && (h.src = r);
      const f = document.getElementById("bili-profile-button");
      f && (f.title = Ut.buttonTitle);
    }
    Pt.updateState({
      userName: t?.uname || "哔哩哔哩用户",
      userMid: t?.mid ? String(t.mid) : "",
      userAvatar: r,
      unreadCounts: {
        reply: Number(a.reply || 0),
        at: Number(a.at || 0),
        like: Number(a.like || 0),
        system: Number(a.system || 0),
        private: Number(a.private || 0)
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
        }, [r, a, h] = await Promise.allSettled([
          fetch("https://api.bilibili.com/x/msgfeed/unread?build=0&mobi_app=web", { credentials: "include" }).then((p) => p.json()),
          fetch("https://api.vc.bilibili.com/x/im/web/msgfeed/unread", { credentials: "include" }).then((p) => p.json()),
          fetch("https://api.vc.bilibili.com/session_svr/v1/session_svr/single_unread", { credentials: "include" }).then((p) => p.json())
        ]), f = r.status === "fulfilled" ? r.value?.data || {} : {}, u = a.status === "fulfilled" ? a.value?.data || {} : {}, x = h.status === "fulfilled" ? h.value?.data || {} : {}, k = Number(u.at || 0), T = u.reply != null ? Number(u.reply || 0) : Math.max(0, Number(u.recv_reply || 0) - k), g = {
          reply: Math.max(Number(f.reply || 0), T),
          at: Math.max(Number(f.at || 0), k),
          like: Math.max(
            Number(f.like || f.praise || 0),
            Number(u.like || u.recv_like || 0)
          ),
          system: Math.max(Number(f.sys_msg || f.system || 0), Number(u.sys_msg || 0)),
          private: Number(
            f.chat || u.chat || Number(x.follow_unread || 0) + Number(x.unfollow_unread || 0) + Number(x.dustbin_push_msg || 0)
          )
        };
        this.applyBiliProfile(i, g), typeof chrome < "u" && chrome?.storage?.local && await chrome.storage.local.set({ [xn]: { profile: i, unread: g, savedAt: Date.now() } }), this.checkAndNotifyBiliInteractions(g);
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
      this.biliToastKnownCounts = { ...o }, typeof chrome < "u" && chrome?.storage?.local && chrome.storage.local.set({ [di]: this.biliToastKnownCounts }).catch(() => {
      });
      return;
    }
    const i = o.private - Number(this.biliToastKnownCounts.private || 0);
    o.like - Number(this.biliToastKnownCounts.like || 0);
    const r = o.reply - Number(this.biliToastKnownCounts.reply || 0), a = o.at - Number(this.biliToastKnownCounts.at || 0);
    o.system - Number(this.biliToastKnownCounts.system || 0), this.biliToastKnownCounts = { ...o }, typeof chrome < "u" && chrome?.storage?.local && chrome.storage.local.set({ [di]: this.biliToastKnownCounts }).catch(() => {
    }), i > 0 && me.show({
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
        Pt.openPanel();
      }
    }), r > 0 && me.show({
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
        Pt.openPanel();
      }
    }), a > 0 && me.show({
      appType: "bili",
      appName: "哔哩哔哩",
      icon: "assets/bilibili.svg",
      title: a > 1 ? `收到 ${a} 次新提及` : "有人 @了你",
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
    this.initialized || (this.initialized = !0, Do.setActions({
      onAction: async (t) => {
        if (t === "messages")
          Lt.open();
        else if (t === "tabs")
          Yi.open();
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
      xn,
      dt,
      Bo,
      go,
      Ro
    ]).then((t) => {
      this.customAvatar = t[Ro] || "", this.locallyKnownIds = t[dt] && typeof t[dt] == "object" ? t[dt] : {}, this.userCache = t[Bo] && typeof t[Bo] == "object" ? t[Bo] : {}, this.githubKnownVersions = t[go] && typeof t[go] == "object" ? t[go] : {};
      const o = t[xn];
      o?.profile ? this.applyBiliProfile(o.profile, o.unread || {}) : this.applyBiliProfile(null, {});
    }).catch(() => {
    }), chrome.storage.onChanged && chrome.storage.onChanged.addListener((t, o) => {
      o === "local" && (t[Ro] && (this.customAvatar = t[Ro].newValue || "", this.applyBiliProfile(this.profile, this.unread)), t[dt] && (this.locallyKnownIds = t[dt].newValue || {}, this.applyBiliProfile(this.profile, this.unread)));
    })), Pt.onAction((t, o) => {
      t === "mark-known" ? this.markKnown(o.kind, o.id, o.talkerId) : t === "mark-all-known" && this.markAllKnown(o.kind, o.ids);
    }), this.refreshBiliProfile(), setTimeout(() => {
      this.loadGitHubUpdates();
    }, 3500));
  }
}
const ui = new Kr(), pe = be({ open: !1, loading: !1, error: "", mid: "", name: "", face: "", sign: "", followed: !1, submitting: !1, left: 12, top: 12, videos: [] });
let No = null;
const Yo = {
  state: pe,
  open(e, t) {
    No = t, Object.assign(pe, { open: !0, loading: !0, error: "", submitting: !1, videos: [] }, e);
  },
  update(e) {
    Object.assign(pe, e);
  },
  close() {
    pe.submitting || (pe.open = !1, No = null);
  },
  async toggleFollow() {
    if (!(!No || pe.submitting)) {
      pe.submitting = !0;
      try {
        const e = !pe.followed;
        await No(e) && (pe.followed = e);
      } finally {
        pe.submitting = !1;
      }
    }
  }
}, ke = be({
  currentTab: "stars",
  rangeText: "近 7 天",
  sinceDays: 7,
  repos: [],
  isLoading: !1,
  errorMessage: "",
  sourceText: "",
  fetchedAt: 0,
  hasLoaded: !1
}), Ln = /* @__PURE__ */ new Set();
let bt;
const ho = new Cr();
let pi = !1;
async function Vr(e, t) {
  if (t.throwIfAborted(), new URL(e).origin !== "https://ghapi.h11.dev") throw new Error("Unexpected public source");
  const o = new AbortController(), i = () => o.abort();
  t.addEventListener("abort", i, { once: !0 });
  const r = setTimeout(i, 15e3);
  try {
    const a = await fetch(e, {
      signal: o.signal,
      credentials: "omit",
      redirect: "error",
      referrerPolicy: "no-referrer",
      cache: "no-store",
      headers: { Accept: "application/json" }
    });
    if (!a.ok)
      throw a.body?.cancel().catch(() => {
      }), new Error("Source unavailable");
    if (!a.body) throw new Error("Empty public source");
    const h = a.body.getReader(), f = new TextDecoder("utf-8", { fatal: !0 });
    let u = 0, x = "";
    try {
      for (; ; ) {
        o.signal.throwIfAborted();
        const k = await h.read();
        if (k.done) break;
        if (u += k.value.byteLength, u > 2 * 1024 * 1024) throw new Error("Public source exceeds limit");
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
function fi(e, t) {
  const o = e?.name || e?.repository, i = t ? e?.full_name || (typeof o == "string" && o.includes("/") ? o : e?.author && o ? `${e.author}/${o}` : "") : e?.full_name;
  if (typeof i != "string" || !/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(i) || i.split("/").some((f) => f === "." || f === "..")) throw new Error("Invalid repository");
  const [r, a] = i.split("/"), h = (f) => typeof f == "number" && Number.isFinite(f) && f >= 0 ? f : void 0;
  return {
    name: a,
    full_name: i,
    owner: { login: r },
    description: typeof e.description == "string" ? e.description : "",
    language: typeof e.language == "string" ? e.language : "",
    stargazers_count: h(t ? e.stars ?? e.stargazers_count : e.stargazers_count),
    forks_count: h(t ? e.forks ?? e.forks_count : e.forks_count),
    html_url: `https://github.com/${encodeURIComponent(r)}/${encodeURIComponent(a)}`
  };
}
async function Ur(e, t) {
  const o = new Date(Date.now() - e * 864e5).toISOString().slice(0, 10);
  let i = "";
  try {
    const h = await Us(t), { data: f } = await Ys(`/search/repositories?q=${encodeURIComponent(`is:public created:>${o}`)}&sort=stars&order=desc&per_page=30`, { headers: h, signal: t, maxBytes: 2 * 1024 * 1024 });
    if (t.throwIfAborted(), !Array.isArray(f?.items)) throw new Error("Invalid search response");
    return {
      repos: f.items.slice(0, 30).map((u) => fi(u, !1)),
      sourceText: `GitHub Search：UTC 日期 ${o} 之后新建的仓库，按累计 Star 排序；不是官方 Trending 榜。${f.incomplete_results ? " API 标记为不完整结果。" : ""}`
    };
  } catch (h) {
    t.throwIfAborted(), i = h instanceof qs ? h.message : "主源响应格式无效。";
  }
  const r = e === 1 ? "daily" : e === 7 ? "weekly" : "monthly", a = await Vr(`https://ghapi.h11.dev/repositories?since=${r}`, t);
  if (t.throwIfAborted(), !Array.isArray(a)) throw new Error("Invalid fallback response");
  return {
    repos: a.slice(0, 30).map((h) => fi(h, !0)),
    sourceText: `GitHub Search 不可用：${i} 改用第三方 ghapi.h11.dev 的 ${r} 趋势快照（不发送账号凭据）；口径与新建仓库搜索不同，源更新时间未提供。`
  };
}
const qi = {
  get state() {
    return ke;
  },
  // Only a mounted, visible View may own network work. Returning keeps the
  // previous result/error; an interrupted request requires explicit refresh.
  attachView(e) {
    ho.cancel(), ke.isLoading = !1, bt = e;
    const t = () => {
      bt === e && ho.pending && (ho.cancel(), ke.isLoading = !1, ke.errorMessage = "读取已暂停，返回后可点击刷新。");
    };
    return e.addEventListener("abort", t, { once: !0 }), !e.aborted && !pi && this.refresh(), () => {
      e.removeEventListener("abort", t), bt === e && (t(), bt = void 0);
    };
  },
  switchTab(e) {
    ke.currentTab = e, this.dispatch("switch-tab", e);
  },
  async switchRange(e, t) {
    !bt || bt.aborted || ![1, 7, 30].includes(e) || e === ke.sinceDays || (ho.cancel(), Object.assign(ke, {
      sinceDays: e,
      rangeText: `近 ${e} 天`,
      repos: [],
      sourceText: "",
      fetchedAt: 0,
      hasLoaded: !1,
      errorMessage: "",
      isLoading: !1
    }), this.dispatch("switch-range", { days: e, text: ke.rangeText }), await this.refresh());
  },
  async refresh() {
    const e = bt;
    if (!e || e.aborted || ke.isLoading) return;
    const t = ke.sinceDays, o = ho.begin({
      signal: e,
      timeoutMs: 45e3,
      isCurrent: () => bt === e && ke.sinceDays === t,
      onStop: (r) => {
        ke.isLoading = !1, r === "timeout" && (ke.errorMessage = "数据源读取超过整体45秒上限，请手动刷新；没有继续请求备用源。");
      }
    }), i = o.current;
    if (i()) {
      pi = !0, ke.isLoading = !0, ke.errorMessage = "";
      try {
        const r = await o.wait(() => Ur(t, o.signal));
        if (!i()) return;
        ke.repos = r.repos, ke.sourceText = r.sourceText, ke.fetchedAt = Date.now(), ke.hasLoaded = !0;
      } catch {
        i() && (ke.errorMessage = ke.hasLoaded ? "刷新失败，保留同一时间范围的上次读取结果；请检查网络或额度后手动刷新。" : "数据源读取失败或超时；未使用内置样例，请稍后手动刷新。");
      } finally {
        o.finish() && (ke.isLoading = !1, this.dispatch("refresh"));
      }
    }
  },
  selectRepo(e) {
    this.dispatch("select-repo", e);
  },
  onAction(e) {
    return Ln.add(e), () => {
      Ln.delete(e);
    };
  },
  dispatch(e, t) {
    for (const o of Ln)
      try {
        o(e, t);
      } catch {
      }
  }
}, Rn = () => ({
  icon: "🧭",
  title: "快捷轮盘",
  desc: "移动鼠标选择",
  active: !1
}), Jn = () => ({
  visible: !1,
  wedgePath: "",
  arcPath: "",
  line1: { x1: 0, y1: 0, x2: 0, y2: 0 },
  line2: { x1: 0, y1: 0, x2: 0, y2: 0 }
}), Z = be({
  mounted: !1,
  isOpen: !1,
  isExpanded: !1,
  mode: "main",
  ballPosition: { x: 0, y: 0 },
  hub: Rn(),
  activeSectorId: null,
  sectors: [],
  beam: Jn()
});
let gi = null;
function Yr(e, t) {
  if (typeof e != "number" || !t)
    return Jn();
  const o = 160, i = 160, r = 26, a = 154, h = 360 / t, f = e - h / 2, u = e + h / 2, x = f * Math.PI / 180, k = u * Math.PI / 180, T = o + r * Math.cos(x), g = i + r * Math.sin(x), p = o + a * Math.cos(x), c = i + a * Math.sin(x), y = o + r * Math.cos(k), $ = i + r * Math.sin(k), b = o + a * Math.cos(k), L = i + a * Math.sin(k), A = h > 180 ? 1 : 0, ee = `M ${T.toFixed(1)} ${g.toFixed(1)} L ${p.toFixed(1)} ${c.toFixed(1)} A ${a} ${a} 0 ${A} 1 ${b.toFixed(1)} ${L.toFixed(1)} L ${y.toFixed(1)} ${$.toFixed(1)} A ${r} ${r} 0 ${A} 0 ${T.toFixed(1)} ${g.toFixed(1)} Z`, ne = `M ${p.toFixed(1)} ${c.toFixed(1)} A ${a} ${a} 0 ${A} 1 ${b.toFixed(1)} ${L.toFixed(1)}`;
  return {
    visible: !0,
    wedgePath: ee,
    arcPath: ne,
    line1: {
      x1: parseFloat(T.toFixed(1)),
      y1: parseFloat(g.toFixed(1)),
      x2: parseFloat(p.toFixed(1)),
      y2: parseFloat(c.toFixed(1))
    },
    line2: {
      x1: parseFloat(y.toFixed(1)),
      y1: parseFloat($.toFixed(1)),
      x2: parseFloat(b.toFixed(1)),
      y2: parseFloat(L.toFixed(1))
    }
  };
}
const Le = {
  get state() {
    return Z;
  },
  getSnapshot() {
    return $t(Z);
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
    } : Z.hub = Rn();
  },
  setBeam(e, t) {
    Z.beam = Yr(e, t);
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
    Z.isExpanded = !1, Z.mode = "main", Z.activeSectorId = null, Z.beam = Jn(), Z.hub = Rn();
  },
  setWheelMode(e) {
    Z.mode = e;
  },
  setActionHandler(e) {
    gi = e;
  },
  dispatch(e, t) {
    gi?.(e, t);
  }
}, Xi = [
  { id: "daily-bilibili", title: "b站插件", desc: "B站收藏夹与追番视频", icon: "assets/bilibili.svg" },
  { id: "daily-pricing", title: "模型插件", desc: "AI 模型定价与排行榜", icon: "assets/nav-pricing.svg" },
  { id: "daily-aihot", title: "ai hot插件", desc: "全网 AI 与前沿科技资讯", icon: "assets/nav-aihot.svg" },
  { id: "folder", title: "常用网站", desc: "点击展开快捷网站子轮盘", icon: "assets/nav-folder.svg", mode: "shortcuts" },
  { id: "card-github", title: "github插件", desc: "GitHub 趋势与星标项目", icon: "assets/nav-github.svg" },
  { id: "launcher", title: "首页", desc: "返回主屏常用应用台", icon: "assets/nav-home.svg" }
];
function qr() {
  return Xi.filter((e) => e.mode || e.id === "launcher" || en(e.id));
}
function Xr() {
  return dr.filter((e) => e.kind === "module" && en(e.id)).map((e) => ({
    id: e.id,
    title: e.title,
    desc: e.isDev ? "已启用的实验性组件" : e.categoryLabel,
    icon: e.icon || e.emoji || "🧩",
    tool: e.id
  }));
}
function hi() {
  Z.isExpanded && ct();
}
let Ji = [], Io = Xi, ut = { x: 400, y: 300 }, Zi = !1, mo = !1, vo = null, st = !1;
const mt = be(/* @__PURE__ */ new Set()), ao = /* @__PURE__ */ new Map();
function Rt() {
  return globalThis.chrome?.storage;
}
function Qi(e, t) {
  const o = Z.isExpanded ? 160 : 24;
  Le.setBallPosition(
    Math.max(o + 8, Math.min(window.innerWidth - o - 8, e)),
    Math.max(o + 8, Math.min(window.innerHeight - o - 8, t))
  );
}
function ct() {
  const e = Z.mode;
  let t = [];
  e === "shortcuts" && (t = [...Ji], t.push({
    id: "toggle-edit-shortcuts",
    title: st ? "完成编辑" : "编辑网站",
    desc: st ? `已勾选 ${mt.size} 项，点击保存并退出` : "管理快捷网站与勾选收纳",
    icon: st ? "✅" : "✏️"
  })), Io = e === "tools" ? Xr() : e === "shortcuts" ? [
    ...t,
    { id: "back-to-main", title: "返回主轮盘", desc: "返回页面电梯导航", icon: "🔙", mode: "main" }
  ] : qr();
  const o = Io.length, i = o > 12 ? 118 : o > 9 ? 114 : 110, r = o > 12 ? 46 : o > 9 ? 50 : 56;
  Le.setSectors(Io.map((a, h) => {
    const f = -90 + 360 / o * h, u = f * Math.PI / 180;
    return {
      id: a.id,
      title: a.title,
      desc: a.desc,
      icon: a.icon,
      angleDeg: f,
      x: Math.round(160 + Math.cos(u) * i),
      y: Math.round(160 + Math.sin(u) * i),
      size: r,
      isShortcut: !!a.url
    };
  })), Le.setWheelMode(e), Le.setActiveSector(null), Le.setBeam(null, 0), Le.setHub(e === "shortcuts" ? st ? { icon: "✏️", title: "管理模式" } : { icon: "🔙", title: "快捷方式" } : e === "tools" ? { icon: "🧰", title: "常用工具" } : null);
}
function on(e) {
  Z.mode = e, ct();
}
function Bt() {
  Le.collapse(), Qi(Z.ballPosition.x, Z.ballPosition.y), Le.setVisibility(Zi);
}
function Vt(e = Z.ballPosition.x, t = Z.ballPosition.y, o = "main") {
  Le.expand(void 0, void 0, o), Qi(e, t), ct(), Le.setVisibility(!0);
}
function Jr(e) {
  if (e.id === "toggle-edit-shortcuts") {
    es();
    return;
  }
  if (st && e.url) {
    me.show({
      appName: "快捷轮盘",
      title: "编辑模式中",
      message: "请点击右上角 ✕ 移除，或点击桌面/文件夹网站进行勾选，完成后点击「完成编辑」",
      duration: 2500
    });
    return;
  }
  if (!(e.tool && !en(e.tool) || !e.url && !e.mode && e.id !== "launcher" && !en(e.id))) {
    if (e.mode) {
      on(e.mode);
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
    e.id === "launcher" ? (typeof window < "u" && window.scrollTo({ top: 0, left: 0, behavior: "instant" }), Wt.exit(), document.body && (document.body.dataset.page = "home")) : Wt.enter(e.id);
  }
}
function es() {
  st = !st, st ? (mt.clear(), ao.clear(), me.show({
    appName: "快捷轮盘",
    title: "进入网站管理模式",
    message: "可点击轮盘右上角 ✕ 移除，或点击桌面/文件夹网站进行勾选，完成后点击「完成编辑」",
    duration: 5e3
  }), ct()) : Zr();
}
async function Zr() {
  const e = Array.from(ao.values());
  if (mt.clear(), ao.clear(), e.length > 0)
    try {
      const t = await Rt()?.local?.get(["siteShelfLinks", "logicweaverNavWheelShortcutsV1"]), o = Array.isArray(t?.siteShelfLinks) ? t.siteShelfLinks : Array.isArray(t?.logicweaverNavWheelShortcutsV1) ? t.logicweaverNavWheelShortcutsV1 : [], i = new Set(o.map((a) => a.url)), r = e.filter((a) => !i.has(a.url)).map((a, h) => ({
        id: String(a.id || `wheel-${Date.now()}-${h}`),
        title: a.title || "快捷网站",
        url: a.url,
        icon: a.icon || "",
        customIcon: a.customIcon || ""
      }));
      if (r.length > 0) {
        const a = [...o, ...r];
        await Rt()?.local?.set({ siteShelfLinks: a, logicweaverNavWheelShortcutsV1: a }), await Ge.loadShortcuts(), me.show({
          appName: "快捷轮盘",
          title: "编辑已保存",
          message: `成功收纳 ${r.length} 个网站到快捷轮盘！`,
          duration: 3e3
        });
      } else
        me.show({
          appName: "快捷轮盘",
          title: "编辑完成",
          message: "所选网站已在快捷轮盘中",
          duration: 2500
        });
    } catch (t) {
      console.warn("[NavWheel] 批量保存快捷方式失败", t);
    }
  else
    me.show({
      appName: "快捷轮盘",
      title: "编辑完成",
      message: "快捷轮盘已保存",
      duration: 2e3
    });
  ct();
}
function Qr(e) {
  if (!st || !e || !e.url) return !1;
  const t = String(e.id || e.url);
  return mt.has(t) ? (mt.delete(t), ao.delete(t), me.show({
    appName: "快捷轮盘",
    title: "取消勾选",
    message: `已取消「${e.title || e.url}」`,
    duration: 1500
  })) : (mt.add(t), ao.set(t, e), me.show({
    appName: "快捷轮盘",
    title: "已勾选",
    message: `已勾选「${e.title || e.url}」（已选 ${mt.size} 个，点击「完成编辑」即可加入）`,
    duration: 2500
  })), ct(), !0;
}
async function ea(e) {
  try {
    const t = await Rt()?.local?.get(["siteShelfLinks", "logicweaverNavWheelShortcutsV1"]), o = Array.isArray(t?.siteShelfLinks) ? t.siteShelfLinks : Array.isArray(t?.logicweaverNavWheelShortcutsV1) ? t.logicweaverNavWheelShortcutsV1 : [], i = o.find((a) => String(a.id) === String(e)), r = o.filter((a) => String(a.id) !== String(e));
    await Rt()?.local?.set({ siteShelfLinks: r, logicweaverNavWheelShortcutsV1: r }), await Ge.loadShortcuts(), ct(), i && me.show({
      appName: "快捷轮盘",
      title: "已移除",
      message: `已从轮盘移除「${i.title || "快捷网站"}」`,
      duration: 2500
    });
  } catch (t) {
    console.warn("[NavWheel] 删除快捷方式失败", t);
  }
}
function mi(e) {
  ut = { x: e.clientX, y: e.clientY };
}
function vi(e) {
  e.button === 1 && (e.preventDefault(), e.stopPropagation(), ut = { x: e.clientX, y: e.clientY }, Z.isExpanded ? Bt() : Vt(e.clientX, e.clientY));
}
function yi(e) {
  e.button === 1 && e.preventDefault();
}
function wi(e) {
  if (e.key === "Escape") {
    if (st) {
      e.preventDefault(), e.stopPropagation(), st = !1, mt.clear(), ao.clear(), ct(), me.show({
        appName: "快捷轮盘",
        title: "已退出编辑模式",
        duration: 1500
      });
      return;
    }
    if (!Z.isExpanded || Un.active) return;
    e.preventDefault(), e.stopPropagation(), Z.mode === "shortcuts" ? on("main") : Bt();
  }
}
function ta(e) {
  try {
    const t = globalThis.chrome;
    if (typeof t?.runtime?.getURL == "function")
      return t.runtime.getURL("_favicon/?pageUrl=" + encodeURIComponent(e) + "&size=64");
  } catch {
  }
  return "";
}
function oa(e) {
  const t = e.customIcon || e.icon;
  if (t && typeof t == "string" && !/google\.com\/s2\/favicons|icons\.duckduckgo/i.test(t))
    return t;
  if (e.url) {
    const o = oe.getCachedIcon(e.url);
    if (o) return o;
    const i = ta(e.url);
    if (i) return i;
  }
  return e.icon || "🔗";
}
const Ge = {
  async start() {
    if (!mo) {
      mo = !0, ut = { x: Math.round(window.innerWidth / 2), y: Math.round(window.innerHeight / 2) }, Le.setActionHandler((e, t) => {
        if (e === "hub:click")
          Z.isExpanded ? Z.mode === "shortcuts" ? on("main") : Bt() : Vt();
        else if (e === "sector:click" || e === "container:click") {
          const o = Io.find((i) => i.id === t?.id || e === "container:click" && i.id === Z.activeSectorId);
          o && Jr(o);
        } else if (e === "sector:hover") {
          const o = Z.sectors.find((i) => i.id === t?.id);
          o && (Le.setHub({ icon: o.icon, title: o.title, desc: o.desc, active: !0 }), Le.setActiveSector(o.id), Le.setBeam(o.angleDeg, Io.length));
        } else e === "sector:leave" && (Le.setActiveSector(null), Le.setBeam(null, 0), Le.setHub(Z.mode === "shortcuts" ? { icon: "🔙", title: "快捷方式" } : Z.mode === "tools" ? { icon: "🧰", title: "常用工具" } : null));
      }), window.addEventListener("logicweaver:dock-modules-changed", hi), window.addEventListener("pointermove", mi, { passive: !0 }), window.addEventListener("mousedown", vi, !0), window.addEventListener("auxclick", yi, !0), window.addEventListener("keydown", wi, !0), vo = (e, t) => {
        t === "local" && (e.siteShelfLinks || e.logicweaverNavWheelShortcutsV1) && this.loadShortcuts();
      }, Rt()?.onChanged?.addListener(vo);
      try {
        if (!mo) return;
        Zi = !1, Le.setVisibility(!1);
      } catch {
      }
      await this.loadShortcuts(), ct();
    }
  },
  stop() {
    mo = !1, Le.setActionHandler(null), window.removeEventListener("logicweaver:dock-modules-changed", hi), window.removeEventListener("pointermove", mi), window.removeEventListener("mousedown", vi, !0), window.removeEventListener("auxclick", yi, !0), window.removeEventListener("keydown", wi, !0), vo && Rt()?.onChanged?.removeListener(vo), vo = null;
  },
  async loadShortcuts() {
    try {
      const e = await Rt()?.local?.get(["siteShelfLinks", "logicweaverNavWheelShortcutsV1"]);
      if (!mo) return;
      const t = e?.siteShelfLinks?.length ? e.siteShelfLinks : e?.logicweaverNavWheelShortcutsV1;
      Ji = (Array.isArray(t) ? t : []).map((o, i) => ({
        id: String(o.id || `wheel-${i}`),
        title: String(o.title || o.url || "快捷网站"),
        desc: String(o.url || ""),
        url: String(o.url || ""),
        icon: oa(o)
      })), Z.mode === "shortcuts" && ct();
    } catch (e) {
      console.warn("[NavWheel] 读取快捷方式失败", e);
    }
  },
  open(e, t) {
    Vt(e ?? ut.x, t ?? ut.y);
  },
  close: Bt,
  get isEditingShortcuts() {
    return st;
  },
  isLinkSelected(e) {
    return mt.has(e);
  },
  toggleEditingShortcuts: es,
  handleLinkSelection: Qr,
  removeShortcut: ea,
  toggle(e = !1) {
    Z.isExpanded ? Bt() : e ? Vt(ut.x, ut.y) : Vt();
  },
  toggleTools(e = !0) {
    Z.isExpanded && Z.mode === "tools" ? Bt() : Vt(
      e ? ut.x : Z.ballPosition.x,
      e ? ut.y : Z.ballPosition.y,
      "tools"
    );
  },
  setMode(e) {
    on(e);
  }
};
class Zt {
  constructor() {
    this.activeShortcuts = { ...gn }, this.isListenerBound = !1, this.storageListenerBound = !1, this.shortcutReadVersion = 0, this.initShortcuts();
  }
  static getInstance() {
    return Zt.instance || (Zt.instance = new Zt()), Zt.instance;
  }
  getShortcuts() {
    return { ...this.activeShortcuts };
  }
  async setShortcut(t, o) {
    if (typeof t != "string" || !t || typeof o != "string")
      throw new Error("快捷键参数无效，未保存");
    if (typeof chrome > "u" || !chrome.storage?.local)
      throw new Error("快捷键存储不可用，未保存");
    const { optionsService: i, SHORTCUT_STORAGE_KEY: r } = await import("./options.service-N98g5mDC.js").then((k) => k.g), h = (await chrome.storage.local.get(r))[r], f = { ...h || {}, [t]: o }, u = this.shortcutReadVersion, x = await i.saveSettings(
      { [r]: f },
      { [r]: h }
    );
    u === this.shortcutReadVersion && (++this.shortcutReadVersion, this.applyShortcutOverrides(x[r]));
  }
  applyShortcutOverrides(t) {
    const o = t && typeof t == "object" && !Array.isArray(t) ? Object.entries(t).filter((i) => Object.prototype.hasOwnProperty.call(gn, i[0]) && typeof i[1] == "string") : [];
    this.activeShortcuts = { ...gn, ...Object.fromEntries(o) };
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
    if (!t || !ii(t)) return !1;
    if (Je(t))
      return Me.handleToolClick(t), !0;
    switch (t) {
      case "bookmarks":
        return sn.toggle(), !0;
      case "settings":
        return rn.open(), !0;
      case "nav-wheel":
        return Ge.toggle(!0), !0;
      case "toolbox":
        return Ge.toggleTools(!0), !0;
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
        return typeof window < "u" && typeof window.triggerTodoistQuickAdd == "function" ? window.triggerTodoistQuickAdd() : Me.handleToolClick("todoist"), !0;
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
        if (Un.active || t.defaultPrevented || t.isComposing || t.repeat || t.target && (t.target.matches("input, textarea, select") || t.target.isContentEditable) && !t.altKey && !t.ctrlKey && !t.metaKey)
          return;
        const i = ur(t);
        if (!i) return;
        const r = i.toLowerCase();
        for (const [a, h] of Object.entries(this.activeShortcuts))
          if (!(!h || !ii(a)) && h.toLowerCase().replace(/^cmd\+/, "meta+") === r) {
            t.preventDefault(), t.stopPropagation(), this.triggerToolShortcut(a);
            break;
          }
      },
      !0
    ));
  }
}
const Nn = Zt.getInstance();
class Qt {
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
    return Qt.instance || (Qt.instance = new Qt()), Qt.instance;
  }
  get isVisible() {
    return $t(this._isVisible);
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
const na = Qt.getInstance(), $n = () => window;
let Mt = !1, yo, Sn, wo;
function bi(e) {
  return oe.getPageNames().filter((t) => t !== e).map((t) => ({ id: t, name: oe.getPageLabel(t) }));
}
function ki() {
  if (!Xe.isOpen || !Xe.activeFolder) return;
  const e = oe.getState(), t = Xe.activeFolder;
  Ct.setLinks(e.links.filter((a) => (a.group || "常用网站") === t));
  const o = /* @__PURE__ */ new Map();
  for (const a of e.links) {
    const h = a.group || "常用网站";
    o.has(h) || o.set(h, []), o.get(h).push(a);
  }
  const i = new Map(Object.keys(e.folders).map((a) => [a, Zo(e.folders, a)])), r = /* @__PURE__ */ new Map();
  for (const a of i.values()) a && r.set(a, (r.get(a) || 0) + 1);
  Ct.setFolders([...i].filter(([, a]) => a === t).map(([a]) => ({
    groupName: a,
    links: o.get(a) || [],
    count: (o.get(a)?.length || 0) + (r.get(a) || 0)
  })), Zo(e.folders, t));
}
const Fn = {
  openEditor(e) {
    So.openEditDialog(e || {});
  },
  openFolder(e = Xe.activeFolder) {
    if (!e) return;
    const o = oe.getState().links.filter((i) => (i.group || "常用网站") === e);
    Ct.openFolder(e, o), ki();
  },
  openLinkMenu(e, t) {
    t?.preventDefault?.(), oo.openLinkMenu(e, bi(e.page || "常用网站"), t?.clientX || 0, t?.clientY || 0);
  },
  openFolderMenu(e, t, o) {
    t?.preventDefault?.();
    const i = oe.getState(), r = o || i.activePage;
    oo.openFolderMenu(
      e,
      oe.getGroupSize(e) === "small" ? "扩大为大收藏夹" : "缩小为小收藏夹",
      bi(r),
      t?.clientX || 0,
      t?.clientY || 0
    );
  },
  openPageMenu(e, t) {
    t?.preventDefault?.(), oo.openPageMenu(
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
    So.openIconPicker(e.title || "网站", t, e.url, String(e.id)), So.searchIcons(t);
  },
  render() {
    const e = oe.getState(), t = oe.getPageNames();
    Te.update({
      ...e,
      pages: t,
      activePage: t.includes(e.activePage) ? e.activePage : t[0]
    }), ki();
  },
  start() {
    Mt || (Mt = !0, Te.setActions({
      openFolder: (e) => this.openFolder(e),
      deleteFolder: or,
      openLinkMenu: (e, t) => this.openLinkMenu(e, t),
      openFolderMenu: (e, t, o) => this.openFolderMenu(e, o, t),
      openPageMenu: (e, t) => this.openPageMenu(e, t)
    }), Ct.setActionHandler((e, t) => {
      e === "close" ? Ct.closeFolder() : e === "folder:open" && typeof t == "string" ? this.openFolder(t) : e === "link:contextmenu" && t?.link && this.openLinkMenu(t.link, t);
    }), Sn = oe.subscribe(() => {
      this.render();
    }), wo = (e, t) => {
      if (t !== "local") return;
      const o = {
        quickLinks: "links",
        quickLinkGroupSizes: "groupSizes",
        launcherFolders: "folders",
        launcherPages: "pages",
        launcherPageLabels: "pageLabels",
        launcherActivePage: "activePage"
      }, i = {};
      for (const [r, a] of Object.entries(o)) {
        if (!(r in e)) continue;
        const h = e[r].newValue;
        i[a] = a === "links" ? Array.isArray(h) ? h : [] : a === "pages" ? Array.isArray(h) && h.length ? h : ["常用网站"] : a === "activePage" ? h || "常用网站" : h || {};
      }
      Object.keys(i).length && (oe.updateState(i), this.render());
    }, $n().chrome?.storage?.onChanged?.addListener(wo));
  },
  init() {
    return this.start(), yo || (yo = (async () => {
      await oe.ready;
      const e = $n().chrome;
      if (!Mt) return;
      const t = await e?.storage?.local?.get("quickLinksReady") || {};
      if (Mt) {
        if (!oe.getState().links.length && !t.quickLinksReady && e?.topSites) {
          const o = await new Promise((i) => e.topSites.get((r) => i(r || [])));
          if (!Mt) return;
          oe.getState().links.length || (oe.updateState({ links: o.slice(0, 14).map((i) => ({
            id: crypto.randomUUID(),
            title: i.title || oe.hostOf(i.url),
            url: i.url,
            group: "常用网站"
          })) }), await oe.save());
        }
        Mt && this.render();
      }
    })().catch((e) => {
      throw yo = void 0, e;
    }), yo);
  },
  stop() {
    Mt = !1, Sn?.(), Sn = void 0, wo && $n().chrome?.storage?.onChanged?.removeListener(wo), wo = void 0, Ct.setActionHandler(null), Te.setActions({
      openFolder: void 0,
      deleteFolder: void 0,
      openLinkMenu: void 0,
      openFolderMenu: void 0,
      openPageMenu: void 0
    });
  }
}, _i = [
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
function Fo(e) {
  return e === 0 ? { emoji: "☀️", label: "晴" } : e <= 2 ? { emoji: "🌤️", label: "少云" } : e === 3 ? { emoji: "☁️", label: "多云" } : e === 45 || e === 48 ? { emoji: "🌫️", label: "雾" } : e >= 51 && e <= 57 ? { emoji: "🌦️", label: "毛毛雨" } : e >= 61 && e <= 67 ? { emoji: "🌧️", label: "雨" } : e >= 71 && e <= 77 ? { emoji: "🌨️", label: "雪" } : e >= 80 && e <= 82 ? { emoji: "🌧️", label: "阵雨" } : e >= 85 && e <= 86 ? { emoji: "🌨️", label: "阵雪" } : e >= 95 ? { emoji: "⛈️", label: "雷雨" } : { emoji: "🌡️", label: "—" };
}
class eo {
  constructor() {
    this.currentCity = "武汉", this.isRefreshing = !1, this.activeRequestId = 0, this.initStorage();
  }
  static getInstance() {
    return eo.instance || (eo.instance = new eo()), eo.instance;
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
    if (!i) return _i.slice(0, o);
    const r = [];
    for (const a of _i) {
      const h = a.name.toLowerCase(), f = a.pinyin.toLowerCase(), u = a.admin.toLowerCase();
      if ((h.startsWith(i) || f.startsWith(i) || h.includes(i) || f.includes(i) || u.includes(i)) && r.push(a), r.length >= o) break;
    }
    return r;
  }
  async loadWeather(t) {
    const o = (t || this.currentCity || "").trim();
    if (!o) {
      nt.unconfigured();
      return;
    }
    if (this.isRefreshing) return;
    this.isRefreshing = !0;
    const i = ++this.activeRequestId;
    nt.loading(o);
    try {
      const r = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(o)}&count=1&language=zh&format=json`, a = await fetch(r);
      if (i !== this.activeRequestId || j.state === "unconfigured") {
        this.isRefreshing = !1;
        return;
      }
      const f = (await a.json()).results?.[0];
      if (!f) {
        i === this.activeRequestId && j.state !== "unconfigured" && nt.notFound(o), this.isRefreshing = !1;
        return;
      }
      const u = `https://api.open-meteo.com/v1/forecast?latitude=${f.latitude}&longitude=${f.longitude}&current=temperature_2m,weather_code,relative_humidity_2m,wind_speed_10m&hourly=temperature_2m,weather_code,precipitation_probability&daily=temperature_2m_max,temperature_2m_min,weather_code,precipitation_probability_max&forecast_days=7&timezone=auto`, x = await fetch(u);
      if (i !== this.activeRequestId || j.state === "unconfigured") {
        this.isRefreshing = !1;
        return;
      }
      const k = await x.json(), T = Fo(k.current?.weather_code ?? 0), g = Math.round(k.current?.temperature_2m ?? 0), p = k.hourly?.time || [], c = Date.now();
      let y = p.findIndex((w) => new Date(w).getTime() >= c);
      y < 0 && (y = 0);
      const $ = [];
      for (let w = y; w < Math.min(y + 5, p.length); w++) {
        const _ = w === y ? "现在" : new Date(p[w]).getHours() + "时", D = Fo(k.hourly.weather_code[w]), Y = Math.round(k.hourly.temperature_2m[w]);
        $.push({ time: _, emoji: D.emoji, temp: Y });
      }
      let b = "未来 12 小时暂无降水 ☂️";
      for (let w = y; w < Math.min(y + 12, p.length); w++) {
        const _ = k.hourly.weather_code[w], D = k.hourly.precipitation_probability?.[w] || 0;
        if (_ >= 51 || D >= 60) {
          const Y = new Date(p[w]).getHours(), W = _ >= 71 && _ <= 77 || _ === 85 || _ === 86;
          b = `预计 ${Y}:00 ${W ? "有雪" : "有雨"}${D ? `（${D}%）` : ""} 🌧️`;
          break;
        }
      }
      const L = ["今天", "明天", "后天"], A = [], ee = k.daily?.time?.length || 0;
      for (let w = 1; w < Math.min(3, ee); w++) {
        const _ = L[w] || `+${w}天`, D = Fo(k.daily.weather_code[w]), Y = `${Math.round(k.daily.temperature_2m_max[w])}°/${Math.round(k.daily.temperature_2m_min[w])}°`;
        A.push({ label: _, emoji: D.emoji, tempRange: Y });
      }
      const ne = `${T.label} · 最高 ${Math.round(k.daily?.temperature_2m_max?.[0] ?? g)}° / 最低 ${Math.round(k.daily?.temperature_2m_min?.[0] ?? g)}°`, E = {
        cityName: f.name || o,
        currentEmoji: T.emoji,
        currentTemp: g,
        subText: ne,
        rainText: b,
        hours: $,
        days: A
      };
      if (i === this.activeRequestId && j.state !== "unconfigured") {
        if (nt.ready(E, o), k.daily?.time) {
          const _ = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"], D = [];
          for (let Y = 0; Y < k.daily.time.length; Y++) {
            const W = new Date(k.daily.time[Y]), H = Y === 0 ? "今天" : Y === 1 ? "明天" : Y === 2 ? "后天" : _[W.getDay()], P = Fo(k.daily.weather_code[Y]);
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
          nt.setForecastDays(D);
        }
        const w = {
          humidity: k.current?.relative_humidity_2m ? `${k.current.relative_humidity_2m}%` : "60%",
          wind: k.current?.wind_speed_10m ? `${Math.round(k.current.wind_speed_10m)} km/h` : "微风",
          uvIndex: "正常",
          airQuality: "优良"
        };
        nt.setDetailInfo(w);
      }
    } catch (r) {
      i === this.activeRequestId && j.state !== "unconfigured" && nt.error(r?.message || "天气加载失败，右键此处可重新选择地点。", o);
    } finally {
      i === this.activeRequestId && (this.isRefreshing = !1);
    }
  }
}
const Co = eo.getInstance();
function ia(e, t) {
  window.LogicWeaverIntro = lt, window.LogicWeaverStartupIntro = lt, window.LogicWeaverNotifications = me, window.LogicWeaverWindowManager = Me, window.LogicWeaverWindowTabs = Me, window.LogicWeaverDomFreezer = pr, window.LogicWeaverWallpaperService = Jo, window.LogicWeaverLauncherService = oe, window.LogicWeaverLauncherRuntime = Fn, window.LogicWeaverProfileService = ui;
  try {
    ui.init();
  } catch (o) {
    console.error("[ProfileService] init failed:", o);
  }
  window.LogicWeaverBookmarksService = Gn, window.LogicWeaverCalendarService = nr, window.LogicWeaverWeather = nt, window.LogicWeaverWeatherService = Co, window.LogicWeaverClock = Jt, window.LogicWeaverSearch = Xs, window.LogicWeaverSearchService = Js, Object.defineProperty(window, "LogicWeaverAiHotService", {
    configurable: !0,
    get: () => {
      import("./aihot.service-l4gGelhr.js").then(({ aiHotService: o }) => {
        window.LogicWeaverAiHotService = o;
      });
    }
  }), window.LogicWeaverHomeMusic = Ue, window.LogicWeaverLauncherGroups = Te, window.LogicWeaverProfileMenu = Do, window.LogicWeaverWorkspaceLaunchers = qn, window.LogicWeaverMacDock = pt, window.LogicWeaverFullscreen = Wt, window.enterFullscreenCard = (o) => Wt.enter(o), window.exitFullscreenCard = () => Wt.exit(), window.cycleFullscreenCard = () => Wt.cycle(), window.LogicWeaverPageVisibility = na, window.LogicWeaverBackgroundLibrary = ai, window.LogicWeaverNotificationCenter = Lt, window.LogicWeaverBookmarkMenu = Kn, window.LogicWeaverBookmarkPanel = sn, window.LogicWeaverBookmarkFolderStrip = Qo, window.LogicWeaverLauncherDialogs = So, window.LogicWeaverLauncherFolder = Ct, window.LogicWeaverLauncherMenus = oo, window.LogicWeaverSettings = rn, window.LogicWeaverClockSettings = Ot, window.LogicWeaverBiliTheater = To, window.LogicWeaverBilibiliService = oi, window.getBiliJct = () => oi.getBiliJct(), window.LogicWeaverBiliMiniPlayer = Wn, window.openBiliMiniPlayer = (o) => Wn.openVideo(o), window.LogicWeaverAiDialog = Xn, window.LogicWeaverAihotViewer = Yn, window.LogicWeaverNavWheel = Le, window.openNavWheel = (o, i) => Ge.open(o, i), window.closeNavWheel = () => Ge.close(), window.toggleNavWheel = (o) => Ge.toggle(o), window.toggleToolWheel = (o) => Ge.toggleTools(o), window.setNavWheelMode = (o) => Ge.setMode(o), window.LogicWeaverShortcuts = Nn, window.triggerToolShortcut = (o) => Nn.triggerToolShortcut(o), window.LogicWeaverCommands = e, window.LogicWeaverFeatures = t, window.LogicWeaverCalendarView = ir, window.LogicWeaverGitHubStatus = Vn, window.LogicWeaverGitHubFolders = Et, window.LogicWeaverGitHubHero = Lo, window.LogicWeaverGitHubRepositories = kt, window.LogicWeaverGitHubBatchBar = $o, window.LogicWeaverTodoistLabels = sr, window.LogicWeaverTodoistWorkspace = rr, window.LogicWeaverTodoistCalendarSidebar = ar, window.LogicWeaverTodoistTaskList = lr, window.LogicWeaverBiliMessagePanel = Pt, window.LogicWeaverStickerBoard = mr, window.LogicWeaverStickersService = vr, window.LogicWeaverPricing = Hi, window.LogicWeaverBiliFavorites = Ni, window.LogicWeaverBiliRadioTape = kr, window.LogicWeaverBiliOrganizerDialogs = yr, window.LogicWeaverBiliUpGroupManager = wr, window.LogicWeaverBiliUpPreview = Yo, window.LogicWeaverYouTube = Oi, window.LogicWeaverAihotFeed = Fi, window.LogicWeaverGitHubTrending = qi, window.LogicWeaverCalendarWorkspace = Xt, window.LogicWeaverCalendar = Xt, window.LogicWeaverTodoistMainWorkspace = cr, window.LogicWeaverTodoistTaskDetail = Gr, window.openBiliTheater = (o) => To.openVideo(o), window.closeBiliTheater = () => To.close(), window.showWindowsToast = (o) => {
    if (!o) return null;
    const i = fn(o.target) || ni(o.url) || (o.appType === "bili" ? Ns([o.title, o.subtitle, o.message].filter((r) => typeof r == "string").join(" ")) : void 0);
    return me.show({
      ...o,
      target: i,
      onClick: () => {
        if (typeof o?.onClick == "function") return o.onClick();
        if (i) return Lt.openTarget(i);
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
    const a = typeof i == "object" && i ? i : r, h = typeof i == "number" ? i : 3200, f = a.isError || /失败|错误|异常|未获取|未找到/i.test(o), u = a.title || (f ? "B站操作未完成" : "哔哩哔哩"), x = a.subtitle || (o.length > 36 ? "" : o), k = a.message || (a.subtitle || o.length > 36 ? o : ""), T = {
      id: a.id || `bili_toast_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      appType: "bili",
      appName: "哔哩哔哩",
      icon: "assets/bilibili.svg",
      title: u,
      subtitle: x || o,
      message: k && k !== x ? k : "",
      showActions: !!(a.showActions || a.actionLabel),
      actionLabel: a.actionLabel || "",
      onClick: a.onClick || null,
      target: fn(a.target) || ni(a.url) || fn({ type: "bili-video", bvid: a.bvid, aid: a.aid ? String(a.aid) : void 0 }),
      url: a.url,
      duration: Math.max(3e3, h)
    };
    return window.showWindowsToast(T);
  }, window.showFetchToast = (o, i, r = "", a = "assets/logo.png", h = 3200) => window.showWindowsToast({
    appName: o,
    title: i,
    subtitle: r,
    icon: a || "assets/logo.png",
    duration: h,
    showActions: !1,
    actionLabel: "",
    appType: "fetch"
  }), window.LogicWeaverKineticDrag = xr, window.LogicWeaverMarkdownAst = Lr, window.setLauncherBackground = (o) => Jo.setWallpaper(o), window.backgroundDbClear = (o) => Fs(o), window.openBackgroundHistory = () => ai.openDialog();
}
const Pe = be({
  isOpen: !1,
  query: "",
  selectedIndex: 0
});
let Ho = null;
const ts = {
  get state() {
    return Pe;
  },
  open() {
    Pe.isOpen || (Pe.isOpen = !0, Pe.query = "", Pe.selectedIndex = 0, Ho = Me.pushModalCloser(() => (this.close(), !0)));
  },
  close() {
    Pe.isOpen && (Pe.isOpen = !1, Pe.query = "", Pe.selectedIndex = 0, Ho && (Ho(), Ho = null));
  },
  toggle() {
    Pe.isOpen ? this.close() : this.open();
  },
  setQuery(e) {
    Pe.query = e, Pe.selectedIndex = 0;
  },
  selectNext(e) {
    e <= 0 || (Pe.selectedIndex = (Pe.selectedIndex + 1) % e);
  },
  selectPrev(e) {
    e <= 0 || (Pe.selectedIndex = (Pe.selectedIndex - 1 + e) % e);
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
  if (Un.active || e.defaultPrevented || e.isComposing || e.repeat) return;
  const t = (e.key || "").toLowerCase(), o = (e.ctrlKey || e.metaKey) && t === "k", i = e.altKey && (e.code === "Space" || t === " ");
  (o || i) && (e.preventDefault(), e.stopPropagation(), ts.toggle());
}, !0);
function sa(e) {
  e.register({
    id: "palette.toggle",
    title: "打开全局命令中心 (Spotlight)",
    category: "界面",
    keywords: ["命令", "palette", "spotlight", "raycast", "搜索", "cmd"],
    concurrency: "drop",
    run: () => ts.toggle()
  }), e.register({
    id: "intro.skip",
    title: "跳过开屏动画",
    category: "界面",
    keywords: ["开屏", "启动", "skip"],
    concurrency: "drop",
    enabled: () => lt.enabled && !lt.finished,
    run: () => lt.skip("COMMAND SKIP")
  }), e.register({
    id: "notifications.clear",
    title: "关闭当前 Toast",
    category: "通知",
    keywords: ["toast", "关闭"],
    description: "只关闭浮动提示，不删除通知中心历史",
    concurrency: "drop",
    enabled: () => me.size > 0,
    run: () => me.clear()
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
    enabled: () => Xt.ready,
    run: () => Xt.refresh()
  }), e.register({
    id: "calendar.today",
    title: "日历跳转到今天",
    category: "日历",
    keywords: ["今日", "today", "日期"],
    concurrency: "drop",
    enabled: () => Xt.ready,
    run: () => Xt.goToday()
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
const ra = {
  key: 0,
  id: "guest-preview-banner",
  class: "guest-preview-banner",
  role: "alert",
  "aria-label": "新用户开箱视角预览提示"
}, aa = /* @__PURE__ */ de({
  __name: "GuestPreviewBanner",
  setup(e) {
    function t() {
      js.exit();
    }
    return (o, i) => (l(), ce(Ws, { name: "guest-banner-slide" }, {
      default: no(() => [
        s(Hs) ? (l(), d("aside", ra, [
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
}), la = /* @__PURE__ */ Ie(aa, [["__scopeId", "data-v-a2f2ca5f"]]), ca = ["hidden"], da = {
  key: 0,
  class: "bookmark-folder-strip-empty"
}, ua = ["title", "data-bookmark-folder-id", "onClick", "onContextmenu"], pa = /* @__PURE__ */ de({
  __name: "BookmarkFolderStrip",
  setup(e) {
    const t = N(null);
    function o(a) {
      const h = t.value;
      !h || h.scrollWidth <= h.clientWidth || !a.deltaY || (a.preventDefault(), h.scrollLeft += a.deltaY);
    }
    function i(a) {
      Qo.openFolder(a.id);
    }
    function r(a, h) {
      Qo.openContextMenu(h, a.clientX, a.clientY);
    }
    return (a, h) => (l(), d("nav", {
      id: "bookmark-folder-strip",
      ref_key: "stripRef",
      ref: t,
      class: "bookmark-folder-strip",
      "aria-label": "书签栏文件夹",
      hidden: !s(qt).enabled,
      onWheel: o
    }, [
      s(qt).folders.length ? M("", !0) : (l(), d("span", da, v(s(qt).emptyMessage || "书签栏没有文件夹"), 1)),
      (l(!0), d(G, null, fe(s(qt).folders, (f) => (l(), d("button", {
        key: f.id,
        class: "bookmark-folder-chip",
        type: "button",
        title: `打开书签文件夹：${f.title || "未命名"}`,
        "data-bookmark-folder-id": f.id,
        onClick: (u) => i(f),
        onContextmenu: F((u) => r(u, f), ["prevent"])
      }, [
        h[0] || (h[0] = n("span", { "aria-hidden": "true" }, "📁", -1)),
        n("span", null, v(f.title || "未命名"), 1)
      ], 40, ua))), 128))
    ], 40, ca));
  }
}), fa = /* @__PURE__ */ Ie(pa, [["__scopeId", "data-v-5e71cc7c"]]), ga = { class: "cube-manager-body" }, ha = ["disabled", "onClick"], ma = ["disabled", "onClick"], va = ["onClick"], ya = ["onClick"], wa = ["onClick"], ba = ["type", "placeholder"], ka = {
  key: 0,
  role: "alert"
}, _a = /* @__PURE__ */ de({
  __name: "CubeConfigDialog",
  setup(e) {
    const t = De.state, o = ae(() => De.getActiveFaces()), i = ae(() => t.registeredFaces.filter((g) => !t.activeFaceIds.includes(g.id))), r = N(""), a = N("memo"), h = N(""), f = N(!1), u = N(JSON.stringify({ title: "每日一句", icon: "📝", customType: "memo", customData: { text: "今天也要记得休息" } }, null, 2)), x = N("");
    function k(g) {
      x.value = "";
      try {
        g();
      } catch (p) {
        x.value = p instanceof Error ? p.message : "操作失败";
      }
    }
    function T() {
      k(() => {
        const g = f.value ? JSON.parse(u.value) : {
          title: r.value,
          customType: a.value,
          customData: { text: h.value, targetDate: h.value, url: h.value }
        };
        De.addCustomFace(g), r.value = "", h.value = "";
      });
    }
    return (g, p) => (l(), ce(vt, { to: "body" }, [
      s(t).isConfigDialogOpen ? (l(), d("section", {
        key: 0,
        class: "cube-manager",
        role: "dialog",
        "aria-label": "管理立方体面",
        onKeydown: p[7] || (p[7] = Nt(F((c) => s(De).closeConfigDialog(), ["stop"]), ["esc"]))
      }, [
        n("header", null, [
          p[8] || (p[8] = n("strong", null, "管理立方体面", -1)),
          n("button", {
            type: "button",
            "aria-label": "关闭",
            onClick: p[0] || (p[0] = (c) => s(De).closeConfigDialog())
          }, "×")
        ]),
        n("div", ga, [
          p[16] || (p[16] = n("p", null, "默认只有音乐。可以删除所有面，空位仍可添加。", -1)),
          (l(!0), d(G, null, fe(o.value, (c, y) => (l(), d("div", {
            key: c.id,
            class: "cube-row"
          }, [
            n("span", null, v(c.icon) + " " + v(c.title), 1),
            n("button", {
              type: "button",
              disabled: y === 0,
              onClick: ($) => k(() => s(De).moveUp(c.id)),
              title: "上移"
            }, "↑", 8, ha),
            n("button", {
              type: "button",
              disabled: y === o.value.length - 1,
              onClick: ($) => k(() => s(De).moveDown(c.id)),
              title: "下移"
            }, "↓", 8, ma),
            n("button", {
              type: "button",
              onClick: ($) => k(() => s(De).removeCustomFace(c.id))
            }, "删除面", 8, va)
          ]))), 128)),
          (l(!0), d(G, null, fe(i.value, (c) => (l(), d("div", {
            key: c.id,
            class: "cube-row"
          }, [
            n("span", null, v(c.title) + "（未启用）", 1),
            n("button", {
              type: "button",
              onClick: (y) => k(() => s(De).toggleActive(c.id, !0))
            }, "添加", 8, ya),
            c.builtIn ? M("", !0) : (l(), d("button", {
              key: 0,
              type: "button",
              onClick: (y) => k(() => s(De).removeCustomFace(c.id))
            }, "删除", 8, wa))
          ]))), 128)),
          p[17] || (p[17] = n("h3", null, "添加面", -1)),
          n("label", null, [
            Ne(n("input", {
              "onUpdate:modelValue": p[1] || (p[1] = (c) => f.value = c),
              type: "checkbox"
            }, null, 512), [
              [Os, f.value]
            ]),
            p[9] || (p[9] = Fe(" 粘贴 JSON 配置", -1))
          ]),
          n("form", {
            onSubmit: F(T, ["prevent"])
          }, [
            f.value ? (l(), d(G, { key: 1 }, [
              p[14] || (p[14] = n("p", null, "仅支持文本、倒数日和链接配置，不执行 JavaScript / HTML。开发者动态注册说明见 SDK 文档。", -1)),
              Ne(n("textarea", {
                "onUpdate:modelValue": p[5] || (p[5] = (c) => u.value = c),
                rows: "9",
                maxlength: "10000",
                "aria-label": "面的 JSON 配置",
                spellcheck: "false"
              }, null, 512), [
                [io, u.value]
              ])
            ], 64)) : (l(), d(G, { key: 0 }, [
              n("label", null, [
                p[10] || (p[10] = Fe("标题", -1)),
                Ne(n("input", {
                  "onUpdate:modelValue": p[2] || (p[2] = (c) => r.value = c),
                  maxlength: "60",
                  required: ""
                }, null, 512), [
                  [io, r.value]
                ])
              ]),
              n("label", null, [
                p[12] || (p[12] = Fe("类型", -1)),
                Ne(n("select", {
                  "onUpdate:modelValue": p[3] || (p[3] = (c) => a.value = c)
                }, [...p[11] || (p[11] = [
                  n("option", { value: "memo" }, "文本", -1),
                  n("option", { value: "countdown" }, "倒数日", -1),
                  n("option", { value: "link" }, "链接", -1)
                ])], 512), [
                  [Di, a.value]
                ])
              ]),
              n("label", null, [
                p[13] || (p[13] = Fe("内容", -1)),
                Ne(n("input", {
                  "onUpdate:modelValue": p[4] || (p[4] = (c) => h.value = c),
                  type: a.value === "countdown" ? "date" : "text",
                  placeholder: a.value === "link" ? "https://…" : "输入内容",
                  maxlength: "500",
                  required: ""
                }, null, 8, ba), [
                  [Bs, h.value]
                ])
              ])
            ], 64)),
            p[15] || (p[15] = n("button", { type: "submit" }, "添加面", -1))
          ], 32),
          x.value ? (l(), d("p", ka, v(x.value), 1)) : M("", !0)
        ]),
        n("footer", null, [
          n("button", {
            type: "button",
            onClick: p[6] || (p[6] = (c) => k(() => s(De).resetDefaults()))
          }, "恢复默认（仅音乐）"),
          p[18] || (p[18] = n("small", null, "自定义配置保留，但退出轮播", -1))
        ])
      ], 32)) : M("", !0)
    ]));
  }
}), Ca = /* @__PURE__ */ Ie(_a, [["__scopeId", "data-v-15dd5487"]]), xa = ["data-face"], La = { class: "ms-top-side" }, $a = {
  key: 0,
  class: "ms-top-meta"
}, Sa = {
  class: "ms-top-title",
  style: { color: "#10b981", "font-weight": "700" }
}, Ta = { class: "ms-top-artist" }, Ia = { class: "ms-top-meta" }, Ma = ["title"], Da = ["title"], Aa = {
  key: 0,
  class: "ms-top-divider"
}, Ea = ["title"], Pa = { class: "ms-top-mini-progress" }, Wa = { class: "ms-top-side" }, Oa = ["aria-label"], Ba = ["title"], Ra = { class: "ms-cube-custom-icon" }, Na = { class: "ms-cube-custom-title" }, Fa = ["title"], Ha = {
  key: 1,
  class: "ms-cube-custom-text countdown"
}, ja = ["href"], za = {
  class: "ms-cube-dots",
  "aria-hidden": "true"
}, Ga = ["title", "onClick"], Ka = { class: "ms-cube-cm-header" }, Va = { class: "ms-cube-cm-list" }, Ua = ["onClick"], Ya = { class: "ms-cube-cm-icon" }, qa = { class: "ms-cube-cm-title" }, Xa = {
  key: 0,
  class: "ms-cube-cm-check"
}, Ja = /* @__PURE__ */ de({
  __name: "TopInfoCube",
  props: {
    active: { type: Boolean, default: !0 }
  },
  setup(e) {
    const t = e, o = ae(() => Pi.visible || rt.djModalOpen || rt.isActive && rt.isJoined), i = ae(() => rt.isActive && rt.isJoined), r = ae(() => De.getActiveFaces()), a = N("music"), h = N(0);
    let f = !1, u;
    Ye(
      () => r.value,
      (B) => {
        B.some((O) => O.id === a.value) || (a.value = B[0]?.id || "");
      },
      { immediate: !0 }
    );
    const x = ae(() => r.value.filter((B) => !B.builtIn)), k = N(!1), T = N({ x: 0, y: 0 });
    Ye(() => t.active, (B) => {
      B || (k.value = !1, De.closeConfigDialog(), clearTimeout(u), f = !1);
    }, { immediate: !0 });
    const { menuRef: g, style: p } = Ri({
      visible: () => k.value,
      anchor: () => T.value,
      dismiss: () => {
        k.value = !1;
      }
    });
    function c(B) {
      B.preventDefault(), B.stopPropagation(), T.value = { x: B.clientX, y: B.clientY }, k.value = !0;
    }
    function y(B) {
      D(B), k.value = !1;
    }
    function $() {
      k.value = !1, De.openConfigDialog();
    }
    function b() {
      k.value = !1, L(() => De.resetDefaults()), D("music");
    }
    function L(B) {
      k.value = !1;
      try {
        B();
      } catch (O) {
        me.show({ appName: "滚动立方体", title: "保存失败", message: O instanceof Error ? O.message : "请检查浏览器存储" });
      }
    }
    function A(B) {
      if (!B) return "未设置目标日";
      const R = new Date(B).getTime() - w.value, ve = Math.ceil(R / (1e3 * 60 * 60 * 24));
      return ve > 0 ? `还剩 ${ve} 天` : ve === 0 ? "就是今天！" : `已过去 ${Math.abs(ve)} 天`;
    }
    const ee = ae(() => U.isBiliRadio ? "B站电台" : U.isNetease ? "网易云" : U.playing ? "塞壬" : "待机"), ne = ae(() => U.currentLyric ? U.currentLyric : U.playing ? "♪ 伴奏播放中…" : "选择塞壬歌曲、网易云或B站电台后在这里显示歌词");
    function E() {
      Me.handleToolClick("music");
    }
    const w = N(Date.now());
    let _;
    Ye(() => t.active && r.value.some((B) => B.id === a.value && B.customType === "countdown"), (B) => {
      B && (w.value = Date.now()), clearInterval(_), _ = B ? window.setInterval(() => {
        document.hidden || (w.value = Date.now());
      }, 6e4) : void 0;
    }, { immediate: !0 });
    function D(B, O = null) {
      const R = r.value, ve = R.find((We) => We.id === B) || R[0];
      if (ve) {
        if (Number.isFinite(O))
          h.value = O;
        else if (ve.id !== a.value) {
          const We = R.findIndex(($e) => $e.id === a.value);
          let _e = (R.findIndex(($e) => $e.id === ve.id) - We + R.length) % R.length;
          _e > R.length / 2 && (_e -= R.length), h.value += _e * 90;
        }
        a.value = ve.id;
      }
    }
    function Y(B) {
      const O = r.value;
      if (O.length <= 1) return;
      const R = O.findIndex((_e) => _e.id === a.value), We = ((R >= 0 ? R : 0) + B + O.length) % O.length, Oe = O[We];
      Oe && D(Oe.id, h.value + B * 90);
    }
    function W(B) {
      r.value.length <= 1 || B.altKey || Math.abs(B.deltaY) < 2 || (B.preventDefault(), !f && (f = !0, Y(B.deltaY > 0 ? 1 : -1), u = setTimeout(() => {
        f = !1;
      }, 420)));
    }
    function H(B) {
      !["ArrowUp", "ArrowDown", "PageUp", "PageDown"].includes(B.key) || B.target?.closest?.("input") || (B.preventDefault(), Y(["ArrowDown", "PageDown"].includes(B.key) ? 1 : -1));
    }
    function P(B, O) {
      return a.value === B ? {
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
    return St(() => {
      clearInterval(_), clearTimeout(u);
    }), (B, O) => Ne((l(), d("div", {
      class: "ms-top-player",
      "data-face": a.value,
      tabindex: "0",
      title: "滚动立方体 · 滚轮切换面板，右键可自由增删与排序",
      "aria-label": "滚动立方体",
      onWheel: W,
      onKeydown: H,
      onContextmenu: c,
      onCopy: K,
      onSelectstart: ge
    }, [
      r.value.length ? M("", !0) : (l(), d("button", {
        key: 0,
        type: "button",
        class: "ms-cube-cm-action",
        onClick: $
      }, "＋ 添加面（右键管理）")),
      n("div", {
        class: "ms-top-cube",
        style: we({ transform: `translateZ(-22px) rotateX(${h.value}deg)` })
      }, [
        s(De).isActive("music") && a.value === "music" ? (l(), d("section", {
          key: 0,
          class: "ms-top-face ms-top-face-music",
          "aria-label": "音乐歌词面",
          style: we(P("music", 0))
        }, [
          n("div", La, [
            n("button", {
              class: "ms-top-prev",
              title: "上一首",
              type: "button",
              onClick: O[0] || (O[0] = F((R) => s(Ue).prev(), ["stop"]))
            }, "⏮"),
            n("button", {
              class: "ms-top-play",
              title: "播放/暂停",
              type: "button",
              onClick: O[1] || (O[1] = F((R) => s(Ue).togglePlay(), ["stop"]))
            }, v(s(U).playing ? "⏸" : "▶"), 1)
          ]),
          n("button", {
            class: "ms-top-main",
            title: "打开音乐播放器",
            type: "button",
            onClick: F(E, ["stop"])
          }, [
            o.value ? (l(), d("div", $a, [
              n("span", Sa, " 🎧 " + v(i.value ? "正在一起听" : "正在收听") + "：" + v(s(U).title || "待机中"), 1),
              n("span", Ta, v(s(U).artist), 1)
            ])) : (l(), d(G, { key: 1 }, [
              n("div", Ia, [
                n("span", {
                  class: "ms-top-title",
                  title: s(U).title || "音乐播放器"
                }, v(s(U).title || "音乐播放器"), 9, Ma),
                n("span", {
                  class: "ms-top-artist",
                  title: s(U).artist || "待机中"
                }, v(s(U).artist || "待机中"), 9, Da),
                n("span", {
                  class: le(["ms-top-source", { idle: !s(U).playing }])
                }, v(ee.value), 3),
                ne.value ? (l(), d("span", Aa)) : M("", !0)
              ]),
              ne.value ? (l(), d("span", {
                key: 0,
                class: "ms-top-lyric",
                title: ne.value
              }, v(ne.value), 9, Ea)) : M("", !0)
            ], 64)),
            n("div", Pa, [
              n("div", {
                class: "ms-top-mini-fill",
                style: we({ width: s(U).progressPercent + "%" })
              }, null, 4)
            ])
          ]),
          n("div", Wa, [
            n("button", {
              class: "ms-top-next",
              title: "下一首",
              type: "button",
              onClick: O[2] || (O[2] = F((R) => s(Ue).next(), ["stop"]))
            }, "⏭"),
            n("button", {
              class: "ms-top-open",
              title: "打开歌单",
              type: "button",
              onClick: F(E, ["stop"])
            }, "🎵")
          ])
        ], 4)) : M("", !0),
        (l(!0), d(G, null, fe(x.value, (R, ve) => (l(), d("section", {
          key: R.id,
          class: "ms-top-face ms-top-face-custom",
          "aria-label": R.title,
          style: we(P(R.id, (ve + 1) * 90))
        }, [
          a.value === R.id ? (l(), d("div", {
            key: 0,
            class: "ms-cube-custom-body",
            title: R.desc
          }, [
            n("span", Ra, v(R.icon), 1),
            n("strong", Na, v(R.title), 1),
            O[10] || (O[10] = n("span", { class: "ms-cube-divider" }, null, -1)),
            R.customType === "memo" ? (l(), d("span", {
              key: 0,
              class: "ms-cube-custom-text",
              title: R.customData?.text
            }, v(R.customData?.text || "（点击右键配置便签内容）"), 9, Fa)) : R.customType === "countdown" ? (l(), d("span", Ha, v(A(R.customData?.targetDate)), 1)) : R.customType === "link" ? (l(), d("a", {
              key: 2,
              href: R.customData?.url,
              target: "_blank",
              rel: "noreferrer",
              class: "ms-cube-custom-link",
              onClick: O[3] || (O[3] = F(() => {
              }, ["stop"]))
            }, v(R.customData?.url) + " ↗ ", 9, ja)) : M("", !0)
          ], 8, Ba)) : M("", !0),
          n("button", {
            type: "button",
            class: "ms-cube-config-trigger",
            title: "管理立方体面",
            onClick: O[4] || (O[4] = F((We) => s(De).openConfigDialog(), ["stop"]))
          }, " ⚙ ")
        ], 12, Oa))), 128))
      ], 4),
      n("div", za, [
        (l(!0), d(G, null, fe(r.value, (R) => (l(), d("i", {
          key: R.id,
          class: le({ on: a.value === R.id }),
          title: R.title,
          onClick: F((ve) => D(R.id), ["stop"])
        }, null, 10, Ga))), 128))
      ]),
      (l(), ce(vt, { to: "body" }, [
        t.active && k.value ? (l(), d("div", {
          key: 0,
          ref_key: "menuRef",
          ref: g,
          class: "ms-cube-context-menu",
          style: we(s(p)),
          onClick: O[9] || (O[9] = F(() => {
          }, ["stop"]))
        }, [
          n("div", Ka, [
            O[11] || (O[11] = n("span", null, "🎲 滚动立方体面", -1)),
            n("button", {
              type: "button",
              class: "ms-cube-cm-close",
              onClick: O[5] || (O[5] = (R) => k.value = !1)
            }, "×")
          ]),
          n("div", Va, [
            (l(!0), d(G, null, fe(r.value, (R) => (l(), d("button", {
              key: R.id,
              type: "button",
              class: le(["ms-cube-cm-item", { active: a.value === R.id }]),
              onClick: (ve) => y(R.id)
            }, [
              n("span", Ya, v(R.icon), 1),
              n("span", qa, v(R.title), 1),
              a.value === R.id ? (l(), d("span", Xa, "✓")) : M("", !0)
            ], 10, Ua))), 128))
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
          a.value ? (l(), d("button", {
            key: 0,
            type: "button",
            class: "ms-cube-cm-action danger",
            onClick: O[8] || (O[8] = (R) => L(() => s(De).removeCustomFace(a.value)))
          }, "删除当前面")) : M("", !0),
          n("button", {
            type: "button",
            class: "ms-cube-cm-action danger",
            onClick: b
          }, [...O[15] || (O[15] = [
            n("span", null, "↺ 恢复默认（仅音乐）", -1)
          ])])
        ], 4)) : M("", !0)
      ])),
      t.active ? (l(), ce(Ca, { key: 1 })) : M("", !0)
    ], 40, xa)), [
      [so, t.active]
    ]);
  }
}), Za = /* @__PURE__ */ Ie(Ja, [["__scopeId", "data-v-c3454bdf"]]), xo = be({
  isOpen: !1
}), os = {
  open() {
    xo.isOpen = !0;
  },
  close() {
    xo.isOpen = !1;
  },
  toggle() {
    xo.isOpen = !xo.isOpen;
  }
}, Hn = $t(xo);
function Qa() {
  if (typeof chrome > "u" || !chrome.runtime?.onMessage) return () => {
  };
  let e = !1, t;
  const o = (i, r, a) => {
    r.id !== chrome.runtime.id || i?.type !== "TOGGLE_SIDE_DRAWER" || t === void 0 || i.targetTabId !== t || (os.toggle(), a({ ok: !0 }));
  };
  return chrome.tabs.getCurrent().then((i) => {
    e || (t = i?.id, chrome.runtime.onMessage.addListener(o));
  }).catch(() => console.warn("[SideDrawer] Could not bind the home-page command.")), () => {
    e = !0, chrome.runtime.onMessage.removeListener(o);
  };
}
const el = { class: "tb-brand" }, tl = ["aria-expanded", "aria-label"], ol = ["src", "alt"], nl = ["hidden"], il = ["hidden"], sl = { id: "vue-bookmark-folder-strip-root" }, rl = { class: "tb-actions" }, al = {
  id: "workspace-launchers",
  hidden: ""
}, ll = ["aria-expanded"], cl = /* @__PURE__ */ de({
  __name: "AppTopBar",
  setup(e) {
    const t = z(() => import("./WorkspaceLaunchers-CdL4NwPt.js"));
    function o(p) {
      p.preventDefault(), p.stopPropagation();
      const c = typeof window < "u" ? window : null;
      c?.LogicWeaverWindowManager?.open ? c.LogicWeaverWindowManager.open("settings") : c?.LogicWeaverWindowTabs?.open ? c.LogicWeaverWindowTabs.open("settings") : rn.open();
    }
    function i(p) {
      p.preventDefault();
      const c = typeof window < "u" ? window : null;
      typeof c?.toggleBookmarkPanel == "function" ? c.toggleBookmarkPanel() : c?.LogicWeaverBookmarkPanel?.toggle ? c.LogicWeaverBookmarkPanel.toggle() : Gn.toggleBookmarkPanel();
    }
    function r(p) {
      p.preventDefault(), Lt.toggle();
    }
    function a(p) {
      p.preventDefault(), Do.open(p.clientX, p.clientY);
    }
    const h = [
      { id: "light", icon: "☀️", label: "白天模式" },
      { id: "dark", icon: "🌙", label: "夜晚模式" },
      { id: "endfield", icon: "⚡", label: "终末地风格" },
      { id: "lonetrail", icon: "🌌", label: "孤星风格" }
    ], f = N("☀️"), u = N("切换主题");
    function x() {
      if (typeof document > "u") return;
      const p = document.documentElement.dataset.theme || "light", c = h.find((y) => y.id === p) || h.find((y) => y.id === "light") || h[0];
      f.value = c.icon, u.value = `主题：${c.label}（点击更换）`;
    }
    function k(p) {
      if (p.preventDefault(), typeof document > "u") return;
      const c = document.documentElement.dataset.theme || "light", y = h.findIndex((b) => b.id === c), $ = h[(y + 1) % h.length];
      document.documentElement.dataset.theme = $.id;
      try {
        localStorage.setItem("theme", $.id);
      } catch {
      }
      typeof chrome < "u" && chrome?.storage?.local && chrome.storage.local.set({ theme: $.id }), x(), document.querySelectorAll("iframe").forEach((b) => {
        try {
          b.contentWindow?.postMessage({ type: "theme-change", theme: $.id }, "*");
        } catch {
        }
      });
    }
    function T(p) {
      const c = p.target;
      c && (c.tagName === "INPUT" || c.tagName === "TEXTAREA" || c.isContentEditable) || (p.preventDefault(), p.stopPropagation());
    }
    function g(p) {
      const c = p.target;
      c && (c.tagName === "INPUT" || c.tagName === "TEXTAREA" || c.isContentEditable) || p.preventDefault();
    }
    return Ke(() => {
      Lt.start();
      const p = localStorage.getItem("theme") || "light";
      document.documentElement.dataset.theme = p, document.documentElement.setAttribute("data-theme", p), x();
    }), (p, c) => (l(), d("header", {
      class: le(["topbar", { "bookmark-folders-mode": s(qt).enabled }]),
      onCopy: T,
      onSelectstart: g
    }, [
      n("div", el, [
        n("button", {
          id: "bili-profile-button",
          class: "bili-profile-button",
          type: "button",
          title: "通知中心",
          "aria-controls": "notification-center",
          "aria-expanded": s(Wi).isOpen,
          "aria-label": s(po) ? `通知中心，${s(po)} 条未读` : "通知中心",
          onClick: r,
          onContextmenu: c[0] || (c[0] = F((y) => a(y), ["prevent"]))
        }, [
          n("img", {
            id: "bili-profile-avatar",
            src: s(Ut).avatarUrl || "assets/bilibili.svg",
            alt: s(Ut).userName || "通知中心头像"
          }, null, 8, ol),
          n("span", {
            id: "bili-profile-badge",
            class: "bili-profile-badge",
            hidden: s(po) <= 0
          }, v(s(po) > 99 ? "99+" : s(po)), 9, nl)
        ], 40, tl),
        n("button", {
          id: "bookmark-handle",
          class: "bookmark-handle",
          type: "button",
          "aria-expanded": "false",
          title: "书签",
          hidden: s(qt).enabled,
          onClick: i
        }, [...c[2] || (c[2] = [
          n("span", { id: "bookmark-handle-icon" }, "📁", -1),
          n("span", null, "书签", -1)
        ])], 8, il),
        n("div", sl, [
          q(fa)
        ])
      ]),
      q(Za, {
        active: !s(xt).activeId
      }, null, 8, ["active"]),
      n("div", rl, [
        c[3] || (c[3] = n("button", {
          id: "daily-toggle",
          class: "tb-pill",
          type: "button",
          hidden: "",
          title: "查看日报"
        }, "📰 日报", -1)),
        n("span", al, [
          q(s(t))
        ]),
        n("button", {
          id: "side-drawer-toggle",
          class: le(["tb-btn", { active: s(Hn).isOpen }]),
          type: "button",
          title: "侧栏 · 标签页聚合与待办",
          "aria-controls": "in-page-side-drawer",
          "aria-expanded": s(Hn).isOpen,
          onClick: c[1] || (c[1] = (y) => s(os).toggle())
        }, " 📑 ", 10, ll),
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
}), dl = {
  key: 0,
  class: "notice"
}, ul = {
  key: 1,
  class: "muted small"
}, pl = {
  key: 2,
  class: "notice"
}, fl = {
  key: 3,
  class: "notice"
}, gl = { class: "wx-cur" }, hl = { class: "wx-emoji" }, ml = { class: "wx-temp" }, vl = { class: "wx-sub" }, yl = { class: "wx-rain" }, wl = { class: "wx-hours" }, bl = { class: "hh" }, kl = { class: "he" }, _l = { class: "ht" }, Cl = { class: "wx-days" }, xl = ["open"], Ll = { class: "weather-forecast-head" }, $l = { class: "weather-forecast-city-info" }, Sl = { class: "weather-forecast-icon" }, Tl = { id: "weather-forecast-city-title" }, Il = { class: "small muted" }, Ml = { class: "weather-forecast-actions" }, Dl = {
  key: 0,
  class: "weather-metrics-grid"
}, Al = { class: "weather-metric-item" }, El = {
  class: "metric-val",
  id: "weather-forecast-humidity"
}, Pl = { class: "weather-metric-item" }, Wl = {
  class: "metric-val",
  id: "weather-forecast-wind"
}, Ol = { class: "weather-metric-item" }, Bl = {
  class: "metric-val",
  id: "weather-forecast-uv"
}, Rl = { class: "weather-metric-item" }, Nl = {
  class: "metric-val",
  id: "weather-forecast-aqi"
}, Fl = {
  class: "weather-forecast-list",
  id: "weather-forecast-days-list"
}, Hl = { class: "day-date-col" }, jl = { class: "day-name" }, zl = { class: "day-date small muted" }, Gl = { class: "day-weather-col" }, Kl = { class: "day-emoji" }, Vl = { class: "day-cond" }, Ul = { class: "day-rain-col" }, Yl = {
  key: 0,
  class: "rain-tag"
}, ql = {
  key: 1,
  class: "rain-tag empty"
}, Xl = { class: "day-temp-bar-col" }, Jl = { class: "low-temp" }, Zl = { class: "temp-track" }, Ql = { class: "high-temp" }, ec = { class: "weather-location-head" }, tc = { class: "weather-location-title-row" }, oc = ["title"], nc = { class: "weather-input-wrapper" }, ic = ["onKeydown"], sc = { key: 0 }, rc = {
  key: 0,
  class: "weather-location-suggestions"
}, ac = ["onClick"], lc = { class: "weather-suggestion-name" }, cc = { class: "weather-suggestion-sub" }, dc = {
  key: 1,
  class: "weather-suggestion-empty"
}, uc = { key: 1 }, pc = { class: "weather-quick-chips-grid" }, fc = ["onClick"], gc = /* @__PURE__ */ de({
  __name: "WeatherWidget",
  setup(e) {
    const t = N(!1), o = N({ x: 0, y: 0 }), i = N(""), r = N(null), a = N(null), h = ["深圳", "武汉", "北京", "上海", "广州", "成都", "杭州", "南京", "西安", "重庆", "苏州", "天津"], f = ae(() => {
      const b = i.value.trim();
      return b ? Co.filterCities(b, 6) : [];
    });
    function u(b) {
      const ne = b?.clientX ?? window.innerWidth / 2 - 140, E = b?.clientY ?? window.innerHeight / 2 - 320 / 2, w = Math.max(12, Math.min(window.innerWidth - 280 - 12, ne)), _ = Math.max(12, Math.min(window.innerHeight - 320 - 12, E));
      o.value = { x: w, y: _ }, t.value = !0, i.value = "", ht(() => {
        a.value?.focus();
      });
    }
    function x() {
      t.value = !1, i.value = "";
    }
    async function k(b) {
      const L = b.trim();
      L && (x(), await Co.changeCity(L));
    }
    function T() {
      const b = i.value.trim();
      b && k(b);
    }
    function g(b) {
      if (!t.value) return;
      const L = b.target;
      r.value && !r.value.contains(L) && x();
    }
    function p(b) {
      t.value && b.key === "Escape" && (b.preventDefault(), x());
    }
    Ke(() => {
      nt.setRefreshAction(() => {
        Co.loadWeather();
      }), nt.setChangeLocationAction((b) => {
        u(b);
      }), Co.loadWeather(), window.addEventListener("pointerdown", g, !0), window.addEventListener("keydown", p, !0);
    }), St(() => {
      window.removeEventListener("pointerdown", g, !0), window.removeEventListener("keydown", p, !0);
    });
    function c(b) {
      b.preventDefault(), u(b);
    }
    function y() {
      nt.closeForecastModal();
    }
    function $(b) {
      b.target?.id === "weather-forecast-dialog" && y();
    }
    return (b, L) => (l(), d("div", {
      class: "weather-widget-container",
      onContextmenu: c
    }, [
      s(j).state === "unconfigured" ? (l(), d("p", dl, [...L[6] || (L[6] = [
        Fe(" 未设置城市。右键此处快速设置，或到 ", -1),
        n("a", { href: "options.html" }, "设置", -1),
        Fe(" 填写城市名（如 武汉 / Tokyo）。 ", -1)
      ])])) : s(j).state === "loading" ? (l(), d("p", ul, "加载中…")) : s(j).state === "not_found" ? (l(), d("p", pl, "找不到城市「" + v(s(j).city) + "」，右键可重新选择地点。", 1)) : s(j).state === "error" ? (l(), d("p", fl, v(s(j).errorMessage || "天气加载失败，右键此处可重新选择地点。"), 1)) : s(j).state === "ready" && s(j).data ? (l(), d(G, { key: 4 }, [
        n("div", gl, [
          n("span", hl, v(s(j).data.currentEmoji), 1),
          n("span", ml, v(s(j).data.currentTemp) + "°", 1)
        ]),
        n("p", vl, v(s(j).data.subText), 1),
        n("p", yl, v(s(j).data.rainText), 1),
        n("div", wl, [
          (l(!0), d(G, null, fe(s(j).data.hours, (A, ee) => (l(), d("div", {
            key: ee,
            class: "wx-h"
          }, [
            n("span", bl, v(A.time), 1),
            n("span", kl, v(A.emoji), 1),
            n("span", _l, v(A.temp) + "°", 1)
          ]))), 128))
        ]),
        n("div", Cl, [
          (l(!0), d(G, null, fe(s(j).data.days, (A, ee) => (l(), d("span", { key: ee }, v(A.label) + " " + v(A.emoji) + " " + v(A.tempRange), 1))), 128))
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
          onClick: L[1] || (L[1] = F(() => {
          }, ["stop"]))
        }, [
          n("header", Ll, [
            n("div", $l, [
              n("span", Sl, v(s(j).data?.currentEmoji || "🌤️"), 1),
              n("div", null, [
                n("h3", Tl, v(s(j).city || s(j).data?.cityName || "天气预报"), 1),
                n("p", Il, v(s(j).data?.subText || "未来多日天气趋势与生活气象指数"), 1)
              ])
            ]),
            n("div", Ml, [
              n("button", {
                id: "weather-forecast-refresh-btn",
                type: "button",
                class: "weather-forecast-btn",
                title: "刷新天气数据",
                onClick: L[0] || (L[0] = (A) => s(nt).refresh())
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
          s(j).detailInfo ? (l(), d("div", Dl, [
            n("div", Al, [
              L[7] || (L[7] = n("span", { class: "metric-label" }, "💧 相对湿度", -1)),
              n("span", El, v(s(j).detailInfo.humidity || "50%"), 1)
            ]),
            n("div", Pl, [
              L[8] || (L[8] = n("span", { class: "metric-label" }, "💨 风力风向", -1)),
              n("span", Wl, v(s(j).detailInfo.wind || "微风"), 1)
            ]),
            n("div", Ol, [
              L[9] || (L[9] = n("span", { class: "metric-label" }, "☀️ 紫外线指数", -1)),
              n("span", Bl, v(s(j).detailInfo.uvIndex || "中等"), 1)
            ]),
            n("div", Rl, [
              L[10] || (L[10] = n("span", { class: "metric-label" }, "🍃 空气质量", -1)),
              n("span", Nl, v(s(j).detailInfo.airQuality || "良"), 1)
            ])
          ])) : M("", !0),
          n("div", Fl, [
            (l(!0), d(G, null, fe(s(j).forecastDays, (A, ee) => (l(), d("div", {
              key: ee,
              class: "weather-forecast-day-row forecast-day-item"
            }, [
              n("div", Hl, [
                n("span", jl, v(A.dayName), 1),
                n("span", zl, v(A.date), 1)
              ]),
              n("div", Gl, [
                n("span", Kl, v(A.emoji), 1),
                n("span", Vl, v(A.condition), 1)
              ]),
              n("div", Ul, [
                A.rainProb > 0 ? (l(), d("span", Yl, "☂️ " + v(A.rainProb) + "%", 1)) : (l(), d("span", ql, "无降水"))
              ]),
              n("div", Xl, [
                n("span", Jl, v(A.lowTemp) + "°", 1),
                n("div", Zl, [
                  n("div", {
                    class: "temp-range-fill",
                    style: we({
                      left: `${Math.max(0, Math.min(100, (A.lowTemp + 10) * 2))}%`,
                      width: `${Math.max(20, Math.min(80, (A.highTemp - A.lowTemp) * 6))}%`
                    })
                  }, null, 4)
                ]),
                n("span", Ql, v(A.highTemp) + "°", 1)
              ])
            ]))), 128))
          ])
        ])
      ], 8, xl),
      (l(), ce(vt, { to: "body" }, [
        t.value ? (l(), d("div", {
          key: 0,
          ref_key: "contextMenuRef",
          ref: r,
          class: "weather-location-context-menu",
          style: we({ left: `${o.value.x}px`, top: `${o.value.y}px` }),
          onClick: L[4] || (L[4] = F(() => {
          }, ["stop"])),
          onContextmenu: L[5] || (L[5] = F(() => {
          }, ["prevent"]))
        }, [
          n("div", ec, [
            n("div", tc, [
              L[12] || (L[12] = n("span", { class: "weather-location-title" }, "切换天气地点", -1)),
              n("span", {
                class: "weather-location-curr-badge",
                title: s(j).city
              }, [
                L[11] || (L[11] = n("span", { class: "weather-curr-dot" }, null, -1)),
                Fe(" " + v(s(j).city || "未设置"), 1)
              ], 8, oc)
            ])
          ]),
          n("form", {
            class: "weather-location-form",
            onSubmit: F(T, ["prevent"])
          }, [
            n("div", nc, [
              L[13] || (L[13] = n("span", { class: "weather-input-icon" }, "🔍", -1)),
              Ne(n("input", {
                ref_key: "inputRef",
                ref: a,
                class: "weather-location-input",
                placeholder: "输入城市名或拼音…",
                "onUpdate:modelValue": L[2] || (L[2] = (A) => i.value = A),
                onKeydown: Nt(F(T, ["prevent"]), ["enter"]),
                autocomplete: "off"
              }, null, 40, ic), [
                [io, i.value]
              ]),
              i.value ? (l(), d("button", {
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
          i.value.trim() ? (l(), d("div", sc, [
            L[15] || (L[15] = n("div", { class: "weather-section-subtitle" }, "匹配建议", -1)),
            f.value.length ? (l(), d("div", rc, [
              (l(!0), d(G, null, fe(f.value, (A) => (l(), d("button", {
                key: A.name + A.admin,
                type: "button",
                class: "weather-suggestion-item",
                onClick: (ee) => k(A.name)
              }, [
                n("span", lc, v(A.name), 1),
                n("span", cc, v(A.admin), 1)
              ], 8, ac))), 128))
            ])) : (l(), d("div", dc, " 未找到完全匹配城市，回车或点击「确定」直接尝试检索 "))
          ])) : (l(), d("div", uc, [
            L[16] || (L[16] = n("div", { class: "weather-section-subtitle" }, "常用城市", -1)),
            n("div", pc, [
              (l(), d(G, null, fe(h, (A) => n("button", {
                key: A,
                type: "button",
                class: le(["weather-quick-chip", { active: s(j).city === A }]),
                onClick: (ee) => k(A)
              }, v(A), 11, fc)), 64))
            ])
          ]))
        ], 36)) : M("", !0)
      ]))
    ], 32));
  }
}), ns = /* @__PURE__ */ Ie(gc, [["__scopeId", "data-v-51b21266"]]), jn = "heroCustomMottoV1";
function hc() {
  try {
    if (typeof localStorage < "u") {
      const e = localStorage.getItem(jn);
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
const Gt = hc(), V = be({
  loaded: !1,
  customText: Gt.customText,
  history: Gt.history,
  currentIndex: Gt.customText && Gt.history.length ? Gt.history.findIndex((e) => e.text === Gt.customText) : -1,
  menuOpen: !1,
  menuPos: { x: 0, y: 0 }
});
function mc(e) {
  return new Promise((t) => {
    typeof chrome < "u" && chrome?.storage?.local?.get ? chrome.storage.local.get([e], (o) => t(o?.[e])) : t(null);
  });
}
function vc(e, t) {
  try {
    typeof localStorage < "u" && localStorage.setItem(e, JSON.stringify(t));
  } catch {
  }
  return new Promise((o) => {
    typeof chrome < "u" && chrome?.storage?.local?.set ? chrome.storage.local.set({ [e]: t }, () => o()) : o();
  });
}
function yc(e) {
  const t = (r) => String(r).padStart(2, "0"), o = `${e.getFullYear()}-${t(e.getMonth() + 1)}-${t(e.getDate())}`, i = `${t(e.getHours())}:${t(e.getMinutes())}`;
  return { date: o, time: i };
}
const ot = {
  async init() {
    try {
      const e = await mc(jn);
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
    await vc(jn, e);
  },
  setCustomMotto(e) {
    const t = e.trim();
    if (!t) {
      this.resetToSystem();
      return;
    }
    const { date: o, time: i } = yc(/* @__PURE__ */ new Date());
    V.customText = t;
    const r = V.history.findIndex((a) => a.text === t);
    if (r !== -1) {
      const a = V.history.splice(r, 1)[0];
      a.date = o, a.time = i, V.history.unshift(a);
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
}, wc = { class: "motto-content" }, bc = {
  key: 0,
  class: "motto-scroll-hint",
  title: "滚动鼠标滚轮快速切换历史标语"
}, kc = { class: "motto-menu-header" }, _c = { class: "dim" }, Cc = { class: "motto-history-list" }, xc = {
  key: 0,
  class: "motto-history-empty dim"
}, Lc = ["onClick"], $c = { class: "motto-item-date" }, Sc = ["title"], Tc = ["onClick"], Ic = /* @__PURE__ */ de({
  __name: "HeroMotto",
  setup(e) {
    const t = N(!1), o = N(""), i = N(null), r = ae(() => V.customText || ye.greetingText);
    function a() {
      ot.closeMenu(), o.value = V.customText || ye.greetingText, t.value = !0, ht(() => {
        i.value?.focus(), i.value?.select();
      });
    }
    function h() {
      if (!t.value) return;
      t.value = !1;
      const g = o.value.trim();
      ot.setCustomMotto(g), g && me.fetch("标语", `已更新标语: ${g}`);
    }
    function f() {
      t.value = !1;
    }
    function u(g) {
      g.key === "Enter" ? (g.preventDefault(), h()) : g.key === "Escape" && (g.preventDefault(), f());
    }
    function x(g) {
      t.value || (g.preventDefault(), g.stopPropagation(), ot.stepHistory(g.deltaY > 0 ? 1 : -1));
    }
    function k(g) {
      g.preventDefault(), g.stopPropagation(), ot.openMenu(g.clientX, g.clientY);
    }
    function T(g) {
      V.menuOpen && (g.target.closest(".motto-context-menu") || ot.closeMenu());
    }
    return Ke(() => {
      ot.init(), window.addEventListener("click", T);
    }), St(() => {
      window.removeEventListener("click", T);
    }), (g, p) => (l(), d(G, null, [
      n("div", {
        class: "hero-motto-wrapper",
        title: "点击直接编辑标语 · 滚轮切换历史标语 · 右键查看标语菜单",
        onWheel: x,
        onContextmenu: k
      }, [
        t.value ? Ne((l(), d("input", {
          key: 0,
          ref_key: "mottoInputRef",
          ref: i,
          "onUpdate:modelValue": p[0] || (p[0] = (c) => o.value = c),
          class: "hero-motto-input",
          type: "text",
          placeholder: "写下你此刻的个性标语…",
          maxlength: "60",
          onBlur: h,
          onKeydown: u
        }, null, 544)), [
          [io, o.value]
        ]) : (l(), d("p", {
          key: 1,
          id: "greeting",
          class: "hero-motto-text",
          style: we({ color: s(ye).greetColor }),
          onClick: a
        }, [
          n("span", wc, v(r.value), 1),
          s(V).history.length > 1 ? (l(), d("span", bc, "⇕")) : M("", !0)
        ], 4))
      ], 32),
      (l(), ce(vt, { to: "body" }, [
        s(V).menuOpen ? (l(), d("div", {
          key: 0,
          class: "motto-context-menu",
          style: we({ left: `${s(V).menuPos.x}px`, top: `${s(V).menuPos.y}px` }),
          onClick: p[3] || (p[3] = F(() => {
          }, ["stop"])),
          onContextmenu: p[4] || (p[4] = F(() => {
          }, ["prevent"]))
        }, [
          n("div", kc, [
            p[5] || (p[5] = n("span", null, "🏷️ 自定义标语", -1)),
            n("small", _c, v(s(V).history.length) + " 条记录", 1)
          ]),
          n("button", {
            type: "button",
            class: "motto-menu-action",
            onClick: a
          }, [...p[6] || (p[6] = [
            n("i", null, "✎", -1),
            n("span", null, "编辑当前标语", -1)
          ])]),
          p[9] || (p[9] = n("div", { class: "motto-menu-divider" }, null, -1)),
          p[10] || (p[10] = n("div", { class: "motto-history-label" }, "历史标语记录（点击切换）：", -1)),
          n("div", Cc, [
            s(V).history.length ? (l(!0), d(G, { key: 1 }, fe(s(V).history, (c) => (l(), d("div", {
              key: c.id,
              class: le(["motto-history-item", { active: s(V).customText === c.text }]),
              onClick: (y) => s(ot).selectHistory(c)
            }, [
              n("span", $c, v(c.date), 1),
              n("span", {
                class: "motto-item-text",
                title: c.text
              }, v(c.text), 9, Sc),
              n("button", {
                type: "button",
                class: "motto-item-del",
                title: "删除此条标语",
                onClick: F((y) => s(ot).deleteEntry(c.id), ["stop"])
              }, "×", 8, Tc)
            ], 10, Lc))), 128)) : (l(), d("div", xc, " 暂无历史标语，自定义的每一条标语都会沉淀在此 "))
          ]),
          p[11] || (p[11] = n("div", { class: "motto-menu-divider" }, null, -1)),
          n("button", {
            type: "button",
            class: "motto-menu-action reset-btn",
            onClick: p[1] || (p[1] = //@ts-ignore
            (...c) => s(ot).resetToSystem && s(ot).resetToSystem(...c))
          }, [...p[7] || (p[7] = [
            n("i", null, "↻", -1),
            n("span", null, "恢复系统自动问候（早安/午安/晚安）", -1)
          ])]),
          s(V).history.length ? (l(), d("button", {
            key: 0,
            type: "button",
            class: "motto-menu-action danger-btn",
            onClick: p[2] || (p[2] = //@ts-ignore
            (...c) => s(ot).clearHistory && s(ot).clearHistory(...c))
          }, [...p[8] || (p[8] = [
            n("i", null, "🗑", -1),
            n("span", null, "清空全部历史标语", -1)
          ])])) : M("", !0)
        ], 36)) : M("", !0)
      ]))
    ], 64));
  }
}), Mc = /* @__PURE__ */ Ie(Ic, [["__scopeId", "data-v-0514f22a"]]), Dc = /* @__PURE__ */ de({
  __name: "HeroClock",
  setup(e) {
    const t = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
    function o(u) {
      return u < 5 ? "夜深了" : u < 9 ? "早上好" : u < 12 ? "上午好" : u < 14 ? "中午好" : u < 18 ? "下午好" : u < 23 ? "晚上好" : "夜深了";
    }
    function i() {
      const u = Ot.state.timezone;
      if (!u || u === "local") return /* @__PURE__ */ new Date();
      try {
        const x = (/* @__PURE__ */ new Date()).toLocaleString("en-US", { timeZone: u });
        return new Date(x);
      } catch {
        return /* @__PURE__ */ new Date();
      }
    }
    function r() {
      const u = (ne) => String(ne).padStart(2, "0"), x = i(), k = x.getHours(), T = x.getMinutes(), g = x.getSeconds(), p = x.getFullYear(), c = x.getMonth() + 1, y = x.getDate(), $ = x.getDay(), b = `${u(k)}:${u(T)}`, L = `:${u(g)}`, A = o(k), ee = `${p}年${c}月${y}日 · ${t[$]}`;
      Jt.updateTime(b, L, A, ee);
    }
    function a(u) {
      u.preventDefault(), Ot.open({ clientX: u.clientX, clientY: u.clientY });
    }
    function h() {
      document.hidden ? f && (clearInterval(f), f = null) : (r(), f || (f = setInterval(r, 1e3)));
    }
    let f = null;
    return Ot.initPreferences(), r(), Ke(() => {
      Ot.initPreferences(), xt.activeId || (r(), f = setInterval(r, 1e3)), document.addEventListener("visibilitychange", h);
    }), Ye(
      () => xt.activeId,
      (u) => {
        u ? f && (clearInterval(f), f = null) : document.hidden || (r(), f || (f = setInterval(r, 1e3)));
      }
    ), St(() => {
      f && (clearInterval(f), f = null), document.removeEventListener("visibilitychange", h);
    }), (u, x) => (l(), d("div", {
      class: "hero-clock-vue-container",
      onContextmenu: a
    }, [
      n("p", {
        id: "clock",
        class: "clock",
        style: we({ fontFamily: s(ye).fontFamily, color: s(ye).colorHex })
      }, [
        Fe(v(s(ye).timeText), 1),
        n("span", {
          id: "secs",
          style: we({ color: s(ye).colorHex })
        }, v(s(ye).secsText), 5)
      ], 4),
      n("p", {
        id: "date",
        class: "date",
        style: we({ color: s(ye).dateColor })
      }, v(s(ye).dateText), 5)
    ], 32));
  }
}), is = /* @__PURE__ */ Ie(Dc, [["__scopeId", "data-v-38840808"]]), Ac = {
  key: 0,
  class: "home-music-degraded-box"
}, Ec = { class: "degraded-badge-row" }, Pc = { class: "degraded-status" }, Wc = {
  key: 0,
  class: "degraded-host-tag"
}, Oc = {
  key: 1,
  class: "degraded-host-tag"
}, Bc = { class: "degraded-title-row" }, Rc = ["title"], Nc = { class: "degraded-track-artist" }, Fc = { class: "degraded-progress-bar-wrap" }, Hc = { class: "degraded-actions" }, jc = { class: "degraded-time" }, zc = { class: "home-vinyl-box" }, Gc = ["src"], Kc = { class: "home-music-right" }, Vc = ["title"], Uc = {
  id: "home-music-artist",
  class: "home-music-meta-artist"
}, Yc = { class: "home-music-seek-row" }, qc = {
  id: "home-music-cur",
  class: "home-music-time"
}, Xc = ["value"], Jc = {
  id: "home-music-dur",
  class: "home-music-time"
}, Zc = { class: "home-music-actions" }, Qc = /* @__PURE__ */ de({
  __name: "HomeMusicCard",
  setup(e) {
    Ke(() => {
      setTimeout(() => {
        zs();
      }, 200);
    });
    const t = ae(() => Pi.visible || rt.djModalOpen || rt.isActive && rt.isJoined), o = ae(() => rt.isActive && rt.isJoined), i = ae(() => U.mode === "shuffle" ? "🔀" : U.mode === "one" ? "🔂" : "🔁");
    function r(h) {
      const f = h.target, u = Number(f.value);
      Ue.seek(u);
    }
    function a() {
      Ue.update({ coverUrl: "" });
    }
    return (h, f) => (l(), d("div", {
      id: "home-music-player-view",
      class: le(["home-music-player-view", { "is-degraded": t.value }])
    }, [
      t.value ? (l(), d("div", Ac, [
        n("div", Ec, [
          f[7] || (f[7] = n("span", { class: "degraded-icon" }, "🎧", -1)),
          n("strong", Pc, v(o.value ? "正在一起听" : "后台收听中"), 1),
          o.value ? (l(), d("span", Wc, " DJ: " + v(s(rt).hostName), 1)) : (l(), d("span", Oc, " 工作区就绪 "))
        ]),
        n("div", Bc, [
          n("h3", {
            class: "degraded-track-title",
            title: s(U).title
          }, v(s(U).title || "待机中"), 9, Rc),
          n("p", Nc, v(s(U).artist), 1)
        ]),
        n("div", Fc, [
          n("div", {
            class: "degraded-progress-bar-fill",
            style: we({ width: s(U).progressPercent + "%" })
          }, null, 4)
        ]),
        n("div", Hc, [
          n("button", {
            type: "button",
            class: "degraded-btn",
            onClick: f[0] || (f[0] = (u) => s(Ue).togglePlay())
          }, v(s(U).playing ? "⏸ 暂停" : "▶ 播放"), 1),
          n("span", jc, v(s(U).formattedCurrent) + " / " + v(s(U).formattedDuration), 1)
        ])
      ])) : (l(), d(G, { key: 1 }, [
        n("div", zc, [
          n("div", {
            id: "home-vinyl-needle",
            class: le(["home-vinyl-needle", { playing: s(U).playing }])
          }, [...f[8] || (f[8] = [
            ko('<svg viewBox="0 0 32 52" fill="none" data-v-25a69816><circle cx="26" cy="4" r="3.5" fill="#e2e8f0" stroke="#475569" stroke-width="1.5" data-v-25a69816></circle><circle cx="26" cy="4" r="1.5" fill="#64748b" data-v-25a69816></circle><path d="M26 4 L14 26 L11 44" stroke="#cbd5e1" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" data-v-25a69816></path><rect x="7" y="42" width="8" height="9" rx="1.5" fill="#f43f5e" transform="rotate(-15 11 46)" data-v-25a69816></rect></svg>', 1)
          ])], 2),
          n("div", {
            id: "home-vinyl-disc",
            class: le(["home-vinyl-disc", { playing: s(U).playing }]),
            title: "点击播放 / 暂停",
            onClick: f[1] || (f[1] = (u) => s(Ue).togglePlay())
          }, [
            s(U).coverUrl ? (l(), d("img", {
              key: 0,
              id: "home-vinyl-cover",
              class: "home-vinyl-cover",
              referrerpolicy: "no-referrer",
              src: s(U).coverUrl,
              alt: "音乐封面",
              onError: a
            }, null, 40, Gc)) : M("", !0),
            f[9] || (f[9] = n("div", { class: "home-vinyl-hole" }, null, -1))
          ], 2)
        ]),
        n("div", Kc, [
          n("h3", {
            id: "home-music-title",
            class: "home-music-meta-title",
            title: s(U).title
          }, v(s(U).title), 9, Vc),
          n("p", Uc, v(s(U).artist), 1),
          n("div", Yc, [
            n("span", qc, v(s(U).formattedCurrent), 1),
            n("input", {
              id: "home-music-seek",
              class: "home-music-seek-bar",
              type: "range",
              min: "0",
              max: "100",
              value: s(U).progressPercent,
              onInput: r
            }, null, 40, Xc),
            n("span", Jc, v(s(U).formattedDuration), 1)
          ]),
          n("div", Zc, [
            n("button", {
              id: "home-music-prev",
              class: "home-music-btn",
              type: "button",
              title: "上一首",
              onClick: f[2] || (f[2] = (u) => s(Ue).prev())
            }, " ⏮ "),
            n("button", {
              id: "home-music-play",
              class: "home-music-btn play-btn",
              type: "button",
              title: "播放 / 暂停",
              onClick: f[3] || (f[3] = (u) => s(Ue).togglePlay())
            }, v(s(U).playing ? "⏸" : "▶"), 1),
            n("button", {
              id: "home-music-next",
              class: "home-music-btn",
              type: "button",
              title: "下一首",
              onClick: f[4] || (f[4] = (u) => s(Ue).next())
            }, " ⏭ "),
            n("button", {
              id: "home-music-like",
              class: le(["home-music-btn like-btn", { liked: s(U).liked }]),
              type: "button",
              title: "收藏",
              onClick: f[5] || (f[5] = (u) => s(Ue).toggleLike())
            }, v(s(U).liked ? "♥" : "♡"), 3),
            n("button", {
              id: "home-music-mode",
              class: "home-music-btn",
              type: "button",
              title: "播放模式",
              onClick: f[6] || (f[6] = (u) => s(Ue).cycleMode())
            }, v(i.value), 1)
          ])
        ])
      ], 64))
    ], 2));
  }
}), ss = /* @__PURE__ */ Ie(Qc, [["__scopeId", "data-v-25a69816"]]), ft = /* @__PURE__ */ new Map(), gt = /* @__PURE__ */ new Set();
function ed(e, t) {
  for (ft.delete(e), ft.set(e, t), gt.delete(t), gt.add(t); ft.size > 512; )
    ft.delete(ft.keys().next().value);
  for (; gt.size > 512; )
    gt.delete(gt.values().next().value);
}
const td = {
  key: 0,
  class: "launcher-fallback"
}, od = ["src"], Tn = "lw_resolved_icon:", nd = /* @__PURE__ */ de({
  __name: "LauncherFavicon",
  props: {
    link: {},
    mini: { type: Boolean, default: !1 }
  },
  setup(e) {
    function t(b) {
      try {
        return localStorage.getItem(Tn + b) || "";
      } catch {
        return "";
      }
    }
    function o(b, L) {
      try {
        localStorage.setItem(Tn + b, L);
      } catch {
      }
    }
    function i(b) {
      try {
        return localStorage.getItem("lw_sync_dataurl:" + b) || "";
      } catch {
        return "";
      }
    }
    const r = e;
    function a(b) {
      try {
        return new URL(b).hostname.replace(/^www\./, "");
      } catch {
        return b || "";
      }
    }
    function h(b) {
      try {
        return new URL(b).origin;
      } catch {
        return "";
      }
    }
    function f(b) {
      try {
        const L = window, A = typeof L.chrome < "u" ? L.chrome : globalThis.chrome;
        if (typeof A?.runtime?.getURL == "function")
          return A.runtime.getURL("_favicon/?pageUrl=" + encodeURIComponent(b) + "&size=64");
      } catch {
      }
      return "";
    }
    const u = ae(() => {
      const b = r.link, L = (b.title || a(b.url)).trim();
      return L ? L.slice(0, 1).toUpperCase() : "🔗";
    }), x = N([]), k = N(0), T = N(!1), g = N(!1), p = ae(() => g.value || k.value >= x.value.length ? "" : x.value[k.value] || "");
    function c() {
      const b = r.link;
      if (!b?.url) {
        x.value = [], g.value = !0, T.value = !1;
        return;
      }
      const L = [], A = i(b.url);
      A && L.push(A);
      const ee = ft.get(b.url) || t(b.url);
      ee && !L.includes(ee) && L.push(ee);
      const ne = (W) => W ? /google\.com\/s2\/favicons|icons\.duckduckgo\.com|unavatar\.io|icon\.horse/i.test(W) : !1;
      b.customIcon && !ne(b.customIcon) && L.push(b.customIcon), b.icon && !ne(b.icon) && L.push(b.icon);
      const E = f(b.url);
      E && !L.includes(E) && L.push(E);
      const w = oe.getCachedIcon(b.url);
      w && !L.includes(w) && L.push(w);
      const _ = h(b.url);
      _ && !_.startsWith("http://1.") && !_.startsWith("http://192.") && !_.startsWith("http://127.") && L.push(`${_}/favicon.ico`), b.customIcon && !ne(b.customIcon) && L.unshift(b.customIcon);
      const D = [...new Set(L.filter(Boolean))];
      x.value = D, k.value = 0, g.value = D.length === 0;
      const Y = D[0];
      Y && (Y.startsWith("data:") || gt.has(Y)) && (T.value = !0);
    }
    Ye(
      () => [r.link?.url, r.link?.icon, r.link?.customIcon],
      (b, L) => {
        L && b[0] === L[0] && b[1] === L[1] && b[2] === L[2] || c();
      },
      { immediate: !0 }
    ), Ke(() => {
      x.value.length === 0 && c();
    });
    function y(b) {
      T.value = !0, g.value = !1;
      const L = p.value;
      if (L) {
        const A = gt.has(L), ee = ft.get(r.link.url);
        ed(r.link.url, L), ee !== L && t(r.link.url) !== L && o(r.link.url, L);
        const ne = b.target;
        if (!A && !L.startsWith("data:")) {
          const E = r.link.url;
          setTimeout(() => {
            oe.cacheIcon(E, L, ne?.getAttribute("src") === L ? ne : null);
          }, 0);
        }
      }
    }
    function $() {
      const b = p.value;
      if (b) {
        gt.delete(b), ft.get(r.link.url) === b && ft.delete(r.link.url);
        try {
          localStorage.removeItem(Tn + r.link.url), localStorage.removeItem("lw_sync_dataurl:" + r.link.url);
        } catch {
        }
      }
      if (b && oe.getCachedIcon(r.link.url) === b && oe.evictCachedIcon(r.link.url), k.value + 1 < x.value.length) {
        k.value += 1;
        const L = x.value[k.value];
        L && (L.startsWith("data:") || gt.has(L)) && (T.value = !0);
      } else
        g.value = !0, T.value = !1;
    }
    return (b, L) => (l(), d("span", {
      class: le(e.mini ? "launcher-folder-mini" : "launcher-favicon")
    }, [
      g.value || !p.value ? (l(), d("span", td, v(u.value), 1)) : (l(), d("img", {
        key: 1,
        src: p.value,
        alt: "",
        draggable: "false",
        referrerpolicy: "no-referrer",
        decoding: "async",
        style: { "pointer-events": "none", "user-select": "none" },
        onLoad: y,
        onError: $
      }, null, 40, od))
    ], 2));
  }
}), nn = /* @__PURE__ */ Ie(nd, [["__scopeId", "data-v-bc41d0d8"]]), id = { class: "launcher-label launcher-title" }, sd = ["title"], rd = {
  key: 0,
  class: "launcher-folder-more"
}, ad = {
  key: 1,
  class: "empty-folder",
  "aria-hidden": "true"
}, ld = { class: "launcher-folder-label launcher-title" }, cd = /* @__PURE__ */ de({
  __name: "LauncherTileContent",
  props: {
    link: {},
    folder: {},
    size: { default: "small" }
  },
  setup(e) {
    const t = e, o = ae(() => t.size === "large" ? 9 : 4), i = ae(() => t.folder?.preview.slice(0, t.folder.count > o.value ? o.value - 1 : o.value) || []);
    return (r, a) => e.link ? (l(), d(G, { key: 0 }, [
      q(nn, { link: e.link }, null, 8, ["link"]),
      n("span", id, v(e.link.title), 1)
    ], 64)) : e.folder ? (l(), d(G, { key: 1 }, [
      n("div", {
        class: "launcher-folder-preview",
        title: `打开${e.folder.title}`
      }, [
        (l(!0), d(G, null, fe(i.value, (h) => (l(), ce(nn, {
          key: h.id,
          link: h,
          mini: !0
        }, null, 8, ["link"]))), 128)),
        e.folder.count > o.value ? (l(), d("span", rd, "+" + v(e.folder.count - (o.value - 1)), 1)) : M("", !0),
        i.value.length ? M("", !0) : (l(), d("span", ad, "📁")),
        Ai(r.$slots, "default", {}, void 0, !0)
      ], 8, sd),
      n("span", ld, v(e.folder.title), 1)
    ], 64)) : M("", !0);
  }
}), Ci = /* @__PURE__ */ Ie(cd, [["__scopeId", "data-v-7f513029"]]), dd = 5, ud = 180;
function pd(e, t, o) {
  const i = t - e.left, r = o - e.top;
  return i > e.width * 0.25 && i < e.width * 0.75 && r > e.height * 0.25 && r < e.height * 0.75;
}
function fd(e, t, o) {
  return Math.hypot(t - (e.left + e.width / 2), o - (e.top + e.height / 2)) <= Math.max(e.width, e.height) * 0.55;
}
const gd = {
  class: "launcher-group launcher-aihot launcher-todoist size-large",
  id: "launcher-todoist"
}, hd = {
  class: "aihot-home-body",
  id: "aihot-home-body"
}, md = {
  key: 0,
  class: "muted small"
}, vd = {
  key: 1,
  class: "notice small"
}, yd = {
  key: 2,
  class: "muted small aihot-home-empty"
}, wd = {
  key: 3,
  class: "aihot-home-rich-list"
}, bd = ["href", "title", "onClick"], kd = { class: "aihot-home-rich-main" }, _d = { class: "aihot-home-rich-title" }, Cd = {
  key: 0,
  class: "aihot-home-rich-summary"
}, xd = { class: "aihot-home-rich-meta" }, Ld = { class: "aihot-home-rich-meta-left" }, $d = {
  key: 0,
  class: "aihot-home-rich-tag"
}, Sd = { class: "aihot-home-rich-source" }, Td = { class: "aihot-home-rich-time" }, xi = 6, Id = /* @__PURE__ */ de({
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
    }, o = N([]), i = N(0), r = N(!0), a = N("");
    function h(c) {
      return c.category ? t[c.category] || c.category : "";
    }
    function f(c) {
      const y = c.publishedAt || c.published || "";
      if (!y) return "最新";
      const $ = Number(y), b = Number.isFinite($) && $ > 0 ? new Date($ > 1e12 ? $ : $ * 1e3) : new Date(y);
      if (isNaN(b.getTime())) return String(y).slice(0, 16) || "最新";
      const L = (_) => String(_).padStart(2, "0"), A = b.getFullYear(), ee = L(b.getMonth() + 1), ne = L(b.getDate()), E = L(b.getHours()), w = L(b.getMinutes());
      return `${A}-${ee}-${ne} ${E}:${w}`;
    }
    const u = [
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
      for (const b of $)
        try {
          const L = localStorage.getItem(b);
          if (L) {
            const A = JSON.parse(L);
            if (Array.isArray(A) && A.length) return A;
            if (A && Array.isArray(A.items) && A.items.length) return A.items;
          }
        } catch {
        }
      return [];
    }
    async function k(c = !1) {
      if (!c && o.value.length > 0) return;
      const y = x();
      y.length ? (o.value = y, r.value = !1) : o.value.length || (o.value = [...u], r.value = !1);
      try {
        const b = await (await fetch("https://aihot.virxact.com/api/v1/items?mode=selected&window=24h&limit=24", {
          headers: { Accept: "application/json" },
          signal: AbortSignal.timeout(5e3)
        })).json(), L = Array.isArray(b) ? b : b.items || b.data || b.results || [];
        if (L.length) {
          o.value = L, i.value = 0, a.value = "";
          try {
            localStorage.setItem("newtab_aihot_items_v2", JSON.stringify(L.slice(0, 30)));
          } catch {
          }
        }
      } catch {
        o.value.length || (o.value = [...u]);
      } finally {
        r.value = !1;
      }
    }
    function T() {
      if (!o.value.length) {
        r.value = !0, k(!0);
        return;
      }
      i.value += xi, i.value >= o.value.length && (i.value = 0);
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
    function p(c, y) {
      if (y.ctrlKey || y.metaKey || y.shiftKey || y.button === 1) return;
      y.preventDefault();
      const $ = c.links?.original || c.links?.aihot || c.url || "#";
      Yn.openArticle(
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
    return Ke(() => {
      k();
    }), (c, y) => (l(), d("section", gd, [
      n("header", { class: "card-head aihot-home-head" }, [
        y[0] || (y[0] = n("span", { class: "bar cyan" }, null, -1)),
        y[1] || (y[1] = n("strong", { class: "title" }, "AI HOT 资讯", -1)),
        y[2] || (y[2] = n("span", { class: "grow" }, null, -1)),
        n("button", {
          class: "aihot-home-btn",
          type: "button",
          title: "换一批最新资讯",
          onClick: T
        }, " 换一批 ↻ "),
        n("button", {
          class: "aihot-home-btn aihot-home-more-btn",
          type: "button",
          title: "查看完整 AI HOT 榜单",
          onClick: g
        }, " 热榜 ↗ ")
      ]),
      n("div", hd, [
        r.value && !o.value.length ? (l(), d("p", md, "正在加载精选资讯…")) : a.value && !o.value.length ? (l(), d("p", vd, v(a.value), 1)) : o.value.length ? (l(), d("div", wd, [
          (l(!0), d(G, null, fe(o.value.slice(i.value, i.value + xi), ($, b) => (l(), d("a", {
            key: $.id || $.title,
            class: "aihot-home-rich-card",
            href: $.links?.original || $.links?.aihot || $.url || "#",
            target: "_blank",
            rel: "noreferrer",
            title: `${$.title}
${$.summary || ""}
点击在阅读器中查看`,
            onClick: (L) => p($, L)
          }, [
            n("span", {
              class: le(["aihot-home-rich-rank", { top: i.value + b < 3 }])
            }, v(i.value + b + 1), 3),
            n("div", kd, [
              n("h3", _d, v($.title), 1),
              $.summary ? (l(), d("p", Cd, v($.summary), 1)) : M("", !0),
              n("div", xd, [
                n("div", Ld, [
                  h($) ? (l(), d("span", $d, v(h($)), 1)) : M("", !0),
                  n("span", Sd, v($.source?.name || $.sourceName || "AI HOT"), 1)
                ]),
                n("time", Td, v(f($)), 1)
              ])
            ])
          ], 8, bd))), 128))
        ])) : (l(), d("p", yd, "暂无精选资讯，请点击换一批重试"))
      ])
    ]));
  }
}), Md = /* @__PURE__ */ Ie(Id, [["__scopeId", "data-v-cc4398a8"]]), Dd = {
  class: "sites-view-switch",
  role: "group",
  "aria-label": "网站与书签切换"
}, Ad = ["disabled", "aria-pressed"], Ed = ["disabled", "aria-pressed"], Pd = {
  class: "launcher-page-tabs",
  role: "tablist",
  "aria-label": "常用网站分区"
}, Wd = ["data-page", "title", "onClick", "onContextmenu", "onDragover", "onDrop"], Od = {
  key: 0,
  id: "bookmark-board-header",
  class: "launcher-page-tabs"
}, Bd = ["data-page"], Rd = ["href", "title", "data-launcher-id", "onPointerdown", "onClick", "onContextmenu"], Nd = ["title", "data-launcher-folder", "onPointerdown", "onDragstart", "onDrop", "onClick", "onContextmenu"], Fd = ["title", "onClick"], Hd = {
  class: "launcher-folder-count",
  hidden: ""
}, jd = {
  class: "launcher-empty",
  key: "empty-msg"
}, zd = {
  key: 1,
  class: "launcher-media-stack"
}, Gd = {
  key: 1,
  id: "launcher-bili"
}, Kd = { class: "launcher-folder-preview" }, Vd = { class: "launcher-folder-label launcher-title" }, Ud = { class: "launcher-label launcher-title" }, Yd = /* @__PURE__ */ de({
  __name: "FavoriteSites",
  setup(e) {
    const t = z(() => import("./BookmarkBoard-iOBGU--D.js")), o = z(() => import("./LauncherBookGuideDialog-dpnF4MRe.js")), i = N("sites"), r = N(!1), a = N(!1);
    function h() {
      a.value = !0;
    }
    function f() {
      a.value = !1;
    }
    function u() {
      Se(), y = !1, ge = !1;
    }
    Ke(() => {
      Te.setExternalDragHandler(w), Te.setExternalDropHandler(_), window.addEventListener("blur", u), window.addEventListener("pagehide", u), document.addEventListener("visibilitychange", u);
      const m = window;
      re.hasBili && typeof m.ensureLauncherMediaCards == "function" && m.ensureLauncherMediaCards();
    });
    const x = N(!1), k = N(""), T = N(null), g = N(null), p = N(null), c = N(null);
    let y = !1, $ = 0, b = 0, L = 0, A = "", ee = 0, ne = "", E = 0;
    function w(m) {
      if (i.value !== "sites") return;
      if (!m || Xe.isOpen) {
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
      const J = I.classList.contains("launcher-link"), he = J ? I.getAttribute("data-launcher-id") : null, Ee = J ? null : I.getAttribute("data-launcher-folder"), te = J ? `link-${he}` : `folder-${Ee}`, se = I.getBoundingClientRect(), je = se.left + se.width / 2, un = se.top + se.height / 2, uo = Math.hypot(m.clientX - je, m.clientY - un), Ft = Date.now();
      if (uo > Math.max(se.width, se.height) * 0.55 || te === ne && Ft - E < 180) return;
      const Ht = dn.value.filter(
        (Be) => Be.type !== "link" || String(Be.link.id) !== String(m.link.id)
      ), at = [...c.value || Ht], yt = at.findIndex(
        (Be) => Be.type === "link" && String(Be.link.id) === String(m.link.id)
      ), wt = at.findIndex((Be) => Be.key === te);
      if (wt < 0) return;
      const Qe = {
        key: `link-${m.link.id}`,
        type: "link",
        link: m.link
      };
      yt >= 0 ? yt !== wt && (at.splice(yt, 1), at.splice(wt, 0, Qe), c.value = at, ne = te, E = Ft) : (at.splice(wt, 0, Qe), c.value = at, ne = te, E = Ft);
    }
    async function _(m) {
      if (i.value !== "sites" || Xe.isOpen) return !1;
      if (c.value) {
        const C = c.value.map((S) => ({
          type: S.type,
          id: S.type === "link" ? String(S.link.id) : void 0,
          groupName: S.type === "folder" ? S.folder.groupName : void 0
        }));
        return await oe.moveLinkTo(String(m.id), re.activePage, "常用网站"), await oe.reorderPageItems(re.activePage, C), c.value = null, ne = "", !0;
      }
      return !1;
    }
    const D = be({
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
      Y = C.pointerId, W = C.clientX, H = C.clientY, b = C.clientX, L = C.clientY, P = String(m.id), K = null, ge = !1;
      const S = C.currentTarget.getBoundingClientRect();
      D.offsetX = C.clientX - S.left, D.offsetY = C.clientY - S.top, D.type = "link", D.link = m, D.folder = null, window.addEventListener("pointermove", Oe, { passive: !1 }), window.addEventListener("pointerup", $e), window.addEventListener("pointercancel", $e);
    }
    function O(m, C, S) {
      if (S.button !== 0 || S.target.closest(".launcher-folder-del-btn")) return;
      Y = S.pointerId, W = S.clientX, H = S.clientY, b = S.clientX, L = S.clientY, P = null, K = m, ge = !1;
      const I = S.currentTarget.getBoundingClientRect();
      D.offsetX = S.clientX - I.left, D.offsetY = S.clientY - I.top, D.type = "folder", D.folder = {
        groupName: m,
        size: He(m),
        links: C?.links || []
      }, D.link = null, window.addEventListener("pointermove", Oe, { passive: !1 }), window.addEventListener("pointerup", $e), window.addEventListener("pointercancel", $e);
    }
    let R = 0, ve = null;
    function We() {
      cancelAnimationFrame(R), R = 0, ve = null;
    }
    function Oe(m) {
      m.pointerId === Y && (ge && m.cancelable && m.preventDefault(), ve = m, !R && (R = requestAnimationFrame(() => {
        R = 0;
        const C = ve;
        ve = null, C && _e(C);
      })));
    }
    function _e(m) {
      if (m.pointerId !== Y || !P && !K) return;
      const C = Math.hypot(m.clientX - W, m.clientY - H);
      if (!ge && C > dd && (ge = !0, y = !0, P ? g.value = P : K && (p.value = K)), !ge) return;
      (D.link || D.folder) && (D.visible = !0, D.x = m.clientX - D.offsetX, D.y = m.clientY - D.offsetY);
      const S = document.elementsFromPoint(m.clientX, m.clientY);
      if (ti()) {
        const te = S.some(
          (je) => je.id === "launcher-folder-dialog" || !!je.closest?.("#launcher-folder-dialog")
        ), se = document.querySelector("#launcher-folder-dialog");
        if (te && se) {
          se.classList.add("drop-hover-valid"), Xe.dropHoverValid = !0;
          return;
        } else
          se?.classList.remove("drop-hover-valid"), Xe.dropHoverValid = !1;
        c.value = null;
        return;
      }
      const J = c.value || dn.value, he = P ? `link-${P}` : `folder-${K}`;
      if (J.length) {
        const te = S.find((se) => {
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
          const se = te.classList.contains("launcher-link"), je = se ? te.getAttribute("data-launcher-id") : null, un = se ? null : te.getAttribute("data-launcher-folder"), uo = se ? `link-${je}` : `folder-${un}`, Ft = te.getBoundingClientRect();
          let Ht = !0;
          P && !se && (pd(Ft, m.clientX, m.clientY) ? (Ht = !1, te.classList.add("drop-target")) : te.classList.remove("drop-target"));
          const at = Date.now();
          if (fd(Ft, m.clientX, m.clientY) || (Ht = !1), uo === A && at - ee < ud && (Ht = !1), Ht) {
            document.querySelectorAll(".launcher-folder.drop-target").forEach((Qe) => Qe.classList.remove("drop-target"));
            const yt = J.findIndex((Qe) => Qe.key === he), wt = J.findIndex((Qe) => Qe.key === uo);
            if (yt >= 0 && wt >= 0 && yt !== wt) {
              const Qe = J.slice(), Be = Qe.splice(yt, 1)[0];
              Qe.splice(wt, 0, Be), c.value = Qe, A = uo, ee = at;
            }
          }
        }
      }
      const Ee = S.find((te) => te.classList.contains("launcher-page-tab"));
      if (Ee) {
        const te = Ee.getAttribute("data-page");
        te && te !== re.activePage && Ee.classList.add("drop-target");
      } else
        document.querySelectorAll(".launcher-page-tab.drop-target").forEach((te) => te.classList.remove("drop-target"));
    }
    async function $e(m) {
      if (m.pointerId === Y) {
        We(), m.type === "pointercancel" ? Se() : _e(m), window.removeEventListener("pointermove", Oe), window.removeEventListener("pointerup", $e), window.removeEventListener("pointercancel", $e);
        try {
          if (ge) {
            $ = Date.now(), y = !1;
            const C = document.elementsFromPoint(m.clientX, m.clientY);
            if (document.querySelectorAll(".launcher-page-tab.drop-target").forEach((I) => I.classList.remove("drop-target")), document.querySelectorAll(".launcher-folder.drop-target").forEach((I) => I.classList.remove("drop-target")), ti() && Xe.activeFolder) {
              if (C.some(
                (J) => J.id === "launcher-folder-dialog" || !!J.closest?.("#launcher-folder-dialog")
              )) {
                const he = C.find((Ee) => Ee.hasAttribute("data-child-folder"))?.getAttribute("data-child-folder") || Xe.activeFolder;
                P ? await oe.moveLinkTo(P, void 0, he) : K && await oe.moveFolderInto(K, he);
              }
              return;
            }
            const S = C.find((I) => I.classList.contains("launcher-page-tab"));
            if (S) {
              const I = S.getAttribute("data-page");
              if (I) {
                P ? (await oe.moveLinkTo(P, I, "常用网站"), await oe.setPage(I)) : K && await oe.moveFolderToPage(K, I), Se();
                return;
              }
            }
            if (P) {
              const I = C.find((J) => J.classList.contains("launcher-folder"));
              if (I) {
                const J = I.getAttribute("data-launcher-folder");
                if (J) {
                  await oe.moveLinkTo(P, re.activePage, J), Se();
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
          me.show({ appName: "常用网站", title: "移动未完成", message: C instanceof Error ? C.message : "请刷新核对，未自动重试。" });
        } finally {
          Se();
        }
      }
    }
    function Se() {
      We(), Y = null, P = null, K = null, ge = !1, y = !1, g.value = null, p.value = null, c.value = null, D.visible = !1, D.link = null, D.folder = null, A = "", document.querySelector("#launcher-folder-dialog")?.classList.remove("drop-hover-valid"), Xe.dropHoverValid = !1, window.removeEventListener("pointermove", Oe), window.removeEventListener("pointerup", $e), window.removeEventListener("pointercancel", $e);
    }
    St(() => {
      Te.setExternalDragHandler(null), Te.setExternalDropHandler(null), Se(), window.removeEventListener("blur", u), window.removeEventListener("pagehide", u), document.removeEventListener("visibilitychange", u), window.removeEventListener("pointermove", Oe), window.removeEventListener("pointerup", $e), window.removeEventListener("pointercancel", $e);
    });
    function Ve(m) {
      const C = re.pageLabels;
      return C && C[m] ? C[m] : m || "常用网站";
    }
    function Ze(m, C) {
      const S = String(m.page || "").trim(), I = String(C).trim(), J = re.pageLabels || {}, he = !S || S === "常用网站" || S === "默认";
      if (!I || I === "常用网站" || I === "默认") return he;
      if (he) return !1;
      if (S === I) return !0;
      const te = J[S] || S, se = J[I] || I;
      return te === se || S === se || te === I;
    }
    function He(m) {
      const C = re.groupSizes;
      return C && C[m] === "large" ? "large" : "small";
    }
    function cs(m) {
      return m === "large" ? 9 : 4;
    }
    function ds(m, C) {
      const S = cs(C), I = m.length > S ? S - 1 : S;
      return m.slice(0, I);
    }
    const dn = ae(() => {
      const m = re.activePage || "常用网站", S = re.links.filter(
        (te) => Ze(te, m)
      ), I = /* @__PURE__ */ new Map();
      S.forEach((te) => {
        const se = te.group || "常用网站";
        se !== "常用网站" && (I.has(se) || I.set(se, []), I.get(se).push(te));
      });
      const J = /* @__PURE__ */ new Set(), he = [];
      S.forEach((te) => {
        const se = te.group || "常用网站";
        Zo(re.folders, se) || (se === "常用网站" ? he.push({ key: `link-${te.id}`, type: "link", link: te }) : J.has(se) || (J.add(se), he.push({
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
        if (Zo(re.folders, te)) return;
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
    }), Zn = ae(() => c.value && c.value.length ? c.value : dn.value), us = ae(() => {
      const m = re.activePage || "常用网站", C = Ve(m);
      return C === "默认" || m === "常用网站" ? "还没有快捷入口，点击“编辑入口”后添加。" : `“${C}”还是空的，把网站拖到这里。`;
    });
    function Qn(m) {
      c.value = null, g.value = null, p.value = null, Te.switchPage(m);
    }
    function ps() {
      x.value = !0, k.value = "", ht(() => {
        T.value?.focus();
      });
    }
    function ei() {
      if (!x.value) return;
      const m = k.value.trim();
      x.value = !1, m && Te.addPage(m);
    }
    function fs(m) {
      m.key === "Enter" ? (m.preventDefault(), ei()) : m.key === "Escape" && (x.value = !1);
    }
    function gs(m, C) {
      Te.openPageMenu(m, C);
    }
    function hs(m) {
      const C = m.target;
      if (!C || C.closest(".launcher-link") || C.closest(".launcher-folder") || C.closest(".launcher-page-tab") || C.closest("button") || C.closest("input"))
        return;
      m.preventDefault();
      const S = re.activePage || "常用网站";
      oo.openBlankMenu(S, m.clientX, m.clientY);
    }
    function ms(m) {
      i.value === "sites" && (!m.shiftKey || re.pages.length < 2 || (m.preventDefault(), m.deltaY > 0 || m.deltaX > 0 ? Te.nextPage() : Te.prevPage()));
    }
    function vs(m) {
      m.target.closest(".launcher-page-tab") || m.stopPropagation();
    }
    function ys(m) {
      m.button === 0 && (b = m.clientX, L = m.clientY);
    }
    function ws(m, C) {
      if (C.preventDefault(), C.stopPropagation(), Ge.isEditingShortcuts) {
        Ge.handleLinkSelection(m);
        return;
      }
      Y || (y = !1), !(Math.hypot(C.clientX - b, C.clientY - L) >= 6 || y || Date.now() - $ < 600) && Te.openLink(m, C);
    }
    function bs(m, C) {
      Te.openLinkMenu(m, C);
    }
    function ks(m, C) {
      if (Y || (y = !1), y || Date.now() - $ < 450) {
        C.preventDefault(), C.stopPropagation();
        return;
      }
      Te.openFolder(m, C);
    }
    function _s(m, C, S) {
      Te.openFolderMenu(m, C, S);
    }
    function Cs(m) {
      Te.deleteFolder(m);
    }
    function xs(m, C) {
      const S = Array.from(C.dataTransfer?.types || []);
      if (!S.includes("application/x-newtab-launcher") && !S.includes("application/x-newtab-bookmark") && !S.includes("text/uri-list") && !S.includes("text/plain")) return;
      C.preventDefault(), C.dataTransfer && (C.dataTransfer.dropEffect = "move"), re.activePage !== m && Qn(m), C.currentTarget?.classList.add("drop-target");
    }
    function Ls(m) {
      m.currentTarget?.classList.remove("drop-target");
    }
    async function $s(m, C) {
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
    function Ss(m) {
      const C = Array.from(m.dataTransfer?.types || []);
      if (!C.includes("application/x-newtab-launcher") && !C.includes("application/x-newtab-bookmark") && !C.includes("text/uri-list") && !C.includes("text/plain")) return;
      m.preventDefault(), m.dataTransfer && (m.dataTransfer.dropEffect = C.includes("application/x-newtab-launcher") ? "move" : "copy"), m.currentTarget?.classList.add("drop-target");
    }
    function Ts(m) {
      const C = m.currentTarget;
      C?.contains(m.relatedTarget) || C?.classList.remove("drop-target");
    }
    async function Is(m) {
      m.currentTarget?.classList.remove("drop-target");
      let S = "";
      const I = m.dataTransfer?.getData("application/x-newtab-launcher");
      if (I)
        try {
          S = String(JSON.parse(I)?.id || "");
        } catch {
        }
      if (!S && (g.value || window.__activeLauncherLink) && (S = String(window.__activeLauncherLink?.id || g.value || "")), S) {
        m.preventDefault(), m.stopPropagation(), await oe.moveLinkTo(S, re.activePage, "常用网站");
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
    function ti() {
      if (!Xe.isOpen) return !1;
      if (typeof document < "u") {
        const m = document.querySelector("#launcher-folder-dialog");
        return !!(m && m.open);
      }
      return !1;
    }
    function Ms(m, C) {
      C.preventDefault();
    }
    function Ds(m) {
      m.preventDefault(), m.dataTransfer && (m.dataTransfer.dropEffect = "move"), m.currentTarget?.classList.add("drop-target");
    }
    function As(m) {
      m.currentTarget?.classList.remove("drop-target");
    }
    async function Es(m, C) {
      C.currentTarget?.classList.remove("drop-target"), C.preventDefault(), C.stopPropagation();
      const I = C.dataTransfer?.getData("application/x-newtab-launcher-folder");
      if (I && I !== m) {
        try {
          await oe.moveFolderInto(I, m);
        } catch (Ee) {
          me.show({ appName: "常用网站", title: "移动未完成", message: Ee instanceof Error ? Ee.message : "请刷新后核对。" });
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
    return (m, C) => (l(), d(G, null, [
      s(re).showSites ? (l(), d("section", {
        key: 0,
        class: "launcher-group launcher-sites size-large",
        onWheel: ms
      }, [
        n("header", {
          class: "launcher-group-head launcher-sites-head",
          onPointerdown: C[5] || (C[5] = F(() => {
          }, ["stop"])),
          onContextmenu: vs
        }, [
          n("div", Dd, [
            n("button", {
              type: "button",
              disabled: r.value,
              "aria-pressed": i.value === "sites",
              onClick: C[0] || (C[0] = (S) => i.value = "sites")
            }, "常用网站", 8, Ad),
            n("button", {
              type: "button",
              disabled: r.value,
              "aria-pressed": i.value === "bookmarks",
              onClick: C[1] || (C[1] = (S) => i.value = "bookmarks")
            }, "书签", 8, Ed)
          ]),
          Ne(n("div", Pd, [
            (l(!0), d(G, null, fe(s(re).pages, (S) => (l(), d("button", {
              key: S,
              type: "button",
              class: le(["launcher-page-tab", { active: S === s(re).activePage }]),
              "data-page": S,
              role: "tab",
              title: `切换到${Ve(S)}；拖动网站到这里可移动分区；右键管理分区`,
              onPointerdown: C[2] || (C[2] = F(() => {
              }, ["stop"])),
              onClick: F((I) => Qn(S), ["prevent", "stop"]),
              onContextmenu: F((I) => gs(S, I), ["prevent", "stop"]),
              onDragover: (I) => xs(S, I),
              onDragleave: C[3] || (C[3] = (I) => Ls(I)),
              onDrop: (I) => $s(S, I)
            }, v(Ve(S)), 43, Wd))), 128)),
            x.value ? Ne((l(), d("input", {
              key: 1,
              ref_key: "pageInputRef",
              ref: T,
              class: "launcher-page-input",
              maxlength: "12",
              placeholder: "例如：游戏区",
              "onUpdate:modelValue": C[4] || (C[4] = (S) => k.value = S),
              onKeydown: fs,
              onBlur: ei
            }, null, 544)), [
              [io, k.value]
            ]) : (l(), d("button", {
              key: 0,
              class: "launcher-page-add",
              type: "button",
              title: "添加网站分区，例如游戏区",
              "aria-label": "添加网站分区",
              onClick: ps
            }, " + "))
          ], 512), [
            [so, i.value === "sites"]
          ]),
          i.value === "bookmarks" ? (l(), d("div", Od)) : M("", !0),
          n("button", {
            class: "launcher-page-help",
            type: "button",
            title: "使用指南：如何创建文件夹与整理网站",
            "aria-label": "使用指南与技巧",
            onClick: h
          }, " ? ")
        ], 32),
        i.value === "bookmarks" ? (l(), ce(s(t), {
          key: 0,
          "header-target": "#bookmark-board-header",
          onBusy: C[6] || (C[6] = (S) => r.value = S)
        })) : M("", !0),
        Ne(n("div", {
          class: "launcher-page-panel",
          "data-page": s(re).activePage,
          hidden: !1,
          role: "tabpanel",
          onContextmenu: hs,
          onDragover: C[12] || (C[12] = (S) => Ss(S)),
          onDragleave: C[13] || (C[13] = (S) => Ts(S)),
          onDrop: C[14] || (C[14] = (S) => Is(S))
        }, [
          (l(), ce(Xo, {
            tag: "div",
            class: "launcher-items launcher-site-items",
            key: s(re).activePage,
            name: g.value || p.value ? "launcher-grid" : ""
          }, {
            default: no(() => [
              (l(!0), d(G, null, fe(Zn.value, (S) => (l(), d(G, {
                key: S.key
              }, [
                S.type === "link" ? (l(), d("a", {
                  key: S.key,
                  class: le(["launcher-link", {
                    "is-dragging": g.value === String(S.link.id),
                    "is-wheel-picked": s(Ge).isEditingShortcuts && s(Ge).isLinkSelected(String(S.link.id || S.link.url))
                  }]),
                  href: S.link.url,
                  title: S.link.title + (S.link.note ? `
📝 ` + S.link.note : "") + `
🔗 ` + S.link.url,
                  "data-launcher-id": String(S.link.id),
                  target: "_blank",
                  rel: "noreferrer",
                  draggable: "false",
                  onDragstart: C[7] || (C[7] = F(() => {
                  }, ["prevent"])),
                  onPointerdown: (I) => B(S.link, I),
                  onMousedown: C[8] || (C[8] = (I) => ys(I)),
                  onClick: F((I) => ws(S.link, I), ["prevent"]),
                  onContextmenu: F((I) => bs(S.link, I), ["prevent"])
                }, [
                  q(Ci, {
                    link: S.link
                  }, null, 8, ["link"])
                ], 42, Rd)) : S.type === "folder" ? (l(), d("div", {
                  key: S.key,
                  class: le(["launcher-folder", [
                    `size-${He(S.folder.groupName)}`,
                    { "is-dragging": p.value === S.folder.groupName }
                  ]]),
                  title: `${S.folder.groupName}
可拖动调整位置；右键调整收藏夹大小`,
                  role: "button",
                  tabindex: "0",
                  "data-launcher-folder": String(S.folder.groupName),
                  draggable: "true",
                  onPointerdown: (I) => O(S.folder.groupName, S.folder, I),
                  onDragstart: (I) => Ms(S.folder.groupName, I),
                  onDragover: C[10] || (C[10] = (I) => Ds(I)),
                  onDragleave: C[11] || (C[11] = (I) => As(I)),
                  onDrop: (I) => Es(S.folder.groupName, I),
                  onClick: (I) => ks(S.folder.groupName, I),
                  onContextmenu: F((I) => _s(S.folder.groupName, S.folder.pageName, I), ["prevent"])
                }, [
                  q(Ci, {
                    folder: { title: S.folder.groupName, preview: S.folder.links, count: S.folder.links.length },
                    size: He(S.folder.groupName)
                  }, {
                    default: no(() => [
                      n("button", {
                        class: "launcher-folder-del-btn",
                        type: "button",
                        title: `删除文件夹「${S.folder.groupName}」`,
                        "aria-label": "删除文件夹",
                        onPointerdown: C[9] || (C[9] = F(() => {
                        }, ["stop"])),
                        onClick: F((I) => Cs(S.folder.groupName), ["stop", "prevent"])
                      }, " ✕ ", 40, Fd)
                    ]),
                    _: 2
                  }, 1032, ["folder", "size"]),
                  n("span", Hd, v(S.folder.links.length), 1)
                ], 42, Nd)) : M("", !0)
              ], 64))), 128)),
              Zn.value.length ? M("", !0) : (l(), d("p", jd, v(us.value), 1))
            ]),
            _: 1
          }, 8, ["name"]))
        ], 40, Bd), [
          [so, i.value === "sites"]
        ])
      ], 32)) : M("", !0),
      s(re).hasTodo || s(re).hasBili ? (l(), d("div", zd, [
        s(re).hasTodo ? (l(), ce(Md, { key: 0 })) : s(re).hasBili ? (l(), d("div", Gd)) : M("", !0)
      ])) : M("", !0),
      (l(), ce(vt, { to: "body" }, [
        D.visible ? (l(), d("div", {
          key: 0,
          class: le(["launcher-drag-ghost", [
            D.type === "folder" ? `folder-ghost size-${D.folder?.size}` : "link-ghost"
          ]]),
          style: we({
            left: `${D.x}px`,
            top: `${D.y}px`
          })
        }, [
          D.type === "folder" && D.folder ? (l(), d(G, { key: 0 }, [
            n("div", Kd, [
              (l(!0), d(G, null, fe(ds(D.folder.links, D.folder.size), (S, I) => (l(), ce(nn, {
                key: S.id || I,
                link: S,
                mini: !0
              }, null, 8, ["link"]))), 128))
            ]),
            n("span", Vd, v(D.folder.groupName), 1)
          ], 64)) : D.link ? (l(), d(G, { key: 1 }, [
            q(nn, {
              link: D.link
            }, null, 8, ["link"]),
            n("span", Ud, v(D.link.title), 1)
          ], 64)) : M("", !0)
        ], 6)) : M("", !0)
      ])),
      q(s(o), {
        open: a.value,
        onClose: f
      }, null, 8, ["open"])
    ], 64));
  }
}), rs = /* @__PURE__ */ Ie(Yd, [["__scopeId", "data-v-55c2fa83"]]), qo = Object.keys(co);
let jo = !1, In = 0, bo, Mn;
function Li(e) {
  for (const t of qo)
    Object.prototype.hasOwnProperty.call(e, t) && (co[t] = e[t] !== !1);
}
function qd() {
  const e = co;
  Te.setPrefs(e.showSites, e.showTodo, !e.showTodo && e.showBili), document.body.classList.toggle("hide-weather", !e.showWeather), document.body.classList.toggle("hide-sites", !e.showSites), document.body.classList.toggle("hide-bili", !e.showBili), document.body.classList.toggle("hide-youtube", !e.showYouTube), document.body.classList.toggle("hide-todo", !e.showTodo), document.body.classList.toggle("hide-bookmarks", !e.showBookmarkPanel), e.showBookmarkPanel || sn.close();
}
const $i = {
  start() {
    if (jo) return;
    jo = !0;
    const e = ++In;
    Mn = Ye(() => qo.map((o) => co[o]), qd, { immediate: !0, flush: "sync" });
    const t = globalThis.chrome;
    bo = (o, i) => {
      if (i !== "local") return;
      const r = {};
      for (const a of qo) o[a] && (r[a] = o[a].newValue);
      Li(r);
    }, t?.storage?.onChanged?.addListener(bo), t?.storage?.local && t.storage.local.get(qo).then((o) => {
      jo && In === e && Li(o || {});
    }).catch((o) => console.warn("[HomePrefs] 读取首页设置失败", o));
  },
  stop() {
    jo = !1, In++, Mn?.(), Mn = void 0, bo && globalThis.chrome?.storage?.onChanged?.removeListener(bo), bo = void 0;
  }
}, Xd = {
  id: "launcher",
  class: "launcher",
  "aria-label": "快捷入口"
}, Jd = { class: "launcher-inner" }, Zd = { class: "launcher-overview" }, Qd = {
  class: "launcher-widget launcher-weather",
  "data-home-module": "weather",
  title: "右键此处可快速切换天气地点"
}, eu = { id: "weather-body" }, tu = { class: "launcher-center" }, ou = {
  class: "hero-clock",
  id: "hero-clock"
}, nu = {
  class: "launcher-widget launcher-task-threads launcher-music-card",
  "data-home-module": "taskThreads"
}, iu = {
  id: "task-thread-home",
  class: "task-thread-home home-music-body"
}, su = /* @__PURE__ */ de({
  __name: "AppLauncher",
  setup(e) {
    Ke(() => {
      Jo.initWallpaper();
    });
    function t() {
      Me.handleToolClick("music");
    }
    return (o, i) => (l(), d("section", Xd, [
      i[5] || (i[5] = n("div", {
        id: "hero-background-media",
        class: "hero-background-media",
        "aria-hidden": "true"
      }, null, -1)),
      n("div", Jd, [
        n("div", Zd, [
          Ne(n("section", Qd, [
            i[1] || (i[1] = n("header", { class: "card-head" }, [
              n("span", {
                class: "bar",
                style: { background: "linear-gradient(180deg,#38bdf8,#818cf8)" }
              }),
              n("h2", { id: "wx-title" }, "天气")
            ], -1)),
            n("div", eu, [
              q(ns)
            ])
          ], 512), [
            [so, s(co).showWeather]
          ]),
          n("div", tu, [
            n("div", ou, [
              q(Mc),
              q(is)
            ]),
            n("form", {
              id: "search",
              class: "search",
              onSubmit: i[0] || (i[0] = F(() => {
              }, ["prevent"]))
            }, [
              q(Mi)
            ], 32)
          ]),
          n("section", nu, [
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
            n("div", iu, [
              q(ss)
            ])
          ])
        ]),
        n("div", {
          id: "launcher-groups",
          class: le(["launcher-groups", { "has-sites": s(re).showSites, "has-todoist": s(re).hasTodo, "has-bili": s(re).hasBili, "has-media": s(re).hasTodo || s(re).hasBili }])
        }, [
          q(rs)
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
}), to = be(/* @__PURE__ */ new Set()), Dt = be({}), qe = be({});
function Dn(e) {
  const t = Je(e);
  if (!t?.lifecycle.canUnmount || t.lifecycle.canUnmount()) return { ok: !0 };
  const o = t.lifecycle.unmountBlockedMessage || "模块操作尚未结束，不能退出或重载。";
  return me.show({ appName: t.title, title: "操作进行中", message: o, showActions: !1 }), { ok: !1, error: o };
}
const Ae = {
  // 检查应用是否处于运行显示状态（驱动 Dock 上的小圆点：关闭即熄灭，不保留 macOS 风格后台悬浮绿点）
  isRunning(e) {
    return this.isVisible(e);
  },
  // 检查应用当前是否在屏幕上可见（窗口是否打开）
  isVisible(e) {
    const t = Je(e);
    return t ? t.lifecycle.isVisible() : hn(e) ? !!gr[e] : hr(e);
  },
  // 标记应用启动
  markRunning(e) {
    to.add(e), (e in qe || Je(e)) && (qe[e] = !0);
  },
  // 获取组件当前的 render key
  getRenderKey(e) {
    return Dt[e] || 0;
  },
  // 打开 / 显示应用窗口
  openApp(e) {
    const t = Je(e);
    if (t) {
      Me.open(e), t.lifecycle.isVisible() && this.markRunning(e);
      return;
    }
    if (this.markRunning(e), hn(e)) {
      si.open(e);
      return;
    }
    Me.open(e);
  },
  // 隐藏/关闭窗口：立即退出可见运行态并熄灭 Dock 指示绿点
  hideApp(e) {
    if (to.delete(e), Je(e)) {
      Me.close(e);
      return;
    }
    if (hn(e)) {
      si.close(e);
      return;
    }
    Me.close(e);
  },
  // 真正的关闭（Quit / 彻底从内存与 DOM 中卸载销毁，熄灭小圆点）
  async quitApp(e) {
    if (Je(e)) {
      const r = Dn(e);
      if (!r.ok) return r;
      const a = Je(e)?.lifecycle.beforeQuit;
      if (a) {
        const u = It(e);
        try {
          await a();
        } catch {
          const k = "后台停止未确认，窗口保留；未自动重试，请检查后台状态。";
          return me.show({ appName: Je(e).title, title: "未退出", message: k, showActions: !1 }), { ok: !1, error: k };
        }
        if (It(e) !== u) return { ok: !1, error: "窗口已有后续操作，未卸载。" };
        const x = Dn(e);
        if (!x.ok) return x;
      }
      const h = Me.close(e), f = It(e);
      return to.delete(e), qe[e] = !1, pt.removeActiveTool(e), await h, await ht(), It(e) === f ? { ok: !0 } : { ok: !1, error: "模块已有后续操作，退出状态已变化。" };
    }
    this.hideApp(e), to.delete(e), pt.removeActiveTool(e), e in qe && (qe[e] = !1);
    const t = fr;
    t.activeId === e && (t.activeId = "");
    const o = t.openOrder.indexOf(e);
    o >= 0 && t.openOrder.splice(o, 1);
    const i = t.activeTools.indexOf(e);
    i >= 0 && t.activeTools.splice(i, 1), Me.render();
  },
  // 重新加载（Reload / 单应用热重启，重新初始化组件）
  async reloadApp(e) {
    const t = Je(e);
    if (t) {
      if (t.lifecycle.canOpen && !t.lifecycle.canOpen()) return { ok: !1, error: "模块当前不能打开，未重载窗口。" };
      const o = Dn(e);
      if (!o.ok) return o;
      const i = Me.close(e), r = It(e);
      return await i, It(e) !== r ? { ok: !1, error: "模块已有后续操作，重载已取消。" } : (qe[e] = !1, await ht(), It(e) !== r ? { ok: !1, error: "模块已有后续操作，未重新打开。" } : (Dt[e] = (Dt[e] || 0) + 1, Me.open(e), t.lifecycle.isVisible() ? (this.markRunning(e), { ok: !0 }) : { ok: !1, error: "模块当前不能打开，未重新显示窗口。" }));
    }
    this.hideApp(e), e in qe ? (qe[e] = !1, await ht(), Dt[e] = (Dt[e] || 0) + 1, qe[e] = !0) : Dt[e] = (Dt[e] || 0) + 1, await ht(), this.openApp(e);
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
    i.mountPolicy === "workspace-ready" && Ae.markRunning(i.id), Ye(i.lifecycle.isVisible, (x) => {
      x && Ae.markRunning(i.id);
    }, { immediate: !0, flush: "sync" });
    const r = ae(() => !!qe[i.id]);
    function a() {
      try {
        i.lifecycle.hide();
      } catch {
      }
      (xt.activeId === i.id || xt.activeId === i.rootId) && (xt.activeId = null), Ae.hideApp(i.id), typeof document < "u" && document.body.classList.remove("has-card-fullscreen");
    }
    function h() {
      Ae.reloadApp(i.id);
    }
    function f() {
      typeof window < "u" && window.location.reload();
    }
    const u = z({
      loader: i.loadView,
      onError(x, k, T, g) {
        g <= 2 ? k() : T();
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
              onClick: a
            }, "返回首页")
          ])
        ]) : null
      })
    });
    return lo(() => {
      a(), to.delete(i.id), delete qe[i.id];
    }), (x, k) => r.value ? (l(), ce(Ei(s(u)), {
      key: s(Ae).getRenderKey(s(i).id)
    })) : M("", !0);
  }
}), ru = { class: "logicweaver-workspaces-layer" }, au = {
  key: 0,
  id: "daily-section",
  class: "wrap"
}, lu = { id: "vue-todoist-root" }, cu = { id: "vue-bili-favorites-root" }, du = { id: "vue-youtube-root" }, uu = { id: "vue-pricing-root" }, pu = { id: "vue-aihot-root" }, fu = /* @__PURE__ */ de({
  __name: "AppWorkspaces",
  setup(e) {
    const t = N(!!xt.activeId);
    return Ke(() => {
      t.value || (typeof window < "u" && "requestIdleCallback" in window ? window.requestIdleCallback(() => {
        t.value = !0;
      }, { timeout: 80 }) : setTimeout(() => {
        t.value = !0;
      }, 40));
    }), (o, i) => (l(), d("div", ru, [
      t.value ? (l(), d("main", au, [
        n("div", lu, [
          q(Kt, { id: "todoist" })
        ]),
        n("div", cu, [
          q(Kt, { id: "daily-bilibili" })
        ]),
        Ne(n("div", du, [
          q(Kt, { id: "daily-youtube" })
        ], 512), [
          [so, s(co).showYouTube]
        ]),
        n("div", uu, [
          q(Kt, { id: "daily-pricing" })
        ]),
        n("div", pu, [
          q(Kt, { id: "daily-aihot" })
        ]),
        q(Kt, { id: "card-github" })
      ])) : M("", !0)
    ]));
  }
}), gu = ["aria-label"], hu = { class: "dock-menu-head" }, mu = { class: "dock-menu-title" }, vu = ["src", "alt"], yu = {
  key: 1,
  class: "dock-menu-emoji"
}, wu = /* @__PURE__ */ de({
  __name: "DockContextMenu",
  props: {
    target: {}
  },
  emits: ["close", "action"],
  setup(e, { emit: t }) {
    const o = e, i = t, r = ae(() => !o.target || o.target.type !== "tool" ? !1 : Ae.isRunning(o.target.id)), a = ae(() => !o.target || o.target.type !== "tool" ? !1 : Ae.isVisible(o.target.id)), { menuRef: h, style: f } = Ri({
      visible: () => !!o.target,
      anchor: () => o.target || { x: 0, y: 0 },
      placement: Yt.position === "top" ? "below" : "above",
      align: "center",
      gap: 12,
      dismiss: () => i("close")
    });
    function u() {
      o.target && (Ae.openApp(o.target.id), i("close"));
    }
    function x() {
      o.target && (Ae.hideApp(o.target.id), i("close"));
    }
    async function k() {
      o.target && (await Ae.reloadApp(o.target.id), i("close"));
    }
    async function T() {
      if (!o.target) return;
      const c = o.target;
      if ((await Ae.quitApp(c.id))?.ok === !1) {
        i("close");
        return;
      }
      me.show({
        appName: c.title,
        title: "已退出应用",
        subtitle: "当前页面的应用已请求退出，不代表外部进程或远端任务已停止",
        icon: c.icon || "assets/logo.png",
        duration: 2800
      }), i("close");
    }
    async function g() {
      if (!o.target) return;
      const c = o.target, y = Mo.uninstall(c.id);
      i("close"), await y || me.show({
        appName: c.title,
        title: "入口停用未确认",
        subtitle: Mo.state.errorMessage || "请打开模块管理核对当前启用状态",
        icon: c.icon || "assets/logo.png",
        duration: 4e3
      });
    }
    function p() {
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
    return (c, y) => (l(), ce(vt, { to: "body" }, [
      e.target ? (l(), d("div", {
        key: 0,
        ref_key: "menuRef",
        ref: h,
        role: "group",
        "aria-label": `${e.target.title}操作`,
        class: "dock-context-menu",
        style: we(s(f)),
        onClick: y[1] || (y[1] = F(() => {
        }, ["stop"])),
        onContextmenu: y[2] || (y[2] = F(() => {
        }, ["prevent"]))
      }, [
        n("div", hu, [
          n("div", mu, [
            e.target.icon ? (l(), d("img", {
              key: 0,
              class: "dock-menu-icon",
              src: e.target.icon,
              alt: e.target.title
            }, null, 8, vu)) : e.target.emoji ? (l(), d("span", yu, v(e.target.emoji), 1)) : M("", !0),
            n("strong", null, v(e.target.title), 1)
          ]),
          e.target.type === "tool" ? (l(), d("span", {
            key: 0,
            class: le(["dock-status-tag", { "is-running": r.value }])
          }, [
            y[3] || (y[3] = n("span", { class: "dock-status-dot" }, null, -1)),
            Fe(" " + v(r.value ? "运行中" : "未启动"), 1)
          ], 2)) : M("", !0)
        ]),
        y[12] || (y[12] = n("div", { class: "dock-menu-divider" }, null, -1)),
        e.target.type === "tool" ? (l(), d(G, { key: 0 }, [
          a.value ? (l(), d("button", {
            key: 1,
            type: "button",
            class: "dock-menu-item",
            onClick: x
          }, [...y[5] || (y[5] = [
            n("span", { class: "dock-menu-symbol" }, "−", -1),
            n("span", null, "隐藏窗口", -1)
          ])])) : (l(), d("button", {
            key: 0,
            type: "button",
            class: "dock-menu-item",
            onClick: u
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
            onClick: T
          }, [...y[8] || (y[8] = [
            n("span", { class: "dock-menu-symbol" }, "✕", -1),
            n("div", { class: "dock-menu-text" }, [
              n("span", null, "真正的关闭"),
              n("small", null, "退出并释放内存")
            ], -1)
          ])])
        ], 64)) : e.target.type === "card" ? (l(), d("button", {
          key: 1,
          type: "button",
          class: "dock-menu-item",
          onClick: p
        }, [...y[10] || (y[10] = [
          n("span", { class: "dock-menu-symbol" }, "↗", -1),
          n("span", null, "在新标签页打开官网", -1)
        ])])) : (l(), d("button", {
          key: 2,
          type: "button",
          class: "dock-menu-item",
          onClick: y[0] || (y[0] = ($) => i("close"))
        }, [...y[11] || (y[11] = [
          n("span", { class: "dock-menu-symbol" }, "🏠", -1),
          n("span", null, "返回常用主页", -1)
        ])]))
      ], 44, gu)) : M("", !0)
    ]));
  }
}), bu = /* @__PURE__ */ Ie(wu, [["__scopeId", "data-v-3aa85877"]]), ku = { class: "mac-dock-shelf" }, _u = ["data-dock-target", "title", "onPointerdown", "onClick", "onContextmenu"], Cu = ["src", "alt"], xu = {
  key: 0,
  class: "mac-dock-dot",
  "aria-hidden": "true"
}, Lu = ["data-dock-tool", "title", "onPointerdown", "onClick", "onContextmenu"], $u = ["src", "alt"], Su = {
  key: 1,
  class: "mac-dock-emoji",
  "aria-hidden": "true"
}, Tu = {
  key: 2,
  class: "mac-dock-dot",
  "aria-hidden": "true"
}, Iu = {
  key: 3,
  class: "mac-dock-badge"
}, Mu = ["src"], Du = {
  key: 1,
  class: "mac-dock-emoji"
}, Au = /* @__PURE__ */ de({
  __name: "MacDock",
  setup(e) {
    const t = ae(() => Yt), o = N(null), i = ae(() => Object.fromEntries(Yt.tools.map((W) => {
      const H = Je(W.id)?.badgeCount?.() || 0;
      return [W.id, Number.isFinite(H) ? Math.max(0, Math.floor(H)) : 0];
    })));
    function r(W) {
      W.stopPropagation(), o.value = null, T(W.currentTarget), Mo.open();
    }
    function a(W, H) {
      H.stopPropagation(), o.value = null, T(H.currentTarget), pt.triggerItem("target", W);
    }
    function h(W, H) {
      const K = H.currentTarget.getBoundingClientRect(), ge = Yt.position, B = ge === "left" || ge === "right";
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
      W.stopPropagation(), o.value = null, T(W.currentTarget), pt.triggerItem("home", "home-launcher");
    }
    function u(W, H) {
      H.stopPropagation(), o.value = null, T(H.currentTarget), Je(W) || Ae.markRunning(W), pt.triggerItem("tool", W);
    }
    function x(W, H) {
      const K = H.currentTarget.getBoundingClientRect(), ge = Yt.position, B = ge === "left" || ge === "right";
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
    function T(W) {
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
    const g = N(null), p = be({
      visible: !1,
      x: 0,
      y: 0,
      width: 40,
      height: 40,
      item: null,
      type: "tool"
    }), c = N(null), y = N(null), $ = ae(() => c.value || t.value.cards), b = ae(() => y.value || t.value.tools);
    let L = "", A = 0, ee = !1, ne = 0;
    function E(W, H, P) {
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
      }, window.addEventListener("pointermove", w), window.addEventListener("pointerup", _), window.addEventListener("pointercancel", _);
    }
    function w(W) {
      if (!g.value) return;
      const H = W.clientX - g.value.startX, P = W.clientY - g.value.startY, K = Math.hypot(H, P);
      if (!ee && K > 5 && (ee = !0, p.visible = !0, p.item = g.value.item, p.type = g.value.type, p.width = g.value.width, p.height = g.value.height, g.value.type === "card" ? c.value = [...t.value.cards] : y.value = [...t.value.tools]), !ee) return;
      p.x = W.clientX - p.width / 2, p.y = W.clientY - p.height / 2;
      const B = document.elementsFromPoint(W.clientX, W.clientY).find(
        (_e) => _e.classList.contains("mac-dock-item") && !_e.classList.contains("mac-dock-market-btn")
      );
      if (!B) return;
      const O = B.getAttribute("data-dock-target"), R = B.getAttribute("data-dock-tool"), ve = g.value.type, We = g.value.id, Oe = Date.now();
      if (ve === "card" && O && O !== We && O !== "home-launcher") {
        const _e = B.getBoundingClientRect(), $e = _e.left + _e.width / 2;
        if (Math.abs(W.clientX - $e) > _e.width * 0.55 || O === L && Oe - A < 180) return;
        const Se = [...c.value || t.value.cards], Ve = Se.findIndex((He) => He.id === We), Ze = Se.findIndex((He) => He.id === O);
        if (Ve >= 0 && Ze >= 0 && Ve !== Ze) {
          const He = Se.splice(Ve, 1)[0];
          Se.splice(Ze, 0, He), c.value = Se, L = O, A = Oe;
        }
      } else if (ve === "tool" && R && R !== We) {
        const _e = B.getBoundingClientRect(), $e = _e.left + _e.width / 2;
        if (Math.abs(W.clientX - $e) > _e.width * 0.55 || R === L && Oe - A < 180) return;
        const Se = [...y.value || t.value.tools], Ve = Se.findIndex((He) => He.id === We), Ze = Se.findIndex((He) => He.id === R);
        if (Ve >= 0 && Ze >= 0 && Ve !== Ze) {
          const He = Se.splice(Ve, 1)[0];
          Se.splice(Ze, 0, He), y.value = Se, L = R, A = Oe;
        }
      }
    }
    function _() {
      window.removeEventListener("pointermove", w), window.removeEventListener("pointerup", _), window.removeEventListener("pointercancel", _), ee && g.value && (ne = Date.now() + 250, g.value.type === "card" && c.value ? pt.reorderCards(c.value.map((W) => W.id)) : g.value.type === "tool" && y.value && pt.reorderTools(y.value.map((W) => W.id))), p.visible = !1, p.item = null, c.value = null, y.value = null, g.value = null, ee = !1, L = "";
    }
    function D(W, H) {
      Date.now() < ne || a(W, H);
    }
    function Y(W, H) {
      Date.now() < ne || u(W, H);
    }
    return lo(() => {
      for (const W of k.values()) W.cancel();
      k.clear(), window.removeEventListener("pointermove", w), window.removeEventListener("pointerup", _), window.removeEventListener("pointercancel", _);
    }), (W, H) => (l(), d(G, null, [
      n("div", ku, [
        q(Xo, {
          tag: "div",
          class: "mac-dock-group mac-dock-cards-group",
          name: "dock-item-motion"
        }, {
          default: no(() => [
            (l(!0), d(G, null, fe($.value, (P) => (l(), d("button", {
              key: P.id,
              class: le(["mac-dock-item", {
                "is-active": t.value.activeTargetId === P.id,
                "is-drag-origin": g.value && g.value.id === P.id
              }]),
              type: "button",
              "data-dock-target": P.id,
              title: P.title,
              onPointerdown: (K) => E("card", P, K),
              onClick: F((K) => D(P.id, K), ["stop"]),
              onContextmenu: F((K) => h(P, K), ["prevent"])
            }, [
              n("img", {
                class: "mac-dock-icon",
                src: P.icon,
                alt: P.title
              }, null, 8, Cu),
              t.value.activeTargetId === P.id ? (l(), d("span", xu)) : M("", !0)
            ], 42, _u))), 128))
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
          onClick: H[0] || (H[0] = F((P) => f(P), ["stop"]))
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
        q(Xo, {
          tag: "div",
          class: "mac-dock-group mac-dock-tools-group",
          name: "dock-item-motion"
        }, {
          default: no(() => [
            (l(!0), d(G, null, fe(b.value, (P) => (l(), d("button", {
              key: P.id,
              class: le(["mac-dock-item", {
                "is-active": s(Ae).isRunning(P.id),
                "is-drag-origin": g.value && g.value.id === P.id
              }]),
              type: "button",
              "data-dock-tool": P.id,
              title: P.title,
              onPointerdown: (K) => E("tool", P, K),
              onClick: F((K) => Y(P.id, K), ["stop"]),
              onContextmenu: F((K) => x(P, K), ["prevent"])
            }, [
              P.icon ? (l(), d("img", {
                key: 0,
                class: "mac-dock-icon",
                src: P.icon,
                alt: P.title
              }, null, 8, $u)) : P.emoji ? (l(), d("span", Su, v(P.emoji), 1)) : M("", !0),
              s(Ae).isRunning(P.id) ? (l(), d("span", Tu)) : M("", !0),
              i.value[P.id] > 0 ? (l(), d("span", Iu, v(i.value[P.id] > 99 ? "99+" : i.value[P.id]), 1)) : M("", !0)
            ], 42, Lu))), 128))
          ]),
          _: 1
        }),
        n("button", {
          class: le(["mac-dock-item mac-dock-market-btn", { "is-active": s(Mo).state.isOpen }]),
          type: "button",
          title: "模块与全屏插件管理",
          onClick: H[1] || (H[1] = F((P) => r(P), ["stop"]))
        }, [...H[4] || (H[4] = [
          n("span", {
            class: "mac-dock-market-icon",
            "aria-hidden": "true"
          }, "🧩", -1)
        ])], 2)
      ]),
      (l(), ce(vt, { to: "body" }, [
        p.visible && p.item ? (l(), d("div", {
          key: 0,
          class: "mac-dock-drag-ghost",
          style: we({
            width: p.width + "px",
            height: p.height + "px",
            transform: "translate3d(" + p.x + "px," + p.y + "px, 0)"
          }),
          "aria-hidden": "true"
        }, [
          p.item.icon ? (l(), d("img", {
            key: 0,
            class: "mac-dock-icon",
            src: p.item.icon,
            alt: ""
          }, null, 8, Mu)) : p.item.emoji ? (l(), d("span", Du, v(p.item.emoji), 1)) : M("", !0)
        ], 4)) : M("", !0)
      ])),
      q(bu, {
        target: o.value,
        onClose: H[2] || (H[2] = (P) => o.value = null)
      }, null, 8, ["target"])
    ], 64));
  }
}), as = /* @__PURE__ */ Ie(Au, [["__scopeId", "data-v-4528a5df"]]), Eu = {
  id: "win-toast-container",
  class: "win-toast-container",
  "aria-live": "polite",
  "aria-relevant": "additions"
}, Pu = ["data-toast-fingerprint", "onMouseenter", "onMouseleave"], Wu = { class: "win-toast-head" }, Ou = ["src"], Bu = { class: "win-toast-app" }, Ru = ["onClick"], Nu = ["onClick"], Fu = { class: "win-toast-title" }, Hu = {
  key: 0,
  class: "win-toast-subtitle"
}, ju = {
  key: 1,
  class: "win-toast-snippet"
}, zu = {
  key: 0,
  class: "win-toast-actions"
}, Gu = ["onClick"], Ku = ["onClick"], Vu = /* @__PURE__ */ de({
  __name: "NotificationHost",
  setup(e) {
    const t = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), r = N({}), a = N({});
    let h = null;
    function f(c) {
      const y = t.get(c);
      y !== void 0 && clearTimeout(y), t.delete(c);
    }
    function u(c, y = c.duration) {
      f(c.id), i.set(c.id, y), o.set(c.id, Date.now()), a.value[c.id] = !1, r.value[c.id] = Math.max(0, Math.min(100, y / c.duration * 100)), ht(() => requestAnimationFrame(() => {
        r.value[c.id] = 0;
      })), t.set(c.id, window.setTimeout(() => {
        t.delete(c.id), me.close(c.id);
      }, y));
    }
    function x(c) {
      f(c.id);
      const y = Date.now() - (o.get(c.id) || Date.now()), $ = Math.max(0, (i.get(c.id) ?? c.duration) - y);
      i.set(c.id, $), a.value[c.id] = !0, r.value[c.id] = Math.max(0, Math.min(100, $ / c.duration * 100));
    }
    function k(c) {
      u(c, Math.max(1500, i.get(c.id) ?? c.duration));
    }
    function T(c) {
      f(c.id), me.close(c.id);
    }
    function g(c) {
      if (Lt.markRead(c.id), T(c), !c.onClick) {
        c.target && Lt.openTarget(c.target);
        return;
      }
      try {
        Promise.resolve(c.onClick()).catch((y) => console.warn("Notification action failed", y));
      } catch (y) {
        console.warn("Notification action failed", y);
      }
    }
    function p(c) {
      const y = Math.max(500, i.get(c.id) ?? c.duration);
      return {
        width: `${r.value[c.id] ?? 100}%`,
        transition: a.value[c.id] ? "none" : `width ${y}ms linear`
      };
    }
    return Ke(() => {
      h = new MutationObserver(() => {
        const y = new Set(Ao.map(($) => $.id));
        for (const $ of Ao)
          !$.closing && !t.has($.id) && !i.has($.id) && u($);
        for (const $ of i.keys())
          y.has($) || (f($), i.delete($), o.delete($), delete r.value[$], delete a.value[$]);
      });
      const c = document.getElementById("win-toast-container");
      c && h.observe(c, { childList: !0 });
      for (const y of Ao) u(y);
    }), lo(() => {
      h?.disconnect(), h = null;
      for (const c of t.values()) clearTimeout(c);
      t.clear();
    }), (c, y) => (l(), ce(vt, { to: "body" }, [
      n("div", Eu, [
        q(Xo, { name: "win-toast" }, {
          default: no(() => [
            (l(!0), d(G, null, fe(s(Ao), ($) => (l(), d("article", {
              key: $.id,
              class: le(["win-toast-card", [$.appType, { closing: $.closing }]]),
              "data-toast-fingerprint": $.fingerprint,
              onMouseenter: (b) => x($),
              onMouseleave: (b) => k($)
            }, [
              n("header", Wu, [
                n("img", {
                  src: $.icon,
                  class: "win-toast-icon",
                  alt: ""
                }, null, 8, Ou),
                n("span", Bu, v($.appName), 1),
                y[0] || (y[0] = n("span", { class: "win-toast-time" }, "刚刚", -1)),
                n("button", {
                  type: "button",
                  class: "win-toast-close",
                  title: "关闭",
                  "aria-label": "关闭通知",
                  onClick: (b) => T($)
                }, "✕", 8, Ru)
              ]),
              n("button", {
                type: "button",
                class: "win-toast-body win-toast-body-button",
                onClick: (b) => g($)
              }, [
                n("span", Fu, v($.title), 1),
                $.subtitle ? (l(), d("span", Hu, v($.subtitle), 1)) : M("", !0),
                $.message ? (l(), d("span", ju, v($.message), 1)) : M("", !0)
              ], 8, Nu),
              $.showActions && $.actionLabel ? (l(), d("footer", zu, [
                n("button", {
                  type: "button",
                  class: "win-toast-btn primary",
                  onClick: (b) => g($)
                }, v($.actionLabel), 9, Gu),
                n("button", {
                  type: "button",
                  class: "win-toast-btn",
                  onClick: (b) => T($)
                }, "关闭", 8, Ku)
              ])) : M("", !0),
              n("div", {
                class: "win-toast-progress",
                style: we(p($))
              }, null, 4)
            ], 42, Pu))), 128))
          ]),
          _: 1
        })
      ])
    ]));
  }
}), ls = /* @__PURE__ */ Ie(Vu, [["__scopeId", "data-v-8ecd30bd"]]), Uu = ["id"], Yu = /* @__PURE__ */ de({
  __name: "DockModuleHost",
  setup(e) {
    const t = Bi().filter((o) => o.presentation !== "card").map((o) => {
      Ye(o.lifecycle.isVisible, (r) => {
        r && Ae.markRunning(o.id);
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
                Ae.reloadApp(o.id);
              }
            }, "↻ 重试"),
            Re("button", {
              type: "button",
              style: "padding: 5px 10px; border-radius: 6px; border: 1px solid var(--border); background: var(--surface); color: var(--text); cursor: pointer; font-size: 12px;",
              onClick: () => {
                Ae.hideApp(o.id);
              }
            }, "隐藏")
          ])
        ])
      });
      return {
        definition: o,
        mounted: ae(() => !!qe[o.id]),
        view: z({
          loader: o.loadView,
          onError(r, a, h, f) {
            f <= 2 ? a() : h();
          },
          errorComponent: i
        })
      };
    });
    return lo(() => {
      for (const { definition: o } of t)
        Me.close(o.id), to.delete(o.id), qe[o.id] = !1;
    }), (o, i) => (l(!0), d(G, null, fe(s(t), (r) => Ne((l(), d("div", {
      id: r.definition.rootId,
      key: r.definition.id
    }, [
      r.mounted.value ? (l(), ce(Ei(r.view), {
        key: s(Ae).getRenderKey(r.definition.id)
      })) : M("", !0)
    ], 8, Uu)), [
      [so, r.definition.lifecycle.isVisible()]
    ])), 128));
  }
}), qu = /* @__PURE__ */ Ie(Yu, [["__scopeId", "data-v-3f131313"]]);
function ze(e, t) {
  const o = N(!1);
  return Ye(
    e,
    (i) => {
      i && (o.value = !0);
    },
    { immediate: !0, flush: "sync" }
  ), $t(o);
}
const Xu = ["onKeydown"], Ju = { class: "fo-up-preview-head" }, Zu = ["src"], Qu = { class: "fo-up-preview-meta" }, ep = { class: "fo-up-preview-name-row" }, tp = ["href"], op = ["disabled"], np = { class: "fo-up-preview-sign" }, ip = { class: "fo-up-preview-videos" }, sp = {
  key: 0,
  class: "fo-up-preview-loading"
}, rp = {
  key: 1,
  class: "fo-up-preview-empty"
}, ap = {
  key: 2,
  class: "fo-up-preview-empty"
}, lp = ["href", "title", "onClick"], cp = ["src"], dp = {
  key: 0,
  class: "fo-bili-duration"
}, up = { class: "fo-up-preview-video-info" }, pp = ["href", "title", "onClick"], fp = { class: "fo-up-preview-video-meta" }, gp = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2394a3b8'%3E%3Cpath d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/%3E%3C/svg%3E", hp = /* @__PURE__ */ de({
  __name: "BiliUpPreview",
  setup(e) {
    const t = N(!1);
    function o() {
      if (!pe.submitting) {
        if (!pe.followed) {
          t.value = !1, Yo.toggleFollow();
          return;
        }
        if (!t.value) {
          t.value = !0;
          return;
        }
        t.value = !1, Yo.toggleFollow();
      }
    }
    function i() {
      t.value = !1, Yo.close();
    }
    function r(a, h) {
      a.ctrlKey || a.metaKey || (a.preventDefault(), a.stopPropagation(), h.bvid ? (Wn.openVideo({
        bvid: h.bvid,
        title: h.title,
        cover: h.cover,
        author: pe.name,
        authorFace: pe.face,
        mid: pe.mid,
        url: h.url
      }), i()) : h.url && h.url !== "#" && window.open(h.url, "_blank"));
    }
    return (a, h) => s(pe).open ? (l(), d("div", {
      key: 0,
      class: "fo-up-preview-backdrop",
      onPointerdown: F(i, ["self"])
    }, [
      n("aside", {
        class: "fo-up-preview-popover",
        style: we({ left: `${s(pe).left}px`, top: `${s(pe).top}px` }),
        onKeydown: Nt(F(i, ["stop", "prevent"]), ["esc"])
      }, [
        n("div", Ju, [
          n("img", {
            class: "fo-up-preview-avatar",
            src: s(pe).face || gp,
            alt: "",
            referrerpolicy: "no-referrer"
          }, null, 8, Zu),
          n("div", Qu, [
            n("div", ep, [
              n("a", {
                class: "fo-up-preview-name",
                href: `https://space.bilibili.com/${s(pe).mid}`,
                target: "_blank",
                rel: "noreferrer"
              }, v(s(pe).name), 9, tp),
              n("button", {
                type: "button",
                class: le([
                  s(pe).followed ? "fo-up-preview-unfollow" : "fo-up-preview-follow",
                  { "is-armed": t.value }
                ]),
                disabled: s(pe).submitting,
                onClick: o
              }, v(s(pe).submitting ? "处理中…" : t.value ? "确定取消？" : s(pe).followed ? "取消关注" : "＋ 关注"), 11, op)
            ]),
            n("p", np, v(s(pe).sign || "暂无个人简介"), 1)
          ]),
          n("button", {
            type: "button",
            class: "fo-up-preview-close",
            "aria-label": "关闭预览",
            onClick: i
          }, "✕")
        ]),
        h[1] || (h[1] = n("div", { class: "fo-up-preview-title-tag" }, "近期投稿视频（最新 2~3 个）", -1)),
        n("div", ip, [
          s(pe).loading ? (l(), d("div", sp, [...h[0] || (h[0] = [
            n("i", null, null, -1),
            n("span", null, "正在读取近期投稿…", -1)
          ])])) : s(pe).error ? (l(), d("p", rp, v(s(pe).error), 1)) : s(pe).videos.length ? (l(!0), d(G, { key: 3 }, fe(s(pe).videos, (f) => (l(), d("article", {
            key: f.bvid,
            class: "fo-up-preview-video"
          }, [
            n("a", {
              class: "fo-up-preview-thumb",
              href: f.url,
              title: `就地播放「${f.title}」（Ctrl+点击在网页打开）`,
              onClick: (u) => r(u, f)
            }, [
              n("img", {
                src: f.cover,
                alt: "",
                loading: "lazy",
                referrerpolicy: "no-referrer"
              }, null, 8, cp),
              f.duration ? (l(), d("span", dp, v(f.duration), 1)) : M("", !0)
            ], 8, lp),
            n("div", up, [
              n("a", {
                class: "fo-up-preview-video-title",
                href: f.url,
                title: `就地播放「${f.title}」（Ctrl+点击在网页打开）`,
                onClick: (u) => r(u, f)
              }, v(f.title), 9, pp),
              n("div", fp, [
                n("span", null, "▣ " + v(f.playCount), 1),
                n("span", null, v(f.published), 1)
              ])
            ])
          ]))), 128)) : (l(), d("p", ap, "该 UP 主近期暂无视频动态"))
        ])
      ], 44, Xu)
    ], 32)) : M("", !0);
  }
}), mp = /* @__PURE__ */ Ie(hp, [["__scopeId", "data-v-3fedd7f1"]]), vp = { class: "logicweaver-overlays-layer" }, yp = { id: "vue-notification-root" }, wp = {
  id: "bili-profile-menu",
  class: "bili-profile-menu",
  hidden: ""
}, bp = { id: "vue-bili-message-panel-root" }, kp = { id: "vue-notification-center-root" }, _p = { id: "vue-tab-manager-root" }, Cp = { id: "vue-bookmark-menu-root" }, xp = { id: "vue-bookmark-panel-root" }, Lp = { id: "vue-launcher-dialogs-root" }, $p = { id: "vue-launcher-folder-root" }, Sp = { id: "vue-launcher-menus-root" }, Tp = { id: "vue-settings-dialog-root" }, Ip = { id: "vue-clock-settings-root" }, Mp = { id: "vue-bili-theater-root" }, Dp = { id: "vue-bili-mini-player-root" }, Ap = { id: "vue-ai-dialog-root" }, Ep = { id: "vue-aihot-viewer-root" }, Pp = { id: "vue-nav-wheel-root" }, Wp = { id: "vue-github-detail-root" }, Op = { id: "vue-bili-subtitle-modal-root" }, Bp = { id: "vue-firecrawl-modal-root" }, Rp = { id: "vue-floating-image-viewer-root" }, Np = { id: "vue-command-palette-root" }, Fp = /* @__PURE__ */ de({
  __name: "AppOverlays",
  setup(e) {
    const t = ze(() => Mo.state.isOpen), o = ze(() => Wi.isOpen), i = ze(() => Uo.isOpen), r = ze(() => Ot.state.isOpen), a = ze(() => _r.open), h = ze(() => To.state.isOpen), f = ze(() => Ks.isOpen), u = ze(() => br.isOpen), x = ze(() => Xn.state.isOpen), k = ze(() => Zs.isOpen), T = ze(() => Pe.isOpen), g = ze(() => Hn.isOpen);
    let p;
    Ke(() => {
      p = Qa();
    }), St(() => {
      p?.();
    });
    const c = ze(() => Kn.state.isOpen), y = ze(() => Xe.isOpen), $ = ze(() => zt.editDialog.isOpen || zt.iconPicker.isOpen || zt.linkMove.isOpen || zt.folderMove.isOpen || zt.groupMerge.isOpen || zt.folderDelete.isOpen), b = z(() => import("./ProfileMenu-DwdzHMIn.js")), L = z(() => import("./BookmarkNoteMenu-C9OAO2ZF.js")), A = z(() => import("./BookmarkPanel-CkbynGXf.js")), ee = z(() => import("./ClockSettingsMenu-BwC0vASG.js")), ne = z(() => import("./NotificationCenter-CRFcKTbj.js")), E = z(() => import("./TabManagerPanel-C9gaaxJh.js")), w = z(() => import("./LauncherDialogs-BXbIfOSJ.js")), _ = z(() => import("./LauncherFolderDialog-Bjqdb0As.js")), D = z(() => import("./LauncherMenus-BqT6tU-e.js")), Y = z(() => import("./SettingsDialog-D9ocZJaZ.js")), W = z(() => import("./BiliMiniPlayer-B2vwGWsL.js")), H = z(() => import("./BiliTheaterDialog-DYbaJcN-.js")), P = z(() => import("./BiliMessagePanel-DPcxDJIa.js")), K = z(() => import("./AiDialog-B6xBOvTG.js")), ge = z(() => import("./AihotViewer-BEdldf2-.js")), B = z(() => import("./NavWheelOverlay-C64T-k1Y.js")), O = z(() => import("./GitHubRepoDetailDrawer-QGxDdqxy.js")), R = z(() => import("./InPageSideDrawer-DV8U4IOO.js")), ve = z(() => import("./BiliSubtitleModal-Hvqh5IEM.js")), We = z(() => import("./FirecrawlModal-b-IrdSud.js")), Oe = z(() => import("./FloatingImageViewer-NLsIps1Z.js")), _e = z(() => import("./CommandPalette-BWSV4Rfl.js")), $e = z(() => import("./AppPromptModal-BQMu9TVI.js")), Se = z(async () => {
      const [Ve, Ze] = await Promise.all([
        import("./PluginMarketDialog-p8am5cHI.js"),
        import("./plugin-market-B6zN10fA.js")
      ]);
      return Gs("logicweaver-market-styles", Ze.default), Ve.default;
    });
    return (Ve, Ze) => (l(), d("div", vp, [
      n("div", yp, [
        q(ls)
      ]),
      n("div", wp, [
        q(s(b))
      ]),
      n("div", bp, [
        s(u) ? (l(), ce(s(P), { key: 0 })) : M("", !0)
      ]),
      n("div", kp, [
        s(o) ? (l(), ce(s(ne), { key: 0 })) : M("", !0)
      ]),
      n("div", _p, [
        s(i) ? (l(), ce(s(E), { key: 0 })) : M("", !0)
      ]),
      n("div", Cp, [
        s(c) ? (l(), ce(s(L), { key: 0 })) : M("", !0)
      ]),
      n("div", xp, [
        q(s(A))
      ]),
      n("div", Lp, [
        s($) ? (l(), ce(s(w), { key: 0 })) : M("", !0)
      ]),
      n("div", $p, [
        s(y) ? (l(), ce(s(_), { key: 0 })) : M("", !0)
      ]),
      n("div", Sp, [
        q(s(D))
      ]),
      n("div", Tp, [
        q(s(Y))
      ]),
      n("div", Ip, [
        s(r) ? (l(), ce(s(ee), { key: 0 })) : M("", !0)
      ]),
      n("div", Mp, [
        s(h) ? (l(), ce(s(H), { key: 0 })) : M("", !0)
      ]),
      n("div", Dp, [
        s(f) ? (l(), ce(s(W), { key: 0 })) : M("", !0)
      ]),
      n("div", Ap, [
        s(x) ? (l(), ce(s(K), { key: 0 })) : M("", !0)
      ]),
      n("div", Ep, [
        s(a) ? (l(), ce(s(ge), { key: 0 })) : M("", !0)
      ]),
      n("div", Pp, [
        q(s(B))
      ]),
      q(qu),
      n("div", Wp, [
        s(k) ? (l(), ce(s(O), { key: 0 })) : M("", !0)
      ]),
      n("div", Op, [
        q(s(ve))
      ]),
      n("div", Bp, [
        q(s(We))
      ]),
      n("div", Rp, [
        q(s(Oe))
      ]),
      n("div", Np, [
        s(T) ? (l(), ce(s(_e), { key: 0 })) : M("", !0)
      ]),
      s(g) ? (l(), ce(s(R), { key: 0 })) : M("", !0),
      q(mp),
      q(s($e)),
      s(t) ? (l(), ce(s(Se), { key: 1 })) : M("", !0)
    ]));
  }
});
let An = !1;
function Hp(e = 1800) {
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
const jp = ["data-active-workspace"], zp = /* @__PURE__ */ de({
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
    function a(u, x = "image/svg+xml") {
      if (typeof document > "u") return;
      const k = typeof chrome < "u" && chrome.runtime?.getURL ? chrome.runtime.getURL(u) : u;
      if (r === k) return;
      r = k;
      const T = document.querySelectorAll("link[rel*='icon']");
      if (T.length > 0)
        T.forEach((g) => {
          g.type = x, g.href = k;
        });
      else {
        const g = document.createElement("link");
        g.rel = "icon", g.type = x, g.href = k, document.head.appendChild(g);
      }
    }
    function h() {
      if (typeof document > "u") return;
      const u = i[Eo.value] || i.home;
      if (a(u.icon, u.iconType), U.playing && U.title) {
        const x = U.artist ? ` - ${U.artist}` : "";
        document.title = `▶ ${U.title}${x}`;
        return;
      }
      if (fo.playing && fo.title) {
        document.title = `▶ ${fo.title} · 电台`;
        return;
      }
      document.title = u.title;
    }
    Ye(
      [
        () => Eo.value,
        () => U.playing,
        () => U.title,
        () => U.artist,
        () => fo.playing,
        () => fo.title
      ],
      () => {
        h();
      },
      { immediate: !0 }
    );
    const f = ae(() => Eo.value === "home" ? "" : Eo.value);
    return Ye(() => xt.activeId, (u) => {
      document.body.classList.toggle("has-card-fullscreen", !!u);
    }, { immediate: !0, flush: "sync" }), Ke(() => {
      typeof document < "u" && (document.body.dataset.spa = "1");
      try {
        Nn.bindGlobalListener(), Ge.start(), $i.start(), Fn.init().catch((u) => console.warn("[Launcher] 初始化失败", u)), Hp(), typeof chrome < "u" && chrome?.runtime?.sendMessage && setTimeout(() => {
          try {
            chrome.runtime.sendMessage({ type: "cleanupNativeTabs" }, () => {
              chrome.runtime?.lastError;
            });
          } catch {
          }
        }, 400);
      } catch (u) {
        console.warn("[App] Runtime start error:", u);
      }
    }), St(() => {
      Ge.stop(), Fn.stop(), $i.stop(), document.body.classList.remove("has-card-fullscreen"), typeof document < "u" && o && (document.title = o);
    }), t({
      activeWorkspaceId: f,
      windowManagerController: Me
    }), (u, x) => (l(), d("div", {
      id: "logicweaver-spa-root",
      class: "logicweaver-spa-root",
      "data-active-workspace": f.value || ""
    }, [
      q(la),
      q(cl),
      q(su),
      q(fu),
      n("nav", {
        id: "mac-dock",
        class: le(["mac-dock", "dock-" + s(Yt).position]),
        "aria-label": "快捷应用栏"
      }, [
        q(as)
      ], 2),
      q(Fp)
    ], 8, jp));
  }
}), Gp = /* @__PURE__ */ Ie(zp, [["__scopeId", "data-v-5d2f948f"]]), Kp = {
  class: "endfield-stage",
  "aria-hidden": "true"
}, Vp = {
  class: "rhinelab-stage",
  "aria-hidden": "true"
}, Up = { class: "rhine-scaler" }, Yp = { class: "rhine-center-group" }, qp = { class: "rhine-auth-status" }, Xp = { class: "rhine-auth-text" }, Jp = ["hidden"], Zp = { class: "rhine-cinema-caption" }, Qp = /* @__PURE__ */ de({
  __name: "IntroAnimation",
  setup(e) {
    const t = N(window.innerHeight), o = N(window.innerWidth), i = N(!1), r = N(!1), a = N(10), h = N(1), f = N(0), u = /* @__PURE__ */ new Set();
    let x = 0, k = () => {
    };
    const T = ae(() => `${String(Math.round(tt.renderedProgress)).padStart(2, "0")}%`), g = ae(() => {
      const w = tt.renderedProgress / 100 * t.value + 10;
      return `${Math.min(w, Math.max(0, t.value - 102)).toFixed(1)}px`;
    }), p = ae(() => tt.renderedProgress >= 75 ? "START PROCESSING..." : tt.renderedProgress >= 35 ? "REQUEST RECEIVED" : "ID CONFIRMED : JOYCE MOORE"), c = ae(() => tt.finished ? "身份验证通过 · 欢迎进入终端" : tt.status ? `身份信息确认 · ${tt.status.replace(/^.*?\/\s*/, "")}` : "身份信息确认：JOYCE MOORE"), y = ae(() => String(Math.max(0.35, Math.min(o.value / 1920, t.value / 1080))));
    function $(w, _) {
      const D = window.setTimeout(() => {
        u.delete(D), w();
      }, _);
      u.add(D);
    }
    function b() {
      window.dispatchEvent(new CustomEvent("logicweaver:intro-complete"));
    }
    function L(w) {
      if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
        b();
        return;
      }
      const _ = w ? 180 : 260, D = w ? 200 : 280, Y = performance.now(), W = (H) => {
        const P = H - Y, K = Math.min(1, P / _), ge = 1 - Math.pow(1 - K, 3);
        if (a.value = 10 + ge * Math.max(0, o.value - 10), P > _ && (h.value = Math.max(0, 1 - (P - _) / D)), P >= _ + D) {
          b();
          return;
        }
        x = requestAnimationFrame(W);
      };
      $(() => {
        x = requestAnimationFrame(W);
      }, w ? 60 : 120);
    }
    function A(w) {
      w || (i.value = !0), $(() => {
        r.value = !0, f.value = 6, h.value = 0, $(b, 380);
      }, w ? 40 : 420);
    }
    function ee(w) {
      tt.style === "rhinelab" ? A(w) : L(w);
    }
    function ne() {
      o.value = window.innerWidth, t.value = window.innerHeight;
    }
    function E(w) {
      tt.finished || (w.key === "Enter" || w.key === " " || w.key === "Escape") && (w.preventDefault(), lt.skip("KEYBOARD SKIP"));
    }
    return Ke(() => {
      document.documentElement.dataset.startupStyle = tt.style, document.documentElement.style.setProperty("--rhine-scale", y.value), window.addEventListener("resize", ne, { passive: !0 }), window.addEventListener("keydown", E, !0), k = Wr(ee), Gi();
    }), lo(() => {
      k(), window.removeEventListener("resize", ne), window.removeEventListener("keydown", E, !0), cancelAnimationFrame(x);
      for (const w of u) clearTimeout(w);
      u.clear();
    }), (w, _) => (l(), d("div", {
      class: "intro-vue-content",
      style: we({ "--rhine-scale": y.value, opacity: h.value, filter: `blur(${f.value}px)` })
    }, [
      n("div", Kp, [
        _[2] || (_[2] = n("div", { class: "endfield-loader-texture" }, null, -1)),
        _[3] || (_[3] = n("div", { class: "endfield-loader-rail" }, null, -1)),
        n("div", {
          class: "endfield-loader-fill",
          style: we({ height: `${s(tt).renderedProgress}%` })
        }, null, 4),
        n("div", {
          class: "endfield-loader-meter",
          style: we({ top: g.value })
        }, [
          _[1] || (_[1] = n("span", { class: "endfield-loader-tick" }, null, -1)),
          n("b", null, v(T.value), 1),
          n("small", null, v(s(tt).status), 1)
        ], 4),
        _[4] || (_[4] = ko('<section class="endfield-loader-brand"><span class="endfield-loader-kicker">DEEPSEEK HARNESS</span><strong>END</strong><strong>FIELD</strong><span class="endfield-loader-detail"><i class="endfield-loader-chevron"></i><span>EDGE INTELLIGENCE THEME</span><small>TERRA RESEARCH COMMISSION / BOOT SEQUENCE</small><span class="endfield-loader-squares"><i class="on"></i><i class="on"></i><i class="on"></i><i></i><i></i><i></i><i class="on"></i><i class="on"></i><i></i><i></i><i></i><i></i></span></span><em>OVER THE FRONTIER / INTO THE FRONT</em></section>', 1)),
        n("div", {
          class: "endfield-loader-wipe",
          style: we({ width: `${a.value}px`, opacity: a.value > 10 ? 1 : 0 })
        }, null, 4)
      ]),
      n("div", Vp, [
        _[12] || (_[12] = ko('<div class="rhine-background"><svg viewBox="0 0 1920 1080" preserveAspectRatio="none"><g fill="none" stroke="#ffffff" stroke-width="2.5"><path class="rhine-drift-path1" d="M-210 705C-45 705 182 704 247 567C337 377 99 306 4 435S27 680 169 631C309 584 227 314 279 111S568-113 568-113"></path><path class="rhine-drift-path2" d="M1560-80C1374 114 1671 168 1601 323S1371 367 1431 480S1692 666 1559 787S1329 886 1498 1130"></path><circle class="rhine-drift-circle" cx="1450" cy="648" r="346"></circle><circle class="rhine-drift-circle2" cx="1450" cy="648" r="348"></circle></g></svg></div>', 1)),
        n("div", Up, [
          _[10] || (_[10] = ko('<header class="rhine-brand"><h1>RHINE LAB</h1><div class="rhine-brand-sub">SYNTHESIZE INFORMATION</div><p class="rhine-brand-os"><span class="rhine-brand-analysis"><span style="left:2px;">A</span><span style="left:28px;">N</span><span style="left:55px;">A</span><span style="left:81px;">L</span><span style="left:103px;">Y</span><span style="left:129px;">S</span><span style="left:154px;">I</span><span style="left:166px;">S</span></span><b>OS</b></p></header>', 1)),
          n("button", {
            class: "rhine-skip",
            type: "button",
            title: "点击进入系统 (或按 Enter)",
            onClick: _[0] || (_[0] = (D) => s(lt).skip("ENTER SYSTEM"))
          }, [..._[5] || (_[5] = [
            Fe("ENTER SYSTEM ", -1),
            n("span", null, "↗", -1)
          ])]),
          n("div", Yp, [
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
            n("div", qp, [
              _[6] || (_[6] = n("span", { class: "rhine-auth-dot" }, "·", -1)),
              n("span", Xp, v(p.value), 1),
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
            ko('<svg viewBox="0 0 1920 1080" aria-hidden="true"><g fill="none" stroke="#080a08" stroke-linecap="round"><circle class="rhine-scan-circle ring-outer" cx="960" cy="540" r="280" stroke-width="2.5"></circle><circle class="rhine-scan-circle ring-white" cx="960" cy="540" r="260" stroke="#fff" stroke-width="3.5"></circle><circle class="rhine-scan-circle ring-inner" cx="960" cy="540" r="220" stroke-width="2"></circle><circle class="rhine-orbit-dot dot-1" cx="960" cy="260" r="8" fill="#ed821b" stroke="none"></circle><circle class="rhine-orbit-dot dot-2" cx="960" cy="820" r="8" fill="#ed821b" stroke="none"></circle><circle class="rhine-scan-core" cx="960" cy="540" r="6" fill="#080a08" stroke="none"></circle></g></svg><span class="rhine-scan-label">PERMISSION AUTHORIZED</span>', 2)
          ])], 10, Jp),
          n("div", Zp, v(c.value), 1),
          _[11] || (_[11] = n("div", { class: "rhine-powered" }, [
            Fe("POWERED BY "),
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
}), ef = /* @__PURE__ */ de({
  __name: "ProfileMenu",
  setup(e) {
    function t(o) {
      Do.trigger(o);
    }
    return (o, i) => (l(), d(G, null, [
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
}), tf = /* @__PURE__ */ de({
  __name: "WorkspaceLaunchers",
  setup(e) {
    function t(o) {
      qn.openWorkspace(o, !0);
    }
    return (o, i) => (l(), d(G, null, [
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
      Ai(o.$slots, "default")
    ], 64));
  }
}), of = {
  key: 0,
  "aria-label": "AI 分析任务"
}, nf = { role: "status" }, sf = ["disabled"], rf = ["disabled"], af = /* @__PURE__ */ de({
  __name: "GitHubStatus",
  setup(e) {
    return (t, o) => s(et).message || s(et).busy ? (l(), d("section", of, [
      n("p", nf, v(s(et).repo ? `原任务仓库：${s(et).repo}。 ` : "") + v(s(et).message), 1),
      s(et).busy ? (l(), d("button", {
        key: 0,
        type: "button",
        onClick: o[0] || (o[0] = (i) => s(it).stopAiAnalysis())
      }, "停止后续分析 / 中断等待")) : M("", !0),
      s(et).uncertain ? (l(), d(G, { key: 1 }, [
        o[5] || (o[5] = n("p", null, "AI 结果未确认，已阻止本页再次提交。请到供应商核对请求和计费；本页记录在整页关闭或重载后会丢失。", -1)),
        s(et).unlockConfirmation ? (l(), d(G, { key: 1 }, [
          o[4] || (o[4] = n("p", null, "扩展不能验证供应商任务；确认只解除本页限制，不代表成功，也不会重发请求。", -1)),
          n("button", {
            type: "button",
            disabled: s(et).busy,
            onClick: o[2] || (o[2] = (i) => s(it).acknowledgeAiChecked())
          }, "确认解除本页限制", 8, rf),
          n("button", {
            type: "button",
            onClick: o[3] || (o[3] = (i) => s(et).unlockConfirmation = !1)
          }, "保持限制")
        ], 64)) : (l(), d("button", {
          key: 0,
          type: "button",
          disabled: s(et).busy,
          onClick: o[1] || (o[1] = (i) => s(et).unlockConfirmation = !0)
        }, "我已核对供应商记录", 8, sf))
      ], 64)) : M("", !0)
    ])) : M("", !0);
  }
}), lf = {
  key: 0,
  role: "status",
  style: { "font-size": "12px", color: "var(--danger,#ef4444)", padding: "4px 8px", margin: "0 0 6px 0", "border-radius": "6px", background: "var(--surface)" }
}, cf = {
  key: 0,
  class: "gh-sidebar-divider"
}, df = {
  key: 1,
  class: "gh-sidebar-caption"
}, uf = ["data-folder", "onClick", "onDragover", "onDragleave", "onDrop"], pf = {
  class: "gh-folder-icon-wrap",
  style: { "font-size": "13px", display: "grid", "place-items": "center" }
}, ff = { key: 0 }, gf = { key: 1 }, hf = {
  key: 2,
  class: "fo-folder-icon",
  style: { color: "currentColor" }
}, mf = ["title"], vf = { class: "gh-folder-count" }, yf = ["data-del", "onClick", "onKeydown"], wf = /* @__PURE__ */ de({
  __name: "GitHubFolders",
  props: {
    active: { type: Boolean, default: !0 }
  },
  setup(e) {
    const t = e, o = N(""), i = () => {
      o.value = "";
    };
    function r(x) {
      return t.active && !_t.busy && _o.folders.some((k) => k.title === x && (k.kind === "custom" || k.kind === "uncategorized"));
    }
    Ye(() => t.active, (x) => {
      i(), window.removeEventListener("dragend", i), window.removeEventListener("drop", i), x && (window.addEventListener("dragend", i), window.addEventListener("drop", i));
    }, { immediate: !0 }), lo(() => {
      window.removeEventListener("dragend", i), window.removeEventListener("drop", i);
    });
    function a(x, k) {
      x.stopPropagation(), Et.delete(k);
    }
    function h(x, k) {
      if (!r(k) || !Array.from(x.dataTransfer?.types || []).includes(Qs)) {
        i();
        return;
      }
      x.preventDefault(), x.dataTransfer && (x.dataTransfer.dropEffect = "move"), o.value = k;
    }
    function f(x, k) {
      const T = x.currentTarget;
      T instanceof Node && x.relatedTarget instanceof Node && T.contains(x.relatedTarget) || o.value === k && (o.value = "");
    }
    function u(x, k) {
      if (i(), !r(k)) return;
      const T = er(x.dataTransfer);
      T && (x.preventDefault(), x.stopPropagation(), Et.dropRepository(T, k));
    }
    return (x, k) => (l(), d(G, null, [
      s(_t).message ? (l(), d("p", lf, v(s(_t).message), 1)) : M("", !0),
      (l(!0), d(G, null, fe(s(_o).folders, (T, g) => (l(), d(G, {
        key: T.title
      }, [
        T.kind === "custom" && s(_o).folders[g - 1]?.kind !== "custom" ? (l(), d("div", cf)) : M("", !0),
        T.kind === "custom" && s(_o).folders[g - 1]?.kind !== "custom" ? (l(), d("div", df, "GitHub 列表 (Lists)")) : M("", !0),
        n("button", {
          type: "button",
          class: le(["gh-bili-folder", { on: T.active, "drag-into": o.value === T.title }]),
          "data-folder": T.title,
          onClick: (p) => s(Et).select(T.title),
          onDragover: (p) => h(p, T.title),
          onDragleave: (p) => f(p, T.title),
          onDrop: (p) => u(p, T.title)
        }, [
          n("span", pf, [
            T.kind === "all" ? (l(), d("span", ff, "⭐")) : T.kind === "uncategorized" ? (l(), d("span", gf, "📄")) : (l(), d("i", hf))
          ]),
          n("span", {
            class: "gh-folder-name",
            title: T.title
          }, v(T.title), 9, mf),
          n("small", vf, v(T.count), 1),
          T.kind === "custom" ? (l(), d("span", {
            key: 0,
            class: "gh-folder-delete",
            title: "删除 GitHub 列表",
            "data-del": T.title,
            role: "button",
            tabindex: "0",
            onClick: (p) => a(p, T.title),
            onKeydown: [
              Nt(F((p) => s(Et).delete(T.title), ["prevent", "stop"]), ["enter"]),
              Nt(F((p) => s(Et).delete(T.title), ["prevent", "stop"]), ["space"])
            ]
          }, "✕", 40, yf)) : M("", !0)
        ], 42, uf)
      ], 64))), 128))
    ], 64));
  }
}), bf = {
  id: "gh-hero-cover",
  class: "gh-bili-cover"
}, kf = { key: 0 }, _f = { key: 1 }, Cf = {
  key: 2,
  class: "fo-folder-icon"
}, xf = { class: "gh-bili-heading" }, Lf = { class: "gh-hero-title-row" }, $f = ["title"], Sf = ["role", "aria-live"], Tf = ["title"], If = { id: "gh-hero-desc" }, Mf = { class: "gh-bili-actions" }, Df = { class: "gh-batch-btn-text" }, Af = /* @__PURE__ */ de({
  __name: "GitHubHero",
  emits: ["open-ai-settings"],
  setup(e, { emit: t }) {
    return (o, i) => (l(), d(G, null, [
      n("div", bf, [
        s(Tt).kind === "all" ? (l(), d("span", kf, "⭐")) : s(Tt).kind === "uncategorized" ? (l(), d("span", _f, "📄")) : (l(), d("i", Cf))
      ]),
      n("div", xf, [
        n("div", Lf, [
          n("h3", {
            id: "gh-hero-title",
            title: s(Tt).title
          }, v(s(Tt).title), 9, $f),
          s(At).actionText ? (l(), d("div", {
            key: 0,
            class: le(["gh-hero-inline-status", { "is-error": s(At).actionError }]),
            role: s(At).actionError ? "alert" : "status",
            "aria-live": s(At).actionError ? "assertive" : "polite",
            "aria-atomic": "true"
          }, [
            n("span", {
              class: "gh-hero-status-text",
              title: s(At).actionText
            }, v(s(At).actionText), 9, Tf),
            n("button", {
              type: "button",
              title: "关闭提示",
              "aria-label": "关闭状态提示",
              onClick: i[0] || (i[0] = (r) => s(Vn).update({ actionText: "", actionError: !1 }))
            }, "×")
          ], 10, Sf)) : M("", !0)
        ]),
        n("p", If, v(s(Tt).description), 1)
      ]),
      n("div", Mf, [
        n("button", {
          id: "gh-batch-toggle-btn",
          type: "button",
          class: le(["gh-hero-btn gh-batch-toggle-btn", { active: s(Tt).batchMode }]),
          title: "批量多选操作",
          onClick: i[1] || (i[1] = (r) => s(Lo).toggleBatch())
        }, [
          i[4] || (i[4] = n("span", { class: "gh-batch-btn-icon" }, "☑", -1)),
          n("span", Df, v(s(Tt).batchMode ? "返回" : "批量操作"), 1)
        ], 2),
        n("button", {
          id: "gh-refresh-btn",
          type: "button",
          class: "gh-hero-btn",
          title: "只读核对未确认的 Star 状态并刷新列表，不重发远端操作",
          onClick: i[2] || (i[2] = (r) => s(Lo).refresh())
        }, "↻ 刷新 / 核对"),
        n("button", {
          id: "gh-hero-add-folder-btn",
          type: "button",
          class: "gh-hero-btn primary",
          title: "在 GitHub 官网上创建新 List",
          onClick: i[3] || (i[3] = (r) => s(Lo).createFolder())
        }, "＋ 新建列表")
      ])
    ], 64));
  }
}), Ef = /* @__PURE__ */ Ie(Af, [["__scopeId", "data-v-d116f39c"]]), Q = be({ repo: "", text: "", baseline: "", busy: !1, message: "", storedValue: null });
function Si(e, t = !1) {
  if (!e || Q.busy) return;
  if (Q.repo && Q.text !== Q.baseline) {
    Q.message = "请先保存或明确取消当前草稿，再编辑或清除其它备注。";
    return;
  }
  const o = it.remarks[e]?.userRemark, i = typeof o == "string" ? o : "";
  Object.assign(Q, {
    repo: e,
    baseline: i,
    text: t ? "" : i,
    storedValue: null,
    message: t ? "清除已准备；点击保存才会清除手写备注，AI 简介不变。" : "仅点击保存或 Enter 才写入；草稿只保留在本页内存。"
  });
}
function En() {
  Q.busy || Object.assign(Q, { repo: "", text: "", baseline: "", storedValue: null, message: "" });
}
async function Pn() {
  if (Q.busy || !Q.repo) return;
  const { repo: e, text: t, baseline: o } = Q;
  Q.busy = !0;
  try {
    await it.updateRepoRemark(e, { userRemark: t.trim() }, o), Object.assign(Q, { repo: "", text: "", baseline: "", storedValue: null, message: `${e} 的备注已保存并回读核对。` });
  } catch (i) {
    Q.message = i instanceof Error ? i.message : "保存未确认，草稿保留，请先读取已保存值核对。";
  } finally {
    Q.busy = !1;
  }
}
async function Ti() {
  if (Q.busy || !Q.repo) return;
  const e = Q.repo;
  Q.busy = !0;
  try {
    const o = (await it.reloadRepoRemarks())[e]?.userRemark;
    if (o !== void 0 && typeof o != "string") throw new Error("保存值格式异常，未变更草稿或覆盖基准。");
    Q.storedValue = o ?? "", Q.baseline = o ?? "", Q.message = "已读取保存值，草稿没有替换。请对比下方保存值；再次点击保存将以草稿替换它。";
  } catch (t) {
    Q.message = t instanceof Error ? t.message : "读取失败，草稿保留。";
  } finally {
    Q.busy = !1;
  }
}
const Pf = ["disabled"], Wf = ["disabled"], Of = ["disabled"], Bf = ["disabled"], Rf = {
  key: 0,
  style: { width: "100%", "white-space": "pre-wrap", "overflow-wrap": "anywhere" }
}, Ii = /* @__PURE__ */ de({
  __name: "GitHubRemarkEditor",
  props: {
    active: { type: Boolean }
  },
  setup(e) {
    const t = e, o = N(null);
    return Ke(() => {
      ht(() => {
        t.active && !Q.busy && o.value?.focus();
      });
    }), (i, r) => (l(), d("div", {
      class: "gh-inline-remark-box",
      style: { "flex-wrap": "wrap", "max-width": "100%" },
      onClick: r[6] || (r[6] = F(() => {
      }, ["stop"]))
    }, [
      Ne(n("input", {
        ref_key: "input",
        ref: o,
        "onUpdate:modelValue": r[0] || (r[0] = (a) => s(Q).text = a),
        class: "gh-inline-remark-input",
        type: "text",
        maxlength: "100",
        "aria-label": "手写仓库备注",
        placeholder: "备注说明…",
        disabled: s(Q).busy || !e.active,
        onKeydown: [
          r[1] || (r[1] = Nt(F((a) => !a.isComposing && e.active && s(Pn)(), ["prevent"]), ["enter"])),
          r[2] || (r[2] = Nt(F((a) => !a.isComposing && e.active && s(En)(), ["prevent", "stop"]), ["esc"]))
        ]
      }, null, 40, Pf), [
        [io, s(Q).text]
      ]),
      n("button", {
        type: "button",
        class: "gh-inline-remark-btn save",
        title: "保存备注",
        disabled: s(Q).busy || !e.active,
        onClick: r[3] || (r[3] = //@ts-ignore
        (...a) => s(Pn) && s(Pn)(...a))
      }, "✓", 8, Wf),
      n("button", {
        type: "button",
        class: "gh-inline-remark-btn cancel",
        title: "取消草稿",
        disabled: s(Q).busy || !e.active,
        onClick: r[4] || (r[4] = //@ts-ignore
        (...a) => s(En) && s(En)(...a))
      }, "✕", 8, Of),
      n("button", {
        type: "button",
        disabled: s(Q).busy || !e.active,
        onClick: r[5] || (r[5] = //@ts-ignore
        (...a) => s(Ti) && s(Ti)(...a))
      }, "读取已保存值", 8, Bf),
      s(Q).storedValue !== null ? (l(), d("p", Rf, "已保存值：" + v(s(Q).storedValue || "（空）"), 1)) : M("", !0)
    ]));
  }
}), Nf = {
  key: 0,
  role: "status"
}, Ff = {
  key: 1,
  "aria-label": "未显示仓库的备注草稿"
}, Hf = {
  key: 2,
  class: "gh-search-options",
  style: { margin: "0 0 10px" }
}, jf = { style: { "font-size": "12px", color: "var(--dim)" } }, zf = {
  key: 3,
  class: "gh-repos-loading"
}, Gf = {
  key: 4,
  class: "muted small",
  style: { "text-align": "center", padding: "40px 0", "font-size": "13px" }
}, Kf = ["data-repo-name", "onClick", "onContextmenu", "onDragstart"], Vf = ["onClick"], Uf = { class: "gh-card-head" }, Yf = ["checked", "onChange"], qf = ["src"], Xf = ["href", "title"], Jf = { class: "owner" }, Zf = { class: "gh-card-body" }, Qf = { class: "gh-card-badges" }, eg = ["title", "onClick"], tg = ["onClick"], og = ["title", "onClick"], ng = { class: "gh-badge-remark-text" }, ig = {
  key: 0,
  class: "desc gh-desc-analyzing",
  title: "正在使用 AI 分析仓库…"
}, sg = {
  key: 1,
  class: "desc gh-desc-ai",
  title: "AI 中文简介（点击可直接修改，右键可重新分析）"
}, rg = ["title"], ag = {
  key: 3,
  class: "desc dim"
}, lg = { class: "meta" }, cg = { class: "gh-stars" }, dg = {
  key: 0,
  class: "gh-lang"
}, ug = {
  key: 1,
  class: "gh-updated"
}, pg = {
  key: 6,
  class: "gh-pager"
}, fg = ["disabled"], gg = { class: "gh-page-info" }, hg = ["disabled"], mg = ["onClick"], vg = /* @__PURE__ */ de({
  __name: "GitHubRepositories",
  props: {
    active: { type: Boolean, default: !0 }
  },
  setup(e) {
    const t = e, o = ae(() => !!Q.repo && !Ce.cards.some((E) => E.fullName === Q.repo)), i = be({
      visible: !1,
      x: 0,
      y: 0,
      fullName: "",
      folders: [],
      hasRemark: !1,
      url: ""
    }), r = N(null), a = N(!1);
    function h(E, w) {
      const _ = E.target;
      if (_ instanceof Element) {
        if (Ce.batchMode) {
          if (_.closest(".fo-card-more,.gh-badge-folder,.gh-badge-remark,.gh-inline-remark-box")) return;
          E.preventDefault(), E.stopPropagation(), kt.toggleSelection(w.fullName);
          return;
        }
        _.closest("a,button,.gh-badge-folder,.gh-badge-remark,.fo-card-more,.gh-card-hole,.gh-card-checkbox,.gh-inline-remark-box") || (E.preventDefault(), E.stopPropagation(), tr.open(w.fullName, void 0, w));
      }
    }
    function f(E, w) {
      if (!t.active) return;
      E.preventDefault(), E.stopPropagation();
      const _ = 12, D = 160, Y = 280, W = Math.min(window.innerWidth - D - _, Math.max(_, E.clientX)), H = Math.min(window.innerHeight - Y - _, Math.max(_, E.clientY));
      i.x = W, i.y = H, i.fullName = w.fullName, i.folders = [...w.folders || (w.folder ? [w.folder] : [])], i.hasRemark = !!w.customRemark, i.url = w.url, i.visible = !0, r.value = null, a.value = W > window.innerWidth - 380;
    }
    function u(E, w) {
      f(w, E), r.value = "folder";
    }
    function x() {
      i.visible = !1, r.value = null;
    }
    function k(E) {
      i.folders.includes(E) ? i.folders = i.folders.filter((w) => w !== E) : i.folders.push(E), it.toggleRepoList(i.fullName, E);
    }
    function T() {
      i.folders = [], it.clearRepoLists(i.fullName), x();
    }
    function g(E) {
      if (!t.active) return;
      const w = typeof E == "string" ? E : E?.fullName || i.fullName;
      x(), Si(w);
    }
    function p() {
      if (!t.active) return;
      const E = i.fullName;
      x(), Si(E, !0);
    }
    async function c() {
      const E = i.url;
      if (x(), E && t.active)
        try {
          await navigator.clipboard.writeText(E);
        } catch {
        }
    }
    function y(E) {
      const w = it.findRepository(i.fullName);
      x(), w && Vs.sendGitHubShare({
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
      }, E);
    }
    function $() {
      i.url && window.open(i.url, "_blank", "noreferrer"), x();
    }
    async function b() {
      const E = it.findRepository(i.fullName);
      if (!E) {
        x();
        return;
      }
      x(), await it.confirmUnstarRepository(E);
    }
    function L(E) {
      const w = E.target;
      w?.closest(".gh-repo-context-menu") || w?.closest(".gh-inline-remark-box") || x();
    }
    function A(E) {
      E.key === "Escape" && i.visible && x();
    }
    Ye(() => t.active, (E) => {
      window.removeEventListener("pointerdown", L), window.removeEventListener("keydown", A), x(), E && (window.addEventListener("pointerdown", L), window.addEventListener("keydown", A));
    }, { immediate: !0 }), St(() => {
      window.removeEventListener("pointerdown", L), window.removeEventListener("keydown", A);
    });
    function ee(E, w) {
      const _ = E.target;
      if (_ instanceof Element && _.closest("button,a,input,textarea,select,[contenteditable='true']")) {
        E.preventDefault();
        return;
      }
      kt.startDrag(w, E);
    }
    const ne = ae(() => {
      if (Ce.cards.length > 0) return !1;
      const E = At.actionText || "";
      return !!(E.includes("正在读取") || E.includes("正在加载") || E.includes("正在统计") || E.includes("正在同步"));
    });
    return (E, w) => (l(), d(G, null, [
      s(Q).message ? (l(), d("p", Nf, v(s(Q).repo ? `${s(Q).repo}：` : "") + v(s(Q).message), 1)) : M("", !0),
      o.value ? (l(), d("section", Ff, [
        n("p", null, "备注草稿：" + v(s(Q).repo) + "（仓库不在当前列表中，草稿仍保留）", 1),
        q(Ii, {
          active: t.active
        }, null, 8, ["active"])
      ])) : M("", !0),
      s(Ce).searchMessage ? (l(), d("div", Hf, [
        n("span", jf, v(s(Ce).searchMessage), 1),
        n("button", {
          type: "button",
          class: "gh-tab",
          style: { padding: "2px 8px", "font-size": "11px", "margin-left": "8px" },
          onClick: w[0] || (w[0] = (_) => s(kt).resetSearch())
        }, "清空搜索")
      ])) : M("", !0),
      ne.value ? (l(), d("div", zf, [...w[16] || (w[16] = [
        n("div", {
          class: "gh-spinner",
          "aria-hidden": "true"
        }, null, -1),
        n("span", { class: "gh-loading-label" }, "正在读取 GitHub 仓库列表中…", -1)
      ])])) : s(Ce).emptyMessage ? (l(), d("p", Gf, v(s(Ce).emptyMessage), 1)) : M("", !0),
      s(Ce).cards.length ? (l(), d("div", {
        key: 5,
        class: le(["repos gh-grid", { "gh-batch-active": s(Ce).batchMode }])
      }, [
        (l(!0), d(G, null, fe(s(Ce).cards, (_) => (l(), d("article", {
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
            onClick: F((D) => f(D, _), ["stop"])
          }, "⋮", 8, Vf),
          n("div", Uf, [
            n("label", {
              class: "gh-card-hole",
              title: "点击勾选此仓库",
              onClick: w[1] || (w[1] = F(() => {
              }, ["stop"]))
            }, [
              n("input", {
                class: "gh-card-checkbox",
                type: "checkbox",
                checked: _.selected,
                onChange: (D) => s(kt).setSelection(_.fullName, D.target.checked)
              }, null, 40, Yf),
              w[17] || (w[17] = n("span", { class: "gh-hole-inner" }, null, -1))
            ]),
            n("img", {
              class: "gh-owner-avatar",
              src: _.avatarUrl || "assets/github-star.svg",
              alt: "",
              loading: "lazy",
              referrerpolicy: "no-referrer",
              onError: w[2] || (w[2] = (D) => D.target.src = "assets/github-star.svg")
            }, null, 40, qf),
            n("a", {
              href: _.url,
              target: "_blank",
              rel: "noreferrer",
              class: "name",
              title: _.fullName
            }, [
              n("span", Jf, v(_.owner) + "/", 1),
              Fe(v(_.name), 1)
            ], 8, Xf)
          ]),
          n("div", Zf, [
            n("div", Qf, [
              _.folders && _.folders.length ? (l(!0), d(G, { key: 0 }, fe(_.folders, (D) => (l(), d("span", {
                key: D,
                class: "gh-badge-folder",
                title: `GitHub 列表：${D}（点击管理所属列表）`,
                onClick: F((Y) => u(_, Y), ["stop"])
              }, " 📁 " + v(D), 9, eg))), 128)) : (l(), d("span", {
                key: 1,
                class: "gh-badge-folder uncat",
                title: "未分类（点击加入 GitHub 列表）",
                onClick: F((D) => u(_, D), ["stop"])
              }, " ＋ 未分类 ", 8, tg)),
              s(Q).repo === _.fullName ? (l(), ce(Ii, {
                key: 2,
                active: t.active
              }, null, 8, ["active"])) : _.customRemark ? (l(), d("span", {
                key: 3,
                class: "gh-badge-remark",
                title: `备注：${_.customRemark}（点击就地修改）`,
                onClick: F((D) => g(_), ["stop"])
              }, [
                w[18] || (w[18] = n("span", { class: "gh-badge-remark-icon" }, "💬", -1)),
                n("span", ng, v(_.customRemark), 1)
              ], 8, og)) : M("", !0)
            ]),
            _.descriptionKind === "analyzing" ? (l(), d("p", ig, [...w[19] || (w[19] = [
              n("span", { class: "gh-ai-sparkle" }, "✨", -1),
              Fe(" 正在使用 AI 分析仓库并提炼中文介绍…", -1)
            ])])) : _.descriptionKind === "ai" ? (l(), d("p", sg, [
              w[20] || (w[20] = n("span", { class: "gh-ai-tag-flag" }, "🤖", -1)),
              Fe(v(_.description), 1)
            ])) : _.descriptionKind === "plain" ? (l(), d("p", {
              key: 2,
              class: "desc",
              title: _.description
            }, v(_.description), 9, rg)) : (l(), d("p", ag, "暂无描述"))
          ]),
          n("div", lg, [
            n("span", cg, "★ " + v(_.stars), 1),
            _.language ? (l(), d("span", dg, v(_.language), 1)) : M("", !0),
            _.updated ? (l(), d("span", ug, "更新 " + v(_.updated), 1)) : M("", !0)
          ])
        ], 42, Kf))), 128))
      ], 2)) : M("", !0),
      s(Ce).totalPages > 1 ? (l(), d("div", pg, [
        n("button", {
          class: "gh-page-btn",
          type: "button",
          disabled: s(Ce).page <= 1,
          onClick: w[3] || (w[3] = (_) => s(kt).changePage(s(Ce).page - 1))
        }, "‹ 上一页", 8, fg),
        n("span", gg, v(s(Ce).page) + " / " + v(s(Ce).totalPages) + " · 共 " + v(s(Ce).totalItems) + " 个" + v(s(Ce).serverPaged ? ` · 已加载 ${s(Ce).loadedItems}` : ""), 1),
        n("button", {
          class: "gh-page-btn",
          type: "button",
          disabled: s(Ce).page >= s(Ce).totalPages,
          onClick: w[4] || (w[4] = (_) => s(kt).changePage(s(Ce).page + 1))
        }, "下一页 ›", 8, hg)
      ])) : M("", !0),
      (l(), ce(vt, { to: "body" }, [
        t.active && i.visible ? (l(), d("div", {
          key: 0,
          class: "fo-cover-context-menu gh-repo-context-menu",
          style: we({ left: `${i.x}px`, top: `${i.y}px` }),
          onClick: w[14] || (w[14] = F(() => {
          }, ["stop"])),
          onContextmenu: w[15] || (w[15] = F(() => {
          }, ["prevent"]))
        }, [
          n("div", {
            class: le(["gh-menu-has-sub", { "is-active": r.value === "folder" }]),
            onMouseenter: w[6] || (w[6] = (_) => r.value = "folder")
          }, [
            w[21] || (w[21] = n("button", {
              class: "fo-cover-menu-item with-sub-arrow",
              type: "button"
            }, [
              n("span", null, "📁 所属 GitHub 列表"),
              n("span", { class: "sub-arrow" }, "›")
            ], -1)),
            n("div", {
              class: le(["gh-sub-flyout", { "flyout-left": a.value }]),
              onClick: w[5] || (w[5] = F(() => {
              }, ["stop"]))
            }, [
              n("button", {
                class: le(["fo-cover-menu-item", { primary: i.folders.length === 0 }]),
                type: "button",
                onClick: T
              }, v(i.folders.length === 0 ? "✓ " : "  ") + "＋ 设为未分类（清空列表） ", 3),
              (l(!0), d(G, null, fe(s(it).cats, (_) => (l(), d("button", {
                key: _,
                class: le(["fo-cover-menu-item", { primary: i.folders.includes(_) }]),
                type: "button",
                onClick: (D) => k(_)
              }, v(i.folders.includes(_) ? "✓ " : "  ") + "📁 " + v(_), 11, mg))), 128))
            ], 2)
          ], 34),
          n("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: w[7] || (w[7] = (_) => r.value = null),
            onClick: w[8] || (w[8] = (_) => g())
          }, " ✏️ 编辑备注… ", 32),
          q($r, {
            label: "💬 发送到聊天室",
            visible: i.visible,
            onOpen: w[9] || (w[9] = (_) => r.value = null),
            onSelect: y
          }, null, 8, ["visible"]),
          i.hasRemark ? (l(), d("button", {
            key: 0,
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: w[10] || (w[10] = (_) => r.value = null),
            onClick: p
          }, " 🗑️ 清除备注 ", 32)) : M("", !0),
          n("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: w[11] || (w[11] = (_) => r.value = null),
            onClick: c
          }, " 📋 复制仓库链接 ", 32),
          n("button", {
            class: "fo-cover-menu-item",
            type: "button",
            onMouseenter: w[12] || (w[12] = (_) => r.value = null),
            onClick: $
          }, " ↗ 在 GitHub 打开 ", 32),
          n("button", {
            class: "fo-cover-menu-item danger",
            type: "button",
            onMouseenter: w[13] || (w[13] = (_) => r.value = null),
            onClick: b
          }, " ⭐ 取消 Star ", 32)
        ], 36)) : M("", !0)
      ]))
    ], 64));
  }
}), yg = /* @__PURE__ */ Ie(vg, [["__scopeId", "data-v-048d3839"]]), wg = { class: "gh-batch-bar-left" }, bg = { class: "gh-batch-count-tip" }, kg = { id: "gh-batch-selected-count" }, _g = {
  key: 0,
  "aria-label": "批量归属列表确认"
}, Cg = ["disabled"], xg = ["value"], Lg = ["disabled"], $g = ["disabled"], Sg = { class: "gh-batch-bar-right" }, Tg = ["disabled"], Ig = ["disabled"], Mg = ["disabled"], Dg = /* @__PURE__ */ de({
  __name: "GitHubBatchBar",
  props: {
    active: { type: Boolean, default: !0 }
  },
  setup(e) {
    const t = e, o = Rs(), i = N(null);
    function r() {
      t.active && (o.value = it.prepareBatchMove(), i.value = null);
    }
    async function a() {
      const h = o.value, f = i.value;
      if (!t.active || !h || f === null || _t.busy) return;
      await h.submit(f) && o.value === h && (o.value = void 0);
    }
    return Ye(() => t.active && jt.active, (h) => {
      h || (o.value = void 0);
    }), (h, f) => (l(), d(G, null, [
      n("div", wg, [
        n("button", {
          type: "button",
          class: "gh-batch-action-btn",
          id: "gh-batch-select-all-btn",
          onClick: f[0] || (f[0] = (u) => s($o).toggleSelectAll())
        }, v(s(jt).allSelected ? "取消全选" : "全选"), 1),
        n("span", bg, [
          f[5] || (f[5] = Fe("已选择 ", -1)),
          n("b", kg, v(s(jt).selectedCount), 1),
          f[6] || (f[6] = Fe(" 项", -1))
        ])
      ]),
      o.value ? (l(), d("section", _g, [
        n("p", null, "仅操作打开选择器时的 " + v(o.value.names.length) + " 个仓库；后来勾选的仓库不加入。", 1),
        n("details", null, [
          f[7] || (f[7] = n("summary", null, "查看本次仓库清单", -1)),
          n("ul", null, [
            (l(!0), d(G, null, fe(o.value.names, (u) => (l(), d("li", { key: u }, v(u), 1))), 128))
          ])
        ]),
        Ne(n("select", {
          "onUpdate:modelValue": f[1] || (f[1] = (u) => i.value = u),
          "aria-label": "目标列表",
          disabled: s(_t).busy
        }, [
          f[8] || (f[8] = n("option", {
            value: null,
            disabled: ""
          }, "请选择目标列表", -1)),
          f[9] || (f[9] = n("option", { value: "" }, "未分类（清空所选仓库的所有列表所属）", -1)),
          (l(!0), d(G, null, fe(s(_o).folders.filter((u) => u.kind === "custom"), (u) => (l(), d("option", {
            key: u.title,
            value: u.title
          }, v(u.title), 9, xg))), 128))
        ], 8, Cg), [
          [Di, i.value]
        ]),
        n("button", {
          type: "button",
          disabled: !t.active || s(_t).busy || i.value === null,
          onClick: a
        }, "确认加入列表", 8, Lg),
        n("button", {
          type: "button",
          disabled: s(_t).busy,
          onClick: f[2] || (f[2] = (u) => o.value = void 0)
        }, "取消", 8, $g)
      ])) : M("", !0),
      n("div", Sg, [
        n("button", {
          type: "button",
          class: "gh-batch-action-btn",
          id: "gh-batch-move-btn",
          disabled: !t.active || s(_t).busy || s(jt).selectedCount === 0,
          title: "固定当前选择，批量加入所选 GitHub 列表",
          onClick: r
        }, " 📁 归入 GitHub 列表 ", 8, Tg),
        n("button", {
          type: "button",
          class: "gh-batch-action-btn",
          id: "gh-batch-ai-btn",
          disabled: s(jt).selectedCount === 0,
          title: "批量使用 AI 生成中文介绍",
          onClick: f[3] || (f[3] = (u) => s($o).analyzeAi())
        }, " ✨ 批量 AI 分析 ", 8, Ig),
        n("button", {
          type: "button",
          class: "gh-batch-action-btn danger",
          id: "gh-batch-unstar-btn",
          disabled: s(jt).selectedCount === 0,
          title: "从 GitHub 批量取消 Star 收藏",
          onClick: f[4] || (f[4] = (u) => s($o).unstar())
        }, " 🗑 取消收藏 ", 8, Mg)
      ])
    ], 64));
  }
}), Ag = z(() => import("./GitHubWorkspaceCard-C6-JDDrN.js")), Eg = z(() => import("./NotificationCenter-CRFcKTbj.js")), Pg = z(() => import("./TabManagerPanel-C9gaaxJh.js")), Wg = z(() => import("./BookmarkNoteMenu-C9OAO2ZF.js")), Og = z(() => import("./BookmarkPanel-CkbynGXf.js")), Bg = z(() => import("./LauncherDialogs-BXbIfOSJ.js")), Rg = z(() => import("./SettingsDialog-D9ocZJaZ.js")), Ng = z(() => import("./SettingsView-DnQG4DKe.js")), Fg = z(() => import("./ClockSettingsMenu-BwC0vASG.js")), Hg = z(() => import("./BiliTheaterDialog-DYbaJcN-.js")), jg = z(() => import("./BiliMiniPlayer-B2vwGWsL.js")), zg = z(() => import("./BiliMessagePanel-DPcxDJIa.js")), Gg = z(() => import("./ModelPricingCard-Imyab5r3.js")), Kg = z(() => import("./BilibiliWorkspace-Btu46gHt.js")), Vg = z(() => import("./YouTubeCard-CTCxQo4N.js").then((e) => e.Y)), Ug = z(() => import("./AihotFeed-CnFRD0Yf.js")), Yg = z(() => import("./GitHubTrending-BSkkKjbh.js")), qg = z(() => import("./AiDialog-B6xBOvTG.js")), Xg = z(() => import("./AihotViewer-BEdldf2-.js")), Jg = z(() => import("./NavWheelOverlay-C64T-k1Y.js")), Zg = z(() => import("./StandaloneHost-Bq22PZeO.js")), Qg = z(() => import("./LauncherFolderDialog-Bjqdb0As.js")), eh = z(() => import("./LauncherMenus-BqT6tU-e.js"));
function ie(e, t, o, i) {
  t.spaOwned && document.getElementById("vue-spa-root") || t.id !== "github-workspace" && t.id.startsWith("github-") && document.getElementById("vue-github-workspace-root") || e.register({
    id: t.id,
    title: t.title,
    order: t.order,
    eager: !0,
    roots: [t.root],
    capabilities: t.capabilities,
    mount: ({ getRoot: r }) => {
      const a = r(t.root);
      if (!a) return;
      if (document.getElementById("vue-spa-root") && t.id !== "spa-app")
        return i?.setMounted?.(!0), () => {
          i?.setMounted?.(!1);
        };
      const h = a.innerHTML, f = zn(o);
      f.config.errorHandler = (u, x, k) => {
        console.error(`LogicWeaver Vue feature failed: ${t.id} (${k})`, u), a.dataset.vueError = "1";
      };
      try {
        f.mount(a), i?.setMounted?.(!0);
      } catch (u) {
        throw i?.setMounted?.(!1), a.innerHTML = h, u;
      }
      return () => {
        i?.setMounted?.(!1), f.unmount();
      };
    }
  });
}
function th(e) {
  e.register({
    id: "intro",
    title: "启动动画",
    order: 10,
    eager: !0,
    roots: ["endfield-loader"],
    capabilities: ["ui:intro", "boot:progress"],
    mount: () => {
      const t = document.getElementById("endfield-loader");
      if (!lt.enabled) {
        t?.remove(), document.body.classList.remove("is-starting");
        return;
      }
      if (!t) return;
      const o = zn(Qp);
      let i = !1;
      const r = () => {
        e.stop("intro");
      };
      window.addEventListener("logicweaver:intro-complete", r, { once: !0 }), o.mount(t);
      const a = window.setTimeout(() => {
        lt.finish("基础界面已就绪，在线服务继续后台加载", !0), window.setTimeout(() => {
          i || (r(), t?.remove(), document.body.classList.remove("is-starting"));
        }, 600);
      }, 8e3);
      return () => {
        i || (i = !0, clearTimeout(a), window.removeEventListener("logicweaver:intro-complete", r), o.unmount(), t.remove(), document.body.classList.remove("is-starting"));
      };
    }
  }), ie(e, { id: "spa-app", title: "纯血 SPA 单根调度器", order: 15, root: "vue-spa-root", capabilities: ["ui:spa-root", "workspace:keepalive"] }, Gp), document.getElementById("vue-spa-root") || ie(e, { id: "bili-companions", title: "b站伴随窗口", order: 19, root: "vue-bili-companions-root", capabilities: ["ui:dock-companion"] }, Zg), ie(e, { id: "notifications", title: "通知中心", order: 20, root: "vue-notification-root", capabilities: ["ui:toast", "notification:dedupe"] }, ls), ie(e, { id: "profile-menu", title: "头像右键菜单", order: 21, root: "bili-profile-menu", capabilities: ["ui:profile-menu", "profile:actions"] }, ef, Do), ie(e, { id: "workspace-launchers", title: "常用工作区启动项", order: 22, root: "workspace-launchers", capabilities: ["ui:workspace-launchers", "workspace:launch"] }, tf, qn), ie(e, { id: "mac-dock", title: "底部快捷应用 Dock 栏", order: 23, root: "mac-dock", capabilities: ["ui:mac-dock", "dock:navigate"] }, as, pt), ie(e, { id: "hero-clock", title: "首屏中央时钟", order: 26, root: "hero-clock", capabilities: ["ui:hero-clock", "clock:read"] }, is), ie(e, { id: "search-box", title: "首屏搜索框", order: 27, root: "search", capabilities: ["ui:search-box", "search:actions"] }, Mi), ie(e, { id: "home-music", title: "首屏音乐播放器", order: 28, root: "task-thread-home", capabilities: ["ui:home-music", "music:playback"] }, ss, Ue), ie(e, { id: "launcher-groups", title: "常用网站分组架", order: 29, root: "launcher-groups", capabilities: ["ui:launcher-groups", "launcher:navigate"] }, rs, Te), ie(e, { id: "weather-widget", title: "首屏天气小部件", order: 39, root: "weather-body", capabilities: ["ui:weather-widget", "weather:read"] }, ns), ie(e, { id: "github-workspace", title: "GitHub 独立页 Vue 工作台", order: 49, root: "vue-github-workspace-root", capabilities: ["ui:github-workspace"] }, Ag), ie(e, { id: "github-status", title: "GitHub 同步状态", order: 50, root: "vue-github-status-root", capabilities: ["ui:github-status", "github:sync-read"] }, af, Vn), ie(e, { id: "github-folders", title: "GitHub 文件夹导航", order: 55, root: "gh-folder-list", capabilities: ["ui:github-folders", "github:categorize-drop"] }, wf, Et), ie(e, { id: "github-hero", title: "GitHub 分类摘要", order: 56, root: "gh-hero", capabilities: ["ui:github-summary", "github:actions"] }, Ef, Lo), ie(e, { id: "github-repositories", title: "GitHub 仓库列表", order: 57, root: "vue-github-repositories-root", capabilities: ["ui:github-repositories", "github:repository-actions", "github:paging"] }, yg, kt), ie(e, { id: "github-batch-bar", title: "GitHub Star 批量操作工具栏", order: 58, root: "gh-batch-bar", capabilities: ["ui:github-batch-bar", "github:batch-actions"] }, Dg, $o), ie(e, { id: "notification-center", spaOwned: !0, title: "持久通知中心", order: 71, root: "vue-notification-center-root", capabilities: ["ui:notification-history", "notification:read"] }, Eg, Lt), ie(e, { id: "tab-manager", spaOwned: !0, title: "独立标签页管理", order: 71, root: "vue-tab-manager-root", capabilities: ["ui:tab-manager", "tabs:explicit"] }, Pg, Yi), ie(e, { id: "bookmark-menu", title: "书签上下文操作与备注菜单", order: 72, root: "vue-bookmark-menu-root", capabilities: ["ui:bookmark-menu", "bookmark:edit"] }, Wg, Kn), ie(e, { id: "launcher-dialogs", title: "快捷启动器管理弹窗族", order: 73, root: "vue-launcher-dialogs-root", capabilities: ["ui:launcher-dialogs", "launcher:manage"] }, Bg, So), ie(e, { id: "launcher-folder-dialog", title: "大文件夹展开视窗", order: 74, root: "vue-launcher-folder-root", capabilities: ["ui:launcher-folder", "launcher:folder-dialog"] }, Qg, Ct), ie(e, { id: "launcher-menus", title: "启动器快捷上下文菜单族", order: 76, root: "vue-launcher-menus-root", capabilities: ["ui:launcher-menus", "launcher:context-menu"] }, eh, oo), ie(e, { id: "bookmark-panel", title: "浏览器书签侧边滑动视窗", order: 77, root: "vue-bookmark-panel-root", capabilities: ["ui:bookmark-panel", "bookmarks:panel"] }, Og, sn), ie(e, { id: "bookmark-folder-strip", spaOwned: !0, title: "顶栏书签快捷文件夹横条", order: 78, root: "vue-bookmark-folder-strip-root", capabilities: ["ui:bookmark-folder-strip", "bookmarks:strip"] }, null, Qo), ie(e, { id: "settings-page", title: "独立设置页 Vue 工作台", order: 79, root: "vue-options-root", capabilities: ["ui:settings-page"] }, Ng), ie(e, { id: "settings-dialog", title: "全局设置中心视窗", order: 80, root: "vue-settings-dialog-root", capabilities: ["ui:settings-dialog", "settings:manage"] }, Rg, rn), ie(e, { id: "clock-settings-menu", spaOwned: !0, title: "中央时钟偏好配置菜单", order: 82, root: "vue-clock-settings-root", capabilities: ["ui:clock-settings", "clock:preference-edit"] }, Fg, Ot), ie(e, { id: "bili-theater-dialog", title: "Bilibili 沉浸剧场与评论区弹窗", order: 85, root: "vue-bili-theater-root", capabilities: ["ui:bili-theater", "bili:playback"] }, Hg, To), ie(e, { id: "bili-mini-player", title: "Bilibili 悬浮迷你播放器", order: 85, root: "vue-bili-mini-player-root", capabilities: ["ui:bili-mini-player", "bili:playback"] }, jg), ie(e, { id: "ai-dialog", title: "AI 助手对话框与知识点抽屉", order: 86, root: "vue-ai-dialog-root", capabilities: ["ui:ai-dialog", "ai:chat"] }, qg, Xn), ie(e, { id: "aihot-viewer", spaOwned: !0, title: "AI HOT 资讯文章阅读器", order: 88, root: "vue-aihot-viewer-root", capabilities: ["ui:aihot-viewer", "viewer:aihot"] }, Xg, Yn), ie(e, { id: "nav-wheel", title: "辐射状快捷动作轮盘与悬浮球", order: 95, root: "vue-nav-wheel-root", capabilities: ["ui:nav-wheel", "nav:radial-menu"] }, Jg, Le), ie(e, { id: "bili-message-panel", spaOwned: !0, title: "Bilibili 消息与互动通知中心", order: 102, root: "vue-bili-message-panel-root", capabilities: ["ui:bili-message-panel", "bili:messages"] }, zg, Pt), ie(e, { id: "pricing-radar", spaOwned: !0, title: "模型插件 (AI 定价与排行榜)", order: 108, root: "vue-pricing-root", capabilities: ["ui:pricing-radar", "pricing:read"] }, Gg, Hi), ie(e, { id: "bili-favorites", spaOwned: !0, title: "b站插件 Vue 外壳", order: 110, root: "vue-bili-favorites-root", capabilities: ["ui:bili-favorites-shell", "bilibili:favorites"] }, Kg, Ni), ie(e, { id: "youtube-card", spaOwned: !0, title: "YouTube 订阅与探索工作台", order: 111, root: "vue-youtube-root", capabilities: ["ui:youtube-card", "youtube:updates"] }, Vg, Oi), ie(e, { id: "aihot-feed", spaOwned: !0, title: "AI HOT 资讯流全功能聚合看板", order: 112, root: "vue-aihot-root", capabilities: ["ui:aihot-feed", "aihot:aggregate"] }, Ug, Fi), ie(e, { id: "github-trending", spaOwned: !0, title: "GitHub 趋势榜与热门流", order: 114, root: "vue-github-trending-root", capabilities: ["ui:github-trending", "github:trending"] }, Yg, qi);
}
Ps();
const cn = Mr(an);
ia(an, cn);
sa(an);
th(cn);
Gn.loadBookmarks();
(async () => {
  document.getElementById("vue-bili-favorites-root") && !document.getElementById("vue-spa-root") && await import("./bilibili-channel.service-BkQAjxJV.js"), await Pr(), await cn.startEager(), lt.notifyBootReady();
})().catch((e) => console.error("[LogicWeaver] 页面启动失败", e));
window.addEventListener("pagehide", () => {
  cn.stopAll();
}, { once: !0 });
export {
  li as C,
  qu as D,
  yg as G,
  Ci as L,
  dd as T,
  wf as _,
  Dg as a,
  Ef as b,
  af as c,
  Yi as d,
  Ot as e,
  ci as f,
  qi as g,
  _h as h,
  ke as i,
  Xn as j,
  Ge as k,
  Le as l,
  nn as m,
  Z as n,
  Qp as o,
  pd as p,
  fd as q,
  ud as r,
  tf as s,
  Uo as t,
  ef as u,
  os as v,
  Hn as w,
  Pe as x,
  ts as y,
  an as z
};
